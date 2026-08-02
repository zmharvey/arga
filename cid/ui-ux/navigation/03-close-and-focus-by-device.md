# 03 — Close and focus by device

**Domain:** ui-ux/navigation · **Category:** UI/UX · **Wave:** 5

## Decision

**Two drawn close paths on every device class — the panel's own close control and
`Pressable_INDEX` toggling — and no third.** No Escape, no keyboard accelerator, no tap or click
outside the panel, no swipe. Gamepad selection is **deliberately allowed to leave the panel** onto
the four HUD pressables, because sheet `02` keeps them activatable; focus enters on the close
control and returns to `Pressable_INDEX` on close, on gamepad only.

## Why

**Every conventional back input on this platform is unavailable, and that is sourced rather than
assumed.** Escape *"is exclusively reserved for opening the Roblox menu"* and
`ContextActionService` *"ignores all inputs registered by the CoreScripts"*
`[research: https://devforum.roblox.com/t/let-developers-temporarily-override-the-escape-key-using-contextactionservice/2021335]`.
Gamepad **B toggles the Roblox menu** — reported against the UWP client, not reproducing in
Studio, merged with no fix
`[research: https://devforum.roblox.com/t/roblox-menu-being-toggled-by-the-b-button-on-a-gamepad/639726]`
— which is enough to forbid B as the *only* gamepad close path and **not** enough to claim B is
reserved on every client, so this sheet permits B as an extra best-effort path and never relies
on it. And Roblox's own mobile input surface is touch gestures, motion sensors, haptics and
on-screen buttons: **the Android hardware back button appears nowhere**
`[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/input/mobile.md]`.
So on ~70% of the audience there is no platform back input at all. **The close control has to be
drawn, and it has to be drawn for everyone**, which is also the cheapest answer to
`mechanics/03`'s parity floor: one drawn control satisfies all three classes at once.

**Tap or click outside the panel does not close it**, and this is where `03` reconciles with
`02` (a). Under that ruling the region outside the panel contains live purchase controls. An
outside-tap-to-close rule makes one tap mean two things, and whether the tap is consumed by the
close or falls through to a purchase is precisely the kind of unstated behaviour two competent
builders implement differently — a 60%-style divergence on the game's only currency sink. It also
manufactures the one mistake this design does not otherwise contain: a mis-tap beside a
90%-width panel on a phone would close a surface the player did not ask to close, with no cue
permitted to explain it (`rejectionCueOnFailedPrecondition: "none"`, `tone/04` `D12`). **Outside
presses reach whatever control is under them, or nothing, and never touch the panel.** As a
bonus this makes sheet `02`'s `[unverified]` about touch-tap sinking irrelevant to the close path
as well as to the purchase path.

**No keyboard accelerator exists at all.** `input` sets `keyboardAcceleratorAllowed: true` and
`keyboardAcceleratorRequired: false` and forbids one being the only path, so this is genuinely
open. Three reasons for none. `onboarding/03` `T5` and `T6` ban every instruction surface, so no
string may ever teach the key and it would be discoverable only by a player who tries letters at
random. A desktop player already has two paths, both on screen. And choosing a `KeyCode` safely
needs a list nobody has —
`[research owed: the current set of KeyCodes the Roblox CoreScripts bind. The 2021335 thread
establishes that CoreScript-registered inputs are unreachable by ContextActionService but not
which inputs those are, so any letter chosen here would be an unsourced guess against the one
class of collision that fails silently.]` This also settles the playtest record's unresolved
item 3 from the other side: the game's keyboard surface is empty, so a build in which `1`, `2`
and `3` buy upgrades is a stale build, not a live path.

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
`mechanics/03`'s parity floor on the smallest device class rather than the largest. So the
default stands, **stated explicitly so a later builder does not "fix" it to `Stop`.**

**The navigable set has to be small, and it is made small by `Selectable`, not by grouping.** The
24 slots have nothing to activate on them; a gamepad that has to traverse 24 dead cells to reach
a close control is worse than no gamepad support. `Selectable` *"determine[s] whether the
GuiObject can be selected by a gamepad"*
`[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/reference/engine/classes/GuiObject.yaml]`,
so every slot frame and slot label is `Selectable = false` and the navigable set while the panel
is open is exactly five: the close control and the four pressables. **This ruling holds whether
or not `SelectionGroup` turns out to exist as a property** — the pack's fetch of the rendered
`GuiObject` reference page lists gamepad members `Selectable`, `SelectionOrder` and
`NextSelectionUp/Down/Left/Right` and **does not list `SelectionGroup`**
`[research: https://create.roblox.com/docs/reference/engine/classes/GuiObject]`, which contradicts
the announcement above.
`[research owed: whether SelectionGroup is a current GuiObject property. Settled by the live
GuiObject.yaml member list or a Studio property check. The five-member navigable set is expressed
in Selectable and SelectionOrder alone and needs neither answer; only the redundant
SelectionBehavior fields do.]`

**Focus.** `GuiService` carries `SelectedObject`, `AutoSelectGuiEnabled`, `GuiNavigationEnabled`,
`Select()` and `MenuIsOpen` / `MenuOpened` / `MenuClosed`
`[research: https://create.roblox.com/docs/reference/engine/classes/GuiService]`. On open,
`SelectedObject` becomes the close control (`SelectionOrder` 0 against 10 on the pressables, lower
first). On close it returns to `Pressable_INDEX` — the node that opened it — rather than to `nil`,
because a gamepad player left with no selection has to re-acquire it by stick flick and lands
wherever `AutoSelectGuiEnabled` decides. **Both writes happen on gamepad only**: setting
`SelectedObject` for a mouse player draws a selection box nobody asked for. And on `MenuOpened`
the game does nothing at all — if B opened the platform menu instead of closing the panel, the
player closes the menu and finds the panel exactly as they left it, with focus intact. That is
the whole mitigation for the B ambiguity and it costs one deliberate non-action.

### Close paths, per device class

| device class | close paths, in the order a player finds them | explicitly forbidden here |
|---|---|---|
| touch | 1 · the drawn close control inside the panel · 2 · tap `Pressable_INDEX` (it toggles) | outside tap · swipe or drag dismiss · hardware back (does not exist on this platform) · a timeout |
| keyboard + mouse | 1 · click the close control · 2 · click `Pressable_INDEX` | Escape (reserved by the platform) · every other key: no accelerator exists · click outside the panel · right-click |
| gamepad | 1 · activate the close control (it holds focus on open) · 2 · navigate to `Pressable_INDEX` and activate it · 3 · B, best-effort only | B as the only path · `Stop` selection behaviour · any bound stick gesture · a `GuiService:AddSelectionParent` group |

```json
{
  "amends": "navigation",
  "value": {
    "closeControl": {
      "livesInside": "IndexSurface",
      "drawnBy": "screens",
      "carriesPlayerFacingString": false,
      "isAGlyph": true,
      "sameNodeThatOpened": false,
      "openControlAlsoCloses": true,
      "selectionOrder": 0,
      "zIndexLayer": "indexPanel",
      "rectMayNotIntersect": ["Pressable_BUY1", "Pressable_BUY2", "Pressable_BUY3", "Pressable_INDEX"]
    },
    "keyboardAccelerator": {
      "exists": false,
      "allowedByInput": true,
      "requiredByInput": false,
      "because": "onboarding/03 T5 and T6 forbid any string that could teach it; two drawn paths already exist on desktop; no sourced list of CoreScript-bound KeyCodes exists to choose one safely"
    },
    "outsidePress": {
      "closesPanel": false,
      "reaches": "whatever control sits under it at a higher ZIndex, or nothing",
      "because": "the region outside the panel holds live purchase controls under navigation.purchaseWhileOpen; one press may not mean two things"
    },
    "selectability": {
      "whilePanelOpen": {
        "selectableCount": 5,
        "selectable": ["the panel close control", "Pressable_BUY1", "Pressable_BUY2", "Pressable_BUY3", "Pressable_INDEX"],
        "notSelectable": ["every Slot_* frame", "every slot Name label", "every Heading_* label", "every HUD readout"]
      },
      "whilePanelClosed": {
        "selectableCount": 4,
        "selectable": ["Pressable_BUY1", "Pressable_BUY2", "Pressable_BUY3", "Pressable_INDEX"]
      },
      "selectionOrder": { "closeControl": 0, "pressables": 10 },
      "selectionBehavior": "Escape",
      "selectionBehaviorIsNotStop": true,
      "selectionBehaviorReason": "the panel is an overlay and the purchase controls behind it stay activatable; Stop would hand gamepad players a modal that touch and mouse players do not have, breaking mechanics/03 parity",
      "mechanism": "GuiObject.Selectable and GuiObject.SelectionOrder",
      "deprecatedMechanismForbidden": "GuiService:AddSelectionParent",
      "orderAmongThePressablesOwnedBy": "viewport"
    },
    "focus": {
      "setsSelectedObject": "gamepadOnly",
      "onOpen": { "selectedObject": "the panel close control", "reason": "lowest SelectionOrder in the open set" },
      "onClose": { "selectedObject": "Pressable_INDEX", "reason": "the node that opened it; nil would force a re-acquire by stick flick" },
      "onCloseNonGamepad": { "selectedObject": null },
      "onCloseWhilePressableIndexAbsent": { "selectedObject": null, "note": "unreachable: the panel cannot be open before its control lifts" },
      "onPlatformMenuOpened": { "action": "none", "panel": "unchanged", "selectedObject": "unchanged", "reason": "mitigates gamepad B ambiguity: closing the platform menu returns the player to the panel as they left it" }
    },
    "byDevice": [
      {
        "class": "touch",
        "closePaths": ["activate the panel close control", "activate Pressable_INDEX"],
        "forbidden": ["outside tap", "swipe or drag dismiss", "hardware back button", "any timeout"],
        "platformBackInputExists": false,
        "focusModel": "none"
      },
      {
        "class": "keyboardMouse",
        "closePaths": ["click the panel close control", "click Pressable_INDEX"],
        "forbidden": ["Escape", "any KeyCode", "click outside the panel", "right-click"],
        "escapeUnavailableBecause": "exclusively reserved for the Roblox menu; ContextActionService ignores CoreScript-registered inputs",
        "focusModel": "none"
      },
      {
        "class": "gamepad",
        "closePaths": ["activate the panel close control", "navigate to and activate Pressable_INDEX", "ButtonB (best effort, never relied on)"],
        "forbidden": ["ButtonB as the only path", "Stop selection behaviour", "any bound stick gesture", "AddSelectionParent"],
        "buttonBCaveat": "reported to toggle the Roblox menu on the UWP client; not reproducing in Studio; not reserved on every client",
        "focusModel": "GuiService.SelectedObject"
      }
    ]
  }
}
```

## Consequences for other work

**Index-panel composition (`screens`).** The close control is real work you now own: it exists,
it lives inside `IndexSurface`, it holds focus on open, it carries **no text** and it may not
overlap any pressable rect. A glyph rather than a label is not a style preference — a text label
would have to be title case, ≤ 14 characters and non-imperative all at once, and every natural
candidate for this control is an imperative.

**Platform and input (`viewport`).** The seam runs exactly here: **you own the focus order among
the four pressables; this sheet owns where focus enters and leaves the panel.** Two things land on
you. The close control is a gamepad-selectable target and a touch target, so your floor
(`minTouchTargetRule`, measured against the platform jump button) applies to it. And your gamepad
focus order operates on a set that is 4 members when the panel is closed and 5 when it is open —
if you specify a fixed cyclic order over four, say what happens to the fifth.

**Object and instance representation (`architect/sheets/06-representation.md`).** `SelectionGroup`
on the four buttons is ratified with its default `Escape` behaviour and a stated reason. The
mechanism this key relies on is `Selectable` plus `SelectionOrder`, which are uncontested; if
`SelectionGroup` turns out not to be a current property, nothing in `navigation` breaks.

**Feedback UI (`notices`).** Nothing on the notice channel may be focusable, which `response`
already requires. Restated here only because this sheet enumerates a five-member selectable set,
and a notice entering it would make the count six.

**Build work on `game/src/client/IndexScreen.luau` and `Pressables.luau`.** The close control does
not exist yet, the 24 slot frames are not marked `Selectable = false`, and no module writes
`GuiService.SelectedObject`. Three additions, no deletions.

### Revision requests issued

| against | file | field | current | required | why |
|---|---|---|---|---|---|
| `screens` | `cid/ui-ux/screens/*` | the panel's element inventory | four groups of six slots and four headings; no close control | add a close control: no text, `SelectionOrder` 0, rect disjoint from all four pressables | there is no platform back input on ~70% of the audience, so the exit must be drawn |
| `viewport` | `cid/ui-ux/platform/*` | gamepad focus order | order across four pressables | an order that is defined at both 4 and 5 members, the fifth being the panel close control | the selectable set changes size when the panel opens and no key says what the order becomes |
| shipped build | `game/src/client/IndexScreen.luau:338-359` | slot and heading nodes | `Selectable` unset | `Selectable = false` on every `Slot_*` frame, every slot `Name` label and every `Heading_*` label | otherwise a gamepad traverses 24 dead cells to reach the exit |

## Acceptance criteria

1. `navigation.byDevice` holds exactly 3 entries with classes `touch`, `keyboardMouse` and
   `gamepad`; no entry's `closePaths` contains the string `Escape`; the `gamepad` entry's
   `closePaths` holds at least 2 members and `ButtonB` is not its only member.
2. `game/src/` contains zero `Enum.KeyCode` references outside comments, and
   `navigation.keyboardAccelerator.exists` is `false`.
3. While the panel is open, exactly 5 `GuiObject`s under the HUD `ScreenGui` have
   `Selectable == true`; every `Slot_*` frame, every slot `Name` label and every `Heading_*` label
   has `Selectable == false`.
4. On a gamepad, `GuiService.SelectedObject` is the panel close control immediately after the
   `openIndex` edge and `Pressable_INDEX` immediately after the `closeIndex` edge; on touch and on
   keyboard-and-mouse it is `nil` after both.

## Flagged to the developer

**A keyboard accelerator is permitted by `input` and this sheet declines it.** The live
alternative is one `KeyCode` bound through `ContextActionService` as a toggle on the same edge
pair, chosen once the CoreScript-bound key list above is fetched. **Recommendation: leave it
out.** No string may teach it, desktop is ~25% of an uncorroborated split, and a key chosen
against no source is a silent collision waiting for a client that binds it. If it is added later
it is one field flipping in `navigation.keyboardAccelerator` and no other decision moves.

## Not decided here

Where the close control sits, what its glyph is, its size and its colour (`screens`, with UI Art
for the glyph and `viewport` for the touch-target floor). The focus order among the four
pressables (`viewport`). Whether the purchase controls stay activatable at all, the z-order, the
suspension semantics and what happens when a beat lands — sheet `02`, which this sheet consumes
and does not re-decide. Which nodes and edges exist, and the entry control's presence rule —
sheet `01`. Notice interaction properties (`notices`, already fixed by `response`). The device
split itself, which is `[brief: soft]` and uncorroborated; this sheet rests on the band, not the
ratio, and corroborating it is Platform & Input's G9.
