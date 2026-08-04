# 03 — Ladder solvency

**Domain:** Balance & Tuning · **Category:** Gameplay · **Wave:** 4

## Decision

**Twenty levels per axis at a common cost growth of 1.32, costBases 95 / 100 / 130 — a
260,898-currency ladder against 70,017 of clearing income across areas 1 to 7.** The shipped
24-rung, 11,644-currency ladder is replaced, not re-priced: it fails `meta/04` by 3.3×, and
`core-loop/05` already named "`maxLevel` rising so the ladder outlasts the collection" as the
fix. Issued as a revision request against `01-upgrade-ladder.md`; this sheet carries no second
`upgrades` block. **The `clearTickRate` request is withdrawn** — see below.

## Why

- **The requirement is `meta/04`'s, stated with no figure: `sum(upgradeCost(u, l))` must exceed
  the cumulative clearing income of areas 1 to 7.** At shipped values that is 11,644 against
  about 38,300, so the ladder is spent during area 4 of 8 and `core-loop/05`'s
  `arrivalDeepest < sweptCap` fails. At the values below it is **260,898 against 70,017**, and
  the ladder is 39% bought when the collection finishes.
- **Every figure is the floored sum, not the geometric one.** `upgradeCost(u, l) =
  floor(costBase × costGrowth^l)` `[research: bridge/emit-config.mjs]`, so the per-axis totals
  are 76,263 / 80,275 / 104,360 — each 12 to 15 below the closed-form sum.
- **Income in this game compounds, which is why the growth rate is 1.32 rather than the shipped
  1.6–1.8.** `radius` and `speed` raise patches per second, `value` raises currency per patch,
  and `depths` sizes each area from arrival throughput. The ledger's realised income ratio is
  **1.79 per area** (909 → 28,992 over six steps) at **6.3 rungs bought per area**, so the merged
  per-purchase growth is `1.79^(1/6.3)` = **1.097** and the per-axis growth is its cube,
  **1.320**. This is the exponential-cost-against-growing-income shape the idle-game literature
  describes, so its 1.07–1.15 band is evidence about the *merged* sequence here and not only
  about hundred-rung ladders `[research: cid/gameplay/balance/_lead.md]`.
- **The rung count is set by the ceilings, not by taste.** `radius` may reach 20.5 studs before
  two set factors and one product factor breach `0.9 × ceiling` (sheet `04`); `speed` is set at
  32.0 because the τ span it produces, 7.46×, is what eight flat-lap areas can absorb.
- **`value.costBase` is 95, not 75, and the reason is onboarding.** At 75 the first purchase
  lands at 9.7 s for a `Span` owner — **before `firstSession.ceilings.secondsToFirstReveal`**. At
  95 it is 12.3 s. The rest of that question is settled in sheet `05`, which pushes back on the
  beat's own [40, 120] range rather than paying for it here.
- **No purchase desert opens, and the ladder is load-bearing for that.** A rung lands every 18.6
  to 30.5 seconds inside the eight areas (**5 to 7 rungs per area**, level deltas
  6/7/7/7/7/6/5/5 summing to 50, which is the bay's arrival total) and every 42.0 s in an endless
  bay. Reveals alone do **not** carry `core-loop/01`'s 90-second ceiling: with one Find per
  contiguous third of an area, two consecutive reveals can sit 101.5 s apart at area 7. Purchases
  fill it, so a later change to this cost curve can reopen a cadence rule — which is why
  `rungsBought >= 4` is a test of this key and not a note. **The first draft of this sheet
  published deltas of 6/6/7/6/6/6/6/5, which contradicted its own `arrivalLevels`; the levels
  were right and the deltas were wrong.**
- **All three halves of a binding line are now true in numbers.** "Deeper areas are larger,
  denser, and hide rarer sets" `[brief: binding]` ← `[you chose: R3 Q2]` (`03-META.md`).
  Footprint is strictly increasing at all eight rows (14,400 → 100,800); density still strictly
  rises at each depth step; sheet `02` supplies "rarer".
- `[playtest unknown]` **Every figure in the table.** Test ranges: `costGrowth` 1.24 to 1.40;
  `maxLevel` 16 to 24 on all three axes together; `costBase` ratios held near 1 : 1.05 : 1.37 so
  the three axes interleave rather than clumping.
- `[research owed: an upgrade price table for place 133086043677134, or an in-client capture of
  its upgrade panel]` — still the only Roblox-native cost-curvature datum that would settle the
  1.32. `[research owed: the four cost-curve sources the domain index quotes are not yet in
  cid/_research/pack.md; they are cited here through the index file instead]`.

| axis | `base` | `perLevel` | `maxLevel` | ladder max | `costBase` | `costGrowth` | Σ cost | level-1 | level-20 |
|---|---|---|---|---|---|---|---|---|---|
| `value` | 1.0 | 0.15 | 20 | ×4.0 | 95 | 1.32 | 76,263 | 95 | 18,562 |
| `radius` | 5.5 | 0.75 | 20 | 20.5 studs | 100 | 1.32 | 80,275 | 100 | 19,539 |
| `speed` | 16 | 0.80 | 20 | 32.0 studs/s | 130 | 1.32 | 104,360 | 130 | 25,400 |

`mode` stays `additive` on all three axes; `l` is the level **held**.

## The solvency ledger

Greedy buyer, cheapest available rung first. Set factors are `04`'s, at **Vault 1.15** — the
change that closes the speed axis's ceiling breach at the realised tick, and it is why rows 7, 8
and the bay are smaller here than in this sheet's previous draft. Arrival τ is
`2 × radiusEff × speedEff`; lap is `footprint × 2 / τ`; under-buy lap is the same at one level
behind on both throughput axes. `rungsBought` is the difference between consecutive summed
`arrivalLevels`, never an independent count.

| # | depth | arrival v/r/s | sets held | arrival τ | ×base | chunks | footprint | patches | arrival lap | under-buy lap | rungs | income | cum. income | cum. spend |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 1 | 0 / 0 / 0 | — | 176.0 | 1.00 | 4 | 14,400 | 140 | 163.6 s | 163.6 s | 6 | 909 | 909 | 747 |
| 2 | 1 | 3 / 2 / 1 | — | 235.2 | 1.34 | 5 | 18,000 | 175 | 153.1 s | 180.0 s | 7 | 1,515 | 2,424 | 2,351 |
| 3 | 2 | 5 / 4 / 4 | terrace | 326.4 | 1.85 | 7 | 25,200 | 259 | 154.4 s | 176.7 s | 7 | 3,536 | 5,960 | 5,378 |
| 4 | 2 | 7 / 7 / 6 | terrace | 447.2 | 2.54 | 10 | 36,000 | 370 | 161.0 s | 180.0 s | 7 | 5,992 | 11,952 | 11,284 |
| 5 | 3 | 10 / 9 / 8 | + cistern | 658.6 | 3.74 | 15 | 54,000 | 585 | 164.0 s | 181.2 s | 7 | 12,432 | 24,384 | 22,509 |
| 6 | 3 | 12 / 11 / 11 | + cistern | 818.4 | 4.65 | 18 | 64,800 | 702 | 158.4 s | 173.1 s | 6 | 16,641 | 41,025 | 39,985 |
| 7 | 4 | 14 / 13 / 13 | + vault | 1,111.2 | 6.31 | 25 | 90,000 | 1,000 | 162.0 s | 175.7 s | 5 | 28,992 | **70,017** | 64,099 |
| 8 | 4 | 16 / 15 / 14 | + vault | 1,257.5 | 7.14 | 28 | 100,800 | 1,120 | 160.3 s | 172.9 s | 5 | 34,905 | 104,922 | 101,803 |
| 9+ | 4 | 17 / 17 / 16 | + spire | 1,740.8 | 9.89 | 42 | 151,200 | 1,680 | 173.7 s | 186.3 s | 4 | 57,833 | — | — |

**Σ upgradeCost 260,898 > income(1..7) 70,017 — `meta/04`'s requirement passes at ×3.73.**
Arrival at area 8 is 7.14× base against a swept cap of 12.34× (ladder 7.46 × set factors 1.656,
radius 1.44 and speed 1.15 together), so `arrivalDeepest < sweptCap` passes. The ladder is 39%
bought at 24 of 24 and exhausted about 2.8 post-terminal bays later.

```manifest
{
  "provides": "solvency",
  "status": "proposed",
  "value": {
    "note": "The income side of the loop, which no existing key holds. requestedUpgrades is NOT a supply of the upgrades key: 01-upgrade-ladder.md owns it and the merger permits one sheet per key. When 01 adopts these figures, delete requestedUpgrades from this key rather than promoting it.",
    "requestedUpgrades": [
      { "id": "value",  "label": "Value", "blurb": "Each patch pays more",            "costBase": 95,  "costGrowth": 1.32, "maxLevel": 20, "perLevel": 0.15, "base": 1,   "mode": "additive" },
      { "id": "radius", "label": "Reach", "blurb": "Clear a wider sweep as you walk", "costBase": 100, "costGrowth": 1.32, "maxLevel": 20, "perLevel": 0.75, "base": 5.5, "mode": "additive" },
      { "id": "speed",  "label": "Pace",  "blurb": "Move faster between patches",     "costBase": 130, "costGrowth": 1.32, "maxLevel": 20, "perLevel": 0.80, "base": 16,  "mode": "additive" }
    ],
    "figureStatus": "playtest unknown",
    "testRanges": { "costGrowth": [1.24, 1.40], "maxLevel": [16, 24], "costBaseRatio": "near 1 : 1.05 : 1.37 so the three axes interleave" },
    "costFormula": "floor(costBase * costGrowth ^ heldLevel)",
    "ladderTotal": 260898,
    "perAxisTotal": { "value": 76263, "radius": 80275, "speed": 104360 },
    "topRung": { "value": 18562, "radius": 19539, "speed": 25400 },
    "growthDerivation": "realised income ratio 1.79 per area at 6.3 rungs bought per area gives a merged per-purchase growth of 1.097 and a per-axis growth of 1.320",
    "purchaseModel": "greedy: the cheapest available next rung on any axis, bought the moment it is affordable",
    "rungsBoughtDerivation": "the difference between consecutive areas' summed arrivalLevels, NOT an independent count. Deltas are 6/7/7/7/7/6/5/5 and sum to 50, the bay's arrival total.",
    "areaLedger": [
      { "ordinal": 1, "depth": 1, "arrivalLevels": { "value": 0,  "radius": 0,  "speed": 0  }, "setsHeld": [],                              "arrivalTau": 176.0,  "chunkCount": 4,  "footprintStuds2": 14400,  "patchCount": 140,  "arrivalLapSeconds": 163.6, "underbuyLapSeconds": 163.6, "rungsBought": 6, "income": 909,   "cumulativeIncome": 909,    "cumulativeSpend": 747 },
      { "ordinal": 2, "depth": 1, "arrivalLevels": { "value": 3,  "radius": 2,  "speed": 1  }, "setsHeld": [],                              "arrivalTau": 235.2,  "chunkCount": 5,  "footprintStuds2": 18000,  "patchCount": 175,  "arrivalLapSeconds": 153.1, "underbuyLapSeconds": 180.0, "rungsBought": 7, "income": 1515,  "cumulativeIncome": 2424,   "cumulativeSpend": 2351 },
      { "ordinal": 3, "depth": 2, "arrivalLevels": { "value": 5,  "radius": 4,  "speed": 4  }, "setsHeld": ["terrace"],                     "arrivalTau": 326.4,  "chunkCount": 7,  "footprintStuds2": 25200,  "patchCount": 259,  "arrivalLapSeconds": 154.4, "underbuyLapSeconds": 176.7, "rungsBought": 7, "income": 3536,  "cumulativeIncome": 5960,   "cumulativeSpend": 5378 },
      { "ordinal": 4, "depth": 2, "arrivalLevels": { "value": 7,  "radius": 7,  "speed": 6  }, "setsHeld": ["terrace"],                     "arrivalTau": 447.2,  "chunkCount": 10, "footprintStuds2": 36000,  "patchCount": 370,  "arrivalLapSeconds": 161.0, "underbuyLapSeconds": 180.0, "rungsBought": 7, "income": 5992,  "cumulativeIncome": 11952,  "cumulativeSpend": 11284 },
      { "ordinal": 5, "depth": 3, "arrivalLevels": { "value": 10, "radius": 9,  "speed": 8  }, "setsHeld": ["terrace", "cistern"],          "arrivalTau": 658.6,  "chunkCount": 15, "footprintStuds2": 54000,  "patchCount": 585,  "arrivalLapSeconds": 164.0, "underbuyLapSeconds": 181.2, "rungsBought": 7, "income": 12432, "cumulativeIncome": 24384,  "cumulativeSpend": 22509 },
      { "ordinal": 6, "depth": 3, "arrivalLevels": { "value": 12, "radius": 11, "speed": 11 }, "setsHeld": ["terrace", "cistern"],          "arrivalTau": 818.4,  "chunkCount": 18, "footprintStuds2": 64800,  "patchCount": 702,  "arrivalLapSeconds": 158.4, "underbuyLapSeconds": 173.1, "rungsBought": 6, "income": 16641, "cumulativeIncome": 41025,  "cumulativeSpend": 39985 },
      { "ordinal": 7, "depth": 4, "arrivalLevels": { "value": 14, "radius": 13, "speed": 13 }, "setsHeld": ["terrace", "cistern", "vault"], "arrivalTau": 1111.2, "chunkCount": 25, "footprintStuds2": 90000,  "patchCount": 1000, "arrivalLapSeconds": 162.0, "underbuyLapSeconds": 175.7, "rungsBought": 5, "income": 28992, "cumulativeIncome": 70017,  "cumulativeSpend": 64099 },
      { "ordinal": 8, "depth": 4, "arrivalLevels": { "value": 16, "radius": 15, "speed": 14 }, "setsHeld": ["terrace", "cistern", "vault"], "arrivalTau": 1257.5, "chunkCount": 28, "footprintStuds2": 100800, "patchCount": 1120, "arrivalLapSeconds": 160.3, "underbuyLapSeconds": 172.9, "rungsBought": 5, "income": 34905, "cumulativeIncome": 104922, "cumulativeSpend": 101803 }
    ],
    "postTerminalBay": {
      "chunkCount": 42, "footprintStuds2": 151200, "patchCount": 1680, "bayLengthStuds": 1260, "depthFamily": 4,
      "arrivalTau": 1740.8, "arrivalLapSeconds": 173.7, "underbuyLapSeconds": 186.3, "rungsBought": 4, "incomePerBay": 57833,
      "sizingWindow": { "minFootprint": 142583, "maxFootprint": 162290, "ratio": 1.138, "minFrom": "lap >= 75 s at full ladder, all four sets and the Span product, tau 3802.2", "maxFrom": "lap <= 200 s one level behind bay arrival, tau 1622.9" },
      "derivation": "the geometric centre of that window, sqrt(142583 * 162290) = 152124, floored to the 3600 chunk grid. Both pacing margin targets are met, at 0.061 and 0.068."
    },
    "tests": [
      { "id": "S1", "assert": "ladderTotal > areaLedger[6].cumulativeIncome", "value": "260898 > 70017, ratio 3.726", "source": "gameplay/meta/04" },
      { "id": "S2", "assert": "areaLedger[7].arrivalTau / 176 < ladderSweptCap * product(set factors on radius and speed)", "value": "7.14 < 12.34", "source": "gameplay/core-loop/05" },
      { "id": "S3", "assert": "min(costBase) is above 10 patches and below 60 s of clearing at base stats", "value": "95 is in 51.6 .. 206.9; 18.4 patches, 21.5 s", "source": "firstSession.firstPurchaseBand" },
      { "id": "S4", "assert": "min(costBase) yields a purchaser first purchase after firstSession.ceilings.secondsToFirstReveal", "value": "12.3 s > 10.0 s", "source": "firstSession; the beat testRange is settled in sheet 05" },
      { "id": "S5", "assert": "every areaLedger[].rungsBought >= 4, so no above-tick gap rests on reveal spacing alone", "value": "5 to 7 across the eight areas; the endless bay's 4 sits AT the floor and not inside it", "source": "gameplay/core-loop/01" },
      { "id": "S6", "assert": "footprintStuds2 is strictly increasing over all eight ordinals", "value": "14400 .. 100800", "source": "03-META.md, deeper areas are larger" },
      { "id": "S7", "assert": "max effective(speed) * realised clearTickRate <= movement.baseClearRadius, the restated depths.invariants[10]", "value": "36.80 * 0.13333 = 4.907 <= 5.5, 10.8% of room, at the SHIPPED tick", "source": "depths.invariants[10], restated; the two-ticks-per-patch clause is withdrawn with the tick request" }
    ],
    "ladderBoughtAtCollectionComplete": 0.390,
    "ladderExhaustedAfter": "about 2.8 post-terminal bays",
    "clearingLoopCost": {
      "formula": "postTerminalBay.patchCount * hz * runtime.maxPlayers",
      "atShippedRealisedTick": { "nominalTick": 0.12, "realisedTick": 0.13333, "hz": 7.5, "testsPerSecond": 201600 },
      "at005": { "hz": 20, "testsPerSecond": 537600 },
      "at00334": { "hz": 30, "testsPerSecond": 806400 },
      "note": "1680 patches and runtime.maxPlayers 16. Only the first row is live: the tick request is withdrawn. Earlier figures of 880000 (this sheet, at 25 Hz and 20 players, both wrong), 211200/563200/844800 (verification, at a 44-chunk bay) and 225600/601600 (Tech-Performance, at a 47-chunk bay) all predate the Vault change that sets the bay at 42 chunks."
    }
  }
}
```

## Revision request against `cid/gameplay/balance/01-upgrade-ladder.md`

| field | current | requested | | field | current | requested |
|---|---|---|---|---|---|---|
| `value.costBase` | 25 | **95** | | `radius.perLevel` | 1.1 | **0.75** |
| `value.costGrowth` | 1.6 | **1.32** | | `speed.costBase` | 60 | **130** |
| `value.maxLevel` | 10 | **20** | | `speed.costGrowth` | 1.8 | **1.32** |
| `value.perLevel` | 0.25 | **0.15** | | `speed.maxLevel` | 6 | **20** |
| `radius.costBase` | 40 | **100** | | `speed.perLevel` | 1.6 | **0.80** |
| `radius.costGrowth` | 1.75 | **1.32** | | `radius.maxLevel` | 8 | **20** |

`id`, `label`, `blurb`, `base` and `mode` are unchanged on all three rows: zero string changes,
so nothing re-enters `vocabulary`. Its acceptance criteria 1 and 2 still pass; criterion 3 ("one
full area buys at least 5 levels") passes at 6 in area 1; criterion 4 ("`value` reaches level 2
within one area") passes at level 3 in area 1.

## Revision requests against other keys

| key / file | field | current | requested | why |
|---|---|---|---|---|
| `depths` (`meta/04`) | `areas[].chunkCount` / `footprintStuds2` / `patchCount`, all 8 rows | 4/7/11/14/16/16/16/16 chunks | **4 / 5 / 7 / 10 / 15 / 18 / 25 / 28** and the ledger's footprints and patch counts | every row derives from arrival throughput, and the ladder that sets it has changed |
| `depths` | `footprintCeilingStuds2` | 73,216 | **217,267** (`200 × 1312 × 1.656 / 2`) | **and the definition changes**: the old figure counted the ladder alone, the new one includes the set factors on `radius` and `speed`. Stated so nobody reads it as the same quantity scaled |
| `depths` | acceptance criterion 2 | prints arrival 164/149/161/163/157×4 and under-buy 186/192/191/182×4 | the ledger's `arrival lap` and `under-buy lap` columns | every printed figure is false after the ladder change |
| `depths` | acceptance criterion 3 | prints 140/683, 245/621, 407/669, 518/678, 624/655×3, 640/655, and "`footprintStuds2` at most 73,216" | the ledger's patch counts and 217,267 | same |
| `depths` | `invariants[10]` | `patchCount <= lapSeconds / (2 · runtime.clearTickRate)` | **`max effective(speed) × ceil(runtime.clearTickRate × 60) / 60 <= movement.baseClearRadius`**, the two-ticks-per-patch clause deleted | see below |
| `layout` (`meta/05`) | `chunksPerFamily` 8, `chunksPerFamilyRange` [8, 16], rule R1 | 16 variants (8 × 2 orientations) | either raise the depth-4 family to **21** (42 variants), or relax R1 from "no chunk variant appears twice in one area's run" to "no variant repeats inside any 16-chunk window" | areas 7, 8 and the bay need **25, 28 and 42** chunks. R1 is unsatisfiable on three rows, and the range's own top of 16 per family (32 variants) still does not reach 42. **The window relaxation costs zero new authored chunks; the family raise costs Art 13 chunk looks.** `meta/05` chooses |
| `endgame` (`meta/07`) | `invariants[2]`, acceptance criterion 3 (57,600 / 16 / 640), `postTerminalArea.bayLengthStuds` 480 | **151,200 / 42 / 1,680**, `bayLengthStuds` **1,260**, and `invariants[2]` restated so the bay is sized from the terminal throughput window rather than copied from `areas[7]` | see `## Pushing back` |
| `products` (`monetization/01`) | acceptance criterion 3 | prints laps 93.5 / 85.2 / 91.8 / 93.0 / 89.9×4 | sheet `04`'s nine `lapAtMaxSpend` figures | the footprints those laps were computed over have all moved |
| `plots` (`meta/06`) | `bays[]` | 8 rows, lane ends at z = 3,000 | **120 / 150 / 210 / 300 / 450 / 540 / 750 / 840 studs**, lane ends at z = **3,360**; each post-terminal bay adds **1,260** | `bayLengthRule` is `footprintStuds2 / laneWidthStuds` and every footprint moved |

## The tick request, withdrawn

**`runtime.clearTickRate` stays at 0.12.** The request for 0.04 does not survive its own
arithmetic. At the bay the invariant is size-invariant: `patchCount = 40c` and
`arrivalLap = 7200c / τ`, so `40c ≤ 7200c / (τ · 2t)` cancels the chunk count entirely. No legal
bay size fixes it. Worse, a nominal tick realises as `ceil(t × 60) / 60` on a 60 Hz heartbeat, so
**0.04 is unreachable and realises as 0.05, which fails the very invariant it was requested
for.** The next reachable value is 0.0334, at **806,400 distance tests per second against the
shipped 201,600** — four times the bill, to buy what this sheet already called "nothing a player
perceives".

**Take the restatement instead, as the recommendation and not as one of two equal options.**
`depths.invariants[10]`'s physical purpose is that the player must not advance more than a clear
radius between ticks. Written as that — `max effective(speed) × realised clearTickRate ≤
movement.baseClearRadius` — it **passes at the shipped tick**: 36.80 × 0.13333 = 4.907 against
5.5, 10.8% of room. The two-ticks-per-patch clause bounded nothing perceptible; the design clears
7.5 patches per second at area 8 at any tick in range, and the tick only decides whether they
arrive 0.9 or 0.3 at a time. **This is coupled to sheet `04`'s Vault change:** with no tick
change the speed ceiling stays at the realised 41.25 permanently, so the axis has to fit under it
rather than wait to be rescued.

## Pushing back

**`gameplay/meta/07-after-the-last-find`, its Decision ("each identical to area 8") and its
`invariants[2]`.** A post-terminal bay is one fixed size that must hold a lap inside the
75-to-200 second band across the whole terminal throughput window: **τ 1,622.9 one level behind
bay arrival to τ 3,802.2 at a maxed ladder with all four sets and the `Span` product**. Area 8's
100,800 studs² gives 160.3 s on arrival and **53.0 s at the top, well under the floor**. The
legal window is 142,583 to 162,290 studs² — 39.6 to 45.1 chunks — and 42 is its geometric centre.

**What is not reopened:** bays are still identical *to each other*, still drawn from the depth-4
chunk family, still bury nothing, still cost zero new art, and are still counted by one integer
in persistence. Only the size changes, and it changes because a value this sheet owns moved.

## Consequences for other work

- **Area authoring by depth (`depths`)** gets eight new rows and the reason they moved. The
  sizing *rule* is unchanged — `footprint(k) = LAP_TARGET × τ(k) / ROUTE_SLACK`, floored to the
  chunk grid toward the under-buy cap — only its inputs.
- **Area-layout work (`layout`)** owns the choice above between 13 more authored chunks and a
  windowed no-repeat rule, and inherits `02`'s depth-aware tier draw.
- **Tech — Performance (wave 5) inherits a corrected budget and no tick change**: 1,680 anchored
  patches in a live bay, `runtime.maxPlayers` 16, a 7.5 Hz realised loop, **201,600 distance
  tests per second**. Its own published 225,600 and 601,600 were computed against a 47-chunk bay
  and the verification's 211,200 / 563,200 / 844,800 against a 44-chunk one; **both supersede to
  201,600 / 537,600 / 806,400 at 42 chunks**, and only the first is live. Spatial bucketing stays
  advisable at 1,680 parts but is no longer forced by a tick change.
- **Plot-arrangement work (`plots`)** inherits a 3,360-stud lane and 1,260 studs per endless bay.
  **The float-precision horizon moves to the 14th post-terminal bay, bay 22 overall**, against
  `meta/06`'s bay 42. Separately, **the end-of-lap walk-back rises to 840 studs at area 8 and
  1,260 at the bay — about 27 s and 38 s of unpaid ground** against `core-loop/01`'s 3-second
  tick ceiling, where `meta/06` sized the worst case at 540 studs / 21 s. I own neither the bay
  geometry nor the opening count; it is recorded because my footprints caused it.
- **Held-tool work (`tool`)** inherits `radius.maxLevel` 8 → 20: 20 width rungs instead of 8.
- **Purchase-surface work (UI/UX)** inherits a five-digit worst-case cost string, 25,400.

## Acceptance criteria

1. `Σ floor(costBase × costGrowth^l)` over all three axes and all 20 levels each equals
   **260,898**, and exceeds the cumulative clearing income of areas 1 through 7 (70,017) by at
   least 1.5×.
2. `min over u of upgradeCost(u, 0)` is 95, which is strictly greater than
   `10 × tierMix.byDepth["1"].expectedValuePerPatch` (51.6), strictly less than the yield of
   60 seconds of clearing at base stats (206.9), and yields a purchaser first purchase strictly
   later than `firstSession.ceilings.secondsToFirstReveal` (12.3 s against 10.0 s).
3. Every `areaLedger[].rungsBought` equals the difference between consecutive summed
   `arrivalLevels`; the eight values are 6/7/7/7/7/6/5/5 and sum to 50; and every one is at least
   4 — the endless bay's 4 sits **at** that floor rather than inside it.
4. `max effective(speed) × ceil(runtime.clearTickRate × 60) / 60 ≤ movement.baseClearRadius` at
   the **shipped** `clearTickRate` 0.12: `36.80 × 0.13333 = 4.907 ≤ 5.5`. No figure in this sheet
   requires a tick change.

## Not decided here

The `upgrades` key itself, which `01-upgrade-ladder.md` supplies. What a patch pays and the
per-depth mix (sheet `02`). Every multiplier that is not an upgrade level, and each axis's
ceiling (sheet `04`). `LAP_TARGET`, `ROUTE_SLACK`, both margin targets and every wall-clock
figure (sheet `05`). Whether the chunk library grows or R1 is windowed (`gameplay/meta/05`). How
the proximity test is implemented (Tech — Performance; I hand it a budget and no tick change).
The bay geometry that sets the walk-back (`gameplay/meta/06`). What the purchase control looks
like (UI/UX).
