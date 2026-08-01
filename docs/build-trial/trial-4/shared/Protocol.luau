--!strict
--[[
	Protocol — the remote channels, end to end, and the shape of a snapshot.

	This module owns the channel NAMES, the CLASS of each one, the Instances themselves
	and the single lookup that turns a name into a live Instance. `channel(name)` is the
	only path from a name to a remote Instance in the whole game, on both sides: no other
	module may WaitForChild, FindFirstChild or search for a remote, and an undeclared name
	is an error here rather than a warning and a nil somewhere else.

	Exactly five channels, and no more. There is deliberately no clearing channel and no
	currency channel: the server observes clearing on its own tick, so there is nothing a
	client could claim.

	It also states, once, what a snapshot carries. Both sides build and read the payload
	from `snapshotShape()` instead of repeating field-name literals, so adding a field is
	an edit to this file and to nothing else.

	Nothing yields at require time. The Remotes Folder is resolved on the first `channel()`
	call and cached from then on, per tree's rule that a module returns one table and does
	nothing else on load.
]]

local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")

-- [architect: arbitrary] The runtime Folder the remote Instances live in, directly under
-- ReplicatedStorage. Deliberately NOT under tree.sharedRoot: that Folder is Rojo-managed
-- and these Instances are made at runtime. Written here once so that no other module ever
-- spells it.
local REMOTES_FOLDER_NAME = "Remotes"

local Protocol = {}

export type ChannelDef = {
	class: "RemoteEvent" | "RemoteFunction",
	direction: "client -> server" | "server -> client",
	payload: string,
	firedBy: string,
}

-- The five channels, keyed by name. NAMES AND CLASSES, NOT INSTANCES — `channel(name)`
-- returns the Instance. `firedBy` is the one module that originates the message; who
-- handles it, and why the channel exists at all, are in the comment above each entry.
local REMOTES: { [string]: ChannelDef } = {
	-- Handled by server-main, which sets OnServerInvoke at boot. client-main may not
	-- assume the join-time push arrived, so it pulls once after its updater is live.
	RequestState = {
		class = "RemoteFunction",
		direction = "client -> server",
		payload = "no arguments; returns one snapshot",
		firedBy = "client-main",
	},

	-- Handled by client-main, which passes it to the updater hud-binding.bind returned.
	-- TWO ORIGINATORS, deliberately and safely: it carries a whole snapshot rather than a
	-- delta, so a duplicate is idempotent and an extra push is harmless.
	StateChanged = {
		class = "RemoteEvent",
		direction = "server -> client",
		payload = "one snapshot, exactly the fields snapshotShape() names",
		firedBy = "server-main on join, on spawn and after a successful purchase; clearing once per tick in which anything changed",
	},

	-- Handled by server-main, wiring.onPurchase. The only client-originated message in the
	-- game, and it carries an id and nothing else: the server prices it.
	BuyUpgrade = {
		class = "RemoteEvent",
		direction = "client -> server",
		payload = "one upgrade id string and nothing else",
		firedBy = "input",
	},

	-- Handled by client-main's onReveal handler, which is connected and empty. The HUD does
	-- not need it; the found count arrives on StateChanged.
	FindRevealed = {
		class = "RemoteEvent",
		direction = "server -> client",
		payload = "one find name string, from Patch.relic",
		firedBy = "clearing",
	},

	-- Handled by client-main's onRestored handler, connected and empty for the same reason.
	-- Fired exactly once per player per area, on the latch transition only; a rejoining
	-- finished player learns it from the snapshot's areaComplete field and nothing else.
	AreaRestored = {
		class = "RemoteEvent",
		direction = "server -> client",
		payload = "the area label string",
		firedBy = "clearing",
	},
}

-- Frozen so that "protocol owns the names" is enforced rather than merely documented: a
-- module cannot add a sixth channel, or retype an existing one, from the outside.
for _, def in pairs(REMOTES) do
	table.freeze(def)
end
Protocol.REMOTES = table.freeze(REMOTES)

-- The fields a snapshot carries, in order. A snapshot is NOT a PlayerState: patches,
-- cleared and player never cross the wire — the first two are hundreds of entries the HUD
-- has no use for, and the third is not serialisable.
local SNAPSHOT_FIELDS: { string } = table.freeze({
	"currency",
	"upgrades",
	"clearedCount",
	"found",
	"areaComplete",
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
	(wiring.boot step 2). Idempotent: a second call finds all five channels already there,
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
