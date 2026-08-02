# 05 — Time to milestone

**Domain:** Balance & Tuning · **Category:** Gameplay · **Wave:** 4

## Decision

**`LAP_TARGET` 165 s, `ROUTE_SLACK` 2.0, `UNDERBUY_LEVELS` 1, a lap band of 75 to 200 seconds,
and two margin targets of 0.06 and 0.05 — every coefficient that belongs to no other key,
proposed together as `pacing`.** The collection finishes at **17.8 minutes** for a base player
and **10.2** for a `Span` owner; the ladder empties at 25.2 / 14.4. Two corrections ride with it:
`core-loop/04`'s "three to seven complete laps" was computed on the **arrival** lap and the
realised lap is 0.865× that, so a bound session is **four to eight**; and
`firstSession.beats[firstSpendAffordable].testRange` [40, 120] is unsatisfiable beside that key's
own `firstPurchaseBand` and becomes **[10, 120]**.

## Why

- **165 seconds is derived, not chosen.** `core-loop/04` fixes a bound session at three to seven
  complete laps and the brief fixes the session at **10 to 20 minutes** `[brief: binding]` ←
  `[you chose: R1 Q4]` (`00-CORE.md`). 600 / 165 = 3.6 and 1200 / 165 = 7.3, so on arrival
  throughput 165 hits both ends exactly and nothing else in its 120-to-200 range does. It is also
  inside the only external session evidence the project has: a simulator's core loop should be
  completable in under five minutes, and over fifteen "is a design problem"
  `[research: https://rowatcher.com/news/what-the-roblox-algorithm-actually-rewards-in-2026-not-ccu]`.
- **The realised lap is not the arrival lap, and that is the whole of the lap-count correction.**
  Throughput rises *inside* an area as rungs are bought, so eight areas whose arrival laps sum to
  1,275.8 s are walked in 1,103.7 — a ratio of **0.865**. The consequence is one extra lap at
  both ends of the session band. `[cid: decided]` — the brief says nothing about laps at all.
- **`ROUTE_SLACK` 2.0 says half the sweep is wasted on overlap and re-walking.** It is the figure
  every merged footprint already assumes: `meta/04`'s row 1 is 165 × 176 / 2 = 14,520 floored to
  14,400. I keep it rather than re-derive it, because moving it rescales all eight footprints and
  nothing has measured it. `[playtest unknown]`, test range 1.5 to 2.6 — below 1.5 a perfect
  boustrophedon route is being assumed of an eight-year-old on a phone `[brief: binding]` ←
  `[you chose: R1 Q4]`; above 2.6 area 2 falls under the lap floor.
- **The 12% margin is replaced by two named ones, and their values are set by how much slack the
  band actually has.** `purchaserFloorMarginTarget` **0.06** and `arrivalCeilingMarginTarget`
  **0.05**. They are not larger because of the post-terminal bay: one fixed size must serve a
  player from an under-buy arrival at τ 1,693.4 to a maxed ladder with all four sets and the
  product at τ 3,967.5, a **1.138× footprint window inside a 2.67× band**. Sized at its geometric
  centre — 44 chunks — the bay meets both at 0.065; the eight areas clear them at 0.167 and
  0.094.
- **`UNDERBUY_LEVELS` is 1 and it holds at every row.** `depths.invariants[9]` requires the lap
  to stay inside 75–200 "one upgrade level behind arrival on both throughput axes". The worst
  case is the post-terminal bay at 187.1 s and the worst area is ordinal 5 at 181.2 s.
- **The 90-second ceiling is carried by purchases, not by reveals, and this reverses my first
  draft.** With `collection.relicsPerArea` 3 and one Find per contiguous third of an area, two
  consecutive reveals can sit **2/3 of a lap apart — 99.7 s at area 7**, past the ceiling. What
  closes it is the ladder: sheet `03` buys 5 to 7 rungs in every area, a purchase every **18.8 to
  27.6 seconds**. So the mean reveal gap of 46 s was a mean presented as a maximum, and the cost
  curve is load-bearing for a cadence rule after all. `pacing` therefore carries both the reveal
  maximum and the purchase cadence, and `solvency` carries `rungsBought >= 4` as a test.
- **The 3-second tick ceiling is kept, with one exclusion named.** A moving player at base stats
  clears 0.86 patches per second, so the in-area gap is 1.17 s. It **excludes the end-of-lap
  walk-back** from the last cleared patch to the inward opening, which at sheet `03`'s bay
  lengths is 900 studs at area 8 and 1,320 at the endless bay — about 27 s and 38 s of unpaid
  ground. That is bay geometry and belongs to `meta/06`; it is named here because this sheet
  publishes the figure that would otherwise hide it.
- **The onset separation is 0.35 s.** `core-loop/02` asserts "at least 0.35 s between onsets" and
  `core-loop/03` gives a 0.20–0.60 range; 0.35 is the one value satisfying both.
- **What now carries the brief's highest-risk tuning.** "Discovery rates must be generous enough
  that a typical session yields at least one find" `[brief: binding]` as a stated risk
  (`03-META.md`). There is no discovery rate any more — `systems/05` made placement a seeded
  partition — so the claim is a **pacing** claim carried by exactly two numbers:
  `collection.relicsPerArea` at 3 and the realised lap at ~138 s. **A floor session yields 12
  finds and the first arrives inside 10 seconds; the risk is closed by structure and re-opens
  only if `relicsPerArea` falls to 1 or the realised lap passes 600 s.**
- `[playtest unknown]` `LAP_TARGET` (120–200), `ROUTE_SLACK` (1.5–2.6), both margin targets
  (0.05–0.25), and every wall-clock figure derived from them. The three fixed ceilings — 3.0 s,
  90.0 s, 0.35 s — are inherited, not re-derived.
- `[research owed: a timestamped capture of the first 120 seconds of place 133086043677134]` —
  the one figure that would anchor first-purchase at 21.5 s to something shipped.
  `[research owed: the 2025 Roblox Benchmark Report's session-length interval table]`; nothing
  here cites it.

## The clock

Realised lap = `footprint × ROUTE_SLACK / sqrt(τ_arrival × τ_exit)`, the throughput actually held
across the area rather than the throughput held on entering it.

| # | arrival lap | under-buy lap | realised lap | cumulative | rungs bought | purchase cadence | reveal gap, mean | reveal gap, max |
|---|---|---|---|---|---|---|---|---|
| 1 | 163.6 s | 163.6 s | 141.5 s | 141.5 s | 6 | 23.6 s | 47.2 s | 94.3 s |
| 2 | 153.1 s | 180.0 s | 130.0 s | 271.5 s | 6 | 21.7 s | 43.3 s | 86.7 s |
| 3 | 154.4 s | 176.7 s | 131.9 s | 403.4 s | 7 | 18.8 s | 44.0 s | 87.9 s |
| 4 | 161.0 s | 180.0 s | 132.7 s | 536.1 s | 6 | 22.1 s | 44.2 s | 88.5 s |
| 5 | 164.0 s | 181.2 s | 147.1 s | 683.2 s | 6 | 24.5 s | 49.0 s | 98.1 s |
| 6 | 158.4 s | 173.1 s | 133.0 s | 816.2 s | 6 | 22.2 s | 44.3 s | 88.7 s |
| 7 | 161.4 s | 175.1 s | 149.6 s | 965.8 s | 6 | 24.9 s | 49.9 s | **99.7 s** |
| 8 | 159.9 s | 172.3 s | 137.9 s | 1,103.7 s | 5 | 27.6 s | 46.0 s | 91.9 s |
| bay | 174.4 s | 187.1 s | 155.7 s | — | 4 | 38.9 s | — | — |

| milestone | base player | `Span` owner | how it is reached |
|---|---|---|---|
| first clear | 2.0 s | 2.0 s | from first input; `firstSession` ceiling 3.0 s |
| first Find | 6.0 s | 6.0 s | from join; `firstSession` ceiling 10.0 s |
| first purchase affordable | 21.5 s | 12.3 s | 95 currency at 5.16 per patch, 0.856 patches/s |
| area 1 complete | 141.5 s | 80.9 s | — |
| set 1, Terrace | 239.0 s | 136.6 s | sixth Terrace name, 75% through area 2 |
| set 2, Cistern | 502.9 s | 287.4 s | 75% through area 4 |
| set 3, Vault | 782.9 s | 447.4 s | 75% through area 6 |
| **24 of 24, set 4, Spire** | **1,069.2 s** | **611.0 s** | 75% through area 8 |
| area 8 complete | 1,103.7 s | 630.7 s | — |
| ladder exhausted | 1,513 s | 864 s | 2.6 endless bays past area 8 |

A `Span` owner's every clearing figure is the base player's divided by 1.75, because the pass
multiplies τ and changes no currency per patch. First clear and first Find do not divide: both
are gated by the arming distance and by the nearest patch, not by throughput.

```manifest
{
  "provides": "pacing",
  "status": "proposed",
  "value": {
    "lapTargetSeconds": 165, "lapTargetTestRange": [120, 200], "lapTargetStatus": "playtest unknown",
    "lapTargetMeaning": "the ARRIVAL lap: footprint * routeSlack / tau at the throughput held on entering the area. depths.sizingRule reads this one.",
    "lapFloorSeconds": 75, "lapCeilingSeconds": 200,
    "realisedLapMeaning": "footprint * routeSlack / sqrt(tauArrival * tauExit); wall clock from entering an area to clearing its last patch",
    "realisedToArrivalRatio": 0.865,
    "realisedToArrivalDerivation": "1103.7 s realised over 1275.8 s of summed arrival laps; NOT 1103.7/1320, which divides by 8 * lapTargetSeconds and is a different quantity",
    "routeSlack": 2.0, "routeSlackTestRange": [1.5, 2.6], "routeSlackStatus": "playtest unknown",
    "underbuyLevels": 1,
    "purchaserFloorMarginTarget": 0.06, "purchaserFloorMarginRealised": 0.065, "purchaserFloorMarginBindingRow": "post-terminal bay",
    "arrivalCeilingMarginTarget": 0.05, "arrivalCeilingMarginRealised": 0.065, "arrivalCeilingMarginBindingRow": "post-terminal bay",
    "marginTargetTestRange": [0.05, 0.25],
    "marginNote": "replaces the 12% figure standing after wave 3, which was the residue of withdrawing two value passes. The targets are 0.06 and 0.05 rather than larger because the post-terminal bay must serve a 1.138x footprint window (under-buy arrival tau 1693.4 to maxed-plus-product tau 3967.5) inside a 2.67x band. They are what sizes solvency.postTerminalBay at 44 chunks.",
    "tickGapMaxSeconds": 3.0, "tickGapRealisedSeconds": 1.17,
    "tickGapExcludes": "the end-of-lap walk-back from the last cleared patch to the inward opening: 900 studs / 27 s at area 8 and 1320 studs / 38 s at the endless bay. Bay geometry, owned by gameplay/meta/06; stated here because this key publishes the lengths.",
    "aboveTickGapMaxSeconds": 90.0,
    "aboveTickGapRealisedSeconds": 38.9,
    "aboveTickGapCarriedBy": "upgrade purchases, at 18.8 to 27.6 s inside the eight areas and 38.9 s in an endless bay",
    "revealGapMeanSeconds": 46.0,
    "revealGapMaxSeconds": 99.7,
    "revealGapNote": "at relicsPerArea 3 with one Find per contiguous third, two consecutive reveals can sit 2/3 of a lap apart. 99.7 s at area 7 EXCEEDS the 90 s ceiling, so reveal spacing does not carry the rule alone and the cost curve is load-bearing for it. solvency.tests.S5 is the guard.",
    "aboveTickGapScope": "applies while found < 24; endgame scopes it off at the terminal state, and it must also be scoped off at ladder exhaustion, after which only the tick and area completion survive",
    "coincidentOnsetSeparationSeconds": 0.35, "coincidentOnsetSeparationRange": [0.20, 0.60],
    "sessionBandSeconds": [600, 1200],
    "completeLapsPerSession": [4, 8],
    "completeLapsPerSessionPopulation": "base player; a Span owner runs 7 to 15 and that is what a throughput multiplier buys",
    "completeLapsCorrection": "core-loop/04 states three to seven. That figure divides the session by the ARRIVAL lap; the realised lap is 0.865x it. Same shape, one lap more at each end.",
    "laps": [
      { "ordinal": 1,     "arrivalLapSeconds": 163.6, "underbuyLapSeconds": 163.6, "realisedLapSeconds": 141.5, "cumulativeSeconds": 141.5,  "rungsBought": 6, "purchaseCadenceSeconds": 23.6, "revealGapMeanSeconds": 47.2, "revealGapMaxSeconds": 94.3 },
      { "ordinal": 2,     "arrivalLapSeconds": 153.1, "underbuyLapSeconds": 180.0, "realisedLapSeconds": 130.0, "cumulativeSeconds": 271.5,  "rungsBought": 6, "purchaseCadenceSeconds": 21.7, "revealGapMeanSeconds": 43.3, "revealGapMaxSeconds": 86.7 },
      { "ordinal": 3,     "arrivalLapSeconds": 154.4, "underbuyLapSeconds": 176.7, "realisedLapSeconds": 131.9, "cumulativeSeconds": 403.4,  "rungsBought": 7, "purchaseCadenceSeconds": 18.8, "revealGapMeanSeconds": 44.0, "revealGapMaxSeconds": 87.9 },
      { "ordinal": 4,     "arrivalLapSeconds": 161.0, "underbuyLapSeconds": 180.0, "realisedLapSeconds": 132.7, "cumulativeSeconds": 536.1,  "rungsBought": 6, "purchaseCadenceSeconds": 22.1, "revealGapMeanSeconds": 44.2, "revealGapMaxSeconds": 88.5 },
      { "ordinal": 5,     "arrivalLapSeconds": 164.0, "underbuyLapSeconds": 181.2, "realisedLapSeconds": 147.1, "cumulativeSeconds": 683.2,  "rungsBought": 6, "purchaseCadenceSeconds": 24.5, "revealGapMeanSeconds": 49.0, "revealGapMaxSeconds": 98.1 },
      { "ordinal": 6,     "arrivalLapSeconds": 158.4, "underbuyLapSeconds": 173.1, "realisedLapSeconds": 133.0, "cumulativeSeconds": 816.2,  "rungsBought": 6, "purchaseCadenceSeconds": 22.2, "revealGapMeanSeconds": 44.3, "revealGapMaxSeconds": 88.7 },
      { "ordinal": 7,     "arrivalLapSeconds": 161.4, "underbuyLapSeconds": 175.1, "realisedLapSeconds": 149.6, "cumulativeSeconds": 965.8,  "rungsBought": 6, "purchaseCadenceSeconds": 24.9, "revealGapMeanSeconds": 49.9, "revealGapMaxSeconds": 99.7 },
      { "ordinal": 8,     "arrivalLapSeconds": 159.9, "underbuyLapSeconds": 172.3, "realisedLapSeconds": 137.9, "cumulativeSeconds": 1103.7, "rungsBought": 5, "purchaseCadenceSeconds": 27.6, "revealGapMeanSeconds": 46.0, "revealGapMaxSeconds": 91.9 },
      { "ordinal": "bay", "arrivalLapSeconds": 174.4, "underbuyLapSeconds": 187.1, "realisedLapSeconds": 155.7, "cumulativeSeconds": null,   "rungsBought": 4, "purchaseCadenceSeconds": 38.9, "revealGapMeanSeconds": null, "revealGapMaxSeconds": null }
    ],
    "milestones": [
      { "id": "firstClear",         "baseSeconds": 2.0,    "purchaserSeconds": 2.0,   "unit": "s", "measuredFrom": "firstInput", "source": "firstSession.ceilings.secondsToFirstClear 3.0" },
      { "id": "firstFind",          "baseSeconds": 6.0,    "purchaserSeconds": 6.0,   "unit": "s", "measuredFrom": "join",       "source": "firstSession.ceilings.secondsToFirstReveal 10.0" },
      { "id": "firstPurchase",      "baseSeconds": 21.5,   "purchaserSeconds": 12.3,  "unit": "s", "measuredFrom": "join",       "source": "95 currency at 5.16 per patch and 0.856 patches per second; both after the 10 s reveal ceiling" },
      { "id": "area1Complete",      "baseSeconds": 141.5,  "purchaserSeconds": 80.9,  "unit": "s", "measuredFrom": "join",       "source": "laps[0]" },
      { "id": "setComplete1",       "baseSeconds": 239.0,  "purchaserSeconds": 136.6, "unit": "s", "measuredFrom": "join",       "source": "sixth terrace name, 75% through area 2" },
      { "id": "setComplete2",       "baseSeconds": 502.9,  "purchaserSeconds": 287.4, "unit": "s", "measuredFrom": "join",       "source": "75% through area 4" },
      { "id": "setComplete3",       "baseSeconds": 782.9,  "purchaserSeconds": 447.4, "unit": "s", "measuredFrom": "join",       "source": "75% through area 6" },
      { "id": "collectionComplete", "baseSeconds": 1069.2, "purchaserSeconds": 611.0, "unit": "s", "measuredFrom": "join",       "source": "75% through area 8; this is 24 of 24 and set 4 together" },
      { "id": "area8Complete",      "baseSeconds": 1103.7, "purchaserSeconds": 630.7, "unit": "s", "measuredFrom": "join",       "source": "laps[7]" },
      { "id": "ladderExhausted",    "baseSeconds": 1513.0, "purchaserSeconds": 864.0, "unit": "s", "measuredFrom": "join",       "source": "2.6 post-terminal bays past area 8, at solvency.postTerminalBay.incomePerBay" }
    ],
    "purchaserRule": "every clearing figure divides by the product factor on radius, 1.75, because a radius pass multiplies tau and changes no currency per patch. firstClear and firstFind do not divide: both are gated by armDistanceStuds and by the nearest patch.",
    "oneFindPerSessionRisk": {
      "carriedBy": ["collection.relicsPerArea", "realised lap"],
      "notCarriedBy": "any discovery rate; systems/05 removed it",
      "floorSessionFinds": 12,
      "reopensIf": "relicsPerArea falls to 1 or the realised lap passes 600 s"
    },
    "invariants": [
      "lapFloorSeconds <= every laps[].realisedLapSeconds <= lapCeilingSeconds",
      "every laps[].underbuyLapSeconds <= lapCeilingSeconds, with margin at least arrivalCeilingMarginTarget",
      "every laps[].purchaseCadenceSeconds <= aboveTickGapMaxSeconds",
      "laps[3].cumulativeSeconds <= sessionBandSeconds[0] < laps[4].cumulativeSeconds",
      "laps[7].cumulativeSeconds <= sessionBandSeconds[1] < laps[7].cumulativeSeconds + laps[bay].realisedLapSeconds",
      "coincidentOnsetSeparationSeconds is inside coincidentOnsetSeparationRange",
      "milestones[] is sorted ascending by baseSeconds and every row carries both populations"
    ]
  }
}
```

## Revision requests

| key / file | field | current | requested | why |
|---|---|---|---|---|
| `firstSession` (`onboarding/02`) | `beats[firstSpendAffordable].testRange` | [40.0, 120.0] | **[10.0, 120.0]** | see `## Pushing back`. 10.0 is that key's own `secondsToFirstReveal` ceiling, so the purchase can never precede the first Find |
| `firstSession` | `beats[]` ordering note | beats are listed in one order for all players | add: "the order is stated for a base player; a `Span` owner reaches `firstSpendAffordable` before `tierContrast`" | a throughput multiplier reorders two beats and no sheet says so |
| `core-loop/04` | complete laps in a bound session | three to seven | **four to eight** | see `## Pushing back` |
| `core-loop/04` | depth-1 lap target | "one depth-1 lap targets 165 seconds" | keep 165 s, restate as the **arrival** lap and add the realised figure, 141.5 s | `depths.sizingRule` reads it as the arrival lap and the sheet reads it as wall clock; they differ by 13.5% |

The endless bay's 44 chunks follow from the two margin targets above and are **already carried in
`solvency` (sheet `03`)**. That is my own key, so it is applied rather than requested.

## Pushing back

**`gameplay/core-loop/04-lap-vs-session`, its Decision that "a bound session is three to seven
complete laps plus one in progress".** That sheet ceded "the lap-length figure itself once
measured", not the lap count, so this is a reversal and not a value revision. It divides the
session by the arrival lap; the realised lap is 0.865× it because throughput rises inside an
area, and eight areas take 1,103.7 s rather than 1,275.8. A 600-second session therefore holds
four complete laps and a 1,200-second one holds eight. **The shape is untouched:** the boundary
still falls strictly inside a lap, laps still span sessions, and area completion is still a
repeating beat rather than a climax.

**`gameplay/onboarding/02-first-minute-beats`, `beats[firstSpendAffordable].testRange`
[40, 120] — and I decline the alternative of paying for it in the cost curve.** The verification
offered two routes: revise this range, or floor the cheapest `costBase` at about 177. I take the
first, and the arithmetic for the second is why. **`firstSession` states when the first purchase
should land twice, and the two disagree.** `firstPurchaseBand` requires at least 10 patches of
clearing — 11.6 s at depth-1 expected value — while the beat's range forbids anything under 40 s.
The band is the statement with a derivation attached ("so the loop's fourth step has an event
inside minute 1"); the range has none. **The cost of honouring the range instead:** floored at
177, the ladder's whole trajectory slows by about a round per area, income for areas 1 to 7 falls
from 71,233 to about 45,800, the ladder is **29% bought at 24 of 24 rather than 39%**, areas 1
and 2 collapse to the same footprint under chunk quantisation, and the post-terminal bay's
throughput window widens past what a single bay size can hold inside 75–200 s. That is four
regressions bought with one unsourced number.

**What I do pay:** sheet `03` raises `value.costBase` 75 → 95, which moves the base first
purchase to 21.5 s and the purchaser's to 12.3 s — **past `secondsToFirstReveal`**, which is the
genuinely load-bearing half of the finding. A purchaser still reaches `firstSpendAffordable`
before `tierContrast`; no `costBase` inside `firstPurchaseBand` prevents that, since 45 s of
purchaser clearing is 348 currency against the band's own 206.9 ceiling. It is stated in the beat
list rather than engineered away.

## Consequences for other work

- **Payoff-cadence work (`core-loop/01`)** gets its two ceilings back as data with the realised
  figures beside them, and one correction: the 90-second rule is carried by **purchase cadence**,
  not by reveal spacing, because the worst reveal gap is 99.7 s. A later change to the cost curve
  can reopen it, which `solvency.tests.S5` guards.
- **Bay-geometry work (`meta/06`)** inherits two figures it did not have: the end-of-lap
  walk-back at 900 and 1,320 studs, which `tickGapRealisedSeconds` explicitly excludes, and the
  precision horizon moving to the 13th endless bay.
- **Onboarding work (`firstSession`)** gets one widened range and one ordering note, and keeps
  every ceiling, every guarantee and the whole `withheld` list.
- **Analytics — Funnels (wave 5)** inherits ten instruments with units and populations.
  `firstClear` is input-relative and everything else join-relative, per `firstSession`.
- **Endgame work (`endgame`)** gets the figure its guard needs: the above-tick rule is scoped off
  at 1,069.2 s, and **a second scoping is needed at ladder exhaustion (1,513 s)**, after which a
  post-terminal bay's only above-tick payoff is its completion, 155.7 s apart.
- **Audio and feedback work** gets 0.35 s as the coincident onset separation and a reveal heard
  24 times over 17.8 minutes.
- **Meta & Content** should note that the whole specced game is 18.4 minutes. R-3 declined
  expanding past eight areas and this sheet does not reopen it; the figure is published so the
  decision is made against a number.

## Acceptance criteria

1. Every `laps[].realisedLapSeconds` is between 75 and 200, and every `laps[].underbuyLapSeconds`
   is at most 200 with a margin of at least 0.05 — the minimum is 187.1 s at the endless bay.
2. Every `laps[].purchaseCadenceSeconds` is at most `aboveTickGapMaxSeconds` (90); the maximum is
   38.9 s at the endless bay, and the maximum `revealGapMaxSeconds` is 99.7 s, which alone
   exceeds it.
3. `laps[3].cumulativeSeconds` (536.1) ≤ 600 < `laps[4].cumulativeSeconds` (683.2), and
   `laps[7].cumulativeSeconds` (1,103.7) ≤ 1,200 < 1,103.7 + `laps[bay].realisedLapSeconds`
   (1,259.4) — four complete laps at the session floor, eight at the ceiling.
4. `milestones[]` contains ten rows, each with a `baseSeconds` and a `purchaserSeconds`, sorted
   ascending by `baseSeconds`, with `firstPurchase` strictly greater than
   `firstSession.ceilings.secondsToFirstReveal` (10.0) for both populations.

## Not decided here

What a patch pays (sheet `02`). Every cost and rung count, and the footprints and patch counts
this clock is walked over (sheet `03`). Every multiplier and every ceiling (sheet `04`). How many
areas exist and what unlocks each (`gameplay/meta/04`). How many Finds an area buries
(`gameplay/meta/02`). The bay lengths and the opening count that set the walk-back
(`gameplay/meta/06`). What any beat sounds or looks like (Audio, Art — VFX, UI/UX). Whether any
row here is instrumented and at what pass mark (Analytics — Funnels, wave 5). Whether the game
should be longer than 18 minutes (ruling R-3, declined; the developer's, not a writer's).
