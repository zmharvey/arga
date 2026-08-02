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
