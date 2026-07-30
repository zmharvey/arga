--!strict
-- Boots a ui-forge screen. Replace the require with whichever screen you want.

local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Players = game:GetService("Players")

local Forge = ReplicatedStorage:WaitForChild("UIForge")
local UIBuilder = require(Forge:WaitForChild("UIBuilder"))
local Theme = require(Forge:WaitForChild("Theme"))
local Screen = require(Forge:WaitForChild("Screens"):WaitForChild("roster"))

local gui = Instance.new("ScreenGui")
gui.Name = Screen.name or "UIForgeScreen"
gui.ResetOnSpawn = false
gui.IgnoreGuiInset = true
-- Sibling ordering, so the shadow slices sit behind their owners as authored.
gui.ZIndexBehavior = Enum.ZIndexBehavior.Sibling
gui.Parent = Players.LocalPlayer:WaitForChild("PlayerGui")

UIBuilder.build(Screen, Theme, gui)
