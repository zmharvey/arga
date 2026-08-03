# 01 — Whether an event exists

**Domain:** liveops/events · **Category:** Live Ops · **Wave:** 7

## Decision

**This game ships zero events. `eventCount: 0`, `events: []`.** All five of this domain's subjects
are recorded absent rather than dropped, and the ruling rests on `00-CORE.md`'s binding retention
non-goal — **not** on any claim that the mechanism is unavailable.

## Why

**The mechanism exists and I am not resting on its absence.** Roblox's Creator Dashboard Events &
Updates feature is real: *"you can publish a maximum of 10 ongoing or upcoming events"*, *"The best
events run for 7-30 days"*, and joining through an event entry point puts the event ID in the
player's `GameJoinContext`, read with `GetJoinData()`
`[research: https://create.roblox.com/docs/production/promotion/experience-events]`. The docs state
**no requirement to change the experience at all**. A ruling that said "there is no way to do this"
would collapse the first time a reader opened that page.

**What holds it closed is the line I may not touch.** *"Beating the genre's retention curve.
Offered and declined."* `[brief: binding]` ← `[you chose: R1 Q3]`, beside *"Success is shipped
artifacts, not players"* and *"the smallest game that still gives every creative area real work"*.
An event is a retention instrument whose purpose is a declined goal. Ruling **R-3** already refused
the under-scoping finding on this exact ground `[research: cid/_state.md]`.

**The two lines everyone will quote at me are the weak ones, relayed at their real strength.**
`03-META.md` priority 3's *"seasons and events"* is `[brief: soft]` ← `[I assumed — the ordering …
no explicit priority list was interviewed]`. `OPEN.md §2`'s *"Ships and settles. No seasons or
events."* is `[brief: soft]` ← `[I assumed — batched]` at **0 interview questions** (`OPEN.md §1`).
`HANDOFF.md` rates `[I assumed]` *"freely arguable."* **I upgrade neither**, and the zero does not
need them.

**The circularity, relayed as found.** `05-OUTWARD.md` justifies the live-ops default with
*"priority 3 already excludes seasons and events, so the default is constrained by a decision
already made"* — while `03-META.md`'s own bracket says that ordering was never interviewed. §2 is
constrained by an assumption. `[cid: decided]` to state it upward, not repair it.

**The reference is the counterweight and its asymmetry is the useful part.**
`research/grass-incremental.md` says the absence of *codes and a group-join reward* *"reads as an
unfinished game"* `[research: https://www.rosenberryrooms.com/grass-incremental/]` — it names those
two and **not events**. The reference's page carries a group-join boost and a like/favourite ask and
lists **no event** `[research: https://www.roblox.com/games/133086043677134/Grass-Incremental-Simulator]`
`[unverified: whether it has ever run one — an experience page shows only active and upcoming
events, so today's empty listing is not a history. Settled by that experience's Events & Updates
listing including its Finished tab, or an archive of its event pages.]` A weekly cadence sustained
for a year still leaves it at ~12–16% of its 10,435 all-time peak
`[research: https://www.rolimons.com/game/133086043677134]`.

### The five subjects, each recorded absent with its observable

| subject | ruling that empties it | observable |
|---|---|---|
| **event concepts** | `00-CORE.md` retention non-goal `[brief: binding]`, upheld by R-3; `endgame.forbidden[seasonalEvent]` | `eventCount == 0` and `len(events) == 0`; count of `GetJoinData` / `EventId` reads in `game/src`: **0**, verified this run |
| **duration and timing** | `02-GAMEPLAY.md` *"Zero tension is deliberate"* — a window is tension with a clock on it; `release.forbidden` `N2`, `N10`; plus `EV10`, which this sheet writes itself | count of `os.time`, `os.date`, `DateTime` in executable code under `game/src`: **0**, verified (`os.clock` is monotonic and excluded by name). Rendered countdown strings: **1 today**, `Screens/shop-v2.luau:223` — finding `F-E1` |
| **exclusive rewards** | `03-META.md` *"Never content access"*; `discovery.repeat.possible: false`; the collection is closed at 24 names; `endgame.forbidden[secondCollection, secondCurrency]` | `sum(len(collection.sets[i].relics)) == 24` over four sets of six, every name reachable by clearing alone; count of grants conditioned on a date, a window or an event id: **0** |
| **entry requirements** | vacuous at zero events; the game has exactly one content gate — `depths.areas[].unlock` is `"none"` at ordinal 1 and `previousAreaComplete` at ordinals 2–8, and `endgame.postTerminalArea.unlock` is `previousAreaComplete` | count of areas whose `unlock` is neither `"none"` nor `previousAreaComplete`: **0** |
| **post-event handling of unspent currency** | **vacuous, said here rather than left to a verifier.** Zero events → zero event currencies → nothing unspent to handle | the category graph check *"every event reward has a source system and a post-event handling rule for unspent currency"* quantifies over `events`, which is empty, so it **passes vacuously**. `economy.sinkCount` stays **1**, `economy.faucetCount` stays **1** |

**The live question under subject five is not mine and I add no rule to it.** `economy.atMaxLadder`
ruled it — income continues, buys nothing, converts to nothing, no new sink appears, neither capped
nor hidden, flagged `[cid: decided]` there. `solvency.ladderExhaustedAfter` dates it at *"about 2.8
post-terminal bays"*; `endgame` forbids answering it with content. **This sheet routes and stops.**

### The one prohibition this domain writes rather than cites

**Nothing anywhere forbids reading wall-clock time for content purposes.** `release` `N2` closes a
date-keyed *flag*; `N5` closes remote config; `Layout.luau:70` bans `os.time` as a **determinism**
rule for chunk shuffling, and `Pressables.luau:436` prefers `os.clock` because *"a monotonic clock
cannot be moved by the system"*. A raw `os.date()` branch changing what a player sees is named by no
approved sheet. **`EV10` closes it here.** `[cid: decided]` — the brief is silent, the hole is real,
verified independently at round 1, and it is the shape an event would grow back through.

### The dashboard-versus-place boundary, drawn as data

**A Creator Dashboard entry that changes nothing inside the place is store-page work and is not
mine.** My zero binds **what the place does**: creating, titling, scheduling or thumbnailing a
dashboard event is permitted and belongs to store-listing work; the place behaving differently while
one runs is forbidden, countable as `EV12` — zero reads of `GameJoinContext.EventId`. This ships as
`placeSideEventCount: 0` beside `dashboardEntriesAreNotThisKey: true`, because a verifier who finds
a live dashboard entry and only a paragraph will read `eventCount: 0` as false. `[cid: decided]`

### Every closed form, with the sheet that closes it and a count

| # | form | closed by | observable |
|---|---|---|---|
| EV1 | a limited-time event of any kind, under any name | `00-CORE.md` retention non-goal `[brief: binding]`; R-3; `endgame.forbidden[seasonalEvent]` | `events.eventCount`: 0 |
| EV2 | a countdown, expiry, deadline, timer or limited window | `02-GAMEPLAY.md` *"Zero tension is deliberate"*; `HANDOFF.md` *"nobody downstream should invent tension to fill the gap"* | count of rendered strings matching `/ends in\|expires in\|expiry\|time left\|limited time\|\d\d?:\d\d:\d\d/i`: 0 |
| EV3 | an event currency, ticket, token, mark, point, fragment or scrip | `02-GAMEPLAY.md` *"solve duplicates without adding a currency"*; `economy.forbidden` row 1 | `economy.faucetCount`: 1 and `economy.sinkCount`: 1, unchanged by this key |
| EV4 | an event-exclusive relic, set, area or bay | `03-META.md` *"Never content access"*; `discovery.repeat.possible: false`; `endgame.forbidden[secondCollection]` | `sum(len(collection.sets[i].relics))`: 24, over `collection.sets` of length 4. **There is no `collection.total`** — the phantom this sheet carried at round 1 |
| EV5 | an event-gated entry condition on any content | `depths.areas[].unlock` is the only content gate in the game; `endgame.postTerminalArea.unlock` is the same string | count of areas whose `unlock` is neither `"none"` (ordinal 1) nor `previousAreaComplete` (ordinals 2–8): 0 |
| EV6 | a date-keyed flag, calendar, schedule, ramp or soft launch | `release.forbidden` `N2`, `N3`, `N10` | `release.flags.permittedClasses` has one member, `hotfixKillSwitch` |
| EV7 | a cross-server, announced or broadcast event | `release` `N6` (`MessagingService`); **`notices.members[]` holds no announcement member of any class**, and `notices.forbiddenAdditions` closes new strings; `products` `F19`; `release.shutdown.playerFacing: "nothing"` | count of `notices.members[]` entries announcing an event, an update or a schedule: 0. **Cited as a field, not a total** — the roster grew from two to three at `feedback/03` (`saveNotLoaded`, class `system`, via `"amends": "notices"`) and this ruling is unaffected |
| EV8 | an event-triggered product, bundle or offer | `release.provisioning`'s six gates, gate 3 blocked on an unanswered Networking question; `products.devProductCount`: 0; ruling R-4 | count of products created by this key: 0 |
| EV9 | an event-conditioned analytics trigger or dashboard read | `kpis.verdictRule.forbiddenActions` names *"an event calendar"*; *"no live tuning response exists and none may be invented"* | count of triggers this key names: 0, against five of eight KPI rows `readableToday: false` |
| EV10 | **a wall-clock read used for content** — `os.time`, `os.date`, `DateTime`, or any real-world date or hour branching what a player sees, earns or reaches | **this sheet.** No approved sheet supplies it: `N2` closes a flag, `N5` closes remote config, `Layout.luau:70` bans `os.time` for determinism only | count of `os.time`, `os.date`, `DateTime` in executable code under `game/src`: 0. `os.clock` is monotonic and permitted |
| EV11 | a reserved event slot, empty calendar field, placeholder track or "for a future update" note | `tech/deploy/02` — *an explicit null and a never-emitted key are the same bytes*; the category scope gate forbids holding room | count of fields in this key that are a JSON `null` or a placeholder row: 0 |
| EV12 | the place branching on a dashboard event id | `00-CORE.md` retention non-goal, plus the boundary above — the entry is store-page work, the branch is not | count of `GetJoinData`, `GameJoinContext` and `EventId` reads in `game/src`: 0 |
| EV13 | a launch moment, week-one bonus, welcome, return or first-session grant | `economy.zeroCreditEvents` rules `session-start` at 0 credits, *"no welcome grant, no return grant, no offline accrual"* | count of grants keyed to a session ordinal or a first join: 0 |
| EV14 | a seasonal or holiday variant of any in-place string, visual or sound | `music` `M12`; `release` `N3`; icon and thumbnail variants are store-page work and have no in-game referent after this ruling | count of in-place assets or strings keyed to a date: 0 |

### The finding I carry and do not repair

**`game/src/shared/Screens/shop-v2.luau:201–223` ships a live `EventBanner` whose `EventText` reads
`"DOUBLE LUCK EVENT  ·  ENDS IN 2:14:09"`, and `quests.luau:78` reads `"DAILY QUESTS"`.** Both
replicate into the place today. `offerSurface.artifactHygiene.mustNotBePresent` (`ui-ux/store/01`)
already names both files, but its `instanceToday` describes only the storefront strings (`SHOP`,
`Cosmic Egg`, `Luck Boost`, the price pills) and **names neither the banner nor the countdown**.
**Deleting the emitted files does not close it:** both regenerate from
`ui-forge/briefs/shop-v2.brief.json` and `quests.brief.json` on any re-emit, and all nine briefs are
present today, verified. Routed to that rule's owner with the event-specific grep as the observable.
**I delete nothing and claim no screen.** The `·` is separately illegal under
`vocabulary.allowedPattern` (`^[A-Za-z0-9 ,.'%%/-]+$`).

### The reversal, priced against what this game lacks

The platform half is cheap; the game half is not. What a real event would need and this game has not:

| missing surface | closed by |
|---|---|
| an in-game store | ruling R-4; `products.storeExists: false`, `products.itemCount: 1`, `products.devProductCount: 0` |
| a notice that can announce anything | `notices.members[]` holds no announcement member of any class — the beat members are payoffs and the one `system` member is `saveNotLoaded`, a failed-read message; `notices.forbiddenAdditions` closes new strings |
| chat of any kind | `social.chat.chatWindowEnabled`, `social.chat.bubbleChatEnabled`, `social.chat.text` and `social.chat.voice` are all `false` |
| a second currency | `economy.forbidden` row 1; `02-GAMEPLAY.md` *"without adding a currency"* |
| text entry | `products` `F15`; zero `TextBox` instances in any screen |
| any off-Roblox channel | the brief states none anywhere; category gap `G1` |
| an instrument to tell whether it worked | zero analytics calls in `game/src`; five of eight KPI rows `readableToday: false` |

So the cheapest genuine event is a new product behind `release.provisioning`'s six gates, one of them
blocked on an unanswered Networking question, announced on a surface that does not exist, and
measured by nothing.

### Two rounds of one defect class, and the sweep that should end it

Round 1 corrected a **stale count** (`notices` had grown to three); round 2 a **phantom field**
(`collection.total` never existed; the form is `sum(len(collection.sets[i].relics))`). Both are the
same failure: citing another key by a number or a remembered name instead of by a path that
resolves. So I re-resolved **all 22 cross-key paths this sheet names against their owning manifests**
and publish them as `citedPaths`, so next round the check is mechanical rather than a reading. **The
sweep found two more of mine beyond the one I was sent:** `social.chat` has no `window` or `bubble`
field (they are `chatWindowEnabled` and `bubbleChatEnabled`), and `artifactHygiene` is not
top-level — it is `offerSurface.artifactHygiene`. **And it falsified one of my own criteria:**
`depths.areas[]` ordinal 1 carries `unlock: "none"`, being the spawn area, so *"every unlock is
`previousAreaComplete`"* was false. The gate ruling is unchanged; the predicate now admits both
legal values.

```manifest
{
  "provides": "events",
  "status": "proposed",
  "value": {
    "eventCount": 0,
    "events": [],
    "placeSideEventCount": 0,
    "dashboardEntriesAreNotThisKey": true,
    "existsAsAsset": false,
    "existsAsDecision": true,
    "playerFacingStringsHeldByThisKey": 0,
    "ruling": "this game ships zero events in any form; the platform mechanism exists and is not the reason",
    "restsOn": {
      "binding": "00-CORE.md non-goal, Beating the genre's retention curve. Offered and declined. [you chose R1 Q3], upheld by ruling R-3",
      "supportingSoftLines": [
        { "line": "03-META.md priority 3, seasons and events", "tag": "brief: soft, from I assumed the ordering", "interviewQuestions": 0, "upgradedByThisSheet": false },
        { "line": "OPEN.md section 2, Ships and settles. No seasons or events.", "tag": "brief: soft, from I assumed batched", "interviewQuestions": 0, "upgradedByThisSheet": false }
      ],
      "circularityRelayed": "05-OUTWARD.md justifies the live-ops default by citing priority 3 as settled, while 03-META.md's own bracket says that ordering was never interviewed. Relayed as found, not repaired, and this ruling does not use it"
    },
    "platformMechanismExists": true,
    "boundary": {
      "dashboardEntry": { "permitted": true, "owner": "store-listing and experience-page work", "requiresPlaceChange": false },
      "placeSideBehaviour": { "permitted": false, "owner": "this key", "observable": "count of GetJoinData, GameJoinContext and EventId reads in game/src: 0" },
      "whyStatedAsData": "a verifier who finds a live dashboard entry and only a paragraph will read eventCount 0 as false"
    },
    "wallClockProhibition": {
      "id": "EV10",
      "rule": "no real-world date, hour or calendar value may branch what a player sees, earns or reaches",
      "suppliedBy": "this sheet; no approved sheet closes it",
      "verifiedIndependentlyAtRound1": true,
      "adjacentRulesThatDoNotCover": ["release N2 closes a date-keyed flag only", "release N5 closes remote config only", "Layout.luau line 70 bans os.time for determinism in chunk shuffling only"],
      "forbiddenTokens": ["os.time", "os.date", "DateTime", "GetJoinData", "GameJoinContext", "EventId"],
      "permittedToken": "os.clock",
      "permittedBecause": "monotonic; it cannot be moved by the system clock and carries no calendar",
      "verifiedCountToday": 0,
      "verifiedScope": "executable code under game/src; the only matches are two comments at Pressables.luau line 436 and Layout.luau line 70 stating they are deliberately not used"
    },
    "citedByFieldNotByTotal": {
      "rule": "every cross-key citation in this sheet is a resolving path, or a predicate over one, and never a member count or a remembered field name",
      "pathsReResolvedThisRound": 22,
      "unresolvedPathsRemaining": 0,
      "correctedAtRound1": {
        "asWritten": "notices has exactly two members, both beats",
        "wrongTwice": [
          "the count: feedback/03 added a third member, saveNotLoaded, class system, via amends notices, approved at ui-ux/_verified.md line 335",
          "the framing: saveNotLoaded is itself a non-beat, so the surface this game lacks was never non-beat, it is announcement"
        ],
        "nowCitedAs": "notices.members[] holds no announcement member of any class, and notices.forbiddenAdditions closes new strings",
        "sheetsThatWentStaleTogether": 3
      },
      "correctedAtRound2": [
        { "asWritten": "collection.total: 24", "sites": 2, "problem": "phantom field; collection holds className, classPlural, relicsPerArea, areasPerDepth and sets, and no total", "nowCitedAs": "sum(len(collection.sets[i].relics)) equals 24 over four sets of six", "rulingAffected": false, "foundBy": "verification, one of five sites in three categories" },
        { "asWritten": "social.chat window, bubble and voice all false", "sites": 2, "problem": "no window or bubble field exists on social.chat", "nowCitedAs": "social.chat.chatWindowEnabled, social.chat.bubbleChatEnabled, social.chat.text and social.chat.voice are all false", "rulingAffected": false, "foundBy": "this sheet's own sweep" },
        { "asWritten": "artifactHygiene.mustNotBePresent", "sites": 3, "problem": "not a top-level key; it sits inside offerSurface", "nowCitedAs": "offerSurface.artifactHygiene.mustNotBePresent", "rulingAffected": false, "foundBy": "this sheet's own sweep" },
        { "asWritten": "every unlock value across depths and endgame.postTerminalArea is previousAreaComplete", "sites": 2, "problem": "false: depths.areas[] ordinal 1 carries unlock none, being the spawn area", "nowCitedAs": "count of areas whose unlock is neither none nor previousAreaComplete: 0", "rulingAffected": false, "criterionRewritten": true, "foundBy": "this sheet's own sweep" }
      ]
    },
    "citedPaths": [
      { "path": "economy.faucetCount", "owner": "gameplay/systems/04", "resolves": true },
      { "path": "economy.sinkCount", "owner": "gameplay/systems/04", "resolves": true },
      { "path": "economy.forbidden", "owner": "gameplay/systems/04", "resolves": true },
      { "path": "economy.atMaxLadder", "owner": "gameplay/systems/04", "resolves": true },
      { "path": "economy.zeroCreditEvents", "owner": "gameplay/systems/04", "resolves": true },
      { "path": "collection.sets", "owner": "gameplay/meta/02", "resolves": true, "replacedPhantom": "collection.total" },
      { "path": "discovery.repeat.possible", "owner": "gameplay/systems/05", "resolves": true },
      { "path": "depths.areas[].unlock", "owner": "gameplay/meta/04", "resolves": true, "legalValues": ["none", "previousAreaComplete"] },
      { "path": "endgame.postTerminalArea.unlock", "owner": "gameplay/meta/07", "resolves": true },
      { "path": "endgame.forbidden", "owner": "gameplay/meta/07", "resolves": true },
      { "path": "solvency.ladderExhaustedAfter", "owner": "gameplay/balance/03", "resolves": true },
      { "path": "release.forbidden", "owner": "tech/deploy/01", "resolves": true },
      { "path": "release.flags.permittedClasses", "owner": "tech/deploy/01", "resolves": true },
      { "path": "release.provisioning", "owner": "tech/deploy/01", "resolves": true },
      { "path": "release.shutdown.playerFacing", "owner": "tech/deploy/01", "resolves": true },
      { "path": "kpis.verdictRule.forbiddenActions", "owner": "analytics/kpis/02", "resolves": true },
      { "path": "notices.members", "owner": "ui-ux/feedback/01, amended by feedback/03", "resolves": true },
      { "path": "notices.forbiddenAdditions", "owner": "ui-ux/feedback/03 via amends notices", "resolves": true },
      { "path": "products.storeExists", "owner": "gameplay/monetization/01", "resolves": true },
      { "path": "products.devProductCount", "owner": "gameplay/monetization/01", "resolves": true },
      { "path": "social.chat.chatWindowEnabled", "owner": "gameplay/social/01", "resolves": true, "replacedGuess": "social.chat.window" },
      { "path": "offerSurface.artifactHygiene.mustNotBePresent", "owner": "ui-ux/store/01", "resolves": true, "replacedGuess": "artifactHygiene.mustNotBePresent" }
    ],
    "subjects": [
      { "id": "S1", "subject": "event concepts", "state": "absent", "emptiedBy": "00-CORE.md retention non-goal; R-3; endgame.forbidden seasonalEvent", "observable": "eventCount 0 and len(events) 0" },
      { "id": "S2", "subject": "duration and timing", "state": "absent", "emptiedBy": "02-GAMEPLAY.md zero tension is deliberate; release N2 and N10; EV10 written here", "observable": "count of os.time, os.date and DateTime in executable code under game/src: 0" },
      { "id": "S3", "subject": "exclusive rewards", "state": "absent", "emptiedBy": "03-META.md never content access; discovery.repeat.possible false; endgame.forbidden secondCollection and secondCurrency", "observable": "sum(len(collection.sets[i].relics)) equals 24, every name reachable by clearing alone" },
      { "id": "S4", "subject": "entry requirements", "state": "vacuous", "emptiedBy": "zero events; and the game's only content gate is depths.areas[].unlock, mirrored by endgame.postTerminalArea.unlock", "observable": "count of areas whose unlock is neither none nor previousAreaComplete: 0" },
      { "id": "S5", "subject": "post-event handling of unspent currency", "state": "vacuous", "emptiedBy": "zero events means zero event currencies means nothing unspent to handle", "observable": "the category graph check quantifies over events, which is empty, so it passes vacuously" }
    ],
    "unspentCurrency": {
      "ownedHere": false,
      "ownedBy": "economy.atMaxLadder, cid/gameplay/systems/04-earning-and-spending.md",
      "timedBy": "solvency.ladderExhaustedAfter, cid/gameplay/balance/03-ladder-solvency.md, about 2.8 post-terminal bays",
      "contentHalfClosedBy": "endgame, cid/gameplay/meta/07-after-the-last-find.md",
      "existingRuling": "at max ladder income continues, buys nothing, converts to nothing, no new sink appears, and the balance is neither capped nor hidden",
      "rulesAddedHere": 0,
      "faucetsAddedHere": 0,
      "sinksAddedHere": 0,
      "conversionsAddedHere": 0,
      "graphCheckSatisfiedVacuously": true
    },
    "forbidden": [
      { "id": "EV1", "form": "a limited-time event of any kind, under any name", "ruling": "00-CORE.md retention non-goal, binding; ruling R-3; endgame.forbidden seasonalEvent", "observable": "eventCount: 0" },
      { "id": "EV2", "form": "a countdown, expiry, deadline, timer or limited window", "ruling": "02-GAMEPLAY.md zero tension is deliberate; HANDOFF.md nobody downstream should invent tension to fill the gap", "observable": "count of rendered strings matching ends in, expires in, expiry, time left, limited time or an hh:mm:ss pattern: 0" },
      { "id": "EV3", "form": "an event currency, ticket, token, mark, point, fragment or scrip", "ruling": "02-GAMEPLAY.md solve duplicates without adding a currency; economy.forbidden row 1", "observable": "economy.faucetCount 1 and economy.sinkCount 1, unchanged by this key" },
      { "id": "EV4", "form": "an event-exclusive relic, set, area or bay", "ruling": "03-META.md never content access; discovery.repeat.possible false; endgame.forbidden secondCollection", "observable": "sum(len(collection.sets[i].relics)) equals 24 over collection.sets of length 4, every name reachable by clearing alone. There is no collection.total field and none may be cited" },
      { "id": "EV5", "form": "an event-gated entry condition on any content", "ruling": "depths.areas[].unlock is the only content gate in the game; endgame.postTerminalArea.unlock is the same string", "observable": "count of areas whose unlock is neither none, at ordinal 1, nor previousAreaComplete, at ordinals 2 to 8: 0" },
      { "id": "EV6", "form": "a date-keyed flag, calendar, schedule, ramp or soft launch", "ruling": "release.forbidden N2, N3, N10", "observable": "release.flags.permittedClasses has exactly one member, hotfixKillSwitch" },
      { "id": "EV7", "form": "a cross-server, announced or broadcast event", "ruling": "release N6 MessagingService; notices.members[] holds no announcement member of any class and notices.forbiddenAdditions closes new strings; products F19; release.shutdown.playerFacing nothing", "observable": "count of notices.members[] entries announcing an event, an update or a schedule: 0. Cited as a field rather than a member total: the roster grew from two to three at feedback/03 and this ruling is unaffected" },
      { "id": "EV8", "form": "an event-triggered product, bundle or offer", "ruling": "release.provisioning six gates with gate 3 blocked on an unanswered Networking question; products.devProductCount 0; ruling R-4", "observable": "count of products created by this key: 0" },
      { "id": "EV9", "form": "an event-conditioned analytics trigger or dashboard read", "ruling": "kpis.verdictRule.forbiddenActions names an event calendar; no live tuning response exists and none may be invented", "observable": "count of triggers this key names: 0, against five of eight KPI rows readableToday false" },
      { "id": "EV10", "form": "a wall-clock read used for content: os.time, os.date, DateTime, or any real-world date or hour branching what a player sees, earns or reaches", "ruling": "this sheet; no approved sheet supplies it, N2 closes a flag, N5 closes remote config, Layout.luau line 70 bans os.time for determinism only", "observable": "count of os.time, os.date and DateTime in executable code under game/src: 0; os.clock is monotonic and permitted" },
      { "id": "EV11", "form": "a reserved event slot, empty calendar field, placeholder track or a for-a-future-update note", "ruling": "tech/deploy/02, an explicit null and a never-emitted key are the same bytes; the category scope gate forbids holding room", "observable": "count of fields in this key that are a JSON null or a placeholder row: 0" },
      { "id": "EV12", "form": "the place branching on a dashboard event id", "ruling": "00-CORE.md retention non-goal, plus the boundary drawn in this key: the entry is store-page work, the branch is not", "observable": "count of GetJoinData, GameJoinContext and EventId reads in game/src: 0" },
      { "id": "EV13", "form": "a launch moment, week-one bonus, welcome, return or first-session grant", "ruling": "economy.zeroCreditEvents rules session-start at 0 credits, no welcome grant, no return grant, no offline accrual", "observable": "count of grants keyed to a session ordinal or a first join: 0" },
      { "id": "EV14", "form": "a seasonal or holiday variant of any in-place string, visual or sound", "ruling": "music M12; release N3; icon and thumbnail variants are store-page work and have no in-game referent after this ruling", "observable": "count of in-place assets or strings keyed to a date: 0" }
    ],
    "reversalPath": {
      "trigger": "a developer ruling that overturns 00-CORE.md's retention non-goal, which is binding and which no sheet in this category has an argument against",
      "platformSide": {
        "maxConcurrentEvents": 10,
        "recommendedRunDaysMin": 7,
        "recommendedRunDaysMax": 30,
        "requiresPlaceChange": false,
        "eventIdReadableVia": "player:GetJoinData() exposes GameJoinContext.EventId",
        "source": "https://create.roblox.com/docs/production/promotion/experience-events"
      },
      "gameSideMissingSurfaces": [
        "no in-game store: ruling R-4, products.storeExists false, products.itemCount 1, products.devProductCount 0",
        "no notice that can announce anything: notices.members[] holds no announcement member of any class, the beat members are payoffs and the one system member is saveNotLoaded, and notices.forbiddenAdditions closes new strings",
        "no chat: social.chat.chatWindowEnabled, social.chat.bubbleChatEnabled, social.chat.text and social.chat.voice are all false",
        "no second currency: economy.forbidden row 1",
        "no text entry: products F15, zero TextBox instances in any screen",
        "no off-Roblox channel stated anywhere in the brief: category gap G1",
        "no instrument to tell whether it worked: zero analytics calls in game/src, five of eight KPI rows readableToday false"
      ],
      "cheapestGenuineEvent": "a new product behind release.provisioning's six gates, one of them blocked on an unanswered Networking question, announced on a surface that does not exist and measured by nothing",
      "costOfReversalToday": "zero removal work inside this key: it holds no id, no slot, no flag and no string",
      "whatWouldStillHaveToBeRevised": ["00-CORE.md's binding retention non-goal", "release.forbidden N2, N3 and N10", "kpis.verdictRule.forbiddenActions", "endgame.forbidden seasonalEvent"]
    },
    "findings": [
      {
        "id": "F-E1",
        "to": "screen-inventory and UI-emission work, owner of offerSurface.artifactHygiene",
        "finding": "game/src/shared/Screens/shop-v2.luau lines 201 to 223 ship a live EventBanner whose EventText reads DOUBLE LUCK EVENT ENDS IN 2:14:09, and quests.luau line 78 reads DAILY QUESTS. Both replicate into the place today. offerSurface.artifactHygiene.mustNotBePresent already names both files, but instanceToday describes only the storefront strings and names neither the event banner nor the countdown",
        "regeneratesFrom": ["ui-forge/briefs/shop-v2.brief.json", "ui-forge/briefs/quests.brief.json"],
        "deletingEmittedFileClosesIt": false,
        "briefsPresentToday": 9,
        "observable": "files under game/src matching /ends in|expires in|expiry|time left|limited time|DAILY QUESTS|\\d\\d?:\\d\\d:\\d\\d/i: 2 today, both already named in offerSurface.artifactHygiene.mustNotBePresent",
        "secondRuleBroken": "the middle dot in that string is illegal under vocabulary.allowedPattern",
        "repairedHere": false,
        "screenClaimedHere": false
      },
      {
        "id": "F-E2",
        "to": "release work, tech/deploy/01, and the cross-category pass collecting the stale-clause class",
        "finding": "release.shutdown.playerFacing's own value string reads no notice channel may carry a non-beat. That clause is now false inside an approved key's value: saveNotLoaded is a non-beat notice that exists. Same class as discovery.record.keyedBy citing collection.sets[].relics[].name, and same class as the notices count three sheets carried, but it sits inside a merged value rather than in prose",
        "rulingAffected": false,
        "whyRulingSurvives": "shutdown is still silent, because notices.forbiddenAdditions closes any string a shutdown would need, not because the roster is beats-only",
        "repairedHere": false
      }
    ],
    "invariants": [
      "eventCount equals the length of events; they are 0 and the empty list, never a JSON null and never a placeholder row",
      "no field anywhere in this key is a JSON null",
      "placeSideEventCount is 0 and dashboardEntriesAreNotThisKey is true; a dashboard entry existing does not falsify eventCount",
      "this key adds zero faucets, zero sinks, zero conversions, zero products, zero gates and zero player-facing strings",
      "every forbidden row carries a ruling tracing to an approved sheet or to this sheet, and an observable that is a count",
      "every cross-key citation in this sheet appears in citedPaths with resolves true; no citation is a member count of another key's roster and no citation names a field its owning key does not hold"
    ]
  }
}
```

## Consequences for other work

| subject | what this forces or forbids |
|---|---|
| **Store-listing and experience-page work** *[Discovery & Marketing — Store Page, Icon, Thumbnails]* | The boundary lands on you and it is permissive: a Creator Dashboard event entry is **your** surface, needs no place change, caps at 10 concurrent and runs 7–30 days. What my zero forbids is the place behaving differently while one runs. *"Seasonal and event variants"* of an icon or thumbnail have **no in-game referent** after this ruling and may not imply a place-side change. |
| **Update-ordering work** *[Live Ops — Roadmap]* | An undated ordering is yours; a date is mine and is zero. `release` `N2` answers *"why is an ordering permitted and a calendar not"* and it is not mine to give. Either Roadmap ruling leaves this key untouched. |
| **Income and sink work** *[Gameplay — Systems `economy`; Balance `solvency`]* | Subject five stays yours. This key adds no faucet, no sink and no conversion, and states no rule about held currency. |
| **Notice and transient-message work** *[UI/UX — Feedback, `notices`]* | Nothing here asks you for a member. My citation is a **predicate over `notices.members[]`** — no entry announces an event, an update or a schedule — so a fourth member does not touch this ruling. |
| **Release work** *[Tech & Data — Deploy, `release`]* | Finding `F-E2`: `release.shutdown.playerFacing`'s own value asserts *"no notice channel may carry a non-beat"*, which `saveNotLoaded` falsified. Your ruling survives on `notices.forbiddenAdditions`, not on the roster's shape; the sentence inside the value is what needs the edit. |
| **Screen-inventory and UI-emission work** *[UI/UX — Store, Screens]* | Finding `F-E1`, now cited at its real path `offerSurface.artifactHygiene.mustNotBePresent`. Your whitelist survives; its `instanceToday` would be stronger if it named the event banner and the countdown, and the fix is the two generator inputs. |
| **Anyone writing runtime code** *[Tech & Data, Mechanics, Meta & Content]* | `EV10` is new and binds you. `os.clock` is permitted because it is monotonic; `os.time`, `os.date` and `DateTime` are not, and the ban is now a content rule as well as `Layout.luau`'s determinism rule. |
| **Contract-and-seam work** | `events` needs a shape in `bridge/schema.mjs` with `eventCount == len(events)`. `citedPaths` is published as data so a resolver can check all 22 references mechanically; four of the keys it names are proposals. |

## Acceptance criteria

1. `events.eventCount` is `0`, `events.events` is `[]`, `events.placeSideEventCount` is `0`,
   `events.forbidden` holds **14** rows each with a non-empty `ruling` and an `observable` that is a
   count, and `rg -c ':\s*null\s*[,}]'` over this sheet's `manifest` block returns **0**.
2. `rg -nE '\b(os\.time|os\.date|DateTime|GetJoinData|GameJoinContext|EventId)\b' game/src --glob '*.luau'`
   returns **exactly 2** lines, `Pressables.luau:436` and `Layout.luau:70`, and **both begin with
   `--`**. The engine names `RemoteEvent`, `OnServerEvent` and `OnClientEvent` cannot match: none of
   the three contains the substring `EventId`, and the pattern requires a word boundary before it.
3. `rg -lniE 'ends in|expires in|expiry|time left|limited time|DAILY QUESTS|[0-9]{1,2}:[0-9]{2}:[0-9]{2}' game/src --glob '*.luau'`
   returns a set of paths that is a **subset of `offerSurface.artifactHygiene.mustNotBePresent`**.
   Today that set is exactly `{shared/Screens/shop-v2.luau, shared/Screens/quests.luau}`, both
   already listed, verified this run; the criterion fails the moment a path outside it matches.
4. **Every entry in `events.citedPaths` resolves against its owning manifest**, all **22** of them,
   and no string anywhere in this sheet cites a cross-key field absent from that list. In particular
   `collection.total`, `social.chat.window` and a bare top-level `artifactHygiene` appear **0** times
   outside `citedByFieldNotByTotal.correctedAtRound2`, and `sum(len(collection.sets[i].relics))` is
   **24**.

## Not decided here

What happens to currency the player cannot spend — **`economy.atMaxLadder`** *[Gameplay — Systems]*,
timed by **`solvency.ladderExhaustedAfter`** *[Balance]*; I route and add no rule. Whether an undated
ordered sequence of drops exists — **update-ordering work** *[Live Ops — Roadmap]*; I own only the
dated half. Recurring, tiered, resetting structures — **Seasons**. How many notices exist and what
any of them says — **`notices`** *[UI/UX — Feedback]*; I cite a predicate over its roster and set no
member. The wording inside `release.shutdown.playerFacing` — **`release`** *[Tech & Data — Deploy]*;
`F-E2` reports it and repairs nothing. Whether a dashboard event entry is created, what it says and
what it looks like — **store-listing work** *[Discovery & Marketing]*. Repairing `F-E1` — the owner
of `offerSurface.artifactHygiene`, plus whoever owns `ui-forge/briefs/`; I delete nothing and claim
no screen. The `·` in the emitted banner — **`vocabulary`**. Whether codes or a group reward exist —
**Codes**.

## Flagged to the developer

| item | what I decided | live alternative | why not |
|---|---|---|---|
| **`EV10`, the wall-clock content ban** | No real-world date or hour may branch what a player sees, earns or reaches; `os.clock` stays permitted | Leave it unstated, since no event exists to use it | An unstated hole is the one a builder fills. `N2` covers a flag and `Layout.luau` covers determinism; neither covers an `os.date()` branch. **Verified independently at round 1** and the gap confirmed real |
| **The E1 boundary** | A dashboard entry is store-page work and permitted; the place responding to it is not | Rule the dashboard out too, making the zero total | *"No seasons or events"* is written in game-design context, and the docs require no place change. Forbidding a store-page act on a game-design line would legislate over Marketing's surface |

**The circularity, relayed not laundered:** `05-OUTWARD.md` treats priority 3 as settled while
`03-META.md` says its own ordering was never interviewed and `OPEN.md §1` records live-ops intent at
**0 questions**. Four of Live Ops' five domains are partly closed by that line. This ruling does not
use it, but the brief should be corrected rather than quoted.

**What this game loses:** nothing it was trying to keep. The one honest cost is that `05-OUTWARD.md`
is right that extension here is unusually cheap — new authored chunks need no system change — so the
capability exists and is deliberately unused. That is yours to reopen, and reopening it means
reopening a binding non-goal.
