--!strict
--[[
	Calibration probe.

	Builds a ui-forge screen, measures what the ENGINE actually laid out, and
	posts it to the local calibration server. The comparator diffs those numbers
	against the HTML preview's measurements for the same spec.

	This exists because every validator result so far assumes the HTML transpiler
	renders what Roblox renders, and nothing has ever checked that. Until this
	runs, "clean" is a hypothesis.

	SETUP: Game Settings > Security > Allow HTTP Requests must be ON.
	Then press Play in Studio with the calibration server running:
	    node ui-forge/src/cli.mjs calibrate --brief <brief> --context <ctx>
]]

local HttpService = game:GetService("HttpService")
local Players = game:GetService("Players")
local RunService = game:GetService("RunService")

local ENDPOINT = "http://127.0.0.1:34765"
local SCREEN_NAME = "roster"

local Forge = game:GetService("ReplicatedStorage"):WaitForChild("UIForge")
local UIBuilder = require(Forge:WaitForChild("UIBuilder"))
local Theme = require(Forge:WaitForChild("Theme"))
local Screen = require(Forge:WaitForChild("Screens"):WaitForChild(SCREEN_NAME))

local gui = Instance.new("ScreenGui")
gui.Name = "CalibrationTarget"
gui.ResetOnSpawn = false
gui.IgnoreGuiInset = true
gui.ZIndexBehavior = Enum.ZIndexBehavior.Sibling
gui.Parent = Players.LocalPlayer:WaitForChild("PlayerGui")

local root = UIBuilder.build(Screen, Theme, gui)

--[[
	Entrance tweens must finish before measuring. Sampling mid-tween reports
	every animated element at its interpolated size — the same trap the HTML
	harness hit, where a 48px button measured 43px halfway through a pop.
]]
task.wait(1.5)

-- Layout is resolved over a frame; one more step guarantees AbsoluteSize is final.
RunService.RenderStepped:Wait()

--[[
	Path keys must match the ones compare.mjs builds from the HTML tree, so the
	two trees can be aligned node by node.
]]
local function pathOf(inst: Instance): string
	local segments = {}
	local cur: Instance? = inst
	while cur and cur ~= gui do
		table.insert(segments, 1, cur.Name)
		cur = cur.Parent
	end
	return table.concat(segments, "/")
end

local nodes = {}
local seen: { [string]: number } = {}

local function record(inst: GuiObject)
	-- Runtime-only helpers with no preview counterpart.
	if inst.Name == "ShadowSlice" then
		return
	end
	local key = pathOf(inst)
	local count = seen[key] or 0
	seen[key] = count + 1
	if count > 0 then
		key = key .. "#" .. tostring(count)
	end
	table.insert(nodes, {
		key = key,
		cls = inst.ClassName,
		x = inst.AbsolutePosition.X,
		y = inst.AbsolutePosition.Y,
		w = inst.AbsoluteSize.X,
		h = inst.AbsoluteSize.Y,
	})
end

record(root)
for _, d in root:GetDescendants() do
	if d:IsA("GuiObject") then
		record(d)
	end
end

local camera = workspace.CurrentCamera
local payload = {
	screen = SCREEN_NAME,
	viewport = { width = camera.ViewportSize.X, height = camera.ViewportSize.Y },
	nodes = nodes,
}

local ok, err = pcall(function()
	HttpService:PostAsync(ENDPOINT, HttpService:JSONEncode(payload), Enum.HttpContentType.ApplicationJson)
end)

if ok then
	print(string.format("[ui-forge] posted %d nodes at %dx%d", #nodes, camera.ViewportSize.X, camera.ViewportSize.Y))
else
	warn("[ui-forge] calibration post failed: " .. tostring(err))
	warn("[ui-forge] check that HTTP requests are enabled and the server is running")
end
