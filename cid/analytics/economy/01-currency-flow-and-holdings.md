# 01 — Currency flow and holdings

**Domain:** analytics/economy · **Category:** Analytics · **Wave:** 5

## Decision

**Two `AnalyticsService:LogEconomyEvent` records and one balance series carry the whole currency
half of this game: a `Source` batched at one event per 128 patches cleared, a `Sink` emitted per
purchase, and `endingBalance` on both.** Eight named readings ride on them, each stated as *the
field it refutes* and never as a copied number, and the solvency ratio becomes readable in
production as realised clearing income at area 7 against `solvency.ladderTotal`.

## Why

**Per-clear emission does not fit and the arithmetic is not close.** The faucet pays per patch
(`economy.faucets[patch-clear].perEvent: true`) and the global budget is `120 + (20 × CCU)`
AnalyticsService requests per minute `[research: https://create.roblox.com/docs/production/analytics/event-types]`,
evaluated at `runtime.maxPlayers` 16 `[research: architect/sheets/01-runtime.md]` → 440/min for
everything the game emits. The faucet's rate under per-clear emission is
`60 × maxPlayers × max_k(solvency.areaLedger[k].patchCount / pacing.laps[k].realisedLapSeconds)`.
At the figures currently on disk that peaks at the post-terminal bay near **8,350/min against
440** — roughly 19× over before any other domain emits anything, and about 4,500 events per player
for the specced eight areas. Batching is forced, not preferred.

**Batching is a decision about the analytics call and about nothing else.**
`economy.faucets[patch-clear].perEvent` stays `true`: every patch still credits at the instant it
clears, at the same amount, with the same floor and the same single multiplier application. No
currency, no timing and no player-visible behaviour moves. Sheet `01` accumulates and reports; it
does not defer a payment.

**The batch is a patch count, not an area or a clock, because the count is what makes the reading
self-describing.** A full window is exactly `N` patches, so realised value per patch is
`amount / N` with no second field spent on a denominator. **`N = 128`** `[cid: decided]`, test
range [96, 256], derived from the inequality in the manifest at a **25% share** of the per-server
budget. At on-disk figures that is under 90 requests/min at the tightest row and about **40 source
events per player for the whole specced game**. The share is mine to claim and **not mine to
set**: emission-budget work owns the total, and `N` is an inequality over `runtime.maxPlayers` and
`faucetBudgetShare`, so their ruling moves the number without rewriting this sheet.

**A window never straddles an area, a short window is a different `itemSku`, and both records use
`transactionType: Gameplay`.** The two SKUs `patch-clear` / `patch-clear-partial` make every full
window known to be exactly `N` patches at zero custom-field cost, and a missing `itemSku` displays
as N/A, so leaving it unset throws away a free dimension. `Shop` would assert a store that does
not exist — `products.storeExists` is `false` under ruling R-4 and `promptGamePassPurchaseCalls`
is `0` — and with `economy.faucetCount` 1 against `economy.sinkCount` 1 the transaction-type
breakdown separates nothing `flowType` and the SKU do not already separate.
`[research: https://create.roblox.com/docs/production/analytics/economy-events]`

**The three custom fields are spent on the dimensions that make Balance's predictions separable
and on nothing else.** `areaOrdinal` because every prediction in `solvency.areaLedger[]` and
`tierMix.byDepth[]` is indexed by it; `entitlement` because every wall-clock and lap figure in
`pacing` is published in a base and a purchaser population and there is no other way to split
them; and the third field is the multiplier confound — `valueLevel` on the source,
`heldLevelAfter` on the sink. Without `valueLevel`, `amount / N` is not comparable to
`tierMix.byDepth[d].expectedValuePerPatch` at all, because `economy.faucets[patch-clear].formula`
applies `modifiers.effective('value')` at the faucet. **No field is spent on depth or on sets
held**: depth resolves from `depths.areas[k].depth`, and set completion is deterministic given
areas cleared under `discovery.pool.placementIsPlayerIndependent`, so both derive from
`areaOrdinal`. Total unique combinations **738**, against a cap of 8,000 across all three
`[research: https://github.com/Roblox/creator-docs/blob/main/content/en-us/production/analytics/custom-fields.md]`.

**The balance series costs nothing extra.** `endingBalance` rides in the same call as `amount`,
which is why the flow record and the currency-held series are one decision and not two, and the
dashboard already charts **average wallet balance**
`[research: https://create.roblox.com/docs/production/analytics/economy-events]`. A second,
zero-instrumentation route exists: `currency` is one of the seven persisted fields
`[research: game/src/server/Persistence.luau]` and a standard data store's entries are listable
through Open Cloud `[research: https://create.roblox.com/docs/cloud/guides/data-stores]`.

**Every reading names a field, because two published answers for one quantity are already live.**
`solvency` on disk publishes `ladderTotal` 260,898 against `areaLedger[6].cumulativeIncome` 71,233
(ratio 3.663), while `cid/gameplay/_verified-wave4.md` ruled 244,839 against 113,880 correct — a
~60% disagreement on the income side of the single most important prediction in the economy, and
wave 4 is **FAIL** with sixteen requests. **A number copied into this sheet would already be
wrong**, and the realised reading arbitrates between the two published answers rather than between
one of them and reality. `[research: cid/gameplay/_verified-wave4.md]`

**Which readings move if a revision lands.** RR-1 corrects `solvency.ladderTotal` and the three
per-axis totals: `solvencyRatio` and `ladderFractionAtArea8Complete` read the corrected value with
no edit here. RR-8 moves `depths.areas[].patchCount` and the ledger's footprints:
`realisedValuePerPatch` and `area1RealisedIncome` change denominator, and the `N` inequality is
re-evaluated because `patchCount / realisedLapSeconds` is its input. RR-9 restates `pacing`'s
session criterion over `laps[].cumulativeSeconds`, which this sheet does not read. RR-10 moves
`firstPurchase`, which is funnel-definition work's. **No reading is deleted by any of the
sixteen.**

**One reading has an expected value of exactly zero and is not a tuning signal**: duplicate
reveals. Its definition, alarm and routing are sheet `02`'s and are carried here as one row.

```manifest
{
  "provides": "economyHealth",
  "status": "proposed",
  "value": {
    "note": "A reading specification, not a design value a module consumes. Every readings[] row names the key and field it refutes and carries no copy of that field's value.",
    "promotionStatus": {
      "recommended": "developer-facing, not read by a build",
      "reason": "no Luau module needs a value from this key at runtime; game/src has zero AnalyticsService and zero LogService calls, and bridge/emit-config.mjs produces GameConfig only. The one build-visible half is the two call sites, which belong to telemetry.events[].",
      "alternative": "add an analytics call-site module to the technical contract that reads economyHealth.flows directly",
      "alternativeRejectedBecause": "one build module would then read two keys with overlapping content, which is how two answers for one call get written",
      "appliesTo": ["economyHealth", "telemetry", "funnels", "engagement", "kpis"],
      "crossKeyCheckDirection": "the merger must check that every readings[].refutes.field still resolves in the merged manifest, which runs opposite to every existing cross-key check",
      "seamWithTelemetry": "this key holds the argument VALUES and the flow-record ids; telemetry.events[] references a record by id and holds the insertion point, the naming and the sampling. Neither restates the other."
    },
    "transport": "AnalyticsService:LogEconomyEvent(player, flowType, currencyType, amount, endingBalance, transactionType, itemSku, customFields)",
    "transportConstraints": "server-side only, published places only, never client, never Studio. amount is always positive whichever the flow. Up to 5 currencies, 3 custom fields, 8000 combined value combinations, itemSkus grouped past 100, transactionTypes grouped past 20, 90-day retention.",
    "currencyCount": 1,
    "currencyTypeSource": "currency.name, read from the merged manifest. The emitter may not carry a string literal; currency.plural is a player-facing rendering and is not this argument.",
    "readableToday": false,
    "readableTodayReason": "game/src contains zero analytics calls. Every call site below is a place a call could go. Stated as a requirement to logging-pipeline work, not as a design of theirs.",
    "flows": [
      {
        "id": "patch-clear",
        "source": "economy.faucets[patch-clear]",
        "flowType": "Source",
        "transactionType": "Gameplay",
        "itemSku": ["patch-clear", "patch-clear-partial"],
        "itemSkuMeaning": "patch-clear is a full window of exactly batchPatchCount patches; patch-clear-partial is a residue flush and its patch count is not knowable from the event alone",
        "amount": "the sum of economy.faucets[patch-clear].formula over the patches in the window; integer, always positive",
        "endingBalance": "the player's balance after the last credit in the window",
        "emission": "batched",
        "doesNotChangeTheCredit": "economy.faucets[patch-clear].perEvent stays true. Every patch still credits at the instant it clears, at the same amount, with the same floor and the same single multiplier application. Batching is an emission decision about the analytics call; no currency, no timing and no player-visible behaviour moves.",
        "batchPatchCount": 128,
        "batchPatchCountStatus": "cid: decided",
        "batchPatchCountTestRange": [96, 256],
        "batchRule": "batchPatchCount >= 60 * runtime.maxPlayers * max over k of (solvency.areaLedger[k].patchCount / pacing.laps[k].realisedLapSeconds) / (faucetBudgetShare * (120 + 20 * runtime.maxPlayers))",
        "faucetBudgetShare": 0.25,
        "faucetBudgetShareOwner": "emission-budget work owns the total request budget and may lower this share; batchPatchCount is then re-derived from batchRule and this sheet does not change",
        "flushOn": ["area completion", "session end", "a value-level change"],
        "windowsNeverStraddleAreas": true,
        "eventsPerPlayerPerArea": "ceil(depths.areas[k].patchCount / batchPatchCount)",
        "eventsPerPlayerWholeSpeccedGame": "the sum of that over the eight areas; about 40 at the figures currently on disk",
        "perClearAlternativeRejected": "about 8350 requests per minute at the tightest row against a 440 per minute budget, and about 4500 events per player for eight areas",
        "customFields": [
          { "key": "CustomField01.Name", "name": "areaOrdinal", "required": true, "values": ["1","2","3","4","5","6","7","8","bay"], "cardinality": 9, "why": "every prediction in solvency.areaLedger[] and tierMix.byDepth[] is indexed by it; depth and sets held are derivable from it and cost no field" },
          { "key": "CustomField02.Name", "name": "entitlement", "required": true, "values": ["base","span"], "cardinality": 2, "why": "every pacing figure is published in a base and a purchaser population; constant 'base' while products.items[span].gamePassId is null, which is itself the dormant evidence" },
          { "key": "CustomField03.Name", "name": "valueLevel", "required": true, "values": "the held level of upgrades[value] as a string, '0' through upgrades[value].maxLevel", "cardinality": 21, "why": "economy.faucets[patch-clear].formula applies modifiers.effective('value'), so amount/N is not comparable to tierMix.byDepth[d].expectedValuePerPatch without it" }
        ]
      },
      {
        "id": "upgrade-purchase",
        "source": "economy.sinks[upgrade-purchase]",
        "flowType": "Sink",
        "transactionType": "Gameplay",
        "transactionTypeReason": "Shop would assert a store; products.storeExists is false under ruling R-4 and promptGamePassPurchaseCalls is 0. With one faucet and one sink the breakdown separates nothing flowType does not.",
        "itemSku": "the upgrades[].id being bought: value | radius | speed",
        "amount": "upgradeCost(u, heldLevel) as debited; integer, always positive",
        "endingBalance": "the player's balance after the debit",
        "emission": "per occurrence",
        "emitOnRefusal": false,
        "emitOnRefusalReason": "economy.sinks[upgrade-purchase].onInsufficientFunds changes nothing, so no currency flowed. A refused purchase is a funnel or defect observation, not an economy flow; input.verbs[buy].onPreconditionFail is silentNoOp and the reading belongs to funnel-definition work.",
        "customFields": [
          { "key": "CustomField01.Name", "name": "areaOrdinal", "required": true, "cardinality": 9, "why": "reads rungs bought per area against solvency.areaLedger[k].rungsBought directly" },
          { "key": "CustomField02.Name", "name": "entitlement", "required": true, "cardinality": 2, "why": "same populations as the source record" },
          { "key": "CustomField03.Name", "name": "heldLevelAfter", "required": true, "values": "'1' through upgrades[].maxLevel", "cardinality": 20, "why": "with itemSku this checks the realised cost curve rung by rung against solvency.costFormula" }
        ]
      }
    ],
    "customFieldCombinationBudget": { "source": 378, "sink": 360, "total": 738, "cap": 8000, "headroom": "10.8x, and it is the budget every later analytics key spends from" },
    "balanceSeries": {
      "id": "heldBalance",
      "carriedBy": "the endingBalance argument on both flow records; no separate call",
      "samplePoints": ["every faucet window", "every sink event"],
      "sampleRatePerPlayerPerArea": "ceil(depths.areas[k].patchCount / batchPatchCount) + solvency.areaLedger[k].rungsBought",
      "unit": "whole Shards, integer, never negative (economy.negativeBalance: impossible)",
      "population": "every session in a published place; server-emitted only; no sampling, no exclusion",
      "dashboardSurface": "average wallet balance, supplied with no further instrumentation",
      "zeroInstrumentationAlternative": "currency is a persisted field and a standard data store's entries are listable through Open Cloud, so end-of-session balance is readable with no code change at all",
      "predictedShape": "non-accumulating up to ladder exhaustion, then monotonically rising; economy.balanceCap is null so nothing caps it"
    },
    "readings": [
      {
        "id": "realisedValuePerPatch",
        "refutes": { "key": "tierMix", "field": "byDepth[d].expectedValuePerPatch" },
        "computedFrom": "over source events with itemSku 'patch-clear' and areaOrdinal in the areas at depth d: mean(amount) / batchPatchCount / effectiveValueMultiplier(valueLevel, areaOrdinal)",
        "population": "all sessions in a published place, grouped by depth",
        "alarm": { "kind": "relative", "rule": "abs(realised - predicted) / predicted > tolerance at any depth", "tolerance": 0.10, "status": "playtest unknown", "testRange": [0.05, 0.20], "reason": "a single mis-set column in a depth weight vector moves expected value by roughly a tenth, so 0.10 catches one bad weight and sits above the sampling error of a 128-patch window" },
        "voidedBy": "unknownTierClear",
        "voidedByReason": "a patch paying economy.payoutFloor instead of its tier value deflates this reading silently; sheet 02 owns that counter"
      },
      {
        "id": "area1RealisedIncome",
        "refutes": { "key": "area", "field": "gameplay/meta/01 acceptance criterion 3, the stated 700 to 1200 band at upgrade level 0" },
        "computedFrom": "sum of source amount over areaOrdinal '1', per player, run-1 sessions",
        "population": "run-1 sessions that reached area completion",
        "alarm": { "kind": "one-sided", "rule": "realised sum below the lower bound of that criterion's band", "status": "invariant", "reason": "solvency.areaLedger[0].rungsBought is above zero, so a player buys during area 1 and realised income is at or above the level-0 prediction. The reading can only refute from below, and saying so is what keeps it honest." }
      },
      {
        "id": "solvencyRatio",
        "refutes": { "key": "solvency", "field": "ladderTotal against areaLedger[6].cumulativeIncome, i.e. tests.S1" },
        "computedFrom": "per player who has completed area 7: sum of source amount over areaOrdinal '1'..'7'; the ratio is solvency.ladderTotal divided by that sum",
        "population": "players who completed area 7, base and purchaser reported separately",
        "highestValue": true,
        "alarm": [
          { "kind": "invariant", "rule": "realised ratio <= 1.0", "status": "invariant", "reason": "this is the wave-4 insolvency failure recurring live: the ladder is bought out before the last area. meta/04 states the requirement and nothing in production has ever checked it." },
          { "kind": "relative", "rule": "realised cumulative income outside tolerance of solvency.areaLedger[6].cumulativeIncome", "tolerance": 0.15, "status": "playtest unknown", "testRange": [0.10, 0.30] }
        ],
        "liveDisagreement": "solvency on disk publishes a ladder total and an area-7 cumulative income that differ from what cid/gameplay/_verified-wave4.md ruled correct, by roughly 60% on the income side. This reading arbitrates between the two published answers, not only between design and reality."
      },
      {
        "id": "rungsBoughtPerArea",
        "refutes": { "key": "solvency", "field": "areaLedger[k].rungsBought and tests.S5" },
        "computedFrom": "count of sink events grouped by areaOrdinal, per player",
        "population": "players who completed that area",
        "alarm": [
          { "kind": "invariant", "rule": "median rungs bought at any areaOrdinal < 4", "status": "invariant", "reason": "tests.S5 states the >= 4 invariant and pacing.aboveTickGapCarriedBy makes purchase cadence, not reveal spacing, the thing carrying core-loop/01's 90-second rule" },
          { "kind": "absolute", "rule": "median differs from solvency.areaLedger[k].rungsBought by more than tolerance rungs", "tolerance": 1, "status": "playtest unknown", "testRange": [1, 3] }
        ]
      },
      {
        "id": "ladderFractionAtArea8Complete",
        "refutes": { "key": "solvency", "field": "ladderBoughtAtCollectionComplete" },
        "computedFrom": "cumulative sink amount at the last sink event tagged areaOrdinal '8', divided by solvency.ladderTotal",
        "isProxy": true,
        "proxyNote": "the exact reading is taken at 24 of 24, which LogEconomyEvent cannot see. pacing.milestones[collectionComplete] falls inside area 8 and area8Complete is later, so this proxy bounds the true fraction from above. The exact form needs event-catalog work's collection-complete event and is a join across two catalogs, not a design of mine.",
        "population": "players who completed area 8",
        "alarm": [
          { "kind": "invariant", "rule": "proxy fraction >= 1.0", "status": "invariant", "reason": "the ladder is exhausted before the collection finishes, which is the failure meta/04 named and balance/03 was written to close" },
          { "kind": "absolute", "rule": "proxy differs from solvency.ladderBoughtAtCollectionComplete by more than tolerance", "tolerance": 0.10, "status": "playtest unknown", "testRange": [0.05, 0.20] }
        ]
      },
      {
        "id": "areaOrdinalAtLadderExhaustion",
        "refutes": { "key": "solvency", "field": "ladderExhaustedAfter" },
        "computedFrom": "the areaOrdinal on the sink event after which cumulative sink amount equals solvency.ladderTotal",
        "unit": "area ordinals and post-terminal bays, never seconds",
        "unitReason": "the wall-clock form refutes pacing.milestones[ladderExhausted] and needs a session clock and a session id, neither of which exists anywhere in game/src. That conversion is engagement work's with pacing, not mine.",
        "population": "players who exhausted the ladder",
        "alarm": [
          { "kind": "invariant", "rule": "exhaustion at an areaOrdinal of 8 or lower", "status": "invariant", "reason": "the ladder must outlast the specced game; exhaustion inside it is the shipped ladder's original defect" },
          { "kind": "absolute", "rule": "exhaustion more than tolerance bays away from solvency.ladderExhaustedAfter", "tolerance": 2, "unit": "post-terminal bays", "status": "playtest unknown", "testRange": [1, 4] }
        ]
      },
      {
        "id": "unspentBalanceShare",
        "refutes": { "key": "economy", "field": "the sink being reachable at all, and atMaxLadder.incomeContinues" },
        "computedFrom": "the share of source events whose endingBalance is at or above the cheapest next rung's cost, restricted to areaOrdinal '1'..'8'",
        "population": "all sessions in a published place",
        "alarm": { "kind": "share", "rule": "share above threshold while areaOrdinal <= 8", "threshold": 0.25, "status": "playtest unknown", "testRange": [0.10, 0.50], "reason": "before exhaustion a player who can spend does spend, so a persistently affordable unspent balance means either the ladder ran out early or the purchase control is unreachable. The 2026-08-01 playtest shipped a purchase control rendered over the play area and nothing in the game could have reported it." },
        "routesTo": "purchase-surface and HUD work if the ladder is not exhausted; solvency if it is"
      },
      {
        "id": "duplicateReveal",
        "refutes": { "key": "discovery", "field": "repeat.possible" },
        "definedBy": "cid/analytics/economy/02-duplicate-and-defect-volume.md",
        "expected": 0,
        "alarm": 1,
        "kind": "correctness"
      },
      {
        "id": "unknownTierClear",
        "refutes": { "key": "tiers", "field": "the tierIndex assigned by layout's anchor generation" },
        "definedBy": "cid/analytics/economy/02-duplicate-and-defect-volume.md",
        "expected": 0,
        "alarm": 1,
        "kind": "correctness"
      }
    ],
    "dormant": "rows written by cid/analytics/economy/03-what-this-economy-cannot-report.md",
    "structurallyAbsent": "rows written by cid/analytics/economy/03-what-this-economy-cannot-report.md",
    "forbidden": "rows written by cid/analytics/economy/03-what-this-economy-cannot-report.md"
  }
}
```

## Consequences for other work

- **Logging-pipeline work** inherits three call sites and one accumulator, stated as a requirement
  and not designed here: a per-character `{patches, currency}` accumulator in `Clearing`, never
  persisted and never sent to a client, flushed at `batchPatchCount`, at the `areasFinished`
  increment, at a `value`-level change and at `onLeave`; and one `Sink` call in
  `init.server.luau onPurchase` at the `UpgradeApplied` site. **`readableToday` is `false` for
  every row above** and stays false until that work exists.
- **Emission-budget work** owns the total request budget. I claim 25% of it for the faucet and
  express `batchPatchCount` as an inequality, so lowering my share re-derives the number rather
  than reopening this sheet. If the transport becomes something other than `AnalyticsService`,
  the `120 + 20 × CCU` limit does not apply and the batch size is re-derived from theirs.
- **Event-catalog work** owns the seam I do not cross: I hold the argument values and the two
  record ids; `telemetry.events[]` holds the insertion point, naming and sampling and references a
  record by id. Two readings are explicit joins onto their catalog —
  `ladderFractionAtArea8Complete` wants a collection-complete event and
  `areaOrdinalAtLadderExhaustion`'s wall-clock form wants a session id.
- **KPI work** selects from these rows and sets the verdict. `heldBalanceAtSessionEnd` is their
  candidate and `unspentBalanceShare` is the reading under it. **I set the alarm band on a
  reading; I set no pass mark and no ship verdict.**
- **Balance and Tuning** is asked for nothing. Every prediction above is named by key and field,
  so all sixteen wave-4 revision requests can land without touching this sheet.
- **Purchase-surface and HUD work** gains the reading that catches an unreachable buy control,
  which is the defect the one existing playtest found by eye and no instrument could have named.

## Acceptance criteria

1. `economyHealth.flows` has exactly two entries, one with `flowType: "Source"` and one with
   `flowType: "Sink"`, and neither carries a currency string literal — both resolve
   `currencyType` through `currencyTypeSource`, which names `currency.name`.
2. Every row in `economyHealth.readings[]` has a non-empty `refutes.key` and `refutes.field`, and
   **no row carries a `refutes.value`**.
3. `economyHealth.customFieldCombinationBudget.total` equals the sum of the two records' declared
   cardinality products (`9×2×21 + 9×2×20 = 738`) and is at most `8000`.
4. Every `alarm` on every reading is either `status: "invariant"` with a literal threshold or
   `status: "playtest unknown"` with both a `tolerance`/`threshold` and a `testRange`. Zero rows
   have neither.

## Not decided here

Event names, payload field names, the naming convention, sampling and every `LogCustomEvent`
payload — event-catalog work, which holds `telemetry`. The total emission budget, what happens to
a throttled event, and the transport itself — emission-budget and logging-pipeline work. Every
pass mark, target and ship/no-ship verdict — KPI work, which holds `kpis`. Session length, laps
per session, time-to-area and every wall-clock conversion of my exhaustion reading — engagement
work. The duplicate and unknown-tier counters' definitions, alarms and routing — sheet `02`, this
domain. The `dormant`, `structurallyAbsent` and `forbidden` rows this manifest carries — sheet
`03`, this domain. Any cost, growth rate, weight vector, patch count or lap figure — Balance and
Tuning; I name fields and set none. Server authority and anti-cheat readings on the economy —
security work. Whether `economyHealth` is promoted, and under which of the two statuses —
whoever maintains `bridge/schema.mjs` and the build order.
