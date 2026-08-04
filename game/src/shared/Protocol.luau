--!strict
--[[
	Protocol — the remote channels, end to end, and the shape of a snapshot.

	This module owns the channel NAMES, the CLASS of each one, the Instances themselves
	and the single lookup that turns a name into a live Instance. `channel(name)` is the
	only path from a name to a remote Instance in the whole game, on both sides: no other
	module may WaitForChild, FindFirstChild or search for a remote, and an undeclared name
	is an error here rather than a warning and a nil somewhere else.

	Exactly seven channels, and no more. There is deliberately no clearing channel and no
	currency channel: the server observes clearing on its own tick, so there is nothing a
	client could claim, and no client message carries a cost, an amount or a balance.

	THE CLIENT SURFACE IS CLOSED AND IT IS CHECKED, not promised. Exactly two channels run
	client -> server, and they are `GameConfig.Input.clientOriginatedRemotes` verbatim:
	RequestState and BuyUpgrade. The two lists are compared against each other, in both
	directions, below — so adding an eighth channel that a client can fire, or dropping one
	the input contract names, fails loudly at load rather than quietly at review.

	`RequestState` is fired by no player input; it is the pull client-main makes once, after
	its updaters are live, because the join-time push may have arrived before the HUD
	existed. Removing it leaves the HUD blank until something changes.

	It also states, once, what a snapshot carries. Both sides build and read the payload
	from `snapshotShape()` instead of repeating field-name literals, so adding a field is
	an edit to this file and to nothing else.

	Nothing yields at require time. The Remotes Folder is resolved on the first `channel()`
	call and cached from then on, per tree's rule that a module returns one table and does
	nothing else on load.
]]

local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")

local GameConfig = require(script.Parent.GameConfig)

-- [architect: arbitrary] The runtime Folder the remote Instances live in, directly under
-- ReplicatedStorage — tree.remotesRoot is "ReplicatedStorage.Remotes". Deliberately NOT
-- under tree.sharedRoot: that Folder is Rojo-managed and these Instances are made at
-- runtime. Written here once so that no other module ever spells it.
local REMOTES_FOLDER_NAME = "Remotes"

local Protocol = {}

export type ChannelDef = {
	class: "RemoteEvent" | "RemoteFunction",
	direction: "client -> server" | "server -> client",
	payload: string,
	firedBy: string,
	handledBy: string,
}

-- The seven channels, keyed by name. NAMES AND CLASSES, NOT INSTANCES — `channel(name)`
-- returns the Instance. `firedBy` is the one module that originates the message and
-- `handledBy` is the one that receives it; every channel has both, deliberately, because a
-- channel with a producer and no consumer is the defect this table exists to make visible.
-- Why each channel exists at all is in the comment above its entry.
local REMOTES: { [string]: ChannelDef } = {
	-- Handled by server-main, which sets OnServerInvoke at boot. client-main may not
	-- assume the join-time push arrived, so it pulls once after its updaters are live.
	-- Client-originated but NOT player-driven: input.clientRemotesFiredByPlayerInput is
	-- exactly [BuyUpgrade], and this one is fired by client-main's boot, not by a press.
	RequestState = {
		class = "RemoteFunction",
		direction = "client -> server",
		payload = "no arguments; returns one snapshot",
		firedBy = "client-main",
		handledBy = "server-main, which sets OnServerInvoke at boot",
	},

	-- Handled by client-main, which fans it out to every updater bound at client boot.
	-- TWO ORIGINATORS, deliberately and safely: it carries a whole snapshot rather than a
	-- delta, so a duplicate is idempotent and an extra push is harmless. currency,
	-- clearedCount, found and areasFinished only ever change inside the tick, so without
	-- clearing firing it the readouts sit frozen until the next purchase.
	StateChanged = {
		class = "RemoteEvent",
		direction = "server -> client",
		payload = "one snapshot, exactly the fields snapshotShape() names",
		firedBy = "server-main on join, on spawn and after a successful purchase; clearing once per tick in which anything changed",
		handledBy = "client-main, which fans it out to every updater",
	},

	-- Handled by server-main, wiring.onPurchase. One of the two client-originated messages
	-- and the ONLY one a player's input produces. It carries an id and nothing else: the
	-- server prices it, and economy.authority is why no cost, amount or balance is on it.
	BuyUpgrade = {
		class = "RemoteEvent",
		direction = "client -> server",
		payload = "one upgrade id string and nothing else",
		firedBy = "input",
		handledBy = "server-main, wiring.onPurchase",
	},

	-- Handled by beats, as response.beats[findReveal]: rank 1, 300 ms acknowledgment
	-- budget, channels atPatch and audio, notice FORBIDDEN, queued, 2.5 s dwell. Up to
	-- collection.relicsPerArea (3) times per area per player, and never for a post-terminal
	-- area. The HUD does not need it; the found map arrives on StateChanged.
	FindRevealed = {
		class = "RemoteEvent",
		direction = "server -> client",
		payload = "one Find name string, from Patch.find",
		firedBy = "clearing",
		handledBy = "beats, as response.beats[findReveal]",
	},

	-- Handled by beats, as response.beats[setComplete]: rank 2, 400 ms budget, channels
	-- notice and audio, queued. Exactly once per player per set, on the sixth Find of that
	-- set. A SEPARATE CHANNEL FROM FindRevealed and not a prefixed string on it:
	-- response.channelExclusivity puts findReveal on atPatch and setComplete on notice, so
	-- one packet cannot carry both without the receiver having to re-derive which it was.
	SetCompleted = {
		class = "RemoteEvent",
		direction = "server -> client",
		payload = "one collection.sets[].id string",
		firedBy = "clearing",
		handledBy = "beats, as response.beats[setComplete]",
	},

	-- Handled by beats, as response.beats[areaComplete]: rank 3, 400 ms budget, channels
	-- notice and audio, atPatch FORBIDDEN, queued. Fired exactly once per player per area,
	-- on the latch transition only — a post-terminal area fires it too, since
	-- endgame.survivingPayoffKinds includes areaCompletion.
	AreaRestored = {
		class = "RemoteEvent",
		direction = "server -> client",
		payload = "the area label string from layout.areaSpec(ordinal).label",
		firedBy = "clearing",
		handledBy = "beats, as response.beats[areaComplete]",
	},

	-- Handled by beats, as response.beats[upgradePurchased]: rank 4, 200 ms budget,
	-- channels readout and audio, queued, effectAppliedBeforeAcknowledgment true.
	--
	-- FIRED ONLY ON A SUCCESSFUL PURCHASE, and that is the whole reason it exists.
	-- input.verbs[buy].onPreconditionFail is silentNoOp and
	-- input.pressable.rejectionCueOnFailedPrecondition is 'none', so a failed buy produces
	-- no packet at all — which means a client diffing snapshots cannot tell an accepted
	-- purchase from an ignored one inside a 200 ms budget. This is the acknowledgment that
	-- makes that budget measurable.
	UpgradeApplied = {
		class = "RemoteEvent",
		direction = "server -> client",
		payload = "one upgrade id string and the new held level",
		firedBy = "server-main",
		handledBy = "beats, as response.beats[upgradePurchased]",
	},
}

-- Frozen so that "protocol owns the names" is enforced rather than merely documented: a
-- module cannot add an eighth channel, or retype an existing one, from the outside.
for _, def in pairs(REMOTES) do
	table.freeze(def)
end
Protocol.REMOTES = table.freeze(REMOTES)

--[[
	THE CLOSED-SURFACE CHECK, in both directions.

	The set of channels declared `client -> server` here must equal
	`GameConfig.Input.clientOriginatedRemotes` exactly. Comparing them at load is what turns
	"the client surface is closed" into a property of the merge rather than a promise in a
	comment: a channel added here that the input contract does not name, or a name the input
	contract carries that this table has dropped, stops the place from booting.

	Pure table work over seven entries: it reads no Instance, creates none and cannot yield,
	so it does not break tree's "no work at require time" rule, which is about side effects
	and yields rather than about arithmetic.
]]
local function assertClientSurfaceMatchesConfig()
	local declared: { [string]: boolean } = {}
	for name, def in pairs(REMOTES) do
		if def.direction == "client -> server" then
			declared[name] = true
		end
	end

	-- Cast because GameConfig is reached by an instance require, which the analyser cannot
	-- follow; the cast states the shape this module relies on rather than leaving every use
	-- of `name` below as `unknown`.
	local clientOriginated = GameConfig.Input.clientOriginatedRemotes :: { string }

	for _, name in ipairs(clientOriginated) do
		if declared[name] == nil then
			error(
				string.format(
					"Protocol: GameConfig.Input.clientOriginatedRemotes names %s, but no channel declares direction 'client -> server' under that name",
					tostring(name)
				)
			)
		end
		declared[name] = nil
	end

	for name in pairs(declared) do
		error(
			string.format(
				"Protocol: channel %s is declared 'client -> server' but is not in GameConfig.Input.clientOriginatedRemotes; the client surface is closed",
				name
			)
		)
	end
end

assertClientSurfaceMatchesConfig()

--[[
	The fields a snapshot carries, in order.

	A SNAPSHOT IS NOT A PlayerState. patches, cleared, spawnPivot, owned, armState and
	player never cross the wire: the first two are hundreds of entries the HUD has no use
	for, owned would put a purchase on the wire for no reader, armState is a server-side
	gate, and player is not serialisable. Nothing here names another player (social X7) and
	nothing here is a player-authored string (X9).

	SIX OF THESE ARE READ STRAIGHT OFF THE STATE AND TWO ARE DERIVED. A producer that loops
	this list and copies `state[field]` gets `nil` for the last two, because no such field
	exists on PlayerState:

	    areaPatchCount  = layout.areaSpec(state.areasFinished + 1).patchCount
	    areaLabel       = layout.areaSpec(state.areasFinished + 1).label

	They are on the wire so the client can draw a progress readout without holding depths
	and endgame itself, which is the only way the number stays right once an area's size
	changes or the ladder runs past its authored end.
]]
local SNAPSHOT_FIELDS: { string } = table.freeze({
	"currency", -- number, straight off the state
	"upgrades", -- map<upgradeId, integer>, straight off the state
	"rowsRevealed", -- map<upgradeId, boolean>, straight off the state
	"found", -- map<findName, boolean>, straight off the state
	"areasFinished", -- integer, straight off the state
	"clearedCount", -- integer, straight off the state — the live area only
	"areaPatchCount", -- DERIVED: layout.areaSpec(areasFinished + 1).patchCount
	"areaLabel", -- DERIVED: layout.areaSpec(areasFinished + 1).label
})

--[[
	The ordered field names a snapshot carries. The returned table is shared and frozen:
	callers read it, they do not own it.
]]
function Protocol.snapshotShape(): { string }
	return SNAPSHOT_FIELDS
end

--[[
	Create ReplicatedStorage.Remotes and one Instance per channel, with the class taken
	from REMOTES.

	SERVER ONLY, called exactly once, by server-main at boot before any player can join
	(wiring.boot step 3). Idempotent: a second call finds all seven channels already there,
	creates nothing, and returns the same Folder. Connects no handler — server-main connects
	BuyUpgrade and RequestState itself.

	The per-channel test is what makes that true rather than the cheaper "if the Folder
	exists, return it": a Folder named Remotes that exists but is EMPTY — left by a plugin,
	or added to the Rojo project by someone who read the name in this file — would otherwise
	be adopted whole, and every channel() call in the game would then wait forever on a child
	that is never coming. A channel that is present with the wrong class is louder still: it
	errors, because it cannot be repaired without destroying an Instance a caller may already
	be holding.
]]
function Protocol.createRemotes(): Folder
	if not RunService:IsServer() then
		error("Protocol.createRemotes may only be called from the server", 2)
	end

	local existing = ReplicatedStorage:FindFirstChild(REMOTES_FOLDER_NAME)
	local folder: Folder
	local folderIsNew = false

	if existing then
		local existingClass = existing.ClassName
		if not existing:IsA("Folder") then
			error(
				string.format(
					"Protocol.createRemotes: ReplicatedStorage.%s already exists and is a %s, not a Folder",
					REMOTES_FOLDER_NAME,
					existingClass
				),
				2
			)
		end
		folder = existing :: Folder
	else
		folder = Instance.new("Folder")
		folder.Name = REMOTES_FOLDER_NAME
		folderIsNew = true
	end

	for name, def in pairs(REMOTES) do
		local present = folder:FindFirstChild(name)
		if present then
			local presentClass = present.ClassName
			if presentClass ~= def.class then
				error(
					string.format(
						"Protocol.createRemotes: ReplicatedStorage.%s.%s is a %s, but channel %s is declared as a %s",
						REMOTES_FOLDER_NAME,
						name,
						presentClass,
						name,
						def.class
					),
					2
				)
			end
			continue
		end

		-- The class comes from REMOTES, one branch per class the table is allowed to name,
		-- so a channel can never be created as the wrong class and never silently fall back
		-- to RemoteEvent.
		local remote: Instance
		if def.class == "RemoteEvent" then
			remote = Instance.new("RemoteEvent")
		elseif def.class == "RemoteFunction" then
			remote = Instance.new("RemoteFunction")
		else
			error(
				string.format(
					"Protocol.createRemotes: channel %s declares an unsupported class %s",
					name,
					tostring(def.class)
				)
			)
		end
		remote.Name = name
		remote.Parent = folder
	end

	if folderIsNew then
		-- Parented last, so the Folder and every channel in it replicate in one go and a
		-- client never sees the Folder half-populated. channel() waits per name as well, so
		-- this is belt and braces rather than the thing that makes the race safe.
		folder.Parent = ReplicatedStorage
	end

	return folder
end

local remotesFolder: Instance? = nil
local channelCache: { [string]: any } = {}

-- Resolved once, on the first channel() call, and cached. WaitForChild rather than
-- FindFirstChild because a client can reach this before the server's boot step has
-- replicated; a server caller cannot, since createRemotes ran first.
local function remotesRoot(): Instance
	local cachedFolder = remotesFolder
	if cachedFolder then
		return cachedFolder
	end

	local folder = ReplicatedStorage:WaitForChild(REMOTES_FOLDER_NAME)
	remotesFolder = folder
	return folder
end

--[[
	The live Instance for a declared channel — the only path from a name to a remote, on
	both sides, for every module.

	Errors on a name REMOTES does not declare; it never warns and returns nil, because the
	thing it replaces did exactly that.
]]
function Protocol.channel(name: string): any
	if REMOTES[name] == nil then
		error(string.format("Protocol.channel: %s is not a declared remote channel", tostring(name)), 2)
	end

	local cached = channelCache[name]
	if cached ~= nil then
		return cached
	end

	local remote = remotesRoot():WaitForChild(name)
	channelCache[name] = remote
	return remote
end

return Protocol
