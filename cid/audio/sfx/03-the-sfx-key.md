# 03 — The `sfx` key

**Domain:** SFX · **Category:** Audio · **Wave:** 6

## Decision

**One cue, twelve assets, thirty-five stated zeros.** The clear is a dry rustle-and-snap, 0.30 s,
positional, pitched to one of four notes by the cleared patch's `tierIndex` and rotated across
three transient variants per note — eight overlapping voices, twelve uploaded mono one-shots,
every id at the sentinel `""`. The tool, the bay build and every other in-world sound are zero.

## Why

- **The brief's one concrete audio instruction is taken, not overruled.** *"Clearing is a soft
  rustle-and-snap; each rarity tier a distinct pitched note"* `[brief: soft]` ← `[I assumed]`,
  `OPEN.md §2`. Sheet 01 gives it the only beat that can carry a per-patch property at all.
- **`theme/tone/03`'s `B5` rule permits pitch and forbids a ladder.** Its banned cue inputs are
  *progress, streak, count, elapsed time, depth*; `tierIndex` is not among them, and *"exactly one
  intensity, every time, forever"* is a claim about level, which four notes at one level do not
  touch. **The reconciliation is structural, not promised** `[cid: decided]`: the four pitches are
  baked into four uploaded files at `PlaybackSpeed` 1.0, never written at runtime, so no code path
  exists that could compute a pitch from anything; and the four are assigned **non-monotonically**
  across `tierIndex` (E5, C5, G5, D5 for 1 to 4), so no run of clears reads as ascending toward
  rarity and the rarest patch is not the highest note.
- **Pitching by `PlaybackSpeed` from one file is refused.** It would change length and timbre with
  pitch, and `theme/tone/03` permits a tier channel only if loudness, length and timbre are
  identical across tiers. Four files at one length is the only shape that satisfies it.
- **The variation rule and the tier note are one mechanism, which is why twelve assets are
  affordable.** `Play()` restarts a `Sound` rather than layering it
  `[research: https://devforum.roblox.com/t/how-do-you-play-a-sound-without-restarting-it/1101216]`,
  so eight onsets a second from one id is a machine-gun restart. Variation comes from the ground's
  own tier mix and a three-step round-robin cursor per `tierIndex`. **No randomness anywhere** —
  `N10` forbids a second source of it near `layout`, and a deterministic cursor is checkable while
  an RNG is not. Three is the smallest cycle that does not read as alternation
  `[playtest unknown]`, test range 2 to 4 variants per `tierIndex`.
- **All four pitches are members of one C-major pentatonic set (C5, D5, E5, G5).** Any subset
  sounding together is consonant, no pair forms a tritone, and no two overlapping onsets form a
  detuned unison — which is what `theme/tone/04` `D3` bans. Overlap at 8/s makes simultaneity the
  normal case, so consonance had to be designed in rather than hoped for. All four sit above
  500 Hz so they survive a phone speaker
  `[research owed: a published frequency-response curve for a phone-class speaker establishing the low-frequency roll-off point]`.
- **Eight voices is a bound, not headroom.** **No documented engine simultaneous-voice limit
  exists** — neither the `Sound` reference nor `sound/objects.md` states one, and the only figures
  are unconfirmed community benchmarks on a desktop CPU. So the count is derived from the contract
  instead: `response.minSustainedOnsetsPerSecond` is 8 and the cue is 0.30 s, so at most 8 onsets
  exist in any second and 8 instances cover **every** distribution of them, including all eight in
  one frame. The even-spacing minimum is 3; 8 is required because `Beats.luau` begins a tick's
  whole `clearedCount` rise in one frame `[research: game/src/client/Beats.luau]`.
- **Stealing the oldest ringing voice of the same cue is not dropping an onset.** `response`:
  *"Overlap is the required degradation; dropping is not."* An onset that began and was audible at
  its attack has not been dropped; refusing to start one has. The threshold below which a tail may
  not be stolen is Mix's, not mine. `[cid: decided]`
- **Positional, because a neighbour's clear is the second half of presence.** `social/03` `X10`
  permits *"A's own patches clearing… and the clear cue that accompanies it"* to reach a second
  client, and `social/02` requires a neighbour read as a body whose ground is visibly being
  cleared. A global 2D cue would be 128 onsets a second at full level at 16 players.
  Spatialisation is decided by parent
  `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/sound/objects.md]`.
- **Roll-off and level are both requirements here, and neither carries a value.** `RollOffMode`
  defaults to `Inverse`, which *"does not use `RollOffMaxDistance`"* and therefore never culls a
  voice
  `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/reference/engine/enums/RollOffMode.yaml]`,
  and `RollOffMinDistance` defaults to 10 while a neighbour's nearest clearing patch is about
  **5 studs** across the shared lane edge — so at engine defaults a neighbour's clear is at full
  volume and louder than your own. **I set no curve and no level.** I require a mode that honours
  `RollOffMaxDistance`, a `RollOffMinDistance` at or below 2 studs, inaudibility by the 122-stud
  plot pitch, a level below `B4`'s, and one level identical across all four notes. Every figure is
  `mix`'s, read by field and never copied here. *(RR-4: an earlier draft carried
  `cues[patchClear].volume`, which was a level value in a key that does not own levels. Deleted;
  `mix` declares `noOtherKeyMayWriteEither` and is the sole writer.)*
- **The tool is zero because it has no event** — `tool` `T1`, it never swings, and
  `input.worldObjectsTriggeringAVerb` is 0. **The bay build is zero because its instant is already
  owned**: `plots.advance` fires in the same server decision as `areaComplete`, which is `B3` and
  Stingers', a second cue there is two cues for one moment, and `tone/03` forbids entering or
  leaving an area from peaking. `[cid: decided]`
- **Every id is `""`, never `null` and never `"none"`.** `bridge/emit-config.mjs:79` maps `null`
  to `nil` and Luau drops the key `[research: bridge/emit-config.mjs]`; `SoundId` is a `ContentId`
  string, so `release.provisioning.unprovisionedIdValue` `0` does not transfer, and a non-empty
  unresolvable id errors repeatedly in the console
  `[research: https://devforum.roblox.com/t/failed-to-load-soundid-error-spam-extreme-log-file-sizes/2225682]`
  — which is why the guard sits at the play site. Mix rules the sentinel for six domains and this
  key follows it.
- **`upload`, not `creatorStore`, for all twelve.** The Creator Store's *"more than 100,000
  professionally-produced sound effects"* are free to use but do not come pitched to a named scale
  degree at a fixed length, and imported audio is private until permission is granted per
  experience
  `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/audio/assets.md]`.
  Twelve uploads at 0.30 s are far inside the 20 MB per-file ceiling and the 100-import cap.
- **`sfx` emits zero player-facing strings**, so `vocabulary`'s Title Case, `maxLabelChars` 14 and
  `allowedPattern` bind nothing here. `tierIndex` is a systems term — `patch.tierIndex` verbatim,
  a merged key path — not a player-facing one, and `bannedWords` is checked over
  `playerFacingStrings()`.

```coinage
{ "term": "patch-clear", "kind": "cue-name", "renderable": false,
  "coinedBy": "cid/audio/sfx/03-the-sfx-key.md",
  "form": "lowercase, one word, kebab-case if compound, per theme/vocabulary/04" }
```

```manifest
{
  "provides": "sfx",
  "status": "proposed",
  "value": {
    "unprovisionedIdValue": "",
    "unprovisionedIdOwner": "audio/mix/03-the-asset-ledger. SoundId is a ContentId string, so release.provisioning.unprovisionedIdValue 0 does not transfer, and tech/deploy/02's \"none\" scalar would be an unresolvable content string rather than silence. This key adopts whatever mix rules and states \"\" as its placeholder.",
    "guardRule": "every play site tests soundId ~= \"\" before Play(). The guard sits at the play site, never at the id, because a non-empty unresolvable id errors repeatedly in the client console.",
    "playerFacingStrings": 0,
    "movementMegabytesClaimed": 0,
    "levelsOwnedHere": false,
    "levelsOwnedBy": "audio/mix, which declares noOtherKeyMayWriteEither. This key carries no volume, level or decibel value anywhere; it states level requirements and reads mix's field.",
    "cues": [
      {
        "id": "patchClear",
        "cueName": "patch-clear",
        "beat": "response.beats[patchClear]",
        "rank": 5,
        "channelPrecondition": "\"audio\" is present in GameConfig.Response.beats[patchClear].channels, read at runtime and never compared against a literal channel list. Absent, this cue plays nothing and warns nothing. See cid/audio/sfx/01-the-clear-has-a-channel.md.",
        "trigger": "one onset per patch cleared, on the client whose character cleared it, and on every other loaded client at its world position",
        "audibleSeconds": 0.30,
        "audibleSecondsTestRange": [0.15, 0.40],
        "audibleSecondsCeiling": "response.beats[patchClear].residueLifetimeSeconds, 0.4 — the sound may not outlast the visual residue",
        "attackWithinMs": 20,
        "attackCeilingSource": "response.beats[patchClear].acknowledgmentBudgetMs, 80",
        "fileLeadingSilenceMaxMs": 5,
        "fadeInSeconds": 0,
        "levelRequirement": {
          "ownedBy": "audio/mix, sole writer, noOtherKeyMayWriteEither. Read mix's field for this cue; no figure is copied here.",
          "belowBeat": "upgradePurchased (B4), per theme/tone/03's ranking with no ties. B5 is the quietest of the five in every medium it occupies.",
          "identicalAcrossTierIndexes": true,
          "spreadAcrossTierIndexes": 1.0,
          "spreadCeiling": "2.0, from gameplay/core-loop/02. A spread of 1.0 is well inside it and is what theme/tone/03's \"exactly one intensity, every time, forever\" requires.",
          "againstPlatformLocomotion": "the platform's character sounds are created by a CoreScript and carry no SoundGroup, so no bus relation exists between them and this cue. Their relative level is a listening test with no owner in either contract."
        },
        "positional": true,
        "parent": "an Attachment created at the cleared patch's world position, holding one Sound instance from the pool, destroyed when the onset ends. An Attachment emits from a point; a BasePart parent would emit from a whole surface.",
        "audibleToOtherPlayers": true,
        "audibleToOtherPlayersRuling": "gameplay/social/03 X10 permits a neighbour's own patches clearing and the cue that accompanies it to reach a second client; gameplay/social/02 requires a neighbour read as a body whose ground is visibly being cleared. This is the only cross-player sound sfx authors.",
        "rollOffRequirement": {
          "ownedBy": "audio/mix/02-degradation-under-load; this key states the requirement and sets no curve",
          "modeMustHonourMaxDistance": true,
          "forbiddenMode": "Inverse",
          "forbiddenModeReason": "the engine default attenuates as RollOffMinDistance/distance and does not use RollOffMaxDistance, so no voice is ever culled by distance",
          "rollOffMinDistanceStudsMax": 2,
          "rollOffMinDistanceReason": "the engine default of 10 exceeds the ~5-stud gap to a neighbour's nearest clearing patch across the shared lane edge, which would put a neighbour's clear at full level and louder than the player's own patch at maximum clear radius",
          "inaudibleByStuds": 122,
          "inaudibleByStudsSource": "plots.pitchStuds",
          "audibleAtOwnRadiusStuds": 14.3,
          "knownConsequence": "a neighbour clearing along the shared lane edge at 5 studs is louder than the player's own patch at 14 studs. This is geometry, not a defect, and is stated so a builder does not treat it as one."
        },
        "overlappingVoices": 8,
        "overlappingVoicesDerivation": "response.minSustainedOnsetsPerSecond is 8 and audibleSeconds is 0.30, so at most 8 onsets exist in any one second and 8 distinct Sound instances cover every distribution of them including all 8 in one frame. ceil(8 x 0.30) = 3 is the even-spacing minimum; 8 is required because Beats.luau begins a tick's whole clearedCount rise in one frame. A single Sound cannot overlap itself: Play() restarts it.",
        "overlappingVoicesNote": "[playtest unknown] as an audibility figure, not as a bound. No documented engine simultaneous-voice limit exists at any device tier, so this is a design requirement and not headroom against a known cap. The cap itself is audio/mix/02's.",
        "poolShape": "8 pre-created Sound instances per listening client, re-parented per onset, cycled oldest-first",
        "voiceStealing": "when a 9th onset arrives inside one second, steal the oldest still-playing voice of this same cue. Stealing a ringing tail is not dropping an onset under response.onOverload \"overlap\", because the onset began and was audible at its attack; refusing to start one is. The threshold below which a tail may not be stolen is audio/mix/02's.",
        "preloadRequired": true,
        "preloadReason": "firstSession.ceilings.secondsToFirstClear is 3 s from first input, so all 12 assets must be resident before the first clear. They are the only sfx assets in the game. The budget against loadToFirstInputSeconds is audio/mix/03's.",
        "playbackSpeed": 1.0,
        "playbackSpeedEverWritten": false,
        "looped": false,
        "variation": {
          "byTierIndex": [
            { "tierIndex": 1, "note": "E5", "hz": 659.25 },
            { "tierIndex": 2, "note": "C5", "hz": 523.25 },
            { "tierIndex": 3, "note": "G5", "hz": 783.99 },
            { "tierIndex": 4, "note": "D5", "hz": 587.33 }
          ],
          "pitchSet": "C major pentatonic subset C-D-E-G. Any simultaneous subset is consonant, no pair forms a tritone, and no two overlapping onsets form a detuned unison — theme/tone/04 D3.",
          "monotonicInTierIndex": false,
          "monotonicReason": "theme/tone/03 forbids a rising pitch ladder. Non-monotonic assignment means no run of clears can read as ascending toward rarity, and the rarest patch is not the highest note.",
          "variantsPerTierIndex": 3,
          "variantsTestRange": [2, 4],
          "selector": "a round-robin cursor per tierIndex, advanced once per onset of that tierIndex",
          "randomness": "none, anywhere. N10 forbids a second source of randomness near layout, and a deterministic cursor is checkable.",
          "identicalAcrossVariants": ["hz", "level", "audibleSeconds"],
          "differsAcrossVariants": ["transient shape only"]
        },
        "tierIndexSource": {
          "requirement": "the onset handed to the patchClear cue carries the cleared patch's tierIndex",
          "availableToday": false,
          "why": "Beats.luau drives patchClear off a rise in snapshot.clearedCount and passes args = {}; Clearing.luau sends no per-patch packet and buildSnapshot carries no tier field",
          "route": "the client-side radius test that response.beats[patchClear].decidedBy already requires (clientPredictedServerAuthoritative) knows which local patch the character entered, and therefore its tierIndex. No new wire field, no new remote and no new packet is requested.",
          "requestedOf": "client-prediction and beat-scheduler work",
          "fallbackWhenUnknown": {
            "use": "the tierIndex 1 row and its 3-variant cursor",
            "reason": "tierIndex 1 is the commonest patch. Silence would violate response.onOverload \"overlap\"; a random pick would add an RNG. The build is then correct and under-varied rather than wrong."
          }
        }
      }
    ],
    "characterSounds": [
      { "name": "Died", "disposition": "silence", "ruling": "traversal.death.authoredCue \"none\"; response.negativeBeats 0; the world cannot kill, drop or damage the player", "mechanism": "a LocalScript named RbxCharacterSounds in StarterPlayerScripts, a verbatim copy of the CoreScript with the Died SoundId set to \"\"", "meetsStoppingRuleBar": false },
      { "name": "Running", "disposition": "keep", "ruling": "platform default; movement is the whole verb set" },
      { "name": "Swimming", "disposition": "unreachable", "ruling": "theme/setting/05-inventory: no water of any kind" },
      { "name": "Climbing", "disposition": "unreachable", "ruling": "traversal: zero climbable surfaces" },
      { "name": "Jumping", "disposition": "keep", "ruling": "traversal.jump.exists true at the platform default" },
      { "name": "GettingUp", "disposition": "keep", "ruling": "no world rule removes the FallingDown to GettingUp transition" },
      { "name": "FreeFalling", "disposition": "unreachable", "ruling": "fades in only above 75 studs/s vertical speed; traversal states the world cannot drop the player", "note": "if it proves reachable the disposition becomes keep and nothing else moves" },
      { "name": "FallingDown", "disposition": "keep", "ruling": "the physics that produces it is the platform's and no sheet removes it" },
      { "name": "Landing", "disposition": "keep", "ruling": "pairs with Jumping, which exists" },
      { "name": "Splash", "disposition": "unreachable", "ruling": "fires on entering water; the world holds none" }
    ],
    "characterSoundCounts": { "keep": 5, "silence": 1, "unreachable": 4 },
    "assets": [
      { "id": "patch-clear-t1-a", "trigger": "patchClear", "tierIndex": 1, "variant": "a", "hz": 659.25, "soundId": "", "sourceClass": "upload", "channelCount": "mono", "intendedAudibleSeconds": 0.30, "descriptor": "A dry leaf-and-stalk rustle closing on a short woody snap. The rustle leads and is the longer half. Damped to silence by 0.30 s, no tail, no reverb baked in, first non-silent sample within 5 ms. The snap's body is pitched to E5." },
      { "id": "patch-clear-t1-b", "trigger": "patchClear", "tierIndex": 1, "variant": "b", "hz": 659.25, "soundId": "", "sourceClass": "upload", "channelCount": "mono", "intendedAudibleSeconds": 0.30, "descriptor": "Same note, same peak level, same length as patch-clear-t1-a. The snap arrives earlier and the rustle before it is shorter." },
      { "id": "patch-clear-t1-c", "trigger": "patchClear", "tierIndex": 1, "variant": "c", "hz": 659.25, "soundId": "", "sourceClass": "upload", "channelCount": "mono", "intendedAudibleSeconds": 0.30, "descriptor": "Same note, same peak level, same length as patch-clear-t1-a. A two-part snap with no audible rustle before it." },
      { "id": "patch-clear-t2-a", "trigger": "patchClear", "tierIndex": 2, "variant": "a", "hz": 523.25, "soundId": "", "sourceClass": "upload", "channelCount": "mono", "intendedAudibleSeconds": 0.30, "descriptor": "patch-clear-t1-a's shape, pitched to C5. Identical peak level and length." },
      { "id": "patch-clear-t2-b", "trigger": "patchClear", "tierIndex": 2, "variant": "b", "hz": 523.25, "soundId": "", "sourceClass": "upload", "channelCount": "mono", "intendedAudibleSeconds": 0.30, "descriptor": "patch-clear-t1-b's shape, pitched to C5. Identical peak level and length." },
      { "id": "patch-clear-t2-c", "trigger": "patchClear", "tierIndex": 2, "variant": "c", "hz": 523.25, "soundId": "", "sourceClass": "upload", "channelCount": "mono", "intendedAudibleSeconds": 0.30, "descriptor": "patch-clear-t1-c's shape, pitched to C5. Identical peak level and length." },
      { "id": "patch-clear-t3-a", "trigger": "patchClear", "tierIndex": 3, "variant": "a", "hz": 783.99, "soundId": "", "sourceClass": "upload", "channelCount": "mono", "intendedAudibleSeconds": 0.30, "descriptor": "patch-clear-t1-a's shape, pitched to G5. Identical peak level and length." },
      { "id": "patch-clear-t3-b", "trigger": "patchClear", "tierIndex": 3, "variant": "b", "hz": 783.99, "soundId": "", "sourceClass": "upload", "channelCount": "mono", "intendedAudibleSeconds": 0.30, "descriptor": "patch-clear-t1-b's shape, pitched to G5. Identical peak level and length." },
      { "id": "patch-clear-t3-c", "trigger": "patchClear", "tierIndex": 3, "variant": "c", "hz": 783.99, "soundId": "", "sourceClass": "upload", "channelCount": "mono", "intendedAudibleSeconds": 0.30, "descriptor": "patch-clear-t1-c's shape, pitched to G5. Identical peak level and length." },
      { "id": "patch-clear-t4-a", "trigger": "patchClear", "tierIndex": 4, "variant": "a", "hz": 587.33, "soundId": "", "sourceClass": "upload", "channelCount": "mono", "intendedAudibleSeconds": 0.30, "descriptor": "patch-clear-t1-a's shape, pitched to D5. Identical peak level and length." },
      { "id": "patch-clear-t4-b", "trigger": "patchClear", "tierIndex": 4, "variant": "b", "hz": 587.33, "soundId": "", "sourceClass": "upload", "channelCount": "mono", "intendedAudibleSeconds": 0.30, "descriptor": "patch-clear-t1-b's shape, pitched to D5. Identical peak level and length." },
      { "id": "patch-clear-t4-c", "trigger": "patchClear", "tierIndex": 4, "variant": "c", "hz": 587.33, "soundId": "", "sourceClass": "upload", "channelCount": "mono", "intendedAudibleSeconds": 0.30, "descriptor": "patch-clear-t1-c's shape, pitched to D5. Identical peak level and length." }
    ],
    "assetCount": 12,
    "forbidden": [
      { "id": "F1", "subject": "a creature or fauna vocal of any kind", "ruling": "theme/setting/05-inventory A1, no fauna visible or interactive; theme/identity/04, nine classes of entity and none of them present", "observable": "zero sfx.assets rows whose trigger is a non-player entity" },
      { "id": "F2", "subject": "an NPC, vendor, guardian, announcer or narrator voice", "ruling": "theme/identity/04; theme/tone/04 D4", "observable": "zero assets containing speech; zero rows whose trigger names a being" },
      { "id": "F3", "subject": "a crowd cheer or applause sample", "ruling": "theme/tone/04 D4", "observable": "grep the asset register for cheer, crowd, applause: zero rows" },
      { "id": "F4", "subject": "an object or machine sound: mechanism, hinge, lever, door, pump, gear", "ruling": "theme/setting/05-inventory A11, nothing operable; input.worldObjectsTriggeringAVerb 0", "observable": "zero sfx.cues rows whose trigger is a world object; the only trigger in this key is patchClear" },
      { "id": "F5", "subject": "water of any kind: flow, drip, lap, splash", "ruling": "theme/setting/05-inventory, the works is dry; theme/setting/01, a running-water bed is not available", "observable": "zero water rows in the asset register; zero water instances in a published bay" },
      { "id": "F6", "subject": "fire, torch or crackle", "ruling": "theme/setting/05-inventory A7, no fire", "observable": "zero fire rows in the asset register" },
      { "id": "F7", "subject": "cloth, rope, banner or flag movement", "ruling": "theme/setting/05-inventory, absent classes", "observable": "zero such rows in the asset register" },
      { "id": "F8", "subject": "a moving-air or precipitation cue", "ruling": "theme/setting/03 R2, which removes every depicted atmospheric event; theme/tone/04 D3 bans a howl", "observable": "zero such rows; every continuous layer belongs to audio/ambient, not here" },
      { "id": "F9", "subject": "a swing, chop, sweep, whoosh or impact cue on the held tool", "ruling": "tool T1, it never swings and plays no swing, chop, sweep or attack animation; input.worldObjectsTriggeringAVerb 0", "observable": "zero sfx.cues rows whose trigger names the tool" },
      { "id": "F10", "subject": "a tool equip, unequip or head-width-change cue", "ruling": "tool T4, no animation asset at any level; upgradePurchased is B4 and belongs to interface-sound work", "observable": "same as F9" },
      { "id": "F11", "subject": "a death cue", "ruling": "traversal.death.authoredCue \"none\"", "observable": "zero death rows in the asset register; characterSounds[Died].disposition is silence" },
      { "id": "F12", "subject": "a rejection, failure, error or cannot-afford cue", "ruling": "response.negativeBeats 0; input.rejectionCueOnFailedPrecondition \"none\"; buy.onPreconditionFail \"silentNoOp\"; theme/tone/04 D12", "observable": "zero sfx.cues rows whose trigger is a failed precondition" },
      { "id": "F13", "subject": "a cue for another player's join, leave, reveal, purchase or completion", "ruling": "gameplay/social/03 X11", "observable": "the only cross-player audible event in this key is a neighbour's own patchClear, under X10" },
      { "id": "F14", "subject": "a bay-build, area-entry or area-exit cue", "ruling": "theme/tone/03 forbids entering or leaving an area from peaking; plots.advance fires in the same server decision as areaComplete, which already owns that instant as B3", "observable": "zero sfx.cues rows whose trigger is plots.advance or an area transition" },
      { "id": "F15", "subject": "a duplicate-find or consolation cue", "ruling": "discovery: the areas at one depth partition that depth's set, so no reachable duplicate exists", "observable": "zero rows whose trigger is a repeat Find" },
      { "id": "F16", "subject": "any cue caused by time passing, idling, standing still or elapsed session time", "ruling": "theme/setting/03 R4, nothing in the place is a function of time; theme/tone/03's forbidden peaks", "observable": "every trigger in this key is a player-caused patch clear" },
      { "id": "F17", "subject": "a cue whose level, length, pitch or timbre is a function of streak, combo, count, progress, depth or elapsed time", "ruling": "theme/tone/03 B5, exactly one intensity, every time, forever", "observable": "playbackSpeedEverWritten is false; audibleSeconds is a constant; the level mix sets is one value identical across all four notes; the only input to variation is patch.tierIndex and a cursor" },
      { "id": "F18", "subject": "a regrowth, reset, refill or second-chance cue", "ruling": "01-FOUNDATION.md, cleared is permanent and overgrowth never returns", "observable": "zero rows whose trigger is a patch becoming uncleared; no such transition exists" },
      { "id": "F19", "subject": "a riser, swell, crescendo or build as an area nears completion", "ruling": "02-GAMEPLAY.md, nobody downstream should invent tension to fill the gap; theme/tone/03; theme/tone/04 D4 bans a riser or whoosh build", "observable": "no sfx value reads clearedCount, areaPatchCount or any ratio of them" },
      { "id": "F20", "subject": "a minor-key sting, a dissonant or detuned interval, a sub-bass drone, a whisper, breathing, a heartbeat or a creak", "ruling": "theme/tone/04 D3", "observable": "the four pitches form a C major pentatonic subset with no tritone and no unison pair; all four are above 500 Hz" },
      { "id": "F21", "subject": "a coin-jackpot cascade, a slot-machine ratchet or an air horn", "ruling": "theme/tone/04 D4", "observable": "the asset register holds 12 rows and all 12 are one rustle-and-snap" },
      { "id": "F22", "subject": "a footstep, jump, landing or fall cue authored by this key", "ruling": "cid/audio/sfx/02-platform-character-sounds.md, the platform's defaults are kept", "observable": "every sfx.assets row's trigger is patchClear; movementMegabytesClaimed is 0" },
      { "id": "F23", "subject": "a sound attached to world geometry in order to reduce part count", "ruling": "tech/performance/03 N17", "observable": "zero Sound instances parented to a patch, a boundary or any bay geometry; the cue's Attachment is created and destroyed per onset" },
      { "id": "F24", "subject": "any cue batched, deferred, delayed or dropped for frame budget", "ruling": "tech/performance/03 N14; response.onOverload \"overlap\", and dropping is not the permitted degradation", "observable": "no queue, no coalescing and no frame budget appears anywhere in this key; the only degradation is voice stealing of an already-begun onset" },
      { "id": "F25", "subject": "a looping sfx row", "ruling": "continuous layers are audio/ambient's subject, not this one", "observable": "every sfx.assets row has looped false; no field in this key sets Looped true" },
      { "id": "F26", "subject": "any sfx row that is the sole carrier of a state, count, tierIndex, rank or progress reading", "ruling": "the muted-play invariant audioOnlyBeats 0, carried by audio/mix/04; the audience is 8-14 and mobile-heavy and a large share of sessions run silent", "observable": "patchClear retains atPatch and readout; 04-PRESENTATION.md puts tierIndex in silhouette, so audio adds a tier channel and is not one" },
      { "id": "F27", "subject": "a prestige-or-reset fanfare", "ruling": "03-META.md priority 3, first item. Named by description because the word itself is in vocabulary.bannedWords", "observable": "zero rows; zero reserved SoundGroup and zero empty cue slot for one" },
      { "id": "F28", "subject": "an offline-return or welcome-back cue", "ruling": "03-META.md priority 3, offline accrual", "observable": "zero rows whose trigger is a join or a time-since-last-session" },
      { "id": "F29", "subject": "a code-redeem cue", "ruling": "03-META.md priority 3, codes", "observable": "zero rows; there is no code surface and no sixth verb" },
      { "id": "F30", "subject": "a daily-login or streak cue", "ruling": "03-META.md priority 3, daily rewards", "observable": "zero rows; nothing in this key reads a date" },
      { "id": "F31", "subject": "a leaderboard or rank cue", "ruling": "03-META.md priority 3, leaderboards; gameplay/social/03 forbids one player's number beside another's", "observable": "zero rows; zero leaderstats" },
      { "id": "F32", "subject": "a trade or gift cue", "ruling": "03-META.md priority 3, trading", "observable": "zero rows; nothing passes between two players" },
      { "id": "F33", "subject": "a seasonal or holiday layer", "ruling": "03-META.md priority 3, seasons and events; OPEN.md section 2, ships and settles", "observable": "zero rows; nothing in this key reads a date" },
      { "id": "F34", "subject": "an event stinger", "ruling": "03-META.md priority 3, seasons and events", "observable": "zero rows" },
      { "id": "F35", "subject": "a reserved SoundGroup, an empty cue slot, an unused bus or a future field held open for any of F27 to F34", "ruling": "the category scope gate: reserving space for a priority-3 item fails verification exactly as specifying one does", "observable": "sfx.cues has exactly 1 row and sfx.assets exactly 12; no field in this key is unused" }
    ],
    "requirementsOnOtherKeys": [
      { "key": "response", "owner": "gameplay/mechanics/05", "requirement": "add the single array element \"audio\" to beats[patchClear].channels", "raisedBy": "cid/audio/sfx/01-the-clear-has-a-channel.md", "gap": "G1" },
      { "key": "mix", "owner": "audio/mix/01", "requirement": "the level for this cue, below B4's and identical across all four notes. This key carries no level value; mix declares noOtherKeyMayWriteEither and is the sole writer." },
      { "key": "mix", "owner": "audio/mix/02", "requirement": "a RollOffMode that honours RollOffMaxDistance, RollOffMinDistance at or below 2 studs, inaudible by 122 studs, a concurrency cap that does not steal below 8 voices per listening client for this cue, and the tail-length threshold below which a voice may not be stolen" },
      { "key": "mix", "owner": "audio/mix/03", "requirement": "an MB allowance for 12 mono one-shots of 0.30 s, all preloaded, at source class upload, and the SoundId sentinel ruling this key follows" },
      { "key": "representation", "owner": "architect, raised by audio/mix/01 as G5", "requirement": "name a module permitted to call Instance.new(\"Sound\") and Instance.new(\"Attachment\") for this cue; no key in either contract names one today" },
      { "key": "none", "owner": "client-prediction and beat-scheduler work", "requirement": "the onset handed to cuePatchClear carries the cleared patch's tierIndex, from the client-side radius test response already requires. No new wire field." }
    ]
  }
}
```

## Consequences for other work

- **Response-contract work (`gameplay/mechanics/05`)** owns the one-element revision in sheet 01.
  Declined, every row above stays legal and the cue is permanently silent; nothing here breaks.
- **Client-prediction and beat-scheduler work** inherits one requirement and no wire change: the
  `patchClear` onset must carry `tierIndex`. Today `Beats.luau` passes `args = {}` and
  `Clearing.luau` sends no per-patch packet, so without it the cue runs on the stated fallback and
  every clear sounds like `tierIndex` 1. **This is the one thing that makes the brief's per-tier
  note real, and it is a client-side read of a local patch, not a new remote.**
- **Mix work owns every level and every curve this cue is heard through, outright**, and this key
  carries no level value for it to collide with. It inherits three requirements it can reject
  explicitly rather than discover — the voice count of 8 with its derivation shown, the reading
  that stealing a ringing tail is not dropping, and the roll-off bounds. If it caps below 8 for
  this cue, the cap is its own and it should say which onset is lost.
- **Instance-representation work (architect)** inherits a second creator question beside G5's: an
  `Attachment` per onset, created and destroyed up to 8 times a second per player.
- **Stinger work** is unaffected. `B1`, `B2` and `B3` keep their `audio` channels, no ranking
  moves, and `B5` stays quieter than `B4`, which is quieter than all three.
- **Interface-sound work** keeps `B4` whole. Nothing here plays at a press, at a purchase, at a
  failed precondition or at any pressable.
- **Environment and set-dressing work** inherits `F23`: no `Sound` is parented to a patch, a
  boundary or any bay geometry, so no part count is reduced by an audio emitter.
- **Asset-ledger work (`audio/mix/03`)** gets a closed count: 12 rows, `upload`, mono, 0.30 s, all
  preloaded, zero movement rows. That is the whole of SFX's claim on the 20 MB.
- **Verification work** gets 35 greps and one manifest arithmetic check, deliberately.

## Flagged to the developer

`OPEN.md §1` records *audio intent* at **0 interview questions**, so every ruling here is
`[cid: decided]` against a silent brief. Three are worth ratifying:

1. **Twelve uploaded assets for one cue.** The alternative is one asset and a machine-gun clear at
   8 onsets a second, or four (tier only) and audible alternation inside a run of one tier.
   **Recommendation: twelve.** It is the game's most-repeated event and the files are 0.30 s.
2. **A neighbour's clear is audible.** The alternative is a global-2D or silent cue.
   **Recommendation: audible and positional**, because `social/02` makes presence the entire social
   design and sound is half of it. The cost is that Mix must get the curve right.
3. **The tool, the bay build and every other in-world object are silent.** The alternative is a
   swing cue, which would require a swing to exist. **Recommendation: silent**, and the route to
   reversing it is a revision against `tool` `T1`, not against this sheet.

## Acceptance criteria

1. `sfx.assets` has exactly 12 rows; every `soundId` is `""`, every `sourceClass` is `"upload"`,
   every `channelCount` is `"mono"`, every `intendedAudibleSeconds` is 0.30; the distinct `hz`
   values are exactly 523.25, 587.33, 659.25 and 783.99, three rows each; and the `hz` sequence
   ordered by `tierIndex` is monotonic in neither direction.
2. A build with every `sfx.assets[].soundId` at `""` boots, plays no sound and writes no warning
   to the client console across 200 patch clears.
3. At 8 onsets in one second, 8 distinct `Sound` instances exist and `Play()` is called at most
   once per instance in that second; no onset is queued, delayed or refused, and
   `sfx.cues[patchClear].overlappingVoices` is 8.
4. The `sfx` manifest contains **no numeric level anywhere**: `levelsOwnedHere` is `false`, and a
   grep of the manifest block for the field names `volume`, `db` and `decibels` returns zero hits.
   `theme/setting/01` criterion 4 and `theme/setting/03` criterion 4 — the two whole-word greps
   over every `manifest` string value under `cid/` — both return zero matches against this key,
   and `sfx.playerFacingStrings` is 0.

## Not decided here

Whether `patchClear` has an audio channel at all — sheet 01, mine, which is a revision request
against `gameplay/mechanics/05`. Why the ten character-sound dispositions are what they are —
sheet 02, mine. **Every level, volume and decibel figure, the bus tree, the ducking rule, the
`RollOffMode` and its distances, the concurrency cap, the tail-stealing threshold, the 20 MB
split and the `SoundId` sentinel — Mix, which holds `mix` and is the sole writer of all of them.**
I state requirements and set no value. The three payoff stingers `B1`, `B2` and `B3` — Stingers,
which holds `stingers`. `B4`, the four pressables, the index open and close, and the one system
notice — interface-sound work, which holds `uiSound`. The continuous beds, and whether the granted
off-edge layer is taken — Ambient, which holds `ambience`. Whether any music exists — Music, which
holds `music`. Which module may create a `Sound` or an `Attachment` — instance-representation
work, raised by Mix as G5. The provisioning gate that uploads these twelve assets — Mix, as a
revision request against `tech/deploy/01`. Every `tiers[]` value, weight and name the `tierIndex`
rows key off — `gameplay/systems/01` and Balance & Tuning; this key reads `patch.tierIndex` and
sets nothing in it.
