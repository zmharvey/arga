# 02 — The last cue standing

**Domain:** audio/stingers · **Category:** Audio · **Wave:** 6

> **Revised, round 1** (`cid/audio/_verified.md`). **RR-9** closed: criterion 4 no longer reads
> `notices.members[].extinctAfter`. It now tests the fact — that `findReveal` and `setComplete`
> become permanently unreachable at 24 of 24 — against `endgame.extinctPayoffKinds` and
> `endgame.survivingPayoffKinds`, which is where that fact lives. Nothing else moved.

## Decision

**`B1` and `B2` go permanently silent at 24 of 24, nothing replaces them, and nothing about
`areaComplete` changes at the boundary.** `areaComplete` is therefore built for its
ten-thousandth firing rather than its eighth: **the shortest of the three, two voices, fully
resolved, zero tail, one sample, forever.** Fatigue is answered by smallness, because every
other lever is forbidden.

## Why

### The extinction is correct and I implement it rather than reopen it

`endgame` makes the reveal and the set completion unreachable after the last Find, and **a
terminal or replacement cue *would be* the completion ceremony three approved sheets ban
independently** — `theme/tone/03` (*"24 of 24 is the fourth `B2` and nothing further"*),
`notices.forbidden.endScreen` (*"a completion screen, congratulation, ceremony or percentage at
24 of 24"*) and `endgame` itself (*"no end screen, no congratulation and no completion
percentage to build"*). Inventing one to fill the silence is exactly what `HANDOFF.md` forbids
`[brief: binding]`. Every instrument that would restore a peak is cut or `03-META.md` priority
3, and the one thing left to celebrate would be a second collection, which `theme/fantasy/02`
forbids by name. **No `## Pushing back` is owed and none is filed.**

The precise form matters for a builder: the three cue rows in `stingers.cues` **still exist**
after the terminal state. Their causes stop occurring. Nothing deletes a row, nothing branches
on `found == totalFinds`, and no cue body ever reads the collection count — a cue that checked
whether the game was finished would be a cue that behaves differently at the end, which is the
ceremony under another name.

**Extinction is a fact about `endgame`, not about how a sibling key spells absence.** The
authority is `endgame.extinctPayoffKinds` (`findReveal`, `setCompletion`) and
`survivingPayoffKinds` (`areaCompletion`, plus the tick), and this sheet's criteria test
against those two arrays. `notices` reaches the same count from the other side in prose —
*"after 24/24 the channel carries one member forever"* — and I cite that sentence and none of
its encoding, because `tech/deploy/02` makes an explicit null a hard error and a criterion that
breaks when a neighbour changes its null convention is testing the wrong thing. `[cid: decided]`

### The real cost, which is the subject of this sheet

**The cue heard most is the one ranked third.** `areaComplete` fires 8 times before the
terminal state and without limit after it, at roughly one firing per bay. `core-loop/02` sized
it for *"3 to 7 a session"*; after 24/24 that is its rate **forever**, and `endgame` states the
consequence directly: *"the area-completion chord is the only non-tick cue a post-terminal
player ever hears."* So `B3` is the only one of my three that must be designed against
**fatigue** rather than against impact. That is a constraint on its construction, not a licence
to raise its rank, and the rank is untouched.

### Why fatigue cannot be answered with variation, which is the finding

The genre's answer to a repeated cue is variety: several samples in rotation, a pitch offset, a
round robin, an occasional flourish. **Every one of those is illegal here.**

| lever | why it is unavailable |
|---|---|
| several samples in rotation | selection would be randomised over time, which `setting/03` `R5` fails; `sampleCount` is 1 in sheet `01` |
| a pitch or level offset per firing | a cue varying by how many have fired is a cue whose intensity is a function of count, forbidden by `theme/tone/03` |
| a bigger version at a milestone | there are no post-terminal milestones — bays are unnumbered and identical, and `theme/setting/02` forbids labelling one |
| a rarer flourish every Nth bay | intermittent and scheduled, which `setting/03` `R5` fails explicitly |
| a shorter version once the player has heard it often | reads a counter; also the only two lengths would then both be shipped and neither would be the cue |
| letting it fade out over a long run | audio would become a function of elapsed time, forbidden by `setting/03` `R4` and `theme/tone/03` |

**So the only legal lever left is size.** `[cid: decided]` — a cue that is short, sparse,
resolved and tail-free does not fatigue the way a cue that is long, dense, unresolved or
reverberant does, because there is less of it to notice on the hundredth hearing and nothing in
it asks for a follow-up. That reasoning is a prediction, not a measurement, and I say so:
nothing in this pipeline has ever heard this game.

### Which of sheet `01`'s choices are made for the terminal state

Five, and they are all *downward* choices made against a cap that would have allowed more.

| choice | value | made for the first eight would have been | why the terminal figure wins |
|---|---|---|---|
| audible length | 1.8 s | up to 2.5 s, the full `notices` cap | a cue heard 8 times can spend its cap; a cue heard without limit cannot |
| voice count | 2 | 3, matching `setComplete` | fewer voices is less to notice on the hundredth hearing, and it is also what carries `B2 > B3` |
| resolution | ends on its root, no suspended interval | an open or hanging ending, which reads as bigger once | an unresolved cue asks for a follow-up that will never come; at one firing per bay forever that is manufactured tension, banned by `HANDOFF.md` |
| tail | `tailSeconds` 0 — no reverb wash, no pad, no held note under it | a reverb tail, the standard way to make a short cue feel large | a tail is the part of a cue a player stops hearing as content and starts hearing as noise; it also overlaps the next bay's approach |
| samples | 1, played identically forever | 2–4 in rotation | rotation is randomisation over time, and `setting/03` `R5` fails it |

**Nothing in that table changes at 24 of 24.** The cue is not lengthened, shortened, re-ranked,
softened, replaced, retired or joined by a sixth. It is the same 1.8 seconds at bay 9 and at
bay 9,000.

### The muted-play consequence, stated because it is the whole payoff

Post-terminal there is exactly **one** notice member and exactly **one** stinger, and they are
the same beat's two channels. For a player with sound off, the `Area Complete` plate is the
entire terminal payoff of the game. For a player not reading the screen — the common case, since
input is movement-only and the ground is what they are looking at — the cue is the entire
terminal payoff. **Neither channel may be dropped, quietened to inaudibility or occluded**, and
neither may be made the sole carrier of anything, because in the terminal state each is already
the sole carrier for half the audience.

### The interval divergence — recorded, not requested

`endgame` and `notices` both put the post-terminal lap at **~157 s**, and I record that as the
approved figure. `cid/_state.md`'s wave-3 note 2 says laps fell to **93.5–93.0 s** once both
value passes were withdrawn, and nobody has reconciled the two. **The figure is Balance and
Tuning's and I file no request.** What it changes is one sentence: at 157 s the cue is heard
about 23 times an hour and 5.7 times in a 15-minute session; at 93 s, about 39 times an hour
and 9.7 times a session. **The ruling above is invariant across the divergence** — 1.7× more
firings of a cue that is already unbounded does not move a construction choice, which is why
this is recorded rather than escalated.

```manifest
{
  "amends": "stingers",
  "value": {
    "terminalState": {
      "condition": "endgame.terminalCondition — the player's found count reaches the total number of names in collection",
      "extinctCues": ["findReveal", "setComplete"],
      "extinctAuthority": "endgame.extinctPayoffKinds, which lists findReveal and setCompletion; this key reads no sibling key's absence encoding",
      "extinctReason": "their causes stop occurring: there is nothing left to reveal and all four sets are complete",
      "cuesRemovedFromKey": 0,
      "cuesAddedAtTerminal": 0,
      "replacementCue": "none",
      "replacementForbiddenBy": ["theme/tone/03 — 24 of 24 is the fourth B2 and nothing further", "notices.forbidden.endScreen", "endgame — no end screen, no congratulation, no completion percentage"],
      "survivingCues": ["areaComplete"],
      "survivingCueCount": 1,
      "survivingAuthority": "endgame.survivingPayoffKinds, whose areaCompletion is this cue's beat; its currencyTick carries no stinger",
      "changesAtBoundary": [],
      "changesAtBoundaryMeans": "areaComplete is not lengthened, shortened, re-ranked, softened, replaced, retired, doubled or joined by a sixth cue; its length, voices, contour, tail, sample count and level are byte-identical either side of 24 of 24",
      "noCueBodyReadsProgress": true,
      "noCueBodyReadsProgressReason": "a cue that checked whether the game was finished would be a cue that behaves differently at the end, which is the ceremony under another name",
      "firingRate": {
        "approvedLapSeconds": 157,
        "approvedLapSource": "endgame, corroborated by notices",
        "divergentLapSeconds": 93,
        "divergentLapSource": "cid/_state.md wave-3 note 2, after both value passes were withdrawn",
        "divergenceOwner": "Balance and Tuning — recorded here, not requested",
        "firingsPerHourAtApproved": 23,
        "firingsPerHourAtDivergent": 39,
        "rulingInvariantAcrossDivergence": true
      },
      "reachedByPlayerShare": "playtest unknown",
      "reachedByPlayerShareEvidence": "the one shipping comparison endgame cites puts a single area's collection completion at 0.4%"
    },
    "fatigueConstruction": {
      "cue": "areaComplete",
      "designedFor": "its ten-thousandth firing, not its eighth",
      "onlyLegalLever": "size",
      "onlyLegalLeverReason": "every variation lever is forbidden by an approved rule; smallness is the residue",
      "forbiddenLevers": [
        { "lever": "sampleRotation", "ruling": "setting/03 R5 — nothing randomised over time" },
        { "lever": "pitchOrLevelOffsetPerFiring", "ruling": "theme/tone/03 — no cue's intensity is a function of count" },
        { "lever": "milestoneVariant", "ruling": "theme/setting/02 — no part may be labelled or dressed as a special one; bays are unnumbered and identical" },
        { "lever": "periodicFlourish", "ruling": "setting/03 R5 — intermittent and scheduled fails" },
        { "lever": "shorteningOnceHeardOften", "ruling": "reads a counter; theme/tone/03" },
        { "lever": "fadingOverElapsedTime", "ruling": "setting/03 R4 and theme/tone/03 — nothing is a function of time" }
      ],
      "choicesMadeForTheTerminalState": [
        { "field": "audibleSeconds", "value": 1.8, "capAvailable": 2.5, "reason": "a cue heard 8 times can spend its cap; a cue heard without limit cannot" },
        { "field": "voiceCount", "value": 2, "alternative": 3, "reason": "fewer voices is less to notice on the hundredth hearing, and voice count is what carries B2 above B3" },
        { "field": "resolution", "value": "resolves on its root, no suspended or open interval", "reason": "an unresolved cue asks for a follow-up that never comes, which at one firing per bay forever is manufactured tension" },
        { "field": "tailSeconds", "value": 0, "reason": "a tail is the part of a cue a player stops hearing as content and starts hearing as noise" },
        { "field": "sampleCount", "value": 1, "reason": "one sample heard identically forever; rotation is randomisation over time" }
      ],
      "fatigueClaimStatus": "playtest unknown",
      "fatigueClaimTest": "a session played past the terminal state through at least 20 consecutive bays, listening for the point at which the cue stops registering; test range on audibleSeconds is 1.2 to 2.5"
    },
    "mutedPlayAtTerminal": {
      "noticeMembersLive": 1,
      "stingerCuesLive": 1,
      "pairing": "the same beat's two channels, begun from one cue body at one onset",
      "silentPlayerReceives": "the Area Complete plate, and it is the whole of the terminal payoff",
      "unwatchingPlayerReceives": "the areaComplete cue, and it is the whole of the terminal payoff",
      "neitherMayBeDropped": true,
      "neitherMayBeSoleCarrierOfAnything": true
    }
  }
}
```

## Consequences for other work

- **Mix** gets the steady state of this game as data: after 24/24 the only cue on any stinger
  bus is one 1.8-second mono asset, once a bay. A ducking rule for the coincident `B2`+`B3`
  pair is **unreachable** in the terminal state, and a concurrency cap sized on the coincident
  triple is sized for a state a finished player never re-enters. Both are still needed before
  the terminal state; neither may be tuned as though the terminal state were the common case.
- **Transient-message work (`notices`)** already reached the same count from the other side, in
  its own sentence — *"after 24/24 the channel carries one member forever."* The two keys agree
  at 1 and 1, and neither may publish a different number without the other moving. **I test
  against `endgame`, not against how that key encodes "no expiry"**, so its round of
  null-convention edits under `tech/deploy/02` breaks nothing here.
- **Contract-and-seam work** should note the shape of RR-9's fix: two keys agreeing on one fact
  should each cite the key that *owns* the fact rather than each other's field. That is the
  general form, and it is cheaper than a cross-key reference check.
- **Instance-representation work** inherits a lifetime, not just a creator: whatever module
  creates the three `Sound` instances must keep `areaComplete`'s alive indefinitely, because it
  is played without limit and re-creating it per firing is a per-bay allocation forever.
- **Balance and Tuning** owns the 157 / 93 divergence. Nothing in this sheet moves either way,
  and the only thing that changes with the answer is how often a player hears the same 1.8
  seconds.
- **Music and Ambient work** should note what this leaves them: past 24/24 the game's entire
  discrete audio surface is one 1.8-second cue at 93–157 second intervals, plus whatever `B5`
  turns out to be under `G1`. Anything continuous they author is what the terminal state
  mostly sounds like, and that is a conclusion about their domain, not a request.

## Acceptance criteria

1. `stingers.cues` has 3 entries both before and after the terminal state, and
   `terminalState.cuesRemovedFromKey` and `cuesAddedAtTerminal` are both 0; a grep of
   `cueFindReveal`, `cueSetComplete` and `cueAreaComplete` in the built client for `found`,
   `totalFinds`, `collection` and `areasFinished` returns zero hits.
2. `areaComplete.audibleSeconds` (1.8) is strictly less than every other cue's; its
   `voiceCount` (2) is strictly less than `setComplete.voiceCount` (3); its `tailSeconds` is 0
   and its `sampleCount` is 1.
3. `areaComplete` played 100 consecutive times produces 100 identical renders: the cue body
   contains zero calls to `math.random`, reads no counter, timer or clock, and selects from no
   list of assets.
4. `terminalState.extinctCues` is exactly `["findReveal", "setComplete"]` and each names a beat
   whose payoff kind appears in `endgame.extinctPayoffKinds`; `terminalState.survivingCues` is
   exactly `["areaComplete"]`, `survivingCueCount` is 1, and its beat's payoff kind appears in
   `endgame.survivingPayoffKinds`; `terminalState.replacementCue` is the string `none` and
   `stingers.cues` contains no entry whose cause is collection completion.

## Not decided here

- **What the three cues are made of, their lengths, positions, asset rows and the ranking
  expression** — sheet `01`, this domain, which carries `stingers` whole.
- **The absent subjects and the closed forbidden list** — sheet `03`, this domain.
- **The post-terminal lap interval itself** — Balance and Tuning; `endgame`'s ~157 s and
  `cid/_state.md`'s 93 s are recorded here as an open divergence and neither is adopted as
  mine.
- **How `notices` spells "no expiry" once `tech/deploy/02` is enforced** — transient-message
  work, which owns that key. Nothing here reads the field either way.
- **What a post-terminal bay contains, how long it is and whether the run rebases** —
  `endgame`, `layout` and `plots`, all Meta & Content's, plus Tech and Performance.
- **Whether the developer should enlarge the collection so the terminal state governs less of
  the game** — `endgame`'s own `## Flagged to the developer`, and the developer's call.
- **Bus levels, ducking, the concurrency cap and asset lifetime in memory** — Mix.
