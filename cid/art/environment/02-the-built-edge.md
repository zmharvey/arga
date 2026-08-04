# 02 — The built edge

**Domain:** art/environment · **Category:** Art & Visuals · **Wave:** 6 · **Revision:** round 1

## Decision

Six parts: **two parapets 2.5 studs high running the whole built length of the lane**, resized at
each bay advance exactly as the slab already is, and **four cross-wall parts 4 studs high** in
pairs at the live bay's two boundaries, flanking a **16-stud opening centred on X = 0 that holds
nothing and that the channel runs through**. Mouth, boundary and retaining wall are **one tuple at
three Z values**. `N7`'s check fails the moment a parapet exists, the requirement behind it
survives at 2.5 studs, and I file the narrowing rather than build a wall a grep fails.

## Why

- **Why the parapet is lane-persistent and the cross-walls are not.**
  `plots.liveGeometry.torndownBeyond` keeps bays k−1 and k−2 walkable, so a bay-resident parapet
  made the works vanish behind a player still standing in it. A parapet whose length rule is
  `plots.bays[live].zEnd` is **one part per side for the whole lane**, resized by the same call
  that already resizes the slab (`applyLaneExtent`, `[research: game/src/server/Plots.luau]`), so
  the fix costs **zero instances** — two per lane is what two per live bay cost, because only one
  bay was ever dressed. A cross-wall cannot follow: it stands *at* a boundary, so retaining every
  boundary is unbounded under `endgame`. The residual is stated in `environment.residency`.
- **Why the parapet is 2.5 studs and not lower.** `social/02` `B2`/`B3` need a neighbour's body in
  motion and their ground visibly being cleared, from spawn, with no input. A camera at roughly
  Y = 8 looking over a 2.5-stud parapet 61 studs away hides ground from 61 to 88.7 studs out
  (`8 / ((8 − 2.5) / 61)`), and the neighbour's lane spans 62 to 182 studs with their spawn at
  122. **27 studs of their outermost margin are hidden and their spawn, their body and the patch
  field they are clearing are not.** `[cid: decided]`; the arithmetic is the reason.
- **Why a parapet at all.** `theme/setting/01` states *"The area boundary is built"* and
  `theme/setting/05` `P1` carries walls and parapets as present matter, while
  `representation.plot-boundary` is *"deliberately not a wall"* — four invisible parts. The
  fiction requires an edge and the build has none. `[brief: soft]` ← *"stone and foliage, not
  candy"* (`04-PRESENTATION.md`), the only brief line about built matter at all.
- **Why the opening is a channel gap and not a stair.** `theme/setting/04` `W3` gives three
  permitted forms and the channel gap is the cheapest: it costs **zero parts**, because an opening
  is an absence, and it ties `P2` to `P1` so the works reads as one system. A stair run would need
  three parts of a six-part allowance to read as a run. The prohibition on a framed or hinged
  opening is satisfied by construction — no frame, no head, no jamb, no fitting, only a length of
  wall that is not there.
- **Why 16 studs wide.** `plots.openings.centredOnX` is 0 and `barrierInOpening` is false, so a
  player walks the lane centre line through it. 16 is wide enough that a player on a phone touch
  stick does not have to aim, and narrow enough that the wall still reads as a wall across
  `plots.laneWidthStuds`. `[playtest unknown]` — starting value 16, range 10 to 28.
- **Why one tuple at three positions.** `theme/setting/02`: *"Two parts of one kind are alike
  because one crew built them to one design."* Mouth, boundary and retaining wall differ in Z and
  in nothing else, which is one draw class instead of three.
- **Why the walls sit at Z + 1 and Z − 1.** A 2-stud wall centred on a bay boundary would straddle
  two bays and be destroyed by the wrong teardown. Insetting one half-thickness makes every
  cross-wall wholly owned by one bay, which is what makes `environment.residency` mechanically
  true.
- **Why the parapet does not reach the patch field.** Its inner face sits at
  `±(laneWidthStuds/2 − 1.5)` = ±58.5; `layout` puts the patch field in *"the central 96 studs"*,
  outer edge ±48. **10.5 studs of clearance** `[research: cid/art/_category.md]`.
- **The cross-bay case is not mine and is already open.** Two neighbours on different bay ordinals
  have a spawn-to-spawn segment running diagonally down the lane through every wall between.
  `plots.coPresence.satisfiesSocial02CriterionTwoBeyondStuds` is already `false`. My narrowing is
  scoped to the same-bay case, the only case that requirement holds in today.

### The part list — every position parametric, zero literal coordinates

Plot-local: X across the lane, Z inward from the lane mouth, Y up from the paving top face at
Y = 0. `W` is `plots.laneWidthStuds`; `O` is `builtEdge.opening.widthStuds`; `k` is the live bay.

| # | classId | role | residency | centre X | centre Y | Z span | Size |
|---|---|---|---|---|---|---|---|
| 1 | `parapet` | long side, positive X | lane | `+(W/2 − 0.75)` | 1.25 | `0` → `bays[k].zEnd` | 1.5 × 2.5 × `bays[k].zEnd` |
| 2 | `parapet` | long side, negative X | lane | `−(W/2 − 0.75)` | 1.25 | `0` → `bays[k].zEnd` | 1.5 × 2.5 × `bays[k].zEnd` |
| 3 | `crossWall` | outward, positive side | live bay | `+(O/2 + (W − O)/4)` | 2 | `bays[k].zStart` → `+2` | `(W − O)/2` × 4 × 2 |
| 4 | `crossWall` | outward, negative side | live bay | `−(O/2 + (W − O)/4)` | 2 | `bays[k].zStart` → `+2` | `(W − O)/2` × 4 × 2 |
| 5 | `crossWall` | inward, positive side | live bay | `+(O/2 + (W − O)/4)` | 2 | `bays[k].zEnd − 2` → `zEnd` | `(W − O)/2` × 4 × 2 |
| 6 | `crossWall` | inward, negative side | live bay | `−(O/2 + (W − O)/4)` | 2 | `bays[k].zEnd − 2` → `zEnd` | `(W − O)/2` × 4 × 2 |

Role by position: the outward pair of bay 1 is the **mouth**; the outward pair of any deeper bay
is the **boundary** wall it shares with the bay below; the inward pair is the **retaining** wall.
One tuple, three names, no visual difference and none intended.

### Prohibitions this sheet carries, each countable

| # | zero of | source |
|---|---|---|
| E1 | parts inside the opening volume, at any height, including a sill, lintel, threshold strip or step | `plots.openings.barrierInOpening` false, `alwaysOpen` true |
| E2 | a frame, jamb, head, arch ring, hinge point, socket, catch or pivot anywhere on a wall | `theme/setting/04` `W3`; `Hinge`, `Seal` and `Key` are live Find names |
| E3 | a second opening in any parapet, and any gap in a parapet other than at a bay boundary | `plots.openings.perBay` 2 |
| E4 | a marker, plaque, cap stone, colour shift or ornament on the wall at a finished bay's boundary | `theme/setting/04` `W1` |
| E5 | any height difference between the mouth wall, a boundary wall and the retaining wall | `theme/setting/02`, one crew one design |
| E6 | a parapet, wall or kerb standing on the inter-plot boundary rectangle itself | `representation.plot-boundary` is four invisible parts and stays that way |
| E7 | a **cross-wall** in any bay other than the live one; the parapets are lane-persistent and are exempt | `environment.residency.tiers` |
| E8 | a doorway, arch with a frame, gateway, portal or anything a hinge would belong to | `theme/setting/04` `W3`, verbatim |
| E9 | a parapet rebuilt rather than resized at a bay advance | `environment.residency.tiers.lane`; a rebuild is a visible discontinuity |

```manifest
{
  "provides": "builtEdge",
  "status": "proposed",
  "value": {
    "instancesPerLane": 6,
    "instancesPerLaneAllowanceField": "environment.allowance.perConsumerPerLane.builtEdge",
    "coordinateRule": "every position is an expression over plots.bays[k] and plots.laneWidthStuds. This key contains no world coordinate and no bay length.",
    "parapet": {
      "classId": "parapet",
      "count": 2,
      "residency": "lane",
      "heightStuds": 2.5,
      "thicknessStuds": 1.5,
      "centreX": ["+(plots.laneWidthStuds/2 - 0.75)", "-(plots.laneWidthStuds/2 - 0.75)"],
      "centreY": 1.25,
      "zSpan": [0, "plots.bays[live].zEnd"],
      "lengthRule": "plots.bays[live].zEnd, i.e. the whole built length of the lane",
      "growthRule": "resized at plots.liveGeometry.bayBuiltAt by the same call that resizes the slab (Plots.luau applyLaneExtent); never destroyed and never rebuilt until lane teardown",
      "innerFaceX": "plots.laneWidthStuds/2 - 1.5",
      "clearanceToPatchFieldStuds": 10.5,
      "openingsInIt": 0,
      "visibleInRetainedBays": true
    },
    "crossWall": {
      "classId": "crossWall",
      "count": 4,
      "residency": "liveBay",
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
      "insetReason": "a wall centred on a bay boundary would straddle two bays and be destroyed by the wrong teardown",
      "notLanePersistentBecause": "a cross-wall stands at a boundary, so retaining one per boundary grows without bound under endgame; the seam this leaves is stated in environment.residency.retainedBaySeam"
    },
    "opening": {
      "widthStuds": 16,
      "widthStatus": "playtest unknown",
      "widthTestRange": [10, 28],
      "centredOnX": 0,
      "form": "the length of wall where the channel runs through, absent",
      "partsInside": 0,
      "sillLintelOrThreshold": false,
      "framedOrHingedOpening": false,
      "readsAs": "construction that was always open",
      "formRuling": "an absence in a wall, with no frame, head, jamb, ring or fitting of any kind, per theme/setting/04 W3",
      "perBayField": "plots.openings.perBay"
    },
    "sightline": {
      "checkAsWritten": "tech/performance/03 N7: every instance intersecting the segment between two neighbouring spawn points has Transparency == 1",
      "verdictAgainstThisSheet": "fails, at any parapet height, because both spawn points sit at plot-local Z = 8 near Y = 0.5",
      "requirementItProtects": "gameplay/social/02 B2 and B3: a neighbour's body in motion whose ground is visibly being cleared, from spawn, with no input",
      "requirementSurvivesAtHeightStuds": 2.5,
      "occlusion": { "eyeHeightStuds": 8, "parapetDistanceStuds": 61, "groundHiddenFromStuds": 61, "groundHiddenToStuds": 88.7, "neighbourLaneSpanStuds": [62, 182], "neighbourSpawnAtStuds": 122, "neighbourSpawnVisible": true },
      "requestedRevision": {
        "id": "RR-E2",
        "against": "cid/tech/performance/03-what-optimisation-may-never-do.md",
        "row": "N7",
        "changeFrom": "every instance intersecting the segment has Transparency == 1",
        "changeTo": "every instance intersecting the segment either has Transparency == 1, or has its top face at or below builtEdge.parapet.heightStuds; and zero Atmosphere, FogStart or FogEnd exist anywhere",
        "scope": "the same-bay case only",
        "crossBayCase": "already open and already owned by gameplay/social/02 via plots.coPresence.satisfiesSocial02CriterionTwoBeyondStuds false",
        "refusable": true,
        "ifRefused": "the parapet is struck and the built edge is four crossWall parts only; the fiction's built boundary then exists at bay boundaries and nowhere else, this key drops to 4 instances per lane, and the two freed instances return to environment.allowance as reserve"
      }
    },
    "variesByDepthFamily": false,
    "playerFacingStrings": 0
  }
}
```

## Pushing back

I overrule **`tech/performance/03` `N7`** as written and **`gameplay/social/02`**'s third
consequence (*"no opaque wall, hedge, terrain rise or fog density between neighbouring plots
inside S"*). The overruled thing is the *check*, not the requirement: `N7` was written to keep a
neighbour perceptible and to stop fog and `Atmosphere` being used as a draw-distance saving, and
both survive verbatim at 2.5 studs under the occlusion arithmetic above. The alternative — no
built edge anywhere — contradicts `theme/setting/01`'s *"The area boundary is built"* and leaves
the developer's *"nothing really looks good"* answered by four invisible parts. **If the narrowing
is declined the parapet is struck and this key ships four parts**, and the fallback is in the
manifest so the decision costs one field either way.

## Consequences for other work

- **Optimisation-limit work (`tech/performance/03`)** holds `RR-E2` with its replacement text and
  fallback written. `N7`'s fog and `Atmosphere` clauses are untouched.
- **Presence-sufficiency work (`gameplay/social/02`)** gets the occlusion figures it needs to
  re-derive criterion 3 against a lane rather than a square: 27 studs of a neighbour's outermost
  margin are hidden and nothing else is. It owns `S` and I set none of it.
- **Plot-and-lane work (`plots`)** gains a width, section, height and material for `openings`, and
  a second requirement: the call that extends the slab must extend two parapets with it, so a bay
  advance is three `Size` writes rather than one.
- **Groundwork work (sheet `03`)** must run the channel through the opening at X = 0 and may not
  terminate it at a wall; its kerbs share the parapet's lane-persistence and the same growth call.
- **Traversal work** should know the parapet collides and stands 1.5 studs inside the lane, so the
  requested `walkableMarginStuds` 12 → 0 is unaffected: nothing here reaches the patch field.
- **Depth-family work (sheet `04`)** may not place a part inside the 16-stud opening volume or
  within 2 studs of a wall face, and may not vary a wall by family.

## Flagged to the developer

| decision | alternative not taken | reversing field | my recommendation |
|---|---|---|---|
| Parapet at 2.5 studs | a waist-high 4-stud wall, which reads as a real boundary and hides more of a neighbour's ground | `builtEdge.parapet.heightStuds` | keep 2.5; co-presence is the one social mechanic in the game and 4 studs eats it |
| A 16-stud opening | a narrower 8-stud gap, which reads more like construction and is harder to walk through on a phone | `builtEdge.opening.widthStuds` | keep 16 until a touch-stick playtest exists |
| Cross-walls in the live bay only | walls at every retained boundary, which needs 8 instead of 4 | `environment.residency.tiers.liveBay.residentBays` | keep; the freed instances went to `effects`, and this is the first thing to buy back |

## Acceptance criteria

1. Exactly 6 instances exist per lane — 2 `parapet` and 4 `crossWall` — and the parapet count does
   not change with the live bay ordinal.
2. Every position and size field in `builtEdge` is an expression naming `plots.bays[k]`,
   `plots.laneWidthStuds` or `builtEdge.opening.widthStuds`; the count of literal world
   coordinates in the key is 0.
3. `builtEdge.parapet.heightStuds` is 2.5 and every instance this sheet places whose axis-aligned
   box intersects the segment between two same-bay neighbouring spawn points has its top face at
   or below 2.5.
4. The volume `|X| ≤ 8` at every cross-wall's Z span contains zero instances, and a bay advance
   produces zero `Destroy` calls on a `parapet`.

## Not decided here

Paving, kerbs, the channel, the basin and the luma instrument — sheet `03`. Piers, roofing and
family variation — sheet `04`. Anything outside the lane — sheet `05`. Tuple sections, materials,
the residency tiers and the six-instance allowance — sheet `01`, which holds `environment`. `S`,
the spawn position and orientation — `gameplay/social/02`. Bay lengths, opening count and
neighbour-sharing — `plots`. The stone's hue and the `Enum.Material` list — `styleGuide`. Which
module creates a parapet — `RR-E1`, sheet `01`.
