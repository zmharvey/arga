# Community — domain index

**Category:** Live Ops · **Wave:** 7 · Reads: `cid/liveops/_category.md`; brief
`concept/spec/incremental-spinoff-v2/` — `HANDOFF.md`, `00-CORE.md`, `03-META.md`,
`05-OUTWARD.md`, `OPEN.md` (§1–§6); `cid/_contract.md`, `cid/_state.md`, `cid/_playtest.md`;
`cid/gameplay/social/01-server-and-co-presence.md`, `/03-nothing-between-players.md`;
`cid/tech/security/03-violation-response-and-logging.md`;
`cid/tech/deploy/01-the-release-contract.md`; `cid/ui-ux/feedback/01-the-notice-channel.md`,
`/03-system-notices.md`; `cid/gameplay/monetization/01`, `/02` (`F15`);
`game/src/server/World.luau`, `game/src/` (grep).

**Contract position, stated first because it sets the sheet count.** `cid/_contract.md` holds
**25 keys and none of them is mine.** `community` does not exist and I propose it. (I read the
derived file rather than running `npm run bridge -- --contract`: this agent has no shell. The
repo states `cid/_contract.md` is regenerated from `bridge/schema.mjs` by `npm run cid:leadpack`,
and a grep for a `community` proposal across `cid/**` returns nothing, so the key is unclaimed
by any wave-1–6 sheet.)

---

## What the brief gave me

Nothing in my subject. Every line below is a constraint on it, not an answer inside it.

- *"**8–14, mobile-heavy**, short sessions"* · *"10–20 minute active sessions"*
  `[brief: binding]` ← `[you chose: R1 Q4]` (`00-CORE.md`). **This is the only reason my domain
  is not empty.** An audience floor of eight is what makes a moderation position a real
  question rather than a formality, and it is what makes "the platform defaults are sufficient"
  a claim that has to name the defaults.
- *"**Success is shipped artifacts, not players**"* · *"Beating the genre's retention curve.
  Offered and declined"* `[brief: binding]` ← `[you chose: R1 Q3]` (`00-CORE.md`). A community
  process is measured by whether it is executable and checkable. There is no audience to hold
  and no staffing to assume.
- *"the **smallest game** that still gives every creative area real work"* `[brief: binding]` ←
  `[you chose: R1 Q3]`. Inventing a channel so that this domain has something to manage breaks
  the target.
- *"Ships and settles. No seasons or events."* `[brief: soft]` ← `[I assumed — batched]`, **0
  interview questions** (`OPEN.md` §1, §2). The whole of the brief's live-ops direction, at the
  weakest tag in the ladder. It says nothing about moderation either way.
- **Priority 3** (`03-META.md`) `[brief: soft]` ← `[I assumed — the ordering]` names *"codes ·
  daily rewards · leaderboards · trading · seasons and events"* and **does not name moderation,
  feedback or community management.** My subject is not scope-excluded. Two of its eight
  members reach me sideways — a group-join reward and a leaderboard are both channel-shaped —
  and both are already closed by `products` `F15` and `social` `X1`/`X8`.
- *"the ruin's identity … all naming"*, *"Name, icon, thumbnail, store description"*
  (`OPEN.md` §4) route outward-facing surface work away from me. The working name is still a
  placeholder (`OPEN.md` §3), so no channel could be named today even if one existed.

### Approved upstream rulings I inherit and do not re-decide

| ruling | where | what it does to my subject |
|---|---|---|
| `social.chat` off on all three surfaces — window, bubble, voice; `playerAuthoredStringsToOtherClients: 0`; `overridesPlatformDefault: "ChatWindowConfiguration.Enabled defaults to true"` | `gameplay/social/01` | Removes the largest ordinary moderation surface. **Verified in code, and the shipped build closes a fourth surface the manifest does not name**: `World.luau`'s `CHAT_SURFACES` disables `ChatInputBarConfiguration` as well, because with only the window and bubbles off *"a player can still open the input bar, type, and have the string delivered to every other client's TextChannel — invisibly, but delivered"* `[research: game/src/server/World.luau]` |
| `social` `X9` — no remote handler accepting a string later rendered to a different client; `X7` — no replicated payload carrying another player's identifier; `X11` — no join/leave notices naming a player | `gameplay/social/03` | There is no UGC in this game: no names, no builds, no trades, no strings. **A moderation surface needs a thing one player made that another player sees.** None exists |
| `integrity.response` — five tiers, `L4` (`kick`/`ban`) `exists: false`, `playerEverAffected: false`, the whole response is a rate-capped log record | `tech/security/03` | Owns **exploit** response. Explicitly not conduct. Its `forbidden` row on `Player:Kick` is scoped *"the integrity path only"* and **explicitly excludes** `persistence/01`'s stale-session release |
| `release.shutdown.playerFacing: "nothing"`; `release.forbidden` `N8` — no maintenance or lockout flag, *"there is no permitted surface to explain one"*; `P3`/`P4` unasserted | `tech/deploy/01` | No escalation path may assume the game can address a player. `P4` (voice) has `readableBack: "none"`; `P3` (`ChatVersion`) is `[unverified]` |
| `notices` — exactly two beat members and one system member; 24 `forbidden` rows including `rejoinInstruction`, `playerJoinOrLeaveNotice`, `dismissControl`, `tutorialCallout` | `ui-ux/feedback/01`, `/03` | The in-game notice channel cannot carry anything I would want to say. Adding a member is a revision request against that key, not a Community decision |
| `products` `F15` — *"No code entry field, and no like, favourite, follow, group-join, rate-us or share prompt, anywhere in the game"*; check *"zero `TextBox` instances in any screen"* | `gameplay/monetization/01`, `/02` | Closes the **in-game intake surface** by grep, independently of scope |
| `kpis.cadence` is a bounded post-publish window that closes; `kpis.verdictRule` makes a breached row produce *"a revision request against a named sheet and field, never a live change"*; *"no live tuning response exists and none may be invented"* | `analytics/kpis/02` | **I may not publish a second review cadence.** My triage rule inherits its disposition shape |
| `cid/_playtest.md` — one session, `n = 1`, the developer, untimed; three defects, one (`1/2/3` keypress) **unresolved** | `cid/_playtest.md` | The only empirical reading that exists, and the only artifact into which anything resembling feedback has ever landed |

---

## What the brief did not give me

Six gaps. Each is routed to the sheet that must decide it. None is filled here.

| # | gap | routed to |
|---|---|---|
| **G1** (category) | **The brief states no off-Roblox presence anywhere** — no group, no Discord, no social account, in any of five layer sheets, `OPEN.md` or `research/`. The category's own verification check (*"every channel referenced exists in the brief's stated off-Roblox presence"*) has an **empty referent** and currently passes vacuously | **01**, which must rule it and make the check non-vacuous by publishing an explicit empty set with a reason per candidate |
| **G4** (category) | **No moderation, ban, appeal or age-based-communication position exists anywhere in the brief.** Integrity is *"never asked and never confirmed"* (`OPEN.md` §1) and scopes itself to the economy and the collection | **02** |
| **G-C1** (mine) | **The brief states no content-maturity or age-rating position**, and the platform makes one a condition of being playable: *"If an experience does not have accurate or all content maturity information, Roblox restricts the playability of the experience on the platform for all players"* `[research: https://create.roblox.com/docs/production/promotion/experience-guidelines]`. `release.publishChecklist` has four rows and this is not one of them | **02**, which states it as a `community` obligation with an owner of `release`, and files a revision request against `tech/deploy/01`. **02 does not add a checklist row on its own authority** |
| **G-C2** (mine) | **Nothing states what a player report about this experience does.** Two official Roblox pages describing the in-experience report flow name no creator role and no creator-facing report queue; a developer feature request asking for one is open | **02**, carried as `[unverified]` with named settling fetches, never as a sourced claim |
| **G-C3** (mine) | **`cid/_playtest.md` has no owner, no admission rule and no disposition rule.** It was created by Analytics to close a *pipeline* gap (*"no artifact type for an empirical reading"*), not as a feedback process, and it carries one unresolved defect that has been unresolved across a wave boundary | **01** |
| **G-C4** (mine) | **`social/01`'s `[research owed:]` on the platform's age-based communication defaults has never been paid**, and the age band is the binding line my whole domain rests on | **Paid below.** The finding routes to **02**, which must state it as *confirming* `social`'s ruling on a second, independent ground and **not** as an overrule |

---

## The five subjects, each with its ruling and a mechanical check

**These are lead rulings that scope the sheets, not the sheets' content.** Each sheet carries
its subject as data with the full derivation, and may overturn a row here only in a
`## Pushing back` section that names this file.

| subject | ruling | mechanical check | sheet |
|---|---|---|---|
| **feedback intake channels** | **Empty. `channelCount: 0`.** No off-Roblox channel exists, none is created, and none may be referenced. Three independent grounds, and the second is the one that matters: (1) the brief states no presence anywhere `[cid: decided]` on the silence; (2) *"Social media links are only visible to users who have verified their age as at least 16 years old"* `[research: https://create.roblox.com/docs/production/promotion/social-media-links]` — **the stated audience is 8–14, so zero percent of it can see one**; (3) *"You may not link to, share, or display URLs of any external websites or services except by using the Social Links feature"* and *"You cannot share social media links directly within a game"* `[research: https://about.roblox.com/community-standards]`, which agrees with `products` `F15` from outside the project | `community.channels == []`; `community.channelCount == len(community.channels)`; `grep -rniE "discord\|guilded\|twitter\|youtube\|twitch\|join our\|our group\|social" game/src` returns nothing; `products F15`'s existing grep still returns zero | **01** |
| **triage and response process** | **Non-empty, and the thinnest real thing this domain has.** `cid/_playtest.md` is the intake of record. A reading is classified by `CLAUDE.md`'s two stopping-rule bars and every class dispositions to **a revision request against a named sheet and field**, matching `kpis.verdictRule`. **No cadence is published** | `community.triage.classes` is a closed list, each with exactly one `disposition`; no `community` field names a day, a week or an interval; `kpis.cadence` remains the only cadence in the merged manifest | **01** |
| **moderation policy and escalation** | **Non-empty, and it is a derivation with a check rather than a document.** The conduct-surface set is empty — enumerated, each closed by an approved sheet and a grep — so the policy is the enumeration plus the two conditions it rests on (`P3`, `P4`), plus the platform baseline the experience inherits whether or not anyone writes it down. **Escalation in-game: none exists and none may be invented** — `release.shutdown.playerFacing: "nothing"`, `notices` cannot carry it | `community.conductSurfaces == []` with one `closedBy` **and one grep** per row; every row's grep returns zero against `game/src`; `community.escalation.inGameSurface == "none"` cites `notices` and `release` by field | **02** |
| **ban and appeal handling** | **Empty at the experience level, held by the platform at the account level.** This game calls no `Players:BanAsync`, `UnbanAsync` or `GetBanHistoryAsync` — the API is real and available `[research: https://create.roblox.com/docs/reference/engine/classes/Players#BanAsync]`, which is why the absence has to be a **decision** and not an oversight. No appeal surface is owed because the game issues nothing to appeal, and no appeal surface could be staffed: *"Success is shipped artifacts, not players"* `[brief: binding]` | `grep -rn "BanAsync\|UnbanAsync\|GetBanHistoryAsync\|banList" game/src` returns nothing. **The check may NOT grep `:Kick(` globally** — `persistence/01` AC3 requires exactly one, and three domains have already written that over-broad observable | **02** |
| **community roles** | **Empty. `roleCount: 0`.** No moderator, admin, tester, VIP, contributor or group rank exists, in-game or out. There is no channel for a role to act in (subject 1), no conduct to act on (subject 3), no verb to act with (`input` is a closed five-verb list), and no way to display one (`social` `X1` bans `leaderstats`, `X2` bans `Team`, `X6` bans overhead labels, `X7` bans the payload that would carry a rank) | `community.roles == []`; `community.roleCount == len(community.roles)`; `grep -rn "leaderstats\|TeamColor\|GetRankInGroup\|IsInGroup\|GetRoleInGroup" game/src` returns nothing | **01** |

**An on-Roblox group is a separate question from an off-Roblox channel and gets the same
answer.** The brief names no Roblox community either, `products` `F15` bans a group-join prompt
by grep, and *"a Roblox community"* is one of the seven social-link types with the same 16+
visibility rule. Sheet 01 rules both rather than ruling one and leaving the other to a reader.

---

## Why 2 sheets

**One key, so one sheet carries it; one genuinely separate decision, so one sheet amends it.**
`community` is a single proposed key and `bridge/merge.mjs` permits exactly one sheet to
*propose* a key, so sheet 01 supplies it whole and sheet 02 carries an `amends: "community"`
block — the shape `ui-ux/feedback/03` and `tech/security/03` both already use inside their own
domains, so it is a merge pattern the pipeline has run rather than an invention.

The split is not thematic. It is that **the two rulings are true for unrelated reasons and fail
independently.** Sheet 01's ruling turns on the brief's silence plus a platform *visibility*
rule about an audience band; if the developer creates a Discord tomorrow, 01 is wrong and 02 is
untouched. Sheet 02's ruling turns on the *absence of a conduct surface* plus a platform
enforcement architecture; if `P4` is ticked wrong and voice ships, 02 is wrong and 01 is
untouched. Folding them together would produce one sheet whose reversal condition is a
disjunction, and a reader could not tell which half a later finding hit.

**What I considered and did not assign, with the reason:**

- **A third sheet for the `P4` voice finding.** It is the *condition* sheet 02's ruling rests
  on, not a second decision. It belongs inside 02 next to the ruling it can falsify, and it
  would be a heading if it were split out. The category is explicit that I state the `P4`
  consequence and do not own the checklist.
- **A sheet for the content-maturity questionnaire (G-C1).** Same reason plus a boundary one:
  the decision it would make is `release`'s, and a Community sheet deciding a publish row would
  be a second answer to an approved key. It goes into 02 as an obligation with `ownedBy:
  release` and a revision request.
- **A sheet on "what the platform does that we inherit".** This is background for both sheets,
  not a decision. It is the research pack's job, and I have paid it below rather than making a
  writer restate it as a sheet.
- **Anything about how the game is announced, named or promoted.** `does_not_own` — Discovery &
  Marketing. Where my ruling forces something there, it is stated as a consequence below.
- **A sheet proposing a feedback channel.** That is inventing to fill a gap. The gap is named
  as G1 and the empty set is the output.

| # | sheet | must decide |
|---|---|---|
| 01 | `no-channel-and-the-intake-of-record` | Rule whether any channel exists through which a player can reach this project — off-Roblox, on-Roblox group or community, or in-game — and having ruled, decide what the intake of record actually is and what a reading in it does; supply the proposed key `community` whole, carrying `offRobloxPresence` with the argument rather than the verdict alone (the brief's silence, the 16+ visibility rule against an 8–14 audience, and the Community Standards prohibition on in-experience linking, which agrees with `products` `F15` from outside the project), `channels: []` with one `closedBy` and one grep per candidate class (Discord, Guilded, Twitter, YouTube, Twitch, a Roblox community, an in-game intake surface), `roles: []` on the same footing, `channelCount`/`roleCount` as counts so an empty set is checkable the way `music.trackCount` is, `intakeOfRecord` naming `cid/_playtest.md` with the admission rule and required fields a reading must carry to be citable (`n`, who, build, what was observed rather than what it implies, and the sheet and field it bears on), and `triage` as a closed class list classifying an observation by `CLAUDE.md`'s two stopping-rule bars with exactly one disposition each, every disposition being a revision request against a named sheet and field per `kpis.verdictRule` and never a live change — publish no cadence, no interval and no schedule, because `kpis.cadence` owns the review rhythm and closes it, and state in one line that the reversal condition for this whole sheet is Discovery & Marketing creating a channel, which would make it wrong and cost a moderation position it does not today have to hold. |
| 02 | `moderation-ban-and-appeal` | With a manifest block that `amends` `community` and proposes no key, rule the moderation, ban and appeal position for an 8–14 audience on a game with zero player-authored content: enumerate every conduct surface one player could use against another (text chat, bubble chat, the chat input bar, voice, a name or nameplate, a plot sign, an overhead label, a build, a trade, a gift, a leaderboard position, a report of another player, body-blocking) and close each with the approved sheet **and** a grep, noting that the shipped build closes a fourth chat surface (`ChatInputBarConfiguration`) that `social.chat` does not name; state where `integrity`'s jurisdiction ends and yours begins in one paragraph — it owns machine-detected exploitation of the game's own systems and terminates at a log record with `L4.exists: false`, you own conduct by a person toward a person, the sets do not intersect and neither is the other's fallback — without restating its five tiers; rule that this game calls no `Players:BanAsync`, `UnbanAsync` or `GetBanHistoryAsync`, with a grep that names those three symbols and **does not** grep `:Kick(` globally because `persistence/01` AC3 requires exactly one and three domains have already shipped that mistake; rule that account-level moderation and appeal are the platform's and that the developer has no role in either, carrying the "only the account owner may appeal" claim as `[unverified]` with its settling fetch rather than as sourced; record the two conditions this whole ruling rests on (`release.publishChecklist` `P4`, voice, `readableBack: "none"`, and `P3`, `ChatVersion`, `[unverified]`) as `restsOnHumanTick: true` fields with the failure each produces; state the platform's age-check regime as a second and independent ground that **confirms** `social.chat: false` rather than overruling it; and carry the content-maturity obligation as `ownedBy: "release"` with a revision request against `cid/tech/deploy/01-the-release-contract.md` for a fifth checklist row, adding no row yourself. |

---

## The contract key I need

`community` does not exist in `bridge/schema.mjs`. Proposed shape, so whoever writes the schema
has something to write against:

```
community.offRobloxPresence   object  { exists: false, ruledBy, groundsCount: 3, reversalCondition }
community.channels            array   [] — each: { id, class, closedBy, observable }
community.channelCount        int     invariant: == len(channels)
community.intakeOfRecord      object  { path, admissionRule, requiredFields[], openDefects }
community.triage              object  { classes[]: { id, bar, disposition }, cadence: null }
community.roles               array   [] — each: { id, closedBy, observable }
community.roleCount           int     invariant: == len(roles)
community.conductSurfaces     array   [] — each: { id, closedBy, observable }   (amended by 02)
community.moderation          object  { authority, developerRole, restsOnHumanTick[] }  (02)
community.ban                 object  { experienceLevel: "none", apisNotCalled[], appeal }  (02)
community.platformObligations array   [{ id, requirement, ownedBy, revisionRequest }]  (02)
```

**The useful invariants are the count pairs**, on the `music.trackCount == len(music.tracks)`
pattern: `channelCount`, `roleCount` and a `conductSurfaces` length of zero are what turn three
empty sets into three checkable assertions. **A cross-key invariant worth writing:**
`community.channelCount == 0` implies `products.forbidden[F15]` still holds, and
`community.conductSurfaces` being empty implies `social.chat` is false on all three surfaces —
so if a later wave turns chat on, this key fails rather than silently going stale.

`community` is `DOCUMENTATION_ONLY` in the emitted-config sense: no `GameConfig` value comes out
of it. **That does not make it prose** — every field above is a value a verifier reads and four
of them are counts a grep confirms. Sheet 02 says this in one line rather than leaving a reader
to wonder why nothing reaches `GameConfig`.

---

## Consequences for other work

Stated as consequences, not assignments. Named by kind of work.

- **Off-Roblox channel and social-account work [currently Discovery & Marketing — Social /
  Hype].** You inherit an **empty channel set**, and the reason is not only that the brief is
  silent: a social link is *"only visible to users who have verified their age as at least 16
  years old"* and the stated audience is 8–14, so a channel created for this game reaches none
  of its intended players through the experience page. Creating one anyway is legitimate and it
  is a **decision that hands this domain a moderation position it does not currently hold** —
  raise it against sheet 01 rather than treating the empty set as an oversight. G1 lands in both
  categories and neither closes it alone.
- **Icon, thumbnail and store-page work [Discovery & Marketing].** No "join our Discord" or
  "join the group" call to action has a referent, on any surface, and Community Standards bars
  the in-experience form of it independently of anything CID decided.
- **Publish-checklist work (`release`, `tech/deploy`).** One revision request is coming from
  sheet 02 for a fifth row: the Maturity & Compliance questionnaire, whose absence *"restricts
  the playability of the experience on the platform for all players"*. It fits your own routing
  test exactly — a settings surface, no file, no diff, no build step. Sheet 02 states the
  obligation and does not add the row.
- **Chat-configuration work (`social`, `world`).** Nothing is owed and nothing is overruled.
  The age-check research `social/01` left owed is paid below and it **confirms** your ruling on
  a second ground. One thing worth your attention that is a finding and not a request: the
  shipped `World.luau` disables `ChatInputBarConfiguration`, a fourth surface `social.chat` does
  not name, and the module's own comment explains why. The manifest has three chat booleans and
  the build closes four surfaces.
- **Exploit-response work (`integrity`, `tech/security`).** Sheet 02 draws the jurisdiction line
  and adds no tier, reuses none of your five, and asks nothing of you. Your `Player:Kick`
  scoping — *"the integrity path only"*, with `persistence/01`'s stale-session release
  explicitly excluded — is adopted as written and my ban check greps three ban symbols rather
  than `:Kick(`.
- **Empirical-reading work (whoever maintains `cid/_playtest.md`).** Sheet 01 gives that file an
  admission rule and a disposition rule it does not currently have. The unresolved `1/2/3`
  keypress defect gets a class and a route, not a fix.

---

## Verification note

**Sheet 01 is the one most likely to be contradicted later, and by Discovery & Marketing —
Social, this same wave.** Its ruling is a statement about a world outside the game: it is true
only while no channel exists, and a sibling lead in a parallel category can make it false by
deciding to create one. That is the intended direction — G1 is a joint gap and it is better for
Marketing to break my empty set out loud than for me to invent a channel to be safe — but it
means sheet 01 must publish its reversal condition as a field, not as a sentence, so a merge
against a Marketing sheet that names a Discord fails loudly rather than leaving two sheets
disagreeing in prose.

**The second candidate is sheet 02, contradicted not by a lead but by a human.** Its whole
ruling rests on two publish rows nobody can assert: `P4` (voice) has no read-back at any level,
and `P3` (`ChatVersion`) is `[unverified]`. If either tick is wrong at publish time, an
unmoderated audio or text channel exists for an 8–14 audience against every sheet in this repo,
and **the first thing anyone would learn about it is a report to Roblox that the developer never
sees.** That is why `restsOnHumanTick` has to be a field.

**A third, lower-probability route:** sheet 02's conduct-surface enumeration goes stale if a
later wave adds any player-authored value to the wire. `social` `X7` and `X9` make that
unbuildable rather than merely unbuilt, so the enumeration should cite them as the guarantee
rather than re-listing the surfaces they close.

---

## Research owed

My graph node carries **no `must_verify`**. The category assigned me two owed items and I found
three more that my sheets would otherwise have to assert. **Everything below was fetched by me
and lands in `cid/_research/pack.md`; my writer has no fetch tools and this is all the external
evidence it gets.**

### Paid

| what | source | what it settles |
|---|---|---|
| Social-link visibility and the in-experience linking ban | `https://create.roblox.com/docs/production/promotion/social-media-links` (rendered) and `https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/production/promotion/social-media-links.md` (generation source, fetched to confirm the rendered page) | *"Social media links are only visible to users who have verified their age as at least 16 years old."* · *"If you're under 16 years old or haven't verified your age, the UI to add social media links to games, communities, and Creator Store assets is hidden."* · *"You cannot share social media links directly within a game."* · Seven link types: Facebook, Twitter, YouTube, Twitch, Discord, Guilded, and a Roblox community. **This is the load-bearing fact for G1.** A web-search snippet gave the threshold as 13; both official pages say **16**, and the sheets cite 16 |
| Directing users off-platform | `https://about.roblox.com/community-standards` | *"You may not link to, share, or display URLs of any external websites or services except by using the Social Links feature"* · *"Users must complete Roblox's age check process and be at least 16 years old to access the social links feature."* Top-level categories: Safety, Civility, Integrity, Security |
| **The age-based communication defaults `social/01` left owed (G-C4)** | `https://about.roblox.com/newsroom/2025/11/roblox-requires-age-checks-limits-minor-and-adult-chat` | A facial age check is required to access chat; six age groups — *"Under 9, 9-12, 13-15, 16-17, 18-20, or 21+"*; users chat by default with their own and adjacent groups; *"chat in experiences will be turned to default off for users under nine years old, unless a parent provides consent after an age check"*; enforcement from early December 2025 in select markets, global early January 2026. **This confirms `social.chat: false` on a second, independent ground and overrules nothing:** the gate is on the *account*, not on the place, so `ChatWindowConfiguration.Enabled` still defaults to `true` and `social/01`'s `overridesPlatformDefault` remains correct as written |
| The report surface, and whose it is | `https://about.roblox.com/reporting-and-blocking` · `https://about.roblox.com/newsroom/2026/07/how-in-game-reporting-works-on-roblox` · `https://about.roblox.com/newsroom/2026/07/major-updates-in-game-reporting-tools` | Reporting is the Roblox client's own: menu → shield icon labelled Report, choose Experience or Person. Blocking is on the profile. Reports are *"routed to the most appropriate team"*. **All three pages describe the flow end to end and none names a creator or developer role** |
| The ban API is real and available | `https://create.roblox.com/docs/reference/engine/classes/Players#BanAsync` | `Players:BanAsync` and `Players:UnbanAsync` exist, taking `UserIds`, `Duration`, `DisplayReason`, `PrivateReason`, `ExcludeAltAccounts`, `ApplyToUniverse`. **This is why "no ban" is a decision rather than a description of a limitation**, and it is what sheet 02's reversal cost is priced against |
| Content maturity is a publish condition (G-C1) | `https://create.roblox.com/docs/production/promotion/experience-guidelines` | The Maturity & Compliance Questionnaire produces one of four labels (Minimal, Mild, Moderate, Restricted) mapped to age bands including 5–8 and 9–15. *"If an experience does not have accurate or all content maturity information, Roblox restricts the playability of the experience on the platform for all players."* **A publish obligation no sheet in this repo carries** |

### Not paid, and named precisely rather than waved at

- **Whether a creator can see reports filed inside their own experience (G-C2).** `[unverified]`
  — three official pages describe the report flow and none mentions a creator role, which
  supports the weak form (*no creator report queue is documented*) and not the strong form
  (*none exists*). **Settling fetch:** `https://create.roblox.com/docs/production/publishing` and
  the Creator Hub moderation documentation rendered with its left-hand navigation; failing that,
  the open developer feature request *"Roblox should give developers access to the in-game
  reporting system"* checked for a staff reply. Sheet 02 must carry the weak form.
- **"Only the owner of an account may send an appeal."** `[unverified]` — this reached me
  through a search summary and **not** through a page I fetched.
  `https://en.help.roblox.com/hc/en-us/articles/360000245263-Appeal-Your-Content-or-Account-Moderation`
  returns **HTTP 403** to this tool, as does every `en.help.roblox.com` article I attempted
  (three). I substituted `about.roblox.com/community-standards` for the Community Standards
  article successfully, and `about.roblox.com/safety` for the appeals article **unsuccessfully**
  — it describes reporting and blocking and says nothing about appeals. **Settling fetch:** that
  help-centre article retrieved by a tool that is not blocked by its CDN, or the Roblox Terms of
  Use section on suspension and termination. **Sheet 02's ruling does not depend on it:** the
  game issues no ban, so no appeal is owed regardless of who may file one, and the claim is
  quoted as unverified or dropped rather than dressed as sourced.
- **The 8–14 band's own reading level and comprehension of a moderation concept.** Not fetched
  and not needed: no sheet here writes a player-facing string. `notices` holds every string in
  the game and neither of my sheets adds one.
