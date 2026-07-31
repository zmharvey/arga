--!strict
--[[
	Clearing — server.

	Observes player positions on a fixed tick, clears the patches within reach, awards
	currency for each one and reveals the Finds buried under them.

	The server observes; it never asks. There is no remote a client can fire to claim a
	patch, and no Touched event anywhere in this file — contact is decided here, from the
	HumanoidRootPart's position, because Touched fires from client-authoritative physics.

	Every tuned number comes from GameConfig: the cadence (ClearTickRate), the payout
	(Tiers[i].value) and the completion threshold (Area.patchCount). Re-emitting the config
	changes this module's behaviour without editing it.

	KNOWN CONTRACT GAP, resolved defensively rather than by inventing an interface:
	tick has to fire two server -> client RemoteEvents (FindRevealed, AreaRestored), but
	clearing's declared dependencies are config, progression and plots — protocol is not
	among them, start(states) is handed nothing but the collection, and the name of the
	Folder server-main parents the remotes to is stated nowhere. So the remotes are looked
	up lazily, by name, anywhere under ReplicatedStorage, and a lookup miss warns once and
	drops the signal instead of erroring. See Clearing.report.md.
]]

local ReplicatedStorage = game:GetService("ReplicatedStorage")

local Shared = ReplicatedStorage:WaitForChild("UIForge")
local GameConfig = require(Shared.GameConfig)
local Progression = require(script.Parent.Progression)

-- 03-state-shape's types, restated here because the build order has no shared Types
-- module. Only the fields this module reads or writes are load-bearing.
type Patch = {
	position: Vector3,
	tierIndex: number,
	relic: string?,
	cleared: boolean,
	instance: BasePart?,
}

type PlayerState = {
	currency: number,
	upgrades: { [string]: number },
	patches: { Patch }?,
	cleared: { [number]: boolean },
	clearedCount: number,
	found: { [string]: boolean },
	areaComplete: boolean,
	player: Player,
}

-- The whole live collection, keyed by UserId. Held by reference; never copied, never
-- replaced. Iteration order is undefined and nothing below depends on it.
type States = { [number]: PlayerState }

local Clearing = {}

local TICK_RATE = GameConfig.ClearTickRate
local TIERS = GameConfig.Tiers
local PATCH_COUNT = GameConfig.Area.patchCount
local AREA_LABEL = GameConfig.Area.label

-- Remote names. Both channels are named in the wiring and each carries one value:
-- FindRevealed a Find's name, AreaRestored the area's label.
local FIND_REVEALED = "FindRevealed"
local AREA_RESTORED = "AreaRestored"

local ROOT_PART_NAME = "HumanoidRootPart"

local started = false
local remotes: { [string]: RemoteEvent } = {}
local warnedMissing: { [string]: boolean } = {}

-- Resolve a RemoteEvent by name and cache it. Returns nil rather than erroring, so a
-- missing channel costs a warning and a lost notification, never a dead tick loop. The
-- search is recursive because the remotes Folder's name is not specified anywhere.
local function remoteEvent(name: string): RemoteEvent?
	local cached = remotes[name]
	if cached then
		return cached
	end

	local found = ReplicatedStorage:FindFirstChild(name, true)
	if found and found:IsA("RemoteEvent") then
		remotes[name] = found
		return found
	end

	if not warnedMissing[name] then
		warnedMissing[name] = true
		warn(`[Clearing] no RemoteEvent named "{name}" under ReplicatedStorage; not sending`)
	end
	return nil
end

--[[
	One pass over the whole collection. Per state, in this order: skip unless the character
	and its root part exist; read the radius once; clear every uncleared patch within that
	radius in XZ; then latch the area if this pass finished it.
]]
function Clearing.tick(states: States): ()
	for _, state in pairs(states) do
		local player = state.player
		local character = if player ~= nil then player.Character else nil
		local root = if character ~= nil then character:FindFirstChild(ROOT_PART_NAME) else nil
		local patches = state.patches

		-- A state with no character, no root part or no plot yet is skipped whole, not
		-- errored on: it is a player mid-join or mid-respawn, which is normal.
		if player == nil or root == nil or not root:IsA("BasePart") or patches == nil then
			continue
		end

		-- Both read once per state per pass: the radius because the contract says so, the
		-- multiplier for symmetry. Neither can change mid-pass — nothing in this loop
		-- yields, so a purchase cannot land between two patches of the same pass.
		local radius = Progression.clearRadius(state)
		local radiusSquared = radius * radius
		local multiplier = Progression.valueMultiplier(state)
		local origin = root.Position

		for index, patch in ipairs(patches) do
			if patch.cleared then
				continue
			end

			-- XZ only, so standing on a rooftop reaches the same patches as standing on
			-- the slab. Squared compare to skip the square root; boundary inclusive.
			local dx = patch.position.X - origin.X
			local dz = patch.position.Z - origin.Z
			if dx * dx + dz * dz > radiusSquared then
				continue
			end

			local tier = TIERS[patch.tierIndex]
			if tier == nil then
				warn(`[Clearing] patch {index} has no tier {tostring(patch.tierIndex)}; leaving it standing`)
				continue
			end

			patch.cleared = true

			local instance = patch.instance
			if instance ~= nil then
				instance:Destroy()
				patch.instance = nil
			end

			state.cleared[index] = true
			state.clearedCount += 1

			-- The floor and the minimum of 1 belong here, not to progression: they are
			-- properties of a payout, not of the multiplier.
			Progression.award(state, math.max(1, math.floor(tier.value * multiplier)))

			local relic = patch.relic
			if relic ~= nil and not state.found[relic] then
				state.found[relic] = true

				local revealed = remoteEvent(FIND_REVEALED)
				if revealed ~= nil then
					revealed:FireClient(player, relic)
				end
			end
		end

		-- The latch, checked after the loop so a pass that clears the last several patches
		-- still fires exactly once. areaComplete is set once and never cleared; cleared
		-- collapses to empty because the flag already implies every index, and
		-- clearedCount survives that collapse.
		if not state.areaComplete and state.clearedCount >= PATCH_COUNT then
			state.areaComplete = true
			state.cleared = {}

			local restored = remoteEvent(AREA_RESTORED)
			if restored ~= nil then
				restored:FireClient(player, AREA_LABEL)
			end
		end
	end
end

--[[
	Install the tick loop and return. Called once at boot, before any player can join, so
	an empty collection on the first passes is normal. Each pass is wrapped in a pcall: one
	bad iteration warns and the next pass still happens.
]]
function Clearing.start(states: States): ()
	if started then
		warn("[Clearing] start called twice; the second call does nothing")
		return
	end
	started = true

	task.spawn(function()
		while true do
			-- Wait first, so start does no work in the frame that calls it.
			task.wait(TICK_RATE)

			local ok, err = pcall(Clearing.tick, states)
			if not ok then
				warn(`[Clearing] tick failed: {tostring(err)}`)
			end
		end
	end)
end

return Clearing
