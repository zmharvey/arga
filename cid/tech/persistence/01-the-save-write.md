# 01 — The save write

**Domain:** tech/persistence · **Category:** Tech & Data · **Wave:** 5

## Decision

One key per player — bare `tostring(player.UserId)` under `runtime.dataStoreName`, one partition,
never `SetAsync` — read and written through `UpdateAsync` with a four-profile deterministic retry
schedule, at 3.4% of the experience write budget and 0.47% of the value cap. **No write path runs in
Studio**, guarded once, inside `save`.

**The `blockedSaves` latch is adopted as declared data and then bounded.** It stays as the *write*
rule (a session started on a failed read never overwrites the real save) and is replaced as the
*session* rule: each periodic pass re-reads instead of writing, **any pass that does not write is a
failed pass**, and after three of them — 135 seconds — `server-main` releases the player from the
server rather than letting them play a whole session that will be discarded.

## Why

- **Bare `UserId`, no prefix, no scope.** The store name already carries the namespace and the
  version, the worst-case key is 19 of the 50 permitted characters, and a prefix added later is
  itself a migration under sheet 03's `B6`. `[research: https://create.roblox.com/docs/cloud-services/data-stores/error-codes-and-limits]`
- **It does not foreclose priority-2 visitable restored ruins**, the only excluded item a key format
  could foreclose: a shared restored-ruin record would be a *different store name* keyed by area
  ordinal, not a prefixed key in a per-player store. `[brief: soft]` `03-META.md` priority 2. **One
  partition**, because sharding a 20 KB value against a 4,194,304-character cap is invented
  machinery. `[cid: decided]`
- **`UpdateAsync` for both directions.** Roblox states `SetAsync` "can cause data inconsistency if
  two servers try to set the same key at the same time" and recommends `UpdateAsync` "to handle
  multi-server attempts" `[research: https://create.roblox.com/docs/cloud-services/data-stores]`.
  It is also the only API whose transform can inspect the stored lock in the same request, which is
  what makes `sessionLock` cost zero extra requests. **If `sessionLock.enabled` were false the read
  would be `GetAsync`** — the one place my two keys join, stated rather than discovered.
- **The retry schedule is set by the join deadline, not by taste.** `firstSession` requires the
  first reveal within 10 s of join, so `load` gets 3 attempts and 3 s of backoff and nothing more.
  `leave` gets the most (4 attempts) because no next pass exists. `shutdown` gets a 20-second burst
  deadline against `BindToClose`'s "30 seconds total, shared across all bound callbacks"
  `[research: https://github.com/Roblox/creator-docs/blob/main/content/en-us/cloud-services/data-stores/player-data-purchasing.md]`,
  leaving 10 s of margin. Roblox's own instruction is `pcall` plus "exponential backoff"
  `[research: https://create.roblox.com/docs/cloud-services/data-stores/error-codes-and-limits]`.
- **The backoff carries no jitter, and that is forced.** `runtime` acceptance criterion 3 greps
  `math.random|Random.new()|os.time()|os.clock()` across `game/src`. Sixteen players failing in
  lockstep still need de-synchronising, so the offset is `(UserId % 1000) / 1000` seconds —
  deterministic, per-player, and it keeps that criterion satisfied. `[cid: decided]`
- **The error-code split is the documented one.** 301–306 are queue throttle and 501–505 transient,
  so both retry; 101–107 and 509–513 are validation and permission failures and never retry
  `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/cloud-services/data-stores/error-codes-and-limits.md]`.
  I classify 401–404 as **never retry**: my domain index summarises them as "internal/transient",
  but their numbering neighbours are serialisation failures and a retried serialisation failure
  burns three requests per save forever. The payload is scalars, string-keyed booleans and integers,
  so 4xx is unreachable either way.
  `[research owed: the literal text of codes 401–404 on the error-codes-and-limits page]`
- **There is no partial write to roll back.** A DataStore write is atomic per key. A stored value
  that is not a table is *not* a read failure — the store answered, nothing is at risk, the session
  starts fresh and the next write replaces it. Shipped behaviour, and correct.
- **Why the latch could not stay as shipped.** A returning player with 18 Finds joins on a failed
  read, sees `0`, plays a full session and loses all of it silently. That meets both stopping-rule
  bars, and today it is a Luau comment rather than a decision. `[brief: binding]`
  `01-FOUNDATION.md`'s "cleared is permanent" is why a discarded session is expensive here in a way
  it would not be in an idle game.
- **The release counter has one reading, and it is the strict one: it resets only on a pass that
  writes.** A re-read that succeeds and returns a payload is a **failed pass**. The alternative —
  counting any answering store as a success — reinstates the whole defect: a player whose reads
  succeed intermittently never reaches three consecutive failures, plays the entire session at `0`
  and loses it, which is the case this sheet exists to close. **The cost of the strict reading is a
  false release**: a player whose real save is intact and whose store is healthy is disconnected at
  135 s because their *own key* could not be read at join. That is the right trade — 135 seconds
  lost against a whole session lost — and it is bounded, because the only path into it is a read
  failure at join, which a healthy store does not produce. `[cid: decided]`
- **`storeUnavailable` is deliberately not released.** `GetDataStore` throwing is almost always
  Studio API access being off, and it is server-wide: ejecting every player accomplishes nothing.
- **The Studio guard belongs inside `save`, once, and nowhere else.**
  `release.environments.studioWriteRule` owns the rule; the placement is mine.
  `RunService:IsStudio()` appears **exactly once** in all of `game/src`, at `init.server.luau:512`
  inside `onShutdown`, so the periodic loop and `onLeave` are unguarded today and a Studio play-test
  past 45 seconds writes test state to the live store. One test inside `save` covers all three write
  call sites; three tests at three call sites is three places for the fourth to be forgotten.
  **Reads stay permitted**, so a developer can play-test against real data. A Studio-suppressed
  write returns `(false, "studio")`, which is **not** a `staleSession` reason, never arms the latch
  and never counts toward the release counter. `wiring`'s existing `onShutdown` guard is redundant
  under this and stays, because it is `wiring`'s.
- **The payload bound in both contracts is low by 2.625×, and the pointer belongs on `solvency`.**
  `stateShape` and `Persistence.luau:13` both assert "at most 640 keys in `cleared`". **Wave 4 has
  since released** — `cid/gameplay/_verified-wave4.md` line 3 now reads *"Final verdict: PASS
  (round 3)."* — and `solvency` puts area 8 at **1,120** patches and the post-terminal bay at
  **1,680**. `depths.areas[].patchCount` was not re-emitted and still carries the superseded 640,
  and `endgame.postTerminalArea.patchCount` still carries 640 as well, so **neither is a safe
  pointer**. The live bound is `max(solvency.areaLedger[].patchCount,
  solvency.postTerminalBay.patchCount)` — both halves inside one manifest block, which is why I
  point at one key rather than two. At 1,680 the payload is **19,739 characters**, 0.47% of the cap,
  and it still does not grow with progress. The figure is published **exact** rather than rounded,
  because a worst-case bound that rounds down rounds toward the thing it bounds.
  `[research: cid/gameplay/balance/03-ladder-solvency.md]`
- **This key now asks the architect to widen nothing.** The round-1 request for an eighth persisted
  field is withdrawn: Funnels and Engagement settled it on the ground that a brand-new save is
  byte-equal to `defaultState()`, so "run 1" is a predicate over the seven fields already persisted.
  **No run ordinal is derivable from persisted state and none should be restated as available.**
  Every remaining request below corrects a contract statement rather than adding to one.
- **No link between the tick and the save.** `runtime.clearTickRate` and `saveIntervalSeconds` are
  independent; the withdrawn 0.12 → 0.04 tick request moved no figure in the budget block. Stated
  because a builder reading both sheets will look for one.

```manifest
{
  "provides": "persistence",
  "status": "proposed",
  "value": {
    "key": {
      "format": "tostring(player.UserId)",
      "prefix": "none",
      "scope": "none — DataStoreOptions is never passed and the default global scope is used",
      "maxCharsAllowed": 50,
      "worstCaseChars": 19,
      "partitions": 1,
      "partitionReason": "one player, one bounded payload, no shared record; sharding a 20 KB value against a 4194304-character cap is invented machinery",
      "foreclosesVisitableRestoredRuins": false,
      "foreclosureNote": "a priority-2 shared restored-ruin record would be a different DataStore name keyed by area ordinal, never a prefixed key in this store. Nothing here reserves space for it and nothing here blocks it."
    },
    "api": {
      "readApi": "UpdateAsync",
      "readApiIfSessionLockDisabled": "GetAsync",
      "writeApi": "UpdateAsync",
      "setAsyncPermitted": false,
      "reason": "SetAsync can cause data inconsistency when two servers set one key; UpdateAsync is also the only API whose transform can read the stored lock in the same request, which is what makes sessionLock cost zero extra requests",
      "budgetAccounting": "whether UpdateAsync consumes one read slot and one write slot is unverified; the budget block below is stated at both readings and holds at either"
    },
    "studioWriteGuard": {
      "where": "inside persistence.save, once, before the payload is built",
      "readsPermitted": true,
      "writesPermitted": false,
      "returns": "(false, 'studio')",
      "isAStaleSessionReason": false,
      "countsTowardRelease": false,
      "ruleOwner": "release.environments.studioWriteRule — cid/tech/deploy owns the rule; this field is the placement its AC3 greps for",
      "coversCallSites": ["wiring.onSave", "wiring.onLeave", "wiring.onShutdown"],
      "whyOnePlace": "RunService:IsStudio() appears exactly once in all of game/src, at init.server.luau:512 inside onShutdown, so the periodic loop and onLeave are unguarded and a Studio play-test past 45 s writes the live store. One test inside save covers all three call sites; three tests at three call sites is three places for the fourth to be forgotten.",
      "existingShutdownGuard": "redundant under this and stays, because it is wiring's"
    },
    "retry": {
      "backoffShape": "exponential, deterministic, no jitter",
      "perPlayerOffsetSeconds": "(player.UserId % 1000) / 1000, added to every backoff step so sixteen simultaneous failures do not retry in lockstep and no call to math.random enters game/src",
      "profiles": [
        { "id": "load",     "callSite": "wiring.onJoin step 1",     "attempts": 3, "backoffSeconds": [1, 2],    "maxAddedSeconds": 3,  "reason": "firstSession requires the first reveal within 10 s of join; this is what is left after that" },
        { "id": "periodic", "callSite": "wiring.onSave step 1",     "attempts": 2, "backoffSeconds": [3],       "maxAddedSeconds": 3,  "reason": "the loop retries by existing, 45 s later" },
        { "id": "leave",    "callSite": "wiring.onLeave step 2",    "attempts": 4, "backoffSeconds": [1, 2, 4], "maxAddedSeconds": 7,  "reason": "no next pass exists" },
        { "id": "shutdown", "callSite": "wiring.onShutdown step 1", "attempts": 3, "backoffSeconds": [1, 2],    "maxAddedSeconds": 3,  "burstDeadlineSeconds": 20, "reason": "BindToClose allows 30 s shared across all bound callbacks; 10 s stays as margin" }
      ],
      "retryErrorCodes": ["301-306 queue throttle", "501-505 transient internal"],
      "neverRetryErrorCodes": ["101-107 validation", "401-404 serialisation", "509-513 permission and format"],
      "afterLastAttempt": "warn once with the [Persistence] prefix and return (false, reason). Never throw.",
      "partialWritePolicy": "no rollback exists and none is needed: a DataStore write is atomic per key, so the transform applies or it does not",
      "unusableStoredValuePolicy": "a stored scalar is NOT a read failure. The store answered, nothing is at risk, the session starts fresh, one warning is emitted and the next write replaces it."
    },
    "staleSession": {
      "adopted": true,
      "stateField": "writesBlocked",
      "reasonField": "blockedReason",
      "failedPassDefinition": "a pass that does not write. This is the single definition the release counter uses and every row below is stated against it.",
      "reasons": [
        {
          "id": "readFailed",
          "armedBy": "the read failed on every attempt while the store was open",
          "recoveryPass": "each periodic pass re-reads instead of writing",
          "clearsWhen": "a re-read succeeds AND returns nil — the store confirms there is nothing to protect",
          "neverClearsWhen": "a re-read succeeds and returns a payload; the real save is never overwritten and the stale session is never merged into it",
          "aReReadThatReturnsAPayloadCountsAsAFailedPass": true,
          "aReReadThatFailsCountsAsAFailedPass": true,
          "counterResetsOn": "a pass that writes, and on nothing else",
          "releaseAfterFailedPasses": 3,
          "releaseAfterSeconds": 135,
          "costOfThisReading": "a false release — a player whose real save is intact and whose store is healthy is disconnected at 135 s because their own key could not be read at join. Accepted: 135 seconds lost against a whole session lost, and the only path into it is a read failure at join.",
          "costOfTheOtherReading": "a player whose reads succeed intermittently never reaches three consecutive failures, plays the whole session at 0 and loses it — the defect this key exists to close"
        },
        {
          "id": "storeUnavailable",
          "armedBy": "GetDataStore itself threw — in practice Studio API access being off",
          "recoveryPass": "the same re-read pass",
          "clearsWhen": "the store opens and the read succeeds, under the same nil-or-payload rule",
          "releaseAfterFailedPasses": 0,
          "releaseNote": "never released; every player in the server is in the same state and ejecting them accomplishes nothing"
        },
        {
          "id": "lockHeld",
          "armedBy": "sessionLock.acquire failed against a live lock",
          "recoveryPass": "each periodic pass re-attempts the acquire",
          "clearsWhen": "the acquire succeeds, after which writing resumes normally because this session's state came from a successful read",
          "releaseAfterFailedPasses": 0
        }
      ],
      "releaseMechanism": "server-main calls Player:Kick after three consecutive save() returns of (false, 'readFailed'). persistence never kicks and exposes no new function.",
      "releaseSecondsDerivation": "3 x runtime.saveIntervalSeconds. The pass count is the durable statement; the seconds move with the interval.",
      "kickString": "owned by notices (ui-ux/feedback 03). Until it supplies one, Kick is called with no argument and the platform default is shown. No string is invented here.",
      "overruledShippedBehaviour": "the shipped latch is permanent for the session and silent. Kept as the write rule, replaced as the session rule."
    },
    "budget": {
      "maxPlayers": 16,
      "saveIntervalSeconds": 45,
      "serverStandardReadPerMin": 700,
      "serverStandardWritePerMin": 700,
      "experienceReadPerMin": 940,
      "experienceWritePerMin": 620,
      "formulas": "server read and write are each 60 + numPlayers x 40; experience read is 300 + ccu x 40; experience write is 300 + ccu x 20",
      "steadyWritesPerMin": 21.33,
      "steadyPercentOfExperienceWrite": 3.44,
      "steadyPercentOfServerWrite": 3.05,
      "joinLeaveChurnPerMin": 2.14,
      "churnDerivation": "16 players over a 15-minute median session is 1.07 joins/min and 1.07 leaves/min; the join is one UpdateAsync and the leave is one",
      "peakPerMinAllSources": 23.47,
      "headroomFactor": 26.4,
      "shutdownBurstRequests": 16,
      "shutdownBurstIfEveryWriteRetriesTwice": 48,
      "queueDepth": 30,
      "queueDrainPerSecond": 10.33,
      "queueVerdict": "16 fits with 14 slots spare, because sessionLock folds release into the save write rather than issuing a second one. 48 never queues at once: the per-player offset spreads the burst over 1 s and the two backoff steps over 3 s more, so outstanding requests peak at 16.",
      "bindToCloseSeconds": 30,
      "shutdownDeadlineSeconds": 20,
      "retriesThatFitInsideShutdown": 3,
      "perKeyWriteThroughputMBPerMin": 4,
      "perKeyUsedKBPerMin": 26.3,
      "perKeyPercentOfThroughput": 0.64,
      "valueCapChars": 4194304,
      "keyNameCapChars": 50,
      "clearTickRateLink": "none. runtime.clearTickRate and runtime.saveIntervalSeconds are independent and the withdrawn 0.12 to 0.04 tick request moved no figure in this block."
    },
    "payload": {
      "fields": "exactly the seven stateShape fields marked persisted, plus the envelope fields sessionLock.record declares and nothing else. No eighth persisted field is requested by this domain.",
      "clearedMaxKeysSource": "max(solvency.areaLedger[].patchCount, solvency.postTerminalBay.patchCount) — read from that key, never copied. Both halves sit in one manifest block, which is why this points at one key rather than two.",
      "clearedMaxKeysAtSource": 1680,
      "sourceStatus": "RELEASED — cid/gameplay/_verified-wave4.md line 3, 'Final verdict: PASS (round 3).'",
      "pointersThatDoNotResolve": [
        "depths.postTerminalBay.patchCount — depths has no postTerminalBay field at all",
        "depths.postTerminalArea.patchCount — depths has no postTerminalArea field either",
        "depths.areas[].patchCount — resolves, but was not re-emitted after wave 4 and still carries the superseded 640",
        "endgame.postTerminalArea.patchCount — resolves, but still carries 640; solvency's revision table asks endgame to move to 1680 and that edit has not landed"
      ],
      "supersedes": "stateShape's and Persistence.luau:13's 'at most 640 keys in cleared', which is low by 2.625x against the released bay",
      "worstCaseChars": 19739,
      "worstCaseCharsRounding": "exact, not rounded. A worst-case bound may only ever be restated upward; 19700 rounds toward the thing it bounds and is wrong even with 5261 characters of margin against the AC4 threshold.",
      "worstCaseDerivation": "at 1680 keys: cleared 19065 (9 one-digit keys at 9 chars, 90 two-digit at 10, 900 three-digit at 11, 681 four-digit at 12, plus a 12-char wrapper) + found 491 + upgrades 48 + rowsRevealed 67 + three scalars 58 + braces 10 = 19739. Recompute from solvency if the bay count moves; each additional four-digit key adds 12.",
      "worstCasePercentOfValueCap": 0.47,
      "integerKeysReturnAsStrings": true,
      "integerKeyRule": "every reader of cleared uses tonumber(key) and never a type test, because the JSON round trip returns integer keys as strings",
      "growsWithProgress": false,
      "runOrdinalDerivable": false,
      "runOrdinalNote": "no persisted field carries a session count, a join count or a clock. Funnels derives run-1 membership as a predicate over these seven fields; nothing here should be read as an ordinal."
    },
    "forbidden": [
      { "id": "D1",  "rule": "no entitlement or purchase-derived value is written or cached — products.F20",                          "observable": "grep -rn 'state.owned' game/src/server/Persistence.luau returns nothing" },
      { "id": "D2",  "rule": "no OrderedDataStore of any kind",                                                                      "observable": "grep -rn 'OrderedDataStore' game/src returns nothing" },
      { "id": "D3",  "rule": "no MessagingService",                                                                                  "observable": "grep -rn 'MessagingService' game/src returns nothing" },
      { "id": "D4",  "rule": "no cross-server counter, no global counter, no key any two players write",                              "observable": "every GetAsync/UpdateAsync argument in game/src is keyFor(player)" },
      { "id": "D5",  "rule": "no timestamp in the payload that any path converts to currency, progress or a grant",                   "observable": "sessionLock.timestampNonConversion.forbiddenReads, checked per row" },
      { "id": "D6",  "rule": "no nullable field: every field has a non-nil value in defaultState(), and absence is never meaningful", "observable": "Luau drops a nil-valued field from a table constructor, so a nullable key here would be unreadable at runtime — see GameConfig.Economy.balanceCap" },
      { "id": "D7",  "rule": "no math.random, Random.new, os.time, os.clock or tick in this module",                                  "observable": "grep -rn 'math.random\\|Random.new\\|os.time\\|os.clock\\|tick()' game/src/server/Persistence.luau returns nothing" },
      { "id": "D8",  "rule": "no per-area boolean and no per-post-terminal-bay flag; areasFinished is the one integer",               "observable": "grep -rn 'areaComplete' game/src returns nothing" },
      { "id": "D9",  "rule": "no lastSeen, no streak, no daily-grant field, no promo-code field, and no session or join counter",     "observable": "the payload literal in save() has exactly the seven stateShape field names plus lock" },
      { "id": "D10", "rule": "no second DataStore, no second key per player, no scope argument",                                      "observable": "grep -rn 'GetDataStore' game/src/server/Persistence.luau returns exactly one match" },
      { "id": "D11", "rule": "no GetVersionAsync, ListVersionsAsync or RemoveAsync in game code",                                     "observable": "grep -rn 'GetVersionAsync\\|ListVersionsAsync\\|RemoveAsync' game/src returns nothing" },
      { "id": "D12", "rule": "no remote reads or writes a save; the snapshot is protocol's and carries no payload field",             "observable": "grep -rn 'Persistence' game/src/client returns nothing" },
      { "id": "D13", "rule": "no ranking, ladder or leaderboard structure of any kind",                                               "observable": "grep -rn 'leaderstats\\|leaderboard' game/src returns nothing" },
      { "id": "D14", "rule": "no SetAsync",                                                                                          "observable": "grep -rn 'SetAsync' game/src returns nothing" },
      { "id": "D15", "rule": "no fourth write call site. Writes happen at wiring.onSave, onLeave and onShutdown and nowhere else — a save on every Find or every purchase is a revision against wiring, not an optimisation", "observable": "every call to Persistence.save in game/src/server is inside one of those three phases" },
      { "id": "D16", "rule": "no write path runs in Studio, and the guard is in exactly one place",                                   "observable": "grep -rn 'IsStudio' game/src/server/Persistence.luau returns exactly one match, and it precedes every UpdateAsync in that file" }
    ],
    "observability": {
      "emits": "one warn per failed attempt and one per exhausted profile, prefixed [Persistence], naming the player and the reason",
      "storeOpenWarning": "once per server, never once per pass",
      "studioSuppressedWrite": "warned once per server, not once per pass, so a play-test log stays readable",
      "pipe": "unowned. Warnings reach the server output and nowhere a human reads. Security names the same gap for detection; Analytics owns what to record and explicitly not how the pipe is built.",
      "kindOfWorkNeeded": "server-side event transport and retention"
    }
  }
}
```

## Revision requests issued

I do not edit `architect/`. Each names a field, and **every live one corrects a contract statement
rather than widening a shape.**

| id | target | request |
|---|---|---|
| **RR-P1** | `architect/03-state-shape` — `fields` | **WITHDRAWN, round 3.** Asked for an eighth persisted field (`sessions`, then `runOrdinal`) because three domains needed a run ordinal. Funnels and Engagement have since settled it between them: **a brand-new save is byte-equal to `defaultState()`**, so "run 1" is a predicate over the seven fields already persisted, not a new field. Funnels carries it as a `saveState ["pristine","progressed","unknown"]` custom field and Event Logging holds the join clock module-locally. `stateShape` gains nothing, no store bump is owed, and the id is retained withdrawn so the numbering below stays stable. **The stated bias is Funnels' to carry: a zero-progress rejoin reads `pristine`, so run-1 populations over-count.** Nothing in `persistence` restates a run ordinal as available — see `payload.runOrdinalDerivable`. |
| **RR-P2** | `architect/03-state-shape` — acceptance criterion 2 | Narrow to: "The persisted payload contains exactly the seven fields marked `persisted: true`, **plus any envelope field declared in `sessionLock.record` and declared nowhere else**. `patches`, `spawnPivot`, `owned`, `armState` and `player` never reach a DataStore." The criterion's purpose is that no *live* field reaches the store; a lock field is `persistence`'s envelope and is not a `PlayerState` field at all. |
| **RR-P3** | `architect/02-modules` — `persistence.exposes` | `save(player, state): boolean` → `save(player, state): (boolean, string?)`. `server-main` cannot distinguish an ordinary write failure from a stale session from a Studio suppression without it, and both the release counter and `studioWriteGuard.countsTowardRelease` turn on exactly that distinction. Backward compatible: an existing caller ignoring the second return still compiles. |
| **RR-P4** | `architect/02-modules` — `entitlements` criterion 3 | `grep -rn 'owned' game/src/server/Persistence.luau returns nothing` is **unsatisfiable** — it returns two matches (a comment and `owned = {}`) and it must, because `07-wiring.constructs` requires `defaultState()` to set `owned {}` there. Narrow it to `grep -rn 'state.owned'`, which is what `03-state-shape` criterion 8 already greps and which passes. |
| **RR-P5** *(path verified r3)* | `architect/03-state-shape` — the `cleared` note, and `02-modules` `persistence` criterion 1 | Replace the literal "at most 640 keys" with **`max(solvency.areaLedger[].patchCount, solvency.postTerminalBay.patchCount)`**, which is **1,680** against released wave 4. I checked all four candidate paths against the released manifests rather than against anybody's prose: `depths` carries **no** `postTerminalBay` field and **no** `postTerminalArea` field, so my own round-1 spelling and Performance's both fail to resolve; `depths.areas[].patchCount` and `endgame.postTerminalArea.patchCount` do resolve but were not re-emitted after wave 4 and still read 640. `solvency` is the only key whose block holds both the eight-area ledger and the bay, which is why the pointer names one key rather than two. **Agreed with Performance as the single spelling.** |
| **RR-P6** | `architect/07-wiring` — `onSave` step 1 | Its description reads "a failure warns and the loop continues; the next pass retries by existing", which is true of a *write* failure and silent on the read-failure latch. Add that for a `writesBlocked` player the pass performs a re-read rather than a write, that a re-read returning a payload is still a failed pass, and that three consecutive `readFailed` returns release the player. |

## Consequences for other work

- **Notice work (`ui-ux/feedback`, sheet 03)** gets its case (a) answered from my side: the session
  is bounded at 135 seconds and ends in a `Kick`, not in a silent full-session discard. There is
  **no notice for `lockHeld` and none for a Studio-suppressed write.**
- **Server-boot and join work (`server-main`)** gains one counter per player and one `Player:Kick`
  call site. The counter resets **only on a pass that writes** — not on a pass that merely read
  successfully, and not on a Studio-suppressed pass, which does not touch it at all.
- **Performance work** inherits the agreed pointer, `solvency.postTerminalBay.patchCount`, and
  should drop `depths.postTerminalArea.patchCount`, which does not resolve. Its scan-cost model and
  my payload bound now read one field, so they move together or not at all. Its
  `readingSolvencyIsACostInputNotAnIndexSpace` note is correct and is what sheet 03's `B2` limit
  now records from my side.
- **Build & Deploy work** owns `release.environments.studioWriteRule` and now has the field its AC3
  greps for: `persistence.studioWriteGuard`. It also inherits `D6` as the concrete case of its own
  emitted-null hazard — no value in any of my three keys is null.
- **Engagement, Funnels and Event Logging work** get no field from the save. `payload
  .runOrdinalDerivable` is `false` and `D9` now bans a session or join counter by name, so nobody
  reopens this by adding one quietly. The `pristine` over-count bias is Funnels' to carry.
- **Whoever executes `solvency`'s revision table** should note that `endgame.postTerminalArea
  .patchCount` and `depths.areas[].patchCount` both still read 640 and are now named by three keys
  as unsafe pointers. Landing that table retires `pointersThatDoNotResolve` rows 3 and 4 — and it is
  a **save migration**, per sheet 03's `W1`.
- **Security work** inherits that a save is never client-reachable (`D12`).

## Pushing back

**`architect/02-modules`, `persistence` criterion 3 — "a DataStore outage leaves the player playable
rather than erroring."** I keep it at join and narrow it after: the player *is* playable, for 135
seconds, and is then released. The criterion was written when the alternative to "playable" was
"erroring at join", and the third case — playable but permanently unsaveable — was not in view.

## Acceptance criteria

1. `grep -rn "SetAsync" game/src` returns nothing; `grep -rn "UpdateAsync"
   game/src/server/Persistence.luau` returns at least two matches; `grep -rn "IsStudio"
   game/src/server/Persistence.luau` returns exactly one match, positioned before every `UpdateAsync`
   in that file.
2. `grep -rn "math.random\|Random.new\|os.time\|os.clock\|tick()"
   game/src/server/Persistence.luau` returns nothing.
3. A 16-player server in which one joining player's read fails at join, run for 150 seconds at
   `saveIntervalSeconds` 45, releases that player at pass 3 in **both** of these runs: one where
   every re-read also fails, and one where every re-read succeeds and returns a payload. Zero writes
   carry that player's payload in either run.
4. A payload for a player in a post-terminal bay with all `solvency.postTerminalBay.patchCount`
   `cleared` keys serialises to fewer than 25,000 characters, and payloads for the same player at
   `areasFinished` 8 and at 40 differ by at most 2 characters.

## Not decided here

Whether a session lock exists, its record, its cadence and its steal timeout — sheet 02, which holds
`sessionLock` and supplies the envelope field this payload carries. What forces a store bump,
whether a prior version is read, and the migration and per-bump rollback — sheet 03, which holds
`storeMigration`. The persisted field list, the store name and the 45-second interval —
`architect`'s `stateShape`, `runtime` and `wiring`; this domain asks for no eighth field. How a run
ordinal or a session boundary is obtained — Funnels' `saveState` predicate and Event Logging's
module-local clock; the save supplies neither. Every patch count, footprint and bay length —
`solvency` and `depths`; I read one field and set none. The **rule** that no write runs in Studio —
`cid/tech/deploy`'s `release`; I own only where the guard sits. The exact string a released player
reads — `notices` (`ui-ux/feedback` 03). Where the warning pipe writes — nobody's.
