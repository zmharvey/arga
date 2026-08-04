# 05 — Area layout

**Domain:** Meta & Content · **Category:** Gameplay · **Wave:** 3

## Decision

**An area is a run of authored chunks laid nose to tail inward. One chunk is 120 studs across
the lane by 30 studs deep, and carries a fixed number of patch anchors set by its depth
(35 / 37 / 39 / 40).** Four disjoint chunk families, one per depth, **8 authored chunks each**
`[playtest unknown]`, each placeable mirrored or not, drawn without replacement per area from
the layout seed. **The area's Finds sit one per contiguous group of its patch run**, so three
finds are spread across the whole walk rather than rolled anywhere.

## Why

- `[brief: binding]` ← `[you chose: R5 Q1]` (`03-META.md`, `02-GAMEPLAY.md`): "Endless via
  shuffled authored chunks, not generation", "a set of hand-authored area layouts, recombined
  with randomised object placement and density". Priority 1 names "chunk shuffling for endless
  areas". **Nothing anywhere in the contract carries a chunk**, which is why this key exists.
- **The chunk spans the full lane width, so composition is one-dimensional.** Sheet `06`
  makes a plot a lane of fixed width and sheet `04` makes an area a footprint, so an area's
  only free dimension is its length. A full-width slab turns "compose a 57,600 stud² area"
  into "concatenate 16 chunks", which is an ordering problem with one rule instead of a
  tiling problem with several. `[cid: decided]`
- **30 studs deep is a granularity choice, not a ceiling one.** Sheet `04` floors every
  footprint to the chunk grid, so a coarser chunk costs lap flatness rather than legality: at
  a 3,600 stud² step row 2 lands at 25,200 and a **149 s** lap, 9% under target, and at a
  7,200 stud² step (a 60-stud chunk, two per lane row) it floors to 21,600 and a **128 s**
  lap, a 22% dip. That dip is the depth-2 dip `core-loop/05` rejected by name. A 30-stud
  chunk is also crossed in about 2 seconds at base sweep, so it is never the unit of a payoff.
- **Four families that share nothing, because the four depths are four kinds of thing.**
  `theme/setting/02-extent` fixes the four set labels as four *kinds* of part, and
  `theme/lore/01` requires areas 2 to 4 to be named as parts of a building. A chunk that
  appeared in both a Terrace and a Vault would make the two the same place. The cost is 32
  authored chunks rather than 8, and it is the cost of the fiction already ruled.
- **8 per family, doubled by mirroring, is the smallest library that never repeats inside one
  area.** The largest area is 16 chunks; 8 chunks at 2 orientations is exactly 16 variants, so
  drawing without replacement fills it and the repetition rule below is satisfiable at the
  floor rather than only above it. `[playtest unknown]` **starting value 8 per family (32
  total), test range 8 to 16 per family (32 to 64 total)**; below 8 the without-replacement
  rule becomes unsatisfiable at depths 3 and 4 and R1 degrades to the window rule alone.
- **The repetition question the brief left open is answered as a visibility test, not a
  taste one.** `03-META.md` leaves open "how many authored layouts are needed before shuffling
  stops feeling repetitive". Repetition is *seen*, not counted, so the rule bounds what can be
  in frame at once rather than what exists in the library. `[cid: decided]`
- **Find placement is the surviving half of the brief's highest-risk item.**
  `03-META.md`: "discovery rates must be generous enough that a typical session yields at
  least one find, this is the highest-risk tuning in the game" `[brief: binding]` as a stated
  risk. `gameplay/systems/05` fixed *which* names and that placement is seed-derived; it
  routed "whether burial is uniform or spread" here. **Uniform-random burial puts all three
  finds in the first third of the walk on about 4% of areas and in the last third on about
  4%**, and the second case is a lap that pays nothing above a tick for a hundred seconds.
  One find per contiguous group removes both tails without adding a rate. `[cid: decided]`
- **The first area's groups are cut by patch ordinal, not by chunk, and `onboarding/02` is
  why.** `firstSession.placement` fixes the second find between ordinals **8 and 40** in
  spawn-distance order, for the stated reason that at ordinal 130 "minute 1's back half holds
  nothing above a currency tick". Chunk-contiguous groups over a 4-chunk area put group 2 at
  ordinals 36 to 70, which lands inside that band on about 14% of seeds. **Cutting area 1's
  groups at `secondFindOrdinalMin` and `secondFindOrdinalMax` satisfies the band on every
  seed** and costs nothing anywhere else, because no other area has an onboarding band.
- **Spawn adjacency is withdrawn from this sheet entirely.** An earlier draft required the
  nearest patch be at least `movement.baseClearRadius` from the spawn, to stop a reveal firing
  with no input. `onboarding/02` solves the same problem the other way, by arming the clearing
  pass after `firstSession.armDistanceStuds` of movement, and **that fix is already wired into
  the build's clearing tick while mine was not.** Its interval and mine are disjoint and only
  one can be built, so mine goes. The reveal still lands on the same tick as the first clear,
  which is what that sheet needs and what my version would have broken.
- **The first Find joins on the spawn point, not the plot origin.** `gameplay/onboarding/01`
  says "the patch nearest the **player's spawn**" and `firstSession.placement.ordering` sorts
  by distance from the plot spawn point. Under sheet `06` the spawn sits inward of the plot
  origin, so at 6-stud spacing the nearest-to-origin and nearest-to-spawn patches are
  routinely different, and picking the wrong one means the first patch the player clears has
  nothing under it. **Three keys now name one reference point.**
- **Find placement may not read a patch's tier** (`gameplay/systems/03`: one graded ladder
  exists and it is the overgrowth's). The draw below reads indices only.

| id | rule | what fails it |
|---|---|---|
| R1 | No chunk variant appears twice in one area's run | any area whose run holds a duplicate variant |
| R2 | No variant appears twice inside any window of 6 consecutive chunks (180 studs, about two phone screens) | the surviving guarantee if the library is cut below 8 |
| R3 | The chunk at position 1 of an area differs, ignoring mirroring, from the chunk at position 1 of the area before it | two consecutive areas that open on the same slab |
| R4 | Every chunk in a run belongs to that area's depth family | a Vault chunk in a Cistern |
| R5 | Exactly `collection.relicsPerArea` finds per area, one per contiguous group | an area with two finds in one group, or a group with none |
| R6 | The find-carrying patch within a group is drawn from the seed and the group's index set only, never from a tier, a name or any player state | a draw that reads `patch.tierIndex` or `state.found` |
| R7 | In area ordinal 1 only, group 1's find sits on the patch nearest **the plot spawn point** | placing it nearest the plot origin, which is a different patch |
| R8 | In area ordinal 1 only, groups are cut at `firstSession.placement.secondFindOrdinalMin` and `secondFindOrdinalMax` in spawn-distance order, not by chunk | a group-2 draw outside onboarding's band |
| R9 | Patch index order is chunk order, then within-chunk anchor order, and is stable for a given (`layoutSeed`, `ordinal`) | any reorder, which is a save migration and not a refactor |
| R10 | No anchor sits within half a patch footprint of its chunk's edge | a patch straddling two chunks |

```manifest
{
  "provides": "layout",
  "value": {
    "chunk": { "widthStuds": 120, "depthStuds": 30, "footprintStuds2": 3600, "edgeKeepoutStuds": 1.5 },
    "chunksPerFamily": 8,
    "chunksPerFamilyRange": [8, 16],
    "chunksPerFamilyStatus": "playtest unknown",
    "orientations": ["asAuthored", "mirroredAcrossLaneCentre"],
    "variantsPerFamily": 16,
    "families": [
      { "depth": 1, "setId": "terrace", "idPrefix": "terrace-", "patchesPerChunk": 35 },
      { "depth": 2, "setId": "cistern", "idPrefix": "cistern-", "patchesPerChunk": 37 },
      { "depth": 3, "setId": "vault",   "idPrefix": "vault-",   "patchesPerChunk": 39 },
      { "depth": 4, "setId": "spire",   "idPrefix": "spire-",   "patchesPerChunk": 40 }
    ],
    "familiesShareNoChunk": true,
    "composition": "an area of N chunks is an ordered run of N variants drawn without replacement from its depth family's 16, seeded by (layoutSeed, areaOrdinal) and by nothing else",
    "anchorSource": "authored per chunk; until authoring exists, generated once from hash(layoutSeed, chunkId) and frozen, which is the same data by a cheaper route",
    "findPlacement": {
      "rule": "split the area's patch run into collection.relicsPerArea contiguous groups and bury exactly one find in each; group g carries the g-th name of the area's resolved slice, per depths.relicSliceAssignment",
      "groupCutBy": { "areaOrdinal1": "patch ordinal in spawn-distance order, at firstSession.placement.secondFindOrdinalMin and secondFindOrdinalMax", "allOtherAreas": "chunk, into as-equal-as-possible contiguous runs" },
      "withinGroup": "one patch index drawn from the seed over that group's indices",
      "onboardingOverride": { "areaOrdinal": 1, "group": 1, "patch": "nearest the plot spawn point", "appliesExactlyOnce": true },
      "mayReadPatchTier": false,
      "mayReadPlayerState": false
    },
    "spawnAdjacencyOwnedBy": "onboarding, via firstSession.placement.spawnToNearestPatchMaxStuds and firstSession.armDistanceStuds; this key states no interval of its own",
    "repetitionRules": ["R1", "R2", "R3", "R4"],
    "invariants": [
      "depths.areas[k].chunkCount * chunk.footprintStuds2 == depths.areas[k].footprintStuds2",
      "depths.areas[k].chunkCount * families[depth].patchesPerChunk == depths.areas[k].patchCount",
      "chunksPerFamily * orientations >= max chunkCount over all areas",
      "patchesPerChunk is strictly increasing in depth",
      "no two anchors in one chunk are closer than depths.areas[k].minSpacing",
      "the nearest patch to the spawn satisfies firstSession.placement.spawnToNearestPatchMaxStuds, which this key does not restate"
    ]
  }
}
```

## Consequences for other work

- **`Layout.luau` is rewritten, not tuned** `[research: game/src/shared/Layout.luau]`. It
  currently builds one jittered grid over `GameConfig.Area.size` squared, places set one
  unconditionally, and draws the remaining finds uniformly over the whole field. Under this
  key it takes an area ordinal, resolves that area's chunk run and slice, concatenates
  per-chunk anchor sets, and places one find per group. Its `indexNearestOrigin` helper must
  become `indexNearestSpawn` and is used by R7 alone. Its `LAYOUT_SEED = 1` is still an
  undeclared literal owned by nobody, and R9 plus `depths.relicSliceAssignment` make its value
  a save-migration boundary; **architecture should give the seed a key.**
- **Onboarding work owns spawn adjacency outright now.** This sheet asserts no interval, so
  `firstSession.placement.spawnToNearestPatchMaxStuds` and `armDistanceStuds` are the only
  statements of it and `layout` is the routine that must satisfy them. If that band moves,
  nothing here changes.
- **Persistence work** keys `cleared` by (area ordinal, patch index) rather than by patch
  index alone, because eight index spaces now exist.
- **Art and Visuals, Environment** owes **32 chunk looks, 8 per depth kind**, each dressing a
  120 by 30 slab whose two long edges must butt against the same edge of any other chunk in
  its family, in either mirroring. **What a Terrace chunk means is Theme's and what it looks
  like is yours; how many exist and which depths share none is decided here.** The whole
  present-and-absent inventory of `theme/setting/05` applies unchanged inside a chunk.
- **Tech and Performance** gets a per-chunk part budget of at most 40 anchored patches, one
  live area at a time, and a spawn cost linear in chunk count.
- **Payoff-cadence work** can bound the reveal spacing rather than assume it: with one find
  per group the gap between consecutive reveals is one third of a lap plus or minus one group,
  which at sheet `04`'s rows is 50 to 55 seconds against a 90 second ceiling.
- **Whoever builds the config predicate** can check R1, R3, R4, R5, R8 and R9 statically by
  generating all eight runs from the seed; R2, R6, R7 and R10 are one pass over the generated
  field. None of them needs a running game.

## Flagged to the developer

Two calls made on the brief's silence, both with a cost attached.

1. **32 authored chunks is the priority-1 bill, and it follows from the fiction rather than
   from this sheet.** Depths share no chunk because `theme/setting/02` makes them four kinds
   of part. If 32 is too many to author, the cheapest reduction is sharing a family between
   depths 3 and 4 (24 chunks), which makes a Vault and a Spire the same place and needs a
   ruling from Theme, not from me. The library size itself is a parameter with a stated range
   and moving it inside 8 to 16 needs nobody.
2. **Finds are spread by rule rather than rolled, which trades variance for cadence.** One
   find per contiguous group means a player always meets one roughly every third of a lap and
   never gets the lucky lap where all three surface in the first minute. The brief calls
   discovery rate the highest-risk tuning in the game and asks only that a session yield at
   least one find; this rule guarantees three per lap and removes both tails. If the lucky lap
   is wanted back, the lever is widening the groups rather than returning to uniform burial.

## Acceptance criteria

1. For every area ordinal 1 to 8, the generated run holds `depths.areas[k].chunkCount`
   variants, no variant twice (R1), every chunk from that area's depth family (R4), and the
   run's total anchor count equals `depths.areas[k].patchCount`.
2. Every generated area at ordinals 1 to 8 buries exactly `collection.relicsPerArea` finds,
   one in each of the `relicsPerArea` contiguous groups, and the multiset of names buried
   equals that area's resolved slice; post-terminal bays bury none.
3. In area 1 the find in group 1 is on the patch with the smallest XZ distance to the **plot
   spawn point**, and the find in group 2 sits at a patch ordinal between
   `firstSession.placement.secondFindOrdinalMin` and `secondFindOrdinalMax` inclusive in
   spawn-distance order. The override is applied exactly once across all eight areas.
4. Two calls to the layout builder with the same (`layoutSeed`, `ordinal`) and different
   player state return byte-identical anchor positions, tier indices and find placements.

## Not decided here

How many areas exist, their footprints, patch counts and spacing, and which slice each area
buries (sheet `04`, this domain, which holds `depths`). **How far the nearest patch sits from
the spawn, and when the clearing pass arms** (`onboarding/02`, which holds `firstSession`;
this sheet withdrew its own interval and states none). Which patch carries the first Find in
the shipped build's terms (`gameplay/onboarding/01`, which holds `onboarding`; I join on its
reference point). The lane's width, every bay's length and where a plot sits (sheet `06`).
What a chunk looks like, its material and its dressing (Art and Visuals, inside
`theme/setting/05`'s closed inventory). What a Terrace, Cistern, Vault or Spire *means*
(Theme and Narrative, ruled in `theme/setting/02`). The layout seed's value and where it
lives (architecture). Tier weights and whether they shift with depth (`gameplay/systems/01`).
Priority 2's richer authored chunk variety: the library size is a parameter and adding to it
touches no system, and nothing further about it is described here.
