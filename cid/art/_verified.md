# Art & Visuals — verification

**Status: FAIL**
Thirteen revision requests. Two domains ship mutually contradictory instance allowances, palettes
and slab materials; a third writes an approved UI/UX key's value out of existence without filing
against it. The wave gate cannot open on Art until 1–5 and 10 land.

Gates re-confirmed as reported: `cid:verify --category art` PASS, `bridge` COMPLETE 25/25, 170
tests. Those check form. Every failure below is a cross-sheet contradiction no mechanical gate
sees.

---

## Check results

| # | check | result | evidence |
|---|---|---|---|
| 1 | every asset in the game maps to a style-guide rule | **FAIL** | Four assets resolve to a rule that does not exist. `environment/01` tuple 1 uses `Cobblestone`, absent from `styleGuide.materials.rows[].enum` (`style/01`, `"closed": true`); tuple 9 requires colour role `litter.leaf`, absent from `styleGuide.roles` (whose consequence block says `P6` litter has *"no role of their own"*). `objects/03` gives the tool roles `tool-grip-timber` / `tool-head-timber-pale` pointing at `styleGuide.materials[worked-wood-dark]`/`[worked-wood-pale]`, neither of which is a path in `style/01` (`materials` is `rows[]` keyed `M1`–`M11`; roles are keyed `stone.cleared`, `wood.worked`, …). `lighting/01:189` and `vfx/01` `cues[findReveal].part.colorRole` both name `styleGuide.roles.clearedStone`; the role is `styleGuide.roles["stone.cleared"]`. |
| 2 | every area has a defined visual treatment | **PASS** | `chunkDressing.signatures` has one entry per `layout.families[]`, four families over four depths and eight areas, `endgame.postTerminalBaySignature: "spire"` at zero additional parts (`environment/04`). Searched for an area with no signature and for a rendered surface with no owner: the only one is the 400 × 400 lobby baseplate, and both `style/01` `RR-A2` and `environment/03` route it to publish-checklist work rather than leaving it silent. |
| 3 | no asset requires a technique the Build Capability Registry does not support | **FAIL** | Not on technique — on creator. `vfx/02` `RR-V2` correctly files that `representation` names no legal creator for a world-anchored effect Instance. Environment's 18 per-lane + 24 shared parts have the identical problem and **no equivalent request is filed anywhere in `environment/01`–`/05`**: `Plots.luau` builds a slab, patches, four boundary parts and one Attachment, `representation` has nine subjects and none of them is dressing, and `architect`'s build order has no module that would create a parapet. Grepped all five Environment sheets for `representation`, `architect/06` and `creator`: `environment/03` names an emitter path for the slab's two *properties* only. Every other capability finding in the category is compliant — `A5`–`A8` (`ui-art/02`, `/06`) each name file, function, `taken` and `ifRefused`, and `ui-art/02` corrects its own lead by establishing that 9-slice **is** producible (`overrides.mjs:34` lists `slice` in `SPEC_PROPS`) and is refused on the uploaded-asset rule instead. |
| 4 | the palette is consistent across environment, characters, objects and UI | **FAIL** | Three collisions. (a) The tool head: `style/01` consequences assign it `metal.cast` on `SmoothPlastic` rgb `[128,108,76]`; `objects/03` assigns it `Wood` rgb `[190,158,118]` and puts `SmoothPlastic` in an 18-member `bannedMaterials` list. Under Style Guide's value the head–grip luma separation is 110.33 − 94.5 = **15.8**, failing `objectArt.tool.invariants.headLumaMinusGripLumaAtLeast` 60. (b) The lane slab: `style/01` `RR-A1` asks `Limestone`; `environment/03` asks `Cobblestone`; both target `Plots.luau:534` and `representation.plot`, and `style/01` criterion 4 requires `Enum.Material.Limestone` while `environment/03` criterion 2 requires the emitter set `Cobblestone`. (c) `litter.leaf` (above). Characters and UI are clean: `characterArt` reads no colour at all, and `ui-art/02` states the two-way boundary (`#D4A34A` may not enter a world palette; no world role is named after a UI token). |
| 5 | every effect has a stated performance budget | **PASS** | Two world effects exist and both are budgeted. `effects.budget` carries concurrency (4 clear hosts, 3 reveal Parts per player), live particles (32), the platform cap (8/s against 100/s mobile), server instances (48), client instances (8), a `screenAreaFractionCeiling` 0.02 with test range and unit, a named instrument, and `instrumentOwner: "UNOWNED"` stated rather than implied. The three non-world beats each carry `worldComponent: "none"` with a ruling and an observable. **The budget is stated; it is not funded** — see RR-2. |
| 6 | art direction is achievable within the brief's stated device floor | **FAIL — check is wrong** | The brief names no device floor, so the check cannot be evaluated as written. `budgets.deviceFloor` is `[cid: decided]` by `tech/performance/01` and `RR-P1` strikes the only merged citation of a brief floor (`cid/gameplay/meta/01-the-area.md:39`, sourced to two `[simulated: R5 Q5]` test briefs). **Narrow the check to:** *"every ceiling this category designs against is read from `budgets.deviceFloor` by field, never from the brief, and is carried at `[playtest unknown]` with a test range."* **Against the narrowed check, Art passes**, and does so deliberately: `style/03` `inputs.deviceFloor` = *"cited by field, never from the brief — RR-P1"*; `environment/01`, `objects/05`, `lighting/02` `V10` and `vfx/01` all cite `budgets.deviceFloor`. Grepped all 23 sheets for `brief's 3 GB` and `3 GB device floor`: zero matches. |

---

## Universal invariants

- **No sheet contradicts a `[brief: binding]` item.** Checked all seven binding lines. *"content design is the primary creative work, not art"*: Environment ships 18 parts and four signatures with zero assets; `ui-art/04` deletes the last two image assets; `objects/05` declines meshes with the price stated. *"Endless via shuffled authored chunks"*: no per-session generation; `chunkDressing` positions are fractions of `plots.bays[k].lengthStuds`. *"Cleared is permanent"*: `effects.cues[findReveal].permanenceRule` at 2.6 s; `environment/03` `G6`. **PASS.**
- **2–4 acceptance criteria per leaf sheet: PASS on count** (23 of 23 sheets in range), **FAIL on one criterion.** `ui-art/02` criterion 4 — *"the progress-bar fill is distinguishable from cleared stone behind it in a greyscale copy"* — is a judgment two reviewers can differ on, and the sheet marks the outcome `[playtest unknown]`. RR-12.
- **No sheet specs `03-META.md` priority-3 content: PASS.** Every sheet carries a `scopeCheck` or an equivalent exclusion row naming the excluded items in order to forbid them, which is compliant. Searched for reserved slots, stub fields and held-open regions: `environment/01` `X12` forbids one explicitly; `effects.forbidden[reservedCueSlot]` forbids one explicitly; no sheet holds a field open.
- **No sheet names a capability absent from the registry: PASS.** Every gap (`A5` `lineJoinMode`, `A6` `panelFrame`, `A7` motion tokens, `A8` group routing, `RR-V2` effect creator) is filed as a finding with `refusable` and `ifRefused` stated, which is the compliant form. `ui-art/02` corrected the one place its own lead had misclassified a refusal as a capability limit.
- **`[research: url]` tags: PARTIAL.** Every repo-internal citation I could re-open verified exactly — `palettes.mjs:150` (`serif-ui.numeric.roblox = 'MerriweatherBold'`), `UIBuilder.luau:482`, `cli.mjs:121`, `Clearing.luau:242-249`, `World.luau:110-114` and `:169-174`, `init.server.luau:242` and `:316`, `Tool.luau:245`, `Theme.luau:10-13`, `Pressables.luau:404`. I cannot re-fetch external URLs. `ui-art/03` finding `T3` records that four wave-6 URL headings were banked into `cid/_research/pack.md` with a trailing backtick, so a correctly written citation will not key-match the pack — I confirmed the malformation at `cid/_research/pack.md:510`. Run `npm run cid:research` before the next `cid:verify`.
- **`[cid: decided]` flagged upward: PARTIAL.** `style/01`–`/03`, `vfx/01`, `characters/01` and `ui-art/01` each carry a `## Flagged to the developer` section with live alternatives and a recommendation. **Environment's five sheets and Lighting's two carry none**, while between them holding the parapet height, the opening width, the eleven-tuple roster, the residency rule, the whole 18+24 allowance, the canopy form, the roofed share and thirteen previously-unstated `Lighting` properties — all `[cid: decided]` against a silent brief. Environment's two *overrules* are correctly escalated (`environment/02` has a `## Pushing back` naming `N7` and `social/02`); its *decisions* are not. RR-13.

---

## The ten items this pass was asked to settle

**1 · The instance allowance. Ruling: 18 per lane + 24 shared, with the total reduced.**

Recomputed from `budgets` by field. `clientStreamedInstancesWorstCase` 5,814 = 9 lanes × `laneInstanceFormula(640)` 646. Headroom to `clientStreamedInstanceCeiling` 6,000 is **186**.

- Style Guide: `9 × (646 + 19) + 8 = 5,993`. Legal, 7 spare.
- Environment: `9 × (646 + 18) + 24 = 6,000`. Legal, **0 spare**, and `9 × 18 + 24 = 186` exactly.
- Server, both: 10,648 of 12,000. `style/03`'s manifest says 10,649 and its criterion 2 says 10,648; the difference is the lobby baseplate, and it is stated.

Both arithmetics are internally correct. **Environment's shape wins** on three grounds: it is the only one with named consumers whose counts are actually spent (`builtEdge` 6 + `groundwork` 5 + `chunkDressing` 6 + reserve 1 = 18; `backdrop` 24, spent as 12 canopy + 12 trunk); its per-consumer split is what `builtEdge`, `groundwork`, `chunkDressing` and `backdrop` each cite by field; and `style/03`'s competing `perLane.rows` is a **per-subject part allocation** (retaining wall 4, parapet 4, end walls 2, paving and kerbs 2, piers and vaulting 4, channel and basin 2, fittings 1), which is asset placement, outside Style Guide's graph-declared `does_not_own: "Any individual asset"`, and which contradicts the geometry Environment actually authored — 2 parapets and 4 cross-walls, not 4 + 4 + 2; 1 `P3` fitting against Environment's ruled **0**; 0 litter against Environment's **1**.

**But 18 + 24 is also wrong, because it spends 100% of the headroom and leaves nothing for `effects`.** `vfx/01` adds 8 client instances (4 concurrent clear hosts × 2) plus reveal `Part`s that replicate and stream — 9 at its own realistic figure, 27 at its stated worst case. At 9 the client total is 6,017 > 6,000; at 27 it is 6,035. **Neither domain's allowance is solvent once effects exist**, and neither sheet saw it: `style/03` `perLane.rows[effects]` says *"not in this budget"* and `environment/01`'s reserve is 1. See RR-2.

Cross-checks. `environment/01` `batchingFactorFloor` 6.0 = `(9 × 664 + 24)/1000`, which uses `laneInstanceFormula` where the draw-call formula takes `lanePartFormula` (645); the correct floor for its own budget is 5.991, and its *"nine lanes of 646 patches are 5,814 draw calls"* should be 5,805 parts. **`style/03` is right and `environment/01` is wrong** — but Environment inherited the error from `budgets` itself, whose `batchingFactor.escalationIfBelow10` says *"at 1:1 the merged design renders 5814 draw calls"* against a lane of 645 parts. Style Guide's `minimumBatchingFactorForAnyBudget` 5.805 and `minimumBatchingFactorForThisBudget` 5.984 both check out. `objects/05`'s *"171% of 12,000 at one child per patch"* checks out: `16 × (640 + 640 + 6) = 20,576`, 171.5% of 12,000, and it breaks at every batching factor, so it needs no measurement to rule.

**2 · The residency rule. Ruling: arithmetically sound, endgame-safe, visually wrong at the seam.**

`plots.liveGeometry.bayBuiltAt` is *"the instant the previous bay's last patch clears"* (`gameplay/meta/06:156`) and `endgame` adds 480-stud bays without bound, so live-bay-only residency is the only form with an upper bound — the rule is correct and `endgameCost: 0` holds. **But `plots.liveGeometry.torndownBeyond` is *"bays more than two outward of the live one are destroyed and rebuilt bare on re-entry"* (`meta/06:157`) — bays k−1 and k−2 persist as geometry and a player can walk back into them.** Under `builtEdge` `E7` and `groundwork` `G7` those bays hold paving and nothing else, so the retaining wall, both parapets, both kerbs, the channel, the basin and the litter mat all vanish behind the player at every bay advance and reappear 480 studs further in. That meets bar (a) plainly, and it puts `theme/setting/01`'s *"The area boundary is built"* in force for exactly one bay out of eight. No sheet states the consequence. RR-4.

**3 · The theme defect and its enforcement. Ruling: detectable, plus one route made impossible — not impossible overall.**

Verified: `ui-forge/src/cli.mjs:121` reads `args.context ?? 'examples/game-context.json'`; `game/src/shared/Theme.luau:10-13` carries `archetype = "cartoon-vibrant"` / `sourceTitle = "Pet Ascend Simulator"` / `genre = "simulator"`. `ui-art/01` supplies three things and they have three different strengths. `A2` (delete the default, exit non-zero naming `--context`) **does** make one route impossible and is correctly marked `refusable: false`. Fixing `vibe` to a literal `ARCHETYPES` key closes the second route, because `resolveArchetype` matches an exact key before `VIBE_ALIASES` and `GENRE_DEFAULTS` — that is the right mechanism and the sheet says why. The Node test on `npm test` is **detection**, not prevention: it fails a wave after a wrong emission, and it can only compare against a `uiTheme` whose values reach `generateTheme` through `artDirection.tokenOverrides` and `artDirection.tokens`, which `deriveGameContext` does not carry (`A3`, refusable) from a `concept.json` that does not exist (`A4`, refusable). The sheet states this itself — *"the key would merge and change nothing"* — which is the honest form. **No revision request. The residual risk is that both refusable requests are refused and the context stays hand-authored and unowned; that is `A4`'s third petition against one gate owner and it should be scoped as one job with `hud/03` and `theme/vocabulary/03`.**

**4 · A1. Confirmed, and it is correctly treated as not refusable.**

`palettes.mjs:150` sets `FONT_STACKS['serif-ui'].numeric.roblox = 'MerriweatherBold'`. `Enum.Font` has `Merriweather` and no bold variant. `game/src/shared/UIBuilder.luau:482` reads `inst.Font = (Enum.Font :: any)[t.font] or Enum.Font.Gotham`. Taking the UI/UX verifier's established finding that indexing `Enum.Font` with an absent member **raises**, the `or` fallback never runs, so under `fantasy-ornate` every `numeric`-typed node throws inside `buildNode` and kills `UIBuilder.build` and the client with it. Blast radius confirmed and bounded: `type.numeric` is read only by `ReadoutValue` (`hud-overlay.mjs:114`); `Pressables.luau:404` does the same indexing but reads `type.body.font`, which resolves to `SourceSans`, a real member. `ui-art/01` correctly gates its own emission on `A1` (`emission.blockedBy: ["A1"]`), and `ui-art/03` correctly ships **both** closures — the `palettes.mjs` fix for every game and a `type.numeric.font` override for this one — and correctly declines to pick the throw-or-nil branch it could not source, because one change closes both. **PASS, no request.**

**5 · The three colour claims. Jointly satisfied — conditionally.**

`style/01` `stone.cleared` `[216,201,169]`: `0.299×216 + 0.587×201 + 0.114×169 = 64.584 + 117.987 + 19.266 = 201.837`. **201.84 confirmed.** It clears Objects' `clearedStoneLumaRequiredAtLeast` **188** by 13.8, Lighting's `V6` static gate of **195** by 6.8 (and `195 × 0.85 = 165.75 ≥ 165`, so `V8` holds), and `theme/setting/01`'s 165 by 36.8. `styleGuide` `C1`'s band `[195, 210]` contains it. The tool head at 163.0 keeps 163.0 − 94.5 = **68.5** over the grip against a required 60, 201.84 − 163.0 = **38.8** against a required 25, and 163.0 − 123.11 = **39.9** against a required 20. All four hold. **The condition:** every one of these is computed on `objects/03`'s `Wood` head. Under `style/01`'s competing `metal.cast` / `SmoothPlastic` head the separation collapses to 15.8 and Objects' own invariant fails. Item 5 passes only once RR-6 resolves toward Objects.

**6 · The `Plots.luau:534` slab. Ruling: the two requests conflict; they do not compose.**

The defect is real — I re-read the file and there is no `slab.Color` or `slab.BrickColor` anywhere in it; the default `[163,162,165]` computes `48.737 + 95.094 + 18.810 = 162.64`, 2.36 below the floor, with `R − B = −2`. Both sheets found it independently and both are right about it. But `environment/03` states *"I file the material half and the emitter path; `art/style/01` files the colour"* and *"mustLandAsOneEdit: true"* — and `style/01`'s `RR-A1` **also files a material change**, to `Limestone`, with `styleGuide.materials` row `M1` binding `Limestone` to `stone.cleared` on *"the lane slab and cleared paving"* and criterion 4 requiring `Enum.Material.Limestone`. `environment/03` asks `Cobblestone` and its criterion 2 requires the emitter set it. Two revision requests, one property, two values. RR-5.

**7 · Lighting's contrast finding. Arithmetic verified; no sheet softens it.**

Recomputed independently. `Moss` `[104,142,76]` → sRGB relative luminance 0.2280 (sheet: 0.2281). Achromatic `[165,165,165]` → 0.3770 (sheet: 0.3764). Ratio `(0.3770 + 0.05)/(0.2280 + 0.05)` = **1.535** — 1.53:1 confirmed. Warm `[214,199,168]` → 0.5798, ratio **2.264** — 2.26:1 confirmed. `[245,230,200]` → 0.8018, ratio **3.063**, at Rec.601 luma 231.07 — and `theme/setting/01` forbids white marble by name, so the sheet's *"reaching 3:1 needs a near-white the fiction forbids"* is exact. Its enclosure result (2.26 → 2.23 under a uniform 0.85 attenuation, because the `+0.05` offsets dominate) is also right. Searched all 23 sheets for a claim that the luma floor is the legibility guarantee: `style/01` disclaims it in its `## Why`, `style/02` `greyscaleSilhouetteRule.whyNotALumaClaim` disclaims it, `lighting/02` `V13` forbids it. **Nobody softens it. PASS.**

**8 · Objects' Find ruling and the `P4` half. Both correct, and three sheets now agree.**

The ruling composes against all three colliding sources and identifies `gameplay/meta/02`'s *"owes 24 models"* as the stale one, on the right ground (it is a `## Consequences` prose line, so striking it moves no manifest value, and the sheet is written so a decline changes nothing). The `P4` finding is the sharper half and it is new: every member of `theme/setting/05` `P4` is a `Find`, `representation.find` gives a Find no Instance, therefore a present class of the closed dressing list renders nothing. Three sheets now say so consistently — `objects/02` `F4`/`Z5` `looseObjectInstanceCount: 0`, `style/03` `perLane.rows[P4].instances: 0`, and `environment/01`, whose eleven tuples contain no `P4` entry. `ui-art/04` closes the interface side with `icons.count: 0`, so no Find has an icon form on any surface. **PASS.**

**9 · VFX's host swap. Confirmed against source.**

`game/src/server/Clearing.luau:242-249`: `clearPatch` sets `patch.cleared = true`, then `instance:Destroy()`, then `patch.instance = nil`. The patch is gone at the instant of the clear, so an emitter parented to it loses its live particles. `effects.cues[patchClear].host` is an `Attachment` on the lane slab `Part`, which `representation.plot` makes persistent for the life of the lane. **The reasoning and the fix are both right. PASS.** One consequence the sheet states and I confirm is real: `cuePatchClear` receives no args and is driven off a rise in `snapshot.clearedCount`, so the cue has no position today — `RR-V1` is the request that makes the most-repeated moment in the game renderable at all, and it is correctly filed rather than assumed.

**10 · Characters' correction. Enumeration verified complete.**

Re-read the three server files. `Humanoid.WalkSpeed` at `init.server.luau:242` — the only `Humanoid` write, and the file's own header says so. `BasePart.CollisionGroup` at `World.luau:112`, applied by `applyGroup` both through `character.DescendantAdded:Connect(applyGroup)` and a pass over `character:GetDescendants()` at `World.luau:170-173` — the sheet's citation `110-112, 169-174` is exact, and its observation that this is the one place the game reaches into an avatar's own accessory instances is correct, the comment at `:159` naming *"an Accessory handle"* as the reason. `character:PivotTo(...)` at `init.server.luau:316`. `Model.Parent = character` at `Tool.luau:245`, plus `BasePart.Size` on the tool head at `:234`/`:347`. **I found no fifth write.** `appearanceWritesOnCharacter: 0` is the correct assertion and *"zero writes on a character"* would have been false on day one. The sheet's second correction — that `theme/identity/03` criterion 2's `Humanoid.HealthDisplayDistance = 0` route violates `response.humanoidWritesAllowed` `["WalkSpeed"]` and must be re-sited on `StarterPlayer` — is also right, and it keeps the ruling while declining the route, which is the correct shape. **PASS.**

---

## Revision requests

### `cid/art/style/03-detail-budget.md` — the per-lane budget allocates parts to subjects Environment owns and does not build
**Violates:** check 1, check 4; the domain's own graph `does_not_own: "Any individual asset"`.
**Fix:** strike `detailBudget.perLane.rows`, `perLane.lanePersistent`, `perLane.inBay`, `perLane.partsPerChunkInsideABay`, `shared.rows` and acceptance criterion 3. Replace `perLane.total` and `shared.total` with field references to `environment.allowance.residentInstancesPerLane` and `.sharedPlaceInstances`, and rewrite criteria 1, 2 and 4 to read those fields rather than the literals 19 and 8. Keep everything else — the envelope arithmetic, `bindingCeiling`, `triangles`, `drawCalls`, `noModelRule`, `forbiddenSavings`, `whatNDoesNotReach` and `instrument` are correct and are the reason this key should survive.

### `cid/art/environment/01-world-part-budget.md` — the allowance spends 100% of client headroom, leaving zero for `effects`
**Violates:** check 5's arithmetic; `budgets.instanceCeilings.clientStreamedInstanceCeiling`.
**Fix:** `9 × 18 + 24 = 186` consumes the entire headroom, and `effects` adds 8 client instances plus 9 streamed reveal `Part`s at its own realistic figure (27 at its stated worst case), taking the client total to 6,017–6,035 against a ceiling of 6,000. Add a fifth row to `allowance.perConsumerPerLane` — or a `perConsumerShared` row — naming `effects` with the count `vfx/01` `budget.clientInstancesAdded` and `concurrentRevealObjectsOnOneScreen` require, and reduce `residentInstancesPerLane` to 16 so that `9E + S + effects ≤ clientStreamedInstanceCeiling` holds at the realistic figure. State which consumer gives up the two.

### `cid/art/environment/01-world-part-budget.md` — `Cobblestone` and `litter.leaf` are outside `styleGuide`'s closed lists
**Violates:** check 1, check 4.
**Fix:** `styleGuide.materials` is `"closed": true` with nine rows and no `Cobblestone`; `styleGuide.roles` has seven roles and no `litter.leaf`, and its consequence block rules `P6` litter *"realised as `Color3` variance inside the `stone.built` and `stone.cleared` bands"* with zero instances. Either substitute inside your own tuple table (the mechanism your own consequence block already names) or file one revision request against `cid/art/style/01-palette-and-materials.md` adding material row `M12 Cobblestone → stone.cleared` and role `litter.leaf`, with the `C6` and `C7` clearances stated — `litter.leaf` at luma 145 must not have G as its largest channel inside the built edge and must not fall inside `123.11 ± 8`.

### `cid/art/environment/01-world-part-budget.md` — live-bay-only residency destroys the built edge in bays `plots` deliberately retains
**Violates:** `theme/setting/01` *"The area boundary is built"*; stopping-rule bar (a).
**Fix:** `plots.liveGeometry.torndownBeyond` retains bays k−1 and k−2 as walkable geometry. `residency.residentBays: 1` plus `builtEdge` `E7` and `groundwork` `G7` empties them of every parapet, kerb, channel, basin and litter mat, so a player walking one bay back sees the works disappear. Either raise `residentBays` to match `plots.liveGeometry.torndownBeyond`'s retained set and re-derive the allowance at `3 × 18` per lane against the client ceiling (it does not fit; say so), or keep `residentBays: 1` and add a stated consequence naming the visible discontinuity, its bar-(a) status, and the field that reverses it. Do not leave it unstated.

### `cid/art/environment/03-groundwork-and-channels.md` — the slab material request contradicts `style/01` `RR-A1` on the same property
**Violates:** check 4; the sheet's own `mustLandAsOneEdit: true`.
**Fix:** `slab.requestedRevision.change` asks `Slate → Cobblestone` while `styleGuide.revisionRequests[RR-A1].change` asks `Slate → Limestone`, and both target `Plots.luau:534` and `representation.plot`. Two requests naming one property with two values produce two answers. Agree one material with `cid/art/style/01` before either is filed, and make the surviving sheet carry the whole request — material and colour together — with the other citing it. Your acceptance criterion 2 and `style/01`'s criterion 4 must then name the same enum.

### `cid/art/style/01-palette-and-materials.md` — the consequences block assigns the tool's appearance, which Objects owns and has decided differently
**Violates:** check 4; the category brief's assignment of *"the tool's two parts' colour, material and proportion"* to Objects.
**Fix:** strike *"handle `wood.worked` on `Wood`, head `metal.cast` on `SmoothPlastic`"* from the Objects consequence bullet. `objectArt.tool` sets both parts to `Wood` and lists `SmoothPlastic` in an 18-member `bannedMaterials`; at `metal.cast` luma 110.33 the head–grip separation is 15.8 against a required 60, so your value cannot be adopted without breaking Objects' own invariant. Replace the bullet with the two role names Objects asked you for and the values they resolve to — see the next request.

### `cid/art/objects/03-the-tool-in-hand.md` — `roleOwnerWhenStyleGuideExists` names two paths that do not exist
**Violates:** check 1.
**Fix:** `styleGuide.materials[worked-wood-dark]` and `styleGuide.materials[worked-wood-pale]` do not resolve — `styleGuide.materials` is `rows[]` keyed `M1`–`M11` and roles are keyed `stone.cleared`, `wood.worked`, `metal.cast` and so on. Either point both fields at `styleGuide.roles["wood.worked"]` (luma 162.30, within 0.7 of your head value, so the head can adopt it and only the grip needs a second role), or file one revision request against `cid/art/style/01` naming the two roles you need with their rgb, luma and the `C2`/`C5`/`C7` clearances you have already computed.

### `cid/art/lighting/01-the-one-daylight-state.md` — `styleGuide.roles.clearedStone` is not a path in `styleGuide`
**Violates:** check 1.
**Fix:** the role is `styleGuide.roles["stone.cleared"]`. Correct `readability.authoredColourField` and the same string in `V6` and `V8` of sheet `02` and in criterion 2 of both sheets. This is the class of defect `RR-P1` exists for: a field path that does not resolve is a citation a later reader follows into nothing.

### `cid/art/vfx/01-the-clear-and-the-reveal.md` — `cues[findReveal].part` names `styleGuide`'s `clearedStone` role, which does not resolve
**Violates:** check 1.
**Fix:** `materialRole` and `colorRole` should read `styleGuide.roles["stone.cleared"]`, and `legibilityRequirement`'s `styleGuide.form.minimumFeatureStuds` should read `formLanguage.featureSize.near.minStuds` (0.5) — `styleGuide` holds no `form` branch; feature size is `formLanguage`'s, on sheet `style/02`. Your 3 × 3 stud face clears the 0.5 near-minimum with margin, so no value moves.

### `cid/art/ui-art/04-iconography.md` — the icons are deleted from the generated brief, not from the approved key that produces it
**Violates:** the graph rule that a sheet contradicting an approved ruling names it in a `## Pushing back` section; stopping-rule bar (a).
**Fix:** `icons.deleted[]` targets `ui-forge/briefs/hud.brief.json:15-16`. The source of truth is `cid/ui-ux/hud/01-persistent-surface-composition.md:232,236`, where `composition.elements[collection-count].icon = "find"` and `[currency-value].icon = "shard"` are merged values of an approved key. Regenerating the brief from `composition` re-adds both, and with it the two magenta `Color3.fromRGB(255, 0, 200)` boxes at `hud.luau:69,153`. Add a `## Pushing back` naming that sheet and a revision request setting both `icon` fields to `null`, with your own *"a word an 8-year-old can read beats a 20 px glyph"* argument attached. The ruling is right; only its target is wrong.

### `cid/art/environment/05-beyond-the-edge.md` — the canopy is outside the streaming radius for fourteen of sixteen lanes
**Violates:** check 2's intent; `budgets.streaming.StreamingTargetRadius`.
**Fix:** the two long walls stand at `−W/2 − 30` and `(N−1) × P + W/2 + 30`, so the row is 1,950 studs wide and an interior lane's nearest long wall is 400–950 studs away against a `StreamingTargetRadius` of 512. `closesHorizonFromEyeHeightStuds: 8` and `subtendedAngleDegreesAtNearestLane: 34` are true only for the two outermost slots; for the rest the lateral horizon is unrendered space, which is the *"nothing really looks good"* reading this domain exists to answer. Either state the interaction and scope the claim to the lanes it holds for, or replace the two long walls with per-lane segments inside 512 studs and re-derive the count against `allowance.perConsumerShared.backdrop`.

### `cid/art/ui-art/02-surface-and-ornament.md` — acceptance criterion 4 is a judgment call
**Violates:** the acceptance-criteria invariant.
**Fix:** *"the progress-bar fill is distinguishable from cleared stone behind it in a greyscale copy"* is a criterion two reviewers can disagree about, and the sheet marks the outcome `[playtest unknown]`. Restate it as the arithmetic the sheet already carries: `|luma601(color.accent.primary) − luma601(styleGuide.roles["stone.cleared"].rgb)| ≥ N`, with `N` stated and its test range given. Today that difference is `|167.5 − 201.84| = 34.3`; if 34.3 is acceptable, say so and set `N`.

### `cid/art/environment/_lead.md` — five sheets of `[cid: decided]` world values with no developer-facing flag
**Violates:** the `[cid: decided]`-flagged-upward invariant.
**Fix:** every other domain in this category that decided against a silent brief carries a `## Flagged to the developer` section with live alternatives and a recommendation — `style/01`, `/02`, `/03`, `vfx/01`, `characters/01`, `ui-art/01`. Environment decided the parapet height, the 16-stud opening width, the eleven-tuple roster, the residency rule, the four family signatures, the roofed share, and a canopy whose motion budget it declined to spend, all `[cid: decided]` against `E1`'s stated silence, and none of it is flagged. Add one `## Flagged to the developer` section to the sheet carrying each decision, or a single consolidated one in the lead, naming for each the alternative not taken and the one field that reverses it. The overrules are already escalated correctly; the decisions are not.

---

## Predicted cross-category conflicts

Not failures now. Recorded so the final pass diffs against them.

1. **`depths.areas[].patchCount` is now named as the lever by four separate art sheets** — `style/03` (`partsPerChunkIsTheFinding`, 0.44 parts per chunk), `environment/01` (`leverIfBelowFloor`), `environment/04` (`variation.findingAgainst`, 0.375 parts per chunk against `layout`'s 32 owed chunk looks), `objects/05` — and by `tech/performance/01` from the other side, whose post-terminal bay already breaches the same ceiling by 225%. Five findings, one lever, no owner. This is the largest unowned item in the project.
2. **`architect/sheets/01-runtime.md` `placeConfiguration` now has three pending entries and one precedent** — `RR-P2` (streaming, wave 5), `RR-L1` (eighteen `Lighting` properties, `lighting/01`), and `StarterPlayer.HealthDisplayDistance = 0` (`characters/01`). Plus `ui-art/01` `A4`, which is the third petition against the `ok && --emit` gate owner after `bridge/emit-hud-brief.mjs` and `bridge/emit-terms.mjs`. Scope as two jobs, not five.
3. **`representation` needs two new subjects, and only one was asked for.** `vfx/02` `RR-V2` files `effect-host` with two creators. Environment needs the identical row for lane dressing and filed nothing — see check 3. Answer them together or the second arrives a wave later.
4. **`gameplay/mechanics/05`'s channel table gets two requests for one reopening.** `vfx/02` `RR-V3` asks for `B3`'s missing world channel; Audio's `G1` asks for `patchClear`'s missing audio channel. Both sheets say to merge them. Merge them.
5. **`budgets` conflates instances and parts in its own escalation.** `batchingFactor.escalationIfBelow10` says *"at 1:1 the merged design renders 5814 draw calls"*; 5,814 is `9 × laneInstanceFormula(640)` and includes the spawn `Attachment`, which is not a draw call. The parts figure is `9 × 645 = 5,805`. `style/03` corrected it; `environment/01` inherited it. Two art keys will carry different floors until `budgets` is fixed.
6. **`lighting/02` `V9` predicted a collision with `environment` and it did not happen.** `V9` requires ≥ 50% of a bay's 28 sample points to see sky; `chunkDressing` roofs 6 studs at depth 2 and 12 at depth 3, at most 2.5% of a bay, with no point more than 3 studs from open sky. The gate passes with enormous margin. **Recorded as closed, not as a risk**, so the final pass does not re-open it. What survives is the second half `lighting/02` named: an opening that *lights* and an opening that *passes* are different counts, and `theme/setting/04` `W3`'s two-per-part is the passage count only.
7. **`plots` gains a teardown subject and does not know it yet.** `environment/01` `residency.reopensPlotsField` and `style/03` `consequenceForPlots` both reopen `plots.liveGeometry.torndownBeyond`, which `representation.plot` predicted would happen *"the first time Art dresses a bay"*. Two sheets state it; neither resolves it, correctly. `plots` owes the rule a subject.
8. **`collection.sets[].relics[]` is now protected from three sides and asked to change from none.** `objects/04` files the strike of the stale *"owes 24 models"* line and explicitly requests no field; `ui-art/04` names the same line; `objects/02` `Z5` adds the check that the 24 strings never become an Instance name. If `gameplay/meta` declines the strike, nothing breaks — which is how it was written, and is right.
9. **The lobby baseplate is the one rendered surface with no owner in either contract.** 400 × 400 `Slate` at luma 91.94 in `game/default.project.json`, which `architect/04-tree` forbids the build editing. `style/01` `RR-A2` and `environment/03` both route it to publish-checklist work, which has not accepted it. Nobody has said whether it is visible from a lane.
10. **`cid/art/_category.md:556` sends UI Art to `cid/art/ui/_lead.md`; the graph and the files are at `cid/art/ui-art/`.** The lead recorded the divergence and followed the graph, which is right. The category brief is the artifact to correct.

---

## What must happen before this category can release

1. **RR-1 through RR-5 land**, in that order. They are one decision each and they are sequential: the allowance ruling settles `style/03`, the allowance settles the `effects` funding, the funding settles Environment's per-consumer split, and the slab material has to be agreed before either sheet's criterion can be written.
2. **RR-6 and RR-7 land together.** The tool's head is either `Wood` at `[190,158,118]` or `SmoothPlastic` at `[128,108,76]`. One number, two sheets, and the whole of item 5's joint satisfaction rests on it.
3. **RR-8, RR-9 and RR-12 land.** Three one-line path corrections and one criterion rewrite.
4. **RR-10 lands.** Until `composition.elements[].icon` is the target, the two magenta boxes come back on the next brief regeneration.
5. **RR-11 and RR-13 land**, or Environment states plainly why not.
6. **Check 6 is renarrowed at the graph** to `budgets.deviceFloor`, and `RR-P1` is applied. The check as written cannot be satisfied by any sheet in any wave.
7. **`representation` gains a lane-dressing subject with a named creator**, or `environment`, `builtEdge`, `groundwork`, `chunkDressing` and `backdrop` merge as five keys nothing can build.

**Not blocking release, and worth saying:** `characters/01`, `lighting/01`, `lighting/02`, `objects/02`, `objects/04`, `objects/05`, `vfx/01`, `vfx/02`, `ui-art/01`, `ui-art/03`, `ui-art/05` and `ui-art/06` carry no revision request. Four of them found a live player-visible defect the pipeline had shipped past — the magenta icon boxes, the `MerriweatherBold` throw, the bouncing purchase press, and the false *"the only property the server writes on a character is WalkSpeed"* — and each closed it against source rather than against a retelling. That is the category doing its job.

---

# Round 2

**Status: FAIL**
Three requests, all one line, one of them blocking. **Eleven of thirteen round-1 requests closed
cleanly and five domains swept beyond what they were asked.** The blocking failure is new, and it is
the same defect class round 1 found, arriving in the one sheet that was told to read by field:
`style/03` was revised for `RR-1` but not re-derived against the siblings whose revisions it now
depends on. `detailBudget` merges asserting a breach that Environment and VFX have closed, its
acceptance criterion 2 requires a false evaluation that is now true, and three of the paths its own
`citeAs` block instructs readers to use do not resolve.

Gates re-confirmed as reported: `cid:verify --category art` PASS, `bridge` COMPLETE 25/25 with 0
problems, 170 tests. As in round 1, none of them can see a cross-sheet contradiction.

## Round-1 requests — disposition

| # | file | verdict | evidence |
|---|---|---|---|
| 1 | `style/03` | **closed, then re-broken** | `allocatesNothing` struck the rows, `citeAs.notInThisKey` names them absent, criterion 3 counts zero allocation rows. Then the sheet kept round-0 arithmetic everywhere else. See RR-14. |
| 2 | `environment/01` | **closed** | `9 × 16 + 6 + 35 = 185 ≤ 186`, with `allowance.perClientReservation.effects` a named field rather than an assumption. |
| 3 | `environment/01` | **closed, without widening anything** | `Cobblestone → Limestone` (`M1`) on paving, `Sandstone` (`M3`) on channel and basin, `litter` struck from the roster entirely. `distinctDrawClasses` 11 → 10, `X15` added, **zero revision requests filed against `styleGuide`**. Every `material` is a `styleGuide.materials.rows[].enum` and every `colourRole` a key of `styleGuide.roles`. Resolving inside a closed set rather than asking to widen it is the right instinct. |
| 4 | `environment/01` | **closed at zero instance cost** | Two tiers. `lane`: paving, kerb, channel, parapet — one part per lane per side, spanning bay 1 to the live bay, resized by the same `applyLaneExtent` that already resizes the slab. `liveBay`: cross-wall, basin, signature. `environment/02` `E9` and `/03` `G11` each forbid a rebuild where a resize is required. |
| 5 | `environment/03` | **closed by concession** | Slab is `Limestone` at `stone.cleared`; the `Cobblestone` request is withdrawn; `RR-A1` is the sole filing and carries material and colour together; the criterion reads `styleGuide.materials.rows[M1].enum` **by field**, so the two criteria cannot diverge again. |
| 6 | `style/01` | **closed, and better than asked** | `metal.cast` kept as an **explicitly unassigned** role rather than deleted — `M6` still needs it for `P3` fittings *"SET INTO THE BUILDING… Does NOT reach the held tool"*, and `theme/setting/01` names cast bronze in the Find register. Deleting it would have stranded both. `roleAssignmentBoundary` added: Style Guide sets roles, values and rules; who takes which role is `objectArt`'s, `environment`'s or `effects`'. It also ratified `objectArt`'s two timber values against its own five applicable rules rather than asserting a competing pair. |
| 7 | `objects/03` | **closed, and swept** | Both paths corrected. Objects found four more in its own sheets and one in a sibling — `screens` reads `collection.sets[g].relics[i].name` where `collection.sets[].relics[]` is an array of bare strings — filed as `RQ2`. |
| 8 | `lighting/01` | **closed, and swept** | `readability.authoredColourField` is `styleGuide.roles["stone.cleared"].rgb`; criterion 3 now requires every external path in the key to resolve. It also **dropped the 188 threshold it had stated on Objects' behalf**, which is correct and which I should have caught in round 1: 188 is `objectArt.tool.invariants.clearedStoneLumaRequiredAtLeast`, a derived invariant of another key, not a merged field Lighting had standing to restate. |
| 9 | `vfx/01` | **closed, and swept furthest** | Both paths corrected, and all 36 cross-key paths re-resolved and published as `effects.externalPathsCited`, with criterion 4 requiring each to resolve. That is the right response to a two-path request, and it is the sweep `style/03` did not do. |
| 10 | `ui-art/04` | **closed** | `RR-A3` files `composition.elements[collection-count].icon` and `[currency-value].icon` → `null` against `cid/ui-ux/hud/01`, under a `## Pushing back` that names the sheet and the ruling. `hud.brief.json` is demoted to `downstreamConsequence` with `ifRevisionRefused`: *"regenerating the brief restores both icons and both magenta boxes at `hud.luau:69,153`; deleting them from the brief alone is not a fix."* Criterion 1 now tests the merged key. |
| 11 | `environment/05` | **closed by scoping, which was the honest option** | The per-slot table is arithmetically right: slot 5's nearest long wall is `488 − 60 + 90 = 518` studs, just outside 512. `closedForSlots [1,2,3,4,13,14,15,16]`, `notClosedForSlots [5..12]`, `noBackdropGeometryFixesThis: true`, `B13` forbids the reflex fix by name (*"there are only 2 studs between lanes"*), and the three levers are named as `budgets`' and `plots`'. Backdrop re-cut 24 → 20 with `maxStreamedConcurrently` 6. |
| 12 | `ui-art/02` | **closed, and it found the better defect** | Criterion 4 is now an arithmetic table over pairs that share an edge. The finding underneath it is the one that matters: **the bar fill never touches the world** — a `surface.sunken` track and its `border.subtle` hairline always sit between — so the 34.33 I asked it to floor is recorded under `notAdjacent` as *"the number a reviewer will compute first"* and no floor applies. My request asked for the wrong pair to be measured; the sheet corrected the question rather than complying with it. |
| 13 | `environment/*`, `lighting/01` | **closed** | Seventeen decisions across five Environment sheets and eight rows in `lighting/01`, each with the alternative not taken, the reversing field and a recommendation. |

## The sum, verified

**It holds.** Every figure recomputed from `budgets` by field.

| quantity | arithmetic | verdict |
|---|---|---|
| client headroom | `6,000 − 5,814` | **186** |
| Environment's identity | `9 × 16 + 6 + 35 = 144 + 6 + 35` | **185 ≤ 186** ✓ |
| per-consumer sum | `builtEdge 6 + groundwork 4 + chunkDressing 6 + reserve 0` | **16** ✓ — and `environment/02` states `instancesPerLane` 6, `/03` states 4, `/04` states 6, so the three consumers agree with the allocator |
| backdrop | `12 canopy + 8 trunk` | **20** place-wide, **6** streamed ✓ |
| server | `16 × 662 + 20` | **10,612 ≤ 12,000** ✓ |
| **at VFX's actual need** | `144 + 6 + 11` | **161** — 25 spare |
| conservative reading (all 20 shared charged) | `5,814 + 144 + 20 + 11` | **5,989 ≤ 6,000** ✓ |

**Solvent under every accounting.** The reservation is *over*-sized, not under: Environment reserved
35 against VFX's round-0 worst case, and VFX's revision took the true bound to 11. That is slack, not
a breach, and it is the right direction to be wrong in — but the derivation string is now false and
24 instances are parked against a need that no longer exists. RR-15.

**Charging what streams rather than what exists is sound.** `clientStreamedInstanceCeiling` is a
ceiling on streamed instances and `clientStreamedInstancesWorstCase` is itself a streamed figure, so
charging 20 backdrop parts of which at most 6 are ever inside `StreamingTargetRadius` would
double-count. `environment/05`'s trunk re-spacing to *"even quarters of the long wall run, 765 studs
apart, so at most 2 are inside the streaming radius at once"* is a real design change made to earn
that accounting, not a relabelling. **But the two sheets do not agree which field enters the sum** —
`environment/01`'s `clientIdentity` takes `sharedMaxStreamedConcurrently` 6, `vfx/01`'s criterion 3
takes `sharedPlaceInstances` 20. Both evaluate true, so nothing breaks; one should be named
canonical before a third key picks the other. RR-16.

## Rulings

**VFX's client-only reveal: accepted, and it is the right kind of concession.**

The geometry checks: `2 × atan(1.5 / 122)` = **1.41°**. A neighbour's reveal object occupied about a
pixel and a half at phone resolution, so what server replication bought was never legible, and
cutting it is a cost reduction rather than a budget argument — the distinction round 1 was looking
for. Four things I checked before accepting. `decidedBy` stays `server`, so
`response.beats[findReveal]` is untouched and no approved key moves — only the renderer changes, in
the `cueFindReveal` seam `Beats.luau` already has. `social/02`'s *"ground visibly being cleared"*
survives, because the patch Instances are server-destroyed and replicate. `theme/tone/03`'s forbidden
peak on *another player's reveal* now holds **by construction** rather than by rule, which is
strictly stronger, and `forbidden[otherPlayerRevealCue]`'s observable was correctly rewritten to say
so. And the cost is stated where it belongs — *Flagged to the developer* item 3, with
`cues[findReveal].createdBy` named as the reversing field.

**One new cost arrives with it and the sheet does state it.** `RR-V1` now needs a position for
*both* cues, adding a `Vector3` to `FindRevealed`'s payload, priced at 12 bytes on a channel
`tech/networking/01` costs at 23 bytes worst case, firing `collection.relicsPerArea` times per area.
That is a real wire change traded for 48 server instances and a lane-scaling client term. It is a
good trade and it is a trade, not a free win, and the sheet says so rather than presenting the
saving alone.

**The two-tiered residency: accepted.**

It closes the seam for the four things that run along a lane at zero instance cost, because a part
spanning bays 1..k is one part however many bays there are — two per lane is exactly what two per
live bay cost when only one bay was ever dressed. `N12` and `N11` do not reach it: both are scoped to
a **patch**, and `style/03`'s `whatNDoesNotReach` states the exemption for a builder who would
otherwise misapply them to a wall. The residual is correctly kept rather than argued away: a
cross-wall stands *at* a boundary, so retaining one per boundary grows without bound under `endgame`,
and each of `environment/02` `E7`, `/03` `G7` and `/04` `F11` restates its own half of the seam in
its own prohibition table instead of leaving it in one sheet. `retainedBaySeam` carries the bar-(a)
status, the reversing field and the price.

**One arithmetic slip in the reversal cost, non-blocking and not filed.**
`residency.retainedBaySeam.reversalCost` says 16 → 32. At `residentBays` 3 it is the 5 lane-tier
parts plus (cross-wall 8 — three bays share four boundaries at two parts each — plus basin 3 plus
signature 18) = **34**, so `9 × 34 + 6 + 35 = 347` against 186 of headroom. The conclusion, *does not
fit*, survives by 1.9×, so no decision moves and I am recording rather than filing it.

**Check 6 at the narrowed wording: PASS.**

*"…cited as `budgets.deviceFloor` by field and never as the brief's own."* `style/03`
`instrument.where` names `RR-P1` and the two simulated briefs explicitly; `environment/01`,
`objects/05`, `lighting/02` `V10` and `vfx/01` `budget.instrument` all cite the field. Grepped all 23
sheets for `brief's 3 GB`, `3 GB device floor` and `the brief's device floor`: **zero matches.** The
clause that round 2 nearly failed is the first one — *"total detail fits the Performance budget"* —
and it now holds at 161–185 of 186, with the arithmetic published in three keys and checkable in one
line. **The renarrowing was correct and the check is now evaluable.**

## Revision requests

### `cid/art/style/03-detail-budget.md` — the key merges asserting a breach that no longer exists
**Violates:** the acceptance-criteria invariant; check 4, the budget consistency this key exists to hold.
**Fix:** the sheet was revised for `RR-1` and then not re-derived against the siblings it now reads.
It still carries `overSubscription.status: "BREACHED at the arbitrated totals"`,
`environmentSpends: "9 * 18 + 24 = 186"`, `effectsNeeds: "17 to 35"`,
`mergedTotal: "6017 to 6035"` and `overBy: [17, 35]`; `envelope.chunkArithmetic` computes 1.13 parts
per chunk from 18; `bindingCeiling.serverCheckAtArbitratedTotals` says `16 × (646 + 18) + 24 = 10648`;
`drawCalls.atArbitratedTotals` is `(9 × 663 + 24)/f` with `minimumBatchingFactorAtArbitratedTotals`
5.991. Environment is now **16 + 20 (6 streamed)** and `effects` is **11**, so the merged total is
5,975–5,989 and the constraint is satisfied with 11–25 spare. **Acceptance criterion 2 requires
`9E + S + effects ≤ 186` to evaluate `false`; it now evaluates `true`, so this sheet fails its own
criterion against the merged manifest.** Set `overSubscription.status` to `CLOSED`, record how it
closed (Environment cut 2 per lane and struck the litter mat; VFX moved the reveal client-side,
taking 17–35 to a hard bound of 11), invert criterion 2, and re-derive the server check, the chunk
arithmetic and the draw-call floor at 16 + 6 + 11. The correct floor is
`(9 × (645 + 16) + 6 + 11)/1000` = **5.962**, not 5.991.

### `cid/art/style/03-detail-budget.md` — three paths in `citeAs.notInThisKey` do not resolve
**Violates:** check 1 — the same defect `RR-7`, `RR-8` and `RR-9` closed everywhere else.
**Fix:** `citeAs.notInThisKey` instructs readers to *"Read `environment.perLaneInstances`,
`environment.sharedInstances` and `effects.totalInstances` by field"*, and `envelope.constraint`,
`drawCalls.formula` and acceptance criterion 2 all use those three. **None of the three exists.**
They are `environment.allowance.residentInstancesPerLane`,
`environment.allowance.sharedPlaceInstances` (with `.sharedMaxStreamedConcurrently` for the streamed
sum) and `effects.budget.clientInstancesAdded`. This is the sheet that established the
instances-versus-parts citation rule and it should be able to resolve three of its own; add the
`wrongSpellingsSeenInRoundOne` block `style/01` already carries.

### `cid/art/environment/01-world-part-budget.md` — the effects reservation cites VFX's superseded figures
**Violates:** check 1.
**Fix:** `allowance.perClientReservation.effects` carries `worstCase: 35`, `realistic: 17` and
`derivation: "vfx/01 budget.clientInstancesAdded 8 + concurrentRevealObjectsOnOneScreen 27 (9 realistic)"`.
The revised `vfx/01` states `clientInstancesAdded: 11`, `concurrentRevealObjectsOnOneScreen: 3` and
`clientInstancesAreAHardBound: true` — a per-player concurrency ceiling that cannot scale with loaded
lanes because neither cue replicates. **There is no longer a worst case and a realistic figure;
there is one bound.** Reset the derivation to read `effects.budget.clientInstancesAdded` **by field**,
and either keep the 24 as a stated cushion with its own reason or release it. Releasing it funds
exactly the two things four *Flagged to the developer* tables name as first to buy back: the litter
mat (`groundwork` 4 → 5, and `environment/03`'s own flag says *"buy it back first; the place
currently has nothing that says it was left alone"*) and the retained-boundary cross-walls
(`builtEdge` 6 → 10, which closes the residual seam this round accepted). Also reconcile with
`vfx/01` which field enters the client sum — `sharedMaxStreamedConcurrently` 6 or
`sharedPlaceInstances` 20 — and name one canonical.

## What the revisions broke, and what they did not

**Broke:** one sheet, three ways, all listed above, and every one is a stale citation of a sibling's
pre-revision number rather than a new design error. That is worth naming as a process finding rather
than only as a defect: **five sheets re-resolved their cross-key paths this round and the sixth did
not, and the sixth is the one whose entire content is other domains' numbers.** A key that
deliberately allocates nothing is a key made only of citations, and it needs the sweep most.

**Did not break:** every round-1 finding I could re-test still holds. The three colour claims are
jointly satisfied at the merged value — `stone.cleared` 201.84 ≥ Lighting's 195 ≥ Objects' 188 ≥
`theme/setting/01`'s 165 — and the tool's 68.5 / 38.8 / 39.9 separations are intact now that `M6`
states `metal.cast` *"does NOT reach the held tool"*. `lighting/02` recomputed the WCAG ratio at the
merged colour rather than at its worked example and reports **2.31 : 1**; I recomputed it
independently at 2.311 and it is still below 3, still carrying `V13`. `objects/02`'s
`looseObjectInstanceCount` 0 and Environment's `P4` zero-parts row still agree. `effects.forbidden[]`
is still 31 rows. `builtEdge`, `groundwork` and `chunkDressing` still sum to the allocator's 16.
**Nothing regressed.**

**New, and outside anyone's fix:** `environment/05` has produced the sharpest cross-category finding
of the wave and it is not an art problem. **Eight of sixteen slots have no rendered lateral horizon
and no backdrop geometry can give them one**, because a 1,950-stud row is 3.8× a 512-stud streaming
radius and there are 2 studs between lanes. The levers are `budgets.streaming.StreamingTargetRadius`,
`runtime.maxPlayers` and the row arrangement in `plots`. That belongs in the final cross-category
pass beside `depths.areas[].patchCount`, and it is the second finding this wave where the honest art
answer is *"this is a place-shape decision, not a dressing decision."*

**Also new, and cheap:** `objects` filed `RQ2` against `screens` — it reads
`collection.sets[g].relics[i].name` where `collection.sets[].relics[]` is an array of bare strings.
That is a UI/UX-owned path defect found by an Art domain sweeping its own citations, and it should
travel to the `screens` owner rather than sitting in an Art sheet.

## What must happen before this category can release

1. **RR-14 and RR-15 land** — one sheet, two edits, both arithmetic. `detailBudget` cannot merge
   asserting a breach that three keys have closed, and cannot instruct readers toward three paths
   that do not exist.
2. **RR-16 lands**, or Environment and VFX name one canonical shared field between them.
3. **Everything from round 1 stays closed. No round-1 request needs reopening**, and two of them
   (`RR-6`, `RR-12`) were answered better than they were asked.
4. The three items in *Predicted cross-category conflicts* that grew this round — `RR-E1` and
   `RR-V2` as one `representation` answer, the horizon-closure finding, and `RQ2` — carry forward
   unchanged.

Given that all three requests are re-derivations inside sheets whose decisions are already
arbitrated, **round 3 should be a check, not a revision round.**
