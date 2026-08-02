# 03 — Close and focus by device

**Domain:** ui-ux/navigation · **Category:** UI/UX · **Wave:** 5 · **Revised round 2** (F-6)

## Decision

**`Pressable_INDEX` is the only way out, on every device class, and there is no drawn close
control inside the panel.** It is reachable while the panel is open **by z-order, not by any
reserved region** — it draws above the panel and is hit-testable. No Escape, no keyboard
accelerator, no tap or click outside the panel, no swipe; gamepad B is a best-effort extra and
nothing rests on it. The gamepad-selectable set is **the same four controls whether the panel is
open or closed**, and `GuiService.SelectedObject` is `Pressable_INDEX` at both edges on gamepad.

## Why

**Every conventional back input on this platform is unavailable, and that is sourced rather than
assumed.** Escape *"is exclusively reserved for opening the Roblox menu"* and
`ContextActionService` *"ignores all inputs registered by the CoreScripts"*
`[research: https://devforum.roblox.com/t/let-developers-temporarily-override-the-escape-key-using-contextactionservice/2021335]`.
Gamepad **B toggles the Roblox menu** — reported against the UWP client, not reproducing in
Studio, merged with no fix
`[research: https://devforum.roblox.com/t/roblox-menu-being-toggled-by-the-b-button-on-a-gamepad/639726]`
— enough to forbid B as the *only* gamepad close path and **not** enough to claim B is reserved on
every client. And Roblox's own mobile input surface is touch gestures, motion sensors, haptics and
on-screen buttons: **the Android hardware back button appears nowhere**
`[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/input/mobile.md]`.
So on ~70% of the audience there is no platform back input at all, and **the exit must be a drawn
control.**

**Round 1 showed that fact carries less than I made it carry, and the close control was dropped.**
It establishes the exit must be *drawn*; it does not establish it must be drawn *inside the panel*.
`Pressable_INDEX` is drawn, is on screen the whole time, and already toggles. Against it stood
`input.gameDrawnPressables: 4` with ruling R-1's containment of the movement-only overrule *"to one
input class, two verbs, four controls … stated in the manifest so nothing can widen it quietly"* —
a fifth pressable is exactly that quiet widening — and `screens/01`'s independent refusal on the
same ground. **Two approved statements against one convenience is not a close call**, and I ratify
the refusal rather than pushing back on `input`.

**Round 2: the second half of my round-1 argument was withdrawn by its own author, and the ruling
survives on the first half alone.** I also cited Screens' `mustNotIntersect: ["Pressable_INDEX"]`
at `0.84 × 0.72` as a guarantee the exit was never covered. **Screens withdrew exactly that in the
same round**, to `mustNotIntersect: []` at `0.94 × 0.86`, because its own arithmetic disproved it:
no phone viewport admits a panel that both fits its reserved content stack and clears a corner
cluster. So the sole exit may now sit under the panel. **That is fine, and the corrected statement
is one line:**

> **The exit is reachable because `Pressable_INDEX` draws at `ZIndex` 20 above the panel at 10 and
> is therefore hit-testable — `navigation.zOrder.invariant` plus
> `purchaseWhileOpen.indexControlRemainsActivatable: true` — and not because any region is kept
> clear of the panel.**

**I am not asking for the clearance back, and I withdraw the objection that would have required
it.** My round-1 sentence said one exit *"is not survivable against occlusion"*. That conflated
**visual overlap**, which is harmless and is `composition`'s and UI Art's problem, with
**unreachability**, which is fatal and is mine. Z-order prevents the fatal case outright; a
control drawn above the panel is both visible and pressable. Screens disproved its own guarantee
rather than defending a number, which is the right direction, and reinstating a rule field a
builder reads as binding and cannot satisfy would be worse than having none.

**What did change is severity, and sheet `02` carries it:** with one exit and no reserved region,
a pressable whose `ZIndex` is not strictly above the panel's is a **trapped player**, so
`zOrder.invariant` is bar (a) rather than housekeeping. The residual is recoverable — a respawn
closes the panel — but that is a floor, never a path, and no copy may name it.

**Tap or click outside the panel does not close it**, and this is where `03` reconciles with
`02` (a). Under that ruling the region outside the panel holds live purchase controls, and under
Screens' geometry they sit *over* it too. An outside-tap-to-close rule makes one tap mean two
things, and whether the tap is consumed by the close or falls through to a purchase is precisely
the kind of unstated behaviour two competent builders implement differently. It also manufactures
the one mistake this design does not otherwise contain: a mis-tap beside a 0.94-width panel on a
phone would close a surface the player did not ask to close, with no cue permitted to explain it
(`rejectionCueOnFailedPrecondition: "none"`, `tone/04` `D12`). **Outside presses reach whatever
control is under them, or nothing, and never touch the panel.**

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

**With the close control gone the navigable set never changes size, and that is a gift to
`viewport`.** The 24 slots have nothing to activate, so every slot frame, slot label and heading is
`Selectable = false` — `Selectable` *"determine[s] whether the GuiObject can be selected by a
gamepad"*
`[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/reference/engine/classes/GuiObject.yaml]`.
The selectable set is therefore **exactly the four pressables, open or closed**, so Platform's
focus order operates on one constant set and never needs a fifth position. This holds whether or
not `SelectionGroup` exists as a property: the pack's fetch of the rendered `GuiObject` reference
lists `Selectable`, `SelectionOrder` and `NextSelectionUp/Down/Left/Right` and **does not list
`SelectionGroup`** `[research: https://create.roblox.com/docs/reference/engine/classes/GuiObject]`,
contradicting the announcement above.
`[research owed: whether SelectionGroup is a current GuiObject property. Settled by the live
GuiObject.yaml member list or a Studio property check. The four-member navigable set is expressed
in Selectable and SelectionOrder alone and needs neither answer; only the redundant
SelectionBehavior fields do.]`

**Focus is one value at one node.** `GuiService` carries `SelectedObject`, `AutoSelectGuiEnabled`,
`GuiNavigationEnabled`, `Select()` and `MenuIsOpen` / `MenuOpened` / `MenuClosed`
`[research: https://create.roblox.com/docs/reference/engine/classes/GuiService]`. On gamepad,
`SelectedObject` is `Pressable_INDEX` immediately after **both** edges: on open it is already
there, because that is the control the player just activated and nothing inside the panel is
selectable; on close it is written if it is `nil`. A gamepad player is never left with no
selection. On touch and mouse the game never writes it — setting it for a mouse player draws a
selection box nobody asked for. And on `MenuOpened` the game does nothing at all: if B opened the
platform menu instead of closing the panel, the player closes the menu and finds the panel exactly
as they left it. That is the whole mitigation for the B ambiguity, at the cost of one deliberate
non-action.

### Close paths, per device class

| device class | close paths | explicitly forbidden here |
|---|---|---|
| touch | 1 · tap `Pressable_INDEX` (it toggles, and draws above the panel wherever the panel reaches) | any control drawn inside the panel · outside tap · swipe or drag dismiss · hardware back (does not exist on this platform) · a timeout |
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
      "exitReachableBy": "navigation.purchaseWhileOpen.exitReachability — z-order, not clearance",
      "withdrawnInRound1": "a glyph close control inside IndexSurface, required on all three device classes",
      "withdrawnBecause": [
        "input.gameDrawnPressables is 4 and ruling R-1 contains the movement-only overrule at four controls, stated in the manifest so nothing widens it quietly",
        "screens/01 refused the node on the same ground and set hasCloseControl false with CloseButton in forbiddenNodes"
      ],
      "roundOneReasonWithdrawn": "that screens[index].geometry.mustNotIntersect kept Pressable_INDEX clear of the panel; screens disproved that in the same round and the list is now empty, so the ruling rests on the two grounds above and on z-order for reachability",
      "dependsOn": "navigation.zOrder.invariant holding for Pressable_INDEX",
      "ifThatDependencyIsBroken": "the player cannot close the panel and there is no second exit; recoverable only through the platform menu's Reset Character under navigation.respawn. This is why that invariant is bar (a) and not housekeeping.",
      "doesNotDependOn": "any reserved region, on any viewport"
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

**Index-panel composition (`screens`).** Its refusal of a close control is ratified and its
recomputed `0.94 × 0.86` geometry with `mustNotIntersect: []` is accepted; **I ask it for
nothing**, and my round-1 dependency on its clearance is withdrawn. One statement it should carry
from its side, which the verifier is asking of it too: the panel may pass under `Pressable_INDEX`
and must never be given a `ZIndex` at or above it, because that node is the sole exit and z-order
is the only thing keeping it pressable.

**Persistent-surface composition (`composition`) and UI Art.** Two things land here that used to
be Screens'. `Pressable_INDEX` now routinely draws **over** panel content, so whether it reads
clearly against a `fantasy-ornate` panel is a real legibility question and it is theirs, not a
navigation one. And its `ZIndex` is bar (a): it is the only exit from the only openable node.

**Platform and input (`viewport`).** Two things, one a simplification. The gamepad-selectable set
is **constant at four**, open or closed, so its focus order never needs a fifth position. And the
seam is unchanged: it owns the order among the four; this sheet owns only that `SelectedObject` is
`Pressable_INDEX` at both edges on gamepad and is never written otherwise.

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

**Withdrawn in round 1:** the request that `screens` add a close control, and the request that
`viewport` define a focus order at both 4 and 5 members. **Withdrawn in round 2:** the dependency
on `screens[index].geometry.mustNotIntersect` naming `Pressable_INDEX`.

## Acceptance criteria

1. `navigation.byDevice` holds exactly 3 entries with classes `touch`, `keyboardMouse` and
   `gamepad`; no entry's `closePaths` contains the string `Escape`; every entry's `closePaths`
   contains `Pressable_INDEX`; the `gamepad` entry's `closePaths` holds 2 members and `ButtonB` is
   not its only member.
2. `navigation.closeControl.doesNotDependOn` names no reserved region, and
   `navigation.closeControl.dependsOn` resolves to `navigation.zOrder.invariant`, whose
   `invariantSeverity` is `"bar (a)"`.
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

Where `Pressable_INDEX` sits, its size, its label, its states, and whether it reads clearly when
drawn over an open panel (`composition` and UI Art, with `viewport` for the touch-target floor).
The panel's extent and anchor (`screens[index].geometry`, adopted and not re-decided). The focus
order among the four pressables (`viewport`). Whether the purchase controls stay activatable, the
z-order values and their severity, the suspension semantics and what happens when a beat lands —
sheet `02`. Which nodes and edges exist, and the entry control's presence and interactivity rules
— sheet `01`. Notice interaction properties (`notices`, already fixed by `response`). The device
split, which is `[brief: soft]` and uncorroborated; this sheet rests on the band, not the ratio.
