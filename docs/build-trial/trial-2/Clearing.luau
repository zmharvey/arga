--!strict
--[[
	Clearing — server.

	The server watches where each player is standing on a fixed cadence and clears every
	patch within that player's reach. Two things it deliberately does not do:

	  * it listens to no RemoteEvent. A client that can say "I cleared this" can say it
	    about a patch it never walked to, so the claim is never accepted from that side —
	    the server observes a position and decides for itself.
	  * it uses no Touched event. Touched fires from the toucher's own physics simulation,
	    which on Roblox is the client's, so a Touched-driven payout is the same trust
	    problem wearing a different hat.

	The cost of that is a poll: GameConfig.ClearTickRate seconds between sweeps, every
	uncleared patch distance-tested against the player's current radius.
]]

local ReplicatedStorage = game:GetService("ReplicatedStorage")

local GameConfig = require(ReplicatedStorage.Shared.GameConfig)
local Progression = require(script.Parent.Progression)

--[[
	The shape of one player's live state, as described by tech/architecture/03-player-state.md.
	No module is named as the owner of this type declaration, so it is restated here;
	Luau's types are structural, so a second copy elsewhere still interoperates.
]]
export type Patch = {
	position: Vector3,
	tierIndex: number,
	relic: string?,
	cleared: boolean,
	instance: BasePart?,
}

export type PlayerState = {
	currency: number,
	upgrades: { [string]: number },
	patches: { Patch },
	clearedCount: number,
	found: { [string]: boolean },
	areaComplete: boolean,
	player: Player,
}

-- Keyed by anything: the collection server-main holds is not specified as an array, a
-- map by Player or a map by UserId, and every one of those iterates the same under pairs.
export type PlayerStates = { [any]: PlayerState }

local Clearing = {}

-- The character part the server reads a position from. Every default Roblox rig has one
-- and it is the part the humanoid is actually driven by, so it is the position that
-- matches where the player believes they are standing.
local ROOT_PART_NAME = "HumanoidRootPart"

-- start() is idempotent: a second call must not put a second sweep loop on the same
-- states, which would double the cadence the sheet specifies.
local started = false
local activeStates: PlayerStates = {}

--[[
	nil whenever the player has no character in the world — between spawns, during a
	death, or before the first spawn has replicated. A player with no body clears nothing.
]]
local function rootPosition(player: Player): Vector3?
	local character = player.Character
	if character == nil then
		return nil
	end

	local root = character:FindFirstChild(ROOT_PART_NAME)
	if root == nil or not root:IsA("BasePart") then
		return nil
	end

	return root.Position
end

--[[
	Pay out one patch and record it.

	Order matters here. The patch is marked cleared before anything else runs, so that if
	a later step throws, the retry on the next tick cannot pay for the same patch twice.
	Losing one payout to a thrown error is recoverable; minting currency is not.
]]
local function clearPatch(state: PlayerState, patch: Patch, multiplier: number)
	patch.cleared = true

	-- Nothing in the build order owns removing a single patch's Instance: plots builds and
	-- tears down a whole plot only. A cleared patch that stays in the world is
	-- indistinguishable from an uncleared one, so it is destroyed from here.
	local instance = patch.instance
	if instance ~= nil then
		patch.instance = nil
		instance:Destroy()
	end

	local tier = GameConfig.Tiers[patch.tierIndex]
	local tierValue = 0
	if tier ~= nil then
		tierValue = tier.value
	else
		warn(`[Clearing] patch has tierIndex {patch.tierIndex}, which is not a configured tier`)
	end

	Progression.award(state, math.max(1, math.floor(tierValue * multiplier)))

	local relic = patch.relic
	if relic ~= nil then
		state.found[relic] = true
	end

	state.clearedCount += 1

	-- A latch, per the player-state sheet: set once, never cleared. Counted against the
	-- area's configured patchCount rather than against however many patches this plot
	-- happens to hold.
	if not state.areaComplete and state.clearedCount >= GameConfig.Area.patchCount then
		state.areaComplete = true
	end
end

--[[
	One player, one sweep.

	Reach is measured on the ground plane, ignoring height. The root part sits above the
	patches by an amount nobody specified, and tier heights run 1.6 to 3.4 studs, so a
	straight 3D distance would quietly make the rarest tiers the hardest to stand near.
]]
local function sweep(state: PlayerState)
	local origin = rootPosition(state.player)
	if origin == nil then
		return
	end

	-- Read once per sweep. Neither call yields, and no purchase can land inside the loop
	-- below, so every patch cleared on this tick is paid at one consistent rate.
	local radius = Progression.clearRadius(state)
	local multiplier = Progression.valueMultiplier(state)
	local radiusSquared = radius * radius

	for _, patch in ipairs(state.patches) do
		if not patch.cleared then
			local offsetX = patch.position.X - origin.X
			local offsetZ = patch.position.Z - origin.Z
			if offsetX * offsetX + offsetZ * offsetZ <= radiusSquared then
				clearPatch(state, patch, multiplier)
			end
		end
	end
end

--[[
	One sweep of every player in `states`. Exposed separately from start() so a caller
	that owns its own cadence can drive clearing directly, and so the whole rule is
	callable without a scheduler in the way.
]]
function Clearing.tick(states: PlayerStates)
	for _, state in pairs(states) do
		sweep(state)
	end
end

--[[
	Begin the sweep loop.

	`states` is optional because the exposed signature is start(). The collection is held
	by reference and read fresh on every tick, so joins and leaves that server-main writes
	into the same table are picked up without re-starting anything. Called with no
	argument, the loop runs against an empty set and the caller is expected to be driving
	Clearing.tick itself.
]]
function Clearing.start(states: PlayerStates?)
	if states ~= nil then
		activeStates = states
	end

	if started then
		return
	end
	started = true

	task.spawn(function()
		while true do
			task.wait(GameConfig.ClearTickRate)

			-- One bad state must not take the sweep down for everyone until the server
			-- restarts, so the tick is contained and retried on the next cadence.
			local ok, err = pcall(Clearing.tick, activeStates)
			if not ok then
				warn(`[Clearing] tick failed: {err}`)
			end
		end
	end)
end

return Clearing
