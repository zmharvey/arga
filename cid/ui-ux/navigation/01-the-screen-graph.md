# 01 — The screen graph

**Domain:** ui-ux/navigation · **Category:** UI/UX · **Wave:** 5

## Decision

**Two nodes, two edges, and both lists are closed.** `hud` is persistent and is never entered or
exited; `index` is an overlay opened and closed by one control, `Pressable_INDEX`, which toggles.
**That control does not exist before the first reveal** — it is withheld with the panel, latched
by the same condition, so `onboarding/04`'s *"absent together and lift together"* is satisfied
literally rather than by an inert button. The graph is identical at every area ordinal, including
past area 8.

## Why

The brief contains **no sentence behind any edge in this graph** (index gap N1): its screen table
is untagged, three of its four rows are void, and it names no entry point for anything. The one
line that reaches this sheet is *"how the index is first surfaced"*, left open to **UI/UX +
Onboarding** `[brief: soft]` ← `02-GAMEPLAY.md`. Onboarding has already handed its half back —
*"which surface offers it is not mine; that it does not exist before the first Find is"*. So the
entry point is decided here, and the presence rule is inherited.

**The inert-button reconciliation (index contradiction 3), ruled.** Three approved statements
collide: `firstSession.withheld.collectionPanel` is `presentAtJoin: false`,
`input.verbs[openIndex].precondition` is `"none"`, and `representation` draws `Pressable_INDEX`
from join. `IndexScreen.luau:27-44` reconciles them by drawing the button and making `toggle()`
do nothing until the first Find `[research: game/src/client/IndexScreen.luau]`. **That is not
"absent".** It is also a player-noticeable defect at bar (a): `rejectionCueOnFailedPrecondition`
is `"none"` and `suppressionForbidden` bans an explanatory tooltip, so an eight-year-old presses
a visible button in the first minute of play and **nothing at all happens**, with no cue, no
sound and no text permitted to explain it `[brief: binding]` ← `00-CORE.md` audience.

The ruling costs `input` nothing, and this is the part worth stating precisely: **a precondition
is a property of an edge, presence is a property of a node.** `verbs[openIndex].precondition`
stays `"none"` — every press of the control opens the panel, unconditionally, from the first
frame the control exists. What changes is that the control is not drawn yet. Nothing in `input`
is overruled and no field of it moves. What moves is `firstSession` (one new `withheld` entry)
and `representation` (the button is created hidden), both issued as revision requests below.

**The `areas` node is dead, and it is dead three times over** `[brief: soft]` ← `04-PRESENTATION.md`
row 3, which category gap G3 requires a ruling on rather than a skip. `depths.areas[].unlock` is
`"previousAreaComplete"`; `plots.openings` is `alwaysOpen: true`, `barrierInOpening: false`,
`studsBetweenParts: 0`; `meta/04` makes the next area *"enterable at the instant one completes,
with no threshold, no cooldown and no travel worth measuring"*. There is no destination to pick,
no gate to satisfy and no distance to skip. `theme/setting/02` adds that **no view of the whole
works exists**, so a map would have to invent a survey the fiction forbids. A travel screen here
would be a surface built to fill a row in a table `[brief: binding]` ← `00-CORE.md`, *"the
smallest game that still gives every creative area real work"*.

**Ordinal invariance.** `endgame` forbids an end screen, a congratulation and a completion
percentage, and a post-terminal bay is a depth-4 bay drawn from the same chunk family. So no node
appears, disappears or changes kind at any ordinal, and `navigation` holds no field keyed by one.
Stated as a field so a builder cannot infer a "you finished" surface from silence `[cid: decided]`.

**Zero player-facing strings are coined here**, so there is no ` ```coinage ` block. The index
control's label belongs to `composition` (*"the sheet that decides an element names it"*); the
panel's contents belong to `screens`. Naming either from a navigation sheet would give one string
two owners.

### The closed non-node list

A candidate is on this list because something already decided it away. Seventeen rows; the list
is closed, and adding a node is a revision against this sheet.

| candidate | not a node because |
|---|---|
| `areas` / map / travel / fast-travel | `depths.areas[].unlock: "previousAreaComplete"`; `plots.openings.alwaysOpen: true`, `barrierInOpening: false`, `studsBetweenParts: 0`; `meta/04` — the player walks in, so there is nothing to navigate. `theme/setting/02` forbids a view of the whole works. |
| `shop` / store / offer surface | ruling R-4 removed the in-game store; `products.F19` forbids naming, showing or pricing a product on any in-game surface. |
| `upgrades` screen | it is the HUD's bottom-right group (`composition` surfaces 4–5), drawn over live play, never opened or closed. |
| hub / lobby / title / main menu | the game opens into play; `firstSession` puts exactly three readouts on screen at join and nothing else. |
| pause | the platform menu is the only one and it is `does_not_own` (category row 16). There is no failure state to pause out of `[brief: soft]` ← `02-GAMEPLAY.md`. |
| settings / options | `04-PRESENTATION.md` declined the accessibility options pass explicitly; no key holds a setting to change. |
| confirm / "are you sure" / receipt | `input` gives a purchase no confirm or cancel step — the activation is the confirmation. |
| back stack / history / breadcrumb | one openable node; there is nothing to pop. |
| tab bar / nav bar / drawer | one openable node; a tab strip with one tab is furniture, not navigation. |
| the `notice` channel | `response` makes it non-focusable, click-through and never dismissible-only. It is a channel drawn over whatever is present, not a place the player is. |
| the Find reveal | `response` gives it the **world** channel exclusively. It is not a screen and `tone/03` forbids it on the notice channel. |
| inventory / profile / journal / lore | `theme/identity/02`: *"Identity requires no surface from you."* `mechanics/04` gives one tool, welded from spawn, never swapped. |
| set-bonus list / reward preview | `setBonus`: *"no bonus list, no bonus tooltip, no per-set reward preview."* |
| duplicate / "already found" surface | `discovery`: no reachable duplicate exists — no toast, no slot that fills twice, no consolation cue. |
| tutorial / first-run / celebration panel | `onboarding/03` `T6` forbids any unrequested panel, *"which includes a first-Find celebration modal"*; `T5` forbids any first-session-only string. |
| end / completion / 100% screen | `endgame`: no end screen, no congratulation, no completion percentage. |
| leaderboard · daily reward · code entry · trade window · season pass · event banner · rebirth panel | `03-META.md` priority 3, hard as a gate. `rebirth` additionally fails `vocabulary.bannedWords`. |

### If a node is ever added

Category gap G2 (error and system copy) is the one live candidate, and it lands on Feedback UI
and Screens, not here. Inventing it now would decide another domain's subject, so instead this
sheet states what an added node must satisfy — carried in the key as `addNodeRule`, so a new
surface is checked rather than argued about.

```manifest
{
  "provides": "navigation",
  "status": "proposed",
  "value": {
    "ordinalInvariant": true,
    "ordinalInvariantBecause": "endgame forbids an end screen, a congratulation and a completion percentage; a post-terminal bay is a depth-4 bay. No node, edge or field in this key is keyed by an area ordinal.",
    "maxOpenNodes": 1,
    "coinsPlayerFacingStrings": 0,
    "nodes": [
      {
        "id": "hud",
        "kind": "persistent",
        "instance": "the HUD ScreenGui",
        "createdBy": "client-main",
        "enterable": false,
        "exitable": false,
        "fullScreen": false,
        "occludesInput": "none",
        "suspends": [],
        "presence": { "presentAtJoin": true, "latched": false, "latchSource": null },
        "compositionOwnedBy": "composition"
      },
      {
        "id": "index",
        "kind": "overlay",
        "instance": "IndexSurface",
        "createdBy": "index-screen",
        "enterable": true,
        "exitable": true,
        "fullScreen": false,
        "occludesInput": "ownBoundsBelowItsOwnZIndexOnly",
        "suspends": ["characterTranslation", "jump"],
        "presence": {
          "presentAtJoin": false,
          "latched": true,
          "latchSource": "atLeastOneEntryOfTheSnapshotFoundMapIsTrue",
          "latchSourceIsNot": "theFoundMapHasKeys",
          "liftedBy": "beat:firstReveal",
          "reSuppressible": false,
          "liftIsSilentAndStill": true,
          "newSaveFields": 0
        },
        "compositionOwnedBy": "screens"
      }
    ],
    "entryControl": {
      "forNode": "index",
      "instance": "Pressable_INDEX",
      "inputRole": "index",
      "cluster": "topLeft",
      "geometryOwnedBy": "composition",
      "labelOwnedBy": "composition",
      "toggles": true,
      "separateCloseControlExists": true,
      "separateCloseControlOwnedBy": "screens",
      "presenceFollowsNode": "index",
      "presenceRule": "drawn only once nodes[index].presence has lifted; before the lift no instance named Pressable_INDEX is visible in the PlayerGui",
      "extentReservedFromFrameOne": true
    },
    "edges": [
      {
        "id": "openIndex",
        "from": "hud",
        "to": "index",
        "verb": "openIndex",
        "trigger": "activation of Pressable_INDEX while nodes[index] is closed",
        "precondition": "none",
        "preconditionUnchangedFrom": "input.verbs[openIndex].precondition",
        "adjudicatedBy": "client",
        "firesRemote": false,
        "rejectionCue": "none",
        "debounceSeconds": "input.pressable.debounceSeconds",
        "reachableBeforeFirstReveal": false,
        "reachableBeforeFirstRevealBecause": "the control is absent, not because the verb is gated"
      },
      {
        "id": "closeIndex",
        "from": "index",
        "to": "hud",
        "verb": "openIndex",
        "trigger": "any member of navigation.byDevice[<deviceClass>].closePaths",
        "triggerSetClosedBy": "navigation.byDevice",
        "precondition": "none",
        "adjudicatedBy": "client",
        "firesRemote": false,
        "rejectionCue": "none",
        "dismissibleByAnythingElse": false
      }
    ],
    "notNodes": [
      { "id": "areas", "because": "depths.areas[].unlock is previousAreaComplete; plots.openings is alwaysOpen with no barrier and studsBetweenParts 0; meta/04 makes the next area enterable at the instant one completes. theme/setting/02 forbids a view of the whole works." },
      { "id": "shop", "because": "ruling R-4 removed the in-game store; products.F19 forbids naming, showing or pricing a product on any in-game surface." },
      { "id": "upgradesScreen", "because": "the upgrade readouts and their controls are a persistent HUD group, never opened or closed." },
      { "id": "hubOrTitle", "because": "the game opens into play; firstSession puts three readouts on screen at join and nothing else." },
      { "id": "pause", "because": "the platform menu is the only one and this category does not own it; there is no failure state to pause out of." },
      { "id": "settings", "because": "04-PRESENTATION.md declined the options pass; no key holds a setting to change." },
      { "id": "confirmOrReceipt", "because": "input gives a purchase no confirm or cancel step; the activation is the confirmation." },
      { "id": "backStack", "because": "one openable node; there is nothing to pop." },
      { "id": "tabBar", "because": "one openable node; a one-tab strip is furniture, not navigation." },
      { "id": "noticeChannel", "because": "response makes it non-focusable, click-through and never dismissible-only. A channel, not a place." },
      { "id": "findReveal", "because": "response gives it the world channel exclusively; tone/03 forbids it on the notice channel." },
      { "id": "inventoryOrProfileOrJournalOrLore", "because": "theme/identity/02 requires no surface; mechanics/04 gives one welded tool that is never swapped." },
      { "id": "setBonusSurface", "because": "setBonus forbids a bonus list, a bonus tooltip and a per-set reward preview." },
      { "id": "duplicateSurface", "because": "discovery makes no duplicate reachable: no toast, no slot that fills twice, no consolation cue." },
      { "id": "tutorialOrCelebrationPanel", "because": "onboarding/03 T6 forbids any unrequested panel and T5 any first-session-only string." },
      { "id": "endOrCompletionScreen", "because": "endgame forbids an end screen, a congratulation and a completion percentage." },
      { "id": "priority3Surfaces", "because": "03-META.md priority 3 is a hard gate: no leaderboard, daily reward, code entry, trade window, season pass, event banner or rebirth panel, and no space reserved for one." }
    ],
    "addNodeRule": {
      "appliesTo": "any surface a later domain proposes, including the error surface at category gap G2",
      "mustSatisfy": [
        "it declares a node id and at least one edge in this key, with a trigger and a precondition",
        "it does not occlude or disable any of the four instances in input.pressable.roles",
        "it suspends nothing: navigation.suspension applies to the index node alone",
        "it is exited by a drawn control the player activates, never by a timer and never by a beat",
        "it does not raise maxOpenNodes above 1 without a stated concurrency row"
      ],
      "routedTo": ["ui-ux/feedback (the surface)", "ui-ux/screens (its copy)"]
    }
  }
}
```

## Consequences for other work

**Run-one withholding (`firstSession`, currently `gameplay/onboarding/02` and `/04`).** A revision
request, not an edit: the `withheld` list needs a fourth entry for the index control, or
`collectionPanel`'s scope must name both surfaces. Precise form in the table below. Nothing else
about that key moves — the latch, the beat, the ban on a lift animation and a lift sound, and the
zero new save fields all hold unchanged, because both surfaces share one latch.

**Persistent-surface composition (`composition`, ui-ux/hud).** Two requirements. (1) The top-left
cluster must reserve the index control's extent from frame one, so the collection count does not
move when the control lifts — this is `S12`'s rule applied to a fourth element, and
`suppressionForbidden` bans `reflowOnLift`. (2) `input.gameDrawnPressables` stays 4: presence
varies, the count does not.

**Index-panel composition (`screens`).** A close control exists inside the panel and is that
sheet's to draw and position. It carries **no player-facing string** — it is a glyph, so it
cannot fail `vocabulary`'s 14-character ceiling and cannot be the imperative `onboarding/03`
bans. Its rect may not intersect any of the four pressables' rects.

**Object and instance representation (`architect/sheets/06-representation.md`).** `Pressable_INDEX`
is created with `Visible = false` and lifted with the panel. `pressables` still creates four
`TextButton`s; only one of them starts hidden.

**Store UI (`offerSurface`).** Row 4 of the brief's screen table is that sheet's to strike. This
sheet strikes row 3 (`areas`) and records row 2 (`upgrades`) as HUD. Between the two sheets all
four rows are accounted for, which is what category gap G3 asks for.

**Analytics — Funnels.** There is no navigation funnel to instrument beyond one edge pair. If a
panel-open event is wanted it is `openIndex`, it is client-adjudicated and fires no remote today,
and adding one is a change to that domain's key, not to this one.

### Revision requests issued

| against | file | field | current | required | why |
|---|---|---|---|---|---|
| `firstSession` | `cid/gameplay/onboarding/04-run-one-withholds.md` | `withheld` | 3 entries; the index control is not one | add `indexControl`: `presentAtJoin: false`, `liftedBy: "beat:firstReveal"`, `latched: true`, `newSaveFields: 0`, same `latchSource` as `collectionPanel` | its own consequence column requires the panel *and the surface that offers a way into it* be absent together; today only the panel is |
| `firstSession` | same | `withheld[collectionPanel].latchSource` | corrected 2026-08-01 to *at least one entry is true* | ratified, no change; carried in `navigation.nodes[index].presence.latchSource` so a second reader cannot re-derive it | two builders already read `next(found) ~= nil` and got a panel that lifts at join |
| `representation` | `architect/sheets/06-representation.md` | `pressable` row, `Pressable_INDEX` | created from join | created with `Visible = false`; lifted when `navigation.nodes[index].presence` lifts | otherwise the drawn button contradicts `onboarding/04` and presses silently |
| shipped build | `game/src/client/IndexScreen.luau:27-44, 608-619` | the `available` latch | `toggle()` returns silently before the first Find on a drawn button | the control is absent instead; `toggle()`'s no-op path stays only as a guard against a press arriving before `bind()` | the module names this reconciliation as its own invention with no owner; this sheet is the owner |

## Acceptance criteria

1. `navigation.nodes` holds exactly 2 entries with ids `hud` and `index`; `navigation.edges`
   holds exactly 2 with ids `openIndex` and `closeIndex`; `navigation.notNodes` holds 17 entries
   and every one carries a non-empty `because`.
2. On a save where every entry of the snapshot's `found` map is `false`, no `Instance` named
   `Pressable_INDEX` is visible in the PlayerGui — it is either absent or has `Visible == false`.
3. `navigation.ordinalInvariant` is `true`, and no key or value anywhere in `navigation` contains
   an area ordinal or the substring `areas[`.
4. This sheet contains zero ` ```coinage ` blocks, and no value in `navigation` is a string that
   is rendered to a player.

## Flagged to the developer

The brief is silent on every edge in this graph (gap N1), so the entry-point ruling is
`[cid: decided]`. The live alternative was the shipped behaviour: draw `Pressable_INDEX` from
join and let it do nothing for the first thirty seconds of play. **Recommendation: the ruling as
written.** A control that is drawn, pressable and silent is the one interaction in this game a
player can get wrong, in a design whose whole premise is that nothing can be. The cost is one
field in `firstSession` and one property in `representation`.

## Not decided here

The close control's appearance, position, glyph and touch size (`screens`, with `viewport` for
the floor). The index control's label, cluster order and geometry (`composition`). **Which
physical input on which device class triggers the `closeIndex` edge, and where focus goes** —
sheet `03`, which closes that edge's trigger set. What may be open beside the index, what the body
and the world do while it is open, and the z-order between the panel and the pressables — sheet
`02`. Whether an error surface is built at all (Feedback UI and Screens, category gap G2). The
offer path that replaces the deleted `shop` row (`offerSurface`).
