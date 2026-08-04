# 02 — Form and ornament

**Domain:** Style Guide · **Category:** Art & Visuals · **Wave:** 6

## Decision

**Nothing is authored below 0.5 studs in its smallest dimension, nothing meant to read from a
neighbouring lane is below 4 studs, nothing on a plot boundary's two long sides stands above 3
studs, and ornament is a count: twelve subject classes each carry a stated maximum of ornamental
elements in stated positions, and a critic fails a screenshot by counting.** Ornament forms come
from a closed list of twelve. On the interface half, at most **2** of `ui-forge`'s **4** declared
ornament parameters may hold a non-default value across the whole game.

## Why

**No proportion, scale or feature-size rule exists at any layer** — not in six brief sheets, not
in twenty-five contract keys. *"8–14, mobile-heavy, short sessions"* `[brief: binding]`
(`00-CORE.md`) is the only input that implies one, and it implies a floor rather than a value.
Everything below is `[cid: decided]` against that silence, and the numbers are
`[playtest unknown]` with ranges because an 8-year-old's phone is the instrument and nobody has
held one.

**Two distances exist and no third one does.** A neighbour's lane at `plots.pitchStuds`, and a
player standing beside a thing on their own lane. Beyond `plots.pitchStuds` nothing is *required*
to read: the far rule is a floor, not a promise, and past
`budgets.streaming.StreamingTargetRadius` nothing renders at all. A moulding authored at 0.3
studs is then a **countable** failure rather than a matter of taste, which is the only reason to
write this sheet.

**The far minimum is more than linear over the near one on purpose.** The distance ratio is about
5:1 and the size ratio is 8:1, because contrast and mip-mapping degrade faster than distance on a
phone-class viewport. `[playtest unknown]`, and the ratio is the thing to test, not either number
alone.

**The sightline bound is set with margin so the unknown inside it cannot break it.** `N7` and
`social/02` require the segment between two neighbouring spawn points to be unobstructed at eye
height. R15 eye height above the slab top face is `[playtest unknown]`, starting value **5
studs**, test range 4–6. The long-side cap is **3 studs**, which survives the whole range with at
least 1 stud to spare, and it is exactly the *"low parapet on the open side"* `theme/setting/01`
already asks for. The two **ends** of the boundary rectangle run along Z and cross no sightline,
so the *"retaining wall on the uphill side"* goes there at up to 12 studs.

**This sheet sets no boundary property.** `gameplay/meta/06` hands the invisible boundary's
height, material, opacity and thickness to traversal work. My rule is about **built stone
standing on the boundary rectangle**, which is Environment's geometry, and the two do not
collide.

**Silhouette is the rarity channel and colour is not.** `tiers` ships four `shape` and four
`height` values, `rarity` makes the ladder *"silhouette first, colour second"*, and `N1`, `N2`
and `N12` forbid every optimisation that would flatten them. **I state the rule and restate none
of the values, propose no fifth, and recolour and resize nothing.** Carried from sheet `01`: the
luma floor is Rec.601 luma, WCAG 1.4.11's 3:1 is sRGB relative luminance computing to roughly
1.5:1 against `tiers[0]` (3:1 would need about 231 luma, above `styleGuide` `C1`'s cap), and **no
sheet may claim the floor as the legibility guarantee.** The guarantee is the four shapes and
four heights. That is why the greyscale test below reads outline and not value.

**"Ornate" was undefined and the producible vocabulary is four parameters.** `validateBrief`
(`[research: ui-forge/src/compose/index.mjs:55-64]`) rejects any parameter outside
`modal-grid.ornament` `{cardBadge, panelTrim}` and `hud-overlay.ornament` `{readoutTrim, barCap}`
`[research: ui-forge/src/compose/patterns/modal-grid.mjs:454-457]`
`[research: ui-forge/src/compose/patterns/hud-overlay.mjs:389-392]`. There is no parameter for
panel artwork, a frame texture or a 9-slice. So the only remaining ornament channels are stroke
weight, radius scale, gradient strength and a serif font stack — **eight knobs in total, and
anything beyond them is a capability finding against the pattern registry, not a spec.**

**One correction the category brief needs.** It states that `typeScaleFor('8-14')` *"already
applies a 1.06 factor"*. It returns **1.15**: `generate.mjs:56` tests `lower <= 9` first and the
band's lower bound is 8, so the 1.06 branch at line 57 is never reached for this audience
`[research: ui-forge/src/theme/generate.mjs:54-57]`. A type ramp designed against 1.06 will ship
about 8% small. **This is UI Art's to act on, not mine.**

**`vfx/01` cited `styleGuide.form.minimumFeatureStuds`, which resolves to nothing.** Every size,
proportion and ornament field is in **this** key, and the path is
`formLanguage.featureSize.near.minStuds`. `citeAs` below is the canonical list, added because one
miscitation across a seam is a defect in my field names before it is one in the citing sheet.

**Ornament that carries function is not ornament, and that is what makes the count honest.** One
ornamental element is a form whose **only** function is decorative: it carries no collision, no
patch anchor, no boundary, no opening and no readout. A parapet coping that a player can stand on
is `P1` construction and does not count; a dentil band cut into that coping does. Without that
test, every count becomes an argument about what a thing is for.

**The zeros are the load-bearing rows.** A lane slab carries nothing (`theme/setting/04` `W1`: a
finished part *"gains no marker, plaque, dressing, light, colour shift, sound, cue or state of any
kind"*). A patch carries nothing (`N1`, `N12`). The tool carries nothing (`representation.tool`
fixes both parts). A step run carries nothing, because a stair with ornament on the tread is the
reflex and it makes the tread unreadable at 4 studs.

```manifest
{
  "provides": "formLanguage",
  "status": "proposed",
  "value": {
    "citeAs": {
      "whyThisExists": "verification round 1 found vfx/01 citing styleGuide.form.minimumFeatureStuds, which resolves to nothing. Every size, proportion, height and ornament field is in THIS key. An alias is a merge error, not a synonym.",
      "canonical": [
        "formLanguage.featureSize.near.minStuds",
        "formLanguage.featureSize.near.atStudsUpTo",
        "formLanguage.featureSize.far.minStuds",
        "formLanguage.featureSize.far.atStuds",
        "formLanguage.eyeHeightStuds",
        "formLanguage.boundaryHeight.longSideMaxStuds",
        "formLanguage.boundaryHeight.endMaxStuds",
        "formLanguage.proportionRelations[] — keyed by .id R1 through R7",
        "formLanguage.greyscaleSilhouetteRule.test",
        "formLanguage.ornament.definition",
        "formLanguage.ornament.failTest",
        "formLanguage.ornament.byClass[] — keyed by .class, each with .max and .positions",
        "formLanguage.ornament.permittedForms",
        "formLanguage.ornament.forbiddenForms",
        "formLanguage.uiOrnament.producibleVocabulary",
        "formLanguage.uiOrnament.countRule",
        "formLanguage.uiOrnament.typeScaleCorrection"
      ],
      "wrongSpellingsSeenInRoundOne": [
        { "cited": "styleGuide.form.minimumFeatureStuds", "by": "vfx/01", "resolvesTo": "formLanguage.featureSize.near.minStuds. styleGuide holds no form, size or proportion field at all." }
      ],
      "notInThisKey": "every colour, material, Reflectance and Transparency value is in styleGuide (sheet 01). Every instance, part and triangle figure is in detailBudget (sheet 03), environment or effects. formLanguage.color and formLanguage.budget do not exist and never will."
    },
    "featureSize": {
      "near": { "atStudsUpTo": 24, "minStuds": 0.5, "status": "[playtest unknown]", "testRange": [0.3, 0.8], "meaning": "a player standing beside the thing on their own lane. Nothing in world geometry is authored below this in ANY dimension; a form below it is not small, it is absent." },
      "far": { "atStuds": 122, "atStudsSource": "plots.pitchStuds — cited, not set here", "minStuds": 4.0, "status": "[playtest unknown]", "testRange": [3.0, 6.0], "meaning": "a silhouette-bearing dimension of anything intended to read from a neighbouring lane. A floor, not a promise: beyond this distance nothing is required to read, and beyond budgets.streaming.StreamingTargetRadius nothing renders." },
      "ratioIsTheThingToTest": "distance ratio ~5:1, size ratio 8:1. Superlinear because contrast and mip-mapping degrade faster than distance on budgets.deviceFloor. Instrument: a screenshot at each distance on the floor device; the check is the authored dimension in studs, not an opinion about the screenshot.",
      "audienceInput": "'8-14, mobile-heavy, short sessions' 00-CORE.md [brief: binding]. The only brief line that implies a feature-size floor."
    },
    "eyeHeightStuds": { "value": 5.0, "status": "[playtest unknown]", "testRange": [4.0, 6.0], "measuredFrom": "the plot slab's top face, which representation.plot fixes at Y = 0", "instrument": "a screenshot from the default camera at an occupied spawn point" },
    "boundaryHeight": {
      "longSideMaxStuds": 3.0,
      "longSideMeaning": "any built stone standing on the two lane-to-lane sides of the plot-boundary rectangle. This is theme/setting/01's 'low parapet on the open side'.",
      "longSideWhy": "N7 and social/02 require the spawn-to-spawn segment unobstructed at eye height. 3.0 clears the whole eyeHeightStuds test range by at least 1.0 stud, so the unknown inside it cannot break the rule.",
      "endMaxStuds": 12.0,
      "endMeaning": "the inward and outward ends of the rectangle, which run along Z and cross no sightline. This is theme/setting/01's 'retaining wall on the uphill side'.",
      "endStatus": "[playtest unknown]", "endTestRange": [6.0, 20.0],
      "endHardCap": "20.0 — representation.plot-boundary's part height. Built stone sits inside the invisible bound, never outside it.",
      "notSetHere": "the invisible boundary's own height, material, opacity and thickness are traversal work's (gameplay/meta/06 hands them there). This key constrains built stone standing on the rectangle and nothing else."
    },
    "proportionRelations": [
      { "id": "R1", "relation": "no single built element spans more than one tenth of the lane across X", "against": "plots.laneWidthStuds", "why": "a wall that reaches a tenth of the way in stops being a boundary and starts being a room" },
      { "id": "R2", "relation": "no built element is longer along Z than half a chunk's depth", "against": "layout.chunk", "why": "so a chunk seam never cuts one element, which is what makes 8 families x 16 variants shuffle without visible joins" },
      { "id": "R3", "relation": "zero built geometry inside the patch field", "against": "layout (the central band of the chunk) and layout.edgeKeepoutStuds", "why": "a patch is non-colliding and a wall is not; anything inside the field turns clearing into navigation" },
      { "id": "R4", "relation": "no built element within one area.minSpacing of a patch anchor", "against": "area.minSpacing", "why": "the clear radius is a distance test, not a query; geometry inside the spacing hides a payable patch behind an unpayable wall" },
      { "id": "R5", "relation": "a P3 fitting is either at least 2x patch.footprint in its largest dimension, or set into a surface with zero standoff. Never a free-standing object at patch scale.", "against": "patch.footprint", "why": "with styleGuide C6 (green is the overgrowth channel alone) this is the second half of what stops a fitting reading as a patch" },
      { "id": "R6", "relation": "an opening's clear height is at least 2x eyeHeightStuds and its clear width at least 8 studs", "against": "eyeHeightStuds; two R15 bodies abreast", "why": "theme/setting/04 gives every part exactly two openings and Environment sets their width; this is the floor that width must clear" },
      { "id": "R7", "relation": "walkable margin, kerb and paving proportions are read from layout and plots by field and are not restated here", "against": "layout.chunk, layout.edgeKeepoutStuds, plots.laneWidthStuds, plots.pitchStuds", "why": "gameplay/meta/06 has an open request against the 12-stud walkable margin; a value copied here would go stale the moment it resolves" }
    ],
    "greyscaleSilhouetteRule": {
      "test": "render one instance of each tiers[].shape at its tiers[].height, all four filled with one identical flat grey, at featureSize.far.atStuds, on budgets.deviceFloor. Each of the four must be nameable from outline alone.",
      "citedByField": "tiers[].shape and tiers[].height. NOT restated, recoloured, resized, or extended to a fifth.",
      "secondHalf": "no built element within one area.minSpacing of a patch anchor may present a silhouette matching any tiers[].shape at that shape's tiers[].height +/- 20%.",
      "whyNotALumaClaim": "the 165 floor is Rec.601 luma; WCAG 1.4.11's 3:1 is sRGB relative luminance, a different quantity computing to roughly 1.5:1 against tiers[0], and a 3:1 ratio would need about 231 luma, above styleGuide C1's cap. Shape and silhouette carry legibility and tiers ships four of each. No sheet may cite the luma floor as the legibility guarantee.",
      "source": "04-PRESENTATION.md 'rarity tiers must differ by shape or silhouette, not only hue... a requirement, not a nicety' [brief: soft], treated as effectively binding; rarity 'silhouette first, colour second'; N1, N2, N12."
    },
    "ornament": {
      "definition": "one ornamental element is a form whose ONLY function is decorative: it carries no collision, no patch anchor, no boundary, no opening and no readout. A form carrying any of those five is construction and is not counted.",
      "failTest": "take one screenshot at featureSize.near.atStudsUpTo. For each subject instance in frame, count its ornamental elements. FAIL if any instance exceeds its max, if any element sits outside that row's permitted positions, or if any element is free-standing rather than parented to a listed class. A count, not an impression.",
      "byClass": [
        { "class": "wall or parapet run (one continuous face within one chunk)", "max": 2, "positions": ["a string course at coping level", "one panel field centred on the face"] },
        { "class": "pier or column", "max": 1, "positions": ["the capital only — the top one sixth of its height"] },
        { "class": "vault bay (depths 2-3)", "max": 2, "positions": ["a rib at each groin", "a boss at the crown"] },
        { "class": "channel or basin run (P2)", "max": 1, "positions": ["a moulded rim on the basin lip"] },
        { "class": "paving field (one chunk)", "max": 1, "positions": ["a pattern band in the paving, flush, zero standoff"] },
        { "class": "step or stair run", "max": 0, "positions": [], "why": "ornament on a tread is the reflex and it makes the tread unreadable at featureSize.far.minStuds" },
        { "class": "fixed fitting or gearwork (P3)", "max": 0, "positions": [], "why": "a fitting's ornament is its own form; an added element on it is indistinguishable from a loose object, and every loose object is a Find (P4)" },
        { "class": "lane slab (representation.plot)", "max": 0, "positions": [], "why": "theme/setting/04 W1 — a finished part gains nothing of any kind" },
        { "class": "plot boundary (representation.plot-boundary)", "max": 0, "positions": [], "why": "Transparency 1; N7" },
        { "class": "patch", "max": 0, "positions": [], "why": "N1, N12, art/objects/01" },
        { "class": "tool (representation.tool)", "max": 0, "positions": [], "why": "two Parts, fixed; tool.appearanceChannel is headWidth alone" },
        { "class": "canopy (P9)", "max": 0, "positions": [], "why": "backdrop, beyond the built edge" }
      ],
      "permittedForms": ["chamfer", "fillet", "bead-and-roll", "string course", "dentil band", "fret band", "chevron band", "lozenge panel", "fluting", "coffer recess", "boss", "rib"],
      "permittedFormsIsClosed": "a thirteenth form is a revision against this key. All twelve are geometric and cuttable; none requires an asset, per 00-CORE.md 'content design is the primary creative work on this project, not art' [brief: binding] and representation's 'no asset needs to be produced to build this game'.",
      "forbiddenForms": ["statuary of a person or creature", "relief figure", "mask", "acanthus or foliate leaf carving", "egg-and-dart", "volute or scroll capital", "cartouche", "inscription, lettering, numeral or symbol", "gilded or inlaid moulding", "gemstone setting", "banner, drape or cloth", "hanging chain", "torch or lamp bracket", "grave marker, memorial, plaque or staged rubble", "cobweb, skull, bone or scorch mark", "a face, eyes or mouth on any form"],
      "forbiddenSources": "theme/setting/01 (no iconography, no statuary, no gilding, no gemstones); theme/lore/01 (no gold, gilding or gemstones); theme/setting/05 A-column (no cloth, rope, torches, lamps, cut lettering, water); theme/tone/04 D1, D13, D14; A7 (no light source but daylight).",
      "everyElementIsAnInstance": "an ornamental element is a Part and is counted against detailBudget's envelope inside environment's own per-class allocation. Ornament is not free and has no allocation of its own."
    },
    "uiOrnament": {
      "producibleVocabulary": { "modal-grid.ornament.cardBadge": ["none", "ribbon", "pill"], "modal-grid.ornament.panelTrim": ["none", "top-accent"], "hud-overlay.ornament.readoutTrim": ["none", "accent-edge"], "hud-overlay.ornament.barCap": ["flat", "round"] },
      "vocabularyIsTheWholeSpace": "validateBrief rejects any parameter outside these four (ui-forge/src/compose/index.mjs:55-64). There is no parameter for panel artwork, a frame texture or a 9-slice.",
      "countRule": "at most 2 of the 4 may hold a non-default value across the whole game. Defaults are 'none' for cardBadge, panelTrim and readoutTrim, and 'flat' for barCap.",
      "whyTwo": "'ornamented' against an 8-14 mobile audience at maxLabelChars 14 is a register, not a density. Two live parameters read as deliberate; four read as decoration on every element and cost legibility at phone size. [playtest unknown], test range 1-4.",
      "remainingChannels": ["strokeWeight", "radiusScale", "gradient strength", "the serif font stack"],
      "anythingBeyondThoseEight": "a capability finding against the pattern registry, not a spec.",
      "whichValuesShip": "UI Art's uiTheme. NOT decided here.",
      "typeScaleCorrection": "the Art & Visuals category brief states typeScaleFor('8-14') applies a 1.06 factor. It returns 1.15: generate.mjs:56 tests lower <= 9 before line 57's lower <= 13, and the band's lower bound is 8. A type ramp designed against 1.06 ships about 8% small. UI Art's to act on."
    },
    "scopeCheck": "no feature-size band, height allowance, proportion relation or ornament slot is reserved for a seasonal decoration, festival banner, leaderboard plinth, podium, trade counter, gift container, reward chest, code surface, rebirth altar or prestige marker. 03-META.md priority 3; theme/setting/05 A17-A23."
  }
}
```

## Consequences for other work

- **Environment work** gains the rule its 32 chunk looks are failed against: a 3-stud cap on
  anything standing on a lane-to-lane boundary side, 12 studs on the two ends, `R1`–`R7` as the
  proportion relations against `layout.chunk` and `plots`, and an ornament count per subject
  class with named positions. **The retaining wall and the low parapet are not interchangeable
  and cannot swap sides** — one crosses the sightline and one does not. `R6` sets the floor its
  opening widths must clear; the widths stay Environment's. Every ornamental element is a `Part`
  and is spent from Environment's own allocation, not from a separate ornament allowance.
- **Traversal work (`gameplay/mechanics/06`)** is untouched: this key sets no property of the
  invisible boundary. If the 12-stud walkable margin is released per `gameplay/meta/06`, `R7`
  re-derives and no value here moves, because none of them is a copy.
- **Objects work** inherits `R5` — a `P3` fitting is either at least twice `patch.footprint` or
  set flush — as the fixed-versus-loose visual rule's geometric half, and `ornament.byClass`'s
  zero on the tool. The four foliage forms stay inside `tiers[].shape` and `tiers[].height`, and
  the greyscale test is what a fifth form or a softened height would fail.
- **VFX work** inherits `featureSize.near.minStuds`: a residue or reveal form below 0.5 studs is
  not subtle, it is invisible on `budgets.deviceFloor`, and `response.dwellSeconds` 2.5 buys
  nothing if the thing dwelling cannot be seen. **The path is
  `formLanguage.featureSize.near.minStuds`**, not `styleGuide.form.minimumFeatureStuds`.
- **UI Art work** inherits a count of 2 non-default ornament parameters, the naming of the other
  four channels, and **the `typeScaleFor` correction: 1.15, not 1.06.** Which parameters and
  which values ship is `uiTheme`'s.
- **Detail-budget work (sheet `03`, this domain)** inherits
  `ornament.everyElementIsAnInstance`: an ornamental element is a `Part`, so the ornament ceiling
  and the instance envelope are the same ceiling read twice.
- **`tiers`, `plots`, `layout`, `patch` and `area`** get nothing asked of them. Every geometric
  input above is a field reference and no value of theirs is restated, resized or recoloured.

## Acceptance criteria

1. Every authored part in world geometry has its smallest dimension `≥ 0.5` studs; every part
   whose class is listed as silhouette-bearing has a dimension `≥ 4.0` studs. Count of parts
   failing either: **0**.
2. No part standing on a plot-boundary rectangle's two lane-to-lane sides extends more than 3.0
   studs above the slab's top face, and the segment between two neighbouring occupied spawn
   points at 5.0 studs of height intersects **zero** parts with `Transparency < 1`.
3. For every subject class in `formLanguage.ornament.byClass`, the count of ornamental elements
   parented to one instance of that class is `≤` that row's `max`, and every element names a
   `position` from that row's list. Ornamental elements not parented to a listed class: **0**.
   Ornamental forms not present in `permittedForms`: **0**.
4. Across every `ui-forge` brief in the build, at most **2** of `cardBadge`, `panelTrim`,
   `readoutTrim`, `barCap` hold a non-default value, and `validateBrief` reports zero rejected
   ornament parameters.

## Flagged to the developer

**Feature size, boundary height and the ornament counts are all `[cid: decided]` against
silence** — the brief contains no proportion, scale or ornament rule of any kind, and `OPEN.md
§4` routes only *"tier legibility on a phone"* here, which is the greyscale test. The two live
alternatives to the ornament ceiling: **a per-frame cap** (rejected — it depends on framing, so
two critics disagree) and **no ceiling, judged by review** (rejected — that is what
*"ornamented"* already was, and it produced nothing checkable). **My recommendation is the
per-subject-class count as written.** If it is overruled, the cheap reversal is the `max` column
alone; the definition, the positions and the two form lists survive any number.

## Not decided here

Every colour, material, `Reflectance` and `Transparency` value these forms are made of — sheet
`01`, which holds `styleGuide`. How many parts may carry them — sheet `03`, which holds
`detailBudget`'s envelope, and `environment` and `effects`, which hold the per-subject-class
counts. The wall and parapet section, the paving pattern, the channel run, the vaulting, the
authored openings and their widths, and how dressing distributes across `layout`'s families and
variants — Environment's `environment`. The tool's two parts' proportions and colours, and the
four foliage forms inside `tiers`' shipped shapes — Objects' `objectArt`. Which ornament
parameter values, stroke weight, radius scale, gradient strength and font stack ship — **UI Art's
`uiTheme`**. Cluster geometry, touch-target size and safe areas — UI/UX `composition` and
`viewport`. The invisible boundary's height, material, opacity and thickness — traversal work.
What a clear or a reveal is shaped like inside `response`'s two lifetimes — VFX's `effects`.
