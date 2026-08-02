# 02 — Presence and reserved extent

**Domain:** ui-ux/hud · **Category:** UI/UX · **Wave:** 5 · **Revision 1** (RR-13)

## Decision

**`S12` governs and `S2` is amended: nothing on the persistent surface is ever absent.** A
withheld element is `reserved` — its Instance exists, every transparency inside it is driven to 1,
it is non-interactive, and it occupies its full extent from frame one. Absence is the thing that
reflows, so absence is the one option `firstSession` cannot have while it also bans
`reflowOnLift`. Filed as an `amends` against `composition`; no `manifest` block.

## Why

**The contradiction is inside `firstSession`, not between it and me.** A `UIListLayout` *"is
intended to collapse a `Visible = false` child out of its flow"*, not to hold its space
`[research: https://devforum.roblox.com/t/uilistlayout-uses-space-even-for-invisible-gui-elements/45323]`,
corroborated by a later thread giving the workarounds — `CanvasGroup.GroupTransparency`, driving
transparencies directly, or a visible fully transparent parent
`[research: https://devforum.roblox.com/t/bypassing-uilistlayout-filling-invisible-elements/2496680]`.
So `S2`'s *no instance at all* and `suppressionForbidden`'s *no `reflowOnLift`* are already
incompatible with each other, before `S12` is consulted. The internally consistent pair is
`{S12, reflowOnLift}`; `S2` is the outlier and it loses.

**`S2` loses nothing it was written to protect.** Its intent is that nothing of a withheld row is
on screen — no placeholder, no padlock, no greyed row, no outline. All four are satisfied by a row
whose every transparency is 1, which is exactly the mechanism `HudBinding.collectFade` already
ships and enumerates: background, text, text-stroke, image and `UIStroke`
`[research: repo — game/src/client/HudBinding.luau:307-367, read this run]`. The only thing an
absent Instance additionally buys is unreadability by a client script, and that buys nothing here:
a withheld row's cost is `upgradeCost(def, 0)`, which any client reads out of `GameConfig`
regardless. `[cid: decided]`

**The ruling does not rest on the engine's current behaviour, and that is deliberate.** My index
records the collapse-versus-reserve question as `[unverified]` — a 2017 staff reply and a 2023
thread agree on the intent and neither is a current normative statement. **Reserving explicitly is
correct under both branches**, because `reservedExtent` becomes a stated field rather than a
dependency on what a layout happens to do with a hidden child.
`[research owed: the UIListLayout reference page's own behaviour section on hidden children, or the creator-docs markdown for content/en-us/ui/ layout guidance, which 404'd for my lead this run]`

**A reserved interactive group must also stop being pressable, and the shipped code does it the
one way my ruling forbids.** `Pressables.luau` writes `.Visible` at **three** lines — `:471`
(purchase buttons hidden at bind), `:485` (`indexButton.Visible = true`) and `:588` (the
per-snapshot write) `[research: repo — read this run; :485 added in revision 1, found by
verification]`. Under `composition`'s one-node-per-group realisation a purchase row is a child of
`Cluster_bottomRight` and the collection group is a child of `Cluster_topLeft`, so `Visible`
collapses either out of its vertical layout and slides its siblings — the precise failure
`reflowOnLift` names. Presence therefore has three properties, not one: transparency,
interactivity, and extent.

**Category gap G7 is moot rather than blocking, and I state why rather than reinterpret it.**
`onboarding/04` raised *"`hud-overlay` cannot vary the presence of an individual readout by
state"* as a blocker. Under this ruling the pattern is never asked to: every element is emitted
unconditionally into the brief and presence is a runtime property of the emitted node. The
requirement on the pattern reduces to one line — **it must emit every element in `composition`
unconditionally and must never gate a node's existence on a content flag** — and `hudOverlay()`'s
corners branch already does exactly that, mapping every entry of `content.readouts` into a cluster
with no conditional
`[research: repo — ui-forge/src/compose/patterns/hud-overlay.mjs:264-291, read this run]`. So the
second of the two `ui-forge` changes `onboarding/04` predicted is **not needed**; only the
pressable readout is, and that is sheet `03`'s. `[cid: decided]`

**Reserved extent is per group and is not boilerplate.** It is only owed where growth would move a
neighbour. `currency` grows leftward from a `[1,0]` anchor into empty screen and reserves nothing;
the three upgrade groups sit in one vertical stack and each reserves a full row whether or not it
has lifted; `collection` reserves the width of its widest reachable string so the `/ 24`
denominator lift moves nothing. `AnchorPoint` *"defines the origin point from which an object's
position and size change"*, which is why the anchor decides whether a reserve is owed
`[research: https://create.roblox.com/docs/ui/position-and-size]`.

**The row unit is a `floor`, not a `ceiling`, and revision 1 says so with the real field name.**
Revision 0 cited `viewport.touchTargetFloorPx`, which does not exist. The field is
`viewport.classes.<class>.minTargetPx`, tagged `kind: "floor"` by `platform/02`
`[research: repo — cid/ui-ux/platform/01-device-viewport-rules.md:123-159, :206-209, read this run]`.
That tag is load-bearing here rather than cosmetic: `platform/02` exists because a size derived
from a `ceiling` is the exact defect that shipped as the mid-screen purchase buttons, and a
reserved extent is a derived size. A citation a builder cannot resolve is a prompt, not a seam.

**The endgame substitution happens inside one node and adds no element.** `endgame` requires the
finished-parts count to become the headline with currency still on screen without being it;
`theme/fantasy/02` requires *"exactly one figure counting the parts the player has finished, with
no denominator, no fraction and no percent"*. Both hold if `collection-count` substitutes its own
label and format at `found == totalFinds` and the headline flag moves from `currency-value` to it.
Substituting rather than adding is also what stops a finished collection re-promising itself: a
permanent `24 / 24` on screen is the re-promise `theme/fantasy/02` forbids. `[cid: decided]`

## Pushing back

**Against `cid/gameplay/onboarding/04-run-one-withholds.md` `S2` and against the `firstSession`
acceptance criterion 1 carried by `cid/gameplay/onboarding/02-first-minute-beats.md`.** Both
require a suppressed upgrade row to have no Instance in the `PlayerGui`. I overrule that clause and
only that clause. Everything else in the key stands untouched: three present at join, three
withheld, every lift latched and persisted, `reSuppression` banned, `reflowOnLift` banned, a lift
silent and still, and the corrected `latchSource` on the denominator.

```json
{
  "revisionRequest": "cid/gameplay/onboarding/02-first-minute-beats.md",
  "alsoAmends": "cid/gameplay/onboarding/04-run-one-withholds.md",
  "requested_by": "cid/ui-ux/hud/02-presence-and-reserved-extent.md",
  "key": "firstSession",
  "change": [
    { "field": "withheld[*].suppressionMechanism", "from": "no instance in the PlayerGui", "to": "instance present, every transparency driven to 1, non-interactive, full extent reserved" },
    { "field": "acceptanceCriterion1", "from": "a suppressed row has no instance in the PlayerGui at all", "to": "a suppressed row draws nothing: no pixel of it is opaque, it accepts no press, and its extent is unchanged from frame one" },
    { "field": "S2", "from": "no instance at all", "to": "no drawn pixel and no accepted press" }
  ],
  "unchanged": ["withheld membership", "presentAtJoin values", "joinValue values", "latched", "latchSource", "suppressionForbidden.reSuppression", "suppressionForbidden.reflowOnLift", "S6", "S7", "S12"],
  "because": "a UIListLayout collapses a Visible=false child out of its flow, so S2 and reflowOnLift cannot both hold; S2's stated intent (no placeholder, no padlock, no greyed row, no outline) is fully met by the transparency mechanism HudBinding already ships"
}
```

```json
{
  "amends": "composition",
  "requested_by": "cid/ui-ux/hud/02-presence-and-reserved-extent.md",
  "presence": {
    "states": {
      "present":  { "transparencies": "as emitted", "interactive": "per group.interactive", "occupiesExtent": true },
      "reserved": { "transparencies": "every GuiObject, TextLabel, TextButton, ImageLabel, ImageButton and UIStroke in the subtree driven to 1", "interactive": false, "occupiesExtent": true },
      "absent":   { "permitted": false, "why": "absence reflows the cluster, which firstSession.suppressionForbidden bans" }
    },
    "interactivityWhenReserved": { "Active": false, "Selectable": false, "Interactable": false, "AutoButtonColor": false, "acceptsActivated": false },
    "visibleIsForbidden": {
      "statement": "no module may write Visible on a node named in composition.groups[].node or on any descendant of one",
      "why": "Visible=false removes the child from the UIListLayout flow and slides its siblings",
      "supersedes": [
        "game/src/client/Pressables.luau:471 — button.Visible = false at bind",
        "game/src/client/Pressables.luau:485 — indexButton.Visible = true",
        "game/src/client/Pressables.luau:588 — binding.button.Visible = snapshot.rowsRevealed[...]"
      ],
      "alsoSupersedes": "architect/sheets/06-representation.md:290, which specifies the purchase button's Visible as driven by snapshot.rowsRevealed; named rather than revised here, because representation is a technical key with its own owner",
      "replacementWrite": "presence.states[reserved] or [present] applied to the whole group subtree"
    },
    "byElement": [
      { "element": "currency-value",   "joinState": "present",  "liftedBy": null, "latched": null },
      { "element": "collection-count", "joinState": "present",  "valueState": "preDenominator", "liftedBy": "firstSession.withheld[collectionDenominator]", "latched": true, "onLift": "valueState becomes withDenominator" },
      { "element": "area-label",       "joinState": "present",  "liftedBy": null, "latched": null },
      { "element": "area-bar",         "joinState": "present",  "liftedBy": null, "latched": null },
      { "element": "upg1-label",       "joinState": "reserved", "liftedBy": "snapshot.rowsRevealed[upgrades[0].id]", "latched": true },
      { "element": "upg1-level",       "joinState": "reserved", "liftedBy": "snapshot.rowsRevealed[upgrades[0].id]", "latched": true },
      { "element": "upg1-state",       "joinState": "reserved", "liftedBy": "snapshot.rowsRevealed[upgrades[0].id]", "latched": true },
      { "element": "upg2-label",       "joinState": "reserved", "liftedBy": "snapshot.rowsRevealed[upgrades[1].id]", "latched": true },
      { "element": "upg2-level",       "joinState": "reserved", "liftedBy": "snapshot.rowsRevealed[upgrades[1].id]", "latched": true },
      { "element": "upg2-state",       "joinState": "reserved", "liftedBy": "snapshot.rowsRevealed[upgrades[1].id]", "latched": true },
      { "element": "upg3-label",       "joinState": "reserved", "liftedBy": "snapshot.rowsRevealed[upgrades[2].id]", "latched": true },
      { "element": "upg3-level",       "joinState": "reserved", "liftedBy": "snapshot.rowsRevealed[upgrades[2].id]", "latched": true },
      { "element": "upg3-state",       "joinState": "reserved", "liftedBy": "snapshot.rowsRevealed[upgrades[2].id]", "latched": true }
    ],
    "byGroup": [
      { "group": "collection",   "joinState": "present",  "interactiveFrom": "the first snapshot in which countFound(snapshot.found) > 0", "latched": true, "beforeThat": "the node is a readout: composition.groups[collection].affordance.beforeLift, which is zero press affordance rather than a dead button" },
      { "group": "currency",     "joinState": "present" },
      { "group": "areaProgress", "joinState": "present" },
      { "group": "upgradeValue", "joinState": "reserved", "interactiveFrom": "snapshot.rowsRevealed[upgrades[0].id]" },
      { "group": "upgradeReach", "joinState": "reserved", "interactiveFrom": "snapshot.rowsRevealed[upgrades[1].id]" },
      { "group": "upgradePace",  "joinState": "reserved", "interactiveFrom": "snapshot.rowsRevealed[upgrades[2].id]" }
    ],
    "liftIsSilentAndStill": { "tween": "none", "frames": 1, "sound": "none", "particle": "none", "source": "firstSession S6 and S7" }
  },
  "reservedExtent": {
    "unit": "rows, where one row is viewport.classes.<class>.minTargetPx for the live device class plus the pattern's chipPad",
    "unitFieldKind": "floor",
    "unitFieldKindMatters": "platform/02 forbids deriving a size or a reserved extent from a field whose kind is ceiling; minTargetPx is tagged floor, which is why it is the legal source and pressableMaxWidthScale is not",
    "correctedInRevision1": "revision 0 cited viewport.touchTargetFloorPx, which platform/01 does not publish",
    "byGroup": [
      { "group": "upgradeValue", "rows": 1, "constant": true, "widthBasis": "the widest string the group can ever render, from composition.elements[].maxRenderedChars" },
      { "group": "upgradeReach", "rows": 1, "constant": true, "widthBasis": "the widest string the group can ever render" },
      { "group": "upgradePace",  "rows": 1, "constant": true, "widthBasis": "the widest string the group can ever render" },
      { "group": "collection",   "rows": 1, "constant": true, "widthBasis": "the width of '{classPlural}' over '24 / 24', reserved from frame one so the denominator lift changes no geometry" },
      { "group": "currency",     "rows": 1, "constant": true, "widthBasis": "none", "why": "anchor [1,0] with justify end: the value grows leftward into empty screen and moves no neighbour" },
      { "group": "areaProgress", "rows": 2, "constant": true, "widthBasis": "the pattern's fixed 220 px ProgressGroup width" }
    ],
    "byCluster": [
      { "cluster": "bottomRight", "rowsAtZeroMembersPresent": 3, "rowsAtSomeMembersPresent": 3, "rowsAtAllMembersPresent": 3 },
      { "cluster": "topLeft",     "rowsAtZeroMembersPresent": 1, "rowsAtSomeMembersPresent": 1, "rowsAtAllMembersPresent": 1 },
      { "cluster": "topRight",    "rowsAtZeroMembersPresent": 1, "rowsAtSomeMembersPresent": 1, "rowsAtAllMembersPresent": 1 },
      { "cluster": "bottomLeft",  "rowsAtZeroMembersPresent": 2, "rowsAtSomeMembersPresent": 2, "rowsAtAllMembersPresent": 2 }
    ],
    "budgetCheck": "for each cluster, rows x (minTargetPx + chipPad) divided by the viewport short axis is at most viewport.classes.<class>.persistentSurfaceShortAxisShareMax",
    "invariant": "a cluster's reserved extent is a function of its group membership alone and never of any snapshot field"
  },
  "headline": {
    "rule": "exactly one element carries the headline flag at any time; the headline renders one step higher on the type ramp than any other value on the surface",
    "typeRampOwnedBy": "screens",
    "byState": [
      { "state": "default",  "condition": "countFound(snapshot.found) < config.collection.totalFinds", "element": "currency-value" },
      { "state": "terminal", "condition": "countFound(snapshot.found) == config.collection.totalFinds", "element": "collection-count" }
    ],
    "terminalSubstitution": {
      "element": "collection-count",
      "labelBecomes": "Parts",
      "valueFormatBecomes": "{areasFinished}",
      "source": "snapshot.areasFinished",
      "forbidden": ["denominator", "fraction", "percent", "end screen", "congratulation", "completion notice"],
      "currency": "stays on screen, keeps its group, keeps its format, loses the headline flag",
      "groupUnchanged": true,
      "stillOpensTheIndex": true,
      "latched": true,
      "reSuppressionForbidden": true
    }
  }
}
```

## Consequences for other work

- **Whoever holds `firstSession` (`gameplay/onboarding/02`, with `/04`)** takes the revision
  above. It is one clause in three places and nothing else in the key moves. If it is refused, say
  so out loud: refusing it means `reflowOnLift` cannot be honoured on the bottom-right cluster and
  `S12` becomes unimplementable, which is a contradiction inside that key and not a HUD problem I
  can absorb.
- **Purchase-control work (`pressables`)** must stop writing `Visible` at all three lines —
  `:471`, `:485` and `:588`. Its `layoutButtons` comment (*"a hidden button keeps its slot and
  only `Visible` changes"*) is right in intent and wrong in mechanism under one-node realisation.
- **The architect pass** should note that `representation:290` still specifies the banned
  mechanism. I name it rather than revise it: it is a technical key with its own owner.
- **Readout-writing work (`hud-binding`)** keeps `collectFade` unchanged and gains two things: it
  applies to the group node rather than to a readout frame, and it drives the four interactivity
  properties when the group is interactive.
- **Device-viewport work (`viewport`)** now has a consumer for `classes.<class>.minTargetPx` that
  is independent of presence: `Cluster_bottomRight` reserves three rows at every snapshot, so the
  budget check is a constant and never a race with the player's balance.
- **Feedback and notice work (`notices`)** may not position against a changing reserved extent,
  and none changes. All four cluster extents are constant for the whole session, which is what
  makes `composition.anchors[noticeStack]`'s rect checkable once rather than per frame.
- **Store work (`offerSurface`)** should restate its `moment.rowLift` observable, which currently
  describes the `Visible` write this sheet bans (RR-14).
- **Endgame work (`gameplay/meta/07`)** gets its substitution as data and no new surface.

## Acceptance criteria

1. No entry in `composition.presence.byElement` or `.byGroup` has a state of `absent`, and
   `composition.presence.states.absent.permitted` is `false`.
2. `composition.reservedExtent.byCluster[bottomRight]` is 3 at zero, some and all members present;
   a grep of `game/src/client/` finds no assignment to `.Visible` on any node named in
   `composition.groups[].node`, including `Pressables.luau:471`, `:485` and `:588`.
3. With `rowsRevealed` all false, a reserved purchase group renders zero opaque pixels and a press
   on it produces no call to `onActivate`; toggling any one row to true changes the
   `AbsolutePosition` of the other two by zero.
4. At `countFound(snapshot.found) == config.collection.totalFinds`, exactly one element carries the
   headline flag, it is `collection-count`, and its rendered string contains no `/` and no `%`.

## Not decided here

The element inventory, ids, labels, value formats, groups, clusters, orders, node names, `zIndex`,
`groupIndex`, the `noticeStack` rect and the `focusRing` — sheet `01`, this domain, which holds
`composition`. Whether the pattern can produce a pressable readout, the double-`Cluster_bottomRight`
emission, the interim realisation and who owns `hud.brief.json` — sheet `03`. The pixel value of
`minTargetPx`, the safe area, the keepout rects and the per-class budget my extents are measured
against — `viewport`, `ui-ux/platform/01`. The type ramp the headline flag renders through —
`screens`. Which surfaces are withheld and what lifts each — `firstSession`, which I amend in one
clause and otherwise leave whole. Whether a lift is instrumented — Analytics, Funnels. What happens
when the index opens — `navigation`.
