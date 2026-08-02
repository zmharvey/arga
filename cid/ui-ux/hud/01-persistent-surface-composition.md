# 01 — Persistent surface composition

**Domain:** ui-ux/hud · **Category:** UI/UX · **Wave:** 5 · **Revision 1** (RR-8, RR-12)

## Decision

**Thirteen elements, six groups, four clusters. A group is the atomic placement unit and is
realised under exactly one node; an element carries no position of its own.** The three upgrade
readouts and the three purchase controls are three groups, not six things, and the collection
count and the index control are one more. `composition` now also carries the four requirement sets
addressed to it — `zIndex` on every group and element, a `noticeStack` anchor with a derived free
region, a surface-wide `groupIndex`, and a `focusRing` — and it arbitrates the two that disagreed.

## Why

**The defect is a missing unit, not a wrong number.** The playtest recorded six boxes where three
belong and the cause on record is *"no contract key owns the composition"*
`[research: repo — cid/_playtest.md, defect 2]`; `Pressables.luau:167-169` says the same from the
other side. Proximity is the mechanism: *"Items close together are likely to be perceived as part
of the same group"*, and proximity **overrides** colour and shape similarity
`[research: https://www.nngroup.com/articles/gestalt-proximity/]`. Two nodes half a screen apart
read as two objects however they are captioned. `[cid: decided]`

**Node names are values in this key, because both derivations are already broken.**
`HudBinding.luau:404-406` resolves `Readout_` + `string.upper(label)`; `hud-overlay.mjs:76` emits
`Readout_${label}` un-uppercased. That resolves today only because the brief ships `SHARDS`
uppercase. The moment `casing: "title"` reaches `currency.plural` — which `theme/vocabulary/01`
already requires — **every readout silently stops updating** (`F3`, confirmed by verification).
`[research: repo — both files, read this run]`

**Rendered case equals stored case.** The evidence against says lowercase costs *"26% more time
for accurate reading than uppercase"* for glanceable isolated words
`[research: https://www.nngroup.com/articles/glanceable-fonts/]`. Overruled: these labels are
static furniture beside a changing number, read once, so label read-time is not the binding cost,
while a second spelling is permanent and is what `theme/vocabulary/03`'s one-spelling invariant
exists to catch. `[cid: decided]`

**H6 stays withdrawn.** `allowedPattern` is `^[A-Za-z0-9 ,.'%%/-]+$`, which admits `%` in both
engines `[research: repo — game/src/shared/GameConfig.luau:1745, read this run]`.
`HudBinding.luau:142-149`'s comment is stale and is build work.

**Affordability is a word, and neither shipped word is legal.** *Buy* is a second-person
imperative, which `theme/tone/01` `P1` forbids and `onboarding/03` `T5` bans as instruction.
**`Ready` / `Short` / `Max`** — three declarative adjectives, distinct first letters and lengths.
Colour is the second channel, never the first. Number formatting: integers, floored, comma-grouped
from four digits, **no `K`/`M`**, because `economy` keeps currency uncapped and `theme/fantasy/02`
requires the finished-parts figure be exact. `[cid: decided]`

### The four requirement sets, folded in (RR-8)

**(a) `noticeStack`: accepted, with a region I derived rather than left to a builder.**
`feedback/01` asked me to refuse out loud if no region satisfies its three keepouts on a phone. It
does not need refusing. On the 896×414 phone viewport (`cli.mjs:45`) the thumbstick capture frame
is `x ∈ [0, 0.4], y ∈ [0.333, 1]`
`[research: https://github.com/Roblox/Core-Scripts/blob/master/PlayerScripts/StarterPlayerScripts/ControlScript/MasterControl/DynamicThumbstick.lua]`,
`jumpSmall` is `x ∈ [0.894, 0.972], y ∈ [0.783, 0.952]`
`[research: https://github.com/Roblox/Core-Scripts/blob/master/PlayerScripts/StarterPlayerScripts_NewStructure/RobloxPlayerScript/ControlScript/TouchJump.lua]`,
and both top clusters are bounded by `viewport.classes.phone.pressableMaxWidthScale` 0.20 to
`x ∈ [0, 0.20]` and `x ∈ [0.80, 1]`. **`x ∈ [0.24, 0.76], y ∈ [0, 0.30]` is disjoint from all four
keepouts and from both top clusters**, and 0.30 × 414 = 124 px holds two plates and a gap.
`[cid: decided]` on the rect; the arithmetic is above and every input to it is banked.

**Feedback's may-overlap list is void under fusion and I restate it by group id (RR-7).** The
collection count *is* `Pressable_INDEX` and the three upgrade readouts *are* `Pressable_BUY1/2/3`,
so four of its five permitted overlaps sat on its own keepout list. The rect above needs none of
them, which is a better answer than releasing one.

**(b) `zIndex`: I arbitrate, and Navigation's value wins.** `feedback/01` stated a *relation*
(`zIndexBelow: "pressable"`, `zIndexAbove: "hudReadout"`), and a relation between 1 and 20 does
not determine whether the notice sits above or below the panel at 10 — which is the whole
question. `navigation/02` stated *values*. **The notice is 30.** Feedback's reason for going below
— not swallowing a tap — is carried by `blocksInput: false` and `Active = false`, which is a
stronger guarantee than z-order, because z-order does not gate input at all. Every group and
element in this key now carries an explicit `zIndex`. `[cid: decided]`

**(c) The single `SelectionGroup` parent: refused out loud, and replaced (RR-9).** The four
interactive groups sit in two clusters, `hud-overlay` emits clusters as siblings of `Root`, so the
only common parent is `Root`, which also holds every readout and the notice slot. I request no
compiler change for it, because the platform has the mechanism:
`GuiService:AddSelectionParent` takes an arbitrary set and needs no shared tree parent
`[research: https://create.roblox.com/docs/reference/engine/classes/GuiService/AddSelectionParent]`,
and `SelectionGroup` is not a `GuiObject` property in the current reference
`[research: https://create.roblox.com/docs/reference/engine/classes/GuiObject]` — which is
`platform/01`'s own finding against `Pressables.luau:423`. `composition` supplies a `focusRing`:
the ordered interactive groups and their four-direction adjacency. **`viewport` sets
`SelectionOrder` and `NextSelection*` from it; I set no focus behaviour.**

**(d) `groupIndex` exists now.** `platform/01.gamepad.selectionOrderRule` reads
`composition.groupIndex` and only `orderInCluster` existed, which repeats across four clusters.
`groupIndex` is surface-wide and stable, 1 to 6; `memberIndexWithinGroup` is on every element.

**`variant.anchor` yields to Platform: `inset` becomes `edge`.** `viewport.safeArea` sets
`ScreenInsets = CoreUISafeInsets` with `ignoreGuiInset: false`, and `ANCHOR_INSET` would
double-count it `[research: https://create.roblox.com/docs/reference/engine/enums/ScreenInsets]`.
My own sheet says I own no pixel, so this is not a contest. **It makes the jump-band problem
worse, not better** — the engine's safe area does not clear the platform's *touch controls* —
which is why sheet `03`'s `U6` survives, restated as a per-cluster keepout offset.

## Pushing back

**Against `cid/ui-ux/navigation/01-the-screen-graph.md`, field `entryControl.presenceRule`.** It
requires that *"before the lift no instance named `Pressable_INDEX` is visible in the PlayerGui"*.
Under fusion that node **is** the collection count, which `firstSession` requires present at join
with `joinValue` `0`, so the rule as written deletes a required readout.

**Navigation's underlying objection is right and is not an objection to fusion.** It rules the
shipped inert button a bar-(a) defect: an eight-year-old presses a thing that looks pressable and
nothing happens, with `rejectionCueOnFailedPrecondition: "none"` and no tooltip permitted. That is
an objection to a **press affordance** with no effect, and `IndexScreen.luau:27-44` earns it,
because it draws a distinct button. Fusion removes the affordance rather than the instance: before
the lift the node is styled identically to the currency readout — no elevation, no stroke, no
press states, `Active` and `Selectable` false. **Nothing reads as a button, so there is nothing to
press expecting a result.** `affordance` is now a checkable property set in this key, so the rule
has something to be written against.

Required change, one field: `presenceRule` becomes *"the instance is present from join as a
readout; no press affordance exists before `nodes[index].presence` has lifted, per
`composition.groups[collection].affordance.beforeLift`"*. That also closes RR-2, because the
`Visible == false` branch disappears with it.

**If Navigation's owner refuses, the fallback is un-fusion and I specify it as data rather than
argue twice** — `groups[collection].unfusedFallback` below is one edit. Its cost is the
developer's own report: a second box reading *Finds* returns to the top-left corner.

```manifest
{
  "provides": "composition",
  "status": "proposed",
  "value": {
    "surface": "hud",
    "pattern": "hud-overlay",
    "brief": { "path": "ui-forge/briefs/hud.brief.json", "generatedFrom": "composition", "handEditForbidden": true },
    "variant": { "layout": "corners", "readoutStyle": "pill", "bar": "chunky", "density": "compact", "anchor": "edge" },
    "anchorVariantNote": "edge, not inset: viewport.safeArea sets ScreenInsets CoreUISafeInsets with ignoreGuiInset false, and ANCHOR_INSET would double-count it (platform/01.safeArea.patternInsetVariantForbidden)",
    "ornament": { "readoutTrim": "none", "barCap": "round" },
    "rules": {
      "memberPositionIsDerived": {
        "statement": "an element's position is its group's position; an element carries no cluster, pos, anchor, offset or size",
        "staticCheck": "no object in composition.elements has any key in [cluster, pos, anchor, offset, size, maxSize]",
        "runtimeCheck": "no module outside ui-forge assigns Position, AnchorPoint or Size to any node named in composition.groups[].node or to any descendant of one"
      },
      "oneNodePerGroup": {
        "statement": "a group is realised under exactly one node; a readout and the control over the same subject sit inside that node, never as siblings of a cluster",
        "clusterSiblingRealisationForbidden": true,
        "narrowedInRevision1": "revision 0 said 'never two siblings'. Two children of one group parent is hud/03's interim route and is permitted; two siblings of a CLUSTER is the shape that produced the defect and stays forbidden",
        "staticCheck": "composition.groups[].node values are unique; every element's node is a descendant path under its own group's node; no game-drawn pressable has a cluster frame or the ScreenGui as its Parent"
      },
      "renderedCaseEqualsStoredCase": {
        "statement": "no persistent string is case-transformed at render",
        "staticCheck": "no client module calls string.upper or string.lower on a value written into a node named in composition"
      },
      "noSecondPlayer": {
        "statement": "every element reads the local player's own snapshot and nothing else",
        "staticCheck": "every composition.elements[].source begins with 'snapshot.', 'config.' or 'derived:'"
      }
    },
    "zOrder": {
      "arbitratedHere": true,
      "requiredScreenGuiZIndexBehavior": "Sibling",
      "layers": [
        { "layer": "hudReadouts",         "zIndex": 1,  "members": "every composition element whose group is not interactive" },
        { "layer": "indexPanel",          "zIndex": 10, "members": "IndexSurface and every descendant", "ownedBy": "screens" },
        { "layer": "gameDrawnPressables", "zIndex": 20, "members": "every composition group with interactive true" },
        { "layer": "notice",              "zIndex": 30, "members": "everything on the notice channel", "ownedBy": "notices" }
      ],
      "resolves": "feedback/01.interaction.realisation.zIndexBelow 'pressable' stated a relation between 1 and 20, which does not determine whether a notice sits above or below the panel at 10; navigation/02 stated values and is adopted",
      "noticeDoesNotSwallowTapsBecause": "notices.interaction.blocksInput false and Active false, which gates input; z-order does not",
      "shippedValueIsWrong": "IndexScreen.luau:134 SURFACE_Z_INDEX 10 against four pressables left at the default 1"
    },
    "anchors": [
      {
        "id": "noticeStack",
        "requestedBy": "feedback/01.anchorGroup",
        "slots": 2,
        "growth": "downward",
        "slotAssignment": "arrivalOrder",
        "memberPositionDerivedFromSlot": true,
        "realisedIn": "Slot_hudTop",
        "rect": { "left": [0.24, 0], "right": [0.76, 0], "top": [0, 0], "bottom": [0.30, 0] },
        "rectForm": "each edge is [scale, offsetPx] against the viewport, engine UDim order, matching viewport.keepoutRects",
        "derivation": "phone 896x414: thumbstick x[0,0.4] y[0.333,1]; jumpSmall x[0.894,0.972] y[0.783,0.952]; topLeft and topRight clusters bounded by viewport.classes.phone.pressableMaxWidthScale 0.20 to x[0,0.20] and x[0.80,1]. The rect is disjoint from all four and from both bottom clusters. 0.30 x 414 = 124 px for two plates and one gap",
        "intersectsNoGroup": true,
        "mayOverlap": [],
        "mayOverlapNote": "feedback/01's may-overlap list named four surfaces that are the four pressables under fusion; this rect needs none of them",
        "refusedOutLoud": false,
        "requiresPatternChange": "U7 in hud/03 — slotHost() hard-codes align 'stretch', so a bounded-width plate is not producible until the slot takes its alignment from the brief"
      }
    ],
    "focusRing": {
      "requestedBy": ["platform/01.gamepad", "navigation/03"],
      "groupParentNode": null,
      "groupParentRefused": "the four interactive groups sit in two clusters and hud-overlay emits clusters as siblings of Root, so the only common parent is Root, which also holds every readout and the notice slot",
      "mechanismInstead": "GuiService:AddSelectionParent takes an arbitrary set and needs no shared tree parent; SelectionGroup is not a GuiObject property in the current reference, which is platform/01's own finding against Pressables.luau:423",
      "order": ["collection", "upgradeValue", "upgradeReach", "upgradePace"],
      "adjacency": [
        { "group": "collection",   "up": null,           "down": "upgradeValue", "left": null, "right": null },
        { "group": "upgradeValue", "up": "collection",   "down": "upgradeReach", "left": null, "right": null },
        { "group": "upgradeReach", "up": "upgradeValue", "down": "upgradePace",  "left": null, "right": null },
        { "group": "upgradePace",  "up": "upgradeReach", "down": null,           "left": null, "right": null }
      ],
      "selectionOrderSetBy": "viewport",
      "panelOpenEntryAndExitOwnedBy": "navigation"
    },
    "clusters": [
      { "id": "topLeft",     "node": "Cluster_topLeft",     "anchor": [0, 0], "stack": "vertical", "groups": ["collection"] },
      { "id": "topRight",    "node": "Cluster_topRight",    "anchor": [1, 0], "stack": "vertical", "groups": ["currency"] },
      { "id": "bottomLeft",  "node": "Cluster_bottomLeft",  "anchor": [0, 1], "stack": "vertical", "groups": ["areaProgress"] },
      { "id": "bottomRight", "node": "Cluster_bottomRight", "anchor": [1, 1], "stack": "vertical", "groups": ["upgradeValue", "upgradeReach", "upgradePace"] }
    ],
    "groups": [
      { "id": "collection", "groupIndex": 1, "cluster": "topLeft", "orderInCluster": 1, "node": "Pressable_INDEX", "class": "TextButton", "zIndex": 20, "interactive": true, "role": "index", "roleIndex": 1, "members": ["collection-count"], "memberOrder": ["collection-count"], "boundTo": "collection",
        "affordance": {
          "beforeLift": { "elevation": 0, "stroke": "none", "statesBlockActive": false, "Active": false, "Selectable": false, "Interactable": false, "readsAs": "identical to the currency readout at the same readoutStyle" },
          "afterLift":  { "elevation": 2, "stroke": "border.subtle", "statesBlockActive": true, "Active": true, "Selectable": true, "Interactable": true },
          "check": "before the lift, the node's elevation, stroke and states properties differ from Readout_Currency's in zero respects"
        },
        "unfusedFallback": {
          "ifNavigationRefuses": true,
          "splitInto": [
            { "id": "collection", "orderInCluster": 1, "node": "Readout_Finds", "class": "Frame", "interactive": false },
            { "id": "index", "orderInCluster": 2, "node": "Pressable_INDEX", "class": "TextButton", "interactive": true, "role": "index", "roleIndex": 1, "label": "Finds" }
          ],
          "statedCost": "a second box reading Finds returns to the top-left corner, which is half of the defect the developer reported"
        } },
      { "id": "currency",     "groupIndex": 2, "cluster": "topRight",    "orderInCluster": 1, "node": "Readout_Currency", "class": "Frame",      "zIndex": 1,  "interactive": false, "members": ["currency-value"], "memberOrder": ["currency-value"], "boundTo": "currency" },
      { "id": "areaProgress", "groupIndex": 3, "cluster": "bottomLeft",  "orderInCluster": 1, "node": "ProgressGroup",    "class": "Frame",      "zIndex": 1,  "interactive": false, "members": ["area-label", "area-bar"], "memberOrder": ["area-label", "area-bar"], "boundTo": "depths" },
      { "id": "upgradeValue", "groupIndex": 4, "cluster": "bottomRight", "orderInCluster": 1, "node": "Pressable_BUY1",   "class": "TextButton", "zIndex": 20, "interactive": true,  "role": "purchase", "roleIndex": 1, "members": ["upg1-label", "upg1-level", "upg1-state"], "memberOrder": ["upg1-label", "upg1-level", "upg1-state"], "boundTo": "upgrades[0]" },
      { "id": "upgradeReach", "groupIndex": 5, "cluster": "bottomRight", "orderInCluster": 2, "node": "Pressable_BUY2",   "class": "TextButton", "zIndex": 20, "interactive": true,  "role": "purchase", "roleIndex": 2, "members": ["upg2-label", "upg2-level", "upg2-state"], "memberOrder": ["upg2-label", "upg2-level", "upg2-state"], "boundTo": "upgrades[1]" },
      { "id": "upgradePace",  "groupIndex": 6, "cluster": "bottomRight", "orderInCluster": 3, "node": "Pressable_BUY3",   "class": "TextButton", "zIndex": 20, "interactive": true,  "role": "purchase", "roleIndex": 3, "members": ["upg3-label", "upg3-level", "upg3-state"], "memberOrder": ["upg3-label", "upg3-level", "upg3-state"], "boundTo": "upgrades[2]" }
    ],
    "elements": [
      { "id": "collection-count", "group": "collection", "memberIndexWithinGroup": 1, "zIndex": 20, "kind": "readout", "node": "ReadoutValue", "labelNode": "ReadoutLabel", "label": "Finds", "labelSource": "config.collection.classPlural", "icon": "find",
        "valueFormatByState": { "preDenominator": "{found}", "withDenominator": "{found} / {total}", "terminal": "{areasFinished}" },
        "labelByState": { "preDenominator": "{classPlural}", "withDenominator": "{classPlural}", "terminal": "Parts" },
        "source": "snapshot.found", "maxRenderedChars": 9 },
      { "id": "currency-value", "group": "currency", "memberIndexWithinGroup": 1, "zIndex": 1, "kind": "readout", "node": "ReadoutValue", "labelNode": "ReadoutLabel", "label": "Shards", "labelSource": "config.currency.plural", "icon": "shard",
        "valueFormat": "{currency}", "source": "snapshot.currency", "maxRenderedChars": 11,
        "reserve": "none", "reserveReason": "topRight anchors at [1,0] and justifies end, so the value grows leftward into empty screen and moves no neighbour" },
      { "id": "area-label", "group": "areaProgress", "memberIndexWithinGroup": 1, "zIndex": 1, "kind": "label", "node": "BarLabel",
        "valueFormat": "{areaLabel} - {percent}% Clear", "source": "snapshot.areaLabel + snapshot.clearedCount / snapshot.areaPatchCount", "maxRenderedChars": 28 },
      { "id": "area-bar", "group": "areaProgress", "memberIndexWithinGroup": 2, "zIndex": 1, "kind": "bar", "node": "Bar", "fillNode": "BarFill", "fillAxis": "x", "widthPx": 220,
        "valueFormat": null, "source": "snapshot.clearedCount / snapshot.areaPatchCount",
        "tween": { "durationFrom": "config.response.beats[patchClear].acknowledgmentBudgetMs", "easing": "quadOut" } },

      { "id": "upg1-label", "group": "upgradeValue", "memberIndexWithinGroup": 1, "zIndex": 20, "kind": "label",   "node": "ReadoutLabel", "valueFormat": "{upgrades[0].label}", "source": "config.upgrades[0].label", "maxRenderedChars": 14 },
      { "id": "upg1-level", "group": "upgradeValue", "memberIndexWithinGroup": 2, "zIndex": 20, "kind": "readout", "node": "ReadoutValue", "valueFormat": "Lv {level}", "source": "snapshot.upgrades[upgrades[0].id]", "maxRenderedChars": 6 },
      { "id": "upg1-state", "group": "upgradeValue", "memberIndexWithinGroup": 3, "zIndex": 20, "kind": "readout", "node": "ReadoutState", "valueFormatByState": { "affordable": "{cost} Ready", "unaffordable": "{cost} Short", "maxed": "Max" }, "source": "derived:upgradeCost(upgrades[0], level) against snapshot.currency", "maxRenderedChars": 14, "primaryChannel": "text", "colourIsSecondaryOnly": true },

      { "id": "upg2-label", "group": "upgradeReach", "memberIndexWithinGroup": 1, "zIndex": 20, "kind": "label",   "node": "ReadoutLabel", "valueFormat": "{upgrades[1].label}", "source": "config.upgrades[1].label", "maxRenderedChars": 14 },
      { "id": "upg2-level", "group": "upgradeReach", "memberIndexWithinGroup": 2, "zIndex": 20, "kind": "readout", "node": "ReadoutValue", "valueFormat": "Lv {level}", "source": "snapshot.upgrades[upgrades[1].id]", "maxRenderedChars": 6 },
      { "id": "upg2-state", "group": "upgradeReach", "memberIndexWithinGroup": 3, "zIndex": 20, "kind": "readout", "node": "ReadoutState", "valueFormatByState": { "affordable": "{cost} Ready", "unaffordable": "{cost} Short", "maxed": "Max" }, "source": "derived:upgradeCost(upgrades[1], level) against snapshot.currency", "maxRenderedChars": 14, "primaryChannel": "text", "colourIsSecondaryOnly": true },

      { "id": "upg3-label", "group": "upgradePace", "memberIndexWithinGroup": 1, "zIndex": 20, "kind": "label",   "node": "ReadoutLabel", "valueFormat": "{upgrades[2].label}", "source": "config.upgrades[2].label", "maxRenderedChars": 14 },
      { "id": "upg3-level", "group": "upgradePace", "memberIndexWithinGroup": 2, "zIndex": 20, "kind": "readout", "node": "ReadoutValue", "valueFormat": "Lv {level}", "source": "snapshot.upgrades[upgrades[2].id]", "maxRenderedChars": 6 },
      { "id": "upg3-state", "group": "upgradePace", "memberIndexWithinGroup": 3, "zIndex": 20, "kind": "readout", "node": "ReadoutState", "valueFormatByState": { "affordable": "{cost} Ready", "unaffordable": "{cost} Short", "maxed": "Max" }, "source": "derived:upgradeCost(upgrades[2], level) against snapshot.currency", "maxRenderedChars": 14, "primaryChannel": "text", "colourIsSecondaryOnly": true }
    ],
    "copy": {
      "levelPrefix": "Lv", "levelForm": "Lv {level}", "affordable": "Ready", "unaffordable": "Short",
      "maxed": "Max", "barSuffix": "Clear", "partsLabel": "Parts",
      "collectionSeparator": " / ", "barSeparator": " - ",
      "forbiddenWords": ["Buy", "Need", "Tap", "Press", "Get", "Click"],
      "forbiddenReason": "imperative mood; theme/tone/01 P1 is declarative-only and gameplay/onboarding/03 T5 bans instruction"
    },
    "numberFormat": {
      "integersOnly": true, "rounding": "floor", "groupSeparator": ",", "groupFromDigits": 4,
      "abbreviation": "none", "negativeNumbers": "unreachable", "leadingZero": false,
      "percent": { "form": "{n}%", "rounding": "floor", "min": 0, "max": 100 }
    },
    "slots": {
      "hudTop": { "availableTo": ["notices"], "realisesAnchor": "noticeStack", "mayOverlapAnyGroup": false },
      "hudBottom": { "availableTo": [], "reason": "the bottom edge holds both bottom clusters and the platform jump-button band" }
    },
    "invariants": [
      "every elements[].group names a groups[].id, and no element id appears in two groups",
      "groupIndex is unique across the surface and runs 1..6 with no gap",
      "count(groups where interactive) equals input.gameDrawnPressables",
      "every entry of input.pressable.roles maps to exactly one interactive group by (role, roleIndex)",
      "groups[].node values are unique, and no two nodes anywhere in the emitted tree share a name",
      "every group with interactive true has zIndex 20; every element whose group is not interactive has zIndex 1",
      "no game-drawn pressable has a cluster frame or the ScreenGui as its Parent",
      "the noticeStack rect intersects no group's rect at any supported viewport",
      "every firstSession.withheld surface drawn over live play maps to exactly one element or one group",
      "for each cluster, the sum of its groups' reserved extents is at most viewport.classes.<class>.persistentSurfaceShortAxisShareMax of the short axis; if it is not, the build fails rather than the cluster overflowing",
      "no elements[] object carries a positioning field",
      "every label and every copy value is at most vocabulary.maxLabelChars, is Title Case, matches vocabulary.allowedPattern, and contains no vocabulary.bannedWords entry",
      "no element's source names another player, and the surface contains no leaderstats path"
    ]
  }
}
```

```coinage
[
  { "coins": "Lv",    "renderable": true, "kind": "value-prefix",       "wave": 5, "because": "the held upgrade level needs a two-character prefix that fits beside a five-digit cost on a phone", "requestsPath": "composition.copy.levelPrefix", "surface": "hud upgrade row, ReadoutValue" },
  { "coins": "Ready", "renderable": true, "kind": "affordability-word", "wave": 5, "because": "affordabilityByColourAlone is false and no key named the second channel; Buy is an imperative", "requestsPath": "composition.copy.affordable", "surface": "hud upgrade row, ReadoutState" },
  { "coins": "Short", "renderable": true, "kind": "affordability-word", "wave": 5, "because": "the declarative counterpart to Ready, stating the balance rather than instructing the player", "requestsPath": "composition.copy.unaffordable", "surface": "hud upgrade row, ReadoutState" },
  { "coins": "Max",   "renderable": true, "kind": "affordability-word", "wave": 5, "because": "a maxed row must not print a cost the server refuses; both shipped modules already print this word", "requestsPath": "composition.copy.maxed", "surface": "hud upgrade row, ReadoutState" },
  { "coins": "Clear", "renderable": true, "kind": "bar-suffix",         "wave": 5, "because": "a bare per-cent under an area name states no unit; this names what the fraction counts", "requestsPath": "composition.copy.barSuffix", "surface": "hud area bar, BarLabel" },
  { "coins": "Parts", "renderable": true, "kind": "readout-label",      "wave": 5, "because": "endgame substitutes the finished-parts count for the collection count past area 8", "requestsPath": "composition.copy.partsLabel", "surface": "hud collection group, ReadoutLabel" }
]
```

```json
{
  "revisionRequests": [
    {
      "against": "ui-forge/briefs/hud.brief.json",
      "ownerToday": "none — category gap G12, assigned in cid/ui-ux/hud/03-pattern-producibility-and-the-brief-seam.md",
      "vocabularyViolations": 6,
      "countCorrectedInRevision1": "revision 0 said 7; the seventh row is structural, not a vocabulary failure",
      "rows": [
        { "path": "content.progress.label",    "was": "EAST TERRACE - 0% CLEAR", "fails": ["maxLabelChars 14 (23 characters)", "casing title"], "becomes": "composed at render from composition.elements[area-label].valueFormat" },
        { "path": "content.readouts[0].label", "was": "FINDS",  "fails": ["casing title"], "becomes": "Finds, from config.collection.classPlural" },
        { "path": "content.readouts[1].label", "was": "SHARDS", "fails": ["casing title"], "becomes": "Shards, from config.currency.plural" },
        { "path": "content.readouts[2].label", "was": "VALUE",  "fails": ["casing title"], "becomes": "Value, from config.upgrades[0].label" },
        { "path": "content.readouts[3].label", "was": "REACH",  "fails": ["casing title"], "becomes": "Reach, from config.upgrades[1].label" },
        { "path": "content.readouts[4].label", "was": "PACE",   "fails": ["casing title"], "becomes": "Pace, from config.upgrades[2].label" }
      ],
      "structuralNotAVocabularyFailure": { "path": "content.readouts[*].value", "was": "Lv 0  -  25", "becomes": "ReadoutValue 'Lv 0' and ReadoutState '25 Short' as two named children" }
    },
    {
      "against": "cid/ui-ux/navigation/01-the-screen-graph.md",
      "field": "entryControl.presenceRule",
      "from": "drawn only once nodes[index].presence has lifted; before the lift no instance named Pressable_INDEX is visible in the PlayerGui",
      "to": "the instance is present from join as a readout; no press affordance exists before nodes[index].presence has lifted, per composition.groups[collection].affordance.beforeLift",
      "alsoCloses": "RR-2, since the Visible == false branch in criterion 2 disappears with it",
      "because": "under fusion Pressable_INDEX is the collection count, which firstSession requires present at join with joinValue 0; the bar-(a) defect Navigation names is a press affordance with no effect, which fusion removes"
    },
    {
      "against": "cid/ui-ux/feedback/01-the-notice-channel.md",
      "field": "anchorGroup and interaction.realisation.zIndexBelow",
      "to": "cite composition.anchors[noticeStack] for the rect, slots and growth, and composition.zOrder.layers[notice] = 30 for the layer",
      "alsoCloses": "RR-6 and RR-7",
      "because": "four of the five surfaces on the may-overlap list are the four pressables under fusion; the derived rect needs none of them, and a relation between 1 and 20 does not determine a value against a panel at 10"
    },
    {
      "against": "game/src/client/HudBinding.luau",
      "lines": "142-149",
      "action": "delete the stale comment calling the per-cent sign a reported gap; allowedPattern has admitted it since 2026-08-01"
    }
  ]
}
```

## Consequences for other work

- **Notice work (`notices`)** gets a rect, two slots, a growth direction and `zIndex` 30, and
  loses its overlap fallback because it no longer needs one. Nothing on the notice channel may be
  parented outside `Slot_hudTop`.
- **Navigation work (`navigation`)** takes the one-field change above, which closes RR-1 and RR-2
  together. The close control and the pressable count (RR-3) are yours; I take no position.
- **Device-viewport work (`viewport`)** wins on `anchor: edge` and gets `focusRing` and
  `groupIndex` to read. `groupParentRequired` is refused with a named mechanism rather than
  deferred. Where the budget and my group count disagree, the budget still wins.
- **Purchase-control work (`pressables`)** stops computing positions on both realisation routes,
  and stops creating Instances on the native one. See sheet `03` for the interim.
- **Readout-writing work (`hud-binding`)** resolves `composition.elements[].node`, stops calling
  `string.upper`, and writes a third child, `ReadoutState`.
- **Screens work (`screens`)** is unaffected except that the panel layer is fixed at `zIndex` 10.
- **Build work** should take `F3` ahead of the revision round: a silent total failure of every
  readout, triggered by the casing fix three sheets now require.

## Acceptance criteria

1. `composition.groups` has 6 entries and `composition.elements` has 13; `groupIndex` runs 1..6
   with no repeat; no element object carries any of `cluster`, `pos`, `anchor`, `offset`, `size`,
   `maxSize`.
2. Exactly 4 groups have `interactive: true`, equal to `input.gameDrawnPressables`, all 4 carry
   `zIndex` 20, and every element whose group is not interactive carries `zIndex` 1.
3. Every value in `composition.copy` and every `label` in `composition.elements` is at most 14
   characters, matches `^[A-Za-z0-9 ,.'%%/-]+$`, is Title Case, and contains none of
   `relic relics tier artifact antique rebirth loot treasure`.
4. `ui-forge/briefs/hud.brief.json` regenerated from `composition` has **5** `content.readouts`
   entries plus one `content.progress` object, no `content.actions` key, `variant.anchor` of
   `"edge"`, and no all-upper-case string anywhere in the file.

## Not decided here

Presence, reserved extent, withheld states and the endgame substitution — sheet `02`.
Producibility and the interim realisation — sheet `03`. Every pixel, the touch floor, the safe
area, the keepout rects, `SelectionOrder` and the focus behaviour my `focusRing` is read by —
`viewport`. Rendered typography — `screens`. What a notice contains, its dwell and its copy —
`notices`. Whether a fifth game-drawn pressable exists — `input`'s owner, via `navigation/03`'s
RR-3. Every cost, level and area figure this surface displays — Balance & Tuning and Meta &
Content.

## Flagged to the developer

**Two calls the brief is silent on.** (1) **The collection count and the index button are fused.**
Alternatives: (a) fused, as decided, which deletes the duplicate box the playtest reported;
(b) un-fused, specified as `unfusedFallback` above, at the cost of that box returning.
**Recommendation: (a)**, and Navigation has been sent the one-field change it needs. (2) **The
notice sits above the purchase controls at `zIndex` 30.** The alternative is below them at 15,
which keeps a notice from ever covering a button and risks it sitting under an open panel.
**Recommendation: 30**, because non-blocking input is already guaranteed by `Active = false`.
