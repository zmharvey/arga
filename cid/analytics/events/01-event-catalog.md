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
  ordinal** — `pacing.laps[]`, `tierMix.byDepth[]`, `solvency.areaLedger[]` and `depths.areas[]`
  are all per-area, and a reading that cannot be split by ordinal refutes none of them
  `[research: cid/analytics/_category.md]`. Values are `"1"`–`"8"` plus `"post"`, because
  `layout.areaSpec` above ordinal 8 returns `endgame.postTerminalArea` and every post-terminal bay
  is identical `[research: architect/sheets/05-interfaces.md]`.
- **`owned` takes field 2 even though it is constant today, and that is where the 3-field cap
  bites hardest.** `pacing` publishes `baseSeconds` and `purchaserSeconds` for every milestone
  row; nothing on the Creator Dashboard can separate those two populations, and a reading taken
  without the split cannot be re-split later. Every `products.items[].gamePassId` is null, so
  `Entitlements.refresh` resolves every entry to false `[research: game/src/server/Entitlements.luau]`
  and the field reads `"none"` for every event until `products.externalPrerequisite` is
  discharged. **The honest statement is that the catalog runs on two live fields, not three.**
- **Device, OS and age group get no field**, because the dashboard breaks every default metric
  down by *Age Group, Platform, OS, Gender, Source, country, language* with no developer event
  `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/production/analytics/analytics-dashboard.md]`.
  Spending a field on a dimension the platform gives free would cost the only slot `detail` has.
- **Where the cap forced a second event name rather than a third field:** `slot_claimed` exists
  only because `session_start` already spends all three fields on `area`, `owned` and `load`, and
  the claimed slot index is the one co-presence fact the shipped build can produce. That is the
  trade the platform doc warns about, made deliberately and once.
- **Identity is the platform's and this catalog defines none.** `LogCustomEvent(player, …)` takes
  a `Player` `[research: https://create.roblox.com/docs/reference/engine/classes/AnalyticsService]`,
  so no event needs, carries or invents a player identifier — which is what makes an 8–14 audience
  a non-issue rather than a mitigation `[brief: binding]` ← *"8–14, mobile-heavy, short sessions"*
  (`00-CORE.md`). Sheet `02` writes the prohibition rows.
- **Event ids are not declared as a `coinage` block.** `theme/vocabulary/02` rules that internal
  field names *"are not player-facing and are not governed by this list"*, and
  `theme/vocabulary/04` caps authored `internalTerms` at two entries — thirteen ids would be a
  merge problem, and none of them is ever rendered under `theme/tone/04` `X10`. `[cid: decided]`
- **The session id does not need `stateShape`.** `LogFunnelStepEvent` requires a `funnelSessionId`
  and nothing in `Types.luau` holds one, but the id is per-session and never persisted, so the
  telemetry module holds it in a private map keyed by `UserId` — exactly the shape
  `init.server.luau` already uses for `spawnPoses` `[research: game/src/server/init.server.luau]`.
  **That closes the session-id half of the three-domain gap at zero cost to `stateShape`.** The
  half that genuinely needs persistence — a run ordinal, so "run-1" is a formable population — is
  persistence-shape work's `stateShape` revision request and is not duplicated here.
- **No event in this catalog needs an eighth channel.** All thirteen sites are server-side, and
  `Protocol` declares *"Exactly seven channels, and no more"*
  `[research: architect/sheets/05-interfaces.md]`. The seven-channel limit is not breached by
  anything here, and the client-side facts that would breach it are declared unproducible below
  rather than requested.
- **`LogProgressionEvent` is considered and declined.** The game has no levels or checkpoints
  beyond area ordinals, and `area_cleared` already carries the ordinal and the lap. `[cid: decided]`

### The requirement on module-and-channel-definition work

**Zero analytics calls exist anywhere in `game/src` — `AnalyticsService` and `LogService` return
no hits across all 29 modules** `[research: game/src]`. Every insertion point below is a place a
call *could* go. This sheet states the requirement and designs no pipeline: a server module
holding the per-session record (id, clock origins, running maxima, per-session emission caps) and
called from the thirteen sites, with no new remote and no client participation. Two call sites
need a one-line change to expose a fact they already compute: `onJoin` discards
`Persistence.load`'s second return `readable` `[research: game/src/server/init.server.luau]`, and
`tickPlayer` must retain the previous tick's XZ position so "moving" is testable for sheet `04`'s
tick-gap clock.

**The brief's own `OPEN.md §2` watch item *"instance count per area on mobile"* cannot be emitted
at all.** *"Events can only be sent from the server and in published games. Events can't be sent
from the client or Studio"*
`[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/production/analytics/custom-events.md]`,
and instance count on a device is a client fact. It is a gap in the interview, recorded here
rather than smoothed over: the brief asked to watch something the platform forbids measuring.

### The eighteen insertion points, dispositioned

| # | site | disposition |
|---|---|---|
| 1 | `Clearing.clearPatch`, after `Progression.award` | **no custom event.** Aggregated into one `LogEconomyEvent` source per area (sheet `03`); arguments are economy-flow work's |
| 2 | `Clearing.tickPlayer`, at `arm.armed = true` | `run_armed`, first arm of a session only |
| 3 | `Clearing.clearPatch`, at the `FindRevealed` fire | `find_revealed` |
| 4 | `Clearing.clearPatch`, at the `SetCompleted` fire | `set_completed` |
| 5 | `Clearing.tickPlayer` step 4, at the `areasFinished` increment | `area_cleared` |
| 6 | `Clearing.clearPatch`, the `state.found[find]` guard | `defect_duplicate_find`, capped at 1 per session |
| 7 | `Clearing.clearPatch`, the `tier == nil` branch | `defect_unknown_tier`, capped at 1 per session |
| 8 | `init.server.luau` `onPurchase`, before `tryBuy` | **no event.** Attempts = `purchased + refused`, both emitted; only the malformed-message drop is not derivable and it rides on `upgrade_refused` |
| 9 | `init.server.luau` `onPurchase`, `tryBuy` false branch | `upgrade_refused` |
| 10 | `init.server.luau` `onPurchase`, at the `UpgradeApplied` fire | **no custom event.** One `LogEconomyEvent` sink; price recomputed as `config.upgradeCost(def, newLevel - 1)`; arguments are economy-flow work's |
| 11 | `Progression.revealRows` | `upgrade_row_lifted` |
| 12 | `onJoin` step 1, after `Persistence.load` | `session_start`; also mints the session id and starts both clocks |
| 13 | `onJoin` step 2, after `Entitlements.refresh` | **folds into `session_start`** as field 2 `owned`; emitted after step 2 so the value is resolved |
| 14 | `Plots.claimSlot`, via `onJoin` step 6 | `slot_claimed` |
| 15 | `init.server.luau` `onSpawn` | **no event.** Spawns = 1 + `character_reset` count |
| 16 | `init.server.luau` `onDeath` | `character_reset` |
| 17 | `init.server.luau` `onLeave` | `session_end`; carries both session maxima |
| 18 | `startSaveLoop` / `onShutdown` / `Persistence.save` | `save_written`, once per session plus every failure |

```manifest
{
  "provides": "telemetry",
  "status": "proposed",
  "value": {
    "transport": "AnalyticsService",
    "clientEmissionPossible": false,
    "newRemoteChannelsRequired": 0,
    "callSiteModuleExists": false,
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
      "tickGapFloorSecondsConservative": 3.0,
      "tickGapFloorSecondsPermissive": 2.18,
      "eventNameCap": 100,
      "eventNamesUsed": 13,
      "customFieldCap": 3,
      "customFieldsUsed": 3,
      "combinedValueCap": 8000,
      "combinedValuesUsed": 936,
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
        "constantUntil": "products.externalPrerequisite"
      },
      "field03": {
        "name": "per-event detail; name and values vary by row",
        "required": false,
        "distinctValuesAcrossCatalog": 51
      },
      "allValuesAreStrings": true,
      "combinedValueArithmetic": "9 * 2 * (51 + 1 absent) = 936"
    },
    "sessionRecord": {
      "heldBy": "the telemetry server module, a private map keyed by UserId",
      "persisted": false,
      "onTheWire": false,
      "inStateShape": false,
      "fields": ["sessionId", "clockOriginSeconds", "lastAboveTickSeconds", "maxPayoffGapSeconds", "tickClockSeconds", "maxTickGapSeconds", "lastTickPositionXZ", "perSessionEmissionCounts"],
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
        { "id": "tickGap", "resetBy": ["any patch clear"], "reportedAs": ["maxTickGapSeconds, bucketed, on session_end field 3"], "accumulatesOnlyWhileMoving": true, "movementThresholdStuds": 0.1, "movementThresholdTestRange": [0.05, 0.5] }
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
      "exceptions": ["upgrade_refused is capped at 6 per player per session", "defect_duplicate_find and defect_unknown_tier are capped at 1 per player per session", "the patch clear is aggregated, never sampled"]
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
        "refutes": { "sheet": "gameplay/meta/07-after-the-last-find", "field": "endgame — whether a player reaches the terminal state at all" }
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
        "refutes": { "sheet": "gameplay/core-loop/01-payoff-frequency", "field": "pacing.aboveTickGapMaxSeconds and the 3-second tick ceiling" }
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
        "isProxy": "firstSession.ceilings.secondsToFirstClear is measuredFrom firstInput; displacement past armDistanceStuds is strictly later, so this value is an upper bound and never the figure itself",
        "refutes": { "sheet": "gameplay/onboarding/02-first-minute-beats", "field": "firstSession.ceilings.secondsToFirstClear" }
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
        "fieldNotSpent": "the Find name and the set id are both determined by area ordinal under discovery's seeded partition, so neither buys information",
        "refutes": { "sheet": "gameplay/balance/05-time-to-milestone", "field": "pacing.revealGapSeconds" }
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
        "refutes": { "sheet": "gameplay/meta/04-the-depth-ladder", "field": "depths.relicSliceAssignment — every set_completed must be preceded by exactly two area_cleared at that depth" }
      },
      {
        "id": "area_cleared",
        "cause": "the live bay's last patch clears and areasFinished increments",
        "insertionPoint": "game/src/server/Clearing.luau :: tickPlayer step 4, at the areasFinished increment",
        "api": "LogCustomEvent",
        "value": "realisedLapSeconds",
        "valueUnit": "seconds from entering this area to finishing it, session-spanning time excluded",
        "cadence": "perOccurrence",
        "valueException": "this is the one above-tick event whose value is not payoffGapSeconds; OPEN.md §2 item (2) has no other carrier and its gap contribution survives in session_end's running maximum",
        "fields": [
          { "position": 1, "name": "area", "required": true, "cardinality": 9 },
          { "position": 2, "name": "owned", "required": true, "cardinality": 2 },
          { "position": 3, "name": "finds", "required": true, "cardinality": 4, "values": ["0", "1", "2", "3"] }
        ],
        "refutes": { "sheet": "gameplay/balance/05-time-to-milestone", "field": "pacing.laps[].realisedLapSeconds" }
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
        "refutes": { "sheet": "gameplay/onboarding/04-run-one-withholds", "field": "firstSession.beats[firstSpendAffordable].testRange" }
      },
      {
        "id": "upgrade_refused",
        "cause": "a purchase message is dropped or tryBuy returns false",
        "insertionPoint": "game/src/server/init.server.luau :: onPurchase, the type guard and the tryBuy false branch",
        "api": "LogCustomEvent",
        "value": 1,
        "valueUnit": "count",
        "cadence": "perOccurrence, capped at 6 per player per session",
        "capTestRange": [3, 20],
        "capReason": "BuyUpgrade is client-originated and a malformed message is dropped silently, so an uncapped counter is one analytics request per client fire and would exhaust the server budget alone",
        "fields": [
          { "position": 1, "name": "area", "required": true, "cardinality": 9 },
          { "position": 2, "name": "owned", "required": true, "cardinality": 2 },
          { "position": 3, "name": "reason", "required": true, "cardinality": 2, "values": ["rejected", "malformed"] }
        ],
        "unproducible": "why tryBuy refused. It returns a bare boolean, so insufficient balance, unknown id and level cap are one value, `rejected`",
        "refutes": { "sheet": "gameplay/onboarding/04-run-one-withholds", "field": "firstSession.withheld[upgradeRow] — a row lifts only when affordable, so a nonzero rejected rate means the latch is wrong" }
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
        "refutes": { "sheet": "gameplay/systems/05-the-find-ledger", "field": "discovery.repeat.possible" }
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
        "refutes": { "sheet": "gameplay/balance/02-patch-payout-and-depth-mix", "field": "tierMix.byDepth — every drawn tierIndex resolves against tiers" }
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
        "refutes": { "sheet": "gameplay/meta/07-after-the-last-find", "field": "endgame — one integer and the bay occupied, never a boolean per post-terminal area; this is OPEN.md §2's \"save size as areas accumulate\"" }
      },
      {
        "id": "slot_claimed",
        "cause": "a lane slot is claimed at join",
        "insertionPoint": "game/src/server/Plots.luau :: claimSlot, via onJoin step 6",
        "api": "LogCustomEvent",
        "value": "claimedSlotIndex",
        "valueUnit": "1-based slot index, which equals the occupied lane count because claiming is lowest-free-index and slots stay contiguous",
        "cadence": "perOccurrence",
        "fields": [
          { "position": 1, "name": "area", "required": true, "cardinality": 9 },
          { "position": 2, "name": "owned", "required": true, "cardinality": 2 }
        ],
        "refutes": { "sheet": "gameplay/social/02-presence-sufficiency", "field": "the stated condition on every criterion — whether a second player is present at all" }
      },
      {
        "id": "character_reset",
        "cause": "a Humanoid dies, which is only reachable through the Roblox menu's Reset Character",
        "insertionPoint": "game/src/server/init.server.luau :: onDeath",
        "api": "LogCustomEvent",
        "value": "secondsSinceSessionStart",
        "valueUnit": "seconds, join-relative",
        "cadence": "perOccurrence",
        "fields": [
          { "position": 1, "name": "area", "required": true, "cardinality": 9 },
          { "position": 2, "name": "owned", "required": true, "cardinality": 2 }
        ],
        "refutes": { "sheet": "gameplay/mechanics/06-traversal-affordances", "field": "traversal.death.possibleByDesign — and by extension whether players reset to skip the end-of-lap walk-back balance/03 sized at 900 and 1,320 studs" }
      }
    ],
    "economyCallSites": [
      { "site": "Clearing.clearPatch, after Progression.award", "api": "LogEconomyEvent", "flow": "Source", "cadence": "aggregated per area completion", "windowAlternative": "a fixed 60 s window, test range 30 to 180 s", "argumentsOwnedBy": "analytics/economy" },
      { "site": "init.server.luau onPurchase, at the UpgradeApplied fire", "api": "LogEconomyEvent", "flow": "Sink", "cadence": "perOccurrence", "priceRecomputedAs": "config.upgradeCost(def, newLevel - 1)", "argumentsOwnedBy": "analytics/economy" }
    ],
    "funnelCallSites": [
      { "site": "onJoin step 1, after Persistence.load", "api": "LogOnboardingFunnelStepEvent", "stepNamesOwnedBy": "analytics/funnels" },
      { "site": "Clearing.tickPlayer, at arm.armed = true", "api": "LogOnboardingFunnelStepEvent", "stepNamesOwnedBy": "analytics/funnels" },
      { "site": "Clearing.clearPatch, at the FindRevealed fire", "api": "LogOnboardingFunnelStepEvent", "stepNamesOwnedBy": "analytics/funnels" },
      { "site": "init.server.luau onPurchase, at the UpgradeApplied fire", "api": "LogOnboardingFunnelStepEvent", "stepNamesOwnedBy": "analytics/funnels" },
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
      { "id": "N11", "never": "any second player's state", "rule": "no mechanical interaction", "source": "concept/spec/incremental-spinoff-v2/02-GAMEPLAY.md", "observable": "every value is read from the recipient's own PlayerState" },
      { "id": "N12", "never": "any field that exists to be shown", "rule": "theme/tone/04 X10, measure freely display none of it", "source": "cid/theme/tone/04-do-nots.md", "observable": "no cid/ui-ux sheet names a telemetry field" },
      { "id": "N13", "never": "a leaderboard position or top-N membership", "rule": "03-META.md priority 3, leaderboards", "source": "concept/spec/incremental-spinoff-v2/03-META.md", "observable": "no field name matches /leader|top|board|rank/i" },
      { "id": "N14", "never": "a percentile or rank against a population", "rule": "03-META.md priority 3, leaderboards, and X10", "source": "concept/spec/incremental-spinoff-v2/03-META.md", "observable": "no field name matches /percentile|pct.?rank|quantile/i" },
      { "id": "N15", "never": "a daily streak, consecutive-day count or login window", "rule": "03-META.md priority 3, daily rewards", "source": "concept/spec/incremental-spinoff-v2/03-META.md", "observable": "no field name matches /streak|daily|login|consecutive/i" },
      { "id": "N16", "never": "a season, event calendar or limited-time window", "rule": "03-META.md priority 3, seasons and events", "source": "concept/spec/incremental-spinoff-v2/03-META.md", "observable": "no field name matches /season|event.?id|calendar|limited/i" },
      { "id": "N17", "never": "a code, redemption or promo state", "rule": "03-META.md priority 3, codes", "source": "concept/spec/incremental-spinoff-v2/03-META.md", "observable": "no field name matches /code|promo|redeem|voucher/i" },
      { "id": "N18", "never": "a trade, gift or transfer between players", "rule": "03-META.md priority 3, trading", "source": "concept/spec/incremental-spinoff-v2/03-META.md", "observable": "no field name matches /trade|gift|transfer|send.?to/i" },
      { "id": "N19", "never": "a rebirth, prestige or reset cycle", "rule": "03-META.md priority 3, rebirth; cleared is permanent", "source": "concept/spec/incremental-spinoff-v2/03-META.md", "observable": "no field name matches /rebirth|prestige|reset.?count|ascend/i" },
      { "id": "N20", "never": "an offline-accrual period or time-away figure", "rule": "03-META.md priority 3, offline accrual", "source": "concept/spec/incremental-spinoff-v2/03-META.md", "observable": "no field name matches /offline|away|idle.?time|since.?last/i" },
      { "id": "N21", "never": "a figure comparing one player to another", "rule": "X10 plus priority-3 leaderboards", "source": "cid/theme/tone/04-do-nots.md", "observable": "no event value or field is a function of more than one player" },
      { "id": "N22", "never": "a custom field spent on Platform, OS, device class or Age Group", "rule": "the dashboard supplies all four with no developer event", "source": "https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/production/analytics/analytics-dashboard.md", "observable": "no field name matches /platform|device|^os$|age|viewport|fps/i" },
      { "id": "N23", "never": "an absolute wall-clock date, time of day or Unix timestamp", "rule": "cid: decided — a date beside a Player narrows identity and answers nothing an elapsed second does not", "source": "cid/analytics/events/02-never-logged.md", "observable": "every seconds-valued valueUnit says since session start or since the previous above-tick payoff" },
      { "id": "N24", "never": "a free-text or unbounded-cardinality field", "rule": "8,000 combined values, after which values are grouped as Other", "source": "https://create.roblox.com/docs/production/analytics/event-types", "observable": "combinedValuesUsed is a finite integer and every fields[].cardinality is a number" }
    ],
    "unproducible": [
      { "id": "U1", "what": "every client-side fact, categorically — device class, viewport, frame rate, whether a beat was seen, index-panel opens", "why": "events can only be sent from the server; index-screen.toggle() is a direct local call with no packet", "proxy": "Platform and OS as a free dashboard breakdown", "wouldSettleIt": "an eighth Protocol channel, which this sheet does not request" },
      { "id": "U2", "what": "OPEN.md §2's watch item, instance count per area on mobile", "why": "a client fact under U1", "proxy": "none", "wouldSettleIt": "an eighth channel plus a client reporter; the brief asked to watch something the platform forbids measuring" },
      { "id": "U3", "what": "first input", "why": "nothing server-side observes input; the arming gate observes displacement, which is strictly later", "proxy": "run_armed.value, an upper bound", "wouldSettleIt": "a client message carrying the first-input instant" },
      { "id": "U4", "what": "a run ordinal, so \"run-1 sessions\" is a formable population", "why": "StoredState carries no join count and no session count", "proxy": "the platform's new-user cohort", "wouldSettleIt": "persistence-shape work's stateShape revision request; not duplicated here" },
      { "id": "U5", "what": "why a purchase was refused", "why": "Progression.tryBuy returns a bare boolean", "proxy": "upgrade_refused.reason = rejected, one value for three causes", "wouldSettleIt": "tryBuy returning a reason enum" },
      { "id": "U6", "what": "duplicate volume as an economy rate", "why": "systems/05's partition makes it structurally zero; defect_duplicate_find is a correctness counter, not a rate", "proxy": "none", "wouldSettleIt": "nothing — the quantity does not exist" },
      { "id": "U7", "what": "whether a neighbour was perceived", "why": "social/02's criteria need a client frustum test", "proxy": "slot_claimed.value, presence rather than perception", "wouldSettleIt": "a client-side visibility report, which U1 forbids" }
    ]
  }
}
```

## Consequences for other work

- **Module-and-channel-definition work** inherits one new server module, thirteen call sites, zero
  new remotes, and two one-line changes at existing sites (`onJoin` must keep `readable`;
  `tickPlayer` must keep the previous XZ position). It also inherits the per-session record's
  field list, which is where the session id, both clocks and both running maxima live.
- **Funnel-definition work** is unblocked on its hardest dependency: `funnelSessionId` exists, held
  by the telemetry module, without a `stateShape` change. It owns every funnel name, step ordinal,
  step name and pass mark; it owns none of the four call sites above, and it may not add a numeric
  value to a funnel step because the API has no slot for one.
- **Economy-flow work** owns both `LogEconomyEvent` argument sets and neither call site's cadence:
  the faucet is aggregated per area by sheet `03` and the sink is per occurrence.
- **Engagement work** gets `area_cleared.value` as its realised lap and `session_start.value` as
  the returning-progress distribution. It named neither event, which is correct; it stated the
  requirement and this is the emission.
- **Persistence-shape work** is asked for exactly one thing and it is not a timestamp: a run
  ordinal or first-session flag, so "run-1" becomes formable. The session id is closed here.
- **Offer-ladder work** should know that field 2 is reserved for `owned` permanently and that every
  reading taken before `products.externalPrerequisite` is discharged is unsplittable afterwards.
- **Vocabulary work** owes nothing: thirteen internal identifiers, zero player-facing strings, no
  `coinage` block, no `bannedWords` adjudication.

## Acceptance criteria

1. `telemetry.events[]` has exactly 13 entries; every `id` matches
   `^[a-z][a-z0-9]*(_[a-z0-9]+){1,3}$`, is at most 32 characters, and no two entries share an `id`.
2. Every entry carries a non-empty `refutes.sheet` and `refutes.field`, has at most 3 objects in
   `fields`, and — where it has two or more — `fields[0].name` is `area` and `fields[1].name` is
   `owned`.
3. `telemetry.budget.eventNamesUsed` is 13 against `eventNameCap` 100, and
   `combinedValuesUsed` 936 equals `9 × 2 × 52` and is under `combinedValueCap` 8000.
4. All 13 `insertionPoint` strings name a file and function that exists in `game/src` — 13 of 13
   resolve — and `newRemoteChannelsRequired` is 0.

## Not decided here

The reasoning behind each prohibition row and the platform rule under it — sheet `02`, this domain,
whose rows are carried above as `forbiddenPayload`. How much may be emitted, the aggregation window
on `save_written` and the faucet, and what a dropped event means — sheet `03`. The clock, its
exclusions and the gap derivation — sheet `04`. Every funnel name, step ordinal, step name,
population and pass mark — funnel-definition work. Every `LogEconomyEvent` argument value —
economy-flow work. The lap's population, exclusions and session-spanning rule — session and
lap-clock work. Every target and alarm — KPI-shortlist work. How the pipe is built, batched,
retried or stored — logging-pipeline work. Whether `telemetry` is promoted into
`bridge/schema.mjs`, and whether it needs an emitter path at all given that no build module reads
it — contract-and-seam work.
