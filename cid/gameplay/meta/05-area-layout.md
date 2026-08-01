# 05 — Area layout

**Domain:** Meta & Content · **Category:** Gameplay · **Wave:** 3

## Decision

**An area is a run of authored chunks laid nose to tail inward. One chunk is 120 studs across
the lane by 30 studs deep, and carries a fixed number of patch anchors set by its depth
(35 / 37 / 39 / 40).** Four disjoint chunk families, one per depth, **8 authored chunks each**
`[playtest unknown]`, each placeable mirrored or not, drawn without replacement per area from
the layout seed. **The area's Finds sit one per equal contiguous group of its chunk run**, so
three finds are spread across the whole walk rather than rolled anywhere.

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
- **30 studs deep is chosen against the walk, not the art.** At the base sweep a player
  crosses one chunk in about 2 seconds and at the ladder cap in under 1, so a chunk is never
  the unit of a payoff; and 3,600 stud² is the largest step that still lets sheet `04`'s
  footprints land inside `core-loop/05`'s under-buy cap on every row after flooring. A 60-stud
  chunk overshoots row 2's cap by 6% and fails that sheet's 200 s check.
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
  rule becomes unsatisfiable at depth 3 and 4 and R1 degrades to the window rule alone.
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
- **The nearest patch to the spawn must be reachable in one step and not on arrival.**
  `gameplay/onboarding/01` places the first Find on the patch nearest the plot origin and
  `[brief: soft]` ← `[you accepted: R6 Q3]` has the player spawn touching overgrowth. A patch
  inside `movement.baseClearRadius` at spawn clears with no input, which
  `theme/fantasy/03` forbids in kind ("the tick is a result, not a gift"). The band below is
  the whole fix.
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
| R7 | In area ordinal 1 only, group 1's find sits on the patch nearest the plot origin | any other area front-loading its find |
| R8 | The nearest patch centre to the spawn is at least `movement.baseClearRadius` and at most `baseClearRadius + minSpacing` away | a patch that clears itself at spawn, or a spawn with no overgrowth in reach |
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
      "rule": "split the chunk run into collection.relicsPerArea contiguous groups of as-equal-as-possible length; bury exactly one find in each; group g carries depths.areas[k].relicSlice[0] + g - 1",
      "withinGroup": "one patch index drawn from the seed over that group's indices",
      "onboardingOverride": { "areaOrdinal": 1, "group": 1, "patch": "nearest the plot origin" },
      "mayReadPatchTier": false,
      "mayReadPlayerState": false
    },
    "spawnAdjacency": { "minStuds": "movement.baseClearRadius", "maxStuds": "movement.baseClearRadius + minSpacing" },
    "repetitionRules": ["R1", "R2", "R3", "R4"],
    "invariants": [
      "depths.areas[k].chunkCount * chunk.footprintStuds2 == depths.areas[k].footprintStuds2",
      "depths.areas[k].chunkCount * families[depth].patchesPerChunk == depths.areas[k].patchCount",
      "chunksPerFamily * orientations >= max chunkCount over all areas",
      "patchesPerChunk is strictly increasing in depth",
      "no two anchors in one chunk are closer than depths.areas[k].minSpacing"
    ]
  }
}
```

## Consequences for other work

- **`Layout.luau` is rewritten, not tuned** `[research: game/src/shared/Layout.luau]`. It
  currently builds one jittered grid over `GameConfig.Area.size` squared, places set one
  unconditionally, and draws the remaining finds uniformly over the whole field. Under this
  key it takes an area ordinal, resolves that area's chunk run, concatenates per-chunk anchor
  sets, and places one find per group. Its `indexNearestOrigin` helper survives and is used by
  R7 alone. Its `LAYOUT_SEED = 1` is still an undeclared literal owned by nobody and R9 makes
  its value a save-migration boundary; **architecture should give the seed a key.**
- **Persistence work** keys `cleared` by (area ordinal, patch index) rather than by patch
  index alone, because eight index spaces now exist. `theme/setting/04` W5 already permits
  more than one part in a partial state.
- **Art and Visuals, Environment** owes **32 chunk looks, 8 per depth kind**, each dressing a
  120 by 30 slab whose two long edges must butt against the same edge of any other chunk in
  its family, in either mirroring. **What a Terrace chunk means is Theme's and what it looks
  like is yours; how many exist and which depths share none is decided here.** The whole
  present-and-absent inventory of `theme/setting/05` applies unchanged inside a chunk.
- **Tech and Performance** gets a per-chunk part budget of at most 40 anchored patches, one
  live area at a time, and a spawn cost that is linear in chunk count.
- **Payoff-cadence work** can now bound the reveal spacing rather than assume it: with one
  find per group the gap between consecutive reveals is between one third of a lap minus one
  group and one third plus one, which at sheet `04`'s rows is 50 to 55 seconds against a 90
  second ceiling.
- **Whoever builds the config predicate** can check R1, R3, R4, R5 and R9 statically by
  generating all eight runs from the seed; R2, R6, R7, R8 and R10 are one pass over the
  generated field. None of them needs a running game.

## Acceptance criteria

1. For every area ordinal 1 to 8, the generated run holds `depths.areas[k].chunkCount`
   variants, no variant twice (R1), every chunk from that area's depth family (R4), and the
   run's total anchor count equals `depths.areas[k].patchCount`.
2. Every generated area **at ordinals 1 to 8** buries exactly `collection.relicsPerArea`
   finds, one in each of the `relicsPerArea` contiguous chunk groups, and the multiset of
   names buried equals `depths.areas[k].relicSlice` applied to that set. Post-terminal bays
   (ordinal > 8) bury nothing — see `07-after-the-last-find`, whose stop-applying table
   carries the resolution. Without this scope word a verifier running the criterion against a
   post-terminal bay fails a build that is behaving correctly.
3. In area 1 the find in group 1 is on the patch with the smallest XZ distance to the plot
   origin; in areas 2 to 8 the group-1 find is not on that patch unless the seed drew it.
4. Two calls to the layout builder with the same (`layoutSeed`, `ordinal`) and different
   player state return byte-identical anchor positions, tier indices and find placements.

## Not decided here

How many areas exist, their footprints, patch counts and spacing (sheet `04`, this domain,
which holds `depths`). The lane's width, every bay's length and where a plot sits (sheet `06`,
which holds `plots`). What a chunk looks like, its material, its stone and its dressing
(Art and Visuals, Environment, inside `theme/setting/05`'s closed inventory). What a Terrace,
Cistern, Vault or Spire *means* (Theme and Narrative, already ruled in `theme/setting/02`).
The layout seed's value and where it lives (architecture). Tier weights and whether they shift
with depth (`gameplay/systems/01` holds `tiers`; `systems/03` records that a per-depth weight
dimension does not exist yet). Priority 2's richer authored chunk variety: the library size is
a parameter and adding to it touches no system, and nothing further about it is described here.
