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
  per tier, and the build blocks until four assets exist."* That also breaks
  `budgets.uploadedMeshAssetsInWorldGeometry` (0) and `N17` (*no uploaded asset added to world
  geometry to reduce part count*), against *"content design is the primary creative work on this
  project, **not art**"* `[brief: binding]`, `00-CORE.md`. Four assets buy a species read that the
  binding legibility requirement does not ask for: the hard constraint is *"rarity tiers must
  differ by shape or silhouette, not only hue"*, and four primitives already satisfy it.
- **So I state the honest limit rather than claim a resemblance.** `theme/setting/05` `P5` names
  four plants — a creeping surface mat, a fronded plant, a thorned scrambler, a woody climber — and
  the four shipped primitives are a 3 × 1.6 × 3 block, an upright 2.4-long cylinder of 3 diameter, a
  2.8 sphere and a 3 × 3.4 × 3 wedge. The block genuinely reads as a mat; **the other three read as
  a drum, a ball and a ramp, and no colour or material choice available to me changes that.**
  `[cid: decided]`. Recording `botanicalReadability: "silhouette-distinct, not species-distinct"`
  is the useful output, because it tells Environment and VFX what they are composing against and
  tells a later reader exactly what four assets would buy.
- **Zero children closes O5, and the arithmetic is not close.** No key forbids a child Instance on
  a patch: `representation.patch.properties` lists properties, not children. One `Decal` per patch
  at the merged deepest bay takes a lane from `patchCount + 6` = **646** to **1,286**, which is
  20,576 Instances across `runtime.maxPlayers` 16 against
  `budgets.instanceCeilings.serverWorldInstanceCeiling` **12,000** — **171% of the ceiling**, from
  86% today. That breaks at every value of the batching factor, so it needs no measurement to rule.
- **A `Decal` or `Texture` is also an uploaded image asset**, which
  `budgets.uploadedImageAssetsInWorldGeometry` 0 forbids outright — the same sourced ground as the
  custom-material ban `[research: https://create.roblox.com/docs/parts/materials]`.
- **`Reflectance` and `Transparency` are genuinely unstated and I am closing them.**
  `representation.patch.properties` names `Shape`, `Size`, `Orientation`, `Position`, `Color`,
  `Material`, `Anchored`, `CanCollide`, `CastShadow`, `Name` and `Parent` — and neither of these
  two. Both are 0: `theme/setting/05` `A6` forbids a wet or reflective surface and `A7` forbids a
  luminous plant, and a semi-transparent patch would let the slab's colour through and flatten the
  green ladder the accessibility constraint depends on. `[cid: decided]`.
- **The legibility requirement is owed a promise, not a channel.** `rarity` ships one graded ladder,
  read from `patch.tierIndex`, *"silhouette first, colour second"*, and `N12` forbids reducing the
  four heights toward each other. What this domain owes it is that **no second channel is added**:
  no property of a patch other than the three `tiers` already ships may be a function of
  `tierIndex`. That is the whole of my answer to *"rarity read at a glance"* — `rarity.findRarityField`
  is `null` and `perObjectVisualGrade` is `false`, so there is no per-item rank to read anywhere.
- **The triangle total is stated with its unknown named.** A box is 12 triangles and a wedge is 8;
  those are geometric facts about the solids, not platform claims. `Cylinder` and `Ball` are
  tessellated at a segment count **Roblox does not publish** — `[unverified]`, and the settling
  instrument is a Developer Console render-stats reading of one of each shape in an empty place,
  which is the same instrument `tech/performance/01` names and **nobody owns** (G4). The budget is
  `trianglesPerPatchBudget` 100 each and ≤ 400 for all four together, so 20 is spent and **380
  remains for the two round shapes**. If `Ball` overruns, the stated fix is *"a shape swap in
  `representation.patch.geometryByShape` or `tiers[].shape` — never an LOD"*, which is a revision
  request against `gameplay/systems/01` and not a decision here.
- **`patch.material` stays `Grass` because `01` fixes it.** A per-tier material would give the
  ladder a fourth channel, cost four material strings where one now ships, and require rewriting a
  key the running build reads. If anyone wants it, it is a revision request against
  `art/objects/01`, filed there, not taken here.

### The patch, property by property

| property | value | who fixed it |
|---|---|---|
| `kind` | `primitive` — a `Part`, a `WedgePart` for Heartvine | `representation.patch`; permanent by this sheet |
| `Shape`, `Size`, `Orientation`, `Position` | per shape, exhaustive, four rows | `representation.patch.geometryByShape` — **not reopened** |
| `Color` | `tiers[].rgb` | `tiers` — **shipped, not recoloured** |
| `Material` | `Grass`, all four | `art/objects/01` — **shipped, not reopened** |
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
| `Decal`, `Texture` | an uploaded image asset; `budgets.uploadedImageAssetsInWorldGeometry` 0 |
| `SurfaceGui`, `BillboardGui` | `N1` forbids a billboard on a patch; both are also a second draw call each |
| `SpecialMesh`, `MeshPart` | `budgets.uploadedMeshAssetsInWorldGeometry` 0; `N17` |
| `ParticleEmitter`, `Beam`, `Trail`, `Fire`, `Smoke`, `Sparkles` | `theme/setting/05` `A14` criterion 2 — zero of each as ambience; a per-patch emitter is ambience by definition |
| `PointLight`, `SpotLight`, `SurfaceLight` | `A7` — no light source but daylight |
| `Attachment` | the cheapest one to add and still 640 per lane; nothing reads it |
| a second `Part` or `WedgePart` | doubles the instance and draw-call count; the silhouette is one solid |
| `Highlight`, `SelectionBox` | an outline is a rarity border by another name — `rarity.forbidden` |
| `ClickDetector`, `ProximityPrompt` | `N13` — a patch is never touchable or queryable; input is movement only |
| `Sound` | audio at the patch is Audio's channel on `response.patchClear`, not a resident child |
| `Motor6D`, `Weld`, any `Tween` target child | `N16` — nothing may stagger, fade or animate patches into existence observably |

### The triangle total, and both ends of the batching factor

| shape | tier | triangles | status |
|---|---|---|---|
| Block | Moss | **12** | geometric — six quad faces |
| Wedge | Heartvine | **8** | geometric — two triangles plus three quads |
| Cylinder | Fern | unmeasured | `[unverified]` — segment count unpublished |
| Ball | Bramble | unmeasured | `[unverified]` — the one at risk |
| all four | — | 20 + Cylinder + Ball ≤ **400** | `budgets`; 380 remains for the two round shapes |

| `batchingFactor` | consequence | who holds the lever |
|---|---|---|
| **1** (bottom of the 1–500 range) | the nine-lane worst case renders `9 × 645` = **5,805** draw calls against a 1,000 ceiling. **No art budget exists at any size**, and one child per patch would add up to 5,760 more | `depths.areas[].patchCount` — **a finding against `depths`, not an optimisation request and not an art decision** |
| **≈ 5.8** | the nine-lane case becomes feasible with zero art parts | as above |
| **50** (current value, `[playtest unknown]`) | patches cost ~116 draw calls; the instance ceiling binds instead of draw calls | `budgets`; the reading is unowned (G4) |
| **500** (top of range) | patches cost ~12 draw calls; neither ceiling is near | — |

**Nothing in this sheet is designed around 50.** `childInstancesPerPatch: 0` is ruled on the
instance ceiling, which breaks at every value in the range.

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
      "keysBroken": ["budgets.uploadedMeshAssetsInWorldGeometry", "tech/performance/03 N17", "representation.patch"],
      "briefLineContradicted": "content design is the primary creative work on this project, not art",
      "whatItWouldBuy": "a species read the binding shape-not-hue requirement does not ask for"
    },
    "childInstancesPerPatch": 0,
    "childInstanceArithmetic": {
      "laneInstancesToday": 646,
      "laneInstancesWithOneChildPerPatch": 1286,
      "maxPlayers": 16,
      "serverWorldInstanceCeiling": 12000,
      "ceilingUseToday": "86%",
      "ceilingUseWithOneChild": "171%",
      "breaksAtEveryBatchingFactor": true
    },
    "forbiddenChildClasses": ["Decal", "Texture", "SurfaceGui", "BillboardGui", "SpecialMesh", "MeshPart", "ParticleEmitter", "Beam", "Trail", "Fire", "Smoke", "Sparkles", "PointLight", "SpotLight", "SurfaceLight", "Attachment", "Part", "WedgePart", "Highlight", "SelectionBox", "ClickDetector", "ProximityPrompt", "Sound", "Motor6D", "Weld"],
    "forbiddenChildClassCount": 25,
    "propertiesClosedHere": { "Reflectance": 0, "Transparency": 0 },
    "propertiesClosedHereReason": "representation.patch.properties names neither; A6 forbids a reflective surface, A7 forbids a luminous plant, and a see-through patch would flatten the green ladder",
    "materialIsGrassForAllFour": true,
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
    "triangles": {
      "Block": 12,
      "Wedge": 8,
      "Cylinder": "unmeasured",
      "Ball": "unmeasured",
      "knownSubtotal": 20,
      "budgetForAllFour": 400,
      "remainingForRoundShapes": 380,
      "perPatchBudget": 100,
      "status": "unverified — Roblox publishes no per-primitive triangle count",
      "settlingInstrument": "a Developer Console render-stats reading of one of each shape in an empty place, on budgets.deviceFloor",
      "instrumentOwner": "unowned — gap G4",
      "fixIfOverrun": "a shape swap in representation.patch.geometryByShape or tiers[].shape, never an LOD (N1)",
      "fixIsARevisionRequestAgainst": "cid/gameplay/systems/01-overgrowth-tiers.md"
    },
    "batchingFactor": {
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

- **Performance work** gets two figures it can hold to: this domain adds **zero** Instances and
  zero triangles beyond what `plots` already creates, and the child-instance question that was
  legal yesterday is closed. It also inherits `Reflectance` and `Transparency` as newly stated
  properties, and the request that whoever takes a render-stats reading report `Cylinder` and
  `Ball` triangle counts — G4's instrument, still unowned.
- **Area-authoring work (`depths`)** is the lever at a low batching factor and this sheet says so
  rather than proposing an art fix. If the factor comes back below ≈ 5.8, the finding is against
  `depths.areas[].patchCount`, not against anything here.
- **VFX work** may not leave a resident child on a patch. `response.patchClear` has
  `residueLifetimeSeconds` 0.4 and `findReveal` has `dwellSeconds` 2.5 — a transient Instance
  created and destroyed inside those windows is not a child of a patch under this rule, because the
  patch is gone. A per-patch emitter that exists before the clear **is** forbidden here.
- **Environment work** inherits the botanical honesty: the four shapes do not read as four plants,
  so if the place is to read as overgrown that load sits on the built stone, the litter layer
  (`P6`) and the canopy (`P9`), not on the patch.
- **Systems work (`tiers`)** gets one conditional revision request and no unconditional one: if the
  `Ball` triangle count overruns, the fix is a shape swap in `tiers[].shape`, never an LOD, and it
  is theirs. Nothing here recolours, resizes or re-heights any tier.
- **Objects sheet `01`** is unchanged: `patch.material` stays `Grass`, and a per-tier material
  would be a revision request against that sheet rather than a decision in this one.

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
reveal are made of inside 0.4 s and 2.5 s — **VFX work**, which holds `effects`. The `Cylinder`
and `Ball` triangle counts and the batching factor itself — **performance work**, once someone owns
the instrument. The litter layer, the canopy and everything else that makes the place read as
overgrown — **Environment work**, which holds `environment`.
