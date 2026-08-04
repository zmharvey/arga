# VFX — domain index

**Category:** Art & Visuals · **Wave:** 6 · **Writes to:** `cid/art/vfx/_lead.md`

**Reads (actually read this run):** `concept/spec/incremental-spinoff-v2/` — `HANDOFF.md`,
`CONCEPT.md`, `00-CORE.md`, `01-FOUNDATION.md`, `02-GAMEPLAY.md`, `03-META.md`,
`04-PRESENTATION.md`, `OPEN.md` (§1–§6). Then `cid/art/_category.md` (all 685 lines),
`cid/_contract.md`, `cid/_state.md`, `cid/_playtest.md`,
`cid/gameplay/mechanics/05-response-contract.md`, `cid/theme/tone/03-beat-map.md`,
`cid/theme/tone/04-do-nots.md`, `cid/theme/setting/05-inventory.md`,
`cid/theme/setting/04-permanence-and-passage.md` (VFX consequence block, `W1`),
`cid/gameplay/systems/03-rarity-ladders.md` (`forbidden[]`),
`cid/gameplay/systems/05-the-find-ledger.md` (`repeat.possible`),
`cid/gameplay/meta/07-after-the-last-find.md` (`extinctPayoffKinds`),
`cid/ui-ux/feedback/01-the-notice-channel.md`, `cid/audio/_category.md`,
`cid/tech/performance/01-device-floor-and-budgets.md`, `/02-server-frame-cost.md`,
`/03-what-optimisation-may-never-do.md`. Shipped code: `game/src/client/Beats.luau`,
`game/src/shared/Protocol.luau`, `game/src/server/Clearing.luau`, `game/src/server/Plots.luau`.
`cid/art/style/_lead.md` **does not exist yet** — Style Guide has not written; I cite
`styleGuide` by name and never by value.

`npm run bridge -- --contract` **could not be executed: this session has no shell tool.** I read
`cid/_contract.md`, which that command regenerates from `bridge/schema.mjs`. **25 merged keys,
none of them mine.** No wave 4–6 proposal named `effects` (checked against the 19 proposals
listed in `cid/audio/_category.md` and the seven wave-6 art keys), so `effects` is a clean
proposal and not a second claim on an existing key.

---

## What the brief gave me

Almost nothing, and that is the first finding. **The brief contains zero lines about visual
effects.** It is worth stating exactly, because I was told otherwise on the way in.

- **Correction to my assignment.** I was told *"`OPEN.md` §2 carries the tagged visual-feedback
  defaults."* **It does not.** `OPEN.md` §2 has exactly four blocks — Audio intent, Technical
  shape, Measurement, Live-ops intent — and none of them is visual feedback. `OPEN.md` §1's
  coverage audit has **no row** for visual feedback at any layer. The only visual row is
  *"art direction | you accepted (R5 Q2) | 1"*, which is the `ui-forge` vibe key and reaches
  nothing I own. I read the source rather than the retelling, which is why this is here.
- *"**Consequence: audio and visual feedback carry the entire load**"* `02-GAMEPLAY.md`,
  `[you accepted: step 6 Q2]` → `[brief: soft]`, **elevated by `HANDOFF.md` six-things #4 to
  `[brief: binding]` on the instruction** and rested on by two approved wave-1 sheets. Half of
  everything the player is told about their own progress is mine. **This is the whole of the
  brief's positive direction to this domain.**
- *"nobody downstream should invent tension to fill the gap"* `02-GAMEPLAY.md` / `HANDOFF.md` —
  **`[brief: binding]` on the instruction.** No ramp, no escalation, no approach-to-completion.
- *"Left open — … how 'completely clear' is celebrated"* `OPEN.md §4`, routed to *Mechanics* —
  `[brief: soft]`. Mechanics answered the **when** (`response`) and explicitly did not answer
  the **what**: *"What any beat sounds like, looks like, is made of… (Audio, Art and Visuals,
  UI/UX)"*.
- *"Target: the smallest game that still gives every creative area real work"* and
  *"content design is the primary creative work on this project, **not art**"* `00-CORE.md`,
  both `[brief: binding]` ← `[you chose: R1 Q3]` / `[R1 Q1]`. A stated zero is compliant; an
  effect that exists to give this domain something to do is not.
- *"8–14, mobile-heavy"* `00-CORE.md` `[brief: binding]` ← `[you chose: R1 Q4]`. Every effect is
  rendered by a phone. Fill rate, not taste, is the ceiling.
- *"Tone: warm, aged, unhurried. Not spooky, not grim, not a power fantasy"* `01-FOUNDATION.md`
  `[brief: soft]`; *"warm and unhurried, not spooky"* `04-PRESENTATION.md` `[brief: soft]`.
  Already converted into `D1`–`D15` by `theme/tone/04`; I inherit the list and do not re-derive
  the register.
- *"Cleared is permanent — overgrowth never returns"* `01-FOUNDATION.md` `[brief: binding]` ←
  `[you chose: R2 Q1]`. No effect may read as regrowth, return, refill or reset.
- Priority 3 (`03-META.md`, `[brief: soft]` on provenance, **hard as a gate**): no seasonal,
  event, daily, rebirth, code, leaderboard or trading effect, and **no reserved cue slot,
  unused emitter, `forbidden` stub or "future" field held open for one.** Naming one to forbid
  it is compliant.

Everything else binding on me arrives through approved keys, not the brief: `response` (the two
lifetimes, the channel exclusivity, the five beats), `theme/tone/03` (`B1`–`B5`, the forbidden
peaks, one intensity forever), `theme/tone/04` (`D2`, `D5`, `D13`, `D14`, `D15`),
`theme/setting/05` (`A7`, `A14` + criterion 2, and the carve-out written for me:
*"The clear-away effect on a patch is a player-caused event and is not ambient motion, so `A14`
does not reach it"*), `theme/setting/04` (`W1`; *"No effect, sound, fade, camera move or
transition may mark passage or mark entering a finished part"*), `theme/identity/03` (a clear or
completion cue may not be reused on plot construction), `rarity.forbidden` (no reveal cue that
varies by set), `discovery.repeat.possible: false`, `endgame.extinctPayoffKinds`,
`notices` (the reveal has **zero** HUD-space component; `atPatch` is mine exclusively),
`budgets`, `serverCost`, and `N1`/`N7`/`N14`/`N15`/`N16`/`N17`.

---

## What the brief did not give me

Each routed to the sheet that will have to decide it. **Every one of these is `[cid: decided]`
against a silent brief and is flagged upward.**

| # | gap | routed to |
|---|---|---|
| V1 | **Whether a `ParticleEmitter` may exist in this game at all.** `A14` reaches *ambience* only; `budgets` forbids the uploaded *texture*, not the class; `D5`/`D2` ban specific effects, not the mechanism. Nobody has ruled. This is the category's **G8**. | sheet `01` |
| V2 | **Neither cue body has a position, so no `atPatch` effect can be placed.** `cuePatchClear` receives **no args** (`Beats.luau`: *"no args — the tick announces no per-patch packet"*); `FindRevealed`'s payload is *"one Find name string, from Patch.find"* (`Protocol.luau`) and carries no `Vector3`; no client module holds a patch table. `response` gives **both** beats the `atPatch` channel. | sheet `02`, as revision requests to snapshot-and-wire work and to instance-representation work |
| V3 | **No module in the build order may create a world-anchored effect Instance.** `representation` names legal creators for every `GuiObject` and none for a world effect; `Beats.luau` holds only a `ScreenGui`. Identical in class to the finding `notices` raised for its plate. | sheet `02`, to instance-representation work |
| V4 | **`B3` is granted VFX by one approved sheet and no channel by another.** `theme/tone/03`: `B3` *"audio and VFX; no modal"*. `response.beats[areaComplete]`: `channels: ["notice","audio"]`, `forbiddenChannels: ["atPatch"]`. `notice` is HUD space and is `notices`'; `audio` is Audio's. **There is no surface on which `B3`'s VFX could be drawn.** This is the exact shape of Audio's `G1`. | sheet `01`, as a `## Pushing back` naming one of the two sheets and its ruling |
| V5 | **No token layer exists for anything rendered in the world** (category `G3`). `CLAUDE.md` binds *"arbitrary values enter through tokens, never as literals in a spec"*; `generateTheme` implements it for UI only and has **no vocabulary for a `ParticleEmitter`** — no path for a colour sequence, a lifetime, a rate or a particle size. So **every value in `effects` is currently a literal**, which is what the token rule exists to prevent. | named by sheet `01`, which states the token paths `effects` would need; **`styleGuide` to name the world-side layer, the seam owner to rule.** Not mine to fix on my own authority |
| V6 | **Whether the Find's name is drawn at the patch.** `notices`: *"If VFX declines to draw the name at the patch, a Find's name reaches the player only inside the collection index."* **And `N1`'s check — `grep -rn "…BillboardGui…" game/src` returns nothing — fails on any `BillboardGui` anywhere in `game/src`**, which is the only ordinary route to world-space text. `N1` was written against LOD and imposters; as written it closes this. | sheet `01` decides; if it wants the name, sheet `02` carries the request against `N1`'s check |
| V7 | **What "exactly one object" at the reveal actually is.** `response` criterion 2 requires a reveal leave **exactly one** object at the patch for 2.5 s; `representation.find` rules *"A Find has no Instance at any point in its life."* Both hold only if the dwelling object is a **cue** object that does not read as the Find — otherwise it reopens the category's `G6` from the wrong side. | sheet `01` |
| V8 | **The clear's effect cannot live on the patch.** `Clearing.luau:242-249` destroys the patch Instance server-side at the instant of clear, and destroying an emitter's parent destroys its live particles `[research: devforum]`. So the clear effect needs a host that outlives its cause, and that host is an instance nobody has budgeted. | sheet `01` (the host and its cost), sheet `02` (who creates it) |
| V9 | **`N12` forbids writing `.Size` on a patch after creation.** Its check is scoped to `Plots.luau`, but its stated intent is the silhouette channel. A shrink-out clear animation writes `.Size` after creation. | sheet `02` states the prohibition and its scope; sheet `01` may not adopt a mechanism `02` closes |
| V10 | **Nobody owns taking a render-stats reading** (category `G4`, restated by `serverCost.instrumentOwner`: `UNOWNED`). Every figure in my budget is a prediction with no instrument. | relayed to the final cross-category pass; **device-measurement work**, unowned |

---

## Two subjects in my `owns` list that this game does not have

Recorded as data with a reason, per `CLAUDE.md`. **They are not dropped; they become
`forbidden[]` rows in `effects` with a ruling and an observable**, so a verifier reads a
conclusion and a wave-7 reader does not commission one.

| subject | verdict | why, cited |
|---|---|---|
| **reward and level-up bursts** | **zero** | There is no level-up: `upgrades` is a purchased ladder and `theme/tone/03` `B4` is *"audio and UI only, **no VFX in the world**"*, a *"confirmation, not a celebration"*. There is no rebirth (`vocabulary.bannedWords` contains `rebirth`). There is no drop roll: `rarity` is **one graded ladder read from `patch.tierIndex`** with `perObjectVisualGrade: false`, so **nothing in this game is a rare drop**. `discovery.repeat.possible` is `false`, so there is no duplicate to consolate. `theme/tone/04` `D5` bans confetti, fireworks, full-screen flash. The one reward moment with a world channel is `findReveal`, and it is specced as a reveal, not a burst. `[cid: decided]` on the aggregation; every clause inherited |
| **trails and auras** | **zero** | *"Cosmetics-only was offered and declined as needing a display system first"* `03-META.md` `[brief: soft]`; `theme/setting/05` `A13` removes the placement home; `theme/identity/02` forbids any granted accessory or avatar modification; `03-META.md` *"Forbidden: any paid area, relic, or set"* means no visual is sold; `A7` forbids glow and any luminous thing; `theme/setting/05` criterion 2 already counts **0** `Beam` and **0** `Trail` as ambience. **There is nothing in this game for a trail or an aura to attach to.** `[cid: decided]` on the aggregation |

**A third subject is empty for a different reason and is stated so it is not confused with the
two above:** *ability and impact effects*. `input` is a **closed five-verb list** with no ability
button and `worldObjectsTriggeringAVerb: 0`, so **there are no abilities**. The single impact in
this game is a patch ceasing to exist, and that is `patchClear`, which sheet `01` specifies.

---

## Zero ambient emitters — not pushed back on, and here is the arithmetic

My category lead ruled zero. **I agree and I am not filing a `## Pushing back`.** Stated with the
reason, so a later reader knows it was tested rather than accepted:

1. `theme/setting/05` `A14` is `[cid: decided]` and its argument is *accessibility*, not taste:
   *"Tier is a core economic signal carried primarily by silhouette, and a swaying silhouette is
   a changing silhouette… ambient motion on 140 non-colliding patches per plot… is motion
   competing with the only motion that means anything."* That argument gets **stronger** at 640
   patches, not weaker.
2. `theme/setting/03` `R5` (relayed via Audio's brief): *"Anything scheduled, intermittent,
   randomised over time, or varying with anything but a player's action is a change of state and
   fails."* Every idiomatic ambient emitter is exactly that.
3. The cost is not draw calls, it is **fill**: *"Particle count can impact performance due to
   overdraw, especially when particles are overlapping"* and *"Particle size can impact
   performance due to fill-rate"*
   `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/effects/particle-emitters.md]`.
   A persistent ambient emitter is on screen 100% of the session on a 3 GB phone; a clear cue is
   on screen 0.4 s. **Ambience is the most expensive thing I could buy and the least legible.**
4. `theme/setting/05`'s own escalation ladder already spends the two cheaper remedies first
   (more variance in weathering and litter; more life beyond the built edge) and reserves a
   thirteenth class for a developer signature.

---

## Why 2 sheets

**I own no merged contract key**; I propose exactly one, `effects`, so the contract anchors me at
one carrier sheet plus, sparingly, one non-value sheet. `bridge/merge.mjs` merges exactly one
`provides` block per key, and **an `amends` block "is data in either fence, and is never merged"**
(`bridge/test/bridge.test.mjs:515`) — so any value that must reach a build has to sit inside
`01`'s manifest. That closes the tempting split of clear-and-reveal into two sheets: it would
either collide on one key or strand the reveal's values in an unmerged block. Sheet `02` earns
its file the way `tech/performance/03` earns its own — **it supplies no key, it constrains one I
own, and every field in it is a request against somebody else's key or a prohibition with a grep,
so it shares no field with `effects` and cannot collide with it.** The boundary between them, in
one line: **`01` says what is rendered and what it costs; `02` says what must change in two other
contracts before any of it can be built, and which delivery mechanisms are already closed.**

| # | sheet | must decide |
|---|---|---|
| 01 | `the-clear-and-the-reveal` | Rule first whether a `ParticleEmitter` may exist in this game at all and under what texture rule, then specify every effect the game renders as a table a builder can type — per cue: class, instance count, host, rate or `Emit` count, lifetime, size, colour, texture source and an explicit stop condition — such that an ordinary clear leaves **zero** objects at the patch position 0.4 s after it fires and a reveal leaves **exactly one, that does not read as the Find itself**, for 2.5 s; carry the effect intensity budget as data stated at both ends of `budgets.renderCeilings.batchingFactor`'s 1–500 range with the binding term named; resolve `B3`'s missing world channel in a `## Pushing back` naming `gameplay/mechanics/05` or `theme/tone/03` and its ruling; decide whether the Find's name is drawn at the patch; and record every absent subject — level-up and reward bursts, trails, auras, ambient emitters, `B4`'s world cue, any passage or plot-construction cue, any duplicate or endgame cue — as a `forbidden[]` row with its ruling and an observable a grep or a count can fail. |
| 02 | `who-draws-it-and-where` | Rule which side creates each effect Instance and from which input, given that `cuePatchClear` receives no args, `FindRevealed` carries only a name string, no client module holds a patch position, and `representation` names no legal creator for a world-anchored effect — then file the revision requests that make `effects` buildable (a position on the wire or a server-side creator, and a named creator in `representation`), price a server-created effect against `serverWorldInstanceCeiling`'s remaining 1,664 instances and a client-created one against the 80 ms and 300 ms acknowledgment budgets, and list every delivery mechanism already closed to this domain — `N1`'s `BillboardGui` grep, `N12`'s `.Size`-after-creation rule, `N14`'s ban on deferring or batching a cue for frame budget, `N15`, `N16`, `D2`, `D5`, and `theme/setting/04`'s ban on any effect marking passage — each with the grep or count that fails it. |

**Sheet `02` carries no `manifest` block, deliberately.** Its subject is a prohibition set plus
revision requests against `replication`, `representation` and `N1`, which is a constraint on two
other contracts rather than a third value of my own — the same reason `tech/performance/03`
supplies no key. It states that in one line so `cid:verify` reads a decision and not an omission.

---

## The contract key this domain needs

`effects` does not exist in `cid/_contract.md`'s 25. What it must hold, so the schema owner can
write a shape:

- `particleEmitterPermitted` (boolean) and `textureSourceRule` — the `V1` ruling.
- `classesPermitted[]` — the closed list of effect classes that may exist at all.
- `cues[]`, one row per `response` beat, keyed by beat id, each with: `worldComponent`
  (or `none` with a ruling), `class`, `instanceCount`, `host`, `createdBy`, `positionSource`,
  `lifetimeSeconds`, `stopCondition`, and the emitter parameters as scalars.
- `budget` — concurrent-instance, concurrent-particle and screen-area ceilings, each with a
  `[playtest unknown]` test range and a named instrument.
- `forbidden[]` — every absent subject, with `ruling` and `observable`, in the shape
  `notices.forbidden[]` already uses and which a verifier can run.
- `tokenPathsNeeded[]` — the `V5` finding as data: the paths `effects` would resolve through if a
  world-side token layer existed. **Absence is a declared sentinel, never an explicit null**
  (`tech/deploy/02`).

---

## Verification note

**The sheet most likely to be contradicted later is `01`, and the contradiction will come from
`gameplay/mechanics` — the owner of `response` — over `V4`.** `theme/tone/03` grants `B3` VFX and
`response` gives it no channel to be drawn on; whichever way `01` rules, one approved sheet is
overruled, and Mechanics has already declined to re-open its own ranking (*"The ranking of the
five beats… not re-opened"*). The second most likely contradiction is from
**snapshot-and-wire work** over `V2`: if `replication` declines to put a position on the wire,
every `atPatch` value in `01` becomes server-created and its instance cost moves.

Two lower-probability collisions worth naming: **Audio**, whose `G1` runs the same argument in
the opposite direction for `patchClear`'s missing *audio* channel — if `response` is revised for
one channel it should be revised for both, and the two revision requests should not arrive
separately; and **Objects/UI Art** over `V6`/`V7`, if `01` decides to draw anything at the patch
that reads as the Find and reopens category `G6`.

**I did not copy any value from `composition`** (wave 5 UI/UX returned FAIL and it is being
rewritten). Nothing in this index depends on a HUD coordinate, and `notices` already rules that
the reveal has zero HUD-space component, so my surface and theirs do not touch.

---

## The intensity budget, as arithmetic the sheet inherits rather than a number I set

Given so `01` sets values against a derivation instead of inventing one. Inputs are read by field
and never copied.

- **Concurrency.** `response.minSustainedOnsetsPerSecond` 8 × `residueLifetimeSeconds` 0.4 =
  **3.2 concurrent clear effects per player**, ceil **4**. `runtime.maxPlayers` 16 → **52
  server-wide**. A *client* renders only what streams: `budgets` worst case is **9 lanes** inside
  `StreamingTargetRadius` 512, so **≤ 29 concurrent clear effects on one screen**. Reveals:
  `collection.relicsPerArea` is 3 and `minOnsetGapSeconds` is 0.6, so ≤ 3 per player and ≤ 27 on
  one screen at an unreachable worst case, ≤ 9 realistically.
- **At `batchingFactor` = 500** (top of range): patches cost ≈ 12 draw calls, effects at 1
  emitter each ≈ 56, both trivial against `renderCeilings.drawCalls` 1,000.
- **At `batchingFactor` = 1** (bottom of range): the merged design already renders **5,814 draw
  calls against a 1,000 ceiling from patches alone**, and `budgets` states *"NO legal streaming
  radius fixes it"*. **Effects contribute ≤ 56 of 5,870 — under 1%.** The lever at that end is
  `depths.areas[].patchCount`, which is a finding against `depths` and **not an art decision**.
- **So the batching factor does not bound this domain at either end, and the honest budget is
  bounded by something else: fill rate and overdraw**, which batching does not touch.
  *"Particle count can impact performance due to overdraw, especially when particles are
  overlapping"*; *"Particle size can impact performance due to fill-rate"*
  `[research: creator-docs/effects/particle-emitters.md]`; and *"Avoid transparency values other
  than 0 (visible) and 1 (invisible)… be especially careful to avoid high transparency overdraw"*
  `[research: creator-docs/performance-optimization/design.md]` — the same page every ceiling in
  `budgets` derives from. **No published figure bounds screen-area cost**, so `01`'s budget is
  `[playtest unknown]` with a test range and the Developer Console render stats on
  `budgets.deviceFloor` as its instrument, and it should be expressed as **fraction of screen
  area covered by effect pixels**, not as a draw-call count.
- **Hard platform cap the sheet may not exceed:** *"A single particle emitter can create up to
  400 particles per second (**100 per second on mobile**)"*
  `[research: creator-docs/effects/particle-emitters.md]`. On a `[brief: binding]` mobile-heavy
  audience, **100/s per emitter is the ceiling `Rate` is measured against**; `:Emit(n)` is a
  burst method (default 16) and whether it is subject to the same cap is `[unverified]`.
- **Instances.** `serverWorldInstanceCeiling` is 12,000 against 10,336 merged — **1,664 free**. A
  server-created effect of `Attachment` + `ParticleEmitter` is 2 instances × 52 concurrent = 104,
  **6% of the remaining headroom**. Legal, and it is the number `02` must price.
- **Textures.** `uploadedImageAssetsInWorldGeometry` is **0** and `N17`'s check is
  `grep -rn "rbxassetid" game/src` returns nothing. The default particle texture is
  `rbxasset://textures/particles/sparkles_main.dds`
  `[research: https://robloxapi.github.io/ref/class/ParticleEmitter.html]`, and **`rbxasset://`
  is Roblox's content folder on the user's device while `rbxassetid://` is a user-uploaded cloud
  asset** `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/projects/assets/index.md]`.
  **So a built-in particle texture is not an uploaded image asset and passes `N17`'s grep as
  written.** That resolves the *texture* half of `V1` on evidence; the *class* half is still
  `01`'s ruling and `01` must state it as a ruling, not inherit it from this line.

---

## Research owed

**`must_verify` for this node is empty** (`docs/cid-workflow.json`, `vfx-lead`: no `must_verify`
field). Everything below was fetched because a sheet of mine will have to justify itself with it,
per the rule that a lead's fetch is the last one this domain gets. **The writer has no fetch tools
and cites only what is banked here.**

**Fetched and verified this run:**

| what it settles | source |
|---|---|
| `ParticleEmitter` defaults: `Texture` `"rbxasset://textures/particles/sparkles_main.dds"`, `Rate` 20, `Lifetime` `NumberRange(5,10)`, `Speed` `NumberRange(5,5)`, `Enabled` true, `LightEmission` 0, `Drag` 0, `SpreadAngle` `Vector2(0,0)`, `ZOffset` 0 | `[research: https://robloxapi.github.io/ref/class/ParticleEmitter.html]` |
| The mobile rate cap (**100 particles/s per emitter**, 400 on desktop), the **20 s** maximum particle lifetime, that an emitter parents to an `Attachment` or a `BasePart`, that `Enabled = false` stops spawning but lets live particles expire, and both performance sentences (fill rate; overdraw when particles overlap) | `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/effects/particle-emitters.md]` |
| `Emit(particleCount)` *"will cause the ParticleEmitter to instantly emit the given number of particles"*, default 16 | `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/reference/engine/classes/ParticleEmitter.yaml]` |
| *"Avoid transparency values other than 0 (visible) and 1 (invisible)"* and *"be especially careful to avoid high transparency overdraw"*; the 1,000 draw call / 1,000,000 triangle illustration | `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/performance-optimization/design.md]` — the same page `budgets` derives from |
| `rbxasset://` = the client's local content folder; `rbxassetid://` = a user-uploaded cloud asset | `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/projects/assets/index.md]` |
| Destroying a `ParticleEmitter` (or its parent) removes its **live particles immediately**; the community workaround is to reparent the emitter to a temporary host or disable-then-delay. **This is a devforum thread, not official documentation**, and is banked at that strength | `[research: https://devforum.roblox.com/t/keep-particles-on-particleemitterdestroy/335327]` |

**Could not verify — named with the specific fetch that would settle each:**

1. **Whether `:Emit(n)` is subject to the same 100-particles-per-second mobile cap as `Rate`.**
   `[unverified]` — the docs state the cap against `Rate` only. Settled by fetching
   `create.roblox.com/docs/reference/engine/classes/ParticleEmitter` for an `Emit` remark on rate
   limiting, or by a MicroProfiler reading on `budgets.deviceFloor`.
2. **Whether a `ParticleEmitter` with no texture is legal, or whether the property falls back to
   the default sparkle.** `[unverified]` — the docs say only that the default may be customised.
   Settled by the same class-reference page, or by inspection in Studio. This matters because a
   textureless emitter would close `V1` outright.
3. **Whether primitive `Part`s sharing shape, size and material batch into shared draw calls** —
   `budgets.renderCeilings.batchingFactor`, `[playtest unknown]`, range 1–500. Roblox documents
   draw-call instancing for **meshes** and says nothing about primitives; I found no page that
   closes it either. Settled only by a Developer Console render-stats reading on the floor
   device, one lane loaded then nine — **an instrument `serverCost.instrumentOwner` records as
   `UNOWNED`**. My budget above is stated so that this answer does not move it.
4. **Any published per-device particle or effect ceiling.** None exists, on the same evidence
   `tech/performance/01` established for instances and triangles: Roblox instructs developers to
   choose a baseline device and measure. Recorded as absent rather than as a number.
