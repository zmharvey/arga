# 04 — What a Find is made of

**Domain:** Objects · **Category:** Art & Visuals · **Wave:** 6

## Decision

**A Find has no world Instance, no icon, no image asset and no mesh. Its only form is its name,
rendered into the index slot `screens` owns.** Zero uploaded assets, zero marks, zero figures.
The material register `theme/setting/01` states for the 24 is recorded as an **authoring
constraint on any future form**, not as a build instruction, because there is no form to author.

## Why

Three approved sources appeared to disagree and only one governs. Taken one at a time:

- **`representation.find` governs and is not stale.** *"A Find has no Instance at any point in its
  life"*, `class: null`, `createdBy: "nothing"`, count 0, and its own rationale: *"Representing it
  as a model would demand 24 assets that do not exist, block the build on them, and create a second
  source of truth for a fact `discovery.record` already holds."* A shipped build depends on it, and
  `grep -rn "rbxassetid" game/src` returning nothing is one of its acceptance criteria.
- **`gameplay/meta/02`'s *"Art — Objects owes 24 models, and each must read at icon size in a
  grid"* is stale.** It is a wave-3 *consequence* line written before `architect/06` ruled, and it
  is prose rather than a value inside the `collection` manifest — so **striking it moves no key**.
  The strike is filed below as a revision request against that sheet's owner, and the ruling here
  does not depend on the strike being accepted. If Meta declines it, nothing in this sheet changes;
  the merged contract just carries one line of stale prose.
- **`modal-grid`'s requirement of `name`, `price` and `art` on every item never reaches this
  surface.** `ui-ux/screens` established on three independent counts that `modal-grid` **cannot
  produce the index at all** (`modal-grid.mjs:322,459,475-487`), records the index's `producibleBy`
  as `null` and its `refusedBy` as `modal-grid`, and the shipped `IndexScreen.luau` is hand-built.
  A compiler requirement from a pattern the surface does not use is not a requirement.

Three further facts each independently close the icon path:

- **There is nowhere to hang one.** `collection.sets[].relics[]` is an array of bare strings, so no
  per-Find object exists to carry an `art` key. Adding one is the same contract revision `screens`
  is already filing for flavour text, against a key `gameplay/meta` owns.
- **An icon is an uploaded asset.** `ImageLabel.Image` is typed `ContentId` and every documented
  sample is `rbxassetid://…` `[research: https://create.roblox.com/docs/reference/engine/classes/ImageLabel]`.
  **`[unverified]` as a quotation** — the page states no requirement in words; it is settled as
  practice, and the settling fetch is `create.roblox.com/docs/ui/labels` or the property's YAML in
  `creator-docs`. Twenty-four of them contradicts `representation`'s *"no asset needs to be produced
  to build this game"* and blocks the build on 24 uploads, against
  *"content design is the primary creative work on this project, **not art**"* `[brief: binding]`,
  `00-CORE.md`.
- **The genre's answer is banned here anyway.** `theme/tone/04` `D11` forbids a silhouette, blurred
  model, greyed name or question-mark icon for an unrevealed Find, and `representation.index-surface`
  says *"A held name reads as its name; an unfound name reads as an empty slot. **NOTHING ELSE.**"*
  A search snippet attributes silhouette icons to DIG's 601-item Collection, but three fetches of a
  shipping collection panel failed (402, 403, and a page about islands) and the snippet is a
  synthesis rather than a page quote. `[unverified]` — **and the ruling does not rest on it.**

Two further consequences of the ruling, stated rather than left to be discovered:

- **Marks and figures *on* a Find are zero, and that is not a deferral.** `theme/setting/05` hands
  me *"marks and figures **on** a `Find` are yours"*, and there is no surface to mark. Even if a
  form ever existed, three approved rules already close the interesting half: `theme/setting/05`
  makes cut lettering a stated absence, `theme/setting/01` bans iconography and *"statuary of a
  person or a creature"*, and `theme/tone/04` `D13` bans a face, eyes or mouth on any object.
  **What would survive is tooling and casting marks only.** Recorded as an authoring constraint.
- **The cost is real and belongs in the sheet.** The game's differentiator now carries its entire
  visual load on typography and panel layout, which are UI Art's and `screens`'. That is the
  compliant reading of the binding line above, and it is reversible in exactly one place — the
  price table below — so a later reader can reopen it on the argument instead of re-deriving it.

### The Find, as fields a builder can read

| subject | value | source |
|---|---|---|
| world Instance | **0**, at any point in its life | `representation.find` |
| Instance class | `null` | `representation.find` |
| icons | **0** | this sheet |
| image assets | **0** | this sheet; `budgets.uploadedImageAssetsInWorldGeometry` 0 |
| meshes | **0** | `budgets.uploadedMeshAssetsInWorldGeometry` 0; `N17` |
| marks, letters, figures | **0** | `theme/setting/05`; `theme/setting/01`; `D13` |
| rarity treatment of any kind | **0** | `rarity.forbidden`; `rarity.perObjectVisualGrade` false |
| the one place a Find is rendered | `screens.screens[id=index].tree[node="Name"]`, a `TextLabel`, `textFrom` `collection.sets[g].relics[i].name` | `screens` — **cited, not copied**, because `ui-ux/screens` is mid-revision on how a slot renders |
| the one mutable property | `screens.screens[id=index].mutableProperties[0]` — `Slot_<setId>_<i>/Name.Text` | `screens` |
| unfound state | the same node, holding the empty string; the slot subtree is otherwise identical to a held one | `screens`; `representation.index-surface` |

### The material register — an authoring constraint, not a build instruction

Recorded because a form may one day exist and this is the only place the register is written down
for the 24. **Nothing below is a thing to build today.**

| entry | what it admits | source |
|---|---|---|
| dressed stone | cut and worked, sound, weathered | `theme/setting/01` |
| fired clay | vessels and fittings | `theme/setting/01` |
| cast bronze | cast fittings; **no gilding, no gold, no gemstones** | `theme/setting/01`; `theme/lore/01` `## Pushing back` |
| worked wood | the same register as the tool in sheet 03 | `theme/setting/01` |
| cut gearwork | gears cut by hand | `theme/setting/01` |
| technology ceiling | `Orrery`. Hand-cut gears are in; **anything powered is out** | `theme/setting/01` |
| forbidden on any future form | cut lettering, iconography, statuary or relief of a person or creature, a face, eyes or a mouth, a rarity colour, frame, border, sparkle or badge | `theme/setting/05`; `theme/setting/01`; `D13`; `rarity.forbidden` |

### The price of the icon path, so reopening it is an argument and not a rediscovery

| cost | detail |
|---|---|
| uploads | **24** image assets, one per name in `collection.sets[].relics[]` |
| contract revision | `collection.sets[].relics[]` must change from bare strings to objects with an `art` field — a key **`gameplay/meta` owns**, not this domain |
| build | **blocks** until all 24 assets exist; `representation`'s *"no asset needs to be produced to build this game"* becomes false |
| keys broken | `representation.find`, `budgets.uploadedImageAssetsInWorldGeometry`, `theme/tone/04` `D11` (any unfound treatment), `rarity.forbidden` (any per-Find visual grade) |
| brief line contradicted | *"content design is the primary creative work on this project, **not art**"* `[brief: binding]` |
| what would justify it | a measured render of the index at phone viewport showing a name-only slot is illegible at the shipped type size — `[research owed: a screenshot or GetTextBoundsAsync reading of the index at 375 pt width]`. That number is UI Art's and `screens`', not mine |

### Revision request — filed, not applied

| field | value |
|---|---|
| against | `cid/gameplay/meta/02-the-collection.md` |
| the line | *"Art — Objects owes 24 models, and each must read at icon size in a grid"* |
| status | **stale** — written in wave 3, before `architect/06` ruled `representation.find` |
| what it moves if accepted | nothing in any manifest; it is a `## Consequences` prose line, not a value |
| what happens if declined | **nothing in this sheet changes.** `representation.find` still governs |

```json
{
  "amends": "objectArt",
  "path": "find",
  "value": {
    "worldForm": "none",
    "worldInstanceCount": 0,
    "instanceClass": null,
    "createdBy": "nothing",
    "iconCount": 0,
    "imageAssetCount": 0,
    "meshCount": 0,
    "uploadedAssetCount": 0,
    "marksAndFiguresCount": 0,
    "rarityTreatmentCount": 0,
    "panelForm": {
      "citedNotCopied": true,
      "citedNotCopiedReason": "ui-ux/screens is mid-revision on how a slot renders; copying a node list here would create a second source of truth",
      "node": "screens.screens[id=index].tree[node=Name]",
      "textFrom": "screens.screens[id=index].tree[node=Name].textFrom",
      "mutableProperty": "screens.screens[id=index].mutableProperties[0]",
      "unfoundState": "the same node holding the empty string; the slot subtree is otherwise identical to a held one"
    },
    "materialRegister": {
      "status": "authoring constraint on any future form, not a build instruction",
      "entries": ["dressed stone", "fired clay", "cast bronze", "worked wood", "cut gearwork"],
      "technologyCeiling": "Orrery — gears cut by hand are in, anything powered is out",
      "forbiddenOnAnyFutureForm": ["cut lettering", "iconography", "statuary or relief of a person or creature", "a face, eyes or a mouth", "gilding, gold or gemstones", "a rarity colour, frame, border, sparkle or badge"]
    },
    "iconPathPrice": {
      "uploads": 24,
      "contractRevision": "collection.sets[].relics[] must become objects with an art field, and gameplay/meta owns that key",
      "buildBlocksUntilAssetsExist": true,
      "keysBroken": ["representation.find", "budgets.uploadedImageAssetsInWorldGeometry", "theme/tone/04 D11", "rarity.forbidden"],
      "briefLineContradicted": "content design is the primary creative work on this project, not art",
      "whatWouldJustifyIt": "a measured render of the index at phone viewport showing a name-only slot is illegible at the shipped type size"
    },
    "revisionRequest": {
      "against": "cid/gameplay/meta/02-the-collection.md",
      "line": "Art — Objects owes 24 models, and each must read at icon size in a grid",
      "status": "stale, written before architect/06 ruled representation.find",
      "manifestValuesMoved": 0,
      "ifDeclined": "nothing in this sheet changes"
    },
    "unverified": [
      { "claim": "an ImageLabel requires an uploaded rbxassetid", "status": "settled as practice, not as a page quotation", "settlingFetch": "create.roblox.com/docs/ui/labels or the ImageLabel property YAML in creator-docs" },
      { "claim": "the genre draws unfound entries as silhouettes", "status": "search-snippet synthesis; three fetches of a shipping collection panel failed with 402, 403 and an off-topic page", "rulingDependsOnIt": false }
    ]
  }
}
```

## Consequences for other work

- **Meta and content work (`collection`)** receives one revision request and **no requirement**.
  Declining it is legitimate and cheap. What it must not do is add an `art`, `icon` or `model`
  field to `collection.sets[].relics[]` on the strength of the stale line, because four keys break.
- **UI Art work (`uiTheme`)** inherits the load this ruling shed: the 24 names carry their entire
  visual weight as **type in a slot**, so the typeface, weight and tracking are the whole treatment.
  It also gets `G10` shrunk — with object icons at zero, the image-asset ceiling nobody has set now
  covers exactly two icons, `find` and `shard`, which is a proposal it can make and **performance
  work** can ratify in one line.
- **Screens work** owns the slot node and every state of it; this sheet cites two field paths and
  copies neither, so its in-flight revision to how a slot renders costs this key nothing.
- **VFX work** gets a boundary it may not cross: `response.findReveal` persists 2.5 s at `atPatch`,
  and whatever it is made of **may not be the Find**. A reveal that leaves a modelled object at the
  patch position would create the Instance this ruling forbids.
- **Environment work** may not place a Find, a plinth for one, or a setting bed where one would sit.
  Sheet 02 `F4` and `Z5` are the checks.
- **Discovery and marketing work (wave 7)** should note there is no object render to put in a
  thumbnail, and `theme/identity/04` row 9 already forbids a mascot.

## Acceptance criteria

1. `grep -rn "rbxassetid" game/src` returns nothing, and `objectArt.find.uploadedAssetCount`,
   `iconCount`, `imageAssetCount`, `meshCount` and `worldInstanceCount` are all `0`.
2. Every one of the 24 strings in `collection.sets[].relics[]` reaches the player through exactly
   one node — `Slot_<setId>_<i>/Name.Text` — and through no `ImageLabel`, `Decal`, `MeshPart` or
   world `Instance` anywhere in `game/src`.
3. `objectArt.find.panelForm` contains only field references into `screens` and zero copied node
   definitions, sizes or colours.
4. With zero Finds held, all 24 slots render and no slot carries a silhouette, blurred model, greyed
   name, padlock or question mark (`D11`).

## Not decided here

How a slot renders, its size, its states and its copy — **screens work**, which holds `screens`;
I cite two of its fields and copy none. The typeface, weight, tracking and panel treatment that
now carry the whole visual load — **UI Art work**, which holds `uiTheme`. Whether
`collection.sets[].relics[]` gains any field at all — **meta and content work**, which owns that
key; I file a strike against one prose line and request no field. The ceiling on the two UI icons
(`G10`) — **UI Art work** to propose, **performance work** to ratify. What the reveal is made of
inside its 2.5-second dwell — **VFX work**, which holds `effects`. The 24 names themselves, and
any string about them — `collection` and **vocabulary work**; this sheet produces no player-facing
string.
