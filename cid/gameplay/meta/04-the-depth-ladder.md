# 04 — The depth ladder

**Domain:** Meta & Content · **Category:** Gameplay · **Wave:** 3

## Decision

**Four depths, two areas at each, eight areas in the specced game.** `collection.relicsPerArea`
falls to **3** and `collection.areasPerDepth` rises to **2** (a revision request against
`02-the-collection.md`, not an edit by me). Each area's ground is sized from
`core-loop/05`'s formula applied **per area rather than per depth**, so the lap holds flat
across all eight; density rises with depth. **The only condition anywhere in the ladder is
that the area before it is finished, and taking that condition means striking
`theme/setting/04` W5**, which is done explicitly below rather than assumed.

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
- **Which of a depth's two slices lands in which of its two areas is not mine to fix.**
  `gameplay/systems/05` lists it as one of exactly two random quantities in the game
  (`discovery.theOnlyRandomQuantities[1]`, "the order in which a depth's slices are assigned
  to its areas"), so the rows below carry a **seeded** slice index rather than a literal one.
  The partition is fixed and the order is drawn.
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
- **Density rises and size does not, past area 5.** Size is bounded by arrival throughput and
  arrival is at the ladder's cap from area 5 onward, so from there only the brief's "denser"
  survives. That falsifies half a binding line and it is pushed back on below rather than
  absorbed. Density is carried per chunk (35 / 37 / 39 / 40 by depth), is non-decreasing
  everywhere, strictly rises at every depth step, and stays under `core-loop/05`'s
  tick-saturation ceiling of `lapSeconds / (2 · runtime.clearTickRate)`.
- **The ladder maxes during area 4 at the shipped `upgrades` figures, and that is a Balance
  defect this sheet exposes rather than causes** `[research: game/src/shared/GameConfig.luau]`.
  A greedy free buyer spends all 11,644 currency of the ladder by patch 320 of area 4, so
  `core-loop/05`'s `arrivalDeepest < sweptCap` check fails and areas 5 to 8 are the same
  size. That sheet named the two fixes and this is the one it assigned elsewhere: "`maxLevel`
  rising so the ladder outlasts the collection". Stated as a requirement below, no figure.
- **Passage: one condition, and it is a strike on an approved sheet rather than an absence.**
  `core-loop/04` ("enterable at the instant one completes, with no threshold, no cooldown and
  no travel worth measuring") and `core-loop/05` ("nothing may gate depth on throughput")
  both hold under `previousAreaComplete`: it is not a threshold, not a cooldown, not a
  purchase and not a throughput test, and an under-buying player is never refused. What it
  *is* is a condition on an opening, which `theme/setting/04` W5 sets at zero. **DIG's
  50%-of-the-journal ferry unlock** `[research: https://beebom.com/roblox-dig-locations/]`
  **is a live shipping alternative and I decline it separately**: it is a completion gate on
  a game whose collection is one twelfth the size.
- **The lap floor is under-run by a purchaser, and the binding product is the radius pass,
  not the value pass.** A `value` multiplier only advances the same purchase order sooner, so
  the value-only threshold at row 2 is **about 7x**, well above any shipped product. A
  `radius` pass multiplies τ directly and is **not** bounded by the 4.16x ladder cap, so it is
  the one that breaks the table. The per-row bounds are below, **two rows breach at the
  offer ladder's shipped 1.75**, and **resizing cannot fix it**: row 2 is already at its
  under-buy cap (27,104 raw, floored to 25,200), and the 34,650 the 75 s floor would need puts
  its one-level-behind lap at 255.7 s, past `core-loop/04`'s 200 s ceiling.
- **Row 1's `maxRadiusProduct` was a null and is now the figure this sheet already derived,
  2.18.** `cid/tech/deploy/02` forbids an explicit null in an emitted value, and no sentinel
  was correct here: `"none"` would assert that row 1 accepts no radius product at all, and
  `"unbounded"` would assert it accepts any, while the truth stated twice in this sheet's own
  prose is that row 1 *has* a threshold of about 2.18x and no shipped product reaches it. So
  the field is **restructured by supplying the number rather than substituted with a
  sentinel**, which also makes `invariants[11]` evaluable on all eight rows instead of seven.
  No figure is invented: 2.18 is the value already printed in the table below and in this
  sheet's consequences. Note that `gameplay/balance/04-axis-budget` has separately requested
  the whole field be **deleted** in favour of `axisBudget.jointLapBound`; that request is
  untouched and, if taken, removes this site rather than re-sentinelling it.
- `[playtest unknown]` **Lap wall-clock and therefore every footprint in the table.**
  `LAP_TARGET` 165 s carries a 120 to 200 s range at Balance and every row rescales with it;
  the ordering, the chunk quantisation and the flat-lap shape do not.

| # | depth | set | label | footprint | chunks | patches | spacing | arrival | lap s | max radius product |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 1 | terrace | East Terrace | 14,400 | 4 | 140 | 6 | 1.00x | 164 | 2.18 (safe at every shipped product) |
| 2 | 1 | terrace | West Terrace | 25,200 | 7 | 245 | 6 | 1.92x | 149 | **1.27** |
| 3 | 2 | cistern | East Cistern | 39,600 | 11 | 407 | 6 | 2.80x | 161 | **1.44** |
| 4 | 2 | cistern | West Cistern | 50,400 | 14 | 518 | 6 | 3.52x | 163 | 1.84 |
| 5 | 3 | vault | East Vault | 57,600 | 16 | 624 | 6 | 4.16x | 157 | 2.10 |
| 6 | 3 | vault | West Vault | 57,600 | 16 | 624 | 6 | 4.16x | 157 | 2.10 |
| 7 | 4 | spire | East Spire | 57,600 | 16 | 640 | 6 | 4.16x | 157 | 2.10 |
| 8 | 4 | spire | West Spire | 57,600 | 16 | 640 | 6 | 4.16x | 157 | 2.10 |

```manifest
{
  "provides": "depths",
  "value": {
    "depthCount": 4,
    "areaCount": 8,
    "sizingRule": "footprint(k) = floorToChunk( min(LAP_TARGET * tau(k), LAP_CEILING * tauTol(k)) / ROUTE_SLACK ), tau(k) = 2*(baseClearRadius + radiusLevel*perLevel)*(baseWalkSpeed + speedLevel*perLevel) at arrival",
    "footprintCeilingStuds2": 73216,
    "unlockRule": "the area before it in this list is complete; nothing else conditions any area or any depth. This is a strike on theme/setting/04 W5, taken in this sheet's Pushing back.",
    "relicSliceAssignment": "each depth's set is cut into collection.areasPerDepth contiguous slices of collection.relicsPerArea names in name order; the slices are assigned to that depth's areas in an order seeded by (layoutSeed, depth), per gameplay/systems/05 discovery.theOnlyRandomQuantities[1]",
    "purchaserFloorRule": "row k is under core-loop/04's 75 s floor above tau = 2 * footprintStuds2 / 75; the product of every product factor on the radius axis must stay at or under that row's maxRadiusProduct",
    "maxRadiusProductIsAlwaysANumber": "every row carries a number, including row 1. It USED to carry a null on row 1, meaning 'no shipped product comes near this row'. cid/tech/deploy/02 forbids an explicit null in an emitted value, and neither sentinel was safe here: \"none\" reads as 'no radius product is permitted' and \"unbounded\" reads as 'any is', while the truth is a real threshold of about 2.18x that nothing shipped reaches. The figure was already derived twice in this sheet's prose, so the field is filled rather than sentinelled, and invariants[11] is now evaluable on all eight rows instead of seven.",
    "valueOnlyPurchaserThreshold": 7.0,
    "areas": [
      { "ordinal": 1, "depth": 1, "setId": "terrace", "relicSliceIndex": "seeded(layoutSeed, depth)", "label": "East Terrace", "footprintStuds2": 14400, "chunkCount": 4,  "patchCount": 140, "minSpacing": 6, "unlock": "none",                  "maxRadiusProduct": 2.18 },
      { "ordinal": 2, "depth": 1, "setId": "terrace", "relicSliceIndex": "seeded(layoutSeed, depth)", "label": "West Terrace", "footprintStuds2": 25200, "chunkCount": 7,  "patchCount": 245, "minSpacing": 6, "unlock": "previousAreaComplete", "maxRadiusProduct": 1.27 },
      { "ordinal": 3, "depth": 2, "setId": "cistern", "relicSliceIndex": "seeded(layoutSeed, depth)", "label": "East Cistern", "footprintStuds2": 39600, "chunkCount": 11, "patchCount": 407, "minSpacing": 6, "unlock": "previousAreaComplete", "maxRadiusProduct": 1.44 },
      { "ordinal": 4, "depth": 2, "setId": "cistern", "relicSliceIndex": "seeded(layoutSeed, depth)", "label": "West Cistern", "footprintStuds2": 50400, "chunkCount": 14, "patchCount": 518, "minSpacing": 6, "unlock": "previousAreaComplete", "maxRadiusProduct": 1.84 },
      { "ordinal": 5, "depth": 3, "setId": "vault",   "relicSliceIndex": "seeded(layoutSeed, depth)", "label": "East Vault",   "footprintStuds2": 57600, "chunkCount": 16, "patchCount": 624, "minSpacing": 6, "unlock": "previousAreaComplete", "maxRadiusProduct": 2.10 },
      { "ordinal": 6, "depth": 3, "setId": "vault",   "relicSliceIndex": "seeded(layoutSeed, depth)", "label": "West Vault",   "footprintStuds2": 57600, "chunkCount": 16, "patchCount": 624, "minSpacing": 6, "unlock": "previousAreaComplete", "maxRadiusProduct": 2.10 },
      { "ordinal": 7, "depth": 4, "setId": "spire",   "relicSliceIndex": "seeded(layoutSeed, depth)", "label": "East Spire",   "footprintStuds2": 57600, "chunkCount": 16, "patchCount": 640, "minSpacing": 6, "unlock": "previousAreaComplete", "maxRadiusProduct": 2.10 },
      { "ordinal": 8, "depth": 4, "setId": "spire",   "relicSliceIndex": "seeded(layoutSeed, depth)", "label": "West Spire",   "footprintStuds2": 57600, "chunkCount": 16, "patchCount": 640, "minSpacing": 6, "unlock": "previousAreaComplete", "maxRadiusProduct": 2.10 }
    ],
    "requestedRevisions": [
      { "sheet": "cid/gameplay/meta/02-the-collection.md", "change": "relicsPerArea 6 -> 3, areasPerDepth 1 -> 2", "reason": "areas at one depth partition that depth's set (gameplay/systems/05); 3 x 2 = 6 is the pair theme/fantasy/02 criterion 1 names" },
      { "sheet": "cid/theme/setting/04-permanence-and-passage.md", "change": "strike W5; keep W1-W4 and W6", "reason": "the inward opening is passable only when the part is finished; this sheet and meta/06 take the strike that sheet itself names" }
    ],
    "invariants": [
      "areas[0].footprintStuds2 == area.size ^ 2 and areas[0].patchCount == area.patchCount and areas[0].minSpacing == area.minSpacing",
      "count of areas at each depth == collection.areasPerDepth; this key does not carry that number",
      "collection.relicsPerArea * collection.areasPerDepth == the size of every set",
      "the resolved slices of one depth's areas partition that set with no overlap and no gap",
      "footprintStuds2 is a whole multiple of layout.chunk.footprintStuds2 and equals chunkCount times it",
      "patchCount == chunkCount * layout.patchesPerChunkByDepth[depth]",
      "patchCount / footprintStuds2 is non-decreasing in ordinal and strictly increases at every depth step",
      "minSpacing > movement.baseClearRadius",
      "footprintStuds2 <= footprintCeilingStuds2 for every row",
      "lapSeconds(k) = footprintStuds2(k) / tau(k) * ROUTE_SLACK is inside 75..200 for every row, both at arrival and one upgrade level behind arrival on both throughput axes",
      "patchCount <= lapSeconds(k) / (2 * runtime.clearTickRate)",
      "the product of every products[].factor on the radius axis is at most maxRadiusProduct for every row, and every row carries maxRadiusProduct as a number"
    ]
  }
}
```

## Consequences for other work

- **Offer-ladder work owns the purchaser breach, and area sizing cannot take it.** The bound
  is on the **radius** axis, per row: **1.27** at row 2, 1.44 at row 3, 1.84 at row 4, 2.10 at
  rows 5 to 8. **`Span` at 1.75 breaches rows 2 and 3**, giving laps of 54.5 s and 61.8 s
  against `core-loop/04`'s 75 s floor and against that domain's own `H2`. Row 2's footprint is
  already at its under-buy cap and raising it to the 34,650 the floor needs puts the
  one-level-behind lap at 255.7 s, past the 200 s ceiling, **so there is no footprint that
  satisfies both and the residue routes to `monetization/03` `H4`, "reduce
  `products[].factor`"**, not to me. The value axis is not the problem: its threshold is about
  7x. Row 1 is safe at any shipped product, since a fresh player holding every pass is at
  1.75x against a **2.18x** threshold — a figure that is now in the key rather than only in
  this paragraph, so a per-row checker can read all eight rows.
- **Balance and Tuning inherits the failure `core-loop/05` predicted, with an address.** At
  shipped `upgrades` values the ladder is fully bought during area 4, so arrival at areas 5
  to 8 is the 4.16x cap and `arrivalDeepest < sweptCap` fails. **The requirement, with no
  figure attached: the sum of every `upgradeCost(u, l)` must exceed the cumulative clearing
  income of areas 1 through 7**, so the last area still has something left to buy. At shipped
  values that is 11,644 against about 38,500. Raising `maxLevel`, raising `costGrowth` or
  lowering `value.perLevel` all reach it, and **the same change is what restores the "larger"
  half of the brief line pushed back on below.** Its `04-axis-budget` request to delete
  `maxRadiusProduct` entirely still stands and is unaffected by row 1 now carrying a number.
- **`02-the-collection.md` needs a two-field revision and I have not made it.**
  `relicsPerArea` 6 → 3, `areasPerDepth` 1 → 2. Its criterion 4 ("`relicsPerArea` is not
  fewer than the largest set") is already false as a general rule: `bridge/schema.mjs` lines
  252 to 258 compute `areasPerDepth × relicsPerArea` `[research: bridge/schema.mjs]`.
  **The 24 names, the 4 set labels and the class noun are untouched: zero renames.**
- **`theme/setting/04` needs the one-line strike it named**, and taking it *removes* a cost
  that sheet created: with passage conditioned on completion, a player can hold at most one
  partial part, so W5's multi-partial-part persistence requirement disappears and
  `persistence`'s original "a completed area occupies a single boolean" criterion stands
  unqualified.
- **Persistence work** stores completion for 8 areas keyed by `ordinal`, the ordinal the
  player is in, and **exactly one** partial area's cleared set. It does not store 8 layouts:
  `layout` is derived from the seed and the ordinal.
- **Payoff-cadence work** loses the area-plus-set coincidence on odd areas: set completion now
  lands only on the second area of each depth. Reveals carry the 90 s rule alone at 50 to 55 s
  mean spacing on every row.
- **Vocabulary** gets 8 area labels, all two words, Title Case, 10 to 12 characters, no
  temporal word (`theme/lore/01` L3), compass-qualified instances of the four kinds
  (`theme/setting/02`). `East Terrace` is the merged value and is unchanged.
- **Plot-arrangement work (sheet `06`)** consumes `footprintStuds2` and derives every bay's
  length from it. **This key carries no dimension**, only ground area. Note for offer-ladder
  work that `products.headroom.ceilings.radius` currently reads `area.size(N)`, which does not
  exist past depth 1; the defined form is `plots.laneWidthStuds / 2`, numerically identical
  at 60.
- **Tech and Performance** sizes against 640 anchored patch parts per plot, not 140, and
  against exactly one live area per player at a time.

## Acceptance criteria

1. `depths.areas` holds 8 rows, exactly 2 at each of depths 1, 2, 3 and 4, and row 1 equals
   the merged `area` verbatim: `footprintStuds2` 14,400 = `area.size` squared, `patchCount`
   140 = `area.patchCount`, `minSpacing` 6 = `area.minSpacing`.
2. `game/test/config.spec.luau` walks the 8 rows and asserts, for every one, that
   `footprintStuds2 / tau(k) * ROUTE_SLACK` is inside 75 to 200 both at arrival throughput
   and one upgrade level behind arrival on both throughput axes. It prints
   **164 / 149 / 161 / 163 / 157 / 157 / 157 / 157** at arrival, and
   **186 / 192 / 191 / 182 / 182 / 182 / 182** one level behind for rows 2 to 8, and the file
   still exits `PASS`.
3. The same section asserts, for every row, all five of: `patchCount` at most
   `lapSeconds / (2 * runtime.clearTickRate)`, printing 140/683, 245/621, 407/669, 518/678,
   624/655, 624/655, 640/655, 640/655; `patchCount / footprintStuds2` non-decreasing in
   ordinal and strictly larger at each depth step; `minSpacing` strictly above
   `movement.baseClearRadius`; `footprintStuds2` at most 73,216; and the product of every
   `products[].factor` on the radius axis at most that row's `maxRadiusProduct`, which is a
   number on **all eight** rows and is never null.
4. `collection.relicsPerArea * collection.areasPerDepth` equals the length of every
   `collection.sets[].relics`; for every depth, the two resolved slices partition that set
   with no overlap and no gap; and every row's `unlock` is the string `previousAreaComplete`
   except row 1's, which is `none`. No row carries any other condition of any kind.

## Pushing back

**Overruled: `gameplay/core-loop/01-payoff-frequency` criterion 2, the half that asserts
`collection.relicsPerArea >= 4`.** I take 3. The criterion's other half,
`area.patchCount / relicsPerArea × secondsPerPatch >= 15`, is *kept* and passes on every row
at 50 to 55 s against its 15 s floor, and the 90-second above-tick rule that `>= 4` exists to
protect is met by reveals alone at every row. **`theme/fantasy/02` criterion 1 is the sheet I
could not overrule instead**: it is a floor on how many parts the player finishes, and no
reading of it survives 4 areas.

**Overruled in part: `gameplay/core-loop/05-depth-escalation` criterion 4**, "No `area` sheet
at any depth may exceed that figure", where the figure is `sqrt(200 · sweptCap / ROUTE_SLACK)`
= 270 studs. I keep the ceiling in the quantity that sheet's own formula computes, a footprint
of 73,216 studs², and my largest row is 57,600. I do not keep its square root, because sheet
`06` makes areas rectangular so that plot pitch can decouple from area size. `area.size` at
depth 1 stays 120 and that criterion still passes as written against the merged manifest.

**Struck: `theme/setting/04-permanence-and-passage` `W5`**, "Nothing conditions passage. The
inward opening is passable whether the part is finished or not," with its check "count of
conditions, checks, prompts, barriers or refusals attached to an opening: 0". That sheet names
this exact reversal as the one-line strike a later sheet must request, and this sheet requests
it: **the inward opening is passable only when the part is finished.** My earlier draft cited
W5 as *supporting* an unlock rule it forbids, which was a misreading and is corrected here.
Three reasons. **(a)** W5's own brake is "walking on early forfeits the `Finds` under the green
you left", and under `systems/05`'s partition those Finds exist nowhere else, so walking on
early makes 24/24 permanently unreachable in a game whose only long-term objective is 24/24.
**(b)** It costs persistence the multi-partial-part storage W5 itself flags as its named cost;
striking it restores "a completed area occupies a single boolean". **(c)** `W1` to `W4` and
`W6` are untouched: the opening is still an always-open construction that holds nothing, there
is still no door, lever, key, prompt or threshold, and the studs and seconds between one part
and the next are still zero. What changes is the ground beyond it, not the opening.

**Overruled in part: `03-META.md`'s "depth is progression, deeper areas are larger, denser,
and hide rarer sets" `[brief: binding]` ← `[you chose: R3 Q2]`.** From area 5 onward only
**denser** survives: rows 5 to 8 all hold 57,600 studs², so East Vault and East Spire are the
same size. `core-loop/05` kept that clause verbatim while overruling only its "time and
patience" half, so this half was unpushed by anyone and I push it now. **The cause is the
4.16x throughput cap, not a design choice**: `core-loop/05` bounds footprint by the throughput
a player arrives with, and arrival stops rising once the ladder is spent. **It is restored by
one change I do not own**, the requirement already stated to Balance above; the moment the
ladder outlasts area 7, rows 5 to 8 resume growing and the clause becomes true again with no
edit to this sheet. "Hide rarer sets" is untouched, and "denser" is true at every step.

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

**Second: passage is now gated on completion, which reverses an approved wave-1 ruling.** The
strike above is argued and requested rather than assumed, but it changes what the game does at
every opening and what persistence stores, so it should be ruled on rather than merged quietly.

## Not decided here

Every coefficient: `ROUTE_SLACK`, `LAP_TARGET`, `UNDERBUY_LEVELS`, and every `upgrades[]`
figure (Balance and Tuning). Every `products[].factor`, including the `Span` reduction the
radius bound requires (offer-ladder work, under `monetization/03` `H4`). What one area's
interior is made of and where the Finds sit inside it (sheet `05`, this domain). The shape of
an area's ground, the lane width, every bay's length and where a plot sits (sheet `06`). What
happens after area 8 (sheet `07`). Which axis each set grants and at what factor (sheet `03`,
then Balance). Whether `collection`'s two fields and `theme/setting/04`'s `W5` are actually
revised (their owners, from the requests in the key). Whether `maxRadiusProduct` survives at
all (Balance's `04-axis-budget` asks for its deletion; I filled row 1 rather than prejudging
that). What any area looks like (Art and Visuals). The layout seed's value (architecture; it
is an undeclared literal in `Layout.luau` `[research: game/src/shared/Layout.luau]` and the
slice draw now depends on it).
