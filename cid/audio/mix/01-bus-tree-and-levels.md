# 01 — The bus tree and the only levels this game will ever have

**Domain:** audio/mix · **Category:** Audio · **Wave:** 6

## Decision

**Six `SoundGroup` buses — `Master` → `Stingers`, `Interface`, `World`, `Beds`, and `World` → `WorldNeighbour` — with membership set by the `Sound.SoundGroup` property and level set by the product of `Sound.Volume` and the bus chain, giving five strictly-decreasing beat levels 0.850 > 0.748 > 0.646 > 0.432 > 0.330.** This sheet carries the proposed key `mix` whole, including every value sheets `02`–`04` derive, because the merger admits one proposing sheet per key.

## Why

**A bus exists only if something ducks it, attenuates differently, or is stolen from at a different priority.** *"Target: the smallest game that still gives every creative area real work"* `[brief: binding]` (`00-CORE.md`) forbids a bus that exists to organise a lead's output. Each of the six passes that test: `Stingers` is the only duck cause; `World` is the only 3D bus; `WorldNeighbour` is the only cue class `social/03` `X10` lets reach a second client; `Interface` is the only bus that is never ducked; `Beds` is the only continuous one; `Master` is the single knob a hotfix can move `[cid: decided]`.

**A bus with no member is not built.** `03-META.md` priority 3 is hard as a gate and forbids an unused bus held open for anything. So `buses[].builtWhen` is a predicate over another key's value — `Beds` exists iff `ambience.layerCount > 0`, `World` iff `sfx` has a row, `WorldNeighbour` iff `sfx` rules a neighbour's clear positional. That is not a reservation; it is a build condition naming its owner `[cid: decided]`.

**Level lives in two properties and both are mine.** `Volume` is 0–10 on both `Sound` and `SoundGroup`, engine defaults 0.5 and 1, and the group's value multiplies its members `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/reference/engine/classes/SoundGroup.yaml]` `[research: https://robloxapi.github.io/ref/class/Sound.html]`. Membership is by property, **not** by parenting, and groups nest `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/sound/groups.md]`. So a per-bus level and a per-cue level are the same arithmetic, and two keys writing them would be two writers for one number. `mix.assets.rows[].volume` and `mix.buses[].volume` are the only two writers in the game.

**Why the ladder is realised as a product rather than left to the cue.** `theme/tone/03` ranks `B1 > B2 > B3 > B4 > B5` with no ties, and `notices` states that loudness alone cannot carry the rank at a phone-speaker ceiling. The split I take: **the inter-bus half of the ranking is level and is mine; the intra-bus half (`B1` against `B2` against `B3`) is level too, but its figures sit in the ledger rows the owning key writes a descriptor for.** Nothing here decides what a cue is made of.

**`0.85` is the top, not `1.0`, and the 0.15 is deliberate.** Three `Stingers` voices are audible together on 4.3% of laps (`core-loop/02`); at unity their uncorrelated power sum is above the output ceiling and the loudest moment in the game would clip on a phone speaker. The trim in sheet `02` handles the rest `[playtest unknown]`.

**`Master` is pinned at 1.0 and that pin is load-bearing.** Whether `SoundGroup.Volume` compounds along a nested chain is not stated on any page fetched `[research owed: a Roblox page or engine reference stating whether a nested SoundGroup's Volume multiplies its parent's, or one Studio read of a member Sound's realised level under two nested groups]`. Pinning `Master` at 1.0 means the question can affect exactly one field, `WorldNeighbour`, and the manifest carries its realised target beside its property value so a builder writes whichever achieves it.

**`Sound.PlaybackSpeed` and `SoundService.DopplerScale` are level's two back doors and both are shut.** Doppler is on by default at scale 1, so a positional `B5` heard while walking would shift in pitch with `movement.walkSpeed` — which rises with the `pace` upgrade axis, making a cue parameter a function of progress against `theme/tone/03`'s *"No cue's intensity is a function of progress, streak, count, elapsed time, or depth."* `DopplerScale` is written to 0 `[cid: decided]`.

**No player will ever change any of this.** `04-PRESENTATION.md` declined the options pass `[brief: soft]` and `input` is a closed five-verb list, so there is no slider, no toggle and no settings verb. The platform's own volume is the whole of a player's control. That is stated as a consequence in sheet `04` and as `forbidden` `M6` here.

**No key names a module allowed to create a `Sound`, and `game/src` contains none.** `representation` names a legal creator for every `GuiObject` and none for a `Sound`; a repo grep this run returns two matches in `GameConfig.luau` and both are field *names* (`promptingSound` at :700, `liftSound` at :757), not instances `[research: game/src/shared/GameConfig.luau]` `[research: game/src/client/Beats.luau]`. **The bus structure is CID data; the creator is not.** I state the requirement on instance-representation work and place nothing, exactly as `notices` ruled for the notice plate.

**Zero player-facing strings.** `vocabulary`'s casing, length, `allowedPattern` and `bannedWords` bind nothing in this key, and no bus or row id is a coined compound, so no ```coinage``` block is owed under `vocabulary/04`.

```manifest
{
  "provides": "mix",
  "status": "proposed",
  "value": {
    "briefPosition": "OPEN.md §2 is the whole of the brief's audio direction and states no level, distance, count, budget or balance. Every figure in this key is [cid: decided] against a silent brief, at 0 interview questions (OPEN.md §1, audio intent).",
    "playerFacingStrings": 0,
    "instanceClass": {
      "use": "Sound",
      "notAudioPlayer": "the legacy Sound class is not marked deprecated and the Audio API's beta-exit announcement says nothing about its status. Every field in this key exists on both classes, so a later promotion to AudioPlayer would not reopen it."
    },
    "levelOwnership": {
      "writers": ["mix.assets.rows[].volume -> Sound.Volume", "mix.buses[].volume -> SoundGroup.Volume"],
      "noOtherKeyMayWriteEither": true,
      "realisedFormula": "Sound.Volume x SoundGroup.Volume x every ancestor SoundGroup.Volume",
      "engineDefaults": { "Sound.Volume": 0.5, "SoundGroup.Volume": 1, "range": [0, 10] },
      "membershipIsByProperty": "a Sound joins a bus by setting Sound.SoundGroup. Parenting decides spatialisation and nothing else.",
      "nestedGroupVolumeCompounds": true,
      "nestedGroupVolumeStatus": "[research owed: whether a nested SoundGroup's Volume multiplies its parent's]. Master is pinned at 1.0 so the answer can affect exactly one field, WorldNeighbour. If it does not compound, write WorldNeighbour.Volume as 0.165 rather than 0.30; realisedTarget is what the acceptance criterion checks."
    },
    "buses": [
      { "id": "Master", "parent": "SoundService", "volume": 1.0, "spatial": "n/a", "builtWhen": "always", "routes": [], "reservedVoices": 0, "why": "one knob for the whole game, and the pin that contains the nesting question" },
      { "id": "Stingers", "parent": "Master", "volume": 0.85, "spatial": "global2D", "builtWhen": "always", "routes": ["stingers.cues[findReveal]", "stingers.cues[setComplete]", "stingers.cues[areaComplete]"], "reservedVoices": 4, "why": "the only duck cause in the game, and the only bus carrying more than one beat" },
      { "id": "Interface", "parent": "Master", "volume": 0.60, "spatial": "global2D", "builtWhen": "always", "routes": ["uiSound.* — upgradePurchased (B4), any press cue, index open and close, the one system notice"], "reservedVoices": 3, "why": "the only bus that is never ducked and never trimmed" },
      { "id": "World", "parent": "Master", "volume": 0.55, "spatial": "positional3D", "builtWhen": "sfx has at least one row", "routes": ["sfx.* fired at the listening player's own patch positions"], "reservedVoices": 15, "why": "the only 3D bus" },
      { "id": "WorldNeighbour", "parent": "World", "volume": 0.30, "volumeRealisedTarget": 0.165, "spatial": "positional3D", "builtWhen": "sfx rules a neighbour's clear positional", "routes": ["the one cross-player cue social/03 X10 permits: another player's own patch clearing"], "reservedVoices": 5, "reservedVoicesNote": "a sub-reservation inside World's 15, not additional", "why": "the only voice class whose loss costs no stated requirement, and the only fix for the five-stud case in sheet 02" },
      { "id": "Beds", "parent": "Master", "volume": 0.30, "spatial": "global2D by default; positional if ambience declares it", "builtWhen": "ambience.layerCount > 0", "routes": ["ambience.layers[*]"], "reservedVoices": 2, "why": "the only continuous bus; ducks deeper than World because a continuous layer masks more than an intermittent one" }
    ],
    "busCount": 6,
    "buildRule": "a SoundGroup is instantiated only if at least one asset row routes to it. builtWhen is a predicate over another contract key's value, never a slot held open. 03-META.md priority 3 forbids the second thing.",
    "levelLadder": {
      "beats": [
        { "beat": "B1", "cue": "findReveal", "bus": "Stingers", "soundVolume": 1.00, "busChain": 0.85, "realised": 0.850 },
        { "beat": "B2", "cue": "setComplete", "bus": "Stingers", "soundVolume": 0.88, "busChain": 0.85, "realised": 0.748 },
        { "beat": "B3", "cue": "areaComplete", "bus": "Stingers", "soundVolume": 0.76, "busChain": 0.85, "realised": 0.646 },
        { "beat": "B4", "cue": "upgradePurchased", "bus": "Interface", "soundVolume": 0.72, "busChain": 0.60, "realised": 0.432 },
        { "beat": "B5", "cue": "patchClear", "bus": "World", "soundVolume": 0.60, "busChain": 0.55, "realised": 0.330, "contingentOn": "G1 — response.beats[patchClear].channels does not list audio today" }
      ],
      "nonBeats": [
        { "class": "systemNotice", "bus": "Interface", "soundVolume": 0.60, "realised": 0.360 },
        { "class": "uiPress", "bus": "Interface", "soundVolume": 0.45, "realised": 0.270 },
        { "class": "indexOpenClose", "bus": "Interface", "soundVolume": 0.45, "realised": 0.270 },
        { "class": "ambienceLayer", "bus": "Beds", "soundVolume": 0.55, "realised": 0.165 },
        { "class": "neighbourPatchClear", "bus": "WorldNeighbour", "soundVolume": 0.60, "realisedInsideMinDistance": 0.0990, "realisedAt5Studs": 0.0758, "realisedAt3p5Studs": 0.0870 }
      ],
      "rankSource": "theme/tone/03-beat-map, B1 > B2 > B3 > B4 > B5, no ties, and nothing rises with depth. This key realises the inter-bus half.",
      "nonBeatCeiling": 0.432,
      "nonBeatCeilingRule": "no non-beat cue's realised level may reach B4's. The highest is systemNotice at 0.360, which fires once per session and is the one moment something has genuinely gone wrong.",
      "everyFigureIs": "[playtest unknown]. Test range: each realised value +/- 40%, subject to the strict ordering above holding at every point in the range. Instrument: a listening test on the floor device — a 3 GB phone at its own speaker, no earbuds — which no sheet in either contract owns taking.",
      "deviceFloorNote": "00-CORE.md's audience is 8-14 and mobile-heavy [brief: binding], so the ceiling on dynamic range is a phone speaker and a child. The ~70/25/5 split is [brief: soft] and uncorroborated, and no figure here depends on the share."
    },
    "soundService": {
      "writtenByTheBootModule": [
        { "property": "AmbientReverb", "value": "NoReverb", "note": "equals the engine default, written explicitly so a hand pass cannot improve it. A global reverb colours all five beats at once and would make the level ladder untestable." },
        { "property": "DopplerScale", "value": 0, "note": "the engine default is 1. See forbidden M4." }
      ],
      "leftAtEngineDefault": [
        { "property": "RolloffScale", "value": 1 },
        { "property": "DistanceFactor", "value": 3.33 },
        { "property": "VolumetricAudio", "value": "Automatic", "why": "a patch is a 3-stud square; volumetric emission from it is indistinguishable from point emission" },
        { "property": "RespectFilteringEnabled", "value": false },
        { "property": "ReverbEnabled", "value": true, "note": "inert while AmbientReverb is NoReverb" },
        { "property": "OcclusionEnabled", "value": true, "status": "[playtest unknown]" },
        { "property": "DiffractionEnabled", "value": true, "status": "[playtest unknown]" }
      ],
      "defaultsSource": "[research: https://robloxapi.github.io/ref/class/SoundService.html]",
      "firstLeverIfAudioAppearsInTheMicroProfiler": "set OcclusionEnabled and DiffractionEnabled false. Both are per-voice geometry work on a 3 GB phone and no ruling in this key needs either.",
      "notPlaceConfiguration": "these are scriptable properties written by the boot module, so release.publishChecklist gains no fifth row."
    },
    "creatorRequirement": {
      "finding": "no key in either contract names a module permitted to call Instance.new(\"Sound\") or Instance.new(\"SoundGroup\"). representation names a legal creator for every GuiObject and none for a Sound. game/src contains zero Sound instances: the repo grep this run returns two matches, both field names in GameConfig.luau (promptingSound :700, liftSound :757).",
      "requirement": "instance-representation work (architect/sheets/06-representation.md) must name exactly one client-side module permitted to create a SoundGroup and a Sound, and forbid every other module.",
      "ordering": "the six-bus tree must exist before Beats.connect(gui) is called. A cue body that runs first writes SoundGroup = nil and its voice lands unrouted at Master's level — the one failure this key cannot detect at runtime.",
      "sameClassOfFindingAs": "notices, which found that a notice plate cannot be built by any module in the current build order."
    },
    "ducking": {},
    "attenuation": {},
    "concurrency": {},
    "assets": {},
    "provisioning": {},
    "mutedPlay": {},
    "forbidden": [
      { "id": "M1", "thing": "a bus, SoundGroup or level slot with zero members in the merged manifest", "ruling": "03-META.md priority 3, hard as a gate", "observable": "every mix.buses row has a non-empty routes list or a builtWhen predicate naming another contract key" },
      { "id": "M2", "thing": "a SoundEffect of any class on any bus or any Sound — compressor, limiter, equalizer, reverb, echo, flange, chorus, pitch-shift, distortion or tremolo", "ruling": "no key names one; a bus effect colours every cue routed through it and makes the level ladder untestable", "observable": "grep -rn \"SoundEffect\" game/src returns nothing" },
      { "id": "M3", "thing": "SoundService.AmbientReverb at anything but NoReverb", "ruling": "same as M2, and a stone-ruin reverb is the reflexive add", "observable": "the boot module writes NoReverb and nothing writes AmbientReverb twice" },
      { "id": "M4", "thing": "a non-zero SoundService.DopplerScale", "ruling": "theme/tone/03 — a Doppler shift makes B5's pitch a function of movement.walkSpeed, which rises with the pace upgrade axis, so a cue parameter would read progress", "observable": "DopplerScale == 0 in the boot module" },
      { "id": "M5", "thing": "a write to Sound.PlaybackSpeed by any key other than sfx's ruling on the per-tierIndex clear note", "ruling": "a global speed write is a mix-level pitch shift wearing a cue's name", "observable": "grep -rn \"PlaybackSpeed\" game/src matches only the clear cue's play site" },
      { "id": "M6", "thing": "a volume control, mute toggle, caption, subtitle or audio-settings surface", "ruling": "input is a closed five-verb list; 04-PRESENTATION.md declined the options pass; navigation.notNodes contains settings", "observable": "zero controls anywhere in game/src write a SoundGroup.Volume from a player action" },
      { "id": "M7", "thing": "any runtime write to SoundGroup.Volume other than the ducking envelope", "ruling": "two writers for one number is the divergence this key exists to remove", "observable": "the envelope is the only writer and it restores exactly to mix.buses[].volume" },
      { "id": "M8", "thing": "a per-player, per-device or per-platform mix variant", "ruling": "00-CORE.md's ~70/25/5 split is [brief: soft] and uncorroborated per cid/_state.md; nothing may depend on the share", "observable": "mix contains no field keyed to a device class, a platform or a UserId" },
      { "id": "M9", "thing": "any level, duck depth, trim, pool size or cap that is a function of area ordinal, depth, progress, streak, count, elapsed time or player count", "ruling": "theme/tone/03 — no cue parameter reads those inputs", "observable": "zero fields in mix read any of the seven" },
      { "id": "M10", "thing": "ducking a non-audio channel — dimming a HUD readout, shortening a notice dwell, or suppressing an atPatch effect under audio load", "ruling": "notices owns dwell, composition owns the readout, VFX owns atPatch; this key writes no visual property", "observable": "mix names no GuiObject, no Transparency and no dwellSeconds" },
      { "id": "M11", "thing": "dropping, refusing, queuing, batching, delaying, shortening or fading out an onset for load", "ruling": "response.onOverload is \"overlap\"; performance/03 N14 forbids the alternatives", "observable": "concurrency.stealing.order step 3 plays the onset regardless; no field in mix names a queue" },
      { "id": "M12", "thing": "a second listener, a listener that is not the player's own character, or a runtime write to SoundService.DefaultListenerLocation", "ruling": "one player, one listener; social/03 X7 forbids a second player's identity crossing the wire", "observable": "grep -rn \"DefaultListenerLocation\\|AudioListener\" game/src returns nothing" },
      { "id": "M13", "thing": "uploading an audio asset where a Creator Store asset would serve", "ruling": "an upload costs two provisioning gates, a moderation queue and a per-experience permission grant; a store asset costs none of them", "observable": "every mix.assets row whose source is \"upload\" carries a non-empty whyNotCreatorStore" },
      { "id": "M14", "thing": "a reserved cue slot, empty SoundGroup, unused bus, placeholder id or future field for a progress-reset system, offline accrual, a code redeem, a daily reward, a leaderboard or rank, a trade or gift, or any calendar-keyed layer", "ruling": "03-META.md priority 3, hard as a gate; naming one in order to forbid it is compliant and silence is not", "observable": "every row in mix.buses and mix.assets.rows has a named owning key" },
      { "id": "M15", "thing": "a loading, shutdown, maintenance, restart, reconnect or connection-lost sound", "ruling": "release.shutdown.playerFacing is \"nothing\"; performance/03 N15 forbids a loading screen", "observable": "no row in mix.assets.rows carries one of those causes" }
    ],
    "revisionRequests": []
  }
}
```

*The five empty objects and the empty `revisionRequests` above are filled by sheets `02`, `03` and `04`, which carry `amends` blocks against this key. They are written as empty containers rather than omitted because `tech/deploy/02` makes an absent key and an explicit null the same bytes at runtime.*

## Consequences for other work

- **Instance-representation work (`architect/sheets/06-representation.md`).** One client-side module gains the right to call `Instance.new("SoundGroup")` and `Instance.new("Sound")`; every other module loses it. That module runs before `Beats.connect`. Without this, all six audio keys are specced and unbuildable — the state `notices` found the notice plate in.
- **Reward-hit work (`stingers`).** Your three cues sit on one bus at `0.85`, and `B1 > B2 > B3` is realised by `assets.rows[].volume` 1.00 / 0.88 / 0.76. You set the descriptor, the audible length and the construction; you do not set `Volume` and you do not name a bus.
- **Interface-sound work (`uiSound`).** `B4` and every non-beat interface cue route to one bus at `0.60`, never ducked, never trimmed. Your press cue's realised ceiling is `0.270` and the system notice's is `0.360`; neither may reach `B4`'s `0.432`.
- **In-world-sound work (`sfx`).** Two buses, not one. Your own-work rows route to `World`; the one cue `X10` permits to reach a second client routes to `WorldNeighbour` and shares its asset at zero extra bytes. If you rule the neighbour's clear silent or global-2D, `WorldNeighbour` is not built and nothing else in this key moves.
- **Continuous-layer work (`ambience`).** `Beds` exists iff `layerCount > 0`. Its level is `0.30` and a layer's own `Volume` is `0.55`, giving a realised `0.165` — one fifth of the loudest beat. If you take a positional design, sheet `02` supplies the profile; if you take none, the bus is not created and that is not a hole.
- **Music work (`music`).** `trackCount: 0` contributes zero rows and zero MB. Nothing here assumes a track and nothing reserves a bus for one.
- **Boot-configuration work (`world`).** Two `SoundService` writes — `AmbientReverb` `NoReverb`, `DopplerScale` `0` — and seven properties explicitly left at their defaults.

## Acceptance criteria

1. `mix.buses` has exactly 6 rows, and the five `mix.levelLadder.beats` realised values are strictly decreasing with no two equal: `0.850 > 0.748 > 0.646 > 0.432 > 0.330`.
2. Every `mix.levelLadder.nonBeats` realised value is strictly below `nonBeatCeiling` `0.432`; the maximum is `systemNotice` at `0.360`.
3. `grep -rn 'Instance.new("Sound' game/src` matches lines in exactly one module, that module is the one named in `mix.creatorRequirement.requirement`, and `grep -rn "SoundEffect" game/src` returns nothing.
4. Every `mix.buses` row whose `builtWhen` is not `"always"` names another contract key in its predicate, and no bus present in a built tree has an empty `routes` list.

## Flagged to the developer

**Every level in this key is `[cid: decided]` against a brief that was never asked about audio** — `OPEN.md §1` records audio intent at 0 questions, and `OPEN.md §2` describes character with no level, distance or budget in it. The live alternatives are (a) a flatter ladder that leans on construction rather than level, which risks `B4` and `B5` reading as one thing on a phone speaker; (b) **this ladder, my recommendation**, a four-to-one spread from `B1` to `B5`; (c) a wider spread that makes `B5` nearly inaudible and hollows out the game's most repeated event. Moving `mix.buses[].volume` and `mix.assets.rows[].volume` is the only edit any of the three needs.

## Not decided here

The ducking rule, the attenuation profiles and the concurrency cap — sheet `02`, this domain, which amends this key. The asset register, the memory split, preloading and the provisioning form — sheet `03`. The muted-play invariant and the reading-to-carrier table — sheet `04`. What any cue is made of, its audible length, its descriptor and its variation rule — `stingers`, `sfx`, `uiSound` and `ambience`, each in its own key. Whether `patchClear` has an `audio` channel at all (**G1**) — in-world-sound work, by revision request against `gameplay/mechanics/05`; both resolutions are legal here. Whether music exists — ruled `trackCount: 0` by music work, not reopened. Which module creates the `Sound` and where it sits in the build order — instance-representation work, requested above and placed by nobody in CID.
