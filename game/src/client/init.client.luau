--!strict
--[[
	client-main — the client entry point.

	This LocalScript IS StarterPlayer.StarterPlayerScripts.UIBoot (replicated per player to
	Players.LocalPlayer.PlayerScripts.UIBoot); the other client modules are its children.
	The engine runs it, nothing requires it, and it exposes nothing — a require would build
	a second ScreenGui and a second set of handlers.

	It owns exactly one Instance: the ScreenGui the HUD hangs from. That Gui is created
	ONCE and survives every character respawn (ResetOnSpawn = false); its CONTENTS come
	from the emitted screen DATA via UIBuilder, its live values from HudBinding, its four
	buttons from Pressables (via Input) and its collection surface from IndexScreen. This
	file authors no UI structure.

	FIVE THINGS ARE LOAD-BEARING HERE AND EACH IS MARKED AT ITS LINE.

	1. Input.connect takes the ScreenGui. It hands it straight to Pressables.bind, which is
	   what creates the four game-drawn pressables. Called with no argument the buttons
	   parent to nothing and no player of any device class can spend — and since the
	   keyboard 1/2/3 binding is superseded (input.pressable.keyboardAcceleratorRequired is
	   false, input.gameBoundInputClasses is exactly ['pressable']), there is no second path
	   behind it.

	2. Every updater sees every snapshot. Four modules return one; all four go into one
	   fan-out, and BOTH the StateChanged pushes and the RequestState result at boot go
	   through it. Beats derives its one unsequenced beat (patchClear) from a RISE in
	   snapshot.clearedCount, so it must see the boot snapshot as a baseline or a returning
	   player 130 patches into an area is met with 130 onsets at join.

	3. The StateChanged handler is connected BEFORE RequestState is invoked, so a push that
	   lands during the round trip is not lost. Every updater is a whole-snapshot write with
	   no accumulation, so the push and the pull may both land, in either order, harmlessly
	   — which is also what makes two originators on StateChanged safe.

	4. NO BOOT STEP MAY TAKE THE OTHERS DOWN. A playtest died on this file's second
	   statement when UIBuilder threw setting a property an Instance could not hold, and it
	   took the HUD, the purchase path and every handler with it. Each step below is a
	   protected call that warns and continues, and the sibling modules are resolved rather
	   than hard-required for the same reason: a module that fails to load costs its own
	   surface and nothing else.

	5. Channels are resolved once, at boot, into locals. Protocol.channel yields on
	   WaitForChild for the Remotes Folder on its FIRST call — that is the one place the
	   wait belongs, and it may not be paid per event. Protocol.channel is also the only
	   path from a name to a remote here as everywhere; nothing in this file searches the
	   tree.
]]

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

-- The shared root, waited for once and then indexed directly, per tree's rule.
local Shared = ReplicatedStorage:WaitForChild("UIForge")
local Protocol = require(Shared.Protocol)

-- [STOP, carried forward] Neither UIBuilder, Theme nor the emitted screen is in this
-- module's declared dependencies, and none of the three has a location or a signature
-- anywhere in the contract. wiring.onClientBoot step 2 spells the CALL —
-- UIBuilder.build(Screens.hud, Theme, screenGui) — and representation/hud gives the
-- screen's disk path (game/src/shared/Screens/hud.luau), so these three require paths are
-- inferred from tree.diskPaths.shared plus the sharedRoot convention and nothing else.
local UIBuilder = require(Shared.UIBuilder)
local Theme = require(Shared.Theme)
local HudScreen = require(Shared.Screens.hud)

local WARN_PREFIX = "[client-main]"

-- [decided] The ScreenGui's Name. Nothing reads it: every binder is handed the Instance
-- directly and no module looks the Gui up. PascalCase to match the other named Instances
-- in this game (Plot, Patch, Spawn, Remotes).
local HUD_GUI_NAME = "Hud"

--[[
	The sibling client modules, by the names tree.fileNaming gives them. Spelled here once
	so the resolver below and the warnings it prints cannot disagree about a name.
]]
local MODULE_HUD_BINDING = "HudBinding"
local MODULE_INPUT = "Input"
local MODULE_INDEX_SCREEN = "IndexScreen"
local MODULE_BEATS = "Beats"

-- Channel names. Every one is a key of Protocol.REMOTES; Protocol.channel errors on a name
-- it does not declare, so a typo here is a loud failure at boot rather than a nil later.
-- Protocol exposes the channel table but no constant per name, so the two this file uses
-- are spelled once, here, and nowhere else in it.
local CHANNEL_STATE_CHANGED = "StateChanged"
local CHANNEL_REQUEST_STATE = "RequestState"

-- How Protocol.REMOTES spells the two things this file audits at the end of boot. `handledBy`
-- is prose whose first word is the owning module; `direction` is one of two exact strings.
local DIRECTION_INBOUND = "server -> client"
local OWNER_CLIENT_MAIN = "client-main"
local OWNER_BEATS = "beats"

-- A snapshot is typed `any` here on purpose. Each binder declares the eight fields of
-- Protocol.snapshotShape() as its own Snapshot type and checks that list at bind time; this
-- file reads no field of it and only carries it from the wire to the updaters.
type Updater = (any) -> ()

local function warnf(fmt: string, ...: any)
	warn(string.format("%s %s", WARN_PREFIX, string.format(fmt, ...)))
end

--[[
	One boot step, protected.

	Point 4 of the header in one function: a step that throws costs its own surface, warns
	once naming itself, and the boot carries on. Returns nil on failure, which every caller
	below already has to handle because a module can also be absent.
]]
local function step(label: string, fn: (...any) -> any, ...: any): any
	local ok, result = pcall(fn, ...)
	if not ok then
		warnf("%s failed and was skipped: %s", label, tostring(result))
		return nil
	end
	return result
end

--[[
	Resolve a sibling client module without letting its failure reach this script.

	tree's example is `require(script.HudBinding)`, and that is what this is — with the
	indexing, the require and the shape check each turned into a warning. A hard require at
	the top of the file makes every module's load a single point of failure for all of them,
	which is exactly the class of defect point 4 exists to close. IndexScreen is the live
	case: it is named by wiring.onClientBoot step 5 and by Input's index verb, and there is
	no IndexScreen.luau on disk today, so a hard require would end the boot on line one of
	step 5 and take the purchase path and the HUD with it.
]]
local function resolveModule(name: string): any
	local child = script:FindFirstChild(name)
	if child == nil then
		warnf("%s is not beside this script; the surface it owns is absent this session", name)
		return nil
	end
	if not child:IsA("ModuleScript") then
		warnf("%s is a %s, not a ModuleScript; the surface it owns is absent", name, child.ClassName)
		return nil
	end

	local ok, result = pcall(require, child)
	if not ok then
		warnf("requiring %s failed: %s", name, tostring(result))
		return nil
	end
	if typeof(result) ~= "table" then
		warnf("%s returned a %s, not a table", name, typeof(result))
		return nil
	end
	return result
end

--[[
	THE FAN-OUT.

	One entry per bound module, in wiring.onClientBoot order — hud-binding, input (which
	passes through the pressables updater), index-screen, beats. Every entry receives every
	snapshot, from both originators.

	`faulted` is per entry and not per call: an updater that throws is reported once and
	then kept in the list, because the contract says every updater is idempotent and a
	transient throw on one snapshot must not silently unsubscribe a readout for the session.
]]
type Bound = {
	label: string,
	fn: Updater,
	faulted: boolean,
}

local bound: { Bound } = {}

local function collect(label: string, value: any)
	if value == nil then
		-- Already warned by `step` or `resolveModule`. Saying it twice adds nothing.
		return
	end
	if typeof(value) ~= "function" then
		warnf("%s returned a %s where an updater was expected; its readouts will not update", label, typeof(value))
		return
	end
	table.insert(bound, { label = label, fn = value :: Updater, faulted = false })
end

local warnedNilSnapshot = false

local function fanOut(snapshot: any)
	if snapshot == nil then
		if not warnedNilSnapshot then
			warnedNilSnapshot = true
			warnf("a nil snapshot arrived and was dropped; every readout keeps its last value")
		end
		return
	end
	for _, entry in ipairs(bound) do
		local ok, err = pcall(entry.fn, snapshot)
		if not ok and not entry.faulted then
			entry.faulted = true
			warnf("the %s updater errored and will not be reported again: %s", entry.label, tostring(err))
		end
	end
end

--[[
	Step 1 — one ScreenGui in PlayerGui, created once.

	ResetOnSpawn is false because criterion 2 is that the HUD survives a character respawn
	without being rebuilt: left at its default, the engine would clear this Gui out of
	PlayerGui on every spawn and there is nothing that would put it back. It is also what
	makes input.pressable.roles' `persistent: true` true of the four buttons and of the
	collection surface — they are created once, inside this Gui, and outlive every character.

	NOT PROTECTED. Every step below takes this Instance as an argument, so there is no
	partial boot to salvage if it cannot be made.
]]
local localPlayer = Players.LocalPlayer
local playerGui = localPlayer:WaitForChild("PlayerGui")

local screenGui = Instance.new("ScreenGui")
screenGui.Name = HUD_GUI_NAME
screenGui.ResetOnSpawn = false
screenGui.Parent = playerGui

--[[
	Step 2 — the HUD's structure, from the emitted screen data.

	THE STATEMENT THAT KILLED A PLAYTEST. It is protected, and a failure here costs the
	readouts only: step 3 is skipped for want of a Root, and the four pressables, the
	collection surface and the beat schedule all still bind, because they parent to the
	ScreenGui rather than to anything UIBuilder made.
]]
local root = step("UIBuilder.build", UIBuilder.build, HudScreen, Theme, screenGui)

--[[
	Step 3 — resolve the HUD's named nodes once and keep the updater. A node name that no
	longer resolves warns inside bind, once, not on every snapshot.
]]
local HudBinding = resolveModule(MODULE_HUD_BINDING)
if HudBinding ~= nil then
	if root == nil then
		warnf("skipping %s.bind: UIBuilder returned no Root frame for it to resolve against", MODULE_HUD_BINDING)
	else
		collect(MODULE_HUD_BINDING, step("HudBinding.bind", HudBinding.bind, root, screenGui))
	end
end

--[[
	Step 4 — THE PURCHASE PATH, AND IT IS NOT A KEYPRESS.

	connect TAKES THE ScreenGui and hands it straight to Pressables.bind, which creates the
	four game-drawn pressables inside it — input.gameDrawnPressables is 4, three purchase
	and one index. Called as connect() the buttons parent to nil and nobody can spend on any
	device; input.travelRequiredToPurchase is 'none' and the 1/2/3 accelerator is superseded,
	so this argument is the whole purchase surface.

	This file does not call Pressables.bind itself and holds no handle to it: input owns the
	activation seam (which upgrade id a press means, and that the index press is a local
	toggle rather than a packet) and passes the pressables updater back through.
]]
local Input = resolveModule(MODULE_INPUT)
if Input ~= nil then
	collect(MODULE_INPUT, step("Input.connect", Input.connect, screenGui))
end

--[[
	Step 5 — the collection surface, created hidden inside the same ScreenGui.

	Its presence is derived from the snapshot's found map — firstSession.withheld
	.collectionPanel, newSaveFields 0 — so it needs the updater and nothing is stored for it.
	Input resolves this same module by name for the index pressable's toggle(); both
	resolutions are soft, so a missing IndexScreen costs the collection surface and the index
	button and leaves the three purchase buttons working.
]]
local IndexScreen = resolveModule(MODULE_INDEX_SCREEN)
if IndexScreen ~= nil then
	collect(MODULE_INDEX_SCREEN, step("IndexScreen.bind", IndexScreen.bind, screenGui))
end

--[[
	Step 6 — the beat schedule.

	Beats connects the four payoff channels itself, deriving each one from
	Protocol.REMOTES[name].handledBy, so this file connects none of them: an empty handler
	here would be a second receiver on a channel the contract gives one owner. What it
	returns is the updater the one UNSEQUENCED beat rides on — patchClear is driven from a
	rise in snapshot.clearedCount, which is why it must be in the fan-out before the boot
	snapshot is pulled, and why the boot snapshot is a baseline rather than ~130 onsets.
]]
local Beats = resolveModule(MODULE_BEATS)
local beatsUpdater = if Beats ~= nil then step("Beats.connect", Beats.connect, screenGui) else nil
collect(MODULE_BEATS, beatsUpdater)
local beatsBound = typeof(beatsUpdater) == "function"

--[[
	Step 7 — the snapshot path, in this order deliberately.

	Both channels are resolved into locals FIRST: Protocol.channel's first call yields on
	WaitForChild for the Remotes Folder, and paying that once at boot is the point of the
	rule. Then the handler goes on, and only then the pull — so a push arriving during the
	round trip is not lost. The pull happens at all because client-main may not assume the
	server's join-time push arrived. Both feed the same fan-out and every updater is
	idempotent, so a duplicate snapshot is harmless.
]]
local stateChanged = Protocol.channel(CHANNEL_STATE_CHANGED)
local requestState = Protocol.channel(CHANNEL_REQUEST_STATE)

stateChanged.OnClientEvent:Connect(fanOut)

--[[
	ONCE, per wiring.onClientBoot step 7 — no retry and no loop.

	If the invoke fails the readouts hold the values the emitted screen shipped with until
	the next StateChanged, which wiring.onSpawn step 8 pushes on every character load, so
	the recovery already exists and does not need a second request written here.
]]
local requested = step("RequestState:InvokeServer", function(): any
	return requestState:InvokeServer()
end)
fanOut(requested)

--[[
	THE RECEIVER AUDIT.

	"Leaving a server-to-client channel unconnected" is one of this module's prohibitions,
	and an unconnected channel is invisible: the server fires into it forever and nothing
	errors. So the check is made from the table that declares them rather than from a count
	written here. Every inbound channel names its owning module in `handledBy`; this file
	connects the one that names client-main, beats connects the ones that name beats, and
	anything else has arrived in the contract with nobody booting it.

	It warns and never errors: a channel with no receiver is a missing cue, not a reason to
	take down a HUD that is already drawn.
]]
local function ownerOf(handledBy: string): string
	-- The module name is everything up to the first comma; the rest is prose.
	local head = string.match(handledBy, "^([%w%-_]+)")
	return head or handledBy
end

-- Cast because Protocol arrives through an instance require, which the analyser cannot
-- follow; the cast states the two fields this loop reads rather than leaving `def` unknown.
-- It is the same narrowing Beats applies to the same table for the same reason.
type ChannelRow = { direction: string, handledBy: string }

for name, def: ChannelRow in pairs(Protocol.REMOTES :: { [string]: ChannelRow }) do
	if def.direction ~= DIRECTION_INBOUND then
		continue
	end
	local owner = ownerOf(def.handledBy)
	if owner == OWNER_CLIENT_MAIN then
		-- Connected above, to the fan-out.
		continue
	end
	if owner == OWNER_BEATS then
		if not beatsBound then
			warnf("%s is handled by %s, which did not bind; that channel has no receiver this session", name, OWNER_BEATS)
		end
		continue
	end
	warnf(
		"%s declares handledBy %q, which is not a module client boot starts; that channel has no receiver",
		name,
		def.handledBy
	)
end

if #bound == 0 then
	warnf("no updater bound; the HUD will show the values the screen was emitted with and nothing else")
end
