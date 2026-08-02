# 05 — Beyond the edge

**Domain:** art/environment · **Category:** Art & Visuals · **Wave:** 6 · **Revision:** round 1

## Decision

The canopy is **20 parts shared by the whole place, 0 per lane, of which at most 6 stream at
once**: twelve leaf masses forming a closed 60-stud wall of wood around the lane row and eight
trunks in front of it. **It closes the horizon for the two outermost slots and at both ends of the
row, and for the fourteen interior slots it does not and no backdrop geometry can** — that is a
streaming fact, stated and scoped rather than claimed away. **It does not move**, and **no `Sky`
instance ships.**

## Why

- **The streaming finding, stated rather than routed around.** The row is
  `(runtime.maxPlayers − 1) × plots.pitchStuds + plots.laneWidthStuds` = **1,950 studs** wide, so
  an interior slot's nearest long wall is 400 to 950 studs away against a
  `budgets.streaming.StreamingTargetRadius` of **512**. It never streams for that player. **No
  arrangement fixes this**: the intervening space is other players' lanes for up to 1,950 studs,
  3.8× the radius, so there is nowhere inside 512 studs to put a wall. What an interior player
  actually sees laterally is four lanes of stone each way and then unrendered space, and the
  levers that change it are `budgets.streaming.StreamingTargetRadius` (Tech), `runtime.maxPlayers`
  and the row arrangement in `plots` — **none of them mine, and all of them stated here so nobody
  reads the canopy as the answer.** `[cid: decided]` on the scoping.
- **Why the walls stay anyway.** They are the entire lateral and longitudinal horizon for slots 1
  and 16, both ends of the row for everyone, and they cost a client only what streams — at most
  four leaf segments and two trunks at any position, which is why `sharedMaxStreamedConcurrently`
  is 6 while `sharedPlaceInstances` is 20. Deleting them would trade a real closure for two lanes
  against nothing.
- **Why a wall of wood and not trees.** `theme/setting/02` makes the short sightline load-bearing
  for endlessness — *"no vantage, no clear horizon over the works, no elevated overlook"* — and
  `theme/setting/01` states *"nothing built or travelled is visible past the edge"*. A scatter of
  trees at this instance count leaves gaps, and a gap is a long view out. A closed wall at 60
  studs subtends 34° from a camera at Y ≈ 8 at 90 studs. `[cid: decided]`; the brief says nothing
  about what is outside the play space.
- **Why the motion is not taken.** `theme/setting/05` grants `P9`'s canopy the one motion budget
  in the game; a grant is a permission, not a requirement. `theme/setting/03` `R4` states
  *"nothing in this place changes without a player's hand"* and *"no idle, loop or attract
  animation exists anywhere in the place"*, which a looping canopy contradicts and which I would
  have to overrule; the geometry sits 30+ studs beyond a boundary no player crosses and, for
  fourteen slots, is not rendered at all; and at `batchingFactor` 1 the render budget is already
  breached before any per-frame work. **Taking the zero costs one field to reverse and the
  parameters are in the manifest.** `[cid: decided]`
- **Why no `Sky`.** A `Sky` carries six skybox faces plus star, celestial-body and sun-size
  properties `[research: cid/_research/pack.md]`. The six faces are six uploaded image assets
  against `budgets.textureCeilings.uploadedImageAssetsInWorldGeometry` 0 and `N17`;
  `theme/setting/03` `R3` already forbids star, low-sun and celestial textures, which is most of
  what the class is for; and gap **G1** is that no key, module or emitter owns a `Lighting`
  property at all, since every value ships in `game/default.project.json`, which
  `architect/04-tree` forbids the build editing.
- **What ships instead, and the one thing not verified.** Whatever the engine renders with no
  `Sky` child in `Lighting`. **Whether that is a bright default day sky or an untextured void is
  `[unverified]`** — three searches returned only forum threads and no official page states it
  `[research: cid/_research/pack.md]`. It decides one number: if it is a void,
  `canopy.heightStuds` rises from 60 to 120, at zero asset and zero instance cost.
  `[research owed: create.roblox.com/docs/environment/skybox, or a Studio observation on an empty
  baseplate with Lighting emptied]`
- **Why the walls stop at bay 8.** `endgame` adds 480-stud bays without bound, so an extended
  canopy is an unbounded canopy and no fixed count is legal — the same argument that produced
  `environment.residency`. A post-terminal player has the retaining cross-wall closing the inward
  view and neighbouring lanes closing the lateral one. Whether the far view reads as open out
  there is `[playtest unknown]`; the named fix costs **zero additional instances** — recentre the
  two long walls' Z span on the deepest occupied live bay at `plots.liveGeometry.bayBuiltAt`.
- **Why segments are ≤ 1,024 studs.** A `BasePart` has a documented maximum size per axis and this
  pack does not carry the figure; segmenting at 765 and 1,005 keeps every part clear of any
  plausible limit at a cost of six parts.
  `[research owed: the documented maximum BasePart.Size per axis]`

### The part list — 20 instances, place-wide, built once

`P` is `plots.pitchStuds`; `W` is `plots.laneWidthStuds`; `N` is `runtime.maxPlayers`; `Zmax` is
`plots.bays[8].zEnd`; `O` is `backdrop.offsetStuds`; `rowWidth` is `(N − 1) × P + W`.

| # | classId | count | role | span | Size | max streamed at once |
|---|---|---|---|---|---|---|
| 1 | `canopy` | 8 | the two long walls, 4 segments each | Z from `−O` to `Zmax + O` | 40 × 60 × `(Zmax + 2O)/4` = 765 | 2 |
| 2 | `canopy` | 2 | the outward wall across the row | X across the row | `(rowWidth + 2O)/2` = 1,005 × 60 × 40 | 2 |
| 3 | `canopy` | 2 | the inward wall across the row | X across the row | `(rowWidth + 2O)/2` × 60 × 40 | 2 |
| 4 | `trunk` | 8 | four per long side, 25 studs inward of the leaf mass | Z at even quarters of the wall run (765 apart) | 5 × 44 × 5 | 2 |

Leaf masses span Y 4 to 64; trunks span Y 0 to 44. The long walls stand at X = `−W/2 − O` and
`(N − 1) × P + W/2 + O`. **Max concurrently streamed is 6**: two long-wall segments plus two end
segments, or two long-wall segments plus two trunks.

### Where the horizon is actually closed, per slot

| slot | nearest long wall | streams at radius 512 | lateral horizon closed by |
|---|---|---|---|
| 1 and 16 | 30 studs | yes | the canopy |
| 2 and 15 | 152 studs | yes | the canopy |
| 3 and 14 | 274 studs | yes | the canopy |
| 4 and 13 | 396 studs | yes | the canopy |
| 5 to 12 | 518 to 950 studs | **no** | four neighbouring lanes each way, then unrendered space |

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
| B10 | a canopy part intersecting any lane's footprint, overhanging a parapet or casting into a lane | `N7`; the sightline is between spawns |
| B11 | a per-depth, per-area or per-hour canopy variant | `R1`–`R3`; priority 3 |
| B12 | canopy geometry added per post-terminal bay | `endgame`; the count is fixed at 20 forever |
| B13 | a canopy part placed between two lanes to close an interior slot's horizon | there are only 2 studs between lanes; the finding is `StreamingTargetRadius`, not geometry |

```manifest
{
  "provides": "backdrop",
  "status": "proposed",
  "value": {
    "instancesPlaceWide": 20,
    "instancesPerLane": 0,
    "maxStreamedConcurrently": 6,
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
      "maxSegmentLengthReason": "kept clear of the documented BasePart.Size per-axis maximum, which this research pack does not carry"
    },
    "trunk": { "classId": "trunk", "count": 8, "perLongSide": 4, "heightStuds": 44, "insetFromLeafMassStuds": 25, "zSpacingRule": "even quarters of the long wall run, 765 studs apart, so at most 2 are inside the streaming radius at once" },
    "horizonClosure": {
      "streamingRadiusField": "budgets.streaming.StreamingTargetRadius",
      "streamingRadiusStuds": 512,
      "rowWidthStuds": 1950,
      "closedForSlots": [1, 2, 3, 4, 13, 14, 15, 16],
      "notClosedForSlots": [5, 6, 7, 8, 9, 10, 11, 12],
      "notClosedBecause": "an interior slot's nearest long wall is 400 to 950 studs away and does not stream; the intervening space is other players' lanes for up to 1950 studs, so there is nowhere inside 512 studs to place one",
      "whatAnInteriorSlotSeesLaterally": "four neighbouring lanes each way, then unrendered space",
      "noBackdropGeometryFixesThis": true,
      "leversThatWould": ["budgets.streaming.StreamingTargetRadius", "runtime.maxPlayers", "the row arrangement in plots"],
      "leverOwner": "tech/performance and gameplay/meta; not this key",
      "claimScope": "closesHorizon applies to the eight slots listed, and to both ends of the row for every slot",
      "subtendedAngleDegreesAtClosedSlots": 34,
      "eyeHeightStuds": 8
    },
    "motion": {
      "taken": false,
      "grantedBy": "theme/setting/05 P9, the one motion budget in the game",
      "reasonNotTaken": "theme/setting/03 R4 states nothing changes without a player's hand and that no idle or loop animation exists anywhere in the place; overruling it to animate geometry beyond an uncrossable boundary that fourteen of sixteen slots never render is a poor trade against an already breached render budget at batchingFactor 1",
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
      "revisionRequestNotFiledBecause": "the cheapest configuration is to ship nothing, which needs no emitter, so the RR-P2 placeConfiguration route is named and not used",
      "roleReference": "styleGuide.roles.sky, which already carries instances 0 and defers the read to lighting"
    },
    "endgame": {
      "extendedPastBay8": false,
      "additionalInstancesPerPostTerminalBay": 0,
      "reason": "endgame adds 480-stud bays without bound, so an extended canopy is an unbounded canopy and no fixed count is legal",
      "viewClosedInsteadBy": ["builtEdge crossWall in the retaining role, at the live bay's inward edge", "neighbouring lanes and their parapets"],
      "residualRisk": "whether the far view reads as open beyond bay 8",
      "residualRiskStatus": "playtest unknown",
      "fixIfItReads": { "change": "recentre the two long walls' Z span on the deepest occupied live bay at plots.liveGeometry.bayBuiltAt", "additionalInstances": 0 }
    },
    "playerFacingStrings": 0,
    "landmarks": 0
  }
}
```

## Consequences for other work

- **Device-ceiling and streaming work (`budgets`)** inherits the first statement anyone has made
  about what `StreamingTargetRadius` 512 does to a 1,950-stud row: **eight of sixteen slots have
  no rendered lateral horizon and no art can give them one.** If that matters, the lever is that
  field or `runtime.maxPlayers`, and the finding is recorded here rather than solved here.
- **Plot-arrangement work (`plots`)** gets the same finding from the geometry side: the row is
  3.8× the streaming radius wide, and a squarer arrangement — fewer slots per row, or two rows —
  would close it. I state the consequence and propose no arrangement.
- **Lighting work (`lighting`)** inherits one certainty and one non-request: no `Sky` ships, so
  the sky half of its subject is closed with a zero, and it receives **no revision request** from
  here. `theme/setting/03`'s ratified values stay untouched and gap G1 is named, not widened.
- **Style Guide work (`styleGuide`)** is asked for nothing: `canopy.leaf`, `canopy.trunk` and
  `sky` all resolve in its role set and `Grass` (`M9`) and `Wood` (`M10`) in its material list.
- **Publish-checklist work** should assert at boot that `Lighting` has no `Sky` child, in the same
  place it asserts `workspaceStreaming`, because one added by hand in Studio silently breaches
  `uploadedImageAssetsInWorldGeometry`.
- **Endgame work (`endgame`)** inherits that the backdrop is fixed at 20 forever and costs a
  post-terminal bay nothing.
- **VFX work (`effects`)** inherits that the only geometry outside a plot is non-colliding,
  non-querying and unanimated, so no world cue may attach to it.

## Flagged to the developer

| decision | alternative not taken | reversing field | my recommendation |
|---|---|---|---|
| A closed wall of wood | a scattered stand of individual trees, which reads far better and needs 60+ parts to close the gaps | `backdrop.canopy.walls` | keep the wall; revisit if the client ceiling is measured above 6,000 |
| No canopy motion | one slow sway, the only life the world would have | `backdrop.motion.taken` | keep the zero, but this is the single cheapest thing to add if `theme/setting/03` `R4` is ever relaxed |
| No `Sky` instance | a six-face skybox, which is the normal way a Roblox place gets a horizon | `backdrop.sky.instanceShips` | keep; it costs six uploaded assets against a zero ceiling, and the fetch that would settle what ships instead is named |
| Eight interior slots with no closed horizon | a narrower row, or a larger streaming radius | `budgets.streaming.StreamingTargetRadius`, `runtime.maxPlayers` | **flagged as the one item here I cannot fix**; it is a place-shape decision, not an art one |

## Acceptance criteria

1. `backdrop` totals exactly 20 instances place-wide — 12 `canopy` and 8 `trunk` — with
   `instancesPerLane` 0 and `maxStreamedConcurrently` 6; the count does not change with
   `depths.areaCount` or any post-terminal bay.
2. `backdrop.sky.instanceShips` is `false`, and a grep for
   `Sky|Skybox|StarCount|CelestialBodies|Atmosphere|Clouds` over emitted Luau and
   `game/default.project.json` returns zero matches.
3. `backdrop.motion.taken` is `false`, and zero `TweenService`, `RunService.Heartbeat`,
   `RunService.RenderStepped` or physics writes target any `canopy` or `trunk` instance.
4. `backdrop.horizonClosure.closedForSlots` contains exactly the slots whose nearest long wall is
   within `budgets.streaming.StreamingTargetRadius`, and no canopy or trunk box intersects the X
   range `[slotOrigin(s) − plots.laneWidthStuds/2, slotOrigin(s) + plots.laneWidthStuds/2]` for
   any slot.

## Not decided here

Every `Lighting` value and the hour — `lighting`, which this sheet asks for nothing. The canopy's
hue and the trunk's — `styleGuide`, via `canopy.leaf` and `canopy.trunk`. Anything inside the
built edge — sheets `02`, `03` and `04`. Tuple sections and the 20-instance shared allowance —
sheet `01`. `StreamingTargetRadius`, `runtime.maxPlayers` and the row arrangement — `budgets` and
`plots`; I state the consequence and set none of them. The lobby baseplate — publish-checklist
work. What Roblox renders with no `Sky` child — **unverified**, one fetch, named above. Which
module creates a canopy wall — `RR-E1`, sheet `01`.
