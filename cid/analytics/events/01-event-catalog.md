# 01 — Event catalog

**Domain:** analytics/events · **Category:** Analytics · **Wave:** 5

## Decision

**Thirteen server-emitted event names, three fixed custom-field positions (`area`, `owned`, one
per-event `detail`), and one numeric `value` per event whose unit is stated per row.** Every one
of the 18 shipped insertion points is dispositioned — twelve emit, three fold into an event that
already carries their fact, and three emit nothing because their quantity is derivable or belongs
to another domain's platform call. Event ids are **ungoverned internal identifiers**, not a
`coinage` block.

## Why

- **Thirteen names against a cap of 100, and three fields against a cap of 3.** The platform's own
  advice is to spend cardinality on fields rather than names — *"You should use custom fields
  whenever possible instead of event names, since there is a much tighter cardinality limit on
  event names than custom fields"* `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/production/analytics/custom-events.md]`.
  The binding constraint is therefore not the name cap (13% used) but the field cap (100% used).
- **`area` takes field 1 because every prediction this catalog refutes is indexed by area
  ordinal.** `pacing.laps[]`, `tierMix.byDepth[]`, `solvency.areaLedger[]` and `depths.areas[]` are
  each arrays keyed by ordinal or depth, so a reading that cannot be split by ordinal refutes none
  of them `[cid: decided]`. Values are `"1"`–`"8"` plus `"post"`, because `layout.areaSpec` above
  ordinal 8 returns `endgame.postTerminalArea` and every post-terminal bay is identical
  `[research: architect/sheets/05-interfaces.md]`.
- **`owned` takes field 2 even though it is constant today, and that is where the 3-field cap
  bites hardest.** `pacing` publishes `baseSeconds` and `purchaserSeconds` for every milestone
  row; nothing on the Creator Dashboard can separate those two populations, and **a reading taken
  unsplit cannot be re-split later**. Every `products.items[].gamePassId` is null, so
  `Entitlements.refresh` resolves every entry to false `[research: game/src/server/Entitlements.luau]`
  and the field reads `"none"` for every event until `products.externalPrerequisite` is
  discharged. **The honest statement is that the catalog runs on two live fields, not three.**
- **Device, OS and age group get no field**, because the dashboard breaks every default metric
  down by *Age Group, Platform, OS, Gender, Source, country, language* with no developer event
  `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/production/analytics/analytics-dashboard.md]`.
- **`area_cleared`'s third field is `lapOrigin`, taken verbatim from `lapClock`, and my own
  five-value composite is withdrawn.** Round 1 produced two spellings for one dimension — my
  `lap` with `single`/`single_reset`/`spanned`/`spanned_reset`/`fallback` against `lapClock`'s
  `lapOrigin` with `completion`/`join` — which is the `ownsSpan` collision recurring one field
  over. **The lap reading is `lapClock`'s subject, its acceptance criterion is already written over
  those two literals and requires any consumer to copy rather than paraphrase them**, so this sheet
  adopts them and drops its own. The composite existed to carry two further `lapClock` exclusions
  in one slot; what that costs is stated below rather than absorbed.
- **What the two-value field costs, exactly, because it is not free.** `lapClock` `X2` counts
  `resetInLap` and `X4` excludes a session whose load fell back to `defaultState`. Neither now has
  a per-lap carrier. `resetInLap` survives **as an aggregate ratio** —
  `count(character_reset at area k) / count(area_cleared at area k)` — which is what a per-ordinal
  column needs and is not what a per-lap flag would give. **`X4` does not survive**: no field, and
  no session id on the wire, so a fallback session's later laps cannot be filtered out. That is a
  new unproducible, `U8`, not a rounding of the requirement.
- **Where the cap forced a second event name instead of a field:** `slot_claimed` exists only
  because `session_start` already spends all three fields on `area`, `owned` and `load`.
- **Identity is the platform's and this catalog defines none.** `LogCustomEvent(player, …)` takes
  a `Player` `[research: https://create.roblox.com/docs/reference/engine/classes/AnalyticsService]`,
  so no event needs, carries or invents a player identifier — which is what makes an 8–14 audience
  a non-issue rather than a mitigation `[brief: binding]` ← *"8–14, mobile-heavy, short sessions"*
  (`00-CORE.md`). Sheet `02` writes the prohibition rows.
- **Event ids are not declared as a `coinage` block.** `theme/vocabulary/02` rules that internal
  field names *"are not player-facing and are not governed by this list"*, and
  `theme/vocabulary/04` caps authored `internalTerms` at two entries. `[cid: decided]`
- **The session id does not need `stateShape`.** `LogFunnelStepEvent` requires a `funnelSessionId`
  and nothing in `Types.luau` holds one, but the id is per-session and never persisted, so the
  telemetry module holds it in a private map keyed by `UserId` — the shape `init.server.luau`
  already uses for `spawnPoses` `[research: game/src/server/init.server.luau]`. The half that
  genuinely needs persistence — a **run ordinal**, which `funnels/01`'s `run1Sessions` population
  and its `runOrdinal` field both rest on — is persistence-shape work's request, not duplicated.
- **`refutes` is migrated to `kpis.refGrammar`'s one `ref` shape and the key carries
  `refShape: 1`.** `refGrammar.gap4_oneShape.migrations` names this migration verbatim —
  *"telemetry: refutes { sheet, field } becomes the same object"* — so the shape is taken, not
  invented. Nine refs are `kind: manifestField` with a `path`; four cite a claim no manifest field
  holds and are `kind: briefLine` with a `sheet` and a quoted `claim`, which is the case
  `refGrammar` added for `economyHealth`'s prose citations and which this key needed too.
  **All thirteen refs sit at exactly one location, `events[*].refutes`** — one path, never a deep
  walk — and that location is declared in `refsLocation` so a per-key registry needs no discovery.
  **I name no discriminator field:** the recognition rule is `kpis.refGrammar`'s, the verifier
  flagged that `economyHealth.readings[].alarm[].kind` collides with the obvious `kind`-sniffing
  answer, and a second spelling from me is the defect this migration exists to close.
- **`telemetry` is a build-read key, not a developer-facing one, and the value is written for a
  builder.** `events[]` is what somebody writes the telemetry module *from* — thirteen insertion
  points, an API call, a numeric value, three field positions and a cadence each. `budget`'s
  sourced ceilings, `forbiddenPayload` and `unproducible` are developer-facing and read by nothing.
  The `promotion` block carries that split, so the technical contract knows which half needs a
  consumer and `deploy/02`'s emit gate knows which half never reaches the emitter.
- **No event in this catalog needs an eighth channel.** All thirteen sites are server-side and
  `Protocol` declares *"Exactly seven channels, and no more"*
  `[research: architect/sheets/05-interfaces.md]`.

### The requirement on module-and-channel-definition work

**Zero analytics calls exist anywhere in `game/src`** `[research: game/src]`. Every insertion point
below is a place a call *could* go. A server module holds the per-session record (id, clock
origins, running maxima, per-session emission caps) and is called from the thirteen sites, with no
new remote and no client participation. **Three call sites need a change to expose a fact they
already have:** `onJoin` discards `Persistence.load`'s second return `readable`
`[research: game/src/server/init.server.luau]`; `tickPlayer` must retain the previous tick's XZ
position for sheet `04`'s movement test; and `Plots` must expose an occupancy count, because
`claimSlot` returns an index and `releaseSlot` can free any index
`[research: game/src/server/Plots.luau]`.

**The brief's own `OPEN.md §2` watch item *"instance count per area on mobile"* cannot be emitted
at all.** *"Events can only be sent from the server and in published games. Events can't be sent
from the client or Studio"*
`[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/production/analytics/custom-events.md]`.
The brief asked to watch something the platform forbids measuring; that is a gap in the interview,
recorded rather than smoothed over.

### The eighteen insertion points, dispositioned

| # | site | disposition |
|---|---|---|
| 1 | `Clearing.clearPatch`, after `Progression.award` | **no custom event.** One `LogEconomyEvent` source per `economyHealth.flows[patch-clear].batchPatchCount` window; granularity and arguments are economy-flow work's |
| 2 | `Clearing.tickPlayer`, at `arm.armed = true` | `run_armed`, first arm of a session only. **Not a funnel emitter** — `funnels/01` step 2 uses this as its *origin* and emits at the first `Progression.award` |
| 3 | `Clearing.clearPatch`, at the `FindRevealed` fire | `find_revealed`; also funnel step 3's emitter |
| 4 | `Clearing.clearPatch`, at the `SetCompleted` fire | `set_completed` |
| 5 | `Clearing.tickPlayer` step 4, at the `areasFinished` increment | `area_cleared` |
| 6 | `Clearing.clearPatch`, the `state.found[find]` guard | `defect_duplicate_find`, capped at 1 per session |
| 7 | `Clearing.clearPatch`, the `tier == nil` branch | `defect_unknown_tier`, capped at 1 per session |
| 8 | `init.server.luau` `onPurchase`, before `tryBuy` | **no event.** Attempts are not exactly countable — see `upgrade_refused.unproducible` |
| 9 | `init.server.luau` `onPurchase`, `tryBuy` false branch | `upgrade_refused` |
| 10 | `init.server.luau` `onPurchase`, at the `UpgradeApplied` fire | **no custom event and no funnel step.** One `LogEconomyEvent` sink; `funnels/03` rules there is no purchase funnel |
| 11 | `Progression.revealRows` | `upgrade_row_lifted`; also funnel step 6's emitter, at the cheapest row's latch transition |
| 12 | `onJoin` step 1, after `Persistence.load` | `session_start`; mints the session id and starts both clocks |
| 13 | `onJoin` step 2, after `Entitlements.refresh` | **folds into `session_start`** as field 2 `owned` |
| 14 | `Plots.claimSlot`, via `onJoin` step 6 | `slot_claimed` |
| 15 | `init.server.luau` `onSpawn` | **no custom event** (spawns = 1 + `character_reset` count), **but it is funnel step 1's emitter** |
| 16 | `init.server.luau` `onDeath` | `character_reset` |
| 17 | `init.server.luau` `onLeave` | `session_end`; carries both session maxima |
| 18 | `startSaveLoop` / `onShutdown` / `Persistence.save` | `save_written`, once per session plus every failure |

```manifest
{
  "provides": "telemetry",
  "status": "proposed",
  "value": {
    "refShape": 1,
    "refsLocation": "every ref emitted by this key sits at events[*].refutes and nowhere else; the ref-recognition rule itself is kpis.refGrammar's to name and this key emits whatever it publishes",
    "transport": "AnalyticsService",
    "clientEmissionPossible": false,
    "newRemoteChannelsRequired": 0,
    "callSiteModuleExists": false,
    "promotion": {
      "buildRead": ["naming", "customFields", "sessionRecord", "clock", "aboveTickPayoffs", "sampling", "events", "economyCallSites", "funnelCallSites", "budget.perServerRequestsPerMinute", "budget.perPlayerRequestsPerMinute"],
      "developerFacing": ["budget.requestsPerMinuteRule", "budget.ccuScope", "budget.eventNameCap", "budget.customFieldCap", "budget.combinedValueCap", "budget.retentionDays", "budget.droppedEventBehaviour", "forbiddenPayload", "unproducible"],
      "why": "events[] is what a builder writes the telemetry module from — insertion point, API call, value, three field positions and a cadence per event — in the same sense composition is. The other six Analytics keys supply no value a Luau module reads; this one does.",
      "consumerNeededIn": "the technical contract, as a telemetry module entry in modules[]",
      "emitGate": "the buildRead half obeys deploy/02's null rule; the developerFacing half should never reach bridge/emit-config.mjs at all"
    },
    "naming": {
      "pattern": "^[a-z][a-z0-9]*(_[a-z0-9]+){1,3}$",
      "casing": "lower_snake_case",
      "maxLength": 32,
      "form": "<subject>_<pastParticiple>, or defect_<subject> for a guard that should never fire",
      "governedByVocabulary": false,
      "governedByVocabularyReason": "internal identifiers, never rendered; theme/vocabulary/02 excludes internal field names and theme/vocabulary/04 caps authored internalTerms at 2"
    },
    "budget": {
      "requestsPerMinuteRule": "120 + (20 * CCU)",
      "ccuScope": "unverified; sheet 03 assumes experience-wide and budgets a server at 20 * runtime.maxPlayers only",
      "evaluatedAtMaxPlayers": 16,
      "perServerRequestsPerMinute": 320,
      "perPlayerRequestsPerMinute": 20,
      "permissiveReadingPerServer": 440,
      "faucetBudgetShare": 0.25,
      "faucetBudgetShareRatifiedFrom": "economyHealth.flows[patch-clear].faucetBudgetShare",
      "tickGapFloorSecondsConservative": 3.0,
      "tickGapFloorSecondsPermissive": 2.18,
      "eventNameCap": 100,
      "eventNamesUsed": 13,
      "customFieldCap": 3,
      "customFieldsUsed": 3,
      "combinedValueCap": 8000,
      "combinedValuesUsed": 900,
      "retentionDays": 90,
      "droppedEventBehaviour": "dropped silently, never retried, the call does not error",
      "droppedEventBehaviourStatus": "unverified; assumed from the funnel-cardinality statement",
      "source": "https://create.roblox.com/docs/production/analytics/event-types"
    },
    "customFields": {
      "field01": {
        "name": "area",
        "required": true,
        "cardinality": 9,
        "values": ["1", "2", "3", "4", "5", "6", "7", "8", "post"],
        "read": "state.areasFinished + 1, clamped to \"post\" above depths.areas length"
      },
      "field02": {
        "name": "owned",
        "required": true,
        "cardinality": 2,
        "values": ["none", "span"],
        "read": "state.owned, resolved once by Entitlements.refresh at onJoin step 2",
        "constantToday": "none",
        "constantUntil": "products.externalPrerequisite",
        "adoptedAlsoBy": "funnels.customFields[CustomField02] — one spelling for one fact"
      },
      "field03": {
        "name": "per-event detail; name and values vary by row",
        "required": false,
        "distinctValuesAcrossCatalog": 49
      },
      "allValuesAreStrings": true,
      "combinedValueArithmetic": "9 * 2 * (49 + 1 absent) = 900"
    },
    "sessionRecord": {
      "heldBy": "the telemetry server module, a private map keyed by UserId",
      "persisted": false,
      "onTheWire": false,
      "inStateShape": false,
      "fields": ["sessionId", "clockOriginSeconds", "lastAboveTickSeconds", "maxPayoffGapSeconds", "tickClockSeconds", "maxTickGapSeconds", "lastTickPositionXZ", "lapEntrySeconds", "lapOriginIsJoin", "perSessionEmissionCounts"],
      "sessionId": "HttpService:GenerateGUID(false), minted at session_start, supplied to funnel-definition work as funnelSessionId",
      "createdAt": "onJoin step 1, after Persistence.load",
      "destroyedAt": "onLeave, after session_end is emitted"
    },
    "clock": {
      "unit": "seconds",
      "source": "os.clock() deltas, monotonic",
      "origin": "the session_start emission instant",
      "absoluteTimeCarried": false,
      "computedServerSide": true,
      "reconstructedDownstream": false,
      "clocks": [
        { "id": "aboveTickGap", "resetBy": ["any aboveTickPayoffs kind landing"], "reportedAs": ["payoffGapSeconds on the ending event", "maxPayoffGapSeconds on session_end"] },
        { "id": "tickGap", "resetBy": ["any patch clear"], "reportedAs": ["maxTickGapSeconds, bucketed, on session_end field 3"], "accumulatesOnlyWhileMoving": true, "movementThresholdStuds": 0.1, "movementThresholdTestRange": [0.05, 0.5] },
        { "id": "lap", "origin": "lapClock.origins.entry — the increment that finished area N-1, or the restore at join", "reportedAs": ["realisedLapSeconds on area_cleared, tagged by lapOrigin"] }
      ],
      "excludes": ["deathToRearm", "postTerminal", "characterNotMoving"],
      "excludeReasons": {
        "deathToRearm": "no character exists, nothing can be paid, and the interval measures runtime.respawnDelaySeconds",
        "postTerminal": "meta/07 scopes the 90-second rule to found < totalFinds; the aboveTickGap maximum stops updating there and the tickGap clock continues",
        "characterNotMoving": "core-loop/01's tick predicate is about a moving player"
      },
      "areaAdvanceResets": false,
      "sessionsSpanned": false,
      "zeroPayoffSentinel": -1
    },
    "aboveTickPayoffs": [
      { "kind": "findReveal", "emittedBy": "find_revealed", "carriesGap": true },
      { "kind": "upgradePurchase", "emittedBy": "LogEconomyEvent sink at onPurchase", "carriesGap": false, "reason": "LogEconomyEvent's amount is the price and the API has no free numeric slot; the contribution survives in maxPayoffGapSeconds" },
      { "kind": "areaCompletion", "emittedBy": "area_cleared", "carriesGap": false, "reason": "its one numeric slot carries realisedLapSeconds, which OPEN.md §2 item (2) has no other carrier for; the contribution survives in maxPayoffGapSeconds" },
      { "kind": "setCompletion", "emittedBy": "set_completed", "carriesGap": true }
    ],
    "sampling": {
      "rate": 1.0,
      "reason": "the stated success metric is shipped artifacts, not players; the population is small enough that sampling a rare event destroys it",
      "exceptions": ["upgrade_refused is capped at 6 per player per session", "defect_duplicate_find and defect_unknown_tier are capped at 1 per player per session", "the patch clear is batched by economyHealth.flows[patch-clear], never sampled"]
    },
    "events": [
      {
        "id": "session_start",
        "cause": "a player's state is loaded and the session record is created",
        "insertionPoint": "game/src/server/init.server.luau :: onJoin, after Persistence.load and Entitlements.refresh",
        "api": "LogCustomEvent",
        "value": "findsHeldAtLoad",
        "valueUnit": "count, 0 to 24",
        "cadence": "perOccurrence",
        "fields": [
          { "position": 1, "name": "area", "required": true, "cardinality": 9 },
          { "position": 2, "name": "owned", "required": true, "cardinality": 2 },
          { "position": 3, "name": "load", "required": true, "cardinality": 2, "values": ["store", "fallback"] }
        ],
        "requiresCallSiteChange": "onJoin currently discards Persistence.load's second return `readable`; the load field needs it",
        "refutes": {
          "kind": "briefLine",
          "path": null,
          "sheet": "cid/gameplay/meta/07-after-the-last-find.md",
          "claim": "whether a player reaches the terminal state at all — meta/07's open question. The distribution of findsHeldAtLoad over returning sessions is what answers it, and no manifest field states the prediction."
        }
      },
      {
        "id": "session_end",
        "cause": "the player leaves and the session record is closed",
        "insertionPoint": "game/src/server/init.server.luau :: onLeave, after Persistence.save and before Plots.despawn",
        "api": "LogCustomEvent",
        "value": "maxPayoffGapSeconds",
        "valueUnit": "seconds; -1 when no above-tick payoff landed, or the whole session was post-terminal",
        "cadence": "perOccurrence",
        "fields": [
          { "position": 1, "name": "area", "required": true, "cardinality": 9 },
          { "position": 2, "name": "owned", "required": true, "cardinality": 2 },
          { "position": 3, "name": "maxtick", "required": true, "cardinality": 5, "values": ["le3", "3to5", "5to10", "10to30", "gt30"] }
        ],
        "verdictOwnedBy": "analytics/events/04 sets the per-session pass predicate; kpis.rows[aboveTickPayoffGapSeconds] sets the target, the alarm and the actor. Both sheets state the same boundary",
        "refutes": {
          "kind": "manifestField",
          "path": "pacing.aboveTickGapMaxSeconds",
          "alsoReads": ["pacing.tickGapRealisedSeconds"],
          "sheet": "cid/gameplay/core-loop/01-payoff-frequency.md"
        }
      },
      {
        "id": "run_armed",
        "cause": "the clearing pass arms for the first time this session",
        "insertionPoint": "game/src/server/Clearing.luau :: tickPlayer, at arm.armed = true",
        "api": "LogCustomEvent",
        "value": "secondsSinceSessionStart",
        "valueUnit": "seconds, join-relative",
        "cadence": "perOccurrence, first arm of a session only",
        "fields": [
          { "position": 1, "name": "area", "required": true, "cardinality": 9 },
          { "position": 2, "name": "owned", "required": true, "cardinality": 2 },
          { "position": 3, "name": "spawn", "required": false, "cardinality": 2, "values": ["join", "respawn"] }
        ],
        "isProxy": "firstSession.ceilings.secondsToFirstClear is measuredFrom firstInput; displacement past armDistanceStuds is strictly later. funnels/01 step 2 uses this transition as its measuredFrom ORIGIN and emits at the first Progression.award; this event is not that step",
        "refutes": {
          "kind": "manifestField",
          "path": "firstSession.ceilings.secondsToFirstClear.max",
          "sheet": "cid/gameplay/onboarding/02-first-minute-beats.md"
        }
      },
      {
        "id": "find_revealed",
        "cause": "a patch clears and the Find under it is new to this player",
        "insertionPoint": "game/src/server/Clearing.luau :: clearPatch, at the FindRevealed fire",
        "api": "LogCustomEvent",
        "value": "payoffGapSeconds",
        "valueUnit": "seconds since the previous above-tick payoff; the session start for the first",
        "cadence": "perOccurrence",
        "fields": [
          { "position": 1, "name": "area", "required": true, "cardinality": 9 },
          { "position": 2, "name": "owned", "required": true, "cardinality": 2 },
          { "position": 3, "name": "slot", "required": true, "cardinality": 3, "values": ["1", "2", "3"] }
        ],
        "fieldNotSpent": "the Find name and the set id are both determined by area ordinal under discovery's seeded partition",
        "refutes": {
          "kind": "manifestField",
          "path": "pacing.laps[*].revealGapMaxSeconds",
          "sheet": "cid/gameplay/balance/05-time-to-milestone.md"
        }
      },
      {
        "id": "set_completed",
        "cause": "the last name of a set turns true",
        "insertionPoint": "game/src/server/Clearing.luau :: clearPatch, at the SetCompleted fire",
        "api": "LogCustomEvent",
        "value": "payoffGapSeconds",
        "valueUnit": "seconds since the previous above-tick payoff",
        "cadence": "perOccurrence, at most 4 per player ever",
        "fields": [
          { "position": 1, "name": "area", "required": true, "cardinality": 9 },
          { "position": 2, "name": "owned", "required": true, "cardinality": 2 },
          { "position": 3, "name": "set", "required": true, "cardinality": 4, "values": ["collection.sets[].id, verbatim, four of them"] }
        ],
        "refutes": {
          "kind": "manifestField",
          "path": "depths.relicSliceAssignment",
          "sheet": "cid/gameplay/meta/04-the-depth-ladder.md",
          "claim": "the two areas at one depth partition that depth's set, so every set_completed is preceded by exactly two area_cleared at that depth"
        }
      },
      {
        "id": "area_cleared",
        "cause": "the live bay's last patch clears and areasFinished increments",
        "insertionPoint": "game/src/server/Clearing.luau :: tickPlayer step 4, at the areasFinished increment",
        "api": "LogCustomEvent",
        "value": "realisedLapSeconds",
        "valueUnit": "seconds from entering this area to finishing it, within one session; laps begun in an earlier session are marked lapOrigin: join and excluded from the realised distribution",
        "cadence": "perOccurrence",
        "valueException": "this is the one above-tick event whose value is not payoffGapSeconds; OPEN.md §2 item (2) has no other carrier and its gap contribution survives in session_end's running maximum",
        "fields": [
          { "position": 1, "name": "area", "required": true, "cardinality": 9 },
          { "position": 2, "name": "owned", "required": true, "cardinality": 2 },
          {
            "position": 3, "name": "lapOrigin", "required": true, "cardinality": 2,
            "values": ["completion", "join"],
            "spellingOwnedBy": "lapClock.originField — these two literals verbatim, copied not paraphrased",
            "meaning": {
              "completion": "entry was the increment that finished the previous area, in this session; enters median and p90",
              "join": "entry was the restore at join, so the lap began in an earlier session; excluded from every realised figure and counted in spannedLapCount"
            },
            "withdrawn": "this sheet's round-1 five-value composite (single / single_reset / spanned / spanned_reset / fallback) is withdrawn in favour of lapClock's two literals"
          }
        ],
        "fieldsDropped": [
          "the per-lap finds count — a function of area under systems/05's partition, so it buys no information",
          "the per-lap reset flag — recoverable as an aggregate ratio, count(character_reset at area k) / count(area_cleared at area k), which is what lapClock's resetInLap column needs",
          "the per-lap store-fallback flag — NOT recoverable; see unproducible U8"
        ],
        "refutes": {
          "kind": "manifestField",
          "path": "pacing.laps[*].realisedLapSeconds",
          "sheet": "cid/gameplay/balance/05-time-to-milestone.md"
        }
      },
      {
        "id": "upgrade_row_lifted",
        "cause": "a withheld upgrade row becomes affordable and is revealed",
        "insertionPoint": "game/src/server/Progression.luau :: revealRows",
        "api": "LogCustomEvent",
        "value": "secondsSinceSessionStart",
        "valueUnit": "seconds, join-relative",
        "cadence": "perOccurrence, at most 3 per player ever",
        "fields": [
          { "position": 1, "name": "area", "required": true, "cardinality": 9 },
          { "position": 2, "name": "owned", "required": true, "cardinality": 2 },
          { "position": 3, "name": "row", "required": true, "cardinality": 3, "values": ["value", "radius", "speed"] }
        ],
        "refutes": {
          "kind": "manifestField",
          "path": "firstSession.beats[\"firstSpendAffordable\"].testRange",
          "sheet": "cid/gameplay/onboarding/02-first-minute-beats.md"
        }
      },
      {
        "id": "upgrade_refused",
        "cause": "a purchase message is dropped at the type guard, or tryBuy returns false",
        "insertionPoint": "game/src/server/init.server.luau :: onPurchase, the type guard and the tryBuy false branch",
        "api": "LogCustomEvent",
        "value": 1,
        "valueUnit": "count",
        "cadence": "perOccurrence, capped at 6 per player per session",
        "capTestRange": [3, 20],
        "capReason": "BuyUpgrade is client-originated; tech/networking ingressLimits bounds it at 10/s sustained, which is 600/min against a 20/min per-player analytics allowance, so an uncapped counter would spend thirty times the whole budget",
        "fields": [
          { "position": 1, "name": "area", "required": true, "cardinality": 9 },
          { "position": 2, "name": "owned", "required": true, "cardinality": 2 },
          { "position": 3, "name": "reason", "required": true, "cardinality": 2, "values": ["rejected", "malformed"] }
        ],
        "unproducible": "why tryBuy refused — it returns a bare boolean, so insufficient balance, unknown id and level cap are one value, `rejected`. AND the attempt total itself: attempts = purchased + refused has FOUR uncountable terms. (1) tryBuy's erased causes. (2) messages past this event's 6-per-session cap. (3) events dropped by the analytics rate limit, which is silent. (4) messages dropped by ingressLimits BEFORE the handler — I2 forbids any warn, print or log on that path, so a rate-dropped BuyUpgrade is invisible everywhere. Attempts is a lower bound, never a count.",
        "refutes": {
          "kind": "manifestField",
          "path": "firstSession.withheld[\"upgradeRow\"]",
          "sheet": "cid/gameplay/onboarding/04-run-one-withholds.md",
          "claim": "a row lifts only when its own level-1 cost is affordable, so a nonzero rejected rate means the latch is wrong"
        }
      },
      {
        "id": "defect_duplicate_find",
        "cause": "a patch hides a Find this player already holds",
        "insertionPoint": "game/src/server/Clearing.luau :: clearPatch, the state.found[find] guard",
        "api": "LogCustomEvent",
        "value": 1,
        "valueUnit": "count",
        "cadence": "perOccurrence, capped at 1 per player per session",
        "fields": [
          { "position": 1, "name": "area", "required": true, "cardinality": 9 },
          { "position": 2, "name": "owned", "required": true, "cardinality": 2 },
          { "position": 3, "name": "find", "required": true, "cardinality": 24, "values": ["collection.sets[].relics[], verbatim"] }
        ],
        "expectedRate": 0,
        "refutes": {
          "kind": "manifestField",
          "path": "discovery.repeat.possible",
          "sheet": "cid/gameplay/systems/05-the-find-ledger.md"
        }
      },
      {
        "id": "defect_unknown_tier",
        "cause": "a patch names a tierIndex GameConfig.Tiers does not have",
        "insertionPoint": "game/src/server/Clearing.luau :: clearPatch, the tier == nil branch",
        "api": "LogCustomEvent",
        "value": "patchTierIndex",
        "valueUnit": "the offending index",
        "cadence": "perOccurrence, capped at 1 per player per session",
        "capReason": "a broken config reaches this branch on every patch; uncapped it would exhaust the rate budget by itself",
        "fields": [
          { "position": 1, "name": "area", "required": true, "cardinality": 9 },
          { "position": 2, "name": "owned", "required": true, "cardinality": 2 }
        ],
        "expectedRate": 0,
        "refutes": {
          "kind": "manifestField",
          "path": "tierMix.byDepth",
          "sheet": "cid/gameplay/balance/02-patch-payout-and-depth-mix.md",
          "claim": "every tierIndex the depth-aware draw produces resolves against a tiers row"
        }
      },
      {
        "id": "save_written",
        "cause": "a save completes, or a save fails",
        "insertionPoint": "game/src/server/init.server.luau :: startSaveLoop, onShutdown and onLeave, via Persistence.save",
        "api": "LogCustomEvent",
        "value": "storedKeyCount",
        "valueUnit": "count of keys in the written payload",
        "cadence": "aggregated — the last successful save of a session, plus every failure",
        "fields": [
          { "position": 1, "name": "area", "required": true, "cardinality": 9 },
          { "position": 2, "name": "owned", "required": true, "cardinality": 2 },
          { "position": 3, "name": "outcome", "required": true, "cardinality": 2, "values": ["ok", "failed"] }
        ],
        "refutes": {
          "kind": "briefLine",
          "path": null,
          "sheet": "cid/gameplay/meta/07-after-the-last-find.md",
          "claim": "persistence must not grow a boolean per post-terminal area — one integer, and the bay currently occupied. This is OPEN.md §2's watch item 'save size as areas accumulate', which names no field."
        }
      },
      {
        "id": "slot_claimed",
        "cause": "a lane slot is claimed at join",
        "insertionPoint": "game/src/server/Plots.luau :: claimSlot, via onJoin step 6",
        "api": "LogCustomEvent",
        "value": "occupiedLaneCount",
        "valueUnit": "the number of taken slots immediately after this claim — a COUNT, not the claimed index",
        "requiresCallSiteChange": "Plots must expose an occupancy count. claimSlot scans upward for the lowest free index and releaseSlot frees any index, so after one mid-session leave the two diverge: with {1,3} occupied the next claim returns 2 while occupancy is 3",
        "upstreamDefect": "plots.slotsAreContiguousWhileOccupied is asserted in game/src/server/Plots.luau and is false once releaseSlot has run. Reported to plot-arrangement work; this event does not depend on the claim being true",
        "cadence": "perOccurrence",
        "fields": [
          { "position": 1, "name": "area", "required": true, "cardinality": 9 },
          { "position": 2, "name": "owned", "required": true, "cardinality": 2 }
        ],
        "refutes": {
          "kind": "briefLine",
          "path": null,
          "sheet": "cid/gameplay/social/02-presence-sufficiency.md",
          "claim": "whether enough players are concurrently online for two to be connected at all — stated there as the condition on every criterion, and carried by no manifest field."
        }
      },
      {
        "id": "character_reset",
        "cause": "a Humanoid dies, which is only reachable through the Roblox menu's Reset Character",
        "insertionPoint": "game/src/server/init.server.luau :: onDeath",
        "api": "LogCustomEvent",
        "value": "secondsSinceSessionStart",
        "valueUnit": "seconds, join-relative",
        "cadence": "perOccurrence",
        "alsoServes": "lapClock's resetInLap column, as the aggregate ratio count(character_reset at area k) / count(area_cleared at area k)",
        "fields": [
          { "position": 1, "name": "area", "required": true, "cardinality": 9 },
          { "position": 2, "name": "owned", "required": true, "cardinality": 2 }
        ],
        "refutes": {
          "kind": "manifestField",
          "path": "traversal.death.possibleByDesign",
          "sheet": "cid/gameplay/mechanics/06-traversal-affordances.md",
          "claim": "the only route to a death is the Roblox menu — a high rate at deep ordinals would instead mean players reset to skip the end-of-lap walk-back"
        }
      }
    ],
    "economyCallSites": [
      {
        "site": "Clearing.clearPatch, after Progression.award",
        "api": "LogEconomyEvent",
        "flow": "Source",
        "cadence": "economyHealth.flows[patch-clear] — one event per batchPatchCount patches, flushed on that key's flushOn list",
        "granularityOwnedBy": "analytics/economy",
        "argumentsOwnedBy": "analytics/economy"
      },
      {
        "site": "init.server.luau onPurchase, at the UpgradeApplied fire",
        "api": "LogEconomyEvent",
        "flow": "Sink",
        "cadence": "perOccurrence",
        "priceRecomputedAs": "config.upgradeCost(def, newLevel - 1)",
        "argumentsOwnedBy": "analytics/economy"
      }
    ],
    "funnelCallSites": [
      { "ordinal": 1, "stepId": "spawn", "site": "server/init.server.luau :: onSpawn, after the character pivot to the plot spawn point", "api": "LogOnboardingFunnelStepEvent" },
      { "ordinal": 2, "stepId": "firstClear", "site": "server/Clearing.luau :: clearPatch, after the first Progression.award of this character life", "api": "LogOnboardingFunnelStepEvent" },
      { "ordinal": 3, "stepId": "firstReveal", "site": "server/Clearing.luau :: clearPatch, at the FindRevealed fire", "api": "LogOnboardingFunnelStepEvent" },
      { "ordinal": 4, "stepId": "firstOrdinaryClear", "site": "server/Clearing.luau :: clearPatch, on the third clear after firstReveal that reveals nothing", "api": "LogOnboardingFunnelStepEvent" },
      { "ordinal": 5, "stepId": "tierContrast", "site": "server/Clearing.luau :: clearPatch, on the first clear whose patch.tierIndex differs from every tierIndex cleared so far this session", "api": "LogOnboardingFunnelStepEvent" },
      { "ordinal": 6, "stepId": "firstSpendAffordable", "site": "server/Progression.luau :: revealRows, at the cheapest upgrade row's latch transition", "api": "LogOnboardingFunnelStepEvent" },
      { "note": "taken verbatim from funnels.onboarding.steps[].emitter; step names, ordinals, populations and pass marks are funnel-definition work's and none is set here" },
      { "note": "there is NO purchase-funnel call site. funnels/03 rules the first-purchase funnel has zero observable in-game steps" },
      { "note": "LogFunnelStepEvent carries no numeric value parameter, so no elapsed second may ride on a funnel step; every elapsed second in this catalog rides on a custom event's value" },
      { "note": "funnelSessionId, where a recurring funnel needs one, is telemetry.sessionRecord.sessionId" }
    ],
    "forbiddenPayload": [
      { "id": "N1", "never": "an email address", "rule": "platform PII enumeration", "source": "https://about.roblox.com/community-standards", "observable": "no declared field value contains @; no field name matches /mail/i" },
      { "id": "N2", "never": "a home or postal address", "rule": "platform PII enumeration", "source": "https://about.roblox.com/community-standards", "observable": "no field name matches /addr|street|zip|postcode/i" },
      { "id": "N3", "never": "a telephone number", "rule": "platform PII enumeration", "source": "https://about.roblox.com/community-standards", "observable": "no field name matches /phone|tel|mobile.?number/i; no declared value matches /\\d{7,}/" },
      { "id": "N4", "never": "financial information or a real-money amount attributed to a person", "rule": "platform PII enumeration", "source": "https://about.roblox.com/community-standards", "observable": "no field name matches /card|payment|iban|bank|usd|price/i" },
      { "id": "N5", "never": "medical or health information", "rule": "platform PII enumeration", "source": "https://about.roblox.com/community-standards", "observable": "no field name matches /health|medical|diagnos/i" },
      { "id": "N6", "never": "a password, access token, session cookie or credential", "rule": "platform PII enumeration", "source": "https://about.roblox.com/community-standards", "observable": "no field name matches /pass(word)?|token|secret|cred|auth/i" },
      { "id": "N7", "never": "an off-platform internet identifier", "rule": "platform PII enumeration", "source": "https://about.roblox.com/community-standards", "observable": "no field name matches /discord|twitter|handle|social|external/i" },
      { "id": "N8", "never": "visual or audio media of a user, including an asset id of user media", "rule": "platform PII enumeration", "source": "https://about.roblox.com/community-standards", "observable": "no field carries an rbxassetid; no field name matches /image|photo|audio|voice|asset/i" },
      { "id": "N9", "never": "any identifier for any player, including the recipient's own", "rule": "social.forbidden X7; the Player argument already supplies identity", "source": "cid/gameplay/social/03-nothing-between-players.md", "observable": "no field name matches /userid|user_id|playerid|displayname|username/i and ^name$ appears in no field name" },
      { "id": "N10", "never": "any player-authored string", "rule": "social.forbidden X9", "source": "cid/gameplay/social/03-nothing-between-players.md", "observable": "every fields[].values[] is a closed enum and no field has cardinality \"unbounded\"" },
      { "id": "N11", "never": "any second player's state", "rule": "no mechanical interaction", "source": "concept/spec/incremental-spinoff-v2/02-GAMEPLAY.md", "observable": "every value is read from the recipient's own PlayerState; slot_claimed.value is an occupancy count, not another player's state" },
      { "id": "N12", "never": "any field that exists to be shown", "rule": "theme/tone/04 X10, measure freely display none of it", "source": "cid/theme/tone/04-do-nots.md", "observable": "no cid/ui-ux sheet names a telemetry field" },
      { "id": "N13", "never": "a leaderboard position or top-N membership", "rule": "03-META.md priority 3, leaderboards", "source": "concept/spec/incremental-spinoff-v2/03-META.md", "observable": "no field name matches /leader|top|board|rank/i" },
      { "id": "N14", "never": "a percentile or rank against a population", "rule": "03-META.md priority 3, leaderboards, and X10", "source": "concept/spec/incremental-spinoff-v2/03-META.md", "observable": "no field name matches /percentile|pct.?rank|quantile/i" },
      { "id": "N15", "never": "a daily streak, consecutive-day count or login window", "rule": "03-META.md priority 3, daily rewards", "source": "concept/spec/incremental-spinoff-v2/03-META.md", "observable": "no field name matches /streak|daily|login|consecutive/i" },
      { "id": "N16", "never": "a season, event calendar or limited-time window", "rule": "03-META.md priority 3, seasons and events", "source": "concept/spec/incremental-spinoff-v2/03-META.md", "observable": "no field name matches /season|event.?id|calendar|limited/i" },
      { "id": "N17", "never": "a code, redemption or promo state", "rule": "03-META.md priority 3, codes", "source": "concept/spec/incremental-spinoff-v2/03-META.md", "observable": "no field name matches /code|promo|redeem|voucher/i" },
      { "id": "N18", "never": "a trade, gift or transfer between players", "rule": "03-META.md priority 3, trading", "source": "concept/spec/incremental-spinoff-v2/03-META.md", "observable": "no field name matches /trade|gift|transfer|send.?to/i" },
      { "id": "N19", "never": "a rebirth, prestige or reset cycle", "rule": "03-META.md priority 3, rebirth; cleared is permanent", "source": "concept/spec/incremental-spinoff-v2/03-META.md", "observable": "no field name matches /rebirth|prestige|reset.?count|ascend/i; character_reset names a Roblox menu action, not a progress reset" },
      { "id": "N20", "never": "an offline-accrual period or time-away figure", "rule": "03-META.md priority 3, offline accrual", "source": "concept/spec/incremental-spinoff-v2/03-META.md", "observable": "no field name matches /offline|away|idle.?time|since.?last/i; lapOrigin join is an exclusion flag with no duration attached" },
      { "id": "N21", "never": "a figure comparing one player to another", "rule": "X10 plus priority-3 leaderboards", "source": "cid/theme/tone/04-do-nots.md", "observable": "no event value or field is a function of more than one player" },
      { "id": "N22", "never": "a custom field spent on Platform, OS, device class or Age Group", "rule": "the dashboard supplies all four with no developer event", "source": "https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/production/analytics/analytics-dashboard.md", "observable": "no field name matches /platform|device|^os$|age|viewport|fps/i" },
      { "id": "N23", "never": "an absolute wall-clock date, time of day or Unix timestamp", "rule": "cid: decided — a date beside a Player narrows identity and answers nothing an elapsed second does not", "source": "cid/analytics/events/02-never-logged.md", "observable": "every seconds-valued valueUnit says since session start, since the previous above-tick payoff, or from entering this area" },
      { "id": "N24", "never": "a free-text or unbounded-cardinality field", "rule": "8,000 combined values, after which values are grouped as Other", "source": "https://create.roblox.com/docs/production/analytics/event-types", "observable": "combinedValuesUsed is a finite integer and every fields[].cardinality is a number" }
    ],
    "unproducible": [
      { "id": "U1", "what": "every client-side fact, categorically — device class, viewport, frame rate, whether a beat was seen, index-panel opens", "why": "events can only be sent from the server; index-screen.toggle() is a direct local call with no packet", "proxy": "Platform and OS as a free dashboard breakdown", "wouldSettleIt": "an eighth Protocol channel, which this sheet does not request" },
      { "id": "U2", "what": "OPEN.md §2's watch item, instance count per area on mobile", "why": "a client fact under U1", "proxy": "none", "wouldSettleIt": "an eighth channel plus a client reporter; the brief asked to watch something the platform forbids measuring" },
      { "id": "U3", "what": "first input", "why": "nothing server-side observes input; the arming gate observes displacement, which is strictly later", "proxy": "run_armed.value, an upper bound", "wouldSettleIt": "a client message carrying the first-input instant" },
      { "id": "U4", "what": "a run ordinal, so \"run-1 sessions\" is a formable population", "why": "StoredState carries no join count and no session count; funnels/01's run1Sessions and its runOrdinal field both rest on it", "proxy": "the platform's new-user cohort", "wouldSettleIt": "persistence-shape work's stateShape revision request; not duplicated here" },
      { "id": "U5", "what": "why a purchase was refused, and the attempt total itself", "why": "tryBuy's bare boolean, this event's session cap, silent analytics rate-drops, and ingressLimits I2 forbidding any log on the pre-handler drop path", "proxy": "upgrade_refused count as a lower bound", "wouldSettleIt": "tryBuy returning a reason enum, and a counter Networking is willing to expose on the I2 path" },
      { "id": "U6", "what": "duplicate volume as an economy rate", "why": "systems/05's partition makes it structurally zero; defect_duplicate_find is a correctness counter, not a rate", "proxy": "none", "wouldSettleIt": "nothing — the quantity does not exist" },
      { "id": "U7", "what": "whether a neighbour was perceived", "why": "social/02's criteria need a client frustum test", "proxy": "slot_claimed.value, presence rather than perception", "wouldSettleIt": "a client-side visibility report, which U1 forbids" },
      { "id": "U8", "what": "lapClock exclusion X4 — filtering out laps from a session whose load fell back to defaultState", "why": "lapOrigin is two values and all three field slots on area_cleared are spent, so the fallback flag has no per-lap carrier; session_start.load records it once per session and nothing joins the two events", "proxy": "none per lap. The affected share is bounded in aggregate by session_start.load and save_written.outcome", "wouldSettleIt": "a fourth custom field, which the platform does not have, or a session id on the wire" }
    ]
  }
}
```

## Consequences for other work

- **Session and lap-clock work** gets its spelling adopted unchanged — `lapOrigin`, `completion`,
  `join` — and inherits two consequences of the two-value form it should state on its side:
  `resetInLap` becomes an aggregate ratio over `character_reset`, not a per-lap flag; and **`X4` is
  unproducible** (`U8`), so a fallback session's later laps cannot be excluded.
- **Module-and-channel-definition work** inherits one server module, thirteen call sites, six funnel
  emitters, two economy call sites, zero new remotes, and three changes at existing sites: `onJoin`
  keeps `readable`, `tickPlayer` keeps the previous XZ position, and `Plots` exposes an occupancy
  count. `telemetry.promotion.buildRead` names the half it reads.
- **KPI-shortlist work** owns the ref-recognition rule. This key carries `refShape: 1`, emits the
  `ref` object at exactly one location, `events[*].refutes`, and declares that location in
  `refsLocation` so a per-key registry needs no discovery. It names no discriminator field.
- **Contract-and-seam work** can resolve `telemetry`'s refs today: nine `manifestField` paths and
  four `briefLine` refs, all conforming to `refGrammar.pathGrammar`. Several point at proposed keys
  (`pacing`, `depths`, `tierMix`, `discovery`, `firstSession`) and land in `pendingRefs[]` by design.
- **Economy-flow work** owns the faucet's granularity outright; this sheet points at
  `economyHealth.flows[patch-clear]` and rules none of it, ratifies `faucetBudgetShare` 0.25, and
  supplies 320 as the denominator its `batchRule` divides by.
- **Funnel-definition work** gets six emitters verbatim, `CustomField02` as `owned` with
  `["none","span"]`, and `funnelSessionId` without a `stateShape` change.
- **Plot-arrangement work** inherits a defect, not a request:
  `plots.slotsAreContiguousWhileOccupied` is false after any mid-session leave.

## Acceptance criteria

1. `telemetry.events[]` has exactly 13 entries; every `id` matches
   `^[a-z][a-z0-9]*(_[a-z0-9]+){1,3}$`, is at most 32 characters, and no two entries share an `id`.
2. `telemetry.refShape` is 1; every entry's `refutes` carries a `kind` of `manifestField` or
   `briefLine` and a non-empty `sheet`; every `manifestField` ref has a non-null `path` parsing
   under `kpis.refGrammar.pathGrammar`; every `briefLine` ref has `path: null` and a non-empty
   `claim`; and no ref carries `field`, `value`, `min`, `max` or a numeric target.
3. `area_cleared`'s field 3 is named `lapOrigin` with exactly the two values `completion` and
   `join`, identical to `lapClock.originField`; `combinedValuesUsed` 900 equals `9 × 2 × 50`, where
   49 is the sum of field-3 cardinalities (`2+5+2+3+4+2+3+2+24+2`).
4. `funnelCallSites[]` has exactly 6 ordinal entries whose `site` strings equal
   `funnels.onboarding.steps[].emitter` at the same ordinal, none naming `onPurchase`, and
   `economyCallSites[0].cadence` names `economyHealth.flows[patch-clear]` and no window of its own.

## Not decided here

The reasoning behind each prohibition row — sheet `02`, this domain. How much may be emitted and
what a dropped event means — sheet `03`. The clock, the gap derivation and the per-session pass
predicate — sheet `04`. The ref-recognition rule and every element of `refGrammar` — KPI-shortlist
work; this key conforms and names nothing. The lap's population, its exclusion verdicts and its
aggregations — session and lap-clock work, which owns `lapOrigin`'s spelling. Funnel step names,
ordinals, populations and pass marks — funnel-definition work. Every `LogEconomyEvent` argument
value, `batchPatchCount` and its flush list — economy-flow work. Every target and alarm —
KPI-shortlist work. How the pipe is built, batched, retried or stored — logging-pipeline work.
