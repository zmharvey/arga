# 01 — The world part budget

**Domain:** art/environment · **Category:** Art & Visuals · **Wave:** 6

## Decision

Eleven world part classes exist and no twelfth may be added; each is bound to exactly one
`(classId, Size, Material, colourRole)` tuple, so `environment.distinctDrawClasses` is **11**,
statically countable, and is the whole density strategy. **Dressing is resident in the live bay
only**, at **18 instances per lane** plus **24 shared place-wide** — the exact 186 of client
headroom — and at `batchingFactor` 1 the allowance is **zero and the merged design is still
unrenderable**, which is a finding against `depths.areas[].patchCount` and not an art problem.

## Why

- **Why a tuple vocabulary rather than a density number.** Roblox documents draw-call batching
  for *meshes* sharing content and texture and says nothing about primitives
  `[research: https://create.roblox.com/docs/performance-optimization/improve]`. If primitives
  batch, one tuple costs one draw class; if they do not, it costs its own instance count, which
  is the resident allowance and is already bounded. A tuple count is therefore the only density
  figure that is true under both models, and it is checkable without a running game. The same
  page's warning is the reason the roster is short: *"If a large number of objects are
  concentrated with a high density, then rendering this area of the scene requires more draw
  calls."*
- **The allowance, derived from fields and not copied.**
  `budgets.instanceCeilings.clientStreamedInstanceCeiling` (6,000) minus
  `clientStreamedInstancesWorstCase` (5,814) is 186 instances of client headroom across the nine
  lanes that worst case counts. `9 × 18 + 24 = 186` exactly. On the server,
  `runtime.maxPlayers` × (`max(depths.areas[].patchCount)` + 6 + 18) + 24 = 10,648 of a 12,000
  `serverWorldInstanceCeiling`, so the client binds and the server has slack.
  `[research: cid/art/environment/_lead.md]` **Every ceiling above is `[playtest unknown]`**;
  the client one's own test range tops at 10,000, which would give 465 per lane — a 23× swing on
  a field nobody has read.
- **At `batchingFactor` 1 there is no art budget at any size.** Nine lanes of 646 patches are
  5,814 draw calls against a `drawCalls` ceiling of 1,000 before Environment places one stone.
  The crossover is `batchingFactorFloor` **6.0**: `(9 × 664 + 24) / 1000`. Below it the lever is
  `depths.areas[].patchCount` and `budgets` itself says so `[brief: soft]` ← the category brief's
  ceiling warning. I state both ends and redesign for neither.
- **Why residency is a rule and not a number.** `plots.bays` runs to eight and `endgame` adds
  480-stud bays without bound, so dressing resident in every bay has no upper bound at all
  `[brief: binding]` ← *"Endless via shuffled authored chunks"* (`03-META.md`). Dressing the live
  bay only makes the per-lane figure independent of how deep a player is, which is the only form
  that survives an endless run.
- **Weathering with zero uploaded assets.** `MaterialVariant` and `SurfaceAppearance` both
  require an uploaded texture; built-in base materials require none, their *"texture assets are
  bundled with Studio"* `[research: https://create.roblox.com/docs/parts/materials]`, and
  `Limestone` and `Cobblestone` are base materials valid on a `BasePart`
  `[research: https://robloxapi.github.io/ref-temp/enum/Material.html]`. So `P7` weathering is
  carried by the material choice and by nothing else. Stain overlays, patina parts and softened
  arrises are **not depicted**, and that is an accepted loss, not an omission: each would cost an
  uploaded image against `uploadedImageAssetsInWorldGeometry` 0 and `N17`, or a second tuple
  against the class count. It is identical at every depth by construction, satisfying
  `theme/lore/01` `L4` with a check rather than an assertion.
- **No world token layer exists (G3).** `ui-forge`'s eight token groups are UI only, so every
  value below is a literal — which is what `CLAUDE.md`'s token rule exists to prevent
  `[research: ui-forge/src/theme/generate.mjs]`. The mitigation available to me is shape, not
  authority: the values are emitted as one **named closed vocabulary** with role ids rather than
  scattered through four sheets, so a later world token group binds to `environment.tuples` in
  one edit. `[cid: decided]` on the shape; the seam ruling is not mine.
- **Colour is a role reference, never a value.** `styleGuide` owns hue. I name the five role ids
  I require and a fallback for each, so a builder is never blocked on a key that has not merged.
- **Two free savings taken on every class.** *"For parts that do not need collisions, disable
  their collisions by setting `BasePart.CanCollide`, `BasePart.CanTouch` and `BasePart.CanQuery`
  to false"* and *"Use the `BasePart.CastShadow` property to disable shadow casting on small
  parts"* `[research: https://create.roblox.com/docs/performance-optimization/improve]`. Only
  `paving`, `kerb`, `parapet`, `crossWall` and `pier` collide, because a player walks on or into
  them; everything else is set false on all three.

### The tuple vocabulary — eleven entries, and adding a twelfth is a revision against this sheet

Section is `[X, Y, Z]` in studs. `*` means that axis is parametric and its rule is named; a
parametric axis never introduces a second tuple. Every entry is `Anchored`, `Reflectance` 0,
`Transparency` 0.

| # | classId | roster | Size (studs) | Material | colourRole | collides | shadow | spent by |
|---|---|---|---|---|---|---|---|---|
| 1 | `paving` | `P1` | `laneWidthStuds` × 1 × `*` | `Cobblestone` | `stone.cleared` | yes | yes | 03 (the existing slab; 0 new instances) |
| 2 | `kerb` | `P1` | 1.5 × 0.4 × `*` | `Limestone` | `stone.built` | yes | no | 03, 04 |
| 3 | `parapet` | `P1` | 1.5 × 2.5 × `*` | `Limestone` | `stone.built` | yes | yes | 02 |
| 4 | `crossWall` | `P1` | `*` × 4 × 2 | `Limestone` | `stone.built` | yes | yes | 02 |
| 5 | `pier` | `P1` | 4 × 12 × 4 | `Limestone` | `stone.built` | yes | yes | 04 |
| 6 | `vaultStrip` | `P1` | `laneWidthStuds` × 2 × 6 | `Limestone` | `stone.built` | no | yes | 04 |
| 7 | `channel` | `P2` | 6 × 0.6 × `*` | `Limestone` | `stone.built` | no | no | 03 |
| 8 | `basin` | `P2` | 10 × 0.8 × 10 | `Limestone` | `stone.built` | no | no | 03, 04 |
| 9 | `litter` | `P6` | 14 × 0.15 × 14 | `Grass` | `litter.leaf` | no | no | 03 |
| 10 | `canopy` | `P9` | `*` × 60 × 40 | `Grass` | `canopy.leaf` | no | yes | 05 |
| 11 | `trunk` | `P9` | 5 × 44 × 5 | `Wood` | `canopy.trunk` | no | yes | 05 |

### Realised as zero parts, deliberately, with the reason

| roster class | realised as | why |
|---|---|---|
| `P3` fixed fittings and hand-cut mechanism | **0 parts** | one fitting costs the same as one pier against an 18-instance lane; reopens only if `clientStreamedInstanceCeiling` is measured above 6,000 |
| `P7` weathering | **0 parts** | carried by `Material` alone; every other route is an uploaded image asset |
| `P8` open sky | **0 parts** | sheet `05`; no `Sky` instance ships |
| restored-versus-overgrown second look | **0 parts** | `theme/setting/04` narrowed it to *"the same stone, with and without plants on it"*; `W1` gives a finished part no dressing of any kind |

### Exclusions — countable objects and mechanisms, not a register

| # | zero of | source |
|---|---|---|
| X1 | `Decal`, `Texture`, `MaterialVariant`, `SurfaceAppearance` on any world part | `uploadedImageAssetsInWorldGeometry` 0, `N17` |
| X2 | `rbxassetid` in any value this domain emits | `representation`: *"No asset id is needed anywhere"* |
| X3 | `ParticleEmitter`, `Beam`, `Trail`, `Fire`, `Smoke`, `Sparkles` as ambience | `theme/setting/05` `A14` |
| X4 | `PointLight`, `SpotLight`, `SurfaceLight`, and any luminous stone or plant | `A7` |
| X5 | `Atmosphere`, `Clouds`, `FogStart`, `FogEnd` | `N7`, `theme/setting/03` `R1` |
| X6 | cobwebs, skulls, bones, graves, chains, blood, scorch marks | `theme/tone/04` `D1` |
| X7 | staged fallen stone, memorials, remains, dust motes | `D14`, `D2`; `theme/lore/01` `L5` |
| X8 | cloth, banners, rope, lanterns, braziers, water of any kind, wet or reflective surface | `theme/setting/05` present-column closure, `A6`, `A7` |
| X9 | cut lettering, carved figures, relief figures, gilding, gemstones | `theme/setting/01`, `theme/lore/01` |
| X10 | seasonal dressing, festival decoration, harvest or anniversary marker | `03-META.md` priority 3 |
| X11 | leaderboard plinth, podium, trade counter, gift container, reward cache, code surface | `03-META.md` priority 3 |
| X12 | a reserved region, empty plinth, bare wall or unused corner held open for any of the above | category brief scope gate |
| X13 | a per-depth material, colour or wear difference | `theme/lore/01` `L4`, `theme/setting/03` |
| X14 | a twelfth part class, at any depth, for any reason | `theme/setting/05`: the present column is closed |

```manifest
{
  "provides": "environment",
  "status": "proposed",
  "value": {
    "oneLine": "One works of warm pale dressed stone, eleven part classes drawn once each, dressed in the live bay only and bare everywhere else.",
    "materials": ["Limestone", "Cobblestone", "Grass", "Wood"],
    "materialsCostZeroUploadedAssets": true,
    "colourRoles": [
      { "id": "stone.cleared", "requiredOf": "styleGuide", "lumaFloor": 165, "fallback": "the warmest role styleGuide defines at or above 165" },
      { "id": "stone.built", "requiredOf": "styleGuide", "lumaFloor": 165, "fallback": "stone.cleared" },
      { "id": "litter.leaf", "requiredOf": "styleGuide", "lumaFloor": 145, "fallback": "stone.cleared darkened to 145" },
      { "id": "canopy.leaf", "requiredOf": "styleGuide", "lumaFloor": null, "fallback": "tiers[3].rgb" },
      { "id": "canopy.trunk", "requiredOf": "styleGuide", "lumaFloor": null, "fallback": "canopy.leaf" }
    ],
    "distinctDrawClasses": 11,
    "tupleRule": "one classId, one tuple, forever. A parametric axis is a length rule, never a second tuple. A twelfth tuple is a revision against this sheet.",
    "tuples": [
      { "classId": "paving",     "roster": "P1", "sizeStuds": ["plots.laneWidthStuds", 1, "plots.bays[k].lengthStuds summed from bay 1 to the live bay"], "material": "Cobblestone", "colourRole": "stone.cleared", "canCollide": true,  "canTouch": false, "canQuery": true,  "castShadow": true,  "newInstances": 0 },
      { "classId": "kerb",       "roster": "P1", "sizeStuds": [1.5, 0.4, "parametric"],  "material": "Limestone",  "colourRole": "stone.built",   "canCollide": true,  "canTouch": false, "canQuery": false, "castShadow": false },
      { "classId": "parapet",    "roster": "P1", "sizeStuds": [1.5, 2.5, "parametric"],  "material": "Limestone",  "colourRole": "stone.built",   "canCollide": true,  "canTouch": false, "canQuery": false, "castShadow": true },
      { "classId": "crossWall",  "roster": "P1", "sizeStuds": ["parametric", 4, 2],      "material": "Limestone",  "colourRole": "stone.built",   "canCollide": true,  "canTouch": false, "canQuery": false, "castShadow": true },
      { "classId": "pier",       "roster": "P1", "sizeStuds": [4, 12, 4],                "material": "Limestone",  "colourRole": "stone.built",   "canCollide": true,  "canTouch": false, "canQuery": false, "castShadow": true },
      { "classId": "vaultStrip", "roster": "P1", "sizeStuds": ["plots.laneWidthStuds", 2, 6], "material": "Limestone", "colourRole": "stone.built", "canCollide": false, "canTouch": false, "canQuery": false, "castShadow": true },
      { "classId": "channel",    "roster": "P2", "sizeStuds": [6, 0.6, "parametric"],    "material": "Limestone",  "colourRole": "stone.built",   "canCollide": false, "canTouch": false, "canQuery": false, "castShadow": false },
      { "classId": "basin",      "roster": "P2", "sizeStuds": [10, 0.8, 10],             "material": "Limestone",  "colourRole": "stone.built",   "canCollide": false, "canTouch": false, "canQuery": false, "castShadow": false },
      { "classId": "litter",     "roster": "P6", "sizeStuds": [14, 0.15, 14],            "material": "Grass",      "colourRole": "litter.leaf",   "canCollide": false, "canTouch": false, "canQuery": false, "castShadow": false },
      { "classId": "canopy",     "roster": "P9", "sizeStuds": ["parametric", 60, 40],    "material": "Grass",      "colourRole": "canopy.leaf",   "canCollide": false, "canTouch": false, "canQuery": false, "castShadow": true },
      { "classId": "trunk",      "roster": "P9", "sizeStuds": [5, 44, 5],                "material": "Wood",       "colourRole": "canopy.trunk",  "canCollide": false, "canTouch": false, "canQuery": false, "castShadow": true }
    ],
    "commonPartProperties": { "anchored": true, "reflectance": 0, "transparency": 0 },
    "residency": {
      "rule": "every dressing instance belongs to the live bay and to no other. It is created when plots.liveGeometry.bayBuiltAt fires and destroyed with the bay it dressed; a bay below the live one holds paving and nothing else.",
      "residentBays": 1,
      "independentOfBayOrdinal": true,
      "endgameCost": 0,
      "reopensPlotsField": "plots.liveGeometry.torndownBeyond"
    },
    "allowance": {
      "residentInstancesPerLane": 18,
      "sharedPlaceInstances": 24,
      "perConsumerPerLane": { "builtEdge": 6, "groundwork": 5, "chunkDressing": 6, "reserve": 1 },
      "perConsumerShared": { "backdrop": 24 },
      "spendingRule": "a consumer that wants a part it cannot afford takes it from reserve once, or files against this sheet. It may not take it from another consumer."
    },
    "derivation": {
      "clientHeadroom": "budgets.instanceCeilings.clientStreamedInstanceCeiling - budgets.instanceCeilings.clientStreamedInstancesWorstCase",
      "clientIdentity": "9 * residentInstancesPerLane + sharedPlaceInstances == clientHeadroom",
      "serverCost": "runtime.maxPlayers * (max(depths.areas[].patchCount) + 6 + residentInstancesPerLane) + sharedPlaceInstances",
      "serverCeilingField": "budgets.instanceCeilings.serverWorldInstanceCeiling",
      "allCeilingsStatus": "playtest unknown"
    },
    "budgetAtBatchingFactor": {
      "at50": { "residentInstancesPerLane": 18, "sharedPlaceInstances": 24, "drawCallsUsed": 120, "drawCallCeilingField": "budgets.renderCeilings.drawCalls", "binds": "instanceCeiling" },
      "at1":  { "residentInstancesPerLane": 0,  "sharedPlaceInstances": 0,  "drawCallsUsed": 6000, "binds": "drawCalls", "verdict": "void: the merged patch load alone is 5814 against 1000, so no art budget exists at any size and no legal streaming radius closes it" },
      "batchingFactorFloor": 6.0,
      "leverIfBelowFloor": "depths.areas[].patchCount",
      "notAnOptimisationRequest": true
    },
    "weathering": {
      "channels": ["material"],
      "identicalAtEveryDepth": true,
      "materialVariesWithDepth": false,
      "depictedByZeroParts": ["stain", "patina", "softened arrises", "worn tread"],
      "reversalCost": "one uploaded image asset per role, breaching budgets.textureCeilings.uploadedImageAssetsInWorldGeometry and N17"
    },
    "forbiddenMechanisms": ["Decal", "Texture", "MaterialVariant", "SurfaceAppearance", "ParticleEmitter", "Beam", "Trail", "Fire", "Smoke", "Sparkles", "PointLight", "SpotLight", "SurfaceLight", "Atmosphere", "Clouds", "Sky", "rbxassetid"],
    "playerFacingStrings": 0,
    "landmarks": 0,
    "schemaNote": "environment, builtEdge, groundwork, chunkDressing and backdrop are five keys because bridge/merge.mjs gives a key exactly one supplying sheet. If the schema maintainer prefers one key, they are its five top-level blocks and no sheet's content changes."
  }
}
```

## Consequences for other work

- **Area-authoring-by-depth work (`depths`)** inherits one number and one verdict: this domain
  costs 18 instances per lane, and if a render-stats reading returns a batching factor below 6.0
  the correction is `depths.areas[].patchCount`, not a smaller art budget, because the budget is
  already zero there. That is the second time the same lever has been named from a different
  side, and the two figures agree.
- **Plot-and-lane work (`plots`)** gets the answer to the line `representation.plot` wrote for
  this domain. Dressing lives **in a bay**, so `plots.liveGeometry.torndownBeyond` is no longer a
  no-op and acquires a subject: a bay's dressing is destroyed with the bay. I state the trigger
  and set no teardown format.
- **Style Guide work (`styleGuide`)** owes five role ids by name — `stone.cleared`,
  `stone.built`, `litter.leaf`, `canopy.leaf`, `canopy.trunk` — and a closed `Enum.Material` list
  that contains `Limestone`, `Cobblestone`, `Grass` and `Wood`. If its list omits one, the fix is
  a substitution inside my tuple table and never a class change. It owns every hue; I own none.
- **Device-ceiling work (`budgets`)** inherits a materials-list widening from three built-in
  materials to four at **zero uploaded-asset cost**, and the first `environmentInstancesPerLane`
  figure that has ever existed. It should carry it as a field rather than let five art sheets
  restate it.
- **Optimisation-limit work (`N1`–`N17`)** gets one class of saving pre-taken rather than
  requested: `CanTouch` and `CanQuery` false on every class, `CastShadow` false on six of eleven.
  None of them is an LOD, a merge, a pool or a height collapse.
- **VFX, Objects, Lighting and Characters work** inherit `distinctDrawClasses` as the shape their
  own budgets should take, and inherit that no world token layer exists, so their values are
  literals too.
- **Sheets 02 to 05 of this domain** may spend only from the eleven tuples above, only inside
  their stated allowance, and may not add a class.

## Acceptance criteria

1. `environment.tuples` has exactly 11 entries, `environment.distinctDrawClasses === 11`, every
   entry's `material` is one of the four in `environment.materials`, and no `classId` appears
   twice.
2. `9 × environment.allowance.residentInstancesPerLane + environment.allowance.sharedPlaceInstances`
   equals `budgets.instanceCeilings.clientStreamedInstanceCeiling −
   budgets.instanceCeilings.clientStreamedInstancesWorstCase`; and
   `runtime.maxPlayers × (max(depths.areas[].patchCount) + 6 + 18) + 24 ≤
   budgets.instanceCeilings.serverWorldInstanceCeiling`.
3. The four values of `environment.allowance.perConsumerPerLane` sum to
   `residentInstancesPerLane`, and sheets 02, 03 and 04 each place exactly their stated count for
   one live bay.
4. `environment.weathering.channels` is exactly `["material"]`, and a grep for
   `rbxassetid|MaterialVariant|SurfaceAppearance|Decal|Texture` over every value in the five keys
   this domain supplies returns zero matches.

## Not decided here

Which zones exist, their counts, footprints, patch counts and bay lengths — `depths`, `layout`
and `plots`; I dress what they decide and resize nothing. Every hue, every hex value, the closed
`Enum.Material` list itself, the minimum feature size and the ornament count — `styleGuide` and
`formLanguage`, this category. Where each part physically stands — sheets `02` to `05` of this
domain. Whether a device reading is ever taken, and by whom — **unowned in both contracts**, named
here for the third time. Whether these five keys are promoted or collapsed into one — the schema
maintainer.
