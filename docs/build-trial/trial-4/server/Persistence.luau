--!strict
--[[
	persistence — server.

	Loads and saves a player's currency, upgrades, collection and cleared state.

	THE ONE THING TO UNDERSTAND BEFORE EDITING EITHER HALF: `save` collapses a finished
	area and `load` expands it back, and they are only lossless as a pair. When
	`areaComplete` is true the payload writes `cleared` as an EMPTY set, because the flag
	already implies every index; `load` refills the set from that same flag. Dropping the
	list with nothing to expand it is what respawns a finished area, so a change to one
	side of the collapse is a change to both.

	`load` also RECONCILES before it returns: the stored `clearedCount` is compared and
	never trusted, and the value derived from the set and the flag wins. Every caller may
	therefore assume, for any state this function returns, that the number of keys in
	`cleared` equals `clearedCount`, and that `areaComplete` implies
	`clearedCount == GameConfig.Area.patchCount`. No module downstream checks this, so
	nothing here may return a state where those three disagree.

	This module holds no tuned number of its own. The store name and the patch count both
	come from GameConfig.
]]

local DataStoreService = game:GetService("DataStoreService")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local Shared = ReplicatedStorage:WaitForChild("UIForge")
local GameConfig = require(Shared.GameConfig)

local Persistence = {}

-- The live world record for one patch. Never persisted: plots rebuilds it on every join
-- from layout.build() and state.cleared. It is declared here because persistence owns the
-- PlayerState type and PlayerState names it.
export type Patch = {
	position: Vector3,
	tierIndex: number,
	relic: string?,
	cleared: boolean,
	instance: BasePart?,
}

-- One connected player's whole state. `defaultState` is the only constructor: no other
-- module may build one of these as a literal.
export type PlayerState = {
	currency: number,
	upgrades: { [string]: number },
	patches: { Patch },
	cleared: { [number]: boolean },
	clearedCount: number,
	found: { [string]: boolean },
	areaComplete: boolean,
	player: Player?,
}

-- Exactly the six persisted fields of the state shape, and nothing else. `patches` and
-- `player` are session-only and never reach the store.
type Payload = {
	currency: number,
	upgrades: { [string]: number },
	cleared: { [number]: boolean },
	clearedCount: number,
	found: { [string]: boolean },
	areaComplete: boolean,
}

local LOG_PREFIX = "[Persistence]"

local cachedStore: DataStore? = nil
local warnedNoStore = false

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

--[[
	The opening balance, and THE ONLY CONSTRUCTOR of a PlayerState.

	Every persisted field gets a value here, so a new player has no undefined field and no
	module downstream has to guess a default at the point of use. Does not yield and does
	not touch a DataStore, which is what lets `load` return it on a failure.
]]
function Persistence.defaultState(): PlayerState
	return {
		currency = 0,
		-- A missing key reads as level 0; no upgrade is written until it is bought.
		upgrades = {},
		-- Session-only. plots.spawn fills this in.
		patches = {},
		-- Keyed by the 1-based index into layout.build()'s canonical order.
		cleared = {},
		clearedCount = 0,
		-- Keyed by the find names in GameConfig.RelicSets[].relics.
		found = {},
		areaComplete = false,
		-- `player` is deliberately absent: server-main sets it, once, after load returns.
	}
end

-- Copy a stored payload over a fresh default state, field by field, checking the type of
-- each one. Field by field and not wholesale, so a payload written by an older version
-- that is missing a field, or carrying a field this version no longer knows, still yields
-- everything it does hold — losing a player's currency to a schema change is not an option.
-- Returns the stored clearedCount if the payload carried a usable one, so the caller can
-- compare it against the derived value, and the number of cleared keys that were discarded.
local function applyPayload(state: PlayerState, raw: { [any]: any }): (number?, number)
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

	if type(raw.found) == "table" then
		for name, isFound in pairs(raw.found) do
			if type(name) == "string" and isFound == true then
				state.found[name] = true
			end
		end
	end

	-- The latch. Only an explicit true turns it on; anything else leaves the default false.
	if raw.areaComplete == true then
		state.areaComplete = true
	end

	local dropped = 0
	if type(raw.cleared) == "table" then
		local patchCount = GameConfig.Area.patchCount
		for key, isCleared in pairs(raw.cleared) do
			if isCleared ~= true then
				continue
			end
			-- tonumber, not a type test: an integer-keyed map that has been through a
			-- JSON round trip comes back with its keys as strings.
			local index = tonumber(key)
			if index ~= nil and index % 1 == 0 and index >= 1 and index <= patchCount then
				state.cleared[index] = true
			else
				dropped += 1
			end
		end
	end

	local storedCount: number? = nil
	if type(raw.clearedCount) == "number" then
		storedCount = raw.clearedCount
	end

	return storedCount, dropped
end

local function countKeys(set: { [number]: boolean }): number
	local count = 0
	for _ in pairs(set) do
		count += 1
	end
	return count
end

-- The other half of save's collapse. After this runs, `cleared`, `clearedCount` and
-- `areaComplete` agree, whatever the payload said.
local function reconcile(state: PlayerState, storedCount: number?): ()
	local patchCount = GameConfig.Area.patchCount

	if state.areaComplete then
		-- The flag stands in for the whole list. Refill it.
		for index = 1, patchCount do
			state.cleared[index] = true
		end
		state.clearedCount = patchCount
	else
		state.clearedCount = countKeys(state.cleared)
	end

	if storedCount ~= nil and storedCount ~= state.clearedCount then
		warn(
			string.format(
				"%s stored clearedCount %d disagrees with the cleared set (%d); using the derived value",
				LOG_PREFIX,
				storedCount,
				state.clearedCount
			)
		)
	end
end

--[[
	Load a player's saved state, reconcile it, and return it.

	Never throws and never returns nil. On a DataStore failure it warns and returns
	`defaultState()`, so an outage leaves the player playable on a fresh session rather
	than stuck. Yields.

	The returned state has every persisted field populated and reconciled, `patches` empty
	and `player` unset. server-main must not put it into the live collection until this has
	returned, or clearing.tick can see a half-loaded state.
]]
function Persistence.load(player: Player): PlayerState
	local state = Persistence.defaultState()
	local storedCount: number? = nil
	local dropped = 0

	local store = getStore()
	if store ~= nil then
		local ok, result = pcall(function()
			return store:GetAsync(keyFor(player))
		end)
		if not ok then
			warn(
				string.format(
					"%s load failed for %s: %s — starting a fresh session",
					LOG_PREFIX,
					describe(player),
					tostring(result)
				)
			)
		elseif type(result) == "table" then
			storedCount, dropped = applyPayload(state, result)
		elseif result ~= nil then
			-- Not a table and not absent: something wrote a scalar under this key. Losing
			-- a save is bad enough without losing it quietly.
			warn(
				string.format(
					"%s stored payload for %s is a %s, not a table — starting a fresh session",
					LOG_PREFIX,
					describe(player),
					type(result)
				)
			)
		end
		-- A nil result is a player who has never saved, which is not a failure and not
		-- worth a warning: the default state is the correct answer.
	end

	if dropped > 0 then
		warn(
			string.format(
				"%s discarded %d cleared index/indices outside 1..%d for %s",
				LOG_PREFIX,
				dropped,
				GameConfig.Area.patchCount,
				describe(player)
			)
		)
	end

	reconcile(state, storedCount)

	return state
end

--[[
	Write the six persisted fields, and nothing else.

	THE COLLAPSE: when `state.areaComplete` is true, `cleared` is written as an empty set,
	because the flag already implies every index. That is what keeps the payload bounded —
	a per-patch list for a finished area is this design's one novel technical risk — and it
	is lossless only because `load` refills the set from the same flag.

	The live `state.cleared` is NOT emptied. This collapses the payload, not the state.

	Yields. Idempotent: saving twice with no change between is not an error. A failure
	warns and returns false rather than throwing; the periodic save retries by existing.
]]
function Persistence.save(player: Player, state: PlayerState): boolean
	local cleared: { [number]: boolean } = {}
	if not state.areaComplete then
		for index, isCleared in pairs(state.cleared) do
			if isCleared then
				cleared[index] = true
			end
		end
	end

	local upgrades: { [string]: number } = {}
	for id, level in pairs(state.upgrades) do
		upgrades[id] = level
	end

	local found: { [string]: boolean } = {}
	for name, isFound in pairs(state.found) do
		if isFound then
			found[name] = true
		end
	end

	-- Built as a detached copy before the write, because the write yields and clearing
	-- mutates the live state every 0.12s.
	local payload: Payload = {
		currency = state.currency,
		upgrades = upgrades,
		cleared = cleared,
		clearedCount = state.clearedCount,
		found = found,
		areaComplete = state.areaComplete,
	}

	local store = getStore()
	if store == nil then
		return false
	end

	local ok, err = pcall(function()
		store:SetAsync(keyFor(player), payload)
	end)
	if not ok then
		warn(string.format("%s save failed for %s: %s", LOG_PREFIX, describe(player), tostring(err)))
		return false
	end

	return true
end

return Persistence
