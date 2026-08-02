# 04 — Drop-off thresholds, and what a tripped one does

**Domain:** analytics/funnels · **Category:** Analytics · **Wave:** 5

## Decision

**Sixteen thresholds, each with a pass mark, an alarm and a named action — and every action is a
revision request against one named sheet and one named field path, never a change to the live
game.** Fourteen are rates and may not be read below **200 armed run-1 sessions** `[playtest
unknown]`, test range `[100, 500]`; **two are count invariants** and are read at n = 1. Twelve
actions are forbidden outright.

> **Revised, round 2** (`cid/analytics/_verified.md`). `T3` had no carrier and no resolving
> boundary; it is **rebuilt as a rate over the lowest bucket** now that `01`'s bucket field is
> per-step in origin and split at both ceilings. Every remaining time row is converted from a
> median-in-band to a **bucket-overlap rate**, with the resolution limit that forces it stated as a
> rule. Five acceptance criteria become four.

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
`X10` forbids the other vocabulary anywhere. Calling a drop-off a failure is what makes a retention
fix look like the obvious response, and the retention fix is a declined goal.

**All sixteen marks are invented, so the action column is load-bearing.** Every one is
`[playtest unknown]` with a starting value and a test range. What is not invented is the routing:
each action names a field that exists.

**Every time row is a rate now, because a bucket cannot yield a percentile — corrected this round.**
`T3` asked for a P90 in seconds since the arm transition, and nothing carried that: the only carrier
of per-step elapsed time declared its unit as seconds since *join*, and the arm transition is
explicitly not a step. `01` fixes the carrier — the bucket's origin is now the step's own
`measuredFrom` — and splits the bottom bucket so that **both `firstSession.ceilings` values fall on
a bucket edge instead of inside one.** With that, `T3` is not a percentile at all but a rate: the
share of armed run-1 sessions whose step-2 bucket is **the lowest one, whose upper edge is
`firstSession.ceilings.secondsToFirstClear.max`**. That is computable from a dashboard breakdown, it
carries a resolvable pass-to-alarm gap, and it tests the same claim. Withdrawing `T3` was the other
option offered and I declined it: it is one of only two instruments on a ceiling, and the fix costs
eight bucket values against a cap of 8,000. `[cid: decided]`

**The same defect was live in three more rows and nobody had raised it, so it is closed here.**
`T7`, `T9` and `T11` compared a **median** against a `beats[].testRange`, and a median cannot be
computed from buckets either. They become **bucket-overlap rates**: the share of sessions whose
step bucket overlaps the band. **The cost is stated rather than hidden as a `bucketResolutionLimit`
rule** — of the six band edges these three rows read, exactly one falls on a bucket edge, so a
violation smaller than the containing bucket is invisible to this instrument. **What would remove
the limit:** a numeric-valued custom event per step, the same technique `01`'s ordering instrument
uses. Whether six more event names are worth spending against the 100-name cap and the request
budget is **event-catalog work's to cost, not mine to spend.** `[cid: decided]`

**Ceilings and bands are revised differently.** `firstSession.ceilings.secondsToFirstReveal` carries
the brief's ten-second promise `[brief: soft]` ← `[you accepted: R6 Q3]` (`02-GAMEPLAY.md`). **A
brief promise is not moved by a measurement**: the action moves the design that must meet it, and
relaxing the ceiling needs a `## Pushing back` from `firstSession`'s owner. The three
`beats[].testRange` bands are `[cid: decided]` predictions and may themselves be revised. The
reveal ceiling's pass mark is **not mine**: `kpis/02` warns that a second mark on one quantity means
one number with two answers, so it sits in `noPassMark[]` pointing at that row, and `T4`'s reach
rate stays because a reach rate and a time distribution are different quantities.

**One alarm is blocking and the rest are not.** `firstSession.teaching[contactClearing].required` is
the only `true`, on `onboarding/03`'s ground that a player who does not know walking is the verb
produces zero clears and the design never starts. `T13` is that row; `K2` forbids the response that
suggests itself — no nudge, no hint, no first-run string.

**The minimum sample is a real gate and my first statement of it was false.** I claimed the smallest
pass-to-alarm gap was 10 points; `T1`'s was 0.5. The fix was not a bigger sample but the right
shape: a join that produces no spawn, and an ownership boolean true against a null id, are **build
defects, not player rates**, so both are count invariants read at n = 1. Every rate row now carries
a gap of at least 10 points. At n = 200 the binomial standard error is `sqrt(p(1−p)/200)`, giving a
95% interval of about ±5 points at p ≈ 0.85, ±4 at 0.90 and ±3 at 0.95, so **every rate row is
resolvable at the stated minimum.** The choice of 200 remains `[playtest unknown]`; the project's
only empirical reading is `cid/_playtest.md`'s 2026-08-01 session, **n = 1, untimed**. Two platform
floors sit under it — charts populate up to 24 hours late and events expire 90 days from last data
`[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/production/analytics/event-types.md]`
— and `kpis`' "larger governs" precedence rule is adopted rather than restated.

**Which thresholds move if RR-10 lands.** `_verified-wave4.md` RR-10 resolves either
`firstSession.beats[firstSpendAffordable].testRange` or the cheapest `upgrades[].costBase`. `T11`
points at the first and `T12` at the ordering it implies; both follow the field, never a copied
number. Wave 4 is **FAIL and unreleased**, so no figure from `pacing`, `firstSession` or `solvency`
is reproduced anywhere here. **Which of these sixteen is promoted, on what cadence and on which
surface, is dashboard-and-target work.**

| id | instrument | pass mark | alarm | action if the alarm trips — sheet · field · direction | blocking |
|---|---|---|---|---|---|
| `T1` | sessions with a join and no spawn — **a count invariant, not a rate** | 0 | ≥ 1 | `gameplay/meta/06` · `plots.spawn` — a join that produces no spawn is a build defect, not a player behaviour | no |
| `T2` | `steps[firstClear]` reach, of `run1SessionsArmed` | ≥ 0.90 | < 0.80 | `gameplay/onboarding/02` · `firstSession.placement.spawnToNearestPatchMaxStuds` — lower it | no |
| `T3` | share of `run1SessionsArmed` whose step-2 bucket is **the lowest bucket, whose upper edge is `firstSession.ceilings.secondsToFirstClear.max`** | ≥ 0.90 | < 0.80 | `gameplay/onboarding/02` · `firstSession.armDistanceStuds` — lower it; second resort `gameplay/core-loop/01`'s payoff rule, which set the ceiling | no |
| `T4` | `steps[firstReveal]` reach, of `run1SessionsArmedByJoinSecond5` | ≥ 0.90 | < 0.80 | `gameplay/onboarding/01` · `onboarding` first-Find placement — the reveal is guaranteed, so a shortfall is a placement or layout defect | no |
| `T6` | `steps[firstOrdinaryClear]` reach, of `run1Sessions` | ≥ 0.85 | < 0.70 | `gameplay/onboarding/02` · `firstSession.placement.secondFindOrdinalMin` — raise it | no |
| `T7` | share of `run1Sessions` whose `firstOrdinaryClear` bucket overlaps `firstSession.beats[firstOrdinaryClear].testRange` | ≥ 0.70 | < 0.55 | `gameplay/onboarding/02` · `firstSession.beats[firstOrdinaryClear].testRange` — widen or re-centre; the band is a prediction and may itself be revised | no |
| `T8` | `steps[tierContrast]` reach, of `run1Sessions` | ≥ 0.70 | < 0.50 | `gameplay/onboarding/02` · `firstSession.placement.tierContrastWithinFirstOrdinals` — lower it; second resort `gameplay/balance/02` · `tierMix.byDepth[1]` | no |
| `T9` | share of `run1Sessions` whose `tierContrast` bucket overlaps `firstSession.beats[tierContrast].testRange` | ≥ 0.70 | < 0.55 | `gameplay/onboarding/02` · `firstSession.beats[tierContrast].testRange` | no |
| `T10` | `steps[firstSpendAffordable]` reach, of `run1Sessions` | ≥ 0.50 | < 0.30 | `gameplay/balance/03` · the cheapest `upgrades[].costBase` — lower it, inside `firstSession.firstPurchaseBand` | no |
| `T11` | share of `run1Sessions` whose `firstSpendAffordable` bucket overlaps `firstSession.beats[firstSpendAffordable].testRange` | ≥ 0.70 | < 0.55 | whichever field `_verified-wave4.md` RR-10 settles on | no |
| `T12` | share of sessions in which `orderingInstrument`'s value is 0 — **the custom event, not the funnel graph** | ≥ 0.95 | < 0.85 | the same RR-10 field as `T11`. **The only instrument that can see the defect in production**, because the funnel auto-completes skipped steps and a skipped step carries no field | no |
| `T13` | `comprehension[contactClearing]` predicate satisfied, of sessions reaching `firstClear` | ≥ 0.85 | < 0.70 | `gameplay/mechanics/01` · `movement.baseClearRadius` and `gameplay/onboarding/02` · `firstSession.armDistanceStuds` | **yes** |
| `T14` | `comprehension[theFind]` proxy satisfied | ≥ 0.60 | < 0.40 | `gameplay/onboarding/02` · `firstSession.placement.secondFindOrdinalMin` | no |
| `T15` | `comprehension[areaCompletion]` proxy satisfied, of sessions ≥ 300 s | ≥ 0.60 | < 0.40 | `gameplay/balance/05` · `pacing.lapTargetSeconds`; second resort `gameplay/meta/04` · `depths.areas[1]` footprint | no |
| `T16` | `comprehension[depth]` satisfied, of `run1Sessions` | ≥ 0.35 | < 0.15 | `gameplay/balance/05` · `pacing.laps[].realisedLapSeconds` against `pacing.sessionBandSeconds` — the lap is too long for the session band | no |
| `T17` | `ownedAtJoin` reads `span` for any player while every `products.items[].gamePassId` is `null` — **a count invariant** | 0 | ≥ 1 | `gameplay/monetization/01` · `products.items[].gamePassId`, or `Entitlements.ownsProduct` — a build or provisioning defect | no |

| instrument deliberately given **no** pass mark | why |
|---|---|
| `steps[firstReveal]` elapsed distribution (the former `T5`) | that quantity is `kpis.rows[secondsToFirstReveal]`. `funnels` defines the step, the origin and the population and sets no mark on it; `T4`'s reach rate is a different quantity and stays |
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
    "bucketResolutionLimit": {
      "rule": "Every time-based threshold in this key is a rate over funnels.customFields[sinceStepOriginBucket], because a funnel step event carries no numeric value and a bucket cannot yield a median or a percentile.",
      "cost": "a band edge that does not fall on a bucket edge cannot be refuted precisely: a violation smaller than the containing bucket is invisible.",
      "edgesRead": 6,
      "edgesAligned": 1,
      "alignedEdge": "the lower bound of firstSession.beats[firstOrdinaryClear].testRange",
      "unaffected": "T3, whose comparand is firstSession.ceilings.secondsToFirstClear.max, and the withdrawn reveal row, whose comparand is firstSession.ceilings.secondsToFirstReveal.max. Both ceilings sit on a bucket edge by construction (funnels.customFields[sinceStepOriginBucket].edgesPlacedAt).",
      "whatWouldRemoveIt": "a numeric-valued LogCustomEvent per step, carrying elapsed seconds as its value, the same technique funnels.onboarding.orderingInstrument uses",
      "whoCostsThat": "event-catalog work, against the 100-event-name cap and the per-server request budget. This key states the requirement and spends no name.",
      "raisedBy": "this sheet, in round 2, alongside the T3 defect verification found; T7, T9 and T11 carried the same defect and no request named them"
    },
    "minimumSessions": {
      "value": 200,
      "unit": "armed run-1 sessions",
      "testRange": [100, 500],
      "status": "playtest unknown",
      "appliesTo": "every threshold whose kind is rate",
      "rule": "No rate or proportion in funnels.thresholds[] may be read, reported or acted on below this count. Below it the only legal output is the raw count.",
      "arithmetic": "the binomial standard error at n = 200 is sqrt(p(1-p)/200), so the 95% interval is about +/- 5 percentage points at p = 0.85, +/- 4 at 0.90 and +/- 3 at 0.95. Every threshold of kind rate carries a pass-to-alarm gap of at least 10 points, so every one is resolvable at this minimum.",
      "correctedFrom": "the first draft asserted the smallest gap was 10 points; T1's was 0.5. T1 is now a count invariant. cid/analytics/_verified.md RR-13.",
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
      { "id": "T3", "kind": "rate", "instrument": "share of sessions whose funnels.onboarding.steps[firstClear] sinceStepOriginBucket is the lowest bucket", "bucketComparand": "the lowest bucket's upper edge is firstSession.ceilings.secondsToFirstClear.max, by funnels.customFields[sinceStepOriginBucket].edgesPlacedAt", "originNote": "this step's bucket is arm-relative, not join-relative, per funnels.onboarding.steps[firstClear].bucketOrigin", "population": "run1SessionsArmed", "passMark": 0.90, "alarm": 0.80, "comparator": "atLeast", "gapPoints": 10, "testRange": [0.75, 0.97], "status": "playtest unknown", "correctedFrom": "a P90 in seconds from the arm transition, which had no carrier (the bucket field's unit was seconds since join and the arm transition is not a step) and no resolving boundary (the bottom bucket straddled the ceiling). cid/analytics/_verified.md, round 2.", "originCaveat": "measured from the arm transition, which is strictly later than first input, so this reading is biased low and flatters the ceiling", "action": { "sheet": "cid/gameplay/onboarding/02-first-minute-beats.md", "field": "firstSession.armDistanceStuds", "direction": "lower", "secondResort": { "sheet": "cid/gameplay/core-loop/01-payoff-frequency.md", "field": "the payoff rule that set this ceiling" } }, "blocking": false, "readableToday": false },
      { "id": "T4", "kind": "rate", "instrument": "funnels.onboarding.steps[firstReveal].reach", "population": "run1SessionsArmedByJoinSecond5", "passMark": 0.90, "alarm": 0.80, "comparator": "atLeast", "gapPoints": 10, "testRange": [0.80, 0.99], "status": "playtest unknown", "action": { "sheet": "cid/gameplay/onboarding/01-first-find.md", "field": "onboarding first-Find placement", "direction": "investigate; the first reveal is guaranteed, so a shortfall is a placement or layout defect" }, "blocking": false, "readableToday": false },
      { "id": "T6", "kind": "rate", "instrument": "funnels.onboarding.steps[firstOrdinaryClear].reach", "population": "run1Sessions", "passMark": 0.85, "alarm": 0.70, "comparator": "atLeast", "gapPoints": 15, "testRange": [0.65, 0.95], "status": "playtest unknown", "action": { "sheet": "cid/gameplay/onboarding/02-first-minute-beats.md", "field": "firstSession.placement.secondFindOrdinalMin", "direction": "raise" }, "blocking": false, "readableToday": false },
      { "id": "T7", "kind": "rate", "instrument": "share of sessions whose funnels.onboarding.steps[firstOrdinaryClear] sinceStepOriginBucket overlaps firstSession.beats[firstOrdinaryClear].testRange", "population": "run1Sessions", "passMark": 0.70, "alarm": 0.55, "comparator": "atLeast", "gapPoints": 15, "testRange": [0.50, 0.90], "status": "playtest unknown", "subjectTo": "bucketResolutionLimit", "correctedFrom": "a median-in-band test, which a bucket cannot compute", "action": { "sheet": "cid/gameplay/onboarding/02-first-minute-beats.md", "field": "firstSession.beats[firstOrdinaryClear].testRange", "direction": "widen or re-centre; the band is a prediction and may itself be the thing revised" }, "blocking": false, "readableToday": false },
      { "id": "T8", "kind": "rate", "instrument": "funnels.onboarding.steps[tierContrast].reach", "population": "run1Sessions", "passMark": 0.70, "alarm": 0.50, "comparator": "atLeast", "gapPoints": 20, "testRange": [0.45, 0.90], "status": "playtest unknown", "action": { "sheet": "cid/gameplay/onboarding/02-first-minute-beats.md", "field": "firstSession.placement.tierContrastWithinFirstOrdinals", "direction": "lower", "secondResort": { "sheet": "cid/gameplay/balance/02-patch-payout-and-depth-mix.md", "field": "tierMix.byDepth[1]" } }, "blocking": false, "readableToday": false },
      { "id": "T9", "kind": "rate", "instrument": "share of sessions whose funnels.onboarding.steps[tierContrast] sinceStepOriginBucket overlaps firstSession.beats[tierContrast].testRange", "population": "run1Sessions", "passMark": 0.70, "alarm": 0.55, "comparator": "atLeast", "gapPoints": 15, "testRange": [0.50, 0.90], "status": "playtest unknown", "subjectTo": "bucketResolutionLimit", "correctedFrom": "a median-in-band test, which a bucket cannot compute", "action": { "sheet": "cid/gameplay/onboarding/02-first-minute-beats.md", "field": "firstSession.beats[tierContrast].testRange", "direction": "widen or re-centre" }, "blocking": false, "readableToday": false },
      { "id": "T10", "kind": "rate", "instrument": "funnels.onboarding.steps[firstSpendAffordable].reach", "population": "run1Sessions", "passMark": 0.50, "alarm": 0.30, "comparator": "atLeast", "gapPoints": 20, "testRange": [0.25, 0.75], "status": "playtest unknown", "action": { "sheet": "cid/gameplay/balance/03-ladder-solvency.md", "field": "the cheapest upgrades[].costBase", "direction": "lower, staying inside firstSession.firstPurchaseBand" }, "blocking": false, "readableToday": false },
      { "id": "T11", "kind": "rate", "instrument": "share of sessions whose funnels.onboarding.steps[firstSpendAffordable] sinceStepOriginBucket overlaps firstSession.beats[firstSpendAffordable].testRange", "population": "run1Sessions", "passMark": 0.70, "alarm": 0.55, "comparator": "atLeast", "gapPoints": 15, "testRange": [0.50, 0.90], "status": "playtest unknown", "subjectTo": "bucketResolutionLimit", "correctedFrom": "a median-in-band test, which a bucket cannot compute", "movesIf": "_verified-wave4.md RR-10", "action": { "sheet": "whichever of cid/gameplay/onboarding/02-first-minute-beats.md or cid/gameplay/balance/03-ladder-solvency.md RR-10 settles on", "field": "firstSession.beats[firstSpendAffordable].testRange or the cheapest upgrades[].costBase", "direction": "follow RR-10's resolution; this row points at the field and never at a number" }, "blocking": false, "readableToday": false },
      { "id": "T12", "kind": "rate", "instrument": "share of sessions in which funnels.onboarding.orderingInstrument's custom-event value is 0", "population": "run1Sessions in which the ordering instrument fired", "passMark": 0.95, "alarm": 0.85, "comparator": "atLeast", "gapPoints": 10, "testRange": [0.80, 0.99], "status": "playtest unknown", "notReadFromTheFunnelGraph": "the funnel auto-completes skipped steps and a skipped step carries no custom field, so step order is not observable inside the funnel API at all; this row reads a LogCustomEvent value instead", "notSubjectTo": "bucketResolutionLimit — the ordering instrument carries a numeric value, not a bucket", "movesIf": "_verified-wave4.md RR-10", "action": { "sheet": "the same sheet RR-10 settles on", "field": "the same field as T11", "direction": "follow RR-10's resolution" }, "blocking": false, "readableToday": false },
      { "id": "T13", "kind": "rate", "instrument": "funnels.comprehension[contactClearing] predicate satisfied", "population": "sessions reaching funnels.onboarding.steps[firstClear]", "passMark": 0.85, "alarm": 0.70, "comparator": "atLeast", "gapPoints": 15, "testRange": [0.65, 0.95], "status": "playtest unknown", "action": { "sheet": "cid/gameplay/mechanics/01-reach-and-pace.md and cid/gameplay/onboarding/02-first-minute-beats.md", "field": "movement.baseClearRadius and firstSession.armDistanceStuds", "direction": "raise the radius, lower the arm distance" }, "blocking": true, "blockingReason": "firstSession.teaching[contactClearing].required is the only true in the array; onboarding/03 states that a player who does not know walking is the verb produces zero clears and the design never starts", "readableToday": false },
      { "id": "T14", "kind": "rate", "instrument": "funnels.comprehension[theFind] proxy satisfied", "population": "sessions reaching funnels.onboarding.steps[firstOrdinaryClear]", "passMark": 0.60, "alarm": 0.40, "comparator": "atLeast", "gapPoints": 20, "testRange": [0.35, 0.80], "status": "playtest unknown", "action": { "sheet": "cid/gameplay/onboarding/02-first-minute-beats.md", "field": "firstSession.placement.secondFindOrdinalMin", "direction": "raise; this row measures the abundance correction that ordinal band exists to make" }, "blocking": false, "readableToday": false },
      { "id": "T15", "kind": "rate", "instrument": "funnels.comprehension[areaCompletion] proxy satisfied", "population": "sessions of at least 300 seconds reaching funnels.onboarding.steps[firstClear]", "passMark": 0.60, "alarm": 0.40, "comparator": "atLeast", "gapPoints": 20, "testRange": [0.35, 0.85], "status": "playtest unknown", "action": { "sheet": "cid/gameplay/balance/05-time-to-milestone.md", "field": "pacing.lapTargetSeconds", "direction": "lower", "secondResort": { "sheet": "cid/gameplay/meta/04-the-depth-ladder.md", "field": "depths.areas[1] footprint" } }, "blocking": false, "readableToday": false },
      { "id": "T16", "kind": "rate", "instrument": "funnels.comprehension[depth] satisfied", "population": "run1Sessions", "passMark": 0.35, "alarm": 0.15, "comparator": "atLeast", "gapPoints": 20, "testRange": [0.10, 0.60], "status": "playtest unknown", "action": { "sheet": "cid/gameplay/balance/05-time-to-milestone.md", "field": "pacing.laps[].realisedLapSeconds against pacing.sessionBandSeconds", "direction": "lower the lap; a first session that never reaches area 2 means the lap is too long for the session band" }, "blocking": false, "readableToday": false },
      { "id": "T17", "kind": "countInvariant", "instrument": "count of sessions where funnels.purchase.liveReading ownedAtJoin is span while every products.items[].gamePassId is null", "population": "allSessions", "passMark": 0, "alarm": 1, "comparator": "atMost", "minimumSessions": 1, "status": "structural", "action": { "sheet": "cid/gameplay/monetization/01-the-offer-ladder.md", "field": "products.items[].gamePassId, or server/Entitlements.luau :: ownsProduct", "direction": "investigate; a span reading here is a build or provisioning defect and never a player behaviour" }, "blocking": false, "readableToday": true }
    ],
    "noPassMark": [
      { "instrument": "funnels.onboarding.steps[firstReveal] elapsed distribution", "formerId": "T5", "reason": "that quantity is kpis.rows[secondsToFirstReveal]; funnels defines the step, its origin and its population and sets no mark on it", "ownedBy": "kpis.rows[secondsToFirstReveal]", "withdrawnIn": "cid/analytics/_verified.md RR-12", "reachRateStillHere": "T4, which is a different quantity" },
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

- **Event-catalog work** gets one costed option and no instruction. `bucketResolutionLimit` names the
  only thing that would remove it — a numeric-valued `LogCustomEvent` per step carrying elapsed
  seconds — and states that spending six of the 100 event names on it is **their** call against their
  own request budget. `T12` already reads such an event; five more would upgrade `T3`, `T7`, `T9` and
  `T11` from bucket rates to exact readings.
- **Onboarding work** inherits the same dependency `01` declares: both `firstSession.ceilings[].max`
  values sit on bucket edges, so moving either moves the bucket set, and a ceiling landing strictly
  inside a bucket makes `T3` uncomputable again.
- **Dashboard-and-target work (KPI)** takes the `secondsToFirstReveal` quantity outright; it is in
  `noPassMark[]` pointing at `kpis.rows[secondsToFirstReveal]`. Its `minimumSessions` precedence rule
  governs where the two keys differ.
- **Number-and-curve work (Balance)** inherits eleven of the sixteen actions. Nine name a
  `firstSession` field, two name `pacing`, one names `upgrades[].costBase`, and `T11` and `T12` are
  addressed to whichever field RR-10 settles on.
- **Whoever reports a measurement anywhere in this project** inherits `X10`: a drop-off is a player
  who stopped. There is nothing in this game to lose.
- **Run-state work** gets a use for `cid/_playtest.md`: `minimumSessions.baselineEvidence` cites it
  directly, which is what that file was created for.

## Acceptance criteria

1. `funnels.thresholds[]` has 16 entries; every entry has a non-null `passMark` or `passMarkRef`, a
   non-null `alarm`, a `kind` of `rate` or `countInvariant`, and an `action` object carrying both a
   `sheet` and a `field`; every `kind: "rate"` entry has `gapPoints` ≥ 10; every
   `kind: "countInvariant"` entry has `passMark: 0`, `alarm: 1` and `minimumSessions: 1`; and no
   entry carries a `comparator` of `inside` or an instrument naming a median or a percentile.
2. Exactly one entry has `blocking: true` and it is `T13`, whose instrument is
   `funnels.comprehension[contactClearing]`; and no entry sets a pass mark on the
   `steps[firstReveal]` elapsed distribution.
3. `funnels.forbiddenActions[]` has 12 entries, each with a non-empty `closedBy`, and no `action`
   string in `funnels.thresholds[]` matches any of them.
4. No prose line, table cell or manifest field in this sheet contains a numeric value copied from
   `pacing`, `firstSession`, `solvency`, `tierMix` or `axisBudget`; every reference is a field path.

## Not decided here

The KPI shortlist, review cadence, dashboard layout, and the `secondsToFirstReveal` target and alarm
(dashboard-and-target work, which owns that quantity outright). The step order, origins, bucket set
and the ordering instrument's value semantics (`01`, this domain). The comprehension dispositions
and their countable forms (`02`, this domain). Whether a purchase funnel exists (`03`, this domain —
it does not). Whether six more event names are spent to replace the bucket rates with exact readings
(event-catalog work). Which way `_verified-wave4.md` RR-10 settles (number-and-curve work and
onboarding work). Every value the actions point at — `firstSession`, `pacing`, `upgrades`,
`tierMix`, `depths`, `movement` all belong to their owners and this sheet moves none of them. Every
session-shape and retention definition (engagement work). Whether the telemetry module is built at
all (logging-pipeline work). `social.maxPlayers` (per-server-capacity work).
