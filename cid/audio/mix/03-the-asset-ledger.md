# 03 — The asset ledger, the sentinel, and the two gates nobody has

**Domain:** audio/mix · **Category:** Audio · **Wave:** 6

## Decision

**Ten megabytes of audio files across six keys, split 1.5 / 2.5 / 1.0 / 3.0 / 0.0 with 2.0 unallocated; eighteen asset files in eight cue classes, twelve of them uploads; and every `SoundId` carrying the sentinel `""` until it is provisioned.** Two revision requests ride with it: audio gates into `release.provisioning.gates`, and a `StreamingSounds` row into `budgets.memoryCeilingsByCategory`.

## Why

**The 20 MB ceiling is a PlaceMemory figure and a creator controls file bytes, so the ledger budgets files and states the conversion it assumes.** `budgets.memoryCeilingsByCategory.Sounds` is 20 MB on a 3 GB phone, `[playtest unknown]` at ±60%, and the platform publishes no conversion from an audio file's bytes to its resident cost. Its only guidance is a sentence: *"Audio files can be a surprising contributor to memory usage, particularly if you load all of them into the client at once"* `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/performance-optimization/improve.md]`. So the ledger sets `assumedExpansionFactor` **2.0**, budgets **10.0 MB of files**, and marks the factor `[playtest unknown]` with a range of 1.0–6.0 and a named instrument. A split stated only in PlaceMemory MB would be a number no uploader could act on `[cid: decided]`.

**This ledger routes cue classes; the owning key registers assets — and the count has now been wrong twice, in the same direction.** `mix.assets.rows` carries bus, level, pool depth, length cap, source class and id form: six columns a builder needs to *wire* a cue. The owning key carries descriptor, pitch, variant and construction: what the file *is*. My first count missed in-world-sound work's twelve files behind one cue class; my second missed interface-sound work's `indexOpen` and `indexClose` entirely. **The count is eight cue classes and eighteen asset files**, and the defect both times was enumerating from my own routing table rather than from the owning keys, so `assetFileCount` now carries its addends.

**Interface-sound work ships three cues and no fourth.** `upgradePurchased`, `indexOpen`, `indexClose`, each one file, each `creatorStore`, each at most 0.35 s — and **no press-edge cue on any purchase control**, which is why sheet `01` deleted a `uiPress` level it had no business holding. Their allowance falls from 5 rows to **3**, matching a closed set.

**The pool is sized against a burst, not an average.** My first derivation read `response.minSustainedOnsetsPerSecond` 8 against a 0.4 s residue and concluded 3.2 concurrent — which assumes the eight onsets spread across the second. They do not. `Beats.luau:554-563` computes `rise = clearedCount - previous` and runs `for _ = 1, rise do begin(...)` inside **one frame**, with one shared `arrivedAt` `[research: game/src/client/Beats.luau]`. So a rise of 8 is 8 simultaneous onsets. At a pool of 6, onsets 7 and 8 must either be dropped — illegal under `onOverload: "overlap"` — or steal a voice aged 0 s, illegal under `minAudibleBeforeStealSeconds` 0.08. **`poolSize` is 8**, inside `World`'s 10 own-work voices. The neighbour twin stays at **5** under sheet `02`'s `poolDepthRule`: depth tracks the reservation for a class the stealing order empties first, and the burst for a class it does not.

**One coincidence worth stating: a single audio upload may itself be 20 MB.** Uploads are `.mp3`, `.ogg`, `.wav` or `.flac`, *"less than 20 MB in size and 7 minutes in duration"*, ≤ 48 kHz, mono or stereo `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/audio/assets.md]`. **One maximum-size file is 100% of this category's runtime ceiling.** That is why every row carries a length cap and a mono requirement rather than a note.

**Mono, everywhere.** A positional `Sound` is spatialised by the engine from its source, and a global cue on a phone speaker has no stereo image to lose. A stereo file doubles the bytes for something the output discards `[cid: decided]`.

**Creator Store is the default, and the clear is the stated exception.** The store carries *"more than 100,000 professionally-produced sound effects and music tracks"* free to use by asset id `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/audio/assets.md]`, and a store asset already has a live id, so it passes through no upload gate, no moderation queue and no permission grant. But in-world-sound work needs four files pitched to named scale degrees at one fixed length and one fixed peak, and the store does not sell those. **So the clear and its neighbour twin are `upload`**, with the reason in `whyNotCreatorStore`. Marking them `creatorStore` — which my first draft did — left the build with **no upload-class asset at all** and made RR-M1's two gates decorative.

**Audio needs two gates, not one, and only for upload rows.** Uploaded audio is private — *"only you can view and use it"* — and usage permission is granted per experience through Creator Hub → Creations → Asset Details → Permissions `[research: https://devforum.roblox.com/t/new-asset-privacy-and-permissions-features-for-audio-and-video/2725248]`. A restricted asset without that grant *"cannot load in Studio or at runtime"* `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/production/creator-store.md]`. **Granting an experience permission requires the experience to exist**, the identical publish-first inversion `gamePassId` has, and `release.provisioning.gates` runs publish → checklist → re-resolution → pass creation → id write → republish with nothing that uploads a sound. RR-M1 asks for two conditional gates after gate 1. I do not edit `release`; that key has one owner.

**The sentinel is `""` and neither existing precedent transfers.** `release.provisioning.unprovisionedIdValue` is `0`, a number; `Sound.SoundId` is a `ContentId` string whose engine default is empty `[research: https://robloxapi.github.io/ref/class/Sound.html]`, so `0` is a type error. `tech/deploy/02`'s scalar sentinel `"none"` would be a **non-empty content string the engine tries and fails to resolve** — an error, not silence — and that sheet's own rule admits the exception: `"none"` applies *"unless the containing table declares a more specific sentinel in place."* This key declares one, once, for all six audio keys.

**Which is exactly why the null rule bans the fragile shape and not the sentinel convention.** `tech/deploy/02` is replacing every explicit null with a declared sentinel of the field's own type, and `bridge/emit-config.mjs:79` already makes a null and a never-emitted key the same bytes. So a test asserting that a field an unowned key *declares* is `null` or unset passes today, passes after emission for an unrelated reason, and **stops matching the moment its owner is corrected** — silently. My first statement of this over-reached: it also banned depending on an unowned value being `"none"` or `0`, which is the **stable** form `deploy/02` mandates, and would have condemned `response.negativeBeats: 0`, `input.rejectionCueOnFailedPrecondition: "none"`, `traversal.death.authoredCue: "none"`, `input.worldObjectsTriggeringAVerb: 0` and this sheet's own reading of `release.provisioning.unprovisionedIdValue`. Two shapes are expressly permitted: **a positive test against another key's declared sentinel**, and **a test that a key declares no field of a name it forbids by name** — `notices.forbidden.noticeSound` is why `notices` carries no `soundId`, and `deploy/02` replaces nulls in fields that exist and never creates one. The three-step test, the cite-the-owner rule and the own-sentinel exemption are unchanged.

**Preload two cue classes, thirteen files, and nothing else.** `ContentProvider:PreloadAsync` *"yields until all of the assets… have loaded"*, and the platform's advice is *"only preload essential assets… You might get occasional pop-in, but it decreases load times"* `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/reference/engine/classes/ContentProvider.yaml]`. The essential set is what can fire inside `firstSession.beats[firstReveal].bySecond` 10.0: the clear's twelve files and the reveal's one. Interface-sound work asked for all of its cues to join the set on the ground that a purchase and an index open are both reachable in minute 1 — **declined**, because minute 1 is not ten seconds and pop-in on a first index open is the exact trade the platform recommends taking. The call runs **after** the character is controllable, where `budgets.loadTargetDerivation` stops the load-to-first-input clock, so preloading contributes 0 s to the 6.0 s target — and **audio is this build's first uploaded asset class**, since `budgets.textureCeilings` is zero uploaded images and zero uploaded meshes. A cue whose asset has not loaded is **silent for that onset and never queued**: silence is not a delay, so `N14` is untouched, and `response`'s channel list guarantees a non-audio channel carried the beat.

**`StreamingSounds` is budgeted by nothing today.** PlaceMemory reports **two** audio categories among 22 — `Sounds` and `StreamingSounds` — and `memoryCeilingsByCategory` names only the first `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/studio/optimization/memory-usage.md]`. A long looping bed would land in the second and be charged against `headroomForUntracked` rather than any ceiling. RR-M2 asks for an 8 MB row out of headroom, keeping both of that key's invariants true. **What routes an asset to one category rather than the other is not stated on that page** `[research owed: a Roblox page or engine reference stating the criterion — length, `Looped`, or an engine heuristic — by which an audio asset is streamed rather than held in memory]`.

**The 2.0 MB unallocated is headroom, not a reservation.** The ceiling it sits under is `[playtest unknown]` at ±60%, so the honest range on 20 MB is 8–32. Any owning key may claim from it by a revision request against this sheet. `03-META.md` priority 2 and 3 may not, and `forbidden` `M14` makes that checkable.

```manifest
{
  "amends": "mix",
  "authoritativeIn": "cid/audio/mix/01-bus-tree-and-levels.md",
  "value": {
    "assets": {
      "ceiling": { "placeMemorySoundsMB": 20, "source": "budgets.memoryCeilingsByCategory.Sounds", "status": "[playtest unknown] at +/-60%, so the honest range is 8 to 32 MB", "shareOfClientTotal": "20 of 420 MB on a 3 GB phone" },
      "assumedExpansionFactor": 2.0,
      "assumedExpansionStatus": "[playtest unknown], test range 1.0 to 6.0. No Roblox page states the conversion from an audio file's bytes to its PlaceMemory.Sounds residency. Instrument: Developer Console > Memory > PlaceMemory.Sounds on the floor device with one asset of known file size loaded.",
      "totalFileAllowanceMB": 10.0,
      "budgetedInFileBytes": "a creator controls file size and cannot control decoded residency, so the split is stated in file MB and converted by the factor above. A split stated only in PlaceMemory MB is a number no uploader can act on.",
      "twoRegistersOneSubject": "mix.assets.rows carries ROUTING per cue class — bus, level, pool depth, length cap, source class, id form. The owning key carries ASSETS — descriptor, pitch, variant, construction. Where a class maps to many files the row states assetRowsInOwningKey and names the key. Neither register restates the other's columns.",
      "countIsEnumeratedFromTheOwningKeys": "not from this routing table. Two earlier drafts undercounted — first by missing sfx's twelve files behind one cue class, then by missing uiSound's indexOpen and indexClose entirely — so assetFileCount now carries its addends and every row carries assetRowsInOwningKey.",
      "perDomain": [
        { "key": "stingers", "fileMB": 1.5, "maxRows": 3, "maxAudibleSeconds": 3.0, "channels": "mono" },
        { "key": "sfx", "fileMB": 2.5, "maxRows": 12, "maxRowsShape": "4 tierIndex notes x 3 transient variants, one cue class", "maxAudibleSeconds": 0.6, "channels": "mono", "fileMBUnchangedNote": "12 mono files at 0.30 s is the same total duration as 6 at 0.6 s, so the row count rose and the allocation did not" },
        { "key": "uiSound", "fileMB": 1.0, "maxRows": 3, "maxRowsShape": "upgradePurchased, indexOpen, indexClose — one file each. uiSound rules no press-edge cue and no system-notice cue exists, so the set is closed and maxRows is not headroom.", "maxAudibleSeconds": 0.5, "channels": "mono" },
        { "key": "ambience", "fileMB": 3.0, "maxRows": 2, "maxAudibleSeconds": 60.0, "channels": "mono", "looped": true },
        { "key": "music", "fileMB": 0.0, "maxRows": 0, "reason": "music.trackCount is 0" },
        { "key": "mix", "fileMB": 0.0, "maxRows": 0, "reason": "this key owns no asset of its own" }
      ],
      "unallocatedMB": 2.0,
      "unallocatedRule": "headroom against a [playtest unknown] ceiling at +/-60%, not a slot held for a future feature. Any of the five owning keys may claim from it by a revision request against cid/audio/mix/03-the-asset-ledger.md. 03-META.md priority 2 and priority 3 may not.",
      "sumCheck": "1.5 + 2.5 + 1.0 + 3.0 + 0.0 + 0.0 + 2.0 = 10.0, and 10.0 x 2.0 = 20.0",
      "whyMono": "a positional Sound is spatialised by the engine from its source and a global cue on a phone speaker has no stereo image to lose. A stereo file doubles the bytes for something the output discards.",
      "oneUploadMayBeTheWholeCeiling": "an audio upload may itself be up to 20 MB and 7 minutes, which is 100% of this category's PlaceMemory ceiling. That is why every row carries a length cap.",
      "rows": [
        { "id": "cue.findReveal", "owner": "stingers", "bus": "Stingers", "volume": 1.00, "poolSize": 2, "assetRowsInOwningKey": 1, "maxAudibleSeconds": 2.5, "channels": "mono", "source": "creatorStore", "soundId": "", "preload": true, "expectedMemoryCategory": "Sounds", "expectedMemoryCategoryStatus": "[unverified]" },
        { "id": "cue.setComplete", "owner": "stingers", "bus": "Stingers", "volume": 0.88, "poolSize": 2, "assetRowsInOwningKey": 1, "maxAudibleSeconds": 3.0, "maxAudibleSource": "notices dwellSeconds for B2", "channels": "mono", "source": "creatorStore", "soundId": "", "preload": false, "expectedMemoryCategory": "Sounds", "expectedMemoryCategoryStatus": "[unverified]" },
        { "id": "cue.areaComplete", "owner": "stingers", "bus": "Stingers", "volume": 0.76, "poolSize": 2, "assetRowsInOwningKey": 1, "maxAudibleSeconds": 2.5, "maxAudibleSource": "notices dwellSeconds for B3", "channels": "mono", "source": "creatorStore", "soundId": "", "preload": false, "expectedMemoryCategory": "Sounds", "expectedMemoryCategoryStatus": "[unverified]" },
        { "id": "cue.upgradePurchased", "owner": "uiSound", "bus": "Interface", "volume": 0.72, "poolSize": 2, "assetRowsInOwningKey": 1, "maxAudibleSeconds": 0.5, "channels": "mono", "source": "creatorStore", "soundId": "", "preload": false, "expectedMemoryCategory": "Sounds", "expectedMemoryCategoryStatus": "[unverified]" },
        { "id": "cue.indexOpen", "owner": "uiSound", "bus": "Interface", "volume": 0.45, "poolSize": 1, "poolDerivation": "uiSound sets audibleSeconds 0.25 under a ceiling of input.pressable.debounceSeconds 0.35, so the cue can never overlap itself and one instance suffices.", "assetRowsInOwningKey": 1, "maxAudibleSeconds": 0.35, "maxAudibleSource": "uiSound's own audibleCeilingRule, audibleSeconds <= input.pressable.debounceSeconds", "channels": "mono", "source": "creatorStore", "soundId": "", "preload": false, "expectedMemoryCategory": "Sounds", "expectedMemoryCategoryStatus": "[unverified]" },
        { "id": "cue.indexClose", "owner": "uiSound", "bus": "Interface", "volume": 0.45, "poolSize": 1, "poolDerivation": "same as cue.indexOpen. The two are separate assets, not one cue played twice.", "assetRowsInOwningKey": 1, "maxAudibleSeconds": 0.35, "channels": "mono", "source": "creatorStore", "soundId": "", "preload": false, "expectedMemoryCategory": "Sounds", "expectedMemoryCategoryStatus": "[unverified]" },
        { "id": "cue.patchClear", "owner": "sfx", "bus": "World", "volume": 0.60, "poolSize": 8, "poolDerivation": "the burst is simultaneous, not spread. Beats.luau:554-563 computes rise = clearedCount - previous and runs `for _ = 1, rise do begin(...)` inside ONE frame with one shared arrivedAt, so a rise of 8 is 8 simultaneous onsets rather than 8 across a second. At 6 the seventh and eighth onset must be dropped (illegal under response.onOverload \"overlap\") or steal a voice aged 0 s (illegal under mix.concurrency.stealing.minAudibleBeforeStealSeconds 0.08). 8 fits World's ownWorkHeadroom of 10, per stealing.poolDepthRule: depth tracks the BURST for a class the order does not steal from first.", "poolDerivationSupersedes": "an earlier figure of 6 derived from response.minSustainedOnsetsPerSecond 8 x 0.4 s = 3.2 concurrent, which assumed even spacing the shipped scheduler does not provide.", "assetRowsInOwningKey": 12, "assetRowsShape": "4 tierIndex notes x 3 transient variants; the pool draws from all 12", "maxAudibleSeconds": 0.4, "maxAudibleSource": "response.beats[patchClear] residue; sfx ships 0.30 s", "channels": "mono", "source": "upload", "whyNotCreatorStore": "the store's sound effects are free to use but do not come pitched to a named scale degree at one fixed length and one fixed peak level, which is what four tierIndex notes at identical loudness and length require.", "soundId": "", "preload": true, "expectedMemoryCategory": "Sounds", "expectedMemoryCategoryStatus": "[unverified]", "contingentOn": "G1" },
        { "id": "cue.patchClear.neighbour", "owner": "sfx", "bus": "WorldNeighbour", "volume": 0.60, "poolSize": 5, "poolDerivation": "depth tracks the RESERVATION, per stealing.poolDepthRule, because stealing.order step 1 empties this bus first. WorldNeighbour reserves 5, so instances 6 to 8 could never sound and 8 would buy three instances for nothing. The consequence — a refused onset when all five voices are under 0.08 s old — is enumerated in mix.concurrency.stealing.refusalCases and scoped by forbidden M11.", "sharesAssetsWith": "cue.patchClear", "assetRowsInOwningKey": 0, "additionalFileMB": 0.0, "maxAudibleSeconds": 0.4, "channels": "mono", "source": "upload", "whyNotCreatorStore": "same twelve files as cue.patchClear; the source class follows the asset, not the bus.", "soundId": "", "preload": true, "preloadNote": "satisfied by cue.patchClear's preload; the assets are the same", "expectedMemoryCategory": "Sounds", "expectedMemoryCategoryStatus": "[unverified]", "contingentOn": "G7" }
      ],
      "cueClassCount": 8,
      "assetFileCount": 18,
      "assetFileCountAddends": "stingers 3 (findReveal, setComplete, areaComplete) + uiSound 3 (upgradePurchased, indexOpen, indexClose) + sfx 12 (4 tierIndex notes x 3 transient variants, shared by both clear rows) = 18",
      "notCountedHere": { "ambienceLayerFiles": 1, "why": "ambience.layerCount is 1 and its layer is not enumerated as a routing row, because its bus, level and pool are fixed by the Beds row in mix.buses rather than per cue. Counting it, the build holds 19 audio files against a 10.0 MB allowance." },
      "uploadClassAssetCount": 12,
      "creatorStoreClassAssetCount": 6,
      "rowsNotEnumeratedHere": "the ambience layers. Their count is ambience.layerCount and their budget is the perDomain allowance above.",
      "preload": {
        "rowIds": ["cue.patchClear", "cue.findReveal"],
        "assetFilesPreloaded": 13,
        "why": "firstSession.beats[firstReveal].bySecond is 10.0 and firstSession.ceilings.secondsToFirstClear is 3 s from first input, so the clear's twelve files and the reveal's one are the only assets that can fire that early.",
        "uiSoundRequestDeclined": "interface-sound work asked that all of its cues join the preload set because a purchase and an index open are both reachable in minute 1. Declined: minute 1 is not ten seconds, and the platform's own advice is to preload only essential assets and accept occasional pop-in. Its three cues load lazily.",
        "timing": "after the character is controllable, which is where budgets.loadTargetDerivation stops the load-to-first-input clock",
        "contributionToLoadToFirstInputSeconds": 0.0,
        "loadTarget": "6.0 s target, 7.0 s ceiling on mobile — budgets.tiers[mobileFloor]",
        "firstUploadedAssetClass": "budgets.textureCeilings is zero uploaded images and zero uploaded meshes, so audio is the first uploaded asset class in this build. At 10 MB of mono files loaded off the clock it costs 0 s there.",
        "firstOnsetBeforeLoadBehaviour": "silent for that onset, never queued and never retried. Silence is not a delay, so performance/03 N14 is untouched, and response's channel list guarantees a non-audio channel carried the beat."
      }
    },
    "provisioning": {
      "unprovisionedSoundIdValue": "",
      "type": "ContentId, a string. Sound.SoundId's engine default is empty.",
      "declaredOnceFor": ["stingers", "sfx", "uiSound", "ambience", "music", "mix"],
      "whyNotZero": "release.provisioning.unprovisionedIdValue is 0, a number. Assigning it to a ContentId field is a type error, so the precedent does not transfer.",
      "whyNotNone": "tech/deploy/02's scalar sentinel \"none\" would be a non-empty content string the engine tries and fails to resolve — an error rather than silence. That sheet's own rule admits this: \"none\" applies unless the containing table declares a more specific sentinel in place. This is that declaration.",
      "notANull": "tech/deploy/02 — bridge/emit-config.mjs:79 maps null to nil and Luau drops the key, so an explicit null and a never-emitted key are the same bytes at runtime.",
      "guard": {
        "where": "the pool's acquire function, once, not at each play site",
        "rule": "no Play() is called on a Sound whose SoundId equals the sentinel",
        "why": "a non-empty unresolvable SoundId errors in the client output; the 2023 platform fix addressed the error SPAM, not the error"
      },
      "acceptanceShape": "a build with every audio id at the sentinel boots, plays nothing and warns nothing. This is the same shape release already uses for gamePassId, and it is why all six audio keys can ship before a single asset exists.",
      "dependingOnAnotherKeysAbsence": {
        "rule": "no field, criterion or precondition in an Audio key may depend on a value in an unowned key being NULL, or being UNSET in a field that key declares.",
        "why": "tech/deploy/02 is replacing every explicit null with a declared sentinel of the field's own type, and bridge/emit-config.mjs:79 already makes a null and a never-emitted key the same bytes. An absence-shaped test passes today, passes after emission for an unrelated reason, and stops matching the moment its owner is corrected — silently, with nothing firing.",
        "instead": "depend on the positive property the absence encodes, stated by the key that owns the fact.",
        "expresslyPermitted": [
          "a positive test against another key's DECLARED SENTINEL — \"none\", 0, {}, false. That is the stable form deploy/02 mandates, not the fragile one. response.negativeBeats 0, input.rejectionCueOnFailedPrecondition \"none\", input.worldObjectsTriggeringAVerb 0, traversal.death.authoredCue \"none\" and release.provisioning.unprovisionedIdValue 0 are each cited across this category and each is legal.",
          "a test that an unowned key declares NO FIELD of a given name at all, where that key forbids the thing by name. notices.forbidden.noticeSound is why notices carries no soundId, and deploy/02 replaces nulls in fields that exist and never creates one.",
          "a key testing its own declared sentinel, which requires owning both the field and the sentinel."
        ],
        "narrowedFrom": "a first statement that also banned depending on an unowned value being \"none\" or 0. That over-reached: those are the sentinel convention itself, and the rule would have condemned five cited fields across four Audio sheets and failed its own observable against uiSound's system-notice criterion.",
        "test": [
          "1. About to assert that a field you do not own is null or unset? Stop.",
          "2. Restate it as the property the absence encodes, in a field the owning key states positively — a declared sentinel counts.",
          "3. If no positive restatement exists, the owning key has no machine-readable statement of that fact, and that is a revision request against it rather than a criterion here."
        ],
        "workedExample": "stingers/02's criterion counted notices.members whose extinctAfter is null. cid/ui-ux/feedback/01:265 does carry that null and tech/deploy/02 will delete it. The fix was to read endgame's own extinctPayoffKinds and survivingPayoffKinds arrays instead — the key that owns the fact — and it now references no notices field.",
        "secondRule": "two keys agreeing on one fact should each cite the key that owns it, never each other's field. Adopted from reward-hit work's fix.",
        "ownSentinelIsExempt": "a key may test its own declared sentinel, because it owns both the field and the sentinel. mix.assets.rows[].soundId == \"\" is legal here for exactly that reason. The four sibling keys that test soundId == \"\" ADOPT this sentinel rather than declaring one, so none reaches this exemption and it cannot be widened.",
        "observableLivesIn": "mix.forbidden M16",
        "iFixNobodyElsesSheet": "cid/ui-ux/feedback/01's null is feedback work's to replace under tech/deploy/02. This block states how an Audio key stays correct across that replacement and requests nothing."
      },
      "perRowGateApplicability": "a creatorStore row passes through neither gate below: the asset already carries a live public id. Only an upload row does. Twelve of this build's eighteen asset files are uploads, so the gates fire.",
      "uploadCaps": "2,000 imports per 30 days if ID-verified, 100 otherwise; an import enters moderation and is visible only to the uploader until approved. Twelve imports at 0.30 s sit far inside both."
    },
    "revisionRequests": [
      {
        "id": "RR-M1",
        "against": "cid/tech/deploy/01-the-release-contract.md",
        "field": "release.provisioning.gates",
        "ask": "insert two ordered gates after gate 1 and before gate 6, applying only to rows whose mix.assets.rows[].source is \"upload\"",
        "appliesToThisBuild": "12 of 18 asset files — sfx's four tierIndex notes x three transient variants. The gates are conditional and they fire.",
        "gates": [
          { "after": 1, "gate": "upload every mix.assets row whose source is \"upload\" and record its asset id", "produces": "one asset id per upload row", "blocks": 6, "note": "an import enters moderation and is visible only to the uploader until approved" },
          { "after": "the gate above", "gate": "grant the published experience permission on every uploaded audio asset, via Creator Hub > Creations > Asset Details > Permissions", "produces": "one permission grant per upload row", "blocks": 6, "why": "uploaded audio is private and a restricted asset without permission cannot load in Studio or at runtime, and granting an experience permission requires the experience to exist — the same publish-first inversion gamePassId already has" }
        ],
        "doesNotApplyTo": "rows whose source is \"creatorStore\" — the three stinger and three interface files — which already carry live public ids and pass through neither gate. This is why the ask is two CONDITIONAL gates rather than two universal ones.",
        "buildMustStillRunAtEveryGate": true,
        "howThatStaysTrue": "mix.provisioning.unprovisionedSoundIdValue plus the pool guard: at every gate the build boots, plays nothing and warns nothing.",
        "movesNoValue": "nothing in release changes except the gates array."
      },
      {
        "id": "RR-M2",
        "against": "cid/tech/performance/01-device-floor-and-budgets.md",
        "field": "budgets.memoryCeilingsByCategory",
        "ask": "add a StreamingSounds row of 8 MB and reduce headroomForUntracked from 165 to 157",
        "reason": "PlaceMemory reports TWO audio categories among 22, Sounds (in-memory sounds) and StreamingSounds (streaming sounds). memoryCeilingsByCategory names the first and omits the second, so a long looping asset that the engine streams — exactly what ambience's bed is most likely to be — is budgeted by nothing and lands in headroomForUntracked.",
        "arithmetic": "120 + 25 + 5 + 60 + 0 + 20 + 8 + 25 + 157 = 420, so both stated invariants hold: the rows plus headroom sum to total, and total equals tiers[mobileFloor].clientPlaceMemoryMB.",
        "alsoCloses": "that key's own sourceNote research-owed against the PlaceMemory category tree. The page is now in cid/_research/pack.md.",
        "unsettled": "what routes an asset to StreamingSounds rather than Sounds. The memory page names both categories and defines neither's selection rule."
      }
    ]
  }
}
```

## Consequences for other work

- **In-world-sound work (`sfx`).** Twelve rows inside 2.5 MB, unchanged in budget. `poolSize` **8** for the clear, derived from your simultaneous-burst reading of `Beats.luau:554-563`; the neighbour twin is **5** under sheet `02`'s `poolDepthRule`, and its one consequence — a refused onset when all five voices are under 0.08 s old — is now enumerated there and scoped by `M11`. Both rows are `source: "upload"` carrying your scale-degree reason, which is what makes RR-M1's gates fire on something.
- **Interface-sound work (`uiSound`).** Your three cues are enumerated as routing rows: `upgradePurchased` at pool 2, `indexOpen` and `indexClose` at pool 1 each, derived from your own `audibleSeconds` 0.25 under a 0.35 s debounce ceiling. `maxRows` is **3**, matching a closed set rather than holding headroom. **Your preload request is declined** with a reason: minute 1 is not ten seconds, and the platform's advice is to accept pop-in. All three are `creatorStore`, so none passes a new gate — the cheapest provisioning path in the category, shared with reward-hit work.
- **Release-contract work (`release`).** RR-M1: two conditional gates after gate 1, keyed on a row's `source`, and **12 of this build's 18 asset files trigger them**. Missed, twelve cues ship with private ids and are silent in production while every gate reported success.
- **Device-budget work (`budgets`).** RR-M2: one new row, one reduced headroom figure, total unchanged at 420. It also closes that key's own `[research owed:]` for the PlaceMemory category tree.
- **Every Audio key, on the null rule.** You may test another key's **declared sentinel** freely, and you may test that a key declares no field of a name it forbids by name. What you may not do is assert that a field it *declares* is `null` or unset — that is the shape `tech/deploy/02` is about to delete. The three-step test and the cite-the-owner rule are unchanged.
- **Feedback work (`notices`).** **Nothing is asked of you.** `cid/ui-ux/feedback/01:265`'s `"extinctAfter": null` is yours to replace on your own schedule; no Audio criterion reads it.
- **Continuous-layer work (`ambience`).** 3.0 MB, up to 2 rows, mono, looped, ≤ 60 s — the largest per-domain allowance. Your layer is not a routing row because `Beds` fixes its bus, level and pool; it is counted in `notCountedHere` so the total is honest.
- **Instance-representation work (`architect/06`).** `poolSize` is instances: 2 + 2 + 2 + 2 + 1 + 1 + 8 + 5 = **23** `Sound` objects at the merged ledger, plus one per `ambience` layer, created once by the boot module and reused.

## Acceptance criteria

1. `mix.assets.perDomain[].fileMB` plus `unallocatedMB` sums to `totalFileAllowanceMB` 10.0; `totalFileAllowanceMB × assumedExpansionFactor` equals `ceiling.placeMemorySoundsMB` 20; and `assetFileCount` 18 equals the sum of `rows[].assetRowsInOwningKey` (1+1+1+1+1+1+12+0) and is at most the sum of `perDomain[].maxRows` (3+12+3+2+0+0 = 20).
2. Every row in `mix.assets.rows` has `soundId == ""`, and a client booted with all of them at that value performs zero `Play()` calls, prints zero warnings and prints zero errors.
3. Every row whose `source` is `"upload"` carries a non-empty `whyNotCreatorStore` (2 of 8 cue-class rows, 12 of 18 asset files), and no acceptance criterion under `cid/audio/` asserts that a field an unowned key **declares** is `null` or unset.
4. `mix.revisionRequests` has exactly 2 rows, one naming `release.provisioning.gates` and one naming `budgets.memoryCeilingsByCategory`; RR-M1's `appliesToThisBuild` count is greater than zero; and RR-M2's nine addends sum to 420.

## Not decided here

What any asset actually is — its descriptor, pitch, variant and construction — the owning key in every case; these rows carry routing and never content. Whether `patchClear` has an `audio` channel (**G1**) or a neighbour's clear is positional (**G7**) — in-world-sound work; both rows are marked contingent and the ledger sums without them. How many `ambience` layers exist — continuous-layer work, inside 2 rows and 3.0 MB. Whether `budgets.memoryCeilingsByCategory.Sounds` stays at 20 MB — device-budget work; the split is stated as shares as well as figures so it re-derives if it moves. What routes an asset to `StreamingSounds` — unowned and `[research owed:]`. **When and how `cid/ui-ux/feedback/01:265`'s null is replaced — feedback work's, under `tech/deploy/02`; this sheet states only how an Audio key survives the replacement.** Whether the sentinel guard belongs in `bridge/schema.mjs` as a shape constraint — contract-and-seam work.
