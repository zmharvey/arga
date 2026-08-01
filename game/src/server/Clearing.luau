--!strict
--[[
	Clearing — server.

	The earn side of the core loop. Every `runtime.clearTickRate` the server looks at
	where each player is standing, removes the patches inside their current clear
	radius, pays for each one and reveals whatever was under it.

	OBSERVED, NEVER CLAIMED. There is no clearing channel and no currency channel: the
	server measures the distance itself, on its own tick. This module reads no client
	message and uses no Touched event — both are client-authoritative physics, and a
	patch is worth currency.

	THE LATCH IS THE FIRST THING A PASS READS. A state whose `areaComplete` is true is
	skipped whole: before the character lookup, before any distance work, before any
	write and before any remote. A finished area stays walkable and stays bare, and it
	cannot be made to pay a second time by walking back into it after a respawn.

	Remotes are reached only through `Protocol.channel(name)`; nothing here searches the
	tree for one. `plots` is a dependency on paper only — this module reads `state.patches`,
	sets `Patch.cleared` and destroys `Patch.instance`, and calls nothing on that module,
	so `Plots.luau` is deliberately not required.

	Every tuned number comes from GameConfig, with the one exception named below.
]]

local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Shared = ReplicatedStorage:WaitForChild("UIForge")
local GameConfig = require(Shared.GameConfig)
local Protocol = require(Shared.Protocol)
local Progression = require(script.Parent.Progression)

-- NOT IN GameConfig — the floor under a single patch's payout, in currency units. The
-- build brief states it three times in prose ("max(1, floor(tier.value * multiplier))",
-- and again as this module's third acceptance criterion) but the emitter produces no key
-- for it, so it cannot be re-emitted. Named here rather than spelled inline, and reported
-- as a config gap in Clearing.report.md.
local MINIMUM_PAYOUT = 1

-- The engine's name for the part a character is measured from. A Roblox name, not a
-- tuned value, so it is not config; named because it is the one string this module
-- looks up in the world.
local ROOT_PART_NAME = "HumanoidRootPart"

-- The three channels this module originates. These are keys of Protocol.REMOTES, which
-- exposes no symbolic constant for a channel name — `Protocol.channel` errors on a name
-- REMOTES does not declare, so a typo here is loud at the first fire rather than a nil
-- somewhere else. See the report: there is no way to reach a channel name that does not
-- involve writing it once.
local FIND_REVEALED = "FindRevealed"
local AREA_RESTORED = "AreaRestored"
local STATE_CHANGED = "StateChanged"

--[[
	One patch record, from 03-state-shape.md's `Patch` type. Restated here rather than
	imported: the record is `layout`'s and `plots` re-exports it, but neither is a module
	this one may require — `plots` is forbidden outright, and `layout` is not among this
	module's dependencies.

	`position` is WORLD space by the time it reaches here; `plots.spawn` does that
	conversion and is the only place it happens.
]]
type Patch = {
	position: Vector3,
	tierIndex: number,
	relic: string?,
	cleared: boolean,
	instance: BasePart?,
}

--[[
	The live per-player state of 03-state-shape.md, restated for the same reason: no
	module in the build order owns a shared PlayerState type.

	This module is the only session writer of `cleared`, `clearedCount`, `found` and
	`areaComplete`. It writes `currency` only through `progression.award`, and it writes
	`patches` only through the `Patch` records themselves.
]]
export type PlayerState = {
	currency: number,
	upgrades: { [string]: number },
	patches: { Patch },
	cleared: { [number]: boolean },
	clearedCount: number,
	found: { [string]: boolean },
	areaComplete: boolean,
	player: Player,
}

-- The WHOLE live collection, one entry per connected player, keyed by UserId. Held by
-- reference and mutated in place by server-main: this module never copies it and never
-- replaces it.
export type States = { [number]: PlayerState }

local Clearing = {}

-- Set by `start`, so a second call cannot install a second loop and double the tick rate.
local started = false

--[[
	The BasePart a player's position is measured from, or nil if the character is not
	up yet. Absent between a join and the first CharacterAdded, and again for the
	respawn gap after a death, which is a skip and not an error.
]]
local function rootPartOf(player: Player): BasePart?
	local character = player.Character
	if character == nil then
		return nil
	end

	local root = character:FindFirstChild(ROOT_PART_NAME)
	if root == nil or not root:IsA("BasePart") then
		return nil
	end

	return root
end

--[[
	A snapshot of a state: exactly the fields `Protocol.snapshotShape()` names, in the
	order it names them, read off the state by name rather than by a field-name literal
	written here. `patches`, `cleared` and `player` never cross the wire.

	Shallow by design. `upgrades` and `found` go over as the live tables; FireClient
	serialises them at the moment of the call, so a later mutation cannot reach a
	payload that has already been sent.
]]
local function buildSnapshot(state: PlayerState): { [string]: any }
	local snapshot: { [string]: any } = {}
	for _, field in ipairs(Protocol.snapshotShape()) do
		snapshot[field] = (state :: any)[field]
	end
	return snapshot
end

--[[
	One pass over one player. See `Clearing.tick` for the ordering this must keep.
]]
local function tickPlayer(state: PlayerState)
	-- THE LATCH. First test in the function, ahead of everything, including the
	-- character lookup. Nothing below this line runs for a finished area: no distance
	-- test, no award, no write, no remote.
	if state.areaComplete then
		return
	end

	local player = state.player
	local root = rootPartOf(player)
	if root == nil then
		return
	end

	-- `plots.spawn` writes this after the state enters the collection but before the
	-- character loads, so the check above already covers the gap. Kept because a state
	-- with no patches is a skip rather than an error that would abort the whole pass.
	local patches = state.patches
	if patches == nil then
		return
	end

	-- Both read once per pass. The radius is read fresh every tick and cached nowhere,
	-- which is what makes Reach take effect on the tick after a purchase with no apply
	-- step. Nothing in the loop below yields, so neither value can change part-way
	-- through a pass.
	local radius = Progression.clearRadius(state)
	local radiusSquared = radius * radius
	local multiplier = Progression.valueMultiplier(state)

	local rootPosition = root.Position
	local tiers = GameConfig.Tiers
	local changed = false

	for index, patch in ipairs(patches) do
		if not patch.cleared then
			-- XZ ONLY, so height never affects reach. Squared, to keep a square root
			-- out of a loop that runs up to area.patchCount times per player per tick.
			local dx = patch.position.X - rootPosition.X
			local dz = patch.position.Z - rootPosition.Z
			if dx * dx + dz * dz <= radiusSquared then
				patch.cleared = true

				local instance = patch.instance
				if instance ~= nil then
					instance:Destroy()
				end
				patch.instance = nil

				-- `clearedCount` is defined as the number of keys in `cleared`, so it
				-- moves only when a key actually appears. That is what holds it at or
				-- below area.patchCount across any number of rejoins.
				if state.cleared[index] ~= true then
					state.cleared[index] = true
					state.clearedCount += 1
				end

				local tier = tiers[patch.tierIndex]
				if tier == nil then
					-- A patch pointing at a tier the config does not have. The patch is
					-- still cleared, so the area can still be finished, but nothing is
					-- paid: a fabricated payout is worse than none.
					warn(
						`[Clearing] patch {index} has tierIndex {patch.tierIndex}, which GameConfig.Tiers does not have; cleared without payment`
					)
				else
					Progression.award(state, math.max(MINIMUM_PAYOUT, math.floor(tier.value * multiplier)))
				end

				local relic = patch.relic
				if relic ~= nil and not state.found[relic] then
					state.found[relic] = true
					Protocol.channel(FIND_REVEALED):FireClient(player, relic)
				end

				changed = true
			end
		end
	end

	-- The completion latch, set once and never cleared. `areaComplete` is false for the
	-- whole of this function by the guard at the top; the test is kept as written so the
	-- "exactly once" property is visible at the place that provides it.
	if state.clearedCount >= GameConfig.Area.patchCount and not state.areaComplete then
		state.areaComplete = true
		-- `areaComplete` is a snapshot field, so the latch itself is a change even on a
		-- pass that cleared nothing.
		changed = true
		Protocol.channel(AREA_RESTORED):FireClient(player, GameConfig.Area.label)
	end

	-- At most one per player per tick, and none at all on a pass that cleared nothing.
	-- currency, clearedCount, found and areaComplete change here and nowhere else, so
	-- without this push the balance readout and the progress bar sit frozen until the
	-- next purchase.
	if changed then
		Protocol.channel(STATE_CHANGED):FireClient(player, buildSnapshot(state))
	end
end

--[[
	One pass over the whole live collection.

	Per state, in this order: skip the state entirely if `areaComplete` is true; skip it
	if the character or its HumanoidRootPart is absent; read the clear radius once; clear
	every uncleared patch within that XZ distance, paying max(1, floor(tier.value *
	valueMultiplier)) for each and firing FindRevealed for a Find the player does not
	already hold; latch `areaComplete` and fire AreaRestored once if the last patch just
	went; and fire one StateChanged if the pass changed anything.

	Iteration order over the collection is undefined and nothing here depends on it:
	payouts and reveals are per-player and order-free.
]]
function Clearing.tick(states: States)
	for _, state in pairs(states) do
		tickPlayer(state)
	end
end

--[[
	Install the `GameConfig.ClearTickRate` loop and return immediately.

	Called once by server-main at boot, before any player can join, so an empty
	collection on the first ticks is normal. The collection is held by reference:
	server-main mutates the same table as players come and go.

	Every pass is guarded and a failure warns, so one bad pass cannot stop the loop.
	`xpcall` rather than `pcall` only because a `pcall` of a function that returns
	nothing is typed as returning one value, so the error message could not be read
	back out of it; the guarantee is the same one. This module owns the cadence, so no
	other module reads ClearTickRate.
]]
function Clearing.start(states: States)
	if started then
		warn("[Clearing] start called more than once; the second collection is ignored")
		return
	end
	started = true

	task.spawn(function()
		-- Waits first, so the first pass lands after the rest of boot rather than
		-- during it. There is no way to stop this loop: nothing in the contract asks
		-- for one, and the loop dies with the server.
		while true do
			task.wait(GameConfig.ClearTickRate)

			xpcall(Clearing.tick, function(err)
				warn(`[Clearing] a tick failed and was skipped: {err}`)
			end, states)
		end
	end)
end

return Clearing
