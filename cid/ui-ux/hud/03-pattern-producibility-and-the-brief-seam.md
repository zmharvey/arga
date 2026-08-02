# 03 — Pattern producibility and the brief seam

**Domain:** ui-ux/hud · **Category:** UI/UX · **Wave:** 5 · **Revision 1** (RR-11)

## Decision

**Two realisation routes, both legal, and `route B` ships today with zero `ui-forge` changes.**
Route A is one node per group and needs seven compiler edits. **Route B nests each control inside
its own group's `Readout_*` frame** — one box, not two, produced by the shipped pattern. Route B
is the active route until A lands. And `ui-forge/briefs/hud.brief.json` becomes an artifact
emitted from `composition` by `bridge`. No `manifest` block.

## Why

**Route A: not producible today, either way.** `readout()` emits `class: 'Frame'` unconditionally
(`hud-overlay.mjs:74-76`) with two text children at most, and no variant axis reaches
interactivity — `meta.variant` offers `layout`, `readoutStyle`, `bar`, `density`, `anchor`
`[research: repo — ui-forge/src/compose/patterns/hud-overlay.mjs, read this run]`. And two
adjacent *cluster siblings* is worse than impossible: line 288 builds one cluster per key and
`:289-291` pushes a second frame **also named `Cluster_bottomRight`**, which `HudBinding.luau:539`
and `Pressables.luau:182` each resolve by `FindFirstChild` with no tiebreak. Latent only because
the shipped brief carries no `actions` — and all three upgrade readouts already carry
`cluster: "bottomRight"`, so adding `actions` collides immediately. **It bites on the fix.**

**Route B, and why nobody saw it: a control does not have to be a sibling of a cluster.** With
`layout: "corners"`, `readout()` gives each group a `Readout_*` `Frame` with its own vertical
`UIListLayout` and `auto: 'xy'` (`hud-overlay.mjs:77, 94-99`). A `TextButton` parented **into that
frame** becomes its last row, placed by the frame's own layout, with no `Position` and no
`AnchorPoint` written by anybody. That is adjacency inside one group node, produced by the shipped
compiler, and it satisfies `composition.rules.oneNodePerGroup` as narrowed in revision 1 — a group
under one node, never two siblings of a cluster. `[cid: decided]`

**Route B closes the reported defect on both halves.** The three buy buttons sit inside the three
upgrade rows rather than mid-screen, and `Pressable_INDEX` sits inside `Readout_Finds` rather than
beside it, which deletes the second box reading *Finds* (`Pressables.luau:480` against
`hud.brief.json:15`). It also **avoids** all four confirmed capability faults rather than fixing
them: `content.actions` is never populated so the duplicate cluster never exists;
`actionButton()` is never called so the 52-against-70/120 floor never applies; `Pressables` sets
its own `UISizeConstraint.MinSize` at `:433`, so the missing `minSize` path costs nothing; and no
module reads `maxSize`, so the inert 0.46 ceiling is irrelevant.

**What route B costs, stated rather than buried.** `Instance.new("TextButton")` and
`Instance.new("UISizeConstraint")` stay in `Pressables`, so four of my seven retirements are
deferred. `pressables` also writes `Size` and `MinSize` on its own control node — the single
carve-out from `memberPositionIsDerived`, and it expires the day `U4` lands. And **route B does
not survive the casing fix without `F3` being closed first**: node names must come from
`composition.groups[].node` on both sides, because `HudBinding.luau:404-406` uppercases the label
and `hud-overlay.mjs:76` does not. That is build work, not a compiler change, and it is required
either way.

**Route B is also the shape under which Navigation's original rule is satisfiable as written.**
Under route B `Pressable_INDEX` is a separate child of `Readout_Finds`, so *"no instance named
`Pressable_INDEX` is visible"* holds literally while the count stays present. Under route A the
two are one node and `navigation/01` needs the one-field change sheet `01` requests. **Both routes
therefore work with Navigation; only route A needs it to move.**

**A capability claim survives, and it is why route A is still worth building.** No `MinSize` is
written anywhere in the emitter (`applyConstraints`, `UIBuilder.luau:224-237`, reads only
`node.maxSize`), and `to-luau.mjs:54-57` serialises a `UDim2` as `[sx, ox, sy, oy]` so
`maxSize[2]` is the **X offset** — the cluster ceiling is scale-only, so it resolves to
`math.huge` and **`HUD_CLUSTER_MAX_WIDTH_SCALE = 0.46` has never applied on Roblox.** Under route
B a client module supplies the floor; under route A the brief must, and it cannot.
`[research: repo — both files, read this run]`

**`modal-grid`'s `ctaPlacement: "per-item"` is the argument that route A is worth building, not
evidence that it exists here.** The axis is declared in `cid/ui-ux/_category.md`'s parameter table
and is live in `ui-forge/src/gallery.mjs:33`
`[research: repo — grepped, not read in full, this run]`, so the shape is inside `ui-forge`'s
vocabulary and route A is an extension rather than an invention.

**`U6` survives `variant.anchor` moving to `edge`, restated.** Sheet `01` yields to
`viewport.safeArea.patternInsetVariantForbidden`, and `CoreUISafeInsets` clears the top bar and
device cutouts — **not the platform's touch controls**
`[research: https://create.roblox.com/docs/reference/engine/enums/ScreenInsets]`. At
`anchor: edge` the bottom-right cluster sits at the screen edge, inside the `jumpSmall` band
`y ∈ [H-90, H-20]`. So `U6` is no longer "a per-corner inset" but "a per-cluster keepout offset
the brief supplies from `viewport.keepoutRects`". **Route B does not need it** — `Pressables`
positions nothing, but the *cluster* still overlaps the jump button, so this is a live bar-(a)
defect on both routes and the number is `viewport`'s.

**`U7` is new, and it is what `composition.anchors[noticeStack]` needs.** `slotHost(name)`
hard-codes `layout: { align: 'stretch' }` (`hud-overlay.mjs:217-224`), so every child of
`Slot_hudTop` is full width and would cross the top-left cluster. One line: take the slot's
alignment from the brief.

**Who owns the brief (gap H7/G12).** `architect/06` records that *"no module in this build order
owns `ui-forge`'s briefs"*. The answer is that no module should: a hand-written brief is a prompt
at a seam, and *"seams are derivations, never prompts"*
`[research: repo — CLAUDE.md, read this run]`. `bridge` emits it on the `ok && --emit` gate that
already writes `GameConfig.luau` — the same route `theme/vocabulary/03` asked for
`emit-terms.mjs`, which makes this a second request against one owner rather than a new mechanism.

## Pushing back

**Against `cid/gameplay/mechanics/03-device-parity.md` and `architect/sheets/06-representation.md`,
which both say the pressable readout is *"a default to change, not a capability to add."*** For
route A it is a capability, on three verified counts: `readout()` emits a `Frame` with no
interactive variant in the declared parameter space; `actions` in `corners` emit a duplicate node
name two shipped modules resolve without a tiebreak; and no `MinSize` path exists, so the touch
floor cannot be expressed by any brief. **Their conclusions stand** — the HUD is buildable, the
purchase path is a pressable, R-1 is unaffected — and route B is the evidence: it needs nothing
from the compiler. What changes is only the cost of route A.

```json
{
  "amends": "composition",
  "requested_by": "cid/ui-ux/hud/03-pattern-producibility-and-the-brief-seam.md",
  "realisation": {
    "activeRoute": "B",
    "switchToAWhen": "U1 through U5 have landed in ui-forge",
    "bothRoutesSatisfy": ["rules.oneNodePerGroup", "rules.memberPositionIsDerived (with route B's one stated carve-out)", "invariant: no game-drawn pressable has a cluster frame or the ScreenGui as its Parent"],
    "routes": [
      {
        "id": "A",
        "name": "pressable readout, one node per group",
        "producibleToday": false,
        "requires": ["U1", "U2", "U3", "U4", "U5"],
        "groupNode": "the TextButton itself (Pressable_INDEX, Pressable_BUY1/2/3)",
        "controlNode": "same node",
        "createdBy": "ui-forge",
        "pressablesRole": "resolve four node names, set Selectable and ZIndex, connect Activated, debounce",
        "navigationImpact": "navigation/01.entryControl.presenceRule needs the one-field change hud/01 requests, because the control and the count are one instance"
      },
      {
        "id": "B",
        "name": "nested control inside the group frame",
        "producibleToday": true,
        "requires": [],
        "groupNode": "the Readout_* Frame hud-overlay already emits (Readout_Finds, Readout_Currency, Readout_Value, Readout_Reach, Readout_Pace)",
        "controlNode": "a TextButton parented INTO that frame, named Pressable_INDEX or Pressable_BUY1/2/3",
        "createdBy": "pressables",
        "placement": "the frame's own vertical UIListLayout places it as the last row; no module writes Position or AnchorPoint",
        "sizing": "AutomaticSize X with Size = UDim2.new(0, 0, 0, viewport.classes.<class>.minTargetPx) and UISizeConstraint.MinSize = (minTargetPx, minTargetPx), set by pressables because ui-forge has no minSize path",
        "carveOut": "route B is the only case in which a module outside ui-forge may write Size or MinSize, and only on its own controlNode; expires when U4 lands",
        "zIndex": 20,
        "briefUnchanged": "content.actions stays absent, so the duplicate Cluster_bottomRight is never emitted and actionButton() is never called",
        "closesDefect": "the three buy buttons sit inside the three upgrade rows; Pressable_INDEX sits inside Readout_Finds, which deletes the second box reading Finds",
        "requiresFirst": "F3 — both HudBinding and Pressables must resolve composition.groups[].node instead of deriving a name from a label, or the casing fix breaks every readout",
        "deferredRetirements": ["Instance.new(\"TextButton\")", "Instance.new(\"UISizeConstraint\")", "the Size write", "the MinSize write"],
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
      "costsCarriedForward": ["four deferred retirements in Pressables.luau", "the Size and MinSize carve-out", "no compiler-side guard against a second node claiming one name"],
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
    { "id": "F3", "where": "game/src/client/HudBinding.luau:404-406 and :667 against hud-overlay.mjs:76", "finding": "one side uppercases the label to build the node name and the other does not; the derivation breaks the moment vocabulary.casing title reaches currency.plural, and fixing the casing violation is what triggers it", "playerVisible": true, "twoBuildersWouldDiverge": true, "routeBlocking": "both routes; must land before or with the casing fix, never after" },
    { "id": "F4", "where": "game/src/client/HudBinding.luau:142-149", "finding": "a stale comment calling the per-cent sign a reported gap; allowedPattern has admitted it since 2026-08-01", "playerVisible": false, "twoBuildersWouldDiverge": false }
  ]
}
```

## Consequences for other work

- **Build work takes route B and can start now.** Four `TextButton`s parented into four
  `Readout_*` frames, `F3`'s node-name fix, ten symbols deleted from `Pressables.luau`, and no
  `ui-forge` change. That is the whole of closing the reported defect.
- **`ui-forge` pattern work** takes `U1`–`U7`, of which only `U6` and `U7` are not refusable, and
  neither is route-A-specific. `U4` unblocks every other domain's touch target, not just mine.
- **Contract-and-seam work** takes `bridge/emit-hud-brief.mjs` alongside
  `theme/vocabulary/03`'s `emit-terms.mjs`, both on the `ok && --emit` gate.
- **Navigation work** gets the useful half of the coordination: under route B its
  `presenceRule` is satisfiable as written, and only route A needs the one-field change sheet
  `01` requests. Nothing needs deciding twice.
- **Device-viewport work (`viewport`)** supplies `classes.<class>.minTargetPx` — which route B
  reads directly into a `UISizeConstraint` — and the `keepoutRects` entry `U6` reads. It also
  inherits the jump-band overlap as live on both routes.
- **Notice work (`notices`)** depends on `U7`. Until it lands, a plate inside `Slot_hudTop`
  stretches full width and crosses the collection group, which `composition.anchors` forbids.
- **The final cross-category pass** should deduplicate the ten-odd compiler requests this wave
  produced before wave 6 adds more; `U3` and `U4` overlap `platform/01`'s table.

## Acceptance criteria

1. Under route B, every game-drawn pressable's `Parent` is the `Readout_*` frame of its own group,
   and `game/src/client/` contains zero writes to `Position` or `AnchorPoint` on any node.
2. `hudOverlay()` emits no two nodes with the same `name` anywhere in one tree, for a brief with
   `content.actions` populated and `layout: "corners"`.
3. `UIBuilder.applyConstraints` writes `UISizeConstraint.MinSize` from `node.minSize`; a node
   carrying `minSize` 70 renders no smaller than 70 px on `mobile` and no smaller than 120 on
   `tablet` when the brief supplies both.
4. `ui-forge/briefs/hud.brief.json` is produced by a named script on the `--emit` gate and
   regenerating it leaves `git diff` empty.

## Not decided here

Every element, group, cluster, label, format, node name, `zIndex`, `groupIndex`, the `noticeStack`
rect and the `focusRing` — sheet `01`, which holds `composition`. Presence, reserved extent and the
endgame substitution — sheet `02`. The touch floor's value, the safe-area instrument, the keepout
figures and the per-cluster budget — `viewport`; I state that the pattern must carry them and set
none. How `bridge/emit-hud-brief.mjs` is written — contract-and-seam work. Whether `modal-grid`
changes — it does not, on my authority. Whether `Pressables.luau` is regenerated or hand-edited —
build-stage work. The rendered appearance of a pressable readout in any state — Art & Visuals, UI
Art, inside `fantasy-ornate`.
