--!strict
--[[
	Progression — server.

	Owns currency, upgrade levels, purchase validation, and every quantity derived
	from an upgrade level: clear radius, walk speed and the payout multiplier.

	This module holds no tuned numbers of its own. Every figure comes from
	`GameConfig`, and every curve goes through a `GameConfig` function
	(`upgradeCost`, `upgradeEffect`) rather than being restated here, so re-emitting
	the config changes behaviour without anybody editing this file. The only
	config-derived literals below are the three upgrade ids, which is how this
	module knows which axis drives which quantity.

	Nothing here trusts a caller for a cost or a level. `tryBuy` is handed an
	upgrade id and nothing else: the level comes from the state the server already
	holds and the cost is computed from the config curve at that level.
]]

local ReplicatedStorage = game:GetService("ReplicatedStorage")
local GameConfig = require(ReplicatedStorage.Shared.GameConfig)

local Progression = {}

-- The slice of the player state this module reads and writes. It is declared as
-- the subset it touches rather than as the whole PlayerState record: the fields
-- other modules own (patches, clearedCount, found, areaComplete, player) are none
-- of this module's business, and two of them are engine types this file would
-- otherwise have to name. A caller holding the full record can pass it here.
--
-- `upgrades` is keyed by GameConfig.Upgrades[].id. A missing key reads as level 0.
export type UpgradeLevels = { [string]: number }
export type ProgressionState = {
	currency: number,
	upgrades: UpgradeLevels,
}

-- The shape of one entry in GameConfig.Upgrades. Shape only; the values live in
-- the config.
type Upgrade = {
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

-- The three ids this module maps to the three derived quantities. Named here
-- because the config lists the axes but does not say which one is the reach, the
-- pace or the payout.
local VALUE_ID = "value"
local RADIUS_ID = "radius"
local SPEED_ID = "speed"

local upgradeById: { [string]: Upgrade } = {}
for _, upgrade in ipairs(GameConfig.Upgrades) do
	upgradeById[upgrade.id] = upgrade
end

-- An axis this module derives a quantity from has to exist. A config missing one
-- is a defect in the emitted config, not a runtime condition, so it fails at load
-- rather than silently substituting a default the design never stated.
local function requireAxis(upgradeId: string): Upgrade
	local upgrade = upgradeById[upgradeId]
	if upgrade == nil then
		error('Progression: GameConfig.Upgrades has no axis with id "' .. upgradeId .. '"', 0)
	end
	return upgrade
end

local valueAxis = requireAxis(VALUE_ID)
local radiusAxis = requireAxis(RADIUS_ID)
local speedAxis = requireAxis(SPEED_ID)

-- The stored level for one axis, made safe to compute with. A missing key is
-- level 0 by the state contract; a level that survived from an older config with
-- a wider ladder is clamped to the ladder that exists now, so a stale save can
-- never produce a reach or a pace outside the tuned range.
local function levelOf(state: ProgressionState, upgrade: Upgrade): number
	local stored = state.upgrades[upgrade.id]
	if stored == nil or stored ~= stored then
		return 0
	end
	return math.clamp(math.floor(stored), 0, upgrade.maxLevel)
end

-- Credit the player. Currency is only ever decremented by `tryBuy`, so an amount
-- that is not a positive finite number is ignored rather than applied.
function Progression.award(state: ProgressionState, amount: number)
	if not (amount > 0) then
		return
	end
	if amount == math.huge then
		return
	end
	state.currency += amount
end

-- Buy one level of an axis. Returns true only if the level was actually bought;
-- on any refusal nothing about the state changes.
function Progression.tryBuy(state: ProgressionState, upgradeId: string): boolean
	local upgrade = upgradeById[upgradeId]
	if upgrade == nil then
		return false
	end

	local level = levelOf(state, upgrade)
	if level >= upgrade.maxLevel then
		return false
	end

	local cost = GameConfig.upgradeCost(upgrade, level)
	if not (state.currency >= cost) then
		return false
	end

	state.currency -= cost
	state.upgrades[upgrade.id] = level + 1
	return true
end

-- How wide a sweep this player clears, in studs. At level 0 this is the reach
-- axis's base, which is GameConfig.BaseClearRadius.
function Progression.clearRadius(state: ProgressionState): number
	return GameConfig.upgradeEffect(radiusAxis, levelOf(state, radiusAxis))
end

-- How fast this player walks. At level 0 this is the pace axis's base, which is
-- GameConfig.BaseWalkSpeed. Returned, not applied: writing it onto a Humanoid
-- belongs to whoever owns the character.
function Progression.walkSpeed(state: ProgressionState): number
	return GameConfig.upgradeEffect(speedAxis, levelOf(state, speedAxis))
end

-- What one patch's tier value is multiplied by before it is awarded.
function Progression.valueMultiplier(state: ProgressionState): number
	return GameConfig.upgradeEffect(valueAxis, levelOf(state, valueAxis))
end

return Progression
