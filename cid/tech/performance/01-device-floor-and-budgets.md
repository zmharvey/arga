# 01 — The device floor, and every ceiling derived from it

**Domain:** tech/performance · **Category:** Tech & Data · **Wave:** 5

## Decision

**The floor device is a 3 GB-RAM phone at the Roblox platform minimum OS — an iPhone SE (2nd
generation, 2020) on iOS, an Android 8.0+ / OpenGL ES 3.0 / 3 GB device on Android, 60 Hz
display** `[cid: decided]`. Every ceiling in `budgets` derives from that one field, computed
against the **merged** `depths.areas[].patchCount` maximum of 640 at `runtime.maxPlayers` **16**,
with wave 4's counts read **by field** from `solvency`.
**`StreamingEnabled` is true**, min radius **160**, target radius **512**,
`StreamingIntegrityMode` **`PauseOutsideLoadedArea`**, `ModelStreamingMode` **`Default`**.

## Why

**The floor is mine to name because the brief does not name one, and the merged contract's one
citation of a floor cites a different brief.** My `must_verify` reads *"set budgets against the
device floor named in the brief"*; no such line exists in any of the eight sheets
`[research: concept/spec/incremental-spinoff-v2/]`. `cid/gameplay/meta/01-the-area.md:39` says
*"against the brief's 3 GB device floor"* — that sentence lives in
`concept/spec/syndicate-auction-test/04-PRESENTATION.md:113` and
`concept/spec/sky-freight-test/04-PRESENTATION.md:110-111`, tagged `[simulated: R5 Q5]`, an
answer nobody gave, invented for a test and then cited as binding. **RR-P1 strikes it.** My own
floor lands near 3 GB and **that coincidence may not retire RR-P1**: a right number reached by
a fabricated route is still a defect, and the route is what a later reader follows.

**Why one tier above the platform minimum.** Roblox refuses to publish a device ceiling. Its
guidance is to *"choose at least one 'baseline' device, test your game on it throughout the
development process, and pay close attention to frame rate and memory usage"*, and its only
numeric anchor is illustrative — *"you need to stay below 1,000 draw calls and 1,000,000
triangles for the game to run well on your baseline device"*
`[research: https://github.com/Roblox/creator-docs/blob/main/content/en-us/performance-optimization/design.md]`.
The floor is a project choice; the platform minimum is only its lower bound. The audience is
*"8–14, mobile-heavy"* `[brief: binding]` (`00-CORE.md`), a hand-me-down population, so the
floor sits one tier up. **The cost:** budgeting at the 2 GB platform minimum cuts
`clientStreamedInstanceCeiling` and `clientPlaceMemoryMB` by roughly a third and excludes
nothing else.

**The platform minimum is itself `[unverified]`.** `en.help.roblox.com`'s requirements article
403'd twice and the Fandom mirror 402'd; snapshots give iOS 14 / iPhone 6s and Android 8.0 /
GLES 3.0, a dated secondary gives iOS 11 / Android 5.0 / 2 GB, and the two disagree on **both**
OS versions. The floor does not depend on the answer — both candidates sit below it — but the
sentence "the platform minimum is one tier below this floor" does.
`[research owed: en.help.roblox.com/hc/en-us/articles/203625474 from a client the Zendesk edge does not reject]`

**No published per-device instance, part, triangle or texture ceiling exists, and I established
that rather than assuming it** — the quoted instruction *is* the platform's answer. So every
ceiling here is `[playtest unknown]` with a starting value, a test range and an instrument
(Developer Console → Server Jobs, → Memory, → render stats, on the floor device). **A budget
written as sourced fact would be a claim no page supports.** The memory-category names are the
form a reading can be checked against, but their page is absent from the research pack.
`[research owed: create.roblox.com/docs/studio/optimization/memory-usage — the PlaceMemory category tree]`

**Which patch count, and at which field.** 140 is `area.patchCount`, area 1 only, the smallest
thing in the game and not a ceiling. 640 is `depths.areas[7..8]`, merged, the largest. Wave 4's
post-terminal bay has moved three times — 47 chunks, then 44, then 42 after round 3 cut the
Vault set factor 1.20 → 1.15 — so I read it by field rather than restate it. **The field is
`solvency.postTerminalBay.patchCount`, and I checked it resolves rather than picking the
spelling I had written**: `cid/gameplay/balance/03-ladder-solvency.md:124-129` carries
`postTerminalBay` inside the `solvency` manifest with `patchCount` 1,680, its own
`clearingLoopCost.formula` reads `postTerminalBay.patchCount`, the released gate at
`cid/gameplay/_verified-wave4.md:354` names the same path, and `analytics/economy/01:39`
already consumes it. **My earlier `depths.postTerminalArea.patchCount` does not resolve** —
`postTerminalArea` is a field of `endgame` (`meta/07`), not of `depths` — and neither does
Persistence's `depths.postTerminalBay.patchCount`. Area 8 is
`solvency.areaLedger[7].patchCount` for the same reason. Both are computed at 16, never the 20
wave 4 costed against, and **at the released counts three ceilings break at once**; the fix is
`depths.areas[].patchCount`, because sheet `03` forbids every optimisation that would close a
2.2× instance gap.

**The lane's instance shape is already fixed and I only count it.** `representation` makes a
lane one slab Part resized inward per bay, four boundary parts, one spawn `Attachment`, and one
anchored non-colliding Part per patch — `WedgePart` for Heartvine
`[research: architect/sheets/06-representation.md]`. A lane is `patchCount + 6` instances and
`patchCount + 5` parts, and nothing below the live bay holds a patch (`plots.liveGeometry`).
Merged: **646 per lane, 10,336 at 16 players.** At the released bay: **1,686 and 26,976.**

**Streaming is the one lever left and it is unowned today.** `StreamingEnabled` appears in
neither contract and nowhere in `game/src`; instance streaming *"improves join times, reduces
memory footprint, and increases frame rate"*
`[research: https://github.com/Roblox/creator-docs/blob/main/content/en-us/performance-optimization/design.md]`,
which is three of my four ceilings. Defaults are 64 / 1024
`[research: https://create.roblox.com/docs/workspace/streaming]`. **1024 is too wide**: at
`plots.pitchStuds` 122 it reaches every lane of a 1,952-stud row, so a client loads sixteen
live bays. **512 reaches four lanes either side** (488 studs) — nine lanes, 5,814 instances
worst case — and still spans a whole merged bay longitudinally (480 studs). **160 is the min
radius** because `social.maxCoPresenceSeparationStuds` is 128 and a neighbour at 122 must
render for `social/02`'s B2/B3; 160 gives 25% margin and is 3.1× the worst effective clear
radius (51.66 studs), so `prediction`'s shadow test always has its Instance loaded.
`PauseOutsideLoadedArea` because a game with no failure state has no `traversal` rule that
catches a fall. `ModelStreamingMode` `Default` because world geometry contains **no `Model`** —
the only Models are characters and the held tool.

**The number behind `social.maxPlayers.aboveMaxBreaks`, which today asserts a breach with no
budget behind it.** `serverWorldInstanceCeiling` is 12,000: 16 × 646 = 10,336 (86%), 20 × 646 =
12,920 (108%). **The assertion is true against that ceiling and it is not a cliff** — each
player adds exactly `patchCount + 6`. `runtime.maxPlayers` 16 is ratified against it, not
re-decided. **Its test range is the open interval (10,336, 12,920), not an arbitrary band**:
at or below 10,336 the merged design fails its own ceiling, and at or above 12,920 the second
half of acceptance criterion 2 inverts and 20 players becomes legal.
`clientStreamedInstanceCeiling` carries the same defect and the same fix: its floor is the
5,814-instance worst case, not a round number below it.

**One saving at zero design cost.** `Plots.luau` sets `CanCollide` and `CastShadow` false on a
patch and sets neither `CanTouch` nor `CanQuery`. Nothing raycasts, region-queries or
`Touched`-handles a patch — clearing is a distance test over a Luau table — so both may be
false.
`[research owed: create.roblox.com/docs/performance-optimization/improve, for the CanTouch/CanQuery guidance my lead banked and the pack does not carry]`

```manifest
{
  "provides": "budgets",
  "status": "proposed",
  "value": {
    "deviceFloor": {
      "provenance": "[cid: decided] — the brief names no device floor; see revisionRequests[0]",
      "ios": { "device": "iPhone SE (2nd generation, 2020)", "ramGB": 3 },
      "android": { "minOS": "8.0", "graphicsApi": "OpenGL ES 3.0", "ramGB": 3, "exampleDevice": "Samsung Galaxy A12 class" },
      "displayHz": 60,
      "rule": "every ceiling in this key is stated at this device. Moving this field moves every derived ceiling; no ceiling may be edited without it.",
      "platformMinimumIsBelowThis": "[unverified] — help.roblox.com returned 403 twice, the Fandom mirror 402, and the two surviving sources disagree on both OS versions (iOS 14 / Android 8.0 vs iOS 11 / Android 5.0 / 2 GB). Both candidates sit below this floor.",
      "costOfBudgetingAtThePlatformMinimumInstead": "clientStreamedInstanceCeiling and clientPlaceMemoryMB fall by roughly one third; nothing else changes.",
      "whyNoSourcedCeilingExists": "Roblox publishes no per-device instance, part, triangle or texture ceiling. It instructs developers to choose a baseline device and measure, and offers <1000 draw calls / <1000000 triangles as an illustration only."
    },
    "tiers": [
      { "id": "mobileFloor",    "shareOfAudience": 0.70, "shareProvenance": "[brief: soft] — uncorroborated per cid/_state.md", "targetFps": 30, "floorFps": 24, "maxFractionOfSessionBelowFloor": 0.01, "clientPlaceMemoryMB": 420, "loadToFirstInputSeconds": { "target": 6.0, "ceiling": 7.0 } },
      { "id": "desktopTypical", "shareOfAudience": 0.25, "shareProvenance": "[brief: soft]", "targetFps": 60, "floorFps": 45, "maxFractionOfSessionBelowFloor": 0.01, "clientPlaceMemoryMB": 900, "loadToFirstInputSeconds": { "target": 3.0, "ceiling": 4.0 } },
      { "id": "console",        "shareOfAudience": 0.05, "shareProvenance": "[brief: soft]", "targetFps": 60, "floorFps": 45, "maxFractionOfSessionBelowFloor": 0.01, "clientPlaceMemoryMB": 900, "loadToFirstInputSeconds": { "target": 3.0, "ceiling": 4.0 }, "note": "inherits the desktop budget; no console-specific ceiling is set." }
    ],
    "everyTierFigureIs": "[playtest unknown]. Test ranges: mobileFloor targetFps 24-40, floorFps 20-30, clientPlaceMemoryMB 250-700; desktop clientPlaceMemoryMB 600-1400; loadToFirstInput target 3.0-6.0 with the ceiling fixed at 7.0 by loadTargetDerivation. Instrument: Developer Console on the floor device.",
    "loadTargetDerivation": "firstSession.beats[firstReveal].bySecond is 10.0 JOIN-relative, and onboarding/02 puts the reveal within 3 s of FIRST INPUT. So load-to-first-input must finish by 7.0 s or the 10 s promise cannot be kept by any layout. The ceiling is derived, not chosen, and is not inside any test range. Clock origin: PlayerAdded to a controllable character. NOT app launch, which is the platform's and nobody's here.",
    "server": {
      "heartbeatStepsPerSecondCap": 60,
      "heartbeatFloor": 55,
      "floorProvenance": "[playtest unknown], test range 50-60. Instrument: Developer Console > Server Jobs > Heartbeat steps/sec.",
      "whyItMatters": "serverCost's quantisation rule assumes 60 Hz. Below it every realised tick period stretches and every figure in serverCost moves.",
      "serverPlaceMemoryMB": 1200,
      "serverWorldInstanceCeiling": 12000
    },
    "patchCountBasis": {
      "computedAgainst": "max(depths.areas[].patchCount) from the MERGED manifest",
      "mergedMax": 640,
      "mergedMaxOrdinals": [7, 8],
      "areaOnePatchCount": 140,
      "areaOneIsNotACeiling": "art/objects/01's 140 is area 1's patchCount and is the smallest area in the game.",
      "playersMultipliedBy": 16,
      "playersSource": "runtime.maxPlayers. NOT the 20 wave 4 costed against.",
      "waveFourCounts": {
        "readByField": ["solvency.postTerminalBay.patchCount", "solvency.areaLedger[7].patchCount"],
        "doNotCopyEitherNumberIntoAnotherKey": true,
        "pathVerifiedAt": "cid/gameplay/balance/03-ladder-solvency.md:124-129 carries postTerminalBay inside the solvency manifest with patchCount 1680; its own clearingLoopCost.formula reads postTerminalBay.patchCount; the released gate at cid/gameplay/_verified-wave4.md:354 names solvency.postTerminalBay.patchCount; analytics/economy/01:39 already consumes it.",
        "spellingsThatDoNotResolve": {
          "depths.postTerminalArea.patchCount": "this sheet's earlier spelling. postTerminalArea is a field of ENDGAME (gameplay/meta/07), not of depths.",
          "depths.postTerminalBay.patchCount": "tech/persistence/01's spelling. Neither the container nor the field exists on depths."
        },
        "whyByField": "the bay has moved three times — 47 chunks, then 44, then 42 after wave 4 round 3 cut the Vault set factor 1.20 to 1.15. Every figure below is evaluated at the released revision and is re-derivable from breachFormula rather than restated.",
        "postTerminalBayPatchCountAtThisRevision": 1680,
        "breachesAtThisRevision": [
          "serverWorldInstanceCeiling: 16 x (1680 + 6) = 26976 against 12000 — 225%",
          "clientStreamedInstanceCeiling: 9 lanes x 1686 = 15174 against 6000 — 253%",
          "triangles at the 100/patch budget: 15174 x 100 = 1517400 against 1000000 — 152%"
        ],
        "breachFormula": "serverInstances = 16 * (solvency.postTerminalBay.patchCount + 6); clientStreamed = 9 * (patchCount + 6); triangles = clientStreamed * renderCeilings.trianglesPerPatchBudget",
        "whoFixesIt": "depths.areas[].patchCount, not this domain. Sheet 03 forbids every optimisation that would close a 2.2x instance gap.",
        "crossWaveFinding": "wave 4 released at PASS with a bay that breaches this ceiling by 2.25x. Wave 4 could not see the ceiling because it did not exist yet, and wave 5 cannot move the patch count. Recorded for the final cross-category pass; 47 to 44 to 42 chunks has moved the breach only from 251% to 225%, so chunk trimming is not converging."
      }
    },
    "instanceCeilings": {
      "laneInstanceFormula": "patchCount + 6 — one slab Part (resized inward per bay), four boundary parts, one spawn Attachment, one Part per patch. Source: architect/06-representation.",
      "lanePartFormula": "patchCount + 5",
      "perLaneAtMergedMax": 646,
      "serverWorldInstanceCeiling": 12000,
      "serverWorldInstancesAtMergedMax": 10336,
      "serverWorldInstancesAt20Players": 12920,
      "excludesFromTheServerCeiling": "player characters and held tools — roughly 90 instances per R15 character plus 4 per tool. Neither is lane geometry and neither is budgeted here.",
      "clientStreamedInstanceCeiling": 6000,
      "clientStreamedInstancesWorstCase": 5814,
      "worstCaseDerivation": "9 lanes inside a 512-stud target radius at plots.pitchStuds 122, every one at the deepest merged bay, x 646.",
      "marginalCostPerPlayer": "patchCount + 6 server instances, and up to patchCount added to a neighbour's streaming sphere. This is the honest restatement of social.maxPlayers.aboveMaxBreaks.",
      "status": "[playtest unknown]. Instrument: Developer Console > Memory > PlaceMemory.Instances, floor device.",
      "serverWorldInstanceCeilingTestRange": [10500, 12800],
      "serverWorldInstanceCeilingRangeIsBounded": "the legal interval is OPEN (10336, 12920), fixed by acceptance criterion 2 and not by taste. At or below 10336 the merged design fails its own ceiling; at or above 12920 the criterion's second half inverts and 20 players becomes legal, contradicting social.maxPlayers.aboveMaxBreaks and runtime.maxPlayers 16. A test range wider than this interval is a defect in the range, not latitude.",
      "clientStreamedInstanceCeilingTestRange": [5900, 10000],
      "clientStreamedInstanceCeilingRangeIsBounded": "the floor is clientStreamedInstancesWorstCase 5814. Any value below it fails the merged design at nine loaded lanes."
    },
    "renderCeilings": {
      "drawCalls": 1000,
      "triangles": 1000000,
      "provenance": "[research: https://github.com/Roblox/creator-docs/blob/main/content/en-us/performance-optimization/design.md] — stated there as an illustration for a baseline device, not as a platform limit.",
      "trianglesPerPatchBudget": 100,
      "trianglesPerPatchRule": "the four tier shapes (Block 1.6, Cylinder 2.4, Ball 2.8, Wedge 3.4) must together render in at most 400 triangles, read one of each in an empty place. If Ball exceeds its share the fix is a SHAPE SWAP in representation.patch.geometryByShape or tiers[].shape — never an LOD, which sheet 03 N1 forbids.",
      "batchingFactor": {
        "value": 50,
        "status": "[playtest unknown]",
        "testRange": [1, 500],
        "why": "whether primitive Parts sharing shape, size and material batch into shared draw calls is the single largest uncertainty in this key. Roblox documents draw-call instancing for MESHES sharing content and texture and says nothing about primitives.",
        "escalationIfBelow10": "at 1:1 the merged design renders 5814 draw calls against a 1000 ceiling, and NO legal streaming radius fixes it, because one lane's deepest bay is already 645 parts. The lever is then depths.areas[].patchCount and it is a finding against depths, not an optimisation request.",
        "instrument": "Developer Console render stats on the floor device, one lane loaded then nine."
      }
    },
    "textureCeilings": {
      "uploadedImageAssetsInWorldGeometry": 0,
      "uploadedMeshAssetsInWorldGeometry": 0,
      "why": "representation assembles every subject from primitives with no asset ids. Materials are built-in enums: Grass (patch), Slate (slab), SmoothPlastic (boundary).",
      "graphicsTextureMB": 60,
      "graphicsMeshPartsMB": 0,
      "uiImageAssetAllowance": "UI icons are UI/UX's, are not counted against graphicsTextureMB, and are the only image assets in the build.",
      "status": "[playtest unknown], graphicsTextureMB test range 20-120."
    },
    "memoryCeilingsByCategory": {
      "unit": "MB, floor device, PlaceMemory subtree",
      "Instances": 120,
      "PhysicsParts": 25,
      "PhysicsCollision": 5,
      "GraphicsTexture": 60,
      "GraphicsMeshParts": 0,
      "Sounds": 20,
      "Gui": 25,
      "headroomForUntracked": 165,
      "total": 420,
      "status": "[playtest unknown]. Every row test range +/- 60%, subject to the two invariants that the seven rows plus headroomForUntracked sum to total, and total equals tiers[mobileFloor].clientPlaceMemoryMB. Instrument: Developer Console > Memory, floor device.",
      "sourceNote": "[research owed:] the category tree is named from my lead's fetch record; its reference page is absent from cid/_research/pack.md."
    },
    "streaming": {
      "StreamingEnabled": true,
      "StreamingMinRadius": 160,
      "StreamingTargetRadius": 512,
      "StreamingIntegrityMode": "PauseOutsideLoadedArea",
      "ModelStreamingMode": "Default",
      "defaultsWere": { "StreamingMinRadius": 64, "StreamingTargetRadius": 1024, "source": "[research: https://create.roblox.com/docs/workspace/streaming]" },
      "minRadiusFloor": "social.maxCoPresenceSeparationStuds (128) is a HARD floor, not a range bottom. 160 gives 25% of margin and is 3.1x the worst effective clear radius (51.66 studs at full spend), so prediction's client-side shadow test always has its patch Instance loaded.",
      "targetRadiusReasoning": "1024 reaches all 16 lanes of a 1952-stud row at plots.pitchStuds 122, so a client loads sixteen live bays. 512 reaches four lanes either side (488 studs) and still spans a whole merged bay longitudinally (480 studs).",
      "modelStreamingModeReasoning": "world geometry contains no Model. A lane is a slab Part with its patches, boundary and spawn Attachment parented to it. The only Models are characters and the held tool.",
      "setBy": "place configuration — Workspace streaming properties, set in Studio before publish. See revisionRequests[1].",
      "status": "both radii are [playtest unknown]. StreamingMinRadius test range 128-320, floor fixed by minRadiusFloor. StreamingTargetRadius test range 488-704: below 488 a neighbouring lane at four slots' separation stops loading, and above 704 nine lanes becomes eleven and clientStreamedInstancesWorstCase exceeds its ceiling."
    },
    "crashTolerance": {
      "outOfMemoryTerminationsPerTwentyMinuteSession": 0,
      "measuredOver": "5 consecutive 20-minute sessions on the floor device",
      "status": "[playtest unknown], test range: 0 accepted, any 1 investigated before publish.",
      "briefGap": "the brief states no availability, uptime or crash tolerance anywhere. 00-CORE.md's 'success is shipped artifacts, not players' is the nearest thing and sizes this as a publish gate rather than an SLO.",
      "sessionLengthAssumed": "10-20 minute active sessions, 00-CORE.md [brief: binding]."
    },
    "zeroCostPropertySaving": {
      "subject": "patch",
      "setToFalse": ["CanTouch", "CanQuery"],
      "alreadyFalse": ["CanCollide", "CastShadow"],
      "safeBecause": "nothing raycasts, region-queries or Touched-handles a patch. Clearing is a squared XZ distance test over a Luau table (Clearing.luau:392) and architect forbids a Touched handler on a patch.",
      "ownedBy": "representation work (architect/06); stated here as a consequence, not applied here."
    },
    "readFromOtherKeysNeverCopied": {
      "snapshotOutboundBandwidth": "replication's 16-player outbound field. Networking owns it; this key states no byte total of its own.",
      "postTerminalBayPatchCount": "solvency.postTerminalBay.patchCount",
      "areaEightPatchCount": "solvency.areaLedger[7].patchCount",
      "mergedAreaPatchCounts": "depths.areas[].patchCount",
      "coPresenceSeparation": "social.maxCoPresenceSeparationStuds",
      "lanePitchAndWidth": "plots.pitchStuds, plots.laneWidthStuds",
      "revealDeadline": "firstSession.beats[firstReveal].bySecond"
    },
    "revisionRequests": [
      {
        "id": "RR-P1",
        "against": "cid/gameplay/meta/01-the-area.md",
        "line": 39,
        "strike": "against the brief's 3 GB device floor",
        "replaceWith": "against budgets.deviceFloor",
        "reason": "the phrase cites a device floor that exists in concept/spec/syndicate-auction-test/04-PRESENTATION.md:113 and concept/spec/sky-freight-test/04-PRESENTATION.md:110-111, both tagged [simulated: R5 Q5] — an answer nobody gave, in a different, simulated brief. incremental-spinoff-v2 contains no such line in any of its eight sheets.",
        "mayNotBeRetiredBy": "the fact that budgets.deviceFloor also lands at 3 GB. The defect is the route, not the number: a later reader following the citation reaches a test brief.",
        "movesNoValue": "area.patchCount, area.size and area.minSpacing are untouched. This is a citation fix."
      },
      {
        "id": "RR-P2",
        "against": "architect/sheets/01-runtime.md",
        "field": "runtime.placeConfiguration",
        "add": {
          "workspaceStreaming": {
            "StreamingEnabled": true,
            "StreamingMinRadius": 160,
            "StreamingTargetRadius": 512,
            "StreamingIntegrityMode": "PauseOutsideLoadedArea",
            "ModelStreamingMode": "Default",
            "setVia": "place configuration — Workspace streaming properties, set in Studio before publish",
            "ownedBy": "publish-checklist work (Tech & Data — Build & Deploy), as the third entry in placeConfiguration",
            "assertedBy": "world.configure(), which READS Workspace.StreamingEnabled and the two radii at boot and warns naming budgets.streaming when any of the five disagrees — the pattern maxPlayers already uses"
          }
        },
        "alsoAmend": "nothingElseIsPlaceConfiguration, which says the block has exactly two entries. It already admits two unlisted items (TextChatService.ChatVersion, voice chat); this makes three listed and names an owner for one of them.",
        "reason": "StreamingEnabled appears in neither contract, in no CID sheet, and nowhere in game/src. It is a Workspace property, which makes it place configuration, and place configuration is enumerated in exactly one place."
      }
    ]
  }
}
```

## Pushing back

**`architect/01-runtime`, `runtime.placeConfiguration.nothingElseIsPlaceConfiguration`** — it
states the block has exactly two entries and I am adding a third (RR-P2). The ruling I
contradict is the closure, not the entries; the field already records two further unlisted
items with no owner, and streaming arrives with a publish-time owner and a `world.configure()`
assertion, which is the shape `maxPlayers` already uses.

## Consequences for other work

- **Publish-checklist work (Build & Deploy)** gains a third `placeConfiguration` entry with five
  properties and a boot assertion. Missed, the place ships at 64/1024 and a client loads all
  sixteen lanes.
- **Persistence work (`persistence`)** should spell its bound `solvency.postTerminalBay.patchCount`.
  Its `depths.postTerminalBay.patchCount` and my earlier `depths.postTerminalArea.patchCount`
  both fail to resolve; the released `solvency` manifest and the wave-4 gate agree on one path,
  and `analytics/economy/01` already uses it.
- **Area-authoring-by-depth work (`depths`)** inherits a hard ceiling: 640 patches per live bay
  at 16 players is 86% of `serverWorldInstanceCeiling`. **The post-terminal bay is 225% of it**,
  and the lever is `patchCount` — no optimisation sheet `03` permits will close it.
- **Overgrowth-tier and representation work (`tiers`, `representation`)** inherit a 400-triangle
  budget across four shapes. If `Ball` (Bramble, 14% of patches) overruns, the fix is a shape
  swap, never an LOD. `representation` should also set `CanTouch` and `CanQuery` false.
- **Server-and-co-presence work (`social/01`)** gets the number `aboveMaxBreaks` lacked: 12,000,
  against 10,336 at 16 and 12,920 at 20. **It is true against that ceiling and is not a cliff**
  — restate it as the marginal cost, `patchCount + 6` per player.
- **Presence-sufficiency work (`social/02`) and clear-prediction work (`prediction`)** get a
  machine floor: `StreamingMinRadius` never below `maxCoPresenceSeparationStuds`, so a
  neighbour's character and a nearby patch Instance are always loaded.
- **Onboarding-instrument work (`firstSession`)** inherits the clock origin: `PlayerAdded` to a
  controllable character, with a 6.0 s target so the 10 s join-relative reveal survives a 3 s
  input-relative budget.
- **Environment and object art** get a closed asset budget: zero uploaded images, zero meshes,
  three built-in materials. **Networking (`replication`)** keeps sole ownership of snapshot
  bandwidth; this key states no byte total.

## Acceptance criteria

1. `budgets.deviceFloor` appears exactly once in the merged manifest and no other ceiling field
   in `budgets` names a second device.
2. `16 × (max(depths.areas[].patchCount) + 6) ≤ budgets.instanceCeilings.serverWorldInstanceCeiling`
   evaluates true at merged values (10,336 ≤ 12,000) and false at 20 players (12,920 > 12,000).
3. Every value in `serverWorldInstanceCeilingTestRange` satisfies criterion 2, and every value
   in `clientStreamedInstanceCeilingTestRange` is at least `clientStreamedInstancesWorstCase`:
   `10,500 > 10,336`, `12,800 < 12,920`, `5,900 ≥ 5,814`.
4. Every path in `budgets.readFromOtherKeysNeverCopied` and in
   `patchCountBasis.waveFourCounts.readByField` resolves against the merged manifest, and no
   sheet in this domain contains the strings `depths.postTerminalArea` or
   `depths.postTerminalBay`.

## Flagged to the developer

**The device floor is `[cid: decided]` against a silent brief and it moves every number here.**
(a) The 2 GB platform minimum — widest coverage, costs about a third of the client instance and
memory budget. (b) **3 GB, my recommendation** — one tier up, matched to a hand-me-down 8–14
audience. (c) A 4 GB 2022-class phone — buys the whole budget back and quietly excludes the
oldest devices that audience actually holds. `budgets.deviceFloor` is the only field that
changes.

## Not decided here

The tick's value, the proximity scan's cost model, the per-frame instance burst and the
bucketing requirement — sheet `02`, which holds `serverCost`. Which savings this domain may
never take — sheet `03`, which supplies no key. The art inside these ceilings — Art & Visuals.
Every patch count, footprint and area size — `depths` and `solvency`, read by field. Snapshot
bytes and outbound bandwidth — Networking's `replication`, which owns the figure outright. The
save payload — Persistence. **Whether a device is ever measured, and by whom: no sheet in either
contract owns taking a MicroProfiler, Server Jobs or Memory reading**, and every
`[playtest unknown]` here depends on one. Named for the final cross-category pass, beside
Security's logging pipe and the 2.25× cross-wave instance breach. Whether anchored parts stay
precise beyond ~20,000 studs from the origin — inherited unresolved from `meta/06`'s
`[research owed:]`, and it bounds `endgame`'s endless run.
