# 02 — Legible at 150

**Domain:** marketing/icon · **Category:** Discovery & Marketing · **Wave:** 7

## Decision

**Twelve rules, `L1`–`L12`, that fail this icon mechanically without any judgment: at most **two**
luma regions, at least **40** Rec.601 luma between them taken as a **minimum** and never a mean, and
a greyscale silhouette test on the downsampled image requiring exactly **2** connected components of
40–60% area each, both touching the border, separated by a boundary no longer than **1.6 × W**.**
Evaluated at **512**, **150** and **64** px; the 64 is `[unverified]`. A failure changes the crop,
the camera pitch, the boundary angle or the area split, and **never a lighting or palette value.**

**This sheet carries no manifest block**, on `art/lighting/02`'s precedent: it enforces
**`storeIcon.legibility`**, which sheet `01` supplies, and a procedure constraining one key is not a
second key.

## Why

**Contrast here cannot be bought with brightness, and that is the whole reason this is a separate
decision rather than a field.** WCAG 1.4.11 asks a graphical object for *"a contrast ratio of at
least 3:1 against adjacent color(s)"* on sRGB relative luminance over linearised channels
`[research: https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html]`. `art/lighting/02`
computed what that costs on this palette: the merged stone `[216,201,169]` reaches **2.31 : 1**
against `tiers[0]`, and reaching 3:1 needs an authored Rec.601 luma near **231** — near-white, which
`theme/setting/01` forbids **by name** and `styleGuide` `C1`'s `[195, 210]` band excludes by
construction. `V13` then ruled that **no sheet may state the Rec.601 floor as the legibility
guarantee**. So the usual lever is closed twice over and this sheet may not reach for it.

**Which leaves separation, region count and silhouette — the same three channels the platform
itself points at.** Roblox publishes **no contrast ratio at all** and prescribes *"different symbols
alongside colors"*
`[research: https://create.roblox.com/docs/production/publishing/accessibility]`, and its icon page
asks only that you *"express your game's theme through color and contrast"*
`[research: https://github.com/Roblox/creator-docs/blob/main/content/en-us/production/publishing/experience-icons.md]`.
Neither gives a number, so importing one from WCAG would be importing a number the platform does not
ask for onto a palette that cannot meet it.

**The 40 floor is not invented.** It is the separation `styleGuide` already reasoned with when it
checked the tier greens against `theme/setting/01`'s floor — *"165 clears the lightest by 41.9
against a required 40"* `[research: cid/art/style/01-palette-and-materials.md]`. Reused here at
`L4`, it is realised at **72.73** in the worst case (`stone.built` 195.84 against `tiers[0]`
123.11) and **78.73** in the best (`stone.cleared` 201.84 against the same green) — **1.82× the
floor**, which is headroom rather than compliance.

**The region cap of 2 is set by the smallest size, and the smallest size is `[unverified]`.** The
docs say only that *"icons scale down to smaller sizes **like** 150×150 pixels"* — an example, and
**no minimum is published**
`[research: https://github.com/Roblox/creator-docs/blob/main/content/en-us/production/publishing/experience-icons.md]`.
At 150 px a 10%-area third region is 2,250 px; at 64 px it is 410 px, a strip roughly six pixels
tall across the frame, which survives a box downsample but is indistinguishable from an edge
artifact. `[research owed: a per-surface rendered-size table for the Home, Search and Discover rows
of the Roblox mobile app; no such table surfaced on the experience-icons page or its thumbnails
sibling]` **The cap is deliberately conservative because the floor is unknown**, and the one thing
that would relax it is that fetch: if 150 is the true floor, `maxRegions` rises to 3 and every other
threshold below is unchanged. `[cid: decided]`

**`L3` is what excludes the canopy from this icon, and it is worth naming which rule does the work.**
`canopy.leaf` 59.31 against the `tiers[0]` 123.11 sheet `01` actually shows is a separation of
**63.80** — it clears `L4`'s 40 floor comfortably, so the canopy is excluded by the **region budget
and nothing else**. What is true about its colour is a standing note rather than the reason:
`canopy.leaf` sits only **10.26** below `tiers[3]` 69.57, so anyone who later shows a darker tier
alongside canopy fails `L4` as well as `L3`.

**One arithmetic fact does come straight from the palette and it is the reason `L10` exists.**
`stone.cleared` 201.84 and `stone.built` 195.84 differ by **6.00** — inside the 40 floor by
`styleGuide` `C8`'s design, *"they are one stone"* — so the tread and the riser are **one region**
and the icon does not get a free third band by including built stone. That is subtraction, not
taste, and `L10`'s second half is what stops a shadowed riser quietly restoring the band at render.

**The rendered half of the check has no owner, and this sheet says so rather than pretending.**
`L2`–`L5` and `L10` run **today**, on the merged manifest, with no image and no device. `L6`–`L9`
need a captured image, and sheet `01` records that no legitimate capture exists from any build that
ships. Beyond that, `art/lighting/02` `V12` already recorded that **no sheet in either contract owns
taking a reading**, and the in-engine pixel route is separately blocked: `CaptureService` is
client-only and returns temporary ids
`[research: https://create.roblox.com/docs/reference/engine/classes/CaptureService]`.
So `L12` states the instrument's owner as **absent** and the static half reaches a verdict without
it. That is the same shape `V12` took and it is the honest one.

**What a failure may change is the shorter list and it is the important one.** Every remedy that
would work in another project — brighten the stone, darken the green, add a white stroke, add a drop
shadow, add a vignette — is closed here by an approved key: `C1`'s 210 cap, `C6` (green is the
overgrowth channel and nothing else uses it), `art/lighting/01`'s zero post-process instances, and
`V11`'s *"a bay failing is fixed by geometry, never by `Brightness`"*. `L11` is `V11` for a 2D
artifact, and it exists so a builder handed a failing icon reaches for the camera rather than the
lighting.

## The rules

| id | rule | protects | check |
|---|---|---|---|
| L1 | The metric is **Rec.601 luma**, `Y = 0.299R + 0.587G + 0.114B` on 0–255 gamma-encoded sRGB. No sheet substitutes sRGB relative luminance, a WCAG ratio, HSL lightness or perceptual L\* | `art/lighting/02` `V1`; `V13` forbids a WCAG conformance claim on this palette | `storeIcon.legibility.metric == "rec601-luma"` |
| L2 | A **band** is a luma interval of width ≤ 40. A **region** is a connected pixel set of area ≥ **10%** of the image whose pixels all lie in one band | makes "region" countable rather than described | region extraction from the image; on the manifest, `storeIcon.composition.regions[]` has 2 entries |
| L3 | **At most 2 regions.** `[unverified]` on the size that sets it — see `L6`. If the true render floor is 150 px, this becomes 3 and nothing else moves | a third band at 64 px is ~410 px and reads as an edge artifact. **This is the rule that excludes the canopy, the sky, the tool and a text block from sheet `01`'s composition** | `storeIcon.legibility.maxRegions == 2`; the extracted region count at each `L6` size is ≤ 2 |
| L4 | Every **adjacent** region pair is separated by ≥ **40** luma | `styleGuide`'s own required-40 figure; realised **72.73** worst case | arithmetic on `styleGuide.roles[*].luma` and `tiers[0].rgb`; runs with no image |
| L5 | The pass rule is the **minimum** over adjacent region pairs — never the mean, never a percentile. One pair below 40 fails the icon | one muddy edge is the entire reason the rule exists | `storeIcon.legibility.passRule == "minimum"` |
| L6 | Evaluated at **512** px (sourced: the platform's upload floor and template), **150** px (sourced as an *example*, not a published floor) and **64** px (**`[unverified]`**; `[research owed: the mobile app's per-surface rendered-size table for Home, Search and Discover]`). All three must pass | the size the icon is actually seen at is not published | `storeIcon.legibility.evaluatedAtPx == [512, 150, 64]`, and each entry in `evaluatedSizeStatus` carries `sourced`, `sourced-as-example` or `unverified` with a `settlingFetch` |
| L7 | Downsampling uses an **area/box average**. Nearest-neighbour is forbidden | nearest-neighbour hides aliasing the player will see | the reducer names the filter; a nearest-neighbour and a box result differ, so the check is reproducible only if the filter is stated |
| L8 | On the greyscale downsample, exactly **2** connected components of area ≥ 10% exist; each has area in **[40%, 60%]**; each touches the image border | forbids a centred blob, a lopsided crop and a fringe of speckle | connected-component labelling on the Otsu-thresholded greyscale image |
| L9 | The shared boundary between the two components is ≤ **1.6 × W** pixels long | a corner-to-corner diagonal is √2 = 1.414 W; 1.6 admits the tread-to-riser jog and forbids a jagged fringe | boundary-pixel count at each `L6` size; at 150 px the cap is 240 px |
| L10 | All **stone-family** surfaces are one region **by authored value** (`stone.cleared` 201.84 and `stone.built` 195.84 differ by 6.00, `styleGuide` `C8`). If a **rendered** riser reads more than 40 below the tread, the icon has three regions and fails `L3` | stops a shadowed vertical face silently becoming a third band | the two authored lumas differ by < 40 on the manifest; on the capture, tread-minus-riser mean ≤ 40 |
| L11 | A failure changes **the crop, the camera pitch, the boundary angle or the region area split**. It **never** changes `Brightness`, `Ambient`, `OutdoorAmbient`, `ClockTime`, `ExposureCompensation`, any stone luma above `C1`'s 210 cap, the overgrowth green, or adds an outline, stroke, drop shadow, vignette, glow or text | `V11` for a 2D artifact; `C1`; `C6`; `art/lighting/01`'s zero post-process instances | `lighting.properties` and `styleGuide.roles` are byte-identical before and after any icon remediation |
| L12 | `L2`–`L5` and `L10`'s first half are the **static gate** and run today from the merged manifest with no image, no capture and no device. `L7`–`L9` and `L10`'s second half are the **rendered gate**, which **has no owner**, and this sheet records that rather than assuming it | honesty about the instrument, on `V12`'s precedent | `storeIcon.legibility.staticGateRunsToday` is `true` and `renderedGateHasOwner` is `false`; the build report records the rendered gate as unrun with its owner **absent** |

## Consequences for other work

- **Icon composition (sheet `01`, `storeIcon`)** is constrained, not described: `maxRegions: 2` is
  what forbids the tool, the canopy, the sky, a text block and a second overgrowth tier from ever
  being added to that composition without this sheet moving first — **`L3`, not a luma failure, is
  the rule that does it in every one of those five cases except the sky**, which is excluded because
  its luma is unmeasurable. Every threshold above already sits in `storeIcon.legibility`; **this
  sheet sets no value sheet `01` does not carry.**
- **Thumbnails work** is **not bound by any rule here.** `L3`'s cap of 2 is derived from a *square*
  icon downsampled toward 64 px; a 16:9 thumbnail is rendered far larger and its region budget is
  its own decision. If thumbnails work wants a shared instrument, `L1`, `L5`, `L7` and `L11` are the
  four rows that transfer without re-derivation, and `L3`, `L6`, `L8` and `L9` are the four that do
  not. Stated so a verifier reading two different region caps sees a boundary, not a contradiction.
- **Publish-checklist work** inherits one sequencing fact: an icon that has not passed the static
  gate is not an icon that may be uploaded, and the static gate needs nothing but the merged
  manifest, so it can be run before anything is captured.
- **Palette work (`styleGuide`)** and **lighting work (`lighting`)** are asked for **nothing** and
  are protected by `L11`: an icon that fails is never a reason to move a stone luma, a tier green or
  a `Lighting` property. Both keys are read by field here and neither is restated.
- **Tech and Data (`budgets`, performance work)** is named again as the missing owner of a rendered
  reading, the same absence `art/lighting/02` `V12` recorded. Until someone owns it, `L7`–`L9` are
  written and honestly unrun.
- **Store-listing work** gets one negative fact it can rely on: the icon carries **zero characters**,
  so no reading-level, casing or `bannedWords` obligation reaches this artifact, and none of that
  work needs to wait on it.

## Acceptance criteria

1. Every rule `L1`–`L12` carries a check-column entry naming a field, a count, an arithmetic
   operation or a command; **zero rows read "verify visually" or any equivalent judgment call.**
2. The static gate reaches pass/fail with no image and no device:
   `storeIcon.legibility.maxRegions == 2`, `minAdjacentSeparationLuma == 40`,
   `passRule == "minimum"`, and
   `luma601(styleGuide.roles["stone.built"].rgb) − luma601(tiers[0].rgb) == 72.73 ≥ 40`
   (and `styleGuide.roles["stone.cleared"]` − `tiers[0]` `== 78.73`).
3. `|luma601(styleGuide.roles["stone.cleared"].rgb) − luma601(styleGuide.roles["stone.built"].rgb)|`
   is **6.00**, strictly under 40, which is the condition under which `L10` treats both as one
   region. The canopy's exclusion is **not** checked as a separation failure:
   `|luma601(styleGuide.roles["canopy.leaf"].rgb) − luma601(tiers[0].rgb)|` is **63.80** and
   **passes** `L4`, so `storeIcon.composition.canopyAreaPct == 0` must cite `L3`'s `maxRegions: 2`.
4. `storeIcon.legibility.evaluatedAtPx` has exactly three entries and the 64 px entry carries
   `status: "unverified"` with a non-empty `settlingFetch`; this sheet records **no** contrast-ratio
   claim, and the string `3:1` appears in it only as a quantity that **cannot** be reached.

## Not decided here

**Every value this sheet enforces** — sheet `01`, which supplies `storeIcon` and holds
`storeIcon.legibility`; this sheet proposes no key and carries no manifest block. **The focal
subject, the crop, the camera pitch, the region area split and the production route** — sheet `01`;
I state a rule they must satisfy and choose no composition. **The stone's rgb triple, the tier
greens and the canopy colour** — `styleGuide` (`art/style/01`); read by field, chosen nowhere.
**Every `Lighting` property, and the rendered-luma retention question the world-side floor rests
on** — `lighting` (`art/lighting/01`) and its `V1`–`V13`; `L11` protects them and reopens none.
**Whether the accessibility requirement is met** — `tiers`, by four shapes at four heights, per
`V13`; this icon shows **one** tier and makes no rarity claim at all. **Who takes a rendered
reading, on what device, and whether an in-engine pixel route ever becomes legal** — unowned today,
named in `L12`, routed to Tech and Data. **Whether these twelve rules become a `bridge/merge.mjs`
lint or stay build-report checks** — contract-and-seam work. **The legibility rule for a 16:9
thumbnail** — thumbnails work; four of my rows transfer and four do not, and which is theirs.
**Any text rule, reading level or ban list** — moot at zero characters; `vocabulary` and
store-listing work own every outward string that does exist.
