# 05 — Foliage form

**Domain:** Objects · **Category:** Art & Visuals · **Wave:** 6

## Decision

**A patch is a primitive `Part` forever, it carries exactly zero child Instances, and its
`Reflectance` and `Transparency` are both 0.** The four shipped shapes read as **four distinct
silhouettes, not four botanical species**, and I decline to make them species-distinct because the
only route is meshes. `patch.material` stays `Grass` for all four; nothing added to a patch may
carry tier.

## Why

- **The mesh path has a stated price and it is not worth paying.** `representation`: *"If Art later
  specs actual foliage meshes, `patch.kind` becomes `mesh`, this contract starts requiring an asset
  per tier, and the build blocks until four assets exist."* It also breaks
  `budgets.textureCeilings.uploadedMeshAssetsInWorldGeometry` (0) and `N17`, against *"content
  design is the primary creative work on this project, **not art**"* `[brief: binding]`,
  `00-CORE.md`. Four assets buy a species read the binding legibility requirement never asked for:
  the hard constraint is *"rarity tiers must differ by shape or silhouette, not only hue"*, and
  four primitives already satisfy it.
- **So I state the limit rather than claim a resemblance.** `theme/setting/05` `P5` names a creeping
  surface mat, a fronded plant, a thorned scrambler and a woody climber; the shipped primitives are
  a 3 × 1.6 × 3 block, an upright 2.4-long cylinder of 3 diameter, a 2.8 sphere and a 3 × 3.4 × 3
  wedge. The block reads as a mat; **the other three read as a drum, a ball and a ramp, and no
  colour or material choice available to me changes that.** `[cid: decided]`. Recording it tells
  Environment and VFX what they compose against, and tells a later reader what four assets buy.
- **Zero children closes O5, and the arithmetic is not close.** No key forbids a child on a patch —
  `representation.patch.properties` lists properties, not children. One `Decal` per patch at the
  merged deepest bay takes a lane from `patchCount + 6` = **646** to **1,286**. That is 20,576
  Instances across `runtime.maxPlayers` 16 against
  `budgets.instanceCeilings.serverWorldInstanceCeiling` **12,000** — **171%**, from 86% today — and
  9 × 1,286 = **11,574** against `budgets.instanceCeilings.clientStreamedInstanceCeiling` **6,000**,
  **193%**. Both break at every batching factor, so this needs no measurement to rule. A `Decal` or
  `Texture` is separately an uploaded image asset, which
  `budgets.textureCeilings.uploadedImageAssetsInWorldGeometry` 0 forbids outright
  `[research: https://create.roblox.com/docs/parts/materials]`.
- **`Reflectance` and `Transparency` are genuinely unstated and I am closing them.**
  `representation.patch.properties` names ten properties and neither of these. Both are 0:
  `theme/setting/05` `A6` forbids a wet or reflective surface, `A7` forbids a luminous plant, and a
  see-through patch would let the slab through and flatten the green ladder the accessibility
  constraint depends on. `[cid: decided]`.
- **What the legibility requirement is owed is a promise, not a channel.** `rarity` ships one graded
  ladder from `patch.tierIndex`, *"silhouette first, colour second"*, and `N12` forbids collapsing
  the four heights. So: **no property of a patch other than the three `tiers` already ships may be
  a function of `tierIndex`.** `rarity.findRarityField` is `null` and
  `rarity.ladders[id=find-set].perObjectVisualGrade` is `false`, so there is no per-item rank to
  read anywhere in this game.
- **The triangle total is stated with its unknown named.** A box is 12 triangles and a wedge is 8 —
  geometric facts about the solids, not platform claims. `Cylinder` and `Ball` are tessellated at a
  segment count Roblox does not publish; `[unverified]`, settled by a Developer Console render-stats
  reading of one of each in an empty place, the instrument `tech/performance/01` names and **nobody
  owns** (G4). `budgets.renderCeilings.trianglesPerPatchBudget` is 100 each with a 400 rule across
  the four, so 20 is spent and **380 remains for the two round shapes**. If `Ball` overruns, the
  stated fix is *"a shape swap … never an LOD"*, a revision request against `gameplay/systems/01`.
- **`patch.material` stays `Grass` because sheet `01` fixes it** and the running build reads it.
  `styleGuide.materials.rows[id=M8]` binds the same enum to the `overgrowth` role and reads
  `patch.material` by field rather than setting it, so the two keys agree by construction. A
  per-tier material would add a fourth channel and rewrite a shipped key; it is a revision request
  against `01`, not a decision here.

### The patch, property by property

| property | value | who fixed it |
|---|---|---|
| `kind` | `primitive` — a `Part`, a `WedgePart` for Heartvine | `representation.patch`; permanent by this sheet |
| `Shape`, `Size`, `Orientation`, `Position` | per shape, exhaustive, four rows | `representation.patch.geometryByShape` — **not reopened** |
| `Color` | `tiers[].rgb` | `tiers` — **shipped, not recoloured** |
| `Material` | `Grass`, all four | `art/objects/01`; `styleGuide.materials.rows[id=M8]` reads it by field |
| `Reflectance` | **0** | **this sheet** — was unstated; `A6` |
| `Transparency` | **0** | **this sheet** — was unstated; `A7`, and the green ladder |
| `Anchored` | `true` | `representation.patch` |
| `CanCollide` | `false` | `patch.collides`; `N13` |
| `CastShadow` | `false` | `budgets` |
| child Instances | **0** | **this sheet** — closes O5 |

### Child Instances forbidden on a patch, by class

Zero means zero. Named because a build agent cannot count "nothing extra".

| class | why it is named |
|---|---|
| `Decal`, `Texture` | an uploaded image asset; `budgets.textureCeilings.uploadedImageAssetsInWorldGeometry` 0 |
| `SurfaceGui`, `BillboardGui` | `N1` forbids a billboard on a patch; each is also a second draw call |
| `SpecialMesh`, `MeshPart` | `budgets.textureCeilings.uploadedMeshAssetsInWorldGeometry` 0; `N17` |
| `ParticleEmitter`, `Beam`, `Trail`, `Fire`, `Smoke`, `Sparkles` | `theme/setting/05` `A14` criterion 2 — zero of each as ambience, and a resident per-patch emitter is ambience by definition |
| `PointLight`, `SpotLight`, `SurfaceLight` | `A7` — no light source but daylight |
| `Attachment` | the cheapest one to add and still 640 per lane; nothing reads it |
| a second `Part` or `WedgePart` | doubles the instance and draw-call count; the silhouette is one solid |
| `Highlight`, `SelectionBox` | an outline is a rarity border by another name — `rarity.forbidden` |
| `ClickDetector`, `ProximityPrompt` | `N13` — a patch is never touchable or queryable; input is movement only |
| `Sound` | audio at the patch is Audio's channel on `response.patchClear`, not a resident child |
| `Motor6D`, `Weld`, any tween target child | `N16` — nothing may stagger, fade or animate patches into existence observably |

### The triangle total, and both ends of the batching factor

| shape | tier | triangles | status |
|---|---|---|---|
| Block | Moss | **12** | geometric — six quad faces |
| Wedge | Heartvine | **8** | geometric — two triangles plus three quads |
| Cylinder | Fern | unmeasured | `[unverified]` — segment count unpublished |
| Ball | Bramble | unmeasured | `[unverified]` — the one at risk |
| all four | — | 20 + Cylinder + Ball ≤ **400** | `budgets.renderCeilings`; 380 remains for the two round shapes |

| `budgets.renderCeilings.batchingFactor` | consequence | who holds the lever |
|---|---|---|
| **1** (bottom of the 1–500 range) | the nine-lane worst case renders `9 × 645` = **5,805** draw calls against a 1,000 ceiling. **No art budget exists at any size**, and one child per patch would add up to 5,760 more | `depths.areas[].patchCount` — **a finding against `depths`, not an optimisation request and not an art decision** |
| **≈ 5.8** | the nine-lane case becomes feasible with zero art parts | as above |
| **50** (current value, `[playtest unknown]`) | patches cost ~116 draw calls; the instance ceiling binds instead | `budgets`; the reading is unowned (G4) |
| **500** (top of range) | patches cost ~12 draw calls; neither ceiling is near | — |

**Nothing here is designed around 50.** `childInstancesPerPatch: 0` is ruled on both instance
ceilings, which break at every value in the range.

```json
{
  "amends": "objectArt",
  "path": "foliage",
  "value": {
    "kind": "primitive",
    "kindIsPermanent": true,
    "meshPathPrice": {
      "patchKindBecomes": "mesh",
      "assetsRequired": 4,
      "buildBlocks": true,
      "keysBroken": ["budgets.textureCeilings.uploadedMeshAssetsInWorldGeometry", "tech/performance/03 N17", "representation.patch"],
      "briefLineContradicted": "content design is the primary creative work on this project, not art",
      "whatItWouldBuy": "a species read the binding shape-not-hue requirement does not ask for"
    },
    "childInstancesPerPatch": 0,
    "childInstanceArithmetic": {
      "laneInstancesToday": 646,
      "laneInstancesWithOneChildPerPatch": 1286,
      "maxPlayers": 16,
      "serverWorldInstanceCeiling": 12000,
      "serverCeilingUseToday": "86%",
      "serverCeilingUseWithOneChild": "171%",
      "clientLanes": 9,
      "clientStreamedInstanceCeiling": 6000,
      "clientCeilingUseWithOneChild": "193%",
      "breaksAtEveryBatchingFactor": true
    },
    "forbiddenChildClasses": ["Decal", "Texture", "SurfaceGui", "BillboardGui", "SpecialMesh", "MeshPart", "ParticleEmitter", "Beam", "Trail", "Fire", "Smoke", "Sparkles", "PointLight", "SpotLight", "SurfaceLight", "Attachment", "Part", "WedgePart", "Highlight", "SelectionBox", "ClickDetector", "ProximityPrompt", "Sound", "Motor6D", "Weld"],
    "forbiddenChildClassCount": 25,
    "propertiesClosedHere": { "Reflectance": 0, "Transparency": 0 },
    "propertiesClosedHereReason": "representation.patch.properties names neither; A6 forbids a reflective surface, A7 forbids a luminous plant, and a see-through patch would flatten the green ladder",
    "materialIsGrassForAllFour": true,
    "materialFieldSource": "styleGuide.materials.rows[id=M8].enum, which reads patch.material by field and sets nothing",
    "perShapeMaterialIsARevisionRequestAgainst": "cid/art/objects/01-patch-footprint.md",
    "botanicalReadability": "silhouette-distinct, not species-distinct",
    "botanicalReadabilityDetail": [
      { "shape": "Block", "plantNamedByP5": "a creeping surface mat", "readsAs": "a low mat", "matches": true },
      { "shape": "Cylinder", "plantNamedByP5": "a fronded plant", "readsAs": "an upright drum", "matches": false },
      { "shape": "Ball", "plantNamedByP5": "a thorned scrambler", "readsAs": "a sphere", "matches": false },
      { "shape": "Wedge", "plantNamedByP5": "a woody climber", "readsAs": "a ramp", "matches": false }
    ],
    "secondVisualChannelAdded": 0,
    "noSecondChannelRule": "no property of a patch other than the three tiers already ships — shape, height and rgb — may be a function of patch.tierIndex",
    "rarityFieldsRead": ["rarity.findRarityField", "rarity.ladders[id=find-set].perObjectVisualGrade"],
    "triangles": {
      "Block": 12,
      "Wedge": 8,
      "Cylinder": "unmeasured",
      "Ball": "unmeasured",
      "knownSubtotal": 20,
      "budgetForAllFour": 400,
      "remainingForRoundShapes": 380,
      "perPatchBudgetField": "budgets.renderCeilings.trianglesPerPatchBudget",
      "perPatchBudget": 100,
      "status": "unverified — Roblox publishes no per-primitive triangle count",
      "settlingInstrument": "a Developer Console render-stats reading of one of each shape in an empty place, on budgets.deviceFloor",
      "instrumentOwner": "unowned — gap G4",
      "fixIfOverrun": "a shape swap in representation.patch.geometryByShape or tiers[].shape, never an LOD (N1)",
      "fixIsARevisionRequestAgainst": "cid/gameplay/systems/01-overgrowth-tiers.md"
    },
    "batchingFactor": {
      "field": "budgets.renderCeilings.batchingFactor",
      "value": 50,
      "testRange": [1, 500],
      "status": "playtest unknown",
      "atOne": "the nine-lane worst case renders 5805 draw calls against a 1000 ceiling; no art budget exists at any size and the lever is depths.areas[].patchCount",
      "feasibleFromAbout": 5.8,
      "atFiveHundred": "patches cost about 12 draw calls and neither ceiling is near",
      "nothingHereIsDesignedAroundTheCurrentValue": true
    }
  }
}
```

## Consequences for other work

- **Performance work** gets two figures it can hold to — this domain adds zero Instances and zero
  triangles beyond what `plots` already creates, on both the server and client ceilings — plus two
  newly stated properties, and the request that whoever takes a render-stats reading report
  `Cylinder` and `Ball` triangle counts. The client figure is the one under pressure once
  `effects` exists, and this ruling is what keeps the patch's contribution flat.
- **Area-authoring work (`depths`)** is the lever at a low batching factor and this sheet says so
  rather than proposing an art fix. Below ≈ 5.8 the finding is against `depths.areas[].patchCount`.
- **VFX work** may not leave a *resident* child on a patch. A transient Instance created and
  destroyed inside `residueLifetimeSeconds` 0.4 or `dwellSeconds` 2.5 is not a child under this
  rule, because the patch is gone; an emitter that exists before the clear is forbidden here.
- **Environment work** inherits the botanical honesty: if the place is to read as overgrown, that
  load sits on the built stone, the litter layer (`P6`) and the canopy (`P9`), not on the patch.
- **Systems work (`tiers`)** gets one *conditional* revision request and no unconditional one: if
  the `Ball` count overruns, the fix is a shape swap in `tiers[].shape`, never an LOD, and it is
  theirs. Nothing here recolours, resizes or re-heights any tier.
- **Style-guide work** is cited and not contradicted: `materials.rows[id=M8]` reads `patch.material`
  by field and this sheet keeps it at `Grass`, so the two keys agree by construction.

## Acceptance criteria

1. `patch.kind` is `primitive` and `grep -rn "MeshPart\|SpecialMesh\|MeshId\|Decal\|Texture" game/src`
   returns nothing.
2. Every patch Instance created by `plots` has exactly **0** children, and both `Reflectance` and
   `Transparency` are `0` on all four shapes.
3. `patch.material` resolves to the single string `"Grass"` in the merged manifest — one value, not
   four — and no property of a patch other than `Shape`, `Size` and `Color` is a function of
   `patch.tierIndex`.
4. One of each of the four shapes, read together in an empty place, totals **≤ 400** triangles.

## Not decided here

Every shape, height, footprint, rgb and `Orientation` — `tiers`, `patch` and
`representation.patch.geometryByShape`, all shipped; I cite them and change none. Patch count,
spacing and lane geometry — `depths`, `layout` and `plots`. Whether `CanTouch` and `CanQuery` are
set false on a patch, which the research pack flags as a free saving — **performance work** and
**representation work**; it is a physics property, not an appearance one. What the clear and the
reveal are made of — **VFX work**, which holds `effects`. The `Cylinder` and `Ball` triangle counts
and the batching factor itself — **performance work**, once someone owns the instrument. The litter
layer, the canopy, and everything else that makes the place read as overgrown — **Environment
work**, which holds `environment`.
