# 01 — The one icon

**Domain:** marketing/icon · **Category:** Discovery & Marketing · **Wave:** 7 · **Revised:** round 1, `RR-5`

## Decision

**One icon, count 1, and its subject is the clearing edge: a single straight boundary between
cleared warm stone and standing overgrowth, running corner to corner across a square frame, with a
dressed stone step in it and nothing else in it at all — no tool, no character, no Find, no sky, no
canopy, no text.** It is a **Studio capture of world geometry**, never an authored raster, it is
**not producible from any build that exists**, and its two gate conditions are named below.
`variants: []`, A/B set **0**, strings on the image **0 characters**.

## Why

**The platform not requiring an icon is the reason this domain exists.** *"An icon is automatically
generated from a collection of default images"* on first publish
`[research: https://github.com/Roblox/creator-docs/blob/main/content/en-us/production/publishing/experience-icons.md]`,
so `count: 0` does not ship a blank tile — it ships stock art the platform picked, which is
`sourceTitle = "Pet Ascend Simulator"` arriving on a second surface. `count: 1` `[cid: decided]`,
and it is the cheapest possible reading of *"the smallest game that still gives every creative area
real work"* `[brief: binding]` `00-CORE.md`.

**The focal subject is chosen from what is left after seven exclusions, not from what is best.** No
Find (`objectArt.find.worldForm` `"none"`), no mascot or face (`theme/identity/04`), no second hour
and no weather (`theme/setting/03` `R1`/`R2`), no shop (`R-4`), no capture of the shipped theme
(`G2`). What remains is stone, green, the tool and a player avatar. **The tool and the avatar are
both excluded on stated grounds and the exclusions are the decision**, not the leftovers:

| candidate | rejected because |
|---|---|
| the held tool in frame | **the head bridges the only two regions the icon has, and the grip excludes nothing.** `objectArt` sets the head at `[178,160,133]`, Rec.601 luma **162.30**, `styleGuide.roles["wood.worked"]` adopted verbatim `[research: cid/art/objects/03-the-tool-in-hand.md]`. That is **39.19** above `tiers[0]` 123.11 and **33.54** below `stone.built` 195.84, i.e. inside `02` `L2`'s 40-wide band on **both** sides, so no assignment of it passes `02` `L4`: banded with the green, the band runs 123.11–162.30 and its top sits 33.54 under the stone; banded with the stone, the band runs 162.30–201.84 and its floor sits 39.19 over the green; left alone it is a **third** region against `L3`'s cap of 2 and fails `L4` on both adjacencies. The **grip** `[118,88,66]` luma **94.46** is not a ground: 123.11 − 94.46 = **28.65**, inside one 40-wide band with `tiers[0]`, so it adds no region at all. `styleGuide` `[research: cid/art/style/01-palette-and-materials.md]` line 264 ratifies the head as `[190,158,118]` luma **163.01**, the near-duplicate `objectArt` declined by name; **the exclusion holds at either figure** (39.90 over the green, 32.83 under the stone, both under 40). And a tool on a tile is the one image every surveyed competitor already ships `[research: concept/spec/incremental-spinoff-v2/research/landscape.md]` |
| a player avatar mid-clear | `art/characters/01` — *"the only face available is a player avatar, which you do not control and may not dress."* An uncontrolled subject makes the icon vary by whoever captured it, which is not a composition |
| an empty socket, setting bed or plinth where something was lifted out | `art/objects/04` forbids Environment placing *"a Find, a plinth for one, or a setting bed where one would sit"*. It would also be a `T6` claim by implication |
| sky as a backdrop band | the sky is the engine default with **zero `Sky` instances and no `Color3`** (`styleGuide.roles.sky`), so its luma cannot be computed and `02` `L4` cannot be evaluated against it. A region whose separation is unmeasurable is not a legal region |
| canopy as a backdrop band | **`02` `L3`: `maxRegions` is 2, and stone and overgrowth take both.** Nothing about canopy's own luma excludes it here — `canopy.leaf` 59.31 against the `tiers[0]` 123.11 actually shown is a separation of **63.80**, which clears the 40 floor. It is excluded by the region budget, not by its colour. The standing note for anyone who later shows a darker tier: `canopy.leaf` sits only **10.26** below `tiers[3]` 69.57, so that pairing would additionally fail `L4` |

**Gap G-I2 is real, it is not solved here, and papering over it would be a `T6` violation.**
`00-CORE.md` binds distinction to the collection `[you chose: R1 Q1]` → `[brief: binding]`, and the
collection has **no depictable form on any surface**. Everything above is the harvest half, which
`research/landscape.md` establishes is the commodity half — *"the noun is not a differentiator"*.
**So the icon cannot carry the differentiator, and the collection reaches a stranger only through
the description.** That is a fact for store-listing work, stated rather than routed around. The
brief's *"two composable halves — a cleared path through green, and a relic mid-reveal"* is scoped
by its own sentence to **a thumbnail** `05-OUTWARD.md` `[brief: soft]`, so declining its second
half for a 1:1 icon overrules nothing; the revision request against that line is
`cid/marketing/thumbnails/03`'s `RR-O1` and is **not filed here**.

**The production route is a capture, and the ground is the platform's own words rather than house
taste.** The thumbnails page carries *"Graphics shown must be representative of the actual in-game
visuals. Avoid artificially enhancing graphics beyond what a player will experience"* and *"Do not
display gameplay mechanics, UI elements, or interactions that are not actually available in your
game"*
`[research: https://github.com/Roblox/creator-docs/blob/main/content/en-us/production/publishing/thumbnails.md]`.
**That is `T0` and `T8` as platform policy rather than as a house rule** — the strongest external
backing this category's truthfulness rule has. Two halves, and both are said: it is published on the
**thumbnails** page and the icon page carries no equivalent, so whether it is enforced identically
on icons is `[unverified]` `[research owed: the Community Standards section on deceptive metadata,
about.roblox.com/community-standards, read for whether "experience images" includes the icon]`. The
ruling does not rest on it — `T0` binds this category independently.

**An authored raster is therefore forbidden as the route**, because an illustration of stone and
green is by construction not the in-game visual, and because commissioning one contradicts
*"content design is the primary creative work on this project, not art"* `[brief: binding]`.

**Which makes the honest output a specified icon with a gate, not an icon.** Both gate conditions
are hard, both are checkable, and one of them is unsatisfied by a subject that `art/_category.md`
rows 10–19 mark **[does not exist]**. Because a missing icon ships platform stock art rather than
nothing, the gate is a **publish blocker**: the publish checklist must not report done with
`storeIcon.uploaded` false. I state the requirement and ask for **a new row, id assigned by
`release`**; I do not number it and I write none of that key's fields.

**Zero characters of text on the image, and the genre convention is ruled on rather than
inherited.** The platform's icon page has exactly three best-practice subsections — quality and
aspect ratio, relevant content, colour and contrast — and **no text rule**
`[research: https://github.com/Roblox/creator-docs/blob/main/content/en-us/production/publishing/experience-icons.md]`,
so nothing external requires or forbids it. The genre's tic is glyphs in the **title** (`[🌱]`,
`🧲`, `[UPDT🍂]`, `research/landscape.md`); the survey recorded titles and **not tiles**, so I have
no evidence about text on a competitor's tile and will not infer one `[research owed: the tile
images of the four competitor pages already in research/landscape.md, which is thumbnails work's
must_verify and not mine to fetch]`. Ruled `[cid: decided]` on three grounds that do not need it:
the platform label already prints the experience name directly under the tile, so a rendered title
is duplicated; a text block is a third luma region and `02` `L3` caps the icon at two; and every
word that would name the differentiator is either in `vocabulary.bannedWords` (`relic`, `treasure`,
`loot`, `artifact`) or is the commodity register the brief spent a research pass avoiding.
**`storeIcon` therefore carries no string field at all**, and `title` is not referenced — naming
work coins the title and nothing here waits on it. Had a string been permitted, `bannedWords` would
bind it and `maxLabelChars`, `casing`, `maxSentenceWords` and `allowedPattern` would not (ruling
**M-B**).

**Both zeros are closed by the platform before this project closes them.** Roblox Experiments cover
in-game *"different config values"* and *"custom matchmaking configurations"*; **icons are not a
testable element**, and *"Games with fewer than 1,000 daily active users might struggle to get
useful data"* `[research: https://create.roblox.com/docs/production/experiments]`, corroborated
secondarily by *"No, unfortunately it is not possible"*
`[research: https://devforum.roblox.com/t/are-you-able-to-ab-test-game-icons/3339468]`. Against
`engagement.eligibilityGate` and a brief that declines players, there is no count above 1 to
justify. **Seasonal and event variants are 0** by `03-META.md` priority 3, `theme/setting/03` `R1`
(*"in any promotional image"*) and category row 17 — and wave 7's live-ops work has since ruled
`seasonCount: 0` `[research: cid/liveops/seasons/01-no-season-structure.md]`, which removes the
referent entirely. The ruling sits **inside** `variants`, so a later reader who wants a holiday icon
finds a closed decision rather than an empty slot.

**Ruling M-A, in one line:** `art/ui-art/04`'s `icons.count: 0` and `imagePolicy.uiImageAssets: 0`
are checks on `game/src` and on `GuiObject`s — **the build contains zero image assets; the
experience page does not**, and neither reaches this artifact.

**Gap G-I3 — this key has no emitter, and that finding is worth more than the key.**
`bridge/emit-config.mjs` produces `GameConfig.luau`, `ui-forge` produces `Theme.luau`, and
`release.publishChecklist` covers place settings and their read-back. **None of the three can carry
a 512×512 image and no build step reads an outward artifact at all**, so `storeIcon` merging changes
nothing on disk. This is the third arrival of the same hole (`styleGuide` `G3`, `lighting` `G1`).
**Contract-and-seam work** rules whether an outward key is a build artifact; **publish-checklist
work** owns the upload step if it is not.

### The exclusion list, as counted zeros

| subject | count | ruled by |
|---|---|---|
| a Find, relic, treasure, chest, coin or artifact as an object, model, card, drop or icon | **0** | `objectArt.find.worldForm` `"none"`; `representation.find`; `T6` |
| an empty socket, recess, plinth or setting bed implying a lifted object | **0** | `art/objects/04` — Environment may place none |
| a mascot, creature, companion or named figure | **0** | `theme/identity/04`; `theme/tone/04` `D13` |
| a face, eyes or a mouth, on anything | **0** | `D13` |
| a player character or avatar of any kind | **0** | this sheet — an uncontrolled subject; `art/characters/01` |
| a nameplate | **0** | follows from zero characters in frame |
| the held tool | **0** | this sheet — the head 162.30 sits 39.19 over `tiers[0]` and 33.54 under `stone.built`, inside a 40-luma band of **both** regions, so it bridges them and fails `02` `L4` under every assignment. The grip 94.46 is 28.65 from `tiers[0]` and adds no region |
| a second hour, dawn, dusk, night, sunset or moonrise | **0** | `theme/setting/03` `R1`; `art/lighting/01` — every promotional image is at `ClockTime` 15.5 |
| rain, snow, fog, cloud, wind or any depicted weather | **0** | `theme/setting/03` `R2` |
| sky pixels | **0** | camera pitch puts the horizon out of frame; `styleGuide.roles.sky` has no `Color3` to measure |
| canopy or trunk pixels | **0** | **`02` `L3` — `maxRegions` is 2 and stone and overgrowth take both.** Not a luma exclusion: `canopy.leaf` 59.31 against `tiers[0]` 123.11 is 63.80 and clears the 40 floor |
| more than one overgrowth tier | **1 tier only** | four greens spanning 69.57–123.11 are four bands inside one region; `02` `L3` |
| a shop screen, offer row, price, Robux glyph or purchase control | **0** | `R-4`; `products.storeExists: false`; `offerSurface` empty |
| a badge, trophy, leaderboard, code panel or daily-reward tile | **0** | `03-META.md` priority 3; `endgame.forbidden` |
| any `GuiObject`, HUD readout, panel or button in frame | **0** | the platform's *"UI elements … not actually available"* rule, and `02` `L3` |
| text characters, of any script, at any size | **0** | this sheet; `vocabulary.bannedWords` would bind one if it existed |
| an emoji, dingbat, symbol glyph, arrow, callout, starburst or "NEW" flash | **0** | this sheet; `theme/tone/01` `P4`'s reasoning; `F10`'s outward twin `T10` |
| a logo, wordmark or rendered title | **0** | the platform prints the experience name under the tile |
| a border, frame, stroke, drop shadow, vignette, glow or bloom | **0** | `02` `L11`; `art/lighting/01` — zero post-process instances |
| gilding, gold, gemstones or a metallic highlight | **0** | `styleGuide` `C5`; `theme/lore/01` |
| a seasonal, holiday or event variant | **0** | `03-META.md` priority 3; `liveops` `seasonCount: 0`; category row 17 |
| an A/B alternate | **0** | icons are not a testable element on this platform |
| a capture of `game/src/shared/Theme.luau` as it ships | **0** | `G2`; `T8` |

```manifest
{
  "provides": "storeIcon",
  "status": "proposed",
  "value": {
    "count": 1,
    "countRuledBy": "the platform generates an icon from default stock images if none is uploaded, so 0 ships someone else's art. creator-docs experience-icons.",
    "platformFacts": {
      "required": false,
      "aspect": "square",
      "minimumUploadPx": 512,
      "templatePx": 512,
      "smallestRenderedSizeStated": 150,
      "smallestRenderedSizeIsAnExample": true,
      "moderated": true,
      "publishedBestPractices": ["quality and aspect ratio", "relevant content", "color and contrast"],
      "publishedTextRule": "none",
      "source": "https://github.com/Roblox/creator-docs/blob/main/content/en-us/production/publishing/experience-icons.md"
    },
    "fileSpec": {
      "authoredPx": 512,
      "aspectRatio": "1:1",
      "format": "unverified",
      "maxBytes": "unverified",
      "unverifiedNote": "neither a format nor a byte limit appears on the icon page; its full heading list carries neither. A 512x512 PNG under 1MB figure circulates on third-party blogs and is NOT recorded here as sourced.",
      "settlingFetch": "the Roblox support article 'Experience Thumbnails, Videos, and Icons', en.help.roblox.com/hc/en-us/articles/203314060, which returned 403; or the asset-upload requirements page under create.roblox.com/docs/projects/assets",
      "nothingDependsOnIt": true
    },
    "productionRoute": {
      "route": "studio-capture",
      "authoredRasterPermitted": false,
      "authoredRasterForbiddenBecause": "an illustration of stone and green is by construction not the in-game visual, against the platform's 'graphics shown must be representative of the actual in-game visuals'; and commissioning one contradicts 00-CORE.md's 'content design is the primary creative work on this project, not art'.",
      "producibleToday": false,
      "gates": [
        { "id": "GATE-1", "name": "legitimacy", "conditions": [
          "game/src/shared/Theme.luau meta.archetype reads fantasy-ornate, not cartoon-vibrant (G2 closed)",
          "game/src/server/Plots.luau assigns slab.Color = [216,201,169] and slab.Material = Enum.Material.Limestone (styleGuide RR-A1 applied)",
          "Lighting in the captured place equals lighting.properties as merged: Ambient [0.32,0.31,0.27], OutdoorAmbient [0.45,0.43,0.38], Brightness 2, ClockTime 15.5",
          "zero GuiObject instances are visible in the captured frame",
          "zero player characters are visible in the captured frame"
        ], "satisfiedToday": false },
        { "id": "GATE-2", "name": "subject", "conditions": [
          "at least one environment P1 dressed-stone element is in frame: a step, a kerb or a parapet edge"
        ], "satisfiedToday": false, "why": "art/_category.md rows 10-19 mark the retaining wall, parapet, paving, channels, fittings, weathering, sky and canopy all [does not exist]" }
      ],
      "blocksPublish": true,
      "blocksPublishBecause": "a missing icon does not ship a blank tile, it ships platform stock art. The publish checklist must not report done while uploaded is false.",
      "publishChecklistAsk": {
        "row": "a new row, id assigned by release",
        "atLeastOneRowBeyond": "P4",
        "reads": "storeIcon.productionRoute.uploaded == true",
        "idAssignedHere": false,
        "why": "requesters do not assign ids. release owns publishChecklist and its numbering; this key states the requirement and the field the row reads."
      },
      "uploaded": false,
      "captureFieldNamedElsewhere": "thumbnails work owns the 16:9 set and its own capture-legitimacy ruling. This key does not name or restate that field; both gates above are stated in conditions a cross-category pass can diff."
    },
    "composition": {
      "focalSubject": "the clearing edge - the boundary between cleared stone and standing overgrowth",
      "framing": "one dressed stone step seen from above the tread, the clearing edge running as a single straight diagonal from one corner of the frame to the opposite corner",
      "cameraPitchDegreesBelowHorizontal": 45,
      "cameraPitchStatus": "cid: decided",
      "cameraPitchRange": [30, 60],
      "cameraPitchWhy": "steep enough to put the horizon, the sky and the canopy out of frame, shallow enough that the step riser still reads as a vertical face",
      "horizonInFrame": false,
      "subjectCount": 1,
      "regions": [
        { "id": "stone", "roles": ["styleGuide.roles[\"stone.cleared\"]", "styleGuide.roles[\"stone.built\"]"], "authoredLumaBand": [195.84, 201.84], "targetAreaPct": 50, "permittedAreaPct": [40, 60], "oneRegionBecause": "the two roles differ by 6.00 luma, well inside the 40 floor, by styleGuide C8's design: they are one stone" },
        { "id": "overgrowth", "roles": ["tiers[0].rgb"], "authoredLuma": 123.11, "targetAreaPct": 50, "permittedAreaPct": [40, 60], "tierChoiceWhy": "the lightest tier is the worst case for separation, so an icon that passes at Moss passes at every tier; it is also the tier a first-area player actually sees, so showing a rarer green would over-represent rarity" }
      ],
      "regionCount": 2,
      "boundaryShape": "one straight diagonal, corner to corner",
      "backdropAreaPct": 0,
      "skyAreaPct": 0,
      "skyAreaPctBecause": "styleGuide.roles.sky has no Color3 and zero Sky instances, so its luma cannot be computed and 02 L4 cannot be evaluated against it. A region whose separation is unmeasurable is not a legal region.",
      "canopyAreaPct": 0,
      "canopyAreaPctBecause": "02 L3 - maxRegions is 2 and stone and overgrowth take both. This is a region-budget exclusion, NOT a luma one: canopy.leaf 59.31 against the tiers[0] 123.11 actually shown is a separation of 63.80 and clears the 40 floor. Standing note: canopy.leaf sits only 10.26 below tiers[3] 69.57, so a darker tier shown alongside canopy would additionally fail L4.",
      "toolAreaPct": 0,
      "toolAreaPctBecause": "the HEAD bridges the two regions and the GRIP excludes nothing. objectArt's head is [178,160,133], luma 162.30 (styleGuide roles wood.worked adopted verbatim): 162.30 - 123.11 = 39.19 over tiers[0] and 195.84 - 162.30 = 33.54 under stone.built, both inside L2's 40-wide band, so banding it with the green leaves 33.54 to the stone, banding it with the stone leaves 39.19 to the green, and leaving it alone is a third region against L3's cap of 2. Every assignment fails L4. The grip [118,88,66] luma 94.46 is 28.65 below tiers[0], inside one band with it, and adds no region: it is not a ground. styleGuide 01 line 264 ratifies the head as [190,158,118] luma 163.01, the near-duplicate objectArt declined by name; at that figure the separations are 39.90 and 32.83 and the verdict is unchanged.",
      "toolHeadLumaDiscrepancy": {
        "objectArtValue": 162.30,
        "objectArtRgb": [178, 160, 133],
        "styleGuideProseValue": 163.01,
        "styleGuideProseRgb": [190, 158, 118],
        "authoritative": "objectArt - art/objects/03 owns the tool's parts and styleGuide roles wood.worked appliesTo says so by name",
        "verdictUnchangedAtEitherValue": true,
        "routedTo": "a cross-category pass; this key reads the owning value and does not edit art/style/01"
      }
    },
    "styleGuideRolesUsed": ["stone.cleared", "stone.built", "overgrowth"],
    "styleGuideRolesForbiddenHere": ["sky", "canopy.leaf", "canopy.trunk", "wood.worked", "clay.fired", "metal.cast"],
    "text": {
      "characterCount": 0,
      "glyphCount": 0,
      "titleReferenced": false,
      "ruledBy": "this sheet, cid: decided",
      "ifEverPermitted": "vocabulary.bannedWords binds it (relic relics tier artifact antique rebirth loot treasure); maxLabelChars, casing, maxSentenceWords, allowedPattern and theme/tone/01 P1-P9 do not (ruling M-B); a title may be carried by reference to the title key only and may never be coined here",
      "genreConventionEvidence": "research/landscape.md records competitor TITLES carrying glyphs ([green-sprout], [magnet], [UPDT autumn-leaf]) and records no competitor TILE. The convention on tiles is unevidenced and is not inferred.",
      "researchOwed": "the tile images of the four competitor pages already listed in research/landscape.md; this is thumbnails work's must_verify, not this domain's"
    },
    "legibility": {
      "enforcedBy": "cid/marketing/icon/02-legible-at-150.md",
      "metric": "rec601-luma",
      "formula": "Y = 0.299R + 0.587G + 0.114B on 0-255 gamma-encoded sRGB",
      "notAWcagClaim": "WCAG 1.4.11's 3:1 needs an authored Rec.601 luma near 231, which theme/setting/01 forbids by name and styleGuide C1's [195,210] band excludes by construction. art/lighting/02 V13 already ruled the luma floor is not the legibility guarantee. Separation, region count and silhouette are.",
      "maxRegions": 2,
      "minRegionAreaPctToCount": 10,
      "minAdjacentSeparationLuma": 40,
      "realisedSeparationLuma": 72.73,
      "realisedSeparationArithmetic": "worst case is stone.built 195.84 against tiers[0] 123.11; best case is stone.cleared 201.84 against tiers[0] 123.11 = 78.73",
      "separationFloorSource": "styleGuide's own reasoning on the tier greens - '165 clears the lightest by 41.9 against a required 40'",
      "passRule": "minimum",
      "evaluatedAtPx": [512, 150, 64],
      "evaluatedSizeStatus": [
        { "px": 512, "status": "sourced", "why": "the platform's stated upload floor and template size" },
        { "px": 150, "status": "sourced-as-example", "why": "'icons scale down to smaller sizes like 150x150 pixels' - an example, not a published floor" },
        { "px": 64, "status": "unverified", "why": "no per-surface size table for the Home, Search or Discover rows surfaced on the icon page or its thumbnails sibling", "settlingFetch": "a per-surface rendered-size table for the Roblox mobile app's Home, Search and Discover rows", "ifWrong": "if the true floor is 150, maxRegions could rise to 3 and every other threshold is unchanged" }
      ],
      "downsampleFilter": "area/box average, never nearest-neighbour",
      "silhouetteTest": {
        "components": 2,
        "minComponentAreaPct": 10,
        "componentAreaPctBand": [40, 60],
        "eachComponentTouchesImageBorder": true,
        "maxSharedBoundaryLengthAsMultipleOfWidth": 1.6,
        "boundaryMultipleWhy": "a corner-to-corner diagonal is sqrt(2) = 1.414 W; 1.6 admits the step's tread-to-riser jog and forbids a fringed edge"
      },
      "renderedRiserRule": "all stone-family surfaces are one region by AUTHORED value. If a rendered step riser reads more than 40 luma below the tread in the captured frame, the icon has three regions and fails; the remedy is a shallower camera pitch or a smaller riser in frame, never a lighting change.",
      "failureChanges": ["crop", "camera pitch", "boundary angle", "region area split"],
      "failureNeverChanges": ["Brightness", "Ambient", "OutdoorAmbient", "ClockTime", "ExposureCompensation", "any stone luma above styleGuide C1's 210 cap", "an added outline, stroke, drop shadow, vignette or glow", "a desaturated or lightened overgrowth", "added text", "an added region"],
      "staticGateRunsToday": true,
      "renderedGateHasOwner": false,
      "renderedGateOwnerNote": "the same absence art/lighting/02 V12 records: no sheet in either contract owns taking a device or capture reading"
    },
    "variants": {
      "count": 0,
      "list": [],
      "ruledBy": [
        "03-META.md priority 3 - 'seasons and events' is explicitly not in this project",
        "theme/setting/03 R1 - one lighting state, 'on any screen, in any promotional image'",
        "theme/setting/03 R2 - no weather, ever, as a depicted event",
        "cid/marketing/_category.md row 17 - a seasonal or event variant of icon, thumbnail or name is forbidden by name",
        "cid/liveops/seasons/01-no-season-structure.md - seasonCount: 0 removes the referent entirely"
      ],
      "thisIsAClosedDecisionNotAnEmptySlot": true
    },
    "abTest": {
      "setSize": 0,
      "closedBy": [
        "Roblox Experiments cover in-game config values and custom matchmaking configurations; an icon is not a testable element - https://create.roblox.com/docs/production/experiments",
        "'Games with fewer than 1,000 daily active users might struggle to get useful data' - same source",
        "00-CORE.md - 'Success is shipped artifacts, not players'; revenue and the retention curve both offered and declined",
        "engagement.eligibilityGate and retentionReadout.optimiseFor: false"
      ],
      "corroboratingSecondary": "https://devforum.roblox.com/t/are-you-able-to-ab-test-game-icons/3339468 - 'No, unfortunately it is not possible'. Not load-bearing."
    },
    "claims": [
      { "id": "IC1", "claim": "green overgrowth stands on the ground and is removed from it", "backedBy": "patch.material (Grass); representation.plot; 01-FOUNDATION.md 'Cleared is permanent - overgrowth never returns'" },
      { "id": "IC2", "claim": "the ground under the overgrowth is warm pale stone", "backedBy": "styleGuide.roles[\"stone.cleared\"].rgb = [216,201,169]" },
      { "id": "IC3", "claim": "the overgrowth is this specific green", "backedBy": "tiers[0].rgb = [104,142,76]" },
      { "id": "IC4", "claim": "the place is built architecture, not a lawn", "backedBy": "styleGuide.roles[\"stone.built\"]; environment P1 dressed stone", "capturableToday": false, "gate": "GATE-2" },
      { "id": "IC5", "claim": "it is one bright afternoon", "backedBy": "lighting.properties.ClockTime = 15.5; art/lighting/01" }
    ],
    "claimsNotMade": [
      "any Find, collection, index, set or completion claim - T6, and there is no depictable form",
      "permanence, endlessness, or more to find - T1, T2",
      "rebirth, offline earnings, codes, daily rewards, leaderboards, trading, seasons or events - T4",
      "multiplayer, trading, co-op or competition - T5",
      "a purchase, a price, a pass or a store - R-4, T10",
      "difficulty, challenge, risk or urgency - HANDOFF.md 'tension is zero by design'; T10"
    ],
    "gaps": {
      "G-I2": {
        "statement": "the differentiator has no depictable form, so the icon cannot show what makes this game distinct. objectArt.find.worldForm is 'none' and everything the icon can show is the harvest half, which research/landscape.md establishes is the commodity half.",
        "consequence": "the collection reaches a stranger ONLY through the description",
        "routedTo": "store-listing work; the revision request against 05-OUTWARD.md is cid/marketing/thumbnails/03's RR-O1 and is not filed here"
      },
      "G-I3": {
        "statement": "storeIcon has no emitter. bridge/emit-config.mjs produces GameConfig.luau, ui-forge produces Theme.luau, release.publishChecklist covers place settings; none can carry a 512x512 image and no build step reads an outward artifact at all.",
        "thirdArrival": ["styleGuide G3", "lighting G1"],
        "routedTo": "contract-and-seam work rules whether an outward key is a build artifact; publish-checklist work owns the upload step if it is not"
      }
    },
    "rulingMA": "art/ui-art/04's icons.count 0 and imagePolicy.uiImageAssets 0 are checks on game/src and on GuiObjects. The build contains zero image assets; the experience page does not. Neither reaches this artifact."
  }
}
```

## Consequences for other work

- **Publish-checklist work (`release.publishChecklist`)** gains **a new row, id assigned by
  `release`**, reading `storeIcon.productionRoute.uploaded == true` before the checklist may report
  done; the checklist therefore carries **at least one row beyond `P4`**. I do not number it and I
  write none of that key's fields. Skipping it does not ship no icon; it ships platform stock art.
- **Store-listing work** inherits `G-I2` in full: **the collection reaches a stranger only through
  the description.** The icon carries `IC1`–`IC5` and nothing about a Find, a set, an index or 24/24
  — so if the description also declines to carry it, the brief's one binding differentiator reaches
  no outward surface at all. Also inherits `blocksPublish` as a sequencing fact, not a copy fact.
- **Thumbnails work** owns the 16:9 set, its overlay rule, its own capture-legitimacy ruling and the
  `05-OUTWARD.md` revision request `RR-O1`. **Both of us may legitimately reach for the
  cleared/overgrown boundary** — that is duplication of subject, not of key, and neither key
  restates the other's fields. My two gate conditions are stated as conditions, not as a
  `captureSource`, so a cross-category pass can diff them without either key naming the other's
  field.
- **Environment work** learns that one `environment` P1 element — a step, a kerb or a parapet edge —
  is now on the critical path of an outward artifact, and that it is marked **[does not exist]**.
  Nothing here resizes, places or dresses it.
- **Palette and lighting work** are asked for nothing and may change nothing: `GATE-1` reads
  `styleGuide` and `lighting.properties` by field and copies the four Lighting values only so the
  capture condition is checkable without opening another sheet.
- **Tool and palette work** get one recorded conflict and no edit from me: `art/style/01` line 264
  ratifies the tool head as `[190,158,118]` luma 163.01 while `art/objects/03`, which owns the part,
  holds `[178,160,133]` luma 162.30. I read the owning value. The icon's verdict is the same at
  both, so nothing here waits on it, but one of the two sheets is carrying a superseded number.
- **Naming work** is not waited on. `storeIcon` carries no string, references no `title`, and coins
  nothing, so the icon can be produced before the game is named and neither blocks the other.
- **Contract-and-seam work** receives `G-I3`, the third arrival of the no-emitter hole on a third
  surface.

## Acceptance criteria

1. `storeIcon.count == 1`, `storeIcon.variants.count == 0`, `storeIcon.abTest.setSize == 0`,
   `storeIcon.text.characterCount == 0`, `storeIcon.composition.regionCount == 2`, and
   `toolAreaPct`, `canopyAreaPct`, `skyAreaPct` and `backdropAreaPct` are each `0`.
2. The tool exclusion reproduces as arithmetic and the canopy exclusion does not:
   `162.30 − 123.11 == 39.19 < 40` **and** `195.84 − 162.30 == 33.54 < 40` (the head is inside a
   40-luma band of both regions), while `123.11 − 59.31 == 63.80 ≥ 40`, so
   `composition.canopyAreaPctBecause` must cite `maxRegions == 2` and must not cite a separation
   failure. `123.11 − 94.46 == 28.65 < 40`, so no field claims the grip adds a region.
3. Every row in `storeIcon.claims[]` has a non-empty `backedBy` that resolves to a merged or
   proposed key path, an approved sheet id or a repo file; **no row's text matches the `T1`–`T10`
   predicates**; and no `claims[]` row names the collection, a Find, a set, 24/24, a price or a pass.
4. `storeIcon` contains **zero `null` values** at any depth (`tech/deploy/02` makes an emitted null a
   hard error); every "not stated by the platform" field is the string `"unverified"` and carries a
   sibling `settlingFetch`; `productionRoute.gates` has exactly two entries, both with
   `satisfiedToday: false`; and `productionRoute.publishChecklistAsk.idAssignedHere` is `false`.

## Flagged to the developer

| open item | live alternatives | my recommendation |
|---|---|---|
| **Text on the icon.** The platform publishes no text rule and the genre's tile convention is unevidenced. | (a) zero characters, as ruled; (b) the title alone, once naming work coins one; (c) a two-word phrase from the hook line | **(a).** The platform prints the name under the tile anyway, and a text block is a third region the legibility rule caps out. Reversing to (b) costs one field and one region-count change. |
| **`blocksPublish: true`.** This lets a spec sheet hold up a publish. | (a) hard block, as ruled; (b) advisory, and accept stock art on first publish; (c) publish with a deliberately plain two-colour placeholder capture from the current build | **(a).** (c) is `T8` and is worse than (b). |
| **`G-I3`, the emitter hole.** Three keys have now hit it. | (a) `storeIcon` merges and reaches nothing; (b) an outward-artifact emitter; (c) an explicit publish-checklist row that carries it | **(c)**, and it is one row, not a system. |
| **The tool head's two luma values.** `art/style/01:264` says 163.01, `art/objects/03` says 162.30 for the same `Part`. | (a) `objectArt` is authoritative and `styleGuide`'s prose is corrected; (b) the reverse; (c) leave both | **(a).** `styleGuide.roles["wood.worked"].appliesTo` already says the tool is `objectArt`'s to set. Neither changes this icon. |

## Not decided here

**The legibility rule itself, its instrument, its pass rule and what a failure changes** — sheet
`02`, which enforces `storeIcon.legibility` and carries no key. **The game's name and any title
string** — naming work; this sheet coins none and references none. **The 16:9 thumbnail set, its
slots, its overlay rule, its capture ruling and the `05-OUTWARD.md` revision request `RR-O1`** —
thumbnails work, `cid/marketing/thumbnails/03`. **Every line of the description, the tag set, the
genre selection, the age settings and how `Span` is described** — store-listing work, which also
inherits `G-I2`. **Whether anything is announced when the place publishes** — launch-beat work.
**The checklist row that carries the upload, its id, its position and when it is read back** —
publish-checklist work (`release`). **Whether an outward key is a build artifact at all** —
contract-and-seam work. **Where the dressed stone step sits, its size and its dressing** —
environment work; I require one in frame and author none. **Which of the tool head's two recorded
luma values `art/style/01` keeps** — palette work and objects work; I read `objectArt`'s and edit
neither sheet. **Whether a Find ever gains a form** — `objectArt` and `representation`, both of
which say no. **In-game iconography, which is at zero and stays there** — `uiTheme`,
`art/ui-art/04`.
