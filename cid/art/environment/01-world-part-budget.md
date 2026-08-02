# 01 — The world part budget

**Domain:** art/environment · **Category:** Art & Visuals · **Wave:** 6 · **Revision:** round 1

## Decision

Ten world part classes exist and no eleventh may be added; each is bound to exactly one
`(classId, Size, Material, colourRole)` tuple, so `environment.distinctDrawClasses` is **10**,
statically countable, and is the whole density strategy. The allowance is **16 resident instances
per lane and 24 shared place-wide, of which at most 6 stream at once**, leaving **35 streamed
instances reserved for `effects`** — its own worst case, not its realistic figure. Dressing is
**lane-persistent where it runs along the lane and bay-resident where it does not**, so the built
edge grows with the slab instead of vanishing behind the player.

## Why

- **Why a tuple vocabulary rather than a density number.** Roblox documents draw-call batching
  for *meshes* sharing content and texture and says nothing about primitives
  `[research: https://create.roblox.com/docs/performance-optimization/improve]`. If primitives
  batch, one tuple costs one draw class; if they do not, it costs its own instance count, which
  is the resident allowance and is already bounded. A tuple count is the only density figure true
  under both models, and it is checkable without a running game. The same page is why the roster
  is short: *"If a large number of objects are concentrated with a high density, then rendering
  this area of the scene requires more draw calls."*
- **The allowance, and the three-way sum nobody had taken.** Headroom is
  `budgets.instanceCeilings.clientStreamedInstanceCeiling` (6,000) minus
  `clientStreamedInstancesWorstCase` (5,814) = **186**. My previous 18 + 24 spent all of it and
  left `effects` nothing: `vfx/01` `budget.clientInstancesAdded` 8 plus
  `concurrentRevealObjectsOnOneScreen` 27 is 35 streamed instances, and at 18 + 24 the client
  landed at 6,035 `[research: cid/art/vfx/01-the-clear-and-the-reveal.md]`. **The re-cut is
  `9 × 16 + 6 + 35 = 185`**, one spare at Effects' worst case and nineteen at its realistic
  figure of 17. **The two given up are `groundwork`'s litter mat and the reserve**, both named
  below; every other consumer keeps its count.
- **Why `effects` gets its worst case and not its realistic figure.** A budget that is solvent
  only at the realistic figure is a budget that overruns on the day the design works — nine lanes
  each holding a reveal is exactly what a full server doing well looks like. Reserving 35 means
  no third key can be surprised by a second sum. `[cid: decided]`
- **Instances and parts are different quantities and `budgets` conflates them.** Draw calls take
  `lanePartFormula` (645); instance ceilings take `laneInstanceFormula` (646), which counts the
  spawn `Attachment`. So the correct statement is **5,805 parts**, not 5,814 draw calls, and this
  key's own floor is `(9 × (645 + 16) + 6 + 35) / 1000` = **5.990**, not 6.0. `budgets`'
  `batchingFactor.escalationIfBelow10` carries the same conflation and should be corrected once
  rather than twice `[research: cid/art/style/_lead.md]`.
- **At `batchingFactor` 1 there is no art budget at any size.** Nine lanes of 645 parts are 5,805
  draw calls against a `drawCalls` ceiling of 1,000 before Environment places one stone. Below
  5.990 the lever is `depths.areas[].patchCount` and `budgets` itself says so `[brief: soft]`.
- **Why residency is two-tiered.** `plots.liveGeometry.torndownBeyond` keeps bays k−1 and k−2 as
  walkable geometry, so live-bay-only dressing made the works disappear behind a player who could
  still stand in it. The fix costs **zero instances**: the parapets, kerbs and channel are one
  part each **for the whole lane**, resized at each bay advance exactly as `Plots.luau`'s
  `applyLaneExtent` already resizes the slab `[research: game/src/server/Plots.luau]`. Two parts
  per lane is what two parts per live bay cost, because only one bay was ever dressed. `N12`'s
  no-resize rule is scoped to a patch and does not reach a lane-persistent part.
- **Why bay-resident dressing survives at all.** A family signature is a fraction of *its* bay's
  length, and `endgame` adds bays without bound, so retaining it has no upper limit
  `[brief: binding]` ← *"Endless via shuffled authored chunks"* (`03-META.md`). The residual is
  stated below rather than hidden.
- **Materials and roles now resolve inside `styleGuide`'s closed sets.** `Cobblestone` was not in
  `styleGuide.materials.rows[]` and `litter.leaf` was not in `styleGuide.roles`, and a closed set
  is closed. I substitute inside my own tuple table — the mechanism this sheet already named —
  rather than filing to widen it: `paving` takes `Limestone` (`M1`), the channel and basin take
  `Sandstone` (`M3`, the row written for `P2`), and **`litter` leaves the roster**, adopting
  `styleGuide`'s ruling that `P6` is `Color3` variance at zero instances. Zero revision requests
  and one fewer draw class.
- **Weathering with zero uploaded assets.** `MaterialVariant` and `SurfaceAppearance` both require
  an uploaded texture; base materials require none, their *"texture assets are bundled with
  Studio"* `[research: https://create.roblox.com/docs/parts/materials]`, and `Limestone` and
  `Sandstone` are base materials valid on a `BasePart`
  `[research: https://robloxapi.github.io/ref-temp/enum/Material.html]`. `P7` is carried by the
  material choice alone, identical at every depth by construction (`theme/lore/01` `L4`).
- **No world token layer exists (G3)**, so every value here is a literal
  `[research: ui-forge/src/theme/generate.mjs]`. The mitigation is shape: one named closed
  vocabulary a later token group binds to in one edit. `[cid: decided]` on the shape.
- **Nothing in either contract can create these parts.** `representation` has nine subjects and
  none is dressing; `Plots.luau` builds a slab, patches, four boundary parts and one `Attachment`.
  `RR-E1` below files the same request `vfx/02` `RR-V2` filed for effect hosts, so the two are
  answered together.

### The tuple vocabulary — ten entries; an eleventh is a revision against this sheet

Size is `[X, Y, Z]`; `*` is parametric and its rule is named where the class is spent. Every entry
is `Anchored`, `Reflectance` 0, `Transparency` 0, `CanTouch` false. Every `material` is a
`styleGuide.materials.rows[].enum`; every `colourRole` is a key of `styleGuide.roles`.

| # | classId | roster | Size (studs) | Material | row | colourRole | collides | shadow | residency | spent by |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `paving` | `P1` | `laneWidthStuds` × 1 × `*` | `Limestone` | `M1` | `stone.cleared` | yes | yes | lane (the existing slab; 0 new) | 03 |
| 2 | `kerb` | `P1` | 1.5 × 0.4 × `*` | `Limestone` | `M2` | `stone.built` | yes | no | lane | 03, 04 |
| 3 | `parapet` | `P1` | 1.5 × 2.5 × `*` | `Limestone` | `M2` | `stone.built` | yes | yes | lane | 02 |
| 4 | `crossWall` | `P1` | `*` × 4 × 2 | `Limestone` | `M2` | `stone.built` | yes | yes | live bay | 02 |
| 5 | `pier` | `P1` | 4 × 12 × 4 | `Limestone` | `M2` | `stone.built` | yes | yes | live bay | 04 |
| 6 | `vaultStrip` | `P1` | `laneWidthStuds` × 2 × 6 | `Limestone` | `M2` | `stone.built` | no | yes | live bay | 04 |
| 7 | `channel` | `P2` | 6 × 0.2 × `*` | `Sandstone` | `M3` | `stone.built` | no | no | lane | 03 |
| 8 | `basin` | `P2` | 10 × 0.8 × 10 | `Sandstone` | `M3` | `stone.built` | yes | no | live bay | 03, 04 |
| 9 | `canopy` | `P9` | `*` × 60 × 40 | `Grass` | `M9` | `canopy.leaf` | no | yes | place | 05 |
| 10 | `trunk` | `P9` | 5 × 44 × 5 | `Wood` | `M10` | `canopy.trunk` | no | yes | place | 05 |

### Realised as zero parts, deliberately, with the reason

| roster class | realised as | why |
|---|---|---|
| `P3` fixed fittings and hand-cut mechanism | **0 parts** | one fitting costs the same as one pier against a 16-instance lane; reopens only if `clientStreamedInstanceCeiling` is measured above 6,000 |
| `P4` loose objects | **0 parts** | every member is a `Find` and `representation.find` gives a Find no Instance |
| `P6` litter over paving | **0 parts** | `styleGuide.roles` carries no litter role and rules `P6` as `Color3` variance inside the stone bands at zero instances; adopted, not contested |
| `P7` weathering | **0 parts** | carried by `Material` alone; every other route is an uploaded image asset |
| `P8` open sky | **0 parts** | sheet `05`; no `Sky` instance ships |
| restored-versus-overgrown second look | **0 parts** | `theme/setting/04`: *"the same stone, with and without plants on it"*; `W1` |
| landmark, hero part, monument | **0 parts** | ruled to zero by four sheets; recorded as data in sheet `04` |

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
| X8 | cloth, banners, rope, lanterns, braziers, water of any kind, wet or reflective surface | `theme/setting/05`, `A6`, `A7` |
| X9 | cut lettering, carved figures, relief figures, gilding, gemstones | `theme/setting/01`, `theme/lore/01` |
| X10 | seasonal dressing, festival decoration, harvest or anniversary marker | `03-META.md` priority 3 |
| X11 | leaderboard plinth, podium, trade counter, gift container, reward cache, code surface | `03-META.md` priority 3 |
| X12 | a reserved region, empty plinth, bare wall or unused corner held open for any of the above | category brief scope gate |
| X13 | a per-depth material, colour or wear difference | `theme/lore/01` `L4`, `theme/setting/03` |
| X14 | an eleventh part class, at any depth, for any reason | `theme/setting/05`: the present column is closed |
| X15 | a material outside `styleGuide.materials.rows[].enum` or a role outside `styleGuide.roles` | `styleGuide.materials.closed` true |

```manifest
{
  "provides": "environment",
  "status": "proposed",
  "value": {
    "oneLine": "One works of warm pale dressed stone, ten part classes drawn once each, running the length of the lane where it runs and dressed in the live bay where it does not.",
    "materials": ["Limestone", "Sandstone", "Grass", "Wood"],
    "materialsAllResolveIn": "styleGuide.materials.rows[].enum",
    "colourRolesAllResolveIn": "styleGuide.roles",
    "colourRolesUsed": ["stone.cleared", "stone.built", "canopy.leaf", "canopy.trunk"],
    "distinctDrawClasses": 10,
    "tupleRule": "one classId, one tuple, forever. A parametric axis is a length rule, never a second tuple, and a 90-degree rotation about Y is an orientation, not a second tuple. An eleventh tuple is a revision against this sheet.",
    "parametricAxisMayRotate90AboutY": true,
    "tuples": [
      { "classId": "paving",     "roster": "P1", "sizeStuds": ["plots.laneWidthStuds", 1, "the summed lengths of plots.bays[1..live]"], "material": "Limestone", "styleGuideRow": "M1", "colourRole": "stone.cleared", "canCollide": true,  "canTouch": false, "canQuery": true,  "castShadow": true,  "residency": "lane", "newInstances": 0 },
      { "classId": "kerb",       "roster": "P1", "sizeStuds": [1.5, 0.4, "parametric"],  "material": "Limestone", "styleGuideRow": "M2", "colourRole": "stone.built",   "canCollide": true,  "canTouch": false, "canQuery": false, "castShadow": false, "residency": "lane" },
      { "classId": "parapet",    "roster": "P1", "sizeStuds": [1.5, 2.5, "parametric"],  "material": "Limestone", "styleGuideRow": "M2", "colourRole": "stone.built",   "canCollide": true,  "canTouch": false, "canQuery": false, "castShadow": true,  "residency": "lane" },
      { "classId": "crossWall",  "roster": "P1", "sizeStuds": ["parametric", 4, 2],      "material": "Limestone", "styleGuideRow": "M2", "colourRole": "stone.built",   "canCollide": true,  "canTouch": false, "canQuery": false, "castShadow": true,  "residency": "liveBay" },
      { "classId": "pier",       "roster": "P1", "sizeStuds": [4, 12, 4],                "material": "Limestone", "styleGuideRow": "M2", "colourRole": "stone.built",   "canCollide": true,  "canTouch": false, "canQuery": false, "castShadow": true,  "residency": "liveBay" },
      { "classId": "vaultStrip", "roster": "P1", "sizeStuds": ["plots.laneWidthStuds", 2, 6], "material": "Limestone", "styleGuideRow": "M2", "colourRole": "stone.built", "canCollide": false, "canTouch": false, "canQuery": false, "castShadow": true, "residency": "liveBay" },
      { "classId": "channel",    "roster": "P2", "sizeStuds": [6, 0.2, "parametric"],    "material": "Sandstone", "styleGuideRow": "M3", "colourRole": "stone.built",   "canCollide": false, "canTouch": false, "canQuery": false, "castShadow": false, "residency": "lane" },
      { "classId": "basin",      "roster": "P2", "sizeStuds": [10, 0.8, 10],             "material": "Sandstone", "styleGuideRow": "M3", "colourRole": "stone.built",   "canCollide": true,  "canTouch": false, "canQuery": false, "castShadow": false, "residency": "liveBay" },
      { "classId": "canopy",     "roster": "P9", "sizeStuds": ["parametric", 60, 40],    "material": "Grass",     "styleGuideRow": "M9", "colourRole": "canopy.leaf",   "canCollide": false, "canTouch": false, "canQuery": false, "castShadow": true,  "residency": "place" },
      { "classId": "trunk",      "roster": "P9", "sizeStuds": [5, 44, 5],                "material": "Wood",      "styleGuideRow": "M10", "colourRole": "canopy.trunk", "canCollide": false, "canTouch": false, "canQuery": false, "castShadow": true,  "residency": "place" }
    ],
    "commonPartProperties": { "anchored": true, "reflectance": 0, "transparency": 0, "canTouch": false },
    "residency": {
      "tiers": {
        "lane": { "classes": ["paving", "kerb", "parapet", "channel"], "rule": "one part per lane per side, spanning bay 1 to the live bay, resized at each bay advance exactly as Plots.luau applyLaneExtent already resizes the slab", "destroyedAt": "lane teardown only", "instanceCostIsIndependentOfBayCount": true },
        "liveBay": { "classes": ["crossWall", "pier", "vaultStrip", "basin"], "rule": "created at plots.liveGeometry.bayBuiltAt, destroyed with the bay it dressed", "residentBays": 1 },
        "place": { "classes": ["canopy", "trunk"], "rule": "built once at place start, never rebuilt" }
      },
      "endgameCost": 0,
      "endgameSafeBecause": "no tier's count grows with the number of bays; the lane tier grows one part's Size, not its count",
      "retainedBaySeam": {
        "field": "plots.liveGeometry.torndownBeyond",
        "retains": "bays more than two outward of the live one are destroyed; k-1 and k-2 persist as walkable geometry",
        "closedByLaneTier": ["paving", "kerb", "parapet", "channel"],
        "residual": "a player standing in bay k-1 or k-2 sees no cross-wall at that bay's outward boundary and no family signature; the parapets, kerbs, channel and paving are continuous",
        "residualBarStatus": "bar (a): a player can see it. Judged acceptable because nothing is removed within view at the instant it changes - the outward wall of bay k-1 sits 210 to 480 studs behind a player who has just reached bay k, at or beyond budgets.streaming.StreamingTargetRadius 512 for the deeper bays",
        "reversingField": "residency.tiers.liveBay.residentBays, raised to 3",
        "reversalCost": "crossWall 4 -> 8 and chunkDressing 6 -> 18 per lane, i.e. 16 -> 32 per lane, which is 9 x 32 + 6 + 35 = 329 against 186 of headroom and does not fit"
      }
    },
    "allowance": {
      "residentInstancesPerLane": 16,
      "sharedPlaceInstances": 24,
      "sharedMaxStreamedConcurrently": 6,
      "perConsumerPerLane": { "builtEdge": 6, "groundwork": 4, "chunkDressing": 6, "reserve": 0 },
      "perConsumerShared": { "backdrop": 24 },
      "perClientReservation": { "effects": { "worstCase": 35, "realistic": 17, "derivation": "vfx/01 budget.clientInstancesAdded 8 + concurrentRevealObjectsOnOneScreen 27 (9 realistic)", "reservedAt": "worstCase" } },
      "whatGaveUpTheTwo": ["groundwork's litter mat, struck under styleGuide's zero-instance ruling on P6", "the one-instance reserve"],
      "spendingRule": "a consumer that wants a part it cannot afford files against this sheet. There is no reserve to take and no consumer may take another's."
    },
    "derivation": {
      "clientHeadroom": "budgets.instanceCeilings.clientStreamedInstanceCeiling - budgets.instanceCeilings.clientStreamedInstancesWorstCase",
      "clientIdentity": "9 * residentInstancesPerLane + sharedMaxStreamedConcurrently + perClientReservation.effects.worstCase <= clientHeadroom, i.e. 144 + 6 + 35 = 185 of 186",
      "serverCost": "runtime.maxPlayers * (max(depths.areas[].patchCount) + 6 + residentInstancesPerLane) + sharedPlaceInstances = 16 * 662 + 24 = 10616",
      "serverCeilingField": "budgets.instanceCeilings.serverWorldInstanceCeiling",
      "instancesVersusParts": "instance ceilings take budgets.instanceCeilings.laneInstanceFormula (646, including the spawn Attachment); draw calls take lanePartFormula (645). budgets' own batchingFactor.escalationIfBelow10 states 5814 draw calls where the parts figure is 5805, and should be corrected there rather than in two art keys.",
      "allCeilingsStatus": "playtest unknown"
    },
    "budgetAtBatchingFactor": {
      "at50": { "partsOnScreenWorstCase": 5990, "drawCallsUsed": 120, "drawCallCeilingField": "budgets.renderCeilings.drawCalls", "binds": "instanceCeiling" },
      "at1":  { "partsOnScreenWorstCase": 5990, "drawCallsUsed": 5990, "binds": "drawCalls", "verdict": "void: patches alone are 5805 parts against 1000, so no art budget exists at any size and no legal streaming radius closes it" },
      "batchingFactorFloor": 5.990,
      "batchingFactorFloorDerivation": "(9 * (lanePartFormula(640) + 16) + 6 + 35) / budgets.renderCeilings.drawCalls",
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
    "revisionRequests": [
      {
        "id": "RR-E1",
        "against": ["architect/sheets/06-representation.md", "architect/sheets/02-modules.md"],
        "change": "add a representation subject 'lane-dressing' whose creator is the plots module, covering every classId in environment.tuples whose residency is lane or liveBay",
        "creatorProposed": "Plots.spawn and the bay-advance path in game/src/server/Plots.luau, which already create the slab, four boundary parts and the spawn Attachment and already hold the lane record",
        "parentProposed": "the lane slab Part, so one Destroy tears the lane down and N11's single-Destroy teardown is unchanged",
        "why": "representation has nine subjects and none is dressing; no module in the build order would create a parapet, so environment, builtEdge, groundwork and chunkDressing merge as data nothing can build",
        "sameShapeAs": "vfx/02 RR-V2, which files the identical gap for effect hosts; answer them together",
        "refusable": true,
        "ifRefused": "these five keys are a design record with no build path, and the category should say so rather than ship four keys nothing reads"
      }
    ],
    "forbiddenMechanisms": ["Decal", "Texture", "MaterialVariant", "SurfaceAppearance", "ParticleEmitter", "Beam", "Trail", "Fire", "Smoke", "Sparkles", "PointLight", "SpotLight", "SurfaceLight", "Atmosphere", "Clouds", "Sky", "rbxassetid"],
    "playerFacingStrings": 0,
    "landmarks": 0,
    "seasonalEventOrHourChannels": 0,
    "schemaNote": "environment, builtEdge, groundwork, chunkDressing and backdrop are five keys because bridge/merge.mjs gives a key exactly one supplying sheet. If the schema maintainer prefers one key, they are its five top-level blocks and no sheet's content changes."
  }
}
```

## Consequences for other work

- **VFX work (`effects`)** is funded rather than assumed: 35 streamed instances are reserved at
  its stated worst case, so its budget is solvent without changing one of its figures. It should
  cite `environment.allowance.perClientReservation.effects` rather than restate 8 and 27.
- **Detail-budget work (`style/03`)** takes `perLane.total` and `shared.total` from
  `environment.allowance.residentInstancesPerLane` and `.sharedPlaceInstances` by field, and adds
  the effects reservation to its envelope. Its minimum batching factor is recomputable from
  `batchingFactorFloor` 5.990 and no longer needs its own derivation.
- **Device-ceiling work (`budgets`)** owes one correction inside its own key —
  `batchingFactor.escalationIfBelow10` says 5,814 draw calls where the parts figure is 5,805 —
  and gains a two-column `environmentInstancesPerLane` plus a shared column and a per-client
  effects reservation.
- **Plot-and-lane work (`plots`)** gains the teardown subject `representation.plot` predicted, and
  a second fact: four classes are lane-persistent and are resized by the same call that resizes
  the slab, so a bay advance is one `Size` write on five parts rather than a rebuild.
- **Module and representation work** holds `RR-E1`, which is `vfx/02` `RR-V2`'s request for a
  different subject. Answering one without the other leaves half the world uncreatable.
- **Style Guide work (`styleGuide`)** is asked for **nothing**. Its material list and role set are
  closed and I resolved inside them; `Cobblestone` and `litter.leaf` are withdrawn.
- **Optimisation-limit work (`N1`–`N17`)** gets savings pre-taken: `CanTouch` false on all ten
  classes, `CanQuery` false on nine, `CastShadow` false on three. None is an LOD, a merge, a pool
  or a height collapse.

## Flagged to the developer

The brief says nothing about how the world looks — `theme/setting/05` records that *"no sheet in
six mentions water, sky, wind, wear, debris, furniture, roads or remains"* — so the four calls
below are mine, and each reverses with one field.

| decision | alternative not taken | reversing field | my recommendation |
|---|---|---|---|
| Ten part classes, one tuple each | a richer roster with per-class size variants, which reads better and costs one draw class per variant | `environment.tuples` | keep ten until a device reading exists; the ceiling is unmeasured and this is the cheap end |
| 16 + 24 with effects reserved at worst case | reserve effects at its realistic 17 and take two more parts per lane | `allowance.perClientReservation.effects.reservedAt` | keep worst case; a budget that fails when the game goes well is the wrong budget |
| Lane-persistent edge, bay-resident signature | retain everything for three bays, which needs 32 per lane and does not fit | `residency.tiers.liveBay.residentBays` | keep, and reopen the moment `clientStreamedInstanceCeiling` is measured |
| `P3` and `P6` at zero parts | one fitting and one litter mat per bay, at 2 of 16 | the zero-parts table | keep; they are the two cheapest things to add back first if headroom appears |

## Acceptance criteria

1. `environment.tuples` has exactly 10 entries and `environment.distinctDrawClasses === 10`; every
   `material` appears in `styleGuide.materials.rows[].enum` and every `colourRole` is a key of
   `styleGuide.roles`.
2. `9 × environment.allowance.residentInstancesPerLane +
   environment.allowance.sharedMaxStreamedConcurrently +
   environment.allowance.perClientReservation.effects.worstCase ≤
   budgets.instanceCeilings.clientStreamedInstanceCeiling −
   budgets.instanceCeilings.clientStreamedInstancesWorstCase` (185 ≤ 186); and
   `runtime.maxPlayers × (max(depths.areas[].patchCount) + 6 + 16) + 24 ≤
   budgets.instanceCeilings.serverWorldInstanceCeiling`.
3. `environment.allowance.perConsumerPerLane` sums to `residentInstancesPerLane`, and every class
   whose `residency` is `lane` is created once per lane, not once per bay.
4. A grep for `rbxassetid|MaterialVariant|SurfaceAppearance|Decal|Texture|Cobblestone|litter\.leaf`
   over every value in the five keys this domain supplies returns zero matches, and
   `environment.weathering.channels` is exactly `["material"]`.

## Not decided here

Which zones exist, their counts, footprints, patch counts and bay lengths — `depths`, `layout`
and `plots`. Every hue, hex, rgb and the closed `Enum.Material` list itself — `styleGuide`;
minimum feature size and ornament count — `formLanguage`. Where each part stands — sheets `02` to
`05`. Whether `representation` accepts `RR-E1`, and which module creates a parapet — the
architect. Whether a device reading is ever taken — **unowned in both contracts**. Whether these
five keys are promoted or collapsed into one — the schema maintainer.
