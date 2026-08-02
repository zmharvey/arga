# 02 — The shortlist

**Domain:** analytics/kpis · **Category:** Analytics · **Wave:** 5

## Decision

**Seven headline rows, six about the game and one about the repo, published as the proposed key
`kpis`.** Every target is a pointer into a manifest field rather than a copied number, every
alarm is pointer-relative or `[playtest unknown]` with a range, every row names a kind of work
that acts, and **a breached game row produces a revision request against a named sheet and
field — never a tuning change, because the game ships and settles.**

| # | row | family | target points at | alarm | actor [current holder] |
|---|---|---|---|---|---|
| 1 | `sessionSeconds` (P50) | game | `pacing.sessionBandSeconds` | P50 outside that band | wall-clock and pacing work [the developer] |
| 2 | `lapRealisedSeconds` (P50 by ordinal) | game | `pacing.laps[k].realisedLapSeconds`, inside `[pacing.lapFloorSeconds, pacing.lapCeilingSeconds]` | any ordinal outside the floor/ceiling band, or outside `targetTolerance` of its published lap | area-sizing and pacing work [the developer] |
| 3 | `secondsToFirstReveal` (P90 and P50) | game | `firstSession.ceilings.secondsToFirstReveal.max` | P50 above the ceiling | onboarding-beat work [the developer] |
| 4 | `sessionYieldsAFind` (share) | game | `pacing.oneFindPerSessionRisk.floorSessionFinds` | share below 1.0 over `minimumSessions` | content-structure work [the developer] |
| 5 | `heldBalanceAtSessionEnd` (P50) | game | `solvency.areaLedger[k].cumulativeSpend` vs `cumulativeIncome` | P50 at or above the cheapest unbought rung, two ordinals running | cost-curve work [the developer] |
| 6 | `duplicateRevealCount` | game | `discovery.repeat.possible` (`false`) | count ≥ 1 | find-placement and area-layout work [the developer] |
| 7 | `pipelineOutputIsBuildable` | pipeline | `bridge` / `cid:verify` / `npm test` output | any assertion fails, or a wave advances on a PARTIAL | pipeline-and-seam work [the developer] |

## Why

**Each row is the smallest reading that refutes one written claim, and rows 2 to 5 refute
claims nothing has ever checked.** `OPEN.md §2`'s rationale is *"all three test assumptions
this spec rests on rather than reporting vanity"* `[brief: soft]` ←
`[I assumed — §2 default]`, and these are the assumptions.

**Row 4 is the brief's own self-named highest risk** — *"discovery rates must be generous
enough that a typical session yields at least one find, or the stated session objective
silently fails. This is the highest-risk tuning in the game"* (`03-META.md`) — read against the
brief's own measurable, *"collection count rose this session"* `[brief: soft]` ←
`[you accepted: R6 Q3 → R5 Q3]`. `pacing.oneFindPerSessionRisk.reopensIf` states the two
conditions that break it, which is a falsifiable claim with no instrument.

**Row 5 is not about currency; it is about the greedy buyer.** Every `arrivalLevels` row in
`solvency.areaLedger[]` assumes the player spends what they earn as soon as they can. If the
median player sits on a balance above the cheapest rung they have not bought, that assumption
is wrong — and every arrival throughput, every footprint sized from it and every lap derived
from those is wrong with it. `[cid: decided]` — no sheet states the greedy-buyer assumption as
a claim; it is implied by the ledger, which is why nothing else catches it.

**Row 6 is a zero-invariant, not a rate.** `discovery.repeat.possible` is `false` and
`systems/05` calls the branch *"a build defect and not a game state"*; the shipped guard at
`Clearing.luau:288` warns and fires nothing `[research: game/src/server/Clearing.luau]`. Target
0, alarm 1, and **neither figure is chosen** — both are read off the key, so economy-flow work
may not publish a chosen number for the same counter either.

**Row 7 is the only row that returns a verdict on `00-CORE.md`**, and it needs no player, no
event, no publish and no `gamePassId`. If the other six sit at `readableToday: false` for the
life of this project, row 7 is still the honest answer to *is the thing this project measures
its success by actually true?*

**Four rows are unreadable today and I am not softening that.** Grepped `game/src/` for
`AnalyticsService` and `LogService`: zero calls in 29 modules. `Types.luau`'s `StoredState`
carries seven fields and no timestamp, no session id and no run ordinal
`[research: game/src/shared/Types.luau]`, so no join-relative second is formable. Rows 1 and 5
need nothing built: session time comes from the Engagement page at a P50 aggregation
`[research: https://create.roblox.com/docs/production/analytics/engagement]` and the persisted
fields are listable through Open Cloud
`[research: https://create.roblox.com/docs/cloud/guides/data-stores]`.

**Cadence is a bounded post-publish window and its floor is sourced.** Custom events *"are
aggregated daily so it may take up to 24 hours for charts to populate"*
`[research: https://create.roblox.com/docs/production/analytics/custom-events]`, so no game row
reviews faster than daily whatever anyone prefers; *"Ships and settles. No seasons or events"*
`[brief: soft]` ← `[I assumed]` means there is no loop for a standing review to feed, so the
window closes. The `pipeline` family runs per wave at the gate `cid/_state.md` already defines.

**Dashboard layout is declined as a design artifact and kept as a per-row placement column.**
The Creator Dashboard's pages exist and are not ours to lay out
`[research: https://create.roblox.com/docs/production/analytics/analytics-dashboard]`;
specifying a bespoke one would spec a tool nobody in this pipeline builds. Each row instead
names which existing surface holds it, against the sourced capacity — 100 custom event names,
server-side only, published places only, ten funnel dashboard tabs
`[research: https://create.roblox.com/docs/production/analytics/funnel-events]`. These seven
rows consume three event names and one tab.

**Every target is a pointer because wave 4 is FAIL and has not released.**
`cid/gameplay/_verified-wave4.md` carries sixteen requests; RR-9 and RR-10 move fields rows 1
to 5 point at, so a transcribed number would already be wrong.

```manifest
{
  "provides": "kpis",
  "status": "proposed",
  "value": {
    "purpose": "the small set of numbers carrying a project-level target, an alarm and an actor. Every row passes K1-K8 of cid/analytics/kpis/01-kpi-admission-rule.md.",
    "admissionRule": "cid/analytics/kpis/01-kpi-admission-rule.md",
    "families": ["game", "pipeline"],
    "minimumSessions": {
      "value": 30,
      "status": "playtest unknown",
      "testRange": [20, 100],
      "appliesTo": "family game",
      "rule": "no game row returns a verdict below this count of qualifying sessions. Where a row's source is the onboarding funnel, the larger of this and the funnels key's own minimum governs; neither key may publish a second answer for one instrument."
    },
    "platformCapacity": {
      "customEventNameCap": 100,
      "customEventNamesUsedByTheseRows": 3,
      "funnelDashboardTabCap": 10,
      "funnelTabsUsedByTheseRows": 1,
      "emissionSide": "server only, published places only",
      "aggregationLatencyHours": 24,
      "sources": [
        "https://create.roblox.com/docs/production/analytics/custom-events",
        "https://create.roblox.com/docs/production/analytics/funnel-events"
      ]
    },
    "cadence": {
      "game": {
        "floor": "daily",
        "floorReason": "custom events are aggregated daily and charts may take up to 24 hours to populate, so daily is a platform floor and not a preference",
        "floorSource": "https://create.roblox.com/docs/production/analytics/custom-events",
        "shape": "a bounded post-publish window, not a standing ritual",
        "opensAt": "the first published session",
        "windowDays": { "value": 14, "status": "playtest unknown", "testRange": [7, 30] },
        "closesAt": "the later of (publish + windowDays) and the day every readable game row has reached minimumSessions",
        "afterClose": "no standing review. A closed row is read again only when a revision request names it, or when a change lands in a key its targetRef points at.",
        "reason": "OPEN.md section 2: 'Ships and settles. No seasons or events.' There is no live-ops loop to feed."
      },
      "pipeline": {
        "floor": "per wave",
        "shape": "run at the wave gate, before the next wave starts",
        "latencyHours": 0,
        "requiresPublish": false,
        "reason": "cid/_state.md already gates a wave on these commands; this row is that gate read as a number rather than as a checklist."
      }
    },
    "rows": [
      {
        "id": "sessionSeconds",
        "family": "game",
        "statistic": "P50 session duration, in seconds",
        "population": "all sessions in the review window",
        "predictionRefuted": {
          "sheet": "cid/gameplay/balance/05-time-to-milestone.md",
          "path": "pacing.sessionBandSeconds",
          "claim": "10-20 minute active sessions; the divisor every wall-clock prediction in pacing was derived from"
        },
        "sourceKind": "platformDashboard",
        "targetRef": {
          "kind": "manifestField",
          "path": "pacing.sessionBandSeconds",
          "rule": "P50 sits inside [pacing.sessionBandSeconds[0], pacing.sessionBandSeconds[1]]"
        },
        "targetTolerance": null,
        "alarm": {
          "basis": "pointer",
          "condition": "P50 < pacing.sessionBandSeconds[0] or P50 > pacing.sessionBandSeconds[1]"
        },
        "actorKindOfWork": "wall-clock and pacing work",
        "currentHolder": "the developer",
        "action": "revision request against cid/gameplay/balance/05-time-to-milestone.md, fields pacing.sessionBandSeconds and pacing.completeLapsPerSession, which is derived from it. Never a design change to lengthen sessions: retention is a declined goal.",
        "readableToday": true,
        "blockedBy": null,
        "placement": "Creator Dashboard > Engagement > average session time, chart aggregation set to P50",
        "placementSources": [
          "https://create.roblox.com/docs/production/analytics/engagement",
          "https://create.roblox.com/docs/production/analytics/analytics-dashboard"
        ],
        "context": "the 2025 Roblox Benchmark Report bands experiences by average session length and the brief's 10-20 minute band straddles two populated buckets. This licenses a band comparison, never a target.",
        "contextSource": "https://investgame.net/news/pdf/the-2025-roblox-benchmark-report/"
      },
      {
        "id": "lapRealisedSeconds",
        "family": "game",
        "statistic": "P50 wall clock from entering an area to clearing its last patch, per area ordinal",
        "population": "single-sitting laps only, at the population lapClock defines; laps spanning a session boundary are excluded and counted separately",
        "predictionRefuted": {
          "sheet": "cid/gameplay/balance/05-time-to-milestone.md",
          "path": "pacing.laps[*].realisedLapSeconds",
          "claim": "OPEN.md section 2 item 2, 'average time to complete an area - the pacing number nobody could source'. Nine published realised laps, all playtest unknown."
        },
        "sourceKind": "customEvent",
        "targetRef": {
          "kind": "manifestField",
          "path": "pacing.laps[*].realisedLapSeconds",
          "rule": "each ordinal's P50 sits within targetTolerance of its published realisedLapSeconds, and inside [pacing.lapFloorSeconds, pacing.lapCeilingSeconds] unconditionally",
          "alsoReads": ["pacing.lapFloorSeconds", "pacing.lapCeilingSeconds"]
        },
        "targetTolerance": { "relative": 0.35, "status": "playtest unknown", "testRange": [0.20, 0.50] },
        "alarm": {
          "basis": "pointer",
          "condition": "any ordinal's P50 falls outside [pacing.lapFloorSeconds, pacing.lapCeilingSeconds]"
        },
        "secondaryAlarm": {
          "basis": "tolerance",
          "condition": "any ordinal's P50 differs from its published realisedLapSeconds by more than targetTolerance.relative"
        },
        "actorKindOfWork": "area-sizing and pacing work",
        "currentHolder": "the developer",
        "action": "revision request against cid/gameplay/balance/05-time-to-milestone.md (pacing.lapTargetSeconds, pacing.routeSlack) and cid/gameplay/meta/04-the-depth-ladder.md (depths.areas[k].footprintStuds2), naming the ordinals that breached.",
        "readableToday": false,
        "blockedBy": "the lap clock does not exist. Two instants per area per player must be knowable at a server decision; lapClock states the requirement and telemetry owns the emission. Nothing in game/src calls any analytics service.",
        "placement": "Creator Dashboard > Explore, custom event chart, average-value aggregation, broken down by the area-ordinal custom field"
      },
      {
        "id": "secondsToFirstReveal",
        "family": "game",
        "statistic": "two statistics of one quantity: P90 and P50 of seconds from join to the first FindRevealed",
        "population": "inherited verbatim from firstSession.ceilings.secondsToFirstReveal.population; origin inherited from .measuredFrom",
        "predictionRefuted": {
          "sheet": "cid/gameplay/onboarding/02-first-minute-beats.md",
          "path": "firstSession.ceilings.secondsToFirstReveal.max",
          "claim": "OPEN.md section 2 item 1 and 02-GAMEPLAY.md's 'clear to reveal inside the first ten seconds'"
        },
        "sourceKind": "onboardingFunnel",
        "targetRef": {
          "kind": "manifestField",
          "path": "firstSession.ceilings.secondsToFirstReveal.max",
          "rule": "P90 at or below the ceiling",
          "alsoReads": ["firstSession.ceilings.secondsToFirstReveal.population", "firstSession.ceilings.secondsToFirstReveal.measuredFrom"]
        },
        "targetTolerance": null,
        "alarm": {
          "basis": "pointer",
          "condition": "P50 > firstSession.ceilings.secondsToFirstReveal.max - the median player misses the ten-second promise"
        },
        "boundaryWithFunnels": "this row publishes exactly two distributional statistics of one quantity and no conversion rate, no step ordinal and no per-step pass mark. Those are the funnels key's. If funnels publishes a pass mark on P90 or P50 of this same quantity, one number has two answers and one of them must be withdrawn.",
        "actorKindOfWork": "onboarding-beat work",
        "currentHolder": "the developer",
        "action": "revision request against cid/gameplay/onboarding/02-first-minute-beats.md (firstSession.ceilings.secondsToFirstReveal.max, firstSession.armDistanceStuds) or cid/gameplay/meta/05-area-layout.md (spawn adjacency), naming which.",
        "readableToday": false,
        "blockedBy": "no join instant, session id or run ordinal exists in Types.luau's StoredState or PlayerState, so no join-relative second is formable and the run-1 population cannot be built from save state. State-shape work must add one; telemetry owns the funnel call.",
        "placement": "Creator Dashboard > funnel tab (1 of 10), with the elapsed second carried as a custom field on the step rather than as a second event name"
      },
      {
        "id": "sessionYieldsAFind",
        "family": "game",
        "statistic": "the share of qualifying sessions in which the player's found count rose",
        "population": "sessions of at least pacing.sessionBandSeconds[0] duration whose player held fewer than 24 Finds at session start",
        "predictionRefuted": {
          "sheet": "cid/gameplay/balance/05-time-to-milestone.md",
          "path": "pacing.oneFindPerSessionRisk",
          "claim": "03-META.md's self-named highest-risk tuning, and its own measurable 'collection count rose this session'. floorSessionFinds is published at 12 and reopensIf names the two conditions that would break it."
        },
        "sourceKind": "customEvent",
        "targetRef": {
          "kind": "manifestField",
          "path": "pacing.oneFindPerSessionRisk.floorSessionFinds",
          "rule": "floorSessionFinds >= 1 predicts a share of 1.0. The target is share == 1.0 and it moves only if floorSessionFinds falls below 1.",
          "alsoReads": ["pacing.oneFindPerSessionRisk.reopensIf", "collection.relicsPerArea"]
        },
        "targetTolerance": null,
        "alarm": {
          "basis": "pointer",
          "condition": "share < 1.0 over at least minimumSessions qualifying sessions"
        },
        "actorKindOfWork": "content-structure work",
        "currentHolder": "the developer",
        "action": "revision request against cid/gameplay/meta/04-the-depth-ladder.md (collection.relicsPerArea, collection.areasPerDepth) and cid/gameplay/meta/05-area-layout.md (find placement per chunk group). Never a discovery rate: systems/05 removed it and there is none to raise.",
        "readableToday": false,
        "blockedBy": "needs a session boundary and a found-count delta across it. The delta is derivable from the persisted found map through Open Cloud without any event; the session boundary is not, for the same reason as row 3.",
        "placement": "Creator Dashboard > Explore, custom event, unique-user-count aggregation; or an Open Cloud entry-list diff if the session boundary lands in state before the event does"
      },
      {
        "id": "heldBalanceAtSessionEnd",
        "family": "game",
        "statistic": "P50 of the persisted currency field at session end, grouped by the player's area ordinal",
        "population": "all sessions in the review window whose player has not exhausted the ladder",
        "predictionRefuted": {
          "sheet": "cid/gameplay/balance/03-ladder-solvency.md",
          "path": "solvency.areaLedger[*].arrivalLevels",
          "claim": "the greedy-buyer assumption: every arrival level, and therefore every arrival throughput, footprint and lap derived from it, assumes the player spends what they earn as soon as they can. The predicted residual at ordinal k is cumulativeIncome minus cumulativeSpend."
        },
        "sourceKind": "persistedSaveState",
        "targetRef": {
          "kind": "manifestField",
          "path": "solvency.areaLedger[*].cumulativeSpend",
          "rule": "P50 held balance at ordinal k sits below the cost of the cheapest rung the player has not bought, min over u of upgradeCost(upgrades[u], heldLevel[u])",
          "alsoReads": ["solvency.areaLedger[*].cumulativeIncome", "upgrades[*].costBase", "upgrades[*].costGrowth"]
        },
        "targetTolerance": null,
        "alarm": {
          "basis": "pointer",
          "condition": "P50 held balance is at or above the cheapest unbought rung's cost at two consecutive area ordinals"
        },
        "actorKindOfWork": "cost-curve work",
        "currentHolder": "the developer",
        "action": "revision request against cid/gameplay/balance/03-ladder-solvency.md, fields solvency.areaLedger[].arrivalLevels and the upgrades cost curve they are derived from. If the breach is a purchase-surface problem rather than a curve problem, it routes instead to purchase-surface work as a legibility finding.",
        "readableToday": true,
        "blockedBy": null,
        "placement": "no dashboard. Open Cloud standard-data-store entry listing, read outside the game: currency, found, areasFinished, upgrades, cleared, clearedCount and rowsRevealed are the seven persisted fields.",
        "placementSource": "https://create.roblox.com/docs/cloud/guides/data-stores"
      },
      {
        "id": "duplicateRevealCount",
        "family": "game",
        "statistic": "a count. Not a rate: there is no denominator, because the predicted value is exactly zero.",
        "population": "all clears, all players, for the life of the build",
        "predictionRefuted": {
          "sheet": "cid/gameplay/systems/05-the-find-ledger.md",
          "path": "discovery.repeat.possible",
          "claim": "false - the repeat branch is 'a build defect and not a game state', reachable only by a layout that assigns a name outside its area's slice. Ruling R-2 took relicsPerArea to 3 and areasPerDepth to 2, which retired the 'it is a no-op today' safety argument and made the partition draw load-bearing."
        },
        "sourceKind": "customEvent",
        "targetRef": {
          "kind": "manifestField",
          "path": "discovery.repeat.possible",
          "rule": "false implies a count of 0. Both the target and the alarm are read off this field; neither is chosen, and no sheet may publish a chosen number for either."
        },
        "targetTolerance": null,
        "alarm": { "basis": "pointer", "condition": "count >= 1, on any server, once" },
        "actorKindOfWork": "find-placement and area-layout work",
        "currentHolder": "the developer",
        "action": "revision request against cid/gameplay/meta/05-area-layout.md (layout's slice resolution), cid/gameplay/meta/04-the-depth-ladder.md (depths.relicSliceAssignment) and cid/gameplay/meta/02-the-collection.md (collection.relicsPerArea x areasPerDepth == set size). Never a balance change, never a duplicate sink and never a currency: 02-GAMEPLAY.md binds 'solve duplicates without adding a currency'.",
        "readableToday": false,
        "blockedBy": "game/src/server/Clearing.luau:288 warns to the server log and fires no channel. Protocol declares exactly seven channels and no more. The counter needs an emission that does not exist; economy-flow work states the requirement and telemetry owns the call site.",
        "placement": "Creator Dashboard > Explore, custom event, count aggregation. Any nonzero bar at all is the alarm."
      },
      {
        "id": "pipelineOutputIsBuildable",
        "family": "pipeline",
        "statistic": "a boolean per wave gate, over five assertions",
        "population": "the repository. No players, no publish, no gamePassId.",
        "predictionRefuted": {
          "sheet": "concept/spec/incremental-spinoff-v2/00-CORE.md",
          "path": null,
          "claim": "Success is shipped artifacts, not players - every creative area produced usable output, the sheets fed them without gaps, and a playable build with real UI came out the far end."
        },
        "sourceKind": "pipelineGate",
        "targetRef": {
          "kind": "commandOutput",
          "assertions": [
            { "command": "npm run bridge", "field": "status", "target": "COMPLETE with 0 problems" },
            { "command": "npm run cid:verify", "field": "failures", "target": "0" },
            { "command": "npm test", "field": "failing", "target": "0" },
            { "command": "npm run cid:verify", "field": "sheetsCarryingNoDataForm", "target": "0" },
            { "command": "cid/_state.md", "field": "waves[].verdict", "target": "no wave row is marked done or closed while its recorded verdict is FAIL or PARTIAL" }
          ],
          "recordedNotAsserted": ["the count of proposed keys with no schema slot - a contract-growth queue, not a failure"]
        },
        "targetTolerance": null,
        "alarm": {
          "basis": "pointer",
          "condition": "any assertion above fails, or a wave advances on a PARTIAL - which cid/_state.md itself calls 'a wave that will be rebuilt'"
        },
        "actorKindOfWork": "pipeline-and-seam work",
        "currentHolder": "the developer",
        "action": "the failing gate is fixed before the next wave starts. This is the one row whose action is not a revision request against a design field.",
        "readableToday": true,
        "blockedBy": null,
        "placement": "no dashboard. Terminal output, plus the wave table in cid/_state.md."
      }
    ],
    "verdictRule": {
      "projectVerdict": "pass if and only if the pipeline row passes. 00-CORE.md's success claim is about the repository, so no game row can pass or fail it.",
      "gameRowFail": "never a project failure. A breached game row produces exactly one artefact: a revision request against the sheet and field named in that row's action. OPEN.md section 2 says the game ships and settles, so no live tuning response exists and none may be invented.",
      "unreadableRow": "a row at readableToday false is not a fail. It is an unbuilt instrument; its target is recorded as untested, never as passed, and it converts to a stated requirement on the work named in blockedBy.",
      "belowSample": "a game row read on fewer than minimumSessions qualifying sessions returns no verdict at all.",
      "ifEveryGameRowIsUnreadable": "the pipeline row still returns a verdict and it is the honest one. Six unreadable game rows plus a passing pipeline row is a correct outcome for this project, not a degraded one.",
      "forbiddenActions": [
        "a retention fix, a daily reward, a streak, a season, an event calendar, a rebirth cycle or an offline grant - all priority 3, 03-META.md",
        "an in-game store, a purchase prompt or any product surface - ruling R-4, products.forbidden F13 and F19",
        "a design change proposed to move revenue or retention - both declined non-goals, 00-CORE.md",
        "any player-facing display of any row, including a percentile, a badge or a progress figure - theme/tone/04 X10",
        "a currency, a sink or a conversion added to answer the duplicate row - 02-GAMEPLAY.md, 'solve duplicates without adding a currency'",
        "a comparative figure between two players - priority 3 leaderboards, and social.forbidden X7"
      ]
    },
    "declined": [
      { "id": "DAU", "failsRule": "K1", "reason": "no sheet states a prediction about how many people play. A headcount refutes nothing here." },
      { "id": "ARPDAU", "failsRule": "K2", "reason": "structurally 0. Every products.items[].gamePassId is null, so UserOwnsGamePassAsync cannot return true and entitlements resolves every product to not-owned. Held as a dormant reading by economyHealth." },
      { "id": "payerShare", "failsRule": "K2", "reason": "same structural constant. The platform also gates all monetization KPIs at 10 DAU and 10 play hours for 7 consecutive days.", "source": "https://github.com/Roblox/creator-docs/blob/main/content/en-us/production/analytics/analytics-dashboard.md" },
      { "id": "conversionRate", "failsRule": "K2", "reason": "same, and it is supplied free by the platform with no instrumentation, so it costs nothing to look at and cannot be a target." },
      { "id": "revenuePerSession", "failsRule": "K3", "reason": "'Revenue. Offered and declined.' A target would convert a declined non-goal into an objective." },
      { "id": "D1_D7_D30", "failsRule": "K3", "reason": "'Beating the genre's retention curve. Offered and declined.' Recorded free from the platform's Retention page and held by retentionReadout with optimiseFor false. Ruling R-3 already declined an under-scoping finding on this ground.", "source": "https://create.roblox.com/docs/production/analytics/analytics-dashboard" },
      { "id": "timeToFirstPurchase", "failsRule": "K4", "reason": "it is the live RR-10 contradiction between pacing.milestones[firstPurchase] and firstSession.beats[firstSpendAffordable].testRange, and it is being settled in Balance by two named owners rather than by a live reading. As an instrument it is a funnel step over ordered beats and belongs to funnels." },
      { "id": "aboveTickPayoffGap", "failsRule": "K1", "reason": "_verified-wave4.md finding 5 already establishes that the published figure is a mean presented as a maximum with a real worst case near 99.7 s against a 90 s ceiling. That is an arithmetic defect already found and recorded, not something only play can settle. The timestamped instrument is telemetry's payoff-gap sheet." },
      { "id": "setCompletionRatePerSet", "failsRule": "K2", "reason": "OPEN.md section 2 item 3, obsolete and the brief could not know it. systems/05 made placement a seeded partition, so set completion is deterministic given areas cleared. Subsumed by lapRealisedSeconds, which is what it was really asking about." },
      { "id": "terminalStateReachRate", "failsRule": "K4", "reason": "meta/07's open question. Ruling R-3 declined expanding the game on exactly this argument, so the number has no available action. What survives is time to pacing.milestones[collectionComplete], covered by lapRealisedSeconds." },
      { "id": "deviceSplit", "failsRule": "K1", "reason": "a breakdown dimension, not a headline number, and the dashboard supplies Platform, OS and Age Group with no event. It would settle the brief's unsourced 70/25/5 split, which belongs to whoever defines breakdowns.", "source": "https://create.roblox.com/docs/production/analytics/analytics-dashboard" },
      { "id": "indexPanelOpenRate", "failsRule": "K4", "reason": "engagement work already declined it: nothing would be changed on the answer, and the panel is not a surface anything would be changed for." },
      { "id": "anyComparativeFigure", "failsRule": "K8", "reason": "leaderboards are priority 3 and X10 closes the surface regardless. Named in order to forbid it." }
    ],
    "baselineEvidence": {
      "date": "2026-08-01",
      "n": 1,
      "who": "the developer",
      "timed": false,
      "isMeasurement": false,
      "record": "cid/_playtest.md",
      "bearsOn": [
        { "row": "lapRealisedSeconds", "observation": "area 1's clear time was 'pretty close to that time estimate'", "weight": "capable of refuting a gross error in laps[0]; incapable of confirming a fine one" },
        { "row": "secondsToFirstReveal", "observation": "'the first find shows up pretty quick'", "weight": "same" },
        { "row": "heldBalanceAtSessionEnd", "observation": "'the number of shards you get for each piece of grass is good'", "weight": "bears on the payout formula, not on the greedy-buyer assumption this row tests" }
      ],
      "couldNotCheck": ["anything past area 1", "any purchase against a real game pass", "any second player"]
    },
    "schemaRequirement": {
      "for": "contract-and-seam work, whoever maintains bridge/schema.mjs",
      "problem": "rows[].targetRef.path and rows[].predictionRefuted.path are pointers into other keys' fields. SCHEMA has no field type that expresses a cross-key reference, so this key goes stale silently the moment wave 4's revisions land.",
      "implementation": [
        "add a 'ref' field kind whose value is a dotted path with numeric or * array indices",
        "resolve it in a SECOND pass, after all keys are merged, against the union of the merged manifest and the proposals collected by bridge/merge.mjs - a proposed key may legitimately be cited before it has a shape",
        "for every rows[].targetRef.path, every entry of rows[].targetRef.alsoReads and every rows[].predictionRefuted.path: an unresolvable path is a problem, not a warning",
        "where the head segment names a key whose status is proposed, resolve against that proposal's value and record the row id in a pendingRefs[] list, so promotion order is visible",
        "targetRef.kind 'commandOutput' is exempt from resolution and instead requires every assertion to carry a non-empty command and field",
        "targetRef.path must contain no numeric literal - this is K5 as a merge check"
      ],
      "generalises": "funnels states the same need for its refutes paths, and pacing already cites firstSession and solvency fields in prose for the same reason. This is one check serving at least three keys."
    },
    "splitAlternative": {
      "offered": "split family 'pipeline' into a second key, pipelineHealth",
      "argument": "different population (the repository), different cadence (per wave, not per day), different consumer (bridge and cid:verify can actually assert it, where no build step reads the game rows), and it needs none of the reference-resolution machinery above.",
      "chosen": "one key with a family discriminator, because guessing at a split the maintainer has not asked for is the more expensive error.",
      "howToSplit": "move rows where family == 'pipeline', cadence.pipeline and verdictRule.projectVerdict into pipelineHealth, and drop the family field from kpis.rows[]. Nothing else changes."
    }
  }
}
```

## Consequences for other work

- **Onboarding-funnel work (owner of `funnels`)**: row 3 publishes exactly two distributional
  statistics of `secondsToFirstReveal` and **no conversion rate, no step ordinal and no
  per-step pass mark** — those are yours. A pass mark from `funnels` on P90 or P50 of this same
  quantity means one number with two answers, the defect `_verified-wave4.md` check 6 caught
  three times. I inherit the population and origin from `firstSession`; I do not restate them.
- **Event-catalog work (owner of `telemetry`)**: four rows are `readableToday: false` and each
  names the observation point that would close it. If you conclude a quantity cannot be
  emitted, `verdictRule.unreadableRow` records the target as **untested, never failed**, so
  your refusal does not silently become somebody else's design failure.
- **Lap-clock work (owner of `lapClock`)**: row 2 is my headline row and your instrument. You
  own the two origins, the population and the session-spanning rule; I own only which ordinals
  are headline and the two pointer-relative bounds.
- **Economy-flow work (owner of `economyHealth`)**: row 6's target and alarm are read off
  `discovery.repeat.possible`, not chosen, so neither of us may publish a number for it. Row 5
  is a solvency reading rather than a currency-flow reading, and there is no collision unless
  one of us starts publishing the other's quantity.
- **Balance and pacing work (owners of `pacing`, `solvency`, `upgrades`)**: five row targets
  point into your fields. Until the reference check below exists a rename breaks a row with
  nothing firing, so a rename should carry the row ids citing it — `sessionSeconds`,
  `lapRealisedSeconds`, `sessionYieldsAFind`, `heldBalanceAtSessionEnd`.
- **Contract-and-seam work**: the `targetRef` resolution check and the `pipelineHealth` split,
  both stated as data in `schemaRequirement` and `splitAlternative` rather than as prose asks.
- **Run-state work (holder of `cid/_state.md`)**: row 7's fifth assertion reads the wave
  table's verdict column, so that column must keep carrying FAIL / PARTIAL / done per wave. A
  wave row showing done with no recorded verdict is unevaluable, which the alarm treats as a
  breach.

## Acceptance criteria

1. `kpis.rows[]` contains exactly 7 rows, and every row has a non-empty
   `predictionRefuted.claim`, `targetRef`, `alarm`, `actorKindOfWork`, `currentHolder`,
   `action`, `sourceKind` and `placement`, plus a boolean `readableToday`.
2. No `targetRef.path` or `alsoReads` entry contains a numeric literal, and every `alarm` has
   either `basis: "pointer"` or `status: "playtest unknown"` with both a starting value and a
   `testRange`.
3. `kpis.declined[]` has at least 8 rows, each carrying a `reason` and the `K` id from
   `01-kpi-admission-rule.md` that it fails.
4. `kpis.baselineEvidence` has `n: 1`, `timed: false` and `isMeasurement: false`, and exactly
   one row of `kpis.rows[]` has `family: "pipeline"`.

## Not decided here

Event ids, payload fields, sampling and call sites for the four unreadable rows — event-catalog
work, which holds `telemetry`; I name observation points and design no event. The onboarding
step ladder, its ordinals, populations beyond the two inherited, and every per-step conversion
pass mark — onboarding-funnel work, which holds `funnels`. The lap measurement's two origins,
its exclusions and how a session-spanning lap is timed — lap-clock work. What a session *is*,
and every retention window with its `optimiseFor: false` — session-shape and retention-readout
work. Every currency-flow reading, the duplicate counter's definition and population, and the
dormant monetization readings — economy-flow work, which holds `economyHealth`. Every value a
target points at: `pacing`, `solvency`, `upgrades`, `firstSession`, `discovery`, `collection`
and `depths` belong to their owners and this key reads them and sets none. Whether a logging
pipeline exists at all — Tech & Data. Whether `bridge/schema.mjs` grows the reference check and
whether `pipelineHealth` becomes a second key — contract-and-seam work. Whether an under-13
audience may be logged at all — event-catalog work's sourced obligation, which every population
here inherits.
