# 01 — Whether music exists

**Domain:** audio/music · **Category:** Audio · **Wave:** 6

## Decision

**This game ships zero music tracks. `trackCount: 0`, `tracks: []`.** Music exists here as a
decision with a stated reason and a costed reversal path, not as an asset, an id, a bus or a
reserved slot: every form of it is already forbidden by an approved sheet, and the one form that
survives is an ambient bed, which is `ambience`'s object and is ceded rather than built.

## Why

**The line I overrule is the weakest tag in the ladder and was never asked.** *"Music sparse and
low"* is the whole of the brief's music direction, `[brief: soft]` ← `[I assumed]` (`OPEN.md §2`),
at **0 interview questions** (`OPEN.md §1`). `HANDOFF.md` rates `[I assumed]` *"a starting point,
freely arguable"*, so it is overruled with a reason and the overrule is carried as manifest data.

**Two of this domain's four subjects were zeroed before I enumerated anything, and not by me.**
Intensity layers die on `theme/tone/03` check 3 (*"No cue's intensity is a function of progress,
streak, count, elapsed time, or depth"*), with `HANDOFF.md`'s *"nobody downstream should invent
tension to fill the gap"* `[brief: binding]` behind it. Per-area tracks die on `03-META.md`'s
shuffled authored chunks `[brief: binding]` ← `[you chose: R5 Q1]` and on `tone/03`'s *"`B1` at
depth 4 is exactly as loud as `B1` at depth 1"*. Loop and transition rules are then vacuous rather
than open: there is nothing to transition between. `[cid: decided]`

**Every remaining form with a shape in time fails one check, and that check carries the ruling
alone.** `tone/03` check 4 is *"Between two `B1` events the game produces no emphasis other than
`B5`"*, verified as *"no third recurring cue exists"*. A meter, a downbeat, a phrase that arrives
and a cadence that resolves are each a recurring emphasis between `B1` events and none of them is
`B5`. `tone/03` names **audio intent** as one of only two kinds of work permitted to overturn it;
I decline and apply it. `[cid: decided]`

**The survivor passes because it cannot be told apart from a bed, and Ambient holds two.** A
continuous, unmetered, unvarying layer with no arrival passes `setting/03` `R5` and the flat
baseline for exactly the reason that it is indistinguishable from `setting/01`'s granted off-screen
ambience and `setting/05`'s soft air bed, both routed to `ambience`. A third global continuous
layer under a second owner is two keys claiming one `Sound`. **So it is ceded**, and ceded to a
layer count that stands on its own grounds rather than on my zero. `[cid: decided]`

**Which reading of `R5` I take.** Its check counts *"properties inside a plot"*, and a non-diegetic
layer is not in one. **I take the narrow reading — `R5` does not reach music, and this ruling rests
on `tone/03` check 4 alone, which is sufficient.** Every row below citing `R5` also cites a
`tone/03` ground that stands without it. The jurisdiction question is routed to category
verification.

### Form by form — every row is somebody else's ruling, applied

| # | form | already forbidden by | observable |
|---|---|---|---|
| M1 | a metered loop (beat, bar, downbeat) | `tone/03` check 4, *no emphasis between `B1` events other than `B5`* | count of recurring cues outside `B1`–`B5`: 0 |
| M2 | a phrased theme that arrives and resolves | `tone/03` check 4, *no third recurring cue exists* | count of authored phrases that return: 0 |
| M3 | intensity layers or stems that add as an area fills | `tone/03` check 3; `HANDOFF.md` binding on the instruction | count of cue parameters reading progress: 0 |
| M4 | a riser, swell or build toward a completion | `tone/03` forbidden peak *the approach to a completion*; `tone/04` `D4` *riser or whoosh build* | count of ramps: 0 |
| M5 | a per-area track | `03-META.md` shuffled authored chunks; `tone/03` | count of tracks keyed to area ordinal: 0 |
| M6 | a per-depth or per-set-kind track | `tone/03`, *`B1` at depth 4 is exactly as loud as at depth 1* | count of tracks keyed to depth: 0 |
| M7 | a track keyed to elapsed or session time | `tone/03` forbidden peak *time passing, idling, standing still*; `setting/03` `R4` secondarily | count of audio reading elapsed time: 0 |
| M8 | anything scheduled, intermittent or randomised over time | `tone/03` check 3; `setting/03` `R5` secondarily | count of scheduled audio jobs: 0 |
| M9 | a track introduced at 24 of 24 | `gameplay/meta/07` `endgame`; `tone/03` check 3 — its existence would be a function of progress | count of cues conditioned on `found == totalFinds`: 0 |
| M10 | an idle or attract layer | `tone/03` forbidden peaks; `setting/03` `R4` | count of cues caused by standing still: 0 |
| M11 | a track under the index screen | `tone/03` check 4; interface sound is `uiSound`'s subject and this key holds no track for it | count of tracks parented to the index screen: 0 |
| M12 | a track keyed to a date, holiday or live event | `03-META.md` priority 3 scope gate; *"Ships and settles"* `OPEN.md §2` | count of date-keyed audio: 0 |
| M13 | a boombox, radio or player-supplied track | `input` is a closed five-verb list; `input.worldObjectsTriggeringAVerb: 0`. The platform permits *"up to 250 licensed tracks at a time in a single experience"* `[research: https://en.help.roblox.com/hc/en-us/articles/360000927163-Using-Licensed-Music-on-Roblox]` — the capability exists and the verb does not | count of licensed tracks in the experience: 0 |
| M14 | a reserved music `SoundGroup`, bus, stem or empty slot | `tech/deploy/02` — *an explicit null and a never-emitted key are the same bytes*; the scope gate forbids holding room | count of `SoundGroup`s this key names: 0 |
| M15 | a Creator Store music track pasted in by asset id | this key holds zero asset ids, and **a store track already has a live id and passes through no upload gate** `[research: https://github.com/Roblox/creator-docs/blob/main/content/en-us/audio/assets.md]` | count of `rbxassetid` occurrences in `game/src`: 0 |

### The seam, as a test rather than a boundary

> **Start the object's audio and compare second 0 with second N, for any N.** If a listener cannot
> tell which is which — no meter, no pitch centre that resolves, no phrase authored to be
> recognised as returning — the object is **`ambience`'s**, whatever it is made of, a synthesised
> tonal pad included. If any part of it is authored to return, it is **`music`'s**, and `music`
> holds none, so the object may not ship. **Count the parts authored to return: 0 → Ambient's;
> 1 or more → forbidden.**

Ambient reached the same seam independently, in instance terms: `Looped` true, `Playing` true once
per session and never false, no onset, no phrase, no meter, no nameable pitch. The two select the
same objects and I adopt both; the listener test is the one a verifier can apply without opening a
place file.

### The cost of the other answer

**A permanent pad fixes a harmonic centre and three other domains must then tune to it.**
`OPEN.md §2`'s per-tier pitched note, `B1` and `B4` would each have to sit in that key or trip
`theme/tone/04` `D3`'s ban on *"a dissonant or detuned interval"*. **It is also the largest single
asset this build could hold:** one Roblox audio upload may itself be **20 MB**
`[research: https://github.com/Roblox/creator-docs/blob/main/content/en-us/audio/assets.md]`,
against a `budgets.memoryCeilingsByCategory.Sounds` ceiling of **20 MB** shared by six audio
domains on the 3 GB floor device — 100% of the category's runtime budget in one file.

### This ruling does not rest on muted play

The category's muted-player premise — *"a large share of sessions run with no sound at all"* — is
unsourced in this repo. The one survey available reports **34.9% always / 23.6% often / 19%
sometimes / 9.3% never** playing mobile games with sound, n = 541
`[research: https://www.international-sound-directory.com/2025/12/07/do-people-really-play-mobile-games-without-sound-myth-or-reality/]`
— general mobile, **not Roblox and not 8–14**, so directional only, and the four buckets as banked
sum to 86.8% with the remaining 13.2% unlabelled `[unverified: the source's fifth bucket and its
label; settled by re-fetching that survey's own figure table]`. Mix's `audioOnlyBeats: 0` survives
on `response`'s per-beat channel arrays, which is how the category actually derived it; the motive
does not, and `RR-M1` below asks the category document to say so. **What carries when sound is off
is unchanged by me:** every `response` beat already has a non-audio channel, and
`theme/fantasy/03` `C2` makes the ground the record at *"count of guarantees whose delivery needs a
string, a screen or a figure: 0"*. This key contributes **0**.

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
      "countableForm": "count the parts authored to return; 0 routes the object to ambience, 1 or more is forbidden because music holds no track",
      "materialIsIrrelevant": true,
      "explicitlyIncludedUnderAmbience": "a synthesised tonal pad with no onset and no arrival",
      "agreedIndependentlyBy": "ambience, stated as Looped true and Playing true once per session and never false",
      "cededTo": "ambience",
      "cededObjectCount": 1,
      "cededLayerCountDependsOnThisKey": false
    },
    "r5Jurisdiction": {
      "readingTaken": "narrow",
      "why": "setting/03 R5's check counts properties inside a plot, and a non-diegetic layer is not in a plot",
      "rulingRestsOn": "theme/tone/03 check 4 alone, which is sufficient",
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
      { "id": "M12", "form": "a track keyed to a date, holiday or live event", "ruling": "03-META.md priority 3 scope gate; ships and settles", "observable": "count of date-keyed audio: 0" },
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
      { "id": "F2", "to": "mix", "finding": "a Creator Store audio track already carries a live asset id and passes through no upload gate, so the provisioning gap G2 covers assets that exist without ever entering release.provisioning.gates, not only assets that do not exist yet" },
      { "id": "F3", "to": "contract-and-seam work", "finding": "43 explicit nulls sit inside manifest values across seven approved sheets in two categories: 42 across six analytics sheets and one at cid/ui-ux/feedback/01 line 265. tech/deploy/02, approved in the same wave, makes an emitted null a hard error and its 16-row remediation table names none of them. This is a convention defect, not an analytics defect", "scope": "two categories, seven sheets", "analyticsNullCount": 42, "outsideAnalyticsNullCount": 1, "totalNullCount": 43, "isFloorNotTotal": true, "whyFloor": "no grep run so far proves an upper bound; the pattern behind this sheet's first count could not match a key containing a digit, which is exactly what it dropped", "repairedHere": false }
    ],
    "requestedRevisions": [
      { "id": "RR-M1", "against": "cid/audio/_category.md", "field": "the stated motive of the muted-player invariant", "asWritten": "a large share of sessions run with no sound at all", "problem": "no source in this repo supports it; the one survey available is general mobile, neither Roblox-specific nor age 8 to 14, and four Audio sheets now correct the premise while the category document is the only file still carrying it as fact", "requestedChange": "restate the motive as derived from response's per-beat channel arrays, which is how the invariant was actually reached, and carry the survey figures with their limits attached or drop them", "invariantAffected": "none: audioOnlyBeats 0 stands on the channel arrays", "sheetsCorrectingIt": 4, "sheetsStillCarryingItAsFact": 1 },
      { "id": "RR-M2", "against": "cid/tech/deploy/02-no-explicit-null-in-emitted-config.md", "field": "the 16-row remediation table and its scope statement", "problem": "43 explicit nulls in manifest values across seven approved sheets in two categories are named by no row, and one of them sits outside Analytics entirely", "requestedChange": "widen the scope statement to every manifest value under cid/, and let each owning sheet supply its own sentinel", "repairedHere": false }
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

- **Continuous-layer work** *[Audio — Ambient, `ambience`]*: one object is ceded to you, and your
  layer count does not grow to fill my zero — it stands at 1 on your own grounds, which is why the
  cession leaves no gap. Any continuous unmetered layer with no arrival is yours whatever it is
  made of, a synthesised tonal pad included.
- **Mix work** *[Audio — Mix, `mix`]*: **0 MB of the 20 MB `Sounds` ceiling is claimed here**, so
  the split is five ways, not six; I supply a 0 term to `audioOnlyBeats` and name no bus. Carry
  `F2`: a Creator Store id needs a provisioning gate as much as an upload does. `RR-M1` corrects
  the premise behind the invariant and does not touch the invariant.
- **Reward-hit and interface-sound work** *[Stingers, UI Sound]*: **there is no fixed harmonic
  centre in this game.** `B1`, `B4` and any per-tier pitched note owe tuning to nothing, and `D3`'s
  detuned-interval risk never arises from a layer underneath them.
- **In-world sound work** *[SFX]*: nothing here competes with `B5` between `B1` events, so
  `tone/03` check 4 is satisfied by your cue alone whichever way `G1` resolves.
- **Terminal-state work** *[Meta & Content, `endgame`; final cross-category pass]*: `F1` stands.
  Past area 8 the soundscape is `ambience` plus `B3` plus `B5` forever, and no domain may close
  that gap with a layer that appears on completion.
- **Contract-and-seam work**: `music` needs a shape in `bridge/schema.mjs`; its useful invariant is
  that `trackCount` equals the length of `tracks`. `F3` and `RR-M2` are yours to route.

## Acceptance criteria

1. `music.trackCount` is `0`, `music.tracks` is `[]`, and the count of `null` tokens anywhere in
   this sheet's `manifest` block is **0**.
2. `game/src` contains **0** occurrences of `rbxassetid`, **0** `Instance.new("Sound")` calls and
   **0** `Instance.new("SoundGroup")` calls. Verified this run: the only two `Sound` substring
   matches in `game/src` are the string literals `"promptingSound"` and `"liftSound"` in
   `game/src/shared/GameConfig.luau`, both forbidden-name entries owned by `notices`.
3. `music.runtimeInputsRead` is `[]`; no field name in `music` other than `trackCount` contains
   `progress`, `depth`, `area`, `elapsed`, `player` or `streak`; and `music.forbidden` holds **15**
   rows, each with a non-empty `ruling` and an `observable` that is a count.
4. Run whole-word and case-insensitive over every string value in this sheet's `manifest` block,
   `theme/setting/03` criterion 4's `RW` pattern returns **0** hits and `theme/setting/01`
   criterion 4's fauna pattern (`bird|birds|animal|…|bat|spider`) returns **0** hits.

## Not decided here

The continuous layers, their count, material, loop lengths and parenting — `ambience` *[Audio —
Ambient]*, to which this sheet cedes one candidate object rather than describing it. Every bus,
level, roll-off curve, concurrency cap, `SoundId` sentinel and per-domain MB allowance — `mix`.
The three payoff cues — `stingers`. `B4`, the four pressables and the system notice — `uiSound`.
`G1`'s `patchClear` channel and `G4`'s platform character sounds — `sfx`. Every null named in `F3`:
its replacement value belongs to the sheet that owns it, and I repair none of them.

## Pushing back

**I overrule `OPEN.md §2`'s *"Music sparse and low"*** — `[brief: soft]` ← `[I assumed]`, 0
interview questions. **What survives of the line survives under another owner:** *sparse and low*
describes what `ambience`'s continuous layers already are, so the register the developer assumed is
delivered and only the ownership and the word change. I push back against **no approved sheet**:
`tone/03` invites audio intent to overturn it and I decline the invitation.

## Flagged to the developer

**Whether this game has music was never asked** (`OPEN.md §1`, audio intent, 0 questions) and the
brief's four-word answer assumes yes. This is the ruling here most worth your time.

| ruling | live alternative | why I did not take it | cost of overruling me |
|---|---|---|---|
| **Zero tracks** | One continuous low pad under everything, the standard answer | It is indistinguishable from an ambient bed and `ambience` already holds two grants; a second owner for one object is a collision | **Low.** One layer added to `ambience`, one asset up to 20 MB against a 20 MB shared ceiling. Nothing is removed, because this key holds nothing |
| **Zero tracks with meter** | An actual music loop, quiet and slow | `tone/03` check 4 forbids any recurring emphasis between `B1` events other than `B5`, and check 3 forbids anything that varies | **High.** A revision against `tone/03`, which two approved sheets rest on, plus a fixed harmonic centre three audio domains must tune to |

**`RR-M2`, corrected and widened at round-1 verification.** `cid/tech/deploy/02` makes an explicit
null inside an emitted value a hard error (criterion 3: `npm run bridge -- --emit` against a
manifest containing `null` anywhere inside a key's value must exit non-zero), and its 16-row
remediation table names none of the sheets below. **My first count of 37 was wrong, and the way it
was wrong is part of the finding:** the pattern was `"[a-zA-Z]+": null`, which cannot match a key
containing a digit, so it silently dropped `"d7ByBucket"` and `"d30ByBucket"`. The split below is
the verifier's; I re-read the sites I had missed rather than take it on trust.

| sheet | nulls | example |
|---|---|---|
| `cid/analytics/funnels/02-comprehension-instruments.md` | 13 | `"window": null`, `"reason": null` (lines 93–99) |
| `cid/analytics/kpis/02-the-shortlist.md` | 13 | `"targetTolerance": null`, `"blockedBy": null`, `"path": null` |
| `cid/analytics/engagement/03-retention-readout.md` | 8 | `"target": null` (88, 91, 94); `"d7ByBucket": null`, `"d30ByBucket": null` (118–119) |
| `cid/analytics/engagement/01-session-shape.md` | 5 | `"stitchWindowSeconds": null` |
| `cid/analytics/engagement/02-lap-clock.md` | 2 | `"passMark": null`, `"alarm": null` |
| `cid/analytics/economy/03-what-this-economy-cannot-report.md` | 1 | `"replacedBy": null` |
| **`cid/ui-ux/feedback/01-the-notice-channel.md`** | **1** | `"extinctAfter": null` (line 265), read directly this run |
| **analytics subtotal** | **42** | six sheets |
| **total** | **43** | **seven sheets, two categories** |

**So it is a convention defect, not an Analytics defect** — the seventh sheet sits outside that
category entirely, and Stingers has already rewritten the criterion that had rested on
`extinctAfter` so that it tests `endgame`'s own arrays instead. **This is a floor and not a total:**
no pattern run so far proves an upper bound. It breaks no build today only because the analytics
keys are still `proposed`, which makes it cheap now and a hard failure the day one merges.
*Routed to contract-and-seam and to each owning category; repaired nowhere here.*

**`RR-M1`, filed against `cid/audio/_category.md`.** Its muted-player invariant is motivated by
*"a large share of sessions run with no sound at all"*, which no source in this repo supports. Four
Audio sheets now correct the premise, and the category document is the only place it survives as
fact — the document that handed it to all six domains. **The invariant is untouched:**
`audioOnlyBeats: 0` was derived from `response`'s per-beat channel arrays and stands on them.
`[research owed: a Roblox creator-dashboard or platform-published figure for the share of mobile
sessions played with audio muted, Roblox-specific and age-banded — it would settle the premise,
which this ruling does not use]`
