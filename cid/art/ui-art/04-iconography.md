# 04 — Iconography: there is none, and that is the inventory

**Domain:** art/ui-art · **Category:** Art & Visuals · **Wave:** 6

## Decision

**This game has zero icons and zero image assets of any kind in its interface.** The deletion is
made at the source of truth, `composition.elements[collection-count].icon` and
`[currency-value].icon`, both set to `null` by the revision request below; the two entries in
`ui-forge/briefs/hud.brief.json` are a **consequence** of that, not the target. No `ImageLabel` or
`ImageButton` is emitted by any screen, and the count, dimension and memory ceiling this domain
owes `budgets` are all **0**, which closes gap `G10` with a value instead of a range nobody can
measure.

## Why

**My first draft deleted the wrong artifact, and the correction is the important part.**
`hud.brief.json` is a **generated** artifact: `hud/03` makes it the output of
`bridge/emit-hud-brief.mjs` from `composition`, hand-editing forbidden, with the check *"regenerating
leaves `git diff` empty"*. `composition.elements[].icon` carries `"find"` and `"shard"` as merged
values of an approved key `[research: cid/ui-ux/hud/01-persistent-surface-composition.md]`. So
deleting them from the brief deletes them until the next regeneration and **restores both magenta
boxes the moment the generator runs**. Two keys would have disagreed and the other one would have
won at build time. The ruling stands; its target moves to `composition`, and it is filed as a
request under `## Pushing back` rather than asserted here.

**The defect being closed is live and player-visible.** `hud-overlay.mjs:101-108` emits a 20×20
`ImageLabel` named `ReadoutIcon` carrying `image: { placeholder }`; `to-luau.mjs:84-86` normalises
that to `image: null` plus a `placeholder` string, and `:126-131` substitutes a real `rbxassetid`
**only if an asset index supplies one**. There is no asset index. So `UIBuilder.luau:514-517`
paints the node `Color3.fromRGB(255, 0, 200)` at 0.5 transparency, deliberately: *"Loud on
purpose: a missing asset should be impossible to ship past."* `game/src/shared/Screens/hud.luau:69,153`
carries exactly that today, so the shipped HUD renders **two magenta boxes**, which meets the
stopping rule's bar (a) on its own `[research: game/src/shared/Screens/hud.luau]`.

**Every approved constraint points the same way.** `representation` rules *"no asset id is needed
anywhere"* with the criterion `grep -rn "rbxassetid" game/src` returns nothing;
`budgets.textureCeilings.uploadedImageAssetsInWorldGeometry` is 0; and `00-CORE.md` binds *"the
smallest game that still gives every creative area real work"* and *"content design is the
primary creative work on this project, **not art**"* `[brief: binding]` ×2. An icon set is the
one thing in this category that would require an asset pipeline, and `budgets`' own sentence
(*"UI icons are the only image assets in the build"*) is a **description of what shipped**, not a
mandate `[research: cid/art/_category.md]`. **Deleting the last two makes the whole build
asset-free**, which is a stronger and cheaper property than any icon buys.

**Nothing is lost, because the identity was never in the icon.** `composition` gives both affected
readouts a label sourced from a contract field, `config.collection.classPlural` and
`config.currency.plural`, and at `variant.layout: "corners"` the pattern stacks the label above
the value (`hud-overlay.mjs:259`), so `Finds` and `Shards` are already on screen carrying the
meaning `find` and `shard` would have carried. **A word an 8-year-old can read beats a 20 px glyph
they have to learn**, and it is bound by `vocabulary` where a glyph is bound by nothing.

**The ceiling I owe `budgets` is therefore zero, and zero needs no device.** Every other figure in
`budgets` is `[playtest unknown]` because Roblox publishes no per-device ceiling and instructs
developers to test on a chosen baseline instead `[research: cid/art/_category.md]`. A ceiling of
0 is the one figure in that key that is verifiable by grep on any machine. `[cid: decided]` on the
value; there is no source for a non-zero one and this sheet says so rather than inventing a
plausible 64×64.

**`D13` and `D8` become vacuous, and naming them is still compliant.** `theme/tone/04` `D13`
forbids a face, eyes or mouth on any icon and `D8` forbids a padlock; with zero icons neither can
be violated. They are listed below so that a later wave reintroducing an icon inherits them
rather than rediscovering them.

**This domain files zero coinages.** `theme/vocabulary/04` makes a renderable string with no
contract path a ` ```coinage ` submission and records that the parser may not exist in
`bridge/merge.mjs` (`G12`). An icon's accessible name would have been this domain's only
submission; with no icon there is no name, so **`G12` is closed from this side without depending
on a parser that may never be written.**

| forbidden | check |
|---|---|
| any `rbxassetid` in an emitted screen or theme | `grep -rn "rbxassetid" game/src` returns nothing |
| `ImageLabel` or `ImageButton` as the class of any UI node | zero occurrences under `game/src/shared/Screens/` |
| a node named `ReadoutIcon` | zero occurrences anywhere |
| a non-null `icon` on any `composition.elements[]` entry | zero, and this is the source of truth |
| an `icon` field in the generated brief | zero occurrences in `ui-forge/briefs/hud.brief.json`, as a consequence of the row above |
| a `placeholder` field on any UI node | zero, so the magenta path can never fire |
| an emoji, symbol glyph or dingbat standing in for an icon | `vocabulary.allowedPattern` already rejects every one; zero non-ASCII characters in any player-facing string |
| a currency glyph before or after a number | `theme/tone/01` `P4` forbids a glyph in `currency.name`; the readout label carries the word |
| a padlock, key, chain or lock glyph on an empty slot | `theme/tone/04` `D8`; and `screens/01`: an unfound name reads as an empty slot |
| a silhouette, blurred shape, greyed name or question mark for an unrevealed Find | `theme/tone/04` `D11`; `representation.index-surface`: *"NOTHING ELSE"* |
| a face, eyes, mouth or mascot on anything | `theme/tone/04` `D13`; vacuous at zero icons and inherited by anyone who adds one |
| a rarity frame, glow, border, sparkle or badge on a Find | `rarity.forbidden`; there is no image to carry one |
| a set icon or per-set colour on the four headings | `screens/01`: the four headings are drawn identically |
| a product icon, price tag or store glyph | `products.F19`; there is no store to skin |
| a `SurfaceAppearance`, `Decal` or `Texture` on any UI instance | none exists on a `GuiObject`; listed because a builder may reach for one to fake a frame |

```json
{
  "amends": "uiTheme",
  "requested_by": "cid/art/ui-art/04-iconography.md",
  "value": {
    "icons": {
      "count": 0,
      "inventory": [],
      "deletedAtSourceOfTruth": [
        { "field": "composition.elements[collection-count].icon", "from": "find", "to": null, "requiresRevision": "RR-A3", "replacedBy": "the readout label, labelSource config.collection.classPlural" },
        { "field": "composition.elements[currency-value].icon", "from": "shard", "to": null, "requiresRevision": "RR-A3", "replacedBy": "the readout label, labelSource config.currency.plural" }
      ],
      "downstreamConsequence": {
        "artifact": "ui-forge/briefs/hud.brief.json",
        "status": "generated from composition by bridge/emit-hud-brief.mjs (hud/03); hand-editing forbidden",
        "effect": "the two icon fields disappear on regeneration, and readout() emits ReadoutIcon only when r.icon is present, so the node disappears with no ui-forge change",
        "ifRevisionRefused": "regenerating the brief restores both icons and both magenta boxes at hud.luau:69,153; deleting them from the brief alone is not a fix"
      },
      "renderedSizeTokens": { "iconSm": 24, "iconMd": 34, "iconLg": 48, "status": "inert while count is 0" }
    },
    "imagePolicy": {
      "uiImageAssets": 0,
      "forbiddenNodeClasses": ["ImageLabel", "ImageButton"],
      "forbiddenNodeFields": ["image", "placeholder", "slice", "imageFit", "imageTint", "preview"],
      "forbiddenNodeNames": ["ReadoutIcon"],
      "consequence": "the magenta placeholder path at UIBuilder.luau:514-517 becomes unreachable"
    },
    "budgetProposal": {
      "requestedKey": "budgets.textureCeilings.uploadedImageAssetsInUI",
      "value": 0,
      "alsoProposed": { "uiIconCount": 0, "uiIconMaxDimensionPx": 0, "uiIconMemoryMB": 0 },
      "ratifiedBy": "Tech and Data, Performance",
      "closesGap": "G10",
      "status": "cid: decided",
      "whyNotPlaytestUnknown": "a ceiling of zero is verifiable by grep on any machine and needs no baseline device; every non-zero figure would be invented"
    },
    "coinageFiling": { "count": 0, "because": "an icon's accessible name was this domain's only renderable string with no contract path; with no icon there is none", "closesGap": "G12 from this side" },
    "gapG6": {
      "position": "consequence, not decision",
      "statement": "the interface renders no image, so no Find has an icon form on any surface this key owns. representation.find ('a Find has no Instance at any point in its life') and screens/01 (an unfound name reads as an empty slot, a held name reads as its name) are consistent with that. The stale line is gameplay/meta/02's 'Art - Objects owes 24 models, and each must read at icon size in a grid'.",
      "routedTo": "art/objects, with gameplay/meta if a revision is needed"
    },
    "revisionRequests": [
      { "id": "RR-A3", "against": "cid/ui-ux/hud/01-persistent-surface-composition.md", "fields": ["composition.elements[collection-count].icon", "composition.elements[currency-value].icon"], "from": ["find", "shard"], "to": [null, null], "because": "both resolve to no asset, so hud-overlay emits a 20x20 ImageLabel that UIBuilder paints Color3.fromRGB(255, 0, 200) at 0.5 transparency; the shipped HUD carries two magenta boxes at hud.luau:69,153. The label already carries the meaning from a contract field, and a word an 8-year-old can read beats a 20 px glyph they have to learn. Setting the fields to null also makes representation's 'no asset id is needed anywhere' true of the interface as well as the world.", "ifRefused": "either two icons must be commissioned, uploaded and given asset ids, which contradicts representation and 00-CORE.md's 'not art' line, or the magenta boxes ship; uiTheme.icons.count then stops being 0 and this sheet's budget proposal is withdrawn" }
    ]
  }
}
```

## Pushing back

**Against `cid/ui-ux/hud/01-persistent-surface-composition.md`**, on
`composition.elements[collection-count].icon` and `composition.elements[currency-value].icon`.
Both are merged values of an approved key and I am asking for both to become `null`, as `RR-A3`
above. **The ground is not taste.** Each names an asset that does not exist and cannot exist
without contradicting `representation`'s *"no asset id is needed anywhere"* and `00-CORE.md`'s
*"content design is the primary creative work on this project, not art"* `[brief: binding]`; the
rendered result today is two magenta boxes on the shipped HUD; and the information the icons
would carry is already on screen as a label sourced from a contract field. **`composition` may
refuse**, and if it does, this sheet's `icons.count` is no longer 0, the `budgets` proposal is
withdrawn, and somebody must own commissioning, uploading and versioning two image assets. The
field references are cited rather than pinned to line numbers: they moved between verification
and this round, because that sheet is mid-revision.

## Consequences for other work

- **`composition` (`ui-ux/hud/01`)** owns `RR-A3` and is the only place this deletion can be made
  to stick. Nothing else in that key changes: no element is removed, no group re-ordered, no
  label re-worded.
- **Contract-and-seam work** (`bridge/emit-hud-brief.mjs`, `hud/03`) inherits the check: a brief
  regenerated from a `composition` carrying two `null` icons contains no `icon` key, and
  `git diff` stays empty.
- **Objects work (`objectArt`)** gets `G6` answered from the interface side and only from that
  side: **no Find needs an icon-size read, because no interface surface renders an image.**
- **Meta and Content (`collection`)** owns the stale line. `gameplay/meta/02`'s *"Art - Objects
  owes 24 models, and each must read at icon size in a grid"* was written before `architect/06`
  ruled and before this sheet; it is the sentence to strike.
- **Tech and Performance (`budgets`)** ratifies four zeros, conditional on `RR-A3` being accepted,
  and inherits the useful property: with this key merged, the build contains no uploaded asset of
  any kind, in world or interface.
- **`ui-forge` pattern work** is asked for nothing. `readout()` already emits `ReadoutIcon` only
  when `r.icon` is present, so a null icon removes the node with no code change.
- **Build work on `game/src/shared/Screens/hud.luau`** removes two magenta boxes and adds nothing.

## Acceptance criteria

1. `composition.elements[collection-count].icon` and `composition.elements[currency-value].icon`
   are both `null` in the merged manifest, and no `composition.elements[]` entry has a non-null
   `icon`.
2. `grep -rn "rbxassetid\|ImageLabel\|ImageButton\|ReadoutIcon\|placeholder" game/src/shared/Screens/`
   returns nothing, and the built HUD contains zero `ImageLabel` instances.
3. `uiTheme.icons.count` is 0 and `uiTheme.icons.inventory` is an empty array.

## Not decided here

Whether `RR-A3` is accepted: `composition` (`ui-ux/hud/01`), and this sheet is written so the
refusal branch is complete. Whether a Find has any rendered form in the world, and what the tool
and foliage look like: Objects work (`objectArt`), with `representation` binding it. Whether
`collection`'s *"owes 24 models"* line is struck: Meta and Content. Whether `budgets` gains the
four zeros as fields: Tech and Performance. What each readout's label says, its casing and its
character ceiling: `composition` and `vocabulary`. What an empty slot looks like structurally, and
the five panel states: `screens`. The archetype, the token values, the type ramp, the pressable
states and motion: sheets `01`, `02`, `03`, `05` and `06` of this domain. Whether the
` ```coinage ` parser is built at all: contract-and-seam work, which this sheet no longer depends
on.
