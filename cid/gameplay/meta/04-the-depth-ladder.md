# 04 — The depth ladder

**Domain:** Meta & Content · **Category:** Gameplay · **Wave:** 3

## Decision

**Four depths, two areas at each, eight areas in the specced game.** `collection.relicsPerArea`
falls to **3** and `collection.areasPerDepth` rises to **2** (a revision request against
`02-the-collection.md`, not an edit by me). Each area's ground is sized from
`core-loop/05`'s formula applied **per area rather than per depth**, so the lap holds flat
across all eight; density rises with depth. **Nothing gates anything: an area exists when the
area before it is finished, and that is the only condition in the game.**

## Why

- **The ladder is 8 areas because the collection is the only clock and 4 laps is 21 minutes
  of game.** `core-loop/04` dates 24/24 at "minute 11 of session 1" at 6 finds per area, and
  `03-META.md`'s session objective ("find at least one new relic") plus its long-term
  objective (24 of 24) `[brief: soft]` ← `[you accepted: R6 Q3 → R5 Q3]` cannot both be true
  inside one sitting. Eight laps is 1,265 s, which is **1.05 to 2.1 sessions** against the
  brief's 10 to 20 minute band `[brief: binding]` ← `[you chose: R1 Q4]` (`00-CORE.md`).
- **The measured genre asymmetry says even that is thin, and it is why I take the largest
  legal area count rather than the smallest.** DIG ships two islands against a 601-item
  logbook `[research: https://dig-it-roblox.fandom.com/wiki/Collection]`, and finishing one
  *area's* journal there is a 0.4% event across 60,426 and 78,433 earners
  `[research: https://www.rolimons.com/gamebadge/1768992749628648]`
  `[research: https://www.rolimons.com/gamebadge/2794455631182407]`. Few areas, a very large
  collection, and completion is rare. This game is on the wrong side of that on both axes and
  the partition equality only lets me fix one. See `## Flagged to the developer`.
- **Only four `(relicsPerArea, areasPerDepth)` pairs are legal and I take the one Fantasy
  named.** `gameplay/systems/05` makes the areas at a depth *partition* that depth's set, so
  the product is exactly 6: (6,1), (3,2), (2,3), (1,6). `theme/fantasy/02` criterion 1
  requires `ceil(24 / relicsPerArea) >= 8` and states the satisfying pair by name, "3 / 2,
  with zero renames and zero duplicates". (2,3) and (1,6) buy more laps and cost reveal
  cadence: at 1 find per area the reveal, the game's loudest beat, fires once a lap.
- **Sizing is per area, not per depth, and that is what makes 8 areas legal at all.**
  `core-loop/05` forbids a constant growth ratio and supplies
  `size(N)² = min(165·τ(N), 200·τ_tol(N)) / ROUTE_SLACK` against arrival throughput. Applied
  to the *area* ordinal it produces flat laps across all eight (164 / 149 / 161 / 163 / 157 /
  157 / 157 / 157 s). Applied per depth it would put two identical areas at each depth and
  halve the lap on the second, which is the depth-2 dip that sheet called "the one thing all
  three candidate curves agree is wrong."
- **Every footprint is a whole number of authored chunks**, floored to the chunk grid sheet
  `05` sets, which is why the figures are not the raw formula output. Flooring is always
  toward the under-buy cap, never past it.
- **Density rises and size does not, past area 5.** "deeper areas are larger, denser"
  `[brief: binding]` ← `[you chose: R3 Q2]` (`03-META.md`). Size is bounded by arrival
  throughput and arrival is at the ladder's cap from area 5 onward, so from there the brief's
  "denser" is the only true half. Density is carried per chunk (35 / 37 / 39 / 40 by depth),
  is non-decreasing everywhere, strictly rises at every depth step, and stays under
  `core-loop/05`'s tick-saturation ceiling of `lapSeconds / (2 · runtime.clearTickRate)`.
- **The ladder maxes during area 4 at the shipped `upgrades` figures, and that is a Balance
  defect this sheet exposes rather than causes** `[research: game/src/shared/GameConfig.luau]`.
  A greedy free buyer spends all 11,644 currency of the ladder by patch 322 of area 4, so
  `core-loop/05`'s `arrivalDeepest < sweptCap` check fails and areas 5 to 8 are the same
  size. That sheet named the two fixes and this is the one it assigned elsewhere: "`maxLevel`
  rising so the ladder outlasts the collection". Stated as a requirement below, with no
  figure.
- **Gating: none, and three approved sheets already point there.** `theme/setting/04` W5
  ("there is nothing there"), `core-loop/04` ("enterable at the instant one completes, with
  no threshold, no cooldown and no travel worth measuring") and `core-loop/05` ("nothing may
  gate depth on throughput") agree, and `03-META.md` assumed it: "No gating mechanism needed,
  depth is reached by clearing" `[brief: soft]` ← `[I assumed]`, `OPEN.md §5 #3`. **DIG's
  50%-of-the-journal ferry unlock** `[research: https://beebom.com/roblox-dig-locations/]`
  **is a live shipping alternative and I decline it**: it is a completion gate on a game whose
  completion is one twelfth the size, and it would stall the loop 3 to 7 times a session.
- **A purchaser can under-run the lap floor, and exactly one row is exposed.** `τ_tol` is
  defined against a free buyer, so a player holding a value product arrives richer. Row k
  falls under `core-loop/04`'s 75 s floor only above `2 · footprint / 75` studs²/s: 2.18x at
  row 1, 3.82x at row 2, and 6.0x or more at rows 3 to 8, which is above the 4.16x ladder cap
  and therefore unreachable by anyone. Row 1's arrival is 1.00x by construction. **So the
  whole exposure is row 2**, and it needs 3.82x bought out of area 1's 140 patches. That is a
  bound on products, stated below.
- `[playtest unknown]` **Lap wall-clock and therefore every footprint in the table.**
  `LAP_TARGET` 165 s carries a 120 to 200 s range at Balance and every row rescales with it;
  the ordering, the chunk quantisation and the flat-lap shape do not.

| # | depth | set | slice | label | footprint | chunks | patches | spacing | arrival | lap s |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 1 | terrace | 1-3 | East Terrace | 14,400 | 4 | 140 | 6 | 1.00x | 164 |
| 2 | 1 | terrace | 4-6 | West Terrace | 25,200 | 7 | 245 | 6 | 1.92x | 149 |
| 3 | 2 | cistern | 1-3 | East Cistern | 39,600 | 11 | 407 | 6 | 2.80x | 161 |
| 4 | 2 | cistern | 4-6 | West Cistern | 50,400 | 14 | 518 | 6 | 3.52x | 163 |
| 5 | 3 | vault | 1-3 | East Vault | 57,600 | 16 | 624 | 6 | 4.16x | 157 |
| 6 | 3 | vault | 4-6 | West Vault | 57,600 | 16 | 624 | 6 | 4.16x | 157 |
| 7 | 4 | spire | 1-3 | East Spire | 57,600 | 16 | 640 | 6 | 4.16x | 157 |
| 8 | 4 | spire | 4-6 | West Spire | 57,600 | 16 | 640 | 6 | 4.16x | 157 |

```manifest
{
  "provides": "depths",
  "status": "proposed",
  "value": {
    "depthCount": 4,
    "areaCount": 8,
    "sizingRule": "footprint(k) = floorToChunk( min(LAP_TARGET * tau(k), LAP_CEILING * tauTol(k)) / ROUTE_SLACK ), tau(k) = 2*(baseClearRadius + radiusLevel*perLevel)*(baseWalkSpeed + speedLevel*perLevel) at arrival",
    "footprintCeilingStuds2": 73216,
    "unlockRule": "the area before it in this list is complete; nothing else conditions any area or any depth",
    "areas": [
      { "ordinal": 1, "depth": 1, "setId": "terrace", "relicSlice": [1, 3], "label": "East Terrace", "footprintStuds2": 14400, "chunkCount": 4,  "patchCount": 140, "minSpacing": 6, "unlock": "none" },
      { "ordinal": 2, "depth": 1, "setId": "terrace", "relicSlice": [4, 6], "label": "West Terrace", "footprintStuds2": 25200, "chunkCount": 7,  "patchCount": 245, "minSpacing": 6, "unlock": "previousAreaComplete" },
      { "ordinal": 3, "depth": 2, "setId": "cistern", "relicSlice": [1, 3], "label": "East Cistern", "footprintStuds2": 39600, "chunkCount": 11, "patchCount": 407, "minSpacing": 6, "unlock": "previousAreaComplete" },
      { "ordinal": 4, "depth": 2, "setId": "cistern", "relicSlice": [4, 6], "label": "West Cistern", "footprintStuds2": 50400, "chunkCount": 14, "patchCount": 518, "minSpacing": 6, "unlock": "previousAreaComplete" },
      { "ordinal": 5, "depth": 3, "setId": "vault",   "relicSlice": [1, 3], "label": "East Vault",   "footprintStuds2": 57600, "chunkCount": 16, "patchCount": 624, "minSpacing": 6, "unlock": "previousAreaComplete" },
      { "ordinal": 6, "depth": 3, "setId": "vault",   "relicSlice": [4, 6], "label": "West Vault",   "footprintStuds2": 57600, "chunkCount": 16, "patchCount": 624, "minSpacing": 6, "unlock": "previousAreaComplete" },
      { "ordinal": 7, "depth": 4, "setId": "spire",   "relicSlice": [1, 3], "label": "East Spire",   "footprintStuds2": 57600, "chunkCount": 16, "patchCount": 640, "minSpacing": 6, "unlock": "previousAreaComplete" },
      { "ordinal": 8, "depth": 4, "setId": "spire",   "relicSlice": [4, 6], "label": "West Spire",   "footprintStuds2": 57600, "chunkCount": 16, "patchCount": 640, "minSpacing": 6, "unlock": "previousAreaComplete" }
    ],
    "requestedRevisionToCollection": { "relicsPerArea": 3, "areasPerDepth": 2, "sheet": "cid/gameplay/meta/02-the-collection.md", "reason": "areas at one depth partition that depth's set (gameplay/systems/05); 3 x 2 = 6 is the pair theme/fantasy/02 criterion 1 names" },
    "invariants": [
      "areas[0].footprintStuds2 == area.size ^ 2 and areas[0].patchCount == area.patchCount and areas[0].minSpacing == area.minSpacing",
      "count of areas at each depth == collection.areasPerDepth; this key does not carry that number",
      "collection.relicsPerArea * collection.areasPerDepth == the size of every set",
      "every relicSlice spans exactly collection.relicsPerArea names and the slices at one depth partition that set with no overlap and no gap",
      "footprintStuds2 is a whole multiple of layout.chunk.footprintStuds2 and equals chunkCount times it",
      "patchCount == chunkCount * layout.patchesPerChunkByDepth[depth]",
      "patchCount / footprintStuds2 is non-decreasing in ordinal and strictly increases at every depth step",
      "minSpacing > movement.baseClearRadius",
      "footprintStuds2 <= footprintCeilingStuds2 for every row",
      "lapSeconds(k) = footprintStuds2(k) / tau(k) * ROUTE_SLACK is inside 75..200 for every row, both at arrival and one upgrade level behind arrival on both throughput axes",
      "patchCount <= lapSeconds(k) / (2 * runtime.clearTickRate)"
    ]
  }
}
```

## Consequences for other work

- **Balance and Tuning inherits the failure `core-loop/05` predicted, with an address.** At
  shipped `upgrades` values the ladder is fully bought during area 4, so arrival at areas 5
  to 8 is the 4.16x cap and `arrivalDeepest < sweptCap` fails. **The requirement, with no
  figure attached: the sum of every `upgradeCost(u, l)` must exceed the cumulative clearing
  income of areas 1 through 7**, so the last area still has something left to buy. At shipped
  values that is roughly 11,644 against roughly 38,000. Raising `maxLevel`, raising
  `costGrowth` or lowering `value.perLevel` all reach it; which one is entirely yours.
- **Offer-ladder work inherits one bound and it is a bound on products, not on prices.** No
  combination of purchasable `value` multipliers may reach **3.94x**, or a purchaser arrives
  at area 2 above 3.82x base throughput and runs it in under `core-loop/04`'s 75 s floor.
  Areas 3 to 8 need 6.0x or more to be under-run and no player can reach that, so this is a
  single-row exposure and the figure is checkable against any SKU sheet.
- **`02-the-collection.md` needs a two-field revision and I have not made it.**
  `relicsPerArea` 6 → 3, `areasPerDepth` 1 → 2. Its criterion 4 ("`relicsPerArea` is not
  fewer than the largest set") is already false as a general rule: `bridge/schema.mjs` lines
  252 to 258 compute `areasPerDepth × relicsPerArea` `[research: bridge/schema.mjs]`, and
  `systems/05` has tightened that comparison to equality. **The 24 names, the 4 set labels
  and the class noun are untouched: zero renames.**
- **Payoff-cadence work owns a consequence it was warned about.** Set completion no longer
  coincides with every area completion, only with the second area of each depth. `02`'s
  reason for choosing 6 is spent. Reveals still carry the 90 s rule alone: at 3 per lap the
  mean above-tick gap from reveals is 50 to 55 s at every row.
- **Persistence work** now stores completion for 8 areas rather than 1, keyed by `ordinal`,
  plus the ordinal the player is currently in (`theme/setting/04`'s one new bounded field).
  It does not store 8 layouts: `layout` is derived from the seed and the ordinal.
- **Vocabulary** gets 8 area labels, all two words, Title Case, 10 to 12 characters, no
  temporal word (`theme/lore/01` L3), compass-qualified instances of the four kinds
  (`theme/setting/02`). `East Terrace` is the merged value and is unchanged.
- **Plot-arrangement work (sheet `06`, this domain)** consumes `footprintStuds2` and derives
  every bay's length from it. **This key carries no dimension**, only ground area, because
  the shape of that ground is an arrangement decision and carrying it twice is how two keys
  diverge.
- **Tech and Performance** sizes against 640 anchored patch parts per plot, not 140, and
  against exactly one live area per player at a time.

## Pushing back

**Overruled: `gameplay/core-loop/01-payoff-frequency` criterion 2, the half that asserts
`collection.relicsPerArea >= 4`.** I take 3. The criterion's other half,
`area.patchCount / relicsPerArea × secondsPerPatch >= 15`, is *kept* and passes on every row
of my table at 50 to 55 s against its 15 s floor, and the 90-second above-tick rule that
`>= 4` exists to protect is met by reveals alone at every row. The `>= 4` threshold was
derived against a single 140-patch area with one area per depth; under eight areas the
quantity it bounds is a property of the lap, and the lap has grown. **`theme/fantasy/02`
criterion 1 is the sheet I could not overrule instead**: it is a floor on how many parts the
player finishes, its purpose is that the finite promise outlasts one session, and there is no
reading of it that survives 4 areas.

**Overruled in part: `gameplay/core-loop/05-depth-escalation` criterion 4**, "No `area` sheet
at any depth may exceed that figure", where the figure is `sqrt(200 · sweptCap / ROUTE_SLACK)`
= 270 studs. I keep the ceiling in the quantity that sheet's own formula computes, a footprint
of 73,216 studs², and my largest row is 57,600. I do not keep its square root, because sheet
`06` makes areas rectangular so that plot pitch can decouple from area size, which is a
change three approved sheets asked for and none could make. `area.size` at depth 1 stays 120
and that criterion still passes as written against the merged manifest.

## Flagged to the developer

**"~24 objects in 4 sets of 6" `[you accepted: R4 Q4]` is the value I would change, and I
cannot reach it from here.** Under the partition equality the whole game is 8 laps and 21
minutes, and `core-loop/04`'s own printed test wants one set to outlast a 20-minute session,
which needs 8 laps per set and is unreachable at *any* legal split of a 6-member set. The
alternatives: **(a)** 4 sets of 12, 48 finds, `relicsPerArea` 3 and `areasPerDepth` 4,
16 areas, about 42 minutes, zero systems changes and 24 more object names and models;
**(b)** 6 sets of 6 across 6 depths, which `core-loop/05` rejects because a fifth depth fails
its arrival-under-cap check; **(c)** ship 8 areas and accept that the collection finishes in
the second session. **Recommendation: (a).** It is the only one that moves content volume
toward the shipping comparison above, it costs Art 24 models rather than any system its own
work, and `theme/setting/02` has already ruled that any `areasPerDepth >= 1` is free of
fiction cost. I have specced (c) so a build is not blocked.

## Not decided here

Every coefficient: `ROUTE_SLACK`, `LAP_TARGET`, `UNDERBUY_LEVELS`, and every `upgrades[]`
figure (Balance and Tuning). What one area's interior is made of, the chunk grid the
footprints are floored to, and where the Finds sit inside an area (sheet `05`, this domain).
The shape of an area's ground, the lane width, every bay's length and where a plot sits
(sheet `06`, this domain, which holds `plots`). What happens after area 8 (sheet `07`).
Which axis each set grants (sheet `03`). Whether `collection`'s two fields are actually
revised (the schema maintainer, from the request in the key). What any area looks like
(Art and Visuals, Environment). The layout seed's value (architecture, and it is currently
an undeclared literal in `Layout.luau` `[research: game/src/shared/Layout.luau]`).
