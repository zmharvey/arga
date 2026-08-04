# Objects — domain index

**Category:** Art & Visuals · **Wave:** 6 · Reads: `concept/spec/incremental-spinoff-v2/HANDOFF.md`,
`CONCEPT.md`, `00-CORE.md`, `01-FOUNDATION.md`, `02-GAMEPLAY.md`, `03-META.md`,
`04-PRESENTATION.md`, `OPEN.md`; `cid/art/_category.md`; `cid/art/objects/01-patch-footprint.md`;
`cid/_contract.md`, `cid/_state.md`, `cid/_playtest.md`, `cid/_research/pack.md`;
`cid/gameplay/mechanics/04-tool-as-object.md`, `cid/gameplay/systems/03-rarity-ladders.md`,
`cid/gameplay/meta/02-the-collection.md`, `cid/theme/setting/05-inventory.md`,
`cid/tech/performance/01-device-floor-and-budgets.md`, `cid/ui-ux/screens/_lead.md`,
`architect/sheets/06-representation.md`; `bridge/schema.mjs`,
`game/src/server/Tool.luau`, `docs/cid-workflow.json`.

**I could not run `npm run bridge -- --contract`: this session has no shell tool.** I read
`cid/_contract.md`, which the file's own header states is that command's derived output, and
grepped `bridge/schema.mjs` for `objectArt|styleGuide|environment|effects|uiTheme|characterArt|lighting`
— **zero matches**, so no Art & Visuals key exists in the schema and `objectArt` is a proposal.

## What the brief gave me

| constraint | tag |
|---|---|
| *"**Relics must read as treasure.** The collection is the differentiator"* — `04-PRESENTATION.md` | `[brief: soft]` ← `[you accepted: R6 Q2 → R5 Q2]`. **Already narrowed by two approved sheets:** `theme/lore/01` *"Art must not add gold, gilding or gemstones to compensate"*, `theme/setting/01` restates ornament as *"carving, casting, dressed joints and pattern in the paving"* |
| *"Left open — **the 24 relics** … tier legibility on a phone"* — `04-PRESENTATION.md`, `OPEN.md §4` | untagged → `[brief: soft]`. **The 24 are no longer open**: `collection` ships the names. What survives here is what, if anything, they are made of |
| *"**Hard constraint: rarity tiers must differ by shape or silhouette, not only hue.** … This is a requirement, not a nicety"* — `04-PRESENTATION.md` | `[brief: soft]` ← `[you accepted: R6 Q4]` **in the brief**; `architect/06` reads it as binding and a shipped build depends on that reading. I treat it as effectively binding and do not reopen it |
| *"**Feel:** reach is the primary sensation — a wider tool must visibly sweep more per step"* — `02-GAMEPLAY.md` | `[brief: soft]` ← `[I assumed]`. It is the whole reason the tool is visible at all, and `tool.appearanceChannel` already spends it on width |
| *"Structure and scale settled here; **the objects themselves are invented downstream.**"* — `02-GAMEPLAY.md` | `[brief: soft]` ← `[you accepted: R4 Q4]`. Downstream turned out to be `collection`, in wave 3, as 24 names |
| *"**Tone: warm, aged, unhurried.** Not spooky, not grim, not a power fantasy"* — `01-FOUNDATION.md` | `[brief: soft]` ← `[you accepted: R2 Q3]`. Enumerated as `theme/tone/04` `D1`–`D15`; I inherit the list rather than re-deriving it |
| *"Target: the **smallest game that still gives every creative area real work.**"* — `00-CORE.md` | **`[brief: binding]`** ← `[you chose: R1 Q3]`. No object class exists to give this domain something to do |
| *"content design is the primary creative work on this project, **not art**"* — `00-CORE.md` | **`[brief: binding]`** ← `[you chose: R1 Q1]`. Relayed exactly because it prices the Find-form question below |
| *"**8–14, mobile-heavy, short sessions.**"* — `00-CORE.md` | **`[brief: binding]`** ← `[you chose: R1 Q4]` |
| *"**Forbidden:** any paid area, relic, or set"* — `03-META.md` | `[brief: soft]` ← `[you accepted: R5 Q4]`. No object I spec is sold or marked as purchasable; `products.F19` forbids the surface anyway |
| Priority 3 — *"real procedural generation · rebirth · offline accrual · codes · daily rewards · leaderboards · trading · seasons and events"* — `03-META.md` | `[brief: soft]` on provenance, **hard as a gate**. No object, no plinth, no container, no reserved corner for any of them |

**Approved keys and shipped files I may not re-decide.** `patch` (my own `01`: `footprint` 3,
`collides` false, `material` `"Grass"`) · `tiers` (four shapes, four heights, four rgb) ·
`representation` (`patch` geometry per shape; `tool` = two `Part`s at `0.3 × 0.3 × 1.4` and
`headWidth × 0.2 × 0.6`, two `WeldConstraint`s; **`find` is `kind: none`, `class: null`**) ·
`rarity` (`findRarityField: null`; `forbidden` bans rarity colour, frame, glow, border, sparkle
and badge on a Find) · `collection` (the 24 names) · `tool` `T1`–`T12` ·
`theme/setting/05` `P1`–`P12` / `A1`–`A25` (the closed present list) · `theme/setting/03` (one
hour, no second lighting state) · `theme/identity/04` (nine entity classes, none of them) ·
`budgets` (`uploadedMeshAssetsInWorldGeometry` 0, `uploadedImageAssetsInWorldGeometry` 0,
`trianglesPerPatchBudget` 100, all four shapes ≤ 400 triangles) · `tech/performance/03`
`N1`, `N2`, `N12`, `N13`, `N16`, `N17` · `vocabulary` (eight banned words including `relic`,
`tier` and `treasure`).

## The ruling this domain existed to make — does a Find have a form?

**Ruled here so the writer implements it rather than re-litigating it. It is gap G6.**

**A Find has no world form, no icon and no image asset. Its only form is its name, rendered in
the index slot whose structure `screens` owns.** `[cid: decided]`

Which of the three colliding lines is stale, one at a time:

1. **`representation.find` — not stale, and it is the one that governs.** *"A Find has no
   Instance at any point in its life"*, `class: null`, `createdBy: "nothing"`. A shipped build
   depends on it and `grep -rn "rbxassetid" game/src` returning nothing is one of its acceptance
   criteria.
2. **`gameplay/meta/02`'s *"Art — Objects owes 24 models, and each must read at icon size in a
   grid"* is stale.** It is a wave-3 *consequence* line, written before `architect/06` ruled, and
   it is prose rather than a value inside the `collection` manifest — so striking it moves no
   key. Sheet 04 files the strike as a revision request; it does not edit another domain's sheet.
3. **`modal-grid`'s requirement of `name`, `price` and `art` on every item does not reach this
   surface.** `ui-ux/screens` established that `modal-grid` **cannot produce the index at all**,
   on three independent counts (`modal-grid.mjs:475-487`, `index.mjs:44-76`), and the shipped
   `IndexScreen.luau` is hand-built. A compiler requirement from a pattern the surface does not
   use is not a requirement.

Three further facts, each of which independently kills the icon path:

- **There is nowhere to put it.** `collection.sets[].relics[]` is an array of bare strings, so no
  per-Find object exists to hang an art key on — `ui-ux/screens` G14, which I re-derived from
  `collection`'s manifest. An icon would need the same revision `screens` sheet 04 is already
  filing for flavour text, against a key `gameplay/meta` owns.
- **An icon is an uploaded asset.** `ImageLabel.Image` is typed `ContentId` and every documented
  sample is `rbxassetid://…` `[research: https://create.roblox.com/docs/reference/engine/classes/ImageLabel]`
  — the page states no requirement in words, so this is `[unverified]` as a quotation and settled
  as practice. 24 of them contradicts `representation`'s *"no asset needs to be produced to build
  this game"* and blocks the build on 24 uploads, against a `[brief: binding]` line saying art is
  not this project's primary work.
- **The genre precedent points the other way and is already closed against us.** A search snippet
  attributes silhouette icons for unfound entries to DIG's 601-item Collection
  `[unverified — dig-it-roblox.fandom.com/wiki/Collection returned HTTP 402; the snippet is a
  synthesis, not a page quote]`. Even if true, `theme/tone/04` `D11` bans a silhouette, blurred
  model, greyed name or question-mark icon for an unrevealed Find, and `representation.index-surface`
  says *"A held name reads as its name; an unfound name reads as an empty slot. **NOTHING ELSE.**"*

**The cost of this ruling, stated rather than buried:** the game's differentiator carries its
entire visual load on typography and panel layout, which are UI Art's and `screens`'. That is the
compliant reading of *"content design is the primary creative work on this project, not art"*, and
it is reversible in exactly one place — sheet 04 states the price of reopening it so a later
reader does not have to re-derive it.

**And the second half of the same question, which nobody flagged:** `theme/setting/05` `P4` —
*"Loose worked objects, set down where they were left, and every one of them is a `Find`"* — sits
in the **present** column of a list whose own words are *"the present column is the whole dressing
list"*. Every member of P4 is a Find; a Find has no Instance; therefore **P4 renders nothing**. A
builder dressing a bay from the present column would build objects that the representation
contract says do not exist. Sheet 02 rules it: zero loose objects render, and the fixed-versus-loose
rule becomes a check anyone can run.

## What the brief did not give me

Routed, not filled.

| # | gap | routed to |
|---|---|---|
| O1 | **The brief says nothing whatever about what any object is *made of*.** No material, no colour, no finish, no proportion language appears in any of the eight sheets for any object. `theme/setting/05` G9 already records the same silence for the place: *"every `[cid: decided]` row above answers a question nobody asked."* Every value this domain emits is `[cid: decided]` against a silent brief | **02**, **03**, **05**, each carrying the tag |
| O2 | **G7 — the tool's `Colour`, `Material` and `Transparency` are unset in shipped code** because no key states them (`game/src/server/Tool.luau:211`: *"deliberately NOT set: no key states them"*). Two parts in every player's hand render at engine defaults | **03** |
| O3 | **G6 — whether a Find has a form.** Ruled above; the data form, the register, and the revision request are still to be written | **04** |
| O4 | **G3 — no token layer exists for anything rendered in the world**, so every value 03 and 05 emit is a literal, which is the thing `CLAUDE.md`'s token rule exists to prevent. `styleGuide` is expected to name the closed material list and the palette roles and **has not been written at the time I write this** | **02** names the shape (role + resolved enum value); the resolution is **style-guide work**'s and the seam owner's |
| O5 | **No key forbids adding a child Instance to a patch.** `representation.patch.properties` lists properties, not children; nothing states that a patch has zero children. A `Decal`, a second part or an `Attachment` per patch is legal today and multiplies a count already at 86% of `serverWorldInstanceCeiling` | **05** |
| O6 | **`tool` `T9` contradicts `tool`'s own width ladder.** `T9` forbids *"no blade edge longer than the grip"*; the grip is `1.4` studs long (`representation.tool.handle.Size`) and head width is `1.2 + 0.35 × level`, so it exceeds the grip from **Reach level 1** and reaches `4.0` — 2.9× the grip — at the top. Both figures are inside approved keys and neither is mine to move | **03** states it as a finding and answers it with the only lever it owns (material and colour, so a 4 × 0.2 slab does not read metallic); the geometry belongs to **tool-behaviour work** and **representation work** |
| O7 | **`theme/setting/05` `P4` is a present class with zero rendered members** — the closed dressing list contains a category that builds nothing | **02** |
| O8 | **G10 — `budgets` sets no count, dimension or memory ceiling on UI image assets.** My ruling ships zero, which shrinks G10's surface to UI Art's two named icons (`find`, `shard`) rather than closing it | relayed; **ui-art work** proposes, **performance work** ratifies |
| O9 | **G4 — every ceiling is `[playtest unknown]` and `budgets.renderCeilings.batchingFactor` (50, range 1–500) decides whether the merged design renders at all.** Nobody owns taking a render-stats reading on a device | relayed to **02** and **05**, both of which must state their cost at both ends of the range |

## Two subjects in my `owns` list that this game does not have

Recorded as data with reasons, per `CLAUDE.md`: a domain that runs and correctly concludes
*nothing* is information; a silently skipped one is not. Both land in **sheet 02** as explicit
zeros with a check each, not as omissions.

- **Pets and companion visuals: zero, by an approved ruling, not by my choice.**
  `theme/identity/04`: *"This game contains nine classes of entity: **none of them**"* — the nine
  include companions and pets by name, and it reopens on exactly one condition, which has not
  occurred. There is also no system for a companion to attach to: `input`'s verb roster has no
  equip or summon, `response.controlEverAffected` is false, and `theme/setting/05` `A14` bans
  every form of modelled ambient motion inside the built edge. **The check: zero Instances in
  `game/src` parented to a character other than the one `tool` Model.**
- **"Rarity read at a glance": there is no per-item rarity to read, and the one graded ladder is
  not mine.** `rarity` ships one graded ladder, `overgrowth-tier`, read from `patch.tierIndex`
  and defined by `tiers` — whose shapes, heights and colours all ship and which `N12` and my own
  `01` criterion 3 protect. `findRarityField` is `null` and `perObjectVisualGrade` is `false` for
  `find-set`, so **no object in this game carries a rank of its own**. What my domain owes the
  legibility requirement is not a rarity channel but a promise not to add a second one: sheet 05
  states that nothing added to a patch may compete with the silhouette that carries tier.

## Why 4 new sheets

`01` exists, ships `patch` and is indexed at its number unchanged. Everything else in this domain
resolves to **one proposed key, `objectArt`**, so under the contract rule the floor is one more
sheet. I write four because there are four genuinely separate decisions with four different
acceptance criteria, and one sheet holding all of them would be one sheet with four headings —
the other failure the rule names. **Sheet 02 and only sheet 02 carries the `manifest` block for
`objectArt`; 03, 04 and 05 file plain ` ```json ` amendments addressed to 02, which folds them.**
That is the pattern `theme/vocabulary/01`, `/03` and `/04` used against `/02` and `ui-ux/screens`
used in wave 5, and it is the only shape that does not trip one-key-one-sheet in `bridge/merge.mjs`.
The split is by kind of decision: 02 decides which object classes exist at all, 03 decides what the
one object in the player's hand is made of, 04 decides whether the collection's 24 members have a
form, and 05 decides whether the 640-per-lane object stays a primitive and what may be attached to
it. I considered folding 05 into 02 — a patch is a class in 02's roster — and kept it separate
because it constrains `patch`, a key I already own, and carries a triangle budget and an instance
multiplier that 02's roster does not. I considered a fifth sheet for the T9 finding (O6) and
rejected it: a finding is not a decision, and it belongs beside the material choice that answers it.

| # | sheet | must decide |
|---|---|---|
| 01 | `patch-footprint` | **Exists and ships `patch` (`footprint` 3, `collides` false, `material` `"Grass"`); the running build reads it. Indexed here unchanged and not reassigned.** |
| 02 | `the-object-roster` | The complete closed list of object classes this game renders and which domain builds each, and the fixed-versus-loose rule `theme/setting/05` P3/P4 hands to Objects by name — stated as a check anyone can run, given that every member of P4 is a `Find` and `representation.find` gives a Find no Instance, so rule on how many loose objects render and defend the number; plus the explicit zeros with a reason and a check each — pets and companions (`theme/identity/04`), props and clutter, per-item rarity read (`rarity.findRarityField` is null), uploaded meshes and images (`budgets`), and icon renders — and the material-and-colour expression shape every other sheet in this domain uses, as a named role plus the value it currently resolves to, so `styleGuide` can own the role later without a rewrite. **This sheet and only this sheet carries the `manifest` block, `provides: "objectArt", status: "proposed"`, and folds the amendments filed by 03, 04 and 05.** |
| 03 | `the-tool-in-hand` | The `Colour`, `Material` and `Transparency` of the tool's two `Part`s — the three properties `game/src/server/Tool.luau:211` leaves at engine defaults because no key states them — drawn only from `Enum.Material`'s 47 built-in members, since `MaterialVariant` and `SurfaceAppearance` both require uploaded texture assets that `budgets` sets to zero; banning `Neon` by name against `T10`'s no-glow rule and any gold or gilded finish against `theme/lore/01`; stating that the two parts' **sizes are `representation.tool`'s and shipped** and are not reopened here; and answering finding O6 — the head's width exceeds the 1.4-stud grip from Reach level 1 and reaches 4.0 studs, which `T9` calls a blade edge — with the only lever this domain owns, a material and colour that keep a 4 × 0.2 slab from reading as an axe or a scythe, while routing the geometry itself to whoever owns `tool.headWidthPerLevelStuds`. |
| 04 | `what-a-find-is-made-of` | The Find-form ruling as data a builder can read — no world Instance, no icon, no image asset, zero uploaded assets, and a panel form that is the slot node `screens` owns, **cited by field and not copied, because `ui-ux/screens` is mid-revision on how a slot renders** — plus the material register `theme/setting/01` states for the 24 (*"dressed stone, fired clay, cast bronze, worked wood and cut gearwork"*, with `Orrery` as the technology ceiling) recorded as an authoring constraint on any future form rather than as a build instruction; whether marks and figures *on* a Find exist given there is no surface to mark; the revision request striking `gameplay/meta/02`'s stale consequence line *"Art — Objects owes 24 models"*, filed against the sheet's owner and not applied here; and the exact price of the icon path — 24 uploads, a revision to `collection`'s bare-string array, and a build that blocks until they exist — so a later reader can reopen it on the argument. |
| 05 | `foliage-form` | Whether a patch stays a primitive `Part` forever or ever becomes a mesh, with `representation`'s stated price quoted (`patch.kind` becomes `mesh`, four assets required, the build blocks, `N17` and `budgets.uploadedMeshAssetsInWorldGeometry` 0 both break); how the four shipped shapes at their shipped heights and rgb read as the four plants `theme/setting/05` P5 already named, at phone size, in greyscale, without adding a second channel that competes with the silhouette carrying tier; **the number of child Instances a patch may carry, which no key states today and which multiplies a count already at 86% of `serverWorldInstanceCeiling`**; that `patch.material` stays `Grass` for all four tiers because `01` fixes it and a per-tier material is a revision request against `01` rather than a decision here; and the four-shape triangle total against `budgets.trianglesPerPatchBudget`, stated at both ends of `batchingFactor`'s 1–500 range with the consequence that below 10 the lever is `depths.areas[].patchCount` and not anything this domain owns. |

## The contract key this domain needs

**`objectArt` does not exist** in `cid/_contract.md`'s 25, nor anywhere in `bridge/schema.mjs`.
I own one merged key already — `patch` — and propose one. `objectArt` would hold:

- **the rendered object roster** as a closed list, each entry carrying `class`, `builtBy`, the
  count per lane, and whether it is fixed to the building or loose;
- **`looseObjectInstanceCount: 0`** and the fixed-versus-loose predicate that makes it checkable;
- **the explicit zeros**, each with a reason string and a grep: pets, companions, props, clutter,
  per-item rarity marks, uploaded meshes, uploaded images, icon renders;
- **`objectArt.tool`** — per part, a material role, the `Enum.Material` value it resolves to, an
  rgb, a transparency, and the banned-material list;
- **`objectArt.find`** — `worldForm: "none"`, `iconCount: 0`, `uploadedAssets: 0`, the panel form
  as a field reference into `screens`, and the material register as an authoring constraint;
- **`objectArt.foliage`** — `kind: "primitive"`, `childInstancesPerPatch: 0`, the four-shape
  triangle total, and the mesh path's stated price.

Every value in it is a property of a thing that renders, which is what makes it a build input
rather than a description: a builder setting `Part.Color` and `Part.Material` on the tool today
has no key to read, and the shipped code says so in a comment.

## Verification note

**Sheet 03 is the one most likely to be contradicted, and by Style Guide, in this same wave.**
`cid/art/style/_lead.md` does not exist on disk as I write. `styleGuide` is assigned *"the closed
list of `Enum.Material` values that may appear at all"* and the named palette roles, and my writer
cannot read its sheets — the derived pack does not carry siblings. If 03 names a material or an
rgb that Style Guide's list does not contain, two keys describe one `Part` and neither can see the
other. **The boundary a verifier should check first: 03 must express its choice as a role plus the
value it currently resolves to, and must state that the role belongs to `styleGuide` the moment
that key exists.** A flat literal in 03 is the failure mode; a role with a stated fallback is not.

Second most likely: **04, by Meta & Content**, which owns `collection` and may decline the strike
of its consequence line. That refusal is cheap and legitimate — the line is prose, not a manifest
value — and 04 must be written so the *declined* branch changes nothing about the ruling.

Third: **05, by Performance and by `depths`**, if `batchingFactor` comes back below 10. Nothing in
05 may be designed around a number nobody has measured; it states its cost and names the lever it
does not own.

## Research owed

**My node in `docs/cid-workflow.json` carries no `must_verify`.** I fetched anyway, because
whatever I bank is the only external evidence my writer can cite.

**Fetched this run, and usable:**

- `[research: https://create.roblox.com/docs/reference/engine/enums/Material]` — **47 members**,
  including `Limestone`, `Wood`, `WoodPlanks`, `Metal`, `CorrodedMetal`, `Foil`, `Leather`,
  `Fabric`, `Plaster`, `Concrete`, `Cobblestone`, `Sandstone`, `Slate`, `Grass`, `LeafyGrass`
  and **`Neon`**. This is the space sheets 03 and 05 choose inside, and `Neon`'s presence is why
  `T10`'s no-glow rule needs a named ban rather than an adjective. The page does **not**
  distinguish built-in from custom.
- `[research: https://create.roblox.com/docs/parts/materials]` — the distinction the enum page
  omits. A `MaterialVariant`'s texture maps require that you *"paste an asset ID or import a new
  texture from your computer"*; `SurfaceAppearance` uses the same PBR texture route; built-in base
  materials require no upload, their *"texture assets are bundled with Studio instead of being
  accessible as a typical asset ID."* **This settles that any custom material in this game is an
  uploaded image asset, which `budgets.textureCeilings.uploadedImageAssetsInWorldGeometry: 0`
  forbids outright.** It is the sourced half of sheet 03's constraint.
- `[research: https://create.roblox.com/docs/reference/engine/classes/ImageLabel]` — `Image` is
  typed `ContentId` and the documented samples are `rbxassetid://…`. **`[unverified]` as a
  quotation:** the page states no requirement in words. The settling fetch is
  `raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/reference/engine/classes/ImageLabel.yaml`
  for the property description, or `create.roblox.com/docs/ui/labels`.

**Owed and not obtained — stated, not papered over:**

- **A shipping Roblox collection surface showing how it draws a found and an unfound entry.**
  `dig-it-roblox.fandom.com/wiki/Collection` returned **HTTP 402**, `fischipedia.org/wiki/Bestiary`
  **403**, and `bloxinformer.com/wikis/dig/islands` fetched but covers islands, not the logbook. A
  search snippet asserts silhouette icons for DIG's unfound entries; **it is a synthesis, not a
  page quote, and nothing in sheets 02–05 may rest on it.** This is the same fetch
  `theme/tone/02`, `cid/_state.md` and `ui-ux/screens` all record as owed. `[unverified]` — the
  settling fetch is an in-client screenshot or a fan-wiki page reproducing a collection panel with
  unfound slots visible, from a client the Fandom edge does not reject. **The ruling above does not
  depend on it**: `D11` and `representation.index-surface` close the question from inside whatever
  the genre does.
- **A render-stats reading on a real device**, which would collapse `batchingFactor` from a range
  to a number. No sheet in either contract owns taking one (`tech/performance/01`, *Not decided
  here*). Sheet 05 states its cost at both ends instead.
- **A measured render of the index at phone viewport.** `ui-ux/screens` records the same fetch as
  owed and I have no shell tool either. It bears on whether a name-only slot is legible at 12 px,
  which is UI Art's and `screens`' number, not mine — but it is the one measurement that could
  argue back at the no-icon ruling.
