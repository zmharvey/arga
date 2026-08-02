# Funnels — domain index

**Category:** Analytics · **Wave:** 5 · Reads: `HANDOFF.md`, `CONCEPT.md`, `00-CORE.md`,
`01-FOUNDATION.md`, `02-GAMEPLAY.md`, `03-META.md`, `04-PRESENTATION.md`, `OPEN.md`;
`cid/analytics/_category.md`; `cid/_contract.md`, `cid/_state.md`;
`cid/gameplay/onboarding/_lead.md`, `02-first-minute-beats.md`, `03-teaching-order.md`,
`04-run-one-withholds.md`; `cid/gameplay/balance/05-time-to-milestone.md`;
`cid/gameplay/monetization/01-the-offer-ladder.md`; `cid/gameplay/_verified-wave4.md`.
Repo reads: `game/src/shared/Protocol.luau`, `game/src/shared/Types.luau`,
`game/src/server/Clearing.luau`, `game/src/server/Entitlements.luau`,
`game/src/server/Persistence.luau`, `cid/_research/pack.md`, `bridge/context.mjs`.

**I could not run `npm run bridge -- --contract`** — this agent has no shell. I read its
committed output, `cid/_contract.md`, instead, and checked `funnels` against all 25 merged
keys, wave 4's four proposals (`tierMix`, `solvency`, `axisBudget`, `pacing`) and my four
sibling domains' expected keys (`telemetry`, `engagement`, `economyHealth`, `kpis`). **No
collision.** `funnels` is a new proposed key and this domain owns none of the 25.

## What the brief gave me

| constraint | tag |
|---|---|
| *"(1) did a first-session player reveal a relic, and how fast — validates the ten-second onboarding promise"* (`OPEN.md §2`) | `[brief: soft]` ← `[I assumed — §2 default]` |
| *"all three test assumptions this spec rests on rather than reporting vanity"* (`OPEN.md §2`) | `[brief: soft]` ← `[I assumed]` — the selection principle every sheet of mine answers to |
| *"**Clear → reveal inside the first ten seconds.** The player spawns touching overgrowth, and the first patch they clear has something under it. No text, no tutorial."* (`02-GAMEPLAY.md`) | `[brief: soft]` ← `[you accepted: R6 Q3]` — the one promise the headline funnel exists to falsify |
| *"**There is no failure state.** No death, no losing, no loss of progress"* · *"A stuck player cannot exist"* · *"Zero tension is deliberate"* (`02-GAMEPLAY.md`) | `[brief: soft]` ← `[you accepted: step 6 Q2]` — **a drop-off is a player who stopped, never a player who lost** |
| *"Success is **shipped artifacts, not players**"*; non-goals *"Beating the genre's retention curve. Offered and declined"* and *"Revenue. Offered and declined"* (`00-CORE.md`) | `[brief: binding]` ← `[you chose: R1 Q3]` — bounds what a threshold may trigger |
| *"**8–14, mobile-heavy, short sessions**"* · *"10–20 minute active sessions"* (`00-CORE.md`) | `[brief: binding]` ← `[you chose: R1 Q4]` |
| *"~70% mobile / ~25% desktop / ~5% console"* (`00-CORE.md`) | `[brief: soft]` ← `[I assumed — the split]`; `cid/_state.md` records it uncorroborated by anything wave 2 fetched |
| Session objective *"find at least one new relic"* → measurable *"collection count rose this session"* (`03-META.md`) | `[brief: soft]` ← `[you accepted: R6 Q3 → R5 Q3]` — the brief's own one measurable definition; do not re-invent it |
| *"**Permanent multipliers only. Never content access.**"* (`03-META.md`) | `[brief: soft]` ← `[you accepted: R5 Q4]` |
| Priority 3, excluded entire: *"leaderboards · daily rewards · seasons and events · rebirth · offline accrual · codes · trading"* (`03-META.md`) | `[brief: soft]` ← `[I assumed — the ordering]`; rebirth and offline accrual independently `[brief: binding]` |
| *"Ships and settles. No seasons or events."* (`OPEN.md §2`) | `[brief: soft]` ← `[I assumed]` — there is no live-ops loop for a threshold to feed |

**Approved upstream and binding on every sheet here:** *"Measure freely, display none of it"*
(`theme/tone/04` `X10`, relayed by `theme/fantasy/03`) — nothing in this domain reaches a
player-facing surface, so I owe `vocabulary` no string. `onboarding/03` hands me its subject
in writing: *"the observable column is a list of definitions, not a measurement plan. Whether
any of the seven is instrumented, and at what pass mark, is yours."* `onboarding/04` closes
with *"Whether any of this is measured (Analytics — Funnels)."* `balance/05` closes with
*"Whether any row here is instrumented and at what pass mark (Analytics — Funnels, wave 5)."*
**I decide populations, pass marks and instrument-or-not. I re-time no beat.**

**Two origins I inherit exactly and may not harmonise.** `firstSession.ceilings` states
`secondsToFirstClear` `measuredFrom: "firstInput"`, population *"all run-1 sessions in which
any input occurred"*; `secondsToFirstReveal` `measuredFrom: "join"`, population *"run-1
sessions whose first input arrived by second 5.0"*. `onboarding/02`'s reason — *"a player who
has not moved is not failing"* — is the reason, and `balance/05` warns every other milestone
row is join-relative, so mixed origins are already live and must be carried as a per-step
field rather than flattened.

## What the brief did not give me

Eight gaps, each routed. None is filled here.

1. **The measurement default names a subject and states no unit, no population and no pass
   mark.** `OPEN.md §2` item (1), `[I assumed]`, at 0 interview questions (`OPEN.md §5` row 8,
   *"batched by design"*). `onboarding/02` closed the two units and two populations for the
   ceilings and nothing else. → **01** for populations and origins across the rest of the
   ladder; **04** for every pass mark.
2. **Nothing in the brief or in any approved sheet says what a drop-off *means* in a game with
   no failure state, or what may be done about one.** Retention is a declined goal, so the
   obvious response to a drop-off is closed. → **04**, which must rule that a threshold
   triggers a revision request against a named field, not a design change to hold players.
3. **No pass mark exists for any number in this game.** Not one sheet across four waves says
   "we ship if X ≥ Y". → **04** for the funnel half; the shortlist and cadence are
   dashboard-and-target work [currently Analytics — KPI] and I do not set them.
4. **Nothing states a minimum sample before a measured rate may be read.** The only empirical
   reading in the project is n = 1, untimed, and every design figure is `[playtest unknown]`.
   A conversion rate quoted on a handful of sessions would falsify a sheet on noise. → **04**.
5. **Nothing records the join instant, the session, or which run a session is.**
   `Types.luau`'s `PlayerState` and `StoredState` carry no timestamp, no session id and no run
   ordinal; `Persistence.load` knows whether `GetAsync` returned nil but returns only
   `(state, readable)`, and `readable` is *"true when the state came from a store that answered
   — a real save, or a first-time player"*. **So both inherited populations — "run-1 sessions"
   — cannot be formed, and no `bySecond` or `measuredFrom: "join"` figure anywhere in
   `firstSession` or `pacing` is measurable in the shipped state shape.** → **01** states the
   requirement precisely; the fields belong to state-shape work [currently `architect`] and
   the emission to event-catalog work [currently Analytics — Event Logging]. I may not add a
   field to a key I do not own.
6. **The brief has no purchase journey at all**, and the two surfaces that would have made one
   were removed after it: ruling R-4 and `products.storeExists: false` / `promptGamePassPurchaseCalls: 0`
   / F13 / F19. → **03**, which states the absence as data rather than describing a funnel that
   cannot exist.
7. **Nothing says whether comprehension is measurable.** `onboarding/03` wrote seven evidence
   predicates and routed the measurement plan to me; three of them read player intent
   ("keeps clearing new ground rather than re-walking the reveal site") or a client-side panel
   open, neither of which crosses the seven-channel protocol. → **02**.
8. **The device split is a prediction with no source and is the most natural funnel
   breakdown.** `~70/25/5` `[I assumed]`, uncorroborated (`cid/_state.md`). The platform
   allows exactly three custom fields per event `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/production/analytics/event-types.md]`,
   so spending one on device is a real trade. → **01**, which allocates the three.

**Relayed, not mine:** what may be collected from an 8–14 audience (event-catalog work, as a
sourced obligation); that no logging pipeline exists anywhere in `game/src` (same); that the
one playtest is recorded in no artifact (run-state work); `social.maxPlayers`, which is the
denominator of every per-server figure (per-server-capacity work, this wave).

## Why 4 sheets

**One key, and this domain owns none of the merged 25** — so the floor is one sheet holding
`funnels`, and every extra row has to earn itself against a decision that is genuinely
separate rather than a heading. Four survive that test. `01` is the ordered ladder: an
ordinal, an origin, a population and an emitter per step, which is one artefact and cannot be
split by step without producing rows nobody can read alone. `02` is **not** that ladder and
the difference is structural, not editorial: `firstSession.teaching[]` is seven *unordered*
booleans with windows, five of which sit outside minute 1 entirely, and the decision it forces
is a triage — instrument, proxy, or unobservable-with-a-reason — which has no ordinal and no
drop-off. `03` reaches the opposite conclusion from `01` about its own subject (there are no
steps, and the reason is four separate approved prohibitions plus a null id); folding a
negative finding into a sheet whose shape is a step table is how a finding becomes a footnote.
`04` is the verdict layer and it spans all three — a pass mark, an alarm and a named action
per instrument, plus the prohibition on what an action may be — and it is the half the
category lead flags as most often left implicit. One key, four sheets: `01` carries the
`manifest` block and `02`, `03` and `04` carry `{"amends": "funnels"}` JSON blocks, which is
the pattern `onboarding/02`–`04` already used for `firstSession` and `theme/vocabulary/02` for
`vocabulary`, and which exists because `bridge/merge.mjs` admits exactly one owning sheet per
key. **There is no fifth.** "Which events carry the steps" is event-catalog work, "which of my
figures is promoted to a shortlist and reviewed on a cadence" is dashboard-and-target work,
and "how the pipe is built" is Tech & Data's — all three were considered and all three are
across a boundary.

| # | sheet | must decide |
|---|---|---|
| 01 | `onboarding-funnel` | Decide the one ordered onboarding funnel over `firstSession.beats[]`, as a step table where each row carries an ordinal, a step name, the `measuredFrom` origin inherited verbatim from `firstSession.ceilings` (`firstInput` for the first-clear step, `join` for the rest — carry the origin per step, never harmonise them), the population it is counted over, the `firstSession` or `pacing` field path it is capable of refuting, the server-side observation point in `game/src` that could emit it, and whether that observation point exists today; rule on whether the funnel is fired through `LogOnboardingFunnelStepEvent` (one-time, no session id) or `LogFunnelStepEvent` (recurring, needs a `funnelSessionId`), allocate the platform's three custom fields across device, ownership and any third dimension you judge worth one, and state as a hard requirement — not an assumption — that nothing in `Types.luau`'s state shape records a join instant, a session id or a run ordinal, so both inherited "run-1" populations and every join-relative second are unformable until state-shape work adds them; carry it as a fenced `manifest` block proposing `funnels` with `"status": "proposed"`, and state in the sheet what an ordered step table would have caught that `onboarding/03`'s S3 did not — `pacing.milestones[firstPurchase]` dating the purchase step before the two steps specced to precede it — including the fact that Roblox's own funnel auto-completes skipped earlier steps and therefore would *not* have shown it in production, so the catch is at design time on the ordinal table and in production only via a step that carries its elapsed second. |
| 02 | `comprehension-instruments` | Decide, for each of the seven rows of `firstSession.teaching[]`, exactly one disposition — instrumented as a countable server-side predicate, instrumented only as a stated proxy with the proxy written out, or **unobservable** with the specific reason and the specific thing that would make it observable — and for every row you instrument, convert `onboarding/03`'s prose evidence string into a countable form with an explicit window, an explicit population and the state field or channel it is read from; rule specifically on the three that read intent or a client surface (the re-walking test, the collection-panel open, and the currency-readout row), noting that `create.roblox.com`'s analytics events *"can only be sent from the server and in published games"* so a client-only observable needs either a server-side proxy or an eighth channel, which is a stated requirement to event-catalog and protocol work and not yours to design; treat the single `required: true` row, `contactClearing`, as the only one whose failure means the design never starts, and say what follows from that for how the other six are read; emit it as a fenced `json` block with `"amends": "funnels"` supplying a `comprehension[]` array, and decide nothing about what any beat teaches, which is `onboarding/03`'s and approved. |
| 03 | `the-purchase-read` | Rule that the first-purchase funnel has **zero observable in-game steps** and write that as data rather than as prose: enumerate every step a conventional purchase funnel would carry — offer impression, offer opened, prompt shown, prompt accepted, purchase completed, effect applied — and give each one the specific approved prohibition or platform fact that makes it unobservable here (`products.storeExists` false and `purchaseSurface` "the Roblox experience page" under ruling R-4; `promptGamePassPurchaseCalls` 0; F13's zero prompt calls in any path; F19's ban on a product being named, shown, priced or referred to anywhere in-game; F20's ban on persisting ownership; and the platform fact that a pass bought on the experience page raises nothing server-side while `UserOwnsGamePassAsync` is cached, per the sourced material in the research pack); then specify the one live reading that does exist — the join-time ownership boolean `Entitlements.refresh` writes to `state.owned`, resolved once per join, never persisted, never on the wire — with its population, what it can be attributed to and what it cannot, and mark it **specced-but-dormant** with `products.externalPrerequisite` named, because every `gamePassId` is `null` so the reading is a structural constant today; state as a consequence that `pacing.milestones[].purchaserSeconds` therefore names a population that is definable but empty, which suspends ten instruments rather than one; emit it as a fenced `json` block with `"amends": "funnels"` supplying a `purchase` object, and propose no purchase surface, no prompt and no in-game store. |
| 04 | `drop-off-thresholds` | Decide, for every instrument `01`, `02` and `03` define, the drop-off threshold that triggers action and the action it triggers: per step a pass mark and an alarm value, each `[playtest unknown]` with a starting value and a test range since no sheet in four waves states a pass mark for anything, plus the minimum session count below which no rate may be read at all (the project's only empirical reading is n = 1 and untimed); rule on what "triggers action" means when `00-CORE.md` binds success to *"shipped artifacts, not players"* — the action must name the sheet and field path that moves when the threshold trips, so a tripped alarm becomes a revision request against a design prediction rather than a live-service lever — and write the prohibition list that follows from the brief: no threshold may trigger a retention fix, a daily reward, a season, a leaderboard, an offline grant, a rebirth, or an in-game store, because each is either priority 3 or a declined non-goal, and no drop-off may be described as a failure because there is no failure state; state which thresholds move if `_verified-wave4.md` RR-10 lands, naming the field rather than copying a number, since wave 4 is FAIL and has not released; emit it as a fenced `json` block with `"amends": "funnels"` supplying the per-instrument `passMark`/`alarm`/`action` rows, the `minimumSessions` rule and the `forbiddenActions` list, and do not select a shortlist, a review cadence or a dashboard layout, which are dashboard-and-target work. |

## The key this subject needs

`funnels` does not exist in the 25 and nothing merged can hold it: `onboarding` holds one
boolean, `firstSession` holds beats and teaching predicates as *definitions* with no
population, pass mark, emitter or verdict rule, and `pacing` holds predictions with no
instrument. **`funnels` would hold:** `platformLimits` (the sourced ceilings a build must stay
under); `api` (which Roblox method each funnel uses); `onboarding.steps[]` of
`{ ordinal, id, stepName, measuredFrom, population, refutes, emitter, emitterExistsToday }`;
`comprehension[]` of `{ concept, disposition, countableForm, window, population, reason }`;
`purchase` of `{ isFunnel, observableSteps, steps[], liveReading, dormantUntil }`;
`populations[]` with a `formableToday` boolean each; `thresholds[]` of
`{ instrument, passMark, alarm, action, minimumSessions }`; `forbiddenActions[]`; and
`requiresFromOtherKeys[]` naming the state fields that do not exist. **The finding for whoever
maintains the schema:** `funnels` is the first key in the contract whose value is *about* other
keys' values rather than a value a build reads directly. A cross-key check worth writing on it
is that every `refutes` path resolves to a live field, which would have caught RR-10 at merge
time. Whether that belongs in `bridge/schema.mjs` or in a separate verification pass is
contract-and-seam work, not mine.

## Verification note

**`01` is the sheet most likely to be contradicted, and by two owners.** First by
number-and-curve work: `_verified-wave4.md` RR-10 is open between two named owners and its
resolution moves either `firstSession.beats[firstSpendAffordable].testRange` or the cheapest
`upgrades[].costBase`, and my purchase step's ordinal and pass mark move with whichever lands.
Wave 4 is **FAIL and has not released**, so every figure in `pacing`, `firstSession` and
`solvency` is in flux; the instruction to every sheet here is to cite the field path and never
copy the number. Second by event-catalog work, running in the same wave: a funnel step is
emitted as an event, and if that domain writes a naming convention my `stepName` values must
satisfy it. **The boundary I am asserting, so it is contested now rather than at merge:** I
name and order the *steps* and set their populations and pass marks, because the sheet that
decides a thing names it; event-catalog work owns the *event names, payload fields, required/
optional split and sampling*, and the emission of a step is one of its events. If that domain
also names steps, two sheets claim one key.

**`03` carries a different risk, and it is that it will read as under-served.** It concludes
that there is nothing to build. The category brief pre-ratifies that conclusion — *"Expect a
lead that spends most of its sheets on onboarding and one short sheet stating precisely why
the purchase funnel is a join-time ownership read"* — and a verifier should read the short
sheet as correct rather than thin, provided every unobservable step carries its specific
reason.

## Research owed

**`must_verify` is empty for this node.** I fetched anyway, because my writer has no fetch
tools and every sheet here has to justify itself against what the platform can actually
record. Everything below is a page I fetched this run; it banks into `cid/_research/pack.md`
on the next `npm run cid:research`, which must run before this domain is packed.

**The funnel API exists on the platform and my sheets are specced against it, not around it.**
Two methods: `LogOnboardingFunnelStepEvent(player, step, stepName, customFields)` for
*"conversion events that only occur once per user"* and
`LogFunnelStepEvent(player, funnelName, funnelSessionId, step, stepName, customFields)` for
recurring ones; *"If a user repeats a step in a funnel, the funnel only considers the first
instance"* and **"If you skip a step in a funnel, the earlier steps automatically complete"**
— which is the fact that decides how `01` frames its own argument
`[research: https://create.roblox.com/docs/production/analytics/funnel-events]`
`[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/production/analytics/funnel-events.md]`.

**The platform limits, which are hard ceilings on anything this domain specs:** *"Total
`AnalyticsService` requests per minute: 120 + (20 * CCU)"*; 10 funnels; 100 steps per funnel;
3 custom fields per event; 8,000 unique value combinations across them, *"grouped as 'Other'
after"*; 100 custom event names; and *"Events remain visible on the Creator Dashboard and
automatically expire after 90 days from last data received"*
`[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/production/analytics/event-types.md]`.
The 10-funnel cardinality is *"on a daily basis"* and an over-limit event *"will succeed but
those that exceed the limit will be dropped and will not be shown"*
`[research: https://devforum.roblox.com/t/clarification-on-funnel-analytics-limits/3084051]`.
**Two consequences my sheets must respect:** *"Events can only be sent from the server and in
published games"*, and *"Events are aggregated daily so it may take up to 24 hours for charts
to populate"*
`[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/production/analytics/custom-events.md]`.
The rate limit is the one that interacts with this game's shape: at the requested 25 Hz
clearing tick, per-patch emission is impossible inside `120 + 20·CCU` — that is a constraint on
event-catalog work, relayed rather than decided here, and it is why every instrument I assign
is once per player per session.

**Ownership is readable and a purchase is not.** *"Currently Roblox will cache the results of
`UserOwnsGamePassAsync`"*
`[research: https://devforum.roblox.com/t/do-not-cache-results-of-userownsgamepassasync/3639404]`,
which corroborates `cid/_state.md` build note 4 from the platform side. I could **not** get a
first-party statement that a pass bought on the experience page raises no server-side event:
`create.roblox.com/docs/reference/engine/classes/MarketplaceService` documents
`PromptGamePassPurchaseFinished(player, gamePassId, wasPurchased)` and states **no** triggering
condition, so *"an experience-page purchase fires no in-game event"* is `[unverified]` as a
first-party claim, and the exact propagation delay of an external purchase into the cache is
likewise `[unverified]`. **The specific fetch that would settle both:** the
`MarketplaceService.yaml` source in `github.com/Roblox/creator-docs` for the event's
description field, or a staff reply on the DevForum stating the trigger. It does not change
`03`'s ruling — the game calls no prompt at all under F13, so no prompt event can fire
regardless — but the sheet must carry the tag rather than assert the mechanism.

**Repo evidence my sheets rest on, read rather than fetched:**

- Seven channels and no more, the client surface closed at `RequestState` and `BuyUpgrade` and
  checked at load; a failed purchase produces no packet at all, which is why `UpgradeApplied`
  exists `[research: repo — game/src/shared/Protocol.luau:55-157]`
- The arming gate is live and is a clean server-side observable: `arm.armed` flips on the tick
  horizontal XZ displacement from the spawn pivot first exceeds `armDistanceStuds`, and no
  clear, award or packet happens before it
  `[research: repo — game/src/server/Clearing.luau:321-371]`
- `PlayerState` and `StoredState` carry no timestamp, no session id and no run ordinal
  `[research: repo — game/src/shared/Types.luau:17-64]`; `Persistence.load` returns
  `(state, readable)` where `readable` is true *"for a real save, or a first-time player"*
  `[research: repo — game/src/server/Persistence.luau:373-433]` — so run-1 detection is one
  boolean away and is unavailable to every caller today
- `rowsRevealed` is persisted per upgrade row and `found` per Find name, so the
  `firstSpendAffordable` lift and the first reveal are both already latched server-side
  `[research: repo — game/src/shared/Types.luau:35-43]`
- Ownership is resolved once per join into `state.owned`, never persisted, never on the wire,
  and every `gamePassId` is nil so *"every entry resolves to false with no web call at all"*
  `[research: repo — game/src/server/Entitlements.luau:32-37,154-180]`
- Zero analytics calls anywhere in the repo: grepped `AnalyticsService`,
  `LogFunnelStepEvent`, `LogOnboardingFunnelStepEvent`, `LogCustomEvent` across the tree, one
  hit and it is `cid/analytics/_category.md` `[research: repo — grep]`
