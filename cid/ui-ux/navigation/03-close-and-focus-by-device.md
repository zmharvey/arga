# 03 — Close and focus by device

**Domain:** ui-ux/navigation · **Category:** UI/UX · **Wave:** 5 · **Revised round 1** (RR-3)

## Decision

**`Pressable_INDEX` is the only way out, on every device class, and there is no drawn close
control inside the panel.** No Escape, no keyboard accelerator, no tap or click outside the panel,
no swipe; gamepad B is permitted as a best-effort extra and never relied on. The gamepad-selectable
set is **the same four controls whether the panel is open or closed**, selection is deliberately
allowed to leave the panel onto them, and `GuiService.SelectedObject` is `Pressable_INDEX` at both
edges on gamepad and is never written on the other two classes.

## Why

**Every conventional back input on this platform is unavailable, and that is sourced rather than
assumed.** Escape *"is exclusively reserved for opening the Roblox menu"* and
`ContextActionService` *"ignores all inputs registered by the CoreScripts"*
`[research: https://devforum.roblox.com/t/let-developers-temporarily-override-the-escape-key-using-contextactionservice/2021335]`.
Gamepad **B toggles the Roblox menu** — reported against the UWP client, not reproducing in
Studio, merged with no fix
`[research: https://devforum.roblox.com/t/roblox-menu-being-toggled-by-the-b-button-on-a-gamepad/639726]`
— enough to forbid B as the *only* gamepad close path and **not** enough to claim B is reserved on
every client, so it is permitted as an extra and nothing rests on it. And Roblox's own mobile input
surface is touch gestures, motion sensors, haptics and on-screen buttons: **the Android hardware
back button appears nowhere**
`[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/input/mobile.md]`.
So on ~70% of the audience there is no platform back input at all, and **the exit must be a drawn
control.**

**Round 1 showed that fact carries less than I made it carry, and the close control is dropped.**
It establishes that the exit must be *drawn*; it does not establish that it must be drawn *inside
the panel*. `Pressable_INDEX` is drawn, is on screen the whole time, and already toggles. Against
that stood two things I could not answer. `input.gameDrawnPressables` is **4**, and ruling R-1
contained the movement-only overrule *"to one input class, two verbs, four controls … stated in
the manifest so nothing can widen it quietly"* — a fifth pressable is exactly the quiet widening
that containment exists to catch. And `screens/01` refused the node independently, on the same
ground, having already engineered its geometry so the exit is never covered:
`mustNotIntersect: ["Pressable_INDEX"]` at `0.84 × 0.72` **bottom-anchored**, which keeps the
top-left cluster clear on every viewport. **Two approved statements against one convenience is not
a close call.** I ratify Screens' refusal rather than pushing back on `input`, and RR-4 closes on
Screens' side by that ratification: `hasCloseControl: false` stands, `CloseButton` stays in
`forbiddenNodes`, and its acceptance criterion is untouched.

**What that costs, stated plainly.** Touch and keyboard-and-mouse have exactly one close path
each instead of two. That is survivable and arguably better: press the thing you pressed to open
it is the most learnable rule available in a game where `onboarding/03` `T5` and `T6` forbid every
string that could teach anything else. What it is **not** survivable against is occlusion, which
is why sheet `02` promotes `screens[index].geometry.mustNotIntersect` from a courtesy to a
bar-(a) invariant: with one exit, a panel that covers it traps the player.

**Tap or click outside the panel does not close it**, and this is where `03` reconciles with
`02` (a). Under that ruling the region outside the panel contains live purchase controls — and
under `screens`' geometry they may sit *over* the panel too. An outside-tap-to-close rule makes
one tap mean two things, and whether the tap is consumed by the close or falls through to a
purchase is precisely the kind of unstated behaviour two competent builders implement differently.
It also manufactures the one mistake this design does not otherwise contain: a mis-tap beside a
0.84-width panel on a phone would close a surface the player did not ask to close, with no cue
permitted to explain it (`rejectionCueOnFailedPrecondition: "none"`, `tone/04` `D12`). **Outside
presses reach whatever control is under them, or nothing, and never touch the panel.**

**No keyboard accelerator exists at all.** `input` sets `keyboardAcceleratorAllowed: true` and
`keyboardAcceleratorRequired: false` and forbids one being the only path, so this is genuinely
open. Three reasons for none. `onboarding/03` `T5` and `T6` ban every instruction surface, so no
string may ever teach the key and it would be discoverable only by a player trying letters at
random. A desktop player already has an always-visible on-screen path. And choosing a `KeyCode`
safely needs a list nobody has —
`[research owed: the current set of KeyCodes the Roblox CoreScripts bind. The 2021335 thread
establishes that CoreScript-registered inputs are unreachable by ContextActionService but not
which inputs those are, so any letter chosen here would be an unsourced guess against the one
class of collision that fails silently.]` This also settles the playtest record's unresolved item
3 from the other side: the game's keyboard surface is empty, so a build in which `1`, `2` and `3`
buy upgrades is a stale build, not a live path.

**Gamepad selection is allowed to escape the panel, and that is the ruling rather than an
oversight (index contradiction 2).** `SelectionGroup` *"constrain[s] where the UI highlight can
move"*, and `SelectionBehaviorUp/Down/Left/Right` default to `Escape` — *"it will then allow
selection to 'Escape' the group"* — with `Stop` as the confining alternative; `SelectionOrder`
picks the initial selection, *"lower … prioritized first. The default value is 0."*
`[research: https://devforum.roblox.com/t/new-gamepad-ui-selection-apis/1791278]`. The pre-2022
idiom is not the one to spec: `GuiService:AddSelectionParent` is **deprecated**
`[research: https://create.roblox.com/docs/reference/engine/classes/GuiService/AddSelectionParent]`.

`representation` already sets `SelectionGroup: true` on the four buttons, and with the default
behaviour a gamepad walks out of the open panel onto them. **Under sheet `02` that is correct.**
The panel is an overlay, the purchase controls are live behind it, and `Stop` would be the one
setting that gives a gamepad player a modal the other two device classes do not have — breaking
`mechanics/03`'s parity floor on the smallest device class rather than the largest. The default
stands, **stated explicitly so a later builder does not "fix" it to `Stop`.**

**With the close control gone, the navigable set never changes size, and that is a gift to
`viewport`.** The 24 slots have nothing to activate on them, so every slot frame, slot label and
heading is `Selectable = false` — `Selectable` *"determine[s] whether the GuiObject can be
selected by a gamepad"*
`[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/reference/engine/classes/GuiObject.yaml]`.
The selectable set is therefore **exactly the four pressables, open or closed**, so Platform's
focus order operates on one constant set and never has to define a fifth position. This ruling
holds whether or not `SelectionGroup` turns out to exist as a property: the pack's fetch of the
rendered `GuiObject` reference lists `Selectable`, `SelectionOrder` and
`NextSelectionUp/Down/Left/Right` and **does not list `SelectionGroup`**
`[research: https://create.roblox.com/docs/reference/engine/classes/GuiObject]`, contradicting the
announcement above.
`[research owed: whether SelectionGroup is a current GuiObject property. Settled by the live
GuiObject.yaml member list or a Studio property check. The four-member navigable set is expressed
in Selectable and SelectionOrder alone and needs neither answer; only the redundant
SelectionBehavior fields do.]`

**Focus is one value at one node.** `GuiService` carries `SelectedObject`, `AutoSelectGuiEnabled`,
`GuiNavigationEnabled`, `Select()` and `MenuIsOpen` / `MenuOpened` / `MenuClosed`
`[research: https://create.roblox.com/docs/reference/engine/classes/GuiService]`. On gamepad,
`SelectedObject` is `Pressable_INDEX` immediately after **both** edges: on open it is already
there, because that is the control the player just activated and nothing inside the panel is
selectable; on close it is written if it is not. A gamepad player is never left with no selection,
and no `SelectionOrder` juggling is needed. On touch and mouse the game never writes it — setting
it for a mouse player draws a selection box nobody asked for. And on `MenuOpened` the game does
nothing at all: if B opened the platform menu instead of closing the panel, the player closes the
menu and finds the panel exactly as they left it. That is the whole mitigation for the B
ambiguity and it costs one deliberate non-action.

### Close paths, per device class

| device class | close paths | explicitly forbidden here |
|---|---|---|
| touch | 1 · tap `Pressable_INDEX` (it toggles, and `screens` keeps its rect clear of the panel on every viewport) | any control drawn inside the panel · outside tap · swipe or drag dismiss · hardware back (does not exist on this platform) · a timeout |
| keyboard + mouse | 1 · click `Pressable_INDEX` | Escape (reserved by the platform) · every other key: no accelerator exists · click outside the panel · right-click |
| gamepad | 1 · `Pressable_INDEX`, which already holds `SelectedObject` when the panel opens · 2 · B, best-effort only | B as the only path · `Stop` selection behaviour · any bound stick gesture · a `GuiService:AddSelectionParent` group |

```manifest
{
  "amends": "navigation",
  "value": {
    "closeControl": {
      "separateDrawnCloseControlExists": false,
      "exitIs": "Pressable_INDEX",
      "exitIsAlsoTheEntry": true,
      "exitCountPerDeviceClass": { "touch": 1, "keyboardMouse": 1, "gamepad": 2 },
      "withdrawnInRound1": "a glyph close control inside IndexSurface, required on all three device classes",
      "withdrawnBecause": [
        "input.gameDrawnPressables is 4 and ruling R-1 contains the movement-only overrule at four controls, stated in the manifest so nothing widens it quietly",
        "screens/01 refused the node on the same ground and set hasCloseControl false with CloseButton in forbiddenNodes",
        "screens[index].geometry.mustNotIntersect keeps Pressable_INDEX clear on every viewport, so one drawn exit is guaranteed reachable"
      ],
      "dependsOn": "screens[index].geometry.mustNotIntersect continuing to name Pressable_INDEX at every sizeScale in its test range",
      "ifThatDependencyIsReleased": "this ruling reopens and the fifth pressable becomes a live proposal against input"
    },
    "keyboardAccelerator": {
      "exists": false,
      "allowedByInput": true,
      "requiredByInput": false,
      "because": "onboarding/03 T5 and T6 forbid any string that could teach it; an always-visible on-screen path already exists on desktop; no sourced list of CoreScript-bound KeyCodes exists to choose one safely"
    },
    "outsidePress": {
      "closesPanel": false,
      "reaches": "whatever control sits under it at a higher ZIndex, or nothing",
      "because": "the region outside and over the panel holds live purchase controls under navigation.purchaseWhileOpen; one press may not mean two things"
    },
    "selectability": {
      "setIsConstant": true,
      "selectableCount": 4,
      "selectable": ["Pressable_BUY1", "Pressable_BUY2", "Pressable_BUY3", "Pressable_INDEX"],
      "notSelectable": ["every Slot_* frame", "every slot Name label", "every Heading_* label", "every non-interactive composition element", "everything on the notice channel"],
      "unchangedByPanelState": "opening or closing the index adds and removes no selectable node",
      "pressableIndexSelectableFrom": "the first snapshot in which countFound(snapshot.found) > 0; before that it is a readout with Selectable false",
      "selectionOrder": "viewport owns the order among the four; navigation sets none",
      "selectionBehavior": "Escape",
      "selectionBehaviorIsNotStop": true,
      "selectionBehaviorReason": "the panel is an overlay and the purchase controls stay activatable; Stop would hand gamepad players a modal that touch and mouse players do not have, breaking mechanics/03 parity",
      "mechanism": "GuiObject.Selectable and GuiObject.SelectionOrder",
      "deprecatedMechanismForbidden": "GuiService:AddSelectionParent"
    },
    "focus": {
      "setsSelectedObject": "gamepadOnly",
      "value": "Pressable_INDEX",
      "onOpen": { "selectedObject": "Pressable_INDEX", "written": false, "reason": "it is already selected: it is the control the player just activated and nothing inside the panel is selectable" },
      "onClose": { "selectedObject": "Pressable_INDEX", "written": "only if it is nil", "reason": "a gamepad player must never be left with no selection" },
      "onNonGamepad": { "selectedObject": "never written by this game" },
      "onPlatformMenuOpened": { "action": "none", "panel": "unchanged", "selectedObject": "unchanged", "reason": "mitigates gamepad B ambiguity: closing the platform menu returns the player to the panel as they left it" }
    },
    "byDevice": [
      {
        "class": "touch",
        "closePaths": ["activate Pressable_INDEX"],
        "forbidden": ["any control drawn inside IndexSurface", "outside tap", "swipe or drag dismiss", "hardware back button", "any timeout"],
        "platformBackInputExists": false,
        "focusModel": "none"
      },
      {
        "class": "keyboardMouse",
        "closePaths": ["click Pressable_INDEX"],
        "forbidden": ["Escape", "any KeyCode", "click outside the panel", "right-click"],
        "escapeUnavailableBecause": "exclusively reserved for the Roblox menu; ContextActionService ignores CoreScript-registered inputs",
        "focusModel": "none"
      },
      {
        "class": "gamepad",
        "closePaths": ["activate Pressable_INDEX, which holds SelectedObject when the panel opens", "ButtonB (best effort, never relied on)"],
        "forbidden": ["ButtonB as the only path", "Stop selection behaviour", "any bound stick gesture", "AddSelectionParent"],
        "buttonBCaveat": "reported to toggle the Roblox menu on the UWP client; not reproducing in Studio; not reserved on every client",
        "focusModel": "GuiService.SelectedObject"
      }
    ]
  }
}
```

## Consequences for other work

**Index-panel composition (`screens`).** Its refusal is ratified and RR-4 closes on its side with
no edit: `hasCloseControl: false`, `CloseButton` in `forbiddenNodes` and acceptance criterion 1 all
stand. What it inherits instead is a dependency it must not release: `mustNotIntersect` must keep
naming `Pressable_INDEX` at every `sizeScale` in its own `[0.72, 0.94] × [0.6, 0.8]` test range,
because that node is now the sole exit. If any tested extent covers it, the panel traps the player
and the fifth-pressable question reopens against `input`.

**Platform and input (`viewport`).** Two things, one of them a simplification it can use. The
gamepad-selectable set is **constant at four**, open or closed, so its focus order never needs a
fifth position and RR-9's variability question does not arise from this domain. And the seam is
unchanged: it owns the order among the four; this sheet owns only that `SelectedObject` is
`Pressable_INDEX` at both edges on gamepad and is never written otherwise.

**Persistent-surface composition (`composition`).** `Pressable_INDEX` is a close control as well
as an open control, so it is the one node in the HUD whose activation has two meanings depending
on panel state. Its label does not change between them — `composition` fixes `Finds` / `Parts` and
this sheet adds no state-dependent string.

**Object and instance representation (`architect/sheets/06-representation.md`).** `SelectionGroup`
on the four buttons is ratified with its default `Escape` behaviour and a stated reason. The
mechanism this key relies on is `Selectable` plus `SelectionOrder`, which are uncontested.

**Feedback UI (`notices`).** Nothing on the notice channel is selectable, which keeps the set at
four. `response` already requires non-focusable; this is the same rule counted.

### Revision requests issued

| against | file | field | current | required | why |
|---|---|---|---|---|---|
| shipped build | `game/src/client/IndexScreen.luau:338-381` | slot, label and heading nodes | `Selectable` unset | `Selectable = false` on every `Slot_*` frame, every slot `Name` label and every `Heading_*` label | otherwise a gamepad traverses 24 dead cells and the selectable set stops being constant |
| shipped build | `game/src/client/IndexScreen.luau` | `GuiService.SelectedObject` | never written | on the `closeIndex` edge, on gamepad, set it to `Pressable_INDEX` if it is `nil` | a gamepad player closing the panel must not be left with no selection |

**Withdrawn from round 1:** the request that `screens` add a close control, and the request that
`viewport` define a focus order at both 4 and 5 members.

## Acceptance criteria

1. `navigation.byDevice` holds exactly 3 entries with classes `touch`, `keyboardMouse` and
   `gamepad`; no entry's `closePaths` contains the string `Escape`; every entry's `closePaths`
   contains `Pressable_INDEX`; the `gamepad` entry's `closePaths` holds 2 members and `ButtonB` is
   not its only member.
2. `game/src/` contains zero `Enum.KeyCode` references outside comments, and
   `navigation.keyboardAccelerator.exists` is `false`.
3. Whether the panel is open or closed, exactly 4 `GuiObject`s under the HUD `ScreenGui` have
   `Selectable == true`, and they are the four instances in `input.pressable.roles`; every
   `Slot_*` frame, every slot `Name` label and every `Heading_*` label has `Selectable == false`.
4. On a gamepad, `GuiService.SelectedObject` is `Pressable_INDEX` immediately after both the
   `openIndex` and the `closeIndex` edge; on touch and on keyboard-and-mouse, `game/src/` contains
   zero writes to `GuiService.SelectedObject`.

## Flagged to the developer

**A keyboard accelerator is permitted by `input` and this sheet declines it.** The live
alternative is one `KeyCode` bound through `ContextActionService` as a toggle on the same edge
pair, chosen once the CoreScript-bound key list above is fetched. **Recommendation: leave it
out.** No string may teach it, desktop is ~25% of an uncorroborated split, and a key chosen
against no source is a silent collision waiting for a client that binds it. Adding it later flips
one field and moves no other decision.

## Not decided here

Where `Pressable_INDEX` sits, its size, its label and its states (`composition`, with `viewport`
for the touch-target floor). The panel's extent and anchor, and the guarantee that it never covers
the exit (`screens[index].geometry`, adopted and not re-decided). The focus order among the four
pressables (`viewport`). Whether the purchase controls stay activatable at all, the z-order, the
suspension semantics and what happens when a beat lands — sheet `02`. Which nodes and edges exist,
and the entry control's presence and interactivity rules — sheet `01`. Notice interaction
properties (`notices`, already fixed by `response`). The device split, which is `[brief: soft]`
and uncorroborated; this sheet rests on the band, not the ratio.
