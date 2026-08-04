--!strict
--[[
	Progression — server.

	Owns the player's currency balance, the upgrade levels, purchase validation, and the
	two movement stats derived from those levels.

	Every tuned number is read from GameConfig, so re-emitting the config from its sheets
	changes behaviour without a code edit here. One binding is the exception and is code
	rather than config — see RADIUS_UPGRADE_ID below.

	State is mutated in place; nothing is returned to be re-assigned. This module
	constructs no Roblox types and touches no Instance, so it loads and runs outside the
	engine.
]]

local ReplicatedStorage = game:GetService("ReplicatedStorage")

local GameConfig = require(ReplicatedStorage.Shared.GameConfig)

-- Which upgrade drives which derived stat. GameConfig lists the upgrades and their
-- per-level step but never says what any of them changes, so this binding cannot be read
-- out of config: renaming an id in the upgrade-ladder sheet reverts the stat to its base
-- silently. Kept as named constants so that the coupling is at least visible.
local RADIUS_UPGRADE_ID = "radius"
local SPEED_UPGRADE_ID = "speed"

export type UpgradeLevels = { [string]: number }

-- The slice of player state this module owns. It reads and writes no other field.
export type State = {
	currency: number,
	levels: UpgradeLevels,
}

type Upgrade = {
	id: string,
	label: string,
	blurb: string,
	costBase: number,
	costGrowth: number,
	maxLevel: number,
	perLevel: number,
}

local Progression = {}

-- Linear scan rather than a cached id -> upgrade map. GameConfig.Upgrades holds three
-- entries, so the scan is free, and a cache would be one more thing that can go stale
-- against a re-emitted config.
local function findUpgrade(upgradeId: string): Upgrade?
	for _, upgrade in ipairs(GameConfig.Upgrades) do
		if upgrade.id == upgradeId then
			return upgrade
		end
	end
	return nil
end

-- The level held for one upgrade, forced onto a whole number inside [0, maxLevel].
--
-- A stored level is never trusted. It arrives from a datastore rather than from this
-- module, and an out-of-range one would otherwise scale a derived stat without limit —
-- the same exploit the maxLevel check in tryBuy exists to close, arriving by a different
-- door. A missing entry means the upgrade has never been bought.
local function heldLevel(state: State, upgrade: Upgrade): number
	local stored = state.levels[upgrade.id]
	if stored == nil or stored ~= stored then
		return 0
	end

	local level = math.floor(stored)
	if level < 0 then
		return 0
	end
	if level > upgrade.maxLevel then
		return upgrade.maxLevel
	end
	return level
end

-- base + one flat perLevel step per level held. Additive, not compounding: `perLevel`
-- names a step, and compounding the 1.6 on `speed` would put walk speed at 268 by its
-- own maxLevel. At level 0 this is exactly `base`.
local function derived(state: State, upgradeId: string, base: number): number
	local upgrade = findUpgrade(upgradeId)
	if upgrade == nil then
		return base
	end
	return base + heldLevel(state, upgrade) * upgrade.perLevel
end

-- Adds to the balance. Amounts that are not strictly positive are ignored rather than
-- applied, so this cannot be used as a spend path; the comparison is written so that NaN
-- is ignored too, since one NaN in the balance would make every later purchase fail.
function Progression.award(state: State, amount: number)
	if not (amount > 0) then
		return
	end

	state.currency += amount
end

-- Buys one level of `upgradeId`. The caller supplies an id and nothing else: the cost
-- comes from GameConfig.upgradeCost and the level from server state, so neither can be
-- supplied by a client. Returns false and changes nothing on an unknown id, at maxLevel,
-- or below cost.
function Progression.tryBuy(state: State, upgradeId: string): boolean
	local upgrade = findUpgrade(upgradeId)
	if upgrade == nil then
		return false
	end

	local level = heldLevel(state, upgrade)
	if level >= upgrade.maxLevel then
		return false
	end

	-- The cost of the step out of the level currently held, so the first buy of any
	-- upgrade costs exactly its costBase.
	local cost = GameConfig.upgradeCost(upgrade, level)
	if state.currency < cost then
		return false
	end

	state.currency -= cost
	state.levels[upgrade.id] = level + 1
	return true
end

function Progression.clearRadius(state: State): number
	return derived(state, RADIUS_UPGRADE_ID, GameConfig.BaseClearRadius)
end

function Progression.walkSpeed(state: State): number
	return derived(state, SPEED_UPGRADE_ID, GameConfig.BaseWalkSpeed)
end

return Progression
