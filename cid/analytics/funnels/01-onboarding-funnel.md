# 01 — The onboarding funnel

**Domain:** analytics/funnels · **Category:** Analytics · **Wave:** 5

## Decision

**One funnel, six steps, one per `firstSession.beats[]` row in its published order, fired through
`LogOnboardingFunnelStepEvent`, with three custom fields: `sinceJoinBucket`, `owned`, `saveState`.**
Origins are per step and inherited verbatim — `firstInput` for `firstClear`, `join` for the other
five. **The out-of-order defect is detected outside the funnel API**, by one custom event whose
numeric value is the count of lower-ordinal steps not yet emitted.

> **Revised, round 1** (`cid/analytics/_verified.md`). RR-11: the `O1` bucket-ordering assertion is
> **withdrawn** — it could not fire in the case it existed to catch — and replaced by the
> skipped-step counter below. RR-10: `ownsSpan ["owned","notOwned"]` is replaced by `telemetry`'s
> encoding, `owned ["none","span"]`. RR-15: **both `stateShape` requests are withdrawn**; neither
> field is needed.

## Why

**Six steps, and no beat is re-timed.** `firstSession.beats[]` is already an ordered ladder with
preconditions and ceilings, so a funnel over it measures a published prediction — the category's
selection principle, *"all three test assumptions this spec rests on rather than reporting vanity"*
`[brief: soft]` (`OPEN.md §2`). The arming transition is not a seventh step; it is the observation
point standing in for step 2's origin.

**`LogOnboardingFunnelStepEvent`, for a decisive reason.** `LogFunnelStepEvent(player, funnelName,
funnelSessionId, step, stepName, customFields)` **requires a `funnelSessionId`**; the one-time method
takes none and is documented for *"conversion events that only occur once per user"*
`[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/production/analytics/funnel-events.md]`.
The first session is once per user by definition.

**The headline instrument's origin is not observable, and this is where that gets said.**
`firstSession.ceilings.secondsToFirstClear` is `measuredFrom: "firstInput"`, and no server-side fact
in `game/src` is first input. What exists is the arming gate: `arm.armed` flips on the tick
horizontal XZ displacement from the spawn pivot first exceeds `firstSession.armDistanceStuds`
`[research: game/src/server/Clearing.luau]`. Displacement is **strictly later** than the input that
produced it, so the realised measurement is `t(firstClear) − t(armed)`, **smaller** than the quantity
the ceiling names. **The bias is one-directional and it flatters the design.** `[cid: decided]`

**Three custom fields, and device is deliberately not one of them.** The platform allows exactly
three, keyed only as `CustomField01/02/03`
`[research: https://create.roblox.com/docs/production/analytics/custom-fields]`, with 8,000 combined
values before the rest group as `Other`
`[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/production/analytics/event-types.md]`.
The brief's `~70/25/5` device split is the wrong spend twice over: events *"can only be sent from the
server and in published games"*
`[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/production/analytics/custom-events.md]`
and no server-side observable of device exists inside a seven-channel protocol; and the Creator
Dashboard already breaks every metric down by Platform and OS with no developer event
`[research: https://create.roblox.com/docs/production/analytics/analytics-dashboard]`. Field 2 adopts
`telemetry`'s `owned ["none","span"]` verbatim — one dimension, one encoding, so a funnel breakdown
joins to a custom-event breakdown. `[cid: decided]`

**`sinceJoinBucket` buys timing distributions and — corrected this round — does not buy step
ordering.** Funnel step events carry no numeric `value`, so a per-step elapsed distribution can only
ride a custom field; that is this field's job, and for a session whose steps arrive in order it
works, because each step's first instance is a real call. **My first draft also claimed it carried
the ordering assertion, and that was wrong.** Two sourced sentences interact and I used one: *"If
you skip a step in a funnel, the earlier steps automatically complete"* **and** *"If a user repeats a
step in a funnel, the funnel only considers the first instance"*
`[research: https://create.roblox.com/docs/production/analytics/funnel-events]`. In the exact case
the assertion existed to catch — step 6 before steps 4 and 5 — step 4's first instance is the
synthetic auto-completion, which is not a call and carries no custom field, and the player's real
step-4 emission is a discarded repeat. **Whether a synthetic completion counts as the first instance,
and whether it records any field value, is undocumented** `[unverified]`. Settled by a Roblox staff
statement on auto-completion semantics, or by the funnel-events page stating what an auto-completed
step records. **The instrument is withdrawn rather than tagged**, because an assertion that may or
may not fire is worse than a stated gap.

**Out-of-order detection is achievable, and not inside the funnel API.**
`LogCustomEvent(player, eventName, value, customFields)` takes a **numeric `value`** and is subject
to no funnel step semantics
`[research: https://create.roblox.com/docs/reference/engine/classes/AnalyticsService]`. So: **one
custom event, fired once per player at the instant step 6 is emitted, whose `value` is the number of
lower-ordinal steps not yet emitted for this player this session.** Zero in the correct case, one or
more in exactly the defect case. The dashboard charts a custom event's value by count, average, sum,
min and max `[research: https://create.roblox.com/docs/production/analytics/custom-events]`. It needs
no clock, no bucket and no cross-step join, and it is derivable from state the emitter already holds
— the server must know which steps have fired in order to emit them. **The event name and payload
are event-catalog work; the value semantics are the instrument and are mine.** `[cid: decided]`

**What the ordinal table still catches that `onboarding/03`'s S3 did not.**
`pacing.milestones[firstPurchase]` publishes a base and a purchaser second;
`firstSession.beats[firstSpendAffordable].testRange` has a lower bound above the base figure, and
`beats[firstOrdinaryClear]` and `beats[tierContrast]` are specced to precede it. `_verified-wave4.md`
RR-10 records why nothing caught it: *"Sheet `03`'s S3 only tests `firstPurchaseBand`"*. **The
ordered table catches it at design time**, by comparing ordinals against the seconds attached to
them. **In production the skipped-step counter catches it and the funnel graph cannot**, which is now
one statement instead of two contradictory ones. Wave 4 is FAIL and unreleased; every figure named
here is a field path.

**Both `stateShape` requests are withdrawn, and that closes RR-15 without either side conceding.**
The run-ordinal request is unnecessary: a brand-new save is byte-equal to `defaultState()`, so
**run 1 is a predicate over the seven fields already persisted** — `currency`, `clearedCount` and
`areasFinished` all zero, `found`, `upgrades`, `rowsRevealed` and `cleared` all empty, with
`readable` true `[research: game/src/server/Persistence.luau]`. Field 3 therefore carries
`saveState ["pristine","progressed","unknown"]`, derived at the join call site, needing no new field
and no `PlayerState` slot — which `tech/networking/02` already declined. The join clock is likewise
module-local: a session cannot outlive its server, so a `UserId → clock` map inside the telemetry
module suffices, which is the technique event-catalog work already used for the session id.
**The boundary with engagement work, agreed rather than contested:** `saveState` is a property of
the save and is **not** the platform's new-user cohort; the two may not be joined, and
`engagement`'s cohort stays the platform's. Its sentence and my field are both true, of different
things. `[cid: decided]`

| # | step id | stepName | measuredFrom | population | field path it can refute | server-side observation point | site exists | call exists |
|---|---|---|---|---|---|---|---|---|
| 1 | `spawn` | `spawn` | `join` | P1 | `firstSession.beats[spawn].guaranteedOutcome`; `firstSession.placement.spawnToNearestPatchMaxStuds` | `server/init.server.luau` · `onSpawn`, after the pivot to the plot spawn point | yes | no |
| 2 | `firstClear` | `first_clear` | **`firstInput`**, realised as the arm transition | P3 | `firstSession.ceilings.secondsToFirstClear.max` | `server/Clearing.luau` · `clearPatch`, after the first `Progression.award` of the life | yes | no |
| 3 | `firstReveal` | `first_reveal` | `join` | P4 | `firstSession.ceilings.secondsToFirstReveal.max` (`OPEN.md §2` item 1) | `server/Clearing.luau` · `clearPatch`, at the `FindRevealed` fire | yes | no |
| 4 | `firstOrdinaryClear` | `first_ordinary_clear` | `join` | P2 | `firstSession.beats[firstOrdinaryClear].testRange`; `firstSession.placement.secondFindOrdinalMin` | `server/Clearing.luau` · `clearPatch`, the third clear after `firstReveal` with no reveal | yes | no |
| 5 | `tierContrast` | `tier_contrast` | `join` | P2 | `firstSession.beats[tierContrast].testRange`; `firstSession.placement.tierContrastWithinFirstOrdinals` | `server/Clearing.luau` · `clearPatch`, on the first clear of a second distinct `patch.tierIndex` | yes | no |
| 6 | `firstSpendAffordable` | `first_spend_affordable` | `join` | P2 | `firstSession.beats[firstSpendAffordable].testRange`; `pacing.milestones[firstPurchase]` | `server/Progression.luau` · `revealRows`, at the cheapest row's latch transition | yes | no |

| field | key | values | what it buys | what it does **not** buy |
|---|---|---|---|---|
| `sinceJoinBucket` | `CustomField01` | `0-5`, `5-10`, `10-20`, `20-45`, `45-90`, `90-300`, `300+` | a per-step elapsed distribution, for sessions whose steps arrive in order | step ordering — an auto-completed step is not a call and carries no field |
| `owned` | `CustomField02` | `none`, `span` | the base/purchaser split every `pacing.milestones` row is published in; encoding shared with `telemetry.customFields.field02` | anything today — constant `none` while every `gamePassId` is null (sheet `03`) |
| `saveState` | `CustomField03` | `pristine`, `progressed`, `unknown` | the run-1 populations, as a predicate over the seven persisted fields | the platform's new-user cohort, which is `engagement`'s and may not be joined to this |

| id | population | definition | formable once the telemetry module exists | what blocks it today |
|---|---|---|---|---|
| P1 | `allSessions` | every join | yes | the telemetry module does not exist |
| P2 | `run1Sessions` | `saveState == pristine` at join | yes | the telemetry module does not exist |
| P3 | `run1SessionsArmed` | P2 ∩ the arm transition occurred | yes | the telemetry module does not exist |
| P4 | `run1SessionsArmedByJoinSecond5` | P3 ∩ arm transition at or before join second 5.0 | yes | the telemetry module does not exist |
| P5 | `spanOwners` | `owned == span` at join | definable, **empty** | `products.externalPrerequisite` — sheet `03` |

**The one bias in `saveState`, stated rather than hidden:** a player who joined, did nothing and left
rejoins with a pristine save and is counted as run 1 again. That over-counts run-1 sessions with
sessions that produced no progress and under-counts nothing — and those are behaviourally first
sessions, which is the population `firstSession.ceilings` is about. `[cid: decided]`

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
      "skipSemantics": "a skipped earlier step auto-completes, so step order is NOT observable from the funnel graph and NOT observable from any custom field on a skipped step",
      "funnelsUsedOfTen": 1,
      "stepsUsedOfHundred": 6
    },
    "customFields": [
      { "key": "CustomField01", "name": "sinceJoinBucket", "values": ["0-5","5-10","10-20","20-45","45-90","90-300","300+"], "unit": "seconds since join", "required": true, "buys": "a per-step elapsed distribution for sessions whose steps arrive in order; funnel step events carry no numeric value, so this is the only carrier for timing", "doesNotBuy": "step ordering: an auto-completed step is not a call and carries no custom field", "formableToday": false, "blockedBy": "the telemetry module does not exist; the join clock is module-local and needs no schema change" },
      { "key": "CustomField02", "name": "owned", "values": ["none","span"], "required": true, "purpose": "the base/purchaser split every pacing.milestones row is published in", "encodingSharedWith": "telemetry.customFields.field02", "formableToday": true, "constantToday": "none" },
      { "key": "CustomField03", "name": "saveState", "values": ["pristine","progressed","unknown"], "required": true, "purpose": "carries the run-1 populations firstSession.ceilings defines", "derivation": "pristine when Persistence.load returns readable and the loaded state is byte-equal to defaultState(): currency, clearedCount and areasFinished all 0, and found, upgrades, rowsRevealed and cleared all empty", "requiresNewPersistedField": false, "bias": "a player who joined, did nothing and left rejoins pristine and is counted as run 1 again; this over-counts run-1 sessions with zero-progress sessions and under-counts nothing", "isNotThePlatformNewUserCohort": true, "mayNotBeJoinedTo": "engagement's retention cohort, which is the platform's", "formableToday": false, "blockedBy": "the telemetry module does not exist" }
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
      "orderingInstrument": {
        "id": "O1",
        "kind": "customEvent",
        "insideFunnelApi": false,
        "firesAt": "the instant funnels.onboarding.steps[firstSpendAffordable] is emitted, once per player per session",
        "valueSemantics": "the count of funnels.onboarding.steps[] entries with a lower ordinal that have NOT yet been emitted for this player this session; 0 in the correct case, 1 or more in exactly the out-of-order case",
        "valueRange": [0, 5],
        "customFieldsRequired": 0,
        "clockRequired": false,
        "derivableFrom": "state the emitter already holds, because the server must know which steps have fired in order to emit them",
        "chartedAs": "count, average, sum, min and max of a custom event's value",
        "chartSource": "https://create.roblox.com/docs/production/analytics/custom-events",
        "eventNameOwnedBy": "event-catalog work; this key names the instrument and its value semantics and no event id",
        "requiresFromOtherKeys": ["telemetry.events[] must carry one LogCustomEvent entry with this value semantics"],
        "readableToday": false,
        "supersedes": {
          "withdrawn": "the bucket-ordering assertion of the first draft, which compared sinceJoinBucket across adjacent steps",
          "why": "two funnel semantics interact: a skipped step auto-completes, and a repeated step counts only its first instance. In the case the assertion existed to catch, the first instance of the skipped step is the synthetic completion, which is not a call and carries no custom field, and the player's real emission is a discarded repeat. The assertion could not fire in exactly the case it was written for.",
          "unverified": "whether a synthetic auto-completion counts as the first instance for repeat suppression, and whether it records any custom-field value at all. Neither is documented on any page in the research pack.",
          "settledBy": "a Roblox staff statement on funnel auto-completion semantics, or the funnel-events page stating what an auto-completed step records",
          "notTaggedAndKept": "an assertion that may or may not fire is worse than a stated gap, so it is withdrawn rather than carried with a tag"
        }
      }
    },
    "populations": [
      { "id": "allSessions", "definition": "every join", "formableToday": false, "blockedBy": "the telemetry module does not exist" },
      { "id": "run1Sessions", "definition": "sessions whose saveState is pristine at join", "formableToday": false, "blockedBy": "the telemetry module does not exist", "requiresNewPersistedField": false },
      { "id": "run1SessionsArmed", "definition": "run1Sessions in which the arm transition occurred", "formableToday": false, "blockedBy": "the telemetry module does not exist", "inheritedFrom": "firstSession.ceilings.secondsToFirstClear.population" },
      { "id": "run1SessionsArmedByJoinSecond5", "definition": "run1SessionsArmed whose arm transition occurred at or before join second 5.0", "formableToday": false, "blockedBy": "the telemetry module does not exist", "inheritedFrom": "firstSession.ceilings.secondsToFirstReveal.population" },
      { "id": "spanOwners", "definition": "sessions where owned == span at join", "formableToday": true, "empty": true, "blockedBy": "products.externalPrerequisite" }
    ],
    "requiresFromOtherKeys": [
      { "key": "telemetry", "field": "a module-local UserId to monotonic-clock map, written at onJoin", "why": "every measuredFrom: join second in firstSession and pacing needs a join instant; a session cannot outlive its server, so this needs no persisted field and no PlayerState slot", "owner": "logging-pipeline work, with event-catalog work holding the module-local convention it already used for the session id", "requiresSchemaChange": false },
      { "key": "telemetry", "field": "events[].id for the six step emitters and for the ordering instrument", "why": "event names, payload fields and the required/optional split are event-catalog work; this key names the steps, their order and the ordering instrument's value semantics, and no event name", "owner": "event-catalog work", "requiresSchemaChange": false }
    ],
    "withdrawnRequests": [
      { "key": "stateShape", "field": "runOrdinal", "withdrawnBecause": "run 1 is a predicate over the seven fields already persisted, so no new field is needed; this resolves the contradiction with engagement work rather than moving it", "raisedIn": "cid/analytics/_verified.md RR-15" },
      { "key": "stateShape", "field": "sessionStartedAt", "withdrawnBecause": "a session cannot outlive its server, so a module-local clock is sufficient; tech/networking/02 declined a thirteenth PlayerState field and this sheet no longer asks for one", "raisedIn": "cid/analytics/_verified.md RR-15" }
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

- **Event-catalog work** inherits six call sites verbatim as `funnels.onboarding.steps[].emitter`,
  plus **one new `LogCustomEvent` entry** for the ordering instrument. The value semantics are fixed
  here; the event id, its field positions and its cadence are theirs. Its funnel-step cap row reads
  **6**, not 4, and its `funnelCallSites[]` drops `onPurchase` — sheet `03` rules there is no
  purchase funnel for a step to belong to.
- **Logging-pipeline work** gets a smaller request than the first draft made: **no schema change at
  all.** One module-local clock map, and one derived `saveState` predicate at the join call site. If
  that module is not built, every threshold stays unreadable — the category's shared exposure, not a
  new one.
- **State-shape and persistence work: both requests are withdrawn.** Nothing in `PlayerState` or
  `StoredState` changes for this key, which removes one of the three positions
  `cid/analytics/_verified.md` records under predicted conflict 4.
- **Engagement work** and this key no longer contradict: `saveState` is a save predicate,
  `engagement`'s run-1 cohort is the platform's, and the two are declared unjoinable. Its sentence
  stands unedited on my account.
- **Dashboard-and-target work (KPI)** inherits one funnel of the platform's ten and selects from my
  steps. `secondsToFirstReveal` is its headline row and my step 3; **I set the step, the origin and
  the population; it sets the headline target and the pass mark**, which sheet `04` now honours.
- **Number-and-curve work (Balance)** gets an instrument that reports on
  `pacing.milestones[firstPurchase]` and `firstSession.beats[firstSpendAffordable].testRange`
  whichever way `_verified-wave4.md` RR-10 settles.

## Acceptance criteria

1. `funnels.onboarding.steps[]` has exactly 6 entries; every `id` equals the `firstSession.beats[]`
   entry at the same index, and `ordinal` is 1..6 with no gap or repeat.
2. Exactly one step has `measuredFrom: "firstInput"` and it is `firstClear`; the other five have
   `measuredFrom: "join"`. No step carries a `measuredFrom` value absent from
   `firstSession.ceilings`.
3. `funnels.customFields[]` has exactly 3 entries with keys `CustomField01`, `CustomField02` and
   `CustomField03`; the product of their `values` lengths is at most 8,000; and field 2's `values`
   array is identical to `telemetry.customFields.field02`'s.
4. `funnels.onboarding.orderingInstrument.insideFunnelApi` is `false`, its `clockRequired` is
   `false`, and no field anywhere in `funnels` asserts that step ordering is observable from the
   funnel graph or from a custom field carried on a step.
5. `funnels.requiresFromOtherKeys[]` contains no entry whose `key` is `stateShape`, and every entry
   has `requiresSchemaChange: false`.

## Not decided here

Event names, payload fields, the required/optional split and sampling, including the ordering
instrument's event id (event-catalog work, which owns `telemetry`). Which of the seven
`firstSession.teaching[]` rows is instrumented (`02`, this domain). Whether a purchase funnel exists
(`03`, this domain — it does not). Every pass mark, alarm and action, and the minimum sample below
which no rate may be read (`04`, this domain). The headline target on `secondsToFirstReveal`, the
shortlist, the cadence and the layout (dashboard-and-target work). Whether the telemetry module is
built at all (logging-pipeline work). The retention cohort and every session-shape definition
(engagement work). Which way `_verified-wave4.md` RR-10 settles (number-and-curve work).
`social.maxPlayers` (per-server-capacity work).
