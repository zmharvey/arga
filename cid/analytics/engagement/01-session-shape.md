# 01 — Session shape

**Domain:** analytics/engagement · **Category:** Analytics · **Wave:** 5

## Decision

**A session is one join to the matching leave, for one player, on one server. A rejoin after a
disconnect is a new session and is never stitched to the one before it; an idle stretch is not
subtracted; no session is filtered out of any figure.** Every reading here comes from the creator
dashboard or from an out-of-band read of the seven persisted save fields, so this half of the
domain costs **zero game-defined events**.

## Why

**The boundary rule is the platform's.** Average session time is *"the total time users spend in
your game divided by the number of sessions"*
`[research: https://create.roblox.com/docs/production/analytics/engagement]`. A stitching rule
would make our figure incomparable with the dashboard's own and with the selectable
similar-experience benchmark set
`[research: https://devforum.roblox.com/t/analytics-view-retention-by-acquisition-source-and-select-your-benchmark-set/4010157]`,
the only external comparator this project has. `[cid: decided]` — the brief defines no boundary.

**Stitching is also not derivable, so it was never a live alternative.** `Persistence.save` writes
`currency`, `upgrades`, `rowsRevealed`, `found`, `areasFinished`, `cleared`, `clearedCount` —
seven fields, no timestamp, no join count, no session count
`[research: game/src/server/Persistence.luau]`. Session count per player, time since last session
and run index are therefore **not derivable from game state at all**, only from the platform's
new-user cohort. Adding a field is persistence-shape work's decision; the `stateShape` revision
request it needs is being raised there and is referenced, not duplicated, here.

**"10–20 minute active sessions" `[brief: binding]` ← `[you chose: R1 Q4]` is read as a band on
the whole join-to-leave interval, not as an instruction to subtract idle time.** Nothing
server-side observes input; the nearest thing is the arming gate, which fires on displacement past
`firstSession.armDistanceStuds` per character life `[research: game/src/server/Clearing.luau]`, and
separating a joined-but-never-played session from a played one is that transition — `telemetry`'s
insertion point and Funnels' population, not a second instrument here. See
`## Flagged to the developer`. **Teleport does not arise:** zero `TeleportService` references in
`game/src` `[research: game/src]`, so a boundary is only ever a join or a leave.

**Run-1 populations are inherited verbatim and none is coined here**, because two definitions of a
first session in one category is the wave-3 defect repeating.

**The end-of-session state is already persisted and already readable.** `found`, `areasFinished`,
`clearedCount`, `currency` and `upgrades` are written at leave before teardown
`[research: game/src/server/init.server.luau]`, and Open Cloud can list a standard data store's
entries `[research: https://create.roblox.com/docs/cloud/guides/data-stores]`. So **churn needs no
sheet and no event**: with no failure state, no decay and no reset (`02-GAMEPLAY.md`,
`[brief: soft]` ← `[you accepted: step 6 Q2]`) a churned player is a save that stopped changing,
and its `found` count and `areasFinished` say where they stopped.

**Its weakness, stated rather than hidden:** the save is overwritten, so the read gives each
player's **terminal state**, not a per-session series. It cannot say which session a player was in
when they stopped, and it cannot produce the brief's own session measurable — *"collection count
rose this session"* (`03-META.md`, `[brief: soft]` ← `[you accepted: R6 Q3 → R5 Q3]`). **That
measurable is not measurable today.** It needs a join-to-leave diff of `found` carried at the leave
decision: a requirement on logging-pipeline work, and a row KPI-shortlist work already carries at
`readableToday: false`. I state the gap and name no event, field or channel for it.

**`OPEN.md §2` item (3) is replaced, not dropped.** *"Set-completion rate per set"* presumed a
discovery rate; `systems/05` made placement a seeded partition, so set *k* completes exactly when
`areasFinished >= k × collection.areasPerDepth`. The replacement is the **distribution of
`areasFinished` across saved players**, from the same snapshot at no extra cost — strictly cheaper
than the instrument it replaces. `[cid: decided]`.

**No pass mark and no alarm value appears here or in this key.** Verdict rules are KPI-shortlist
work's; this sheet supplies the reading only.

**One gate could make every free reading read nothing, and it is sourced.** *"Any game with more
than 10 daily active users (DAU) and 10 play hours for 7 consecutive days is eligible for accessing
all KPIs on the dashboard"*
`[research: https://create.roblox.com/docs/production/analytics/monetization]`. For a game whose
stated success is *"shipped artifacts, not players"* `[brief: binding]`, that threshold is not
guaranteed. Whether the Engagement and Retention pages are gated identically is `[unverified]` —
settling fetch: the same eligibility sentence located on the analytics-dashboard or retention page.

**Whether the dashboard exposes a full session-length distribution is `[unverified]`.** Only the
average is documented, plus a P50/P90 percentile toggle on charts
`[research: https://create.roblox.com/docs/production/analytics/analytics-dashboard]`; a standing
community request for percentile session length carries no staff reply
`[research: https://devforum.roblox.com/t/analytics-for-percentile-session-length/2061715]`, so the
absence is **inferred from the request, not stated by Roblox**. Settling fetch: a current capture
of a live Engagement page showing its complete chart list, which needs an account.

**One prediction nobody has stated, now made refutable:** the design assumes a new player completes
area 1. The **New User First Session Retention** curve — *"how many new users are still playing X
minutes after joining your game for the first time"*
`[research: https://create.roblox.com/docs/production/analytics/engagement]` — settles it for free,
read at the minute mark `pacing.laps[1].realisedLapSeconds` falls in.

```manifest
{ "provides": "engagement", "status": "proposed", "value": {
  "session": {
    "definition": "one join to the matching leave, for one Player, on one server",
    "startsAt": "the join path, after persistence.load returns",
    "endsAt": "the leave path, before plot teardown",
    "clock": "platform wall clock; the game holds no session id and stores no timestamp",
    "rejoinAfterDisconnect": "a new session; never stitched to the previous one",
    "stitchWindowSeconds": null,
    "idleSubtraction": false,
    "teleportSessions": "none; the experience has one place and makes no TeleportService call",
    "filtering": "none; every session enters every figure"
  },
  "populations": {
    "all": "every session by every player",
    "run1": [
      { "ref": "firstSession.ceilings.secondsToFirstClear.population",
        "text": "all run-1 sessions in which any input occurred" },
      { "ref": "firstSession.ceilings.secondsToFirstReveal.population",
        "text": "run-1 sessions whose first input arrived by second 5.0" }
    ],
    "returning": "the complement of the platform's new-user cohort; not derivable from game state",
    "coinedHere": 0
  },
  "gameDefinedEventsRequired": 0,
  "eligibilityGate": {
    "rule": "more than 10 DAU and 10 play hours for 7 consecutive days",
    "source": "https://create.roblox.com/docs/production/analytics/monetization",
    "scopeVerified": false,
    "consequence": "below it, every reading in this key returns nothing and the domain is dormant"
  },
  "readings": [
    { "id": "averageSessionSeconds", "sourceKind": "creator-dashboard", "surface": "Engagement",
      "definition": "total time users spend in the game divided by the number of sessions",
      "documented": true, "aggregation": "mean",
      "breakdowns": ["platform","ageGroup","os","source","country"] },
    { "id": "sessionSecondsP50", "sourceKind": "creator-dashboard", "surface": "Engagement",
      "definition": "median session length via the average-versus-percentile chart toggle",
      "documented": true, "aggregation": "p50",
      "note": "a toggle on charts, not a published distribution" },
    { "id": "sessionSecondsP90", "sourceKind": "creator-dashboard", "surface": "Engagement",
      "documented": true, "aggregation": "p90" },
    { "id": "sessionLengthDistribution", "sourceKind": "creator-dashboard", "documented": false,
      "status": "unverified",
      "settlingFetch": "a current capture of a live Engagement page showing its complete chart list" },
    { "id": "sessionsPerPlayerPerDay", "sourceKind": "creator-dashboard", "documented": false,
      "status": "unverified", "settlingFetch": "the same live Engagement page capture" },
    { "id": "newUserFirstSessionRetentionCurve", "sourceKind": "creator-dashboard",
      "surface": "Engagement", "documented": true,
      "definition": "how many new users are still playing X minutes after joining for the first time",
      "readAt": "the minute mark pacing.laps[1].realisedLapSeconds falls in" },
    { "id": "platformBreakdown", "sourceKind": "creator-dashboard", "surface": "Filter By",
      "documented": true, "dimensions": ["platform","os","memoryGroup"] },
    { "id": "ageGroupBreakdown", "sourceKind": "creator-dashboard", "surface": "Filter By",
      "documented": true },
    { "id": "endOfSessionSnapshot", "sourceKind": "open-cloud-datastore-read", "documented": true,
      "fields": ["found","areasFinished","clearedCount","currency","upgrades"],
      "limitation": "the save is overwritten, so this is each player's terminal state and not a per-session series" }
  ],
  "endOfSessionSnapshot": {
    "collectionCount": "count of true values in found, 0..24",
    "areasFinished": "integer >= 0",
    "clearedCount": "patches cleared in the live area",
    "setCompleteRule": "set k is complete when areasFinished >= k * collection.areasPerDepth",
    "churnDefinition": "a save that stopped changing; there is no failure state, so churn is never a loss"
  },
  "item3Replacement": {
    "was": "OPEN.md §2 item (3), set-completion rate per set",
    "obsoleteBecause": "systems/05 made placement a seeded partition, so set completion is deterministic given areas cleared",
    "nowIs": "the distribution of areasFinished across saved players, from endOfSessionSnapshot",
    "extraCost": 0
  },
  "notDerivableFromGameState": [
    { "what": "session count per player", "why": "no persisted counter",
      "replacedBy": "the platform new-user cohort" },
    { "what": "time since last session", "why": "no persisted timestamp",
      "replacedBy": "the platform retention cohorts" },
    { "what": "run index", "why": "no persisted counter",
      "replacedBy": "the platform new-user cohort" },
    { "what": "collection count rose this session", "why": "the save carries no per-session baseline",
      "replacedBy": null,
      "requires": "a join-to-leave diff of found, knowable at the leave decision; a requirement on logging-pipeline work" }
  ],
  "verdictRules": { "passMark": null, "alarm": null, "owner": "kpis" },
  "forbidden": [
    { "id": "E1", "what": "any metric defined over a daily streak",
      "closedBy": "03-META.md priority 3, daily rewards" },
    { "id": "E2", "what": "any metric defined over a login window or consecutive-day counter",
      "closedBy": "03-META.md priority 3, daily rewards" },
    { "id": "E3", "what": "any metric defined over a season or event calendar",
      "closedBy": "03-META.md priority 3, seasons and events; OPEN.md §2 'ships and settles'" },
    { "id": "E4", "what": "any metric defined over a rebirth or reset cycle",
      "closedBy": "01-FOUNDATION.md, no rebirth [you chose: R2 Q2]" },
    { "id": "E5", "what": "any metric over time away accruing anything",
      "closedBy": "01-FOUNDATION.md, no offline accumulation [you chose: R2 Q1]" },
    { "id": "E6", "what": "any comparison between two players, including a rank or a percentile of others",
      "closedBy": "02-GAMEPLAY.md 'no mechanical interaction'; leaderboards priority 3" },
    { "id": "E7", "what": "any player-facing surface for any reading here",
      "closedBy": "theme/tone/04 X10, measure freely display none of it" },
    { "id": "E8", "what": "any per-server aggregate",
      "closedBy": "social.maxPlayers is assigned to nobody; no reading here is per-server" },
    { "id": "E9", "what": "an idle or AFK subtraction from session length",
      "closedBy": "this sheet; nothing server-side observes input" },
    { "id": "E10", "what": "a session-stitching rule across a rejoin",
      "closedBy": "this sheet; no timestamp exists to stitch on" },
    { "id": "E11", "what": "a second definition of a run-1 session",
      "closedBy": "firstSession.ceilings.* owns both" },
    { "id": "E12", "what": "any target, pass mark or alarm value in this key",
      "closedBy": "kpis owns verdict rules" }
  ],
  "refutes": [
    { "field": "pacing.sessionBandSeconds",
      "reading": "averageSessionSeconds, sessionSecondsP50, sessionSecondsP90",
      "direction": "a median outside the published band falsifies it" },
    { "field": "pacing.completeLapsPerSession",
      "reading": "sessionSecondsP50 divided by lapClock median by ordinal",
      "direction": "joint with lapClock; neither key refutes it alone" },
    { "field": "pacing.milestones[collectionComplete]",
      "reading": "share of saves with 24 of 24 in found",
      "direction": "also settles endgame's open question of whether a player reaches the terminal state at all" },
    { "field": "balance/05 consequence: a floor session ends inside area 5 for a base player",
      "reading": "the areasFinished distribution against sessionSecondsP50",
      "direction": "weak; the snapshot cannot tie a save to a session count, so it refutes a gross error only" },
    { "field": "theme/fantasy/02 promise floor: laps to fill the index exceed the longest bound session",
      "reading": "share of saves at 24 of 24 against sessionSecondsP90",
      "direction": "refutable in the strong direction only; a clean test needs lapClock plus a session id" },
    { "field": "00-CORE.md device split, about 70 percent mobile / 25 desktop / 5 console",
      "reading": "platformBreakdown", "direction": "settled for free; the split is currently unsourced" },
    { "field": "00-CORE.md audience band 8-14", "reading": "ageGroupBreakdown",
      "direction": "settled for free" },
    { "field": "the unstated assumption that a new player completes area 1",
      "reading": "newUserFirstSessionRetentionCurve at the minute mark of pacing.laps[1].realisedLapSeconds",
      "direction": "nothing has ever stated or checked this" }
  ],
  "baselineEvidence": { "date": "2026-08-01", "n": 1, "player": "the developer", "timed": false,
    "source": "cid/_playtest.md",
    "bearing": "confirms nothing about session length; no session was timed" }
} }
```

## Consequences for other work

- **Lap-measurement work (sheet `02`)** owns every lap figure; `completeLapsPerSession` is
  refutable only by the two keys together and neither may publish it alone.
- **Retention-window work (sheet `03`)** inherits the same `eligibilityGate` by reference.
- **Onboarding-funnel work** inherits the run-1 population by reference, not by copy. Its run-1
  cohort is the platform's new-user cohort and **cannot** be a save-derived flag: no persisted
  field distinguishes run 1 from run 40.
- **Logging-pipeline work [currently Tech & Data]** receives exactly one requirement — at the leave
  decision, the change in `found` since that session's join must be knowable. No event id, payload
  field or channel is named here; `Protocol.luau` declares seven channels and an eighth is that
  work's request `[research: game/src/shared/Protocol.luau]`.
- **Event-catalog work** should note this sheet spends **no** custom field on Platform, OS or Age
  Group, because the dashboard breaks every default metric down by all three without one.
- **Persistence-shape work** is told what the absent fields cost and is not asked to add them.
- **KPI-shortlist work** takes every target and alarm; this key deliberately carries none.

## Acceptance criteria

1. `engagement.gameDefinedEventsRequired` is `0`, and every row of `engagement.readings[]` has
   `sourceKind` in `{"creator-dashboard", "open-cloud-datastore-read"}` — zero rows with any other
   value.
2. `engagement.populations.run1` has exactly two entries; each entry's `text` is byte-identical to
   the `population` string of the `firstSession.ceilings.*` field its `ref` names, and
   `engagement.populations.coinedHere` is `0`.
3. No key named `target`, `passMark`, `alarm` or `threshold` carries a non-null value anywhere in
   the `engagement` value.
4. `engagement.forbidden[]` has 12 rows, each with `what` and `closedBy`, and no string in
   `engagement.readings[]` matches `/streak|daily|login|season|rebirth|offline|leaderboard/i`.

## Flagged to the developer

The brief says *"10–20 minute **active** sessions"* and never says what "active" excludes.

| option | what it would mean | cost |
|---|---|---|
| **A — taken** | no idle subtraction; session = join to leave, as the platform counts it | zero |
| B | a second figure over sessions in which the arming gate fired | one emission, owned by logging-pipeline work; comparability with the dashboard lost |
| C | subtract idle stretches from every session length | a client input observation the platform forbids logging from, plus an eighth channel |

**Recommendation: A.** B is a legitimate later addition and is Funnels' population anyway; C
cannot be built and would make every figure incomparable with the benchmark set.

Second item: if this game never clears the `eligibilityGate`, sheets `01` and `03` return nothing
and only sheet `02`'s instrument produces a reading at all.

## Not decided here

The per-area realised lap, its origins, exclusions and session-spanning rule — sheet `02`, which
holds `lapClock`. D1/D7/D30 and the retention ruling — sheet `03`, which holds `retentionReadout`.
Every event id, payload field, custom-field allocation and emission cadence — event-catalog work,
which holds `telemetry`. Onboarding funnel steps, pass marks and the first-purchase read —
funnel-definition work. Faucet and sink volume, currency held and payer share — economy-flow work,
which holds `economyHealth`; the three upgrade rows' adoption is its sink volume seen from the
other side and is deliberately not read here. Every target, alarm, cadence and owner action —
KPI-shortlist work. Whether a session counter or timestamp is ever persisted — persistence-shape
work. `social.maxPlayers` — per-server-capacity work.
