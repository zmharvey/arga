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
(`economy.faucets[patch-clear].perEvent: true`) and the per-server allowance is
`telemetry.budget.perServerRequestsPerMinute`, which `events/03` rules is `20 × runtime.maxPlayers`
with the flat 120 of `120 + (20 × CCU)` excluded because the `CCU` scope is `[unverified]` and the
conservative reading is taken `[research: https://create.roblox.com/docs/production/analytics/event-types]`.
I read that field rather than re-deriving it — the same rule I apply to Balance's numbers, applied
to a sibling's. The faucet's per-clear rate is
`60 × runtime.maxPlayers × max_k(solvency.areaLedger[k].patchCount / pacing.laps[k].realisedLapSeconds)`,
which at the figures on disk today peaks at the post-terminal bay near **9,600/min against 320** —
roughly 30× over before any other domain emits anything. Batching is forced, not preferred.

**Batching is a decision about the analytics call and about nothing else.**
`economy.faucets[patch-clear].perEvent` stays `true`: every patch still credits at the instant it
clears, at the same amount, with the same floor and the same single multiplier application. This
sheet accumulates and reports; it does not defer a payment.

**The batch is a patch count, not an area or a clock, because the count is what makes the reading
self-describing.** A full window is exactly `N` patches, so realised value per patch is
`amount / N` with no second field spent on a denominator — and the `valueLevel` flush that makes
that quotient comparable to `tierMix.byDepth[d].expectedValuePerPatch` has nowhere to exist under
per-area emission. **`N = 128`** `[cid: decided]`, test range [96, 256], from the `batchRule`
inequality at a **25% share** of the per-server allowance. **The margin is thin and I am stating
it rather than rounding it away:** at the on-disk figures the rule selects a minimum near 120, so
128 clears it by about 6%, and the binding row is the post-terminal bay. If
`solvency.postTerminalBay.patchCount` rises or `pacing.laps[bay].realisedLapSeconds` falls,
`batchRule` selects a larger `N` and the test range's top of 256 covers it. The share is mine to
claim and **not mine to set**: emission-budget work owns the total.

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
areas cleared under `discovery.pool.placementIsPlayerIndependent`. Total unique combinations
**738**, against a cap of 8,000 across all three
`[research: https://github.com/Roblox/creator-docs/blob/main/content/en-us/production/analytics/custom-fields.md]`.
`entitlement`'s values are `telemetry.customFields.field02`'s verbatim, so an economy breakdown
joins to a custom-event one.

**The balance series costs nothing extra.** `endingBalance` rides in the same call as `amount`,
which is why the flow record and the currency-held series are one decision and not two, and the
dashboard already charts **average wallet balance**
`[research: https://create.roblox.com/docs/production/analytics/economy-events]`. A second,
zero-instrumentation route exists: `currency` is one of the seven persisted fields
`[research: game/src/server/Persistence.luau]` and a standard data store's entries are listable
through Open Cloud `[research: https://create.roblox.com/docs/cloud/guides/data-stores]`.

**Corrected: the solvency figures were three revision rounds, not three disagreeing sheets.** My
first draft reported a ~60% disagreement between disk and `_verified-wave4.md`. That is wrong.
**On disk, `solvency.areaLedger[6].cumulativeIncome` is 70,017 and `solvency.tests.S1` states
`260898 > 70017, ratio 3.726`.** ×3.663 against 71,233 is `_verified-wave4.md` **round 2**'s
re-derivation, not the disk. 244,839 is **round 1**'s superseded ladder total and its ruled ×3.263
pairs with 75,033. **The live gap on the income side is about 1.7%, not 60%**, and the pair
`244,839 / 113,880` that `_category.md` publishes as ×3.26 is arithmetically ×2.15 and matches
nothing anyone ruled — the revision request is below.
`[research: cid/gameplay/balance/03-ladder-solvency.md]` `[research: cid/gameplay/_verified-wave4.md]`

**The discipline still holds, and it is now demonstrated rather than asserted.** The three figures
were three states of one sheet inside about a week, each correct when written. A number copied
into this sheet at any of those moments would have been stale within days **without any sheet
being wrong and without any check firing.** That is a stronger argument for a pointer than a
genuine disagreement would have been, and it is why every row below names a key and a field.

**Which readings move if a revision lands.** RR-1 corrects `solvency.ladderTotal` and the per-axis
totals: `solvencyRatio` and `ladderFractionAtArea8Complete` read the corrected value with no edit
here. RR-8 moves `depths.areas[].patchCount`: `realisedValuePerPatch` and `area1RealisedIncome`
change denominator, and `batchRule` is re-evaluated because `patchCount / realisedLapSeconds` is
its input. RR-9 restates `pacing`'s session criterion, which this sheet does not read. RR-10 moves
`firstPurchase`, which is funnel-definition work's. **No reading is deleted by any of the sixteen.**

**One reading has an expected value of exactly zero and is not a tuning signal**: duplicate
reveals. Its definition, alarm and routing are sheet `02`'s and are carried here as one row.
`dormant`, `structurallyAbsent` and `forbidden` are supplied by sheet `03` as an `amends` block
and no longer appear here as placeholder strings.

```manifest
{
  "provides": "economyHealth",
  "status": "proposed",
  "value": {
    "note": "A reading specification, not a design value a module consumes. Every readings[] row names the key and field it refutes and carries no copy of that field's value.",
    "promotionStatus": {
      "recommended": "developer-facing, not read by a build",
      "reason": "no Luau module needs a value from this key at runtime; game/src has zero AnalyticsService and zero LogService calls, and bridge/emit-config.mjs produces GameConfig only.",
      "alternative": "add an analytics call-site module to the technical contract that reads economyHealth.flows directly",
      "alternativeRejectedBecause": "one build module would then read two keys with overlapping content, which is how two answers for one call get written",
      "appliesTo": ["economyHealth", "funnels", "engagement", "lapClock", "retentionReadout", "kpis"],
      "telemetryExcluded": "telemetry is NOT in this class and my first draft wrongly listed it. telemetry.events[] is a build input in the same sense as composition or replication: an insertion point, an API call, a value and three field positions per event are what a builder writes the telemetry module FROM. The split: telemetry.events[] needs a consumer in the TECHNICAL contract; telemetry.budget, .forbiddenPayload and .unproducible are developer-facing.",
      "crossKeyCheckDirection": "the merger must check that every readings[].refutes.field still resolves in the merged manifest, which runs opposite to every existing cross-key check",
      "refShapeCaveat": "kpis' schemaRequirement serves three keys that encode a reference three ways. This key's refutes.field is sometimes prose (see area1RealisedIncome). One normalised ref shape must be named before that check can serve all three; I do not name it, and I will emit whichever shape it fixes.",
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
        "batchRule": "batchPatchCount >= 60 * runtime.maxPlayers * max over k of (solvency.areaLedger[k].patchCount / pacing.laps[k].realisedLapSeconds) / (faucetBudgetShare * telemetry.budget.perServerRequestsPerMinute)",
        "batchRuleDenominatorSource": "telemetry.budget.perServerRequestsPerMinute, ruled by events/03 as 20 * runtime.maxPlayers with the flat 120 excluded. This sheet carries no copy of it.",
        "faucetBudgetShare": 0.25,
        "faucetBudgetShareOwner": "emission-budget work owns the total request budget and may lower this share; batchPatchCount is then re-derived from batchRule and this sheet does not change",
        "marginAtOnDiskFigures": "the rule selects a minimum near 120, so 128 clears it by about 6%. The binding row is the post-terminal bay. The rule binds; this evaluation does not.",
        "flushOn": ["area completion", "session end", "a value-level change"],
        "windowsNeverStraddleAreas": true,
        "eventsPerPlayerPerArea": "ceil(depths.areas[k].patchCount / batchPatchCount)",
        "eventsPerPlayerWholeSpeccedGame": "the sum of that over the eight areas; 38 at the figures on disk today",
        "perClearAlternativeRejected": "about 9600 requests per minute at the binding row against a 320 per minute per-server allowance, roughly 30x over, and about 4400 events per player for eight areas",
        "customFields": [
          { "key": "CustomField01.Name", "name": "areaOrdinal", "required": true, "values": ["1","2","3","4","5","6","7","8","bay"], "cardinality": 9, "why": "every prediction in solvency.areaLedger[] and tierMix.byDepth[] is indexed by it; depth and sets held are derivable from it and cost no field" },
          { "key": "CustomField02.Name", "name": "entitlement", "required": true, "values": ["none","span"], "cardinality": 2, "valuesAlignedWith": "telemetry.customFields.field02, adopted verbatim so an economy breakdown joins to a custom-event one", "why": "every pacing figure is published in a base and a purchaser population; constant 'none' while products.items[span].gamePassId is null, and a reading taken without the split cannot be re-split later" },
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
        "emitOnRefusalReason": "economy.sinks[upgrade-purchase].onInsufficientFunds changes nothing, so no currency flowed. A refused purchase is carried by telemetry's upgrade_refused, not by an economy flow.",
        "customFields": [
          { "key": "CustomField01.Name", "name": "areaOrdinal", "required": true, "cardinality": 9, "why": "reads rungs bought per area against solvency.areaLedger[k].rungsBought directly" },
          { "key": "CustomField02.Name", "name": "entitlement", "required": true, "values": ["none","span"], "cardinality": 2, "why": "same populations and the same encoding as the source record" },
          { "key": "CustomField03.Name", "name": "heldLevelAfter", "required": true, "values": "'1' through upgrades[].maxLevel", "cardinality": 20, "why": "with itemSku this checks the realised cost curve rung by rung against solvency.costFormula" }
        ]
      }
    ],
    "customFieldCombinationBudget": { "source": 378, "sink": 360, "total": 738, "cap": 8000, "note": "this is the economy-event subtotal only; the experience total also carries telemetry's custom-event and funnel-step values" },
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
          { "kind": "invariant", "rule": "realised ratio <= 1.0", "status": "invariant", "reason": "this is the wave-4 insolvency failure recurring live: the ladder bought out before the last area. meta/04 states the requirement and nothing in production has ever checked it." },
          { "kind": "relative", "rule": "realised cumulative income outside tolerance of solvency.areaLedger[6].cumulativeIncome", "tolerance": 0.15, "status": "playtest unknown", "testRange": [0.10, 0.30] }
        ],
        "whyAPointerAndNotANumber": "solvency.areaLedger[6].cumulativeIncome moved three times in about a week — round 1, round 2 and the current disk value — each state correct when written. A copied figure would have gone stale with no sheet being wrong and no check firing. The tolerance above is relative to the field, so it survives all three."
      },
      {
        "id": "rungsBoughtPerArea",
        "refutes": { "key": "solvency", "field": "areaLedger[k].rungsBought and tests.S5" },
        "computedFrom": "count of sink events grouped by areaOrdinal, per player",
        "population": "players who completed that area",
        "alarm": [
          { "kind": "invariant", "rule": "median rungs bought at any areaOrdinal < 4", "status": "invariant", "reason": "tests.S5 states the >= 4 invariant and pacing.aboveTickGapCarriedBy makes purchase cadence, not reveal spacing, the thing carrying core-loop/01's 90-second rule. The endless bay sits AT the floor on disk, so this alarm has no slack there." },
          { "kind": "absolute", "rule": "median differs from solvency.areaLedger[k].rungsBought by more than tolerance rungs", "tolerance": 1, "status": "playtest unknown", "testRange": [1, 3] }
        ]
      },
      {
        "id": "ladderFractionAtArea8Complete",
        "refutes": { "key": "solvency", "field": "ladderBoughtAtCollectionComplete" },
        "computedFrom": "cumulative sink amount at the last sink event tagged areaOrdinal '8', divided by solvency.ladderTotal",
        "isProxy": true,
        "proxyNote": "the exact reading is taken at 24 of 24, which LogEconomyEvent cannot see. pacing.milestones[collectionComplete] falls inside area 8 and area8Complete is later, so this proxy bounds the true fraction from above.",
        "population": "players who completed area 8",
        "alarm": [
          { "kind": "invariant", "rule": "proxy fraction >= 1.0", "status": "invariant", "reason": "the ladder is exhausted before the collection finishes, which is the failure meta/04 named and balance/03 was written to close" },
          { "kind": "absolute", "rule": "proxy differs from solvency.ladderBoughtAtCollectionComplete by more than tolerance", "tolerance": 0.10, "status": "playtest unknown", "testRange": [0.05, 0.20] }
        ],
        "consumes": "telemetry.events[set_completed], which verification found orphaned. This reading is its consumer for the exact, non-proxy form."
      },
      {
        "id": "areaOrdinalAtLadderExhaustion",
        "refutes": { "key": "solvency", "field": "ladderExhaustedAfter" },
        "computedFrom": "the areaOrdinal on the sink event after which cumulative sink amount equals solvency.ladderTotal",
        "unit": "area ordinals and post-terminal bays, never seconds",
        "unitReason": "the wall-clock form refutes pacing.milestones[ladderExhausted] and needs a session clock and a session id, neither of which exists in game/src. That conversion is lapClock and engagement work's with pacing, not mine.",
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
    ]
  }
}
```

## Revision request against `cid/analytics/_category.md`

Issued here so the other three sheets that inherited the figure stop citing it.

| line | current | requested | why |
|---|---|---|---|
| Economy Health assignment, *"the ladder is the sink and it runs out"* | *"`balance/03` puts the ladder total at 244,839 against cumulative income of 113,880 — a ×3.26 solvency ratio"* | *"`balance/03` publishes `solvency.ladderTotal` against `solvency.areaLedger[6].cumulativeIncome`, and `solvency.tests.S1` states the realised ratio; read the fields"* | `244,839 / 113,880` is **×2.15**. The ×3.26 pair is `244,839 / 75,033`, and both figures are round 1's, superseded on disk |
| §B stated predictions, the `solvency` / `upgrades` row | *"the ladder total against cumulative income (the ×3.26 solvency ratio)"* | strike the parenthesis; name `solvency.tests.S1` instead | the same stale ratio restated; four sheets inherited it from these two lines |
| both lines | a copied pair | a field path | a category brief is read by every domain in it, so a number there propagates further than one in a leaf sheet |

## Consequences for other work

- **Logging-pipeline work** inherits three call sites and one accumulator, stated as a requirement
  and not designed here: a per-character `{patches, currency}` accumulator in `Clearing`, never
  persisted and never sent to a client, flushed at `batchPatchCount`, at the `areasFinished`
  increment, at a `value`-level change and at `onLeave`; and one `Sink` call in
  `init.server.luau onPurchase` at the `UpgradeApplied` site. **`readableToday` is `false` for
  every row above** and stays false until that work exists.
- **Emission-budget and event-catalog work** get one figure to adopt and one to drop: the
  patch-clear cadence is `economyHealth.flows[patch-clear].batchPatchCount` with its flush list,
  and my `batchRule` now points at `telemetry.budget.perServerRequestsPerMinute` rather than
  carrying its own denominator. Neither sheet restates the other's number in either direction.
- **KPI work** selects from these rows and sets the verdict. `heldBalanceAtSessionEnd` is their
  candidate and `unspentBalanceShare` is the reading under it. **I set the alarm band on a
  reading; I set no pass mark and no ship verdict.** `promotionStatus.refShapeCaveat` records that
  this key's `refutes.field` is sometimes prose, which their `schemaRequirement` must normalise.
- **Whoever holds `cid/analytics/_category.md`** owns the revision above; four sheets read it.
- **Balance and Tuning** is asked for nothing. Every prediction above is named by key and field.
- **Purchase-surface and HUD work** gains the reading that catches an unreachable buy control,
  which is the defect the one existing playtest found by eye and no instrument could have named.

## Acceptance criteria

1. `economyHealth.flows` has exactly two entries, one `flowType: "Source"` and one
   `flowType: "Sink"`; neither carries a currency string literal; and **neither carries a numeric
   requests-per-minute allowance** — `batchRule` names
   `telemetry.budget.perServerRequestsPerMinute`.
2. Every row in `economyHealth.readings[]` has a non-empty `refutes.key` and `refutes.field`, and
   **no row carries a `refutes.value`**.
3. `economyHealth.customFieldCombinationBudget.total` equals the sum of the two records' declared
   cardinality products (`9×2×21 + 9×2×20 = 738`) and is at most `8000`; and both records'
   `CustomField02` values equal `["none","span"]`, matching `telemetry.customFields.field02`.
4. `economyHealth` contains **no key whose value is a filename or a sentence promising rows**:
   `dormant`, `structurallyAbsent` and `forbidden` are absent from this block and arrive from
   sheet `03`'s `amends` block.

## Not decided here

Event names, payload field names, the naming convention, sampling and every `LogCustomEvent`
payload — event-catalog work, which holds `telemetry`. The total emission budget, what happens to
a throttled event, and the transport itself — emission-budget and logging-pipeline work. Every
pass mark, target and ship/no-ship verdict — KPI work, which holds `kpis`, including the
normalised reference shape its `schemaRequirement` needs. Session length, laps per session,
time-to-area and every wall-clock conversion of my exhaustion reading — engagement and `lapClock`
work. The duplicate and unknown-tier counters — sheet `02`. The `dormant`, `structurallyAbsent`
and `forbidden` rows — sheet `03`, as an `amends` block. Any cost, growth rate, weight vector,
patch count or lap figure — Balance and Tuning; I name fields and set none. Server authority and
anti-cheat readings on the economy — security work. Whether `economyHealth` is promoted, and
whether `telemetry.events[]` moves to the technical contract — whoever maintains
`bridge/schema.mjs` and the build order.
