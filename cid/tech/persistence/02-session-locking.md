# 02 — Session locking

**Domain:** tech/persistence · **Category:** Tech & Data · **Wave:** 5

## Decision

**Yes, a lock exists, and it costs zero additional DataStore requests.** It is two fields inside the
same stored value, acquired by the join read's `UpdateAsync`, refreshed by the existing 45-second
save write, released by the leave and shutdown writes, and stealable after **150 seconds** of a
stale heartbeat. A joining player who meets a live lock plays normally on correct data with writes
deferred, and is told nothing.

## Why

- **The exposure is real and the fix is free, so declining it would need a reason there is not
  one.** Two servers holding one `UserId` is the classic currency-duplication route, and
  `04-PRESENTATION.md` calls the economy "the only thing worth cheating" `[brief: soft]`. The window
  here is narrow — Roblox puts a player in one server at a time — but rejoin churn on 10–20 minute
  mobile sessions `[brief: binding]` `00-CORE.md` makes "the old server has not finished its leave
  write" the normal case rather than the edge case, and last-writer-wins is how a fresh session gets
  clobbered by a dying one.
- **Inside the payload, not beside it, and the arithmetic is why.** A separate lock key makes
  release a second write: 16 saves plus 16 releases is **32 requests against a 30-request queue**
  at shutdown, and the queue drops everything past 30 with a 30x error
  `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/cloud-services/data-stores/error-codes-and-limits.md]`.
  Folding release into the save write is not a style preference; it is the difference between 16 and
  32 against a hard 30.
- **`MemoryStoreService` is rejected** — a second service, a second quota and a second failure mode,
  bought only for a faster steal. `[cid: decided]`
- **`UpdateAsync` is what makes the cost zero.** Its transform sees the stored value, so the acquire
  test and the payload read are one request, and the release and the final write are one request.
  Sheet 01 states this dependency in `persistence.api.readApiIfSessionLockDisabled`, so if this key
  were ever set `enabled: false` the read reverts to `GetAsync` and nothing else moves.
- **`ProfileStore` is precedent, not instruction.** It session-locks through `UpdateAsync`, defaults
  its auto-save to **300 seconds**, and uses `MessagingService` to resolve conflicts faster
  `[research: https://madstudioroblox.github.io/ProfileStore/]`. The `MessagingService` half is
  unavailable under the scope gate (`03-META.md` priority 3, leaderboards and cross-server state),
  and **nothing replaces it**: the price is that an ungraceful server death costs the next holder up
  to `stealAfterSeconds` of deferred writes. That is paid rarely, because a graceful leave releases
  the lock in its own save, and it is paid by a player who is otherwise playing normally.
- **150 seconds is derived, not picked.** `3 × runtime.saveIntervalSeconds + 15` — three consecutive
  missed heartbeats plus the longest retry budget any profile spends (`leave`, 7 s, doubled for
  slack). At that value the first periodic pass that can succeed is pass 4, 180 s after join.
  `[playtest unknown]`, test range **120 to 300**, with ProfileStore's 300 s auto-save as the far
  end of the precedent.
- **A held lock is a `writesBlocked` session and not a new failure machine.** Sheet 01 already has
  one, and `lockHeld` is a third row in it. The recovery differs from `readFailed` in one way that
  matters: **this session's data came from a successful read**, so when the acquire finally succeeds
  the state is safe to write and the latch clears cleanly. `readFailed` can never clear that way,
  which is why only `readFailed` releases the player from the server.
- **Nothing is said to the player.** `response.negativeBeats` is `0`, `input.pressable
  .rejectionCueOnFailedPrecondition` is `"none"`, and the data on screen is *correct* — only the
  write is deferred. A queue screen or a "reconnecting" notice would be the first negative beat in a
  game whose brief says "there is no failure state" `[brief: soft]` `02-GAMEPLAY.md`.
- **The heartbeat is the first timestamp this game has ever stored, and that is the sharpest thing
  on this sheet.** `01-FOUNDATION.md`'s "no offline accumulation" `[brief: binding]` and
  `04-PRESENTATION.md`'s "no timestamp exploit" `[brief: soft]` are true today *because there is no
  stored clock*, not because anything guards one. `timestampNonConversion` below is the guard, and
  it is written as five grep-shaped prohibitions rather than as an intention.
- **The clock is `workspace:GetServerTimeNow()`, and that choice is forced twice over.**
  `runtime` acceptance criterion 3 greps `os.time()|os.clock()` across `game/src`, so those two are
  unavailable without a revision; and a cross-server steal test on `os.time()` is a clock-skew bug
  waiting to happen, where `GetServerTimeNow` is synchronised.
  `[research owed: the reference page for Workspace:GetServerTimeNow(), to confirm it returns
  Unix-epoch seconds and is synchronised across the servers of one experience. If it is neither, the
  field becomes os.time() and RR-P7 below becomes required rather than precautionary.]`

```manifest
{
  "provides": "sessionLock",
  "status": "proposed",
  "value": {
    "enabled": true,
    "mechanism": "a lock field inside the same stored value, written by the same UpdateAsync transform that writes the save",
    "additionalRequestsPerSession": 0,
    "mechanismsRejected": [
      { "id": "separateLockKey",     "why": "release becomes a second write: 16 saves plus 16 releases is 32 requests against a 30-request queue at shutdown, and everything past 30 is dropped with a 30x error" },
      { "id": "memoryStoreService",  "why": "a second service, a second quota and a second failure mode, bought only for a faster steal" },
      { "id": "noLockAtAll",         "why": "two servers holding one UserId is the currency-duplication route in a game whose economy the brief calls the only thing worth cheating, and the lock costs zero additional requests" }
    ],
    "record": {
      "path": "the stored value's `lock` field — an envelope field owned by persistence, never a PlayerState field",
      "fields": [
        { "name": "jobId",     "type": "string", "value": "game.JobId of the holding server", "purpose": "identifies the holder, so a re-acquire by the same server is a refresh and not a steal" },
        { "name": "heartbeat", "type": "number", "value": "workspace:GetServerTimeNow(), epoch seconds", "purpose": "the only input to the steal test, and read by nothing else" }
      ],
      "fieldCount": 2,
      "absentMeans": "no server holds this key. A missing lock is acquirable and there is no third state.",
      "nullable": false
    },
    "acquire": {
      "when": "wiring.onJoin step 1, inside the same UpdateAsync that reads the payload",
      "extraRequests": 0,
      "succeedsWhen": [
        "lock is absent",
        "lock.jobId equals this server's game.JobId",
        "GetServerTimeNow() - lock.heartbeat >= stealAfterSeconds"
      ],
      "onSuccess": "the transform stamps jobId and heartbeat and returns the stored payload; the session writes normally",
      "onFailure": "persistence.staleSession reason `lockHeld`. The payload is still returned and still used — the read succeeded — and only the write is deferred."
    },
    "refresh": {
      "ridesOn": "the existing periodic save write",
      "cadenceSeconds": 45,
      "cadenceOwner": "runtime.saveIntervalSeconds — cited, not re-decided here; a different cadence would be a revision against architect/01-runtime and none is requested",
      "extraRequests": 0
    },
    "steal": {
      "afterSeconds": 150,
      "derivation": "3 x runtime.saveIntervalSeconds + 15 s, i.e. three consecutive missed heartbeats plus twice the longest retry budget any profile spends",
      "playtestUnknown": true,
      "testRangeSeconds": [120, 300],
      "precedent": "ProfileStore's default auto-save is 300 s; cited as precedent, not as an instruction",
      "firstRecoveryPassThatCanSucceedSeconds": 180,
      "whoPays": "only a player whose previous server died ungracefully; a graceful leave releases the lock in its own save"
    },
    "release": {
      "when": ["wiring.onLeave step 2", "wiring.onShutdown step 1"],
      "how": "the same UpdateAsync transform that writes the final payload sets lock to absent",
      "extraRequests": 0,
      "shutdownRequestCount": 16,
      "shutdownRequestCountIfReleaseWereSeparate": 32,
      "queueDepth": 30,
      "onUnreleasedLock": "the next holder steals it after stealAfterSeconds; no repair pass and no sweeper exists"
    },
    "joiningPlayerExperience": {
      "sees": "normal play on correct data",
      "notice": "none",
      "loadingGate": "none",
      "queueScreen": "none",
      "reconnectingIndicator": "none",
      "kick": "none — only persistence.staleSession reason `readFailed` releases a player",
      "reason": "response.negativeBeats is 0, the data on screen is correct, and only the write is deferred"
    },
    "timestampNonConversion": {
      "timestampsIntroduced": ["lock.heartbeat"],
      "readBy": "the steal comparison in acquire.succeedsWhen, and nothing else in the game",
      "forbiddenReads": [
        "no currency, Shard, balance or payout expression may reference lock.heartbeat",
        "no upgrade level, set factor, product factor or modifier may reference it",
        "no Find, patch, area or post-terminal bay may be granted, unlocked or advanced from it",
        "no difference between two heartbeats may reach any expression outside the steal test",
        "it is never sent to a client, never in a snapshot, never in a notice, never in a log line a player can see"
      ],
      "why": "01-FOUNDATION.md's 'no offline accumulation' [brief: binding] and 04-PRESENTATION.md's 'no timestamp exploit' [brief: soft] are true today only because the game stores no clock. This key stores the first one."
    },
    "messagingServiceReplacement": "nothing replaces it, and the price is stated rather than hidden: an ungraceful server death costs the next holder up to stealAfterSeconds of deferred writes."
  }
}
```

## Revision request issued

**RR-P7 · `architect/sheets/01-runtime.md` acceptance criterion 3.** The criterion greps
`math.random|Random.new()|os.time()|os.clock()` across `game/src` and permits nothing outside a
`Random.new(seed)` derived from `GameConfig.LayoutSeed`. Its purpose is layout determinism — a
second source of randomness is save-corrupting — and a *clock* was swept in beside the RNG. My
design avoids the grep entirely (`workspace:GetServerTimeNow()` for the heartbeat, a pass counter
rather than a timer for the release rule), so **this is precautionary rather than blocking**. The
request: restate the criterion as "no module derives a placement, a payout or a grant from a clock
or from an unseeded RNG", which is what it means, and which survives a lock heartbeat existing.

## Consequences for other work

- **The save write (sheet 01, this domain)** carries `lockHeld` as its third `writesBlocked` reason
  and reverts `readApi` to `GetAsync` if this key is ever disabled. That is the whole interface
  between my two keys and it is stated in both.
- **Security work** may treat currency duplication as **closed by this key** rather than by a
  validation rule: two servers cannot both write one `UserId`'s payload, and `discovery.record`
  already makes Find duplication structurally impossible. What is *not* closed is position
  authority, which stays that domain's real work.
- **Notice work (`ui-ux/feedback`)** gains a named non-member: there is no lock notice, no
  reconnecting indicator and no queue screen, and this sheet is the ruling that closes it. Its
  sheet 03 covers only `readFailed`.
- **Networking work** must know that `lock.heartbeat` never reaches a snapshot. `social.forbidden`
  `X7` already bans a second player's identifier on the wire; this adds that a server's `JobId` is
  in the same class and is never replicated.
- **Build & Deploy work** inherits the ungraceful-shutdown case as a stated cost of its restart
  procedure: servers restarted through the dashboard run `BindToClose` and release their locks;
  servers that die do not, and the next joiner waits up to 150 seconds for writes to resume.
- **Analytics work** may not use `lock.heartbeat` as a session clock. It is forbidden by
  `timestampNonConversion` and the field they actually want is sheet 01's `RR-P1` (`sessions`).

## Acceptance criteria

1. `grep -rn "GetDataStore" game/src/server/Persistence.luau` returns exactly one match: one store,
   one key per player, and no separate lock store anywhere in `game/src`.
2. A full shutdown of a 16-player server issues **16** DataStore requests before retries, and never
   has more than 16 outstanding at any instant against the 30-request queue.
3. `grep -rn "heartbeat\|JobId" game/src` matches only `Persistence.luau`, and every match sits
   inside the acquire transform or the steal comparison — no match appears in a file that computes
   currency, an upgrade level, a modifier or a grant.
4. A second server joining against a lock whose heartbeat is under 150 seconds old gets
   `(false, "lockHeld")` from `save` on every pass until the steal window opens, and writes zero
   payloads in the interim; the first pass at or after 180 seconds writes.

## Not decided here

The key format, the retry schedule, the request budget, the payload bound and the failure
prohibitions — sheet 01, this domain, which holds `persistence`. The 45-second cadence itself —
`architect/01-runtime`'s `saveIntervalSeconds`; this key rides it and requests no change. What
forces a store bump and whether a `lock` field survives a migration — sheet 03, which rules that it
is never carried. The string a released player reads, and whether any system notice exists at all —
`notices` (`ui-ux/feedback` 03); this sheet supplies one certainty, that none of them is mine.
Position authority, speed and teleport validation — Security. Whether `sessions` becomes a
persisted field — `architect/03-state-shape`, requested in sheet 01's RR-P1.
