--!strict
--[[
	Clearing — server.

	The earn side of the core loop. Every `runtime.clearTickRate` the server looks at
	where each player is standing, removes the patches inside their current effective
	clear radius, pays for each one, reveals whatever was under it, completes a set when
	the sixth name of one lands, and advances the player into the next area when the live
	bay's last patch goes.

	OBSERVED, NEVER CLAIMED. There is no clearing channel and no currency channel: the
	server measures the distance itself, on its own tick. This module reads no client
	message and uses no Touched event — both are client-authoritative physics, and a patch
	is worth currency.

	FOUR THINGS ARE STRUCTURAL HERE AND EACH ONE WAS A DEFECT SOMEWHERE:

	  1. NO EFFECT FORMULA LIVES IN THIS FILE. The clear radius and the value multiplier
	     both come from `Modifiers.effective(state, axis)` — modifiers.singleDefinition —
	     and this module computes neither from a base, a level or a factor. The previous
	     version called `Progression.clearRadius` and `Progression.valueMultiplier`, which
	     the modifiers refactor removed; the tick errored inside its own pcall on every
	     pass and nothing cleared at all.

	  2. THE ARMING GATE IS THE FIRST TEST IN A PASS. firstSession.armScope is
	     perCharacterSpawn, so a character clears nothing until its root has moved
	     `firstSession.armDistanceStuds` of horizontal XZ displacement from
	     `state.spawnPivot`. The reset is a property of THIS tick — a character the gate
	     has not been armed for rewrites `state.armState` — which is what keeps one writer
	     on that field across a respawn.

	  3. A FINISHED AREA CANNOT BE MADE TO PAY TWICE, and no latch is what stops it. When
	     an area finishes, `plots.advance` rebuilds `state.patches` for the NEW live bay;
	     a finished bay has no patch record anywhere, so step 3 below has nothing to
	     iterate over it, on this session or on any rejoin. `state.areaComplete` is gone,
	     and with it the wave-1 respawn farm.

	  4. THE VALUE MULTIPLIER IS APPLIED HERE AND NOWHERE ELSE.
	     economy.faucets[patch-clear].multiplierAppliedOnce is "at this site only; never
	     again inside the award function", so `progression.award` receives a whole,
	     already-multiplied number.

	Remotes are reached only through `Protocol.channel(name)`; nothing here searches the
	tree for one. Every tuned number comes from GameConfig.
]]

local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Shared = ReplicatedStorage:WaitForChild("UIForge")

local GameConfig = require(Shared.GameConfig) :: any
local Layout = require(Shared.Layout)
local Modifiers = require(Shared.Modifiers)
local Protocol = require(Shared.Protocol)
local Types = require(Shared.Types)

local Plots = require(script.Parent.Plots)
local Progression = require(script.Parent.Progression)

--[[
	The generated shapes, not copies of them. Types.luau owns `PlayerState`, `Patch` and
	`States`; re-exported so a caller holding `Clearing.States` keeps compiling and there
	is still exactly one declaration of each.
]]
export type Patch = Types.Patch
export type PlayerState = Types.PlayerState
export type States = Types.States

-- One entry of GameConfig.Tiers and one of GameConfig.RelicSets, named so the two reads
-- below have a shape. Not a copy of any value: every number and every name stays in the
-- generated config and is read from it at the point of use.
type TierDef = { name: string, value: number }
type FindSet = { id: string, label: string, depth: number, relics: { string } }

-- Exactly the blocks of GameConfig this module reads, so a strict checker can see the
-- shape across a require it cannot resolve. The same device Modifiers.luau uses, for the
-- same reason.
type ConfigShape = {
	Tiers: { TierDef },
	RelicSets: { FindSet },
	FirstSession: { armDistanceStuds: number },
	Economy: { payoutFloor: number },
	ClearTickRate: number,
}

local Config: ConfigShape = GameConfig

-- The engine's name for the part a character is measured from. A Roblox name, not a
-- tuned value, so it is not config; named because it is the one string this module looks
-- up in the world.
local ROOT_PART_NAME = "HumanoidRootPart"

-- The channels this module originates, as keys of Protocol.REMOTES. That table exposes no
-- symbolic constant for a name, and `Protocol.channel` errors on a name it does not
-- declare, so a typo here is loud at the first fire rather than a nil somewhere else.
local FIND_REVEALED = "FindRevealed"
local SET_COMPLETED = "SetCompleted"
local AREA_RESTORED = "AreaRestored"
local STATE_CHANGED = "StateChanged"

-- The two axes this module reads. modifiers.axisIdsJoinUpgrades: an axis id is an
-- `upgrades[].id` verbatim. They are literals for the same reason the channel names are:
-- selecting one of three config rows requires naming the one you want.
local RADIUS_AXIS = "radius"
local VALUE_AXIS = "value"

-- The two derived snapshot fields. Protocol's header names both derivations; they are
-- spelled here because a `for field in snapshotShape()` loop that copies `state[field]`
-- emits `nil` for exactly these two.
local FIELD_AREA_PATCH_COUNT = "areaPatchCount"
local FIELD_AREA_LABEL = "areaLabel"

-- firstSession.armDistanceStuds (2.0), squared once so the gate costs no square root.
local ARM_DISTANCE: number = Config.FirstSession.armDistanceStuds
local ARM_DISTANCE_SQUARED: number = ARM_DISTANCE * ARM_DISTANCE

-- economy.payoutFloor (1). Every clear is a payment: payoff frequency is measured in
-- payments, so the floor is under the formula and not beside it.
local PAYOUT_FLOOR: number = Config.Economy.payoutFloor

local Clearing = {}

-- Set by `start`, so a second call cannot install a second loop and double the tick rate.
local started = false

--[[
	`Layout.areaSpec(ordinal)` memoised.

	The spec is a pure function of the ordinal — the same row of depths.areas, or
	endgame.postTerminalArea above ordinal 8, with a seed-derived Find slice — and the tick
	asks for it for every armed player on every pass. Building it fresh 130 times a second
	to read two numbers off it is the one thing in this file that would show up in a
	profile. The cached table is never handed out and never written.
]]
local areaSpecCache: { [number]: Layout.AreaSpec } = {}

local function areaSpec(areaOrdinal: number): Layout.AreaSpec
	local cached = areaSpecCache[areaOrdinal]
	if cached ~= nil then
		return cached
	end

	local spec = Layout.areaSpec(areaOrdinal)
	areaSpecCache[areaOrdinal] = spec
	return spec
end

--[[
	The set a Find name belongs to, or nil if no set carries it.

	Linear over four sets of six names, and only on the tick a Find is actually revealed —
	at most three times per area per player. No index is built, because a module may do no
	work at require time and a table built lazily would be a second copy of collection.
]]
local function setForFind(findName: string): FindSet?
	for _, set in ipairs(Config.RelicSets) do
		for _, name in ipairs(set.relics) do
			if name == findName then
				return set
			end
		end
	end
	return nil
end

-- discovery.record.derived: setComplete(setId) is "every name in that set is true".
-- Derived from state.found at every read, never latched and never stored.
local function isSetComplete(state: PlayerState, set: FindSet): boolean
	for _, name in ipairs(set.relics) do
		if not state.found[name] then
			return false
		end
	end
	return true
end

--[[
	The BasePart a player's position is measured from, or nil if the character is not up
	yet. Absent between a join and the first CharacterAdded, and again for the respawn gap
	after a death — a skip, not an error. onDeath deliberately adds no death test to this
	tick: a corpse does not move, and everything inside its radius was cleared while it was
	alive.
]]
local function rootPartOf(character: Instance): BasePart?
	local root = character:FindFirstChild(ROOT_PART_NAME)
	if root == nil or not root:IsA("BasePart") then
		return nil
	end
	return root
end

-- One warning per unexpected snapshot field, not one per tick.
local warnedSnapshotFields: { [string]: boolean } = {}

--[[
	A snapshot of a state: exactly the fields `Protocol.snapshotShape()` names, in the
	order it names them, read off the state by name rather than by a field-name literal
	written here.

	SIX ARE COPIED AND TWO ARE DERIVED. `areaPatchCount` and `areaLabel` do not exist on a
	PlayerState — they are `layout.areaSpec(areasFinished + 1)`'s patchCount and label, on
	the wire so the client can draw a progress readout without holding depths and endgame
	itself. patches, cleared, spawnPivot, owned, armState and player never cross.

	Shallow by design. `upgrades`, `rowsRevealed` and `found` go over as the live tables;
	FireClient serialises them at the moment of the call, so a later mutation cannot reach
	a payload that has already been sent.
]]
local function buildSnapshot(state: PlayerState): { [string]: any }
	local spec = areaSpec(state.areasFinished + 1)
	local snapshot: { [string]: any } = {}

	-- Annotated because the require above is an instance path the analyser cannot follow,
	-- so the returned list would otherwise be `unknown` and every index below with it.
	local fields: { string } = Protocol.snapshotShape()

	for _, field in ipairs(fields) do
		if field == FIELD_AREA_PATCH_COUNT then
			snapshot[field] = spec.patchCount
		elseif field == FIELD_AREA_LABEL then
			snapshot[field] = spec.label
		else
			local value = (state :: any)[field]
			if value == nil and not warnedSnapshotFields[field] then
				warnedSnapshotFields[field] = true
				warn(
					`[Clearing] Protocol.snapshotShape names "{field}", which is neither a PlayerState field nor a derivation this module knows; it is going over the wire as nil`
				)
			end
			snapshot[field] = value
		end
	end

	return snapshot
end

--[[
	Clear one patch: the state writes, the Instance, the payment and the reveal.

	Called only for a patch that has just tested inside the radius, so the containment test
	is the caller's and the transition is unconditional here.
]]
local function clearPatch(state: PlayerState, player: Player, index: number, patch: Patch)
	patch.cleared = true

	local instance = patch.instance
	if instance ~= nil then
		instance:Destroy()
	end
	patch.instance = nil

	-- `clearedCount` is defined as the number of keys in `cleared`, so it moves only when a
	-- key actually appears. That is what holds it at or below the live area's patchCount
	-- across any number of rejoins.
	if state.cleared[index] ~= true then
		state.cleared[index] = true
		state.clearedCount += 1
	end

	--[[
		economy.faucets[patch-clear].formula, verbatim:

		    max(payoutFloor, floor(tiers[patch.tierIndex].value * effective(state, "value")))

		floor per its rounding rule ("floor, never round-half-up"), and THE ONLY SITE THE
		VALUE MULTIPLIER IS APPLIED — `Progression.award` receives the finished number and
		multiplies nothing.
	]]
	local tier = Config.Tiers[patch.tierIndex]
	local payout: number
	if tier == nil then
		-- A patch pointing at a tier the config does not have. It still clears, so the area
		-- can still be finished, and it still pays the floor, because the floor is under
		-- the formula whatever the tier says. Fabricating a tier value would be worse.
		warn(
			`[Clearing] patch {index} has tierIndex {patch.tierIndex}, which GameConfig.Tiers does not have; cleared and paid the floor`
		)
		payout = PAYOUT_FLOOR
	else
		payout = math.max(PAYOUT_FLOOR, math.floor(tier.value * Modifiers.effective(state, VALUE_AXIS)))
	end
	Progression.award(state, payout)

	local find = patch.find
	if find == nil then
		return
	end

	if state.found[find] then
		-- discovery.repeat: impossible from a correct layout, and its only cause is a build
		-- defect that assigns a name outside its area's slice. runtimeBehaviour is "the
		-- patch hides nothing, the server logs a warning naming the Find and the patch
		-- index, the reveal channel does not fire". Nothing player-facing happens.
		warn(`[Clearing] patch {index} hides "{find}", which this player already holds; no reveal fired`)
		return
	end

	state.found[find] = true
	Protocol.channel(FIND_REVEALED):FireClient(player, find)

	-- The sixth name of a set, and response.channelExclusivity is why it is a second packet
	-- on a second channel rather than a flag on the first: findReveal is on atPatch and
	-- setComplete is on notice, and notice is in findReveal's forbiddenChannels. Fires at
	-- most once per set per player, ever, because `found` is never cleared and this branch
	-- is only reached on the transition of one name from false to true.
	local set = setForFind(find)
	if set == nil then
		warn(`[Clearing] patch {index} hides "{find}", which no GameConfig.RelicSets entry carries; no set completion tested`)
	elseif isSetComplete(state, set) then
		Protocol.channel(SET_COMPLETED):FireClient(player, set.id)
	end
end

--[[
	One pass over one player, in wiring.onTick's order. Every early return is a skip: a
	state this pass has nothing to do for is not an error and must not stop the pass.
]]
local function tickPlayer(state: PlayerState)
	local player = state.player
	local character = player.Character

	--[[
		(1) THE ARMING GATE, FIRST — ahead of the character test, ahead of any distance
		work, ahead of any write and any remote.

		A character `armState` was not armed FOR resets the gate here, which is the whole of
		firstSession.armScope "perCharacterSpawn": the reset is a property of this tick, so
		the respawn path in wiring.onDeath rebuilds nothing and no second module writes the
		field. It is rewritten whole rather than mutated so `armed` cannot survive a
		character swap by being missed.
	]]
	local arm = state.armState
	if arm == nil or arm.character ~= character then
		arm = { character = character, armed = false }
		state.armState = arm
	end

	if character == nil then
		return
	end

	local root = rootPartOf(character)
	if root == nil then
		return
	end
	local rootPosition = root.Position

	if not arm.armed then
		-- plots.spawn writes spawnPivot before the character loads, so this is the join
		-- ordering holding rather than a case with a behaviour; a state with no pivot has
		-- nothing to measure from and is skipped rather than armed at the origin.
		local pivot = state.spawnPivot
		if pivot == nil then
			return
		end

		-- firstSession.armMeasuredOn: "server, horizontal XZ displacement of the character
		-- root from the plot spawn pivot". Strictly greater than the threshold; a character
		-- standing exactly 2.0 studs out is not yet armed.
		local ax = rootPosition.X - pivot.X
		local az = rootPosition.Z - pivot.Z
		if ax * ax + az * az <= ARM_DISTANCE_SQUARED then
			-- NOT ARMED: no distance work, no clear, no award, no packet. This is the first
			-- tick of a fresh session, and of every respawn, until the player moves.
			return
		end

		arm.armed = true
		-- Armed and clearing on the same pass: firstSession.ceilings.secondsToFirstClear is
		-- 3 s from the first input, and a tick of dead time after arming would be spent for
		-- nothing.
	end

	local patches: { Patch } = state.patches
	if patches == nil then
		return
	end

	--[[
		(2) The radius, read ONCE per pass — wiring.onTick says so in those words. Read
		fresh every pass and cached nowhere, which is what makes Reach take effect on the
		tick after a purchase with no apply step. THIS MODULE COMPUTES NOTHING ABOUT IT:
		`Modifiers.effective` is the one implementation of every axis.
	]]
	local radius = Modifiers.effective(state, RADIUS_AXIS)
	local radiusSquared = radius * radius

	local changed = false

	-- (3) Every uncleared patch of the LIVE BAY — `state.patches` holds that bay and no
	-- other, which is plots's guarantee and the reason no index here can reach a finished
	-- area.
	for index, patch in ipairs(patches) do
		if not patch.cleared then
			-- XZ ONLY, so height never affects reach. Squared, to keep a square root out of
			-- a loop that runs up to 640 times per player per tick.
			local dx = patch.position.X - rootPosition.X
			local dz = patch.position.Z - rootPosition.Z
			if dx * dx + dz * dz <= radiusSquared then
				clearPatch(state, player, index, patch)
				changed = true
			end
		end
	end

	--[[
		(4) The area, after the loop.

		The live area is areasFinished + 1, always. Incrementing it IS the completion:
		`cleared` is emptied and `clearedCount` zeroed with it, so the payload never grows
		with progress, and `plots.advance` then rebuilds `state.patches` for the new bay.
		The finished bay keeps no record anywhere, which is why a rejoin cannot be paid for
		it a second time and why there is no latch to check here.

		The label fired is the FINISHED area's, read before the increment.
	]]
	local liveSpec = areaSpec(state.areasFinished + 1)
	if state.clearedCount >= liveSpec.patchCount then
		state.areasFinished += 1
		table.clear(state.cleared)
		state.clearedCount = 0

		-- plots.liveGeometry.bayBuiltAt is "the instant the previous bay's last patch
		-- clears", so this is here and not in a deferred job. It reads the areasFinished
		-- this line has already incremented.
		Plots.advance(state)

		Protocol.channel(AREA_RESTORED):FireClient(player, liveSpec.label)
		changed = true
	end

	-- (5) At most one per player per tick, and none at all on a pass that cleared nothing.
	-- currency, found, clearedCount and areasFinished change here and nowhere else, so
	-- without this push every readout sits frozen until the next purchase.
	if changed then
		Protocol.channel(STATE_CHANGED):FireClient(player, buildSnapshot(state))
	end
end

--[[
	One pass over the whole live collection.

	Per state, in this order: arm or re-arm the gate and return if the character has not
	moved far enough yet; read the effective radius once; clear every uncleared patch of
	the live bay within that XZ distance, paying for each and revealing what it hid;
	advance the area if its last patch just went; and push one StateChanged if the pass
	changed anything.

	Iteration order over the collection is undefined and nothing here depends on it: every
	payout, reveal and advance is one player's and order-free. social.forbidden X3 bans any
	server-held value more than one player's action increments, so there is nothing shared
	for an order to matter to.
]]
function Clearing.tick(states: States)
	for _, state in pairs(states) do
		tickPlayer(state)
	end
end

--[[
	Install the `ClearTickRate` loop and return immediately.

	Called once by server-main at boot, before any player can join, so an empty collection
	on the first ticks is normal. The collection is held by reference: server-main mutates
	the same table as players come and go, and this module never copies or replaces it.

	Every pass is guarded and a failure warns, so one bad pass cannot stop the loop.
	`xpcall` rather than `pcall` only because a `pcall` of a function that returns nothing
	is typed as returning one value, so the error message could not be read back out of it;
	the guarantee is the same one. This module owns the cadence, so no other module reads
	ClearTickRate — except modifiers.ceiling, which reads it as a number to compute the
	speed ceiling and never as a cadence.
]]
function Clearing.start(states: States)
	if started then
		warn("[Clearing] start called more than once; the second collection is ignored")
		return
	end
	started = true

	task.spawn(function()
		-- Waits first, so the first pass lands after the rest of boot rather than during
		-- it. There is no way to stop this loop: nothing in the contract asks for one, and
		-- the loop dies with the server.
		while true do
			task.wait(Config.ClearTickRate)

			xpcall(Clearing.tick, function(err)
				warn(`[Clearing] a tick failed and was skipped: {err}`)
			end, states)
		end
	end)
end

return Clearing
