--!strict
--[[
	Clearing — server.

	Observes player positions on a fixed cadence, clears every patch inside the player's
	current clear radius, awards currency for what was cleared and reveals any relic the
	patch was hiding.

	The server observes. It never asks. There is deliberately no RemoteEvent, BindableEvent
	or any other inbound channel in this module: a client cannot claim a patch, name a
	patch, or report that it walked over one. The only input is a position the server read
	itself off the character on its own tick.

	For the same reason nothing here touches `Touched`. Touched fires from the client's
	physics simulation of its own character, so a client that owns its network ownership
	can manufacture as many of them as it likes, in any order, at any position. Sampling
	`HumanoidRootPart.Position` on a server tick is still client-supplied data, but it is
	one sample per tick that the server chose to take, not an unbounded event stream the
	client chose to send.

	Every tuned number is read from GameConfig. Nothing is restated here.
]]

local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")

local GameConfig = require(ReplicatedStorage.Shared.GameConfig)
local Progression = require(script.Parent.Progression)

local Clearing = {}

-- One patch on a player's plot. Built by Plots; Clearing only reads it, marks it cleared
-- and removes its Instance.
export type Patch = {
	instance: BasePart?,
	position: Vector3,
	tierIndex: number,
	relic: string?,
	cleared: boolean,
}

-- Progression's own State, widened with the fields Clearing touches. Intersected rather
-- than restated so that the currency and upgrade-level fields have exactly one author:
-- a state built here can be handed straight to Progression.award.
export type PlayerState = Progression.State & {
	patches: { Patch }?,
	relics: { [string]: boolean },
	areaComplete: boolean,
}

export type States = { [Player]: PlayerState }

-- The registry `start()` falls back to when it is called with no argument. A caller that
-- already holds the state table should pass it to `start(states)` instead.
Clearing.states = {} :: States

local heartbeat: RBXScriptConnection? = nil

-- Where the server thinks the player is right now. nil whenever there is nothing to
-- sample: no character yet, or a character that has not finished streaming in.
local function rootPosition(player: Player): Vector3?
	local character = player.Character
	if not character then
		return nil
	end
	local root = character:FindFirstChild("HumanoidRootPart")
	if not root or not root:IsA("BasePart") then
		return nil
	end
	return root.Position
end

-- Tier value scaled by the player's value multiplier, floored, never below 1. Floored
-- before the minimum is applied, so a multiplier under 1 still pays something.
local function payout(tierValue: number, multiplier: number): number
	return math.max(1, math.floor(tierValue * multiplier))
end

local function clearForPlayer(player: Player, state: PlayerState)
	-- The area-complete flag is set exactly once because this is the only place that sets
	-- it and this returns before reaching that line once it is set.
	if state.areaComplete then
		return
	end

	local patches = state.patches
	if not patches or #patches == 0 then
		-- A plot that has not spawned yet has no uncleared patches, which would otherwise
		-- read as a finished area.
		return
	end

	local origin = rootPosition(player)
	if not origin then
		return
	end

	local radius = Progression.clearRadius(state)
	local radiusSquared = radius * radius
	local multiplier = Progression.valueMultiplier(state)

	local earned = 0
	local remaining = 0

	for index, patch in ipairs(patches) do
		if patch.cleared then
			continue
		end

		-- Horizontal reach. Clearing is a sweep across the ground, so height difference
		-- between the root part and the patch does not shrink it.
		local dx = patch.position.X - origin.X
		local dz = patch.position.Z - origin.Z
		if dx * dx + dz * dz > radiusSquared then
			remaining += 1
			continue
		end

		-- Resolved before anything is mutated, so a bad index cannot half-clear a patch.
		local tier = GameConfig.Tiers[patch.tierIndex]
		assert(tier, `Clearing: patch {index} has no tier at index {patch.tierIndex}`)

		patch.cleared = true
		earned += payout(tier.value, multiplier)

		local instance = patch.instance
		if instance then
			instance:Destroy()
			patch.instance = nil
		end

		local relic = patch.relic
		if relic then
			state.relics[relic] = true
		end
	end

	if earned > 0 then
		Progression.award(state, earned)
	end

	if remaining == 0 then
		state.areaComplete = true
	end
end

-- One observation pass over every live player. Order is not significant: a plot belongs
-- to exactly one player, so no two entries can contend for the same patch.
function Clearing.tick(states: States)
	for player, state in pairs(states) do
		clearForPlayer(player, state)
	end
end

-- Drives `tick` at GameConfig.ClearTickRate. Idempotent: a second call while running is
-- ignored rather than doubling the cadence.
function Clearing.start(states: States?)
	if heartbeat then
		return
	end

	local target = states or Clearing.states
	local accumulated = 0

	heartbeat = RunService.Heartbeat:Connect(function(deltaTime: number)
		accumulated += deltaTime
		if accumulated < GameConfig.ClearTickRate then
			return
		end
		-- Carry the remainder so the average cadence is the configured rate rather than
		-- the frame boundary above it, but never bank more than one missed tick: a long
		-- hitch must not produce a burst of catch-up passes.
		accumulated = math.min(accumulated - GameConfig.ClearTickRate, GameConfig.ClearTickRate)
		Clearing.tick(target)
	end)
end

return Clearing
