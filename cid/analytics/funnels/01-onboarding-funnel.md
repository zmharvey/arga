# 01 — The onboarding funnel

**Domain:** analytics/funnels · **Category:** Analytics · **Wave:** 5

## Decision

**One funnel, six steps, one per `firstSession.beats[]` row in its published order, fired through
`LogOnboardingFunnelStepEvent` and carrying three custom fields: `sinceJoinBucket`, `ownsSpan`,
`runOrdinal`.** Origins are per step and inherited verbatim — `firstInput` for `firstClear`, `join`
for the other five — and the elapsed-second bucket rides every step, because Roblox's funnel
auto-completes skipped steps and the step graph alone cannot see an out-of-order beat.

## Why

**Six steps, and no beat is re-timed.** `firstSession.beats[]` is already an ordered ladder with
preconditions and ceilings, so a funnel over it measures a published prediction — the category's
selection principle, *"all three test assumptions this spec rests on rather than reporting vanity"*
`[brief: soft]` (`OPEN.md §2`). I add no step of my own: the arming transition is not a seventh
step, it is the observation point standing in for step 2's origin.

**`LogOnboardingFunnelStepEvent`, for a decisive reason rather than a stylistic one.** The recurring
method `LogFunnelStepEvent(player, funnelName, funnelSessionId, step, stepName, customFields)`
**requires a `funnelSessionId`** and nothing in the shipped state shape can produce one; the
one-time method takes none and is documented for *"conversion events that only occur once per
user"*
`[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/production/analytics/funnel-events.md]`.
The first session is once per user by definition, so the method whose semantics match is also the
only one callable today. *"If a user repeats a step in a funnel, the funnel only considers the
first instance"* is correct behaviour here, not a limitation.

**The headline instrument's origin is not observable, and this is the sheet where that gets said.**
`firstSession.ceilings.secondsToFirstClear` is `measuredFrom: "firstInput"`, and no server-side fact
in `game/src` is first input. What exists is the arming gate: `arm.armed` flips on the tick
horizontal XZ displacement from the spawn pivot first exceeds `firstSession.armDistanceStuds`
`[research: game/src/server/Clearing.luau]`. Displacement is **strictly later** than the input that
produced it, so the realised measurement is `t(firstClear) − t(armed)`, **smaller** than the
quantity the ceiling names. **The bias is one-directional and it flatters the design:** the ceiling
is easier to pass measured this way than measured as specced, by the walk time from input to
2.0 studs. Event Logging established the observability half; the bias belongs on the instrument.
`[cid: decided]`

**Three custom fields, and device is deliberately not one of them.** The platform allows exactly
three, keyed only as `CustomField01/02/03`
`[research: https://create.roblox.com/docs/production/analytics/custom-fields]`, with 8,000 combined
values before the rest group as `Other`
`[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/production/analytics/event-types.md]`.
The obvious first spend is the brief's `~70/25/5` device split, and it is the wrong spend twice
over: analytics events *"can only be sent from the server and in published games"*
`[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/production/analytics/custom-events.md]`
and no server-side observable of device exists inside a seven-channel protocol; and the Creator
Dashboard already breaks every metric down by Platform and OS with no developer event
`[research: https://create.roblox.com/docs/production/analytics/analytics-dashboard]`. A field spent
on device would be an unobservable duplicate of a free breakdown. `[cid: decided]`

**`sinceJoinBucket` exists because of one sourced sentence.** *"If you skip a step in a funnel, the
earlier steps automatically complete"*
`[research: https://create.roblox.com/docs/production/analytics/funnel-events]`. So a player who
becomes able to spend before the two beats specced to precede it produces a dashboard in which
those two beats are green — the step graph is structurally incapable of showing the defect. What
shows it is an ordering assertion over a value each step carries: step 6's bucket lower than step
5's is the violation, visible in the dashboard's breakdown-by-custom-field view. Buckets rather
than raw seconds, because 8,000 combinations is the whole cardinality budget. `[cid: decided]`

**What the ordinal table catches that `onboarding/03`'s S3 did not.**
`pacing.milestones[firstPurchase]` publishes a base and a purchaser second;
`firstSession.beats[firstSpendAffordable].testRange` has a lower bound above the base figure, and
`beats[firstOrdinaryClear]` and `beats[tierContrast]` are both specced to precede it.
`_verified-wave4.md` RR-10 records why nothing caught it: *"Sheet `03`'s S3 only tests
`firstPurchaseBand`"*, which the value satisfies. **An ordered step table catches it at design
time**, by comparing ordinals against the seconds attached to them — a check no single-field
predicate can perform. **It would not have caught it in production**, for the auto-completion reason
above, which is why the field is on the step rather than the argument left in prose. Wave 4 is FAIL
and has not released; every figure named here is a field path, never a number.

**The state shape cannot form either inherited population, and that is a requirement, not a
caveat.** `PlayerState` and `StoredState` carry no join instant, no session id and no run ordinal
`[research: game/src/shared/Types.luau]`, and `Persistence.load` returns `(state, readable)` where
`readable` is true for a first-time player as well as a real save
`[research: game/src/server/Persistence.luau]`. So *"all run-1 sessions in which any input
occurred"* and *"run-1 sessions whose first input arrived by second 5.0"* are **both unformable
today**, along with every `measuredFrom: "join"` second in `firstSession` and `pacing`. Three
domains reached this independently and **persistence work is raising the `stateShape` revision
request**; I name the fields and do not duplicate it. `runOrdinal` is spent as a custom field so the
funnel fails loudly rather than silently reporting a mixed population.

| # | step id | stepName | measuredFrom | population | field path it can refute | server-side observation point | site exists | call exists |
|---|---|---|---|---|---|---|---|---|
| 1 | `spawn` | `spawn` | `join` | P1 | `firstSession.beats[spawn].guaranteedOutcome`; `firstSession.placement.spawnToNearestPatchMaxStuds` | `server/init.server.luau` · `onSpawn`, after the pivot to the plot spawn point | yes | no |
| 2 | `firstClear` | `first_clear` | **`firstInput`**, realised as the arm transition | P3 | `firstSession.ceilings.secondsToFirstClear.max` | `server/Clearing.luau` · `clearPatch`, after the first `Progression.award` of the life | yes | no |
| 3 | `firstReveal` | `first_reveal` | `join` | P4 | `firstSession.ceilings.secondsToFirstReveal.max` (`OPEN.md §2` item 1) | `server/Clearing.luau` · `clearPatch`, at the `FindRevealed` fire | yes | no |
| 4 | `firstOrdinaryClear` | `first_ordinary_clear` | `join` | P2 | `firstSession.beats[firstOrdinaryClear].testRange`; `firstSession.placement.secondFindOrdinalMin` | `server/Clearing.luau` · `clearPatch`, the third clear after `firstReveal` with no reveal | yes | no |
| 5 | `tierContrast` | `tier_contrast` | `join` | P2 | `firstSession.beats[tierContrast].testRange`; `firstSession.placement.tierContrastWithinFirstOrdinals` | `server/Clearing.luau` · `clearPatch`, on the first clear of a second distinct `patch.tierIndex` | yes | no |
| 6 | `firstSpendAffordable` | `first_spend_affordable` | `join` | P2 | `firstSession.beats[firstSpendAffordable].testRange`; `pacing.milestones[firstPurchase]` | `server/Progression.luau` · `revealRows`, at the cheapest row's latch transition | yes | no |

| field | key | values | why it is worth one of three |
|---|---|---|---|
| `sinceJoinBucket` | `CustomField01` | `0-5`, `5-10`, `10-20`, `20-45`, `45-90`, `90-300`, `300+` | the only thing that survives step auto-completion; carries the ordering assertion |
| `ownsSpan` | `CustomField02` | `owned`, `notOwned` | the split `pacing.milestones[].purchaserSeconds` needs; empty today, see sheet `03` |
| `runOrdinal` | `CustomField03` | `run1`, `later`, `unknown` | both inherited populations are defined over it; `unknown` is what it reads until state-shape work lands |

| id | population | definition | formable today | what blocks it |
|---|---|---|---|---|
| P1 | `allSessions` | every join | yes | — |
| P2 | `run1Sessions` | sessions where `runOrdinal == run1` | **no** | no run ordinal in `StoredState` |
| P3 | `run1SessionsArmed` | P2 ∩ the arm transition occurred | **no** | P2, plus the arm flag is never emitted |
| P4 | `run1SessionsArmedByJoinSecond5` | P3 ∩ arm transition at or before join second 5.0 | **no** | P2, plus no join instant |
| P5 | `spanOwners` | `ownsSpan == owned` at join | definable, **empty** | `products.externalPrerequisite` — sheet `03` |

```manifest
{
  "provides": "funnels",
  "status": "proposed",
  "value": {
    "platformLimits": {
      "requestsPerMinute": "120 + (20 * CCU)",
      "maxFunnels": 10,
      "maxStepsPerFunnel": 100,
      "maxCustomFieldsPerEvent": 3,
      "maxCombinedCustomFieldValues": 8000,
      "retentionDays": 90,
      "chartLatencyHours": 24,
      "serverOnly": true,
      "publishedPlacesOnly": true,
      "source": "https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/production/analytics/event-types.md"
    },
    "api": {
      "method": "LogOnboardingFunnelStepEvent",
      "signature": "LogOnboardingFunnelStepEvent(player, step, stepName, customFields)",
      "funnelSessionIdRequired": false,
      "rejected": "LogFunnelStepEvent",
      "rejectedBecause": "it requires a funnelSessionId string and no field in Types.luau PlayerState or StoredState can produce one",
      "repeatSemantics": "a repeated step counts only its first instance",
      "skipSemantics": "a skipped earlier step auto-completes, so step order is NOT observable from the funnel graph",
      "funnelsUsedOfTen": 1
    },
    "customFields": [
      { "key": "CustomField01", "name": "sinceJoinBucket", "values": ["0-5","5-10","10-20","20-45","45-90","90-300","300+"], "unit": "seconds since join", "required": true, "purpose": "carries elapsed time onto every step so the ordering assertion survives step auto-completion", "formableToday": false, "blockedBy": "no join instant in stateShape" },
      { "key": "CustomField02", "name": "ownsSpan", "values": ["owned","notOwned"], "required": true, "purpose": "the base/purchaser split every pacing.milestones row is published in", "formableToday": true, "constantToday": "notOwned" },
      { "key": "CustomField03", "name": "runOrdinal", "values": ["run1","later","unknown"], "required": true, "purpose": "both inherited populations are defined over it", "formableToday": false, "blockedBy": "no run ordinal in StoredState" }
    ],
    "customFieldsDeclined": [
      { "name": "deviceClass", "reason": "no server-side observable of device exists inside the seven-channel protocol, and the Creator Dashboard already breaks every metric down by Platform and OS with no developer event", "source": "https://create.roblox.com/docs/production/analytics/analytics-dashboard" }
    ],
    "onboarding": {
      "funnelName": "first_session",
      "stepCount": 6,
      "originsHarmonised": false,
      "steps": [
        { "ordinal": 1, "id": "spawn", "stepName": "spawn", "measuredFrom": "join", "population": "allSessions", "refutes": ["firstSession.beats[spawn].guaranteedOutcome", "firstSession.placement.spawnToNearestPatchMaxStuds"], "emitter": "server/init.server.luau :: onSpawn, after the character pivot to the plot spawn point", "observationPointExistsToday": true, "emitterCallExistsToday": false },
        { "ordinal": 2, "id": "firstClear", "stepName": "first_clear", "measuredFrom": "firstInput", "measuredFromObservedAs": "the arm transition in server/Clearing.luau :: tickPlayer, where arm.armed flips once horizontal XZ displacement from the spawn pivot exceeds firstSession.armDistanceStuds", "originBias": "displacement is strictly later than the input that caused it, so the measured interval is SHORTER than the quantity firstSession.ceilings.secondsToFirstClear names; the ceiling is flattered, never penalised", "population": "run1SessionsArmed", "refutes": ["firstSession.ceilings.secondsToFirstClear.max"], "emitter": "server/Clearing.luau :: clearPatch, after the first Progression.award of this character life", "observationPointExistsToday": true, "emitterCallExistsToday": false },
        { "ordinal": 3, "id": "firstReveal", "stepName": "first_reveal", "measuredFrom": "join", "population": "run1SessionsArmedByJoinSecond5", "refutes": ["firstSession.ceilings.secondsToFirstReveal.max"], "briefPromise": "OPEN.md §2 item (1) and 02-GAMEPLAY.md's ten-second clear-to-reveal line", "emitter": "server/Clearing.luau :: clearPatch, at the FindRevealed fire", "observationPointExistsToday": true, "emitterCallExistsToday": false },
        { "ordinal": 4, "id": "firstOrdinaryClear", "stepName": "first_ordinary_clear", "measuredFrom": "join", "population": "run1Sessions", "refutes": ["firstSession.beats[firstOrdinaryClear].testRange", "firstSession.placement.secondFindOrdinalMin"], "emitter": "server/Clearing.luau :: clearPatch, on the third clear after firstReveal that reveals nothing", "observationPointExistsToday": true, "emitterCallExistsToday": false },
        { "ordinal": 5, "id": "tierContrast", "stepName": "tier_contrast", "measuredFrom": "join", "population": "run1Sessions", "refutes": ["firstSession.beats[tierContrast].testRange", "firstSession.placement.tierContrastWithinFirstOrdinals"], "emitter": "server/Clearing.luau :: clearPatch, on the first clear whose patch.tierIndex differs from every tierIndex cleared so far this session", "observationPointExistsToday": true, "emitterCallExistsToday": false },
        { "ordinal": 6, "id": "firstSpendAffordable", "stepName": "first_spend_affordable", "measuredFrom": "join", "population": "run1Sessions", "refutes": ["firstSession.beats[firstSpendAffordable].testRange", "pacing.milestones[firstPurchase]"], "emitter": "server/Progression.luau :: revealRows, at the cheapest upgrade row's latch transition", "observationPointExistsToday": true, "emitterCallExistsToday": false }
      ],
      "orderingAssertion": {
        "id": "O1",
        "rule": "for every session reaching both steps, bucketIndex(sinceJoinBucket at step N) >= bucketIndex(sinceJoinBucket at step N-1), for N = 2..6",
        "whyItExists": "Roblox funnels auto-complete skipped earlier steps, so the step graph shows 4 and 5 green for a session that reached 6 first; the ordering defect is visible only in the per-step custom-field breakdown",
        "liveCase": "pacing.milestones[firstPurchase] against firstSession.beats[firstSpendAffordable].testRange, open as _verified-wave4.md RR-10",
        "designTimeCatch": "comparing the ordinal column against the bySecond column, which onboarding/03's S3 could not do because it tested one field",
        "readableToday": false
      }
    },
    "populations": [
      { "id": "allSessions", "definition": "every join", "formableToday": true, "blockedBy": null },
      { "id": "run1Sessions", "definition": "sessions where runOrdinal == run1", "formableToday": false, "blockedBy": "stateShape carries no run ordinal" },
      { "id": "run1SessionsArmed", "definition": "run1Sessions in which the arm transition occurred", "formableToday": false, "blockedBy": "run1Sessions, plus the arm flag is never emitted", "inheritedFrom": "firstSession.ceilings.secondsToFirstClear.population" },
      { "id": "run1SessionsArmedByJoinSecond5", "definition": "run1SessionsArmed whose arm transition occurred at or before join second 5.0", "formableToday": false, "blockedBy": "run1Sessions, plus no join instant", "inheritedFrom": "firstSession.ceilings.secondsToFirstReveal.population" },
      { "id": "spanOwners", "definition": "sessions where ownsSpan == owned at join", "formableToday": true, "empty": true, "blockedBy": "products.externalPrerequisite" }
    ],
    "requiresFromOtherKeys": [
      { "key": "stateShape", "field": "sessionStartedAt", "type": "number", "why": "every measuredFrom: join second in firstSession and pacing is unmeasurable without a join instant", "owner": "state-shape work; persistence work is raising the revision request and this sheet does not duplicate it" },
      { "key": "stateShape", "field": "runOrdinal", "type": "number", "why": "both inherited populations are defined over run 1; Persistence.load's readable boolean is true for a first-time player too, so it cannot stand in", "owner": "state-shape work, same request" },
      { "key": "stateShape", "field": "sessionId", "type": "string", "why": "only needed if a recurring funnel is ever added; LogOnboardingFunnelStepEvent does not take one", "owner": "state-shape work", "optional": true },
      { "key": "telemetry", "field": "events[].id for the six emitters above", "why": "event names, payload fields and the required/optional split are event-catalog work; this key names the steps and their order and no event name", "owner": "event-catalog work" }
    ],
    "amendedBy": [
      { "sheet": "cid/analytics/funnels/02-comprehension-instruments.md", "supplies": ["comprehension"] },
      { "sheet": "cid/analytics/funnels/03-the-purchase-read.md", "supplies": ["purchase"] },
      { "sheet": "cid/analytics/funnels/04-drop-off-thresholds.md", "supplies": ["thresholds", "minimumSessions", "forbiddenActions"] }
    ]
  }
}
```

## Consequences for other work

- **Event-catalog work** inherits six call sites with an ordinal, a step name and a custom-field
  layout, and owns every event name, payload field and sampling rule. **If it names steps, two
  sheets claim one key** — the boundary I assert is that the sheet deciding a thing names it, and
  the step order is decided here.
- **State-shape work** gets three named fields and the reason each exists. `runOrdinal` cannot be
  derived from `Persistence.load`'s `readable`, which is true for a fresh save.
- **Protocol and module work** gets one fact and no design: the funnel needs no new channel, because
  all six observation points are already server-side. It needs a clock.
- **Dashboard-and-target work (KPI)** inherits one funnel of the platform's ten and selects from my
  steps. `secondsToFirstReveal` is its headline row and my step 3; **I set the step, the origin and
  the population, it sets the headline target.**
- **Number-and-curve work (Balance)** inherits an instrument that reports on
  `pacing.milestones[firstPurchase]` and `firstSession.beats[firstSpendAffordable].testRange`
  whichever way RR-10 settles, and an ordering assertion that fires on the loser.
- **Onboarding work** is re-timed by nothing here. Every band, ceiling and precondition is quoted
  and none is moved.

## Acceptance criteria

1. `funnels.onboarding.steps[]` has exactly 6 entries; every `id` equals the `firstSession.beats[]`
   entry at the same index, and `ordinal` is 1..6 with no gap or repeat.
2. Exactly one step has `measuredFrom: "firstInput"` and it is `firstClear`; the other five have
   `measuredFrom: "join"`. No step carries a `measuredFrom` value absent from
   `firstSession.ceilings`.
3. `funnels.customFields[]` has exactly 3 entries, their `key` values are `CustomField01`,
   `CustomField02` and `CustomField03`, and the product of their `values` lengths is at most 8,000.
4. Every `refutes` entry names a field path that resolves in the merged manifest, and no `refutes`
   entry, prose line or manifest field in this sheet contains a numeric value copied from `pacing`,
   `firstSession` or `solvency`.

## Not decided here

Event names, payload fields, the required/optional split and sampling (event-catalog work, which
owns `telemetry`). Which of the seven `firstSession.teaching[]` rows is instrumented (`02`, this
domain). Whether a purchase funnel exists at all (`03`, this domain — it does not). Every pass mark,
alarm and action, and the minimum sample below which no rate may be read (`04`, this domain). The
shortlist, review cadence and dashboard layout (dashboard-and-target work). The join instant, run
ordinal and session id as fields (state-shape work; persistence work holds the request). Which way
RR-10 settles (number-and-curve work). `social.maxPlayers`, the denominator of the rate limit
(per-server-capacity work).
