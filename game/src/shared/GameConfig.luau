--!strict
--[[
	Every number in the game, in one place.

	Taken from `concept/spec/incremental-spinoff-v2/`. Where the brief settled
	something it is cited; where the brief explicitly left a number open it is
	marked PLAYTEST and carries a starting value, because a stated wrong number can
	be corrected and a missing one cannot.

	The brief's own words on this: "how long an area should take, the cost curve on
	clearing upgrades, how density scales with depth" are left open. So these are
	starting values, not decisions.
]]

local GameConfig = {}

-- Overgrowth tiers.
--
-- ACCESSIBILITY, and it is a hard constraint rather than a preference:
-- 04-PRESENTATION.md requires that "rarity tiers must differ by shape or
-- silhouette, not only hue", because four tiers of green foliage is exactly the
-- case red-green colour blindness breaks, and tier is a core economic signal.
-- So `shape` is the primary channel here and `color` is secondary. A tier is
-- readable with the colour thrown away.
-- Colours are plain RGB triples and positions are plain numbers, deliberately: this
-- module constructs no Roblox types, so it loads and runs outside the engine and its
-- curves can actually be tested. Config that only loads inside Roblox is config
-- nobody checks. The server converts at use.
GameConfig.Tiers = {
	{ name = "Moss", shape = "Block", rgb = { 104, 142, 76 }, value = 1, weight = 52, height = 1.6 },
	{ name = "Fern", shape = "Cylinder", rgb = { 78, 128, 66 }, value = 3, weight = 28, height = 2.4 },
	{ name = "Bramble", shape = "Ball", rgb = { 58, 104, 58 }, value = 8, weight = 14, height = 2.8 },
	{ name = "Heartvine", shape = "Wedge", rgb = { 44, 86, 52 }, value = 20, weight = 6, height = 3.4 },
}

-- The three clearing upgrades. 02-GAMEPLAY.md settles the axes: "value per unit,
-- clear radius, and move speed". Relic luck was offered and declined, so it is
-- absent on purpose.
--
-- PLAYTEST: cost base and growth. 1.6x is the skill's own worked example, not a
-- researched figure — the brief could not source the reference's curve across
-- three source types.
GameConfig.Upgrades = {
	{
		id = "value",
		label = "VALUE",
		blurb = "Each patch pays more",
		costBase = 25,
		costGrowth = 1.6,
		maxLevel = 10,
		perLevel = 0.25, -- +25% payout per level, additive
	},
	{
		id = "radius",
		label = "REACH",
		blurb = "Clear a wider sweep as you walk",
		costBase = 40,
		costGrowth = 1.75,
		maxLevel = 8,
		perLevel = 1.1, -- studs added to the clearing radius per level
	},
	{
		id = "speed",
		label = "PACE",
		blurb = "Move faster between patches",
		costBase = 60,
		costGrowth = 1.8,
		maxLevel = 6,
		perLevel = 1.6, -- walkspeed added per level
	},
}

GameConfig.BaseClearRadius = 5.5 -- studs. PLAYTEST: "reach is the primary sensation"
GameConfig.BaseWalkSpeed = 16 -- Roblox default, so PACE reads as a real change

-- The area. 03-META.md: "discrete spaces that are cleared and permanently done",
-- and depth is progression. This slice ships one area, which is priority 1's
-- smallest honest version.
GameConfig.Area = {
	id = "east-terrace",
	label = "EAST TERRACE",
	originXZ = { 0, 0 },
	size = 120, -- studs square
	patchCount = 140, -- PLAYTEST: sets lap length, the number the brief could not source
	minSpacing = 6,
}

-- The collection. 02-GAMEPLAY.md: "~24 objects in 4 sets of 6", each set tied to
-- area depth, completing a set grants a permanent bonus.
--
-- Only set 1 is reachable in this slice, because only one area exists. The other
-- three sets are declared so the collection reads as 6-of-24 rather than 6-of-6 —
-- the brief is explicit that the long-term objective is all four sets.
GameConfig.RelicSets = {
	{ id = "terrace", label = "Terrace", depth = 1, relics = { "Sundial", "Ewer", "Hinge", "Tessera", "Stylus", "Bellcast" } },
	{ id = "cistern", label = "Cistern", depth = 2, relics = { "Sluice", "Weight", "Siphon", "Chain", "Grate", "Cup" } },
	{ id = "vault", label = "Vault", depth = 3, relics = { "Seal", "Ledger", "Coffer", "Key", "Tally", "Ring" } },
	{ id = "spire", label = "Spire", depth = 4, relics = { "Gnomon", "Lens", "Vane", "Crest", "Orrery", "Finial" } },
}

GameConfig.RelicsPerArea = 6 -- one set's worth buried in the area

-- 02-GAMEPLAY.md onboarding: "the first patch they clear has something under it"
-- and "the shuffle must not be allowed to decide this one". So the first relic is
-- placed deterministically next to spawn rather than rolled.
GameConfig.GuaranteedFirstRelic = true

-- Server authority. 04-PRESENTATION.md integrity: "clearing and currency awards
-- must be server-validated, or a client claiming arbitrary clears owns the game."
-- Clearing here is observed by the server rather than requested by the client, so
-- there is no clear-request to forge. This is the tick rate for that observation.
GameConfig.ClearTickRate = 0.12 -- seconds

GameConfig.DataStoreName = "ArgaRuin_v1"
GameConfig.SaveIntervalSeconds = 45

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
