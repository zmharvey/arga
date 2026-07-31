--!nonstrict
--[[
	Runs GameConfig's curves outside Roblox.

	This is possible only because GameConfig constructs no Roblox types — it holds RGB
	triples and plain numbers, and the server converts at use. Config that only loads
	inside the engine is config nobody ever checks, and these are the numbers the
	brief itself calls the highest-risk tuning in the game.

	    luau game/test/config.spec.luau
]]

local GC = require("../src/shared/GameConfig")

local failures = 0
local function check(ok: boolean, label: string)
	if ok then
		print("  ok    " .. label)
	else
		failures += 1
		print("  FAIL  " .. label)
	end
end

print("\n-- tier weighting --")
local counts = { 0, 0, 0, 0 }
local N = 100000
for i = 1, N do
	counts[GC.tierByWeight((i - 0.5) / N)] += 1
end
local dropped = N
for i, t in ipairs(GC.Tiers) do
	dropped -= counts[i]
	print(string.format("  %-10s shape=%-9s want %2d%%  got %5.2f%%  pays %d", t.name, t.shape, t.weight, counts[i] / N * 100, t.value))
end
check(dropped == 0, "the weighted picker never falls through")

print("\n-- accessibility --")
-- 04-PRESENTATION.md makes this a hard constraint, not a preference: "rarity tiers
-- must differ by shape or silhouette, not only hue". Tier is a core economic signal,
-- so a player who cannot read it cannot see the game working.
local shapes = {}
local dupe = false
for _, t in ipairs(GC.Tiers) do
	if shapes[t.shape] then dupe = true end
	shapes[t.shape] = true
end
check(not dupe, "every tier has a distinct shape, so tier survives colour being thrown away")

print("\n-- upgrade ladders --")
local ladderTotal = 0
for _, u in ipairs(GC.Upgrades) do
	local costs, prev, rising = {}, -1, true
	for lvl = 0, u.maxLevel - 1 do
		local c = GC.upgradeCost(u, lvl)
		if c <= prev then rising = false end
		prev = c
		ladderTotal += c
		table.insert(costs, c)
	end
	print(string.format("  %-7s %s", u.id, table.concat(costs, " ")))
	check(rising, u.id .. " costs strictly increase")
end

print("\n-- is the economy reachable? --")
-- A greedy player: always buy the cheapest affordable upgrade. Income is the area's
-- expected payout, and value upgrades raise it, so clearing and spending interleave.
local weightSum = 0
for _, t in ipairs(GC.Tiers) do weightSum += t.weight end
local perPatchBase = 0
for _, t in ipairs(GC.Tiers) do perPatchBase += (t.weight / weightSum) * t.value end

local levels = { value = 0, radius = 0, speed = 0 }
local purse, bought, earned = 0, 0, 0
local valueUp = GC.Upgrades[1]
for _ = 1, GC.Area.patchCount do
	local pay = perPatchBase * (1 + valueUp.perLevel * levels.value)
	purse += pay
	earned += pay
	while true do
		local best, bestCost = nil, math.huge
		for _, u in ipairs(GC.Upgrades) do
			if levels[u.id] < u.maxLevel then
				local c = GC.upgradeCost(u, levels[u.id])
				if c <= purse and c < bestCost then best, bestCost = u, c end
			end
		end
		if not best then break end
		purse -= bestCost
		levels[best.id] += 1
		bought += 1
	end
end
print(string.format("  one full area clear buys %d of %d upgrade levels", bought, 24))
print(string.format("  ending levels: value %d  radius %d  speed %d", levels.value, levels.radius, levels.speed))
print(string.format("  leftover: %d shards", math.floor(purse)))
print(string.format("  one area earns %d shards; the whole ladder costs %d (%.0f%%)", math.floor(earned), ladderTotal, 100 * earned / ladderTotal))
-- The slice ships one area of an intended four-plus, so maxing out is not meant to be
-- reachable here. What must be true is that a single area produces *visible*
-- progression, or the loop's fourth step is decoration.
check(bought >= 5, "one area yields at least 5 upgrade levels, so progress is visible")
check(levels.value >= 2, "the value axis moves, so later patches pay more than early ones")

print("\n-- collection --")
local total = 0
for _, s in ipairs(GC.RelicSets) do total += #s.relics end
check(total == 24, "24 relics across 4 sets, per 02-GAMEPLAY.md")
check(GC.RelicsPerArea == 6, "one set's worth buried per area")
check(GC.GuaranteedFirstRelic, "the first find is guaranteed, not rolled (onboarding promise)")

print(string.format("\n%s (%d failure(s))\n", failures == 0 and "PASS" or "FAIL", failures))
if failures > 0 then error("config checks failed", 0) end
