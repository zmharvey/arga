# Analytics — verification

*Round 1 below. **Rounds 2 and 3 are at the end of this file**; round 3 carries the closing verdict.*

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

---

# Round 2

**Status: FAIL** — three new defects, one round-1 request still open on disk, one invariant breach.
Round 3 of 3 remains and every item below is single-field.

**Thirteen of sixteen requests are genuinely closed**, several of them better than the fix I asked
for. **RR-5 is not closed** — it was routed, and its target file is unedited. **RR-15 is not
dissolved; it is inverted** — the two domains crossed rather than converged, and the contradiction
is now in a manifest rather than in a prose line. Re-read in full this round: `funnels/01`,
`funnels/04`, `events/01`, `events/03`, `events/04`, `economy/01`, `economy/03`, `engagement/01`,
`kpis/02`, `_category.md`, `tech/deploy/02`, `game/src/server/Persistence.luau` (`defaultState`,
`applyPayload`, `reconcile`, `load`). Nothing from round 1 carried forward on trust.

## Round-1 requests, re-checked on disk

| # | request | state | evidence |
|---|---|---|---|
| 1, 2 | faucet cadence | **closed** | `events/03:51` *"That is withdrawn"*; its cadence table and `events/01` site 1 both now point at `economyHealth.flows[patch-clear].batchPatchCount` and its `flushOn` list. One sheet states the granularity, the other cites it. |
| 3 | 320 vs 440 | **closed, and generalised** | `events/03:37` adds *"Every other Analytics sheet must use 320 as its denominator"*; `economy/01`'s `batchRule` divides by `telemetry.budget.perServerRequestsPerMinute`. |
| 4 | solvency figures | **closed** | `economy/01:77–81` states all four correctly and adds a revision-request row (`:287`) drafting the `_category.md` fix. |
| 5 | `_category.md` | **OPEN** | Lines 124, 330–331 and 360 still publish *"244,839 against … 113,880 — a ×3.26 solvency ratio"*. Routed, drafted, not applied. |
| 6, 7 | `economyHealth` prose rows | **closed** | `economy/03:76` emits `{"amends": "economyHealth"}` supplying `dormant`, `structurallyAbsent` and `forbidden`; `economy/01`'s three placeholder strings are gone. |
| 8, 9 | funnel call sites and cap | **closed** | `events/01` sites 3, 11 and 15 now name their funnel steps, site 10 reads *"no custom event and no funnel step"*, and `events/03:134` reads **6 per player ever**. |
| 10 | ownership encoding | **closed** | `funnels/01` field 2 is `owned ["none","span"]` with `encodingSharedWith: telemetry.customFields.field02`, enforced by its criterion 3. |
| 11 | `O1` | **closed by withdrawal** — see below | |
| 12 | `T5` | **closed** | Withdrawn to `noPassMark[]` with `ownedBy: kpis.rows[secondsToFirstReveal]`; `T4`'s reach rate correctly kept as a different quantity. |
| 13 | `minimumSessions` arithmetic | **closed, and better than asked** | `T1` is reclassified from a 0.5-point rate to a `countInvariant` with `minimumSessions: 1`; `T12`'s gap is now 10 points; criterion 2 enforces `gapPoints ≥ 10` on every rate row. Changing the row's *kind* is the right fix and I did not propose it. |
| 14 | `refGrammar` | **closed but for one choice** — see below | |
| 15 | run-1 cohort | **INVERTED** — see below | |
| 16 | payoff-gap circularity | **closed, with one stale reference** — see below | |
| 17 | `slot_claimed` | **closed** | Not re-litigated here; the equality is gone. |

## The three dissolved questions

**RR-11 · `O1` withdrawn. Stays dissolved, and the replacement is sound.** I checked the three
claims the coordinator flagged. (a) `LogCustomEvent(player, eventName, value, customFields)` does
take a numeric `value` — it is the signature in the research pack and the same one `session_end`
already rides. (b) It is a different API from `LogFunnelStepEvent` and inherits none of the funnel
semantics, so neither auto-completion nor first-instance suppression touches it. (c) **The emitter
does hold the state**, necessarily and not by assumption: steps 4, 5 and 6 have stateful predicates
— *"the third clear after `firstReveal` that reveals nothing"*, *"the first clear whose `tierIndex`
differs from every `tierIndex` cleared so far this session"*, and a latch transition — so a module
that can emit them at all is already tracking which have fired. `valueRange [0, 5]` is right: at
step 6 five lower ordinals can be outstanding. In the live case the value is 2 and the instrument
fires. The withdrawal is also the *right shape* — `supersedes.notTaggedAndKept` states that an
assertion that may or may not fire is worse than a stated gap, and the undocumented semantics are
tagged `[unverified]` with a settling fetch rather than leaned on. `sinceJoinBucket` keeps its slot
with `doesNotBuy: "step ordering"` in the manifest, which is the honest narrowing.

**RR-16 · the payoff gap. Same split, reached separately, and it holds.** On disk `kpis/02` now
carries `rows[aboveTickPayoffGapSeconds]` with `readsInstrument` naming
`telemetry.events[session_end].maxPayoffGapSeconds`, `class: "build-read"`, and a `boundary` string
leaving the clock, its origin, the above-tick set, the reset rule and gap-versus-maximum with
event-catalog work; it sets target, alarm and actor only. `events/04` describes the identical split.
The reversal is recorded in a `reversals[]` block with its reason, and the reason is correct:
finding 5 settled a labelling defect and `pacing.laps[7].revealGapMaxSeconds` (101.5) exceeds
`pacing.aboveTickGapMaxSeconds` (90.0) on disk, so the row is a live breaching prediction. The
general rule added — *a verdict handed to a domain that declined it is unowned and fails admission*
— is the correct generalisation and I would adopt it as a narrowing of check 2. **One stale
reference, one line:** `events/04:78–81` and `:105` still instruct `kpis/02` to *"readmit
`aboveTickPayoffGap` or restate its `declined[]`"* and say its `declined[]` entry *"must name this
sheet"*. That entry no longer exists — `kpis.declined[]` has twelve rows and this is not among
them. Not a divergence; a sentence describing a state that has since changed.

**RR-15 · not dissolved. Inverted, and now load-bearing in a manifest.** The coordinator's account is
wrong in both halves. Engagement's sentence did **not** stand unedited — *"cannot be a save-derived
flag"* no longer appears in the file. And the two domains did not converge; they crossed:

- `funnels/01` **withdrew** the request. `withdrawnRequests[]` carries
  `{key: "stateShape", field: "runOrdinal", withdrawnBecause: "run 1 is a predicate over the seven
  fields already persisted"}`; its acceptance criterion 5 asserts `requiresFromOtherKeys[]` contains
  no `stateShape` entry; its consequences read *"both requests are withdrawn"*.
- `engagement/01` **adopted** it. It now carries a `runOrdinalRuling` block in its manifest whose
  `supports` field reads *"funnels' request for `stateShape.runOrdinal`"*, three admissibility
  conditions `C1`–`C3`, an acceptance criterion (#3) asserting `mayBePersisted: true`, six rows
  carrying `derivableIf: "stateShape.runOrdinal"`, a `populations.returning` defined over
  `runOrdinal == run1`, and a closing line — *"I am not the requester; `funnels` is."*

So the field is endorsed by a domain that is not asking and requested by nobody, and six manifest
rows plus one acceptance criterion hang off a request that was withdrawn in the same round.
Persistence-shape work reading these two sheets still gets two answers about whether `StoredState`
grows a field — the same divergence RR-15 raised, with the polarity reversed.

## New this round

### `cid/analytics/engagement/01-session-shape.md` — supports a request `funnels` withdrew in the same round
**Violates:** two domains, two instructions to one owner (RR-15, inverted).
**Fix:** `funnels/01` no longer asks for `stateShape.runOrdinal` and its criterion 5 forbids it from
doing so. Either restate `runOrdinalRuling` as a conditional admissibility finding with no requester
— `supports: null`, and every `derivableIf` marked as contingent on a request nobody has made — or
route it as this domain's own request and say so. As written, `supports` names a request that does
not exist, and `populations.returning` is defined over a field that will not.

### `cid/analytics/funnels/01-onboarding-funnel.md` — the `saveState` predicate never matches
**Violates:** a derivation must be true of the code it names.
**Fix:** `customFields[CustomField03].derivation` reads *"pristine when `Persistence.load` returns
readable and the loaded state is byte-equal to `defaultState()`: currency, clearedCount and
areasFinished all 0, and **found, upgrades, rowsRevealed and cleared all empty**"*. `load` runs
`reconcile` before it returns (`Persistence.luau:430`), and `reconcile:352–361` fills
`rowsRevealed` with one `false` per upgrade row and `found` with one `false` per Find name — 27 keys.
**So `found` and `rowsRevealed` are never empty for any player, including a brand-new one, and a
builder implementing the predicate literally emits `progressed` for every session forever.** The
underlying claim is sound and the fix is one clause: *no `true` value in `found` or `rowsRevealed`;
`upgrades` and `cleared` empty; `currency`, `clearedCount` and `areasFinished` all 0*. Drop
"byte-equal to `defaultState()`", which is false of the returned state at every call site.

**The bias is otherwise correctly bounded, and one conjunct I expected to be missing is present.**
The predicate includes `readable`, which excludes the case I went looking for: a returning player
whose DataStore read failed gets `defaultState()` back, and without the `readable` conjunct would
have read `pristine`. It is there, so the stated bias — a zero-progress rejoin counted as run 1,
over-counting and under-counting nothing — is very nearly the only one. The residue is one branch:
`load:406–421` treats a stored payload that is present but not a table as a fresh session with
`readable` still true, so a returning player with a corrupted save reads `pristine`. It warns, it is
rare, and it fails both stopping-rule bars; recorded, not requested.

### `cid/analytics/funnels/04-drop-off-thresholds.md` — `T3` has no carrier and no resolving boundary
**Violates:** an instrument must be computable from the field that carries it.
**Fix:** `T3` reads *"`steps[firstClear]` P90 seconds **from the arm transition**"* against
`firstSession.ceilings.secondsToFirstClear.max`, which is **3.0** (`onboarding/02:89`). Two
independent blockers. (a) The only carrier of per-step elapsed time is `sinceJoinBucket`, whose
declared unit is *"seconds since join"* — and the arm transition is explicitly **not a step**
(`funnels/01`: *"The arming transition is not a seventh step"*), so nothing carries seconds-since-arm
at all. (b) Even join-relative, the lowest bucket is `0-5`, which straddles 3.0, so no P90 computed
from these buckets can be compared to that ceiling. Either split the bottom bucket at the two
ceilings it must be read against (`0-3`, `3-5`, `5-10`, … — eight values, product 8 × 2 × 3 = 48,
still nothing against 8,000) and state that step 2's bucket is arm-relative, or withdraw `T3` the
way `T5` was withdrawn. `T5`'s survivor, `secondsToFirstReveal` at 10.0, sits exactly on a bucket
edge and is unaffected.

### `cid/analytics/funnels/01-onboarding-funnel.md` — five acceptance criteria
**Violates:** the universal invariant, and the graph's subagent contract ("2-4 criteria").
**Fix:** the revision added criterion 5 (`requiresFromOtherKeys[]` carries no `stateShape` entry)
without retiring one. It is the most valuable of the five — it is what makes the withdrawal
mechanical — so fold criterion 2's `measuredFrom` test into criterion 1, which already walks the
same array. Every other sheet in the category is at 4.

### `cid/analytics/_category.md` — RR-5 is still open
**Violates:** unchanged from round 1.
**Fix:** `economy/01:287` has already drafted the replacement text. Apply it at lines 124, 330–331
and 360. This is the only round-1 request with no edit on disk.

## `refGrammar` v1 — could a resolver be written with no choices left?

**Almost. One choice remains, and it collides with a field that is live on disk.**

Four of the five gaps are closed cleanly and I would implement them as written. The index-versus-
literal contradiction is resolved the right way round — numeric literals legal only inside `[…]`,
`bareNumericSegment` a parse failure, and **`K5` moved off the path string onto the row**, which is
the correct place for it because it was always a statement about targets and never about syntax.
The three quantifiers are unambiguous, `absentKey` is a problem under all three, `presentButNull`
resolves with `requireNonNull` as opt-in, the worked case (`pacing.laps[*].revealGapMaxSeconds`,
null on the bay row) is named, `kind` dispatch replaces inference from a null path, and `refShape: 1`
gives the resolver a way to reject an un-migrated key instead of skipping it. The EBNF is complete
enough to write a parser from in one sitting.

**The remaining choice: how the resolver *recognises* a ref.** The spec says the scope is *"every
ref emitted by any key carrying `refShape: 1`: path, every `alsoReads` entry, and every
`predictionRefuted`"* — but those are `kpis`' own field names. The other three keys put refs at
different names and depths: `funnels.refs[]`, `economyHealth.readings[].refutes`,
`telemetry.events[].refutes`. An implementer must choose between (a) deep-walking each key's value
and treating any object carrying `kind` as a ref, or (b) a registry of field paths per key. These
are not equivalent, and (a) breaks on disk today: **`economyHealth.readings[].alarm[].kind` exists
and takes `relative` / `one-sided` / `invariant` / `share` / `absolute`** — the same field name, a
disjoint value set, sitting inside the very key the grammar is migrating. Under (a) with no
whitelist every alarm becomes a parse failure; under (a) with a whitelist alarms are silently
skipped, which is the behaviour `refShape` exists to prevent. **Name the recognition rule** — I
suggest a `refs` discriminator field or an explicit per-key registry — and the resolver has no
choices left.

**Two sequencing facts, not defects.** Only `kpis` carries `refShape: 1` today; `economy/01:117`
still says *"One normalised ref shape must be named before that check can serve all three; **I do
not name it**"*, written against the pre-revision `kpis`. So implementing the resolver now makes
`bridge` reject three of the four citing keys on promotion. And `funnels`' `refutes[]` and
`telemetry`'s `refutes` are likewise un-migrated. The migrations are specified; they have not been
performed. Order: migrate, then promote, then implement.

## The 42 nulls versus `tech/deploy/02`

**Compatible in mechanism, in conflict on the worked case, and a promotion blocker today.**

`deploy/02`'s rule is about **emitted** config: `emit-config.mjs:79` maps `null` to `nil`, Luau drops
a nil-valued field from a table constructor, so *"an explicit null and a never-emitted key are the
same bytes at runtime"*. Its criterion 3, however, is written over the whole manifest — `--emit`
must exit non-zero on a null *"anywhere inside a key's value"*. So the moment these keys are
promoted, 42 nulls fail the emit gate whether or not a single byte of them reaches
`GameConfig.luau`.

`deploy/02` supplies its own resolution and stops one step short of applying it: `DOCUMENTATION_ONLY`
already drops `forbidden`, `forbiddenApis` and `invariants` **by name**, and the sheet's "Not decided
here" routes *"whether a fourth name joins them"* to contract-and-seam work. A developer-facing key
is precisely that case at key granularity. **Extend the mechanism to whole keys and the conflict
disappears** — which is also the cleanest expression of my round-1 ruling 5: `telemetry.events[]` is
build-read and must obey `deploy/02`; the other six keys are developer-facing and should never reach
the emitter at all.

**Where they genuinely conflict is `refGrammar`'s worked case.** `gap2` names
`pacing.laps[*].revealGapMaxSeconds` and `pacing.laps[*].cumulativeSeconds` — null on the bay row —
and says *"that case is why the rule is needed"*. `deploy/02` requires `pacing`, once promoted, to
replace those nulls with a declared sentinel. At that point the rule's only worked example in the
contract has no case: the value is the string `"none"`, which is present and non-null. So: **keep
`presentButNull: resolves` as defensive behaviour** — a resolver that tolerates a null is strictly
more robust than one that crashes on it — **but do not let any key depend on nulls surviving
promotion**, and add the sentinel case: a resolved value equal to a declared sentinel should be
recorded as absent-by-design, not as a number. Otherwise `requireNonNull` guards nothing after the
sentinel migration, because `"none"` passes it.

One consequence worth naming before promotion: several nulls are load-bearing *as* nulls.
`retentionReadout.prohibited[P9].observable` is literally *"every `windows[].target` and
`windows[].alarm` is null"*. Replace the nulls with `"none"` and that observable becomes false. The
sentinel migration is not mechanical for this category; it touches the prohibition rows that cite
the nulls.

## Check 1, re-evaluated

**Still BLOCKED, but for a narrower and more specific reason than in round 1.** Wave 6 is on disk —
56 sheets across `cid/art/` (8 domains) and `cid/audio/` (6 domains), including
`audio/mix/02-degradation-under-load.md`, `audio/mix/04-muted-play.md` and
`audio/mix/03-the-asset-ledger.md`, all of which carry `[playtest unknown]` figures and the word
"instrument". **Analytics' enumerated measurable surface (`_category.md` section B) predates all of
them and names none.** So the check has moved from "cannot be evaluated, the claims do not exist" to
"evaluable against wave 6, and not yet done" — a different and better state, but not a pass. Two
things follow. Wave 7 (Live Ops, Discovery) is still unwritten, so the check cannot be completed at
all. And at least one wave-6 subject is a real analytics question with a real answer: a muted-play
share is a client fact, so it falls under `telemetry.unproducible` `U1` and would be *declined*
rather than instrumented — but no sheet in this category has said so, because Audio did not exist
when the surface was enumerated. **Recommendation: do not re-open Analytics for wave 6. Record the
sweep as an explicit item for the final Cross-Category pass**, where the same reading can be taken
once against Art, Audio, Live Ops and Discovery together instead of three times.

## What must happen before this category can release

1. Five single-field edits: `engagement/01`'s `runOrdinalRuling`, `funnels/01`'s `saveState`
   derivation and criterion count, `funnels/04`'s `T3`, and `_category.md`'s solvency line.
2. One line in `events/04` retiring its instruction to a `declined[]` entry that no longer exists.
3. `refGrammar` gains a ref-recognition rule; the three un-migrated keys migrate **before** the
   resolver is implemented, not after.
4. A key-level exemption in `emit-config.mjs` (or a sentinel migration) before any of these seven
   keys is promoted, and a decision on `telemetry.events[]` as the one build-read half.
5. Check 1 stays open to the final pass. **The category cannot release above PARTIAL this wave**,
   and every item above is closable inside round 3.

---

# Round 3 — closing verdict

**Status: PARTIAL.** Every round-2 item is closed, several of them beyond what I asked. **One defect
remains**, it is mechanically checkable, it is single-field, and because the 3-round cap is spent I
state its resolution below rather than request it. Nothing else is outstanding: the rest of the
category is sound and, in the places the revisions reached, better specified than the sheets it
replaced.

Re-read in full this round: `funnels/01`, `funnels/04`, `events/01`, `events/02`, `events/04`,
`engagement/01`, `engagement/02`, `economy/01`, `kpis/02`, `_category.md`, plus
`game/src/server/Persistence.luau` and `bridge/merge.mjs` for the two claims that turn on code.

## Round-2 items, re-checked

| item | state | evidence |
|---|---|---|
| RR-15 inversion | **closed, as a withdrawal, both sides** | `funnels/01` `withdrawnRequests[]` now gives three grounds, including *"neither this key nor engagement has a row needing an integer run count"*, and `sharedPredicate.reopensOnlyIf` names the single condition that would reopen it and who must file it. `engagement/01` withdrew `runOrdinalRuling` **entire** — `requiresFromOtherKeys: []` (`:140`), six `derivableIf` rows now `null` with `closedBy: "persistence D9"`, `E13` forbidding this key from requesting any persisted field, `E14` forbidding a join to `saveState`. **Nothing in the category now asks Persistence for anything**, and I checked the negative directly rather than taking the summary. Engagement naming its own error — it argued from `readable` alone when the seven fields together are what distinguish a pristine save — is the right record to leave. |
| `saveState` predicate | **closed** | `notByteEquality` (`funnels/01:203`) states the mechanism — *"reconcile fills rowsRevealed with one false per upgrade row and found with one false per Find name, so the returned state is NEVER byte-equal to defaultState()"* — and the test is now *no `true` value*, not emptiness. Recording **why** the wrong derivation was wrong is what stops it being re-derived; that is the correct fix and not the minimum one. |
| `T3` and the buckets | **closed, and it was three findings** | `sinceJoinBucket` → `sinceStepOriginBucket`, unit is the step's own `measuredFrom` — which is the per-step-origin rule already inherited from `firstSession.ceilings`, not a new concept. Edges `0-3, 3-5, …` put **both** ceilings on boundaries; product 8 × 2 × 3 = 48. `T3`, `T7`, `T9` and `T11` are now bucket-overlap rates with `gapPoints`, and `bucketResolutionLimit` states the cost (*"of six band edges read, one aligns"*) and names the removal — a numeric-valued `LogCustomEvent` per step, **costed against the 100-name cap by Event Logging rather than spent unilaterally**. Finding that a median is no more computable from buckets than a P90 is a generalisation I did not make and should have. |
| acceptance-criteria count | **closed** | `funnels/01`, `03` and `04` are at 4. All sixteen leaf sheets now carry exactly 4. |
| RR-5 · `_category.md` | **closed, applied** | Lines 347–350 carry the corrected text with the superseded figures recorded rather than silently swapped, and the same sentence's two other stale numbers (1,459 s exhaustion, 42%-bought) taken with it. Fixing the whole sentence rather than the one line I named is the right call. |
| batch window | **closed, and now two-sided** | `batchPatchCount ≤ min_k depths.areas[k].patchCount` is the constraint I did not think to ask for: below it the smallest area yields no full window and contributes nothing to `realisedValuePerPatch`. On-disk floor 121, ceiling 140 (area 1's `patchCount` is 140 in `balance/03:115` — verified), 128 inside with ~6% and ~9%. `windowAtOnDiskFigures` closes with *"the rule and the re-derivation bind; this evaluation does not"* and names RR-8 as the input that will move it. |

## The one defect

### `area_cleared` field 3 has two published answers and neither key claims it
**Class: defect, not a design disagreement.** Both domains agree on the principle and both executed
it by yielding to the other. Neither is arguing for its own answer.

- `events/01:37` — *"**`area_cleared`'s third field is `lapOrigin`, taken verbatim from `lapClock`,
  and my own five-value composite is withdrawn.**"* Field 3 is `lapOrigin`, cardinality **2**,
  values `completion` / `join`. Its acceptance criterion 3 requires *"exactly the two values
  `completion` and `join`"*.
- `engagement/02:84` — *"**My round-1 `lapOrigin` is withdrawn. `area_cleared` field 3 is `lap`,
  five values, event-catalog work's spelling, adopted verbatim with no substitution.**"*
  `originField.name` is `"lap"`, five values, `adoptedVerbatim: true`, `substitutions: 0`. Its
  acceptance criterion 1 requires those *"five values are byte-identical to
  `telemetry.events[area_cleared].fields[3].values`"*.

Each adopted what the other published in round 2, not what the other published in round 3.
**Engagement's criterion 1 fails against disk today** — the telemetry field it demands byte-identity
with is a two-value field under a different name — and the two criteria cannot both pass. The
downstream divergence is material, not cosmetic: under the two-value field `lapClock` `X2` degrades
to an aggregate ratio and `X4` becomes `unproducible U8`; under the five-value composite both are
per-lap facts and `spannedLapCount` and `resetInLap` are exact. Two builders emit a different field
name, a different cardinality and different exclusion semantics.

**Resolution, stated because the cap is spent: adopt the five-value `lap` composite.** It is
Engagement's round-3 position and Event Logging's own round-2 design, so no domain has to be
overruled. It preserves `X4` and per-lap `X2`, which the two-value field loses and which
`events/01` itself costs out as a real loss rather than absorbing. The cardinality cost is +3
distinct values on a category total near 1,716 against 8,000 — nothing. Edits: `events/01` field 3
name, values and acceptance criterion 3; delete `U8`; `events/02`'s `N20` observable and
`events/04`'s reset table both reference `lapOrigin` and follow the rename. `engagement/02` needs no
edit at all, which is the tie-break: one file moves, not two.

**Structural finding for the final pass, and it is the more important half.** This is the second
mutual-deference inversion between the same two domains in three rounds — `stateShape.runOrdinal` in
round 2, `area_cleared` field 3 in round 3. Both times each sheet yielded to the other's *previous*
revision, and both times the yielding was correct in isolation and produced a contradiction jointly.
The mechanism that would prevent a third is cheap and neither domain has it: **a shared field needs
one named owner recorded in both sheets before either withdraws**, not two sheets each recording
that the other owns it. `funnels/01`'s `sharedPredicate` block — which names both readers, the
mapping and the reopen condition in one place — is exactly that mechanism, invented in this category
for `saveState` and not applied to `area_cleared` field 3.

## `refGrammar` — implementable, with no choices left

**Yes.** The registry closes it, and it closes it better than the discriminator I suggested.
`refSites[]` holds path patterns in the same `pathGrammar`, rooted at the key's own value; the
resolver expands them and treats what it lands on as refs; **it never deep-walks**. At a registered
site an object missing `kind` is a problem; outside one, `kind` is ignored entirely. That makes the
`economyHealth.readings[*].alarm[*].kind` collision **structurally impossible** rather than
whitelisted around, which is the difference between a rule and an exception. `refCount` closes the
omitted-site hole an inclusion-list would otherwise have, with an integer comparison. Economy Health
then removed the collision at source anyway (`alarm[].kind` → `alarmKind`, with a grep criterion) —
belt and braces, and the braces are the right one.

The migration order is correct and its reasons are the real ones: `telemetry` first because it is
the only build-read citing key and therefore the only one `deploy/02`'s sentinel rule reaches;
`economyHealth` second because it owns the two hardest cases (the prose citation and the renamed
field). **Nothing breaks mid-migration** — a key without `refShape` is *out of scope*, not rejected,
which is the correction to my round-2 concern. I verified `telemetry` (`events/01:136`) and
`economyHealth` (`economy/01:123`) carry `refShape: 1`; **`funnels` has not migrated**, and that is
the plan rather than an omission — `kpis/02:582` puts it last, *"purely mechanical, so you are last
and can land with the resolver"*. Implement in that order and the resolver has nothing left to
decide.

## KPI's pushback on the proposal half — upheld, and I was wrong

**They are right and my round-2 statement was too strong.** I wrote that after the sentinel migration
the `presentButNull` rule "has no case in the contract at all". It does. `bridge/merge.mjs:146–149`
is explicit that *"a proposal is a finding, not a contribution. It is reported by name and never
merged"*, so a proposed key's value never reaches the merged manifest and therefore never reaches
`emit-config.mjs`. `deploy/02`'s hard error cannot fire on it. The resolver, by contrast, runs
against **merged ∪ proposals**. So nulls genuinely persist on the proposal side at resolve time, and
they will for as long as any citing key is unpromoted — which today is all seven of this category's
keys. The rule has a live case now and keeps one through the whole migration.

The three-state resolution is also better than the two-state form I proposed. `absent` / `present` /
`absentByDesign` distinguishes *"the sheet forgot"* from *"the sheet said there is not one of these"*,
where my "record it as absent-by-design" folded the sentinel into the present case and lost that.
`requireNonNull` failing on a sentinel as well as on `null` is the necessary second half, and
`verdictRule.sentinelReadings` is the part that matters at read time: **a sentinel is not a zero, and
reading it as one is how a bay with no Finds would report a perfect reveal gap.** That sentence is
the whole argument and it is correct — `pacing.laps[bay].revealGapMaxSeconds` is exactly that case.
The grammar also names the consequence I raised and routes it: `retentionReadout.prohibited[P9]`
observes a prohibition by the literal token `null` and must be rewritten over the sentinel or over
`absentByDesign`.

## Check 1 — can it close?

**No, and it should be reassigned rather than left open against this category.** All nine categories
now exist on disk (`cid/liveops/_category.md` and `cid/marketing/_category.md` are the wave-7 pair,
under names my earlier globs missed). So for the first time the check is *evaluable*. But it cannot
be evaluated **by this category**: Analytics ran in wave 5, its measurable surface was enumerated
before Art, Audio, Live Ops and Marketing existed, and nothing in a wave-5 sheet can be responsible
for a claim published in wave 6 or 7. Re-opening Analytics to sweep them would mean re-opening it
again after the final pass moves anything.

**This is a checklist-scoping defect, not a category defect.** *"Every measurable claim in **any
category** has a matching event"* is a cross-category invariant wearing a per-category check's
clothes: it is the only one of the five that quantifies over categories other than the one being
verified, and it is unsatisfiable by construction for every category except the last to run.
**Recommendation: move check 1 to the final Cross-Category Verification node and narrow the
Analytics-node check to "every measurable claim in a category that has released has a matching event
or a stated reason it has none."** Under that wording the check would have passed in round 1. I am
recording it as unresolved-by-scope rather than as a failure by this category, and the sweep against
waves 6 and 7 belongs to the final pass with the wave-4 reconciliation already queued there.

One concrete item to carry into that sweep, because it is the shape the rest will take: a muted-play
share (`audio/mix/04-muted-play.md`) is a client fact and falls under `telemetry.unproducible` `U1`,
so the correct Analytics answer is a *decline with a reason*, not an instrument. Most of wave 6 will
resolve the same way; that is a cheap sweep, not a new domain.

## What the revisions broke

**Nothing, apart from the `area_cleared` field.** I checked the four places where a fix could have
had a second-order cost and all four held: the bucket re-split changed the cardinality product from
42 to 48 and every combined-value figure downstream still reconciles; `T1`'s reclassification to a
count invariant did not orphan its action row; the `alarmKind` rename is grepped by its own
criterion so it cannot half-land; and `economy/01`'s two-sided window did not disturb the
`faucetBudgetShare` seam with `events/03`. Two near-misses worth naming: `events/02`'s `N20`
observable and `events/04`'s reset table both hard-code the string `lapOrigin`, so they move with the
field-3 resolution above and are the reason that edit is three files rather than one; and the null
count is a moving floor — 43 published, 46 within a round, two since removed by Audio — so **publish
the method and the date, not the number**, exactly as the coordinator proposes.

## Closing

**PARTIAL**, and the one open item is a defect with a stated single-owner resolution. This category
produced the strongest self-correction in the run: three of the sixteen round-1 requests were closed
by *dissolving* the question rather than answering it, and in each case the dissolution was better
than the fix requested — `O1` withdrawn rather than tagged, the run-ordinal request withdrawn from
both ends rather than arbitrated, and the payoff-gap split reached independently by two domains that
had not read each other. The category's remaining exposure is not internal: it is that all seven keys
describe instruments for a game with **zero analytics calls in `game/src`**, and whether any of them
is ever readable is one decision by logging-pipeline work that no sheet here can make.

## Round 3 (continued) — closed

**Status: PASS.** The `area_cleared` field-3 defect is closed exactly as ruled, in four files
rather than the three I named — `events/03` hard-coded the spelling too and would have kept a
stale `U8` claim. Verified on disk: field 3 is `lap`, five values in `lapClock`'s order,
byte-identical to `lapClock.originField.values`, so `engagement/02`'s criterion 1 now passes and
that sheet needed no edit, as the tie-break predicted. `distinctValuesAcrossCatalog` 49→52 and
`combinedValuesUsed` 900→954 (`9 × 2 × 53`), 7,046 headroom — the +3 is exactly the field's
cardinality change and reconciles against rounds 1 and 2. `U8` deleted in both sheets. The
session record's `lapWasSpanned` / `lapHadReset` / `loadWasFallback` lifecycle matches `X1`, `X2`
and `X4`'s scopes respectively, including `fallback` dominating.

**`telemetry.sharedPredicate` closes the structural finding, not just this instance.** It mirrors
`funnels.sharedPredicate` and adds the rule that neither key may restate the list or adopt the
other's field in place of citing the block — which is precisely what makes a third mutual-deference
inversion impossible rather than merely unlikely. `settles` naming RR-14 and both inversions is the
right record.

**`U4` corrected unprompted, and it is the same class caught a third time:** a stale `unproducible`
row that a sibling domain had made producible. Now scoped to an integer run count, with the binary
declared producible over persisted fields.

**Two checks remain escalated, not failed:** check 1 reassigned to the final Cross-Category pass as
mis-scoped for a wave-5 category, check 2 narrowed to "a consumer or a resolving `refutes`". PASS
holds under those narrowings; PARTIAL if either is declined, with no sheet changing either way.

*Appended by the orchestrator from the verifier's text: it had no `Edit` tool in that context and
judged reproducing ~900 lines by full-file write a worse risk than a missing addendum. Correct call.*
