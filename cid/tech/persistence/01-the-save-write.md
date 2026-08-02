# 01 — The save write

**Domain:** tech/persistence · **Category:** Tech & Data · **Wave:** 5

## Decision

One key per player — bare `tostring(player.UserId)` under `runtime.dataStoreName`, one partition,
never `SetAsync` — read and written through `UpdateAsync` with a four-profile deterministic retry
schedule, at 3.4% of the experience write budget and 0.53% of the value cap.

**The `blockedSaves` latch is adopted as declared data and then bounded.** It stays as the *write*
rule (a session started on a failed read never overwrites the real save) and is replaced as the
*session* rule: each periodic pass re-reads instead of writing, and after three consecutive failed
passes — 135 seconds — `server-main` releases the player from the server rather than letting them
play a whole session that will be discarded.

## Why

- **Bare `UserId`, no prefix, no scope.** The store name already carries the namespace and the
  version, the worst-case key is 19 of the 50 permitted characters, and a prefix added later is
  itself a migration under sheet 03's `B6`. `[research: https://create.roblox.com/docs/cloud-services/data-stores/error-codes-and-limits]`
- **It does not foreclose priority-2 visitable restored ruins**, the only excluded item a key format
  could foreclose: a shared restored-ruin record would be a *different store name* keyed by area
  ordinal, not a prefixed key in a per-player store. `[brief: soft]` `03-META.md` priority 2.
- **One partition.** Sharding a 22 KB value against a 4,194,304-character cap is invented
  machinery, which is the failure this stage exists to prevent. `[cid: decided]`
- **`UpdateAsync` for both directions.** Roblox states `SetAsync` "can cause data inconsistency if
  two servers try to set the same key at the same time" and recommends `UpdateAsync` "to handle
  multi-server attempts" `[research: https://create.roblox.com/docs/cloud-services/data-stores]`.
  It is also the only API whose transform can inspect the stored lock in the same request, which is
  what makes `sessionLock` cost zero extra requests. **If `sessionLock.enabled` were false the read
  would be `GetAsync`** — the one place my two keys join, stated rather than discovered.
- **The retry schedule is set by the join deadline, not by taste.** `firstSession` requires the
  first reveal within 10 s of join, so `load` gets 3 attempts and 3 s of backoff and nothing more.
  `leave` gets the most (4 attempts) because no next pass exists. `shutdown` gets a 20-second burst
  deadline against `BindToClose`'s 30 seconds, leaving 10 s of margin for the other bound callbacks
  `[research: https://create.roblox.com/docs/reference/engine/classes/DataModel#BindToClose]`.
  Roblox's own instruction is `pcall` plus "exponential backoff"
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
  bars, and today it is a Luau comment rather than a decision. The recovery pass costs nothing — it
  replaces a write that was refused anyway — and the 135-second release is what bounds the loss.
  `[brief: binding]` `01-FOUNDATION.md`'s "cleared is permanent" is why a discarded session is
  expensive here in a way it would not be in an idle game.
- **`storeUnavailable` is deliberately not released.** `GetDataStore` throwing is almost always
  Studio API access being off, and it is server-wide: ejecting every player accomplishes nothing.
- **The payload bound in both contracts is wrong by 2.94×.** `stateShape` and `Persistence.luau:13`
  both assert "at most 640 keys in `cleared`". Wave 4 puts area 8 at 1,200 patches and the
  post-terminal bay at 1,880, cited as **unreleased** — `cid/gameplay/_verified-wave4.md` line 3,
  "Stage 4 does not release." At 1,880 the payload is ~22,100 characters, 0.53% of the cap, and it
  still does not grow with progress.
- **No link between the tick and the save.** `runtime.clearTickRate` and `saveIntervalSeconds` are
  independent; the requested 0.12 → 0.04 tick change moves no figure in the budget block. Stated
  because a builder reading both sheets will look for one.
- **Three keys where the category doc expected one**, because `bridge/merge.mjs:135` makes two
  sheets proposing one key a hard error while every sheet must carry a manifest; session locking and
  store migration both have data forms and would otherwise be buried inside this one.

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
      "partitionReason": "one player, one bounded payload, no shared record; sharding a 22 KB value against a 4194304-character cap is invented machinery",
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
      "reasons": [
        {
          "id": "readFailed",
          "armedBy": "the read failed on every attempt while the store was open",
          "recoveryPass": "each periodic pass re-reads instead of writing",
          "clearsWhen": "a re-read succeeds AND returns nil — the store confirms there is nothing to protect",
          "neverClearsWhen": "a re-read succeeds and returns a payload; the real save is never overwritten and the stale session is never merged into it",
          "releaseAfterFailedPasses": 3,
          "releaseAfterSeconds": 135
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
      "queueVerdict": "16 fits with 14 slots spare. 48 never queues at once: the per-player offset spreads the burst over 1 s and the two backoff steps over 3 s more, so outstanding requests peak at 16.",
      "bindToCloseSeconds": 30,
      "shutdownDeadlineSeconds": 20,
      "retriesThatFitInsideShutdown": 3,
      "perKeyWriteThroughputMBPerMin": 4,
      "perKeyUsedKBPerMin": 29.5,
      "perKeyPercentOfThroughput": 0.72,
      "valueCapChars": 4194304,
      "keyNameCapChars": 50,
      "clearTickRateLink": "none. runtime.clearTickRate and runtime.saveIntervalSeconds are independent and the requested 0.12 to 0.04 tick change moves no figure in this block."
    },
    "payload": {
      "fields": "exactly the seven stateShape fields marked persisted, plus the envelope fields sessionLock.record declares and nothing else",
      "clearedMaxKeys": 1880,
      "clearedMaxKeysSource": "depths, wave 4 revision: area 8 at 1200 patches, post-terminal bay at 1880 — UNRELEASED, cid/gameplay/_verified-wave4.md line 3, 'Stage 4 does not release'",
      "supersedes": "stateShape's and Persistence.luau:13's 'at most 640 keys in cleared', which is low by 2.94x",
      "worstCaseChars": 22100,
      "worstCaseDerivation": "cleared 21465 (9 one-digit keys at 9 chars, 90 two-digit at 10, 900 three-digit at 11, 881 four-digit at 12) + found 491 + upgrades 48 + rowsRevealed 67 + three scalars 58 + braces 10",
      "worstCasePercentOfValueCap": 0.53,
      "integerKeysReturnAsStrings": true,
      "integerKeyRule": "every reader of cleared uses tonumber(key) and never a type test, because the JSON round trip returns integer keys as strings",
      "growsWithProgress": false
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
      { "id": "D9",  "rule": "no lastSeen, no streak, no daily-grant field, no promo-code field",                                     "observable": "the payload literal in save() has exactly the declared field names" },
      { "id": "D10", "rule": "no second DataStore, no second key per player, no scope argument",                                      "observable": "grep -rn 'GetDataStore' game/src/server/Persistence.luau returns exactly one match" },
      { "id": "D11", "rule": "no GetVersionAsync, ListVersionsAsync or RemoveAsync in game code",                                     "observable": "grep -rn 'GetVersionAsync\\|ListVersionsAsync\\|RemoveAsync' game/src returns nothing" },
      { "id": "D12", "rule": "no remote reads or writes a save; the snapshot is protocol's and carries no payload field",             "observable": "grep -rn 'Persistence' game/src/client returns nothing" },
      { "id": "D13", "rule": "no ranking, ladder or leaderboard structure of any kind",                                               "observable": "grep -rn 'leaderstats\\|leaderboard' game/src returns nothing" },
      { "id": "D14", "rule": "no SetAsync",                                                                                          "observable": "grep -rn 'SetAsync' game/src returns nothing" },
      { "id": "D15", "rule": "no fourth write call site. Writes happen at wiring.onSave, onLeave and onShutdown and nowhere else — a save on every Find or every purchase is a revision against wiring, not an optimisation", "observable": "every call to Persistence.save in game/src/server is inside one of those three phases" }
    ],
    "observability": {
      "emits": "one warn per failed attempt and one per exhausted profile, prefixed [Persistence], naming the player and the reason",
      "storeOpenWarning": "once per server, never once per pass",
      "pipe": "unowned. Warnings reach the server output and nowhere a human reads. Security names the same gap for detection; Analytics owns what to record and explicitly not how the pipe is built.",
      "kindOfWorkNeeded": "server-side event transport and retention"
    }
  }
}
```

## Revision requests issued

I do not edit `architect/`. Each of these names a field.

| id | target | request |
|---|---|---|
| **RR-P1** | `architect/03-state-shape` — `fields` | Add an eighth persisted field **`sessions: integer`**, `writtenBy: "persistence"`, incremented exactly once per successful load (a first-ever load yields `1`), never decremented, never read by any path that grants anything. **Three domains asked for the same thing from three directions**: Engagement, Funnels and Event Logging each hit `save` writing seven fields with no timestamp, no join count and no session count, while `load` returns `readable`, which is `true` for a fresh save too. From `sessions`: a run ordinal is `sessions`; "is this a returning player" is `sessions > 1`, which `readable` cannot express; a session id is `(UserId, sessions)` with no clock and no GUID. It is **not a streak** — it has no date component and cannot express consecutiveness — and it is not a timestamp, so `01-FOUNDATION.md`'s no-offline-accumulation line is untouched. Cost: one integer, `log10` digits of payload growth. **Adding it fires my own sheet-03 trigger `B3` and bumps the store, which is free today and is the point of stating the trigger list.** |
| **RR-P2** | `architect/03-state-shape` — acceptance criterion 2 | Narrow to: "The persisted payload contains exactly the seven fields marked `persisted: true`, **plus any envelope field declared in `sessionLock.record` and declared nowhere else**. `patches`, `spawnPivot`, `owned`, `armState` and `player` never reach a DataStore." The criterion's purpose is that no *live* field reaches the store; a lock field is `persistence`'s envelope and is not a `PlayerState` field at all. |
| **RR-P3** | `architect/02-modules` — `persistence.exposes` | `save(player, state): boolean` → `save(player, state): (boolean, string?)`. `server-main` cannot distinguish an ordinary write failure from a stale session without it, and the release rule turns on exactly that distinction. Backward compatible: an existing caller ignoring the second return still compiles. |
| **RR-P4** | `architect/02-modules` — `entitlements` criterion 3 | `grep -rn 'owned' game/src/server/Persistence.luau returns nothing` is **unsatisfiable** — it returns two matches (a comment and `owned = {}`) and it must, because `07-wiring.constructs` requires `defaultState()` to set `owned {}` there. Narrow it to `grep -rn 'state.owned'`, which is what `03-state-shape` criterion 8 already greps and which passes. The underlying rule holds in the shipped file: `save`'s payload literal is exactly the seven persisted fields. |
| **RR-P5** | `architect/03-state-shape` — the `cleared` note, and `02-modules` `persistence` criterion 1 | "at most 640 keys" → **1,880**, sourced to `depths` as revised in wave 4 and marked unreleased. The bound is not decorative: it is what the value-cap and per-key-throughput percentages are computed against. |
| **RR-P6** | `architect/07-wiring` — `onSave` step 1 | Its description reads "a failure warns and the loop continues; the next pass retries by existing", which is true of a *write* failure and silent on the read-failure latch. Add that for a `writesBlocked` player the pass performs a re-read rather than a write, and that three consecutive `readFailed` returns release the player. |

## Consequences for other work

- **Notice work (`ui-ux/feedback`, sheet 03)** gets its case (a) answered from my side: the session
  is bounded at 135 seconds and ends in a `Kick`, not in a silent full-session discard. If it
  supplies a kick string that string is what the player reads; if it declines, the platform default
  shows and nothing here breaks. It should also know there is **no notice for `lockHeld`** — sheet
  02 rules that out.
- **Server-boot and join work (`server-main`)** gains one counter per player and one `Player:Kick`
  call site, and loses nothing. The counter resets on a successful pass.
- **Engagement, Funnels and Event Logging work** should read RR-P1 rather than deriving a session
  identity from `readable`, which is `true` for a fresh save and cannot tell a returning player from
  a new one.
- **Security work** inherits that a save is never client-reachable (`D12`) and that the only
  detection signal this module produces is a `warn` into an unowned pipe.
- **Performance work** inherits a payload figure to budget against — 22,100 characters at the
  post-terminal bay — and the statement that the tick rate does not move it.
- **Build & Deploy work** inherits `D6` as the concrete case of its own emitted-null hazard: no
  value in any of my three keys is null, deliberately.
- **Area-layout and endgame work** are untouched: nothing here stores a per-area boolean, and the
  `areasFinished` integer stays the whole record of the endless run.

## Pushing back

**`architect/02-modules`, `persistence` criterion 3 — "a DataStore outage leaves the player playable
rather than erroring."** I keep it at join and narrow it after: the player *is* playable, for 135
seconds, and is then released. The criterion was written when the alternative to "playable" was
"erroring at join", and the third case — playable but permanently unsaveable — was not in view. It
is the case that costs a returning player a whole session, and the shipped module's own header
concedes this behaviour "is not in the state shape."

## Acceptance criteria

1. `grep -rn "SetAsync" game/src` returns nothing, and `grep -rn "UpdateAsync"
   game/src/server/Persistence.luau` returns at least two matches.
2. `grep -rn "math.random\|Random.new\|os.time\|os.clock\|tick()"
   game/src/server/Persistence.luau` returns nothing.
3. A 16-player server in which one joining player's read fails on every attempt, run for 150
   seconds at `saveIntervalSeconds` 45, produces exactly three `[Persistence]` re-read warnings for
   that player, exactly one `Player:Kick` call, and zero writes carrying that player's payload.
4. A payload for a player in the post-terminal bay with all 1,880 `cleared` keys serialises to
   fewer than 25,000 characters, and payloads for the same player at `areasFinished` 8 and at 40
   differ by at most 2 characters.

## Not decided here

Whether a session lock exists, its record, its cadence and its steal timeout — sheet 02, which holds
`sessionLock` and supplies the envelope field this payload carries. What forces a store bump,
whether a prior version is read, and the migration and per-bump rollback — sheet 03, which holds
`storeMigration`. The persisted field list, the store name and the 45-second interval —
`architect`'s `stateShape`, `runtime` and `wiring`; every change I need is a revision request above.
The exact string a released player reads — `notices` (`ui-ux/feedback` 03). Where the warning pipe
writes — nobody's; named in `observability.pipe`. Whether `clearTickRate` changes — Tech &
Performance; nothing here moves with it.
