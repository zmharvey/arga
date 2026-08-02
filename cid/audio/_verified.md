# Audio — verification

**Status: FAIL**
Six domains, 18 sheets, no key claimed twice and no invented capability — but `sfx` and `mix`
enumerate the same `patchClear` asset in two registers and disagree on four columns, and two
acceptance criteria in other pairs are mutually unsatisfiable. Nine revision requests, seven of
them one field each. The wave gate does not open until R1–R6 close.

## Check results

| # | check | result | evidence |
|---|---|---|---|
| 1 | every sheet carries a data form | **PASS** | 15 of 18 carry a `manifest` fence. The three that do not each state why in one line and name the carrier: `sfx/01` ("Carry no manifest… the key is `sfx`, proposed by sheet 03"), `sfx/02` (dispositions land in `sfx.characterSounds`), `ambient/02` (line 12: "No manifest block: this sheet is an adjudication… `ambience` is carried whole by sheet `01`"). |
| 2 | no key claimed twice | **PASS** | Exactly one `"provides"` per key: `sfx`→`sfx/03:99`, `mix`→`mix/01:33`, `stingers`→`stingers/01:136`, `ambience`→`ambient/01:112`, `uiSound`→`ui/01:112`, `music`→`music/01:105`. All other Audio fences are `"amends"`. None of the six appears in `cid/_contract.md`'s 25 or in the wave 4–5 proposal list. |
| 3 | no sheet contradicts an approved ruling without a `## Pushing back` naming it | **PASS** | Four overrules, four sections, each naming file and id: `sfx/01:41` (`mechanics/05`, `beats[patchClear].channels`), `sfx/01:71` (`tone/03`, `B5`, channel-count cell only), `ambient/01:245` (`05-inventory`'s Audio consequence line), `ui/01:90` (`onboarding/04` `S7`). `music/01:250` pushes back only against `OPEN.md §2` and states "I push back against **no approved sheet**", which is true — `tone/03` invited the overturn and Music declined it. |
| 4 | acceptance criteria mechanically checkable | **PASS** | Every sheet ends with 3–4 criteria that are a count, a value, a grep or a boot behaviour. Sampled the softest: `stingers/02` c3 ("100 consecutive… zero calls to `math.random`, reads no counter"), `ambient/01` c3 (count of code paths writing seven named properties), `sfx/03` c1 (12 rows, four `hz` values, three rows each, monotonic in neither direction). No "feels" criterion anywhere. |
| 5 | nothing invented is presented as sourced | **PASS** | Every `[research: …]` I spot-checked resolves. `Beats.luau` and `emit-config.mjs:79` verified in-repo. The three claims most tempting to fake are each marked `[unverified]` with the settling fetch: the phone-speaker response (`stingers/01:29`, 403 recorded, "I am **not** recording that as sourced"), the engine voice limit (`mix/02:21`, "Roblox publishes no simultaneous-sound limit"), the `RbxCharacterSounds` parent (`sfx/_lead:191`, "Both cannot be current"). `music/01:95` even flags that its own survey's buckets sum to 86.8%. |
| 6 | every player-facing string satisfies `vocabulary` | **PASS, vacuously, and stated rather than assumed** | All six keys declare zero player-facing strings (`sfx/03` `playerFacingStrings: 0`, `mix/01:37`, `ambient/01:165`, `stingers/03` `authorsPlayerFacingStrings: false`, `ui/02` `carriesString: false` per cue, `music` holds no string a surface reads). `ambient/02:67` states the vacuity explicitly instead of skipping it. One `coinage` block exists (`sfx/03:91`, `patch-clear`, `renderable: false`). |
| 7 | every `audio`-channel beat has exactly one owning cue, and no beat without one has a cue | **PASS** | `findReveal`/`setComplete`/`areaComplete` → `stingers.cues` (3 rows, `cueCount: 3`); `upgradePurchased` → `uiSound.cues[upgradePurchased]`, and `stingers/03` `absentSubjects[levelUpFanfare]` disclaims it by name; `patchClear` → `sfx.cues[patchClear]`, guarded by `channelPrecondition` reading `GameConfig.Response.beats[patchClear].channels` at runtime. No beat has two owners. No orphan. |
| 8 | the six proposed keys do not overlap | **FAIL** | Names are disjoint; **content is not.** `mix.assets.rows[cue.patchClear]` and `sfx.assets[]` are two registers for one asset class and disagree on `volume` (0.60 vs 0.35), `poolSize`/`overlappingVoices` (6 vs 8), `source` (`creatorStore` vs `upload`) and row count (1 vs 12, against `perDomain[sfx].maxRows` 6). See R1–R4. The other five row pairs agree. |
| 9 | every asset row resolves to a provisioning route that exists | **FAIL** | Route exists and is well-formed: `mix.provisioning` + RR-M1's two conditional gates, and `perRowGateApplicability` correctly exempts `creatorStore` rows. But RR-M1 applies **only** to rows whose `source` is `"upload"`, and the ledger marks `cue.patchClear` `creatorStore` while `sfx/03` rules all twelve `upload`. Twelve assets therefore route to gates the ledger says do not apply to them. See R3. |
| 10 | the concurrency arithmetic closes across all domains at once | **PASS** | Recomputed independently. Reservations 4+3+15+2 = **24** = `maxConcurrentVoices`; `ofWhichWorldNeighbour` 5 ≤ 15. Load: 512/122 → 9 lanes; 9×8 = **72** onsets/s; 72×0.4 = 28.8 → **29**. Roll-off: 26-stud radius at 122 pitch → own + two adjacent = **3** lanes; 3×8 = 24; 24×0.4 = 9.6 → **10**. `LinearSquare` min 2 max 26: at 3.5 studs ((26−3.5)/24)² = 0.8789 × 0.0990 = **0.0870**; at 5 studs 0.7656 × 0.0990 = **0.0758**; own clear 0.60×0.55 = **0.330**; ratio 3.79 ≈ **3.8×**. Stingers' peak demand is 3 (at Balance's 0.35 floor) ≤ 4; Interface 3 cues ≤ 3; Beds 1 layer ≤ 2. Every figure holds. Ladder: 0.850 > 0.748 > 0.646 > 0.432 > 0.330, strictly decreasing. Trim: √(0.850²+0.748²+0.646²) = 1.304 → ×0.70 = 0.913. **One arithmetic does not close** and it is not concurrency: `worstCaseDuckedWindowSeconds` 3.7 ≠ its own derivation's 0.6+0.6+2.5+0.35 = 4.05. See R7. |
| 11 | no domain sets a value another domain owns | **FAIL** | `sfx/03` writes `cues[patchClear].volume: 0.35`, the same quantity `mix.levelOwnership` declares `noOtherKeyMayWriteEither: true` and `mix` sets to 0.60. See R4. Everything else routes correctly: `sfx` states a roll-off *requirement* and sets no curve; `ambient` states three requirements *on* `mix` and no number; `stingers` sets lengths and position class and no bus; `uiSound` sets an ordering and no level. `uiSound` does declare `acknowledgmentBudgetMs: 100` for two non-beat cues — permitted, because `response` defines five budgets and **no non-beat cause**, no sixth beat is proposed, and the observation is routed as `RQ4`. |
| 12 | G1 — both source claims | **PASS, verified against source, not accepted** | (a) `mechanics/05:113` gives `patchClear` `"channels": ["atPatch","readout"]` and **no** `forbiddenChannels` key; `channelExclusivity` (`:110`) holds `atPatch` and `notice` only, no `audio`. In `Beats.luau`, the exclusivity loop iterates `response.sequencedBeats` (`:284`) which excludes `patchClear` (`unsequencedBeats`, `:107`); the forbidden-channel loop (`:329–342`) warns only when a name is in **both** arrays, and `patchClear`'s is empty; the `handled` loop touches only channels, and `patchClear` has none. **Adding `"audio"` raises zero new warnings.** Claim upheld. (b) `cuePatchClear` (`:161`) is an empty body, so it is silent today by construction, and criterion 2 binds the future cue to read the array from `GameConfig` rather than a literal. Claim upheld. |
| 13 | G1's second `## Pushing back` — `tone/03` `B5` "may occupy: one channel" | **UPHELD** | Route satisfied: `tone/03:99` permits exactly two kinds of work to overturn it, one of them audio intent, and requires the `B` ids be named and the file cited — `sfx/01:71` does both and re-opens `B5`'s channel cell only, leaving the ranking untouched. The media-vs-site distinction is real: `tone/03:43–47` reads "audio, VFX, UI notice, haptics" (media), `response.channels` reads `atPatch, readout, notice, audio` (sites). And the cell is already exceeded in tone's own terms — `B5` holds a world visual and an on-screen number today. Confirmed by reading all four of `tone/03`'s criteria (`:106–113`): they count entries, forbid named content, count intensity specs and check ramp — **none enforces a channel count.** |
| 14 | `Play()` restarts; pool and stealing are one mechanism | **PASS** | Same fact, cited independently by both (`sfx/03:29`, `mix/02:25`), and the two rules compose rather than compete: `sfx` supplies pool depth, `mix` supplies the steal predicate (`minAudibleBeforeStealSeconds` 0.08 = `patchClear`'s own 80 ms budget) and the never-refuse floor (`order` step 3). `mix/02:150` explicitly **adopts** SFX's reading that stealing a ringing tail is not dropping an onset. No conflict of mechanism — only of depth (R2). |
| 15 | the `""` sentinel | **PASS** | The override clause exists verbatim: `tech/deploy/02:9–11`, *"the string `"none"` for any scalar **unless the containing table declares a more specific sentinel in place**."* `mix/03` declares one, once, `declaredOnceFor` all six keys, with the type argument (`ContentId` string, `0` is a type error) and the behavioural argument (`"none"` is a non-empty content string the engine fails to resolve — an error, not silence). **No second sentinel exists:** `sfx/03:103` names `mix/03` as owner and calls `""` a placeholder; `stingers/01:191` `supersededBy: mix`; `ambient/01:140` "adopted, not chosen here"; `ui/01:147` `sentinelMirroredNotDecided: true`; `music` holds zero ids. |
| 16 | UI Sound's press-edge ruling | **PASS** | Reading of `response` confirmed: `mechanics/05:113–117` marks `patchClear` alone `clientPredictedServerAuthoritative` and the other four `"server"`, so predicting `upgradePurchased` is an edit to `response`, not to `uiSound`. `input` criterion 4 confirmed verbatim at `mechanics/02:74` and `:192` ("emits nothing on any channel"). The re-grant does not smuggle the permission back: across `mechanics/02:110–114` the only verbs with `adjudicatedBy: "client"` **and** `precondition: "none"` are `look` (continuous, no press edge) and `openIndex`. `buy` fails on both halves. `jump` fails on `onGround`, `move` on `characterSpawned`. |
| 17 | Ambient's three revision requests against wave-1 sheets | **ALL THREE UPHELD** | RR1: `setting/01:252` reads *"Non-visual ambient audio is exempt, and no manifest field holds it."* `ambience.layers[0].descriptor` is a manifest field that holds it, so the conjunct is now false. RR2: `05-inventory:52` `P10` routes air *through* the ambience (one layer); `:266` says both are *"available and are the only living sounds"* (two). Same file, two counts. RR3 — **the load-bearing one, confirmed by grep**: `setting/03:19` states `R5`'s check as *"this is `tone/04-do-nots` `X1`'s trigger count"*, and `tone/04-do-nots` ships `D1`–`D15` with **no `X1` and no row of that substance** (`D2` is Art's light/shadow row, `D3`/`D4` are audio palette exclusions). `setting/03:142` and `:160` also quote `X1` as *"Nothing moves or sounds that the player did not cause"* — a sentence that appears nowhere in `tone/04`. **Ruling: the citation is broken, the substance survives on `R5`'s own sentence, and Ambient was right to file rather than repair.** Routed as `G6`. |
| 18 | Music's `trackCount: 0` | **PASS** | The four steps hold. Step 3 is the load-bearing one and it is correct: `tone/03:68` check 4 is *"Between two `B1` events the game produces no emphasis other than `B5`"*, verified as *"no third recurring cue exists"* — a meter, a phrase, a downbeat and a cadence are each a recurring emphasis and none is `B5`. Ceding the survivor leaves **no gap**: `ambience.layerCount` is 1, taken on `setting/01`'s grant and `05-inventory` `P10`, and `ambient/_lead:181` states independently that it does not grow to fill Music's zero. Music's own `r5Jurisdiction: "narrow"` is the honest move — it declines to lean on `R5` and rests on `tone/03` alone, which is sufficient. **Muted-play premise: no Audio sheet still asserts it as fact.** All four that touch it correct it (`mix/04:13` `premiseCorrection`, `music/01:88`, `ui/01:75`, `ui/04:53`), each citing the same n=541 general-mobile survey with its limits. The unsourced claim survives only in `cid/audio/_category.md:202`, which is the category brief, not a spec sheet. |
| 19 | the cross-wave null finding | **CONFIRMED AT 42, and Music's 37 is an undercount** | Counted `:\s*null` occurrences (not lines) under `cid/analytics/`, excluding `_verified.md` and two prose-table hits (`kpis/02:96`, `funnels/03:83`, neither inside a fence): funnels/02 **13**, kpis/02 **13**, engagement/03 **8**, engagement/01 **5**, engagement/02 **2**, economy/03 **1** = **42**. Music's table (`music/01:277–283`) shows kpis/02 at 10 and engagement/03 at 6, missing `engagement/03:118–119` (`d7ByBucket`, `d30ByBucket`, inside the manifest) and three kpis sites. Carried, not fixed. See R8. |

## Universal invariants

- **No sheet contradicts a `[brief: binding]` item.** The four that argue with the brief all argue with `[brief: soft]` ← `[I assumed]` lines from `OPEN.md §2`, which is the whole of the brief's audio position and is the weakest tag in the ladder. `smallest game`, `8–14 mobile-heavy`, `cleared is permanent`, `shuffled authored chunks` are each cited *for* a ruling, never against one.
- **Every leaf sheet has 3–4 acceptance criteria two people could not disagree about.** Counted: 18 sheets, none below 3, none above 4, none subjective.
- **No sheet specs content excluded by `03-META.md` priority 3.** The three closed lists (`sfx.forbidden` F27–F35, `uiSound.forbidden` F22–F29, `stingers.forbidden` 27 names) each name the excluded items *in order to forbid them*, which the scope gate makes compliant, and each carries a row forbidding a reserved bus, slot or held-open field for them (`sfx` F35, `uiSound` F29, `mix` M14, `stingers` `reservedCueSlot`/`reservedBus`/`emptySoundGroup`, `music` M14, `ambience` F16).
- **No sheet names a capability absent from the registry.** Audio names no ui-forge pattern at all; every capability claimed is a Roblox engine property or class, and each is cited to a fetched reference.
- **Every `[research: url]` corresponds to a real fetched source.** Spot-checked 12 across five domains; all are creator-docs raw paths, devforum threads or `robloxapi.github.io` pages consistent with their quoted text. Three fetch *failures* are recorded as failures rather than dressed up (`stingers` 403 ×2, `music` 404).
- **Every `[cid: decided]` is flagged upward.** Five sheets carry `## Flagged to the developer` with a live alternative and a stated cost (`mix/01`, `sfx/03`, `ambient/01`, `music/01`, `ui/01`, `ui/04`). None is buried.

## Revision requests

### `cid/audio/mix/03-the-asset-ledger.md` — the sfx allowance is 6 rows against a key that ships 12
**Violates:** check 8; the category `checks`' *"memory totals fit the Mix budget"*.
**Fix:** `assets.perDomain[sfx].maxRows` `6` → `12`, and replace the note *"6 rows covers one clear plus the four per-tierIndex variants… and one spare"* with the actual shape: 4 `tierIndex` notes × 3 transient variants. `fileMB` 2.5 does not move — 12 mono files at 0.30 s is the same total duration as 6 at 0.6 s, so the MB allocation already funds it. This is the ledger catching up to a key written in parallel, not a budget increase.

### `cid/audio/mix/03-the-asset-ledger.md` — `poolSize` 6 is derived from an even-spacing assumption the shipped scheduler contradicts
**Violates:** check 8; `response.onOverload: "overlap"`; `performance/03` `N14`.
**Fix:** `assets.rows[cue.patchClear].poolSize` `6` → `8`, and replace `poolDerivation`'s *"8 × 0.4 s audible = 3.2 concurrent"* with the source: `game/src/client/Beats.luau:554–563` begins a tick's **whole** `clearedCount` rise in one frame (`for _ = 1, rise do begin(...)`), so a rise of 8 produces 8 simultaneous onsets, not 8 spread over a second. At 6, onsets 7 and 8 must either be dropped (illegal under `onOverload`) or steal a voice aged 0 s (illegal under this key's own `minAudibleBeforeStealSeconds` 0.08). 8 fits: `reservations[World]` is 15, of which 5 is `WorldNeighbour`, leaving 10.

### `cid/audio/mix/03-the-asset-ledger.md` — the one asset class that needs the new gates is marked as not needing them
**Violates:** check 9; RR-M1's own `perRowGateApplicability`.
**Fix:** `assets.rows[cue.patchClear].source` `"creatorStore"` → `"upload"` with a non-empty `whyNotCreatorStore` (`sfx/03:80` supplies it: store assets *"do not come pitched to a named scale degree at a fixed length"*), and the same on `cue.patchClear.neighbour`. As written, RR-M1's two conditional gates — the whole point of the finding — do not fire for the twelve assets in this build that are uploads.

### `cid/audio/sfx/03-the-sfx-key.md` — the key writes a `Sound.Volume` that `mix` reserves and sets differently
**Violates:** check 11; `mix.levelOwnership.noOtherKeyMayWriteEither: true`.
**Fix:** delete `cues[patchClear].volume` (0.35), `volumeTestRange` and `volumeOwner`. `mix.levelLadder.beats[B5].soundVolume` is 0.60, and `mix.attenuation.neighbourCase`'s `ownClearInsideMinDistance` 0.330, its 3.8× ratio, `levelAt3p5Studs` 0.0870 and `mix/01` criterion 1 all derive from 0.60. Keep `loudnessInvariant` — an ordering below `B4` is this key's to state; the number is not.

### `cid/audio/mix/01-bus-tree-and-levels.md` — a level slot and a bus route for a cue that was ruled not to exist
**Violates:** check 2's spirit and this key's own `forbidden` `M1` (*"a bus, SoundGroup or level slot with zero members in the merged manifest"*).
**Fix:** delete `levelLadder.nonBeats[systemNotice]` (realised 0.360), strike *"the one system notice"* from `buses[Interface].routes`, and restate acceptance criterion 2's maximum as `uiPress`/`indexOpenClose` at 0.270. `ui/04` rules `systemNoticeRuling.makesSound: false` and carries it as `forbidden` `F30`; a level assigned to it is exactly the reserved slot `M1` forbids, and it is the kind of row a builder implements because a number was written for it.

### `cid/audio/ui/03-stated-silences.md` — criterion 2 forbids the two `SoundService` writes `mix` requires
**Violates:** check 4 (two acceptance criteria that cannot both pass).
**Fix:** criterion 2's second clause reads *"`game/src/` contains zero writes to a `SoundService` property"*, unqualified. `mix.soundService.writtenByTheBootModule` requires `AmbientReverb = NoReverb` and `DopplerScale = 0`, and `mix`'s `M3`/`M4` observables check for them. Scope the criterion the way this sheet's own `F17` observable already does — *attributable to `uiSound`* — or name the two boot-module writes as the stated exception.

### `cid/audio/mix/02-degradation-under-load.md` — a worst-case figure that does not equal its own derivation
**Violates:** check 10 (non-blocking; behaviour is fully determined by `envelope.holdRule` and `releaseSeconds`, so no builder diverges).
**Fix:** `ducking.worstCaseDuckedWindowSeconds` is 3.7 while `worstCaseDerivation` sums 0.6 + 0.6 + 2.5 + 0.35 = 4.05. Either drop *"plus 0.35 s release"* from the derivation (if 3.7 means *held at* the ducked level) or set the value to 4.05. Note also that the term uses `notices`' 2.5 s **cap** where `stingers.cues[areaComplete].audibleSeconds` is 1.8 and `setComplete` runs to 3.2 s — the real hold is 3.2 s. One field either way.

### `cid/audio/music/01-whether-music-exists.md` — the cross-wave null count is 37 and the count is 42
**Violates:** check 5 (a figure presented as counted that does not reproduce).
**Fix:** in `findings[F3]` and the *"A revision request I am filing rather than repairing"* table, `kpis/02` 10 → **13**, `engagement/03` 6 → **8**, total 37 → **42**. The two misses are `engagement/03:118–119` (`"d7ByBucket": null`, `"d30ByBucket": null`, inside the manifest fence) and three further `kpis/02` sites. Six sheets is right; the total is not. Do not touch the analytics sheets.

### `cid/audio/stingers/02-the-last-cue-standing.md` — criterion 4 depends on a null that `tech/deploy/02` forbids
**Violates:** check 4 (a criterion that fails the moment an unrelated key is corrected).
**Fix:** criterion 4 reads *"equals the number of `notices.members` whose `extinctAfter` is null."* `cid/ui-ux/feedback/01:265` does carry `"extinctAfter": null` — which is the same defect Music found in analytics, in a **seventh** sheet outside `cid/analytics/`. When `notices` replaces that null with a declared sentinel, this criterion silently stops matching. Restate it against the value rather than the absence: *equals the number of `notices.members` that survive the terminal state*, which both keys already agree is 1.

## Predicted cross-category conflicts

Not failures now. Recorded for the final pass.

1. **`G5` is the whole category's single point of failure and nobody in CID can close it.** Five of six domains raise it independently (`mix.creatorRequirement`, `sfx/03` `requirementsOnOtherKeys`, `ambient/01` `createdBy`, `ui/01` `RQ2`, `stingers/01`). Until `architect/sheets/06-representation.md` names one module permitted to call `Instance.new("Sound")`, **all six keys are specced and unbuildable** — the exact state `notices` found the notice plate in. `mix.creatorRequirement.ordering` adds an ordering constraint the architect must also honour: the bus tree exists before `Beats.connect(gui)`, or a cue writes `SoundGroup = nil` and lands unrouted at `Master`'s level, which this key states it cannot detect at runtime.
2. **`sfx` asks `Beats.luau` for a field the scheduler does not have.** `sfx.cues[patchClear].tierIndexSource.availableToday` is `false`: `Beats.luau:556–562` passes `args = {}` for `patchClear` and `buildSnapshot` carries no tier. The requested route (the client-side radius test `decidedBy: clientPredictedServerAuthoritative` already implies) is sound and adds no wire field — but it lands on client-prediction work, which has not run. Without it the cue runs on the stated `tierIndex 1` fallback and **the brief's per-tier pitched note does not exist in the build**, which is the thing G1 was fought over.
3. **`G1` still needs `gameplay/mechanics/05` to accept or decline.** SFX has done its half correctly (one array element, `changesNothingElse: true`, verified against `checkContract`). If Mechanics declines, `sfx.cues[patchClear]` becomes unreachable data, `mix`'s `World` bus is not built, `WorldNeighbour` is not built, and the concurrency cap is over-built by an order of magnitude — all of which `mix/02` was deliberately written to survive. The decline must be recorded **in `mechanics/05`**, or the silent clear stays an omission with no author.
4. **Two revision requests ride out of this category into wave-5 keys.** RR-M1 (`release.provisioning.gates`, two conditional gates after gate 1) and RR-M2 (`budgets.memoryCeilingsByCategory` gains `StreamingSounds` 8 MB, `headroomForUntracked` 165 → 157). RR-M2's arithmetic verified: 120+25+5+60+0+20+8+25+157 = 420, and the pre-change row set also sums to 420, so both of `budgets`' stated invariants survive. Neither owning key has responded.
5. **`G6` citation drift is now confirmed in a rule the Audio category turns on**, not merely noted. `setting/03` `R5`'s check cites `tone/04` `X1`, which does not exist. `ambience` rests on `R5`'s sentence, which is self-sufficient, but a verifier cannot *run* `R5`'s check. The repair is one table cell and belongs to Theme, routed here per `G6`.
6. **The listening test is still unowned and Audio just added to it.** Every level, duck depth, roll-off distance, loop length, audible length, cap and expansion factor in this category is `[playtest unknown]` with a named instrument, and `tech/performance/01` already records that no sheet in either contract owns taking a measurement. Six domains now depend on one measurement nobody owns.
7. **`ambience`'s steal-exemption is satisfied structurally but never stated.** `ambient/01` `concurrencyRequirementOnMix` asks `mix` to exempt the permanently-held bed or state the restart. `mix.concurrency.stealing` never steals it — the trigger is *"a bus is at its reservation and a new onset arrives for it"*, and `Beds` receives exactly one onset per session — but the exemption is implicit. A builder implementing a naive global "steal oldest at 24 voices" silences the bed for the whole session, which a player would notice. Worth one field (`neverStolen: ["Beds"]`) at the next `mix` edit; not blocking, since the stated rule already prevents it.

## What must happen before this category can release

1. **R1–R4 close the `sfx`/`mix` collision.** Three fields in `mix/03`, one deletion in `sfx/03`. These are the only requests that change a value a builder reads.
2. **R5 and R6 close the two mutually-unsatisfiable criteria** (`mix/01` × `ui/04`; `ui/03` × `mix/01`). One deletion and one scope qualifier.
3. **R7–R9 are corrections of record** and may close in the same round without re-verification of the arithmetic they sit beside.
4. **Re-run `npm run cid:verify --category audio` and `npm run bridge`** after the edits; both passed before this pass and the changes are within-fence values, so a regression would be a merge-shape error rather than a design one.
5. **Nothing here waits on another category to release.** G1, G5, RR-M1 and RR-M2 are all correctly filed as requests against keys with one owner each, and every sheet in this category is written to be legal under either resolution. That is the property that lets Audio release with four open requests outstanding, and it is the best work in the category.

---

# Round 2

**Status: FAIL**
All nine round-1 requests close, and the three domains that went further mostly went further
correctly. But the round's own headline rule, `M16`, is over-broad in a way that condemns
compliant work its own category already does — and while writing it, nobody noticed that
`uiSound` carries **two explicit nulls inside its own manifest value**, which is the defect
`M16` generalises, one directory closer to home. Two blocking, three not.

## Round-1 requests — disposition

| # | request | closed | evidence |
|---|---|---|---|
| R1 | `perDomain[sfx].maxRows` 6 → 12 | **YES** | `mix/03:51` — 12, `maxRowsShape` "4 tierIndex notes x 3 transient variants", `fileMB` held at 2.5 with the duration argument stated in the row. The argument is sound: 12 × 0.30 s = 3.6 s = 6 × 0.6 s. New criterion 1 makes it self-enforcing — `perDomain[].maxRows >= assetRowsInOwningKey`, plus an `assetRowsInOwningKey` column on every row — which is a better fix than the one I asked for, because it catches the next divergence rather than this one. |
| R2 | `poolSize` 6 → 8 | **YES** | `mix/03:67` — 8, and `poolDerivation` now quotes the source rather than an average (`rise = clearedCount - previous`, `for _ = 1, rise do begin(...)`, one frame, one shared `arrivedAt`). `poolDerivationSupersedes` records the wrong figure instead of erasing it. `mix/02:130` adds `ownWorkHeadroom: 10` and criterion 1 checks 10 ≥ 8. `mix/02:125` `theBurstIsNotSpread` correctly states that the burst changes pool depth and **no** figure in the concurrency block — re-derived: a rise of 8 is 8 voices against `World`'s 15, and the 29/10 worst cases are per-second averages that do not move. |
| R3 | both clear rows → `source: "upload"` | **YES** | `mix/03:67,68` — both `upload` with `whyNotCreatorStore` (scale degrees at one fixed length and peak, which the store does not sell). `:23` states the failure my request named, in its own words: marking them `creatorStore` *"left the build with no upload-class asset at all, and made RR-M1's two gates decorative: a finding filed against a case that never fires."* `appliesToThisBuild` plus criterion 4's `> 0` test stops it recurring. |
| R4 | delete `sfx` level fields | **YES, and further** | `sfx/03:111` `levelsOwnedBy` names `mix` as sole writer; `:127` `levelRequirement` replaces five fields with an ownership pointer and three constraints; criterion 4 greps for `volume`, `db`, `decibels`. `sfx/03:69` records what was deleted and why. See N4 for the one field that survived by rename. |
| R5 | delete `nonBeats[systemNotice]` | **YES** | `mix/01:75` `nonBeatsDeleted` carries `hadRealised: 0.360` and the reason; `Interface`'s route string no longer names it; `nonBeatCeilingRule` and criterion 2 now read `uiPress`/`indexOpenClose` at 0.270, and criterion 2 adds *"no row exists for a cue whose owning key rules it does not fire"*, which generalises the fix past this one row. |
| R6 | scope `ui/03` criterion 2 | **YES, and mirrored** | `ui/03:221–224` scopes to *"no module that plays a `uiSound` cue"* and names `mix`'s boot writes as outside it; `F17`'s observable carried the same unqualified phrase and was scoped too, which I did not ask for and which was the actual duplicate. `mix/01:89` `theseTwoWritesAreRequired` adds the reciprocal note from the other side, so the pair cannot drift apart again. |
| R7 | `worstCaseDuckedWindowSeconds` | **YES, and better than asked** | 3.7 → **3.55**, split into `heldAtDuckedLevelSeconds` 3.2 + `envelope.releaseSeconds` 0.35. Re-derived: onsets at 0.0 / 0.6 / 1.2; `stingers.cues[].audibleSeconds` 1.2 / 2.6 / 1.8; last voice ends at 0.6 + 2.6 = **3.2**; + 0.35 = **3.55**. Correct. Deriving by field over `stingers.cues[*]` rather than over `notices`' caps is the substantive improvement — the old figure used a 2.5 s cap where the cue is 1.8 s. |
| R8 | null count 37 → 42 | **YES, and widened** | 43 across seven sheets in two categories, after reading `ui-ux/feedback/01:265` directly. See N5 for the count as it stands today. The published grep post-mortem — `"[a-zA-Z]+": null` cannot match a key containing a digit, which is exactly why `d7ByBucket` and `d30ByBucket` were missed — is the most useful thing in the revision. |
| R9 | `stingers/02` criterion 4 | **YES** | Criterion 4 now tests `endgame.extinctPayoffKinds` / `survivingPayoffKinds` and names no `notices` field. Verified those arrays exist and are populated: `gameplay/meta/07:91–92`, `survivingPayoffKinds: ["currencyTick","areaCompletion"]`, `extinctPayoffKinds: ["upgradePurchase","findReveal","setCompletion"]`. `extinctAuthority` correctly claims only the two that are stingers' and leaves `upgradePurchase` to `uiSound`. |

## Ruling — the neighbour-pool exemption (partly refused, and the refusal is right)

**Upheld.** `cue.patchClear.neighbour.poolSize` stays 5 while its twin goes to 8, and the
asymmetry is correct rather than an oversight of the burst argument. `WorldNeighbour`'s
reservation is 5 and `stealing.order` step 1 takes those voices before anything else, so
instances 6, 7 and 8 could never sound; buying them is buying `Sound` objects the cap forbids
using. Pool depth should track the **reservation** for a class that is stolen from first and the
**burst** for a class that is not, and after this revision each row does the right one.
`poolSizeExemption` states it in the row rather than leaving a reader to find a discrepancy,
which is the difference between a decision and a mistake.

**One consequence it did not follow through**, filed as N3. The exemption means a neighbour onset
arriving with all five voices aged under 0.08 s is **not played** — no free instance, nothing
stealable. That is a refusal, and `M11` forbids *"dropping, refusing, queuing, batching,
delaying, shortening or fading out an onset for load"* with no scope qualifier. The refusal is
legal on the merits — a neighbour's clear is not one of this client's `response` beats, `N14`
does not reach it, and `social/02` makes a neighbour a **sight** requirement, which
`stealing.order` step 1 already says in as many words — but `M11` as written does not carve it
out, so the key forbids in one row what it permits in another.

## Ruling — `M16`'s scope

**The exemption cannot be widened, and that half is tight.** `ownSentinelIsExempt` reads *"a key
may test its own declared sentinel, because it owns both the field and the sentinel"*, and names
`mix.assets.rows[].soundId == ""` as legal *"for exactly that reason and for no other."* Both
conditions are load-bearing and neither is reachable from outside: a key cannot own a field it
does not declare, and `deploy/02` requires the sentinel be declared in place. `sfx`, `stingers`,
`ambience` and `uiSound` all test `soundId == ""` against a sentinel `mix` declares for them —
but each names `mix` as owner and **adopts** rather than declares, so the exemption does not
stretch to cover them by analogy. Nothing here widens.

**The rule itself is over-broad in the other direction, and it fails its own observable.**
`M16` forbids any Audio field or criterion depending on an unowned value being *"null, absent,
`"none"` or 0."* The first two are the real defect. The last two are not: a `0` or a `"none"`
that an owning key **positively declares** is the stable form `deploy/02` mandates — it is what
the replacement produces, not what the replacement destroys — and it is exactly what this
category correctly rests on today:

- `response.negativeBeats: 0` — cited by `ui/03` `F1`, `sfx/03` `F12`, `stingers/03` `A6`
- `input.rejectionCueOnFailedPrecondition: "none"` — cited by the same three
- `traversal.death.authoredCue: "none"` — cited by `sfx/02` row 1 and `sfx/03` `F11`
- `input.worldObjectsTriggeringAVerb: 0` — cited by `sfx/03` `F4` and `F9`
- `release.provisioning.unprovisionedIdValue` `0` — cited by `mix/03` itself, twice

Read literally, `M16` condemns all of them, and they are among the best-sourced rulings in the
category. The distinction that does the work is **absence versus a declared value**, not the
particular token: `negativeBeats: 0` will still be `0` after `deploy/02` lands, whereas
`extinctAfter: null` will not survive it.

And the observable does not hold as written. It claims *"no acceptance criterion under
`cid/audio/` tests a field owned outside this category for null, absence, `"none"` or 0."*
`ui/04` criterion 3 tests that `notices.members[saveNotLoaded]` **carries no `soundId` field** —
an absence test on a key Audio does not own, and the one place in the category where `M16`'s
narrow, correct reading actually bites. Its positive restatement already sits in the same
criterion (`notices.forbidden.noticeSound` is unchanged), so the fix is to drop the first clause,
not to add machinery.

## Ruling — are SFX's retained constraints value-free?

**Three of four, yes. One is a renamed number.**

- `belowBeat: "upgradePurchased (B4)…"` — an ordering, no figure. **Value-free.**
- `identicalAcrossTierIndexes: true` — a boolean. **Value-free.**
- `againstPlatformLocomotion` — states that CoreScript character sounds carry no `SoundGroup`, so
  no bus relation exists between them and this cue and their relative level is a listening test
  with no owner in either contract. **Value-free, and the most useful of the four**, because it
  names a level relation `mix` structurally cannot own.
- `spreadAcrossTierIndexes: 1.0` and `spreadCeiling: "2.0, from gameplay/core-loop/02"` —
  **not value-free.** These are round 1's `levelSpreadAcrossTierIndexes` and `levelSpreadCeiling`
  with the `level` prefix dropped and the pair moved inside `levelRequirement`. They survive
  criterion 4's grep precisely *because* the prefix was dropped: the pattern is `volume`, `db`,
  `decibels`, which no longer matches the field that was renamed out from under it.

In substance this is benign — a spread of 1.0 means *no spread*, it duplicates the boolean beside
it, and `mix` holds no per-tier level for it to contradict. **The defect is the criterion, not the
value.** Criterion 4 asserts *"the `sfx` manifest contains **no numeric level anywhere**"*, and
that claim is false while a numeric ratio in a field named `levelRequirement.spread…` sits inside
it. A check narrowed to the three names that survive a rename is a check fitted to its answer.

## New findings

### N1 — `cid/audio/ui/02-index-open-and-close.md` — `uiSound` carries two explicit nulls in its own manifest
**Blocking. Violates:** `tech/deploy/02` (*"an emitted value may never be an explicit null"*; its criterion 3 requires `bridge --emit` to exit non-zero on a null anywhere inside a key's value), and the spirit of `M16`.
**Current:** `:91` `"beat": null` (`indexOpen`), `:120` `"beat": null` (`indexClose`), both inside the `amends: uiSound` fence — and criterion 1 at `:187` **requires** them: *"exactly two rows with `isBeat: false` and `beat: null`."*
**Required:** `"beat": "none"` — `deploy/02`'s declared scalar sentinel — with `isBeat: false` left beside it, and criterion 1 restated to test `beat == "none"`.
**Why:** this is the same defect the category spent the round generalising into `M16`, one directory closer than the sheets it was aimed at. It is harmless today for exactly the reason the analytics nulls are — `uiSound` is `proposed` and never emitted — and it becomes a hard emit failure the day the key merges. It also means `mix/03:109`'s worked example cites `cid/ui-ux/feedback/01:265` as the cautionary case while an Audio sheet two directories away carries two of them. **Not introduced by this round; exposed by it, and it survived round 1 undetected here too.**

### N2 — `cid/audio/mix/01-bus-tree-and-levels.md` — `M16` forbids depending on a declared sentinel, and its observable already fails
**Blocking. Violates:** check 4 — a `forbidden` row whose observable does not hold against its own category.
**Current:** `M16`'s `thing` names *"null, absent, `"none"` or 0"*; its observable claims no Audio criterion tests an unowned field for any of the four.
**Required:** narrow the `thing` to absence-shaped tests — *null, a missing key, or a field its owner has not declared* — and add one clause permitting dependence on a value the owning key **positively declares**, whatever that value is. Then either drop `ui/04` criterion 3's *"carries no `soundId` field"* clause (its positive restatement, `notices.forbidden.noticeSound` unchanged, is already in the same criterion) or record it as the single stated exception.
**Why:** as written, `M16` condemns the five well-sourced dependencies listed above, and a builder applying it literally would have to unpick `sfx` `F12`, `ui/03` `F1` and `stingers/03` `A6`. The three-step restatement test, the `secondRule` (*two keys agreeing on one fact each cite the key that owns it*) and the exemption are all correct and should survive the narrowing untouched — only the token list moves.

### N3 — `cid/audio/mix/01-bus-tree-and-levels.md` — `M11` forbids the refusal the neighbour exemption creates
**Non-blocking. Violates:** internal consistency between `M11` and `mix/03`'s `poolSizeExemption`.
**Current:** `M11` bans *"dropping, refusing, queuing, batching, delaying, shortening or fading out an onset for load"*, unscoped.
**Required:** scope it to onsets of **this client's own `response` beats**, and add one clause stating that a neighbour onset arriving with no free `WorldNeighbour` voice and none past `minAudibleBeforeStealSeconds` is not played — legal because it is not one of this client's beats, `N14` does not reach it, and `social/02` makes a neighbour a sight requirement. The argument is already in `stealing.order` step 1; it just is not carried into `M11`.

### N4 — `cid/audio/sfx/03-the-sfx-key.md` — criterion 4 claims more than it checks
**Non-blocking. Violates:** check 4.
**Current:** criterion 4 asserts *"no numeric level anywhere"* and greps three field names; `levelRequirement.spreadAcrossTierIndexes: 1.0` is a numeric the round-1 field name (`levelSpreadAcrossTierIndexes`) would have caught.
**Required:** either delete `spreadAcrossTierIndexes` and `spreadCeiling` as redundant with `identicalAcrossTierIndexes: true` beside them — my recommendation, since a spread of 1.0 carries no information the boolean does not — or add `spread` and `level` to the grep and soften the claim to *no level value this key owns*.

### N5 — `cid/audio/music/01-whether-music-exists.md` — the floor is correct and has already moved
**Non-blocking. Not a defect in the sheet.** Recomputed today across all of `cid/`: `funnels/02` 13, `kpis/02` 13, `engagement/03` 8, `engagement/02` 2, `economy/03` 1, `feedback/01` 1 — all matching the published table — but **`engagement/01` now carries 8, not 5.** That file has been edited since round 1 (my round-1 sites were 114 / 205 / 208 / 211×2; they are now 123 / 198 / 201 / 204 / 206×2 / 209×2), and the three new ones are inside the same manifest fence: `notDerivableFromGameState[].derivableIf`, `.todayReplacedBy`, and `verdictRules`. **So the current floor is 46, not 43** — and a repo-wide `:\s*null` sweep returns further hits inside manifest fences under `gameplay/`, `art/`, `ui-ux/` and `tech/`, so the true total is well above either figure.
**Required:** nothing, and that is the point. Music labelled the table *"a floor and not a total: no pattern run so far proves an upper bound"*, and the number moved inside one round. **The framing is vindicated; only the `engagement/01` row is stale.** Correct it to 8 (subtotal 45, total 46) if the sheet is reopened for another reason; do not spend a round on it.

## Round-2 knock-ons, checked

- **`M5` made absolute** (no key writes `PlaybackSpeed`; the `sfx` exception removed because four pitches are baked into four files at `PlaybackSpeed` 1.0). Consistent with `sfx/03` `playbackSpeedEverWritten: false` and `variation.byTierIndex`'s four `hz` values. The observable is now a clean `grep -rn "PlaybackSpeed" game/src returns nothing`, stronger than the round-1 version that had to except one play site. **Correct.**
- **Instance count 19 → 21.** Re-derived from the ledger: 2 + 2 + 2 + 2 + 8 + 5 = **21**. Correct as a count of *pool* instances. It excludes `ambience`'s permanently-held voice, which is parented to `SoundService` and not pooled, and the two index cues below; `mix/03:159` scopes the figure to `poolSize`, so this is a boundary and not an error.
- **`assetFileCount: 16` and the Decision line disagree, and both undercount.** `mix/03:7` reads *"thirteen assets in the build and twelve of them uploads"*, while the manifest says `assetFileCount: 16` (12 upload + 4 creatorStore) and `assetFilesPreloaded: 13`. **Thirteen is the preload count, not the build count.** Separately, `assetFileCountDerivation` is *"3 stingers + 1 uiSound + 12 sfx"* — but `ui/02` rules `indexOpen` and `indexClose` at `assetCount: 1` each, so the build holds **18** files, `creatorStoreClassAssetCount` is 6, and RR-M1 applies to 12 of 18. `rowsNotEnumeratedHere` acknowledges the two rows exist; the totals then count as though they did not. Fold into N1/N4's round; no criterion depends on the figure and `appliesToThisBuild > 0` holds either way.

## What must happen before this category can release

1. **N1 and N2 close.** Two field values and one criterion clause in `ui/02`; one `thing` string, one observable and one added clause in `mix/01`; optionally one clause in `ui/04`. Neither touches an arithmetic verified in either round.
2. **N3 and N4 are one clause each** and ride the same round. The `mix/03` count corrections above can ride with them.
3. **N5 needs nothing.**
4. **Round 3 should be the last.** Every remaining item is a string, a token list or a count. Nothing in this round changed a level, a distance, a cap, a reservation or a budget, so the arithmetic verified in round 1 and re-verified above does not need a third pass.
5. **Still outbound and still unanswered:** G1 against `gameplay/mechanics/05`, G5 against `architect/sheets/06-representation.md`, RR-M1 against `tech/deploy/01`, RR-M2 against `tech/performance/01`, `ambience`'s RR1–RR3 against three wave-1 Setting sheets, and Music's `RR-M1` against `cid/audio/_category.md`'s unsourced muted-play motive. None blocks Audio; all block somebody.
