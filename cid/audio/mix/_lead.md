# Mix — domain index

**Category:** Audio · **Wave:** 6 · Reads: `concept/spec/incremental-spinoff-v2/HANDOFF.md`,
`CONCEPT.md`, `00-CORE.md`, `02-GAMEPLAY.md`, `03-META.md`, `04-PRESENTATION.md`, `OPEN.md` ·
`cid/audio/_category.md` · `cid/_contract.md`, `cid/_state.md`, `cid/_playtest.md` ·
`cid/gameplay/mechanics/05-response-contract.md` · `cid/gameplay/social/01`, `/02`, `/03` ·
`cid/gameplay/meta/05-area-layout.md`, `/06-plot-arrangement.md` ·
`cid/tech/performance/01-device-floor-and-budgets.md`, `/03-what-optimisation-may-never-do.md` ·
`cid/tech/deploy/01-the-release-contract.md`, `/02-no-explicit-null-in-emitted-config.md` ·
`cid/ui-ux/feedback/01-the-notice-channel.md` · `cid/theme/tone/03-beat-map.md`, `/04-do-nots.md` ·
`game/src/client/Beats.luau`

## The contract key this domain needs

**`mix` does not exist.** I checked all 25 merged keys in `cid/_contract.md` and every `provides`
string under `cid/**` (55 distinct keys across merged and proposed). Nothing named `mix`,
`audio`, `buses`, `sound` or `attenuation` is claimed by any sheet. **This domain owns no merged
key and proposes exactly one.**

`mix` would hold: the `SoundGroup` tree and each bus's default `Volume`; the ducking rule for
cues that land inside `response.minOnsetGapSeconds`; the per-bus 3D attenuation profile
(`RollOffMode`, `RollOffMinDistance`, `RollOffMaxDistance`, `EmitterSize`) and the radius at
which another player's work stops being audible; the cap on simultaneously playing `Sound`
instances and the stealing order at that cap; the asset register — every audio asset the six
Audio domains may hold, with its owning domain, its MB allowance against
`budgets.memoryCeilingsByCategory.Sounds`, its source class and the sentinel its id field carries
before the asset exists; and the muted-play invariant, `audioOnlyBeats: 0`.

**One sheet proposes it.** `bridge/merge.mjs:132–141` admits exactly one proposing sheet per key
(`tech/deploy/01` established this), so sheet `01` carries `mix` whole and sheets `02`–`04` carry
no `manifest` block, state their contribution, and route their values into `01` — the shape
`social/01`+`02`, `performance/01`+`03` and `deploy/01`+`02` already use.

## What the brief gave me

- *"Warm, organic, tactile. Clearing is a soft rustle-and-snap; each rarity tier a distinct
  pitched note; a relic reveal owns the best sound in the game. An area's completion gets a short
  resolving chord — the only 'achievement' sound. Music sparse and low."* `OPEN.md §2`
  `[brief: soft]` ← `[I assumed]`. **This is the whole of the brief's audio direction and it says
  nothing about level, balance, distance, count or budget.** It is a character brief, not a mix
  brief. Every value this domain writes is `[cid: decided]` against a silent brief.
- *"8–14, mobile-heavy, short sessions."* `00-CORE.md` `[brief: binding]` ← `[you chose: R1 Q4]`.
  The device floor is a phone speaker and a child. There is no dynamic range to spend.
- *"~70% mobile / ~25% desktop / ~5% console"* `00-CORE.md` `[brief: soft]` ← `[I assumed — the
  split]`, and uncorroborated by anything fetched (`cid/_state.md`). The band binds; the ratio
  does not, and nothing here may depend on the share.
- *"Consequence: audio and visual feedback carry the entire load."* `02-GAMEPLAY.md`
  `[brief: soft]` ← `[you accepted: step 6 Q2]`.
- *"nobody downstream should invent tension to fill the gap."* `02-GAMEPLAY.md`, elevated by
  `HANDOFF.md`; relayed at `[brief: binding]` strength by `theme/tone/03`. No ramp, no swell, no
  cue whose intensity is a function of progress.
- *"Target: the smallest game that still gives every creative area real work."* and *"Success is
  shipped artifacts, not players."* `00-CORE.md` `[brief: binding]` ← `[you chose: R1 Q3]`. No bus
  exists to give a lead something to do; the output is checkable data.
- *"Declined: a full pass with colourblind mode, text scaling and sensitivity options — out of
  scope at this size."* `04-PRESENTATION.md` `[brief: soft]` ← `[you accepted: R6 Q4]`. **There is
  no options screen and no settings verb**, so the defaults sheet `01` writes are the only mix any
  player will ever have.
- *"Hard constraint: rarity tiers must differ by shape or silhouette, not only hue."*
  `04-PRESENTATION.md` `[brief: soft]` ← `[you accepted: R6 Q4]`. Tier is solved in silhouette, so
  audio may add a tier channel and may never be one.
- *"Shared server, parallel progression, own areas, no mechanical interaction."* `02-GAMEPLAY.md`
  `[brief: soft]` ← `[you accepted: R6 Q2]`. Every cue is heard beside up to fifteen other players
  doing the same thing.
- *"Ships and settles. No seasons or events."* `OPEN.md §2` `[brief: soft]`, and `03-META.md`
  priority 3. No reserved bus, no empty group, no "future" field.

**Settled elsewhere and binding on me, not re-decided here:** `response`
(`minOnsetGapSeconds` 0.6, `minSustainedOnsetsPerSecond` 8, `onOverload: "overlap"`,
`negativeBeats: 0`, `lockoutsSeconds: 0`, and the per-beat `channels` arrays); `theme/tone/03`'s
ranking `B1 > B2 > B3 > B4 > B5` with no ties and nothing rising with depth; `theme/tone/04` `D3`
and `D4`; `notices` (audible-length caps 3.0 s for `B2`, 2.5 s for `B3`, and
`forbidden.noticeSound`); `budgets` (`Sounds` 20 MB, `StreamingMinRadius` 160,
`StreamingTargetRadius` 512, `loadToFirstInputSeconds` 6.0/7.0 on mobile, `textureCeilings`
zero uploaded assets in world geometry); `performance/03` `N14`, `N15`, `N17`; `plots`
(`pitchStuds` 122, `laneWidthStuds` 120, bays up to 480 studs long); `layout`
(`chunk.edgeKeepoutStuds` 1.5); `social` (`maxCoPresenceSeparationStuds` 128, `X10`, `X11`);
`release` (`unprovisionedIdValue` 0, `buildMustRunAtEveryGate` true, publish-first);
`deploy/02` (an emitted value may never be an explicit null).

## What the brief did not give me

Nine gaps. Each is routed to the sheet that will have to decide it, or off this domain.

1. **No loudness, level or dynamic-range position exists anywhere in the brief or either
   contract.** `OPEN.md §2` describes character and nothing else. → sheet `01`, as `[cid: decided]`
   values flagged to the developer.
2. **Nothing states whether another player's work is audible, or from how far.**
   `social/02` B3 is a *sight* requirement; `social/03` X10 permits *"A's own patches clearing —
   the instance disappearing and the clear cue that accompanies it"* to reach a second client
   without saying whether that cue exists or how far it carries; `plots.pitchStuds` 122 and
   `budgets.streaming` 160/512 are geometry, not audibility. This is the category's **G7**.
   → sheet `02` (the roll-off half). Whether a neighbour's `B5` is authored as a 3D cue at all is
   **not mine** and belongs to in-world-sound work [currently Audio — SFX].
3. **No sheet in either contract owns a simultaneous-sound cap, and Roblox publishes none.**
   Established by fetch, not assumed — see *Research owed*. → sheet `02`, `[playtest unknown]`.
4. **`budgets` gives six domains one number and no rule for spending it.** 20 MB, `[playtest
   unknown]` at ±60%, with no per-domain allocation and no asset count. → sheet `03`.
5. **No key owns `SoundService`, a `SoundGroup`, or the creation of a `Sound`.** The category's
   **G5**. `representation` names legal creators for every `GuiObject` and none for a `Sound`;
   `Beats.luau` holds only a `ScreenGui` and its five cue bodies are empty. → sheet `01` raises it
   and states the requirement; **placing it is instance-representation work** [currently
   `architect/sheets/06-representation.md`], not CID's, exactly as `notices` ruled for the notice
   plate.
6. **`release.provisioning.gates` has six ordered gates and none of them mentions audio.** The
   category's **G2**. → sheet `03`, as a revision request against
   `cid/tech/deploy/01-the-release-contract.md`. I do not add it to `release` myself; that key has
   one owner.
7. **`budgets.memoryCeilingsByCategory` names `Sounds` and omits `StreamingSounds`**, which is the
   second of the two audio categories PlaceMemory actually reports
   `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/studio/optimization/memory-usage.md]`.
   A long looping asset that the engine streams is therefore budgeted by nothing and would land in
   `headroomForUntracked`. → sheet `03`, as a revision request against
   `cid/tech/performance/01-device-floor-and-budgets.md`.
8. **No audio accessibility position exists.** The category's **G9**. The brief's one hard
   accessibility constraint is visual, the options pass was declined, and `input` is a closed
   five-verb list — so there is no volume control, no mute, no caption and no settings verb. → sheet
   `04`.
9. **Nothing in this pipeline has ever heard this game.** `cid/_playtest.md` is `n = 1`, area 1,
   with no audio in the build, and `tech/performance/01` already records that **no sheet in either
   contract owns taking a measurement**. Every figure across all four sheets is a prediction. → all
   four sheets carry `[playtest unknown]` with a test range and a named instrument; the missing
   listening test is recorded for the final cross-category pass.

**Deliberately not taken, and why.** The one system notice (`ui-ux/feedback/03`) and whether it
has a sound is interface-sound work, not mine — I own how loud it would be, not whether it exists.
Whether music exists at all is the Music ruling (**G3**). Whether `patchClear` gets its `audio`
channel back is **G1** and belongs to in-world-sound work; sheets `02` and `03` must be written so
that both resolutions are legal, because the concurrency case and roughly half the asset budget
depend on it. Wave-1 citation drift (**G6**) is cited at the shipped ids and flagged, not repaired.

## Why 4 sheets

**One key, so one carrier, plus three sheets that constrain it rather than being it.** Sheet `01`
proposes `mix` and holds every value. Sheet `02` is one decision stated three ways, not three
decisions: `response.onOverload` is `"overlap"` and `performance/03` `N14` forbids dropping,
batching or delaying any cue for frame budget, so *dropping and deferring are already illegal* and
the only legal degradations left are quieter-because-something-else-is-playing (ducking),
quieter-because-it-is-far-away (roll-off) and not-a-voice-at-all (the cap and its stealing order).
Those three share one binding constraint and one arithmetic, and separating them produced three
sheets that would each have had to restate the other two. Sheet `03` is the asset register — one
table whose rows are the only place an MB allowance, a source class and an id sentinel can be
stated together, and the sentinel question is only answerable per row. Sheet `04` is a prohibition
set with no values of its own, which is why it is not folded into `01`: it constrains what any bus
may ever be the sole carrier of, and a level sheet that also held its own escape clause would be
the sheet that widens it. **I considered and rejected a seven-sheet split** mapping one sheet to
each item of `owns` plus one per structural gap; it would have produced four sheets whose only
content was a cross-reference, which is the wave-1 failure the contract anchor exists to stop.

| # | sheet | must decide |
|---|---|---|
| 01 | `bus-tree-and-levels` | Decide the `SoundGroup` tree parented under `SoundService` — how many buses, their names, their nesting, and which cue class of each of the six Audio domains routes to each — and each bus's default `Volume` at the phone-speaker floor, given `Sound.Volume` and `SoundGroup.Volume` are both 0–10 and multiply (engine defaults 0.5 and 1) and that `04-PRESENTATION.md` gives the player no volume control, so these defaults are the only mix that will ever exist; rule that the bus *structure* is CID data while the *creator* is not, stating as a requirement on instance-representation work that no key in either contract today names a module permitted to call `Instance.new("Sound")` or `Instance.new("SoundGroup")` and that one client-side boot module must build the tree before the first cue can fire; and **carry the `mix` key whole in this sheet**, including every value sheets 02–04 derive, because the merger admits one proposing sheet per key. |
| 02 | `degradation-under-load` | Decide the three legal degradations, given `response.onOverload` is `"overlap"` and `performance/03` N14 forbids dropping, batching or delaying any cue: (a) the ducking rule for cues landing inside `minOnsetGapSeconds` 0.6 — which bus ducks, by how much, over what attack and release — for the `B1`→`B2`→`B3` chain that fires on one clear on 4.3% of laps under `notices`' 3.0 s and 2.5 s audible caps, expressed as a level change and never as a suppression; (b) the per-bus 3D attenuation profile (`RollOffMode`, `RollOffMinDistance`, `RollOffMaxDistance`, `EmitterSize`) and which buses are 3D at all, noting that the engine default `Inverse` ignores `RollOffMaxDistance` entirely and therefore never culls a voice, that the nearest a neighbour's clearing patch can be is about 5 studs (lane width 120, `layout.chunk.edgeKeepoutStuds` 1.5, boundary 2) and **not** the 122-stud plot pitch, that the farthest inside one streamed set is about 684 studs, and that a neighbour's clear is the only cross-player sound `social/03` X10 permits while X11 and `theme/tone/03` forbid any cue for another player's join, leave, reveal or completion; and (c) the cap on simultaneously playing `Sound` instances and what is stolen first when it is reached, derived from `response.minSustainedOnsetsPerSecond` 8 per player across the up-to-9 lanes a 512-stud `StreamingTargetRadius` loads at a 122-stud pitch — 72 onsets/s worst case, ≈29 concurrent voices at a 0.4 s audible length — against the established fact that Roblox publishes no simultaneous-sound limit at any device tier. Every figure `[playtest unknown]` with a test range and a named instrument, and the sheet must stay legal under both resolutions of G1. |
| 03 | `the-asset-ledger` | Decide the asset register: every audio asset the six Audio domains may hold, as rows carrying owning domain, cue class, bus, intended audible length, mono or stereo, source class (`creatorStore` or `upload`) and MB allowance, summing to at most `budgets.memoryCeilingsByCategory.Sounds` 20 MB at the floor device, and state what is preloaded against `loadToFirstInputSeconds` 6.0 s target / 7.0 s ceiling given audio is the first uploaded asset class in a build whose `textureCeilings` are zero uploaded images and zero uploaded meshes; declare, once for all six domains, the sentinel an audio id field carries before its asset exists, ruling that `release.provisioning.unprovisionedIdValue` `0` does **not** transfer because `Sound.SoundId` is a `ContentId` string whose engine default is empty and `tech/deploy/02`'s `"none"` scalar would be an unresolvable content string rather than silence, and state the guard rule plus the acceptance criterion that a build with every audio id unprovisioned boots, plays nothing and warns nothing; file a revision request against `cid/tech/deploy/01-the-release-contract.md` adding audio to `release.provisioning.gates` as **two** ordered steps after gate 1 — upload, then grant the published experience permission, because an uploaded audio asset is private and *"cannot load in Studio or at runtime"* without an explicit grant, which is the same publish-first inversion `gamePassId` already has; and file a second against `cid/tech/performance/01-device-floor-and-budgets.md`, whose `memoryCeilingsByCategory` names `Sounds` and omits `StreamingSounds`. |
| 04 | `muted-play` | Decide the muted-play invariant as data a later sheet cannot widen without failing a criterion: carry `audioOnlyBeats: 0` **derived from `response`'s per-beat `channels` arrays and shown as the walk**, not asserted (`patchClear` `atPatch`+`readout`, `findReveal` `atPatch`, `setComplete` and `areaComplete` `notice`, `upgradePurchased` `readout`); list every state, count, tier, rank and progress reading in the game beside the non-audio channel that already carries it; and state the forbidden set — no cue may be the sole carrier of any of them, no ducking rule in sheet 02 may quieten a non-audio channel, audio may add a rarity channel but may never *be* one because `04-PRESENTATION.md` puts tier in silhouette, and no sibling Audio key may add a member whose only channel is audio. State as a consequence that no volume, mute, caption or audio-settings surface exists — `input` is a closed five-verb list and `04-PRESENTATION.md` declined the options pass — so the platform's own volume is the player's only control and a large share of an 8–14 mobile audience plays this game silently by default. Where you believe audio *should* carry something alone, route it as a finding to the owner of the other channel (world-effect work for `atPatch`, HUD-readout work for `readout`, transient-message work for `notice`) and do not decide it here. |

## Verification note

**Sheet `02` is the one most likely to be contradicted, and by in-world-sound work
[currently Audio — SFX].** Its entire load case rests on two rulings that are not mine: whether
`patchClear` recovers an `audio` channel at all (**G1**, `response.beats[patchClear].channels` is
`["atPatch","readout"]` while three other sources give clearing a sound), and whether a
neighbour's clear is authored as a positional cue (**G7**). If `B5` gets no sound, the 72
onsets/s worst case collapses to the sequenced beats alone and the cap is over-built by roughly an
order of magnitude; if the neighbour's cue is ruled global-2D or silent, the roll-off profile has
almost nothing to attenuate. **The sheet must be written so both resolutions are legal** — a cap
and a curve stated against a load that may not arrive, with the arithmetic shown so the figure can
be re-derived rather than re-argued.

Second most likely: sheet `03`, contradicted by device-budget work if
`budgets.memoryCeilingsByCategory.Sounds` moves off 20 MB — it is `[playtest unknown]` at ±60%, so
the honest range is 8–32 MB and the per-domain split must be stated as shares as well as figures.
Third: sheet `02`'s ducking window, if reward-hit work takes `notices`' offered revision and raises
the `B2`/`B3` dwell inside its 5.0 s ceiling.

## Research owed

`must_verify` for this node is empty in `docs/cid-workflow.json`. The category brief nonetheless
required two things be fetched and not recalled — a `SoundId` sentinel and the platform's rules for
assets you did not upload — and the concurrency cap required a third. **All three were fetched.**
Everything below lands in `cid/_research/pack.md` and is the only external evidence the writer has.

**Fetched and banked**

- `Sound` defaults: `SoundId` empty, `Volume` 0.5 (range 0–10), `RollOffMode` `Inverse`,
  `RollOffMinDistance` 10, `RollOffMaxDistance` 10000, `EmitterSize` 10, `PlaybackSpeed` 1,
  `Looped` false `[research: https://robloxapi.github.io/ref/class/Sound.html]`;
  `Volume` *"can be set between 0 and 10"*, `RollOffMinDistance` is *"the minimum distance, in
  studs, at which a Sound which is parented to a BasePart or Attachment will begin to attenuate"*
  `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/reference/engine/classes/Sound.yaml]`.
- `RollOffMode`: `Inverse` (0) attenuates as `RollOffMinDistance/distance` and **does not use
  `RollOffMaxDistance`**; `Linear` (1) and `LinearSquare` (2) attenuate *between* min and max;
  `InverseTapered` (3) is the lesser of the two
  `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/reference/engine/enums/RollOffMode.yaml]`.
  **This is the load-bearing one for the cap:** at the engine default nothing is ever culled by
  distance.
- Parenting decides spatialisation: child of a `BasePart` or `Attachment` is positional; *"within
  `SoundService` or `Workspace`"* is global, *"volume and pan position remain the same regardless
  of the user's sound listener position"*; and *"low `RollOffMaxDistance` values cause audio to
  abruptly cut off"*
  `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/sound/objects.md]`.
- `SoundGroup` is *"used to manage the volume and sound effects on multiple Sounds at once"*, its
  `Volume` is a 0–10 multiplier applied to member sounds, membership is by the `Sound.SoundGroup`
  property and **not** by parenting, and groups nest
  `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/reference/engine/classes/SoundGroup.yaml]`
  `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/sound/groups.md]`.
- `SoundService` defaults: `RolloffScale` 1, `DistanceFactor` 3.33, `DopplerScale` 1,
  `AmbientReverb` `NoReverb`, `VolumetricAudio` `Automatic`, `RespectFilteringEnabled` false,
  `ReverbEnabled` true, `OcclusionEnabled` true, `DiffractionEnabled` true
  `[research: https://robloxapi.github.io/ref/class/SoundService.html]`
  `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/reference/engine/classes/SoundService.yaml]`.
- Audio upload limits: `.mp3`, `.ogg`, `.wav` or `.flac`, *"less than 20 MB in size and 7 minutes
  in duration"*, ≤ 48 kHz, mono or stereo; import caps 2,000 per 30 days ID-verified, 100
  unverified; the Creator Store carries *"more than 100,000 professionally-produced sound effects
  and music tracks"* free to use
  `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/audio/assets.md]`.
  **Note the coincidence worth stating in sheet 03:** one file's upload ceiling is the whole
  category's runtime memory budget.
- Audio privacy: uploaded audio is private, *"only you can view and use it"*, and usage permission
  is granted per experience; the flow is Creator Hub → Creations → Asset Details → Permissions and
  *"your friend will need to insert it into their experience to grant that experience access"*
  `[research: https://devforum.roblox.com/t/new-asset-privacy-and-permissions-features-for-audio-and-video/2725248]`.
  A restricted asset without permission *"cannot load in Studio or at runtime"*
  `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/production/creator-store.md]`.
  **This is the provisioning finding:** granting an experience permission requires the experience
  to exist, so audio inherits `release` gate 1 (publish first) and needs two gates, not one.
- PlaceMemory reports **two** audio categories — `Sounds` (*"in-memory sounds"*) and
  `StreamingSounds` (*"streaming sounds"*) — among 22
  `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/studio/optimization/memory-usage.md]`.
  This also closes `tech/performance/01`'s own `[research owed:]` for the PlaceMemory category tree.
- *"Audio files can be a surprising contributor to memory usage, particularly if you load all of
  them into the client at once rather than only loading what you need for a portion of the game"*
  — the platform's only guidance on audio memory, and it is a sentence, not a number
  `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/performance-optimization/improve.md]`.
  The same page also supplies the `CanTouch`/`CanQuery` guidance `tech/performance/01` recorded as
  owed.
- `ContentProvider:PreloadAsync` *"yields until all of the assets associated with the given
  Instances have loaded"* and handles instances with content links *"such as `Decal` and `Sound`"*;
  best practice is *"only preload essential assets, not the entire Workspace… You might get
  occasional pop-in, but it decreases load times"*
  `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/reference/engine/classes/ContentProvider.yaml]`.

**Established as absent, which is a result and not a failure**

- **Roblox publishes no simultaneous-sound limit, at any device tier, anywhere.** Four fetches
  found only community measurement: one benchmark reporting normal operation to ~400 synchronised
  instances, desync at 401–500 and progressive cutout above, explicitly on an Intel i5-12500H with
  16 GB and *"no Roblox staff confirmation"*
  `[research: https://devforum.roblox.com/t/total-sound-instance-limit/3736250]`; and one report of
  a background music track silently entering a playing-but-inaudible state at *"maybe around 25"*
  rapid GUI one-shots, also unconfirmed
  `[research: https://devforum.roblox.com/t/sound-play-limitations/552486]`. **Neither is a phone
  and neither is a platform statement.** The second is the only phone-adjacent evidence and it is
  the failure mode this domain must prevent, so it belongs in the sheet as the observed floor of a
  test range rather than as a limit. The cap is `[playtest unknown]`.

**Could not settle — named with the fetch that would close each**

- What routes an audio asset to `StreamingSounds` rather than `Sounds` — length, `Looped`, or an
  engine heuristic. The memory-usage page names both categories and explains neither.
  `[research owed: a Roblox page or engine reference stating the criterion by which an audio asset
  is streamed rather than held in memory]`
- Whether a non-empty but unresolvable `SoundId` produces a warning in the client output. Sheet
  `03`'s sentinel ruling reasons that it does, which is why `"none"` is rejected in favour of the
  engine's own empty default; the reasoning stands on the ContentId type and on the *"cannot load
  at runtime"* line, not on an observed message.
  `[research owed: create.roblox.com/docs/reference/engine/classes/Sound#SoundId with the error
  behaviour panel, or a devforum thread quoting the output-window message for a failed sound load]`
- A per-voice CPU or memory cost on a 3 GB phone. Nothing published, and
  `tech/performance/01` already records that no sheet in either contract owns taking a measurement.
  `[research owed: a Developer Console → Memory and MicroProfiler reading on the floor device at
  4, 16 and 64 simultaneous Sounds — this is a listening test, and it is added to the same unowned
  list]`
