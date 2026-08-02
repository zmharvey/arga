# 04 — Drop-off thresholds, and what a tripped one does

**Domain:** analytics/funnels · **Category:** Analytics · **Wave:** 5

## Decision

**Sixteen thresholds, each with a pass mark, an alarm and a named action — and every action is a
revision request against one named sheet and one named field path, never a change to the live
game.** Fourteen are rates or percentiles and may not be read below **200 armed run-1 sessions**
`[playtest unknown]`, test range `[100, 500]`; **two are count invariants** and are read at n = 1.
Twelve actions are forbidden outright.

> **Revised, round 1** (`cid/analytics/_verified.md`). RR-12: `T5`'s P90 pass mark and its
> `headline` flag are **withdrawn** — that number is `kpis.rows[secondsToFirstReveal]`'s. RR-13: the
> minimum-sample arithmetic was falsified by my own table and is corrected; `T1` becomes a count
> invariant rather than a 0.5-point rate it could never resolve. RR-11: `T12` is rewritten over
> `01`'s replacement ordering instrument. Seventeen rows become sixteen.

## Why

**"Triggers action" has exactly one legal meaning here.** *"Success is **shipped artifacts, not
players**"* `[brief: binding]` ← `[you chose: R1 Q3]` (`00-CORE.md`), with retention and revenue
both *"Offered and declined"*, and *"Ships and settles. No seasons or events"* `[brief: soft]`
(`OPEN.md §2`). A project with no live-service loop cannot answer a measurement with a live-service
lever. So a tripped alarm produces **a revision request against a design prediction**: the sheet
owning the number, the field path inside it, and the direction — the form `_verified-wave4.md`
already issues sixteen of. `[cid: decided]`

**A drop-off is a player who stopped, never a player who lost.** *"There is no failure state. No
death, no losing, no loss of progress"* and *"A stuck player cannot exist"* `[brief: soft]` ←
`[you accepted: step 6 Q2]` (`02-GAMEPLAY.md`). Every row is a proportion that reached a step, and
`X10` forbids the other vocabulary anywhere. That is not a wording preference: calling a drop-off a
failure is what makes a retention fix look like the obvious response, and the retention fix is a
declined goal.

**All sixteen marks are invented, so the action column is the load-bearing one.** Nothing in four
waves states a pass mark for anything; every one is `[playtest unknown]` with a starting value and a
test range. What is not invented is the routing — each action names a field that exists.

**Ceilings and bands are revised differently, and mixing them was the easy mistake.**
`firstSession.ceilings.secondsToFirstReveal` carries the brief's ten-second promise `[brief: soft]` ←
`[you accepted: R6 Q3]` (`02-GAMEPLAY.md`). **A brief promise is not moved by a measurement**: the
action moves the design that must meet it, and relaxing the ceiling needs a `## Pushing back` from
`firstSession`'s owner. The three `beats[].testRange` bands are `[cid: decided]` predictions and may
themselves be revised. **Corrected this round:** that reasoning is right, but the reveal ceiling's
pass mark is not mine to set. `funnels/01` says KPI *"sets the headline target"* and
`kpis/02` row 3 warns that a second pass mark on the same quantity means one number with two
answers. `T5` is withdrawn to `noPassMark[]` and points at the KPI row; `T4`'s reach threshold
stays, because a reach rate and a P90 are different quantities.

**One alarm is blocking and the rest are not.** `firstSession.teaching[contactClearing].required` is
the only `true`, on `onboarding/03`'s ground that a player who does not know walking is the verb
produces zero clears and the design never starts. `T13` is that row. Every other comprehension
alarm is advisory, and `K2` forbids the response that suggests itself — no nudge, no hint, no
first-run string.

**The minimum sample is a real gate, and my first statement of it was false.** I wrote that the
smallest pass-to-alarm gap was 10 points; `T1`'s was **0.5** and `T12`'s was **5**, so `T1` could
not have been separated from its alarm at any plausible sample. **The fix is not a bigger sample, it
is the right shape:** a join that produces no spawn, and an ownership boolean true while every
`gamePassId` is null, are **build defects, not player rates**. Both become count invariants — pass
0, alarm ≥ 1, read at n = 1 — which is the form `T17` already had. Every remaining rate row now
carries a gap of at least 10 points. At n = 200 the binomial standard error is
`sqrt(p(1−p)/200)`, giving a 95% interval of about ±5 points at p ≈ 0.85, ±4 at 0.90 and ±3 at 0.95,
so **every rate row is resolvable at the stated minimum and none is marginal.** The choice of 200
rather than 150 or 300 remains `[playtest unknown]`. The project's only empirical reading is
`cid/_playtest.md`'s 2026-08-01 session: **n = 1, untimed.** **Two platform floors sit under it**:
charts populate up to 24 hours late and events expire 90 days from last data
`[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/production/analytics/event-types.md]`.
`kpis` states a precedence rule for the two `minimumSessions` in this category — the larger governs
— and I adopt it rather than restating one.

**Which thresholds move if RR-10 lands.** `_verified-wave4.md` RR-10 resolves either
`firstSession.beats[firstSpendAffordable].testRange` or the cheapest `upgrades[].costBase`. **`T11`
points at the first and `T12` at the ordering it implies**; both follow the field, never a copied
number. Wave 4 is **FAIL and unreleased**, so no figure from `pacing`, `firstSession` or `solvency`
is reproduced anywhere here.

**Nothing here is a shortlist.** Which of these sixteen is promoted, on what cadence and on which
surface, is dashboard-and-target work.

| id | instrument | pass mark | alarm | action if the alarm trips — sheet · field · direction | blocking |
|---|---|---|---|---|---|
| `T1` | sessions with a join and no spawn — **a count invariant, not a rate** | 0 | ≥ 1 | `gameplay/meta/06` · `plots.spawn` — a join that produces no spawn is a build defect, not a player behaviour | no |
| `T2` | `steps[firstClear]` reach, of `run1SessionsArmed` | ≥ 0.90 | < 0.80 | `gameplay/onboarding/02` · `firstSession.placement.spawnToNearestPatchMaxStuds` — lower it | no |
| `T3` | `steps[firstClear]` P90 seconds from the arm transition | ≤ `firstSession.ceilings.secondsToFirstClear.max` | P90 > that value | `gameplay/onboarding/02` · `firstSession.armDistanceStuds` — lower it; second resort `gameplay/core-loop/01`'s 3-second payoff rule, which set the ceiling | no |
| `T4` | `steps[firstReveal]` reach, of `run1SessionsArmedByJoinSecond5` | ≥ 0.90 | < 0.80 | `gameplay/onboarding/01` · `onboarding` first-Find placement — the reveal is guaranteed, so a shortfall is a placement or layout defect | no |
| `T6` | `steps[firstOrdinaryClear]` reach, of `run1Sessions` | ≥ 0.85 | < 0.70 | `gameplay/onboarding/02` · `firstSession.placement.secondFindOrdinalMin` — raise it | no |
| `T7` | `steps[firstOrdinaryClear]` median seconds from join | inside `firstSession.beats[firstOrdinaryClear].testRange` | median outside it | `gameplay/onboarding/02` · `firstSession.beats[firstOrdinaryClear].testRange` — widen or re-centre; the band is a prediction and may itself be revised | no |
| `T8` | `steps[tierContrast]` reach, of `run1Sessions` | ≥ 0.70 | < 0.50 | `gameplay/onboarding/02` · `firstSession.placement.tierContrastWithinFirstOrdinals` — lower it; second resort `gameplay/balance/02` · `tierMix.byDepth[1]` | no |
| `T9` | `steps[tierContrast]` median seconds from join | inside `firstSession.beats[tierContrast].testRange` | median outside it | `gameplay/onboarding/02` · `firstSession.beats[tierContrast].testRange` | no |
| `T10` | `steps[firstSpendAffordable]` reach, of `run1Sessions` | ≥ 0.50 | < 0.30 | `gameplay/balance/03` · the cheapest `upgrades[].costBase` — lower it, inside `firstSession.firstPurchaseBand` | no |
| `T11` | `steps[firstSpendAffordable]` median seconds from join | inside `firstSession.beats[firstSpendAffordable].testRange` | median outside it | whichever field `_verified-wave4.md` RR-10 settles on | no |
| `T12` | share of sessions in which `orderingInstrument`'s value is 0 — **the custom event, not the funnel graph** | ≥ 0.95 | < 0.85 | the same RR-10 field as `T11`. **This is the only instrument that can see the defect in production**, because the funnel graph auto-completes skipped steps and a skipped step carries no field | no |
| `T13` | `comprehension[contactClearing]` predicate satisfied, of sessions reaching `firstClear` | ≥ 0.85 | < 0.70 | `gameplay/mechanics/01` · `movement.baseClearRadius` and `gameplay/onboarding/02` · `firstSession.armDistanceStuds` | **yes** |
| `T14` | `comprehension[theFind]` proxy satisfied | ≥ 0.60 | < 0.40 | `gameplay/onboarding/02` · `firstSession.placement.secondFindOrdinalMin` | no |
| `T15` | `comprehension[areaCompletion]` proxy satisfied, of sessions ≥ 300 s | ≥ 0.60 | < 0.40 | `gameplay/balance/05` · `pacing.lapTargetSeconds`; second resort `gameplay/meta/04` · `depths.areas[1]` footprint | no |
| `T16` | `comprehension[depth]` satisfied, of `run1Sessions` | ≥ 0.35 | < 0.15 | `gameplay/balance/05` · `pacing.laps[].realisedLapSeconds` against `pacing.sessionBandSeconds` — the lap is too long for the session band | no |
| `T17` | `ownedAtJoin` true for any player while every `products.items[].gamePassId` is `null` — **a count invariant** | 0 | ≥ 1 | `gameplay/monetization/01` · `products.items[].gamePassId`, or `Entitlements.ownsProduct` — a true here is a build or provisioning defect | no |

| instrument deliberately given **no** pass mark | why |
|---|---|
| `steps[firstReveal].secondsP90` (the former `T5`) | the P90 of this quantity is `kpis.rows[secondsToFirstReveal]`. `funnels` defines the step, the origin and the population and sets no mark on it; `T4`'s reach rate is a different quantity and stays |
| `comprehension[currency]` | entailed by `contactClearing`; a mark would be `T13` under a second name (`K4`) |
| `comprehension[upgradeAxes]` | the same quantity as `steps[firstSpendAffordable]`, scored once at `T10`/`T11` (`K5`) |
| `comprehension[sets]` | unobservable. The action is a requirement on event-catalog and protocol work, not a number |
| `pacing.milestones[].purchaserSeconds`, all ten rows | the `spanOwners` population is definable and empty until `products.externalPrerequisite` is met (sheet `03`) |

| id | an action a tripped threshold may **never** trigger | closed by |
|---|---|---|
| `X1` | any change whose stated purpose is to raise return rate or retention | `00-CORE.md` non-goal, *"Beating the genre's retention curve. Offered and declined"* `[brief: binding]` |
| `X2` | a daily reward, login streak, login window or streak counter | `03-META.md` priority 3 |
| `X3` | a season, event, calendar or limited-time anything | `03-META.md` priority 3; `OPEN.md §2` *"Ships and settles"* |
| `X4` | a leaderboard, ranking, percentile or any figure comparing one player to another | `03-META.md` priority 3; `theme/tone/04` `X10` |
| `X5` | an offline grant, banked accrual or away-time reward | cut, follows from *"Cleared is permanent"* `[brief: binding]` |
| `X6` | a rebirth, prestige, reset or any progress-clearing cycle | `[you chose: R2 Q2]` |
| `X7` | an in-game store, offer row, purchase prompt, price string or product mention | ruling R-4; `products.forbidden` `F13`, `F19` |
| `X8` | displaying any funnel figure, rate, count or percentile to a player | `theme/tone/04` `X10`, *"Measure freely, display none of it"* |
| `X9` | a code entry, trade, gift or transfer between players | `03-META.md` priority 3; `social.forbidden` |
| `X10` | describing a drop-off as a failure, a loss, a churn event or a stuck player, in any sheet, report or dashboard label | `02-GAMEPLAY.md`, *"There is no failure state"*, *"A stuck player cannot exist"* |
| `X11` | adding a tip, hint, nudge, arrow, prompt, first-run string or tutorial step to raise a step's rate | `firstSession.tutorialDevicesForbidden` `T1`–`T12`; `onboarding/03` `T5` |
| `X12` | an A/B price variant, a discount or a second price point | one product, one price; `products.forbidden` `F12` |

```json
{
  "amends": "funnels",
  "value": {
    "actionSemantics": {
      "definition": "A tripped alarm produces a revision request against one named sheet and one named field path, in a stated direction. It never produces a change to a live game, a player-facing surface, or a system this project does not contain.",
      "why": "00-CORE.md binds success to shipped artifacts, not players, and declines retention and revenue as goals; OPEN.md §2 states there is no live-ops loop to feed.",
      "form": "the same revision-request form cid/gameplay/_verified-wave4.md already uses",
      "actor": "the kind of work that owns the named field, per OPEN.md §4's convention; the only human actor in this project is the developer"
    },
    "minimumSessions": {
      "value": 200,
      "unit": "armed run-1 sessions",
      "testRange": [100, 500],
      "status": "playtest unknown",
      "appliesTo": "every threshold whose kind is rate or percentile",
      "rule": "No rate, proportion or percentile in funnels.thresholds[] may be read, reported or acted on below this count. Below it the only legal output is the raw count.",
      "arithmetic": "the binomial standard error at n = 200 is sqrt(p(1-p)/200), so the 95% interval is about +/- 5 percentage points at p = 0.85, +/- 4 at 0.90 and +/- 3 at 0.95. Every threshold of kind rate carries a pass-to-alarm gap of at least 10 points, so every one is resolvable at this minimum.",
      "correctedFrom": "the first draft asserted the smallest gap was 10 points; T1's was 0.5 and T12's was 5. T1 is now a count invariant and T12's gap is 10. cid/analytics/_verified.md RR-13.",
      "invariantException": { "appliesTo": ["T1", "T17"], "minimumSessions": 1, "why": "both are counts of a build defect, not rates of a player behaviour; a single occurrence is the finding" },
      "precedenceAcrossKeys": "kpis states the rule that where two keys publish a minimumSessions the larger governs; this key adopts it and does not restate a second rule",
      "baselineEvidence": { "source": "cid/_playtest.md, 2026-08-01", "n": 1, "timed": false },
      "platformFloors": [
        { "rule": "no threshold may be read same-day", "because": "events are aggregated daily and charts may take up to 24 hours to populate" },
        { "rule": "no reading window may exceed 90 days", "because": "events expire 90 days from last data received" }
      ],
      "source": "https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/production/analytics/event-types.md"
    },
    "thresholds": [
      { "id": "T1", "kind": "countInvariant", "instrument": "count of sessions with a join and no spawn", "population": "allSessions", "passMark": 0, "alarm": 1, "comparator": "atMost", "minimumSessions": 1, "status": "structural", "action": { "sheet": "cid/gameplay/meta/06-plot-arrangement.md", "field": "plots.spawn", "direction": "investigate; a join that produces no spawn is a build defect, not a player behaviour" }, "blocking": false, "readableToday": false },
      { "id": "T2", "kind": "rate", "instrument": "funnels.onboarding.steps[firstClear].reach", "population": "run1SessionsArmed", "passMark": 0.90, "alarm": 0.80, "comparator": "atLeast", "gapPoints": 10, "testRange": [0.75, 0.97], "status": "playtest unknown", "action": { "sheet": "cid/gameplay/onboarding/02-first-minute-beats.md", "field": "firstSession.placement.spawnToNearestPatchMaxStuds", "direction": "lower" }, "blocking": false, "readableToday": false },
      { "id": "T3", "kind": "percentile", "instrument": "funnels.onboarding.steps[firstClear].secondsP90", "population": "run1SessionsArmed", "passMarkRef": "firstSession.ceilings.secondsToFirstClear.max", "comparator": "atMost", "alarm": "P90 exceeds passMarkRef", "status": "playtest unknown", "originCaveat": "measured from the arm transition, which is strictly later than first input, so this reading is biased low and flatters the ceiling", "action": { "sheet": "cid/gameplay/onboarding/02-first-minute-beats.md", "field": "firstSession.armDistanceStuds", "direction": "lower", "secondResort": { "sheet": "cid/gameplay/core-loop/01-payoff-frequency.md", "field": "the 3-second payoff rule that set this ceiling" } }, "blocking": false, "readableToday": false },
      { "id": "T4", "kind": "rate", "instrument": "funnels.onboarding.steps[firstReveal].reach", "population": "run1SessionsArmedByJoinSecond5", "passMark": 0.90, "alarm": 0.80, "comparator": "atLeast", "gapPoints": 10, "testRange": [0.80, 0.99], "status": "playtest unknown", "action": { "sheet": "cid/gameplay/onboarding/01-first-find.md", "field": "onboarding first-Find placement", "direction": "investigate; the first reveal is guaranteed, so a shortfall is a placement or layout defect" }, "blocking": false, "readableToday": false },
      { "id": "T6", "kind": "rate", "instrument": "funnels.onboarding.steps[firstOrdinaryClear].reach", "population": "run1Sessions", "passMark": 0.85, "alarm": 0.70, "comparator": "atLeast", "gapPoints": 15, "testRange": [0.65, 0.95], "status": "playtest unknown", "action": { "sheet": "cid/gameplay/onboarding/02-first-minute-beats.md", "field": "firstSession.placement.secondFindOrdinalMin", "direction": "raise" }, "blocking": false, "readableToday": false },
      { "id": "T7", "kind": "percentile", "instrument": "funnels.onboarding.steps[firstOrdinaryClear].secondsMedian", "population": "run1Sessions", "passMarkRef": "firstSession.beats[firstOrdinaryClear].testRange", "comparator": "inside", "alarm": "median outside the referenced range", "status": "playtest unknown", "action": { "sheet": "cid/gameplay/onboarding/02-first-minute-beats.md", "field": "firstSession.beats[firstOrdinaryClear].testRange", "direction": "widen or re-centre; the band is a prediction and may itself be the thing revised" }, "blocking": false, "readableToday": false },
      { "id": "T8", "kind": "rate", "instrument": "funnels.onboarding.steps[tierContrast].reach", "population": "run1Sessions", "passMark": 0.70, "alarm": 0.50, "comparator": "atLeast", "gapPoints": 20, "testRange": [0.45, 0.90], "status": "playtest unknown", "action": { "sheet": "cid/gameplay/onboarding/02-first-minute-beats.md", "field": "firstSession.placement.tierContrastWithinFirstOrdinals", "direction": "lower", "secondResort": { "sheet": "cid/gameplay/balance/02-patch-payout-and-depth-mix.md", "field": "tierMix.byDepth[1]" } }, "blocking": false, "readableToday": false },
      { "id": "T9", "kind": "percentile", "instrument": "funnels.onboarding.steps[tierContrast].secondsMedian", "population": "run1Sessions", "passMarkRef": "firstSession.beats[tierContrast].testRange", "comparator": "inside", "alarm": "median outside the referenced range", "status": "playtest unknown", "action": { "sheet": "cid/gameplay/onboarding/02-first-minute-beats.md", "field": "firstSession.beats[tierContrast].testRange", "direction": "widen or re-centre" }, "blocking": false, "readableToday": false },
      { "id": "T10", "kind": "rate", "instrument": "funnels.onboarding.steps[firstSpendAffordable].reach", "population": "run1Sessions", "passMark": 0.50, "alarm": 0.30, "comparator": "atLeast", "gapPoints": 20, "testRange": [0.25, 0.75], "status": "playtest unknown", "action": { "sheet": "cid/gameplay/balance/03-ladder-solvency.md", "field": "the cheapest upgrades[].costBase", "direction": "lower, staying inside firstSession.firstPurchaseBand" }, "blocking": false, "readableToday": false },
      { "id": "T11", "kind": "percentile", "instrument": "funnels.onboarding.steps[firstSpendAffordable].secondsMedian", "population": "run1Sessions", "passMarkRef": "firstSession.beats[firstSpendAffordable].testRange", "comparator": "inside", "alarm": "median outside the referenced range", "status": "playtest unknown", "movesIf": "_verified-wave4.md RR-10", "action": { "sheet": "whichever of cid/gameplay/onboarding/02-first-minute-beats.md or cid/gameplay/balance/03-ladder-solvency.md RR-10 settles on", "field": "firstSession.beats[firstSpendAffordable].testRange or the cheapest upgrades[].costBase", "direction": "follow RR-10's resolution; this row points at the field and never at a number" }, "blocking": false, "readableToday": false },
      { "id": "T12", "kind": "rate", "instrument": "share of sessions in which funnels.onboarding.orderingInstrument's custom-event value is 0", "population": "run1Sessions in which the ordering instrument fired", "passMark": 0.95, "alarm": 0.85, "comparator": "atLeast", "gapPoints": 10, "testRange": [0.80, 0.99], "status": "playtest unknown", "notReadFromTheFunnelGraph": "the funnel auto-completes skipped steps and a skipped step carries no custom field, so step order is not observable inside the funnel API at all; this row reads a LogCustomEvent value instead", "movesIf": "_verified-wave4.md RR-10", "action": { "sheet": "the same sheet RR-10 settles on", "field": "the same field as T11", "direction": "follow RR-10's resolution" }, "blocking": false, "readableToday": false },
      { "id": "T13", "kind": "rate", "instrument": "funnels.comprehension[contactClearing] predicate satisfied", "population": "sessions reaching funnels.onboarding.steps[firstClear]", "passMark": 0.85, "alarm": 0.70, "comparator": "atLeast", "gapPoints": 15, "testRange": [0.65, 0.95], "status": "playtest unknown", "action": { "sheet": "cid/gameplay/mechanics/01-reach-and-pace.md and cid/gameplay/onboarding/02-first-minute-beats.md", "field": "movement.baseClearRadius and firstSession.armDistanceStuds", "direction": "raise the radius, lower the arm distance" }, "blocking": true, "blockingReason": "firstSession.teaching[contactClearing].required is the only true in the array; onboarding/03 states that a player who does not know walking is the verb produces zero clears and the design never starts", "readableToday": false },
      { "id": "T14", "kind": "rate", "instrument": "funnels.comprehension[theFind] proxy satisfied", "population": "sessions reaching funnels.onboarding.steps[firstOrdinaryClear]", "passMark": 0.60, "alarm": 0.40, "comparator": "atLeast", "gapPoints": 20, "testRange": [0.35, 0.80], "status": "playtest unknown", "action": { "sheet": "cid/gameplay/onboarding/02-first-minute-beats.md", "field": "firstSession.placement.secondFindOrdinalMin", "direction": "raise; this row measures the abundance correction that ordinal band exists to make" }, "blocking": false, "readableToday": false },
      { "id": "T15", "kind": "rate", "instrument": "funnels.comprehension[areaCompletion] proxy satisfied", "population": "sessions of at least 300 seconds reaching funnels.onboarding.steps[firstClear]", "passMark": 0.60, "alarm": 0.40, "comparator": "atLeast", "gapPoints": 20, "testRange": [0.35, 0.85], "status": "playtest unknown", "action": { "sheet": "cid/gameplay/balance/05-time-to-milestone.md", "field": "pacing.lapTargetSeconds", "direction": "lower", "secondResort": { "sheet": "cid/gameplay/meta/04-the-depth-ladder.md", "field": "depths.areas[1] footprint" } }, "blocking": false, "readableToday": false },
      { "id": "T16", "kind": "rate", "instrument": "funnels.comprehension[depth] satisfied", "population": "run1Sessions", "passMark": 0.35, "alarm": 0.15, "comparator": "atLeast", "gapPoints": 20, "testRange": [0.10, 0.60], "status": "playtest unknown", "action": { "sheet": "cid/gameplay/balance/05-time-to-milestone.md", "field": "pacing.laps[].realisedLapSeconds against pacing.sessionBandSeconds", "direction": "lower the lap; a first session that never reaches area 2 means the lap is too long for the session band" }, "blocking": false, "readableToday": false },
      { "id": "T17", "kind": "countInvariant", "instrument": "count of sessions where funnels.purchase.liveReading ownedAtJoin is span while every products.items[].gamePassId is null", "population": "allSessions", "passMark": 0, "alarm": 1, "comparator": "atMost", "minimumSessions": 1, "status": "structural", "action": { "sheet": "cid/gameplay/monetization/01-the-offer-ladder.md", "field": "products.items[].gamePassId, or server/Entitlements.luau :: ownsProduct", "direction": "investigate; a span reading here is a build or provisioning defect and never a player behaviour" }, "blocking": false, "readableToday": true }
    ],
    "noPassMark": [
      { "instrument": "funnels.onboarding.steps[firstReveal].secondsP90", "formerId": "T5", "reason": "the P90 of this quantity is kpis.rows[secondsToFirstReveal]; funnels defines the step, its origin and its population and sets no mark on it", "ownedBy": "kpis.rows[secondsToFirstReveal]", "withdrawnIn": "cid/analytics/_verified.md RR-12", "reachRateStillHere": "T4, which is a different quantity" },
      { "instrument": "funnels.comprehension[currency]", "reason": "entailed by contactClearing; a mark on it would be T13 under a second name", "rule": "K4" },
      { "instrument": "funnels.comprehension[upgradeAxes]", "reason": "the same quantity as funnels.onboarding.steps[firstSpendAffordable], scored once at T10 and T11", "rule": "K5" },
      { "instrument": "funnels.comprehension[sets]", "reason": "unobservable; the action is a requirement on event-catalog and protocol work, not a number" },
      { "instrument": "pacing.milestones[].purchaserSeconds, all ten rows", "reason": "the spanOwners population is definable and empty until products.externalPrerequisite is met" }
    ],
    "forbiddenActions": [
      { "id": "X1", "action": "any change whose stated purpose is to raise return rate or retention", "closedBy": "00-CORE.md non-goal: 'Beating the genre's retention curve. Offered and declined' [brief: binding]" },
      { "id": "X2", "action": "a daily reward, login streak, login window or streak counter", "closedBy": "03-META.md priority 3" },
      { "id": "X3", "action": "a season, event, calendar or limited-time anything", "closedBy": "03-META.md priority 3; OPEN.md §2 'Ships and settles. No seasons or events'" },
      { "id": "X4", "action": "a leaderboard, ranking, percentile or any figure comparing one player to another", "closedBy": "03-META.md priority 3; theme/tone/04 X10" },
      { "id": "X5", "action": "an offline grant, banked accrual or away-time reward", "closedBy": "cut; follows from 'Cleared is permanent' [brief: binding]" },
      { "id": "X6", "action": "a rebirth, prestige, reset or any progress-clearing cycle", "closedBy": "03-META.md priority 3 [you chose: R2 Q2]" },
      { "id": "X7", "action": "an in-game store, offer row, purchase prompt, price string or product mention", "closedBy": "coordinator ruling R-4; products.forbidden F13 and F19" },
      { "id": "X8", "action": "displaying any funnel figure, rate, count or percentile to a player", "closedBy": "theme/tone/04 X10, 'Measure freely, display none of it'" },
      { "id": "X9", "action": "a code entry, trade, gift or transfer between players", "closedBy": "03-META.md priority 3; social.forbidden" },
      { "id": "X10", "action": "describing a drop-off as a failure, a loss, a churn event or a stuck player in any sheet, report or dashboard label", "closedBy": "02-GAMEPLAY.md, 'There is no failure state' and 'A stuck player cannot exist'" },
      { "id": "X11", "action": "adding a tip, hint, nudge, arrow, prompt, first-run string or tutorial step to raise a step's rate", "closedBy": "firstSession.tutorialDevicesForbidden T1-T12; onboarding/03 T5" },
      { "id": "X12", "action": "an A/B price variant, a discount or a second price point", "closedBy": "products has one item at one price; products.forbidden F12" }
    ]
  }
}
```

## Consequences for other work

- **Dashboard-and-target work (KPI)** takes the `secondsToFirstReveal` P90 outright: it is in my
  `noPassMark[]` pointing at `kpis.rows[secondsToFirstReveal]`, so one quantity now has one answer.
  It selects its remaining headline rows from the sixteen and owns cadence and layout. Its
  `minimumSessions` precedence rule governs where the two keys differ.
- **Event-catalog work** learns that `T12` reads a `LogCustomEvent` value, not a funnel breakdown,
  so the ordering instrument `funnels/01` specifies needs one catalog entry with a numeric value and
  zero custom fields. No threshold here needs a per-occurrence event: every one is a proportion, a
  percentile or a count over once-per-session emissions.
- **Number-and-curve work (Balance)** inherits eleven of the sixteen actions. Nine name a
  `firstSession` field, two name `pacing`, one names `upgrades[].costBase`, and `T11` and `T12` are
  addressed to whichever field RR-10 settles on.
- **Onboarding work** inherits the asymmetry: the two `ceilings` are not revisable by a threshold,
  the three `beats[].testRange` bands are.
- **Whoever reports a measurement anywhere in this project** inherits `X10`: a drop-off is a player
  who stopped. There is nothing in this game to lose.
- **Run-state work** gets a use for `cid/_playtest.md`: `minimumSessions.baselineEvidence` cites it
  directly, which is what that file was created for.

## Acceptance criteria

1. `funnels.thresholds[]` has 16 entries; every entry has a non-null `passMark` or `passMarkRef`, a
   non-null `alarm`, a `kind` of `rate`, `percentile` or `countInvariant`, and an `action` object
   carrying both a `sheet` and a `field`.
2. Every entry of `kind: "rate"` has `gapPoints` ≥ 10; every entry of `kind: "countInvariant"` has
   `passMark: 0`, `alarm: 1` and `minimumSessions: 1`; and no entry sets a pass mark on
   `steps[firstReveal].secondsP90`.
3. Exactly one entry has `blocking: true` and it is `T13`, whose instrument is
   `funnels.comprehension[contactClearing]`.
4. `funnels.forbiddenActions[]` has 12 entries, each with a non-empty `closedBy`, and no `action`
   string in `funnels.thresholds[]` matches any of them.
5. No prose line, table cell or manifest field in this sheet contains a numeric value copied from
   `pacing`, `firstSession`, `solvency`, `tierMix` or `axisBudget`; every reference is a field path.

## Not decided here

The KPI shortlist, review cadence, dashboard layout, and the `secondsToFirstReveal` P90 target and
alarm (dashboard-and-target work, which now owns that quantity outright). The step order, origins
and populations, and the ordering instrument's value semantics (`01`, this domain). The
comprehension dispositions and their countable forms (`02`, this domain). Whether a purchase funnel
exists (`03`, this domain — it does not). Which way `_verified-wave4.md` RR-10 settles
(number-and-curve work and onboarding work, the two named owners). Every value the actions point at
— `firstSession`, `pacing`, `upgrades`, `tierMix`, `depths`, `movement` all belong to their owners
and this sheet moves none of them. Long-run retention definitions and churn windows (engagement
work). Whether the telemetry module is built at all (logging-pipeline work). `social.maxPlayers`
(per-server-capacity work).
