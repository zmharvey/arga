--!strict
--[[
	progression — server.

	Owns currency, upgrade levels, purchase validation, and every quantity derived
	from an upgrade level: clear radius, walk speed and the payout multiplier.

	This module reads and writes PlayerState and NOTHING ELSE. In particular
	`walkSpeed` computes a number and writes no Instance property: the write to
	Humanoid.WalkSpeed belongs to server-main, in wiring.onSpawn and
	wiring.onPurchase. A build where that write is missing has a Pace upgrade that
	is purchasable and does nothing.

	Every tuned number comes from GameConfig. Both curves — price and effect — are
	GameConfig.upgradeCost and GameConfig.upgradeEffect and are never reimplemented
	or inlined here, so "additive or compounding" stays answered in exactly one
	place even though all three shipped axes are additive today.
]]

local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Shared = ReplicatedStorage:WaitForChild("UIForge")
local GameConfig = require(Shared.GameConfig)

-- The three axes, by the ids in GameConfig.Upgrades. GameConfig exposes the ladder
-- as an ordered array and no by-id accessor, so an id string is the only handle a
-- module has on one axis. Held here as named constants rather than spelled inline
-- so the coupling is visible in one place if the ladder is ever re-emitted.
local VALUE_ID = "value"
local RADIUS_ID = "radius"
local SPEED_ID = "speed"

-- One entry of GameConfig.Upgrades, in the emitter's spelling.
type UpgradeDef = {
	id: string,
	label: string,
	blurb: string,
	costBase: number,
	costGrowth: number,
	maxLevel: number,
	perLevel: number,
	base: number,
	mode: string,
}

-- Only the two PlayerState fields this module is the writer of. A caller passes the
-- whole state; the other fields belong to clearing, plots and persistence and are
-- deliberately not named here, so progression cannot come to depend on one.
export type PlayerState = {
	currency: number,
	upgrades: { [string]: number },
}

local Progression = {}

-- Returns the definition for an id, or nil if the ladder has no such axis. Linear
-- over three entries, on purchase only; no index is built, because a module may do
-- no work at require time.
local function findUpgrade(upgradeId: string): UpgradeDef?
	for _, def in ipairs(GameConfig.Upgrades) do
		if def.id == upgradeId then
			return def
		end
	end
	return nil
end

-- Same lookup for the three ids this module names itself. Their absence is not a bad
-- client message, it is a config that cannot support the game, so it throws rather
-- than returning a substitute number that nobody specified.
local function requireUpgrade(upgradeId: string): UpgradeDef
	return assert(
		findUpgrade(upgradeId),
		`progression: GameConfig.Upgrades has no entry with id "{upgradeId}"`
	)
end

-- The level the player HOLDS. A missing key reads as level 0; no upgrade is written
-- into state.upgrades until it is bought.
local function heldLevel(state: PlayerState, upgradeId: string): number
	return state.upgrades[upgradeId] or 0
end

-- Every derived quantity is this and nothing else: one config lookup, one held level,
-- one call to the shared effect curve.
local function effectOf(state: PlayerState, upgradeId: string): number
	local def = requireUpgrade(upgradeId)
	return GameConfig.upgradeEffect(def, heldLevel(state, upgradeId))
end

-- The only function that increases currency. `amount` is already multiplied by
-- valueMultiplier by the caller; applying the multiplier again here would square the
-- Value upgrade.
--
-- A non-positive award is a caller bug — clearing's minimum payout is 1 — so it is
-- rejected outright rather than clamped, the balance is left exactly as it was, and
-- the unchanged balance is returned. The comparison is written `not (amount > 0)` so
-- that NaN is rejected too.
function Progression.award(state: PlayerState, amount: number): number
	if not (amount > 0) then
		warn(`progression.award: ignoring a non-positive award of {amount}`)
		return state.currency
	end
	state.currency += amount
	return state.currency
end

-- Validate and apply, or change nothing and return false. The client sends an id and
-- nothing else: the cost and the level are read here, never accepted from a caller.
-- Returns false and mutates nothing if the id is unknown, if the axis is already at
-- maxLevel, or if the balance is below the price of the next level.
function Progression.tryBuy(state: PlayerState, upgradeId: string): boolean
	local def = findUpgrade(upgradeId)
	if def == nil then
		return false
	end

	local level = heldLevel(state, upgradeId)
	if level >= def.maxLevel then
		return false
	end

	local cost = GameConfig.upgradeCost(def, level)
	if state.currency < cost then
		return false
	end

	state.currency -= cost
	state.upgrades[upgradeId] = level + 1
	return true
end

-- Studs. At level 0 this is the Reach def's `base`, which the config also emits
-- separately as GameConfig.BaseClearRadius (5.5); the def is the one this reads, because
-- the effect curve is defined over the def. Read fresh by clearing on every tick and
-- cached nowhere, which is why Reach needs no apply step.
function Progression.clearRadius(state: PlayerState): number
	return effectOf(state, RADIUS_ID)
end

-- Studs per second. At level 0 this is the Pace def's `base`, which the config also
-- emits separately as GameConfig.BaseWalkSpeed (16). COMPUTES A NUMBER AND WRITES
-- NOTHING; server-main owns the write to Humanoid.WalkSpeed.
function Progression.walkSpeed(state: PlayerState): number
	return effectOf(state, SPEED_ID)
end

-- A multiplier, 1.0 at level 0. It multiplies a single tier's value, not a payout
-- stack. The floor and the minimum of 1 belong to clearing: they are properties of a
-- payout, not of the multiplier.
function Progression.valueMultiplier(state: PlayerState): number
	return effectOf(state, VALUE_ID)
end

return Progression
