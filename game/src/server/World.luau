--!strict
--[[
	world — server.

	The boot module for `social`. Every decision that key makes is executed here, at
	runtime, by a named module, because `social` is the one contract key with no
	emitter path: Players.MaxPlayers is read-only from a script, the chat surfaces are
	children of TextChatService rather than values, and a collision group only exists
	once something registers it. A Luau-emitting config generator can produce none of
	those three, so GameConfig carries the decisions and this module performs them.

	configure() runs FIRST in wiring.boot, before protocol.createRemotes and before
	anything can load a character. That order is load-bearing twice over: a character
	that spawns before the group exists is in the wrong group for its whole life, and a
	chat window that appears for one frame has already put a player-authored string on
	another client's screen, which social.chat.playerAuthoredStringsToOtherClients
	fixes at 0.

	The one part that is NOT executable here is the player cap. social.maxPlayers has
	scriptSettable false and runtime.placeConfiguration says it belongs to whoever
	publishes the place, so configure() READS Players.MaxPlayers and warns naming the
	key. It does not write it, and it does not pretend the read was a write.

	This module writes no Humanoid property and no Health — response.humanoidWritesAllowed
	is exactly one property and it belongs to server-main — and it calls none of the
	social-graph or ranking APIs social forbids. Those prohibitions are enforced by
	absence, which is why they are named nowhere in this file: the acceptance grep for
	them must not match a comment either.

	Every value comes from GameConfig.Social. The group name in particular is spelled
	in exactly one place in the whole build — social.characterCollision.groupName —
	and this file reads it rather than restating it.
]]

local Players = game:GetService("Players")
local PhysicsService = game:GetService("PhysicsService")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local TextChatService = game:GetService("TextChatService")

local Shared = ReplicatedStorage:WaitForChild("UIForge")
local GameConfig = require(Shared.GameConfig)

local SOCIAL = GameConfig.Social
local CHARACTER_COLLISION = SOCIAL.characterCollision

-- The engine's built-in group. It always exists and RegisterCollisionGroup errors on
-- it, so it is the one name ensureCollisionGroup steps over. Named here rather than
-- inline because it is an engine constant, not a tuned value: it is not in GameConfig
-- and could not be, since re-emitting the config cannot rename it.
local DEFAULT_GROUP = "Default"

-- The three scriptable chat surfaces, in the order they are disabled. The first two are
-- social.chat.chatWindowEnabled and .bubbleChatEnabled, which wiring.boot names. The
-- THIRD IS NOT NAMED BY THE WIRING and is here because social.chat.text is false and
-- ChatInputBarConfiguration.Enabled also defaults to true: with only the window and the
-- bubbles disabled, a player can still open the input bar, type, and have the string
-- delivered to every other client's TextChannel — invisibly, but delivered, which is
-- what social.chat.playerAuthoredStringsToOtherClients being 0 forbids. Flagged in the
-- build report rather than assumed.
local CHAT_SURFACES = {
	"ChatWindowConfiguration",
	"BubbleChatConfiguration",
	"ChatInputBarConfiguration",
}

local World = {}

-- One warning per server for the player cap, however many times configure() is called.
-- wiring.boot calls it once, so this only makes "warn once" literal rather than
-- incidental.
local maxPlayersWarned = false

-- Register a collision group unless the engine already owns it, so configure() is safe
-- on a place whose .rbxl already declares the group in the Collision Groups editor.
-- RegisterCollisionGroup is deliberately not wrapped: a group that cannot be created is
-- a place that cannot honour social.characterCollision.playerVsPlayer, and that should
-- stop the boot loudly rather than silently drop every character into Default.
local function ensureCollisionGroup(name: string)
	if name == DEFAULT_GROUP then
		return
	end
	if PhysicsService:IsCollisionGroupRegistered(name) then
		return
	end
	PhysicsService:RegisterCollisionGroup(name)
end

-- Each surface is a singleton child of TextChatService, present from boot, so this reads
-- rather than waits: configure() is boot step 1 and everything after it is behind any
-- yield taken here. The write is a WRITE and not an omission —
-- social.chat.overridesPlatformDefault records that the window defaults to TRUE, so
-- leaving these alone ships chat.
local function disableChatSurface(className: string)
	local configuration = TextChatService:FindFirstChildOfClass(className)
	if configuration == nil then
		warn(
			`world.configure: TextChatService has no {className}, so social.chat cannot be `
				.. `enforced from code. social.chat.text, .chatWindowEnabled and .bubbleChatEnabled `
				.. `are all false and this is the only path that sets them.`
		)
		return
	end
	local surface = configuration :: any
	surface.Enabled = false
end

-- Every BasePart of a character carries the group; anything else in the model is
-- skipped. Written as one function so the join pass and the DescendantAdded handler
-- cannot drift apart.
local function applyGroup(descendant: Instance)
	if descendant:IsA("BasePart") then
		descendant.CollisionGroup = CHARACTER_COLLISION.groupName
	end
end

-- FIRST in wiring.boot, called once by server-main, server only. Returns nothing and
-- yields nothing: everything after it in the boot order runs on the same frame.
function World.configure()
	-- (1) Collision. The group is registered before the rows are set, because
	-- CollisionGroupSetCollidable errors on a name the engine does not know. Both rows
	-- are read from config and applied in the order they are declared, so a re-emitted
	-- social with a third row needs no edit here: Characters vs Characters false is what
	-- makes two players walk through each other, and Characters vs Default true is what
	-- keeps them standing on a slab.
	ensureCollisionGroup(CHARACTER_COLLISION.groupName)
	for _, row in ipairs(CHARACTER_COLLISION.collidable) do
		ensureCollisionGroup(row.a)
		ensureCollisionGroup(row.b)
		PhysicsService:CollisionGroupSetCollidable(row.a, row.b, row.collides)
	end

	-- (2) Chat. Every scriptable surface, all false.
	for _, className in ipairs(CHAT_SURFACES) do
		disableChatSurface(className)
	end

	-- (3) The player cap. A READ. Players.MaxPlayers is read-only from a script, so the
	-- band is asserted and never applied: a place outside it warns by name and still runs,
	-- because refusing to boot would turn a publishing mistake into an outage. The band is
	-- inclusive at both ends.
	local band = SOCIAL.maxPlayers
	local live = Players.MaxPlayers
	if not maxPlayersWarned and (live < band.min or live > band.max) then
		maxPlayersWarned = true
		warn(
			`world.configure: Players.MaxPlayers is {live}, outside social.maxPlayers ({band.min} `
				.. `to {band.max}). social.maxPlayers.scriptSettable is false — this is place `
				.. `configuration and no module may write it. Below {band.min} a player can spend `
				.. `a whole session alone; above {band.max} the plot row exceeds the mobile budget.`
		)
	end
end

-- Called by server-main in wiring.onSpawn, before the pivot, so two characters never
-- overlap while still colliding.
--
-- social.characterCollision.appliedTo is "every BasePart of every character, on
-- CharacterAdded and on every BasePart added to it thereafter", and the second clause is
-- why this connects rather than only looping: an Accessory handle, a limb the engine
-- attaches late, or the held tool's own parts arrive after CharacterAdded and would
-- otherwise stay in Default and block another player.
--
-- The connection is made BEFORE the pass over the existing descendants, so nothing can
-- land in the gap between the two. A part caught by both is set twice, which is a no-op.
-- Nothing is disconnected: the connection lives on the character and dies when the
-- character is destroyed, which is exactly its useful life.
--
-- Writes no Humanoid property and no Health.
function World.onCharacter(character: Model)
	character.DescendantAdded:Connect(applyGroup)
	for _, descendant in ipairs(character:GetDescendants()) do
		applyGroup(descendant)
	end
end

return World
