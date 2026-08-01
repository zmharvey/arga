--!strict
--[[
	server-main — the server entry point.

	This Script IS ServerScriptService.Game; the other server modules are its children.
	The engine runs it, nothing requires it, and it returns nothing: a require would run
	this whole boot sequence a second time, creating a second remotes folder and a second
	clear tick.

	IT WIRES, IT DOES NOT DECIDE. Every rule in this file belongs to one of the five
	modules below — persistence owns what is stored, progression owns what a purchase
	costs, plots owns what a plot is made of, clearing owns the tick, protocol owns the
	channels. What is left here is ordering: what happens on boot, on join, on spawn, on a
	purchase, on a save, on leave and on shutdown, and in what order.

	THE ONE PROPERTY THIS FILE ALONE PROVIDES: `humanoid.WalkSpeed =
	Progression.walkSpeed(state)`. progression computes that number and writes nothing, so
	the two lines below (wiring.onSpawn step 4 and wiring.onPurchase step 3) are the only
	place the Pace upgrade reaches the engine. Without them the upgrade is purchasable and
	does nothing. The purchase-side write is UNCONDITIONAL, whichever upgrade was bought:
	gating it on the id is one line shorter and one refactor away from re-opening that
	defect.

	No remote is named anywhere in this file except as a key of Protocol.REMOTES handed to
	Protocol.channel, and no remote Instance is created here — Protocol.createRemotes()
	does that, once, at boot step 2.
]]

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")

local Shared = ReplicatedStorage:WaitForChild("UIForge")
local GameConfig = require(Shared.GameConfig)
local Protocol = require(Shared.Protocol)

local Persistence = require(script.Persistence)
local Progression = require(script.Progression)
local Plots = require(script.Plots)
local Clearing = require(script.Clearing)

local LOG_PREFIX = "[Server]"

-- NOT IN GameConfig — how far above the plot's spawn point a character is placed, in
-- studs. The build brief states it once, in prose, in wiring.onSpawn step 3: "PivotTo the
-- spawn CFrame that plots.spawn returned for this player, raised 3 studs on Y". It is a
-- tuned spatial value with no config key, so it cannot be re-emitted; reported as such in
-- init.server.report.md.
local SPAWN_LIFT_STUDS = 3

-- The engine's names for the two character parts this file waits on. Roblox names, not
-- tuned values, so they are not config.
local HUMANOID_NAME = "Humanoid"
local ROOT_PART_NAME = "HumanoidRootPart"

-- The three channels this file touches. These are keys of Protocol.REMOTES, which exposes
-- no symbolic constant for a channel name — Protocol.channel errors on a name REMOTES does
-- not declare, so a typo here is loud at the first call rather than a nil somewhere else.
local STATE_CHANGED = "StateChanged"
local BUY_UPGRADE = "BuyUpgrade"
local REQUEST_STATE = "RequestState"

--[[
	The live per-player state, as clearing types it.

	No module in the build order owns a shared PlayerState type, so four of them declare
	their own and they do not agree: persistence types `player` as `Player?` (it constructs
	the state before server-main sets that field), while plots and clearing type it as
	`Player` (they may only ever see a state that has one). Under --!strict a table
	property is invariant, so those two are not interchangeable and the casts at the
	barrier and at every persistence call below are unavoidable. Reported as a contract
	defect rather than papered over silently: one exported type would remove every cast in
	this file.

	This alias is the LIVE state — the one in the collection, whose `player` is set. It is
	deliberately clearing's, because clearing holds the collection by reference and is the
	only dependency that names its type.
]]
type LiveState = Clearing.PlayerState

-- The state before wiring.onJoin step 2 has run: exactly what persistence.load returns,
-- with `player` still unset.
type LoadedState = Persistence.PlayerState

--[[
	THE LIVE COLLECTION — wiring.boot step 3.

	One entry per connected player, keyed by UserId. This table is created once and NEVER
	REPLACED, only mutated: clearing.start is handed it by reference at boot and holds it
	for the life of the server. Declared here because every handler below closes over it;
	nothing reads or writes it before boot step 3 hands it to clearing.

	An entry appears in onJoin only after persistence.load has returned (the barrier) and
	disappears in onLeave before the save and the teardown. A lookup miss is a return, not
	an error: it means that player is not in this server or has not finished joining.
]]
local states: Clearing.States = {}

-- UserId -> the spawn CFrame plots.spawn returned for that player, kept for as long as
-- they are here because every respawn pivots to it again. Dropped in onLeave step 4. The
-- value type is optional so that a miss is a nil the type checker can see, rather than a
-- CFrame it believes is always there.
local spawnCFrames: { [number]: CFrame? } = {}

-- UserId -> that player's CharacterAdded connection, so leaving drops the closure that
-- holds the player rather than leaving it to the collector. Not named in the wiring; see
-- the report.
local characterConnections: { [number]: RBXScriptConnection? } = {}

-- UserId -> a join that has started and not yet reached the barrier. persistence.load
-- yields, so without this a second onJoin for the same player (see the backfill at the
-- bottom of boot) would load twice and build two plots. Lifecycle bookkeeping, not state.
local joining: { [number]: boolean } = {}

--[[
	Casts between the two spellings of a PlayerState described above. They are identity at
	runtime and exist only because the modules disagree on whether `player` is optional.
	Written as two named functions rather than sprinkled `:: any` so that every place the
	disagreement costs something is greppable.
]]
local function asLive(state: LoadedState): LiveState
	return (state :: any) :: LiveState
end

local function asLoaded(state: LiveState): LoadedState
	return (state :: any) :: LoadedState
end

local function describe(player: Player): string
	return string.format("%s (%d)", player.Name, player.UserId)
end

--[[
	A snapshot of a state: exactly the fields Protocol.snapshotShape() names, in the order
	it names them, read off the state by name rather than by a field-name literal written
	here. `patches`, `cleared` and `player` never cross the wire.

	protocol exposes the field list but no builder, so this loop is the same seven lines
	clearing also has to write. Reported.
]]
local function snapshotOf(state: LiveState): { [string]: any }
	local snapshot: { [string]: any } = {}
	for _, field in ipairs(Protocol.snapshotShape()) do
		snapshot[field] = (state :: any)[field]
	end
	return snapshot
end

-- One StateChanged push. Carries a whole snapshot rather than a delta, so a duplicate is
-- idempotent and an extra push is harmless — which is what makes two originators on this
-- channel (here and clearing) safe.
local function pushSnapshot(player: Player, state: LiveState)
	Protocol.channel(STATE_CHANGED):FireClient(player, snapshotOf(state))
end

-- The player's Humanoid, or nil if there is no character up. Absent between a join and
-- the first CharacterAdded, and again for the respawn gap after a death.
local function humanoidOf(player: Player): Humanoid?
	local character = player.Character
	if character == nil then
		return nil
	end

	local humanoid = character:FindFirstChildOfClass(HUMANOID_NAME)
	if humanoid == nil or not humanoid:IsA("Humanoid") then
		return nil
	end

	return humanoid
end

--[[
	THE WRITE. The only place in the game where a computed walk speed reaches the engine.

	Called from wiring.onSpawn step 4 and wiring.onPurchase step 3, and from nowhere else.
	It takes the Humanoid rather than finding one so that the spawn path can hand over the
	one it already waited for.
]]
local function applyWalkSpeed(humanoid: Humanoid, state: LiveState)
	humanoid.WalkSpeed = Progression.walkSpeed(state)
end

--[[
	wiring.onSpawn — every CharacterAdded, including the first.

	The state and the plot both exist by the time this can run (onJoin connects this before
	it calls LoadCharacter), so there is nothing here to retry and nothing to wait for
	except the character's own parts.
]]
local function onSpawn(player: Player, character: Model)
	local userId = player.UserId

	-- 1. The player left mid-spawn: return, do nothing, do not error.
	if states[userId] == nil then
		return
	end

	-- 2. Wait for the parts. Both yield, so everything below re-reads the state.
	local humanoidInstance = character:WaitForChild(HUMANOID_NAME)
	character:WaitForChild(ROOT_PART_NAME)

	-- Re-checked after the waits: the player may have left, or died and respawned into a
	-- newer character, while this thread was yielding. Neither is an error.
	local state = states[userId]
	if state == nil or player.Character ~= character then
		return
	end

	if not humanoidInstance:IsA("Humanoid") then
		warn(string.format("%s %s has a %s named Humanoid", LOG_PREFIX, describe(player), humanoidInstance.ClassName))
		return
	end
	local humanoid = humanoidInstance

	-- 3. Arrive at the plot origin, standing in the patch that hides the first Find. This
	-- is where onboarding's guaranteed first relic is kept.
	local spawnCFrame = spawnCFrames[userId]
	if spawnCFrame ~= nil then
		character:PivotTo(spawnCFrame + Vector3.new(0, SPAWN_LIFT_STUDS, 0))
	else
		-- Should be unreachable: onJoin writes the CFrame before it connects this. Loud
		-- rather than a silent spawn at the world origin, which is off the plot entirely.
		warn(string.format("%s no spawn point held for %s; leaving the character where it loaded", LOG_PREFIX, describe(player)))
	end

	-- 4. THE WRITE.
	applyWalkSpeed(humanoid, state)

	-- 5. A refresh, not a boot: the HUD is not rebuilt on a respawn.
	pushSnapshot(player, state)
end

--[[
	wiring.onJoin — one player, from a cold state to a loaded character.

	The order is the whole point. load yields, so the state does not enter the collection
	until it has returned (step 3, the barrier) or clearing.tick can see a half-loaded
	state; the character is loaded last, so onSpawn needs no waits and no retries.
]]
local function onJoin(player: Player)
	local userId = player.UserId

	-- Not in the wiring: a re-entrancy guard for the backfill at the end of boot. See the
	-- report. A second join for a player who is already here is a bug, not a second plot.
	if joining[userId] or states[userId] ~= nil then
		return
	end
	joining[userId] = true

	-- 1. Load. Yields. Nothing else may run for this player until it returns. Never throws
	-- and never returns nil: a DataStore failure comes back as defaultState().
	local loaded: LoadedState = Persistence.load(player)

	-- Not in the wiring: load yields, so the player may have left during it. PlayerRemoving
	-- has already run and found no entry, so inserting one now would build a plot for
	-- nobody and leak it and its slot for the life of the server. See the report.
	if not player:IsDescendantOf(Players) then
		joining[userId] = nil
		return
	end

	-- 2. The only write to this field, ever.
	loaded.player = player
	local state = asLive(loaded)

	-- 3. THE BARRIER. The player becomes visible to clearing.tick at this instant and not
	-- before, which is why it is after step 1.
	states[userId] = state
	joining[userId] = nil

	-- 4. Claim a slot, build the slab, the spawn Attachment and one Instance per uncleared
	-- patch — none at all if the area is finished — and write state.patches.
	spawnCFrames[userId] = Plots.spawn(player, state)

	-- 5. May arrive before the client's HUD exists, which is why client-main also pulls one.
	pushSnapshot(player, state)

	-- 6. Safe to connect now: the state exists and the plot exists.
	characterConnections[userId] = player.CharacterAdded:Connect(function(character: Model)
		onSpawn(player, character)
	end)

	-- 7. Last. Everything onSpawn needs is now in place. Guarded because LoadCharacter
	-- throws if the player left in the last few lines, and that is not this file's error.
	local ok, err = pcall(function()
		player:LoadCharacter()
	end)
	if not ok then
		warn(string.format("%s LoadCharacter failed for %s: %s", LOG_PREFIX, describe(player), tostring(err)))
	end
end

--[[
	wiring.onPurchase — BuyUpgrade, the only client-originated message in the game.

	The client sends an id and nothing else; the server prices it. progression.tryBuy
	validates and applies, or changes nothing and returns false.
]]
local function onPurchase(player: Player, upgradeId: any)
	local state = states[player.UserId]
	if state == nil then
		-- The player is not in this server or has not finished joining. Drop it.
		return
	end

	-- Anything can arrive on a remote. Reject a payload that is not a string, silently:
	-- a malformed message is not worth a log line an exploiter can flood.
	if type(upgradeId) ~= "string" then
		return
	end

	if not Progression.tryBuy(state, upgradeId) then
		-- Nothing changed, so nothing is pushed: the server is the only writer and the
		-- client's HUD is already correct.
		return
	end

	-- UNCONDITIONALLY, whichever upgrade was bought. Gating this on upgradeId == "speed"
	-- is one line shorter and one refactor away from re-opening the trial-1 defect.
	local humanoid = humanoidOf(player)
	if humanoid ~= nil then
		applyWalkSpeed(humanoid, state)
	end
	-- No humanoid means no character is up; the next onSpawn applies the same number.

	pushSnapshot(player, state)
end

--[[
	wiring.onLeave — Players.PlayerRemoving.

	The state leaves the collection FIRST, so no tick can touch a state that is being saved
	and torn down, and the save completes BEFORE the plot is destroyed.
]]
local function onLeave(player: Player)
	local userId = player.UserId

	-- 1. Lift it out and delete the entry first.
	local state = states[userId]
	states[userId] = nil
	joining[userId] = nil

	local connection = characterConnections[userId]
	characterConnections[userId] = nil
	if connection ~= nil then
		connection:Disconnect()
	end

	if state == nil then
		-- The player never finished joining. Nothing was built and nothing is saved: the
		-- only state that existed is whatever onJoin is still holding on its own thread,
		-- and it drops it when load returns.
		return
	end

	-- 2. Save, and wait for it. Before the teardown.
	local ok, err = pcall(Persistence.save, player, asLoaded(state))
	if not ok then
		warn(string.format("%s save threw for %s on leave: %s", LOG_PREFIX, describe(player), tostring(err)))
	end

	-- 3. Destroy the slab, which takes its patches and its spawn Attachment with it, and
	-- release the slot so the next player reuses it.
	Plots.despawn(state)

	-- 4. Drop the spawn CFrame. Nothing else references the state; it is garbage.
	spawnCFrames[userId] = nil
end

--[[
	Every live state, collected into an array before anything yields.

	persistence.save yields, and joins and leaves mutate the collection during that yield;
	adding a key to a table part-way through a traversal of it is undefined in Lua. So the
	pass is taken over a snapshot of the values. A player who leaves mid-pass is saved once
	more than they need to be, which is harmless: save is idempotent.
]]
local function liveStates(): { LiveState }
	local pending: { LiveState } = {}
	for _, state in pairs(states) do
		table.insert(pending, state)
	end
	return pending
end

--[[
	wiring.onSave — one pass over everyone, serially.

	A failure warns and the pass continues; the next pass retries by existing. persistence
	warns on its own failures and returns false, so the pcall here is only for a throw it
	does not expect, which must not cost the remaining players their save.
]]
local function saveEveryone()
	for _, state in ipairs(liveStates()) do
		local player = state.player
		local ok, err = pcall(Persistence.save, player, asLoaded(state))
		if not ok then
			warn(string.format("%s save threw for %s: %s", LOG_PREFIX, describe(player), tostring(err)))
		end
	end
end

--[[
	wiring.onShutdown — game:BindToClose.

	A Studio stop returns immediately: it must not write test data to the live store under
	GameConfig.DataStoreName. Otherwise every state still in the collection is saved and
	all of them are waited for, in parallel, because the close budget is shared and N
	serial DataStore round trips are not.
]]
local function onShutdown()
	if RunService:IsStudio() then
		return
	end

	local pending = liveStates()
	local remaining = #pending
	if remaining == 0 then
		return
	end

	for _, state in ipairs(pending) do
		local player = state.player
		task.spawn(function()
			local ok, err = pcall(Persistence.save, player, asLoaded(state))
			if not ok then
				warn(string.format("%s save threw for %s on shutdown: %s", LOG_PREFIX, describe(player), tostring(err)))
			end
			remaining -= 1
		end)
	end

	while remaining > 0 do
		task.wait()
	end
end

-- RequestState, handled here because client-main may not assume the join-time push
-- arrived. A caller with no entry gets nil: they are still inside their own onJoin, and
-- the push at onJoin step 5 reaches them a moment later.
local function onRequestState(player: Player): { [string]: any }?
	local state = states[player.UserId]
	if state == nil then
		return nil
	end
	return snapshotOf(state)
end

-- ---------------------------------------------------------------------------------
-- BOOT. wiring.boot, in order, and nothing above this line runs on its own.
-- ---------------------------------------------------------------------------------

-- 1. Removes the race between a character spawning and persistence.load returning. Every
-- character in this game is loaded by onJoin step 7 instead.
Players.CharacterAutoLoads = false

-- 2. Create ReplicatedStorage.Remotes and one Instance per channel, before any player can
-- join, so a client that boots instantly finds them. protocol owns the folder name and the
-- class per channel; this file names neither.
Protocol.createRemotes()

-- 3. The live collection is the `states` table declared at the top of this file.

-- 4. Hand clearing the collection and let it install its own tick. Ticking an empty
-- collection before the first join is normal.
Clearing.start(states)

-- 5. The periodic save.
task.spawn(function()
	while true do
		task.wait(GameConfig.SaveIntervalSeconds)
		saveEveryone()
	end
end)

-- 6. Shutdown, the purchase channel and the snapshot request. Every remote is reached
-- through Protocol.channel and named in no literal anywhere else.
game:BindToClose(onShutdown)
Protocol.channel(BUY_UPGRADE).OnServerEvent:Connect(onPurchase)
Protocol.channel(REQUEST_STATE).OnServerInvoke = onRequestState

-- The player lifecycle. Not given an order of its own by the wiring; last, so that a join
-- arriving on the same frame as boot finds the remotes, the collection and the tick all in
-- place. The backfill covers a player who was already in the server when this Script first
-- ran — onJoin's own guard makes the overlap with PlayerAdded a no-op rather than a second
-- plot. See the report: neither the connections nor the backfill are in the wiring.
Players.PlayerAdded:Connect(onJoin)
Players.PlayerRemoving:Connect(onLeave)

for _, player in ipairs(Players:GetPlayers()) do
	task.spawn(onJoin, player)
end
