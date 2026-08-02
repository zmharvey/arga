# Events — domain index

**Category:** Live Ops · **Wave:** 7 · Reads: `HANDOFF.md`, `CONCEPT.md`, `00-CORE.md`,
`03-META.md`, `05-OUTWARD.md`, `OPEN.md` (§1, §2, §3, §5), `research/grass-incremental.md`;
`cid/liveops/_category.md`; `cid/_state.md` (R-2, R-3, R-4); `cid/_contract.md`;
`bridge/schema.mjs`; `cid/gameplay/meta/07-after-the-last-find.md` (`endgame`);
`cid/gameplay/systems/04-earning-and-spending.md` (`economy`);
`cid/gameplay/systems/05-the-find-ledger.md` (`discovery`);
`cid/gameplay/balance/03-ladder-solvency.md` (`solvency`);
`cid/tech/deploy/01-the-release-contract.md` (`release`);
`cid/analytics/kpis/02-the-shortlist.md` (`kpis`);
`cid/ui-ux/feedback/01-the-notice-channel.md` (`notices`);
`cid/ui-ux/store/01-no-in-game-offer-surface.md`;
`cid/audio/music/01-whether-music-exists.md` (the empty-key model); `game/src`.

**One sheet. `events`, `eventCount: 0`.** The key does not exist in `bridge/schema.mjs` (25 keys,
none of them `events`), so it is proposed, not supplied.

---

## What the brief gave me

Every line below is quoted from the source, not from my category brief.

| line | where | tag |
|---|---|---|
| *"**Beating the genre's retention curve. Offered and declined.**"* | `00-CORE.md`, non-goals | `[brief: binding]` ← `[you chose: R1 Q3]` |
| *"Success is **shipped artifacts, not players**"* · *"the **smallest game** that still gives every creative area real work"* | `00-CORE.md` | `[brief: binding]` ← `[you chose: R1 Q3]` |
| *"Revenue. Offered and declined"* | `00-CORE.md`, non-goals | `[brief: binding]` ← `[you chose: R1 Q3]` |
| **Priority 3:** *"real procedural generation · rebirth · offline accrual · codes · daily rewards · leaderboards · trading · **seasons and events**"* | `03-META.md` | `[brief: soft]` ← `[I assumed — the ordering; scope was resolved through R4 Q1 and R5 Q1 but no explicit priority list was interviewed]` |
| *"**Ships and settles. No seasons or events.** Note that new authored chunks can be added without touching systems, so extension is cheap if ever wanted."* | `OPEN.md §2`, live-ops intent | `[brief: soft]` ← `[I assumed — batched]`, **0 interview questions** (`OPEN.md §1`, row `O / live-ops intent`) |
| *"Note that priority 3 already excludes seasons and events, so the default is constrained by a decision already made."* | `05-OUTWARD.md` | `[brief: soft]` — and it is **circular**: `03-META.md`'s own bracket says the ordering was never interviewed, so §2 is constrained by an assumption, not by a decision. Say so; do not launder it |
| *"Permanent multipliers only. **Never content access.**"* · *"**Forbidden:** any paid area, relic, or set. A paid-only object would turn 100% completion into a purchase"* | `03-META.md` | `[brief: soft]` ← `[you accepted: R5 Q4]` |
| *"There is no failure state… **Zero tension is deliberate**"*, restated `HANDOFF.md` §4 as *"nobody downstream should invent tension to fill the gap"* | `02-GAMEPLAY.md`, `HANDOFF.md` | `[brief: soft]` ← `[you accepted: step 6 Q2]` |
| *"solve duplicates **without adding a currency**"* | `02-GAMEPLAY.md` | `[brief: soft]` ← `[you accepted: R5 Q3 → R4 Q3]` |
| *"**Cleared is permanent.** Overgrowth never comes back."* | `CONCEPT.md`, `01-FOUNDATION.md` | `[brief: binding]` ← `[you chose: R2 Q1]` |
| *"**8–14, mobile-heavy**"*, *"10–20 minute active sessions"* | `00-CORE.md` | `[brief: binding]` ← `[you chose: R1 Q4]` |
| *"Codes for free boosts, and a group-join reward. Both are near-universal on Roblox incrementals and **their absence reads as an unfinished game**."* | `research/grass-incremental.md`, *What players of this will expect* | `[research: https://www.rosenberryrooms.com/grass-incremental/]` — **it names codes and a group reward. It does not name events.** That asymmetry is the strongest in-brief evidence for this domain's zero and the writer must use it rather than the general scope gate alone |
| *"10,435 peak to 819 current, **while still being actively updated weekly**"* | `research/grass-incremental.md` | `[research: https://www.rolimons.com/game/133086043677134]` |

**Approved sheets that already forbid my subject by name** (cite; do not re-derive):
`endgame.forbidden` — `seasonalEvent`, `dailyReward`, `seasonPass`, `redeemCode`,
`secondCollection`, `secondCurrency`, 13 in all, with *"Live Ops and Monetization get an
explicit no"*; `release.forbidden` `N2` *"any flag keyed to a date, a calendar or a season"*,
`N3` content-enablement, `N5` remote config, `N6` `MessagingService` fan-out, `N10` schedule /
ramp / canary; `kpis.verdictRule.forbiddenActions` — *"a retention fix, a daily reward, a streak,
a season, an event calendar"*, and *"no live tuning response exists and none may be invented"*;
`music` `M12` *"a track keyed to a date, holiday or live event"*; `notices` has exactly two
members (`setComplete`, `areaComplete`), both beats; `products` `F19`; `release.shutdown.
playerFacing: "nothing"`; ruling **R-4** (no in-game store); ruling **R-3** (the game is not
expanded past eight areas, *"the under-scoping argument is a retention argument, and that
argument is closed in this project"*).

---

## What the brief did not give me

Named, routed, not filled.

| # | gap | routed to |
|---|---|---|
| **E1** | **The brief never distinguishes an in-place event from a platform event.** *"No seasons or events"* is written in game-design context. Roblox's Creator Dashboard **Events & Updates** feature is a store-page and notification surface: *"Currently, you can publish a maximum of 10 ongoing or upcoming events"*, *"The best events run for 7-30 days"*, and it needs **no place change at all** — the docs state no requirement to update the experience. A dashboard event that alters nothing inside the place is a store-page act, not a design object. **Nobody has drawn that line and it decides whether my zero binds Marketing.** | **sheet 01**, which must draw it and state which side it owns; consequence for **store-page and experience-page copy work** *[Discovery & Marketing — Store Page, wave 7 sibling]*, whose row 26 of the category surface is already `live` |
| **E2** | **Nothing forbids reading wall-clock time for content purposes.** `release` `N2` closes a date-keyed *flag*; `N5` closes remote config; `Layout.luau:70` bans `os.time` as a *determinism* rule for chunk shuffling, not as an events rule. A raw `os.date()` branch in game code is named by no approved sheet. **This is the only hole my subject actually has to close itself**, and it is why this sheet is not purely a set of citations. | **sheet 01**, as its own forbidden row with a grep |
| **E3** | **The brief never says what happens to currency the player cannot spend.** This is the live question under my node's fifth subject and it **is not mine**: `economy.atMaxLadder` decided it — *"at max ladder income continues, buys nothing, converts to nothing, and is neither capped nor hidden"* — and flagged it `[cid: decided]`; `solvency.ladderExhaustedAfter` puts the moment at *"about 2.8 post-terminal bays"* past 24/24; `endgame` closes the content half (*"no new sink appears"*). | **owned by `economy`** (`gameplay/systems/04`), timed by `solvency` (`gameplay/balance/03`). Sheet 01 states the routing in one line and adds no rule |
| **E4** | **Priority 3's ordering was never interviewed** (`OPEN.md §5` row 7). Four of Live Ops' five domains are closed in part by a line at the weakest tag in the ladder, and `05-OUTWARD.md` then cites priority 3 as if it were settled. | **sheet 01** states the tag and the question count honestly and rests the ruling on `00-CORE.md`'s binding non-goal instead. It may **not** upgrade the soft line |
| **E5** | **The brief states no off-Roblox presence anywhere** (category `G1`). An event's only permitted announcement surface is therefore the experience page, and there is no second one. | recorded here; **Community** rules on intake and **Marketing — Social** on creation. Sheet 01 cites it only as part of the reversal cost |
| **E6** | **The seam between "an ordered drop" and "an event" is undrawn.** `05-OUTWARD.md` says extension is cheap; `release` `N2` forbids dates. Nothing says an undated ordered release is permitted while a dated one is not. | **update-ordering work** *[Live Ops — Roadmap]* owns the permitted half. Sheet 01 owns only the dated half and states the seam as a boundary, not as a decision about drops |

---

## Why 1 sheet

The contract has 25 keys and none is `events`, so this domain proposes exactly one, and the
ruling is one decision: **no event exists, in any form, and here is what that forbids and what
reversing it costs.** All five of my node's subjects are consequences of that single decision —
duration, rewards and entry requirements are properties of an object that does not exist, and
unspent-currency handling is a question another key already answered. Splitting them would
produce four sheets saying "vacuous" four times, which is wave 1's 6,297 lines of prose with a
different subject. There is no second decision here that constrains `events` without being it:
the dashboard-versus-place boundary (E1) and the wall-clock prohibition (E2) are both statements
about what `events: 0` means, and a statement about a key's own meaning belongs in that key.

---

| # | sheet | must decide |
|---|---|---|
| 01 | `whether-an-event-exists` | Rule that this game ships **zero events** — propose key `events` with `eventCount: 0`, `events: []`, no null anywhere in the value, and the invariant `eventCount == len(events)` — resting the ruling on `00-CORE.md`'s **binding** *"Beating the genre's retention curve. Offered and declined"* upheld by ruling **R-3**, and stating `03-META.md` priority 3 and `OPEN.md §2` accurately as `[brief: soft]` ← `[I assumed]` at **0 interview questions** without upgrading either; record **all five of the node's subjects as absent rather than dropping them** — event concepts, duration and timing, exclusive rewards, entry requirements, and post-event handling of unspent currency, the last **routed by name to `economy.atMaxLadder` and timed by `solvency.ladderExhaustedAfter`, adding no rule of your own** and stating in one line that the category's graph check (*"every event reward has a source system and a post-event handling rule for unspent currency"*) is **satisfied vacuously by the empty set**; give a `forbidden[]` in `music`'s form, one row per closed form, each carrying the approved sheet that closes it and an **observable that is a count**, covering at least a limited-time event, a countdown or expiry of any kind (`02-GAMEPLAY.md` *"Zero tension is deliberate"*), an event currency or ticket (*"solve duplicates without adding a currency"*, `economy.forbidden`), an exclusive relic, set or area (`03-META.md` *"Never content access"*, `discovery.repeat.possible: false`, `collection` closed at 24 names, `endgame.forbidden[secondCollection]`), an event-gated entry condition (`depths` unlock is `previousAreaComplete` and is the only content gate in the game), a date-keyed flag or schedule (`release.forbidden` `N2`/`N3`/`N10`), a cross-server or announced event (`release` `N6`, `notices` has exactly two members and both are beats, `products` `F19`, `release.shutdown.playerFacing: "nothing"`), an event-triggered product (`release.provisioning`'s six gates, gate 3 blocked on an unanswered Networking question, `products.devProductCount: 0`, ruling R-4), an event-conditioned analytics trigger (`kpis.verdictRule.forbiddenActions`, and five of eight rows `readableToday: false`), and **a wall-clock read used for content — the one prohibition no approved sheet supplies, which is yours to write** (verified baseline: `os.time`, `os.date`, `DateTime`, `GetJoinData` and `EventId` appear **zero times in executable code** across `game/src`; the only mentions are two comments at `Pressables.luau:436` and `Layout.luau:70` stating they are deliberately not used, and `os.clock` is monotonic and permitted); **draw the boundary in E1** — an entry on the Creator Dashboard Events & Updates page that changes nothing inside the place is store-page work and not yours, and your zero binds only what the place does, so state which side each half falls on and let store-listing work act; **price the reversal honestly** using the platform facts banked below (10 concurrent events max, 7–30 day recommended run, `GameJoinContext.EventId` readable via `player:GetJoinData()`) against what this game lacks — no store, no notice channel that can carry a non-beat, no chat, no second currency, no text entry, no off-Roblox channel, and no instrument to tell whether it worked; **carry finding F-E1**: `game/src/shared/Screens/shop-v2.luau` lines 201–223 ship a live `EventBanner` reading `"DOUBLE LUCK EVENT  ·  ENDS IN 2:14:09"`, and `quests.luau:78` reads `"DAILY QUESTS"`, both replicated into the place today, both regenerable from `ui-forge/briefs/shop-v2.brief.json` and `quests.brief.json` after any re-emit — `ui-ux/store/01`'s `artifactHygiene.mustNotBePresent` already names both files and its `instanceToday` describes the storefront strings but **not the event banner or the countdown**, so state the event-specific grep as your observable, route the repair to that rule's owner and **do not delete anything or claim the screen** ; and end with 2–4 criteria that are counts, at least one of them a grep over `game/src` scoped so that the engine names `RemoteEvent`, `OnServerEvent` and `OnClientEvent` cannot false-positive. |

---

## Every subject in my node, with its ruling and its observable

Stated here so a verifier can check the sheet covers all five, and so an absence is recorded
rather than dropped. **These are the rulings to apply; the sheet states them, it does not
re-derive them.**

| subject | ruling | mechanically checkable observable |
|---|---|---|
| **event concepts** | `00-CORE.md` retention non-goal `[brief: binding]`, upheld by **R-3**; priority 3 and `OPEN.md §2` `[brief: soft]`; `endgame.forbidden[seasonalEvent]` | `events.eventCount == 0` and `len(events.events) == 0`; count of `GetJoinData` / `EventId` reads in `game/src`: **0** (verified this run) |
| **duration and timing** | `02-GAMEPLAY.md` *"Zero tension is deliberate"* — a window is tension with a clock on it; `release.forbidden` `N2`, `N10`; plus **E2**, which this sheet closes itself | count of `os.time`, `os.date`, `DateTime` occurrences in executable code under `game/src`: **0** (verified; `os.clock` is monotonic and excluded by name). Count of rendered strings matching `/ends in|expires|time left|\d+:\d\d:\d\d/i`: **1 today**, at `Screens/shop-v2.luau:223` — see F-E1 |
| **exclusive rewards** | `03-META.md` *"Never content access"*; `discovery.repeat.possible: false`; `collection` closed at 24 names; `endgame.forbidden[secondCollection, secondCurrency]`; `modifiers` owns every permanent stat change and its resolution order | `collection.total == 24` and every name reachable by clearing alone; count of grants in the build conditioned on a date, a window or an event id: **0** |
| **entry requirements** | vacuous at zero events; and the game has exactly one content gate — `depths` unlock is `previousAreaComplete` (`endgame.postTerminalArea.unlock` likewise) | count of content gates whose condition is anything other than `previousAreaComplete`: **0** |
| **post-event handling of unspent currency** | **vacuous, and it must be said in one line rather than left to a verifier.** Zero events → zero event currencies → nothing unspent to handle. The live question underneath is **not mine**: `economy.atMaxLadder` rules income continues, converts to nothing, no new sink appears, not capped, not hidden; `solvency.ladderExhaustedAfter` dates it at ~2.8 post-terminal bays; `endgame` forbids answering it with content | the category graph check *"every event reward has a source system and a post-event handling rule for unspent currency"* quantifies over `events.events`, which is empty, so it **passes vacuously and the sheet says so**. `economy.sinkCount` stays **1** and `economy.faucetCount` stays **1**; this key adds neither |

---

## Considered and not assigned

- **A one-off launch moment, a "week one" bonus, or a first-published-session grant.** It is a
  date-keyed grant in a different sentence. `economy.zeroCreditEvents` already rules
  `session-start` at zero, *"no welcome grant, no return grant, no offline accrual"*.
- **A "restoration festival" fiction sheet** — an event dressed as lore. Fiction for an object
  that does not exist is exactly the reserved slot the scope gate forbids; `tech/deploy/02`
  settles the general case, *an explicit null and a never-emitted key are the same bytes*.
- **A second sheet for the dashboard-versus-place boundary.** It is a statement about what
  `events: 0` means, not a separate decision, and it would collide with store-page work if
  written as its own object.
- **A sheet on "what the game loses by having no event."** That is a paragraph inside the
  ruling, following `music`'s `## Flagged to the developer` table, not an item.
- **Anything past area 8, and any expansion of the collection.** `endgame` and **R-3**. Not
  mine to reopen, and reopening it is a retention argument.
- **A reserved `events` slot in `bridge/schema.mjs` with a placeholder row.** The key is
  proposed with a real zero value or not at all.

---

## The contract key this domain needs

`events` does not exist in `bridge/schema.mjs` — 25 keys, checked directly, none of them
`events` — so sheet 01 carries `"status": "proposed"`.

**What it would hold:** `eventCount` (0), `events` (`[]`), the boundary between a place-side
event and a dashboard entry, the wall-clock prohibition, `forbidden[]` as rows of
`{id, form, ruling, observable}`, `unspentCurrency` as a routing record naming `economy` and
`solvency` and asserting the vacuous pass, and `reversalPath` carrying the platform facts and
the missing surfaces. **Its useful invariant is `eventCount == len(events)`**, the shape
`music.trackCount == len(music.tracks)` established; plus **no field in the value is `null`**,
which is `tech/deploy/02`'s hard error and the subject of `music`'s `RR-M2` (43 explicit nulls
across seven approved sheets). This key must not add a 44th.

---

## Verification note

**The sheet most likely to be contradicted later is this domain's only sheet, and the
contradiction will come from Discovery & Marketing — Store Page or Icon/Thumbnails, not from
inside Live Ops.** Those leads own *"seasonal and event variants"* by name; my zero removes the
referent for that half of their subject, and if either creates a Creator Dashboard event to
promote the game, `events.eventCount: 0` reads as false to anyone who does not hold the E1
boundary. **The sheet must therefore state the boundary in the key itself, as data, not in
prose** — a field such as `placeSideEventCount: 0` beside a stated `dashboardEntriesAreNotThisKey`
is what survives that collision; a paragraph is not.

Second most likely: **the seam with update-ordering work** *[Roadmap]*. If Roadmap rules that an
ordered, undated sequence of drops exists, a reader will ask why an ordering is permitted and a
calendar is not. The answer is `release` `N2` and it is not mine to give; the sheet states the
seam and cites, so that a Roadmap ruling either way leaves this key untouched.

Third: **F-E1 is a live artifact contradiction and it is in `game/src` today.** A verifier
grepping for event strings finds one and will read the zero as violated. The sheet must name the
file, the lines, the owning rule (`ui-ux/store/01` `artifactHygiene`) and the fact that the
generator input survives deletion of the emitted file — and must repair nothing.

**Ordering note for the merger:** this key cites `economy`, `solvency`, `endgame`, `discovery`,
`collection`, `depths`, `release`, `kpis`, `notices` and `products`. Four of those are proposals,
not merged keys, so any reference-resolution check runs against the proposal set exactly as
`kpis.refGrammar.pendingRefs` describes.

---

## Research owed

`must_verify` for this node in `docs/cid-workflow.json` is **empty**. I fetched anyway, because
whatever I bank here is the only external evidence the writer can cite.

**Fetched and banked** (bare URLs, so `cid:research` picks them up from this `_lead.md`):

1. https://create.roblox.com/docs/production/promotion/experience-events — the platform *does*
   have a scheduled-events system, which is the fact that stops this ruling resting on *"the
   mechanism does not exist."* It does exist, at the platform level, and what closes it is scope
   and the binding non-goal. Verified against the creator-docs source at
   https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/production/promotion/experience-events.md
   — *"Currently, you can publish a maximum of 10 ongoing or upcoming events"*, *"The best events
   run for 7-30 days and highlight something new or time-limited for players"*, and *"When a
   player joins an experience through an event entry point… the event ID is added to the player's
   `GameJoinContext`"*, read with `GetJoinData()`. **The docs state no requirement to change the
   experience for an event**, which is what makes gap E1 real rather than pedantic.
2. https://www.roblox.com/games/133086043677134/Grass-Incremental-Simulator — the reference game,
   the one cited as *"actively updated weekly"*, lists **no events and no update announcements**
   on its experience page today. Its description mentions a group-join boost and a like/favourite
   ask, and **no codes and no event**. This is the counterweight to the category's strongest
   counter-evidence: `research/grass-incremental.md`'s *"absence reads as an unfinished game"*
   names codes and a group reward, **not events**, and the reference itself shows none.
   `[unverified: whether it has ever run one]` — an experience page shows only active and
   upcoming events, so today's empty listing is not a history. **The fetch that would settle it:**
   the experience's Events & Updates listing including the *Finished* tab, or a third-party
   archive of that game's event pages over the past year. Not publicly reachable from the game
   page, and the writer must carry the limitation rather than the stronger claim.
3. https://www.rolimons.com/game/133086043677134 — already banked by wave 1; carries the
   10,435 → 819 CCU decay under weekly updates, which is the evidence that cadence does not buy
   retention and therefore that an event would not either.

**Not fetched, and stated as owed rather than assumed:**

- `[research owed: a figure for what share of Roblox incremental/simulator experiences run
  limited-time events]`. The category asserts events are retention instruments; nobody has
  measured their prevalence in this genre. It would not change the ruling — the binding non-goal
  closes it regardless of prevalence — so the sheet must not rest anything on prevalence.
  **The fetch that would settle it:** a sampled listing of the top `X Incremental` / simulator
  experiences with their Events & Updates pages read individually. There is no aggregate source.
- `[research owed: whether a Creator Dashboard event can be published for an experience that is
  in early access or unpublished]`, which bounds the reversal path's first step. The eligibility
  text retrieved covers permissions, the 10-event cap and the 13+/7-day rule for off-platform
  featuring, and says nothing about publication state. **The fetch that would settle it:** the
  eligibility section of the same creator-docs page rendered with its requirements table, or the
  Events & Updates page of an unpublished test experience.

**Not claimed as sourced:** nothing in this index is presented as fetched that was not. The
`game/src` counts in the observables table were read directly this run and are stated as
verified; the `Screens/shop-v2.luau` and `quests.luau` lines were opened, not inferred from a
grep summary.

---

## Consequences for other subjects

Stated as consequences, per the boundary rule. Named by kind of work.

- **Store-page and experience-page work** *[Discovery & Marketing — Store Page, Icon,
  Thumbnails]*: gap **E1** lands on you. A Creator Dashboard event entry is your surface and my
  zero does not forbid it; what my zero forbids is the place behaving differently while it runs.
  *"Seasonal and event variants"* of an icon or thumbnail have **no in-game referent** after this
  ruling — whatever you make of that is yours, but it may not imply a place-side change.
- **Update-ordering work** *[Live Ops — Roadmap]*: gap **E6**. An undated ordering is yours; a
  date is mine and is zero. I state the seam and decide nothing about drops.
- **Income and sink work** *[Gameplay — Systems, `economy`; Balance, `solvency`]*: gap **E3** is
  yours and stays yours. This key adds no faucet, no sink and no conversion, and its writer is
  instructed to add no rule about held currency.
- **Screen-inventory and UI-emission work** *[UI/UX — Screens, Store]*: finding **F-E1**. The
  `artifactHygiene` whitelist tests the emitted place; the event banner and the daily-quests
  heading also exist in `ui-forge/briefs/`, so a re-emit re-creates them. The rule survives; its
  `instanceToday` description does not name the event banner or the countdown and would be
  stronger if it did.
- **Contract-and-seam work**: `events` needs a shape in `bridge/schema.mjs` with the invariant
  above, and it is the fourth expected-empty key in this wave. An empty key with a reason and a
  check is data.
