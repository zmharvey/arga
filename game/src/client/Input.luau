--!strict
--[[
	Input — the seam between a press and a message, and nothing else.

	THIS MODULE BINDS NO KEY. input.gameBoundInputClasses is exactly ["pressable"],
	input.travelRequiredToPurchase is "none" and input.worldObjectsTriggeringAVerb is 0, so
	every verb the game binds arrives on a control that is already on screen. The shipped
	Enum.KeyCode.One/Two/Three binding this file used to carry is SUPERSEDED and gone: it was
	the only path to a purchase, and input.pressable.keyboardAcceleratorRequired is false —
	a key may sit beside a button and may never be the only way to reach it. On a
	mobile-heavy audience a keyboard-only purchase path is a currency nobody can spend.

	Nothing here draws anything. `pressables` authors the four controls and decides that a
	press happened; this module decides what a press MEANS. That split is the whole of the
	rewrite: `onActivate(role, index)` is the argument that replaces Enum.KeyCode.One.

		role "purchase", index i -> fire BuyUpgrade with GameConfig.Upgrades[i].id
		role "index"             -> index-screen.toggle(), locally, with no packet

	THE PAYLOAD IS ONE STRING. No cost, no level, no balance, no target: economy.authority is
	"server only" and input.verbs[buy].adjudicatedBy is "server", so the server prices every
	purchase and this module holds no state, reads no snapshot and makes no decision the
	server would have to re-make.

	NO CLIENT-SIDE PRECONDITION GATE, DELIBERATELY. An unaffordable or maxed press is
	reported like any other, progression.tryBuy returns false and nothing comes back:
	input.verbs[buy].onPreconditionFail is silentNoOp and
	input.pressable.rejectionCueOnFailedPrecondition is "none", so the player sees nothing
	happen, which is the specified result. The client's snapshot is a copy that is always at
	least one tick old, and suppressing a send against it would silently drop a purchase the
	server would have accepted. Flagged in this module's build report, because the brief's
	prohibition list can be read the other way.

	The channel is never spelled here. Its name is the single entry of
	GameConfig.Input.clientRemotesFiredByPlayerInput, and the Instance comes from
	Protocol.channel — the only path from a name to a remote in the game. This module never
	searches the tree for a remote and never accepts one from its caller.

	Does no work at require time: connect() resolves the channel, checks the contract and
	installs the handler.
]]

local ReplicatedStorage = game:GetService("ReplicatedStorage")
local UserInputService = game:GetService("UserInputService")

local Shared = ReplicatedStorage:WaitForChild("UIForge")
local GameConfig = require(Shared.GameConfig)
local Protocol = require(Shared.Protocol)

local Pressables = require(script.Parent.Pressables)

local Input = {}

--[[
	The updater `pressables.bind` returns, passed straight back to client-main so this module
	holds no handle and client-main holds no pressable. Typed loosely on purpose: the
	instance require above resolves to `any`, so Pressables' own Snapshot type cannot be
	named from here, and this module never reads a field of it.
]]
export type Updater = (snapshot: any) -> ()

-- One entry of GameConfig.Upgrades. Only `id` is read; `label` and `maxLevel` are named so
-- that a rename in the config is a type error here rather than a button that sends nil.
type UpgradeDef = {
	id: string,
	label: string,
	maxLevel: number,
}

local WARN_PREFIX = "[Input]"

-- The two role ids, from input.pressable.roles. Spelled here and CHECKED against the
-- contract at connect(), exactly as Pressables does, so a role rename warns on both sides of
-- the seam rather than producing a press nobody handles.
local ROLE_PURCHASE = "purchase"
local ROLE_INDEX = "index"

-- The sibling module that owns the collection surface. tree's rule: a client module reaches
-- a sibling through script.Parent and never through a literal runtime path.
local INDEX_SCREEN_MODULE_NAME = "IndexScreen"

--[[
	The name of the channel a player's press fires.

	Taken from GameConfig.Input.clientRemotesFiredByPlayerInput, which is exactly
	["BuyUpgrade"], rather than typed as a literal in this file. Protocol already checks
	GameConfig.Input.clientOriginatedRemotes against its own table in both directions at
	load, so reading the name from the same contract makes this module's one message a
	property of the merge instead of a string two files happen to agree on.

	Errors rather than warns. A contract that does not name exactly one player-fired channel,
	or names one Protocol does not declare client -> server, leaves no purchase reachable by
	any route; there is nothing to degrade to and the failure belongs at boot, in Studio,
	where somebody is watching.
]]
local function purchaseChannelName(): string
	local fired = GameConfig.Input.clientRemotesFiredByPlayerInput :: { string }

	if #fired ~= 1 then
		error(
			string.format(
				"%s GameConfig.Input.clientRemotesFiredByPlayerInput names %d channels; exactly one is fired by a press",
				WARN_PREFIX,
				#fired
			)
		)
	end

	local name = fired[1]
	local declared = Protocol.REMOTES[name]
	if declared == nil then
		error(
			string.format(
				"%s GameConfig.Input.clientRemotesFiredByPlayerInput names %q, which Protocol.REMOTES does not declare",
				WARN_PREFIX,
				tostring(name)
			)
		)
	end
	if declared.direction ~= "client -> server" then
		error(
			string.format(
				"%s channel %q is declared %q; a press may only fire a client -> server channel",
				WARN_PREFIX,
				name,
				tostring(declared.direction)
			)
		)
	end

	return name
end

--[[
	Check the two role ids this module dispatches on against input.pressable.roles, and warn
	rather than diverge. input.closed is true, so a mismatch means the contract moved and one
	of the two modules either side of `onActivate` did not — which would show up as a press
	that does nothing at all, silently, on a surface whose whole design forbids a cue.
]]
local function checkRolesAgainstContract()
	local roles = GameConfig.Input.pressable.roles :: { { role: string, count: number } }
	local seen: { [string]: boolean } = {}
	for _, entry in ipairs(roles) do
		seen[entry.role] = true
	end
	for _, role in ipairs({ ROLE_PURCHASE, ROLE_INDEX }) do
		if not seen[role] then
			warn(string.format("%s input.pressable.roles declares no %q role", WARN_PREFIX, role))
		end
	end
end

--[[
	index-screen, resolved once and cached.

	RESOLVED RATHER THAN REQUIRED AT THE TOP OF THIS FILE, and that is a judgement call worth
	naming: a plain `require(script.Parent.IndexScreen)` on a module that is not there yet
	throws while this file is loading, which takes the PURCHASE path down with it — the one
	path this rewrite exists to open. The collection surface failing to open is a smaller
	loss than nobody being able to spend, so the two are decoupled. Reported.
]]
local indexScreen: any = nil
local indexScreenWarned = false

local function warnIndexScreenOnce(message: string)
	if indexScreenWarned then
		return
	end
	indexScreenWarned = true
	warn(string.format("%s %s", WARN_PREFIX, message))
end

local function resolveIndexScreen(): any
	if indexScreen ~= nil then
		return indexScreen
	end

	local module = script.Parent:FindFirstChild(INDEX_SCREEN_MODULE_NAME)
	if module == nil or not module:IsA("ModuleScript") then
		warnIndexScreenOnce(
			string.format(
				"%s is not a ModuleScript beside this one; the index pressable will open nothing",
				INDEX_SCREEN_MODULE_NAME
			)
		)
		return nil
	end

	local ok, result = pcall(require, module)
	if not ok then
		warnIndexScreenOnce(string.format("requiring %s failed: %s", INDEX_SCREEN_MODULE_NAME, tostring(result)))
		return nil
	end

	indexScreen = result
	return result
end

--[[
	The index verb, adjudicated on the CLIENT — input.verbs[openIndex].adjudicatedBy is
	"client", which is why this is a direct call and not a remote. index-screen owns what
	toggling does, including suspending movement while the surface is open
	(input.pressable.indexScreenSuspendsMovement); this module only says when.
]]
local function toggleIndexScreen()
	local module = resolveIndexScreen()
	if module == nil then
		return
	end
	if typeof(module.toggle) ~= "function" then
		warnIndexScreenOnce(string.format("%s exposes no toggle()", INDEX_SCREEN_MODULE_NAME))
		return
	end
	module.toggle()
end

--[[
	Install the two game-bound verbs on the four game-drawn pressables.

	`gui` is the HUD ScreenGui client-main created, passed straight to pressables.bind — this
	module creates no Instance and names no node. The return value is the updater
	pressables.bind gave back, passed through unchanged so client-main collects one updater
	per bound module and this one holds no handle.

	Called once, by client-main, in wiring.onClientBoot step 4.
]]
function Input.connect(gui: ScreenGui): Updater
	checkRolesAgainstContract()

	local upgrades: { UpgradeDef } = GameConfig.Upgrades

	-- Resolved once, here, and not per press: the first call may WaitForChild for the Remotes
	-- Folder to replicate, and a press is the wrong moment to yield.
	local buyUpgrade: RemoteEvent = Protocol.channel(purchaseChannelName())

	-- Warms the cache and, more usefully, reports a missing collection surface at boot rather
	-- than on the first press of a button that then appears to be broken.
	resolveIndexScreen()

	--[[
		ONE ACCEPTED PRESS, ONE DECISION. pressables has already applied
		input.pressable.debounceSeconds and activationsPerPress 1, so this handler adds no
		second debounce: two of them in series would drop a press that the contract accepts.
	]]
	local function onActivate(role: string, index: number)
		-- A focused text box owns the input. Nothing in this game creates a TextBox and chat
		-- is off, so this is a guard against a future surface rather than a live case; it is
		-- checked here, once, for both roles, because the brief asks for it on the module and
		-- not on one verb.
		if UserInputService:GetFocusedTextBox() ~= nil then
			return
		end

		if role == ROLE_PURCHASE then
			-- index is the 1-based position in GameConfig.Upgrades —
			-- input.pressable.roles[purchase].boundTo is "upgrades declaration order", so 1 is
			-- Value, 2 is Reach, 3 is Pace. The id is read out of the config every press: no
			-- upgrade id is ever spelled in this file.
			local def = upgrades[index]
			if def == nil then
				warn(
					string.format(
						"%s purchase press for index %s, but GameConfig.Upgrades has %d entries; sending nothing",
						WARN_PREFIX,
						tostring(index),
						#upgrades
					)
				)
				return
			end

			-- ONE STRING AND NOTHING ELSE.
			buyUpgrade:FireServer(def.id)
			return
		end

		if role == ROLE_INDEX then
			toggleIndexScreen()
			return
		end

		warn(string.format("%s press reported with unhandled role %q; sending nothing", WARN_PREFIX, tostring(role)))
	end

	if not gui then
		-- Left as a warning rather than an error: pressables owns what it does with the
		-- container it is handed, and this module refusing to bind would take the purchase
		-- path down over an argument it does not use itself.
		warn(string.format("%s connect() was called with no ScreenGui", WARN_PREFIX))
	end

	return Pressables.bind(gui, onActivate)
end

return Input
