# 04 — Muted play: `audioOnlyBeats: 0`, derived and closed

**Domain:** audio/mix · **Category:** Audio · **Wave:** 6

## Decision

**`audioOnlyBeats: 0`, derived from `response`'s five per-beat `channels` arrays rather than asserted, and held as an invariant no later sheet can widen: every state, count, tierIndex, rank and progress reading in this game already has a non-audio carrier, and no cue in any of the six audio keys may become the sole carrier of one.**

## Why

**It is a fact about the merged contract, not a design goal, and here is the walk.** `response.beats[].channels` reads `patchClear ["atPatch","readout"]`, `findReveal ["atPatch","audio"]`, `setComplete ["notice","audio"]`, `areaComplete ["notice","audio"]`, `upgradePurchased ["readout","audio"]` `[research: game/src/shared/GameConfig.luau]`. Count the members that are not `"audio"`: 2, 1, 1, 1, 1. The minimum is **1**, so the number of beats whose only channel is audio is **0**. That arithmetic is the whole ruling, and it is checkable against the merged manifest without a running game.

**The category handed me an unsourced motive and I am not restating it.** `cid/audio/_category.md` derives the invariant from *"a large share of sessions run with no sound at all"*, which nothing in this repo supports. The one survey any writer in this category reached reports **34.9% always / 23.6% often / 19% sometimes / 9.3% never** playing mobile games with sound, n=541 — general mobile, neither Roblox-specific nor 8–14, so directional at best `[research: https://www.international-sound-directory.com/2025/12/07/do-people-really-play-mobile-games-without-sound-myth-or-reality/]`. Music work raised this and it is right. **The invariant survives entirely on the channel lists**, which is how the category actually got it, and it would survive if every session ran at full volume: a player looking at the ground when a plate appears in the corner loses the plate and keeps the cue, and the same rule protects them. `[research owed: a Roblox creator-dashboard or platform-published figure for the share of mobile sessions played with audio muted, broken down by age band]`

**Audio may add a rarity channel and may never be one.** `04-PRESENTATION.md`'s single hard accessibility constraint is *"rarity tiers must differ by shape or silhouette, not only hue"* `[brief: soft]` ← `[you accepted: R6 Q4]`, and `tiers[].shape` solves it in silhouette. `OPEN.md §2`'s per-tier pitched note is therefore additive by construction, and the ban is on it ever becoming the carrier `[cid: decided]`.

**No ducking rule may quieten a non-audio channel.** Sheet `02` writes `SoundGroup.Volume` and nothing else; `notices` owns dwell, `composition` owns the readout, VFX owns `atPatch`. `forbidden` `M10` in sheet `01` makes it a grep: `mix` names no `GuiObject`, no `Transparency` and no `dwellSeconds`.

**There is no volume, mute, caption or audio-settings surface, and there cannot be one.** `input` is a closed five-verb list — `move`, `look`, `jump`, `buy`, `openIndex` — with `gameDrawnPressables: 4`; `04-PRESENTATION.md` declined the options pass; `navigation.notNodes` contains `settings`. **The platform's own volume control is the entire surface a player has**, so `mix`'s defaults are the only mix that will ever exist. That is a consequence I state and do not solve: reopening it is a revision request against `gameplay/mechanics/02` and `04-PRESENTATION.md`, and it is the developer's call, not a writer's (**G9**).

**Where audio ought to carry something alone, I route it and do not take it.** Three readings are thin on their non-audio side and each is a finding for the owner of the other channel, not a licence for me: `B4`'s acknowledgment inside 200 ms rests on three simultaneous readout changes an eight-year-old must parse (persistent-readout work); a reveal's `atPatch` effect is the whole of `B1` for a silent player, with `notice` forbidden to it (world-effect work); and the one system notice is a plate in a corner nobody is required to be looking at (transient-message work). I state each and decide none.

**A fifth channel is not mine to add.** `response` defines four — `atPatch`, `readout`, `notice`, `audio`. A haptic on mobile would be a fifth, and adding one is `gameplay/mechanics/05`'s act. Named here so its absence reads as a finding rather than an oversight.

```manifest
{
  "amends": "mix",
  "authoritativeIn": "cid/audio/mix/01-bus-tree-and-levels.md",
  "value": {
    "mutedPlay": {
      "audioOnlyBeats": 0,
      "derivedNotAsserted": true,
      "derivation": [
        { "beat": "patchClear", "channels": ["atPatch", "readout"], "nonAudioCount": 2, "audioPresent": false, "note": "G1 — three other sources give the clear a sound and this array does not. Either resolution leaves nonAudioCount at 2." },
        { "beat": "findReveal", "channels": ["atPatch", "audio"], "nonAudioCount": 1, "audioPresent": true },
        { "beat": "setComplete", "channels": ["notice", "audio"], "nonAudioCount": 1, "audioPresent": true },
        { "beat": "areaComplete", "channels": ["notice", "audio"], "nonAudioCount": 1, "audioPresent": true },
        { "beat": "upgradePurchased", "channels": ["readout", "audio"], "nonAudioCount": 1, "audioPresent": true }
      ],
      "invariant": "for every row in response.beats, the count of channels not equal to \"audio\" is at least 1. The minimum today is 1, reached by four of the five beats.",
      "invariantIsMechanical": "checkable against the merged manifest with no running game and no listening test.",
      "premiseCorrection": "cid/audio/_category.md motivates this invariant with an unsourced claim about how many sessions run silent. The invariant is kept and the motive is not restated. The one available survey reports 34.9% always / 23.6% often / 19% sometimes / 9.3% never for general mobile, n=541, neither Roblox-specific nor 8-14. The invariant rests on the channel arrays and holds at any muting rate, including zero.",
      "readings": [
        { "reading": "currency balance", "nonAudioCarrier": "readout — the persistent currency figure", "owner": "composition (ui-ux/hud)" },
        { "reading": "upgrade level per axis", "nonAudioCarrier": "readout — Lv N on each of the three purchase rows", "owner": "composition" },
        { "reading": "upgrade cost and affordability", "nonAudioCarrier": "readout — the cost figure plus Ready / Short / Max", "owner": "composition" },
        { "reading": "area clear progress", "nonAudioCarrier": "readout — the progress bar label ending in % CLEAR", "owner": "composition, firstSession.withheld[areaProgress]" },
        { "reading": "collection count", "nonAudioCarrier": "readout — the 0 / 24 figure", "owner": "collection, composition" },
        { "reading": "a Find was revealed", "nonAudioCarrier": "atPatch — the world effect at the patch, dwell 2.5 s", "owner": "VFX, under response.beats[findReveal]" },
        { "reading": "which Find it was", "nonAudioCarrier": "the index panel row and the revealed object itself", "owner": "collection, navigation" },
        { "reading": "a set completed", "nonAudioCarrier": "notice — the Set Complete plate, 3.0 s", "owner": "notices" },
        { "reading": "an area completed", "nonAudioCarrier": "notice — the Area Complete plate, 2.5 s", "owner": "notices" },
        { "reading": "a patch cleared", "nonAudioCarrier": "atPatch — the instance disappearing — and readout, the currency rising", "owner": "VFX and composition" },
        { "reading": "overgrowth grade", "nonAudioCarrier": "silhouette and shape, per tiers[].shape", "owner": "tiers, and 04-PRESENTATION.md's one hard accessibility constraint" },
        { "reading": "beat rank B1 to B5", "nonAudioCarrier": "plate presence and dwell for B2 and B3, the world effect for B1, the readout change for B4, the instance disappearing for B5", "owner": "notices, VFX, composition" },
        { "reading": "a purchase applied", "nonAudioCarrier": "readout — three simultaneous value changes in one node", "owner": "composition" },
        { "reading": "the save did not load", "nonAudioCarrier": "notice — the system-class plate, 5.0 s, once per session", "owner": "ui-ux/feedback/03" },
        { "reading": "another player is present and working", "nonAudioCarrier": "sight — a body in motion whose ground is visibly being cleared", "owner": "social/02 B2 and B3" }
      ],
      "readingsCount": 15,
      "forbidden": [
        { "id": "P1", "thing": "any cue that is the sole carrier of a state, count, grade, rank or progress reading", "observable": "every row in mutedPlay.readings has a non-empty nonAudioCarrier, and no carrier is a bus id in mix.buses" },
        { "id": "P2", "thing": "any ducking, trim or attenuation rule that lowers a non-audio channel", "observable": "mix names no GuiObject, no Transparency and no dwellSeconds; sheet 02 writes only SoundGroup.Volume and Sound.Volume" },
        { "id": "P3", "thing": "audio as THE grade channel — it may add one and may never be one", "observable": "tiers[].shape is non-empty for all four rows, and no key makes a shape equal to another's" },
        { "id": "P4", "thing": "any member added to stingers, sfx, uiSound, ambience or music whose only channel is audio", "observable": "no beat, cue or layer in any of the five keys carries a channel list of length 1 whose member is audio" },
        { "id": "P5", "thing": "a volume control, mute toggle, caption track, subtitle track or audio-settings surface", "observable": "input has five verbs and gameDrawnPressables 4; navigation.notNodes contains settings; zero controls in game/src write a SoundGroup.Volume from a player action" },
        { "id": "P6", "thing": "a caption, transcript or on-screen sound indicator substituting for a cue", "observable": "no key names one, and notices holds exactly two beat members plus one system member" },
        { "id": "P7", "thing": "a fifth response channel added by an audio key — including a haptic", "observable": "response.beats[].channels draws from exactly four names; adding one is gameplay/mechanics/05's act and no audio key may do it" },
        { "id": "P8", "thing": "silencing, shortening or skipping a non-audio channel because its audio partner is playing", "observable": "response gives each beat one budget and one dwell, and no field in mix reads either" }
      ],
      "noAudioSettingsSurface": {
        "exists": false,
        "closedBy": ["input — a closed five-verb list with gameDrawnPressables 4", "04-PRESENTATION.md — the colourblind, text-scaling and sensitivity options pass was declined", "navigation.notNodes contains settings"],
        "consequence": "mix.buses[].volume and mix.assets.rows[].volume are the only mix any player will ever have. The platform's own volume control is the whole of a player's control.",
        "reopeningRoute": "a revision request against gameplay/mechanics/02 for a sixth verb and against 04-PRESENTATION.md's declined options pass. That is the developer's call, not a writer's. This is category gap G9."
      },
      "findingsRoutedNotTaken": [
        { "reading": "a purchase applied", "concern": "response gives B4 a 200 ms acknowledgment and composition gives it three simultaneous value changes in one node. No key says whether an eight-year-old on a phone reads that as it worked inside 200 ms.", "routedTo": "persistent-readout work (composition, ui-ux/hud)" },
        { "reading": "a Find was revealed", "concern": "notice is in findReveal's forbiddenChannels, so atPatch is the whole of B1 for a silent player and its dwell is 2.5 s.", "routedTo": "world-effect work (Art - VFX)" },
        { "reading": "the save did not load", "concern": "the plate is the sole carrier for a player who is not looking at that corner, and it fires once per session.", "routedTo": "transient-message work (ui-ux/feedback/03) and interface-sound work (uiSound), which rules whether it has a sound at all" }
      ],
      "contributionsFromSiblingKeys": [
        { "key": "music", "contributes": 0, "reason": "trackCount is 0" },
        { "key": "ambience", "contributes": 0, "reason": "carriesNoState is true — a layer holds no state, count, grade, rank or progress" },
        { "key": "stingers", "contributes": 0, "reason": "each of B1, B2 and B3 shares its beat with atPatch or notice" },
        { "key": "uiSound", "contributes": 0, "reason": "B4 shares its beat with readout; every other interface cue acknowledges an action the player just took" },
        { "key": "sfx", "contributes": 0, "reason": "patchClear already holds atPatch and readout, so an audio channel there would be additive under either resolution of G1" },
        { "key": "mix", "contributes": 0, "reason": "this key authors no cue" }
      ]
    }
  }
}
```

## Consequences for other work

- **Every one of the five sibling audio keys.** `P4` binds you: no member you add may carry a channel list whose only entry is `audio`. It costs each of you nothing today — all five already contribute 0 — and it is the one thing in this key a later sheet could break by accident.
- **Persistent-readout work (`composition`, ui-ux/hud).** Six of the fifteen readings are yours, and `B4`'s three simultaneous value changes are the sole non-audio carrier of a purchase inside a 200 ms budget. That is a finding for you, routed and not decided here.
- **World-effect work (Art — VFX).** `atPatch` is the whole of `B1` for a player with sound off, because `notice` is in `findReveal`'s forbidden channels. It is also half of `B5`.
- **Transient-message work (`notices`, `ui-ux/feedback/03`).** The two completion plates are the sole non-audio carrier of `B2` and `B3`, and the system plate is the sole carrier of a failed save read. Nothing here asks you to move a dwell.
- **Response-contract work (`gameplay/mechanics/05`).** `P7`: a fifth channel — a haptic on mobile is the obvious candidate — is yours to add and no audio key may add one. Named so its absence reads as a finding.
- **The developer, on `G9`.** There is no volume control, no mute, no caption and no settings verb, and `mix`'s defaults are permanent. If an options surface is wanted, it needs a sixth verb and it reopens a declined pass.
- **Cross-category verification.** `audioOnlyBeats` is a single integer with a stated derivation. If any later sheet moves it off 0, that sheet is the one to reject, and criterion 1 catches it without a listening test.

## Acceptance criteria

1. `mix.mutedPlay.audioOnlyBeats == 0`, and for each of `response.beats`' five rows the count of channels not equal to `"audio"` is at least 1 — `patchClear` 2, the other four 1 each.
2. `mix.mutedPlay.readings` has 15 rows, every row's `nonAudioCarrier` is non-empty, and no row's carrier string is a bus id from `mix.buses` (`Master`, `Stingers`, `Interface`, `World`, `WorldNeighbour`, `Beds`).
3. `mix.mutedPlay.contributionsFromSiblingKeys` has one row per audio key and every `contributes` value is 0; no member of `stingers`, `sfx`, `uiSound`, `ambience` or `music` declares a channel list of length 1 whose member is `audio`.
4. `mix.mutedPlay.forbidden` has 8 rows each with a non-empty observable, and `mix` contains zero fields named `Transparency`, `dwellSeconds` or any `GuiObject` class.

## Not decided here

Whether `patchClear` recovers its `audio` channel — **G1**, in-world-sound work's; the invariant holds either way because that beat already carries two non-audio channels. Whether the one system notice makes a sound — interface-sound work. Whether `B4`'s readout is legible as an acknowledgment inside 200 ms, what a reveal's `atPatch` effect is made of, and how long any plate dwells — persistent-readout, world-effect and transient-message work respectively; all three are routed above and none is taken. Whether a fifth `response` channel exists — `gameplay/mechanics/05`. Whether an options surface should exist at all — the developer, under `G9`. What share of this audience actually plays muted — unmeasured, `[research owed:]` above, and no ruling in this key depends on the answer. Every level, duck depth, roll-off distance, cap and asset row — sheets `01`, `02` and `03`, this domain.
