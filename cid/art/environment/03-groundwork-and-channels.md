# 03 — Groundwork and channels

**Domain:** art/environment · **Category:** Art & Visuals · **Wave:** 6 · **Revision:** round 1

## Decision

The walkable surface is the **existing lane slab in `Limestone` at `stone.cleared`** — zero new
instances, and **`art/style/01` `RR-A1` carries the whole request, material and colour together;
I withdraw my competing `Cobblestone` and cite theirs.** Over it, four parts: **two kerbs and one
dry channel running the whole built length of the lane**, resized with the slab, and **one basin
in the live bay**. The litter mat is struck. Cleared stone holds Rec.601 luma ≥ 165 per part by a
two-part instrument, the rendered half of which **nobody owns taking**.

## Why

- **Why `Limestone` and not `Cobblestone`.** `styleGuide.materials` is `"closed": true` with
  eleven rows and no `Cobblestone`; row `M1` binds `Limestone` to `stone.cleared` on *"the lane
  slab and cleared paving"*. Style Guide owns the material list and I own placement, so the
  presumption runs its way and I have no argument that beats a closed set — my case for
  `Cobblestone` was the visible dressed-joint pattern that `theme/setting/01` names as an ornament
  channel, and `M2`'s `Limestone` on every vertical surface plus `M3`'s `Sandstone` on the
  waterwork already give the register two steps without a third. **One property, one value,
  `Limestone`.**
- **Why one request and not two.** `style/01` `RR-A1` and my earlier request both targeted
  `Plots.luau:534` and `representation.plot`, and two requests naming one property produce two
  answers. `RR-A1` carries material *and* colour; this sheet cites it by id and files nothing, so
  my acceptance criterion and `style/01`'s criterion 4 now name the same enum by construction
  rather than by agreement.
- **The ground fails the one criterion it is entirely about, today.** `Plots.luau:534` sets
  `slab.Material = Enum.Material.Slate` as a hardcoded literal owned by no key and the file
  assigns `slab.Color` nowhere, so the slab renders at Roblox's default `[163,162,165]` → Rec.601
  luma **162.64**, 2.4 below the floor with `R − B = −2` `[research: game/src/server/Plots.luau]`.
  That is the most directly checkable component of *"nothing really looks good"*
  `[research: cid/_playtest.md]` inside this domain.
- **Why the kerbs and channel are lane-persistent.** `plots.liveGeometry.torndownBeyond` retains
  bays k−1 and k−2 as walkable, and bay-resident groundwork emptied them. A kerb and a channel run
  *along* the lane, so one part each spanning `plots.bays[live].zEnd`, resized by the same call
  that resizes the slab, closes the seam at **zero instance cost**
  `[research: game/src/server/Plots.luau]`. The basin cannot follow: it sits at a fraction of its
  own bay.
- **Why the litter mat is struck.** `styleGuide.roles` carries no litter role and rules `P6` as
  `Color3` variance inside the stone bands at zero instances. A closed role set is closed, so I
  adopt the ruling rather than file to widen it — and the freed instance is one of the two that
  fund `effects` under `environment.allowance`. The cost is real and stated: `P6` was the only
  class in the roster that said the place is unattended, since `theme/lore/01` `L5` forbids fallen
  stone and `D14` forbids staged remains. **Nothing now depicts neglect except the green itself**,
  which is what a player clears, so the place reads as tended the moment they finish. That is the
  loss, and it is the first thing to buy back if headroom appears.
- **Why the channel is one part and flush.** `theme/setting/05` `P2` calls the channel-and-basin
  network *"the connective tissue that makes the parts one works"*, and the opening in sheet `02`
  reads as construction-that-was-always-open only because the channel passes through it. A
  0.2-stud non-colliding bed strip never trips a phone player and needs no change to `movement` or
  `traversal`. A recessed trough is unavailable: the slab is one part and cannot hold a hole.
- **Why the basin collides and the channel does not.** A basin reads as a basin only with a rim,
  and 0.8 studs is well inside a `Humanoid`'s default step-up, so it is stepped over rather than
  stopped at. The channel at 0.2 is below the height where walking through a visible solid reads
  as a defect.
- **Weathering is the material and nothing else** (`environment.weathering.channels`), so *"worn
  tread"* is `Limestone`'s own bundled surface, identical at every depth by construction
  (`theme/lore/01` `L4`).

### The part list — every position parametric

`W` is `plots.laneWidthStuds`; `k` is the live bay; `Zb` is `plots.bays[live].zEnd`.

| # | classId | count | residency | centre X | centre Y | Z span | Size | collides |
|---|---|---|---|---|---|---|---|---|
| 1 | `kerb` | 2 | lane | `±(W/2 − 2.25)` | 0.2 | `0` → `Zb` | 1.5 × 0.4 × `Zb` | yes |
| 2 | `channel` | 1 | lane | 0 | 0.1 | `0` → `Zb` | 6 × 0.2 × `Zb` | no |
| 3 | `basin` | 1 | live bay | 0 | 0.4 | `bays[k].zEnd − 12` | 10 × 0.8 × 10 | yes |

The slab is not in this table because it is not a new instance: it already counts inside
`budgets.instanceCeilings.laneInstanceFormula`'s `+ 6`, and `RR-A1` changes two of its properties.

### Prohibitions this sheet carries, each countable

| # | zero of | source |
|---|---|---|
| G1 | water, standing or moving, in any channel or basin; wet, dark or reflective stone | `theme/setting/05` `A6`, `theme/setting/01` |
| G2 | soil, earth, mud, sand or a planting bed anywhere on the paving | `P6`: litter over paving, *no soil* |
| G3 | a drain grate, sluice plate, stopcock or any operable fitting in a channel | `A11`/`A12`; `Sluice` and `Grate` are live Find names |
| G4 | cut lettering, a measure mark, a survey mark, a boundary stone or a level datum on the paving | `theme/setting/05` `A25`, `theme/setting/01` |
| G5 | a second paving material, a paving inlay, a border course or a patterned panel | one tuple per class; `environment.distinctDrawClasses` |
| G6 | a colour, material or wear difference between a cleared bay's ground and the live bay's | `theme/setting/04` `W1`: a finished part gains nothing |
| G7 | a **basin** in any bay other than the live one; the kerbs and channel are lane-persistent and are exempt | `environment.residency.tiers` |
| G8 | a `Decal`, `Texture`, `MaterialVariant` or `SurfaceAppearance` used to fake a stain or a joint | `uploadedImageAssetsInWorldGeometry` 0, `N17` |
| G9 | any part whose `Reflectance` is above 0 | `A6`, `A7` |
| G10 | a litter, leaf-mat or ground-cover instance of any kind | `styleGuide`'s zero-instance ruling on `P6`, adopted |
| G11 | a kerb or channel rebuilt rather than resized at a bay advance | `environment.residency.tiers.lane` |

```manifest
{
  "provides": "groundwork",
  "status": "proposed",
  "value": {
    "instancesPerLane": 4,
    "allowanceField": "environment.allowance.perConsumerPerLane.groundwork",
    "coordinateRule": "every position is an expression over plots.bays[k] and plots.laneWidthStuds; this key contains no world coordinate",
    "slab": {
      "isANewInstance": false,
      "countedIn": "budgets.instanceCeilings.laneInstanceFormula's +6",
      "material": "Limestone",
      "styleGuideRow": "M1",
      "colourRole": "stone.cleared",
      "topFaceY": 0,
      "reflectance": 0,
      "shippedToday": { "material": "Slate", "colorAssigned": false, "renderedDefaultRgb": [163, 162, 165], "renderedLuma": 162.64, "passesLumaFloor": false },
      "revisionRequestOwner": "styleGuide.revisionRequests[RR-A1], cid/art/style/01-palette-and-materials.md",
      "revisionRequestFiledHere": 0,
      "withdrawn": { "change": "Slate -> Cobblestone", "reason": "styleGuide.materials is closed and holds no Cobblestone row; Style Guide owns the material list and this sheet owns placement, so the closed set decides. RR-A1 carries material and colour as one edit." },
      "thisSheetSupplies": "placement, geometry and the luma instrument; not the material value and not the colour value"
    },
    "parts": [
      { "classId": "kerb",    "count": 2, "residency": "lane",    "centreXRule": "+/- (plots.laneWidthStuds/2 - 2.25)", "centreY": 0.2, "zSpan": [0, "plots.bays[live].zEnd"], "lengthRule": "plots.bays[live].zEnd", "growthRule": "resized with the slab at plots.liveGeometry.bayBuiltAt", "canCollide": true,  "role": "the paving's edge course, inside the parapet's inner face" },
      { "classId": "channel", "count": 1, "residency": "lane",    "centreX": 0, "centreY": 0.1, "zSpan": [0, "plots.bays[live].zEnd"], "lengthRule": "plots.bays[live].zEnd", "growthRule": "resized with the slab at plots.liveGeometry.bayBuiltAt", "canCollide": false, "role": "the dry bed, running the lane centre and through every opening" },
      { "classId": "basin",   "count": 1, "residency": "liveBay", "centreX": 0, "centreY": 0.4, "centreZRule": "plots.bays[k].zEnd - 12", "canCollide": true, "role": "the run's dry catchment, clear of the retaining wall by 5 studs" }
    ],
    "channelContinuity": {
      "passesThroughOpeningAtX": 0,
      "openingWidthField": "builtEdge.opening.widthStuds",
      "clearanceEachSideStuds": 5,
      "terminatesAtAWall": false,
      "dry": true,
      "holdsWater": false,
      "continuousAcrossEveryBuiltBay": true
    },
    "litter": { "instances": 0, "ruling": "styleGuide rules P6 as Color3 variance inside the stone bands at zero instances; adopted", "costStated": "nothing now depicts neglect except the green a player clears", "reversingField": "environment.allowance.perConsumerPerLane.groundwork, raised to 5" },
    "lumaFloor": {
      "value": 165,
      "formula": "Rec.601 Y = 0.299R + 0.587G + 0.114B",
      "appliesTo": ["stone.cleared", "stone.built"],
      "scope": "per part, not per game",
      "authoredValueOwner": "styleGuide.roles",
      "instrument": {
        "partA": { "what": "arithmetic on the authored Color3 of every colourRole in environment.colourRolesUsed", "runsWithoutAGame": true, "owner": "bridge/merge.mjs, as a check on styleGuide" },
        "partB": { "what": "a Roblox Studio screenshot at the shipped Lighting values, pixel-sampled at the centre of the top face of one instance of each classId, converted by the same formula", "lightingValues": { "clockTime": 15.5, "geographicLatitude": 20, "brightness": 2, "source": "game/default.project.json, ratified by theme/setting/03" }, "leastLitAuthoredPlace": "the vaulted band of a depth-3 bay, chunkDressing.signatures[vault]", "owner": null, "ownerStatus": "unowned in both contracts, named beside the device reading" }
      },
      "twoPartBecause": "the material's bundled texture may tint, multiply or replace the authored Color3 and no published page states which, so the arithmetic floor and the rendered floor are not the same measurement",
      "researchOwed": "how BasePart.Material and BasePart.Color combine at render time"
    },
    "playerFacingStrings": 0
  }
}
```

## Consequences for other work

- **Style Guide work (`styleGuide`)** carries the **whole** slab request. `RR-A1` is now the only
  filing against `Plots.luau:534` and `representation.plot`, it must state material *and* colour,
  and my criterion reads its enum by field so the two cannot diverge again. I ask it for nothing
  else: `Cobblestone` and `litter.leaf` are withdrawn.
- **Plot-and-lane work (`plots`)** inherits that the bay-advance call resizes five parts, not one:
  the slab, two parapets, two kerbs and the channel. That is a `Size` write per part on the
  existing `applyLaneExtent` path and no new call site.
- **Built-edge work (sheet `02`)** shares the growth call and the opening: the channel is 6 studs
  wide at X = 0 and must clear the opening by 5 studs each side; if the opening narrows below 10
  the channel narrows with it.
- **Depth-family work (sheet `04`)** inherits the channel line as the axis its Cistern basins sit
  on and may not cross it with a colliding part.
- **Traversal and movement work** are asked for **nothing**: the channel does not collide, the
  basin's 0.8-stud rim is inside a `Humanoid`'s default step-up, and no value in `movement` or
  `traversal` moves on this sheet's authority.
- **Whoever takes the device reading** inherits the rendered luma sample in the same session. Same
  instrument, same missing owner as the batching factor; it should not be commissioned twice.
- **Publish-checklist work** keeps the lobby baseplate at luma 91.94 in
  `game/default.project.json`, which `architect/04-tree` forbids the build editing. Named, not
  fixed here, and `style/01` `RR-A2` routes it identically.

## Flagged to the developer

| decision | alternative not taken | reversing field | my recommendation |
|---|---|---|---|
| The ground is one flat slab | a stepped or terraced ground plane, which reads far better and needs a part per level | `groundwork.parts` | keep flat; `depths` and `plots` own the ground shape and a stepped lane costs instances I do not have |
| No litter anywhere | one leaf mat per bay, at 1 of 16 | `groundwork.litter.instances` | buy it back first; the place currently has nothing that says it was left alone |
| A dry channel and one basin | a channel network with branches and several basins, which is what a works actually looks like | `groundwork.parts[].count` | keep; branches cost a part each and read at only one point on the walk |

## Acceptance criteria

1. Exactly 4 instances exist per lane — 2 `kerb`, 1 `channel`, 1 `basin` — and 0 instances of
   `litter` exist anywhere in the game.
2. `groundwork.slab.material` equals the `enum` of the `styleGuide.materials.rows[]` entry with id
   `M1`, and `groundwork.slab.revisionRequestFiledHere` is 0.
3. The emitted lane builder assigns both `slab.Material` and `slab.Color`; today it assigns the
   first as a hardcoded `Enum.Material.Slate` and the second zero times.
4. The channel's X span (`|X| ≤ 3`) lies wholly inside every cross-wall opening's X span
   (`|X| ≤ builtEdge.opening.widthStuds / 2`), and a bay advance produces zero `Destroy` calls on
   a `kerb` or a `channel`.

## Not decided here

Every hue, hex and rgb value, the closed `Enum.Material` list, and the slab's material and colour
values — `styleGuide`, which owns `RR-A1`. Walls, parapets and the opening's width — sheet `02`.
Piers, roofing and family variation — sheet `04`. The canopy and the sky — sheet `05`. Tuple
sections, residency tiers and the four-instance allowance — sheet `01`. Bay lengths, patch counts
and the walkable margin — `plots`, `depths` and `traversal`. Who takes the rendered luma reading —
**unowned**. The lobby baseplate — publish-checklist work. Which module creates a kerb — `RR-E1`,
sheet `01`.
