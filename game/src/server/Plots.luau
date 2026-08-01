--!strict
--[[
	Plots — one player's lane, and the slot it occupies.

	A lane is a ROW OF BAYS, not one square area. It runs inward along `plots.laneAxis` (+Z);
	the row of lanes runs along `plots.rowAxis` (+X) at a pitch of `plots.pitchStuds`. Bay k
	holds area k, and its length is `depths.areas[k].footprintStuds2 / plots.laneWidthStuds`,
	which is what `GameConfig.Plots.bays[k]` already carries as zStart/zEnd.

	Four things, all owned here and all parented to the slab so a teardown is one Destroy:

	  * the SLAB, sized to the FULL SLOT PITCH across (122, not the 120 of walkable lane), so
	    consecutive slabs share an edge and there is no air between two lanes at any index. It
	    spans from `traversal.boundary.walkableMarginStuds` outward of bay 1 to the same margin
	    inward of the LIVE bay's end. IT ONLY EVER GROWS: `advance` extends it, so a player
	    standing in bay 2 while bay 5 is built never loses their floor.
	  * FOUR BOUNDARY parts, invisible and collidable, closing the lane on all four sides. The
	    inward one moves outward-to-inward as bays are built; the two long ones are resized
	    with the slab. There is NO part between two bays: the lane is continuous in Z and only
	    its two ends are closed, which is `plots.openings.gateMechanism`.
	  * a spawn ATTACHMENT at the LIVE bay, `plots.spawn.plotLocal` (0, 0, 8) measured from
	    that bay's start, CARRYING A ROTATION: `plots.spawn.lookVector` faces slot 1 along +X
	    and every other slot along -X, so a spawning player looks straight down the row at
	    their nearest occupied neighbour rather than down their own lane.
	  * one PATCH Instance per index of the LIVE BAY that `state.cleared` does not mark, AND
	    NOT ONE ANYWHERE ELSE. `plots.liveGeometry.patchInstancesExistIn` is "the live bay
	    only": a finished bay is bare walkable floor with no patch Instance and NO PATCH
	    RECORD, so there is nothing for `clearing` to walk and pay for a second time. That is
	    what makes "cleared is permanent" structural rather than latched — no module holds a
	    flag that a fourth one could forget to read.

	A patch's Size and Orientation are PER SHAPE, never one formula for four tiers. A Roblox
	Cylinder's axis runs along its local X and a Ball takes the smallest of its three
	components, so a single Vector3.new(footprint, height, footprint) lays the Fern on its side
	and shrinks the Bramble. Shape is the primary rarity channel — the one that has to survive
	colour being thrown away — so getting this wrong is not cosmetic.

	Every tuned number is read from GameConfig. The three lane-geometry constants below are the
	documented exception; see the comment on them.
]]

local Workspace = game:GetService("Workspace")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local Shared = ReplicatedStorage:WaitForChild("UIForge")
local GameConfig = require(Shared.GameConfig)
local Layout = require(Shared.Layout)
local Types = require(Shared.Types)

-- The generated shapes, not copies of them. `Types.luau` exists because five modules once
-- declared their own PlayerState and two of them disagreed.
type Patch = Types.Patch
type PlayerState = Types.PlayerState

-- One entry of GameConfig.Tiers, named so the fields this module reads have a shape.
type TierDef = {
	name: string,
	shape: string,
	rgb: { number },
	value: number,
	weight: number,
	height: number,
}

--[[
	LANE-GEOMETRY CONSTANTS — deliberately not in GameConfig.

	Each is fixed as a literal in `representation` under `plot` and `plot-boundary`, is read by
	this module and by nothing else, and is not a tuned game value. GameConfig carries values
	more than one module reads and which must load outside the engine, so a builder writes
	these as named locals here and cites the sheet. Every OTHER number in this file comes from
	GameConfig.

	Reported as a finding: because they are not in GameConfig, re-emitting the config cannot
	change them.
]]
local SLAB_THICKNESS_STUDS = 1 -- representation.plot: the Y of Vector3.new(pitchStuds, 1, ...)
local BOUNDARY_END_THICKNESS_STUDS = 2 -- representation.plot-boundary: the Z of the two end parts
local BOUNDARY_CORNER_OVERLAP_STUDS = 2 -- the "+ 2" that makes the four overlap at the corners

-- plots.slotOrigin's middle component: the slot origin's Y, and therefore the top face of the
-- slab and the plane everything in the lane is measured from.
local WALKABLE_PLANE_Y = 0

-- What `despawn` and `advance` need in order to find a lane again. Keyed by UserId because
-- PlayerState carries no slot field and, per interfaces.plots.despawn, must not gain one.
type PlotRecord = {
	slot: number,
	originX: number,
	originZ: number,
	liveOrdinal: number,
	slab: BasePart,
	sidePosX: BasePart,
	sideNegX: BasePart,
	endOutward: BasePart,
	endInward: BasePart,
	spawnAnchor: Attachment,
}

-- The per-shape geometry of representation.patch.geometryByShape, resolved for one tier.
type PatchGeometry = {
	isWedge: boolean,
	partType: Enum.PartType?,
	size: Vector3,
	orientation: Vector3,
}

local Plots = {}

-- Slot index -> taken. Absent means free. A slot is claimed once and held for as long as its
-- owner is connected; nothing here ever reads the live player count, which is this module's
-- first prohibition.
local takenSlots: { [number]: boolean } = {}

-- UserId -> the lane built for that player.
local plotsByUserId: { [number]: PlotRecord } = {}

-- ==========================================================================
-- Lane arithmetic
-- ==========================================================================

--[[
	Slot n's lane origin on the walkable plane, from plots.slotOrigin:
	(area.originXZ[1] + (n - 1) * plots.pitchStuds, 0, area.originXZ[2]).

	One row along +X, unbounded, so no player cap is implied anywhere. Returned as two numbers
	rather than a Vector3 because every consumer wants the components.
]]
local function slotOrigin(slot: number): (number, number)
	local area = GameConfig.Area
	return area.originXZ[1] + (slot - 1) * GameConfig.Plots.pitchStuds, area.originXZ[2]
end

--[[
	The plot-local Z span of one bay. Bays 1 to 8 are stated in plots.bays; above ordinal 8
	each post-terminal area adds another endgame.postTerminalArea.bayLengthStuds, because its
	footprintStuds2 equals depths.areas[8]'s.

	THIS IS THE SAME ARITHMETIC Layout USES for a patch's plot-local Z, and Layout does not
	export it. If the two ever disagree, patches land off the slab. Reported as a finding.
]]
local function bayBounds(ordinal: number): (number, number)
	local bays = GameConfig.Plots.bays
	local bay = bays[ordinal]
	if bay then
		return bay.zStart, bay.zEnd
	end
	local last = bays[#bays]
	local bayLength = GameConfig.Endgame.postTerminalArea.bayLengthStuds
	local zStart = last.zEnd + (ordinal - #bays - 1) * bayLength
	return zStart, zStart + bayLength
end

-- ==========================================================================
-- Patch geometry
-- ==========================================================================

-- Enum.Material from the name in GameConfig.Patch. FromName rather than a dynamic index,
-- because indexing Enum.Material with an unknown string throws where FromName returns nil.
local function materialFromName(name: string): Enum.Material?
	return Enum.Material:FromName(name)
end

--[[
	Size, Orientation and class for one tier's shape, from representation.patch.geometryByShape.
	This is the whole of the "not one formula for four tiers" rule:

	  Block     Part, footprint x height x footprint, unrotated. Local axes are world axes.
	  Cylinder  Part, THE LENGTH GOES IN X: height x footprint x footprint, rolled 90 about Z
	            so local X stands up along world Y. Unrotated it is a log on the ground.
	  Ball      Part, height cubed. A Ball's diameter is the SMALLEST component and the other
	            two are ignored, so any non-cubic Size lies about what appears on screen;
	            height wins over footprint to keep the height ladder exact.
	  Wedge     WedgePart, footprint x height x footprint, unrotated. Enum.PartType has no
	            Wedge member, so this is a class difference and not a Shape value.

	Whatever the shape, the top of the patch is exactly tier.height above the slab's top face,
	because every one of these is centred at tier.height / 2.
]]
local function geometryForShape(shape: string, height: number, footprint: number): PatchGeometry
	if shape == "Block" then
		return {
			isWedge = false,
			partType = Enum.PartType.Block,
			size = Vector3.new(footprint, height, footprint),
			orientation = Vector3.new(0, 0, 0),
		}
	elseif shape == "Cylinder" then
		return {
			isWedge = false,
			partType = Enum.PartType.Cylinder,
			size = Vector3.new(height, footprint, footprint),
			orientation = Vector3.new(0, 0, 90),
		}
	elseif shape == "Ball" then
		return {
			isWedge = false,
			partType = Enum.PartType.Ball,
			size = Vector3.new(height, height, height),
			orientation = Vector3.new(0, 0, 0),
		}
	elseif shape == "Wedge" then
		return {
			isWedge = true,
			partType = nil,
			size = Vector3.new(footprint, height, footprint),
			orientation = Vector3.new(0, 0, 0),
		}
	end

	-- A shape geometryByShape does not name. Unreachable with today's four tiers; a re-emitted
	-- config that adds a fifth lands here. Warn loudly and fall back to the Block box, because a
	-- visible patch of the wrong silhouette is still clearable and a missing one would put an
	-- unreachable index between the player and the end of the area.
	warn(
		string.format(
			"Plots: tier shape %q has no entry in representation.patch.geometryByShape; falling back to Block",
			shape
		)
	)
	return {
		isWedge = false,
		partType = Enum.PartType.Block,
		size = Vector3.new(footprint, height, footprint),
		orientation = Vector3.new(0, 0, 0),
	}
end

-- One patch Instance. Properties are representation.patch's, in its order; Orientation is set
-- after Position, as that sheet requires (rotation is about the part's own centre, so the two
-- do not interact, but the order is stated and is cheap to honour).
local function buildPatchInstance(index: number, tier: TierDef, position: Vector3, slab: BasePart): BasePart
	local patchConfig = GameConfig.Patch
	local geometry = geometryForShape(tier.shape, tier.height, patchConfig.footprint)

	local part: BasePart
	if geometry.isWedge then
		part = Instance.new("WedgePart")
	else
		local blockish = Instance.new("Part")
		blockish.Shape = geometry.partType :: Enum.PartType
		part = blockish
	end

	part.Name = "Patch" .. index
	part.Size = geometry.size
	part.Position = position
	part.Orientation = geometry.orientation
	part.Color = Color3.fromRGB(tier.rgb[1], tier.rgb[2], tier.rgb[3])

	local material = materialFromName(patchConfig.material)
	if material then
		part.Material = material
	else
		warn(
			string.format(
				"Plots: %q is not an Enum.Material name; leaving the patch material at its default",
				patchConfig.material
			)
		)
	end

	part.Anchored = true
	-- patch.collides, and it is load-bearing: contact clearing with movement-only input must
	-- never be blocked by the thing being cleared.
	part.CanCollide = patchConfig.collides
	part.CastShadow = false
	part.Parent = slab

	return part
end

-- ==========================================================================
-- The lane
-- ==========================================================================

--[[
	One of the four boundary parts, with every property that is not geometry.

	TRANSPARENCY 1 AND CanQuery FALSE ARE BOTH REQUIREMENTS, not defaults left alone.
	traversal.boundary.opaque is false and sightlineObstruction is "none" because
	social.maxCoPresenceSeparationStuds.requirement needs an UNOBSTRUCTED SIGHTLINE between two
	occupied spawn points a pitch apart, and the inter-plot boundary is the one object standing
	between them. An opaque wall there deletes the only social system the game has. CanQuery
	false is the other half: the default camera's occlusion raycasts must pass through, or the
	view jams every time a player walks up to it — and a camera that has snapped in tight is a
	sightline obstruction by another route.
]]
local function newBoundary(suffix: string, parent: BasePart): BasePart
	local part = Instance.new("Part")
	part.Name = "Boundary" .. suffix
	part.Anchored = true
	-- The one property that does the work. traversal.boundary.kind is "collisionBarrier";
	-- passable, climbable and jumpable are all false.
	part.CanCollide = true
	part.Transparency = 1
	part.CanQuery = false
	part.CanTouch = false
	part.CastShadow = false
	part.Material = Enum.Material.SmoothPlastic
	part.Parent = parent
	return part
end

--[[
	Size and place the slab and the four boundary parts for a lane whose live bay ends at
	`liveZEnd`. Called on build and again by `advance` for every bay after the first.

	The slab spans the FULL PITCH across and, on Z, from one walkableMarginStuds outward of
	bay 1 to one inward of the live bay's end — 122 x 1 x 144 at bay 1, 122 x 1 x 3024 at bay 8.
	Its top face is the walkable plane.

	The two long boundary parts occupy exactly the pitch that is not lane, so slot n's +X part
	and slot n+1's -X part share a volume; both are built, because a lane is destroyed with its
	owner and neither may depend on the other existing. Every part overruns by
	BOUNDARY_CORNER_OVERLAP_STUDS so there is no one-stud diagonal gap to squeeze through.

	Resizing a Part does not move what is parented to it, so the patches do not move. The spawn
	ATTACHMENT does move, because an Attachment is positioned relative to its parent's CFrame —
	which is why every caller of this follows it with placeSpawnAnchor.
]]
local function applyLaneExtent(record: PlotRecord, liveZEnd: number)
	local plots = GameConfig.Plots
	local boundary = GameConfig.Traversal.boundary
	local margin = boundary.walkableMarginStuds
	local height = boundary.heightStuds
	local pitch = plots.pitchStuds
	local laneWidth = plots.laneWidthStuds
	-- plots.pitchRule: the pitch is the walkable lane plus the inter-plot boundary's thickness,
	-- so the thickness is the difference and never a number written here.
	local sideThickness = pitch - laneWidth

	local laneLength = liveZEnd + margin * 2
	-- The slab spans plot-local Z from -margin to liveZEnd + margin, so its centre is at
	-- liveZEnd / 2 and its Z extent is laneLength.
	local centreZ = record.originZ + liveZEnd / 2
	local boundaryY = WALKABLE_PLANE_Y + height / 2

	record.slab.Size = Vector3.new(pitch, SLAB_THICKNESS_STUDS, laneLength)
	record.slab.Position = Vector3.new(record.originX, WALKABLE_PLANE_Y - SLAB_THICKNESS_STUDS / 2, centreZ)

	-- laneWidth / 2 + sideThickness / 2, which is pitch / 2 = 61 at shipped values.
	local sideOffset = laneWidth / 2 + sideThickness / 2
	local sideSize = Vector3.new(sideThickness, height, laneLength + BOUNDARY_CORNER_OVERLAP_STUDS)
	record.sidePosX.Size = sideSize
	record.sidePosX.Position = Vector3.new(record.originX + sideOffset, boundaryY, centreZ)
	record.sideNegX.Size = sideSize
	record.sideNegX.Position = Vector3.new(record.originX - sideOffset, boundaryY, centreZ)

	-- The end parts sit just beyond the margin, inner face flush with the slab's edge.
	local endSize = Vector3.new(laneWidth + BOUNDARY_CORNER_OVERLAP_STUDS, height, BOUNDARY_END_THICKNESS_STUDS)
	local endOffset = margin + BOUNDARY_END_THICKNESS_STUDS / 2
	record.endOutward.Size = endSize
	record.endOutward.Position = Vector3.new(record.originX, boundaryY, record.originZ - endOffset)
	record.endInward.Size = endSize
	record.endInward.Position = Vector3.new(record.originX, boundaryY, record.originZ + liveZEnd + endOffset)
end

--[[
	Put the spawn Attachment at the live bay's spawn point, FACING ALONG THE ROW.

	Position is plots.spawn.plotLocal (0, 0, 8) measured from the LIVE bay's start on the
	walkable plane — the generalisation of that key past bay 1, and the same expression Layout
	uses to order patches by spawn distance. plots.spawn.atPlotCentre is false and the +8 is
	why. The Attachment's own Position is relative to the slab's centre, so the slab's Z offset
	comes off here; the slab is never rotated, so its local axes are the world's.

	ROTATION IS NOT OPTIONAL. plots.spawn.lookVector is (1, 0, 0) for slot 1 and (-1, 0, 0) for
	every slot above: parallel to plots.rowAxis and NEVER to laneAxis
	(plots.spawn.neverFacesLaneAxis). Slots are claimed lowest-free-index and are contiguous
	while occupied, so slot 1 looks at slot 2 and slot n > 1 looks at slot n - 1 — in both cases
	straight at an occupied lane one pitch away, which is the only frame in which
	social.maxCoPresenceSeparationStuds is ever satisfied. An Attachment with no rotation faces
	-Z, down the player's own empty lane, and the neighbour is 90 degrees off axis and outside
	the frustum: the player spawns and sees nobody until they turn.
]]
local function placeSpawnAnchor(record: PlotRecord, liveZStart: number, liveZEnd: number)
	local spawnKey = GameConfig.Plots.spawn
	local plotLocal = spawnKey.plotLocal
	local look = if record.slot == 1 then spawnKey.lookVector.slot1 else spawnKey.lookVector.slot2AndAbove

	local position = Vector3.new(
		plotLocal[1],
		SLAB_THICKNESS_STUDS / 2 + plotLocal[2],
		liveZStart + plotLocal[3] - liveZEnd / 2
	)

	local direction = Vector3.new(look[1], look[2], look[3])
	if direction.Magnitude == 0 then
		-- A zero look vector would make CFrame.lookAt throw and leave a lane with no spawn at
		-- all. Only reachable from a re-emitted config; say so and face along the row.
		warn("Plots: plots.spawn.lookVector is zero for slot " .. record.slot .. "; facing +X")
		direction = Vector3.new(1, 0, 0)
	end

	record.spawnAnchor.CFrame = CFrame.lookAt(position, position + direction)
end

--[[
	Build the LIVE bay's patch records, and the Instances for the ones that are still standing.

	`honourCleared` is true on join, where state.cleared describes the live area, and false in
	`advance`, where the set was emptied with the increment and every patch of the new bay
	stands. A record is kept for EVERY index either way — a cleared one with cleared true and
	instance nil — so the array indices stay aligned with layout's canonical order and therefore
	with state.cleared.

	Converts layout's plot-local positions to WORLD by adding the slot origin, and this is the
	only place in the game that conversion happens. Y is tier.height / 2 above the slab's top
	face, for all four shapes.
]]
local function populateLiveBay(record: PlotRecord, state: PlayerState, live: number, honourCleared: boolean): { Patch }
	local patches = Layout.build(live)
	local tiers = GameConfig.Tiers :: { TierDef }
	local cleared = state.cleared

	for index, patch in ipairs(patches) do
		local tier = tiers[patch.tierIndex]
		if not tier then
			-- Layout rolls tierIndex through GameConfig.tierByWeight, so this cannot happen with
			-- a config the emitter produced. Keep the record — clearing pays and completes by
			-- record, so dropping one would leave an area that never finishes — and stand nothing.
			warn(
				string.format(
					"Plots: patch %d has tierIndex %s, which GameConfig.Tiers has no row for; standing nothing there",
					index,
					tostring(patch.tierIndex)
				)
			)
			patch.position = Vector3.new(
				record.originX + patch.position.X,
				WALKABLE_PLANE_Y,
				record.originZ + patch.position.Z
			)
			patch.cleared = honourCleared and cleared[index] == true
			patch.instance = nil
			continue
		end

		local position = Vector3.new(
			record.originX + patch.position.X,
			WALKABLE_PLANE_Y + tier.height / 2,
			record.originZ + patch.position.Z
		)
		patch.position = position

		local isCleared = honourCleared and cleared[index] == true
		patch.cleared = isCleared
		if isCleared then
			patch.instance = nil
		else
			patch.instance = buildPatchInstance(index, tier, position, record.slab)
		end
	end

	return patches
end

-- Tear down whatever is registered for this UserId and free its slot. Shared by despawn and by
-- spawn's guard against being called twice without a despawn between.
local function destroyPlotFor(userId: number)
	local record = plotsByUserId[userId]
	if not record then
		return
	end
	-- Out of the registry first, so nothing can find a lane that is mid-teardown.
	plotsByUserId[userId] = nil
	record.slab:Destroy()
	Plots.releaseSlot(record.slot)
end

-- ==========================================================================
-- The interface
-- ==========================================================================

--[[
	The lowest free 1-based slot index, marked taken.

	plots.slotClaiming is lowestFreeIndex and plots.slotsAreContiguousWhileOccupied is true, so
	a vacated slot is reused before a higher one is allocated and the occupied lanes are always
	a contiguous run — which is what makes "your neighbour one pitch away exists" true rather
	than likely. Exposed so slot reuse is testable without building 640 parts. Called by
	Plots.spawn, not by server-main.
]]
function Plots.claimSlot(): number
	local slot = 1
	while takenSlots[slot] do
		slot += 1
	end
	takenSlots[slot] = true
	return slot
end

--[[
	Return a slot index to the free pool. Releasing an index that is not currently taken is a
	no-op, not an error. Because claimSlot scans upward from 1, a vacated slot is reused before
	a higher one is allocated.
]]
function Plots.releaseSlot(n: number): ()
	takenSlots[n] = nil
end

--[[
	Build this player's lane and return the CFrame their character spawns at.

	Claims a slot, then builds the slab from bay 1 to the live bay (state.areasFinished + 1),
	the four boundary parts, the spawn Attachment at the LIVE bay, and one Instance per patch of
	the LIVE BAY that state.cleared does not mark. Writes state.patches and state.spawnPivot.

	EVERY BAY BELOW THE LIVE ONE IS BARE WALKABLE FLOOR: no patch Instance and no patch record.
	A rejoining player whose areasFinished is 3 gets continuous floor over bays 1 to 4 and
	Instances only in bay 4, and there is nothing in state.patches for bays 1 to 3 for the tick
	to walk — which is why no rejoin can be paid for a finished area a second time, and why no
	latch is needed to stop it.

	Calling this twice for one player without a despawn between is a bug, not a second lane.
]]
function Plots.spawn(player: Player, state: PlayerState): CFrame
	if plotsByUserId[player.UserId] then
		warn(string.format("Plots.spawn: %s already has a lane; tearing the old one down first", player.Name))
		destroyPlotFor(player.UserId)
	end

	local slot = Plots.claimSlot()
	local originX, originZ = slotOrigin(slot)
	local live = state.areasFinished + 1
	local liveZStart, liveZEnd = bayBounds(live)

	local slab = Instance.new("Part")
	slab.Name = "Plot" .. slot
	slab.Anchored = true
	-- The one thing in the lane the player stands on. traversal.collision.playerVsWorld is true.
	slab.CanCollide = true
	slab.Material = Enum.Material.Slate

	local spawnAnchor = Instance.new("Attachment")
	spawnAnchor.Name = "Spawn"
	spawnAnchor.Parent = slab

	local record: PlotRecord = {
		slot = slot,
		originX = originX,
		originZ = originZ,
		liveOrdinal = live,
		slab = slab,
		sidePosX = newBoundary("PosX", slab),
		sideNegX = newBoundary("NegX", slab),
		endOutward = newBoundary("Outward", slab),
		endInward = newBoundary("Inward", slab),
		spawnAnchor = spawnAnchor,
	}

	applyLaneExtent(record, liveZEnd)
	placeSpawnAnchor(record, liveZStart, liveZEnd)

	state.patches = populateLiveBay(record, state, live, true)
	state.spawnPivot = spawnAnchor.WorldCFrame.Position

	-- Parented last: one replication for the slab, its boundary, its Attachment and all of its
	-- patches, rather than one per Instance.
	slab.Parent = Workspace

	plotsByUserId[player.UserId] = record
	return spawnAnchor.WorldCFrame
end

--[[
	Replace the live bay with the next one. CALLED BY clearing, FROM INSIDE THE TICK, ON THE
	PASS THAT FINISHES AN AREA, AND FROM NOWHERE ELSE — plots.liveGeometry.bayBuiltAt is "the
	instant the previous bay's last patch clears", so this is not a deferred job.

	state.areasFinished has ALREADY been incremented by clearing, so the new live bay is
	state.areasFinished + 1. In order: drop the finished bay's records (and destroy any Instance
	still standing, of which there are none); extend the slab inward; move the inward boundary
	to the new end; move the spawn Attachment to the new bay; build every patch of the new bay,
	all of them, because state.cleared was emptied with the increment; rewrite state.patches and
	state.spawnPivot.

	DESTROYS NOTHING A PLAYER IS STANDING ON: the floor is only ever extended, never shortened.
	plots.liveGeometry.torndownBeyond asks for bays more than two outward of the live one to be
	destroyed and rebuilt bare on re-entry; in this build a finished bay IS bare — ground and
	nothing else — so there is nothing to tear down and the ground invariant is the one that
	binds. That changes the first time Art dresses a bay, and the rule acquires a subject then.
]]
function Plots.advance(state: PlayerState): CFrame
	local player = state.player
	local record = if player then plotsByUserId[player.UserId] else nil
	if not record then
		-- The state has no lane: it was despawned between the clear and this call. Nothing to
		-- build and nothing to return but what the state already believes.
		warn("Plots.advance: no lane is registered for this state; nothing was built")
		local pivot = state.spawnPivot
		return if pivot then CFrame.new(pivot) else CFrame.new()
	end

	for _, patch in ipairs(state.patches) do
		local instance = patch.instance
		if instance then
			instance:Destroy()
		end
		patch.instance = nil
	end
	state.patches = {}

	local live = state.areasFinished + 1
	local liveZStart, liveZEnd = bayBounds(live)

	applyLaneExtent(record, liveZEnd)
	placeSpawnAnchor(record, liveZStart, liveZEnd)
	record.liveOrdinal = live

	state.patches = populateLiveBay(record, state, live, false)
	state.spawnPivot = record.spawnAnchor.WorldCFrame.Position

	return record.spawnAnchor.WorldCFrame
end

--[[
	Destroy this player's lane, clear state.patches and state.spawnPivot, and release the slot.

	Destroying the slab takes its four boundary parts, its spawn Attachment and every remaining
	patch with it, so the floor cannot outlive the things standing on it. The slot is recovered
	from this module's own registry, keyed by UserId, and goes back to the free pool at once —
	social.plotTenure.releasedOn is PlayerRemoving and slotReservedOnLeave is false.

	NOTHING ABOUT THE DEPARTURE IS PERCEPTIBLE TO ANY REMAINING PLAYER: no notice, no sound and
	no string. Does not save; server-main calls persistence.save before this.
]]
function Plots.despawn(state: PlayerState): ()
	local player = state.player
	if player then
		destroyPlotFor(player.UserId)
	else
		-- No player, so nothing to key the registry by. Reachable only for a state torn down
		-- before wiring.onJoin step 4 set the field, which persistence.defaultState leaves nil.
		warn("Plots.despawn: this state has no player; no lane was destroyed")
	end

	state.patches = {}
	-- interfaces.plots.despawn asks for spawnPivot to be cleared, and the generated
	-- Types.PlayerState declares it non-optional. Both cannot be honoured without a cast; the
	-- state is garbage the moment this returns, so the write is through `any` and the conflict
	-- is a reported finding rather than a local type of my own.
	local erasable: any = state
	erasable.spawnPivot = nil
end

return Plots
