# 02 — The readability floor

**Domain:** art/lighting · **Category:** Art & Visuals · **Wave:** 6

## Decision

**Thirteen rules, `V1`–`V13`, that fail a scene mechanically: the authoritative metric is Rec.601
luma, the pass rule is the *minimum* over 28 sample points per bay, and the floor is checked by two
gates — a static one computable from the merged manifest with no device, and a rendered one on
`budgets.deviceFloor` that has no owner and may not run.** The floor is not the legibility
guarantee; shape is.

**This sheet carries no `manifest` block**, on the precedent of `tech/performance/03`: the values it
enforces live in `lighting.readability` on sheet `01`, and a procedure that constrains one key is
not a second key. Every threshold below is `[playtest unknown]` with a starting value and a test
range, listed in `lighting.readability.playtestUnknown`.

## Why

**A number with no procedure attached is an assertion.** `theme/setting/01` criterion 3 sets
cleared stone at Rec.601 luma ≥ 165 and `theme/setting/03` narrows it to *"once per part, not once
per game"* — but nobody stated what surface counts, how many points on it, in which state, on what
device, or whether one dark bay fails the game. Those five blanks are this sheet.

**The metric ruling, and the finding it exposes.** The approved floor is **Rec.601 luma**,
`Y = 0.299R + 0.587G + 0.114B` on gamma-encoded sRGB, and it stays authoritative. WCAG 1.4.11 asks a
graphical object for *"a contrast ratio of at least 3:1 against adjacent color(s)"*, computed on
sRGB **relative luminance**, `L = 0.2126R + 0.7152G + 0.0722B` on **linearised** channels
`[research: https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html]`. **These are
different quantities and one does not imply the other.** Redone against real hues rather than
asserted:

| surface | rgb | Rec.601 luma | sRGB relative luminance | WCAG ratio vs `Moss` |
|---|---|---|---|---|
| `Moss`, the lightest tier green (`tiers[0].rgb`) | `[104, 142, 76]` | 123.11 | 0.2281 | 1.00 : 1 |
| an **achromatic** stone at exactly the floor | `[165, 165, 165]` | 165.00 | 0.3764 | **1.53 : 1** |
| a **warm** stone (`art/style/_lead`'s worked example, not its decision) | `[214, 199, 168]` | 199.95 | 0.5798 | **2.26 : 1** |
| the palest stone that would reach 3:1 | `[245, 230, 200]` | 231.07 | 0.8018 | 3.06 : 1 |

**Warmth nearly halves the shortfall and still does not close it.** Reaching 3:1 needs an authored
Rec.601 luma near **231** — 66 points above the floor and reading as near-white, which
`theme/setting/01` forbids by name (*"never grey granite, white marble, red brick or dark
basalt"*). And enclosure moves it the wrong way: applying a uniform 0.85 linear attenuation to both
surfaces takes the warm stone's ratio from 2.26 : 1 to **2.23 : 1**, because the `+0.05` offsets in
the ratio dominate as both terms fall. `[cid: decided — my arithmetic, shown so it can be checked]`

**That does not fail the brief, and no sheet may pretend the floor is what satisfies it.** The
brief's requirement is *"rarity tiers must differ by shape or silhouette, not only hue … This is a
requirement, not a nicety"* `[brief: soft]`, treated as effectively binding by `architect/06`. It is
carried by `tiers` shipping four distinct shapes at four distinct heights, and its check is `tiers`
criterion 4 — every tier a distinct silhouette in a greyscale screenshot. The platform arrives at
the same place independently: Roblox publishes **no contrast ratio at all** and recommends
*"different symbols alongside colors"*
`[research: https://create.roblox.com/docs/production/publishing/accessibility]`. **The luma floor
buys one thing — that cleared ground never reads as darker than the plants on it — and it does not
buy a WCAG-conformant contrast.** `V13` states that so a later sheet cannot quietly claim otherwise.

**The static gate has to stand alone, because the rendered one may never run.** An in-engine
screenshot-to-pixel route is currently blocked: `CaptureService` is client-only, gated on the
Capture capability, and returns content ids that are *"temporary and must be uploaded or saved to
persist"* `[research: https://create.roblox.com/docs/reference/engine/classes/CaptureService]`;
`EditableImage` does expose `ReadPixelsBuffer` at 4 bytes RGBA
`[research: https://create.roblox.com/docs/reference/engine/classes/EditableImage]`, but the
creation path `AssetService:CreateEditableImageAsync` is reported not to accept an `rbxtemp://` id
and to be restricted to assets the experience creator owns — **`[unverified]`, a secondary source,
and load-bearing**
`[research: https://create.roblox.com/docs/reference/engine/classes/AssetService#CreateEditableImageAsync]`.
Worse, `tech/performance/01` states in its own words that **no sheet in either contract owns taking
a reading on a device.** So `V10` is written, priced and honestly marked as possibly unrunnable, and
`V6`–`V9` are built to reach a verdict without it.

**The static model takes the minimum, not the mean, and it takes it in the dark.** A model that
needs the sun's angle needs `ClockTime`, `GeographicLatitude` and a surface normal, and Roblox
publishes no sun-position formula I could cite `[research owed: the engine's ClockTime and
GeographicLatitude to sun-direction relation]`. So the static gate evaluates the **direct-sun term
at zero** — a surface in shadow, indoors, with no sun contribution at all — which is a bound rather
than a guess and is the case the floor exists to catch. Its terms are identity by construction,
because sheet `01` fixed `ExposureCompensation` 0, both `ColorShift` fields at black and
`EnvironmentDiffuseScale` 0.

**And that bound produces the sharpest finding in this sheet.** Under a plain multiply-by-ambient
composite, a fully shadowed indoor surface at `Ambient [0.32, 0.31, 0.27]` reaches Rec.601 luma
**78.6 at pure white** and 61.9 at the worked warm stone — nowhere near 165 at any authored colour.
Either the engine does not composite ambient as a plain multiply (likely; the compositing rule is
undocumented, `[research owed: how BasePart.Material and BasePart.Color combine at render time,
inherited from `art/style/_lead`]`) **or no surface with zero sky exposure can ever meet the
floor.** Both readings force the same conclusion: **the authored openings are not a nicety, they are
the only lever**, which is exactly what `theme/setting/03` said when it handed the vault-light
question to geometry. `V8` therefore states the requirement as a **retention ratio** — rendered ≥
0.85 × authored — which is measurable, calibratable by one reading, and does not depend on a
compositing rule nobody has published.

**The enclosure check is a raycast, not a render.** `Ambient` applies indoors and out while
`OutdoorAmbient` applies only outdoors, with the engine deciding by surface exposure
`[research: https://create.roblox.com/docs/environment/lighting]`, so an enclosed bay is lit by the
darker of the two shipped values. Five upward rays per sample point, two of which must reach open
sky, is a coarse proxy for that and it is deliberately coarse: it runs with no rendering, no device
and no pixels, and it is the half of the problem `environment` can act on. **It is a requirement on
`environment`'s authored openings and never a licence to raise `Brightness`** — `V11` makes that a
byte comparison rather than an argument.

## The rules

| id | rule | protects | check |
|---|---|---|---|
| V1 | The authoritative metric is **Rec.601 luma**, `Y = 0.299R + 0.587G + 0.114B` on 0–255 gamma-encoded sRGB. No sheet substitutes sRGB relative luminance, a WCAG ratio, HSL lightness or a perceptual L\* for it | `theme/setting/01` criterion 3 | `lighting.readability.metric == "rec601-luma"`; `grep -rn "0\.2126\|relative luminance" cid/art` returns nothing inside a floor statement |
| V2 | **Cleared stone** is any upward-facing face (surface normal · Ŷ ≥ 0.7) within 3 studs vertically of a patch anchor, plus the lane slab's top face. Patch parts, plot-boundary parts, tool parts and player characters are never sampled | defines the surface the floor is about | the sample set is derived from `layout`'s anchor arrays; four named classes are excluded by name |
| V3 | **28 sample points per bay**: 24 patch anchors taken every ⌈N/24⌉-th in `layout` order, plus the 4 slab corners inset by `layout.edgeKeepoutStuds` 1.5 | a deterministic, restatable sample | the count is 28 at every `depths.areas[].patchCount` from 140 to 640; re-running yields the identical point set |
| V4 | The **finished state is authoritative** — sample with every patch destroyed. The unfinished state is sampled once only, to confirm no patch Instance occludes a sky ray | *"cleared stone"* means the ground with the green gone | patches ship `CanQuery` false (`N13`), so the two sky-exposure readings must be **identical**; a difference is a failed `N13`, not a failed floor |
| V5 | The pass rule is the **minimum** over the 28 points, never the mean, never a percentile. One point below the floor fails the whole bay | one dark bay is the entire reason the floor exists | `lighting.readability.passRule == "minimum"` |
| V6 | **Gate A (static, no device):** `luma601(styleGuide.roles.clearedStone.rgb) ≥ 195` | 195 × 0.85 = 165.75 ≥ 165 | arithmetic on the merged manifest; runs in `npm run bridge` with no world loaded |
| V7 | **Gate A:** the model's tint and exposure terms are identity — `ExposureCompensation` 0, `ColorShift_Top` `[0,0,0]`, `ColorShift_Bottom` `[0,0,0]`, `EnvironmentDiffuseScale` 0 | makes the static model computable at all | field equality against `lighting.properties`; any non-identity value voids gate A and forces `V10` |
| V8 | **Gate A:** rendered luma at the least-lit sample point ≥ **0.85** × authored luma. `[playtest unknown]`, start 0.85, test range 0.6–1.0 | the floor as a rendered quantity, without a published compositing rule | asserted by `V6`+`V7` arithmetic; calibrated by one `V10` reading, which moves this one number and not the design |
| V9 | **Gate A (renderless enclosure check):** from each sample point cast 5 rays of 2000 studs — one +Y and four at 45° on ±X and ±Z. A point **sees sky** if ≥ 2 return `nil`. **≥ 0.5 of a bay's 28 points must see sky.** `[playtest unknown]`, start 0.5, range 0.25–1.0 | `Ambient` < `OutdoorAmbient`; enclosure compresses contrast toward 1:1 | a `workspace:Raycast` loop; no rendering, no device, no capture |
| V10 | **Gate B (rendered):** one capture per chunk family — `terrace`, `cistern`, `vault`, `spire` — at standing eye height, finished state, on `budgets.deviceFloor`, at **100% device brightness, indoors, default graphics quality** (`[unverified]`: no source for outdoor phone legibility was found). Minimum Rec.601 luma over the 28 points' screen positions ≥ 165 | the floor as an observed fact rather than a modelled one | 4 readings, 112 pixel samples. **See `V12` — this gate has no owner** |
| V11 | A bay failing `V9` is fixed by `environment`'s authored openings. **Never** by `Brightness`, `ExposureCompensation`, `Ambient`, `OutdoorAmbient`, `ShadowSoftness`, `GlobalShadows`, a second lighting state, or any light instance | `theme/setting/03`: *"you may not solve a dim vault by moving the sun"* | `lighting.properties` is byte-identical before and after any `V9` remediation |
| V12 | Gate B is **currently unrunnable in-engine** and this sheet says so rather than pretending. Fallback: a manual Studio capture read in an external tool. **No sheet in either contract owns taking a device reading** | honesty about the instrument | the build report records gate B as unrun with its owner recorded as **absent**; `lighting.readability.renderedGateHasOwner` is `false` |
| V13 | **No sheet may state the Rec.601 floor as the legibility guarantee.** The computed WCAG 1.4.11 ratio is 1.53:1 achromatic at the floor and 2.26:1 at a warm stone, both under 3:1. Legibility is carried by shape and silhouette | `04-PRESENTATION.md` hard constraint | `tiers` ships 4 distinct shapes and 4 heights; `tiers` criterion 4 (distinct silhouette in a greyscale screenshot) is the check that carries the requirement |

## Consequences for other work

- **Set-dressing work (`environment`)** inherits `V9` as a hard requirement on authored openings:
  **≥ 50% of a vaulted bay's 28 sample points must see sky** through the 5-ray test. This is the
  collision the cross-category pass should look for first — it may prove unsatisfiable inside a
  `plots` bay whose footprint and `edgeKeepoutStuds` neither of us can resize, and it may not be the
  same count as `theme/setting/04` `W3`'s *"two openings per part"*, because **a passage opening and
  a light opening are different counts and nobody has reconciled them.** If `V9` cannot be met at a
  given footprint, that is a finding against `plots` and `layout` — **not** against `lighting`, and
  `V11` forbids closing it from my side.
- **Palette work (`styleGuide`)** gets its floor moved up from 165 to **195 authored**, by `V6` and
  `V8`. Its own `_lead` already proposed 30 points of headroom; this sheet fixes the number and
  states the arithmetic (165 / 0.85 = 194.1) that produces it.
- **Bay-and-lane work (`plots`, `layout`)** gains a checkable reason a bay footprint might be
  rejected, and the sample plan is expressed entirely in fields it already owns — anchor arrays,
  `edgeKeepoutStuds`, `patchCount`. **I resize nothing.**
- **Budget work (`budgets`, Tech & Data)** is named as the missing owner of `V10`, beside its own
  MicroProfiler and render-stats hole. Until someone owns a device reading, `V8`'s 0.85 is a stated
  starting value and not a measurement.
- **Overgrowth-tier work (`tiers`)** carries the accessibility requirement, not this sheet. `V13`
  hands it back explicitly and cites its criterion 4 as the check that satisfies the brief.
- **Interface work (UI Art, UI/UX)** is asked for nothing. This floor is a world quantity on world
  geometry; the HUD's contrast is a separate problem with a separate owner.

## Acceptance criteria

1. Every rule `V1`–`V13` carries a check-column entry naming a field, a count or a command; **zero
   rows read "verify visually" or any equivalent judgment call.**
2. Gate A reaches a pass/fail with no device and no capture:
   `luma601(styleGuide.roles.clearedStone.rgb) ≥ 195`,
   `lighting.properties.ExposureCompensation == 0`, `ColorShift_Top == [0,0,0]`,
   `ColorShift_Bottom == [0,0,0]`, `EnvironmentDiffuseScale == 0`.
3. For each of the four chunk families, the `V9` raycast reports **≥ 14 of 28** sample points as
   sky-seeing (≥ 2 of 5 rays returning `nil`).
4. This sheet records a computed WCAG 1.4.11 ratio strictly below 3:1 (1.53:1 and 2.26:1) and names
   shape and silhouette as the carrying channel; `tiers` ships 4 distinct shapes and 4 distinct
   heights.

## Not decided here

**Every `Lighting` property value, the state count, the eleven zero-counts and the route to a
place** — sheet `01`, which supplies `lighting` and holds `lighting.readability`; this sheet
supplies no key and proposes none. **The stone's hue and rgb triple** — `styleGuide`
(`art/style/01`), which also owns the `Plots.luau:534` slab-colour revision request; I set the
authored floor at 195 and choose no colour. **Where the openings that light a vaulted bay sit, how
wide they are and what they are made of** — `environment`; I state a fraction and author no
geometry. **The bay footprint, lane width, `edgeKeepoutStuds` and patch counts the sample plan reads
by field** — `plots`, `layout` and `depths`. **Who takes a reading on `budgets.deviceFloor`, and
whether an in-engine pixel route ever becomes legal** — unowned today, named in `V12` and routed to
Tech & Data. **Whether the accessibility requirement is met** — `tiers`, by four shapes, per `V13`.
**Whether these thirteen rules become a `bridge/merge.mjs` lint or stay build-report checks** —
contract-and-seam work, which three wave-1 sheets have already asked for the same machinery.
