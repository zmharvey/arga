# 02 — Concurrency and suspension

**Domain:** ui-ux/navigation · **Category:** UI/UX · **Wave:** 5 · **Revised round 1** (RR-5)

## Decision

**The index is an overlay, not an input modal.** All four game-drawn pressables stay activatable
while it is open, guaranteed by z-order alone: the pressables draw **above** the panel, so the
panel's `Active` sink never reaches them. **Exactly one rect must also stay clear —
`Pressable_INDEX`, because it is the only exit.** It suspends exactly two things, character
translation and jump, through the player's own control module, and leaves camera, clearing tick,
tool, snapshot and notices running. **No beat, tick, completion or bay build ever closes it. A
respawn does.**

## Why

**(a) Purchase survives an open index.** `core-loop/01` requires buying be reachable *"from
anywhere in the area with no travel and no area exit"*, `input` sets `travelRequiredToPurchase`
to `"none"` and `pressable.roles[purchase].persistent` to true. Against that, `input`'s own prose
calls the index *"modal"*. The word is the whole collision, and it is a word rather than a field:
the field beside it is `indexScreenSuspendsMovement`, which says the **character** stands still.
Read that way there is nothing to reconcile — the body stops, input does not. Read the other way,
the game's only currency sink sits behind a screen for as long as a player browses their
collection, which fails the ruling addressed to this category by name.

**The shipped build split the difference by assertion and the assertion is false**, which round-1
verification confirmed from source. `IndexScreen.luau:581-585` sets `frame.Active = true` and
comments that the panel *"covers neither the top-left nor the bottom-right cluster"*;
`PANEL_WIDTH_SCALE` is 0.9 at `anchor = {0.5, 0.5}`, so the panel spans x ∈ [0.05, 0.95] and
covers both horizontally. And `SURFACE_Z_INDEX` is 10 while `:131` states in terms that the four
pressables *"are left at the default ZIndex of 1"*
`[research: game/src/client/IndexScreen.luau]`. **The stacking order is exactly backwards** and
that is the mechanical form of the defect.

**Z-order is the mechanism and — after round 1 — it is the *only* mechanism for three of the four
controls.** My first draft also required the panel's rect be disjoint from all four pressables.
`screens/01` decided the opposite deliberately, and better: `geometry.mayIntersect` names
`Pressable_BUY1/2/3` and `mustNotIntersect` names `Pressable_INDEX`, at `0.84 × 0.72`
**bottom-anchored** so the top-left cluster stays clear on every viewport. **Screens is right and
I withdraw my request against its extent.** The arithmetic was never on my side — my own sheet
conceded that a centred panel leaves about 5% of width for four controls — and a `rule` field a
builder reads as binding but cannot satisfy is worse than no field at all. Z-order alone keeps the
three purchase controls hit-testable through an intersecting panel, which is what the mechanism
was chosen for.

**One rect does still have to stay clear, and it is now load-bearing rather than cosmetic.** Sheet
`03` drops the in-panel close control, so `Pressable_INDEX` is the **only** exit from the only
openable surface. A panel covering it is a player who cannot get out — bar (a), and worse than the
purchase case because there is no second path. `screens[index].geometry.mustNotIntersect` already
says so; this key adopts it as an invariant rather than restating a geometry it does not own.

**Z-order was also chosen because it is robust to the one fact this domain could not settle.**
`GuiObject.Active` is documented only as *"Determines whether this UI element sinks input"*
`[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/reference/engine/classes/GuiObject.yaml]`.
`[unverified — whether Active sinks a touch tap identically to a mouse click. Settled by the
creator-docs input-propagation page for `content/en-us/ui/`, or by a Studio device-emulator run on
a phone viewport with a button under an Active frame. It would decide ~70% of the audience's
behaviour under a geometry rule, and decides nothing under a z-order rule.]`

**(b) What the suspension is.** `response.humanoidWritesAllowed` is exactly `["WalkSpeed"]` and
that write is `server-main`'s, so the suspension **may not be a Humanoid write**. It is
`PlayerModule:GetControls():Disable()` / `:Enable()`, with a `ContextActionService` sink of
`Enum.PlayerActions` as the fallback — the shipped path, ratified, because the control module is
the one thing that owns the touch thumbstick as well as the keyboard and gamepad.

**The camera keeps running**, and this is the one part of (b) that is a taste call rather than a
derivation. `look` is a platform verb the game binds nothing for (`input`, five verbs, no sixth),
and a view that stops responding while a panel is open reads as a freeze rather than a mode.
`[cid: decided]`, ratifying `IndexScreen.luau:266-268`.

**(c) `response.controlEverAffected: false` versus a verb that suspends movement (contradiction 5),
as data.** The reconciliation has been written in prose twice and carried by no field anywhere.
It is four fields: `cause: "playerOwnActivation"`, `endsOn: "playerOwnActivation"`,
`beatMayCause: false`, `beatMayEnd: false`. `response` forbids a **beat** taking control. This
suspension is caused by the player and ended by the player, and no beat can start or stop it.

**(d) A beat lands while the panel is open (contradiction 4).** `input` makes the index
dismissible at will; `response` `R5` forbids any beat dismissing it. Jointly they leave an area
completion firing behind an open panel over a frozen player while `plots.advance` builds the next
bay, with no stated z-order and no stated outcome. **Ruling: everything proceeds and nothing is
deferred.** The two completion notices draw on the notice channel **above** the panel — they are
click-through and non-focusable by `response`, so drawing them above swallows nothing, and drawing
them below would silently drop `B2` and `B3` at the exact moment they fire. The reveal owns the
**world** channel, which is behind the panel and **may be occluded, with no compensation drawn**:
adding an on-panel reveal would be a fifth channel and `tone/03` forbids the reveal on the notice
channel. The player is not left with nothing — the slot fills on the next snapshot, which is the
panel they are already looking at, and audio is not occluded at all.

The reachable coincident case is real: a frozen player standing over the last uncleared patch has
it cleared by the server tick, and on the 4.3% of laps where that patch is a Find patch, `B1`,
`B2` and `B3` fire together. The order and the 0.35 s onset separation are `core-loop/02`'s and
are not reopened. What this sheet adds is that **none of the three touches the panel**.

**One invariant the bay build must respect:** nothing may move, teleport or reparent the character
while the panel is open. `plots` lays bays nose to tail with `alwaysOpen` openings and the player
walks in, so no reposition exists today; the field exists so that adding one is a revision rather
than a surprise.

**(e) Respawn: the panel closes.** `IndexScreen.watchRespawns` re-applies the suspension on
`CharacterAdded`; closing is the live alternative and is the ruling. The only route to a respawn
is the platform menu's Reset Character, so a respawn is a deliberate request to be back in the
world, and handing that player a frozen body behind a panel they did not re-request is the
opposite of what they asked for. It also keeps (c)'s invariant exactly true: re-applying the
suspension would make a **spawn event** the cause of a control change, which is the thing
`response.controlEverAffected: false` exists to prevent. A respawn is not one of `response`'s five
beats, so `R5` is untouched. The cost is one activation to reopen.

```manifest
{
  "amends": "navigation",
  "value": {
    "zOrder": {
      "requiredScreenGuiZIndexBehavior": "Sibling",
      "appliedPerNodeNotOnlyOnRoots": true,
      "layers": [
        { "layer": "hudReadouts", "zIndex": 1, "members": "every composition group whose interactive flag is false, and every element in one" },
        { "layer": "indexPanel", "zIndex": 10, "members": "IndexSurface and every descendant" },
        { "layer": "gameDrawnPressables", "zIndex": 20, "members": ["Pressable_BUY1", "Pressable_BUY2", "Pressable_BUY3", "Pressable_INDEX"] },
        { "layer": "notice", "zIndex": 30, "members": "everything on the notice channel" }
      ],
      "invariant": "every member of gameDrawnPressables has a ZIndex strictly greater than IndexSurface and than every descendant of IndexSurface",
      "shippedValueIsWrong": "IndexScreen.luau SURFACE_Z_INDEX 10 against pressables at the default 1"
    },
    "concurrency": {
      "maxOpenNodes": 1,
      "matrix": [
        { "a": "hud", "b": "index", "simultaneous": true, "note": "the hud is never hidden, dimmed, blurred or scaled by an open index" },
        { "a": "hud", "b": "notice", "simultaneous": true },
        { "a": "index", "b": "notice", "simultaneous": true, "note": "notice draws above the panel and stays click-through and non-focusable" },
        { "a": "index", "b": "worldReveal", "simultaneous": true, "note": "the world channel is behind the panel and may be occluded" },
        { "a": "index", "b": "platformMenu", "simultaneous": true, "note": "the game does nothing on GuiService.MenuOpened; the panel is untouched" },
        { "a": "index", "b": "index", "simultaneous": false, "note": "one instance; a second bind() warns and builds nothing" }
      ]
    },
    "purchaseWhileOpen": {
      "purchaseControlsRemainActivatable": true,
      "indexControlRemainsActivatable": true,
      "mechanism": "zOrder",
      "mechanismIsSufficientAlone": true,
      "geometry": {
        "mustNotIntersectPanel": ["Pressable_INDEX"],
        "mustNotIntersectReason": "sheet 03 drops the in-panel close control, so this node is the only exit from the only openable node; a panel covering it traps the player",
        "mayIntersectPanel": ["Pressable_BUY1", "Pressable_BUY2", "Pressable_BUY3"],
        "mayIntersectReason": "z-order keeps them hit-testable through the panel; a disjointness rule over all four is not satisfiable at any panel extent screens would accept",
        "governedBy": "screens[index].geometry",
        "adoptedNotDecidedHere": true,
        "withdrawnInRound1": "the round-1 requirement that all four rects be disjoint from IndexSurface"
      },
      "panelSinksWithinOwnBoundsBelowItself": true,
      "dimBlurOrScrimBehindPanel": "none",
      "hudHiddenWhileOpen": false
    },
    "suspension": {
      "field": "input.pressable.indexScreenSuspendsMovement",
      "appliesToNode": "index",
      "mechanism": "PlayerModule:GetControls():Disable() and :Enable()",
      "fallback": "ContextActionService sink of Enum.PlayerActions",
      "humanoidWrite": false,
      "humanoidWriteForbiddenBecause": "response.humanoidWritesAllowed is exactly [WalkSpeed] and that write is server-main's",
      "cause": "playerOwnActivation",
      "endsOn": "playerOwnActivation",
      "beatMayCause": false,
      "beatMayEnd": false,
      "controlEverAffectedByABeat": false,
      "suspended": ["characterTranslation", "jump"],
      "notSuspended": [
        { "what": "camera", "because": "look is a platform verb the game binds nothing for; a frozen view reads as a freeze, not a mode" },
        { "what": "serverClearingTick", "because": "server-side and not the client's to stop; a frozen player moves nothing into radius anyway" },
        { "what": "heldTool", "because": "tool T-rules: welded, visible from spawn, never swung, never clears" },
        { "what": "snapshotUpdates", "because": "the panel's own slot writes are driven by them" },
        { "what": "noticeChannel", "because": "response forbids anything on it blocking a click-through" },
        { "what": "purchasePressables", "because": "core-loop/01 no-travel and input travelRequiredToPurchase none" },
        { "what": "plotsAdvance", "because": "area completion is a repeating beat of the loop and may not stall behind a panel" }
      ]
    },
    "worldEventsWhileOpen": {
      "panelDismissedBy": ["closeIndex"],
      "beatMayDismiss": false,
      "worldEventMayDismiss": false,
      "beatMayDeferOrQueue": false,
      "characterMayBeMovedTeleportedOrReparented": false,
      "events": [
        { "event": "clearTick", "panel": "unchanged", "outcome": "currency readout updates on the HUD behind the panel" },
        { "event": "B1 findReveal", "panel": "unchanged", "channel": "world", "occlusion": "permitted", "compensation": "none", "observableOnPanel": "the slot's label fills on the next snapshot", "audio": "unaffected" },
        { "event": "B2 setComplete", "panel": "unchanged", "channel": "notice", "drawnAbovePanel": true },
        { "event": "B3 areaComplete", "panel": "unchanged", "channel": "notice", "drawnAbovePanel": true },
        { "event": "plots.advance builds the next bay", "panel": "unchanged", "outcome": "the bay is built behind the panel; the character is not moved" },
        { "event": "coincidentB1B2B3", "panel": "unchanged", "outcome": "core-loop/02's order and 0.35 s onset separation apply unchanged; none of the three touches the panel" }
      ]
    },
    "respawn": {
      "trigger": "CharacterAdded while the index node is open",
      "outcome": "close",
      "movementRestored": true,
      "suspensionReapplied": false,
      "isABeat": false,
      "r5Untouched": true,
      "reopenCost": "one activation; presence is latched and derived from the snapshot",
      "supersedes": "game/src/client/IndexScreen.luau watchRespawns"
    }
  }
}
```

## Pushing back

**`cid/gameplay/mechanics/02-verb-roster.md`, the word *"modal"*.** That sheet describes the index
as *"modal: the character stands still while it is open"*. I overrule the word and keep every
field. `navigation.nodes[index].kind` is `overlay` and `occludesInput` is
`ownBoundsBelowItsOwnZIndexOnly`; `indexScreenSuspendsMovement` stays `true` and means exactly
what the clause after the colon says. The reason is that sheet's own consequence column, which
gives the purchase controls `persistent: true` and `travelRequiredToPurchase: "none"`, and
`core-loop/01`'s ruling that buying must be reachable with no travel and no area exit. A modal
that captures input is an area exit in every sense that matters to a player holding currency.

## Consequences for other work

**Persistent-surface composition (`composition`, ui-ux/hud).** One z-order requirement and one
prohibition. Every interactive group's node carries `ZIndex` 20 and every non-interactive element
carries 1. **The HUD is never hidden, dimmed, blurred, scaled or scrimmed by an open index** —
`economy` keeps currency visible and uncapped, and there is no state in which it stops being. The
round-1 request that cluster rects be disjoint from `IndexSurface` is **withdrawn** for the
`bottomRight` cluster and stands only for `topLeft`, which holds the sole exit.

**Index-panel composition (`screens`).** Its geometry is adopted verbatim and my request against
its extent is **withdrawn**. What remains is a dependency I now rely on: `mustNotIntersect` must
keep naming `Pressable_INDEX`, on every viewport in its own `sizeScale` test range, because that
node is the only exit. `IndexSurface` and every descendant carry `ZIndex` 10, applied per node.

**Notice channel (`notices`, ui-ux/feedback).** Notices carry `ZIndex` 30 and draw above an open
panel. This is a requirement, not a preference: a notice drawn below the panel drops `B2` and `B3`
entirely at the moment they fire. Nothing about their non-focusable, click-through,
non-dismissible-only properties changes — those are the guarantee that stops a notice swallowing a
tap, which is why the z-order can afford to be above.

**Platform and input (`viewport`).** The four pressables must remain hit-testable above a
`ZIndex` 10 panel on all three device classes, and three of them may sit over the panel, so the
touch-target floor is measured against a control that can overlap an opened surface.

**Plot arrangement (`plots`) and area-completion detection.** `plots.advance` runs unchanged
behind an open panel and may not move, teleport or reparent the character.

**Build work on `game/src/client/IndexScreen.luau`.** Three changes: raise the four pressables
above the panel, delete the false comment at `:583-584`, and replace `watchRespawns` with a close.

### Revision requests issued

| against | file | field | current | required | why |
|---|---|---|---|---|---|
| `composition` | `cid/ui-ux/hud/01-persistent-surface-composition.md` | element and group `ZIndex` | no `ZIndex` field in the key | 20 on every interactive group node, 1 on every non-interactive element | the shipped stacking order is inverted, so an open panel sits on top of the game's only currency sink |
| `notices` | `cid/ui-ux/feedback/01-the-notice-channel.md` | notice `zIndex` layer | `zIndexBelow: "pressable"` | 30, above both the pressables and the index panel | a notice below a `ZIndex` 10 panel silently drops `B2` and `B3` while the index is open |
| shipped build | `game/src/client/IndexScreen.luau:462-477` | `watchRespawns` | re-applies the suspension on `CharacterAdded` | close the panel and restore movement | a spawn event causing a control change is what `response.controlEverAffected: false` exists to prevent |

**Withdrawn from round 1:** the request that `screens` change `IndexSurface`'s extent, and the
disjointness requirement against `Pressable_BUY1/2/3`.

## Acceptance criteria

1. Every instance named `Pressable_BUY1`, `Pressable_BUY2`, `Pressable_BUY3` and
   `Pressable_INDEX` has a `ZIndex` strictly greater than `IndexSurface.ZIndex` and than the
   `ZIndex` of every descendant of `IndexSurface`.
2. `navigation.purchaseWhileOpen.geometry.mustNotIntersectPanel` is exactly `["Pressable_INDEX"]`
   and is equal to `screens[index].geometry.mustNotIntersect`.
3. `game/src/client/IndexScreen.luau` contains zero writes to any `Humanoid` property, and
   `navigation.suspension.humanoidWrite` is `false`.
4. Firing `CharacterAdded` while the panel is open leaves `IndexSurface.Visible == false` and the
   player's controls enabled.

## Not decided here

The panel's extent, anchor and internal layout (`screens`, whose geometry this sheet adopts).
Cluster rects, group order and every pixel of HUD geometry (`composition`). The touch-target
floor, the safe-area inset and the platform keepout regions (`viewport`). Which physical input
closes the panel on each device, and where focus lands — sheet `03`. Notice dwell, queueing and
stacking (`notices`); this sheet fixes only their z-order relative to the panel. The coincident
beat order and the 0.35 s onset separation (`core-loop/02`, inherited). The server tick rate
(architecture). What `plots.advance` builds (`plots`).
