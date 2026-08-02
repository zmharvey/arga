# 03 — Subjects with no cue

**Domain:** audio/stingers · **Category:** Audio · **Wave:** 6

## Decision

**Five of the six subjects this domain is assigned do not exist in this game, each closed by an
approved rule rather than by taste, and all five are recorded as data with a grep-runnable
observable.** Beside them sits a closed list of **27 stingers this genre reaches for that this
game may not have.** The empty set is the output; silence about it would not be.

## Why

### The node lists five subjects and one and a half are real

`reward and unlock jingles` splits: the reward half is sheet `01`'s three cues, and **there is
no unlock at all.** The other four subjects are absent outright. That is not a thin assignment
— it is five approved rulings converging, and a build agent that cannot see them will add the
sounds by reflex, because every game in this genre has them.

| # | subject | verdict | the rules that close it | observable |
|---|---|---|---|---|
| A1 | unlock jingle | absent | `meta/04` makes the next area enterable with no threshold and no gate; `notices.forbidden.areaEnterNotice`; `theme/tone/03` forbids entering or leaving an area from peaking | no entry in `stingers.cues` whose `beat` is outside `response.beats[]`; `cueCount` is 3 and no cue's cause is an area, depth or bay entry |
| A2 | level-up fanfare | absent | there is no level-up: upgrade levels rise and that beat is `B4`, routed to interface-sound work by `theme/tone/03` (*"a confirmation, not a celebration"*) | `stingers.cues` contains no entry whose `beat` is `upgradePurchased`; grep of the built `cueUpgradePurchased` body for any identifier defined by this key returns zero |
| A3 | prestige / reset fanfare | absent | the reset system is `03-META.md` priority 3 and its name is in `vocabulary.bannedWords`; `endgame.forbidden` already holds the literal | case-insensitive grep of `cid/audio/stingers/` and `game/src/` for each name in `endgame.forbidden` returns zero identifiers |
| A4 | rare-drop hit | absent | `rarity` is one graded ladder read from `patch.tierIndex` and *"a Find carries no rarity field of its own"*; `discovery.repeat.possible` is false, placement is seed-derived, there is no roll and no draw rate; `systems/03` states it directly — *"Reveal-cue work gets one cue, not four"* | `findReveal.variesBy` is `[]`; no cue body reads `tierIndex`, `rarity`, `relicId` or a draw result |
| A5 | server announcement | absent | `social/03` `X11` forbids any sound naming, counting or announcing another player's join, leave or progress; `release.shutdown.playerFacing` is `"nothing"`; priority 3 removes seasons and events; `products` `F19` and ruling `R-4` remove every product surface | no cue's cause is another player, a shutdown, a schedule or a product; `stingers.cues` has 3 entries, all caused by the local player's own clearing |
| A6 | failure sting | absent | `response.negativeBeats` is 0 and `R10`; `input.rejectionCueOnFailedPrecondition` is `"none"` with `buy.onPreconditionFail: "silentNoOp"`; `theme/tone/04` `D12`; *"There is no failure state"* `02-GAMEPLAY.md` `[brief: soft]` ← `[you accepted: step 6 Q2]` | no cue has `class: "negative"`; no stinger cue body is reachable from a failed `BuyUpgrade`; `Beats.luau`'s own cue-seam header already states *"It may not play a rejection or failure cue either"* |

`A3` is named by reference rather than by literal: `endgame.forbidden` already carries the word
and a second copy of a `vocabulary.bannedWords` entry in a manifest string buys nothing. The
diff target is `endgame.forbidden`, which is where the grep list lives.

### The 27, and why a list this long is the useful part

Each is a sound another game in this genre ships and this one may not. A build agent cannot
count *"restrained"*; it can count a riser. The list follows `endgame.forbidden`'s proven form
— plain names in a flat array, so the merge is unaffected — with the ruling and the observable
carried beside it in a parallel array rather than folded into the names.

Three of them are worth a sentence because a reasonable person would add them anyway. **A
duplicate or consolation cue**: `discovery.repeat.possible` is false so no reachable duplicate
exists, and `analytics/economy/02` treats one occurrence as a correctness alarm rather than a
design case — a cue for it would be a cue for a bug. **A crescendo as an area nears
completion**: `theme/tone/03` calls this *"the load-bearing one. A ramp is tension"*, and
`HANDOFF.md`'s *"nobody downstream should invent tension to fill the gap"* is relayed at
binding strength. **A reserved cue slot, bus or empty `SoundGroup`**: the scope gate fails a
sheet that *"reserves space for, stubs, describes or specifies"* a priority-3 item, and an empty
bus named for a future feature is exactly that in structural form.

### This domain authors no strings

`stingers` holds zero player-facing text — every string in it is an identifier, a ruling or a
description a builder reads — so **no `coinage` block is filed and no `vocabulary` adjudication
is owed.** The two completion plates' strings are `notices`', already coined at wave 5.

```manifest
{
  "amends": "stingers",
  "value": {
    "absentSubjects": [
      { "id": "unlockJingle", "assignedAs": "reward and unlock jingles (unlock half)", "verdict": "absent", "ruling": "meta/04 — the next area is enterable with no threshold and no gate; notices.forbidden.areaEnterNotice; theme/tone/03 forbids entering or leaving an area from peaking", "observable": "no cue in stingers.cues has a cause that is an area entry, a depth entry or a post-terminal bay entry; cueCount is 3" },
      { "id": "levelUpFanfare", "assignedAs": "level-up and prestige fanfares (level-up half)", "verdict": "absent", "ruling": "there is no level-up; upgrade levels rise and that beat is B4, which theme/tone/03 rules a confirmation not a celebration and which belongs to interface-sound work", "observable": "stingers.cues contains no entry whose beat is upgradePurchased" },
      { "id": "prestigeFanfare", "assignedAs": "level-up and prestige fanfares (reset half)", "verdict": "absent", "ruling": "the reset system is 03-META.md priority 3 and its name is in vocabulary.bannedWords; endgame.forbidden already holds the literal and is the diff target", "observable": "a case-insensitive search of cid/audio/stingers/ and game/src/ for each of endgame.forbidden's 13 names returns zero identifiers" },
      { "id": "rareDropHit", "assignedAs": "rare-drop hits", "verdict": "absent", "ruling": "rarity is one graded ladder read from patch.tierIndex and a Find carries no grade of its own; discovery.repeat.possible is false, placement is seed-derived, there is no roll and no draw rate; systems/03 — reveal-cue work gets one cue, not four", "observable": "findReveal.variesBy is the empty list and no stinger cue body reads tierIndex, rarity, relicId or a draw result" },
      { "id": "serverAnnouncement", "assignedAs": "server announcements", "verdict": "absent", "ruling": "social/03 X11 forbids any sound naming, counting or announcing another player's join, leave or progress; release.shutdown.playerFacing is nothing; 03-META.md priority 3 removes seasons and events; products F19 and ruling R-4 remove every product surface", "observable": "no cue's cause is another player, a shutdown, a schedule or a product; all 3 cues are caused by the local player's own clearing" },
      { "id": "failureSting", "assignedAs": "failure stings", "verdict": "absent", "ruling": "response.negativeBeats is 0 and R10; input.rejectionCueOnFailedPrecondition is none with buy.onPreconditionFail silentNoOp; theme/tone/04 D12; 02-GAMEPLAY.md — there is no failure state", "observable": "no cue has class negative and no stinger cue body is reachable from a failed BuyUpgrade; Beats.luau's cue-seam header states the same rule independently" }
    ],
    "absentSubjectCount": 6,
    "forbidden": [
      "duplicateCue",
      "consolationCue",
      "cueVaryingBySet",
      "cueVaryingByFind",
      "cueVaryingByRarity",
      "cueVaryingByAxisGranted",
      "completionCeremony",
      "crescendo",
      "riser",
      "swell",
      "intensityRamp",
      "neighbourRevealCue",
      "neighbourCompletionCue",
      "joinOrLeaveCue",
      "unlockCue",
      "areaEnterCue",
      "depthEnterCue",
      "firstFindAmplification",
      "lastFindAmplification",
      "dailyCue",
      "returningPlayerCue",
      "streakCue",
      "seasonalCue",
      "eventCue",
      "reservedCueSlot",
      "reservedBus",
      "emptySoundGroup"
    ],
    "forbiddenCount": 27,
    "forbiddenRulings": [
      { "name": "duplicateCue", "what": "any cue at a repeat find", "ruling": "discovery.repeat.possible is false — no reachable duplicate exists, and analytics/economy/02 treats one occurrence as a correctness alarm", "observable": "no cue's cause is a repeat find" },
      { "name": "consolationCue", "what": "a softer or lesser cue standing in for a payoff that did not happen", "ruling": "response.negativeBeats is 0 — there is no lesser outcome to acknowledge", "observable": "stingers.cues has 3 entries and every one maps to a response beat" },
      { "name": "cueVaryingBySet", "what": "a reveal or completion cue differing by which set a Find belongs to", "ruling": "rarity.forbidden, restated in Beats.luau's cue-seam header", "observable": "setComplete and findReveal cue bodies contain zero reads of onset.args" },
      { "name": "cueVaryingByFind", "what": "a per-Find cue, motif or signature", "ruling": "rarity — a Find carries no grade; theme/tone/03 — B1 is not amplified by rarity of the Find", "observable": "findReveal.sampleCount is 1 and variesBy is empty" },
      { "name": "cueVaryingByRarity", "what": "a cue keyed to patch.tierIndex or any grade", "ruling": "systems/03 — the tier note belongs to the clear, not the reveal", "observable": "no stinger cue body reads tierIndex" },
      { "name": "cueVaryingByAxisGranted", "what": "a cue naming or differing by which axis a completed set granted", "ruling": "meta/03 — nothing may signal which axis was granted by making the cue louder, longer or different", "observable": "setComplete is byte-identical for all four sets and reads no set id" },
      { "name": "completionCeremony", "what": "any cue, chord, fanfare or resolution at 24 of 24", "ruling": "endgame; notices.forbidden.endScreen; theme/tone/03 — 24 of 24 is the fourth B2 and nothing further", "observable": "no cue's cause is collection completion; sheet 02's terminalState.replacementCue is none" },
      { "name": "crescendo", "what": "a cue that grows as an area nears completion", "ruling": "theme/tone/03 — the load-bearing one; a ramp is tension", "observable": "no cue reads a cleared fraction, a remaining count or an area progress value" },
      { "name": "riser", "what": "an upward-sweeping approach sound before any beat", "ruling": "theme/tone/04 D4 bans a riser or whoosh build", "observable": "no cue has an onset earlier than its beat's own onset; no pre-roll field exists in the key" },
      { "name": "swell", "what": "a level or filter build under live play", "ruling": "theme/tone/03 — no cue's intensity is a function of progress; setting/03 R5", "observable": "no cue has an attack longer than 1.0 s and no cue is looped" },
      { "name": "intensityRamp", "what": "any cue whose loudness, length or density is a function of progress, streak, count, elapsed time or depth", "ruling": "theme/tone/03; setting/03 R4", "observable": "every cue's variesBy is empty and peakLevelEqual is true" },
      { "name": "neighbourRevealCue", "what": "any sound at another player's Find reveal", "ruling": "social/03 X11; theme/tone/03 forbidden peaks", "observable": "all cues are global and client-local, played only for the player whose beat fired" },
      { "name": "neighbourCompletionCue", "what": "any sound at another player's area or set completion", "ruling": "social/03 X11", "observable": "no stinger is positional, so no stinger can be heard across the 122-stud plot pitch" },
      { "name": "joinOrLeaveCue", "what": "any sound naming or counting another player's arrival or departure", "ruling": "social/03 X11", "observable": "Beats.luau connects four server-to-client channels and none of them is a join or leave" },
      { "name": "unlockCue", "what": "any sound at an area, depth or content becoming available", "ruling": "meta/04 — no threshold and no gate exists to unlock", "observable": "no cue's cause is an unlock" },
      { "name": "areaEnterCue", "what": "a sound on entering an area or a post-terminal bay", "ruling": "notices.forbidden.areaEnterNotice; setting/04 — the opening holds nothing", "observable": "no cue's cause is an area transition; only its completion" },
      { "name": "depthEnterCue", "what": "a sound on reaching a new depth", "ruling": "theme/tone/03 — B1 at depth 4 is exactly as loud as B1 at depth 1; nothing rises with depth", "observable": "no cue reads a depth value" },
      { "name": "firstFindAmplification", "what": "a bigger, longer or extra cue at the first Find ever", "ruling": "theme/tone/03 — not amplified for the first one ever; onboarding/03 T5 bans anything shown once", "observable": "no cue body reads a persisted first-run boolean" },
      { "name": "lastFindAmplification", "what": "a bigger, longer or extra cue at the twenty-fourth Find", "ruling": "theme/tone/03 — not amplified for the last one; endgame", "observable": "no cue body reads found or totalFinds" },
      { "name": "dailyCue", "what": "a daily-login, first-of-day or reward chime", "ruling": "03-META.md priority 3", "observable": "no cue's cause is elapsed real time or a calendar date" },
      { "name": "returningPlayerCue", "what": "a welcome-back or while-you-were-away sound", "ruling": "03-META.md priority 3 cuts offline accrual; theme/tone/01 P1 forbids second person", "observable": "no cue's cause is a join with prior progress" },
      { "name": "streakCue", "what": "an escalating cue for consecutive anything", "ruling": "theme/tone/03 — no streak escalation, no combo", "observable": "no cue reads a consecutive counter" },
      { "name": "seasonalCue", "what": "a holiday, season or dated layer on any cue", "ruling": "03-META.md priority 3; OPEN.md §2 — ships and settles, no seasons or events", "observable": "no cue has a date, season or variant field" },
      { "name": "eventCue", "what": "a live-event or limited-time stinger", "ruling": "03-META.md priority 3; analytics/economy/03 records that no metric exists that could trigger one", "observable": "stingers holds no schedule, window or expiry field" },
      { "name": "reservedCueSlot", "what": "a fourth cue row held open, stubbed or named for a future beat", "ruling": "the category scope gate fails any sheet that reserves space for a priority-2 or priority-3 item; response has five beats and no sixth", "observable": "cueCount is 3 and stingers.cues length is 3" },
      { "name": "reservedBus", "what": "a bus, group or routing path named for a cue that does not exist", "ruling": "same gate; bus structure is mix's and this key names none", "observable": "stingers contains no SoundGroup, bus or routing field" },
      { "name": "emptySoundGroup", "what": "an empty SoundGroup created at boot for a future domain", "ruling": "same gate", "observable": "no name in this key is a SoundGroup and no module creates one on this key's authority" }
    ],
    "authorsPlayerFacingStrings": false,
    "coinageBlockRequired": false,
    "vocabularyAdjudicationRequired": false,
    "stringsOwnedElsewhere": "the two completion plates' text is notices.members[].text, coined at wave 5"
  }
}
```

## Consequences for other work

- **Interface-sound work (`uiSound`)** owns `B4` and inherits `A2` as its confirmation: the
  level-up fanfare a genre-literate builder would write is this domain's absent row, not a gap
  in theirs. Its own `forbidden[]` should not restate `duplicateCue`, `consolationCue` or
  `rejectionCue` for a beat that is mine; the boundary is the beat, not the sound.
- **In-world-sound work (`sfx`)** inherits `cueVaryingByRarity` **only as it applies to a
  reveal**. `systems/03` routes the per-tier pitched note to the clear, and nothing in this
  list reaches `B5`. If `G1` restores `patchClear`'s audio channel, its tier note is legal and
  is not forbidden here.
- **Mix** gets one structural prohibition it can enforce at the bus tree: `reservedBus` and
  `emptySoundGroup` mean the `SoundGroup` tree it designs may hold no member with no cue in it.
  Three stinger assets, three bus memberships, no fourth slot.
- **Music and Ambient work** inherit `crescendo`, `riser`, `swell` and `intensityRamp` as this
  domain's copy of a rule they also hold. Where two domains state one prohibition, the observable
  differs: mine is per cue row, theirs is per continuous layer.
- **Cross-category verification** gets 33 greps — 6 absent-subject observables and 27 forbidden
  names — every one of which is a search or a count rather than a judgment, and each of which
  fails a build that added the sound by reflex.
- **Naming-rule work (`vocabulary`)** is owed nothing by this domain: zero player-facing
  strings, zero coinage intakes, zero adjudications.

## Acceptance criteria

1. `stingers.absentSubjects` has 6 rows, each carrying a non-empty `ruling` and a non-empty
   `observable`, and running all 6 observables against `game/src/` returns zero hits.
2. `stingers.forbidden` has 27 plain names, `forbiddenCount` equals 27, `forbiddenRulings` has
   one row per name with matching `name` values, and a case-insensitive search of `game/src/`
   for each of the 27 returns zero identifiers.
3. `stingers` contains no `SoundGroup`, bus, routing, schedule, window, expiry, variant or date
   field, and `stingers.cues` has exactly 3 entries — the same count before and after the
   terminal state.
4. `stingers.authorsPlayerFacingStrings` is `false`, no sheet in `cid/audio/stingers/` emits a
   `coinage` block, and no string value anywhere in `stingers` is read by a HUD, notice or
   screen surface.

## Not decided here

- **What the three surviving cues are made of, their lengths, positions and asset rows** —
  sheet `01`, this domain, which carries `stingers` whole.
- **What the last surviving cue is built from once the other two are extinct** — sheet `02`,
  this domain.
- **`B4`'s sound and every interface zero** — interface-sound work; `B5`'s sound and the
  per-tier note — in-world-sound work, contingent on `G1`. Neither is reached by this list.
- **Whether the platform-default character sounds play at all** — in-world-sound work, `G4`.
- **Bus structure, the concurrency cap, the 20 MB split and the provisioning gate** — Mix.
- **What a duplicate *does* in the game** — `gameplay/systems`, which holds `discovery`; I
  forbid only a cue for it.
- **Whether any of these greps becomes a `bridge/merge.mjs` check or stays a build-report
  item** — contract-and-seam work, once `stingers` is promoted.
