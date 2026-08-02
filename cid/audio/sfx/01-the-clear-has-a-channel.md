# 01 — The clear has a channel

**Domain:** SFX · **Category:** Audio · **Wave:** 6

## Decision

**`patchClear` gains an `audio` channel.** `response.beats[patchClear].channels` becomes
`["atPatch", "readout", "audio"]` — one added array element, nothing else — and until that edit
lands, sheet 03's cue reads the array at runtime and is silent-and-correct rather than broken.

## Why

- **This sheet rules the channel and nothing else. The key is `sfx`, proposed by sheet 03.**
- **Three sources give the clear a sound and the merged one gives it no site.** *"Clearing is a
  soft rustle-and-snap; each rarity tier a distinct pitched note"* `[brief: soft]` ←
  `[I assumed]`, `OPEN.md §2`. `theme/tone/03-beat-map` gives `B5` a cue at exactly one intensity
  forever, which is a statement about a sound that exists. `mechanics/05`'s own consequence
  paragraph says *"audio is the one channel every beat shares"*. Its manifest omits it.
- **The decisive argument is that the brief's tier note has nowhere else to live.** `rarity` is
  one graded ladder read from `patch.tierIndex`, *"a Find has no rarity of its own"*
  (`gameplay/systems/03`), and `rarity.forbidden` bans a reveal cue that varies by set. So the
  per-tier note cannot attach to `B1`, cannot attach to `B2`/`B3` (which fire once per set and
  once per area, not per patch), and cannot attach to `B4`. `B5` is the only beat that fires once
  per patch and therefore the only beat that can carry a per-patch property at all. **Delete
  `B5`'s audio channel and the brief's one concrete audio instruction is unimplementable
  anywhere in the game.**
- **No sheet ever argued for a silent clear.** `mechanics/05`'s `## Why` covers control, reveal
  persistence, channel exclusivity, latency ownership and prediction. Not one line of it, and no
  row of its ten-rule table, reasons about `B5` being inaudible. The omission has no author.
- **`audio` is not an exclusive channel and adding it costs nothing structurally.**
  `response.channelExclusivity` names `atPatch` and `notice` only; four of the five beats already
  carry `audio` concurrently, so the channel is shared by construction `[research: cid/gameplay/mechanics/05-response-contract.md]`.
- **The muted-player invariant survives.** `patchClear` keeps `atPatch` and `readout`, so audio is
  additive and the count of beats whose only channel is `audio` stays 0. That invariant is Mix's
  to carry and I may not break it; adding a third channel to a beat that already has two cannot.
- **Rank is not channel count, and tone/03 says so itself.** `B2` is permitted to be *"longer and
  wider than `B1`, occupying more channels and resolving after it, but never sharper."* So a beat
  occupying three sites is not thereby louder than one occupying two. `B5` stays the quietest
  beat in every medium it occupies, which is the invariant sheet 03 carries.

## Pushing back — `gameplay/mechanics/05-response-contract`

**What I am overruling:** the value `"channels": ["atPatch", "readout"]` in the `patchClear` row
of that sheet's merged `response` manifest. `[cid: decided]`

That sheet is merged and shipped and the running build reads it, so it can decline: the manifest
is the artifact and the consequence paragraph is not, and *"the prose is wrong"* is an available
answer. **The consequence of declining, stated so it is made in view:** sheet 03's `patchClear`
cue becomes unreachable data, the game's most-repeated event is silent forever, and
`OPEN.md §2`'s per-tier pitched note is unimplementable in this game by the argument above.
`theme/tone/03` would then also need amending, because its `B5` row describes a cue's intensity.

The revision request is one array element. Verbatim, the only change asked for:

```json
{
  "sheet": "cid/gameplay/mechanics/05-response-contract.md",
  "path": "response.beats[patchClear].channels",
  "from": ["atPatch", "readout"],
  "to": ["atPatch", "readout", "audio"],
  "changesNothingElse": true,
  "raisedBy": "cid/audio/sfx/01-the-clear-has-a-channel.md",
  "gap": "G1"
}
```

**Nothing else in `response` moves.** Not `queued`, not `unsequencedBeats`, not
`channelExclusivity`, not `minSustainedOnsetsPerSecond`, not `onOverload`, not the 80 ms budget,
not `residueLifetimeSeconds`, not the rank. I do not edit that sheet.

## Pushing back — `theme/tone/03-beat-map`, beat `B5`

**What I am overruling:** that sheet's *"may occupy: one channel"* cell on `B5`, at
`cid/theme/tone/03-beat-map.md`. `[cid: decided]`

That sheet names exactly two kinds of work permitted to overturn it, one of them **audio
intent**, and requires the `B` ids be named and the file cited. Both done, and this is the whole
of what I re-open: **`B5` only, the channel-count cell only, and not the ranking.** `B1 > B2 >
B3 > B4 > B5` with no ties stands untouched, and `B5` remains the quietest.

Three reasons the cell does not survive:

1. **It is a media taxonomy and `response`'s is a site taxonomy.** Tone's "channel" means a
   medium — sound, world visual, on-screen text. `response`'s `channels` array means a *site* —
   `atPatch`, `readout`, `notice`, `audio`. The two words are not the same word, and every claim
   in this sheet says which it means.
2. **In tone's own media terms the cell is already exceeded, by two approved and shipped
   channels.** `B5` today occupies `atPatch` (a world visual) and `readout` (an on-screen
   number). That is two media with the cell reading one, before any audio is added.
3. **None of that sheet's four acceptance criteria enforces it.** The cell is prose no check
   points at, which is the difference between a rule and a wish.

## Consequences for other work

- **Response-contract work (`gameplay/mechanics/05`)** owns the one-element edit above and owns
  declining it. If it declines, it should say so in that sheet rather than leave the omission
  unauthored, so the silent clear becomes a decision somebody made.
- **Beat-scheduler work (`game/src/client/Beats.luau`)** inherits **zero new warnings**, verified
  against the source. `checkContract`'s exclusivity loop iterates `response.sequencedBeats`, and
  `patchClear` is in `unsequencedBeats`; the forbidden-channel loop only warns when a name is in
  both `channels` and `forbiddenChannels`, and `patchClear` declares no `forbiddenChannels`;
  `channelExclusivity` has no `audio` entry for anyone to own `[research: game/src/client/Beats.luau]`.
- **In-world sound work (sheet 03, mine)** inherits a hard invariant: the `patchClear` cue reads
  `GameConfig.Response.beats[patchClear].channels` at runtime and plays only when `"audio"` is
  present. It may never test a literal, and it may never assume the amendment landed.
- **Mix work (`audio/mix/02`)** gets G1 resolved in the direction that makes its load case real:
  the 8-onsets-per-second case is live, and its concurrency cap and roll-off curve have something
  to attenuate. It must still stay legal under a decline, which is what the runtime read gives it.
- **Muted-play work (`audio/mix/04`)** gets a beat that gains a third channel and keeps both
  non-audio ones, so `audioOnlyBeats: 0` is unaffected and is not asked to widen.
- **Stinger work** is untouched: `B1`, `B2` and `B3` already carry `audio` and no ranking moves.

## Acceptance criteria

1. After the revision, `response.beats[patchClear].channels` has exactly three elements,
   `["atPatch", "readout", "audio"]`, and a diff of `mechanics/05`'s manifest against its
   pre-revision form shows exactly one added array element and no other change.
2. Built against an unamended `response` whose `patchClear.channels` is `["atPatch", "readout"]`,
   the `patchClear` cue plays no sound and writes no warning across 200 clears; built against the
   amended one, it plays. The cue body contains no string literal `"audio"` compared against a
   hard-coded channel list — it reads the array from `GameConfig`.
3. With `"audio"` added, `Beats.luau`'s `checkContract` emits zero warnings it did not emit
   before, at connect, on a config where `patchClear` is in `unsequencedBeats`,
   `channelExclusivity` has no `audio` key, and `patchClear.forbiddenChannels` is empty.
4. `patchClear` still lists `atPatch` and `readout`, so the number of beats in `response` whose
   `channels` array is exactly `["audio"]` is 0.

## Not decided here

What the clear sounds like, how long it is, how loud it is, how many samples it has, whether it
is positional, and every zero in the domain — **sheet 03, mine, which carries the `sfx` key.**
The disposition of the platform's default character sounds — sheet 02, mine. The roll-off curve,
the concurrency cap, the bus level, the 20 MB split and the `SoundId` sentinel — Mix, which holds
`mix`. Whether the one-element edit is accepted — response-contract work, which holds `response`.
The ranking of the five beats and every other `B` id — `theme/tone/03`, not re-opened. Who is
permitted to create a `Sound` instance — instance-representation work, raised by Mix as G5.
