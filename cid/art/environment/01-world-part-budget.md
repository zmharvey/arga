# 01 — The world part budget

**Domain:** art/environment · **Category:** Art & Visuals · **Wave:** 6 · **Revision:** round 2

## Decision

Ten world part classes exist and no eleventh may be added; each is bound to exactly one
`(classId, Size, Material, colourRole)` tuple, so `environment.distinctDrawClasses` is **10**,
statically countable, and is the whole density strategy. The allowance is **16 resident instances
per lane and 20 shared place-wide, of which at most 6 stream at once**, against a **hard bound of
11 for `effects`** — `9 × 16 + 6 + 11 = 161` of 186, and a draw-call floor of **5.966**. Dressing
is **lane-persistent where it runs along the lane and bay-resident where it does not**, so the
built edge grows with the slab instead of vanishing behind the player.

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
  `clientStreamedInstancesWorstCase` (5,814) = **186**. Round 1's 18 + 24 spent all of it and left
  `effects` nothing. The arbitrated totals are **16 per lane, 6 streamed shared, 11 for effects =
  161**, with 25 spare. **The two given up in round 1 were `groundwork`'s litter mat and the
  reserve**; the release below is what buys them back.
- **`effects` is a bound, not a reservation against an estimate.** Its need is 8 clear-host
  instances plus `concurrentRevealObjectsPerPlayer` 3 reveal `Part`s = **11**, and VFX cut it from
  a 35-instance reserve by moving the reveal object client-side
  `[research: cid/art/vfx/01-the-clear-and-the-reveal.md]`. Both terms are **per-player**
  concurrency ceilings, so neither scales with loaded lanes or with `runtime.maxPlayers` — which
  is why 11 is a bound and 35 was a worst case. My round-1 derivation cited the superseded
  `8 + 27` and is corrected here.
- **The floor, with its working.** `9 × lanePartFormula(640)` = `9 × 645` = 5,805 patches and
  paving; `9 × (645 + 16)` = **`9 × 661 = 5,949`**; `+ 6` streamed backdrop `+ 11` effects =
  **5,966** parts on screen at the worst case, so `batchingFactorFloor` is `5,966 / 1,000` =
  **5.966**. Style Guide re-derived the same figure and I read theirs rather than carry a second
  one; round 1's 5.990 was computed at the old reservation and is struck.
- **Which shared figure enters which sum, ruled by Style Guide and read here, not re-decided.**
  `sharedMaxStreamedConcurrently` (6) enters the **client and draw-call** sums;
  `sharedPlaceInstances` (20) enters the **server** sum. `clientStreamedInstanceCeiling` is a
  *streamed* figure, so charging place-wide parts against it double-counts; the server ceiling
  counts what exists. Both pass either way, so this is a naming ruling and not a budget change.
- **Instances and parts are different quantities and `budgets` conflates them.** Draw calls take
  `lanePartFormula` (645); instance ceilings take `laneInstanceFormula` (646), which counts the
  spawn `Attachment`. So the correct statement is **5,805 parts**, not 5,814 draw calls. `budgets`'
  `batchingFactor.escalationIfBelow10` carries the same conflation and should be corrected once
  rather than in two art keys `[research: cid/art/style/_lead.md]`.
- **At `batchingFactor` 1 there is no art budget at any size.** Nine lanes of 645 parts are 5,805
  draw calls against a `drawCalls` ceiling of 1,000 before Environment places one stone. Below
  5.966 the lever is `depths.areas[].patchCount` and `budgets` itself says so `[brief: soft]`.
- **Why residency is two-tiered, and why it is a property of the placement.**
  `plots.liveGeometry.torndownBeyond` keeps bays k−1 and k−2 walkable, so live-bay-only dressing
  made the works disappear behind a player still standing in it. The fix costs **zero instances**:
  parapets, kerbs and the channel are one part each **for the whole lane**, resized at each bay
  advance exactly as `applyLaneExtent` already resizes the slab
  `[research: game/src/server/Plots.luau]` — a part spanning bays 1..k is one part. `N12`'s
  no-resize rule is scoped to a patch and does not reach a lane-persistent part. **`kerb` appears
  in both tiers**: `groundwork`'s edge courses run along the lane, `chunkDressing`'s Terrace lips
  cross one bay.
- **Why bay-resident dressing survives at all.** A family signature is a fraction of *its* bay's
  length, and `endgame` adds bays without bound, so retaining it has no upper limit
  `[brief: binding]` ← *"Endless via shuffled authored chunks"* (`03-META.md`). The residual is
  stated below rather than hidden, and its reversal cost is **34 per lane**, not round 1's 32:
  5 lane-persistent + 8 cross-wall + 3 basin + 18 signature.
- **Materials and roles resolve inside `styleGuide`'s closed sets.** `Cobblestone` was not in
  `styleGuide.materials.rows[]` and `litter.leaf` was not in `styleGuide.roles`, and a closed set
  is closed. I substitute inside my own tuple table: `paving` takes `Limestone` (`M1`), the channel
  and basin take `Sandstone` (`M3`, the row written for `P2`), and **`litter` leaves the roster**,
  adopting `styleGuide`'s ruling that `P6` is `Color3` variance at zero instances.
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
  `RR-E1` files the same request `vfx/02` `RR-V2` filed for effect hosts.

### The tuple vocabulary — ten entries; an eleventh is a revision against this sheet

Size is `[X, Y, Z]`; `*` is parametric and its rule is named where the class is spent. Every entry
is `Anchored`, `Reflectance` 0, `Transparency` 0, `CanTouch` false. Every `material` is a
`styleGuide.materials.rows[].enum`; every `colourRole` is a key of `styleGuide.roles`.

| # | classId | roster | Size (studs) | Material | row | colourRole | collides | shadow | residency | spent by |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `paving` | `P1` | `laneWidthStuds` × 1 × `*` | `Limestone` | `M1` | `stone.cleared` | yes | yes | lane (the existing slab; 0 new) | 03 |
| 2 | `kerb` | `P1` | 1.5 × 0.4 × `*` | `Limestone` | `M2` | `stone.built` | yes | no | lane in 03, live bay in 04 | 03, 04 |
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
| `P6` litter over paving | **0 parts today** | `styleGuide.roles` carries no litter role and rules `P6` as `Color3` variance at zero instances; **first in the buy-back queue** under `allowance.reservationRelease` |
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
      { "classId": "paving",     "roster": "P1", "sizeStuds": ["plots.laneWidthStuds", 1, "the summed lengths of plots.bays[1..live]"], "material": "Limestone", "styleGuideRow": "M1", "colourRole": "stone.cleared", "canCollide": true,  "canTouch": false, "canQuery": true,  "castShadow": true,  "residency": ["lane"], "newInstances": 0 },
      { "classId": "kerb",       "roster": "P1", "sizeStuds": [1.5, 0.4, "parametric"],  "material": "Limestone", "styleGuideRow": "M2", "colourRole": "stone.built",   "canCollide": true,  "canTouch": false, "canQuery": false, "castShadow": false, "residency": ["lane", "liveBay"] },
      { "classId": "parapet",    "roster": "P1", "sizeStuds": [1.5, 2.5, "parametric"],  "material": "Limestone", "styleGuideRow": "M2", "colourRole": "stone.built",   "canCollide": true,  "canTouch": false, "canQuery": false, "castShadow": true,  "residency": ["lane"] },
      { "classId": "crossWall",  "roster": "P1", "sizeStuds": ["parametric", 4, 2],      "material": "Limestone", "styleGuideRow": "M2", "colourRole": "stone.built",   "canCollide": true,  "canTouch": false, "canQuery": false, "castShadow": true,  "residency": ["liveBay"] },
      { "classId": "pier",       "roster": "P1", "sizeStuds": [4, 12, 4],                "material": "Limestone", "styleGuideRow": "M2", "colourRole": "stone.built",   "canCollide": true,  "canTouch": false, "canQuery": false, "castShadow": true,  "residency": ["liveBay"] },
      { "classId": "vaultStrip", "roster": "P1", "sizeStuds": ["plots.laneWidthStuds", 2, 6], "material": "Limestone", "styleGuideRow": "M2", "colourRole": "stone.built", "canCollide": false, "canTouch": false, "canQuery": false, "castShadow": true, "residency": ["liveBay"] },
      { "classId": "channel",    "roster": "P2", "sizeStuds": [6, 0.2, "parametric"],    "material": "Sandstone", "styleGuideRow": "M3", "colourRole": "stone.built",   "canCollide": false, "canTouch": false, "canQuery": false, "castShadow": false, "residency": ["lane"] },
      { "classId": "basin",      "roster": "P2", "sizeStuds": [10, 0.8, 10],             "material": "Sandstone", "styleGuideRow": "M3", "colourRole": "stone.built",   "canCollide": true,  "canTouch": false, "canQuery": false, "castShadow": false, "residency": ["liveBay"] },
      { "classId": "canopy",     "roster": "P9", "sizeStuds": ["parametric", 60, 40],    "material": "Grass",     "styleGuideRow": "M9", "colourRole": "canopy.leaf",   "canCollide": false, "canTouch": false, "canQuery": false, "castShadow": true,  "residency": ["place"] },
      { "classId": "trunk",      "roster": "P9", "sizeStuds": [5, 44, 5],                "material": "Wood",      "styleGuideRow": "M10", "colourRole": "canopy.trunk", "canCollide": false, "canTouch": false, "canQuery": false, "castShadow": true,  "residency": ["place"] }
    ],
    "commonPartProperties": { "anchored": true, "reflectance": 0, "transparency": 0, "canTouch": false },
    "residency": {
      "tierIsAPropertyOfThePlacementNotTheClass": true,
      "tiers": {
        "lane": { "placements": ["groundwork paving", "groundwork kerb", "groundwork channel", "builtEdge parapet"], "rule": "one part per lane per side, spanning bay 1 to the live bay, resized at each bay advance by the same call that resizes the slab (Plots.luau applyLaneExtent). A part spanning bays 1..k is one part.", "destroyedAt": "lane teardown only", "instanceCostIsIndependentOfBayCount": true },
        "liveBay": { "placements": ["builtEdge crossWall", "groundwork basin", "every chunkDressing signature part"], "rule": "created at plots.liveGeometry.bayBuiltAt, destroyed with the bay it dressed", "residentBays": 1 },
        "place": { "placements": ["backdrop canopy", "backdrop trunk"], "rule": "built once at place start, never rebuilt" }
      },
      "endgameCost": 0,
      "endgameSafeBecause": "no tier's count grows with the number of bays; the lane tier grows one part's Size, not its count",
      "retainedBaySeam": {
        "field": "plots.liveGeometry.torndownBeyond",
        "retains": "bays more than two outward of the live one are destroyed; k-1 and k-2 persist as walkable geometry",
        "closedByLaneTier": ["paving", "kerb", "parapet", "channel"],
        "residual": "a player standing in bay k-1 or k-2 sees no cross-wall at that bay's outward boundary, no basin and no family signature; the parapets, kerbs, channel and paving are continuous",
        "residualBarStatus": "bar (a): a player can see it. Judged acceptable because nothing is removed within view at the instant it changes - the outward wall of bay k-1 sits 210 to 480 studs behind a player who has just reached bay k, at or beyond budgets.streaming.StreamingTargetRadius 512 for the deeper bays",
        "reversingField": "residency.tiers.liveBay.residentBays, raised to 3",
        "reversalCostPerLane": 34,
        "reversalCostBreakdown": "5 lane-persistent + 8 crossWall + 3 basin + 18 chunkDressing signature = 34, corrected from round 1's 32",
        "reversalVerdict": "9 * 34 + 6 + 11 = 323 against 186 of headroom; it does not fit. The multiplier depends on which effects figure it is measured against (1.74x at the arbitrated bound of 11, 1.87x at round 1's reserve) and the verdict is invariant."
      }
    },
    "allowance": {
      "residentInstancesPerLane": 16,
      "sharedPlaceInstances": 20,
      "sharedMaxStreamedConcurrently": 6,
      "sharedFieldSplit": { "entersClientAndDrawCallSums": "sharedMaxStreamedConcurrently", "entersServerSum": "sharedPlaceInstances", "ruledBy": "styleGuide, read here and not re-decided", "reason": "clientStreamedInstanceCeiling is a streamed figure, so charging place-wide parts against it double-counts; the server ceiling counts what exists. Both pass either way." },
      "perConsumerPerLane": { "builtEdge": 6, "groundwork": 4, "chunkDressing": 6, "reserve": 0 },
      "perConsumerShared": { "backdrop": 20 },
      "perClientReservation": {
        "effects": {
          "bound": 11,
          "isABoundNotAnEstimate": true,
          "derivation": "vfx/01 budget.clientInstancesAdded 8 clear-host instances + concurrentRevealObjectsPerPlayer 3 reveal Parts",
          "whyABound": "both terms are per-player concurrency ceilings and neither scales with loaded lanes or with runtime.maxPlayers",
          "supersedes": "round 1's 35-instance worst-case reserve; VFX cut its own need by moving the reveal object client-side"
        }
      },
      "spareAgainstClientCeiling": 25,
      "spareComposition": "24 released by the effects change plus the 1 instance round 1 already had spare",
      "reservationRelease": {
        "released": 24,
        "releasedBecause": "the effects figure fell from a 35 reserve to an 11 bound",
        "namedBuyBacks": [ { "what": "groundwork litter mat", "perLane": 1 }, { "what": "builtEdge crossWall pair at the previous boundary", "perLane": 4 } ],
        "bothWouldCostClientInstances": 45,
        "correction": "24 does not fund both. It funds 2 per lane (18 client instances) with 6 of the release over - the litter mat and one cross-wall part. Recorded by styleGuide as reservationRelease.correction; the derivation string is reset here.",
        "queue": ["groundwork litter mat", "one crossWall part at the previous boundary"],
        "notTakenYet": true,
        "takingItRequires": "a revision against this sheet raising residentInstancesPerLane to 18 and the two consumer rows with it"
      },
      "whatGaveUpTheTwoInRoundOne": ["groundwork's litter mat, struck under styleGuide's zero-instance ruling on P6", "the one-instance reserve"],
      "spendingRule": "a consumer that wants a part it cannot afford files against this sheet. There is no reserve to take and no consumer may take another's."
    },
    "derivation": {
      "clientHeadroom": "budgets.instanceCeilings.clientStreamedInstanceCeiling - budgets.instanceCeilings.clientStreamedInstancesWorstCase = 186",
      "clientIdentity": "9 * residentInstancesPerLane + sharedMaxStreamedConcurrently + perClientReservation.effects.bound <= clientHeadroom, i.e. 144 + 6 + 11 = 161 of 186",
      "serverCost": "runtime.maxPlayers * (max(depths.areas[].patchCount) + 6 + residentInstancesPerLane) + sharedPlaceInstances = 16 * 662 + 20 = 10612",
      "serverCeilingField": "budgets.instanceCeilings.serverWorldInstanceCeiling",
      "instancesVersusParts": "instance ceilings take budgets.instanceCeilings.laneInstanceFormula (646, including the spawn Attachment); draw calls take lanePartFormula (645). budgets' own batchingFactor.escalationIfBelow10 states 5814 draw calls where the parts figure is 5805, and should be corrected there rather than in two art keys.",
      "allCeilingsStatus": "playtest unknown"
    },
    "budgetAtBatchingFactor": {
      "partsOnScreenWorstCase": 5966,
      "partsOnScreenWorking": "9 * lanePartFormula(640) = 9 * 645 = 5805 patches and paving; 9 * (645 + 16) = 9 * 661 = 5949; + 6 streamed backdrop + 11 effects = 5966",
      "at50": { "drawCallsUsed": 119.32, "drawCallCeilingField": "budgets.renderCeilings.drawCalls", "binds": "instanceCeiling" },
      "at1":  { "drawCallsUsed": 5966, "binds": "drawCalls", "verdict": "void: patches alone are 5805 parts against 1000, so no art budget exists at any size and no legal streaming radius closes it" },
      "batchingFactorFloor": 5.966,
      "batchingFactorFloorDerivation": "(9 * (lanePartFormula(640) + residentInstancesPerLane) + sharedMaxStreamedConcurrently + perClientReservation.effects.bound) / budgets.renderCeilings.drawCalls = (9 * 661 + 6 + 11) / 1000 = 5.966",
      "supersedes": "round 1's floor, which was computed at the superseded 35-instance effects reserve",
      "agreesWith": "styleGuide, which re-derived the same figure at the arbitrated totals; this key carries no second derivation",
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
        "change": "add a representation subject 'lane-dressing' whose creator is the plots module, covering every classId in environment.tuples whose residency includes lane or liveBay",
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

- **VFX work (`effects`)** has a **bound of 11**, not a reservation of 35, and it earned the
  difference by moving the reveal object client-side. It should cite
  `environment.allowance.perClientReservation.effects.bound` and never restate the superseded pair.
  If a future cue reintroduces a server-replicated reveal object, the bound stops being a bound and
  this key has to be re-cut.
- **Detail-budget work (`style/03`)** owns the canonical shared-field split, which I read rather
  than re-derive, and its floor of **5.966** is the one this key carries. Neither of us holds a
  second derivation; if the totals move, `style/03` re-derives and I follow.
- **Device-ceiling work (`budgets`)** owes one correction inside its own key —
  `batchingFactor.escalationIfBelow10` says 5,814 draw calls where the parts figure is 5,805 — and
  gains an `environmentInstancesPerLane` field, a shared column split by what streams versus what
  exists, and a per-client effects bound.
- **Plot-and-lane work (`plots`)** gains the teardown subject `representation.plot` predicted, and
  a second fact: four placements are lane-persistent and are resized by the same call that resizes
  the slab, so a bay advance is five `Size` writes rather than a rebuild.
- **Module and representation work** holds `RR-E1`, which is `vfx/02` `RR-V2`'s request for a
  different subject. Answering one without the other leaves half the world uncreatable.
- **Style Guide work (`styleGuide`)** is asked for **nothing**. Its material list and role set are
  closed and I resolved inside them; the slab request is `RR-A1`'s alone.
- **Whoever spends the 24 released instances** should know it funds **two per lane, not five**. The
  litter mat and one cross-wall part; the second cross-wall pair stays unfunded and stays queued.

## Flagged to the developer

The brief says nothing about how the world looks — `theme/setting/05` records that *"no sheet in
six mentions water, sky, wind, wear, debris, furniture, roads or remains"* — so the four calls
below are mine, and each reverses with one field.

| decision | alternative not taken | reversing field | my recommendation |
|---|---|---|---|
| Ten part classes, one tuple each | a richer roster with per-class size variants, which reads better and costs one draw class per variant | `environment.tuples` | keep ten until a device reading exists; the ceiling is unmeasured and this is the cheap end |
| 16 + 20 shared, with 25 spare left unspent | spend the release now on the litter mat and a cross-wall part | `allowance.reservationRelease.notTakenYet` | spend it, but only after the batching factor is measured — 25 spare against an unmeasured ceiling is the only margin this domain has |
| Lane-persistent edge, bay-resident signature | retain everything for three bays, which needs 34 per lane and does not fit | `residency.tiers.liveBay.residentBays` | keep, and reopen the moment `clientStreamedInstanceCeiling` is measured |
| `P3` and `P6` at zero parts | one fitting and one litter mat per bay | the zero-parts table | the litter mat is now funded and first in the queue; the fitting stays out |

## Acceptance criteria

1. `environment.tuples` has exactly 10 entries and `environment.distinctDrawClasses === 10`; every
   `material` appears in `styleGuide.materials.rows[].enum` and every `colourRole` is a key of
   `styleGuide.roles`.
2. `9 × environment.allowance.residentInstancesPerLane +
   environment.allowance.sharedMaxStreamedConcurrently +
   environment.allowance.perClientReservation.effects.bound ≤
   budgets.instanceCeilings.clientStreamedInstanceCeiling −
   budgets.instanceCeilings.clientStreamedInstancesWorstCase` (161 ≤ 186); and
   `runtime.maxPlayers × (max(depths.areas[].patchCount) + 6 + 16) +
   environment.allowance.sharedPlaceInstances ≤
   budgets.instanceCeilings.serverWorldInstanceCeiling` (10,612 ≤ 12,000).
3. `environment.budgetAtBatchingFactor.batchingFactorFloor` is **5.966**, equals `styleGuide`'s
   re-derived floor, and is the only floor value asserted anywhere in this domain's five sheets;
   every occurrence of a superseded figure sits inside a `supersedes` field or the sentence that
   strikes it, and zero occurrences assert one as live.
4. `environment.allowance.perConsumerPerLane` sums to `residentInstancesPerLane`; every placement
   listed under `residency.tiers.lane` is created once per lane, not once per bay; and a grep for
   `rbxassetid|MaterialVariant|SurfaceAppearance|Decal|Texture|Cobblestone|litter\.leaf` over
   every value in the five keys this domain supplies returns zero matches.

## Not decided here

Which zones exist, their counts, footprints, patch counts and bay lengths — `depths`, `layout`
and `plots`. Every hue, hex, rgb and the closed `Enum.Material` list itself — `styleGuide`, which
also owns the shared-field split and the canonical floor; minimum feature size and ornament count
— `formLanguage`. Where each part stands — sheets `02` to `05`. Whether `representation` accepts
`RR-E1`, and which module creates a parapet — the architect. `StreamingTargetRadius`,
`runtime.maxPlayers` and whether a device reading is ever taken — `budgets` and **unowned**.
Whether these five keys are promoted or collapsed into one — the schema maintainer.
