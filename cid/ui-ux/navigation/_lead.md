# Navigation — domain index

**Category:** UI/UX · **Wave:** 5 · Reads: `HANDOFF.md`, `CONCEPT.md`, `00-CORE.md`,
`01-FOUNDATION.md`, `02-GAMEPLAY.md`, `03-META.md`, `04-PRESENTATION.md`, `OPEN.md`;
`cid/ui-ux/_category.md`, `cid/_contract.md`, `cid/_state.md`, `cid/_digest.md` (rows 13–27);
`cid/gameplay/mechanics/02-verb-roster.md`, `/05-response-contract.md`,
`cid/gameplay/onboarding/04-run-one-withholds.md`, `cid/gameplay/meta/04-the-depth-ladder.md`,
`/06-plot-arrangement.md`, `cid/theme/vocabulary/04-coinage-intake.md`,
`architect/sheets/06-representation.md`, `ui-forge/src/compose/index.mjs`,
`game/src/client/IndexScreen.luau`, `/Input.luau`, `/Pressables.luau`.

## The contract key

**`navigation` does not exist.** `cid/_contract.md` holds 25 keys and none of them is a screen
graph; no proposed key in the wave-2/3 queue is either. **I own no existing key and propose
exactly one.** What it would hold: the node set and the edge set with per-edge trigger and
precondition; the closed list of things that are deliberately *not* nodes; per node, whether it
is full-screen or overlay, whether it occludes input, and what it suspends; the concurrency
matrix (what may be open beside what); and per device class, the close path and the focus
contract. `cid:verify` warns on a sheet with no data form, so all three sheets below carry a
block: `01` a `provides`, `02` and `03` an `amends`, following `gameplay/onboarding/04`'s
precedent — *"one key admits exactly one owning sheet"*.

## What the brief gave me

| constraint | tag |
|---|---|
| *"Deriving the full screen set is UI's job"* + a four-row screen table, `04-PRESENTATION.md` | untagged → `[brief: soft]`. Three of its four rows are gone: `shop` by R-4, `upgrades` is HUD, `areas` is decided in sheet `01`. |
| *"`areas` \| priority 2 \| moving between areas by depth"*, `04-PRESENTATION.md` | `[brief: soft]`, and **priority 2 is out of scope** (`03-META.md`, `[I assumed — the ordering]` → hard as a gate) |
| *"**Input: movement only.** No aiming, clicking, or ability buttons. One thumb."*, `02-GAMEPLAY.md` | `[brief: soft]` ← `[you accepted: step 6 Q3]`, **already overruled once by R-1**, contained to one input class, two verbs, four controls. I may not widen it. |
| *"**8–14, mobile-heavy, short sessions**"*, `00-CORE.md` | `[brief: binding]` ← `[you chose: R1 Q4]`. The band binds; the `~70/25/5` ratio is `[brief: soft]` and uncorroborated. |
| *"**There is no failure state** … **Zero tension is deliberate**"*, `02-GAMEPLAY.md` | `[brief: soft]`. No "are you sure", no confirm step, no dead end. |
| *"the **smallest game that still gives every creative area real work**"*, `00-CORE.md` | `[brief: binding]` ← `[you chose: R1 Q3]`. A node exists because something needs it, never to fill the graph. |
| `input`: `travelRequiredToPurchase: "none"`, `indexScreenSuspendsMovement: true`, `gameDrawnPressables: 4`, `keyboardAcceleratorAllowed/Required` true/false, `gamepadSelectable: true`, `rejectionCueOnFailedPrecondition: "none"`, `verbs[openIndex].precondition: "none"` | `[brief: binding]` as an approved key. The verb list is closed; I do not widen it. |
| `response`: `controlEverAffected: false`; `R5` *"no modal, panel or screen opened, focused or dismissed by any beat"*; nothing on `notice` may be *"dismissible-only, focusable, or block a click-through"* | approved key |
| `firstSession`: the panel is `presentAtJoin: false`, `liftedBy: "beat:firstReveal"`, latched; `suppressionForbidden` bans `reSuppression`, `liftAnimation`, `liftSound`, `explanatoryTooltip` | approved key |
| `depths.areas[].unlock: "previousAreaComplete"`; `plots.openings`: `alwaysOpen: true`, `barrierInOpening: false`, `studsBetweenParts: 0` | approved keys |
| `vocabulary`: title case, `maxLabelChars` 14, `allowedPattern`, 8 banned words | approved key |

## What the brief did not give me

Six gaps. None is filled here.

| # | gap | routed to |
|---|---|---|
| N1 | **The brief never contemplates a surface being *opened*.** Its screen table is untagged, lists no entry point for anything, and three of its four rows are now void. There is no brief sentence behind any edge in this graph. | `01` |
| N2 | **`indexScreenSuspendsMovement` is one boolean with no semantics.** Nothing states whether "movement" includes the camera, jump, the server clearing tick, the tool, or snapshot updates. `IndexScreen.luau` decided four of those in comments. | `02` |
| N3 | **Nothing says what happens to an open surface when the world changes under it.** A completion notice, a bay being built, a respawn, a snapshot arriving. `response` `R5` forbids a *beat* dismissing it and stops there. | `02` |
| N4 | **The brief says nothing about closing anything, on any device.** "One thumb" is an input-count statement, not a dismissal rule. | `03` |
| N5 | **No key states whether a purchase survives an open index.** `core-loop/01` and `input`'s "modal" both apply and disagree; see the contradiction table. | `02` |
| N6 | **G3 (category): the brief's screen table is partly false.** Row 3 (`areas`) is mine to rule on so verification does not read the absence as an omission. | `01` |

## Why 3 sheets

I own one key, so the floor and the ceiling are both one manifest sheet. The two extras exist
because `navigation` carries three decisions a builder makes at three different moments, and one
of them is the only thing in this domain that reaches the stopping rule's bar (a) — **a player
who opens the index and cannot spend has lost the game's only currency sink**. Sheet `01` is
topology: what is a node, what is deliberately not, and what the edges are. Sheet `02` is
simultaneity: two things true at once, and what the body and the world do meanwhile — which is
not a property of any node and cannot be stated inside one. Sheet `03` is the device split: three
classes, two of which have their conventional back input reserved by the platform, which is a
sourced constraint that shapes the value rather than being it. I considered folding `03` into
`01` and rejected it: the close path is the one part of this domain that is not the same decision
on all three devices, and burying it in a topology sheet is how a mobile-heavy audience ends up
with a keyboard-shaped exit. I considered a fourth sheet for post-terminal navigation and
declined — `endgame` forbids an end screen and the graph is identical at every area ordinal, so
that is one row inside `01`, not a decision.

| # | sheet | must decide |
|---|---|---|
| 01 | `the-screen-graph` | Name every node and every edge, and **close both lists**. Two nodes: the persistent HUD (always present, never entered or exited) and the collection index. Rule explicitly, with a reason each, that these are **not** nodes: an `areas` / map / travel screen (`meta/04` unlocks a bay on `previousAreaComplete` and `plots.openings` is `alwaysOpen: true`, `barrierInOpening: false`, `studsBetweenParts: 0` — the player walks in, so there is nothing to navigate); a store (R-4, `products.F19`); a hub, title, pause, settings or confirm screen; a back stack or tab bar; and the `notice` channel, which `response` makes non-focusable and click-through and is therefore a channel, not a node. Decide the index's entry point (which surface offers the way in — `onboarding/04` states plainly this is yours), whether the index pressable **toggles** or a separate close control exists, and rule on the edge precondition `IndexScreen.luau` invented without an owner: `input.verbs[openIndex].precondition` is `"none"` but `firstSession.withheld.collectionPanel` withholds the panel until the first reveal, so a press before the first Find is currently a silent no-op on a button drawn from join — say whether that stands, and whether a present-but-inert button satisfies `onboarding/04`'s *"absent together and lift together"* or contradicts it. State that the graph does not change at any area ordinal, including past area 8. Carry the `manifest` block providing `navigation`. Any player-facing string you name needs a ` ```coinage ` block with `coins`, `renderable`, `kind`, `wave`, `because`, plus `requestsPath` and `surface`. |
| 02 | `concurrency-and-suspension` | Decide what may be open at once, and what the body and the world do while the index is open. Four things, each as data: **(a)** whether the three purchase pressables stay activatable while the index is open — this is the collision between `input.travelRequiredToPurchase: "none"` plus `core-loop/01`'s *"never gated behind another screen"* and `input`'s own *"modal"*, and `IndexScreen.luau:585` currently sets `frame.Active = true` on a panel at `PANEL_WIDTH_SCALE` 0.9 while asserting it *"covers neither the top-left nor the bottom-right cluster"*, which is false horizontally (0.9 centred spans x ∈ [0.05, 0.95]). **(b)** Exactly what `indexScreenSuspendsMovement` suspends and what it leaves running — camera, jump, the server clearing tick, the tool, snapshot updates — as named fields, not prose; note `response.humanoidWritesAllowed` is exactly `["WalkSpeed"]` and is server-main's, so the suspension may not be a Humanoid write. **(c)** What happens to an open index when a beat fires: `response` `R5` forbids a beat dismissing it, so name the outcome for `setComplete` and `areaComplete` landing while it is open, including the reachable case where the last patch clears on a server tick while the player stands frozen and `plots.advance` builds the next bay behind the panel. **(d)** What a respawn does — `IndexScreen` re-applies the suspension on `CharacterAdded`; closing is the live alternative. Carry an `amends: navigation` block, **not** a second `provides`. |
| 03 | `close-and-focus-by-device` | Decide, per device class (touch, keyboard+mouse, gamepad), what closes the index and where focus goes, against three sourced platform facts: **Escape is exclusively reserved for the Roblox menu and `ContextActionService` ignores every input the CoreScripts registered**, so Escape cannot be the desktop close path; **gamepad B is reported to toggle the Roblox menu**, so B cannot be the only gamepad close path; and **`GuiService:AddSelectionParent` is deprecated**, so the mechanism is `GuiObject.SelectionGroup` with `SelectionBehaviorUp/Down/Left/Right`, whose **default is `Escape` — gamepad selection leaves the group and reaches whatever is behind it** — versus `Stop`, which confines it. Rule: the on-screen close control and whether it is the same node that opened it; whether a tap or click outside the panel closes it (and reconcile that with (a) in sheet `02`); whether a keyboard accelerator exists at all, given `input` allows one, never requires one and forbids it being the only path; which node is selected when the panel opens (`SelectionOrder`, lower first) and where `GuiService.SelectedObject` lands when it closes. `input.minTouchTargetRule` and the platform keepout regions are **Platform & Input's** and you consume them without restating them. Carry an `amends: navigation` block. |

## Where two approved sheets already imply different navigation behaviour

Reported, not resolved. Each is routed to the sheet that must rule.

1. **Purchase reachability versus a modal index.** `input.travelRequiredToPurchase` is `"none"`,
   `input.pressable.roles[purchase].persistent` is true and `core-loop/01` requires buying be
   reachable *"from anywhere in the area with no travel and no area exit"* — while the same
   `input` sheet calls the index *"modal: the character stands still while it is open"*. A modal
   that sinks input is a screen a purchase sits behind. **The shipped code split the difference
   by assertion** and the assertion does not hold at its own width. → `02` (a).
2. **The same collision on gamepad.** `representation` sets `SelectionGroup: true` on the four
   `TextButton`s *"so a gamepad can move between the four"*; the index panel is `Active` and holds
   24 non-selectable slots. With `SelectionBehavior*` at its **default `Escape`**
   `[research: https://devforum.roblox.com/t/new-gamepad-ui-selection-apis/1791278]`, a gamepad
   walks out of the open panel onto the purchase buttons behind it — which is either the fix for
   (1) or a breach of "modal", and no sheet says which. → `03`, consuming `02` (a).
3. **`firstSession` versus `input` + `representation` on the way in.** `onboarding/04` says the
   panel *"and whatever surface offers a way into it are absent together and lift together"*;
   `input` gives `openIndex` `precondition: "none"` and `representation` draws `Pressable_INDEX`
   from join. A button that exists and does nothing is not "absent". `IndexScreen.luau` says so
   itself: *"Neither of those two modules was told to reconcile them, so this one does."* → `01`.
4. **"Dismissible at will" versus `response` `R5`.** `input` makes the index dismissible at will;
   `R5` forbids any beat dismissing it. Together they mean an area completion can fire behind an
   open panel over a frozen player while the next bay is built. Consistent, jointly unhandled,
   and no sheet names the z-order or the outcome. → `02` (c).
5. **A latent third: `response.controlEverAffected: false` versus a verb that suspends
   movement.** Reconciled in prose twice (`representation`, `IndexScreen.luau`) and by no field
   anywhere. → `02` (b), which should carry the reconciliation as data.

## Subjects I considered and deliberately did not assign

For this domain the declined list is the load-bearing half. Each is named so verification reads
it as a ruling and not a hole.

- **A back stack, history or breadcrumb.** One openable node; there is nothing to pop.
- **A hub, title, lobby or main-menu node.** The game opens into play; `firstSession` puts three
  readouts on screen at join and nothing else.
- **A pause or settings node.** The platform's menu is the only one and it is `does_not_own`
  (category row 16). Building a second is inventing a surface to fill the graph, against
  `00-CORE.md`.
- **A store node.** Deleted by R-4 and forbidden by `products.F19`. Store UI states the
  consequence; `01` states only that it is not a node, so the list is closed.
- **An `areas`, map or fast-travel node.** Ruled dead in `01` rather than skipped, per the
  category brief's instruction to rule on candidate 20.
- **An inventory, profile, journal or lore node.** `theme/identity/02`: *"Identity requires no
  surface from you."* `setBonus` and `discovery` each forbid theirs by name.
- **A purchase confirmation or receipt flow.** `input`: *"a confirm or cancel step on a purchase"*
  does not exist; the activation is the confirmation.
- **A first-run or tutorial node.** `onboarding/03` `T6` forbids any unrequested panel.
- **An error node.** G2 is routed to Feedback UI (the surface) and Screens (its copy). If one is
  built it enters this graph, and `01` should say what an added node must satisfy — but inventing
  it here would decide another domain's subject.
- **Panel geometry, z-index, occlusion width, and the touch-target floor.** Screens, HUD and
  Platform & Input respectively. `02` states the *rule* about occluding a purchase control; the
  numbers that satisfy it are theirs.

## Verification note

**Sheet `02` is the one most likely to be contradicted**, by **HUD** (`composition`) and
**Screens** (`screens`). Whether a purchase press survives an open index is a rule I own, but it
is only satisfiable against a realised panel width and a realised cluster geometry, and neither
is mine — `Pressables.luau` is currently *measuring* another module's output at runtime because
no key owns the cluster. If HUD's `composition` places the purchase group where a 0.9-width panel
covers it, my rule and their layout cannot both hold and mine should be read as the requirement.
**Sheet `03` is second**, by **Platform & Input** (`viewport`), which owns gamepad focus order
across four pressables; my contract is where focus *enters and leaves the panel*, theirs is the
order among the buttons. If those two are written as one thing, they collide.

## Research owed

No `must_verify` is attached to this node in `docs/cid-workflow.json`. I fetched anyway, because
`03` cannot be written on reasoning alone and my writer has no fetch tools.

**Fetched and usable:**

- `[research: https://devforum.roblox.com/t/let-developers-temporarily-override-the-escape-key-using-contextactionservice/2021335]`
  — *"the Escape key is exclusively reserved for opening the Roblox menu"*; *"ContextActionService
  ignores all inputs registered by the CoreScripts"*. No staff resolution; still open as of the
  thread's last activity (Nov 2024). **Escape is not available as a close path.**
- `[research: https://devforum.roblox.com/t/roblox-menu-being-toggled-by-the-b-button-on-a-gamepad/639726]`
  — gamepad **B toggles the Roblox menu**; reported as specific to the UWP client and not
  reproducing in Studio, merged by a moderator with no fix. Enough to forbid B as the *only*
  gamepad close path; **not** enough to claim B is reserved on every client, and `03` must say so.
- `[research: https://devforum.roblox.com/t/new-gamepad-ui-selection-apis/1791278]` —
  `SelectionGroup` *"constrain[s] where the UI highlight can move"*; `SelectionBehaviorUp/Down/
  Left/Right` default to **`Escape`** (*"it will then allow selection to 'Escape' the group"*)
  with `Stop` as the confining alternative; `SelectionOrder` picks the initial selection, *"lower
  … prioritized first. The default value is 0."* This is the mechanism sheet `03` must use.
- `[research: https://create.roblox.com/docs/reference/engine/classes/GuiService/AddSelectionParent]`
  — marked **Deprecated**. The pre-2022 selection-group idiom is not the one to spec.
- `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/reference/engine/classes/GuiObject.yaml]`
  — `Active`: *"Determines whether this UI element sinks input."* `Selectable`: *"Determine
  whether the GuiObject can be selected by a gamepad."* `SelectionOrder`, `NextSelectionUp` as
  described. These are the four properties the graph is realised in.
- `[research: https://create.roblox.com/docs/reference/engine/classes/GuiService]` —
  `SelectedObject`, `AutoSelectGuiEnabled`, `MenuIsOpen`, `MenuOpened`/`MenuClosed` exist.
  `MenuOpened` is the one signal that tells a client the platform menu took the screen.
- `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/input/mobile.md]`
  — Roblox's mobile input surface is touch gestures, motion sensors, haptics and on-screen
  buttons. **The Android hardware back button appears nowhere.** So on the largest device class
  there is no platform back input at all, which is why the close control has to be drawn.

**Could not fetch:** `https://create.roblox.com/docs/ui/selection` returned 404, and the rendered
`GuiObject` and `GuiService/SelectedObject` reference pages returned member lists without their
descriptions. Routed around via the creator-docs YAML and the API announcement above.

**`[unverified]`, and it matters to `02`:** whether a `GuiObject` with `Active = true` sinks a
**touch tap** identically to a mouse click on a phone. The YAML says only *"sinks input"*. The
fetch that would settle it is
`https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/ui/...` for the input
propagation page, or a Studio device-emulator test on a phone viewport. Sheet `02` must not
assume the two are the same, because the whole of (a) turns on it for ~70% of the audience.

**Not corroborated and not mine:** the `~70/25/5` device split is `[I assumed]` and uncorroborated
by anything fetched (`cid/_state.md`). `03` rests on the *band* — mobile-heavy, `[brief: binding]`
— and not on the ratio. Corroborating it is Platform & Input's G9.
