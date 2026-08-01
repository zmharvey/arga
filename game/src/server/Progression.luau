--!strict
--[[
	progression — server.

	Owns the balance, the held upgrade levels, the purchase decision, and the
	latch that lifts an upgrade row. The one sink (an upgrade purchase) and the
	one faucet's credit (a patch clear) both land here.

	THIS MODULE COMPUTES NO EFFECTIVE VALUE. `clearRadius`, `walkSpeed` and
	`valueMultiplier` used to live here and are now `modifiers.effective(state, axis)`:
	modifiers.singleDefinition is "effective(axis) has exactly one implementation and
	every consumer calls it", and a convenience copy here is precisely the second
	implementation that rule exists to forbid. Nothing below calls upgradeEffect,
	multiplies a set or purchase factor, or applies a ceiling clamp. `award` takes an
	amount the caller has ALREADY multiplied — economy.faucets[patch-clear].multiplierAppliedOnce
	is "at this site only; never again inside the award function".

	Both curves it does use are GameConfig's and are never reimplemented or inlined:
	GameConfig.upgradeCost prices a purchase and lifts a row, and `level` in that call
	is always the level the player HOLDS, so the first purchase is upgradeCost(def, 0)
	== def.costBase and the price of moving from 3 to 4 is upgradeCost(def, 3).

	It reads and writes three PlayerState fields — currency, upgrades, rowsRevealed —
	and nothing else. It touches no Instance, fires no remote and yields nowhere.
]]

local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Shared = ReplicatedStorage:WaitForChild("UIForge")
local GameConfig = require(Shared.GameConfig)

-- One entry of GameConfig.Upgrades, in the emitter's spelling.
type UpgradeDef = {
	id: string,
	label: string,
	blurb: string,
	costBase: number,
	costGrowth: number,
	maxLevel: number,
	perLevel: number,
	base: number,
	mode: string,
}

-- The ladder, once, under its declared element type. An instance require resolves to
-- `unknown` for the analyser, so this is the one place the shape of a config block is
-- restated; every read below goes through it and the module keeps no copy of a value.
-- It is a reference, not work: no iteration and no allocation happens at require time.
local UPGRADES: { UpgradeDef } = GameConfig.Upgrades

-- The three PlayerState fields this module is the writer of, and only those. This is a
-- structural SUBSET of Types.PlayerState, not a rival declaration of it: the other
-- fields belong to clearing, plots, entitlements and persistence, and naming them here
-- is how progression would come to depend on one. If a field below ever disagrees with
-- Types.luau, Types.luau is right.
export type PlayerState = {
	currency: number,
	upgrades: { [string]: number },
	rowsRevealed: { [string]: boolean },
}

local Progression = {}

-- Returns the definition for an id, or nil if the ladder has no such axis. Linear over
-- three entries, on purchase only; no index is built, because a module may do no work at
-- require time. An unknown id is an ordinary outcome here, not an error: the id arrives
-- from a client message and the only correct response to a bad one is `false`.
local function findUpgrade(upgradeId: string): UpgradeDef?
	for _, def in ipairs(UPGRADES) do
		if def.id == upgradeId then
			return def
		end
	end
	return nil
end

-- The level the player HOLDS. A missing key reads as level 0; no upgrade is written into
-- state.upgrades until it is bought.
local function heldLevel(state: PlayerState, upgradeId: string): number
	return state.upgrades[upgradeId] or 0
end

--[[
	Lift every upgrade row whose level-1 cost the balance now meets.

	firstSession.withheld.upgradeRow: presentAtJoin false, liftedBy "balance has reached
	upgrades[i] level-1 cost", latched true, one persisted boolean per row.

	NEVER SETS ONE FALSE. firstSession.suppressionForbidden lists reSuppression, so a row
	that has appeared stays for the life of the save even if the balance then falls to
	zero. Idempotent: safe to call on every credit and again on join.

	Returns true if any row lifted on THIS call, so a caller can tell a state-changing
	pass from a no-op one.
]]
function Progression.revealRows(state: PlayerState): boolean
	local lifted = false
	for _, def in ipairs(UPGRADES) do
		if state.rowsRevealed[def.id] ~= true and state.currency >= GameConfig.upgradeCost(def, 0) then
			state.rowsRevealed[def.id] = true
			lifted = true
		end
	end
	return lifted
end

--[[
	The only function that increases currency, and clearing's patch-clear credit is its
	only caller — economy.faucetCount is 1.

	`amount` is a positive whole number to ADD, already multiplied by
	modifiers.effective(state, "value") and already floored at economy.payoutFloor by the
	caller. It is not a new total, and no multiplier of any kind is applied here.

	A non-positive award is a caller bug — the payout floor is 1 — so it is rejected
	outright rather than clamped, the balance is left exactly as it was, and the unchanged
	balance is returned. The test is written `not (amount > 0)` so that NaN is rejected
	too. Nothing caps the balance: economy.balanceCap is null.

	Reveals rows after crediting, so a row lifts on the tick the balance crosses its
	threshold rather than on the next purchase attempt.
]]
function Progression.award(state: PlayerState, amount: number): number
	if not (amount > 0) then
		warn(`progression.award: ignoring a non-positive award of {amount}`)
		return state.currency
	end

	state.currency += amount
	Progression.revealRows(state)
	return state.currency
end

--[[
	Validate and apply, or change nothing and return false. economy.sinkCount is 1 and
	this is it.

	The client sends an id and nothing else: the definition, the held level and the price
	are all read here — economy.authority is "server only; no client message carries a
	cost, an amount or a balance".

	Returns false and mutates NOTHING if the id names no upgrade, if the held level has
	already reached def.maxLevel, or if the balance is below the price of the next level.
	economy.sinks[0].onInsufficientFunds is "nothing changes, nothing is deducted, no
	partial purchase exists", and economy.negativeBalance makes a balance below zero
	impossible by never taking the branch that would produce one.

	THE FAILURE IS SILENT AND STAYS SILENT. input.verbs[buy].onPreconditionFail is
	silentNoOp and input.pressable.rejectionCueOnFailedPrecondition is "none": there is no
	warn, no sound, no packet and no return value beyond `false` on any rejection path, and
	adding one here would put a rejection cue on the server side of a channel the design
	says has none.

	On success, exactly one price is deducted and exactly one level is added. The caller
	reads the new level back from state.upgrades[upgradeId].
]]
function Progression.tryBuy(state: PlayerState, upgradeId: string): boolean
	local def = findUpgrade(upgradeId)
	if def == nil then
		return false
	end

	local level = heldLevel(state, upgradeId)
	if level >= def.maxLevel then
		return false
	end

	local cost = GameConfig.upgradeCost(def, level)
	if state.currency < cost then
		return false
	end

	state.currency -= cost
	state.upgrades[upgradeId] = level + 1
	return true
end

return Progression
