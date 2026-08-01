# 06 — Plot arrangement

**Domain:** Meta & Content · **Category:** Gameplay · **Wave:** 3

## Decision

**A plot is a lane 120 studs wide running inward along +Z, and the lanes sit side by side
along +X at a pitch of 122 studs.** An area is a **bay**: a segment of that lane whose length
is its footprint divided by the lane width, laid nose to tail, so **an area grows inward and
never sideways and the pitch never moves.** The spawn sits **8 studs inward of the lane mouth**
`[playtest unknown]`, on the lane centre line, **facing along the row**: slot 1 looks +X, every
slot from 2 up looks −X. **Co-presence is delivered at the spawn moment and not along the
lane**, which is a limit of the geometry and is stated rather than claimed away.

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
  as a chain of parts with two openings each.
- **122 studs is `area.size` plus the boundary and nothing else.** `gameplay/mechanics/06`
  offers: "the margin is the only term in this that is mine: if the arrangement cannot be made
  to work, 12 studs is what I can give back." **I take all 12**, which is a revision request
  against `traversal.walkableMarginStuds` (12 → 0) that has not yet been made. Plots abut, and
  since patches do not collide `[research: game/src/shared/GameConfig.luau]` a player never
  needs a margin to walk. The residual 2 studs is an **assumed** boundary thickness, and the
  real constraint on a number I do not own is that **the boundary may be at most 8 studs
  thick**, or the pitch exceeds `S`.
- **The lane width is 120 because depth 1 must stay square.** `depths` row 1 has to equal the
  merged `area` verbatim, and `area.size` is 120, so lane width 120 makes area 1 a 120 by 120
  bay with no revision to `01-the-area.md`. Every deeper bay is 120 wide and longer.
- **The spawn is at the mouth, not the centre**, which is `social/02` (b): it is 1,492 studs
  from the plot's Z centre at the eight-bay lane. It also puts the player at bay 1's outward
  opening, which `theme/setting/04` fixes as the works' own edge, so the player spawns at the
  way in. **The 8 studs is a starting value, not a derivation** `[playtest unknown]`, test
  range 4 to 16: its only job is to put the player inside the patch field rather than against
  the mouth wall. It carries no geometric identity, and the first Find is joined to the
  **spawn point** by `layout` R7 rather than to the plot origin, which is where an earlier
  draft of this sheet was wrong.
- **Facing is static and depends only on the slot index**, which is what makes it survive
  every occupancy count. `social/01` claims the lowest free slot, so slot k's occupied
  neighbour is k−1 for every k above 1, and slot 1's is slot 2 whenever anyone else is here.
  A facing that alternated, or that pointed at the higher slot, would leave the last claimant
  looking at empty ground.
- **Co-presence expires 39 studs into a 3,000-stud lane, and no pitch fixes it.** With pitch
  122 against S = 128 the longitudinal budget is `sqrt(128² − 122²)` = **38.7 studs**, so a
  neighbour is inside S only while they stand within z ∈ [0, 46.7]. `social/02`'s criterion 1
  (spawn to spawn) passes; its criterion 2 (ten seconds of that neighbour *clearing*, visible
  from A's spawn) holds only in bay 1's first stretch. **Lowering the pitch does not buy it
  back**: the pitch cannot fall below the lane width, and even at a hypothetical lane width of
  40 the budget is 121 studs of a 3,000-stud lane, 4%. **The quantity that defeats it is lane
  length, not pitch.** Squares are not the alternative: at 240 studs across they fail S at
  every moment including the spawn, so this arrangement is strictly better and still short.
  Handed to `social/02` below and flagged.
- **`theme/setting/04` W3 is satisfied and W5 is struck, and this sheet is explicit about
  which.** An earlier draft put a barrier in the opening and then claimed W3 satisfied two
  lines above, which was a contradiction. **The corrected mechanism carries no barrier in any
  opening**: the opening is a hole in construction that is always open and holds nothing, and
  what does not exist until the previous bay completes is *the ground beyond it*. The edge of
  the built lane is bounded by the same plot boundary that bounds the lane on its two long
  sides at all times, which `gameplay/mechanics/06` already owns and requires be non-opaque
  and non-lethal. **What is conditioned is passage, not the opening**, and passage is `W5`.
- **Nothing about the sightline is broken by the openings**, because they sit in the walls the
  lane runs *through*, not the walls it runs *between*: the line from one spawn to the next is
  along X at Z = 8 and crosses one lane wall.
- **A neighbour is nameless at rest and I am not fixing that.**
  `StarterPlayer.NameDisplayDistance` defaults to 100
  `[research: https://robloxapi.github.io/ref/class/StarterPlayer.html]` against a realised 122.
  Raising it is identity's call and my execution.
- **The cost I am accepting, stated rather than hidden: the walk back to the inward opening
  gets long.** From the last cleared patch of the deepest bay it is at most 540 studs, 21
  seconds at the ladder cap's walk speed, about 10 on average. It is inside every cadence rule
  and the mitigation I own is spent: the opening is at the inward wall, so the walk shortens
  as the player clears inward. `[playtest unknown]` whether 10 seconds reads as a stall; the
  lever if it does is a shorter deepest bay.

| # | bay | z start | z end | length | what is built |
|---|---|---|---|---|---|
| 1 | East Terrace | 0 | 120 | 120 | ground and patches at join |
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
  "value": {
    "rowAxis": "+X",
    "laneAxis": "+Z",
    "laneWidthStuds": 120,
    "pitchStuds": 122,
    "assumedBoundaryThicknessStuds": 2,
    "maxBoundaryThicknessStuds": 8,
    "pitchRule": "laneWidthStuds + the inter-plot boundary's thickness, which traversal owns; pitchStuds must never exceed social.maxCoPresenceSeparationStuds.value, which caps that thickness at 8",
    "slotOrigin": "(area.originXZ[0] + (slot - 1) * pitchStuds, 0, area.originXZ[1])",
    "slotClaiming": "lowestFreeIndex",
    "slotsAreContiguousWhileOccupied": true,
    "spawn": {
      "plotLocal": [0, 0, 8],
      "inwardOffsetStatus": "playtest unknown",
      "inwardOffsetTestRange": [4, 16],
      "lookVector": { "slot1": [1, 0, 0], "slot2AndAbove": [-1, 0, 0] },
      "neverFacesLaneAxis": true,
      "atPlotCentre": false
    },
    "coPresence": {
      "scope": "spawnMomentOnly",
      "longitudinalBudgetStuds": 38.7,
      "derivation": "sqrt(S.value^2 - pitchStuds^2)",
      "satisfiesSocial02CriterionOne": true,
      "satisfiesSocial02CriterionTwoBeyondStuds": false,
      "unclosedRequirementOwnedBy": "gameplay/social/02"
    },
    "bayLengthRule": "depths.areas[k].footprintStuds2 / laneWidthStuds",
    "bays": [
      { "ordinal": 1, "zStart": 0,    "zEnd": 120,  "lengthStuds": 120 },
      { "ordinal": 2, "zStart": 120,  "zEnd": 330,  "lengthStuds": 210 },
      { "ordinal": 3, "zStart": 330,  "zEnd": 660,  "lengthStuds": 330 },
      { "ordinal": 4, "zStart": 660,  "zEnd": 1080, "lengthStuds": 420 },
      { "ordinal": 5, "zStart": 1080, "zEnd": 1560, "lengthStuds": 480 },
      { "ordinal": 6, "zStart": 1560, "zEnd": 2040, "lengthStuds": 480 },
      { "ordinal": 7, "zStart": 2040, "zEnd": 2520, "lengthStuds": 480 },
      { "ordinal": 8, "zStart": 2520, "zEnd": 3000, "lengthStuds": 480 }
    ],
    "openings": {
      "perBay": 2,
      "centredOnX": 0,
      "sharedWithNeighbour": true,
      "outwardOpeningOfBay1": "the works' edge, per theme/setting/04",
      "studsBetweenParts": 0,
      "alwaysOpen": true,
      "barrierInOpening": false,
      "gatedUntilPreviousBayComplete": true,
      "gateMechanism": "the ground beyond does not exist yet; the built lane's inward edge is bounded by the same plot boundary that bounds its two long sides, and no barrier is ever placed in an opening"
    },
    "liveGeometry": {
      "patchInstancesExistIn": "the live bay only",
      "groundExistsIn": "every bay from 1 up to and including the live bay",
      "builtWhole": true,
      "bayBuiltAt": "the instant the previous bay's last patch clears",
      "torndownBeyond": "bays more than two outward of the live one are destroyed and rebuilt bare on re-entry"
    },
    "requestedRevisions": [
      { "sheet": "cid/gameplay/mechanics/06-traversal-affordances.md", "change": "traversal.walkableMarginStuds 12 -> 0", "reason": "that sheet offers the 12 studs back if the arrangement cannot otherwise be made to work; at 12 the pitch is 144 and breaches S" },
      { "sheet": "cid/theme/setting/04-permanence-and-passage.md", "change": "strike W5; keep W1-W4 and W6", "reason": "passage is conditioned on the previous bay being complete; the opening itself is unchanged" }
    ],
    "invariants": [
      "pitchStuds <= social.maxCoPresenceSeparationStuds.value",
      "pitchStuds == laneWidthStuds + the realised inter-plot boundary thickness",
      "the realised distance between the spawns of two consecutive occupied slots equals pitchStuds at every bay ordinal",
      "bays[k].lengthStuds * laneWidthStuds == depths.areas[k].footprintStuds2",
      "bays[k].zEnd == bays[k+1].zStart",
      "bays[0].lengthStuds == laneWidthStuds == area.size",
      "the spawn's plot-local Z is not the midpoint of bays[0].zStart and the last bay's zEnd",
      "the spawn's LookVector is parallel to rowAxis and never to laneAxis",
      "no instance with CanCollide true is ever placed inside an opening"
    ]
  }
}
```

## Consequences for other work

- **`gameplay/social/02` inherits an unclosed requirement, with the number.** Its `B2` and
  `B3` (a body **in motion**, whose ground is **visibly being cleared**) and its criterion 2
  (ten seconds of that, visible from A's spawn) hold only while a neighbour is within
  **38.7 studs** longitudinally, out of a lane that runs to 3,000. **I cannot close it and no
  pitch can**, for the arithmetic above. The requirement needs re-deriving against a lane
  rather than a square, and that is that sheet's derivation, not mine. Criterion 1, spawn
  point to spawn point, is satisfied at 122 against 128.
- **`Plots.luau` loses three shipped values and gains a rotation**
  `[research: game/src/server/Plots.luau]`. `PLOT_GUTTER = 40` and the `area.size + 40` pitch
  go: the pitch is 122 and the gutter is zero. The slab stops being `pitch × pitch` and
  becomes `pitchStuds` by the lane's built length. The spawn `Attachment` at the slab centre
  moves to the lane centre line 8 studs inward of the mouth, and **it must carry an
  orientation**: an `Attachment` with no rotation gives a `WorldCFrame` whose `LookVector` is
  −Z, which is across the row, and is why a player currently spawns seeing nobody.
  `Plots.claimSlot`'s lowest-free-index scan is correct and stays.
- **Traversal and set-dressing work inherits two asks.** The 12-stud walkable margin goes to
  0, which that sheet offered; **if it declines, pitch becomes at least 144, criterion 1 fails
  outright, and the fallback is a revision to `area.size` making area 1 rectangular at the
  same 14,400 stud² footprint.** And the inter-plot boundary may be at most 8 studs thick.
  Height, material and opacity stay yours, including the non-opacity `social/02` depends on.
- **Persistence work** should store a saved position **plot-local**, not world-space: slots are
  reassigned on rejoin and `slotOrigin` is a function of slot index, so a stored world position
  lands in someone else's lane. `core-loop/04` criterion 4 asks for the position and no sheet
  had stated the frame.
- **Art and Visuals, Environment** dresses a 120-stud lane, not a 240-stud room. Both long
  walls are seen at close range from everywhere in the bay and are the surface the sightline
  passes through, so they are the one piece of geometry both always in frame and required not
  to obstruct.
- **Offer-ladder work** should read `plots.laneWidthStuds / 2` for the radius ceiling rather
  than `area.size(N)`, which is undefined past depth 1. Numerically identical at 60.
- **Tech and Performance** gets a live-part budget of one bay and a world extent of 20 lanes by
  at least 3,000 studs. **`[research owed: Roblox part-precision and streaming behaviour for
  anchored parts beyond roughly 20,000 studs from the origin]`** bounds sheet `07`'s endless
  run: at 480 studs a bay, bay 42 crosses 20,000 and the lane must rebase from there.
- **Identity work** may now raise `StarterPlayer.NameDisplayDistance` above 122 and get a
  named neighbour at spawn. One property, and the arrangement no longer fights it.

## Pushing back

**Struck: `theme/setting/04-permanence-and-passage` `W5`**, "Nothing conditions passage. The
inward opening is passable whether the part is finished or not," check "count of conditions,
checks, prompts, barriers or refusals attached to an opening: 0". That sheet names this exact
reversal as a one-line strike a later sheet must request; sheet `04` requests it and this
sheet takes the same strike, for the same reason: under `systems/05`'s partition, the Finds a
player walks past exist nowhere else, so W5's own brake ("walking on early forfeits the Finds
under the green you left") makes 24/24 permanently unreachable in a game whose only long-term
objective is 24/24. Striking it also removes the multi-partial-part persistence cost W5
created.

**`W3` is named and *not* struck.** An earlier draft of this sheet placed a barrier in the
opening and asserted W3 satisfied two paragraphs above, which was a contradiction and is
withdrawn. Under the corrected mechanism there is no barrier in any opening at any time
(`openings.barrierInOpening: false`, and an invariant greps for it): the opening is always
open and holds nothing, and what is absent before the previous bay completes is the ground on
the far side, bounded by the same plot boundary that bounds every plot on every side at all
times. `W1`, `W2`, `W4` and `W6` are untouched, and the studs and seconds between one part and
the next are still zero.

## Flagged to the developer

**Co-presence is a spawn-moment property under this arrangement, and that is a smaller game
than `social/02` describes.** A neighbour is perceptible for the first roughly 40 studs of a
3,000-stud lane and never again. Three live options. **(a)** Accept it: `social/02`'s own
decision is "presence alone suffices" and its test is written "from spawn, without input", so
the spawn moment is arguably the whole of what it asked for. **(b)** Require co-presence
throughout, which forces square areas back, which puts pitch at 246 and breaks S at *every*
moment including the spawn. That is strictly worse and I do not recommend it. **(c)** Re-derive
S against a lane, which is `social/02`'s work and may find that a neighbour seen once at spawn
and heard thereafter is sufficient. **Recommendation: (a), with (c) to confirm it.** This is
the one requirement in my domain I could not satisfy and could not make satisfiable.

## Acceptance criteria

1. `plots.pitchStuds` is at most `social.maxCoPresenceSeparationStuds.value`, and the distance
   between the spawn positions returned for slots n and n+1 equals `pitchStuds` for every n
   from 1 to 19 and at every bay ordinal from 1 to 8.
2. The spawn `CFrame`'s `LookVector` is `(1, 0, 0)` for slot 1 and `(-1, 0, 0)` for every slot
   from 2 up, and its Z component is 0 in every case.
3. The spawn's plot-local Z is inside bay 1 and at least 1,400 studs from the midpoint of the
   built lane at eight bays.
4. For every k from 1 to 7, `bays[k].zEnd == bays[k+1].zStart`, each bay reports exactly two
   openings whose X centre is 0, and **no instance with `CanCollide` true exists inside any
   opening's span at any time**.

## Not decided here

Player-to-player collision, the collision group name, chat, plot tenure and the `maxPlayers`
band (`gameplay/social/01`, which holds `social`). The value of `S`, and whether a
spawn-moment-only reading of `B2`/`B3` is acceptable (`gameplay/social/02`; I consume its
bound, set none of it, and hand back what I cannot close). The boundary's height, material,
opacity and realised thickness, and whether the 12-stud walkable margin is actually released
(`gameplay/mechanics/06` and traversal work). The opening's width, ornament and geometry (Art
and Visuals, per `theme/setting/04`). How many areas exist and how much ground each holds
(sheet `04`). What a bay's interior is made of and where the first Find sits (sheet `05`).
What happens past bay 8 (sheet `07`). The saved position's format (persistence; I state only
that it must be plot-local). The respawn delay (architecture). Whether the nameplate is turned
on (`theme/identity/03`).
