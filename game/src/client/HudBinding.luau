--!strict
--[[
	HudBinding — resolve the HUD's named nodes once, and write live state into them.

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

	Every displayed value comes from GameConfig, including the node names of the upgrade
	readouts, which are derived from the upgrade labels rather than spelled out here.
]]

local ReplicatedStorage = game:GetService("ReplicatedStorage")
local TweenService = game:GetService("TweenService")

local Shared = ReplicatedStorage:WaitForChild("UIForge")
local GameConfig = require(Shared.GameConfig)
local Protocol = require(Shared.Protocol)

local HudBinding = {}

-- The snapshot, exactly the fields Protocol.snapshotShape() names. bind() checks that list
-- against the field names read below, so a rename in Protocol warns here instead of
-- silently blanking a readout.
export type Snapshot = {
	currency: number,
	upgrades: { [string]: number },
	clearedCount: number,
	found: { [string]: boolean },
	areaComplete: boolean,
}

export type Updater = (Snapshot?) -> ()

-- Anything the emitted screen may plausibly use for a text readout. Only `.Text` is ever
-- touched, and a node that is none of these is reported at bind time rather than assumed.
type TextNode = TextLabel | TextButton | TextBox

--[[
	NODE PATHS, relative to the Root frame UIBuilder.build returned.

	Fixed by the emitted screen, not chosen here. Note that the finds readout is called
	Readout_RELICS even though the player-facing noun is GameConfig.FindNoun ("Find"), so
	it cannot be derived from config the way the upgrade readouts can.
]]
local SHARDS_VALUE_PATH: { string } = { "Cluster_topRight", "Readout_SHARDS", "ReadoutValue" }
local FINDS_VALUE_PATH: { string } = { "Cluster_topLeft", "Readout_RELICS", "ReadoutValue" }
local UPGRADE_CLUSTER = "Cluster_bottomRight"
local UPGRADE_VALUE_CHILD = "ReadoutValue"
local BAR_LABEL_PATH: { string } = { "Cluster_bottomLeft", "ProgressGroup", "BarLabel" }
local BAR_FILL_PATH: { string } = { "Cluster_bottomLeft", "ProgressGroup", "Bar", "BarFill" }

-- The snapshot fields this module reads. Checked against Protocol.snapshotShape() at bind.
local FIELDS_READ: { string } = { "currency", "upgrades", "clearedCount", "found", "areaComplete" }

--[[
	UNSPECIFIED VALUES — every literal below is a STOP, not a design decision.

	None of these appear under the module's Values and none are in GameConfig. They are
	gathered here, named, and flagged so that they are visible rather than buried in a call
	site, and so that supplying the real ones is an edit to this block. See
	HudBinding.report.md.
]]
-- [STOP: no value in the contract] Progress-bar animation. "tweened rather than set" fixes
-- that there is a tween and says nothing about how long it runs or how it eases. At the
-- 0.12s clear tick a duration above ~0.12s means the bar is permanently mid-flight while a
-- player is clearing, which is the whole reason the number matters.
local BAR_TWEEN_SECONDS = 0.25
local BAR_TWEEN_STYLE = Enum.EasingStyle.Quad
local BAR_TWEEN_DIRECTION = Enum.EasingDirection.Out

-- [STOP: no value in the contract] The text half of the affordability signal. The interface
-- fixes the readout as "Lv <n>  -  <cost>", which carries no affordability at all, while
-- "Must not" forbids colour alone and criterion 2 requires it be readable with colour
-- removed. Those cannot both hold, so a suffix was invented. The words are arbitrary.
local AFFORDABLE_SUFFIX = "  BUY"
local UNAFFORDABLE_SUFFIX = "  NEED"

-- [STOP: no value in the contract] What a maxed upgrade reads as. GameConfig.upgradeCost
-- still returns a number at maxLevel, but showing it advertises a purchase the server will
-- refuse, so the cost is replaced by this word.
local MAX_LEVEL_TEXT = "MAX"

-- Separators, taken verbatim from the interface note's format strings: two spaces, U+00B7,
-- two spaces for the upgrade readout; spaced U+2014 for the progress label.
local UPGRADE_SEPARATOR = "  -  "
local BAR_LABEL_SEPARATOR = " — "

local WARN_PREFIX = "[HudBinding]"

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
					"%s HUD node %q was not found under %s — that readout will not update",
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
			"%s HUD node %s is a %s, which carries no Text — that readout will not update",
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
			"%s HUD node %s is a %s, which has no Size — the progress bar will not move",
			WARN_PREFIX,
			node:GetFullName(),
			node.ClassName
		)
	)
	return nil
end

-- Whole finds across every set in the collection, not just this area's six.
local function totalFinds(): number
	local total = 0
	for _, set in ipairs(GameConfig.RelicSets) do
		total += #set.relics
	end
	return total
end

-- The snapshot carries a map, not a count. A key is only ever written on a reveal, but the
-- value is tested anyway so that a false could never read as found.
local function countFound(found: { [string]: boolean }): number
	local count = 0
	for _, isFound in pairs(found) do
		if isFound then
			count += 1
		end
	end
	return count
end

-- Balances are whole Shards (every award is max(1, floor(...))), and %d refuses a
-- fractional number outright, so the floor is a guard rather than a rounding policy.
local function formatCount(value: number): string
	return string.format("%d", math.floor(value))
end

-- Warn once, at bind, if Protocol has stopped declaring a field this module reads. The
-- alternative to naming the fields here is indexing the snapshot through snapshotShape(),
-- which throws away every type on the way in.
local function checkSnapshotShape()
	local declared: { [string]: boolean } = {}
	for _, field in ipairs(Protocol.snapshotShape()) do
		declared[field] = true
	end
	for _, field in ipairs(FIELDS_READ) do
		if declared[field] == nil then
			warn(
				string.format(
					"%s snapshot field %q is no longer declared by Protocol.snapshotShape() — the HUD reads it and will show a blank or stale value",
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
	accepted for screen-level state; nothing in the contract asks this module to set any,
	so nothing is written to it.

	Everything expensive happens here: paths are walked once, the upgrade node name is
	derived once per upgrade, and the updater is a closure over the results.
]]
function HudBinding.bind(root: GuiObject, gui: ScreenGui): Updater
	checkSnapshotShape()

	local shardsValue = resolveTextNode(root, SHARDS_VALUE_PATH)
	local findsValue = resolveTextNode(root, FINDS_VALUE_PATH)
	local barLabel = resolveTextNode(root, BAR_LABEL_PATH)
	local barFill = resolveGuiObject(root, BAR_FILL_PATH)

	-- One entry per upgrade, in GameConfig.Upgrades order, which is the order the emitted
	-- screen numbers them in: Readout_<n><LABEL UPPERCASED>.
	type UpgradeBinding = {
		def: typeof(GameConfig.Upgrades[1]),
		node: TextNode,
	}
	local upgradeBindings: { UpgradeBinding } = {}
	for index, def in ipairs(GameConfig.Upgrades) do
		local readoutName = string.format("Readout_%d%s", index, string.upper(def.label))
		local node = resolveTextNode(root, { UPGRADE_CLUSTER, readoutName, UPGRADE_VALUE_CHILD })
		if node then
			table.insert(upgradeBindings, { def = def, node = node })
		end
	end

	local findsTotal = totalFinds()
	local areaLabel = string.upper(GameConfig.Area.label)
	local patchCount = GameConfig.Area.patchCount
	local tweenInfo = TweenInfo.new(BAR_TWEEN_SECONDS, BAR_TWEEN_STYLE, BAR_TWEEN_DIRECTION)

	-- Held across snapshots so a repeated snapshot does not restart an animation that is
	-- already going to the same place, and so the previous tween is cancelled rather than
	-- left to fight the new one.
	local lastFraction: number? = nil
	local activeTween: Tween? = nil

	return function(snapshot: Snapshot?)
		if snapshot == nil then
			return
		end

		if shardsValue then
			setText(shardsValue, formatCount(snapshot.currency))
		end

		if findsValue then
			setText(findsValue, string.format("%d / %d", countFound(snapshot.found), findsTotal))
		end

		for _, binding in ipairs(upgradeBindings) do
			local def = binding.def
			local level = snapshot.upgrades[def.id] or 0
			local right: string
			if level >= def.maxLevel then
				right = MAX_LEVEL_TEXT
			else
				local cost = GameConfig.upgradeCost(def, level)
				local suffix = if snapshot.currency >= cost then AFFORDABLE_SUFFIX else UNAFFORDABLE_SUFFIX
				right = formatCount(cost) .. suffix
			end
			setText(binding.node, string.format("Lv %d%s%s", level, UPGRADE_SEPARATOR, right))
		end

		-- patchCount is 140 and cannot be zero, but a division that can produce nan is worth
		-- one branch; clearedCount is documented as never above patchCount and is clamped
		-- for the same reason.
		local fraction = 0
		if patchCount > 0 then
			fraction = math.clamp(snapshot.clearedCount / patchCount, 0, 1)
		end

		if barLabel then
			setText(
				barLabel,
				string.format("%s%s%d%% CLEAR", areaLabel, BAR_LABEL_SEPARATOR, math.floor(fraction * 100))
			)
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
