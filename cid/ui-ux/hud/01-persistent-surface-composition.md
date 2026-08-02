# 01 — Persistent surface composition

**Domain:** ui-ux/hud · **Category:** UI/UX · **Wave:** 5

## Decision

**Thirteen elements, six groups, four clusters. A group is the atomic placement unit and is
realised as exactly one Instance; an element carries no position of its own.** The three upgrade
readouts and the three purchase controls are not six things — they are three groups, each one
`TextButton` carrying its own label, level and cost, and the collection count and the index
control are one more. Supplied as the proposed key `composition`, from which
`ui-forge/briefs/hud.brief.json` is generated and never hand-written.

## Why

**The defect is a missing unit, not a wrong number.** The playtest recorded six boxes where
three belong and the cause on record is *"no contract key owns the composition"*
`[research: repo — cid/_playtest.md, defect 2]`. `Pressables.luau:167-169` names the same thing
from the other side: *"NO CONTRACT KEY OWNS THE HUD'S CLUSTER GEOMETRY"*
`[research: repo — game/src/client/Pressables.luau, read this run]`. Proximity is the mechanism:
*"Items close together are likely to be perceived as part of the same group"*, and proximity
**overrides** colour and shape similarity `[research: https://www.nngroup.com/articles/gestalt-proximity/]`.
So two nodes half a screen apart read as two objects however they are captioned, and adjacency
alone would be a geometry rule I would then have to own. One node cannot be duplicated, cannot
drift, and needs no geometry. `[cid: decided]`

**One node per group is a ruling, not a preference, and it forbids the adjacent-siblings
option.** `representation` already anticipates exactly this branch: *"the day `hud-overlay` grows
a pressable readout, `pressables.bind` resolves four node names instead of creating four
Instances"* `[research: repo — architect/sheets/06-representation.md, via pack §4]`. Nothing here
contradicts it; sheet `03` names what `ui-forge` must change for it to exist.

**The collection count and the index control are fused, and that half of the defect is closed by
deletion.** `Pressables.luau:480` writes `GameConfig.FindNoun.plural` onto `Pressable_INDEX`, so
the shipped top-left corner holds two boxes both reading *Finds* — which is precisely
*"the finds: it added another box even though it already had one"*
`[research: repo — cid/_playtest.md]`. Fused, the count **is** the way in. It also makes
`firstSession`'s two collection-side lifts — the `/ 24` denominator and whatever offers the panel
— land in one node on one event, so they cannot disagree. `[cid: decided]`

**Node names are values in this key, because both derivations are already broken.**
`HudBinding.luau:404-406` resolves `Readout_` + `string.upper(label)`; `hud-overlay.mjs:76` emits
`Readout_${label}` un-uppercased. That resolves today only because the brief ships `SHARDS`
uppercase. The moment `casing: "title"` reaches `currency.plural` — which `theme/vocabulary/01`
already requires — the pattern emits `Readout_Shards`, `HudBinding` looks for `Readout_SHARDS`,
and **every readout silently stops updating**. `[research: repo — both files, read this run]`
An explicit `node` field is one value two readers share instead of two guesses.

**Rendered case equals stored case; no `string.upper` anywhere on this surface.** The one piece
of evidence against says lowercase cost *"26% more time for accurate reading than uppercase"* for
glanceable isolated words `[research: https://www.nngroup.com/articles/glanceable-fonts/]`. I
overrule it here: these labels are static furniture beside a changing number, read once and then
never again, so label read-time is not the binding cost — while a second spelling of a term is
permanent and is what `theme/vocabulary/03`'s one-spelling invariant exists to catch. Five
mismatches ship today. `[cid: decided]`

**H6 is already closed and I am not filing the amendment my index asked for.**
`vocabulary.allowedPattern` is `^[A-Za-z0-9 ,.'%%/-]+$` in the shipped manifest
`[research: repo — game/src/shared/GameConfig.luau:1745, read this run]`. Inside a class `%%` is
a literal per-cent in Lua and a harmless repeat in JavaScript, so **both engines admit `%`**. The
2026-08-01 amendment to `theme/vocabulary/02` made this change for this reason (pack §4). What
survives is a stale comment: `HudBinding.luau:142-149` still calls the per-cent sign a reported
gap. That is a build-report correction, not a vocabulary bill. `[cid: decided]`

**Affordability is a word, and neither shipped word is legal.** `input.pressable.affordabilityByColourAlone`
is `false` and no key names the second channel (gap H5/G8). `Pressables.luau` invented `" Buy"`
and `" Need"`. *Buy* is a second-person imperative, which `theme/tone/01` `P1` forbids
(declarative only) and `gameplay/onboarding/03` `T5` bans as instruction. **`Ready` / `Short` /
`Max`**: three declarative adjectives, distinct first letters, distinct lengths, all inside
`maxLabelChars`. Colour stays as the *second* channel, never the first. `[cid: decided]`

**Number formatting (gap H4).** Integers only, floored — `economy` already awards
`max(1, floor(...))`. Comma-grouped from four digits, because `solvency` puts a five-digit cost
on this surface and the audience is *"8–14, mobile-heavy"* `00-CORE.md` `[brief: binding]`. **No
`K`/`M` abbreviation**: `economy` keeps currency uncapped and visible, and an abbreviation is
lossy on the one figure `theme/fantasy/02` requires be exact. `[cid: decided]`

**Cluster assignment is unchanged from the shipped brief**, deliberately: it is already what
`representation` and `HudBinding`'s four cluster constants assume, and my index warns that
Platform & Input's realised vertical budget may move it. Stating the cluster on the *group* is
what makes that one edit instead of seven.

```manifest
{
  "provides": "composition",
  "status": "proposed",
  "value": {
    "surface": "hud",
    "pattern": "hud-overlay",
    "brief": { "path": "ui-forge/briefs/hud.brief.json", "generatedFrom": "composition", "handEditForbidden": true },
    "variant": { "layout": "corners", "readoutStyle": "pill", "bar": "chunky", "density": "compact", "anchor": "inset" },
    "ornament": { "readoutTrim": "none", "barCap": "round" },
    "rules": {
      "memberPositionIsDerived": {
        "statement": "an element's position is its group's position; an element carries no cluster, pos, anchor, offset or size",
        "staticCheck": "no object in composition.elements has any key in [cluster, pos, anchor, offset, size, maxSize]",
        "runtimeCheck": "no module outside ui-forge assigns Position, AnchorPoint or Size to any node named in composition.groups[].node or to any descendant of one"
      },
      "oneNodePerGroup": {
        "statement": "a group is realised as exactly one Instance; a readout and the control over the same subject are that one node, never two siblings",
        "adjacentSiblingRealisationForbidden": true,
        "staticCheck": "composition.groups[].node values are unique, and every element's node is a descendant path under its own group's node"
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
    "clusters": [
      { "id": "topLeft",     "node": "Cluster_topLeft",     "anchor": [0, 0], "stack": "vertical", "groups": ["collection"] },
      { "id": "topRight",    "node": "Cluster_topRight",    "anchor": [1, 0], "stack": "vertical", "groups": ["currency"] },
      { "id": "bottomLeft",  "node": "Cluster_bottomLeft",  "anchor": [0, 1], "stack": "vertical", "groups": ["areaProgress"] },
      { "id": "bottomRight", "node": "Cluster_bottomRight", "anchor": [1, 1], "stack": "vertical", "groups": ["upgradeValue", "upgradeReach", "upgradePace"] }
    ],
    "groups": [
      { "id": "collection",   "cluster": "topLeft",     "orderInCluster": 1, "node": "Pressable_INDEX", "class": "TextButton", "interactive": true,  "role": "index",    "roleIndex": 1, "members": ["collection-count"], "memberOrder": ["collection-count"], "boundTo": "collection" },
      { "id": "currency",     "cluster": "topRight",    "orderInCluster": 1, "node": "Readout_Currency", "class": "Frame",     "interactive": false, "members": ["currency-value"], "memberOrder": ["currency-value"], "boundTo": "currency" },
      { "id": "areaProgress", "cluster": "bottomLeft",  "orderInCluster": 1, "node": "ProgressGroup",   "class": "Frame",      "interactive": false, "members": ["area-label", "area-bar"], "memberOrder": ["area-label", "area-bar"], "boundTo": "depths" },
      { "id": "upgradeValue", "cluster": "bottomRight", "orderInCluster": 1, "node": "Pressable_BUY1",  "class": "TextButton", "interactive": true,  "role": "purchase", "roleIndex": 1, "members": ["upg1-label", "upg1-level", "upg1-state"], "memberOrder": ["upg1-label", "upg1-level", "upg1-state"], "boundTo": "upgrades[0]" },
      { "id": "upgradeReach", "cluster": "bottomRight", "orderInCluster": 2, "node": "Pressable_BUY2",  "class": "TextButton", "interactive": true,  "role": "purchase", "roleIndex": 2, "members": ["upg2-label", "upg2-level", "upg2-state"], "memberOrder": ["upg2-label", "upg2-level", "upg2-state"], "boundTo": "upgrades[1]" },
      { "id": "upgradePace",  "cluster": "bottomRight", "orderInCluster": 3, "node": "Pressable_BUY3",  "class": "TextButton", "interactive": true,  "role": "purchase", "roleIndex": 3, "members": ["upg3-label", "upg3-level", "upg3-state"], "memberOrder": ["upg3-label", "upg3-level", "upg3-state"], "boundTo": "upgrades[2]" }
    ],
    "elements": [
      { "id": "collection-count", "group": "collection", "kind": "readout", "node": "ReadoutValue", "labelNode": "ReadoutLabel", "label": "Finds", "labelSource": "config.collection.classPlural", "icon": "find",
        "valueFormatByState": { "preDenominator": "{found}", "withDenominator": "{found} / {total}", "terminal": "{areasFinished}" },
        "labelByState": { "preDenominator": "{classPlural}", "withDenominator": "{classPlural}", "terminal": "Parts" },
        "source": "snapshot.found", "maxRenderedChars": 9 },
      { "id": "currency-value", "group": "currency", "kind": "readout", "node": "ReadoutValue", "labelNode": "ReadoutLabel", "label": "Shards", "labelSource": "config.currency.plural", "icon": "shard",
        "valueFormat": "{currency}", "source": "snapshot.currency", "maxRenderedChars": 11,
        "reserve": "none", "reserveReason": "topRight anchors at [1,0] and justifies end, so the value grows leftward into empty screen and moves no neighbour" },
      { "id": "area-label", "group": "areaProgress", "kind": "label", "node": "BarLabel",
        "valueFormat": "{areaLabel} - {percent}% Clear", "source": "snapshot.areaLabel + snapshot.clearedCount / snapshot.areaPatchCount", "maxRenderedChars": 28 },
      { "id": "area-bar", "group": "areaProgress", "kind": "bar", "node": "Bar", "fillNode": "BarFill", "fillAxis": "x", "widthPx": 220,
        "valueFormat": null, "source": "snapshot.clearedCount / snapshot.areaPatchCount",
        "tween": { "durationFrom": "config.response.beats[patchClear].acknowledgmentBudgetMs", "easing": "quadOut" } },

      { "id": "upg1-label", "group": "upgradeValue", "kind": "label",   "node": "ReadoutLabel", "valueFormat": "{upgrades[0].label}", "source": "config.upgrades[0].label", "maxRenderedChars": 14 },
      { "id": "upg1-level", "group": "upgradeValue", "kind": "readout", "node": "ReadoutValue", "valueFormat": "Lv {level}", "source": "snapshot.upgrades[upgrades[0].id]", "maxRenderedChars": 6 },
      { "id": "upg1-state", "group": "upgradeValue", "kind": "readout", "node": "ReadoutState", "valueFormatByState": { "affordable": "{cost} Ready", "unaffordable": "{cost} Short", "maxed": "Max" }, "source": "derived:upgradeCost(upgrades[0], level) against snapshot.currency", "maxRenderedChars": 14, "primaryChannel": "text", "colourIsSecondaryOnly": true },

      { "id": "upg2-label", "group": "upgradeReach", "kind": "label",   "node": "ReadoutLabel", "valueFormat": "{upgrades[1].label}", "source": "config.upgrades[1].label", "maxRenderedChars": 14 },
      { "id": "upg2-level", "group": "upgradeReach", "kind": "readout", "node": "ReadoutValue", "valueFormat": "Lv {level}", "source": "snapshot.upgrades[upgrades[1].id]", "maxRenderedChars": 6 },
      { "id": "upg2-state", "group": "upgradeReach", "kind": "readout", "node": "ReadoutState", "valueFormatByState": { "affordable": "{cost} Ready", "unaffordable": "{cost} Short", "maxed": "Max" }, "source": "derived:upgradeCost(upgrades[1], level) against snapshot.currency", "maxRenderedChars": 14, "primaryChannel": "text", "colourIsSecondaryOnly": true },

      { "id": "upg3-label", "group": "upgradePace", "kind": "label",   "node": "ReadoutLabel", "valueFormat": "{upgrades[2].label}", "source": "config.upgrades[2].label", "maxRenderedChars": 14 },
      { "id": "upg3-level", "group": "upgradePace", "kind": "readout", "node": "ReadoutValue", "valueFormat": "Lv {level}", "source": "snapshot.upgrades[upgrades[2].id]", "maxRenderedChars": 6 },
      { "id": "upg3-state", "group": "upgradePace", "kind": "readout", "node": "ReadoutState", "valueFormatByState": { "affordable": "{cost} Ready", "unaffordable": "{cost} Short", "maxed": "Max" }, "source": "derived:upgradeCost(upgrades[2], level) against snapshot.currency", "maxRenderedChars": 14, "primaryChannel": "text", "colourIsSecondaryOnly": true }
    ],
    "copy": {
      "levelPrefix": "Lv",
      "levelForm": "Lv {level}",
      "affordable": "Ready",
      "unaffordable": "Short",
      "maxed": "Max",
      "barSuffix": "Clear",
      "partsLabel": "Parts",
      "collectionSeparator": " / ",
      "barSeparator": " - ",
      "forbiddenWords": ["Buy", "Need", "Tap", "Press", "Get", "Click"],
      "forbiddenReason": "imperative mood; theme/tone/01 P1 is declarative-only and gameplay/onboarding/03 T5 bans instruction"
    },
    "numberFormat": {
      "integersOnly": true,
      "rounding": "floor",
      "groupSeparator": ",",
      "groupFromDigits": 4,
      "abbreviation": "none",
      "negativeNumbers": "unreachable",
      "leadingZero": false,
      "percent": { "form": "{n}%", "rounding": "floor", "min": 0, "max": 100 }
    },
    "slots": {
      "hudTop": { "availableTo": ["notices"], "mayOverlapAnyGroup": false },
      "hudBottom": { "availableTo": [], "reason": "the bottom edge holds both bottom clusters and the platform jump-button band" }
    },
    "invariants": [
      "every elements[].group names a groups[].id, and no element id appears in two groups",
      "count(groups where interactive) equals input.gameDrawnPressables",
      "every entry of input.pressable.roles maps to exactly one interactive group by (role, roleIndex)",
      "groups[].node values are unique, and no two nodes anywhere in the emitted tree share a name",
      "every firstSession.withheld surface drawn over live play maps to exactly one element or one group",
      "for each cluster, the sum of its groups' reserved extents is at most viewport's persistent-surface budget for that device class; if it is not, the build fails rather than the cluster overflowing",
      "no elements[] object carries a positioning field",
      "every label and every copy value is at most vocabulary.maxLabelChars, is Title Case, matches vocabulary.allowedPattern, and contains no vocabulary.bannedWords entry",
      "no element's source names another player, and the surface contains no leaderstats path"
    ]
  }
}
```

Six strings authored here have no contract path until `composition` is promoted, filed per
`theme/vocabulary/04`:

```coinage
[
  { "coins": "Lv",    "renderable": true, "kind": "value-prefix",      "wave": 5, "because": "the held upgrade level needs a two-character prefix that fits beside a five-digit cost on a phone", "requestsPath": "composition.copy.levelPrefix", "surface": "hud upgrade row, ReadoutValue" },
  { "coins": "Ready", "renderable": true, "kind": "affordability-word", "wave": 5, "because": "affordabilityByColourAlone is false and no key named the second channel; Buy is an imperative", "requestsPath": "composition.copy.affordable", "surface": "hud upgrade row, ReadoutState" },
  { "coins": "Short", "renderable": true, "kind": "affordability-word", "wave": 5, "because": "the declarative counterpart to Ready, stating the balance rather than instructing the player", "requestsPath": "composition.copy.unaffordable", "surface": "hud upgrade row, ReadoutState" },
  { "coins": "Max",   "renderable": true, "kind": "affordability-word", "wave": 5, "because": "a maxed row must not print a cost the server refuses; both shipped modules already print this word", "requestsPath": "composition.copy.maxed", "surface": "hud upgrade row, ReadoutState" },
  { "coins": "Clear", "renderable": true, "kind": "bar-suffix",         "wave": 5, "because": "a bare per-cent under an area name states no unit; this names what the fraction counts", "requestsPath": "composition.copy.barSuffix", "surface": "hud area bar, BarLabel" },
  { "coins": "Parts", "renderable": true, "kind": "readout-label",      "wave": 5, "because": "endgame substitutes the finished-parts count for the collection count past area 8", "requestsPath": "composition.copy.partsLabel", "surface": "hud collection group, ReadoutLabel" }
]
```

Revision request against the unowned file, claiming nothing:

```json
{
  "revisionRequest": "ui-forge/briefs/hud.brief.json",
  "requested_by": "cid/ui-ux/hud/01-persistent-surface-composition.md",
  "ownerToday": "none — category gap G12, assigned in cid/ui-ux/hud/03-pattern-producibility-and-the-brief-seam.md",
  "violations": [
    { "path": "content.progress.label", "was": "EAST TERRACE - 0% CLEAR", "fails": ["vocabulary.maxLabelChars 14 (23 characters)", "vocabulary.casing title"], "becomes": "composed at render from composition.elements[area-label].valueFormat, not a literal in the brief" },
    { "path": "content.readouts[0].label", "was": "FINDS",  "fails": ["vocabulary.casing title"], "becomes": "Finds, from config.collection.classPlural" },
    { "path": "content.readouts[1].label", "was": "SHARDS", "fails": ["vocabulary.casing title"], "becomes": "Shards, from config.currency.plural" },
    { "path": "content.readouts[2].label", "was": "VALUE",  "fails": ["vocabulary.casing title"], "becomes": "Value, from config.upgrades[0].label" },
    { "path": "content.readouts[3].label", "was": "REACH",  "fails": ["vocabulary.casing title"], "becomes": "Reach, from config.upgrades[1].label" },
    { "path": "content.readouts[4].label", "was": "PACE",   "fails": ["vocabulary.casing title"], "becomes": "Pace, from config.upgrades[2].label" },
    { "path": "content.readouts[*].value", "was": "Lv 0  -  25", "fails": ["one node carried label, level and cost with no state child"], "becomes": "ReadoutValue 'Lv 0' and ReadoutState '25 Short' as two named children" }
  ],
  "alsoStale": { "file": "game/src/client/HudBinding.luau", "lines": "142-149", "says": "allowedPattern admits no per-cent sign", "fact": "GameConfig.luau:1745 is ^[A-Za-z0-9 ,.'%%/-]+$, which admits % in both Lua and JavaScript", "action": "delete the exception comment" }
}
```

## Consequences for other work

- **Purchase-control work (`pressables`, `game/src/client/Pressables.luau`)** stops creating
  Instances. `Instance.new("TextButton")`, `HUD_CLUSTER_MAX_WIDTH_SCALE`,
  `HUD_CLUSTER_FALLBACK_WIDTH_SCALE`, `measureClusterWidthScale`, `layoutButtons`,
  `BUTTON_WIDTH_SCALE`, `BUTTON_HEIGHT_PX`, `AFFORDABLE_SUFFIX` and `UNAFFORDABLE_SUFFIX` all
  go. What remains is: resolve four node names, set `Selectable`, connect `Activated`, debounce.
- **Readout-writing work (`hud-binding`)** stops deriving node names from labels and stops
  calling `string.upper`. It resolves `composition.elements[].node` under
  `composition.groups[].node`, and it now writes a third child, `ReadoutState`.
- **Device-viewport work (`viewport`, `ui-ux/platform/01`)** owns every pixel here and I own
  none. Two joins: the per-cluster budget my invariant reads, and the touch floor the three
  bottom-right groups are sized to. **If the budget and my group count disagree, the budget
  wins** — three groups that do not fit is not a composition. My cluster assignment is stated on
  the group so moving a corner is one edit.
- **Notice work (`notices`, Feedback UI)** gets `slots.hudTop` and nothing else. A notice may not
  overlap a group's reserved extent, and `hudBottom` is closed because the bottom edge is both
  bottom clusters plus the jump-button band — a notice there would sit over the purchase controls,
  which `response` forbids by name.
- **Navigation work (`navigation`)** inherits that the way into the index **is the collection
  count**, node `Pressable_INDEX`, role `index`, index 1. Everything past the press is yours.
- **Screens work (`screens`)** owns rendered typography (G5). I have fixed one thing inside it:
  no case transform on this surface. The type ramp, the font and the size are yours.
- **Vocabulary work** is owed nothing. H6 is withdrawn: `allowedPattern` already admits `%`.
- **Balance and tuning** inherits a format, not a value: `numberFormat` groups from four digits,
  so `solvency`'s 25,400 renders `25,400` in a 14-character slot.

## Acceptance criteria

1. `composition.groups` has 6 entries and `composition.elements` has 13; every element names
   exactly one group id, and no element object carries any of `cluster`, `pos`, `anchor`,
   `offset`, `size`, `maxSize`.
2. Exactly 4 groups have `interactive: true`, equal to `input.gameDrawnPressables`, and the
   `(role, roleIndex)` pairs are exactly `(index,1)`, `(purchase,1)`, `(purchase,2)`,
   `(purchase,3)`.
3. Every value in `composition.copy` and every `label` in `composition.elements` is at most 14
   characters, matches `^[A-Za-z0-9 ,.'%%/-]+$`, is Title Case, and contains none of
   `relic relics tier artifact antique rebirth loot treasure`.
4. `ui-forge/briefs/hud.brief.json` regenerated from `composition` has 6 `content.readouts`
   entries, no `content.actions` key, and no string in the file is all upper case.

## Not decided here

Presence, reserved extent, the withheld states and the endgame substitution's trigger — sheet
`02`, this domain, as an `amends` against this key. Whether the pattern can produce a pressable
readout at all, and who owns `hud.brief.json` — sheet `03`. Every pixel, the touch floor, the
safe area, the keepout rectangles and the per-cluster budget — `viewport`, `ui-ux/platform/01`.
Rendered typography, font, size and wrap — `screens`. What a notice is and when it fires —
`notices`, Feedback UI. What the index panel contains — `screens`. Colour, panel art and icons —
Art & Visuals, UI Art. Every cost, level and area figure this surface displays — Balance & Tuning
and Meta & Content; I state formats and set no value.

## Flagged to the developer

**The collection count and the index button are fused into one control.** The brief is silent —
it describes no persistent element except the area bar. The live alternatives: (a) fused, as
decided, which deletes the duplicate box the playtest reported and makes both collection-side
lifts one event; (b) two adjacent groups in `topLeft`, which keeps `Pressable_INDEX` a separate
button and re-creates the two-boxes-saying-Finds reading the playtest already objected to;
(c) move the index control to `topRight` under currency, which separates it from the thing it
opens. **Recommendation: (a).** Reversing it is one edit to `groups[collection]`.
