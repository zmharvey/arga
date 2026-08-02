# 02 — Ingress limits

**Domain:** tech/networking · **Category:** Tech & Data · **Wave:** 5

## Decision

The server accepts at most **10 `BuyUpgrade` messages per second per player with a burst of 20**, and **1 `RequestState` invoke per second per player with a burst of 3**. Anything over either ceiling is **dropped in silence** — no cue, no warning, no `warn`, no kick, no per-message log. `BuyUpgrade` returns without touching state; `RequestState`, being a `RemoteFunction`, returns `nil` immediately without building a snapshot. Counters are two token buckets per `UserId`, refilled from `os.clock()`, held in a `server-main` module-local map, live only, never persisted.

## Why

**Whether a message is admissible is Security's `integrity`, never mine.** I own how many messages the server will look at; Security owns what it does when it looks. So this sheet names no validation rule, no payload shape, no byte-length bound, no detection heuristic and no logging pipe. My lead's own distinguishing test is the one I apply: a value that changes with the wire is mine, a value that changes with the rules is Security's, and if both sheets carry a per-second number, mine yields `[research: cid/tech/security/_lead.md]`.

**Two channels are the entire client surface and it is checked at load, not promised.** `input.clientOriginatedRemotes` is exactly `["RequestState", "BuyUpgrade"]` `[brief: soft]` ← ruling R-1, and `Protocol.luau` asserts the declared client→server set equals that list in both directions at require time `[research: game/src/shared/Protocol.luau]`. There is no third channel to rate-limit and adding one fails the boot.

**The `BuyUpgrade` ceiling is anchored on a client debounce that binds nothing.** `input.pressable.debounceSeconds` is 0.35 with `activationsPerPress` 1 `[research: game/src/shared/GameConfig.luau]`, and there are three buy pressables. Whether the debounce is per-pressable or global is not stated anywhere, so I take the loose reading — 3 / 0.35 = 8.57 presses/s — and set the ceiling above it at 10, so a legitimate player is never touched at any mash rate a hand can produce. The debounce is a *client* value and a modified client honours none of it, which is exactly why a server ceiling has to exist at all `[cid: decided]`.

**The `RequestState` ceiling is anchored on the fact that it is fired once per client boot.** It is not a player verb — `input.clientRemotesFiredByPlayerInput` is exactly `["BuyUpgrade"]` `[research: game/src/shared/GameConfig.luau]` — and `client-main` pulls once after its updaters are live, because the join push may have landed before the HUD existed `[research: game/src/shared/Protocol.luau]`. Legitimate demand is therefore **one**. It is today an unbounded `OnServerInvoke` that builds a whole 464-byte snapshot per call `[research: game/src/server/init.server.luau]`, so it is the cheaper of the two channels to abuse and gets the tighter ceiling. Burst 3 covers a boot plus a Studio reload edge and nothing more.

**Over-limit behaviour is forced, not chosen.** `input.verbs[buy].onPreconditionFail` is `silentNoOp` and `input.pressable.rejectionCueOnFailedPrecondition` is `"none"` `[research: game/src/shared/GameConfig.luau]`, so no cue, message or rubber-band is available. A `warn` is worse than nothing: on a client-controlled path it is a log a modified client can fill on demand, which the shipped comment at the purchase handler already knows `[research: game/src/server/init.server.luau]`.

**A `RemoteFunction` cannot be dropped the way a `RemoteEvent` can, and this is the one place the two channels genuinely differ.** An `OnServerInvoke` that never returns leaves the caller's `InvokeServer` blocked forever. So the over-limit action for `RequestState` is a **`nil` return**, not silence — and `client-main` must treat a `nil` reply as "no snapshot yet" and fall through to the join push it already tolerates arriving first. Stating this is the difference between a build that hangs a client and one that does not `[cid: decided]`.

**`os.clock()` is kept, and the exemption is claimed rather than dodged.** Both `architect/01-runtime` acceptance criterion 3 and `cid/tech/performance/03` `N10` grep `os.clock()` to zero across `game/src` `[research: architect/sheets/01-runtime.md]` `[research: cid/tech/performance/03-what-optimisation-may-never-do.md]`, and a builder implementing this sheet fails both. I am not switching instruments. **A token bucket refilled from a synchronised wall clock refills backwards when that clock steps, which hands a modified client free tokens** — so `workspace:GetServerTimeNow()`, correct in `persistence/02` because a lock heartbeat must be comparable *across servers*, is wrong here, where the bucket needs a monotonic delta on *one*. The other escape, a per-tick refill job, satisfies the grep and destroys `serverCostAdded.perTick: 0`, which is a real property of this design. Both criteria exist to stop unseeded randomness and clock-derived *placements and grants* reaching the world; nothing here derives any of those from a clock, and nothing here is persisted. RR-N8 below carries the narrower restatement, and it is issued separately from `persistence/02`'s RR-P7 because RR-P7 as worded neither forbids nor permits this use `[cid: decided]`.

**Storage is module-local and that is a constraint, not a preference.** `architect/03-state-shape` fixes `PlayerState` at twelve fields with one writer each, so a thirteenth is a revision request and not something I may take. `server-main` already keeps two module-local `UserId`-keyed maps — `spawnPoses` and `characterConnections` — created around the publish point and dropped in `onLeave` `[research: game/src/server/init.server.luau]`. The bucket map follows them exactly: created at `wiring.onJoin` step 5, deleted at `wiring.onLeave` step 4. Four numbers per player, 64 numbers at `runtime.maxPlayers` 16.

**A message from a player with no bucket is dropped, and that already happens.** `wiring.onPurchase` step 1 drops a `BuyUpgrade` for a `UserId` not in the collection `[research: architect/sheets/07-wiring.md]`. The bucket map has the same lifetime as the collection, so "no bucket" and "no state" are the same condition and need one branch, not two.

**Every ceiling below is `[playtest unknown]`.** Nothing in the brief states a rate-limit position — `OPEN.md §1` calls integrity "the least defensible" of its zero-question items — and no shipping Roblox game's published ingress thresholds were fetched. The starting values are derived from the two legitimate-demand figures above; the test ranges are wide because the only real failure mode is a false positive on a legitimate player, and that is observable in one play session.

```manifest
{
  "provides": "ingressLimits",
  "status": "proposed",
  "value": {
    "scope": "how many client-originated messages the server will read, per channel, per player",
    "notInScope": "whether a read message is legal, what its arguments must be, its byte length, what a violation means, and anything recorded about it — all tech/security integrity",
    "clientOriginatedChannelCount": 2,
    "clientOriginatedChannelCountIsClosed": true,
    "closedSurfaceCheckedAt": "require time, in game/src/shared/Protocol.luau, against GameConfig.Input.clientOriginatedRemotes in both directions",
    "algorithm": {
      "kind": "token bucket, one per channel per player",
      "refillPerSecond": "the sustained ceiling",
      "capacity": "the burst allowance",
      "refillModel": "continuous, computed lazily at read time; no per-tick refill job",
      "costPerMessage": 1,
      "acceptWhen": "tokens >= 1, then tokens -= 1",
      "sharedAcrossChannels": false,
      "clockSource": "os.clock()",
      "clockSourceIsMonotonic": true,
      "clockExemption": {
        "claimed": true,
        "failsAsWritten": ["architect/01-runtime acceptance criterion 3", "cid/tech/performance/03 N10"],
        "bothGrep": "math.random | Random.new() | os.time() | os.clock() | tick() | table.sort across game/src",
        "reason": "a bucket refilled from a synchronised wall clock refills backwards when that clock steps, handing a modified client free tokens; os.clock is monotonic and skew-free and is the only instrument in this build that is both",
        "alternativesRejected": [
          { "what": "workspace:GetServerTimeNow()", "why": "correct in persistence/02 because a lock heartbeat must be comparable ACROSS servers; wrong here, where a bucket needs a monotonic delta on ONE server" },
          { "what": "a per-tick refill job", "why": "satisfies the grep and destroys serverCostAdded.perTick = 0, which is a real property of this design" }
        ],
        "derivedFromTheClock": ["how many messages the server reads"],
        "notDerivedFromTheClock": ["any placement", "any payout", "any grant", "any random draw", "anything persisted"],
        "ridesPersistenceRRP7": false,
        "ridesPersistenceRRP7Why": "RR-P7 as worded restates the criterion as 'no module derives a placement, a payout or a grant from a clock', which neither forbids nor permits this use; RR-N8 carries the restatement that does"
      }
    },
    "channels": [
      {
        "name": "BuyUpgrade",
        "class": "RemoteEvent",
        "direction": "client -> server",
        "firedBy": "input, on a pressable activation",
        "legitimateDemandPerSecond": 8.57,
        "legitimateDemandDerivation": "3 buy pressables at input.pressable.debounceSeconds 0.35, taking the loose per-pressable reading because the contract does not say which reading holds",
        "sustainedCeilingPerSecond": 10,
        "sustainedCeilingTestRange": [4, 20],
        "burstCapacity": 20,
        "burstCapacityTestRange": [10, 40],
        "overLimitAction": "drop",
        "overLimitObservable": "no state write, no packet, no reply, no cue, no warn, no log",
        "handlerReachedOnOverLimit": false,
        "status": "[playtest unknown]"
      },
      {
        "name": "RequestState",
        "class": "RemoteFunction",
        "direction": "client -> server",
        "firedBy": "client-main, once per client boot, never by player input",
        "legitimateDemandPerSession": 1,
        "sustainedCeilingPerSecond": 1,
        "sustainedCeilingTestRange": [0.2, 2],
        "burstCapacity": 3,
        "burstCapacityTestRange": [2, 5],
        "overLimitAction": "returnNil",
        "overLimitActionReason": "an OnServerInvoke that never returns blocks the caller's InvokeServer forever; nil is the only silent drop a RemoteFunction has",
        "overLimitObservable": "no snapshot is built, no state is read beyond the bucket, no cue, no warn, no log",
        "clientMustTolerateNilReply": true,
        "clientNilReplyBehaviour": "treat as 'no snapshot yet' and wait for the next StateChanged push; client-main already tolerates the join push arriving before its updaters exist",
        "status": "[playtest unknown]"
      }
    ],
    "counterStorage": {
      "where": "a module-local map in server-main",
      "keyedBy": "UserId",
      "shape": { "buyTokens": "number", "buyLastClock": "number", "stateTokens": "number", "stateLastClock": "number" },
      "createdAt": "wiring.onJoin step 5, the publish point",
      "deletedAt": "wiring.onLeave step 4, beside the held spawn CFrame",
      "persisted": false,
      "inPlayerState": false,
      "inPlayerStateReason": "architect/03-state-shape fixes PlayerState at twelve fields with one writer each; a thirteenth is a revision request and is not taken here",
      "precedentInBuild": "server-main's spawnPoses and characterConnections maps",
      "entriesAtMaxPlayers": 16,
      "numbersAtMaxPlayers": 64
    },
    "noBucketMeans": "the player has not reached the publish point or has already left; the message is dropped by the same branch that drops a message with no state",
    "forbidden": [
      { "id": "I1", "rule": "no cue, notice, message or rubber-band on an over-limit message", "closedBy": "input.pressable.rejectionCueOnFailedPrecondition = none", "observable": "zero remote fires and zero GUI writes reachable from the over-limit branch" },
      { "id": "I2", "rule": "no warn, print or error on the over-limit path", "closedBy": "a log a modified client can fill on demand is a second denial of service", "observable": "the over-limit branch of either handler contains no warn, print or error" },
      { "id": "I3", "rule": "no kick, ban, throttle-with-notice or connection close caused by an over-limit message", "closedBy": "the response ladder is tech/security integrity.response and is not this sheet's", "observable": "the over-limit branch of either handler contains no Kick, Ban or connection close", "observableIsLocalNotGlobal": "deliberately — persistence/01 AC3 requires exactly one Player:Kick in the build, its stale-session release, and a global grep here would make that unbuildable" },
      { "id": "I4", "rule": "no per-message counter is written to persistence or to PlayerState", "closedBy": "architect/03-state-shape is closed at twelve fields", "observable": "the persisted payload has seven fields and none of them is a rate counter" },
      { "id": "I5", "rule": "no third client-originated channel is added to carry a limit exemption, an ack or a heartbeat", "closedBy": "input.clientOriginatedRemotes and Protocol.luau's load-time assertion", "observable": "the place fails to boot if an eighth channel declares direction client -> server" },
      { "id": "I6", "rule": "the two buckets do not share tokens", "closedBy": "a BuyUpgrade flood would otherwise silence a legitimate boot pull", "observable": "the bucket record has four fields, two per channel" }
    ],
    "serverCostAdded": {
      "perAcceptedMessage": "one map lookup, one clock read, one subtraction, one comparison, one assignment",
      "perDroppedMessage": "the same, and nothing else",
      "perTick": 0,
      "perTickReason": "the bucket refills lazily at read time; there is no refill job on the tick loop"
    },
    "boundaryWithSecurity": {
      "mine": "how many messages per second the server will read",
      "securitys": "whether a read message is admissible, its argument count and types, its byte length, the purchase precondition set, the response ladder and the log record",
      "sharedNumber": "none — integrity.channels[] cites these ceilings and restates no rate figure"
    },
    "revisionRequests": [
      {
        "id": "RR-N8",
        "against": ["architect/sheets/01-runtime.md acceptance criterion 3", "cid/tech/performance/03-what-optimisation-may-never-do.md N10"],
        "asks": "restate both greps as: no module derives a placement or a grant from an unseeded RNG or from a wall clock; a monotonic elapsed-time read (os.clock) is permitted, and math.random, Random.new() with no seed, os.time() and tick() remain forbidden",
        "because": "both criteria exist to stop unseeded randomness and clock-derived placements reaching the world, and both currently also forbid the only monotonic elapsed-time read the engine offers, which this sheet and cid/tech/security/01 both require",
        "sharedWith": "cid/tech/security/01-position-authority.md, which hit the identical wall for the same instrument and the same reason",
        "distinctFrom": "persistence/02 RR-P7, whose wording ('no module derives a placement, a payout or a grant from a clock') neither forbids nor permits this use"
      }
    ]
  }
}
```

## Consequences for other work

- **Channel-admission work (`integrity.channels[]`, tech/security sheet 02)** cites these two ceilings and writes no rate number of its own. Its admission check runs **after** the bucket, so a message the bucket drops never reaches a validator and never appears in whatever record that sheet defines.
- **Position-authority work (`integrity.positionAuthority`, tech/security sheet 01)** and this sheet need one restatement between them, not two. RR-N8 is worded to cover both instruments; joining it is cheaper than issuing a second.
- **Stale-session work (`persistence/01`)** keeps its single `Player:Kick`. `I3` is scoped to the over-limit branch precisely so its AC3 stays satisfiable; a global grep here would have made a data-integrity release unbuildable in order to close a punishment question that is not mine.
- **Whoever owns `server-main` (`architect`, `modules`)** gains one map with the same lifetime as `spawnPoses`, and one branch at the top of the `BuyUpgrade` handler and the `RequestState` invoke. It gains no `PlayerState` field and no tick-loop job.
- **Client boot work (`client-main`)** inherits one requirement it does not have today: a `nil` reply from `RequestState` must be tolerated and must not be treated as an empty snapshot. Writing eight nil fields into the HUD blanks it.
- **Violation-response work (`integrity.response`, tech/security sheet 03)** inherits an empty input from this sheet: a dropped message produces no record here, so if that sheet wants over-limit events counted, it must define the counter and its own cap. I deliberately supply none, because an unrate-limited log is the second denial of service.

## Acceptance criteria

1. The `BuyUpgrade` `OnServerEvent` handler and the `RequestState` `OnServerInvoke` each begin with a bucket check, and in the `RequestState` handler the `buildSnapshot` call is unreachable when the check fails.
2. The over-limit branch of each of the two handlers contains no `warn`, `print`, `error`, `Kick`, `Ban` or connection close, and fires no remote.
3. The rate-counter map is declared in `game/src/server/init.server.luau`, is keyed by `UserId`, is written at the publish point and cleared in `PlayerRemoving`; the persisted payload still has exactly seven fields.
4. Firing `BuyUpgrade` 200 times in one frame from a test client produces at most 20 reachings of `progression.tryBuy`.

## Not decided here

Whether a message the bucket accepted is valid, its argument count, its types or its byte length (`tech/security`, `integrity.channels[]`). What a violation does and what is recorded, including every `Player:Kick` in the build (`tech/security`, `integrity.response`; `tech/persistence`, `staleSession.releaseMechanism`). The position rule the payout is measured against (`tech/security` sheet 01). The channel names, classes and directions (`architect/05-interfaces`). What crosses server→client and how often (sheet `01`, this domain). The client-side debounce value itself (`input`, `gameplay/mechanics/02`). Whether RR-N8 is accepted, which is `architect`'s and `tech/performance`'s.
