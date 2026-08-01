--!strict
--[[
	modifiers — shared.

	THE ONE IMPLEMENTATION of `effective(state, axis)`: the single answer to "what is
	this player's actual value multiplier / clear radius / walk speed right now".
	modifiers.singleDefinition says that function has exactly one implementation and
	every consumer calls it, which is why progression no longer owns clearRadius,
	walkSpeed or valueMultiplier and why nothing else may recompute them.

	FOUR STEPS, IN modifiers.resolutionOrder AND IN NO OTHER ORDER:

	    1. GameConfig.upgradeEffect(def, heldLevel)   -- base and level together
	    2. x every set-completion factor on this axis -- collection declaration order
	    3. x every purchase factor on this axis       -- offer-ladder order
	    4. clamp ONCE against ceiling(axis, live area ordinal)

	Three things that were real defects somewhere and are structural here:

	  * `upgrades[axis].base` is ALREADY INSIDE upgradeEffect. Steps 2 and 3 are
	    FACTORS multiplied onto its result; nothing multiplies the base back in.
	    modifiers.baseIsNotAppliedTwice. Applying the value multiplier a second time
	    squares the Value upgrade.
	  * The clamp happens ONCE, after every source, never between two sources —
	    modifiers.clampApplication.
	  * Set completion is derived from `state.found` on EVERY call and purchase
	    factors from `state.owned` on EVERY call. Nothing is latched, cached or
	    persisted, which is why stateShape has no `setsComplete` field to go stale.

	This module computes and WRITES NOTHING. It never yields, touches no Instance and
	reads no remote. The write to Humanoid.WalkSpeed is server-main's, in
	wiring.onSpawn and wiring.onPurchase; the tool head's width is tool's. The server
	is the only authority on an effective value — a client that needs one reads it off
	the snapshot, so no client module requires this file.

	Every number comes from GameConfig. The only arithmetic written out by hand is the
	two ceiling expressions, because modifiers.axes[].ceilingRule is prose in the
	config and prose cannot be evaluated; `auditCeilingRules` below warns if a rule is
	added to the config that this module has no branch for.
]]

local GameConfig = require(script.Parent.GameConfig) :: any

-- One entry of GameConfig.Upgrades, in the emitter's spelling.
type UpgradeDef = {
	id: string,
	label: string,
	maxLevel: number,
	perLevel: number,
	base: number,
	mode: string,
}

-- One entry of GameConfig.RelicSets — a collection set and its six Find names.
type RelicSet = {
	id: string,
	label: string,
	depth: number,
	relics: { string },
}

-- One entry of GameConfig.SetBonus.rows. `factor` is optional in this type and not in
-- the shipped config: the interface note for effective() records a config shape whose
-- rows carried an axis and no magnitude, and says an absent factor reads as 1.0 with a
-- warning naming the sets. The shipped rows all carry 1.2, so that path is dormant.
type SetBonusRow = {
	setId: string,
	depth: number,
	axis: string,
	factor: number?,
}

-- One entry of GameConfig.Products.items. `gamePassId` is nil on every shipped item,
-- so entitlements resolves every ownership to false and step 3 is currently empty.
type ProductItem = {
	id: string,
	axis: string,
	factor: number?,
}

-- One entry of GameConfig.Modifiers.axes. `ceilingRule` is PROSE, not an expression.
type AxisDef = {
	id: string,
	label: string,
	ceilingRule: string?,
}

-- Exactly the blocks of GameConfig this module reads, so a strict checker can see the
-- shape across a require it cannot resolve. Not a copy of any value.
type ConfigShape = {
	Upgrades: { UpgradeDef },
	RelicSets: { RelicSet },
	SetBonus: { rows: { SetBonusRow } },
	Products: {
		items: { ProductItem },
		headroom: {
			H1_axisCeiling: { marginFraction: number },
			clampMayAbsorbAPurchase: boolean,
		},
	},
	Modifiers: { factorFloor: number, axes: { AxisDef } },
	Plots: { laneWidthStuds: number },
	Depths: { areas: { { ordinal: number } } },
	Area: { size: number },
	BaseClearRadius: number,
	ClearTickRate: number,
	upgradeEffect: (UpgradeDef, number) -> number,
}

local Config: ConfigShape = GameConfig

--[[
	The three fields of PlayerState this module READS, and no others. It writes none of
	them: `effective` is pure.

	Types.luau is the generated home of PlayerState and says to require it rather than
	declare a copy. It is not listed as a dependency of this module, and an instance
	require does not resolve for the repo's `luau-analyze`, so this narrow reader type
	is declared here instead — noted in the build report. A full PlayerState satisfies
	it structurally.
]]
export type PlayerState = {
	upgrades: { [string]: number },
	found: { [string]: boolean },
	owned: { [string]: boolean },
	areasFinished: number,
}

-- The axis ids. modifiers.axisIdsJoinUpgrades: axes[].id is upgrades[].id VERBATIM,
-- and "Pace is a label and never an id". A previous version used "pace" here and
-- effective() could not resolve the axis at all.
local VALUE_ID = "value"
local RADIUS_ID = "radius"
local SPEED_ID = "speed"

-- modifiers.factorFloor. A source may never contribute a factor below this.
local FACTOR_FLOOR: number = Config.Modifiers.factorFloor

local Modifiers = {}

-- Forward declaration. The audit calls Modifiers.ceiling and Modifiers.ceiling calls the
-- audit, so one of the two has to be named before it is defined. It stays a local rather
-- than a member because the Must-expose list is exactly two functions and a third one on
-- the returned table is an invitation to call it.
local runAudit: () -> ()

-- ---------------------------------------------------------------------------
-- Lookups. All linear over three-to-eight-entry arrays; GameConfig exposes no
-- by-id accessor, and a module may do no work at require time, so no index is built.
-- ---------------------------------------------------------------------------

local function findUpgrade(axis: string): UpgradeDef?
	for _, def in ipairs(Config.Upgrades) do
		if def.id == axis then
			return def
		end
	end
	return nil
end

-- An axis that is not an upgrades[].id is forbidden by modifiers.forbidden and is an
-- error rather than a fallback: a substituted number would be indistinguishable from a
-- specified one at the call site.
local function requireAxis(axis: string): UpgradeDef
	return assert(
		findUpgrade(axis),
		`modifiers: "{axis}" is not an id in GameConfig.Upgrades; the three axes are "{VALUE_ID}", "{RADIUS_ID}" and "{SPEED_ID}"`
	)
end

local function setBonusRowFor(setId: string): SetBonusRow?
	for _, row in ipairs(Config.SetBonus.rows) do
		if row.setId == setId then
			return row
		end
	end
	return nil
end

-- The level the player HOLDS. A missing key reads as level 0; no upgrade is written
-- into state.upgrades until it is bought.
local function heldLevel(state: PlayerState, axis: string): number
	return state.upgrades[axis] or 0
end

-- A factor that may not be admitted contributes 1, which is the identity for a
-- multiplicative step. Both rejection cases are audited and warned once at first use,
-- so this stays allocation-free on the tick path.
local function admit(factor: number?): number
	if factor == nil or factor < FACTOR_FLOOR then
		return 1
	end
	return factor
end

-- ---------------------------------------------------------------------------
-- The ceilings.
--
-- Neither is stored as a number anywhere: modifiers.axes[].ceilingRule is a prose
-- string. Both are written from named GameConfig values below and both are checked
-- against the config's own statement of them by the one-time audit.
-- ---------------------------------------------------------------------------

--[[
	The lane's cross-lane width at an area ordinal.

	modifiers.axes[radius].ceilingRule is "effective < area.size / 2" and
	products.headroom.ceilings.radius is "plots.laneWidthStuds / 2"; the interface note
	says these are "the same number by both routes" and that the ordinal parameter
	exists "even though every area is the same lane width today". An area grows by
	getting LONGER in Z — depths.areas[].footprintStuds2 over plots.laneWidthStuds is
	its bay length — and never wider, so this is ordinal-independent and stays a
	function of the ordinal so that it has somewhere to go if that changes.
]]
local function laneWidthAt(areaOrdinal: number): number
	return Config.Plots.laneWidthStuds
end

--[[
	The ceiling for an axis at an area ordinal, or nil when the axis has none.

	value  — nil. modifiers.axes[value].ceilingRule is null: "a currency multiplier
	         breaks no invariant", so the clamp is skipped entirely.
	radius — area.size / 2 = 60. Beyond it "one position clears the whole area and a
	         lap stops existing".
	speed  — movement.baseClearRadius / runtime.clearTickRate = 5.5 / 0.12 = 45.83.
	         Beyond it "the player outruns the tool between ticks and patches are never
	         cleared". The config's H1 block spells this divisor runtime.serverTickSeconds,
	         which is not a key that exists; clearTickRate is the emitted name and the
	         interface note gives the same 45.83 from it.
]]
function Modifiers.ceiling(axis: string, areaOrdinal: number): number?
	runAudit()
	requireAxis(axis)

	if axis == RADIUS_ID then
		return laneWidthAt(areaOrdinal) / 2
	elseif axis == SPEED_ID then
		return Config.BaseClearRadius / Config.ClearTickRate
	end

	-- value, and any axis the ladder grows that carries no ceiling rule. The audit
	-- warns if the config states a rule this branch does not implement.
	return nil
end

-- ---------------------------------------------------------------------------
-- The one-time audit.
--
-- Everything here is a warning about the CONFIG, never about a player. It runs once,
-- on the first call to effective() or ceiling() — not at require time, which the tree
-- forbids, and not from a boot hook, because wiring names no step that would call one.
-- effective() is called on every character spawn, so "once, early" is what this is.
-- ---------------------------------------------------------------------------

local audited = false

-- Every set factor on an axis, whether or not the set is complete, and every purchase
-- factor on it, whether or not it is owned. This is the quantity products.headroom.H1
-- bounds: the most the sources can ever multiply an axis by.
local function maxSetFactorProduct(axis: string): number
	local product = 1
	for _, row in ipairs(Config.SetBonus.rows) do
		if row.axis == axis then
			product *= admit(row.factor)
		end
	end
	return product
end

local function maxPurchaseFactorProduct(axis: string): number
	local product = 1
	for _, item in ipairs(Config.Products.items) do
		if item.axis == axis then
			product *= admit(item.factor)
		end
	end
	return product
end

-- setBonus rows that name an axis and no magnitude. The interface note for effective()
-- asks for one warning naming them, because a completed set then changes nothing at all
-- and a player would experience a finished collection that pays nothing.
local function auditSetFactors()
	local missing: { string } = {}
	for _, row in ipairs(Config.SetBonus.rows) do
		if row.factor == nil then
			table.insert(missing, row.setId)
		end
	end
	if #missing > 0 then
		warn(
			`modifiers: GameConfig.SetBonus.rows carries no factor for {table.concat(missing, ", ")}; `
				.. `those sets are read as 1.0 and completing them changes nothing`
		)
	end
end

-- modifiers.forbidden bans "a factor below 1, in any source". A configuration that
-- carries one is a defect, not a game state, so it is named and read as 1 rather than
-- admitted or thrown at a player on a tick.
local function auditFactorFloor()
	for _, row in ipairs(Config.SetBonus.rows) do
		local factor = row.factor
		if factor ~= nil and factor < FACTOR_FLOOR then
			warn(
				`modifiers: set "{row.setId}" carries factor {factor}, below modifiers.factorFloor {FACTOR_FLOOR}; `
					.. `read as 1`
			)
		end
	end
	for _, item in ipairs(Config.Products.items) do
		local factor = item.factor
		if factor ~= nil and factor < FACTOR_FLOOR then
			warn(
				`modifiers: product "{item.id}" carries factor {factor}, below modifiers.factorFloor {FACTOR_FLOOR}; `
					.. `read as 1`
			)
		end
	end
end

-- The radius ceiling is derivable two ways and the design asserts they agree. If a
-- re-emit ever moves one, the clamp silently changes and nobody is told; this tells them.
local function auditCeilingRules()
	local byArea = Config.Area.size / 2
	local byLane = Config.Plots.laneWidthStuds / 2
	if byArea ~= byLane then
		warn(
			`modifiers: the radius ceiling disagrees by route — GameConfig.Area.size / 2 is {byArea} and `
				.. `GameConfig.Plots.laneWidthStuds / 2 is {byLane}; this module uses the lane width, which is `
				.. `the one defined for every area ordinal`
		)
	end

	for _, axisDef in ipairs(Config.Modifiers.axes) do
		local implemented = axisDef.id == RADIUS_ID or axisDef.id == SPEED_ID
		if axisDef.ceilingRule ~= nil and not implemented then
			warn(
				`modifiers: GameConfig.Modifiers.axes["{axisDef.id}"] states a ceilingRule ("{axisDef.ceilingRule}") `
					.. `that modifiers.ceiling does not implement; that axis is clamped by nothing`
			)
		end
	end
end

--[[
	products.headroom.H1_axisCeiling, asserted for every axis and every authored area
	ordinal: the ladder at max level, times every set factor on the axis, times every
	purchase factor on it, must stay at or below marginFraction (0.9) times the ceiling.

	products.headroom.clampMayAbsorbAPurchase is false — a configuration in which the
	clamp would eat a factor somebody paid Robux for is a warning, not a silent flatline
	at the ceiling.
]]
local function auditHeadroom()
	local margin: number = Config.Products.headroom.H1_axisCeiling.marginFraction

	for _, def in ipairs(Config.Upgrades) do
		local ladderMax = Config.upgradeEffect(def, def.maxLevel)
		local combined = ladderMax * maxSetFactorProduct(def.id) * maxPurchaseFactorProduct(def.id)

		-- The tightest ceiling over the authored ladder, and the ordinal that owns it.
		-- Every ordinal carries the same ceiling today, so this is one warning per axis
		-- rather than one per area; the ordinal is named so the message still points
		-- somewhere if that stops being true.
		local tightest: number? = nil
		local tightestOrdinal = 0
		for _, area in ipairs(Config.Depths.areas) do
			local cap = Modifiers.ceiling(def.id, area.ordinal)
			if cap ~= nil and (tightest == nil or cap < tightest) then
				tightest = cap
				tightestOrdinal = area.ordinal
			end
		end

		if tightest ~= nil and combined > margin * tightest then
			warn(
				`modifiers: headroom H1 fails on axis "{def.id}" at area ordinal {tightestOrdinal} — `
					.. `ladder max {ladderMax} times every set and purchase factor is {combined}, above `
					.. `{margin} x ceiling {tightest}. products.headroom.clampMayAbsorbAPurchase is false, so `
					.. `reduce a factor rather than letting the clamp absorb one`
			)
		end
	end
end

-- Guarded so the audit runs once per server, and so auditHeadroom calling ceiling(),
-- which calls this, does not recurse: the flag is set before any of it runs.
function runAudit()
	if audited then
		return
	end
	audited = true

	auditSetFactors()
	auditFactorFloor()
	auditCeilingRules()
	auditHeadroom()
end

-- ---------------------------------------------------------------------------
-- Step 2 — set completion.
-- ---------------------------------------------------------------------------

-- discovery.record.derived: setComplete(setId) is "every name in that set is true".
-- Derived from state.found on every read; never latched, never persisted.
local function isSetComplete(state: PlayerState, set: RelicSet): boolean
	for _, findName in ipairs(set.relics) do
		if not state.found[findName] then
			return false
		end
	end
	return true
end

-- modifiers.withinStepOrder: collection declaration order. The axis test comes before
-- the completion test so a set on another axis costs one comparison rather than six
-- map lookups on every tick.
local function setFactorProduct(state: PlayerState, axis: string): number
	local product = 1
	for _, set in ipairs(Config.RelicSets) do
		local row = setBonusRowFor(set.id)
		if row ~= nil and row.axis == axis and isSetComplete(state, set) then
			product *= admit(row.factor)
		end
	end
	return product
end

-- ---------------------------------------------------------------------------
-- Step 3 — purchases.
-- ---------------------------------------------------------------------------

-- modifiers.sources[purchase].storage: recomputed from live ownership at every read.
-- state.owned is resolved by entitlements at join, before the state is published, and
-- is never persisted. Every shipped gamePassId is nil, so every value is false today
-- and this step contributes 1 for every axis.
local function purchaseFactorProduct(state: PlayerState, axis: string): number
	local product = 1
	for _, item in ipairs(Config.Products.items) do
		if item.axis == axis and state.owned[item.id] then
			product *= admit(item.factor)
		end
	end
	return product
end

-- ---------------------------------------------------------------------------
-- The function this module exists for.
-- ---------------------------------------------------------------------------

--[[
	The axis's effective value: a multiplier for "value", studs for "radius", studs per
	second for "speed".

	Pure. Reads state.upgrades, state.found, state.owned and state.areasFinished and
	writes nothing. Never yields.

	At every level 0 with no set complete and nothing owned this returns upgrades[axis].base
	exactly — 1, 5.5 and 16 — because step 1 is upgradeEffect at level 0 and steps 2 and 3
	are empty products.
]]
function Modifiers.effective(state: PlayerState, axis: string): number
	runAudit()

	local def = requireAxis(axis)

	-- 1. base and level together. THIS ALREADY CONTAINS upgrades[axis].base.
	local result = Config.upgradeEffect(def, heldLevel(state, axis))

	-- 2. set completion, then 3. purchases. Both are FACTORS on the above.
	result *= setFactorProduct(state, axis)
	result *= purchaseFactorProduct(state, axis)

	-- 4. ONE clamp, after every source. The live area is areasFinished + 1.
	local cap = Modifiers.ceiling(axis, state.areasFinished + 1)
	if cap ~= nil then
		result = math.min(result, cap)
	end

	return result
end

return Modifiers
