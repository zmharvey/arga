# 01 — Device and viewport rules

**Domain:** ui-ux/platform · **Category:** UI/UX · **Wave:** 5

## Decision

Four device classes — `phone`, `tablet`, `desktop`, `console` — identified by **capability then
short-axis pixels**, on the platform's own `minAxis <= 500` predicate, so the class boundary and
the touch-target floor are one derivation and not two. The game runs **landscape**; portrait is
a legal fallback, not a supported orientation. The one HUD `ScreenGui` carries
`ScreenInsets = CoreUISafeInsets` and `IgnoreGuiInset = false`. **Gamepad focus is an explicit
cyclic link graph over the four interactive groups' `controlNode`s, built from `Selectable`,
`SelectionOrder` and `NextSelection*` alone — no `SelectionGroup`, no common parent node, no new
`ui-forge` node.**

**The project's largest known gap is still open, and this sheet is what closes it.** `CLAUDE.md`
records the mobile purchase path as the biggest remaining item and R-1 made `buy` a pressable to
close it. It does not work today, on three counts, all arithmetic:

| # | the failure, at shipped values | where |
|---|---|---|
| 1 | The floor is wrong on both touch classes. `MIN_TOUCH_TARGET_PX = 96` is **above** the phone floor of 70 and **below** the tablet floor of 120 | `Pressables.luau:116`, applied at `:433` |
| 2 | The topmost purchase button computes to `414 − (90 + 24 + 2×108 + 96) = −12 px` on an 896×414 phone — off-screen, before the top-bar inset `init.client.luau:220-223` never disables | `Pressables.luau:500-519`, `:395-396` |
| 3 | `hud-overlay`'s own button is hard-sized 52×52 (56×56 mobile), so a tablet resolves to the `tablet` breakpoint, takes the base 52, and stands at 52 against a 120 floor | `hud-overlay.mjs:178-198` |

At the floor derived below the same column computes to a top edge of **+66 px** and fits, with
about 30 px of headroom above the inset. **The defect is the floor, not the layout.**

## Why

**The class boundary and the touch floor are the same number, so only one of them can be
wrong.** The platform computes `minAxis = min(parent.AbsoluteSize.X, parent.AbsoluteSize.Y)`,
`isSmallScreen = minAxis <= 500`, `jumpButtonSize = isSmallScreen and 70 or 120`
`[research: https://github.com/Roblox/Core-Scripts/blob/master/PlayerScripts/StarterPlayerScripts_NewStructure/RobloxPlayerScript/ControlScript/TouchJump.lua]`.
Classifying on that predicate makes a class's floor exactly the button the platform will draw.
`input.pressable.minTouchTargetRule` names a measurement, `[brief: binding]` in effect via R-1,
and `measurePlatformControls` already reads the live button
`[research: game/src/client/Pressables.luau]` — so **70 and 120 are the fallback and the check,
never the runtime value.** Core-Scripts is the legacy mirror, not the running engine.
`[research owed: PlayerGui.TouchGui.TouchControlFrame.JumpButton.AbsoluteSize in Studio on an emulated phone and an emulated tablet]`

**Pixel-width breakpoints are the wrong instrument, and are what ships.** `BREAKPOINTS` is
`mobile ≤1000` / `tablet ≤1500` on `Camera.ViewportSize.X` alone
`[research: ui-forge/src/emit/runtime/UIBuilder.luau:20,94]`, so a portrait tablet (820 wide)
resolves to `mobile`, a 1920-wide television resolves to `desktop`, and there is no fourth class
for console. Short axis plus capability fixes all three in one function. `mechanics/03` P4 bans
a device read that changes *which verbs exist* and permits one that *"only sizes or positions an
affordance"*, which is what this is.

**Orientation was unstated anywhere in the brief and changes the answer completely.** The
dynamic thumbstick captures **left 40% × bottom two-thirds** in landscape and **full width ×
bottom 40%** in portrait
`[research: https://github.com/Roblox/Core-Scripts/blob/master/PlayerScripts/StarterPlayerScripts/ControlScript/MasterControl/DynamicThumbstick.lua]`,
and the legacy `Thumbstick`, `DPad` and `Thumbpad` modes are gone, so that is the region that
actually exists `[research: https://devforum.roblox.com/t/psa-removing-legacy-touch-controls/361681]`.
Portrait swallows the whole bottom band and both bottom clusters with it. I rule landscape
`[cid: decided]`: it is what `ui-forge` calibrates against (`cli.mjs:42-46`) and the orientation
in which the right half is free. Portrait keepouts ship anyway, because a client that refuses
the request needs a legal layout rather than none — and portrait is in fact more generous
vertically (537 px of free band against a 234 px column) and worse horizontally.
`[research owed: Enum.ScreenOrientation's members, and whether LandscapeSensor is honoured on tablets]`

**The safe area needs an instrument and one exists.** `CoreUISafeInsets` keeps descendants clear
of the Roblox top bar and of device cutouts, and inset values *"only take effect on ScreenGuis
that have their `IgnoreGuiInset` property set to false"*
`[research: https://create.roblox.com/docs/reference/engine/enums/ScreenInsets]`
`[research: https://create.roblox.com/docs/reference/engine/classes/GuiService]`.
`init.client.luau:220-223` sets neither while `docs/hand-written-control/init.client.luau:37`
sets `IgnoreGuiInset = true`: the build and its control diverge and no sheet decided it. Once
the engine supplies the inset, `ANCHOR_INSET` (`base: 8`, `mobile: 28`) double-counts, so
`anchor: "edge"` is the only legal variant here
`[research: ui-forge/src/compose/patterns/hud-overlay.mjs:38-41]`.

**The persistent surface gets a budget, not a layout** — the column's own arithmetic at the
floor plus margin, 258 px of 414, rounded up to a ceiling `composition` spends. It is not a size
and may never be assigned as one, which is sheet `02`.

**Nothing rests on the 70/25/5 split.** It is `[brief: soft]` and uncorroborated; every rule
here is per class and none is weighted by share. The *band* — *"8–14, mobile-heavy, short
sessions"* `[brief: binding]` (`00-CORE.md`) — is what the floors serve.
`[research owed: the experience's own Creator Dashboard platform breakdown, which cannot exist before launch]`
Roblox publishes no minimum touch-target figure: `adaptive-design` and `console-guidelines`
carry principles only `[research: https://create.roblox.com/docs/production/publishing/adaptive-design]`
`[research: https://create.roblox.com/docs/production/publishing/console-guidelines]`. That is
why the rule names a measurement, and why the two classes with nothing to measure need the
ruling below rather than a figure I would have invented.

**Focus is built only from properties the reference documents.** `Selectable`, `SelectionOrder`
and `NextSelectionUp/Down/Left/Right` are all confirmed `GuiObject` members
`[research: https://create.roblox.com/docs/reference/engine/classes/GuiObject]`. `SelectionGroup`
is **not** on that page — it appears only in a release thread
`[research: https://devforum.roblox.com/t/new-gamepad-ui-selection-apis/1791278]` — and
`GuiService:AddSelectionParent` is deprecated
`[research: https://create.roblox.com/docs/reference/engine/classes/GuiService/AddSelectionParent]`.
Building the contract from the documented three costs nothing and removes an `[unverified]`
dependency from the one path a console player has to spend currency. **Explicit links also beat
a group on the merits here:** the four controls sit in two opposite corners, so any spatial
fallback is guesswork, while an explicit chain is deterministic wherever `composition` puts them.

**The order is `10 × groupIndex` over the interactive groups alone, and there is no second
term.** `composition` makes `interactive` a property of a **group**, `groups[].members` an array
of element **id strings**, and the per-element index `elements[].memberIndexWithinGroup`
`[research: cid/ui-ux/hud/01-persistent-surface-composition.md]`. Over the four interactive
groups `groupIndex` is **1, 4, 5, 6**, so `10 × groupIndex` gives **10 / 40 / 50 / 60** — total
and tie-free. A second term is not merely redundant, it is unsatisfiable: the collection control
is a group's `controlNode` and not an element, so it has no member index at all, and a two-term
rule would yield three positions and leave the collection control out of the cycle entirely.
**The selectable Instance is `groups[].controlNode`, never `groups[].node`.**

**The `1`/`2`/`3` accelerator is rendered on no class.** `keyboardAcceleratorAllowed` is `true`,
`keyboardAcceleratorRequired` is `false`; I decline the allowance `[cid: decided]`. A digit glyph
is an instruction, which `onboarding/03` `T5`/`T6` ban, and it advertises a path R-1 removed.

```manifest
{
  "provides": "viewport",
  "status": "proposed",
  "value": {
    "citeAs": {
      "_note": "canonical paths. cite these spellings; no synonym exists.",
      "touchTargetFloor": "viewport.classes.<class>.minTargetPx",
      "widthCeiling": "viewport.classes.<class>.pressableMaxWidthScale",
      "surfaceBudget": "viewport.classes.<class>.persistentSurfaceShortAxisShareMax",
      "focusOrder": "viewport.gamepad.focusList.selectionOrderRule",
      "notFields": [
        "viewport.touchTargetFloorPx — the field is classes.<class>.minTargetPx",
        "viewport.minTouchTargetPx",
        "viewport.safeAreaInset",
        "viewport.gamepad.groupParentNode — withdrawn; no common parent is required"
      ]
    },
    "classify": {
      "minAxisPx": "math.min(workspace.CurrentCamera.ViewportSize.X, workspace.CurrentCamera.ViewportSize.Y)",
      "smallScreenThresholdPx": 500,
      "rules": [
        { "class": "console", "test": "GuiService:IsTenFootInterface()" },
        { "class": "phone",   "test": "UserInputService.TouchEnabled and not UserInputService.KeyboardEnabled and minAxisPx <= 500" },
        { "class": "tablet",  "test": "UserInputService.TouchEnabled and not UserInputService.KeyboardEnabled and minAxisPx > 500" },
        { "class": "desktop", "test": "otherwise" }
      ],
      "evaluatedOnce": false,
      "reEvaluateOn": "workspace.CurrentCamera:GetPropertyChangedSignal('ViewportSize')",
      "reEvaluateDebounceSeconds": 0.25,
      "reEvaluationIsIdempotent": true
    },
    "orientation": {
      "supported": ["landscapeLeft", "landscapeRight"],
      "request": "PlayerGui.ScreenOrientation = Enum.ScreenOrientation.LandscapeSensor",
      "portrait": "fallbackOnly",
      "portraitLayoutMustBeLegal": true,
      "orientationIsNotAPlayerSetting": true
    },
    "classes": {
      "phone": {
        "minTargetPx": 70, "minTargetSource": "measuredJumpButton", "minTargetFallbackPx": 70,
        "pressableMaxWidthScale": 0.20,
        "persistentSurfaceShortAxisShareMax": 0.65,
        "keepoutLandscape": ["jumpSmall", "thumbstickLandscape"],
        "keepoutPortrait": ["jumpSmall", "thumbstickPortrait"],
        "acceleratorGlyphRendered": false
      },
      "tablet": {
        "minTargetPx": 120, "minTargetSource": "measuredJumpButton", "minTargetFallbackPx": 120,
        "pressableMaxWidthScale": 0.16,
        "persistentSurfaceShortAxisShareMax": 0.55,
        "keepoutLandscape": ["jumpLarge", "thumbstickLandscape"],
        "keepoutPortrait": ["jumpLarge", "thumbstickPortrait"],
        "acceleratorGlyphRendered": false
      },
      "desktop": {
        "minTargetPx": 52, "minTargetSource": "pointerFloorNoPlatformControlExists", "minTargetFallbackPx": 52,
        "pressableMaxWidthScale": 0.12,
        "persistentSurfaceShortAxisShareMax": 0.35,
        "keepoutLandscape": [], "keepoutPortrait": [],
        "acceleratorGlyphRendered": false
      },
      "console": {
        "minTargetPx": 120, "minTargetSource": "focusFloorComputedFromSmallScreenPredicate", "minTargetFallbackPx": 120,
        "pressableMaxWidthScale": 0.16,
        "persistentSurfaceShortAxisShareMax": 0.45,
        "keepoutLandscape": [], "keepoutPortrait": [],
        "acceleratorGlyphRendered": false
      }
    },
    "keepoutRects": {
      "_form": "each edge is [scale, offsetPx] against the viewport, engine UDim order",
      "jumpSmall":           { "left": [1, -95],  "right": [1, -25], "top": [1, -90],    "bottom": [1, -20] },
      "jumpLarge":           { "left": [1, -170], "right": [1, -50], "top": [1, -210],   "bottom": [1, -90] },
      "thumbstickLandscape": { "left": [0, 0],    "right": [0.4, 0], "top": [0.3333, 0], "bottom": [1, 0] },
      "thumbstickPortrait":  { "left": [0, 0],    "right": [1, 0],   "top": [0.6, 0],    "bottom": [1, 0] }
    },
    "safeArea": {
      "screenGui": "hud", "createdBy": "client-main",
      "screenInsets": "Enum.ScreenInsets.CoreUISafeInsets",
      "ignoreGuiInset": false,
      "safeAreaCompatibility": "Enum.SafeAreaCompatibility.None",
      "patternAnchorVariant": "edge",
      "patternInsetVariantForbidden": true
    },
    "touchProbe": { "intervalSeconds": 0.5, "warnAfterSeconds": 10, "expires": false },
    "gamepad": {
      "mechanism": "explicitLinkGraph",
      "usesSelectionGroup": false,
      "groupParentRequired": false,
      "requiresNoNewUiForgeNode": true,
      "propertiesUsed": ["Selectable", "SelectionOrder", "NextSelectionUp", "NextSelectionDown", "NextSelectionLeft", "NextSelectionRight"],
      "focusList": {
        "source": "composition",
        "rule": "every composition.groups entry with interactive true, sorted by composition.groups[].groupIndex ascending",
        "selectableInstance": "composition.groups[].controlNode",
        "selectableInstanceIsNeverGroupNode": true,
        "selectionOrderRule": "10 * composition.groups[].groupIndex",
        "noSecondTerm": "the collection control is a group's controlNode and not an element, so it has no elements[].memberIndexWithinGroup; a second term would yield three positions and drop it from the cycle",
        "realisedOrder": [
          { "groupIndex": 1, "group": "collection",   "controlNode": "Pressable_INDEX", "selectionOrder": 10 },
          { "groupIndex": 4, "group": "upgradeValue", "controlNode": "Pressable_BUY1",  "selectionOrder": 40 },
          { "groupIndex": 5, "group": "upgradeReach", "controlNode": "Pressable_BUY2",  "selectionOrder": 50 },
          { "groupIndex": 6, "group": "upgradePace",  "controlNode": "Pressable_BUY3",  "selectionOrder": 60 }
        ],
        "selectionOrderIsNotRenumberedOnSuppression": true
      },
      "links": {
        "shape": "cycle",
        "appliedTo": "composition.groups[].controlNode",
        "nextSelectionDown": "the next entry in focusList, wrapping from last to first",
        "nextSelectionUp": "the previous entry in focusList, wrapping from first to last",
        "nextSelectionLeft": "the control itself",
        "nextSelectionRight": "the control itself",
        "spatialFallbackNeverUsed": true,
        "rebuiltOn": "any change to any controlNode's Selectable",
        "suppressedMember": { "selectable": false, "omittedFromCycle": true, "selectionOrderRetained": true }
      },
      "initialSelectedObject": "the controlNode with the lowest SelectionOrder in focusList",
      "panelOpenEntryAndExit": "ownedByNavigation"
    },
    "retiresLiterals": [
      "Pressables.luau MIN_TOUCH_TARGET_PX",
      "Pressables.luau BUTTON_WIDTH_SCALE",
      "Pressables.luau BUTTON_HEIGHT_PX",
      "Pressables.luau TOUCH_PROBE_INTERVAL_SECONDS",
      "Pressables.luau TOUCH_PROBE_WARN_AFTER_SECONDS",
      "Pressables.luau:423 per-button SelectionGroup"
    ],
    "playerFacingStrings": [],
    "fieldKinds": {
      "classify.smallScreenThresholdPx": "value",
      "classify.reEvaluateDebounceSeconds": "value",
      "classes.*.minTargetPx": "floor",
      "classes.*.minTargetFallbackPx": "floor",
      "classes.*.pressableMaxWidthScale": "ceiling",
      "classes.*.persistentSurfaceShortAxisShareMax": "ceiling",
      "keepoutRects.*": "value",
      "touchProbe.intervalSeconds": "value",
      "touchProbe.warnAfterSeconds": "value"
    }
  }
}
```

```amends
{
  "amends": "composition",
  "requestedBy": "cid/ui-ux/platform/01-device-viewport-rules.md",
  "status": "satisfied — nothing further is asked of composition",
  "history": "revision 2 requested four fields. hud/01 revision 2 published the correct three and named the other two as notFields; this sheet adopts hud/01's spelling verbatim rather than restating it.",
  "adopted": {
    "groupIndex": "composition.groups[].groupIndex",
    "interactive": "composition.groups[].interactive — a property of a GROUP, never of an element",
    "selectableInstance": "composition.groups[].controlNode — never groups[].node"
  },
  "withdrawn": [
    "composition.groups[].instanceName — the field is node; the selectable one is controlNode",
    "composition.groups[].members[].memberIndex — members holds id strings; the per-element index is elements[].memberIndexWithinGroup and the focus rule does not read it",
    "composition.groups[].groupParentNode — no common parent is required; RR-8 (c) needs no field and no ui-forge change"
  ],
  "invariant": "over the groups with interactive true, groupIndex is a total order with no ties, so 10 * groupIndex is injective. At hud/01's published values that is 10, 40, 50, 60 over four controlNodes, and count(interactive) equals input.gameDrawnPressables."
}
```

## Pushing back

**Against `gameplay/mechanics/02-verb-roster.md` (`input.pressable.minTouchTargetRule`) and
`gameplay/mechanics/03-device-parity.md` `P5`, on two counts.**

**One — the floor is undefined on two of four classes.** P5 states *"no smaller than the
platform's own jump button on that device"*. There is no `TouchGui` and no jump button on
desktop or on a gamepad-only session, so the rule covers roughly 30% of the stated audience with
nothing; `measurePlatformControls` returns `nil, nil` and falls through to an invented constant.
I make it total rather than weaker: on the touch classes it stands verbatim and is *measured*;
on desktop the instrument is a pointer and the floor is **52 px**, ui-forge's own considered
non-touch size taken from the repo rather than invented
`[research: ui-forge/src/compose/patterns/hud-overlay.mjs:182]`; on console it is **120 px**,
computed from the same `minAxis <= 500` predicate a television is far above.

**Two — *"one navigable selection group"* is unsatisfiable by any tree the compiler can emit,
so I replace the mechanism and keep the requirement.** `composition` puts the four interactive
groups in **two** clusters, `hud-overlay` emits clusters as siblings under `Root`
(`hud-overlay.mjs:288`), so their only common ancestor is `Root`, which also holds every readout
and the notice slot. Grouping at `Root` puts non-interactive nodes inside the navigable group;
grouping lower is impossible. The shipped build fails from the other side —
`Pressables.luau:423` sets `SelectionGroup` per button, which is four groups, not one.

**Requested wording change to P5:** *"one navigable selection group"* → **"one deterministic
focus cycle: every game-drawn pressable is `Selectable`, carries a unique `SelectionOrder`, and
its `NextSelection*` links form a single cycle over exactly the selectable pressables."** This is
stronger, not weaker: a group constrains where the highlight *may* go, the cycle states where it
*does* go, and it is checkable by walking four links. It also removes an `[unverified]` property
from the one path a console player has to spend. `input`'s owner rules;
`input.pressable.gamepadSelectable: true` is untouched and no verb changes.

**I chose the link graph over a new `ui-forge` node deliberately.** The node route would be the
eleventh compiler edit requested in one wave from an owner that does not exist, and it would put
the console purchase path behind a change nobody is committed to shipping. The link graph works
against the tree the compiler emits **today**, needs no `ifRefused` branch, and is therefore
**not** a sixth entry in my `ui-forge` table below.

## Flagged to the developer

**Orientation, which the brief never states.** I ruled landscape with a portrait fallback.
Alternatives: **(a)** landscape as specced — one calibrated layout, matches every `ui-forge`
render; **(b)** portrait-locked — a 414-wide column, pushing `pressableMaxWidthScale` past 0.4
and putting the bottom-right group and the jump button in one corner; **(c)** both — doubles the
keepout set, the budget set and the QA matrix. **Recommendation: (a).** It cannot be a player
setting: *"Declined: a full pass with colourblind mode, text scaling and sensitivity options"*
`[brief: soft]` (`04-PRESENTATION.md`) means adaptation is automatic or it does not exist.

**The four budget shares are `[playtest unknown]`** — 0.65 / 0.55 / 0.35 / 0.45 of the short
axis, test range ±0.10 each. The phone value is derived and tight: at the floor the column
occupies 258 px of 414 and leaves ~30 px above the inset, so **any increase to the floor, to the
12 px inter-row gap, or to the row count fails on a phone.**

## Consequences for other work

| subject | what it inherits |
|---|---|
| **Persistent-surface composition** (owner of `composition`) | **Nothing further.** The `amends` block is satisfied by `hud/01` as published: I adopt `groups[].groupIndex`, `groups[].interactive` and `groups[].controlNode`, and withdraw every other field I once asked for, including the group-parent node. The bottom-right group must fit `persistentSurfaceShortAxisShareMax` at every class, and **where the budget and a group disagree the budget wins, because a group that does not fit is not a composition.** It owns the realised width; I publish a floor and a ceiling, so `HUD_CLUSTER_MAX_WIDTH_SCALE` and `HUD_CLUSTER_FALLBACK_WIDTH_SCALE` (`Pressables.luau:151,171`) are its to retire. |
| **`representation` and `client-main`** | Only `client-main` creates the HUD `ScreenGui` (`init.client.luau:220-223`), so three property writes land there and nowhere else: `ScreenInsets = CoreUISafeInsets`, `IgnoreGuiInset = false`, `SafeAreaCompatibility = None`. This **overrules `docs/hand-written-control/init.client.luau:37`**. |
| **Purchase-control work** (`pressables`) | Six literals retired by name, including the per-button `SelectionGroup` at `:423`. Height becomes `minTargetPx` **exactly**: `math.max(BUTTON_HEIGHT_PX, minTouchPx)` is what turned a 70 px floor into a 96 px row. It also writes the cycle — four `SelectionOrder` values and eight `NextSelection*` links, on `groups[].controlNode` and never on `groups[].node`, rebuilt on any `Selectable` change. |
| **Navigation work** | I own the cycle *within* the four controls while the panel is closed and nothing else. Focus entry, focus exit and what the cycle becomes when the index opens are yours. Because there is no `SelectionGroup` there is also no `SelectionBehavior*` to override: the escape route you design is a `NextSelection*` reassignment, which is one mechanism rather than two. |
| **Feedback-UI work** | A notice may not be placed inside any published keepout rect, on any class, in either orientation, and must not be `Selectable` — a selectable notice would enter the cycle and change its length. |
| **Screens work** | The index panel obeys the same safe area — same `ScreenGui` — but not the persistent-surface budget, which bounds only what is drawn over live play. |

**The five `ui-forge` edits — this sheet adds no sixth.** None blocks the purchase path *today*,
because `pressables` draws the four controls itself; all five block the migration
`representation` anticipates. Edits 3 and 4 overlap `hud/03`'s `U3`/`U4` and should be
deduplicated into one list rather than counted twice.

| # | file · function | change |
|---|---|---|
| 1 | `compose/patterns/hud-overlay.mjs` · `actionButton()` `:178-198` | size from the active class, not hard-coded 52/56; 52 is legal only on desktop |
| 2 | same · `meta.variant`, `validateContent` | add a field to express that floor — `validateBrief` (`compose/index.mjs:44-64`) rejects any `variant` key not in `meta.variant`, so a brief cannot currently even ask |
| 3 | `emit/runtime/UIBuilder.luau` · `BREAKPOINTS` `:20`, `viewportClass()` `:94` | four classes, keyed on short axis and capability, not on `ViewportSize.X` |
| 4 | same · `build()` `:558-560` | `viewportClass()` is evaluated once; add a reflow entry point bound to `ViewportSize`, debounced 0.25 s |
| 5 | `src/cli.mjs` · `VIEWPORTS` `:42-46` | add a `console` entry, or `at.console` overrides can never be previewed |

## Acceptance criteria

1. On an 896×414 touch viewport every game-drawn pressable has `AbsoluteSize.X >= 70` and
   `AbsoluteSize.Y >= 70`, and every pressable has `AbsolutePosition.Y >= 0` inside a `ScreenGui`
   whose `IgnoreGuiInset` is `false`. On a 1180×820 touch viewport the same figures are `>= 120`.
2. At each of the four classes, the count of intersections between any game-drawn pressable's
   rect and any rect named in that class's `keepoutLandscape` list is **0**.
3. Both greps return 0:
   `grep -c 'MIN_TOUCH_TARGET_PX\|BUTTON_WIDTH_SCALE\|BUTTON_HEIGHT_PX\|TOUCH_PROBE_INTERVAL_SECONDS\|TOUCH_PROBE_WARN_AFTER_SECONDS\|SelectionGroup' game/src/client/Pressables.luau`
   and `grep -rc 'KeyCode.One\|KeyCode.Two\|KeyCode.Three' game/src/ --include=*.luau`.
4. Following `NextSelectionDown` from the initial `GuiService.SelectedObject` **four** times
   visits `Pressable_BUY1`, `Pressable_BUY2`, `Pressable_BUY3` and `Pressable_INDEX` exactly once
   each and returns to the start; every pressable's `NextSelectionLeft` and `NextSelectionRight`
   are that same instance; and the HUD `ScreenGui` reports
   `ScreenInsets == Enum.ScreenInsets.CoreUISafeInsets`.

## Not decided here

- **Where any element sits, its cluster, its group and its order** — `composition`
  (`ui-ux/hud/01`). I publish a floor, a ceiling, keepouts and a focus rule *that reads its
  `groupIndex` and its `controlNode`*; I restate none of its positions and ask it for no field.
- **The realised width of a pressable, and the two cluster-width literals** — `composition`.
- **Gamepad focus entry and exit across the HUD and the index panel, what the cycle becomes
  while the panel is open, and back behaviour on any device** — `navigation` (`ui-ux/navigation`).
- **Every label, string, number format and affordability word** — `composition` for the HUD,
  `screens` for the panel. This key publishes **zero player-facing strings**, so `vocabulary`'s
  title casing, 14-character ceiling, `^[A-Za-z0-9 ,.'%%/-]+$` and eight banned words have
  nothing here to bind; the only strings it names are engine enum members and field names.
- **Whether any number this key publishes may be assigned rather than compared** — sheet `02`.
- **Font, colour, icon and panel art at any class** — Art & Visuals (UI Art).
- **Which verbs exist and what a press means** — `input` (`gameplay/mechanics/02`), closed. The
  P5 wording above is a request to its owner, not an edit by me.
