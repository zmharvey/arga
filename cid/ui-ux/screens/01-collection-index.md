# 01 — The collection index, and the screen inventory

**Domain:** ui-ux/screens · **Category:** UI/UX · **Wave:** 5 · **Revision round 3**

## Decision

This game has **one screen, `index`**: a bottom-anchored panel at `0.94 x 0.88`, no scrim, no
title, no close control and no scroll region, holding four groups in `collection.sets` declared
order, each a heading above one row of six identical slots, plus sheet 04's `FlavourLine`. The
only mutable property is one label's `Text`. It **may intersect all four pressables**, which
stay activatable above it by z-order. `areas` and `upgrades` are absent, `shop` forbidden.
**`modal-grid` cannot compile it on five counts.**

## Why

**One screen is the compliant answer, not a thin one.** `00-CORE.md` binds the project to
*"the smallest game that still gives every creative area real work"* `[brief: binding]`
← `[you chose: R1 Q3]`, and three of `04-PRESENTATION.md`'s four table rows resolve elsewhere.

| id | status | ruling | source |
|---|---|---|---|
| `index` | **present** | the one opened surface; *"the differentiator's home"* | `04-PRESENTATION.md` `[brief: soft]`; `representation[subject=index-surface]` |
| `areas` | **absent** | the next area is enterable at the instant one completes, with no threshold, cooldown or travel; depth is taught by arrival through an opening with no label, marker or gate | `meta/04`; `onboarding/03` rank 7 |
| `upgrades` | **absent** | three readouts and three `Pressable_BUY*` are persistent HUD elements, not an opened surface | `representation[subject=pressable]`; `input.gameDrawnPressables: 4` |
| `shop` | **forbidden** | deleted by ruling R-4; no product may be named, shown or priced on any in-game surface | `products.forbidden[id=F19]`; `cid/_state.md` |

**The tree.** `representation` fixes the contents (*"four labelled groups, one per
`collection.sets` entry, each holding six slots in the declared order of that set's names"*)
and `rarity` makes the four headings the only place the find-set ladder is legible anywhere.

| node | class | parent | count | holds | why this and not another |
|---|---|---|---|---|---|
| `IndexSurface` | `Frame` | hud `ScreenGui` | 1 | four groups **and `FlavourLine`**: five children | `representation[subject=index-surface]`, created hidden by `index-screen` |
| `Group_<setId>` | `Frame` | `IndexSurface` | 4 | heading + row | grouping is what teaches sets (`onboarding/03` rank 6) |
| `Heading_<setId>` | `TextLabel` | `Group_<setId>` | 4 | `collection.sets[g].label` | the only legible find-set rank in the game (`rarity`) |
| `Row_<setId>` | `Frame` | `Group_<setId>` | 4 | six slots, one row | forced by the vertical budget below, not chosen |
| `Slot_<setId>_<i>` | `Frame` | `Row_<setId>` | 24 | one `Name` label | identical for held and unheld: same size, colour, corner, position |
| `Name` | `TextLabel` | `Slot_<setId>_<i>` | 24 | **`collection.sets[g].relics[i]`**, a bare string, or `""` | the single mutable property on the surface |
| `FlavourLine` | `TextLabel` | `IndexSurface` | 1 | one prose line, sheet 04 | the panel's fifth child |

**The routed path defect, and three more this sheet found sweeping its own citations.**
`relics[]` is an array of **bare strings**, so `collection.sets[g].relics[i].name` does not
resolve and my `Name` node cited it. Objects filed it rather than working around it, which is
the right direction; the same sweep over every path `screens` cites found three more, all of
the same class, all reading as safe because a dotted path looks resolvable whatever it points
at. **Every cross-key path this key cites is now published as `screens.citations` with a
`resolvesToday` flag**, so the next round checks it mechanically instead of by eye.

| path as written | defect | corrected |
|---|---|---|
| `collection.sets[g].relics[i].name` | `relics[]` holds bare strings; no `.name` member | `collection.sets[g].relics[i]` |
| `firstSession.withheld.collectionPanel` | `withheld` is an **array** of `{surface, ...}` rows, not a map | `firstSession.withheld[surface=collectionPanel]` |
| `discovery.record.found` | `record.fields` is an **array** of `{name, clearedBy, ...}` rows | `discovery.record.fields[name=found].clearedBy` |
| `products.F19` | `F19` is a row `id` inside `products.forbidden`, not a member of `products` | `products.forbidden[id=F19]` |
| `navigation.zOrder.layers[indexPanel]` | `layers` is an array keyed by a `layer` field | `navigation.zOrder.layers[layer=indexPanel].zIndex` |
| `representation.index-surface` | `representation` is an array of `{subject, ...}` rows | `representation[subject=index-surface]` |
| `notices.members[saveNotLoaded]` (sheet 02) | `members` is an array keyed by an `id` field | `notices.members[id=saveNotLoaded]` |

**One finding routed outward rather than fixed here:** `discovery.record.keyedBy` reads
*"the Find's name, from `collection.sets[].relics[].name"`*, which is the identical defect in
`gameplay/systems/05`'s own key. I have not edited it.

**Group order is `collection.sets` declared order, depth 1 at the top** `[cid: decided]`. Depth
is taught by arrival and by grouping, so the panel reads in the order the player met the areas.

**The reserved vertical stack is 328 px, over five children and four gaps**, at sheet 03's
14 px floor and the tokens read from `ui-forge/src/theme/generate.mjs`
`[research: ui-forge/src/theme/generate.mjs]`:

| term | derivation | px |
|---|---|---|
| 4 headings | `4 x (label 16 + 2 x space.xs 4)` | 96 |
| 4 slot rows | `4 x 26`, the minimum holding a 14 px label with `space.xs` above and below | 104 |
| **4 inter-child gaps** | `4 x space.md 12` — **five children, four gaps** | **48** |
| 1 flavour block | 2 wrapped lines at 14 px plus leading | 48 |
| panel padding | `2 x space.lg 16` | 32 |
| **total** | | **328** |

**Six across in one row is forced arithmetic, not a preference.** 328 px is 87% of a
phone-class viewport of about 375 points before anything else is placed. At 3 columns by 2 rows
the stack goes to **432 px** and fits no phone at all.

**Extent: `0.94 x 0.88`, bottom-anchored, both numbers derived rather than picked.** Height
`0.88 x 375` = 330 px against the 328 px stack. Width 0.94 gives a slot label
`(0.94 x 667 - 32) / 6 - 4` = **95 px** on a small phone, against roughly 92 px for a
12-character name at 14 px. **That 92 is my estimate and is not sourced**; the binding mechanism
is sheet 03's build-time `GetTextBoundsAsync` fit check, which fails the build if the fit size
falls below the floor. Both scales are `[playtest unknown]`, test range width 0.86 to 0.98,
height 0.80 to 0.94.

**Intersection is permitted with all four pressables.** To clear a 96 px cluster ending 124 px
from the top of a 375-point viewport the panel may be at most `375 - 28 - 132` = 215 px tall,
against a 328 px stack. **No phone viewport admits a panel that both fits its contents and
clears any cluster**, and the same arithmetic disposes of disjointness against the purchase
column.

> **Why the exit is reachable, in one line:** `Pressable_INDEX` is reachable **not by clearance,
> which this sheet disproved, but by z-order** — `navigation.zOrder.layers[layer=indexPanel]` is
> 10 and `[layer=gameDrawnPressables]` is 20, with
> `navigation.purchaseWhileOpen.indexControlRemainsActivatable: true`, and `IndexSurface.Active`
> absorbs presses inside its own bounds only, so the button is hit-tested first.

**Occlusion is the residual cost and it is real**: the button may sit over panel content and
must stay legible against `surface.base`, which is UI Art's contrast problem, not a
reachability one.

**No scrim.** `modal-grid`'s root is a full-viewport `Backdrop` at `surface.overlay`
transparency 0.45 (`modal-grid.mjs:400-407`). A scrim dims and absorbs presses across the whole
screen, which takes the four pressables with it, including the exit.

**No title.** A title is a string with no contract path, rendered at `heading` 30 px, restating
what the button that opened it already means, against sheet 03's copy budget and a binding
smallest-game rule. The four set headings already label everything on the surface.

**No scroll region.** A scrolled panel puts a slot the player just filled off screen with no cue
that it exists, and `firstSession.suppressionForbidden` bans reflow. All 29 nodes are visible at
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
| price, currency figure, product name, buy control, `PricePill` | 0 | `products.forbidden[id=F19]`; `tone/04` `D8` |
| rarity colour, frame, glow, border, sparkle, badge, ribbon, pill | 0 | `rarity.forbidden`; `cardBadge` stays `none` |
| per-set colour, per-set font, per-set size | 0 | `rarity.ladders[find-set].perObjectVisualGrade` is false |
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

**The producibility finding.** `validateBrief` rejects anything outside a pattern's declared
space (`index.mjs:44-76`), so this is a compiler refusal. **All five counts stood at
verification rounds 1 and 2; count 5 is the verifier's, not mine.**

| # | count | evidence | smallest change |
|---|---|---|---|
| 1 | **No per-group container at any `columns` value.** `modalGrid()` chunks one flat `content.items` list into `Row_<n>` frames; group membership is not expressible, and `columns` clamps to 1 to 4 against a six-slot group | `modal-grid.mjs:322, 326-348`; `meta.variant.columns` at `:447` | in `modalGrid()`: when `content.groups` (`{ id, heading, items }[]`) is present, emit one `Group_<id>` Frame per entry holding a `Heading_<id>` `TextLabel` and that group's own rows, instead of `chunk(items, columns)`. Add `Group_*`, `Heading_*` to `meta.nodes` |
| 2 | **The four set headings have nowhere to live.** `meta.slots` is exactly `panelTop` and `panelBottom`, both panel-level; there is no node between rows | `modal-grid.mjs:459` | closed by change 1 |
| 3 | **`validateContent` requires `name`, `price` and `art` on every item.** An unfound slot has no name and no art, and a price here is banned outright | `modal-grid.mjs:475-487`; `products.forbidden[id=F19]`; `tone/04` `D8` | in `meta.validateContent`: require `price` and `art` only when `brief.variant.ctaPlacement === 'per-item'`; require `content.title` only when `headerStyle !== 'none'`, and add `'none'` to `meta.variant.headerStyle` |
| 4 | **The root is an unconditional full-viewport scrim** that would dim and absorb presses over the four pressables | `modal-grid.mjs:400-407` | add `scrim: ['dim', 'none']` to `meta.variant` and gate the `Backdrop` on it |
| 5 | **The rows are emitted inside an unconditional `ScrollingFrame` named `Grid`**, height-capped at 196 px on mobile, which this sheet forbids by name and tests for | `modal-grid.mjs:354-368`; added by verification round 1 | add `scroll: ['y', 'none']` to `meta.variant` and emit a plain `Frame` at `'none'` |

Five edits, one file, two functions: `modalGrid` and `meta.validateContent`. Until they land,
`index-screen` builds the surface by hand `[research: game/src/client/IndexScreen.luau]`.

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
        "childCount": 5,
        "children": ["Group_<setId> x 4", "FlavourLine"],
        "zIndexEveryNode": 10,
        "exitReachability": {
          "exit": "Pressable_INDEX",
          "mechanism": "zOrder",
          "notByClearance": "this sheet disproved clearance at any scale that fits the stack",
          "argument": "navigation.zOrder.layers[layer=gameDrawnPressables].zIndex 20 sits above navigation.zOrder.layers[layer=indexPanel].zIndex 10, with navigation.purchaseWhileOpen.indexControlRemainsActivatable true, and IndexSurface.Active absorbs presses inside its own bounds only, so the button is hit-tested first",
          "residualCost": "occlusion: the button may sit over panel content and must stay legible against surface.base, which is UI Art's contrast problem, not a reachability one"
        },
        "geometry": {
          "anchorPoint": [0.5, 1],
          "positionScale": [0.5, 1],
          "positionOffsetPx": [0, -28],
          "sizeScale": [0.94, 0.88],
          "maxWidthToken": "sizing.panelMaxWidth",
          "mustNotIntersect": [],
          "mayIntersect": ["Pressable_INDEX", "Pressable_BUY1", "Pressable_BUY2", "Pressable_BUY3"],
          "reachabilityMechanism": "zOrder, not disjointness",
          "disjointnessImpossibleBecause": "the reserved stack is 328px; clearing a 96px cluster on a 375-point viewport allows at most 215px of panel",
          "reservedStackPx": {
            "headings": 96, "slotRows": 104, "interChildGaps": 48,
            "interChildGapCount": 4, "childCount": 5,
            "flavourBlock": 48, "panelPadding": 32, "total": 328
          },
          "realisedPanelHeightPxAt375": 330,
          "slotLabelWidthPxAt667Wide": 95,
          "slotLabelWidthRequiredPxEstimate": 92,
          "slotLabelWidthEstimateIsNotSourced": true,
          "bindingFitMechanism": "screens.textPolicy build-time GetTextBoundsAsync check",
          "playtestUnknown": ["sizeScale"],
          "testRange": { "widthScale": [0.86, 0.98], "heightScale": [0.80, 0.94] }
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
          { "node": "Name", "class": "TextLabel", "parent": "Slot_<setId>_<i>", "count": 24, "textFrom": "collection.sets[g].relics[i]", "textFromNote": "a bare string today; becomes .name only if screens/04 RR-1 is accepted", "typeRole": "set by screens.textPolicy", "color": "content.primary", "align": "center" }
        ],
        "mutableProperties": ["Slot_<setId>_<i>/Name.Text"],
        "ownStrings": [],
        "stringSources": ["collection.sets[].label", "collection.sets[].relics[]"],
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
      { "id": "upgrades", "status": "absent", "reason": "three readouts and three purchase pressables are persistent HUD elements, not an opened surface", "citation": "representation[subject=pressable]; input.gameDrawnPressables 4" },
      { "id": "shop", "status": "forbidden", "reason": "ruling R-4 removed the in-game store; no product may be named, shown or priced on any in-game surface", "citation": "products.forbidden[id=F19]; cid/_state.md R-4" }
    ],
    "citations": {
      "sweptInRound": 3,
      "rule": "every path screens cites into another key, with the shape it resolves against. resolvesToday false is legal only where the row names the revision that creates it",
      "contractPaths": [
        { "path": "collection.sets", "key": "collection", "resolvesToday": true },
        { "path": "collection.sets[].label", "key": "collection", "resolvesToday": true },
        { "path": "collection.sets[g].relics[i]", "key": "collection", "resolvesToday": true, "correctedFrom": "collection.sets[g].relics[i].name", "foundBy": "art/objects RQ2" },
        { "path": "collection.sets[].relics[].flavour", "key": "collection", "resolvesToday": false, "createdBy": "screens/04 RR-1, not yet accepted" },
        { "path": "input.gameDrawnPressables", "key": "input", "resolvesToday": true },
        { "path": "input.pressable.roles[].count", "key": "input", "resolvesToday": true, "note": "two rows, counts 3 and 1, summing to 4" },
        { "path": "input.pressable.rejectionCueOnFailedPrecondition", "key": "input", "resolvesToday": true },
        { "path": "input.pressable.indexScreenSuspendsMovement", "key": "input", "resolvesToday": true },
        { "path": "firstSession.withheld[surface=collectionPanel]", "key": "firstSession", "resolvesToday": true, "correctedFrom": "firstSession.withheld.collectionPanel", "note": "withheld is an array of rows, not a map" },
        { "path": "firstSession.suppressionForbidden", "key": "firstSession", "resolvesToday": true },
        { "path": "discovery.record.fields[name=found].clearedBy", "key": "discovery", "resolvesToday": true, "correctedFrom": "discovery.record.found", "note": "fields is an array of rows, not a map" },
        { "path": "discovery.record.forbiddenFields", "key": "discovery", "resolvesToday": true },
        { "path": "rarity.forbidden", "key": "rarity", "resolvesToday": true },
        { "path": "rarity.ladders[find-set].perObjectVisualGrade", "key": "rarity", "resolvesToday": true },
        { "path": "products.forbidden[id=F19]", "key": "products", "resolvesToday": true, "correctedFrom": "products.F19", "note": "F19 is a row id inside products.forbidden" },
        { "path": "vocabulary.casing", "key": "vocabulary", "resolvesToday": true },
        { "path": "vocabulary.allowedPattern", "key": "vocabulary", "resolvesToday": true },
        { "path": "vocabulary.maxLabelChars", "key": "vocabulary", "resolvesToday": true },
        { "path": "navigation.zOrder.layers[layer=indexPanel].zIndex", "key": "navigation", "resolvesToday": true, "correctedFrom": "navigation.zOrder.layers[indexPanel]" },
        { "path": "navigation.purchaseWhileOpen.indexControlRemainsActivatable", "key": "navigation", "resolvesToday": true },
        { "path": "notices.members[id=saveNotLoaded]", "key": "notices", "resolvesToday": true, "correctedFrom": "notices.members[saveNotLoaded]" },
        { "path": "notices.members[].text", "key": "notices", "resolvesToday": true },
        { "path": "representation[subject=index-surface]", "key": "representation", "resolvesToday": true, "correctedFrom": "representation.index-surface", "note": "representation is an array of subject rows" },
        { "path": "representation[subject=pressable]", "key": "representation", "resolvesToday": true },
        { "path": "wiring.onClientBoot", "key": "wiring", "resolvesToday": true }
      ],
      "themeTokens": {
        "source": "ui-forge/src/theme/generate.mjs, not a contract key",
        "used": ["sizing.panelMaxWidth", "surface.base", "surface.sunken", "surface.overlay", "radius.lg", "radius.sm", "space.lg", "space.md", "space.xs", "content.primary", "content.secondary", "type.label", "type.caption"]
      },
      "routedOutward": [
        { "to": "gameplay/systems/05", "path": "discovery.record.keyedBy", "problem": "reads 'the Find's name, from collection.sets[].relics[].name'; the same unresolvable path, in that key's own value", "action": "filed, not edited" }
      ]
    },
    "patternFindings": [
      { "pattern": "modal-grid", "verdict": "cannot produce screens[index]", "asOf": "verification round 2", "counts": [
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

**Against `cid/ui-ux/navigation/03-close-and-focus-by-device.md`, `closeControl`.** I refuse the
node, and the refusal survives the withdrawal of my clearance guarantee.
`input.gameDrawnPressables: 4` is an approved key and R-1 contained the input overrule to
*"one input class, two verbs, four controls"*; a way back exists on all three device classes by
the z-order argument boxed above rather than the clearance one I withdrew; and *"mobile has no
platform back input"* is exactly why the exit must be a drawn control, which it already is.
Navigation loses its `SelectionOrder` 0 focus target, and the replacement is no focus write on
open, because a gamepad player arrived by activating `Pressable_INDEX`. If `input`'s owner
grants a fifth pressable, I take the node.

**Against `cid/ui-ux/navigation/02-concurrency-and-suspension.md`,
`purchaseWhileOpen.spatialDisjointnessAlsoRequired`.** Withdrawn in round 1, restated here with
the corrected figure: the stack is 328 px, clearing a 96 px cluster leaves at most 215 px, and
no scale satisfies both. `mechanism: "zOrder"` in that same object is the real guarantee.

## Consequences for other work

- **Meta and Content (`collection`)** owns two things now: `relics[]` entries are bare strings
  and every consumer must read them as such until `screens/04` `RR-1` is accepted, and the
  longest name must render inside 95 px at 14 px on a small phone.
- **Systems (`discovery`)** inherits one routed path defect in its own key,
  `discovery.record.keyedBy`, filed above and not edited by me.
- **Navigation** inherits the boxed reachability argument and is asked to state its half: the
  exit survives on z-order plus `indexControlRemainsActivatable`, not on clearance.
- **`ui-forge` pattern work** owns five edits in one file, listed with line numbers.
- **HUD (`composition`)** keeps the collection count and its `/ 24` exclusively, and inherits a
  panel that overlaps every cluster: every interactive group needs `ZIndex` 20.
- **Platform and Input (`viewport`)** inherits 29 nodes that must fit at once with no scroll at
  `0.94 x 0.88`, and the 328 px stack as the figure the scaling curve is measured against.
- **Art and Visuals, UI Art (wave 6)** owns panel art, radii, colour and typeface, and inherits
  one obligation: `Pressable_INDEX` sits over `surface.base` while the panel is open and must
  stay legible there. No per-set colour: the four headings are drawn identically.

## Acceptance criteria

1. The built `IndexSurface` has exactly 5 children (4 matching `Group_*`, 1 named `FlavourLine`)
   and contains 4 nodes matching `Heading_*`, 4 matching `Row_*`, 24 matching `Slot_*` and 24
   `TextLabel`s named `Name`; and 0 nodes named `Backdrop`, `Title`, `CloseButton`, `PricePill`,
   `Price`, `BuyButton` or `Badge`, and 0 instances of class `ScrollingFrame`.
2. At every `ui-forge` viewport the sum of the five children's heights plus 4 gaps plus padding
   is less than or equal to `IndexSurface.AbsoluteSize.Y`, so no child is clipped and no scroll
   is needed.
3. With the panel open at all four viewports, all four instances in `input.pressable.roles` are
   hit-testable: each has a `ZIndex` strictly greater than every node under `IndexSurface`, and
   a simulated activation on each reaches its handler.
4. Every path in `screens.citations.contractPaths` resolves against its owning key's merged
   shape; the count with `resolvesToday: false` is 1, and that row names `screens/04` `RR-1` as
   what creates it.

## Not decided here

The six surface states (sheet 02). Rendered case, the text floor, wrap behaviour and the copy
budget (sheet 03). What `FlavourLine` holds, and the `collection` revision that would give
`relics[]` a `.name` and a `.flavour` (sheet 04). How the panel opens and closes, movement
suspension, concurrency, z-layers and gamepad focus (Navigation). The four set labels and the 24
Find names (`collection`, `gameplay/meta`). Whether `discovery.record.keyedBy` is corrected
(`gameplay/systems/05`, routed above). Panel art, colour, radii, typeface and the exit button's
contrast over `surface.base` (Art and Visuals, UI Art, wave 6). The touch-target floor and the
scaling curve (Platform and Input). Whether `ui-forge` takes the five edits.
