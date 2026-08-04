--!strict
--[[
	server-main — the server entry point.

	WIRING AND NOTHING ELSE. Every rule in this game lives in one of the nine modules
	below; this file decides only what runs, for whom, and in what order. If a line here
	starts to look like a rule, it belongs in a module — the one exception is the WalkSpeed
	write, which is wiring by definition because response.humanoidWritesAllowed is exactly
	["WalkSpeed"] and THIS IS THE ONLY HUMANOID PROPERTY WRITE IN THE GAME.

	THE PHASES, in the order wiring names them:

	  boot      world.configure, CharacterAutoLoads off, the remotes, the live collection,
	            the clear tick, the save loop, and the three input bindings.
	  onJoin    load, resolve entitlements, catch up the upgrade rows, publish, build the
	            lane, push a snapshot, connect CharacterAdded, load the character. In that
	            order: the two yielding calls come before the publish point, because
	            clearing.tick may not see a half-loaded state.
	  onSpawn   collision group, the death connection, the pivot, WalkSpeed, the tool, a
	            snapshot.
	  onDeath   wait, re-test, load a second character. THIS IS THE ONLY PLACE IN THE GAME
	            THAT LOADS ONE: CharacterAutoLoads is false, so without this phase a player
	            who used the Roblox menu's Reset Character stayed dead for the session.
	  onPurchase  tryBuy, then — on success only, unconditionally, whichever upgrade it
	            was — WalkSpeed, the tool head, UpgradeApplied, StateChanged.
	  onSave    every runtime.saveIntervalSeconds, every live state.
	  onLeave   lift out of the collection FIRST, save, destroy the lane, drop the pose.
	  onShutdown  every live state. The Studio guard is inside persistence.save, not here.

	FOUR THINGS HERE ARE STRUCTURAL AND EACH ONE WAS A DEFECT SOMEWHERE:

	  1. THE RESPAWN POSE FOLLOWS THE LIVE BAY. `plots.spawn` returns the join pose;
	     `plots.advance` returns a new one every time an area finishes, and it is called
	     from inside clearing's tick, which discards the return value. So the pose is
	     re-derived here on every spawn from `state.spawnPivot` — the same Attachment
	     position `plots` writes on both paths — keeping the rotation of the pose plots
	     handed over at join, which is a function of the slot alone and so never changes
	     while the player is connected. Without this a player who dies after finishing an
	     area respawns in a bare finished bay up to 2,992 studs outward of the live one,
	     with nothing to clear and no way back.

	  2. WALKSPEED COMES FROM `Modifiers.effective(state, "speed")` AND FROM NOWHERE ELSE.
	     There is no `progression.walkSpeed`: the modifiers refactor removed it, and this
	     line is the only place the Pace upgrade — and any set or purchase factor on the
	     speed axis — reaches the engine.

	  3. `world.configure()` IS FIRST AND DOES NOT YIELD, so that
	     `Players.CharacterAutoLoads = false` lands on the same frame. A player joining
	     between the two would auto-load a character into a place with no collision group
	     and be in the wrong group for that character's whole life.

	  4. UpgradeApplied IS FIRED BEFORE StateChanged, and only on success.
	     response.beats[upgradePurchased].effectAppliedBeforeAcknowledgment is true and the
	     200 ms budget is measured from that packet; a failed buy sends neither, because
	     input.verbs[buy].onPreconditionFail is silentNoOp.

	Every remote is reached through `Protocol.channel(name)`; nothing here searches the
	tree for one, and no remote is created here. Every cadence comes from GameConfig.
]]

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local Shared = ReplicatedStorage:WaitForChild("UIForge")

local GameConfig = require(Shared.GameConfig) :: any
local Layout = require(Shared.Layout)
local Modifiers = require(Shared.Modifiers)
local Protocol = require(Shared.Protocol)
local Types = require(Shared.Types)

local Clearing = require(script.Clearing)
local Entitlements = require(script.Entitlements)
local Persistence = require(script.Persistence)
local Plots = require(script.Plots)
local Progression = require(script.Progression)
local Tool = require(script.Tool)
local World = require(script.World)

-- The generated shapes, not copies of them. Types.luau owns PlayerState and States.
type PlayerState = Types.PlayerState
type States = Types.States

-- Exactly the blocks of GameConfig this file reads, so a strict checker has a shape
-- across a require it cannot resolve. The same device Clearing and Modifiers use.
type ConfigShape = {
	SaveIntervalSeconds: number,
	RespawnDelaySeconds: number,
}

local Config: ConfigShape = GameConfig

-- The channels this file originates or handles, as keys of Protocol.REMOTES. That table
-- exposes no symbolic constant for a name and Protocol.channel errors on a name it does
-- not declare, so a typo here is loud at the first call rather than a nil somewhere else.
local CHANNEL_STATE_CHANGED = "StateChanged"
local CHANNEL_UPGRADE_APPLIED = "UpgradeApplied"
local CHANNEL_BUY_UPGRADE = "BuyUpgrade"
local CHANNEL_REQUEST_STATE = "RequestState"

-- The one axis this file reads. modifiers.axisIdsJoinUpgrades: an axis id is an
-- upgrades[].id verbatim, and "Pace is a label and never an id".
local SPEED_AXIS = "speed"

-- Engine names, not tuned values: the two children of a character this phase waits for.
local HUMANOID_NAME = "Humanoid"
local ROOT_PART_NAME = "HumanoidRootPart"

-- The two DERIVED snapshot fields. Six of the eight names Protocol.snapshotShape() gives
-- are read straight off the state; these two are layout.areaSpec(areasFinished + 1)'s and
-- are spelled here because a loop that copies state[field] emits nil for exactly these.
local FIELD_AREA_PATCH_COUNT = "areaPatchCount"
local FIELD_AREA_LABEL = "areaLabel"

-- wiring.onSpawn step 5: "PivotTo the spawn CFrame plots returned for this player, raised
-- 3 studs on Y". The 3 is stated in the wiring and in no GameConfig key, so it is named
-- once here rather than written into the PivotTo call. Reported.
local SPAWN_LIFT_STUDS = 3

--[[
	THE LIVE COLLECTION — stateShape.collection.

	One PlayerState per connected player, keyed by UserId as an integer, owned by this
	file. Created once at boot and NEVER REPLACED, only mutated: clearing holds this exact
	table by reference from clearing.start onwards. A lookup miss means the player is not
	in this server or has not finished joining, and it is a return, not an error.
]]
local states: States = {}

--[[
	The pose each connected player's character is put at, keyed by UserId.

	Seeded from plots.spawn's return at join and re-derived from state.spawnPivot on every
	spawn, which is what carries a finished area's new bay into the respawn — see note 1 in
	the header. Dropped in onLeave, so this table is exactly as large as `states`.
]]
local spawnPoses: { [number]: CFrame } = {}

-- One CharacterAdded connection per connected player, disconnected on leave. The Player
-- Instance is destroyed on leave and would take the connection with it; holding them is
-- what makes that explicit rather than incidental.
local characterConnections: { [number]: RBXScriptConnection } = {}

-- Guards the join path against running twice for one player: the boot catch-up below and
-- Players.PlayerAdded can both name the same player in the frame the server starts.
local joining: { [number]: boolean } = {}

--[[
	A snapshot of a state: exactly the fields Protocol.snapshotShape() names, in the order
	it names them, read off the state by name rather than by a field-name literal here.

	SIX ARE COPIED AND TWO ARE DERIVED. patches, cleared, spawnPivot, owned, armState and
	player never cross the wire.

	This is the second implementation of this function in the build — clearing has the
	other, private to itself. Nothing exposes one, and the derivation has to agree on both
	sides or the progress readout changes meaning depending on which push it came from.
	Reported.
]]
local function buildSnapshot(state: PlayerState): { [string]: any }
	local spec = Layout.areaSpec(state.areasFinished + 1)
	local snapshot: { [string]: any } = {}

	-- Annotated because the require above is an instance path the analyser cannot follow,
	-- so the returned list would otherwise be `unknown` and every index below with it.
	local fields: { string } = Protocol.snapshotShape()

	for _, field in ipairs(fields) do
		if field == FIELD_AREA_PATCH_COUNT then
			snapshot[field] = spec.patchCount
		elseif field == FIELD_AREA_LABEL then
			snapshot[field] = spec.label
		else
			snapshot[field] = (state :: any)[field]
		end
	end

	return snapshot
end

-- One push on StateChanged. Whole-snapshot and therefore idempotent, which is what makes
-- two originators on this channel safe and why an extra push is never worth avoiding.
local function pushSnapshot(player: Player, state: PlayerState)
	Protocol.channel(CHANNEL_STATE_CHANGED):FireClient(player, buildSnapshot(state))
end

--[[
	The pose this player's next character is put at, in world space.

	`plots.spawn` returned one at join and `plots.advance` returns a new one every time an
	area finishes — but advance is called from inside clearing's tick and its return value
	has no receiver, so the pose cannot arrive here by being handed over. It is rebuilt
	instead from state.spawnPivot, which BOTH plots functions write with the same
	Attachment's world position, keeping the rotation of the pose held for this player.

	That rotation is plots.spawn.lookVector, a function of the lane slot alone: the slot is
	claimed at join and held for the whole connected session, so the rebuilt pose is exactly
	the CFrame advance returned. When nothing has moved, it is exactly the join pose.
]]
local function respawnPose(player: Player, state: PlayerState): CFrame?
	local held = spawnPoses[player.UserId]
	local pivot = state.spawnPivot

	if held == nil then
		-- No lane was ever built for this player. Nothing to pivot to; the caller warns.
		return nil
	end
	if pivot == nil then
		-- plots clears the pivot in despawn, and writes it before any character loads, so
		-- this is the lane being torn down underneath a spawn rather than a case with a
		-- behaviour. The join pose is the best available answer and is still on this lane.
		return held
	end

	local pose = CFrame.new(pivot) * held.Rotation
	spawnPoses[player.UserId] = pose
	return pose
end

--[[
	THE ONE HUMANOID PROPERTY WRITE IN THE GAME.

	modifiers computes and never writes; this is the only place the speed axis reaches the
	engine. Called on every spawn and after EVERY successful purchase, unconditionally,
	whichever upgrade was bought — gating it on upgradeId == "speed" is one line shorter
	and one refactor away from re-opening the defect trial 1 found.

	A missing character or Humanoid is a return: a purchase can land during the respawn
	delay, when the state is live and the character is not, and the spawn that follows
	writes the same value from the same source.
]]
local function applyWalkSpeed(player: Player, state: PlayerState)
	local character = player.Character
	if character == nil then
		return
	end
	local humanoid = character:FindFirstChildOfClass(HUMANOID_NAME) :: Humanoid?
	if humanoid == nil then
		return
	end
	humanoid.WalkSpeed = Modifiers.effective(state, SPEED_AXIS)
end

--[[
	wiring.onDeath. The only thing in the game that loads a second character.

	traversal.death.possibleByDesign is false and damageSources is 0, so the only route
	here is the Roblox menu's Reset Character — which is available to every player in every
	session, which is why "a player who dies stays dead" was a shipped defect and not an
	unreachable one.

	NOTHING IS TORN DOWN DURING THE WAIT: the state stays in the live collection so the
	save loop still writes it, the lane stays built, and clearing.tick keeps visiting the
	state and takes the character-or-root skip it already has.

	The arming gate resets by itself — clearing.tick sees a character it has not armed for
	and rewrites state.armState — so nothing here touches it.
]]
local function onDeath(character: Model)
	local player = Players:GetPlayerFromCharacter(character)
	if player == nil then
		-- The player left before their Humanoid's Died reached this line. Nothing to
		-- respawn, and nothing to warn about.
		return
	end

	task.wait(Config.RespawnDelaySeconds)

	-- AFTER the wait, both tests, in this order. If either fails the player left during
	-- the delay and this phase does nothing at all: no LoadCharacter, no warn, no error.
	if states[player.UserId] == nil then
		return
	end
	if player.Parent ~= Players then
		return
	end

	-- The CharacterAdded connection from onJoin is still live, so onSpawn runs again in
	-- full. Nothing else re-runs: no lane rebuilt, no slot re-claimed, no state re-loaded,
	-- no ownership re-resolved, no currency touched.
	player:LoadCharacter()
end

--[[
	wiring.onSpawn. Runs for the character onJoin loads and for every character onDeath
	loads after it, and needs no waits and no retries beyond the character's own parts:
	the state exists and the lane exists before CharacterAdded is ever connected.
]]
local function onSpawn(player: Player, character: Model)
	local state = states[player.UserId]
	if state == nil then
		-- The player left mid-spawn. Return, do nothing, do not error.
		return
	end

	-- No timeout on either wait: the wiring names neither, and a number invented here
	-- would be a tuning value nobody stated. A character that never gets a Humanoid is
	-- destroyed with its player, and this thread dies with it.
	local humanoidChild = character:WaitForChild(HUMANOID_NAME)
	character:WaitForChild(ROOT_PART_NAME)
	local humanoid = humanoidChild :: Humanoid

	-- Before the pivot, so two characters never overlap while still colliding.
	World.onCharacter(character)

	-- Connected for THIS character, BEFORE the pivot, so a character that somehow dies in
	-- the frame it spawned still respawns. A Humanoid dies at most once and every new
	-- character brings a new one, so this leaks nothing and needs no disconnect.
	humanoid.Died:Connect(function()
		onDeath(character)
	end)

	local pose = respawnPose(player, state)
	if pose ~= nil then
		character:PivotTo(pose + Vector3.new(0, SPAWN_LIFT_STUDS, 0))
	else
		warn(
			`server-main: no spawn pose is held for {player.Name} ({player.UserId}); the character `
				.. `was left where the engine put it`
		)
	end

	-- The one Humanoid property write in the game.
	applyWalkSpeed(player, state)

	-- tool.grantedAt is "spawn", so this runs on every character including the one onDeath
	-- loads. equip calls refresh itself, so the head width is right on the first frame.
	Tool.equip(player, state)

	-- A refresh, not a boot: the client's ScreenGui survives a respawn, and one idempotent
	-- snapshot is cheaper than reasoning about whether it needed one.
	pushSnapshot(player, state)
end

--[[
	wiring.onJoin. Two yielding calls, then the publish point, then the lane, then the
	character — last, so onSpawn needs no waits of its own.

	THE PUBLISH POINT IS STEP 5 AND NOT EARLIER: clearing.tick reading a state whose owned
	map is still empty pays the unpurchased multiplier for as long as the web call takes.
]]
local function onJoin(player: Player)
	if joining[player.UserId] then
		return
	end
	joining[player.UserId] = true

	-- (1) Yields. Never throws, never returns nil: a DataStore failure warns inside
	-- persistence and returns defaultState(), so the player is playable on a fresh session
	-- rather than stuck at a loading screen that does not exist.
	local state: PlayerState = Persistence.load(player)

	-- (2) Yields. Resolves state.owned before the state is visible to the tick.
	Entitlements.refresh(player, state)

	-- Both yields are behind us, so this is the first moment the player can have left
	-- since PlayerRemoving fired. Publishing a state for a player who is gone would leave
	-- an entry and a lane nothing ever removes: onLeave has already run and found nothing.
	-- The wiring does not name this test; it is the mirror of the one onDeath step 3 does.
	if player.Parent ~= Players then
		joining[player.UserId] = nil
		return
	end

	-- (3) Catch up any row whose level-1 cost the loaded balance already meets. Idempotent
	-- and never lowers one.
	Progression.revealRows(state)

	-- (4) The only write to this field, ever.
	state.player = player

	-- (5) THE PUBLISH POINT. The player becomes visible to clearing.tick at this instant.
	states[player.UserId] = state
	joining[player.UserId] = nil

	-- (6) Claim a slot and build the lane for live area state.areasFinished + 1. Writes
	-- state.patches and state.spawnPivot; the CFrame is this player's pose until they
	-- leave, re-derived against the live bay on every spawn.
	spawnPoses[player.UserId] = Plots.spawn(player, state)

	-- (7) May arrive before the client's HUD exists, which is why client-main also pulls.
	pushSnapshot(player, state)

	-- (8) Safe to connect now: the state exists and the lane exists.
	characterConnections[player.UserId] = player.CharacterAdded:Connect(function(character: Model)
		onSpawn(player, character)
	end)

	-- (9) Last. A player who left between the publish point and here is gone from Players
	-- and LoadCharacter would error on them.
	if player.Parent == Players then
		player:LoadCharacter()
	end
end

--[[
	wiring.onLeave. The collection entry goes FIRST, so no tick can touch a state that is
	being saved and torn down.

	Nothing about a departure is perceptible to any remaining player: no notice, no sound
	and no string naming anyone.
]]
local function onLeave(player: Player)
	local userId = player.UserId
	joining[userId] = nil

	local connection = characterConnections[userId]
	if connection ~= nil then
		connection:Disconnect()
		characterConnections[userId] = nil
	end

	local state = states[userId]
	if state == nil then
		-- The player never finished joining. There is no lane and nothing to save.
		spawnPoses[userId] = nil
		return
	end
	states[userId] = nil

	-- Save, and wait for it. Before teardown.
	Persistence.save(player, state)

	-- Destroys the slab, which takes its patches, its four boundary parts and its spawn
	-- Attachment with it, and releases the slot for the next player.
	Plots.despawn(state)

	-- Nothing else references the state; it is garbage.
	spawnPoses[userId] = nil
end

--[[
	wiring.onPurchase. The server prices it; the client sent only an id.

	economy.authority: no client message carries a cost, an amount or a balance, and this
	handler enforces that by accepting nothing else.
]]
local function onPurchase(player: Player, upgradeId: any)
	local state = states[player.UserId]
	if state == nil then
		-- Not in this server, or not finished joining. Drop the message.
		return
	end
	if type(upgradeId) ~= "string" then
		-- Anything that is not one string is not a message this game has. Dropped
		-- silently: a warn here is a log a client can fill on demand.
		return
	end

	-- (2) Validate and apply, or change nothing and return false. On false the phase ENDS
	-- HERE: nothing is sent, nothing is played, nothing is shown.
	if not Progression.tryBuy(state, upgradeId) then
		return
	end

	-- (3) and (4). Both unconditional, whichever upgrade was bought: a gate on upgradeId
	-- re-opens the trial-1 defect on one and makes a 499-Robux Span purchase invisible on
	-- the other.
	applyWalkSpeed(player, state)
	Tool.refresh(player, state)

	-- (5) In this order. The effect has already landed by the time the cue is told about
	-- it, and the 200 ms acknowledgment budget is measured from this packet. tryBuy returns
	-- a bare boolean, so the new level is read back off the state it just wrote.
	local newLevel = state.upgrades[upgradeId]
	Protocol.channel(CHANNEL_UPGRADE_APPLIED):FireClient(player, upgradeId, newLevel)
	pushSnapshot(player, state)
end

--[[
	wiring.onSave. Every runtime.saveIntervalSeconds, for every state in the collection.

	The collection is copied into an array before the pass because persistence.save yields:
	a join landing mid-pass would add a key to a table being traversed with pairs, which is
	undefined. A failure warns inside persistence and the loop continues; the next pass
	retries by existing.
]]
local function startSaveLoop()
	task.spawn(function()
		while true do
			task.wait(Config.SaveIntervalSeconds)

			local due: { PlayerState } = {}
			for _, state in pairs(states) do
				table.insert(due, state)
			end

			for _, state in ipairs(due) do
				local player = state.player
				if player ~= nil and states[player.UserId] == state then
					local ok, err = pcall(Persistence.save, player, state)
					if not ok then
						warn(`server-main: the periodic save of {player.UserId} failed: {err}`)
					end
				end
			end
		end
	end)
end

--[[
	wiring.onShutdown. A Studio stop writes nothing — but the test for that is no longer here.
	It lives inside `Persistence.save`, which is the only place all three write paths pass
	through. This function used to carry the repo's ONLY `IsStudio()` call, so the periodic
	loop and `onLeave` went around it and a Studio session past one save interval wrote the
	live store. The guard existed and the two paths that needed it most did not have it.

	Every state still in the collection is saved and all of them are waited for.
	Saved in parallel rather than in a sequential loop: BindToClose has a bounded budget
	and sixteen sequential DataStore writes can exceed it, which would lose the last of
	them rather than the last second of one.
]]
local function onShutdown()
	local pending = 0
	for _, state in pairs(states) do
		local player = state.player
		if player ~= nil then
			pending += 1
			task.spawn(function()
				local ok, err = pcall(Persistence.save, player, state)
				if not ok then
					warn(`server-main: the shutdown save of {player.UserId} failed: {err}`)
				end
				pending -= 1
			end)
		end
	end

	while pending > 0 do
		task.wait()
	end
end

-- ==========================================================================
-- BOOT. Seven steps, in this order, none of which yields.
-- ==========================================================================

-- (1) FIRST, before anything else. Collision group, chat off, the player-cap assertion.
-- It does not yield, which is what lets step 2 land on the same frame.
World.configure()

-- (2) Removes the race between a character spawning and the two yielding calls in onJoin
-- returning. The engine's Players.RespawnTime dies with it, which is why onDeath exists.
Players.CharacterAutoLoads = false

-- (3) The remotes Folder and one Instance per channel, class taken from Protocol.REMOTES.
-- protocol does this, not this file, so the folder name and the class per channel live in
-- the module that owns the names. Done before any player can join.
Protocol.createRemotes()

-- (4) The live collection is the `states` table above, created at require time because a
-- local cannot be declared here and used by the handlers above it. Never replaced.

-- (5) Hand clearing the collection by reference and let it install its own
-- runtime.clearTickRate loop. Ticking an empty collection before the first join is normal.
Clearing.start(states)

-- (6) The periodic save loop.
startSaveLoop()

-- (7) The three bindings. The two client-originated channels are
-- input.clientOriginatedRemotes in full; there is no third handler to write because there
-- is no third client-originated channel.
game:BindToClose(onShutdown)

Protocol.channel(CHANNEL_BUY_UPGRADE).OnServerEvent:Connect(onPurchase)

--[[
	Set at boot, before any client can invoke it.

	A PLAYER WHOSE STATE IS NOT YET PUBLISHED GETS nil, NOT AN ERROR. Nothing states which,
	and the two are not symmetric: an error inside OnServerInvoke propagates to the client's
	InvokeServer, which aborts client-main's boot at step 7 and leaves every updater bound
	to a channel it never finishes connecting — a HUD dead for the session. A nil is one
	no-op call of an updater that is already required to be idempotent, and the join push
	(onJoin step 7) and the spawn push (onSpawn step 8) both come after the publish point,
	so the HUD is filled a moment later either way. The race is normal, not exceptional:
	client-main's boot can outrun a yielding persistence.load, so this must not warn.
]]
Protocol.channel(CHANNEL_REQUEST_STATE).OnServerInvoke = function(player: Player): any
	local state = states[player.UserId]
	if state == nil then
		return nil
	end
	return buildSnapshot(state)
end

-- Players who were already in the server when this script started. PlayerAdded does not
-- fire for them, and boot yields nowhere, so in practice this is empty — but a first
-- player who missed the connection would have no state, no lane and no character at all.
Players.PlayerAdded:Connect(onJoin)
for _, player in ipairs(Players:GetPlayers()) do
	task.spawn(onJoin, player)
end

Players.PlayerRemoving:Connect(onLeave)

-- An entry point exposes nothing: tree's rule that every module returns one table meets
-- "no module may require this one", and an empty table is the reading that satisfies both.
return {}
