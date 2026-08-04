# 01 — Payoff frequency

**Domain:** Core Loop · **Category:** Gameplay · **Wave:** 1 (revised wave 7)

## Decision

**Two gap ceilings, and every count in this sheet is one of them integrated over the session.**
A moving player is paid **at least once every 3 seconds**. Between two consecutive payoffs **above a
currency tick** (Find reveal, upgrade purchase, area completion, set completion) no more than
**90 seconds** may pass. **A dead-spot is exactly a violation of either** — that is the whole
content of the brief's *"where the pacing dead-spots are"*, in a game with no failure state where
the ordinary definition does not apply.

Both ceilings now live in `pacing`, which `gameplay/balance` owns. **This sheet amends that key with
the thing it does not carry: the closed list of payoff kinds and the per-session floor on each.**

| kind | floor session (600 s) | realised today | role |
|---|---|---|---|
| currency tick | **≥ 200** | 1,310 patches over four laps | texture; the only continuous channel |
| above-tick, any kind | **≥ 6** | 45 | beats and peaks |
| of which Find reveal | **≥ 1** | 12 | the brief's own session objective |
| of which upgrade purchase | **≥ 1** | 27 | the loop's fourth step, felt |
| area completion | ≥ 0 | 4 | may fall in another session |
| set completion | ≥ 0 | 2 | only four ever exist |

## Why

**The brief has no payoff-frequency statement of any kind.** `[cid: decided]` It never says how
often anything lands, in any unit. What it fixes, and what every floor is derived against:

- *"10–20 minute active sessions"*, *"8–14, mobile-heavy"* `[brief: binding]` ←
  `[you chose: R1 Q4]` (`00-CORE.md`). The denominator, and `pacing.sessionBandSeconds` verbatim.
- Session objective *"find at least one new relic"*, with the stated risk that *"discovery rates
  must be generous enough that a typical session yields at least one find, or the stated session
  objective silently fails. **This is the highest-risk tuning in the game**"* `[brief: binding]`
  (`03-META.md`). **One find per session is a floor the brief set**, so I choose only its headroom.
- *"Zero tension is deliberate … **audio and visual feedback carry the entire load**"*
  `[brief: soft]` ← `[you accepted: step 6 Q2]`. This is why a tick ceiling exists at all. With no
  timer, no hazard and no failure, the clear cue is the *only* thing telling a player the game is
  running. A silence is not neutral here; it is the absence of the entire feedback system.
- *"A lap is finishing a space, not hitting a number"* `[brief: binding]` ← `[you chose: R1 Q2]`.
  **No count above is a quota the player works toward or is ever shown.** They are floors on what
  the game owes the player.

**Where 3 seconds comes from.** The realised in-area gap is 1.17 s at base stats
(`pacing.tickGapRealisedSeconds`), so 3 s is a 2.5× tolerance. It is not slack for its own sake: it
is the amount by which a future area may become larger and sparser before the tick channel goes
quiet, and it converts into a density floor binding every area anyone authors later —
`depths.invariants[10]`. `[playtest unknown]` test range 2 to 5 s. Below 2 s the rule forbids an
area from ever being sparse; above 5 s a player can walk five seconds of a relaxation game hearing
nothing, which is the one thing zero tension cannot absorb.

**Where 90 seconds comes from.** It was derived to cut between the ordinary purchase gaps a
geometric ladder produces and the deserts it produces, and `solvency` has since re-cut the ladder to
20 rungs an axis at `costGrowth` 1.32. The ceiling survived the re-cut: realised purchase cadence is
18.6 to 30.5 s inside the eight areas and 42.0 s in an endless bay. 120 s would miss a real desert;
60 s would flag perfectly ordinary gaps. `[playtest unknown]` test range 60 to 120 s. 90 s is also
15% of the floor session, which is where the above-tick floor of 6 comes from: a 600-second session
cannot contain more than six 90-second gaps.

**One correction I take rather than argue with.** `pacing` reports the worst **reveal** gap at
101.5 s, past my own ceiling, and concludes the rule is carried by **purchase cadence** rather than
by reveal spacing. That is right, and it follows from `collection.relicsPerArea` falling from 6 to
3: three Finds per area means two reveals can sit two thirds of a lap apart. **The ceiling binds on
the union of the four above-tick kinds, never on one of them**, which is why this sheet's floor is
stated per-kind *and* in aggregate. `solvency.tests.S5` is the guard. `[cid: decided]`

**Mid-area spend is ratified as continuous (G10), and it is now closed by merged keys.**
`input.pressable.roles` puts the purchase controls on the persistent HUD and `response` R7 forbids
any beat blocking *"a purchase activated in the same second"*. There is no vendor and no travel. The
90-second rule is what forced it: gated to an area boundary, the 5 to 7 rungs a lap funds would
collapse into one instant, leaving a whole lap containing nothing but ticks and reveals.

**Run 1 needs no separate cadence (G9), and that is a finding rather than a shrug.**
`firstSession.ceilings` puts the first clear inside 3.0 s and the first reveal inside 10.0 s, and
`pacing.milestones` puts the first affordable purchase at 21.5 s. All three recurring kinds land
inside the first 25 seconds without anyone choreographing them. `[cid: decided]` Beat sequencing
past that is Onboarding's.

**How the budget degrades, with nothing invented to fill it (G8).** The above-tick kinds are finite
in two ways, and the terminal state breaks this sheet's own rule.

| player state | above-tick kinds alive | verdict |
|---|---|---|
| collection incomplete, ladder unmaxed | 4 | inside the rule |
| 24/24, ladder unmaxed | 2 (purchase, area completion) | inside the rule |
| ladder maxed, collection incomplete | 3 | at the edge |
| **both complete** | **1 (area completion), one per bay, 167.9 s apart** | **violates it** |

`pacing.aboveTickGapScope` already scopes the rule off at the terminal state and asks for a second
scoping at ladder exhaustion (1,569 s). **I ratify both scopings and invent no content.** The answer
belongs to `endgame`.

```json
{
  "amends": "pacing",
  "field": "payoffBudget",
  "requestedBy": "cid/gameplay/core-loop/01-payoff-frequency.md",
  "why": "pacing carries the two gap ceilings and every realised wall-clock figure, and carries no taxonomy of what a payoff IS. Without one, the floors below are unstated and each presentation channel (stingers, effects, notices) re-derives the kind list independently.",
  "kindsAreClosed": true,
  "kinds": [
    { "id": "currencyTick",    "aboveTick": false, "beatId": "patchClear",       "minPerFloorSession": 200, "realisedPerFloorSession": 1310, "derivation": "sessionBandSeconds[0] / tickGapMaxSeconds = 600 / 3.0" },
    { "id": "findReveal",      "aboveTick": true,  "beatId": "findReveal",       "minPerFloorSession": 1,   "realisedPerFloorSession": 12,   "derivation": "03-META.md session objective, stated as a floor by the brief and not chosen here" },
    { "id": "upgradePurchase", "aboveTick": true,  "beatId": "upgradePurchased", "minPerFloorSession": 1,   "realisedPerFloorSession": 27,   "derivation": "the loop's fourth step must be felt inside a sitting; solvency.areaLedger rungsBought 6+7+7+7 over four laps" },
    { "id": "areaCompletion",  "aboveTick": true,  "beatId": "areaComplete",     "minPerFloorSession": 0,   "realisedPerFloorSession": 4,    "derivation": "a lap may span sessions (core-loop/04), so a floor session may legally contain none" },
    { "id": "setCompletion",   "aboveTick": true,  "beatId": "setComplete",      "minPerFloorSession": 0,   "realisedPerFloorSession": 2,    "derivation": "only four ever exist; pacing.milestones setComplete1 at 239.0 s and setComplete2 at 502.9 s" }
  ],
  "aggregateFloors": {
    "aboveTickPerFloorSession": 6,
    "aboveTickDerivation": "sessionBandSeconds[0] / aboveTickGapMaxSeconds = 600 / 90 = 6.67, floored",
    "aboveTickRealisedPerFloorSession": 45
  },
  "deadSpotDefinition": "a stretch violating either ceiling. There is no other kind of dead spot in this game: with no failure state the ordinary definition (a stretch where you might lose) does not apply.",
  "ceilingBindsOn": "the UNION of the four aboveTick kinds, never on any one of them. pacing's own revealGapMaxSeconds 101.5 exceeds aboveTickGapMaxSeconds 90.0 and the rule still holds, because purchases fall inside the gap.",
  "spendPlacement": {
    "continuous": true,
    "gatedToAreaBoundary": false,
    "travelRequired": false,
    "carriedBy": ["input.pressable.roles", "response R7", "composition.groups"],
    "why": "boundary-gated spend collapses 5 to 7 purchase beats into one instant and leaves a whole lap above-tick-silent except for reveals, which alone exceed the 90 s ceiling"
  },
  "runOne": {
    "separateCadence": false,
    "allThreeRecurringKindsBySeconds": 25,
    "sourceCeilings": ["firstSession.ceilings.secondsToFirstClear 3.0", "firstSession.ceilings.secondsToFirstReveal 10.0", "pacing.milestones firstPurchase 21.5"]
  },
  "degradation": [
    { "state": "collection incomplete, ladder unmaxed", "aboveTickKindsAlive": 4, "insideRule": true },
    { "state": "collection complete, ladder unmaxed",   "aboveTickKindsAlive": 2, "insideRule": true },
    { "state": "ladder maxed, collection incomplete",   "aboveTickKindsAlive": 3, "insideRule": true },
    { "state": "both complete",                          "aboveTickKindsAlive": 1, "insideRule": false, "gapSeconds": 167.9, "ruledBy": "pacing.aboveTickGapScope scopes the rule off here; endgame owns what replaces the kinds. No content is invented by this sheet." }
  ],
  "playtestUnknown": {
    "tickGapMaxSeconds": [2.0, 5.0],
    "aboveTickGapMaxSeconds": [60.0, 120.0]
  }
}
```

## Consequences for other work

- **Cost-curve work** (`solvency`, Balance & Tuning) carries the 90-second ceiling, not reveal
  spacing. Any change raising purchase cadence past 90 s in any row breaks this sheet even if every
  reveal figure improves. `solvency.tests.S5` is the instrument and must stay.
- **Area authoring at depth** (`depths`) inherits the density floor as `invariants[10]`:
  `patchCount / lapSeconds` must keep seconds-per-clear at or under 3.0 at every row. An area that
  doubles its side length and only doubles its patch count halves its payoff rate and breaks it.
- **Endgame work** (`endgame`) inherits a stated rule violation, not a suggestion: at 24/24 with a
  maxed ladder exactly one above-tick kind survives and it fires once per bay, 167.9 s apart. The
  rule is scoped off there; whatever fills the state must supply a recurring above-tick kind.
- **The clear cue** (`sfx`, `response.beats[patchClear]`) inherits a repetition budget of about one
  firing every 1.17 s, up to 640 in the deepest area. The 3-second rule makes the cue's *presence*
  load-bearing, not its size: a cue designed to be impressive once will be exhausting here.
- **Reveal placement** (sheet `03`) is load-bearing on these floors. Batched reveals collapse 12
  per-session events into 4 instants and make the per-kind floor vacuous.
- **Lap duration and session spanning** (sheet `04`) inherits the aggregate floor as an input it
  must rule on, not re-derive.

## Acceptance criteria

1. `npm run bridge` collects this sheet's `amends` block against `pacing` and reports no problem for
   it; `pacing` remains provided by exactly one sheet, `gameplay/balance/05-time-to-milestone.md`.
2. `payoffBudget.kinds` has exactly 5 rows, every `beatId` matches a `response.beats[].id`
   (`patchClear`, `findReveal`, `upgradePurchased`, `areaComplete`, `setComplete`) with no extras
   and none missing, and `aboveTick` is true for exactly 4 of them.
3. For every row of `pacing.laps`, `purchaseCadenceSeconds` ≤ `pacing.aboveTickGapMaxSeconds` (90.0)
   and `realisedLapSeconds / patchCount` ≤ `pacing.tickGapMaxSeconds` (3.0). Maximum purchase
   cadence today is 42.0 s at the endless bay.
4. Summed over `pacing.laps[0..3]` (536.1 s, inside the 600 s floor session), the realised counts
   meet every `minPerFloorSession`: ≥200 ticks, ≥6 above-tick, ≥1 reveal, ≥1 purchase.

## Flagged to the developer

**The brief is silent on payoff frequency entirely**, so every figure is `[cid: decided]` against
derived throughput rather than stated intent. One item needs your call, and it is the one wave 1
raised and no wave has closed.

**The terminal state violates this sheet's own rule and no legal content fills it.** At 24/24 with a
maxed ladder, area completion is the only above-tick payoff left and it fires once per 167.9-second
bay. Every instrument that would normally patch this — rebirth, dailies, seasons, leaderboards — is
cut or priority 3. Alternatives: (a) `endgame` supplies a recurring above-tick kind that is not a
re-reveal of an owned Find; (b) an explicit decision that the game is finished at 24/24 and the rule
stops applying, which is what `pacing.aboveTickGapScope` currently assumes. **Recommendation: (b),
stated out loud rather than assumed**, because (a) is content nobody has budgeted and the brief's
own answer to "why come back" is already *"an unfinished area and a half-empty index"*.

## Not decided here

Payoff *magnitudes* and which kinds are peaks versus texture (sheet `02`). Whether a reveal lands on
contact (sheet `03`). Lap duration and whether a lap may span sessions (sheet `04`). Whether
throughput must outpace area growth with depth (sheet `05`). Every value: `tiers[].value` and
weights (Systems, then Balance & Tuning), every cost and rung count (`solvency`), footprints and
patch counts at any depth (`depths`), the realised wall-clock figures this sheet's floors are
checked against (`pacing`, whose owner is Balance & Tuning). What the game is after 24/24
(`endgame`). The first minute's beat sequence past the three kinds named above (`firstSession`).
