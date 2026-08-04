# 01 — The onboarding funnel

**Domain:** analytics/funnels · **Category:** Analytics · **Wave:** 5

## Decision

**One funnel, six steps, one per `firstSession.beats[]` row in its published order, fired through
`LogOnboardingFunnelStepEvent`, with three custom fields: `sinceStepOriginBucket`, `owned`,
`saveState`.** Origins are per step and inherited verbatim — `firstInput` for `firstClear`, `join`
for the other five — **and the bucket field carries each step's own origin rather than one shared
one.** The out-of-order defect is detected outside the funnel API, by one custom event whose numeric
value is the count of lower-ordinal steps not yet emitted.

> **Revised, round 2** (`cid/analytics/_verified.md`). The `saveState` derivation was **wrong**:
> `Persistence.load` runs `reconcile` before returning, which fills `rowsRevealed` and `found` with
> 27 `false` keys, so *"all empty"* was false for every player. Corrected to **no `true` value**.
> `sinceJoinBucket` becomes `sinceStepOriginBucket`, per-step in origin and split at both ceilings,
> so `04`'s `T3` has a carrier. **RR-15 is settled in one direction: no persisted field.** Five
> acceptance criteria become four.

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

**The bucket field carries the step's origin, not one global origin — corrected this round.** My
first draft named it `sinceJoinBucket` and declared its unit *"seconds since join"*, which made
step 2 uncomputable: step 2's ceiling is arm-relative, the arm transition is explicitly not a step,
and nothing carried seconds-since-arm at all. **The fix is that the field's origin is
`funnels.onboarding.steps[].measuredFrom` for the step it rides**, which is not a new rule — it is
the per-step-origin rule this domain already inherited and may not harmonise. One field, one source
of truth for its unit, and no second field. **Its edges are placed at the two ceilings** so each
falls on a boundary rather than inside a bucket; the first draft's bottom bucket straddled the
first-clear ceiling, so no percentile computed from it could be compared against that ceiling. Eight
values now, product `8 × 2 × 3 = 48` against a cap of 8,000. **If either ceiling moves, the bucket
set moves with it** — the dependency is declared in the manifest rather than left implicit.
`[cid: decided]`

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
`telemetry`'s `owned ["none","span"]` verbatim.

**The bucket buys timing distributions and does not buy step ordering.** Funnel step events carry no
numeric `value`, so a per-step elapsed distribution can only ride a custom field. Two sourced
sentences interact and my first draft used one: *"If you skip a step in a funnel, the earlier steps
automatically complete"* **and** *"If a user repeats a step in a funnel, the funnel only considers
the first instance"*
`[research: https://create.roblox.com/docs/production/analytics/funnel-events]`. In the case an
ordering assertion exists to catch, the skipped step's first instance is the synthetic
auto-completion, which is not a call and carries no custom field, and the player's real emission is
a discarded repeat. Whether a synthetic completion counts as the first instance, and whether it
records any value, is undocumented `[unverified]`; settled by a Roblox staff statement on
auto-completion semantics. **The assertion was withdrawn rather than tagged**, because one that may
or may not fire is worse than a stated gap.

**Out-of-order detection is achievable, and not inside the funnel API.**
`LogCustomEvent(player, eventName, value, customFields)` takes a **numeric `value`** and is subject
to no funnel step semantics
`[research: https://create.roblox.com/docs/reference/engine/classes/AnalyticsService]`. **One custom
event, fired once at the instant step 6 is emitted, whose `value` is the number of lower-ordinal
steps not yet emitted this session** — zero in the correct case, one or more in exactly the defect
case. Charted by count, average, sum, min and max
`[research: https://create.roblox.com/docs/production/analytics/custom-events]`. No clock, no bucket,
no cross-step join, and derivable from state the emitter already holds: steps 4, 5 and 6 have
stateful predicates, so a module that can emit them is already tracking which have fired. **The
event name is event-catalog work's; the value semantics are mine.** `[cid: decided]`

**What the ordinal table still catches that `onboarding/03`'s S3 did not.**
`pacing.milestones[firstPurchase]` publishes a base and a purchaser second;
`firstSession.beats[firstSpendAffordable].testRange` has a lower bound above the base figure, and
`beats[firstOrdinaryClear]` and `beats[tierContrast]` are specced to precede it. `_verified-wave4.md`
RR-10 records why nothing caught it: *"Sheet `03`'s S3 only tests `firstPurchaseBand`"*. The ordered
table catches it at design time; **in production the skipped-step counter catches it and the funnel
graph cannot.** Wave 4 is FAIL and unreleased; every figure named here is a field path.

**RR-15, settled with engagement work in one direction: no persisted field, one shared predicate.**
Round 1 crossed — I withdrew the `stateShape.runOrdinal` request and engagement work adopted it, so
persistence-shape work faced two answers with the polarity reversed. **The direction is withdrawal,
for three reasons and not one.** (a) The predicate works: verification confirms it was *written*
wrong, not unworkable, so *"the predicate cannot be built"* is not available as an argument for the
field. (b) Neither domain has a row needing an **integer**: mine needs run-1-or-not, and
`engagement.populations.returning` is the complementary half of that same binary, which
`saveState == "progressed"` supplies exactly. (c) Persistence-shape work has already withdrawn its
own request and banned a session counter by name, so the field would be a **new request against a
closed question** — and a new request is filed, not implied by a `supports` string. **`saveState` is
therefore the single named carrier both keys read**, declared as `sharedPredicate` below so there is
one definition rather than two. What engagement work must do to converge is named in
`## Consequences`, including the one case that would legitimately reopen it. `[cid: decided]`

**And the predicate itself, corrected.** `Persistence.load` runs `reconcile` before returning, and
`reconcile` fills `rowsRevealed` with one `false` per upgrade row and `found` with one `false` per
Find name `[research: game/src/server/Persistence.luau]`. So *"byte-equal to `defaultState()`"* and
*"`found` and `rowsRevealed` empty"* were both false of the returned state at every call site, and a
builder implementing them literally would have emitted `progressed` for every session forever. The
test is **no `true` value** in either map. The `readable` conjunct stays and closes the
DataStore-failure bias: a returning player whose read failed gets `defaultState()` back and would
otherwise have read `pristine`. **One residue, recorded and not requested:** a stored payload that is
present but not a table is treated as a fresh session with `readable` still true, so a returning
player with a corrupted save reads `pristine`. It warns, it is rare, and it meets neither
stopping-rule bar.

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
| `sinceStepOriginBucket` | `CustomField01` | `0-3`, `3-5`, `5-10`, `10-20`, `20-45`, `45-90`, `90-300`, `300+` | a per-step elapsed distribution, in **that step's own `measuredFrom` unit**, with both `firstSession.ceilings` values on bucket edges | step ordering — an auto-completed step is not a call and carries no field. Nor any band narrower than its containing bucket (`04`) |
| `owned` | `CustomField02` | `none`, `span` | the base/purchaser split every `pacing.milestones` row is published in; encoding shared with `telemetry.customFields.field02` | anything today — constant `none` while every `gamePassId` is null (sheet `03`) |
| `saveState` | `CustomField03` | `pristine`, `progressed`, `unknown` | the run-1 populations, **and** `engagement.populations.returning` as its complement | the platform's new-user cohort, and any integer run count |

| id | population | definition | formable once the telemetry module exists | what blocks it today |
|---|---|---|---|---|
| P1 | `allSessions` | every join | yes | the telemetry module does not exist |
| P2 | `run1Sessions` | `saveState == pristine` at join | yes | the telemetry module does not exist |
| P3 | `run1SessionsArmed` | P2 ∩ the arm transition occurred | yes | the telemetry module does not exist |
| P4 | `run1SessionsArmedByJoinSecond5` | P3 ∩ arm transition at or before join second 5.0 | yes | the telemetry module does not exist |
| P5 | `spanOwners` | `owned == span` at join | definable, **empty** | `products.externalPrerequisite` — sheet `03` |

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
      "combinedValuesUsed": 48,
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
      "skipSemantics": "a skipped earlier step auto-completes, so step order is NOT observable from the funnel graph and NOT observable from any custom field on a step",
      "funnelsUsedOfTen": 1,
      "stepsUsedOfHundred": 6
    },
    "customFields": [
      {
        "key": "CustomField01",
        "name": "sinceStepOriginBucket",
        "values": ["0-3", "3-5", "5-10", "10-20", "20-45", "45-90", "90-300", "300+"],
        "unit": "seconds since the origin named by funnels.onboarding.steps[].measuredFrom FOR THE STEP THIS RIDES — arm-relative on step 2, join-relative on the other five. The origins are not harmonised, per firstSession.ceilings.",
        "required": true,
        "buys": "a per-step elapsed distribution for sessions whose steps arrive in order",
        "doesNotBuy": ["step ordering: an auto-completed step is not a call and carries no custom field", "any band narrower than its containing bucket; see funnels.thresholds bucketResolutionLimit"],
        "edgesPlacedAt": ["firstSession.ceilings.secondsToFirstClear.max", "firstSession.ceilings.secondsToFirstReveal.max"],
        "edgeDependency": "both ceilings fall on a bucket boundary rather than inside a bucket. If either ceiling moves, this value list moves with it; a ceiling strictly inside a bucket makes the corresponding threshold uncomputable.",
        "correctedFrom": "sinceJoinBucket, whose declared unit was seconds since join and whose bottom bucket straddled the first-clear ceiling, leaving 04's T3 with no carrier and no resolving boundary. cid/analytics/_verified.md, round 2.",
        "formableToday": false,
        "blockedBy": "the telemetry module does not exist; the clock it needs is module-local and requires no schema change"
      },
      { "key": "CustomField02", "name": "owned", "values": ["none", "span"], "required": true, "purpose": "the base/purchaser split every pacing.milestones row is published in", "encodingSharedWith": "telemetry.customFields.field02", "formableToday": true, "constantToday": "none" },
      {
        "key": "CustomField03",
        "name": "saveState",
        "values": ["pristine", "progressed", "unknown"],
        "required": true,
        "purpose": "carries the run-1 populations firstSession.ceilings defines, and engagement.populations.returning as its complement",
        "derivation": "pristine when Persistence.load returns readable AND no value in found is true AND no value in rowsRevealed is true AND upgrades is empty AND cleared is empty AND currency, clearedCount and areasFinished are all 0. Otherwise progressed. unknown only where the join call site could not run the test.",
        "notByteEquality": "Persistence.load runs reconcile before returning, and reconcile fills rowsRevealed with one false per upgrade row and found with one false per Find name, so the returned state is NEVER byte-equal to defaultState() and those two maps are NEVER empty. The test is no TRUE value, not emptiness.",
        "correctedFrom": "'byte-equal to defaultState(): ... found, upgrades, rowsRevealed and cleared all empty', which is false of the returned state at every call site and which a literal implementation would evaluate to progressed for every session forever. cid/analytics/_verified.md, round 2.",
        "requiresNewPersistedField": false,
        "bias": "a player who joined, did nothing and left rejoins pristine and is counted as run 1 again; this over-counts run-1 sessions with zero-progress sessions and under-counts nothing",
        "residue": "Persistence.load treats a stored payload that is present but not a table as a fresh session with readable still true, so a returning player with a corrupted save reads pristine. It warns, it is rare, and it meets neither stopping-rule bar: recorded, not requested.",
        "isNotThePlatformNewUserCohort": true,
        "carriesNoIntegerRunCount": true,
        "formableToday": false,
        "blockedBy": "the telemetry module does not exist"
      }
    ],
    "sharedPredicate": {
      "definedBy": "funnels",
      "field": "funnels.customFields[saveState]",
      "readBy": ["funnels.populations[run1Sessions]", "engagement.populations.returning"],
      "mapping": { "run1": "saveState == pristine", "returning": "saveState == progressed" },
      "rule": "This is the single definition of the run-1 split for the Analytics category. No other key may restate it, and no key may define a second run-1 predicate over different fields.",
      "settles": "cid/analytics/_verified.md RR-15, in the direction of no persisted field",
      "reopensOnlyIf": "a row in any key needs an INTEGER run count rather than the run-1/not-run-1 binary. That is a new request against persistence-shape work, which has withdrawn its own request and banned a session counter by name, and it must be filed by the domain that owns the row, naming the row.",
      "mayNotBeJoinedTo": "the platform's new-user cohort, which the Creator Dashboard supplies and which is defined over acquisition rather than over save contents"
    },
    "customFieldsDeclined": [
      { "name": "deviceClass", "reason": "no server-side observable of device exists inside the seven-channel protocol, and the Creator Dashboard already breaks every metric down by Platform and OS with no developer event", "source": "https://create.roblox.com/docs/production/analytics/analytics-dashboard" }
    ],
    "onboarding": {
      "funnelName": "first_session",
      "stepCount": 6,
      "originsHarmonised": false,
      "steps": [
        { "ordinal": 1, "id": "spawn", "stepName": "spawn", "measuredFrom": "join", "population": "allSessions", "refutes": ["firstSession.beats[spawn].guaranteedOutcome", "firstSession.placement.spawnToNearestPatchMaxStuds"], "emitter": "server/init.server.luau :: onSpawn, after the character pivot to the plot spawn point", "observationPointExistsToday": true, "emitterCallExistsToday": false },
        { "ordinal": 2, "id": "firstClear", "stepName": "first_clear", "measuredFrom": "firstInput", "measuredFromObservedAs": "the arm transition in server/Clearing.luau :: tickPlayer, where arm.armed flips once horizontal XZ displacement from the spawn pivot exceeds firstSession.armDistanceStuds", "bucketOrigin": "the arm transition — this step's sinceStepOriginBucket is arm-relative, not join-relative", "originBias": "displacement is strictly later than the input that caused it, so the measured interval is SHORTER than the quantity firstSession.ceilings.secondsToFirstClear names; the ceiling is flattered, never penalised", "population": "run1SessionsArmed", "refutes": ["firstSession.ceilings.secondsToFirstClear.max"], "emitter": "server/Clearing.luau :: clearPatch, after the first Progression.award of this character life", "observationPointExistsToday": true, "emitterCallExistsToday": false },
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
        "liveCaseValue": 2,
        "customFieldsRequired": 0,
        "clockRequired": false,
        "derivableFrom": "state the emitter already holds: steps 4, 5 and 6 carry stateful predicates, so a module able to emit them is already tracking which have fired",
        "chartedAs": "count, average, sum, min and max of a custom event's value",
        "chartSource": "https://create.roblox.com/docs/production/analytics/custom-events",
        "eventNameOwnedBy": "event-catalog work; this key names the instrument and its value semantics and no event id",
        "requiresFromOtherKeys": ["telemetry.events[] must carry one LogCustomEvent entry with this value semantics"],
        "readableToday": false,
        "supersedes": {
          "withdrawn": "the bucket-ordering assertion of the first draft, which compared bucket values across adjacent steps",
          "why": "two funnel semantics interact: a skipped step auto-completes, and a repeated step counts only its first instance. In the case the assertion existed to catch, the first instance of the skipped step is the synthetic completion, which is not a call and carries no custom field, and the player's real emission is a discarded repeat.",
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
      { "key": "telemetry", "field": "a module-local UserId to monotonic-clock map, written at onJoin", "why": "every join-relative and arm-relative second needs an origin instant; a session cannot outlive its server, so this needs no persisted field and no PlayerState slot", "owner": "logging-pipeline work, with event-catalog work holding the module-local convention it already used for the session id", "requiresSchemaChange": false },
      { "key": "telemetry", "field": "events[].id for the six step emitters and for the ordering instrument", "why": "event names, payload fields and the required/optional split are event-catalog work; this key names the steps, their order and the ordering instrument's value semantics, and no event name", "owner": "event-catalog work", "requiresSchemaChange": false }
    ],
    "withdrawnRequests": [
      { "key": "stateShape", "field": "runOrdinal", "withdrawnBecause": "run 1 is a predicate over the fields already persisted; verification confirms the predicate was written wrong rather than unworkable, and neither this key nor engagement has a row needing an integer run count", "settledWith": "engagement work, in the direction of no persisted field; see sharedPredicate", "raisedIn": "cid/analytics/_verified.md RR-15" },
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

- **Engagement work — the joint half of RR-15, stated so both sheets can be diffed.** Three edits
  converge us: `runOrdinalRuling.supports` becomes `null` (the request it names no longer exists);
  `populations.returning` is repointed at `funnels.customFields[saveState] == "progressed"`, which is
  the exact complement of my run-1 split and needs no field; and each of the six
  `derivableIf: "stateShape.runOrdinal"` rows is re-marked against `saveState`. **The one legitimate
  exception, named rather than assumed:** a row needing an *integer* run count is not served by a
  binary, and that row — if one exists — is a **new request against persistence-shape work, filed by
  engagement work and naming the row**, because that domain withdrew its own request and banned a
  session counter by name. A `supports` string pointing at a withdrawn request is not a filing.
- **Persistence-shape work owes this category nothing.** Both of my requests are withdrawn, the
  shared predicate reads only fields already persisted, and `sharedPredicate.reopensOnlyIf` states
  the single condition under which anyone may come back.
- **Event-catalog work** inherits six call sites verbatim, **one new `LogCustomEvent` entry** for the
  ordering instrument, and a bucket field whose unit is per-step. Its funnel-step cap row reads 6.
- **Logging-pipeline work** gets one module-local clock map and one derived predicate at the join
  call site — **no schema change at all.** If the module is not built, every threshold in `04` stays
  unreadable, which is the category's shared exposure and not a new one.
- **Onboarding work** gains one dependency it did not have: `firstSession.ceilings[].max` values now
  sit on bucket edges, so moving either ceiling moves `funnels.customFields[sinceStepOriginBucket]
  .values`. That is declared in `edgeDependency` rather than left for someone to discover.
- **Dashboard-and-target work (KPI)** sets the headline target on `secondsToFirstReveal`; I set the
  step, the origin and the population, which `04` honours.

## Acceptance criteria

1. `funnels.onboarding.steps[]` has exactly 6 entries; every `id` equals the `firstSession.beats[]`
   entry at the same index; `ordinal` is 1..6 with no gap or repeat; exactly one entry has
   `measuredFrom: "firstInput"` and it is `firstClear` while the other five have `"join"`; and no
   entry carries a `measuredFrom` value absent from `firstSession.ceilings`.
2. `funnels.customFields[]` has exactly 3 entries keyed `CustomField01`–`03`; the product of their
   `values` lengths is at most 8,000; field 2's `values` is identical to
   `telemetry.customFields.field02`'s; and both values in
   `customFields[sinceStepOriginBucket].edgesPlacedAt` appear as a boundary between two adjacent
   buckets rather than strictly inside one.
3. `funnels.onboarding.orderingInstrument.insideFunnelApi` and `.clockRequired` are both `false`, and
   no field anywhere in `funnels` asserts that step ordering is observable from the funnel graph or
   from a custom field carried on a step.
4. `funnels.requiresFromOtherKeys[]` contains no entry whose `key` is `stateShape`, every entry has
   `requiresSchemaChange: false`, and `funnels.customFields[saveState].derivation` contains no
   assertion that `found` or `rowsRevealed` is empty.

## Not decided here

Event names, payload fields, the required/optional split and sampling, including the ordering
instrument's event id (event-catalog work, which owns `telemetry`). Which of the seven
`firstSession.teaching[]` rows is instrumented (`02`, this domain). Whether a purchase funnel exists
(`03`, this domain — it does not). Every pass mark, alarm and action, and the minimum sample below
which no rate may be read (`04`, this domain). The headline target on `secondsToFirstReveal`, the
shortlist, the cadence and the layout (dashboard-and-target work). Whether the telemetry module is
built at all (logging-pipeline work). Every session-shape and retention definition, and whether any
engagement row needs an integer run count (engagement work). Whether `StoredState` ever grows a
field for any other reason (persistence-shape work). Which way `_verified-wave4.md` RR-10 settles
(number-and-curve work). `social.maxPlayers` (per-server-capacity work).
