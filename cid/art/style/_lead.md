# Style Guide — domain index

**Category:** Art & Visuals · **Wave:** 6 · Reads: `concept/spec/incremental-spinoff-v2/` —
`HANDOFF.md`, `CONCEPT.md`, `00-CORE.md`, `01-FOUNDATION.md`, `03-META.md`, `04-PRESENTATION.md`,
`OPEN.md`. Then `cid/art/_category.md`; `cid/_contract.md`, `cid/_state.md`, `cid/_playtest.md`;
`cid/theme/setting/01-the-ruin.md`, `/03-physical-law.md`, `/05-inventory.md`;
`cid/theme/tone/04-do-nots.md`; `cid/theme/lore/01-the-past.md`;
`cid/tech/performance/01-device-floor-and-budgets.md`, `/03-what-optimisation-may-never-do.md`;
`cid/art/objects/01-patch-footprint.md`. Repo: `ui-forge/src/theme/palettes.mjs`,
`ui-forge/src/theme/generate.mjs`, `ui-forge/src/compose/index.mjs` and its two pattern `meta`
blocks, `game/src/shared/Theme.luau`, `game/src/server/Plots.luau`, `game/default.project.json`,
`bridge/schema.mjs`.

**`npm run bridge -- --contract` could not be executed — this session has no shell tool.** I read
`cid/_contract.md` (25 merged keys, regenerated from `bridge/schema.mjs`) and grepped
`bridge/schema.mjs` directly. `styleGuide`, `formLanguage`, `detailBudget`, `environment`,
`effects`, `lighting`, `uiTheme`, `objectArt` and `characterArt` return **zero matches** in the
schema. `[research: repo — bridge/schema.mjs, cid/_contract.md, read this run]`

**This domain owns no merged contract key. It proposes three.** That is the honest count: my
subject is the shared vocabulary six sibling domains resolve against, and until it has a data
form it reaches none of them.

---

## What the brief gave me

The brief supplies **one archetype key and four adjectives**, and nothing else in my subject.
Quoted with provenance:

| quoted | tag | what it binds in my subject |
|---|---|---|
| *"**`ui-forge` vibe key: `fantasy-ornate`** … In words: ornamented, warm, aged, crafted. Stone and foliage, not candy."* `04-PRESENTATION.md` | `[you accepted: R6 Q2 → R5 Q2]` → `[brief: soft]` | The register. It names no colour, no material, no proportion and no budget. `ARCHETYPES['fantasy-ornate']` is a **UI** token set (`palettes.mjs:75-88`); it says nothing about a `Part`. |
| *"**`cartoon-vibrant` would fight the fiction.** An ancient ruin in candy colours loses the discovery mood"* `04-PRESENTATION.md` | same block → `[brief: soft]` | The one archetype argued against by name ships in `game/src/shared/Theme.luau`. **Fixing that is UI Art's `uiTheme`**, not mine. What is mine is that the world palette must not be derived from an archetype's UI defaults either way. |
| *"**Relics must read as treasure.** … `fantasy-ornate` is the only archetype built for ornament and age."* `04-PRESENTATION.md` | same block → `[brief: soft]`, **partly overruled** | Struck by `theme/lore/01-the-past` `## Pushing back`: *"Art must not add gold, gilding or gemstones to compensate."* Narrowed by `theme/setting/01` to *"carving, casting, dressed joints and pattern in the paving — not iconography, not gilding."* I inherit the narrowed form. |
| *"**Green overgrowth on warm stone is naturally high-contrast**, so rarity tiers stay legible"* `04-PRESENTATION.md` | same block → `[brief: soft]` | **The archetype's surviving reason, and the load-bearing one.** Converted by `theme/setting/01` into the luma floor below. |
| *"Hard constraint: rarity tiers must differ by shape or silhouette, not only hue. … **This is a requirement, not a nicety**"* `04-PRESENTATION.md` | `[you accepted: R6 Q4]` → `[brief: soft]` **in the brief**, treated as effectively binding | `architect/06` reads it as binding, `tiers` ships four shapes and four heights on it, and `N1`/`N2`/`N12` forbid every optimisation that would flatten them. I state the silhouette rule; I do not restate the values. |
| *"**8–14, mobile-heavy, short sessions.**"* `00-CORE.md` | `[you chose: R1 Q4]` → **`[brief: binding]`** | Legibility at phone size is a floor. It is the only input that sets a minimum feature size. |
| *"Target: the **smallest game that still gives every creative area real work**"* and *"content design is the primary creative work on this project, **not art**"* `00-CORE.md` | `[you chose: R1 Q3]`, `[you chose: R1 Q1]` → **`[brief: binding]` ×2** | No rule of mine may require an asset pipeline. `representation`: *"no asset needs to be produced to build this game."* |
| *"Left open — … how overgrowth tiers read at a glance on a phone …"* `04-PRESENTATION.md`; `OPEN.md §4` *"tier legibility on a phone → Art & Visuals"* | untagged → `[brief: soft]` | The one open item in `OPEN.md §4` that lands squarely inside my subject. Routed to sheet `02`. |
| *"Endless via shuffled authored chunks, not generation."* `03-META.md` | `[you chose: R5 Q1]` → **`[brief: binding]`** | Nothing I set may be generated per session. |

**Approved sheets and shipped files that bind my values before I start** (cited, not re-decided):

- `theme/setting/01`: *"**Warm pale limestone with a greyscale luma of at least 165**, dressed and
  weathered, never grey granite, white marble, red brick or dark basalt"*, the floor being
  *"at least 40 above the lightest tier green on disk (`Moss`, rgb `[104,142,76]`, luma 123)"*.
  *"Art chooses the hue inside that bound."* Criterion 3 is run **once per part**
  (`theme/setting/03`).
- `theme/setting/03` `R1`–`R6`: one hour, one sky, no weather, zero supernatural budget; the
  shipped `ClockTime` 15.5 / `GeographicLatitude` 20 / `Brightness` 2 ratified with zero changes;
  *"you may not solve a dim vault by moving the sun."*
- `theme/setting/05` `P1`–`P12` / `A1`–`A25`: a closed present roster and twenty-five absences.
  `A7` no light but daylight; `A9` no perishable material; `A14` no modelled ambient motion inside
  the built edge.
- `theme/lore/01` `L4`, `L5`: weathering *"reads identical at every depth"*; stone under
  overgrowth is *"intact and weathered, never rubble."*
- `theme/tone/04` `D1`, `D2`, `D5`, `D13`, `D14`, `D15`: the prop and effect blacklist.
- `tiers`, `patch`, `plots`, `depths`, `layout`, `representation`, `budgets`: shipped or approved
  geometry and ceilings. **I cite fields; I resize and recolour nothing.**
- `vocabulary`: `casing: "title"`, `maxLabelChars: 14`, banned words including `relic`, `tier`,
  `treasure` — binds any player-facing string a sheet of mine produces, including a role name if
  one is ever rendered. **None of my role names is rendered.**

---

## What the brief did not give me

Every one of these is a gap I am naming rather than filling, routed to the sheet that will have
to decide it.

| # | gap in the brief | routed to |
|---|---|---|
| **B1** | **No colour value anywhere.** Six sheets contain no hex, no rgb triple, no palette, no named surface. `OPEN.md §1` has no audit row for art beyond *"art direction — you accepted (R5 Q2), 1 question"*, and that question chose an archetype key. **Every colour value in my subject is `[cid: decided]` against silence.** | `01` |
| **B2** | **No material named, in the brief or in any wave-1–5 sheet, beyond three enums in shipped code.** `budgets` records `Grass`/`Slate`/`SmoothPlastic` as a *description of what ships*, not as a decision anybody took. The fiction requires dressed limestone and there is no list. | `01` |
| **B3** | **The brief's own first reason for `fantasy-ornate` has been struck.** *"Relics must read as treasure"* was overruled by `theme/lore/01`. The archetype therefore stands on reason 2 (contrast) alone, and nobody has said so. A sheet that quotes reason 1 as support is quoting a dead line. | `01` |
| **B4** | **No proportion, scale or feature-size rule exists at any layer.** Nothing in six brief sheets or twenty-five keys states how big a built thing is relative to a 120-stud lane, a 3-stud patch or an avatar, and *"8–14, mobile-heavy"* `[brief: binding]` is the only input that implies one. | `02` |
| **B5** | **"Ornate" is undefined, and the producible ornament vocabulary is four booleans.** `validateBrief` (`ui-forge/src/compose/index.mjs:55-64`) rejects any parameter outside `modal-grid.ornament` = `{cardBadge, panelTrim}` and `hud-overlay.ornament` = `{readoutTrim, barCap}`. There is no parameter for panel artwork, a frame texture or a 9-slice. Nobody has stated what ornament means for world geometry at all. | `02` |
| **B6** | **No detail budget exists, and the ceiling it would be measured against is unmeasured.** Every figure in `budgets` is `[playtest unknown]`; `budgets.renderCeilings.batchingFactor` has value 50 and test range 1–500 and decides whether the world renders at all. No sheet in either contract owns taking a reading. | `03`; the instrument's owner is **unnamed** — see G4 |
| **B7** | **G3 — no token layer exists for anything rendered in the world.** `CLAUDE.md` binds *"arbitrary values enter through tokens, never as literals in a spec"*; `generateTheme` implements eight groups (`color`, `space`, `radius`, `stroke`, `type`, `elevation`, `gradient`, `sizing`) and every one is UI. World colour is a literal in a gameplay key (`tiers[].rgb`) and world material is a raw enum string in `patch.material` plus two hard literals in `Plots.luau`. **I name it; I may not fix it on my own authority.** | `01` names it; **contract-and-seam work** rules |
| **B8** | **The `Enum.Material`-to-rendered-colour relationship is undocumented**, so `theme/setting/01` criterion 3 cannot be evaluated from a `Color3` alone. See *Research owed*. | `01`, as a two-part check with a stated `[research owed:]` |
| **B9** | **Two live surfaces have no colour owner at all.** `game/src/server/Plots.luau` sets `slab.Material = Enum.Material.Slate` (line 534) and **never assigns `slab.Color`**, so the ground a player stands on renders at Roblox's default part colour; and `game/default.project.json` carries the lobby baseplate's `Color [0.404, 0.353, 0.286]` in the one file `architect/04-tree` forbids the build from editing. | `01` files the revision request; the baseplate routes to **publish-checklist work** [currently Tech & Data — Build & Deploy] |

**One gap I am explicitly not filling:** G9 in my category brief — the ten `[cid: decided]` world
absences wave 1 wrote against zero input. My sheets inherit them and re-decide none. Where a rule
of mine depends on one, it cites the row.

---

## Why 3 sheets

**One key per sheet, because `bridge/merge.mjs` gives a key exactly one supplying sheet** — a
compound `styleGuide` split across three sheets would be three sheets claiming one key, which the
merger rejects after all three are written. So the question is not how to split a key but how many
keys my subject honestly is, and the answer is three, on a consumer test: an Environment or Objects
writer asks *what is it made of* (a palette role and a material), *what shape and how much
decoration* (a proportion and an ornament count), and *how much of it may I spend* (parts and
triangles). Those are three lookups with three different failure modes — a wrong palette is a
legibility failure a player sees, a wrong ornament count is a critique failure, a wrong budget is a
frame-rate failure a device sees. They also have three different lifetimes: the palette is stable,
and `detailBudget` is a derivative of a `[playtest unknown]` ceiling that will move the moment
anybody takes a render-stats reading. Binding them into one key would force a re-merge of the look
every time the budget moved. **Five sheets were considered and rejected** (see below); one was
rejected because it would have made a single manifest carrying five unrelated decisions, which is
the shape the writer cannot divide and the verifier cannot fail cleanly.

| # | sheet | must decide |
|---|---|---|
| 01 | `palette-and-materials` | State the overall look in one line as a `styleGuide.oneLine` field the other six domains quote verbatim; name every world-side colour role (cleared stone, built stone, the cast-metal / fired-clay / worked-wood register, canopy backdrop, sky) with a hex, an rgb triple and its computed Rec.601 luma; set the cleared-stone role warm — `R > G > B` with a stated minimum `R − B` that excludes Roblox's near-neutral default grey — and give its `Color3` at least 30 points of luma headroom above `theme/setting/01`'s floor of 165, because the rendered surface is darkened by the material texture and by ambient falloff in the vaulted parts at depths 2–3 and the floor is checked **per part**, not per game; name the **closed** list of `Enum.Material` values that may appear anywhere in world geometry, bind each entry to one colour role and one subject class, and justify each against `theme/setting/01`'s four named exclusions (grey granite, white marble, red brick, dark basalt) — noting that `Enum.Material.Limestone` is a base material valid on a `BasePart` and costs zero uploaded assets; forbid `MaterialVariant`, `SurfaceAppearance`, `Texture` and `Decal` in world geometry on the sourced ground that both PBR routes require uploaded texture assets, against `budgets.textureCeilings.uploadedImageAssetsInWorldGeometry` 0 and `N17`; set the `Reflectance` and `Transparency` rules that keep `theme/setting/05` `A6` (no wet or reflective surface) and `A7` (no glow) checkable; state the luma check in two parts — a `Color3` arithmetic floor and a rendered greyscale reading in the least-lit authored part — and mark the material-to-rendered-colour relationship `[research owed:]` with the fetch that would settle it; file a revision request against `architect/sheets/06-representation.md` `representation.plot` for the slab's `Slate` material and its unset `Color`, showing that Roblox's default part colour `[163,162,165]` computes to Rec.601 luma **162.6** and therefore fails `theme/setting/01` criterion 3 on the one surface that criterion is about; and name gap **B7/G3** — that no token path exists for a world `Color3`, an `Enum.Material`, a `Lighting` property, a skybox or a `ParticleEmitter`, while `generateTheme`'s additive-group route (`ui-forge/src/theme/generate.mjs:172-176`) would already admit a world colour group into the same token tree — as a finding for the seam owner, without taking the decision. |
| 02 | `form-and-ornament` | Set the silhouette and proportion language every rendered thing in this game obeys: the minimum feature size in studs that stays legible for an 8-year-old on a phone, stated at the two distances that exist (a neighbour at `plots.pitchStuds`, and arm's length on a lane), so that a moulding too small to read is a countable failure rather than a matter of taste; the maximum height of any built element standing on the plot-boundary rectangle that keeps `N7`'s spawn-to-spawn sightline open at eye height across `social.maxCoPresenceSeparationStuds`; the proportion relations between built stone and the geometry it must sit inside — a 120-stud lane at a 122-stud pitch, a 120 × 30 chunk with `edgeKeepoutStuds` 1.5 and 12 studs of bare walkable margin each side, a 3-stud patch footprint at `area.minSpacing` 6, and an R15 avatar — all cited by field and none of them restated as a value of yours; and the greyscale rule that keeps tier legible **silhouette first, colour second**, expressed as a screenshot test over `tiers`' four shapes and four heights **cited by field and never restated, recoloured, resized or extended to a fifth**. Then define ornament as a rule a critic can fail a screen against without arguing: what counts as **one** ornamental element (a form whose only function is decorative — it carries no collision, no patch, no boundary, no opening and no readout), how many one subject class may carry, which positions on a subject they may occupy, and the exact fail test — a count in frame, not an impression. State the interface half of the same rule as a count over `ui-forge`'s four declared ornament parameters, `modal-grid.ornament` `{cardBadge, panelTrim}` and `hud-overlay.ornament` `{readoutTrim, barCap}`, naming that those four are the entire producible ornament vocabulary because `validateBrief` rejects everything else, that stroke weight, radius scale, gradient strength and a serif font are therefore the only remaining ornament channels, and that anything beyond them is a capability finding against the pattern registry rather than a spec — **which values inside that space ship is UI Art's `uiTheme`, not yours**. |
| 03 | `detail-budget` | Set how many parts, triangles and instances each subject class may spend, in two columns — per-lane (multiplied by `runtime.maxPlayers`) and shared-across-the-place (counted once) — derived from `budgets.instanceCeilings.serverWorldInstanceCeiling` 12,000 at 16 players against a lane of `patchCount + 6`, which leaves **104 per-lane instances** for everything Art adds at the merged 640-patch bay (`12,000 / 16 = 750`; `750 − 646 = 104`) and makes the per-lane-versus-shared split the only real lever; and state the budget at **both ends of `budgets.renderCeilings.batchingFactor`**, whose value is 50 with test range 1–500 and status `[playtest unknown]`: below ≈ 5.8 the nine-lane worst case already renders 5,805 primitive parts as 5,805 draw calls against a 1,000 ceiling, no art budget exists at any size, and the finding is against `depths.areas[].patchCount` and explicitly **not** an optimisation request or an art decision; at or above ≈ 6.75 draw calls stop binding, the instance ceiling binds instead, and the per-lane figure applies. Mark every ceiling `[playtest unknown]` with its test range, name the instrument (Developer Console render stats and Memory on `budgets.deviceFloor`, one lane loaded then nine), cite `budgets.deviceFloor` and never the brief for the device floor (`RR-P1`), state what moves if the factor comes back below 10, hold the whole budget inside `N1`, `N2`, `N11`, `N12` and `N17` so no line of it is met by an LOD, a merge, a pool, a height collapse or an uploaded asset, and state as a consequence for `plots` that a budget spent **inside a bay** rather than on the lane reopens `plots.liveGeometry.torndownBeyond`, per `representation.plot`'s own warning that *"that changes the first time Art dresses a bay."* |

### Considered and not assigned

- **A separate "prohibitions" sheet**, on the model of `tech/performance/03`. Rejected: every
  prohibition my subject would carry already exists and is owned — gilding and gemstones by
  `theme/lore/01`, iconography and statuary by `theme/setting/01` and `05` `A4`, the prop and
  effect blacklist by `theme/tone/04` `D1`–`D15`, uploaded assets by `budgets` and `N17`, light
  sources by `A7`. A fourth sheet would be a second copy of five other domains' rulings, which is
  the collision pattern this role is warned against. The two prohibitions genuinely mine — the
  surface-mechanism ban and the ornament ceiling — sit inside `01` and `02` as the rules that shape
  those keys' values.
- **A separate palette sheet split from a materials sheet.** Rejected: in this engine a surface is
  a `Color3` **and** an `Enum.Material` together, and the rendered result of one depends on the
  other (B8). Splitting them would put two halves of one decision in two sheets and give a builder
  two places to look for one answer.
- **A "restored versus overgrown" look sheet.** Void, not deferred: `theme/setting/04` narrows it
  to *"the same stone, with and without plants on it"*, and `W1` gives a finished part *"no marker,
  plaque, dressing, light, colour shift, sound, cue or state of any kind."* There is no second
  palette state to author, and reserving a role for one would be reserving space for priority 2's
  *visitable restored ruins*.
- **A depth-theming or chunk-family palette sheet.** Not mine and not anybody's as a palette:
  `theme/lore/01` `L4` fixes weathering identical at every depth, `theme/setting/03` forbids depth
  reading as darker or later, and `theme/setting/05` forbids a thirteenth class at any depth. The
  four chunk families are `layout`'s and their dressing is Environment's.
- **A fifth and sixth sheet for "the overall look in one line" and "shading rules."** Both are
  fields, not decisions. A heading is not a decision.
- **Anything about the UI archetype, the two icons, the tool's unset appearance, the clear and
  reveal effects, the `Lighting` values, or any individual asset.** Six neighbours own those. My
  rules reach them; my sheets do not name them.

### Scope check

**Nothing in my subject is priority 3.** No seasonal, event, weather or time-of-day visual channel
exists to attach a palette to (`theme/setting/03` `R1`–`R3`), and my sheets name that as a fact
rather than reserving a role for one. Priority 2 is likewise unreserved: no palette role, material
slot, ornament allowance or budget line is held open for richer chunk variety, a duplicate
refinement, or visitable restored ruins.

---

## Verification note

**Sheet `03` is the one most likely to be contradicted, and by two parties.** By **Tech & Data —
Performance**, the moment `budgets.renderCeilings.batchingFactor` is measured: every figure in it
is a function of a number nobody has read off a device, and the sheet says so at both ends rather
than picking one. And by **area-authoring-by-depth work** (`depths`), because the arithmetic it
states — 104 per-lane instances at the merged bay, zero at a batching factor below 5.8 — is a
finding against `depths.areas[].patchCount` before it is a budget for art, and `depths` may
reasonably dispute that its counts are the lever. Sheet `03` must therefore read as a derivation
with its inputs named by field, not as an allocation, so a contradiction lands on the input rather
than on the sheet.

**Second most likely: sheet `01`'s material list**, contradicted by `architect/sheets/06-representation.md`,
which fixes `Slate` for the lane slab and is a merged technical key a shipped build reads. That is
why `01` files a revision request with the luma arithmetic attached rather than simply naming a
different material — the contradiction is deliberate, sourced and routed.

**Least likely: sheet `02`.** Nothing else in either contract states a proportion, a feature size
or an ornament count, so it contradicts nothing. Its risk is the opposite one: that it is checked
by nobody, which is why its ornament rule is written as a screenshot count and its feature-size
rule as a studs-at-a-distance figure.

---

## Research owed

My graph node carries **no `must_verify`**. I fetched anyway, because whatever I bank is the only
external evidence three sheets and six sibling domains will have.

**Fetched and usable:**

| what it settles | source |
|---|---|
| The full `Enum.Material` list with numeric values, and that `Limestone`, `Sandstone`, `Concrete`, `Cobblestone`, `Pavement`, `Rock`, `Slate` and `Granite` are all **base materials applicable to parts** — so a limestone world costs zero uploaded assets | `[research: https://github.com/Roblox/creator-docs/blob/main/content/en-us/parts/materials.md]` |
| Corroboration of the same, per-value, including `Limestone` 820 and `Sandstone` 912 as BasePart-and-Terrain | `[research: https://robloxapi.github.io/ref-temp/enum/Material.html]`, `[research: https://create.roblox.com/docs/reference/engine/enums/Material]` |
| That `MaterialVariant` **and** `SurfaceAppearance` both use PBR textures and both require an uploaded texture asset — *"paste an asset ID or import a new texture from your computer"* — which is what makes both forbidden under `budgets.uploadedImageAssetsInWorldGeometry` 0 and `N17`, on a source rather than on an assumption | `[research: https://github.com/Roblox/creator-docs/blob/main/content/en-us/parts/materials.md]` |
| That the default `Enum.Material` for a new `Part` is `Plastic` — relevant because `Plots.luau` sets the slab's material explicitly and its colour not at all | `[research: https://create.roblox.com/docs/parts/materials]` |
| Roblox's own accessibility position: *"Over 5% of people in the world have some form of color blindness"*, and the remedy is *"different symbols alongside colors"* rather than a contrast ratio. **Roblox publishes no contrast-ratio number.** This is the platform's confirmation of the brief's shape-not-hue constraint, and it is why the luma floor is `theme/setting/01`'s and not a platform figure | `[research: https://create.roblox.com/docs/production/publishing/accessibility]` |

**Could not verify — named with the fetch that would settle each:**

1. **`[research owed:]` how `BasePart.Material` and `BasePart.Color` combine at render time.** The
   materials page states that base materials are tileable PBR textures and that the default part
   material is `Plastic`, but **nowhere states whether the texture multiplies, tints or replaces
   the `Color3`**, or by how much the rendered luminance departs from the authored value. This is
   load-bearing: `theme/setting/01` criterion 3 says both *"the stone base colour … has a Rec.601
   greyscale luma of at least 165"* (a `Color3` check) and *"in a greyscale screenshot, cleared
   stone reads lighter than all four tier greens"* (a rendered check), and the two are not the same
   measurement. **Settled by:** `create.roblox.com/docs/reference/engine/classes/BasePart#Color`
   together with `create.roblox.com/docs/parts/materials#custom-materials` read for the PBR
   compositing rule, or failing a documented answer, a Studio reading of a `Limestone` part at a
   known `Color3` under the shipped `Lighting` values. Sheet `01` carries the check in two parts
   and the headroom rule so the answer moves one number rather than the design.
2. **`[unverified]` the triangle count of each Roblox primitive part shape.**
   `budgets.renderCeilings.trianglesPerPatchBudget` is 100 with a 400-triangle rule across the four
   tier shapes and a stated fix (*"a shape swap … never an LOD"*), but Roblox publishes no
   per-primitive triangle figure and `Ball` is the one at risk. **Settled by:** a Developer Console
   render-stats reading of one of each shape in an empty place — the same instrument
   `tech/performance/01` names, and the same instrument **nobody owns** (G4). Sheet `03` states the
   dependency rather than assuming a number.
3. **`[unverified]` whether primitive `Part`s sharing shape, size and material batch into shared
   draw calls.** Inherited unresolved from `budgets.renderCeilings.batchingFactor`; Roblox documents
   instancing for *meshes* and says nothing about primitives. **Settled by:** the same render-stats
   reading, one lane loaded then nine. Sheet `03` is written at both ends of the range because of
   this.

**Not re-fetched, because the pack already carries them:** `creator-docs/performance-optimization/design.md`
(the 1,000 draw calls / 1,000,000 triangles illustration and the choose-a-baseline-device
instruction), `create.roblox.com/docs/workspace/streaming`, and
`create.roblox.com/docs/production/publishing/adaptive-design`. Nothing in `cid/_research/pack.md`
covered materials, part colour or the accessibility page before this run.

---

## The two arithmetics my sheets are built on, shown rather than asserted

Stated here so a verifier can check the index itself, and so the writer inherits the working rather
than the conclusion.

**Rec.601 luma, `Y = 0.299R + 0.587G + 0.114B`, over the four shipped tier greens** (`tiers[].rgb`,
cited, not restated as mine):

| tier green | Y | gap to a 165 floor |
|---|---|---|
| `[104,142,76]` | 31.10 + 83.35 + 8.66 = **123.11** | 41.9 |
| `[78,128,66]` | 23.32 + 75.14 + 7.52 = **105.98** | 59.0 |
| `[58,104,58]` | 17.34 + 61.05 + 6.61 = **85.00** | 80.0 |
| `[44,86,52]` | 13.16 + 50.48 + 5.93 = **69.57** | 95.4 |

165 therefore clears the lightest tier by **41.9**, which satisfies `theme/setting/01`'s stated
*"at least 40"* with **1.9 points of slack**. A floor met exactly is a floor with no margin, which
is the argument for headroom above it rather than at it.

**The two shipped surfaces, measured:**

- **The lane slab.** `game/src/server/Plots.luau:534` sets `slab.Material = Enum.Material.Slate`
  and assigns no `slab.Color` anywhere in the file. A `Part` with no colour assignment renders at
  Roblox's default, `[163,162,165]` — `48.74 + 95.09 + 18.81 = ` **162.64**. That is **2.4 below
  the floor**, and `R − B = −2`, i.e. very slightly *cool*. **The ground a player walks on, which
  is the cleared stone `theme/setting/01` criterion 3 is entirely about, fails that criterion today
  on both halves of the requirement.** This is the most directly checkable component of
  *"nothing really looks good"* (`cid/_playtest.md`, n = 1) inside my subject.
- **The lobby baseplate.** `game/default.project.json:51-56`, `Color [0.404, 0.353, 0.286]` →
  `[103.0, 90.0, 72.9]` → `30.80 + 52.83 + 8.31 = ` **91.94**, material `Slate`. Dark, and outside
  the fiction. It lives in the one file `architect/04-tree` forbids the build from editing, so it
  is named as a consequence for publish-checklist work and is not sheet `01`'s to change.

**Feasibility of the band, so the sheet is not being asked for something impossible.** A warm pale
limestone at `[214, 199, 168]` computes `63.99 + 116.81 + 19.15 = ` **199.95** — 35 points of
headroom over 165, **76.8** above the lightest tier green, `R − B = 46` (unambiguously warm, unlike
the default grey's −2), saturation ≈ 21% and hue ≈ 40° (ochre, not the near-neutral of white marble
nor the ~10° of red brick). **This is a worked example proving the band is satisfiable, not the
decision.** Sheet `01` sets the value inside the band and states its own reason.

**The instance arithmetic sheet `03` derives from** (every input a field reference):
`budgets.instanceCeilings.serverWorldInstanceCeiling` 12,000 ÷ `runtime.maxPlayers` 16 = 750
instances per player; a lane is `patchCount + 6` = **646** at `max(depths.areas[].patchCount)` 640;
`750 − 646 = ` **104** per-lane instances for the whole of Art. And the draw-call crossover: the
nine-lane worst case is `9 × 645 = ` **5,805** parts, so with `E` art parts per lane the constraint
is `9 × (645 + E) / f ≤ 1,000`, i.e. `645 + E ≤ 111.1 f`. At `f = 1` it is infeasible with `E = 0`;
it becomes feasible at `f ≈ 5.81`; and the instance bound (`E ≤ 104`) overtakes the draw-call bound
at `f ≈ 6.75`. **Every one of those ceilings is `[playtest unknown]`.**

---

## Contract keys this domain needs

Three, none of which exists in `bridge/schema.mjs` today. Proposed with the shape each would hold,
as a finding for whoever maintains the schema.

| key | sheet | what it would settle |
|---|---|---|
| `styleGuide` | `01` | The look in one line; every named world colour role with hex, rgb and Rec.601 luma; the closed `Enum.Material` list bound to roles and subject classes; the surface-mechanism ban; the `Reflectance`/`Transparency` rules; and the two-part luma check. |
| `formLanguage` | `02` | Minimum feature size at two stated distances; the boundary-element height bound that preserves the sightline; the proportion relations against the fixed geometry; the silhouette-first greyscale rule; and ornament as a count with its positions and its fail test. |
| `detailBudget` | `03` | Parts, triangles and instances per subject class, in per-lane and shared columns, stated at both ends of `batchingFactor`, with the instrument and the escalation named. |

**The alternative shape, stated because the schema owner may prefer it:** one `styleGuide` key with
three branches, written on one sheet. The cost is that its palette branch cannot be merged without
re-merging its budget branch, and `detailBudget` is a derivative of a ceiling that will move.
The cost of my shape is three keys instead of one, all owned by one domain. **I recommend three,
and the decision is not mine.**

**And one seam finding that is larger than any of them:** even promoted, none of these three keys
has an emitter. `bridge/emit-config.mjs` produces `GameConfig.luau`, which is where `patch.material`
and `tiers[].rgb` reach `Plots.luau`; `ui-forge` produces `Theme.luau`, which is UI-only and which
`architect/06` records **no module in this build order owns**. A `styleGuide` value therefore
reaches a `Part` only through `GameConfig`, and reaches a `Lighting` property or a skybox through
nothing at all. That is gap **G3** in its full form, and it belongs to contract-and-seam work, not
to me. `[cid: decided]` on the diagnosis; the ruling is somebody else's.
