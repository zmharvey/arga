# KPI — domain index

**Category:** Analytics · **Wave:** 5 · Reads: `HANDOFF.md`, `CONCEPT.md`, `00-CORE.md`,
`01-FOUNDATION.md`, `02-GAMEPLAY.md`, `03-META.md`, `04-PRESENTATION.md`, `OPEN.md` (§2, §4, §5),
`cid/analytics/_category.md`, `cid/_contract.md`, `cid/_state.md`,
`cid/gameplay/_verified-wave4.md`, `cid/gameplay/balance/05-time-to-milestone.md`,
`cid/gameplay/onboarding/02-first-minute-beats.md`, `cid/gameplay/systems/05-the-find-ledger.md`,
`game/src/shared/Protocol.luau`, `game/src/server/Persistence.luau`, `docs/cid-workflow.json`
(`kpi-lead`, `analytics-verification.checks`).

**No `must_verify` is attached to this node in the graph.** I fetched anyway — see *Research owed*.
`npm run bridge -- --contract` was not runnable (no shell in this session); I read its committed
derivation, `cid/_contract.md`, instead, and state that rather than claiming the command.

---

## What the brief gave me

**On what a KPI is for here**

> *"This game exists to prove the `arga` pipeline works end to end."* … *"Success is **shipped
> artifacts, not players** — every creative area produced usable output, the sheets fed them
> without gaps, and a playable build with real UI came out the far end."* (`00-CORE.md`)
> `[brief: binding]` ← `[you chose: R1 Q3]`

> Non-goals: *"Beating the genre's retention curve. Offered and declined."* · *"Revenue. Offered
> and declined."* (`00-CORE.md`) `[brief: binding]` ← `[you chose: R1 Q3]`

> *"all three test assumptions this spec rests on rather than reporting vanity."*
> (`OPEN.md §2`, Measurement rationale) `[brief: soft]` ← `[I assumed — §2 default]`

That last line is the brief's own selection principle for measurement and it is the one this
domain is built on. It is `[brief: soft]`, so it is arguable — I am not overruling it, I am
taking it literally.

**On what may be measured**

> *"Three things: (1) did a first-session player reveal a relic, and how fast … (2) average time
> to complete an area — the pacing number nobody could source; (3) set-completion rate per set."*
> (`OPEN.md §2`) `[brief: soft]` ← `[I assumed — §2 default]`. Item (3) is partly obsolete:
> `systems/05` made placement a seeded partition, so set completion is deterministic given areas
> cleared.

> Session objective *"find at least one new relic"* → measurable *"collection count rose this
> session"* (`03-META.md`) `[brief: soft]` ← `[you accepted: R6 Q3 → R5 Q3]`. The brief wrote one
> measurable definition itself. It states no population and no pass mark for it.

> *"**Tuning burden:** discovery rates must be generous enough that a typical session yields at
> least one find, or the stated session objective silently fails. **This is the highest-risk
> tuning in the game**"* (`03-META.md`) — the brief names its own highest risk.

> *"**8–14, mobile-heavy, short sessions.**"* · *"10–20 minute active sessions"* (`00-CORE.md`)
> `[brief: binding]` ← `[you chose: R1 Q4]`.

> *"~70% mobile / ~25% desktop / ~5% console"* (`00-CORE.md`) `[brief: soft]` ← `[I assumed]`.

**On what may not be built or shown**

> Priority 3, *"explicitly not in this project"*: *"real procedural generation · rebirth · offline
> accrual · codes · daily rewards · **leaderboards** · trading · seasons and events"*
> (`03-META.md`). The ordering is `[I assumed]`; the cuts are not.

> *"Ships and settles. No seasons or events."* (`OPEN.md §2`) `[brief: soft]` ← `[I assumed]`.

> *"There is no failure state."* · *"Zero tension is deliberate."* (`02-GAMEPLAY.md`)
> `[brief: soft]` ← `[you accepted: step 6 Q2]`. No metric here may describe a loss.

> *"Shared server, parallel progression, own areas, **no mechanical interaction**."*
> (`02-GAMEPLAY.md`) `[brief: soft]` ← `[you accepted: R6 Q2]`.

**Approved upstream, binding on this domain:** `theme/tone/04`'s `X10` — *"Measure freely,
display none of it"*. Every surface this domain names is developer-facing by construction, and
this domain owes `vocabulary` no player-facing string.

**From the graph, and it is the bar this domain is checked against:**
`analytics-verification.checks` — *"every KPI has a target, an alarm value, and a stated owner
action."*

---

## What the brief did not give me

Named, not filled. Each routes to the sheet that must decide it.

1. **No pass mark exists for any number in this game.** Not one sheet across four waves states
   "we ship if X ≥ Y"; every figure is a prediction with a test range and no verdict rule. The
   brief states no target for anything. → **02**, as the `verdictRule` field and as every row's
   `alarm`. `[cid: decided]` for all of it.

2. **The brief declines retention and revenue as goals while this category is named for them,
   and it declares success in artifacts while this domain reports on players.** That is not a
   contradiction to resolve silently, and it is not resolvable by a domain that only lists
   numbers. → **01**, which must state the reconciliation as an admission rule the shortlist is
   then checked against.

3. **Nobody is named as an actor, anywhere.** The brief names no team, no role and no cadence.
   `_state.md` records that *"the developer declined to arbitrate"* on the wave-2 rulings, and
   `OPEN.md §4` deliberately routes open work **by kind of work** rather than by department. →
   **02**: every row's actor is a *kind of work* with a bracketed current-holder note, per that
   same convention. `[cid: decided]`.

4. **The one empirical reading in existence is recorded in no artifact.** 2026-08-01, developer,
   n = 1: area 1's clear time matched the estimate, the first find arrived quickly, shard values
   felt right, the area transition read well, the purchase buttons rendered in the wrong place.
   Four of five are confirmations-by-feel of predicted quantities and **none was timed**. It
   appears in no `cid/` sheet, no `docs/` file and no `_state.md` section. → **02** records it as
   the baseline it is (`baselineEvidence`, `n: 1`, `timed: false`) and must not treat it as a
   measurement. The structural gap — *the pipeline has no artifact type for an empirical reading*
   — is **not mine to close**; it routes to run-state work [currently `cid/_state.md`'s holder].

5. **Nothing in the shipped game is instrumented.** Grepped `game/src/` for `AnalyticsService`,
   `LogService`, `Analytics`, `FireCustomEvent`: **zero matches across all 29 modules.** Every
   observation point in the game is a place a call could go. → **02** marks each row
   `readableToday` true or false; the requirement for the ones that are false is Event Logging's
   to state and Tech & Data's to own, not mine to design.

6. **The `~70% mobile` split is a prediction with no source** and `_state.md` records it as
   uncorroborated by anything wave 2 fetched. The platform dashboard supplies a Platform
   breakdown for free `[research: create.roblox.com/docs/production/analytics/analytics-dashboard]`,
   so it is checkable — but it is a *dimension*, not a headline number. → **02** declines it as a
   row and names it in `declined[]` with that reason; it belongs to whoever defines breakdowns.

7. **`OPEN.md §2` measurement item (3) is obsolete and the brief cannot know it.** → **02**
   states what replaces it in the shortlist, or states that nothing does. Not re-invented here.

---

## Why 2 sheets

**One key, one sheet, plus one rule sheet — and the rule sheet is the reason this domain is worth
running at all.** `cid/_contract.md` holds 25 keys and none of them is mine, so by the contract
anchor I own exactly one proposed key, `kpis`, and it gets exactly one sheet carrying one
`manifest` block. Everything my node lists — the shortlist, targets, alarms, cadence, layout, who
acts — is one coherent value with sub-objects, not five values; splitting it would put two sheets
on one key, which the merger rejects after both are written.

The second sheet exists because of the specific way this domain can fail. The default output here
is a generic Roblox dashboard: DAU, ARPDAU, D7, payer share. Against *this* game most of those
are **structurally constant** — every `gamePassId` is `null`, so `entitlements` resolves every
product to not-owned and payer share and ARPDAU read zero whatever players do — and the rest
optimise a goal `00-CORE.md` explicitly declined. A shortlist that reads zero forever tells nobody
anything, and a reviewer cannot tell a disciplined refusal from an omission unless the refusal is
written as a **rule** that the shortlist is then checked against. Sheet `01` is that rule; sheet
`02` is checked against it. That is a prohibition shaping a key I own, which is the one case the
second kind of sheet is for. Three sheets would mean splitting the value; one sheet would mean the
selection argument lives inside the thing it selects, where nothing can test it.

| # | sheet | must decide |
|---|---|---|
| 01 | `kpi-admission-rule` | The closed, numbered test a candidate number must pass before it may be a headline KPI in this project — including the explicit reconciliation of `00-CORE.md`'s *"success is shipped artifacts, not players"* with a domain that reports on players, and of the declined retention and revenue goals with the fact that both may be measured and neither may be optimised — stated so a reviewer can check the shortlist against it row by row rather than against taste; carries no `manifest` block and must say in one line that it supplies no key because it constrains which rows `kpis` may hold rather than being them. |
| 02 | `the-shortlist` | The headline KPI set and everything that makes a row actionable, published as the `kpis` manifest: seven rows or fewer, each naming the one stated design prediction it can refute, its source kind (platform dashboard / custom event / onboarding funnel / persisted save state / pipeline gate), a target expressed as a **pointer into a merged manifest field** rather than a copied number, an alarm condition, whether it is readable today, and the *kind of work* that acts plus what that work does; a two-family split (`game` rows and `pipeline` rows) with a review cadence for each; where each row is read, against the sourced platform capacity limits; a `verdictRule` saying what a pass or a fail means in a project whose stated success is artifacts; a `declined[]` list of the standard KPIs deliberately not adopted, each with its reason; and the 2026-08-01 n=1 playtest recorded as `baselineEvidence` with `timed: false`. |

### The candidate shortlist sheet 02 must confirm or reject

**Named here, not decided here.** These are the rows I admitted while enumerating; sheet `02`
tests each against sheet `01`'s rule, sets every target and alarm, and may drop or add. Targets
are shown as the field they point at, because **wave 4 is FAIL and has not released** — RR-9 and
RR-10 both move fields in this list, and a pointer moves with them where a copied number would go
stale silently.

| candidate | the prediction it refutes | target points at | source kind |
|---|---|---|---|
| `sessionSeconds` (median) | the brief's own *"10–20 minute active sessions"* `[brief: binding]`, and `pacing.sessionBandSeconds`, which is the divisor every wall-clock prediction was derived from | `pacing.sessionBandSeconds` | platform dashboard, zero instrumentation |
| `lapRealisedSeconds` (median, by area ordinal) | `OPEN.md §2` item (2), *"the pacing number nobody could source"*; `pacing.laps[].realisedLapSeconds` and hence `lapTargetSeconds` and `routeSlack` | `pacing.laps[].realisedLapSeconds` inside `[pacing.lapFloorSeconds, pacing.lapCeilingSeconds]` | custom event, **not readable today** |
| `secondsToFirstReveal` | `OPEN.md §2` item (1), the ten-second onboarding promise | `firstSession.ceilings.secondsToFirstReveal`, at that field's own stated population | onboarding funnel |
| `sessionYieldsAFind` | the brief's **self-named highest risk** (`03-META.md`) and its own measurable, *"collection count rose this session"*; `pacing.oneFindPerSessionRisk.reopensIf` | `pacing.oneFindPerSessionRisk` | custom event or save-state diff |
| `heldBalanceAtSessionEnd` (median) | `solvency`'s ×3.26 ladder ratio and the prediction that currency does not accumulate before ladder exhaustion; `GameConfig.Economy.balanceCap` is `nil`, so nothing caps it | `solvency` ladder total vs cumulative income | persisted save state, zero instrumentation |
| `duplicateRevealCount` | ruling R-2's live risk. **This is a correctness invariant, not a rate** — `systems/05` states the repeat branch is *"a defect path"* that *"no player can reach"*, so the honest form is target 0 / alarm ≥ 1, not a band | `discovery.repeat` | one counter |
| `pipelineOutputIsBuildable` | **`00-CORE.md`'s own success claim.** Measurable from the repo with no game and no players: gates COMPLETE, keys supplied vs proposed, sheets carrying a data form, and whether a wave released on a PARTIAL — which `cid/_state.md` states is *"a wave that will be rebuilt"* | `bridge` / `cid:verify` / `npm test` outputs | pipeline gate |

**Deliberately considered and not admitted**, with the reason, so a reviewer reads the absence as
a decision:

- **DAU · ARPDAU · payer share · revenue per session.** Structurally constant: every `gamePassId`
  is `null`, `UserOwnsGamePassAsync` cannot return true, and `products.storeExists` is `false`
  under ruling R-4. They read zero regardless of play, so they falsify nothing. Economy Health
  specs the *reading* and marks it dormant against `products.externalPrerequisite`; it is not a
  headline number while it cannot move.
- **D1 / D7 / D30 as targets.** *"Beating the genre's retention curve. Offered and declined"*
  `[brief: binding]`. They arrive from the platform's Retention page for free
  `[research: create.roblox.com/docs/production/analytics/analytics-dashboard]` and may be
  *recorded*; a target would make a declined goal into an objective. The external evidence also
  makes them redundant here: retention rises with session length across every tier
  `[research: https://investgame.net/news/pdf/the-2025-roblox-benchmark-report/]`, and session
  length is already row 1.
- **Time to first purchase.** It is the live inter-sheet contradiction (`_verified-wave4.md`
  RR-10: `pacing.milestones[firstPurchase]` against
  `firstSession.beats[firstSpendAffordable].testRange`) and it is being settled in Balance, not by
  a live reading. It is a funnel step over ordered beats — Funnels' subject, and that domain's
  argument for existing. Routed there, not headlined here.
- **Above-tick payoff gap.** `_verified-wave4.md` finding 5 already establishes that the published
  `pacing.aboveTickGapRealisedSeconds` *"is a mean presented as a maximum"* with a real worst case
  near 99.7 s against a 90 s ceiling. That is an arithmetic defect, already found and recorded; a
  KPI is for what cannot be known without playing. The timestamped stream that would settle it is
  Event Logging's instrument.
- **Set-completion rate per set** (`OPEN.md §2` item 3). Obsolete: deterministic given areas
  cleared, per `systems/05`'s seeded partition. Subsumed by `lapRealisedSeconds`.
- **Terminal-state reach rate.** `meta/07`'s open question, against DIG's cited 0.4%. Ruling R-3
  declined expanding the game on exactly this argument, so the number has **no action** and fails
  the admission rule. What survives is *time to* `pacing.milestones[collectionComplete]`, which is
  a pacing claim and is covered by `lapRealisedSeconds`.
- **Device split.** A breakdown, not a headline number. See gap 6.
- **Anything comparative between players.** Leaderboards are priority 3 and `X10` closes the
  surface anyway. Naming it to forbid it.

---

## Contract key

**My subject maps to no key in `cid/_contract.md`.** All 25 are owned; wave 4 proposes `tierMix`,
`solvency`, `axisBudget`, `pacing`; my four wave-5 siblings propose `telemetry`, `funnels`,
`engagement`, `economyHealth`. `kpis` collides with none of them.

**`kpis` — what it would hold.** The headline rows and the machinery that makes each one
actionable: `rows[]` (`id`, `family`, `predictionRefuted`, `sourceKind`, `targetRef`,
`targetTolerance`, `alarm`, `actorKindOfWork`, `action`, `readableToday`, `status`), `cadence` per
family, `dashboard` (which existing surface holds each row, against the platform's capacity),
`verdictRule`, `declined[]`, `baselineEvidence`.

**A finding for whoever maintains the schema, stated because it is the useful half.** `targetRef`
is a *pointer into another key's field*, not a scalar. Nothing in `bridge/schema.mjs` currently
expresses a cross-key reference, and this key is unusable without one: wave 4 is FAIL, RR-9 and
RR-10 move the exact fields three of my rows point at, and a copied number would go stale with no
check firing. A resolvable-reference check would be the first thing `kpis` needs and would
generalise — `pacing` already cites `firstSession` and `solvency` fields in prose for the same
reason.

**A second finding, offered not taken.** The `pipeline` family has a different population (the
repo, not players), a different cadence (per wave, not per day) and a different consumer (`bridge`
and `cid:verify` can actually assert it, where no build step reads the game rows). It splits
cleanly into a second key, `pipelineHealth`, if the schema maintainer prefers that to a
discriminator field. I am proposing **one** key with a `family` field rather than two, because
guessing at a split the maintainer has not asked for is the more expensive error.

---

## Which of my node's `owns` I decline, and why

Stated as data, per the dispatch, rather than skipped.

- **`dashboard layout` — declined as a design artifact, kept as a placement column.** I decline to
  design a dashboard. The surface already exists and is not ours to lay out: the creator
  dashboard's Retention, Engagement, Acquisition, Demographics, Monetization, Overview and
  **Explore** pages, with breakdowns by platform, age group, OS, gender, source, country, language
  and first-played date
  `[research: create.roblox.com/docs/production/analytics/analytics-dashboard]`. Specifying a
  bespoke layout would spec a tool nobody in this pipeline builds. What sheet `02` supplies
  instead is, per row, **which existing surface holds it**, plus the capacity budget — and the
  budget is real and sourced: **up to 100 custom events per experience**, server-side only, in
  published places `[research: create.roblox.com/docs/production/analytics/custom-events]`, and
  **dashboard tabs for up to ten funnels**
  `[research: create.roblox.com/docs/production/analytics/funnel-events]`. Those two ceilings are
  shared with Event Logging and Funnels and are the only layout constraint worth writing down.
- **`review cadence` — kept, but it is a bounded window and not a standing ritual.** *"Ships and
  settles. No seasons or events"* `[brief: soft]`, so there is no live-ops loop to feed and no
  weekly meeting to hold. The floor is sourced, not chosen: custom events *"are aggregated daily
  so it may take up to 24 hours for charts to populate"*
  `[research: create.roblox.com/docs/production/analytics/custom-events]`, so no game row can be
  reviewed faster than daily whatever cadence anyone would like. Sheet `02` sets the window and
  its end.
- **`who acts on what` — kept, and there is one actor.** Named as a *kind of work* with a
  bracketed current holder, per `OPEN.md §4`'s own convention, because the lineup changes and the
  work does not. Inventing a team would be the failure mode here.
- **Nothing else is declined.** The shortlist, and target and alarm per KPI, are the substance of
  the domain and are fully in scope.

**And the honest total:** this domain produces no player-facing string, no asset and no value any
build module reads. `kpis` is read by a human, and — for the `pipeline` family only — potentially
by the pipeline's own gates. That is stated so a later reader does not look for a build hook that
was never supposed to exist.

---

## Verification note

**Sheet `02` is the one that gets contradicted, and by three different parties.**

1. **Balance, mechanically and soon.** Wave 4 is **FAIL**; RR-9 restates
   `pacing`'s session/lap acceptance criterion over `laps[].cumulativeSeconds`, and RR-10 moves
   `firstPurchase` or `firstSession.beats[firstSpendAffordable].testRange`. Three candidate rows
   point into `pacing` and one into `firstSession`. The pointer form is the mitigation and it is
   why sheet `02` must not copy a figure; if a revision lands, the row's target follows and the
   sheet does not need re-writing.
2. **Funnels, over the same number.** `secondsToFirstReveal` is my headline row and their funnel
   step. The boundary sheet `02` must state in one line: **I select the quantity and set the
   headline target and alarm; the step definitions, the populations and the per-step pass marks
   are Funnels'.** If both sheets publish a pass mark for that quantity, two keys carry two
   answers for one number — the exact defect `_verified-wave4.md` check 6 caught three times.
3. **Event Logging, on feasibility.** `lapRealisedSeconds` and `sessionYieldsAFind` need a
   timestamped stream that the shipped seven-channel surface does not produce. `Protocol.luau`
   states *"Exactly seven channels, and no more"* and asserts the client-originated set against
   `GameConfig.Input.clientOriginatedRemotes` at load. If Event Logging concludes a quantity
   cannot be emitted, my row's `readableToday` is already false and the row survives as a stated
   requirement — but its target becomes untestable, and sheet `02` should say which rows die in
   that case rather than leaving it to be discovered.

**The one that will not be contradicted, and that is the point:** `pipelineOutputIsBuildable`
needs no player, no event, no `gamePassId` and no publish. It is readable from this repo today.
If the shortlist's other six rows all sit at `readableToday: false` for the life of this project,
that row is still the honest answer to *"is the thing this project measures its success by
actually true?"* — and it is the only row in the category that can return a verdict on
`00-CORE.md` rather than on the game.

---

## Research owed

**The graph attaches no `must_verify` to `kpi-lead`.** I fetched anyway, because whatever I do not
bank here my writer cannot obtain — it has no fetch tools.

**Fetched and usable:**

- Custom-event capacity and latency — *"up to 100 custom events to your game"*; server-side only,
  published places only; *"Events are aggregated daily so it may take up to 24 hours for charts to
  populate"*; charted on Explore with seven aggregations (count, unique user count, avg/sum/min/max
  value, avg value per user) and breakdowns by custom field.
  `[research: https://create.roblox.com/docs/production/analytics/custom-events]`
- Funnel capacity — `LogOnboardingFunnelStepEvent()` for one-time funnels and
  `LogFunnelStepEvent()` for recurring; *"You can add tabs to the dashboard for up to ten
  funnels."* `[research: https://create.roblox.com/docs/production/analytics/funnel-events]`
- Dashboard pages and breakdowns, and the fact that Retention/Engagement/Demographics/Monetization
  arrive with no instrumentation; breakdowns include platform, age group, OS, gender, source,
  country, language, first-played date; *"Benchmarks for similar games update daily."*
  `[research: https://create.roblox.com/docs/production/analytics/analytics-dashboard]`
- *"New User First Session Retention"* — *"how many new users are still playing X minutes after
  joining your game for the first time"*, and *"Average session time"* = *"total time users spend
  in your game divided by the number of sessions"*.
  `[research: https://create.roblox.com/docs/production/analytics/engagement]`
- Genre and *"similar experience"* benchmark sets are selectable on Experience Overview.
  `[research: https://devforum.roblox.com/t/analytics-view-retention-by-acquisition-source-and-select-your-benchmark-set/4010157]`
- Open Cloud can list the entries of a standard data store —
  `universes/{universe}/data-stores/{dataStore}/entries`, scope
  `universe-datastores.objects:list`, paginated with `maxPageSize` / `pageToken`.
  `[research: https://create.roblox.com/docs/cloud/guides/data-stores]` **This is why two candidate
  rows need no event at all**: `currency`, `found`, `areasFinished`, `upgrades`, `cleared`,
  `clearedCount` and `rowsRevealed` are the seven persisted fields
  (`game/src/server/Persistence.luau`), so held balance and collection state are readable from
  outside the game with no code change.
- **A research-owed item another domain flagged, now closed enough to cite.**
  `balance/_lead` carries `[research owed: the 2025 Roblox Benchmark Report's session-length
  interval table]` and says *"nothing here cites it."* The report bands sessions at 0–3, 4–6,
  7–12, 13–18, 19–24 and 25+ minutes, with D1 medians rising across those tiers (~4% at 0–3, ~8%
  at 7–12, ~10% at 13–18, double digits at 19–24).
  `[research: https://investgame.net/news/pdf/the-2025-roblox-benchmark-report/]` The brief's
  10–20 minute band and `pacing`'s 1,094 s whole-game figure both sit in the 13–18/19–24 tiers.
  **Caveat, stated rather than hidden:** the page I reached is a report summary, not the primary
  dataset, so this licenses a *band comparison* and not a target. It does not license a retention
  target at all, because that goal is declined.

**Not obtained, and the fetch that would settle each:**

- **A complete, definitional list of dashboard metric names.** `analytics/engagement` does not
  enumerate them; it teaches strategy. `[unverified]` — settled by an authenticated screenshot or
  export of a live Creator Dashboard Engagement page, which needs an account this pipeline does
  not have.
- **Benchmark percentiles per metric.** The announcement describes peer-group comparison without
  publishing thresholds. `[unverified]` — settled by the same authenticated dashboard view.
- **Whether `AnalyticsService` custom events are permitted for an under-13 audience without
  additional consent**, which `analytics-verification` checks directly. **Not mine** — the
  category brief routes it to Event Logging as a sourced research obligation, and it should not be
  answered twice. Flagged here only so a reviewer does not read its absence from my sheets as an
  omission.
- **`npm run bridge -- --contract` and `npm run cid:verify` output.** No shell in this session; I
  read `cid/_contract.md`, which is that command's committed derivation, and `cid/_state.md` for
  the gate results. Sheet `02`'s `pipelineOutputIsBuildable` row depends on those commands' output
  shape, and the writer must express its target against the fields those commands print rather
  than against figures quoted in `_state.md`.
