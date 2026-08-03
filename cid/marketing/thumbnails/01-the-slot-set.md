# 01 — The slot set

**Domain:** marketing/thumbnails · **Category:** Discovery & Marketing · **Wave:** 7

> **Revised, round 1** (`cid/marketing/_verified.md`). **RR-2 closed:** acceptance criterion 3
> asserted `slots[].pixelSize` and `slots[].format`, neither of which is a field in this key, so
> the criterion returned undefined rather than a verdict. Both live at `platform.*` and the
> criterion now names them there. **No value moves.** Following `art/vfx/01`'s answer to the same
> defect class, every cross-key path this domain's four sheets cite is re-resolved against its
> owning manifest and published as `externalPathsResolved`, and every field of this key that a
> criterion asserts is published as `internalPathsAsserted`, so both halves of next round's check
> are mechanical. **Two spellings were wrong and are corrected**: `styleGuide.roleRules[C5]` was a
> name-keyed lookup into an array (`styleGuide`'s `citeAs` keys it by `.id`), and the reveal cue
> was spelled `effects.beats[...]` in sheet `03`'s prose when `effects` holds `cues[]` and
> `beats[]` belongs to `response`.
>
> **Revised, round 2.** Three things, no decision moved. **(a)** The `release.publishChecklist` row
> in `externalPathsResolved` said `RR-T1` requests *a fifth* row; a requester does not assign a
> checklist id and four live requests want a row on that one checklist, so it now reads *at least
> one row beyond `P4`, id assigned by `release`*. **(b)** `slots[].captureSource` held a key path
> **plus a sentence of gloss**, and criterion 3 compared the whole value to the bare path, so a
> correct value returned false. The gloss moved to `captureSourceRule` and the field is now a path
> and nothing else. **(c)** Sheets `02` and `03` added criteria naming five fields missing from
> `internalPathsAsserted.paths`; the registry exists to raise exactly that, and the five are added.

## Decision

**This game ships exactly one thumbnail, one image, zero videos, zero variants, and never
refreshes it.** One slot carries the brief's two composable halves in a single 1920 × 1080 frame:
cleared paving running through standing overgrowth, and the collection list open over it.

## Why

**One, because two switches on an optimiser this project has declined by name.** The platform is
explicit: *"Setting 2 or more thumbnails to active will turn personalization on"*, up to five
active, traffic split evenly and then reweighted so that *"thumbnails with higher qualified play
through rates (qPTR) for specific user groups will automatically receive more traffic"*
`[research: https://devforum.roblox.com/t/get-your-thumbnails-ready-for-thumbnail-personalization/3226599]`.
qPTR is a play-through rate. `00-CORE.md` lists *"Beating the genre's retention curve. Offered and
declined"* and *"Revenue. Offered and declined"* `[brief: binding]`, and `analytics` `E5` forbids
acting on a retention or revenue reading. **A second active slot is not thoroughness; it opts this
project into an objective function it rejected, and the only opt-out is deactivating a slot.** One
active leaves it off. `[cid: decided]`

**One, because the market leader in this exact family ships one, counted rather than assumed.**
From each experience's own media endpoint, fetched this wave:

| game | visits | CCU at fetch | thumbnails | videos | alt text |
|---|---|---|---|---|---|
| `[🌱] Grass Incremental Simulator` (the reference) | 38,572,206 | 1,088 | **1** | 0 | empty |
| `[AWAKENING] 🌱 Grass Cutting Incremental` | 29,438,632 | 249 | **6** | 0 | empty |
| `[UPDT🍂] Leaves Incremental 🍂` | 403,766 | 0 | **2** | 0 | empty |
| `Scrap Incremental 🧲` | 333,896 | 0 | **1** | 0 | empty |

`[research: https://games.roblox.com/v1/games/7699580568/media]`
`[research: https://games.roblox.com/v1/games/3478678937/media]`
`[research: https://games.roblox.com/v1/games/8974089723/media]`
`[research: https://games.roblox.com/v1/games/9719511378/media]`
`[research: https://games.roblox.com/v1/games?universeIds=3478678937,7699580568,8974089723,9719511378]`

**The six-image game is the four-year-old one with an update stream, and that is the finding, not
the six.** Count tracks age and shipped updates, not size: the two commodity clones shipped one and
two images and have not touched them. *"Ships and settles. No seasons or events"* `OPEN.md §2`
`[brief: soft]` describes a game with no update stream, so it has the accretion behaviour of the
clones and not of the reference's older sibling. **Refresh cadence is therefore `never`**, with
named re-capture triggers rather than a schedule: a cadence with nothing to announce is
`03-META.md` priority 3 arriving through a side door.

**One, because a slot earns its place.** *"Success is shipped artifacts, not players"* and
*"content design is the primary creative work on this project, not art or marketing"*
`00-CORE.md` `[brief: binding]` ×2, and *"the smallest game that still gives every creative area
real work"* `[brief: binding]`. Ten are permitted; the brief funds the ones that carry a claim, and
this game has one claim worth a picture.

**The claim the slot sells, and why it is one claim and not two.** *"Clear the overgrowth, find
what's buried"* `05-OUTWARD.md` `[brief: soft]` is a dual promise whose halves are one sentence in
the design: *"the clearing **is** the revealing"* `CONCEPT.md` `[brief: binding]`. The image
depicts that sentence, and the number in it is `collection`'s own: **24, exactly**, which `T3`
permits and which is true. `theme/fantasy/02` narrows the promise's lifetime, not its truth: it is
*"a first-session promise with a supply of exactly 24"*, and the slot records that as a field so a
later reader cannot mistake it for a standing one.

**What the image may not claim, and one it may.** `endgame.collectionEnds` is `true` and
`endgame.postTerminalArea.buriesFinds` is `0`, so *"a list you can finish"* is backed and
*"endless things to find"* would be `T1`. `F17` gives the unusual true claim in this genre, that
24/24 is reachable owning zero products, and I leave it to `storeListing`, because a sentence like
that is copy and this surface has no copy (sheet `04` rules `overlayText` empty on every slot).

**Zero videos, stated in order to forbid.** Four games, two of them above 29M visits, ship zero
videos between them. A video is a trailer, the trailer brief is Hype's, and it inherits the same
capture gate this key does. I set `videoCount` to `0` and claim nothing about Hype's ruling.

**Every path this domain cites is published with its resolution, and so is every field its criteria
assert.** Round 1 found one criterion in this sheet naming two fields that do not exist, which
returns undefined rather than a verdict, and the same defect class produced three requests in Art
and one in Name. The fix is two registries rather than one careful re-read:
`externalPathsResolved` carries all **26** cross-key paths the four sheets cite, each with its
owning key and a `resolves` boolean, on `art/vfx/01`'s precedent; `internalPathsAsserted` carries
every field of this key a criterion in this domain names, so a criterion pointing at nothing is a
defect **before** it is run rather than after. **Round 2 is the registry earning its keep**: three
new criteria in sheets `02` and `03` named five fields the list did not carry, which is the signal
it was built to raise. **And one of my own fields was the problem, not the criterion that read it**
— `captureSource` mixed a path with a gloss, so no comparison against it could be both exact and
true. A field a sibling key cites by path is a path; the sentence about it is a second field.

```manifest
{
  "provides": "storeThumbnails",
  "status": "proposed",
  "value": {
    "revision": 2,
    "revisionNote": "round 1 of cid/marketing/_verified.md. RR-2: acceptance criterion 3 named two per-slot fields that do not exist; both live at platform.* and the criterion now names them there. No value moved. externalPathsResolved and internalPathsAsserted added; two cited spellings corrected to styleGuide.roleRules[id=C5] and effects.cues[id=findReveal]. Round 2: the release.publishChecklist row no longer says RR-T1 requests a fifth row, because a requester does not assign a checklist id; slots[].captureSource is now the bare key path with its gloss moved to captureSourceRule, so criterion 3 can compare by equality; and five field paths named by new criteria in sheets 02 and 03 are added to internalPathsAsserted.paths. No decision moved in either round.",
    "count": 1,
    "activeCount": 1,
    "inactiveCount": 0,
    "videoCount": 0,
    "videoCountRuling": "zero. The trailer brief is Hype's and inherits captureGate; this key forbids a video slot rather than reserving one.",
    "personalisationOn": false,
    "personalisationOnReason": "personalisation activates at 2 active thumbnails and optimises qPTR, a play-through rate. 00-CORE.md declines retention and revenue by name and analytics E5 forbids acting on either reading. One active slot leaves the optimiser off and there is no other opt-out.",
    "platform": {
      "maxMediaItems": 10,
      "aspectRatio": "16:9",
      "pixelSize": [1920, 1080],
      "formatsPermitted": ["jpg", "gif", "png", "tga", "bmp"],
      "formatChosen": "png",
      "formatChosenReason": "lossless, and the frame is flat matte stone and foliage where jpg ringing is visible at sort-row size",
      "appliesToEverySlot": true,
      "appliesToEverySlotNote": "aspectRatio, pixelSize and formatChosen are stated once here and are NOT repeated per slot. A criterion or a sibling key citing slots[].pixelSize or slots[].format resolves to nothing; the paths are platform.pixelSize and platform.formatChosen.",
      "allUploadsModerated": true,
      "personalisationActivatesAtActiveCount": 2,
      "personalisationMaxActive": 5,
      "personalisationObjective": "qPTR",
      "altTextSupported": true,
      "reorderSupported": true,
      "sources": [
        "https://create.roblox.com/docs/production/publishing/thumbnails",
        "https://devforum.roblox.com/t/get-your-thumbnails-ready-for-thumbnail-personalization/3226599",
        "https://devforum.roblox.com/t/5-tips-from-roblox-staff-to-get-the-most-out-of-thumbnail-personalization/3471689"
      ]
    },
    "order": {
      "rule": "slots are ordered by ordinal ascending and ordinal 1 is the first image on the experience detail page",
      "appendOnly": true,
      "appendOnlyReason": "a later slot is appended, never prepended, so adding one cannot silently change which image a returning viewer sees first",
      "sortRowImageIsNotThisKey": "the image in a sort row is the experience icon, which is storeIcon (Icon domain), not a thumbnail"
    },
    "slots": [
      {
        "ordinal": 1,
        "id": "cleared-ground-and-the-open-list",
        "claim": "Clearing the overgrowth is what uncovers what is buried, and all 24 finds are kept in one list you can finish.",
        "claimIsAFirstSessionPromise": true,
        "claimLifetimeSource": "theme/fantasy/02 — the hook is a first-session promise with a supply of exactly 24, not a standing one",
        "backedBy": [
          "01-FOUNDATION.md — 'Cleared is permanent, overgrowth never returns' [brief: binding]",
          "CONCEPT.md — 'the clearing is the revealing; what you uncover is what you keep' [brief: binding]",
          "collection — 24 finds in 4 sets of 6, relicsPerArea 3",
          "endgame.collectionEnds — true; endgame.postTerminalArea.buriesFinds — 0",
          "03-META.md — long-term objective, 24 of 24"
        ],
        "captureSource": "storeThumbnails.captureGate.allRowsPass",
        "captureSourceRule": "sheet 02 owns that gate. The frame may not be taken while the field is false. Round 2 split this sentence out of captureSource so the field a criterion compares is a path and nothing else.",
        "composition": {
          "halves": 2,
          "halfOne": {
            "subject": "a cleared path through green",
            "source": "05-OUTWARD.md, the brief's own first half [brief: soft], and it is buildable",
            "content": "cleared limestone paving running away from camera, standing overgrowth of at least two of the four tiers shapes to one side of it, and the built edge (retaining wall or parapet) closing the far side",
            "rolesUsed": ["styleGuide.roles[\"stone.cleared\"]", "styleGuide.roles[\"stone.built\"]", "tiers[].rgb"]
          },
          "halfTwo": {
            "subject": "index-panel",
            "decidedBy": "sheet 03 of this domain, which replaces 05-OUTWARD.md's second half and files the revision request",
            "content": "set by storeThumbnails.secondHalf"
          },
          "camera": {
            "clockTime": 15.5,
            "clockTimeSource": "art/lighting/01 — every promotional image is at ClockTime 15.5; theme/setting/03 R1",
            "framing": "third person from behind and above the capturing player's own avatar, tool in hand, horizon in the upper third",
            "playersInFrame": 1,
            "playersInFrameRule": "the capturing player's own unmodified avatar only. Zero other avatars, because social has no interaction and a group of avatars asserts one (T5).",
            "weather": "none",
            "postProcessing": "none"
          },
          "mustNotContain": "every row of storeThumbnails.forbidden"
        },
        "overlayText": "",
        "overlayTextRule": "storeThumbnails.overlayRule — sheet 04. This field is the empty string by that ruling, not by omission.",
        "altText": "Cleared stone paving beside tall green overgrowth, with the collection list open showing found names and empty slots.",
        "altTextRule": "storeThumbnails.altTextRule — sheet 04",
        "file": "assets/marketing/thumbnail-01.png",
        "fileIsABuildArtifact": false,
        "uploaded": false,
        "uploadedBlockedBy": "captureGate",
        "active": true,
        "activeRule": "this slot is the only active one. A second active slot turns personalisation on and is forbidden by this key."
      }
    ],
    "refresh": {
      "cadence": "never",
      "schedule": "none",
      "reasons": [
        "'Ships and settles. No seasons or events.' OPEN.md 2 [brief: soft]",
        "release has no update stream and endgame is unbounded and unchanging, so there is nothing a refreshed image could show that this one does not",
        "the two commodity clones in the survey shipped 1 and 2 images and have not touched them; the 6-image game is four years old with an update stream this game does not have"
      ],
      "recaptureTriggers": [
        "styleGuide.roles[\"stone.cleared\"].rgb changes",
        "uiTheme.archetype changes",
        "the count of collection.sets[].relics[] changes from 24",
        "depths area count changes from 8",
        "any captureGate row that had passed returns to fail"
      ],
      "recaptureTriggerRule": "a trigger produces one re-capture of the existing slot at the same composition. It never produces a second slot and never changes the claim.",
      "reopenCondition": "a developer-authored decision to pursue acquisition, which would reopen 00-CORE.md's two declined non-goals first"
    },
    "variants": {
      "abTestSet": [],
      "abTestSetReason": "an A/B set is 2 or more active thumbnails, which is personalisation, which is qPTR. See personalisationOnReason.",
      "seasonal": [],
      "seasonalReason": "03-META.md priority 3 forbids seasons and events, and theme/setting/03 states there is no hour, weather or season channel for one to attach to. Absent, not deferred.",
      "holiday": [],
      "eventual": [],
      "reservedSlots": 0,
      "reservedSlotsRule": "no slot, field or ordinal is held open for a future image. A reserved slot is a season with a different name."
    },
    "genreEvidence": [
      { "game": "[U+1F331] Grass Incremental Simulator", "universeId": 7699580568, "visits": 38572206, "ccuAtFetch": 1088, "favourites": 579483, "listedGenre": "All", "thumbnails": 1, "videos": 0, "altText": "empty", "isTheReference": true },
      { "game": "[AWAKENING] Grass Cutting Incremental", "universeId": 3478678937, "visits": 29438632, "ccuAtFetch": 249, "favourites": 80066, "listedGenre": "Comedy", "thumbnails": 6, "videos": 0, "altText": "empty", "note": "three uploaded together, then one, then one, then one recent" },
      { "game": "[UPDT] Leaves Incremental", "universeId": 8974089723, "visits": 403766, "ccuAtFetch": 0, "favourites": 13868, "listedGenre": "All", "thumbnails": 2, "videos": 0, "altText": "empty" },
      { "game": "Scrap Incremental", "universeId": 9719511378, "visits": 333896, "ccuAtFetch": 0, "favourites": 2547, "listedGenre": "All", "thumbnails": 1, "videos": 0, "altText": "empty" }
    ],
    "genreEvidenceBound": "this is four competitors, not a market. research/landscape.md's own limit holds: 'taken here means exists, not successful'. These figures close the count half of the must_verify and nothing else.",
    "unverified": [
      {
        "claim": "what any competitor thumbnail actually depicts",
        "status": "[unverified]. WebFetch returns markdown so an image is a URL and not a picture; all four games ship empty alt text so there is no description to read; and the one page cataloguing a competitor's promotional media returned 402 on both Fandom hosts.",
        "consequence": "no sheet in this domain asserts a genre composition convention, and no slot imitates one",
        "settlingFetch": "https://www.roblox.com/asset-thumbnail/image?assetId=105218777592191&width=768&height=432&format=png rendered in a vision-capable reader, or the four detail pages opened in a browser"
      }
    ],
    "forbidden": [
      { "id": "X1", "what": "a second active thumbnail, or any A/B pair", "ruling": "personalisation activates at 2 active and optimises qPTR; 00-CORE.md declines retention and revenue", "observable": "activeCount is 1 and personalisationOn is false" },
      { "id": "X2", "what": "a video or trailer in any slot", "ruling": "videoCount 0; the trailer brief is Hype's and inherits captureGate", "observable": "slots[] has no row whose file extension is a video format" },
      { "id": "X3", "what": "a seasonal, holiday, festival or event variant of any slot", "ruling": "03-META.md priority 3; theme/setting/03 R1; theme/tone/04 D15", "observable": "variants.seasonal is [] and no slot carries a date, calendar or event field" },
      { "id": "X4", "what": "a frame at night, at dusk, at any hour other than 15.5, or in rain, snow, fog or wind", "ruling": "theme/setting/03 R1 and R2 — one lighting state 'in any promotional image'; no weather, ever", "observable": "composition.camera.clockTime is 15.5 and weather is none on every slot" },
      { "id": "X5", "what": "a mascot, a character, a face, eyes or a mouth other than the capturing player's own avatar", "ruling": "theme/identity/04 — 'the icon and thumbnail have no mascot and no face other than a player avatar'; theme/tone/04 D13", "observable": "composition.camera.playersInFrame is 1 and the frame contains no non-avatar figure" },
      { "id": "X6", "what": "a Find shown as an object, a model, a card, a drop, a pile or an icon", "ruling": "representation.find — 'no Instance at any point in its life'; objectArt.find.iconCount 0, imageAssetCount 0, meshCount 0, worldInstanceCount 0; T6", "observable": "secondHalf.findObjectDepicted is false" },
      { "id": "X7", "what": "a shop screen, an offer row, a price, a Robux glyph or any purchase control", "ruling": "ruling R-4; products.storeExists false; offerSurface is an explicit empty set. There is no such screen to photograph.", "observable": "no slot's composition names a store, shop, offer or purchase node" },
      { "id": "X8", "what": "a leaderboard, a badge, a code, a daily-reward panel, a trade window or a rebirth control", "ruling": "03-META.md priority 3; endgame.forbidden lists badgeLadder, leaderboard, trading, redeemCode", "observable": "the frame contains none of those nodes; screens has no such screen to open" },
      { "id": "X9", "what": "a second player, another player's nameplate, a chat bubble or any group of avatars", "ruling": "CONCEPT.md — 'shared server, parallel progression, own areas, no interaction'; T5. theme/identity/03 also forbids dressing a nameplate.", "observable": "playersInFrame is 1" },
      { "id": "X10", "what": "an arrow, a circle, a red ring, a starburst, a NEW flash, a before-and-after split or a comparison label bar", "ruling": "none of these is a gameplay context; the platform permits overlay 'only to describe gameplay contexts'. Sheet 04 rules overlayText empty.", "observable": "every slot's overlayText is the empty string and the frame contains no element not rendered by the shipped client" },
      { "id": "X11", "what": "a shocked or reacting face, a pointing hand, a giant floating head or a cropped avatar portrait", "ruling": "X5, plus theme/tone/02's humor ban, which reaches thumbnails by name", "observable": "same as X5" },
      { "id": "X12", "what": "big display text, an outlined display number, a percentage badge or a find-count counter drawn on the image", "ruling": "sheet 04; and a counter drawn on an image is a volume claim outside T3's check", "observable": "overlayText is the empty string" },
      { "id": "X13", "what": "a health bar, a damage number, a timer, a countdown or a danger indicator in frame", "ruling": "'Tension is zero by design' HANDOFF.md six-things 4 [brief: binding]; theme/tone/04 D9 bans the timer and countdown; T10", "observable": "the shipped HUD has no such node; grep the captured screen tree for Timer, Countdown, Health" },
      { "id": "X14", "what": "cobwebs, bones, skulls, grave markers, dust sheets, torches, candles, glowing runes or mist", "ruling": "04-PRESENTATION.md — 'warm and unhurried, not spooky. This is reclamation, not a haunted place' [brief: soft]; theme/setting/05 A7 forbids any luminous thing", "observable": "zero instances of any of the nine named objects exist in the place, so none can enter a frame taken from it" },
      { "id": "X15", "what": "gold, gilding, gemstones, a glinting hoard or a treasure chest", "ruling": "theme/lore/01 — 'art must not add gold, gilding or gemstones'; styleGuide.roleRules[id=C5] fails fantasy-ornate's own gold token #D4A34A by construction; treasure is in vocabulary.bannedWords", "observable": "no authored Color3 in the place passes C5, so no gilded surface exists to photograph" },
      { "id": "X16", "what": "an upscaled, AI-generated, retouched, recoloured or composited frame, or any element added after capture", "ruling": "the platform's own rule — 'Graphics shown must be representative of the actual in-game visuals. Avoid artificially enhancing graphics beyond what a player will experience'; T8", "observable": "captureGate.provenance records commit, buildStamp and placeVersion, and the file's pixel size is the native platform.pixelSize" },
      { "id": "X17", "what": "a padlock, a silhouette, a blurred model, a greyed name or a question mark on an empty index slot", "ruling": "theme/tone/04 D11; representation.index-surface — 'an unfound name reads as an empty slot. NOTHING ELSE.'", "observable": "objectArt.find acceptance criterion 4 already checks this in the build, and the frame is a frame of that build" },
      { "id": "X18", "what": "a slot, ordinal, field or file name held open for a future image", "ruling": "03-META.md priority 3, hard as a gate; reservedSlots is 0", "observable": "slots[] has exactly 1 row and count equals slots.length" }
    ],
    "externalPathsResolved": [
      { "path": "collection.sets[].relics[]", "owningKey": "collection", "citedBy": ["01", "03"], "resolves": true, "note": "an array of bare strings; no name is copied into this key" },
      { "path": "collection.relicsPerArea", "owningKey": "collection", "citedBy": ["01"], "resolves": true, "note": "3 after ruling R-2" },
      { "path": "endgame.collectionEnds", "owningKey": "endgame", "citedBy": ["01"], "resolves": true },
      { "path": "endgame.postTerminalArea.buriesFinds", "owningKey": "endgame", "citedBy": ["01", "04"], "resolves": true },
      { "path": "endgame.forbidden", "owningKey": "endgame", "citedBy": ["01"], "resolves": true },
      { "path": "products.storeExists", "owningKey": "products", "citedBy": ["01", "04"], "resolves": true },
      { "path": "products.itemCount", "owningKey": "products", "citedBy": ["01", "04"], "resolves": true },
      { "path": "offerSurface", "owningKey": "offerSurface", "citedBy": ["01"], "resolves": true, "note": "an explicit empty set; cited as a whole key, no field named" },
      { "path": "vocabulary.bannedWords", "owningKey": "vocabulary", "citedBy": ["01", "03", "04"], "resolves": true },
      { "path": "vocabulary.allowedPattern", "owningKey": "vocabulary", "citedBy": ["01", "04"], "resolves": true, "note": "adopted by sheet 04 rather than inherited; ruling M-B exempts it outward" },
      { "path": "vocabulary.maxLabelChars", "owningKey": "vocabulary", "citedBy": ["04"], "resolves": true, "note": "cited only to record that it does NOT bind this surface" },
      { "path": "styleGuide.roles[\"stone.cleared\"]", "owningKey": "styleGuide", "citedBy": ["01", "02", "03"], "resolves": true, "note": "the canonical spelling per styleGuide.citeAs; roles.clearedStone resolves to nothing" },
      { "path": "styleGuide.roles[\"stone.built\"]", "owningKey": "styleGuide", "citedBy": ["01"], "resolves": true },
      { "path": "styleGuide.roleRules[id=C5]", "owningKey": "styleGuide", "citedBy": ["01"], "resolves": true, "correctedFrom": "styleGuide.roleRules[C5]", "correctionReason": "roleRules is an ARRAY keyed by .id per styleGuide.citeAs; a name-keyed lookup is the materials[worked-wood-dark] defect repeated" },
      { "path": "tiers[].rgb", "owningKey": "tiers", "citedBy": ["01", "03"], "resolves": true },
      { "path": "patch.footprint", "owningKey": "patch", "citedBy": ["03"], "resolves": true, "note": "cited through effects, not measured here" },
      { "path": "uiTheme.archetype", "owningKey": "uiTheme", "citedBy": ["01", "02"], "resolves": true, "note": "proposed, not merged" },
      { "path": "objectArt.find.iconCount", "owningKey": "objectArt", "citedBy": ["01"], "resolves": true, "note": "supplied by art/objects/04 as an amends block at path find" },
      { "path": "objectArt.find.worldInstanceCount", "owningKey": "objectArt", "citedBy": ["01", "03"], "resolves": true },
      { "path": "representation.find", "owningKey": "representation (architect/06)", "citedBy": ["01", "03", "04"], "resolves": true },
      { "path": "representation.index-surface", "owningKey": "representation (architect/06)", "citedBy": ["01", "03"], "resolves": true },
      { "path": "representation.plot", "owningKey": "representation (architect/06)", "citedBy": ["02"], "resolves": true, "note": "the lane slab RR-A1 amends" },
      { "path": "effects.cues[id=findReveal]", "owningKey": "effects", "citedBy": ["03"], "resolves": true, "correctedFrom": "effects.beats[findReveal]", "correctionReason": "effects holds cues[], keyed by .id; beats[] belongs to response. The old spelling named a collection that exists in neither key." },
      { "path": "response.beats[findReveal].dwellSeconds", "owningKey": "response", "citedBy": ["03"], "resolves": true, "note": "2.5. Spelled as art/vfx/01's own externalPathsCited spells it, without an id= qualifier, so one collection is not cited two ways across the contract." },
      { "path": "release.publishChecklist", "owningKey": "release", "citedBy": ["02", "04"], "resolves": true, "note": "four rows today, P1 to P4. RR-T1 asks for at least one row beyond P4; the row's id is release's to assign, and three other live requests (RR-C1, RR-H1, icon/01) want a row on the same checklist." },
      { "path": "budgets.deviceFloor", "owningKey": "budgets", "citedBy": ["02"], "resolves": true },
      { "path": "depths", "owningKey": "depths", "citedBy": ["01", "04"], "resolves": true, "note": "8 areas; cited as a whole key for the T3 volume bound, no field named" }
    ],
    "externalPathsResolvedNote": "26 rows, re-resolved against each owning manifest in round 1 on art/vfx/01's precedent, not only the one the verifier named. Two spellings were wrong and are corrected in place with correctedFrom recorded; the other twenty-four resolve. No path in this domain is collection.total, the phantom five sheets cite in three spellings. Round 2 changed one note, not one path: the release.publishChecklist row no longer names a row id this domain has no standing to assign.",
    "internalPathsAsserted": {
      "note": "every storeThumbnails field an acceptance criterion in this domain names. A criterion naming a field absent from this list is a defect before it is run, which is RR-2's shape. Round 2 added five paths raised by three new criteria in sheets 02 and 03, which is the list working rather than the list failing.",
      "paths": ["count", "slots", "activeCount", "inactiveCount", "videoCount", "personalisationOn", "platform.maxMediaItems", "platform.pixelSize", "platform.formatChosen", "platform.formatsPermitted", "slots[].backedBy", "slots[].claim", "slots[].altText", "slots[].overlayText", "slots[].captureSource", "slots[].uploaded", "slots[].composition", "variants.abTestSet", "variants.reservedSlots", "forbidden", "externalPathsResolved", "internalPathsAsserted.paths", "captureGate.allRowsPass", "captureGate.rows", "captureGate.rowsPassingToday", "captureGate.provenance.fields", "captureGate.revisionRequests[RR-T1].rowIdAssignedBy", "captureGate.revisionRequests[RR-T1].rowCountEffect", "captureGate.revisionRequests[RR-T1].otherLiveRequestsAgainstThisChecklist", "secondHalf.subject", "secondHalf.findObjectDepicted", "secondHalf.revealBeatDepicted", "secondHalf.revealCuePathSpelling", "secondHalf.staleSpellingElsewhere.occurrences", "secondHalf.contentRequired.slotsRendered", "secondHalf.framing.maxFrameWidthFraction", "overlayRule.anySlotCarriesOverlayText", "overlayRule.exclusionZone.fractionOfHeight", "overlayRule.ruleIfEverReopened.forbiddenClasses", "altTextRule.rule.forbiddenClasses"],
      "notFields": ["slots[].pixelSize", "slots[].format"],
      "notFieldsReason": "RR-2. Aspect ratio, pixel size and format are stated once at platform.* and apply to every slot; a per-slot copy would be a second source for one value.",
      "scope": "storeThumbnails fields only. A criterion asserting a repo file, a grep result or a sidecar field is out of scope for this list by design."
    },
    "amendedBy": [
      { "path": "captureGate", "sheet": "cid/marketing/thumbnails/02-the-capture-gate.md" },
      { "path": "secondHalf", "sheet": "cid/marketing/thumbnails/03-no-subject-for-the-second-half.md" },
      { "path": "overlayRule and altTextRule", "sheet": "cid/marketing/thumbnails/04-overlay-and-alt-text.md" }
    ]
  }
}
```

## Consequences for other work

- **Store-listing work (`storeListing`)** carries every sentence this surface does not. The image
  makes one claim and no copy; the unusual true claim `F17` gives (24/24 owning zero products)
  is theirs, and I do not spend it here.
- **Trailer-and-launch work (Hype)** inherits `videoCount: 0` as this key's ruling on a *thumbnail
  video slot only*. Whether a trailer exists at all is Hype's, and it inherits the same capture
  gate, so it should read sheet `02` before ruling.
- **Icon work (`storeIcon`)** owns the sort-row image. This key states plainly that a thumbnail is
  not it, so neither domain sizes for the other's surface. It may also reuse
  `externalPathsResolved` rather than re-resolving the same eleven `styleGuide`, `objectArt` and
  `representation` paths.
- **Publish-checklist work (`release`)** receives one upload step it does not have today, filed by
  sheet `02` as `RR-T1`. **It is at least one row beyond `P4` and its id is yours** — three other
  live requests want a row on the same checklist, so this domain names none. Without the row,
  `activeCount: 1` is a value nothing acts on.
- **Analytics work** gets a firm answer to a question `E5` would otherwise face at publish time:
  `personalisationOn` is `false`, so no qPTR series exists and nobody is tempted to read one.
- **Live Ops (Roadmap)** should note `refresh.cadence` is `never` with five named re-capture
  triggers. A roadmap item that changes the paving colour, the archetype, the find count or the
  area count re-opens one capture; nothing else does.
- **Contract-and-seam work** may find `internalPathsAsserted` worth generalising, and round 2 adds
  a second half to the finding: a field that mixes a key path with a sentence of gloss cannot be
  compared exactly by anyone, so **a field other keys cite by path holds only the path**. RR-2 in
  this domain, three requests in Art and one in Name are the first half of the same defect.

## Acceptance criteria

1. `storeThumbnails.count` is `1`, equals `slots.length`, and is `<= platform.maxMediaItems`;
   `activeCount` is `1`, `inactiveCount` and `videoCount` are `0`, `variants.abTestSet` is `[]`,
   `variants.reservedSlots` is `0`, and `personalisationOn` is `false`.
2. Every `slots[].backedBy[]` is non-empty and every entry resolves to a merged or proposed key
   path, an approved `cid/**` sheet id, or a file that exists in this repo; no `slots[].claim` or
   `slots[].altText` matches any `T1`–`T10` predicate in `cid/marketing/_category.md`.
3. `platform.pixelSize` is `[1920, 1080]` and `platform.formatChosen` is a member of
   `platform.formatsPermitted`; every `slots[].captureSource` is byte-identical to the string
   `storeThumbnails.captureGate.allRowsPass`; and every slot has `uploaded: false` while
   `captureGate.allRowsPass` is `false`.
4. `forbidden[]` has **18** rows, each with an `id`, a `ruling` and an `observable`; every row of
   `externalPathsResolved` has `resolves: true` and the two rows carrying `correctedFrom` name the
   spelling each replaces; every `storeThumbnails` field path named in an acceptance criterion of
   this domain's four sheets appears in `internalPathsAsserted.paths`; and no field anywhere in
   this key is `null`.

## Not decided here

What makes a capture legitimate, which artifacts must be true first, what is a forbidden source,
and who owns the resulting file: **sheet `02`**, which amends `storeThumbnails.captureGate` and
files `RR-T1`. What the second half actually depicts and the revision request against
`05-OUTWARD.md`: **sheet `03`**, which amends `storeThumbnails.secondHalf`. The rule binding
overlay strings and alt text, the word ceiling, the reading level and the bottom exclusion zone:
**sheet `04`**, which amends `overlayRule` and `altTextRule`; I set the two strings, sheet `04`
sets the rule they satisfy. The game's name: **naming work**, which holds `title`; no string in
this key contains it, deliberately. The sort-row icon and its count: **Icon work**, which holds
`storeIcon`. Every line of description copy, the tag set, the genre selection and the pass listing:
**Store Page work**, which holds `storeListing`. Whether a trailer exists: **Hype**. **Which id the
upload row takes on `release.publishChecklist`, and how `RR-T1` composes with `RR-C1`, `RR-H1` and
`icon/01`'s ask: `release`** — this domain states the obligation and assigns no number. The
`collection.total` phantom five sheets cite in three spellings: **not cited by this domain**, and
the cross-category pass owns it. Whether the platform permits a detail page with zero thumbnails,
which would matter only if the gate never passes:
`[research owed: whether a Roblox experience detail page requires at least one thumbnail, and what
it renders when none exists]`.
