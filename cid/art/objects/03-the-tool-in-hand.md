# 03 — The tool in hand

**Domain:** Objects · **Category:** Art & Visuals · **Wave:** 6

## Decision

**Both parts of the tool are `Enum.Material.Wood`, `Reflectance` 0, `Transparency` 0, and the head
is markedly paler than the grip** — grip `[122, 88, 58]` (luma 94.7), head `[190, 158, 118]`
(luma 163.0). One material, two colours, three properties that shipped code currently leaves at
engine defaults. **Eighteen materials are banned by name**, `Neon` first. The two parts' sizes are
`representation.tool`'s, they ship, and this sheet does not reopen them.

## Why

- **The defect is not in dispute.** `game/src/server/Tool.luau:211`: *"Colour, Material and
  Transparency are deliberately NOT set: no key states them, so the engine defaults stand rather
  than this module choosing an appearance. Reported."* Two `Part`s in every player's hand render as
  default-grey `Plastic` `[research: https://create.roblox.com/docs/parts/materials]`. That is gap
  G7 and closing it is why `objectArt` is being proposed. Every value below is `[cid: decided]`:
  **the brief names no material, colour or finish for any object** (O1).
- **The choice space is exactly 47 built-in `Enum.Material` members**
  `[research: https://create.roblox.com/docs/reference/engine/enums/Material]`. `MaterialVariant`
  and `SurfaceAppearance` are both out on a source, not an assumption: their texture maps require
  that you *"paste an asset ID or import a new texture from your computer"*, while built-in base
  materials need no upload because their *"texture assets are bundled with Studio"*
  `[research: https://create.roblox.com/docs/parts/materials]`. `budgets` sets
  `uploadedImageAssetsInWorldGeometry` to 0, so both routes are forbidden outright.
- **Timber is the one register that is in the fiction and out of the weapon family.**
  `theme/setting/01` puts *worked wood* in the material register of a water-and-record works
  `[brief: soft]`, and `theme/lore/01` overruled the brief's *"relics must read as treasure"* with
  *"Art must not add gold, gilding or gemstones to compensate."* A timber tool needs no gilding to
  read as made rather than issued.
- **The head is paler than the grip, and that inversion is the anti-blade signal.** Every edged
  implement in the reference set is darker and shinier at the head than at the handle; a matte
  timber head lighter than its own grip reads as a rake bar or a sweep, not as a blade. It costs
  nothing, it survives greyscale, and it is countable — `head.luma − grip.luma ≥ 60`.
  `[cid: decided]`, and it is the substantive answer to `T9`.
- **163.0 is not a taste value; it is the only band left.** The four shipped `tiers[].rgb` lumas are
  123.11, 105.98, 85.00 and 69.57, and `theme/setting/01` puts cleared stone at ≥ 165. A head that
  differs from every green by ≥ 20 and from cleared stone by ≥ 25 must sit above 143.1 and below
  the stone. 163.0 clears the lightest green by **39.9** and clears a stone at 195 by **32.0**.
  The brief's own surviving reason for the archetype is that *"green overgrowth on warm stone is
  naturally high-contrast"* `[brief: soft]` — the tool is the third thing in that frame and had no
  place in it until now.
- **The grip is exempt from the ground-contrast rule and says so.** At 0.3 × 0.3 studs, gripped and
  partly occluded by the hand, it carries no channel; `tool.appearanceChannel` is `headWidth` and
  nothing else. Its only requirement is separation from the head.
- **`Neon` needs a named ban, not an adjective.** It is a member of the same enum a builder is
  choosing from, `T10` forbids a tool that lights itself, and `theme/setting/05` `A7` allows no
  light source but daylight. A build agent cannot count "not shiny"; it can count `Neon`.
- **How `Material` and `Color` combine at render time is undocumented.**
  `[research owed: create.roblox.com/docs/reference/engine/classes/BasePart#Color read together
  with the custom-materials section for the PBR compositing rule, or a Studio reading of a Wood
  part at a known Color3 under the shipped Lighting values]`. The `Color3` arithmetic above is
  checkable today; the rendered greyscale reading is not. Both are stated as criteria so the answer
  moves one number and not the design.

### The three properties, resolved

| part | size (shipped, not reopened) | role | material | rgb | luma601 | reflectance | transparency |
|---|---|---|---|---|---|---|---|
| `Handle` | `0.3 × 0.3 × 1.4` — `representation.tool` | `tool-grip-timber` | `Wood` | `[122, 88, 58]` | 94.7 | 0 | 0 |
| `Head` | `headWidth × 0.2 × 0.6` — `representation.tool` | `tool-head-timber-pale` | `Wood` | `[190, 158, 118]` | 163.0 | 0 | 0 |

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
| `SmoothPlastic` | the candy read `04-PRESENTATION.md` argues against by name |
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
| what this domain can move | material and colour only | `tool` *"you own what the tool is, its material and its proportions, inside T9 and T11"*, and both figures sit in approved keys |
| what this domain does about it | the timber material, `Reflectance` 0, and the pale-head-over-dark-grip inversion, so a 4 × 0.2 slab reads as a sweep bar rather than as an axe or a scythe | this sheet |

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
    "materialSpaceSearched": "the 47 built-in Enum.Material members; MaterialVariant and SurfaceAppearance are excluded because both require an uploaded texture asset",
    "parts": [
      { "part": "Handle", "role": "tool-grip-timber", "material": "Wood", "rgb": [122, 88, 58], "luma601": 94.7, "reflectance": 0, "transparency": 0, "exemptFromGroundContrastRule": true, "exemptionReason": "0.3 studs across, partly occluded by the hand, and it carries no appearance channel", "roleOwnerWhenStyleGuideExists": "styleGuide.materials[worked-wood-dark]" },
      { "part": "Head", "role": "tool-head-timber-pale", "material": "Wood", "rgb": [190, 158, 118], "luma601": 163.0, "reflectance": 0, "transparency": 0, "exemptFromGroundContrastRule": false, "roleOwnerWhenStyleGuideExists": "styleGuide.materials[worked-wood-pale]" }
    ],
    "invariants": {
      "headLumaMinusGripLumaAtLeast": 60,
      "headLumaMinusGripLumaActual": 68.3,
      "headIsPalerThanGrip": true,
      "headLumaVsEveryTierGreenAtLeast": 20,
      "headLumaVsTierGreensActual": [39.9, 57.0, 78.0, 93.4],
      "headLumaVsClearedStoneAtLeast": 25,
      "clearedStoneLumaRequiredAtLeast": 188,
      "noGildingTest": "reflectance is 0 and blue divided by red is at least 0.55 on every part",
      "noGildingActual": [0.475, 0.621],
      "singleColourPerPart": true,
      "singleColourReason": "one colour per part means no edge highlight exists to read as a blade"
    },
    "bannedMaterials": ["Neon", "ForceField", "Foil", "Metal", "DiamondPlate", "CorrodedMetal", "Glass", "Ice", "Glacier", "Marble", "Basalt", "CrackedLava", "Plastic", "SmoothPlastic", "Grass", "LeafyGrass", "Fabric", "Leather"],
    "bannedMaterialCount": 18,
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

- **Tool-behaviour work** and **representation work** receive finding O6 with three options and a
  recommendation. Until one is taken, `T9` and `tool.headWidthPerLevelStuds` contradict each other
  in the merged contract at every Reach level above 0. **Neither is mine to move**, and this sheet
  changes nothing about the geometry.
- **Style-guide work** inherits two role names and one requirement: **the cleared-stone role must
  resolve at luma ≥ 188.** Its own index proposes ≥ 195 headroom above the 165 floor, so this costs
  it nothing. If it resolves in `[165, 188)`, the head value here fails its own invariant and this
  sheet is the one that moves, not the stone — file it against sheet 03.
- **Tool-module work** gets three property writes it does not have: `Color`, `Material` and
  `Transparency` on both parts, at the `applyPartRules` site that currently declines to set them.
  `Reflectance` is a fourth and is stated for the same reason.
- **VFX work** should note the head is now the palest object a player will see against green. A
  clear effect placed at the patch will be read against it; that is a composition fact, not a
  request.
- **Monetization work** gets nothing new: `tool.premiumVariantAllowed` is true, `T12` requires a
  premium tool to obey `T1`–`T11` unchanged, and this sheet adds no variant, no second colour and
  no marking that could denote one. `products.F19` forbids the surface anyway.

## Acceptance criteria

1. Both tool parts set `Material = Enum.Material.Wood`, `Reflectance = 0`, `Transparency = 0` and a
   `Color3` from `objectArt.tool.parts[]`; `game/src/server/Tool.luau` leaves none of the four at an
   engine default, and the file contains no material outside the one-member allowed list.
2. `head.luma601 − grip.luma601 ≥ 60`, and `head.luma601` differs from every `tiers[].rgb` Rec.601
   luma by at least 20.
3. Neither part uses any of the 18 materials in `objectArt.tool.bannedMaterials`, and both satisfy
   the no-gilding test: `reflectance == 0` and `blue / red ≥ 0.55`.
4. Buying a Value or a Pace level changes zero properties of the tool, and buying a Reach level
   changes exactly one: `head.Size.X`.

## Not decided here

The head's and handle's sizes, the width ladder and `maxLevel` — `representation` and
**tool-behaviour work**; both ship and I cite them. Whether `T9` is restated, the grip lengthened
or the ladder capped — **tool-behaviour work** and **representation work**, on finding O6's three
options. The cleared-stone, built-stone and canopy roles this head is measured against —
**style-guide work**, which holds `styleGuide`. Any premium tool's price, rungs and thresholds —
**monetization work**. Whether the tool is visible to other players at all — `gameplay/social/02`.
The tool's name and any string about it — **vocabulary work**; this sheet produces no
player-facing string.
