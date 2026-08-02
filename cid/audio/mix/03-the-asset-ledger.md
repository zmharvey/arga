# 03 — The asset ledger, the sentinel, and the two gates nobody has

**Domain:** audio/mix · **Category:** Audio · **Wave:** 6

## Decision

**Ten megabytes of audio files across six keys, split 1.5 / 2.5 / 1.0 / 3.0 / 0.0 / 0.0 with 2.0 unallocated, every row sourced from the Creator Store by default, and every `SoundId` carrying the sentinel `""` until it is provisioned.** Two revision requests ride with it: audio gates into `release.provisioning.gates`, and a `StreamingSounds` row into `budgets.memoryCeilingsByCategory`.

## Why

**The 20 MB ceiling is a PlaceMemory figure and a creator controls file bytes, so the ledger budgets files and states the conversion it assumes.** `budgets.memoryCeilingsByCategory.Sounds` is 20 MB on a 3 GB phone, `[playtest unknown]` at ±60%, and the platform publishes no conversion from an audio file's bytes to its resident cost. Its only guidance on the subject is a sentence: *"Audio files can be a surprising contributor to memory usage, particularly if you load all of them into the client at once"* `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/performance-optimization/improve.md]`. So the ledger sets `assumedExpansionFactor` **2.0**, budgets **10.0 MB of files**, and marks the factor `[playtest unknown]` with a range of 1.0–6.0 and a named instrument. A split stated only in PlaceMemory MB would be a number no uploader could act on `[cid: decided]`.

**One coincidence worth stating: a single audio upload may itself be 20 MB.** Uploads are `.mp3`, `.ogg`, `.wav` or `.flac`, *"less than 20 MB in size and 7 minutes in duration"*, ≤ 48 kHz, mono or stereo `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/audio/assets.md]`. **One maximum-size file is 100% of this whole category's runtime ceiling.** That is the reason every row carries a per-row length cap and a mono requirement rather than a note.

**Mono, everywhere.** A positional `Sound` is spatialised by the engine from its source, and a global cue on a phone speaker has no stereo image to lose. A stereo file doubles the bytes for something the output discards `[cid: decided]`.

**Creator Store by default, and this is the finding music work surfaced.** The store carries *"more than 100,000 professionally-produced sound effects and music tracks"* free to use by asset id `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/audio/assets.md]`. **A store asset already has a live id, so it passes through no upload gate, no moderation queue and no permission grant at all.** An upload costs all three. So `source` is a required column, the default is `creatorStore`, and a row re-declared `upload` by its owning key must carry a `whyNotCreatorStore` string (`forbidden` `M13`).

**Audio needs two gates, not one, and only for upload rows.** Uploaded audio is private — *"only you can view and use it"* — and usage permission is granted per experience through Creator Hub → Creations → Asset Details → Permissions `[research: https://devforum.roblox.com/t/new-asset-privacy-and-permissions-features-for-audio-and-video/2725248]`. A restricted asset without that grant *"cannot load in Studio or at runtime"* `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/production/creator-store.md]`. **Granting an experience permission requires the experience to exist**, which is the identical publish-first inversion `gamePassId` already has, and `release.provisioning.gates` runs publish → checklist → re-resolution → pass creation → id write → republish with nothing that uploads a sound. RR-M1 asks for two conditional gates after gate 1. I do not edit `release`; that key has one owner.

**The sentinel is `""` and neither existing precedent transfers.** `release.provisioning.unprovisionedIdValue` is `0`, a number; `Sound.SoundId` is a `ContentId` string whose engine default is empty `[research: https://robloxapi.github.io/ref/class/Sound.html]`, so `0` is a type error. `tech/deploy/02`'s scalar sentinel `"none"` would be a **non-empty content string the engine tries and fails to resolve** — an error, not silence — and that sheet's own rule admits the exception: `"none"` applies *"unless the containing table declares a more specific sentinel in place."* This key declares one, once, for all six audio keys. **Two other domains reached the same conclusion independently** (`sfx` sheet 03 and `stingers` S8 both used `""` as a placeholder and deferred here); this closes it.

**The guard sits at the pool, not at the id.** A sound whose id will not load errors in the console rather than failing silently, and the 2023 platform fix was to the error *spam*, not the error `[research: https://devforum.roblox.com/t/failed-to-load-soundid-error-spam-extreme-log-file-sizes/2225682]`. So the rule is one test in the pool's acquire function — no `Play()` on a `Sound` whose `SoundId` is the sentinel — and a build with every id unprovisioned boots, plays nothing, and warns nothing.

**Preload two rows and nothing else.** `ContentProvider:PreloadAsync` *"yields until all of the assets… have loaded"*, and the platform's own advice is *"only preload essential assets… You might get occasional pop-in, but it decreases load times"* `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/reference/engine/classes/ContentProvider.yaml]`. The essential set is exactly what can fire inside `firstSession.beats[firstReveal].bySecond` 10.0: the clear and the reveal. The call runs **after** the character is controllable, which is where `budgets.loadTargetDerivation` stops the load-to-first-input clock, so preloading contributes 0 s to the 6.0 s target and 7.0 s ceiling. **Audio is this build's first uploaded asset class** — `budgets.textureCeilings` is zero uploaded images and zero uploaded meshes — and at 10 MB of mono files loaded off the clock it stays the only one that costs nothing there.

**A cue whose asset has not loaded is silent for that onset and is never queued.** Silence is not a delay, so `N14` is not touched, and `response`'s channel list guarantees a non-audio channel carried the beat anyway (sheet `04`).

**`StreamingSounds` is budgeted by nothing today.** PlaceMemory reports **two** audio categories among 22 — `Sounds` (*"in-memory sounds"*) and `StreamingSounds` (*"streaming sounds"*) — and `memoryCeilingsByCategory` names only the first `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/studio/optimization/memory-usage.md]`. A long looping bed, which is exactly what `ambience` is most likely to hold, would land in the second and be charged against `headroomForUntracked` rather than against any ceiling. RR-M2 asks for an 8 MB row taken out of headroom, which keeps both of that key's stated invariants true. **What routes an asset to one category rather than the other is not stated on that page** `[research owed: a Roblox page or engine reference stating the criterion — length, `Looped`, or an engine heuristic — by which an audio asset is streamed rather than held in memory]`, so every row carries an `expectedMemoryCategory` marked unverified.

**The 2.0 MB unallocated is headroom, not a reservation.** The ceiling it sits under is `[playtest unknown]` at ±60%, so the honest range on 20 MB is 8–32. Any of the five owning keys may claim from it by a revision request against this sheet. `03-META.md` priority 2 and 3 may not, and `forbidden` `M14` makes that checkable.

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
      "perDomain": [
        { "key": "stingers", "fileMB": 1.5, "maxRows": 3, "maxAudibleSeconds": 3.0, "channels": "mono" },
        { "key": "sfx", "fileMB": 2.5, "maxRows": 6, "maxAudibleSeconds": 0.6, "channels": "mono", "note": "6 rows covers one clear plus the four per-tierIndex variants OPEN.md §2 asks for and one spare" },
        { "key": "uiSound", "fileMB": 1.0, "maxRows": 5, "maxAudibleSeconds": 0.5, "channels": "mono" },
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
        { "id": "cue.findReveal", "owner": "stingers", "bus": "Stingers", "volume": 1.00, "poolSize": 2, "maxAudibleSeconds": 2.5, "channels": "mono", "source": "creatorStore", "soundId": "", "preload": true, "expectedMemoryCategory": "Sounds", "expectedMemoryCategoryStatus": "[unverified]" },
        { "id": "cue.setComplete", "owner": "stingers", "bus": "Stingers", "volume": 0.88, "poolSize": 2, "maxAudibleSeconds": 3.0, "maxAudibleSource": "notices dwellSeconds for B2", "channels": "mono", "source": "creatorStore", "soundId": "", "preload": false, "expectedMemoryCategory": "Sounds", "expectedMemoryCategoryStatus": "[unverified]" },
        { "id": "cue.areaComplete", "owner": "stingers", "bus": "Stingers", "volume": 0.76, "poolSize": 2, "maxAudibleSeconds": 2.5, "maxAudibleSource": "notices dwellSeconds for B3", "channels": "mono", "source": "creatorStore", "soundId": "", "preload": false, "expectedMemoryCategory": "Sounds", "expectedMemoryCategoryStatus": "[unverified]" },
        { "id": "cue.upgradePurchased", "owner": "uiSound", "bus": "Interface", "volume": 0.72, "poolSize": 2, "maxAudibleSeconds": 0.5, "channels": "mono", "source": "creatorStore", "soundId": "", "preload": false, "expectedMemoryCategory": "Sounds", "expectedMemoryCategoryStatus": "[unverified]" },
        { "id": "cue.patchClear", "owner": "sfx", "bus": "World", "volume": 0.60, "poolSize": 6, "poolDerivation": "response.minSustainedOnsetsPerSecond 8 x 0.4 s audible = 3.2 concurrent from the player's own work; 6 gives 87% margin and covers the per-tierIndex variants sfx may add", "maxAudibleSeconds": 0.4, "maxAudibleSource": "response.beats[patchClear] residue", "channels": "mono", "source": "creatorStore", "soundId": "", "preload": true, "expectedMemoryCategory": "Sounds", "expectedMemoryCategoryStatus": "[unverified]", "contingentOn": "G1" },
        { "id": "cue.patchClear.neighbour", "owner": "sfx", "bus": "WorldNeighbour", "volume": 0.60, "poolSize": 5, "sharesAssetWith": "cue.patchClear", "additionalFileMB": 0.0, "maxAudibleSeconds": 0.4, "channels": "mono", "source": "creatorStore", "soundId": "", "preload": true, "preloadNote": "satisfied by cue.patchClear's preload; the asset is the same", "expectedMemoryCategory": "Sounds", "expectedMemoryCategoryStatus": "[unverified]", "contingentOn": "G7 — sfx rules whether a neighbour's clear is a positional cue at all" }
      ],
      "rowsAreRoutingNotContent": "each row carries the bus, level, pool, length cap, source class and id form. What the cue is made of, its descriptor and its variation rule belong to the owning key and appear in none of these columns.",
      "rowsNotEnumeratedHere": "any further uiSound row (a press cue, index open and close, the one system notice) and any ambience layer. Their existence is their owning key's ruling; their budget is the perDomain allowance above and their form is these columns.",
      "preload": {
        "rowIds": ["cue.patchClear", "cue.findReveal"],
        "why": "firstSession.beats[firstReveal].bySecond is 10.0, so the clear and the reveal are the only two rows that can fire inside the first ten seconds. Everything else is loaded lazily and may pop in on its first firing.",
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
      "notANull": "tech/deploy/02 — bridge/emit-config.mjs maps null to nil and Luau drops the key, so an explicit null and a never-emitted key are the same bytes at runtime.",
      "guard": {
        "where": "the pool's acquire function, once, not at each play site",
        "rule": "no Play() is called on a Sound whose SoundId equals the sentinel",
        "why": "a non-empty unresolvable SoundId errors in the client output; the 2023 platform fix addressed the error SPAM, not the error"
      },
      "acceptanceShape": "a build with every audio id at the sentinel boots, plays nothing and warns nothing. This is the same shape release already uses for gamePassId, and it is why all six audio keys can ship before a single asset exists.",
      "perRowGateApplicability": "a creatorStore row passes through neither gate below: the asset already carries a live public id. Only an upload row does. This is why source is a required column and not a note.",
      "uploadCaps": "2,000 imports per 30 days if ID-verified, 100 otherwise; an import enters moderation and is visible only to the uploader until approved."
    },
    "revisionRequests": [
      {
        "id": "RR-M1",
        "against": "cid/tech/deploy/01-the-release-contract.md",
        "field": "release.provisioning.gates",
        "ask": "insert two ordered gates after gate 1 and before gate 6, applying only to rows whose mix.assets.rows[].source is \"upload\"",
        "gates": [
          { "after": 1, "gate": "upload every mix.assets row whose source is \"upload\" and record its asset id", "produces": "one asset id per upload row", "blocks": 6, "note": "an import enters moderation and is visible only to the uploader until approved" },
          { "after": "the gate above", "gate": "grant the published experience permission on every uploaded audio asset, via Creator Hub > Creations > Asset Details > Permissions", "produces": "one permission grant per upload row", "blocks": 6, "why": "uploaded audio is private and a restricted asset without permission cannot load in Studio or at runtime, and granting an experience permission requires the experience to exist — the same publish-first inversion gamePassId already has" }
        ],
        "doesNotApplyTo": "rows whose source is \"creatorStore\", which already carry a live public id and pass through neither gate. This is why the ask is two CONDITIONAL gates rather than two universal ones.",
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

- **Release-contract work (`release`).** RR-M1: two conditional gates after gate 1, keyed on a row's `source`. Missed, an upload-class row ships with a private asset id and the cue is silent in production while every gate reported success. `buildMustRunAtEveryGate` stays true and needs no change.
- **Device-budget work (`budgets`).** RR-M2: one new row, one reduced headroom figure, total unchanged at 420. It also closes that key's own `[research owed:]` for the PlaceMemory category tree.
- **Reward-hit work (`stingers`).** 1.5 MB, 3 rows, mono, ≤ 3.0 s each. Your ids go in `mix.assets.rows`, at `""`, and the sentinel question you deferred is now answered.
- **In-world-sound work (`sfx`).** 2.5 MB, up to 6 rows, mono, ≤ 0.6 s each — enough for one clear plus four per-`tierIndex` variants and a spare. Your `poolSize` is 6 for the clear and 5 for the neighbour, and the neighbour row costs **zero extra bytes** because it shares the asset. Your `""` placeholder is adopted.
- **Interface-sound work (`uiSound`).** 1.0 MB, up to 5 rows, mono, ≤ 0.5 s each — `B4` plus four you have not ruled on. Your reading that an unloadable id errors rather than failing silently is why the guard sits at the pool.
- **Continuous-layer work (`ambience`).** 3.0 MB, up to 2 rows, mono, looped, ≤ 60 s each — the largest per-domain allowance, because a bed is the only continuously resident asset. Your `A5` finding is filed as RR-M2. Your loop-length arithmetic is bounded by 3.0 MB of file, not by the 20 MB upload ceiling.
- **Music work (`music`).** 0.0 MB and 0 rows, matching `trackCount: 0`. The `reversalPath` you carry would claim from `unallocatedMB` 2.0 and would need a revision request against this sheet, not a redivision.
- **Instance-representation work (`architect/06`).** `poolSize` is instances: 2 + 2 + 2 + 2 + 6 + 5 = 19 `Sound` objects at the merged ledger, created once by the boot module, reused, never destroyed per onset.

## Acceptance criteria

1. `mix.assets.perDomain[].fileMB` plus `unallocatedMB` sums to `totalFileAllowanceMB` 10.0, and `totalFileAllowanceMB × assumedExpansionFactor` equals `ceiling.placeMemorySoundsMB` 20.
2. Every row in `mix.assets.rows` has `soundId == ""`, and a client booted with all of them at that value performs zero `Play()` calls, prints zero warnings and prints zero errors.
3. `grep -rn "rbxassetid" game/src` returns nothing (true today), and every row whose `source` is `"upload"` carries a non-empty `whyNotCreatorStore`.
4. `mix.revisionRequests` has exactly 2 rows, one naming `release.provisioning.gates` and one naming `budgets.memoryCeilingsByCategory`, and RR-M2's nine addends sum to 420.

## Not decided here

What any asset actually is — its descriptor, its material, its pitch, its variation rule — the owning key in every case; these rows carry routing and never content. Whether `patchClear` has an `audio` channel (**G1**) or a neighbour's clear is positional (**G7**) — in-world-sound work; both rows are marked contingent and the ledger sums without them. Whether a press cue, an index cue or a system-notice cue exists at all — interface-sound work, inside its 5-row and 1.0 MB allowance. How many `ambience` layers exist — continuous-layer work, inside 2 rows and 3.0 MB. Whether `budgets.memoryCeilingsByCategory.Sounds` stays at 20 MB — device-budget work; the split is stated as shares as well as figures so it re-derives if it moves. What routes an asset to `StreamingSounds` — unowned and `[research owed:]`. Whether the sentinel guard belongs in `bridge/schema.mjs` as a shape constraint — contract-and-seam work.
