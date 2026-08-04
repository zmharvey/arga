# Engagement — domain index

**Category:** Analytics · **Wave:** 5 · Reads: `HANDOFF.md`, `CONCEPT.md`, `00-CORE.md`,
`01-FOUNDATION.md`, `02-GAMEPLAY.md`, `03-META.md`, `04-PRESENTATION.md`, `05-OUTWARD.md`,
`OPEN.md` (§1–§6), `cid/analytics/_category.md`, `cid/_digest.md`, `cid/_contract.md`,
`cid/_state.md`, `cid/gameplay/core-loop/04-lap-vs-session.md`,
`cid/gameplay/balance/05-time-to-milestone.md`, `game/src/server/Persistence.luau`,
`game/src/server/Clearing.luau` (arming gate), `game/src/server/init.server.luau` (join/leave,
save loop), `game/src/shared/GameConfig.luau` (`SaveIntervalSeconds`).

*No shell in this session, so `npm run bridge -- --contract` was not run; I read
`cid/_contract.md`, which the repo states is that command's derived output, and
`cid/_state.md`'s proposed-key queue for the unmerged four.*

## What the brief gave me

| constraint | tag |
|---|---|
| *"Beating the genre's retention curve. Offered and declined."* (`00-CORE.md`, non-goals) | `[brief: binding]` ← `[you chose: R1 Q3]` |
| *"Success is **shipped artifacts, not players**"* (`00-CORE.md`) | `[brief: binding]` ← `[you chose: R1 Q3]` |
| *"8–14, mobile-heavy, short sessions"* and *"10–20 minute active sessions"* (`00-CORE.md`) | `[brief: binding]` ← `[you chose: R1 Q4]` |
| *"~70% mobile / ~25% desktop / ~5% console"* (`00-CORE.md`) | `[brief: soft]` ← `[I assumed — the split; the band was chosen]` |
| Measurement item (2): *"average time to complete an area — the pacing number nobody could source"* (`OPEN.md §2`) | `[brief: soft]` ← `[I assumed — §2 default]` |
| Measurement item (3): *"set-completion rate per set — whether depth-tiered discovery is tuned"* (`OPEN.md §2`) | `[brief: soft]` ← `[I assumed — §2 default]`, **partly obsolete**; `systems/05` made placement a seeded partition |
| Selection principle: *"all three test assumptions this spec rests on rather than reporting vanity"* (`OPEN.md §2`) | `[brief: soft]` |
| Session objective *"find at least one new relic"* → measurable *"collection count rose this session"* (`03-META.md`) | `[brief: soft]` ← `[you accepted: R6 Q3 → R5 Q3]` |
| *"**Honest weakness:** without banked offline earnings, the pull to return is materially weaker than the reference's. That was the accepted trade for permanence."* (`03-META.md`) | `[brief: soft]` ← `[you accepted: R3 Q3]` |
| Return hook: *"An unfinished area and a half-empty index"*; *"doing nothing at all was offered and declined, so **there is a retention brief — just a cheap one**"* (`03-META.md`) | `[brief: soft]` ← `[you accepted: R3 Q3]` |
| *"Cleared is permanent — overgrowth never returns"* (`01-FOUNDATION.md`) — progress is monotonic, no metric may assume a reset | `[brief: binding]` ← `[you chose: R2 Q1]` |
| *"There is no failure state"* / *"Zero tension is deliberate"* (`02-GAMEPLAY.md`) — a drop-off is a player who stopped, never one who lost | `[brief: soft]` ← `[you accepted: step 6 Q2]` |
| Priority 3 excludes **rebirth · offline accrual · codes · daily rewards · leaderboards · seasons and events** (`03-META.md`) | cuts binding; the *ordering* is `[I assumed]` |
| *"no mechanical interaction"* between players (`02-GAMEPLAY.md`) | `[brief: soft]` ← `[you accepted: R6 Q2]` |
| Live-ops: *"Ships and settles. No seasons or events."* (`OPEN.md §2`, `05-OUTWARD.md`) | `[brief: soft]` ← `[I assumed]` |
| Approved wave 1, binding on this category: *"Measure freely, display none of it"* (`theme/tone/04` D16) | approved spec, not brief |

**Upstream fields I cite, never copy.** Wave 4 is FAIL and `pacing`'s figures are moving
(`_verified-wave4.md`, RR-9 and RR-10 both move rows this domain would instrument). Every
sheet below refers to `pacing.sessionBandSeconds`, `pacing.completeLapsPerSession`,
`pacing.lapTargetSeconds`, `pacing.routeSlack`, `pacing.realisedToArrivalRatio`,
`pacing.laps[].realisedLapSeconds`, `pacing.milestones[collectionComplete]`,
`collection.relicsPerArea`, `depths.*` and `firstSession.ceilings.*` **by field name**. A
writer that transcribes a wave-4 value into a sheet has written a number that may not exist by
merge time.

## What the brief did not give me

Named, not filled. Each routed to the sheet that must decide it.

1. **No unit, no population and no pass mark for any measurement.** `OPEN.md §2` names three
   subjects and states none of the three. `OPEN.md §5` row 8 lists it among four items *"batched
   by design"* at **0 interview questions**. → units and populations to **01** and **02**; **pass
   marks are not mine and not theirs** — nothing in this project states "we ship if X ≥ Y", and
   verdict rules belong to KPI-shortlist work. Both sheets must say so rather than invent one.
2. **The brief never says what a session is.** *"10–20 minute active sessions"* is a duration
   with no boundary rule: no statement about a rejoin after a disconnect, a teleport, or an idle
   player standing still. → **01**.
3. **The brief never says how a lap that spans a session boundary is timed.** `core-loop/04`
   rules that laps span sessions and that re-entry restores place; neither it nor `pacing` says
   whether such a lap's wall clock includes the time the player was gone. Every published
   realised lap is implicitly a single-sitting lap. → **02**, and it is that sheet's hardest
   decision.
4. **The shipped save carries no time of any kind.** `Persistence.save` writes exactly seven
   fields — `currency`, `upgrades`, `rowsRevealed`, `found`, `areasFinished`, `cleared`,
   `clearedCount` — and no timestamp, no join count and no session count; `defaultState()`
   creates none either. **Session count per player, time since last session and run-index are
   therefore not derivable from game state**, only from the platform's own new-user cohort. →
   **01** states which readings this rules out and which platform reading replaces each.
   *Consequence for a neighbouring subject, not a decision of mine:* onboarding-funnel work
   inherits its run-1 population from `firstSession`, and that population is a platform cohort,
   not a save-derived flag. Persisting anything to make it save-derived is persistence-shape work
   [currently Tech & Data], and `products` F20 already shows the project treats added persisted
   fields as a decision, not a convenience.
5. **Measurement item (3) has lost its referent and the brief cannot know it.** *"set-completion
   rate per set"* presumes a discovery rate; `systems/05` removed it, so set completion is
   deterministic given areas cleared. The surviving question is *when* areas get cleared. → **01**
   states what replaces item (3) and **02** carries the instrument.
6. **The brief says nothing about who acts on an engagement reading, or whether anyone should.**
   `00-CORE.md` makes the success metric a non-player one and `OPEN.md §2` rules out live-ops. →
   **03** rules on it for retention; the general reconciliation is KPI-shortlist work.
7. **The device split has no source.** `cid/_state.md` records it as uncorroborated by anything
   wave 2 fetched. → **01**, as a free breakdown that would settle a `[brief: soft]` line, not as
   a new prediction of mine.

## Why 3 sheets

**I own none of the 25 merged contract keys, and this domain's whole output is three proposed
ones.** The split is by *data source and build cost*, because that is the only seam in this
subject a build or a dashboard actually reads differently: sheet **01** is everything the
creator dashboard already supplies with zero game-defined events, sheet **02** is the one
reading that exists nowhere and needs an emission no module produces today, and sheet **03** is
a ruling that removes a subject rather than measuring it. Splitting instead along my `owns`
list would produce five sheets, three of which would be one decision described three times:
"session length", "session count" and "playtime distribution" are one instrument read at three
aggregations, and the platform aggregates all three from the same join/leave pair. In the other
direction, folding 02 into 01 would hide the only expensive thing this domain asks for — the
lap clock is a request to logging-pipeline work with a stated reason, and it deserves a sheet a
verifier can reject on its own. **Feature adoption is assigned to nobody, deliberately**; see
below.

| # | sheet | must decide |
|---|---|---|
| 01 | `session-shape` | Propose `engagement`: define what one session is (join to leave; and what a rejoin after a disconnect, a teleport or an idle stretch counts as), its populations (run-1 versus returning, obtained from the platform's new-user cohort because `Persistence.save`'s seven-field payload carries no timestamp, no join count and no session count), which readings come free from the creator dashboard — average session time, the P50/P90 percentile filter, the platform/device and age-group breakdowns, and the **New User First Session Retention** curve, *"how many new users are still playing X minutes after joining your game for the first time"* `[research: https://create.roblox.com/docs/production/analytics/engagement]` — versus which would need a game-side emission, and where a session ends relative to the collection (`found` count and `areasFinished` read at leave, both already persisted). Then state, per reading, which published field it refutes: `pacing.sessionBandSeconds`, `pacing.completeLapsPerSession`, `pacing.milestones[collectionComplete]` against `endgame`'s open *"whether a player reaches the terminal state at all"*, `balance/05`'s floor-session-ends-inside-area-5 consequence, `theme/fantasy/02`'s promise floor, and `00-CORE.md`'s unsourced device split. State what replaces `OPEN.md §2` measurement item (3) now that `systems/05` has removed the discovery rate. Set **no pass mark and no alarm value** — say in one line that verdict rules are KPI-shortlist work and that this sheet supplies the reading only. Define no run-1 population of your own: inherit `firstSession.ceilings.*`'s exactly. Name, in order to forbid, any metric defined over a daily streak, a login window, a season or a comparison between players. |
| 02 | `lap-clock` | Propose `lapClock`: define the per-area realised-lap measurement `OPEN.md §2` item (2) asks for and that no shipped module produces — its two origins (entering an area, and the clear that empties it), its population, its exclusions, and the decision nobody has taken: **how a lap that spans a session boundary is timed**, given `core-loop/04` rules that laps span sessions and restore the player's place, so raw wall clock would charge a lap for time the player was offline. Decide whether the published figures are single-sitting laps only, and if so say what proportion of laps that discards and how the discarded ones are counted instead. State the emission as a **requirement to logging-pipeline work** [currently Tech & Data] in the form "what must be knowable, at which server decision" — the area ordinal, the player, and the two instants — and **do not name an event, a payload field or a channel**: the event catalog is the event-logging domain's, and `Protocol.luau` declares exactly seven channels, so an eighth is that domain's request to make, not yours. Name the fields this refutes: `pacing.laps[].realisedLapSeconds` (all nine rows), `pacing.lapTargetSeconds`, `pacing.routeSlack`, `pacing.realisedToArrivalRatio`, `pacing.laps[].underbuyLapSeconds`, and `depths.sizingRule` through them. Carry the 2026-08-01 playtest as **one labelled sample, n=1, untimed, developer-run** — area 1's clear time was confirmed by feel against the estimate, which is not a measurement of it. |
| 03 | `retention-readout` | Propose `retentionReadout`: rule on D1/D7/D30 given that `00-CORE.md` lists *"Beating the genre's retention curve. Offered and declined"* as a binding non-goal. Keep the three windows as a reading of **exactly one stated brief claim** — `03-META.md`'s *"the pull to return is materially weaker than the reference's"* — and of nothing else; carry an explicit `optimiseFor: false` with that citation, so restraint is data rather than an omission a verifier reads as a gap. Record that the three windows cost **zero game-defined events**: the creator dashboard supplies them with per-cohort and per-acquisition-source breakdowns and a similar-experience/genre benchmark set `[research: https://create.roblox.com/docs/production/analytics/retention]`, `[research: https://devforum.roblox.com/t/analytics-view-retention-by-acquisition-source-and-select-your-benchmark-set/4010157]`. State the session-length bucket the game's own band lands in and that bucket's published D1/D7/D30 medians as **context and not a target**, from the 2025 Roblox Benchmark Report's session-length interval table `[research: https://investgame.net/news/pdf/the-2025-roblox-benchmark-report/]`, marking the figures approximate and the sample as the GameAnalytics network. Forbid, by name, any retention metric defined over a daily streak, a login window, an event calendar, a rebirth cycle or time away accruing anything — all priority 3 — and state that no design change may be proposed to move any of these three numbers, because every mechanism that would move them is cut. |

## The contract keys this domain needs, and what each would hold

None of the three exists in `cid/_contract.md`'s 25, and none collides with wave 4's four
proposals (`tierMix`, `solvency`, `axisBudget`, `pacing`) or with this category's other four
(`telemetry`, `funnels`, `economyHealth`, `kpis`).

| proposed key | sheet | what it would hold |
|---|---|---|
| `engagement` | 01 | The session definition: boundary rule, populations, the aggregations read (mean, P50, P90), the platform-supplied source of each, the device and age breakdowns, the end-of-session collection snapshot, and the list of published fields each reading refutes. |
| `lapClock` | 02 | The lap measurement: two origins, population, exclusion rules, the session-spanning rule, the emission requirement stated as observability rather than as an event, and the `pacing` fields it refutes. |
| `retentionReadout` | 03 | The three windows with their platform definitions and sources, `optimiseFor: false` with its brief citation, `gameDefinedEventsRequired: 0`, the benchmark-set comparison, the platform bucket figures as context, and the enumerated prohibitions. |

## Considered and deliberately not assigned

For this domain this list carries as much weight as the assigned one.

1. **Feature adoption rates — not assigned.** The surface is four things: three upgrade rows and
   one index panel (`input` is closed at five verbs and four pressables). Two of the three
   upgrade readings are `economyHealth`'s sink volume read from the other side, and assigning
   them here guarantees a collision on one number. What is left is the index panel's open rate,
   and it fails both stopping-rule bars: no player would notice the figure, and no two builders
   would diverge on anything because of it. Decisively, there is nothing to do with the answer —
   *"Ships and settles. No seasons or events"* and the panel is not a surface anything would be
   changed for. `[cid: decided]` — the brief is silent on adoption entirely. If it is wanted
   later it is one field on `engagement`, not a sheet.
2. **A game-side session-length histogram — not assigned.** The platform gives an average, a
   P50/P90 filter on charts, and the first-session survival curve; it does **not** publish a full
   session-length distribution, and a standing feature request says so
   `[research: https://devforum.roblox.com/t/analytics-for-percentile-session-length/2061715]`
   (community request, no staff confirmation — the absence is inferred from the request, not
   stated by Roblox). Building our own would mean persisting per-session durations, which adds a
   field to a seven-field payload for a figure nobody would act on. Sheet 01 rules on it in one
   line; it is not a sheet.
3. **Churn signals as a separate sheet — not assigned, folded into 01.** With no failure state,
   no decay and no reset, churn has exactly one observable: a player stopped, and the collection
   was at some point when they did. That is the end-of-session snapshot 01 already defines, read
   once. A second sheet would be the same decision under a second name.
4. **A retention dashboard, of any shape — refused outright.** See sheet 03. Ruling R-3 declined
   an under-scoping finding on the same grounds; measuring D7 against a game whose
   `pacing.milestones[collectionComplete]` lands inside a single ceiling session measures the
   decision, not the execution.
5. **`social.maxPlayers` — not mine.** It is the denominator of any per-server figure and it is
   assigned to nobody (`cid/_state.md`); the architect has already picked a value inside the
   brief's 12–20. Relayed to per-server-capacity work [currently Tech & Data, this wave] so no
   sheet of mine assumes it. No reading in this domain is per-server.
6. **Anything comparative or player-visible — excluded twice over.** Leaderboards are priority 3
   and `theme/tone/04`'s D16 forbids display regardless. Every reading here is developer-facing.

## The retention ruling, stated once so it is not read as an omission

Two of my five subjects sit on a goal the brief declined. The honest reading is not "measure
nothing" and not "build a retention practice":

- **D1/D7/D30 stay, at zero cost, as evidence about one sentence the brief wrote about itself.**
  `03-META.md` predicts a weak pull to return and calls it an accepted trade. That is a
  falsifiable claim, the platform settles it without a single game-defined event, and a project
  whose stated selection principle is *"test assumptions this spec rests on rather than
  reporting vanity"* should read it.
- **They may not be optimised for, and nothing may be designed to move them.** Every mechanism
  that would — offline accrual, dailies, streaks, seasons, rebirth — is cut or priority 3.
- **The session half is not thin and is where the value is.** `pacing.sessionBandSeconds` and
  every wall-clock figure derived from it are `[playtest unknown]`; the lap is the number
  `OPEN.md §2` says nobody could source; and `balance/05`'s own `[research owed:]` names the
  session-length table as the thing that would corroborate the band. One of those two is now
  fetched (below) and the other is what sheet 02 builds the instrument for.

## Verification note

**Sheet 02 is the one most likely to be contradicted, and by two different parties.** Wave 4 has
not released: `_verified-wave4.md` is FAIL with sixteen requests, and RR-9 and RR-10 move rows
in `pacing` — every field 02 names as a refutation target may hold a different value at merge
time, which is why the sheet cites fields and not numbers, and why the writer must not
transcribe one. Second, 02's emission requirement can be refused by logging-pipeline work
[currently Tech & Data, this wave]: nothing in `game/src/` calls any analytics service and
`Protocol.luau` declares exactly seven channels, so the lap clock is the one thing this domain
asks to have built and the one thing it cannot build. If it is refused, `OPEN.md §2` item (2)
stays unanswered and 02 becomes a stated requirement rather than an instrument — which it
should say in advance.

**The likeliest boundary collision is 01 against onboarding-funnel work**, over the run-1
population. Both domains need "a first session". 01 is instructed to inherit
`firstSession.ceilings.*`'s populations verbatim and define no second one; if the funnels sheet
does the same, there is one definition and no collision. If either invents one, there are two
definitions of a first session in one category, which is the wave-3 defect (`meta/05` against
`firstSession.placement`) repeating in a new place.

**Sheet 03 is the one a verifier is most likely to mistake for under-service.** Its correct
length is short and its conclusion is that two thirds of a conventional retention instrument set
must not exist here. `cid/analytics/_category.md` records the same judgement in advance.

## Research owed

`must_verify` is **empty** for this node in `docs/cid-workflow.json`. I fetched anyway, because
whatever I bank is the only external evidence my writer can cite.

**Fetched and usable:**

- Roblox creator-docs, retention — D1/D7/D30 definitions verbatim, daily and weekly cohorts, and
  the statement that the core metrics require no developer setup.
  `[research: https://create.roblox.com/docs/production/analytics/retention]`
- Roblox creator-docs, engagement — average session time defined as *"the total time users spend
  in your game divided by the number of sessions"*, and the **New User First Session Retention**
  chart, *"how many new users are still playing X minutes after joining your game for the first
  time."* That chart is the highest-value free instrument this domain found.
  `[research: https://create.roblox.com/docs/production/analytics/engagement]`
- Roblox creator-docs, analytics dashboard — the Filter By dimensions (age group, country,
  platform, OS, memory group, acquisition source, payer status), the average-versus-percentile
  toggle with P50 and P90, and the benchmark band explanation.
  `[research: https://create.roblox.com/docs/production/analytics/analytics-dashboard]`
- Roblox devforum announcement — retention by acquisition source, and a selectable
  similar-experience or genre benchmark set covering average playtime and D1/D7/D30, *"for
  comparison only"*.
  `[research: https://devforum.roblox.com/t/analytics-view-retention-by-acquisition-source-and-select-your-benchmark-set/4010157]`
- **The 2025 Roblox Benchmark Report's session-length interval table** — the item
  `cid/gameplay/balance/_lead.md` records as `[research owed:]` and says *"nothing here cites
  it."* It buckets experiences by average session length (0–3, 4–6, 7–12, 13–18, 19–24, 25+
  minutes) and reports sessions-per-day and D1/D7/D30 by bucket, on a GameAnalytics-network
  sample stated as ~47% of total Roblox engagement. **The brief's 10-to-20-minute band straddles
  two populated buckets, so `pacing.sessionBandSeconds` is not an implausible band** — that is
  the whole of what this source settles, and it settles it for the band, not for this game.
  `[research: https://investgame.net/news/pdf/the-2025-roblox-benchmark-report/]`

**Caveats that must survive into the sheets, not be quietly dropped:**

- The interval-table figures are read from a **secondary summary** of the report, and several
  are approximate in the source ("~", "nearly", "just under"). Sheet 03 must reproduce them as
  approximate and attributed, never as a target and never rounded into a clean number. The
  primary artifact was not fetched: the settling fetch is **a direct copy of the 2025 Roblox
  Benchmark Report PDF, its session-length interval and retention-by-interval tables**.
- **No page states that the dashboard exposes a full session-length distribution.** The
  creator-docs engagement page names only the average; the dashboard page documents a P50/P90
  filter on charts; a standing devforum feature request asks for percentile session length and
  carries no staff reply. The absence is therefore **inferred, `[unverified]`**. The settling
  fetch is **a current screenshot or doc page of the Engagement analytics page showing its
  complete chart list**, which needs an account and is outside what this session can reach.
- `balance/05`'s other `[research owed:]` — *"a timestamped capture of the first 120 seconds of
  place 133086043677134"* — is **not fetched and is not mine**; it anchors first-purchase timing,
  which is onboarding-funnel work.
- The 2026-08-01 playtest is **n = 1, the developer, untimed**, and four of its five observations
  are confirmations-by-feel of predicted quantities. It is recorded in no sheet and no `cid/`
  file; `cid/analytics/_category.md` gap 8 routes that structural absence to whoever holds run
  state. Both 01 and 02 must label it as one sample and may not treat it as a measurement.
