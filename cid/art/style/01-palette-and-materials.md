# 01 — Palette and materials

**Domain:** Style Guide · **Category:** Art & Visuals · **Wave:** 6

## Decision

**The look, in one line the other six domains quote verbatim:** *"Warm pale limestone under
green, in one afternoon: cut stone, cast fittings and plants, matte throughout, and the
ornament is cut into the stone rather than added to it."*

**Seven world colour roles with fixed `Color3` values, a closed list of eleven `Enum.Material`
rows bound one-to-one to a role and a subject class, `Reflectance` 0 everywhere and no
`Transparency` between 0 and 1.** Cleared stone is `[216, 201, 169]`, Rec.601 luma **201.84** —
36.8 above `theme/setting/01`'s 165 floor and 78.7 above the lightest tier green. `Limestone`
replaces `Slate` on the lane slab, and the slab gets a `Color` it does not have today.
**This key names roles and materials; which role a specific object takes is `objectArt`'s.**

## Why

**Every colour value here is `[cid: decided]` against a silent brief.** Six brief sheets carry
no hex, no rgb triple and no material name; `OPEN.md §1`'s art row is one question that chose a
**UI** archetype key. `[brief: soft]` on *"ornamented, warm, aged, crafted. Stone and foliage,
not candy"* (`04-PRESENTATION.md`) is the whole input, and it names no surface.

**The archetype's first reason is dead and no sheet of mine leans on it.** *"Relics must read as
treasure"* was overruled by `theme/lore/01` (*"Art must not add gold, gilding or gemstones to
compensate"*) and narrowed by `theme/setting/01` to carving, casting, dressed joints and pattern
in paving. **`fantasy-ornate` stands on reason 2 alone** — *"green overgrowth on warm stone is
naturally high-contrast"* `[brief: soft]` — which is the reason `theme/setting/01` converted into
the luma floor. My anti-gilding check below is what stops reason 1 walking back in.

**The floor has 1.9 points of slack, which is the argument for headroom rather than compliance.**
Computed from `tiers[].rgb` — cited by field, **not set, resized or recoloured here**:

| tier | Rec.601 luma `Y = 0.299R + 0.587G + 0.114B` | gap to 165 |
|---|---|---|
| `tiers[0].rgb` `[104,142,76]` | 31.10 + 83.35 + 8.66 = **123.11** | 41.9 |
| `tiers[1].rgb` `[78,128,66]` | 23.32 + 75.14 + 7.52 = **105.98** | 59.0 |
| `tiers[2].rgb` `[58,104,58]` | 17.34 + 61.05 + 6.61 = **85.00** | 80.0 |
| `tiers[3].rgb` `[44,86,52]` | 13.16 + 50.48 + 5.93 = **69.57** | 95.4 |

165 clears the lightest by 41.9 against a required 40. **Every stone role is therefore authored
at ≥ 195**, so a stone part still clears 165 after the material texture and the vault's ambient
falloff take their cut, and `theme/setting/01` criterion 3 — run **once per part**, per
`theme/setting/03` — passes on the darkest authored part rather than on an average.

**The luma floor is not the legibility guarantee, and no sheet may claim it as one.** It is
Rec.601 luma; WCAG 1.4.11's 3:1 is sRGB relative luminance, a different quantity, computing to
roughly **1.5:1** against `tiers[0]` — a 3:1 ratio would need a stone at about **231** luma,
above `C1`'s cap and therefore unreachable by any legal stone. That does not fail the brief: the
guarantee is `tiers`' four shapes and four heights under *"rarity tiers must differ by shape or
silhouette, not only hue"* `[brief: soft]`, treated as effectively binding. But a sheet citing
the luma floor as an accessibility conformance claim is citing the wrong number. Roblox publishes
no contrast ratio and prescribes *"different symbols alongside colors"*
`[research: https://create.roblox.com/docs/production/publishing/accessibility]`.

**Green is the overgrowth channel and nothing else uses it.** No role inside the built edge has
G as its largest channel; `tiers[].rgb` are the only green values in the world. That is what
keeps a bronze fitting on a wall from reading as a patch, and it costs nothing.

**A limestone world costs zero uploaded assets.** `Limestone`, `Sandstone`, `Concrete`,
`Cobblestone`, `Pavement`, `Rock`, `Slate` and `Granite` are base materials applicable to a
`BasePart`, and built-in base material textures *"are bundled with Studio instead of being
accessible as a typical asset ID"*
`[research: https://github.com/Roblox/creator-docs/blob/main/content/en-us/parts/materials.md]`.
`MaterialVariant` and `SurfaceAppearance` both take a PBR texture you *"paste an asset ID or
import"* for `[research: https://create.roblox.com/docs/parts/materials]`, which is what makes
both forbidden under `budgets.textureCeilings.uploadedImageAssetsInWorldGeometry` 0 and `N17` —
sourced, not assumed. `Enum.Material` has 47 members including `Neon`
`[research: https://create.roblox.com/docs/reference/engine/enums/Material]`, which is why the
no-glow ban names it rather than describing it.

**The luma check is two measurements, not one, and the second is `[research owed:]`.** Nothing
published states whether a base material's texture multiplies, tints or replaces the `Color3`,
or by how much rendered luminance departs from the authored value.
`[research owed: create.roblox.com/docs/reference/engine/classes/BasePart#Color read together
with create.roblox.com/docs/parts/materials#custom-materials for the PBR compositing rule; or
failing a documented answer, a Studio greyscale reading of a Limestone part at [216,201,169]
under the shipped Lighting values]` The 30-point headroom exists so that the answer moves one
number rather than the palette.

**The sky is zero instances, deliberately.** A `Sky` needs six uploaded textures, and `budgets`
says UI icons *"are the only image assets in the build"*. `theme/setting/03` `R3` makes the sky a
backdrop, not a system, and ratifies the shipped `Lighting` values with zero changes. So the sky
is the engine default at `ClockTime` 15.5 and there is no `Color3` for it. If it reads cold
against warm stone, the only legal lever is `Lighting.OutdoorAmbient`, which is Lighting's
`lighting` key and not mine. `[cid: decided]`

**Three sheets cited paths into this key that do not resolve, so the key now carries its own
spellings.** `objects/03` cited `styleGuide.materials[worked-wood-dark|pale]`; `lighting/01` and
`vfx/01` cited `styleGuide.roles.clearedStone`; `vfx/01` cited
`styleGuide.form.minimumFeatureStuds`, which is not in this key at all. Three domains each
inventing a spelling is a defect in my field names before it is one in three sheets, so `citeAs`
below is the canonical list and every alias seen is recorded beside the path that resolves.

**Gap G3 — there is no world-side token layer, and every value below is a literal.** `CLAUDE.md`
binds *"arbitrary values enter through tokens, never as literals in a spec"*; `generateTheme`
implements eight groups and every one is UI. World colour is a literal in `tiers[].rgb`, world
material a raw enum string in `patch.material`, and the lobby baseplate's colour a literal in a
project file. `generateTheme`'s additive-group route
(`[research: ui-forge/src/theme/generate.mjs:172-176]`) would already admit a `color.world` group
into the same token tree without a schema change. **I name the gap; I do not bless the literals
and I do not rule.** The seam owner does.

```manifest
{
  "provides": "styleGuide",
  "status": "proposed",
  "value": {
    "oneLine": "Warm pale limestone under green, in one afternoon: cut stone, cast fittings and plants, matte throughout, and the ornament is cut into the stone rather than added to it.",
    "oneLineIsInternal": "Not a player-facing string. vocabulary (casing title, maxLabelChars 14, maxSentenceWords 12, bannedWords) does not bind it, and no role name below is ever rendered.",
    "citeAs": {
      "whyThisExists": "verification round 1 found three sheets citing paths into this key that do not resolve. These are the spellings. An alias is a merge error, not a synonym.",
      "canonical": [
        "styleGuide.oneLine",
        "styleGuide.roles[\"stone.cleared\"]",
        "styleGuide.roles[\"stone.built\"]",
        "styleGuide.roles[\"wood.worked\"]",
        "styleGuide.roles[\"clay.fired\"]",
        "styleGuide.roles[\"metal.cast\"]",
        "styleGuide.roles[\"canopy.leaf\"]",
        "styleGuide.roles[\"canopy.trunk\"]",
        "styleGuide.roles.sky",
        "styleGuide.roles.overgrowth",
        "styleGuide.roles[<id>].rgb and .luma",
        "styleGuide.materials.rows[] — an ARRAY keyed by .id M1 through M11, each with .enum, .role and .subjectClass",
        "styleGuide.roleRules[] — keyed by .id C1 through C9",
        "styleGuide.exclusionsByName[]",
        "styleGuide.forbiddenMaterials[]",
        "styleGuide.forbiddenMechanisms[]",
        "styleGuide.surfaceRules.reflectance.value",
        "styleGuide.surfaceRules.transparency.permittedValues",
        "styleGuide.lumaCheck.partOne and .partTwo",
        "styleGuide.revisionRequests[] — keyed by .id RR-A1, RR-A2",
        "styleGuide.gapG3"
      ],
      "wrongSpellingsSeenInRoundOne": [
        { "cited": "styleGuide.roles.clearedStone", "by": "lighting/01, vfx/01", "resolvesTo": "styleGuide.roles[\"stone.cleared\"]" },
        { "cited": "styleGuide.materials[worked-wood-dark]", "by": "objects/03", "resolvesTo": "nothing. materials.rows is an array; worked wood is the row with id M7, whose role is wood.worked. There is no dark/pale pair in this key — objectArt sets an object's own two values." },
        { "cited": "styleGuide.materials[worked-wood-pale]", "by": "objects/03", "resolvesTo": "same as above" },
        { "cited": "styleGuide.form.minimumFeatureStuds", "by": "vfx/01", "resolvesTo": "formLanguage.featureSize.near.minStuds. This key holds no form, size or proportion field at all." }
      ],
      "notInThisKey": "every size, proportion, height and ornament field is in formLanguage (sheet 02). Every instance, part and triangle figure is in detailBudget (sheet 03), and every per-subject-class allocation is in environment or effects. styleGuide.form and styleGuide.budget do not exist and never will."
    },
    "lumaFormula": "Y = 0.299*R + 0.587*G + 0.114*B, Rec.601, on the authored Color3 in 0-255 space",
    "roles": {
      "stone.cleared": { "family": "stone", "rgb": [216, 201, 169], "hex": "#D8C9A9", "luma": 201.84, "rMinusB": 47, "hueDeg": 40.9, "hsvSaturation": 0.218, "appliesTo": "the lane slab and every cleared paving surface a player stands on. This is the role theme/setting/01 criterion 3 is about." },
      "stone.built": { "family": "stone", "rgb": [210, 195, 163], "hex": "#D2C3A3", "luma": 195.84, "rMinusB": 47, "hueDeg": 40.9, "hsvSaturation": 0.224, "appliesTo": "P1 vertical dressed stone: retaining wall, parapet, piers, steps, kerbs, vaulting, end walls. Also P2's channel and basin runs." },
      "wood.worked": { "family": "register", "rgb": [178, 160, 133], "hex": "#B2A085", "luma": 162.30, "rMinusB": 45, "hueDeg": 36.0, "hsvSaturation": 0.253, "appliesTo": "P3 worked-wood fittings SET INTO THE BUILDING. Weathered and silvered, never fresh timber. NOT the held tool — objectArt sets that object's own values." },
      "clay.fired": { "family": "register", "rgb": [171, 129, 101], "hex": "#AB8165", "luma": 138.37, "rMinusB": 70, "hueDeg": 24.0, "hsvSaturation": 0.409, "appliesTo": "P3 fired-clay fittings: pipe collars, tank linings, spouts. Never a wall and never a paving surface." },
      "metal.cast": { "family": "register", "rgb": [128, 108, 76], "hex": "#806C4C", "luma": 110.33, "rMinusB": 52, "hueDeg": 36.9, "hsvSaturation": 0.406, "appliesTo": "P3 cast fittings and cut gearwork SET INTO THE BUILDING (materials row M6). Weathered dull, never green-patinated (verdigris is G-largest and is banned by C6) and never gilded.", "assignedToNoObject": "struck from the tool head on verification RR-6. This key assigns this role to no held or carried object; objectArt does that." },
      "canopy.leaf": { "family": "backdrop", "rgb": [52, 66, 44], "hex": "#34422C", "luma": 59.31, "appliesTo": "P9 broadleaf canopy beyond the built edge. Darker than every tiers[].rgb by at least 10 luma so it never reads as clearable." },
      "canopy.trunk": { "family": "backdrop", "rgb": [88, 78, 64], "hex": "#584E40", "luma": 79.39, "appliesTo": "P9 trunks." },
      "sky": { "family": "backdrop", "rgb": "none", "rgbIsNone": "not a hole. Sky carries no value HERE because lighting owns it; an explicit null would emit as nil and Luau drops the key, so a reader could not tell 'answered elsewhere' from 'never written'. Sentinel per tech/deploy/02.", "instances": 0, "appliesTo": "P8 open sky. Zero Sky instances; the engine default at the ratified ClockTime 15.5. Its read is Lighting's lighting key, not this one." },
      "overgrowth": { "family": "green", "rgb": "READ tiers[].rgb BY FIELD", "shipped": true, "appliesTo": "patch. Not set, resized or recoloured here." }
    },
    "roleAssignmentBoundary": {
      "thisKeySets": "which roles exist, their Color3 values, the rules every authored world colour obeys (C1-C9), and the closed material list every world surface picks from",
      "thisKeyDoesNotSet": "which role any specific object takes. The tool's two parts, the four foliage forms and any Find's material are objectArt's; every dressed surface's role assignment is environment's; every cue's colour is effects'.",
      "whatStillBinds": "C2, C4, C5, C6 and C7 bind ANY authored Color3 in the game, and materials.rows binds any Enum.Material in world geometry, whoever assigns it.",
      "scope": "styleGuide.roles is scoped to world geometry. A held Model (the tool) sits outside it; the rules above still reach it, and uiTheme owns every GUI surface."
    },
    "roleRules": [
      { "id": "C1", "rule": "every role with family 'stone' has luma in [195, 210]", "protects": "theme/setting/01 criterion 3 at 30 points of headroom over the 165 floor, checked per part; the 210 cap is what keeps a bright stone from reading as the excluded white marble" },
      { "id": "C2", "rule": "every role with family 'stone' or 'register' has R > G > B and R - B >= 38", "protects": "'warm pale limestone'; excludes Roblox's near-neutral default part colour [163,162,165], whose R - B is -2" },
      { "id": "C3", "rule": "every role with family 'stone' has HSV saturation >= 0.18", "protects": "the white-marble and grey-granite exclusions, which are near-neutral" },
      { "id": "C4", "rule": "no role has hue below 20 degrees", "protects": "the red-brick exclusion, which sits at roughly 5-15 degrees" },
      { "id": "C5", "rule": "no role has HSV saturation >= 0.45 together with luma >= 150", "protects": "theme/lore/01's no-gilding overrule. fantasy-ornate's gold token #D4A34A is saturation 0.65 at luma 167.5 and fails this check by construction" },
      { "id": "C6", "rule": "no role inside the built edge has G as its largest channel; only tiers[].rgb do", "protects": "green is the overgrowth channel alone, so no fitting or wall detail can be mistaken for a patch. canopy.leaf is exempt because zero canopy parts are parented to a lane slab" },
      { "id": "C7", "rule": "no role's luma falls inside 123.11 +/- 8", "protects": "the lightest tier green's greyscale band. canopy roles are exempt under C6's clause" },
      { "id": "C8", "rule": "stone.cleared and stone.built are exempt from mutual separation and differ by only 6.00 luma", "why": "they are one stone, per theme/setting/04's 'the same stone, with and without plants on it'. A vertical face already renders darker than a horizontal one under ClockTime 15.5; authoring a large step would double-count that and risk pushing a wall below 165 at render" },
      { "id": "C9", "rule": "there is no depth-varying stone role and no second stone", "protects": "theme/lore/01 L4 (weathering identical at every depth) and theme/setting/03 (depth may not read darker or later). A dim vault is lit by authored openings, which is Environment's geometry, not a lighter colour and not a lighting value" }
    ],
    "exclusionsByName": [
      { "excluded": "grey granite", "source": "theme/setting/01", "enforcedBy": "C2 + C3 + Enum.Material.Granite in forbiddenMaterials" },
      { "excluded": "white marble", "source": "theme/setting/01", "enforcedBy": "C1's 210 cap + C3 + Enum.Material.Marble in forbiddenMaterials" },
      { "excluded": "red brick", "source": "theme/setting/01", "enforcedBy": "C4 + Enum.Material.Brick in forbiddenMaterials + no clay.fired element laid in a repeating rectangular course" },
      { "excluded": "dark basalt", "source": "theme/setting/01", "enforcedBy": "C1's 195 floor + Enum.Material.Basalt in forbiddenMaterials" }
    ],
    "materials": {
      "closed": true,
      "shape": "an ARRAY at styleGuide.materials.rows, keyed by .id. It is not a map and has no name-keyed lookup.",
      "rule": "this list is exhaustive for world geometry. A twelfth row is a revision against this key, not a dressing choice. The enum name is an engine texture identifier and is not fiction: theme/setting/01's exclusions are about what a surface reads as.",
      "rows": [
        { "id": "M1", "enum": "Limestone", "role": "stone.cleared", "subjectClass": "the lane slab and cleared paving (representation.plot)", "sourced": "BasePart-valid, creator-docs parts/materials" },
        { "id": "M2", "enum": "Limestone", "role": "stone.built", "subjectClass": "P1 dressed stone: retaining wall, parapet, piers, steps, kerbs, vaulting, end walls", "sourced": "same" },
        { "id": "M3", "enum": "Sandstone", "role": "stone.built", "subjectClass": "P2 channel-and-basin network only — one register step rougher, so the waterwork reads as a different piece of the same building without a second colour", "sourced": "BasePart-valid, creator-docs parts/materials" },
        { "id": "M4", "enum": "Slate", "role": "stone.built", "subjectClass": "P1 flat capping only: parapet copings, tread nosings, tank lids. Retained because it ships (Plots.luau:534) and is proven BasePart-valid by shipped code.", "sourced": "shipped" },
        { "id": "M5", "enum": "Concrete", "role": "clay.fired", "subjectClass": "P3 fired-clay fittings. Fine-grained and untextured enough to read as fired clay at hue 24 and saturation 0.41; it is not concrete in the fiction and nothing renders its name.", "sourced": "BasePart-valid, creator-docs parts/materials" },
        { "id": "M6", "enum": "SmoothPlastic", "role": "metal.cast", "subjectClass": "P3 cast fittings and cut gearwork SET INTO THE BUILDING. Smooth + dark + warm reads as cast metal at 3 studs on a phone better than any stone texture, and it is proven BasePart-valid by shipped code (Plots.luau:300). Does NOT reach the held tool.", "sourced": "shipped" },
        { "id": "M7", "enum": "Wood", "role": "wood.worked", "subjectClass": "P3 worked-wood fittings set into the building. objectArt also picks this enum for the held tool at its own two Color3 values, which is a role assignment and is theirs.", "sourced": "enum membership only — creator-docs enums/Material. If Wood turns out Terrain-only, the fallback is SmoothPlastic at the same Color3 and no other value moves." },
        { "id": "M8", "enum": "Grass", "role": "overgrowth", "subjectClass": "patch. Shipped as patch.material; read by field, not set here.", "sourced": "shipped" },
        { "id": "M9", "enum": "Grass", "role": "canopy.leaf", "subjectClass": "P9 canopy beyond the built edge. LeafyGrass was rejected: it is not established BasePart-valid in the pack.", "sourced": "shipped" },
        { "id": "M10", "enum": "Wood", "role": "canopy.trunk", "subjectClass": "P9 trunks. Same fallback as M7.", "sourced": "enum membership only" },
        { "id": "M11", "enum": "SmoothPlastic", "role": "none", "roleIsNone": "the one row that legitimately binds no role, because nothing renders: Transparency is 1. Sentinel rather than null per tech/deploy/02 — a nil role and an unwritten role are the same byte in an emitted config.", "subjectClass": "the four plot-boundary parts (representation.plot-boundary). The one row that never renders: Transparency is 1 and no Color is set by this key.", "sourced": "shipped" }
      ]
    },
    "forbiddenMaterials": ["Granite", "Marble", "Brick", "Basalt", "Neon", "Glass", "ForceField", "CorrodedMetal", "DiamondPlate", "Ice", "Snow", "Sand", "Mud", "Ground", "Asphalt", "Foil", "Fabric", "Leather", "Plastic"],
    "forbiddenMechanisms": [
      { "thing": "MaterialVariant", "why": "requires an uploaded PBR texture; budgets.textureCeilings.uploadedImageAssetsInWorldGeometry is 0 and N17 forbids it" },
      { "thing": "SurfaceAppearance", "why": "same route, same source" },
      { "thing": "Texture", "why": "an uploaded image asset in world geometry" },
      { "thing": "Decal", "why": "same; also the only route to cut lettering, which theme/setting/05 lists absent" },
      { "thing": "MeshPart / SpecialMesh", "why": "budgets.textureCeilings.uploadedMeshAssetsInWorldGeometry is 0; representation assembles every subject from primitives" },
      { "thing": "UnionOperation / NegateOperation", "why": "N1 forbids UnionAsync and SubtractAsync by grep" },
      { "thing": "Terrain", "why": "a Terrain voxel region is neither counted by the lane instance formula nor coloured by this key, and N2 keys clearing to a patch array index" }
    ],
    "surfaceRules": {
      "reflectance": { "value": 0.0, "everyPart": true, "why": "theme/setting/05 A6 — no wet or reflective surface. A single number so the check is a grep, not a judgement." },
      "transparency": { "permittedValues": [0.0, 1.0], "noIntermediate": true, "oneIsFor": ["the four plot-boundary parts (representation.plot-boundary, N7, social/02)", "the client's predicted-clear hide of a patch (prediction), which writes the authored 0 back on restore"], "exemption": "a transient tween inside response.residueLifetimeSeconds 0.4 or dwellSeconds 2.5 belongs to effects (Art — VFX) and is not an authored value. This rule constrains authored state only, and does not block a fade-out clear." },
      "castShadow": "not set by this key. Patches ship false (budgets). Every other class is Lighting's lighting key.",
      "noEmissive": "zero parts use Enum.Material.Neon and zero PointLight, SpotLight or SurfaceLight instances exist — theme/setting/05 A7 and its criterion 2. Named rather than described because Neon is a real enum member."
    },
    "lumaCheck": {
      "partOne": { "kind": "arithmetic on the authored Color3", "rule": "every part carrying a stone-family role computes Rec.601 luma >= 195", "runnable": "without a running game, from this key" },
      "partTwo": { "kind": "rendered greyscale reading", "rule": "in a greyscale screenshot of the least-lit authored part (a depth-3 vaulted bay at the ratified ClockTime 15.5), the mean greyscale of an unobstructed cleared-stone surface reads >= 165, and no cleared-stone pixel reads darker than any tiers[0] pixel in the same frame", "runnable": "in Studio on budgets.deviceFloor", "status": "[research owed:] — the Material-to-Color compositing rule is undocumented, so part two cannot be predicted from part one" },
      "whyTwoParts": "theme/setting/01 criterion 3 states both a Color3 floor and a greyscale screenshot test, and they are not the same measurement.",
      "notAWcagClaim": "this floor is Rec.601 luma. WCAG 1.4.11's 3:1 is sRGB relative luminance, computing to roughly 1.5:1 against tiers[0]; a 3:1 ratio would need about 231 luma, above C1's cap and unreachable by any legal stone. Legibility is carried by tiers' four shapes and four heights. NO SHEET MAY CITE THIS FLOOR AS AN ACCESSIBILITY CONFORMANCE CLAIM."
    },
    "revisionRequests": [
      {
        "id": "RR-A1",
        "against": "architect/sheets/06-representation.md",
        "field": "representation.plot",
        "change": "set material to Limestone (from Slate) and add color [216, 201, 169]",
        "shippedDefect": "game/src/server/Plots.luau:534 sets slab.Material = Enum.Material.Slate and assigns no slab.Color. Verified this run: zero matches for slab.Color or slab.BrickColor anywhere in that file; the only .Color assignment in it is line 249, a patch.",
        "arithmetic": "an unassigned Part renders at Roblox's default [163,162,165] -> 48.74 + 95.09 + 18.81 = 162.64 luma, which is 2.36 BELOW theme/setting/01's 165 floor, and R - B = -2, i.e. very slightly cool where the requirement is warm. The ground a player walks on — the exact surface criterion 3 is about — fails that criterion today on both halves.",
        "scope": "one property added, one property changed, on one Part. No size, position, count or geometry moves. plots, tiers and patch are untouched.",
        "notEditedHere": "this sheet files the request and does not edit architect/06."
      },
      {
        "id": "RR-A2",
        "against": "game/default.project.json:51-56 — the lobby baseplate",
        "field": "Color [0.404, 0.353, 0.286], material Slate",
        "arithmetic": "[103.0, 90.0, 72.9] -> 30.80 + 52.83 + 8.31 = 91.94 luma. Dark, and outside the fiction.",
        "routedTo": "publish-checklist work (Tech & Data — Build & Deploy), as a placeConfiguration item on the RR-P2 precedent",
        "whyNotMine": "architect/04-tree forbids the build editing that file, so this cannot be a build change and is not sheet 01's to make."
      }
    ],
    "gapG3": {
      "statement": "no token path exists for a world Color3, an Enum.Material, a Lighting property, a skybox or a ParticleEmitter. Every value in this key is therefore a literal, stated as a defect rather than blessed.",
      "routeThatAlreadyExists": "generateTheme's additive token groups, ui-forge/src/theme/generate.mjs:172-176, would admit a color.world group into the same tree with no schema change",
      "secondHalf": "even promoted, styleGuide has no emitter. bridge/emit-config.mjs produces GameConfig.luau, which is how patch.material and tiers[].rgb reach Plots.luau; ui-forge produces Theme.luau, which is UI-only and which architect/06 records no module owns. A styleGuide value reaches a Part only through GameConfig, and reaches Lighting or a skybox through nothing.",
      "owner": "contract-and-seam work. [cid: decided] on the diagnosis only; the ruling is not mine."
    },
    "scopeCheck": "no role, material row or surface rule is reserved for a seasonal, festival, weather, time-of-day, rebirth, leaderboard or trading surface. 03-META.md priority 3, and theme/setting/05 A17-A23 already state each as a fact about the place."
  }
}
```

## Consequences for other work

- **Environment work** gets eleven material rows and seven colour values and may add none. A
  twelfth material or an eighth role is a revision against `styleGuide`, not a dressing choice.
  `P6` litter and `P7` weathering have **no role of their own**: both are realised as `Color3`
  variance *inside* the `stone.built` and `stone.cleared` bands, which is what `C9` and
  `theme/lore/01` `L4` require and what keeps them free of instances. **Which surface takes which
  role is Environment's**; I set the roles, not the assignments.
- **Objects work** owns which role any specific object takes, **including the tool's two parts
  (gap G7), and this sheet now assigns none of them.** Struck on verification `RR-6`: an earlier
  draft put the tool head on `metal.cast`, whose luma 110.33 gives a head-to-grip separation of
  15.87 against the 60 `objectArt` requires for its anti-blade signal. `objectArt`'s own values —
  `Enum.Material.Wood` on both parts, grip `[118,88,66]` luma **94.46**, head `[178,160,133]`
  luma **162.30**, the head deliberately paler by **67.84** — are ratified here against `C2`,
  `C4`, `C5`, `C6` and `C7` and pass all five: `R − B` 52 and 45, hue 25.4° and 36.0°, saturation
  0.441 and 0.253, G never largest, neither luma inside 123.11 ± 8.

  **The head's five figures were wrong here until wave 7, and wrongly attributed.** This
  paragraph carried `[190,158,118]` / 163.01 / paler by 68.55 as *"`objectArt`'s own values"*.
  `objectArt` holds `[178,160,133]` / 162.30 / 67.84, and says at `art/objects/03:40-46` that it
  adopted `styleGuide.roles["wood.worked"]` **verbatim instead of** authoring a near-duplicate
  0.7 luma away — so the values ratified here were the ones that sheet declined by name, and the
  role they were said to differ from is in this key's own `roles` table. Recomputed above from
  `[178,160,133]`: all five checks still pass, which is why nothing downstream moves. Found by
  Marketing's icon writer redoing the subtraction instead of copying it, while fixing a third
  sheet that had inherited the same 163.01. **`metal.cast` stays as an
  unassigned role**, because `M6` needs it for `P3` cast fittings and cut gearwork and
  `theme/setting/01` names cast bronze in the Find register. The defect was the assignment, not
  the value. `C6` also settles that register — dressed stone, fired clay, cast bronze, worked
  wood, cut gearwork, **and never a green one.** Cite `styleGuide.materials.rows[].id`, not a
  name-keyed lookup: there is no `materials[worked-wood-dark]`.
- **VFX work** inherits `Reflectance` 0, the `Neon` ban and the intermediate-transparency
  exemption written for it by name: a fade inside `response.residueLifetimeSeconds` 0.4 is not an
  authored value and this rule does not reach it. **No effect may introduce a colour that breaks
  `C2`, `C4`, `C5` or `C6`.** Cite `styleGuide.roles["stone.cleared"]`, not `roles.clearedStone`,
  and `formLanguage.featureSize.near.minStuds`, which is not in this key.
- **Lighting work** inherits the sky: zero `Sky` instances, and if the default sky reads cold the
  only lever inside `theme/setting/03` `R1`–`R3` is `Lighting.OutdoorAmbient`. It also inherits
  the two-part luma check and the correction that this floor is Rec.601 luma, **is not a WCAG
  claim**, and that 3:1 would need about 231 luma — above `C1`'s cap, so it is unreachable by any
  legal stone and must not be attempted by brightening one.
- **UI Art work** gets `C5` as a hard check should a world token group ever be added:
  `fantasy-ornate`'s `#D4A34A` gold fails it at saturation 0.65 / luma 167.5. That does **not**
  forbid the token in UI, where `theme/lore/01`'s overrule does not reach; it forbids the same
  value entering world geometry.
- **Representation work (`architect/06`)** receives `RR-A1`. Unapplied, the game's ground stays
  2.36 luma below a floor an approved sheet states, and cool where the fiction requires warm.
- **Publish-checklist work (Build & Deploy)** receives `RR-A2`, the lobby baseplate at luma 91.94
  in a file the build may not edit.
- **Contract-and-seam work** receives gap G3 in both halves — no token path in, no emitter out —
  and `citeAs` as the shape a merged key needs if three domains are not to invent three spellings.

## Acceptance criteria

1. Every `styleGuide.roles[*].luma` equals `0.299R + 0.587G + 0.114B` on its own `rgb` to within
   0.01; every `family: "stone"` role has luma in `[195, 210]`, `R − B ≥ 38` and HSV saturation
   `≥ 0.18`; no role has hue `< 20°`; no role has saturation `≥ 0.45` **and** luma `≥ 150`.
2. No role except `overgrowth` and the two `canopy` roles has G as its largest channel, and
   `overgrowth.rgb` is the string `"READ tiers[].rgb BY FIELD"` rather than a triple.
3. `grep -rn "MaterialVariant\|SurfaceAppearance\|Decal\|Texture\|Reflectance\|rbxassetid" game/src`
   returns nothing outside client UI files, and every `Enum.Material.` occurrence in `game/src`
   names a value present in `styleGuide.materials.rows[].enum`.
4. `game/src/server/Plots.luau` assigns `slab.Color` exactly once, to
   `styleGuide.roles["stone.cleared"].rgb`, and `slab.Material` to `Enum.Material.Limestone`.
   Today both halves fail: zero `slab.Color` assignments, `Enum.Material.Slate` at line 534.

## Flagged to the developer

**The whole palette is `[cid: decided]` against a brief that names no colour.** Live
alternatives, each legal inside `theme/setting/01`'s band:

| alternative | why not taken |
|---|---|
| A near-white stone at luma ~215, maximum contrast | Fails `C1`'s 210 cap and walks into the excluded white marble; the eye reads value before chroma, so chroma does not rescue it. |
| A deeper ochre at luma ~180, more clearly "warm" | Leaves only 15 points of headroom over the 165 floor, and the rendered darkening is `[research owed:]`. A wrong guess there fails criterion 3 per part with no margin. |
| Two stones, a lighter one in the vaulted parts at depths 2–3 | Directly contradicts `theme/lore/01` `L4` and `theme/setting/03`'s "depth may not read as darker or later" by solving it in the wrong channel. `C9` forbids it. |

**My recommendation is the value as set.** If it is overruled, the cheap reversal is
`roles["stone.cleared"].rgb` and `roles["stone.built"].rgb` alone: `C1`–`C9`, the material list,
the surface rules and both revision requests are independent of the exact triple.

## Not decided here

**Which role any specific object, surface or effect takes** — `objectArt` for the tool, the
foliage and the Finds; `environment` for every dressed surface; `effects` for every cue. The
shape, size and proportion of anything these colours are painted on, and what ornament is —
sheet `02`, which holds `formLanguage`. How many parts may carry them — sheet `03`, which holds
`detailBudget`, and the per-subject-class counts, which live in `environment` and `effects`. How
the twelve present classes are composed as geometry, the paving pattern, the channel run and the
canopy's form — Environment's `environment`. The tool's proportions and its two colour values,
the foliage forms inside `tiers`' shipped shapes, and whether a Find has any form at all (gap
G6) — Objects' `objectArt`. Which archetype ships and every UI token value — UI Art's `uiTheme`.
Every `Lighting` property, `CastShadow` on anything but a patch, and how the per-part luma floor
is verified in a running place — Lighting's `lighting`. What a clear or a reveal is made of, and
whether a `ParticleEmitter` may exist at all (gap G8) — VFX's `effects`. Whether `styleGuide`
becomes a token group and who then owns `tiers[].rgb` — contract-and-seam work, per gap G3.
