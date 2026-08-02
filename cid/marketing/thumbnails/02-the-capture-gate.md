# 02 — The capture gate

**Domain:** marketing/thumbnails · **Category:** Discovery & Marketing · **Wave:** 7

## Decision

**A promotional image of this game is legitimate only if it is a frame of a running session of the
shipped place, built from the released commit, with zero hand-authored Instances in that session,
and only once all ten gate rows pass.** Nine of the ten fail today, so `allRowsPass` is `false` and
no thumbnail may be captured or uploaded yet.

## Why

**The strongest ground for this gate is not this project's house rule, and that is worth stating
first.** The platform's own thumbnail guidance says *"Graphics shown must be representative of the
actual in-game visuals. Avoid artificially enhancing graphics beyond what a player will
experience"*
`[research: https://create.roblox.com/docs/production/publishing/thumbnails]`, and its
personalisation guidance repeats *"accurate representation remains crucial"*
`[research: https://devforum.roblox.com/t/5-tips-from-roblox-staff-to-get-the-most-out-of-thumbnail-personalization/3471689]`.
**So `T8` is a platform rule before it is ours**, all uploads are moderated against it, and a sheet
that treated the capture source as taste would be wrong twice.

**And the build that exists is not that game.** `game/src/shared/Theme.luau` reads
`archetype = "cartoon-vibrant"` (line 10), `sourceTitle = "Pet Ascend Simulator"` (line 12) and
`surface.base = "#2B1B4D"` (line 22), verified in this session, against a brief naming
`fantasy-ornate` three times and arguing against `cartoon-vibrant` by name
`[research: game/src/shared/Theme.luau]` `[brief: soft]`. Ten of the world subjects the fiction
requires are marked `[does not exist]` (`art/_category.md` rows 10–19), the ground a player stands
on is `Enum.Material.Slate` with no `Color` assigned (`RR-A1`), and the tool in the player's hand
renders at engine defaults because no key states its colour (`G7`, `Tool.luau:211`). **A
screenshot today would show a different game in candy colours holding an untinted stick.**

**One correction to my own index, made because I read the source.** The index's verification note
says `art/ui-art/01`'s `A3` is *"marked refusable"*. It is not: `A3` carries `"refusable": false`
and the quoted *"merges and changes nothing beyond the archetype key"* is its `ifRefused` text.
**`A4` is the refusable one** `[research: cid/art/ui-art/01-archetype-and-lock.md]`. The warning
still lands, on a different row, so I answer it as a rule rather than a hope:

- **If `A4` is refused**, `C4` is satisfied instead by a checked-in hand-authored context at
  `ui-forge/contexts/ruin-restoration.game-context.json` from which `Theme.luau` regenerates
  byte-identically. The gate does not need `A4`'s producer; it needs the emitted theme to be
  reproducible from an input under version control, and a committed file gives that.
- **If `A3` were refused**, no substitute exists. `uiTheme` would reach nothing beyond the
  archetype key, every token value in `art/ui-art/02`, `/03` and `/06` would stay advisory, and
  the look in frame would be stock `fantasy-ornate` rather than the approved one. `allRowsPass`
  then stays `false` permanently and **the finding is that this project cannot legitimately
  produce a thumbnail** — which the category lead pre-authorised as *"a real finding and better
  than a set produced from the wrong build."* `[cid: decided]`

**Is an image built in Studio from approved keys legitimate?** Only in one form. A **running**
session is legitimate, including Studio Play Solo, because it executes the shipped code and
produces the Instances the shipped code produces. **Edit mode is not**, because every Instance a
person places by hand is an enhancement beyond what a player experiences, and the platform rule
above closes it. Posing the camera, walking to a spot, waiting for a moment and opening a panel are
all things a player does; parenting a `Part` is not. The line is therefore
`manualInstanceEdits == 0` in the capture session, which is a fact a person can record and a
reviewer can dispute, rather than a judgement about how staged an image feels.

**Nobody owns the file, and that is `M6` arriving here rather than a hole I get to leave.**
`release.publishChecklist` is *"four rows a human executes because no build step can"* and names no
thumbnail; no emitter writes an image; `storeThumbnails` merges and reaches nothing. The image is
**not a build artifact**: it lives at `assets/marketing/`, outside the Rojo tree, so
`grep -rn "rbxassetid" game/src` keeps returning nothing and `art/ui-art/04`'s `icons.count: 0`
stays true (ruling `M-A`: that zero is the interface, not the experience page). The upload step is
filed below as one checklist row.

**Nine rows fail and one passes, and the one that passes is worth naming.** `C9`, the lighting
state, already ships: `ClockTime` 15.5, zero `Atmosphere`, zero `Clouds`, zero scripts touching
`Lighting` (`game/default.project.json:62-79`, ratified by `theme/setting/03`)
`[research: cid/art/_category.md]`. A gate where everything fails teaches nothing; a gate where one
row is already green shows the rows are real conditions and not a wall.

### The gate

| id | precondition | check | owner | status today |
|---|---|---|---|---|
| `C1` | the emitted theme is `fantasy-ornate` for this game | `bridge/test/theme-archetype.test.mjs` exits 0, and `grep -rn "cartoon-vibrant\|Pet Ascend Simulator" game/src` returns nothing | UI Art (`uiTheme`, `A2`) | **fail** — `Theme.luau:3,10,12,22` |
| `C2` | `A1` closed: every `type.*.font` in `Theme.luau` is an `Enum.Font` member | `grep -c MerriweatherBold game/src/shared/Theme.luau` returns 0, and the client boots without a `buildNode` raise | `art/ui-art/03` | **fail** — `serif-ui` resolves `MerriweatherBold`, which raises |
| `C3` | `A3` landed: `deriveGameContext` carries `artDirection.tokenOverrides` and `artDirection.tokens` | both fields present in `concept/src/derive/game-context.mjs`'s `artDirection` literal | contract-and-seam work | **fail** — not carried; `refusable: false` |
| `C4` | a version-controlled context produces `Theme.luau` | `A4` landed, **or** `ui-forge/contexts/ruin-restoration.game-context.json` is committed and `Theme.luau` regenerates byte-identically from it | contract-and-seam work | **fail** — `A4` is `refusable: true`; substitute stated in Why |
| `C5` | `RR-A1` applied: the ground is warm limestone | `game/src/server/Plots.luau` assigns `slab.Color` exactly once to `[216,201,169]` and `slab.Material` to `Enum.Material.Limestone` | representation work (`architect/06`) | **fail** — `Slate` at line 534, zero `slab.Color` |
| `C6` | the ten world subjects `art/_category.md` rows 10–19 exist | each of retaining wall, parapet, openings, paving/kerbs/steps/piers/vaulting, channel-and-basin, fixed fittings, litter, weathering, sky, canopy has instance count > 0 in the built place | Environment build work | **fail** — all ten `[does not exist]` |
| `C7` | `G7` closed: the held tool has a stated colour and material | `game/src/server/Tool.luau` assigns `Color` and `Material` on both parts from `objectArt` | Objects / build work | **fail** — unset at `Tool.luau:211` |
| `C8` | the index panel renders 24 slots at the emitted theme | the captured frame shows 24 slots, at least one holding a name and at least one empty, none carrying a padlock, silhouette, greyed name or question mark | screens / build work | **fail** — blocked by `C1` |
| `C9` | one daylight state, unmodified | `ClockTime` is 15.5, zero `Atmosphere`, zero `Clouds`, zero scripts write `Lighting` | Lighting (`lighting`) | **pass** — ships today |
| `C10` | no row of `storeThumbnails.forbidden` appears in the frame | a reviewer walks `X1`–`X18` against the frame and records a verdict per row | this domain, at capture time | **fail** — no frame exists |

```json
{
  "amends": "storeThumbnails",
  "path": "captureGate",
  "value": {
    "allRowsPass": false,
    "rowsTotal": 10,
    "rowsPassingToday": 1,
    "externalGround": "the platform's own rule, not only this project's: 'Graphics shown must be representative of the actual in-game visuals. Avoid artificially enhancing graphics beyond what a player will experience.' All uploads are moderated against it.",
    "rows": [
      { "id": "C1", "precondition": "the emitted theme is fantasy-ornate for this game", "check": "bridge/test/theme-archetype.test.mjs exits 0 and grep -rn 'cartoon-vibrant|Pet Ascend Simulator' game/src returns nothing", "checkKind": "test", "owner": "art/ui-art/01 (uiTheme, A2)", "status": "fail", "evidence": "game/src/shared/Theme.luau lines 3, 10, 12 and 22 read cartoon-vibrant, Pet Ascend Simulator and #2B1B4D", "refusable": false },
      { "id": "C2", "precondition": "A1 closed: every type.*.font in Theme.luau is an Enum.Font member", "check": "grep -c MerriweatherBold game/src/shared/Theme.luau returns 0 and the client boots without a buildNode raise", "checkKind": "grep+boot", "owner": "art/ui-art/03", "status": "fail", "evidence": "fantasy-ornate resolves fontStack serif-ui whose numeric.roblox is MerriweatherBold, which is not an Enum.Font member; indexing Enum.Font with an absent member raises", "refusable": false },
      { "id": "C3", "precondition": "A3 landed: deriveGameContext carries artDirection.tokenOverrides and artDirection.tokens", "check": "both fields present in the artDirection object literal of concept/src/derive/game-context.mjs", "checkKind": "grep", "owner": "contract-and-seam work", "status": "fail", "evidence": "the literal carries vibe, mood, paletteHints and referenceNote only", "refusable": false, "ifRefused": "no substitute exists. uiTheme reaches nothing beyond the archetype, every token value in art/ui-art/02, 03 and 06 stays advisory, allRowsPass stays false permanently, and the finding is that this project cannot legitimately produce a thumbnail." },
      { "id": "C4", "precondition": "a version-controlled context produces Theme.luau", "check": "A4 landed, or ui-forge/contexts/ruin-restoration.game-context.json is committed and Theme.luau regenerates byte-identically from it", "checkKind": "file+regenerate", "owner": "contract-and-seam work", "status": "fail", "refusable": true, "ifRefused": "satisfied by the committed hand-authored context. The gate needs the emitted theme to be reproducible from an input under version control, not a particular producer.", "substituteIsSufficient": true },
      { "id": "C5", "precondition": "RR-A1 applied: the ground a player stands on is warm limestone", "check": "game/src/server/Plots.luau assigns slab.Color exactly once to [216,201,169] and slab.Material to Enum.Material.Limestone", "checkKind": "grep", "owner": "representation work (architect/06)", "status": "fail", "evidence": "Enum.Material.Slate at Plots.luau:534 and zero slab.Color assignments; an unassigned Part renders at [163,162,165], luma 162.64, below theme/setting/01's 165 floor and cool where the fiction requires warm", "refusable": false },
      { "id": "C6", "precondition": "the ten world subjects at art/_category.md rows 10 to 19 exist", "check": "instance count > 0 in the built place for each of retaining wall, parapet, openings, paving with kerbs steps piers and vaulting, channel-and-basin network, fixed fittings, litter layer, weathering, open sky, broadleaf canopy", "checkKind": "count", "owner": "Environment build work", "status": "fail", "evidence": "all ten rows are marked [does not exist]; environment, builtEdge, groundwork, chunkDressing and backdrop were written in wave 6 and nothing has been built from them", "refusable": false },
      { "id": "C7", "precondition": "G7 closed: the held tool has a stated colour and material", "check": "game/src/server/Tool.luau assigns Color and Material on both parts from objectArt", "checkKind": "grep", "owner": "Objects and build work", "status": "fail", "evidence": "Tool.luau:211 leaves Colour, Material and Transparency unset because no key stated them; objectArt now does", "refusable": false },
      { "id": "C8", "precondition": "the index panel renders 24 slots at the emitted theme", "check": "the captured frame shows 24 slots, at least one holding a name and at least one empty, and none carrying a padlock, silhouette, blurred model, greyed name or question mark", "checkKind": "review", "owner": "screens and build work", "status": "fail", "blockedBy": "C1", "refusable": false },
      { "id": "C9", "precondition": "one daylight state, unmodified", "check": "ClockTime is 15.5, zero Atmosphere, zero Clouds, zero scripts write Lighting", "checkKind": "count", "owner": "art/lighting/01 (lighting)", "status": "pass", "evidence": "game/default.project.json lines 62 to 79, ratified by theme/setting/03 with zero changes", "refusable": false },
      { "id": "C10", "precondition": "no row of storeThumbnails.forbidden appears in the frame", "check": "a reviewer walks X1 through X18 against the frame and records a verdict per row", "checkKind": "review", "owner": "marketing/thumbnails at capture time", "status": "fail", "evidence": "no frame exists", "refusable": false }
    ],
    "legitimateSource": {
      "rule": "a frame of a running session of the shipped place, built from the released commit, with zero hand-authored Instances in that session",
      "studioPlaySoloPermitted": true,
      "studioPlaySoloReason": "it executes the shipped code and produces the Instances the shipped code produces, which is what representative means",
      "studioEditModePermitted": false,
      "studioEditModeReason": "an Instance placed by hand is an enhancement beyond what a player experiences, which the platform rule forbids",
      "permittedActsDuringCapture": ["moving the camera", "walking to a position", "waiting for a moment", "opening a screen the shipped input can open", "cropping to 16:9 from a wider native frame"],
      "forbiddenActsDuringCapture": ["parenting, deleting or editing any Instance", "changing any Lighting property", "changing graphics quality above the shipped default", "loading a plugin", "running a command-bar script"],
      "manualInstanceEditsPermitted": 0
    },
    "forbiddenSources": [
      { "id": "S1", "source": "the build as it ships today", "why": "T8 and G2 — cartoon-vibrant, Pet Ascend Simulator, #2B1B4D, and ten world subjects that do not exist" },
      { "id": "S2", "source": "a Studio edit-mode screenshot with hand-placed geometry", "why": "legitimateSource.studioEditModePermitted is false" },
      { "id": "S3", "source": "the ui-forge HTML preview, the screenshot gallery, or any browser render", "why": "a browser render is not the client and its type, spacing and colour resolution differ from Roblox's" },
      { "id": "S4", "source": "concept art, a mockup, an AI-generated image, stock imagery, or a render from any modelling or paint tool", "why": "none of it is in-game visuals; the platform rule is a representation rule" },
      { "id": "S5", "source": "footage or a screenshot of any other game, including the reference", "why": "it is a claim about a different product, and research/landscape.md already establishes this family ships near-identical marketing" },
      { "id": "S6", "source": "a place built from a branch other than the released commit", "why": "captureProvenance would record a commit the published place does not run" },
      { "id": "S7", "source": "a retouched, recoloured, upscaled or composited frame, or one with an element added after capture", "why": "'avoid artificially enhancing graphics beyond what a player will experience'; storeThumbnails.forbidden X16" },
      { "id": "S8", "source": "a frame showing a selection box, grid, gizmo, wireframe, Studio chrome, the developer console or an FPS counter", "why": "none of it is rendered for a player" },
      { "id": "S9", "source": "a frame captured with any Lighting, PostEffect, Atmosphere or quality setting not present in game/default.project.json", "why": "C9 ratifies one daylight state and theme/setting/03 R1 binds it in any promotional image" },
      { "id": "S10", "source": "a frame captured on a device or viewport that renders detail the deviceFloor cannot", "why": "same rule; budgets.deviceFloor is the device the design is sized against" }
    ],
    "provenance": {
      "recordedWith": "every capture, in a sidecar file beside the image",
      "sidecarPath": "assets/marketing/thumbnail-01.provenance.json",
      "fields": ["commit", "buildStamp", "placeVersion", "capturedIn", "clockTime", "graphicsQuality", "viewportPixels", "capturedAtIso", "manualInstanceEdits", "gateRowsPassingAtCapture"],
      "capturedInPermittedValues": ["studio-play-solo", "live"],
      "assertionAtUpload": "manualInstanceEdits == 0 and gateRowsPassingAtCapture == 10"
    },
    "fileOwnership": {
      "path": "assets/marketing/thumbnail-01.png",
      "isABuildArtifact": false,
      "notInRojoTree": true,
      "notInGameSrc": true,
      "whyOutsideTheTree": "so grep -rn 'rbxassetid' game/src keeps returning nothing and art/ui-art/04's icons.count 0 stays true. Ruling M-A: that zero is the interface, not the experience page.",
      "producedBy": "a human, at capture time. No emitter writes it and none is requested.",
      "uploadedBy": "release.publishChecklist row P5, requested below",
      "keyReachesNothingToday": true,
      "keyReachesNothingTodayIsM6": "release.publishChecklist owns publish-time platform settings and names no thumbnail; no emitter writes an image; storeThumbnails merges and reaches nothing. This is the same finding art/ui-art/01 closed with a named revision request rather than with silence."
    },
    "revisionRequests": [
      {
        "id": "RR-T1",
        "against": "cid/tech/deploy/01-the-release-contract.md",
        "field": "release.publishChecklist",
        "change": "add row P5 — upload storeThumbnails.slots[].file, set it active, paste slots[].altText into the alt field, then read back that the detail page reports exactly storeThumbnails.activeCount active thumbnails and zero videos",
        "why": "the checklist is four rows a human executes because no build step can, and this is a fifth of exactly that kind. Without it nothing uploads the file and storeThumbnails merges and reaches nothing.",
        "scope": "one checklist row with one read-back assertion; no existing row moves",
        "ifDeclined": "the key stays a specification with no consumer, and the failure mode is the defaults, which is how sourceTitle became Pet Ascend Simulator",
        "status": "filed, not applied"
      }
    ],
    "consequenceWhileFalse": {
      "slotsUploaded": 0,
      "whatTheDetailPageShows": "the experience icon and the description only",
      "thisIsAFinding": "a specified set that cannot be produced until the build matches the spec, which the category lead pre-authorised as better than a set produced from the wrong build",
      "openQuestion": "[research owed: whether a Roblox experience detail page requires at least one thumbnail, and what it renders when none exists]"
    }
  }
}
```

## Consequences for other work

- **UI Art work (`uiTheme`)** now has a second consumer for `A1`, `A2` and `A3`: not only does the
  client raise without `A1`, but no promotional image of this game may be taken until it closes.
  `A4`'s refusal is survivable here and is answered by a committed context; `A3`'s would not be.
- **Representation work (`architect/06`)** learns that `RR-A1` is on the path to a thumbnail as
  well as to a luma floor. Unapplied, the only ground in frame is 2.36 luma below an approved
  floor and cool where the fiction requires warm.
- **Environment build work** owns nine of the ten `[does not exist]` rows in `C6`. This gate does
  not add a subject; it states that the first outward artifact of this project depends on them.
- **Objects and build work** own `C7`. The tool is in frame in the only slot this domain ships, so
  two parts rendering at engine defaults is an outward defect and not only an internal one.
- **Publish-checklist work (`release`)** receives `RR-T1`, one row with a read-back.
- **Icon work (`storeIcon`) and Hype's trailer brief** inherit this gate by field rather than
  re-deriving it. Both should cite `storeThumbnails.captureGate`, not restate its rows.

## Acceptance criteria

1. `storeThumbnails.captureGate.rows[]` has **10** rows, each with an `id`, a `precondition`, a
   `check` that is a test command, a grep, a count or a named review, an `owner`, a `status` and a
   `refusable` boolean; `rowsPassingToday` equals the number of rows whose `status` is `pass`, and
   `allRowsPass` is `true` only when that count is 10.
2. Running the checks today reproduces the stated statuses: `C9` passes, and `C1` fails because
   `grep -rn "cartoon-vibrant\|Pet Ascend Simulator" game/src` returns matches in
   `game/src/shared/Theme.luau`.
3. No slot has `uploaded: true` while `allRowsPass` is `false`; and any uploaded image has a
   sidecar at `assets/marketing/*.provenance.json` recording all ten `provenance.fields` with
   `manualInstanceEdits` 0 and `gateRowsPassingAtCapture` 10.
4. `grep -rn "rbxassetid" game/src` returns nothing after the image exists, and no path under
   `assets/marketing/` appears in `game/default.project.json`.

## Not decided here

How many slots exist, their order, their claims and their strings: **sheet `01`**, which holds the
key. What the second half depicts: **sheet `03`**. Whether any string is drawn on the image:
**sheet `04`**. Whether `A3` and `A4` land, and who edits `bridge/schema.mjs` or
`concept/src/derive/game-context.mjs`: **contract-and-seam work**; I state the gate, not the fix.
The values inside `runtime.placeConfiguration` and every other publish-time platform setting:
**publish-checklist work (`release`)**, which also accepts or refuses `RR-T1`. When the ten world
subjects get built and in what order: **Environment build work and the architect's build order**;
this sheet counts them and schedules nothing. Whether an icon can be produced under the same gate:
**Icon work**, which should cite `captureGate` rather than write a second one.
