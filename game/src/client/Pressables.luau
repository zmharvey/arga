--!strict
--[[
	Pressables — the four game-drawn controls, and the only UI structure this build authors.

	input.gameDrawnPressables is 4 and input.pressable.roles is three `purchase` plus one
	`index`, so this module creates exactly four TextButtons inside the HUD ScreenGui and
	nothing else. It exists only because ui-forge's hud-overlay pattern ships no pressable
	readout; the day it grows one, `bind` resolves four node names instead of creating four
	Instances and nothing else in this file changes.

	WHY THIS MODULE IS THE PURCHASE PATH. input.travelRequiredToPurchase is "none" and
	input.gameBoundInputClasses is ["pressable"], so a purchase is one press on a control
	that is always on screen. The shipped Enum.KeyCode.One/Two/Three binding is superseded:
	input.pressable.keyboardAcceleratorRequired is false, so a key may sit beside a button
	and may never be the only path to one.

	PARITY ACROSS DEVICE CLASSES IS ONE CODE PATH, NOT THREE BRANCHES. Every press arrives
	on `GuiButton.Activated`, which the engine fires for a touch tap, for a mouse click, and
	for the gamepad's primary button while the control is the selected GUI object. There is
	no `UserInputService.TouchEnabled` branch anywhere below, and no per-device handler: a
	phone, a desktop and a gamepad reach `activate()` through the same two lines. The only
	thing this module does per device class is measure the platform's own jump button so the
	touch target can be sized against it (see MIN_TOUCH_TARGET_PX).

	SILENCE ON A FAILED PRECONDITION IS LOAD-BEARING. input.verbs[buy].onPreconditionFail is
	silentNoOp and input.pressable.rejectionCueOnFailedPrecondition is "none". This module
	therefore has no shake, no sound, no colour flash and no toast, and it does NOT suppress
	the activation either: input.verbs[buy].adjudicatedBy is "server", so an unaffordable or
	maxed press is reported like any other, the server's progression.tryBuy returns false,
	and nothing is sent back. The player sees nothing happen, which is the specified result.

	This module reads no remote and fires none. It reports a press through `onActivate` and
	lets `input` decide what a press means, which is the seam that replaces Enum.KeyCode.One.
]]

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local UserInputService = game:GetService("UserInputService")

local Shared = ReplicatedStorage:WaitForChild("UIForge")
local GameConfig = require(Shared.GameConfig)
-- ui-forge's design tokens. NOT a declared dependency of this module (the brief lists only
-- `config`), taken anyway because the repo rule is that arbitrary appearance values enter
-- through tokens and never as literals in a module. Reported as an undeclared dependency.
local Theme = require(Shared.Theme)

local Pressables = {}

--[[
	The snapshot, exactly the fields Protocol.snapshotShape() names.

	`rowsRevealed` is the field a purchase button's Visible depends on, and it is the
	server's to own: it is a persisted field of PlayerState, written only by
	progression.revealRows, and firstSession.suppressionForbidden bans reSuppression, which
	only a durable latch can honour. This module reads it and derives nothing.

	Only `currency`, `upgrades` and `rowsRevealed` are read here; the rest are named so a
	rename in Protocol is a type error in this file rather than a blank button.
]]
export type Snapshot = {
	currency: number,
	upgrades: { [string]: number },
	rowsRevealed: { [string]: boolean },
	found: { [string]: boolean },
	areasFinished: number,
	clearedCount: number,
	areaPatchCount: number,
	areaLabel: string,
}

export type Updater = (Snapshot?) -> ()

--[[
	One entry of GameConfig.Upgrades. Restated as a type and not as values: the require is
	instance-based, so nothing downstream of it is typed, and every field below is read
	straight off the config table rather than held here.
]]
type UpgradeDef = {
	id: string,
	label: string,
	costBase: number,
	costGrowth: number,
	maxLevel: number,
	perLevel: number,
	base: number,
	mode: string,
}

-- role is "purchase" or "index", exactly the two entries of input.pressable.roles. For
-- "purchase", index is the 1-based position in GameConfig.Upgrades. For "index" it is 1.
export type OnActivate = (role: string, index: number) -> ()

local WARN_PREFIX = "[Pressables]"

-- The two role ids, from input.pressable.roles. Checked against GameConfig at bind so a
-- rename in the contract warns here rather than silently producing a role nobody handles.
local ROLE_PURCHASE = "purchase"
local ROLE_INDEX = "index"

-- Instance names, fixed by representation under `pressable`. BUY1 is Value, BUY2 is Reach
-- and BUY3 is Pace, because input.pressable.roles[purchase].boundTo is "upgrades
-- declaration order" and that is GameConfig.Upgrades' order.
local PURCHASE_NAME_FORMAT = "Pressable_BUY%d"
local INDEX_NAME = "Pressable_INDEX"

--[[
	UNSPECIFIED VALUES. Every literal in this block is a gap in the contract rather than a
	design decision, gathered here so that supplying the real ones is an edit to one block.
	Each is named in this module's build report.
]]

-- [STOP: no value in the contract] The floor for a touch target. minTouchTargetRule is
-- "notSmallerThanPlatformJumpButton", which names a measurement and not a number. The
-- number below is only ever used when the live jump button cannot be measured; when it can
-- be, `measurePlatformControls` overrides it with what the platform actually drew.
local MIN_TOUCH_TARGET_PX = 96

-- [STOP: no value in the contract] Button geometry. representation fixes the FORM ("a UDim2
-- in scale with a UISizeConstraint holding the floor in offset") and no figure.
local BUTTON_WIDTH_SCALE = 0.16
local BUTTON_HEIGHT_PX = 64

-- [STOP: no value in the contract] The words that carry affordability without colour.
-- input.pressable.affordabilityByColourAlone is false, so a second channel is required and
-- none is named. These mirror HudBinding's invented suffixes so the button and the readout
-- beside it do not use two different vocabularies for one fact.
local AFFORDABLE_SUFFIX = " Buy"
local UNAFFORDABLE_SUFFIX = " Need"

-- [STOP: no value in the contract] What a maxed row reads as. GameConfig.upgradeCost still
-- returns a number at maxLevel, but printing it advertises a purchase the server refuses.
local MAX_LEVEL_TEXT = "Max"

-- [STOP: no value in the contract] How often to look for the platform's touch controls, and
-- how long to wait before saying out loud that they have not appeared. The wait does NOT end
-- the search: on a touch device the controls arrive with the character, the character is
-- loaded last in wiring.onJoin behind two yielding calls, and a client that gave up would
-- ship MIN_TOUCH_TARGET_PX to a real phone on nothing worse than a slow DataStore.
local TOUCH_PROBE_INTERVAL_SECONDS = 0.5
local TOUCH_PROBE_WARN_AFTER_SECONDS = 10

--[[
	Horizontal keepout for the HUD's own corner clusters.

	0.46 is NOT invented: it is `maxSize = { 0.46, 0, 0, 0 }` on Cluster_topLeft and
	Cluster_bottomRight in the emitted screen (game/src/shared/Screens/hud.luau), i.e. the
	widest those clusters may ever be. Reserving it is what keeps a button from landing on
	top of the readout it is meant to sit beside, without this module knowing the cluster's
	realised width.
]]
local HUD_CLUSTER_MAX_WIDTH_SCALE = 0.46

--[[
	Read a token out of ui-forge's Theme, with the value the emitted theme carries today as
	the fallback so a retuned theme cannot leave a button unpositioned.
]]
local function spaceToken(name: string, fallback: number): number
	local space = (Theme :: any).space
	local value = if space then space[name] else nil
	return if typeof(value) == "number" then value else fallback
end

local function colorToken(group: string, name: string, fallback: string): Color3
	local palette = (Theme :: any).color
	local groupTable = if palette then palette[group] else nil
	local hex = if groupTable then groupTable[name] else nil
	return Color3.fromHex(if typeof(hex) == "string" then hex else fallback)
end

--[[
	Measure the platform's own controls.

	Returns the largest edge of the touch jump button and the height of the screen region it
	occupies, both in pixels, or nil when there are no touch controls to measure. This is the
	only place in the module that knows a device class exists, and it exists because
	minTouchTargetRule and mayOverlapPlatformControlRegions are both stated relative to a
	control this module does not own and cannot predict the size of.

	FindFirstChild and not WaitForChild: a desktop session has no TouchGui at all and waiting
	for one would never return. The recursive search is deliberate — the jump button's depth
	inside TouchGui is a core-script detail, and a rename there falls back to the constant
	above rather than erroring.
]]
local function measurePlatformControls(): (number?, number?)
	local player = Players.LocalPlayer
	if player == nil then
		return nil, nil
	end
	local playerGui = player:FindFirstChildOfClass("PlayerGui")
	if playerGui == nil then
		return nil, nil
	end
	local touchGui = playerGui:FindFirstChild("TouchGui")
	if touchGui == nil then
		return nil, nil
	end
	local jump = touchGui:FindFirstChild("JumpButton", true)
	if jump == nil or not jump:IsA("GuiObject") then
		return nil, nil
	end
	local size = jump.AbsoluteSize
	if size.X <= 0 or size.Y <= 0 then
		return nil, nil
	end
	-- The reserved band runs from the top of the jump button to the bottom of the screen, so
	-- anything placed above it clears the control however tall the platform drew it.
	local viewportHeight = touchGui:IsA("ScreenGui") and touchGui.AbsoluteSize.Y or 0
	local reserved = if viewportHeight > 0 then viewportHeight - jump.AbsolutePosition.Y else size.Y
	return math.max(size.X, size.Y), math.max(reserved, size.Y)
end

--[[
	The purchase button's two lines: the upgrade's label, then its next cost and the word
	that carries affordability without colour.

	The held level is the level the player HAS; GameConfig.upgradeCost takes that same
	convention, so the price shown is the price of the next purchase.
]]
local function purchaseText(def: UpgradeDef, level: number, currency: number): string
	if level >= def.maxLevel then
		return string.format("%s\n%s", def.label, MAX_LEVEL_TEXT)
	end
	local cost: number = GameConfig.upgradeCost(def, level)
	local suffix = if currency >= cost then AFFORDABLE_SUFFIX else UNAFFORDABLE_SUFFIX
	return string.format("%s\n%d%s", def.label, cost, suffix)
end

--[[
	Check one line this module can print against GameConfig.Vocabulary.

	Both rules are the contract's: `maxLabelChars` bounds the length, `allowedPattern` bounds
	the characters. Neither is restated here — the whole point of the key is that two modules
	cannot end up enforcing two different truncations.

	This WARNS and does not truncate. A silently shortened label is a label nobody notices is
	wrong; a warning names the string, the rule it broke and the module that produced it.
]]
local function checkLabel(line: string, source: string)
	local vocabulary = GameConfig.Vocabulary
	local maxChars: number = vocabulary.maxLabelChars
	if #line > maxChars then
		warn(
			string.format(
				"%s %s line %q is %d characters, over vocabulary.maxLabelChars (%d)",
				WARN_PREFIX,
				source,
				line,
				#line,
				maxChars
			)
		)
	end
	local pattern: string = vocabulary.allowedPattern
	if string.match(line, pattern) == nil then
		warn(
			string.format(
				"%s %s line %q does not match vocabulary.allowedPattern (%s)",
				WARN_PREFIX,
				source,
				line,
				pattern
			)
		)
	end
end

--[[
	Every line this module can ever print for one upgrade, checked once at bind rather than
	per snapshot: the cost is paid once and a violation is reported even if the player never
	reaches that price. The worst case is the last purchasable level, because that is the
	longest number GameConfig.upgradeCost can return for this ladder.
]]
local function checkLabelBudget(def: UpgradeDef)
	local worstCost: number = GameConfig.upgradeCost(def, math.max(def.maxLevel - 1, 0))
	local lines: { string } = {
		def.label,
		string.format("%d%s", worstCost, UNAFFORDABLE_SUFFIX),
		string.format("%d%s", worstCost, AFFORDABLE_SUFFIX),
		MAX_LEVEL_TEXT,
	}
	for _, line in ipairs(lines) do
		checkLabel(line, "pressable")
	end
end

--[[
	Check the four buttons this module is about to build against what the contract declares,
	and warn rather than diverge. input.closed is true, so a mismatch here means the contract
	moved and this module did not.
]]
local function checkContract(purchaseCount: number, indexCount: number)
	local input = GameConfig.Input
	local declared: number = input.gameDrawnPressables
	if purchaseCount + indexCount ~= declared then
		warn(
			string.format(
				"%s building %d pressables but input.gameDrawnPressables is %d",
				WARN_PREFIX,
				purchaseCount + indexCount,
				declared
			)
		)
	end
	local seen: { [string]: number } = {}
	local roles: { { role: string, count: number } } = input.pressable.roles
	for _, role in ipairs(roles) do
		seen[role.role] = role.count
	end
	if seen[ROLE_PURCHASE] ~= purchaseCount then
		warn(
			string.format(
				"%s input.pressable.roles declares %s count %s, and GameConfig.Upgrades has %d entries",
				WARN_PREFIX,
				ROLE_PURCHASE,
				tostring(seen[ROLE_PURCHASE]),
				purchaseCount
			)
		)
	end
	if seen[ROLE_INDEX] ~= indexCount then
		warn(
			string.format(
				"%s input.pressable.roles declares no %s role with count %d",
				WARN_PREFIX,
				ROLE_INDEX,
				indexCount
			)
		)
	end
end

--[[
	Create and maintain the four game-drawn pressables, and report an activation.

	`gui` is the HUD ScreenGui client-main created; the buttons are parented directly into
	it, per representation, and survive every respawn because it does. `onActivate` is
	called once per accepted press with the role and the 1-based index.

	Returns the updater the caller invokes with every snapshot. The updater is idempotent —
	it is a whole-snapshot write with no accumulation — so the join-time push and the
	RequestState pull can both land, in either order, harmlessly.
]]
function Pressables.bind(gui: ScreenGui, onActivate: OnActivate): Updater
	local upgrades: { UpgradeDef } = GameConfig.Upgrades
	checkContract(#upgrades, 1)

	local debounceSeconds: number = GameConfig.Input.pressable.debounceSeconds
	local gamepadSelectable: boolean = GameConfig.Input.pressable.gamepadSelectable

	local edgeMargin = spaceToken("xl", 24)
	local stackGap = spaceToken("md", 12)
	local surfaceColor = colorToken("surface", "raised", "#3A2668")
	local affordableColor = colorToken("accent", "primary", "#FFC53D")
	local unaffordableColor = colorToken("content", "secondary", "#C9B8F0")
	local indexColor = colorToken("content", "primary", "#FFFFFF")
	local typography = (Theme :: any).type
	local bodyType = if typography then typography.body else nil
	local fontName = if bodyType then bodyType.font else nil
	local font = (Enum.Font :: any)[fontName] or Enum.Font.Gotham
	local textSize = if bodyType and typeof(bodyType.size) == "number" then bodyType.size else 17

	--[[
		One button. Everything that is the same for all four lives here, so "a press is a
		press" is structural: there is exactly one Activated connection shape in this module
		and every device class arrives on it.
	]]
	local function makeButton(name: string, role: string, index: number): (TextButton, UISizeConstraint)
		local button = Instance.new("TextButton")
		button.Name = name
		button.AnchorPoint = Vector2.new(1, 1)
		button.BackgroundColor3 = surfaceColor
		button.BorderSizePixel = 0
		-- input.pressable.affordabilityByColourAlone is false and there is no rejection cue,
		-- so the engine's own press tint is turned off and the text carries the state.
		button.AutoButtonColor = false
		button.Active = true
		button.Selectable = gamepadSelectable
		button.SelectionGroup = gamepadSelectable
		button.Font = font
		button.TextSize = textSize
		button.TextColor3 = indexColor
		button.TextWrapped = false
		button.Text = ""
		-- Created after the HUD, and must not be drawn under it.
		button.ZIndex = 2

		local constraint = Instance.new("UISizeConstraint")
		constraint.MinSize = Vector2.new(MIN_TOUCH_TARGET_PX, MIN_TOUCH_TARGET_PX)
		constraint.Parent = button

		-- os.clock, not tick or DateTime: a monotonic clock cannot be moved by the system
		-- time changing mid-session and re-opening the button for a second activation.
		local lastAccepted = -math.huge
		--[[
			THE ONE CODE PATH. Activated fires for a touch tap, a mouse click and the
			gamepad's primary button on the selected object. holdRequired and chordRequired
			are both false, so the press is the whole gesture; activationsPerPress is 1, so
			a second press inside debounceSeconds is dropped, SILENTLY — dropping it with a
			cue would be a rejection cue, which is forbidden.
		]]
		button.Activated:Connect(function()
			local now = os.clock()
			if now - lastAccepted < debounceSeconds then
				return
			end
			lastAccepted = now
			onActivate(role, index)
		end)

		button.Parent = gui
		return button, constraint
	end

	type PurchaseBinding = {
		def: UpgradeDef,
		button: TextButton,
		constraint: UISizeConstraint,
	}

	local purchases: { PurchaseBinding } = {}
	for index, def in ipairs(upgrades) do
		checkLabelBudget(def)
		local button, constraint = makeButton(string.format(PURCHASE_NAME_FORMAT, index), ROLE_PURCHASE, index)
		-- firstSession.withheld.upgradeRow.presentAtJoin is false: every row starts withheld
		-- and only the snapshot lifts it.
		button.Visible = false
		button.Text = purchaseText(def, 0, 0)
		table.insert(purchases, { def = def, button = button, constraint = constraint })
	end

	local indexButton, indexConstraint = makeButton(INDEX_NAME, ROLE_INDEX, 1)
	indexButton.AnchorPoint = Vector2.new(0, 0)
	-- "the collection class plural for the index button" — the noun is config's, and it has
	-- been renamed once already by a ban list, so it is never spelled here.
	local indexText: string = GameConfig.FindNoun.plural
	checkLabel(indexText, "index pressable")
	indexButton.Text = indexText
	-- input.verbs[openIndex].precondition is "none", and representation's Visible rule names
	-- only the purchase buttons, so the index control is present from join.
	indexButton.Visible = true

	--[[
		Place the four. Called once at bind and again if the platform's touch controls turn
		up afterwards, which is why it takes its two measurements as arguments rather than
		reading them.

		`reservedBottomPx` is the band the platform's jump button occupies. Everything is
		positioned above it, so mayOverlapPlatformControlRegions false holds by construction
		instead of by a margin somebody guessed.

		POSITIONS ARE FIXED PER INDEX. firstSession.suppressionForbidden bans reflowOnLift,
		so lifting one row must not move the other three: a hidden button keeps its slot and
		only Visible changes.
	]]
	local function layoutButtons(minTouchPx: number, reservedBottomPx: number)
		local height = math.max(BUTTON_HEIGHT_PX, minTouchPx)
		local step = height + stackGap
		local count = #purchases

		for index, binding in ipairs(purchases) do
			binding.constraint.MinSize = Vector2.new(minTouchPx, minTouchPx)
			binding.button.Size = UDim2.new(BUTTON_WIDTH_SCALE, 0, 0, height)
			-- Stacked upward from the bottom in declaration order, so Value sits above Reach
			-- sits above Pace and the column reads in the same order as the upgrade readouts
			-- in the bottom-right cluster. Held clear of that cluster's widest possible
			-- extent on X, and clear of the platform control band on Y.
			binding.button.Position = UDim2.new(
				1 - HUD_CLUSTER_MAX_WIDTH_SCALE,
				-edgeMargin,
				1,
				-(reservedBottomPx + edgeMargin + (count - index) * step)
			)
		end

		indexConstraint.MinSize = Vector2.new(minTouchPx, minTouchPx)
		indexButton.Size = UDim2.new(BUTTON_WIDTH_SCALE, 0, 0, height)
		-- Top-left, beside the collection readout: past that cluster's widest possible
		-- extent, which is the only bound on it this module can know.
		indexButton.Position = UDim2.new(HUD_CLUSTER_MAX_WIDTH_SCALE, edgeMargin, 0, edgeMargin)
	end

	layoutButtons(MIN_TOUCH_TARGET_PX, 0)

	local measuredTouch, measuredReserved = measurePlatformControls()
	if measuredTouch and measuredReserved then
		layoutButtons(math.max(measuredTouch, MIN_TOUCH_TARGET_PX), measuredReserved)
	elseif UserInputService.TouchEnabled then
		--[[
			A touch session whose controls have not been drawn yet — which is the ORDINARY
			case, not the exceptional one. This module binds during wiring.onClientBoot, and
			the platform draws its controls with the character, which wiring.onJoin loads last
			behind persistence.load and entitlements.refresh. So the first measurement almost
			always misses and this loop is what actually sizes the buttons on a phone.

			It keeps looking rather than expiring, and warns once on the way past
			TOUCH_PROBE_WARN_AFTER_SECONDS. A deadline here would mean a slow DataStore
			shipped a differently sized button to a real player, silently, on the one device
			class this module exists for. It ends when the controls are found or when the
			buttons are gone.
		]]
		task.spawn(function()
			local warnAt = os.clock() + TOUCH_PROBE_WARN_AFTER_SECONDS
			local warned = false
			while indexButton.Parent ~= nil do
				task.wait(TOUCH_PROBE_INTERVAL_SECONDS)
				local touchPx, reservedPx = measurePlatformControls()
				if touchPx and reservedPx then
					layoutButtons(math.max(touchPx, MIN_TOUCH_TARGET_PX), reservedPx)
					return
				end
				if not warned and os.clock() >= warnAt then
					warned = true
					warn(
						string.format(
							"%s touch controls have not appeared after %d s — pressables are still sized against the %d px fallback, not the platform jump button",
							WARN_PREFIX,
							TOUCH_PROBE_WARN_AFTER_SECONDS,
							MIN_TOUCH_TARGET_PX
						)
					)
				end
			end
		end)
	end

	--[[
		Row visibility comes off the snapshot and is derived from nothing.

		firstSession.withheld.upgradeRow is presentAtJoin false, liftedBy "balance has reached
		upgrades[i] level-1 cost", latched, with latchSource "one persisted boolean per row".
		The latch has to outlive the session or a returning player under that cost sees the
		row hidden again — the reSuppression suppressionForbidden bans — so the server owns
		it, progression.revealRows writes it, and this module only reads it.
	]]
	return function(snapshot: Snapshot?)
		if snapshot == nil then
			return
		end
		for _, binding in ipairs(purchases) do
			local def = binding.def
			local level = snapshot.upgrades[def.id] or 0
			binding.button.Visible = snapshot.rowsRevealed[def.id] == true
			binding.button.Text = purchaseText(def, level, snapshot.currency)
			-- Colour is the SECOND affordability channel; the word in the text above is the
			-- first, because affordabilityByColourAlone is false.
			local affordable = level < def.maxLevel and snapshot.currency >= GameConfig.upgradeCost(def, level)
			binding.button.TextColor3 = if affordable then affordableColor else unaffordableColor
		end
	end
end

return Pressables
