# 03 — The tool in hand

**Domain:** Objects · **Category:** Art & Visuals · **Wave:** 6

## Decision

**Both parts of the tool are `Enum.Material.Wood`, `Reflectance` 0, `Transparency` 0, and the head
is markedly paler than the grip.** The head takes `styleGuide.roles["wood.worked"]` verbatim —
`[178, 160, 133]`, luma 162.30. The grip is a darker register value this key resolves,
`[118, 88, 66]`, luma 94.46, filed as a one-role addition request against `styleGuide`.
**Eighteen materials are banned by name**, `Neon` first. The two parts' sizes are
`representation.tool`'s, they ship, and this sheet does not reopen them.

## Why

- **The defect is not in dispute.** `game/src/server/Tool.luau:211`: *"Colour, Material and
  Transparency are deliberately NOT set: no key states them, so the engine defaults stand rather
  than this module choosing an appearance. Reported."* Two `Part`s in every player's hand render as
  default-grey `Plastic` `[research: https://create.roblox.com/docs/parts/materials]`. That is gap
  G7. Every value below is `[cid: decided]`: **the brief names no material, colour or finish for
  any object** (O1).
- **The choice space is exactly 47 built-in `Enum.Material` members**
  `[research: https://create.roblox.com/docs/reference/engine/enums/Material]`. `MaterialVariant`
  and `SurfaceAppearance` are both out on a source, not an assumption: their texture maps require
  that you *"paste an asset ID or import a new texture from your computer"*, while built-in base
  materials need no upload because their *"texture assets are bundled with Studio"*
  `[research: https://create.roblox.com/docs/parts/materials]`.
  `budgets.textureCeilings.uploadedImageAssetsInWorldGeometry` is 0, so both routes are forbidden.
- **Timber is the one register that is in the fiction and out of the weapon family.**
  `theme/setting/01` puts *worked wood* in the material register of a water-and-record works
  `[brief: soft]`, and `theme/lore/01` overruled the brief's *"relics must read as treasure"* with
  *"Art must not add gold, gilding or gemstones to compensate."* A timber tool needs no gilding to
  read as made rather than issued. `styleGuide.materials.rows[id=M7]` binds `Enum.Material.Wood` to
  the `wood.worked` role for `P3` fittings, and I take both.
- **The head is paler than the grip, and that inversion is the anti-blade signal.** Every edged
  implement in the reference set is darker and shinier at the head than at the handle; a matte
  timber head lighter than its own grip reads as a rake bar or a sweep, not as a blade. It costs
  nothing, survives greyscale, and is countable — `head.luma − grip.luma ≥ 60`. `[cid: decided]`,
  and it is the substantive answer to `T9`.
- **162.30 is not a taste value; it is the only band left, and `styleGuide` already sits in it.**
  The four `tiers[].rgb` lumas are 123.11, 105.98, 85.00 and 69.57, and
  `styleGuide.roles["stone.cleared"]` is 201.84. A head differing from every green by ≥ 20 and from
  cleared stone by ≥ 25 must sit above 143.1 and below the stone. `wood.worked` at 162.30 clears
  the lightest green by **39.19** and cleared stone by **39.54**. I adopt its value rather than
  authoring a near-duplicate 0.7 luma away, because two keys holding two values for one `Part` is
  the seam failure this domain warned about in its own consequences.
- **The grip has no role in `styleGuide` and I am not inventing a path for it.** `roles` holds nine
  entries and the only wood one is `wood.worked`; `metal.cast` (110.33) would leave a separation of
  51.97, below my floor of 60, and it is the metal read this sheet exists to avoid. So the grip
  value lives here and a one-role addition is requested below, with its rule proof.
- **The grip is exempt from the ground-contrast rule and says so.** At 0.3 × 0.3 studs, gripped and
  partly occluded by the hand, it carries no channel; `tool.appearanceChannel` is `headWidth` and
  nothing else. Its only requirements are separation from the head and the no-gilding test.
- **`Neon` needs a named ban, not an adjective.** It is a member of the same enum a builder is
  choosing from, `T10` forbids a tool that lights itself, and `theme/setting/05` `A7` allows no
  light source but daylight. A build agent cannot count "not shiny"; it can count `Neon`.
- **How `Material` and `Color` combine at render time is undocumented.**
  `[research owed: create.roblox.com/docs/reference/engine/classes/BasePart#Color read together
  with the custom-materials section for the PBR compositing rule, or a Studio reading of a Wood
  part at a known Color3 under the shipped Lighting values]`. The `Color3` arithmetic is checkable
  today; the rendered greyscale reading is not.

### The three properties, resolved

| part | size (shipped, not reopened) | palette role | material | rgb | luma601 | blue ÷ red | reflectance | transparency |
|---|---|---|---|---|---|---|---|---|
| `Handle` | `0.3 × 0.3 × 1.4` — `representation.tool` | none in `styleGuide` today; addition requested as `roles["wood.worked.dark"]` | `Wood` — `styleGuide.materials.rows[id=M7].enum` | `[118, 88, 66]` | 94.46 | 0.559 | 0 | 0 |
| `Head` | `headWidth × 0.2 × 0.6` — `representation.tool` | `styleGuide.roles["wood.worked"]`, adopted verbatim | `Wood` — `styleGuide.materials.rows[id=M7].enum` | `[178, 160, 133]` | 162.30 | 0.747 | 0 | 0 |

**`M7`'s stated fallback is inherited, not restated:** if `Wood` turns out Terrain-only, both parts
take `SmoothPlastic` at the same `Color3` and no other value here moves.

### Role addition requested against `styleGuide` sheet `01`

| field | value |
|---|---|
| role name | `wood.worked.dark`, family `register` |
| rgb / luma | `[118, 88, 66]` / **94.46** |
| `appliesTo` | the tool grip. Not a `P3` fitting, not a wall, not a paving surface |
| C2 — `R > G > B` and `R − B ≥ 38` | 118 > 88 > 66, `R − B` = **52** ✓ |
| C4 — hue ≥ 20° | **25.4°** ✓ |
| C5 — not (saturation ≥ 0.45 and luma ≥ 150) | saturation 0.441 at luma 94.46 ✓ |
| C6 — G is not the largest channel | R is ✓ |
| C7 — luma outside 123.11 ± 8 | 94.46 ✓ |
| if declined | the grip takes `metal.cast` (110.33), head-to-grip separation falls to **51.97**, my 60-point invariant breaks, and the anti-blade answer to `T9` weakens. **That is the cost of declining, stated so it is a choice** |

### Materials banned on the tool, by name

| material | why |
|---|---|
| `Neon` | `T10` — no self-lit tool at any Reach level; `A7` no light source but daylight |
| `ForceField` | same, and it is a shader effect rather than a surface |
| `Foil` | a specular sheen on a 4-stud slab is the metallic-edge read `T9` exists to prevent, and it is the nearest thing in the enum to gilding, which `theme/lore/01` bans |
| `Metal` | as `Foil`; a polished head reads as a blade at every width |
| `DiamondPlate` | as `Metal`, plus an industrial register the technology ceiling excludes |
| `CorrodedMetal` | as `Metal`, and rust reads as decay rather than as age — `theme/tone/04` `D1` |
| `Glass` | refractive; reads as an edge and as a light source |
| `Ice` | as `Glass`, and there is no weather in this game (`theme/setting/03` `R2`) |
| `Glacier` | as `Ice` |
| `Marble` | `theme/setting/01` bans white marble by name |
| `Basalt` | `theme/setting/01` bans dark basalt by name |
| `CrackedLava` | a light source, and `D1`'s scorch register |
| `Plastic` | the engine default the shipped code falls through to — the defect, not the fix |
| `SmoothPlastic` | **as a chosen material.** `styleGuide` `M6` binds it to `metal.cast`, which is exactly the read `T9` forbids on a 4-stud slab. It returns only as `M7`'s stated engine fallback, at the timber `Color3` |
| `Grass` | `patch.material`. A tool that renders like a patch destroys the clear affordance |
| `LeafyGrass` | as `Grass` |
| `Fabric` | cloth is a stated absence in `theme/setting/05`; a cloth-reading tool imports the one class the place forbids |
| `Leather` | as `Fabric`, plus rope and strapping |

### Finding O6 — `T9` contradicts `tool`'s own width ladder

| | value | source |
|---|---|---|
| the rule | *"no blade edge longer than the grip"* | `tool` `T9` |
| grip length | 1.4 studs | `representation.tool.handle.Size` |
| head width | `1.2 + 0.35 × level` | `tool.headWidthBaseStuds`, `tool.headWidthPerLevelStuds` |
| first violating level | **Reach level 1** — 1.55 studs against a 1.4-stud grip | arithmetic |
| width at the top of the ladder | **4.0 studs**, 2.86× the grip | `tool` |
| what this domain can move | material and colour only | `tool`: *"you own what the tool is, its material and its proportions, inside T9 and T11"*; both figures sit in approved keys |
| what this domain does about it | the timber material, `Reflectance` 0, one colour per part, and the pale-head-over-dark-grip inversion, so a 4 × 0.2 slab reads as a sweep bar rather than as an axe or a scythe | this sheet |

**Filed as a revision request to tool-behaviour work (which owns `tool.headWidthPerLevelStuds`)
and representation work (which owns `head.Size`), with three options and a recommendation.** I do
not choose among them, because neither number is mine.

| option | cost | note |
|---|---|---|
| A — restate `T9` as *"no edge highlight and no tapered profile"* rather than a length rule | zero | **Recommended.** `T9`'s own stated reason is the *silhouette* — *"no sword, axe, spear, scythe or sickle profile"* — and a 0.2-stud-thick untapered slab has no edge to be long |
| B — lengthen the grip to ≥ 4.0 studs | breaks `representation.tool.handle.Size`, shipped | a 4-stud handle on a ~2-stud character reads as a staff |
| C — cap `headWidthPerLevelStuds` so the top width stays ≤ 1.4 | breaks the brief's *"a wider tool must visibly sweep more per step"* `[brief: soft]` | would flatten the only appearance channel the tool has |

```json
{
  "amends": "objectArt",
  "path": "tool",
  "value": {
    "instanceClass": "Model",
    "partCount": 2,
    "sizesAreShippedAndNotReopened": "representation.tool — handle 0.3 x 0.3 x 1.4, head headWidth x 0.2 x 0.6",
    "allowedMaterials": ["Wood"],
    "allowedMaterialCount": 1,
    "materialFieldSource": "styleGuide.materials.rows[id=M7].enum",
    "materialFallbackInherited": "styleGuide.materials.rows[id=M7] — if Wood is Terrain-only, both parts take SmoothPlastic at the same Color3 and no other value moves",
    "materialSpaceSearched": "the 47 built-in Enum.Material members; MaterialVariant and SurfaceAppearance are excluded because both require an uploaded texture asset",
    "parts": [
      { "part": "Handle", "paletteRole": null, "paletteRoleRequested": "styleGuide.roles[\"wood.worked.dark\"]", "material": "Wood", "rgb": [118, 88, 66], "luma601": 94.46, "blueOverRed": 0.559, "reflectance": 0, "transparency": 0, "exemptFromGroundContrastRule": true, "exemptionReason": "0.3 studs across, partly occluded by the hand, and it carries no appearance channel", "resolvedHereUntilTheRoleExists": true },
      { "part": "Head", "paletteRole": "styleGuide.roles[\"wood.worked\"]", "paletteRoleAdoptedVerbatim": true, "material": "Wood", "rgb": [178, 160, 133], "luma601": 162.30, "blueOverRed": 0.747, "reflectance": 0, "transparency": 0, "exemptFromGroundContrastRule": false, "resolvedHereUntilTheRoleExists": false }
    ],
    "invariants": {
      "headLumaMinusGripLumaAtLeast": 60,
      "headLumaMinusGripLumaActual": 67.84,
      "headIsPalerThanGrip": true,
      "headLumaVsEveryTierGreenAtLeast": 20,
      "headLumaVsTierGreensActual": [39.19, 56.32, 77.30, 92.73],
      "headLumaVsClearedStoneAtLeast": 25,
      "headLumaVsClearedStoneActual": 39.54,
      "clearedStoneRoleRead": "styleGuide.roles[\"stone.cleared\"].luma = 201.84",
      "noGildingTest": "reflectance is 0 and blue divided by red is at least 0.55 on every part",
      "noGildingActual": [0.559, 0.747],
      "singleColourPerPart": true,
      "singleColourReason": "one colour per part means no edge highlight exists to read as a blade"
    },
    "roleAdditionRequested": {
      "against": "cid/art/style/01-palette-and-materials.md",
      "role": "wood.worked.dark",
      "family": "register",
      "rgb": [118, 88, 66],
      "luma": 94.46,
      "appliesTo": "the tool grip",
      "passesRoleRules": ["C2 R minus B is 52", "C4 hue 25.4 degrees", "C5 saturation 0.441 at luma 94.46", "C6 R is largest", "C7 outside 123.11 plus or minus 8"],
      "ifDeclined": "the grip takes metal.cast at 110.33, head-to-grip separation falls to 51.97, and the 60-point invariant breaks"
    },
    "bannedMaterials": ["Neon", "ForceField", "Foil", "Metal", "DiamondPlate", "CorrodedMetal", "Glass", "Ice", "Glacier", "Marble", "Basalt", "CrackedLava", "Plastic", "SmoothPlastic", "Grass", "LeafyGrass", "Fabric", "Leather"],
    "bannedMaterialCount": 18,
    "bannedMaterialException": "SmoothPlastic is banned as a chosen material and returns only as styleGuide M7's engine fallback at the timber Color3",
    "propertiesThatChangeWithLevel": ["head.Size.X"],
    "propertiesThatNeverChangeWithLevel": ["Color", "Material", "Transparency", "Reflectance", "class", "part count"],
    "renderedLumaCheckStatus": "research owed — the compositing rule between BasePart.Material and BasePart.Color is undocumented, so only the Color3 arithmetic is checkable today",
    "findingO6": {
      "rule": "tool T9 forbids a blade edge longer than the grip",
      "gripLengthStuds": 1.4,
      "headWidthExpression": "tool.headWidthBaseStuds 1.2 plus tool.headWidthPerLevelStuds 0.35 per equivalent Reach level",
      "firstViolatingLevel": 1,
      "widthAtFirstViolatingLevelStuds": 1.55,
      "headWidthAtTopStuds": 4.0,
      "ratioAtTop": 2.86,
      "leverHeldByThisDomain": "material and colour only",
      "answerTaken": "Wood at Reflectance 0 with a head paler than its grip and one colour per part, so the slab reads as a sweep bar",
      "routedTo": ["tool-behaviour work, which owns tool.headWidthPerLevelStuds", "representation work, which owns head.Size"],
      "options": [
        { "id": "A", "change": "restate T9 as no edge highlight and no tapered profile rather than a length rule", "cost": "zero", "recommended": true },
        { "id": "B", "change": "lengthen the grip to at least 4.0 studs", "cost": "breaks representation.tool.handle.Size, which ships", "recommended": false },
        { "id": "C", "change": "cap headWidthPerLevelStuds so the top width stays at or under 1.4", "cost": "flattens the tool's only appearance channel against the brief's reach statement", "recommended": false }
      ]
    }
  }
}
```

## Consequences for other work

- **Style-guide work** gets one role-addition request (`wood.worked.dark`, with its C2/C4/C5/C6/C7
  proof) and **no value dispute**: the head now reads `roles["wood.worked"]` verbatim and the
  material reads `materials.rows[id=M7].enum`, so one key holds one value for one `Part`. Its
  `metal.cast` / `SmoothPlastic` assignment for the tool head is superseded, which it is striking.
- **Tool-behaviour work** and **representation work** receive finding O6 with three options and a
  recommendation. Until one is taken, `T9` and `tool.headWidthPerLevelStuds` contradict each other
  at every Reach level above 0. **Neither is mine to move.**
- **Tool-module work** gets four property writes it does not have — `Color`, `Material`,
  `Transparency` and `Reflectance` on both parts — at the `applyPartRules` site that currently
  declines to set the first three because no key stated them. Now one does.
- **VFX work** should note the head is the palest object a player will see against green. A clear
  effect at the patch is read against it; that is a composition fact, not a request.
- **Monetization work** gets nothing new: `T12` requires a premium tool to obey `T1`–`T11`
  unchanged, and this sheet adds no variant, no second colour and no marking that could denote one.

## Acceptance criteria

1. Both tool parts set `Material = Enum.Material.Wood`, `Reflectance = 0`, `Transparency = 0` and a
   `Color3` from `objectArt.tool.parts[]`; `game/src/server/Tool.luau` leaves none of the four at an
   engine default, and names no material outside the one-member allowed list.
2. `head.luma601 − grip.luma601 ≥ 60`, `head.luma601` differs from every `tiers[].rgb` Rec.601 luma
   by ≥ 20, and from `styleGuide.roles["stone.cleared"].luma` by ≥ 25.
3. `objectArt.tool.parts[Head].rgb` equals `styleGuide.roles["wood.worked"].rgb` field for field,
   and neither part uses any of the 18 materials in `objectArt.tool.bannedMaterials`.
4. Buying a Value or a Pace level changes zero properties of the tool, and buying a Reach level
   changes exactly one: `head.Size.X`.

## Not decided here

The head's and handle's sizes, the width ladder and `maxLevel` — `representation` and
**tool-behaviour work**; both ship and I cite them. Whether `T9` is restated, the grip lengthened
or the ladder capped — **tool-behaviour work** and **representation work**, on O6's three options.
Whether `wood.worked.dark` is added, and every value of every other role — **style-guide work**,
which holds `styleGuide`; I request one role and author no palette. Any premium tool's price, rungs
and thresholds — **monetization work**. Whether the tool is visible to other players —
`gameplay/social/02`. The tool's name and any string about it — **vocabulary work**; this sheet
produces no player-facing string.
