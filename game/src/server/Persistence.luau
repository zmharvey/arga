--!strict
--[[
	persistence — server.

	Loads and saves the SEVEN persisted fields of the state shape under
	`GameConfig.DataStoreName`, and reconciles a payload before returning it.

	THE COLLAPSE IS GONE. The wave-1 shape emptied `cleared` on the way out when its
	area-completion boolean was set and refilled it on the way in from that same boolean; the
	trial-3 defect was that nothing refilled it, and a finished area respawned and re-paid
	forever. That boolean no longer exists in the state shape: `state.cleared` describes the
	LIVE AREA ONLY and is emptied by `clearing` at the instant it increments `areasFinished`,
	so the payload is bounded by the largest single area's patchCount (640) whatever the
	player has done.

	`save` is therefore the exact inverse of `load`: it copies each of the seven fields
	verbatim and the payload it builds contains no conditional branch of any kind. The only
	branches in `save` are the write path's failure handling and the stale-load guard below.

	THE STALE-LOAD GUARD, which is the one behaviour here that is not in the state shape.
	`load` warns and returns `defaultState()` when a DataStore READ fails, so the player is
	playable rather than stuck — but a fresh default state is indistinguishable from a real
	one to `save`, and the 45-second save loop would then write an empty state over the
	player's real save. A transient read failure at join became permanent progress loss.
	This module latches the failure per Player and `save` refuses to write for that Player
	for the rest of their session, returning false. Progress made in a stale session is lost
	on leave; a real save is never overwritten. See `blockedSaves` for what does and does not
	arm the latch.

	`load` also RECONCILES before it returns. Every caller may assume, of any state it
	returns: areasFinished is an integer >= 0; every key of `cleared` is an integer in
	1..patchCount of the live area; `clearedCount` is the number of keys in `cleared` and is
	derived, never trusted; and every upgrade row and every Find name has a key in
	`rowsRevealed` and `found`, so no module downstream may index a nil.

	This module holds no tuned number of its own. The store name comes from GameConfig, the
	live area's patchCount from Layout, and the key sets from GameConfig.
]]

local DataStoreService = game:GetService("DataStoreService")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local Shared = ReplicatedStorage:WaitForChild("UIForge")
-- The two value modules are cast `:: any` at the require, which is this repo's convention
-- for a generated table (Clearing, Tool, Modifiers and World all do it): an instance require
-- resolves to `any` inside the engine anyway, and the cast is what lets luau-analyze check
-- the rest of this file instead of stopping at the require it cannot follow.
local GameConfig = require(Shared.GameConfig) :: any
local Layout = require(Shared.Layout) :: any
local Types = require(Shared.Types)

local Persistence = {}

-- The generated shapes, not copies of them. Types.luau owns the state shape; a module that
-- declares its own PlayerState is how two modules came to disagree about one field.
export type PlayerState = Types.PlayerState
export type StoredState = Types.StoredState

-- The payload IS StoredState — exactly the seven fields stateShape marks persisted, and
-- nothing else. No purchase-derived state (products.F20), no set-completion flag, no
-- per-area boolean: endgame.persistence.postTerminalAreasStoredAs is 'one integer count'
-- and `areasFinished` is it.
type Payload = Types.StoredState

local LOG_PREFIX = "[Persistence]"

local cachedStore: DataStore? = nil
local warnedNoStore = false

-- Players whose load could not be read. `save` refuses to write for these, because a state
-- built by defaultState() after a failed READ carries no information about what was in the
-- store and writing it would destroy the real save.
--
-- A read that SUCCEEDS and returns nil (a player who has never saved) or an unusable value
-- (something wrote a scalar under this key) does NOT arm the latch: the store answered, so
-- there is no progress to protect, and blocking would leave that player unable to save for
-- the rest of the game's life rather than just this session.
--
-- Weak-keyed, so a departed Player's entry is collected with the Player.
local blockedSaves: { [Player]: boolean } = (setmetatable({}, { __mode = "k" }) :: any) :: { [Player]: boolean }

-- Opened on first use rather than at require time, because a module in this build does no
-- work when it is required. Retried on every call: an outage that clears should not need a
-- server restart. Warned about once, so an outage does not flood the log every 45 seconds.
local function getStore(): DataStore?
	if cachedStore == nil then
		local ok, result = pcall(function()
			return DataStoreService:GetDataStore(GameConfig.DataStoreName)
		end)
		if ok then
			cachedStore = result
		elseif not warnedNoStore then
			warnedNoStore = true
			warn(
				string.format(
					"%s could not open DataStore %q: %s — this session will not persist",
					LOG_PREFIX,
					tostring(GameConfig.DataStoreName),
					tostring(result)
				)
			)
		end
	end
	return cachedStore
end

local function keyFor(player: Player): string
	return tostring(player.UserId)
end

local function describe(player: Player): string
	return string.format("%s (%d)", player.Name, player.UserId)
end

-- Verbatim key-for-key copy. Used by `save` for every map it writes, so the payload is a
-- detached snapshot with no test in it — the write yields and clearing mutates the live
-- state every ClearTickRate.
local function copyMap<K, V>(source: { [K]: V }): { [K]: V }
	local out: { [K]: V } = {}
	for key, value in pairs(source) do
		out[key] = value
	end
	return out
end

local function countKeys<K, V>(source: { [K]: V }): number
	local count = 0
	for _ in pairs(source) do
		count += 1
	end
	return count
end

--[[
	The opening balance, and THE ONLY CONSTRUCTOR of a PlayerState.

	Every persisted field gets a value here, so a new player has no undefined field and no
	module downstream has to guess a default at the point of use. The five live fields get
	their empty forms too, so the table is complete before anything touches it.

	Does not yield and does not touch a DataStore, which is what lets `load` return it on a
	failure.
]]
function Persistence.defaultState(): PlayerState
	local state = {
		-- economy.startingBalance. No welcome grant, no return grant, no offline accrual.
		currency = 0,
		-- A missing key reads as level 0; no upgrade is written until it is bought.
		upgrades = {},
		-- Every row starts withheld; progression.revealRows lifts them and never lowers one.
		rowsRevealed = {},
		-- Keyed by the Find names in GameConfig.RelicSets[].relics.
		found = {},
		-- The live area is areasFinished + 1, so a new player starts in area 1.
		areasFinished = 0,
		-- Keyed by the 1-based index into layout.build(areasFinished + 1)'s canonical order.
		-- THE LIVE AREA ONLY.
		cleared = {},
		clearedCount = 0,

		-- Live, never persisted. plots.spawn fills patches and spawnPivot; entitlements.refresh
		-- fills owned; clearing.tick writes armState; server-main sets player once.
		patches = {},
		owned = {},
		armState = { character = nil, armed = false },
		-- `spawnPivot` and `player` are deliberately absent. Types.PlayerState declares both
		-- non-optional because a fully live state always has them, and this constructor runs
		-- before either exists, which is why the cast below is here and is the only one.
	}

	return (state :: any) :: PlayerState
end

-- Every upgrade row that must have a rowsRevealed key, in declaration order.
local function upgradeIds(): { string }
	local ids: { string } = {}
	for _, def in ipairs(GameConfig.Upgrades) do
		table.insert(ids, def.id)
	end
	return ids
end

-- Every Find name that must have a `found` key. sum(RelicSets[].relics.length) = 24, and
-- discovery.record.growth fixes that at 24 forever: the record never grows with play.
local function findNames(): { string }
	local names: { string } = {}
	for _, set in ipairs(GameConfig.RelicSets) do
		for _, name in ipairs(set.relics) do
			table.insert(names, name)
		end
	end
	return names
end

-- Copy a stored payload over a fresh default state, field by field, checking the type of
-- each one. Field by field and not wholesale, so a payload missing a field, or carrying a
-- field this version no longer knows, still yields everything it does hold — losing a
-- player's currency to a schema change is not an option.
--
-- Does no reconciliation: bounds, derivation and key-filling are `reconcile`'s, so there is
-- one place that decides what a returned state looks like.
local function applyPayload(state: PlayerState, raw: { [any]: any }): number?
	if type(raw.currency) == "number" then
		state.currency = raw.currency
	end

	if type(raw.upgrades) == "table" then
		for id, level in pairs(raw.upgrades) do
			if type(id) == "string" and type(level) == "number" then
				state.upgrades[id] = level
			end
		end
	end

	if type(raw.rowsRevealed) == "table" then
		for id, revealed in pairs(raw.rowsRevealed) do
			if type(id) == "string" and type(revealed) == "boolean" then
				state.rowsRevealed[id] = revealed
			end
		end
	end

	if type(raw.found) == "table" then
		for name, isFound in pairs(raw.found) do
			if type(name) == "string" and type(isFound) == "boolean" then
				state.found[name] = isFound
			end
		end
	end

	if type(raw.areasFinished) == "number" then
		state.areasFinished = raw.areasFinished
	end

	if type(raw.cleared) == "table" then
		for key, isCleared in pairs(raw.cleared) do
			-- tonumber, not a type test: an integer-keyed map that has been through the
			-- store's JSON round trip comes back with its keys as strings.
			local index = tonumber(key)
			if index ~= nil and isCleared == true then
				state.cleared[index] = true
			end
		end
	end

	local storedCount: number? = nil
	if type(raw.clearedCount) == "number" then
		storedCount = raw.clearedCount
	end

	return storedCount
end

--[[
	Bring the three progress fields into agreement, then fill the two key sets.

	In wiring.onJoin's order: clamp areasFinished, drop out-of-range cleared indices against
	the LIVE area's patchCount, derive clearedCount from the set, then fill missing
	rowsRevealed and found keys with false.

	After this runs no module downstream has to check any of it, and none of them may.
]]
local function reconcile(state: PlayerState, storedCount: number?, player: Player): ()
	-- Clamp areasFinished FIRST. Layout.areaSpec errors on an ordinal that is not a positive
	-- integer, so nothing may read the live area's size before this line.
	local stored = state.areasFinished
	local finished = math.floor(stored)
	if finished < 0 then
		finished = 0
	end
	if finished ~= stored then
		warn(
			string.format(
				"%s areasFinished %s for %s is not a whole count; clamped to %d",
				LOG_PREFIX,
				tostring(stored),
				describe(player),
				finished
			)
		)
	end
	state.areasFinished = finished

	local live = finished + 1
	local patchCount: number = Layout.areaSpec(live).patchCount

	-- The same table the state holds, under a name the checker knows the shape of; mutating
	-- it mutates state.cleared.
	local cleared = (state.cleared :: any) :: { [number]: boolean }

	-- Drop any index the live area does not have. The live area may have changed size — a
	-- different area ordinal, or a re-emitted layout — and a stale index would mark a patch
	-- that is not there, leaving ground standing that the player can never clear. Valid keys
	-- are the 1-based indices into layout.build(live), so 1 to patchCount INCLUSIVE.
	local dropped = 0
	for index in pairs(cleared) do
		if index % 1 ~= 0 or index < 1 or index > patchCount then
			cleared[index] = nil
			dropped += 1
		end
	end
	if dropped > 0 then
		warn(
			string.format(
				"%s discarded %d cleared index/indices outside 1..%d for %s — the live area is ordinal %d",
				LOG_PREFIX,
				dropped,
				patchCount,
				describe(player),
				live
			)
		)
	end

	-- Derived, never trusted. The stored number is a cache so a progress readout does not
	-- count a 640-key table every tick, not a second source of truth.
	local count = countKeys(cleared)
	state.clearedCount = count
	if storedCount ~= nil and storedCount ~= count then
		warn(
			string.format(
				"%s stored clearedCount %s disagrees with the cleared set (%d) for %s; using the derived value",
				LOG_PREFIX,
				tostring(storedCount),
				count,
				describe(player)
			)
		)
	end

	-- A live area with no standing patch cannot be finished: clearing.tick advances only on a
	-- pass that actually clears something. Not reachable from play — clearing empties the set
	-- in the same tick it reaches patchCount, with no yield in between for a save to observe —
	-- so this warns rather than repairing, because what to do about it is specified nowhere
	-- and repairing it would mean inventing either a payout or an area transition.
	if count >= patchCount then
		warn(
			string.format(
				"%s %s loaded with every patch of live area %d already cleared (%d of %d); the area cannot finish",
				LOG_PREFIX,
				describe(player),
				live,
				count,
				patchCount
			)
		)
	end

	-- Fill the two key sets, so no downstream module indexes a nil. Progression.revealRows
	-- reads state.rowsRevealed[id] directly at onJoin step 3 and errored on nil for every
	-- player before this line existed.
	for _, id in ipairs(upgradeIds()) do
		if state.rowsRevealed[id] == nil then
			state.rowsRevealed[id] = false
		end
	end
	for _, name in ipairs(findNames()) do
		if state.found[name] == nil then
			state.found[name] = false
		end
	end
end

--[[
	Load a player's saved state, reconcile it, and return it.

	Never throws and never returns nil. On a DataStore read failure it warns, latches the
	failure for this Player so `save` cannot overwrite the real save, and returns
	`defaultState()` — the player is playable on a stale session rather than stuck at join.

	Yields. server-main must not put the returned state into the live collection until this
	has returned, or clearing.tick can see a half-loaded state.

	The second return value is true when the state came from a store that answered — a real
	save, or a first-time player, either of which is safe to write back. It is false when the
	read failed. Callers may ignore it: the latch inside this module is what actually closes
	the overwrite path, and it needs no cooperation from server-main.
]]
function Persistence.load(player: Player): (PlayerState, boolean)
	local state = Persistence.defaultState()
	local storedCount: number? = nil
	local readable = true

	local store = getStore()
	if store == nil then
		-- The store could not be opened at all. Same class of failure as a failed read: this
		-- session knows nothing about what is in the store.
		readable = false
	else
		-- Captured into a non-optional local before the closure: a refinement on `store` does
		-- not cross a function boundary, and the closure is what pcall needs.
		local opened: DataStore = store
		local ok, result = pcall(function()
			return opened:GetAsync(keyFor(player))
		end)
		if not ok then
			readable = false
			warn(
				string.format(
					"%s load failed for %s: %s — starting a stale session; saving is disabled for this player until they rejoin",
					LOG_PREFIX,
					describe(player),
					tostring(result)
				)
			)
		elseif type(result) == "table" then
			storedCount = applyPayload(state, result)
		elseif result ~= nil then
			-- The store answered with something that is not a payload. Nothing is recoverable
			-- from it, so this is NOT treated as a read failure: saving stays enabled and the
			-- next write replaces the junk. Losing a save is bad enough without losing it
			-- quietly, so it is warned about.
			warn(
				string.format(
					"%s stored payload for %s is a %s, not a table — starting a fresh session and overwriting it on the next save",
					LOG_PREFIX,
					describe(player),
					type(result)
				)
			)
		end
		-- A nil result is a player who has never saved: the default state is the correct
		-- answer, it is safe to write back, and it is not worth a warning.
	end

	if not readable then
		blockedSaves[player] = true
	end

	reconcile(state, storedCount, player)

	return state, readable
end

--[[
	Write the seven persisted fields, and nothing else.

	THE PAYLOAD HAS NO CONDITIONAL BRANCH IN IT. Each of the seven fields is copied verbatim,
	which makes this the exact inverse of `load`: nothing is collapsed on the way out and so
	nothing has to be expanded on the way in. `cleared` already describes the live area only,
	and emptying it is `clearing`'s job at the instant it increments `areasFinished`.

	Refuses to write for a player whose load could not be read, and returns false — see
	`blockedSaves`. That is the one test in this function that is about the player rather
	than about the write, and it is here because `save` is the only place that can tell the
	difference between a real empty state and one that is empty because the store was down.

	Yields. Idempotent: saving twice with no change between is not an error. A failure warns
	and returns false rather than throwing; the periodic save retries by existing.
]]
function Persistence.save(player: Player, state: PlayerState): boolean
	if blockedSaves[player] then
		return false
	end

	-- Built as a detached copy before the write, because the write yields and clearing
	-- mutates the live state every ClearTickRate.
	local payload: Payload = {
		currency = state.currency,
		upgrades = copyMap(state.upgrades),
		rowsRevealed = copyMap(state.rowsRevealed),
		found = copyMap(state.found),
		areasFinished = state.areasFinished,
		cleared = copyMap(state.cleared),
		clearedCount = state.clearedCount,
	}

	local store = getStore()
	if store == nil then
		return false
	end

	local opened: DataStore = store
	local ok, err = pcall(function()
		opened:SetAsync(keyFor(player), payload)
	end)
	if not ok then
		warn(string.format("%s save failed for %s: %s", LOG_PREFIX, describe(player), tostring(err)))
		return false
	end

	return true
end

return Persistence
