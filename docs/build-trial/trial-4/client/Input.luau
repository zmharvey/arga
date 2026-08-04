--!strict
--[[
	Input — the purchase affordance, and the only client-originated message in the game.

	A press of 1, 2 or 3 fires BuyUpgrade with the id of the 1st, 2nd or 3rd entry of
	GameConfig.Upgrades and nothing else: no cost, no level, no affordability test. The
	server prices every purchase, so this module holds no state, reads no snapshot and
	makes no decision a server would have to re-make.

	The ids are never spelled here. They are read out of GameConfig.Upgrades in the order
	that table declares them, so re-emitting the config re-aims the keys without anyone
	editing this file. The key order itself is not a free choice: the emitted HUD already
	labels those rows "[1] VALUE", "[2] REACH" and "[3] PACE".

	The remote comes from Protocol.channel("BuyUpgrade"), which is the only path from a
	name to a remote Instance in the game. This module never searches the tree for a
	remote and never accepts one from its caller.

	Nothing happens at require time beyond resolving the shared root: connect() resolves
	the channel and builds the key map, per tree's rule that a module returns one table
	and does no work on load.
]]

local ReplicatedStorage = game:GetService("ReplicatedStorage")
local UserInputService = game:GetService("UserInputService")

local Shared = ReplicatedStorage:WaitForChild("UIForge")
local GameConfig = require(Shared.GameConfig)
local Protocol = require(Shared.Protocol)

-- The one channel this module fires. A key of Protocol.REMOTES — Protocol.channel errors
-- on a name it does not declare, so a typo here is a loud failure at connect() rather
-- than a nil somewhere later.
local CHANNEL_NAME = "BuyUpgrade"

-- Keyboard 1, 2 and 3, in order, paired with the 1st, 2nd and 3rd entries of
-- GameConfig.Upgrades. This list is the whole input surface: any other key falls through
-- the map lookup below and sends nothing.
local UPGRADE_KEYS: { Enum.KeyCode } = table.freeze({
	Enum.KeyCode.One,
	Enum.KeyCode.Two,
	Enum.KeyCode.Three,
})

local Input = {}

-- Held so that a second connect() cannot install a second listener and turn one press
-- into two purchase requests.
local connection: RBXScriptConnection? = nil

-- KeyCode -> upgrade id, built from the config's own ordering. Only as many keys as there
-- are upgrades are bound; an upgrade past the end of UPGRADE_KEYS gets no key, and
-- connect() says so out loud rather than leaving it quietly unbuyable.
local function buildKeyMap(): { [Enum.KeyCode]: string }
	local map: { [Enum.KeyCode]: string } = {}
	local bindable = math.min(#UPGRADE_KEYS, #GameConfig.Upgrades)
	for index = 1, bindable do
		map[UPGRADE_KEYS[index]] = GameConfig.Upgrades[index].id
	end
	return map
end

--[[
	Install the purchase affordance. Takes no arguments — it resolves its own channel,
	because there is exactly one way to get a remote and passing resolved Instances
	between modules is a second one.

	Fires BuyUpgrade:FireServer(upgradeId) and nothing else, one id per press. Input is
	ignored entirely while a text box has focus, and every key that is not in UPGRADE_KEYS
	sends nothing.

	Called once, by client-main, in wiring.onClientBoot step 4.
]]
function Input.connect(): ()
	if connection ~= nil then
		warn("Input.connect: already connected; ignoring this call")
		return
	end

	if #GameConfig.Upgrades > #UPGRADE_KEYS then
		warn(
			string.format(
				"Input.connect: %d upgrades are declared but only %d keys are bound; the rest cannot be bought",
				#GameConfig.Upgrades,
				#UPGRADE_KEYS
			)
		)
	end

	local keyToUpgradeId = buildKeyMap()

	-- Resolved once, here, rather than per press: the first call may WaitForChild for the
	-- Remotes Folder to replicate, and a keystroke is the wrong moment to yield.
	local buyUpgrade: RemoteEvent = Protocol.channel(CHANNEL_NAME)

	connection = UserInputService.InputBegan:Connect(function(inputObject: InputObject)
		-- A focused text box owns the keyboard. Checked explicitly rather than by trusting
		-- InputBegan's gameProcessed flag, so that "typing 3 in a text field does not buy
		-- Pace" does not depend on what else in the place happens to consume input.
		if UserInputService:GetFocusedTextBox() then
			return
		end

		local upgradeId = keyToUpgradeId[inputObject.KeyCode]
		if upgradeId == nil then
			return
		end

		buyUpgrade:FireServer(upgradeId)
	end)
end

return Input
