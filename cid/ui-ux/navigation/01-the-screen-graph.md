# 01 — The screen graph

**Domain:** ui-ux/navigation · **Category:** UI/UX · **Wave:** 5 · **Revised round 1** (RR-1, RR-2)

## Decision

**Two nodes, two edges, and both lists are closed.** `hud` is persistent and is never entered or
exited; `index` is an overlay opened and closed by one control, `Pressable_INDEX`, which toggles
and is the **only** way in or out. That control is **present from join and inert until the first
reveal** — it is `composition.groups[collection].node`, so it is a readout carrying the collection
count with `Active`, `Selectable` and `AutoButtonColor` all false, and it becomes interactive on
the first snapshot holding a Find. The graph is identical at every area ordinal, including past
area 8.

## Why

The brief contains **no sentence behind any edge in this graph** (index gap N1): its screen table
is untagged, three of its four rows are void, and it names no entry point for anything. The one
line that reaches this sheet is *"how the index is first surfaced"*, left open to **UI/UX +
Onboarding** `[brief: soft]` ← `02-GAMEPLAY.md`. Onboarding handed its half back — *"which surface
offers it is not mine; that it does not exist before the first Find is."*

**Round 1 reversed my first ruling, and the reversal is right.** I ruled the entry control
*absent* before the first reveal. `composition.groups[collection]` fuses the collection count into
`Pressable_INDEX` — one node, one box — which is the half of the reported playtest defect closed
by deletion (`Pressables.luau:480` writes the find noun onto the index button while
`hud.brief.json` puts a `FINDS` readout in the same cluster, so the developer saw two boxes both
reading *Finds* `[research: cid/_playtest.md]`). Under that fusion my ruling deletes a readout
`firstSession` requires **present at join with value `0`**. Absence loses.

**But the defect I ruled against is still real, and the fusion closes it by a better mechanism.**
My objection was never to the node existing; it was that an eight-year-old presses a visible
button in the first minute and **nothing at all happens**, with `rejectionCueOnFailedPrecondition`
at `"none"` and an explanatory tooltip banned `[brief: binding]` ← `00-CORE.md` audience. Under
`hud/02.presence.byGroup[collection]` the node before the lift *"is a readout: `Active` false,
`Selectable` false, no press states, no fill distinct from any other readout"*. **There is nothing
that affords a press, so there is no press that fails.** That satisfies `onboarding/04`'s intent —
no way in exists — without deleting a required readout, and it is the answer I should have found.

**Presence and interactivity are two different fields, and that is the whole reconciliation.**
`input.verbs[openIndex].precondition` stays `"none"`: every activation of the control opens the
panel. What is withheld is the control's *interactivity*, not the verb's precondition and not the
node's presence. Three keys now say three non-overlapping things about one instance —
`composition` says where it is, `firstSession` says what it reads, `navigation` says what it does.

**The `areas` node is dead, and it is dead three times over** `[brief: soft]` ← `04-PRESENTATION.md`
row 3, which category gap G3 requires a ruling on rather than a skip. `depths.areas[].unlock` is
`"previousAreaComplete"`; `plots.openings` is `alwaysOpen: true`, `barrierInOpening: false`,
`studsBetweenParts: 0`; `meta/04` makes the next area *"enterable at the instant one completes,
with no threshold, no cooldown and no travel worth measuring"*. There is no destination to pick,
no gate to satisfy and no distance to skip. `theme/setting/02` adds that **no view of the whole
works exists**, so a map would have to invent a survey the fiction forbids `[brief: binding]` ←
`00-CORE.md`, *"the smallest game that still gives every creative area real work"*.

**Ordinal invariance.** `endgame` forbids an end screen, a congratulation and a completion
percentage, and a post-terminal bay is a depth-4 bay drawn from the same chunk family. So no node
appears, disappears or changes kind at any ordinal, and `navigation` holds no field keyed by one.
Stated as a field so a builder cannot infer a "you finished" surface from silence `[cid: decided]`.

**Zero player-facing strings are coined here**, so there is no ` ```coinage ` block. The fused
node's label and value formats are `composition`'s (`Finds`, `Parts`, `{found} / {total}`); the
panel's contents are `screens`'. Naming either from a navigation sheet would give one string two
owners.

### The closed non-node list

A candidate is on this list because something already decided it away. Seventeen rows; the list
is closed, and adding a node is a revision against this sheet.

| candidate | not a node because |
|---|---|
| `areas` / map / travel / fast-travel | `depths.areas[].unlock: "previousAreaComplete"`; `plots.openings.alwaysOpen: true`, `barrierInOpening: false`, `studsBetweenParts: 0`; `meta/04` — the player walks in, so there is nothing to navigate. `theme/setting/02` forbids a view of the whole works. |
| `shop` / store / offer surface | ruling R-4 removed the in-game store; `products.F19` forbids naming, showing or pricing a product on any in-game surface. |
| `upgrades` screen | it is the HUD's `bottomRight` cluster (`composition.groups` upgradeValue / upgradeReach / upgradePace), drawn over live play, never opened or closed. |
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

Category gap G2 (error and system copy) resolved to a notice rather than a screen (`feedback/03`),
so no node is added this wave. The rule below stays in the key so the next candidate is checked
rather than argued about.

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
          "latchSource": "countFound(snapshot.found) > 0",
          "latchSourceIsNot": "theFoundMapHasKeys",
          "liftedBy": "beat:firstReveal",
          "reSuppressible": false,
          "liftIsSilentAndStill": true,
          "newSaveFields": 0,
          "visibilityMechanism": "IndexSurface.Visible, permitted because IndexSurface is not a composition.groups[].node nor a descendant of one"
        },
        "compositionOwnedBy": "screens"
      }
    ],
    "entryControl": {
      "forNode": "index",
      "instance": "Pressable_INDEX",
      "isAlso": "composition.groups[collection].node",
      "inputRole": "index",
      "cluster": "topLeft",
      "geometryOwnedBy": "composition",
      "labelOwnedBy": "composition",
      "toggles": true,
      "isTheOnlyExit": true,
      "separateCloseControlExists": false,
      "separateCloseControlWithdrawnBecause": "input.gameDrawnPressables is 4 and screens/01 refused the node; screens[index].geometry.mustNotIntersect keeps this control clear on every viewport, so one drawn exit is guaranteed reachable",
      "presenceRule": "present from join in composition.presence state 'present'; never 'absent'; no module writes Visible on it or on any descendant",
      "interactivityRule": "Active false, Selectable false, AutoButtonColor false, acceptsActivated false until the first snapshot in which countFound(snapshot.found) > 0; latched, never re-suppressed",
      "beforeTheLiftItReadsAs": "a readout with no press states and no fill distinct from any other readout",
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
        "reachableBeforeFirstRevealBecause": "the control is non-interactive, not because the verb is gated; there is no press for the precondition to reject"
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
      { "id": "upgradesScreen", "because": "the upgrade readouts and their controls are the bottomRight cluster of composition, never opened or closed." },
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
      "appliesTo": "any surface a later domain proposes; the G2 error surface resolved to a notice this wave and adds none",
      "mustSatisfy": [
        "it declares a node id and at least one edge in this key, with a trigger and a precondition",
        "it does not occlude or disable any of the four instances in input.pressable.roles",
        "it suspends nothing: navigation.suspension applies to the index node alone",
        "it is exited by a drawn control the player activates, never by a timer and never by a beat",
        "it adds no game-drawn pressable, since input.gameDrawnPressables is 4",
        "it does not raise maxOpenNodes above 1 without a stated concurrency row"
      ]
    }
  }
}
```

## Pushing back

**`cid/gameplay/onboarding/04-run-one-withholds.md`, the ruling *"the panel and whatever surface
offers a way into it are absent together and lift together."*** I overrule the word **absent** for
the entry surface only, and keep the panel's absence exactly as ruled. The reason is that the same
key requires the collection count **present at join with value `0`**, and once
`composition.groups[collection]` fuses the count into `Pressable_INDEX` those two requirements are
about one instance: `firstSession` now contradicts itself, and only one half can hold. I keep the
half that is a readout the player must see, and satisfy the other half's *intent* — no way in
exists before the first Find — through `Active: false` and `Selectable: false` rather than through
deletion. Nothing else in that sheet moves: the latch, the beat, the one-way lift, the ban on a
lift animation and a lift sound, and `newSaveFields: 0` all hold, because both surfaces still
share one latch and neither needs storage.

## Consequences for other work

**Run-one withholding (`firstSession`, `gameplay/onboarding/02` and `/04`).** **My round-1 request
to add a fourth `withheld` entry is withdrawn.** What replaces it is a wording correction, in the
table below: the entry surface is withheld by *interactivity*, not by presence. No new field, no
new save field, no change to the latch.

**Persistent-surface composition (`composition`, ui-ux/hud).** The fusion is adopted, not
contested. Two things ride on it. `groups[collection].interactive` is `true` only from the first
snapshot with a Find, which `hud/02.presence.byGroup[collection].interactiveFrom` already carries.
And `input.gameDrawnPressables` stays 4 with the fused node counted once — a control that is also
a readout is still one control.

**Index-panel composition (`screens`).** Its refusal of a close control is **ratified**, and its
`geometry.mustNotIntersect: ["Pressable_INDEX"]` is promoted from a courtesy to a load-bearing
invariant: with the close control dropped, that node is the only exit from the only openable
surface, so a panel that covers it traps the player. Bar (a).

**Object and instance representation (`architect/sheets/06-representation.md`).** My round-1
request for `Visible = false` is withdrawn. `Pressable_INDEX` is created **non-interactive**
instead, and no module writes `Visible` on it.

**Store UI (`offerSurface`).** Row 4 of the brief's screen table is that sheet's to strike; this
sheet strikes row 3 (`areas`) and records row 2 (`upgrades`) as HUD, closing category gap G3.

### Revision requests issued

| against | file | field | current | required | why |
|---|---|---|---|---|---|
| `firstSession` | `cid/gameplay/onboarding/04-run-one-withholds.md` | `withheld[collectionPanel]` prose | *"the panel and whatever surface offers a way into it are absent together"* | *"…are unusable together and become usable together"*; the entry surface is withheld by interactivity, the panel by presence | the entry surface is now `composition.groups[collection].node` and carries a readout required present at join; see `## Pushing back` |
| `firstSession` | same | `withheld[collectionPanel].latchSource` | corrected 2026-08-01 to *at least one entry is true* | ratified; carried as `countFound(snapshot.found) > 0` in both `navigation` and `composition` | two builders already read `next(found) ~= nil` and got a panel that lifts at join |
| `representation` | `architect/sheets/06-representation.md` | `pressable` row, `Pressable_INDEX` | created interactive from join | created with `Active`, `Selectable`, `AutoButtonColor` false; `Visible` never written | a drawn, pressable, silent control in minute one; `hud/02` bans the `Visible` write outright |
| shipped build | `game/src/client/IndexScreen.luau:27-44` | the `available` latch | reconciles `input` and `firstSession` inside a client module, and says so itself | the latch stays; its source becomes `countFound(snapshot.found) > 0` and it drives `Pressable_INDEX.Active` / `.Selectable`, not a silent early return alone | the module names this reconciliation as its own invention with no owner; this sheet is the owner |

**Withdrawn from round 1:** the request to add `firstSession.withheld.indexControl`, and the
request that `representation` create `Pressable_INDEX` with `Visible = false`.

## Acceptance criteria

1. `navigation.nodes` holds exactly 2 entries with ids `hud` and `index`; `navigation.edges`
   holds exactly 2 with ids `openIndex` and `closeIndex`; `navigation.notNodes` holds 17 entries
   and every one carries a non-empty `because`.
2. On a save where `countFound(snapshot.found) == 0`, the instance `Pressable_INDEX` exists with
   `Active == false`, `Selectable == false` and `AutoButtonColor == false`, and `game/src/`
   contains zero writes to `.Visible` on `Pressable_INDEX` or any of its descendants.
3. `navigation.ordinalInvariant` is `true`, and no key or value anywhere in `navigation` contains
   an area ordinal or the substring `areas[`.
4. This sheet contains zero ` ```coinage ` blocks, and no value in `navigation` is a string that
   is rendered to a player.

## Flagged to the developer

The brief is silent on every edge in this graph (gap N1), so the entry-point ruling is
`[cid: decided]`. Two live alternatives were considered and both are now closed by other sheets:
absence before the first Find (deletes a required readout under the fusion) and a separate close
control inside the panel (a fifth game-drawn pressable against `input`). **Recommendation: the
ruling as written** — one control, present, inert, then live. Reversing it is one field in
`entryControl.interactivityRule`.

## Not decided here

The fused node's label, value formats, cluster order and geometry (`composition`). The panel's
extent, anchor and internal layout (`screens`). **Which physical input triggers the `closeIndex`
edge on each device class, and where focus goes** — sheet `03`, which closes that edge's trigger
set. What may be open beside the index, what the body and the world do while it is open, and the
z-order between the panel and the pressables — sheet `02`. The error surface's copy and channel
(`notices`, which took both halves of G2). The offer path that replaces the deleted `shop` row
(`offerSurface`).
