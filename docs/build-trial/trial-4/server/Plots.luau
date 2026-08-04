--!strict
--[[
	Plots — one player's plot.

	A plot is one Part: the slab the player stands on AND the container its patches
	parent to, so tearing a plot down is one Destroy and the floor can never outlive
	its patches. It carries a "Spawn" Attachment at the centre of its top face, which
	is the point server-main pivots the character to on every CharacterAdded.

	Slots. A slot is claimed once, held for the whole session and released on leave.
	Slot n's origin is a function of n ALONE and never of the live player count, or
	plots would move out from under their owners as people join and leave.

	The latch. `spawn` tests `state.areaComplete` BEFORE it looks at `state.cleared`
	and short-circuits it: a finished area gets its slab and its spawn point and ZERO
	patch Instances, with all `area.patchCount` records present and marked cleared. A
	finished area stays walkable and stays bare, and it cannot be made to pay twice.
	That test lives here rather than in a caller because `plots` is the only module
	that may create a patch Instance.

	Every tuned number comes from GameConfig. The two that GameConfig does not carry
	are named constants below, each with a comment saying where it came from.
]]

local Workspace = game:GetService("Workspace")
local Shared = game:GetService("ReplicatedStorage"):WaitForChild("UIForge")
local GameConfig = require(Shared.GameConfig)
local Layout = require(Shared.Layout)

type Patch = Layout.Patch

-- Derived from the config rather than restated, so re-emitting a tier field does not
-- leave a stale hand-written type behind. GameConfig exports no types of its own.
type TierDef = typeof(GameConfig.Tiers[1])

--[[
	The live per-player state of 03-state-shape.md. Restated here because no module in
	the build order owns a shared PlayerState type; `layout` had the same problem with
	`Patch` and solved it by exporting one, which is what this imports above.

	`patches` is written by this module (wiring.onJoin step 4) and by nothing else;
	it is the one field `persistence.defaultState()` does not construct.
]]
export type PlayerState = {
	currency: number,
	upgrades: { [string]: number },
	patches: { Patch },
	cleared: { [number]: boolean },
	clearedCount: number,
	found: { [string]: boolean },
	areaComplete: boolean,
	player: Player,
}

-- NOT IN GameConfig — the gutter between two plots, in studs. The build brief states it
-- once, in prose, in the interfaces note for plots.claimSlot: "Slot n's plot origin is
-- (area.originXZ[1] + (n - 1) * (area.size + 40), 0, area.originXZ[2]): one row along
-- +X, 40 studs of gutter between plots, unbounded". It is a tuned spatial value with no
-- config key, so it cannot be re-emitted; reported as such in Plots.report.md.
local PLOT_GUTTER_STUDS = 40

-- NOT IN GameConfig — the slab's thickness, in studs. From 06-representation.md:
-- Size is "Vector3.new(area.size, 1, area.size) — 120 x 1 x 120". Named because three
-- other numbers are derived from it: the slab's centre sits half of it below Y = 0 so
-- the top face is the walkable plane at Y = 0, and the spawn Attachment sits half of it
-- above the slab's centre, which is the "Vector3.new(0, 0.5, 0)" that sheet also states.
local SLAB_THICKNESS_STUDS = 1

-- The one tier shape that is not a member of Enum.PartType. 06-representation.md:
-- "Part for Block, Cylinder and Ball; WedgePart for Heartvine — Enum.PartType has no
-- Wedge member, and getting this wrong silently collapses the fourth silhouette into
-- the first." The string is a tier's `shape` field, so it is matched, not assumed.
local WEDGE_SHAPE_NAME = "Wedge"

local PLOT_NAME_PREFIX = "Plot"
local PATCH_NAME_PREFIX = "Patch"
local SPAWN_ATTACHMENT_NAME = "Spawn"

-- Slot index -> taken. The free pool is the complement of this table, and claimSlot
-- hands back its lowest free index, so a vacated slot is reused before a higher one is
-- allocated. Unbounded: no player cap is implied anywhere.
local takenSlots: { [number]: boolean } = {}

-- UserId -> the plot built for that player. `despawn` recovers the slot from here,
-- because PlayerState carries no slot field and must not gain one.
local plotsByUserId: { [number]: { slot: number, plot: BasePart } } = {}

local Plots = {}

--[[
	The lowest free 1-based slot index, marked taken.

	Called by plots.spawn, not by server-main. Exposed so slot reuse is testable
	without building 140 parts.
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
	Return a slot to the free pool. Releasing an index that is not currently taken is
	a no-op, not an error.
]]
function Plots.releaseSlot(slot: number)
	takenSlots[slot] = nil
end

--[[
	Slot n's plot origin in world space: one row along +X, area.size + the gutter
	apart, with area.originXZ as the CENTRE of slot 1. Y is 0 — the walkable plane.

	A function of the slot index alone. Never of the live player count.
]]
local function slotOrigin(slot: number): Vector3
	local area = GameConfig.Area
	local stride = area.size + PLOT_GUTTER_STUDS
	return Vector3.new(area.originXZ[1] + (slot - 1) * stride, 0, area.originXZ[2])
end

--[[
	Destroy the plot registered for a UserId and release its slot, if there is one.
	Destroying the slab takes its patches and its spawn Attachment with it.
]]
local function teardown(userId: number)
	local record = plotsByUserId[userId]
	if record == nil then
		return
	end
	-- Deregister before destroying, so a re-entrant call cannot find a dead Instance.
	plotsByUserId[userId] = nil
	record.plot:Destroy()
	Plots.releaseSlot(record.slot)
end

--[[
	Enum.Material[patch.material]. Resolved by name at call time rather than at require
	time, because a module in this tree does no work when it loads, and because the name
	is config: re-emitting `Patch.material` has to change the material without a code
	edit. A name that is not a Material warns once per spawn and leaves the engine
	default rather than substituting a look nobody specified.
]]
local function patchMaterial(): Enum.Material
	local name = GameConfig.Patch.material
	local material = (Enum.Material :: any)[name] :: Enum.Material?
	if material == nil then
		warn(`[Plots] GameConfig.Patch.material "{name}" is not an Enum.Material; using the default`)
		return Enum.Material.Plastic
	end
	return material
end

--[[
	The right class for a tier's silhouette. Shape is the PRIMARY rarity channel, so a
	shape that cannot be resolved is warned about loudly instead of quietly becoming a
	Block, which is the exact failure 06-representation.md names.
]]
local function createPatchPart(shape: string): BasePart
	if shape == WEDGE_SHAPE_NAME then
		return Instance.new("WedgePart")
	end

	local part = Instance.new("Part")
	local partType = (Enum.PartType :: any)[shape] :: Enum.PartType?
	if partType == nil then
		warn(`[Plots] tier shape "{shape}" is not an Enum.PartType and is not a Wedge; silhouette lost`)
	else
		part.Shape = partType
	end
	return part
end

--[[
	One patch Instance, parented to the slab.

	Colour is the SECONDARY channel and is read off the tier; CanCollide comes from
	GameConfig.Patch.collides and is load-bearing — contact clearing with movement-only
	input must never be blocked by the thing being cleared. CastShadow is off because
	there can be up to area.patchCount of these per plot per player.
]]
local function buildPatch(
	index: number,
	tier: TierDef,
	position: Vector3,
	material: Enum.Material,
	slab: BasePart
): BasePart
	local part = createPatchPart(tier.shape)
	local footprint = GameConfig.Patch.footprint
	part.Name = PATCH_NAME_PREFIX .. index
	part.Size = Vector3.new(footprint, tier.height, footprint)
	part.Position = position
	part.Color = Color3.fromRGB(tier.rgb[1], tier.rgb[2], tier.rgb[3])
	part.Material = material
	part.Anchored = true
	part.CanCollide = GameConfig.Patch.collides
	part.CastShadow = false
	part.Parent = slab
	return part
end

--[[
	Build this player's plot: claim a slot, raise the slab, hang its spawn Attachment,
	and create one Instance per patch that is still overgrown. Write state.patches and
	return the spawn point's WorldCFrame.

	Converts layout's PLOT-LOCAL positions to world by adding the slot origin, and this
	is the only place that conversion happens.

	A cleared patch still gets its record — cleared true, instance nil — so indices stay
	aligned with layout's canonical order and therefore with state.cleared.

	THE LATCH IS TESTED FIRST AND SHORT-CIRCUITS THE CLEARED SET: while
	state.areaComplete is true this creates ZERO patch Instances and never reads
	state.cleared at all. The slab and the Attachment are built as usual — a finished
	area stays walkable and stays bare.
]]
function Plots.spawn(player: Player, state: PlayerState): CFrame
	local userId = player.UserId

	-- Calling spawn twice for one player without a despawn between is a bug, not a
	-- second plot: say so, and make sure it stays not-a-second-plot by tearing the
	-- first one down instead of orphaning it and leaking its slot.
	if plotsByUserId[userId] ~= nil then
		warn(`[Plots] spawn called twice for {player.Name} with no despawn between; replacing the existing plot`)
		teardown(userId)
	end

	local area = GameConfig.Area
	local slot = Plots.claimSlot()
	local origin = slotOrigin(slot)

	local slab = Instance.new("Part")
	slab.Name = PLOT_NAME_PREFIX .. slot
	slab.Size = Vector3.new(area.size, SLAB_THICKNESS_STUDS, area.size)
	-- The slot origin is the top face, so the centre is half a thickness below it.
	slab.Position = origin - Vector3.new(0, SLAB_THICKNESS_STUDS / 2, 0)
	slab.Anchored = true
	slab.CanCollide = true
	slab.Material = Enum.Material.Slate
	slab.Parent = Workspace

	local spawnPoint = Instance.new("Attachment")
	spawnPoint.Name = SPAWN_ATTACHMENT_NAME
	spawnPoint.Position = Vector3.new(0, SLAB_THICKNESS_STUDS / 2, 0)
	spawnPoint.Parent = slab

	plotsByUserId[userId] = { slot = slot, plot = slab }

	-- The latch, hoisted out of the loop: `areaComplete or ...` never evaluates the
	-- cleared set while the latch is set.
	local areaComplete = state.areaComplete == true
	local material = patchMaterial()
	local patches = Layout.build()

	for index, patch in ipairs(patches) do
		local tier = GameConfig.Tiers[patch.tierIndex]
		local localPosition = patch.position
		-- Plot-local -> world, and the patch sits ON the slab's top face rather than
		-- through it: half its height above Y = 0.
		patch.position = Vector3.new(
			origin.X + localPosition.X,
			tier.height / 2,
			origin.Z + localPosition.Z
		)

		local cleared = areaComplete or state.cleared[index] == true
		patch.cleared = cleared
		if cleared then
			patch.instance = nil
		else
			patch.instance = buildPatch(index, tier, patch.position, material, slab)
		end
	end

	state.patches = patches
	return spawnPoint.WorldCFrame
end

--[[
	Tear this player's plot down and hand its slot back.

	One Destroy takes the slab, its patches and its spawn Attachment. Does not save:
	server-main calls persistence.save before this.
]]
function Plots.despawn(state: PlayerState)
	state.patches = {}
	teardown(state.player.UserId)
end

return Plots
