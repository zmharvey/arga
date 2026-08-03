# 01 — Persistent surface composition

**Domain:** ui-ux/hud · **Category:** UI/UX · **Wave:** 5 · **Revision 3** (`derivedValues`, `citesKeys`)

## Decision

**Thirteen elements, six groups, four clusters. A group is the atomic placement unit and is
realised under exactly one node; an element carries no position of its own.** The three upgrade
readouts and the three purchase controls are three groups, not six things, and the collection count
and the index control are one more. Node names are stated per realisation route, every quantity a
format string interpolates is defined in `derivedValues`, and **every foreign path this key touches
is published in `citesKeys` with a `resolvesToday` flag.**

## Why

**The defect is a missing unit, not a wrong number.** The playtest recorded six boxes where three
belong and the cause on record is *"no contract key owns the composition"*
`[research: repo — cid/_playtest.md, defect 2]`. Proximity is the mechanism: *"Items close together
are likely to be perceived as part of the same group"*, and proximity **overrides** colour and
shape similarity `[research: https://www.nngroup.com/articles/gestalt-proximity/]`. Two nodes half
a screen apart read as two objects however they are captioned. `[cid: decided]`

**`node` and `controlNode` are two fields, because they are two nodes on the route that ships.**
Revision 1 carried route A's button name in `node`, which made `oneNodePerGroup.staticCheck` false
on route B, where `ReadoutLabel` and `ReadoutValue` are siblings of the button rather than its
children. `node` now always means the **group** node, so `hud/02`'s presence and `Visible` rules
bind the whole row rather than the button inside it.

**`Readout_Currency` was a name the compiler will never emit.** `readout()` builds
`` `Readout_${(r.label ?? r.value).replace(/[^A-Za-z0-9]/g, '')}` `` (`hud-overlay.mjs:76`), so a
label of `Shards` produces **`Readout_Shards`**. Corrected.
`[research: repo — ui-forge/src/compose/patterns/hud-overlay.mjs, read this run]`

**Node names are values in this key, because both derivations are already broken.**
`HudBinding.luau:404-406` resolves `Readout_` + `string.upper(label)`; `hud-overlay.mjs:76` does
not uppercase. That resolves today only because the brief ships `SHARDS` uppercase. The moment
`casing: "title"` reaches `currency.plural` — which `theme/vocabulary/01` already requires —
**every readout silently stops updating** (`F3`). `[research: repo — both files]`

**`derivedValues` exists because a format string interpolated a token nothing defined.**
`collection-count` renders `{found} / {total}` and `hud/02` conditioned two states on
`config.collection.totalFinds` — a field `collection` does not have. `HudBinding.luau:369-376`
computes it correctly as a *local* helper iterating `GameConfig.RelicSets` and accumulating
`#set.relics`; **my citation misread that helper as a config field**, which is worse than a stale
path because a comparison against `nil` in Luau is silently falsy and nothing would have thrown.
Every quantity a `valueFormat` interpolates is now defined with its expression, so no token is a
guess. A derived `collection.totalRelics` is *requested* in `hud/02`, not depended on.
`[research: repo — game/src/client/HudBinding.luau:369-376, re-read this run]` `[cid: decided]`

**`citesKeys` exists because this key cites more foreign paths than almost any sheet here, and two
of them turned out to be phantoms.** Publishing the list with `resolvesToday` per path makes the
check mechanical rather than a sweep somebody remembers to run — the form VFX and Screens adopted.
It is the same instinct as `citeAs`, pointed outward instead of inward. `[cid: decided]`

**Rendered case equals stored case.** The evidence against says lowercase costs *"26% more time for
accurate reading than uppercase"* for glanceable isolated words
`[research: https://www.nngroup.com/articles/glanceable-fonts/]`. Overruled: these labels are
static furniture read once, so label read-time is not the binding cost, while a second spelling is
permanent and is what `theme/vocabulary/03`'s one-spelling invariant catches.

**H6 stays withdrawn.** `allowedPattern` is `^[A-Za-z0-9 ,.'%%/-]+$`, which admits `%` in both
engines `[research: repo — game/src/shared/GameConfig.luau:1745, read this run]`.

**Affordability is a word, and neither shipped word is legal.** *Buy* is a second-person
imperative, which `theme/tone/01` `P1` forbids and `onboarding/03` `T5` bans as instruction.
**`Ready` / `Short` / `Max`** — declarative, distinct first letters and lengths. Colour is the
second channel, never the first. Numbers: integers, floored, comma-grouped from four digits, **no
`K`/`M`**, because `economy` keeps currency uncapped and `theme/fantasy/02` requires the
finished-parts figure be exact.

### The four requirement sets, and how they land

**`noticeStack`: accepted, with a derived region.** On the 896×414 phone viewport the thumbstick
capture frame is `x ∈ [0, 0.4], y ∈ [0.333, 1]`
`[research: https://github.com/Roblox/Core-Scripts/blob/master/PlayerScripts/StarterPlayerScripts/ControlScript/MasterControl/DynamicThumbstick.lua]`,
`jumpSmall` is `x ∈ [0.894, 0.972], y ∈ [0.783, 0.952]`
`[research: https://github.com/Roblox/Core-Scripts/blob/master/PlayerScripts/StarterPlayerScripts_NewStructure/RobloxPlayerScript/ControlScript/TouchJump.lua]`,
and both top clusters are bounded by `viewport.classes.phone.pressableMaxWidthScale` 0.20.
**`x ∈ [0.24, 0.76], y ∈ [0, 0.30]` is disjoint from all four keepouts and from both top
clusters**; 0.30 × 414 = 124 px holds two plates and a gap.

**`zIndex`: arbitrated, notice 30 > pressables 20 > panel 10 > readouts 1.** `feedback/01` stated a
*relation* between 1 and 20, which cannot determine a value against a panel at 10;
`navigation/02` stated values. The tap guarantee is carried by `blocksInput: false` and
`Active = false`, which gates input where z-order does not.

**The group-parent node stays refused, and its replacement is `viewport.gamepad`'s explicit link
graph** — `Selectable`, `SelectionOrder` and `NextSelection*` only. The four interactive groups sit
in two clusters and `hud-overlay` emits clusters as siblings of `Root`, so no common parent below
`Root` exists, and `SelectionGroup` is not a `GuiObject` property in the current reference
`[research: https://create.roblox.com/docs/reference/engine/classes/GuiObject]`.
`GuiService:AddSelectionParent` is deprecated and forbidden by two sibling sheets; naming it was
revision 1's error and it is withdrawn.

**`variant.anchor` yields to Platform: `inset` becomes `edge`**, because `viewport.safeArea` sets
`ScreenInsets = CoreUISafeInsets` and `ANCHOR_INSET` would double-count it
`[research: https://create.roblox.com/docs/reference/engine/enums/ScreenInsets]`.

## Pushing back

**Against `cid/ui-ux/navigation/01-the-screen-graph.md`, field `entryControl.presenceRule`, on
route A only.** Under route A the collection count and the index control are one instance, so *"no
instance named `Pressable_INDEX` is visible"* would delete a readout `firstSession` requires present
at join. **Under route B, the active route, the rule is satisfiable as written** — the button is a
separate child of `Readout_Finds` and can draw nothing while the count stays present. Navigation's
objection is to a **press affordance** with no effect, and `groups[collection].affordance` makes
that a checkable property set. Nothing moves unless route A is adopted.

```manifest
{
  "provides": "composition",
  "status": "proposed",
  "value": {
    "surface": "hud",
    "pattern": "hud-overlay",
    "activeRoute": "B",
    "routeDefinition": "cid/ui-ux/hud/03-pattern-producibility-and-the-brief-seam.md, realisation.routes",
    "brief": { "path": "ui-forge/briefs/hud.brief.json", "generatedFrom": "composition", "handEditForbidden": true },
    "variant": { "layout": "corners", "readoutStyle": "pill", "bar": "chunky", "density": "compact", "anchor": "edge" },
    "ornament": { "readoutTrim": "none", "barCap": "round" },
    "derivedValues": {
      "_why": "every token a valueFormat interpolates, and every quantity a state condition compares, defined with its expression. Revision 2 interpolated {total} and conditioned on config.collection.totalFinds, neither of which any key emits",
      "totalRelics": {
        "expression": "sum over i of #collection.sets[i].relics",
        "resolvesToday": true,
        "notAField": "collection.totalFinds and collection.total do not exist; collection holds className, classPlural, relicsPerArea, areasPerDepth, sets",
        "shippedPrecedent": "game/src/client/HudBinding.luau:369-376 computes exactly this as a local helper",
        "requestFiled": "cid/ui-ux/hud/02 asks collection's owner for a derived totalRelics; composition does not depend on it landing"
      },
      "foundCount": {
        "expression": "count of k in snapshot.found where snapshot.found[k] is true",
        "resolvesToday": true,
        "notKeyCount": "persistence.load fills all 24 keys with false, so counting keys rather than true values would show the denominator to a player who has found nothing"
      },
      "total":   { "aliasOf": "totalRelics", "usedIn": "elements[collection-count].valueFormatByState.withDenominator" },
      "found":   { "aliasOf": "foundCount",  "usedIn": "elements[collection-count].valueFormatByState" },
      "percent": { "expression": "floor(100 * clamp(snapshot.clearedCount / snapshot.areaPatchCount, 0, 1))", "resolvesToday": true, "guard": "areaPatchCount <= 0 renders 0" },
      "level":   { "expression": "snapshot.upgrades[upgrades[i].id] or 0", "resolvesToday": true },
      "cost":    { "expression": "GameConfig.upgradeCost(upgrades[i], level)", "resolvesToday": true, "heldNotTarget": "level is the level the player HAS; upgradeCost takes the same convention" },
      "currency":      { "expression": "snapshot.currency", "resolvesToday": true },
      "areasFinished": { "expression": "snapshot.areasFinished", "resolvesToday": true },
      "areaLabel":     { "expression": "snapshot.areaLabel", "resolvesToday": true },
      "classPlural":   { "expression": "collection.classPlural", "resolvesToday": true },
      "widestCollectionString": { "expression": "the rendered width of format(withDenominator) at found == total == totalRelics", "resolvesToday": true, "usedBy": "hud/02 reservedExtent.byGroup[collection].widthBasis" }
    },
    "citesKeys": {
      "_why": "this key cites more foreign paths than almost any sheet in the project, and two of them were phantoms. Published per path with a resolvesToday flag so the check is mechanical",
      "_flagMeaning": "resolvesToday true means the path exists in a merged contract key, in Protocol.snapshotShape(), or in emitted GameConfig, verified this run. false means it is a wave-5 proposal or a filed request",
      "paths": [
        { "path": "input.gameDrawnPressables",                      "status": "contract",       "resolvesToday": true,  "usedBy": "invariants" },
        { "path": "input.pressable.roles",                          "status": "contract",       "resolvesToday": true,  "usedBy": "groups[].role, roleIndex" },
        { "path": "input.pressable.affordabilityByColourAlone",     "status": "contract",       "resolvesToday": true,  "usedBy": "elements[upg*-state].colourIsSecondaryOnly" },
        { "path": "vocabulary.maxLabelChars / .casing / .allowedPattern / .bannedWords", "status": "contract", "resolvesToday": true, "usedBy": "copy, labels, criterion 3" },
        { "path": "collection.classPlural",                         "status": "contract",       "resolvesToday": true,  "usedBy": "elements[collection-count].labelSource" },
        { "path": "collection.sets[].relics",                       "status": "contract",       "resolvesToday": true,  "usedBy": "derivedValues.totalRelics" },
        { "path": "collection.totalRelics",                         "status": "requested",      "resolvesToday": false, "usedBy": "nothing; the sum form is used instead", "requestIn": "cid/ui-ux/hud/02" },
        { "path": "currency.plural",                                "status": "contract",       "resolvesToday": true,  "usedBy": "elements[currency-value].labelSource" },
        { "path": "upgrades[].label / .id / .maxLevel",             "status": "contract",       "resolvesToday": true,  "usedBy": "groups[].boundTo, elements[upg*]" },
        { "path": "GameConfig.upgradeCost(def, level)",              "status": "emittedFunction","resolvesToday": true,  "usedBy": "derivedValues.cost" },
        { "path": "response.beats[patchClear].acknowledgmentBudgetMs","status": "contract",      "resolvesToday": true,  "usedBy": "elements[area-bar].tween.durationFrom" },
        { "path": "firstSession.withheld / .suppressionForbidden",   "status": "contract",       "resolvesToday": true,  "usedBy": "hud/02 presence" },
        { "path": "endgame headline substitution",                  "status": "contract",       "resolvesToday": true,  "usedBy": "hud/02 headline" },
        { "path": "snapshot.found / .currency / .upgrades / .rowsRevealed / .clearedCount / .areaPatchCount / .areaLabel / .areasFinished", "status": "protocol", "resolvesToday": true, "usedBy": "elements[].source", "verifiedAgainst": "Protocol.snapshotShape(), eight fields" },
        { "path": "viewport.classes.<class>.minTargetPx",            "status": "proposedWave5",  "resolvesToday": false, "usedBy": "hud/02 reservedExtent.unit, hud/03 routes[B].sizing" },
        { "path": "viewport.classes.<class>.persistentSurfaceShortAxisShareMax", "status": "proposedWave5", "resolvesToday": false, "usedBy": "invariants budget check" },
        { "path": "viewport.classes.phone.pressableMaxWidthScale",   "status": "proposedWave5",  "resolvesToday": false, "usedBy": "anchors[noticeStack].derivation" },
        { "path": "viewport.keepoutRects.jumpSmall",                 "status": "proposedWave5",  "resolvesToday": false, "usedBy": "anchors[noticeStack].derivation, hud/03 U6" },
        { "path": "viewport.safeArea.patternInsetVariantForbidden",  "status": "proposedWave5",  "resolvesToday": false, "usedBy": "variant.anchor" },
        { "path": "viewport.gamepad.mechanism",                      "status": "proposedWave5",  "resolvesToday": false, "usedBy": "focusRing.mechanismInstead" },
        { "path": "notices.interaction.blocksInput",                 "status": "proposedWave5",  "resolvesToday": false, "usedBy": "zOrder.noticeDoesNotSwallowTapsBecause" },
        { "path": "screens[index] IndexSurface",                     "status": "proposedWave5",  "resolvesToday": false, "usedBy": "zOrder.layers[indexPanel]" },
        { "path": "navigation.entryControl",                         "status": "proposedWave5",  "resolvesToday": false, "usedBy": "the route-A revision request" },
        { "path": "representation.pressable",                        "status": "technicalContract","resolvesToday": true, "usedBy": "groups[].controlNode names" }
      ],
      "check": "every entry with resolvesToday true resolves in the merged manifest, Protocol.snapshotShape() or emitted GameConfig; every entry with false is either a wave-5 proposal or names the request that would create it"
    },
    "citeAs": {
      "_why": "F-5: the viewport focus contract dereferenced three fields that do not exist. These are the canonical paths INTO this key",
      "groupIndex": "composition.groups[].groupIndex",
      "interactive": "composition.groups[].interactive",
      "groupNodeName": "composition.groups[].node",
      "controlNodeName": "composition.groups[].controlNode",
      "memberIndex": "composition.elements[].memberIndexWithinGroup",
      "groupMembership": "composition.groups[].members is an array of element id STRINGS, not objects",
      "notFields": [
        "composition.groups[].instanceName — the field is node",
        "composition.groups[].members[].memberIndex — members holds strings; the index lives on elements[]",
        "composition.elements[].interactive — interactive is a property of a group, never of an element",
        "composition.touchTargetFloorPx — the floor is viewport.classes.<class>.minTargetPx"
      ]
    },
    "rules": {
      "memberPositionIsDerived": {
        "statement": "an element's position is its group's position; an element carries no cluster, pos, anchor, offset or size",
        "staticCheck": "no object in composition.elements has any key in [cluster, pos, anchor, offset, size, maxSize]",
        "runtimeCheck": "no module outside ui-forge assigns Position or AnchorPoint to any node in composition; Size, MinSize and LayoutOrder on a controlNode are route B's stated carve-out and expire with U4"
      },
      "oneNodePerGroup": {
        "statement": "a group is realised under exactly one node; every element of that group, and its control if it has one, sits inside that node — never as siblings of a cluster",
        "clusterSiblingRealisationForbidden": true,
        "staticCheck": "composition.groups[].node values are unique; every elements[].node and every groups[].controlNode is a descendant path under its own group's node, on BOTH routes; no controlNode has a cluster frame or the ScreenGui as its Parent"
      },
      "renderedCaseEqualsStoredCase": {
        "statement": "no persistent string is case-transformed at render",
        "staticCheck": "no client module calls string.upper or string.lower on a value written into a node named in composition"
      },
      "noSecondPlayer": {
        "statement": "every element reads the local player's own snapshot and nothing else",
        "staticCheck": "every composition.elements[].source begins with 'snapshot.', 'config.' or 'derived:'"
      },
      "noUndefinedToken": {
        "statement": "every {token} in a valueFormat, and every quantity a state condition compares, is a key of composition.derivedValues",
        "staticCheck": "the set of {tokens} across all valueFormat and valueFormatByState strings is a subset of keys(derivedValues)"
      }
    },
    "zOrder": {
      "arbitratedHere": true,
      "requiredScreenGuiZIndexBehavior": "Sibling",
      "layers": [
        { "layer": "hudReadouts",         "zIndex": 1,  "members": "every composition element whose group is not interactive" },
        { "layer": "indexPanel",          "zIndex": 10, "members": "IndexSurface and every descendant", "ownedBy": "screens" },
        { "layer": "gameDrawnPressables", "zIndex": 20, "members": "every composition group with interactive true, applied to node and controlNode alike" },
        { "layer": "notice",              "zIndex": 30, "members": "everything on the notice channel", "ownedBy": "notices" }
      ],
      "resolves": "feedback/01 stated a relation between 1 and 20, which does not determine a value against a panel at 10; navigation/02 stated values and is adopted",
      "noticeDoesNotSwallowTapsBecause": "notices.interaction.blocksInput false and Active false, which gates input; z-order does not",
      "shippedValueIsWrong": "IndexScreen.luau:134 SURFACE_Z_INDEX 10 against four pressables left at the default 1"
    },
    "anchors": [
      {
        "id": "noticeStack",
        "requestedBy": "feedback/01.anchorGroup",
        "slots": 2, "growth": "downward", "slotAssignment": "arrivalOrder", "memberPositionDerivedFromSlot": true,
        "realisedIn": "Slot_hudTop",
        "rect": { "left": [0.24, 0], "right": [0.76, 0], "top": [0, 0], "bottom": [0.30, 0] },
        "rectForm": "each edge is [scale, offsetPx] against the viewport, engine UDim order, matching viewport.keepoutRects",
        "derivation": "phone 896x414: thumbstick x[0,0.4] y[0.333,1]; jumpSmall x[0.894,0.972] y[0.783,0.952]; both top clusters bounded by viewport.classes.phone.pressableMaxWidthScale 0.20 to x[0,0.20] and x[0.80,1]. The rect is disjoint from all four and from both bottom clusters. 0.30 x 414 = 124 px for two plates and one gap",
        "intersectsNoGroup": true, "mayOverlap": [], "refusedOutLoud": false,
        "requiresPatternChange": "U7 in hud/03 — slotHost() hard-codes align 'stretch', so a bounded-width plate is not producible until the slot takes its alignment from the brief"
      }
    ],
    "focusRing": {
      "requestedBy": ["platform/01.gamepad", "navigation/03"],
      "groupParentNode": null,
      "groupParentRefused": "the four interactive groups sit in two clusters and hud-overlay emits clusters as siblings of Root, so the only common parent is Root, which also holds every readout and the notice slot",
      "mechanismInstead": "viewport.gamepad.mechanism: explicitLinkGraph — Selectable, SelectionOrder and NextSelection* only",
      "deprecatedMechanismForbidden": ["GuiService:AddSelectionParent", "GuiObject.SelectionGroup"],
      "selectableNode": "the group's controlNode, never its node",
      "order": ["collection", "upgradeValue", "upgradeReach", "upgradePace"],
      "adjacency": [
        { "group": "collection",   "up": null,           "down": "upgradeValue", "left": null, "right": null },
        { "group": "upgradeValue", "up": "collection",   "down": "upgradeReach", "left": null, "right": null },
        { "group": "upgradeReach", "up": "upgradeValue", "down": "upgradePace",  "left": null, "right": null },
        { "group": "upgradePace",  "up": "upgradeReach", "down": null,           "left": null, "right": null }
      ],
      "selectionOrderSetBy": "viewport, from groupIndex alone; over the four interactive groups groupIndex is 1, 4, 5, 6 — total and tie-free with no second term needed",
      "panelOpenEntryAndExitOwnedBy": "navigation"
    },
    "clusters": [
      { "id": "topLeft",     "node": "Cluster_topLeft",     "anchor": [0, 0], "stack": "vertical", "groups": ["collection"] },
      { "id": "topRight",    "node": "Cluster_topRight",    "anchor": [1, 0], "stack": "vertical", "groups": ["currency"] },
      { "id": "bottomLeft",  "node": "Cluster_bottomLeft",  "anchor": [0, 1], "stack": "vertical", "groups": ["areaProgress"] },
      { "id": "bottomRight", "node": "Cluster_bottomRight", "anchor": [1, 1], "stack": "vertical", "groups": ["upgradeValue", "upgradeReach", "upgradePace"] }
    ],
    "nodeNaming": {
      "_rule": "node, controlNode and class below are the ACTIVE route's values; nodeByRoute, controlNodeByRoute and classByRoute carry both. Switching activeRoute re-derives them and changes nothing else",
      "patternDerivation": "under route B the pattern names a readout frame Readout_${label with non-alphanumerics stripped} (hud-overlay.mjs:76); under route A the brief supplies r.node explicitly (U1)",
      "uniquenessAppliesAcross": ["groups[].node", "groups[].controlNode"]
    },
    "groups": [
      { "id": "collection", "groupIndex": 1, "cluster": "topLeft", "orderInCluster": 1,
        "node": "Readout_Finds", "nodeByRoute": { "A": "Pressable_INDEX", "B": "Readout_Finds" },
        "controlNode": "Pressable_INDEX", "controlNodeByRoute": { "A": "Pressable_INDEX", "B": "Pressable_INDEX" },
        "class": "Frame", "classByRoute": { "A": "TextButton", "B": "Frame" },
        "zIndex": 20, "interactive": true, "role": "index", "roleIndex": 1,
        "members": ["collection-count"], "memberOrder": ["collection-count"], "boundTo": "collection",
        "controlText": "", "controlTextReason": "the count above it is the label; onboarding/03 T5 forbids an instruction, so the affordance is elevation and stroke, which are shape channels rather than colour",
        "affordance": {
          "beforeLift": { "elevation": 0, "stroke": "none", "statesBlockActive": false, "Active": false, "Selectable": false, "Interactable": false, "readsAs": "identical to the currency readout at the same readoutStyle; under route B the controlNode is additionally in presence state reserved, so it draws nothing at all" },
          "afterLift":  { "elevation": 2, "stroke": "border.subtle", "statesBlockActive": true, "Active": true, "Selectable": true, "Interactable": true },
          "check": "before the lift, the group node's elevation, stroke and states properties differ from Readout_Shards's in zero respects"
        },
        "unfusedFallback": { "appliesToRouteAOnly": true, "ifNavigationRefuses": true, "splitInto": [ { "id": "collection", "orderInCluster": 1, "node": "Readout_Finds", "interactive": false }, { "id": "index", "orderInCluster": 2, "node": "Pressable_INDEX", "interactive": true, "role": "index", "roleIndex": 1, "label": "Finds" } ], "statedCost": "a second box reading Finds returns to the top-left corner, which is half of the defect the developer reported" } },
      { "id": "currency", "groupIndex": 2, "cluster": "topRight", "orderInCluster": 1,
        "node": "Readout_Shards", "nodeByRoute": { "A": "Readout_Shards", "B": "Readout_Shards" },
        "controlNode": null, "class": "Frame", "zIndex": 1, "interactive": false,
        "members": ["currency-value"], "memberOrder": ["currency-value"], "boundTo": "currency" },
      { "id": "areaProgress", "groupIndex": 3, "cluster": "bottomLeft", "orderInCluster": 1,
        "node": "ProgressGroup", "nodeByRoute": { "A": "ProgressGroup", "B": "ProgressGroup" },
        "nodeIsPatternFixed": "hud-overlay.mjs:280 hard-codes this name",
        "controlNode": null, "class": "Frame", "zIndex": 1, "interactive": false,
        "members": ["area-label", "area-bar"], "memberOrder": ["area-label", "area-bar"], "boundTo": "depths" },
      { "id": "upgradeValue", "groupIndex": 4, "cluster": "bottomRight", "orderInCluster": 1,
        "node": "Readout_Value", "nodeByRoute": { "A": "Pressable_BUY1", "B": "Readout_Value" },
        "controlNode": "Pressable_BUY1", "controlNodeByRoute": { "A": "Pressable_BUY1", "B": "Pressable_BUY1" },
        "class": "Frame", "classByRoute": { "A": "TextButton", "B": "Frame" },
        "zIndex": 20, "interactive": true, "role": "purchase", "roleIndex": 1,
        "members": ["upg1-label", "upg1-level", "upg1-state"], "memberOrder": ["upg1-label", "upg1-level", "upg1-state"], "boundTo": "upgrades[0]" },
      { "id": "upgradeReach", "groupIndex": 5, "cluster": "bottomRight", "orderInCluster": 2,
        "node": "Readout_Reach", "nodeByRoute": { "A": "Pressable_BUY2", "B": "Readout_Reach" },
        "controlNode": "Pressable_BUY2", "controlNodeByRoute": { "A": "Pressable_BUY2", "B": "Pressable_BUY2" },
        "class": "Frame", "classByRoute": { "A": "TextButton", "B": "Frame" },
        "zIndex": 20, "interactive": true, "role": "purchase", "roleIndex": 2,
        "members": ["upg2-label", "upg2-level", "upg2-state"], "memberOrder": ["upg2-label", "upg2-level", "upg2-state"], "boundTo": "upgrades[1]" },
      { "id": "upgradePace", "groupIndex": 6, "cluster": "bottomRight", "orderInCluster": 3,
        "node": "Readout_Pace", "nodeByRoute": { "A": "Pressable_BUY3", "B": "Readout_Pace" },
        "controlNode": "Pressable_BUY3", "controlNodeByRoute": { "A": "Pressable_BUY3", "B": "Pressable_BUY3" },
        "class": "Frame", "classByRoute": { "A": "TextButton", "B": "Frame" },
        "zIndex": 20, "interactive": true, "role": "purchase", "roleIndex": 3,
        "members": ["upg3-label", "upg3-level", "upg3-state"], "memberOrder": ["upg3-label", "upg3-level", "upg3-state"], "boundTo": "upgrades[2]" }
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
      { "id": "upg1-state", "group": "upgradeValue", "memberIndexWithinGroup": 3, "zIndex": 20, "kind": "readout",
        "node": "Pressable_BUY1", "nodeByRoute": { "A": "ReadoutState", "B": "Pressable_BUY1" },
        "renderedAsByRoute": { "A": "a third TextLabel child, emitted by U1", "B": "the controlNode's own Text; costs no Instance" },
        "valueFormatByState": { "affordable": "{cost} Ready", "unaffordable": "{cost} Short", "maxed": "Max" },
        "source": "derived:upgradeCost(upgrades[0], level) against snapshot.currency", "maxRenderedChars": 14, "primaryChannel": "text", "colourIsSecondaryOnly": true },

      { "id": "upg2-label", "group": "upgradeReach", "memberIndexWithinGroup": 1, "zIndex": 20, "kind": "label",   "node": "ReadoutLabel", "valueFormat": "{upgrades[1].label}", "source": "config.upgrades[1].label", "maxRenderedChars": 14 },
      { "id": "upg2-level", "group": "upgradeReach", "memberIndexWithinGroup": 2, "zIndex": 20, "kind": "readout", "node": "ReadoutValue", "valueFormat": "Lv {level}", "source": "snapshot.upgrades[upgrades[1].id]", "maxRenderedChars": 6 },
      { "id": "upg2-state", "group": "upgradeReach", "memberIndexWithinGroup": 3, "zIndex": 20, "kind": "readout",
        "node": "Pressable_BUY2", "nodeByRoute": { "A": "ReadoutState", "B": "Pressable_BUY2" },
        "renderedAsByRoute": { "A": "a third TextLabel child, emitted by U1", "B": "the controlNode's own Text; costs no Instance" },
        "valueFormatByState": { "affordable": "{cost} Ready", "unaffordable": "{cost} Short", "maxed": "Max" },
        "source": "derived:upgradeCost(upgrades[1], level) against snapshot.currency", "maxRenderedChars": 14, "primaryChannel": "text", "colourIsSecondaryOnly": true },

      { "id": "upg3-label", "group": "upgradePace", "memberIndexWithinGroup": 1, "zIndex": 20, "kind": "label",   "node": "ReadoutLabel", "valueFormat": "{upgrades[2].label}", "source": "config.upgrades[2].label", "maxRenderedChars": 14 },
      { "id": "upg3-level", "group": "upgradePace", "memberIndexWithinGroup": 2, "zIndex": 20, "kind": "readout", "node": "ReadoutValue", "valueFormat": "Lv {level}", "source": "snapshot.upgrades[upgrades[2].id]", "maxRenderedChars": 6 },
      { "id": "upg3-state", "group": "upgradePace", "memberIndexWithinGroup": 3, "zIndex": 20, "kind": "readout",
        "node": "Pressable_BUY3", "nodeByRoute": { "A": "ReadoutState", "B": "Pressable_BUY3" },
        "renderedAsByRoute": { "A": "a third TextLabel child, emitted by U1", "B": "the controlNode's own Text; costs no Instance" },
        "valueFormatByState": { "affordable": "{cost} Ready", "unaffordable": "{cost} Short", "maxed": "Max" },
        "source": "derived:upgradeCost(upgrades[2], level) against snapshot.currency", "maxRenderedChars": 14, "primaryChannel": "text", "colourIsSecondaryOnly": true }
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
      "the union of groups[].node and groups[].controlNode holds no duplicate name, and no two nodes anywhere in the emitted tree share a name",
      "every group with interactive true has a non-null controlNode; every group with interactive false has controlNode null",
      "on the active route, every elements[].node and every groups[].controlNode resolves to a descendant of its own group's node",
      "every {token} in any valueFormat is a key of derivedValues, and every state condition compares only derivedValues keys",
      "every citesKeys entry with resolvesToday true resolves in the merged manifest, Protocol.snapshotShape() or emitted GameConfig",
      "every group with interactive true has zIndex 20 on both its node and its controlNode; every element whose group is not interactive has zIndex 1",
      "no controlNode has a cluster frame or the ScreenGui as its Parent",
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
  { "coins": "Ready", "renderable": true, "kind": "affordability-word", "wave": 5, "because": "affordabilityByColourAlone is false and no key named the second channel; Buy is an imperative", "requestsPath": "composition.copy.affordable", "surface": "hud upgrade row, the control's own Text under route B" },
  { "coins": "Short", "renderable": true, "kind": "affordability-word", "wave": 5, "because": "the declarative counterpart to Ready, stating the balance rather than instructing the player", "requestsPath": "composition.copy.unaffordable", "surface": "hud upgrade row, the control's own Text under route B" },
  { "coins": "Max",   "renderable": true, "kind": "affordability-word", "wave": 5, "because": "a maxed row must not print a cost the server refuses; both shipped modules already print this word", "requestsPath": "composition.copy.maxed", "surface": "hud upgrade row, the control's own Text under route B" },
  { "coins": "Clear", "renderable": true, "kind": "bar-suffix",         "wave": 5, "because": "a bare per-cent under an area name states no unit; this names what the fraction counts", "requestsPath": "composition.copy.barSuffix", "surface": "hud area bar, BarLabel" },
  { "coins": "Parts", "renderable": true, "kind": "readout-label",      "wave": 5, "because": "endgame substitutes the finished-parts count for the collection count past area 8", "requestsPath": "composition.copy.partsLabel", "surface": "hud collection group, ReadoutLabel" }
]
```

```json
{
  "revisionRequests": [
    {
      "against": "ui-forge/briefs/hud.brief.json",
      "ownerToday": "none — category gap G12, assigned in cid/ui-ux/hud/03",
      "vocabularyViolations": 6,
      "rows": [
        { "path": "content.progress.label",    "was": "EAST TERRACE - 0% CLEAR", "fails": ["maxLabelChars 14 (23 characters)", "casing title"], "becomes": "composed at render from composition.elements[area-label].valueFormat" },
        { "path": "content.readouts[0].label", "was": "FINDS",  "fails": ["casing title"], "becomes": "Finds, from config.collection.classPlural" },
        { "path": "content.readouts[1].label", "was": "SHARDS", "fails": ["casing title"], "becomes": "Shards, from config.currency.plural" },
        { "path": "content.readouts[2].label", "was": "VALUE",  "fails": ["casing title"], "becomes": "Value, from config.upgrades[0].label" },
        { "path": "content.readouts[3].label", "was": "REACH",  "fails": ["casing title"], "becomes": "Reach, from config.upgrades[1].label" },
        { "path": "content.readouts[4].label", "was": "PACE",   "fails": ["casing title"], "becomes": "Pace, from config.upgrades[2].label" }
      ],
      "blockedBy": "F3 — re-casing these five labels renames every emitted node, so both readers must resolve composition.groups[].node first"
    },
    {
      "against": "cid/ui-ux/navigation/01-the-screen-graph.md",
      "field": "entryControl.presenceRule",
      "appliesTo": "route A only",
      "to": "the instance is present from join as a readout; no press affordance exists before nodes[index].presence has lifted, per composition.groups[collection].affordance.beforeLift",
      "notNeededUnderRouteB": "under B the control is a separate child of Readout_Finds, so the rule holds as written"
    },
    {
      "against": "cid/ui-ux/platform/01-device-viewport-rules.md",
      "field": "gamepad.focusList.rule and gamepad.selectionOrderRule",
      "to": "every composition.groups entry with interactive true, sorted by composition.groups[].groupIndex; selectionOrder = 10 * groupIndex; the selectable Instance is composition.groups[].controlNode",
      "supersededFields": ["composition.groups[].instanceName", "composition.groups[].members[].memberIndex"],
      "seeAlso": "composition.citeAs.notFields",
      "because": "over the four interactive groups groupIndex is 1, 4, 5, 6, so 10 * groupIndex is 10, 40, 50, 60 — total and tie-free with no second term"
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

- **Whoever holds `collection`** gets a request, not a dependency: a derived `totalRelics`. Filed in
  `hud/02`. `composition` uses the sum over `sets[].relics` either way.
- **Device-viewport work (`viewport`)** takes the field-path correction and has `citeAs.notFields`
  so it cannot recur. `SelectionOrder` derives from `groupIndex` alone; the selectable Instance is
  `controlNode`, never `node`.
- **Navigation work** needs nothing on the active route; the one-field change is filed against
  route A only.
- **Notice work (`notices`)** keeps the rect and `zIndex` 30, and depends on `U7`.
- **Purchase-control work (`pressables`)** resolves `groups[].controlNode`, parents it into
  `groups[].node`, and writes the affordability word into its own `Text`.
- **Readout-writing work (`hud-binding`)** resolves `composition.elements[].node` under
  `composition.groups[].node`, stops calling `string.upper`, and **keeps its local `totalFinds()`**,
  which was always the correct form.
- **Build work** takes `F3` first: it blocks both routes and detonates on the casing fix.

## Acceptance criteria

1. `composition.groups` has 6 entries and `composition.elements` has 13; `groupIndex` runs 1..6
   with no repeat; the union of `groups[].node` and `groups[].controlNode` holds no duplicate; no
   element object carries any of `cluster`, `pos`, `anchor`, `offset`, `size`, `maxSize`.
2. Exactly 4 groups have `interactive: true`, equal to `input.gameDrawnPressables`; all 4 have a
   non-null `controlNode` and the other 2 have `controlNode: null`; every element whose group is
   not interactive carries `zIndex` 1.
3. The set of `{tokens}` across every `valueFormat` and `valueFormatByState` string is a subset of
   `keys(derivedValues)`, and no string anywhere in this domain's three sheets contains
   `collection.total` or `collection.totalFinds`.
4. Every `citesKeys` entry marked `resolvesToday: true` resolves in the merged manifest,
   `Protocol.snapshotShape()` or emitted `GameConfig`; every entry marked `false` names either a
   wave-5 proposal or the request that would create it.

## Not decided here

Presence, reserved extent, withheld states and the endgame substitution — sheet `02`. The two
routes, `LayoutOrder` and who owns `hud.brief.json` — sheet `03`. Every pixel, the touch floor, the
safe area, the keepout rects and `SelectionOrder` — `viewport`. Rendered typography and the font
that currently throws — `screens` and Art & Visuals. What a notice contains — `notices`. Whether
`collection` grows a derived `totalRelics` — its owner. Whether a fifth game-drawn pressable exists
— `input`'s owner. Every cost, level and area figure this surface displays — Balance & Tuning and
Meta & Content.

## Flagged to the developer

**The collection count and the index control are one group.** Under the active route they are two
instances inside one pill, so there is one box reading *Finds* rather than the two the playtest
reported. Alternatives: (a) one group, as decided; (b) `unfusedFallback`, one edit, at the cost of
that second box returning. **Recommendation: (a).** Separately, **the notice sits above the
purchase controls at `zIndex` 30** rather than below at 15; the alternative keeps a notice from
ever covering a button and risks it sitting under an open panel. **Recommendation: 30.**
