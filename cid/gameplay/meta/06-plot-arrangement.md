# 06 — Plot arrangement

**Domain:** Meta & Content · **Category:** Gameplay · **Wave:** 3

## Decision

**A plot is a lane 120 studs wide running inward along +Z, and the lanes sit side by side
along +X at a pitch of 122 studs.** An area is a **bay**: a segment of that lane whose length
is its footprint divided by the lane width, laid nose to tail, so **an area grows inward and
never sideways and the pitch never moves.** The spawn sits **8 studs inward of the lane mouth,
on the lane centre line, facing along the row**: slot 1 looks +X, every slot from 2 up looks
−X, so under lowest-free-index claiming every occupied spawn looks straight at an occupied
one 122 studs away.

## Why

- **The whole reason the areas are lanes is that three approved sheets asked for a pitch that
  does not track area size, and nobody could give them one while an area was a square.**
  `gameplay/social/02` sets `S = 128` studs `[playtest unknown]` and states that all three of
  its requirements are unsatisfied today; `gameplay/mechanics/06` propagates it and adds
  "plot pitch has to decouple from area size immediately, not by depth 4." A square 57,600
  stud² area is 240 studs across and no arrangement of squares that size puts two spawns
  within 128 for arbitrary occupancy: each plot needs its own frontage on whatever line the
  spawns sit on, so spawn spacing is plot width by construction, and the only escape is
  clustering at junctions, which fails whenever a player opens a fresh cluster alone.
  **Holding the width constant and spending growth on length removes the frontage term
  entirely.** `[cid: decided]`
- **It is also the reading the fiction already had.** `theme/setting/02-extent`: "Depth points
  inward, not down: away from the one open edge a person walks in by." A lane that lengthens
  inward is that sentence as geometry, and `theme/setting/04` had already ruled the topology
  as a chain of parts with two always-open openings each.
- **122 studs is `area.size` plus the boundary and nothing else.** `gameplay/mechanics/06`
  offers: "the margin is the only term in this that is mine: if the arrangement cannot be made
  to work, 12 studs is what I can give back." **I take all 12.** Plots abut, the pitch is the
  lane width plus whatever the inter-plot boundary is thick, and since patches do not collide
  `[research: game/src/shared/GameConfig.luau]` a player never needs a margin to walk. That
  puts a ceiling on a number I do not own: **the boundary may be at most 8 studs thick**, or
  the pitch exceeds `S`.
- **The lane width is 120 because depth 1 must stay square.** `depths` row 1 has to equal the
  merged `area` verbatim, and `area.size` is 120, so lane width 120 makes area 1 a 120 by 120
  bay with no revision to `01-the-area.md`. Every deeper bay is 120 wide and longer.
- **The spawn is at the mouth, not the centre, because the mouth is the only place two
  neighbours are level with each other.** `social/02` (b) requires it off centre; the spawn is
  1,492 studs from the plot's Z centre at the eight-bay lane. It also puts the player at bay
  1's outward opening, which `theme/setting/04` fixes as the works' own edge, so the player
  literally spawns at the way in.
- **Facing is static and depends only on the slot index**, which is what makes it survive
  every occupancy count. `social/01` claims the lowest free slot, so slot k's occupied
  neighbour is k−1 for every k above 1, and slot 1's is slot 2 whenever anyone else is here.
  A facing that alternated, or that pointed at the higher slot, would leave the last claimant
  looking at empty ground. **At 122 studs, dead ahead, a body clearing its own ground is in
  frame with no input**, which is `social/02` (c).
- **Nothing about the sightline is broken by the openings**, because they sit in the walls the
  lane runs *through*, not the walls it runs *between*: the line from one spawn to the next is
  along X at Z = 8 and crosses one lane wall, which `gameplay/mechanics/06` already requires
  be non-opaque.
- **A neighbour is still nameless at rest and I am not fixing that.**
  `StarterPlayer.NameDisplayDistance` defaults to 100
  `[research: https://robloxapi.github.io/ref/class/StarterPlayer.html]` against a realised 122.
  `social/02` recorded it; raising it is identity's call and my execution.
- **The cost I am accepting, stated rather than hidden: the walk back to the inward opening
  gets long.** From the last cleared patch of the deepest bay it is at most 540 studs, 21
  seconds at the ladder cap's walk speed, and about 10 on average. `core-loop/04` asks for
  "no travel worth measuring" between areas and this is measurable. It is inside every
  cadence rule (the area-completion payoff has just fired and the next tick lands one second
  after entry), and the mitigation I own is spent: the opening is at the inward wall, so the
  walk shortens as the player clears inward. `[playtest unknown]` whether 10 seconds reads as
  a stall; test range is the whole thing, and the lever if it does is a shorter deepest bay.
- **`theme/setting/04` W3 and W4 are satisfied, not contested.** Every bay has exactly two
  openings, both always open, both holding nothing, and consecutive bays share one plane, so
  the studs and the seconds between a part and the next are both zero. What stops a player
  walking inward before finishing is not a door: it is the same boundary that bounds the lane
  laterally on every plot, and the player's own last clear is what removes it, which
  `theme/setting/03` R1 requires ("a player is its only writer").

| # | bay | z start | z end | length | what is built |
|---|---|---|---|---|---|
| 1 | East Terrace | 0 | 120 | 120 | ground always; patches while live |
| 2 | West Terrace | 120 | 330 | 210 | built whole when bay 1 completes |
| 3 | East Cistern | 330 | 660 | 330 | built whole when bay 2 completes |
| 4 | West Cistern | 660 | 1,080 | 420 | built whole when bay 3 completes |
| 5 | East Vault | 1,080 | 1,560 | 480 | built whole when bay 4 completes |
| 6 | West Vault | 1,560 | 2,040 | 480 | built whole when bay 5 completes |
| 7 | East Spire | 2,040 | 2,520 | 480 | built whole when bay 6 completes |
| 8 | West Spire | 2,520 | 3,000 | 480 | built whole when bay 7 completes |
| 9+ | Spire | +480 each | | 480 | see sheet `07` |

```manifest
{
  "provides": "plots",
  "status": "proposed",
  "value": {
    "rowAxis": "+X",
    "laneAxis": "+Z",
    "laneWidthStuds": 120,
    "pitchStuds": 122,
    "pitchRule": "laneWidthStuds + the inter-plot boundary's thickness, which traversal owns; pitchStuds must never exceed social.maxCoPresenceSeparationStuds, so that thickness is capped at 8",
    "slotOrigin": "(area.originXZ[0] + (slot - 1) * pitchStuds, 0, area.originXZ[1])",
    "slotClaiming": "lowestFreeIndex",
    "slotsAreContiguousWhileOccupied": true,
    "spawn": {
      "plotLocal": [0, 0, 8],
      "lookVector": { "slot1": [1, 0, 0], "slot2AndAbove": [-1, 0, 0] },
      "neverFacesLaneAxis": true,
      "atPlotCentre": false
    },
    "bayLengthRule": "depths.areas[k].footprintStuds2 / laneWidthStuds",
    "bays": [
      { "ordinal": 1, "zStart": 0,     "zEnd": 120,   "lengthStuds": 120 },
      { "ordinal": 2, "zStart": 120,   "zEnd": 330,   "lengthStuds": 210 },
      { "ordinal": 3, "zStart": 330,   "zEnd": 660,   "lengthStuds": 330 },
      { "ordinal": 4, "zStart": 660,   "zEnd": 1080,  "lengthStuds": 420 },
      { "ordinal": 5, "zStart": 1080,  "zEnd": 1560,  "lengthStuds": 480 },
      { "ordinal": 6, "zStart": 1560,  "zEnd": 2040,  "lengthStuds": 480 },
      { "ordinal": 7, "zStart": 2040,  "zEnd": 2520,  "lengthStuds": 480 },
      { "ordinal": 8, "zStart": 2520,  "zEnd": 3000,  "lengthStuds": 480 }
    ],
    "openings": {
      "perBay": 2,
      "centredOnX": 0,
      "sharedWithNeighbour": true,
      "outwardOpeningOfBay1": "the works' edge, per theme/setting/04",
      "studsBetweenParts": 0,
      "alwaysOpen": true
    },
    "liveGeometry": {
      "patchInstancesExistIn": "the live bay only",
      "groundExistsIn": "every bay from 1 up to and including the live bay",
      "builtWhole": true,
      "bayBuiltAt": "the instant the previous bay's last patch clears",
      "torndownBeyond": "bays more than two outward of the live one are destroyed and rebuilt bare on re-entry"
    },
    "invariants": [
      "pitchStuds <= social.maxCoPresenceSeparationStuds",
      "the realised distance between the spawns of two consecutive occupied slots equals pitchStuds at every bay ordinal",
      "bays[k].lengthStuds * laneWidthStuds == depths.areas[k].footprintStuds2",
      "bays[k].zEnd == bays[k+1].zStart",
      "bays[0].lengthStuds == laneWidthStuds == area.size",
      "the spawn's plot-local Z is not the midpoint of bays[0].zStart and the last bay's zEnd",
      "the spawn's LookVector is parallel to rowAxis and never to laneAxis"
    ]
  }
}
```

## Consequences for other work

- **`Plots.luau` loses three shipped values and gains a rotation**
  `[research: game/src/server/Plots.luau]`. `PLOT_GUTTER = 40` and the `area.size + 40` pitch
  go: the pitch is 122 and the gutter is zero. The slab stops being `pitch × pitch` and
  becomes `pitchStuds` by the lane's built length. The spawn `Attachment` at
  `Vector3.new(0, SLAB_THICKNESS / 2, 0)`, the slab centre, moves to the lane centre line 8
  studs inward of the mouth, and **it must carry an orientation**: an `Attachment` with no
  rotation gives a `WorldCFrame` whose `LookVector` is −Z, which is across the row, and is why
  a player currently spawns seeing nobody. `Plots.claimSlot`'s lowest-free-index scan is
  correct and stays.
- **Traversal and set-dressing work inherits one number and one shape.** The inter-plot
  boundary may be at most **8 studs** thick, or the pitch breaches `S`. The four barriers
  become two long lane walls, one mouth wall and one wall per bay boundary, and every bay
  boundary wall carries an opening centred on X = 0. Height, material and opacity stay yours,
  including the non-opacity `social/02` criterion 3 depends on.
- **Art and Visuals, Environment** dresses a 120-stud lane, not a 240-stud room. Both long
  walls are seen at close range from everywhere in the bay and are the surface the sightline
  passes through, so they are the one piece of geometry that is both always in frame and
  required not to obstruct.
- **Onboarding work** keeps its guarantee unchanged: the plot origin is the mouth centre and
  the spawn is 8 studs from it, so "the patch nearest the plot origin" and "the patch nearest
  the spawn" are the same patch. Sheet `05` R8 keeps it one step away rather than underfoot.
- **Tech and Performance** gets a live-part budget of one bay, and a world extent of 20 lanes
  by at least 3,000 studs. **`[research owed: Roblox part-precision and streaming behaviour
  for anchored parts beyond roughly 20,000 studs from the origin]`** bounds how far the
  post-terminal run in sheet `07` can extend before the lane must be rebased; I have assumed
  it is not a problem inside the specced eight bays, which reach 3,000.
- **Identity work** may now raise `StarterPlayer.NameDisplayDistance` above 122 and get a
  named neighbour at spawn. It is one property and the arrangement no longer fights it.

## Acceptance criteria

1. `plots.pitchStuds` is at most `social.maxCoPresenceSeparationStuds`, and the distance
   between the spawn positions returned for slots n and n+1 equals `pitchStuds` for every n
   from 1 to 19 and at every bay ordinal from 1 to 8.
2. The spawn `CFrame`'s `LookVector` is `(1, 0, 0)` for slot 1 and `(-1, 0, 0)` for every slot
   from 2 up, and its Z component is 0 in every case.
3. The spawn's plot-local Z is at least 1,400 studs from the midpoint of the built lane at
   eight bays, and the spawn is inside bay 1.
4. For every k from 1 to 7, `bays[k].zEnd == bays[k+1].zStart`, and each bay reports exactly
   two openings whose X centre is 0.

## Not decided here

Player-to-player collision, the collision group name, chat, plot tenure and the `maxPlayers`
band (`gameplay/social/01`, which holds `social`). The value of `S` and everything inside its
range (`gameplay/social/02`; I consume it and set none of it). The boundary's height, material
and opacity, and the 12-stud walkable margin I have asked back (`gameplay/mechanics/06` and
traversal work). The opening's width, ornament and geometry (Art and Visuals, per
`theme/setting/04`). How many areas exist and how much ground each holds (sheet `04`). What a
bay's interior is made of (sheet `05`). What happens past bay 8 (sheet `07`). The respawn
delay and whether the respawn stays hand-rolled (architecture). Whether the nameplate is
turned on (`theme/identity/03`).
