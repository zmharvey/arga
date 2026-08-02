# 01 — Whether an event exists

**Domain:** liveops/events · **Category:** Live Ops · **Wave:** 7

## Decision

**This game ships zero events. `eventCount: 0`, `events: []`.** All five of this domain's
subjects — concepts, duration and timing, exclusive rewards, entry requirements, post-event
handling of unspent currency — are recorded absent rather than dropped, and the ruling rests on
`00-CORE.md`'s binding retention non-goal, not on any claim that the mechanism is unavailable.

## Why

**The mechanism exists and I am not resting on its absence.** Roblox's Creator Dashboard
Events & Updates feature is real: *"Currently, you can publish a maximum of 10 ongoing or
upcoming events"*, *"The best events run for 7-30 days"*, and when a player joins through an
event entry point *"the event ID is added to the player's `GameJoinContext`"*, read with
`GetJoinData()` `[research: https://create.roblox.com/docs/production/promotion/experience-events]`.
The docs state **no requirement to change the experience at all**. So the honest ground is
scope, not impossibility — a ruling that said "there is no way to do this" would collapse the
first time a reader opened that page.

**What actually holds it closed is the one line I may not touch.** *"Beating the genre's
retention curve. Offered and declined."* `[brief: binding]` ← `[you chose: R1 Q3]`
(`00-CORE.md`), with *"Success is shipped artifacts, not players"* and *"the smallest game that
still gives every creative area real work"* beside it. An event is a retention instrument whose
purpose is a declined goal. Ruling **R-3** already refused the under-scoping finding on exactly
this ground: *"the under-scoping argument is a retention argument, and that argument is closed
in this project"* `[research: cid/_state.md]`.

**The two lines everyone will quote at me are the weak ones, and I relay them at their real
strength.** `03-META.md` priority 3 lists *"seasons and events"* at `[brief: soft]` ←
`[I assumed — the ordering; ... no explicit priority list was interviewed]`. `OPEN.md §2`'s
*"Ships and settles. No seasons or events."* is `[brief: soft]` ← `[I assumed — batched]` at
**0 interview questions** (`OPEN.md §1`, row `O / live-ops intent`). `HANDOFF.md` rates
`[I assumed]` *"a starting point, freely arguable."* **I do not upgrade either.** Neither is
load-bearing here, which is why the zero survives an argument about them.

**And the circularity, relayed as found rather than laundered.** `05-OUTWARD.md` justifies the
live-ops default with *"priority 3 already excludes seasons and events, so the default is
constrained by a decision already made"* — but `03-META.md`'s own bracket says that ordering
was never interviewed. §2 is constrained by an assumption, not a decision. `[cid: decided]` to
state it and route it upward rather than repair it.

**The reference is the counterweight, and it is asymmetric in exactly the useful way.**
`research/grass-incremental.md` says the absence of *codes and a group-join reward* *"reads as
an unfinished game"* `[research: https://www.rosenberryrooms.com/grass-incremental/]` — it
names those two and **does not name events**. The reference's own experience page carries a
group-join boost and a like/favourite ask and **lists no event**
`[research: https://www.roblox.com/games/133086043677134/Grass-Incremental-Simulator]`
`[unverified: whether it has ever run one — an experience page shows only active and upcoming
events, so today's empty listing is not a history. Settled by that experience's Events &
Updates listing including its Finished tab, or a third-party archive of its event pages.]`
Separately, a weekly update cadence sustained for a year still leaves it at ~12–16% of its
10,435 all-time peak `[research: https://www.rolimons.com/game/133086043677134]`, which is the
brief's *"satisfaction is not the same as retention"* surviving its own number moving.

### The five subjects, each recorded absent with its observable

| subject | ruling that empties it | observable |
|---|---|---|
| **event concepts** | `00-CORE.md` retention non-goal `[brief: binding]`, upheld by R-3; `endgame.forbidden[seasonalEvent]` | `eventCount == 0` and `len(events) == 0`; count of `GetJoinData` / `EventId` reads in `game/src`: **0**, verified this run |
| **duration and timing** | `02-GAMEPLAY.md` *"Zero tension is deliberate"* — a window is tension with a clock on it; `release.forbidden` `N2`, `N10`; plus `EV10` below, which this sheet writes itself | count of `os.time`, `os.date`, `DateTime` in executable code under `game/src`: **0**, verified (`os.clock` is monotonic and excluded by name). Count of rendered countdown strings: **1 today**, `Screens/shop-v2.luau:223` — finding `F-E1` |
| **exclusive rewards** | `03-META.md` *"Never content access"*; `discovery.repeat.possible: false`; `collection` closed at 24 names; `endgame.forbidden[secondCollection, secondCurrency]` | count of grants in the build conditioned on a date, a window or an event id: **0** |
| **entry requirements** | vacuous at zero events; the game has exactly one content gate — `depths` unlock and `endgame.postTerminalArea.unlock` are both the string `previousAreaComplete` | count of content gates whose condition is anything other than `previousAreaComplete`: **0** |
| **post-event handling of unspent currency** | **vacuous, and said here rather than left to a verifier.** Zero events → zero event currencies → nothing unspent to handle | the category graph check *"every event reward has a source system and a post-event handling rule for unspent currency"* quantifies over `events`, which is empty, so it **passes vacuously**. `economy.sinkCount` stays **1**, `economy.faucetCount` stays **1**; this key adds neither |

**The live question under subject five is not mine and I add no rule to it.** `economy.atMaxLadder`
already ruled it — income continues, buys nothing, converts to nothing, no new sink appears, the
balance is neither capped nor hidden, flagged `[cid: decided]` there. `solvency.ladderExhaustedAfter`
dates the moment at *"about 2.8 post-terminal bays"*, and `endgame` forbids answering it with
content. **This sheet routes and stops.**

### The one prohibition this domain writes rather than cites

**Nothing anywhere forbids reading wall-clock time for content purposes.** `release` `N2` closes a
date-keyed *flag*; `N5` closes remote config; `Layout.luau:70`'s ban on `os.time` is a
**determinism** rule for chunk shuffling, and `Pressables.luau:436` prefers `os.clock` because *"a
monotonic clock cannot be moved by the system"*. A raw `os.date()` branch that changed what a
player sees is named by no approved sheet. **`EV10` closes it here.** `[cid: decided]` — the brief
is silent and the hole is real, and it is the reason this sheet is not purely a set of citations.

### The dashboard-versus-place boundary, drawn as data and not as a paragraph

**A Creator Dashboard event entry that changes nothing inside the place is store-page work and is
not mine.** My zero binds **what the place does**. So: creating, titling, scheduling or thumbnailing
a dashboard event is permitted and belongs to store-listing work; the place behaving differently
while one runs is forbidden, and the countable form of that is `EV12` — zero reads of
`GameJoinContext.EventId`. This is `placeSideEventCount: 0` beside
`dashboardEntriesAreNotThisKey: true` in the key, because a verifier who finds a live dashboard
entry and only a paragraph will read `eventCount: 0` as false. `[cid: decided]`

### Every closed form, with the sheet that closes it and a count

| # | form | closed by | observable |
|---|---|---|---|
| EV1 | a limited-time event of any kind, under any name | `00-CORE.md` retention non-goal `[brief: binding]`; R-3; `endgame.forbidden[seasonalEvent]` | `events.eventCount`: 0 |
| EV2 | a countdown, expiry, deadline, timer or limited window | `02-GAMEPLAY.md` *"Zero tension is deliberate"*; `HANDOFF.md` *"nobody downstream should invent tension to fill the gap"* | count of rendered strings matching `/ends in\|expires\|time left\|limited time\|\d\d?:\d\d:\d\d/i`: 0 |
| EV3 | an event currency, ticket, token, mark, point, fragment or scrip | `02-GAMEPLAY.md` *"solve duplicates without adding a currency"*; `economy.forbidden` row 1 | `economy.faucetCount`: 1 and `sinkCount`: 1, unchanged by this key |
| EV4 | an event-exclusive relic, set, area or bay | `03-META.md` *"Never content access"*; `discovery.repeat.possible: false`; `endgame.forbidden[secondCollection]` | `collection.total`: 24, every name reachable by clearing alone |
| EV5 | an event-gated entry condition on any content | `depths` unlock is `previousAreaComplete`, the only content gate in the game; `endgame.postTerminalArea.unlock` likewise | count of gates with any other condition: 0 |
| EV6 | a date-keyed flag, calendar, schedule, ramp or soft launch | `release.forbidden` `N2`, `N3`, `N10` | `release.flags.permittedClasses` has one member, `hotfixKillSwitch` |
| EV7 | a cross-server, announced or broadcast event | `release` `N6` (`MessagingService`); `notices` has exactly two members, both beats; `products` `F19`; `release.shutdown.playerFacing: "nothing"` | count of in-game strings announcing anything: 0 |
| EV8 | an event-triggered product, bundle or offer | `release.provisioning`'s six gates, gate 3 blocked on an unanswered Networking question; `products.devProductCount`: 0; ruling R-4 | count of products created by this key: 0 |
| EV9 | an event-conditioned analytics trigger or dashboard read | `kpis.verdictRule.forbiddenActions` names *"an event calendar"*; *"no live tuning response exists and none may be invented"*; five of eight KPI rows `readableToday: false` | count of triggers this key names: 0 |
| EV10 | **a wall-clock read used for content** — `os.time`, `os.date`, `DateTime`, or any real-world date or hour branching what a player sees, earns or reaches | **this sheet.** No approved sheet supplies it: `N2` closes a flag, `N5` closes remote config, `Layout.luau:70` bans `os.time` for determinism only | count of `os.time`, `os.date`, `DateTime` in executable code under `game/src`: 0. `os.clock` is monotonic and permitted |
| EV11 | a reserved event slot, empty calendar field, placeholder track or "for a future update" note | `tech/deploy/02` — *an explicit null and a never-emitted key are the same bytes*; the category scope gate forbids holding room | count of fields in this key that are `null` or a placeholder row: 0 |
| EV12 | the place branching on a dashboard event id | `00-CORE.md` retention non-goal; the E1 boundary drawn above — the entry is store-page work, the branch is not | count of `GetJoinData`, `GameJoinContext` and `EventId` reads in `game/src`: 0 |
| EV13 | a launch moment, week-one bonus, welcome, return or first-session grant | `economy.zeroCreditEvents` rules `session-start` at 0 credits, *"no welcome grant, no return grant, no offline accrual"* | count of grants keyed to a session ordinal or a first join: 0 |
| EV14 | a seasonal or holiday variant of any in-place string, visual or sound | `music` `M12` (*"a track keyed to a date, holiday or live event"*); `release` `N3`; icon and thumbnail variants are store-page work and have no in-game referent after this ruling | count of in-place assets or strings keyed to a date: 0 |

### The finding I carry and do not repair

**`game/src/shared/Screens/shop-v2.luau:201–223` ships a live `EventBanner` whose `EventText`
reads `"DOUBLE LUCK EVENT  ·  ENDS IN 2:14:09"`, and `quests.luau:78` reads `"DAILY QUESTS"`.**
Both replicate into the place today. `ui-ux/store/01`'s `artifactHygiene.mustNotBePresent` already
names both files, and its `rule` is a whitelist with a provenance clause — but its `instanceToday`
describes only the storefront strings (`SHOP`, `Cosmic Egg`, `Luck Boost`, the price pills) and
**names neither the event banner nor the countdown**. **Deleting the emitted files does not close
it:** both regenerate from `ui-forge/briefs/shop-v2.brief.json` and `quests.brief.json` on any
re-emit, and all nine briefs are present in `ui-forge/briefs/` today, verified. Routed to that
rule's owner with the event-specific grep as the observable. **I delete nothing and claim no
screen.** Independently, the `·` in that string is illegal under `vocabulary.allowedPattern`
(`^[A-Za-z0-9 ,.'%%/-]+$`) — a second rule it breaks, under a second owner.

### The reversal, priced against what this game actually lacks

The platform half is cheap and the game half is not. A dashboard entry needs no place change at
all, caps at 10 concurrent, and runs 7–30 days
`[research: https://create.roblox.com/docs/production/promotion/experience-events]`. What a
*real* event would need, this game does not have: no in-game store (R-4, `products.storeExists:
false`), no notice channel that can carry a non-beat (`notices` has two members, both beats), no
chat (`social.chat` off on all three surfaces), no second currency, no text entry
(`products` `F15`, zero `TextBox` instances), no off-Roblox channel anywhere in the brief
(category gap `G1`), and **no instrument to tell whether it worked** — zero analytics calls in
`game/src` and five of eight KPI rows `readableToday: false`. So the cheapest genuine event is a
new product behind six provisioning gates, one of them blocked, announced on a surface that does
not exist, measured by nothing.

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
      "binding": "00-CORE.md non-goal: Beating the genre's retention curve. Offered and declined. [you chose: R1 Q3], upheld by ruling R-3",
      "supportingSoftLines": [
        { "line": "03-META.md priority 3, seasons and events", "tag": "brief: soft, from I assumed the ordering", "interviewQuestions": 0, "upgradedByThisSheet": false },
        { "line": "OPEN.md section 2: Ships and settles. No seasons or events.", "tag": "brief: soft, from I assumed batched", "interviewQuestions": 0, "upgradedByThisSheet": false }
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
      "adjacentRulesThatDoNotCover": ["release N2 closes a date-keyed flag only", "release N5 closes remote config only", "Layout.luau line 70 bans os.time for determinism in chunk shuffling only"],
      "forbiddenTokens": ["os.time", "os.date", "DateTime", "GetJoinData", "GameJoinContext", "EventId"],
      "permittedToken": "os.clock",
      "permittedBecause": "monotonic; it cannot be moved by the system clock and carries no calendar",
      "verifiedCountToday": 0,
      "verifiedScope": "executable code under game/src; the only matches are two comments at Pressables.luau line 436 and Layout.luau line 70 stating they are deliberately not used"
    },
    "subjects": [
      { "id": "S1", "subject": "event concepts", "state": "absent", "emptiedBy": "00-CORE.md retention non-goal; R-3; endgame.forbidden seasonalEvent", "observable": "eventCount 0 and len(events) 0" },
      { "id": "S2", "subject": "duration and timing", "state": "absent", "emptiedBy": "02-GAMEPLAY.md zero tension is deliberate; release N2 and N10; EV10 written here", "observable": "count of os.time, os.date and DateTime in executable code under game/src: 0" },
      { "id": "S3", "subject": "exclusive rewards", "state": "absent", "emptiedBy": "03-META.md never content access; discovery.repeat.possible false; collection closed at 24; endgame.forbidden secondCollection and secondCurrency", "observable": "count of grants conditioned on a date, a window or an event id: 0" },
      { "id": "S4", "subject": "entry requirements", "state": "vacuous", "emptiedBy": "zero events; and the game's only content gate is previousAreaComplete, in depths and in endgame.postTerminalArea.unlock", "observable": "count of content gates whose condition is anything other than previousAreaComplete: 0" },
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
      { "id": "EV2", "form": "a countdown, expiry, deadline, timer or limited window", "ruling": "02-GAMEPLAY.md zero tension is deliberate; HANDOFF.md nobody downstream should invent tension to fill the gap", "observable": "count of rendered strings matching ends in, expires, time left, limited time or a hh:mm:ss pattern: 0" },
      { "id": "EV3", "form": "an event currency, ticket, token, mark, point, fragment or scrip", "ruling": "02-GAMEPLAY.md solve duplicates without adding a currency; economy.forbidden row 1", "observable": "economy.faucetCount 1 and economy.sinkCount 1, unchanged by this key" },
      { "id": "EV4", "form": "an event-exclusive relic, set, area or bay", "ruling": "03-META.md never content access; discovery.repeat.possible false; endgame.forbidden secondCollection", "observable": "collection.total 24, every name reachable by clearing alone" },
      { "id": "EV5", "form": "an event-gated entry condition on any content", "ruling": "depths unlock is previousAreaComplete and is the only content gate in the game; endgame.postTerminalArea.unlock likewise", "observable": "count of content gates with any other condition: 0" },
      { "id": "EV6", "form": "a date-keyed flag, calendar, schedule, ramp or soft launch", "ruling": "release.forbidden N2, N3, N10", "observable": "release.flags.permittedClasses has exactly one member, hotfixKillSwitch" },
      { "id": "EV7", "form": "a cross-server, announced or broadcast event", "ruling": "release N6 MessagingService; notices has exactly two members, both beats; products F19; release.shutdown.playerFacing nothing", "observable": "count of in-game strings announcing anything: 0" },
      { "id": "EV8", "form": "an event-triggered product, bundle or offer", "ruling": "release.provisioning six gates with gate 3 blocked on an unanswered Networking question; products.devProductCount 0; ruling R-4", "observable": "count of products created by this key: 0" },
      { "id": "EV9", "form": "an event-conditioned analytics trigger or dashboard read", "ruling": "kpis.verdictRule.forbiddenActions names an event calendar; no live tuning response exists and none may be invented", "observable": "count of triggers this key names: 0, against five of eight KPI rows readableToday false" },
      { "id": "EV10", "form": "a wall-clock read used for content: os.time, os.date, DateTime, or any real-world date or hour branching what a player sees, earns or reaches", "ruling": "this sheet; no approved sheet supplies it, N2 closes a flag, N5 closes remote config, Layout.luau line 70 bans os.time for determinism only", "observable": "count of os.time, os.date and DateTime in executable code under game/src: 0; os.clock is monotonic and permitted" },
      { "id": "EV11", "form": "a reserved event slot, empty calendar field, placeholder track or a for-a-future-update note", "ruling": "tech/deploy/02, an explicit null and a never-emitted key are the same bytes; the category scope gate forbids holding room", "observable": "count of fields in this key that are null or a placeholder row: 0" },
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
        "no in-game store: ruling R-4, products.storeExists false",
        "no notice channel that can carry a non-beat: notices has exactly two members",
        "no chat on any of the three surfaces: social.chat window, bubble and voice all false",
        "no second currency: economy.forbidden row 1",
        "no text entry: products F15, zero TextBox instances",
        "no off-Roblox channel stated anywhere in the brief: category gap G1",
        "no instrument to tell whether it worked: zero analytics calls in game/src, five of eight KPI rows readableToday false"
      ],
      "cheapestGenuineEvent": "a new product behind release.provisioning's six gates, one of them blocked on an unanswered Networking question, announced on a surface that does not exist and measured by nothing",
      "costOfReversalToday": "zero removal work inside this key: it holds no id, no slot, no flag and no string",
      "whatWouldStillHaveToBeRevised": ["00-CORE.md's binding retention non-goal", "release.forbidden N2, N3 and N10", "kpis.verdictRule.forbiddenActions", "endgame.forbidden seasonalEvent"]
    },
    "findings": [
      { "id": "F-E1", "to": "screen-inventory and UI-emission work, owner of ui-ux/store/01 artifactHygiene", "finding": "game/src/shared/Screens/shop-v2.luau lines 201 to 223 ship a live EventBanner whose EventText reads DOUBLE LUCK EVENT ENDS IN 2:14:09, and quests.luau line 78 reads DAILY QUESTS. Both replicate into the place today. artifactHygiene.mustNotBePresent already names both files, but instanceToday describes only the storefront strings and names neither the event banner nor the countdown", "regeneratesFrom": ["ui-forge/briefs/shop-v2.brief.json", "ui-forge/briefs/quests.brief.json"], "deletingEmittedFileClosesIt": false, "briefsPresentToday": 9, "observable": "count of files under game/src matching /ends in|expires|time left|limited time|\\d\\d?:\\d\\d:\\d\\d/i or the literal DAILY QUESTS: 2 today, both already in artifactHygiene.mustNotBePresent", "secondRuleBroken": "the middle dot in that string is illegal under vocabulary.allowedPattern ^[A-Za-z0-9 ,.'%%/-]+$", "repairedHere": false, "screenClaimedHere": false }
    ],
    "invariants": [
      "eventCount equals the length of events, and both are 0 and [] respectively, never a null and never a placeholder row",
      "no field anywhere in this key is null",
      "placeSideEventCount is 0 and dashboardEntriesAreNotThisKey is true; a dashboard entry existing does not falsify eventCount",
      "this key adds zero faucets, zero sinks, zero conversions, zero products, zero gates and zero player-facing strings",
      "every forbidden row carries a ruling tracing to an approved sheet or to this sheet, and an observable that is a count"
    ]
  }
}
```

## Consequences for other work

- **Store-listing and experience-page work** *[Discovery & Marketing — Store Page, Icon,
  Thumbnails]*: the boundary lands on you and it is permissive. A Creator Dashboard event entry is
  **your** surface and my zero does not forbid it — it needs no place change, caps at 10 concurrent
  and runs 7–30 days. What my zero forbids is the place behaving differently while one runs.
  *"Seasonal and event variants"* of an icon or thumbnail have **no in-game referent** after this
  ruling; whatever you make of them may not imply a place-side change.
- **Update-ordering work** *[Live Ops — Roadmap]*: an undated ordering is yours; a date is mine and
  is zero. `release` `N2` is the answer to *"why is an ordering permitted and a calendar not"* and it
  is not mine to give. Either Roadmap ruling leaves this key untouched.
- **Income and sink work** *[Gameplay — Systems `economy`, Balance `solvency`]*: subject five stays
  yours. This key adds no faucet, no sink and no conversion, and states no rule about held currency.
- **Screen-inventory and UI-emission work** *[UI/UX — Store, Screens]*: `F-E1`. Your whitelist
  survives; its `instanceToday` would be stronger if it named the event banner and the countdown,
  and the fix is the generator inputs, not the emitted files.
- **Anyone writing runtime code** *[Tech & Data, Mechanics, Meta & Content]*: `EV10` is new and
  binds you. `os.clock` is permitted because it is monotonic; `os.time`, `os.date` and `DateTime`
  are not, and the ban is now a content rule as well as `Layout.luau`'s determinism rule.
- **Contract-and-seam work**: `events` needs a shape in `bridge/schema.mjs` with
  `eventCount == len(events)`, and it is one of this wave's expected-empty keys. It cites `economy`,
  `solvency`, `endgame`, `discovery`, `collection`, `depths`, `release`, `kpis`, `notices` and
  `products`; four of those are proposals, so reference resolution runs against the proposal set.

## Acceptance criteria

1. `events.eventCount` is `0`, `events.events` is `[]`, `events.placeSideEventCount` is `0`,
   `events.forbidden` holds **14** rows each with a non-empty `ruling` and an `observable` that is a
   count, and the number of `null` tokens anywhere in this sheet's `manifest` block is **0**.
2. `rg -nE '\b(os\.time|os\.date|DateTime|GetJoinData|GameJoinContext|EventId)\b' game/src --glob '*.luau'`
   returns **exactly 2** lines, `Pressables.luau:436` and `Layout.luau:70`, and **both begin with
   `--`**. The engine names `RemoteEvent`, `OnServerEvent` and `OnClientEvent` cannot match: the
   pattern requires a word boundary immediately before `EventId` and none of the three has one.
3. `rg -lniE 'ends in|expires|time left|limited time|DAILY QUESTS|[0-9]{1,2}:[0-9]{2}:[0-9]{2}' game/src --glob '*.luau'`
   returns a set of paths that is a **subset of `ui-ux/store/01`'s `artifactHygiene.mustNotBePresent`**.
   Today that set is exactly `{shop-v2.luau, quests.luau}`, both already listed; the criterion fails
   the moment a file outside that whitelist matches.
4. Every `unlock` value across `depths` and `endgame.postTerminalArea` is the string
   `previousAreaComplete`, the count of content gates carrying any other condition is **0**, and
   `economy.faucetCount` and `economy.sinkCount` are both still **1**.

## Not decided here

What happens to currency the player cannot spend — **`economy.atMaxLadder`** *[Gameplay — Systems]*,
timed by **`solvency.ladderExhaustedAfter`** *[Balance]*; I route and add no rule. Whether an
undated, ordered sequence of content drops exists — **update-ordering work** *[Live Ops — Roadmap]*;
I own only the dated half and it is zero. Recurring, tiered, resetting structures — **Seasons**.
Whether a dashboard event entry is actually created, what it says and what it looks like —
**store-listing work** *[Discovery & Marketing]*; I state only that the place may not respond to it.
Repairing `F-E1` — **`ui-ux/store/01`'s `artifactHygiene` owner**, plus whoever owns
`ui-forge/briefs/`; I delete nothing and claim no screen. The `·` in the emitted banner string —
**`vocabulary`**, which forbids it independently of anything here. Whether codes or a group reward
exist — **Codes**, which holds the research line that names them and which this sheet does not
pre-empt.

## Flagged to the developer

**Two things were decided here that the brief did not state**, and one thing the brief states is
circular.

| item | what I decided | live alternative | why not |
|---|---|---|---|
| **`EV10`, the wall-clock content ban** | No real-world date or hour may branch what a player sees, earns or reaches. `os.clock` stays permitted | Leave it unstated, since no event exists to use it | An unstated hole is the one a builder fills. `N2` covers a flag and `Layout.luau` covers determinism; neither covers an `os.date()` branch, and the gap is exactly the shape an event would grow back through |
| **The E1 boundary** | A Creator Dashboard entry is store-page work and is permitted; the place responding to it is not | Rule the dashboard out too, making the zero total | The brief's *"no seasons or events"* is written in game-design context, and the platform docs require no place change. Forbidding a store-page act on a game-design line would be this sheet legislating over Marketing's surface |

**The circularity, relayed not laundered:** `05-OUTWARD.md` treats priority 3 as settled when
justifying the live-ops default, while `03-META.md`'s own bracket says that ordering was never
interviewed and `OPEN.md §1` records live-ops intent at **0 questions**. Four of Live Ops' five
domains are partly closed by that line. **This ruling does not use it** — it rests on the binding
non-goal — but the brief should be corrected rather than quoted.

**What this game loses by having no event:** nothing it was trying to keep. The one honest cost is
that `05-OUTWARD.md` is right that extension here is unusually cheap — new authored chunks need no
system change — so the capability exists and is deliberately unused. That is a scope decision, not
a technical one, and it is the developer's to reopen.
