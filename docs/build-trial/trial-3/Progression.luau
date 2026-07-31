--!strict
--[[
	progression — server.

	Owns currency, upgrade levels, purchase validation, and every quantity derived
	from an upgrade level: clear radius, walk speed and the payout multiplier.

	Two properties this module keeps deliberately:

	1. It COMPUTES AND WRITES NOTHING to the engine. `walkSpeed` returns a number;
	   the write to Humanoid.WalkSpeed is server-main's, in wiring.onSpawn and
	   wiring.onPurchase. Trial 1 shipped that function with no writer and Pace was
	   purchasable with no effect, so the split is recorded here as well as there.

	2. It reimplements neither curve. The cost curve is GameConfig.upgradeCost and
	   the effect curve is GameConfig.upgradeEffect; clearRadius, walkSpeed and
	   valueMultiplier are each one call to the latter and nothing else. All three
	   shipped axes are additive today, which is exactly why inlining the arithmetic
	   would look harmless and would silently ignore a future compounding axis.

	Nothing is cached: every getter reads the level out of state on each call, which
	is why a purchase takes effect on the next clearing tick with no apply step.
]]

local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Shared = ReplicatedStorage:WaitForChild("UIForge")
local GameConfig = require(Shared.GameConfig)

-- The three axis ids. These are the `id` fields of GameConfig.Upgrades; which axis
-- feeds which getter is progression's own mapping, and config exposes no symbolic
-- name for it, so the ids appear here as the keys they are used as.
local VALUE_UPGRADE_ID = "value"
local RADIUS_UPGRADE_ID = "radius"
local SPEED_UPGRADE_ID = "speed"

-- One entry of GameConfig.Upgrades. Restated structurally because GameConfig
-- exports no types; it is generated, so a field added there is a field to add here.
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

-- Only the two fields progression is the declared writer of. A full PlayerState
-- carries more (patches, cleared, found, ...) and is accepted here by width
-- subtyping; this type is intentionally the narrow contract rather than a second
-- copy of the whole state shape, which persistence.defaultState owns.
type PlayerState = {
	currency: number,
	upgrades: { [string]: number },
}

local Progression = {}

-- Linear scan over three entries rather than an id -> def map, because a map would
-- be work at require time and every module here is required to do none.
local function definitionFor(upgradeId: string): UpgradeDef?
	for _, def in ipairs(GameConfig.Upgrades) do
		if def.id == upgradeId then
			return def
		end
	end
	return nil
end

-- For the derived getters, whose axis id is this module's own constant and not a
-- client's string: a missing def means the emitted config lost an axis these
-- functions name, which is a config defect and not a runtime condition to absorb.
local function definitionOrError(upgradeId: string): UpgradeDef
	local def = definitionFor(upgradeId)
	if def == nil then
		error(string.format("Progression: GameConfig.Upgrades has no upgrade with id %q", upgradeId))
	end
	return def
end

-- A missing key reads as level 0, per the state shape.
local function heldLevel(state: PlayerState, upgradeId: string): number
	local level = state.upgrades[upgradeId]
	if level == nil then
		return 0
	end
	return level
end

local function effectOf(state: PlayerState, upgradeId: string): number
	return GameConfig.upgradeEffect(definitionOrError(upgradeId), heldLevel(state, upgradeId))
end

-- The only function that increases currency. `amount` is already multiplied by
-- valueMultiplier by the caller; applying one here too would square the Value
-- upgrade. A non-positive amount is a caller bug, not a value to clamp, so it is
-- rejected: the balance is returned unchanged and nothing is written.
function Progression.award(state: PlayerState, amount: number): number
	if not (amount > 0) then
		warn(string.format("Progression.award ignored a non-positive amount: %s", tostring(amount)))
		return state.currency
	end

	state.currency += amount
	return state.currency
end

-- The server prices the purchase. The caller supplies an id and nothing else: no
-- cost, no level, no target level.
function Progression.tryBuy(state: PlayerState, upgradeId: string): boolean
	local def = definitionFor(upgradeId)
	if def == nil then
		return false
	end

	local held = heldLevel(state, upgradeId)
	if held >= def.maxLevel then
		return false
	end

	local cost = GameConfig.upgradeCost(def, held)
	if state.currency < cost then
		return false
	end

	state.currency -= cost
	state.upgrades[upgradeId] = held + 1
	return true
end

-- Studs. GameConfig.BaseClearRadius at level 0.
function Progression.clearRadius(state: PlayerState): number
	return effectOf(state, RADIUS_UPGRADE_ID)
end

-- Studs per second. GameConfig.BaseWalkSpeed at level 0. Computes only; server-main
-- performs the write.
function Progression.walkSpeed(state: PlayerState): number
	return effectOf(state, SPEED_UPGRADE_ID)
end

-- A multiplier on one tier's value, 1.0 at level 0. The floor and the minimum of 1
-- belong to clearing: they are properties of a payout, not of the multiplier.
function Progression.valueMultiplier(state: PlayerState): number
	return effectOf(state, VALUE_UPGRADE_ID)
end

return Progression
