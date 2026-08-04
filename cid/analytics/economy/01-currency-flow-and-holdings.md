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
I read that field rather than re-deriving it. The faucet's per-clear rate is
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
that quotient comparable to `tierMix.byDepth[*].expectedValuePerPatch` has nowhere to exist under
per-area emission.

**`N` is two-sided, and the second side is new here because verification asked what happens when
the binding row moves.** The **lower** bound is the budget: `batchRule`, which at the on-disk
figures selects a minimum near 120. The **upper** bound is sampling: `N` may not exceed the
smallest `depths.areas[k].patchCount`, or the shallowest area yields **no full window at all** and
contributes nothing to `realisedValuePerPatch`. On disk that is 140, so the legal window is
**[121, 140] and `N = 128` sits inside it with about 6% below and 9% above.** That is thin, and
`_verified-wave4.md` RR-8 moves `depths.areas[].patchCount`, so **it will move.**

**What happens then is a re-derivation, not a stale number.** `batchPatchCount` is the smallest
multiple of 32 at or above the lower bound, clamped into `[96, upper]`. A 7% rise in the binding
bay row takes the lower bound past 128 and the rule returns **160** — which then exceeds the
upper bound of 140, and the tie-break is decided here rather than discovered later: **the upper
bound drops area 1 and becomes the minimum over areas 2 to 8**, so depth 1's expected-value sample
comes from area 2 alone. That costs almost nothing — area 1 is the only area whose income is also
read as a *total* by `area1RealisedIncome`, which needs no full window, and area 1's windows are
the ones most contaminated by the arming gate and the guaranteed first Find. If even that crosses,
the answer is **not** a bigger batch: `faucetBudgetShare` rises, and that is emission-budget work's
call, not mine. All three steps are in the manifest as `reDerivation`.

**A window never straddles an area, a short window is a different `itemSku`, and both records use
`transactionType: Gameplay`.** The two SKUs `patch-clear` / `patch-clear-partial` make every full
window known to be exactly `N` patches at zero custom-field cost, and a missing `itemSku` displays
as N/A. `Shop` would assert a store that does not exist — `products.storeExists` is `false` under
ruling R-4 and `promptGamePassPurchaseCalls` is `0` — and with `economy.faucetCount` 1 against
`economy.sinkCount` 1 the transaction-type breakdown separates nothing `flowType` and the SKU do
not `[research: https://create.roblox.com/docs/production/analytics/economy-events]`.

**The three custom fields are spent on the dimensions that make Balance's predictions separable
and on nothing else.** `areaOrdinal` because every prediction in `solvency.areaLedger[]` and
`tierMix.byDepth[]` is indexed by it; `entitlement` because every wall-clock and lap figure in
`pacing` is published in a base and a purchaser population; and the third field is the multiplier
confound — `valueLevel` on the source, `heldLevelAfter` on the sink. Without `valueLevel`,
`amount / N` is not comparable to `tierMix.byDepth[*].expectedValuePerPatch` at all, because
`economy.faucets[patch-clear].formula` applies `modifiers.effective('value')` at the faucet. **No
field is spent on depth or on sets held**: both derive from `areaOrdinal`. Total unique
combinations **738** against a cap of 8,000
`[research: https://github.com/Roblox/creator-docs/blob/main/content/en-us/production/analytics/custom-fields.md]`.
`entitlement`'s values are `telemetry.customFields.field02`'s verbatim.

**The balance series costs nothing extra.** `endingBalance` rides in the same call as `amount`,
which is why the flow record and the currency-held series are one decision and not two, and the
dashboard already charts **average wallet balance**
`[research: https://create.roblox.com/docs/production/analytics/economy-events]`. A second,
zero-instrumentation route exists: `currency` is one of the seven persisted fields
`[research: game/src/server/Persistence.luau]` and a standard data store's entries are listable
through Open Cloud `[research: https://create.roblox.com/docs/cloud/guides/data-stores]`.

**Corrected: the solvency figures were three revision rounds, not three disagreeing sheets.** My
first draft reported a ~60% disagreement between disk and `_verified-wave4.md`. **On disk,
`solvency.areaLedger[6].cumulativeIncome` is 70,017 and `solvency.tests.S1` states
`260898 > 70017, ratio 3.726`.** ×3.663 against 71,233 is round 2's re-derivation; 244,839 is
round 1's superseded total and its ruled ×3.263 pairs with 75,033. **The live gap is about 1.7%,
not 60%.** The pair `244,839 / 113,880` that `_category.md` published as ×3.26 is ×2.15 and matched
nothing anyone ruled; **that line is now fixed at source** — I raised it, nobody owned the file,
and it survived two rounds, so I applied it rather than filing a third request.
`[research: cid/gameplay/balance/03-ladder-solvency.md]` `[research: cid/gameplay/_verified-wave4.md]`

**The discipline is now demonstrated rather than asserted.** Three states of one sheet inside a
week, each correct when written. A number copied at any of those moments would have been stale
within days **with no sheet wrong and no check firing** — a stronger argument for a pointer than a
real disagreement would have been.

**Every reference is migrated to `kpis.refGrammar`'s one `ref` shape, and I removed the collision
at source rather than relying on the resolver's scope.** `readings[].refutes` is now a `ref` object
with `kind` / `path` / `sheet`, the key carries `refShape: 1`, and the two prose citations take
`kind: "briefLine"`. Separately, **my alarms' `kind` field is renamed `alarmKind`**: it held
`relative` / `invariant` / `share` / `absolute`, disjoint from the grammar's three, in the key
being migrated, so a resolver deep-walking for `kind` would try to resolve an alarm as a reference.
The grammar scopes itself to named fields and would not — but a rename inside my own key makes the
collision impossible rather than merely unlikely, and costs one field name.

**Which readings move if a revision lands.** RR-1 corrects `solvency.ladderTotal`: `solvencyRatio`
and `ladderFractionAtArea8Complete` read the corrected value with no edit. RR-8 moves
`depths.areas[].patchCount`: `realisedValuePerPatch` and `area1RealisedIncome` change denominator
and `batchPatchCount` re-derives by the rule above. RR-9 and RR-10 touch fields this sheet does not
read. **No reading is deleted by any of the sixteen.**

**One reading has an expected value of exactly zero and is not a tuning signal**: duplicate
reveals. Its definition, alarm and routing are sheet `02`'s. `dormant`, `structurallyAbsent` and
`forbidden` are supplied by sheet `03` as an `amends` block.

```manifest
{
  "provides": "economyHealth",
  "status": "proposed",
  "value": {
    "note": "A reading specification, not a design value a module consumes. Every readings[] row carries a refGrammar ref and no copy of the cited field's value.",
    "refShape": 1,
    "refSites": ["readings[*].refutes"],
    "refCount": 9,
    "promotionStatus": {
      "recommended": "developer-facing, not read by a build",
      "reason": "no Luau module needs a value from this key at runtime; game/src has zero AnalyticsService and zero LogService calls, and bridge/emit-config.mjs produces GameConfig only.",
      "alternative": "add an analytics call-site module to the technical contract that reads economyHealth.flows directly",
      "alternativeRejectedBecause": "one build module would then read two keys with overlapping content, which is how two answers for one call get written",
      "appliesTo": ["economyHealth", "funnels", "engagement", "lapClock", "retentionReadout", "kpis"],
      "telemetryExcluded": "telemetry is NOT in this class and my first draft wrongly listed it. telemetry.events[] is a build input in the same sense as composition or replication. The split: telemetry.events[] needs a consumer in the TECHNICAL contract; telemetry.budget, .forbiddenPayload and .unproducible are developer-facing.",
      "refShapeMigrated": "closed. readings[].refutes is kpis.refGrammar's ref object, this key carries refShape 1, and the two prose citations use kind briefLine per refGrammar.gap4_oneShape's economyHealth migration line. No ref in this key sets requireNonNull.",
      "kindCollisionRemoved": "alarm entries formerly carried a field named kind with values relative/invariant/share/absolute, disjoint from refGrammar's manifestField/commandOutput/briefLine. Renamed alarmKind so a resolver deep-walking for kind cannot mistake an alarm for a ref. The grammar scopes to named fields and would not, but the rename makes it impossible rather than unlikely.",
      "seamWithTelemetry": "this key holds the argument VALUES and the flow-record ids; telemetry.events[] references a record by id and holds the insertion point, the naming and the sampling."
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
        "batchRule": "LOWER BOUND. batchPatchCount >= 60 * runtime.maxPlayers * max over k of (solvency.areaLedger[k].patchCount / pacing.laps[k].realisedLapSeconds) / (faucetBudgetShare * telemetry.budget.perServerRequestsPerMinute)",
        "batchRuleDenominatorSource": "telemetry.budget.perServerRequestsPerMinute, ruled by events/03 as 20 * runtime.maxPlayers with the flat 120 excluded. This sheet carries no copy of it.",
        "samplingBound": "UPPER BOUND. batchPatchCount <= min over k in samplingBoundScope of depths.areas[k].patchCount, or the smallest area yields no full window and contributes nothing to readings[realisedValuePerPatch].",
        "samplingBoundScope": "all eight areas",
        "faucetBudgetShare": 0.25,
        "faucetBudgetShareOwner": "emission-budget work owns the total request budget and may lower this share; batchPatchCount is then re-derived by reDerivation and this sheet does not change",
        "windowAtOnDiskFigures": { "lower": 121, "upper": 140, "chosen": 128, "marginBelow": "about 6%", "marginAbove": "about 9%", "note": "the rule and the re-derivation bind; this evaluation does not. _verified-wave4.md RR-8 moves depths.areas[].patchCount, so this window will move." },
        "reDerivation": {
          "trigger": "any change to solvency.areaLedger[].patchCount, solvency.postTerminalBay.patchCount, pacing.laps[].realisedLapSeconds, runtime.maxPlayers, telemetry.budget.perServerRequestsPerMinute or faucetBudgetShare",
          "step1": "batchPatchCount = the smallest multiple of 32 at or above the lower bound, clamped into [96, upper bound]",
          "step2": "if the lower bound exceeds the upper bound, set samplingBoundScope to 'areas 2 to 8' and recompute the upper bound. Depth 1's expected-value sample then comes from area 2 alone, which costs almost nothing: area 1's income is also read as a total by readings[area1RealisedIncome], which needs no full window, and area 1's windows are the ones most contaminated by the arming gate and the guaranteed first Find.",
          "step3": "if it still exceeds, the answer is NOT a larger batch. faucetBudgetShare rises, which is emission-budget work's call and not this sheet's. A batch past the test range's top loses depth-1 resolution entirely.",
          "whyStated": "a rule that re-derives is fine; a number that silently goes illegal is not. 128 currently sits inside its own margin and the row that binds it is under revision."
        },
        "flushOn": ["area completion", "session end", "a value-level change"],
        "windowsNeverStraddleAreas": true,
        "eventsPerPlayerPerArea": "ceil(depths.areas[k].patchCount / batchPatchCount)",
        "eventsPerPlayerWholeSpeccedGame": "the sum of that over the eight areas; 38 at the figures on disk today",
        "perClearAlternativeRejected": "about 9600 requests per minute at the binding row against a 320 per minute per-server allowance, roughly 30x over, and about 4400 events per player for eight areas",
        "customFields": [
          { "key": "CustomField01.Name", "name": "areaOrdinal", "required": true, "values": ["1","2","3","4","5","6","7","8","bay"], "cardinality": 9, "why": "every prediction in solvency.areaLedger[] and tierMix.byDepth[] is indexed by it; depth and sets held are derivable from it and cost no field" },
          { "key": "CustomField02.Name", "name": "entitlement", "required": true, "values": ["none","span"], "cardinality": 2, "valuesAlignedWith": "telemetry.customFields.field02, adopted verbatim so an economy breakdown joins to a custom-event one", "why": "every pacing figure is published in a base and a purchaser population; constant 'none' while products.items[span].gamePassId is null, and a reading taken without the split cannot be re-split later" },
          { "key": "CustomField03.Name", "name": "valueLevel", "required": true, "values": "the held level of upgrades[value] as a string, '0' through upgrades[value].maxLevel", "cardinality": 21, "why": "economy.faucets[patch-clear].formula applies modifiers.effective('value'), so amount/N is not comparable to tierMix.byDepth[*].expectedValuePerPatch without it" }
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
          { "key": "CustomField01.Name", "name": "areaOrdinal", "required": true, "cardinality": 9, "why": "reads rungs bought per area against solvency.areaLedger[*].rungsBought directly" },
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
        "refutes": { "kind": "manifestField", "path": "tierMix.byDepth[*].expectedValuePerPatch", "sheet": "cid/gameplay/balance/02-patch-payout-and-depth-mix.md" },
        "computedFrom": "over source events with itemSku 'patch-clear' and areaOrdinal in the areas at depth d: mean(amount) / batchPatchCount / effectiveValueMultiplier(valueLevel, areaOrdinal)",
        "population": "all sessions in a published place, grouped by depth",
        "alarm": { "alarmKind": "relative", "rule": "abs(realised - predicted) / predicted > tolerance at any depth", "tolerance": 0.10, "status": "playtest unknown", "testRange": [0.05, 0.20], "reason": "a single mis-set column in a depth weight vector moves expected value by roughly a tenth, so 0.10 catches one bad weight and sits above the sampling error of a 128-patch window" },
        "voidedBy": "unknownTierClear",
        "voidedByReason": "a patch paying economy.payoutFloor instead of its tier value deflates this reading silently; sheet 02 owns that counter"
      },
      {
        "id": "area1RealisedIncome",
        "refutes": { "kind": "briefLine", "path": null, "sheet": "cid/gameplay/meta/01-the-area.md", "claim": "A full clear of this area yields between 700 and 1,200 currency at upgrade level 0." },
        "refKindReason": "acceptance criterion 3 is a claim in an approved sheet with no manifest field behind it. refGrammar.gap4_oneShape names exactly this case.",
        "computedFrom": "sum of source amount over areaOrdinal '1', per player, run-1 sessions",
        "population": "run-1 sessions that reached area completion",
        "alarm": { "alarmKind": "one-sided", "rule": "realised sum below the lower bound of that claim's band", "status": "invariant", "reason": "solvency.areaLedger[0].rungsBought is above zero, so a player buys during area 1 and realised income is at or above the level-0 prediction. The reading can only refute from below, and saying so is what keeps it honest." }
      },
      {
        "id": "solvencyRatio",
        "refutes": { "kind": "manifestField", "path": "solvency.ladderTotal", "alsoReads": ["solvency.areaLedger[6].cumulativeIncome"], "sheet": "cid/gameplay/balance/03-ladder-solvency.md", "claim": "solvency.tests.S1 — ladderTotal > areaLedger[6].cumulativeIncome" },
        "computedFrom": "per player who has completed area 7: sum of source amount over areaOrdinal '1'..'7'; the ratio is solvency.ladderTotal divided by that sum",
        "population": "players who completed area 7, base and purchaser reported separately",
        "highestValue": true,
        "alarm": [
          { "alarmKind": "invariant", "rule": "realised ratio <= 1.0", "status": "invariant", "reason": "this is the wave-4 insolvency failure recurring live: the ladder bought out before the last area. meta/04 states the requirement and nothing in production has ever checked it." },
          { "alarmKind": "relative", "rule": "realised cumulative income outside tolerance of solvency.areaLedger[6].cumulativeIncome", "tolerance": 0.15, "status": "playtest unknown", "testRange": [0.10, 0.30] }
        ],
        "whyAPointerAndNotANumber": "solvency.areaLedger[6].cumulativeIncome moved three times in about a week — round 1, round 2 and the current disk value — each state correct when written. A copied figure would have gone stale with no sheet being wrong and no check firing. The tolerance above is relative to the field, so it survives all three."
      },
      {
        "id": "rungsBoughtPerArea",
        "refutes": { "kind": "manifestField", "path": "solvency.areaLedger[*].rungsBought", "sheet": "cid/gameplay/balance/03-ladder-solvency.md", "claim": "solvency.tests.S5 — every areaLedger[].rungsBought >= 4" },
        "computedFrom": "count of sink events grouped by areaOrdinal, per player",
        "population": "players who completed that area",
        "alarm": [
          { "alarmKind": "invariant", "rule": "median rungs bought at any areaOrdinal < 4", "status": "invariant", "reason": "tests.S5 states the >= 4 invariant and pacing.aboveTickGapCarriedBy makes purchase cadence, not reveal spacing, the thing carrying core-loop/01's 90-second rule. The endless bay sits AT the floor on disk, so this alarm has no slack there." },
          { "alarmKind": "absolute", "rule": "median differs from solvency.areaLedger[k].rungsBought by more than tolerance rungs", "tolerance": 1, "status": "playtest unknown", "testRange": [1, 3] }
        ]
      },
      {
        "id": "ladderFractionAtArea8Complete",
        "refutes": { "kind": "manifestField", "path": "solvency.ladderBoughtAtCollectionComplete", "alsoReads": ["solvency.ladderTotal"], "sheet": "cid/gameplay/balance/03-ladder-solvency.md" },
        "computedFrom": "cumulative sink amount at the last sink event tagged areaOrdinal '8', divided by solvency.ladderTotal",
        "isProxy": true,
        "proxyNote": "the exact reading is taken at 24 of 24, which LogEconomyEvent cannot see. pacing.milestones[collectionComplete] falls inside area 8 and area8Complete is later, so this proxy bounds the true fraction from above.",
        "population": "players who completed area 8",
        "alarm": [
          { "alarmKind": "invariant", "rule": "proxy fraction >= 1.0", "status": "invariant", "reason": "the ladder is exhausted before the collection finishes, which is the failure meta/04 named and balance/03 was written to close" },
          { "alarmKind": "absolute", "rule": "proxy differs from solvency.ladderBoughtAtCollectionComplete by more than tolerance", "tolerance": 0.10, "status": "playtest unknown", "testRange": [0.05, 0.20] }
        ],
        "consumes": "telemetry.events[set_completed], which verification found orphaned. This reading is its consumer for the exact, non-proxy form."
      },
      {
        "id": "areaOrdinalAtLadderExhaustion",
        "refutes": { "kind": "manifestField", "path": "solvency.ladderExhaustedAfter", "sheet": "cid/gameplay/balance/03-ladder-solvency.md" },
        "computedFrom": "the areaOrdinal on the sink event after which cumulative sink amount equals solvency.ladderTotal",
        "unit": "area ordinals and post-terminal bays, never seconds",
        "unitReason": "the wall-clock form refutes pacing.milestones[ladderExhausted] and needs a session clock and a session id, neither of which exists in game/src. That conversion is lapClock and engagement work's with pacing, not mine.",
        "population": "players who exhausted the ladder",
        "alarm": [
          { "alarmKind": "invariant", "rule": "exhaustion at an areaOrdinal of 8 or lower", "status": "invariant", "reason": "the ladder must outlast the specced game; exhaustion inside it is the shipped ladder's original defect" },
          { "alarmKind": "absolute", "rule": "exhaustion more than tolerance bays away from solvency.ladderExhaustedAfter", "tolerance": 2, "unit": "post-terminal bays", "status": "playtest unknown", "testRange": [1, 4] }
        ]
      },
      {
        "id": "unspentBalanceShare",
        "refutes": { "kind": "manifestField", "path": "economy.atMaxLadder.incomeContinues", "alsoReads": ["economy.sinks[0].onInsufficientFunds"], "sheet": "cid/gameplay/systems/04-earning-and-spending.md", "claim": "the sink is reachable at all, so a player who can spend does spend before ladder exhaustion" },
        "computedFrom": "the share of source events whose endingBalance is at or above the cheapest next rung's cost, restricted to areaOrdinal '1'..'8'",
        "population": "all sessions in a published place",
        "alarm": { "alarmKind": "share", "rule": "share above threshold while areaOrdinal <= 8", "threshold": 0.25, "status": "playtest unknown", "testRange": [0.10, 0.50], "reason": "before exhaustion a player who can spend does spend, so a persistently affordable unspent balance means either the ladder ran out early or the purchase control is unreachable. The 2026-08-01 playtest shipped a purchase control rendered over the play area and nothing in the game could have reported it." },
        "routesTo": "purchase-surface and HUD work if the ladder is not exhausted; solvency if it is"
      },
      {
        "id": "duplicateReveal",
        "refutes": { "kind": "manifestField", "path": "discovery.repeat.possible", "sheet": "cid/gameplay/systems/05-the-find-ledger.md" },
        "definedBy": "cid/analytics/economy/02-duplicate-and-defect-volume.md",
        "expected": 0,
        "alarm": { "alarmKind": "correctness", "rule": "count >= 1", "status": "invariant" }
      },
      {
        "id": "unknownTierClear",
        "refutes": { "kind": "manifestField", "path": "tiers[*].value", "alsoReads": ["economy.payoutFloor"], "sheet": "cid/gameplay/systems/01-overgrowth-tiers.md", "claim": "every cleared patch's tierIndex resolves to a tiers[] row, so no clear pays economy.payoutFloor by fallback" },
        "definedBy": "cid/analytics/economy/02-duplicate-and-defect-volume.md",
        "expected": 0,
        "alarm": { "alarmKind": "correctness", "rule": "count >= 1", "status": "invariant" }
      }
    ]
  }
}
```

## Consequences for other work

- **`cid/analytics/_category.md` is edited, not requested.** The ×3.26 line at the Economy Health
  assignment, its restatement in §B, and the stale `1,459 s` and `42%` figures in the same sentence
  are replaced by field paths, with a dated correction note naming this sheet and RR-5. I raised
  it, nobody owns the file, and it survived two rounds as a request. **`722` at the same
  assignment is the same defect class and I replaced it with
  `tierMix.incomePerAreaAtLevelZero[0].currency`; I touched nothing else in that file.**
- **Logging-pipeline work** inherits three call sites and one accumulator, stated as a requirement
  and not designed here: a per-character `{patches, currency}` accumulator in `Clearing`, never
  persisted and never sent to a client, flushed at `batchPatchCount`, at the `areasFinished`
  increment, at a `value`-level change and at `onLeave`; and one `Sink` call in
  `init.server.luau onPurchase` at the `UpgradeApplied` site. **`readableToday` is `false` for
  every row above.**
- **Emission-budget and event-catalog work**: the patch-clear cadence is
  `economyHealth.flows[patch-clear].batchPatchCount` with its flush list, and `batchRule` points at
  `telemetry.budget.perServerRequestsPerMinute` rather than carrying a denominator. **If that field
  moves, `reDerivation` fires and this sheet does not change.**
- **KPI work** gets its migration done: `refShape: 1`, every `refutes` in the `ref` shape, both
  prose citations as `kind: "briefLine"`, and the `kind` collision removed from my alarms by
  renaming the field. **If the grammar's spelling differs from what I emitted, mine changes** —
  `kpis` is normative and I am not proposing a second.
- **Balance and Tuning** is asked for nothing. Every prediction is named by path.
- **Purchase-surface and HUD work** gains the reading that catches an unreachable buy control.

## Acceptance criteria

1. `economyHealth.refShape` is `1`; every `readings[].refutes` is a `ref` object whose `kind` is
   one of `manifestField` / `commandOutput` / `briefLine`, with `path` non-null iff
   `kind == "manifestField"`; and **no `refutes` carries `key`, `field` or `value`**.
2. **No object anywhere in `economyHealth` other than a `refutes` or an `alsoReads` entry has a
   field named `kind`** — every alarm uses `alarmKind`.
3. `economyHealth.flows[patch-clear]` carries both a `batchRule` (lower) and a `samplingBound`
   (upper), a `reDerivation` with `trigger`, `step1`, `step2` and `step3`, and **no numeric
   requests-per-minute allowance**; and `batchPatchCount` is a multiple of 32 inside
   `batchPatchCountTestRange`.
4. `economyHealth` contains **no key whose value is a filename or a sentence promising rows**:
   `dormant`, `structurallyAbsent` and `forbidden` arrive from sheet `03`'s `amends` block.

## Not decided here

Event names, payload field names, the naming convention, sampling and every `LogCustomEvent`
payload — event-catalog work, which holds `telemetry`. The total emission budget, what happens to a
throttled event, and the transport — emission-budget and logging-pipeline work. Every pass mark,
target and verdict, **and the `refGrammar` spelling I am consuming** — KPI work, which holds
`kpis`. Session length, laps per session and every wall-clock conversion of my exhaustion reading —
engagement and `lapClock` work. The duplicate and unknown-tier counters — sheet `02`. The
`dormant`, `structurallyAbsent` and `forbidden` rows — sheet `03`. Any cost, growth rate, weight
vector, patch count or lap figure — Balance and Tuning; I name paths and set none. Server authority
and anti-cheat readings — security work. Whether `economyHealth` is promoted, and whether
`telemetry.events[]` moves to the technical contract — whoever maintains `bridge/schema.mjs`.
