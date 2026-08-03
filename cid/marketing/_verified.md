# Discovery & Marketing — verification

**Status: FAIL**
Six revision requests, all mechanical or citational, none requiring a re-decision. No check is
blocked on an unrun domain, so this category can clear in one round. The wave gate does not open
until requests 1–4 land; 5 and 6 are one-line corrections.

## Check results

| # | check | result | evidence |
|---|---|---|---|
| 1 | `T0` — every outward claim is a row with a `backedBy` resolving to a real key path, sheet id or file | **FAIL, 1 row of 18** | 17 rows resolve (verified: `lore/01:8-9` carries *"the stone was always sound under the green"* across two lines; `patch.material: "Grass"` at `art/objects/01:23`; `styleGuide` stone `[216,201,169]`; `tiers[0] [104,142,76]`; `movement.baseClearRadius` at `mechanics/01:23`; `products.axesSold` at `monetization/01:105`; `F6` `:147`, `F17` `:158`, `F19` `:160`; `setBonus` at `meta/03:61`; `lighting.properties.ClockTime 15.5` at `default.project.json:76`). **`name/03:106` `G1.backedBy` names `collection.total`, which does not exist** — the `collection` key holds `className`, `classPlural`, `relicsPerArea`, `areasPerDepth`, `sets` and no `total` (`meta/02:56-69`) |
| 2 | `T1`–`T10` over the collected rows | pass | No row's text matches a predicate. Checked hardest: `storeListing` `C5` *"Ground you clear stays clear. It never grows back."* against `T1`/`T2`/`T9`; `C7` and `P3` (24/24 without buying) against `T3`/`T10`; `title.tagline` against all four it can trip; `storeIcon` `IC1`–`IC5` name no Find, set or price. `channels.outreach.claims` and `launchBeats.claims` are `[]`, vacuously clear |
| 3 | *finished work is never asked for twice* is a true claim | pass | `01-FOUNDATION.md` *"Cleared is permanent"* `[you chose: R2 Q1]`; `theme/fantasy/02` supplies the outward form. No merged key carries a regrowth, decay, reset or upkeep field. Rendered at `storeListing.S3.L5`, `tCleared: [T1,T2,T9]` |
| 4 | **24/24 reachable owning zero products** is a true claim | pass | `products` `F17` verbatim at `monetization/01:158`: *"no product clears a patch, completes an area, or grants a Find; 24/24 is reachable owning zero products"*. `itemCount: 1`, `axesSold: ["radius"]`. Rendered twice, at `S4.L7` and `passListing` `P3`, from two sides, with no double-count |
| 5 | the six keys do not overlap | pass | One `provides` each: `title` (`name/01`), `storeIcon` (`icon/01`), `storeThumbnails` (`thumbnails/01`), `storeListing` (`store-page/01`), `channels` (`social/01`), `launchBeats` (`hype/01`). Nine amendment blocks carry `amends` with no `provides`; `bridge/merge.mjs:104` recognises an amendment by its field wherever it appears, so `store-page/02`–`05` using a ```manifest fence is tolerated rather than a merge error |
| 6 | Social's cross-key invariant: summed external urls, Discord invites, social handles and Roblox community ids across the six manifest values is 0 | **FAIL as written, holds in substance** | Zero `discord.gg`/`discord.com/invite`, zero `tiktok.com/@`, zero `x.com/` handles, zero community ids — the substance holds. But `channels.platformRules[].source` itself carries `https://discord.com/terms`, `https://www.tiktok.com/legal/...` and `https://www.youtube.com/t/terms`; `title.candidates[].backedBy` carries eight `roblox.com` urls; `storeThumbnails.platform.sources[]` three; `launchBeats.beats[0].backedBy` one. `social/01` criterion 2 counts *"external urls … appearing in any manifest value"* and is falsified by its own key |
| 7 | no artifact is producible from a build that does not exist, and where one is not that is stated | pass | `storeIcon.productionRoute.producibleToday: false` with two gates, both `satisfiedToday: false`; `storeThumbnails.captureGate.allRowsPass: false`, `rowsPassingToday: 1`; `launchBeats.trailer.trailerVideoCount: 0`, `captureSource: "none"`. Every one states it rather than assuming it away |
| 8 | the capture gate's ten rows verify against `cid/art/` and `game/src/shared/Theme.luau` | pass | `C1` `Theme.luau:3,10,12,22` read `cartoon-vibrant`, `archetype`, `Pet Ascend Simulator`, `#2B1B4D` — exact. `C5` `Plots.luau:534` is `slab.Material = Enum.Material.Slate` with zero `slab.Color` — exact. `C9` `default.project.json:62-79` is `Ambient [0.32,0.31,0.27]`, `OutdoorAmbient [0.45,0.43,0.38]`, `Brightness 2`, `ClockTime 15.5`, zero `Atmosphere`, zero `Clouds` — exact, and it is the one passing row. The `A3`/`A4` correction is right: `A4` carries `refusable: true` (`ui-art/01:154`), `A3` does not |
| 9 | `M1` is filed exactly once | pass | Exactly one `briefRevision` object exists across `cid/marketing/**`, at `thumbnails/03:126`, `against` `05-OUTWARD.md`, `filedBy` itself. `icon/01:47` cites it and declines to file; `store-page/01` files none |
| 10 | the `findReveal` dwell object is rejected on that object's own key values | pass | `art/vfx/01:254` `readsAsTheFind: false`; `:255` gives the reason in the key itself; `colorRole`/`materialRole` are both `stone.cleared`; `motion` false on all seven fields; `namePresent` false; `art/_category.md` row 21 marks it `[does not exist]`. Every ground is that key's own value, none is taste |
| 11 | `title.value` authoritative, `uiTheme.sourceTitle` mirroring, revision accepted in advance | pass | `ui-art/01:65` *"is accepted in advance, it moves one field and criterion 1's literal"*. `name/01` states the direction and does not edit that sheet |
| 12 | the glyph ruling is made on occupancy, not permission | pass | `name/02:16-26`. The platform quote *"one or two well-placed emojis isn't harmful"* is fetched and cited **against** the ruling, then the ruling is made on the family's uniform. This is the right shape and the sheet says so |
| 13 | Name recommends rather than ratifies | pass | `ratified: false`, `ratifiedBy: "the developer, per OPEN.md section 3"`, three live options in `## Flagged to the developer`, `preRatificationChecks` `P1`/`P2` `owed` and blocking ratification not merge |
| 14 | Name's three grounds against `Ruin Restoration` | **FAIL on ground 3** | Grounds 1 and 2 hold. Ground 3 — *"restoration asserts an end state `T2` falsifies"* — makes `storeListing.S1.L2` *"A restoration game."* a `T2` violation, yet `store-page/01` clears that same line with `tCleared: ["T1","T2","T4"]` and `store-page/02` places `restoration` as its first keyword under a `## Pushing back`. Two leaf sheets in one category apply one predicate two ways to one word |
| 15 | slot count 1 | pass, and it is right rather than merely defensible | Two active slots turn on personalisation, whose objective is qPTR; `00-CORE.md` declines retention and revenue by name and `analytics` `E5` forbids acting on either. There is no opt-out short of deactivating. The count is also overdetermined by genre evidence counted from the media endpoint: the 38.6M-visit reference ships 1, `Scrap` ships 1, and the 6-image game is four years old with an update stream this game does not have |
| 16 | genre `Adventure / Scavenger Hunt`, three-month lock, cost in two halves | pass | `Scavenger Hunt` is in the banked 17/40 vocabulary at `cid/_research/pack.md`, not invented. Both competitors verified at `Simulation / Incremental Simulator` from the platform API. Cost stated in two halves, the second (absence from the `Simulation` browse surface) explicitly marked as one the brief did not price. `## Pushing back` correctly claims to implement, not overrule |
| 17 | no duration anywhere, both figures recorded | pass, and the arithmetic reproduces | `meta/04:21` states *"Eight laps is 1,265 s"* = 21.08 min. `monetization/01`'s ×1.75 column sums 93.5+85.2+91.8+93.0+(89.9×4) = **723.1 s** = 12.05 min. Both figures are real and they differ by a purchase, which is the reason. `core-loop/04`'s *"minute 11"* appears nowhere in the key |
| 18 | maturity `Minimal` derived across all 15 categories | pass — the strongest derivation in the category | Every row carries a `backedBy` and a runnable `check`. `Mild` declined as *"a false disclosure in the safe direction"*, which is the correct reason. Rows 12 and 13 rest on `F3`/`F5` plus two `PolicyService` calls at `callCount: 0` |
| 19 | the under-13 `AnalyticsService` question is a negative result, not an answer | pass | `analyticsUnder13Suppression.state: "unverified"` with `negativeResult` reading *"an absence of evidence, not a finding of no suppression"*, and the settling fetch named. Exactly right |
| 20 | `RR-H1` and `RR-C1` compose to six rows and do not overlap | pass | `RR-H1` is the private→public visibility row; `RR-C1` (`liveops/community/02:112`) is the maturity questionnaire row `P5`. Distinct surfaces. `hype/01` carries `revisionRequestsCitedNotFiled` with `citedNotDuplicated: true` and files no duplicate. 4 + 1 + 1 = 6 |
| 21 | acceptance criteria are 2–4 and mechanically checkable | **FAIL, 3 sheets** | All fifteen sheets carry exactly 4. Three cannot be run: `thumbnails/01` #3, `name/01` #3, `name/03` #4 — see requests 2, 3 and 1 |
| 22 | every player-facing string satisfies `vocabulary` where it binds | pass | Ruling `M-B` scopes it: `bannedWords` binds outward, the mechanical rules do not, and the mechanism is verified — `crossCuttingProblems()` applies `maxLabelChars` only over `playerFacingStrings()`, ten `GuiObject` paths inside `game/src`. Zero banned words in the title, the tagline, seven description lines, the pass description and one alt text. The alt text measures 18 words, longest word 10 characters, against its own 20/12 ceiling |
| 23 | nothing invented is presented as sourced | pass, with one arithmetic slip | Six spot-checked source strings all present in `cid/_research/pack.md`. `icon/_lead` records a 512×512-PNG-under-1MB figure as **not** sourced; `store-page/_lead` records a Rolimons tag list as **not** sourced; `icon/01` marks `format` and `maxBytes` `"unverified"` with a settling fetch. Slip at `icon/01:32` — see request 5 |

## Universal invariants

- **No sheet contradicts a `[brief: binding]` item.** The only approach is `store-page/02`'s genre, which carries a `## Pushing back` that implements the line's operative half against a closed vocabulary containing no `restoration`.
- **2–4 acceptance criteria per leaf sheet:** all fifteen carry four. Three are not runnable (requests 1–3).
- **No sheet specs priority-3 content.** Every mention is in order to forbid: `X9` (name), `variants` (icon), `X3` (thumbnails), `E7`/`E12` (store page), `U2`–`U4`/`U9` (update notes), `C9`/`C10` (channels), `S3` (hype).
- **No sheet names an absent capability.** The six keys name no ui-forge pattern; the one build claim (`IndexScreen.luau` renders today) is a shipped file.
- **`[research: url]` tags:** every repo-internal citation I could resolve resolves exactly, including four line-precise ones. Six external sources sampled against the banked pack, all present.
- **`[cid: decided]` flagged upward:** every one sits in a `## Flagged to the developer` table with live alternatives and a recommendation. `M-A`, `M-B` and the `T10` outward extension are flagged at the category. None is buried.
- **Data form:** fourteen sheets carry a `manifest` or `amends` fence. `icon/02` carries neither and states why — but see request 6, the phrasing misses the parser.

## Revision requests

### 1. `cid/marketing/name/03-the-tagline.md` — `G1` is backed by a key path that does not exist
**Violates:** `T0`; acceptance criteria must be mechanically checkable
**Current:** `claims[G1].backedBy` = `"collection.total (24); …"`, `check` = `"collection.total == 24 …"`, `promise.supplyBackedBy` = `"collection.total"`, criterion 4 = *"`title.tagline.promise.supply` equals `collection.total`"*, and the prose at line 48 cites it too.
**Required:** replace all five with `sum(len(collection.sets[i].relics))`, which is what `store-page/01` criterion 4 already uses and what `meta/02:62-67` actually holds. The `collection` key has `className`, `classPlural`, `relicsPerArea`, `areasPerDepth`, `sets` — no `total`.
**Why:** this is the one claim in the category carrying the headline number, and its backing does not resolve. `T0` is the category's central claim to being verifiable; a phantom path in the row that states 24 is the exact failure it was written to catch.

### 2. `cid/marketing/thumbnails/01-the-slot-set.md` — criterion 3 names two fields the manifest does not have
**Violates:** acceptance criteria must be mechanically checkable
**Current:** *"`slots[].pixelSize` is `[1920, 1080]`, `format` is a member of `platform.formatsPermitted`"*. The single slot row carries `ordinal`, `id`, `claim`, `backedBy`, `captureSource`, `composition`, `overlayText`, `altText`, `file`, `uploaded`, `active` and no `pixelSize` or `format`; both live at `platform.pixelSize` and `platform.formatChosen`.
**Required:** repoint to `platform.pixelSize == [1920,1080]` and `platform.formatChosen ∈ platform.formatsPermitted`, or add the two fields per slot. Either is one edit.
**Why:** the criterion returns undefined today, so the sheet cannot pass its own gate and a later reader cannot tell whether it failed or was never run.

### 3. `cid/marketing/name/01-the-title.md` — the emitter path's first arrow is not code
**Violates:** *"nothing invented is presented as sourced"*; acceptance criteria must be checkable by a named owner
**Current:** `authority.path` = `"title.value -> ctx.title (concept/src/derive/game-context.mjs:136) -> …"`, and `name/_lead` states *"`title` is not an orphan key … The path exists end to end in code read this run."* Line 136 reads `title: concept.title` — the **stage-0 concept object**, not any CID key. Nothing in this repo reads a merged `title.value`. `bridge/test/theme-archetype.test.mjs`, which `authority.rule` says *"reads `title.value` once this key is merged"*, does not exist; `bridge/test/` holds `bridge.test.mjs` and `context.test.mjs`.
**Required:** state the missing step as a hole in the same form the other five domains use — `storeIcon` `G-I3`, `storeThumbnails` `fileOwnership.keyReachesNothingToday`, `storeListing` `emitter: "none"`, `channels.emitter.exists: false`, `launchBeats.emitterHole`. Either name the work that writes `title.value` into a context, or record `title` as reaching nothing today. Criterion 3 then either names that owner or is restated as a post-emission check.
**Why:** two builders diverge materially. One reads this sheet and concludes `title` already emits; another reads `M6` and concludes someone must add a step. `art/ui-art/01:60` makes the same claim and is approved, so this is not solely Name's error — but Name is the sheet that turned it into an acceptance criterion.

### 4. `cid/marketing/store-page/01-the-claim-ledger-and-the-description.md` — the mirrored blocks are not a strict subset
**Violates:** the sheet's own `blocksMirrored.checkedBy` — *"for every field present in both, the values are equal"*
**Current:** `contentMaturity.analyticsUnder13Suppression` is the **string** `"unverified"` here and an **object** `{state, negativeResult, isTheWave5AnalyticsOpenItem, settledBy}` at `store-page/03`. Separately, `passListing.published` and `.publishedGate` sit at `passListing.*` here and at `passListing.provisioning.*` in `store-page/04`.
**Required:** mirror `analyticsUnder13Suppression` as the object or drop the field from the mirror; move `published`/`publishedGate` under `provisioning` to match `04`, or drop them.
**Why:** the strict-subset equality is the mechanism that keeps five sheets from drifting on one key. A type mismatch and two path mismatches make it fail the first time anyone runs it, which is the moment the mirror stops being trustworthy.

### 5. `cid/marketing/icon/01-the-one-icon.md` — the tool exclusion's arithmetic is wrong for one of the two figures
**Violates:** *"excluded by arithmetic, not by taste"*, the sheet's own standard
**Current:** *"head luma **163.01** and grip **94.46** … put **both** inside the gap between stone (195.84–201.84) and `tiers[0]` (123.11)"*. 94.46 is **below** 123.11, not inside that gap; under `02` `L2`'s 40-luma band rule the grip sits 28.65 from `tiers[0]` and merges with overgrowth rather than adding a band. The same paragraph's canopy row cites `tiers[3]` 69.57, but the composition carries only `tiers[0]`, against which canopy separates by 63.80 and would be a legal third region — excluded by `L3`'s cap of 2, not by the separation arithmetic.
**Required:** restate both exclusions on the operative ground — the head at 163.01 falls within 40 of **both** regions and so bridges them, and canopy is a third region against `maxRegions: 2`. Keep the second tool ground (every surveyed competitor ships one) unchanged; it carries the row on its own.
**Why:** the count is 0 either way, so no builder diverges — but this sheet's authority rests on subtraction, and two of its three subtractions do not compute. Cheap to fix, and expensive to leave in a sheet that says *"not by taste"* twice.

### 6. `cid/marketing/social/01-no-off-platform-presence.md` — criterion 2 counts citation urls and is falsified by its own manifest
**Violates:** acceptance criteria must be mechanically checkable
**Current:** *"the number of external urls, Discord invites, social handles and Roblox community ids appearing in any manifest value is **0**"*, while `channels.platformRules[].source` carries `https://discord.com/terms`, `https://www.tiktok.com/legal/…` and `https://www.youtube.com/t/terms`, and four sibling keys carry sourcing urls in `backedBy`, `sources[]` and `settlingFetch`.
**Required:** scope the count to fields that are not `source`, `backedBy`, `sources`, `settlingFetch`, `settledBy` or `researchOwed` — or restate it as the substance you actually mean and already verified: zero `discord.gg`/`discord.com/invite`, zero `tiktok.com/@`, `youtube.com/@` or `x.com/` handles, zero Roblox community ids. Mirror the same narrowing into `invariants[1]`.
**Why:** as written, the one check this key offers the other five fails on the first grep, and a reader cannot tell a cited source from a channel. The invariant is the useful part of an otherwise empty key; it should survive being run.

### 7. `cid/marketing/name/01-the-title.md` — ground 3 makes an approved sibling line a `T2` violation
**Violates:** *no sheet contradicts a ruling in a sibling leaf sheet without a `## Pushing back`*
**Current:** *"**(3)** *Restoration* asserts an end state, and `T2` falsifies it."* `storeListing.S1.L2` is *"A restoration game. …"* and clears `T2` at `store-page/01` with `tCleared: ["T1","T2","T4"]`; `store-page/02` makes `restoration` its first keyword and its whole positioning argument.
**Required:** narrow ground 3 to what it can carry — *"`<Noun> Restoration` reads as a finished-state claim in a title, where a description sentence can qualify it and a two-word title cannot"* — or withdraw it. Grounds 1 and 2 already carry the recommendation.
**Why:** as written, one predicate is applied two ways to one word inside one category. A reader enforcing `T2` as Name states it must strike the sentence that carries the game's binding positioning from the platform's highest-value discovery slot. That is a bar-(a) outcome reached by a reasoning error, not a decision.

## Predicted cross-category conflicts

Recorded for the final pass; none is a failure of this category now.

1. **`collection.total` is a phantom path with three spellings across the repo.** `liveops/events/_lead:101`, `liveops/events/01:90,193` and `ui-ux/store/01:126` all cite `collection.total`; `ui-ux/hud/02:185,186,239` cites `config.collection.totalFinds`; the key itself has neither. Request 1 fixes Marketing's instance only. The cross-category pass should decide whether `collection` gains a derived `total` or all six sites move to the sum.
2. **`art/ui-art/01:60` asserts the same `title.value → ctx.title` wire.** Approved in wave 6. Fixing `name/01` alone leaves an approved sheet claiming a path that is not code.
3. **`release.publishChecklist` is owed three rows, not two.** `RR-H1` (visibility) and `RR-C1` (maturity) are filed and compose to six. `store-page/01` and `/03` additionally state that the description, the genre and the questionnaire are publish-time steps the checklist does not cover, and `thumbnails/02` files `RR-T1` for the thumbnail upload. `release` AC1's row count is under pressure from four directions in two categories; only two have filed.
4. **Slot 1 is contested if the capture gate ever closes.** `launchBeats.trailer` records that an approved video takes detail-page slot 1 regardless of `storeThumbnails.order`. `storeThumbnails` sets `appendOnly: true` with ordinal 1 as the first image. Both keys state the seam; neither owns it.
5. **`theme/tone/02`'s *"group posts"* row is now vacuous** — `channels` ruled the surface out of existence, and `social/01` records it rather than editing. Register work must decide whether a forbidden surface with no referent stays.
6. **`vocabulary`'s scope sentence excludes outward strings while ruling `M-B` makes its ban list bind them.** Flagged by `thumbnails/04` and by category gap `M5`. `M-B` is `[cid: decided]` and reversible by the developer in one line; if reversed, eight forbidden-word rows across four sheets change at once.
7. **`storeThumbnails.secondHalf` makes the index panel an outward artifact.** `screens` and `composition` now own a scrim decision that a stranger sees before playing. `thumbnails/03` states the dependency and sets none of their values, correctly, but nobody has answered it.

## Notes not rising to a request

- `thumbnails/_lead:72` and `thumbnails/03:24` write `effects.beats[findReveal]` in prose; the real path is `effects.cues[findReveal]` (`art/vfx/01:156`). Both manifests use `cues` correctly, so no `backedBy` is affected.
- `icon/02:15` states *"This sheet carries no `manifest` block"* with backticks around `manifest`. `bridge/verify-sheets.mjs:259` matches the bare string `carries no manifest block`, so the backticks defeat the exemption and the sheet will surface in the no-data-form warning list. One-character fix; a warning, not a failure.
- `store-page/03` sets `categoriesAtNone: 15` while seven of the fifteen rows answer `"no"` rather than `"none"`. Criterion 1 accepts both tokens, so the count is consistent; the field name is looser than its contents.

## What must happen before this category can release

1. Requests 1, 2, 3 and 4 applied — three unrunnable acceptance criteria and one broken mirror. All four are single-field edits by the owning sheet's writer.
2. Request 7 applied by Name, or `store-page/01` `C2` re-diffed against `T2`. One of the two sheets is wrong about one word and they cannot both stand.
3. Requests 5 and 6 applied — arithmetic and scope corrections that cost a sentence each.
4. `npm run cid:verify` re-run after the edits, including the `icon/02` backtick note, so the no-data-form warning list is empty rather than explained.
5. Nothing here waits on another domain. Live Ops ran and is cited correctly throughout; Art, Gameplay and Tech are approved and every value read from them reproduces.

---

# Round 2 — re-verification after revision

**Status: FAIL**
Six of the seven round-1 requests are closed and I re-derived every one of them rather than
accepting the writers' reports. The category does not release, on one finding: **`hype/` never ran
this round, and it is the one domain still pinning `publishChecklist` row `P5` and asserting an
absolute row count** — against an orchestrator ruling that binds this category, against
`liveops/community/02` which withdrew that ask, and against the four sibling Marketing sheets that
de-pinned. `release` is handed two contradictory numbering instructions by one category. Four
further sheets carry line-precise repo citations that were true when written and are false now.
Nothing is blocked on an unrun domain, so this closes in one more round.

## Round-2 check results

Re-run against the current files. Checks not listed were re-confirmed unchanged and their round-1
evidence still reproduces (`Theme.luau:3,10,12` still reads `cartoon-vibrant` / `Pet Ascend
Simulator`, so check 8's `C1` still fails as stated; `meta/02:62-67` still holds four sets of six).

| # | check | round 1 | round 2 | evidence |
|---|---|---|---|---|
| 1 | `T0` — every outward claim resolves | FAIL, 1 of 18 | **pass** | `name/03`'s `G1.backedBy` is now `["collection.sets", "cid/gameplay/meta/02-the-collection.md"]` and its `check` is `sum(len(collection.sets[i].relics)) == 24` (`name/03:130`). `meta/02:62-67` holds `terrace`/`cistern`/`vault`/`spire`, six relics each — I counted the arrays, 4 × 6 = 24. Grep for `collection\.total` over `cid/marketing/**`: every surviving occurrence is a negative citation (naming it in order to forbid). Zero `backedBy`, `check` or `supplyBackedBy` values contain it |
| 5 | the six keys do not overlap | pass | pass | Re-run. Exactly six `"provides":` in `cid/marketing/**`, one per key, one per file. No new `provides` was introduced by any of the four writers |
| 6 | Social's cross-key invariant | FAIL as written | **pass, and I broke it myself before passing it** | I ran all ten patterns over `cid/marketing/` independently: **0 matches, every one**. Positive control confirms the anchoring is load-bearing rather than the corpus being empty — the unanchored `x\.com/` matches 155 times across 22 files, and `(^\|[^a-z0-9.])x\.com/` (leading class only, no trailing class) still matches 7 lines including `social/01:272`'s `U1` and `social/_lead:163`. Adding the trailing class `[A-Za-z0-9_]{1,15}([^A-Za-z0-9_/]\|$)` takes it to 0, which is exactly the citation-versus-handle distinction the sheet claims. The `roblox.com` question resolves correctly: the only occurrence of the literal `x.com` inside `roblox.com` is preceded by `o`, which is inside `[a-z0-9.]`, so the leading class excludes it — confirmed against 23 banked `roblox.com/games/[0-9]` urls in the same files. `invariants[1]` (`social/01:251`) mirrors the criterion. Criterion 3's *"every `source` appears in `cid/_research/pack.md`"* also holds: all eight `platformRules[].source` patterns are banked |
| 14 | Name's three grounds against `Ruin Restoration` | FAIL on ground 3 | **pass** | `name/01:45-56` withdraws ground 3 explicitly, states the replacement rule (*"`T2` is tripped by a world-outcome claim and never by a genre noun"*), and retains the narrow claim as data at `predicateReadings[0].narrowClaimRetained`. Candidate `C4` now reads *"passes, including `T2`"*. `store-page/01`'s `t2Predicate.appliedTo[2]` says the same thing from the other side. The two sheets now agree on one reading of one predicate, which is what the check asked for |
| 20 | `RR-H1` and `RR-C1` compose to six rows and do not overlap | pass | **FAIL — and the check is wrong; see below** | `liveops/community/02:145` withdrew the `P5` ask (*"My first draft asked for `P5` and stated a `4 → 5` row count"*) and files `F-C4` naming ten stale citations across six Marketing files. Four sites still assert the withdrawn form, all in Hype, which did not run: `hype/01:259` `effectOnReleaseAC1` = *"RR-C1 already moves the row count from 4 to 5; this moves it to 6"*; `hype/01:263` describes RR-C1's ask as *"a fifth publishChecklist row `P5`"*; `hype/01:287-291` repeats both in prose; `hype/_lead:150` says *"the two rows become `publishChecklist` `P5`/`P6`"*. Meanwhile `thumbnails/01:287`, `thumbnails/02:165-167`, `thumbnails/04:180` and `icon/01:191-196` all now read *"id assigned by `release`"* / *"at least one row beyond `P4`"* |
| 21 | acceptance criteria 2–4 and mechanically checkable | FAIL, 3 sheets | **pass, with one ambiguity — see request R2-4** | All three named criteria are now runnable. `thumbnails/01` #3 repoints to `platform.pixelSize` and `platform.formatChosen` and adds a byte-identity test on `slots[].captureSource`, which the writer made satisfiable by splitting the gloss out into `captureSourceRule` (`:161-162`) rather than weakening the criterion — the right direction. `name/01` #3 asserts `emitter.keyReachesNothingToday` and `authority.wireExists`, both present. `name/03` #4 is rescoped to `backedBy`/`check`/`supplyBackedBy` values, which is not cosmetic: `name/03:122` carries `"refuses": "the collection.totalRelics field …"`, and `collection.totalRelics` contains `collection.total` as a substring, so an unscoped criterion would still self-falsify. **Correction to round 1: there are 16 leaf sheets, not 15.** All 16 carry exactly 4 |
| 23 | nothing invented is presented as sourced | pass with one slip | **FAIL, 3 sheets** | The round-1 slip is fixed and I reproduced every figure (below). But three sheets now assert that a named file and line says something it does not, because the orchestrator corrected those files this round. See R2-1, R2-2, R2-3 |
| — | store-page mirror is a strict subset (round-1 request 4) | FAIL | **pass** | The writer made no edit and pushed back. **The pushback is correct.** I walked all 25 mirrored leaves myself against the four amending sheets, not the writer's summary. `discovery`: 7 leaves, all identical at `02:103-139`, including `keywordSurface` byte-for-byte. `contentMaturity`: 7 leaves, all identical at `03:95-104`, and `analyticsUnder13Suppression` is **absent from the mirror**, which is one of the two round-1 defects. `passListing`: 6 leaves — `description.statesFactorNumber`/`.statesPrice` at `04:111,113` and `provisioning.published`/`.publishedGate` at `04:202-203`, both nested, which is the other round-1 defect. `updateNotes`: 5 leaves, all identical at `05:85-91`. No type mismatch, no path mismatch, no field in the mirror absent from its amender. (The writer counted 21; I count 25. The discrepancy is in the counting convention, not in the result) |
| — | `icon/02` data-form exemption (round-1 note) | note | **note withdrawn — the round-1 note was wrong** | The writer pushed back and is right. `icon/02:14` reads `**This sheet carries no manifest block**` with no backticks, and `:153` states it a second time. `bridge/verify-sheets.mjs:259` matches `/##\s*No manifest block\|no data form\|carries no manifest block\|supplies no value/i`; line 14's inner text is contiguous, so it matches and the sheet is skipped. No edit was needed and none was made |

## Findings I verified independently rather than accepting

**The icon arithmetic reproduces at every figure, and the exclusion is robust.** I recomputed
Rec.601 from the source triples rather than checking the subtractions: head `[178,160,133]` →
162.304; head-as-`styleGuide`-had-it `[190,158,118]` → 163.008; grip `[118,88,66]` → 94.462;
`tiers[0] [104,142,76]` → 123.114; `stone.built [210,195,163]` → 195.837; `stone.cleared
[216,201,169]` → 201.837; `canopy.leaf [52,66,44]` → 59.306. Every rounded value in the sheet is
correct. The three exclusion subtractions then hold: 39.19 and 33.54 at 162.30, 39.90 and 32.83 at
163.01 — all four under 40, so the head is inside a 40-luma band of **both** regions under every
assignment, which is what makes `L4` unsatisfiable and `L3` the fallback. 63.80 for canopy clears
the floor, so `canopyAreaPct` correctly cites `maxRegions: 2` and not a separation failure. 28.65
for the grip is inside one band, so dropping it as a ground was right. `realisedSeparationLuma`
72.73 and the 78.73 best case both reproduce. **Round-1 request 5 is closed on better ground than
it asked for** — the writer found the inherited figure itself was wrong, which the request did not.

**Every `[research: url]` in the revised Name sheets is a real fetched source.** The Name writer had
no fetch tools, so this was the invariant most at risk. All 14 experience and catalog urls in
`name/01`'s occupancy table resolve to `##`-headed sections in `cid/_research/pack.md` — I checked
by asset id and by slug (`Lush-Overgrown-Showcase`, `Overgrowth-Cape`, `Star-Ruins-Spirit-Forest`,
`Ruins-Realm`, `FNaF-The-Ruins`, `Find-the-Objects` all appear as banked fetch headings). Nothing is
a plausible-looking url.

**`name/01`'s repo claims are exact where they matter.** `game-context.mjs:136` is `title:
concept.title`, and `:133` confirms the object's provenance is `${concept.slug}.concept.json`. Glob
for `**/*.concept.json`: no files. `bridge/test/` holds exactly `bridge.test.mjs`,
`context.test.mjs`, `refs.test.mjs` — three, as the sheet says and as round 1 got wrong.
`theme-archetype.test.mjs` does not exist. `IndexScreen.luau` does exist, so `thumbnails/03`'s one
build claim is a shipped file.

**`N-C` is closed in repo source.** `bridge/schema.mjs:710-711` now holds shape-validation code; the
`documentationOnly` comment lives at `:781-785` and reads *"An earlier version of this comment made
`title` the exception … It does not"*, with the correct derivation. The comment is right now.

**Other runnable claims that reproduce:** `grep -rniE "discord\|guilded\|twitch\|tiktok\|youtube\|twitter\|social media\|https?://"` over `game/src` → 0 (`social/01` criterion 4, `C13`).
`grep -ri "find what's buried" game/src` → 0 (`name/03` criterion 3). Exactly one `briefRevision`
object under `cid/marketing/**`, at `thumbnails/03:169` (`thumbnails/03` criterion 3, check 9).
`grep -n "effects\.beats\[" cid/marketing/thumbnails/_lead.md` → 0, so `staleSpellingElsewhere` is
genuinely closed and the round-1 note is discharged; the only surviving occurrences are inside
`correctedFrom` records, which is what that field says. `thumbnails/01`'s `internalPathsAsserted.paths`
does carry every `storeThumbnails` field path named by a criterion in all four sheets — I walked all
sixteen criteria against the list.

**`name/01`'s `emitter` block does not "match the five sibling shapes", because there is no such
shape.** The six keys record one finding six ways: `storeIcon` as `gaps.G-I3` (an object with
`statement`/`routedTo`), `storeThumbnails` as `captureGate.fileOwnership.keyReachesNothingToday` (a
boolean), `storeListing` as `emitter: "none"` (a **string**), `channels` as `emitter: {exists, kind,
consumedBy, gap}` (an **object**), `launchBeats` as `emitterHole` (a **string**). `title` adds a
third `emitter` field, an object, closest to `channels`. This is not a violation of anything on my
list — criterion 3 asserts only `keyReachesNothingToday`, `wireExists` and two `requestedChanges`
entries, all of which are present and true — and the *finding* is recorded correctly at all six
sites. But the field name `emitter` now carries a string at one key and an object at two others in
one category, which is the same type-collision shape that `blocksMirrored` exists to catch. Recorded
as a cross-category conflict, not as a request.

## Round-2 revision requests

### R2-A. `cid/marketing/hype/01-the-publish-moment.md` — still pins `publishChecklist` row `P5` and asserts an absolute row count
**Violates:** check 20; the orchestrator ruling that requesters do not assign ids; `liveops/community/02` `F-C4`
**Current:** four assertions in one file. `:259` `revisionRequests[RR-H1].effectOnReleaseAC1` = *"RR-C1 already moves the row count from 4 to 5; this moves it to 6."* `:263` `revisionRequestsCitedNotFiled[RR-C1].ask` = *"a fifth publishChecklist row P5 for the Maturity and Compliance questionnaire"*. `:287` prose = *"already asks `release` for a `P5` row"*. `:290-291` prose = *"Together the two move `release` AC1's row count **from 4 to 6**"*.
**Fix:** three edits and one deletion. `:263` restate RR-C1's ask as its owner now words it — `liveops/community/02:136` reads *"Add a new `publishChecklist` row, ID ASSIGNED BY `release`"* — and drop the words *"a fifth"* and *"P5"*. `:259` replace `effectOnReleaseAC1` with `rowCountEffect: "at least one row beyond P4"`, matching `thumbnails/02:167`. `:287` and `:290-291` drop `P5` and the `4 → 6` arithmetic, and say instead that four live requests want rows on one checklist and `release` numbers them.
**Why it counts:** bar (b). `release` is one owner receiving four requests against a four-row checklist. Two of them (`thumbnails/02`, `icon/01`) say *"id is yours, at least one row beyond `P4`"*; Hype says the row is `P5` and the resulting count is exactly 6. `liveops/community/02:323` states plainly that four self-assigned numbers is a collision `release` would have to unpick before executing any of them. Two competent readers building the checklist from this category produce different checklists. It is also the only place in Marketing where a ruling the orchestrator applied everywhere else did not land — because this domain's writer was not dispatched.

### R2-B. `cid/marketing/hype/_lead.md` — the verification note pins `P5`/`P6`
**Violates:** the same ruling as R2-A
**Current:** `:150` — *"if that sheet accepts the revision request, the two rows become `publishChecklist` `P5`/`P6` and `launchBeats.preconditions` must cite them instead of stating them."*
**Fix:** replace `P5`/`P6` with *"two new rows whose ids `release` assigns"*. The sentence's point — that accepting the request converts `preconditions` from stating an obligation to citing a row — survives unchanged and is the useful half.
**Why:** it is the domain index, so it is what the next writer on this domain reads first, and it re-teaches the pin the leaf is being asked to drop.

### R2-C. `cid/marketing/icon/01-the-one-icon.md` — asserts `art/style/01` line 264 carries a value it no longer carries
**Violates:** check 23
**Current:** the sheet says in four places that `styleGuide` ratifies the tool head as `[190,158,118]` luma 163.01 against `objectArt`'s `[178,160,133]` luma 162.30, and files that as a live conflict: `:32` (*"`styleGuide` … line 264 ratifies the head as `[190,158,118]` luma **163.01**"*), `:222` `toolAreaPctBecause`, `:223-231` the whole `toolHeadLumaDiscrepancy` object, `:354-357` a Consequences bullet (*"one of the two sheets is carrying a superseded number"*), the `## Flagged to the developer` row 4, and the `## Not decided here` line. `art/style/01:263-264` now reads grip `[118,88,66]` luma 94.46, head `[178,160,133]` luma **162.30**, paler by **67.84**, and `:269-276` records the correction by name.
**Fix:** collapse `toolHeadLumaDiscrepancy` to a closed record — `styleGuideProseValue` and `objectArtValue` both 162.30, `status: "closed"`, `closedBy: "art/style/01:269-276"` — and delete the `[190,158,118]` / 163.01 clauses at `:32` and `:222`, the Flagged row and the Not-decided line. **Change no arithmetic:** the operative subtractions are 39.19 and 33.54 at 162.30 and they are already correct and already primary.
**Why:** the sheet's own criterion 2 is an arithmetic reproduction, and it is the one place in this category where a reader is told to go check another file's line. That line now says the opposite. Below both stopping-rule bars — the verdict is identical at either figure and the sheet says so — but check 23 is on my list and this is a line-precise citation that no longer resolves.

### R2-D. `cid/marketing/name/01-the-title.md` — asserts `bridge/schema.mjs:710-711` carries a comment it no longer carries
**Violates:** check 23
**Current:** `:96-97` prose and `value.emitter.sitesAssertingTheMissingArrow[3]` both name `bridge/schema.mjs:710-711` as *"a code comment asserting `title` 'reaches `Theme.luau` through `generate.mjs` and is therefore build-read'"*, `status: "Routed to contract-and-seam work"`; and `authority.requestedChanges[N-C]` asks someone to *"correct or delete"* it. Lines 710-711 now hold `if (typeof value !== 'object' …) problems.push(\`${key} must be an object\`)`. The comment is at `:781-785` and now reads *"An earlier version of this comment made `title` the exception … It does not."*
**Fix:** mark `sitesAssertingTheMissingArrow[3]` `status: "corrected in repo, bridge/schema.mjs:781-785"` and move `N-C` from `requestedChanges` to a `closedRequests` field with the same citation. Do not touch `N-A` or `N-B`; criterion 3 needs `requestedChanges` to hold at least two entries and those two remain live and correct.
**Why:** the sheet's substance — `title` reaches nothing today — is right, and I re-derived all of it. What is wrong is that it reports an open request against a file that has already answered it, at a line number that now points at unrelated code.

### R2-E. `cid/marketing/name/03-the-tagline.md` — asserts a `collection.total` citation survives when none does
**Violates:** check 23
**Current:** `:182` — *"one domain index — `liveops/events/_lead:101` — still cites `collection.total == 24` as a check. **That is the last live occurrence in `cid/`**"* — and `:205-206` routes it to the cross-category pass. Grep for `collection\.total` over all of `cid/`: zero live citations remain anywhere. `liveops/events/01` now carries it only inside `replacedPhantom` and `correctedAtRound2` records, and `liveops/events/_lead:101` no longer matches.
**Fix:** replace both sentences with a statement that the sum form has landed at every site and no live citation remains, or delete them. One sentence each.
**Why:** it is the last open item this sheet hands to the cross-category pass, and it hands it an item that is already closed. Cheapest of the five and the least consequential; filed because it is the same defect class as R2-C and R2-D and the pattern is the point.

### R2-F. `cid/marketing/thumbnails/02-the-capture-gate.md` — criterion 4's `id` clause is false as literally read
**Violates:** the invariant that acceptance criteria are checkable without two readers disagreeing
**Current:** *"it carries no field named `rowId`, `row`, `newRowId` or `newRow`, and **its only `id` field is `"RR-T1"`**."* The `revisionRequests[RR-T1]` object nests `otherLiveRequestsAgainstThisChecklist`, whose three rows each carry an `id` (`"RR-C1"`, `"RR-H1"`, `"unnumbered"`). Read literally the clause is false; read charitably it means the top level.
**Fix:** one word — *"its only **top-level** `id` field is `"RR-T1"`"*.
**Why:** the clause exists to prove this sheet assigns no checklist id, and it was added in the same edit that introduced the nested rows that falsify it. Two readers running it disagree on the verdict, which is the one thing an acceptance criterion may not permit.

## The checklist itself is wrong at check 20

**FAIL — check is wrong.** Check 20 reads *"`RR-H1` and `RR-C1` compose to six rows and do not
overlap"*, and round 1 passed it by doing the arithmetic `4 + 1 + 1 = 6`. That arithmetic is now the
thing being forbidden: `liveops/community/02` has withdrawn the `P5` pin and the `4 → 5` count, and
the orchestrator has ruled that requesters assign no ids. Under check 20 as written, the four
Marketing sheets that correctly de-pinned (`thumbnails/01`, `/02`, `/04`, `icon/01`) would now
*fail* it, because they refuse to state the composed count, and Hype — the only sheet still
asserting it — would pass. The check rewards the defect.

`cid/marketing/_verified.md:31` and `:96` are themselves two of the ten citations `F-C4` names.

**Narrow check 20 to:** *"`RR-H1` and `RR-C1` are each filed once, do not overlap in subject, and
neither they nor any sheet citing them asserts a checklist row id or an absolute post-acceptance
row count."* Under the narrowed check the four de-pinned sheets pass on their own wording, Hype
fails on four sites, and the row count returns to `release`, which is the only holder that can see
all four requests. Predicted conflict 3 above should be rewritten the same way: `release` is owed
*at least four rows beyond `P4`*, and this category asserts no total.

## Predicted cross-category conflicts — round 2

Carried forward from round 1: 1 (now closed inside `cid/`; see R2-E), 2, 4, 5, 6, 7 all stand. 3 is
superseded by the narrowing above. New:

8. **`emitter` is a string at one Marketing key and an object at two others.** `storeListing.emitter`
   is `"none"`; `channels.emitter` and now `title.emitter` are objects. `storeIcon`,
   `storeThumbnails` and `launchBeats` record the same finding under three further field names.
   Six keys, one finding, six shapes and one type collision. Nothing reads any of them today, so no
   builder diverges — but contract-and-seam work cannot write one shape for `emitter` without
   picking a winner, and `store-page/01`'s own `blocksMirrored.checkedBy` treats exactly this
   string-versus-object mismatch as a failure when it happens inside one key.
9. **`store-page/01`'s `## Pushing back` describes a disagreement that has been settled.** It says
   it overrules *"`name/01`'s ground 3 as written"* and that *"the narrowing sits in
   `## Consequences` as a one-field change for them to make."* Name has made it. The reasoning is
   still correct and worth keeping as the record of how `t2Predicate` came to exist; a final pass
   should decide whether a settled `## Pushing back` is annotated or left as history. Not a request:
   it asserts no false fact about a file.
10. **Four sheets were revised against a baseline that was stale for their own files.** The Name and
    Store-page writers both reported the round-1 findings already landed, and in both cases I
    confirmed the current file is correct. Round 1 also miscounted the leaf sheets (15 for 16) and
    cited `thumbnails/03:126` for an object now at `:169`. A final pass should re-read rather than
    diff against this file's round-1 line references.

## What must happen before this category can release

1. **R2-A and R2-B applied by the Hype writer, which has not been dispatched since round 1.** This
   is the only bar-(b) finding in the round and the only reason the status is FAIL rather than PASS.
   Four sites in two files; no decision moves, no beat changes, `beatCount` stays 1.
2. **R2-C, R2-D and R2-E applied** — three sheets asserting that a named repo file or line says
   something it no longer says, all three created by corrections the orchestrator made elsewhere
   this round. One field or one sentence each. Below both stopping-rule bars; filed because check 23
   is on the checklist and because a category whose central claim is `T0` cannot ship citations that
   do not resolve.
3. **R2-F applied** — one word in `thumbnails/02` criterion 4.
4. **Check 20 narrowed as stated above, at the category, before the final pass runs it.** Left as
   written it will fail the four sheets that got this right.
5. Nothing waits on another domain. Live Ops ran and `F-C4` is the source of finding R2-A; Art,
   Gameplay and Tech are approved and every value I read from them reproduced to two decimal places.
   Gates re-run by the orchestrator this round: `cid:verify` PASS 0 failures, `bridge` COMPLETE
   26/26 0 problems (`styleGuide` promoted), `npm test` 199 pass 0 fail.
