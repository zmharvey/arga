--!strict
--[[
	GENERATED FILE — do not edit.

	Emitted from CID spec sheets by `npm run bridge -- --emit`. Edit the sheet that
	owns a value and re-emit; a hand edit here is overwritten and, worse, silently
	diverges from the sheet that is supposed to be the record.

	Every number below was supplied by a named sheet. `npm run bridge` prints which.

	This module constructs no Roblox types — RGB triples and plain numbers only — so it
	loads outside the engine and its curves can be executed by
	`game/test/config.spec.luau`. Config that only loads inside Roblox is config
	nobody checks.
]]

local GameConfig = {}

-- Overgrowth tiers. From gameplay/systems/01-overgrowth-tiers.md.
--
-- `shape` is the primary channel and `rgb` is secondary, because rarity has to stay
-- readable with the colour thrown away. The schema refuses two tiers that share a
-- shape, so this property cannot be lost by editing a sheet.
GameConfig.Tiers = {
	{ name = "Moss", shape = "Block", rgb = { 104, 142, 76 }, value = 1, weight = 52, height = 1.6 },
	{ name = "Fern", shape = "Cylinder", rgb = { 78, 128, 66 }, value = 3, weight = 28, height = 2.4 },
	{ name = "Bramble", shape = "Ball", rgb = { 58, 104, 58 }, value = 8, weight = 14, height = 2.8 },
	{ name = "Heartvine", shape = "Wedge", rgb = { 44, 86, 52 }, value = 20, weight = 6, height = 3.4 },
}

-- The spend side of the loop. From gameplay/balance/01-upgrade-ladder.md.
--
-- `base` and `mode` exist because `perLevel` alone does not describe an effect. A builder
-- handed 1.1 cannot tell whether maxed Reach is 14.3 or 11.79, and both readings satisfied
-- every acceptance criterion that existed before the first build trial asked.
GameConfig.Upgrades = {
	{
		id = "value",
		label = "Value",
		blurb = "Each patch pays more",
		costBase = 25,
		costGrowth = 1.6,
		maxLevel = 10,
		perLevel = 0.25,
		base = 1,
		mode = "additive",
	},
	{
		id = "radius",
		label = "Reach",
		blurb = "Clear a wider sweep as you walk",
		costBase = 40,
		costGrowth = 1.75,
		maxLevel = 8,
		perLevel = 1.1,
		base = 5.5,
		mode = "additive",
	},
	{
		id = "speed",
		label = "Pace",
		blurb = "Move faster between patches",
		costBase = 60,
		costGrowth = 1.8,
		maxLevel = 6,
		perLevel = 1.6,
		base = 16,
		mode = "additive",
	},
}

-- The one formula. Every axis goes through here, so "additive or compounding" is answered
-- in one place rather than re-decided by each module that reads a level.
function GameConfig.upgradeEffect(upgrade: { base: number, perLevel: number, mode: string }, level: number): number
	if upgrade.mode == "compounding" then
		return upgrade.base * (upgrade.perLevel ^ level)
	end
	return upgrade.base + upgrade.perLevel * level
end

-- Movement, before upgrades. From gameplay/mechanics/01-reach-and-pace.md.
GameConfig.BaseClearRadius = 5.5
GameConfig.BaseWalkSpeed = 16

-- The currency. From gameplay/systems/02-the-currency.md.
--
-- This existed as the bare string "SHARDS" in a HUD brief and in the shipped screen
-- before any sheet owned it, which is how an unowned value hides: the merger cannot see
-- a literal nobody declared. Every display of the currency now derives from here.
GameConfig.Currency = {
	name = "Shard",
	plural = "Shards",
	icon = "shard",
}

-- One patch's physical footprint. From art/objects/01-patch-footprint.md.
GameConfig.Patch = {
	footprint = 3,
	collides = false,
	material = "Grass",
}

-- The area. From gameplay/meta/01-the-area.md.
--
-- The schema checks that patchCount actually fits at this size and spacing, so an
-- area cannot quietly under-fill and be smaller than it claims.
GameConfig.Area = {
	id = "east-terrace",
	label = "East Terrace",
	originXZ = { 0, 0 },
	size = 120,
	patchCount = 140,
	minSpacing = 6,
}

-- The collection. From gameplay/meta/02-the-collection.md.
--
-- These names are CID's work, not the builder's. When they were absent the builder
-- invented six of them, which is the exact failure this seam exists to remove.
GameConfig.RelicSets = {
	{ id = "terrace", label = "Terrace", depth = 1, relics = { "Sundial", "Ewer", "Hinge", "Tessera", "Stylus", "Bellcast" } },
	{ id = "cistern", label = "Cistern", depth = 2, relics = { "Sluice", "Weight", "Siphon", "Chain", "Grate", "Cup" } },
	{ id = "vault", label = "Vault", depth = 3, relics = { "Seal", "Ledger", "Coffer", "Key", "Tally", "Ring" } },
	{ id = "spire", label = "Spire", depth = 4, relics = { "Gnomon", "Lens", "Vane", "Crest", "Orrery", "Finial" } },
}

GameConfig.RelicsPerArea = 3

-- How many areas exist at one depth. In SCHEMA but previously not emitted, so a
-- config-level predicate could not see the value it depended on. Found by the
-- depth-escalation sheet: a key that validates but never reaches the build is a key
-- nothing downstream can check.
GameConfig.AreasPerDepth = 2

-- The player-facing word for the class. Renamed once already, by a ban list that the
-- merger enforces: the previous noun was occupied inside this game's own genre family.
GameConfig.FindNoun = { singular = "Find", plural = "Finds" }

-- From gameplay/onboarding/01-first-find.md. The first find is placed, not rolled, so the promise
-- that the first patch has something under it cannot be broken by the shuffle.
GameConfig.GuaranteedFirstRelic = true

-- Server cadences. From 01-runtime.md.
--
-- RespawnDelaySeconds is here rather than in a task.wait literal because
-- Players.CharacterAutoLoads is off, which makes the engine's own Players.RespawnTime
-- dead and hands the whole respawn to server-main. The first playtest found nobody
-- had been handed it: a player who died stayed dead for the session.
GameConfig.ClearTickRate = 0.12
GameConfig.SaveIntervalSeconds = 45
GameConfig.RespawnDelaySeconds = 3
GameConfig.DataStoreName = "ArgaRuin_v2"

-- LayoutSeed is the ONLY seed in the game. layout.composition draws an area's chunk run
-- from (layoutSeed, areaOrdinal) and layout.anchorSource derives every patch anchor from
-- hash(layoutSeed, chunkId), so a second source of randomness makes state.cleared -- which
-- is keyed by patch index -- meaningless across a rejoin. MaxPlayers is a READ-ONLY
-- assertion: Players.MaxPlayers cannot be written from a script, so world.configure()
-- compares this against the live value and warns.
--
-- Both were added to runtime after the hand-written block above was written, and the
-- structural emitter below skips runtime because this block claims it. That is how a value
-- can validate, be documented in an interface, and reach nothing: interfaces names
-- GameConfig.LayoutSeed, and until this line existed there was no such field.
GameConfig.LayoutSeed = 20260801
GameConfig.MaxPlayers = 16

-- ==========================================================================
-- Waves 2-3. Emitted structurally from the manifest, whole.
--
-- The reasoning for each lives in the sheet named beside it. The emitter carries values,
-- never prose -- conflating the two is what made the pre-bridge handoff unusable.
-- ==========================================================================

-- From gameplay/meta/04-the-depth-ladder.md.
GameConfig.Depths = {
		depthCount = 4,
		areaCount = 8,
		sizingRule = "footprint(k) = floorToChunk( min(LAP_TARGET * tau(k), LAP_CEILING * tauTol(k)) / ROUTE_SLACK ), tau(k) = 2*(baseClearRadius + radiusLevel*perLevel)*(baseWalkSpeed + speedLevel*perLevel) at arrival",
		footprintCeilingStuds2 = 73216,
		unlockRule = "the area before it in this list is complete; nothing else conditions any area or any depth",
		areas = {
			{
				ordinal = 1,
				depth = 1,
				setId = "terrace",
				relicSlice = {
					1,
					3,
				},
				label = "East Terrace",
				footprintStuds2 = 14400,
				chunkCount = 4,
				patchCount = 140,
				minSpacing = 6,
				unlock = "none",
			},
			{
				ordinal = 2,
				depth = 1,
				setId = "terrace",
				relicSlice = {
					4,
					6,
				},
				label = "West Terrace",
				footprintStuds2 = 25200,
				chunkCount = 7,
				patchCount = 245,
				minSpacing = 6,
				unlock = "previousAreaComplete",
			},
			{
				ordinal = 3,
				depth = 2,
				setId = "cistern",
				relicSlice = {
					1,
					3,
				},
				label = "East Cistern",
				footprintStuds2 = 39600,
				chunkCount = 11,
				patchCount = 407,
				minSpacing = 6,
				unlock = "previousAreaComplete",
			},
			{
				ordinal = 4,
				depth = 2,
				setId = "cistern",
				relicSlice = {
					4,
					6,
				},
				label = "West Cistern",
				footprintStuds2 = 50400,
				chunkCount = 14,
				patchCount = 518,
				minSpacing = 6,
				unlock = "previousAreaComplete",
			},
			{
				ordinal = 5,
				depth = 3,
				setId = "vault",
				relicSlice = {
					1,
					3,
				},
				label = "East Vault",
				footprintStuds2 = 57600,
				chunkCount = 16,
				patchCount = 624,
				minSpacing = 6,
				unlock = "previousAreaComplete",
			},
			{
				ordinal = 6,
				depth = 3,
				setId = "vault",
				relicSlice = {
					4,
					6,
				},
				label = "West Vault",
				footprintStuds2 = 57600,
				chunkCount = 16,
				patchCount = 624,
				minSpacing = 6,
				unlock = "previousAreaComplete",
			},
			{
				ordinal = 7,
				depth = 4,
				setId = "spire",
				relicSlice = {
					1,
					3,
				},
				label = "East Spire",
				footprintStuds2 = 57600,
				chunkCount = 16,
				patchCount = 640,
				minSpacing = 6,
				unlock = "previousAreaComplete",
			},
			{
				ordinal = 8,
				depth = 4,
				setId = "spire",
				relicSlice = {
					4,
					6,
				},
				label = "West Spire",
				footprintStuds2 = 57600,
				chunkCount = 16,
				patchCount = 640,
				minSpacing = 6,
				unlock = "previousAreaComplete",
			},
		},
		requestedRevisionToCollection = {
			relicsPerArea = 3,
			areasPerDepth = 2,
			sheet = "cid/gameplay/meta/02-the-collection.md",
			reason = "areas at one depth partition that depth's set (gameplay/systems/05); 3 x 2 = 6 is the pair theme/fantasy/02 criterion 1 names",
		},
		invariants = {
			"areas[0].footprintStuds2 == area.size ^ 2 and areas[0].patchCount == area.patchCount and areas[0].minSpacing == area.minSpacing",
			"count of areas at each depth == collection.areasPerDepth; this key does not carry that number",
			"collection.relicsPerArea * collection.areasPerDepth == the size of every set",
			"every relicSlice spans exactly collection.relicsPerArea names and the slices at one depth partition that set with no overlap and no gap",
			"footprintStuds2 is a whole multiple of layout.chunk.footprintStuds2 and equals chunkCount times it",
			"patchCount == chunkCount * layout.patchesPerChunkByDepth[depth]",
			"patchCount / footprintStuds2 is non-decreasing in ordinal and strictly increases at every depth step",
			"minSpacing > movement.baseClearRadius",
			"footprintStuds2 <= footprintCeilingStuds2 for every row",
			"lapSeconds(k) = footprintStuds2(k) / tau(k) * ROUTE_SLACK is inside 75..200 for every row, both at arrival and one upgrade level behind arrival on both throughput axes",
			"patchCount <= lapSeconds(k) / (2 * runtime.clearTickRate)",
		},
	}

-- From gameplay/systems/05-the-find-ledger.md.
GameConfig.Discovery = {
		pool = {
			scope = "per player, per depth",
			source = "collection.sets[depth].relics",
			replacement = "without",
			areasPartitionTheSet = true,
			invariant = "collection.relicsPerArea * collection.areasPerDepth == collection.sets[depth].relics.length",
			invariantHoldsToday = "6 * 1 == 6; this rule changes no shipped behaviour at current values",
			placementIsPlayerIndependent = true,
			placementRule = "the layout seed alone picks which patch indices carry a Find; the area's slice fills those slots in order. Neither the player's found set nor cleared set is an input to placement.",
			placementDomain = "uncleared patches only — derived, not filtered: clearing a patch reveals its Find, so an unfound Find's slot is never a cleared patch",
			stableAcrossRejoin = true,
			exclusionKey = "ever-found; it governs what a slot yields, never where a slot is",
			spatialDistribution = "content-structure work's, not decided here",
			tierWeighting = "none, per the rarity key",
			guaranteedException = "onboarding's first Find sits on the patch nearest the plot origin, from the same seed, and consumes the first slot of depth 1's slice",
		},
		record = {
			keyedBy = "the Find's name, from collection.sets[].relics[].name",
			entries = "sum(collection.sets[].relics.length)",
			fields = {
				{
					name = "found",
					type = "boolean",
					default = false,
					persisted = true,
					writtenBy = "server, at the instant the hiding patch clears",
					clearedBy = "nothing, ever",
				},
			},
			derived = {
				"foundCount = the number of true entries",
				"setComplete(setId) = every name in that set is true",
				"collectionComplete = every name in collection is true",
				"newThisSession = compared against a snapshot taken at join, held in memory, never saved",
			},
			forbiddenFields = {
				"count",
				"duplicates",
				"timesFound",
				"timestamp",
				"foundAt",
				"depthFoundAt",
				"condition",
				"quality",
				"variant",
				"restoredLevel",
				"favourite",
				"seen",
				"isNew",
				"equipped",
				"sortIndex",
				"tradeable",
			},
			growth = "one boolean per name in collection, and nothing else; the record never grows with play",
		},
		["repeat"] = {
			possible = false,
			cause = "only a layout that assigns a name outside its area's slice, which is a build defect and not a game state",
			runtimeBehaviour = "the patch hides nothing, the server logs a warning naming the Find and the patch index, the reveal channel does not fire",
			silentDiscardRatified = false,
			playerFacing = "nothing, and no player can reach this branch; it is a defect path, not the silent duplicate case core-loop/03 forbids",
		},
		luckShaped = false,
		luckShapedDetail = "the partition is fixed and placement is seed-derived, so the SET of Finds a depth yields is fully determined. There is no drop rate, so there is no rate for a multiplier to act on.",
		theOnlyRandomQuantities = {
			"which patch indices the seed picks to carry a slice",
			"the order in which a depth's slices are assigned to its areas",
		},
		sellableLuck = nil,
		persistenceRequirement = "one boolean per name in collection and nothing else; the one part of save data bounded by design rather than by collapse",
	}

-- From gameplay/systems/04-earning-and-spending.md.
GameConfig.Economy = {
		currencyKey = "currency",
		startingBalance = 0,
		balanceCap = nil,
		negativeBalance = "impossible; a purchase that cannot be afforded changes nothing at all",
		authority = "server only; no client message carries a cost, an amount or a balance, and whether a client message exists at all is input's",
		faucetCount = 1,
		faucets = {
			{
				id = "patch-clear",
				trigger = "one patch transitions from standing to cleared",
				formula = "max(payoutFloor, floor(tiers[patch.tierIndex].value * modifiers.effective('value')))",
				perEvent = true,
				rounding = "floor, never round-half-up",
				multiplierAppliedOnce = "at this site only; never again inside the award function",
			},
		},
		payoutFloor = 1,
		payoutFloorReason = "every clear must be a payment, because payoff frequency is measured in payments",
		zeroCreditEvents = {
			{
				id = "area-complete",
				credits = 0,
				paysInstead = "permanence: the area stays cleared and stays walkable",
			},
			{
				id = "set-complete",
				credits = 0,
				paysInstead = "exactly one modifier, per the modifiers key",
			},
			{
				id = "find-reveal",
				credits = 0,
				paysInstead = "one bit in the collection record, per the discovery key",
			},
			{
				id = "session-start",
				credits = 0,
				paysInstead = "nothing: no welcome grant, no return grant, no offline accrual",
			},
			{
				id = "purchase",
				credits = 0,
				paysInstead = "one modifier; Robux never converts to currency at any rate",
			},
		},
		sinkCount = 1,
		sinks = {
			{
				id = "upgrade-purchase",
				debits = "the cost of the next level of one upgrade",
				costOwner = "gameplay/balance",
				triggerOwner = "input, via the buy verb; this key states the debit, never the verb",
				onInsufficientFunds = "nothing changes, nothing is deducted, no partial purchase exists",
				refundable = false,
			},
		},
		atMaxLadder = {
			incomeContinues = true,
			convertsTo = nil,
			newSinkAppears = false,
			readoutHidden = false,
			balanceFrozen = false,
			requirementOnBalance = "the total cost of maxing all three axes must exceed the total currency yielded by clearing the areas needed to complete the collection, so the ladder outlasts it",
			ladderLengthBand = "that requirement is a FLOOR and core-loop/01's 90-second purchase-gap ceiling is a CEILING on the same curve. Where they conflict, the resolution is more levels at smaller steps, never a shorter ladder: a ladder that ends before the collection does leaves the only sink dead mid-game.",
			unownedConsequence = "what the game is once the ladder and the collection are both finished belongs to content-structure work; this key states only that no currency sink appears there",
		},
		forbidden = {
			"a second currency under any name, including a token, a mark, a point or a fragment",
			"a Robux-to-currency exchange rate, bundle or starter pack",
			"an offline, welcome-back, daily, streak or code grant",
			"a currency price on anything that is not an upgrade level",
			"a currency cost charged to enter, re-enter or leave an area",
			"a client-authored or client-trusted award of any size",
			"a payout that varies by anything other than tier and the value modifier",
		},
	}

-- From gameplay/meta/07-after-the-last-find.md.
GameConfig.Endgame = {
		terminalCondition = "the player's found count reaches the total number of names in collection",
		reachedAt = {
			areaOrdinal = 8,
			event = "the reveal on the last patch of West Spire that carries a Find",
		},
		gameEnds = false,
		collectionEnds = true,
		endScreen = false,
		survivingPayoffKinds = {
			"currencyTick",
			"areaCompletion",
		},
		extinctPayoffKinds = {
			"upgradePurchase",
			"findReveal",
			"setCompletion",
		},
		risingQuantity = "areasFinished",
		postTerminalArea = {
			unlimited = true,
			depth = 4,
			setId = "spire",
			label = "Spire",
			labelCarriesNoOrdinalOrNumber = true,
			footprintStuds2 = 57600,
			chunkCount = 16,
			patchCount = 640,
			minSpacing = 6,
			relicSlice = {},
			unlock = "previousAreaComplete",
			drawsFrom = "the depth-4 chunk family, under layout's R1 to R4",
		},
		predicateScopeChange = {
			maxAboveTickGapSeconds = {
				value = 90,
				appliesWhile = "found < totalFinds",
			},
			maxSecondsPerClear = {
				value = 3,
				appliesAlways = true,
			},
			lapSecondsBand = {
				value = {
					75,
					200,
				},
				appliesAlways = true,
			},
			arrivalBelowThroughputCap = {
				appliesWhile = "found < totalFinds",
			},
		},
		persistence = {
			postTerminalAreasStoredAs = "one integer count, never one boolean per area",
			reason = "an unlimited run of identical unnumbered bays must not turn world state into unbounded save data",
		},
		forbidden = {
			"rebirth",
			"prestige",
			"offlineAccrual",
			"dailyReward",
			"seasonPass",
			"seasonalEvent",
			"leaderboard",
			"trading",
			"redeemCode",
			"secondCollection",
			"completionPercent",
			"badgeLadder",
			"secondCurrency",
		},
		invariants = {
			"survivingPayoffKinds and extinctPayoffKinds partition core-loop/02's five kinds with no overlap",
			"postTerminalArea.relicSlice is empty and no post-terminal area buries any name",
			"postTerminalArea's footprint, chunkCount and patchCount equal depths.areas[7]'s",
			"no entry in forbidden appears as an identifier anywhere in game/src",
			"nothing in this key names a reward, a grant, a threshold or a recurrence",
		},
	}

-- From gameplay/onboarding/02-first-minute-beats.md.
GameConfig.FirstSession = {
		armDistanceStuds = 2,
		armScope = "perCharacterSpawn",
		armMeasuredOn = "server, horizontal XZ displacement of the character root from the plot spawn pivot",
		ceilings = {
			secondsToFirstClear = {
				max = 3,
				measuredFrom = "firstInput",
				population = "all run-1 sessions in which any input occurred",
			},
			secondsToFirstReveal = {
				max = 10,
				measuredFrom = "join",
				population = "run-1 sessions whose first input arrived by second 5.0",
			},
		},
		placement = {
			ordering = "patches sorted ascending by XZ distance from the plot spawn point",
			firstFindOrdinal = 1,
			secondFindOrdinalMin = 8,
			secondFindOrdinalMax = 40,
			tierContrastWithinFirstOrdinals = 20,
			spawnToNearestPatchMaxStuds = 3.5,
			spawnToNearestPatchFormula = "movement.baseClearRadius - firstSession.armDistanceStuds",
		},
		firstPurchaseBand = {
			appliesTo = "the cheapest upgrade's level-1 cost",
			minPatchesOfClearing = 10,
			maxSecondsOfClearing = 60,
			atStats = "base",
		},
		beats = {
			{
				id = "spawn",
				bySecond = 0,
				from = "join",
				precondition = "character loaded and pivoted to the plot spawn point",
				guaranteedOutcome = "stands inside standing overgrowth, tool welded and visible, at least one standing patch inside movement.baseClearRadius, clearedCount 0",
				teaches = nil,
			},
			{
				id = "firstClear",
				bySecond = 3,
				from = "firstInput",
				precondition = "armed: horizontal displacement from the spawn pivot has exceeded armDistanceStuds at least once this character life",
				guaranteedOutcome = "at least one patch clears and credits currency on the same server tick",
				teaches = {
					"contactClearing",
					"currency",
				},
			},
			{
				id = "firstReveal",
				bySecond = 10,
				from = "join",
				precondition = "firstClear fired on the patch carrying the placed Find",
				guaranteedOutcome = "exactly one Find is revealed and enters the collection permanently",
				teaches = {
					"theFind",
				},
			},
			{
				id = "firstOrdinaryClear",
				bySecond = 15,
				from = "join",
				testRange = {
					10,
					25,
				},
				precondition = "firstReveal has fired",
				guaranteedOutcome = "at least three patches clear with no reveal",
				teaches = {
					"theFind",
				},
			},
			{
				id = "tierContrast",
				bySecond = 45,
				from = "join",
				testRange = {
					25,
					75,
				},
				precondition = "the first 20 patches by spawn-distance ordinal hold at least two distinct tierIndex values",
				guaranteedOutcome = "two clears with different currency credits and different silhouettes",
				teaches = nil,
			},
			{
				id = "firstSpendAffordable",
				bySecond = 60,
				from = "join",
				testRange = {
					40,
					120,
				},
				awaitingValue = "upgrades[].costBase",
				precondition = "balance has reached the cheapest upgrade's level-1 cost",
				guaranteedOutcome = "the cheapest upgrade row lifts and the player holds enough to buy it",
				teaches = {
					"upgradeAxes",
				},
			},
		},
		teaching = {
			{
				concept = "contactClearing",
				taughtBy = "beat:firstClear",
				byBeat = "firstClear",
				evidence = "five or more clears in the 15 s after the first, with no input gap over 3 s",
				required = true,
			},
			{
				concept = "currency",
				taughtBy = "beat:firstClear",
				byBeat = "firstClear",
				evidence = "the currency readout is non-zero and rising while the player moves",
				required = false,
			},
			{
				concept = "theFind",
				taughtBy = "beat:firstReveal, corrected by beat:firstOrdinaryClear",
				byBeat = "firstOrdinaryClear",
				evidence = "the player keeps clearing new ground after firstOrdinaryClear rather than re-walking the reveal site",
				required = false,
			},
			{
				concept = "upgradeAxes",
				taughtBy = "beat:firstSpendAffordable",
				byBeat = "firstSpendAffordable",
				evidence = "a first purchase occurs in session 1",
				required = false,
			},
			{
				concept = "areaCompletion",
				taughtBy = "the area progress readout moving, and the standing/cleared edge",
				byBeat = "minute:5",
				testRange = {
					3,
					8,
				},
				evidence = "cleared fraction at session end exceeds the fraction at first sight of the readout",
				required = false,
			},
			{
				concept = "sets",
				taughtBy = "the collection surface showing one filled slot in a labelled group of six",
				byBeat = "firstReveal+60s",
				testRange = {
					30,
					180,
				},
				evidence = "the collection surface is opened at least once in session 1",
				required = false,
			},
			{
				concept = "depth",
				taughtBy = "entering a second area through an opening that needs no explanation",
				byBeat = "minute:6",
				testRange = {
					3,
					12,
				},
				evidence = "a second area is entered in session 1",
				required = false,
			},
		},
		neverTaught = {
			"rebirth",
			"offlineAccrual",
			"findRarity",
			"discoveryRate",
			"duplicates",
			"failure",
			"anyControl",
			"codesDailiesLeaderboardsTrading",
		},
		tutorialDevicesForbidden = {
			"imperativeString",
			"tipHintHowToPlayObjectiveGoalString",
			"pointerArrowChevronBeamWaypointOutlineHighlight",
			"ghostedOrPulsingControlGlyph",
			"firstRunOnlyString",
			"unrequestedModalPanelOrOverlay",
			"countdownOrTutorialChecklist",
			"voiceOverOrSpokenLine",
			"welcomeOrWelcomeBackString",
			"stringNamingAControl",
			"uncausedCameraMoveZoomOrReframe",
			"promptingSound",
		},
		withheld = {
			{
				surface = "collectionCount",
				presentAtJoin = true,
				liftedBy = nil,
				latched = false,
				joinValue = "0",
			},
			{
				surface = "collectionDenominator",
				presentAtJoin = false,
				liftedBy = "beat:firstReveal",
				latched = true,
				latchSource = "the collection map is non-empty",
				newSaveFields = 0,
			},
			{
				surface = "currencyReadout",
				presentAtJoin = true,
				liftedBy = nil,
				latched = false,
				joinValue = "0",
			},
			{
				surface = "upgradeRow",
				perRow = true,
				presentAtJoin = false,
				liftedBy = "balance has reached upgrades[i] level-1 cost",
				latched = true,
				latchSource = "one persisted boolean per row",
				newSaveFields = 3,
			},
			{
				surface = "areaProgress",
				presentAtJoin = true,
				liftedBy = nil,
				latched = false,
				joinValue = "0%",
			},
			{
				surface = "collectionPanel",
				presentAtJoin = false,
				liftedBy = "beat:firstReveal",
				latched = true,
				latchSource = "the collection map is non-empty",
				newSaveFields = 0,
			},
		},
		suppressionForbidden = {
			"padlockOrLockGlyph",
			"greyedOrDimmedRow",
			"questionMarkPlaceholder",
			"unknownDenominatorForm",
			"explanatoryTooltip",
			"liftAnimation",
			"liftSound",
			"newBadgeOrDot",
			"reSuppression",
			"unrevealedFindsInCount",
			"percentFormOfCollectionCount",
			"reflowOnLift",
		},
		permittedConfusion = {
			"patchTier",
			"costGrowth",
			"depthMeaning",
			"setBonus",
			"collectionEnd",
			"otherPlayersAreReal",
			"persistence",
			"absenceOfRebirthAndIdle",
		},
	}

-- From gameplay/mechanics/02-verb-roster.md.
GameConfig.Input = {
		closed = true,
		gameBoundInputClasses = {
			"pressable",
		},
		gameDrawnPressables = 4,
		travelRequiredToPurchase = "none",
		clientOriginatedRemotes = {
			"RequestState",
			"BuyUpgrade",
		},
		clientRemotesFiredByPlayerInput = {
			"BuyUpgrade",
		},
		verbs = {
			{
				id = "move",
				trigger = "platformMovementControl",
				boundByGame = false,
				kind = "continuousDirectional",
				precondition = "characterSpawned",
				adjudicatedBy = "client",
				devices = {
					"touch",
					"keyboard",
					"gamepad",
				},
			},
			{
				id = "look",
				trigger = "platformCameraControl",
				boundByGame = false,
				kind = "continuousFreeLook",
				precondition = "none",
				adjudicatedBy = "client",
				devices = {
					"touch",
					"keyboard",
					"gamepad",
				},
			},
			{
				id = "jump",
				trigger = "platformJumpControl",
				boundByGame = false,
				kind = "discreteImpulse",
				precondition = "onGround",
				adjudicatedBy = "client",
				devices = {
					"touch",
					"keyboard",
					"gamepad",
				},
			},
			{
				id = "buy",
				trigger = "gamePressable",
				pressableRole = "purchase",
				boundByGame = true,
				kind = "discreteSelect",
				precondition = "balance >= cost && level < maxLevel",
				onPreconditionFail = "silentNoOp",
				adjudicatedBy = "server",
				devices = {
					"touch",
					"keyboard",
					"gamepad",
				},
			},
			{
				id = "openIndex",
				trigger = "gamePressable",
				pressableRole = "index",
				boundByGame = true,
				kind = "discreteSelect",
				precondition = "none",
				adjudicatedBy = "client",
				devices = {
					"touch",
					"keyboard",
					"gamepad",
				},
			},
		},
		pressable = {
			roles = {
				{
					role = "purchase",
					count = 3,
					boundTo = "upgrades declaration order",
					adjudicatedBy = "server",
					persistent = true,
				},
				{
					role = "index",
					count = 1,
					adjudicatedBy = "client",
					persistent = true,
				},
			},
			activationsPerPress = 1,
			debounceSeconds = 0.35,
			holdRequired = false,
			chordRequired = false,
			rejectionCueOnFailedPrecondition = "none",
			affordabilityByColourAlone = false,
			minTouchTargetRule = "notSmallerThanPlatformJumpButton",
			mayOverlapPlatformControlRegions = false,
			gamepadSelectable = true,
			keyboardAcceleratorAllowed = true,
			keyboardAcceleratorRequired = false,
			indexScreenSuspendsMovement = true,
		},
		worldObjectsTriggeringAVerb = 0,
	}

-- From gameplay/meta/05-area-layout.md.
GameConfig.Layout = {
		chunk = {
			widthStuds = 120,
			depthStuds = 30,
			footprintStuds2 = 3600,
			edgeKeepoutStuds = 1.5,
		},
		chunksPerFamily = 8,
		chunksPerFamilyRange = {
			8,
			16,
		},
		chunksPerFamilyStatus = "playtest unknown",
		orientations = {
			"asAuthored",
			"mirroredAcrossLaneCentre",
		},
		variantsPerFamily = 16,
		families = {
			{
				depth = 1,
				setId = "terrace",
				idPrefix = "terrace-",
				patchesPerChunk = 35,
			},
			{
				depth = 2,
				setId = "cistern",
				idPrefix = "cistern-",
				patchesPerChunk = 37,
			},
			{
				depth = 3,
				setId = "vault",
				idPrefix = "vault-",
				patchesPerChunk = 39,
			},
			{
				depth = 4,
				setId = "spire",
				idPrefix = "spire-",
				patchesPerChunk = 40,
			},
		},
		familiesShareNoChunk = true,
		composition = "an area of N chunks is an ordered run of N variants drawn without replacement from its depth family's 16, seeded by (layoutSeed, areaOrdinal) and by nothing else",
		anchorSource = "authored per chunk; until authoring exists, generated once from hash(layoutSeed, chunkId) and frozen, which is the same data by a cheaper route",
		findPlacement = {
			rule = "split the chunk run into collection.relicsPerArea contiguous groups of as-equal-as-possible length; bury exactly one find in each; group g carries depths.areas[k].relicSlice[0] + g - 1",
			withinGroup = "one patch index drawn from the seed over that group's indices",
			onboardingOverride = {
				areaOrdinal = 1,
				group = 1,
				patch = "nearest the plot origin",
			},
			mayReadPatchTier = false,
			mayReadPlayerState = false,
		},
		spawnAdjacency = {
			minStuds = "movement.baseClearRadius",
			maxStuds = "movement.baseClearRadius + minSpacing",
		},
		repetitionRules = {
			"R1",
			"R2",
			"R3",
			"R4",
		},
		invariants = {
			"depths.areas[k].chunkCount * chunk.footprintStuds2 == depths.areas[k].footprintStuds2",
			"depths.areas[k].chunkCount * families[depth].patchesPerChunk == depths.areas[k].patchCount",
			"chunksPerFamily * orientations >= max chunkCount over all areas",
			"patchesPerChunk is strictly increasing in depth",
			"no two anchors in one chunk are closer than depths.areas[k].minSpacing",
		},
	}

-- From gameplay/systems/06-modifier-stacking.md.
GameConfig.Modifiers = {
		modifierObject = {
			fields = {
				{
					name = "sourceClass",
					type = "enum: upgrade-level | set-completion | purchase",
				},
				{
					name = "sourceId",
					type = "string",
					meaning = "the upgrade id, collection set id or product id that granted it",
				},
				{
					name = "axis",
					type = "enum: value | radius | speed",
				},
				{
					name = "factor",
					type = "number >= 1",
				},
			},
			revocable = false,
			expires = false,
			grantsNothingElse = "a modifier changes exactly one axis; it never grants currency, a Find, an area, a cosmetic or a second modifier",
		},
		axisIdsJoinUpgrades = "axes[].id is upgrades[].id verbatim; Pace is a label and never an id",
		axes = {
			{
				id = "value",
				label = "Value",
				unit = "multiplier on tiers[].value",
				baseFrom = "upgrades[value].base, already inside upgradeEffect",
				consumedBy = "economy.faucets[patch-clear].formula",
				ceilingRule = nil,
				ceilingReason = "a currency multiplier breaks no invariant",
			},
			{
				id = "radius",
				label = "Reach",
				unit = "studs",
				baseFrom = "movement.baseClearRadius, already inside upgradeEffect",
				consumedBy = "the clearing proximity test",
				ceilingRule = "effective < area.size / 2",
				ceilingReason = "beyond it one position clears the whole area and a lap stops existing",
			},
			{
				id = "speed",
				label = "Pace",
				unit = "studs per second",
				baseFrom = "movement.baseWalkSpeed, already inside upgradeEffect",
				consumedBy = "the character's WalkSpeed",
				ceilingRule = "effective * serverTickSeconds <= movement.baseClearRadius",
				ceilingReason = "beyond it the player outruns the tool between ticks and patches are never cleared",
			},
		},
		sources = {
			{
				class = "upgrade-level",
				step = 1,
				instances = "exactly one per upgrade id",
				mayTarget = {
					"value",
					"radius",
					"speed",
				},
				compositionMode = "per upgrades[].mode (additive or compounding)",
				stacksWithSelf = true,
				boundedBy = "upgrades[].maxLevel",
				storage = "the held level is persisted; the effect is derived from it at every read",
				assignmentOwner = "gameplay/balance",
			},
			{
				class = "set-completion",
				step = 2,
				instances = "at most one per collection.sets[].id",
				mayTarget = {
					"value",
					"radius",
					"speed",
				},
				compositionMode = "multiplicative",
				stacksWithSelf = false,
				boundedBy = "the number of sets in collection",
				storage = "derived from discovery.record at every read; never latched, never persisted",
				worthBand = "core-loop/02 requires a set bonus be worth between area.patchCount and ladderTotal/perTick/#sets base ticks at grant time; this composition is what converts a factor into that unit",
				assignmentOwner = "content-structure work (currently gameplay/meta) chooses which axis each set targets; gameplay/balance sets each factor",
			},
			{
				class = "purchase",
				step = 3,
				instances = "at most one per product id",
				mayTarget = {
					"value",
					"radius",
					"speed",
				},
				compositionMode = "multiplicative",
				stacksWithSelf = false,
				boundedBy = "the offer ladder",
				storage = "recomputed from live ownership at every join; never persisted, never latched",
				assignmentOwner = "offer-ladder work (currently gameplay/monetization) chooses which products exist; gameplay/balance sets each factor",
			},
		},
		resolutionOrder = {
			"upgradeEffect (base and level together)",
			"set-completion",
			"purchase",
			"ceiling clamp",
		},
		withinStepOrder = "contract declaration order: upgrades[], then collection.sets[], then the offer ladder's own order",
		composition = "effective(axis) = clamp(upgradeEffect(axis, heldLevel) * PROD(setFactors(axis)) * PROD(purchaseFactors(axis)), ceilingRule)",
		baseIsNotAppliedTwice = "upgradeEffect already contains upgrades[].base; nothing multiplies the base in again",
		factorFloor = 1,
		clampApplication = "once, after every source has been applied; never per source",
		singleDefinition = "effective(axis) has exactly one implementation and every consumer calls it",
		forbidden = {
			"a factor below 1, in any source",
			"an additive bonus expressed as a percentage or a flat amount",
			"an axis id that is not an upgrades[].id",
			"a source that targets an axis outside the three",
			"a source that grants currency, a Find, an area, a cosmetic or a second modifier",
			"a modifier that expires, decays, resets, is timed or is spent",
			"a purchase that raises an axis past its ceiling rule",
			"a set bonus written into save data",
			"a purchase written into save data",
			"the value multiplier applied both at the faucet formula and inside the award function",
			"a clamp applied between two sources",
		},
	}

-- From gameplay/meta/06-plot-arrangement.md.
GameConfig.Plots = {
		rowAxis = "+X",
		laneAxis = "+Z",
		laneWidthStuds = 120,
		pitchStuds = 122,
		pitchRule = "laneWidthStuds + the inter-plot boundary's thickness, which traversal owns; pitchStuds must never exceed social.maxCoPresenceSeparationStuds, so that thickness is capped at 8",
		slotOrigin = "(area.originXZ[0] + (slot - 1) * pitchStuds, 0, area.originXZ[1])",
		slotClaiming = "lowestFreeIndex",
		slotsAreContiguousWhileOccupied = true,
		spawn = {
			plotLocal = {
				0,
				0,
				8,
			},
			lookVector = {
				slot1 = {
					1,
					0,
					0,
				},
				slot2AndAbove = {
					-1,
					0,
					0,
				},
			},
			neverFacesLaneAxis = true,
			atPlotCentre = false,
		},
		bayLengthRule = "depths.areas[k].footprintStuds2 / laneWidthStuds",
		bays = {
			{
				ordinal = 1,
				zStart = 0,
				zEnd = 120,
				lengthStuds = 120,
			},
			{
				ordinal = 2,
				zStart = 120,
				zEnd = 330,
				lengthStuds = 210,
			},
			{
				ordinal = 3,
				zStart = 330,
				zEnd = 660,
				lengthStuds = 330,
			},
			{
				ordinal = 4,
				zStart = 660,
				zEnd = 1080,
				lengthStuds = 420,
			},
			{
				ordinal = 5,
				zStart = 1080,
				zEnd = 1560,
				lengthStuds = 480,
			},
			{
				ordinal = 6,
				zStart = 1560,
				zEnd = 2040,
				lengthStuds = 480,
			},
			{
				ordinal = 7,
				zStart = 2040,
				zEnd = 2520,
				lengthStuds = 480,
			},
			{
				ordinal = 8,
				zStart = 2520,
				zEnd = 3000,
				lengthStuds = 480,
			},
		},
		openings = {
			perBay = 2,
			centredOnX = 0,
			sharedWithNeighbour = true,
			outwardOpeningOfBay1 = "the works' edge, per theme/setting/04",
			studsBetweenParts = 0,
			alwaysOpen = true,
		},
		liveGeometry = {
			patchInstancesExistIn = "the live bay only",
			groundExistsIn = "every bay from 1 up to and including the live bay",
			builtWhole = true,
			bayBuiltAt = "the instant the previous bay's last patch clears",
			torndownBeyond = "bays more than two outward of the live one are destroyed and rebuilt bare on re-entry",
		},
		invariants = {
			"pitchStuds <= social.maxCoPresenceSeparationStuds",
			"the realised distance between the spawns of two consecutive occupied slots equals pitchStuds at every bay ordinal",
			"bays[k].lengthStuds * laneWidthStuds == depths.areas[k].footprintStuds2",
			"bays[k].zEnd == bays[k+1].zStart",
			"bays[0].lengthStuds == laneWidthStuds == area.size",
			"the spawn's plot-local Z is not the midpoint of bays[0].zStart and the last bay's zEnd",
			"the spawn's LookVector is parallel to rowAxis and never to laneAxis",
		},
	}

-- From gameplay/monetization/01-the-offer-ladder.md.
GameConfig.Products = {
		storeExists = true,
		kindsUsed = {
			"gamePass",
		},
		devProductCount = 0,
		axesSold = {
			"value",
			"radius",
		},
		axesNotSold = {
			"speed",
		},
		rungs = {
			"impulse",
			"mid",
			"premium",
		},
		ownershipCheck = "UserOwnsGamePassAsync(userId, gamePassId)",
		prompt = {
			method = "PromptGamePassPurchase",
			calledOnlyFrom = "explicit player activation of the store control",
			clientCallAllowed = "unverified — the MarketplaceService page as fetched does not state the security context",
		},
		items = {
			{
				id = "yield",
				label = "Yield",
				kind = "gamePass",
				gamePassId = nil,
				axis = "value",
				factor = 1.5,
				priceRobux = 49,
				priceBand = "impulse 25-75",
				priceTestRange = {
					25,
					99,
				},
				rung = "impulse",
				repeatable = false,
				stacksWithSelf = false,
				persisted = false,
				deliverable = "multiplicative factor on the value axis; no other effect",
			},
			{
				id = "measure",
				label = "Measure",
				kind = "gamePass",
				gamePassId = nil,
				axis = "value",
				factor = 2,
				priceRobux = 199,
				priceBand = "mid 99-249",
				priceTestRange = {
					99,
					299,
				},
				rung = "mid",
				repeatable = false,
				stacksWithSelf = false,
				persisted = false,
				deliverable = "multiplicative factor on the value axis; no other effect",
			},
			{
				id = "span",
				label = "Span",
				kind = "gamePass",
				gamePassId = nil,
				axis = "radius",
				factor = 1.75,
				priceRobux = 499,
				priceBand = "premium 249-499",
				priceTestRange = {
					349,
					999,
				},
				rung = "premium",
				repeatable = false,
				stacksWithSelf = false,
				persisted = false,
				deliverable = "multiplicative factor on the radius axis AND a visibly wider tool head; requires tool head width to resolve from effective radius, not Reach level",
			},
		},
		combinedFactorCap = {
			value = 3,
			radius = 1.75,
			speed = 1,
		},
		forbidden = {
			{
				id = "F1",
				rule = "No paid area, Find or set, and no paid access to any of them.",
				closedBy = "03-META.md (brief)",
				check = "no products[] entry grants a collection entry, an area id or a set; axis is always one of value|radius|speed",
			},
			{
				id = "F2",
				rule = "No sale of currency at any rate, in any bundle, ever.",
				closedBy = "gameplay/systems/04",
				check = "no products[] field names Shards or an amount; priceRobux exists and no priceShards field does; zero code paths credit currency from a purchase",
			},
			{
				id = "F3",
				rule = "No gacha, loot box, crate, roll, spin, pull, egg or randomised purchase outcome.",
				closedBy = "gameplay/systems/03 + gameplay/systems/05 + platform paid-random-items rules",
				check = "every products[] entry has a deterministic factor; zero odds tables anywhere; zero PolicyService:GetPolicyInfoForPlayerAsync calls",
			},
			{
				id = "F4",
				rule = "No luck multiplier, discovery-rate multiplier or find-better-Finds product.",
				closedBy = "gameplay/systems/05 (luckShaped: false), gameplay/systems/03 (no per-Find rank)",
				check = "no products[].axis equals luck; the substring 'luck' appears in zero player-facing strings",
			},
			{
				id = "F5",
				rule = "No developer products, and nothing repeatable.",
				closedBy = "gameplay/systems/06 (one instance per product id) + platform guidance",
				check = "every products[].kind is gamePass and every repeatable is false; zero PromptProductPurchase calls; zero ProcessReceipt callbacks",
			},
			{
				id = "F6",
				rule = "No timed boost, and no modifier that expires, decays, resets, is consumed or is spent.",
				closedBy = "gameplay/systems/06",
				check = "no products[] field named duration, expires, seconds, uses, charges or cooldown; no purchase-derived modifier carries a timestamp",
			},
			{
				id = "F7",
				rule = "No cosmetics: no skin, trail, aura, particle, hat, accessory, follower, pet, mount, emote, title or nameplate.",
				closedBy = "03-META.md (declined, needs a display system first) + theme/identity/04 + theme/identity/02",
				check = "no product changes any instance parented to the character other than the tool head's width",
			},
			{
				id = "F8",
				rule = "No premium tool that is the only way to have a tool.",
				closedBy = "gameplay/mechanics/04 T12 (premiumVariantMayBeOnlyTool: false)",
				check = "a player owning zero products spawns with a tool welded to the right hand",
			},
			{
				id = "F9",
				rule = "One axis and one factor per product. No product grants a second modifier, currency, a Find, an area or a cosmetic.",
				closedBy = "gameplay/systems/06",
				check = "every products[] entry has exactly one axis field and one factor field and no grants array",
			},
			{
				id = "F10",
				rule = "No timer, countdown, expiry, 'limited', 'new', 'ends in' or 'today only' on any offer.",
				closedBy = "theme/tone/04 D9-D10 + platform monetization guidance",
				check = "zero store strings match /limited|hurry|today only|ends in|last chance|expires/i; no store element updates on a clock",
			},
			{
				id = "F11",
				rule = "No manufactured scarcity or urgency: no stock count, no 'only N left', no 'N players own this', no waitlist, no queue.",
				closedBy = "platform monetization guidance (false sense of urgency, artificial scarcity)",
				check = "no store string contains a number sourced from anything but the player's own state",
			},
			{
				id = "F12",
				rule = "No discount, no strikethrough price, no sale price, no bundle price, no first-purchase bonus.",
				closedBy = "theme/tone/04 D9 + platform monetization guidance",
				check = "exactly one price per product; products[] has no priceWas, discount, bundle or bonus field",
			},
			{
				id = "F13",
				rule = "No unprompted purchase prompt. PromptGamePassPurchase is called only from an explicit player activation of a store control.",
				closedBy = "theme/tone/04 D10",
				check = "zero PromptGamePassPurchase calls in any join, spawn, respawn, tick, timer, completion or reveal path",
			},
			{
				id = "F14",
				rule = "No offer may interrupt a beat: nothing store-related opens, animates or changes within 2 s of a Find reveal, a set completion or an area completion.",
				closedBy = "theme/tone/03 beat map B1-B3 + gameplay/mechanics/05",
				check = "the store surface has no code path reachable from the reveal or completion channels",
			},
			{
				id = "F15",
				rule = "No code entry field, and no like, favourite, follow, group-join, rate-us or share prompt.",
				closedBy = "03-META.md priority 3 (codes) + theme/tone/04 D10",
				check = "zero TextBox instances in the store surface; zero strings match /code|group|favou?rite|follow|rate us|share/i",
			},
			{
				id = "F16",
				rule = "No verb behind a paywall. move, look, jump, buy and openIndex all work with zero products owned.",
				closedBy = "gameplay/mechanics/02",
				check = "all five verbs function in a session with zero passes owned",
			},
			{
				id = "F17",
				rule = "No purchase may shorten, skip, auto-complete or bypass clearing work: no instant-clear, no auto-clear, no area skip, no completion grant.",
				closedBy = "03-META.md (never content access) + theme/fantasy/03 C3",
				check = "no product clears a patch, completes an area, or grants a Find; 24/24 is reachable owning zero products",
			},
			{
				id = "F18",
				rule = "No subscription, no recurring charge, and no benefit gated on Roblox Premium membership.",
				closedBy = "gameplay/systems/06 (nothing timed or expiring) + 03-META.md (never content access)",
				check = "zero reads of Player.MembershipType or MembershipType.Premium anywhere in the build",
			},
			{
				id = "F19",
				rule = "No product is named, shown, priced or referred to anywhere outside the store surface.",
				closedBy = "theme/tone/04 D10 (no unprompted purchase surface)",
				check = "no products[].label appears in any string rendered outside the store screen",
			},
			{
				id = "F20",
				rule = "No purchase-derived state is written to persistence. Ownership is read live every join.",
				closedBy = "gameplay/systems/06 (recomputed from live ownership, never persisted)",
				check = "the save payload contains no pass id, no product id and no purchase-sourced factor",
			},
		},
		headroom = {
			rule = "for every axis A and every depth N: ladderMax(A) * prod(setFactors on A) * prod(products.items[].factor where axis == A) <= marginFraction * ceiling(A, N)",
			marginFraction = 0.9,
			ladderMax = "upgrades[A].base + upgrades[A].maxLevel * upgrades[A].perLevel",
			ceilings = {
				value = nil,
				radius = "min over depths of (area.size(N) / 2)",
				speed = "movement.baseClearRadius / serverTickSeconds",
			},
			onFailure = "reduceFactor",
			sizedLast = true,
			pacingFloorSeconds = 75,
			clampMayAbsorbAPurchase = false,
			lossNotice = "none",
		},
	}

-- From gameplay/systems/03-rarity-ladders.md.
GameConfig.Rarity = {
		gradedLadderCount = 1,
		ladders = {
			{
				id = "overgrowth-tier",
				kind = "graded",
				sourceField = "patch.tierIndex",
				definedBy = "tiers",
				rungs = 4,
				rolled = true,
				rolledFrom = "tiers[].weight",
				perObjectVisualGrade = true,
				legibilityChannel = "silhouette first, colour second",
				affects = {
					"the per-clear payout, via economy.faucets[patch-clear]",
				},
			},
			{
				id = "find-set",
				kind = "ordinal",
				sourceField = "collection.sets[].index",
				definedBy = "collection",
				rungs = 4,
				rolled = false,
				perObjectVisualGrade = false,
				legibilityChannel = "the set heading on the collection surface, and nothing on the object",
				affects = {},
			},
		},
		findRarityField = nil,
		findPlacementReadsTier = false,
		findPlacementWeighting = "blind to tier: the probability a patch carries a Find is independent of its tierIndex. Whether that choice is spatially uniform or spread is content-structure work's, not this key's.",
		depthRarityChannel = "tiers[].weight, shifted toward the rare end per depth",
		depthRarityBlocker = "tiers has no depth dimension; adding one is a revision to 01-overgrowth-tiers, not a change made here",
		forbidden = {
			"a rarity, grade, tier, star, quality or condition field on a Find",
			"a rarity colour, frame, glow, border, sparkle or badge on a collection slot",
			"a rarer patch hiding a Find more often than a common patch does",
			"a rarer patch hiding a rarer Find",
			"a fifth overgrowth tier added to signal depth",
			"a per-depth recolour of the four tiers that changes their silhouettes",
			"a reveal cue that varies by which set the Find belongs to",
			"any rarity read a player must learn in addition to the four silhouettes",
		},
	}

-- From gameplay/mechanics/05-response-contract.md.
GameConfig.Response = {
		controlEverAffected = false,
		sequencedBeats = {
			"upgradePurchased",
			"findReveal",
			"setComplete",
			"areaComplete",
		},
		sequenceOrderOwner = "gameplay/core-loop/02-payoff-weights",
		minOnsetGapSeconds = 0.6,
		minOnsetGapTestRangeSeconds = {
			0.35,
			0.9,
		},
		minOnsetGapOwner = "gameplay/core-loop/02-payoff-weights, figure set by Balance & Tuning",
		loneSequencedBeatDelayed = false,
		unsequencedBeats = {
			"patchClear",
		},
		minSustainedOnsetsPerSecond = 8,
		onOverload = "overlap",
		channelExclusivity = {
			atPatch = "findReveal",
			notice = {
				"setComplete",
				"areaComplete",
			},
		},
		humanoidWritesAllowed = {
			"WalkSpeed",
		},
		beats = {
			{
				id = "patchClear",
				rank = 5,
				cause = "clearRadiusContainsStandingPatch",
				decidedBy = "clientPredictedServerAuthoritative",
				acknowledgmentBudgetMs = 80,
				budgetTestRangeMs = {
					40,
					120,
				},
				payoutBudgetMs = 250,
				payoutTestRangeMs = {
					150,
					400,
				},
				channels = {
					"atPatch",
					"readout",
				},
				controlAffected = false,
				queued = false,
				residueLifetimeSeconds = 0.4,
			},
			{
				id = "findReveal",
				rank = 1,
				cause = "patchHidingItCleared",
				decidedBy = "server",
				acknowledgmentBudgetMs = 300,
				budgetTestRangeMs = {
					200,
					500,
				},
				channels = {
					"atPatch",
					"audio",
				},
				forbiddenChannels = {
					"notice",
				},
				controlAffected = false,
				queued = true,
				dwellSeconds = 2.5,
				dwellTestRangeSeconds = {
					1.5,
					4,
				},
				grantedAt = "reveal",
			},
			{
				id = "setComplete",
				rank = 2,
				cause = "sixthFindOfSetRevealed",
				decidedBy = "server",
				acknowledgmentBudgetMs = 400,
				budgetTestRangeMs = {
					250,
					700,
				},
				channels = {
					"notice",
					"audio",
				},
				controlAffected = false,
				queued = true,
			},
			{
				id = "areaComplete",
				rank = 3,
				cause = "lastStandingPatchCleared",
				decidedBy = "server",
				acknowledgmentBudgetMs = 400,
				budgetTestRangeMs = {
					250,
					700,
				},
				channels = {
					"notice",
					"audio",
				},
				forbiddenChannels = {
					"atPatch",
				},
				controlAffected = false,
				queued = true,
			},
			{
				id = "upgradePurchased",
				rank = 4,
				cause = "buyPreconditionSatisfiedAtPressable",
				decidedBy = "server",
				acknowledgmentBudgetMs = 200,
				budgetTestRangeMs = {
					120,
					350,
				},
				channels = {
					"readout",
					"audio",
				},
				controlAffected = false,
				queued = true,
				effectAppliedBeforeAcknowledgment = true,
			},
		},
		negativeBeats = 0,
		lockoutsSeconds = 0,
	}

-- From gameplay/meta/03-set-bonuses.md.
GameConfig.SetBonus = {
		sourceClass = "setCompletion",
		explainedInFiction = false,
		grantedAt = "the clear of the last patch of the last area at that set's depth",
		axisMayRepeat = true,
		rows = {
			{
				setId = "terrace",
				depth = 1,
				axis = "value",
			},
			{
				setId = "cistern",
				depth = 2,
				axis = "radius",
			},
			{
				setId = "vault",
				depth = 3,
				axis = "speed",
			},
			{
				setId = "spire",
				depth = 4,
				axis = "radius",
			},
		},
		invariants = {
			"every rows[].setId is a collection.sets[].id",
			"every collection.sets[].id appears in exactly one row",
			"every rows[].axis is an upgrades[].id",
			"no rows[] entry carries a factor, a magnitude, a percentage or a duration",
			"the product of all factors granted on one axis must stay under that axis's systems/06 ceiling with every product applied",
		},
	}

-- From gameplay/social/01-server-and-co-presence.md.
GameConfig.Social = {
		model = "shared-server-parallel-progression",
		maxPlayers = {
			min = 12,
			max = 20,
			scriptSettable = false,
			setVia = "place configuration",
			belowMinBreaks = "a player can spend a whole session alone and receives no social proof",
			aboveMaxBreaks = "per-plot instance count and plot-row length exceed the mobile budget",
		},
		maxCoPresenceSeparationStuds = {
			value = 128,
			unit = "studs",
			status = "playtest unknown",
			testRangeStuds = {
				85,
				185,
			},
			derivedIn = "cid/gameplay/social/02-presence-sufficiency.md",
			requirement = "whenever two or more players are connected, from any occupied plot's spawn point the spawn point of at least one other occupied plot lies within this distance, with an unobstructed sightline",
			measuredAt = {
				viewportWidthPx = 1280,
				viewportHeightPx = 720,
				fieldOfViewDegrees = 70,
				fieldOfViewAxis = "vertical",
				subjectHeightStuds = 5,
				legibilityFloorPx = 20,
				legibilityFloorViewportFraction = 0.0278,
				formula = "px = viewportHeightPx * (subjectHeightStuds / distanceStuds) / (2 * tan(fieldOfViewDegrees / 2))",
			},
			realisedStuds = 160,
			satisfiedByShippedBuild = false,
		},
		progressScope = "per-player",
		worldStateScope = "per-player",
		sharedState = {},
		plotAccess = {
			ownerOnly = true,
			othersMayEnter = false,
			enforcedBy = "the collidable boundary built on every plot",
		},
		plotTenure = {
			claimedOn = "PlayerAdded",
			slotRule = "lowest-free-index",
			heldFor = "the whole connected session",
			releasedOn = "PlayerRemoving",
			rejoinSlot = "any-free",
			slotReservedOnLeave = false,
			onLeaveMidArea = "the plot instance tree is destroyed and the slot freed; the partial cleared set survives only in the leaving player's own save; nothing about the departure is perceptible to any remaining player",
		},
		characterCollision = {
			playerVsPlayer = false,
			groupName = "Characters",
			groupNameOwnedBy = "social.characterCollision, and by no other key",
			appliedTo = "every BasePart of every character, on CharacterAdded and on every BasePart added to it thereafter",
			collidable = {
				{
					a = "Characters",
					b = "Characters",
					collides = false,
				},
				{
					a = "Characters",
					b = "Default",
					collides = true,
				},
			},
		},
		chat = {
			text = false,
			chatWindowEnabled = false,
			bubbleChatEnabled = false,
			voice = false,
			playerAuthoredStringsToOtherClients = 0,
			overridesPlatformDefault = "ChatWindowConfiguration.Enabled defaults to true",
		},
		friendSurfacing = {
			readsSocialGraph = false,
			friendJoinedNotice = false,
			forbiddenApis = {
				"Player:IsFriendsWith",
				"Players:GetFriendsAsync",
				"SocialService:CanSendGameInviteAsync",
				"SocialService:PromptGameInvite",
			},
		},
		mechanicalInteraction = "none",
		forbidden = {
			{
				id = "X1",
				forbids = "a leaderstats Folder under any Player, or any Value inside one",
			},
			{
				id = "X2",
				forbids = "Team instances, and any write to Player.Team or Player.TeamColor",
			},
			{
				id = "X3",
				forbids = "any server-held value that more than one player's action increments",
			},
			{
				id = "X4",
				forbids = "any path by which one player's action changes another player's currency",
			},
			{
				id = "X5",
				forbids = "any path by which one player's action adds an entry to another player's found set",
			},
			{
				id = "X6",
				forbids = "a BillboardGui, SurfaceGui, overhead label, plot sign or DisplayName mutation carrying another player's currency, upgrade level, cleared count or collection count",
			},
			{
				id = "X7",
				forbids = "any replicated payload containing a player identifier other than the recipient's",
			},
			{
				id = "X8",
				forbids = "OrderedDataStore, and any global, weekly or all-time ranking",
			},
			{
				id = "X9",
				forbids = "any remote handler accepting a string that is later rendered to a different client",
			},
			{
				id = "X10",
				forbids = "any cue, visual or audible, caused by one player's input and perceptible to another beyond their character in motion and their own patches clearing, instance and cue",
			},
			{
				id = "X11",
				forbids = "join or leave notices, toasts, sounds or strings naming another player",
			},
			{
				id = "X12",
				forbids = "ProximityPrompt or ClickDetector parented into a character model",
			},
			{
				id = "X13",
				forbids = "writes to another character's Humanoid.Health or TakeDamage, and any force or velocity applied to a character that is not the actor's",
			},
			{
				id = "X14",
				forbids = "Camera.CameraSubject set to a Humanoid that is not the local player's",
			},
		},
	}

-- From gameplay/mechanics/04-tool-as-object.md.
GameConfig.Tool = {
		held = true,
		count = 1,
		grantedAt = "spawn",
		drivenBy = "radius",
		appearanceChannel = "headWidth",
		headWidthBaseStuds = 1.2,
		headWidthBaseTestRangeStuds = {
			0.8,
			1.8,
		},
		headWidthPerLevelStuds = 0.35,
		headWidthPerLevelTestRangeStuds = {
			0.2,
			0.6,
		},
		attachment = "RightHand",
		instanceClass = "Model",
		isRobloxToolInstance = false,
		entersBackpack = false,
		canCollide = false,
		canTouch = false,
		canQuery = false,
		massless = true,
		clearsOnContact = false,
		animates = false,
		writesHumanoidProperties = false,
		particleEmitters = 0,
		changesWithAxes = {
			"radius",
		},
		unaffectedByAxes = {
			"value",
			"speed",
		},
		premiumVariantAllowed = true,
		premiumVariantMayBeOnlyTool = false,
	}

-- From gameplay/mechanics/06-traversal-affordances.md.
GameConfig.Traversal = {
		jump = {
			exists = true,
			jumpHeight = 7.2,
			useJumpPower = false,
			changesGameState = false,
			upgradable = false,
			gatedContent = 0,
		},
		fall = {
			damage = false,
			voidBelowPlayArea = false,
			maxSurvivableFallStuds = nil,
		},
		death = {
			possibleByDesign = false,
			damageSources = 0,
			healthWrittenByGameCode = false,
			respawnAt = "areaSpawn",
			lossOnRespawn = "none",
			authoredCue = "none",
			respawnDelayOwner = "architect/01-runtime",
		},
		boundary = {
			kind = "collisionBarrier",
			walkableMarginStuds = 12,
			heightStuds = 20,
			passable = false,
			climbable = false,
			jumpable = false,
			opaque = false,
			sightlineObstruction = "none",
			cue = "none",
			teleportBack = false,
		},
		surface = {
			maxStepStuds = 2,
			maxSlopeDegreesWherePatchesStand = 30,
			climbSurfaces = 0,
			ladders = 0,
			seats = 0,
			vehicles = 0,
			water = 0,
			speedModifyingSurfaces = 0,
			teleportsWithinArea = 0,
		},
		collision = {
			playerVsWorld = true,
			playerVsPlayerOwner = "social.characterCollision",
		},
		hazards = 0,
		fallPenalties = 0,
		lockouts = 0,
	}

function GameConfig.upgradeCost(upgrade: { costBase: number, costGrowth: number }, level: number): number
	return math.floor(upgrade.costBase * (upgrade.costGrowth ^ level))
end

function GameConfig.tierByWeight(roll: number)
	local total = 0
	for _, t in ipairs(GameConfig.Tiers) do
		total += t.weight
	end
	local pick = roll * total
	local running = 0
	for index, t in ipairs(GameConfig.Tiers) do
		running += t.weight
		if pick <= running then
			return index, t
		end
	end
	return 1, GameConfig.Tiers[1]
end

return GameConfig
