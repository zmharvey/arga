# 01 — Device and viewport rules

**Domain:** ui-ux/platform · **Category:** UI/UX · **Wave:** 5

## Decision

Four device classes — `phone`, `tablet`, `desktop`, `console` — identified by **capability then
short-axis pixels**, on the platform's own `minAxis <= 500` predicate, so the class boundary and
the touch-target floor are one derivation and not two. The game runs **landscape**; portrait is
a legal fallback, not a supported orientation. The one HUD `ScreenGui` carries
`ScreenInsets = CoreUISafeInsets` and `IgnoreGuiInset = false`, so the safe area is the
engine's and no pattern literal restates it.

**The project's largest known gap is still open, and this sheet is what closes it.** `CLAUDE.md`
records the mobile purchase path as the biggest remaining item and ruling R-1 made `buy` a
pressable to close it. It does not work today, on three counts, all arithmetic:

| # | the failure, at shipped values | where |
|---|---|---|
| 1 | The floor is wrong on both touch classes. `MIN_TOUCH_TARGET_PX = 96` is **above** the phone floor of 70 and **below** the tablet floor of 120 | `game/src/client/Pressables.luau:116` |
| 2 | The topmost purchase button computes to `414 − (90 + 24 + 2×108 + 96) = −12 px` on an 896×414 phone — off-screen, before the top-bar inset that `init.client.luau:220-223` never disables | `Pressables.luau:500-519`, `:395-396` |
| 3 | `hud-overlay`'s own button is hard-sized 52×52 (56×56 mobile), so a tablet resolves to the `tablet` breakpoint, takes the base 52, and stands at 52 against a 120 floor | `ui-forge/src/compose/patterns/hud-overlay.mjs:178-198` |

At the floor derived below the same column computes to a top edge of **+66 px** and fits, with
about 30 px of headroom above the inset. **The defect is the floor, not the layout.**

## Why

**The class boundary and the touch floor are the same number, so only one of them can be
wrong.** The platform computes `minAxis = min(parent.AbsoluteSize.X, parent.AbsoluteSize.Y)`,
`isSmallScreen = minAxis <= 500`, `jumpButtonSize = isSmallScreen and 70 or 120`
`[research: https://github.com/Roblox/Core-Scripts/blob/master/PlayerScripts/StarterPlayerScripts_NewStructure/RobloxPlayerScript/ControlScript/TouchJump.lua]`.
Classifying on that same predicate makes a class's floor exactly the button the platform will
draw on it. `input.pressable.minTouchTargetRule` names a measurement, `[brief: binding]` in
effect via R-1, and `measurePlatformControls` already reads the live button
`[research: game/src/client/Pressables.luau]` — so **70 and 120 are the fallback and the check,
never the runtime value.** Core-Scripts is the legacy mirror, not the running engine; the live
script is `PlayerScripts.PlayerModule.ControlModule`.
`[research owed: PlayerGui.TouchGui.TouchControlFrame.JumpButton.AbsoluteSize read in Studio on an emulated phone and an emulated tablet]`

**Pixel-width breakpoints are the wrong instrument, and are what ships.** `BREAKPOINTS` is
`mobile ≤1000` / `tablet ≤1500` on `Camera.ViewportSize.X` alone
`[research: ui-forge/src/emit/runtime/UIBuilder.luau:20,94]`, so a portrait tablet (820 wide)
resolves to `mobile`, a 1920-wide television resolves to `desktop`, and there is no fourth class
for console to occupy. Short axis plus capability fixes all three in one function. `mechanics/03`
P4 bans a device read that changes *which verbs exist* and permits one that *"only sizes or
positions an affordance"*, which is what this is.

**Orientation was unstated anywhere in the brief and changes the answer completely.** The
dynamic thumbstick captures **left 40% × bottom two-thirds** in landscape and **full width ×
bottom 40%** in portrait
`[research: https://github.com/Roblox/Core-Scripts/blob/master/PlayerScripts/StarterPlayerScripts/ControlScript/MasterControl/DynamicThumbstick.lua]`,
and the legacy `Thumbstick`, `DPad` and `Thumbpad` modes are gone, so that is the region that
actually exists `[research: https://devforum.roblox.com/t/psa-removing-legacy-touch-controls/361681]`.
Portrait swallows the whole bottom band and both bottom clusters with it. I rule landscape
`[cid: decided]`: it is what `ui-forge` calibrates against (`cli.mjs:42-46`, phone 896×414
landscape) and the orientation in which the right half of the screen is free. Portrait keepouts
ship anyway, because a client that refuses the request needs a legal layout rather than none —
and portrait is in fact more generous vertically (537 px of free band against a 234 px column)
and worse horizontally.
`[research owed: Enum.ScreenOrientation's members, and whether LandscapeSensor is honoured on tablets]`

**The safe area needs an instrument and one exists.** `CoreUISafeInsets` keeps descendants clear
of the Roblox top bar and of device cutouts, and inset values *"only take effect on ScreenGuis
that have their `IgnoreGuiInset` property set to false"*
`[research: https://create.roblox.com/docs/reference/engine/enums/ScreenInsets]`
`[research: https://create.roblox.com/docs/reference/engine/classes/GuiService]`.
`init.client.luau:220-223` sets neither while `docs/hand-written-control/init.client.luau:37`
sets `IgnoreGuiInset = true`: the build and its control diverge and no sheet decided it. Once
the engine supplies the inset, `hud-overlay`'s `ANCHOR_INSET` (`base: 8`, `mobile: 28`) is a
second inset that double-counts, so `anchor: "edge"` becomes the only legal variant for this
game's HUD `[research: ui-forge/src/compose/patterns/hud-overlay.mjs:38-41]`.

**The persistent surface gets a budget, not a layout.** Nothing states how much of a phone's
short axis the HUD may consume, and at shipped values it exceeds 100%. The budget is the
column's own arithmetic at the floor plus margin — 258 px of 414 — rounded up to a ceiling that
`composition` spends. It is not a size and may never be assigned as one, which is sheet `02`.

**Nothing rests on the 70/25/5 split.** It is `[brief: soft]` and uncorroborated by anything
fetched. Every rule here is stated per class and none is weighted by share; the *band* —
*"8–14, mobile-heavy, short sessions"* `[brief: binding]` (`00-CORE.md`) — is what the floors
serve. `[research owed: the experience's own Creator Dashboard platform breakdown, which cannot exist before launch]`
Roblox itself publishes no minimum touch-target figure: `adaptive-design` and
`console-guidelines` carry principles only
`[research: https://create.roblox.com/docs/production/publishing/adaptive-design]`
`[research: https://create.roblox.com/docs/production/publishing/console-guidelines]`. That is
why the rule names a measurement, and why the two classes with nothing to measure need the
ruling below rather than a figure I would have invented.

**The `1`/`2`/`3` accelerator is rendered on no class.** `keyboardAcceleratorAllowed` is `true`
and `keyboardAcceleratorRequired` is `false`; I decline the allowance `[cid: decided]`. A digit
glyph beside a button is an instruction, which `onboarding/03` `T5`/`T6` ban, and it advertises
a path R-1 removed — `Input.luau` is to be deleted (`cid/_state.md` escalation 4), and the
playtest's unresolved defect 3 is either a stale build or a live surface that must not be
signposted either way.

```manifest
{
  "provides": "viewport",
  "status": "proposed",
  "value": {
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
        "minTargetPx": 70,
        "minTargetSource": "measuredJumpButton",
        "minTargetFallbackPx": 70,
        "pressableMaxWidthScale": 0.20,
        "persistentSurfaceShortAxisShareMax": 0.65,
        "keepoutLandscape": ["jumpSmall", "thumbstickLandscape"],
        "keepoutPortrait": ["jumpSmall", "thumbstickPortrait"],
        "acceleratorGlyphRendered": false
      },
      "tablet": {
        "minTargetPx": 120,
        "minTargetSource": "measuredJumpButton",
        "minTargetFallbackPx": 120,
        "pressableMaxWidthScale": 0.16,
        "persistentSurfaceShortAxisShareMax": 0.55,
        "keepoutLandscape": ["jumpLarge", "thumbstickLandscape"],
        "keepoutPortrait": ["jumpLarge", "thumbstickPortrait"],
        "acceleratorGlyphRendered": false
      },
      "desktop": {
        "minTargetPx": 52,
        "minTargetSource": "pointerFloorNoPlatformControlExists",
        "minTargetFallbackPx": 52,
        "pressableMaxWidthScale": 0.12,
        "persistentSurfaceShortAxisShareMax": 0.35,
        "keepoutLandscape": [],
        "keepoutPortrait": [],
        "acceleratorGlyphRendered": false
      },
      "console": {
        "minTargetPx": 120,
        "minTargetSource": "focusFloorComputedFromSmallScreenPredicate",
        "minTargetFallbackPx": 120,
        "pressableMaxWidthScale": 0.16,
        "persistentSurfaceShortAxisShareMax": 0.45,
        "keepoutLandscape": [],
        "keepoutPortrait": [],
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
      "screenGui": "hud",
      "createdBy": "client-main",
      "screenInsets": "Enum.ScreenInsets.CoreUISafeInsets",
      "ignoreGuiInset": false,
      "safeAreaCompatibility": "Enum.SafeAreaCompatibility.None",
      "patternAnchorVariant": "edge",
      "patternInsetVariantForbidden": true,
      "reason": "the engine supplies the inset; ANCHOR_INSET would double-count it"
    },
    "touchProbe": {
      "intervalSeconds": 0.5,
      "warnAfterSeconds": 10,
      "expires": false
    },
    "gamepad": {
      "selectionOrderRule": "10 * composition.groupIndex + composition.memberIndexWithinGroup",
      "readsCompositionGroupsNeverPositions": true,
      "groupParentRequired": true,
      "selectionGroupSetOn": "theOneGroupParentNode",
      "selectionGroupSetOnEachButton": false,
      "selectionBehaviorWhilePanelClosed": { "up": "Stop", "down": "Stop", "left": "Stop", "right": "Stop" },
      "initialSelectedObject": "lowest SelectionOrder with Selectable true",
      "suppressedMember": { "selectable": false, "renumbered": false },
      "panelOpenEntryAndExit": "ownedByNavigation"
    },
    "retiresLiterals": [
      "Pressables.luau MIN_TOUCH_TARGET_PX",
      "Pressables.luau BUTTON_WIDTH_SCALE",
      "Pressables.luau BUTTON_HEIGHT_PX",
      "Pressables.luau TOUCH_PROBE_INTERVAL_SECONDS",
      "Pressables.luau TOUCH_PROBE_WARN_AFTER_SECONDS"
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

## Pushing back

**Against `gameplay/mechanics/02-verb-roster.md` (`input.pressable.minTouchTargetRule`) and
`gameplay/mechanics/03-device-parity.md` `P5`.** Both state the floor as *"no smaller than the
platform's own jump button on that device"*. **There is no `TouchGui` and no jump button on
desktop or on a gamepad-only session**, so the rule is undefined on two of four classes and for
roughly 30% of the stated audience; `measurePlatformControls` returns `nil, nil` there and falls
through to an invented constant.

I do not weaken the rule, I make it total. On the two touch classes it stands exactly as written
and is *measured*. On desktop the instrument is a pointer and the floor is **52 px** — ui-forge's
own considered non-touch button size, taken from the repo rather than invented
`[research: ui-forge/src/compose/patterns/hud-overlay.mjs:182]`. On console the floor is
**120 px**, computed rather than measured: a television's short axis is far above 500, and 120 is
what the platform draws above that threshold. Parity is untouched — all four pressables stay
tappable, clickable and gamepad-selectable, which is what `mechanics/03` actually requires.

**P5's *"one navigable selection group"* is also not satisfied today.** `Pressables.luau:423`
sets `button.SelectionGroup = gamepadSelectable` on **each** of the four buttons, which is four
groups rather than one, and the four parent straight to the `ScreenGui` with no common frame to
hold a group. `SelectionGroup` *"constrain[s] where the UI highlight can move"* and belongs on
the container `[research: https://devforum.roblox.com/t/new-gamepad-ui-selection-apis/1791278]`;
it is absent from the current `GuiObject` reference page
`[research: https://create.roblox.com/docs/reference/engine/classes/GuiObject]`, so one Studio
check is owed before P5 is called satisfied. The deprecated `GuiService:AddSelectionParent` is
not the idiom to spec
`[research: https://create.roblox.com/docs/reference/engine/classes/GuiService/AddSelectionParent]`.

## Flagged to the developer

**Orientation, which the brief never states.** I ruled landscape with a portrait fallback. Live
alternatives: **(a)** landscape as specced — one calibrated layout, matches every `ui-forge`
render, thumbstick confined to the left; **(b)** portrait-locked — a 414-wide column on a phone,
pushing `pressableMaxWidthScale` past 0.4 and putting the bottom-right group and the jump button
in the same corner; **(c)** both — doubles the keepout set, the budget set and the QA matrix.
**Recommendation: (a).** It cannot be a player setting: *"Declined: a full pass with colourblind
mode, text scaling and sensitivity options"* `[brief: soft]` (`04-PRESENTATION.md`) means
adaptation is automatic or it does not exist.

**The four budget shares are `[playtest unknown]`.** Starting values 0.65 / 0.55 / 0.35 / 0.45
of the short axis, test range ±0.10 each. The phone value is derived and tight: at the floor the
column occupies 258 px of 414 and leaves about 30 px above the inset, so **any increase to the
floor, to the 12 px inter-row gap, or to the row count fails on a phone.**

## Consequences for other work

| subject | what it inherits |
|---|---|
| **Persistent-surface composition** (owner of `composition`) | The bottom-right group must fit `persistentSurfaceShortAxisShareMax` at every class, and **where the budget and a group disagree the budget wins, because a group that does not fit is not a composition.** It must declare **one common parent node** for the four pressables, since `SelectionGroup` is a container property. It owns the realised width; I publish only a floor and a ceiling, so `HUD_CLUSTER_MAX_WIDTH_SCALE` and `HUD_CLUSTER_FALLBACK_WIDTH_SCALE` (`Pressables.luau:151,171`) are its to retire. |
| **`representation` and `client-main`** | Only `client-main` creates the HUD `ScreenGui` (`init.client.luau:220-223`), so three property writes land there and nowhere else: `ScreenInsets = CoreUISafeInsets`, `IgnoreGuiInset = false`, `SafeAreaCompatibility = None`. This **overrules `docs/hand-written-control/init.client.luau:37`**, which sets `IgnoreGuiInset = true`. |
| **Purchase-surface build work** (`Pressables.luau`) | Five literals retired by name. Height becomes `minTargetPx` **exactly**: the `math.max(BUTTON_HEIGHT_PX, minTouchPx)` expression is what turned a 70 px floor into a 96 px row and pushed the column off a phone. |
| **Navigation work** | I own ordering *within* the four pressables while the panel is closed, and nothing else. Focus entry, focus exit, and any `SelectionBehavior` change when the index opens are yours; I state `Stop` for the closed state only, so there is one behaviour to override rather than two owners. |
| **Feedback-UI work** | A notice may not be placed inside any published keepout rect, on any class, in either orientation. `response` already forbids a notice that blocks a click-through; one sitting over the jump button breaks that rule geometrically. |
| **Screens work** | The index panel obeys the same safe area — same `ScreenGui` — but not the persistent-surface budget, which bounds only what is drawn over live play. |

**The five `ui-forge` edits, each with its file, function and change.** None blocks the purchase
path *today*, because `pressables` draws the four buttons itself; all five block the migration
`representation` anticipates, in which `pressables.bind` resolves node names instead of creating
Instances — and until they land that migration would ship a button illegal on both touch classes.

| # | file · function | change |
|---|---|---|
| 1 | `compose/patterns/hud-overlay.mjs` · `actionButton()` `:178-198` | size from the active class, not hard-coded 52/56; 52 is legal only on desktop |
| 2 | `compose/patterns/hud-overlay.mjs` · `meta.variant`, `validateContent` | add a field to express that floor — `validateBrief` (`compose/index.mjs:44-64`) rejects any `variant` key not in `meta.variant`, so a brief cannot currently even ask |
| 3 | `emit/runtime/UIBuilder.luau` · `BREAKPOINTS` `:20`, `viewportClass()` `:94` | four classes, keyed on short axis and capability, not on `ViewportSize.X` |
| 4 | `emit/runtime/UIBuilder.luau` · `build()` `:558-560` | `viewportClass()` is evaluated once; add a reflow entry point bound to `ViewportSize`, debounced 0.25 s |
| 5 | `src/cli.mjs` · `VIEWPORTS` `:42-46` | add a `console` entry, or `at.console` overrides can never be previewed |

## Acceptance criteria

1. On an 896×414 touch viewport every game-drawn pressable has `AbsoluteSize.X >= 70` and
   `AbsoluteSize.Y >= 70`, and every pressable has `AbsolutePosition.Y >= 0` inside a `ScreenGui`
   whose `IgnoreGuiInset` is `false`. On a 1180×820 touch viewport the same figures are `>= 120`.
2. At each of the four classes, the count of intersections between any game-drawn pressable's
   rect and any rect named in that class's `keepoutLandscape` list is **0**.
3. `grep -c 'MIN_TOUCH_TARGET_PX\|BUTTON_WIDTH_SCALE\|BUTTON_HEIGHT_PX\|TOUCH_PROBE_INTERVAL_SECONDS\|TOUCH_PROBE_WARN_AFTER_SECONDS' game/src/client/Pressables.luau` returns 0.
4. The HUD `ScreenGui` reports `ScreenInsets == Enum.ScreenInsets.CoreUISafeInsets` and
   `IgnoreGuiInset == false`, and no game-drawn pressable renders `1`, `2` or `3` as an
   accelerator glyph on any class.

## Not decided here

- **Where any element sits, its cluster, its group and its order** — `composition`
  (`ui-ux/hud/01`). I publish a floor, a ceiling, keepouts and a focus-order *rule that reads its
  groups*; I restate none of its positions.
- **The realised width of a pressable, and the two cluster-width literals** — `composition`.
- **Gamepad focus entry and exit across the HUD and the index panel, and back behaviour on any
  device** — `navigation` (`ui-ux/navigation`).
- **Every label, string, number format and affordability word** — `composition` for the HUD,
  `screens` for the panel. This key publishes **zero player-facing strings**, so `vocabulary`'s
  title casing, 14-character ceiling, `^[A-Za-z0-9 ,.'%%/-]+$` and eight banned words have
  nothing here to bind; the only strings it names are engine enum members and field names.
- **Whether any number this key publishes may be assigned rather than compared** — sheet `02`,
  this domain, which supplies the rule and no values.
- **Font, colour, icon and panel art at any class** — Art & Visuals (UI Art).
- **Which verbs exist and what a press means** — `input` (`gameplay/mechanics/02`), closed.
