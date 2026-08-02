# 02 — Channel admission

**Domain:** tech/security · **Category:** Tech & Data · **Wave:** 5

## Decision

Six client-originated channels exist, two remotes and four platform-level, and each has one
admission rule stated as data. **An inadmissible message is dropped: no state change, no reply, no
cue, no `warn`** — with one stated exception, `RequestState`, which is a `RemoteFunction` and must
return `nil`. Two of the six need work, three need a rule and no code, and one is already closed.

## Why

- **The client surface is closed at two remotes and this sheet does not widen it.**
  `input.clientOriginatedRemotes` is exactly `["RequestState", "BuyUpgrade"]` and `protocol.REMOTES`
  checks the two lists against each other in both directions
  `[research: architect/sheets/05-interfaces.md]`. Ruling R-1 contained *"Input: movement only"*
  `[brief: soft]` to one input class and two verbs; I do not re-argue it.
- **`BuyUpgrade` is type-checked and not length-checked.** `init.server.luau:445` tests
  `type(upgradeId) ~= "string"` and stops there. A string argument on a Roblox remote is
  client-sized, so a one-megabyte id is admitted into `Progression.tryBuy`'s table lookup today.
  **The missing checks are arity and byte length**, and `maxArgumentBytes` 32 is a bound rather than
  a tuning number: the longest legal id is `radius` at 6 bytes, so no legal message is near it and
  no illegal one is retained `[cid: decided]`.
- **`RequestState` is the cheapest CPU denial-of-service in the game.** `init.server.luau:582` sets
  an unbounded `OnServerInvoke` that calls `buildSnapshot(state)` on every invoke, and a snapshot is
  eight fields including a 24-key map `[research: architect/sheets/05-interfaces.md]`. The fix is
  not a rate number — that is `ingressLimits`' — it is that **a snapshot may be built at most once
  per player between two `StateChanged` fires**, because a snapshot cannot change without one. A
  second invoke inside that window returns the cached table, which is byte-identical by
  construction. That is a derivation, not a limit, and it composes with whatever ceiling Networking
  sets.
- **A `warn` on a client-controlled path is a log a client can fill on demand**, which the shipped
  comment at `init.server.luau:447` already knows in as many words. So the rule is silence, and the
  only record any inadmissible message may produce is the rate-capped one sheet `03` defines.
- **`Humanoid.WalkSpeed` needs no re-assertion, and saying so prevents a per-tick Humanoid write.**
  The server writes it at `init.server.luau:242`, reached from `onSpawn` (`:325`) and from
  `onPurchase` (`:460`), so a client overwrite persists until the next spawn — and it buys nothing,
  because **no server decision reads `WalkSpeed`**. Sheet `01`'s origin advances at
  `modifiers.effective(state, "speed")`, which is computed from held levels and factors and never
  from the engine. Re-asserting it every tick would fight the client 7.5 times a second per player
  for zero integrity gain, and `response.humanoidWritesAllowed` is a permission rather than an
  instruction.
- **The character-CFrame channel has no bound at the platform and is not given one here.** A client
  with network ownership can "teleport to any position"
  `[research: https://create.roblox.com/docs/scripting/security/network-ownership]`; the admission
  rule is not that the position be refused but that **no payout may read it**, which sheet `01`
  enforces by measuring elsewhere.
- **Menu Reset Character is not refusable and does not need to be.** The reset item is the
  platform's and `traversal.death.lossOnRespawn` is `none`, so the game may not block it. Each cycle
  runs `World.onCharacter`, the pivot, a WalkSpeed write, a `Tool.equip` Model build and a snapshot
  push (`init.server.luau:305`–`:333`). Its rate is already bounded by
  `runtime.respawnDelaySeconds` (3), a platform floor, giving at most **5.33 cycles per second across
  all 16 players**. And a reset re-anchors sheet `01`'s origin to `spawnPivot`, which is *behind* the
  player, so it is a self-penalty rather than a route. `onSpawn` is already idempotent per character:
  `spawnPoses[userId]` is overwritten, `armState` re-arms, and the previous character's tool goes
  with the previous character. **Nothing is added; a cooldown here would fight the platform.**
- **Client-owned character instances are closed and must not be hardened.** Patches are
  `Anchored = true` (`Plots.luau:263`), `clearing` uses no `Touched`, and the tool has
  `clearsOnContact` false, `canCollide` false, `canTouch` false and `canQuery` false with zero
  particle emitters `[research: architect/sheets/05-interfaces.md]`. A client may resize, colour or
  fling its own tool and change no server decision. `[research owed: create.roblox.com/docs/physics/network-ownership — that the server always owns anchored BaseParts and a client cannot change that ownership; the checkable half, Anchored = true at Plots.luau:263, is a repo read]`
- **Rate ceilings are not mine.** Networking owns the accepted-messages-per-second figure per
  channel as `ingressLimits` by category ruling; a second copy would be a collision. Every row below
  names that key and states no number.

```json
{
  "amends": "integrity",
  "value": {
    "channels": [
      {
        "id": "BuyUpgrade",
        "kind": "RemoteEvent",
        "direction": "client -> server",
        "handler": "server-main, wiring.onPurchase, init.server.luau:439",
        "accepts": {
          "arity": "exactly one argument after the implicit Player",
          "type": "string, by type(), already checked at init.server.luau:445",
          "maxArgumentBytes": 32,
          "maxArgumentBytesDerivation": "the longest legal id is \"radius\" at 6 bytes; 32 is well clear of every legal message and retains no illegal one. NOT a tuning value.",
          "membership": "exact string equality with some GameConfig.Upgrades[i].id. No prefix match, no case fold, no pattern match, no substring."
        },
        "rejects": [
          "zero arguments",
          "two or more arguments",
          "any non-string type, including a table, a number, a boolean, an Instance, a Vector3 and nil",
          "a string longer than maxArgumentBytes",
          "a string that is not exactly an upgrades[].id",
          "any message for a UserId with no published state — already handled at init.server.luau:440"
        ],
        "onInadmissible": "return. No state change, no packet, no cue, no warn.",
        "postAdmissionPreconditions": {
          "owner": "progression.tryBuy, restated here as a rule set and not re-decided",
          "rules": [
            "the id is known — state.upgrades is indexed only after membership passes",
            "heldLevel < def.maxLevel, where a missing key reads as level 0",
            "state.currency >= config.upgradeCost(def, heldLevel), and level is the level HELD not the target",
            "on failure nothing is deducted, no level moves and no partial purchase exists",
            "nothing is refundable",
            "the failure is silent — input.verbs[buy].onPreconditionFail is silentNoOp and input.pressable.rejectionCueOnFailedPrecondition is \"none\""
          ]
        },
        "rateCeilingOwner": "ingressLimits (tech/networking/02). This sheet states no messages-per-second figure.",
        "countsTowardFlag": true
      },
      {
        "id": "RequestState",
        "kind": "RemoteFunction",
        "direction": "client -> server",
        "handler": "server-main, OnServerInvoke set at boot, init.server.luau:582",
        "accepts": { "arity": "exactly zero arguments after the implicit Player" },
        "rejects": ["any argument at all"],
        "onInadmissible": "return nil. THIS IS THE ONE EXCEPTION TO 'no reply': a RemoteFunction invoke blocks the caller, and an error inside OnServerInvoke propagates to InvokeServer and aborts client-main's boot. nil is already the shipped answer for an unpublished state and client-main is already required to tolerate it.",
        "buildBound": {
          "rule": "a snapshot is built at most once per player between two StateChanged fires for that player; a further invoke inside that window returns the cached table",
          "invalidatedBy": "any StateChanged fired to that player — by server-main on join, on spawn and after a purchase, and by clearing once per changed tick",
          "why": "a snapshot cannot change without one of those fires, so the cached table is byte-identical rather than stale. This bounds CPU per invoke; it does NOT bound invokes per second.",
          "cacheClearedAt": "wiring.onLeave, with the state"
        },
        "rateCeilingOwner": "ingressLimits (tech/networking/02). This sheet states no invokes-per-second figure.",
        "countsTowardFlag": true
      },
      {
        "id": "characterCFrame",
        "kind": "platform replication",
        "direction": "client -> server",
        "bound": "none at the platform. A client with network ownership of its character may teleport to any position.",
        "accepts": "the reported HumanoidRootPart position, as the TARGET of integrity.positionAuthority's bounded advance and for nothing else",
        "rejects": "every use of the reported position as a direct input to a payout",
        "forbiddenReads": [
          "any read of HumanoidRootPart.Position or .CFrame on a path that credits currency",
          "any such read on a path that writes state.found, state.cleared or state.areasFinished",
          "any distance-to-patch test taken from the reported position rather than from the origin"
        ],
        "serverWritesToCharacterCFrame": "exactly one, the spawn PivotTo at init.server.luau:316. response.controlEverAffected is false, so no pull-back, freeze or rubber-band may be added.",
        "onInadmissible": "not applicable — nothing is dropped; the value is simply never authoritative",
        "rateCeilingOwner": "none. This is replication, not a message.",
        "countsTowardFlag": "via integrity.positionAuthority.accumulator, not directly"
      },
      {
        "id": "humanoidWalkSpeed",
        "kind": "platform property",
        "direction": "client -> server",
        "bound": "none. A client may set Humanoid.WalkSpeed to any value and the overwrite persists until the next spawn, because the server writes it only on spawn and on purchase.",
        "serverWriteSites": ["init.server.luau:242, the single assignment, reached from onSpawn (:325) and from onPurchase (:460)"],
        "accepts": "the property as a cosmetic locomotion value with no authority",
        "rule": "NO SERVER DECISION READS Humanoid.WalkSpeed. The speed bound in integrity.positionAuthority reads modifiers.effective(state, \"speed\") and nothing else.",
        "reAssertionLoop": false,
        "reAssertionLoopReason": "a per-tick Humanoid write costs 7.5 writes per second per player and buys nothing once the payout no longer reads the property. response.humanoidWritesAllowed is a permission, not an instruction.",
        "acceptedResidue": "a speed-hacking player looks fast to a neighbour, which is a co-presence appearance and affects no payout, no currency and no Find.",
        "onInadmissible": "not applicable",
        "rateCeilingOwner": "none",
        "countsTowardFlag": false
      },
      {
        "id": "menuResetCharacter",
        "kind": "platform action",
        "direction": "client -> server",
        "bound": "runtime.respawnDelaySeconds (3), a platform floor between CharacterRemoving and CharacterAdded",
        "derivedCeiling": "at most 5.33 respawn cycles per second across runtime.maxPlayers (16)",
        "workPerCycle": ["world.onCharacter", "the spawn PivotTo", "one WalkSpeed write", "one tool.equip Model build", "one snapshot push"],
        "refusable": false,
        "refusableReason": "the reset item is the platform's and traversal.death.lossOnRespawn is \"none\"; a game-side block would be a failure state in a game that has none (02-GAMEPLAY.md, [you accepted: step 6 Q2])",
        "accepts": "every cycle, unconditionally",
        "notAnExploit": [
          "the reset re-anchors the clearing origin to state.spawnPivot, which is behind the player — a self-penalty, not a route",
          "onSpawn rebuilds no lane and no patch: plots.spawn is called from onJoin only (init.server.luau:380), so no cleared patch can be re-stood or re-paid",
          "spawnPoses[userId] is overwritten and never appended; armState re-arms per character; the previous character's tool goes with the previous character"
        ],
        "addedMachinery": "none. A cooldown here would fight a platform floor that already holds.",
        "rateCeilingOwner": "none — the platform's respawn delay is the ceiling",
        "countsTowardFlag": false
      },
      {
        "id": "clientOwnedCharacterInstances",
        "kind": "platform ownership",
        "direction": "client -> server",
        "status": "ALREADY CLOSED. Harden nothing.",
        "facts": [
          "every patch part is Anchored = true (Plots.luau:263), so no client may take ownership of one or move one into range",
          "clearing uses no Touched event and reads no client message (architect/sheets/05-interfaces.md, clearing.tick)",
          "the tool has clearsOnContact false, canCollide false, canTouch false, canQuery false, massless true and zero ParticleEmitters, and writes no Humanoid property",
          "a client may resize, recolour or fling its own tool and change no server decision"
        ],
        "accepts": "not applicable",
        "onInadmissible": "not applicable",
        "rateCeilingOwner": "none",
        "countsTowardFlag": false
      }
    ],
    "inadmissibleMeans": {
      "stateChange": "none",
      "reply": "none, except RequestState which returns nil",
      "playerFacingCue": "none — input.pressable.rejectionCueOnFailedPrecondition is \"none\"",
      "warn": "FORBIDDEN on every client-controlled path; init.server.luau:447 already states why",
      "record": "none for a single message. Only the crossing of integrity.logging.inadmissiblePerChannelFlagCount produces one, per sheet 03."
    }
  }
}
```

## Consequences for other work

- **Purchase-handler work (`server-main`, `wiring.onPurchase`):** two checks are added at
  `init.server.luau:445` — an arity test and `#upgradeId <= 32` — before the existing type test
  reaches `Progression.tryBuy`. Membership stays inside `tryBuy`, which already returns false on an
  unknown id; nothing about the precondition set changes.
- **Snapshot work (`replication`, tech/networking) and `server-main`:** `RequestState` gains a
  per-player cached snapshot invalidated by `StateChanged`. That is one table and one boolean per
  live state, not a `PlayerState` field, and it must be dropped in `wiring.onLeave` with the state.
- **Rate-ceiling work (`ingressLimits`, tech/networking):** both remote rows name your key and set
  no figure. My `countsTowardFlag` says which channels feed sheet `03`'s counter; your ceiling says
  how many the server looks at. The two compose and neither is the other.
- **Spawn work (`server-main`, `wiring.onSpawn`) and traversal work (`traversal`):** the reset cycle
  is admitted unconditionally and nothing is added to it. **Do not build a respawn cooldown, a reset
  suppression or a `ResetButtonCallback` override on this sheet's authority.**
- **Tool work (`tool`, gameplay/mechanics) and patch work (`patch`, art/objects):** your surfaces
  are closed and no hardening is owed. Do not add ownership assertion, a server-side tool position
  check or a `CanTouch` audit.

## Acceptance criteria

1. `integrity.channels` has exactly 6 rows, and the subset with `kind == "RemoteEvent"` or
   `"RemoteFunction"` is exactly the two names in `input.clientOriginatedRemotes`.
2. A `BuyUpgrade` carrying zero arguments, two arguments, a table, a number, `nil`, a 1,000,000-byte
   string, or a string that is not an `upgrades[].id` each produce: no change to `state.currency` or
   `state.upgrades`, no outbound packet, and no line in the server output.
3. `game/src/server` contains exactly one assignment to `Humanoid.WalkSpeed`
   (`init.server.luau:242`) and zero reads of it; `grep -rn "\.WalkSpeed" game/src/server` returns
   that one line and nothing else.
4. Two `RequestState` invokes with no intervening `StateChanged` for that player call
   `buildSnapshot` exactly once.

## Not decided here

Where the server measures a payout from, the step bound and the accumulator (sheet `01`, this
domain). What a crossed threshold does and what is recorded (sheet `03`, this domain). Accepted
messages or invokes per second on either remote, the burst allowance and the over-limit action at
the transport layer (`ingressLimits`, tech/networking). The snapshot's wire form and byte size
(`replication`, tech/networking). The purchase precondition values themselves — every `costBase`,
`costGrowth` and `maxLevel` (gameplay/balance). Session locking, and whether one player's state can
be live in two servers (tech/persistence). Whether `bridge/merge.mjs` grows a check that greps for
a `warn` on a client-controlled path (contract-and-seam work).
