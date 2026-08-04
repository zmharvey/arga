--!strict
--[[
	Layout — the area's patch field.

	`build()` returns exactly `GameConfig.Area.patchCount` records in a fixed canonical
	order: positions, tier indices and buried Finds, all resolved from one fixed seed and
	nothing else. It takes no seed and no slot argument, so every plot in every server on
	every day gets the same field, which is what lets `state.cleared` be keyed by the
	array index and survive a rejoin.

	The array index IS a patch's durable identity. Changing the order, the grid, the seed
	or the sequence of random draws below is a save migration, not a refactor.

	Data only. No Instance is created here; `plots` turns these records into Parts.
]]

local Shared = game:GetService("ReplicatedStorage"):WaitForChild("UIForge")
local GameConfig = require(Shared.GameConfig)

-- NOT IN THE CONTRACT — reported as a stop in Layout.report.md.
--
-- The brief specifies this module as deterministic "from a fixed seed" but no seed value
-- appears under its Values, and no sheet owns one. 1 is a placeholder, not a design
-- decision. It is deliberately the least interesting number available so that nobody
-- mistakes it for a tuned one. Changing it reshuffles every position, every tier and
-- every Find, and therefore invalidates every saved `cleared` set.
local LAYOUT_SEED = 1

-- The shape 03-state-shape.md names `Patch`. Declared here because `layout` is the module
-- that constructs one and no shared types module exists in the build order; `plots`,
-- `clearing` and `persistence` can import it from here rather than restate it.
export type Patch = {
	position: Vector3,
	tierIndex: number,
	relic: string?,
	cleared: boolean,
	instance: BasePart?,
}

local Layout = {}

-- The 1-based index of the record closest to the plot origin, measured on XZ because Y
-- carries no information here and `clearing` measures on XZ too. Ties go to the lower
-- index, so the answer is stable even if two patches were ever equidistant.
local function indexNearestOrigin(patches: { Patch }): number
	local bestIndex = 1
	local bestSquared = math.huge
	for index, patch in ipairs(patches) do
		local position = patch.position
		local squared = position.X * position.X + position.Z * position.Z
		if squared < bestSquared then
			bestIndex = index
			bestSquared = squared
		end
	end
	return bestIndex
end

--[[
	Every patch in the area, in canonical order.

	Positions are PLOT-LOCAL: (0, 0, 0) is the plot origin and the field is centred on it,
	so X and Z span +/- (area.size / 2 - area.minSpacing / 2). Y is 0 — `plots` owns the
	vertical offset, because the representation sheet puts a patch's Y at tier.height / 2
	above the slab's top face and that is a property of the Part, not of the layout.

	The field is a jittered grid rather than free sampling: rows are spaced
	area.size / rows apart and each point may move at most half the slack between its
	cell and area.minSpacing, so the spacing floor holds by construction instead of by a
	rejection loop that might not terminate.
]]
function Layout.build(): { Patch }
	local area = GameConfig.Area
	local patchCount: number = area.patchCount
	local size: number = area.size
	local minSpacing: number = area.minSpacing

	local patches: { Patch } = {}
	if patchCount <= 0 then
		return patches
	end

	-- One generator per call, freshly seeded, so two calls in two sessions are identical
	-- and nothing here depends on when it ran or how many plots came before it.
	local rng = Random.new(LAYOUT_SEED)

	local half = size / 2
	local columns = math.ceil(math.sqrt(patchCount))
	local rows = math.ceil(patchCount / columns)
	local rowDepth = size / rows
	-- Neighbouring rows can close on each other by at most 2 * jitterZ, so this is the
	-- largest wobble that still leaves minSpacing between them.
	local jitterZ = math.max((rowDepth - minSpacing) / 2, 0)

	for row = 1, rows do
		-- Spread the remainder over the rows instead of leaving a bald strip in the last
		-- one: row r holds floor(count * r / rows) - floor(count * (r - 1) / rows).
		local filledBefore = math.floor((patchCount * (row - 1)) / rows)
		local inRow = math.floor((patchCount * row) / rows) - filledBefore
		if inRow <= 0 then
			continue
		end

		local columnWidth = size / inRow
		local jitterX = math.max((columnWidth - minSpacing) / 2, 0)
		local centreZ = -half + rowDepth * (row - 0.5)

		for column = 1, inRow do
			local centreX = -half + columnWidth * (column - 0.5)
			local x = centreX + rng:NextNumber(-jitterX, jitterX)
			local z = centreZ + rng:NextNumber(-jitterZ, jitterZ)
			-- The index, not the tier table: a live record holding a table would keep a
			-- stale name after the config is re-emitted.
			local tierIndex = GameConfig.tierByWeight(rng:NextNumber())

			local patch: Patch = {
				position = Vector3.new(x, 0, z),
				tierIndex = tierIndex,
				relic = nil,
				cleared = false,
				instance = nil,
			}
			table.insert(patches, patch)
		end
	end

	-- The area is depth 1, so its Finds are the first set's. `relicsPerArea` and the set
	-- length agree today; the min keeps a re-emitted config that disagrees from indexing
	-- past the end of the names.
	local relicSet = GameConfig.RelicSets[1]
	local relicNames: { string } = relicSet.relics
	local relicTarget = math.min(GameConfig.RelicsPerArea, #relicNames, #patches)

	local taken: { [number]: boolean } = {}
	local placed = 0

	-- onboarding.guaranteedFirstRelic: the first Find of set one is placed, not rolled,
	-- on the patch nearest the plot origin — the one the player spawns on top of.
	if GameConfig.GuaranteedFirstRelic and relicTarget > 0 then
		local firstIndex = indexNearestOrigin(patches)
		taken[firstIndex] = true
		placed = 1
		patches[firstIndex].relic = relicNames[1]
	end

	-- The rest are drawn uniformly, rejecting a patch that already holds one, so exactly
	-- relicTarget patches end up carrying a Find and no name is placed twice.
	while placed < relicTarget do
		local candidate = rng:NextInteger(1, #patches)
		if not taken[candidate] then
			taken[candidate] = true
			placed += 1
			patches[candidate].relic = relicNames[placed]
		end
	end

	return patches
end

return Layout
