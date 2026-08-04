# Art & Visuals — category brief

**Wave:** 6. Source: `concept/spec/incremental-spinoff-v2/`. Read `HANDOFF.md` first, then
`CONCEPT.md`, `00-CORE.md`, and every numbered sheet through `04-PRESENTATION.md` — Art & Visuals
is a layer-4 subject, so layers 1–3 are constraints you inherit and not decisions you get to make.
Then `OPEN.md` §2, §4 and §5.

This is an **assignment document.** It contains no Art & Visuals decisions. Every surface listed
below is cited to the approved key, shipped file or brief line that put it there; nothing here is
invented, and rows marked *candidate* or *absent* are named so that a lead rules on them rather
than discovers them.

Also read before you write: `cid/_digest.md` (every wave 1–5 decision and its boundary),
`cid/_contract.md` (25 merged keys and their owners), `cid/_state.md` (rulings R-1..R-4,
escalations, build-stage notes), `cid/_playtest.md`, `cid/theme/setting/01`, `/03`, `/04`, `/05`,
`cid/theme/tone/03` and `/04`, `cid/theme/identity/02` and `/04`, `cid/tech/performance/01` and
`/03`, `cid/ui-ux/_category.md`, `architect/sheets/06-representation.md`, and — this is not
optional — `ui-forge/src/theme/palettes.mjs`, `ui-forge/src/theme/generate.mjs`,
`ui-forge/src/compose/index.mjs` and its two patterns.

---

## The developer's mandate, in the developer's words

> *"I can play and walk around, but nothing really looks good."* — `cid/_playtest.md`, 2026-08-01,
> n = 1, the only empirical reading this project has.

That is this category's charter. It is also the only line in this document that is not a
constraint: **it names the problem and settles nothing about the fix.**

---

## What the brief binds for this whole category

| constraint | tag | consequence for Art & Visuals |
|---|---|---|
| *"**`ui-forge` vibe key: `fantasy-ornate`** … In words: ornamented, warm, aged, crafted. Stone and foliage, not candy."* `04-PRESENTATION.md` | `[you accepted: R6 Q2 → R5 Q2]` → `[brief: soft]` | The archetype key is named and it resolves to a real, complete token set (`ui-forge/src/theme/palettes.mjs:75-88`). **The shipped game is themed `cartoon-vibrant` instead.** See finding G2. |
| *"**`cartoon-vibrant` would fight the fiction.** An ancient ruin in candy colours loses the discovery mood, even though it is the safest choice for an 8–14 mobile audience."* `04-PRESENTATION.md` | same block → `[brief: soft]` | The one archetype the brief argued *against by name* is the one on disk in `game/src/shared/Theme.luau`. This is the most directly actionable line in the brief for this wave. |
| *"**Tone note:** warm and unhurried, not spooky. This is reclamation, not a haunted place."* `04-PRESENTATION.md`; *"**Tone: warm, aged, unhurried.** Not spooky, not grim, not a power fantasy."* `01-FOUNDATION.md` | `[you accepted: R6 Q2 → R5 Q2]` and `[you accepted: R2 Q3]` → `[brief: soft]` ×2 | Converted into fifteen checkable exclusions by `theme/tone/04`, `D1`–`D15`. Six of them audit this category by name. Do not re-derive the register; inherit the list. |
| *"**Hard constraint: rarity tiers must differ by shape or silhouette, not only hue.** … **This is a requirement, not a nicety**"* `04-PRESENTATION.md` | `[you accepted: R6 Q4]` → `[brief: soft]` **in the brief** | Relayed at its true tag. **`architect/sheets/06-representation.md` treats it as `[brief: binding]` and a shipped build depends on that reading**, `tiers` ships four distinct shapes and four distinct heights, and `tech/performance/03` `N1`/`N2`/`N12` forbid every optimisation that would flatten them. Overruling it now invalidates work downstream. Treat as effectively binding and say so if you disagree. |
| *"**Green overgrowth on warm stone is naturally high-contrast**, so rarity tiers stay legible — a real problem the v1 spec hit with white snow."* `04-PRESENTATION.md` | same block → `[brief: soft]` | `theme/setting/01` converted this into a measurable floor: **cleared stone must hold a Rec.601 luma ≥ 165**, at least 40 above the lightest tier green (`Moss` rgb `[104,142,76]`, luma 123). Every palette and lighting decision in this category is bounded by that one number. |
| *"**Relics must read as treasure.** The collection is the differentiator; `fantasy-ornate` is the only archetype built for ornament and age."* `04-PRESENTATION.md` | same block → `[brief: soft]` | **Already partly overruled by an approved wave-1 sheet.** `theme/lore/01-the-past` `## Pushing back`: *"Art must not add gold, gilding or gemstones to compensate."* `theme/setting/01` restates ornament as *"carving, casting, dressed joints and pattern in the paving — not iconography, not gilding."* You inherit the ornament budget in that form. |
| *"**8–14, mobile-heavy, short sessions.**"* `00-CORE.md` | `[you chose: R1 Q4]` → **`[brief: binding]`** | Every rendered thing is read by an 8-year-old on a phone. Legibility at phone size is a floor, not a preference. |
| *"~70% mobile / ~25% desktop / ~5% console"* `00-CORE.md` | `[I assumed — the split]` → `[brief: soft]` | The *band* is binding; the ratio is not, and `cid/_state.md` records it as **uncorroborated by anything fetched**. |
| *"Target: the **smallest game that still gives every creative area real work.**"* `00-CORE.md` | `[you chose: R1 Q3]` → **`[brief: binding]`** | No asset exists in order to give a lead something to do. A domain that concludes "nothing" is compliant; a domain that invents a prop class to look busy is not. |
| *"**Consequence downstream:** content design is the primary creative work on this project, **not art** or marketing."* `00-CORE.md` | `[you chose: R1 Q1]` → **`[brief: binding]`** | Relayed exactly because it is uncomfortable and it is binding. This category is not the project's centre of gravity by the developer's own decision. It is nonetheless the category the one playtest complained about. Both are true; resolve it by being cheap and legible, not by being ambitious. |
| *"**Tension is zero by design**, confirmed deliberately. **Audio and visual feedback carry the entire feedback load.** Do not invent tension to fill the gap."* `HANDOFF.md` six-things #4, elevating `02-GAMEPLAY.md`'s `[you accepted: step 6 Q2]` | **`[brief: binding]` on the instruction** | Two halves and both bind. Visual feedback carries the load *and* may not carry it by escalation, ramp, threat, urgency, or anything that reads as approach-to-a-deadline. `theme/tone/03`'s forbidden-peak table is the enumeration. |
| *"**Cleared is permanent — overgrowth never returns.** This is the payoff and it is load-bearing."* `01-FOUNDATION.md` | `[you chose: R2 Q1]` → **`[brief: binding]`** | Nothing regrows, nothing settles in, nothing a cleared area reaches later. `theme/setting/04` `W1`: a finished part *"gains no marker, plaque, dressing, light, colour shift, sound, cue or state of any kind."* |
| *"**Rarity ladder lives in the overgrowth**, not in a separate drop table."* `01-FOUNDATION.md` | `[I assumed — carried from the reference's model; not interviewed]` → `[brief: soft]` | Now settled downstream and no longer yours to re-open: `rarity` ships **one** graded ladder read from `patch.tierIndex`, and `rarity.forbidden` bans rarity colour, frame, glow, border, sparkle and badge **on a Find**. |
| *"Left open — the 24 relics, how overgrowth tiers read at a glance on a phone, what 'restored' looks like versus 'overgrown', and the depth-themed chunk looks."* `04-PRESENTATION.md`; *"The 24 relics; overgrown-vs-restored looks; tier legibility on a phone → Art & Visuals"* `OPEN.md §4` | untagged → `[brief: soft]` | **Three of these four are already answered elsewhere and one is void.** The 24 names ship in `collection`; `architect/06` rules a Find has **no Instance ever**; `theme/setting/04` narrows *restored vs overgrown* to *"the same stone, with and without plants on it"*; depth theming is `layout`'s four chunk families. What survives as genuinely yours is **tier legibility on a phone**. |
| *"Endless via shuffled authored chunks, not generation."* `03-META.md` | `[you chose: R5 Q1]` → **`[brief: binding]`** | Authored variety is the lever, and `layout` fixes it at 8 families × 16 variants of a 120 × 30 chunk. Nothing this category makes may be generated per session. |
| *"**Permanent multipliers only. Never content access.** … **Forbidden:** any paid area, relic, or set."* `03-META.md` | `[you accepted: R5 Q4]` → `[brief: soft]` | No visual may be sold, and no visual may mark a thing as purchasable. Cosmetics were *"offered and declined as needing a display system first"*, so there is no skin, no trail, no aura and no cosmetic surface in this game. |

### Approved keys and rulings that bind you before you start

Settled facts, not inputs to re-decide. Every one is a merged or proposed contract key, an
approved sheet, or a shipped file.

| source | what it forces on this category |
|---|---|
| `patch` — `art/objects/01` | `footprint` 3, `collides` false, `material` `"Grass"`. **This is your own category's key and the shipped game reads it.** Not to be rewritten. |
| `tiers` — `gameplay/systems/01` | Four tiers: `Moss` Block h1.6 rgb `[104,142,76]`, `Fern` Cylinder h2.4 `[78,128,66]`, `Bramble` Ball h2.8 `[58,104,58]`, `Heartvine` Wedge h3.4 `[44,86,52]`. **Shape, height and rgb all ship.** Criterion 4: *"Every tier renders as a distinct silhouette in a greyscale screenshot."* |
| `representation` — `architect/06` | Nine subjects, exhaustive. `patch` is a `Part` (`WedgePart` for Heartvine) with per-shape `Size` and `Orientation`; `plot` is one `Slate` slab, top face at Y = 0, growing inward; `plot-boundary` is four **invisible, non-querying** `SmoothPlastic` parts; `tool` is a two-`Part` `Model`, no asset; **`find` is nothing — a Find has no Instance anywhere**; `hud`, `pressable`, `index-surface` are the three GUI subjects. *"No asset id is needed anywhere"*; `grep -rn "rbxassetid" game/src` must return nothing. |
| `budgets` — `tech/performance/01` (proposed) | `uploadedImageAssetsInWorldGeometry: 0`, `uploadedMeshAssetsInWorldGeometry: 0`, `graphicsMeshPartsMB: 0`, `graphicsTextureMB: 60`, `drawCalls: 1000`, `triangles: 1000000`, `trianglesPerPatchBudget: 100` with **all four tier shapes together in ≤ 400 triangles**. Materials are three built-in enums: `Grass`, `Slate`, `SmoothPlastic`. **Every one of these is `[playtest unknown]`.** See the ceiling warning below. |
| `tech/performance/03` `N1`–`N17` | Seventeen savings performance is forbidden to take, several of which are *your* protections: `N1` no LOD/imposter/mesh-merge/billboard/distance-collapse on a patch; `N2` no merging patches; `N12` no reducing the four heights toward each other; `N7` no `Atmosphere`, no fog, no opaque inter-plot boundary; `N16` no staggering or tweening patches into existence observably; `N17` no uploaded asset added to world geometry to reduce part count. |
| `response` — `gameplay/mechanics/05` | Five beats with channels and budgets. `patchClear`: `atPatch` + `readout`, 80 ms acknowledgment, 250 ms payout, **`residueLifetimeSeconds` 0.4**. `findReveal`: `atPatch` + `audio`, **`dwellSeconds` 2.5**, `notice` forbidden. `setComplete`: `notice` + `audio`. `areaComplete`: `notice` + `audio`, **`atPatch` forbidden**. `upgradePurchased`: `readout` + `audio`. `controlEverAffected: false`; `negativeBeats: 0`; min onset gap 0.6 s. Its own words: *"whatever the clear is made of must be gone from the patch position inside the residue lifetime, and whatever the reveal is made of must persist for the dwell. **Those two numbers are the entire interface between this sheet and yours.**"* |
| `theme/tone/03` `B1`–`B5` | Ranking is `B1 > B2 > B3 > B4 > B5`, no ties. `B4` is *"audio and UI only, **no VFX in the world**"*. `B5` has **exactly one intensity, forever** — no streak, combo, rising pitch or crescendo near completion. Nothing amplifies by depth, by rarity, by first-ever or by last. **Nothing may ramp toward a completion.** |
| `theme/tone/04` `D1`–`D15` | Your blacklist, diffable against an asset list. `D1` cobwebs/skulls/bones/graves/chains/blood/scorch. `D2` light flicker, moving shadow, darkening pulse, vignette, fog volume, dust motes. `D5` confetti, fireworks, camera shake, full-screen flash, slow motion, freeze frame, radial speed lines, chromatic aberration. `D13` a face, eyes or mouth on any object, button, icon or foliage model; a mascot. `D14` staged rubble, memorials, remains. `D15` calendar, seasonal decoration, festival banner. |
| `theme/setting/01` | The place is *"a stone works built to gather water and keep the count of it"* on *"a broad temperate hillside of warm pale limestone under broadleaf wood"*. **Warm pale limestone, luma ≥ 165**, never grey granite, white marble, red brick or dark basalt. *"Weathering is uniform across all four depths; only the quantity of green varies."* Nothing alive but plants and players. |
| `theme/setting/05` `P1`–`P12`, `A1`–`A25` | **A closed present list of twelve classes of matter and twenty-five stated absences.** *"the present column is the whole dressing list and it is closed. Nothing outside P1 to P11 appears inside the built edge."* Concretely absent and most likely to be reached for: props of any kind, rubble, cloth, rope, torches and lamps, water of any kind, wet stone, statuary and relief figures, cut lettering, and **any swaying or drifting element**. The one motion budget is `P9`'s canopy, beyond the built edge. |
| `theme/setting/03` `R1`–`R6` | **One hour, one sky, no weather, zero supernatural budget.** `ClockTime` 15.5 / `GeographicLatitude` 20 / `Brightness` 2 as shipped in `game/default.project.json` are **ratified, with zero changes requested**. Zero `Clouds`, zero `Atmosphere`, no moon/star/low-sun texture, no second lighting state, and *"you may not solve a dim vault by moving the sun."* |
| `theme/setting/04` `W1`–`W6` | A finished part is *"the same part with the green gone, forever"* and gains nothing. Two openings per part, always open, holding nothing: *"an opening must read as construction that was always open — a gap where a channel runs through the wall, a stair run continuing past the parapet, a bay left open in a vault. **Never a doorway, an arch with a frame, a gateway**"*, because `Hinge`, `Seal` and `Key` are live `Find` names. |
| `theme/identity/02` | *"**The player wears their own saved Roblox avatar, unmodified.** No global override, no provided character, no uniform, no granted accessory."* Zero avatar treatment. Criterion: zero `HumanoidDescription` / `ApplyDescription` / `LoadCharacterWithHumanoidDescription` in emitted Luau. |
| `theme/identity/04` | *"This game contains nine classes of entity: **none of them.**"* No NPCs, enemies, vendors, quest-givers, named characters, factions, companions or pets, spirits, or a mascot. Reopens on exactly one condition, which has not occurred. |
| `theme/identity/03` | A stranger must read as *"a person and not a prop"*. The health bar is off; nameplates are the platform default and are not to be dressed. *"a plot appears and disappears whole; nothing may stagger or animate its patches into existence."* |
| `rarity` — `gameplay/systems/03` | One graded ladder (`overgrowth-tier`, from `patch.tierIndex`, *"silhouette first, colour second"*) and one ordinal ladder (`find-set`, legible **only** as the four set headings on the collection surface, `perObjectVisualGrade: false`). `rarity.forbidden` bans rarity colour, frame, glow, border, sparkle and badge on a Find, **and a reveal cue that varies by which set the Find belongs to.** |
| `depths` / `layout` / `plots` — `gameplay/meta/04`, `/05`, `/06` | Eight areas, four depths, patch counts 140 → 640, `minSpacing` 6. A chunk is 120 × 30 with `edgeKeepoutStuds` 1.5; 4 families × 16 variants; the patch field is *"the central 96 studs of each 120-stud chunk"* with 12 studs of bare walkable margin each side. A lane is 120 wide at a 122-stud pitch. **Art dresses what these decide; it does not resize them.** |
| `collection` — `gameplay/meta/02` (rev. R-2) | The 24 Find names ship: Terrace `Sundial · Ewer · Hinge · Tessera · Stylus · Bellcast`; Cistern `Sluice · Weight · Siphon · Chain · Grate · Cup`; Vault `Seal · Ledger · Coffer · Key · Tally · Ring`; Spire `Gnomon · Lens · Vane · Crest · Orrery · Finial`. Its own line *"Art — Objects owes 24 models"* was written before `architect/06` ruled a Find has no Instance. **That line is stale; see G6.** |
| `vocabulary` — `theme/vocabulary/02` | `casing: "title"`, `maxLabelChars: 14`, `maxSentenceWords: 12`, `allowedPattern`, and eight banned words including `relic`, `tier`, `treasure`. Applies to every player-facing string this category produces, including an icon's accessible name. |
| `cid/ui-ux/_category.md` and its six leads | **They own structure, behaviour, hierarchy and copy. You own how it looks.** The seam is stated per-domain under UI Art below. `composition` (HUD cluster geometry) and `viewport` (touch-target geometry) are theirs, not yours. |
| Rulings R-1 and R-4 — `cid/_state.md` | Four on-screen pressables exist (`Pressable_BUY1/2/3`, `Pressable_INDEX`). There is **no in-game store**, and `products.F19` forbids naming, showing or pricing a product on any in-game surface. |

---

## The ceiling warning — read this before any domain designs against a budget

**Every instance, triangle, texture and draw-call ceiling in `budgets` is `[playtest unknown]`,
because no published per-device ceiling exists.** `tech/performance/01` established that rather
than assuming it: Roblox declines to publish one and instructs developers to *"choose at least one
'baseline' device, test your game on it throughout the development process"*
`[research: creator-docs/performance-optimization/design.md]`.

Two consequences you must carry into your own sheets rather than design around:

1. **There is no device floor in the brief.** `tech/performance/01` named one itself —
   *"a 3 GB-RAM phone at the Roblox platform minimum OS"* — tagged **`[cid: decided]`**, flagged
   upward, and explicitly reversible; `budgets.deviceFloor` is the single field that moves every
   derived ceiling. Worse, `cid/gameplay/meta/01-the-area.md:39` cites *"the brief's 3 GB device
   floor"*, a sentence that exists only in two **simulated test briefs**
   (`concept/spec/syndicate-auction-test/`, `concept/spec/sky-freight-test/`) tagged
   `[simulated: R5 Q5]` — an answer nobody gave. **RR-P1 strikes that citation.**
   **Your domains inherit Performance's floor, not that citation**, and you cite
   `budgets.deviceFloor`, never the brief.

2. **The single largest uncertainty is `budgets.renderCeilings.batchingFactor`: value 50, test
   range 1–500, `[playtest unknown]`.** It asks whether primitive `Part`s sharing shape, size and
   material batch into shared draw calls. Roblox documents draw-call instancing for *meshes* and
   says nothing about primitives. Performance's own escalation, verbatim: *"at 1:1 the merged
   design renders 5814 draw calls against a 1000 ceiling, and **NO legal streaming radius fixes
   it**, because one lane's deepest bay is already 645 parts. The lever is then
   `depths.areas[].patchCount` and it is a finding against `depths`, not an optimisation request."*

**Say it plainly in your sheets: a domain that designs against these ceilings as though they are
firm will be redone.** State what your decision costs, cite the ceiling it is measured against,
mark the ceiling `[playtest unknown]`, and name what would change if the batching factor comes
back below 10. Do not propose a redesign to fit a number nobody has measured, and do not propose
resizing anything — patch count and geometry belong to `depths`, `layout` and `plots`.

---

## Scope gate

`03-META.md` **priority 3 — explicitly not in this project:**

> real procedural generation · rebirth · offline accrual · codes · daily rewards ·
> leaderboards · trading · seasons and events

`[I assumed — the ordering; scope was resolved through R4 Q1 and R5 Q1]` → `[brief: soft]` on its
provenance, and **hard as a gate**: the category verification `checks` in `docs/cid-workflow.json`
fail any sheet that *"reserves space for, stubs, describes or specifies a priority-2 or priority-3
item."*

**No domain may name, imply, or build fiction around any of it.** Concretely, and this is the list
that matters because these are the things an art agent reaches for by reflex: no seasonal dressing,
festival banner, holiday prop, harvest decoration or anniversary marker; no leaderboard plinth,
scoreboard, rank badge or podium; no trade counter, stall, market space, gift box or container that
accepts a thing from a player; no daily-reward chest, refilling cache or anything that appears
overnight; no code-entry surface, no poster or wall bearing a code; no rebirth altar, prestige
aura, reset marker, seed, sapling or new-growth motif; no procedurally varied geometry; and **no
reserved region, empty plinth, bare wall or unused corner held open for any of them.**
`theme/setting/05` `A17`–`A23` already states each of these as a fact about the place, and
`rebirth` is in `vocabulary.bannedWords` so the word itself fails the merge.

**Priority 2** (*richer authored chunk variety · a duplicate-handling refinement · visitable
restored ruins*) is likewise not yours to build or to reserve space for. `theme/setting/04` keeps
*visitable restored ruins* reachable at zero cost and states that a visitor *"would see bare stone
and nothing else"*; that is a scope decision and it is not reachable from this wave.

**Naming one of these in order to forbid it is compliant.** Saying "there is no seasonal variant of
the canopy" in an environment sheet is information; leaving a hook where one would go is not.

---

## The full rendered surface

**Seven leads partition this list.** Nothing outside it is rendered without a lead ruling that it
should be and saying why. Every row cites what puts it there. Rows marked **[does not exist]** are
the work; rows marked **[nothing]** are deliberate absences you may not fill.

### World geometry — shipped and rendered today

| # | subject | what it is today | source |
|---|---|---|---|
| 1 | **Patch** | up to 640 per live bay per player. `Part` / `WedgePart`, four shapes, four heights 1.6–3.4, footprint 3, `Enum.Material.Grass`, `Color` from `tiers[].rgb`, `Anchored`, `CanCollide` false, `CastShadow` false | `patch`, `tiers`, `representation` |
| 2 | **Lane slab** | one `Part`, `Enum.Material.Slate`, top face at Y = 0, 122 wide × 144 → 3,024 long, grows inward, never shrinks | `representation.plot`, `plots` |
| 3 | **Plot boundary** | four `Part`s, `Transparency` 1, `CanQuery` false, `SmoothPlastic`, 20 studs tall. **Invisible by ruling** — `N7` and `social/02` need the sightline | `representation.plot-boundary`, `traversal` |
| 4 | **Spawn anchor** | an `Attachment`. No geometry, nothing rendered | `representation.spawn-anchor` |
| 5 | **Tool** | a `Model` of two `Part`s welded to `RightHand`: handle 0.3 × 0.3 × 1.4, head `headWidth` × 0.2 × 0.6, `headWidth` from effective radius. **`Colour`, `Material` and `Transparency` are deliberately unset** — `game/src/server/Tool.luau:211`: *"no key states them"* | `tool`, `representation.tool` |
| 6 | **Player character** | the player's own unmodified Roblox avatar, platform nameplate, no health bar | `theme/identity/02`, `/03` |
| 7 | **Lobby baseplate** | 400 × 400 `Slate` part, colour `[0.404, 0.353, 0.286]`, shipped in `game/default.project.json`. Nothing parents to it and **`architect/04-tree` forbids the build editing that file** | `game/default.project.json:28-60` |
| 8 | **Lighting state** | `Ambient [0.32,0.31,0.27]`, `OutdoorAmbient [0.45,0.43,0.38]`, `Brightness` 2, `ClockTime` 15.5, `GeographicLatitude` 20. Zero `Atmosphere`, zero `Clouds`, zero scripts touching `Lighting` | `game/default.project.json:62-79`, ratified by `theme/setting/03` |
| 9 | **Find** | **[nothing]** — *"A Find has no Instance at any point in its life."* Not a model, not a dropped object, not a marker | `representation.find` |

### World geometry the fiction requires and the build does not have

| # | subject | what requires it | status |
|---|---|---|---|
| 10 | **The built boundary — retaining wall uphill, low parapet on the open side** | `theme/setting/01`: *"The area boundary is built"*; `theme/setting/05` `P1` | **[does not exist]**. `representation.plot-boundary` is *"deliberately not a wall"* |
| 11 | **Two openings per part, always open** | `theme/setting/04` `W3`; `plots.openings` gives the count, axis and neighbour-sharing | **[does not exist]**. *"The openings are gaps in a WALL that does not exist yet"* — `representation` |
| 12 | **Paving, kerbs, steps, piers, vaulting** | `theme/setting/05` `P1` | **[does not exist]** |
| 13 | **The channel-and-basin network, dry** | `theme/setting/05` `P2` — *"the connective tissue that makes the parts one works"* | **[does not exist]** |
| 14 | **Fixed fittings and hand-cut mechanism, inert** | `theme/setting/05` `P3` | **[does not exist]** |
| 15 | **Litter layer over paving; no soil** | `theme/setting/05` `P6` | **[does not exist]** |
| 16 | **Weathering — stain, patina, softened arrises, worn tread; identical at every depth** | `theme/setting/05` `P7`; `theme/lore/01` `L4` | **[does not exist]** |
| 17 | **Open sky above the unroofed parts** | `theme/setting/05` `P8`; `theme/setting/03` `R3` — a backdrop, not a system | **[does not exist]**; no `Sky` instance ships |
| 18 | **Broadleaf canopy beyond the built edge, non-walkable** | `theme/setting/05` `P9` — **the only place any modelled motion is permitted** | **[does not exist]** |
| 19 | **Authored openings that light the vaulted parts at depths 2–3** | `theme/setting/03`: *"the openings in the construction are the instrument, which makes it authored geometry rather than a lighting value"* | **[does not exist]**; jointly Environment and `layout` |

### Effects

| # | subject | budget and channel | status |
|---|---|---|---|
| 20 | **Clear-away effect on a patch** (`B5` / `patchClear`) | `atPatch`, 80 ms acknowledgment, 250 ms payout, **gone by 0.4 s**, exactly one intensity forever, up to 8 clears/second | **[does not exist]** |
| 21 | **Find reveal** (`B1`) | `atPatch` + audio, **persists 2.5 s**, forbidden on `notice`, may not vary by set or by depth or by first/last | **[does not exist]**. The loudest moment in the game |
| 22 | **Set completion** (`B2`) | `notice` + audio **only** — no world channel. One cue for all four sets | **[does not exist]**; largely UI/UX's and Audio's |
| 23 | **Area completion** (`B3`) | audio and VFX, no modal, **`atPatch` forbidden** | **[does not exist]** |
| 24 | **Upgrade purchase** (`B4`) | `readout` + audio, **no VFX in the world** | **[nothing in this category]** |
| 25 | **Ambient particles, emitters, beams, trails** | `theme/setting/05` `A14` and criterion 2: **0** `ParticleEmitter`, `Beam`, `Trail`, `Fire`, `Smoke`, `Sparkles` as ambience; `A7` no glow; `D2`, `D5` | **[nothing]** |
| 26 | **Passage, area entry, plot construction cues** | `theme/setting/04`: *"No effect, sound, fade, camera move or transition may mark passage or mark entering a finished part"*; `theme/identity/03` forbids reusing a clear or completion cue on plot construction | **[nothing]** |
| 27 | **Fog, `Atmosphere`, vignette, colour grade post-effect, light flicker, moving shadow** | `N7`; `D2`; `theme/setting/03` `R1` | **[nothing]** |

### Interface — you own the skin, UI/UX owns the structure

| # | subject | who owns what |
|---|---|---|
| 28 | **The token tree** — `game/src/shared/Theme.luau`, generated by `ui-forge` from `generateTheme(ctx)` | **Yours entirely.** Currently `archetype: "cartoon-vibrant"`, `sourceTitle: "Pet Ascend Simulator"` |
| 29 | **HUD readouts** — six readouts and a progress bar, `hud-overlay`, `readoutStyle: "pill"`, `bar: "chunky"`, `ornament: { readoutTrim, barCap }` | Structure and grouping: UI/UX `composition`. Colour, type, ornament values, bar cap: yours |
| 30 | **Four pressables** — `Pressable_BUY1/2/3`, `Pressable_INDEX`, `TextButton`s | Geometry and touch floor: UI/UX `viewport`. Fill, stroke, type, and **the non-colour affordability channel** (`affordabilityByColourAlone: false`): yours |
| 31 | **`IndexSurface`** — four labelled groups × six slots, empty slots visible and unmarked, `modal-grid` | Hierarchy and states: UI/UX `screens`. Panel art, slot treatment, set-heading typography: yours |
| 32 | **Icons** — `hud.brief.json` names `icon: "find"` and `icon: "shard"` | Yours. `budgets`: *"UI icons are UI/UX's, are not counted against `graphicsTextureMB`, and are the only image assets in the build"* — **and no count or size ceiling is stated anywhere.** See G10 |
| 33 | **Fonts** — `fantasy-ornate` resolves `fontStack: 'serif-ui'` → `Merriweather` / `SourceSans` / `MerriweatherBold`. Shipped today: `FredokaOne` / `Gotham` from `cartoon-vibrant` | Yours |

### Not ours, listed so no lead treats them as free space

34. **Store icon, thumbnail and key art** — Discovery & Marketing, wave 7. `theme/setting/03` binds
    them anyway: every promotional image is at the one hour. `theme/identity/04` row 9: no mascot.
35. **Nameplates** — `theme/identity/03`, ruled and not reopened.
36. **Cluster geometry, touch targets, safe areas, on-screen copy** — UI/UX `composition`,
    `viewport`, `screens`.
37. **Audio in every channel** — the Audio category, this wave. Every beat you dress, they sound.

---

## Domain assignments

### 01 · Style Guide Lead → `cid/art/style/_lead.md`

**Key to propose:** `styleGuide` — the shared visual rules every other art domain resolves against:
the named world-side palette with its luma values, the closed list of `Enum.Material` values that
may appear at all, the silhouette and proportion language, the ornament definition, and the detail
budget expressed per subject class in parts and triangles.

**Latitude: wide on the rules, narrow on the values, because four of them already ship.** You are
the first domain in this category to write and the other six inherit you. You may not restate the
brief; you convert it into values other leads can cite by name.

Binding on you specifically:

- `theme/setting/01`, verbatim: *"**Warm pale limestone with a greyscale luma of at least 165**,
  dressed and weathered, never grey granite, white marble, red brick or dark basalt."* And:
  *"Art chooses the hue inside that bound."* The floor is *"at least 40 above the lightest tier
  green on disk (`Moss`, rgb `[104,142,76]`, luma 123)"* and the check is
  `theme/setting/01` criterion 3, run **once per part, not once per game** (`theme/setting/03`).
- `theme/setting/01`: *"**Ornament is carving, casting, dressed joints and pattern in paving.**
  No gilding, no gemstones, no iconography, no statuary of a person or a creature."* This is the
  approved narrowing of the brief's *"Relics must read as treasure"*, and `theme/lore/01`'s
  overrule (*"Art must not add gold, gilding or gemstones to compensate"*) is what narrowed it.
- `tiers` ships four shapes, four heights and four rgb values, and `rarity` makes the channel
  *"silhouette first, colour second"*. **You may state the rule; you may not restate the values,
  and you may not propose a fifth tier, a recolour, or a height change** — `N12` and
  `art/objects/01` criterion 3 both check it.
- `budgets`: three built-in materials today (`Grass`, `Slate`, `SmoothPlastic`), zero uploaded
  meshes, zero uploaded images in world geometry, `trianglesPerPatchBudget` 100 with all four tier
  shapes together in **≤ 400 triangles read one of each in an empty place**. If a shape overruns,
  *"the fix is a **shape swap** in `representation.patch.geometryByShape` or `tiers[].shape` — never
  an LOD"*.
- `00-CORE.md` *"content design is the primary creative work on this project, **not art**"*
  `[brief: binding]`. A style guide that requires an asset pipeline contradicts a binding line and
  `representation`'s *"no asset needs to be produced to build this game."*

**Genuinely open to you:** the stone's hue inside the luma band and the exact luma value; how many
distinct material/colour roles exist in the world at all and what each is called; the proportion and
scale language for built stone against a 120-stud lane and a 3-stud patch footprint; what "ornament"
means as a countable rule an environment sheet can be failed against; the detail budget split across
subjects; and **the biggest open question in this domain — whether a world-side token layer exists
at all.** `CLAUDE.md` binds *"arbitrary values enter through tokens, never as literals in a spec"*
and `ui-forge`'s token system implements it for UI only. World colour today is `tiers[].rgb` literals
in a gameplay key and a raw `Enum.Material` string in `patch.material`. **That is gap G3 and it is
yours to name, not to fix on your own authority.**

---

### 02 · Environment Lead → `cid/art/environment/_lead.md`

**Key to propose:** `environment` — named in `CLAUDE.md` as a key that should exist and does not:
*"a builder cannot build an environment from an adjective."* Per subject class in the closed
present roster: what it is made of, which material and palette role it takes, its part count and
placement rule relative to `layout.chunk` and `plots.bays`, and which of the four depth families it
varies with.

**Latitude: wide, and it is the largest body of work in this category.** Nothing in rows 10–19
exists. But the *roster* is closed before you start, which is unusual and is the point.

Binding on you specifically:

- `theme/setting/05`, verbatim and load-bearing: *"**the present column is the whole dressing list
  and it is closed.** Nothing outside `P1` to `P11` appears inside the built edge. Concretely
  forbidden and most likely to be reached for: props of any kind, rubble, banners and cloth, rope,
  torches and lamps, water of any kind, wet stone, statuary and relief figures, cut lettering, and
  any swaying or drifting element. **The one motion budget you have is `P9`'s canopy, beyond the
  edge.** Variance goes to weathering, pattern, litter and green quantity."*
- `theme/setting/04`, verbatim: *"an opening must read as construction that was always open — a gap
  where a channel runs through the wall, a stair run continuing past the parapet, a bay left open in
  a vault. **Never a doorway, an arch with a frame, a gateway, a pierced wall with fittings, or
  anything a hinge would belong to**"*, because `Hinge`, `Seal` and `Key` are live `Find` names and
  `A11`/`A12` guarantee nothing in this world opens.
- `theme/setting/04` also narrows your headline open item: *"A finished part is dressed identically
  to an unfinished one minus the green, so **there is no *restored* look to author** — which narrows
  `04-PRESENTATION.md`'s open item 'what restored looks like versus overgrown' to *the same stone,
  with and without plants on it*."* And `W1`: a finished part *"gains no marker, plaque, dressing,
  light, colour shift, sound, cue or state of any kind."*
- `theme/setting/03`: *"no part may be dressed as a different hour, and **depth may not read as
  darker or later**"*; and depth theming *"draws only on the present column, and no depth may
  introduce a thirteenth class. A deeper part is not a different kind of matter, only more green
  over the same twelve classes."*
- `theme/lore/01` `L4`: weathering *"reads identical at every depth"*.
- `N7`: the inter-plot sightline is protected. Whatever you build on the boundary rectangle **may
  not obstruct the segment between two neighbouring spawn points** — `social.maxCoPresenceSeparationStuds`
  is 128 and `plots.pitchStuds` is 122. `representation`: *"neither may be opened where there is
  nothing on the other side."*
- `budgets`: zero uploaded meshes and images in world geometry. Every part you add is
  `patchCount + 6` competing for `serverWorldInstanceCeiling` 12,000 at 16 players, already at 86%
  from patches alone. **Your part count is the number that matters and it is measured against a
  ceiling nobody has verified.**
- `representation.plot`, the line written for you: *"a finished bay **is** bare, holding ground and
  nothing else, so there is nothing to tear down and the ground invariant is the one that binds.
  **That changes the first time Art dresses a bay, and the rule acquires a subject then.**"* If your
  dressing lives in a bay rather than on the lane, you reopen `plots.liveGeometry.torndownBeyond`.
  Say so as a consequence; do not resolve it here.

**Genuinely open to you:** everything about how built stone is composed inside those bounds — the
wall and parapet section, the paving pattern, the channel network's run, the vaulting at depths 2–3
and the authored openings that light it, the canopy backdrop's form and its permitted motion, the
sky's treatment as a backdrop; how many of the twelve classes are realised as geometry versus as
colour and material variation on the slab; and **how dressing is distributed across `layout`'s
8 families × 16 variants**, which is the only lever the brief's *"Endless via shuffled authored
chunks"* `[brief: binding]` leaves for variety.

**What you may not do:** resize an area, move a patch, change a chunk footprint, or add a class.
Those are `depths`, `layout`, `plots` and `theme/setting/05`.

---

### 03 · Characters Lead → `cid/art/characters/_lead.md`

**Key to propose:** `characterArt` — and **the expected value is a set of explicit zeros with a
stated reason and a grep for each. That is an output, not an absence.**

**Latitude: almost none, and you are being told that rather than left to discover it.** Read this
assignment before you plan sheets; it will save you a wave.

The whole of your `owns` list from the graph, ruled elsewhere:

| your subject | ruled | by |
|---|---|---|
| player avatar treatment | *"The player wears their own saved Roblox avatar, unmodified. No global override, no provided character, no uniform, no granted accessory."* | `theme/identity/02` |
| NPC and enemy models | *"This game contains nine classes of entity: none of them."* | `theme/identity/04` |
| skins and cosmetics | *"Cosmetics-only was offered and declined as needing a display system first"* `03-META.md` `[brief: soft]`; `theme/setting/05` `A13` removes the placement home | brief + `theme/setting/05` |
| animation style | `tool.animates` is false, `tool.particleEmitters` is 0, and the **only** `Humanoid` property any module writes is `WalkSpeed` (`response.humanoidWritesAllowed`) | `tool`, `response`, `representation` |
| rig constraints | the rig is the platform's and is not overridden | `theme/identity/02` |

What is nonetheless genuinely yours, and it is not nothing:

1. **State the zeros as data a verifier can check.** `theme/identity/02` criterion 3 already gives
   you the form: zero `HumanoidDescription`, zero `ApplyDescription`, zero
   `LoadCharacterWithHumanoidDescription`, no `StarterPlayer` appearance override, no
   `modules[]` entry that dresses a body. Your key makes that a merged fact instead of a sheet
   somebody has to remember.
2. **The one positive requirement anybody placed on a body.** `theme/identity/03`: *"the only
   requirement this sheet places on a body is that a stranger read as **a person and not a prop**.
   Twelve silent unlabelled figures…"* — and it hands the visual half to you by name. What makes an
   unmodified avatar at 122 studs read as a person rather than a prop, given nameplates are platform
   default and the health bar is off, is a real question and it is yours.
3. **The avatar-scale defect you inherit.** `theme/identity/02` records that a clear radius derived
   from a character's bounding box *"hands the tallest avatar a free permanent upgrade"*, and marks
   the underlying fact `[unverified — settled by fetching creator-docs/characters/appearance.md on
   body scaling]`. Name it; do not fix it — the radius is `movement`'s.
4. **Say plainly that there is no cast**, so verification reads it as a conclusion and the wave-7
   Discovery lead does not commission a mascot. `theme/identity/04` row 9 already forbids one.

**Do not** propose a provided character, a uniform, an accessory, a companion, an idle animation or
a cosmetic ladder. Each has a named refusal with a stated reopening condition that has not occurred,
and reopening `theme/identity/04` requires a developer-authored artifact, not an art argument.

---

### 04 · Objects Lead → `cid/art/objects/_lead.md`

**Key to propose:** `objectArt`. **`cid/art/objects/01-patch-footprint.md` already exists, supplies
the `patch` key, and the shipped game reads it. Index it at `01` and plan only the gaps. Do not plan
a rewrite** — rewriting it breaks a running build.

**Latitude: narrow on the patch, real on the tool, and one genuinely undecided question that is the
sharpest thing in this category.**

Binding on you specifically:

- Your own `01`: footprint 3, `collides` false, material `Grass`. Its criteria: footprint plus base
  clear radius under minimum spacing; no `CanCollide`; four distinct tier heights. `N13` forbids
  making a patch collidable, touchable or queryable; `N12` forbids writing `.Size` on a patch after
  creation.
- `representation.patch.geometryByShape` is exhaustive and it exists because a builder got it wrong
  once: a Roblox `Cylinder`'s axis runs along local X (Fern is `Vector3.new(2.4, 3, 3)` at
  `Orientation (0,0,90)`); a `Ball`'s diameter is the *smallest* Size component (Bramble is 2.8
  cubed); `Enum.PartType` **has no `Wedge` member** and Heartvine is a `WedgePart`. **Anything you
  say about foliage form must survive those four rows.**
- `01`'s own `Not decided here` line — *"The foliage models themselves"* — is now bounded by
  `representation`'s closing note: *"If Art later specs actual foliage meshes, `patch.kind` becomes
  `mesh`, this contract starts requiring an asset per tier, and the build blocks until four assets
  exist."* Plus `N17` and `budgets.textureCeilings` (`uploadedMeshAssetsInWorldGeometry: 0`).
  **Speccing meshes is a decision with a stated price. If you take it, state the price.**
- `theme/setting/05` `P3`/`P4`, the boundary handed to you by name: *"the fixed-or-loose rule is
  yours to hold. A fitting modelled into the building is `P3` and must read as fixed; anything loose
  must be a `Find`. Marks and figures **on** a `Find` are yours."*
- `theme/setting/01`: *"the 24 Finds are the fittings and instruments of a water-and-record works, so
  their material register is dressed stone, fired clay, cast bronze, worked wood and cut gearwork.
  `Orrery` sets the technology ceiling: gears cut by hand are in, anything powered is out."*
- `tool`: `appearanceChannel` is `headWidth`, `changesWithAxes` is `["radius"]`,
  `unaffectedByAxes` is `["value", "speed"]`. Base 1.2 studs, +0.35 per equivalent Reach level.
  The brief's *"**Feel:** reach is the primary sensation — a wider tool must visibly sweep more per
  step"* `[I assumed]` → `[brief: soft]` is what that channel serves. `tool.premiumVariantAllowed`
  is true and **there is no variant in this build**; `products.F19` forbids naming or showing a
  product on any in-game surface.
- **The live defect you inherit:** `game/src/server/Tool.luau:211` — *"Colour, Material and
  Transparency are deliberately NOT set: no key states them"*. Two `Part`s in every player's hand
  render at engine defaults. **That is gap G7 and your key should close it.**
- `rarity.forbidden`: no rarity colour, frame, glow, border, sparkle or badge **on a Find**, and
  `perObjectVisualGrade` is false for the `find-set` ladder — the four set headings on the
  collection surface are the only place set rarity is legible **anywhere in the game**.

**The question that is genuinely open and genuinely hard — rule on it, do not skip it:**
**does a Find have any rendered or icon form at all?** Three approved facts collide.
`representation.find` says *"A Find has no Instance at any point in its life"* and `class: null`.
`gameplay/meta/02`'s consequence line says *"Art — Objects owes 24 models, and each must read at
icon size in a grid"* — written in wave 3, **before** `architect/06` ruled. And `modal-grid`'s
content contract requires `name`, `price` **and** `art` on every item
(`ui-forge/src/compose/patterns/modal-grid.mjs`), which `cid/ui-ux/_category.md` already flags as
*"not obviously satisfiable by an unfound slot"*. Your `does_not_own` names *icon renders* as yours.
**Answer it against the compiler and against `representation`, with UI Art, and say which of the
three lines is stale.** This is gap G6.

**Genuinely open to you:** the four foliage forms within their shipped shapes, heights and footprint;
the tool's two parts' colour, material and proportion; the material register and read-at-icon-size
rule for the 24 Finds if any form exists; the fixed-versus-loose visual rule; and whether the patch
stays a primitive or acquires a mesh, with its stated cost.

---

### 05 · VFX Lead → `cid/art/vfx/_lead.md`

**Key to propose:** `effects` — per beat: what fires, on which channel, what it is made of, its
lifetime, its instance and emitter cost, and the closed list of effect classes permitted to exist
at all.

**Latitude: narrow in kind, wide in craft, and you carry half the game's feedback load.** The brief
binds *"audio and visual feedback carry the entire feedback load"* `[brief: binding]` on the
instruction, and the other half is Audio's, this wave.

Binding on you specifically:

- `response`, verbatim and stated as your entire interface: *"whatever the clear is made of must be
  gone from the patch position inside the residue lifetime, and whatever the reveal is made of must
  persist for the dwell. **Those two numbers are the entire interface between this sheet and
  yours.**"* — `residueLifetimeSeconds` **0.4** and `dwellSeconds` **2.5**, both with test ranges.
  Its criterion 2 is a check on you: *"An ordinary clear leaves zero objects at the patch position
  0.4 s after it fires; a reveal leaves exactly one, for 2.5 s."*
- `response` channel exclusivity: `atPatch` belongs to `findReveal`; `areaComplete` is **forbidden**
  on `atPatch`; `upgradePurchased` has **no world channel at all** (`theme/tone/03` `B4`: *"audio and
  UI only, no VFX in the world"*).
- `theme/tone/03` `B5`: *"Exactly one intensity, every time, forever. No streak escalation, no combo,
  no rising pitch ladder, **no crescendo near completion**."* `B1`: *"Not amplified for the first one
  ever, not amplified for the last one, not amplified by depth or rarity of the Find."*
  Its checkable form: *"No cue's intensity is a function of progress, streak, count, elapsed time,
  or depth"* — **zero cue parameters read those inputs.**
- `theme/tone/03`'s forbidden peaks, which are the ones you would reach for: entering or leaving an
  area, time passing or idling, returning after an absence, another player's reveal, a duplicate
  Find, **and the approach to a completion** — *"the load-bearing one. A ramp is tension."*
- `rarity.forbidden` bans *"a reveal cue that varies by which set the Find belongs to"*. One reveal
  cue, reused 24 times, and it must survive repetition.
- `theme/tone/04` `D5`: no confetti, fireworks, camera shake, full-screen flash, slow motion, freeze
  frame, radial speed lines, chromatic aberration. `D2`: no light flicker, moving or animated shadow,
  darkening pulse, screen vignette, fog volume, dust motes.
- `theme/setting/05` `A14` and its criterion 2: **zero** `ParticleEmitter`, `Beam`, `Trail`, `Fire`,
  `Smoke` or `Sparkles` **as ambience**, zero looping tween on any instance in a plot, zero
  `PointLight`/`SpotLight`/`SurfaceLight`. `A7`: no glow, no luminous plant or stone. Its
  carve-out, stated for you: *"The clear-away effect on a patch is a player-caused event and is not
  ambient motion, so `A14` does not reach it."* `theme/setting/03` restates it: *"no effect may fire
  because time passed, and no idle, loop or attract animation exists anywhere in the place."*
- `theme/setting/04`: *"No effect, sound, fade, camera move or transition may mark passage or mark
  entering a finished part"*, and `theme/identity/03`'s rule that a clear or completion cue *"may not
  be reused on plot construction"* — which now fires 3–7 times a session rather than on joins only.
- `N15`, `N16`: nothing may take control during a build; nothing may stagger, fade, tween or animate
  patches into existence in a way another client can observe.
- `budgets`: zero uploaded image assets in world geometry. **A `ParticleEmitter` with a texture is an
  uploaded image asset.** `graphicsTextureMB` is 60 and `uploadedImageAssetsInWorldGeometry` is 0.
  At 8 clears/second × 16 players against a 1,000 draw-call ceiling and an unmeasured batching
  factor, **an emitter per clear is a budget decision, not a taste decision.**

**Genuinely open to you:** what a clear is made of within 0.4 s and what a reveal is made of within
2.5 s; whether either uses an emitter, a tween on a primitive, a scale-and-fade of the patch part
itself, or something with no Instance at all; how `areaComplete` reads as VFX given it may not touch
`atPatch` and may not be a modal; the effect-intensity budget as data; and **whether any
`ParticleEmitter` is permitted to exist in this game at all** — nobody has ruled it, `A14` reaches
only ambience, and `budgets` forbids the texture rather than the class. That is gap G8.

---

### 06 · Lighting Lead → `cid/art/lighting/_lead.md`

**Key to propose:** `lighting` — the one lighting state as values a build can set, plus the rule
that there is exactly one and where it is set from.

**Latitude: bounded to a single state by an approved sheet, and that is the assignment, not a
frustration.** `theme/setting/03` spent four independent arguments closing this and states its own
reversal cost.

Binding on you specifically:

- `theme/setting/03` `R1`: *"**One hour, and it never advances.** The game has a single lighting
  state. No dawn, dusk, night, sunset, moonrise or second hour exists anywhere in it, at any depth,
  on any screen, in any promotional image."* Check: *"count of distinct lighting states the game can
  be in: **1**."*
- `R2`: *"**No weather, ever, as a depicted event.**"* `R3`: *"**The sky is a backdrop, not a
  system.**"* Zero `Clouds`; zero moon/star/low-sun sky textures.
- `theme/setting/03`, addressed to you by name: *"**you have one lighting state and the values on
  disk are ratified.** Do not add a second. The luma floor is the binding requirement and it must be
  met **at this one hour in every part, including the vaulted ones** — the check is
  `01-the-ruin`'s criterion 3 run once per part, not once per game. **You may not solve a dim vault
  by moving the sun**: the openings in the construction are the instrument, which makes it authored
  geometry rather than a lighting value. No `Atmosphere`, no `Clouds`, no moon or star texture, no
  sky whose sun sits near a horizon. **Everything about hue, angle and intensity inside the band
  stays yours.**"*
- The shipped values are ratified with **zero changes requested**: `ClockTime` 15.5,
  `GeographicLatitude` 20, `Brightness` 2, `Ambient [0.32,0.31,0.27]`,
  `OutdoorAmbient [0.45,0.43,0.38]`, zero `Atmosphere`, zero `Clouds`, zero scripts touching
  `Lighting` (`game/default.project.json:62-79`).
- `N7`: no fog, `Atmosphere` or occlusion that obstructs the spawn-to-spawn sightline; check is
  `grep -rn "Atmosphere\|FogEnd\|FogStart" game/src` returns nothing.
- `D2`: no light flicker, no moving or animated shadow, no darkening pulse on any event, no vignette.
- `A7`: *"**No light source but daylight.** No fire, torch, lamp, lantern, candle, brazier, ember,
  glow, or luminous plant or stone."* `theme/setting/05` criterion 2: **0** `PointLight`,
  `SpotLight` or `SurfaceLight` instances.
- `budgets`: patches ship `CastShadow` false — *"up to 640 per lane times the player count, and
  shadows are the cheapest thing to give up"*. Shadow settings that would reintroduce that cost are
  a budget decision against an unmeasured ceiling.
- Your `does_not_own` from the graph: lighting performance budgets (Tech & Data — Performance).

**Genuinely open to you:** the hue, angle, intensity, ambient and shadow values inside the daylight
band; whether the shipped five values are the right five inside it and what would move them; how the
luma ≥ 165 floor is *verified* per part rather than asserted, and by what instrument; and the
per-part-constant-hour relaxation `theme/setting/03` pre-authorised as escalation step 3 —
*"different parts may sit at different hours inside the daylight band, chosen on arrival and
unchanged for the whole lap, uncorrelated with depth"* — which **you may name as available and may
not take**, because taking it revises that sheet's criterion 1.

**The seam problem you must state:** every lighting value in this game lives in
`game/default.project.json`, and `architect/04-tree` makes that *"the one file `tree` forbids this
build from touching"*. `theme/setting/03` also requires **zero** code paths writing `Lighting`
properties after initialisation. So a `lighting` key has no emitter and no writer today. The route
already exists and is precedented: `tech/performance/01` `RR-P2` added `workspaceStreaming` to
`architect/01-runtime.placeConfiguration` as a publish-time entry with a boot assertion. **Follow
that route as a revision request; do not invent a lighting module.** This is gap G1.

---

### 07 · UI Art Lead → `cid/art/ui/_lead.md`

**Key to propose:** `uiTheme` — the `artDirection` block `generateTheme` consumes: the archetype
key, every `tokenOverrides` path with its value and its reason, every additive `tokens` group, and
the icon inventory. It is the one key in this category that a build step already knows how to read.

**Latitude: wide, and this domain closes the most directly observed defect in the project.**

**The live defect, stated first because it is not in doubt.** `game/src/shared/Theme.luau` — the
generated token table every HUD readout, every pressable and the index panel resolve through — is:

```
archetype = "cartoon-vibrant"
archetypeLabel = "Cartoon Vibrant"
sourceTitle = "Pet Ascend Simulator"
genre = "simulator"
juice = "high"
surface.base = "#2B1B4D"   accent.primary = "#FFC53D"   accent.tertiary = "#FF5E9C"
type.*.font = FredokaOne / GothamBold
```

Against a brief line that names `fantasy-ornate` and argues against `cartoon-vibrant` **by name**:
*"An ancient ruin in candy colours loses the discovery mood."* The playtest's own words for the
result were *"big purple boxes"*. `ARCHETYPES['fantasy-ornate']` already exists, complete, at
`ui-forge/src/theme/palettes.mjs:75-88` — warm parchment surfaces `#2E2419`/`#3D3123`, gold accent
`#D4A34A`, `serif-ui` fonts, `radiusScale` 0.6, `strokeWeight` 2/4. **Nothing had to be designed for
this to be right and it is wrong anyway, because no contract key owns which archetype is emitted.**
That is gap G2 and it is the first thing your key should fix.

Binding on you specifically:

- `CLAUDE.md`, the architectural rule: *"**Arbitrary values enter through tokens, never as literals
  in a spec.** 'Make it pink' overrides `color.accent.primary`. This is what keeps reskin working."*
  `generateTheme` implements exactly two legal routes: `artDirection.tokenOverrides` (dotted path,
  **throws on an unknown path**, so a typo cannot silently no-op) and `artDirection.tokens`
  (additive groups, for a vocabulary the system does not have). **Your key must be expressed in
  those two shapes or it cannot reach the build.**
- The pattern registry is the capability contract. `validateBrief` rejects any brief naming a
  parameter outside the declared space (`ui-forge/src/compose/index.mjs:44-76`). Your ornament
  vocabulary is exactly: `modal-grid` — `cardBadge` none/ribbon/pill, `panelTrim` none/top-accent;
  `hud-overlay` — `readoutTrim` none/accent-edge, `barCap` flat/round. **Anything outside those
  tables is not producible and is a finding, not a spec.**
- `vocabulary`: `casing: "title"`, `maxLabelChars: 14`. `hud.brief.json` currently ships `FINDS`,
  `SHARDS`, `VALUE`, `REACH`, `PACE` and a 23-character `"EAST TERRACE - 0% CLEAR"`. **Whether a
  label class renders its stored title case as uppercase is handed to UI/UX explicitly**
  (`theme/vocabulary/01`); the *typeface, weight and tracking that make either legible* are yours.
- `input.pressable.affordabilityByColourAlone: false` and the general rule from the accessibility
  constraint: **no state distinction may be carried by colour alone.** The shipped code invented
  `" Buy"` / `" Need"` / `"Max"` suffixes as the second channel, marked `[STOP: no value in the
  contract]`. The words are UI/UX's (gap G8 in their brief); **the non-colour visual channel is
  yours.**
- `theme/tone/04` `D6` (no pulsing or blinking element, no red alert state), `D8` (no padlock icon,
  no strikethrough on anything obtainable), `D11` (no silhouette, blurred model, greyed name or
  question-mark icon for an unrevealed Find), `D13` (no face, eyes or mouth on any icon).
- `rarity.forbidden` reaches your surface: no rarity colour, frame, glow, border, sparkle or badge on
  a Find. `representation.index-surface`: *"A held name reads as its name; an unfound name reads as
  an empty slot. **NOTHING ELSE.**"*
- `products.F19`: no in-game surface names, shows or prices a product. There is no store to skin.
- `budgets`: *"UI icons are UI/UX's, are not counted against `graphicsTextureMB`, and are the **only
  image assets in the build**."* `hud.brief.json` names two: `icon: "find"` and `icon: "shard"`.
- Your `does_not_own`: cluster geometry and grouping (UI/UX `composition`), touch-target size and
  safe areas (UI/UX `viewport`), screen inventory, hierarchy, states and copy (UI/UX `screens`),
  notice behaviour (UI/UX `notices`). **They decide what is on screen and how it behaves; you decide
  what it is made of.**

**Genuinely open to you:** which archetype ships and whether any of its tokens are overridden for
this game (and every override needs a reason, because an unreasoned override is the literal the
token system exists to prevent); whether a world-facing token group is added additively so the HUD's
palette and the stone's palette are one system rather than two; the two icons' form at phone size
against `D13`; the ornament parameter values inside the declared space; the type ramp given
`typeScaleFor('8-14')` already applies a 1.06 factor; and the second, non-colour affordability
channel.

---

## Domains judged thin for this game, and why that is stated rather than silent

**None is absent. All seven run and all seven produce a key.**

- **Characters — the thinnest domain in this wave, and thin by four separate approved rulings, not
  by neglect.** The player wears their own unmodified avatar; there is no cast; cosmetics were
  declined by the brief; the only `Humanoid` write in the game is `WalkSpeed`. Its graph `owns` list
  is five items and four are ruled to zero elsewhere. **It runs because "there is no cast, no skin,
  no override and no animation, here are the greps that prove it, and here is the one positive
  requirement `theme/identity/03` left me" is data a build and a verifier can read.** Verification
  should read a `characterArt` key that is mostly explicit zeros as a deliberate conclusion, not a
  gap. It should **not** be given a second sheet to fill.
- **Lighting — one state, ratified, with zero changes requested.** `theme/setting/03` closed the hour,
  the sky and the weather with four independent arguments and pre-authorised its own escalation
  order. What survives is real: the hue/angle/intensity values inside the band, the per-part luma
  verification method, and the fact that no key, module or emitter currently owns a `Lighting`
  property at all. Two sheets at most.
- **VFX — narrow in kind and load-bearing in craft.** Two of five beats forbid a world cue outright,
  ambient effects are zero by ruling, and the whole `D5`/`D2` vocabulary is banned. What is left is
  two effects — a clear and a reveal — that between them carry, with Audio, *"the entire feedback
  load"*. That is thin as an inventory and central as a job.
- **Objects — bounded above by a shipped key and below by `representation`.** One of its sheets
  already exists and ships. The patch's shape, height, footprint, material and colour are all
  decided. What remains is the tool's unset appearance, the fixed-versus-loose rule, and the Find-form
  question — the last of which is the sharpest open question in this category.
- **Style Guide, Environment and UI Art are not thin.** Environment is the largest body of unbuilt
  work in the project; UI Art closes the one defect the developer actually saw; Style Guide is the
  domain the other six cite.

**One subject is priority-3 by construction and is named here so nobody looks for it:** there is no
seasonal, event, weather or time-of-day visual channel in this game, so there is nothing for a
seasonal art pass to attach to. `theme/setting/03` states it as a consequence for Live Ops:
*"there is no hour, weather or season channel to run anything through."*

---

## Gaps in the brief this category hit

Passed upward, not filled. Each names the domain that will have to decide it.

| # | gap | who decides |
|---|---|---|
| G1 | **No key, module or emitter owns a `Lighting` property.** Every value ships in `game/default.project.json`, which `architect/04-tree` forbids the build from editing, and `theme/setting/03` requires zero code paths writing `Lighting` after init. A `lighting` key has no writer. The precedent is `RR-P2`'s `placeConfiguration` entry. | **Lighting**, as a revision request against `architect/01-runtime` |
| G2 | **The shipped UI theme is the wrong archetype and no key owns which one is emitted.** `game/src/shared/Theme.luau` is `cartoon-vibrant` / *"Pet Ascend Simulator"* against a brief that names `fantasy-ornate` and argues against `cartoon-vibrant` by name. Nothing in either contract produces `Theme.luau`, and `architect/06` records that *"no module in this build order owns `ui-forge`'s briefs."* | **UI Art** (`uiTheme`); the emitter's owner is a cross-category question |
| G3 | **No token layer exists for anything rendered in the world.** `CLAUDE.md` binds *"arbitrary values enter through tokens, never as literals in a spec"*, and `generateTheme` implements it for UI only. World colour is `tiers[].rgb` literals inside a gameplay key; world material is a raw `Enum.Material` string in `patch.material`; the lobby baseplate's colour is a literal in a project file. Whether these become tokens, and who then owns `tiers[].rgb`, is unresolved. | **Style Guide** to name; the seam owner to rule |
| G4 | **Every ceiling this category is budgeted against is `[playtest unknown]`, and the batching factor (1–500) decides whether the merged design is renderable at all.** Nobody owns taking a render-stats reading on a device; `tech/performance/01` names the same hole from its side. If the factor is below 10 the lever is `depths.areas[].patchCount`, which is not an art decision. | relayed to all seven; the instrument's owner is named for the final cross-category pass |
| G5 | **The wall the fiction requires does not exist, and dressing a bay reopens a settled rule.** `theme/setting/04` `W3` obliges every part to carry two openings and `plots.openings` gives their count and axis, but `representation.plot-boundary` is *"deliberately not a wall"*. Separately, `representation.plot` states that a finished bay holding only ground is what makes the tear-down rule a no-op, and *"that changes the first time Art dresses a bay."* | **Environment**; the tear-down consequence routes to `plots` |
| G6 | **Three approved sources disagree about whether a Find has a form.** `representation.find` says no Instance ever; `gameplay/meta/02` says *"Art — Objects owes 24 models"*; `modal-grid` requires `art` on every item. One of the three is stale and nobody has said which. | **Objects** with **UI Art**; `gameplay/meta` if a revision is needed |
| G7 | **The tool's `Colour`, `Material` and `Transparency` are unset in shipped code because no key states them** (`game/src/server/Tool.luau:211`). Two parts in every player's hand render at engine defaults. | **Objects** (`objectArt`) |
| G8 | **Nobody has ruled whether a `ParticleEmitter` may exist in this game at all.** `theme/setting/05` `A14` reaches ambience only; `budgets` forbids the *texture*, not the class; `theme/tone/04` bans specific effects, not the mechanism. At 8 clears/second × 16 players this is a budget question with no owner. | **VFX** (`effects`) |
| G9 | **The brief inventories nothing about how the world looks, and ten world facts were decided by wave-1 sheets against zero input.** `theme/setting/05`: *"No sheet in six mentions water, sky, wind, weather, light, wear, debris, furniture, roads or remains, present or absent… every `[cid: decided]` row above answers a question nobody asked."* `theme/setting/03` says the same of the hour and the weather, and notes the interview skill has since grown the question. **This category inherits ten `[cid: decided]` absences and must not re-decide them silently.** | relayed; each carries a stated reversal cost and a developer flag already |
| G10 | **`budgets` states that UI icons are the only image assets in the build and sets no ceiling on them** — no count, no dimension, no memory figure, and they are explicitly *not* counted against `graphicsTextureMB`. | **UI Art** to propose; **Tech — Performance** to ratify |
| G11 | **No device floor exists in the brief**, and the one citation of one in the merged contract (`cid/gameplay/meta/01-the-area.md:39`) cites two *simulated* test briefs. `RR-P1` strikes it and is not yet applied. Every ceiling this category inherits derives from `budgets.deviceFloor`, which is `[cid: decided]` and flagged for a developer ruling. | relayed; **the developer** rules, **Tech — Performance** owns the field |
| G12 | **`theme/vocabulary/04` makes every UI string a renderable coinage with no contract path, and notes the ` ```coinage ` parser may not exist in `bridge/merge.mjs`.** An icon's accessible name and any art-facing label hit the same wall. | **UI Art** to file its own; **UI/UX — Screens** coordinates |
