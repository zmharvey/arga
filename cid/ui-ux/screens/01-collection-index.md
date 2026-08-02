# 01 — The collection index, and the screen inventory

**Domain:** ui-ux/screens · **Category:** UI/UX · **Wave:** 5

## Decision

This game has **one screen, `index`**: a bottom-anchored panel with no scrim, no title, no
close control and no scroll region, holding four groups in `collection.sets` declared order,
each a heading above one row of six identical slots. The only mutable property on the whole
surface is one label's `Text`. `areas` and `upgrades` are recorded absent, `shop` forbidden.
**`modal-grid` cannot compile this surface on four counts**, and `validateBrief` refuses a
brief that asks it to rather than degrading to something near it.

## Why

**One screen is the compliant answer, not a thin one.** `00-CORE.md` binds the project to
*"the smallest game that still gives every creative area real work"* `[brief: binding]`
← `[you chose: R1 Q3]`, and three of `04-PRESENTATION.md`'s four table rows resolve to other
owners or to nothing. The table is untagged and partly false, which my lead recorded as G3.

**The inventory, ruled rather than skipped.**

| id | status | ruling | source |
|---|---|---|---|
| `index` | **present** | the one opened surface; *"the differentiator's home"* | `04-PRESENTATION.md` `[brief: soft]`; `representation.index-surface` |
| `areas` | **absent** | the next area is enterable at the instant one completes, with no threshold, cooldown or travel; depth is taught by arrival through an opening with no label, marker or gate. Nothing to navigate, so nothing to draw | `meta/04`; `onboarding/03` rank 7 |
| `upgrades` | **absent** | three readouts and three `Pressable_BUY*` are persistent HUD elements, not an opened surface | `representation.pressable`; `input.gameDrawnPressables: 4` |
| `shop` | **forbidden** | deleted by ruling R-4; no product may be named, shown or priced on any in-game surface | `products.F19`; `cid/_state.md` |

Recording the three is the point: *"naming one of these in order to forbid it is compliant.
Leaving a gap where one would go is not"* (`cid/ui-ux/_category.md`).

**The tree.** `representation` fixes the contents (*"four labelled groups, one per
`collection.sets` entry, each holding six slots in the declared order of that set's names"*)
and `rarity` makes the four headings the only place the find-set ladder is legible anywhere.
What was unstated is everything below.

| node | class | parent | count | holds | why this and not another |
|---|---|---|---|---|---|
| `IndexSurface` | `Frame` | hud `ScreenGui` | 1 | the four groups | `representation.index-surface`, created hidden by `index-screen` |
| `Group_<setId>` | `Frame` | `IndexSurface` | 4 | heading + row | grouping is what teaches sets (`onboarding/03` rank 6) |
| `Heading_<setId>` | `TextLabel` | `Group_<setId>` | 4 | `collection.sets[g].label` | the only legible find-set rank in the game (`rarity`) |
| `Row_<setId>` | `Frame` | `Group_<setId>` | 4 | six slots, one row | six across beats 3x2: vertical space is the binding budget at 4 groups |
| `Slot_<setId>_<i>` | `Frame` | `Row_<setId>` | 24 | one `Name` label | identical for held and unheld: same size, colour, corner, position |
| `Name` | `TextLabel` | `Slot_<setId>_<i>` | 24 | the Find name, or `""` | the single mutable property on the surface |

**Group order is `collection.sets` declared order, depth 1 at the top.** Depth is taught by
arrival and by grouping, so the reading order of the panel is the order the player met the
areas `[cid: decided]`. Any other order would need a rank the panel is forbidden to draw.

**Slot count per row is 6, in one row, and the number is not free.** Four groups stacked in
0.72 of viewport height give each group a heading plus one row; at 3x2 the same budget gives
each row roughly half the height, which collides with sheet 03's 14 px floor before it
collides with anything else. Width is the softer constraint because a Find name is one word
of at most 12 characters (`theme/vocabulary/01`).

**Geometry: bottom-anchored, not centred, and that is the one geometric guarantee I make.**
`AnchorPoint (0.5, 1)` at `(0.5, 0, 1, -28)` with size `(0.84, 0, 0.72, 0)` puts the panel's
top edge at 28% of viewport height, which leaves the top-left cluster holding
`Pressable_INDEX` uncovered on every viewport. The shipped centred `0.5, 0.5` at 0.9 width
does not `[research: game/src/client/IndexScreen.luau]`. The panel **may** cover the three
purchase pressables: `core-loop/01` forbids *travel* to a purchase, and a mode the player
opened with one press and closes with one press is not travel. `zIndex` 10 on every node.
Both scales are `[playtest unknown]`, test range width 0.72 to 0.94, height 0.60 to 0.80,
settled by one `npm run render` at phone viewport.

**No scrim.** `modal-grid`'s root is a full-viewport `Backdrop` at `surface.overlay`,
transparency 0.45 (`modal-grid.mjs:400-407`). A scrim dims and absorbs presses across the
whole screen, which would take the four pressables with it. The shipped `frame.Active = true`
absorbs presses inside the panel's own bounds only, and that is correct and kept.

**No title.** A title is a string with no contract path, rendered at `heading` 30 px
`[research: ui-forge/src/theme/generate.mjs]`, restating what the button that opened it
already means, against a copy budget sheet 03 sets and a binding smallest-game rule. The four
set headings already label everything on the surface.

**No close control.** `input.gameDrawnPressables` is 4 and the list is closed
(`mechanics/02`: *"five verbs and there is no sixth"*). A `CloseButton` would be a fifth
game-drawn pressable. Closing is the index pressable's second press, which is Navigation's
mechanism and not my node.

**No scroll region.** A scrolled panel puts a slot the player just filled off screen with no
cue that it exists, and `firstSession.suppressionForbidden` bans reflow. All 28 nodes are
visible at once at the default text size; sheet 03 owns what happens when the player raises
`GuiService.PreferredTextSize`.

**What is not on this surface.** Each row is countable and each cites the ruling that closes it.

| absent | count | ruling |
|---|---|---|
| `Backdrop`, scrim, dim layer, vignette | 0 | this sheet; it would swallow the four pressables |
| `Title`, screen name, subtitle | 0 | this sheet; copy budget, sheet 03 |
| `CloseButton`, X glyph, back arrow, tab bar | 0 | `input.gameDrawnPressables: 4` |
| `ScrollingFrame`, scrollbar, pagination, arrows | 0 | this sheet |
| padlock, lock glyph, greyed or dimmed slot, question-mark placeholder | 0 | `firstSession.suppressionForbidden`; `tone/04` `D8` |
| silhouette, blurred model, greyed name, pre-reveal flavour line | 0 | `tone/04` `D11` |
| price, currency figure, product name, buy control, `PricePill` | 0 | `products.F19`; `tone/04` `D8` |
| rarity colour, frame, glow, border, sparkle, badge, ribbon, pill | 0 | `rarity.forbidden`; `modal-grid`'s `cardBadge` stays `none` |
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

**The producibility finding, stated against the files as read this run.** Two documents assert
the opposite and both are wrong: `04-PRESENTATION.md`'s *"`collection-index` ... fit[s] that
shape well"* and my own category brief's *"four groups of six against `columns: [1,2,3,4]` is
inside the parameter space"*. `validateBrief` rejects anything outside a pattern's declared
space (`index.mjs:44-76`), so this is a compiler refusal, not a default or a reviewer's taste.

| # | count | evidence | smallest change |
|---|---|---|---|
| 1 | **No per-group container at any `columns` value.** `modalGrid()` chunks one flat `content.items` list into `Row_<n>` frames; group membership is not expressible, and `columns` caps at 4 against a six-slot group | `modal-grid.mjs:322, 326-348`; `meta.variant.columns = [1,2,3,4]` at `:447` | in `modalGrid()`: when `content.groups` (an array of `{ id, heading, items }`) is present, emit one `Group_<id>` Frame per entry holding a `Heading_<id>` `TextLabel` and that group's own rows, instead of `chunk(items, columns)`. Add `Group_*` and `Heading_*` to `meta.nodes` |
| 2 | **The four set headings have nowhere to live.** `meta.slots` is exactly `panelTop` and `panelBottom`, both panel-level; there is no node between rows | `modal-grid.mjs:459` | closed by change 1; no separate edit |
| 3 | **`validateContent` requires `name`, `price` and `art` on every item.** An unfound slot has no name and no art, and a price on this surface is banned outright | `modal-grid.mjs:475-487`; `products.F19`; `tone/04` `D8` | in `meta.validateContent`: require `price` and `art` only when `brief.variant.ctaPlacement === 'per-item'`; require `content.title` only when `headerStyle !== 'none'`, and add `'none'` to `meta.variant.headerStyle` |
| 4 | **The root is an unconditional full-viewport scrim** that would dim and absorb presses over the four pressables | `modal-grid.mjs:400-407` | add `scrim: ['dim', 'none']` to `meta.variant` and gate the `Backdrop` on it |

Four edits, all in `ui-forge/src/compose/patterns/modal-grid.mjs`, two functions: `modalGrid`
and `meta.validateContent`. Until they land, `index-screen` builds the surface by hand, which
is what it already does and says so `[research: game/src/client/IndexScreen.luau]`. **This
finding is as of the files read on 2026-08-01 and is meant to be re-checked, not inherited.**

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
        "producibleBy": null,
        "refusedBy": "modal-grid",
        "hasScrim": false,
        "hasTitle": false,
        "hasCloseControl": false,
        "hasScrollRegion": false,
        "zIndexEveryNode": 10,
        "geometry": {
          "anchorPoint": [0.5, 1],
          "positionScale": [0.5, 1],
          "positionOffsetPx": [0, -28],
          "sizeScale": [0.84, 0.72],
          "maxWidthToken": "sizing.panelMaxWidth",
          "mustNotIntersect": ["Pressable_INDEX"],
          "mayIntersect": ["Pressable_BUY1", "Pressable_BUY2", "Pressable_BUY3"],
          "playtestUnknown": ["sizeScale"],
          "testRange": { "widthScale": [0.72, 0.94], "heightScale": [0.6, 0.8] }
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
      { "pattern": "modal-grid", "verdict": "cannot produce screens[index]", "asOf": "2026-08-01", "counts": [
        { "id": "P1", "problem": "no per-group container; modalGrid chunks one flat item list and columns caps at 4 against a six-slot group", "evidence": "ui-forge/src/compose/patterns/modal-grid.mjs:322,326-348,447", "fix": "modalGrid(): emit one Group_<id> per content.groups entry with its own Heading_<id> and rows; add Group_*, Heading_* to meta.nodes" },
        { "id": "P2", "problem": "meta.slots is exactly panelTop and panelBottom, so four set headings have nowhere to live", "evidence": "ui-forge/src/compose/patterns/modal-grid.mjs:459", "fix": "closed by P1" },
        { "id": "P3", "problem": "validateContent requires name, price and art on every item; an unfound slot has none and a price here is banned", "evidence": "ui-forge/src/compose/patterns/modal-grid.mjs:475-487", "fix": "meta.validateContent(): require price and art only when variant.ctaPlacement is per-item; require content.title only when headerStyle is not none; add none to meta.variant.headerStyle" },
        { "id": "P4", "problem": "the root is an unconditional full-viewport scrim that would dim and absorb presses over the four pressables", "evidence": "ui-forge/src/compose/patterns/modal-grid.mjs:400-407", "fix": "add scrim: ['dim','none'] to meta.variant and gate the Backdrop on it" }
      ] }
    ]
  }
}
```

## Consequences for other work

- **`ui-forge` pattern work** owns four edits in one file and two functions, listed above with
  line numbers. This is the third `ui-forge` change wave 5 has asked for and the first that is
  a capability rather than a default: `hud-overlay`'s pressable readout and conditional
  presence are defaults, a rejected brief is a refusal.
- **HUD (`composition`)** keeps the collection count and its `/ 24` exclusively. The index
  panel carries no count and no denominator, so the denominator rule is got right once.
  You also inherit a geometric requirement: `Pressable_INDEX` must sit in the top-left cluster,
  because that is the cluster my panel is shaped to leave uncovered.
- **Navigation** inherits an extent, not a ruling: the panel covers the three purchase
  pressables while open and leaves the index pressable clear. Whether a purchase press may
  land while it is open, and what "back" means per device, are yours.
- **Platform and Input (`viewport`)** inherits 28 nodes that must all fit at once with no
  scroll at the default text size, at 0.84 by 0.72 of every supported viewport, and a
  non-intersection rule against one cluster.
- **Meta and Content (`collection`)** inherits a fit requirement, not a rename: every
  `relics[].name` must render inside one sixth of the panel's inner width at sheet 03's floor.
  Sheet 03 states the check and the failure route.
- **Art and Visuals, UI Art (wave 6)** owns panel art, corner radii tokens, colour and the
  typeface. You may not add a per-set colour: four headings are drawn identically.
- **Analytics (Funnels)** gets one instrument worth having and no more: whether the surface
  was ever opened in a session in which a Find was revealed.

## Acceptance criteria

1. The built `IndexSurface` contains exactly 4 nodes matching `Group_*`, 4 matching
   `Heading_*`, 4 matching `Row_*`, 24 matching `Slot_*` and 24 `TextLabel`s named `Name`;
   and 0 nodes named `Backdrop`, `Title`, `CloseButton`, `PricePill`, `Price`, `BuyButton` or
   `Badge`, and 0 instances of class `ScrollingFrame`.
2. With zero Finds held, all 24 slots render, and every property of an unfound slot's subtree
   other than `Name.Text` is byte-identical to a held slot's: same `Size`, `Position`,
   `BackgroundColor3`, `BackgroundTransparency`, `ZIndex` and corner radius.
3. `IndexSurface.AbsolutePosition`/`AbsoluteSize` does not intersect
   `Pressable_INDEX.AbsolutePosition`/`AbsoluteSize` at all four `ui-forge` viewports.
4. `validateBrief({ pattern: "modal-grid", content: <this screen> })` returns a non-empty
   problem list including `content.title is required` and
   `content.items[i].price is required` for every item, so `compose` throws.

## Not decided here

What each of the five surface states shows and the system copy for a save-load failure
(sheet 02). Rendered case, the minimum rendered text size, wrap behaviour and the copy budget
(sheet 03). Whether a `FlavourLine` node exists at the foot of the panel and what it holds
(sheet 04, which amends this key's `tree`). How the panel opens and closes, whether a purchase
press may land while it is open, and gamepad focus handoff (Navigation). The four set labels
and the 24 Find names (`collection`, `gameplay/meta`). Panel art, colour, radii and the
typeface (Art and Visuals, UI Art, wave 6). The touch-target floor and the scaling curve
(Platform and Input). Whether `ui-forge` actually takes the four edits (`ui-forge` pattern
work; if it declines, `index-screen` keeps building this surface by hand).
