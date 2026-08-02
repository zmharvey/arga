# 01 — The one daylight state

**Domain:** art/lighting · **Category:** Art & Visuals · **Wave:** 6

## Decision

**One `Lighting` state, eighteen properties, and all eighteen are now stated.** The five shipped
values are ratified unchanged; the thirteen that were at engine defaults by accident are set here
with a reason each; and the state reaches a running game only through a fourth
`runtime.placeConfiguration` entry, which does not exist and which `RR-L1` requests. **Until
`RR-L1` lands, `lighting` has no writer.**

## Why

**The five shipped values do not change, and that is a decision rather than an omission.**
`theme/setting/03` ratified them with zero changes requested and handed me *"everything about hue,
angle and intensity inside the band"*. I looked for a reason to move one and found the opposite:
`ClockTime` 15.5 puts the sun well past noon and high, which is what `R3`'s *"no sky whose sun sits
near a horizon"* requires, and `Ambient` sitting ~0.12/channel below `OutdoorAmbient` is the entire
mechanism by which a vaulted bay reads differently from a terrace under one state.

**Thirteen properties were at defaults nobody chose, and the platform documents no defaults.** The
API reference lists types, not values
`[research: https://create.roblox.com/docs/reference/engine/classes/Lighting]`, so *"leave it at the
default"* is not a statable value and every row below is absolute. `[cid: decided]` on all thirteen;
the brief contains no hour, sky, light or shadow anywhere in eight sheets, which `theme/setting/03`
already flagged upward. They are listed again under **Flagged to the developer** with the
alternative not taken and the field that reverses each.

**One state covers eight areas and four depths, argued on geometry plus the engine, not on budget.**
Depth already reads through three non-light channels: `layout.families[]`' four disjoint chunk
families at 35/37/39/40 anchors per chunk, `depths.areas[].patchCount` 140 → 640, and rising green
quantity by `theme/setting/01`. On top of that the engine renders the terrace/vault difference from
one state for free — `Ambient` *"affects the lighting for both outdoor and indoor environments"*
while `OutdoorAmbient` *"applies specifically to outdoor areas"*, decided by surface exposure
`[research: https://create.roblox.com/docs/environment/lighting]`. **I do not rest this on
`budgets`**, whose every ceiling is `[playtest unknown]`. **So the risk runs the opposite way to the
obvious one:** depths 2–3 falling *below* the floor, not looking identical — and the reflex fix is
forbidden by name, *"you may not solve a dim vault by moving the sun"*. Sheet `02` is that problem;
this sheet holds every property that could be reached for instead.

**Three properties are fixed so the readability model is computable without a device.**
`ExposureCompensation` 0 makes the global exposure term identically 1; `ColorShift_Top` and
`_Bottom` at black make the sun-facing and away-facing tint terms identity (`_Top` *"reflects from
surfaces facing the sun"*, `_Bottom` from those facing away
`[research: https://create.roblox.com/docs/environment/lighting]`); and `EnvironmentDiffuseScale` 0
removes the environment-derived ambient term, which is both the term `02`'s static gate cannot
compute and the term that collapses hardest inside an enclosed bay. Any nonzero
`ExposureCompensation` is *moving the sun* under another name.

**`GlobalShadows` true is the property the one-state ruling actually rests on.** With it false a
vault and a terrace converge, because the only remaining difference is the ambient split. Patches
ship `CastShadow` false (`budgets`), so the 640-part-per-bay cost is not paid; what casts is
Environment's built stone, which is where the difference is supposed to come from. The cost is
against `budgets.renderCeilings`, `[playtest unknown]`, and **I set no ceiling** — `does_not_own`.

**Nobody owns the lighting-style property and the platform is mid-migration on it.**
`Enum.LightingStyle` ships exactly two members, `Realistic` (0) and `Soft` (1)
`[research: https://create.roblox.com/docs/reference/engine/enums/LightingStyle]`, while
`Enum.Technology` now marks `Legacy` and `Unified` deprecated
`[research: https://create.roblox.com/docs/reference/engine/enums/Technology]`. I set `Realistic`,
because `ShadowSoftness` *"only functions with Realistic lighting style"*
`[research: https://create.roblox.com/docs/environment/lighting]` and a hard shadow edge on cleared
stone is a local luma trough `02`'s minimum rule catches. The migration's timeline and a new place's
default are `[unverified]` secondary claims which I do not write as sourced; the key names both the
new field and the deprecated one, so a rename does not strand the value.

**Fog is stated as values, and nothing here emits Luau.** `N7`'s check greps `game/src`, which
proves no script writes fog and proves nothing about the place file — so `FogStart` 99000 and
`FogEnd` 100000 make the absence countable, and 99000 clears
`budgets.streaming.StreamingTargetRadius` 512 and `social.maxCoPresenceSeparationStuds` 128 by three
orders of magnitude. Every value here is place configuration, which keeps `theme/setting/03`
criterion 1 (*"0 code paths write any `Lighting` property after initialisation"*) satisfied by
construction — and is exactly why the key has no writer today.

**The per-part constant hour is available, unspent, and priced.** `theme/setting/03` pre-authorised
it as escalation step 3; taking it revises that sheet's criterion 1. **This sheet does not take
it**, and reserves no field, enum value or hook for it — nor for any seasonal, weather or
time-of-day channel, which `03-META.md` places in priority 3 `[brief: soft]`, a hard scope gate.

## The eighteen properties

Colour values are Roblox `Color3` 0–1 floats, as `game/default.project.json` writes them.

| property | value | shipped? | why this value |
|---|---|---|---|
| `Ambient` | `[0.32, 0.31, 0.27]` | yes, unchanged | applies indoors **and** out; R > G > B keeps a shadowed vault warm rather than blue, against *"warm, aged, unhurried … not spooky"* `[brief: soft]` |
| `OutdoorAmbient` | `[0.45, 0.43, 0.38]` | yes, unchanged | applies outdoors only; the ~0.12/channel lift over `Ambient` **is** the terrace/vault read under one state |
| `Brightness` | `2` | yes, unchanged | the direct-sun multiplier. Raising it is the forbidden fix for a dim vault; lowering it puts every unlit surface further under the floor |
| `ClockTime` | `15.5` | yes, unchanged | mid-afternoon, sun high; satisfies `R3`'s no-low-sun rule and gives long-but-not-raking shadows on built stone |
| `GeographicLatitude` | `20` | yes, unchanged | with `ClockTime`, the only two fields that set sun angle. Low latitude keeps the sun steep at 15.5 h |
| `TimeOfDay` | `"15:30:00"` | no — never stated | the string mirror of `ClockTime` 15.5. **`ClockTime` is the authoritative field**; any writer sets `ClockTime` only, and this row exists so a reviewer can see the two agree |
| `ColorShift_Top` | `[0, 0, 0]` | no | tints surfaces facing the sun. Nonzero moves the rendered luma of the exact surface the floor is measured on |
| `ColorShift_Bottom` | `[0, 0, 0]` | no | tints surfaces facing away — the undersides of vaulting, already the least-lit stone in the game |
| `EnvironmentDiffuseScale` | `0` | no | removes environment-derived ambient. `[playtest unknown]`, range 0–1: the term `02`'s static gate cannot model, and the term that collapses hardest inside a bay |
| `EnvironmentSpecularScale` | `0` | no | environment-derived specular on stone reads as sheen. `theme/setting/05` `A6` forbids a wet or reflective surface; 0 forbids it globally instead of per part |
| `ExposureCompensation` | `0` | no | a global stop offset on the final image. Any nonzero value is a brightness lever on every surface at once |
| `GlobalShadows` | `true` | no | built stone must cast, or a vault and a terrace converge. Patches are `CastShadow` false already (`budgets`), so the 640-part cost is not paid |
| `ShadowSoftness` | `0.2` | no | 0–1, functions only under `Realistic`. `[playtest unknown]`, range 0–0.5: 0 gives a hard edge that can fail `02`'s per-point minimum; 1 reads as haze, which `D2` excludes |
| `LightingStyle` | `"Realistic"` (`Enum.LightingStyle`, value 0) | no | `ShadowSoftness` depends on it. Two members exist and this is one of them |
| `Technology` | `"Future"` (`Enum.Technology`, value 4) | no | the deprecated field the platform is migrating from. Stated so the value survives the rename; **the `Future` ↔ `Realistic` correspondence is `[unverified]`** and the boot assertion must accept either field |
| `FogColor` | `[0.75, 0.73, 0.66]` | no | inert at the `FogStart` below. Set warm rather than the engine's grey so a later edit that ever brings fog into range does not arrive as cold haze |
| `FogStart` | `99000` | no | 193× `budgets.streaming.StreamingTargetRadius` 512 and 773× `social.maxCoPresenceSeparationStuds` 128. No fog exists inside any reachable distance |
| `FogEnd` | `100000` | no | must exceed `FogStart`. Together these two make "no fog" a countable pair of numbers instead of an assumption |

## What the place holds none of

| class | count | source |
|---|---|---|
| distinct lighting states | **1** | `theme/setting/03` `R1`, criterion 1 |
| code paths writing any `Lighting` property after init | **0** | `theme/setting/03` criterion 1; `grep -rn "Lighting\|ClockTime\|OutdoorAmbient" game/src` returns nothing, verified this run `[research: repo — game/src]` |
| `Atmosphere` | **0** | `theme/setting/03` `R3`; `N7` |
| `Clouds` | **0** | `theme/setting/03` `R3` |
| `Sky` | **0** | `theme/setting/03` `R3` — the sky is a backdrop, not a system. `styleGuide.roles["sky"]` sets `instances: 0` and routes its read to this key |
| `PointLight`, `SpotLight`, `SurfaceLight` | **0** each | `theme/setting/05` `A7`; `chunkDressing` `F10` independently forbids one placed to light a roofed band |
| `ColorCorrectionEffect`, `BloomEffect`, `SunRaysEffect`, `BlurEffect`, `DepthOfFieldEffect` | **0** each | `theme/tone/04` `D2`; `art/_category.md` row 27. **The colour grade in this game is `Ambient`, `OutdoorAmbient`, the two `ColorShift` fields and `ExposureCompensation` — not a post-effect** |
| fog volumes | **0** | expressed by `FogStart` 99000 / `FogEnd` 100000 above |

```manifest
{
  "provides": "lighting",
  "status": "proposed",
  "value": {
    "stateCount": 1,
    "authoritativeTimeField": "ClockTime",
    "setVia": "place configuration",
    "emitsLuauInto": [],
    "hasWriterToday": false,
    "properties": {
      "Ambient": [0.32, 0.31, 0.27],
      "OutdoorAmbient": [0.45, 0.43, 0.38],
      "Brightness": 2,
      "ClockTime": 15.5,
      "GeographicLatitude": 20,
      "TimeOfDay": "15:30:00",
      "ColorShift_Top": [0, 0, 0],
      "ColorShift_Bottom": [0, 0, 0],
      "EnvironmentDiffuseScale": 0,
      "EnvironmentSpecularScale": 0,
      "ExposureCompensation": 0,
      "GlobalShadows": true,
      "ShadowSoftness": 0.2,
      "LightingStyle": "Realistic",
      "Technology": "Future",
      "FogColor": [0.75, 0.73, 0.66],
      "FogStart": 99000,
      "FogEnd": 100000
    },
    "changedFromShipped": [],
    "newlyStated": [
      "TimeOfDay", "ColorShift_Top", "ColorShift_Bottom", "EnvironmentDiffuseScale",
      "EnvironmentSpecularScale", "ExposureCompensation", "GlobalShadows", "ShadowSoftness",
      "LightingStyle", "Technology", "FogColor", "FogStart", "FogEnd"
    ],
    "playtestUnknown": {
      "EnvironmentDiffuseScale": { "start": 0, "testRange": [0, 1] },
      "ShadowSoftness": { "start": 0.2, "testRange": [0, 0.5] }
    },
    "unverified": {
      "engineDefaults": "the API reference documents types, not defaults, so no property above may ever be written as the default",
      "technologyToLightingStyleMapping": "Future to Realistic is a secondary report, not a sourced claim; the boot assertion accepts either field",
      "lightingStyleMigrationTimeline": "secondary reports only; not written as sourced anywhere in this key"
    },
    "counts": {
      "lightingStates": 1,
      "codePathsWritingLightingAfterInit": 0,
      "Atmosphere": 0,
      "Clouds": 0,
      "Sky": 0,
      "PointLight": 0,
      "SpotLight": 0,
      "SurfaceLight": 0,
      "ColorCorrectionEffect": 0,
      "BloomEffect": 0,
      "SunRaysEffect": 0,
      "BlurEffect": 0,
      "DepthOfFieldEffect": 0,
      "fogVolumes": 0
    },
    "colourGradeMechanism": "Ambient, OutdoorAmbient, ColorShift_Top, ColorShift_Bottom, ExposureCompensation. No post-process instance exists.",
    "readability": {
      "metric": "rec601-luma",
      "metricFormula": "Y = 0.299R + 0.587G + 0.114B on 0-255 gamma-encoded sRGB",
      "renderedFloorLuma": 165,
      "renderedFloorSource": "theme/setting/01 criterion 3",
      "minRenderedRetention": 0.85,
      "minAuthoredLuma": 195,
      "authoredColourField": "styleGuide.roles[\"stone.cleared\"].rgb",
      "authoredLumaAsMerged": 201.84,
      "headroomOverStaticGate": 6.84,
      "chainHolds": "201.84 >= 195 (V6) >= 165 (theme/setting/01 criterion 3); and 195 * 0.85 = 165.75 >= 165, which is V8",
      "passRule": "minimum",
      "samplePointsPerBay": 28,
      "sampleSelection": "24 patch anchors, every ceil(N/24)-th in layout order, plus the 4 slab corners inset by layout.chunk.edgeKeepoutStuds",
      "sampleSurfaceTest": "an upward-facing face with normal dot Y >= 0.7, within 3 studs vertically of the sample position",
      "sampledState": "finished, all patches destroyed",
      "excludedFromSampling": ["patch parts", "plot-boundary parts", "tool parts", "player characters"],
      "chunkFamiliesSampledField": "layout.families[].setId",
      "chunkFamiliesSampled": ["terrace", "cistern", "vault", "spire"],
      "minSkySeeingSampleFraction": 0.5,
      "skyRayCount": 5,
      "skyRayPassThreshold": 2,
      "skyRayLengthStuds": 2000,
      "enclosureCheckStatus": "CLOSED against chunkDressing as merged. chunkDressing.roofedStudsOfZ is {1:0, 2:6, 3:12, 4:0}, at most 2.5 percent of a bay, and chunkDressing.maxHorizontalDistanceToOpenSkyUnderARoofStuds is 3, so every sample point sees sky and the realised fraction is 1.0 against a required 0.5. V9 stays as a standing check on any future roof rather than as an open risk.",
      "renderedGateDevice": "budgets.deviceFloor",
      "renderedGateScreenBrightness": "100 percent device brightness, indoors, default graphics quality",
      "renderedGateHasOwner": false,
      "wcagRatioAchromaticAtFloor": 1.53,
      "wcagRatioAtWorkedWarmStone": 2.26,
      "wcagRatioAtMergedStone": 2.31,
      "wcagReferenceRatio": 3.0,
      "wcagReferenceMet": false,
      "legibilityCarriedBy": "shape and silhouette; tiers ships four distinct shapes and four heights",
      "verifiedBy": "cid/art/lighting/02-the-readability-floor.md, rules V1 to V13",
      "playtestUnknown": {
        "minRenderedRetention": { "start": 0.85, "testRange": [0.6, 1.0] },
        "minSkySeeingSampleFraction": { "start": 0.5, "testRange": [0.25, 1.0] },
        "samplePointsPerBay": { "start": 28, "testRange": [12, 64] }
      }
    },
    "perPartConstantHourRelaxation": {
      "status": "available, unspent",
      "source": "theme/setting/03 escalation step 3",
      "whatItWouldAllow": "different parts sitting at different constant hours inside the daylight band, chosen on arrival, fixed for a whole lap, uncorrelated with depth",
      "costToTake": "a revision to theme/setting/03 criterion 1, which counts distinct lighting states as exactly 1",
      "takenHere": false,
      "fieldsReservedForIt": []
    },
    "revisionRequests": [
      {
        "id": "RR-L1",
        "against": "architect/sheets/01-runtime.md",
        "addField": "runtime.placeConfiguration.lighting",
        "precedent": "RR-P2, which added workspaceStreaming to the same block",
        "scopeNote": "art/_verified.md predicted conflict 2 groups this with RR-P2 and characters/01's StarterPlayer.HealthDisplayDistance entry as one job. Land them together; I ask for nothing separate.",
        "why": "no key, module or emitter in either contract owns a Lighting property; architect/04-tree forbids the build editing game/default.project.json; theme/setting/03 criterion 1 requires zero code paths writing Lighting after init. Without this entry the lighting key has no writer and its eighteen values reach nothing.",
        "entry": {
          "value": "every field of lighting.properties",
          "setVia": "place configuration - Lighting is a DataModel service whose properties ship in default.project.json, the one file tree forbids this build from editing, and a script write would break theme/setting/03 criterion 1",
          "ownedBy": "whoever publishes the place",
          "assertedBy": "world.configure(), which READS all eighteen Lighting properties at boot and warns naming this key on any mismatch, and which counts Atmosphere, Clouds, Sky, PointLight, SpotLight, SurfaceLight and the five post-process classes and warns on any non-zero",
          "scriptSettable": "true in principle and forbidden in practice; the assertion reads and never writes"
        }
      }
    ],
    "citedNotDuplicated": {
      "slabColour": "Plots.luau:534 sets slab.Material and never slab.Color, so the ground renders at Roblox default [163,162,165], Rec.601 luma 162.64, already below the 165 floor. art/style/01 RR-A1 files it; this key does not duplicate it and takes no position on the material half that art/_verified.md RR-5 is adjudicating between style/01 and environment/03."
    }
  }
}
```

## Capability gaps this sheet names and does not fix

| id | gap | who decides |
|---|---|---|
| G1 | **No key, module or emitter in either contract owns a `Lighting` property**, and the build may not edit `game/default.project.json`. `RR-L1` is the fix, and it is a request rather than a decision I can take | runtime work (`architect/01-runtime`); publish-checklist work owns the setting |
| G3 | **No token layer exists for anything rendered in the world.** `ui-forge`'s token tree is UI-only, and its single occurrence of the word `Lighting` is an image-generation prompt line, `` `Lighting: ${contract.lighting}.` `` at `ui-forge/src/assets/manifest.mjs:90` `[research: repo — ui-forge/src/assets/manifest.mjs, read this run]`. **That is an adjective in a prompt, not a token path — and it collides by name with this key.** Two different things called `lighting` in one repo is a finding for the seam owner | Style Guide names it; the seam owner rules |
| G13 | **Thirteen of eighteen `Lighting` properties were at defaults by accident, and the platform documents no defaults**, so nobody could have known what they were | named; `[research owed: the Lighting reference rendered with its property-default column, or a defaults reading off a fresh baseline place]` |
| G14 | **Nobody owns the lighting-style property while the platform migrates `Enum.Technology` → `Enum.LightingStyle`**, and `ShadowSoftness` depends on which is live. This key states both fields; it cannot state which the engine will honour next year | `[research owed: the unified-lighting announcement, and the lighting-style default on create.roblox.com/docs/environment/lighting]` |

## Flagged to the developer

Every row is `[cid: decided]` against a brief that contains no hour, sky, light or shadow anywhere in
eight sheets, and `OPEN.md §1` has no audit row for any of it.

| decision | alternative not taken | field that reverses it | recommendation |
|---|---|---|---|
| **`GlobalShadows` true** | false, giving up every shadow in the game on a 3 GB phone | `lighting.properties.GlobalShadows` | keep true. It is the only thing making a vault read as a vault under one state; if `budgets` refuses it, the terrace/vault difference goes with it and `02`'s gates are re-run |
| **`EnvironmentDiffuseScale` 0** | 1, the richer environment-derived ambient | `lighting.properties.EnvironmentDiffuseScale` | keep 0 until a device reading exists. `[playtest unknown]`, range 0–1: at 1 the static gate loses its only computable form |
| **`ExposureCompensation` 0** | any nonzero stop offset, the cheapest global brightness lever there is | `lighting.properties.ExposureCompensation` | keep 0. Nonzero is *moving the sun* under another name, which `theme/setting/03` forbids |
| **`LightingStyle` `Realistic` with `Technology` `Future`** | `Soft` / `ShadowMap`, cheaper, with `ShadowSoftness` inert | `lighting.properties.LightingStyle` | keep `Realistic`. The mapping between the two enums is `[unverified]`, so the boot assertion must accept either field |
| **`ShadowSoftness` 0.2** | 0, a hard edge; or 1, soft to the point of haze | `lighting.properties.ShadowSoftness` | 0.2, `[playtest unknown]`, range 0–0.5 |
| **`FogStart` 99000, `FogEnd` 100000, `FogColor` warm** | leaving all three unstated, as they were | the three fog fields | keep. Stated values make "no fog" countable; unstated ones made it an assumption |
| **The other seven** — `TimeOfDay`, both `ColorShift` fields, `EnvironmentSpecularScale`, and the four post-effect and light-class counts | leaving them at undocumented engine defaults | the named field in `lighting.properties` / `lighting.counts` | keep. A default nobody can read is not a decision |
| **One lighting state, not two** | a second, brighter state for depths 2–3 | `lighting.stateCount`, plus a revision to `theme/setting/03` criterion 1 | keep one. That sheet spent four arguments on it and pre-authorised the escalation order; the per-part constant hour is step 3 and is unspent |

## Consequences for other work

- **Runtime work (`architect/01-runtime`)** gains `RR-L1`: a fourth `placeConfiguration` entry with
  eighteen values, a `setVia`, an `ownedBy` and a `world.configure()` boot assertion that **reads and
  never writes**. `art/_verified.md` predicted conflict 2 asks that it land with `RR-P2` and
  `characters/01`'s `StarterPlayer` entry as one job; I agree and ask for nothing separate.
- **Set-dressing work (`environment`)** inherits `GlobalShadows` true: every part it authors casts,
  and the vault/terrace difference this domain declines to buy with a second state is now its
  geometry's job. Its `chunkDressing` roofed share already clears sheet `02`'s `V9` — closed there,
  with the arithmetic.
- **Palette work (`styleGuide`)** — **satisfied as merged, no action.** `roles["stone.cleared"]` is
  `[216, 201, 169]` at Rec.601 luma **201.84**, clearing `V6`'s 195 by 6.84, and 195 × 0.85 = 165.75
  ≥ 165 holds `V8`. It also gains a free guarantee: `EnvironmentSpecularScale` 0 means no surface can
  pick up environment sheen, so `A6` no longer depends on a per-part `Reflectance`.
- **VFX work (`effects`)** may not build a cue out of a light or a post-process instance: eleven
  classes are counted at zero here, so a reveal that brightens the scene has no legal mechanism.
- **Budget work (`budgets`)** is told two things and asked for nothing: `GlobalShadows` true plus
  `Realistic` is the most expensive combination in this key, and if a reading on
  `budgets.deviceFloor` refuses it the fallback is `Soft` with `GlobalShadows` false. **I set no
  ceiling.**
- **Store-art work (Discovery & Marketing, wave 7)** gets one hour and no second. **Audio work** is
  asked for nothing — there is no hour, weather or season channel to sound.

## Acceptance criteria

1. `game/default.project.json`'s `Lighting.$properties` block contains all eighteen names in
   `lighting.properties` with equal values, and
   `grep -rn "Lighting\|ClockTime\|OutdoorAmbient\|Atmosphere\|FogStart\|FogEnd" game/src` returns
   nothing.
2. `luma601(styleGuide.roles["stone.cleared"].rgb) ≥ lighting.readability.minAuthoredLuma`
   (201.84 ≥ 195 as merged), and **every field path either sheet in this domain cites into another
   key resolves in the merged manifest** — `styleGuide.roles["stone.cleared"]`, `styleGuide.roles["sky"]`,
   `layout.chunk.edgeKeepoutStuds`, `layout.families[].setId`, `depths.areas[].patchCount`,
   `budgets.streaming.StreamingTargetRadius`, `budgets.deviceFloor`, `budgets.renderCeilings`,
   `social.maxCoPresenceSeparationStuds`, `tiers[0].rgb`, `representation.plot`,
   `runtime.placeConfiguration`, `chunkDressing.roofedStudsOfZ`,
   `chunkDressing.maxHorizontalDistanceToOpenSkyUnderARoofStuds`.
3. A count over the whole DataModel returns **0** for each of `Atmosphere`, `Clouds`, `Sky`,
   `PointLight`, `SpotLight`, `SurfaceLight`, `ColorCorrectionEffect`, `BloomEffect`,
   `SunRaysEffect`, `BlurEffect`, `DepthOfFieldEffect`, and `lighting.counts.lightingStates` is 1.
4. `architect/sheets/01-runtime.md` carries a `runtime.placeConfiguration.lighting` entry with
   `setVia`, `ownedBy` and `assertedBy` — **or** the build report records `RR-L1` as open and states
   that `lighting` has no writer.

## Not decided here

**How the luma floor is verified, sampled, gated and failed** — sheet `02`, which carries no manifest
and enforces `lighting.readability` above. **The stone's hue, its rgb triple and the closed material
list** — `styleGuide` (`art/style/01`); I read `roles["stone.cleared"]` by field, choose no colour,
and take no position on the `Limestone`-versus-`Cobblestone` slab material `art/_verified.md` `RR-5`
is adjudicating. **Any luma requirement the tool or the Finds place on cleared stone** —
`objectArt`, which reads `roles["stone.cleared"].luma` for itself; I state no threshold on its
behalf. **Where the openings that light a vaulted bay sit and what they are made of, and whether a
`Sky` instance is ever added** — `environment`. **Every performance ceiling this key is measured
against** — `budgets`, Tech & Data. **Whether `lighting` is promoted into `bridge/schema.mjs`, and
what to do about the name collision with `ui-forge`'s `assetContract.lighting` prompt field** —
whoever maintains the contract and the seam. **The per-part constant hour** — nobody, until
`theme/setting/03` criterion 1 is revised; it is available, unspent, and no field here is held open
for it.
