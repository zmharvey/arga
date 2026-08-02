# 01 — The continuous layers

**Domain:** Ambient · **Category:** Audio · **Wave:** 6

## Decision

**The grant is taken, as exactly one layer.** One `Sound`, `Looped`, parented to `SoundService`,
created client-side once per session, `Playing` true from boot and never false: a continuous
broadband tone of the wood beyond the built boundary, with no transient, no locatable source and
no nameable call anywhere in it. Unmodelled moving air is material *inside* that layer, not a
second `Sound`.

**It is global-2D, not positional**, and it does not vary with anything at all —
`variesWith: "none"`, `weatherAudio: 0`, `timeOfDayAudio: 0`, `perAreaVariation: 0`,
`perDepthVariation: 0`, `randomisedOverTime: false`, `carriesNoState: true`. The loop seam is
solved inside the asset, because `theme/setting/03` `R5` removed every runtime answer.

---

## Why

**The grant is taken because three approved sheets already spent it.** `theme/setting/01`'s
`[playtest unknown]` escalation step 1 is *"raise ambient density and volume"* against the risk
that a place with no visible fauna reads eerie; `theme/setting/03`'s step 2 and
`theme/setting/05`'s step 2 both name *"raise Audio's off-screen ambience"* as their first
non-Art remedy. Declining the layer deletes the first rung of three separate escalation ladders
and leaves nothing under them, because the alternatives at step 3 are a developer ruling in all
three cases. `[brief: binding]` on the audience band `[you chose: R1 Q4]` (`00-CORE.md`) is what
makes those ladders live at all. `[cid: decided]`

**One layer, not two, and this is the contradiction the pack sent me to close.**
`theme/setting/05-inventory` `P10` says moving air *"reaches the player only **through** Audio's
granted off-screen ambience"* — air is a component of one layer. That same sheet's Audio
consequence line says a soft air bed *"**and** the off-screen ambience ... are **both**
available"* — two layers. I take `P10`, on three grounds. It is the row, not a summary of rows,
and a summary that double-counts its own source is the weaker text. `theme/setting/01` grants
*"the **one** permitted living sound in the game"*, singular, and it is the sheet that owns the
alive question — `05-inventory` `A1` defers to it verbatim, so its plural in a consequence line
is not a second grant. And `[brief: binding]` *"the smallest game that still gives every creative
area real work"* `[you chose: R1 Q3]` refuses a second permanently-resident asset for a
distinction nobody can state on a phone speaker. Filed as a revision request, not repaired here.
`[cid: decided]`

**Global-2D, and the argument is the same structural one that killed per-area beds.** A
positional emitter is world-fixed, so the listener's distance to it changes **discontinuously**
at passage: `plots.liveGeometry` rebuilds the bay at the instant the last patch clears, and
`theme/setting/04` `W4` places the arriving player at the outward opening. That is an audible
level and pan step at the exact moment `W1`'s consequence line forbids *"any effect, **sound**,
fade, camera move or transition"* marking passage. Bay length also varies (`bays[k].lengthStuds
= depths.areas[k].footprintStuds2 / 120`), so a per-lane emitter set has a different geometry at
every depth — variation with depth, which `theme/tone/03` forbids. An emitter fixed *relative to
the listener* has constant level and pan, which is global-2D at a higher instance cost. **There
is no third construction**, so the one variation channel `R5` leaves open — listener position —
is unavailable in practice, and I decline to spend it. `[cid: decided]`

The engine seconds it: a `Sound` *"within `SoundService` or `Workspace`"* emits so that *"volume
and pan position remain the same regardless of the user's sound listener position"*, and the same
guide recommends storing background audio in `SoundService`
`[research: https://create.roblox.com/docs/sound/objects]`. `SoundService` is not the character,
so a respawn does not restart it, and the layer is client-local and does not replicate, which
closes the neighbour question for this key outright — **what a neighbour 122 studs away hears of
this layer is nothing, because each client plays its own instance.**

**Life by texture, and zero nameable calls.** `theme/setting/01` permits sound *"suggesting life
that is never seen"*. A birdsong sample is not a suggestion — it names a creature the same sheet
forbids modelling, and its acceptance criterion 4 counts the noun. It is also a **transient**,
and a transient on a loop is the seam becoming audible on every lap. So the layer suggests life
by breadth and distance and contains no discrete event of any kind. This narrows my own grant and
is the sheet's second-largest call. `[cid: decided]`

**The seam is solved in the asset because `R5` closed every other route.** *"Anything scheduled,
intermittent, randomised over time, or varying with anything but a player's action ... fails"*,
and the consequence line to Audio adds *"nothing randomised over time, which is the idiomatic way
an ambient bed is built and is forbidden here."* That removes randomised start offset, randomised
playback speed, `LoopRegion` shuffling and layered one-shots — the four standard answers. What
remains is authorship: an equal-power overlap baked into the source file, zero transients so
there is no landmark to track, and a loop long enough that recurrence is not countable. Loop
length **120 s** `[playtest unknown]`, test range **60–180 s**; the platform's own asset ceiling
is *"less than 20 MB in size and 7 minutes in duration"*
`[research: https://create.roblox.com/docs/audio/assets]`, which bounds the top but does not set
this figure. Settled by one listening pass on the floor device across three consecutive laps.

**The zeros are outputs, not omissions.** Weather audio is `0` on `R2` (*"No weather, ever, as a
depicted event"*). Time-of-day audio and per-hour variation are `0` on `R1` (one lighting state,
*"no cue may vary by hour"*) and `R4`. Per-area and per-depth variation are `0` on
`theme/tone/03` and on `[brief: binding]` *"Endless via shuffled authored chunks, not
generation"* `[you chose: R5 Q1]` (`03-META.md`) — areas are not distinguishable content.
Randomisation over time is `false` on `R5`. `gameplay/meta/07`'s `endgame` makes everything past
area 8 a Spire bay without limit, so **this one layer is what the game sounds like in its steady
state**, and `continuesUnchangedPastArea8` is `true` rather than unstated.

**A muted player loses nothing, and that zero is load-bearing.** The layer carries no state,
count, tier, rank or progress, so it contributes **0** to `mix`'s `audioOnlyBeats` invariant and
cannot widen it. It also holds **0** player-facing strings, so `vocabulary` binds it vacuously.
Stated as manifest values so a later sheet cannot quietly make the bed carry something.

**The sentinel is `""` and it is adopted, not chosen here.** `mix` rules it once for six domains;
`release`'s numeric `0` demonstrably does not transfer, because `SoundId` is a `ContentId` whose
engine default is empty `[research: https://robloxapi.github.io/ref/class/Sound.html]`.
**`[research owed: whether `Sound:Play()` with an empty `SoundId` writes a client-output warning
— the engine reference does not state it]`**; criterion 2 below is written to be failed if it
does. `assetSource` is `creatorStore` first, because the store holds *"more than 100,000
professionally-produced sound effects and music tracks"* free to use and a store id is already
live, which skips the upload gate `mix` is filing against `release`
`[research: https://create.roblox.com/docs/audio/assets]`.

**`game/src` contains zero `Sound` instances and no key in either contract names a module
permitted to create one** (verified by grep this run: ten matches, all comments or forbidden-word
lists) `[research: repo — game/src, read this run]`. That is category gap **G5**, raised by
`mix` and placed by instance-representation work; I state the requirement and create nothing.
`budgets.memoryCeilingsByCategory` names `Sounds` and omits `StreamingSounds`, the second audio
category PlaceMemory reports
`[research: https://create.roblox.com/docs/studio/optimization/memory-usage]` — a streamed
looping bed is budgeted by nothing today. **`mix` is filing that; I reference it and do not
duplicate the request.** `approxSizeMB` **1.5** is a file-size claim (120 s mono at ~96 kbps)
against a 20 MB shared ceiling; decoded residency is unpublished
**`[research owed: a PlaceMemory → Sounds reading on the floor device with one asset of known
duration loaded]`**.

**The bed/track seam, as `music` and this domain independently agreed.** A `Sound` is this key's
if `Looped` is true, `Playing` becomes true once per session and never false, and it has no
onset, phrase, meter or nameable pitch; `music` holds everything else, and adds the reciprocal
test that the object is Ambient's if a listener cannot tell its content at second N from second
0. **`music` ruled `trackCount: 0` and this key did not grow to fill it** — `layerCount: 1` is
decided against `theme/setting/01`'s grant and `05-inventory` `P10` and against nothing else.

```manifest
{
  "provides": "ambience",
  "status": "proposed",
  "value": {
    "layerCount": 1,
    "layers": [
      {
        "id": "edgeAmbience",
        "descriptor": "Continuous broadband tone of an off-plot broadleaf wood heard across a built boundary. Mono. No transient, onset or discrete event anywhere in the file. No pitch centre a listener could name. No source a listener could locate or name. Energy rolled off below 120 Hz and above 6 kHz. Peak-to-trough level range inside one loop at most 6 dB.",
        "descriptorRegisterRuledBy": "cid/audio/ambient/02-the-ambience-word-check.md",
        "instanceClass": "Sound",
        "parentedTo": "SoundService",
        "createdBy": "one client-side boot module, once per session, before the first cue can fire; no key in either contract names that module today",
        "survivesRespawn": true,
        "replicates": false,
        "spatialisation": "global2D",
        "emitterCount": 1,
        "placementPerLane": "none: this layer has no world position and no per-lane instance",
        "whatANeighbour122StudsAwayHears": "nothing of this layer. Each client plays its own non-replicating instance, so the count of this key's Sound instances audible across plots.pitchStuds 122 is 0",
        "looped": true,
        "loopSeconds": 120,
        "loopSecondsStatus": "[playtest unknown] - test range 60-180 s, settled by one listening pass on the floor device across three consecutive laps",
        "seamRule": [
          "The last 3.0 s of the source file is an equal-power overlap of its first 3.0 s, baked into the asset. The runtime performs no crossfade and writes no property.",
          "The file contains zero transients, so no landmark exists whose recurrence a listener could track.",
          "Loop length shares no integer ratio with any cadence in the build: not runtime.clearTickRate, not runtime.saveIntervalSeconds 45, not response.minOnsetGapSeconds 0.6, not the lap.",
          "No runtime randomisation of start offset, PlaybackSpeed, LoopRegion or TimePosition. theme/setting/03 R5 forbids all four, so the seam is solved in the asset and nowhere else."
        ],
        "soundId": "",
        "soundIdSentinelRuledBy": "cid/audio/mix - adopted, not chosen here. release.provisioning.unprovisionedIdValue 0 does not transfer: SoundId is a ContentId whose engine default is empty.",
        "assetSource": "creatorStore",
        "assetSourceFallback": "upload",
        "channelCount": 1,
        "approxSizeMB": 1.5,
        "approxSizeMBStatus": "[playtest unknown] - a file-size claim of 120 s mono at about 96 kbps against the 20 MB Sounds ceiling. Decoded residency is unpublished.",
        "volumeRequirementOnMix": "This layer must be the quietest continuously audible element in the build and must sit below B5, the quietest beat, at every listener position. It sets no number. If mix ducks it under any beat, the duck is a level change with a return and never a stop: Playing may not become false.",
        "rollOffRequirementOnMix": "None is owed while spatialisation is global2D. If mix overrules to positional, three facts bind: RollOffMode.Inverse is the engine default and never culls a voice by distance; the nearest a neighbour's clearing patch can be is about 5 studs, inside the default RollOffMinDistance of 10; and budgets.streaming.StreamingTargetRadius 512 at plots.pitchStuds 122 loads nine lanes, so a positional ambience is nine simultaneous claims rather than one.",
        "concurrencyRequirementOnMix": "This key claims exactly 1 permanently-held voice. A cap that steals by recency or by least-recently-started must exempt it: Playing never becomes false and nothing in this key ever restarts it, so a single steal silences the layer for the rest of the session.",
        "playingBecomesTrue": "once per session, at client boot",
        "playingBecomesFalse": "never",
        "continuesWhileIndexScreenOpen": true,
        "continuesUnchangedPastArea8": true
      }
    ],
    "variesWith": "none",
    "weatherAudio": 0,
    "timeOfDayAudio": 0,
    "perAreaVariation": 0,
    "perDepthVariation": 0,
    "randomisedOverTime": false,
    "scheduledEvents": 0,
    "reservedSlots": 0,
    "carriesNoState": true,
    "contributionToAudioOnlyBeats": 0,
    "playerFacingStrings": 0,
    "bedVersusTrackTest": "A Sound is this key's if Looped is true, Playing becomes true once per session and never false, and it has no onset, phrase, meter or nameable pitch. music holds everything else, and adds the reciprocal: the object is this key's if a listener cannot tell its content at second N from second 0. music ruled trackCount 0 and this key did not grow to fill it.",
    "forbidden": [
      { "id": "F1",  "sound": "Any precipitation layer: falling water or ice, in any form or intensity.", "ruling": "theme/setting/03 R2 - no such event is depicted, sounded, or left on a surface.", "observable": "count of layers whose descriptor admits falling water or ice: 0" },
      { "id": "F2",  "sound": "Any moving-air event with an onset, a swell or a decay: a squall, a howl, a whistle through built stone.", "ruling": "theme/setting/03 R2; theme/tone/04 D3.", "observable": "count of layers whose peak-to-trough level range inside one loop exceeds 6 dB: 0" },
      { "id": "F3",  "sound": "Any creature vocalisation: a song, chirp, croak, buzz, call or wingbeat, near or distant.", "ruling": "theme/setting/01 - a sound is not an occupant only while no listener can name what made it; that sheet's criterion 4 counts the noun.", "observable": "count of layers whose descriptor names a living source: 0" },
      { "id": "F4",  "sound": "Running or standing water: a trickle, a drip, a spout, a basin filling.", "ruling": "theme/setting/01 - the water is dry; theme/setting/05 A6.", "observable": "count of layers whose descriptor admits water: 0" },
      { "id": "F5",  "sound": "Combustion: a crackle, an ember settling, a hearth.", "ruling": "theme/setting/05 A7 - no light source but daylight.", "observable": "count of layers whose descriptor admits combustion: 0" },
      { "id": "F6",  "sound": "Mechanism or fabric: a gear, a tick, a ratchet, a creaking hinge, cloth, cordage, a sail.", "ruling": "theme/setting/05 P3, A9, A11 and its Audio consequence line; theme/tone/04 D3 forbids a creak by name.", "observable": "count of layers whose descriptor admits a mechanism or a fabric: 0" },
      { "id": "F7",  "sound": "A sub-bass drone, a whisper, breathing, a heartbeat.", "ruling": "theme/tone/04 D3, verbatim, which audits Audio by name.", "observable": "count of layers with energy below 120 Hz: 0" },
      { "id": "F8",  "sound": "Any layer, or any property of one, that starts, ends or changes at the instant a part is finished or a player walks through an opening.", "ruling": "theme/setting/04 W1 and its consequence line to feedback work.", "observable": "count of this key's properties whose value differs between the tick before a part's last patch clears and the tick after: 0" },
      { "id": "F9",  "sound": "Any difference in content, level or filter between area 1 and area 8, or between depth 1 and depth 4.", "ruling": "theme/tone/03; 03-META.md shuffled authored chunks.", "observable": "perAreaVariation 0, perDepthVariation 0; count of this key's fields reading area, depth or partId: 0" },
      { "id": "F10", "sound": "A fade in on join, a fade out on leave, or a fade at any other moment.", "ruling": "theme/setting/03 R5 - a fade is a shape in time.", "observable": "count of Tween, TweenService calls or scripted Volume writes touching this key's Sound after boot: 0" },
      { "id": "F11", "sound": "An intermittent one-shot layered inside the bed on a timer or a draw - a distant call every N seconds. This is the idiomatic construction and it is named because it is the default a builder reaches for.", "ruling": "theme/setting/03 R5, and its Audio consequence line naming randomisation over time by construction.", "observable": "count of this key's Sound instances whose Looped is false: 0; count of scheduled or randomised play calls: 0" },
      { "id": "F12", "sound": "Any layer that begins, ends or changes at 24 of 24 or past area 8.", "ruling": "gameplay/meta/07 endgame; theme/tone/03's progress clause.", "observable": "continuesUnchangedPastArea8 true; count of this key's fields reading collection count: 0" },
      { "id": "F13", "sound": "Any cue caused by time passing, idling, standing still, or elapsed session time.", "ruling": "theme/setting/03 R4; the Audio category surface row 27, the continuous-layer half.", "observable": "count of this key's fields reading os.time, os.clock, tick, server uptime or elapsed session time: 0" },
      { "id": "F14", "sound": "Any rise in level or density as an area nears completion.", "ruling": "theme/tone/03; nobody downstream should invent tension to fill the gap.", "observable": "count of this key's fields reading patches cleared or patches remaining: 0" },
      { "id": "F15", "sound": "Any layer that differs by player count, announces a join or a leave, or is audible from a neighbouring lane.", "ruling": "gameplay/social/03 X11.", "observable": "count of replicating instances of this key: 0; count parented inside a plot: 0" },
      { "id": "F16", "sound": "Any calendar-keyed, holiday, festival, anniversary or returning-player layer, and any reserved SoundGroup, empty layer slot or unused field held for one.", "ruling": "03-META.md priority 3; the Audio category scope gate.", "observable": "layerCount equals the length of layers; reservedSlots 0; count of fields naming a layer that does not exist: 0" },
      { "id": "F17", "sound": "A reverb setting. SoundService.AmbientReverb colours every sound in the build including all five beats.", "ruling": "a mix-bus decision by construction; routed, not taken.", "observable": "count of SoundService properties written by this key: 0" },
      { "id": "F18", "sound": "A second Sound sharing this SoundId for stereo width or depth.", "ruling": "two permanently-held voices for no stated gain, and it re-opens the cross-lane case this key closed.", "observable": "emitterCount 1" }
    ],
    "invariants": [
      "Exactly 1 Sound instance in the build belongs to this key.",
      "layers[0] Playing becomes true exactly once per session and never becomes false.",
      "layers[0] Looped is true for the life of the session.",
      "The build boots with soundId at the sentinel, plays nothing from this key, and raises no error.",
      "carriesNoState is true, so this key contributes 0 to mix's audioOnlyBeats and holds 0 player-facing strings."
    ],
    "requestedRevisions": [
      { "id": "RR1", "file": "cid/theme/setting/01-the-ruin.md", "target": "acceptance criterion 4, final sentence", "conflict": "It asserts that non-visual ambient audio is exempt and that no manifest field holds it. This key makes the second clause false.", "ask": "Strike the sentence. Replace with: ambient audio descriptors are inside this check and comply with it (cid/audio/ambient/02).", "cost": "one clause; 0 renames; 0 shipped values at risk" },
      { "id": "RR2", "file": "cid/theme/setting/05-inventory.md", "target": "P10 and the Audio row of Consequences for other work", "conflict": "P10 makes air reach the player through the granted ambience (one layer). The Audio row makes both available (two). theme/setting/01 grants the one permitted living sound, singular; the Audio row says the only living sounds, plural.", "ask": "Amend the Audio row to agree with P10: the granted off-screen ambience is the only continuous layer, and unmodelled moving air reaches the player through it.", "cost": "one sentence; 0 present rows added; 0 absent rows licensed back" },
      { "id": "RR3", "file": "cid/theme/setting/03-physical-law.md", "target": "R5, the check column", "conflict": "It states the check as tone/04-do-nots X1's trigger count. The shipped tone/04 has D1 to D15 and no X1, and no row whose substance is that nothing moves or sounds uncaused: D2 is Art's light and shadow row, D3 and D4 are audio palette exclusions. This is the rule this whole domain turns on.", "ask": "Replace the cell with a self-contained count: count of continuous layers whose level, content or filter differs at second N from second 0 for any reason but the listener's own position, 0. Then either add the missing row to tone/04 or drop the cross-reference.", "cost": "one table cell. R5's own sentence is self-sufficient and both ambient sheets rely on it. Category verification routes the repair per G6." }
    ]
  }
}
```

## Consequences for other work

- **Bus, level and degradation work** *[Audio — Mix]*: three requirements and no values.
  `volumeRequirementOnMix` is an ordering (below `B5` at every listener position), not a number.
  **`concurrencyRequirementOnMix` is the one that can break this key silently:** a cap that
  steals the oldest voice takes this one first and nothing restarts it. Exempt it or state the
  restart. And any duck applied to this layer must be a level change with a return, never a stop.
- **Interface-sound work** *[Audio — UI Sound]*: the layer does **not** stop, duck or change when
  the index screen opens, and stopping it there would be a cue attached to the `openIndex` verb,
  which is yours and is forbidden by `F13` from this side.
- **In-world-sound work** *[Audio — SFX]*: `G7` is unaffected by this key. This layer does not
  replicate and is not positional, so it adds **0** to the cross-player concurrency case and
  **0** to the roll-off case. Whatever you rule for a neighbour's `B5` stands alone.
- **Reward-hit work** *[Audio — Stingers]*: `B1` is *"the loudest single moment in the game"* and
  this layer is the quietest continuous one, so no ranking conflict exists. This key authors no
  cue, enters no `Beats.luau` queue, and touches no `response` budget.
- **Instance-representation work** *[architect — `representation`]*: one `Sound` must be created
  client-side, parented to `SoundService`, once per session, before the first cue. No key names a
  module permitted to call `Instance.new("Sound")` today. `mix` raises it as `G5`; this is the
  first concrete instance the requirement has.
- **Memory-budget work** *[Tech & Data — Performance]*: this key claims **1.5 MB** of the 20 MB
  `Sounds` ceiling as a file-size figure, and it is the only permanently-resident audio asset in
  the build. If a streamed bed lands in `StreamingSounds` it is charged to nothing; that revision
  request is `mix`'s and is referenced rather than duplicated.
- **Area-authoring and depth-theming work** *[Meta & Content]*: **there is no audio channel to
  theme a depth with.** A deeper part does not sound different, and a Spire bay past area 8
  sounds identical to `East Terrace`.
- **Place-rules work** *[Theme — Setting]*: `RR1`, `RR2` and `RR3` above are filed against three
  approved sheets. **I edited none of them.** `RR3` in particular is a citation defect in the
  rule this domain turns on, and it is routed to category verification per `G6`.

## Acceptance criteria

1. **Instance shape.** Exactly **1** `Sound` instance in the build belongs to `ambience`; its
   `Parent` is `SoundService`, `Looped` is `true`, `Playing` becomes `true` once at client boot
   and never `false`. Count of this key's `Sound` instances parented to a character, a plot or
   any `BasePart`: **0**. Count that replicate to another client: **0**.
2. **Unprovisioned boot.** A build with `layers[0].soundId` at `""` reaches first input within
   `budgets.tiers[mobileFloor].loadToFirstInputSeconds.ceiling` 7.0 s, plays nothing from this
   key, raises **0** errors, and writes **0** warnings naming a sound.
3. **Nothing varies.** Count of code paths that write `Volume`, `TimePosition`, `PlaybackSpeed`,
   `LoopRegion`, `PlaybackRegion`, `SoundId` or `Playing` on this key's `Sound` after boot:
   **0**. Count of this key's fields reading area, depth, `partId`, patches cleared, collection
   count, player count, `os.time`, server uptime or elapsed session time: **0**.
4. **The zeros are present as data.** `forbidden` has **18** rows, each carrying a `sound`, a
   `ruling` naming a file or rule id, and an `observable` stating a count. `weatherAudio`,
   `timeOfDayAudio`, `perAreaVariation`, `perDepthVariation`, `scheduledEvents` and
   `reservedSlots` are each **0**; `randomisedOverTime` is `false`; `requestedRevisions` has
   **3** rows.

## Not decided here

Every level, bus, duck, roll-off curve, concurrency cap and per-domain MB allocation, and the
`SoundId` sentinel itself, which this key adopts *[Audio — Mix]*. Whether a neighbour's clearing
is audible at all *[Audio — SFX]*. `SoundService.AmbientReverb` *[Audio — Mix]*. The five beat
cues *[Audio — Stingers and UI Sound]*. Whether any music track exists — ruled `trackCount: 0`
*[Audio — Music]*. Which module may call `Instance.new("Sound")` *[instance-representation
work]*. Whether `budgets` gains a `StreamingSounds` row *[Tech & Data — Performance, filed by
Mix]*. What words the `descriptor` and `seamRule` strings may contain, and whether the two
wave-1 greps reach this block *[sheet `02`, this domain]*. The canopy's modelled motion beyond
the built edge *[Art & Visuals — Environment]*.

## Pushing back

**Overruled: the Audio consequence line of `cid/theme/setting/05-inventory.md`**, which reads
*"a soft air bed **and** the off-screen ambience `01-the-ruin` granted you are **both** available
and are the only living **sounds** in the game."* I take one layer, not two. The reasons are in
`## Why`; the mechanical point is that the same sheet's own `P10` says air reaches the player
*through* the ambience, so the consequence line contradicts the row it summarises, and
`theme/setting/01` — which owns the alive question — grants exactly one sound. **Nothing in
`05-inventory`'s twelve present or twenty-five absent classes changes**, `P10` stands verbatim,
and the ask is one sentence in a consequence line. Filed as `RR2` rather than edited.

## Flagged to the developer

**The brief specifies no continuous audio layer at all.** `OPEN.md §2`'s four audio sentences are
five cue moments and a music line; `OPEN.md §1` records *audio intent* at **0** interview
questions. Every ruling here is `[cid: decided]` against a brief that never considered the
subject — category gap `G8`.

| ruling | live alternative | why not | cost of overruling |
|---|---|---|---|
| **Take the grant, 1 layer** | Take zero. A silent world is a compliant output under *"the smallest game"* | Three approved sheets name *"raise the off-screen ambience"* as their first playtest remedy, and `music` ruled `trackCount: 0`, so zero here means the game has no continuous sound at any point in its life | One row. Set `layerCount: 0`, keep every `forbidden` row |
| **Take it as 1 layer, not 2** | Two: a soft air bed plus the ambience, which one approved consequence line offers | It doubles the only permanently-resident asset class in a build with zero uploaded images and zero uploaded meshes, for a distinction nobody can state on a phone speaker | One layer object plus an MB claim. `RR2` reverses |
| **Global-2D, not positional** | Positional emitters, which is the one variation channel `R5` leaves legal | A world-fixed emitter steps in level and pan at passage, which `setting/04` `W1` forbids, and its geometry changes with bay length, which `tone/03` forbids | Moderate: it re-opens roll-off, the nine-lane concurrency case, and `mix`'s cap |
| **No nameable creature call** | Distant birdsong, the genre's default for *life beyond the edge* | It names a creature `setting/01`'s criterion 4 counts, and a call is a transient, which makes the loop seam audible on every lap | One descriptor clause, plus a revision against `setting/01` criterion 4 that `RR1` already opens |

**The ruling I would most like from you: whether this game has a continuous sound at all.** My
recommendation is one layer as written, on one argument — with `trackCount: 0` and `B1`, `B2` and
`B4` extinct past area 8, the steady-state soundscape of this game is `B3` at roughly
93–157-second intervals, `B5`, and whatever this key holds. If that is nothing, the game's
terminal state is a loop of two cues over silence.
