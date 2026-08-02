# 03 — Ladder solvency

**Domain:** Balance & Tuning · **Category:** Gameplay · **Wave:** 4

## Decision

**Twenty levels per axis at a common cost growth of 1.32, costBases 95 / 100 / 130 — a
260,898-currency ladder against 71,233 of clearing income across areas 1 to 7.** The shipped
24-rung, 11,644-currency ladder is replaced, not re-priced: it fails `meta/04` by 3.3×, and
`core-loop/05` already named "`maxLevel` rising so the ladder outlasts the collection" as the
fix. Issued as a revision request against `01-upgrade-ladder.md`; this sheet carries no second
`upgrades` block.

## Why

- **The requirement is `meta/04`'s, stated with no figure: `sum(upgradeCost(u, l))` must exceed
  the cumulative clearing income of areas 1 to 7.** At shipped values that is 11,644 against
  about 38,300, so the ladder is spent during area 4 of 8 and `core-loop/05`'s
  `arrivalDeepest < sweptCap` fails. At the values below it is **260,898 against 71,233**, and
  the ladder is 39% bought when the collection finishes.
- **Every figure is the floored sum, not the geometric one.** `upgradeCost(u, l) =
  floor(costBase × costGrowth^l)` `[research: bridge/emit-config.mjs]`, so the per-axis totals
  are 76,263 / 80,275 / 104,360 — each 12 to 15 below the closed-form sum. Stated because the
  first draft of this sheet published the closed-form figures and a criterion asserting an
  equality against them.
- **Income in this game compounds, which is why the growth rate is 1.32 rather than the shipped
  1.6–1.8.** Every earlier read of this ladder treated income as flat per patch. It is not:
  `radius` and `speed` raise patches per second, `value` raises currency per patch, and `depths`
  sizes each area from arrival throughput. The ledger's realised income ratio is **1.79 per
  area** (909 → 30,208 over six steps) at **6 rungs bought per area**, so the merged
  per-purchase growth is `1.79^(1/6)` = **1.102** and the per-axis growth is its cube,
  **1.337**, because three interleaved axes share one sequence. 1.32 is 1% under that and inside
  the [1.24, 1.40] test range. This is the exponential-cost-against-growing-income shape the
  idle-game literature describes, so its 1.07–1.15 band is evidence about the *merged* sequence
  here and not only about hundred-rung ladders `[research: cid/gameplay/balance/_lead.md]`.
- **The rung count is set by the ceilings, not by taste.** `radius` may reach 20.5 studs before
  two set factors and one product factor breach `0.9 × ceiling` (sheet `04`); `speed` is set at
  32.0 because the τ span it produces, 7.46×, is what eight flat-lap areas can absorb. Twenty
  additive steps is what fits between the bases and those tops at a step a player can feel.
- **`value.costBase` is 95, not 75, and the reason is onboarding.** At 75 the first purchase
  lands at 17.0 s for a base player and **9.7 s for a `Span` owner — before
  `firstSession.ceilings.secondsToFirstReveal`, so a purchaser could buy before the game had
  shown them a Find.** At 95 it is 21.5 s and 12.3 s, both after the reveal. The rest of that
  question — the beat's own [40, 120] test range — is settled in sheet `05`, which pushes back on
  it rather than paying for it here.
- **No purchase desert opens, and the ladder is load-bearing for that.** A rung lands every 18.8
  to 27.6 seconds in every one of the eight areas (5 to 7 rungs per area against realised laps of
  130–150 s). Reveals alone do **not** carry `core-loop/01`'s 90-second ceiling: with one Find
  per contiguous third of an area, two consecutive reveals can sit 99.7 s apart at area 7.
  Purchases fill it, so a later change to this cost curve can reopen a cadence rule — which is
  why `rungsBoughtPerArea >= 4` is a test of this key and not a note. **This reverses this
  sheet's first draft, which claimed reveal spacing carried the rule alone.**
- **All three halves of a binding line are now true in numbers.** "Deeper areas are larger,
  denser, and hide rarer sets" `[brief: binding]` ← `[you chose: R3 Q2]` (`03-META.md`).
  Footprint is strictly increasing at all eight rows (14,400 → 108,000) instead of flattening
  from area 5; density is unchanged and still strictly rises at each depth step; sheet `02`
  supplies "rarer".
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

Greedy buyer, cheapest available rung first. Set factors are `04`'s, shown where they land.
Arrival τ is `2 × radiusEffective × speedEffective`; lap is `footprint × 2 / τ`. Under-buy lap is
the same at one level behind on both throughput axes (`UNDERBUY_LEVELS` 1).

| # | depth | arrival v/r/s | sets held | arrival τ | ×base | chunks | footprint | patches | arrival lap | under-buy lap | income | cum. income | cum. spend |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 1 | 0 / 0 / 0 | — | 176.0 | 1.00 | 4 | 14,400 | 140 | 163.6 s | 163.6 s | 909 | 909 | 747 |
| 2 | 1 | 3 / 2 / 1 | — | 235.2 | 1.34 | 5 | 18,000 | 175 | 153.1 s | 180.0 s | 1,515 | 2,424 | 2,351 |
| 3 | 2 | 5 / 4 / 4 | terrace | 326.4 | 1.85 | 7 | 25,200 | 259 | 154.4 s | 176.7 s | 3,536 | 5,960 | 5,378 |
| 4 | 2 | 7 / 7 / 6 | terrace | 447.2 | 2.54 | 10 | 36,000 | 370 | 161.0 s | 180.0 s | 5,992 | 11,952 | 11,284 |
| 5 | 3 | 10 / 9 / 8 | + cistern | 658.6 | 3.74 | 15 | 54,000 | 585 | 164.0 s | 181.2 s | 12,432 | 24,384 | 22,509 |
| 6 | 3 | 12 / 11 / 11 | + cistern | 818.4 | 4.65 | 18 | 64,800 | 702 | 158.4 s | 173.1 s | 16,641 | 41,025 | 39,985 |
| 7 | 4 | 14 / 13 / 13 | + vault | 1,159.5 | 6.59 | 26 | 93,600 | 1,040 | 161.4 s | 175.1 s | 30,208 | **71,233** | 70,437 |
| 8 | 4 | 16 / 15 / 15 | + vault | 1,350.7 | 7.68 | 30 | 108,000 | 1,200 | 159.9 s | 172.3 s | 37,495 | 108,728 | 101,803 |
| 9+ | 4 | 17 / 17 / 16 | + spire | 1,816.5 | 10.32 | 44 | 158,400 | 1,760 | 174.4 s | 187.1 s | 60,580 | — | — |

**Σ upgradeCost 260,898 > income(1..7) 71,233 — `meta/04`'s requirement passes at ×3.66.**
Arrival at area 8 is 7.68× base against a swept cap of 12.88× (ladder 7.46 × set factors 1.728,
radius 1.44 and speed 1.20 together), so `core-loop/05`'s `arrivalDeepest < sweptCap` passes. The
ladder is 39% bought at 24 of 24 and exhausted about 2.6 post-terminal bays later.

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
    "growthDerivation": "realised income ratio 1.79 per area at 6 rungs bought per area gives a merged per-purchase growth of 1.102 and a per-axis growth of 1.337; 1.32 is 1% under it",
    "purchaseModel": "greedy: the cheapest available next rung on any axis, bought the moment it is affordable",
    "areaLedger": [
      { "ordinal": 1, "depth": 1, "arrivalLevels": { "value": 0,  "radius": 0,  "speed": 0  }, "setsHeld": [],                              "arrivalTau": 176.0,  "chunkCount": 4,  "footprintStuds2": 14400,  "patchCount": 140,  "arrivalLapSeconds": 163.6, "underbuyLapSeconds": 163.6, "income": 909,   "cumulativeIncome": 909,    "cumulativeSpend": 747,    "rungsBought": 6 },
      { "ordinal": 2, "depth": 1, "arrivalLevels": { "value": 3,  "radius": 2,  "speed": 1  }, "setsHeld": [],                              "arrivalTau": 235.2,  "chunkCount": 5,  "footprintStuds2": 18000,  "patchCount": 175,  "arrivalLapSeconds": 153.1, "underbuyLapSeconds": 180.0, "income": 1515,  "cumulativeIncome": 2424,   "cumulativeSpend": 2351,   "rungsBought": 6 },
      { "ordinal": 3, "depth": 2, "arrivalLevels": { "value": 5,  "radius": 4,  "speed": 4  }, "setsHeld": ["terrace"],                     "arrivalTau": 326.4,  "chunkCount": 7,  "footprintStuds2": 25200,  "patchCount": 259,  "arrivalLapSeconds": 154.4, "underbuyLapSeconds": 176.7, "income": 3536,  "cumulativeIncome": 5960,   "cumulativeSpend": 5378,   "rungsBought": 7 },
      { "ordinal": 4, "depth": 2, "arrivalLevels": { "value": 7,  "radius": 7,  "speed": 6  }, "setsHeld": ["terrace"],                     "arrivalTau": 447.2,  "chunkCount": 10, "footprintStuds2": 36000,  "patchCount": 370,  "arrivalLapSeconds": 161.0, "underbuyLapSeconds": 180.0, "income": 5992,  "cumulativeIncome": 11952,  "cumulativeSpend": 11284,  "rungsBought": 6 },
      { "ordinal": 5, "depth": 3, "arrivalLevels": { "value": 10, "radius": 9,  "speed": 8  }, "setsHeld": ["terrace", "cistern"],          "arrivalTau": 658.6,  "chunkCount": 15, "footprintStuds2": 54000,  "patchCount": 585,  "arrivalLapSeconds": 164.0, "underbuyLapSeconds": 181.2, "income": 12432, "cumulativeIncome": 24384,  "cumulativeSpend": 22509,  "rungsBought": 6 },
      { "ordinal": 6, "depth": 3, "arrivalLevels": { "value": 12, "radius": 11, "speed": 11 }, "setsHeld": ["terrace", "cistern"],          "arrivalTau": 818.4,  "chunkCount": 18, "footprintStuds2": 64800,  "patchCount": 702,  "arrivalLapSeconds": 158.4, "underbuyLapSeconds": 173.1, "income": 16641, "cumulativeIncome": 41025,  "cumulativeSpend": 39985,  "rungsBought": 6 },
      { "ordinal": 7, "depth": 4, "arrivalLevels": { "value": 14, "radius": 13, "speed": 13 }, "setsHeld": ["terrace", "cistern", "vault"], "arrivalTau": 1159.5, "chunkCount": 26, "footprintStuds2": 93600,  "patchCount": 1040, "arrivalLapSeconds": 161.4, "underbuyLapSeconds": 175.1, "income": 30208, "cumulativeIncome": 71233,  "cumulativeSpend": 70437,  "rungsBought": 6 },
      { "ordinal": 8, "depth": 4, "arrivalLevels": { "value": 16, "radius": 15, "speed": 15 }, "setsHeld": ["terrace", "cistern", "vault"], "arrivalTau": 1350.7, "chunkCount": 30, "footprintStuds2": 108000, "patchCount": 1200, "arrivalLapSeconds": 159.9, "underbuyLapSeconds": 172.3, "income": 37495, "cumulativeIncome": 108728, "cumulativeSpend": 101803, "rungsBought": 5 }
    ],
    "postTerminalBay": {
      "chunkCount": 44, "footprintStuds2": 158400, "patchCount": 1760, "bayLengthStuds": 1320, "depthFamily": 4,
      "arrivalTau": 1816.5, "arrivalLapSeconds": 174.4, "underbuyLapSeconds": 187.1, "incomePerBay": 60580,
      "sizingWindow": { "minFootprint": 148781, "maxFootprint": 169344, "ratio": 1.138, "minFrom": "lap >= 75 s at full ladder, all four sets and the Span product, tau 3967.5", "maxFrom": "lap <= 200 s one level behind bay arrival, tau 1693.4" },
      "derivation": "the geometric centre of that window, sqrt(148781 * 169344) = 158730, floored to the 3600 chunk grid. Both pacing margin targets are met at 0.065; at 47 chunks the under-buy margin is 0.001."
    },
    "tests": [
      { "id": "S1", "assert": "ladderTotal > areaLedger[6].cumulativeIncome", "value": "260898 > 71233, ratio 3.663", "source": "gameplay/meta/04" },
      { "id": "S2", "assert": "areaLedger[7].arrivalTau / 176 < ladderSweptCap * product(set factors on radius and speed)", "value": "7.68 < 12.88", "source": "gameplay/core-loop/05" },
      { "id": "S3", "assert": "min(costBase) is above 10 patches and below 60 s of clearing at base stats", "value": "95 is in 51.6 .. 206.9; 18.4 patches, 21.5 s", "source": "firstSession.firstPurchaseBand" },
      { "id": "S4", "assert": "min(costBase) yields a purchaser first purchase after firstSession.ceilings.secondsToFirstReveal", "value": "12.3 s > 10.0 s", "source": "firstSession; the beat testRange is settled in sheet 05" },
      { "id": "S5", "assert": "every areaLedger[].rungsBought >= 4, so no above-tick gap rests on reveal spacing alone", "value": "5 to 7", "source": "gameplay/core-loop/01" },
      { "id": "S6", "assert": "footprintStuds2 is strictly increasing over all eight ordinals", "value": "14400 .. 108000", "source": "03-META.md, deeper areas are larger" },
      { "id": "S7", "assert": "patchCount <= arrivalLapSeconds / (2 * runtime.clearTickRate)", "value": "fails from ordinal 6 at 0.12 s and at the bay at 0.05 s (1744 against 1760); passes at 0.04 s with margin", "source": "depths.invariants[10]" }
    ],
    "ladderBoughtAtCollectionComplete": 0.390,
    "ladderExhaustedAfter": "about 2.6 post-terminal bays"
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
so nothing re-enters `vocabulary`. Its acceptance criteria 1 and 2 still pass; criterion 3
("one full area buys at least 5 levels") passes at 6 in area 1; criterion 4 ("`value` reaches
level 2 within one area") passes at level 3 in area 1.

## Revision requests against other keys

| key / file | field | current | requested | why |
|---|---|---|---|---|
| `depths` (`meta/04`) | `areas[].chunkCount` / `footprintStuds2` / `patchCount`, all 8 rows | 4/7/11/14/16/16/16/16 chunks | **4 / 5 / 7 / 10 / 15 / 18 / 26 / 30** and the ledger's footprints and patch counts | every row derives from arrival throughput, and the ladder that sets it has changed |
| `depths` | `footprintCeilingStuds2` | 73,216 | **226,714** (`200 × 1312 × 1.728 / 2`) | **and the definition changes**: the old figure counted the ladder alone, the new one includes the four set factors on `radius` and `speed`. Stated so nobody reads it as the same quantity scaled |
| `depths` | acceptance criterion 2 | prints arrival 164/149/161/163/157×4 and under-buy 186/192/191/182×4 | the ledger's `arrival lap` and `under-buy lap` columns | every printed figure is false after the ladder change |
| `depths` | acceptance criterion 3 | prints 140/683, 245/621, 407/669, 518/678, 624/655×3, 640/655, and "`footprintStuds2` at most 73,216" | the ledger's patch counts and 226,714 | same |
| `depths` | `invariants[10]` | `patchCount <= lapSeconds / (2 · runtime.clearTickRate)` | keep the form, add "evaluated at the post-terminal bay as well"; **or** take the cheaper restatement below | the bay is the tightest row and sits outside `areas[]` |
| `layout` (`meta/05`) | `chunksPerFamily` 8, `chunksPerFamilyRange` [8, 16], rule R1 | 16 variants (8 × 2 orientations) | either raise the depth-4 family to **22** (44 variants), or relax R1 from "no chunk variant appears twice in one area's run" to "no variant repeats inside any 16-chunk window" | areas 7, 8 and the bay need **26, 30 and 44** chunks. R1 is unsatisfiable on three rows, and the range's own top of 16 per family (32 variants) still does not reach 44. **The window relaxation costs zero new authored chunks; the family raise costs Art 14 chunk looks.** `meta/05` chooses |
| `endgame` (`meta/07`) | `invariants[2]`, acceptance criterion 3 (57,600 / 16 / 640), `postTerminalArea.bayLengthStuds` 480 | **158,400 / 44 / 1,760**, `bayLengthStuds` **1,320**, and `invariants[2]` restated so the bay is sized from the terminal throughput window rather than copied from `areas[7]` | see `## Pushing back` |
| `products` (`monetization/01`) | acceptance criterion 3 | prints laps 93.5 / 85.2 / 91.8 / 93.0 / 89.9×4 | sheet `04`'s nine `lapAtMaxSpend` figures | the footprints those laps were computed over have all moved |
| `plots` (`meta/06`) | `bays[]` | 8 rows, lane ends at z = 3,000 | **120 / 150 / 210 / 300 / 450 / 540 / 780 / 900 studs**, lane ends at z = **3,450**; each post-terminal bay adds **1,320** | `bayLengthRule` is `footprintStuds2 / laneWidthStuds` and every footprint moved |
| `runtime` (architect) | `clearTickRate` | 0.12 | **0.04**, *or* the `invariants[10]` restatement above | see below |

## The tick request, restated in what it actually buys

`depths.invariants[10]` fails from ordinal 6 at 0.12 s (660 against 702 patches) and at the bay
at 0.05 s (1,744 against 1,760); 0.04 s passes every row with margin, and the schema permits
anything under 0.25 `[research: architect/schema.mjs]`. **What the change buys is literal
compliance with that invariant, and nothing a player perceives**: the design clears 7.5 patches
per second at area 8 either way, and the tick only decides whether they arrive 0.9 at a time or
0.3 at a time. The physical rule this invariant is often confused with is
`modifiers.axes[speed].ceilingRule` — the player must not advance more than a clear radius
between ticks — and that **passes at the shipped 0.12** with 19% of room (38.4 × 0.12 = 4.61
studs against `movement.baseClearRadius` 5.5). **The cheaper alternative, offered beside the
request rather than instead of it:** `meta/04` restates `invariants[10]` as the quantity it is
protecting, `max effective(speed) × runtime.clearTickRate <= movement.baseClearRadius`, deletes
the two-ticks-per-patch clause, and the tick stays 0.12 at zero cost. **If instead the tick
moves, the bill is 1,760 patches × 25 Hz × 20 players = 880,000 distance tests per second**,
which makes spatial bucketing mandatory. Tech — Performance should inherit both options.

## Pushing back

**`gameplay/meta/07-after-the-last-find`, its Decision ("each identical to area 8") and its
`invariants[2]`.** A post-terminal bay is one fixed size that must hold a lap inside the
75-to-200 second band across the whole terminal throughput window: **τ 1,693.4 one level behind
bay arrival to τ 3,967.5 at a maxed ladder with all four sets and the `Span` product**. Area 8's
108,000 studs² gives 118.9 s on arrival and **54.4 s at the top, well under the floor**. The
legal window is 148,781 to 169,344 studs² — 41.3 to 47.0 chunks — and 44 is its geometric centre,
the only size meeting both of `pacing`'s margin targets.

**What is not reopened:** bays are still identical *to each other*, still drawn from the depth-4
chunk family, still bury nothing, still cost zero new art, and are still counted by one integer
in persistence. Only the size changes, and it changes because a value this sheet owns moved.

## Consequences for other work

- **Area authoring by depth (`depths`)** gets eight new rows and the reason they moved. The
  sizing *rule* is unchanged — `footprint(k) = LAP_TARGET × τ(k) / ROUTE_SLACK`, floored to the
  chunk grid toward the under-buy cap — only its inputs.
- **Area-layout work (`layout`)** owns the choice above between 14 more authored chunks and a
  windowed no-repeat rule, and inherits `02`'s depth-aware tier draw.
- **Runtime and performance work** inherits two options, not one instruction: the tick change
  with its 880,000-test bill, or the invariant restatement at zero cost.
- **Plot-arrangement work (`plots`)** inherits a 3,450-stud lane and 1,320 studs per endless bay.
  **The float-precision horizon moves with it: 20,000 studs is crossed at the 13th post-terminal
  bay, bay 21 overall, against `meta/06`'s bay 42.** Its own `[research owed:]` settles it.
  Separately, **the end-of-lap walk-back from the last cleared patch to the inward opening rises
  to 900 studs at area 8 and 1,320 at the bay — about 27 s and 38 s of unpaid ground** against
  `core-loop/01`'s 3-second tick ceiling, where `meta/06` sized the worst case at 540 studs / 21 s
  and called it inside every cadence rule. I own neither the bay geometry nor the opening count;
  it is recorded here because my footprints caused it.
- **Held-tool work (`tool`)** inherits `radius.maxLevel` 8 → 20: 20 width rungs instead of 8, top
  width at 20.5 studs of base ladder rather than 14.3.
- **Purchase-surface work (UI/UX)** inherits a five-digit worst-case cost string, 25,400.

## Acceptance criteria

1. `Σ floor(costBase × costGrowth^l)` over all three axes and all 20 levels each equals
   **260,898**, and exceeds the cumulative clearing income of areas 1 through 7 (71,233) by at
   least 1.5×.
2. `min over u of upgradeCost(u, 0)` is 95, which is strictly greater than
   `10 × tierMix.byDepth["1"].expectedValuePerPatch` (51.6), strictly less than the yield of
   60 seconds of clearing at base stats (206.9), and yields a purchaser first purchase strictly
   later than `firstSession.ceilings.secondsToFirstReveal` (12.3 s against 10.0 s).
3. `depths.areas[].footprintStuds2` is strictly increasing over all eight ordinals;
   `areas[7].arrivalTau / 176` (7.68) is strictly less than `ladderSweptCap × 1.728` (12.88); and
   every `areaLedger[].rungsBought` is at least 4.
4. For every row of the ledger and for the post-terminal bay,
   `patchCount ≤ arrivalLapSeconds / (2 × runtime.clearTickRate)` holds at
   `clearTickRate = 0.04`, and fails at 0.12 from ordinal 6 — so the request is testable in both
   directions.

## Not decided here

The `upgrades` key itself, which `01-upgrade-ladder.md` supplies and this sheet only requests
changes to. What a patch pays and the per-depth mix (sheet `02`). Every multiplier that is not an
upgrade level, and each axis's ceiling (sheet `04`). `LAP_TARGET`, `ROUTE_SLACK`, both margin
targets and every wall-clock figure, including the first-purchase beat range (sheet `05`).
Whether the chunk library grows or R1 is windowed (`gameplay/meta/05`). The tick's final value
and how the proximity test is implemented (architecture and Tech — Performance; I offer two
routes). The bay geometry that sets the walk-back (`gameplay/meta/06`). What the purchase control
looks like (UI/UX).
