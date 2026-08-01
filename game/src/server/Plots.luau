--!strict
--[[
	Plots — one player's plot, and the slot it occupies.

	A plot is exactly four things, all of them owned here:

	  * the SLAB, a Part sized to the FULL SLOT PITCH (area.size + the plot gutter), so
	    consecutive slabs share an edge and there is no air between two plots at any index;
	  * FOUR BARRIERS, invisible collidable Parts on the area boundary, built on every plot
	    including a finished one — the pair with the slab is the whole playtest fix for
	    walking out of the world;
	  * a spawn ATTACHMENT at the slab's top face, whose WorldCFrame is what `spawn` returns
	    and what server-main pivots a character to on every CharacterAdded;
	  * one PATCH Instance per layout index that `state.cleared` does not mark — and NONE AT
	    ALL while `state.areaComplete` is true.

	The latch is tested before the cleared set and short-circuits it. That test lives here,
	in the only module allowed to create a patch Instance, rather than in a caller who could
	forget it: it is what makes "cleared is permanent" true in the world and not just in the
	save.

	A patch's Size and Orientation are PER SHAPE, never one formula for four tiers. A Roblox
	Cylinder's axis runs along its local X and a Ball takes the smallest of its three
	components, so a single Vector3.new(footprint, height, footprint) lays the Fern on its
	side and shrinks the Bramble. Shape is the primary rarity channel — the one that has to
	survive colour being thrown away — so getting this wrong is not cosmetic.

	Every tuned number is read from GameConfig. The handful of plot-geometry constants below
	are the documented exception; see the comment on them.
]]

local Workspace = game:GetService("Workspace")

local Shared = game:GetService("ReplicatedStorage"):WaitForChild("UIForge")
local GameConfig = require(Shared.GameConfig)
local Layout = require(Shared.Layout)

--[[
	PLOT-GEOMETRY CONSTANTS — deliberately not in GameConfig.

	`interfaces.plots.claimSlot` settles the gutter: "The 40 is a plot-geometry constant, not
	a tuned game value: it lives here and in representation, it is used by plots and by
	nothing else, and it is deliberately NOT in GameConfig, which carries values more than
	one module reads and which must load outside the engine. A builder writes it as a named
	local in Plots.luau and cites this note."

	The slab thickness and the four barrier numbers are the same kind of constant, fixed in
	`representation` under `plot` and `plot-barrier`, read by this module and by nothing
	else, and so they are written the same way. Every OTHER number in this file comes from
	GameConfig.
]]
local PLOT_GUTTER = 40 -- studs between two slot origins, on top of area.size
local SLAB_THICKNESS = 1 -- representation.plot: Size Y
local BARRIER_HEIGHT = 12 -- representation.plot-barrier: a default Humanoid apexes near 7.2
local BARRIER_THICKNESS = 1 -- representation.plot-barrier: the short axis of each of the four
local BARRIER_OVERLAP = 2 -- the "+ 2" that closes the corner diagonals

-- The Patch record 03-state-shape names. Layout exports this type, but this build has no
-- shared types module and the require graph is resolved by Rojo rather than by a path the
-- analyser can follow, so it is restated here in the same shape Layout.luau declares.
type Patch = {
	position: Vector3,
	tierIndex: number,
	relic: string?,
	cleared: boolean,
	instance: BasePart?,
}

-- One entry of GameConfig.Tiers. Restated for the same reason as Patch.
type TierDef = {
	name: string,
	shape: string,
	rgb: { number },
	value: number,
	weight: number,
	height: number,
}

-- The live PlayerState of 03-state-shape. `plots` reads `cleared`, `areaComplete` and
-- `player`, and writes `patches`; the rest of the fields are listed so the type matches the
-- one state object the whole server passes around rather than a plots-only slice of it.
type PlayerState = {
	currency: number,
	upgrades: { [string]: number },
	patches: { Patch },
	cleared: { [number]: boolean },
	clearedCount: number,
	found: { [string]: boolean },
	areaComplete: boolean,
	player: Player,
}

-- What `despawn` needs to undo `spawn`. Keyed by UserId because PlayerState carries no slot
-- field and, per interfaces.plots.despawn, must not gain one.
type PlotRecord = {
	slot: number,
	slab: BasePart,
}

-- The per-shape geometry of representation.patch.geometryByShape, resolved for one tier.
type PatchGeometry = {
	isWedge: boolean,
	partType: Enum.PartType?,
	size: Vector3,
	orientation: Vector3,
}

local Plots = {}

-- Slot index -> taken. Absent means free. A slot is claimed once and held for as long as
-- its owner is connected; nothing here ever reads the live player count, which is this
-- module's first prohibition.
local takenSlots: { [number]: boolean } = {}

-- UserId -> the plot built for that player.
local plotsByUserId: { [number]: PlotRecord } = {}

--[[
	Slot n's plot origin, from interfaces.plots.claimSlot:
	(area.originXZ[1] + (n - 1) * (area.size + 40), 0, area.originXZ[2]).

	One row along +X, unbounded, so no player cap is implied anywhere. Y is 0: the origin is
	the walkable plane, and the slab hangs below it.
]]
local function slotOrigin(slot: number): Vector3
	local area = GameConfig.Area
	local pitch = area.size + PLOT_GUTTER
	return Vector3.new(area.originXZ[1] + (slot - 1) * pitch, 0, area.originXZ[2])
end

-- Enum.Material from the name in GameConfig.Patch. FromName rather than a dynamic index,
-- because indexing Enum.Material with an unknown string throws where FromName returns nil.
local function materialFromName(name: string): Enum.Material?
	return Enum.Material:FromName(name)
end

--[[
	Size, Orientation and class for one tier's shape, from representation.patch.
	geometryByShape. This is the whole of the "not one formula for four tiers" rule:

	  Block     Part, footprint x height x footprint, unrotated. Local axes are world axes.
	  Cylinder  Part, THE LENGTH GOES IN X: height x footprint x footprint, rolled 90 about
	            Z so local X stands up along world Y. Unrotated it is a log on the ground.
	  Ball      Part, height cubed. A Ball's diameter is the SMALLEST component and the other
	            two are ignored, so any non-cubic Size lies about what appears on screen;
	            height wins over footprint to keep the height ladder exact.
	  Wedge     WedgePart, footprint x height x footprint, unrotated. Enum.PartType has no
	            Wedge member, so this is a class difference and not a Shape value.

	Whatever the shape, the top of the patch is exactly tier.height above the slab's top
	face, because every one of these is centred at tier.height / 2.
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

	-- A shape geometryByShape does not name. Unreachable with today's four tiers; a
	-- re-emitted config that adds a fifth lands here. Warn loudly and fall back to the Block
	-- box, because a visible patch of the wrong silhouette is still clearable and a missing
	-- one would put an unreachable index between the player and areaComplete.
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

-- One patch Instance. Properties are representation.patch's, in its order; Orientation is
-- set after Position, as that sheet requires (rotation is about the part's own centre, so
-- the two do not interact, but the order is stated and is cheap to honour).
local function buildPatch(index: number, tier: TierDef, position: Vector3, slab: BasePart): BasePart
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
		warn(string.format("Plots: %q is not an Enum.Material name; leaving the patch material at its default", patchConfig.material))
	end

	part.Anchored = true
	-- patch.collides, and it is load-bearing: contact clearing with movement-only input must
	-- never be blocked by the thing being cleared.
	part.CanCollide = patchConfig.collides
	part.CastShadow = false
	part.Parent = slab

	return part
end

-- The four barriers of representation.plot-barrier. Not optional and not conditional: every
-- plot gets all four, including a finished one with no patches on it.
local function buildBarriers(slab: BasePart, origin: Vector3)
	local size = GameConfig.Area.size
	-- The inner faces sit exactly on the area boundary at +/- area.size / 2, so the offset is
	-- half a barrier's thickness beyond it. The long axis overruns by BARRIER_OVERLAP so the
	-- four overlap at the corners and leave no diagonal gap.
	local offset = size / 2 + BARRIER_THICKNESS / 2
	local span = size + BARRIER_OVERLAP
	-- Base flush with the walkable plane, top BARRIER_HEIGHT above it.
	local y = origin.Y + BARRIER_HEIGHT / 2

	local longInZ = Vector3.new(BARRIER_THICKNESS, BARRIER_HEIGHT, span)
	local longInX = Vector3.new(span, BARRIER_HEIGHT, BARRIER_THICKNESS)

	local specs: { { name: string, size: Vector3, position: Vector3 } } = {
		{ name = "PosX", size = longInZ, position = Vector3.new(origin.X + offset, y, origin.Z) },
		{ name = "NegX", size = longInZ, position = Vector3.new(origin.X - offset, y, origin.Z) },
		{ name = "PosZ", size = longInX, position = Vector3.new(origin.X, y, origin.Z + offset) },
		{ name = "NegZ", size = longInX, position = Vector3.new(origin.X, y, origin.Z - offset) },
	}

	for _, spec in ipairs(specs) do
		local barrier = Instance.new("Part")
		barrier.Name = "Barrier" .. spec.name
		barrier.Size = spec.size
		barrier.Position = spec.position
		barrier.Anchored = true
		barrier.CanCollide = true
		barrier.Transparency = 1
		-- The default camera's occlusion raycasts must pass through, or the view jams every
		-- time a player walks up to the boundary.
		barrier.CanQuery = false
		barrier.CanTouch = false
		barrier.CastShadow = false
		barrier.Material = Enum.Material.SmoothPlastic
		barrier.Parent = slab
	end
end

-- Tear down whatever is registered for this UserId and free its slot. Shared by despawn and
-- by spawn's guard against being called twice without a despawn between.
local function destroyPlotFor(userId: number)
	local record = plotsByUserId[userId]
	if not record then
		return
	end
	-- Out of the registry first, so nothing can find a plot that is mid-teardown.
	plotsByUserId[userId] = nil
	record.slab:Destroy()
	Plots.releaseSlot(record.slot)
end

--[[
	The lowest free 1-based slot index, marked taken.

	Exposed so slot reuse is testable without building 140 parts. Called by Plots.spawn, not
	by server-main.
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
	no-op, not an error. Because claimSlot scans upward from 1, a vacated slot is reused
	before a higher one is allocated.
]]
function Plots.releaseSlot(n: number): ()
	takenSlots[n] = nil
end

--[[
	Build this player's plot and return the CFrame their character spawns at.

	Claims a slot, builds the slab, its four barriers, its spawn Attachment and one Instance
	per patch that state.cleared does not mark, then writes state.patches. Converts layout's
	plot-local positions to WORLD by adding the slot origin, and is the only place that
	conversion happens.

	THE LATCH IS CHECKED FIRST AND SHORT-CIRCUITS THE SET: while state.areaComplete is true
	this builds ZERO patch Instances and every one of the area.patchCount records comes back
	cleared true and instance nil. The slab, the barriers and the Attachment are built as
	usual, because a finished area stays walkable, stays fenced and stays bare.

	A cleared patch still gets its record, with cleared true and instance nil, so the array
	indices stay aligned with layout's canonical order and therefore with state.cleared.
]]
function Plots.spawn(player: Player, state: PlayerState): CFrame
	-- Calling this twice for one player without a despawn between is a bug, not a second
	-- plot. Say so, and take the orphan with us rather than leaking a slab and a slot.
	if plotsByUserId[player.UserId] then
		warn(string.format("Plots.spawn: %s already has a plot; tearing the old one down first", player.Name))
		destroyPlotFor(player.UserId)
	end

	local area = GameConfig.Area
	local slot = Plots.claimSlot()
	local origin = slotOrigin(slot)

	local slab = Instance.new("Part")
	slab.Name = "Plot" .. slot
	-- THE FULL SLOT PITCH, not area.size: the gutter is floor rather than a hole, so
	-- consecutive slabs share an edge and there is no air between two plots at any index.
	local pitch = area.size + PLOT_GUTTER
	slab.Size = Vector3.new(pitch, SLAB_THICKNESS, pitch)
	-- Top face at the slot origin's Y, so the origin doubles as the walkable plane.
	slab.Position = Vector3.new(origin.X, origin.Y - SLAB_THICKNESS / 2, origin.Z)
	slab.Anchored = true
	slab.CanCollide = true
	slab.Material = Enum.Material.Slate

	buildBarriers(slab, origin)

	local spawnAnchor = Instance.new("Attachment")
	spawnAnchor.Name = "Spawn"
	-- Relative to the slab's centre, which puts it on the slab's top face at its centre.
	spawnAnchor.Position = Vector3.new(0, SLAB_THICKNESS / 2, 0)
	spawnAnchor.Parent = slab

	local patches: { Patch } = Layout.build()
	local tiers: { TierDef } = GameConfig.Tiers
	local areaComplete = state.areaComplete
	local cleared = state.cleared

	for index, patch in ipairs(patches) do
		local tier = tiers[patch.tierIndex]
		-- Plot-local to world. Layout leaves Y at 0 and says plots owns the vertical offset:
		-- the centre sits tier.height / 2 above the slab's top face, for all four shapes.
		local position = Vector3.new(
			origin.X + patch.position.X,
			origin.Y + tier.height / 2,
			origin.Z + patch.position.Z
		)
		patch.position = position

		-- The latch first, the set second.
		local isCleared = areaComplete or cleared[index] == true
		patch.cleared = isCleared
		if isCleared then
			patch.instance = nil
		else
			patch.instance = buildPatch(index, tier, position, slab)
		end
	end

	-- Parented last: one replication for the slab, its barriers and all of its patches.
	slab.Parent = Workspace

	state.patches = patches
	plotsByUserId[player.UserId] = { slot = slot, slab = slab }

	return spawnAnchor.WorldCFrame
end

--[[
	Destroy this player's plot, clear state.patches and release the slot.

	Destroying the slab takes its barriers, its spawn Attachment and every remaining patch
	with it, so the floor cannot outlive the things standing on it. The slot is recovered
	from this module's own registry, keyed by UserId. Does not save: server-main calls
	persistence.save before this.
]]
function Plots.despawn(state: PlayerState): ()
	local player = state.player
	if not player then
		-- Nothing to key the registry by. Still clear the records, so a state without a
		-- player does not keep a table of patches whose Instances are gone.
		state.patches = {}
		return
	end

	destroyPlotFor(player.UserId)
	state.patches = {}
end

return Plots
