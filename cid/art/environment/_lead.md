# Environment — domain index

**Category:** Art & Visuals · **Wave:** 6 · Reads: `concept/spec/incremental-spinoff-v2/` —
`HANDOFF.md`, `CONCEPT.md`, `00-CORE.md`, `01-FOUNDATION.md`, `03-META.md`, `04-PRESENTATION.md`,
`OPEN.md`; `cid/art/_category.md`; `cid/_contract.md`, `cid/_state.md`, `cid/_playtest.md`,
`cid/_digest.md` (indexed, not read whole); `cid/theme/setting/01`, `/02`, `/03`, `/04`, `/05`;
`cid/gameplay/meta/04`, `/05`, `/06`, `/07`; `cid/tech/performance/01`, `/03`;
`game/src/server/Plots.luau`, `game/src/shared/GameConfig.luau`, `game/default.project.json`,
`bridge/schema.mjs`.

**Nothing in rows 10–19 of the category's rendered surface exists.** The world today is one
`Slate` slab per player, up to 640 anchored patches on it, four invisible boundary parts and a
400 × 400 lobby baseplate nothing parents to. The developer's whole verdict on it is *"I can play
and walk around, but nothing really looks good."*

---

## What the brief gave me

Every line the source states about the look of the world. It is short, and that is the finding.

| quoted | tag |
|---|---|
| *"**`ui-forge` vibe key: `fantasy-ornate`** … In words: ornamented, warm, aged, crafted. **Stone and foliage, not candy.**"* `04-PRESENTATION.md` | `[brief: soft]` ← `[you accepted: R6 Q2 → R5 Q2]` |
| *"**Tone note:** warm and unhurried, not spooky. This is reclamation, not a haunted place."* `04-PRESENTATION.md`; *"**Tone: warm, aged, unhurried.**"* `01-FOUNDATION.md` | `[brief: soft]` ×2 |
| *"**Green overgrowth on warm stone is naturally high-contrast**, so rarity tiers stay legible — a real problem the v1 spec hit with white snow."* `04-PRESENTATION.md` | `[brief: soft]` |
| *"Left open — … what 'restored' looks like versus 'overgrown', and **the depth-themed chunk looks**."* `04-PRESENTATION.md`; `OPEN.md §4` routes the same to Art & Visuals | `[brief: soft]` |
| *"**Endless via shuffled authored chunks**, not generation."* `03-META.md` | `[brief: binding]` ← `[you chose: R5 Q1]` |
| *"**Cleared is permanent — overgrowth never returns.** This is the payoff and it is load-bearing."* `01-FOUNDATION.md` | `[brief: binding]` ← `[you chose: R2 Q1]` |
| *"**8–14, mobile-heavy, short sessions.**"* / *"~70% mobile"* `00-CORE.md` | `[brief: binding]` on the band; `[brief: soft]` on the split |
| *"Target: the **smallest game that still gives every creative area real work.**"* `00-CORE.md` | `[brief: binding]` ← `[you chose: R1 Q3]` |
| *"**Consequence downstream:** content design is the primary creative work on this project, **not art**."* `00-CORE.md` | `[brief: binding]` ← `[you chose: R1 Q1]` |
| *"**Tension is zero by design** … **Do not invent tension to fill the gap.**"* `HANDOFF.md` #4 | `[brief: binding]` on the instruction |
| Priority 3 — *"real procedural generation · rebirth · offline accrual · codes · daily rewards · leaderboards · trading · seasons and events"* `03-META.md` | `[brief: soft]` on provenance, **hard as a gate** |

**That is the entire brief on my subject.** Ten of the eleven rows above are register or scope; one
(*"the depth-themed chunk looks"*) is a subject handed forward with nothing said about it.

### What approved keys and sheets fixed before I started

Not brief, not mine, and not re-openable here. Cited so the writer resolves against the field and
never against a number copied into this index.

- **The roster is closed.** `theme/setting/05` `P1`–`P12` / `A1`–`A25`: *"the present column is the
  whole dressing list and it is closed. Nothing outside `P1` to `P11` appears inside the built
  edge."* Twelve classes, twenty-five stated absences, ten of them that sheet's own
  `[cid: decided]`. **The one motion budget in the game is `P9`'s canopy, beyond the built edge.**
- **The stone.** `theme/setting/01`: warm pale limestone, **Rec.601 luma ≥ 165**, never grey
  granite, white marble, red brick or dark basalt; *"Ornament is carving, casting, dressed joints
  and pattern in paving"* — no gilding, no gemstones, no iconography, no statuary. The check is that
  sheet's criterion 3, *run once per part, not once per game* (`theme/setting/03`).
- **One hour, one sky, no weather.** `theme/setting/03` `R1`–`R3`, shipped values ratified with zero
  changes requested. *"depth may not read as darker or later"*; *"you may not solve a dim vault by
  moving the sun"* — the openings in the construction are the instrument.
- **An opening is a gap, never a door.** `theme/setting/04` `W3`: *"a gap where a channel runs
  through the wall, a stair run continuing past the parapet, a bay left open in a vault. **Never a
  doorway, an arch with a frame, a gateway**"*. `W1`: a finished part *"gains no marker, plaque,
  dressing, light, colour shift, sound, cue or state of any kind"* — so **there is no *restored*
  look to author.**
- **Weathering is uniform at every depth** (`theme/lore/01` `L4`, `theme/setting/05` `P7`); only the
  quantity of green varies.
- **The geometry is not mine.** `depths` (8 areas, `patchCount` 140→640, `minSpacing` 6), `layout`
  (chunk 120 × 30, `edgeKeepoutStuds` 1.5, four families one per depth, `chunksPerFamily` 8 ×
  `orientations` 2 = `variantsPerFamily` 16), `plots` (lane 120 wide at 122 pitch, bays
  120→480 long, two openings per bay centred on X = 0, `barrierInOpening` false), `endgame`
  (post-terminal bays of 480 studs, added without bound). **Cite the field; wave 4 has not released
  and these have moved.**
- **The prohibitions.** `tech/performance/03` `N1`, `N2`, `N7`, `N12`, `N16`, `N17` reach my work
  directly; `N7` is the one that bites (see 02).
- **The register.** `vocabulary` (`casing` title, `maxLabelChars` 14, banned words including
  `relic`, `tier`, `treasure`) binds any player-facing string. **This domain expects to emit none.**

---

## What the brief did not give me

Required output. Each gap is routed to the sheet that will have to decide it; none is filled here.

| # | gap | routed to |
|---|---|---|
| E1 | **The brief inventories nothing about how the world looks.** `theme/setting/05`: *"No sheet in six mentions water, sky, wind, weather, light, wear, debris, furniture, roads or remains, present or absent… every `[cid: decided]` row above answers a question nobody asked."* I inherit ten `[cid: decided]` absences and re-decide none. | all five sheets, as an inheritance to cite rather than re-derive |
| E2 | **No token layer exists for anything rendered in the world** (category gap G3). `ui-forge`'s tokens are `color / space / radius / stroke / type / elevation / gradient / sizing` — UI only. There is no path for a `Part` colour, an `Enum.Material`, a `Lighting` property or a skybox. So every world value this domain emits is a literal, which is what `CLAUDE.md`'s token rule exists to prevent. | **01** — it must state the shape a world token group would need and emit its values as a *named closed vocabulary* rather than as scattered literals, so a later token layer has something to bind to. Style Guide names the same gap from its side; the seam's owner rules. |
| E3 | **Every ceiling this domain is budgeted against is `[playtest unknown]`, and nobody owns taking a reading.** `budgets.renderCeilings.batchingFactor` is 50 with a test range of 1–500; below ~10 the merged design is unrenderable before Environment adds one part, and the lever is `depths.areas[].patchCount`, not an art decision. | **01**, which must state its density at both ends and name what changes; the instrument's owner is a finding for the final cross-category pass |
| E4 | **The wall the fiction requires has no build-side existence, and `representation.plot-boundary` is *"deliberately not a wall"*.** `plots.openings` gives count, axis and neighbour-sharing; nothing anywhere gives a width, a section, a height or a material. `theme/setting/04`: *"The opening's width, hue, material, geometry and ornament"* is named as this domain's. | **02** |
| E5 | **`N7`'s check and a visible parapet are in direct conflict.** The check is *"every instance intersecting the segment between two neighbouring spawn points has `Transparency == 1`"*. That segment runs along +X at plot-local Z = 8 at roughly Y = 0.5 — ankle height — so **any** masonry between two lanes fails it, at any height. The requirement behind the check is that a neighbour's body and the ground they are clearing stay visible (`social/02` B2/B3). | **02**, which must rule and file the revision request against whichever of the two is wrong |
| E6 | **Dressing a bay reopens a settled rule.** `representation.plot`: *"a finished bay **is** bare … so there is nothing to tear down and the ground invariant is the one that binds. **That changes the first time Art dresses a bay, and the rule acquires a subject then.**"* `plots.liveGeometry.torndownBeyond` is a no-op today. Past bay 8, `endgame` adds 480-stud bays without bound, so *resident* dressing has no upper bound at all. | **01** decides the residency rule and states it as a consequence for `plots`; it does not resolve `plots` |
| E7 | **The ground's material is a hardcoded literal owned by no key.** `game/src/server/Plots.luau:534` sets `slab.Material = Enum.Material.Slate` directly — not from `GameConfig`, unlike every other number in that file. The lobby baseplate's colour `[0.404, 0.353, 0.286]` is likewise a literal in `game/default.project.json`, which `architect/04-tree` forbids the build from editing. | **03** |
| E8 | **Nobody has said whether depths 2–3 are roofed.** `theme/setting/02` asserts *"depths 2 and 3 inside vaulted structures"* and `theme/setting/03` requires the luma floor be met *"in every part, including the vaulted ones"*, with the openings as the instrument. No sheet says a roof exists as geometry, and a roof is the largest single object anyone could propose here. | **04** |
| E9 | **Nothing states what distinguishes one authored chunk from another.** `layout` owes *"32 chunk looks, 8 per depth kind"* and supplies no dimension of variation; `theme/setting/02` forbids fighting the repetition (*"Two parts of one kind are alike because one crew built them to one design"*); `theme/setting/05` sends variance to *"weathering, pattern, litter and green quantity"*. Green quantity is `depths`'. | **04** |
| E10 | **A `Sky` instance has no writer**, the same shape as category gap G1. Every `Lighting` value lives in `game/default.project.json`, which the build may not edit, and `theme/setting/03` requires zero code paths writing `Lighting` after init. Separately, six skybox faces are six uploaded image assets against `budgets.textureCeilings.uploadedImageAssetsInWorldGeometry: 0`. | **05**, as a revision request following `RR-P2`'s `placeConfiguration` precedent — not by inventing a module |
| E11 | **No count, dimension or memory ceiling exists for anything Environment adds.** `budgets` sizes the world as `patchCount + 6` per lane and stops; there is no `environmentInstancesPerLane` field anywhere. | **01**, which proposes it |
| E12 | **"Landmark design" is in my `owns` list and the answer is that there is none.** Recorded here so a later reader does not look for a sheet: `03-META.md` declined *"restoring one hero landmark"* as an objective; `theme/setting/02` forbids a summit, a final part, a vantage and anything on a skyline that is not this works; `A25` forbids map, plan, signpost, survey mark and boundary stone; `W1` forbids a finished part gaining a marker. **Assigned to no sheet.** `04` states the zero and spends the word *memorable* on authored chunk variety instead. | — |

**Not a gap, stated so it is not read as one:** *"what 'restored' looks like versus 'overgrown'"* is
already answered. `theme/setting/04` narrows it to *"the same stone, with and without plants on
it"*. There is no second look to author and no sheet is assigned to one.

---

## Why five sheets

**The contract holds 25 keys and none of them describes a place** — I read `cid/_contract.md` and
grepped `bridge/schema.mjs` for `environment` directly, because this session has no shell tool and
`npm run bridge -- --contract` could not be executed. So this domain owns **zero** merged keys and
proposes **five**, and the sheet count is the key count exactly.

The partition is by build consumer, not by subject heading. `environment` is the *law*: what world
matter may exist at all, in what quantity, and drawn from which closed vocabulary — the thing
`CLAUDE.md` meant by *"a builder cannot build an environment from an adjective."* The other four
each spend that allowance on one thing a different piece of the build reads: `builtEdge` and
`groundwork` are consumed by `Plots.luau` when a lane is built, `chunkDressing` by whatever authors
`layout`'s 4 families × 16 variants, and `backdrop` once for the whole place regardless of player
count. They fail differently too: the edge fails on the sightline and on passage, the ground fails
on the luma floor, the families fail on repetition and on the vault's light, the backdrop fails on
asset cost. **One sheet could not carry four failure modes and four revision owners, and five
sheets cannot share one key** — the merger rejects two sheets claiming one key, which is the reason
this is five keys rather than five blocks of one. If the schema's maintainer prefers a single
`environment` key, these are its five top-level blocks and no sheet's content changes.

I did **not** split further. Weathering, litter and ornament are properties carried by the class
list in 01 and spent in 02–04; each would have been a heading, not a decision. Palette values,
material roster, the luma number, the ornament definition and the per-class detail budget are
`styleGuide`'s and are resolved against, never restated.

| # | sheet | must decide |
|---|---|---|
| 01 | `world-part-budget` | Decide the closed list of world part classes and the closed vocabulary of exact (class, `Size`, `Material`, colour-role) tuples every world part must draw from, the resident instance allowance per lane and per place stated **separately at `budgets.renderCeilings.batchingFactor` 50 and at 1**, the residency rule naming which bays hold dressing at once, and how `theme/setting/05` `P7` weathering is realised with `uploadedImageAssetsInWorldGeometry` at 0 — supplying `environment`. |
| 02 | `the-built-edge` | Decide the part list, dimensions, positions and opening geometry of the low parapet on both long sides, the outward mouth wall, the inward retaining wall and the cross-wall standing at each bay boundary, and rule how visible masonry between two lanes coexists with `N7`'s check that every instance intersecting the spawn-to-spawn segment has `Transparency == 1` — supplying `builtEdge`. |
| 03 | `groundwork-and-channels` | Decide what the walkable surface is made of — the slab's material and colour role, the paving and kerb treatment, the dry channel-and-basin run as a per-bay part list, and the litter layer over paving — such that cleared stone holds Rec.601 luma ≥ 165 measured per part, and name the instrument that measures it — supplying `groundwork`. |
| 04 | `depth-families` | Decide what makes a Terrace, a Cistern, a Vault and a Spire four visibly different kinds of place inside one closed roster, one weathering and one hour: rule whether depths 2–3 are roofed and if so give the pier grid, span and the authored openings that light them to the luma floor, and state how dressing varies across `layout`'s 16 variants of each family — supplying `chunkDressing`. |
| 05 | `beyond-the-edge` | Decide the broadleaf canopy beyond the built edge as a part list with the parameters of its one permitted motion, and rule whether a `Sky` instance ships at all given six skybox faces are uploaded image assets and no key, module or emitter can write `Lighting` — supplying `backdrop`. |

### The arithmetic every sheet has to work inside

Handed here so five sheets do not each re-derive it. All of it is measured against ceilings marked
`[playtest unknown]` and every number is read by field, not copied forward.

- **A lane is `patchCount + 6` instances** (`budgets.instanceCeilings.laneInstanceFormula`). At the
  merged max `depths.areas[7..8].patchCount` = 640 that is 646; at `runtime.maxPlayers` 16 that is
  **10,336 against a `serverWorldInstanceCeiling` of 12,000 — 86%.** Everything this domain adds,
  for all sixteen players, fits in **1,664 instances: 104 per lane.**
- **The client ceiling is tighter.** `clientStreamedInstancesWorstCase` is 5,814 (nine lanes inside
  a 512-stud radius) against a `clientStreamedInstanceCeiling` of 6,000. **186 instances of
  headroom: 20 per lane.** That ceiling's own test range tops out at 10,000, which would give 465
  per lane — **a 23× swing in this domain's entire allowance, on a field nobody has measured.**
- **If dressing is resident in every bay**, a full eight-bay lane is `646 + 8D`, so `D ≤ 13` parts
  per bay at the server ceiling — 13 parts to dress up to 57,600 studs². Past bay 8, `endgame` adds
  480-stud bays without bound and no fixed `D` is legal. **That is the whole argument for a
  residency rule, and it is 01's to make.**
- **Draw calls are the unmeasured half.** At `batchingFactor` 50, patches cost ~117 of the 1,000
  ceiling and ~883 remain. At `batchingFactor` 1, patches alone cost 5,814 against 1,000 — the
  merged design breaches by 5.8× before Environment places one stone, no legal streaming radius
  fixes it, and `budgets` itself says *"The lever is then `depths.areas[].patchCount` and it is a
  finding against `depths`, not an optimisation request."*
- **So the density answer is a design rule, not a number.** Roblox documents batching for meshes
  sharing content and texture, and says nothing about primitives
  `[research: https://create.roblox.com/docs/performance-optimization/improve]`. Every world part
  drawing its `Size`, `Material` and `Color` from one short closed vocabulary costs at most one
  draw-call class per tuple if any batching exists, and at most its own part count if none does.
  **`environment.distinctDrawClasses` is then a statically countable number and the honest form of
  a set-dressing density.**
- **Two free savings, already sourced.** *"For parts that do not need collisions, disable their
  collisions by setting `BasePart.CanCollide`, `BasePart.CanTouch` and `BasePart.CanQuery` to
  false"*, and *"Use the `BasePart.CastShadow` property to disable shadow casting on small parts
  where shadows are unlikely to be visible"*
  `[research: https://create.roblox.com/docs/performance-optimization/improve]`. Also from the same
  page, and it is the sentence a set-dressing sheet should read twice: *"If a large number of
  objects are concentrated with a high density, then rendering this area of the scene requires more
  draw calls."*

### Five word checks run over every manifest string this domain writes

Not prose — `manifest` values and `artPrompt` values. A writer who does not know these will fail
verification on words that are otherwise the natural ones for this subject.

| source | tokens that will bite an environment sheet |
|---|---|
| `theme/setting/05` c3 | `rubble`, `debris`, `puddle`, `fountain`, `rope`, `lamp`, `lantern`, `torch`, `statue`, `inscription`, `lever`, `valve` |
| `theme/setting/02` c1 | `descend`, `underground`, `subterranean`, `cavern`, `sunken`, `summit`, `peak`, `topmost`, `last area` |
| `theme/setting/03` c4 (`RW`) | `weather` **whole-word only** — `weathered` and `weathering` are required vocabulary; also `glow`, `shimmer`, `moon`, `rain`, `breeze`, `stir`, `breathes` |
| `theme/setting/04` c4 | `door`, `doorway`, `gate`, `gateway`, `portal`, `unlock`, `barred` |
| `theme/setting/01` c4 | every fauna word |

---

## Verification note

**Sheet 02 is the one most likely to be contradicted, and by Tech — Performance.** `N7`'s check is
written as *"every instance intersecting the segment between two neighbouring spawn points has
`Transparency == 1`"*, and both spawn points sit at plot-local Z = 8 at roughly Y = 0.5. A visible
parapet of any height on a lane's long side intersects that segment, so 02 fails the check as
written the moment it draws one — while satisfying the requirement the check exists to protect,
since a low parapet leaves a standing neighbour's body and the ground they are clearing in full
view. One of the two has to move, and 02 must say which and file it rather than quietly building a
wall that a grep fails.

Second candidate: **sheet 01, contradicted by `depths`.** If a render-stats reading returns a
batching factor below 10, 01's allowance is not merely wrong, it is void — the merged patch count
breaches the draw-call ceiling before any dressing exists — and the correction is a content change
nobody in this category owns.

Third, and quieter: **sheet 04 against `layout`.** `layout` owes 32 authored chunks because four
depths are four kinds of part; if 04 concludes that four families cannot be made visibly distinct
inside one closed roster and one weathering, the cheap reduction `layout` itself names (sharing a
family between depths 3 and 4) is a Theme ruling, not an art one.

---

## Research owed

**`must_verify` for this node is empty** — the graph gives `environment-lead` no verification
clause. I fetched anyway, because my writer has no fetch tools and whatever is banked here is the
only external evidence it can cite.

**Fetched this run:**

- `https://create.roblox.com/docs/performance-optimization/improve` — batching is documented for
  *meshes* sharing content and texture and is **not addressed for primitives**, which corroborates
  `budgets.renderCeilings.batchingFactor`'s stated uncertainty from the source rather than from
  another sheet; plus the `CanCollide`/`CanTouch`/`CanQuery` guidance, the `CastShadow` guidance,
  and the object-density-raises-draw-calls warning. **This page is one of
  `tech/performance/01`'s open `[research owed:]` items** and it is now banked.
- `https://create.roblox.com/docs/reference/engine/classes/Sky` — a `Sky` carries six `ContentId`
  skybox faces (`SkyboxUp/Dn/Lf/Rt/Ft/Bk`), plus `CelestialBodiesShown`, `StarCount`,
  `MoonTextureId`, `SunTextureId`, `SunAngularSize` and `SkyboxOrientation`. Enough for 05 to cost
  a skybox and to state a zero-asset configuration.
- `https://en.wikipedia.org/wiki/Piscina_Mirabilis` — 72 × 25 × 15 m, **48 pillars in four rows of
  twelve**, five naves and thirteen bays, barrel vaults, and water drawn *"from above … exploiting
  the holes in the barrel vaults."* Real numbers for 04: a pier grid of roughly 5 × 6 m — about
  18 × 21 studs — which over a 120 × 480 bay is ~144 piers, an order of magnitude above this
  domain's entire per-lane allowance. **04 starts from that gap, not from a blank page.**

**Could not verify:**

- **What Roblox renders when no `Sky` instance exists in `Lighting`.** Three searches returned only
  forum threads; no official page states it. Marked `[unverified]` — it decides whether 05's
  cheapest option (ship nothing) is a bright default day sky or an untextured void, and it is the
  difference between a free answer and a six-asset one. **The fetch that would settle it:**
  `https://create.roblox.com/docs/environment/skybox` (the `docs/environment/sky` path 404s), or a
  Studio observation on an empty baseplate with `Lighting` emptied.
- **`npm run bridge -- --contract` could not be executed** — this session has no shell tool. I read
  the derived `cid/_contract.md` (25 keys) and grepped `bridge/schema.mjs` for `environment`
  directly: **no match, so all five keys below are new.** Whoever runs the wave should re-run the
  command before dispatch in case wave 4's promotions landed since.

**Relayed, not owed by me:** nobody in either contract owns taking a MicroProfiler, Server Jobs or
render-stats reading on a device, and every ceiling this domain designs against depends on one.
`tech/performance/01` names the same hole from its side.
