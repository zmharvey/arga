# 01 — No off-platform presence

**Domain:** marketing/social · **Category:** Discovery & Marketing · **Wave:** 7 · **Revised:** round 1, `RR-6`

## Decision

**This game has no presence outside its own Roblox experience page.** No Roblox community, no
Discord, no TikTok, YouTube or X account, no posting cadence, no content pillars, no creator or
influencer outreach, and **zero of the three permitted experience-page social-link slots filled**.

**The closure is compliance, not scope.** Since **2026-06-30** a Roblox social media link is
viewable, shareable and manageable only by **age-checked 16+** users; this game's audience is bound
at **8 to 14**; therefore **no member of the stated audience can see a link this project opens**,
and a developer reversing the "no players" stance does not reopen it.

## Why

**Lead on the age rule because it is the only ground a later decision cannot undo.**
`00-CORE.md`'s *"Success is **shipped artifacts, not players**"* and its two declined non-goals
`[brief: binding]` close every row here on purpose, but they are the project's own preference and a
developer can reverse them in one line. The link rule is not the project's: *"Starting June 30,
social media links on Roblox will only be viewable, shareable, and manageable by age-checked users
16 and older, raised from the current requirement of 13+"*
`[research: https://devforum.roblox.com/t/proposal-parental-consent-for-13-15-users-to-view-social-media-links-on-roblox/4686207]`,
and it sits on a settlement term rather than a product choice: *"Roblox shall not allow U16 Users to
see or share profile links to other approved sites"*
`[research: https://devforum.roblox.com/t/allow-users-age-checked-13-15-with-parental-consent-to-see-profile-social-media-links-not-in-regions-where-social-media-is-banned-for-under-16/4693383]`.
**The ruling does not depend on the 8-14 band's internal split**, which the brief never gives: the
platform's own bands are *"Under 9, 9-12, 13-15, 16-17, 18-20, or 21+"*
`[research: https://about.roblox.com/newsroom/2025/11/roblox-requires-age-checks-limits-minor-and-adult-chat]`,
the brief's band straddles the first three, and **every band below 16 fails the link test
identically**.

**The Roblox community is the one row the age rule does not reach, and this is my weakest closure.**
A community is on-platform; nothing in the platform's rules forbids creating one. It rests on two
project decisions only: `products` `F15` bans a group-join prompt and every follow, like, favourite,
rate-us and share prompt *anywhere in the game*, which removes every path to a community without
forbidding its existence, and `00-CORE.md`'s non-goals leave it nothing to do `[brief: binding]`.
**If a developer overrules the non-goals, this row falls and the other twelve do not.** Said plainly
so that a later reader reopens the right one.

**The genre's own expectation is relayed and argued with, not omitted.** *"Codes for free boosts, and
a group-join reward. Both are near-universal on Roblox incrementals and their absence reads as an
unfinished game"* `[research: concept/spec/incremental-spinoff-v2/research/grass-incremental.md]`.
`HANDOFF.md` says argue with the source. The argument: *"reads as unfinished"* is an unattributed
impression about **retention**, which `00-CORE.md` declines by name, while the 16+ rule is a platform
constraint that does not care what the genre expects. Codes are separately closed by `03-META.md`
priority 3 and `F15`.

**Cadence and pillars are vacuous, not unfilled.** There is no surface to post on (rows `C1`-`C8`);
*"Ships and settles. No seasons or events"* `OPEN.md §2` `[brief: soft]` leaves nothing to announce;
`endgame` is unbounded and unchanging after the terminal condition; `notices` holds exactly two beat
members and cannot carry a non-beat. A verifier should read `postingCadence: "none"` as a conclusion
with no referent rather than as a field someone forgot.

**Outreach has both a binding closure and an empty payload.** *"Beating the genre's retention curve.
Offered and declined"* and *"Revenue. Offered and declined"* `[brief: binding]` close it by the
brief's own words, and there is nothing legitimate to send: the shipped theme is `cartoon-vibrant` /
`"Pet Ascend Simulator"` `[research: game/src/shared/Theme.luau]`, against a brief naming
`fantasy-ornate`, so no capture from any build that exists is representative (`M2` / `G2`).

**`theme/tone/02`'s humor ban names *"group posts"* as a forbidden surface** `[cid: decided]` at that
sheet. This key rules that surface out of existence, so the row is **vacuous**. Recorded, not edited;
whether it is rewritten is register work.

**Two claims about `F15` corrected rather than inherited** `[research: game/src]`. The `TextBox` half
verifies clean: zero `Instance.new("TextBox")` repo-wide, zero `TextBox` nodes in `ui-forge/briefs/`,
and the three `game/src` mentions are defensive. The `/group/i` half **returns at least five false
positives as a raw repo grep**: `PROGRESS_GROUP` (`HudBinding.luau:104`), `colorToken(group, …)`
(`Pressables.luau:208-211`), `groupGap` and `Group_` (`IndexScreen.luau:323-363`), and two collision
groups. `F15`'s row is correct because it scopes itself to player-facing strings; **the "grep-checked"
shorthand two category documents use is what misleads. This is a floor, not a total.** Separately,
`ui-forge` **can** build a `TextBox` (`ui-forge/src/emit/runtime/UIBuilder.luau:390`,
`ui-forge/src/transpile/to-html.mjs:309-324`), so the code-redemption closure rests on `F15` and
priority 3, not on an incapability.

**A url cited as evidence is not a channel, and criterion 2 originally could not tell the
difference** `[cid: decided]`, round-1 revision `RR-6`. My first form counted external urls *in any
manifest value*, which is falsified by this sheet's own `platformRules[].source`: `discord.com/terms`
and `youtube.com/t/terms` are what make the closure sourced rather than asserted. **The count is now
of urls that name a channel this project would operate**, with citation-role fields excluded by name
(`platformRules[].source`, `backedBy`, `settledBy`, `captureSource`, `[research: url]` tags), and the
exclusion is carried in the key as `externalUrlCountScope` so a critic reads the same scope the
criterion does. The substance is unchanged; three domains this wave shipped an observable that
matched its own sheet, and the extension of "test a grep before shipping it" is to test it against
your own file.

**The seam against inbound feedback, asserted so it can be checked.** I rule whether an **outbound**
channel exists. How **inbound** feedback is received and moderated is community-management work, and
`cid/_playtest.md` is already an inbound artifact needing no channel. If that work needs an
off-platform intake, the cheapest form is a Discord and it lands on `C2`: that is a revision request
naming the row, and it inherits the same 16+ evidence.

### The closed enumeration, 13 rows

| id | form ruled out | closed by, strongest first | observable |
|---|---|---|---|
| `C1` | A Roblox community or group | `products` `F15` (no group-join, follow, like, favourite, rate-us or share prompt anywhere in the game) + `00-CORE.md` non-goals. **Not `PR1`: a community is on-platform** | `robloxCommunityCount == 0`; 0 community ids in any `cid/**` manifest or emitted config; 0 strings rendered to a `Text` property match `/group\|community\|join us/i` |
| `C2` | A Discord server and its invite | `PR1` (audience cannot see the link) → `PR6` (Discord's own 13+ excludes the lower half of the band) → `PR4`/`PR5` (no link inside an experience) → `F15` → an unfunded moderation obligation | 0 `discord.gg` or `discord.com/invite` urls in `cid/**` or `game/src` outside a citation field; 0 experience-page links of type Discord |
| `C3` | A TikTok account | `PR1` → `PR7` (13+, 14+ in Florida) → *"shipped artifacts, not players"*. **TikTok is not one of the seven linkable types at all**, so its only possible form is an unlinked off-page account | `channelCount == 0`; 0 `tiktok.com/@` handles in any marketing key |
| `C4` | A YouTube channel | `PR1` → `PR8` (13+) → *"shipped artifacts, not players"* | `channelCount == 0`; 0 YouTube handles or `/channel/`, `/c/`, `/@` urls in any marketing key |
| `C5` | An X account | `PR1` → *"shipped artifacts, not players"* + *"Revenue. Offered and declined"*. X's own floor is `[unverified]` `U1` and **nothing rests on it** | `channelCount == 0`; 0 `x.com/` handles in any marketing key |
| `C6` | A Twitch channel | `PR1` → `PR3` (a linkable type with no content to carry: no capture is legitimate, `M2`/`G2`) | `channelCount == 0` |
| `C7` | A Guilded server | `PR1` → `PR3` → same moderation obligation as `C2` | `channelCount == 0` |
| `C8` | A Facebook page | `PR1` → `PR3` → audience band 8-14 `[brief: binding]` is below every consumer floor on the list | `channelCount == 0` |
| `C9` | A posting cadence of any interval | **Vacuous**: no surface exists (`C1`-`C8`); *"ships and settles"*; `endgame` unchanging; `notices` holds two beats | `postingCadence == "none"`; 0 fields in `channels` name a day, week, month or interval |
| `C10` | Content pillars, themes or a content calendar | **Vacuous**, same grounds as `C9` | `contentPillars == []`; 0 scheduled outbound artifacts in `launchBeats` naming a channel |
| `C11` | Creator and influencer outreach, paid or gifted | *"Beating the genre's retention curve. Offered and declined"* + *"Revenue. Offered and declined"* `[brief: binding]` ×2; and nothing legitimate to send (`M2`/`G2`) | `outreach.contactCount == 0`, `paidPlacements == 0`, `briefsIssued == 0`, `keysIssued == 0`; 0 `claims[]` rows addressed to anyone but a player |
| `C12` | Any of the three experience-page social-link slots | `PR3` (adding requires the creator to pass facial age estimation or government ID as 16+) + `PR1` (viewing requires the same). A field no member of the audience can read is not a discovery surface | `experiencePageSocialLinks.count == 0` against `maxPermitted: 3`; Creator Hub → Creations → Social Links holds 0 entries |
| `C13` | Any external url on any in-game surface, including inside a notice string | `PR4` (*"we will prohibit creators from sharing or posting social media links in experiences"*) + `PR5` + `F15` | `grep -rniE "discord\|guilded\|twitch\|tiktok\|youtube\|twitter\|social media\|https?://" game/src` returns 0. **Verified this run: 0 matches** |

### The platform rules this rests on

**Every `source` below is a citation, not a channel, and is excluded from `externalUrlCount` by
`externalUrlCountScope`.**

| id | rule | source |
|---|---|---|
| `PR1` | Social media links are viewable, shareable and manageable only by **age-checked 16+** users, effective **2026-06-30**, **raised from 13+**, across profiles, experience pages, community pages and Creator Hub | `[research: https://devforum.roblox.com/t/proposal-parental-consent-for-13-15-users-to-view-social-media-links-on-roblox/4686207]` |
| `PR2` | The underlying obligation: *"By default, Roblox shall not allow U16 Users to see or share profile links to other approved sites"* (April 2026 Alabama settlement). **A settlement term, not a product preference** | `[research: https://devforum.roblox.com/t/allow-users-age-checked-13-15-with-parental-consent-to-see-profile-social-media-links-not-in-regions-where-social-media-is-banned-for-under-16/4693383]` |
| `PR3` | Up to **three** links across **seven** types (Facebook, Twitter, YouTube, Twitch, Discord, Guilded, a Roblox community); adding requires the creator to be age-checked 16+ by facial age estimation or government ID | `[research: https://github.com/Roblox/creator-docs/blob/main/content/en-us/production/promotion/social-media-links.md]` |
| `PR4` | *"we will prohibit creators from sharing or posting social media links in experiences"*; platform age bands *"Under 9, 9-12, 13-15, 16-17, 18-20, or 21+"* | `[research: https://about.roblox.com/newsroom/2025/11/roblox-requires-age-checks-limits-minor-and-adult-chat]` |
| `PR5` | *"You may not link to, share, or display URLs of any external websites or services except by using the Social Links feature"*, whose access requires the same 16+ age check | `[research: https://about.roblox.com/community-standards]` |
| `PR6` | Discord: *"you confirm that you're at least 13 years old"*; *"not designed for nor directed towards users under the age of 13"* | `[research: https://discord.com/terms]` |
| `PR7` | TikTok: *"If you are under 13 years of age, or under 14 years of age in Florida, you may not use the Platform"* | `[research: https://www.tiktok.com/legal/page/us/terms-of-service/en]` |
| `PR8` | YouTube: *"You must be at least 13 years old to use the Service"* | `[research: https://www.youtube.com/t/terms]` |

### The reopening condition: two independent gates, and passing both is still not enough

| gate | what must be true | who can satisfy it |
|---|---|---|
| `RG1` | A developer decision overruling `00-CORE.md`'s *"Success is shipped artifacts, not players"* and its two declined non-goals. **`[brief: binding]`, so no sheet may do this** | the developer, in writing |
| `RG2` | The operator passes Roblox facial age estimation or government ID as **16+** (`PR3`). The project has one developer and `cid/_playtest.md` is `n = 1`, so the operator is that person or nobody | the operator, on the platform |

**And the price, which is why this is not a scope closure:** with `RG1` and `RG2` both satisfied, the
link exists and **the 8-14 audience still cannot see it** (`PR1`, `PR2`). What is bought is a channel
visible to age-checked 16+ users, plus a moderation position for an 8-14 audience that nothing in
this project funds, plus (for `C1`) a Roblox community creation fee carried as `[unverified]` `U3`.
`C1` is the one row `RG1` alone reopens.

```manifest
{
  "provides": "channels",
  "status": "proposed",
  "value": {
    "presence": {
      "offPlatform": false,
      "onPlatformCommunity": false,
      "leadGround": "compliance",
      "scopeGroundAlsoHolds": true,
      "reachableByStatedAudience": false,
      "weakestRow": "C1"
    },
    "channelCount": 0,
    "channels": [],
    "externalUrlCount": 0,
    "externalUrlCountScope": {
      "counts": "urls that name a channel, server, community or account this project would operate",
      "excludes": ["platformRules[].source", "backedBy", "settledBy", "captureSource", "research tags", "any url cited as evidence"],
      "reason": "a cited url is what makes a closure sourced rather than asserted; counting it falsifies the check against the sheet that supplies it"
    },
    "robloxCommunityCount": 0,
    "postingCadence": "none",
    "postingCadenceStatus": "vacuous",
    "contentPillars": [],
    "contentPillarsStatus": "vacuous",
    "outreach": { "contactCount": 0, "paidPlacements": 0, "briefsIssued": 0, "keysIssued": 0, "claims": [] },
    "experiencePageSocialLinks": {
      "count": 0,
      "maxPermitted": 3,
      "platformTypeCount": 7,
      "platformTypes": ["Facebook", "Twitter", "YouTube", "Twitch", "Discord", "Guilded", "RobloxCommunity"],
      "viewableByAgeCheckedMin": 16,
      "addableByAgeCheckedMin": 16,
      "addMethods": ["facialAgeEstimation", "governmentId"],
      "effectiveDate": "2026-06-30",
      "raisedFrom": 13
    },
    "audience": {
      "min": 8,
      "max": 14,
      "maxBelowLinkThreshold": true,
      "dependsOnUnder13Split": false,
      "platformBandsStraddled": ["Under 9", "9-12", "13-15"]
    },
    "forbidden": [
      { "id": "C1",  "form": "robloxCommunity",        "closedBy": ["products.F15", "00-CORE.nonGoals"],                 "observable": "robloxCommunityCount == 0; 0 community ids in any manifest; 0 rendered strings match /group|community|join us/i" },
      { "id": "C2",  "form": "discordServer",          "closedBy": ["PR1", "PR6", "PR4", "PR5", "products.F15"],         "observable": "0 discord.gg or discord.com/invite urls in cid/** or game/src outside a citation field; 0 links of type Discord" },
      { "id": "C3",  "form": "tiktokAccount",          "closedBy": ["PR1", "PR7", "00-CORE.shippedArtifacts"],           "observable": "channelCount == 0; 0 tiktok.com/@ handles in any marketing key" },
      { "id": "C4",  "form": "youtubeChannel",         "closedBy": ["PR1", "PR8", "00-CORE.shippedArtifacts"],           "observable": "channelCount == 0; 0 youtube handles or /channel/, /c/, /@ urls in any marketing key" },
      { "id": "C5",  "form": "xAccount",               "closedBy": ["PR1", "00-CORE.nonGoals"],                          "observable": "channelCount == 0; 0 x.com/ handles in any marketing key" },
      { "id": "C6",  "form": "twitchChannel",          "closedBy": ["PR1", "PR3", "M2"],                                 "observable": "channelCount == 0" },
      { "id": "C7",  "form": "guildedServer",          "closedBy": ["PR1", "PR3", "00-CORE.nonGoals"],                   "observable": "channelCount == 0" },
      { "id": "C8",  "form": "facebookPage",           "closedBy": ["PR1", "PR3", "00-CORE.audience"],                   "observable": "channelCount == 0" },
      { "id": "C9",  "form": "postingCadence",         "closedBy": ["C1..C8", "OPEN.shipsAndSettles", "endgame", "notices"], "observable": "postingCadence == 'none'; 0 fields name a day, week, month or interval" },
      { "id": "C10", "form": "contentPillars",         "closedBy": ["C1..C8", "OPEN.shipsAndSettles", "endgame"],        "observable": "contentPillars == []; 0 launchBeats rows name a channel" },
      { "id": "C11", "form": "creatorOutreach",        "closedBy": ["00-CORE.nonGoals", "M2"],                           "observable": "outreach.* all 0; 0 claims[] rows addressed to anyone but a player" },
      { "id": "C12", "form": "experiencePageLinkSlot", "closedBy": ["PR3", "PR1"],                                       "observable": "experiencePageSocialLinks.count == 0 against maxPermitted 3; Creator Hub Social Links holds 0 entries" },
      { "id": "C13", "form": "externalUrlInExperience","closedBy": ["PR4", "PR5", "products.F15"],                       "observable": "grep -rniE 'discord|guilded|twitch|tiktok|youtube|twitter|social media|https?://' game/src returns 0" }
    ],
    "forbiddenCount": 13,
    "platformRules": [
      { "id": "PR1", "rule": "Social media links viewable, shareable and manageable only by age-checked 16+, effective 2026-06-30, raised from 13+", "source": "https://devforum.roblox.com/t/proposal-parental-consent-for-13-15-users-to-view-social-media-links-on-roblox/4686207", "role": "citation" },
      { "id": "PR2", "rule": "Settlement term: Roblox shall not allow U16 Users to see or share profile links to other approved sites", "source": "https://devforum.roblox.com/t/allow-users-age-checked-13-15-with-parental-consent-to-see-profile-social-media-links-not-in-regions-where-social-media-is-banned-for-under-16/4693383", "role": "citation" },
      { "id": "PR3", "rule": "Up to three links across seven types; adding requires creator age check 16+ by facial estimation or government ID", "source": "https://github.com/Roblox/creator-docs/blob/main/content/en-us/production/promotion/social-media-links.md", "role": "citation" },
      { "id": "PR4", "rule": "Creators prohibited from sharing or posting social media links in experiences; age bands Under 9, 9-12, 13-15, 16-17, 18-20, 21+", "source": "https://about.roblox.com/newsroom/2025/11/roblox-requires-age-checks-limits-minor-and-adult-chat", "role": "citation" },
      { "id": "PR5", "rule": "No linking to, sharing or displaying URLs of external sites except via the Social Links feature", "source": "https://about.roblox.com/community-standards", "role": "citation" },
      { "id": "PR6", "rule": "Discord requires users to be at least 13", "source": "https://discord.com/terms", "role": "citation" },
      { "id": "PR7", "rule": "TikTok requires 13, or 14 in Florida", "source": "https://www.tiktok.com/legal/page/us/terms-of-service/en", "role": "citation" },
      { "id": "PR8", "rule": "YouTube requires at least 13", "source": "https://www.youtube.com/t/terms", "role": "citation" }
    ],
    "platformRuleCount": 8,
    "reopening": {
      "gateCount": 2,
      "bothRequired": true,
      "gates": [
        { "id": "RG1", "condition": "a developer decision overruling 00-CORE.md 'shipped artifacts, not players' and the two declined non-goals", "tag": "brief: binding", "satisfiableBySheet": false },
        { "id": "RG2", "condition": "the operator passes Roblox facial age estimation or government ID as 16+", "tag": "platform", "satisfiableBySheet": false }
      ],
      "audienceStillCannotSeeAfterBothGates": true,
      "rowsReopenedByRG1Alone": ["C1"],
      "costs": [
        { "id": "RC1", "cost": "a moderation position for an 8-14 audience", "funded": false, "ownedBy": "community" },
        { "id": "RC2", "cost": "operator identity disclosure to the platform age check", "funded": false, "ownedBy": "the developer" },
        { "id": "RC3", "cost": "Roblox community creation fee", "robuxClaimed": 100, "sourced": false, "unverifiedId": "U3" }
      ]
    },
    "invariants": [
      "channelCount == len(channels) == 0",
      "externalUrlCount == 0 summed across title, storeIcon, storeThumbnails, storeListing, channels and launchBeats, counting only urls that name a channel this project would operate, per externalUrlCountScope",
      "robloxCommunityCount == 0",
      "experiencePageSocialLinks.count == 0",
      "contentPillars == [] and outreach.contactCount == 0",
      "any channel, invite, handle, group id or operated-channel url named by any other Discovery & Marketing key fails against this key"
    ],
    "seam": {
      "outboundOwnedHere": true,
      "inboundOwnedBy": "community",
      "revisionPath": "an inbound intake need is a revision request against this key naming the row, inheriting PR1"
    },
    "emitter": {
      "exists": false,
      "kind": "DOCUMENTATION_ONLY",
      "consumedBy": [],
      "gap": "M6 - nothing in the brief, either contract, or docs/cid-workflow.json makes an outward channel a build artifact"
    },
    "vacuousElsewhere": [
      { "sheet": "theme/tone/02", "row": "group posts", "reason": "this key rules the surface out of existence", "action": "recorded, not edited; routed to register work" }
    ],
    "unverified": [
      { "id": "U1", "claim": "X's stated minimum account age", "restsOn": "nothing; C5 is closed by PR1 and the non-goals", "settledBy": "rendering https://x.com/en/tos (HTTP 402) or https://help.x.com/en/rules-and-policies/twitter-age-screening (HTTP 403)" },
      { "id": "U2", "claim": "the Community Standards' own wording on under-13 off-platform links", "restsOn": "nothing; PR1 is strictly stronger and covers the whole 8-14 band", "settledBy": "rendering https://en.help.roblox.com/hc/en-us/articles/203313410 (host-level 403) or its creator-docs mirror" },
      { "id": "U3", "claim": "the Robux cost of creating a Roblox community, reported as 100", "restsOn": "nothing; it is a reversal-cost figure only", "settledBy": "rendering en.help.roblox.com/hc/en-us/articles/203313730 or roblox.fandom.com/wiki/Community (both HTTP 402)" }
    ]
  }
}
```

## Consequences for other work

| subject | what this forces or forbids |
|---|---|
| Store-listing copy work | **No external url, handle, invite or "join our" call to action, in any section**, and no line may reference a channel as a place to get anything. The listing's three social-link slots stay empty at publish. Whether the *absence* of a community is stated outward is yours, not mine |
| Launch-beat and trailer work | **No beat may assume a posting surface.** There is nowhere to post a teaser, a countdown or a reveal; the publish moment's outward half has no channel to land on, and a beat whose delivery mechanism is a channel fails `channelCount == 0` |
| Title work | No title tag, handle, prefix or suffix naming a channel or a community. A title that reads as a channel handle fails `externalUrlCount == 0` on inspection |
| Store-icon and thumbnail work | **No social-platform glyph, no watermark handle, no "follow us" or "join the group" overlay** on any slot or variant. This is independent of the humor ban and of `T6` |
| Community-management and feedback-intake work | You inherit an empty **outbound** set, and this key is the half of `G1` that says so. Your `channels == []` and mine agree by construction. If you conclude an off-platform intake must exist, raise a revision request naming `C2`; do not create one, because it hands you a moderation position for an 8-14 audience that nothing funds |
| Register work (`theme/tone`) | `theme/tone/02`'s *"group posts"* row is now **vacuous**. Not edited here. Whether it is rewritten, dropped or kept as a forbidden surface with no referent is yours |
| Publish-checklist work (`release`) | **Creator Hub → Creations → Social Links must hold zero entries at publish, and no checklist row reads it back.** Stated as an obligation with `ownedBy: release`; I add no row on my own authority |
| Contract-and-seam work | `channels` merges and reaches **no emitter** (`M6`). It is `DOCUMENTATION_ONLY` in the emitted-config sense and every field in it is a value or a count a verifier reads. If `channels` is judged to duplicate `community`, the distinguishing line is outbound versus inbound, stated in `seam`. **`externalUrlCountScope` is a field the schema must carry**, because the invariant is unrunnable without it |
| Verification | The useful part of this key is a check on five sibling keys, not on itself: `externalUrlCount == 0` summed across `title`, `storeIcon`, `storeThumbnails`, `storeListing`, `channels` and `launchBeats`, **counting operated channels and not cited evidence**. A `T0` `backedBy` url and a `platformRules[].source` are exempt by name |

## Acceptance criteria

1. `channels.channelCount == 0` and `== len(channels.channels)`; `robloxCommunityCount == 0`;
   `experiencePageSocialLinks.count == 0` against `maxPermitted: 3`; `postingCadence == "none"`;
   `contentPillars == []`; `outreach.contactCount`, `paidPlacements`, `briefsIssued` and
   `keysIssued` are each `0`; and the merged value contains **zero `null` tokens**.
2. Summed across `title`, `storeIcon`, `storeThumbnails`, `storeListing`, `channels` and
   `launchBeats`, the number of **operated-channel references** (an external url, Discord invite,
   social handle or Roblox community id naming a channel this project would run) is **0**. Fields
   whose role is citation are excluded by name and are not counted: `platformRules[].source`,
   `backedBy`, `settledBy`, `captureSource`, and any `[research: url]` tag.
3. `channels.forbidden` has exactly **13** rows, each with `id`, `form`, `closedBy` and `observable`,
   every `id` unique and matching `/^C\d+$/`; `channels.platformRules` has exactly **8** rows, each
   carrying `role: "citation"`, and every `source` string appears in `cid/_research/pack.md`.
4. `grep -rniE "discord|guilded|twitch|tiktok|youtube|twitter|social media|https?://" game/src`
   returns **0** matches (verified this run). Run over `game/src`, `/group/i` returns **≥5**
   non-player-facing matches (`PROGRESS_GROUP`, `colorToken(group, …)`, `groupGap`, `Group_`,
   collision groups); scoped to strings assigned to a `Text` property it returns **0**.

## Flagged to the developer

**The brief is silent on off-platform presence entirely** (`G1`: no group, no Discord, no account
named in any of five layer sheets, `OPEN.md` or `research/`), so ruling it to zero is `[cid: decided]`
on the silence. Live alternatives: **(a)** zero everywhere, as written, closed on compliance first;
**(b)** zero off-platform but a Roblox community created and left unlinked, which `PR1` does not
forbid and which `F15` and the non-goals do; **(c)** a channel behind both reopening gates, bought at
`RC1`-`RC3` and still invisible to the stated audience. **I recommend (a).** Also `[cid: decided]`:
extending the enumeration from the four channels my assignment named to **all seven linkable types
plus TikTok plus the in-experience url**, so the key is closed rather than illustrative; recording
`C9`/`C10` as **vacuous** rather than empty; and `externalUrlCountScope`, which decides that a cited
url is evidence and not a channel.

## Not decided here

How inbound feedback is received, triaged or moderated, and what `cid/_playtest.md` admits, all of it
community-management work holding the other half of `G1`. Whether the absence of a community or a
Discord is ever *stated* in outward copy, which is store-listing work. What the publish checklist
reads back about social-link slots, which is `release`. Whether `theme/tone/02`'s now-vacuous *"group
posts"* row is rewritten, which is register work. Whether a launch is announced at all and in what
form, which is launch-beat work; I rule only that no announcement has a channel to use. Whether
`channels` is promoted into `bridge/schema.mjs` and whether `externalUrlCountScope` becomes a shared
field the other five marketing keys inherit, which is contract-and-seam work. The three `[unverified]`
items `U1`-`U3`, which a batched research pass settles and on which nothing in this sheet rests.
