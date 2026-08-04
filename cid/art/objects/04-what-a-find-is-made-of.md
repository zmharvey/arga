# 04 — What a Find is made of

**Domain:** Objects · **Category:** Art & Visuals · **Wave:** 6

## Decision

**A Find has no world Instance, no icon, no image asset and no mesh. Its only form is its name,
rendered into the index slot `screens` owns.** Zero uploaded assets, zero marks, zero figures. The
material register `theme/setting/01` states for the 24 is recorded as an **authoring constraint on
any future form**, not as a build instruction, because there is no form to author.

## Why

Three approved sources appeared to disagree and only one governs.

- **`representation.find` governs and is not stale.** *"A Find has no Instance at any point in its
  life"*, `class: null`, `createdBy: "nothing"`, count 0, with its own rationale: *"Representing it
  as a model would demand 24 assets that do not exist, block the build on them, and create a second
  source of truth for a fact `discovery.record` already holds."* A shipped build depends on it, and
  `grep -rn "rbxassetid" game/src` returning nothing is one of its criteria.
- **`gameplay/meta/02`'s *"Art — Objects owes 24 models, and each must read at icon size in a
  grid"* is stale.** It is a wave-3 *consequence* line written before `architect/06` ruled, and it
  is prose rather than a value inside the `collection` manifest — so **striking it moves no key.**
  The strike is filed below as a revision request. If Meta declines it, nothing here changes; the
  contract just carries one line of stale prose.
- **`modal-grid`'s requirement of `name`, `price` and `art` never reaches this surface.**
  `ui-ux/screens` established on three independent counts that `modal-grid` **cannot produce the
  index at all** (`modal-grid.mjs:322,459,475-487`), records the index's `producibleBy` as `null`
  and `refusedBy` as `modal-grid`, and the shipped `IndexScreen.luau` is hand-built. A compiler
  requirement from a pattern the surface does not use is not a requirement.

Three further facts each independently close the icon path.

- **There is nowhere to hang one.** `collection.sets[].relics[]` is an array of bare strings, so no
  per-Find object exists to carry an `art` key. Adding one is the same contract revision `screens`
  is already filing for flavour text, against a key `gameplay/meta` owns.
- **An icon is an uploaded asset.** `ImageLabel.Image` is typed `ContentId` and every documented
  sample is `rbxassetid://…` `[research: https://create.roblox.com/docs/reference/engine/classes/ImageLabel]`.
  **`[unverified]` as a quotation** — the page states no requirement in words; it is settled as
  practice, and the settling fetch is `create.roblox.com/docs/ui/labels`. Twenty-four uploads
  contradict `representation`'s *"no asset needs to be produced to build this game"* and block the
  build, against *"content design is the primary creative work on this project, **not art**"*
  `[brief: binding]`, `00-CORE.md`.
- **The genre's answer is banned here anyway.** `theme/tone/04` `D11` forbids a silhouette, blurred
  model, greyed name or question-mark icon for an unrevealed Find, and `representation.index-surface`
  says *"A held name reads as its name; an unfound name reads as an empty slot. **NOTHING ELSE.**"*
  A snippet attributes silhouette icons to DIG's 601-item Collection, but three fetches of a
  shipping collection panel failed (402, 403, and a page about islands) and the snippet is a
  synthesis rather than a page quote. `[unverified]` — **and the ruling does not rest on it.**

Two consequences of the ruling, stated rather than left to be discovered.

- **Marks and figures *on* a Find are zero, and that is not a deferral.** `theme/setting/05` hands
  me *"marks and figures **on** a `Find` are yours"* and there is no surface to mark. Even given a
  form, three approved rules close the interesting half: cut lettering is a stated absence,
  `theme/setting/01` bans iconography and *"statuary of a person or a creature"*, and `D13` bans a
  face, eyes or mouth on any object. **Tooling and casting marks are all that would survive.**
- **The cost belongs in the sheet.** The differentiator now carries its whole visual load on
  typography and panel layout, which are UI Art's and `screens`'. That is reversible in exactly one
  place — the price table below — so a later reader reopens it on the argument rather than by
  re-deriving it. `[cid: decided]`.

**One citation defect found while checking that my own paths resolve, filed rather than worked
around.** `screens.screens[id=index].tree[node=Name].textFrom` reads
*"`collection.sets[g].relics[i].name`, or the empty string"* — but `collection.sets[].relics[]` is
an array of **bare strings**, so `.name` does not resolve. `screens` needs
`collection.sets[g].relics[i]`. I cite the field by path and copy no value, so this key is
unaffected either way; it is filed below so `screens` fixes it rather than a builder inventing an
accessor. **It also strengthens the ruling:** the one field a builder would use to hang art on a
Find does not exist even as a name.

### The Find, as fields a builder can read

| subject | value | source |
|---|---|---|
| world Instance | **0**, at any point in its life | `representation.find` |
| Instance class | `null` | `representation.find` |
| icons | **0** | this sheet |
| image assets | **0** | this sheet; `budgets.textureCeilings.uploadedImageAssetsInWorldGeometry` 0 |
| meshes | **0** | `budgets.textureCeilings.uploadedMeshAssetsInWorldGeometry` 0; `N17` |
| marks, letters, figures | **0** | `theme/setting/05`; `theme/setting/01`; `D13` |
| rarity treatment of any kind | **0** | `rarity.forbidden`; `rarity.ladders[id=find-set].perObjectVisualGrade` is `false` |
| the one place a Find is rendered | `screens.screens[id=index].tree[node="Name"]`, a `TextLabel` whose `textFrom` reads `collection` | `screens` — **cited, not copied**, because `ui-ux/screens` is mid-revision on how a slot renders |
| the one mutable property | `screens.screens[id=index].mutableProperties[0]` — `Slot_<setId>_<i>/Name.Text` | `screens` |
| unfound state | the same node holding the empty string; the slot subtree otherwise identical to a held one | `screens`; `representation.index-surface` |

### The material register — an authoring constraint, not a build instruction

**Nothing below is a thing to build today.** It is recorded because it exists nowhere else for the 24.

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
| build | **blocks** until all 24 exist; `representation`'s *"no asset needs to be produced to build this game"* becomes false |
| keys broken | `representation.find`, `budgets.textureCeilings.uploadedImageAssetsInWorldGeometry`, `theme/tone/04` `D11`, `rarity.forbidden` |
| brief line contradicted | *"content design is the primary creative work on this project, **not art**"* `[brief: binding]` |
| what would justify it | a measured render of the index at phone viewport showing a name-only slot is illegible — `[research owed: a screenshot or GetTextBoundsAsync reading of the index at 375 pt width]`. That number is UI Art's and `screens`', not mine |

### Two revision requests — filed, not applied

| # | against | the line | status | if declined |
|---|---|---|---|---|
| 1 | `cid/gameplay/meta/02-the-collection.md` | *"Art — Objects owes 24 models, and each must read at icon size in a grid"* | **stale** — written in wave 3, before `architect/06` ruled `representation.find`. Moves no manifest value; it is a `## Consequences` prose line | **nothing in this sheet changes.** `representation.find` still governs |
| 2 | `cid/ui-ux/screens/01-collection-index.md` | `tree[node=Name].textFrom` = *"`collection.sets[g].relics[i].name`"* | **unresolvable** — `collection.sets[].relics[]` is bare strings, so `.name` is not a field. Should read `collection.sets[g].relics[i]` | this key is unaffected — it cites the path, not the value — but a builder is handed an accessor that does not exist |

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
    "rarityFieldsRead": ["rarity.findRarityField", "rarity.ladders[id=find-set].perObjectVisualGrade", "rarity.forbidden"],
    "panelForm": {
      "citedNotCopied": true,
      "citedNotCopiedReason": "ui-ux/screens is mid-revision on how a slot renders; copying a node list here would create a second source of truth",
      "node": "screens.screens[id=index].tree[node=Name]",
      "textFromField": "screens.screens[id=index].tree[node=Name].textFrom",
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
      "keysBroken": ["representation.find", "budgets.textureCeilings.uploadedImageAssetsInWorldGeometry", "theme/tone/04 D11", "rarity.forbidden"],
      "briefLineContradicted": "content design is the primary creative work on this project, not art",
      "whatWouldJustifyIt": "a measured render of the index at phone viewport showing a name-only slot is illegible at the shipped type size"
    },
    "revisionRequests": [
      {
        "id": "RQ1",
        "against": "cid/gameplay/meta/02-the-collection.md",
        "line": "Art — Objects owes 24 models, and each must read at icon size in a grid",
        "status": "stale, written before architect/06 ruled representation.find",
        "manifestValuesMoved": 0,
        "ifDeclined": "nothing in this sheet changes"
      },
      {
        "id": "RQ2",
        "against": "cid/ui-ux/screens/01-collection-index.md",
        "field": "screens.screens[id=index].tree[node=Name].textFrom",
        "problem": "reads collection.sets[g].relics[i].name, but collection.sets[].relics[] is an array of bare strings so .name does not resolve",
        "fix": "collection.sets[g].relics[i]",
        "affectsThisKey": false,
        "affectsThisKeyReason": "this key cites the field by path and copies no value"
      }
    ],
    "unverified": [
      { "claim": "an ImageLabel requires an uploaded rbxassetid", "status": "settled as practice, not as a page quotation", "settlingFetch": "create.roblox.com/docs/ui/labels or the ImageLabel property YAML in creator-docs" },
      { "claim": "the genre draws unfound entries as silhouettes", "status": "search-snippet synthesis; three fetches of a shipping collection panel failed with 402, 403 and an off-topic page", "rulingDependsOnIt": false }
    ]
  }
}
```

## Consequences for other work

- **Meta and content work (`collection`)** receives one revision request and **no requirement**.
  What it must not do is add an `art`, `icon` or `model` field to `collection.sets[].relics[]` on
  the strength of the stale line, because four keys break.
- **Screens work** owns the slot node and every state of it; this sheet cites two field paths and
  copies neither. It also receives `RQ2`: its `textFrom` names an accessor `collection` does not
  have. One-word fix, and it costs this key nothing either way.
- **UI Art work (`uiTheme`)** inherits the load this ruling shed: the 24 names carry their entire
  visual weight as **type in a slot**. It also gets `G10` shrunk — with object icons at zero, the
  unset image-asset ceiling now covers exactly two icons, `find` and `shard`, which it can propose
  and **performance work** can ratify in one line.
- **VFX work** gets a boundary it may not cross: whatever `response.findReveal` is made of during
  its 2.5-second dwell **may not be the Find**. A reveal that leaves a modelled object at the patch
  position creates the Instance this ruling forbids.
- **Environment work** may not place a Find, a plinth for one, or a setting bed where one would sit.
  Sheet 02 `F4` and `Z5` are the checks.
- **Discovery and marketing work (wave 7)** should note there is no object render for a thumbnail,
  and `theme/identity/04` row 9 already forbids a mascot.

## Acceptance criteria

1. `grep -rn "rbxassetid" game/src` returns nothing, and `objectArt.find.uploadedAssetCount`,
   `iconCount`, `imageAssetCount`, `meshCount` and `worldInstanceCount` are all `0`.
2. Every one of the 24 strings in `collection.sets[].relics[]` reaches the player through exactly
   one node — `Slot_<setId>_<i>/Name.Text` — and through no `ImageLabel`, `Decal`, `MeshPart` or
   world `Instance` anywhere in `game/src`.
3. `objectArt.find.panelForm` contains only field references into `screens` and zero copied node
   definitions, sizes or colours, and every path it names resolves against `screens`' merged shape.
4. With zero Finds held, all 24 slots render and no slot carries a silhouette, blurred model, greyed
   name, padlock or question mark (`D11`).

## Not decided here

How a slot renders, its size, its states and its copy — **screens work**, which holds `screens`; I
cite two of its fields, copy none, and file one path defect against it. The typeface, weight,
tracking and panel treatment that now carry the whole visual load — **UI Art work**, which holds
`uiTheme`. Whether `collection.sets[].relics[]` gains any field — **meta and content work**, which
owns that key; I file a strike against one prose line and request no field. The ceiling on the two
UI icons (`G10`) — **UI Art work** to propose, **performance work** to ratify. What the reveal is
made of inside its 2.5-second dwell — **VFX work**, which holds `effects`. The 24 names themselves
and any string about them — `collection` and **vocabulary work**; this sheet produces no
player-facing string.
