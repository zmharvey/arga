# Analytics — verification

**Status: FAIL**
Sixteen revision requests, four of them cross-domain contradictions inside this wave. Check 1 is
additionally **blocked** on categories that have not run, so even with every request closed this
category releases at PARTIAL until wave 7. The wave gate does not open.

Read this run in full: 22 sheets (`_category.md`, five `_lead.md`, sixteen numbered), plus
`cid/_contract.md`, `cid/_state.md`, `cid/_playtest.md`, `cid/gameplay/balance/02`–`05`,
`cid/gameplay/_verified-wave4.md`, `cid/gameplay/onboarding/02`, `cid/gameplay/systems/05`,
`cid/tech/networking/02`, `cid/tech/performance/01`–`02`, `bridge/merge.mjs`, `bridge/schema.mjs`,
`game/src/server/Clearing.luau`, `Plots.luau`, `Progression.luau`, `Persistence.luau`,
`init.server.luau`, `docs/cid-workflow.json`.

## Check results

| # | check | result | evidence |
|---|---|---|---|
| 1 | every measurable claim in any category has a matching event | **BLOCKED** | Art & Visuals and Audio (wave 6) and Live Ops and Discovery (wave 7) have not run; Gameplay's numeric layer is `_verified-wave4.md` **FAIL**, unreleased; Tech & Data and UI/UX ran concurrently with this category. Within what exists on disk, one real hole: `cid/tech/performance/02` lines 247–251 states that every `[playtest unknown]` in `budgets` and `serverCost` is settled by a MicroProfiler or Developer Console reading and that **"no sheet owns it — not in `cid/`, not in `architect/`"**. That is a stated cross-contract gap Performance raised itself, not an Analytics omission; Analytics' `does_not_own` excludes the pipe. The check cannot be completed before the final pass. |
| 2 | every event has a consumer: a funnel, a metric, or a KPI | **FAIL** | 6 of `telemetry.events[]`'s 13 have no consumer in `funnels`, `engagement`, `lapClock`, `retentionReadout`, `economyHealth` or `kpis`: `session_start`, `session_end`, `set_completed`, `upgrade_refused`, `save_written`, `slot_claimed`. `session_end` is the damaging one — it carries `maxPayoffGapSeconds`, `events/04` hands the pass mark to "KPI-shortlist work and funnel-definition work" (line 122), and `kpis/02` declines `aboveTickPayoffGap` under `K1` on the ground that "the timestamped instrument is telemetry's payoff-gap sheet". Circular; see RR-16. `set_completed` was orphaned by `engagement/01`'s `item3Replacement` and `kpis`' `setCompletionRatePerSet` decline, both individually correct. See also the check-narrowing note below. |
| 3 | every KPI has a target, an alarm value, and a stated owner action | **PASS** | `kpis/02` rows 1–7: each carries `targetRef` (row 7 `kind: commandOutput` with five `command`/`field`/`target` assertions), `alarm` with `basis` or `status`, `actorKindOfWork` + `currentHolder`, and an `action` naming a sheet path and a field. I resolved five target paths against disk rather than trusting them: `pacing.sessionBandSeconds` (`balance/05:139`), `pacing.laps[].realisedLapSeconds` (`:145`–`153`, nine rows), `firstSession.ceilings.secondsToFirstReveal.max` (`onboarding/02:90`), `pacing.oneFindPerSessionRisk.floorSessionFinds` (`:167`), `discovery.repeat.possible` (`systems/05:102`). All five resolve. The check passes on content; the machinery meant to make it mechanical does not (RR-14). |
| 4 | the funnel set covers the measurement questions the brief actually asks | **PASS** | `OPEN.md §2` item (1) → `funnels/01` step 3 (`firstReveal`, `measuredFrom: join`, population inherited byte-for-byte from `firstSession.ceilings`) and `funnels/04` T4/T5. Item (2) is not a funnel and is correctly routed to `lapClock` under the graph's `does_not_own` ("long-run retention curves (Engagement)"). Item (3) is correctly ruled partly obsolete against `systems/05`'s seeded partition and replaced by the `areasFinished` distribution at zero cost (`engagement/01` `item3Replacement`). The first-purchase funnel is correctly declared non-existent with six enumerated closures, each naming its prohibition (`funnels/03`); I checked all six against `products` and `Entitlements.luau` and found no step that is in fact observable. Six of seven `firstSession.teaching[]` rows dispositioned, one declared unobservable with the specific channel that would close it. One defect inside an otherwise sound set: RR-11. |
| 5 | nothing collected exceeds what the brief's audience age band allows | **PASS** | Audience is *"8–14, mobile-heavy, short sessions"* (`00-CORE.md:40`) `[brief: binding]`. The catalog defines **no player identifier at all** — `LogCustomEvent(player, …)` takes a `Player`, so identity is the platform's. I ran all 24 `N1`–`N24` observables over the union of every declared field name in the category (`area`, `owned`, `load`, `maxtick`, `spawn`, `slot`, `set`, `finds`, `row`, `reason`, `find`, `outcome`, `sinceJoinBucket`, `ownsSpan`, `runOrdinal`, `areaOrdinal`, `entitlement`, `valueLevel`, `heldLevelAfter`) and every declared value: **zero matches on any row**. `N23` forbids an absolute timestamp; `N24` forbids an unbounded field and is enforced by a finite `combinedValuesUsed`. The open item — whether `AnalyticsService` readings are suppressed for under-13 accounts — is a question about **data availability**, not about permission to collect, and it is correctly tagged `[unverified]` in `events/02` and `[research owed:]` in `economy/03` with the same settling fetch. It does not gate this check. The Terms-of-Use claim (*"users are only allowed to be identified by their user ID"*) is `[unverified]` and, correctly, nothing rests on it: `N9` stands on `social.forbidden` `X7` alone. |

**Escalation on check 2 — the check is narrower than the work.** Event Logging built its admission
test around `refutes: {sheet, field}` — *"an event that settles no stated prediction is a merge
failure rather than a matter of taste"* — and all 13 events carry one. That is a stronger test than
"a consumer exists", because a consumer can itself be vanity. **Check 2 should be narrowed to:
"every event either has a consumer or a `refutes` path that resolves to a live field, and no event's
verdict is handed to a domain that declined it."** Under that wording five of the six orphans pass
and `session_end` still fails, which is the right answer. I am recording the FAIL against the check
as written and issuing exactly one revision request from it.

## Universal invariants

- **No sheet contradicts a `[brief: binding]` item.** PASS. Checked each binding line individually:
  `X10`'s display ban (no sheet requests a surface; `funnels/04` `X8`, `engagement/01` `E7`,
  `economy/03` `E1`, `kpis/01` `K7` each close it independently), both declined non-goals
  (`retentionReadout.optimiseFor: false` with its citation; `kpis` declines revenue and retention
  under `K3`), 8–14, *"cleared is permanent"* (no reading assumes a reset; `N19`, `E3`, `P4`), and
  *"no mechanical interaction"* (`N11`, `E6`, `K8`).
- **2–4 acceptance criteria per leaf sheet.** All sixteen carry exactly 4. I re-ran six by hand:
  `events/01` #1 (13 ids against the regex and 32 chars — all pass), #3 (936 = 9 × 2 × 52, and I
  recounted field-3's 51 distinct values row by row: 2+5+2+3+4+4+3+2+24+2 — correct), #4 (all 13
  insertion points resolve to real functions in `game/src/server`), `funnels/01` #3 (7 × 2 × 3 = 42
  ≤ 8,000), `economy/01` #3 (9×2×21 + 9×2×20 = 378 + 360 = 738). **One fails:** `economy/03`'s
  criteria 1–3 assert row counts against `economyHealth.dormant`, `.structurallyAbsent` and
  `.forbidden`, which are prose strings in the merged value (RR-5, RR-6).
- **No priority-3 content specced.** PASS. Every appearance is the compliant named-to-forbid form:
  `N13`–`N20`, `X1`–`X12`, `E1`–`E5`, `P1`–`P8`, `D1`–`D5`, `K8`.
- **No capability absent from the Build Capability Registry.** PASS. No analytics sheet names a
  `ui-forge` pattern, screen, emitter or brief as something to build. The only two mentions are
  negative checks in `funnels/03` ("zero screens, ui-forge patterns or briefs name a store").
- **Every `[research: url]` is a real fetched source.** PASS mechanically — `cid:verify` gates cited
  URLs against `cid/_research/pack.md` and reports 0 failures this run. Two notes, neither a
  request: several tags carry repo paths rather than URLs (`[research: game/src/…]`,
  `[research: repo — grep]`), which is a convention drift the gate does not catch; and
  `events/01:24` cites `[research: cid/analytics/_category.md]` in support of a claim its own
  category brief does not source, which is circular.
- **Every `[cid: decided]` is flagged upward.** PASS. All appear in a Decision or Why section or as
  a manifest `status`. `kpis/01` goes further and carries a `## Flagged to the developer` naming two
  narrower readings of the binding line it interprets, which is the right shape for a judgment call.

## Revision requests

### `cid/analytics/events/03-emission-budget.md` — the faucet's cadence contradicts `economyHealth`
**Violates:** check 2; one call site, two answers.
**Fix:** the cadence table rules the patch clear is *"aggregated to one `LogEconomyEvent` source per
**area completion**"* and acceptance criterion 2 enforces it; `economy/01` rules a **128-patch
window** with flushes on area completion, session end and a `value`-level change. At the on-disk
footprints that is ~1 versus ~9.5 events per area, and it changes the arithmetic downstream:
`realisedValuePerPatch` divides `amount` by `batchPatchCount`, which is wrong if the emission is
per area. Adopt the 128-patch window — it is forced, not preferred, because the `valueLevel` flush
that makes `amount / N` comparable to `tierMix.byDepth[d].expectedValuePerPatch` cannot exist under
per-area emission — and restate the cadence row and criterion 2 over `economyHealth.flows[patch-clear]`.

### `cid/analytics/events/01-event-catalog.md` — `economyCallSites[0].cadence` carries the same wrong string
**Violates:** the same.
**Fix:** change `"cadence": "aggregated per area completion"` to reference
`economyHealth.flows[patch-clear].batchPatchCount` and its flush list, so one sheet states the
granularity and the other points at it.

### `cid/analytics/economy/01-currency-flow-and-holdings.md` — budgets the faucet against 440/min where `telemetry` rules 320
**Violates:** two keys, two answers for one number.
**Fix:** the prose says *"→ 440/min for everything the game emits"* and `batchRule`'s denominator is
`(120 + 20 * runtime.maxPlayers)`. `events/03` rules the per-server allowance is
`20 × runtime.maxPlayers` = **320**, with the flat 120 excluded because the `CCU` scope is
`[unverified]` and the conservative reading is taken. Replace both with a reference to
`telemetry.budget.perServerRequestsPerMinute`. The conclusion survives — the minimum batch moves
from 76 to ~105 and 128 still satisfies it — but the published denominator must not disagree.

### `cid/analytics/economy/01-currency-flow-and-holdings.md` — the solvency-disagreement paragraph is wrong in three places
**Violates:** a sheet may not misstate a figure it attributes to a named artifact.
**Fix:** the sheet says *"`solvency` on disk publishes `ladderTotal` 260,898 against
`areaLedger[6].cumulativeIncome` **71,233** (ratio **3.663**), while `_verified-wave4.md` ruled
**244,839 against 113,880** correct — a ~60% disagreement on the income side."* On disk,
`balance/03:121` publishes `cumulativeIncome` **70,017** and its own `tests.S1` states *"260898 >
70017, ratio **3.726**"*. 71,233 / 3.663 is `_verified-wave4.md` **round 2**'s re-derivation
(lines 403–404), not the disk. 244,839 is **round 1**'s superseded total (line 114), and its ruled
ratio is ×3.263, which is 244,839 / **75,033**, not / 113,880 — that pairing gives **×2.15** and
matches nothing anyone ruled. **The live disagreement is ~1.7% on the income side, not 60%.**
Restate it by field name, or correct all four figures and the ratio.

### `cid/analytics/_category.md` — the same arithmetic, and this is where it was introduced
**Violates:** the same.
**Fix:** *"`balance/03` puts the ladder total at 244,839 against cumulative income of 113,880 — a
×3.26 solvency ratio"* is false: 244,839 / 113,880 = **2.15**. The ×3.26 pair is 244,839 / 75,033,
and both figures are superseded by round 2's 260,898 / 71,233. Fix the line and the identical claim
at line 124 (*"the ×3.26 solvency ratio"*), which four sheets inherited.

### `cid/analytics/economy/03-what-this-economy-cannot-report.md` — its rows exist only as prose
**Violates:** "a sheet carries a manifest block or names the key it would need"; its own criteria 1–3.
**Fix:** `dormant` (2 rows), `structurallyAbsent` (2 rows) and `forbidden` (`E1`–`E7`) are tables in
markdown and nothing else, so this sheet's criteria — *"has exactly 2 rows … each with `blockedBy`"*,
*"has 7 rows, `E1` through `E7`, each with a non-empty `closedBy` and `observable`"* — cannot be run
against the merged value. Emit a fenced `{"amends": "economyHealth"}` block carrying all three
arrays. `bridge/merge.mjs:104` recognises `amends` in any fence and this is exactly what
`funnels/02`–`04` already do.

### `cid/analytics/economy/01-currency-flow-and-holdings.md` — three manifest fields are filenames
**Violates:** the same.
**Fix:** `"dormant": "rows written by cid/analytics/economy/03-…md"` and the two beside it hand a
consumer a sentence where the sheet promises rows. Delete the three placeholder strings once `03`
emits its `amends` block; the merger composes them.

### `cid/analytics/events/01-event-catalog.md` — `funnelCallSites[]` describes a different funnel from the one `funnels` specced
**Violates:** check 2; one call site, two answers.
**Fix:** this sheet lists four onboarding-funnel sites — `onJoin` after `Persistence.load`, the arm
transition, the `FindRevealed` fire, and **`onPurchase` at the `UpgradeApplied` fire**.
`funnels/01` specifies **six** steps at six emitters, only `FindRevealed` matches, its step 1 is
`onSpawn` (which this sheet dispositions "no event"), its step 2 is the first `Progression.award` of
the life (the arm transition is the *origin*, not the emitter), and `funnels/03` rules there is **no
purchase funnel at all** — so the fourth site is a step in a funnel that does not exist. Replace all
four with `funnels.onboarding.steps[].emitter` verbatim.

### `cid/analytics/events/03-emission-budget.md` — the funnel-step cap is arithmetically stale
**Violates:** the same.
**Fix:** the cadence table's *"onboarding funnel steps · at most 4 per player ever"* is 6 under
`funnels/01`. Two extra once-per-user requests do not move the rate verdict; the row must still say 6.

### `cid/analytics/funnels/01-onboarding-funnel.md` — ownership is encoded two ways for one dimension
**Violates:** two keys, two answers for one number.
**Fix:** `customFields[CustomField02]` is `ownsSpan` with values `["owned", "notOwned"]`;
`telemetry.customFields.field02` is `owned` with values `["none", "span"]`, in the same field
position, for the same fact. No mapping is stated anywhere, so a breakdown over funnel steps cannot
be joined to one over custom events. Adopt `["none", "span"]`.

### `cid/analytics/funnels/01-onboarding-funnel.md` — `O1` rests on a platform behaviour the sheet does not tag
**Violates:** `[unverified]` discipline; the sheet contradicts itself.
**Fix:** the argument for spending the scarcest field in the category on `sinceJoinBucket` is that it
is *"the only thing that survives step auto-completion"* and that *"the ordering defect is visible
only in the per-step custom-field breakdown"*. Two sourced sentences interact and the sheet only
uses one: *"if you skip a step, the earlier steps automatically complete"* **and** *"if a user
repeats a step, the funnel only considers the first instance."* In the exact case `O1` exists to
catch — step 6 before steps 4 and 5 — the first instance of step 4 is the synthetic auto-completion,
which carries no custom field, and the player's real step-4 emission is a repeat. Whether the bucket
lands at all is undocumented. The sheet elsewhere concedes *"it would not have caught it in
production"*, which contradicts `O1.whyItExists` and `T12`. Tag the interaction `[unverified]` with
a settling fetch, keep one of the two statements, and state what the field buys if the
auto-completed step carries no value.

### `cid/analytics/funnels/04-drop-off-thresholds.md` — `T5` publishes the headline number `kpis` owns
**Violates:** the boundary `funnels/01`, `kpis/_lead` and `kpis/02` all three assert.
**Fix:** `T5` sets `passMarkRef: firstSession.ceilings.secondsToFirstReveal.max` on
`steps[firstReveal].secondsP90`, marks it `"headline": true`, and calls it *"the headline"*.
`funnels/01` says *"it sets the headline target"*; `kpis/02` row 3 says *"if `funnels` publishes a
pass mark on P90 or P50 of this same quantity, one number has two answers and one of them must be
withdrawn."* Drop `headline` and the P90 pass mark from `T5`, keep the reach threshold at `T4`, and
point `T5` at `kpis.rows[secondsToFirstReveal]`.

### `cid/analytics/funnels/04-drop-off-thresholds.md` — the `minimumSessions` arithmetic is falsified by its own table
**Violates:** a stated derivation must be true.
**Fix:** *"±5 percentage points — finer than the smallest pass-to-alarm gap below, which is 10
points."* `T1`'s gap is **0.5** points (0.995 → 0.99) and `T12`'s is **5**. At n = 200 the interval
is ±1 point at p = 0.995 and ±3 at p = 0.95, so `T1` cannot be separated from its alarm at the
stated minimum and `T12` is at the edge. Correct the sentence and either give `T1` and `T12` their
own larger minimum or widen their gaps.

### `cid/analytics/events/01-event-catalog.md` — `area_cleared` cannot carry the exclusion `lapClock` requires
**Violates:** check 2; a metric whose defining field has nowhere to ride.
**Fix:** `lapClock.emissionRequirement.mustBeKnowable` includes *"whether that origin was a join
rather than a prior completion"*, and `lapClock` publishes `spannedLapCount` beside every realised
row precisely so a lap begun in a previous session never enters the median. `area_cleared`'s three
field positions are `area`, `owned` and `finds`, so nothing distinguishes a spanned lap from a
single-sitting one, and its `valueUnit` ("session-spanning time excluded") describes neither the
rule `lapClock` took (C, exclude the lap) nor the one it rejected (B, sum the intervals). Carry the
lap origin in field 3, or state the resolution — pooling spanned laps into `realisedLapSeconds` is
the exact inflation rule C exists to prevent.

### `cid/analytics/engagement/01-session-shape.md` — forbids the field `funnels` is requesting in the same wave
**Violates:** two domains, two instructions to one owner.
**Fix:** *"Its run-1 cohort is the platform's new-user cohort and **cannot** be a save-derived flag"*
is addressed to onboarding-funnel work, which spends `CustomField03` on `runOrdinal` and requires
`stateShape.runOrdinal` from persistence work. Either persistence adds the field and this sentence
is false, or it does not and `funnels`' populations P2/P3/P4 — 14 of 17 thresholds — are permanently
unreadable. Narrow the sentence to *"no persisted field distinguishes run 1 today"* and name
`funnels`' request rather than closing it.

### `cid/analytics/kpis/02-the-shortlist.md` — `schemaRequirement` cannot be implemented as written
**Violates:** "stated as implementable"; it is the sheet's own headline finding.
**Fix:** four blockers, all inside the six bullets. (1) Bullet 1 admits *"numeric or `*` array
indices"* in a ref path; bullet 6 rules *"`targetRef.path` must contain no numeric literal"* — but
`solvency.areaLedger[6].cumulativeIncome` contains one, as an index. State the rule that separates
an index from a value. (2) `*` has no quantifier: must every element resolve, or one?
`pacing.laps[bay]` carries `cumulativeSeconds: null` and `revealGapMeanSeconds: null`, so
present-but-null needs a verdict too. (3) Row 7 carries `"predictionRefuted": {"path": null}`, and
the exemption bullet covers `targetRef.kind: "commandOutput"` only. (4) The requirement claims to
serve three keys that encode references three incompatible ways — `kpis` a dotted string, `funnels`
an array of dotted strings in `refutes[]`, `economyHealth` a `{key, field}` object whose `field` is
sometimes prose (*"gameplay/meta/01 acceptance criterion 3, the stated 700 to 1200 band"*). Name one
normalised ref shape all three emit, or the check serves one key.

### `cid/analytics/events/01-event-catalog.md` — `slot_claimed`'s value is not the quantity the sheet says it is
**Violates:** a reading must be true of the code it names.
**Fix:** `valueUnit` reads *"1-based slot index, which equals the occupied lane count because
claiming is lowest-free-index and slots stay contiguous."* `Plots.claimSlot` (`Plots.luau:485`)
scans upward from 1 for the first free index and `Plots.releaseSlot` frees any index, so after one
mid-session leave the two quantities diverge: with slots {1,3} occupied, the next claim returns
**2** while occupancy is **3**. The event's stated purpose is the realised co-presence population,
which this systematically understates under exactly the churn a 16-player server has. Emit the
occupied count, or drop the equality and stop describing it as a presence reading.

### `cid/analytics/kpis/02-the-shortlist.md` — the payoff-gap instrument's verdict is owned by nobody
**Violates:** check 2.
**Fix:** `events/04` builds the only instrument that can settle `_verified-wave4.md` finding 5 and
hands *"the population, the pass mark and any target to KPI-shortlist work and funnel-definition
work"*. `funnels/04` sets no threshold on it. `kpis/02` declines it (`aboveTickPayoffGap`,
`failsRule: K1`) on the ground that *"the timestamped instrument is telemetry's payoff-gap sheet"* —
which is the sheet that routed it here. Either admit the row, or extend its `declined[]` entry to
record that its verdict is unowned and name the kind of work that takes it. A whole sheet's output
currently reaches no reader.

## Predicted cross-category conflicts

Recorded for the final pass; none is a failure today.

1. **Every key here depends on a module nobody owns.** All seven proposed keys route emission to
   "logging-pipeline work [currently Tech & Data]", which is running concurrently and has not
   accepted it. If it declines: four of seven `kpis` rows, all 17 `funnels` thresholds, `lapClock`
   entirely and eight of `economyHealth`'s readings are permanently untested. Every sheet says so;
   no sheet is wrong; the exposure is real and it is one decision.
2. **Transport.** `events/03` states its assumption in its first line, correctly. If Tech chooses
   `HttpService` or a DataStore-backed log, the `120 + 20 × CCU` rate, the 3-field cap, the 100-name
   cap and the 90-day window all vanish, and `events/03`, `economy/01`'s `batchRule` and
   `funnels/01`'s `platformLimits` are all bounding the wrong pipe simultaneously.
3. **`runtime.maxPlayers` 16 is still assigned to nobody.** Every rate in this category is linear in
   it. `events/03` and `economy/01` both write inequalities over the field, which is the right
   mitigation; `kpis` and `funnels` do not read it at all, which is also right.
4. **State shape.** `funnels` requires `sessionStartedAt` and `runOrdinal`; `engagement` asks for
   nothing and says the cohort is the platform's; `tech/networking/02` already declined a thirteenth
   `PlayerState` field on the ground that `architect/03-state-shape` is closed. Three positions, one
   owner, and RR-14 only closes the Analytics-internal half.
5. **Wave 4 has moved under `events/04`.** `pacing.aboveTickGapRealisedSeconds` is **42.0** on disk
   with `aboveTickGapCarriedBy` naming *purchase cadence*; `events/04`'s rationale quotes 49.9 and
   the claim that *"reveal spacing, not purchase cadence, is what carries it"*. The quotation of
   `_verified-wave4.md` is accurate and the instrument is unaffected — it measures the maximum
   either way — but the two will read as contradictory at the final pass. Note also that
   `laps[7].revealGapMaxSeconds` is 101.5 against `aboveTickGapMaxSeconds` 90.0 on disk, which is
   Balance's to settle and is exactly what this instrument exists to catch.
6. **`plots.slotsAreContiguousWhileOccupied`.** `Plots.luau:479` asserts it and `meta/06` is
   untracked. RR-15 is the Analytics-side symptom; if the claim is in the merged `plots` key, the
   defect is upstream and two sheets inherit it.
7. **Two `minimumSessions`.** `kpis` 30, `funnels` 200. Resolved today by `kpis`' stated precedence
   rule ("the larger governs"). The final pass should confirm no third key adds one, because the
   rule is written in only one of the two.

## What must happen before this category can release

1. All sixteen revision requests closed, and the four cross-domain ones closed **jointly** — RR-1/2
   with RR-3, RR-8/9 with RR-11, and RR-14 with whoever holds `stateShape`. A one-sided fix on any
   of them moves the contradiction rather than closing it.
2. A re-run of this pass over every changed file. Nothing here carries forward on trust.
3. Check 1 is **blocked until wave 7 completes.** Even with a clean revision round this category
   releases at PARTIAL, and under `cid/_state.md`'s own rule — *"a wave advanced on a PARTIAL is a
   wave that will be rebuilt"* — the honest outcome is to hold the check open and re-run it at the
   final Cross-Category pass rather than to declare it satisfied against categories that do not
   exist.

## Rulings requested by the dispatch

**1 · The 3-custom-field cap, and spending field 2 on a constant.** The arithmetic is right: 13 of
100 names, and 936 combined values recomputed independently (9 × 2 × 52; I counted field 3's 51
distinct values row by row). The 936 is a *product* where the platform sentence — *"8,000 combined
values across all custom fields"* — could also mean a sum of 62; the product is the conservative
reading and both fit. Two corrections: 936 is the custom-event subtotal only, and omits funnel-step
and economy-event values (+42 and +738 on the same reading), so it is not the experience total it is
compared against; the headroom is untouched, so this is a label, not a request. **Spending field 2 on
`owned` while it is constant `"none"` is correct and I would rule the same way.** The reason is
one-directional and the sheet states it: `pacing` publishes `baseSeconds` and `purchaserSeconds` for
every milestone row, nothing on the dashboard can separate those populations, and **a reading taken
without the split cannot be re-split later** — the cost of adding the field on the day the
`gamePassId` is filled is a discontinuity across the whole 90-day retention window, and the cost of
carrying a constant is zero. `funnels/03` reaches the same conclusion independently and states it
better than I would. The forced consequences are both cheap and both declared: one extra event name
(`slot_claimed`) and `set` dropped from `find_revealed` — and the second is not a loss, because the
Find name and set id are determined by area ordinal under the seeded partition, so the field would
have bought no information.

**2 · Out-of-order detection.** The field budget is **not** contested: the 3-field cap is per event,
and funnel-step events are separate calls, so `sinceJoinBucket`/`ownsSpan`/`runOrdinal` cost the
custom-event catalog nothing. The two domains agree on the *budget* and disagree on three other
things — the call-site set (4 versus 6, RR-8/9), the ownership encoding (RR-10) and the funnel-step
count. **`O1` itself does not work as argued** (RR-11): auto-completion plus first-instance-only
semantics means the synthetic step carries no bucket in exactly the case the assertion exists to
catch, and the sheet says both that this is visible in production and that it is not.

**3 · Targets as pointers.** Upheld. I checked all five keys: no `targetRef`, `passMarkRef`,
`alarm`, `threshold` or `tolerance` anywhere in the category carries a Balance value — every one is
a field path, a pointer-relative rule, or `[playtest unknown]` with a test range. Two Balance figures
appear in *prose*: `kpis/02`'s `floorSessionFinds … 12` (accurate today, and no target depends on
it) and `economy/01`'s four solvency figures, three of which are wrong (RR-4). **Economy Health's
observation does not survive checking**: on disk the ratio is ×3.726 against income 70,017; ×3.663
against 71,233 is round 2's verified re-derivation, not the disk; ×3.263 is round 1's superseded
figure and pairs with 75,033, not 113,880. The real gap is ~1.7% on the income side, not 60%.

**4 · `targetRef` as a schema change.** **Not implementable as written** — four specific gaps, all
in RR-14. The second pass, the merged-∪-proposals resolution set, the `problem`-not-`warning` rule
and the `pendingRefs[]` list are all right and I would build them as specified. What is missing is
the ref *grammar*: numeric indices are admitted by one bullet and forbidden by another, `*` has no
quantifier, `null` paths have no exemption, and the three keys it serves emit three different
shapes. Close those four and it is a day's work.

**5 · The emitter path.** Agreed for six of the seven, with one correction. `funnels`, `engagement`,
`lapClock`, `retentionReadout`, `economyHealth` and `kpis` supply no value a Luau module reads and
should be promoted **developer-facing, not read by a build**; the alternative Economy Health rejects
(a build module reading `economyHealth.flows` directly) is rejected for the right reason. **But
`telemetry` is not in that class.** Its `events[]` array is a build input in exactly the sense
`composition` or `replication` is — thirteen insertion points, an API call, a numeric value, three
field positions and a cadence per event are what a builder writes the telemetry module *from*.
Economy Health concedes this in its own reason string (*"the one build-visible half is the call
sites, which belong in `telemetry.events[]`"*) and then lists `telemetry` in `appliesTo` anyway.
Split it: `telemetry.events[]` needs a consumer in the **technical** contract; `telemetry.budget`,
`.forbiddenPayload` and `.unproducible` are developer-facing. Without that split every reading in
this category is `readableToday: false` permanently, which is consistent with what all five domains
say but should be a decision rather than a by-product.

**6 · The age band.** PASS, with the open item correctly classified. See check 5. The strongest fact
in the category is structural rather than mitigating: the game defines no identifier at all, so there
is no field for an age rule to bite on. The under-13 question is about whether readings are
*returned*, not whether collection is permitted, and it belongs beside `engagement.eligibilityGate`
(10 DAU / 10 play hours / 7 consecutive days), which is the availability gate that actually threatens
this project's dashboard.

**7 · The two defect counters.** Both branches confirmed in shipped code, at the cited lines.
`tier == nil` at `Clearing.luau:270`, warning at **274**, `payout = PAYOUT_FLOOR` at 277 — and
`PAYOUT_FLOOR` is `economy.payoutFloor`, read at line 118. `state.found[find]` at **288**, warning at
**293**, `return` at 294 with no channel fired. Both counters are correctly shaped as zero-invariants
rather than rates: `discovery.repeat.possible` is `false` (`systems/05:102`), so a denominator would
assert that some nonzero numerator is legitimate. **The interlock is right and it is the sharpest
thing in the category.** A `nil` tier pays 1 instead of `floor(tier.value × effective)`, which
deflates `amount / batchPatchCount` and would fire `realisedValuePerPatch`'s ±10% alarm against
`tierMix`'s weight vector — the wrong sheet, silently. `voidedBy: "unknownTierClear"` is the correct
form and no other domain had claimed the branch: `events/_lead` lists it as insertion point 7 and
assigns it no reading.

**8 · `upgrade_refused` and `ingressLimits`.** The cap is correct and still necessary. `ingressLimits`
bounds `BuyUpgrade` at 10/s sustained with burst 20 and drops over-limit messages **before the
handler** (`handlerReachedOnOverLimit: false`), so a looping client reaches `onPurchase` at most 600
times a minute — thirty times the whole per-player analytics allowance of 20/min. The two bounds
compose correctly and neither is redundant. One consequence neither sheet names: `ingressLimits`
`I2` forbids any `warn`, `print` or log on the over-limit path, so a rate-dropped `BuyUpgrade` is
invisible everywhere, and `telemetry`'s identity `attempts = purchased + refused` acquires a fourth,
uncountable term. That is a deliberate ruling by Networking rather than a defect, and it does not
change the cap; it is worth a line in `upgrade_refused.unproducible` beside the three causes
`tryBuy`'s bare boolean already erases.

**Jointly satisfiable?** Yes, on the two resources the dispatch asked about. Event names: 13 of 100,
with funnel steps and economy events consuming none of that cap. Custom fields: the cap is per event
and no event in any of the five domains declares more than three. Combined values: 936 + 42 + 738 =
**1,716 against 8,000** on the conservative product reading, 10.8× headroom on Economy Health's own
figure and ~4.7× on the category total. The five domains' claims on those two resources do not
collide. What they collide on is the *cadence* of one call site, the *encoding* of one dimension,
the *count* of the funnel's steps and the *denominator* of the request budget — four contradictions,
all closable, none of them about scarcity.
