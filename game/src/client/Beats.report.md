# Build report — beats

**Module:** `game/src/client/Beats.luau`. Exposes `connect(gui): (Snapshot?) -> ()`.
Four channels connected by reading `Protocol.REMOTES[].handledBy`; a rank-ordered queue with
a `minOnsetGapSeconds` floor drains on `RunService.Heartbeat`; `patchClear` rides the updater
off a rise in `snapshot.clearedCount`. Five cue bodies, all empty, in one `CUES` table.

**Analysis.** `luau-analyze` on the file as written reports 22 diagnostics, every one of the
known class this repo's other client modules report: `Unknown global 'game'`/`'warn'`,
`Unknown type 'ScreenGui'`/`'RemoteEvent'`, `unsupported path` on the two instance requires,
and three `unknown` propagations downstream of those requires. There is no `--defs` flag on
this build and no Roblox definitions file in the repo, so to get a real signal I analysed a
copy whose header is replaced by a stub Roblox surface plus a stub `Protocol` and the **real,
verbatim `GameConfig.Response` block lifted out of the generated file** — the heterogeneous
five-row `beats` array included, since that is what the row-narrowing in `readBeats` exists to
survive. `luau-analyze --mode=strict` on that copy reports **nothing at all**. One genuine
error was found and fixed that way (`string.match` returns `...string`, which is not
`string?`; the return is parenthesised).

---

## Stops

1. **The coincident order of `upgradePurchased` is stated twice, differently, and the two
   statements disagree.** `response.sequencedBeats` is
   `[upgradePurchased, findReveal, setComplete, areaComplete]` and carries a
   `sequenceOrderOwner` naming a sheet, which reads as an authored order. `response.beats[].rank`
   is `findReveal 1, setComplete 2, areaComplete 3, upgradePurchased 4`. The two agree on
   everything except `upgradePurchased`, which is **first** under one and **last** under the
   other. I implemented rank, because the module's own acceptance criteria name it twice
   ("the ordering of two queued beats follows response.beats[].rank, lowest first" and "play
   in rank order"), and because nothing in the brief ever assigns a meaning to the array's
   order. A builder reading `sequencedBeats` as the order gets the opposite result for one
   real pair: buy an upgrade while walking into a Find and the purchase cue either precedes
   or follows the reveal, 600 ms apart. Changing sides is changing `compareQueued` and
   nothing else. **Needed:** one sentence saying which of the two is the queue order, or a
   `sequencedBeats` array reordered to match rank.

2. **Whether the 0.6 s gap applies when the queue emptied in between.** "Must not: delaying a
   lone sequenced beat … a beat with nothing queued ahead of it plays immediately, and the
   gap only applies between two" against acceptance criterion 1, "two sequenced beats never
   begin closer together than `minOnsetGapSeconds`", which carries no qualifier. A beat
   arriving 0.3 s after an onset with an empty queue satisfies the first and violates the
   second. I implemented **gap-always**: the gap is a property of two consecutive onsets, and
   "plays immediately" means nothing is held back on purpose. The other reading puts two
   onsets 0.3 s apart, which a player hears. **Needed:** whether the gap is a property of the
   onset stream or only of a queue with two things in it.

3. **`minOnsetGapSeconds` (0.6) is larger than every `acknowledgmentBudgetMs` in the table
   (200 / 300 / 400).** Any beat that waits behind exactly one other necessarily misses its
   own budget. The worst real case is a Find revealed by the same clear that finishes the
   area: `areaComplete` begins 600 ms after its packet against a 400 ms budget, a 50%
   overrun, every single time an area ends on a Find. Criterion 2 qualifies the budget to a
   lone beat, so I treated the gap as dominant and did **not** warn or shorten anything. But
   nothing states what a blown budget means, and the two numbers cannot both hold under
   coincidence at any value in `minOnsetGapTestRangeSeconds` ([0.35, 0.9]) — even 0.35 blows
   `upgradePurchased`'s 200 ms. **Needed:** a statement from Balance & Tuning that the gap
   wins, or a budget that is defined only for a lone beat and named as such in the contract
   rather than only in this module's criteria.

4. **`patchClear` names `atPatch` among its channels while `channelExclusivity` gives
   `atPatch` to `findReveal`.** Those two cannot both be enforced: eight overlapping
   `patchClear` onsets a second are themselves two beats on one exclusive channel, so a
   literal mutex on `atPatch` would break `minSustainedOnsetsPerSecond` and `onOverload:
   overlap` at the same time. I read exclusivity as governing the **sequenced four**, where
   the 0.6 s gap makes it structurally true, and exempted `patchClear` from the check (the
   exemption is commented in `checkContract` rather than silent). What is genuinely unanswered
   is player-visible the moment a cue exists: during a reveal's 2.5 s `dwellSeconds` on
   `atPatch`, is the clear cue suppressed, does the reveal displace it, or do both play at the
   same world point? **Needed:** either `patchClear` off `atPatch`, or a stated interaction
   between an unsequenced beat and an exclusive channel's owner.

5. **How many `patchClear` onsets a snapshot whose `clearedCount` rose by k should produce.**
   The tick clears every patch inside the radius in one pass and sends one snapshot, so k is
   routinely greater than 1 and grows with the Reach upgrade. `minSustainedOnsetsPerSecond: 8`
   counts *clears*, so I emit **k onsets, all beginning in the same frame** (`onOverload` is
   "overlap"). One-onset-per-snapshot is the other defensible reading and produces visibly
   fewer cues at a wide Reach, which is exactly backwards for an upgrade whose whole promise
   is clearing more at once. **Needed:** whether a `patchClear` onset is per patch or per
   tick, and — if per patch — whether k simultaneous onsets stagger. There is no stagger value
   anywhere; `residueLifetimeSeconds` (0.4) is a lifetime, not an offset.

6. **What the updater does with the first snapshot it ever sees.** A returning player's join
   snapshot carries a `clearedCount` of, say, 130. Read as a rise from nothing, that is 130
   onsets at the join frame. I made the first snapshot establish a **baseline** and emit
   nothing, which is the same shape of rule as "a finished bay has no patch record, so
   clearing cannot pay for it twice". Nothing in the contract says the updater has a baseline,
   and the naive reading is reachable. **Needed:** one line saying a rise is measured against
   the previous snapshot and that the first has no predecessor.

---

## Decided without a stated value

**Timing and the clock**

1. `RunService.Heartbeat` is the scheduler's clock, and a queued beat is dispatched on the
   Heartbeat **after** arrival rather than inside the `OnClientEvent` handler. This is forced
   by criterion 6 — two packets fired in one server tick arrive in one client frame, and if
   the first to be delivered plays on arrival then Roblox's delivery order decides the
   coincident case, not rank. Deferring to the end of the frame is the smallest window that
   makes rank decide. Nothing states the window; one frame is what I chose, and it costs a
   lone beat up to ~17 ms against a 200 ms budget.
2. `os.clock()` as the time source, not `tick()`, `time()`, `DateTime` or an accumulated
   Heartbeat delta.
3. One sequenced onset per frame at most. The 0.6 s gap makes this indistinguishable from
   "as many as the gap allows", but it is a choice.
4. `table.sort` over the whole queue at drain time rather than an ordered insert. n is at most
   a handful; the cost is invisible and the comparator is readable in one place.
5. Arrival-sequence tiebreak for two beats of equal rank. No two of the four share a rank
   today, but two `FindRevealed` packets in one tick (two Finds cleared by one sweep) are two
   instances of one rank, and they go FIFO. `table.sort` is not stable, so the tiebreak is
   load-bearing rather than decorative.
6. Two coincident `findReveal`s play **twice, 0.6 s apart**, and are not merged, collapsed or
   deduplicated. Nothing says a beat is idempotent within a window.
7. A queued beat is dispatched even when its own budget is already blown. `onOverload` is not
   "drop", so there is no expiry and no staleness test.
8. No cap on queue length. It is bounded in practice at roughly 3 reveals per area plus a set,
   an area and a purchase, but nothing enforces it.
9. A reveal's 2.5 s `dwellSeconds` does **not** gate the queue. Only the 0.6 s gap does, so a
   `setComplete` can begin 0.6 s into a reveal's dwell. Nothing says a dwell is exclusive.

**The cue seam**

10. Its shape: five module-local functions in a `CUES` table keyed by beat id, each handed one
    `Onset` record. A signal per beat, a handler table hung off the returned module, or one
    function with a switch would all satisfy "the bodies are empty" equally well.
11. The `Onset` record's fields — `beat`, `channel`, `args`, `gui`, `arrivedAt`, `beganAt`,
    `latencySeconds`. `latencySeconds` exists only so criterion 2 is measurable from inside a
    cue; nobody asked for it.
12. `dwellSeconds`, `residueLifetimeSeconds` and `acknowledgmentBudgetMs` are carried into the
    seam on `onset.beat` and are otherwise unused by the scheduler, so that the first cue
    written reads its lifetime from config instead of picking one.
13. `payoutBudgetMs` (250, `patchClear`) is read into `BeatSpec`'s source row and then ignored:
    it describes when the Shard readout moves, which is `hud-binding`'s tween, not this
    module's. Nothing states which module owns that budget.
14. Payload arity and meaning per channel are prose in `Protocol.REMOTES[].payload`. I pass the
    raw varargs through as `args: { any }` rather than typing a signature per channel,
    precisely so this file does not hold a second copy of the channel→payload mapping. The
    meanings are restated in one comment block on the `Onset` type.
15. A `pcall` around every cue invocation, warning **once per beat id**. It cannot fire today
    (the bodies are empty). It is there because a `patchClear` onset runs inside client-main's
    snapshot fan-out, where an unhandled error would take the HUD's updater down with it, and
    because eight onsets a second would otherwise be a wall of identical warnings.

**Reading the contract**

16. The `handledBy` pattern is `"^beats, as response%.beats%[(%w+)%]"`. It matches the shipped
    `Protocol.luau` string and the longer annotated form the build pack quotes. A channel whose
    `handledBy` is reworded silently stops being connected, except that `checkContract` then
    warns that the beat has no channel.
17. Candidate channels are also filtered on `direction == "server -> client"`.
18. `Protocol.channel(name)` is cast to `RemoteEvent` with no branch on `REMOTES[].class`. All
    four beat channels are RemoteEvents and a RemoteFunction has no `OnClientEvent` to connect;
    a re-emit that changed one would error at connect rather than warn.
19. `readBeats` copies each config row into a narrow `BeatSpec` instead of holding a reference,
    because the five rows are not uniform (only `findReveal` has a dwell, only `patchClear` a
    residue) and a narrow record is what the rest of the file can be typed against.
20. `channelExclusivity` is written two ways — `atPatch` is a bare string, `notice` is a list —
    and both are normalised to a list by `exclusiveOwners`.
21. Which consistency checks exist at all, and that they are **warn-only and never change
    behaviour** (matching `HudBinding.checkSnapshotShape`): a channel naming a beat that does
    not exist, a sequenced beat with no channel, a sequenced beat whose `queued` is false, a
    beat listing one channel in both `channels` and `forbiddenChannels`, a sequenced beat on an
    exclusive channel it does not own, and `clearedCount` still being in `snapshotShape()`.
    None was requested. All the wording is mine.
22. `queued` on the beat row, not membership of `sequencedBeats`, is the operative flag for
    whether a beat waits. The two are cross-checked and disagreement warns.

**The updater**

23. `snapshot == nil` returns silently, as `HudBinding`'s updater does. A non-number
    `clearedCount` also returns silently rather than warning.
24. `math.floor` on the rise; a rise of zero or less is silent. A **fall** in `clearedCount`
    (the tick zeroes it when an area finishes) re-baselines and emits nothing — an area ending
    is `areaComplete`'s business.
25. The updater derives no other beat from the snapshot, though `found`, `areasFinished` and
    `upgrades` would each let it. The four channels are the only causes of the sequenced four.
26. `Beats.Snapshot` declares only `clearedCount`, the one field read, rather than all eight of
    `snapshotShape()`. That means the client now holds **two different partial `Snapshot`
    types** (this one and `HudBinding`'s five-field one) and neither is generated, while
    `Types.luau` generates `PlayerState` and `StoredState` but no snapshot type at all. Noted
    rather than stopped for, because it is static-only.

**Lifetime, naming, shape**

27. Nothing is disconnected and no teardown handle is returned; `connect(gui)` returns only the
    updater, per the interface. Calling it twice would install a second scheduler and duplicate
    every beat — there is no guard, matching `HudBinding.bind`, which also has none.
28. `gui` is held, handed to every cue, and never written to. Nothing in the contract asks this
    module to set a screen-level property, so nothing is set.
29. Iteration over `Protocol.REMOTES` is a `pairs` loop, so connection order is undefined.
    Nothing depends on it, because dispatch order is decided at drain time — which is the
    second reason the Heartbeat coalescing is not optional.
30. Local names: `queue`, `pending`, `arrivals`, `lastOnsetClock`, `cueFaulted`, `head`, `rise`,
    `specs`, `handled`, `fed`. `head` rather than `next`, to avoid shadowing the global.
31. Warn prefix `"[Beats]"`, matching `"[HudBinding]"`. Every warning string is mine.
32. Exported types `Snapshot`, `Updater`, `BeatSpec`, `Onset`. Only `connect` is required.
33. The `--============` section rules, the header comment's length, and the decision to state
    each prohibition in the file next to the code that honours it.

---

## Assumed about a dependency

1. **`Protocol.channel(name)` may yield on its first call** (it `WaitForChild`s the remotes
   Folder once and caches it), so `Beats.connect` can yield during client-main's boot step 6.
   Checked against the shipped `Protocol.luau`, which the brief permits me to read for
   signatures.
2. `Protocol.REMOTES` is a map keyed by channel name whose values carry `direction` and
   `handledBy` in the exact wording the pattern in item 16 expects. Verified in the shipped
   file: `"beats, as response.beats[findReveal]"` and its three siblings.
3. `Protocol.snapshotShape()` includes `clearedCount`. Verified; also checked at runtime.
4. `GameConfig.Response` is emitted whole under that name, with `beats`, `minOnsetGapSeconds`,
   `sequencedBeats` and `channelExclusivity`. Verified against the generated file.
5. **client-main calls `connect(gui)` exactly once**, after the ScreenGui exists, and feeds the
   returned updater every snapshot from both `StateChanged` and the `RequestState` reply. If it
   feeds only one of the two, the baseline forms on whichever arrives first and nothing else
   changes.
6. `snapshot.clearedCount` is the live area's count and is zeroed by the tick when an area
   finishes, per `stateShape`. A fall is therefore expected, not an error.
7. `clearing` fires `FindRevealed` before `AreaRestored` within one tick (its step 3 precedes
   its step 4). **Nothing in this module depends on that** — the drain re-orders by rank — which
   is the point of doing it at drain time.
8. No other client module connects `OnClientEvent` on these four channels. `Protocol.handledBy`
   names `beats` as the sole receiver of each.
9. `UpgradeApplied` carries `(upgradeId, newLevel)` and the other three carry one string each.
   Taken from `Protocol.REMOTES[].payload`, which is prose; this module never indexes `args`,
   so a wrong assumption here costs nothing until a cue body is written.

**One defect observed in a dependency, not fixed** (per "do not fix a problem you find in a
dependency"): `HudBinding.luau` lists `areaComplete` in its `FIELDS_READ` and its `Snapshot`
type, but `Protocol.snapshotShape()` names `areaPatchCount` and `areaLabel` and no
`areaComplete`. `HudBinding.checkSnapshotShape` will therefore `warn` once at every client
boot about a field its updater never actually reads. Cosmetic — a warning, not a wrong
readout — but it is the check firing on itself.
