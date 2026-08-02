# 01 — The three payoff cues

**Domain:** audio/stingers · **Category:** Audio · **Wave:** 6

## Decision

**Three cues, two voices, one palette.** `findReveal` is a bright struck bell over a wooden
note, hard attack, 1.2 s. `setComplete` is three wooden notes rising into one held open chord,
2.6 s. `areaComplete` is two wooden notes falling to their root, 1.8 s. **All three are global,
mono, one sample each, and the `B1 > B2 > B3` rank is carried by attack sharpness and voice
count — never by peak level, because a phone speaker has no headroom to spend.**

## Why

### The palette, and why it is two voices and not three

*"Warm, organic, tactile"* and *"an area's completion gets a short resolving chord"*
`[brief: soft]` ← `OPEN.md §2` are the only direction that exists, and they name material
(wood, struck, warm) rather than a genre. A struck tuned wooden mallet voice is that sentence
almost literally: it has a natural attack, a fast decay, no sustain to fade out, and its
fundamentals sit clear of the region a phone speaker cannot reproduce. A single small struck
metal voice — bell class — is added for `B1` alone and **reserved to it**, because it is the
one timbral resource in the game sharp enough to make one beat unmistakable without raising a
level. `theme/tone/04` `D3` and `D4` remove the genre's whole fanfare vocabulary
`[brief: binding]` on the relay via `theme/tone/03`, so no cheer, riser, cascade, ratchet, horn
or minor sting is available and none is wanted. **Two voices across three cues is what makes
them one game rather than three assets.**

**The 300 Hz fundamental floor is `[unverified]` and I say so rather than dress it as sourced.**
The settling fetch is a published measured speaker response for the floor device —
`audiokinetic.com/en/community/blog/loudness-and-frequency-response-on-popular-smart-phones/`,
which returned 403 on two hosts, or any measurement of an iPhone SE (2nd gen). What it would
settle is whether `theme/tone/04` `D3`'s sub-bass ban is taste or device fact, and how low a
resolving chord may rest and still exist on the floor device. **The ban itself does not depend
on the answer** — `D3` is an approved exclusion either way; only the exact floor moves.

### The rank carrier — S5, and it is not loudness

`theme/tone/03` says `B1` is *"the loudest single moment in the game in every channel"* and
that *"the ceiling is a phone speaker and a child, not a design choice."* Those two sentences
cannot both be satisfied by peak level: at the floor device every cue is already at the
ceiling, so a designer who expresses rank in dBFS ships three cues at the same volume and
calls one of them louder. **`[cid: decided]` — peak level is equal across all three, ±1 dB at
the bus, and the ranking is carried by attack sharpness, spectral brightness and voice count.**
A hard transient with content above 4 kHz is *perceived* as louder than a soft-attack chord at
the same peak, so `theme/tone/03`'s ranking holds by construction and is checkable on the
asset rather than on the mix. **I re-rank nothing; I decline one dimension and name three
others.** `B2 > B3` is carried by voice count (3 against 2) and audible length (2.6 s against
1.8 s), both monotonic with rank and both countable. `notices` reached the same conclusion from
the other side — dwell is *"a weak carrier of that rank"* — and handed the question here.

### Audible length — S2, the number nobody in either contract has ever stated

`notices` caps `B2` at 3.0 s and `B3` at 2.5 s so *"the plate leaves the screen while its sound
is still playing"* cannot happen, with 2.0 s of headroom to its 5.0 s ceiling available as one
revision. **I fit inside both caps and spend none of the headroom**, so that offer stays
unspent for whoever needs it later. `B1` is 1.2 s, well under its own 2.5 s `atPatch` dwell, so
the object at the patch always outlives its sound and `B2` can be longer than it as
`theme/tone/03` permits. All three are inside the 10-second ceiling the platform puts on a
publicly distributed sound effect, so nothing in the design is bounded by it
`[research: https://devforum.roblox.com/t/public-sound-effects-upload-are-now-available-for-creators/2980704]`.
All three figures are `[playtest unknown]` with the test ranges in the block below; nothing in
this pipeline has ever heard this game, and `notices` carries the same
`[research owed: a words-per-minute reading or attention rate for an 8-11 age band, which would let a cue length be derived from its plate's dwell rather than picked]`
that its own dwells inherit — my lengths sit under an underived number.

### The coincident case, and the arithmetic that sizes it

On 4.3% of laps all three fire from one clear at `minOnsetGapSeconds` 0.6 (`core-loop/02`,
inherited). Onsets 0.0 / 0.6 / 1.2; ends 1.2 / 3.2 / 3.0. **`B1` ends exactly as `B3` begins,
so at most two stinger voices are ever live at once**, and the `B2`/`B3` overlap is 1.8 s. At
Balance's 0.35 s floor the onsets compress to 0.0 / 0.35 / 0.70 and three voices are live for
0.5 s; at 0.9 s nothing overlaps but `B2` and `B3`, for 1.1 s. **What tells `B2` and `B3` apart
through that overlap is contour direction, not level or timbre**: `B2` rises and `B3` falls,
they share one voice and one mode, and `B3`'s two pitches are members of `B2`'s chord so the
overlap is consonant rather than accidentally dissonant, which `D3` forbids. A cue pair told
apart by level would be told apart by nothing on a phone speaker; a cue pair told apart by
direction is told apart at any volume, including the one an eight-year-old's device produces.

### Global, not positional — S3

**`[cid: decided]` all three are global**: a `Sound` parented to `SoundService`, played on the
client that received the beat's packet and heard by that player alone. Parenting is the whole
of the ruling — *"within `SoundService` or `Workspace`. Audio emits throughout the game. Volume
and pan position remain the same regardless of the user's sound listener position or
rotation"* `[research: https://create.roblox.com/docs/sound/objects]`, while a child of a
`BasePart` or `Attachment` is positional and Doppler-shifted
`[research: https://create.roblox.com/docs/reference/engine/classes/Sound]`. Three reasons, one
per cue. `areaComplete` is forbidden the `atPatch` channel outright and an area is not a point,
so a positional realisation would invent a position no sheet grants. `setComplete` has no world
position at all. `findReveal` has one, and a positional cue there would attenuate the loudest
moment in the game by the player's own distance from a patch they are standing on — a variation
by distance, which the no-variation rule forbids. And a positional stinger is audible to a
neighbour 122 studs away, which `social/03` `X11` forbids by name. **Mix's roll-off profile
therefore has zero stinger members and no curve applies.**
`SoundService:PlayLocalSound` is an available realisation and the choice between it and a
parented instance is Mix's and `representation`'s, not mine
`[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/reference/engine/classes/SoundService.yaml]`.

### The diegetic ruling, in one line — S4

A non-diegetic musical cue is permitted: `setting/03` `R5` fails only what varies *"with
anything but a player's action"*, and every one of these three is caused by the player's own
clearing, asserts no event in the world, and is made by nothing in `setting/05`'s inventory.

### Provisioning — S8, and why the guard sits at the play site

`Sound.SoundId` is a `ContentId` string, so `release.provisioning.unprovisionedIdValue`'s `0`
cannot transfer by type, and `tech/deploy/02` forbids an explicit null
`[research: https://create.roblox.com/docs/reference/engine/classes/Sound]`. **I use `""`, the
engine's own empty default, and Mix's ruling supersedes this field if it lands differently** —
a one-field revision, not a redesign. The guard is at the play site rather than at the id
because a sound whose id will not load *"will CONSTANTLY error"* in the console
`[research: https://devforum.roblox.com/t/failed-to-load-soundid-error-spam-extreme-log-file-sizes/2225682]`,
so a cue body must return before it touches a `Sound` at all. Source class is `creatorStore`
for all three by preference: the store carries *"more than 100,000 professionally-produced
sound effects and music tracks"* free to use, which makes a provisioned id reachable without an
upload and without an ID-verification gate
`[research: https://create.roblox.com/docs/audio/assets]`. All three are **mono** — the floor
device has one speaker, and stereo doubles the memory cost against a 20 MB ceiling shared by
six domains for nothing audible. `B2`'s width is carried by register span (root to octave), not
by stereo image. Whether the three are preloaded is Mix's, and the mechanism exists
`[research: https://create.roblox.com/docs/reference/engine/classes/ContentProvider]`.

### No beat becomes audio-only

`B1` shares `atPatch` with reveal-visual work; `B2` and `B3` share `notice` with the `Set
Complete` and `Area Complete` plates. `notices.forbidden.noticeSound` bans a sound authored by
that key *precisely because* audio is these beats' second channel and is mine, so each
completion has exactly one plate and exactly one stinger, begun from one cue body at one onset
`[research: game/src/client/Beats.luau]`. A muted player keeps the plate; a player not reading
the screen keeps the sound.

```manifest
{
  "provides": "stingers",
  "status": "proposed",
  "value": {
    "readBy": [
      "game/src/client/Beats.luau — the cue bodies cueFindReveal, cueSetComplete and cueAreaComplete; cueUpgradePurchased is UI Sound's and cuePatchClear is SFX's"
    ],
    "definition": "A short non-looping musical cue played on the audio channel of one response beat, begun by that beat's cue body at its onset. Not a bed, not a track, not an interface sound, not a world sound.",
    "cueCount": 3,
    "authorsPlayerFacingStrings": false,
    "palette": {
      "voices": [
        { "id": "wood", "what": "a struck tuned wooden mallet body, marimba or kalimba class: warm, fast natural decay, no sustain", "usedBy": ["findReveal", "setComplete", "areaComplete"] },
        { "id": "bell", "what": "a small struck tuned metal, glockenspiel or hand-bell class: bright, ringing decay", "usedBy": ["findReveal"], "reservedTo": "findReveal", "reservedReason": "it is the only metal voice in the game and no cue in any Audio domain may add a second, because sharpness is what carries B1's rank" }
      ],
      "mode": "major or open only — root, fifth, octave. No minor third, no tritone, no detuned or dissonant interval anywhere.",
      "modeSource": "theme/tone/04 D3",
      "lowestFundamentalHz": 300,
      "lowestFundamentalStatus": "unverified",
      "lowestFundamentalSettledBy": "a published measured frequency response for the floor device speaker; audiokinetic.com/en/community/blog/loudness-and-frequency-response-on-popular-smart-phones/ returned 403 on two hosts and is not recorded as sourced",
      "lowestFundamentalHoldsRegardless": "theme/tone/04 D3 bans a sub-bass drone as an approved exclusion, so the ban stands whatever the measurement says; only the exact floor moves",
      "forbiddenMaterial": ["voice", "choir", "cheer", "applause", "coinCascade", "slotRatchet", "airHorn", "riser", "whoosh", "swell", "subBassDrone", "minorSting", "detunedInterval", "whisper", "breath", "heartbeat", "creak", "windHowl", "orchestralHit", "drumKit"]
    },
    "rankCarrier": {
      "rankOrder": ["findReveal", "setComplete", "areaComplete"],
      "rankSource": "theme/tone/03 B1 > B2 > B3, no ties, inherited and not re-ranked here",
      "peakLevelEqual": true,
      "peakLevelToleranceDb": 1.0,
      "peakLevelCarriesRank": false,
      "peakLevelReason": "at a phone-speaker ceiling every cue is already at the ceiling, so expressing rank in dBFS ships three cues at one volume and calls one of them louder",
      "carriedBy": ["attackSharpness", "spectralBrightness", "voiceCount", "audibleSeconds"],
      "b1Claim": "the only cue with a hard transient and the only cue with a metal voice, so it is the sharpest and brightest moment in the game",
      "b2OverB3Claim": "three voices against two and 2.6 s against 1.8 s, both monotonic with rank",
      "perceivedLoudnessRankPreserved": true,
      "checkableAs": "attack time and voice count on the asset, not peak dBFS at the bus"
    },
    "positioning": {
      "allCuesPositional": false,
      "spatialisation": "global",
      "engineRealisation": "a Sound parented to SoundService, or SoundService:PlayLocalSound; never a child of a BasePart or Attachment",
      "heardBy": "only the player whose beat fired, structurally — Beats.luau runs on the client and receives four server-to-client channels addressed to that player",
      "rollOffCurveApplies": false,
      "rollOffOwner": "mix — its per-bus attenuation profile has zero stinger members",
      "reasons": {
        "areaComplete": "response.beats[areaComplete].forbiddenChannels contains atPatch and an area is not a point, so a position would be invented",
        "setComplete": "a set completion has no world position at all",
        "findReveal": "a positional cue would attenuate by the player's distance from a patch they are standing on, which is a variation the invariants forbid; and social/03 X11 forbids a cue for another player's reveal"
      }
    },
    "diegesis": {
      "nonDiegeticPermitted": true,
      "ruling": "setting/03 R5 fails only what varies with anything but a player's action; all three cues are caused by the player's own clearing, assert no event in the world, and are made by nothing in setting/05's inventory"
    },
    "provisioning": {
      "unprovisionedIdValue": "",
      "unprovisionedIdType": "ContentId string — release.provisioning.unprovisionedIdValue 0 does not transfer by type, and tech/deploy/02 forbids an explicit null",
      "supersededBy": "mix, which rules the sentinel once for all six Audio domains; if it lands on another value this field changes and nothing else does",
      "guardSite": "the cue body, before any Sound is created or played",
      "guardRule": "if soundId == \"\" the cue body returns having created nothing, played nothing and warned nothing",
      "guardReason": "a non-empty unresolvable id errors repeatedly in the console, so the guard cannot sit on the id",
      "buildWithAllThreeUnprovisioned": "boots, plays silence, writes zero warnings",
      "preload": "ContentProvider:PreloadAsync accepts Sound instances and yields; whether these three are preloaded against loadToFirstInputSeconds is mix's call, not mine"
    },
    "cues": [
      {
        "id": "findReveal",
        "beat": "findReveal",
        "rank": 1,
        "madeOf": "one bell strike and one wood note struck together at the same pitch class, the wood one octave below the bell. One event, no second note, no pitch movement, no approach.",
        "voiceCount": 2,
        "voices": ["bell", "wood"],
        "contour": "single",
        "intervalStructure": "unison across two octaves",
        "attackMaxMs": 10,
        "audibleSeconds": 1.2,
        "audibleTestRangeSeconds": [0.8, 1.8],
        "audiblePlaytestUnknown": true,
        "audibleUpperBoundSource": "response.beats[findReveal].dwellSeconds 2.5 — the object at the patch must outlive its sound",
        "tailSeconds": 0,
        "sampleCount": 1,
        "channelCount": "mono",
        "sourceClass": "creatorStore",
        "soundId": "",
        "companionChannel": "atPatch",
        "companionOwner": "reveal-visual work (Art — VFX)",
        "noticeForbidden": true,
        "firings": { "perLap": 3, "perGame": 24, "afterTerminal": 0 },
        "variesBy": []
      },
      {
        "id": "setComplete",
        "beat": "setComplete",
        "rank": 2,
        "madeOf": "three wood notes struck 90 ms apart in rising order — root, fifth, octave — each held so that all three ring together as one open chord, which then decays. No bell.",
        "voiceCount": 3,
        "voices": ["wood"],
        "contour": "rising",
        "intervalStructure": "root, fifth, octave",
        "attackMinMs": 20,
        "audibleSeconds": 2.6,
        "audibleTestRangeSeconds": [1.8, 3.0],
        "audiblePlaytestUnknown": true,
        "audibleCapSeconds": 3.0,
        "audibleCapSource": "notices.members[setComplete].dwellSeconds",
        "tailSeconds": 0,
        "sampleCount": 1,
        "channelCount": "mono",
        "widthCarriedBy": "register span from root to octave, never a stereo image",
        "sourceClass": "creatorStore",
        "soundId": "",
        "companionChannel": "notice",
        "companionOwner": "transient-message work (notices), plate text Set Complete",
        "firings": { "perGame": 4, "afterTerminal": 0 },
        "variesBy": []
      },
      {
        "id": "areaComplete",
        "beat": "areaComplete",
        "rank": 3,
        "madeOf": "two wood notes struck 120 ms apart, falling — fifth then root — decaying to nothing on the root. The brief's short resolving chord. No bell, no third voice, no held pad under it.",
        "voiceCount": 2,
        "voices": ["wood"],
        "contour": "falling",
        "intervalStructure": "fifth then root, both members of setComplete's chord so a 1.8 s overlap is consonant",
        "attackMinMs": 20,
        "audibleSeconds": 1.8,
        "audibleTestRangeSeconds": [1.2, 2.5],
        "audiblePlaytestUnknown": true,
        "audibleCapSeconds": 2.5,
        "audibleCapSource": "notices.members[areaComplete].dwellSeconds",
        "tailSeconds": 0,
        "sampleCount": 1,
        "channelCount": "mono",
        "sourceClass": "creatorStore",
        "soundId": "",
        "companionChannel": "notice",
        "companionOwner": "transient-message work (notices), plate text Area Complete",
        "atPatchForbidden": true,
        "firings": { "beforeTerminal": 8, "afterTerminal": "unbounded" },
        "variesBy": []
      }
    ],
    "coincidence": {
      "order": ["findReveal", "setComplete", "areaComplete"],
      "orderOwner": "gameplay/core-loop/02, inherited verbatim",
      "minOnsetGapSeconds": 0.6,
      "minOnsetGapOwner": "response, figure inside 0.35-0.9 owned by Balance and Tuning",
      "lapsWithAllThree": 0.043,
      "atGap0_6": { "onsets": [0.0, 0.6, 1.2], "ends": [1.2, 3.2, 3.0], "maxConcurrentVoices": 2, "b2b3OverlapSeconds": 1.8 },
      "atGap0_35": { "onsets": [0.0, 0.35, 0.70], "maxConcurrentVoices": 3, "threeLiveForSeconds": 0.5 },
      "atGap0_9": { "onsets": [0.0, 0.9, 1.8], "maxConcurrentVoices": 2, "b2b3OverlapSeconds": 1.5 },
      "distinguisher": "contour direction — setComplete rises, areaComplete falls",
      "distinguisherReason": "a pair told apart by level is told apart by nothing on a phone speaker; direction survives any volume",
      "duckingOwner": "mix — I state the overlap and set no level change",
      "noCueIsDelayedSuppressedOrShortenedByAnother": true
    },
    "invariants": [
      "no cue varies by set, by Find, by depth, by tier, by area ordinal, by how many have fired, by being the first or the last, by run, by elapsed time, or by another player",
      "every cue has sampleCount 1 and is played identically every time — no round robin, no pitch randomisation, no variation rule of any kind",
      "every cue's variesBy is the empty list",
      "cueCount is 3 and equals the number of response beats whose channels contain audio and whose owner is this domain",
      "no stinger is positional, so no stinger has a roll-off curve",
      "every cue shares its beat with exactly one non-audio channel, so no beat is audio-only",
      "no cue body reads onset.args, a persisted field, a counter, a clock or math.random",
      "peak level is equal across all three cues and carries no rank"
    ]
  }
}
```

## Consequences for other work

- **Mix** gets three global members and zero positional ones: its 3D attenuation profile has
  nothing from this domain to attenuate, and its concurrency case from stingers is **2 voices
  at `minOnsetGapSeconds` 0.6, 3 at Balance's 0.35 floor for 0.5 s** — not the three-live-for-
  seconds figure a naive read of the caps produces. Three mono assets, each under 2.6 s
  audible, is the smallest asset claim in the category against the 20 MB `Sounds` ceiling. The
  `""` sentinel is **its** ruling and I defer; if it lands elsewhere, three fields change.
- **Instance-representation work** inherits the same finding `notices` raised for the plate:
  `game/src` contains zero `Sound` instances and no key names a module permitted to create one,
  so all three cues are specced and unbuildable until one is named. I state the requirement and
  do not solve it.
- **Transient-message work (`notices`)** keeps both dwells. I fit inside 3.0 s and 2.5 s and
  **file no revision request**, so the 2.0 s of headroom to the 5.0 s ceiling stays available
  to somebody else.
- **Interface-sound work (`B4`) and in-world-sound work (`B5`)** inherit one reservation and
  one prohibition: the **metal voice is `B1`'s alone**, and neither may use a chord or a
  multi-note contour, because voice count is what carries rank below `B1`. A two-note
  confirmation on a bell would put `B4` above `B3` in the only dimension that carries the rank.
- **Reveal-visual work (Art — VFX)** gets 1.2 s of sound under a 2.5 s dwell: the object at the
  patch outlives its cue by 1.3 s and the visual carries that tail alone.
- **Balance and Tuning** owns `minOnsetGapSeconds` inside 0.35–0.9. The ruling above does not
  move at either end; the concurrency figure does, and it is stated per end above.

## Flagged to the developer

**The brief says nothing at all about `B2`** — `OPEN.md §2` names a reveal and an area
completion and predates the set-completion beat, which `core-loop/02` then made the largest
payoff in the game at weight 50. Everything above about `setComplete` is `[cid: decided]`
against silence. The live alternative is that `B2` should be the resolving chord and `B3`
something smaller still; I chose to keep the brief's chord on `B3` because it names that beat
explicitly, and gave `B2` the same voice one note wider. **Recommendation: accept.** The second
call worth a ruling is peak level being equal across the three; the alternative is a real
loudness ladder, which a phone speaker cannot deliver.

## Acceptance criteria

1. `stingers.cues` has exactly 3 entries with ids `findReveal`, `setComplete`, `areaComplete`;
   every `beat` value appears in `response.beats[].id`; no entry names `upgradePurchased` or
   `patchClear`; `stingers.cueCount` equals 3.
2. `setComplete.audibleSeconds` ≤ 3.0, `areaComplete.audibleSeconds` ≤ 2.5,
   `findReveal.audibleSeconds` < `setComplete.audibleSeconds` and ≤ 2.5, and every cue's
   `audibleSeconds` ≤ 10.0.
3. Every cue's `variesBy` is `[]`, `sampleCount` is 1 and `tailSeconds` is 0; and in the built
   client, `cueFindReveal`, `cueSetComplete` and `cueAreaComplete` contain zero occurrences of
   `onset.args`, `math.random`, `depth`, `tierIndex`, `ordinal`, `found` or any counter
   increment.
4. A build with all three `soundId` at `""` starts, reaches first input, plays no sound and
   writes zero lines to the client output; each of the three cue bodies returns before any
   `Instance.new("Sound")` or `:Play()` when its id is the empty string.

## Not decided here

- **What the cue sounds like at its ten-thousandth firing, and which of the choices above are
  made for that state** — sheet `02`, this domain, as an `amends` block.
- **Which subjects in this domain get no cue at all, and the closed forbidden list** — sheet
  `03`, this domain, as an `amends` block.
- **Bus structure, default volume, ducking across the coincident pair, the concurrency cap, the
  20 MB split and the final sentinel** — Mix. I state a length, a position class and an asset
  row; I set no level and no bus.
- **Which module creates the `Sound`** — instance-representation work. None legally may today.
- **The `notice` plate, its strings and its dwell** — `notices`, taken as given.
- **The `atPatch` visual at a reveal** — reveal-visual work (Art — VFX).
- **`B4` and `B5`** — interface-sound work and in-world-sound work; the per-tier pitched note
  belongs to the clear, not the reveal, and `systems/03` already routed it.
