# 02 — The built edge

**Domain:** art/environment · **Category:** Art & Visuals · **Wave:** 6

## Decision

Six parts dress one live bay's edge: **two parapets 2.5 studs high** on the long sides and
**four cross-wall parts 4 studs high** standing in pairs at the bay's two boundaries, flanking a
**16-stud opening centred on X = 0 that holds nothing and that the channel runs through**. The
mouth wall, the bay-boundary wall and the inward retaining wall are **one tuple at three Z
values**. `N7`'s check fails the moment a parapet exists, the requirement behind it survives at
2.5 studs, and I file the narrowing rather than build a wall a grep fails.

## Why

- **Why the parapet is 2.5 studs and not lower.** `social/02` `B2`/`B3` need a neighbour's body
  in motion and their ground visibly being cleared, from spawn, with no input. A camera at
  roughly Y = 8 looking over a 2.5-stud parapet 61 studs away hides ground from 61 to 88.7 studs
  out (`8 / ((8 − 2.5) / 61)`), and the neighbour's lane spans 62 to 182 studs with their spawn
  at 122. **27 studs of their outermost margin are hidden and their spawn, their body and the
  patch field they are clearing are not.** `[cid: decided]` on the height; the arithmetic is the
  reason and it is checkable.
- **Why a parapet at all.** `theme/setting/01` states *"The area boundary is built"* and
  `theme/setting/05` `P1` carries walls and parapets as present matter, while
  `representation.plot-boundary` is *"deliberately not a wall"* — four invisible parts. The
  fiction requires an edge and the build has none. `[brief: soft]` ← *"stone and foliage, not
  candy"* (`04-PRESENTATION.md`), which is the only brief line about built matter at all.
- **Why the opening is a channel gap and not a stair.** `theme/setting/04` `W3` gives three
  permitted forms and the channel gap is the cheapest of the three — it costs **zero parts**,
  because an opening is an absence — and it ties `P2` to `P1` so the works reads as one system.
  A stair run would need three parts of a six-part allowance to read as a run at all. `Never a
  doorway, an arch with a frame, a gateway` is satisfied by construction: there is no frame, no
  head, no jamb and no fitting, only a length of wall that is not there.
- **Why 16 studs wide.** `plots.openings.centredOnX` is 0 and `barrierInOpening` is false, so a
  player walks the lane centre line through it. 16 studs is wide enough that a player moving at
  `movement` speed on a phone touch stick does not have to aim, and narrow enough that the wall
  still reads as a wall over `plots.laneWidthStuds`. `[playtest unknown]` — starting value 16,
  test range 10 to 28; below 10 a mobile player brushes the jamb, above 28 the wall reads as two
  stubs.
- **Why one tuple at three positions.** `theme/setting/02`: *"Two parts of one kind are alike
  because one crew built them to one design."* The mouth, the boundary and the retaining wall
  differ in Z and in nothing else, which is one draw class instead of three and is
  `environment.distinctDrawClasses` working rather than a compromise.
- **Why the walls sit at Z + 1 and Z − 1 rather than at the boundary exactly.** A 2-stud-thick
  wall centred on a bay boundary would straddle two bays and be destroyed by the wrong teardown.
  Insetting each wall one half-thickness inside the live bay makes every part this sheet places
  wholly owned by one bay, which is what makes `environment.residency` mechanically true.
- **Why the parapet does not reach the patch field.** Its inner face sits at
  `±(laneWidthStuds/2 − 1.5)` = ±58.5; `layout` puts the patch field in *"the central 96 studs"*,
  outer edge ±48. **10.5 studs of clearance**, so no parapet can ever occlude, block or overlap a
  patch `[research: cid/art/_category.md]`.
- **The cross-bay case is not mine and is already open.** Two neighbours on different bay
  ordinals have a spawn-to-spawn segment running diagonally down the lane through every wall in
  between. `plots.coPresence.satisfiesSocial02CriterionTwoBeyondStuds` is already `false` and
  the requirement is recorded as owned by `gameplay/social/02`. My narrowing is scoped to the
  same-bay case, which is the only case that requirement holds in today.

### The part list for one live bay — every position parametric, zero literal coordinates

Plot-local: X across the lane, Z inward from the lane mouth, Y up from the paving top face at
Y = 0. `W` is `plots.laneWidthStuds`; `O` is `builtEdge.opening.widthStuds`; `k` is the live bay
ordinal.

| # | classId | role | count | centre X | centre Y | Z span | Size |
|---|---|---|---|---|---|---|---|
| 1 | `parapet` | long side, positive X | 1 | `+(W/2 − 0.75)` | 1.25 | `bays[k].zStart` → `bays[k].zEnd` | 1.5 × 2.5 × `bays[k].lengthStuds` |
| 2 | `parapet` | long side, negative X | 1 | `−(W/2 − 0.75)` | 1.25 | `bays[k].zStart` → `bays[k].zEnd` | 1.5 × 2.5 × `bays[k].lengthStuds` |
| 3 | `crossWall` | outward, positive side | 1 | `+(O/2 + (W − O)/4)` | 2 | `bays[k].zStart` → `+2` | `(W − O)/2` × 4 × 2 |
| 4 | `crossWall` | outward, negative side | 1 | `−(O/2 + (W − O)/4)` | 2 | `bays[k].zStart` → `+2` | `(W − O)/2` × 4 × 2 |
| 5 | `crossWall` | inward, positive side | 1 | `+(O/2 + (W − O)/4)` | 2 | `bays[k].zEnd − 2` → `zEnd` | `(W − O)/2` × 4 × 2 |
| 6 | `crossWall` | inward, negative side | 1 | `−(O/2 + (W − O)/4)` | 2 | `bays[k].zEnd − 2` → `zEnd` | `(W − O)/2` × 4 × 2 |

Role by position: the outward pair of bay 1 is the **mouth**; the outward pair of any deeper bay
is the **boundary** wall it shares with the bay below; the inward pair of the live bay is the
**retaining** wall. One tuple, three names, no visual difference and none intended.

### Prohibitions this sheet carries, each countable

| # | zero of | source |
|---|---|---|
| E1 | parts inside the opening volume, at any height, including a sill, lintel, threshold strip or step | `plots.openings.barrierInOpening` false, `alwaysOpen` true |
| E2 | a frame, jamb, head, arch ring, hinge point, socket, catch or pivot anywhere on a wall | `theme/setting/04` `W3`; `Hinge`, `Seal` and `Key` are live Find names |
| E3 | a second opening in any parapet, and any gap in a parapet other than at a bay boundary | `plots.openings.perBay` 2 |
| E4 | a marker, plaque, cap stone, colour shift or ornament on the wall at a finished bay's boundary | `theme/setting/04` `W1` |
| E5 | any height difference between the mouth wall, a boundary wall and the retaining wall | `theme/setting/02`, one crew one design |
| E6 | a parapet, wall or kerb standing on the inter-plot boundary rectangle itself | `representation.plot-boundary` is four invisible parts and stays that way |
| E7 | a wall or parapet in any bay other than the live one | `environment.residency` |

```manifest
{
  "provides": "builtEdge",
  "status": "proposed",
  "value": {
    "instancesPerLiveBay": 6,
    "instancesPerLaneAllowanceField": "environment.allowance.perConsumerPerLane.builtEdge",
    "coordinateRule": "every position is an expression over plots.bays[k] and plots.laneWidthStuds. This key contains no world coordinate and no bay length.",
    "parapet": {
      "classId": "parapet",
      "count": 2,
      "heightStuds": 2.5,
      "thicknessStuds": 1.5,
      "centreX": ["+(plots.laneWidthStuds/2 - 0.75)", "-(plots.laneWidthStuds/2 - 0.75)"],
      "centreY": 1.25,
      "zSpan": ["plots.bays[k].zStart", "plots.bays[k].zEnd"],
      "lengthRule": "plots.bays[k].lengthStuds",
      "innerFaceX": "plots.laneWidthStuds/2 - 1.5",
      "clearanceToPatchFieldStuds": 10.5,
      "openings": 0
    },
    "crossWall": {
      "classId": "crossWall",
      "count": 4,
      "heightStuds": 4,
      "thicknessStuds": 2,
      "roles": [
        { "role": "mouth",     "appliesWhen": "k == 1",  "zStart": "plots.bays[k].zStart" },
        { "role": "boundary",  "appliesWhen": "k > 1",   "zStart": "plots.bays[k].zStart" },
        { "role": "retaining", "appliesWhen": "always",  "zStart": "plots.bays[k].zEnd - 2" }
      ],
      "sameTupleAcrossRoles": true,
      "partLengthRule": "(plots.laneWidthStuds - builtEdge.opening.widthStuds) / 2",
      "centreXRule": "+/- (builtEdge.opening.widthStuds/2 + (plots.laneWidthStuds - builtEdge.opening.widthStuds)/4)",
      "centreY": 2,
      "insetFromBoundaryStuds": 1,
      "insetReason": "a wall centred on a bay boundary would straddle two bays and be destroyed by the wrong teardown"
    },
    "opening": {
      "widthStuds": 16,
      "widthStatus": "playtest unknown",
      "widthTestRange": [10, 28],
      "centredOnX": 0,
      "form": "the length of wall where the channel runs through, absent",
      "partsInside": 0,
      "sillLintelOrThreshold": false,
      "isNeverADoorwayArchOrGateway": true,
      "readsAs": "construction that was always open",
      "perBayField": "plots.openings.perBay"
    },
    "sightline": {
      "checkAsWritten": "tech/performance/03 N7: every instance intersecting the segment between two neighbouring spawn points has Transparency == 1",
      "verdictAgainstThisSheet": "fails, at any parapet height, because both spawn points sit at plot-local Z = 8 near Y = 0.5",
      "requirementItProtects": "gameplay/social/02 B2 and B3: a neighbour's body in motion whose ground is visibly being cleared, from spawn, with no input",
      "requirementSurvivesAtHeightStuds": 2.5,
      "occlusion": { "eyeHeightStuds": 8, "parapetDistanceStuds": 61, "groundHiddenFromStuds": 61, "groundHiddenToStuds": 88.7, "neighbourLaneSpanStuds": [62, 182], "neighbourSpawnAtStuds": 122, "neighbourSpawnVisible": true },
      "requestedRevision": {
        "against": "cid/tech/performance/03-what-optimisation-may-never-do.md",
        "row": "N7",
        "changeFrom": "every instance intersecting the segment has Transparency == 1",
        "changeTo": "every instance intersecting the segment either has Transparency == 1, or has its top face at or below builtEdge.parapet.heightStuds; and zero Atmosphere, FogStart or FogEnd exist anywhere",
        "scope": "the same-bay case only",
        "crossBayCase": "already open and already owned by gameplay/social/02 via plots.coPresence.satisfiesSocial02CriterionTwoBeyondStuds false",
        "ifDeclined": "the parapet is struck and the built edge is four crossWall parts only; the fiction's built boundary then exists at bay boundaries and nowhere else, and this key drops to 4 instances per live bay"
      }
    },
    "residency": "live bay only, per environment.residency; a wall at a shared boundary is destroyed with the bay that owned it and rebuilt identically by the next",
    "playerFacingStrings": 0
  }
}
```

## Pushing back

I overrule **`tech/performance/03` `N7`** as written and **`gameplay/social/02`**'s third
consequence (*"no opaque wall, hedge, terrain rise or fog density between neighbouring plots
inside S"*), and I name both rather than quietly building a wall a grep fails. The overruled
thing is the *check*, not the requirement: `N7` was written to keep a neighbour perceptible and
to stop fog and `Atmosphere` being used as a draw-distance saving, and both of those survive
verbatim at a 2.5-stud parapet with the occlusion arithmetic above. The alternative — no built
edge anywhere — contradicts `theme/setting/01`'s *"The area boundary is built"* and
`theme/setting/05` `P1`, and leaves the developer's *"nothing really looks good"* answered by
four invisible parts. **If the narrowing is declined, the parapet is struck and this key ships
four parts**; that fallback is in the manifest so the decision costs one field either way.

## Consequences for other work

- **Optimisation-limit work (`tech/performance/03`)** holds one revision request with its
  replacement text written and its fallback stated. `N7`'s fog and `Atmosphere` clauses are
  untouched and I add nothing to them.
- **Presence-sufficiency work (`gameplay/social/02`)** gets the occlusion figures it needs to
  re-derive criterion 3 against a lane rather than a square: 27 studs of a neighbour's outermost
  margin are hidden and nothing else is. It owns `S` and I set none of it.
- **Groundwork work (sheet `03`, this domain)** must run the channel through the opening at
  X = 0 and may not terminate it at a wall, because the opening's whole claim to being
  construction-that-was-always-open is that the channel passes through it.
- **Plot-and-lane work (`plots`)** gains a width, a section, a height and a material for
  `openings`, which had count, axis and neighbour-sharing and nothing else. It also inherits that
  the wall at a shared boundary is rebuilt with the bay, which is a teardown detail its
  `liveGeometry` block now has a subject for.
- **Traversal work** should know the parapet collides and stands 1.5 studs inside the lane, so
  the requested `walkableMarginStuds` 12 → 0 is unaffected: nothing this sheet places reaches the
  patch field.
- **Depth-family work (sheet `04`, this domain)** may not place a part inside the 16-stud opening
  volume or within 2 studs of a wall face, and may not vary the wall by family.

## Acceptance criteria

1. Exactly 6 instances are created for one live bay: 2 with `classId` `parapet` and 4 with
   `classId` `crossWall`, and 0 in any bay below the live one.
2. Every position and size field in `builtEdge` is an expression naming `plots.bays[k]`,
   `plots.laneWidthStuds` or `builtEdge.opening.widthStuds`; the count of literal world
   coordinates in the key is 0.
3. `builtEdge.parapet.heightStuds` is 2.5 and every instance this sheet places whose axis-aligned
   box intersects the segment between two same-bay neighbouring spawn points has its top face at
   or below 2.5.
4. The volume `|X| ≤ 8` at every cross-wall's Z span contains zero instances, and a grep of the
   emitted lane builder for `Hinge`, `Motor`, `HingeConstraint` or `Weld` on any `builtEdge` part
   returns nothing.

## Not decided here

The paving, kerb, channel and basin the walls stand on, and the luma instrument — sheet `03`.
Piers, roofing and anything that distinguishes the four families — sheet `04`. Anything outside
the lane, including the canopy the mouth wall faces — sheet `05`. The tuple sections, materials
and the six-instance allowance themselves — sheet `01`, which holds `environment`. `S`, the
spawn position and orientation, and whether a spawn-moment-only reading of `B2`/`B3` is
acceptable — `gameplay/social/02`. Bay lengths, the opening count and neighbour-sharing —
`plots`. The stone's hue — `styleGuide`.
