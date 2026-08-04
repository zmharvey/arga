# 04 — The payoff-gap instrument

**Domain:** analytics/events · **Category:** Analytics · **Wave:** 5

## Decision

**Two server-side clocks per player, both monotonic elapsed seconds from the session start, both
computed in the telemetry module and never reconstructed downstream.** The above-tick gap is
carried as the numeric `value` of the event that ends it, *and* as a running maximum on
`session_end`; the tick gap is carried only as a running maximum, bucketed into five values on
`session_end`'s third custom field. **This sheet owns the per-session pass predicate; KPI-shortlist
work owns the population-level alarm.** **This is the only instrument in the game that can settle
`_verified-wave4.md` finding 5.**

This sheet carries no manifest block: it decides `telemetry.clock`, `telemetry.aboveTickPayoffs`,
the `value` of four events and `session_end.verdictOwnedBy`, all supplied by sheet `01`.

## Why

- **The set of above-tick payoffs is `core-loop/02`'s four names, taken verbatim and not reopened:**
  Find reveal, upgrade purchase, area completion, set completion. The currency tick is the fifth
  kind and is the texture the ceilings are stated against, so it is definitionally excluded from
  the above-tick clock and is the entire subject of the second one.
- **The clock is elapsed seconds from the session start, held in `telemetry.sessionRecord`.** Origin
  is the `session_start` emission instant; the unit is `os.clock()` deltas, which are monotonic and
  unaffected by any wall-clock change. It is never persisted, never on the wire, and never an
  absolute date — sheet `02` `N23` forbids the last of those and nothing here needs one.
- **The first above-tick gap of a session is measured from the origin, so one definition serves two
  published figures.** `firstSession.ceilings.secondsToFirstReveal` is `measuredFrom: "join"`, and
  the gap from session start to the first `find_revealed` *is* that figure. No second field, no
  second definition, and no risk of the two drifting.
- **The gap is computed server-side and carried, rather than differenced downstream, for two
  independent reasons.** Nothing holds a session id in a form a dashboard can group by without the
  telemetry module supplying one, and — the harder reason — sheet `03` rules that a throttled event
  is **dropped silently and never retried**, so a difference of two events is a quantity that
  silently becomes wrong rather than becoming absent. A number computed before emission is either
  present and correct or missing.
- **The carried value is the gap *and* the maximum, not one of them.** The per-event gap gives the
  distribution `pacing.laps[*].revealGapMaxSeconds` is a claim about; the running maximum survives
  dropped events and is the only form that can refute a figure stated as a maximum. Finding 5's
  complaint is precisely that the published above-tick figure *"is a mean presented as a maximum"*,
  with a real worst case past the ceiling `[research: cid/gameplay/_verified-wave4.md]`. A mean of
  emitted gaps would reproduce exactly the error being checked. **The maximum is the sufficient
  statistic for a ceiling, and it is one number per session.**
- **`area_cleared` is the one above-tick event whose value is not the gap, and the purchase carries
  no gap at all.** `area_cleared.value` is the realised lap, because `OPEN.md §2` item (2) — *"the
  pacing number nobody could source"* — has no other carrier and `LogCustomEvent` gives one numeric
  slot. The purchase is a `LogEconomyEvent` whose `amount` is the price, and that API has no free
  numeric field. **Both contributions survive in the running maximum**, which is what makes the
  maximum load-bearing rather than redundant.
- **The tick ceiling needs its own clock because it is a different predicate.** *"A moving player is
  paid at least once every 3 seconds"* counts *any* payment, including a patch clear, and applies
  only while the player is moving. `tickPlayer` already reads the character root's position; keeping
  the previous XZ per player makes "moving" testable at zero cost, at a displacement threshold of
  **0.1 studs per tick** `[playtest unknown]`, test range 0.05 to 0.5.
- **That second clock is the instrument for the finding nobody has an instrument for.**
  `_verified-wave4.md` records an end-of-lap walk-back of tens of seconds at the deepest ordinals
  and notes that `pacing.tickGapRealisedSeconds` *"is an in-area average and excludes it"*. A player
  walking back over cleared ground is moving and is not being paid, so the walk-back lands in the
  top buckets by construction. **The buckets are placed at the ceiling:** `le3`, `3to5`, `5to10`,
  `10to30`, `gt30`. A session that never leaves `le3` is a session in which the 3-second rule held.
- **Values must be strings in a custom field**
  `[research: https://create.roblox.com/docs/production/analytics/custom-fields]`, which is why the
  tick maximum is bucketed. The boundaries are the design's own thresholds, so the lost precision
  costs the predicate nothing.
- **The verdict was circular in two sheets, and the fix is a split rather than a hand-off.** This
  sheet's first draft handed the population, the pass mark and any target to KPI-shortlist work;
  `kpis/02` then declined the row on the ground that the instrument is this sheet's. A quantity
  whose verdict each sheet routes to the other reaches no reader at all. **The split, and it is a
  real seam rather than a compromise:** the *per-session pass predicate* is a property of the
  instrument and belongs here, because both ceilings are already published design values and the
  predicate invents no number — a session passes when its `maxPayoffGapSeconds` is at or under
  `pacing.aboveTickGapMaxSeconds` and its `maxtick` bucket is `le3`. The *population-level alarm* —
  what share of sessions may fail before anyone acts, over what minimum sample, and what the action
  is — is a project-level judgement and stays KPI-shortlist work's, which is the half that does
  require inventing a number. `[cid: decided]`
  **Both sheets now state that same boundary, reached independently.** `kpis/02` carries
  `rows[aboveTickPayoffGapSeconds]`, setting the target, the alarm and the actor and citing
  `telemetry.events[session_end].maxPayoffGapSeconds` as build-read. Nothing here asks it to change.

### What resets, pauses and excludes

| rule | behaviour | why |
|---|---|---|
| session start | both clocks start; `lastAboveTickSeconds` is the origin | so the first gap is the join-relative time to first payoff, matching `firstSession.ceilings.secondsToFirstReveal`'s origin |
| an above-tick payoff lands | the above-tick gap is emitted, the running maximum is updated, `lastAboveTickSeconds` is set to now | this is the only thing that resets it |
| a patch clears | the tick clock resets; the above-tick clock is untouched | a tick is a payment, not an above-tick payoff |
| the character is not moving | the tick clock **pauses** | the predicate is about a *moving* player; a standing player is not owed a payment |
| before the arming transition | both clocks accumulate, neither maximum updates | *"a player who has not moved is not failing"* (`onboarding/02`); the interval is still measured so a slow arm shows in `run_armed.value` |
| `onDeath` to the next arming transition | both clocks **pause**, and `lapHadReset` is set | there is no character, nothing can be paid, and charging the interval measures `runtime.respawnDelaySeconds`. The flag is the lap field's, not this clock's |
| area advance | **no reset.** The completion is itself an above-tick payoff and resets the clock by being one | a second reset here would hide the gap the walk-back to the next bay produces |
| any value of `area_cleared`'s `lap` field | **no effect on either gap clock** | `lap` is `telemetry.sharedPredicate`'s dimension, read by `lapClock` to exclude a *lap value*; a gap accumulated inside this session is real whatever the lap's entry was, so `spanned` and `fallback` censor nothing here |
| `found == totalFinds` | the above-tick maximum **stops updating**; the tick clock continues | `meta/07` scopes the 90-second rule to `found < totalFinds`, and two of the five payoff kinds are extinct past it |
| session end | both maxima are emitted on `session_end` and the record is destroyed | nothing crosses a session boundary; there is no persisted clock and none is requested |
| a session with zero above-tick payoffs | `session_end.value` is the sentinel **`-1`** | an open interval is not a gap. Such a session is still caught: its reveal and completion counts are zero and its tick bucket is `gt30` |

## Consequences for other work

- **KPI-shortlist work** keeps the half that needs a judgement and this sheet keeps the half that
  does not: `kpis.rows[aboveTickPayoffGapSeconds]` sets the target, the alarm, the actor and the
  minimum sample; the per-session predicate is stated here and cited from there. Two sheets, one
  boundary, no second answer for one number.
- **Cadence-predicate work (`core-loop/01`)** gets both of its ceilings made falsifiable, as maxima
  rather than means — the shape its rules are written in, and the shape `_verified-wave4.md` finding
  5 says the published figure is not. The 90-second rule's scoping to `found < totalFinds` is
  implemented as an exclusion, so `meta/07`'s guard needs no second statement anywhere.
- **Logging-pipeline work** inherits the whole per-player record: two clock accumulators, two
  running maxima, `lastAboveTickSeconds`, `lastTickPositionXZ`, the three lap flags, and the pause
  and resume rules above. All of it is in-memory, keyed by `UserId`, destroyed on leave — the shape
  `init.server.luau` already uses for `spawnPoses`. **Nothing is added to `stateShape` and nothing
  crosses the wire.**
- **Clearing work** inherits one field: `tickPlayer` must retain the previous tick's XZ position per
  player. One `Vector3` per connected player, read nowhere else.
- **Session and lap-clock work** should note that the `lap` field governs the lap value only.
  Neither clock here is paused, reset or censored by it, so a lap marked `spanned` or `fallback`
  still contributes its in-session gaps to both maxima. That is the one place the two readings
  deliberately disagree, and `telemetry.sharedPredicate` is where the field itself is defined.
- **Balance work** should know which claim moves. If the realised maximum comes back above
  `pacing.aboveTickGapMaxSeconds`, the failing field is `pacing.aboveTickGapRealisedSeconds` and
  whichever payoff kind `aboveTickGapCarriedBy` currently names. This instrument does not settle
  *which* fix; it settles whether there is a problem. Note that `pacing.laps[*].revealGapMaxSeconds`
  on disk already exceeds `aboveTickGapMaxSeconds` at one ordinal, which is exactly the case it
  exists to catch.
- **Bay-geometry work (`meta/06`)** gets the walk-back measured rather than argued. Its own estimate
  and `balance/03`'s larger one predict different tick-gap buckets.

## Acceptance criteria

1. `telemetry.aboveTickPayoffs` has exactly 4 entries and their `kind` values are `findReveal`,
   `upgradePurchase`, `areaCompletion` and `setCompletion` — `core-loop/02`'s four names, no fifth.
2. `session_end.value` is `maxPayoffGapSeconds` with sentinel `-1`, and `telemetry.clock.excludes`
   names `deathToRearm`, `postTerminal` and `characterNotMoving` — and does not name any `lap` value.
3. `session_end.verdictOwnedBy` names this sheet for the per-session pass predicate and
   `kpis.rows[aboveTickPayoffGapSeconds]` for the target, alarm and actor; neither half is described
   as deferred to the other, and no sheet in this domain declines the row. The predicate cites
   `pacing.aboveTickGapMaxSeconds` as a field and copies no number.
4. `session_end`'s third custom field is a 5-value string enum whose lowest boundary is 3 seconds
   (`le3`, `3to5`, `5to10`, `10to30`, `gt30`), matching `core-loop/01`'s tick ceiling.

## Not decided here

The share of sessions that may fail the predicate before anyone acts, the minimum sample below which
no rate may be read, the target and the action a breach triggers — KPI-shortlist work, which owns
every number that has to be invented rather than cited. Which events exist and what they carry —
sheet `01`, this domain, which holds the key and defines the `lap` field in `sharedPredicate`. How
much may be emitted and what a dropped event means — sheet `03`, whose drop rule is why the maximum
exists. The values of `pacing.aboveTickGapMaxSeconds`, `pacing.tickGapRealisedSeconds` and every lap
figure — Balance, and wave 4 has not released. The lap's population, its exclusion verdicts and its
aggregations — session and lap-clock work; this sheet supplies the number on `area_cleared` and
rules nothing about how laps are counted. Whether the displacement threshold survives contact with a
real character controller — `[playtest unknown]`, 0.1 studs, test range 0.05 to 0.5. How the module
is built — logging-pipeline work.
