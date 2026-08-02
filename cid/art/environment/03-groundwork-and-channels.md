# 03 — Groundwork and channels

**Domain:** art/environment · **Category:** Art & Visuals · **Wave:** 6

## Decision

The walkable surface is the **existing lane slab, re-materialled from `Slate` to `Cobblestone`
and given a `Color` it has never had**, at colour role `stone.cleared` — zero new instances, one
revision request. Over it, five parts per live bay: **two kerbs, one dry channel running the lane
centre through both openings, one basin, one litter mat.** Cleared stone holds Rec.601 luma
≥ 165 measured **per part**, by a two-part instrument: an arithmetic check on the authored
`Color3` that runs with no game, and a rendered sample in the least-lit authored place — **which
nobody owns taking.**

## Why

- **The ground fails the one criterion it is entirely about, today.**
  `game/src/server/Plots.luau:534` sets `slab.Material = Enum.Material.Slate` as a hardcoded
  literal owned by no key, and the file assigns `slab.Color` nowhere, so the slab renders at
  Roblox's default part colour `[163,162,165]` → Rec.601 luma **162.64**, which is 2.4 below
  `theme/setting/01`'s floor and has `R − B = −2`, i.e. faintly cool
  `[research: game/src/server/Plots.luau]`. That is the most directly checkable component of
  *"nothing really looks good"* `[research: cid/_playtest.md]` inside this domain, and it is a
  two-property fix.
- **Why `Cobblestone` and not `Slate`.** `theme/setting/01` forbids grey granite, white marble,
  red brick and dark basalt and requires *"warm pale limestone, dressed and weathered"*; the same
  sheet makes *"pattern in paving"* one of the four permitted ornament channels. `Cobblestone` is
  a base material applicable to a `BasePart` and carries a bundled tileable pattern at **zero
  uploaded assets** `[research: https://robloxapi.github.io/ref-temp/enum/Material.html]`,
  `[research: https://create.roblox.com/docs/parts/materials]`. `Slate` supplies neither the
  warmth nor the dressed-joint pattern and is the material a builder chose because no key stated
  one.
- **Why the colour half is not filed here.** `art/style/01` owns every hue and has already found
  the same defect from the palette side. **I file the material half and the emitter path; it
  files the colour.** They are one edit to `Plots.luau` and must land together, and two sheets
  filing one request is the collision this batching exists to prevent. `[cid: decided]` on the
  split.
- **Why the channel is one part and flush.** `theme/setting/05` `P2` calls the channel-and-basin
  network *"the connective tissue that makes the parts one works"*, and `P1`'s opening reads as
  construction-that-was-always-open only because the channel passes through it (sheet `02`
  `W3`). A 0.2-stud non-colliding bed strip costs one instance of five, never trips a phone
  player on a touch stick, and needs no change to `movement` or `traversal`. A recessed trough is
  unavailable: the slab is a single part and cannot hold a hole.
- **Why the basin collides and the channel does not.** A basin reads as a basin only if it has a
  rim, and 0.8 studs is well inside a `Humanoid`'s default step-up, so it is stepped over rather
  than stopped at — no `movement` value moves and no clear radius is affected. The channel at 0.2
  is below the threshold where walking through a visible solid reads as a defect.
- **Why litter exists at all on a five-part allowance.** `P6` is *"litter layer over paving; no
  soil"* and it is the only class in the roster that says the place is unattended without saying
  anything is broken — `theme/lore/01` `L5` forbids fallen stone, and `theme/tone/04` `D14`
  forbids staged remains, so litter is the entire vocabulary of neglect this game has. One mat at
  14 × 14 covers 196 of a bay's ≥ 14,400 studs² — **1.4%**. Thin, and stated as thin.
- **Why litter's luma floor is 145 and not 165.** The floor at 165 is `theme/setting/01`'s rule
  about *stone*; litter is not stone. What litter must not do is read as overgrowth, so its bound
  is against the lightest tier green (`Moss`, luma 123) rather than against the stone floor:
  145 clears it by 22 `[research: cid/art/style/_lead.md]`.
- **Weathering is the material and nothing else** (`environment.weathering.channels`). *"Worn
  tread"* is therefore `Cobblestone`'s own bundled surface and is identical at every depth by
  construction, satisfying `theme/lore/01` `L4` as a check rather than an assertion.

### The part list for one live bay — every position parametric

`W` is `plots.laneWidthStuds`; `k` is the live bay ordinal; `L` is `plots.bays[k].lengthStuds`.

| # | classId | count | centre X | centre Y | Z | Size | collides |
|---|---|---|---|---|---|---|---|
| 1 | `kerb` | 2 | `±(W/2 − 2.25)` | 0.2 | `bays[k].zStart` → `zEnd` | 1.5 × 0.4 × `L` | yes |
| 2 | `channel` | 1 | 0 | 0.1 | `bays[k].zStart` → `zEnd` | 6 × 0.2 × `L` | no |
| 3 | `basin` | 1 | 0 | 0.4 | `bays[k].zEnd − 12` | 10 × 0.8 × 10 | yes |
| 4 | `litter` | 1 | `+W/4` | 0.075 | `bays[k].zStart + L × 0.5` | 14 × 0.15 × 14 | no |

The slab itself is not in this table because it is not a new instance: it already exists, already
counts inside `budgets.instanceCeilings.laneInstanceFormula`'s `+ 6`, and this sheet changes two
of its properties.

### Prohibitions this sheet carries, each countable

| # | zero of | source |
|---|---|---|
| G1 | water, standing or moving, in any channel or basin; wet, dark or reflective stone | `theme/setting/05` `A6`, `theme/setting/01` |
| G2 | soil, earth, mud, sand or a planting bed anywhere on the paving | `P6`: litter over paving, *no soil* |
| G3 | a drain grate, sluice plate, stopcock or any operable fitting in a channel | `A11`/`A12`; `Sluice` and `Grate` are live Find names |
| G4 | cut lettering, a measure mark, a survey mark, a boundary stone or a level datum on the paving | `theme/setting/05` `A25`, `theme/setting/01` |
| G5 | a second paving material, a paving inlay, a border course or a patterned panel | one tuple per class; `environment.distinctDrawClasses` |
| G6 | a colour, material or wear difference between a cleared bay's ground and the live bay's | `theme/setting/04` `W1`: a finished part gains nothing |
| G7 | litter, channel or basin geometry in any bay below the live one | `environment.residency` |
| G8 | a `Decal`, `Texture`, `MaterialVariant` or `SurfaceAppearance` used to fake a stain or a joint | `uploadedImageAssetsInWorldGeometry` 0, `N17` |
| G9 | any part whose `Reflectance` is above 0 | `A6`, `A7` |

```manifest
{
  "provides": "groundwork",
  "status": "proposed",
  "value": {
    "instancesPerLiveBay": 5,
    "allowanceField": "environment.allowance.perConsumerPerLane.groundwork",
    "coordinateRule": "every position is an expression over plots.bays[k] and plots.laneWidthStuds; this key contains no world coordinate",
    "slab": {
      "isANewInstance": false,
      "countedIn": "budgets.instanceCeilings.laneInstanceFormula's +6",
      "material": "Cobblestone",
      "colourRole": "stone.cleared",
      "topFaceY": 0,
      "reflectance": 0,
      "shippedToday": { "material": "Slate", "colorAssigned": false, "renderedDefaultRgb": [163, 162, 165], "renderedLuma": 162.64, "passesLumaFloor": false },
      "requestedRevision": {
        "against": ["architect/sheets/06-representation.md representation.plot", "game/src/server/Plots.luau:534"],
        "change": "slab.Material Slate -> Cobblestone, and assign slab.Color from the stone.cleared role",
        "filedBy": { "materialHalf": "this sheet", "colourHalf": "cid/art/style/01, which holds styleGuide" },
        "mustLandAsOneEdit": true,
        "ifMaterialHalfDeclined": "Slate stays and the stone.cleared colour role alone must carry the whole luma floor, which styleGuide must then set higher"
      }
    },
    "parts": [
      { "classId": "kerb",    "count": 2, "centreXRule": "+/- (plots.laneWidthStuds/2 - 2.25)", "centreY": 0.2,   "zSpan": ["plots.bays[k].zStart", "plots.bays[k].zEnd"], "lengthRule": "plots.bays[k].lengthStuds", "canCollide": true,  "role": "the paving's edge course, inside the parapet's inner face" },
      { "classId": "channel", "count": 1, "centreX": 0,   "centreY": 0.1,   "zSpan": ["plots.bays[k].zStart", "plots.bays[k].zEnd"], "lengthRule": "plots.bays[k].lengthStuds", "canCollide": false, "role": "the dry bed, running the lane centre and through both openings" },
      { "classId": "basin",   "count": 1, "centreX": 0,   "centreY": 0.4,   "centreZRule": "plots.bays[k].zEnd - 12", "canCollide": true,  "role": "the run's dry catchment, clear of the retaining wall by 5 studs" },
      { "classId": "litter",  "count": 1, "centreXRule": "plots.laneWidthStuds/4", "centreY": 0.075, "centreZRule": "plots.bays[k].zStart + plots.bays[k].lengthStuds * 0.5", "canCollide": false, "role": "the one leaf mat" }
    ],
    "channelContinuity": {
      "passesThroughOpeningAtX": 0,
      "openingWidthField": "builtEdge.opening.widthStuds",
      "clearanceEachSideStuds": 5,
      "terminatesAtAWall": false,
      "dry": true,
      "holdsWater": false
    },
    "litterCoverage": { "studs2PerBay": 196, "shareOfSmallestBay": 0.0136, "capShareOfAnyBay": 0.05 },
    "lumaFloor": {
      "value": 165,
      "formula": "Rec.601 Y = 0.299R + 0.587G + 0.114B",
      "appliesTo": ["stone.cleared", "stone.built"],
      "litterFloor": 145,
      "litterFloorReason": "litter must not read as overgrowth; the lightest tier green is luma 123",
      "scope": "per part, not per game",
      "instrument": {
        "partA": { "what": "arithmetic on the authored Color3 of every colourRole named in environment.colourRoles", "runsWithoutAGame": true, "owner": "bridge/merge.mjs, as a check on styleGuide" },
        "partB": { "what": "a Roblox Studio screenshot at the shipped Lighting values, pixel-sampled at the centre of the top face of one instance of each classId, converted by the same formula", "lightingValues": { "clockTime": 15.5, "geographicLatitude": 20, "brightness": 2, "source": "game/default.project.json, ratified by theme/setting/03" }, "leastLitAuthoredPlace": "the vaulted band of a depth-3 bay, chunkDressing.signatures[vault]", "owner": null, "ownerStatus": "unowned in both contracts, named beside the device reading" }
      },
      "twoPartBecause": "the material's bundled texture may tint, multiply or replace the authored Color3 and no published page states which, so the arithmetic floor and the rendered floor are not the same measurement",
      "researchOwed": "how BasePart.Material and BasePart.Color combine at render time"
    },
    "residency": "live bay only, per environment.residency; the slab persists across every bay because it is the ground",
    "playerFacingStrings": 0
  }
}
```

## Consequences for other work

- **Plot-and-lane work (`representation.plot`, `Plots.luau`)** holds one revision request with
  two properties: `slab.Material` becomes `Cobblestone` and `slab.Color` is assigned for the
  first time. `art/style/01` files the colour value; this sheet files the material and the fact
  that the emitter path is `GameConfig`, since `patch.material` already reaches `Plots.luau` that
  way and the slab's material does not.
- **Style Guide work (`styleGuide`)** owes `stone.cleared` at luma ≥ 165 with warmth (`R > B`),
  `stone.built` at ≥ 165, and `litter.leaf` at ≥ 145 and ≥ 22 above the lightest tier green. It
  should not restate my floors and I do not restate its hues.
- **Built-edge work (sheet `02`, this domain)** inherits that the channel is 6 studs wide at
  X = 0 and must clear the opening by 5 studs each side; if the opening narrows below 10 the
  channel narrows with it or the two stop reading as one construction.
- **Depth-family work (sheet `04`, this domain)** inherits the channel line as the axis its vault
  band and its basins sit on, and may not cross it with a colliding part.
- **Traversal and movement work** are asked for **nothing**. The channel does not collide, the
  basin's 0.8-stud rim is inside a `Humanoid`'s default step-up, and no value in `movement` or
  `traversal` moves on this sheet's authority.
- **Whoever takes the device reading** inherits one more measurement in the same session: the
  rendered luma sample. It is the same instrument and the same missing owner as the batching
  factor, and it should not be commissioned twice.
- **Publish-checklist work** keeps the lobby baseplate: its `[0.404, 0.353, 0.286]` computes to
  luma 91.94 and sits in `game/default.project.json`, which `architect/04-tree` forbids the build
  from editing. Named, not fixed here.

## Acceptance criteria

1. Exactly 5 instances are created for one live bay — 2 `kerb`, 1 `channel`, 1 `basin`,
   1 `litter` — and 0 in any bay below the live one.
2. The emitted lane builder assigns both `slab.Material` and `slab.Color`; today it assigns the
   first as a hardcoded `Enum.Material.Slate` and the second zero times.
3. The Rec.601 luma of the `Color3` behind `stone.cleared` and `stone.built` is ≥ 165 and behind
   `litter.leaf` is ≥ 145, computed with no game running.
4. `groundwork.channelContinuity.clearanceEachSideStuds` is 5 and the channel's X span
   (`|X| ≤ 3`) lies wholly inside every cross-wall opening's X span
   (`|X| ≤ builtEdge.opening.widthStuds / 2`).

## Not decided here

Every hue, hex and rgb value, and the closed `Enum.Material` list itself — `styleGuide`. Walls,
parapets and the opening's width — sheet `02`. Piers, roofing and family variation — sheet `04`.
The canopy and the sky — sheet `05`. The tuple sections and the five-instance allowance — sheet
`01`, which holds `environment`. Bay lengths, patch counts and the walkable margin — `plots`,
`depths` and `traversal`. Who takes the rendered luma reading — **unowned**. The lobby baseplate's
colour — publish-checklist work. Whether `patch.material` and a world colour become tokens —
gap G3, the seam owner's.
