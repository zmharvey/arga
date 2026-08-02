# 03 — Pattern producibility and the brief seam

**Domain:** ui-ux/hud · **Category:** UI/UX · **Wave:** 5

## Decision

**Not producible, either way. Closing the defect needs a `ui-forge` capability change — six of
them, in two files and five functions — not a default plus a regenerated brief.** And
`ui-forge/briefs/hud.brief.json` stops being a source: it becomes an artifact emitted from
`composition` by `bridge`, on the same gate as `GameConfig.luau`. No `manifest` block; this sheet
supplies no values and amends `composition` with the producibility contract.

## Why

**Single node: impossible today.** `readout()` emits `class: 'Frame'` unconditionally
(`hud-overlay.mjs:74-76`), with two text children at most, `ReadoutLabel` and `ReadoutValue`.
There is no third text child, no button class, and no variant axis that reaches one —
`meta.variant` offers `layout`, `readoutStyle`, `bar`, `density`, `anchor`, and none of them is
interactivity `[research: repo — ui-forge/src/compose/patterns/hud-overlay.mjs, read this run]`.
`validateBrief` rejects any brief naming a parameter the compiler cannot produce, so this is not
something a brief can ask for.

**Two adjacent nodes: worse than impossible — it is actively broken.** In `layout: "corners"`,
line 288 builds one cluster per key from the readouts and lines 289-291 then
`children.push(cluster('bottomRight', actions.map(actionButton), 'horizontal'))`. **Two sibling
frames are emitted, both named `Cluster_bottomRight`.** `HudBinding.luau:539` resolves upgrade
rows through `FindFirstChild(CLUSTER_BOTTOM_RIGHT)` and `Pressables.luau:182` measures
`gui:FindFirstChild("Cluster_bottomRight", true)`; both take the first match and neither has a
tiebreak. Which frame each gets is unspecified. It is latent only because the shipped brief
carries no `actions` — **and adding `actions` is the obvious route to closing the defect, so the
bug bites on the fix.** `[research: repo — all three files, read this run]` `[cid: decided]`

**And the pattern's only interactive element cannot legally be a pressable on any touch device.**
`actionButton()` hard-sizes `52×52`, with an `at.mobile` override of `56×56`
(`hud-overlay.mjs:182-183`). The floor is a measurement, not a number:
`minTouchTargetRule: "notSmallerThanPlatformJumpButton"`, and the platform's own source gives
`isSmallScreen = minAxis <= 500`, `jumpButtonSize = isSmallScreen and 70 or 120`
`[research: https://github.com/Roblox/Core-Scripts/blob/master/PlayerScripts/StarterPlayerScripts_NewStructure/RobloxPlayerScript/ControlScript/TouchJump.lua]`.
So the floor is **70 on a phone and 120 on a tablet**, and a tablet resolves to `UIBuilder`'s
`tablet` breakpoint (`maxWidth 1500`), which has no override at all and gets the base 52 against
120. 52 < 70 and 52 < 120: illegal on both touch classes.

**There is no floor to express it with.** `applyConstraints` (`UIBuilder.luau:224-237`) reads
`node.maxSize` and writes `UISizeConstraint.MaxSize`. **`MinSize` is never written anywhere in
the emitter.** A touch floor is therefore not a value a brief can carry, which is the definition
of a capability gap. `[research: repo — ui-forge/src/emit/runtime/UIBuilder.luau, read this run]`

**A second thing that ceiling never did.** `to-luau.mjs:54-57` serialises a `UDim2` as
`[sx, ox, sy, oy]`; `UIBuilder.luau:232` reads `node.maxSize[2]`, which is the **X offset**. The
cluster ceiling is `maxSize: { s: [0.46, null], o: [null, null] }` — scale only — so `maxSize[2]`
is `0`, the branch takes `math.huge`, and **`HUD_CLUSTER_MAX_WIDTH_SCALE = 0.46` has never been
enforced on Roblox at all.** It shaped only the HTML preview. The value `Pressables.luau`
reserved as a width was not merely the wrong kind of number; it was a number with no runtime
effect. `[research: repo — both files, read this run]` `[cid: decided]`

**`modal-grid` shipping `ctaPlacement: "per-item"` is the argument that this is worth building,
not evidence that it exists here.** The same composition is solved in the other pattern — the
axis is declared in `cid/ui-ux/_category.md`'s parameter table and the variant is live in
`ui-forge/src/gallery.mjs:33` `[research: repo — grepped, not read in full, this run]` — which
means the shape is inside `ui-forge`'s design vocabulary and the change is an extension rather
than an invention. It does not make `hud-overlay` able to do it.

**One more producibility problem my own cluster assignment creates, stated rather than left for a
playtest.** `ANCHOR_INSET` is one scalar per anchor mode (`inset` → `base 8`, `mobile 28`), applied
to every cluster. On a phone the jump-button band runs `y ∈ [H-90, H-20]` and `x ∈ [W-95, W-25]`;
a bottom-right cluster inset 28 px from both edges puts its lower 62 px inside that band, against
`mayOverlapPlatformControlRegions: false`. One scalar cannot clear a keepout that exists on one
corner only. The number is `viewport`'s; the per-cluster inset is a pattern change.

**Who owns the brief (gap H7/G12).** `architect/06` records that *"no module in this build order
owns `ui-forge`'s briefs"*. The answer is that no module should: a hand-written brief is a
prompt at a seam, and *"seams are derivations, never prompts"*
`[research: repo — CLAUDE.md, read this run]`. So `bridge` emits it, on the `ok && --emit` gate
that already writes `GameConfig.luau` and `docs/BUILD-ORDER.md` — the same route
`theme/vocabulary/03` asked for `emit-terms.mjs`, which makes this the second request against one
owner rather than a new mechanism. **Ownership is contract-and-seam work; I state the requirement
and the check, and I do not design the emitter.** `[cid: decided]`

## Pushing back

**Against `cid/gameplay/mechanics/03-device-parity.md` and `architect/sheets/06-representation.md`,
which both say the pressable readout is *"a default to change, not a capability to add."*** It is
a capability to add, on three verified counts: `readout()` emits a `Frame` with no interactive
variant in the declared parameter space; `actions` in `corners` emit a duplicate node name that
two shipped modules resolve without a tiebreak; and no `MinSize` path exists in the emitter, so
the touch floor those sheets require cannot be expressed by any brief. Their **conclusions**
stand untouched — the HUD is buildable, the purchase path is a pressable, R-1 is unaffected. What
changes is the cost estimate, and only sheet `01`'s realisation depends on it.

```json
{
  "amends": "composition",
  "requested_by": "cid/ui-ux/hud/03-pattern-producibility-and-the-brief-seam.md",
  "producibility": {
    "verdict": "not producible today, as one node or as two adjacent nodes",
    "requiredChanges": [
      { "id": "U1", "file": "ui-forge/src/compose/patterns/hud-overlay.mjs", "function": "readout(r, opts)", "change": "when r.pressable is set, emit class 'TextButton' named r.node instead of a Frame named from the label, carry actionButton's states and motion blocks, and emit a third text child ReadoutState when r.state is present", "why": "a group's readout and its control must be one Instance (composition.rules.oneNodePerGroup)" },
      { "id": "U2", "file": "ui-forge/src/compose/patterns/hud-overlay.mjs", "function": "hudOverlay(), corners branch, lines 288-291", "change": "route content.actions into byCluster under a.cluster instead of children.push(cluster('bottomRight', ...)); emit at most one node per cluster key; assert no two children of Root share a name", "why": "two sibling Cluster_bottomRight frames are resolved by FindFirstChild with no tiebreak in HudBinding.luau:539 and Pressables.luau:182" },
      { "id": "U3", "file": "ui-forge/src/compose/patterns/hud-overlay.mjs", "function": "actionButton(a) and the new pressable readout", "change": "replace the hard-coded 52x52 and at.mobile 56x56 with a minSize taken from the brief per breakpoint, carrying a tablet entry as well as mobile", "why": "the floor is 70 px on a phone and 120 px on a tablet; a tablet resolves to UIBuilder's tablet breakpoint, which has no override and gets 52" },
      { "id": "U4", "file": "ui-forge/src/emit/runtime/UIBuilder.luau", "function": "applyConstraints(inst, theme, node), the node.maxSize branch at lines 230-236", "change": "also read node.minSize and set UISizeConstraint.MinSize; separately, honour the scale components of maxSize instead of reading only index 2 and index 4", "why": "MinSize is never written anywhere in the emitter, so no floor of any kind is expressible; and maxSize with scale-only values resolves to math.huge, which is why the 0.46 cluster ceiling has never applied on Roblox" },
      { "id": "U5", "file": "ui-forge/src/compose/patterns/hud-overlay.mjs", "function": "meta.validateContent(c)", "change": "require node, role and cluster on every pressable readout; reject a readouts[] entry with no cluster under layout 'corners' instead of silently defaulting it to topLeft; reject two entries claiming one node name", "why": "an unassigned cluster is a placement decision the compiler currently makes and composition owns" },
      { "id": "U6", "file": "ui-forge/src/compose/patterns/hud-overlay.mjs", "function": "the ANCHOR_INSET table and cluster(key, children, dir)", "change": "make the inset expressible per cluster rather than one scalar per anchor mode", "why": "the platform jump-button keepout exists on the bottom-right corner only; one scalar either clears it everywhere and wastes three corners, or clears nowhere" }
    ],
    "notRequired": [
      { "id": "G7", "claim": "hud-overlay must vary an individual readout's presence by state", "verdict": "withdrawn", "why": "sheet 02 makes presence a runtime property of an unconditionally emitted node; the corners branch already maps every content.readouts entry into a cluster with no conditional" }
    ]
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
    "ifRefused": "hud.brief.json stays a hand-written file with no owner and no key, and composition is a description of it rather than its source; say so out loud rather than leaving it implied"
  },
  "retires": [
    { "symbol": "measureClusterWidthScale", "file": "game/src/client/Pressables.luau", "lines": "178-196", "why": "a runtime measurement of another module's output, which its own comment calls a derivation and not a decision; composition supplies node names so nothing needs measuring" },
    { "symbol": "HUD_CLUSTER_MAX_WIDTH_SCALE", "file": "game/src/client/Pressables.luau", "lines": "151", "why": "a ceiling that never applied on Roblox at all (U4), read once as a width and shipped as the 2026-08-01 mid-screen defect" },
    { "symbol": "HUD_CLUSTER_FALLBACK_WIDTH_SCALE", "file": "game/src/client/Pressables.luau", "lines": "171", "why": "the fallback for a measurement that no longer happens" },
    { "symbol": "layoutButtons", "file": "game/src/client/Pressables.luau", "lines": "500-526", "why": "positions are the cluster's UIListLayout's; composition.rules.memberPositionIsDerived forbids a module computing one" },
    { "symbol": "BUTTON_WIDTH_SCALE / BUTTON_HEIGHT_PX", "file": "game/src/client/Pressables.luau", "lines": "120-121", "why": "two of the four [STOP: no value in the contract] literals; sizes come from the emitted node and its minSize" },
    { "symbol": "AFFORDABLE_SUFFIX / UNAFFORDABLE_SUFFIX / MAX_LEVEL_TEXT", "file": "game/src/client/Pressables.luau", "lines": "127-132", "why": "composition.copy supplies Ready, Short and Max" },
    { "symbol": "Instance.new(\"TextButton\") and Instance.new(\"UISizeConstraint\")", "file": "game/src/client/Pressables.luau", "lines": "413-433", "why": "representation: the day hud-overlay grows a pressable readout, pressables.bind resolves four node names instead of creating four Instances" }
  ],
  "buildReportFindings": [
    { "id": "F1", "where": "ui-forge/src/compose/patterns/hud-overlay.mjs:288-291", "finding": "two sibling frames named Cluster_bottomRight when content.actions is non-empty", "playerVisible": true, "twoBuildersWouldDiverge": true },
    { "id": "F2", "where": "ui-forge/src/emit/runtime/UIBuilder.luau:230-236 with to-luau.mjs:54-57", "finding": "maxSize expressed in scale resolves to math.huge; the 0.46 cluster ceiling is inert on Roblox", "playerVisible": false, "twoBuildersWouldDiverge": true },
    { "id": "F3", "where": "game/src/client/HudBinding.luau:404-406 against hud-overlay.mjs:76", "finding": "one side uppercases the label to build the node name and the other does not; the derivation breaks the moment vocabulary.casing title reaches currency.plural", "playerVisible": true, "twoBuildersWouldDiverge": true },
    { "id": "F4", "where": "game/src/client/HudBinding.luau:142-149", "finding": "a stale comment calling the per-cent sign a reported gap; allowedPattern has admitted it since 2026-08-01", "playerVisible": false, "twoBuildersWouldDiverge": false }
  ]
}
```

## Consequences for other work

- **Contract-and-seam work** takes two requests now, not one: `bridge/emit-hud-brief.mjs` and
  `theme/vocabulary/03`'s `emit-terms.mjs`, both on the `ok && --emit` gate. If the answer is no,
  the consequence is stated above and should be recorded rather than absorbed.
- **`ui-forge` pattern work** takes `U1`–`U6`. `U4` is the only one outside `hud-overlay.mjs` and
  it is the one that unblocks every other domain's touch target, not just mine.
- **Device-viewport work (`viewport`)** supplies the two figures `U3` reads and the per-corner
  inset `U6` reads. It also inherits the jump-button overlap above as a live case rather than a
  hypothesis, and my index already concedes the precedence: if the budget and my group count
  disagree, the budget wins.
- **Purchase-control work (`pressables`)** loses seven symbols and roughly two thirds of the
  module. What remains is four `FindFirstChild` calls, four property writes, four `Activated`
  connections and one debounce, which is what `representation` predicted the module would become.
- **Build-stage work** gets `F1`–`F4` as findings, of which `F3` is the one worth acting on
  first: it is a silent total failure of every readout, triggered by a re-casing that is already
  required by an approved key.
- **Screens work** inherits nothing from this sheet directly, but should note that `modal-grid`'s
  `ctaPlacement: "per-item"` is the precedent `U1` follows, so the two patterns end up with one
  vocabulary for one problem.

## Acceptance criteria

1. `hudOverlay()` emits no two nodes with the same `name` anywhere in one tree, for a brief with
   `content.actions` populated and `layout: "corners"` — the case that produces two
   `Cluster_bottomRight` frames today.
2. `UIBuilder.applyConstraints` writes `UISizeConstraint.MinSize` from `node.minSize`; a node
   carrying `minSize` of 70 renders no smaller than 70 px on the `mobile` breakpoint and no
   smaller than 120 on `tablet` when the brief supplies both.
3. `ui-forge/briefs/hud.brief.json` is produced by a named script on the `--emit` gate, and
   running that script leaves `git diff` empty.
4. `game/src/client/Pressables.luau` contains no `measureClusterWidthScale`, no
   `HUD_CLUSTER_MAX_WIDTH_SCALE`, no `Instance.new`, and no assignment to `Position` or `Size`.

## Not decided here

Every element, group, cluster, label, format and node name — sheet `01`, this domain, which holds
`composition`. Presence, reserved extent and the endgame substitution — sheet `02`. The touch
floor's value on each device class, the safe-area instrument, the keepout rectangles and the
per-corner inset figure — `viewport`, `ui-ux/platform/01`; I state that the pattern must be able
to carry them and set none. How `bridge/emit-hud-brief.mjs` is written, and whether the emitter
grows a shared `minSize` helper — contract-and-seam work and `ui-forge` pattern work. Whether
`modal-grid` changes at all — it does not, on my authority. Whether `Pressables.luau` is
regenerated or hand-edited — build-stage work. The rendered appearance of a pressable readout in
any state — Art & Visuals, UI Art, inside `fantasy-ornate`.
