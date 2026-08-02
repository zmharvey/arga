# 02 — The shortlist

**Domain:** analytics/kpis · **Category:** Analytics · **Wave:** 5

## Decision

**Eight headline rows, seven about the game and one about the repo, published as the proposed
key `kpis`.** Every target is a pointer into a manifest field rather than a copied number,
every alarm is pointer-relative or `[playtest unknown]` with a range, every row names a kind of
work that acts, and **a breached game row produces a revision request against a named sheet and
field — never a tuning change, because the game ships and settles.** The key also publishes
`refGrammar`, the one normalised reference shape every citing key emits.

| # | row | family | target points at | alarm | actor [current holder] |
|---|---|---|---|---|---|
| 1 | `sessionSeconds` (P50) | game | `pacing.sessionBandSeconds` | P50 outside that band | wall-clock and pacing work [the developer] |
| 2 | `lapRealisedSeconds` (P50 by ordinal) | game | `pacing.laps[*].realisedLapSeconds`, inside `[pacing.lapFloorSeconds, pacing.lapCeilingSeconds]` | any ordinal outside the floor/ceiling band, or outside `targetTolerance` of its published lap | area-sizing and pacing work [the developer] |
| 3 | `secondsToFirstReveal` (P90 and P50) | game | `firstSession.ceilings.secondsToFirstReveal.max` | P50 above the ceiling | onboarding-beat work [the developer] |
| 4 | `sessionYieldsAFind` (share) | game | `pacing.oneFindPerSessionRisk.floorSessionFinds` | any qualifying session with no find | content-structure work [the developer] |
| 5 | `heldBalanceAtSessionEnd` (P50) | game | `solvency.areaLedger[*].cumulativeSpend` vs `cumulativeIncome` | P50 at or above the cheapest unbought rung, two ordinals running | cost-curve work [the developer] |
| 6 | `duplicateRevealCount` | game | `discovery.repeat.possible` (`false`) | count ≥ 1 | find-placement and area-layout work [the developer] |
| 7 | `aboveTickPayoffGapSeconds` (max) | game | `pacing.aboveTickGapMaxSeconds` | realised maximum above the ceiling | payoff-cadence work [the developer] |
| 8 | `pipelineOutputIsBuildable` | pipeline | `bridge` / `cid:verify` / `npm test` output | any assertion fails, or a wave advances on a PARTIAL | pipeline-and-seam work [the developer] |

## Why

**Each row is the smallest reading that refutes one written claim.** `OPEN.md §2`'s rationale
is *"all three test assumptions this spec rests on rather than reporting vanity"*
`[brief: soft]` ← `[I assumed — §2 default]`, and rows 2 to 7 refute claims nothing has checked.

**Row 4 is the brief's own self-named highest risk** — *"discovery rates must be generous
enough that a typical session yields at least one find, or the stated session objective
silently fails. This is the highest-risk tuning in the game"* (`03-META.md`) — read against the
brief's own measurable, *"collection count rose this session"* `[brief: soft]` ←
`[you accepted: R6 Q3 → R5 Q3]`. Its alarm is a **counterexample test**, not a proportion
comparison: one qualifying session with no find is a breach, readable in the breach direction
at n = 1, and `minimumSessions` is needed only to confirm a pass.

**Row 5 is not about currency; it is about the greedy buyer.** Every `arrivalLevels` row in
`solvency.areaLedger[]` assumes the player spends what they earn as soon as they can. If the
median player sits above the cheapest rung they have not bought, every arrival throughput,
every footprint sized from it and every lap derived from those is wrong. `[cid: decided]` — no
sheet states that assumption as a claim; it is implied by the ledger, which is why nothing else
catches it.

**Row 6 is a zero-invariant, not a rate.** `discovery.repeat.possible` is `false` and the
shipped guard at `Clearing.luau:288` warns and fires nothing
`[research: game/src/server/Clearing.luau]`. Target 0, alarm 1, **neither figure chosen** —
both read off the key, so economy-flow work may not publish a number for the same counter.

**Row 7 reverses my own decline, and the reversal is the point.** I declined the above-tick gap
because its instrument was `events/04`'s; `events/04` hands the pass mark here. Circular, so a
whole sheet's output reached no reader. Re-checked against `K1`–`K8` it passes:
`_verified-wave4.md` finding 5 settled a **labelling** defect — a mean presented as a maximum —
and did not settle the realised maximum, and `pacing.laps[7].revealGapMaxSeconds` already
exceeds `pacing.aboveTickGapMaxSeconds` on disk. It also gives `telemetry`'s `session_end` a
consumer, one of the six orphans behind the category's check-2 FAIL. The cost is eight rows
against my index's *"seven or fewer"*; declining a live breaching prediction to hold a count is
the wrong trade.

**Row 8 is the only row that returns a verdict on `00-CORE.md`**, and it needs no player, no
event, no publish and no `gamePassId`. If every game row sits at `readableToday: false` for the
life of this project, row 8 is still the honest answer.

**Five rows are unreadable today and I am not softening that.** Grepped `game/src/` for
`AnalyticsService` and `LogService`: zero calls in 29 modules. `Types.luau`'s `StoredState`
carries seven fields and no timestamp, session id or run ordinal
`[research: game/src/shared/Types.luau]`, so no join-relative second is formable. Rows 1 and 5
need nothing built — the Engagement page supplies session time at P50
`[research: https://create.roblox.com/docs/production/analytics/engagement]` and the persisted
fields list through Open Cloud
`[research: https://create.roblox.com/docs/cloud/guides/data-stores]`.

**Cadence is a bounded post-publish window and its floor is sourced.** Custom events *"are
aggregated daily so it may take up to 24 hours for charts to populate"*
`[research: https://create.roblox.com/docs/production/analytics/custom-events]`, and *"Ships
and settles. No seasons or events"* `[brief: soft]` ← `[I assumed]` means no loop feeds a
standing review, so the window closes. The `pipeline` family runs per wave at the existing gate.

**Dashboard layout is declined as a design artifact and kept as a per-row placement column.**
The Creator Dashboard's pages exist and are not ours to lay out
`[research: https://create.roblox.com/docs/production/analytics/analytics-dashboard]`, against
a sourced capacity of 100 custom event names and ten funnel tabs
`[research: https://create.roblox.com/docs/production/analytics/funnel-events]`. These rows add
**no new event name** — the four they read are already declared in `telemetry.events[]`.

### `refGrammar` — the four gaps closed

The previous statement of this requirement could not be implemented. Each closure is data in
the manifest, not prose; the resolver has no choices left to make.

| gap | closure |
|---|---|
| numeric index vs. numeric literal | A numeric literal is legal **only inside square brackets**, where it is an array position; a bare numeric path segment is a parse failure. `solvency.areaLedger[6].cumulativeIncome` is therefore legal. **`K5` moves off the path string onto the row**: no ref and no row may carry a scalar target — no `value`, `min`, `max` or numeric `target` — and the only numbers permitted in a row sit in `targetTolerance` and `alarm.startingValue` / `testRange`, each carrying `status: "playtest unknown"`. |
| `*` unquantified | Three subscript forms with explicit quantifiers: `[*]` **all** (the remainder must resolve against every element), `[?]` **any** (against at least one), `[n]` / `["key"]` **exact**. Every path in this key uses `[*]`. |
| present-but-null | An **absent** key is a problem under every subscript form. A key **present with a null value resolves**, and the resolver records `value: null`. A ref may set `requireNonNull: true` to make null a problem; no ref here does, which is why `pacing.laps[*].revealGapMaxSeconds` resolves despite the bay row's null. |
| `null` paths | Not an exemption granted by silence. Every ref carries `kind`, the resolver **dispatches on `kind` and never infers from a null `path`**, and `path` is required non-null iff `kind: "manifestField"`. `commandOutput` and `briefLine` carry no path and are never resolved. Row 8's `predictionRefuted` is `briefLine`, because it cites `00-CORE.md` and no manifest field exists for it. |
| three encodings | One `ref` object, emitted by every citing key, with `refShape: 1` on the key so an un-migrated key is rejected rather than skipped. `funnels`' `refutes[]` of dotted strings and `economyHealth`'s `{key, field}` both map mechanically; `economyHealth`'s **prose `field`** case gets the home it lacked — `kind: "briefLine"` with a `sheet` and a `claim`. |

```manifest
{
  "provides": "kpis",
  "status": "proposed",
  "value": {
    "purpose": "the small set of numbers carrying a project-level target, an alarm and an actor. Every row passes K1-K8 of cid/analytics/kpis/01-kpi-admission-rule.md.",
    "admissionRule": "cid/analytics/kpis/01-kpi-admission-rule.md",
    "refShape": 1,
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
      "newEventNamesAddedByThisKey": 0,
      "eventsReadByTheseRows": ["area_cleared", "session_end", "the find-delta reading", "the duplicate defect counter"],
      "eventsReadByTheseRowsNote": "all four are already declared in telemetry.events[]; this key adds no name to the cap",
      "funnelDashboardTabCap": 10,
      "funnelTabsUsedByTheseRows": 1,
      "emissionSide": "server only, published places only",
      "aggregationLatencyHours": 24,
      "sources": [
        "https://create.roblox.com/docs/production/analytics/custom-events",
        "https://create.roblox.com/docs/production/analytics/funnel-events"
      ]
    },
    "refGrammar": {
      "version": 1,
      "everyEmittingKeyCarries": "refShape: 1, so the resolver rejects an un-migrated key rather than skipping it silently",
      "ref": {
        "kind": "REQUIRED on every ref. One of manifestField, commandOutput, briefLine. The resolver dispatches on kind and never infers from whether path is null.",
        "path": "required and non-null iff kind == manifestField; absent or null for the other two kinds",
        "alsoReads": "optional array of manifestField paths, resolved by the same rules as path",
        "requireNonNull": "optional boolean, default false",
        "assertions": "required iff kind == commandOutput; each element carries a non-empty command, field and target",
        "sheet": "required on every ref: the sheet that owns the cited claim",
        "claim": "required iff kind == briefLine; optional otherwise"
      },
      "pathGrammar": {
        "path": "SEGMENT ('.' SEGMENT)*",
        "SEGMENT": "IDENT | IDENT '[' SUBSCRIPT ']'",
        "IDENT": "[A-Za-z_][A-Za-z0-9_]*",
        "SUBSCRIPT": "INTEGER | '*' | '?' | QUOTED_STRING",
        "bareNumericSegment": "a segment that is itself a number is a parse failure"
      },
      "gap1_indexVersusValue": {
        "rule": "a numeric literal is legal ONLY inside square brackets, where it is an array position. A numeric literal anywhere else in a path is a parse failure. solvency.areaLedger[6].cumulativeIncome is legal.",
        "whereK5MovedTo": "the K5 check applies to the ROW, not to the path string. A row fails if any ref carries value, min, max or a numeric target. The only numbers permitted anywhere in a row are inside targetTolerance and alarm.startingValue / alarm.testRange, each of which must carry status 'playtest unknown'.",
        "supersedes": "the earlier bullet 'targetRef.path must contain no numeric literal', which contradicted the bullet admitting numeric indices"
      },
      "gap2_quantifiersAndNull": {
        "starSubscript": "ALL. Resolves iff the container is a non-empty array or map AND the remainder of the path resolves against every element.",
        "questionSubscript": "ANY. Resolves iff the container is non-empty AND the remainder resolves against at least one element.",
        "exactSubscript": "an INTEGER or QUOTED_STRING subscript. Resolves iff that index or key is present.",
        "absentKey": "a problem under every subscript form",
        "presentButNull": "RESOLVES. The resolver records value null.",
        "requireNonNull": "a ref may set it true to make a present-but-null value a problem. Default false.",
        "noRefInThisKeySetsRequireNonNull": true,
        "workedCase": "pacing.laps[*].revealGapMaxSeconds and pacing.laps[*].cumulativeSeconds are null on the bay row and resolve under the default. That case is why the rule is needed."
      },
      "gap3_nullPaths": {
        "rule": "path null is legal only under kind commandOutput or kind briefLine, and the resolver attempts no path for either. A ref with kind manifestField and a null path is a problem.",
        "rowsUsingIt": [
          "rows[pipelineOutputIsBuildable].targetRef, kind commandOutput",
          "rows[pipelineOutputIsBuildable].predictionRefuted, kind briefLine - it cites 00-CORE.md and no manifest field exists for it"
        ]
      },
      "gap4_oneShape": {
        "problem": "three keys encoded one idea three ways: a dotted string in kpis, an array of dotted strings in funnels' refutes[], and a {key, field} object in economyHealth whose field is sometimes a sentence rather than a path.",
        "normalisedShape": "the ref object above, emitted by every key that cites another key's field",
        "migrations": [
          "funnels: refutes[] of dotted strings becomes refs[] of { kind: manifestField, path, sheet }. One map, mechanical.",
          "economyHealth: { key, field } becomes { kind: manifestField, path: key + '.' + field, sheet } wherever field is a real field path.",
          "economyHealth, the prose case: where field is a sentence such as 'gameplay/meta/01 acceptance criterion 3, the stated 700 to 1200 band', it becomes { kind: briefLine, path: null, sheet: 'cid/gameplay/meta/01-the-area.md', claim: '<the sentence>' }. Without this case that citation resolves to nothing and the check serves one key.",
          "telemetry: refutes { sheet, field } becomes the same object. telemetry.events[] is a BUILD INPUT and is cited from this key as build-read, never as a developer-facing reading."
        ]
      },
      "resolver": {
        "when": "a second pass, after all keys are merged",
        "against": "the union of the merged manifest and the proposals collected by bridge/merge.mjs, because a proposed key may legitimately be cited before it has a shape",
        "scope": "every ref emitted by any key carrying refShape 1: path, every alsoReads entry, and every predictionRefuted",
        "onFailure": "a problem, not a warning",
        "pendingRefs": "where the head segment names a key whose status is proposed, resolve against that proposal's value and record the citing row id in pendingRefs[], so promotion order is visible"
      }
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
          "kind": "manifestField",
          "sheet": "cid/gameplay/balance/05-time-to-milestone.md",
          "path": "pacing.sessionBandSeconds",
          "claim": "10-20 minute active sessions; the divisor every wall-clock prediction in pacing was derived from"
        },
        "sourceKind": "platformDashboard",
        "targetRef": {
          "kind": "manifestField",
          "sheet": "cid/gameplay/balance/05-time-to-milestone.md",
          "path": "pacing.sessionBandSeconds",
          "rule": "P50 sits inside [pacing.sessionBandSeconds[0], pacing.sessionBandSeconds[1]]"
        },
        "targetTolerance": null,
        "alarm": {
          "basis": "pointer",
          "condition": "P50 below pacing.sessionBandSeconds[0] or above pacing.sessionBandSeconds[1]"
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
          "kind": "manifestField",
          "sheet": "cid/gameplay/balance/05-time-to-milestone.md",
          "path": "pacing.laps[*].realisedLapSeconds",
          "claim": "OPEN.md section 2 item 2, 'average time to complete an area - the pacing number nobody could source'. Nine published realised laps, all playtest unknown."
        },
        "sourceKind": "customEvent",
        "targetRef": {
          "kind": "manifestField",
          "sheet": "cid/gameplay/balance/05-time-to-milestone.md",
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
          "kind": "manifestField",
          "sheet": "cid/gameplay/onboarding/02-first-minute-beats.md",
          "path": "firstSession.ceilings.secondsToFirstReveal.max",
          "claim": "OPEN.md section 2 item 1 and 02-GAMEPLAY.md's 'clear to reveal inside the first ten seconds'"
        },
        "sourceKind": "onboardingFunnel",
        "targetRef": {
          "kind": "manifestField",
          "sheet": "cid/gameplay/onboarding/02-first-minute-beats.md",
          "path": "firstSession.ceilings.secondsToFirstReveal.max",
          "rule": "P90 at or below the ceiling",
          "alsoReads": ["firstSession.ceilings.secondsToFirstReveal.population", "firstSession.ceilings.secondsToFirstReveal.measuredFrom"]
        },
        "targetTolerance": null,
        "alarm": {
          "basis": "pointer",
          "condition": "P50 above firstSession.ceilings.secondsToFirstReveal.max - the median player misses the ten-second promise"
        },
        "boundaryWithFunnels": "this row publishes exactly two distributional statistics of one quantity and no conversion rate, no step ordinal and no per-step pass mark. Those are the funnels key's. This key adopts NO threshold from funnels: the target is read from firstSession, not from funnels/04's T4 or T5.",
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
        "statistic": "the share of qualifying sessions in which the player's found count rose. The alarm is a counterexample test, not a proportion comparison.",
        "population": "sessions of at least pacing.sessionBandSeconds[0] duration whose player held fewer than the collection total at session start",
        "predictionRefuted": {
          "kind": "manifestField",
          "sheet": "cid/gameplay/balance/05-time-to-milestone.md",
          "path": "pacing.oneFindPerSessionRisk",
          "claim": "03-META.md's self-named highest-risk tuning, and its own measurable 'collection count rose this session'. reopensIf names the two conditions that would break it."
        },
        "sourceKind": "customEvent",
        "targetRef": {
          "kind": "manifestField",
          "sheet": "cid/gameplay/balance/05-time-to-milestone.md",
          "path": "pacing.oneFindPerSessionRisk.floorSessionFinds",
          "rule": "floorSessionFinds at or above 1 predicts a share of 1.0. The target is a share of 1.0 and it moves only if floorSessionFinds falls below 1.",
          "alsoReads": ["pacing.oneFindPerSessionRisk.reopensIf", "collection.relicsPerArea"]
        },
        "targetTolerance": null,
        "alarm": {
          "basis": "pointer",
          "condition": "any qualifying session in which the found count did not rise. Readable in the breach direction at n = 1; minimumSessions is required only to confirm a pass."
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
          "kind": "manifestField",
          "sheet": "cid/gameplay/balance/03-ladder-solvency.md",
          "path": "solvency.areaLedger[*].arrivalLevels",
          "claim": "the greedy-buyer assumption: every arrival level, and therefore every arrival throughput, footprint and lap derived from it, assumes the player spends what they earn as soon as they can. The predicted residual at ordinal k is cumulativeIncome minus cumulativeSpend."
        },
        "sourceKind": "persistedSaveState",
        "targetRef": {
          "kind": "manifestField",
          "sheet": "cid/gameplay/balance/03-ladder-solvency.md",
          "path": "solvency.areaLedger[*].cumulativeSpend",
          "rule": "P50 held balance at ordinal k sits below the cost of the cheapest rung the player has not bought, min over u of upgradeCost(upgrades[u], heldLevel[u])",
          "alsoReads": ["solvency.areaLedger[*].cumulativeIncome", "upgrades[*].costBase", "upgrades[*].costGrowth"]
        },
        "targetTolerance": null,
        "alarm": {
          "basis": "pointer",
          "condition": "P50 held balance at or above the cheapest unbought rung's cost at two consecutive area ordinals"
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
          "kind": "manifestField",
          "sheet": "cid/gameplay/systems/05-the-find-ledger.md",
          "path": "discovery.repeat.possible",
          "claim": "false - the repeat branch is 'a build defect and not a game state', reachable only by a layout that assigns a name outside its area's slice. Ruling R-2 took relicsPerArea to 3 and areasPerDepth to 2, which retired the 'it is a no-op today' safety argument and made the partition draw load-bearing."
        },
        "sourceKind": "customEvent",
        "targetRef": {
          "kind": "manifestField",
          "sheet": "cid/gameplay/systems/05-the-find-ledger.md",
          "path": "discovery.repeat.possible",
          "rule": "false implies a count of 0. Both the target and the alarm are read off this field; neither is chosen, and no sheet may publish a chosen number for either."
        },
        "targetTolerance": null,
        "alarm": { "basis": "pointer", "condition": "count of 1 or more, on any server, once" },
        "actorKindOfWork": "find-placement and area-layout work",
        "currentHolder": "the developer",
        "action": "revision request against cid/gameplay/meta/05-area-layout.md (layout's slice resolution), cid/gameplay/meta/04-the-depth-ladder.md (depths.relicSliceAssignment) and cid/gameplay/meta/02-the-collection.md (collection.relicsPerArea x areasPerDepth equals set size). Never a balance change, never a duplicate sink and never a currency: 02-GAMEPLAY.md binds 'solve duplicates without adding a currency'.",
        "readableToday": false,
        "blockedBy": "game/src/server/Clearing.luau:288 warns to the server log and fires no channel. Protocol declares exactly seven channels and no more. The counter needs an emission that does not exist; economy-flow work states the requirement and telemetry owns the call site.",
        "placement": "Creator Dashboard > Explore, custom event, count aggregation. Any nonzero bar at all is the alarm."
      },
      {
        "id": "aboveTickPayoffGapSeconds",
        "family": "game",
        "statistic": "a maximum, not a percentile: the largest interval in seconds between two consecutive above-tick payoffs, taken as the maximum across the population. Reported per session; whether it is further broken down by area ordinal is a field-budget decision for event-catalog work and is not required by this row.",
        "population": "sessions in which the player's found count is below the collection total, per pacing.aboveTickGapScope",
        "predictionRefuted": {
          "kind": "manifestField",
          "sheet": "cid/gameplay/balance/05-time-to-milestone.md",
          "path": "pacing.aboveTickGapMaxSeconds",
          "claim": "core-loop/01's ceiling between two above-tick payoffs, and pacing's claim about which cadence carries it. _verified-wave4.md finding 5 settled a labelling defect - a mean presented as a maximum - and did not settle the realised maximum."
        },
        "sourceKind": "customEvent",
        "targetRef": {
          "kind": "manifestField",
          "sheet": "cid/gameplay/balance/05-time-to-milestone.md",
          "path": "pacing.aboveTickGapMaxSeconds",
          "rule": "the realised maximum sits at or below pacing.aboveTickGapMaxSeconds",
          "alsoReads": ["pacing.aboveTickGapScope", "pacing.aboveTickGapCarriedBy", "pacing.laps[*].revealGapMaxSeconds"]
        },
        "targetTolerance": null,
        "alarm": { "basis": "pointer", "condition": "realised maximum above pacing.aboveTickGapMaxSeconds" },
        "readsInstrument": {
          "key": "telemetry",
          "field": "telemetry.events[session_end].maxPayoffGapSeconds",
          "class": "build-read - telemetry.events[] is a build input, cited here as the instrument that produces the reading and never as a developer-facing value",
          "boundary": "event-catalog work owns the clock and its origin, which payoffs count as above-tick, what resets it, and whether the carried value is the gap or the running maximum. This row sets only the target, the alarm and the actor - the half events/04 handed out and nobody took."
        },
        "actorKindOfWork": "payoff-cadence work",
        "currentHolder": "the developer",
        "action": "revision request against cid/gameplay/balance/05-time-to-milestone.md (pacing.aboveTickGapMaxSeconds, pacing.aboveTickGapCarriedBy) and its guard solvency.tests.S5. If the breach is reveal spacing rather than purchase cadence, it routes on to cid/gameplay/meta/05-area-layout.md's one-find-per-contiguous-third rule.",
        "readableToday": false,
        "blockedBy": "telemetry's session_end event does not exist in game/src. The gap must be accumulated server-side and carried on the event that ends the session; nothing in game/src calls any analytics service.",
        "placement": "Creator Dashboard > Explore, custom event, max-value aggregation"
      },
      {
        "id": "pipelineOutputIsBuildable",
        "family": "pipeline",
        "statistic": "a boolean per wave gate, over five assertions",
        "population": "the repository. No players, no publish, no gamePassId.",
        "predictionRefuted": {
          "kind": "briefLine",
          "sheet": "concept/spec/incremental-spinoff-v2/00-CORE.md",
          "path": null,
          "claim": "Success is shipped artifacts, not players - every creative area produced usable output, the sheets fed them without gaps, and a playable build with real UI came out the far end."
        },
        "sourceKind": "pipelineGate",
        "targetRef": {
          "kind": "commandOutput",
          "sheet": "cid/analytics/kpis/02-the-shortlist.md",
          "path": null,
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
      "belowSample": "a game row read on fewer than minimumSessions qualifying sessions returns no verdict, except in the breach direction of a counterexample test or a zero-invariant.",
      "rateReadability": "no row may adopt a pass-to-alarm gap finer than the confidence interval at minimumSessions. This key adopts no threshold from funnels or from any other key. Two rows carry rate-shaped alarms and neither is a fine-grained proportion comparison: sessionYieldsAFind is a counterexample test and duplicateRevealCount is a zero-invariant.",
      "ifEveryGameRowIsUnreadable": "the pipeline row still returns a verdict and it is the honest one. Seven unreadable game rows plus a passing pipeline row is a correct outcome for this project, not a degraded one.",
      "forbiddenActions": [
        "a retention fix, a daily reward, a streak, a season, an event calendar, a rebirth cycle or an offline grant - all priority 3, 03-META.md",
        "an in-game store, a purchase prompt or any product surface - ruling R-4, products.forbidden F13 and F19",
        "a design change proposed to move revenue or retention - both declined non-goals, 00-CORE.md",
        "any player-facing display of any row, including a percentile, a badge or a progress figure - theme/tone/04 X10",
        "a currency, a sink or a conversion added to answer the duplicate row - 02-GAMEPLAY.md, 'solve duplicates without adding a currency'",
        "a comparative figure between two players - priority 3 leaderboards, and social.forbidden X7"
      ]
    },
    "reversals": [
      {
        "id": "aboveTickPayoffGap",
        "was": "declined under K1 in the first draft of this sheet",
        "now": "admitted as rows[aboveTickPayoffGapSeconds]",
        "reason": "the decline and events/04's hand-off were circular, so a whole sheet's output reached no reader. Re-checked, the row passes K1-K8: _verified-wave4.md finding 5 settled a labelling defect, not the realised maximum, and pacing.laps[7].revealGapMaxSeconds exceeds pacing.aboveTickGapMaxSeconds on disk. It also gives telemetry's session_end event a consumer.",
        "cost": "the shortlist is 8 rows against this domain's index of 'seven or fewer'. Eight is still a shortlist; declining a live breaching prediction to hold a count is the wrong trade."
      }
    ],
    "declined": [
      { "id": "DAU", "failsRule": "K1", "reason": "no sheet states a prediction about how many people play. A headcount refutes nothing here." },
      { "id": "ARPDAU", "failsRule": "K2", "reason": "structurally 0. Every products.items[].gamePassId is null, so UserOwnsGamePassAsync cannot return true and entitlements resolves every product to not-owned. Held as a dormant reading by economyHealth." },
      { "id": "payerShare", "failsRule": "K2", "reason": "same structural constant. The platform also gates all monetization KPIs at 10 DAU and 10 play hours for 7 consecutive days.", "source": "https://github.com/Roblox/creator-docs/blob/main/content/en-us/production/analytics/analytics-dashboard.md" },
      { "id": "conversionRate", "failsRule": "K2", "reason": "same, and it is supplied free by the platform with no instrumentation, so it costs nothing to look at and cannot be a target." },
      { "id": "revenuePerSession", "failsRule": "K3", "reason": "'Revenue. Offered and declined.' A target would convert a declined non-goal into an objective." },
      { "id": "D1_D7_D30", "failsRule": "K3", "reason": "'Beating the genre's retention curve. Offered and declined.' Recorded free from the platform's Retention page and held by retentionReadout with optimiseFor false. Ruling R-3 already declined an under-scoping finding on this ground.", "source": "https://create.roblox.com/docs/production/analytics/analytics-dashboard" },
      { "id": "timeToFirstPurchase", "failsRule": "K4", "reason": "it is the live RR-10 contradiction between pacing.milestones[firstPurchase] and firstSession.beats[firstSpendAffordable].testRange, and it is being settled in Balance by two named owners rather than by a live reading. As an instrument it is a funnel step over ordered beats and belongs to funnels." },
      { "id": "setCompletionRatePerSet", "failsRule": "K2", "reason": "OPEN.md section 2 item 3, obsolete and the brief could not know it. systems/05 made placement a seeded partition, so set completion is deterministic given areas cleared. Subsumed by lapRealisedSeconds and by engagement's areasFinished distribution." },
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
    "splitAlternative": {
      "offered": "split family 'pipeline' into a second key, pipelineHealth",
      "argument": "different population (the repository), different cadence (per wave, not per day), different consumer (bridge and cid:verify can actually assert it, where no build step reads the game rows), and it needs none of the reference-resolution machinery in refGrammar.",
      "chosen": "one key with a family discriminator, because guessing at a split the maintainer has not asked for is the more expensive error.",
      "howToSplit": "move rows where family equals pipeline, cadence.pipeline and verdictRule.projectVerdict into pipelineHealth, and drop the family field from kpis.rows[]. refGrammar stays here. Nothing else changes."
    }
  }
}
```

## Consequences for other work

- **Contract-and-seam work (owner of `bridge/schema.mjs`)**: `refGrammar` is complete — the ref
  object, the path grammar, three quantifiers, the absent-versus-null rule, kind dispatch for
  null paths, and a migration for each of the three existing encodings. Implement the resolver
  as a second pass over merged ∪ proposals, failing as a `problem`. `refShape: 1` on each
  emitting key is what lets you reject an un-migrated key instead of skipping it.
- **Onboarding-funnel work (owner of `funnels`)**: migrate `refutes[]` to `refs[]` of the ref
  object and carry `refShape: 1`. Row 3 publishes two distributional statistics of
  `secondsToFirstReveal` and **no conversion rate, step ordinal or per-step pass mark**; this
  key adopts **no** threshold from yours, so `T4`'s reach threshold is untouched and `T5`'s
  `headline` flag is the only overlap.
- **Economy-flow work (owner of `economyHealth`)**: migrate `{key, field}` to the ref object.
  Your **prose `field`** case now has a home — `kind: "briefLine"` with a `sheet` and a `claim`
  — instead of resolving to nothing. Row 6's target and alarm are read off
  `discovery.repeat.possible`, not chosen, so neither of us may publish a number for it.
- **Event-catalog work (owner of `telemetry`)**: row 7 takes the verdict `events/04` handed
  out. You keep the clock, its origin, the above-tick payoff set, the reset rule and whether the
  carried value is the gap or the running maximum; I set target, alarm and actor only. This key
  cites `telemetry.events[session_end]` as **build-read** — `events[]` is a build input, not a
  developer-facing value — and `session_end` now has a consumer.
- **Lap-clock work (owner of `lapClock`)**: unchanged. You own row 2's origins, population and
  session-spanning rule; I own which ordinals are headline and the two pointer-relative bounds.
- **Balance and pacing work (owners of `pacing`, `solvency`, `upgrades`)**: six row targets
  point into your fields, so a rename should carry the row ids citing it — `sessionSeconds`,
  `lapRealisedSeconds`, `sessionYieldsAFind`, `heldBalanceAtSessionEnd`,
  `aboveTickPayoffGapSeconds`.
- **Run-state work (holder of `cid/_state.md`)**: row 8's fifth assertion reads the wave table's
  verdict column, so that column must keep carrying FAIL / PARTIAL / done per wave.

## Acceptance criteria

1. `kpis.rows[]` contains exactly 8 rows, exactly one with `family: "pipeline"`; every row has a
   non-empty `predictionRefuted`, `targetRef`, `alarm`, `actorKindOfWork`, `currentHolder`,
   `action`, `sourceKind` and `placement`, plus a boolean `readableToday`.
2. Every ref in the key carries a `kind`; `path` is a non-null string iff `kind` is
   `manifestField` and `null` otherwise; every `path` and `alsoReads` entry parses against
   `refGrammar.pathGrammar`; and no numeric literal appears in any path outside square brackets.
3. No ref and no row carries `value`, `min`, `max` or a numeric `target`; every number inside a
   row sits in `targetTolerance` or `alarm.startingValue` / `alarm.testRange` with
   `status: "playtest unknown"`.
4. `kpis.declined[]` has at least 8 rows each carrying a `reason` and a `K` id, and
   `kpis.baselineEvidence` has `n: 1`, `timed: false` and `isMeasurement: false`.

## Not decided here

The above-tick clock, its origin, which payoffs count, what resets it and whether the carried
value is the gap or the running maximum — event-catalog work, which holds `telemetry`; I set
row 7's target, alarm and actor only. Event ids, payload fields, sampling and call sites for
every unreadable row — the same. The onboarding step ladder, its ordinals, populations beyond
the two inherited, and every per-step conversion pass mark — onboarding-funnel work. The lap
measurement's two origins, its exclusions and how a session-spanning lap is timed — lap-clock
work. What a session *is*, and every retention window with its `optimiseFor: false` —
session-shape and retention-readout work. Every currency-flow reading and the duplicate
counter's definition and population — economy-flow work. Every value a target points at:
`pacing`, `solvency`, `upgrades`, `firstSession`, `discovery`, `collection` and `depths` belong
to their owners and this key reads them and sets none. Whether a logging pipeline exists at all
— Tech & Data. Whether `telemetry.events[]` is promoted into the technical contract as a build
input — contract-and-seam work; I cite it as build-read and decide nothing about it. Whether
`pipelineHealth` becomes a second key — contract-and-seam work.
