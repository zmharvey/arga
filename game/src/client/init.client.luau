--!strict
--[[
	Boots the ui-forge HUD and wires it to server state.

	The HUD's structure is not authored here — it comes from
	`ui-forge/briefs/hud.brief.json`, compiled to `Screens/hud.luau`. This file only
	finds the named nodes and writes live values into them. That split is the point:
	if the HUD needs to look different, the brief changes and this file does not.

	Upgrades are bought on 1/2/3. A real upgrades screen is a `modal-grid` — a grid of
	priced items is exactly what that pattern does — and is the obvious next thing to
	wire. Keyboard input is enough to make the loop playable, and the loop is what
	this slice exists to prove.
]]

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local TweenService = game:GetService("TweenService")
local UserInputService = game:GetService("UserInputService")

local Forge = ReplicatedStorage:WaitForChild("UIForge")
local UIBuilder = require(Forge:WaitForChild("UIBuilder"))
local Theme = require(Forge:WaitForChild("Theme"))
local Screen = require(Forge:WaitForChild("Screens"):WaitForChild("hud"))

local Remotes = ReplicatedStorage:WaitForChild("Remotes")
local stateChanged = Remotes:WaitForChild("StateChanged") :: RemoteEvent
local relicFound = Remotes:WaitForChild("RelicFound") :: RemoteEvent
local buyUpgrade = Remotes:WaitForChild("BuyUpgrade") :: RemoteEvent
local requestState = Remotes:WaitForChild("RequestState") :: RemoteEvent

local player = Players.LocalPlayer

local gui = Instance.new("ScreenGui")
gui.Name = "ArgaHud"
gui.ResetOnSpawn = false
gui.IgnoreGuiInset = true
-- Sibling ordering, so shadow slices sit behind their owners as authored.
gui.ZIndexBehavior = Enum.ZIndexBehavior.Sibling
gui.Parent = player:WaitForChild("PlayerGui")

local root = UIBuilder.build(Screen, Theme, gui)

----------------------------------------------------------------- node lookup

--[[
	The compiled screen sets each node's Name from the pattern's node vocabulary, so
	a recursive lookup is the whole binding layer. A name that stops resolving means
	the brief changed shape, which is worth warning about rather than silently
	failing to update a readout.
]]
local function findNode(name: string): Instance?
	return root:FindFirstChild(name, true)
end

local function valueLabel(readoutName: string): TextLabel?
	local host = findNode(readoutName)
	if not host then
		warn(`[arga] HUD node "{readoutName}" not found — did the brief change?`)
		return nil
	end
	local label = host:FindFirstChild("ReadoutValue", true)
	if label and label:IsA("TextLabel") then
		return label
	end
	return nil
end

local relicsValue = valueLabel("Readout_RELICS")
local shardsValue = valueLabel("Readout_SHARDS")
local upgradeValue: { [string]: TextLabel? } = {
	value = valueLabel("Readout_1VALUE"),
	radius = valueLabel("Readout_2REACH"),
	speed = valueLabel("Readout_3PACE"),
}

local barLabel = findNode("BarLabel")
local barFill = findNode("BarFill")

------------------------------------------------------------------- formatting

local function comma(n: number): string
	local s = tostring(math.floor(n))
	local out = s:reverse():gsub("(%d%d%d)", "%1,"):reverse()
	return (out:gsub("^,", ""))
end

------------------------------------------------------------------------ toast

--[[
	Built through UIBuilder rather than hand-rolled, so it resolves the same theme
	tokens as everything else. A toast styled by hand is the first place a game starts
	looking like two games.
]]
local function toast(text: string)
	local holder = Instance.new("Frame")
	holder.Name = "Toast"
	holder.AnchorPoint = Vector2.new(0.5, 0)
	holder.Position = UDim2.new(0.5, 0, 0, 40)
	holder.Size = UDim2.fromOffset(0, 0)
	holder.AutomaticSize = Enum.AutomaticSize.XY
	holder.BackgroundTransparency = 1
	holder.Parent = gui

	UIBuilder.build({
		root = {
			class = "Frame",
			name = "ToastCard",
			size = { auto = "xy" },
			bg = "surface.overlay",
			corner = "radius.lg",
			stroke = { color = "accent.primary", thickness = "stroke.base" },
			elevation = 3,
			padding = { top = "space.md", bottom = "space.md", left = "space.lg", right = "space.lg" },
			layout = { dir = "horizontal", gap = "space.sm", align = "center", justify = "center" },
			children = {
				{
					class = "TextLabel",
					name = "ToastText",
					text = text,
					type = "title",
					color = "content.primary",
					size = { o = { nil, 26 }, auto = "x" },
					align = "center",
				},
			},
		},
	}, Theme, holder)

	task.delay(2.4, function()
		TweenService:Create(
			holder,
			TweenInfo.new(0.35, Enum.EasingStyle.Quad, Enum.EasingDirection.Out),
			{ Position = UDim2.new(0.5, 0, 0, 8) }
		):Play()
		task.wait(0.4)
		holder:Destroy()
	end)
end

------------------------------------------------------------------- state sync

stateChanged.OnClientEvent:Connect(function(state)
	if relicsValue then
		relicsValue.Text = `{state.relics} / {state.relicTotal}`
	end
	if shardsValue then
		shardsValue.Text = comma(state.currency)
	end

	local pct = state.patchTotal > 0 and (state.cleared / state.patchTotal) or 0
	if barLabel and barLabel:IsA("TextLabel") then
		barLabel.Text = state.areaComplete
			and `{state.areaLabel} — CLEAR`
			or `{state.areaLabel} — {math.floor(pct * 100)}% CLEAR`
	end
	if barFill and barFill:IsA("GuiObject") then
		-- Tweened rather than set: a bar that snaps reads as a number, a bar that
		-- fills reads as progress. Same data, different feeling.
		TweenService:Create(
			barFill,
			TweenInfo.new(0.25, Enum.EasingStyle.Quad, Enum.EasingDirection.Out),
			{ Size = UDim2.new(pct, 0, 1, 0) }
		):Play()
	end

	for id, label in pairs(upgradeValue) do
		local u = state.upgrades and state.upgrades[id]
		if label and u then
			label.Text = u.cost < 0 and `Lv {u.level}  ·  MAX` or `Lv {u.level}  ·  {comma(u.cost)}`
			-- Affordability shows in the text as well as the colour, because colour
			-- alone is exactly what 04-PRESENTATION.md's accessibility constraint
			-- rules out for an economic signal.
			local affordable = u.cost >= 0 and state.currency >= u.cost
			label.TextColor3 = if affordable
				then Color3.fromRGB(255, 255, 255)
				else Color3.fromRGB(150, 140, 170)
		end
	end
end)

relicFound.OnClientEvent:Connect(function(what: string)
	local areaDone = string.match(what, "^__area_complete:(.+)$")
	if areaDone then
		toast(`{areaDone} RESTORED`)
	else
		toast(`FOUND — {what}`)
	end
end)

------------------------------------------------------------------------ input

local KEY_TO_UPGRADE: { [Enum.KeyCode]: string } = {
	[Enum.KeyCode.One] = "value",
	[Enum.KeyCode.Two] = "radius",
	[Enum.KeyCode.Three] = "speed",
}

UserInputService.InputBegan:Connect(function(input, processed)
	if processed then
		return
	end
	local id = KEY_TO_UPGRADE[input.KeyCode]
	if id then
		buyUpgrade:FireServer(id)
	end
end)

-- Ask for state now that the handlers are live, rather than hoping the server's
-- spawn-time push arrived after this script connected.
requestState:FireServer()

print("[arga] HUD bound to server state")
