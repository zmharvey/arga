# Live Ops — verification

**Status: FAIL**
Seven revision requests, two of them acceptance criteria that fail against `game/src` as written
today. No check is blocked; every one was evaluable. The wave gate does not open until R1–R7 land.

Scope read in full: `_category.md`, five `_lead.md`, `roadmap/01`, `events/01`, `seasons/01`,
`codes/01`, `community/01`, `community/02`. Every grep below was re-run against the repo by this
pass, not inherited from a sheet.

## Check results

| # | check | result | evidence |
|---|---|---|---|
| 1 | nothing scheduled here is excluded by the brief's priority ordering | **PASS — genuine, not vacuous** | Exactly one thing is scheduled: `roadmap.drops[]` has one entry, D1, `sourcedFrom` `03-META.md` priority **2** *"richer authored chunk variety"*, plus `layout.anchorSource`, which is on no priority list. Priority 3 verified verbatim at `03-META.md:80-82`; all eight members appear across the five keys **only** inside a `forbidden[]` or `guardrails[]` row (`roadmap.forbidden` R-F1…R-F14, `events.forbidden` EV1…EV14, `seasons.forbidden` 14 rows, `codes.redemptionSurfaces`, `community.rolesConsidered`). Naming in order to forbid is the compliant form per `_category.md:57-63`. |
| 2 | every event reward has a source system and a post-event handling rule for unspent currency | **PASS — vacuously, and the sheet says so** | `events/01` `eventCount: 0`, `events: []`; `unspentCurrency.graphCheckSatisfiedVacuously: true` (line 187) and subject row `S5` states the vacuity in one line rather than leaving it to me. The domain did look: it routed the live question to `economy.atMaxLadder` and `solvency.ladderExhaustedAfter` and added `faucetsAddedHere: 0`, `sinksAddedHere: 0`, `conversionsAddedHere: 0`. This is a vacuous pass by a domain that looked, not a domain that skipped. |
| 3 | every code reward already exists in Systems | **PASS — vacuously** | `codes/01` `codeCount: 0`, `codes: []`. Not skipped: four independent redemption limbs enumerated with baselines, and I re-ran all four. `GetJoinData` 0, `LaunchData` 0, `TeleportData` 0, `IsInGroup` 0, `GetRankInGroup` 0, `GroupService` 0 across `game/src`. `UserOwnsGamePassAsync` has **exactly one call site**, `game/src/server/Entitlements.luau:119`, as claimed. |
| 4 | every channel referenced exists in the brief's stated off-Roblox presence | **PASS on the letter — vacuous on both sides** | Referenced set empty (`community.channels: []`, `codes.publicationChannels: []`) **and** referent empty (G1: the brief states no off-Roblox presence). Not skipped: `channelsConsidered` has 8 rows sourced to the seven documented social-link types plus the in-experience surface, each with a grep. I ran the compound pattern from `community/01` AC2 — `https?://\|discord\|guilded\|twitch\|youtube\|twitter\|facebook\|roblox\.com/(groups\|communities)\|SocialService\|PromptGameInvite\|IsInGroup\|GetRankInGroup\|GetRoleInGroup\|leaderstats` — **zero matches** in `game/src`. **But the `robloxCommunity` row's stated ground does not hold: see R3.** |
| 5 | no cadence assumes more content than Roadmap actually plans | **PASS — genuine, not vacuous** | The quantifier is non-empty: three cadence fields exist in this category and all read `none`. `roadmap.cadence.value "none"` with `intervalDays 0`; `codes.subjects[issuanceCadenceAndTriggers].cadence "none"`; `community.triage.cadence "none"`. `roadmap.dropCount` is **1**. A cadence of none assumes zero content against one planned drop. No second review rhythm is published anywhere, so `kpis.cadence` remains sole, as `_category.md:40` requires. |

**On the framing supplied with this task:** the note said four of five checks quantify over empty
sets. That is not what I found. `seasonCount: 0` is the quantifier of **no** check on this list —
Seasons is reached only through checks 1 and 5, and both have non-empty domains supplied by
Roadmap. The correct split is **three vacuous (2, 3, 4), two genuine (1, 5)**.

## Universal invariants

- **No sheet contradicts a `[brief: binding]` item.** PASS, and it is the closest call in the
  category. D1 discards `cleared` and `clearedCount` against *"Cleared is permanent"*
  `[brief: binding]` ← `[you chose: R2 Q1]` — but only inside `shipWindow.w1`, where
  `storeMigration.shippedToPlayers` is `false` and `release.tolerance.fullWipeCondition`
  (`tech/deploy/01:263`) means no non-developer save exists to lose, or inside `w2`, where a stable
  append-only draw stops B1 firing at all. `shipWindow.never` plus guardrail `G9` forbid every other
  case. The binding line is **scheduled around**, not overruled, and the sheet prices the cost
  rather than hiding it.
- **2 to 4 acceptance criteria, unarguable.** PASS on count — all six leaf sheets carry exactly 4.
  **FAIL on unarguability for two of them**: `roadmap/01` AC2 and `community/02` AC3 both fail
  against the repo as literally written. R1 and R2.
- **No priority-3 content specced.** PASS. Every one of the eight appears only to be forbidden.
- **No capability absent from the Build Capability Registry.** PASS, vacuously. All five keys are
  developer-facing and emit no `GameConfig` value; no sheet names a ui-forge pattern. The one
  capability-shaped reference, `input.gameDrawnPressables: 4`, appears in `codes.reversalPrice[RP1]`
  in order to forbid a fifth.
- **Every `[research: url]` is a real fetched source.** PASS. Fourteen URLs spot-checked against
  `cid/_research/pack.md` and all are banked with fetched excerpts: `experience-events`,
  `season-passes`, `social-media-links` (plus its `raw.githubusercontent` generation source),
  `deeplinking`, `community-standards`, `experience-guidelines`, the November 2025 age-check
  newsroom post, `reporting-and-blocking`, `Players#BanAsync`, `content-updates`,
  `liveops-planning`, `subscriptions`, `deltiasgaming`, `gamerant`. `pack.md:1850` even records the
  404 that `social-links` returns so nobody re-pays it.
- **Every `[cid: decided]` is flagged upward.** PASS with one soft spot. Events flags all three
  (EV10, the E1 boundary, the circularity) in its `## Flagged to the developer`; Codes flags `L4`
  with three live alternatives; Community flags channel, intake and roles. **Seasons' `G-S2`**
  permanence reading is `[cid: decided]` and gets a first-class `permanenceReading` manifest object
  with `question`/`taken`/`basis`/`observable`, but is **not** in Seasons' `## Flagged` table, which
  covers only `G-S1`. Flagged as data, not to the developer. Recorded, not failed.

## Revision requests

### `cid/liveops/community/02-moderation-ban-and-appeal.md` — AC3 is false against the repo today
**Violates:** every leaf sheet has acceptance criteria two people could not disagree about
**Fix:** AC3 currently reads *"`ChatWindowConfiguration`, `BubbleChatConfiguration` and
`ChatInputBarConfiguration` each appear in `game/src` only inside `game/src/server/World.luau`"*.
`game/src/shared/GameConfig.luau:1634` carries
`overridesPlatformDefault = "ChatWindowConfiguration.Enabled defaults to true"`, so the criterion
fails as written. Scope it to executable use — *"each is referenced by exactly one module,
`World.luau`; the only other occurrence is the `social.chat.overridesPlatformDefault` documentation
string at `GameConfig.luau:1634`"* — and apply the identical narrowing to
`conductSurfacesConsidered[textChatWindow].observable` and `[bubbleChat].observable`, which carry
the same unqualified claim. The irony to record: the leaking string **is**
`social.chat.overridesPlatformDefault`, the field this sheet cites approvingly two paragraphs above.

### `cid/liveops/roadmap/01-what-ships-after-v1.md` — AC2 collides with its own `notADrop[]`
**Violates:** every leaf sheet has acceptance criteria two people could not disagree about
**Fix:** AC2 requires that *"every id `N1`–`N10` in `release.forbidden` appears inside `roadmap`
only within `roadmap.forbidden[]` or `roadmap.guardrails[]`; zero appear in `drops[]`,
`notADrop[]`, `blocked[]` or `declined[]`."* But `storeMigration.nonTriggers` uses the **same
`N`-id space** (`N1`–`N8`, `tech/persistence/03:100-109`), and `notADrop[]` cites it four times:
`X1` *"storeMigration N6"*, `X5` *"storeMigration N1 and N2"*, `X6` *"storeMigration N4"*, `X7`
*"storeMigration N7"*. An unqualified scan returns four hits in `notADrop[]` and fails the sheet on
its own text. Require the qualified form: match `release.forbidden N<k>` or `release N<k>`, and
state that `storeMigration N<k>` is a different namespace and is permitted anywhere.

### `cid/liveops/community/01-no-channel-and-the-intake-of-record.md` — the on-Roblox community row asserts a closure its source does not supply
**Violates:** check 4, every channel referenced exists in the brief's stated off-Roblox presence
**Fix:** `offRobloxPresence.onRobloxCommunityReason` reads *"a Roblox community is one of the seven
social-link types and carries the same 16+ visibility rule"*, and the Why says an on-Roblox
community *"is the same question and gets the same answer."* The fetched source supports only that
a **social link to** a community is hidden below 16 — *"the UI to add social media links to games,
communities, and Creator Store assets is hidden"*. It says nothing about joining or discovering a
Roblox community, which an 8–14 player reaches through platform search and the creator profile with
no social link involved. Narrow the row: ground `robloxCommunity` on `products` `F15` (no in-game
group-join prompt) and G1 (empty referent), mark its closure **explicitly weaker** than the six
off-Roblox rows, and drop the "same 16+ rule" claim. This is the load-bearing ground for the single
most likely reversal in the category — a group-join reward, whose *grant* side `codes` `L3` defers
to Community for the channel — and it is the same defect Codes correctly filed against `F15`.

### `cid/liveops/roadmap/01-what-ships-after-v1.md` · `cid/liveops/events/01-whether-an-event-exists.md` · `cid/liveops/seasons/01-no-season-structure.md` — `notices` has three members, not two
**Violates:** no sheet contradicts a ruling in an approved sheet
*(Three requests, one per file, identical fix — listed together because the change is one clause.)*
**Fix:** all three assert in manifest data that *"`notices` has exactly two members, both beats"* —
`roadmap.announcement.inGameClosedBy[0]`, `events.forbidden[EV7].ruling` and
`events.reversalPath.gameSideMissingSurfaces[1]`, `seasons.reversalPath.buildCost[5]`.
`ui-ux/feedback/03-system-notices.md` amends `notices` with a third member, `saveNotLoaded`, class
`system`, and `cid/ui-ux/_verified.md:335-339` confirms it as approved. Community got this right in
both its sheets (*"two beat members and one system member"*); its three siblings did not, so the
category disagrees with itself. Change to *"two beat members and one system member, none of which
may carry a non-beat"*. The conclusion each sheet draws survives unchanged; the stated fact does not.

### `cid/liveops/codes/01-no-redemption-path.md` — a published baseline is off by one
**Violates:** a corrected observable must not itself be wrong
**Fix:** `redemptionSurfaces[L4].baseline.furtherTextualOccurrences` is `7`. The true count of
`UserOwnsGamePassAsync` in `game/src` is **7 total**, of which one is the call site at
`Entitlements.luau:119`, so *further* occurrences are **6**: `Entitlements.luau:39,59,87` (comments),
`:98,113` (error-message strings), `GameConfig.luau:1237` (config string). Set it to `6`, or rename
the field `totalTextualOccurrences`. The sheet's thesis is that a corrected baseline must be exact;
this one is not.

### `cid/liveops/community/01-no-channel-and-the-intake-of-record.md` — AC2's `social` justification miscounts
**Violates:** a corrected observable must not itself be wrong
**Fix:** AC2 says the bare word `social` *"matches `GameConfig.Social` 37 times across 7 files"*.
Case-insensitively it matches **39 times across 6 `.luau` files** (40 across 7 including
`game/src/server/Tool.report.md`), and the great majority are the lowercase key name `social.` in
comments, not the `GameConfig.Social` identifier. The **exclusion is correct and I verified it** —
none of the matches is a channel reference — but state it as *"the word `social` matches ~39 times
across `game/src`, all of them the `social` contract key in comments or `GameConfig.Social`"*.

### `cid/liveops/community/02-moderation-ban-and-appeal.md` — `RR-C1` pins an id another wave-7 request already claims
**Violates:** predicted collision on an approved sheet, per check "no sheet re-decides an approved key"
**Fix:** `RR-C1` asks `release` to *"add a fifth `publishChecklist` row, `P5`"* and the sheet says
*"This changes `release` AC1's row count from 4 to 5."* Three further requests against the same
checklist are live this wave: `RR-H1` (`marketing/hype/01`, the private→public visibility flip),
`RR-T1` (`marketing/thumbnails/02:152-155`, which **also names row `P5`**), and an unnumbered ask
from `marketing/icon/01:313`. Ask for *"a new row, id assigned by `release`"* and express the count
as *"at least one row beyond `P4`"* rather than `P5` and `4 → 5`. **Composition itself is clean:**
RR-C1 and RR-H1 are disjoint obligations and `marketing/hype/01:263,287` explicitly cites RR-C1
rather than refiling it. Only the id and the absolute count are fragile.

## The eight items this pass was asked to settle

1. **Roadmap's one drop and its sequencing.** **Verified in source, every load-bearing fact.**
   `storeMigration` `B1` names *"its grid… its draw sequence"* (`tech/persistence/03:92`);
   `openConsequences.W1` `fires: ["B1","B2"]` (`:174`); `translate.discard` is
   `["cleared","clearedCount"]` (`:129`). So the ride-along claim holds exactly as stated: W1
   already pays the wipe, D1 on that publish costs **zero additional wipes**, D1 after it costs a
   second for the same outcome. The precondition also holds:
   `release.rollback.publishMayNotProceedWhen` reads *"An unexercised migration is a publish
   blocker, not a caution"* verbatim at `tech/deploy/01:244`; `storeMigration.everExecuted` is
   `false`; and `game/test/` contains **only** `config.spec.luau`, so `migration.spec.luau`
   genuinely does not exist and is genuinely on D1's critical path.
2. **The binding-promise collision.** **Mechanism confirmed; the windows do close it.**
   `layout.composition` drawing without replacement means a library growth re-draws every run, B1
   fires, and the migration discards partial clearing silently. But `w1` is bounded by
   `shippedToPlayers: false` and `release.tolerance.fullWipeCondition` (*"acceptable ONLY while no
   player outside the development account holds a save"*), so inside it **no player exists to lose
   anything** — the silence is real and costless. `w2` removes the B1 fire entirely. `shipWindow.never`
   and `G9` forbid every remaining case. Not a violation. The one honest residue: if `solvency`'s
   revision table lands *after* ship, W1 itself breaks permanence and D1 may not ride it — Roadmap
   handles this correctly via `rideAlong.consequenceIfMissed`.
3. **`EV10`.** **The gap is real and the prohibition is legitimately new.** Verified: `release` `N2`
   closes *"any flag keyed to a date, a calendar or a season"* (`tech/deploy/01:279`) — a flag, not a
   branch; `N5` closes remote config (`:282`); `Layout.luau:70` is a determinism comment about chunk
   shuffling. Nothing approved covers a raw `os.date()` branch on content. Baseline verified: under
   `--glob '*.luau'` the pattern returns **exactly two lines**, `Pressables.luau:436` and
   `Layout.luau:70`. Nit for the record, not a request: AC2 says *"both begin with `--`"* and
   `Pressables.luau:436` begins with two tabs, then `--`.
4. **The four corrected greps.** **I re-ran all four, not two.** (a) Codes/`F15`: `TextBox` returns
   **9 hits across 3 files**, none an `Instance.new` — `HudBinding.luau:86,241,258`,
   `UIBuilder.luau:390,460,471,474`, `Input.luau:268,272`. The published site list is exact. The
   false-negative claim is also correct: `UIBuilder.luau` builds from `node.class` with a
   `CLASS_DEFAULTS.TextBox` row already present. (b) Events/`expires`: `GameConfig.luau:989` carries
   `expires = false` — a bare `expires` pattern **would** trip on it and the corrected
   `expires in|expiry` does not. Correction verified. (c) Community/`social`: substance correct,
   count wrong → R6. (d) Social's compound pattern: zero matches, verified. One correction is still
   imprecise; three are exact.
5. **Codes' four-limb closure.** **Baselines verified, grounding sound.** The circularity charge is
   upheld: `F15.closedBy` → `theme/tone/04` `D10` → *"Priority 3 excludes codes"* grounds out in an
   `[I assumed]` ordering. `L2`/`L3` baselines are zero; `L4`'s single call site at
   `Entitlements.luau:119` is real and is `products`' entitlement path, not a code path. `L4` is a
   genuine unowned gap and the ruling — *a bearer entitlement is a code whenever what entitles the
   player is distribution rather than purchase* — closes the one reversal that reaches the outcome
   without ever touching a `TextBox`. One baseline off by one → R5.
6. **Community's compliance closure.** **It survives for off-Roblox channels; it does not survive
   as written for the on-Roblox community, and the sheet did not say so.** For Discord/Twitter/etc
   the argument is genuinely stronger than a scope closure: the 16+ social-link rule is a platform
   fact that does not move when a developer reverses *"no players"*, and Community states the right
   qualifier — *"through the only sanctioned surface."* But `_lead` and `01` label ground **G-a**
   (the brief's silence) as *"weakest"* and assert the Roblox community *"gets the same answer."*
   That is the row the age rule does **not** reach, and it is unlabelled → R3.
7. **Seasons' lead ground.** **Verified verbatim.** `01-FOUNDATION.md:60-63`: *"**No rebirth.**
   [you chose: R2 Q2] … Reframing it as \"seasons\" and making it optional were both declined."* The
   line exists, says that, and is one layer above priority 3. The counter-argument is carried
   properly: the first-party Season Passes package is fetched and banked (`pack.md:1071`), and
   `counterArgument.componentMapping` maps five components — `startUtc`/`endUtc`, premium track,
   `upperBoundXP` tiers, DataStore XP, Missions dependency — each onto the prohibition it lands on.
8. **RR-C1 and RR-H1.** **They compose and do not overlap.** RR-C1 is the Maturity & Compliance
   questionnaire; RR-H1 is the private→public visibility flip; different surfaces, different
   read-backs, different failure modes, and Hype explicitly declines to refile RR-C1. `4 → 6` is
   arithmetically right for these two and **already stale in practice** → R7.

## Predicted cross-category conflicts

- **D1's batching rests half on an unconfirmed reading.** `whyOneDropAndNotTwo` asserts *"each lever
  alone trips storeMigration B1"*, while `migrationTriggerConfirmationOwed` admits the
  `anchorSource` half is `storeMigration`'s to confirm. B1's `field` column names
  `layout.composition and runtime.layoutSeed`, not `anchorSource`; only its `rule` clause (*"its
  grid"*) reaches it. If persistence rules the other way, the batching rationale weakens (the
  outcome does not change). Roadmap routed it correctly; recording it so the final pass can diff.
- **Marketing already consumes Roadmap.** `marketing/store-page/05-no-update-notes.md:112,148-149`
  reads `roadmap.drops[0].shipped`, `storeMigration.shippedToPlayers` and the `w1`/`w2` windows. Any
  change to D1's window rule changes that key. Not a conflict today; a coupled edit tomorrow.
- **`community.offRobloxPresence.reversalCondition` is armed.** Discovery & Marketing — Social
  creating any channel makes `community/01` wrong and flips
  `codes.publicationChannelsReferentExists`. Both sides published the field; the merge will surface
  it loudly, which is the intended shape.
- **Icon and Thumbnails lost a referent.** `events.eventCount: 0` and `seasons.seasonCount: 0`
  remove the subject behind *"seasonal and event variants"*. Both Live Ops sheets state it; the
  final pass should confirm Marketing absorbed it rather than reopening either key.
- **Five new keys, three empty.** `roadmap`, `events`, `seasons`, `codes`, `community` all need
  shapes in `bridge/schema.mjs`. The `notices` member-count disagreement found above is the argument
  for making Community's proposed cross-key invariants real: a citation in prose went stale in three
  sheets and no gate caught it.

## What must happen before this category can release

1. R1 and R2 land — two acceptance criteria currently fail against `game/src` and `roadmap`'s own
   manifest. These are hard blockers; a build agent running them today reports a breach.
2. R3 lands — the on-Roblox community row is regrounded. This is the substantive one: it is the
   channel a group-join reward would use, and `codes` `L3` is leaning on it.
3. R4 (three files) lands — the category stops disagreeing with itself about `notices`.
4. R5, R6, R7 land — two baselines corrected, one revision request de-pinned from `P5`.
5. Re-verification re-reads every changed file. No verdict here is carried forward unread.

---

# Round 2 — re-verification after the revision round

**Status: FAIL**
Five of seven requests closed on substance and I re-measured every number rather than reading the
writers' reports. Two do not close: `roadmap/01` AC2 still fails against its own manifest in two
places (R2), and `community/02`'s new finding `F-C4` names ten citations of which **four do not
exist** (R7's replacement). A third defect is new and systemic: four acceptance-criterion sites
across three sheets pin line numbers into `game/src/shared/GameConfig.luau`, which is a
**generated file** (`GameConfig.luau:3`, *"GENERATED FILE — do not edit … Emitted from CID spec
sheets by `npm run bridge -- --emit`"*) and was re-emitted this wave when `styleGuide` was
promoted. Every one of those line numbers is now wrong.

Re-read in full this round: `roadmap/01`, `events/01`, `seasons/01`, `codes/01`, `community/01`,
`community/02`, `events/_lead`, `roadmap/_lead:64-73`, `seasons/_lead:147`, `_category.md:36-63,
276-287, 340-347`, plus `ui-ux/feedback/01`, `ui-ux/feedback/03`, `bridge/schema.mjs`,
`gameplay/monetization/01`+`/02`, and six Marketing files. Twelve greps re-run against `game/src`
and `cid/`. I accepted no writer's measurement.

## Round-2 check results

| # | check | result | evidence |
|---|---|---|---|
| 1 | nothing scheduled here is excluded by the brief's priority ordering | **PASS — unchanged, re-verified** | `roadmap.drops[]` is still one entry, D1, `sourcedFrom` priority **2** (`roadmap/01:179`). The eight priority-3 names still appear only inside `forbidden[]`/`guardrails[]` rows: `roadmap.forbidden` 14, `events.forbidden` 14 (`events/01:268-281`), `seasons.forbidden` 14 (`seasons/01:132-145`). No revision this round added a scheduled item. |
| 2 | every event reward has a source system and a post-event handling rule for unspent currency | **PASS — vacuously, unchanged** | `events/01` `eventCount: 0`, `events: []`, `unspentCurrency.graphCheckSatisfiedVacuously: true` (now line 265 after the round-3 edits). `faucetsAddedHere`/`sinksAddedHere`/`conversionsAddedHere` still 0. |
| 3 | every code reward already exists in Systems | **PASS — vacuously, all four limbs re-measured by me** | `GetJoinData\|LaunchData\|TeleportData\|IsInGroup\|GetRankInGroup\|GroupService` over `game/src`: **zero matches**. `UserOwnsGamePassAsync`: **7 lines**, one of them the call site `Entitlements.luau:119` — so `furtherTextualOccurrences: 6` and `totalTextualOccurrencesIncludingTheCallSite: 7` are both correct. `TextBox`: **9 lines across 3 files**, and all nine of `rawSourceGrepSites`' line numbers are still exact (`Input.luau:268,272`; `HudBinding.luau:86,241,258`; `UIBuilder.luau:390,460,471,474`). |
| 4 | every channel referenced exists in the brief's stated off-Roblox presence | **PASS — R3 closed** | I re-ran AC2's compound pattern over `game/src`: **zero matches**. `products` `F15` is verbatim at `cid/gameplay/monetization/01-the-offer-ladder.md:170` exactly as `community/01` now cites it. `channelsConsidered[robloxCommunity].closureStrength` reads `"WEAKEST OF THE EIGHT"`, `rowsReopenedByGaAlone` is exactly `["robloxCommunity"]`, and `G-b.doesNotReachRows` names it. The "same 16+ rule" claim is gone from both the prose and the manifest. |
| 5 | no cadence assumes more content than Roadmap actually plans | **PASS — unchanged** | Three cadence fields, all `"none"`; `roadmap.cadence.intervalDays` 0; `dropCount` 1. No revision added an interval. |

## Round-2 universal invariants

- **No sheet contradicts a `[brief: binding]` item.** PASS. D1's two windows, `G9` and
  `shipWindow.never` are untouched by this round's edits.
- **2 to 4 acceptance criteria, unarguable.** **FAIL.** Count still 4 on all six leaves. But
  `roadmap/01` AC2 is false against its own manifest (RR-2b), and `community/02` AC3,
  `community/01` AC2 and `codes/01` criterion 2 each state a `GameConfig.luau` line number that is
  wrong today (RR-2c/d/e).
- **No priority-3 content specced.** PASS.
- **No capability absent from the Build Capability Registry.** PASS. `bridge/schema.mjs` now holds
  **26 keys**, `styleGuide` at `:574`, and none of the five Live Ops keys is among them — all five
  correctly carry `"status": "proposed"`. No Live Ops sheet names a ui-forge pattern.
- **Every `[research: url]` is a real fetched source.** PASS, including the three URLs added or
  first cited this round: `pack.md:860` `how-in-game-reporting-works-on-roblox`, `:866`
  `major-updates-in-game-reporting-tools`, `:1028` `reference/engine/classes/Player`, `:1034`
  `Players#BanAsync`, `:974` + `:1478` `social-media-links` and its raw mirror.
- **Every `[cid: decided]` is flagged upward.** PASS with the same soft spot, now doubled.
  `community/02`'s new `[cid: decided]` on the executable-use scoping form (`:55`) is carried as
  first-class manifest data (`observableScopingRule`) but that sheet has **no `## Flagged to the
  developer` section at all**, so it is flagged as data and not to the developer — the identical
  shape as Seasons' `permanenceReading`. Recorded, not failed, for the second time.

## What the writers claimed, and what I measured

| claim | verdict | what I measured |
|---|---|---|
| chat classes match `game/src` on exactly five lines | **TRUE** | `World.luau:55,61,62,63` + `GameConfig.luau:`**`1702`**. Five lines, three executable, all in `CHAT_SURFACES`. The **line number is wrong**: `1634` is now `setVia = "place configuration"`. |
| `social` = 40 lines / 7 files, 39 / 6 `.luau` | **TRUE, exactly** | 40 lines. Per-file: World 21, GameConfig 11, Plots 4, IndexScreen 1, Clearing 1, Protocol 1, `Tool.report.md` 1. The published `perFile` block is right to the row. |
| the three `social` lines are descriptive, not the key path | **TWO OF THREE** | `GameConfig.luau:`**`1635`** *"no social proof"* ✓ descriptive (sheet says `:1567`, which is `lockoutsSeconds = 0`). `Plots.luau:`**`314`** *"the only social system the game has"* ✓ descriptive (sheet says `:284`, which is `else`). `World.luau:26` reads *"it calls none of the **social**-graph or ranking APIs **social** forbids"* — the second occurrence **is** the contract key, so that line is not a purely descriptive use. |
| Request A already applied at all four named paths | **TRUE, quoted each** | `roadmap/01:313`, `events/01:274` (`forbidden[EV7].ruling`), `events/01:295` (`gameSideMissingSurfaces[1]`), `seasons/01:177` (`buildCost[5]`). All four now state the roster as a predicate plus the `system` member by name. |
| the requested wording *"none of which may carry a non-beat"* is false | **TRUE — the check was wrong** | `ui-ux/feedback/03:148-149`: `saveNotLoaded`, `"class": "system"`, `"beat": null`; `:144` `systemNoticesAreBeats: false`. A roster whose third member is a non-beat cannot be one *"none of which may carry a non-beat"*. See "When the checklist itself is wrong" below. |
| Request B applied | **TRUE** | `furtherTextualOccurrences: 6`, six sites enumerated, `totalTextualOccurrencesIncludingTheCallSite: 7`. Both figures verified. One of the six sites carries a wrong line number. |
| Request C applied, `events/_lead:101` fixed | **TRUE** | `rg "collection\.total" cid/` returns **no `cid/liveops/` hit outside `events/01`'s own forbid-it-by-name sites**. `bridge/schema.mjs:208-217` gives `collection` exactly five shape fields and no `total`. `GameConfig.RelicSets` (`:121-124`) is 4 sets × 6 relics = **24**. |
| `events/01` AC4 holds at the counts it states | **TRUE, counted inside the fence** | `collection.total` **3×** (`:215` `asWritten`, `:230` `replacedPhantom`, `:271` `forbidden[EV4].observable`); `social.chat.window` **1×** (`:245`); `artifactHygiene` unprefixed by `offerSurface.` **2×** (`:217` `asWritten`, `:246` `replacedGuess`) — **6 total**, matching. `citedPaths` is **22** rows. AC4 also asserts every entry resolves; I spot-checked eight and found no phantom. |
| the six stale index-file sites are real | **TRUE — seven sites, four files** | `_category.md:42` (*"exactly **two** members … both beats"*), `:281` (*"two members, both beats, and cannot carry a non-beat"*), `:344`; `events/_lead:48-49`, `:87`; `roadmap/_lead:69`; `seasons/_lead:147`. |
| `F-C4`'s ten Marketing sites | **FALSE — four of ten do not exist** | See RR-2a. |

## Round-2 revision requests

### `cid/liveops/community/02-moderation-ban-and-appeal.md` — `F-C4` names ten stale citations and four of them are not there
**Violates:** a corrected observable must not itself be wrong (the check that produced R5 and R6)
**Fix:** `findings[F-C4].staleOrCollidingCitations` carries ten entries with
`"measuredOn": "2026-08-02"`, `citationCount: 10`, `fileCount: 6`. I opened all ten. **Four are
false, and all four are Thumbnails, which already applied the exact fix this sheet is asking for:**

| claimed | what is actually there |
|---|---|
| `thumbnails/02:146` — *"release.publishChecklist row P5"* | `"assertionAtUpload": "manualInstanceEdits == 0 and gateRowsPassingAtCapture == 10"` |
| `thumbnails/02:155` — *RR-T1, "add row P5"* | *"The row's id is release's to assign and is deliberately not named here."* — and `:161-167` carries `rowIdAssignedBy: "release"`, `rowIdNotNamedHere`, `rowCountEffect: "at least one row beyond P4"` |
| `thumbnails/04:176` — *"row P5, requested by sheet 02 as RR-T1"* | `"containsTitleReason": "title is unratified …"`. The real field is `:180`, which reads *"The row's id is release's to assign and is deliberately not named here."* |
| `thumbnails/01:273` — *"four rows today; RR-T1 requests a fifth"* | a `vocabulary.maxLabelChars` citation row. The real field is `:287`: *"four rows today, P1 to P4. RR-T1 asks for at least one row beyond P4; the row's id is release's to assign."* |

The six real sites are `hype/01:259,263,287`, `hype/_lead:150`, `_verified.md:31,96`. Set
`citationCount: 6`, `fileCount: 3`, drop the four Thumbnails rows, and add one line recording that
Thumbnails de-pinned independently — which is the useful half of the finding, because it means
`release` faces **two** self-assigned `P5` claims, not four. **Also fix the two justifications that
rest on the same bad read:** `rowIdPinnedWhy` says *"marketing/thumbnails/02:152-155's RR-T1 names
the same id"* — it explicitly does not; and both the prose (`:149`) and `rowIdPinnedWhy` now cite
`marketing/icon/01:317-320` for the icon ask, which is `gaps.G-I2`. The icon ask is at
**`icon/01:191-197`** (`productionRoute.publishChecklistAsk`, `"row": "a new row, id assigned by
release"`, `idAssignedHere: false`). The conclusion — do not pin an id — survives all three
corrections; the stated facts do not.

### `cid/liveops/roadmap/01-what-ships-after-v1.md` — AC2's first clause is still false, in two places R2 did not reach
**Violates:** every leaf sheet has acceptance criteria two people could not disagree about
**Fix:** the `notADrop[]` half of R2 is properly closed — every `storeMigration` id is now dotted
(`X1` `.N6`, `X5` `.N1`/`.N2`, `X6` `.N4`, `X7` `.N7`) and AC2 correctly puts that namespace out of
scope. But AC2 clause 1 still reads *"every id matching `release\.forbidden\.N([1-9]|10)\b` appears
inside `roadmap` **only** within `roadmap.forbidden[]` or `roadmap.guardrails[]`"*, and the
manifest breaks it twice:

- `:139` `idNamespaces.finding` — *"`release.forbidden.N6` bans MessagingService fan-out"*
- `:234` `trigger.forbiddenTriggers[T3].closedBy` — *"`release.forbidden.N2`, and cadence none above"*

Both match the regex; neither is in `forbidden[]` or `guardrails[]`. AC2's *second* clause already
carves out `idNamespaces.finding` and `idNamespaces.rule` as documentation prose — extend the same
carve-out to clause 1, and add `trigger.forbiddenTriggers[].closedBy` to the permitted set, since a
forbidden-trigger row citing the rule that closes it is exactly the citation form the sheet
mandates. One clause, two additions. Do not move the two citations; they are correct where they are.

### `cid/liveops/community/02-moderation-ban-and-appeal.md` — AC3 pins a line in a generated file and the file was re-emitted
**Violates:** a corrected observable must not itself be wrong
**Fix:** AC3, `chatClassNameOccurrenceSet.nonExecutable[1]`, `observableScopingRule` and
`conductSurfacesConsidered[textChatWindow].observable` all give the
`social.chat.overridesPlatformDefault` value string as `GameConfig.luau:1634`. It is at
**`:1702`** today; `:1634` is `setVia = "place configuration"`. **The count and the scoping are
right and I verified both** — five lines, three executable, all in `CHAT_SURFACES`. Replace the
line number with the matched text in every one of the four places: *"the
`social.chat.overridesPlatformDefault` value string in `game/src/shared/GameConfig.luau`, which
reads `ChatWindowConfiguration.Enabled defaults to true`"*. `GameConfig.luau` is a **generated
file** re-emitted on every `npm run bridge -- --emit`; a line pin into it is stale by construction,
and this one went stale inside one wave because `styleGuide` was promoted.

### `cid/liveops/community/01-no-channel-and-the-intake-of-record.md` — AC2's three descriptive-use citations: two line numbers wrong, one classification wrong
**Violates:** a corrected observable must not itself be wrong
**Fix:** `bareSocialWordBaseline.descriptiveNotKeyPathUses` and AC2 name
`GameConfig.luau:1567` and `Plots.luau:284`. Actual: **`GameConfig.luau:1635`** and
**`Plots.luau:314`** (`:1567` is `lockoutsSeconds = 0`; `:284` is `else`). **The 40/7/39/6
measurement is exactly right and the per-file table is right to the row** — only the two line
labels moved. Cite the matched text, not the line. And `World.luau:26` is misclassified: it reads
*"it calls none of the social-graph or ranking APIs **social** forbids"* — the second occurrence is
the contract key, so the line is both descriptive and a key reference. Either drop it from the list
of three and say *"two"*, or restate it as *"one line carries both a descriptive use and a key
reference."* Neither change touches the zero, which is the criterion.

### `cid/liveops/codes/01-no-redemption-path.md` — the corrected baseline's sixth site names the wrong line
**Violates:** a corrected observable must not itself be wrong (the same check that produced RR-5)
**Fix:** `redemptionSurfaces[L4].baseline.furtherOccurrenceSites[5]` reads
`"game/src/shared/GameConfig.luau:1237 config string"`. `:1237` is `ordinal = 8` in the depths
table; the `UserOwnsGamePassAsync` string is at **`:1299`**
(`ownershipCheck = "UserOwnsGamePassAsync(userId, gamePassId), read at join and never persisted…"`).
**The counts RR-5 asked for are both correct and I verified them** — 7 total, 6 further. Replace the
line number with the field path `products.ownershipCheck`, which does not move when the config is
re-emitted. The other five sites (`Entitlements.luau:39,59,87,98,113`) are still exact.

### `cid/liveops/_category.md` — the category brief still tells every future writer that `notices` has two members
**Violates:** no sheet contradicts a ruling in an approved sheet
**Fix:** three sites carry the clause the three leaf sheets have now dropped — `:42` (*"`notices`
has exactly **two** members (`setComplete`, `areaComplete`), both beats"*), `:281` (*"two members,
both beats, and cannot carry a non-beat"*), `:344` (*"two members, both beats"*). `notices` has
three: `ui-ux/feedback/01:291`'s own observable now reads *"`notices.members` has 3 entries total"*.
Change all three to *"two beat members and one `system` member"* and **delete the "cannot carry a
non-beat" clause at `:281` rather than rewording it** — that clause is false, it is the same
sentence `events/01` files upward as `F-E2` against `release.shutdown.playerFacing`, and a category
brief is the one file in this category that is read by writers who have not read the leaves.
The three `_lead.md` sites (`events/_lead:48,87`, `roadmap/_lead:69`, `seasons/_lead:147`) are wave-7
planning artifacts already consumed and are **recorded, not requested** — see below.

### `cid/liveops/seasons/01-no-season-structure.md` — `forbidden[returningPlayerGrant]`'s observable is false, and it contradicts `events/01`
**Violates:** no sheet contradicts a ruling in an approved sheet (here, a sibling in its own category)
**Fix:** the row's observable reads *"case-insensitive search of `game/src` for `welcomeback`,
`daily`, `streak` and `login` returns zero identifiers."* It returns three:
`game/src/shared/Screens/quests.luau:78` `text = "DAILY QUESTS"`, `:129` `name = "Chip_Streak"`,
`game/src/shared/GameConfig.luau:754` `"welcomeOrWelcomeBackString"`. The first two are the exact
artifact `events/01`'s `F-E1` already names and routes to
`offerSurface.artifactHygiene.mustNotBePresent`. Scope the observable the way `events/01` AC3 does —
*"returns a set of paths that is a subset of `offerSurface.artifactHygiene.mustNotBePresent`; today
`{shared/Screens/quests.luau}`"* — and add that `GameConfig.luau`'s `welcomeOrWelcomeBackString` is
`firstSession` naming a thing in order to forbid it. AC2 is unaffected: its verified pattern
(`season|battlepass|battle pass|reward track|carryover|legacyReward|tierClaimed|seasonXp`) returns
**zero**, which I re-ran, and each of the 14 `forbidden[].name` values returns zero.

## When the checklist itself is wrong

**R4's requested wording — FAIL, the check is wrong, and the writer was right to refuse it.**
Round 1 asked all three siblings to say *"two beat members and one system member, none of which may
carry a non-beat."* The trailing clause is false of the roster it describes: `ui-ux/feedback/03`
gives `saveNotLoaded` `"class": "system"`, `"beat": null`, and sets `systemNoticesAreBeats: false`.
`saveNotLoaded` **is** the non-beat. Had the three sheets applied the wording as written they would
have propagated, into three manifests, the same false clause that `events/01` is filing upward as
`F-E2` against `release.shutdown.playerFacing` and that `_category.md:281` still carries. The check
should have been narrowed to: *"`notices` has two beat members and one `system` member; no member
announces anything the game is doing."* **The substantive half of R4 is closed** — all four named
paths now state the roster correctly, and each states it as a predicate over `notices.members[]`
rather than a count, so a fourth member does not restale them. R4 is marked closed.

The identical judgment applies to the notices/codes writer's second refusal: it declined to edit the
lead and category files under R4's three-file scope, correctly, because R4 named three leaf files
and those three are done. The index sites are a **new** request (above), not an unmet old one.

## Findings recorded and deliberately not acted on

Per `CLAUDE.md`'s stopping rule — a player would notice it, or two builders would materially
diverge. None of these clears either bar.

- **`events/01` `invariants[5]` is false against its own manifest.** It asserts *"every cross-key
  citation in this sheet appears in `citedPaths`"*, but `products.itemCount` (`:294`) and
  `social.chat.bubbleChatEnabled`/`.text`/`.voice` (`:296`) are cited and absent from the 22. AC4
  asserts only that the 22 entries **resolve**, which they do, so no criterion fails. Noted.
- **`codes/01`'s revision request is aimed one file off.** It targets
  `cid/gameplay/monetization/02-what-is-never-sold.md` field `forbidden[F15].closedBy`. The manifest
  `forbidden[F15]` with that `closedBy` lives at `monetization/01:170`; `02:97` is a table
  restatement carrying the identical text. Both need the edit; the request will land.
- **`events/01` AC2's *"both begin with `--`"*** — `Pressables.luau:436` begins with two tabs, then
  `--`. Recorded as a nit at round 1; still true; still a nit.
- **Three `_lead.md` sites still carry the stale `notices` clause** (`events/_lead:48,87`,
  `roadmap/_lead:69`, `seasons/_lead:147`). These are wave-7 planning indexes whose writers have
  already run. No key, no manifest and no criterion depends on them. `events/01` files them as
  `F-E3`, which is the right disposition. `_category.md` is requested above because it is still an
  input to wave 8.
- **`F-C4`'s ten Marketing sites do not block Live Ops.** They are another category's files, all
  six real ones resolve to `release`'s single id assignment, and `marketing/_verified.md` already
  records the four-way pressure independently. What blocks is the *accuracy* of the finding, not
  its subject.

## Round-2 predicted cross-category conflicts

- **Line pins into `GameConfig.luau` are a repo-wide time bomb, not a Live Ops defect.** Three of
  the four stale citations this round are the same generated file shifting by +62 and +68 lines when
  `styleGuide` was promoted. Every category that cites `GameConfig.luau:<n>` in an acceptance
  criterion is carrying an assertion that the next emit falsifies. The final pass should sweep for
  `GameConfig\.luau:[0-9]+` across `cid/` and rule once: cite the field path or the matched text.
  Live Ops' writers measured honestly and the repo moved under them.
- **`release` receives four requests, two self-assigned ids, and one bad map.** `RR-C1`,
  `RR-T1`, `RR-H1` and `icon/01`'s unnumbered ask are all live. Thumbnails and Icon have de-pinned;
  Community has de-pinned; **Hype has not** (`hype/01:259,263,287`, `hype/_lead:150`), and
  `marketing/_verified.md:31,96` still asserts an absolute count of six. When `release` assigns ids,
  the six real citations follow; `F-C4` as currently written would send it hunting four that do not
  exist.
- **`F-E2` is now confirmed in three places, not one.** The false clause *"no notice channel may
  carry a non-beat"* sits inside `release.shutdown.playerFacing`'s value string, inside
  `cid/liveops/_category.md:281`, and inside `cid/marketing/hype/_lead.md:40`. One ruling, three
  copies, all stale. The final pass should close it as one edit against `release` plus two
  citations, not as three independent findings.
- **The five keys are still proposals.** `bridge/schema.mjs` holds 26 and none is `roadmap`,
  `events`, `seasons`, `codes` or `community`. Unchanged and expected; recorded so the contract pass
  does not read `bridge` COMPLETE 26/26 as this category having landed.

## What must happen before this category can release — round 2

1. **RR-2a lands.** `F-C4` is re-measured: four false citations removed, `citationCount` and
   `fileCount` corrected, and `rowIdPinnedWhy`'s two wrong justifications (`thumbnails/02:152-155`,
   `icon/01:317-320`) replaced with `icon/01:191-197` and a note that Thumbnails de-pinned. **Hard
   blocker**: it is a finding another category is expected to act on, and 40% of it is not there.
2. **RR-2b lands.** `roadmap/01` AC2 clause 1 gains the two carve-outs it needs. **Hard blocker**:
   a build agent running the criterion mechanically today reports a breach, which is the same reason
   R2 blocked last round.
3. **RR-2c, RR-2d, RR-2e land.** Four `GameConfig.luau`/`Plots.luau` line pins replaced with matched
   text or field paths, and `World.luau:26`'s classification corrected. Each is one line. On their
   own these would be PARTIAL, not FAIL.
4. **RR-2f lands.** `_category.md`'s three sites stop telling wave 8 that `notices` has two members,
   and `:281`'s *"cannot carry a non-beat"* is deleted rather than reworded.
5. **RR-2g lands.** `seasons/01`'s `returningPlayerGrant` observable is scoped to the artifact set
   `events/01` already routes, so the category stops contradicting itself about `quests.luau`.
6. R4 is **closed** on substance and its wording clause is **withdrawn as a bad check**. R1, R3,
   R5, R6 and R7 are **closed**; R2 is **reopened** as RR-2b. No verdict above is carried forward
   unread: every file named in it was re-read this round and every number re-measured.
