# SFX — domain index

**Category:** Audio · **Wave:** 6 · Reads: `HANDOFF.md`, `CONCEPT.md`, `00-CORE.md`,
`01-FOUNDATION.md`, `02-GAMEPLAY.md`, `03-META.md`, `04-PRESENTATION.md`, `OPEN.md`,
`cid/audio/_category.md`, `cid/_contract.md`, `cid/_state.md`, `cid/gameplay/mechanics/05-response-contract.md`,
`/04-tool-as-object.md`, `/06-traversal-affordances.md`, `cid/theme/tone/03-beat-map.md`,
`/04-do-nots.md`, `game/src/client/Beats.luau`, `bridge/emit-config.mjs`, `bridge/schema.mjs`.

**Contract keys I own: one, and it does not exist yet.** `sfx` is absent from the 25 merged
keys in `cid/_contract.md`, absent from the wave 4–5 proposal queue, and `bridge/schema.mjs`
contains no `sfx`, `ambience`, `uiSound`, `stingers`, `mix` or `music` — grep returned zero
matches. Audio is an entirely unspecced area of the contract. `sfx` should hold: every sound
tied to an in-world action or event, as rows carrying an id at a sentinel, a machine-readable
descriptor, volume, positional-or-global, roll-off distances, required overlapping-voice count,
preload flag and variation rule; the disposition of each platform-default character sound; and
a `forbidden[]` of every stated zero with a ruling and an observable.

*I could not run `npm run bridge -- --contract` — this agent has no Bash tool. I read the file
that command derives (`cid/_contract.md`) and `bridge/schema.mjs` directly instead, which is
the same information one step earlier.*

## What the brief gave me

- *"Clearing is a soft rustle-and-snap; each rarity tier a distinct pitched note"* `[brief: soft]`
  ← `[I assumed]`, `OPEN.md §2`. **The whole of the brief's position on my subject**, at
  0 interview questions (`OPEN.md §1`, "audio intent — I assumed — §2").
- *"Warm, organic, tactile."* `[brief: soft]` ← `[I assumed]`, `OPEN.md §2`.
- *"audio and visual feedback carry the entire load"* `[brief: soft]` ← `[you accepted: step 6 Q2]`,
  `02-GAMEPLAY.md`.
- *"8–14, mobile-heavy, short sessions"* `[brief: binding]` ← `[you chose: R1 Q4]`, `00-CORE.md`.
  Phone speaker, and a large share of sessions muted.
- *"the smallest game that still gives every creative area real work"* `[brief: binding]`
  ← `[you chose: R1 Q3]`, `00-CORE.md`. A sound does not exist to give me something to do.
- *"Input: movement only"* `[brief: soft]` ← `[you accepted: step 6 Q3]`, `02-GAMEPLAY.md`,
  overruled once by **R-1** and not widenable. Five verbs, so five things a player can do.
- *"nobody downstream should invent tension to fill the gap"*, relayed at `[brief: binding]`
  strength by `theme/tone/03`. No ramp, no swell, no cue whose intensity reads progress.
- **`response`** `[merged key]`: `patchClear` at **80 ms**, test 40–120, residue 0.4 s,
  `queued: false`, `minSustainedOnsetsPerSecond` **8**, `onOverload: "overlap"`, *"Overlap is
  the required degradation; dropping is not"*, `negativeBeats: 0`, `lockoutsSeconds: 0`.
- **`theme/tone/03`** `B5`: *"Exactly one intensity, every time, forever. No streak escalation,
  no combo, no rising pitch ladder, no crescendo near completion."* Note what is **not** in its
  banned-input list (*progress, streak, count, elapsed time, depth*): **tier is not there.**
- **`theme/tone/04`** `D3`/`D4` `[cid: decided]` — my palette exclusions, auditing Audio by name.
- **`tool`** `T1`: never swings, *"plays no swing, chop, sweep or attack animation"*;
  `input.worldObjectsTriggeringAVerb: 0`. **The tool's sound is structurally zero.**
- **`traversal`**: `jump.exists: true` at the platform default, `fall.damage: false`,
  `death.authoredCue: "none"`, zero climbable surfaces, zero water, zero speed-modifying
  surfaces. Four of the ten platform character sounds are unreachable by world rule.
- **`theme/setting/05-inventory`**: twelve classes of matter, `A1` no fauna, `A7` no fire,
  `A11` nothing operable, water dry. **Creature vocals and machine sounds are structurally zero.**
- **`budgets.memoryCeilingsByCategory.Sounds` = 20 MB** `[playtest unknown]`, shared across all
  six audio domains, allocated by Mix.
- **`tech/deploy/02`**: an emitted value may never be an explicit null — verified against
  `bridge/emit-config.mjs:79`, `if (value === null || value === undefined) return 'nil';`
  `[research: bridge/emit-config.mjs]`. Absence is a declared sentinel of the field's own type.

## What the brief did not give me

Named, routed, not filled.

| gap | routed to |
|---|---|
| **Whether clearing has an audio channel at all.** `response.beats[patchClear].channels` is `["atPatch","readout"]`; the same sheet's consequence section says *"audio is the one channel every beat shares"*; `OPEN.md §2` and `theme/tone/03` both give `B5` a sound. **G1.** | **01** |
| **Where the brief's per-tier pitched note can live.** `rarity` is one graded ladder read from `patch.tierIndex` and *"a Find has no rarity of its own"* (`systems/03`), and `rarity.forbidden` bans a reveal cue that varies by set. So the tier note cannot attach to `B1`. **If `patchClear` has no audio channel it has nowhere in the game to live.** The brief never says which cue carries it. | **01** (whether), **03** (what) |
| **Whether the platform's default character sounds play.** Ten of them ship in every R15 character and no sheet in either contract mentions one. In a movement-only game this is the most-heard audio the player has. **G4.** | **02** |
| **Whether a clear cue is positional at all.** `social.maxCoPresenceSeparationStuds` 128 is a *sight* rule; `plots.pitchStuds` 122; `StreamingMinRadius` 160. Nothing states whether a neighbour is audible. **G7** — the roll-off curve is Mix's, whether the cue is 3D is mine. | **03** |
| **Whether the bay build / area transition makes a sound.** `tone/03` forbids *"entering or leaving an area"* from peaking but does not forbid a sound; `plots.advance` describes the event and no sheet gives it a channel. | **03** |
| **What carries the clear when sound is off.** Derived, not given: `patchClear` already holds `atPatch` and `readout`, so audio is additive and `audioOnlyBeats` stays 0. Mix holds the invariant; I may not break it. | **03** states it, **Mix** holds it |
| **Who creates a `Sound` instance.** `representation` names a legal creator for every `GuiObject` and none for a `Sound`; `Beats.luau` holds only a `ScreenGui`. **G5** — Mix raises it, the architect places it. | **Mix** |
| **What sentinel a `SoundId` takes when unprovisioned.** `release.provisioning.unprovisionedIdValue` is `0`, but `SoundId` is a `ContentId` (string), so `0` does not transfer. **Mix rules this once for six domains.** Sheet 03 uses the empty string as a placeholder and follows Mix. | **Mix**; **03** follows |

## Why 3 sheets

**One value sheet, because I own exactly one key, and `bridge/merge.mjs` allows exactly one
sheet to propose it.** Everything in `sfx` with a data form — cue rows, the ten character-sound
dispositions, the `forbidden[]` zeros — is therefore in sheet 03 and nowhere else. The two
non-value sheets each earn their place by being a *ruling that constrains `sfx`* rather than a
value in it, and each is separable: reverse 01 and the key loses its `patchClear` row entirely;
reverse 02 and the key gains four movement cue rows it does not have. Neither is a heading on
sheet 03, because both are arguments against sheets somebody else owns and both need a
`## Pushing back` of their own to be findable later. I considered and rejected four more:
a sonic-palette sheet (`D3`/`D4` already fix the exclusions; timbre is a descriptor field, not
a decision), a variation-rule sheet (it is a parameter of one cue, not a second decision), a
zeros sheet (zeros are a `forbidden[]` array, and an array is not a document), and a
neighbour-audibility sheet (it is one boolean field, and the curve belongs to Mix).

| # | sheet | must decide |
|---|---|---|
| 01 | `the-clear-has-a-channel` | Rule that `patchClear` gains an `audio` channel and write the argument: two `## Pushing back` sections, one naming `gameplay/mechanics/05` (whose `beats[patchClear].channels` omits `audio` while its own consequence section states *"audio is the one channel every beat shares"*, and which nowhere argues for a silent clear) and one naming `theme/tone/03-beat-map` by beat id `B5` and by file (whose *"may occupy: one channel"* cell uses a media taxonomy that predates `response`'s site taxonomy, is already exceeded by two approved and shipped channels, and is enforced by none of that sheet's own four acceptance criteria); a revision request against each, the `mechanics/05` one being the single array element `"audio"` and nothing else; and the containment, stated as an invariant sheet 03 must satisfy — the `patchClear` cue reads its channel list from config and is silent-and-correct rather than broken on a build against today's unamended `response`, and adding `audio` raises no new warning in `Beats.luau`'s `checkContract` because `patchClear` is in `unsequencedBeats` and carries no `forbiddenChannels`. Carry no manifest. |
| 02 | `platform-character-sounds` | Rule, one row per sound, the disposition of each of Roblox's ten default character sounds — Died, Running, Swimming, Climbing, Jumping, GettingUp, FreeFalling, FallingDown, Landing, Splash, created client-side by the `RbxCharacterSounds` CoreScript and overridable only by a LocalScript of the same name in `StarterPlayerScripts` — as exactly one of `keep`, `silence` or `unreachable`, each citing the sheet that settles it (`traversal` removes water, climbable surfaces and fall damage; `traversal.death.authoredCue` is `"none"` and `response.negativeBeats` is 0); state the standing prohibition this puts on sheet 03, that `sfx` authors no footstep, jump, landing or death cue and spends none of the 20 MB `Sounds` ceiling on movement; and state the one argument against keeping (`theme/setting/05-inventory` closes the world to twelve classes of matter and a generic footfall asserts a surface that list may not contain) and why it does not carry. Carry no manifest; the ten dispositions land in sheet 03's `sfx.characterSounds`. |
| 03 | `the-sfx-key` | Supply `sfx` whole, as one manifest: the `patchClear` cue row (target audible length at or under the 0.4 s residue, volume, `positional` true or false, roll-off min and max distances, priority, **the required overlapping-voice count — a single `Sound` instance cannot overlap itself, `Play()` restarts it, so eight onsets per second needs a pool and the row must say how deep**, `preloadRequired`, and the variation rule that stops eight identical onsets a second reading as a machine gun); the ruling on whether pitch varies by the cleared patch's `tierIndex`, which is permitted by `theme/tone/03` only if loudness, length and timbre are identical across tiers and the same tier sounds identical at every depth, and which is worth its asset rows only if it survives that the audience plays muted and `rarity` already carries tier in silhouette; the disposition rows from sheet 02 as `characterSounds`; the rulings on the tool, the bay build and a neighbour's clear, each as a row or a zero; a `forbidden[]` carrying every stated zero with its ruling and an observable, including creature and NPC vocals (`setting/05` `A1`, `identity/04`, `D13`), object and machine sounds (`setting/05` `A11`, `input.worldObjectsTriggeringAVerb: 0`), a swing or impact cue on the tool (`tool` `T1`), a death cue (`traversal`), a rejection or failure cue (`negativeBeats: 0`), another player's join, leave or progress (`social/03` `X11`), any cue caused by time passing, and a named row for each priority-3 item forbidden by ruling rather than by silence; and every id at the unprovisioned sentinel with a descriptor complete enough that uploading it is orderable work — never an explicit null, since `bridge/emit-config.mjs:79` maps null to `nil` and Luau drops the key. Carry the `sfx` manifest. |

## Verification note

**Sheet 01 is the one most likely to be contradicted, and by Mechanics.** It asks the owner of a
merged, shipped key to change a value the running build reads, on the argument that the value
contradicts its own sheet's prose. Mechanics can decline: the manifest is the merged artifact and
the consequence paragraph is not, so "the prose is wrong" is an available answer. If it is
declined, sheet 03's `patchClear` row becomes unreachable data and the brief's per-tier pitched
note has no home anywhere in the game — which is the consequence 01 must state so the decline is
made with it in view. Sheet 01 also overturns a wave-1 sheet, which `theme/tone/03` permits to
exactly two kinds of work, one of them audio intent, by the route it names (name the `B` ids,
cite the file).

**Second most likely: sheet 03's overlapping-voice count, contradicted by Mix.** Mix owns the
concurrency cap and the 20 MB allocation, and a cap that steals a voice interacts with
`onOverload: "overlap"` and with *"dropping is not"*. My reading, which 03 must state so Mix can
reject it explicitly: stealing the ringing tail of an earlier instance of the **same** cue is not
dropping an onset, because the onset began and was audible at its attack; refusing to start an
onset is. If Mix rules otherwise the voice count is Mix's, not mine.

**Sheet 02 is unlikely to be contradicted and likely to be quietly ignored**, which is worse. Its
output is mostly "keep what the engine already does", and a builder who never reads it ships the
same result. Its value is the four `unreachable` rows and the prohibition on sheet 03, both of
which are checkable.

**A trap for the writer, inherited from Ambient's warning and equally live here.** Two wave-1
acceptance criteria run whole-word greps over **every `manifest` string value under `cid/`**:
`theme/setting/01` criterion 4 (`bird|birds|animal|animals|beast|insect|…`) and `theme/setting/03`
criterion 4 (`breeze|gust|gale|weather|hums|thrums|pulses|breathes|stir|shimmer|glow`). A sound
*descriptor* string is exactly where those words appear by reflex. "Rustle-and-snap" is safe;
"a soft stir", "shimmer", "breathes" are not. `sfx` emits **zero player-facing strings**, so
`vocabulary.maxLabelChars` and `allowedPattern` bind nothing here — but `bannedWords` includes
`tier`, and the tier-pitch ruling will want the word. It is a systems term (`patch.tierIndex`,
the merged `tiers` key), not a player-facing one; state that reading in the sheet rather than
working around it silently.

## Research owed

`must_verify`: *whether the platform's default character sounds are present in an R15 character
in a shipped place, and whether they can be replaced or silenced.* **Fetched and settled.**

- **They exist and they are ten.** The default set is `"Died, Running, Swimming, Climbing,
  Jumping, GettingUp, FreeFalling, FallingDown, Landing, Splash"`, with Running, Swimming and
  Climbing looped and Jumping, GettingUp and Died one-shot; Landing and Splash scale volume with
  vertical speed, FreeFalling fades in over 1.1 s above 75 studs/s
  `[research: https://raw.githubusercontent.com/Roblox/Core-Scripts/master/PlayerScripts/StarterCharacterScripts/Sound/LocalSound.client.lua]`.
- **They are created client-side, not by the place.** *"those sounds in the humanoidrootpart are
  created on the player client, not on the server"*, so a server script cannot silence another
  player's footsteps
  `[research: https://devforum.roblox.com/t/disabling-default-footsteps-sounds/1342744]`.
- **The override is a name collision, not an API.** *"create a new LocalScript inside
  StarterPlayerScripts, rename it to RbxCharacterSounds"*, which supersedes the CoreScript
  `[research: https://devforum.roblox.com/t/disabling-default-footsteps-sounds/1342744]`.
  Corroborated: the recommended method is copying the default script into `StarterPlayerScripts`
  and editing ids there rather than reaching into character descendants
  `[research: https://devforum.roblox.com/t/change-default-sounds-in-rbxcharactersounds/1162202]`.

Fetched beyond `must_verify`, because sheet 03 has to justify its numbers and the writer has no
fetch tools:

- **Positional vs global is decided by parent.** *"Volume changes depending on the distance
  between the user's sound listener and the position of the part"* when parented to a BasePart or
  Attachment; parented to `SoundService` or `Workspace`, *"Volume and pan position remain the same
  regardless of the user's sound listener position or rotation"*. A BasePart parent emits from the
  whole surface; an Attachment emits from a point
  `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/sound/objects.md]`.
- **`Volume` default is 0.5, range 0 to 10** `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/reference/engine/classes/Sound.yaml]`.
- **`RollOffMode` defaults to `Inverse`; `EmitterSize` is deprecated — use `RollOffMinDistance`
  and `RollOffMaxDistance`**
  `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/sound/objects.md]`.
- **One `Sound` cannot overlap itself.** `Play()` *"sets TimePosition to the last value set by a
  script (or 0 …), then sets Playing to true"*
  `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/reference/engine/classes/Sound.yaml]`,
  and the community reading is unambiguous — *"doing this restarts the sound if it was already
  playing"*, overlap requires multiple instances
  `[research: https://devforum.roblox.com/t/how-do-you-play-a-sound-without-restarting-it/1101216]`.
  **This is why `response`'s `onOverload: "overlap"` at 8/s is a data requirement and not a
  note:** a builder handed one row with one id builds a machine-gun restart, which two builders
  would not converge on.
- **Audio provisioning.** Imported audio is private by default; *"The asset privacy system
  automatically ensures that the IDs of your imported audio can't be accessed by users without
  proper permissions"*, and permission is granted per experience. The Creator Store carries
  *"more than 100,000 professionally-produced sound effects and music tracks"* that are
  free-to-use. Formats `.mp3`, `.ogg`, `.wav`, `.flac`; under 20 MB and 7 minutes; sample rate
  ≤ 48 kHz; 2,000 imports per 30 days if ID-verified, 100 if not; uploads enter moderation and
  are visible only to the uploader until approved
  `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/audio/assets.md]`.
  **Consequence for sheet 03's asset rows:** the descriptor must say Creator-Store-or-upload,
  because the two have different provisioning latency and only one has a moderation queue.
- **A newer API exists.** *"Sound objects don't have the same dynamic functionality as AudioPlayer
  objects"*, and the docs recommend `AudioPlayer` for new implementations
  `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/audio/assets.md]`.
  **Not my call** — instance class routes to whoever places the `Sound`/`AudioPlayer` creator
  (G5, Mix to raise, `representation` to place). Sheet 03 states its rows in fields both APIs
  have, so the choice does not reopen the key.

Could not settle, each with the fetch that would:

- `[unverified]` **Where the current `RbxCharacterSounds` parents its Sound instances.** The
  archived `Core-Scripts` version parents to the **Head**; devforum threads consistently describe
  the sounds in **HumanoidRootPart**. Both cannot be current. Settled by fetching the live
  `RbxCharacterSounds` CoreScript source, or by opening a published place in Studio and reading
  the character's descendants at runtime. **Nothing in my three sheets depends on it** — the
  disposition table is per sound name, not per parent — but a builder implementing `silence` does
  depend on it, so 02 must carry it as `[unverified]` rather than pick one.
- `[unverified]` **The documented default of `SoundId`.** The `Sound.yaml` fetch returned the
  type (`ContentId`) and no default. Settled by the Studio property window on a fresh `Sound`, or
  by `robloxapi.github.io/ref/class/Sound.html`. This is Mix's sentinel ruling and not mine;
  sheet 03 uses `""` as a placeholder and states that it follows Mix.
- `[unverified]` **Any documented simultaneous-voice limit in the engine.** Neither the `Sound`
  reference nor `sound/objects.md` states one. Settled by the `SoundService` reference or an
  engine-limits page. Sheet 03 must therefore state its required overlap depth as a design
  requirement rather than as headroom against a known cap, and route the cap to Mix.
- `[unverified]` **Nothing in this pipeline has ever heard this game.** `cid/_playtest.md` is
  `n = 1`, area 1, with no audio in the build. Every figure in sheet 03 is `[playtest unknown]`
  with a test range, and no sheet in either contract owns taking the measurement.
