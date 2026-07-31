--!strict
--[[
	GENERATED FILE — do not edit.

	Emitted from CID spec sheets by `npm run bridge -- --emit`. Edit the sheet that
	owns a value and re-emit; a hand edit here is overwritten and, worse, silently
	diverges from the sheet that is supposed to be the record.

	Every number below was supplied by a named sheet. `npm run bridge` prints which.

	This module constructs no Roblox types — RGB triples and plain numbers only — so it
	loads outside the engine and its curves can be executed by
	`game/test/config.spec.luau`. Config that only loads inside Roblox is config
	nobody checks.
]]

local GameConfig = {}

-- Overgrowth tiers. From gameplay/systems/01-overgrowth-tiers.md.
--
-- `shape` is the primary channel and `rgb` is secondary, because rarity has to stay
-- readable with the colour thrown away. The schema refuses two tiers that share a
-- shape, so this property cannot be lost by editing a sheet.
GameConfig.Tiers = {
	{ name = "Moss", shape = "Block", rgb = { 104, 142, 76 }, value = 1, weight = 52, height = 1.6 },
	{ name = "Fern", shape = "Cylinder", rgb = { 78, 128, 66 }, value = 3, weight = 28, height = 2.4 },
	{ name = "Bramble", shape = "Ball", rgb = { 58, 104, 58 }, value = 8, weight = 14, height = 2.8 },
	{ name = "Heartvine", shape = "Wedge", rgb = { 44, 86, 52 }, value = 20, weight = 6, height = 3.4 },
}

-- The spend side of the loop. From gameplay/balance/01-upgrade-ladder.md.
--
-- `base` and `mode` exist because `perLevel` alone does not describe an effect. A builder
-- handed 1.1 cannot tell whether maxed Reach is 14.3 or 11.79, and both readings satisfied
-- every acceptance criterion that existed before the first build trial asked.
GameConfig.Upgrades = {
	{
		id = "value",
		label = "Value",
		blurb = "Each patch pays more",
		costBase = 25,
		costGrowth = 1.6,
		maxLevel = 10,
		perLevel = 0.25,
		base = 1,
		mode = "additive",
	},
	{
		id = "radius",
		label = "Reach",
		blurb = "Clear a wider sweep as you walk",
		costBase = 40,
		costGrowth = 1.75,
		maxLevel = 8,
		perLevel = 1.1,
		base = 5.5,
		mode = "additive",
	},
	{
		id = "speed",
		label = "Pace",
		blurb = "Move faster between patches",
		costBase = 60,
		costGrowth = 1.8,
		maxLevel = 6,
		perLevel = 1.6,
		base = 16,
		mode = "additive",
	},
}

-- The one formula. Every axis goes through here, so "additive or compounding" is answered
-- in one place rather than re-decided by each module that reads a level.
function GameConfig.upgradeEffect(upgrade: { base: number, perLevel: number, mode: string }, level: number): number
	if upgrade.mode == "compounding" then
		return upgrade.base * (upgrade.perLevel ^ level)
	end
	return upgrade.base + upgrade.perLevel * level
end

-- Movement, before upgrades. From gameplay/mechanics/01-reach-and-pace.md.
GameConfig.BaseClearRadius = 5.5
GameConfig.BaseWalkSpeed = 16

-- The currency. From gameplay/systems/02-the-currency.md.
--
-- This existed as the bare string "SHARDS" in a HUD brief and in the shipped screen
-- before any sheet owned it, which is how an unowned value hides: the merger cannot see
-- a literal nobody declared. Every display of the currency now derives from here.
GameConfig.Currency = {
	name = "Shard",
	plural = "Shards",
	icon = "shard",
}

-- One patch's physical footprint. From art/objects/01-patch-footprint.md.
GameConfig.Patch = {
	footprint = 3,
	collides = false,
	material = "Grass",
}

-- The area. From gameplay/meta/01-the-area.md.
--
-- The schema checks that patchCount actually fits at this size and spacing, so an
-- area cannot quietly under-fill and be smaller than it claims.
GameConfig.Area = {
	id = "east-terrace",
	label = "East Terrace",
	originXZ = { 0, 0 },
	size = 120,
	patchCount = 140,
	minSpacing = 6,
}

-- The collection. From gameplay/meta/02-the-collection.md.
--
-- These names are CID's work, not the builder's. When they were absent the builder
-- invented six of them, which is the exact failure this seam exists to remove.
GameConfig.RelicSets = {
	{ id = "terrace", label = "Terrace", depth = 1, relics = { "Sundial", "Ewer", "Hinge", "Tessera", "Stylus", "Bellcast" } },
	{ id = "cistern", label = "Cistern", depth = 2, relics = { "Sluice", "Weight", "Siphon", "Chain", "Grate", "Cup" } },
	{ id = "vault", label = "Vault", depth = 3, relics = { "Seal", "Ledger", "Coffer", "Key", "Tally", "Ring" } },
	{ id = "spire", label = "Spire", depth = 4, relics = { "Gnomon", "Lens", "Vane", "Crest", "Orrery", "Finial" } },
}

GameConfig.RelicsPerArea = 6

-- How many areas exist at one depth. In SCHEMA but previously not emitted, so a
-- config-level predicate could not see the value it depended on. Found by the
-- depth-escalation sheet: a key that validates but never reaches the build is a key
-- nothing downstream can check.
GameConfig.AreasPerDepth = 1

-- The player-facing word for the class. Renamed once already, by a ban list that the
-- merger enforces: the previous noun was occupied inside this game's own genre family.
GameConfig.FindNoun = { singular = "Find", plural = "Finds" }

-- From gameplay/onboarding/01-first-find.md. The first find is placed, not rolled, so the promise
-- that the first patch has something under it cannot be broken by the shuffle.
GameConfig.GuaranteedFirstRelic = true

-- Server cadences. From 01-runtime.md.
GameConfig.ClearTickRate = 0.12
GameConfig.SaveIntervalSeconds = 45
GameConfig.DataStoreName = "ArgaRuin_v1"

function GameConfig.upgradeCost(upgrade: { costBase: number, costGrowth: number }, level: number): number
	return math.floor(upgrade.costBase * (upgrade.costGrowth ^ level))
end

function GameConfig.tierByWeight(roll: number)
	local total = 0
	for _, t in ipairs(GameConfig.Tiers) do
		total += t.weight
	end
	local pick = roll * total
	local running = 0
	for index, t in ipairs(GameConfig.Tiers) do
		running += t.weight
		if pick <= running then
			return index, t
		end
	end
	return 1, GameConfig.Tiers[1]
end

return GameConfig
