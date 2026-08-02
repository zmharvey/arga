# 01 — Whether music exists

**Domain:** audio/music · **Category:** Audio · **Wave:** 6

## Decision

**This game ships zero music tracks. `trackCount: 0`, `tracks: []`.** Music exists here as a
decision with a stated reason and a costed reversal path, not as an asset, an id, a bus or a
reserved slot; every form of it is already forbidden by an approved sheet, and the one surviving
form is an ambient bed, which is `ambience`'s object and is ceded rather than built.

## Why

**The brief line I overrule is the weakest tag in the ladder and was never asked.** *"Music sparse
and low"* is the whole of it, `[brief: soft]` ← `[I assumed]` (`OPEN.md §2`), at **0 interview
questions** (`OPEN.md §1`, audio intent). It presupposes music rather than arguing for it, and
`HANDOFF.md` rates `[I assumed]` *"a starting point, freely arguable"*. So it is overruled with a
reason and the overrule is contained as a named manifest value, not left in prose.

**Two of this domain's four subjects were zeroed before I enumerated anything, and not by me.**
Intensity layers die on `theme/tone/03` criterion 3, *"No cue's intensity is a function of
progress, streak, count, elapsed time, or depth"*, reinforced by `HANDOFF.md`'s *"nobody
downstream should invent tension to fill the gap"* `[brief: binding]` on the instruction. Per-area
tracks die on `03-META.md`'s *"Endless via shuffled authored chunks"* `[brief: binding]` ←
`[you chose: R5 Q1]` — areas are not distinguishable content — and on `tone/03`'s *"`B1` at depth 4
is exactly as loud as `B1` at depth 1"*. `[cid: decided]` that this leaves loop-and-transition
rules vacuous rather than open: there is nothing to transition between.

**Every remaining form with a shape in time fails one check.** `tone/03`'s fourth check is
*"Between two `B1` events the game produces no emphasis other than `B5`"*, verified as *"no third
recurring cue exists"*. A meter, a downbeat, a phrase that arrives and a cadence that resolves are
each a recurring emphasis between `B1` events, and none of them is `B5`. `tone/03` names **audio
intent** as one of only two kinds of work permitted to overturn it. I decline the invitation and
apply the sheet instead, which is why this sheet pushes back against no approved ruling.
`[cid: decided]`

**The one survivor passes because it is indistinguishable from a bed, and Ambient already holds
two.** A continuous, unmetered, unvarying layer with no arrival passes `theme/setting/03` `R5` and
passes the flat baseline for exactly the reason that it cannot be told apart from
`theme/setting/01`'s granted off-screen ambience or `theme/setting/05`'s soft air bed, both routed
to `ambience`. A third global continuous layer under a second owner is two keys claiming one
`Sound`. **So it is ceded.** `[cid: decided]`

**Which reading of `R5` I take, stated rather than leaned on.** `R5`'s check counts *"properties
inside a plot"*, and a non-diegetic layer is not in a plot. **I take the narrow reading: `R5` does
not reach music, and this ruling rests on `tone/03` alone, which is sufficient.** `R5` is cited
below only against objects it plainly does reach, and every row that names it also names a
`tone/03` ground that stands without it. The scope question is routed to category verification.

### Form by form — every row is somebody else's ruling, applied

| # | form | already forbidden by | observable |
|---|---|---|---|
| M1 | a metered loop (beat, bar, downbeat) | `tone/03` check 4, *no emphasis between `B1` events other than `B5`* | count of recurring cues outside `B1`–`B5`: 0 |
| M2 | a phrased theme that arrives and resolves | `tone/03` check 4, *no third recurring cue exists* | count of authored phrases that return: 0 |
| M3 | intensity layers or stems that add as an area fills | `tone/03` check 3; `HANDOFF.md` binding on the instruction | count of cue parameters reading progress: 0 |
| M4 | a riser, swell or build toward a completion | `tone/03` forbidden peak *the approach to a completion*; `tone/04` `D4` *riser or whoosh build* | count of ramps: 0 |
| M5 | a per-area track | `03-META.md` shuffled authored chunks; `tone/03` no-variation-with-depth | count of tracks keyed to area ordinal: 0 |
| M6 | a per-depth or per-set-kind track | `tone/03`, *`B1` at depth 4 is exactly as loud as at depth 1* | count of tracks keyed to depth: 0 |
| M7 | a track keyed to elapsed or session time | `tone/03` forbidden peak *time passing, idling, standing still*; secondarily `setting/03` `R4` | count of audio reading elapsed time: 0 |
| M8 | anything scheduled, intermittent or randomised over time | `tone/03` check 3; secondarily `setting/03` `R5` | count of scheduled audio jobs: 0 |
| M9 | a track introduced at 24 of 24 | `gameplay/meta/07` `endgame`; `tone/03` check 3 — its existence would be a function of progress | count of cues whose existence depends on `found == totalFinds`: 0 |
| M10 | an idle or attract layer | `tone/03` forbidden peaks; `setting/03` `R4` | count of cues caused by standing still: 0 |
| M11 | a track under the index screen | `tone/03` check 4; interface sound is `uiSound`'s subject, and this key holds no track for it | count of tracks parented to the index screen: 0 |
| M12 | a track keyed to a date, holiday or live event | `03-META.md` priority 3 scope gate; *"Ships and settles"* `OPEN.md §2` | count of date-keyed audio: 0 |
| M13 | a boombox, radio or player-supplied track | `input` is a closed five-verb list with no such verb; `input.worldObjectsTriggeringAVerb: 0`. The platform permits *"up to 250 licensed tracks at a time in a single experience"* `[research: https://en.help.roblox.com/hc/en-us/articles/360000927163-Using-Licensed-Music-on-Roblox]` — the capability exists and the verb does not | count of licensed tracks in the experience: 0 |
| M14 | a reserved music `SoundGroup`, bus, stem or empty slot | `tech/deploy/02` — *an explicit null and a never-emitted key are the same bytes*; the scope gate forbids holding room | count of `SoundGroup`s this key names: 0 |
| M15 | a Creator Store music track pasted in by id | this key holds zero asset ids. **A Creator Store track already has a live asset id and passes through no upload gate** `[research: https://github.com/Roblox/creator-docs/blob/main/content/en-us/audio/assets.md]`, so nothing in `release` would catch it | count of `rbxassetid` occurrences in `game/src`: 0 |

### The seam, as a test rather than a boundary

> **Start the object's audio and compare second 0 with second N, for any N.** If a listener cannot
> tell which is which — no meter, no pitch centre that resolves, no phrase authored to be
> recognised as returning — the object is **`ambience`'s**, whatever it is made of, a synthesised
> tonal pad included. If any part of it is authored to return, it is **`music`'s**, and `music`
> holds none, so the object may not ship. **Count the parts authored to return: 0 → Ambient's;
> ≥ 1 → forbidden.**

Ambient reached the same seam independently and states it in instance terms — `Looped` true,
`Playing` true once per session and never false, no onset, no phrase, no meter, no nameable pitch.
The two formulations select the same objects and I adopt both; the listener test is the one a
verifier can apply without opening a place file.

### The cost of the other answer

**A permanent pad fixes a harmonic centre, and three other domains then have to tune to it.**
`OPEN.md §2`'s per-tier pitched note, `B1` and `B4` would each have to sit in that key or trip
`theme/tone/04` `D3`'s ban on *"a dissonant or detuned interval"*. That is a standing constraint on
in-world sound, reward-hit and interface-sound work, bought with one asset's worth of warmth.
**And it is the largest single asset this build could hold:** one Roblox audio upload may itself be
up to **20 MB** `[research: https://github.com/Roblox/creator-docs/blob/main/content/en-us/audio/assets.md]`,
against `budgets.memoryCeilingsByCategory.Sounds` of **20 MB** shared by six audio domains on the
3 GB floor device — 100% of the category's runtime budget in one file, in a build whose
`uploadedImageAssetsInWorldGeometry` and `uploadedMeshAssetsInWorldGeometry` are both 0.

### This ruling does not rest on muted play

The category's muted-player premise — *"a large share of sessions run with no sound at all"* — is
unsourced in this repo, and I will not launder it. The one survey available reports **34.9% always
/ 23.6% often / 19% sometimes / 9.3% never** playing mobile games with sound, n = 541
`[research: https://www.international-sound-directory.com/2025/12/07/do-people-really-play-mobile-games-without-sound-myth-or-reality/]`
— general mobile, **not Roblox and not 8–14**, so directional only, and the four buckets as banked
sum to 86.8% with the remaining 13.2% unlabelled `[unverified: the source's fifth bucket and its
label; settled by re-fetching the survey's own figure table]`. Mix's `audioOnlyBeats: 0` survives
on `response`'s per-beat channel arrays, which is how the category actually derived it; the motive
does not. **What carries when sound is off is unchanged by me:** every one of `response`'s five
beats already has a non-audio channel, and `theme/fantasy/03` `C2` makes the ground itself the
record at *"count of guarantees whose delivery needs a string, a screen or a figure: 0"*. This key
contributes **0** to `audioOnlyBeats`.

```manifest
{
  "provides": "music",
  "status": "proposed",
  "value": {
    "trackCount": 0,
    "tracks": [],
    "existsAsAsset": false,
    "existsAsDecision": true,
    "ruling": "this game ships zero music tracks; silence here is a decision with a reason, not an unfilled slot",
    "soundInstancesCreatedByThisKey": 0,
    "soundGroupsNamedByThisKey": 0,
    "assetIdsHeldByThisKey": 0,
    "megabytesClaimedAgainstSoundsCeiling": 0,
    "contributesToAudioOnlyBeats": 0,
    "runtimeInputsRead": [],
    "overruledBriefLine": {
      "line": "Music sparse and low.",
      "source": "OPEN.md section 2",
      "tag": "brief: soft, from [I assumed]",
      "interviewQuestions": 0,
      "overruledBy": "theme/tone/03 check 4: between two B1 events the game produces no emphasis other than B5",
      "containedAs": "trackCount 0",
      "whatSurvivesOfIt": "the register the line asked for is delivered by ambience's continuous layers, under a different owner"
    },
    "seamTest": {
      "statedAs": "start the object and compare second 0 with second N",
      "ambienceIf": "a listener cannot tell which is which: no meter, no pitch centre that resolves, no phrase authored to return",
      "musicIf": "any part of it is authored to return",
      "countableForm": "count of parts authored to return; 0 routes to ambience, 1 or more is forbidden because music holds no track",
      "materialIsIrrelevant": true,
      "explicitlyIncludesUnderAmbience": "a synthesised tonal pad with no onset and no arrival",
      "agreedIndependentlyBy": "ambience, stated as Looped true and Playing true once per session and never false",
      "cededTo": "ambience",
      "cededObjectCount": 1
    },
    "r5Jurisdiction": {
      "readingTaken": "narrow",
      "why": "setting/03 R5's check counts properties inside a plot and a non-diegetic layer is not in a plot",
      "rulingRestsOn": "theme/tone/03 alone, which is sufficient",
      "routedTo": "category verification"
    },
    "mutedPlayEvidence": {
      "usedAsGroundsForThisRuling": false,
      "surveyAlwaysPercent": 34.9,
      "surveyOftenPercent": 23.6,
      "surveySometimesPercent": 19.0,
      "surveyNeverPercent": 9.3,
      "surveyN": 541,
      "surveyPopulation": "general mobile",
      "robloxSpecific": false,
      "ageBandMatched": false,
      "bucketsSumPercent": 86.8,
      "unlabelledRemainderPercent": 13.2,
      "status": "directional only",
      "whatCarriesWithSoundOff": "every response beat already has a non-audio channel, and fantasy/03 C2 makes the ground the record"
    },
    "forbidden": [
      { "id": "M1", "form": "a metered loop with a beat, bar or downbeat", "ruling": "tone/03 check 4", "observable": "count of recurring cues outside B1 to B5: 0" },
      { "id": "M2", "form": "a phrased theme that arrives and resolves", "ruling": "tone/03 check 4, no third recurring cue exists", "observable": "count of authored phrases that return: 0" },
      { "id": "M3", "form": "intensity layers or stems that add as an area fills", "ruling": "tone/03 check 3, plus HANDOFF.md binding on the instruction", "observable": "count of cue parameters reading progress: 0" },
      { "id": "M4", "form": "a riser, swell or build toward a completion", "ruling": "tone/03 forbidden peak, the approach to a completion; tone/04 D4", "observable": "count of ramps: 0" },
      { "id": "M5", "form": "a per-area track", "ruling": "03-META.md shuffled authored chunks; tone/03", "observable": "count of tracks keyed to area ordinal: 0" },
      { "id": "M6", "form": "a per-depth or per-set-kind track", "ruling": "tone/03, B1 at depth 4 is exactly as loud as at depth 1", "observable": "count of tracks keyed to depth: 0" },
      { "id": "M7", "form": "a track keyed to elapsed or session time", "ruling": "tone/03 forbidden peak, time passing and idling; setting/03 R4 secondarily", "observable": "count of audio reading elapsed time: 0" },
      { "id": "M8", "form": "anything scheduled, intermittent or randomised over time", "ruling": "tone/03 check 3; setting/03 R5 secondarily", "observable": "count of scheduled audio jobs: 0" },
      { "id": "M9", "form": "a track introduced at 24 of 24", "ruling": "endgame; tone/03 check 3, its existence would be a function of progress", "observable": "count of cues conditioned on found equals totalFinds: 0" },
      { "id": "M10", "form": "an idle or attract layer", "ruling": "tone/03 forbidden peaks; setting/03 R4", "observable": "count of cues caused by standing still: 0" },
      { "id": "M11", "form": "a track under the index screen", "ruling": "tone/03 check 4; interface sound belongs to uiSound", "observable": "count of tracks parented to the index screen: 0" },
      { "id": "M12", "form": "a track keyed to a date, holiday or live event", "ruling": "03-META.md priority 3 scope gate; Ships and settles", "observable": "count of date-keyed audio: 0" },
      { "id": "M13", "form": "a boombox, radio or player-supplied track", "ruling": "input is a closed five-verb list; worldObjectsTriggeringAVerb 0", "observable": "count of licensed tracks in the experience: 0, against a platform allowance of 250" },
      { "id": "M14", "form": "a reserved music SoundGroup, bus, stem or empty slot", "ruling": "tech/deploy/02; the scope gate forbids holding room", "observable": "count of SoundGroups named by this key: 0" },
      { "id": "M15", "form": "a Creator Store music track pasted in by asset id", "ruling": "this key holds zero asset ids, and a store track passes through no upload gate", "observable": "count of rbxassetid occurrences in game/src: 0" }
    ],
    "reversalPath": {
      "trigger": "a developer ruling on OPEN.md section 2, the line this key overrules",
      "singleLicensedForm": "one continuous unmetered global layer with no onset, no meter and no phrase that returns",
      "ownerAfterReversal": "ambience",
      "keyThatWouldChange": "ambience.layerCount",
      "musicStaysZeroEvenThen": true,
      "anyMeteredFormAlsoRequires": ["a revision against theme/tone/03 check 4", "a revision against theme/tone/03 check 3 if it varies with anything"],
      "oneUploadMaxMB": 20,
      "sharedSoundsCeilingMB": 20,
      "shareOfCategoryBudgetPercent": 100,
      "domainsSharingCeiling": 6,
      "costOfReversalToday": "zero removal work: this key holds no instance, id, group or slot to take out"
    },
    "findings": [
      { "id": "F1", "to": "the final cross-category pass", "finding": "the terminal state is where music would earn its keep and is the one place it cannot be added: endgame extinguishes B1, B2 and B4 past area 8, so a layer appearing at 24 of 24 would be a cue whose existence is a function of progress, which tone/03 check 3 forbids with no exception. The terminal soundscape is ambience plus B3 plus B5.", "stated": true, "solved": false },
      { "id": "F2", "to": "mix", "finding": "a Creator Store audio track already carries a live asset id and passes through no upload gate at all, so the provisioning gap G2 is not only about assets that do not exist yet: it is also about assets that exist without ever entering release.provisioning.gates" },
      { "id": "F3", "to": "contract-and-seam work", "finding": "three approved wave-5 analytics sheets carry explicit nulls inside manifest values while tech/deploy/02, approved in the same wave, makes an emitted null a hard error; filed as a revision request, not repaired here" }
    ],
    "invariants": [
      "trackCount is 0 and tracks is an empty list, never a null and never a placeholder row",
      "no field in this key is null",
      "no field in this key reads progress, depth, area ordinal, elapsed time or player count",
      "this key names zero Sound instances, zero SoundGroups and zero asset ids",
      "every forbidden row carries a ruling that traces to an approved sheet and an observable that is a count"
    ]
  }
}
```

## Consequences for other work

- **Continuous-layer work** *[Audio — Ambient, `ambience`]*: **one object is ceded to you and your
  layer count does not grow to fill my zero.** Any continuous, unmetered layer with no arrival is
  yours whatever it is made of, a synthesised tonal pad included; if you decline both grants the
  game has no continuous layer at all, and that is a finding for the final pass, not a reason to
  reopen this ruling — the argument against music is `tone/03`, not the existence of a bed.
- **Mix work** *[Audio — Mix, `mix`]*: **zero MB of the 20 MB `Sounds` ceiling is claimed by this
  key**, so the per-domain allocation is split five ways, not six. `audioOnlyBeats: 0` gains a term
  of 0 from me and I supply no music bus; do not create a `SoundGroup` named for music. Carry `F2`
  into the provisioning gate: a store asset id needs a gate as much as an upload does.
- **Reward-hit work** *[Audio — Stingers]* and **interface-sound work** *[Audio — UI Sound]*: there
  is **no fixed harmonic centre in this game.** `B1`, `B4` and any per-tier pitched note are free of
  tuning obligations to a pad, and `D3`'s detuned-interval risk never arises from a bed underneath
  them. If you later want one, it costs the reversal path above and it is Ambient's object.
- **In-world sound work** *[Audio — SFX]*: nothing in this key competes with `B5` for the space
  between `B1` events, so `tone/03` check 4 is satisfied by your cue alone whichever way `G1` goes.
- **Terminal-state work** *[Meta & Content, `endgame`; the final cross-category pass]*: `F1` stands
  as a stated finding. Past area 8 the soundscape is `ambience` plus `B3` plus `B5`, forever, and
  no domain may close that gap with a layer that appears on completion.
- **Contract-and-seam work**: `music` is a proposal and needs a shape in `bridge/schema.mjs` before
  it merges; its useful invariant is that `trackCount` and `len(tracks)` must be equal.

## Acceptance criteria

1. `music.trackCount` is `0`, `music.tracks` is `[]`, and the count of `null` tokens anywhere in
   this sheet's `manifest` block is **0**.
2. `game/src` contains **0** occurrences of `rbxassetid`, **0** `Instance.new("Sound")` calls and
   **0** `Instance.new("SoundGroup")` calls. Verified this run: `rbxassetid` returns 0 across
   `game/src`, and the only two `Sound` substring matches are the string literals
   `"promptingSound"` and `"liftSound"` in `game/src/shared/GameConfig.luau`, both forbidden-name
   entries owned by `notices` and neither an instance.
3. `music.runtimeInputsRead` is `[]`, and no field name in `music` other than `trackCount` contains
   `progress`, `depth`, `area`, `elapsed`, `player` or `streak`. `music.forbidden` holds **15**
   rows, each with a non-empty `ruling` and an `observable` that is a count.
4. Run whole-word and case-insensitive over every string value in this sheet's `manifest` block,
   `theme/setting/03` criterion 4's `RW` pattern returns **0** hits and `theme/setting/01`
   criterion 4's fauna pattern (`bird|birds|animal|animals|beast|insect|beetle|butterfly|fish|deer|fox|snake|lizard|frog|bat|spider`)
   returns **0** hits.

## Not decided here

The continuous layers themselves, their count, their material, their loop lengths, their
parenting and whether the two grants are taken at all — all `ambience` *[Audio — Ambient]*, and
this sheet cedes one candidate object to it rather than describing it. Every bus, level, roll-off
curve, concurrency cap, `SoundId` sentinel and per-domain MB allowance — `mix` *[Audio — Mix]*,
including whether a music bus would ever be legal, which is moot at zero tracks. The three payoff
cues and their material — `stingers`. `B4`, the four pressables and the system notice — `uiSound`.
The `patchClear` channel question `G1` and the platform's default character sounds `G4` — `sfx`.
What the area-completion cue sounds like at its ten-thousandth firing — `stingers`, and
`gameplay/meta/07` already routed it there. Whether `bridge/schema.mjs` grows a shape for `music` —
contract-and-seam work.

## Pushing back

**I overrule `OPEN.md §2`'s *"Music sparse and low"*** — `[brief: soft]` ← `[I assumed]`, 0
interview questions. The line presupposes music without arguing for it, and `theme/tone/03` check 4
forbids every form of it that has a shape in time. **What survives of the line survives under
another owner:** *sparse and low* describes exactly what `ambience`'s continuous layers already
are, so the register the developer assumed is delivered, and only the ownership and the word
change. The overrule is carried as `music.overruledBriefLine` so a reader finds it in the data
rather than in this paragraph. I push back against **no approved sheet**: `tone/03` invites audio
intent to overturn it and I decline the invitation.

## Flagged to the developer

**Whether this game has music was never asked** (`OPEN.md §1`, audio intent, 0 questions), and the
brief's four-word answer assumes yes. This is the ruling in this domain most worth your time.

| ruling | live alternative | why I did not take it | cost of overruling me |
|---|---|---|---|
| **Zero tracks** | One continuous low pad under everything, the standard answer | It is indistinguishable from an ambient bed, and `ambience` already holds two grants; a second owner for one object is a collision | **Low.** One layer added to `ambience`, one asset up to 20 MB against a 20 MB shared ceiling. Nothing is removed, because this key holds nothing |
| **Zero tracks with meter** | An actual music loop, quiet and slow | `theme/tone/03` check 4 forbids any recurring emphasis between `B1` events other than `B5`, and check 3 forbids anything that varies | **High.** A revision against `tone/03`, which two approved sheets already rest on, plus a fixed harmonic centre three other audio domains must then tune to |

**A revision request I am filing rather than repairing.** `cid/tech/deploy/02` makes an explicit
null inside an emitted value a hard error (its criterion 3: `npm run bridge -- --emit` against a
manifest containing `null` anywhere inside a key's value must exit non-zero), and its 16-row
remediation table names **no analytics sheet** — a case-insensitive search of that file for
`analytics`, `kpis`, `funnels` or `engagement` returns **0** hits. Approved wave-5 analytics sheets
nonetheless carry explicit nulls inside `manifest` values. Greped this run for `"<field>": null`
under `cid/analytics/`:

| sheet | nulls | example field |
|---|---|---|
| `cid/analytics/funnels/02-comprehension-instruments.md` | 13 | `"window": null`, `"reason": null` (lines 93–99) |
| `cid/analytics/kpis/02-the-shortlist.md` | 10 | `"targetTolerance": null`, `"blockedBy": null`, `"path": null` |
| `cid/analytics/engagement/03-retention-readout.md` | 6 | `"target": null`, `"alarm": null` (lines 88, 91, 94) |
| `cid/analytics/engagement/01-session-shape.md` | 5 | `"stitchWindowSeconds": null` (line 114) |
| `cid/analytics/engagement/02-lap-clock.md` | 2 | `"passMark": null`, `"alarm": null` (line 196) |
| `cid/analytics/economy/03-what-this-economy-cannot-report.md` | 1 | `"replacedBy": null` |
| **total** | **37** | across **six** sheets, not three |

**Two approved sheets disagree, and the disagreement is wider than the three sheets my index
found.** It does not break a build today only because every analytics key is still `proposed` and
therefore never emitted — which makes it cheap to fix now and a hard failure the day one of them
merges. *Routed to contract-and-seam and release-contract work. Not mine, not repaired here, and
the values replacing each null belong to the sheet that owns it, exactly as `tech/deploy/02`
already ruled for its own sixteen.*

**Not fetched, and I had no tool to.** `[research owed: a Roblox creator-dashboard or
platform-published figure for the share of mobile sessions played with audio muted, Roblox-specific
and age-banded — it would settle whether the category's muted-player premise is true, independently
of this ruling, which does not use it]`.
