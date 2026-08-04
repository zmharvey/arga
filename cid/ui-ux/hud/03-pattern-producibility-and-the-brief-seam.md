# 03 — Pattern producibility and the brief seam

**Domain:** ui-ux/hud · **Category:** UI/UX · **Wave:** 5 · **Revision 2** (R2-1, R2-3)

## Decision

**Two realisation routes, both legal, and route B ships today with zero `ui-forge` changes.**
Route A is one node per group and needs seven compiler edits. **Route B nests each control inside
its own group's `Readout_*` frame**, at an explicit `LayoutOrder` that puts it last, carrying the
affordability word in its own `Text`. Route B is the active route until A lands. And
`ui-forge/briefs/hud.brief.json` becomes an artifact emitted from `composition` by `bridge`. No
`manifest` block.

## Why

**Route A: not producible today, either way.** `readout()` emits `class: 'Frame'` unconditionally
(`hud-overlay.mjs:74-76`) with two text children at most, and no variant axis reaches interactivity
`[research: repo — ui-forge/src/compose/patterns/hud-overlay.mjs, read this run]`. Two adjacent
*cluster siblings* is worse than impossible: line 288 builds one cluster per key and `:289-291`
pushes a second frame **also named `Cluster_bottomRight`**, which `HudBinding.luau:539` and
`Pressables.luau:182` each resolve by `FindFirstChild` with no tiebreak. All three upgrade readouts
already carry `cluster: "bottomRight"`, so adding `actions` collides immediately.

**Route B, and why nobody saw it: a control does not have to be a sibling of a cluster.** With
`layout: "corners"`, `readout()` gives each group a `Readout_*` `Frame` with its own vertical
`UIListLayout` and `auto: 'xy'` (`hud-overlay.mjs:77, 94-99`). A `TextButton` parented **into that
frame** becomes a row of it, placed by the frame's own layout, with no `Position` and no
`AnchorPoint` written by anybody. That is adjacency inside one group node, produced by the shipped
compiler, and it satisfies `composition.rules.oneNodePerGroup`. `[cid: decided]`

**It becomes the last row only if somebody says so, which revision 1 got wrong (R2-1).**
`applyLayout` sets `SortOrder = Enum.SortOrder.LayoutOrder` (`UIBuilder.luau:190`) and `buildNode`
numbers spec children from 1 (`:544-547`), while `Instance.new` leaves `LayoutOrder` at **0** — so
an unnumbered button sorts **above** the label and value, and a builder following revision 1's
prose would have got the opposite of what it asserted. The control's `LayoutOrder` is the count of
spec children the pattern emits into that group node, plus one: **4** for the collection group
(icon, label, value) and **3** for each upgrade group (label, value; the shipped brief gives the
three upgrade readouts no `icon`). `LayoutOrder` joins `Size` and `MinSize` in route B's carve-out.
`[research: repo — ui-forge/src/emit/runtime/UIBuilder.luau, ui-forge/briefs/hud.brief.json, read
this run]` `[cid: decided]`

**The affordability word renders on the control's own `Text`, which costs no Instance (R2-3).**
`readout()` emits at most `ReadoutIcon`, `ReadoutLabel` and `ReadoutValue` — there is no third text
child — so revision 1's `ReadoutState` had nowhere to render on the active route, and `Ready` /
`Short` / `Max` exist precisely because `input.pressable.affordabilityByColourAlone` is `false` and
no key supplied a second channel. Under route B the row reads **label / level / control**, and the
control says the cost and the state: `"480 Ready"`. That is the arrangement a purchase control
should have had anyway — the thing you press states its price — and `ReadoutState` survives as
route A's node only. The **collection** group's control carries an empty `Text`: the count above it
is already its label, `onboarding/03` `T5` forbids an instruction, so its affordance is elevation
and stroke, which are shape channels and not colour. `[cid: decided]`

**Route B closes the reported defect on both halves.** The three buy buttons sit inside the three
upgrade rows rather than mid-screen, and `Pressable_INDEX` sits inside `Readout_Finds` rather than
beside it, which deletes the second box reading *Finds* (`Pressables.luau:480` against
`hud.brief.json:15`). It **avoids** all four confirmed capability faults rather than fixing them:
`content.actions` stays absent so the duplicate cluster never exists; `actionButton()` is never
called so the 52-against-70/120 floor never applies; `Pressables.luau:433` already sets its own
`UISizeConstraint.MinSize`; and nothing reads `maxSize`.

**What route B costs, stated rather than buried.** `Instance.new("TextButton")` and
`Instance.new("UISizeConstraint")` stay in `Pressables`, so four of my retirements are deferred.
`pressables` writes `Size`, `MinSize` and `LayoutOrder` on its own control node — the carve-out
from `memberPositionIsDerived`, expiring the day `U4` lands. And **route B does not survive the
casing fix without `F3` closed first**: node names must come from `composition.groups[].node` on
both sides, because `HudBinding.luau:404-406` uppercases the label and `hud-overlay.mjs:76` does
not. That is build work, not a compiler change, and it is required either way.

**Route B is also the shape under which Navigation's original rule holds as written**, since
`Pressable_INDEX` is a separate child of `Readout_Finds` and can draw nothing while the count stays
present. Only route A needs the one-field change sheet `01` files.

**A capability claim survives, and it is why route A is still worth building.** No `MinSize` is
written anywhere in the emitter (`applyConstraints`, `UIBuilder.luau:224-237`, reads only
`node.maxSize`), and `to-luau.mjs:54-57` serialises a `UDim2` as `[sx, ox, sy, oy]` so `maxSize[2]`
is the **X offset** — the cluster ceiling is scale-only, resolves to `math.huge`, and
**`HUD_CLUSTER_MAX_WIDTH_SCALE = 0.46` has never applied on Roblox.** Under route B a client module
supplies the floor; under route A the brief must, and it cannot.
`[research: repo — both files, read this run]`

**`U6` survives `variant.anchor` moving to `edge`.** `CoreUISafeInsets` clears the top bar and
device cutouts, **not the platform's touch controls**
`[research: https://create.roblox.com/docs/reference/engine/enums/ScreenInsets]`, so the
bottom-right cluster sits inside the `jumpSmall` band `y ∈ [H-90, H-20]` on both routes. `U7` is
what `composition.anchors[noticeStack]` needs: `slotHost(name)` hard-codes
`layout: { align: 'stretch' }` (`hud-overlay.mjs:217-224`), so every child of `Slot_hudTop` is full
width and would cross the top-left cluster.

**Who owns the brief (gap H7/G12).** No module should: a hand-written brief is a prompt at a seam,
and *"seams are derivations, never prompts"* `[research: repo — CLAUDE.md, read this run]`.
`bridge` emits it on the `ok && --emit` gate that already writes `GameConfig.luau` — the same route
`theme/vocabulary/03` asked for `emit-terms.mjs`.

## Pushing back

**Against `cid/gameplay/mechanics/03-device-parity.md` and `architect/sheets/06-representation.md`,
which both say the pressable readout is *"a default to change, not a capability to add."*** For
route A it is a capability, on three verified counts: `readout()` emits a `Frame` with no
interactive variant in the declared parameter space; `actions` in `corners` emit a duplicate node
name two shipped modules resolve without a tiebreak; and no `MinSize` path exists, so the touch
floor cannot be expressed by any brief. **Their conclusions stand** — the HUD is buildable, the
purchase path is a pressable, R-1 is unaffected — and route B is the evidence: it needs nothing
from the compiler.

```json
{
  "amends": "composition",
  "requested_by": "cid/ui-ux/hud/03-pattern-producibility-and-the-brief-seam.md",
  "realisation": {
    "activeRoute": "B",
    "switchToAWhen": "U1 through U5 have landed in ui-forge",
    "bothRoutesSatisfy": ["rules.oneNodePerGroup", "rules.memberPositionIsDerived, with route B's three stated carve-outs", "invariant: no controlNode has a cluster frame or the ScreenGui as its Parent"],
    "routes": [
      {
        "id": "A",
        "name": "pressable readout, one node per group",
        "producibleToday": false,
        "requires": ["U1", "U2", "U3", "U4", "U5"],
        "groupNode": "composition.groups[].nodeByRoute.A — the TextButton itself",
        "controlNode": "the same node",
        "affordabilityWordRendersIn": "ReadoutState, a third TextLabel child emitted by U1",
        "createdBy": "ui-forge",
        "pressablesRole": "resolve four node names, set Selectable and ZIndex, connect Activated, debounce",
        "navigationImpact": "navigation/01.entryControl.presenceRule needs the one-field change hud/01 requests, because the control and the count are one instance"
      },
      {
        "id": "B",
        "name": "nested control inside the group frame",
        "producibleToday": true,
        "requires": [],
        "groupNode": "composition.groups[].nodeByRoute.B — the Readout_* Frame hud-overlay already emits: Readout_Finds, Readout_Shards, Readout_Value, Readout_Reach, Readout_Pace, plus ProgressGroup",
        "controlNode": "a TextButton parented INTO that frame, named Pressable_INDEX or Pressable_BUY1/2/3",
        "createdBy": "pressables",
        "placement": "the frame's own vertical UIListLayout places it, sorted by LayoutOrder",
        "layoutOrder": {
          "rule": "the number of spec children the pattern emits into that group node, plus one",
          "why": "UIBuilder.luau:190 sets SortOrder to LayoutOrder and :544-547 numbers spec children from 1, while Instance.new defaults LayoutOrder to 0 — an unnumbered control sorts ABOVE the label and value",
          "values": [
            { "group": "collection",   "specChildren": ["ReadoutIcon", "ReadoutLabel", "ReadoutValue"], "controlLayoutOrder": 4 },
            { "group": "upgradeValue", "specChildren": ["ReadoutLabel", "ReadoutValue"],                "controlLayoutOrder": 3 },
            { "group": "upgradeReach", "specChildren": ["ReadoutLabel", "ReadoutValue"],                "controlLayoutOrder": 3 },
            { "group": "upgradePace",  "specChildren": ["ReadoutLabel", "ReadoutValue"],                "controlLayoutOrder": 3 }
          ],
          "iconNote": "the collection and currency readouts carry an icon in the shipped brief and the three upgrade readouts do not; if an icon is added or removed the control's LayoutOrder moves with the count",
          "check": "every controlNode's LayoutOrder is strictly greater than every sibling's, and no controlNode has LayoutOrder 0"
        },
        "affordabilityWordRendersIn": {
          "upgradeGroups": "the controlNode's own Text — '{cost} Ready' / '{cost} Short' / 'Max'; costs no Instance",
          "collectionGroup": "empty string; the count above it is its label, onboarding/03 T5 forbids an instruction, and the affordance is elevation and stroke",
          "correctedInRevision2": "revision 1 pointed elements[upg*-state].node at ReadoutState, which readout() does not emit and route B does not create, so the second affordability channel had nowhere to render"
        },
        "sizing": "AutomaticSize X with Size = UDim2.new(0, 0, 0, viewport.classes.<class>.minTargetPx) and UISizeConstraint.MinSize = (minTargetPx, minTargetPx), set by pressables because ui-forge has no minSize path",
        "carveOut": "route B is the only case in which a module outside ui-forge may write Size, MinSize or LayoutOrder, and only on its own controlNode; expires when U4 lands",
        "zIndex": 20,
        "briefUnchanged": "content.actions stays absent, so the duplicate Cluster_bottomRight is never emitted and actionButton() is never called",
        "closesDefect": "the three buy buttons sit inside the three upgrade rows; Pressable_INDEX sits inside Readout_Finds, which deletes the second box reading Finds",
        "requiresFirst": "F3 — both HudBinding and Pressables must resolve composition.groups[].node instead of deriving a name from a label, or the casing fix breaks every readout",
        "deferredRetirements": ["Instance.new(\"TextButton\")", "Instance.new(\"UISizeConstraint\")", "the Size write", "the MinSize write", "the LayoutOrder write"],
        "stillRetiredUnderB": ["measureClusterWidthScale", "HUD_CLUSTER_MAX_WIDTH_SCALE", "HUD_CLUSTER_FALLBACK_WIDTH_SCALE", "layoutButtons", "BUTTON_WIDTH_SCALE", "BUTTON_HEIGHT_PX", "MIN_TOUCH_TARGET_PX", "AFFORDABLE_SUFFIX", "UNAFFORDABLE_SUFFIX", "MAX_LEVEL_TEXT"],
        "navigationImpact": "navigation/01.entryControl.presenceRule is satisfiable as written: Pressable_INDEX is a separate child, so it can draw nothing while the count stays present"
      }
    ]
  },
  "producibility": {
    "verdict": "route A not producible today; route B producible today with no ui-forge change",
    "requiredChanges": [
      { "id": "U1", "file": "ui-forge/src/compose/patterns/hud-overlay.mjs", "function": "readout(r, opts)", "change": "when r.pressable is set, emit class 'TextButton' named r.node instead of a Frame named from the label, carry actionButton's states and motion blocks, and emit a third text child ReadoutState when r.state is present", "forRoute": "A" },
      { "id": "U2", "file": "ui-forge/src/compose/patterns/hud-overlay.mjs", "function": "hudOverlay(), corners branch, lines 288-291", "change": "route content.actions into byCluster under a.cluster instead of children.push(cluster('bottomRight', ...)); emit at most one node per cluster key; assert no two children of Root share a name", "forRoute": "A", "alsoDefensive": "the collision is latent under route B only because the brief has no actions; the assert is worth having either way" },
      { "id": "U3", "file": "ui-forge/src/compose/patterns/hud-overlay.mjs", "function": "actionButton(a) and the new pressable readout", "change": "replace the hard-coded 52x52 and at.mobile 56x56 with a minSize taken from the brief per breakpoint, carrying a tablet entry as well as mobile", "forRoute": "A" },
      { "id": "U4", "file": "ui-forge/src/emit/runtime/UIBuilder.luau", "function": "applyConstraints(inst, theme, node), lines 224-237", "change": "also read node.minSize and set UISizeConstraint.MinSize; separately, honour the scale components of maxSize instead of reading only index 2 and index 4", "forRoute": "A", "why": "MinSize is written nowhere in the emitter, so no floor is expressible; maxSize in scale resolves to math.huge, which is why the 0.46 ceiling has never applied on Roblox" },
      { "id": "U5", "file": "ui-forge/src/compose/patterns/hud-overlay.mjs", "function": "meta.validateContent(c)", "change": "require node, role and cluster on every pressable readout; reject a readouts[] entry with no cluster under layout 'corners' instead of defaulting it to topLeft; reject two entries claiming one node name", "forRoute": "A" },
      { "id": "U6", "file": "ui-forge/src/compose/patterns/hud-overlay.mjs", "function": "cluster(key, children, dir)", "change": "accept a per-cluster keepout offset supplied by the brief from viewport.keepoutRects, instead of one ANCHOR_INSET scalar per anchor mode", "forRoute": "A and B", "why": "at variant.anchor edge the bottom-right cluster sits inside the jumpSmall band y[H-90,H-20]; CoreUISafeInsets clears the top bar and device cutouts, not the platform's touch controls" },
      { "id": "U7", "file": "ui-forge/src/compose/patterns/hud-overlay.mjs", "function": "slotHost(name), lines 217-224", "change": "take the slot's layout alignment from the brief instead of hard-coding align 'stretch'", "forRoute": "A and B", "why": "composition.anchors[noticeStack] needs a bounded-width plate inside Slot_hudTop; a stretched child spans the full width and crosses the top-left cluster" }
    ],
    "notRequired": [
      { "id": "G7", "claim": "hud-overlay must vary an individual readout's presence by state", "verdict": "withdrawn", "why": "hud/02 makes presence a runtime property of an unconditionally emitted node" }
    ],
    "ifRefused": {
      "appliesTo": ["U1", "U2", "U3", "U4", "U5"],
      "outcome": "route B ships and composition is fully realisable; nothing about the key changes and the reported defect is closed",
      "costsCarriedForward": ["five deferred retirements in Pressables.luau", "the Size, MinSize and LayoutOrder carve-out", "no compiler-side guard against a second node claiming one name"],
      "notRefusable": ["U6", "U7"],
      "notRefusableWhy": "U6 is a live bar-(a) overlap with the platform jump button on both routes; U7 is the only thing standing between feedback/01's notice stack and a full-width plate over the collection group",
      "defaultOutcomeIsRefusal": "ui-forge pattern work has no owner in the build order (architect/06), so route B is what actually ships unless somebody is assigned"
    }
  },
  "briefSeam": {
    "path": "ui-forge/briefs/hud.brief.json",
    "status": "generated artifact",
    "generatedFrom": "composition",
    "generatorRequestedAs": "bridge/emit-hud-brief.mjs",
    "gate": "the same ok && --emit gate that writes GameConfig.luau and docs/BUILD-ORDER.md",
    "ownedBy": "contract-and-seam work (whoever owns bridge/schema.mjs and bridge/merge.mjs)",
    "handEditForbidden": true,
    "check": "regenerating leaves git diff empty",
    "secondRequestAgainstOneOwner": "theme/vocabulary/03 already asked the same owner for bridge/emit-terms.mjs on the same gate",
    "ifRefused": "hud.brief.json stays a hand-written file with no owner and no key, and composition describes it rather than sourcing it; say so out loud rather than leaving it implied"
  },
  "buildReportFindings": [
    { "id": "F1", "where": "ui-forge/src/compose/patterns/hud-overlay.mjs:288-291", "finding": "two sibling frames named Cluster_bottomRight when content.actions is non-empty; all three upgrade readouts already carry cluster bottomRight", "playerVisible": true, "twoBuildersWouldDiverge": true },
    { "id": "F2", "where": "ui-forge/src/emit/runtime/UIBuilder.luau:230-236 with to-luau.mjs:54-57", "finding": "maxSize expressed in scale resolves to math.huge; the 0.46 cluster ceiling is inert on Roblox", "playerVisible": false, "twoBuildersWouldDiverge": true },
    { "id": "F3", "where": "game/src/client/HudBinding.luau:404-406 and :667 against hud-overlay.mjs:76", "finding": "one side uppercases the label to build the node name and the other does not; fixing the casing violation is what triggers it", "playerVisible": true, "twoBuildersWouldDiverge": true, "routeBlocking": "both routes; must land before or with the casing fix, never after" },
    { "id": "F4", "where": "game/src/client/HudBinding.luau:142-149", "finding": "a stale comment calling the per-cent sign a reported gap; allowedPattern has admitted it since 2026-08-01", "playerVisible": false, "twoBuildersWouldDiverge": false },
    { "id": "F5", "where": "ui-forge/src/theme/palettes.mjs:150 with UIBuilder.luau:482", "finding": "serif-ui gives the numeric role a font of MerriweatherBold, which is not an Enum.Font member; indexing Enum.Font with a missing name RAISES rather than returning nil, so the `or Enum.Font.Gotham` fallback never runs. readout() types every ReadoutValue as numeric (hud-overlay.mjs:113), so under fantasy-ornate every HUD value node throws inside buildNode", "playerVisible": true, "twoBuildersWouldDiverge": false, "ownedBy": "Art and Visuals — UI Art", "carriedNotFixed": true, "note": "recorded here because this category's every readout is what breaks, and because it lands on the same build step as F3" }
  ]
}
```

## Consequences for other work

- **Build work takes route B and can start now.** Four `TextButton`s parented into four `Readout_*`
  frames at `LayoutOrder` 4 / 3 / 3 / 3, the affordability word on each purchase control's own
  `Text`, `F3`'s node-name fix, ten symbols deleted from `Pressables.luau`, and no `ui-forge`
  change. That is the whole of closing the reported defect. **`F3` and `F5` land on the same build
  step and both are total failures of the readouts; take them together.**
- **`ui-forge` pattern work** takes `U1`–`U7`, of which only `U6` and `U7` are not refusable, and
  neither is route-A-specific. `U4` unblocks every other domain's touch target.
- **Art & Visuals — UI Art** owns `F5`. It is not mine to fix and it is my whole surface that
  breaks, so it is recorded rather than absorbed.
- **Contract-and-seam work** takes `bridge/emit-hud-brief.mjs` alongside `theme/vocabulary/03`'s
  `emit-terms.mjs`, both on the `ok && --emit` gate.
- **Navigation work** gets the useful half of the coordination: under route B its `presenceRule`
  is satisfiable as written, and only route A needs the one-field change sheet `01` files.
- **Device-viewport work (`viewport`)** supplies `classes.<class>.minTargetPx` — which route B
  reads straight into a `UISizeConstraint` — and the `keepoutRects` entry `U6` reads.
- **Notice work (`notices`)** depends on `U7`.
- **The final cross-category pass** should deduplicate this wave's ten-odd compiler requests before
  wave 6 adds more; `U3` and `U4` overlap `platform/01`'s table.

## Acceptance criteria

1. Under route B, every game-drawn pressable's `Parent` is the `Readout_*` frame of its own group,
   its `LayoutOrder` is strictly greater than every sibling's and is never 0, and
   `game/src/client/` contains zero writes to `Position` or `AnchorPoint` on any node.
2. Under route B, each of `Pressable_BUY1/2/3` has non-empty `Text` matching
   `^[0-9,]+ (Ready|Short)$` or exactly `Max`, and `Pressable_INDEX` has `Text` of `""`.
3. `hudOverlay()` emits no two nodes with the same `name` anywhere in one tree, for a brief with
   `content.actions` populated and `layout: "corners"`.
4. `ui-forge/briefs/hud.brief.json` is produced by a named script on the `--emit` gate and
   regenerating it leaves `git diff` empty.

## Not decided here

Every element, group, cluster, label, format, node name, `zIndex`, `groupIndex`, the `noticeStack`
rect and the `focusRing` — sheet `01`, which holds `composition`. Presence, reserved extent and the
endgame substitution — sheet `02`. The touch floor's value, the safe-area instrument, the keepout
figures and the per-cluster budget — `viewport`. How `bridge/emit-hud-brief.mjs` is written —
contract-and-seam work. The font that currently throws, and every colour, ramp and token —
Art & Visuals, UI Art. Whether `modal-grid` changes — it does not, on my authority. Whether
`Pressables.luau` is regenerated or hand-edited — build-stage work.
