--!strict
--[[
	Layout — composes one area from authored chunks and places its patches, tiers and Finds.

	`build(areaOrdinal)` returns exactly `areaSpec(areaOrdinal).patchCount` records in a fixed
	canonical order: plot-local positions, tier indices and buried Finds, all resolved from
	`GameConfig.LayoutSeed` and the area ordinal and NOTHING ELSE. It reads no player, no
	state, no clock and no slot, so every lane in every server on every day gets the same
	area for the same ordinal. That is what lets `state.cleared` be keyed by the array index
	and survive a rejoin.

	THE ARRAY INDEX IS A PATCH'S DURABLE IDENTITY. Changing the composition order, the grid,
	the seed or the sequence of draws below is a save migration, not a refactor.

	An area is an ordered run of `areaSpec.chunkCount` chunk VARIANTS, drawn without
	replacement from that depth's family of `Layout.variantsPerFamily` (16 = 8 authored
	chunks x 2 orientations) and laid nose to tail inward along +Z. The four families are
	disjoint: a chunk that appeared in both a Terrace and a Vault would make them the same
	place.

	FIND PLACEMENT IS SEED-DERIVED AND READS NO PLAYER STATE — not `state.found`, not
	`state.cleared`, not `patch.tierIndex`. An earlier design drew from "the set minus
	ever-found"; because the layout is rebuilt on every join, a mid-area rejoin re-placed the
	outstanding Finds onto already-cleared patches and the set became uncompletable. Placing
	from the seed alone makes that impossible by construction rather than by a guard.

	Data only. No Instance is created here; `plots` turns these records into Parts and adds
	the slot origin to turn plot-local positions into world positions.
]]

local Shared = game:GetService("ReplicatedStorage"):WaitForChild("UIForge")
local GameConfig = require(Shared.GameConfig)
local Types = require(Shared.Types)

-- The generated shape, not a copy of it. Re-exported so a module holding a `Layout.Patch`
-- keeps compiling; there is still exactly one declaration, in Types.luau.
export type Patch = Types.Patch

--[[
	One row of `depths.areas`, or `endgame.postTerminalArea` presented in the same shape,
	with the Find slice already resolved. `relicSlice` is empty for a post-terminal area.
]]
export type AreaSpec = {
	ordinal: number,
	depth: number,
	setId: string,
	label: string,
	relicSlice: { string },
	footprintStuds2: number,
	chunkCount: number,
	patchCount: number,
	minSpacing: number,
	unlock: string,
}

type Anchor = { x: number, z: number }
type ChunkRef = { id: string, mirrored: boolean }

-- One row of layout.families and one of collection.sets, named here only so the two lookups
-- below have something to return. The values are GameConfig's; these are its shapes.
type ChunkFamily = { depth: number, setId: string, idPrefix: string, patchesPerChunk: number }
type FindSet = { id: string, label: string, depth: number, relics: { string } }

local Layout = {}

-- ==========================================================================
-- Seeding
--
-- Every stream in this module is `Random.new(seedFor(...))`. There is no other source of
-- randomness: no math.random, no unseeded Random.new, no os.time and no os.clock. The
-- streams are disjoint by their label, so adding a draw to one never shifts another —
-- tiers in particular are rolled on their own stream AFTER placement, because
-- rarity.findPlacementReadsTier and layout.findPlacement.mayReadPatchTier are both false.
-- ==========================================================================

-- 32-bit multiply without leaving the range a double represents exactly. a * b as written
-- reaches 2^56 for a 32-bit pair, which is past 2^53 and silently rounds.
local function mul32(a: number, b: number): number
	local high = math.floor(a / 65536)
	local low = a % 65536
	return ((high * b) % 65536 * 65536 + low * b) % 4294967296
end

-- FNV-1a. Any stable string hash would do; what matters is that it is stable, so it is
-- written out here rather than taken from a library that might change under us.
local function hashString(text: string): number
	local hash = 2166136261
	for index = 1, #text do
		hash = mul32(bit32.bxor(hash, string.byte(text, index) :: number), 16777619)
	end
	return hash
end

-- The one seed derivation. `label` names the stream and the parts identify the subject.
local function seedFor(label: string, subject: string | number): number
	local text = tostring(GameConfig.LayoutSeed) .. "|" .. label .. "|" .. tostring(subject)
	return hashString(text) % 2147483647
end

local warned: { [string]: boolean } = {}
local function warnOnce(key: string, message: string)
	if not warned[key] then
		warned[key] = true
		warn("[Layout] " .. message)
	end
end

-- ==========================================================================
-- Config readers
-- ==========================================================================

local function familyForDepth(depth: number): ChunkFamily
	for _, family in ipairs(GameConfig.Layout.families :: { ChunkFamily }) do
		if family.depth == depth then
			return family
		end
	end
	error(`Layout: no chunk family for depth {depth}`)
end

local function relicSetForDepth(depth: number): FindSet
	for _, set in ipairs(GameConfig.RelicSets :: { FindSet }) do
		if set.depth == depth then
			return set
		end
	end
	error(`Layout: no Find set for depth {depth}`)
end

-- The plot-local Z at which this area's bay begins. Bays 1 to 8 are stated; a post-terminal
-- area is one more `endgame.postTerminalArea.bayLengthStuds` past the last of them, which is
-- the arithmetic form of "above ordinal 8 each post-terminal area adds another 480".
local function bayZStart(areaOrdinal: number): number
	local bays = GameConfig.Plots.bays
	local bay = bays[areaOrdinal]
	if bay then
		return bay.zStart
	end
	local last = bays[#bays]
	local bayLength = GameConfig.Endgame.postTerminalArea.bayLengthStuds
	return last.zEnd + (areaOrdinal - #bays - 1) * bayLength
end

-- The plot-local XZ of the spawn Attachment for this area's bay: plots.spawn.plotLocal
-- measured from the bay's start, which is that key generalised past bay 1.
local function spawnXZ(areaOrdinal: number): (number, number)
	local plotLocal = GameConfig.Plots.spawn.plotLocal
	return plotLocal[1], bayZStart(areaOrdinal) + plotLocal[3]
end

-- Run `index` of `total` items cut into `parts` as-equal-as-possible contiguous runs,
-- returned as an inclusive 1-based range. The floor form spreads the remainder over the
-- earliest runs instead of dumping it in the last one.
local function evenRun(total: number, parts: number, index: number): (number, number)
	local first = math.floor((total * (index - 1)) / parts) + 1
	local last = math.floor((total * index) / parts)
	return first, last
end

-- ==========================================================================
-- The Find slice
--
-- depths.relicSliceAssignment: each depth's set is cut into collection.areasPerDepth
-- contiguous slices of collection.relicsPerArea names IN NAME ORDER, and the slices are
-- handed to that depth's areas in an order seeded by (layoutSeed, depth). That order is
-- discovery.theOnlyRandomQuantities[2]; the partition itself is fixed, which is why the
-- slices of one depth's areas cover its set with no overlap and no gap.
-- ==========================================================================

local function seededPermutation(count: number, seed: number): { number }
	local order: { number } = {}
	for index = 1, count do
		order[index] = index
	end
	local rng = Random.new(seed)
	for index = 1, count - 1 do
		local swap = rng:NextInteger(index, count)
		order[index], order[swap] = order[swap], order[index]
	end
	return order
end

local function resolveRelicSlice(areaOrdinal: number, depth: number): { string }
	local areas = GameConfig.Depths.areas :: { { ordinal: number, depth: number } }
	local perDepth = GameConfig.AreasPerDepth
	local perArea = GameConfig.RelicsPerArea

	-- This area's position among the areas at its depth, in ordinal order.
	local position = 0
	local atDepth = 0
	for _, row in ipairs(areas) do
		if row.depth == depth then
			atDepth += 1
			if row.ordinal == areaOrdinal then
				position = atDepth
			end
		end
	end
	if position == 0 then
		return {}
	end

	local names = relicSetForDepth(depth).relics
	local sliceCount = math.min(perDepth, math.floor(#names / perArea))
	if sliceCount <= 0 then
		warnOnce("slice-" .. depth, `depth {depth}'s set holds {#names} names, fewer than one slice of {perArea}`)
		return {}
	end
	if position > sliceCount then
		warnOnce("slice-count-" .. depth, `depth {depth} has {atDepth} areas but only {sliceCount} slices; area {areaOrdinal} gets none`)
		return {}
	end

	local order = seededPermutation(sliceCount, seedFor("slice", depth))
	local sliceIndex = order[position]

	local slice: { string } = {}
	for offset = 1, perArea do
		slice[offset] = names[(sliceIndex - 1) * perArea + offset]
	end
	return slice
end

-- ==========================================================================
-- areaSpec
-- ==========================================================================

--[[
	The area's row, with its Find slice resolved.

	For ordinal 1..8 this is depths.areas[ordinal] verbatim. Above that it is
	endgame.postTerminalArea: depth 4, setId "spire", label "Spire" carrying no ordinal and
	no number, an EMPTY slice — postTerminalArea.buriesFinds is 0 — and the same footprint,
	chunkCount and patchCount as area 8.

	The one `if ordinal > 8` branch in the game. plots, clearing and hud-binding call this
	rather than writing it again.
]]
function Layout.areaSpec(areaOrdinal: number): AreaSpec
	if areaOrdinal < 1 or areaOrdinal % 1 ~= 0 then
		error(`Layout.areaSpec: areaOrdinal must be a positive integer, got {areaOrdinal}`)
	end

	local row = GameConfig.Depths.areas[areaOrdinal]
	if row then
		return {
			ordinal = row.ordinal,
			depth = row.depth,
			setId = row.setId,
			label = row.label,
			relicSlice = resolveRelicSlice(areaOrdinal, row.depth),
			footprintStuds2 = row.footprintStuds2,
			chunkCount = row.chunkCount,
			patchCount = row.patchCount,
			minSpacing = row.minSpacing,
			unlock = row.unlock,
		}
	end

	local post = GameConfig.Endgame.postTerminalArea
	return {
		ordinal = areaOrdinal,
		depth = post.depth,
		setId = post.setId,
		label = post.label,
		relicSlice = {},
		footprintStuds2 = post.footprintStuds2,
		chunkCount = post.chunkCount,
		patchCount = post.patchCount,
		minSpacing = post.minSpacing,
		unlock = post.unlock,
	}
end

-- ==========================================================================
-- The chunk run
-- ==========================================================================

--[[
	`chunkCount` variants drawn WITHOUT REPLACEMENT from this depth's family, seeded by
	(layoutSeed, areaOrdinal) and by nothing else.

	R1 — no variant twice in one area — holds by construction: the draw is a partial
	Fisher-Yates over the family's variant list. R4 — never a chunk from another depth's
	family — holds because `familyForDepth` is the only source of an id and
	layout.familiesShareNoChunk is true.

	A variant is one of `chunksPerFamily` authored chunks in one of `orientations`. Variant v
	is authored chunk ((v - 1) % chunksPerFamily) + 1, mirrored across the lane centre once v
	passes the first block. The pairing matters because a mirrored chunk is the SAME authored
	anchor field with X negated, not an independent one.
]]
local function chunkRun(spec: AreaSpec): { ChunkRef }
	local family = familyForDepth(spec.depth)
	local perFamily = GameConfig.Layout.chunksPerFamily
	local variants = GameConfig.Layout.variantsPerFamily
	local orientations = #GameConfig.Layout.orientations

	local rng = Random.new(seedFor("chunks", spec.ordinal))
	local run: { ChunkRef } = {}

	local pool: { number } = {}
	local drawn = 0
	while #run < spec.chunkCount do
		if drawn >= variants then
			-- More chunks than the family holds variants. Without replacement is impossible,
			-- so a variant repeats only after every one of them has been used once.
			warnOnce(
				"pool-" .. spec.depth,
				`area {spec.ordinal} wants {spec.chunkCount} chunks but depth {spec.depth} has {variants} variants; R1 cannot hold`
			)
			pool = {}
			drawn = 0
		end
		if #pool == 0 then
			for index = 1, variants do
				pool[index] = index
			end
		end
		drawn += 1
		local pick = rng:NextInteger(drawn, variants)
		pool[drawn], pool[pick] = pool[pick], pool[drawn]
		local variant = pool[drawn]

		local base = ((variant - 1) % perFamily) + 1
		local orientation = math.floor((variant - 1) / perFamily) % orientations
		run[#run + 1] = { id = family.idPrefix .. tostring(base), mirrored = orientation == 1 }
	end

	return run
end

-- ==========================================================================
-- A chunk's anchors
--
-- layout.anchorSource: "authored per chunk; until authoring exists, generated once from
-- hash(layoutSeed, chunkId) and frozen, which is the same data by a cheaper route". Frozen
-- is the load-bearing word: the field belongs to the CHUNK, so the same authored chunk lays
-- down the same anchors wherever it appears, in whichever area, at whichever ordinal.
--
-- The field is a jittered grid rather than free sampling: each point may move at most half
-- the slack between its cell and minSpacing, so the spacing floor holds by construction
-- instead of by a rejection loop that might not terminate.
-- ==========================================================================

local anchorCache: { [string]: { Anchor } } = {}

local function anchorsForChunk(chunkId: string, count: number, minSpacing: number): { Anchor }
	local key = `{chunkId}|{count}|{minSpacing}`
	local cached = anchorCache[key]
	if cached then
		return cached
	end

	local chunk = GameConfig.Layout.chunk
	local halfLane = GameConfig.Plots.laneWidthStuds / 2
	-- No anchor within traversal.boundary.walkableMarginStuds of a lane edge, and none
	-- within the chunk's own edgeKeepoutStuds of any edge. Across the lane the margin is the
	-- larger of the two, so X lands in the central 96 studs of the 120-stud chunk.
	local sideInset = math.max(GameConfig.Traversal.boundary.walkableMarginStuds, chunk.edgeKeepoutStuds)
	local xMin = -halfLane + sideInset
	local usableWidth = (halfLane - sideInset) * 2
	local zMin = chunk.edgeKeepoutStuds
	local usableDepth = chunk.depthStuds - chunk.edgeKeepoutStuds * 2

	local anchors: { Anchor } = {}
	if count <= 0 or usableWidth <= 0 or usableDepth <= 0 then
		anchorCache[key] = anchors
		return anchors
	end

	local maxRows = math.max(1, math.floor(usableDepth / minSpacing))
	local maxColumns = math.max(1, math.floor(usableWidth / minSpacing))
	-- Square-ish cells: the row count that makes cell width and cell depth closest to equal.
	local rows = math.clamp(math.floor(math.sqrt(count * usableDepth / usableWidth) + 0.5), 1, maxRows)
	if rows * maxColumns < count then
		rows = math.min(maxRows, math.ceil(count / maxColumns))
	end
	if rows * maxColumns < count then
		warnOnce(
			"density-" .. chunkId,
			`{count} anchors do not fit a {usableWidth} x {usableDepth} chunk at spacing {minSpacing}; spacing will be short`
		)
	end

	local rng = Random.new(seedFor("anchors", chunkId))
	local rowDepth = usableDepth / rows
	-- Two rows can close on each other by at most 2 * jitterZ, so this is the largest wobble
	-- that still leaves minSpacing between them. Same argument along the row for jitterX.
	local jitterZ = math.max((rowDepth - minSpacing) / 2, 0)

	for row = 1, rows do
		local before = math.floor((count * (row - 1)) / rows)
		local inRow = math.floor((count * row) / rows) - before
		if inRow > 0 then
			local columnWidth = usableWidth / inRow
			local jitterX = math.max((columnWidth - minSpacing) / 2, 0)
			local centreZ = zMin + rowDepth * (row - 0.5)
			for column = 1, inRow do
				local centreX = xMin + columnWidth * (column - 0.5)
				anchors[#anchors + 1] = {
					x = centreX + rng:NextNumber(-jitterX, jitterX),
					z = centreZ + rng:NextNumber(-jitterZ, jitterZ),
				}
			end
		end
	end

	anchorCache[key] = anchors
	return anchors
end

-- ==========================================================================
-- Find groups
-- ==========================================================================

-- Patch indices ordered ascending by XZ distance from the bay's spawn point. Ties go to the
-- lower index, so the ordering is total and stable. firstSession.placement.ordering.
local function spawnDistanceOrder(patches: { Patch }, spawnX: number, spawnZ: number): { number }
	local order: { number } = {}
	local squared: { number } = {}
	for index, patch in ipairs(patches) do
		order[index] = index
		local dx = patch.position.X - spawnX
		local dz = patch.position.Z - spawnZ
		squared[index] = dx * dx + dz * dz
	end
	table.sort(order, function(a: number, b: number): boolean
		if squared[a] == squared[b] then
			return a < b
		end
		return squared[a] < squared[b]
	end)
	return order
end

--[[
	The area's patch run split into `groupCount` contiguous groups, one Find per group, so
	the Finds spread across the walk instead of clustering.

	layout.findPlacement.groupCutBy has two cases. Area 1 is cut by PATCH ORDINAL IN
	SPAWN-DISTANCE ORDER at firstSession.placement.secondFindOrdinalMin and Max, which is
	what puts the second Find between ordinals 8 and 40 — the onboarding beat. Every other
	area is cut BY CHUNK into as-equal-as-possible contiguous runs.
]]
local function findGroups(
	areaOrdinal: number,
	patches: { Patch },
	chunkOfPatch: { number },
	chunkCount: number,
	groupCount: number,
	distanceOrder: { number }
): { { number } }
	local groups: { { number } } = {}
	if groupCount <= 0 or #patches == 0 then
		return groups
	end

	if areaOrdinal == 1 then
		local placement = GameConfig.FirstSession.placement
		local total = #distanceOrder
		local ends: { number } = {}
		ends[1] = math.clamp(placement.secondFindOrdinalMin - 1, 1, total)
		if groupCount >= 2 then
			ends[2] = math.clamp(placement.secondFindOrdinalMax, ends[1] + 1, total)
		end
		-- Anything past the second cut is split evenly among whatever groups remain. With
		-- collection.relicsPerArea at 3 that is exactly one group, the whole tail.
		for group = 3, groupCount do
			local remaining = total - ends[2]
			ends[group] = ends[2] + math.floor((remaining * (group - 2)) / (groupCount - 2))
		end
		if groupCount >= 2 then
			ends[groupCount] = total
		end

		local previous = 0
		for group = 1, groupCount do
			local members: { number } = {}
			for ordinal = previous + 1, ends[group] do
				members[#members + 1] = distanceOrder[ordinal]
			end
			groups[group] = members
			previous = ends[group]
		end
		return groups
	end

	for group = 1, groupCount do
		local firstChunk, lastChunk = evenRun(chunkCount, groupCount, group)
		local members: { number } = {}
		for index = 1, #patches do
			local chunkIndex = chunkOfPatch[index]
			if chunkIndex >= firstChunk and chunkIndex <= lastChunk then
				members[#members + 1] = index
			end
		end
		groups[group] = members
	end
	return groups
end

-- ==========================================================================
-- build
-- ==========================================================================

--[[
	Every patch of the area, in canonical order: chunk by chunk from the outward edge
	inward, and within a chunk row by row across the lane.

	Positions are PLOT-LOCAL, in studs. X is inside the lane's walkable band and Z is inside
	this area's bay span, measured from bay 1's outward edge; `plots` adds the slot origin
	and writes world positions. Y is 0 — `plots` owns the vertical offset, because a patch's
	Y is tier.height / 2 above the slab's top face and that is a property of the Part.

	Composition, in the order the interface states it:
	  1. draw the chunk run, seeded by (layoutSeed, areaOrdinal)
	  2. lay the chunks nose to tail inward along +Z
	  3. take each chunk's frozen anchors, mirrored if the variant is
	  4. roll every tier on a DISJOINT stream, after placement
	  5. cut the run into contiguous groups and bury one Find in each

	Returns a fresh table on every call: `plots` writes `cleared` and `instance` into these
	records, so handing out a shared one would leak one player's progress into another's.
]]
function Layout.build(areaOrdinal: number): { Patch }
	local spec = Layout.areaSpec(areaOrdinal)
	local family = familyForDepth(spec.depth)
	local chunkDepth = GameConfig.Layout.chunk.depthStuds
	local zStart = bayZStart(areaOrdinal)
	local run = chunkRun(spec)

	local patches: { Patch } = {}
	local chunkOfPatch: { number } = {}

	for chunkIndex, reference in ipairs(run) do
		local anchors = anchorsForChunk(reference.id, family.patchesPerChunk, spec.minSpacing)
		local baseZ = zStart + (chunkIndex - 1) * chunkDepth
		for _, anchor in ipairs(anchors) do
			local x = if reference.mirrored then -anchor.x else anchor.x
			local index = #patches + 1
			patches[index] = {
				position = Vector3.new(x, 0, baseZ + anchor.z),
				tierIndex = 1,
				find = nil,
				cleared = false,
				instance = nil,
			}
			chunkOfPatch[index] = chunkIndex
		end
	end

	-- depths' own invariant is chunkCount * patchesPerChunk == patchCount. If a re-emitted
	-- config breaks it, say so once: clearing compares clearedCount against patchCount to
	-- decide an area is finished, so a short field is an area that never completes.
	if #patches ~= spec.patchCount then
		warnOnce(
			"count-" .. areaOrdinal,
			`area {areaOrdinal} composes {#patches} patches but depths says {spec.patchCount}`
		)
		for index = #patches, spec.patchCount + 1, -1 do
			patches[index] = nil
			chunkOfPatch[index] = nil
		end
	end

	-- firstSession.placement.spawnToNearestPatchMaxStuds. Area 1's spawn beat needs a patch
	-- inside the clear radius the moment the player takes their first step, and a jittered
	-- grid does not promise one. The nearest anchor is drawn in toward the spawn point along
	-- its own bearing until it is exactly that far away, and never pushed outward.
	if areaOrdinal == 1 and #patches > 0 then
		local maxStuds = GameConfig.FirstSession.placement.spawnToNearestPatchMaxStuds
		local spawnX, spawnZ = spawnXZ(areaOrdinal)
		local nearest, nearestSquared = 1, math.huge
		for index, patch in ipairs(patches) do
			local dx = patch.position.X - spawnX
			local dz = patch.position.Z - spawnZ
			local squared = dx * dx + dz * dz
			if squared < nearestSquared then
				nearest, nearestSquared = index, squared
			end
		end
		if nearestSquared > maxStuds * maxStuds and nearestSquared > 0 then
			local scale = maxStuds / math.sqrt(nearestSquared)
			local position = patches[nearest].position
			patches[nearest].position = Vector3.new(
				spawnX + (position.X - spawnX) * scale,
				0,
				spawnZ + (position.Z - spawnZ) * scale
			)
		end
	end

	-- Tiers, on their own stream and AFTER placement. rarity.findPlacementReadsTier and
	-- layout.findPlacement.mayReadPatchTier are both false, and a separate stream is the
	-- cheapest way to be able to prove it.
	local tierRng = Random.new(seedFor("tiers", areaOrdinal))
	for _, patch in ipairs(patches) do
		local tierIndex = GameConfig.tierByWeight(tierRng:NextNumber())
		patch.tierIndex = tierIndex
	end

	local distanceOrder: { number } = {}
	if areaOrdinal == 1 then
		local spawnX, spawnZ = spawnXZ(areaOrdinal)
		distanceOrder = spawnDistanceOrder(patches, spawnX, spawnZ)

		-- beat:tierContrast — the first `tierContrastWithinFirstOrdinals` patches by
		-- spawn distance must hold at least two distinct tiers. The weights make one tier
		-- across all twenty a two-in-a-million draw, and a beat that holds for all but two
		-- players in a million is not a beat; the last of those ordinals steps to the next
		-- tier when it happens.
		local window = math.min(GameConfig.FirstSession.placement.tierContrastWithinFirstOrdinals, #distanceOrder)
		if window >= 2 then
			local first = patches[distanceOrder[1]].tierIndex
			local contrast = false
			for ordinal = 2, window do
				if patches[distanceOrder[ordinal]].tierIndex ~= first then
					contrast = true
					break
				end
			end
			if not contrast then
				local patch = patches[distanceOrder[window]]
				patch.tierIndex = (patch.tierIndex % #GameConfig.Tiers) + 1
			end
		end
	end

	-- Finds. One per contiguous group, group g carrying the g-th name of this area's slice.
	-- A post-terminal area has an empty slice and therefore buries nothing.
	local slice = spec.relicSlice
	if #slice > 0 then
		local groups = findGroups(areaOrdinal, patches, chunkOfPatch, #run, #slice, distanceOrder)
		local findRng = Random.new(seedFor("finds", areaOrdinal))
		for group = 1, #slice do
			local members = groups[group]
			if members and #members > 0 then
				-- The draw is taken for every group whether or not it is used, so the stream
				-- reads the same with and without the onboarding override.
				local pick = members[findRng:NextInteger(1, #members)]
				if areaOrdinal == 1 and group == 1 and GameConfig.GuaranteedFirstRelic then
					-- layout.findPlacement.onboardingOverride, which onboarding.guaranteedFirstRelic
					-- switches on: group 1's Find sits on the patch nearest the spawn point, which
					-- is ordinal 1 by construction. appliesExactlyOnce — area 1, group 1, never again.
					pick = distanceOrder[1]
				end
				patches[pick].find = slice[group]
			end
		end
	end

	return patches
end

return Layout
