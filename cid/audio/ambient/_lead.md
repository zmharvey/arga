# Ambient — domain index

**Category:** Audio · **Wave:** 6 · Reads: `HANDOFF.md`, `CONCEPT.md`, `00-CORE.md`,
`01-FOUNDATION.md`, `02-GAMEPLAY.md`, `03-META.md`, `04-PRESENTATION.md`, `OPEN.md`;
`cid/audio/_category.md`; `cid/_contract.md`, `cid/_state.md`, `cid/_playtest.md`;
`cid/theme/setting/01-the-ruin.md`, `/03-physical-law.md`, `/04-permanence-and-passage.md`,
`/05-inventory.md`; `cid/theme/tone/03-beat-map.md`, `/04-do-nots.md`;
`cid/gameplay/meta/04-the-depth-ladder.md`, `/06-plot-arrangement.md`,
`/07-after-the-last-find.md`; `cid/tech/performance/01-device-floor-and-budgets.md`;
`game/src/client/Beats.luau`; `bridge/schema.mjs`.

**`cid/audio/music/_lead.md` does not exist yet** — the bed-versus-track seam is stated from my
side below, unilaterally and checkably, so Music can adopt or contest it rather than guess.

---

## What the brief gave me

**Nothing about a continuous layer. That is the first and largest finding in this index.**
`OPEN.md §2`'s audio direction is four sentences and every one of them is a *cue*:

> *"Warm, organic, tactile. Clearing is a soft rustle-and-snap; each rarity tier a distinct
> pitched note; a relic reveal owns the best sound in the game. An area's completion gets a
> short resolving chord — the only 'achievement' sound. Music sparse and low."*
> `[I assumed]` → `[brief: soft]`

Clearing, tiers, reveal, completion, music. **No bed, no ambience, no room tone, no air, no
place.** `OPEN.md §1` records *audio intent* at **0 questions**, batched by design. So unlike
Stingers and UI Sound, which at least inherit a starting position to argue with, this domain
has no brief line of any kind and everything below is `[cid: decided]` against silence.

What does reach me is layer 1–3 constraint, and it is heavy:

| constraint | tag | what it does to this domain |
|---|---|---|
| *"8–14, mobile-heavy, short sessions."* `00-CORE.md` | `[brief: binding]` `[you chose: R1 Q4]` | Phone speaker, cheap earbuds, and a large share of sessions muted. A bed heard through a phone speaker at low volume is either present or it is not there at all; there is no third state. |
| *"the smallest game that still gives every creative area real work."* `00-CORE.md` | `[brief: binding]` `[you chose: R1 Q3]` | A bed does not exist to give this domain something to do. Taking zero layers is a compliant output. |
| *"Success is shipped artifacts, not players."* `00-CORE.md` | `[brief: binding]` `[you chose: R1 Q3]` | The output is a table with ids, placement, loop lengths and asset rows. An adjective is not an output. |
| *"Cleared is permanent — overgrowth never returns."* `01-FOUNDATION.md` | `[brief: binding]` `[you chose: R2 Q1]` | Nothing in the continuous layer may announce a return, a refill or a second chance. |
| *"Endless via shuffled authored chunks, not generation."* `03-META.md` | `[brief: binding]` `[you chose: R5 Q1]` | Areas are not distinguishable content, so a per-area bed is a claim about difference the world does not make. |
| *"Consequence: audio and visual feedback carry the entire load"* `02-GAMEPLAY.md` | `[you accepted: step 6 Q2]` → `[brief: soft]` | True of the five beats. **It is not true of ambience**, and saying so is part of my output — see the muted-player line below. |
| *"nobody downstream should invent tension to fill the gap"* `02-GAMEPLAY.md`, elevated by `HANDOFF.md` | relayed `[brief: binding]` by wave 1 (`theme/tone/03`) | No bed that swells, thickens, closes in, or gets quieter as an area nears completion. |
| *"Declined: a full pass with colourblind mode, text scaling and sensitivity options"* `04-PRESENTATION.md` | `[you accepted: R6 Q4]` → `[brief: soft]` | There is no volume control and no settings verb. Whatever level the bed ships at is the level every player has forever. |
| *"Ships and settles. No seasons or events."* `OPEN.md §2` | `[I assumed]` → `[brief: soft]` | No seasonal or event bed, and no reserved slot for one. |
| priority 3: *"real procedural generation · rebirth · offline accrual · codes · daily rewards · leaderboards · trading · seasons and events"* `03-META.md` | `[I assumed — the ordering]` → `[brief: soft]`, hard as a gate | No returning-player bed, no idle-timer layer, no `SoundGroup` or empty layer slot held open for any of them. Naming one in order to forbid it is compliant; silence is not. |

**And what four approved wave-1 sheets already spent on my behalf** — settled facts, not inputs:

- `theme/setting/01-the-ruin`, the grant, verbatim: *"you are granted the one permitted living
  sound in the game — off-screen ambience beyond the worked edge, suggesting life that is never
  seen. **Taking it is your call.** Nothing else here moves or makes noise on its own, and the
  water is dry, so a running-water bed is not available."*
- `theme/setting/03-physical-law` `R5`: *"Continuous is not a change; intermittent is… Anything
  scheduled, intermittent, randomised over time, or varying with anything but a player's action
  is a change of state and fails."* Its consequence line to me: *"nothing randomised over time,
  which is the idiomatic way an ambient bed is built and is forbidden here."*
- `theme/setting/03` `R1` (one hour, *"no cue may vary by hour"*), `R2` (*"No weather, ever, as
  a depicted event"*), `R3` (the sky holds no moving element), `R4` (*"Nothing about the place
  is a function of time"*).
- `theme/setting/05-inventory` `P10` (*"Moving air, unmodelled"*), `A14` (no modelled ambient
  motion inside the built edge; `P9`'s canopy beyond it is the only exemption), and the Audio
  consequence line: *"No water bed, no fire crackle, no mechanism, no cloth or rope, no creaking
  hinge in service."*
- `theme/setting/04-permanence-and-passage` `W1`: a finished part *"gains no marker, plaque,
  dressing, light, colour shift, **sound**, cue or state of any kind"*, and its consequence to
  feedback work: *"No effect, **sound**, fade, camera move or transition may mark passage or
  mark entering a finished part."*
- `theme/tone/03-beat-map`: *"Between two `B1` events the game produces no emphasis other than
  `B5`"*; *"No cue's intensity is a function of progress, streak, count, elapsed time, or
  depth."* `theme/tone/04` `D3`/`D4`: no sub-bass drone, no whisper, no breathing, no heartbeat,
  no creak, no **wind howl**; no riser or whoosh build.
- `tech/performance/01` `budgets.memoryCeilingsByCategory.Sounds` = **20 MB**, floor device,
  `[playtest unknown]` at ±60%, shared across all six audio domains.
- `gameplay/meta/06` `plots`: lane width 120, **pitch 122**, lanes run inward to 3,000 studs and
  beyond; `budgets.streaming.StreamingTargetRadius` 512 loads **nine lanes** at once.
- `gameplay/meta/07` `endgame`: past area 8 the game is an unlimited run of identical Spire
  bays, forever. **Whatever I write is what this game sounds like in its steady state.**

---

## What the brief did not give me

Each routed to the sheet that will have to decide it. None is filled here.

| # | gap | routed to |
|---|---|---|
| **A1** | **The brief specifies no continuous audio layer at all.** Its four audio sentences are five cue moments and a music line; ambience appears in none of them, and `OPEN.md §1` puts audio intent at 0 interview questions. Every ruling in this domain is `[cid: decided]` against a brief that never considered the subject. | `01` |
| **A2** | **Whether the granted off-screen ambience and the soft air bed are one layer or two — two approved sheets disagree inside one file.** `05-inventory` `P10` says air *"reaches the player only **through** Audio's granted off-screen ambience"*, which makes air a component of one layer; the same sheet's Audio consequence line says *"a soft air bed **and** the off-screen ambience… are **both** available"*, which makes them two. | `01` |
| **A3** | **"One living sound" versus "the only living sounds."** `setting/01` grants *"the **one** permitted living sound in the game"*; `05-inventory` calls the air bed and the ambience *"the only living **sounds**"*, plural. Air is not alive, so the reconciliation is probably that the grant is singular and the air bed is a non-living layer — but no sheet says so, and the count is the thing my key has to state. | `01` |
| **A4** | **Nothing says what parents a `Sound`, or what survives a respawn.** `representation` names legal creators for every `GuiObject` and none for a `Sound`; `Beats.luau` holds only a `ScreenGui`. A bed parented to the character restarts on every reset; a bed parented to a persistent client object does not. No sheet in either contract has a position, and the difference is audible. | `01` states the requirement; instance-creation placement is `mix`'s to raise (G5) and representation work's to place |
| **A5** | **`budgets` has no `StreamingSounds` row.** The platform's PlaceMemory tree carries **both** `Sounds` (*"In-memory sounds"*) and `StreamingSounds` (*"Streaming sounds"*) `[research: https://create.roblox.com/docs/studio/optimization/memory-usage]`; `budgets.memoryCeilingsByCategory` budgets only the first. A long looping bed is the single most likely asset in this game to land in the second, and it would then be unbudgeted rather than over budget. | memory-budget work *[Tech & Data — Performance holds `budgets`]*, with the per-domain allocation held by mix work |
| **A6** | **No sheet states whether ambience continues while the index screen is open.** `input.indexScreenSuspendsMovement: true` is the only moment in the game where the player is deliberately not in the world, and nobody has ruled whether the place is still audible from it. | `01` |
| **A7** | **No sheet states what a finished part sounds like.** `setting/04` `W1` forbids a finished part gaining *any* sound, which answers it — identical to an unfinished one — but only as a prohibition on adding, never as a stated equality a build can be failed against. | `01`, as a `forbidden[]` row with an observable |
| **A8** | **Whether the wave-1 word checks reach a `manifest` field that did not exist when they were written.** `setting/01` criterion 4 asserts *"Non-visual ambient audio is exempt, and **no manifest field holds it**"* — the second clause becomes false the moment `ambience` exists. `setting/03` criterion 4's `RW` list bans `breeze|gust|gale|weather|hums|thrums|pulses|breathes|stir|shimmer` across every `manifest` string under `cid/`, which is the exact vocabulary an ambience descriptor reaches for. | `02` |

---

## Why 2 sheets

**I own no merged contract key.** `cid/_contract.md` holds 25 and I read `SCHEMA` in
`bridge/schema.mjs` directly to confirm it — no shell tool in this session, so
`npm run bridge -- --contract` could not be executed. There is no audio key of any kind in
either contract, and my expected proposal, **`ambience`**, would be the first. That is one
sheet, because one sheet carries a key whole (`bridge/merge.mjs:132–141`).

The second is a rule *about* that key rather than a value in it, and it is the only thing in my
subject that cannot be a field: **two approved wave-1 acceptance criteria run whole-word greps
over every `manifest` string under `cid/`, and both of them fire on the words an ambience
descriptor needs.** That is not a value `ambience` holds; it is a constraint on how `ambience`
may ever be written, it carries revision requests against two files I do not own, and it
survives every future edit to the key. Left inside sheet `01` it becomes a paragraph a verifier
runs a grep past; split out it is the adjudication the category lead asked for by name.

**Everything else in my `owns` list is a field, not a sheet.** Weather audio, time-of-day
audio, per-area beds and randomisation are all *zeros*, and a zero with a ruling and an
observable is a `forbidden[]` row — data — not a document. Splitting them into four sheets
would reach a comfortable number and supply nothing a build could read, which is the wave-1
failure this instruction exists to prevent. Positional-versus-global, emitter placement,
density and layering are fields of the one key and belong with the values they constrain.

| # | sheet | must decide |
|---|---|---|
| 01 | `the-continuous-layers` | Decide whether the granted off-screen ambience and the soft air bed are taken at all, and whether they are one layer or two (`05-inventory` `P10` and its own Audio consequence line disagree; `setting/01` says *one* living sound and `05-inventory` says *sounds*), then carry the `ambience` key whole: per layer an id, a machine-readable descriptor precise enough that the upload or Creator-Store pick is orderable work rather than a re-design, the instance type and what it is parented to such that a respawn does not restart it, global-2D versus positional with the emitter count and placement per 120-stud lane and what a neighbour 122 studs away hears, `Looped` true with a stated loop length and the seam rule that keeps the loop from becoming audible across a ~93-second lap repeated for hours, a `SoundId` field carrying whatever unprovisioned sentinel `mix` rules — the engine field is `ContentId` and its default is empty, so `release`'s numeric `0` does not transfer — and volume, roll-off curve and concurrency stated as requirements *on* `mix` rather than set here; plus explicit zeros, each with a ruling and a countable observable, for weather audio (`setting/03` `R2`), time-of-day and per-hour variation (`R1`), per-area and per-depth variation (`tone/03`, `03-META.md`), anything scheduled, intermittent or randomised over time (`R5`), any cue caused by time passing, idling or elapsed session time, any audible change at passage or on entering a finished part (`setting/04` `W1`), any layer that continues past area 8 differently from before it (`endgame`), and any state, count, tier, rank or progress the ambience carries — which is none, and stating that zero is what keeps a muted player's game whole. |
| 02 | `the-ambience-word-check` | Rule whether `theme/setting/01` criterion 4's fauna pattern (`bird\|birds\|animal\|…\|insect\|…`) and `theme/setting/03` criterion 4's `RW` pattern (`…\|breeze\|gust\|gale\|weather\|…\|hums\|thrums\|pulses\|breathes\|stir\|shimmer\|…`) apply to `ambience`'s `manifest` string values, given that `setting/01` criterion 4 asserts *"Non-visual ambient audio is exempt, and no manifest field holds it"* — a statement of fact that this domain's key makes false — and given that both patterns hit the exact vocabulary a descriptor for *off-screen life that is never seen* and *unmodelled moving air* requires; then state the permitted descriptor register as a rule a later reviewer can apply without taste (what a descriptor may assert, what it may only denote, and the substitution that gets an asset ordered without naming a creature, a weather event, a time of day or a thing that stirs), and carry the resulting revision requests against `theme/setting/01` criterion 4 and `theme/setting/03` criterion 4 rather than quietly rewording around the greps or silently repairing them. Carry no `manifest` block and say so in one line: this subject is an adjudication of two other sheets' criteria, its data form is the descriptor strings inside `ambience`, and `ambience` is carried whole by sheet `01`. |

---

## The ruling my category lead asked me to test, with the arithmetic

**The unvarying-bed ruling stands and I am not pushing back.** I reach it on an argument the
category brief does not make, which is stronger than the memory one it does:

**A per-area bed cannot change without being an event at the moment of passage, and that
moment is closed by an approved sheet.** `theme/setting/04` `W1` and its consequence to feedback
work forbid *"any… **sound**… or transition"* marking passage or marking entry to a finished
part, and `plots.liveGeometry` builds the next bay *"at the instant the previous bay's last
patch clears"*. A per-area bed must therefore either crossfade at passage (an audible event
where the world has ruled there is none) or hard-cut (worse). **There is no third construction**,
so per-area variation is structurally unavailable before any budget question is asked.

The arithmetic seconds it and is worth stating because it is the part that reads as a cost:

- **Eight areas are four kinds, not eight.** `depths` gives 2 areas per depth × 4 depths, sharing
  4 set labels (`Terrace · Cistern · Vault · Spire`), and `setting/02` rules depth past 4 is
  *"more parts of the same four kinds."* So the honest maximum is 4 beds, not 8.
- **Those 4 beds cover 21 minutes and then stop mattering forever.** `meta/04` puts the whole
  specced ladder at ~1,265 s; `endgame` makes everything after area 8 a **Spire** bay without
  limit. A per-kind bed buys variety for one to two sessions and delivers exactly one bed for
  every hour after that. The variation is spent precisely where the game is shortest.
- **The budget makes it worse rather than deciding it.** `budgets.Sounds` is 20 MB on the floor
  device, `[playtest unknown]` at ±60%, shared across six domains — and the platform's own
  per-asset ceiling is *"less than 20 MB in size and 7 minutes in duration"*
  `[research: https://create.roblox.com/docs/audio/assets]`. **One maximum-size audio asset is
  100% of this game's entire `Sounds` ceiling.** Multiplying beds by four multiplies the largest
  continuously-resident asset class in the build against the one number nobody has measured, to
  buy a distinction three approved sheets say the world does not make.

**The one variation channel that survives `R5`, and it is not a loophole.** `R5` fails anything
*"varying with anything but a player's action."* A positional emitter's level varies with the
**listener's position**, which is the player's own movement and nothing else — no schedule, no
draw, no clock. So *where you stand* is the only legal input to a continuous layer in this game,
and whether to spend it is sheet `01`'s central call, not mine. It is also the only answer
available to the loop-audibility problem, since `R5` removes randomisation, which is how every
other ambient bed on the platform hides its seam.

---

## The bed-versus-track seam, from my side

Stated unilaterally so Music can adopt or contest it rather than infer it, and written as a
test rather than a description:

> **`ambience` carries every `Sound` whose `Looped` is `true`, whose `Playing` becomes `true`
> once per session and never becomes `false`, and which has no onset, no phrase, no meter and no
> pitch a listener could name. `music` carries everything else.**

Three consequences I hold myself to:

1. **If Music writes a track with no onset, no meter and no stop condition, it has written a
   bed** and it belongs in `ambience`, because two keys claiming one continuously-resident
   `Sound` is the collision the merger rejects after both are written.
2. **If Music rules `trackCount: 0`, `ambience` does not grow to fill it.** My layer count is
   decided against `setting/01`'s grant and `05-inventory` `P10` and against nothing else. A
   silence Music chose is not a brief for me.
3. **Surface row 27 is shared and does not collide**, because the two `forbidden[]` rows have
   disjoint scope: I state the zero for continuous layers, Music states it for tracks. Neither
   restates the other's.

`Beats.luau`'s five cue bodies are **not mine** and I claim none of them. Ambience is the only
audio in this game that is not a cue, has no beat, never enters that scheduler's queue, and
touches no `response` budget.

## What a muted player loses

**Nothing, and that is deliberate rather than a shortfall.** Ambience carries no state, no count,
no tier, no rank and no progress, so it contributes **zero** to `mix`'s `audioOnlyBeats`
invariant and cannot widen it. A player at 8 with the phone muted loses the sense that the place
is somewhere — which is the entire point of the layer and none of its information. Sheet `01`
states that as a manifest value so a later sheet cannot quietly make the bed carry something.
**The invariant itself is `mix`'s; I supply a term to it and do not hold it.**

## What I considered and deliberately did not assign

- **A sheet per zero** (weather, time-of-day, per-area, randomisation). Four headings, no
  decisions. Each is a `forbidden[]` row in `ambience` with a ruling and an observable, which is
  a form a build can be failed against; a sheet is not.
- **A reverb or space sheet.** `SoundService.AmbientReverb` is a real global with real audible
  reach `[research: https://create.roblox.com/docs/reference/engine/classes/SoundService]`, but
  it colours **every** sound in the game including all five beats. That is a mix-bus decision by
  construction and it belongs to `mix`. Named here so nobody reads its absence as an oversight,
  and routed rather than taken.
- **An audibility radius for a neighbour's ambience.** G7 is `mix` (roll-off) plus SFX (whether
  a cue is 3D at all). What I owe is the *requirement* — if my layer is positional, nine lanes
  are inside `StreamingTargetRadius` 512 at pitch 122 and the concurrency cap has to survive it
  — and sheet `01` states that against `mix` rather than deciding it.
- **A loop-authoring or asset-production sheet.** Loop length and seam rule are fields of the
  layer they describe; splitting them produces a document that cannot be checked without the
  sheet it was split from.
- **Anything about the canopy's motion.** `05-inventory` `P9` permits modelled motion beyond the
  built edge and `setting/01`'s playtest escalation step 2 pairs it with raising my ambience.
  The motion is Art's; only the sound is mine, and sheet `01` says so without claiming the
  visual.

---

## The contract key this domain needs

**`ambience`** — proposed, not merged. It does not exist in `bridge/schema.mjs` and neither
contract holds any audio key. What it would hold:

`layerCount` · per layer: `id`, `descriptor`, `instanceClass` and `parentedTo`,
`spatialisation` (`global2D` | `positional`) with `emitterCount` and `placement` per lane,
`looped`, `loopSeconds`, `seamRule`, `soundId` at `mix`'s sentinel, `assetSource`
(`creatorStore` | `upload`), `approxSizeMB`, `volumeRequirementOnMix`, `rollOffRequirementOnMix`
· `variesWith: "none"` · `weatherAudio: 0`, `timeOfDayAudio: 0`, `perAreaVariation: 0`,
`perDepthVariation: 0`, `randomisedOverTime: false` · `carriesNoState: true` ·
`forbidden[]` (each row: the sound, the ruling, the observable) · `invariants[]` ·
`requestedRevisions[]`.

**The load-bearing property of that shape:** every field is a value or a count, and the build
must boot with every `soundId` at the sentinel and produce **silence rather than an error**.
That is the same acceptance shape `release` already uses for `gamePassId`, and it is why this
domain can ship before a single asset is uploaded.

---

## Verification note

**Sheet `01` is the one most likely to be contradicted, and `mix` is most likely to do it**, on
three fields in descending order of likelihood:

1. **The `SoundId` sentinel.** `mix` rules it once for six domains and my rows must adopt
   whatever it picks. My research narrows it — the field is `ContentId` with an empty default
   `[research: https://robloxapi.github.io/ref/class/Sound.html]`, so `release`'s numeric `0`
   demonstrably does not transfer — but the choice between `""` and a sentinel string is theirs.
2. **The 20 MB `Sounds` allocation.** If `mix` splits the budget six ways, a continuously
   resident looping bed is the largest single claim in the category and the split may not fund
   the loop length sheet `01` needs. The residue then routes to loop length, not to layer count.
3. **Roll-off and concurrency if the layer is positional.** Nine lanes inside a 512-stud
   streaming radius at pitch 122 is `mix`'s cap to set, and it can make a positional design
   illegal after I have specced it.

Second most likely: **sheet `02` contradicted by category verification**, if the ruling on the
two wave-1 greps goes the other way and the descriptor vocabulary has to be rebuilt inside the
banned token lists rather than exempted from them.

**One contradiction I am carrying rather than resolving**, per G6: `theme/setting/03` `R5`
states its check as *"this is `tone/04-do-nots` `X1`'s trigger count"*, and the shipped
`tone/04-do-nots` has ids `D1`–`D15` and **no `X1`** — nor any audio row whose substance is
*"nothing moves or sounds that the player did not cause"* (`D2` is Art's and `D3`/`D4` are
palette exclusions). So `R5`, the rule this entire domain turns on, cites a check that does not
exist on disk. **The substance of `R5` survives on its own sentence and I rely on that**; both
sheets cite the shipped ids and flag the drift rather than repairing it.

---

## Research owed

No `must_verify` is declared on `ambient-lead` in `docs/cid-workflow.json`. I fetched anyway,
because this is the last point in the chain where anything can be fetched for this domain and
every unfetched fact becomes a `[research owed:]` my writer must reason around.

**Fetched and banked** (these are the only external evidence sheets `01` and `02` may cite):

| what | source |
|---|---|
| A `Sound` parented to a `BasePart` or `Attachment` is positional; one in `SoundService` or `Workspace` emits *"throughout the game"* with *"volume and pan position remain the same regardless of the user's sound listener position."* Four `RollOffMode` curves; *"low RollOffMaxDistance values cause audio to abruptly cut off."* `Looped` is what prevents *"abrupt silence"*, and the guide recommends storing background audio in `SoundService` | `[research: https://create.roblox.com/docs/sound/objects]` |
| `Sound` is **not deprecated**. `SoundId` type **`ContentId`**, default empty; `Looped` default `false`; `Volume` default `0.5`; `RollOffMode` default `Inverse`; `RollOffMinDistance` `10`; `RollOffMaxDistance` `10000`; `LoopRegion` and `PlaybackRegion` both `NumberRange(0, 60000)`; `SoundGroup` default nil. `MinDistance`/`MaxDistance`/`EmitterSize` are deprecated in favour of the `RollOff*` set | `[research: https://robloxapi.github.io/ref/class/Sound.html]` |
| Property list confirming `PlaybackRegion`, `LoopRegion`, `TimePosition`, `SoundGroup`, `PlayOnRemove`, `IsLoaded` exist on `Sound` | `[research: https://create.roblox.com/docs/reference/engine/classes/Sound]` |
| Audio assets must be *"less than 20 MB in size and 7 minutes in duration"*, ≤ 48 kHz, mono or stereo. Import cap 2,000 per 30 days ID-verified / 100 otherwise. Asset privacy *"automatically ensures that the IDs of your imported audio can't be accessed by users without proper permissions."* The Creator Store carries *"more than 100,000 professionally-produced sound effects and music tracks"* free to use by asset id | `[research: https://create.roblox.com/docs/audio/assets]` |
| **The PlaceMemory tree has two audio categories**, `Sounds` (*"In-memory sounds"*) and `StreamingSounds` (*"Streaming sounds"*). This also closes `tech/performance/01`'s stated `[research owed:]` against this exact page | `[research: https://create.roblox.com/docs/studio/optimization/memory-usage]` |
| The new Audio API (`AudioPlayer`, `AudioEmitter`, `AudioListener`) **exited Studio beta, 10 September 2024**, and the announcement says nothing about the legacy `Sound` being deprecated | `[research: https://devforum.roblox.com/t/roblox-audio-api-exits-beta-enhanced-sound-controls-now-available/3153454]` |
| `SoundService.AmbientReverb` (`Enum.ReverbType`), `DistanceFactor`, `DopplerScale`, `RolloffScale`, `DefaultListenerLocation`, `PlayLocalSound` | `[research: https://create.roblox.com/docs/reference/engine/classes/SoundService]` |

**Could not settle — each with the specific fetch or reading that would:**

1. **Whether `Sound:Play()` with an empty `SoundId` is silent or warns.** `[unverified]` — the
   class reference does not state it and neither does the sound guide. This bears directly on
   the acceptance criterion *"a build with every audio id unprovisioned boots and is silent
   rather than erroring."* **What would settle it:** the engine reference for `Sound:Play` from
   a client the docs CDN does not truncate, or one Studio run with a `Sound` at the default
   `SoundId` and the output window open.
2. **What selects between `PlaceMemory.Sounds` and `PlaceMemory.StreamingSounds`, and which one
   a long looping ambient asset lands in.** `[unverified]` — the memory page names both
   categories and defines neither's selection rule. This decides whether the bed is charged
   against `budgets.Sounds` (20 MB) or against nothing at all. **What would settle it:**
   `create.roblox.com/docs/audio/assets` streaming section fetched in full, or a Developer
   Console `Memory → PlaceMemory` reading on the floor device with one known bed loaded.
3. **In-memory bytes per second of a loaded Roblox audio asset.** `[unverified]` — the platform
   publishes an *upload* ceiling (20 MB / 7 min) and no decoded-residency figure, so my loop
   arithmetic above is bounded by the upload limit rather than by the real cost. **What would
   settle it:** a `Memory → PlaceMemory → Sounds` reading on the floor device with a single
   asset of known duration loaded, which is the same unowned measurement `tech/performance/01`
   already flags — *"no sheet in either contract owns taking a measurement."*
4. **Whether the legacy `Sound` path remains the supported one for new builds now that the Audio
   API is out of beta.** `[unverified]` — the exit announcement is silent on `Sound`'s status
   and the API reference does not mark it deprecated, which is evidence and not a statement.
   Sheet `01` should specify `Sound` on that evidence and record the alternative. **What would
   settle it:** a Roblox migration or deprecation note naming `Sound` explicitly.

`npm run bridge -- --contract` **could not be executed** — this session has no shell tool. I read
`SCHEMA` in `bridge/schema.mjs` directly (25 keys, owners `gameplay/*`, `theme/vocabulary`,
`art/objects`) and cross-checked it against `cid/_contract.md`. Neither holds an audio key.
`[research: repo — bridge/schema.mjs:29–560, cid/_contract.md, read this run]`
