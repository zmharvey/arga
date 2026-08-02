# 05 — Beyond the edge

**Domain:** art/environment · **Category:** Art & Visuals · **Wave:** 6

## Decision

The canopy is **24 parts shared by the whole place and 0 per lane**: twelve leaf masses forming a
closed 60-stud-high wall of wood around the lane row, and twelve trunks standing in front of it.
**It does not move** — the one permitted motion budget is left unspent, with the parameters that
would reinstate it stated as data. **No `Sky` instance ships**, because six faces are six
uploaded image assets against a zero-asset ceiling and no key, module or emitter can write
`Lighting`.

## Why

- **Why a wall of wood and not trees.** `theme/setting/02` makes the short sightline load-bearing
  for endlessness — *"no vantage, no clear horizon over the works, no elevated overlook"* — and
  `theme/setting/01` states *"nothing built or travelled is visible past the edge"*. A scatter of
  trees at 24 instances over a row 1,950 studs across leaves gaps, and a gap is a long view out.
  A closed wall of leaf mass at 60 studs subtends 34° from a camera at Y ≈ 8 at 90 studs, so the
  horizon is behind wood from every standing position in every lane. `[cid: decided]`; the brief
  says nothing about what is outside the play space at all.
- **Why 24 and why shared rather than per-lane.** `environment.allowance` splits 186 instances of
  client headroom as `9 × 18 + 24`, and the canopy is the only subject in this domain that is one
  object for sixteen players rather than sixteen copies of one object. Paying for it once is what
  makes the per-lane figure 18 instead of 15.
- **Why the motion is not taken.** `theme/setting/05` grants `P9`'s canopy the one motion budget
  in the game; a grant is a permission, not a requirement. Four things argue against spending it:
  `theme/setting/03` `R4` states *"nothing in this place changes without a player's hand"* and
  *"no effect may fire because time passed, and no idle, loop or attract animation exists anywhere
  in the place"*, which a looping canopy contradicts and which I would have to overrule; the
  geometry sits 30+ studs beyond a boundary no player crosses; every word that names the effect
  is in `vocabulary`'s or `theme/setting/03`'s banned-token lists, which is a strong signal about
  the register; and at `batchingFactor` 1 the render budget is already breached 6× before any
  per-frame work. **Taking the zero costs one field to reverse and the parameters are in the
  manifest.** `[cid: decided]`
- **Why no `Sky`.** A `Sky` carries six skybox faces plus star, celestial-body and sun-size
  properties `[research: cid/_research/pack.md]`. The six faces are six uploaded image assets
  against `budgets.textureCeilings.uploadedImageAssetsInWorldGeometry` 0 and `N17`;
  `theme/setting/03` `R3` already forbids star, low-sun and celestial textures, which is most of
  what the class is for; and gap **G1** is that *no key, module or emitter owns a `Lighting`
  property at all* — every value ships in `game/default.project.json`, which `architect/04-tree`
  forbids the build from editing. Shipping a `Sky` would need an emitter this contract does not
  have, six assets it forbids, and a class whose useful half is already banned.
- **What ships instead, and the one thing that is not verified.** The place uses whatever the
  engine renders with no `Sky` child in `Lighting`. **Whether that is a bright default day sky or
  an untextured void is `[unverified]`** — three searches returned only forum threads and no
  official page states it `[research: cid/_research/pack.md]`. It decides nothing about the
  design and one number about the canopy: if it is a void, `canopy.heightStuds` rises from 60 to
  120 and the wall closes the sky as well as the horizon, which is a one-field change at zero
  asset cost and zero additional instances. **The design is written so the unknown moves one
  field.** `[research owed: create.roblox.com/docs/environment/skybox, or a Studio observation on
  an empty baseplate with Lighting emptied]`
- **Why the walls stop at bay 8 and are not extended for `endgame`.** `endgame` adds 480-stud
  bays without bound, so an extended canopy is an unbounded canopy and no fixed count is legal —
  the same argument that produced `environment.residency`. A post-terminal player has the
  retaining cross-wall closing the inward view (sheet `02`) and neighbouring lanes closing the
  lateral one, and the far canopy is behind them. Whether the lateral view reads as open out there
  is `[playtest unknown]`; the named fix costs **zero additional instances** — recentre the two
  long walls' Z span on the deepest occupied live bay at `plots.liveGeometry.bayBuiltAt` rather
  than fixing it.
- **Why segments are ≤ 1,024 studs.** A `BasePart` has a documented maximum size per axis and this
  pack does not carry the figure; segmenting at 765 and 1,005 keeps every part clear of any
  plausible limit at a cost of six parts.
  `[research owed: the documented maximum BasePart.Size per axis]`

### The part list — 24 instances, place-wide, built once

`P` is `plots.pitchStuds`; `W` is `plots.laneWidthStuds`; `N` is `runtime.maxPlayers`; `Zmax` is
`plots.bays[8].zEnd`; `O` is `backdrop.offsetStuds`.

| # | classId | count | role | span | Size |
|---|---|---|---|---|---|
| 1 | `canopy` | 8 | the two long walls, 4 segments each | Z from `−O` to `Zmax + O` | 40 × 60 × `(Zmax + 2O)/4` |
| 2 | `canopy` | 2 | the outward wall across the row | X across the row | `(rowWidth + 2O)/2` × 60 × 40 |
| 3 | `canopy` | 2 | the inward wall across the row | X across the row | `(rowWidth + 2O)/2` × 60 × 40 |
| 4 | `trunk` | 12 | six per long side, standing 25 studs inward of the leaf mass | Z at even sixths of the wall run | 5 × 44 × 5 |

`rowWidth` is `(N − 1) × P + W`; the long walls stand at X = `−W/2 − O` and
`(N − 1) × P + W/2 + O`. Leaf masses span Y 4 to 64; trunks span Y 0 to 44.

### Prohibitions this sheet carries, each countable

| # | zero of | source |
|---|---|---|
| B1 | a `Sky` instance, a skybox face, a star field, a celestial-body toggle or a sun-size override | `budgets`, `N17`, `theme/setting/03` `R3`, gap G1 |
| B2 | `Atmosphere`, `Clouds`, `FogStart`, `FogEnd` | `N7`, `R1` |
| B3 | any animal, bird, insect, nest or track, visible or heard, in or under the canopy | `theme/setting/01`: nothing alive but plants and players |
| B4 | flowers, fruit, blossom, a flowering shrub or any autumn or spring colour | `03-META.md` priority 3; `theme/lore/01` `L4` |
| B5 | walkable canopy, walkable ground, a path, a track or a road beyond the built edge | `theme/setting/01`; `theme/setting/02` |
| B6 | a distant building, tower, wall, ruin, bridge or worked stone visible past the edge | `theme/setting/01`: *nothing built or travelled is visible past the edge* |
| B7 | a hill, ridge, mountain, cliff or terrain instance of any kind | `theme/setting/02`: no vantage, no clear horizon |
| B8 | fallen leaves, litter or ground cover outside the built edge | `P6` is litter *over paving*, and outside the edge is not paving |
| B9 | a `ParticleEmitter`, `Beam`, `Trail` or looping tween on any canopy part | `A14`; `theme/setting/03` `R4` |
| B10 | a canopy part that casts into a lane, overhangs a parapet or intersects any lane's footprint | `N7`; the sightline is between spawns, not through leaves |
| B11 | a per-depth, per-area or per-hour canopy variant | `R1`–`R3`; priority 3 |
| B12 | any canopy geometry added per post-terminal bay | `endgame`; the count is fixed at 24 forever |

```manifest
{
  "provides": "backdrop",
  "status": "proposed",
  "value": {
    "instancesPlaceWide": 24,
    "instancesPerLane": 0,
    "allowanceField": "environment.allowance.perConsumerShared.backdrop",
    "builtOnce": true,
    "rebuiltPerBay": false,
    "coordinateRule": "every position is an expression over plots.pitchStuds, plots.laneWidthStuds, plots.bays[8].zEnd and runtime.maxPlayers; this key contains no world coordinate",
    "offsetStuds": 30,
    "canopy": {
      "classId": "canopy",
      "count": 12,
      "heightStuds": 60,
      "thicknessStuds": 40,
      "bottomY": 4,
      "topY": 64,
      "walls": [
        { "role": "longSideNegX",  "segments": 4, "atXRule": "-plots.laneWidthStuds/2 - backdrop.offsetStuds", "zSpanRule": ["-backdrop.offsetStuds", "plots.bays[8].zEnd + backdrop.offsetStuds"] },
        { "role": "longSidePosX",  "segments": 4, "atXRule": "(runtime.maxPlayers - 1) * plots.pitchStuds + plots.laneWidthStuds/2 + backdrop.offsetStuds", "zSpanRule": ["-backdrop.offsetStuds", "plots.bays[8].zEnd + backdrop.offsetStuds"] },
        { "role": "outwardAcrossRow", "segments": 2, "atZRule": "-backdrop.offsetStuds" },
        { "role": "inwardAcrossRow",  "segments": 2, "atZRule": "plots.bays[8].zEnd + backdrop.offsetStuds" }
      ],
      "rowWidthRule": "(runtime.maxPlayers - 1) * plots.pitchStuds + plots.laneWidthStuds",
      "maxSegmentLengthStuds": 1024,
      "maxSegmentLengthReason": "kept clear of the documented BasePart.Size per-axis maximum, which this research pack does not carry",
      "closesHorizonFromEyeHeightStuds": 8,
      "subtendedAngleDegreesAtNearestLane": 34
    },
    "trunk": { "classId": "trunk", "count": 12, "perLongSide": 6, "heightStuds": 44, "insetFromLeafMassStuds": 25, "zSpacingRule": "even sixths of the long wall run" },
    "motion": {
      "taken": false,
      "grantedBy": "theme/setting/05 P9, the one motion budget in the game",
      "reasonNotTaken": "theme/setting/03 R4 states nothing changes without a player's hand and that no idle or loop animation exists anywhere in the place; overruling it to animate geometry beyond an uncrossable boundary is a poor trade against an already breached render budget at batchingFactor 1",
      "reinstatementParameters": {
        "appliesTo": "canopy leaf masses only, never trunks and never any part inside the built edge",
        "instancesAffected": 12,
        "kind": "a bounded rotation about the wall's own long axis, applied client-side, never replicated",
        "amplitudeDegrees": 1.5,
        "periodSeconds": 9,
        "amplitudeStatus": "playtest unknown",
        "amplitudeTestRangeDegrees": [0.5, 4],
        "periodTestRangeSeconds": [6, 14],
        "forbiddenMechanisms": ["ParticleEmitter", "Beam", "Trail", "physics"],
        "sheetThatMustMoveFirst": "cid/theme/setting/03-physical-law.md R4"
      }
    },
    "sky": {
      "instanceShips": false,
      "skyboxFacesUploaded": 0,
      "reasons": ["six ContentId faces are six uploaded image assets against budgets.textureCeilings.uploadedImageAssetsInWorldGeometry 0 and N17", "theme/setting/03 R3 already forbids star, celestial-body and low-sun textures, which is most of the class", "no key, module or emitter owns a Lighting property (gap G1) and architect/04-tree forbids the build editing game/default.project.json"],
      "shipsInstead": "whatever the engine renders with no Sky child in Lighting",
      "renderedResultStatus": "unverified",
      "researchOwed": "create.roblox.com/docs/environment/skybox, or a Studio observation on an empty baseplate with Lighting emptied",
      "ifResultIsAVoid": { "change": "backdrop.canopy.heightStuds 60 -> 120", "additionalInstances": 0, "additionalAssets": 0 },
      "revisionRequestFiled": 0,
      "revisionRequestNotFiledBecause": "the cheapest configuration is to ship nothing, which needs no emitter, so the RR-P2 placeConfiguration route is named and not used"
    },
    "endgame": {
      "extendedPastBay8": false,
      "additionalInstancesPerPostTerminalBay": 0,
      "reason": "endgame adds 480-stud bays without bound, so an extended canopy is an unbounded canopy and no fixed count is legal",
      "viewClosedInsteadBy": ["builtEdge crossWall in the retaining role, at the live bay's inward edge", "neighbouring lanes and their parapets"],
      "residualRisk": "whether the lateral view reads as open beyond bay 8",
      "residualRiskStatus": "playtest unknown",
      "fixIfItReads": { "change": "recentre the two long walls' Z span on the deepest occupied live bay at plots.liveGeometry.bayBuiltAt", "additionalInstances": 0 }
    },
    "playerFacingStrings": 0,
    "landmarks": 0
  }
}
```

## Consequences for other work

- **Lighting work (`lighting`)** inherits one certainty and one non-request: this domain ships no
  `Sky`, so the sky half of its subject is closed with a zero rather than left ambiguous, and it
  receives **no revision request** from here. `theme/setting/03`'s five ratified values stay
  untouched and gap **G1** is named without being widened.
- **Device-ceiling work (`budgets`)** gains the shared column it did not have:
  `sharedPlaceInstances` 24, counted once against both the server and the client ceilings, and
  never multiplied by `runtime.maxPlayers`. Any future shared object competes with this figure.
- **Endgame work (`endgame`)** inherits that the backdrop is fixed at 24 forever and costs a
  post-terminal bay nothing, and that a residual lateral-view risk exists past bay 8 whose fix
  costs zero instances. That is the second subject after `chunkDressing` to cost the endless run
  nothing.
- **Publish-checklist work (Build & Deploy)** should assert at boot that `Lighting` has no `Sky`
  child, in the same place it asserts `workspaceStreaming`, because a `Sky` added by hand in
  Studio would silently breach `uploadedImageAssetsInWorldGeometry`.
- **VFX work (`effects`)** inherits that the only geometry in this game outside a plot is
  non-colliding, non-querying and unanimated, so no world cue may be attached to it and there is
  no ambient channel out there to reach for.
- **Presence-sufficiency work (`gameplay/social/02`)** should note that no canopy part enters any
  lane's footprint, so the backdrop is not a party to the sightline question sheet `02` reopens.
- **Whoever fetches next** owes exactly one page for this sheet, and its answer moves one field.

## Acceptance criteria

1. `backdrop` totals exactly 24 instances place-wide — 12 `canopy` and 12 `trunk` — and
   `backdrop.instancesPerLane` is 0; the count does not change with `runtime.maxPlayers`,
   `depths.areaCount` or any post-terminal bay.
2. `backdrop.sky.instanceShips` is `false`, and a grep for
   `Sky|Skybox|StarCount|CelestialBodies|Atmosphere|Clouds` over emitted Luau and
   `game/default.project.json` returns zero matches.
3. `backdrop.motion.taken` is `false`, and zero `TweenService`, `RunService.Heartbeat`,
   `RunService.RenderStepped` or physics writes target any instance with `classId` `canopy` or
   `trunk`.
4. No canopy or trunk instance's axis-aligned box intersects the X range
   `[slotOrigin(s) − plots.laneWidthStuds/2, slotOrigin(s) + plots.laneWidthStuds/2]` for any
   slot `s`, and every segment's largest Size axis is ≤ 1,024 studs.

## Not decided here

Every `Lighting` value, the hour, the shadow settings and whether the shipped five are right —
`lighting`, which this sheet asks for nothing. The canopy's hue and the trunk's — `styleGuide`,
via `canopy.leaf` and `canopy.trunk`. Anything inside the built edge — sheets `02`, `03` and `04`
of this domain. The tuple sections and the 24-instance shared allowance — sheet `01`, which holds
`environment`. The lobby baseplate and the streaming radius — publish-checklist work and
`budgets`. Whether the ambient bed is taken and what the place sounds like — Audio. What Roblox
actually renders with no `Sky` child — **unverified**, one fetch, named above.
