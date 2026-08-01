--!strict
--[[
	client-main — the client entry point.

	This LocalScript IS StarterPlayer.StarterPlayerScripts.UIBoot (replicated per player to
	Players.LocalPlayer.PlayerScripts.UIBoot); the other client modules are its children.
	The engine runs it, nothing requires it, and it exposes nothing — a require would build
	a second ScreenGui and a second set of handlers.

	It owns exactly one Instance: the ScreenGui the HUD hangs from. That Gui is created
	ONCE and survives every character respawn (ResetOnSpawn = false); its CONTENTS come
	from the emitted screen DATA via UIBuilder, and its live values from HudBinding. No
	client module authors UI structure.

	Boot order is wiring.onClientBoot, and one step of it is load-bearing: the StateChanged
	handler is connected BEFORE RequestState is invoked, so a push that lands during the
	round trip is not lost. The updater is a whole-snapshot write with no accumulation, so
	the join-time push and the pull can both land, in either order, harmlessly — which is
	also what makes two originators on StateChanged safe.

	It does not wait for the Remotes Folder itself: Protocol.channel does that once, on its
	first call, inside Protocol.luau. Protocol.channel is the only path from a name to a
	remote Instance here as everywhere; nothing in this file searches the tree.
]]

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

-- The shared root, waited for once and then indexed directly, per tree's rule.
local Shared = ReplicatedStorage:WaitForChild("UIForge")
local Protocol = require(Shared.Protocol)

-- [STOP] Neither UIBuilder, Theme nor the emitted screen is in this module's declared
-- dependencies, and none of the three has a location or a signature anywhere in the
-- contract. wiring.onClientBoot step 2 spells the CALL — UIBuilder.build(Screens.hud,
-- Theme, screenGui) — and representation/hud gives the screen's disk path
-- (game/src/shared/Screens/hud.luau), so these three require paths are inferred from
-- tree.diskPaths.shared plus the sharedRoot convention and nothing else. See the report.
local UIBuilder = require(Shared.UIBuilder)
local Theme = require(Shared.Theme)
local HudScreen = require(Shared.Screens.hud)

-- Sibling client modules. `script` is UIBoot itself, so they are its children.
local HudBinding = require(script.HudBinding)
local Input = require(script.Input)

-- Channel names. Every one is a key of Protocol.REMOTES; Protocol.channel errors on a name
-- it does not declare, so a typo here is a loud failure at boot rather than a nil later.
-- Protocol exposes the channel table but no constant for the names themselves, so the
-- strings are spelled once, here, and nowhere else in this file.
local CHANNEL_STATE_CHANGED = "StateChanged"
local CHANNEL_REQUEST_STATE = "RequestState"
local CHANNEL_FIND_REVEALED = "FindRevealed"
local CHANNEL_AREA_RESTORED = "AreaRestored"

-- [decided] The ScreenGui's Name. Nothing reads it: HudBinding is handed the Instance and
-- the Root frame directly, and no other module looks the Gui up. PascalCase to match the
-- other named Instances in this game (Plot, Patch, Spawn, Remotes).
local HUD_GUI_NAME = "Hud"

--[[
	Step 1 — one ScreenGui in PlayerGui, created once.

	ResetOnSpawn is false because criterion 2 is that the HUD survives a character respawn
	without being rebuilt: left at its default, the engine would clear this Gui out of
	PlayerGui on every spawn and there is nothing that would put it back.
]]
local localPlayer = Players.LocalPlayer
local playerGui = localPlayer:WaitForChild("PlayerGui")

local screenGui = Instance.new("ScreenGui")
screenGui.Name = HUD_GUI_NAME
screenGui.ResetOnSpawn = false
screenGui.Parent = playerGui

-- Step 2 — the HUD's structure, from the emitted screen data. This module authors none of
-- it; it holds the one Instance the tree hangs from and nothing more.
local root = UIBuilder.build(HudScreen, Theme, screenGui)

-- Step 3 — resolve the HUD's named nodes once and keep the updater it returns. A node name
-- that no longer resolves warns inside bind, once, not on every snapshot.
local updater = HudBinding.bind(root, screenGui)

-- Step 4 — the purchase affordance. It takes no arguments and resolves its own channel:
-- there is exactly one way to get a remote, and passing a resolved Instance between modules
-- would be a second one.
Input.connect()

--[[
	Step 5 — the snapshot path, in this order deliberately.

	The handler goes on first so that a push arriving during the RequestState round trip is
	not lost, and the pull happens because client-main may not assume the server's join-time
	push arrived at all. Both feed the same updater, and the updater is idempotent, so a
	duplicate snapshot is harmless.
]]
Protocol.channel(CHANNEL_STATE_CHANGED).OnClientEvent:Connect(function(snapshot: any)
	updater(snapshot)
end)

updater(Protocol.channel(CHANNEL_REQUEST_STATE):InvokeServer())

--[[
	Step 6 — the two payoff channels.

	Both handlers are connected and both are EMPTY today. What a reveal looks like, sounds
	like and reads as is routed to Art — VFX, Audio — Stingers and UI/UX — Feedback, none of
	which owns a contract key yet. They are connected anyway so that each channel has a
	receiver at the end of the wire, and so adding presentation is a change to one function
	body rather than to the wiring.

	The HUD depends on neither: the found count, the balance and the progress bar all arrive
	on StateChanged.
]]
local function onReveal(findName: string) end

local function onRestored(areaLabel: string) end

Protocol.channel(CHANNEL_FIND_REVEALED).OnClientEvent:Connect(onReveal)
Protocol.channel(CHANNEL_AREA_RESTORED).OnClientEvent:Connect(onRestored)
