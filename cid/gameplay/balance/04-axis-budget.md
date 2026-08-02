# 04 — The axis budget

**Domain:** Balance & Tuning · **Category:** Gameplay · **Wave:** 4

## Decision

**All four set factors stay at 1.20 and `Span` stays at 1.75 — the shipped figures are correct
and the bounds that said otherwise were wrong.** `depths.areas[2].maxRadiusProduct` of 1.27 is
stale: it was derived while the offer ladder still sold two `value` passes, and a `radius` pass
cannot advance a purchase order because income here is per patch, not per second. The bound is
one **joint** term, `tauMultiplier ≤ footprint × ROUTE_SLACK / (τ_ladder × 75)`, counting set and
product factors together, held in **one place** — this key — and referenced by `depths` and
`products` rather than copied into them.

## Why

- **Contradiction 1, resolved by finding the error rather than splitting the difference, and
  corroborated by the sheet that owns the product.** Reproducing `meta/04`'s row 2 shows it
  assumed a purchaser **arrives with 3.00× throughput** where a free player has 1.92× — a gap
  only a `value` pass can open, and `monetization/01` **withdrew both value passes**. Every
  player clears the same patch count for the same currency, so a `Span` owner reaches every area
  holding exactly the free player's levels. `monetization/01` already states this outright — "the
  ordinal-2 bound is 1.99 with no value pass owned and 1.27 with both" — and
  `products.headroom.H2.valueFactorWarning` states it again, so **the merged contract has carried
  two disjoint answers for one quantity since wave 3.** Not a new finding: a live contradiction
  between two merged keys, which this sheet resolves in favour of the one whose premise holds.
- **Contradiction 2, resolved by making the bound joint across sources as well as axes.**
  `maxRadiusProduct` counted `products[].factor` alone while `setBonus` puts ×1.20 on `radius`
  twice. `monetization/03` had the axis half (`τ = 2 · r · v`, so a factor on either multiplies τ
  identically); the source half was open. One term, `tauMultiplier(k)`, counts **every factor on
  `radius` or `speed` from any source outside the upgrade ladder**; `τ_ladder(k)` counts only
  `upgradeEffect`. Nothing is counted twice and nothing is forgotten.
- **Contradiction 3, and its twin nobody had named.** `modifiers.axes[radius].ceilingRule` reads
  `area.size / 2`, and `area` holds area 1 only. It should read **`plots.laneWidthStuds / 2`** —
  same value, correct referent. The `speed` rule beside it reads `effective × serverTickSeconds`,
  and **`serverTickSeconds` is not a key that exists**: the emitted name is
  `runtime.clearTickRate` `[research: bridge/emit-config.mjs]`. `products.headroom` carries the
  same wrong name. Both are requested below.
- **The bound has one home, not three.** The joint lap bound currently lives in
  `products.headroom.H2` (2.18/1.99/2.14/2.17/2.10×4) and would live again in `depths`. A second
  copy is what let 1.27 and 1.99 coexist for a wave. **`axisBudget.jointLapBound.rows` is the
  sole home**; `depths.invariants[11]` and `products.headroom.H2` both become references to it.
- **The allocation itself: `radius` carries three claimants, `speed` one, `value` one, and that
  is `meta/03`'s distribution.** At sheet `03`'s ladder the radius axis sits at
  20.5 × 1.20 × 1.20 × 1.75 = **51.66 studs against a 54-stud bound**, 95.7% spent. That is the
  intended shape, and the one lever if it must move is `products.items[span].factor` down to
  1.60, which lands it at 87.4%.
- **The set-factor test range was inherited illegal and is split per axis.** `meta/03`'s
  [1.10, 1.35] was legal against a 14.3-stud ladder. At 20.5 studs two radius factors at 1.35
  give `20.5 × 1.8225 × 1.75` = **65.4 against 54**; the largest legal symmetric pair is **1.22**
  (`sqrt(54 / (20.5 × 1.75))`). On `speed`, 1.35 gives 43.2 against a 41.25 bound at the merged
  tick, so its top is **1.28** (`41.25 / 32.0`). Only `value`, which has no ceiling, keeps 1.35.
- **Every ceiling is published at the merged `clearTickRate` 0.12, not at the 0.04 sheet `03`
  requests.** `speed`'s ceiling is 45.83 and its bound 41.25, and the axis is **93.1% spent** —
  legal, and the reason the tick request is not only about patch counts. The 0.04 figures sit in
  `ceilingsAreEvaluatedAt` as a conditional, because a proposed CID key may not rest its primary
  value on a technical figure the technical contract has not adopted.
- **I am not spending the headroom the tick change would free.** At 0.04 the speed bound becomes
  123.75 and the axis drops to 31% spent; raising `speed.maxLevel` to use it re-inflates every
  footprint, which is the loop sheet `03` just closed.
- **The 9.625-stud spawn case is closed, not deferred.** A player owning `Span` sweeps 9.625
  studs on the first armed tick rather than 5.5. At depth-1 density that disc holds **2.83
  patches against 0.92**. `firstFindOrdinal` is 1, the nearest patch, at most 3.5 studs away and
  therefore inside both discs, so the guaranteed first Find still lands on the first clear. **No
  revision to `firstSession` is owed for the disc.** The purchaser case that *is* open is
  first-purchase timing, and sheet `05` settles it.
- **Price to value, for the record.** 499 R$ buys ×1.75 on one axis: **665 R$ per 1.0 of added
  factor**, against the reference's 2,500-Robux oversized tool
  `[research: cid/gameplay/balance/_lead.md]`. `monetization/01` kept `priceRobux` with a stated
  argument and a 349–999 no-revision band; I accept the containment and set no price.
- `[playtest unknown]` **All five factors.** Set factors 1.20 each; test ranges radius
  [1.10, 1.22], speed [1.10, 1.28], value [1.10, 1.35]. `Span` 1.75, test range **[1.40, 1.82]**
  — the upper bound is the radius ceiling, not the lap floor, and it is not at area 2.

| axis | ceiling rule | ceiling | 0.9 bound | ladder max | set factors | product | effective | spent |
|---|---|---|---|---|---|---|---|---|
| `value` | none | — | — | ×4.0 | terrace 1.20 | — | ×4.80 | n/a |
| `radius` | `plots.laneWidthStuds / 2` | 60.00 | 54.00 | 20.5 studs | cistern 1.20, spire 1.20 | span 1.75 | 51.66 studs | **95.7%** |
| `speed` | `movement.baseClearRadius / runtime.clearTickRate` | 45.83 | 41.25 | 32.0 studs/s | vault 1.20 | — | 38.40 studs/s | **93.1%** |

At `clearTickRate` 0.04 the speed ceiling becomes 137.50, its bound 123.75, and the axis 31.0%
spent. Nothing else in the table moves.

## The joint lap bound, evaluated everywhere

`τ_ladder(k) = 2 × upgradeEffect(radius, L_r) × upgradeEffect(speed, L_s)` at arrival.
`tauMultiplier(k)` = the product of every factor on `radius` or `speed`, from **any** source
outside the ladder, held at row `k`. Bound: `tauMultiplier(k) ≤ footprint(k) × 2 / (τ_ladder(k) × 75)`.

| # | τ_ladder | sets on r or v | with `Span` | max allowed | lap at max spend | margin |
|---|---|---|---|---|---|---|
| 1 | 176.0 | 1.000 | 1.75 | 2.18 | 93.5 s | 24.7% |
| 2 | 235.2 | 1.000 | 1.75 | **2.04** | 87.5 s | 16.7% |
| 3 | 326.4 | 1.000 | 1.75 | 2.06 | 88.2 s | 17.6% |
| 4 | 447.2 | 1.000 | 1.75 | 2.15 | 92.0 s | 22.7% |
| 5 | 548.8 | 1.200 | 2.10 | 2.62 | 93.7 s | 24.9% |
| 6 | 682.0 | 1.200 | 2.10 | 2.53 | 90.5 s | 20.7% |
| 7 | 805.2 | 1.440 | 2.52 | 3.10 | 92.3 s | 23.1% |
| 8 | 938.0 | 1.440 | 2.52 | 3.07 | 91.4 s | 21.9% |
| bay | 1312.0 | 1.728 | **3.024** | **3.22** | 79.8 s | **6.5%** |

The binding row is the endless bay at a maxed ladder with all four sets and the product, not
area 2. Every specced area clears the floor by at least 16.7%.

```manifest
{
  "provides": "axisBudget",
  "status": "proposed",
  "value": {
    "soleHomeOfTheJointBound": "depths.invariants[11] and products.headroom.H2 must reference jointLapBound.rows rather than carry their own copies; two homes is how 1.27 and 1.99 coexisted for a wave",
    "axes": [
      { "id": "value",  "ceilingRule": null,                                              "ceiling": null,  "boundFraction": 0.9, "bound": null,  "ladderMax": 4.0,  "ladderSpanFromBase": 4.0,   "setFactors": [{ "setId": "terrace", "factor": 1.20 }],                                        "productFactors": [],                                        "effective": 4.80,  "fractionOfBound": null,  "setFactorTestRange": [1.10, 1.35] },
      { "id": "radius", "ceilingRule": "plots.laneWidthStuds / 2",                         "ceiling": 60.00, "boundFraction": 0.9, "bound": 54.00, "ladderMax": 20.5, "ladderSpanFromBase": 3.727, "setFactors": [{ "setId": "cistern", "factor": 1.20 }, { "setId": "spire", "factor": 1.20 }], "productFactors": [{ "productId": "span", "factor": 1.75 }], "effective": 51.66, "fractionOfBound": 0.957, "setFactorTestRange": [1.10, 1.22], "setFactorTopReason": "sqrt(54 / (20.5 * 1.75)) = 1.2269; two radius set factors at meta/03's inherited 1.35 give 65.4 against a bound of 54" },
      { "id": "speed",  "ceilingRule": "movement.baseClearRadius / runtime.clearTickRate", "ceiling": 45.83, "boundFraction": 0.9, "bound": 41.25, "ladderMax": 32.0, "ladderSpanFromBase": 2.0,   "setFactors": [{ "setId": "vault", "factor": 1.20 }],                                          "productFactors": [],                                        "effective": 38.40, "fractionOfBound": 0.931, "setFactorTestRange": [1.10, 1.28], "setFactorTopReason": "41.25 / 32.0 at the merged clearTickRate 0.12; widens to 1.35 only if 0.04 lands" }
    ],
    "ceilingsAreEvaluatedAt": {
      "runtime.clearTickRate": 0.12,
      "reason": "the merged, adopted value. A proposed CID key may not rest its primary figure on a technical value the technical contract has not accepted.",
      "conditionalAt004": { "speedCeiling": 137.50, "speedBound": 123.75, "speedFractionOfBound": 0.310, "speedSetFactorTestRange": [1.10, 1.35], "headroomIsNotSpent": "speed.maxLevel is not raised to use it; that re-inflates every footprint" }
    },
    "factorStatus": "playtest unknown",
    "productFactorTestRange": { "span": [1.40, 1.82], "upperBoundReason": "the radius ceiling, 54 / (20.5 * 1.20 * 1.20). It is NOT the lap floor and it is NOT at area ordinal 2; the shipped factorStatus says both and both are wrong." },
    "jointLapBound": {
      "tauLadder": "2 * upgradeEffect(radius, arrivalLevel) * upgradeEffect(speed, arrivalLevel)",
      "tauMultiplier": "the product of every factor applied to radius or speed, from every source outside the upgrade ladder, held at that row",
      "rule": "tauMultiplier(k) <= footprintStuds2(k) * pacing.routeSlack / (tauLadder(k) * pacing.lapFloorSeconds)",
      "jointAcross": ["radius", "speed", "set-completion", "purchase"],
      "evaluatedAt": "every depths.areas[] ordinal and the post-terminal bay",
      "rows": [
        { "ordinal": 1,     "tauLadder": 176.0,  "setMultiplier": 1.000, "withProduct": 1.750, "maxAllowed": 2.18, "lapAtMaxSpend": 93.5, "margin": 0.247 },
        { "ordinal": 2,     "tauLadder": 235.2,  "setMultiplier": 1.000, "withProduct": 1.750, "maxAllowed": 2.04, "lapAtMaxSpend": 87.5, "margin": 0.167 },
        { "ordinal": 3,     "tauLadder": 326.4,  "setMultiplier": 1.000, "withProduct": 1.750, "maxAllowed": 2.06, "lapAtMaxSpend": 88.2, "margin": 0.176 },
        { "ordinal": 4,     "tauLadder": 447.2,  "setMultiplier": 1.000, "withProduct": 1.750, "maxAllowed": 2.15, "lapAtMaxSpend": 92.0, "margin": 0.227 },
        { "ordinal": 5,     "tauLadder": 548.8,  "setMultiplier": 1.200, "withProduct": 2.100, "maxAllowed": 2.62, "lapAtMaxSpend": 93.7, "margin": 0.249 },
        { "ordinal": 6,     "tauLadder": 682.0,  "setMultiplier": 1.200, "withProduct": 2.100, "maxAllowed": 2.53, "lapAtMaxSpend": 90.5, "margin": 0.207 },
        { "ordinal": 7,     "tauLadder": 805.2,  "setMultiplier": 1.440, "withProduct": 2.520, "maxAllowed": 3.10, "lapAtMaxSpend": 92.3, "margin": 0.231 },
        { "ordinal": 8,     "tauLadder": 938.0,  "setMultiplier": 1.440, "withProduct": 2.520, "maxAllowed": 3.07, "lapAtMaxSpend": 91.4, "margin": 0.219 },
        { "ordinal": "bay", "tauLadder": 1312.0, "setMultiplier": 1.728, "withProduct": 3.024, "maxAllowed": 3.22, "lapAtMaxSpend": 79.8, "margin": 0.065 }
      ],
      "bindingRow": "bay",
      "staleBoundCorrected": "depths.areas[2].maxRadiusProduct 1.27 assumed a purchaser arriving at 3.00x throughput where a free player arrives at 1.92x. Only a value pass can open that gap and monetization/01 withdrew both, and that sheet already states the 1.99-versus-1.27 pair outright."
    },
    "setBonusHeadroomRequested": {
      "radius": { "availableToSets": 1.505, "spentAtStartingFactors": 1.44, "derivation": "0.9 * 60 / 20.5 / 1.75" },
      "speed":  { "availableToSets": 1.289, "spentAtStartingFactors": 1.20, "derivation": "0.9 * 45.83 / 32.0 at the merged clearTickRate 0.12", "conditionalAt004": 3.867 },
      "value":  { "availableToSets": null,  "spentAtStartingFactors": 1.20, "derivation": "no ceiling exists on this axis" }
    },
    "spawnCase": {
      "purchaserEffectiveClearRadiusStuds": 9.625,
      "derivation": "movement.baseClearRadius 5.5 * products.items[span].factor 1.75; no set held and no level bought at spawn",
      "firstArmedTickPatches": { "purchaser": 2.83, "base": 0.92, "formula": "pi * r^2 * 35 patches per 3600 stud chunk at depth 1" },
      "firstFindStillGuaranteed": true,
      "reason": "firstSession.placement.firstFindOrdinal is 1, the patch nearest spawn, at most 3.5 studs away and therefore inside both discs",
      "revisionsToFirstSessionForTheDisc": 0,
      "openPurchaserCase": "first-purchase timing, settled in sheet 05",
      "handedTo": "audio and response work: the reveal may coincide with up to three clears rather than one, inside core-loop/02's 0.35 s onset separation"
    },
    "priceToValue": { "productId": "span", "priceRobux": 499, "factorAboveOne": 0.75, "robuxPerUnitFactor": 665, "referencePoint": "the reference's 2,500 R$ oversized tool", "priceSetBy": "gameplay/monetization/01; this sheet sets no price" },
    "invariants": [
      "for each axis, ladderMax * product(setFactors) * product(productFactors) <= boundFraction * ceiling, where ceiling is null for value",
      "every setFactors[].factor lies inside that axis's setFactorTestRange",
      "every setFactors[].setId is a collection.sets[].id and appears exactly once across all axes",
      "every axes[].id is an upgrades[].id and a modifiers.axes[].id",
      "for every jointLapBound.rows[] entry, withProduct <= maxAllowed",
      "no other key carries a per-ordinal throughput-factor table"
    ]
  }
}
```

## Revision requests

| key / file | field | current | requested | why |
|---|---|---|---|---|
| `modifiers` (`systems/06`) | `axes[radius].ceilingRule` | `effective < area.size / 2` | `effective < plots.laneWidthStuds / 2` | `area` holds area 1 only; areas 2 to 8 carry `footprintStuds2` and no `size`. Same value, correct referent |
| `modifiers` | `axes[speed].ceilingRule` | `effective * serverTickSeconds <= movement.baseClearRadius` | `effective * runtime.clearTickRate <= movement.baseClearRadius` | `serverTickSeconds` is not a key in either contract; `clearTickRate` is the emitted name |
| `depths` (`meta/04`) | `areas[].maxRadiusProduct` | 1.27 / 1.44 / 1.84 / 2.10 | **delete the field**; `invariants[11]` reads `axisBudget.jointLapBound.rows[k]` | it counts products and forgets sets, its row-2 figure assumed withdrawn value passes, and a second copy is the defect |
| `depths` | `invariants[11]` | "the product of every `products[].factor` on the radius axis is at most `maxRadiusProduct`" | "`tauMultiplier(k) <= axisBudget.jointLapBound.rows[k].maxAllowed` for every row and for the post-terminal bay" | see `## Pushing back` |
| `depths` | `purchaserFloorRule` | radius-product wording | the `jointLapBound.rule` string above | must be joint across sources as well as axes |
| `products` (`monetization/01`) | `items[span].factorTestRange` | [1.40, 1.95] | **[1.40, 1.82]** | 1.82 is `0.9 × 60 / (20.5 × 1.44)`, the radius ceiling |
| `products` | `items[span].factorStatus` | "1.95 is the hard lap-floor limit at area ordinal 2" | "1.82 is the hard radius-ceiling limit; the lap floor binds at the post-terminal bay, at 6.5% of margin, not at any area" | both claims in the current string are false |
| `products.headroom` (`monetization/03`) | `H2.maxThroughputProductFactorByOrdinal` | 2.18 / 1.99 / 2.14 / 2.17 / 2.10 ×4 | **delete**; `H2` references `axisBudget.jointLapBound.rows` | this is the second home of one bound and the source of the 1.99-versus-1.27 split |
| `products.headroom` | `H1_axisCeiling.atShippedValues` | "14.3 × 1.44 × 1.75 = 36.0 … 25.6 × 1.2 = 30.7 ≤ 0.9 × 45.83" | "20.5 × 1.44 × 1.75 = 51.66 ≤ 54.00; 32.0 × 1.20 = 38.40 ≤ 41.25" | every figure is a shipped-ladder value and the ladder has changed |
| `products.headroom` | `H1_axisCeiling.ceilings.speed` | `movement.baseClearRadius / runtime.serverTickSeconds` | `movement.baseClearRadius / runtime.clearTickRate` | same nonexistent key as above |
| `products.headroom` | `H2.valueFactorWarning` | states the 1.99 / 1.27 pair as a live caution | restate as resolved: no value pass exists, so the free-player and purchaser arrival tables are identical and the 1.27 branch is dead | the caution was correct and is now discharged |
| `monetization/03` | its two printed tables and acceptance criteria 1 and 2 | 14.3 / 25.6 / 45.83 / 36.0 / 30.7 and laps 93.5 / 85.2 / 91.8 / 93.0 / 89.9×4 | the ceiling table and the nine `lapAtMaxSpend` figures above | every printed figure is false after this sheet |
| `setBonus` (`meta/03`) | `axisHeadroom` | radius 2.158, speed 1.611 | radius **1.505**, speed **1.289** (3.867 at `clearTickRate` 0.04), value null | derived from the shipped `upgrades`, which sheet `03` replaces. `rows[].factor` stays 1.20 on all four rows: **no factor changes** |
| `setBonus` | `factorTestRange` | [1.10, 1.35], one field for all four rows | **per axis**: radius [1.10, 1.22], speed [1.10, 1.28], value [1.10, 1.35] | at 20.5 studs two radius factors at 1.35 reach 65.4 against 54, and speed at 1.35 reaches 43.2 against 41.25 |
| `setBonus` | acceptance criterion 2 | hardcodes 2.158 and 1.611 | 1.505 and 1.289 | same |

## Pushing back

**`gameplay/meta/04-the-depth-ladder`, two rulings.**

**(a) Its routing: "there is no footprint that satisfies both and the residue routes to
`monetization/03` `H4`, 'reduce `products[].factor`', not to me."** That routing rests on row 2's
1.27 bound, and 1.27 is an artefact of a purchaser arrival table computed with two `value` passes
that `monetization/01` withdrew in the same wave. With them gone, row 2's true bound is 2.04 and
`Span` at 1.75 breaches nothing at any ordinal. **`H4` is not owed and no `products[].factor`
moves.** The residue does not route to Monetization or back to Meta; it dissolves.

**(b) Its `invariants[11]` and `purchaserFloorRule`, which are acceptance tests rather than
values it ceded.** I rewrite both, because as written they are unsound in a way no value change
fixes: a bound defined over `products[].factor` alone cannot see the two ×1.20 factors `setBonus`
puts on `radius`, and `τ = 2 · r · v` makes a speed factor and a radius factor interchangeable.
**The rewrite makes the test stricter, not looser** — it adds two sources and one axis to what is
counted — and it moves the table out of `depths` so one bound has one home.

**What is not reopened:** the eight-area ladder, the four depths, the two-areas-per-depth
partition, the `previousAreaComplete` unlock rule, the per-area sizing formula, and every
`depths` field sheet `03` does not name.

## Consequences for other work

- **Offer-ladder work (`products`)** keeps `Span` at 1.75 and 499 R$ unchanged, and gets its
  breach withdrawn. What it inherits instead is a corrected upper bound of 1.82 and a corrected
  reason for it.
- **Purchase-headroom work (`monetization/03`)** loses its per-ordinal table to this key and
  keeps `H1` and `H2` as rules that reference it. That is the whole of the third-home problem,
  closed by deletion rather than by reconciliation.
- **Set-bonus work (`setBonus`)** keeps all four factors at 1.20, gets its headroom figures
  recomputed, and gains a per-axis test range because one range cannot serve an axis carrying two
  factors and an axis carrying one.
- **Onboarding work (`firstSession`)** owes nothing *for the disc*. The first-purchase timing
  question is sheet `05`'s and is settled there.
- **Held-tool work (`tool`)** still owes a ruling nobody has made: `T11` drives head width from
  Reach *level*, and `products` criterion 4 fails a build where the pass does not widen it. I set
  the factor; whether it has a visible deliverable is that sheet's.
- **Modifier-resolution work (`modifiers`)** gets two corrected rules and one new consumer: the
  lap check is evaluated against `effective(axis)`, not a second derivation.
- **UI/UX** inherits a radius readout reaching 51.66 studs in a 120-stud lane — 86% of the lane
  width at full spend. Whether that still reads as "a wider sweep" rather than "the whole lane"
  is a legibility question I raise and do not answer.

## Acceptance criteria

1. For each axis, `ladderMax × Π setFactors × Π productFactors ≤ 0.9 × ceiling` at the merged
   `clearTickRate` 0.12: radius 51.66 ≤ 54.00, speed 38.40 ≤ 41.25, and `value` has no ceiling.
2. For all nine rows of `jointLapBound.rows`, `withProduct ≤ maxAllowed`; the minimum margin is
   0.065 at the post-terminal bay and the minimum among the eight areas is 0.167 at ordinal 2.
3. Every set factor lies inside its own axis's `setFactorTestRange`, and the range tops are
   reachable: `20.5 × 1.22² × 1.75 = 53.4 ≤ 54.00` and `32.0 × 1.28 = 40.96 ≤ 41.25`.
4. Exactly one key in the merged manifest carries a per-ordinal throughput-factor table, and it
   is `axisBudget`: `depths` has no `maxRadiusProduct` field and `products.headroom.H2` has no
   `maxThroughputProductFactorByOrdinal` field.

## Not decided here

What a patch pays (sheet `02`). Every cost, rung count and footprint (sheet `03`). Every
wall-clock figure, including `ROUTE_SLACK`, the 75-second floor this bound reads, the margin
targets that size the endless bay, and the first-purchase beat range (sheet `05`). Which axis
each set targets (`gameplay/meta/03`). Which products exist and what they cost in Robux
(`gameplay/monetization/01`). The clearing tick's final value (architecture; sheet `03` offers
two routes). Whether the tool head width reads effective radius (`gameplay/mechanics/04`). How a
modifier reaches a client (architecture).
