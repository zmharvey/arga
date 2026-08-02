# 03 — Violation response and logging

**Domain:** tech/security · **Category:** Tech & Data · **Wave:** 5

## Decision

**Nothing is ever done to the player. There is no kick, no ban, no throttle, no rubber-band and no
cue — the entire response is a rate-capped server-side log record.** Five ladder tiers are fixed as
data, the fourth of which (`kick`/`ban`) is declared **absent from this game**, and the record's
nine fields and two caps are fixed with it. **No logging pipe exists in either contract**; this
sheet names the work that must own one and the interface it must accept, and builds none.

## Why

- **There is nothing left to punish, which is the argument and not a consolation.** Sheet `01`
  makes the ground swept per second identical for a teleporting client and a walking one, so the
  exploit's yield is **zero additional patches**, not a reduced one. A response ladder exists to
  remove a gain; with the gain at zero, every rung above "write it down" costs a false positive and
  buys nothing `[cid: decided]`.
- **Three contract keys forbid the rungs a builder would otherwise reach for.**
  `input.pressable.rejectionCueOnFailedPrecondition` is `"none"` and
  `input.verbs[buy].onPreconditionFail` is `silentNoOp`, so there is no player-facing rejection to
  show. `response.controlEverAffected` is `false` and `response.lockoutsSeconds` is `0`, so a
  server-side pull-back of the character is not an available default — it would have to be argued
  against that key, and this sheet does not argue for it. `response.negativeBeats` is `0`: there is
  no failure cue in the game to reuse.
- **A kick would be the game's only failure state, in a game whose failure state is deliberately
  zero.** *"There is no failure state. No death, no losing, no loss of progress"* and *"Zero tension
  is deliberate"* `[brief: soft]` ← `[you accepted: step 6 Q2]`. Being ejected from the server is the
  largest loss of progress a Roblox experience can inflict, and it would arrive with no explanation,
  because no cue is available.
- **The population makes false positives likely and expensive.** Roblox warns that "basic heuristics
  can flag innocent players with unstable connections" and that position updates require "averaging
  over time" `[research: https://create.roblox.com/docs/scripting/security/network-ownership]`; the
  audience is *"8–14, mobile-heavy, short sessions"* `[brief: binding]` ← `[you chose: R1 Q4]`. A
  bucket flag on a phone on a bad connection is the expected case, not the exception.
- **And an appeals surface is unfunded by construction.** *"Success is shipped artifacts, not
  players"* `[brief: binding]` ← `[you chose: R1 Q3]`. A ban with no appeal path in a game for
  children is a liability the project has no reason to take on.
- **An unrate-limited log is the second denial-of-service**, so the record carries its own caps. A
  flagged player produces a bucket crossing every few ticks under a sustained exploit; at 7.5 ticks
  a second across 16 players that is a write rate a sink can be drowned by. The caps are a drop, not
  a queue: a queue is the same problem deferred.
- **The record carries no player-authored string and no identifier but the subject's.** The only
  string on the whole client-originated surface is `BuyUpgrade`'s id, and **the rejected value is
  never logged** — a log field fed from a client argument makes the log a player-authored write
  target, which is the reason class behind `social.forbidden X9`. `channel` is drawn from sheet
  `02`'s closed six-name set. No `Player.Name`, no `DisplayName`, no second `UserId`, no neighbour's
  slot: `social.forbidden X7` keeps a second player's identifier off the wire and there is no reason
  to admit one here either.
- **The pipe is genuinely unowned and the honest move is to ship the shape without it.**
  `architect/05-interfaces` has 36 entries and none writes a log or an event; Analytics owns *what*
  to record and explicitly not how the pipe is built. So the record shape, the caps and the call
  site are fixed here, and the sink until a pipe exists is a rate-capped `warn`. That is not a
  contradiction of sheet `02`'s `warn` ban: `02` forbids an **uncapped** `warn` on a client-triggered
  path, and this one is capped at 10 per player-session and 60 per server-minute by the same key.

## Flagged to the developer

**The brief says nothing at all about response.** It never states whether this game kicks, bans,
throttles or does nothing, and `OPEN.md §1` records integrity as never asked and never confirmed.
The whole ladder below is `[cid: decided]`. The live alternatives, and my recommendation:

| option | what it costs | verdict |
|---|---|---|
| **log only, no player effect** | one no-op sink until a pipe exists | **recommended, and written below** |
| kick on sustained flag | a false positive ejects a child on a bad phone connection, with no message, in a game with no failure state | declined |
| ban on repeat evidence | an appeals surface nobody is funded to staff | declined |
| silent gameplay throttle | invents a degraded mode, and `response.controlEverAffected` is false | declined |

Reversing this is one field: `integrity.response.tiers[L4].exists` false → true, plus an evidence
rule and a threshold. Nothing else in either contract depends on it staying false.

```json
{
  "amends": "integrity",
  "value": {
    "response": {
      "principle": "the exploit's yield is zero once integrity.positionAuthority holds, so the response removes no gain and exists only to make the attempt visible to the developer",
      "playerEverAffected": false,
      "controlEverAffected": false,
      "cueEverShown": false,
      "throttledPlayerCanStillDo": "everything. There is no degraded mode, no reduced payout, no slowed tick, no suppressed readout and no restricted channel. A flagged player's session is indistinguishable from any other player's, from inside the game.",
      "tiers": [
        { "id": "L0", "name": "admitted",  "trigger": "a bounded message or a bounded step", "action": "nothing", "playerVisible": false, "record": false },
        { "id": "L1", "name": "clamped",   "trigger": "integrity.positionAuthority clamped the origin advance on this tick (d > advance)", "action": "charge the leaky bucket and nothing else", "playerVisible": false, "record": false, "note": "THIS IS THE NORMAL STATE OF EVERY LAGGING PLAYER and must never be treated as evidence on its own" },
        { "id": "L2", "name": "flagged",   "trigger": "bucketStuds > integrity.positionAuthority.constants.bucketCapacityStuds", "action": "subtract the capacity from the bucket, increment flagCount, emit one record of kind positionDeviation", "playerVisible": false, "record": true },
        { "id": "L3", "name": "sustained", "trigger": "flagCount for one UserId in one server session reaches sustainedFlagCount", "action": "emit one record of kind positionSustained, AT MOST ONCE PER SESSION, and change nothing about the player", "playerVisible": false, "record": true },
        { "id": "L4", "name": "kick or ban", "exists": false, "trigger": null, "action": null, "playerVisible": false, "record": false, "absentBecause": "the yield is zero (L2's own principle); no cue is available to explain it (input.pressable.rejectionCueOnFailedPrecondition \"none\"); the game has no failure state by design (02-GAMEPLAY.md, [you accepted: step 6 Q2]); the audience is 8-14 and mobile-heavy so false positives are the expected case; and no appeals surface is funded (00-CORE.md, [you chose: R1 Q3])" }
      ],
      "constants": [
        { "name": "sustainedFlagCount",              "value": 20, "unit": "flags per UserId per server session", "status": "playtest unknown", "testRange": [10, 100] },
        { "name": "inadmissiblePerChannelFlagCount", "value": 25, "unit": "inadmissible messages per channel per UserId per server session", "status": "playtest unknown", "testRange": [10, 200], "note": "a single inadmissible message is NEVER recorded: an ordinary client can produce one on a join race" }
      ],
      "forbidden": [
        "Player:Kick anywhere in game/src",
        "any ban list, ban store, ban check or ban field",
        "any reduction of payout, tick rate, radius, speed or channel access based on a flag",
        "any rubber-band, teleport-back, freeze, camera move or WalkSpeed write caused by a flag",
        "any player-facing message, toast, badge, colour change or sound caused by a flag",
        "telling a second player anything about a first player's flag — social.forbidden X7"
      ]
    },
    "logging": {
      "pipeExists": false,
      "pipeExistsNote": "architect/05-interfaces carries 36 entries and none writes a log or an event. Analytics owns WHAT to record and explicitly not how the pipe is built. The pipe is unowned and this sheet does not build one.",
      "record": {
        "fieldCount": 9,
        "fields": [
          { "name": "v",              "type": "integer", "value": 1, "note": "record version, so a later shape change is readable" },
          { "name": "kind",           "type": "string",  "enum": ["positionDeviation", "positionSustained", "channelInadmissible", "overflow"] },
          { "name": "subject",        "type": "integer", "note": "the subject's UserId. THE ONLY IDENTIFIER IN THE RECORD." },
          { "name": "at",             "type": "integer", "note": "os.time(), whole seconds, server clock" },
          { "name": "jobId",          "type": "string",  "note": "game.JobId. A SERVER identifier, not a player one; it exists so a burst can be correlated to one server." },
          { "name": "bucketStuds",    "type": "integer", "note": "the accumulator at emit, rounded. Zero for a channelInadmissible or overflow record." },
          { "name": "ticksClamped",   "type": "integer", "note": "L1 occurrences for this subject since the last re-anchor" },
          { "name": "effectiveSpeed", "type": "number",  "note": "modifiers.effective(state, \"speed\") at emit, to 2 decimal places. It is what the bound was computed from, so a record is readable without the manifest." },
          { "name": "channel",        "type": "string?", "note": "one of integrity.channels[].id and NOTHING ELSE, or null for a position record. Drawn from the closed six-name set, never from a message argument." }
        ],
        "forbiddenFields": [
          "any argument value a client sent, including the rejected BuyUpgrade string",
          "Player.Name, Player.DisplayName or any account handle",
          "any UserId but the subject's — social.forbidden X7",
          "any player-authored string at all — the reason class behind social.forbidden X9",
          "a position, a CFrame or a plot slot",
          "a stack trace, a script name or a source line"
        ]
      },
      "caps": {
        "maxRecordsPerPlayerPerSession": { "value": 10, "status": "playtest unknown", "testRange": [5, 50] },
        "maxRecordsPerServerPerMinute":  { "value": 60, "status": "playtest unknown", "testRange": [20, 300] },
        "overCapAction": "DROP. Never queue and never buffer: a queue is the same denial-of-service deferred.",
        "overflowRecord": "one record of kind overflow per server session, carrying only the count of drops in bucketStuds' slot and null channel",
        "why": "an unrate-limited log is the second denial-of-service. At 7.5 ticks per second across runtime.maxPlayers 16, a sustained exploit crosses the bucket often enough to drown any sink."
      },
      "sinkUntilPipeExists": {
        "what": "a module-local function inside clearing that emits one warn per record, subject to the caps above",
        "why": "the record shape, the caps and the call site ship now; connecting a real pipe is one function body. Building the record and discarding it silently would leave the developer with no evidence at all.",
        "notAContradictionOf02": "integrity.channels[].onInadmissible forbids an UNCAPPED warn on a client-controlled path (init.server.luau:447). This one is capped by maxRecordsPerPlayerPerSession and maxRecordsPerServerPerMinute, so a client cannot fill it on demand."
      },
      "pipeRequest": {
        "kindOfWorkThatMustOwnIt": "event-transport work — currently unowned. The nearest holders are Analytics (wave 5) for the event schema and tech/deploy for the operational side; neither owns the transport today and one of them must, or this record has nowhere to go.",
        "interfaceItMustAccept": "log(record: table) -> nil",
        "requirementsOnIt": [
          "MUST NOT YIELD. It is called from inside clearing.tick, which runs 7.5 times a second per player.",
          "MUST NOT ERROR. An error inside the tick is caught by Clearing.luau:487's xpcall and skips a whole player's pass.",
          "must drop rather than buffer without bound, and must not retry inside the tick",
          "must not write to a DataStore: OrderedDataStore is banned by social.forbidden X8, and any DataStore write inside the tick spends a budget tech/persistence's save loop owns",
          "must accept the record verbatim and add no field of its own that names a player",
          "must be a no-op that returns immediately when no transport is configured"
        ],
        "notBuiltHere": true
      }
    }
  }
}
```

## Consequences for other work

- **Event and instrumentation work (Analytics — Events / KPIs, wave 5):** you own what is recorded
  and you now have one more record kind to place or decline. **You do not own the transport, and
  nobody does.** If you also decline it, that is a finding, not a gap this sheet can close.
- **Publish and operations work (`release`, tech/deploy):** the interim sink is a `warn`, so
  integrity evidence appears in the live server output and nowhere else. If a log destination is
  ever configured, it arrives through `log(record)` and through no other path.
- **Clearing-module work (`architect`, `02-modules`) — a second revision request beside sheet
  `01`'s:** `clearing` gains a module-local record builder, a per-player counter and a sink
  function. No `PlayerState` field, no `interfaces` entry, no yield, no DataStore.
- **Feedback and beat work (`response`, gameplay/mechanics; Audio; UI/UX — Feedback):** **you owe
  nothing.** There is no violation cue, no rejection state, no failure sound and no negative beat to
  design, at any tier, ever. `response.negativeBeats` stays 0.
- **Purchase-surface work (UI/UX — Store):** a dropped `BuyUpgrade` and an accepted one are
  indistinguishable to the client by construction. Do not build a "purchase failed" affordance to
  cover it; `input.verbs[buy].onPreconditionFail` already ruled that out and this sheet does not
  reopen it.
- **Rate-ceiling work (`ingressLimits`, tech/networking):** your over-limit action and my
  `inadmissiblePerChannelFlagCount` are different things. Yours decides which messages the server
  looks at; mine decides when a pattern of dropped ones is written down. Neither is a substitute for
  the other.

## Acceptance criteria

1. `integrity.response.tiers` has exactly 5 rows; `L4.exists` is `false`; and no row has
   `playerVisible: true`.
2. `grep -rn ":Kick(\|BanAsync\|banList" game/src` returns nothing.
3. A log record contains exactly the 9 named fields and no others, and no field's value is derived
   from any argument a client sent — in particular, a rejected `BuyUpgrade` string appears in no
   record.
4. Driving 10,000 bucket crossings for one player inside one minute produces at most
   `maxRecordsPerPlayerPerSession` (10) records plus at most one `overflow` record.

## Not decided here

Where the server measures a payout from, the step bound, the accumulator and every constant it
carries (sheet `01`, this domain). What each channel accepts and what a single inadmissible message
does (sheet `02`, this domain). **How the logging pipe is built, who owns it, what transport it
uses and whether one is built at all** — named above as event-transport work and left unowned
rather than assumed. Which integrity events, if any, are instrumented and at what pass mark
(Analytics — Events and KPIs, wave 5). Accepted messages per second and the transport-layer
over-limit action (`ingressLimits`, tech/networking). Session locking and what two live sessions for
one player would do (tech/persistence). Whether `Player:Kick` is ever reinstated — flagged above as
the developer's call, and one field to reverse.
