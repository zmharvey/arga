# 02 — The readability floor

**Domain:** art/lighting · **Category:** Art & Visuals · **Wave:** 6

## Decision

**Thirteen rules, `V1`–`V13`, that fail a scene mechanically: the authoritative metric is Rec.601
luma, the pass rule is the *minimum* over 28 sample points per bay, and the floor is checked by two
gates — a static one computable from the merged manifest with no device, and a rendered one on
`budgets.deviceFloor` that has no owner and may not run.** The floor is not the legibility
guarantee; shape is. **`V9`'s predicted collision with `environment` is closed, not carried** — see
below.

**This sheet carries no `manifest` block**, on `tech/performance/03`'s precedent: the values it
enforces live in `lighting.readability` on sheet `01`, and a procedure constraining one key is not a
second key. Every threshold below is `[playtest unknown]` with a start and a test range, listed in
`lighting.readability.playtestUnknown`.

**This sheet carries no manifest block.** `V1`–`V13` are a procedure that constrains
**`lighting`**, which sheet `01` supplies, plus `styleGuide.roles` and `budgets.deviceFloor`, which
are read by field and chosen nowhere here. A procedure constraining one key is not a second key.

*This is the precedent `marketing/icon/02:14` cites by name — and until this line existed, the file
establishing it did not state it. The precedent was real; the citation resolved to nothing.*

## Why

**A number with no procedure attached is an assertion.** `theme/setting/01` criterion 3 sets cleared
stone at Rec.601 luma ≥ 165 and `theme/setting/03` narrows it to *"once per part, not once per
game"* — but nobody stated what surface counts, how many points on it, in which state, on what
device, or whether one dark bay fails the game. Those five blanks are this sheet.

**The metric ruling, and the finding it exposes.** The approved floor is **Rec.601 luma**,
`Y = 0.299R + 0.587G + 0.114B` on gamma-encoded sRGB, and it stays authoritative. WCAG 1.4.11 asks a
graphical object for *"a contrast ratio of at least 3:1 against adjacent color(s)"* on sRGB
**relative luminance**, `L = 0.2126R + 0.7152G + 0.0722B`, over **linearised** channels
`[research: https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html]`. **Different
quantities; one does not imply the other.** Redone against real hues, including the stone as merged:

| surface | rgb | Rec.601 luma | sRGB relative luminance | WCAG ratio vs `Moss` |
|---|---|---|---|---|
| `Moss`, the lightest tier green (`tiers[0].rgb`) | `[104, 142, 76]` | 123.11 | 0.2281 | 1.00 : 1 |
| an **achromatic** stone at exactly the floor | `[165, 165, 165]` | 165.00 | 0.3764 | **1.53 : 1** |
| `styleGuide.roles["stone.cleared"].rgb` **as merged** | `[216, 201, 169]` | 201.84 | 0.5924 | **2.31 : 1** |
| the earlier worked example, kept so the trend is visible | `[214, 199, 168]` | 199.95 | 0.5798 | 2.26 : 1 |
| the palest stone that would reach 3:1 | `[245, 230, 200]` | 231.07 | 0.8018 | 3.06 : 1 |

**Warmth nearly halves the shortfall and still does not close it.** Reaching 3:1 needs an authored
Rec.601 luma near **231** — 66 above the floor, near-white, which `theme/setting/01` forbids by name
(*"never grey granite, white marble, red brick or dark basalt"*) and which `styleGuide` `C1`'s
`[195, 210]` band excludes by construction. Enclosure moves it the wrong way: a uniform 0.85 linear
attenuation on both surfaces takes the merged stone from 2.31 : 1 to **2.27 : 1**, because the
`+0.05` offsets dominate as both terms fall.
`[cid: decided — my arithmetic, shown so it can be checked; the 1.53 and 2.26 rows were
independently recomputed and confirmed at 1.535 and 2.264]`

**That does not fail the brief, and no sheet may pretend the floor is what satisfies it.** The
requirement is *"rarity tiers must differ by shape or silhouette, not only hue … a requirement, not
a nicety"* `[brief: soft]`, read as binding by `architect/06`, and it is carried by `tiers` shipping
four distinct shapes at four heights, checked by `tiers` criterion 4. The platform lands in the same
place: Roblox publishes **no contrast ratio at all** and recommends *"different symbols alongside
colors"* `[research: https://create.roblox.com/docs/production/publishing/accessibility]`. **The
luma floor buys one thing — cleared ground never reads darker than the plants on it — and it does
not buy a WCAG-conformant contrast.** `V13` states that so a later sheet cannot claim otherwise.

**`V9` is closed against `chunkDressing`, and the closure is the arithmetic rather than an
assurance.** `V9` requires ≥ 50% of a bay's 28 sample points to see sky. As merged,
`chunkDressing.roofedStudsOfZ` is `{1: 0, 2: 6, 3: 12, 4: 0}` and `chunkDressing` criterion 2 caps
`roofedStudsOfZ / min(plots.bays[k].lengthStuds)` at **0.025**, with
`maxHorizontalDistanceToOpenSkyUnderARoofStuds` **3** — so no sample point anywhere in the game is
more than 3 studs from open sky and the realised sky-seeing fraction is **1.0 against a required
0.5**. `chunkDressing` `F2` additionally forbids *"a continuous roof, a ceiling over a whole bay, or
any roof deeper than `layout.chunk.depthStuds`"*, and `F10` forbids a `PointLight`, `SpotLight` or
`SurfaceLight` placed to light the roofed band — which is the same ruling as `V11` reached from the
other side. **Recorded as closed, not as a risk.** `V9` stays in the table as a standing check that
any *future* roof must pass, which is what it was for; **what survives as genuinely open is the
second half: an opening that lights and an opening that passes are different counts, and
`theme/setting/04` `W3`'s two-per-part is the passage count only.**

**The static gate has to stand alone, because the rendered one may never run.** An in-engine
screenshot-to-pixel route is blocked: `CaptureService` is client-only, gated on the Capture
capability, and returns ids that are *"temporary and must be uploaded or saved to persist"*
`[research: https://create.roblox.com/docs/reference/engine/classes/CaptureService]`;
`EditableImage` does expose `ReadPixelsBuffer` at 4 bytes RGBA
`[research: https://create.roblox.com/docs/reference/engine/classes/EditableImage]`, but the only
creation path is `AssetService:CreateEditableImageAsync`, which a secondary source reports will not
accept an `rbxtemp://` id and is restricted to creator-owned assets — **`[unverified]`, and
load-bearing** `[research owed: the AssetService reference read for CreateEditableImageAsync's
permission and content-source rules]`. And `tech/performance/01` states that **no sheet in either
contract owns taking a device reading.** So `V10` is written and honestly marked possibly unrunnable,
and `V6`–`V9` reach a verdict without it.

**The static model takes the minimum, in the dark.** A model needing the sun's angle needs a
sun-position formula Roblox does not publish `[research owed: the engine's ClockTime and
GeographicLatitude to sun-direction relation]`, so the static gate evaluates the **direct-sun term
at zero** — indoors, in shadow, no sun at all. That is a bound rather than a guess, and it is the
case the floor exists to catch. Its other terms are identity by construction, because sheet `01`
fixed `ExposureCompensation` 0, both `ColorShift` fields black and `EnvironmentDiffuseScale` 0.

**That bound produces the sharpest finding here.** Under a plain multiply-by-ambient composite, a
fully shadowed indoor surface at `Ambient [0.32, 0.31, 0.27]` reaches Rec.601 luma **78.6 at pure
white** and 62.4 at the merged stone — nowhere near 165 at any authored colour. Either the engine
does not composite ambient as a plain multiply (likely, and the rule is undocumented
`[research owed: how BasePart.Material and BasePart.Color combine at render time, inherited from
art/style/_lead]`) **or no surface with zero sky exposure can ever meet the floor.** Both readings
force one conclusion: **the authored openings are the only lever** — which is what `theme/setting/03`
meant by handing the vault-light question to geometry, and why `V9` remains worth checking even
though `chunkDressing` clears it today. `V8` therefore states the requirement as a **retention
ratio**, rendered ≥ 0.85 × authored, which is measurable, calibratable by one reading, and
independent of a compositing rule nobody has published.

**The enclosure check is a raycast, not a render.** `Ambient` applies indoors and out while
`OutdoorAmbient` applies only outdoors, the engine deciding by surface exposure
`[research: https://create.roblox.com/docs/environment/lighting]`, so an enclosed bay is lit by the
darker of the two. Five upward rays per sample point, two of which must reach open sky, is a
deliberately coarse proxy: it runs with no rendering, no device and no pixels. **It is a requirement
on `environment`'s authored openings and never a licence to raise `Brightness`** — `V11` makes that
a byte comparison rather than an argument.

## The rules

| id | rule | protects | check |
|---|---|---|---|
| V1 | The authoritative metric is **Rec.601 luma**, `Y = 0.299R + 0.587G + 0.114B` on 0–255 gamma-encoded sRGB. No sheet substitutes sRGB relative luminance, a WCAG ratio, HSL lightness or a perceptual L\* for it | `theme/setting/01` criterion 3 | `lighting.readability.metric == "rec601-luma"`; `grep -rn "0\.2126\|relative luminance" cid/art` returns nothing inside a floor statement |
| V2 | **Cleared stone** is any upward-facing face (surface normal · Ŷ ≥ 0.7) within 3 studs vertically of a patch anchor, plus the lane slab's top face. Patch parts, plot-boundary parts, tool parts and player characters are never sampled | defines the surface the floor is about | the sample set derives from `layout`'s anchor arrays; four named classes are excluded by name |
| V3 | **28 sample points per bay**: 24 patch anchors taken every ⌈N/24⌉-th in `layout` order, plus the 4 slab corners inset by `layout.chunk.edgeKeepoutStuds` 1.5 | a deterministic, restatable sample | the count is 28 at every `depths.areas[].patchCount` from 140 to 640; re-running yields the identical point set |
| V4 | The **finished state is authoritative** — sample with every patch destroyed. The unfinished state is sampled once only, to confirm no patch Instance occludes a sky ray | *"cleared stone"* means the ground with the green gone | patches ship `CanQuery` false (`N13`), so the two sky-exposure readings must be **identical**; a difference is a failed `N13`, not a failed floor |
| V5 | The pass rule is the **minimum** over the 28 points — never the mean, never a percentile. One point below the floor fails the whole bay | one dark bay is the entire reason the floor exists | `lighting.readability.passRule == "minimum"` |
| V6 | **Gate A (static, no device):** `luma601(styleGuide.roles["stone.cleared"].rgb) ≥ 195` | 195 × 0.85 = 165.75 ≥ 165 | arithmetic on the merged manifest, no world loaded. **Passes as merged: 201.84, by 6.84** |
| V7 | **Gate A:** the model's tint and exposure terms are identity — `ExposureCompensation` 0, `ColorShift_Top` `[0,0,0]`, `ColorShift_Bottom` `[0,0,0]`, `EnvironmentDiffuseScale` 0 | makes the static model computable at all | field equality against `lighting.properties`; any non-identity value voids gate A and forces `V10` |
| V8 | **Gate A:** rendered luma at the least-lit sample point ≥ **0.85** × authored luma. `[playtest unknown]`, start 0.85, test range 0.6–1.0 | the floor as a rendered quantity, with no published compositing rule | asserted by `V6`+`V7` arithmetic; calibrated by one `V10` reading, which moves this one number and not the design |
| V9 | **Gate A (renderless enclosure check):** from each sample point cast 5 rays of 2000 studs — one +Y and four at 45° on ±X and ±Z. A point **sees sky** if ≥ 2 return `nil`. **≥ 0.5 of a bay's 28 points must see sky.** `[playtest unknown]`, start 0.5, range 0.25–1.0 | `Ambient` < `OutdoorAmbient`; enclosure compresses contrast toward 1:1 | a `workspace:Raycast` loop; no rendering, no device. **CLOSED against `chunkDressing` as merged** — roofed share ≤ 0.025, `maxHorizontalDistanceToOpenSkyUnderARoofStuds` 3, realised fraction 1.0. Standing check on any future roof |
| V10 | **Gate B (rendered):** one capture per chunk family — `layout.families[].setId` `terrace`, `cistern`, `vault`, `spire` — at standing eye height, finished state, on `budgets.deviceFloor`, at **100% device brightness, indoors, default graphics quality** (`[unverified]`: no source for outdoor phone legibility was found). Minimum Rec.601 luma over the 28 points' screen positions ≥ 165 | the floor as an observed fact rather than a modelled one | 4 readings, 112 pixel samples. **See `V12` — this gate has no owner** |
| V11 | A bay failing `V9` is fixed by `environment`'s authored openings. **Never** by `Brightness`, `ExposureCompensation`, `Ambient`, `OutdoorAmbient`, `ShadowSoftness`, `GlobalShadows`, a second lighting state, or any light instance | `theme/setting/03`: *"you may not solve a dim vault by moving the sun"*; `chunkDressing` `F10` says the same from the other side | `lighting.properties` is byte-identical before and after any `V9` remediation |
| V12 | Gate B is **currently unrunnable in-engine** and this sheet says so rather than pretending. Fallback: a manual Studio capture read in an external tool. **No sheet in either contract owns taking a device reading** | honesty about the instrument | the build report records gate B as unrun with its owner recorded as **absent**; `lighting.readability.renderedGateHasOwner` is `false` |
| V13 | **No sheet may state the Rec.601 floor as the legibility guarantee.** The computed WCAG 1.4.11 ratio is 1.53:1 achromatic at the floor and 2.31:1 at the merged stone, both under 3:1. Legibility is carried by shape and silhouette | `04-PRESENTATION.md` hard constraint | `tiers` ships 4 distinct shapes and 4 heights; `tiers` criterion 4 (distinct silhouette in a greyscale screenshot) is the check that carries the requirement |

## Consequences for other work

- **Set-dressing work (`environment`)** — **`V9` is closed, no action, and it should not be
  re-litigated.** Checked against `chunkDressing` as merged: roofed share ≤ 0.025 of a bay,
  `maxHorizontalDistanceToOpenSkyUnderARoofStuds` 3, so the realised sky-seeing fraction is 1.0
  against a required 0.5. `F2` and `F10` independently forbid the two things that would break it.
  What remains is a standing check on any future roof, and one genuinely open item: **an opening
  that lights and an opening that passes are different counts**, and `theme/setting/04` `W3`'s
  two-per-part is the passage count only. Nobody owns the lighting count; I do not claim it.
- **Palette work (`styleGuide`)** — **satisfied as merged, no action.** `V6`'s 195 is cleared by
  `roles["stone.cleared"]` at 201.84, inside `C1`'s `[195, 210]` band; `C1`'s 210 cap and my 3:1
  arithmetic agree that a WCAG-conformant stone is outside the fiction.
- **Bay-and-lane work (`plots`, `layout`)** gains a checkable reason a footprint might be rejected;
  the sample plan is expressed entirely in fields they already own —
  `layout.chunk.edgeKeepoutStuds`, `layout.families[].setId`, `depths.areas[].patchCount`. **I
  resize nothing.**
- **Budget work (`budgets`, Tech & Data)** is named as the missing owner of `V10`. Until someone owns
  a device reading, `V8`'s 0.85 is a stated starting value and not a measurement.
- **Overgrowth-tier work (`tiers`)** carries the accessibility requirement, not this sheet; `V13`
  hands it back and cites its criterion 4 as the check. **Interface work (UI Art, UI/UX)** is asked
  for nothing here, though the same arithmetic is why an affordability channel cannot be colour.

## Acceptance criteria

1. Every rule `V1`–`V13` carries a check-column entry naming a field, a count or a command; **zero
   rows read "verify visually" or any equivalent judgment call.**
2. Gate A reaches a pass/fail with no device and no capture:
   `luma601(styleGuide.roles["stone.cleared"].rgb) ≥ 195` (201.84 as merged),
   `lighting.properties.ExposureCompensation == 0`, `ColorShift_Top == [0,0,0]`,
   `ColorShift_Bottom == [0,0,0]`, `EnvironmentDiffuseScale == 0`.
3. `chunkDressing.roofedStudsOfZ[d] / min(plots.bays[k].lengthStuds at depth d) ≤ 0.025` for every
   depth and `chunkDressing.maxHorizontalDistanceToOpenSkyUnderARoofStuds ≤ 3`, which is the
   condition under which `V9` is recorded closed. If either moves, `V9` re-runs as a live check.
4. This sheet records a computed WCAG 1.4.11 ratio strictly below 3:1 (1.53:1 and 2.31:1) and names
   shape and silhouette as the carrying channel; `tiers` ships 4 distinct shapes and 4 heights.

## Not decided here

**Every `Lighting` property value, the state count, the eleven zero-counts and the route to a
place** — sheet `01`, which supplies `lighting` and holds `lighting.readability`; this sheet supplies
no key and proposes none. **The stone's hue and rgb triple** — `styleGuide` (`art/style/01`), which
also owns the `Plots.luau:534` slab revision request; I read `roles["stone.cleared"]` by field and
choose no colour. **Where the openings that light a vaulted bay sit, how wide they are, what they
are made of, and how many of them light rather than pass** — `environment` and `plots`; I state a
fraction, author no geometry, and claim no opening count. **The bay footprint, lane width,
`layout.chunk.edgeKeepoutStuds` and patch counts the sample plan reads by field** — `plots`,
`layout` and `depths`. **Who takes a reading on `budgets.deviceFloor`, and whether an in-engine
pixel route ever becomes legal** — unowned today, named in `V12` and routed to Tech & Data.
**Whether the accessibility requirement is met** — `tiers`, by four shapes, per `V13`. **Whether
these thirteen rules become a `bridge/merge.mjs` lint or stay build-report checks** —
contract-and-seam work.
