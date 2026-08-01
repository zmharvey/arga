--!strict
--[[
	tool — server.

	THE ONE HELD OBJECT. A Model welded to the character's RightHand whose head width is
	the visible reading of EFFECTIVE radius.

	Two facts about it are load-bearing and both are easy to get wrong:

	  * It is NOT a Roblox `Tool`. tool.isRobloxToolInstance is false and
	    tool.entersBackpack is false. A `Tool` instance would grant a free
	    tap-to-activate and reopen the input question input's five-verb roster settles,
	    so nothing here creates one and nothing here touches the Backpack.
	  * The head width resolves from `modifiers.effective(state, "radius")`, NEVER from
	    `state.upgrades.radius`. products.items[span].deliverable says so in as many
	    words: Span is a multiplicative factor on the radius axis with no level moving,
	    and a level-only reading would make a 499-Robux product invisible.

	This module computes no effective value of its own — modifiers.singleDefinition owns
	that — writes no Humanoid property (tool.writesHumanoidProperties is false; the one
	Humanoid write in this game is server-main's WalkSpeed), clears nothing
	(tool.clearsOnContact is false; clearing is a server proximity test in clearing.tick),
	carries no ParticleEmitter (tool.particleEmitters is 0) and plays no animation
	(tool.animates is false).

	`equip` is called from wiring.onSpawn on EVERY character, including the one
	wiring.onDeath loads, because tool.grantedAt is "spawn". The previous character's tool
	went with the previous character. `refresh` is called by `equip` and by server-main
	after a successful purchase, and by nothing on a tick: the width changes only when a
	level or an entitlement changes.
]]

local ReplicatedStorage = game:GetService("ReplicatedStorage")

-- tree.rules: WaitForChild the shared root ONCE, into a local; index its children
-- directly after that.
local Shared = ReplicatedStorage:WaitForChild("UIForge")
local GameConfig = require(Shared.GameConfig) :: any
local Modifiers = require(Shared.Modifiers) :: any

-- One entry of GameConfig.Upgrades, in the emitter's spelling. Only the three fields the
-- equivalent-level expression needs are named.
type UpgradeDef = {
	id: string,
	label: string,
	base: number,
	perLevel: number,
}

-- Exactly the blocks of GameConfig this module reads, so a strict checker can see the
-- shape across a require it cannot resolve. Not a copy of any value.
type ConfigShape = {
	Upgrades: { UpgradeDef },
	Tool: {
		count: number,
		attachment: string,
		headWidthBaseStuds: number,
		headWidthPerLevelStuds: number,
		massless: boolean,
		canCollide: boolean,
		canTouch: boolean,
		canQuery: boolean,
	},
}

local Config: ConfigShape = GameConfig

--[[
	The state this module touches, which is NOTHING: `state` is passed straight through to
	modifiers.effective, which reads upgrades, found, owned and areasFinished and writes
	none of them.

	Types.luau is the generated home of PlayerState and says to require it rather than
	declare a copy. An instance require does not resolve for this repo's `luau-analyze`,
	so the parameter is typed as the opaque handle it actually is here rather than as a
	second declaration of a shape this module never indexes. Noted in the build report.
]]
type PlayerState = any

local Modifier: {
	effective: (PlayerState, string) -> number,
} = Modifiers

-- modifiers.axisIdsJoinUpgrades: axes[].id is upgrades[].id verbatim. "Reach" is a label
-- and never an id, and tool.drivenBy is this string.
local RADIUS_AXIS = "radius"

--[[
	Names. The Model's name is representation.tool.Name; the two part names are not stated
	anywhere, and `refresh` has to find the head again on a character it did not build in
	the same call, so they are fixed here rather than left to a search by size.
]]
local MODEL_NAME = "Tool"
local HANDLE_NAME = "Handle"
local HEAD_NAME = "Head"

--[[
	The part dimensions the head width does NOT drive.

	representation.tool states handle.Size as Vector3.new(0.3, 0.3, 1.4) and head.Size as
	Vector3.new(headWidth, 0.2, 0.6). Only headWidth's two inputs reached GameConfig
	(GameConfig.Tool.headWidthBaseStuds and .headWidthPerLevelStuds); the other five
	numbers are in the representation key and in no emitted config block, so they are
	written here as named constants. Re-emitting the config cannot change them, which is
	the one place this module breaks the "no module holds a tuned value" rule. Reported.
]]
local HANDLE_SIZE_STUDS = Vector3.new(0.3, 0.3, 1.4)
local HEAD_THICKNESS_STUDS = 0.2
local HEAD_DEPTH_STUDS = 0.6

--[[
	The head sits flush against the front face of the handle, on the handle's own -Z.

	DERIVED, not chosen: half the handle's length plus half the head's depth is exactly
	the two stated sizes touching. The pose of the HANDLE relative to the hand is not
	derivable from anything and is the identity below — reported.
]]
local HEAD_FORWARD_OFFSET_STUDS = HANDLE_SIZE_STUDS.Z / 2 + HEAD_DEPTH_STUDS / 2

local Tool = {}

-- ---------------------------------------------------------------------------
-- The width.
-- ---------------------------------------------------------------------------

-- GameConfig exposes no by-id accessor and a module may do no work at require time, so
-- this is a linear scan over three entries rather than an index built at load.
local function radiusUpgrade(): UpgradeDef
	for _, def in ipairs(Config.Upgrades) do
		if def.id == RADIUS_AXIS then
			return def
		end
	end
	-- Not a fallback. A config with no "radius" row cannot produce a head width at all,
	-- and a substituted number would be indistinguishable from a specified one.
	error(`tool: GameConfig.Upgrades carries no entry with id "{RADIUS_AXIS}"`)
end

--[[
	The head width, in studs, for a state.

	interfaces.tool.refresh carries the expression verbatim:

	    equivalentLevels = (effective(state, "radius") - upgrades[radius].base)
	                       / upgrades[radius].perLevel
	    headWidth        = tool.headWidthBaseStuds
	                       + tool.headWidthPerLevelStuds * equivalentLevels

	"the number of Reach levels the effective radius is worth, which is the held level
	exactly when no factor applies and more when one does". At level 0 with nothing owned
	that is 0 equivalent levels and 1.2 studs; at Reach 8 it is 8 and 4.0 studs; at Reach 8
	owning Span it is 17.75 and 7.4125 studs.

	Note that the mapping is affine, not proportional: a 1.75x factor on the radius axis is
	NOT a 1.75x head. Reported.
]]
local function headWidthFor(state: PlayerState): number
	local def = radiusUpgrade()
	local effectiveRadius = Modifier.effective(state, RADIUS_AXIS)

	-- perLevel is 1.1 in every shipped config. Zero would be a config defect rather than a
	-- game state, and dividing by it yields inf or nan and then an invalid Size, so it
	-- reads as "no level is worth anything" and the base width stands.
	local equivalentLevels = 0
	if def.perLevel ~= 0 then
		equivalentLevels = (effectiveRadius - def.base) / def.perLevel
	end

	-- Every factor is >= modifiers.factorFloor and the radius clamp (60 studs) is an order
	-- above the base, so this cannot go negative at any shipped value. The floor is here so
	-- that a config that did drive it negative produces the base head rather than an
	-- invalid Size.
	if equivalentLevels < 0 then
		equivalentLevels = 0
	end

	return Config.Tool.headWidthBaseStuds + Config.Tool.headWidthPerLevelStuds * equivalentLevels
end

-- ---------------------------------------------------------------------------
-- Lookups on a live character.
-- ---------------------------------------------------------------------------

local function toolModelOf(character: Model): Model?
	local found = character:FindFirstChild(MODEL_NAME)
	if found ~= nil and found:IsA("Model") then
		return found
	end
	return nil
end

local function headOf(model: Model): BasePart?
	local found = model:FindFirstChild(HEAD_NAME)
	if found ~= nil and found:IsA("BasePart") then
		return found
	end
	return nil
end

-- ---------------------------------------------------------------------------
-- Construction.
-- ---------------------------------------------------------------------------

--[[
	Every physics and rendering property the representation row fixes, on both parts.

	Anchored false — it is welded to a moving character, not pinned to the world.
	Massless, CanCollide, CanTouch and CanQuery come from GameConfig.Tool, whose booleans
	are the spelling of tool.massless / canCollide / canTouch / canQuery.

	Colour, Material and Transparency are deliberately NOT set: no key states them, so the
	engine defaults stand rather than this module choosing an appearance. Reported.
]]
local function applyPartRules(part: BasePart)
	part.Anchored = false
	part.Massless = Config.Tool.massless
	part.CanCollide = Config.Tool.canCollide
	part.CanTouch = Config.Tool.canTouch
	part.CanQuery = Config.Tool.canQuery
	part.CastShadow = false
end

local function buildTool(character: Model, hand: BasePart, width: number): Model
	local model = Instance.new("Model")
	model.Name = MODEL_NAME

	local handle = Instance.new("Part")
	handle.Name = HANDLE_NAME
	handle.Size = HANDLE_SIZE_STUDS
	applyPartRules(handle)

	local head = Instance.new("Part")
	head.Name = HEAD_NAME
	head.Size = Vector3.new(width, HEAD_THICKNESS_STUDS, HEAD_DEPTH_STUDS)
	applyPartRules(head)

	-- The pose. A WeldConstraint freezes whatever relative CFrame the two parts hold when
	-- it is created, so both CFrames are set BEFORE either constraint exists.
	handle.CFrame = hand.CFrame
	head.CFrame = handle.CFrame * CFrame.new(0, 0, -HEAD_FORWARD_OFFSET_STUDS)

	handle.Parent = model
	head.Parent = model
	model.PrimaryPart = handle
	model.Parent = character

	-- tool.attachment: the handle is welded to RightHand. This is the constraint the
	-- representation row names.
	local handWeld = Instance.new("WeldConstraint")
	handWeld.Name = "HandWeld"
	handWeld.Part0 = handle
	handWeld.Part1 = hand
	handWeld.Parent = handle

	-- The SECOND constraint the representation row does not name. With two unanchored
	-- massless parts and only the weld above, the head is joined to nothing and falls off
	-- the frame it spawns. Reported.
	local headWeld = Instance.new("WeldConstraint")
	headWeld.Name = "HeadWeld"
	headWeld.Part0 = head
	headWeld.Part1 = handle
	headWeld.Parent = head

	return model
end

-- ---------------------------------------------------------------------------
-- The two entry points.
-- ---------------------------------------------------------------------------

--[[
	Build the one held tool and weld it to the character's RightHand.

	Called from wiring.onSpawn step 7, after the character, its Humanoid and its
	HumanoidRootPart exist and after world.onCharacter has put its parts in the collision
	group. Calls refresh itself, so the head width is right on the first frame.

	tool.count is 1: any tool already on this character is destroyed first, so calling this
	twice on one character leaves one tool and not two.
]]
function Tool.equip(player: Player, state: PlayerState)
	local character = player.Character
	if character == nil then
		-- The player left, or the character was destroyed between CharacterAdded and here.
		-- Nothing to hold a tool: return, do not error.
		return
	end

	local existing = toolModelOf(character)
	if existing ~= nil then
		existing:Destroy()
	end

	--[[
		tool.attachment is "RightHand", which is an R15 limb Part. FindFirstChild rather
		than WaitForChild: server-main has already waited for the Humanoid and the
		HumanoidRootPart, and a wait here with no stated timeout would hold up the snapshot
		push in wiring.onSpawn step 8 forever on a rig that has no such part. An R6 rig has
		no RightHand at all and the tool would simply not appear — reported.
	]]
	local handChild = character:FindFirstChild(Config.Tool.attachment)
	if handChild == nil or not handChild:IsA("BasePart") then
		warn(
			`tool: character "{character.Name}" has no BasePart named "{Config.Tool.attachment}" `
				.. `(GameConfig.Tool.attachment); no tool was built for this character`
		)
		return
	end

	buildTool(character, handChild, headWidthFor(state))
end

--[[
	Re-resolve the head's width from EFFECTIVE radius.

	tool.appearanceChannel is headWidth and tool.changesWithAxes is exactly ["radius"]:
	nothing else about the tool ever changes, and the value and speed axes reach it not at
	all (tool.unaffectedByAxes).

	Called by equip and by server-main after ANY successful purchase — unconditionally,
	whichever upgrade was bought, because Span changes the effective radius with no level
	moving and a gate on upgradeId would make a 499-Robux purchase invisible.

	Resizing a welded part does not move it: the head's centre is where the weld holds it,
	so the head widens symmetrically about the handle's axis and nothing is re-welded.

	A missing character or a missing tool is a return and not a warning: onPurchase can
	land during the respawn delay, when the state is live and the character is not, and the
	next equip resolves the width from scratch anyway.
]]
function Tool.refresh(player: Player, state: PlayerState)
	local character = player.Character
	if character == nil then
		return
	end

	local model = toolModelOf(character)
	if model == nil then
		return
	end

	local head = headOf(model)
	if head == nil then
		return
	end

	head.Size = Vector3.new(headWidthFor(state), HEAD_THICKNESS_STUDS, HEAD_DEPTH_STUDS)
end

return Tool
