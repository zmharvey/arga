# 03 — Violation response and logging

**Domain:** tech/security · **Category:** Tech & Data · **Wave:** 5

## Decision

**No integrity tier ever does anything to the player. There is no kick, no ban, no throttle, no
rubber-band and no cue — the entire response is a rate-capped log record.** Five ladder tiers are
fixed as data, the fourth of which (`kick`/`ban`) is declared **absent from this game**, and the
record's nine fields and two caps are fixed with it. **No logging pipe exists in either contract**;
this sheet names the work that must own one, the single interface it must accept, and builds none.

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
  server-side pull-back of the character is not an available default. `response.negativeBeats` is
  `0`: there is no failure cue in the game to reuse.
- **A kick would be the game's only failure state, in a game whose failure state is deliberately
  zero.** *"There is no failure state. No death, no losing, no loss of progress"* and *"Zero tension
  is deliberate"* `[brief: soft]` ← `[you accepted: step 6 Q2]`. Being ejected is the largest loss a
  Roblox experience can inflict, and it would arrive with no explanation, because no cue is
  available.
- **But the prohibition is on *punishment*, not on the verb**, and the first draft got that wrong.
  It forbade `Player:Kick` anywhere in `game/src` and greped for it globally, which makes
  `persistence/01`'s `staleSession.releaseMechanism` unbuildable — a kick after three consecutive
  `readFailed` passes, which exists to stop a player being written to the store at zero. That is a
  **data-integrity release, not a response to a flag**, and its AC3 requires exactly one such call.
  The row is narrowed to integrity-caused kicks and the criterion is scoped to the integrity path,
  so both sheets are now satisfiable at once. `networking/02`'s `I3` has the identical over-broad
  observable; three of us wrote one prohibition three times without seeing each other.
- **The population makes false positives likely and expensive.** Roblox warns that "basic heuristics
  can flag innocent players with unstable connections" and that position updates require "averaging
  over time" `[research: https://create.roblox.com/docs/scripting/security/network-ownership]`; the
  audience is *"8–14, mobile-heavy, short sessions"* `[brief: binding]` ← `[you chose: R1 Q4]`. A
  bucket flag on a phone on a bad connection is the expected case, not the exception. And an appeals
  surface is unfunded by construction: *"Success is shipped artifacts, not players"*
  `[brief: binding]` ← `[you chose: R1 Q3]`.
- **`os.time()` is not needed here and is dropped.** The record's timestamp is a wall-clock instant
  rather than a duration, so `workspace:GetServerTimeNow()` serves it exactly and is the clock
  `sessionLock` already established as permitted in this build `[research: cid/tech/persistence/02-session-locking.md]`.
  That removes this sheet from the `os.*` escalation entirely: **sheet `01`'s RR-S1 now covers one
  use rather than two**, and it is the one where a monotonic reading is genuinely required.
- **An unrate-limited log is the second denial-of-service**, so the record carries its own caps. At
  7.5 ticks a second across 16 players a sustained exploit crosses the bucket often enough to drown
  any sink. The caps are a drop, not a queue: a queue is the same problem deferred.
- **The record carries no player-authored string and no identifier but the subject's.** The only
  string on the client-originated surface is `BuyUpgrade`'s id, and **the rejected value is never
  logged** — a log field fed from a client argument makes the log a player-authored write target,
  which is the reason class behind `social.forbidden X9`. `channel` is drawn from sheet `02`'s
  closed six-name set.
- **The sink has one home and it needed an interface entry.** Two of the four record kinds
  originate in `server-main`'s remote handlers and two in `clearing.tick`, and the caps are per
  player *and per server*, so two sinks would mean two counters and a meaningless server-wide cap.
  `server-main` is `init.server.luau`, a `Script` and not a `ModuleScript`, so the dependency only
  runs one way: **`clearing` exposes `log(record)` and `server-main` calls it.** RR-S2 below.

## Flagged to the developer

**The brief says nothing at all about response.** It never states whether this game kicks, bans,
throttles or does nothing, and `OPEN.md §1` records integrity as never asked and never confirmed.
The whole ladder below is `[cid: decided]`. The live alternatives, and my recommendation:

| option | what it costs | verdict |
|---|---|---|
| **log only, no player effect** | one `log(record)` call site and a `warn` until a pipe exists | **recommended, and written below** |
| kick on sustained flag | a false positive ejects a child on a bad phone connection, with no message, in a game with no failure state | declined |
| ban on repeat evidence | an appeals surface nobody is funded to staff | declined |
| silent gameplay throttle | invents a degraded mode, and `response.controlEverAffected` is false | declined |

Reversing this is one field: `integrity.response.tiers[L4].exists` false → true, plus an evidence
rule and a threshold. Nothing else in either contract depends on it staying false.

## Revision request issued

**RR-S2 · `architect/sheets/05-interfaces.md` and `architect/sheets/02-modules.md`.** Add one entry:
`clearing.log(record)`, server-only, non-yielding, returning nil, and add `log` to `clearing`'s
`exposes` list. `server-main` is the second caller and needs no export of its own.
**This narrows a claim sheet `01` makes and I am naming it rather than letting it be inferred:**
`01` states that `positionAuthority` needs no new `interfaces` entry, no thirteenth `PlayerState`
field and no `onLeave` hook. All three were re-verified and all three hold — **for that key.** They
were never claims about `integrity.logging`, and this sheet does not stretch them: **logging needs
exactly one entry, and this is it.** No `PlayerState` field and no `onLeave` hook are added by this
sheet either; the per-player record count lives in the same module-local table `01` already
specifies, under its existing `flagCount` field.

```manifest
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
        { "id": "L2", "name": "flagged",   "trigger": "bucketStuds > integrity.positionAuthority.constants.bucketCapacityStuds", "action": "subtract the capacity from the bucket, increment flagCount, call clearing.log once with a positionDeviation record", "playerVisible": false, "record": true },
        { "id": "L3", "name": "sustained", "trigger": "flagCount for one UserId in one server session reaches sustainedFlagCount", "action": "call clearing.log once with a positionSustained record, AT MOST ONCE PER SESSION, and change nothing about the player", "playerVisible": false, "record": true },
        { "id": "L4", "name": "kick or ban", "exists": false, "trigger": null, "action": null, "playerVisible": false, "record": false, "absentBecause": "the yield is zero; no cue is available to explain it (input.pressable.rejectionCueOnFailedPrecondition \"none\"); the game has no failure state by design (02-GAMEPLAY.md, [you accepted: step 6 Q2]); the audience is 8-14 and mobile-heavy so false positives are the expected case; and no appeals surface is funded (00-CORE.md, [you chose: R1 Q3])" }
      ],
      "constants": [
        { "name": "sustainedFlagCount",              "value": 20, "unit": "flags per UserId per server session", "status": "playtest unknown", "testRange": [10, 100] },
        { "name": "inadmissiblePerChannelFlagCount", "value": 25, "unit": "inadmissible messages per channel per UserId per server session", "status": "playtest unknown", "testRange": [10, 200], "note": "a single inadmissible message is NEVER recorded: an ordinary client can produce one on a join race" }
      ],
      "forbidden": [
        {
          "rule": "no Player:Kick, ban, disconnect or connection close caused by an integrity flag or by ANY integrity.response tier",
          "scope": "the integrity path only — clearing's tick, clearing.log, and the over-limit branch of either remote handler",
          "explicitlyExcluded": "persistence/01 staleSession.releaseMechanism's Kick after three consecutive readFailed passes. That is a DATA-INTEGRITY RELEASE, not a response to a flag: it exists so a player whose payload could not be read is not written to the store at zero, and persistence/01 AC3 requires exactly one such call. This row does not reach it.",
          "supersedes": "the first draft's 'Player:Kick anywhere in game/src', which made that release unbuildable and which networking/02 I3 repeats"
        },
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
          { "name": "subject",        "type": "integer", "note": "the subject's UserId. THE ONLY PLAYER IDENTIFIER IN THE RECORD." },
          { "name": "at",             "type": "integer", "note": "math.floor(workspace:GetServerTimeNow()), whole epoch seconds. NOT os.time(): that name is matched by architect/01-runtime AC3 and performance/03 N10, and a timestamp is an instant rather than a duration, so the synchronised clock sessionLock already established is exactly right here. This sheet therefore rides no clock escalation; only security/01's elapsed-time read does." },
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
        "counterStorage": "the per-player count reuses integrity.positionAuthority.storage's flagCount slot in clearing's module-local table; the per-server-per-minute count is one module-local integer and one window start. NO PlayerState FIELD AND NO onLeave HOOK.",
        "why": "an unrate-limited log is the second denial-of-service, and it is reachable from a client-controlled path."
      },
      "sink": {
        "one": true,
        "whyNotTwo": "the caps are per player per session AND per SERVER per minute. Two sinks means two independent counters and the server-wide cap becomes unenforceable.",
        "home": "clearing",
        "whyClearingAndNotServerMain": "server-main is init.server.luau, a Script rather than a ModuleScript, so it can expose nothing to clearing; the dependency runs one way only. clearing already owns the accumulator, flagCount and three of the four record kinds, and server-main already requires it.",
        "interfacesEntryRequired": true,
        "revisionRequest": "RR-S2 — add clearing.log(record) to architect/05-interfaces and to clearing's exposes list in architect/02-modules",
        "entry": {
          "module": "clearing",
          "fn": "log(record)",
          "params": [{ "name": "record", "type": "table", "note": "exactly the nine fields of logging.record.fields, already built by the caller. log validates nothing and adds nothing." }],
          "returns": "nil",
          "serverOnly": true,
          "note": "MUST NOT YIELD and MUST NOT ERROR: it is called from inside clearing.tick, which runs 7.5 times a second per player, and an error there is swallowed by Clearing.luau:487's xpcall and skips a whole player's pass. Applies both caps, then hands the record to whatever transport is configured, or to the interim sink below when none is."
        },
        "callers": [
          { "module": "clearing",    "kinds": ["positionDeviation", "positionSustained"], "site": "inside tick, at the L2 and L3 transitions" },
          { "module": "server-main", "kinds": ["channelInadmissible"],                     "site": "the over-limit branch of the BuyUpgrade and RequestState handlers, on crossing inadmissiblePerChannelFlagCount" }
        ],
        "narrowsWhichEarlierClaim": "security/01 states positionAuthority needs no new interfaces entry, no thirteenth PlayerState field and no onLeave hook. All three were re-verified and all three still hold FOR THAT KEY. They were never claims about integrity.logging. Logging needs exactly one interfaces entry and still needs neither of the other two."
      },
      "sinkUntilPipeExists": {
        "what": "clearing.log's body emits one warn per admitted record and returns",
        "why": "the record shape, the caps and both call sites ship now; connecting a real pipe is one function body and no call site moves. Building the record and discarding it silently would leave the developer with no evidence at all.",
        "notAContradictionOf02": "integrity.channels[].onInadmissible forbids an UNCAPPED warn on a client-controlled path (init.server.luau:447). Every warn here is behind maxRecordsPerPlayerPerSession and maxRecordsPerServerPerMinute, so a client cannot fill it on demand."
      },
      "pipeRequest": {
        "kindOfWorkThatMustOwnIt": "event-transport work — currently unowned. The nearest holders are Analytics (wave 5) for the event schema and tech/deploy for the operational side; neither owns the transport today and one of them must, or this record has nowhere to go. serverCost.instrumentOwner and persistence.observability.pipe name the same gap from two other sides: three domains reached 'nobody owns this' independently, and it is one finding.",
        "interfaceItMustAccept": "the body of clearing.log(record), replaced. No call site changes.",
        "requirementsOnIt": [
          "MUST NOT YIELD and MUST NOT ERROR, for the reasons on the interfaces entry above",
          "must drop rather than buffer without bound, and must not retry inside the tick",
          "must not write to a DataStore: social.forbidden X8 bans OrderedDataStore, and any DataStore write inside the tick spends a budget persistence's save loop owns",
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

- **Module and interface work (`architect`, `02-modules` / `05-interfaces`):** RR-S2 above — one
  entry, `clearing.log(record)`. This is the **only** `interfaces` addition either of my sheets
  asks for, and sheet `01`'s "no new entry" claim is scoped to `positionAuthority` accordingly.
- **Save-write work (`persistence/01`):** your `staleSession.releaseMechanism` kick is named in my
  `forbidden` row as explicitly excluded, and my AC2 no longer greps `game/src` globally. Your AC3
  ("exactly one `Player:Kick`") and my criteria are now simultaneously satisfiable. **No change is
  owed by you.**
- **Ingress-limit work (`ingressLimits`, tech/networking):** your `I3` observable has the same
  over-broad global grep and is unsatisfiable against the same `persistence/01` AC3. The narrowing
  that works is the one above: scope the observable to the over-limit branch of either handler. And
  my `inadmissiblePerChannelFlagCount` is not your over-limit action — yours decides which messages
  the server looks at, mine decides when a pattern of dropped ones is written down.
- **Runtime and optimisation-limit work (`architect/01-runtime`, `performance/03`):** this sheet no
  longer contributes to the `os.*` escalation. `workspace:GetServerTimeNow()` satisfies both greps
  as written, so **RR-S1 covers one use, not two.**
- **Event and instrumentation work (Analytics — Events / KPIs, wave 5):** you own what is recorded
  and now have one more record kind to place or decline. **You do not own the transport, and nobody
  does.** If you also decline it, that is one finding shared with `serverCost` and `persistence`.
- **Feedback and beat work (`response`, gameplay/mechanics; Audio; UI/UX — Feedback):** **you owe
  nothing.** There is no violation cue, no rejection state and no negative beat to design, ever.

## Acceptance criteria

1. `integrity.response.tiers` has exactly 5 rows; `L4.exists` is `false`; and no row has
   `playerVisible: true`.
2. `grep -n ":Kick(\|BanAsync\|banList" game/src/server/Clearing.luau` returns nothing, and the only
   `:Kick(` anywhere in `game/src` is `persistence/01`'s stale-session release in `server-main` —
   one call, which is what that sheet's AC3 requires.
3. A log record contains exactly the 9 named fields and no others, and no field's value is derived
   from any argument a client sent; in particular a rejected `BuyUpgrade` string appears in no
   record.
4. Driving 10,000 bucket crossings for one player inside one minute produces at most
   `maxRecordsPerPlayerPerSession` (10) records plus at most one `overflow` record, and
   `clearing.log` is the only function any of them passes through.

## Not decided here

Where the server measures a payout from, the step bound, the accumulator and every constant it
carries (sheet `01`, this domain). What each channel accepts and what a single inadmissible message
does (sheet `02`, this domain). **What transport `clearing.log`'s body eventually calls, who owns
it, and whether one is ever built** — named above as event-transport work and left unowned rather
than assumed. Which integrity events are instrumented and at what pass mark (Analytics — Events and
KPIs, wave 5). Accepted messages per second and the transport-layer over-limit action
(`ingressLimits`, tech/networking). The stale-session release rule, its threshold and its kick
string (`persistence/01`; I exclude it and do not shape it). Session locking (tech/persistence).
Whether `Player:Kick` is ever reinstated as a *response* — flagged above, one field to reverse.
