--!strict
--[[
	server-main — the server entry point.

	This Script IS ServerScriptService.Game; the other server modules are its children.
	Roblox is its only caller: nothing requires it, it exposes nothing, and a require
	would run this whole boot sequence a second time — a second remotes folder, a second
	clear tick.

	IT WIRES, IT DOES NOT DECIDE. Every rule in the game lives in one of the five modules
	below. What is left here is the order things happen in, the live collection of player
	states, and the two Instance writes nobody else is allowed to make:

	  * Humanoid.WalkSpeed = Progression.walkSpeed(state), on spawn and after any
	    successful purchase. progression computes and never writes, so this line is the
	    only place the Pace upgrade reaches the engine. Without it, Pace is purchasable
	    and does nothing.
	  * character:PivotTo(the spawn CFrame plots.spawn returned), on every CharacterAdded
	    — including the one a death causes.

	THE OTHER THING THAT ONLY HAPPENS HERE IS RESPAWNING. Players.CharacterAutoLoads is
	false, which makes the engine's own Players.RespawnTime dead and hands the whole
	respawn to this file. onDeath below is the only second LoadCharacter in the game; the
	first playtest found nobody had been handed it, and a player who died stayed dead for
	the rest of the session.

	Every remote is reached through Protocol.channel(name). No remote Instance is created,
	named or searched for here.

	No `return`: an entry point is not a module. See the note at the foot of the file.
]]

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")

-- wiring.boot STEP 1, and it is here rather than down in the boot block at the foot of the
-- file because the line below this one yields. WaitForChild and the four requires are the
-- first yield of the server's life, and a player admitted inside it would auto-load a
-- character at the world origin before their plot exists — which is the exact race this
-- step is here to remove. The remaining five steps are together at the foot of the file.
Players.CharacterAutoLoads = false

local Shared = ReplicatedStorage:WaitForChild("UIForge")
local GameConfig = require(Shared.GameConfig)
local Protocol = require(Shared.Protocol)

local Persistence = require(script.Persistence)
local Progression = require(script.Progression)
local Plots = require(script.Plots)
local Clearing = require(script.Clearing)

local LOG_PREFIX = "[server-main]"

-- NOT IN GameConfig. How far above the plot's spawn Attachment a character is placed, in
-- studs. wiring.onSpawn states it as "raised 3 studs on Y" and representation's
-- spawn-anchor note repeats it, but the emitter produces no key for it, so re-emitting
-- the config cannot change it. Named here rather than spelled inline at the pivot, and
-- reported as a config gap in init.server.report.md.
local SPAWN_PIVOT_Y = 3

-- Keys of Protocol.REMOTES. Protocol exposes no symbolic constant for a channel name —
-- REMOTES is keyed by the names themselves — so a name has to be written once somewhere.
-- Written once here, at the top, rather than at each call site; Protocol.channel errors on
-- a name it does not declare, so a typo is loud at boot rather than a nil later.
local STATE_CHANGED = "StateChanged"
local BUY_UPGRADE = "BuyUpgrade"
local REQUEST_STATE = "RequestState"

--[[
	One patch record and one player's whole state, from 03-state-shape.md.

	Restated here rather than imported: persistence owns the canonical PlayerState but no
	module in the build order exports a type this file can name without the require
	resolving, and clearing restates it for the same reason. `player` is optional exactly
	as persistence declares it — defaultState leaves it unset and onJoin is the only writer.
]]
type Patch = {
	position: Vector3,
	tierIndex: number,
	relic: string?,
	cleared: boolean,
	instance: BasePart?,
}

type PlayerState = {
	currency: number,
	upgrades: { [string]: number },
	patches: { Patch },
	cleared: { [number]: boolean },
	clearedCount: number,
	found: { [string]: boolean },
	areaComplete: boolean,
	player: Player?,
}

-- wiring.boot step 3: THE live collection, one entry per connected player, keyed by
-- UserId. Created once and NEVER REPLACED, only mutated — clearing.start is handed this
-- exact table at boot and holds it by reference for the life of the server. Declared at
-- file scope because every handler below closes over it.
--
-- A player is in here from the instant persistence.load returns and state.player is set
-- (onJoin step 3, the publish point) until the instant onLeave lifts them out, and that
-- window is exactly the window in which clearing.tick may see them. A lookup miss is a
-- return, never an error: it means that player is not in this server or has not finished
-- joining.
local states: { [number]: PlayerState } = {}

-- The spawn CFrame plots.spawn returned for each connected player, keyed by UserId. Held
-- here rather than on PlayerState because it is neither persisted nor part of a snapshot,
-- and because plots recovers the slot from its own registry. Dropped in onLeave step 4.
local spawnPoints: { [number]: CFrame } = {}

-- UserIds whose join is in flight. persistence.load yields, so without this a second
-- PlayerAdded for the same UserId — or the GetPlayers sweep at the foot of this file
-- racing the connection made one line above it — could run two joins for one player and
-- build two plots. Cleared on every exit path out of the join.
local joining: { [number]: boolean } = {}

local function describe(player: Player): string
	return string.format("%s (%d)", player.Name, player.UserId)
end

--[[
	A snapshot of a state: exactly the fields Protocol.snapshotShape() names, read off the
	state by name rather than by a field-name literal written here, so adding a field is an
	edit to Protocol and to nothing else. patches, cleared and player never cross the wire.
]]
local function snapshotOf(state: PlayerState): { [string]: any }
	local snapshot: { [string]: any } = {}
	-- Annotated because the analyzer cannot resolve an instance require and so types the
	-- whole of Protocol as `any`; the contract says this returns { string }.
	local fields: { string } = Protocol.snapshotShape()
	for _, field in ipairs(fields) do
		snapshot[field] = (state :: any)[field]
	end
	return snapshot
end

-- One StateChanged push. Fired from three places in this file — on join, on spawn and
-- after a successful purchase — and by clearing on any tick that changed something. Two
-- originators is safe because the payload is a whole snapshot, so a duplicate is
-- idempotent.
local function pushSnapshot(player: Player, state: PlayerState)
	Protocol.channel(STATE_CHANGED):FireClient(player, snapshotOf(state))
end

-- The player's live Humanoid, or nil if there is no character up: between a join and the
-- first CharacterAdded, and again for the respawn gap after a death. Does not yield, so a
-- purchase is never held up waiting for a corpse to be replaced.
local function humanoidOf(player: Player): Humanoid?
	local character = player.Character
	if character == nil then
		return nil
	end
	local humanoid = character:FindFirstChildOfClass("Humanoid")
	if humanoid == nil or not humanoid:IsA("Humanoid") then
		return nil
	end
	return humanoid
end

--[[
	THE ONE LINE THAT MAKES THE PACE UPGRADE REAL.

	progression.walkSpeed computes a number and writes nothing; this is the only place in
	the game the value reaches the engine. Called on every spawn — which includes every
	respawn after a death — and after every successful purchase, unconditionally, whichever
	axis was bought. Gating it on upgradeId == "speed" is one line shorter and one refactor
	away from re-opening the defect the first build trial found.
]]
local function applyWalkSpeed(humanoid: Humanoid, state: PlayerState)
	humanoid.WalkSpeed = Progression.walkSpeed(state)
end

--[[
	wiring.onDeath. The only second LoadCharacter in the game.

	Nothing is torn down during the wait: the state stays in the live collection so the
	periodic save still writes it, the plot stays built, and clearing.tick keeps visiting
	the state and takes the character-or-HumanoidRootPart skip it already has. No death
	test is added to the tick, deliberately — a corpse does not move, and everything inside
	its clear radius was cleared while it was alive.

	Nothing else re-runs: no plot is rebuilt, no slot re-claimed, no state re-loaded and no
	currency touched. plots.spawn and persistence.load belong to onJoin and are not
	reachable from here, which is why death costs a player nothing but the delay.
]]
local function onDeath(player: Player)
	task.wait(GameConfig.RespawnDelaySeconds)

	-- AFTER the wait, both tests, in this order. If either fails the player left during
	-- the delay and this phase does NOTHING — no LoadCharacter, no warn, no error. onLeave
	-- has already saved and despawned them, and LoadCharacter on a departed player is the
	-- one way this handler can throw.
	if states[player.UserId] == nil then
		return
	end
	if player.Parent ~= Players then
		return
	end

	-- The CharacterAdded connection from onJoin step 6 is still live, so onSpawn runs
	-- again in full: pivot, WalkSpeed, a Died connection on the new Humanoid, a snapshot.
	player:LoadCharacter()
end

--[[
	wiring.onSpawn. Runs on every CharacterAdded, which is the one onJoin loads and every
	one onDeath loads after it.
]]
local function onSpawn(player: Player, character: Model)
	-- 1. If the state is absent the player left mid-spawn: return, do nothing, do not error.
	local state = states[player.UserId]
	if state == nil then
		return
	end

	-- 2. "Humanoid" and "HumanoidRootPart" are engine names, not tuned values, so they are
	-- literals rather than config. Both waits yield, so the state is re-tested below before
	-- anything is written.
	local humanoidInstance = character:WaitForChild("Humanoid")
	character:WaitForChild("HumanoidRootPart")

	if states[player.UserId] ~= state then
		return
	end
	if not humanoidInstance:IsA("Humanoid") then
		warn(string.format("%s %s spawned with a non-Humanoid named Humanoid", LOG_PREFIX, describe(player)))
		return
	end
	local humanoid = humanoidInstance

	-- 3. Connected BEFORE the pivot, so a character that somehow dies during the same frame
	-- it spawned still respawns. Once for THIS character: a Humanoid dies at most once and
	-- every new character brings a new one, so this leaks nothing and needs no disconnect.
	humanoid.Died:Once(function()
		onDeath(player)
	end)

	-- 4. The plot origin, raised on Y. This is where onboarding's guaranteed first Find is
	-- kept: the player arrives standing in the patch that hides the first Find of set one.
	local spawnCFrame = spawnPoints[player.UserId]
	if spawnCFrame ~= nil then
		character:PivotTo(spawnCFrame + Vector3.new(0, SPAWN_PIVOT_Y, 0))
	else
		-- The state exists but the plot's spawn point does not, which onJoin's ordering
		-- makes unreachable. Loud rather than a character silently left wherever Roblox
		-- dropped it, which is off the row of plots entirely.
		warn(string.format("%s no spawn point held for %s; character left unmoved", LOG_PREFIX, describe(player)))
	end

	-- 5. THE WRITE. See applyWalkSpeed.
	applyWalkSpeed(humanoid, state)

	-- 6. A refresh, not a boot: the HUD is not rebuilt on a respawn. It runs after a death
	-- respawn too, because the client's ScreenGui survived and one idempotent snapshot is
	-- cheaper than reasoning about whether it needed one.
	pushSnapshot(player, state)
end

--[[
	wiring.onJoin, steps 1-7, in order. Wrapped by joinPlayer below.
]]
local function runJoin(player: Player)
	-- 1. Yields. Nothing else may run for this player until it returns, and in particular
	-- the state may not enter the collection, or clearing.tick can see it half-loaded.
	local state: PlayerState = Persistence.load(player)

	-- NOT IN wiring: load yields for as long as a DataStore call takes, so the player may
	-- already be gone. Publishing them now would leave a state nothing ever removes — saved
	-- every 45s forever, holding a plot slot that is never released. Aborting here is safe
	-- precisely because nothing has been published or built yet, and it is the same test
	-- onDeath makes after its own wait.
	if player.Parent ~= Players then
		return
	end

	-- 2. The only write to this field, ever.
	state.player = player

	-- 3. THE PUBLISH POINT. The player becomes visible to clearing.tick at this instant and
	-- not before, which is why it is after step 1.
	states[player.UserId] = state

	-- 4. Claims a slot and builds the plot, its barriers, its spawn Attachment and one
	-- Instance per uncleared patch — none at all if areaComplete is true. Returns the spawn
	-- CFrame, which is kept until the player leaves.
	spawnPoints[player.UserId] = Plots.spawn(player, state)

	-- 5. May arrive before the client's HUD exists, which is why client-main also pulls one.
	pushSnapshot(player, state)

	-- 6. Safe to connect now: the state exists and the plot exists. This connection is what
	-- onDeath relies on, so it is made once per player and never disconnected.
	player.CharacterAdded:Connect(function(character: Model)
		onSpawn(player, character)
	end)

	-- 7. Last. Everything onSpawn needs is now in place, so onSpawn needs no waits and no
	-- retries. Guarded because plots.spawn's contract does not say whether it yields; if it
	-- did and the player left inside it, onLeave has already run and LoadCharacter on a
	-- departed player throws.
	if states[player.UserId] == nil then
		spawnPoints[player.UserId] = nil
		return
	end
	player:LoadCharacter()
end

local function joinPlayer(player: Player)
	local userId = player.UserId
	if joining[userId] or states[userId] ~= nil then
		return
	end
	joining[userId] = true

	-- pcall so that one player's failed join cannot take the PlayerAdded handler with it.
	-- A join that throws after the publish point leaves a state with no plot; nothing
	-- recovers it, but the warning names the player and the next rejoin is clean.
	local ok, err = pcall(runJoin, player)

	joining[userId] = nil

	if not ok then
		warn(string.format("%s join failed for %s: %s", LOG_PREFIX, describe(player), tostring(err)))
	end
end

--[[
	wiring.onLeave. The order is the point: out of the collection, then save, then tear the
	plot down.
]]
local function onLeave(player: Player)
	local userId = player.UserId

	-- 1. Lift the state out FIRST, so no tick can touch a state that is being saved and
	-- torn down. No entry means the player never finished joining.
	local state = states[userId]
	states[userId] = nil
	if state == nil then
		return
	end

	-- 2. Save, and wait for it. Before teardown. persistence.save pcalls its own write and
	-- warns on a failure, so its boolean is not re-reported here; the pcall is for a throw
	-- it cannot catch itself, which must not stop the plot being destroyed.
	local ok, err = pcall(Persistence.save, player, state)
	if not ok then
		warn(string.format("%s save failed on leave for %s: %s", LOG_PREFIX, describe(player), tostring(err)))
	end

	-- 3. Destroys the plot slab, which takes its patches, its barriers and its spawn
	-- Attachment with it, and releases the slot so the next player reuses it.
	Plots.despawn(state)

	-- 4. Nothing else references the state; it is garbage.
	spawnPoints[userId] = nil
end

--[[
	wiring.onPurchase. The only client-originated message in the game.
]]
local function onPurchase(player: Player, upgradeId: any)
	-- 1. Reject any payload that is not a string, and drop the message if the player has no
	-- state. Any further arguments the client sent are ignored by this signature: the
	-- channel carries one id and nothing else.
	if type(upgradeId) ~= "string" then
		return
	end
	local state = states[player.UserId]
	if state == nil then
		return
	end

	-- 2. Validate and apply, or change nothing and return false. The server prices it; the
	-- client sent only an id.
	if not Progression.tryBuy(state, upgradeId) then
		return
	end

	-- 3. On success only, and unconditionally — whichever axis was bought. A player with no
	-- Humanoid right now is mid-respawn, and onSpawn writes it again from the same function
	-- the moment the new character is up.
	local humanoid = humanoidOf(player)
	if humanoid ~= nil then
		applyWalkSpeed(humanoid, state)
	end

	-- 4. On success only. On failure send nothing: the server is the only writer, so the
	-- client's HUD is already correct.
	pushSnapshot(player, state)
end

--[[
	RequestState. client-main may not assume the join-time push arrived, so it pulls once
	after its updater is live.

	Returns nil for a player with no state — one who has not finished joining. A lookup miss
	is a return, not an error, and it is self-correcting: client-main connects its
	StateChanged handler BEFORE it invokes this, so the join-time push reaches the same
	updater as soon as load returns.
]]
local function onRequestState(player: Player): { [string]: any }?
	local state = states[player.UserId]
	if state == nil then
		return nil
	end
	return snapshotOf(state)
end

-- A detached list of what is in the collection right now. Taken before any save, because
-- persistence.save yields and joins and leaves mutate the collection in that window;
-- walking a table with pairs while it is being added to is undefined.
type Entry = { userId: number, state: PlayerState, player: Player }

local function connectedEntries(): { Entry }
	local entries: { Entry } = {}
	for userId, state in pairs(states) do
		local player = state.player
		if player ~= nil then
			table.insert(entries, { userId = userId, state = state, player = player })
		end
	end
	return entries
end

-- One save, skipped if the player left while an earlier save in the same pass was yielding.
-- Re-tested against the collection by identity, not just by key, so a rejoin inside the
-- same pass cannot have the departed session's state written over it.
local function saveEntry(entry: Entry, reason: string)
	if states[entry.userId] ~= entry.state then
		return
	end
	local ok, err = pcall(Persistence.save, entry.player, entry.state)
	if not ok then
		warn(string.format("%s %s save failed for %s: %s", LOG_PREFIX, reason, describe(entry.player), tostring(err)))
	end
end

--[[
	wiring.onSave. Every GameConfig.SaveIntervalSeconds, for every state in the collection.
	A failure warns and the loop continues; the next pass retries by existing.

	Waits first, so the first pass lands after the rest of boot rather than during it.
	Sequential rather than one thread per player: the pass is not urgent, and a burst of
	concurrent SetAsync calls is how a busy server meets the DataStore request budget.
]]
local function startSaveLoop()
	task.spawn(function()
		while true do
			task.wait(GameConfig.SaveIntervalSeconds)
			for _, entry in ipairs(connectedEntries()) do
				saveEntry(entry, "periodic")
			end
		end
	end)
end

--[[
	wiring.onShutdown. A Studio stop must not write test data to the live store under
	GameConfig.DataStoreName, so it returns immediately; otherwise every state still in the
	collection is saved and waited for.

	One thread per player and a pending count, rather than one after another: BindToClose
	has a fixed budget for the whole server, and a full house of sequential yielding writes
	is how the last player in the loop loses their session. No timeout of our own — the
	engine's own limit on BindToClose is the only one, and inventing a second number here
	would be inventing a value.
]]
local function onShutdown()
	if RunService:IsStudio() then
		return
	end

	local pending = 0
	for _, entry in ipairs(connectedEntries()) do
		pending += 1
		task.spawn(function()
			saveEntry(entry, "shutdown")
			pending -= 1
		end)
	end

	while pending > 0 do
		task.wait()
	end
end

-- wiring.boot, in order.

-- 1. Players.CharacterAutoLoads = false is at the head of the file, above the requires:
-- see the note there. It removes the race between a character spawning and
-- persistence.load returning, and it also makes the engine's own Players.RespawnTime dead,
-- which is why onDeath exists at all.

-- 2. protocol creates the Folder and one Instance per channel, so the folder name and the
-- class per channel live in the module that owns the names. Before any player can join, so
-- a client that boots instantly finds them.
Protocol.createRemotes()

-- 3. The live collection is created at file scope above, before any of the handlers that
-- close over it and before step 4 hands it to clearing.

-- 4. clearing installs its own GameConfig.ClearTickRate loop. Ticking an empty collection
-- before the first join is normal.
Clearing.start(states)

-- 5.
startSaveLoop()

-- 6. Every remote in this file is reached through Protocol.channel and named in no literal
-- anywhere else.
game:BindToClose(onShutdown)
Protocol.channel(BUY_UPGRADE).OnServerEvent:Connect(onPurchase)
Protocol.channel(REQUEST_STATE).OnServerInvoke = onRequestState

-- wiring.boot does not say where the two Players signals are connected. Last, after every
-- step above, so the first join cannot land on a half-built boot.
Players.PlayerAdded:Connect(joinPlayer)
Players.PlayerRemoving:Connect(onLeave)

-- Anyone already here. wiring asserts that step 2 happens "before any player can join", so
-- on paper this list is empty; it is swept anyway because with CharacterAutoLoads false a
-- player who slipped in ahead of this Script would otherwise never get a character at all,
-- and would sit in the sky for the session. joinPlayer's `joining` guard is what makes the
-- sweep safe alongside the connection made two lines above it.
for _, player in ipairs(Players:GetPlayers()) do
	task.spawn(joinPlayer, player)
end

-- No `return` statement, deliberately. The brief's generic instruction says a module
-- returns a table, but this module's own contract says it exposes nothing and that no
-- module may require it — entryPoint true, exposes empty. Roblox refuses to require a
-- Script in any case, so a returned table would be unreachable decoration that reads as an
-- invitation. Recorded in init.server.report.md.
