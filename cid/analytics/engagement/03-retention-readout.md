# 03 — The retention readout

**Domain:** analytics/engagement · **Category:** Analytics · **Wave:** 5

## Decision

**D1, D7 and D30 are recorded, at zero cost, as evidence about exactly one sentence the brief
wrote about itself — and about nothing else.** `optimiseFor: false`, no target, no alarm, no
breakdown anyone acts on, and **no design change may ever be proposed to move any of the three**,
because every mechanism that would move them is cut or priority 3.

## Why

**The goal is declined and the decline is binding.** *"Beating the genre's retention curve.
Offered and declined"* (`00-CORE.md`) `[brief: binding]` ← `[you chose: R1 Q3]`. Ruling R-3
declined an under-scoping finding on exactly these grounds. **Measuring is in scope; treating the
number as a thing to improve is not**, and the category brief states that separation for the
whole of Analytics.

**Keeping them is not a hedge, it is the brief checking its own claim.** `03-META.md` states
*"**Honest weakness:** without banked offline earnings, the pull to return is materially weaker
than the reference's. That was the accepted trade for permanence"* `[brief: soft]` ←
`[you accepted: R3 Q3]`. That is falsifiable, and the project's own selection principle is *"all
three test assumptions this spec rests on rather than reporting vanity"* (`OPEN.md §2`). Recording
a number the platform already computes, in order to check a sentence the brief volunteered, is the
literal application of that principle. **Restraint is carried as data — `optimiseFor: false` with
its citation — so a verifier reads a decision rather than a gap.**

**The claim names the reference and the free instrument does not.** The dashboard's benchmark set
is *similar-experience* or *genre*, *"for comparison only"*
`[research: https://devforum.roblox.com/t/analytics-view-retention-by-acquisition-source-and-select-your-benchmark-set/4010157]`.
`[🌱] Grass Incremental Simulator`'s own D1 is published nowhere. So the claim is read in a
**weakened** form — materially below the similar-experience band, rather than materially below
that one game — and the weakening is carried in the key rather than glossed. `[cid: decided]`.

**Zero game-defined events, verified rather than assumed.** D1/D7/D30 arrive from the Retention
page with daily and weekly cohorts and no developer setup
`[research: https://create.roblox.com/docs/production/analytics/retention]`, broken down by
acquisition source and comparable against a selectable benchmark set covering average playtime
and D1/D7/D30 `[research: https://devforum.roblox.com/t/analytics-view-retention-by-acquisition-source-and-select-your-benchmark-set/4010157]`,
with the standard filter dimensions available
`[research: https://create.roblox.com/docs/production/analytics/analytics-dashboard]`. **This
half of the domain asks logging-pipeline work for nothing at all.**

**External context, deliberately not a target.** The 2025 Roblox Benchmark Report buckets
experiences by average session length (0–3, 4–6, 7–12, 13–18, 19–24, 25+ minutes) and reports
D1/D7/D30 by bucket, on a GameAnalytics-network sample stated as about 47% of total Roblox
engagement `[research: https://investgame.net/news/pdf/the-2025-roblox-benchmark-report/]`. **The
brief's 10-to-20-minute band straddles two populated buckets** — its mass in 13–18 and 19–24, its
lower edge clipping 7–12 — which is the whole of what the source settles: `pacing.sessionBandSeconds`
is not an implausible band. **Two caveats that must not be laundered away.** The figures were read
from a **secondary summary** and several carry hedges in the source ("~", "nearly", "just under");
and the summary carried only the **D1** medians per bucket, so the D7 and D30 rows of that table
are `[research owed: a direct copy of the 2025 Roblox Benchmark Report PDF, its session-length
interval and retention-by-interval tables]` and are recorded as `null` rather than guessed.

**The same source removes the last argument for a retention instrument.** Retention rises with
session length across every bucket, so the only lever this game has on these three numbers is
session length — which is sheets `01` and `02`'s subject, already instrumented, and the thing a
lap clock actually moves. A retention practice on top of that would measure the same lever twice.

**The gate applies here too and is not restated.** `engagement.eligibilityGate` — more than 10 DAU
and 10 play hours for 7 consecutive days
`[research: https://create.roblox.com/docs/production/analytics/monetization]` — governs these
readings as well. Below it, this key returns nothing.

**Four subjects are declined outright**, each with its reason as data rather than as an absence: a
retention dashboard of any shape, feature-adoption rates, a game-built session-length histogram,
and churn as its own sheet. Their rows are in the key.

```manifest
{ "provides": "retentionReadout", "status": "proposed", "value": {
  "optimiseFor": false,
  "optimiseForCitation": "00-CORE.md non-goals: 'Beating the genre's retention curve. Offered and declined.' [brief: binding] <- [you chose: R1 Q3]; upheld by ruling R-3",
  "gameDefinedEventsRequired": 0,
  "readsExactlyOneClaim": {
    "claim": "without banked offline earnings, the pull to return is materially weaker than the reference's",
    "source": "03-META.md, Replayability [brief: soft] <- [you accepted: R3 Q3]",
    "claimSubstitution": {
      "asWritten": "weaker than [Grass Incremental Simulator]'s",
      "asReadable": "below the platform's similar-experience benchmark band",
      "why": "the reference's own D1/D7/D30 are published nowhere; the dashboard compares against a peer set, for comparison only",
      "weakened": true
    }
  },
  "windows": [
    { "id": "d1", "source": "creator-dashboard-retention", "cohorts": ["daily", "weekly"],
      "developerSetupRequired": false, "target": null, "alarm": null,
      "breakdowns": ["acquisitionSource", "platform", "ageGroup", "country"] },
    { "id": "d7", "source": "creator-dashboard-retention", "cohorts": ["daily", "weekly"],
      "developerSetupRequired": false, "target": null, "alarm": null,
      "breakdowns": ["acquisitionSource", "platform", "ageGroup", "country"] },
    { "id": "d30", "source": "creator-dashboard-retention", "cohorts": ["daily", "weekly"],
      "developerSetupRequired": false, "target": null, "alarm": null,
      "breakdowns": ["acquisitionSource", "platform", "ageGroup", "country"] }
  ],
  "benchmarkSet": {
    "kinds": ["similarExperience", "genre"],
    "covers": ["averagePlaytime", "d1", "d7", "d30"],
    "status": "for comparison only",
    "source": "https://devforum.roblox.com/t/analytics-view-retention-by-acquisition-source-and-select-your-benchmark-set/4010157"
  },
  "benchmarkContext": {
    "source": "https://investgame.net/news/pdf/the-2025-roblox-benchmark-report/",
    "sampleSource": "GameAnalytics network, stated as about 47% of total Roblox engagement",
    "readFrom": "a secondary summary of the report, not the primary dataset",
    "approximate": true,
    "isATarget": false,
    "sessionLengthBucketsMinutes": ["0-3", "4-6", "7-12", "13-18", "19-24", "25+"],
    "bandLandsIn": { "mass": ["13-18", "19-24"], "lowerEdgeClips": "7-12",
      "against": "pacing.sessionBandSeconds" },
    "d1ByBucketApprox": [
      { "bucket": "0-3", "d1": "about 4%" },
      { "bucket": "7-12", "d1": "about 8%" },
      { "bucket": "13-18", "d1": "about 10%" },
      { "bucket": "19-24", "d1": "double digits" }
    ],
    "d7ByBucket": null,
    "d30ByBucket": null,
    "settlingFetch": "a direct copy of the 2025 Roblox Benchmark Report PDF, its session-length interval and retention-by-interval tables",
    "whatItSettles": "that the brief's session band is not implausible; nothing about this game",
    "secondFinding": "retention rises with session length across every bucket, so the only lever on these three numbers is session length, which lapClock and engagement already instrument"
  },
  "eligibilityGate": { "ref": "engagement.eligibilityGate", "restatedHere": false },
  "prohibited": [
    { "id": "P1", "what": "any retention metric defined over a daily streak", "closedBy": "03-META.md priority 3, daily rewards",
      "observable": "no field in this key or in kpis is keyed by consecutive days" },
    { "id": "P2", "what": "any retention metric defined over a login window", "closedBy": "03-META.md priority 3, daily rewards",
      "observable": "the only windows are d1, d7, d30, which are the platform's" },
    { "id": "P3", "what": "any retention metric defined over an event calendar or a season cohort", "closedBy": "03-META.md priority 3, seasons and events; OPEN.md §2 'ships and settles'",
      "observable": "no cohort field other than daily and weekly" },
    { "id": "P4", "what": "any retention metric defined over a rebirth cycle", "closedBy": "01-FOUNDATION.md, no rebirth [you chose: R2 Q2]",
      "observable": "no reset exists in the state shape to key on" },
    { "id": "P5", "what": "any retention metric over time away accruing anything", "closedBy": "01-FOUNDATION.md, no offline accumulation [you chose: R2 Q1]",
      "observable": "no persisted timestamp exists for a path to convert" },
    { "id": "P6", "what": "a codes-redemption or referral retention figure", "closedBy": "03-META.md priority 3, codes",
      "observable": "no redemption path exists in game/src" },
    { "id": "P7", "what": "any comparative or ranked retention figure shown to a player", "closedBy": "03-META.md priority 3, leaderboards; theme/tone/04 X10",
      "observable": "no player-facing surface names any figure in this key" },
    { "id": "P8", "what": "a return notification, badge, reminder or any come-back surface", "closedBy": "theme/tone/04 X10 and OPEN.md §2 'no seasons or events'",
      "observable": "zero surfaces requested by this key" },
    { "id": "P9", "what": "a target or an alarm on d1, d7 or d30", "closedBy": "optimiseFor false",
      "observable": "every windows[].target and windows[].alarm is null" },
    { "id": "P10", "what": "any design change proposed in order to move d1, d7 or d30", "closedBy": "00-CORE.md non-goal [brief: binding]; every mechanism that would move them is cut or priority 3",
      "observable": "this key issues zero revision requests against any gameplay sheet" }
  ],
  "declined": [
    { "id": "D1", "what": "a retention dashboard of any shape", "reason": "ruling R-3 declined the under-scoping finding on the same grounds, and the platform's Retention page already exists; building a second is specifying a tool nobody in this pipeline builds" },
    { "id": "D2", "what": "feature-adoption rates for the four features", "reason": "the surface is three upgrade rows and one index panel; two of the three upgrade readings are economyHealth's sink volume seen from the other side, and the index panel's open rate fails both stopping-rule bars — no player would notice it and no two builders would diverge on it" },
    { "id": "D3", "what": "a game-built session-length histogram", "reason": "it would need a persisted per-session duration in a seven-field save; the dashboard supplies the mean and a P50/P90 chart toggle, and whether it publishes a full distribution is engagement's [unverified] item" },
    { "id": "D4", "what": "churn as its own subject", "reason": "with no failure state, no decay and no reset, churn has one observable — a save that stopped changing — and that is engagement.endOfSessionSnapshot read once" },
    { "id": "D5", "what": "a return-hook instrument", "reason": "the hook is 'an unfinished area and a half-empty index' (03-META.md), and both are already fields of engagement.endOfSessionSnapshot" }
  ],
  "refutes": [
    { "sheet": "03-META.md", "field": "the honest-weakness claim that the pull to return is materially weaker than the reference's",
      "reading": "d1, d7 and d30 against the similar-experience benchmark band",
      "direction": "at or above the band falsifies the claim; below it corroborates it and changes nothing, because the goal is declined",
      "weakened": true }
  ],
  "actionOnAnyReading": "record it; propose nothing"
} }
```

## Consequences for other work

- **KPI-shortlist work** may cite these three as recorded context and **may not headline them or
  set a target**; its own `declined[]` already reaches the same conclusion by a different route,
  and the two must not disagree. If it headlines one, two keys carry two answers for one number.
- **Core-loop and meta work** receive **zero revision requests from this sheet, permanently.**
  Whatever D1 reads, no offline accrual, no daily, no streak, no season and no rebirth may be
  proposed on its authority. That is the operative half of `optimiseFor: false`.
- **Session-shape work (sheet `01`)** owns the `eligibilityGate`, the session definition and the
  end-of-session snapshot. This sheet references all three and restates none.
- **Economy-flow work (`economyHealth`)** owns the two upgrade-adoption readings `D2` declines, as
  sink volume. Nothing here reads a purchase, an upgrade row or a currency figure.
- **Logging-pipeline work [currently Tech & Data]** is asked for **nothing by this sheet**. It is
  the only sheet in the domain with no requirement attached.
- **Store-listing and marketing work (wave 7)** should note that acquisition-source breakdown
  exists for free and that no target attaches to it here; a retention argument for a listing change
  would have to come from somewhere other than this key.

## Acceptance criteria

1. `retentionReadout.optimiseFor` is `false`, `optimiseForCitation` names `00-CORE.md`, and
   `gameDefinedEventsRequired` is `0`.
2. `retentionReadout.windows[]` has exactly three entries with ids `d1`, `d7`, `d30`, and every
   entry's `target` and `alarm` are `null`.
3. `retentionReadout.prohibited[]` has 10 rows, each with `what`, `closedBy` and `observable`;
   `retentionReadout.declined[]` has 5 rows, each with a `reason`.
4. `retentionReadout.benchmarkContext.approximate` is `true`, `sampleSource` is present,
   `d7ByBucket` and `d30ByBucket` are both `null`, and `settlingFetch` names the primary PDF.

## Not decided here

What a session is, its boundary rule, its populations, the eligibility gate and every dashboard
reading — sheet `01`, this domain, which holds `engagement`. The per-area realised lap and its
emission requirement — sheet `02`, which holds `lapClock`. Every event, payload field and
custom-field allocation — event-catalog work, which holds `telemetry`; this sheet needs none.
Onboarding funnel steps and the first-session cohort — funnel-definition work. Faucet, sink,
currency held, payer share and ARPDAU — economy-flow work, which holds `economyHealth`. The
shortlist, every target, every alarm, the review cadence and who acts — KPI-shortlist work. Whether
the game should be larger so that a longer arc exists to retain against — ruling R-3, declined, the
developer's call and not a writer's. What the store listing says about returning — Discovery and
Marketing, wave 7.
