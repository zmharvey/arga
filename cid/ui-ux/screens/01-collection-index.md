# 01 — The collection index, and the screen inventory

**Domain:** ui-ux/screens · **Category:** UI/UX · **Wave:** 5 · **Revision round 1**

## Decision

This game has **one screen, `index`**: a bottom-anchored panel at `0.94 x 0.86`, no scrim, no
title, no close control and no scroll region, holding four groups in `collection.sets` declared
order, each a heading above one row of six identical slots. The only mutable property is one
label's `Text`. It **may intersect all four pressables**, which stay activatable above it by
z-order. `areas` and `upgrades` are absent, `shop` forbidden. **`modal-grid` cannot compile it
on five counts.**

## Why

**One screen is the compliant answer, not a thin one.** `00-CORE.md` binds the project to
*"the smallest game that still gives every creative area real work"* `[brief: binding]`
← `[you chose: R1 Q3]`, and three of `04-PRESENTATION.md`'s four table rows resolve elsewhere.

| id | status | ruling | source |
|---|---|---|---|
| `index` | **present** | the one opened surface; *"the differentiator's home"* | `04-PRESENTATION.md` `[brief: soft]`; `representation.index-surface` |
| `areas` | **absent** | the next area is enterable at the instant one completes, with no threshold, cooldown or travel; depth is taught by arrival through an opening with no label, marker or gate | `meta/04`; `onboarding/03` rank 7 |
| `upgrades` | **absent** | three readouts and three `Pressable_BUY*` are persistent HUD elements, not an opened surface | `representation.pressable`; `input.gameDrawnPressables: 4` |
| `shop` | **forbidden** | deleted by ruling R-4; no product may be named, shown or priced on any in-game surface | `products.F19`; `cid/_state.md` |

**The tree.** `representation` fixes the contents (*"four labelled groups, one per
`collection.sets` entry, each holding six slots in the declared order of that set's names"*)
and `rarity` makes the four headings the only place the find-set ladder is legible anywhere.
Everything below was unstated.

| node | class | parent | count | holds | why this and not another |
|---|---|---|---|---|---|
| `IndexSurface` | `Frame` | hud `ScreenGui` | 1 | the four groups | `representation.index-surface`, created hidden by `index-screen` |
| `Group_<setId>` | `Frame` | `IndexSurface` | 4 | heading + row | grouping is what teaches sets (`onboarding/03` rank 6) |
| `Heading_<setId>` | `TextLabel` | `Group_<setId>` | 4 | `collection.sets[g].label` | the only legible find-set rank in the game (`rarity`) |
| `Row_<setId>` | `Frame` | `Group_<setId>` | 4 | six slots, one row | forced by the vertical budget below, not chosen |
| `Slot_<setId>_<i>` | `Frame` | `Row_<setId>` | 24 | one `Name` label | identical for held and unheld: same size, colour, corner, position |
| `Name` | `TextLabel` | `Slot_<setId>_<i>` | 24 | the Find name, or `""` | the single mutable property on the surface |

**Group order is `collection.sets` declared order, depth 1 at the top** `[cid: decided]`. Depth
is taught by arrival and by grouping, so the panel reads in the order the player met the areas.

**Six across in one row is forced arithmetic, not a preference.** At sheet 03's 14 px floor the
reserved vertical stack is `4 x 24` heading + `4 x 26` slot row + `3 x 12` group gap + 48 for
the flavour block + `2 x 16` panel padding = **316 px** at the ramp read on 2026-08-01
`[research: ui-forge/src/theme/generate.mjs]`. On a phone-class viewport of about 375 points
that is 84% of the height before anything else is placed. At 3 columns by 2 rows the stack goes
to 420 px and fits no phone at all. Width is the softer constraint, because a Find name is one
word of at most 12 characters (`theme/vocabulary/01`).

**Extent: `0.94 x 0.86`, bottom-anchored, and both numbers are derived rather than picked.**
Height 0.86 x 375 = 322 px against the 316 px stack. Width 0.94 gives a slot label
`(0.94 x 667 - 32) / 6 - 4` = **95 px** on a small phone, against roughly 92 px for a
12-character name at 14 px. **That 92 is my estimate and is not sourced**; the binding
mechanism is sheet 03's build-time `GetTextBoundsAsync` fit check, which fails the build if the
fit size falls below the floor and routes the fix to whoever owns the name or the box. Both
scales are `[playtest unknown]`, test range width 0.86 to 0.98, height 0.78 to 0.92, settled by
one `npm run render` at phone viewport.

**Intersection is permitted with all four pressables, and my first draft was wrong to guarantee
otherwise.** I asserted that a bottom-anchored panel leaves the top-left cluster uncovered on
every viewport. Run the numbers: to clear a 96 px cluster ending 124 px from the top of a
375-point viewport, the panel may be at most `375 - 28 - 132` = 215 px tall, against a 316 px
stack. **No phone viewport admits a panel that both fits its contents and clears any cluster**,
and the same arithmetic disposes of disjointness against the purchase column, which occupies
essentially the whole usable height on a small phone. Reachability is carried instead by
`navigation/02`'s z-layers, `indexPanel` 10 under `gameDrawnPressables` 20: the four buttons
draw above the open panel and stay activatable, which that sheet already states as
`indexControlRemainsActivatable: true`. Geometry was the wrong mechanism; z-order is the right
one.

**No scrim.** `modal-grid`'s root is a full-viewport `Backdrop` at `surface.overlay`
transparency 0.45 (`modal-grid.mjs:400-407`). A scrim dims and absorbs presses across the whole
screen, which takes the four pressables with it. `frame.Active = true` absorbs presses inside
the panel's own bounds only, and that is correct and kept.

**No title.** A title is a string with no contract path, rendered at `heading` 30 px, restating
what the button that opened it already means, against sheet 03's copy budget and a binding
smallest-game rule. The four set headings already label everything on the surface.

**No scroll region.** A scrolled panel puts a slot the player just filled off screen with no cue
that it exists, and `firstSession.suppressionForbidden` bans reflow. All 28 nodes are visible at
once at the default text size; sheet 03 owns raised `GuiService.PreferredTextSize`.

**What is not on this surface.** Each row is countable and cites the ruling that closes it.

| absent | count | ruling |
|---|---|---|
| `Backdrop`, scrim, dim layer, vignette | 0 | this sheet; it would swallow the four pressables |
| `Title`, screen name, subtitle | 0 | this sheet; copy budget, sheet 03 |
| `CloseButton`, X glyph, back arrow, tab bar | 0 | `input.gameDrawnPressables: 4`; see `## Pushing back` |
| `ScrollingFrame`, scrollbar, pagination, arrows | 0 | this sheet |
| padlock, lock glyph, greyed or dimmed slot, question-mark placeholder | 0 | `firstSession.suppressionForbidden`; `tone/04` `D8` |
| silhouette, blurred model, greyed name, pre-reveal flavour line | 0 | `tone/04` `D11` |
| price, currency figure, product name, buy control, `PricePill` | 0 | `products.F19`; `tone/04` `D8` |
| rarity colour, frame, glow, border, sparkle, badge, ribbon, pill | 0 | `rarity.forbidden`; `cardBadge` stays `none` |
| per-set colour, per-set font, per-set size | 0 | `rarity`: four headings drawn identically |
| count, denominator, fraction, percent, progress bar | 0 | HUD owns the readout; `endgame` bans a completion percentage |
| duplicate count, timestamp, condition, `isNew` badge or dot, sort index | 0 | `discovery.record.forbiddenFields`; `firstSession.suppressionForbidden` |
| sort control, filter, search field, category tab | 0 | this sheet; `input` has no verb for one |
| set-bonus list, bonus tooltip, per-set reward preview | 0 | `setBonus`: *"UI/UX has no bonus screen"* |
| completion message, congratulation, end screen, 24/24 state | 0 | `endgame` |
| explanatory tooltip, coach mark, arrow, first-run-only string | 0 | `onboarding/03` `T5`, `T6`; `firstSession.suppressionForbidden` |
| fill animation, lift animation, tween, pulse, blink, reflow | 0 | `firstSession` `S6`/`S7`; `tone/04` `D6` |
| another player's name, collection, currency or rank | 0 | `social.forbidden` `X6`/`X7`; `tone/04` `D7` |
| face, eyes, mouth, mascot, speaking element | 0 | `tone/04` `D13` |
| calendar, clock face, seasonal or event decoration | 0 | `tone/04` `D15`; priority-3 scope gate |
| lore panel, profile, journal, role text | 0 | `theme/identity/02`: *"Identity requires no surface from you"* |

**The producibility finding.** Two documents assert the opposite and both are wrong:
`04-PRESENTATION.md`'s *"`collection-index` ... fit[s] that shape well"* and my own category
brief's *"four groups of six against `columns: [1,2,3,4]` is inside the parameter space"*.
`validateBrief` rejects anything outside a pattern's declared space (`index.mjs:44-76`), so this
is a compiler refusal. **All four counts were confirmed from source at verification and a fifth
was added there; count 5 is the verifier's, not mine.**

| # | count | evidence | smallest change |
|---|---|---|---|
| 1 | **No per-group container at any `columns` value.** `modalGrid()` chunks one flat `content.items` list into `Row_<n>` frames; group membership is not expressible, and `columns` clamps to 1 to 4 against a six-slot group | `modal-grid.mjs:322, 326-348`; `meta.variant.columns` at `:447` | in `modalGrid()`: when `content.groups` (`{ id, heading, items }[]`) is present, emit one `Group_<id>` Frame per entry holding a `Heading_<id>` `TextLabel` and that group's own rows, instead of `chunk(items, columns)`. Add `Group_*`, `Heading_*` to `meta.nodes` |
| 2 | **The four set headings have nowhere to live.** `meta.slots` is exactly `panelTop` and `panelBottom`, both panel-level; there is no node between rows | `modal-grid.mjs:459` | closed by change 1 |
| 3 | **`validateContent` requires `name`, `price` and `art` on every item.** An unfound slot has no name and no art, and a price here is banned outright | `modal-grid.mjs:475-487`; `products.F19`; `tone/04` `D8` | in `meta.validateContent`: require `price` and `art` only when `brief.variant.ctaPlacement === 'per-item'`; require `content.title` only when `headerStyle !== 'none'`, and add `'none'` to `meta.variant.headerStyle` |
| 4 | **The root is an unconditional full-viewport scrim** that would dim and absorb presses over the four pressables | `modal-grid.mjs:400-407` | add `scrim: ['dim', 'none']` to `meta.variant` and gate the `Backdrop` on it |
| 5 | **The rows are emitted inside an unconditional `ScrollingFrame` named `Grid`**, height-capped at 196 px on mobile, which this sheet forbids by name and tests for | `modal-grid.mjs:354-368`; added by verification, round 1 | add `scroll: ['y', 'none']` to `meta.variant` and emit a plain `Frame` at `'none'` |

Five edits, one file, two functions: `modalGrid` and `meta.validateContent`. Until they land,
`index-screen` builds the surface by hand, which is what runs today and says so
`[research: game/src/client/IndexScreen.luau]`.

```manifest
{
  "provides": "screens",
  "status": "proposed",
  "value": {
    "screens": [
      {
        "id": "index",
        "surfaceName": "IndexSurface",
        "class": "Frame",
        "parent": "the hud ScreenGui",
        "createdBy": "index-screen",
        "openedBy": "Pressable_INDEX",
        "closedBy": "Pressable_INDEX, which toggles; navigation owns the mechanism",
        "producibleBy": null,
        "refusedBy": "modal-grid",
        "hasScrim": false,
        "hasTitle": false,
        "hasCloseControl": false,
        "hasScrollRegion": false,
        "zIndexEveryNode": 10,
        "zIndexLayerCitation": "navigation.zOrder.layers[indexPanel] = 10, under gameDrawnPressables = 20",
        "geometry": {
          "anchorPoint": [0.5, 1],
          "positionScale": [0.5, 1],
          "positionOffsetPx": [0, -28],
          "sizeScale": [0.94, 0.86],
          "maxWidthToken": "sizing.panelMaxWidth",
          "mustNotIntersect": [],
          "mayIntersect": ["Pressable_INDEX", "Pressable_BUY1", "Pressable_BUY2", "Pressable_BUY3"],
          "reachabilityMechanism": "zOrder, not disjointness",
          "disjointnessImpossibleBecause": "the reserved stack is 316px; clearing a 96px cluster on a 375-point viewport allows at most 215px of panel",
          "reservedStackPx": { "headings": 96, "slotRows": 104, "groupGaps": 36, "flavourBlock": 48, "panelPadding": 32, "total": 316 },
          "slotLabelWidthPxAt667Wide": 95,
          "slotLabelWidthRequiredPxEstimate": 92,
          "slotLabelWidthEstimateIsNotSourced": true,
          "bindingFitMechanism": "screens.textPolicy build-time GetTextBoundsAsync check",
          "playtestUnknown": ["sizeScale"],
          "testRange": { "widthScale": [0.86, 0.98], "heightScale": [0.78, 0.92] }
        },
        "groupOrder": "collection.sets declared order, depth 1 first, top to bottom",
        "groupCount": 4,
        "slotsPerGroup": 6,
        "slotColumns": 6,
        "slotRowsPerGroup": 1,
        "tree": [
          { "node": "IndexSurface", "class": "Frame", "parent": "hud", "count": 1, "bg": "surface.base", "corner": "radius.lg", "padding": "space.lg" },
          { "node": "Group_<setId>", "class": "Frame", "parent": "IndexSurface", "count": 4, "bg": null },
          { "node": "Heading_<setId>", "class": "TextLabel", "parent": "Group_<setId>", "count": 4, "textFrom": "collection.sets[g].label", "typeRole": "label", "color": "content.secondary", "align": "start" },
          { "node": "Row_<setId>", "class": "Frame", "parent": "Group_<setId>", "count": 4, "bg": null },
          { "node": "Slot_<setId>_<i>", "class": "Frame", "parent": "Row_<setId>", "count": 24, "bg": "surface.sunken", "corner": "radius.sm", "identicalWhenEmpty": true },
          { "node": "Name", "class": "TextLabel", "parent": "Slot_<setId>_<i>", "count": 24, "textFrom": "collection.sets[g].relics[i].name, or the empty string", "typeRole": "set by screens.textPolicy", "color": "content.primary", "align": "center" }
        ],
        "mutableProperties": ["Slot_<setId>_<i>/Name.Text"],
        "ownStrings": [],
        "stringSources": ["collection.sets[].label", "collection.sets[].relics[].name"],
        "forbiddenNodes": [
          "Backdrop", "scrim", "dimLayer", "vignette", "Title", "subtitle", "CloseButton",
          "backArrow", "tabBar", "ScrollingFrame", "scrollbar", "pagination", "padlock",
          "lockGlyph", "greyedSlot", "dimmedSlot", "questionMarkPlaceholder", "silhouette",
          "blurredModel", "greyedName", "preRevealFlavour", "PricePill", "Price", "BuyButton",
          "productName", "rarityColour", "rarityFrame", "glow", "border", "sparkle", "Badge",
          "ribbon", "pill", "perSetColour", "count", "denominator", "fraction", "percent",
          "progressBar", "duplicateCount", "timestamp", "isNewBadge", "newDot", "sortIndex",
          "sortControl", "filter", "searchField", "categoryTab", "setBonusList", "bonusTooltip",
          "rewardPreview", "completionMessage", "congratulation", "endScreen", "tooltip",
          "coachMark", "arrow", "firstRunOnlyString", "fillAnimation", "liftAnimation", "tween",
          "pulse", "blink", "otherPlayerName", "otherPlayerProgress", "face", "mascot",
          "calendar", "clockFace", "seasonalDecoration", "lorePanel", "profile", "journal"
        ]
      }
    ],
    "absentScreens": [
      { "id": "areas", "status": "absent", "reason": "the next area is enterable at the instant one completes with no threshold, cooldown or travel; depth is taught by arrival through an unlabelled opening", "citation": "gameplay/meta/04; gameplay/onboarding/03 rank 7" },
      { "id": "upgrades", "status": "absent", "reason": "three readouts and three purchase pressables are persistent HUD elements, not an opened surface", "citation": "architect/06 representation.pressable; input.gameDrawnPressables 4" },
      { "id": "shop", "status": "forbidden", "reason": "ruling R-4 removed the in-game store; no product may be named, shown or priced on any in-game surface", "citation": "products.F19; cid/_state.md R-4" }
    ],
    "patternFindings": [
      { "pattern": "modal-grid", "verdict": "cannot produce screens[index]", "asOf": "2026-08-01, revision round 1", "counts": [
        { "id": "P1", "problem": "no per-group container; modalGrid chunks one flat item list and columns clamps to 1-4 against a six-slot group", "evidence": "ui-forge/src/compose/patterns/modal-grid.mjs:322,326-348,447", "fix": "modalGrid(): emit one Group_<id> per content.groups entry with its own Heading_<id> and rows; add Group_*, Heading_* to meta.nodes" },
        { "id": "P2", "problem": "meta.slots is exactly panelTop and panelBottom, so four set headings have nowhere to live", "evidence": "ui-forge/src/compose/patterns/modal-grid.mjs:459", "fix": "closed by P1" },
        { "id": "P3", "problem": "validateContent requires name, price and art on every item; an unfound slot has none and a price here is banned", "evidence": "ui-forge/src/compose/patterns/modal-grid.mjs:475-487", "fix": "meta.validateContent(): require price and art only when variant.ctaPlacement is per-item; require content.title only when headerStyle is not none; add none to meta.variant.headerStyle" },
        { "id": "P4", "problem": "the root is an unconditional full-viewport scrim that would dim and absorb presses over the four pressables", "evidence": "ui-forge/src/compose/patterns/modal-grid.mjs:400-407", "fix": "add scrim: ['dim','none'] to meta.variant and gate the Backdrop on it" },
        { "id": "P5", "problem": "the rows are emitted inside an unconditional ScrollingFrame named Grid, height-capped at 196px on mobile, which this screen forbids by name", "evidence": "ui-forge/src/compose/patterns/modal-grid.mjs:354-368", "foundBy": "verification round 1", "fix": "add scroll: ['y','none'] to meta.variant and emit a plain Frame at none" }
      ] }
    ]
  }
}
```

## Pushing back

**Against `cid/ui-ux/navigation/03-close-and-focus-by-device.md`, `closeControl`.** That sheet
draws a close control inside `IndexSurface` with `drawnBy: "screens"` and `selectionOrder: 0`.
**I refuse the node.** Three grounds, in order of weight.

1. **`input.gameDrawnPressables: 4` is an approved key and the list is closed** (`mechanics/02`:
   *"five verbs and there is no sixth"*). Ruling R-1 contained the input overrule to *"one input
   class, two verbs, four controls"* and says in terms that it may not be widened. A fifth drawn
   control is a widening, and it needs `input`'s owner rather than two UI sheets.
2. **A way back already exists on all three device classes without it**, which is what check 2
   asks for. `navigation/03`'s own close-path table lists `Pressable_INDEX` on touch, mouse and
   gamepad, and `navigation/02` puts it at `ZIndex` 20 above the open panel with
   `indexControlRemainsActivatable: true`. The control that opened it closes it, and it is
   visible while the panel is open by that sheet's own layering.
3. **Its strongest ground is answered.** *"Mobile has no platform back input"* is correct and is
   exactly why the way back must be a drawn on-screen control on every class. It already is one;
   it is the same one that opened the panel.

**What Navigation loses, stated rather than glossed:** `focus.onOpen` no longer has a node with
`SelectionOrder` 0 to hold. The cheapest replacement is no focus write on open at all, because a
gamepad player reached the panel by activating `Pressable_INDEX`, so `SelectedObject` is already
that node and `focus.onClose` wants it there anyway. `selectability.whilePanelOpen` falls from 5
to 4 and equals `whilePanelClosed`. **This closes RR-3 without `input`'s owner having to rule**,
which is the cheaper outcome. If Navigation still wants the control, it needs the pushback RR-3
asks for, and if `input`'s owner grants a fifth pressable I take the node.

**Against `cid/ui-ux/navigation/02-concurrency-and-suspension.md`,
`purchaseWhileOpen.spatialDisjointnessAlsoRequired`.** Withdraw it, and here is the arithmetic
RR-5 asked me for. The panel's reserved stack is 316 px at sheet 03's floor. Clearing a 96 px
corner cluster on a 375-point viewport leaves at most `375 - 28 - 132` = 215 px. **No scale
satisfies both**, and it is worse against the purchase column, which at `3 x 96` plus gaps spans
essentially the whole usable height of a small phone. My first draft asserted the opposite and I
have moved rather than defended it. Disjointness is not merely unsatisfiable, it is unnecessary:
`mechanism: "zOrder"` in that same object is the real guarantee and it is sufficient. Keep the
z-layers, drop the `rule` field.

## Consequences for other work

- **`ui-forge` pattern work** owns five edits in one file, listed with line numbers. Wave 5 has
  now asked this non-existent owner for ten compiler edits; the final pass should deduplicate.
- **Navigation** inherits the two reversals above and a panel that covers all four pressables.
  Movement suspension, toggle semantics, back behaviour and gamepad focus stay yours.
- **HUD (`composition`)** keeps the collection count and its `/ 24` exclusively, and inherits a
  panel that overlaps every cluster: no group may rely on being uncovered while the index is
  open, and every interactive group needs `ZIndex` 20 per `navigation/02`.
- **Platform and Input (`viewport`)** inherits 28 nodes that must fit at once with no scroll at
  `0.94 x 0.86` on every supported viewport, and the 316 px reserved stack as the figure the
  scaling curve is measured against.
- **Meta and Content (`collection`)** inherits a fit requirement, not a rename: the longest
  `relics[].name` must render inside 95 px at 14 px on a small phone. Sheet 03 states the check.
- **Art and Visuals, UI Art (wave 6)** owns panel art, radii, colour and typeface. No per-set
  colour: the four headings are drawn identically.

## Acceptance criteria

1. The built `IndexSurface` contains exactly 4 nodes matching `Group_*`, 4 matching `Heading_*`,
   4 matching `Row_*`, 24 matching `Slot_*` and 24 `TextLabel`s named `Name`; and 0 nodes named
   `Backdrop`, `Title`, `CloseButton`, `PricePill`, `Price`, `BuyButton` or `Badge`, and 0
   instances of class `ScrollingFrame`.
2. With zero Finds held, all 24 slots render, and every property of an unfound slot's subtree
   other than `Name.Text` is identical to a held slot's: same `Size`, `Position`,
   `BackgroundColor3`, `BackgroundTransparency`, `ZIndex` and corner radius.
3. With the panel open at all four `ui-forge` viewports, all four instances in
   `input.pressable.roles` are hit-testable: each has a `ZIndex` strictly greater than every
   node under `IndexSurface`, and a simulated activation on each reaches its handler.
4. `validateBrief({ pattern: "modal-grid", content: <this screen> })` returns a non-empty
   problem list including `content.title is required` and `content.items[i].price is required`
   for every item, so `compose` throws.

## Not decided here

The five surface states (sheet 02). Rendered case, the text floor, wrap behaviour and the copy
budget (sheet 03). The `FlavourLine` node (sheet 04, which amends this key's `tree`). How the
panel opens and closes, movement suspension, concurrency, z-layers and gamepad focus
(Navigation, whose two rulings above are requests against its sheets and not edits to them).
The four set labels and the 24 Find names (`collection`, `gameplay/meta`). Panel art, colour,
radii and typeface (Art and Visuals, UI Art, wave 6). The touch-target floor and the scaling
curve (Platform and Input). Whether `ui-forge` takes the five edits (`ui-forge` pattern work).
