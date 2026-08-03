# 01 — No channel, and the intake of record

**Domain:** liveops/community · **Category:** Live Ops · **Wave:** 7

> **Revised** against `cid/liveops/_verified.md`, and **every grep, line number and count below
> was re-run against the repo on 2026-08-02** rather than inherited. **R3** closed: the
> `robloxCommunity` row no longer claims the 16+ visibility rule reaches it. It is regrounded on
> `products` `F15` — verbatim at `cid/gameplay/monetization/01-the-offer-ladder.md:170` — plus
> `G-a`, marked explicitly weaker than the six off-Roblox rows, and named in
> `rowsReopenedByGaAlone`. **R6** closed: AC2's `social` exclusion is restated as its reason.
> **Both published figures were wrong, mine included.** Measured today: **40 matching lines
> across 7 files, 39 across 6 `.luau` files** — and three of the forty are the word used
> descriptively, not the contract key, which my first correction asserted they all were. None of
> the forty is a channel reference, and that zero is what the criterion rests on.

## Decision

**No channel exists through which a player can reach this project — off-Roblox, on-Roblox, or
in-game — and none may be referenced anywhere: `channelCount: 0`, `roleCount: 0`.** The intake
of record is `cid/_playtest.md`, append-only, five required fields per reading, four triage
classes, and **no cadence** — every class dispositions to a revision request against a named
sheet and field, or to nothing, and never to a live change.

## Why

**The ruling rests on compliance, not on the brief's silence, and that ordering matters.** The
brief states no off-Roblox presence in any of five layer sheets, `OPEN.md` or `research/`
`[cid: decided]` on the silence — but silence alone would only make a channel unassigned, not
impermissible. What makes it impermissible is the platform: *"Social media links are only
visible to users who have verified their age as at least 16 years old"* and *"If you're under
16 years old or haven't verified your age, the UI to add social media links to games,
communities, and Creator Store assets is hidden"*
`[research: https://create.roblox.com/docs/production/promotion/social-media-links]`, confirmed
against the generation source
`[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/production/promotion/social-media-links.md]`.
**The stated audience is 8–14** `[brief: binding]` ← `[you chose: R1 Q4]` (`00-CORE.md`), so
**zero percent of it can see a social link on the experience page.** A channel created for this
game reaches none of its intended players through the only sanctioned surface. A web-search
snippet gave the threshold as 13; **both official pages say 16, and 16 is what this sheet
cites** — the number a search returns and the number the documentation states were different.

**An on-Roblox community is ruled here too, and its closure is weaker — stated rather than left
for the stronger argument to cover.** `[revised: R3]` My first draft said it *"gets the same
answer"* under *"the same 16+ rule"*, and the fetched source does not supply that. What the
source supports is only that a social **link to** a community is hidden below 16 — *"the UI to
add social media links to games, communities, and Creator Store assets is hidden"*. It says
nothing about **joining or discovering** a Roblox community, which an 8–14 player reaches
through platform search and the creator profile with no social link involved. **So `G-b` does
not reach this row**, and the claim is withdrawn rather than softened.

What closes `robloxCommunity` instead is `products` `F15` (*"No code entry field, and no like,
favourite, follow, group-join, rate-us or share prompt, anywhere in the game."*), which bars the
in-game grant and prompt by grep, plus `G-a`, the brief's empty referent — **and `G-a` is the
ground this sheet already labels weakest.** (`G-a` is what `_verified.md` calls `G1`; the ids
are made to agree in the manifest so a merge does not see two grounds.) Marking the *ground*
weakest and leaving the *row* unmarked was the defect: it let a reader take the compliance
closure as covering all eight rows when it covers six. `rowsReopenedByGaAlone` now names
`robloxCommunity` as **the single row a developer reversing the "no players" stance reopens**,
and none of the other seven. That field is worth its bytes because a group-join reward is the
most likely reversal in this category and `codes` `L3` defers its channel side to me.

The in-experience form is barred outright either way: *"You may not link to, share, or display
URLs of any external websites or services except by using the Social Links feature"* and *"You
cannot share social media links directly within a game"*
`[research: https://about.roblox.com/community-standards]`. That agrees with `products` `F15`
from **outside** the project — two independent closures on one surface, which is why the
in-game intake row carries both.

**The intake of record already exists and had no rules.** `cid/_playtest.md` was created by
Analytics to close a pipeline gap — *"no artifact type for an empirical reading"* — not as a
feedback process `[research: cid/_playtest.md]`. It carries the file's own four house rules
(one section per session, newest last, never rewritten; observation not implication; name the
sheet and field; state `n`) and no admission rule, no required-field list and no disposition
rule. This sheet supplies those three and changes none of the four. **Making the existing
artifact the process is cheaper than inventing a second one**, and *"the smallest game that
still gives every creative area real work"* `[brief: binding]` ← `[you chose: R1 Q3]` forbids
inventing a channel so this domain has something to manage.

**Triage classifies by `CLAUDE.md`'s two stopping-rule bars and by nothing else**
`[research: CLAUDE.md]`: a player would notice it, or two builders would diverge on it. A
reading meeting neither is recorded and deliberately not acted on — that clause is the
stopping rule's own, and a triage process that re-litigates it would re-open the recursion the
rule exists to end. A fourth class exists because the record needs one: the 1/2/3 keypress
report is **unattributed to a build**, not classified as harmless, and it has been open across
a wave boundary `[research: cid/_playtest.md]`. Re-measured this pass: `KeyCode` matches
`game/src` on exactly four lines — `Pressables.luau:13,33` and `Input.luau:8,15` — and all four
are comments recording that the binding was superseded and removed.

**No cadence is published here, and that is a decision rather than an omission.**
`kpis.cadence` is a bounded post-publish window that closes, and `kpis.verdictRule` already
makes a breached row produce *"a revision request against a named sheet and field, never a live
change"* (`analytics/kpis/02`). A second review rhythm in a second key is two answers to one
question. My dispositions inherit that shape verbatim and my key holds no day, week, interval
or schedule field at all. The two dated stamps it does hold record **when a grep was run**,
which is provenance, not rhythm.

**One editorial resolution of my own index's proposed shape:** the index asked for both
`channels: []` and one row per candidate, and those cannot be the same array. `channels` is the
**live** set and is empty; `channelsConsidered` holds the eight candidates with their closure
and their grep. The count invariant then does real work — `channelCount == len(channels)` and
`channelCount == the number of considered rows where `exists` is true`. Roles use the identical
pair. `[cid: decided]`

**Reversal condition, as a field rather than a sentence.** Discovery & Marketing — Social
creating any channel makes this sheet wrong and hands this domain a moderation position it does
not today hold. `offRobloxPresence.reversalCondition` carries it so a merge against a Marketing
sheet naming a Discord fails loudly instead of leaving two sheets disagreeing in prose.

**This key emits no `GameConfig` value.** It is `DOCUMENTATION_ONLY` in the emitter's sense,
and that does not make it prose: five of its fields are counts a grep confirms. **Neither of my
sheets authors a player-facing string,** so `vocabulary` binds nothing here and
`playerFacingStringsAuthored` is `0`.

```manifest
{
  "provides": "community",
  "status": "proposed",
  "value": {
    "emitsGameConfigValues": false,
    "documentationOnly": true,
    "playerFacingStringsAuthored": 0,
    "greppedOn": "2026-08-02",
    "offRobloxPresence": {
      "exists": false,
      "ruledBy": "cid/liveops/community/01-no-channel-and-the-intake-of-record.md",
      "groundsCount": 3,
      "grounds": [
        { "id": "G-a", "verifierLabel": "G1", "ground": "the brief states no off-Roblox presence in any of five layer sheets, OPEN.md or research/", "tag": "cid: decided", "strength": "weakest: silence makes a channel unassigned, not impermissible" },
        { "id": "G-b", "ground": "social media links are only visible to users who have verified their age as at least 16 years old, and the stated audience is 8-14, so zero percent of the intended audience can see one", "tag": "research", "source": "https://create.roblox.com/docs/production/promotion/social-media-links", "ageThreshold": 16, "conflictingSnippetValue": 13, "conflictResolvedBy": "both official pages state 16; the 13 came from a search snippet and is rejected", "strength": "load-bearing", "reachesRows": ["discord", "guilded", "twitter", "youtube", "twitch", "facebook"], "doesNotReachRows": ["robloxCommunity", "inGameIntake"], "doesNotReachWhy": "the source supports only that a social LINK TO a community is hidden below 16. It says nothing about joining or discovering a Roblox community, which an 8-14 player reaches through platform search and the creator profile with no social link involved." },
        { "id": "G-c", "ground": "you may not link to, share, or display URLs of any external websites or services except by using the Social Links feature, and you cannot share social media links directly within a game", "tag": "research", "source": "https://about.roblox.com/community-standards", "strength": "closes the in-experience form independently of products F15" }
      ],
      "onRobloxCommunityRuledToo": true,
      "onRobloxCommunityReason": "products F15 bans a group-join, follow or share prompt anywhere in the game (verbatim at cid/gameplay/monetization/01-the-offer-ladder.md:170), and G-a leaves the referent empty. NOT the 16+ visibility rule: that rule reaches a social LINK to a community, not the community itself.",
      "onRobloxCommunityClosureStrength": "weaker than the six off-Roblox rows, deliberately marked. It rests on a scope closure plus G-a, and G-a is the ground labelled weakest above.",
      "rowsReopenedByGaAlone": ["robloxCommunity"],
      "rowsReopenedByGaAloneMeaning": "a developer reversing the brief's 'no players' stance reopens this row and none of the other seven. The six off-Roblox rows are held by a platform fact that does not move when a non-goal is reversed; inGameIntake is held by products F15 and community-standards independently.",
      "rowsReopenedByGaAloneConsumer": "codes L3 defers the channel side of a group-join reward to this key; a group-join reward is the most likely reversal in this category",
      "reversalCondition": "Discovery & Marketing - Social creates any channel. This sheet is then wrong and Community acquires a moderation position it does not hold today. Raise it against this sheet; do not treat the empty set as an oversight.",
      "reversalCost": "a conduct surface outside the experience, unclosed by any grep in cid/liveops/community/02, staffed by nobody: success is shipped artifacts, not players (00-CORE.md, brief binding)"
    },
    "channels": [],
    "channelCount": 0,
    "channelsConsidered": [
      { "id": "discord",        "class": "offRoblox",  "exists": false, "closureStrength": "strong", "closedBy": "social-media-links 16+ visibility; community-standards external-URL ban", "observable": "grep -rniE \"discord\" game/src returns zero" },
      { "id": "guilded",        "class": "offRoblox",  "exists": false, "closureStrength": "strong", "closedBy": "same",                                                                     "observable": "grep -rniE \"guilded\" game/src returns zero" },
      { "id": "twitter",        "class": "offRoblox",  "exists": false, "closureStrength": "strong", "closedBy": "same",                                                                     "observable": "grep -rniE \"twitter\" game/src returns zero" },
      { "id": "youtube",        "class": "offRoblox",  "exists": false, "closureStrength": "strong", "closedBy": "same",                                                                     "observable": "grep -rniE \"youtube\" game/src returns zero" },
      { "id": "twitch",         "class": "offRoblox",  "exists": false, "closureStrength": "strong", "closedBy": "same",                                                                     "observable": "grep -rniE \"twitch\" game/src returns zero" },
      { "id": "facebook",       "class": "offRoblox",  "exists": false, "closureStrength": "strong", "closedBy": "same. Enumerated because it is one of the seven link types, so the set is complete against its source rather than against habit", "observable": "grep -rniE \"facebook\" game/src returns zero" },
      { "id": "robloxCommunity","class": "onRoblox",   "exists": false, "closureStrength": "WEAKEST OF THE EIGHT — see offRobloxPresence.rowsReopenedByGaAlone", "closedBy": "products F15 bans a group-join prompt anywhere in the game; G-a, the brief states no presence so the referent is empty. NOT the 16+ rule, which reaches a link to a community and not the community itself.", "observable": "grep -rniE \"roblox\\.com/(groups|communities)|IsInGroup|GetRankInGroup|GetRoleInGroup\" game/src returns zero" },
      { "id": "inGameIntake",   "class": "inExperience","exists": false, "closureStrength": "strong", "closedBy": "products F15 (no code entry field, no rate-us or share prompt, zero TextBox); notices has two beat members and one system member and cannot carry a non-beat; community-standards bars the in-experience URL form", "observable": "no module constructs a TextBox instance, and grep -rniE \"https?://|SocialService|PromptGameInvite\" game/src returns zero. NOTE: a bare grep for the word TextBox matches a type union in HudBinding and a defaults table in UIBuilder and is NOT the check." }
    ],
    "channelsConsideredCount": 8,
    "channelsConsideredSource": "the seven social-link types named at https://create.roblox.com/docs/production/promotion/social-media-links, plus the in-experience surface",
    "bareSocialWordBaseline": {
      "why": "AC2's compound pattern deliberately excludes the bare word `social`. This is the measurement that justifies the exclusion, so no later reader re-derives it.",
      "command": "grep -rni \"social\" game/src",
      "measuredOn": "2026-08-02",
      "matchingLines": 40,
      "files": 7,
      "luauFiles": 6,
      "luauMatchingLines": 39,
      "nonLuauFile": "game/src/server/Tool.report.md, 1 line",
      "perFile": { "World.luau": 21, "GameConfig.luau": 11, "Plots.luau": 4, "IndexScreen.luau": 1, "Clearing.luau": 1, "Protocol.luau": 1, "Tool.report.md": 1 },
      "channelReferencesAmongThem": 0,
      "channelReferenceTest": "run AC2's compound pattern over those 40 lines: zero hits",
      "descriptiveNotKeyPathUses": [
        "GameConfig.luau, the line matching `no social proof` — a player can spend a whole session alone and receives no social proof",
        "Plots.luau, the line matching `the only social system` — deletes the only social system the game has",
        "World.luau:26 — social-graph or ranking APIs social forbids"
      ],
      "correctionRecord": "the published figure was 37 across 7 files; the first correction said all 40 were the contract key. Both were wrong. 40/7/39/6 is measured, and the three lines above are not key paths. Neither error touched the exclusion, which holds.",
      "stabilityWarning": "the 40 drifts with every comment edit and nothing here depends on it. The zero does not drift and is the criterion."
    },
    "roles": [],
    "roleCount": 0,
    "rolesConsidered": [
      { "id": "moderator",  "exists": false, "closedBy": "no conduct surface to act on (cid/liveops/community/02, conductSurfaceCount 0)", "observable": "community.conductSurfaceCount == 0" },
      { "id": "admin",      "exists": false, "closedBy": "input is a closed five-verb list; there is no verb an elevated player could use", "observable": "no module branches on a UserId allowlist; grep -rniE \"isAdmin|adminList|whitelist\" game/src returns zero" },
      { "id": "tester",     "exists": false, "closedBy": "release.environments is Studio plus one published place, and release.forbidden N7 bans a second place as a player-facing test ring", "observable": "release.environments.count == 2" },
      { "id": "vip",        "exists": false, "closedBy": "products.storeExists false, itemCount 1, F18 bans a subscription or Premium-gated benefit", "observable": "products.itemCount == 1" },
      { "id": "contributor","exists": false, "closedBy": "there is no player-authored content in this game (social X9 forbids a player string reaching another client)", "observable": "social.chat.playerAuthoredStringsToOtherClients == 0" },
      { "id": "groupRank",  "exists": false, "closedBy": "no channel exists for a rank to be granted in (channelCount 0); social X1 bans leaderstats, X2 bans Team, X6 bans an overhead label, X7 bans the payload that would carry a rank", "observable": "grep -rniE \"leaderstats|TeamColor|GetRankInGroup|IsInGroup|GetRoleInGroup\" game/src returns zero" }
    ],
    "rolesConsideredCount": 6,
    "intakeOfRecord": {
      "path": "cid/_playtest.md",
      "isTheOnlyOne": true,
      "createdBy": "analytics, to close a pipeline gap: the pipeline had no artifact type for an empirical reading",
      "ownedBy": "liveops/community, assigned by this sheet. It had no owner before it.",
      "admissionRule": "a reading is admitted only if it was observed by a person playing a build that can be named. One section per session, newest last. An earlier section is never rewritten, including one that later turned out to measure the wrong thing. Nothing derived, predicted, simulated or reasoned from another sheet is admissible.",
      "requiredFields": [
        { "field": "n",        "meaning": "the number of players present in the session", "citableWithout": false },
        { "field": "who",      "meaning": "who played, at least by role (developer, external tester)", "citableWithout": false },
        { "field": "build",    "meaning": "the build played, by artifact path or commit", "citableWithout": false },
        { "field": "observed", "meaning": "what was observed, not what it implies. The implication belongs in the sheet that owns the value.", "citableWithout": false },
        { "field": "bearsOn",  "meaning": "the sheet and field the observation bears on, so a writer can reach it from the digest", "citableWithout": false }
      ],
      "requiredFieldCount": 5,
      "citationRule": "a sheet may cite a reading only if all five fields are present in it. A reading missing one is recorded and is not citable.",
      "houseRulesInherited": 4,
      "houseRulesChanged": 0,
      "openDefects": [
        { "id": "PT-1", "what": "the developer reported that pressing 1, 2 and 3 buys upgrades; no module binds those keys and all four KeyCode matches in game/src are comments recording that ruling R-1 removed the binding — re-measured 2026-08-02 at Pressables.luau:13,33 and Input.luau:8,15", "session": "2026-08-01", "class": "T4", "disposition": "stays open in cid/_playtest.md until reproduced against a named build or ruled out; no revision request is filed on an unattributed observation", "openAcrossWaveBoundary": true }
      ],
      "openDefectCount": 1
    },
    "triage": {
      "barsSource": "CLAUDE.md, the stopping rule: a finding counts only if a player would notice it, or two builders would diverge on it",
      "cadence": "none",
      "cadenceOwnedBy": "analytics/kpis/02, kpis.cadence — a bounded post-publish window that closes. No second review rhythm exists in this key or any other.",
      "noLiveChangeEver": true,
      "datedFieldsAreMeasurementsNotRhythms": ["greppedOn", "bareSocialWordBaseline.measuredOn", "intakeOfRecord.openDefects[].session"],
      "classes": [
        { "id": "T1", "bar": "a player would notice it", "test": "a wrong payout, a dead upgrade, an unreachable area, an unreadable label, a character that cannot respawn", "disposition": "one revision request against the named sheet and field the reading bears on", "revisionRequest": true, "liveChange": false, "example": "area 1's clear time landing far outside its estimate would bear on pacing and depths.areas[1]" },
        { "id": "T2", "bar": "two builders would diverge on it", "test": "materially unstated, such that two competent implementations behave differently. Not merely unstated.", "disposition": "one revision request against the named sheet and field, asking for the value rather than the fix", "revisionRequest": true, "liveChange": false, "example": "the 2026-08-01 duplicate-readout reading, which no contract key owned and which routed to the proposed key composition" },
        { "id": "T3", "bar": "neither", "test": "a variable name, a loop shape, an easing curve nobody has seen, an error string in a path that cannot be reached", "disposition": "recorded in the reading and deliberately not acted on", "revisionRequest": false, "liveChange": false, "example": "CLAUDE.md's own list; re-litigating this class is the recursion the stopping rule ends" },
        { "id": "T4", "bar": "unattributed", "test": "the observation cannot be attributed to a named build, or contradicts the build it was attributed to", "disposition": "stays open in cid/_playtest.md until reproduced against a named build or ruled out; no revision request and no fix", "revisionRequest": false, "liveChange": false, "example": "PT-1, the 1/2/3 keypress report" }
      ],
      "classCount": 4,
      "dispositionsPerClass": 1,
      "forbiddenDispositions": [
        "a live tuning change to any balance value (kpis.verdictRule: no live tuning response exists and none may be invented)",
        "a flag, a rollout, a cohort or a schedule (release.forbidden N1, N2, N10)",
        "an in-game message telling a player anything about a reading (notices carries two beat members and one system member; release.shutdown.playerFacing is nothing)",
        "publishing a review interval, day, week or schedule in this key"
      ]
    }
  }
}
```

## Consequences for other work

- **Off-Roblox channel and social-account work [Discovery & Marketing — Social / Hype].** You
  inherit an empty channel set, and the reason is not only the brief's silence: a social link
  is visible only at 16+ and the audience is 8–14, so a channel reaches none of its intended
  players through the experience page. Creating one is legitimate and it is **a decision that
  hands Community a moderation position it does not hold** — raise it against this sheet's
  `offRobloxPresence.reversalCondition`, which is a field for exactly that merge.
  **One row of the eight is weaker than the rest and you should know which:** `robloxCommunity`
  is closed by a scope rule and an empty referent, not by the age rule, so a Roblox community is
  the cheapest channel for this project to acquire and the only one `G-a` alone reopens.
- **Icon, thumbnail and store-page work [Discovery & Marketing].** No "join our Discord" or
  "join the group" call to action has a referent on any surface, and the in-experience form is
  barred by Community Standards independently of anything CID decided.
- **Code-issuance work (Live Ops — Codes).** Your publication channel is empty, by this sheet
  and not by scope. Cite `community.channelCount` as part of your reversal cost; do not
  re-derive it. **Your `L3` group-join deferral lands on the one row I mark weakest** — see
  `offRobloxPresence.rowsReopenedByGaAlone`, which names `robloxCommunity` and nothing else.
- **Empirical-reading work (whoever adds to `cid/_playtest.md`).** The file now has an owner, a
  five-field admission rule and four dispositions. Its four house rules are unchanged. A
  reading missing any of the five is recorded and is **not citable by a sheet**.
- **Review-rhythm work (`kpis`).** No second cadence is published here and no field in
  `community` names an interval. Your window remains the only one.

## Flagged to the developer

The brief is silent on all three, and alternatives were live. **A channel:** create one, create
a Roblox community only, or none — I recommend **none**, because the 16+ visibility rule makes
an off-Roblox channel invisible to 100% of the stated audience through the sanctioned surface.
**The middle option is the one my ruling holds most weakly**: a Roblox community is closed here
by `products` `F15` and an empty referent, not by the age rule. **The intake of record:**
`cid/_playtest.md`, a new issue tracker, or nothing — I recommend **`cid/_playtest.md`**,
because it exists, already holds the only reading anyone has, and a second artifact splits the
record. **Roles:** none, or a tester rank — **none**, because `release.environments` is two and
`N7` forbids a player-facing test ring.

## Acceptance criteria

1. `community.channelCount == 0 == len(community.channels)`; `community.roleCount == 0 ==
   len(community.roles)`; `community.channelsConsidered` has 8 rows and
   `community.rolesConsidered` has 6; every row of both carries `exists: false`, a non-empty
   `closedBy` and a non-empty `observable`; and in each pair the number of considered rows with
   `exists: true` equals the matching count field.
2. `grep -rniE "https?://|discord|guilded|twitch|youtube|twitter|facebook|roblox\.com/(groups|communities)|SocialService|PromptGameInvite|IsInGroup|GetRankInGroup|GetRoleInGroup|leaderstats" game/src`
   returns zero matches (re-run 2026-08-02: zero). **The bare word `social` is deliberately not
   in that pattern**, and the justification is a measurement, not an estimate:
   `grep -rni "social" game/src` returns **40 matching lines across 7 files** — 39 in 6 `.luau`
   files, 1 in `game/src/server/Tool.report.md` — and **running the compound pattern above over
   those 40 lines returns zero**, so not one of them is a channel, a URL, a group id or a
   social-graph call. Most name the `social` contract key, a `cid/gameplay/social/*` sheet path
   or the `GameConfig.Social`/`SOCIAL` identifier; **three use the word descriptively and are
   also not channel references** — `GameConfig.luau` *"no social proof"*, `Plots.luau`
   *"the only social system the game has"*, `World.luau:26` *"social-graph or ranking APIs"*.
   The 40 drifts with every comment edit; the zero does not, and the zero is the criterion.
3. **No field under `community` publishes a review rhythm.** `community.triage.cadence` is the
   string `"none"`, and searching the merged `community` value for
   `daily|weekly|monthly|everyN|schedule|intervalSeconds` returns zero hits. The only
   date-shaped values permitted are measurement stamps — `greppedOn`,
   `bareSocialWordBaseline.measuredOn`, `intakeOfRecord.openDefects[].session`, and in sheet
   `02` the equivalents plus the platform enforcement dates it quotes — each of which records
   **when something was observed**, never when something recurs. `kpis.cadence` is the only
   cadence in the merged manifest.
4. `community.triage.classes` has exactly 4 rows; every row carries exactly one `disposition`
   and `liveChange: false`; every row with `revisionRequest: true` names a target sheet and a
   field in its `disposition`; `community.intakeOfRecord.requiredFields` has exactly 5 rows;
   and `community.offRobloxPresence.rowsReopenedByGaAlone` is exactly `["robloxCommunity"]`,
   matching the one `channelsConsidered` row whose `closureStrength` is not `"strong"`.

## Not decided here

The conduct-surface enumeration, the moderation position, ban and appeal, the two publish rows
this domain's ruling rests on, the platform age-check regime, and the content-maturity
obligation — **sheet `02`, this domain**, which amends this key and proposes none. Whether a
channel is ever created, and what it would be named — Discovery & Marketing — Social, whose
decision reverses this sheet. Whether a Roblox community is ever created, which is the one
channel this sheet closes weakly and the one `G-a` alone reopens — the same owner, and it is
also where a group-join reward's channel side lands. What a notice may say — `notices`
(`ui-ux/feedback/01`, `/03`); this sheet adds no member and no string. The review window and
what a breached KPI row does — `kpis` (`analytics/kpis/02`); I inherit its disposition shape and
publish no rhythm. Where codes would be published — Live Ops — Codes, which cites my empty set.
Whether `cid/_playtest.md`'s `PT-1` is a real keyboard path — nobody yet; it is `T4` and stays
open until someone reproduces it against a named build.
