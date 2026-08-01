--!strict
--[[
	IndexScreen — the collection surface, and the latch that decides whether it exists.

	WHAT IT DRAWS. Four labelled groups, one per GameConfig.RelicSets entry, each holding one
	slot per name in that set's declared order — 24 slots today. A held name reads as its own
	name. AN UNFOUND NAME READS AS AN EMPTY SLOT AND NOTHING ELSE: no padlock, no greyed or
	dimmed slot, no question mark, no unknown denominator (firstSession.suppressionForbidden),
	and no rarity colour, frame, glow, border, sparkle or badge (rarity.forbidden). Every slot
	is the same shape, the same colour and in the same place whether it is filled or not; the
	only thing that ever changes on this surface is one label's text. That is also why nothing
	reflows when a Find lands: the 24 positions are derived from the set index and the slot
	ordinal at bind time and are never recomputed.

	THE SET HEADING IS THE ONLY PLACE A SET IS LEGIBLE — rarity.ladders[find-set] has
	legibilityChannel "the set heading on the collection surface, and nothing on the object"
	and perObjectVisualGrade false. So the four headings are drawn identically to each other:
	one shared type ramp and one shared colour. A per-set colour here would be a rarity colour,
	which rarity.forbidden bans.

	NOTHING ELSE IS SHOWN ABOUT A FIND. No count, no duplicate count, no timestamp, no
	condition, no isNew, no sort index — discovery.record.forbiddenFields, all sixteen. There is
	no count and no denominator ON THIS SURFACE AT ALL: the collection readout and its "/ 24"
	belong to the HUD, which hud-binding writes, and adding a second one here would be a readout
	nobody specified and a second place the denominator rule has to be got right.

	THE LATCH THIS MODULE OWNS, AND WHY IT IS HERE. input.verbs[openIndex].precondition is
	"none", so `input` calls toggle() on every press from the first second of a new save, and
	pressables draws the index button from join. firstSession.withheld.collectionPanel is
	presentAtJoin false, liftedBy beat:firstReveal, latched, newSaveFields 0. Neither of those
	two modules was told to reconcile them, so this one does:

	    before the first Find   toggle() does NOTHING. No panel, no cue, no sound, no movement
	                            suspension. input.pressable.rejectionCueOnFailedPrecondition is
	                            "none" and suppressionForbidden bans an explanatory tooltip, so
	                            a press on a surface that has not been earned is silent.
	    from the first Find on  toggle() opens and closes it. The lift is ONE-WAY: `available`
	                            is set true and never set false, because suppressionForbidden
	                            bans reSuppression. Nothing is stored for it (newSaveFields 0);
	                            it is derived from the snapshot's found map on every update.
	    the lift itself         is invisible. There is no animation and no sound when the
	                            surface becomes available (suppressionForbidden bans both), and
	                            nothing appears on screen — what changes is that a button the
	                            player already has starts doing something.

	"THE COLLECTION MAP IS NON-EMPTY" IS READ AS "AT LEAST ONE ENTRY IS TRUE", NOT AS "THE
	TABLE HAS KEYS", and that is load-bearing rather than pedantic. wiring.onJoin step 1 has
	persistence.load "fill missing rowsRevealed and found keys with false", so a brand-new
	save's found map arrives on the wire with all 24 keys present and all 24 false. Taken
	literally, `next(found) ~= nil` lifts the panel at join for every new player and deletes the
	withholding this module exists to enforce. Reported.

	MOVEMENT. input.pressable.indexScreenSuspendsMovement is true, so opening suspends movement
	and closing restores it. It is done through the player's own control module and NOT by
	writing a Humanoid property: response.humanoidWritesAllowed is exactly ["WalkSpeed"] and
	wiring.onSpawn step 6 says that write is server-main's and is the only Humanoid write in the
	game. Nothing here touches the camera, so looking around still works while the surface is
	open. The suspension is caused by the player's own press and ends on their next press, which
	is why it does not contradict response.controlEverAffected being false.

	IT SHOWS NO OTHER PLAYER ANYTHING (social.forbidden X6 and X7) and NAMES NO PRODUCT
	(products.F19). It reads one field of the snapshot and fires no remote: the openIndex verb
	is adjudicatedBy "client", which is why `input` calls toggle() directly.

	Does no work at require time. bind() builds; toggle() and the updater do the rest.
]]

local ContextActionService = game:GetService("ContextActionService")
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local Shared = ReplicatedStorage:WaitForChild("UIForge")
local GameConfig = require(Shared.GameConfig)
local Protocol = require(Shared.Protocol)
-- Theme and UIBuilder are UNDECLARED DEPENDENCIES of this module — the build order lists only
-- config and protocol — and they are required anyway rather than hand-picking colours and
-- fonts here. "Arbitrary values enter through tokens, never as literals" is the repo's rule,
-- and the alternative to a token reference is an invented hex string. Reported.
local Theme = require(Shared.Theme)
local UIBuilder = require(Shared.UIBuilder)

local IndexScreen = {}

--[[
	The updater client-main fans StateChanged out to. Typed loosely for the same reason
	Input.Updater is: the instance requires above resolve to `any`, so no shared snapshot type
	can be named from here. Only one field of it is ever read.
]]
export type Updater = (snapshot: any) -> ()

--[[
	The two config shapes this module reads, named so that a rename in GameConfig is a type
	error here rather than a heading that draws as nil. Same reason Input names UpgradeDef.
]]
type SetDef = {
	id: string,
	label: string,
	relics: { string },
}

type Vocabulary = {
	maxLabelChars: number,
	allowedPattern: string,
	bannedWords: { { word: string, reason: string } },
}

local WARN_PREFIX = "[IndexScreen]"

-- representation[index-surface].properties.Name. The one name anything outside this file could
-- use to find the frame, so it is spelled once.
local SURFACE_NAME = "IndexSurface"

-- The one snapshot field this module reads. Checked against Protocol.snapshotShape() at bind
-- rather than trusted, so a field rename is a warning at boot and not an index that is always
-- nil and a surface that never lifts.
local SNAPSHOT_FIELD = "found"

-- The ContextActionService action used only if the player's control module cannot be reached.
local SUSPEND_ACTION = "IndexScreenSuspendMovement"

--[[
	Geometry. NONE OF THIS IS SPECIFIED ANYWHERE: ui-forge owns the modal-grid pattern that
	would emit this surface, no module in the build order owns its brief, and the
	`representation` row that hands the frame to this module names only its class, its name, its
	parent and its contents. Everything below is either a Theme token or a scalar this file
	chose, and every chosen scalar is listed in the build report.
]]
local PANEL_WIDTH_SCALE = 0.9
local PANEL_HEIGHT_SCALE = 0.72

-- Above the HUD readouts and the four pressables, which are left at the default ZIndex of 1.
-- Applied to EVERY node in the spec rather than only the root, so the surface stays on top
-- under either ScreenGui.ZIndexBehavior.
local SURFACE_Z_INDEX = 10

--[[ ------------------------------------------------------------------- state ]]

-- The built frame, or nil until bind() succeeds. One client, one LocalPlayer, one surface.
local surface: Frame? = nil

-- findName -> the TextLabel inside its slot. Resolved once, at bind.
local slotLabels: { [string]: TextLabel } = {}

-- findName -> whether this surface has already written that name into its slot. ONCE WRITTEN,
-- NEVER UNWRITTEN: discovery.record's found field is clearedBy "nothing, ever", and blanking a
-- slot because one snapshot arrived without it would be exactly the re-suppression
-- firstSession.suppressionForbidden bans.
local shownNames: { [string]: boolean } = {}

-- The latch. Goes true on the first snapshot holding a true entry and is never set false.
local available = false

local isOpen = false
local bindCount = 0

local warned: { [string]: boolean } = {}

local function warnOnce(key: string, message: string)
	if warned[key] then
		return
	end
	warned[key] = true
	warn(string.format("%s %s", WARN_PREFIX, message))
end

--[[ -------------------------------------------------------------- vocabulary ]]

--[[
	Every string this surface shows comes out of GameConfig — the four set labels and the 24
	names — so the vocabulary key is checked rather than obeyed by hand. A violation WARNS and
	the string is still shown: hiding a Find because its name is one character too long would
	cost the player a slot to fix a content defect, and the warning names the offender loudly
	enough to be fixed in the sheet that owns it.
]]
local function checkPlayerFacing(value: string, where: string)
	local vocab: Vocabulary = GameConfig.Vocabulary

	if vocab.maxLabelChars ~= nil and #value > vocab.maxLabelChars then
		warnOnce(
			"vocab-length-" .. where,
			string.format("%s is %d characters, over the %d-character label limit", where, #value, vocab.maxLabelChars)
		)
	end

	if vocab.allowedPattern ~= nil and string.match(value, vocab.allowedPattern) == nil then
		warnOnce(
			"vocab-pattern-" .. where,
			string.format("%s is outside vocabulary.allowedPattern", where)
		)
	end

	local lowered = string.lower(value)
	for _, banned in ipairs(vocab.bannedWords) do
		-- Whole word only, with the frontier pattern, so a ban on a short noun cannot fire on a
		-- longer word that merely contains it.
		if string.find(lowered, "%f[%a]" .. string.lower(banned.word) .. "%f[%A]") ~= nil then
			warnOnce(
				"vocab-banned-" .. where,
				string.format("%s uses a banned word from vocabulary.bannedWords", where)
			)
		end
	end
end

--[[ ---------------------------------------------------------------- movement ]]

--[[
	The player's own control module, resolved once and cached.

	This is how movement is suspended without writing a Humanoid property. Guarded at every
	step: the surface failing to freeze the player is a smaller loss than a client module that
	errors on a press, and the caller (input) has already made the same trade for this module's
	existence.
]]
local controls: any = nil
local controlsResolved = false

local function resolveControls(): any
	if controlsResolved then
		return controls
	end
	controlsResolved = true

	local localPlayer = Players.LocalPlayer
	if localPlayer == nil then
		return nil
	end

	local playerScripts = localPlayer:FindFirstChild("PlayerScripts")
	local playerModule = if playerScripts ~= nil then playerScripts:FindFirstChild("PlayerModule") else nil
	if playerModule == nil or not playerModule:IsA("ModuleScript") then
		warnOnce("controls", "PlayerScripts.PlayerModule is not there; falling back to sinking movement input")
		return nil
	end

	local ok, result = pcall(require, playerModule)
	if not ok or typeof(result) ~= "table" then
		warnOnce("controls", "requiring PlayerModule failed; falling back to sinking movement input")
		return nil
	end

	local gotControls, resolved = pcall(function()
		return (result :: any):GetControls()
	end)
	if not gotControls or resolved == nil then
		warnOnce("controls", "PlayerModule:GetControls() failed; falling back to sinking movement input")
		return nil
	end

	controls = resolved
	return controls
end

local function sinkInput(): Enum.ContextActionResult
	return Enum.ContextActionResult.Sink
end

--[[
	Suspend or restore movement.

	The control module is the primary path because it is the one that owns the touch thumbstick
	as well as the keyboard and gamepad, and the audience is mobile-heavy. The
	ContextActionService fallback sinks the movement and jump actions instead, which covers
	keyboard and gamepad but not a touch thumbstick the control module is not there to draw.

	The camera is untouched on both paths: "suspends movement" is what the key says, and a view
	that stops responding while a panel is open reads as a freeze rather than a mode.
]]
local function setMovementSuspended(suspended: boolean)
	local resolved = resolveControls()
	if resolved ~= nil then
		local ok = pcall(function()
			if suspended then
				resolved:Disable()
			else
				resolved:Enable()
			end
		end)
		if ok then
			return
		end
		warnOnce("controls-call", "the control module refused Disable/Enable; falling back to sinking movement input")
	end

	if suspended then
		ContextActionService:BindAction(
			SUSPEND_ACTION,
			sinkInput,
			false,
			table.unpack(Enum.PlayerActions:GetEnumItems())
		)
	else
		ContextActionService:UnbindAction(SUSPEND_ACTION)
	end
end

--[[ ------------------------------------------------------------------- build ]]

local function slotNodeName(setId: string, ordinal: number): string
	return string.format("Slot_%s_%d", setId, ordinal)
end

--[[
	The ui-forge spec for the surface, generated from GameConfig.RelicSets and Theme tokens.

	It is a spec table rather than imperative construction so that the day a modal-grid brief
	exists, replacing this function with an emitted screen changes nothing else in the file.

	EVERY POSITION IS DERIVED FROM AN INDEX, so nothing here reflows when a name lands: group g
	of n occupies the g-th horizontal band, slot i of m occupies the i-th column of its band, and
	both are fixed at bind time for the life of the session.

	Nothing sets a per-set or per-slot colour, and there is no node for a state a slot could be
	in other than "holds a name" and "does not".
]]
local function buildSpec(): any
	local sets: { SetDef } = GameConfig.RelicSets
	local setCount = #sets

	-- Derived from the type ramp rather than chosen, so a theme with a larger label size gets a
	-- heading band that still fits its own text.
	local headingHeight = Theme.type.label.size + Theme.space.xs * 2
	local groupGap = Theme.space.md
	local slotGap = Theme.space.xs

	local groups = {}

	for g, set in ipairs(sets) do
		local names = set.relics
		local slotCount = #names

		checkPlayerFacing(set.label, string.format("set label %q", set.id))

		local slots = {}
		for i, findName in ipairs(names) do
			checkPlayerFacing(findName, string.format("%s slot %d", set.id, i))

			slots[i] = {
				name = slotNodeName(set.id, i),
				class = "Frame",
				bg = "surface.sunken",
				corner = "radius.sm",
				zIndex = SURFACE_Z_INDEX,
				pos = { (i - 1) / slotCount, slotGap / 2, 0, 0 },
				size = { 1 / slotCount, -slotGap, 1, 0 },
				children = {
					{
						-- The one mutable thing on the whole surface.
						name = "Name",
						class = "TextLabel",
						zIndex = SURFACE_Z_INDEX,
						size = { 1, 0, 1, 0 },
						text = "",
						type = "caption",
						color = "content.primary",
						align = "center",
					},
				},
			}
		end

		groups[g] = {
			name = "Group_" .. set.id,
			class = "Frame",
			zIndex = SURFACE_Z_INDEX,
			pos = { 0, 0, (g - 1) / setCount, 0 },
			size = { 1, 0, 1 / setCount, -groupGap },
			children = {
				{
					-- The only place a set is legible anywhere in the game. Identical styling for
					-- all four: the heading carries the set, nothing else does.
					name = "Heading_" .. set.id,
					class = "TextLabel",
					zIndex = SURFACE_Z_INDEX,
					pos = { 0, 0, 0, 0 },
					size = { 1, 0, 0, headingHeight },
					text = set.label,
					type = "label",
					color = "content.secondary",
					align = "start",
				},
				{
					name = "Row",
					class = "Frame",
					zIndex = SURFACE_Z_INDEX,
					pos = { 0, 0, 0, headingHeight },
					size = { 1, 0, 1, -headingHeight },
					children = slots,
				},
			},
		}
	end

	return {
		root = {
			name = SURFACE_NAME,
			class = "Frame",
			bg = "surface.base",
			corner = "radius.lg",
			padding = "space.lg",
			zIndex = SURFACE_Z_INDEX,
			anchor = { 0.5, 0.5 },
			pos = { 0.5, 0, 0.5, 0 },
			size = { PANEL_WIDTH_SCALE, 0, PANEL_HEIGHT_SCALE, 0 },
			-- Width only. UIBuilder reads a 0 as "no maximum", so the height stays a fraction of
			-- whatever screen it is on while the width stops at the theme's panel maximum.
			maxSize = { 0, Theme.sizing.panelMaxWidth, 0, 0 },
			children = groups,
		},
	}
end

--[[
	Resolve one TextLabel per name, once. A slot that does not resolve warns and is simply never
	written; it cannot break the other 23.
]]
local function resolveSlots(root: any)
	local sets: { SetDef } = GameConfig.RelicSets
	for _, set in ipairs(sets) do
		for i, findName in ipairs(set.relics) do
			local nodeName = slotNodeName(set.id, i)
			local slot = root:FindFirstChild(nodeName, true)
			local label: any = nil
			if slot ~= nil then
				label = slot:FindFirstChild("Name")
			end
			if label ~= nil and label:IsA("TextLabel") then
				slotLabels[findName] = label
			else
				warnOnce(
					"slot-" .. nodeName,
					string.format("slot node %q did not resolve to a TextLabel; that slot will stay empty", nodeName)
				)
			end
		end
	end
end

--[[ ------------------------------------------------------------ open / close ]]

local function setOpen(open: boolean)
	if open == isOpen then
		return
	end
	isOpen = open

	local frame = surface
	if frame ~= nil then
		frame.Visible = open
	end

	setMovementSuspended(open)
end

--[[
	A respawn hands the player a fresh set of controls, and the control module enables them
	itself. If the surface is open across that — a player can open it and then use the Roblox
	menu's Reset Character, which wiring.onDeath says is the only route to a death in this game
	— the suspension has to be re-applied or the panel is open over a player who can walk. The
	defer is because the control module's own CharacterAdded work has to land first.
]]
local function watchRespawns()
	local localPlayer = Players.LocalPlayer
	if localPlayer == nil then
		return
	end
	localPlayer.CharacterAdded:Connect(function()
		if not isOpen then
			return
		end
		task.defer(function()
			if isOpen then
				setMovementSuspended(true)
			end
		end)
	end)
end

--[[ -------------------------------------------------------------- the module ]]

--[[
	Every snapshot. Idempotent, and cheap on the ones that changed nothing: a slot is written
	once, the first time its name arrives held.

	This is also where the panel becomes available, and it is derived rather than stored —
	firstSession.withheld.collectionPanel has newSaveFields 0.
]]
local function update(snapshot: any)
	if snapshot == nil then
		return
	end

	local found = snapshot[SNAPSHOT_FIELD]
	if typeof(found) ~= "table" then
		return
	end

	local heldAny = false

	-- Iterated over the CONFIG rather than over the map, so a key the server sends that is not a
	-- name in this build lifts nothing and draws nothing.
	local sets: { SetDef } = GameConfig.RelicSets
	for _, set in ipairs(sets) do
		for _, findName in ipairs(set.relics) do
			if found[findName] == true then
				heldAny = true
				if not shownNames[findName] then
					shownNames[findName] = true
					local label = slotLabels[findName]
					if label ~= nil then
						label.Text = findName
					end
				end
			end
		end
	end

	if heldAny then
		-- One way. Never assigned false anywhere in this file.
		available = true
	end
end

--[[
	Create the collection surface hidden and return an updater.

	Called once, by client-main, in wiring.onClientBoot step 5 — which is AFTER step 4 connects
	`input`, so a press can arrive before this function has ever run. toggle() handles that by
	doing nothing, which is the same thing it does before the first Find.
]]
function IndexScreen.bind(gui: ScreenGui): Updater
	bindCount += 1
	if bindCount > 1 then
		-- Warned and NOT obeyed. A second surface would be a second set of 24 slots stacked on
		-- the first, and the caller bug is louder as a warning than as a duplicate panel.
		warnOnce(
			"rebind",
			string.format("bind() called %d times; the first surface is kept and this call built nothing", bindCount)
		)
		return update
	end

	-- The one field read off the snapshot, checked against the shape both sides agree on.
	local shape: { string } = Protocol.snapshotShape()
	local carriesFound = false
	for _, field in ipairs(shape) do
		if field == SNAPSHOT_FIELD then
			carriesFound = true
			break
		end
	end
	if not carriesFound then
		warnOnce(
			"snapshot",
			string.format("Protocol.snapshotShape() does not carry %q; no Find will ever appear", SNAPSHOT_FIELD)
		)
	end

	if gui == nil then
		warnOnce("gui", "bind() was called with no ScreenGui; the collection surface was not built")
		return update
	end

	--[[
		pcall'd deliberately. UIBuilder has thrown before on a property an Instance could not
		hold, and that throw killed the client entry point and took the HUD and the purchase path
		with it. This module is the last of the four to bind and the least costly to lose: if the
		build fails, the surface does not exist, toggle() does nothing, and everything else on
		the client still runs.
	]]
	local ok, built = pcall(function()
		return UIBuilder.build(buildSpec(), Theme, gui)
	end)
	if not ok or built == nil then
		warnOnce("build", string.format("building the collection surface failed: %s", tostring(built)))
		return update
	end

	local frame = built :: any
	-- Set in the same resumption as the build, so no frame is ever drawn with it visible.
	frame.Visible = false
	-- Absorbs presses inside its own bounds, so a purchase button behind the open surface cannot
	-- be hit through it. It covers neither the top-left nor the bottom-right cluster, so the
	-- index button that closes it and the three purchase buttons stay reachable around it.
	frame.Active = true

	surface = frame
	resolveSlots(frame)
	watchRespawns()

	return update
end

--[[
	The index pressable was activated. input calls this and nothing else does.

	Three outcomes, and the first is the point of the module:

	  no surface yet     nothing. bind() has not run or its build failed.
	  nothing found yet  nothing. Silent, per input.pressable.rejectionCueOnFailedPrecondition
	                     "none"; an explanatory tooltip is banned outright.
	  otherwise          open if closed, close if open, and suspend or restore movement with it.

	No debounce here: pressables already applies input.pressable.debounceSeconds with
	activationsPerPress 1, and a second debounce in series would drop a press the contract
	accepts.
]]
function IndexScreen.toggle()
	if surface == nil then
		warnOnce("toggle-before-bind", "toggle() was called before the collection surface existed")
		return
	end

	if not available then
		return
	end

	setOpen(not isOpen)
end

return IndexScreen
