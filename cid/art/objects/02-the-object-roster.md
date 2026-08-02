# 02 — The object roster

**Domain:** Objects · **Category:** Art & Visuals · **Wave:** 6

## Decision

**Eleven object classes render in this game and no twelfth exists.** Every one is named below with
the module that creates it and the domain that decides how it looks. **Zero loose objects render**
— `theme/setting/05` `P4`'s whole membership is `Find`s and a `Find` has no Instance, so `P4` is a
present class that builds nothing (`looseObjectInstanceCount: 0`). Fourteen further subjects are
explicit zeros with a reason and a check each. Every colour-and-material value this domain emits
takes one shape: **a named role plus the value it resolves to today**, so `styleGuide` can take the
role later without a rewrite.

## Why

- **The roster is closed because the place is.** `theme/setting/05`: *"the present column is the
  whole dressing list and it is closed. Nothing outside `P1` to `P11` appears inside the built
  edge"* `[brief: soft]`, and *"the smallest game that still gives every creative area real
  work"* `[brief: binding]`, `00-CORE.md`. A roster with an open end is how a prop class gets
  invented to look busy.
- **`P4` renders nothing, and nobody had said so.** `theme/setting/05` `P4` is *"Loose worked
  objects, set down where they were left, and **every one of them is a `Find`**"*, and it hands me
  the boundary by name: *"the fixed-or-loose rule is yours to hold. A fitting modelled into the
  building is `P3` and must read as fixed; anything loose must be a `Find`."* `representation.find`
  is `kind: none`, `class: null`, `createdBy: "nothing"`, count **0**. Composing the two: the loose
  half of the closed dressing list has zero rendered members. `[cid: decided]` on stating it; both
  inputs are approved. This is O7 and it is the check below, not a paragraph.
- **A builder dressing a bay from the present column would otherwise build P4.** That is the whole
  reason it is a check and not a note: `P4` reads like an instruction and is not one.
- **The zeros are output, not absence.** `CLAUDE.md`: *"a domain that runs and correctly concludes
  nothing is information; a silently skipped one is not."* Pets and companions are zero by
  `theme/identity/04` (*"nine classes of entity: none of them"*) and by there being no system to
  attach one to — `input`'s verb roster has no equip or summon and `response.controlEverAffected`
  is false. Per-item rarity is zero because `rarity.findRarityField` is `null` and
  `perObjectVisualGrade` is `false`.
- **Role-plus-resolved-value is forced by G3.** No token layer exists for anything rendered in the
  world (`cid/art/_category.md` G3), `cid/art/style/_lead.md` is on disk but **none of its three
  sheets is**, and `CLAUDE.md` binds *"arbitrary values enter through tokens, never as literals in
  a spec."* A bare literal would have to be rewritten when `styleGuide` lands; a role carrying its
  current resolution would not. `[cid: decided]` on the shape.
- **Every value in this domain answers a question the brief never asked.** `O1`: no material,
  colour, finish or proportion word appears for any object in the eight brief sheets.
  `theme/setting/05` `G9` records the same silence for the place. Tagged `[cid: decided]`
  throughout rather than dressed as inherited.

### The rendered roster — eleven classes, closed

| # | class | Instance | created by | look decided by | per lane | fixed / loose |
|---|---|---|---|---|---|---|
| R1 | patch | `Part`, `WedgePart` for Heartvine | `plots` | Objects, sheet **05** | ≤ `depths.areas[].patchCount` (max 640) | fixed |
| R2 | lane slab | `Part` | `plots` | Style Guide (`styleGuide`), dressed by Environment | 1 | fixed |
| R3 | plot boundary | `Part` × 4, `Transparency` 1, `CanQuery` false | `plots` | nobody — invisible by ruling, `N7` | 4 | fixed |
| R4 | spawn anchor | `Attachment` | `plots` | nobody — no geometry | 1 | fixed |
| R5 | tool | `Model` + 2 `Part` + 2 `WeldConstraint` | `tool` | Objects, sheet **03** | 1 per living character | held — `theme/setting/05`'s carve-out, neither |
| R6 | player character | platform avatar | Roblox | Characters (`characterArt`, all zeros) | 1 per player | neither |
| R7 | built stone — `P1`,`P2`,`P3`,`P6`,`P7` | **does not exist yet** | no module owns it | Environment (`environment`) | unset by me | fixed |
| R8 | canopy and sky backdrop — `P8`,`P9` | **does not exist yet** | no module owns it | Environment (`environment`) | unset by me | fixed, beyond the built edge |
| R9 | clear and reveal effect | **does not exist yet** | no module owns it | VFX (`effects`) | transient | neither |
| R10 | lobby baseplate | `Part` | `game/default.project.json` | publish-checklist work; `architect/04-tree` forbids the build editing that file | 1 shared | fixed |
| R11 | interface — HUD, four pressables, `IndexSurface` | `GuiObject`s | `client-main`, `pressables`, `index-screen` | UI Art (`uiTheme`), structure by `screens` | per screen | neither |

**`Find` is deliberately not row twelve.** It has no Instance; its entry lives in `objectArt.find`
as a zero, decided in sheet 04.

### The fixed-versus-loose rule, as a predicate

| step | rule | source |
|---|---|---|
| F1 | If an object is set into the building, it is `P3`, it reads as fixed, and it is **Environment's** to build | `theme/setting/05` `P3`, `P4` |
| F2 | If an object is not fixed, it is a `Find`. There is no third category | `theme/setting/05` `P4` |
| F3 | A `Find` has no Instance at any point in its life | `representation.find` |
| F4 | Therefore `looseObjectInstanceCount` = **0**, permanently, and `P4` renders nothing | F2 ∧ F3 |
| F5 | A tool in a player's hand is not place matter and is exempt from F1–F4 | `theme/setting/05`'s stated carve-out |
| F6 | Nothing may be added *to make an object read as fixed* — no bolt, bracket, mortar seam or setting bed as a separate Instance. Fixedness is a placement fact, not a decoration | `budgets` instance ceiling; F1 |

**Check anyone can run:** every Instance `game/src` parents at or below a lane slab is named
`Patch<n>` or appears in `environment`'s roster; and **no Instance anywhere in the built place
carries any of the 24 strings in `collection.sets[].relics[]`.**

### The zeros — fourteen, each with a reason and a check

| # | subject | count | reason | check |
|---|---|---|---|---|
| Z1 | pets | 0 | `theme/identity/04` nine entity classes, none of them | zero Instances in `game/src` parented to a character other than the one `Tool` `Model` |
| Z2 | companions | 0 | same, plus no equip or summon verb in `input`, and `response.controlEverAffected` false | as Z1 |
| Z3 | props | 0 | `theme/setting/05` — *"props of any kind"* is a stated absence; F2 makes any loose object a `Find` | roster has 11 entries and none is a prop |
| Z4 | clutter, rubble, debris | 0 | `theme/lore/01` `L5` *"intact and weathered, never rubble"*; `theme/tone/04` `D14` staged rubble | zero Instances named `Rubble`, `Debris`, `Clutter`, `Remains` |
| Z5 | loose objects (`P4`) | 0 | F4 | zero Instances carrying a `collection.sets[].relics[]` name |
| Z6 | per-item rarity read on any object | 0 | `rarity.findRarityField` is `null`; `perObjectVisualGrade` is `false`; `rarity.forbidden` bans rarity colour, frame, border, sparkle and badge on a `Find` | no property of any Instance is a function of a set, a rank or a `Find` identity |
| Z7 | uploaded mesh assets in world geometry | 0 | `budgets.uploadedMeshAssetsInWorldGeometry` 0; `N17` | `grep -rn "MeshPart\|SpecialMesh\|MeshId" game/src` returns nothing |
| Z8 | uploaded image assets in world geometry | 0 | `budgets.uploadedImageAssetsInWorldGeometry` 0; both PBR routes require an upload `[research: https://create.roblox.com/docs/parts/materials]` | zero `Decal`, `Texture`, `MaterialVariant`, `SurfaceAppearance` in `game/src` |
| Z9 | icon renders of any object | 0 | sheet 04's ruling; `representation`'s *"no asset needs to be produced to build this game"* | `grep -rn "rbxassetid" game/src` returns nothing |
| Z10 | cobwebs, skulls, bones, graves, chains, blood, scorch | 0 | `theme/tone/04` `D1` | zero Instances so named; zero materials in the banned list of sheet 03 |
| Z11 | a face, eyes or mouth on any object; a mascot | 0 | `theme/tone/04` `D13`; `theme/identity/04` row 9 | no roster entry carries a facial feature |
| Z12 | plinth, podium, pedestal, scoreboard, rank badge | 0 | `03-META.md` priority 3 — leaderboards | roster has no display furniture |
| Z13 | chest, cache, container, gift box, stall, trade counter | 0 | `03-META.md` priority 3 — trading and daily rewards; `theme/setting/05` `A17`–`A23` | no roster entry accepts or holds an object |
| Z14 | seasonal, festival or anniversary object; seed, sapling, new-growth marker | 0 | `03-META.md` priority 3 — seasons and events, rebirth; `rebirth` is in `vocabulary.bannedWords` | no roster entry varies with a date, and no reserved corner is held for one |

### The expression shape every sheet in this domain uses

One shape, so a builder never has to guess where a colour lives and `styleGuide` can adopt the role
without touching the value:

| field | meaning |
|---|---|
| `role` | kebab-case role name. **Not player-facing** — it is never rendered, so `vocabulary` does not bind it |
| `material` | one `Enum.Material` member, built-in only. 47 exist `[research: https://create.roblox.com/docs/reference/engine/enums/Material]` |
| `rgb` | the `Color3.fromRGB` triple this role resolves to **today** |
| `luma601` | `0.299R + 0.587G + 0.114B`, so `theme/setting/01`'s contrast rules are arithmetic |
| `reflectance`, `transparency` | both stated, never left at engine default |
| `roleOwnerWhenStyleGuideExists` | the path in `styleGuide` that supersedes `rgb` and `material` once that key ships |

```manifest
{
  "provides": "objectArt",
  "status": "proposed",
  "value": {
    "expressionShape": {
      "fields": ["role", "material", "rgb", "luma601", "reflectance", "transparency", "roleOwnerWhenStyleGuideExists"],
      "materialSource": "built-in Enum.Material members only, 47 of them",
      "customMaterialsForbidden": ["MaterialVariant", "SurfaceAppearance", "Texture", "Decal"],
      "customMaterialReason": "every custom-material route requires an uploaded texture asset, and budgets.textureCeilings.uploadedImageAssetsInWorldGeometry is 0",
      "roleNamesArePlayerFacing": false,
      "gapClosed": "G3 — no world token layer exists, so a role carries its resolved value until styleGuide ships"
    },
    "roster": [
      { "id": "R1", "class": "patch", "instanceClass": "Part, WedgePart for Heartvine", "createdBy": "plots", "lookDecidedBy": "art/objects sheet 05", "perLane": "depths.areas[].patchCount, max 640", "fixture": "fixed" },
      { "id": "R2", "class": "lane-slab", "instanceClass": "Part", "createdBy": "plots", "lookDecidedBy": "styleGuide", "perLane": 1, "fixture": "fixed" },
      { "id": "R3", "class": "plot-boundary", "instanceClass": "Part", "createdBy": "plots", "lookDecidedBy": "nobody, invisible by ruling", "perLane": 4, "fixture": "fixed" },
      { "id": "R4", "class": "spawn-anchor", "instanceClass": "Attachment", "createdBy": "plots", "lookDecidedBy": "nobody, no geometry", "perLane": 1, "fixture": "fixed" },
      { "id": "R5", "class": "tool", "instanceClass": "Model with two Part children", "createdBy": "tool", "lookDecidedBy": "art/objects sheet 03", "perLane": "1 per living character", "fixture": "held" },
      { "id": "R6", "class": "player-character", "instanceClass": "platform avatar", "createdBy": "Roblox", "lookDecidedBy": "characterArt", "perLane": "1 per player", "fixture": "neither" },
      { "id": "R7", "class": "built-stone", "instanceClass": "not yet created", "createdBy": "no module owns it", "lookDecidedBy": "environment", "perLane": "not set here", "fixture": "fixed" },
      { "id": "R8", "class": "canopy-and-sky-backdrop", "instanceClass": "not yet created", "createdBy": "no module owns it", "lookDecidedBy": "environment", "perLane": "not set here", "fixture": "fixed, beyond the built edge" },
      { "id": "R9", "class": "clear-and-reveal-effect", "instanceClass": "not yet created", "createdBy": "no module owns it", "lookDecidedBy": "effects", "perLane": "transient", "fixture": "neither" },
      { "id": "R10", "class": "lobby-baseplate", "instanceClass": "Part", "createdBy": "game/default.project.json", "lookDecidedBy": "publish-checklist work", "perLane": "1 shared", "fixture": "fixed" },
      { "id": "R11", "class": "interface", "instanceClass": "GuiObject", "createdBy": "client-main, pressables, index-screen", "lookDecidedBy": "uiTheme", "perLane": "per screen", "fixture": "neither" }
    ],
    "rosterIsClosed": true,
    "rosterEntryCount": 11,
    "fixedOrLoose": {
      "F1": "set into the building is P3, reads as fixed, and is Environment's to build",
      "F2": "not fixed is a Find; there is no third category",
      "F3": "a Find has no Instance at any point in its life, per representation.find",
      "F4": "therefore P4 renders nothing",
      "F5": "a tool in a player's hand is not place matter and is exempt",
      "F6": "nothing may be added as a separate Instance to make an object read as fixed",
      "predicate": "every Instance parented at or below a lane slab is named Patch<n> or appears in environment's roster",
      "check": "no Instance anywhere in the built place carries any of the 24 strings in collection.sets[].relics[]"
    },
    "looseObjectInstanceCount": 0,
    "zeros": [
      { "id": "Z1", "subject": "pets", "count": 0, "reason": "theme/identity/04 names nine entity classes and admits none", "check": "zero Instances in game/src parented to a character other than the one Tool Model" },
      { "id": "Z2", "subject": "companions", "count": 0, "reason": "same ruling, and input has no equip or summon verb and response.controlEverAffected is false", "check": "as Z1" },
      { "id": "Z3", "subject": "props", "count": 0, "reason": "props of any kind are a stated absence in theme/setting/05, and F2 makes any loose object a Find", "check": "objectArt.roster has 11 entries and none is a prop" },
      { "id": "Z4", "subject": "clutter, rubble, debris", "count": 0, "reason": "theme/lore/01 L5 intact and weathered never rubble; theme/tone/04 D14 staged rubble", "check": "zero Instances named Rubble, Debris, Clutter or Remains" },
      { "id": "Z5", "subject": "loose objects, theme/setting/05 P4", "count": 0, "reason": "F4", "check": "zero Instances carrying a collection.sets[].relics[] name" },
      { "id": "Z6", "subject": "per-item rarity read", "count": 0, "reason": "rarity.findRarityField is null and perObjectVisualGrade is false; rarity.forbidden bans colour, frame, border, sparkle and badge on a Find", "check": "no property of any Instance is a function of a set, a rank or a Find identity" },
      { "id": "Z7", "subject": "uploaded mesh assets in world geometry", "count": 0, "reason": "budgets.uploadedMeshAssetsInWorldGeometry is 0 and N17 forbids adding one", "check": "grep -rn MeshPart|SpecialMesh|MeshId game/src returns nothing" },
      { "id": "Z8", "subject": "uploaded image assets in world geometry", "count": 0, "reason": "budgets.uploadedImageAssetsInWorldGeometry is 0 and both PBR material routes require an uploaded texture", "check": "zero Decal, Texture, MaterialVariant or SurfaceAppearance instances in game/src" },
      { "id": "Z9", "subject": "icon renders of any object", "count": 0, "reason": "sheet 04's ruling, and representation states no asset needs to be produced to build this game", "check": "grep -rn rbxassetid game/src returns nothing" },
      { "id": "Z10", "subject": "cobwebs, skulls, bones, graves, chains, blood, scorch", "count": 0, "reason": "theme/tone/04 D1", "check": "zero Instances so named and zero materials from sheet 03's banned list" },
      { "id": "Z11", "subject": "a face, eyes or mouth on any object; a mascot", "count": 0, "reason": "theme/tone/04 D13 and theme/identity/04 row 9", "check": "no roster entry carries a facial feature" },
      { "id": "Z12", "subject": "plinth, podium, pedestal, scoreboard, rank badge", "count": 0, "reason": "03-META.md priority 3 forbids leaderboards, and no space is reserved for one", "check": "objectArt.roster contains no display furniture" },
      { "id": "Z13", "subject": "chest, cache, container, gift box, stall, trade counter", "count": 0, "reason": "03-META.md priority 3 forbids trading and daily rewards; theme/setting/05 A17 to A23", "check": "no roster entry accepts or holds an object" },
      { "id": "Z14", "subject": "seasonal, festival or anniversary object; seed, sapling, new-growth marker", "count": 0, "reason": "03-META.md priority 3 forbids seasons and events and rebirth; rebirth is in vocabulary.bannedWords", "check": "no roster entry varies with a date and no corner is reserved for one" }
    ],
    "zeroCount": 14,
    "playerFacingStringsProducedByThisDomain": 0,
    "tool": {
      "note": "decided in art/objects sheet 03 and folded here",
      "instanceClass": "Model",
      "partCount": 2,
      "sizesAreShippedAndNotReopened": "representation.tool — handle 0.3 x 0.3 x 1.4, head headWidth x 0.2 x 0.6",
      "allowedMaterials": ["Wood"],
      "parts": [
        { "part": "Handle", "role": "tool-grip-timber", "material": "Wood", "rgb": [122, 88, 58], "luma601": 94.7, "reflectance": 0, "transparency": 0, "roleOwnerWhenStyleGuideExists": "styleGuide.materials[worked-wood-dark]" },
        { "part": "Head", "role": "tool-head-timber-pale", "material": "Wood", "rgb": [190, 158, 118], "luma601": 163.0, "reflectance": 0, "transparency": 0, "roleOwnerWhenStyleGuideExists": "styleGuide.materials[worked-wood-pale]" }
      ],
      "invariants": {
        "headLumaMinusGripLumaAtLeast": 60,
        "headLumaVsEveryTierGreenAtLeast": 20,
        "headLumaVsClearedStoneAtLeast": 25,
        "clearedStoneLumaRequiredAtLeast": 188,
        "noGildingTest": "reflectance is 0 and blue divided by red is at least 0.55 on every part",
        "headIsPalerThanGrip": true
      },
      "bannedMaterials": ["Neon", "ForceField", "Foil", "Metal", "DiamondPlate", "CorrodedMetal", "Glass", "Ice", "Glacier", "Marble", "Basalt", "CrackedLava", "Plastic", "SmoothPlastic", "Grass", "LeafyGrass", "Fabric", "Leather"],
      "bannedMaterialCount": 18,
      "findingO6": {
        "rule": "tool T9 forbids a blade edge longer than the grip",
        "gripLengthStuds": 1.4,
        "headWidthStuds": "1.2 plus 0.35 per equivalent Reach level",
        "firstViolatingLevel": 1,
        "headWidthAtTopStuds": 4.0,
        "ratioAtTop": 2.86,
        "leverHeldByThisDomain": "material and colour only",
        "geometryRoutesTo": ["tool-behaviour work, which owns tool.headWidthPerLevelStuds", "representation work, which owns head.Size"]
      }
    },
    "find": {
      "note": "decided in art/objects sheet 04 and folded here",
      "worldForm": "none",
      "worldInstanceCount": 0,
      "iconCount": 0,
      "imageAssetCount": 0,
      "uploadedAssetCount": 0,
      "meshCount": 0,
      "marksAndFiguresCount": 0,
      "panelFormFieldReference": "screens.screens[id=index].tree[node=Name].textFrom, rendered into screens.screens[id=index].mutableProperties[0]",
      "panelFormIsCitedNotCopied": true,
      "materialRegisterIsAuthoringConstraintOnly": true,
      "materialRegister": ["dressed stone", "fired clay", "cast bronze", "worked wood", "cut gearwork"],
      "technologyCeiling": "Orrery — gears cut by hand are in, anything powered is out",
      "iconPathPrice": {
        "uploads": 24,
        "contractRevision": "collection.sets[].relics[] must become objects rather than bare strings",
        "buildBlocksUntilAssetsExist": true,
        "keysBroken": ["representation.find", "budgets.uploadedImageAssetsInWorldGeometry", "theme/tone/04 D11", "rarity.forbidden"]
      }
    },
    "foliage": {
      "note": "decided in art/objects sheet 05 and folded here",
      "kind": "primitive",
      "kindIsPermanent": true,
      "childInstancesPerPatch": 0,
      "reflectance": 0,
      "transparency": 0,
      "materialIsGrassForAllFour": true,
      "botanicalReadability": "silhouette-distinct, not species-distinct",
      "secondVisualChannelAdded": 0
    }
  }
}
```

## Consequences for other work

- **Environment work** owns rows `R7` and `R8` and inherits `F1`, `F6` and the closed roster: every
  part it adds must be fixed to the building, and it may not add a twelfth class. It also inherits
  the negative half — **`P4` is not work waiting for it either.** Nobody builds `P4`.
- **Style-guide work** inherits the expression shape. When `styleGuide.materials` exists, it takes
  the four `roleOwnerWhenStyleGuideExists` paths above and the values in this key become its
  fallback, not its competitor. Two keys describing one `Part` is the failure the seam must avoid.
- **Meta and content work (`collection`)** gets the check that keeps `Z5` honest: the 24 names must
  stay strings in a slot label and must never become an Instance name.
- **Tone and setting work (`theme/setting/05`)** should note that `P4` is recorded here as a present
  class with zero rendered members. That is a consequence, not a revision request: the class is
  correctly described and correctly renders nothing.
- **Performance work** gets an instance figure it can hold to: this domain adds **zero** Instances
  beyond what `plots` and `tool` already create. All growth against
  `budgets.instanceCeilings.serverWorldInstanceCeiling` comes from Environment.
- **Verification** gets fourteen greps and one roster arithmetic, all mechanical. A prohibition with
  no check reaches a build only if someone remembers it.

## Acceptance criteria

1. `objectArt.roster` has exactly **11** entries and `objectArt.zeros` exactly **14**, and every
   entry in `zeros` carries a non-empty `reason` and a non-empty `check`.
2. `objectArt.looseObjectInstanceCount` is `0`, and no Instance created anywhere in `game/src`
   is named with, or has a property set to, any of the 24 strings in `collection.sets[].relics[]`.
3. Zero Instances in `game/src` are parented to a character other than the one `Tool` `Model`
   (`Z1`, `Z2`).
4. Every `Instance.new` call in `game/src` creates a class that appears in
   `objectArt.roster[].instanceClass`.

## Not decided here

What built stone is made of, how it is composed and how it is distributed across `layout`'s
families — **Environment work**, which holds `environment`; row `R7` and `R8` are named, not
specified. The world palette, the closed `Enum.Material` list for the whole game, and whether a
world token layer exists — **style-guide work**, which holds `styleGuide`; I state the expression
shape and resolve four values inside it. What the clear and the reveal are made of — **VFX work**,
which holds `effects`. The two UI icons and every ceiling on them (`G10`) — **UI Art work**, which
holds `uiTheme`, and **performance work** to ratify. Patch count, spacing, chunk footprint and lane
geometry — `depths`, `layout` and `plots`; I resize nothing. The tool's, the Find's and the patch's
own values — this domain's sheets **03**, **04** and **05**, folded above.
