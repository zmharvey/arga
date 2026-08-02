# 01 — No channel, and the intake of record

**Domain:** liveops/community · **Category:** Live Ops · **Wave:** 7

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
game reaches none of its intended players through the only sanctioned surface.

A web-search snippet gave the threshold as 13. **Both official pages say 16, and 16 is what
this sheet cites.** Recording that is the point: the number a search returns and the number the
documentation states were different, and the ruling uses the documented one.

**An on-Roblox community is the same question and gets the same answer.** It is one of the
seven link types under that same 16+ rule — Facebook, Twitter, YouTube, Twitch, Discord,
Guilded and a Roblox community — so ruling one and leaving the other to a reader would leave
the larger half open. And the in-experience form is barred outright: *"You may not link to,
share, or display URLs of any external websites or services except by using the Social Links
feature"* and *"You cannot share social media links directly within a game"*
`[research: https://about.roblox.com/community-standards]`. That agrees with `products` `F15`
(*"no like, favourite, follow, group-join, rate-us or share prompt, anywhere in the game"*)
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
a wave boundary `[research: cid/_playtest.md]`.

**No cadence is published here, and that is a decision rather than an omission.**
`kpis.cadence` is a bounded post-publish window that closes, and `kpis.verdictRule` already
makes a breached row produce *"a revision request against a named sheet and field, never a live
change"* (`analytics/kpis/02`). A second review rhythm in a second key is two answers to one
question. My dispositions inherit that shape verbatim and my key holds no day, week, interval
or schedule field at all.

**One editorial resolution of my own index's proposed shape,** stated so a schema author is not
left guessing: the index asked for both `channels: []` and one row per candidate. Those cannot
be the same array. `channels` is the **live** set and is empty; `channelsConsidered` holds the
eight candidates with their closure and their grep. The count invariant then does real work —
`channelCount == len(channels)` **and** `channelCount == the number of considered rows where
`exists` is true`. Roles use the identical pair. `[cid: decided]`

**Reversal condition, as a field rather than a sentence.** Discovery & Marketing — Social
creating any channel makes this sheet wrong and hands this domain a moderation position it does
not today hold. `offRobloxPresence.reversalCondition` carries it so a merge against a Marketing
sheet naming a Discord fails loudly instead of leaving two sheets disagreeing in prose.

**This key emits no `GameConfig` value.** It is `DOCUMENTATION_ONLY` in the emitter's sense,
and that does not make it prose: four of its fields are counts a grep confirms. **Neither of my
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
    "offRobloxPresence": {
      "exists": false,
      "ruledBy": "cid/liveops/community/01-no-channel-and-the-intake-of-record.md",
      "groundsCount": 3,
      "grounds": [
        { "id": "G-a", "ground": "the brief states no off-Roblox presence in any of five layer sheets, OPEN.md or research/", "tag": "cid: decided", "strength": "weakest: silence makes a channel unassigned, not impermissible" },
        { "id": "G-b", "ground": "social media links are only visible to users who have verified their age as at least 16 years old, and the stated audience is 8-14, so zero percent of the intended audience can see one", "tag": "research", "source": "https://create.roblox.com/docs/production/promotion/social-media-links", "ageThreshold": 16, "conflictingSnippetValue": 13, "conflictResolvedBy": "both official pages state 16; the 13 came from a search snippet and is rejected", "strength": "load-bearing" },
        { "id": "G-c", "ground": "you may not link to, share, or display URLs of any external websites or services except by using the Social Links feature, and you cannot share social media links directly within a game", "tag": "research", "source": "https://about.roblox.com/community-standards", "strength": "closes the in-experience form independently of products F15" }
      ],
      "onRobloxCommunityRuledToo": true,
      "onRobloxCommunityReason": "a Roblox community is one of the seven social-link types and carries the same 16+ visibility rule",
      "reversalCondition": "Discovery & Marketing - Social creates any channel. This sheet is then wrong and Community acquires a moderation position it does not hold today. Raise it against this sheet; do not treat the empty set as an oversight.",
      "reversalCost": "a conduct surface outside the experience, unclosed by any grep in cid/liveops/community/02, staffed by nobody: success is shipped artifacts, not players (00-CORE.md, brief binding)"
    },
    "channels": [],
    "channelCount": 0,
    "channelsConsidered": [
      { "id": "discord",        "class": "offRoblox",  "exists": false, "closedBy": "social-media-links 16+ visibility; community-standards external-URL ban", "observable": "grep -rniE \"discord\" game/src returns zero" },
      { "id": "guilded",        "class": "offRoblox",  "exists": false, "closedBy": "same",                                                                     "observable": "grep -rniE \"guilded\" game/src returns zero" },
      { "id": "twitter",        "class": "offRoblox",  "exists": false, "closedBy": "same",                                                                     "observable": "grep -rniE \"twitter\" game/src returns zero" },
      { "id": "youtube",        "class": "offRoblox",  "exists": false, "closedBy": "same",                                                                     "observable": "grep -rniE \"youtube\" game/src returns zero" },
      { "id": "twitch",         "class": "offRoblox",  "exists": false, "closedBy": "same",                                                                     "observable": "grep -rniE \"twitch\" game/src returns zero" },
      { "id": "facebook",       "class": "offRoblox",  "exists": false, "closedBy": "same. Enumerated because it is one of the seven link types, so the set is complete against its source rather than against habit", "observable": "grep -rniE \"facebook\" game/src returns zero" },
      { "id": "robloxCommunity","class": "onRoblox",   "exists": false, "closedBy": "one of the seven link types, same 16+ rule; products F15 bans a group-join prompt in-game", "observable": "grep -rniE \"roblox\\.com/(groups|communities)|IsInGroup|GetRankInGroup|GetRoleInGroup\" game/src returns zero" },
      { "id": "inGameIntake",   "class": "inExperience","exists": false, "closedBy": "products F15 (no code entry field, no rate-us or share prompt, zero TextBox); notices has two beat members and one system member and cannot carry a non-beat; community-standards bars the in-experience URL form", "observable": "no module constructs a TextBox instance, and grep -rniE \"https?://|SocialService|PromptGameInvite\" game/src returns zero. NOTE: a bare grep for the word TextBox matches a type union in HudBinding and a defaults table in UIBuilder and is NOT the check." }
    ],
    "channelsConsideredCount": 8,
    "channelsConsideredSource": "the seven social-link types named at https://create.roblox.com/docs/production/promotion/social-media-links, plus the in-experience surface",
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
        { "id": "PT-1", "what": "the developer reported that pressing 1, 2 and 3 buys upgrades; no module binds those keys and all four KeyCode matches in game/src are comments recording that ruling R-1 removed the binding", "session": "2026-08-01", "class": "T4", "disposition": "stays open in cid/_playtest.md until reproduced against a named build or ruled out; no revision request is filed on an unattributed observation", "openAcrossWaveBoundary": true }
      ],
      "openDefectCount": 1
    },
    "triage": {
      "barsSource": "CLAUDE.md, the stopping rule: a finding counts only if a player would notice it, or two builders would diverge on it",
      "cadence": "none",
      "cadenceOwnedBy": "analytics/kpis/02, kpis.cadence — a bounded post-publish window that closes. No second review rhythm exists in this key or any other.",
      "noLiveChangeEver": true,
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
- **Icon, thumbnail and store-page work [Discovery & Marketing].** No "join our Discord" or
  "join the group" call to action has a referent on any surface, and the in-experience form is
  barred by Community Standards independently of anything CID decided.
- **Code-issuance work (Live Ops — Codes).** Your publication channel is empty, by this sheet
  and not by scope. Cite `community.channelCount` as part of your reversal cost; do not
  re-derive it.
- **Empirical-reading work (whoever adds to `cid/_playtest.md`).** The file now has an owner, a
  five-field admission rule and four dispositions. Its four house rules are unchanged. A
  reading missing any of the five is recorded and is **not citable by a sheet**.
- **Review-rhythm work (`kpis`).** No second cadence is published here and no field in
  `community` names an interval. Your window remains the only one.

## Flagged to the developer

The brief is silent on all three, and alternatives were live. **A channel:** create one, create
a Roblox community only, or none — I recommend **none**, because the 16+ visibility rule makes
a channel invisible to 100% of the stated audience through the sanctioned surface. **The intake
of record:** `cid/_playtest.md`, a new issue tracker, or nothing — I recommend
**`cid/_playtest.md`**, because it exists, already holds the only reading anyone has, and a
second artifact splits the record. **Roles:** none, or a tester rank — **none**, because
`release.environments` is two and `N7` forbids a player-facing test ring.

## Acceptance criteria

1. `community.channelCount == 0 == len(community.channels)`; `community.roleCount == 0 ==
   len(community.roles)`; `community.channelsConsidered` has 8 rows and
   `community.rolesConsidered` has 6; every row of both carries `exists: false`, a non-empty
   `closedBy` and a non-empty `observable`; and in each pair the number of considered rows with
   `exists: true` equals the matching count field.
2. `grep -rniE "https?://|discord|guilded|twitch|youtube|twitter|facebook|roblox\.com/(groups|communities)|SocialService|PromptGameInvite|IsInGroup|GetRankInGroup|GetRoleInGroup|leaderstats" game/src`
   returns zero matches. **The word `social` alone is not in this pattern**: it matches
   `GameConfig.Social` 37 times across 7 files and is not a channel reference.
3. No field anywhere under `community` contains a day, week, month, interval, schedule or date
   value: `community.triage.cadence` is the string `"none"`, and searching the merged
   `community` value for `daily|weekly|monthly|everyN|schedule|intervalSeconds` returns zero
   hits. `kpis.cadence` is the only cadence in the merged manifest.
4. `community.triage.classes` has exactly 4 rows; every row carries exactly one `disposition`
   and `liveChange: false`; every row with `revisionRequest: true` names a target sheet and a
   field in its `disposition`; and `community.intakeOfRecord.requiredFields` has exactly 5 rows.

## Not decided here

The conduct-surface enumeration, the moderation position, ban and appeal, the two publish rows
this domain's ruling rests on, the platform age-check regime, and the content-maturity
obligation — **sheet `02`, this domain**, which amends this key and proposes none. Whether a
channel is ever created, and what it would be named — Discovery & Marketing — Social, whose
decision reverses this sheet. What a notice may say — `notices` (`ui-ux/feedback/01`, `/03`);
this sheet adds no member and no string. The review window and what a breached KPI row does —
`kpis` (`analytics/kpis/02`); I inherit its disposition shape and publish no rhythm. Where
codes would be published — Live Ops — Codes, which cites my empty set. Whether
`cid/_playtest.md`'s `PT-1` is a real keyboard path — nobody yet; it is `T4` and stays open
until someone reproduces it against a named build.
