# 04 — Depth families

**Domain:** art/environment · **Category:** Art & Visuals · **Wave:** 6

## Decision

Four families are four **arrangements of the same eleven tuples, six parts each**: Terrace is
three cross-lane lips, Cistern is one covered span over a row of basins, Vault is a twin-strip
band you walk under, Spire is a stand of six 12-stud shafts. **Depths 2 and 3 are roofed, over 6
and 12 studs of a bay respectively — 1.8% and 2.5% of its length** — carried on a pier line, and
the gaps between strips are the authored openings that light them. **The 16 variants of a family
are dressed identically; there are zero dressed variants and zero landmarks.**

## Why

- **Why arrangement and not new matter.** `theme/setting/03`: depth theming *"draws only on the
  present column, and no depth may introduce a thirteenth class. A deeper part is not a different
  kind of matter, only more green over the same twelve classes."* `theme/lore/01` `L4` fixes
  weathering identical at every depth and `theme/setting/03` forbids depth reading as darker or
  later. Every channel except **count, position and height** is closed before this sheet starts,
  so those three are the whole design space and the sheet uses all three.
- **Why 2.5% is a roof and 100% is not available.** The Piscina Mirabilis is 48 pillars in four
  rows of twelve carrying barrel vaults over 72 × 25 m, with water drawn *"from above …
  exploiting the holes in the barrel vaults"*
  `[research: https://en.wikipedia.org/wiki/Piscina_Mirabilis]`. Its pier grid of roughly 5 × 6 m
  is about 18 × 21 studs, which over a 480-stud bay is ~144 piers — **an order of magnitude above
  this domain's entire per-lane allowance of 18.** So the choice is not how to roof a bay; it is
  whether one vault band exists or none does. **A band exists**, and the vault becomes an event
  on the walk rather than a condition of the bay. That is the only form the ceiling permits and
  it is the better read anyway: a player passes under 12 studs of stone once per lap and nowhere
  else in the game.
- **Why that satisfies the light requirement without touching lighting.** `theme/setting/03`:
  *"you may not solve a dim vault by moving the sun … the openings in the construction are the
  instrument, which makes it authored geometry rather than a lighting value."* A `vaultStrip` is
  6 studs deep, so **no point under any roof in this game is more than 3 studs from open sky
  measured horizontally**, and both X sides of every band are open between the piers. The luma
  floor is met by the roof being small, not by the sun being moved.
- **Why depth 2 is roofed at all.** `theme/setting/02` asserts *"depths 2 and 3 inside vaulted
  structures"* and `theme/setting/03` requires the floor be met *"in every part, including the
  vaulted ones"*. Both are satisfied by a band; neither requires a bay-wide roof, and no sheet
  anywhere says a roof exists as geometry — that gap is what this sheet closes.
- **Why Cistern and Vault are not the same place.** Both are roofed, so the difference has to sit
  under the roof: the Cistern's single 6-stud span stands over a row of three dry holding basins
  on the channel line, and the Vault's twin span stands over nothing at twice the depth. One
  reads as covered working floor, the other as a covered walk. `[cid: decided]`, and it is the
  call `layout`'s four families exist for.
- **Why there are zero dressed variants.** `layout` owes 4 families × 16 variants and its
  consequence line says Environment owes *"32 chunk looks, 8 per depth kind, each dressing a 120
  by 30 slab"*. **That is not affordable and the arithmetic is not close.** A bay is 4 to 16
  chunks and `chunkDressing`'s allowance is 6 parts per bay, which is **0.375 parts per chunk**.
  Sixteen distinct dressings of 0.375 parts is not a thing that can exist. `layout` already owns
  a per-chunk variety lever that costs zero instances — its `anchorSource`, the authored patch
  anchor set — and that is where the variety is. I state the finding and change none of its
  fields.
- **Why the signature's position is a fraction of the bay and not a seed.** *"Endless via
  shuffled authored chunks, not generation"* `[brief: binding]` ← `03-META.md`. A fraction of
  `plots.bays[k].lengthStuds` is authored placement that scales to a 120-stud bay and to a
  480-stud one with no per-session variation and no coordinate anywhere.
- **Landmark design is ruled to zero, by four separate sheets, and is recorded here so nobody
  looks for it.** `03-META.md` declined *"restoring one hero landmark"* as an objective;
  `theme/setting/02` forbids a summit, a final part, a vantage and anything on a skyline that is
  not this works; `theme/setting/05` `A25` forbids a map, plan, signpost, survey mark and
  boundary stone; `theme/setting/04` `W1` forbids a finished part gaining a marker. **The word
  spent instead of *landmark* is *memorable*, and the memorable thing is the vault band.**

### The four signatures — six parts each, every position a fraction of the bay

`W` is `plots.laneWidthStuds`; `L` is `plots.bays[k].lengthStuds`; `z0` is `plots.bays[k].zStart`;
`D` is `layout.chunk.depthStuds`. A tuple's parametric axis may be rotated 90° about Y; an
orientation is not a second tuple.

| family | depth | parts | placement |
|---|---|---|---|
| **Terrace** | 1 | 6 × `kerb` | three cross-lane lips at `z0 + L × {0.25, 0.50, 0.75}`, each 2 parts of length `(W − 16)/2` at X = `±34`, rotated 90° about Y, split at the channel |
| **Cistern** | 2 | 2 × `pier`, 1 × `vaultStrip`, 3 × `basin` | piers at X = `±22`, Z = `z0 + L × 0.55`; the strip spans W at the same Z with its underside at Y = 12; basins at X = 0, Z = `z0 + L × {0.25, 0.40, 0.70}` |
| **Vault** | 3 | 4 × `pier`, 2 × `vaultStrip` | band centred at `z0 + L × 0.70`, band length `D`; piers at X = `±22`, Z = band centre `± D/2.5`; strips span W at the same two Z values, undersides at Y = 12 |
| **Spire** | 4 | 6 × `pier` | a 2 × 3 grid at X = `±22`, Z = `z0 + L × {0.35, 0.60, 0.85}`, unroofed |

### Roofed share, stated so "depth may not read as darker or later" is countable

| family | depth | bay lengths | roofed studs of Z | share of bay | max horizontal distance to open sky under a roof |
|---|---|---|---|---|---|
| Terrace | 1 | 120, 210 | 0 | 0% | — |
| Cistern | 2 | 330, 420 | 6 | 1.8%, 1.4% | 3 studs |
| Vault | 3 | 480, 480 | 12 | 2.5% | 3 studs |
| Spire | 4 | 480, 480 | 0 | 0% | — |

### Prohibitions this sheet carries, each countable

| # | zero of | source |
|---|---|---|
| F1 | a landmark, hero part, summit, final part, vantage, overlook or skyline object | `03-META.md`; `theme/setting/02`; `A25`; `W1` |
| F2 | a continuous roof, a ceiling over a whole bay, or any roof deeper than `layout.chunk.depthStuds` | this sheet's roofed-share table; `theme/setting/03` |
| F3 | a material, colour, wear or ornament difference between two families | `theme/lore/01` `L4`; `theme/setting/03` |
| F4 | a twelfth class, or any class not in `environment.tuples`, introduced by a family | `theme/setting/05`, the closed present column |
| F5 | a dressed difference between two variants of one family | `chunkDressing.variation.variantsDressedDifferently` 0 |
| F6 | a part marking which depth a player is in — no numeral, sign, marker, banner or colour band | `A25`; `vocabulary`; this domain emits no player-facing string |
| F7 | a stair, ramp, ladder, shaft or level change implying going down | `theme/setting/02`: depth points inward, not down |
| F8 | a restored-versus-overgrown second dressing | `theme/setting/04`: *the same stone, with and without plants on it* |
| F9 | a seasonal, event or hour-of-day variant of any signature | `03-META.md` priority 3; `theme/setting/03` `R1`–`R3` |
| F10 | a `PointLight`, `SpotLight` or `SurfaceLight` placed to light the roofed band | `A7`; `theme/setting/05` criterion 2 |
| F11 | a dressing part in any bay below the live one, and any dressing on a post-terminal bay other than the Spire signature | `environment.residency`; `endgame` |

```manifest
{
  "provides": "chunkDressing",
  "status": "proposed",
  "value": {
    "instancesPerLiveBay": 6,
    "allowanceField": "environment.allowance.perConsumerPerLane.chunkDressing",
    "coordinateRule": "every position is a fraction of plots.bays[k].lengthStuds or a multiple of plots.laneWidthStuds; this key contains no world coordinate and no bay length",
    "orientationIsNotATuple": true,
    "signatures": [
      {
        "family": "terrace", "depth": 1, "layoutFamilyIdPrefix": "terrace-", "roofed": false,
        "parts": [ { "classId": "kerb", "count": 6, "role": "three cross-lane lips, two parts each, split at the channel", "orientationYDegrees": 90, "centreXRule": "+/- ((plots.laneWidthStuds - builtEdge.opening.widthStuds)/4 + builtEdge.opening.widthStuds/2)", "partLengthRule": "(plots.laneWidthStuds - builtEdge.opening.widthStuds)/2", "centreY": 0.2, "centreZFractions": [0.25, 0.50, 0.75] } ],
        "readsAs": "an open platform cut into three levels"
      },
      {
        "family": "cistern", "depth": 2, "layoutFamilyIdPrefix": "cistern-", "roofed": true,
        "parts": [
          { "classId": "pier", "count": 2, "centreXStuds": [22, -22], "centreZFractions": [0.55], "centreY": 6 },
          { "classId": "vaultStrip", "count": 1, "spansLaneWidth": true, "centreZFractions": [0.55], "undersideY": 12 },
          { "classId": "basin", "count": 3, "centreXStuds": [0], "centreZFractions": [0.25, 0.40, 0.70], "centreY": 0.4 }
        ],
        "readsAs": "one covered span standing over a row of dry holding basins"
      },
      {
        "family": "vault", "depth": 3, "layoutFamilyIdPrefix": "vault-", "roofed": true,
        "bandLengthRule": "layout.chunk.depthStuds",
        "parts": [
          { "classId": "pier", "count": 4, "centreXStuds": [22, -22], "centreZRule": "z0 + L*0.70 +/- layout.chunk.depthStuds/2.5", "centreY": 6 },
          { "classId": "vaultStrip", "count": 2, "spansLaneWidth": true, "centreZRule": "z0 + L*0.70 +/- layout.chunk.depthStuds/2.5", "undersideY": 12 }
        ],
        "readsAs": "a twin-span band a player walks under once a lap"
      },
      {
        "family": "spire", "depth": 4, "layoutFamilyIdPrefix": "spire-", "roofed": false,
        "parts": [ { "classId": "pier", "count": 6, "centreXStuds": [22, -22], "centreZFractions": [0.35, 0.60, 0.85], "centreY": 6 } ],
        "readsAs": "a stand of six standing shafts, open to the sky"
      }
    ],
    "roofing": {
      "depthsRoofed": [2, 3],
      "roofedStudsOfZ": { "1": 0, "2": 6, "3": 12, "4": 0 },
      "maxShareOfBayLength": 0.025,
      "stripDepthStuds": 6,
      "maxHorizontalDistanceToOpenSkyUnderARoofStuds": 3,
      "clearHeadroomStuds": 12,
      "authoredOpenings": "the gap between two strips, and both open X sides between the piers; these are the instrument, not a Lighting value",
      "lightingValuesChanged": 0,
      "depthReadsAsDarkerOrLater": false
    },
    "variation": {
      "variantsPerFamilyField": "layout.variantsPerFamily",
      "variantsDressedDifferently": 0,
      "reason": "a bay is 4 to 16 chunks and this key's allowance is 6 parts per bay, which is 0.375 parts per chunk; 16 distinct dressings of 0.375 parts cannot exist",
      "varietyLeverInstead": "layout.anchorSource, the authored patch anchor set, which costs zero instances",
      "findingAgainst": { "sheet": "cid/gameplay/meta/05-area-layout.md", "line": "Art and Visuals, Environment owes 32 chunk looks, 8 per depth kind", "answer": "Environment owes 4 family signatures; the per-chunk half is unaffordable at the merged instance ceiling and the variety lever is already inside layout", "fieldsChanged": 0 }
    },
    "endgame": { "postTerminalBaySignature": "spire", "additionalPartsPerPostTerminalBay": 0, "additionalAssets": 0 },
    "landmarks": 0,
    "landmarkRuledZeroBy": [
      "03-META.md declined restoring one hero landmark as an objective",
      "theme/setting/02 forbids a highest part, a final part, a vantage and any skyline object that is not this works",
      "theme/setting/05 A25 forbids map, plan, signpost, survey mark and boundary stone",
      "theme/setting/04 W1 forbids a finished part gaining a marker"
    ],
    "restoredVersusOvergrownDressings": 1,
    "seasonalEventOrHourVariants": 0,
    "playerFacingStrings": 0
  }
}
```

## Consequences for other work

- **Area-layout work (`layout`)** gets an answer to its own consequence line and **no field
  change**: Environment owes four family signatures, not 32 chunk looks, because a bay's dressing
  allowance is 0.375 parts per chunk. Its `chunksPerFamily` and `variantsPerFamily` are untouched
  and its `anchorSource` is named as the variety lever it already owns. If `layout`'s owner
  disputes this, the input to argue with is
  `budgets.instanceCeilings.clientStreamedInstanceCeiling`, not the signature count.
- **Theme and setting work (`theme/setting/02`, `/03`)** should read the roofed-share table as the
  answer to *"depths 2 and 3 inside vaulted structures"*: they are, over 6 and 12 studs, and the
  luma floor is met by the roof being 6 studs deep rather than by any lighting change. Zero
  `Lighting` values move and the pre-authorised per-part-hour relaxation is not taken.
- **Lighting work (`lighting`)** is asked for **nothing**. The dim-vault question that
  `theme/setting/03` handed to authored geometry is answered by authored geometry, so no second
  lighting state, no `PointLight` and no ambient change is requested from this sheet, ever.
- **Endgame work (`endgame`)** is confirmed at zero cost: a post-terminal bay is a Spire bay and
  the Spire signature is six piers, so the endless run adds no class, no asset and no per-bay
  growth. Its own line saying *"Art and Visuals owes nothing new"* is true and now has a number.
- **Groundwork work (sheet `03`, this domain)** shares the channel line with the Cistern's three
  basins; both sit at X = 0 and neither may cross the other's Z span, which the fractions above
  already satisfy.
- **Built-edge work (sheet `02`, this domain)** keeps the whole boundary; no family varies a wall,
  a parapet or an opening, so `builtEdge` is depth-invariant and stays one tuple set.
- **Whoever looks for landmark design** will not find a sheet, because there is none. Recorded
  here as data, with the four rulings that closed it.

## Acceptance criteria

1. `chunkDressing.signatures` has exactly 4 entries, one per `layout.families[]` entry, and each
   entry's `parts[].count` values sum to exactly 6.
2. Exactly 2 signatures have `roofed: true` (`cistern`, `vault`), and for every family
   `roofedStudsOfZ / min(plots.bays[k].lengthStuds for that depth) ≤ 0.025`.
3. `chunkDressing.variation.variantsDressedDifferently === 0`,
   `chunkDressing.landmarks === 0`, and `chunkDressing.seasonalEventOrHourVariants === 0`.
4. Every `classId` in every signature appears in `environment.tuples`, and the count of distinct
   `classId` values across all four signatures is 4 (`kerb`, `pier`, `vaultStrip`, `basin`).

## Not decided here

How many chunks a family holds, how many variants exist, which depth carries which set, and every
patch anchor — `layout` and `depths`. Bay lengths and bay boundaries — `plots`. Walls, parapets
and openings — sheet `02`. Paving, kerb runs along the lane, the channel, the basin at the bay
end and the litter mat — sheet `03`. Anything outside the lane, and the sky above the unroofed
97% — sheet `05`. The tuple sections and the six-instance allowance — sheet `01`, which holds
`environment`. Every hue and the `Enum.Material` list — `styleGuide`. What a Terrace, Cistern,
Vault or Spire *means* — `theme/setting/02`, inherited and not reopened. Every `Lighting` value —
`lighting`, which this sheet asks for nothing.
