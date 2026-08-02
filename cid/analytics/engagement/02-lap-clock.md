# 02 — The lap clock

**Domain:** analytics/engagement · **Category:** Analytics · **Wave:** 5

## Decision

**A lap is the elapsed seconds from the instant a player's live area becomes ordinal *N* to the
instant the clear that empties area *N* fires, measured on the server, and only laps whose two
instants fall inside one session are published.** A lap interrupted by a leave is excluded from
every realised figure and counted separately as `spanned`, so the censoring is visible instead of
silently inflating the mean by the hours a player was offline.

## Why

**This is the one reading in the domain that exists nowhere.** `OPEN.md §2` item (2) asks for
*"average time to complete an area — the pacing number nobody could source"* `[brief: soft]` ←
`[I assumed — §2 default]`, and no shipped module produces it: nothing in `game/src` calls any
analytics service, and `Protocol.luau` declares *"exactly seven channels, and no more"*
`[research: game/src/shared/Protocol.luau]`.

**The two origins are one server decision read twice.** `Clearing` increments `areasFinished` and
empties `cleared` at the clear that finishes an area `[research: game/src/server/Clearing.luau]`,
and the live area is `areasFinished + 1` `[research: game/src/server/Persistence.luau]`. So one
decision both terminates lap *N* and opens lap *N+1*. There is no second call site to argue about.

**The hard part is the one nobody has taken: how a lap that spans a session boundary is timed.**
`core-loop/04` rules that the session boundary falls strictly inside a lap, never on one, that laps
span sessions, and that re-entry restores the player's place. Raw wall clock would charge a lap for
the eight hours a player was asleep. Three rules were live:

| rule | what it publishes | what it costs |
|---|---|---|
| A · raw wall clock | a lap inflated by every offline hour | nothing, and the figure is worthless |
| B · sum of in-session intervals | the true quantity | a persisted accumulator — an eighth field in a seven-field save, and a save-migration boundary |
| **C · single-sitting only, taken** | laps whose entry and terminus share one session | one server-local integer per player per session, and a stated censoring |

**C, because B's cost lands on somebody else's key and C's bias is bounded and reportable.**
`stateShape` is seven persisted fields, and `products` `F20` shows this project treats an added
persisted field as a decision rather than a convenience; spending persistence-shape work's
migration to improve a pacing average is the wrong trade. `[cid: decided]` — no sheet and no brief
line states a rule.

**The exclusion rule that implements C needs no timestamp.** Because the boundary falls strictly
inside a lap, **the first lap terminus after any join is always a spanned lap**, and every terminus
after it in the same session is single-sitting. The rule is "drop the first terminus of each
session", checkable by inspection.

**What C discards, as a formula rather than a copied number.** A session holds
`pacing.completeLapsPerSession` complete laps plus one in progress, so the discarded share is
`1 / (completeLapsPerSession + 1)` — evaluate against the merged manifest at read time. At any
session band this game could plausibly carry it lands near one lap in six and never exceeds one in
four. The discarded laps are **counted, not dropped**: `spannedLapCount` sits beside every
published row, and a share departing from the formula is itself a finding about session length.

**Published per area ordinal, never pooled.** `pacing.laps[]` is nine rows — eight areas and the
post-terminal bay — and a pooled median refutes none of them. `core-loop/05` and `depths.sizingRule`
exist to hold the lap **flat across depth**; the only reading that tests that is nine medians side
by side, and it is the sharpest prediction in the game that nothing has ever measured.

**Purchasers are partitioned, not excluded.** `pacing` publishes a base and a purchaser figure per
row and `entitlements` resolves ownership once at join, so a lap carries an `entitled` boolean and
the two populations are reported apart; pooling would make a `Span` owner's faster lap read as a
refutation of the base figure. Every `products.items[].gamePassId` is null today, so this partition
is **specced and dormant**.

**The emission is a requirement, not a design, and deliberately small.** Stated below as what must
be knowable at which server decision. I name no event id, no payload field and no channel: the
catalog is event-logging work's and an eighth channel, if one is even needed, is that work's
request. Note what it does *not* need — no client message, no persisted field, no session id, no
wall-clock timestamp on the wire. **If the requirement is refused, `OPEN.md §2` item (2) stays
unanswered for the life of the project and this key is a stated requirement, not an instrument.**

**No pass mark and no alarm value.** Verdict rules are KPI-shortlist work's; this sheet supplies
the reading and the exclusions only.

**The one empirical reading bears on one row and does not measure it.** 2026-08-01, n = 1, the
developer, untimed: area 1's clear time was *"pretty close to that time estimate"*
`[research: cid/_playtest.md]`. That is a confirmation by feel of
`pacing.laps[1].realisedLapSeconds` capable of having come back grossly wrong and not capable of
confirming it to a second. Areas 2 through 8 and the bay are unobserved entirely.

```manifest
{ "provides": "lapClock", "status": "proposed", "value": {
  "quantity": "elapsed seconds a player spends completing one area, at that player's own throughput",
  "answers": "OPEN.md §2 measurement item (2)",
  "origins": {
    "entry": "the server decision that makes the player's live area ordinal N — either the increment that finished area N-1, or the restore at join",
    "terminus": "the server decision that increments areasFinished from N-1 to N, which is the clear that empties area N",
    "sameDecision": true,
    "clock": "server-local, monotonic, per player, per session; never persisted and never sent to a client"
  },
  "sessionSpanningRule": {
    "ruleTaken": "singleSittingOnly",
    "rejected": [
      { "id": "rawWallClock", "why": "charges the lap for time the player was offline" },
      { "id": "sumOfInSessionIntervals", "why": "needs a persisted accumulator; stateShape is seven fields and that is a save-migration boundary owned by persistence-shape work" }
    ],
    "implementation": "the first lap terminus after any join is spanned; every later terminus in that session is single-sitting",
    "discardedShareRule": "1 / (pacing.completeLapsPerSession + 1)",
    "discardedAreCountedAs": "spannedLapCount, published beside every realised row, never merged into it"
  },
  "population": {
    "included": "every session by every player, run 1 and returning alike",
    "run1Filter": false,
    "partition": [
      { "id": "entitled",
        "definition": "the player owned a product with a factor on radius or speed at join",
        "status": "dormant: every products.items[].gamePassId is null, so this is false for everyone today" }
    ]
  },
  "exclusions": [
    { "id": "X1", "what": "the first lap terminus after any join",
      "verdict": "excluded, counted as spanned", "why": "its entry was in a prior session" },
    { "id": "X2", "what": "a lap whose interval contains a character reset",
      "verdict": "included, and counted in resetInLap",
      "why": "the walk back from the area spawn is real elapsed time a player spent; hiding it would understate the tail" },
    { "id": "X3", "what": "a lap in a post-terminal bay",
      "verdict": "included, published under the bay ordinal only",
      "why": "pacing.laps[] carries a distinct bay row and a bay buries nothing" },
    { "id": "X4", "what": "a lap by a player whose save load fell back to defaultState after a store failure",
      "verdict": "excluded", "why": "their place was not restored, so the entry instant is wrong" },
    { "id": "X5", "what": "a live-area change by any route other than the completion increment",
      "verdict": "excluded and reported as a defect", "why": "nothing in the design produces one" },
    { "id": "X6", "what": "a lap observed in Studio or an unpublished place", "verdict": "excluded",
      "why": "the platform forbids analytics emission from Studio and from unpublished places" },
    { "id": "X7", "what": "a lap figure pooled across area ordinals", "verdict": "never published",
      "why": "pacing.laps[] is nine rows and a pooled median refutes none of them" },
    { "id": "X8", "what": "a lap figure mixing entitled and base players", "verdict": "never published",
      "why": "pacing publishes base and purchaser separately" }
  ],
  "aggregations": {
    "perRow": ["n", "median", "p90", "spannedLapCount", "resetInLap"],
    "rowKey": "area ordinal, one row per pacing.laps[].ordinal including the bay",
    "pooledFigures": 0
  },
  "emissionRequirement": {
    "form": "what must be knowable, at which server decision",
    "atDecision": "the server decision that increments areasFinished",
    "mustBeKnowable": [
      "which player",
      "which area ordinal just ended",
      "elapsed seconds since that player's live area became that ordinal, within this session",
      "whether that origin was a join rather than a prior completion"
    ],
    "doesNotRequire": ["a client message", "an eighth channel", "a persisted field", "a session id", "a wall-clock timestamp on the wire"],
    "owner": "logging-pipeline work [currently Tech & Data]",
    "namesNoEvent": true,
    "ifRefused": "OPEN.md §2 item (2) stays unanswered and this key is a stated requirement, not an instrument"
  },
  "verdictRules": { "passMark": null, "alarm": null, "owner": "kpis" },
  "refutes": [
    { "sheet": "gameplay/balance/05", "field": "pacing.laps[].realisedLapSeconds",
      "rows": "all nine, one at a time", "reading": "median by ordinal" },
    { "sheet": "gameplay/balance/05", "field": "pacing.lapTargetSeconds",
      "reading": "the central tendency of the nine medians against the target" },
    { "sheet": "gameplay/balance/05", "field": "pacing.routeSlack",
      "reading": "derived; realised lap over the straight-line traversal the footprint and throughput imply" },
    { "sheet": "gameplay/balance/05", "field": "pacing.realisedToArrivalRatio",
      "reading": "median realised against the arrival figure for the same ordinal" },
    { "sheet": "gameplay/balance/05", "field": "pacing.laps[].underbuyLapSeconds",
      "reading": "p90 by ordinal; an under-buying player is a real player in the upper tail",
      "strength": "weak, because held levels are not observable at the terminus" },
    { "sheet": "gameplay/balance/05", "field": "pacing.lapFloorSeconds and pacing.lapCeilingSeconds",
      "reading": "the share of realised laps outside the band" },
    { "sheet": "gameplay/meta/04", "field": "depths.sizingRule",
      "reading": "the nine medians; the rule exists to hold the lap flat, so a monotone trend across ordinals falsifies it" },
    { "sheet": "gameplay/core-loop/05",
      "field": "the claim that lap wall clock holds flat across depth and never rises",
      "reading": "the nine medians as a series", "note": "nothing has ever measured this" },
    { "sheet": "gameplay/balance/05", "field": "pacing.completeLapsPerSession",
      "reading": "joint with engagement.averageSessionSeconds; neither key refutes it alone" }
  ],
  "baselineEvidence": {
    "date": "2026-08-01", "n": 1, "player": "the developer", "timed": false,
    "areasObserved": [1],
    "observation": "area 1's clear time was pretty close to the estimate",
    "bearsOn": "pacing.laps[1].realisedLapSeconds",
    "isAMeasurement": false,
    "source": "cid/_playtest.md"
  }
} }
```

## Consequences for other work

- **Logging-pipeline work [currently Tech & Data]** inherits one requirement, in the form above,
  and owns whether it is met. It needs no eighth channel and no persisted field, which is the whole
  reason this sheet took rule C over rule B.
- **Event-catalog work (`telemetry`)** owns the event id, the API call, the custom-field allocation
  and the emission cadence. This sheet names none, so two sheets cannot describe one call.
- **Persistence-shape work** is asked for **nothing**. If it later adds a per-area accumulator for
  its own reasons, rule B becomes available and `spanned` falls to zero.
- **Balance and tuning work** gets the instrument that moves nine `[playtest unknown]` rows at once,
  and inherits the censoring: a published median is over single-sitting laps only.
- **Area-authoring by depth (`depths`)** gets the first external check on the flat-lap premise. If
  the nine medians trend upward with ordinal, `sizingRule`'s inputs are wrong even though its
  arithmetic is right.
- **KPI-shortlist work** takes the target and the alarm; its `lapRealisedSeconds` row is this
  quantity, defined here and given no verdict here.
- **Economy-flow work** should note this sheet counts laps and never currency; per-lap payout is
  its reading and the two must not both publish a per-area figure.

## Acceptance criteria

1. `lapClock.aggregations.rowKey` is the area ordinal and `pooledFigures` is `0`; the published set
   has one row per `pacing.laps[].ordinal`, including the bay.
2. `lapClock.sessionSpanningRule.ruleTaken` is `"singleSittingOnly"`, `discardedAreCountedAs` names
   a published count, and `discardedShareRule` is a formula over a field name containing no numeric
   literal other than the constant `1`.
3. `lapClock.emissionRequirement.namesNoEvent` is `true`, and no string in the `lapClock` value
   matches `/RemoteEvent|Protocol|LogCustomEvent|LogFunnelStepEvent|eventName/`.
4. `lapClock.refutes[]` has at least 8 entries, every entry names both a `sheet` and a `field`, and
   no entry contains a numeric value; `baselineEvidence` has `n: 1`, `timed: false`,
   `areasObserved: [1]`.

## Not decided here

What a session is, its boundary rule, its populations and every reading the dashboard supplies —
sheet `01`, which holds `engagement`. D1/D7/D30 — sheet `03`, which holds `retentionReadout`. Every
event id, payload field, custom-field key, API call and emission cadence — event-catalog work,
which holds `telemetry`; whether an eighth channel exists at all — module-and-channel-definition
work. The target, the alarm, and who acts — KPI-shortlist work. Every value the readings are
compared against — `pacing`, `depths` and `solvency`, all Balance and Tuning's, cited here by field
and none copied, because wave 4 is FAIL and those rows are moving. Whether any field is added to
the seven-field save — persistence-shape work. What a lap *should* be — `core-loop/04`, approved
wave 1 and not reopened; this sheet measures its ruling and does not re-time it.
