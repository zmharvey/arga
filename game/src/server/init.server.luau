--!strict
--[[
	The ruin-restoration loop, server-authoritative.

	Implements the core loop from `concept/spec/incremental-spinoff-v2/01-FOUNDATION.md`:

	    move through overgrowth -> it clears on contact -> currency
	    -> clear the whole area -> buried relics revealed
	    -> spend currency on clearing upgrades -> a deeper area

	Two decisions in here are load-bearing and both come from the brief.

	**Clearing is observed, never requested.** 04-PRESENTATION.md: "clearing and
	currency awards must be server-validated, or a client claiming arbitrary clears
	owns the game." So there is no ClearPatch remote for a client to forge. The
	server walks each player's position against their own uncleared patches on a
	tick and decides. A client cannot claim a clear it did not earn because it is
	never asked.

	**Own areas, visible to each other.** 02-GAMEPLAY.md settles "shared server,
	parallel progression, own areas, no mechanical interaction". Each player gets
	their own plot at a spatial offset, so clearing is genuinely permanent per
	player without per-player replication of a shared world — and everyone is still
	visibly present, which is the social proof the brief wanted at zero systems cost.
]]

local DataStoreService = game:GetService("DataStoreService")
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")

local GameConfig = require(ReplicatedStorage:WaitForChild("UIForge"):WaitForChild("GameConfig"))

type Patch = {
	index: number,
	tier: number,
	value: number,
	position: Vector3,
	relic: string?,
	instance: BasePart?,
}

type PlayerState = {
	currency: number,
	upgrades: { [string]: number },
	collection: { [string]: boolean },
	cleared: { [number]: boolean },
	clearedCount: number,
	areasComplete: { [string]: boolean },
	patches: { [number]: Patch },
	plot: Folder?,
	slot: number,
	dirty: boolean,
}

local states: { [Player]: PlayerState } = {}
local store = DataStoreService:GetDataStore(GameConfig.DataStoreName)

--------------------------------------------------------------------- remotes

local remotes = Instance.new("Folder")
remotes.Name = "Remotes"

local stateChanged = Instance.new("RemoteEvent")
stateChanged.Name = "StateChanged"
stateChanged.Parent = remotes

local relicFound = Instance.new("RemoteEvent")
relicFound.Name = "RelicFound"
relicFound.Parent = remotes

local buyUpgrade = Instance.new("RemoteEvent")
buyUpgrade.Name = "BuyUpgrade"
buyUpgrade.Parent = remotes

-- The server is ready to push state before the client script has necessarily
-- connected, so the first push can land on nobody. For a new player that is
-- invisible (their state is all zeroes anyway); for a returning one the HUD would
-- read 0 relics and 0 currency until their next clear. So the client asks.
local requestState = Instance.new("RemoteEvent")
requestState.Name = "RequestState"
requestState.Parent = remotes

remotes.Parent = ReplicatedStorage

--------------------------------------------------------------------- helpers

local function totalRelicCount(): number
	local n = 0
	for _, set in ipairs(GameConfig.RelicSets) do
		n += #set.relics
	end
	return n
end

local function collectionCount(state: PlayerState): number
	local n = 0
	for _ in pairs(state.collection) do
		n += 1
	end
	return n
end

local function upgradeById(id: string)
	for _, u in ipairs(GameConfig.Upgrades) do
		if u.id == id then
			return u
		end
	end
	return nil
end

local function clearRadius(state: PlayerState): number
	local u = upgradeById("radius")
	local level = state.upgrades.radius or 0
	return GameConfig.BaseClearRadius + (u and u.perLevel or 0) * level
end

local function payoutMultiplier(state: PlayerState): number
	local u = upgradeById("value")
	local level = state.upgrades.value or 0
	return 1 + (u and u.perLevel or 0) * level
end

local function applyWalkSpeed(player: Player, state: PlayerState)
	local u = upgradeById("speed")
	local level = state.upgrades.speed or 0
	local speed = GameConfig.BaseWalkSpeed + (u and u.perLevel or 0) * level
	local character = player.Character
	local humanoid = character and character:FindFirstChildOfClass("Humanoid")
	if humanoid then
		humanoid.WalkSpeed = speed
	end
end

--------------------------------------------------------------- area building

--[[
	One deterministic layout for the area, shared by every player.

	Deterministic on purpose: patch indices are what persistence stores, so a
	rejoining player's saved "cleared" set has to mean the same thing it did last
	session. A random layout per session would make the saved indices garbage.
]]
local function buildLayout(): { Patch }
	local rng = Random.new(20260730)
	local area = GameConfig.Area
	local half = area.size / 2
	local patches: { Patch } = {}
	local placed: { Vector3 } = {}

	local attempts = 0
	while #patches < area.patchCount and attempts < area.patchCount * 40 do
		attempts += 1
		local x = rng:NextNumber(-half, half)
		local z = rng:NextNumber(-half, half)
		local candidate = Vector3.new(x, 0, z)

		-- Keep a walkable gap between patches, or clearing one clears its neighbours
		-- by accident and "reach" stops being an upgrade you can feel.
		local tooClose = false
		for _, p in ipairs(placed) do
			if (Vector3.new(p.X, 0, p.Z) - candidate).Magnitude < area.minSpacing then
				tooClose = true
				break
			end
		end
		if not tooClose then
			local tierIndex, tier = GameConfig.tierByWeight(rng:NextNumber())
			table.insert(placed, candidate)
			table.insert(patches, {
				index = #patches + 1,
				tier = tierIndex,
				value = tier.value,
				position = candidate,
			})
		end
	end

	-- Bury one set's worth of relics. The first is deterministic and near spawn:
	-- 02-GAMEPLAY.md promises "the first patch they clear has something under it"
	-- and says "the shuffle must not be allowed to decide this one".
	local set = GameConfig.RelicSets[1]
	local order = {}
	for i = 1, #patches do
		order[i] = i
	end

	if GameConfig.GuaranteedFirstRelic and #patches > 0 then
		local nearest, nearestDist = 1, math.huge
		for i, p in ipairs(patches) do
			local d = p.position.Magnitude
			if d < nearestDist then
				nearest, nearestDist = i, d
			end
		end
		patches[nearest].relic = set.relics[1]
		table.remove(order, table.find(order, nearest) :: number)
	end

	for i = #order, 2, -1 do
		local j = rng:NextInteger(1, i)
		order[i], order[j] = order[j], order[i]
	end

	local assigned = GameConfig.GuaranteedFirstRelic and 1 or 0
	local cursor = 1
	while assigned < math.min(GameConfig.RelicsPerArea, #set.relics) and cursor <= #order do
		local target = patches[order[cursor]]
		if not target.relic then
			assigned += 1
			target.relic = set.relics[assigned]
		end
		cursor += 1
	end

	return patches
end

local LAYOUT = buildLayout()

local function makePatchPart(tier): BasePart
	local part: BasePart
	if tier.shape == "Wedge" then
		part = Instance.new("WedgePart")
	else
		local p = Instance.new("Part")
		p.Shape = (Enum.PartType :: any)[tier.shape]
		part = p
	end
	-- Footprint, collision and material all come from the manifest rather than from
	-- here. Non-colliding especially: a patch that blocks the player turns clearing
	-- into navigation, and the brief specifies movement-only input with no aiming.
	local spec = GameConfig.Patch
	part.Anchored = true
	part.CanCollide = spec.collides
	part.Material = (Enum.Material :: any)[spec.material]
	part.Color = Color3.fromRGB(tier.rgb[1], tier.rgb[2], tier.rgb[3])
	part.Size = Vector3.new(spec.footprint, tier.height, spec.footprint)
	return part
end

local function spawnPlot(player: Player, state: PlayerState)
	local plot = Instance.new("Folder")
	plot.Name = `Plot_{player.UserId}`

	-- Plots sit side by side so players are visibly present without sharing state.
	-- The slot is claimed once on join and held: deriving it from the live player
	-- count would move a plot out from under its owner whenever anyone else joined
	-- or left, and two players could land on the same ground.
	local origin = Vector3.new(GameConfig.Area.originXZ[1], 0, GameConfig.Area.originXZ[2])
	local offset = Vector3.new(state.slot * (GameConfig.Area.size + 40), 0, 0)
	local marker = Instance.new("Part")
	marker.Name = "Spawn"
	marker.Anchored = true
	marker.CanCollide = true
	marker.Size = Vector3.new(10, 1, 10)
	marker.Position = origin + offset
	marker.Color = Color3.fromRGB(158, 142, 112)
	marker.Material = Enum.Material.Sandstone
	marker.Parent = plot

	state.patches = {}
	for _, template in ipairs(LAYOUT) do
		if state.cleared[template.index] then
			continue
		end
		local tier = GameConfig.Tiers[template.tier]
		local part = makePatchPart(tier)
		part.Name = `Patch_{template.index}`
		part.Position = origin + offset + template.position + Vector3.new(0, tier.height / 2, 0)
		part:SetAttribute("PatchIndex", template.index)
		part.Parent = plot

		state.patches[template.index] = {
			index = template.index,
			tier = template.tier,
			value = template.value,
			position = part.Position,
			relic = template.relic,
			instance = part,
		}
	end

	plot.Parent = workspace
	state.plot = plot

	local character = player.Character
	if character then
		character:PivotTo(CFrame.new(marker.Position + Vector3.new(0, 4, 0)))
	end
end

----------------------------------------------------------------- persistence

local DEFAULT_STATE = function(): PlayerState
	return {
		currency = 0,
		upgrades = { value = 0, radius = 0, speed = 0 },
		collection = {},
		cleared = {},
		clearedCount = 0,
		areasComplete = {},
		patches = {},
		plot = nil,
		slot = 0,
		dirty = false,
	}
end

-- Plot slots are reused once vacated, so a server that has churned 40 players does
-- not push the 41st a mile down the baseplate.
local slotTaken: { [number]: boolean } = {}

local function claimSlot(): number
	local i = 0
	while slotTaken[i] do
		i += 1
	end
	slotTaken[i] = true
	return i
end

local function load(player: Player): PlayerState
	local state = DEFAULT_STATE()
	local ok, saved = pcall(function()
		return store:GetAsync(`p_{player.UserId}`)
	end)
	if ok and type(saved) == "table" then
		state.currency = tonumber(saved.currency) or 0
		state.collection = (type(saved.collection) == "table" and saved.collection) or {}
		state.areasComplete = (type(saved.areasComplete) == "table" and saved.areasComplete) or {}
		if type(saved.upgrades) == "table" then
			for _, u in ipairs(GameConfig.Upgrades) do
				state.upgrades[u.id] = math.clamp(tonumber(saved.upgrades[u.id]) or 0, 0, u.maxLevel)
			end
		end
		-- A finished area is one boolean, not a list of every patch in it. The brief
		-- flags this directly: permanent clearing turns world state into save data,
		-- "which grows without bound unless areas are collapsed to a completion flag
		-- once finished."
		if state.areasComplete[GameConfig.Area.id] then
			for _, p in ipairs(LAYOUT) do
				state.cleared[p.index] = true
			end
			state.clearedCount = #LAYOUT
		elseif type(saved.cleared) == "table" then
			for _, index in ipairs(saved.cleared) do
				local n = tonumber(index)
				if n then
					state.cleared[n] = true
					state.clearedCount += 1
				end
			end
		end
	elseif not ok then
		warn(`[arga] load failed for {player.Name}; starting fresh this session`)
	end
	return state
end

local function save(player: Player, state: PlayerState)
	if not state.dirty then
		return
	end
	local clearedList: { number } = {}
	if not state.areasComplete[GameConfig.Area.id] then
		for index in pairs(state.cleared) do
			table.insert(clearedList, index)
		end
	end
	local payload = {
		currency = state.currency,
		upgrades = state.upgrades,
		collection = state.collection,
		areasComplete = state.areasComplete,
		cleared = clearedList,
	}
	local ok, err = pcall(function()
		store:SetAsync(`p_{player.UserId}`, payload)
	end)
	if ok then
		state.dirty = false
	else
		warn(`[arga] save failed for {player.Name}: {err}`)
	end
end

------------------------------------------------------------------ networking

local function snapshot(state: PlayerState)
	local upgrades = {}
	for _, u in ipairs(GameConfig.Upgrades) do
		local level = state.upgrades[u.id] or 0
		upgrades[u.id] = {
			level = level,
			maxLevel = u.maxLevel,
			cost = level >= u.maxLevel and -1 or GameConfig.upgradeCost(u, level),
		}
	end
	return {
		currency = state.currency,
		relics = collectionCount(state),
		relicTotal = totalRelicCount(),
		cleared = state.clearedCount,
		patchTotal = #LAYOUT,
		areaLabel = GameConfig.Area.label,
		areaComplete = state.areasComplete[GameConfig.Area.id] == true,
		upgrades = upgrades,
	}
end

local function push(player: Player, state: PlayerState)
	stateChanged:FireClient(player, snapshot(state))
end

-------------------------------------------------------------- the clear loop

local function clearPatch(player: Player, state: PlayerState, patch: Patch)
	local instance = patch.instance
	if instance then
		instance:Destroy()
	end
	state.patches[patch.index] = nil
	state.cleared[patch.index] = true
	state.clearedCount += 1
	state.currency += math.max(1, math.floor(patch.value * payoutMultiplier(state)))
	state.dirty = true

	if patch.relic and not state.collection[patch.relic] then
		state.collection[patch.relic] = true
		relicFound:FireClient(player, patch.relic)
	end

	if state.clearedCount >= #LAYOUT and not state.areasComplete[GameConfig.Area.id] then
		state.areasComplete[GameConfig.Area.id] = true
		-- 01-FOUNDATION.md: completing the area is the lap. There is no deeper area in
		-- this slice, so the loop's fifth step has nowhere to go yet and says so.
		relicFound:FireClient(player, `__area_complete:{GameConfig.Area.label}`)
	end
end

local function tick()
	for player, state in pairs(states) do
		local character = player.Character
		local root = character and character:FindFirstChild("HumanoidRootPart")
		if not root or not root:IsA("BasePart") then
			continue
		end
		local radius = clearRadius(state)
		local here = root.Position
		local hit = false
		for _, patch in pairs(state.patches) do
			local d = (Vector3.new(patch.position.X, here.Y, patch.position.Z) - here).Magnitude
			if d <= radius then
				clearPatch(player, state, patch)
				hit = true
			end
		end
		if hit then
			push(player, state)
		end
	end
end

--------------------------------------------------------------------- lifecycle

requestState.OnServerEvent:Connect(function(player)
	local state = states[player]
	if state then
		push(player, state)
	end
end)

buyUpgrade.OnServerEvent:Connect(function(player, id)
	local state = states[player]
	if not state or type(id) ~= "string" then
		return
	end
	local upgrade = upgradeById(id)
	if not upgrade then
		return
	end
	local level = state.upgrades[id] or 0
	if level >= upgrade.maxLevel then
		return
	end
	local cost = GameConfig.upgradeCost(upgrade, level)
	if state.currency < cost then
		return
	end
	state.currency -= cost
	state.upgrades[id] = level + 1
	state.dirty = true
	if id == "speed" then
		applyWalkSpeed(player, state)
	end
	push(player, state)
end)

Players.PlayerAdded:Connect(function(player)
	local state = load(player)
	state.slot = claimSlot()
	states[player] = state

	local function onCharacter()
		-- One frame for the character to finish assembling, or PivotTo lands on a
		-- rig that is still being welded together.
		task.wait(0.1)
		if not player.Parent then
			return
		end
		spawnPlot(player, state)
		applyWalkSpeed(player, state)
		push(player, state)
	end

	if player.Character then
		task.spawn(onCharacter)
	end
	player.CharacterAdded:Connect(function()
		-- The plot is rebuilt on respawn rather than kept, so cleared patches stay
		-- cleared and nothing has to diff.
		if state.plot then
			state.plot:Destroy()
			state.plot = nil
		end
		task.spawn(onCharacter)
	end)
end)

Players.PlayerRemoving:Connect(function(player)
	local state = states[player]
	if state then
		save(player, state)
		if state.plot then
			state.plot:Destroy()
		end
		slotTaken[state.slot] = nil
	end
	states[player] = nil
end)

game:BindToClose(function()
	if RunService:IsStudio() then
		return
	end
	for player, state in pairs(states) do
		save(player, state)
	end
end)

task.spawn(function()
	while true do
		task.wait(GameConfig.ClearTickRate)
		local ok, err = pcall(tick)
		if not ok then
			warn(`[arga] tick error: {err}`)
		end
	end
end)

task.spawn(function()
	while true do
		task.wait(GameConfig.SaveIntervalSeconds)
		for player, state in pairs(states) do
			save(player, state)
		end
	end
end)

print(`[arga] ruin loop up — {#LAYOUT} patches, {GameConfig.RelicsPerArea} relics buried`)
