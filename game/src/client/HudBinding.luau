--!strict
--[[
	HudBinding - resolve the HUD's named nodes once, and write live state into them.

	The HUD's STRUCTURE is not this module's business. ui-forge owns it
	(ui-forge/briefs/hud.brief.json -> game/src/shared/Screens/hud.luau) and
	UIBuilder.build turns that data into Instances; client-main hands the resulting Root
	frame here. This module authors nothing and creates no Instance except a Tween.

	`bind(root, gui)` walks each node path ONCE and closes over what it found, so a name
	the emitted screen no longer carries warns a single time at bind rather than on every
	snapshot. An unresolved node is skipped by the updater; the rest of the HUD keeps
	working.

	The updater is idempotent: it is a whole-snapshot write with no accumulation, so the
	join-time push and the RequestState pull can both land, in either order, harmlessly.

	THE READOUTS ARE THIS MODULE'S; THE FOUR BUTTONS ARE Pressables'. Nothing here draws a
	control, prices a purchase for a control, or repeats the affordability wording that
	sits on one. The upgrade readouts show a held level and the next cost, which is exactly
	what the emitted screen ships as their default text.

	NO NODE NAME IS SPELLED HERE THAT CONFIG CAN SUPPLY. The emitted screen names a readout
	`Readout_<LABEL UPPERCASED>` where the label is the config value the readout displays:
	Readout_SHARDS is GameConfig.Currency.plural, Readout_FINDS is GameConfig.FindNoun.plural,
	and Readout_VALUE / _REACH / _PACE are GameConfig.Upgrades[i].label. Deriving them means a
	renamed noun and a re-emitted screen move together. The previous revision spelled
	`Readout_RELICS` by hand and stopped resolving the moment the noun was renamed, which is
	the failure this derivation removes.

	THE LIVE AREA IS ON THE WIRE, NOT IN THE CONFIG. `areaPatchCount` and `areaLabel` are the
	two derived snapshot fields; this module reads no area table at all. GameConfig.Area
	describes area 1 only, and the ladder has eight rungs plus an unlimited post-terminal one,
	so a constant denominator would show the wrong name and the wrong percentage from the
	second area onward.
]]

local ReplicatedStorage = game:GetService("ReplicatedStorage")
local TweenService = game:GetService("TweenService")

local Shared = ReplicatedStorage:WaitForChild("UIForge")
local GameConfig = require(Shared.GameConfig)
local Protocol = require(Shared.Protocol)

local HudBinding = {}

--[[
	The snapshot, exactly the eight fields Protocol.snapshotShape() names.

	`areasFinished` is carried here so a rename in Protocol is a type error in this file, and
	is deliberately not read: the two derived fields beside it already describe the live area,
	which is the whole reason they are on the wire.
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
	blurb: string,
	costBase: number,
	costGrowth: number,
	maxLevel: number,
	perLevel: number,
	base: number,
	mode: string,
}

-- Anything the emitted screen may plausibly use for a text readout. Only `.Text` is ever
-- touched, and a node that is none of these is reported at bind time rather than assumed.
type TextNode = TextLabel | TextButton | TextBox

-- Applied to one withheld row: `true` restores every transparency the screen was emitted
-- with, `false` drives them all to 1. See `collectFade`.
type Fade = (shown: boolean) -> ()

--[[
	NODE PATHS, relative to the Root frame UIBuilder.build returned.

	Fixed by the emitted screen. The cluster names and the structural children below are the
	pattern's, not config's, so they are the only names spelled by hand.
]]
local CLUSTER_TOP_LEFT = "Cluster_topLeft"
local CLUSTER_TOP_RIGHT = "Cluster_topRight"
local CLUSTER_BOTTOM_LEFT = "Cluster_bottomLeft"
local CLUSTER_BOTTOM_RIGHT = "Cluster_bottomRight"
local READOUT_NAME_FORMAT = "Readout_%s"
local READOUT_VALUE_CHILD = "ReadoutValue"
local PROGRESS_GROUP = "ProgressGroup"
local BAR_LABEL = "BarLabel"
local BAR = "Bar"
local BAR_FILL = "BarFill"

--[[
	The eight fields the wire carries, mirroring the Snapshot type above, and the seven this
	module actually reads. Both are checked against Protocol.snapshotShape() at bind, in both
	directions, so a field that is renamed, dropped or added warns once here instead of
	blanking a readout silently.
]]
local SNAPSHOT_FIELDS: { string } = {
	"currency",
	"upgrades",
	"rowsRevealed",
	"found",
	"areasFinished",
	"clearedCount",
	"areaPatchCount",
	"areaLabel",
}
local FIELDS_READ: { string } = {
	"currency",
	"upgrades",
	"rowsRevealed",
	"found",
	"clearedCount",
	"areaPatchCount",
	"areaLabel",
}

--[[
	PLAYER-FACING TEXT. Every literal here is punctuation or a single word, and every one of
	them is taken from the text the emitted screen already ships in the node it is written
	into: "Lv 0  -  25" in a ReadoutValue, "0 / 24" in the collection readout, and
	"EAST TERRACE - 0% CLEAR" in the BarLabel. The separators are hyphens and not a middot or
	an em dash because GameConfig.Vocabulary.allowedPattern admits neither.

	ONE EXCEPTION, AND IT IS A REPORTED GAP RATHER THAN A CHOICE. allowedPattern is
	"^[A-Za-z0-9 ,.'%-/]+$", in which `%-` is an escaped hyphen and the per-cent sign is not a
	member of the class at all, so "% CLEAR" does not match it. Three other statements ask for
	exactly that character: firstSession.withheld[areaProgress].joinValue is "0%", the
	interface note for this module fixes the BarLabel as "<label> <percent>% CLEAR", and the
	emitted screen ships "EAST TERRACE - 0% CLEAR" in the node. A character class that omits
	one character is the likelier defect than three specifications that agree, so the readout
	keeps its per-cent sign and the pattern is named in the build report.
]]
local UPGRADE_LEVEL_PREFIX = "Lv "
local UPGRADE_SEPARATOR = "  -  "
local COLLECTION_SEPARATOR = " / "
local BAR_LABEL_SEPARATOR = " - "
local BAR_LABEL_SUFFIX = "% CLEAR"

-- [STOP: no value in the contract] What a maxed upgrade readout shows in place of a cost.
-- GameConfig.upgradeCost still returns a number at maxLevel, but printing it advertises a
-- purchase progression.tryBuy refuses. The word matches the one Pressables prints on the
-- button beside it, so the two surfaces do not use two vocabularies for one fact.
local MAX_LEVEL_TEXT = "Max"

-- The one unsequenced beat, named by GameConfig.Response.unsequencedBeats. Its readout
-- channel is what the progress bar is, so its acknowledgment budget is what bounds the
-- bar's travel. Not a tuned value of this module's: see `barTweenSeconds`.
local PATCH_CLEAR_BEAT_ID = "patchClear"

-- [STOP: no value in the contract] How the bar eases. The interface fixes that the fill is
-- "tweened rather than set" and names no curve. The duration is NOT invented here, see below.
local BAR_TWEEN_STYLE = Enum.EasingStyle.Quad
local BAR_TWEEN_DIRECTION = Enum.EasingDirection.Out

local WARN_PREFIX = "[HudBinding]"

--[[
	How long the bar takes to reach a new fraction.

	No key names a tween duration. Rather than choose a number, this reads the acknowledgment
	budget of the beat whose readout channel the bar IS: response.beats[patchClear] is
	rank 5, channels atPatch and readout, acknowledgmentBudgetMs 80. A bar that has finished
	moving by the budget cannot be the thing that misses it, and 0.08 s sits under
	GameConfig.ClearTickRate (0.12), so the bar is never still in flight when the next tick
	moves it again. Falls back to the tick rate itself if the beat table ever loses that row,
	so no literal duration exists in this file either way.
]]
local function barTweenSeconds(): number
	local response = GameConfig.Response
	local beats = if typeof(response) == "table" then response.beats else nil
	if typeof(beats) == "table" then
		for _, beat in ipairs(beats) do
			if beat.id == PATCH_CLEAR_BEAT_ID and typeof(beat.acknowledgmentBudgetMs) == "number" then
				return beat.acknowledgmentBudgetMs / 1000
			end
		end
	end
	warn(
		string.format(
			"%s GameConfig.Response.beats has no %q row with an acknowledgmentBudgetMs; the progress bar falls back to GameConfig.ClearTickRate",
			WARN_PREFIX,
			PATCH_CLEAR_BEAT_ID
		)
	)
	return GameConfig.ClearTickRate
end

--[[
	Walk a path of child names from `from`, warning on the first segment that is missing.

	FindFirstChild, not WaitForChild: bind runs after UIBuilder.build has already produced
	the tree, so a missing name is a screen that no longer matches this module and must be
	reported, not waited on forever.
]]
local function resolvePath(from: Instance, path: { string }): Instance?
	local node: Instance = from
	for _, segment in ipairs(path) do
		local child = node:FindFirstChild(segment)
		if child == nil then
			warn(
				string.format(
					"%s HUD node %q was not found under %s, so that readout will not update",
					WARN_PREFIX,
					segment,
					node:GetFullName()
				)
			)
			return nil
		end
		node = child
	end
	return node
end

-- Roblox has no common base class carrying Text, and a property write against a union of
-- class types is rejected outright, so the branch per class is load-bearing rather than
-- decorative: it is the only way to accept all three and still typecheck.
local function setText(node: TextNode, value: string)
	if node:IsA("TextLabel") then
		node.Text = value
	elseif node:IsA("TextButton") then
		node.Text = value
	elseif node:IsA("TextBox") then
		node.Text = value
	end
end

-- A resolved node that can carry text, or nil with one warning explaining which it was.
local function resolveTextNode(from: Instance, path: { string }): TextNode?
	local node = resolvePath(from, path)
	if node == nil then
		return nil
	end
	-- One class per branch rather than an `or` chain: refining a single IsA is the form
	-- every checker agrees on, and the emitted screen is free to use any of the three.
	if node:IsA("TextLabel") then
		return node
	elseif node:IsA("TextButton") then
		return node
	elseif node:IsA("TextBox") then
		return node
	end
	warn(
		string.format(
			"%s HUD node %s is a %s, which carries no Text, so that readout will not update",
			WARN_PREFIX,
			node:GetFullName(),
			node.ClassName
		)
	)
	return nil
end

-- The bar fill, which is resized rather than written to.
local function resolveGuiObject(from: Instance, path: { string }): GuiObject?
	local node = resolvePath(from, path)
	if node == nil then
		return nil
	end
	if node:IsA("GuiObject") then
		return node
	end
	warn(
		string.format(
			"%s HUD node %s is a %s, which has no Size, so the progress bar will not move",
			WARN_PREFIX,
			node:GetFullName(),
			node.ClassName
		)
	)
	return nil
end

--[[
	HOW A WITHHELD ROW IS WITHHELD, and why it is not `Visible = false`.

	firstSession.withheld.upgradeRow is presentAtJoin false and latched, so a row must be
	absent until the snapshot lifts it. firstSession.suppressionForbidden bans reflowOnLift in
	the same breath, and the emitted screen puts the three rows in a vertical UIListLayout,
	which SKIPS a non-Visible child: hiding one with Visible would slide the other two, and
	lifting Value later would push Reach and Pace down the screen. Both rules can only hold if
	the row keeps its slot and stops being drawn, so every transparency inside it is driven to
	1 and restored to exactly what ui-forge emitted when it lifts.

	Fully transparent is not a greyed or dimmed row: nothing of it is on screen, there is no
	placeholder, no padlock and no outline, and the lift is one frame with no tween, so it is
	not a lift animation either.
]]
local function collectFade(row: Instance): Fade
	local writers: { (boolean) -> () } = {}

	local function add(instance: Instance)
		if instance:IsA("GuiObject") then
			local object = instance
			local background = object.BackgroundTransparency
			table.insert(writers, function(shown: boolean)
				object.BackgroundTransparency = if shown then background else 1
			end)
		end
		if instance:IsA("TextLabel") then
			local label = instance
			local text = label.TextTransparency
			local stroke = label.TextStrokeTransparency
			table.insert(writers, function(shown: boolean)
				label.TextTransparency = if shown then text else 1
				label.TextStrokeTransparency = if shown then stroke else 1
			end)
		elseif instance:IsA("TextButton") then
			local button = instance
			local text = button.TextTransparency
			local stroke = button.TextStrokeTransparency
			table.insert(writers, function(shown: boolean)
				button.TextTransparency = if shown then text else 1
				button.TextStrokeTransparency = if shown then stroke else 1
			end)
		elseif instance:IsA("ImageLabel") then
			local image = instance
			local imageTransparency = image.ImageTransparency
			table.insert(writers, function(shown: boolean)
				image.ImageTransparency = if shown then imageTransparency else 1
			end)
		elseif instance:IsA("ImageButton") then
			local image = instance
			local imageTransparency = image.ImageTransparency
			table.insert(writers, function(shown: boolean)
				image.ImageTransparency = if shown then imageTransparency else 1
			end)
		elseif instance:IsA("UIStroke") then
			-- UIBuilder turns the screen's `textStroke` block into one of these, so a row hidden
			-- without it keeps a visible outline around invisible text.
			local uiStroke = instance
			local transparency = uiStroke.Transparency
			table.insert(writers, function(shown: boolean)
				uiStroke.Transparency = if shown then transparency else 1
			end)
		end
	end

	add(row)
	for _, descendant in ipairs(row:GetDescendants()) do
		add(descendant)
	end

	return function(shown: boolean)
		for _, write in ipairs(writers) do
			write(shown)
		end
	end
end

-- Whole Finds across every set in the collection, not just the live area's three.
local function totalFinds(): number
	local total = 0
	for _, set in ipairs(GameConfig.RelicSets) do
		total += #set.relics
	end
	return total
end

--[[
	The snapshot carries a map, not a count, and persistence.load fills every missing key with
	false, so the map is 24 entries wide for a player who has revealed nothing. Counting KEYS
	would put every unrevealed Find in the collection count, which suppressionForbidden bans
	by name; only a true counts.
]]
local function countFound(found: { [string]: boolean }): number
	local count = 0
	for _, isFound in pairs(found) do
		if isFound then
			count += 1
		end
	end
	return count
end

-- Balances are whole Shards (every award is max(payoutFloor, floor(...))), and %d refuses a
-- fractional number outright, so the floor is a guard rather than a rounding policy.
local function formatCount(value: number): string
	return string.format("%d", math.floor(value))
end

--[[
	The name of the node a config label is displayed in: Readout_ plus that label uppercased,
	which is the convention the emitted screen follows for all five readouts.
]]
local function readoutName(label: string): string
	return string.format(READOUT_NAME_FORMAT, string.upper(label))
end

--[[
	Check one player-facing string that came out of config against GameConfig.Vocabulary.

	Only strings this module does not control are checked: the area labels arrive on the wire
	and are the one piece of player-facing text here that no test in this repo can see by
	reading the source. The COMPOSED readout lines are deliberately not checked - every one of
	them is longer than maxLabelChars by construction, and the progress line carries the
	per-cent sign the pattern omits, so checking them would warn once per snapshot about two
	things a build report is the right place for. Both rules are the contract's, and neither is
	restated. WARNS and does not truncate: a silently shortened label is a label nobody notices
	is wrong.
]]
local function checkVocabulary(line: string, source: string)
	local vocabulary = GameConfig.Vocabulary
	local maxChars: number = vocabulary.maxLabelChars
	if #line > maxChars then
		warn(
			string.format(
				"%s %s %q is %d characters, over vocabulary.maxLabelChars (%d)",
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
				"%s %s %q does not match vocabulary.allowedPattern (%s)",
				WARN_PREFIX,
				source,
				line,
				pattern
			)
		)
	end
end

--[[
	Warn once, at bind, if the wire and this module have drifted apart, in both directions.

	A field this module READS that Protocol no longer declares is a readout that will show a
	blank or a stale value. A field Protocol declares that the Snapshot type above does not
	name is a field nobody on this side is typed against. Both were real: `areaComplete` was
	read here for one revision after the wire had replaced it with `areasFinished`.
]]
local function checkSnapshotShape()
	local declared: { [string]: boolean } = {}
	for _, field in ipairs(Protocol.snapshotShape()) do
		declared[field] = true
	end

	for _, field in ipairs(FIELDS_READ) do
		if declared[field] == nil then
			warn(
				string.format(
					"%s snapshot field %q is no longer declared by Protocol.snapshotShape(); the HUD reads it and will show a blank or stale value",
					WARN_PREFIX,
					field
				)
			)
		end
	end

	local mirrored: { [string]: boolean } = {}
	for _, field in ipairs(SNAPSHOT_FIELDS) do
		mirrored[field] = true
		if declared[field] == nil then
			warn(
				string.format(
					"%s this module's Snapshot type names %q, which Protocol.snapshotShape() no longer declares",
					WARN_PREFIX,
					field
				)
			)
		end
	end

	for _, field in ipairs(Protocol.snapshotShape()) do
		if mirrored[field] == nil then
			warn(
				string.format(
					"%s Protocol.snapshotShape() declares %q, which this module's Snapshot type does not name",
					WARN_PREFIX,
					field
				)
			)
		end
	end
end

--[[
	Resolve the HUD's named nodes and return the updater client-main feeds every snapshot.

	`root` is the Root frame UIBuilder.build returned. `gui` is the ScreenGui it sits in,
	accepted for screen-level state; nothing in the contract asks this module to set any, so
	nothing is written to it. The four pressables inside that same ScreenGui belong to
	Pressables and are never touched from here.

	Everything expensive happens here: paths are walked once, each row's transparencies are
	recorded once, and the updater is a closure over the results.
]]
function HudBinding.bind(root: GuiObject, gui: ScreenGui): Updater
	checkSnapshotShape()

	local currencyName: string = GameConfig.Currency.plural
	local findsName: string = GameConfig.FindNoun.plural

	local shardsValue = resolveTextNode(root, { CLUSTER_TOP_RIGHT, readoutName(currencyName), READOUT_VALUE_CHILD })
	local findsValue = resolveTextNode(root, { CLUSTER_TOP_LEFT, readoutName(findsName), READOUT_VALUE_CHILD })
	local barLabel = resolveTextNode(root, { CLUSTER_BOTTOM_LEFT, PROGRESS_GROUP, BAR_LABEL })
	local barFill = resolveGuiObject(root, { CLUSTER_BOTTOM_LEFT, PROGRESS_GROUP, BAR, BAR_FILL })

	--[[
		One entry per upgrade, in GameConfig.Upgrades declaration order, which is the order the
		emitted screen stacks them in and the order Pressables binds its three buttons in. The
		row FRAME is held as well as its value node, because withholding is a property of the
		whole row and not of the number in it.
	]]
	type UpgradeBinding = {
		def: UpgradeDef,
		value: TextNode,
		fade: Fade,
		shown: boolean,
	}
	local upgradeBindings: { UpgradeBinding } = {}
	local upgrades: { UpgradeDef } = GameConfig.Upgrades
	for _, def in ipairs(upgrades) do
		local row = resolvePath(root, { CLUSTER_BOTTOM_RIGHT, readoutName(def.label) })
		if row == nil then
			continue
		end
		local value = resolveTextNode(row, { READOUT_VALUE_CHILD })
		if value == nil then
			continue
		end
		local fade = collectFade(row)
		-- presentAtJoin is false, and the emitted screen ships the row drawn with placeholder
		-- text. Hidden HERE, at bind, so no row is on screen for the round trip before the
		-- first snapshot arrives, and none at all for a player whose snapshot never comes.
		fade(false)
		table.insert(upgradeBindings, { def = def, value = value, fade = fade, shown = false })
	end

	local findsTotal = totalFinds()
	local tweenInfo = TweenInfo.new(barTweenSeconds(), BAR_TWEEN_STYLE, BAR_TWEEN_DIRECTION)

	--[[
		JOIN VALUES, written before any snapshot: firstSession.withheld gives the currency
		readout joinValue "0" and the collection count joinValue "0" with no denominator, and
		the screen is emitted with "0 / 24" in that second node. The area progress joinValue is
		"0%", which is what the emitted BarLabel and the zero-width BarFill already read, and
		the live area's NAME is not knowable until a snapshot carries it, so that one readout
		keeps what ui-forge emitted until the first update.
	]]
	if shardsValue then
		setText(shardsValue, formatCount(0))
	end
	if findsValue then
		setText(findsValue, formatCount(0))
	end

	--[[
		LATCHES. Each one is set once and never cleared: suppressionForbidden bans
		reSuppression, so a readout that has lifted stays lifted for the rest of the session
		even if a later snapshot would not have lifted it.

		`denominatorShown` is latched on the collection count being non-zero rather than on the
		found map being non-empty, because persistence.load fills the map with 24 false keys and
		a non-empty test would therefore show the denominator to every player at join.
	]]
	local denominatorShown = false

	-- Held across snapshots so a repeated snapshot does not restart an animation that is
	-- already going to the same place, and so the previous tween is cancelled rather than
	-- left to fight the new one.
	local lastFraction: number? = nil
	local activeTween: Tween? = nil

	-- One warning each, not one per snapshot, for a wire value the bar cannot draw with.
	local warnedPatchCount = false
	local warnedAreaLabel = false
	-- Area labels already checked against the vocabulary, so eight areas cost eight checks.
	local checkedLabels: { [string]: boolean } = {}

	return function(snapshot: Snapshot?)
		if snapshot == nil then
			return
		end

		if shardsValue then
			setText(shardsValue, formatCount(snapshot.currency))
		end

		if findsValue then
			local count = countFound(snapshot.found)
			if count > 0 then
				denominatorShown = true
			end
			if denominatorShown then
				setText(findsValue, string.format("%d%s%d", count, COLLECTION_SEPARATOR, findsTotal))
			else
				setText(findsValue, formatCount(count))
			end
		end

		for _, binding in ipairs(upgradeBindings) do
			local def = binding.def
			local level = snapshot.upgrades[def.id] or 0
			local right: string
			if level >= def.maxLevel then
				right = MAX_LEVEL_TEXT
			else
				right = formatCount(GameConfig.upgradeCost(def, level))
			end
			-- Written whether or not the row is drawn, so it is already correct on the frame it
			-- lifts and the lift is one property change and nothing else.
			setText(binding.value, string.format("%s%d%s%s", UPGRADE_LEVEL_PREFIX, level, UPGRADE_SEPARATOR, right))

			if not binding.shown and snapshot.rowsRevealed[def.id] == true then
				binding.shown = true
				binding.fade(true)
			end
		end

		--[[
			THE LIVE AREA, off the wire. areaPatchCount is layout.areaSpec(areasFinished + 1)
			.patchCount, which is 140 in area 1, 407 in area 3 and 640 in every post-terminal
			area, so nothing here may hold a denominator of its own.
		]]
		local patchCount = snapshot.areaPatchCount
		local fraction = 0
		if typeof(patchCount) == "number" and patchCount > 0 then
			fraction = math.clamp(snapshot.clearedCount / patchCount, 0, 1)
		elseif not warnedPatchCount then
			warnedPatchCount = true
			warn(
				string.format(
					"%s snapshot.areaPatchCount is %s; the progress readout will sit at 0%% until the server sends a positive count",
					WARN_PREFIX,
					tostring(patchCount)
				)
			)
		end

		if barLabel then
			local label = snapshot.areaLabel
			if typeof(label) == "string" and label ~= "" then
				if not checkedLabels[label] then
					checkedLabels[label] = true
					checkVocabulary(label, "area label")
				end
				setText(
					barLabel,
					string.format(
						"%s%s%d%s",
						string.upper(label),
						BAR_LABEL_SEPARATOR,
						math.floor(fraction * 100),
						BAR_LABEL_SUFFIX
					)
				)
			elseif not warnedAreaLabel then
				warnedAreaLabel = true
				warn(
					string.format(
						"%s snapshot.areaLabel is %s; the progress readout keeps the name the screen was emitted with",
						WARN_PREFIX,
						tostring(label)
					)
				)
			end
		end

		if barFill and fraction ~= lastFraction then
			lastFraction = fraction
			local previous = activeTween
			if previous then
				previous:Cancel()
			end
			local tween = TweenService:Create(barFill, tweenInfo, { Size = UDim2.fromScale(fraction, 1) })
			activeTween = tween
			tween:Play()
		end
	end
end

return HudBinding
