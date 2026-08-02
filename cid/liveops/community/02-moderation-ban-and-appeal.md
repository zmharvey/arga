# 02 — Moderation, ban and appeal

**Domain:** liveops/community · **Category:** Live Ops · **Wave:** 7

## Decision

**The moderation policy is a derivation, not a document: thirteen conduct surfaces enumerated,
every one closed by an approved sheet and a grep, `conductSurfaceCount: 0`.** This game calls
no `Players:BanAsync`, `UnbanAsync` or `GetBanHistoryAsync`; account-level moderation and appeal
are the platform's and the developer has no role in either; and the whole ruling rests on two
publish rows nobody can assert, carried as `restsOnHumanTick`.

## Why

**A moderation surface needs a thing one player made that another player sees, and this game
has none.** That is a derivation over approved rulings, so it is performed here rather than
assumed: `social.chat` is off on window, bubble and voice with
`playerAuthoredStringsToOtherClients: 0` (`gameplay/social/01`); `social` `X9` forbids any
remote handler accepting a string later rendered to a different client, `X7` any replicated
payload carrying another player's identifier, `X11` any join or leave notice naming a player
(`gameplay/social/03`). **`X7` and `X9` are what make the enumeration below stable rather than
merely current** — they make the missing surfaces unbuildable, not unbuilt, so a later wave
adding a player-authored value to the wire fails against `social` before it reaches me.

**A finding, not a request: the shipped build closes a fourth chat surface the manifest does
not name.** `World.luau`'s `CHAT_SURFACES` disables `ChatInputBarConfiguration` alongside the
window and the bubbles, and the module's own comment gives the reason — with only the first two
off, *"a player can still open the input bar, type, and have the string delivered to every
other client's TextChannel — invisibly, but delivered"*
`[research: game/src/server/World.luau]`. `social.chat` carries three booleans; the build closes
four surfaces. I record it and ask `social` for nothing, because the build is already correct
and the key is already satisfied.

**The platform's age-check regime confirms `social.chat: false` on a second, independent
ground, and overrules nothing.** A facial age check is required to access chat; users are
placed in one of six groups — *"Under 9, 9-12, 13-15, 16-17, 18-20, or 21+"* — and *"chat in
experiences will be turned to default off for users under nine years old, unless a parent
provides consent after an age check"*, enforced in select markets from early December 2025 and
globally from early January 2026
`[research: https://about.roblox.com/newsroom/2025/11/roblox-requires-age-checks-limits-minor-and-adult-chat]`.
This pays `social/01`'s outstanding `[research owed:]` on age-based communication defaults.
**The gate is on the account, not on the place**, so `ChatWindowConfiguration.Enabled` still
defaults to `true` and `social.chat.overridesPlatformDefault` remains correct exactly as
written. Part of the 8–14 band sits in the 9–12 and 13–15 groups with chat on by default, which
is why the confirmation is worth having and why it is not a licence to relax anything.

**Where `integrity` stops and I begin, in one paragraph and with none of its five tiers
restated.** `integrity` owns **machine-detected exploitation of the game's own systems** — a
position bucket crossing a capacity, an inadmissible message on a named channel — and its
entire response terminates at a rate-capped log record, with `L4` (`kick`/`ban`) declared
`exists: false` (`tech/security/03`). I own **conduct by a person toward a person**. The two
sets do not intersect: nothing in my thirteen rows is machine-detectable as exploitation, and
nothing in its ladder is a person acting on a person. **Neither is the other's fallback** —
a conduct case does not escalate into an integrity tier, and an integrity flag does not become
a conduct case for me to judge. Its `Player:Kick` prohibition, scoped *"the integrity path
only"* with `persistence/01`'s stale-session release explicitly excluded, is adopted as written
and I add nothing to it.

**Ban is a decision, not a limitation, which is why the API is cited.** `Players:BanAsync` and
`UnbanAsync` exist and take `UserIds`, `Duration`, `DisplayReason`, `PrivateReason`,
`ExcludeAltAccounts` and `ApplyToUniverse`
`[research: https://create.roblox.com/docs/reference/engine/classes/Players#BanAsync]`. The
game could ban and does not, because there is no conduct to ban for (`conductSurfaceCount: 0`)
and *"Success is shipped artifacts, not players"* `[brief: binding]` ← `[you chose: R1 Q3]`
funds no appeals surface. **My check greps the three ban symbols and does not grep `:Kick(`
globally.** `persistence/01` AC3 requires exactly one `Player:Kick` for its stale-session
release, and three domains have already shipped the over-broad observable against it
(`tech/security/03` narrowed its own and named `networking/02`'s `I3` as the same defect). I am
not writing a fourth.

**Account-level moderation and appeal are the platform's, and the developer has no role.**
Reporting is the Roblox client's own — menu, shield icon, choose Experience or Person — and
reports are *"routed to the most appropriate team"*
`[research: https://about.roblox.com/reporting-and-blocking]`
`[research: https://about.roblox.com/newsroom/2026/07/how-in-game-reporting-works-on-roblox]`
`[research: https://about.roblox.com/newsroom/2026/07/major-updates-in-game-reporting-tools]`.
**Two claims stay `[unverified]` and the ruling depends on neither.** (a) Whether a creator can
see reports filed inside their own experience: all three pages describe the flow end to end and
none names a creator role, which supports the **weak form** — *no creator report queue is
documented* — and not the strong form. (b) *"Only the account owner may appeal"*: every
`en.help.roblox.com` fetch returned HTTP 403 and `about.roblox.com/safety` was substituted
unsuccessfully, so it reached this repo through a search summary and is quoted as unverified or
not at all. **The game issues no ban, so no appeal is owed regardless of who may file one**
`[research owed: https://en.help.roblox.com/hc/en-us/articles/360000245263-Appeal-Your-Content-or-Account-Moderation retrieved by a tool its CDN does not 403, or the Roblox Terms of Use section on suspension and termination; and https://create.roblox.com/docs/production/publishing plus the Creator Hub moderation docs rendered with their left-hand navigation, for the creator-report-queue question]`.

**Two human ticks are the whole basis of "there is nothing to moderate", and they get a field.**
`release.publishChecklist` `P4` (voice chat) has `readableBack: "none"` — no experience-level
read exists and none can be constructed, since `IsVoiceEnabledForUserIdAsync` is per user — and
`P3` (`TextChatService.ChatVersion`) is `[unverified]` (`tech/deploy/01`). If either tick is
wrong at publish time, **an unmoderated audio or text channel exists for an 8–14 audience
against every sheet in this repo, and the first thing anyone learns about it is a report to
Roblox the developer never sees.** That is why `restsOnHumanTick` is data.

**Escalation inside the game: none exists and none may be invented.**
`release.shutdown.playerFacing` is `"nothing"`, `release.forbidden` `N8` bans a maintenance or
lockout flag because *"there is no permitted surface to explain one"*, and `notices` carries two
beat members and one system member with 24 `forbidden` rows. Adding a member would be a
revision request against `notices`, not a Community decision, and I file none.

**New gap `G-C1`, filed and not filled.** The Maturity & Compliance questionnaire is a publish
*condition*: *"If an experience does not have accurate or all content maturity information,
Roblox restricts the playability of the experience on the platform for all players"*, and the
labels map to age bands including 5–8 and 9–15
`[research: https://create.roblox.com/docs/production/promotion/experience-guidelines]`. It fits
`release`'s own routing test exactly — a settings surface, no file, no diff, no build step — and
`release.publishChecklist` has four rows and this is not one of them. **I file `RR-C1` and add
no row myself**, because a Community sheet writing a publish row would be a second answer to an
approved key.

## Revision request issued

**RR-C1 · `cid/tech/deploy/01-the-release-contract.md`.** Add a fifth `publishChecklist` row,
`P5`, for the Maturity & Compliance questionnaire: `surface` Creator Dashboard → experience →
Maturity & Compliance; `scriptable` false; `readableBack` `[unverified]` (whether the resulting
label is readable at runtime is not established by the page above); `failureIfWrong` *"Roblox
restricts the playability of the experience on the platform for all players"*. The row's values
are `release`'s to set; the obligation and its citation are what I supply. This changes
`release` AC1's row count from 4 to 5.

```manifest
{
  "amends": "community",
  "value": {
    "conductSurfaces": [],
    "conductSurfaceCount": 0,
    "conductSurfaceGuarantee": "social X7 (no replicated payload carrying another player's identifier) and X9 (no remote handler accepting a string later rendered to a different client) make the surfaces below unbuildable rather than merely unbuilt. A later wave adding a player-authored value to the wire fails against social before it reaches this key.",
    "conductSurfacesConsidered": [
      { "id": "textChatWindow", "open": false, "closedBy": "social.chat.chatWindowEnabled false; world.configure writes ChatWindowConfiguration.Enabled = false at boot step 1", "observable": "ChatWindowConfiguration appears in game/src only inside World.luau's CHAT_SURFACES; at runtime TextChatService.ChatWindowConfiguration.Enabled reads false" },
      { "id": "bubbleChat", "open": false, "closedBy": "social.chat.bubbleChatEnabled false; same boot path", "observable": "BubbleChatConfiguration appears in game/src only inside World.luau; at runtime its .Enabled reads false" },
      { "id": "chatInputBar", "open": false, "closedBy": "social.chat.text false and playerAuthoredStringsToOtherClients 0. NOT NAMED BY social.chat's three booleans — the build closes it anyway. See finding F-C2.", "observable": "ChatInputBarConfiguration appears in game/src only inside World.luau; CHAT_SURFACES has exactly 3 entries; at runtime its .Enabled reads false" },
      { "id": "voice", "open": false, "closedBy": "social.chat.voice false; release.publishChecklist P4", "observable": "grep -rn \"VoiceChatService\" game/src returns zero. NO SERVER-SIDE ASSERTION IS POSSIBLE: readableBack is none. See restsOnHumanTick." },
      { "id": "nameOrNameplate", "open": false, "closedBy": "social X6 (no DisplayName mutation), X11 (no string naming another player)", "observable": "grep -rn \"DisplayName\" game/src returns zero" },
      { "id": "plotSign", "open": false, "closedBy": "social X6, X9", "observable": "grep -rnE \"SurfaceGui|BillboardGui\" game/src returns zero" },
      { "id": "overheadLabel", "open": false, "closedBy": "social X6", "observable": "same grep; and zero BillboardGui or SurfaceGui exists under any character model at runtime with two players connected" },
      { "id": "playerPlacedBuild", "open": false, "closedBy": "social X9; integrity channel admission (tech/security/02); worldStateScope per-player and plotAccess owner-only (social/01)", "observable": "exactly two client-originated handlers exist in game/src — BuyUpgrade (OnServerEvent) and RequestState (OnServerInvoke) — and neither's parameters reach an Instance.new call" },
      { "id": "trade", "open": false, "closedBy": "social X4 (no path changes another player's currency), X5 (no path adds to another player's found set); 03-META.md priority 3 'trading'", "observable": "zero remote handlers resolve a second Player; currency and found are written only against the acting player's own state" },
      { "id": "gift", "open": false, "closedBy": "same as trade; a gift is a trade with one leg", "observable": "same" },
      { "id": "leaderboardPosition", "open": false, "closedBy": "social X1 (no leaderstats), X8 (no OrderedDataStore, no global ranking); 03-META.md priority 3 'leaderboards'", "observable": "grep -rnE \"leaderstats|GetOrderedDataStore\" game/src returns zero" },
      { "id": "reportOfAnotherPlayer", "open": false, "closedBy": "no in-experience report surface exists: products F15 (zero TextBox, no rate-us or share prompt) and notices carries two beat members and one system member. The Roblox client's own report flow is the platform's and is not an experience surface.", "observable": "no module constructs a TextBox instance. A bare grep for the word TextBox matches a type union in HudBinding and a defaults table in UIBuilder and is NOT the check." },
      { "id": "bodyBlocking", "open": false, "closedBy": "social.characterCollision.playerVsPlayer false, group Characters non-collidable with itself", "observable": "PhysicsService:CollisionGroupsAreCollidable(\"Characters\", \"Characters\") returns false, and every BasePart under every character has CollisionGroup == \"Characters\"" }
    ],
    "conductSurfacesConsideredCount": 13,
    "moderation": {
      "form": "a derivation with a check, not a document",
      "authority": "the platform. Roblox operates the report flow, the review and every account-level action.",
      "developerRole": "none at account level, and none at experience level because conductSurfaceCount is 0",
      "playerFacingModerationStringsAuthored": 0,
      "jurisdiction": {
        "mine": "conduct by a person toward a person",
        "integrity": "machine-detected exploitation of the game's own systems, terminating at a rate-capped log record with tiers[L4].exists false",
        "setsIntersect": false,
        "eitherIsTheOthersFallback": false,
        "integrityTiersRestatedHere": 0,
        "kickScopeAdopted": "integrity.response.forbidden's Player:Kick row, scoped to the integrity path only, with persistence/01's stale-session release explicitly excluded. Adopted as written; nothing added."
      },
      "escalation": {
        "inGameSurface": "none",
        "closedBy": [
          "release.shutdown.playerFacing is 'nothing'",
          "release.forbidden N8 — no maintenance or lockout flag; there is no permitted surface to explain one",
          "notices — two beat members and one system member, 24 forbidden rows including playerJoinOrLeaveNotice, rejoinInstruction, dismissControl and warningState"
        ],
        "addingANoticeMemberIs": "a revision request against notices, not a Community decision. This sheet files none.",
        "outOfGameSurface": "none — community.channelCount is 0 (sheet 01)"
      },
      "restsOnHumanTick": [
        {
          "row": "release.publishChecklist.P4",
          "item": "Voice chat disabled",
          "readableBack": "none",
          "whyNoRead": "VoiceChatService:IsVoiceEnabledForUserIdAsync is per user, not per experience, so it cannot answer whether the experience has voice enabled",
          "failureIfWrong": "an unmoderated audio channel exists between players in an 8-14 experience, against social.chat.voice false and against every row of conductSurfacesConsidered that depends on it",
          "howItWouldBeDiscovered": "a report filed with Roblox that the developer never sees — see reportQueueVisibleToCreator"
        },
        {
          "row": "release.publishChecklist.P3",
          "item": "TextChatService.ChatVersion",
          "readableBack": "unverified",
          "whyNoRead": "the property is deprecated and no retrieved page states its runtime read behaviour under compatibility mode",
          "failureIfWrong": "every chat write in world.configure() is inert while configure() reports success, so chat is off in the manifest and on in the place",
          "riskReducer": "legacy chat support was removed 30 Apr 2025, so a place created today cannot be on LegacyChatService. Lowers the risk; does not close the row."
        }
      ],
      "restsOnHumanTickCount": 2,
      "reportFlow": {
        "ownedBy": "the platform",
        "surface": "the Roblox client menu, shield icon labelled Report, choose Experience or Person; blocking is on the profile",
        "routing": "reports are routed to the most appropriate team",
        "sources": [
          "https://about.roblox.com/reporting-and-blocking",
          "https://about.roblox.com/newsroom/2026/07/how-in-game-reporting-works-on-roblox",
          "https://about.roblox.com/newsroom/2026/07/major-updates-in-game-reporting-tools"
        ],
        "reportQueueVisibleToCreator": {
          "claim": "no creator-facing report queue is documented",
          "form": "weak",
          "status": "unverified",
          "strongFormNotAsserted": "that none exists",
          "evidence": "three official pages describe the flow end to end and none names a creator or developer role",
          "settlingFetch": "https://create.roblox.com/docs/production/publishing and the Creator Hub moderation documentation rendered with its left-hand navigation; failing that, the open developer feature request asking for developer access to the in-game reporting system, checked for a staff reply"
        }
      },
      "ageCheckRegime": {
        "effect": "confirms social.chat false on a second, independent ground",
        "overrulesSocialChat": false,
        "gateIsOn": "the account, not the place",
        "overridesPlatformDefaultStillCorrect": true,
        "overridesPlatformDefaultStillCorrectWhy": "ChatWindowConfiguration.Enabled still defaults to true, so social/01's overridesPlatformDefault reads correctly as written",
        "ageGroupCount": 6,
        "ageGroups": ["Under 9", "9-12", "13-15", "16-17", "18-20", "21+"],
        "defaultOffBelow": 9,
        "defaultOffBelowCondition": "unless a parent provides consent after an age check",
        "enforcement": "select markets from early December 2025; global from early January 2026",
        "source": "https://about.roblox.com/newsroom/2025/11/roblox-requires-age-checks-limits-minor-and-adult-chat",
        "paysResearchOwed": "cid/gameplay/social/01-server-and-co-presence.md's [research owed:] on age-based communication defaults",
        "whyItStillMatters": "part of the 8-14 band falls in the 9-12 and 13-15 groups, where chat is on by default. The confirmation is not a licence to relax social.chat."
      }
    },
    "ban": {
      "experienceLevel": "none",
      "isADecisionNotALimitation": true,
      "apiIsAvailable": "Players:BanAsync and Players:UnbanAsync exist, taking UserIds, Duration, DisplayReason, PrivateReason, ExcludeAltAccounts and ApplyToUniverse",
      "apiSource": "https://create.roblox.com/docs/reference/engine/classes/Players#BanAsync",
      "apisNotCalled": ["Players:BanAsync", "Players:UnbanAsync", "Players:GetBanHistoryAsync"],
      "observable": "grep -rnE \"BanAsync|UnbanAsync|GetBanHistoryAsync\" game/src returns zero matches",
      "observableExcludes": ":Kick( greped globally",
      "observableExcludesWhy": "persistence/01 AC3 requires exactly one Player:Kick for its stale-session release. Three domains have already shipped that over-broad observable against it — tech/security/03 narrowed its own and named networking/02's I3 as the same defect. This is not a fourth.",
      "banStoreExists": false,
      "banListFieldExists": false,
      "reversalCost": "an evidence rule, a threshold, a false-positive budget for an 8-14 mobile-heavy audience, and an appeal surface nobody is funded to staff",
      "appeal": {
        "experienceLevelSurface": "none",
        "owedBecause": "nothing. The game issues no ban, so there is nothing to appeal.",
        "authority": "the platform, at account level",
        "developerRole": "none",
        "ownerMayAppealClaim": {
          "claim": "only the owner of an account may send an appeal",
          "status": "unverified",
          "reachedThisRepoVia": "a search summary, not a fetched page",
          "blockedBy": "every en.help.roblox.com article attempted returned HTTP 403; about.roblox.com/safety was substituted and covers reporting and blocking, not appeals",
          "settlingFetch": "https://en.help.roblox.com/hc/en-us/articles/360000245263-Appeal-Your-Content-or-Account-Moderation retrieved by a tool its CDN does not 403, or the Roblox Terms of Use section on suspension and termination",
          "rulingDependsOnIt": false
        }
      }
    },
    "platformObligations": [
      {
        "id": "G-C1",
        "requirement": "complete the Maturity & Compliance questionnaire, which produces one of four labels (Minimal, Mild, Moderate, Restricted) mapped to age bands including 5-8 and 9-15",
        "isAPublishCondition": true,
        "failureIfSkipped": "if an experience does not have accurate or all content maturity information, Roblox restricts the playability of the experience on the platform for all players",
        "source": "https://create.roblox.com/docs/production/promotion/experience-guidelines",
        "ownedBy": "release",
        "rowAddedByThisSheet": false,
        "revisionRequest": "RR-C1 — cid/tech/deploy/01-the-release-contract.md, add a fifth publishChecklist row P5. Values are release's; the obligation and its citation are supplied here.",
        "fitsReleaseRoutingTest": "a settings surface, no file in this repository, no diff, producible by no build step"
      }
    ],
    "platformObligationCount": 1,
    "findings": [
      { "id": "F-C1", "what": "the platform age-check regime confirms social.chat false on a second, independent ground and pays social/01's outstanding [research owed:]", "isARequest": false, "targetKeyChanged": "none" },
      { "id": "F-C2", "what": "the shipped World.luau disables ChatInputBarConfiguration, a fourth chat surface social.chat's three booleans do not name; the module comment gives the reason", "isARequest": false, "targetKeyChanged": "none", "whyNotARequest": "the build is already correct and social.chat is already satisfied; naming a fourth boolean would add a field no builder needs to read" }
    ]
  }
}
```

## Consequences for other work

- **Publish-checklist work (`release`, `tech/deploy`).** `RR-C1`: a fifth row for the Maturity &
  Compliance questionnaire, whose absence *"restricts the playability of the experience on the
  platform for all players"*. Your AC1's row count moves from 4 to 5. **I add no row.** Your
  `P3` and `P4` are also now cited by name in another key as the two ticks an entire domain's
  ruling rests on — if either is ever asserted or read back, `community.moderation
  .restsOnHumanTick` shrinks with it.
- **Chat-configuration and boot work (`social`, `world`).** Nothing is owed and nothing is
  overruled. Your `[research owed:]` on age-based communication defaults is **paid** and it
  confirms your ruling; `overridesPlatformDefault` is correct as written because the gate is on
  the account. `F-C2` is a finding about your build being ahead of your key, not a request.
- **Exploit-response work (`integrity`, `tech/security`).** The jurisdiction line is drawn here
  and asks nothing of you. No tier is added, none of your five is restated, and your
  `Player:Kick` scoping is adopted verbatim. My ban check greps three ban symbols and does not
  grep `:Kick(`.
- **Save-write work (`persistence`).** Your AC3's single `Player:Kick` is untouched by any
  observable in this sheet, deliberately and by name.
- **Notice and feedback work (`notices`).** Nothing is owed. No moderation, escalation, warning
  or report string exists, so no member is requested and no `forbidden` row is contested.
- **Channel work (Live Ops — Community sheet `01`, and Discovery & Marketing — Social).** This
  ruling is independent of sheet `01`'s: a channel created off-platform does not open any of
  the thirteen rows below, because all thirteen are in-experience. It would instead create a
  fourteenth surface **outside** this enumeration, closed by no grep here.

## Acceptance criteria

1. `community.conductSurfaceCount == 0 == len(community.conductSurfaces)`;
   `community.conductSurfacesConsidered` has exactly 13 rows; every row carries `open: false`, a
   non-empty `closedBy` and a non-empty `observable`; and the number of rows with `open: true`
   equals `conductSurfaceCount`.
2. `grep -rnE "BanAsync|UnbanAsync|GetBanHistoryAsync" game/src` returns zero matches, and the
   token `:Kick(` appears in no observable or acceptance criterion of this sheet.
3. `grep -rnE "VoiceChatService|DisplayName|BillboardGui|SurfaceGui|leaderstats|GetOrderedDataStore" game/src`
   returns zero matches; `ChatWindowConfiguration`, `BubbleChatConfiguration` and
   `ChatInputBarConfiguration` each appear in `game/src` only inside
   `game/src/server/World.luau`; and `World.luau`'s `CHAT_SURFACES` table has exactly 3 entries.
4. `community.moderation.restsOnHumanTick` has exactly 2 rows, `P4` and `P3`, each with a
   non-empty `failureIfWrong`; `community.platformObligations` has exactly 1 row whose `ownedBy`
   is `"release"` and whose `revisionRequest` names
   `cid/tech/deploy/01-the-release-contract.md`; and `release.publishChecklist` is unchanged by
   this sheet at 4 rows until `RR-C1` is accepted.

## Not decided here

Whether any channel exists, what the intake of record is, its admission rule and triage classes,
and community roles — **sheet `01`, this domain**, which proposes the key this sheet amends.
The fifth publish row's `surface`, `readableBack`, `assertedBy` and `standsInForARead` values —
`release` (`tech/deploy/01`), via `RR-C1`; I supply the obligation and its citation only. What
an integrity flag does — `integrity` (`tech/security/03`), whose five tiers are cited and not
restated. The stale-session release and its single `Player:Kick` — `persistence/01`, excluded
from every observable here. Whether a fourth chat boolean joins `social.chat` — `social`
(`gameplay/social/01`); `F-C2` is recorded as a finding and requests nothing. Whether a creator
can see reports from their own experience, and whether only an account owner may appeal — both
`[unverified]`, with their settling fetches named above, and neither load-bearing. What any
player-facing string says — `notices` and `vocabulary`; this sheet authors zero.
