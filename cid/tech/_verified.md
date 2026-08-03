# Tech & Data — verification

**Status: FAIL**
Three sheets specify a `Player:Kick` and an `os.clock`/`os.time` that two other sheets in this same
category grep to zero, and the cost figures the wave-4 gate ordered restated were not restated. The
wave gate does not open; 14 revision requests below, all one-field.

## Check results

| # | check | result | evidence |
|---|---|---|---|
| 1 | every value the brief says must persist appears in the save schema | **PASS** | `OPEN.md §2` names collection state, per-area cleared state, upgrade levels, currency. `persistence/03` `translate.carry` ∪ `translate.discard` = `currency, upgrades, rowsRevealed, found, areasFinished, cleared, clearedCount` — exactly `stateShape`'s seven, all four brief items present. `persistence/01` `payload.fields` binds the payload to that set plus the `sessionLock` envelope and nothing else. |
| 2 | every remote event has a matching server-side validation rule in Security | **PASS** | `input.clientOriginatedRemotes` is closed at two (`Protocol.luau` asserts it at require time). `security/02` `integrity.channels[]` carries `BuyUpgrade` (arity, type, ≤32 bytes, exact-id membership) and `RequestState` (zero arity, `nil` return), plus four platform channels. The five server→client channels take no ingress. No remote is unrepresented. |
| 3 | every performance budget derives from the brief's stated device floor | **FAIL — check is wrong** | See ruling below. `incremental-spinoff-v2` contains no device-floor line in any of its eight sheets; I grepped the whole `concept/spec/` tree and the only "3 GB device floor" strings are `syndicate-auction-test/04-PRESENTATION.md:113` and `sky-freight-test/04-PRESENTATION.md:110-111`, both `[simulated: R5 Q5]`. Performance's response is correct. |
| 4 | no module boundary crosses an authority boundary | **FAIL** | `security/03` `logging.sinkUntilPipeExists` puts the sink in a **module-local** function inside `clearing`, but two of its four record kinds (`channelInadmissible`, and the `BuyUpgrade`/`RequestState` rows whose `countsTowardFlag` is true) originate in `server-main`'s handlers. A module-local function in `clearing` is not callable from `server-main` without an `interfaces` entry, which `security/01` and `security/03` both deny needing. RR-V6. |
| 5 | the save schema has a migration path and a rollback procedure | **PASS** | `persistence/03`: 7 `bumpTriggers`, 8 `nonTriggers` (disjoint, 15 rows), `procedure` M1–M6, `chainDepth` 1, `rollback` (old key untouched = the artefact, revert-and-republish), `withinVersionRollback.supported: false` with the one-hour UTC granularity sourced, `everExecuted: false`, and a named absent test with four asserts. |
| 6 | any unbounded growth in saved state is named and capped | **PASS** | `cleared` ≤ 1,880 keys and live-area-scoped; `found` 24 booleans; `rowsRevealed` 3; `upgrades` 3 held levels; `areasFinished` one integer with `D8` forbidding any per-area boolean; `lock` 2 fields; `sessions` (RR-P1) log₁₀ growth. `payload.growsWithProgress: false`, and AC4 pins payloads at `areasFinished` 8 and 40 to within 2 characters. |

### Ruling on check 3

**The check cannot be satisfied and Performance was right not to fake it.** Naming the floor as
`[cid: decided]`, sourcing the impossibility to Roblox's own refusal to publish a device ceiling
(*"choose at least one 'baseline' device … and measure"*), putting it in one field every ceiling
derives from, flagging three options upward with the single-field lever named, and refusing to
retire RR-P1 on the coincidence that its own floor also lands at 3 GB — that is the correct
response on all five counts. **RR-P1 against `cid/gameplay/meta/01-the-area.md:39` is confirmed
correct**: the citation reaches a simulated test brief, and a right number by a fabricated route is
still a defect.

**Narrow the check to:** *"every performance budget derives from a single named device floor whose
provenance is stated, and no budget cites a floor from outside this brief."* Under that check
Performance passes with one honest exception it should state: `serverWorldInstanceCeiling` 12,000
does **not** derive from a client device floor. It is reverse-engineered from
`social.maxPlayers.aboveMaxBreaks` so that 16 players sit at 86% and 20 breach — which is exactly
what its AC2 asserts. Its own `testRange` [8000, 20000] contains values at both ends that invert
AC2. Noted, not acted on: the stated value is checkable today.

## Universal invariants

- **No sheet contradicts a `[brief: binding]` item.** Checked each of the five binding lines against
  all sheets. "Cleared is permanent" is load-bearing *for* `security/01` (a lagged origin loses
  nothing) and `performance/_lead` (instance count falls monotonically). "No offline accumulation"
  survives the first stored timestamp: `sessionLock.timestampNonConversion` guards `lock.heartbeat`
  with five grep-shaped prohibitions. No violation found.
- **Acceptance criteria: 2–4 per leaf sheet, all mechanical.** All 13 leaf sheets carry exactly 4.
  Every one is a grep, a count, a manifest comparison or a stated observable. **But two pairs are
  mutually unsatisfiable** — `persistence/01` AC3 ("exactly one `Player:Kick` call") against
  `security/03` AC2 and `networking/02` AC-equivalent I3. See RR-V1/V2.
- **No priority-3 content specced.** Every domain names the eight excluded systems only to forbid
  them: `persistence/01` D2/D3/D4/D9/D13, `performance/03` N9, `deploy/01` N1–N10,
  `networking/_lead`'s absent cross-server section, `security/01` `threatModelExclusions`. Priority-2
  visitable restored ruins is addressed in one line by `persistence/01` `key.foreclosesVisitableRestoredRuins`
  and not specced. Compliant.
- **No capability absent from the Build Capability Registry is named.** No sheet in this category
  specs a UI pattern. `performance/03` N15 forbids a server module creating a `ScreenGui`;
  `security/03` and `networking/03` forbid every player-facing surface. Vacuously satisfied.
- **`[research: url]` tags.** `cid:verify` passes 0 failures, and the load-bearing ones I spot-checked
  resolve: the `MarketplaceService.yaml` "several minutes" quote is verbatim in
  `cid/_research/pack.md:92`. Two sheets correctly demote unfetchable sources to `[research owed:]`
  (`networking/01`'s 403'd per-type table, `performance/01`'s 403'd requirements article). **One
  defect:** `persistence/01:37` cites the `DataModel#BindToClose` page for the 30-second window, and
  its own domain index records that that fetch returned the Studio note but *not* the timeout. RR-V14.
- **`[cid: decided]` flagged upward, not buried.** Each of the four biggest carries a "Flagged to the
  developer" section with named alternatives: the device floor (`performance/01`, three options),
  the response ladder (`security/03`, four options with a one-field reversal), when a purchased
  multiplier applies (`networking/04`, three options), and tolerance plus environments (`deploy/01`).
  Well done and not buried.

## Revision requests

### `cid/tech/security/03-violation-response-and-logging.md` — its Kick prohibition makes Persistence's data-loss fix unbuildable
**Violates:** acceptance criteria must be mutually satisfiable; check 4.
**Fix:** `response.forbidden[0]` currently reads `"Player:Kick anywhere in game/src"` and AC2 greps
`":Kick(\|BanAsync\|banList" game/src` to zero. `persistence/01` `staleSession.releaseMechanism`
requires `server-main` to call `Player:Kick` after three consecutive `readFailed` passes, and its AC3
requires **exactly one** such call. Narrow the row to *"no `Player:Kick` caused by an integrity flag
or by any `integrity.response` tier"* and scope AC2's grep to the clearing/integrity path, excluding
the `persistence` release site by name. Your L4 ruling is unaffected — it is about punishment, and
Persistence's kick is a data-integrity release.

### `cid/tech/networking/02-ingress-limits.md` — `I3`'s observable repeats the same unsatisfiable grep
**Violates:** same.
**Fix:** `forbidden.I3.observable` reads `"grep game/src/server for player:Kick returns zero"`.
Change to *"the over-limit branch of either handler contains no `Kick`, `Ban` or connection close"*.
The rule is right; the observable is global where the rule is local.

### `cid/tech/security/01-position-authority.md` — `os.clock()` fails a merged architect criterion and this category's own static check
**Violates:** no sheet contradicts an approved upstream ruling.
**Fix:** `positionAuthority.step.elapsedTime` specifies `dt = clamp(os.clock() - lastClockSeconds, …)`
and `storage.recordFields` carries `lastClockSeconds`. `architect/01-runtime` acceptance criterion 3
greps `math.random\|Random.new()\|os.time()\|os.clock()` across `game/src` to nothing, and
`cid/tech/performance/03` **N10** — same category, same wave — restates that grep with `tick()` and
`table.sort` added. A builder implementing this sheet fails both. `persistence/02` hit the identical
wall, avoided it with `workspace:GetServerTimeNow()`, and issued **RR-P7** to restate the criterion;
this sheet must either join RR-P7 or issue its own. Note RR-P7 as currently worded ("no module
derives a placement, a payout or a grant from a clock") **still forbids you**, because the origin
advance gates which patches pay. The restatement you need is narrower: *"no module derives a
placement or a grant from an unseeded RNG or from a wall clock; a monotonic elapsed-time read is
permitted."* Your instrument choice (`os.clock`, monotonic, skew-free) is correct — the criterion is
the thing that is wrong. Escalate it; do not switch instruments to satisfy a bad grep.

### `cid/tech/networking/02-ingress-limits.md` — `algorithm.refillModel` specifies `os.clock()` with no note
**Violates:** same.
**Fix:** `algorithm.refillModel` reads *"continuous, computed from `os.clock()` at read time"*. Same
two greps. Add the same escalation, or cite `security/01`'s once it exists. Do not silently switch to
a per-tick refill job — `serverCostAdded.perTick: 0` is a real property worth keeping.

### `cid/tech/security/03-violation-response-and-logging.md` — the log record's `at` field specifies `os.time()`
**Violates:** same.
**Fix:** `logging.record.fields[3]` reads `"os.time(), whole seconds, server clock"`. `os.time()` is
named explicitly in both greps. Use `workspace:GetServerTimeNow()`, which `sessionLock` already
established as the permitted clock in this build, or ride the same escalation.

### `cid/tech/security/03-violation-response-and-logging.md` — the log sink has no reachable home
**Violates:** no module boundary crosses an authority boundary.
**Fix:** `logging.sinkUntilPipeExists.what` is *"a module-local function inside `clearing`"*, but
`kind` includes `channelInadmissible`, and `integrity.channels[]` marks `BuyUpgrade` and
`RequestState` `countsTowardFlag: true` — both handled in `server-main`. A module-local function in
`clearing` is not callable from `server-main`, and `security/01` states *"no new `interfaces` entry"*.
Pick one and state it: either the sink and both counters live in `server-main` (which already owns
both handlers and the `spawnPoses` precedent), or `clearing` exports `log(record)` and this sheet
issues the `interfaces` revision request. Do not leave it inferable.

### `cid/tech/performance/02-server-frame-cost.md` — the scan cost rows were not restated against 1,760
**Violates:** a figure a sibling gate ordered restated must be restated or declined with a reason.
**Fix:** `scanCostModel.rows[2]` and `tickRuling` publish **225,600 / 601,600 / 902,400** against a
47-chunk, 1,880-patch post-terminal bay. `cid/gameplay/_verified-wave4.md:507-509` records that bay
as superseded at **44 chunks / 1,760 patches** and states verbatim: *"Performance's own 225,600 and
601,600 are right in method and were computed against the superseded 47-chunk bay (1,880 patches);
at 44 chunks they become 211,200 and 563,200. Both sides should restate against 1,760 and 16."*
Restate to **211,200 / 563,200 / 844,800**, or state in one line why you decline. Your method is
confirmed correct and every ruling survives — `t ≤ 0.04955` is size-invariant, which is precisely why
the patch count may be corrected without touching the ruling. The same 1,880 propagates to
`budgets.patchCountBasis` (`performance/01`) and `persistence.payload.clearedMaxKeys` and its RR-P5;
those three must move together or not at all.

### `cid/tech/performance/02-server-frame-cost.md` — `invariantTenAlreadyFailsAtMergedValues` uses `LAP_TARGET`, not the per-row lap
**Violates:** a manifest figure presented as a recomputation must reproduce.
**Fix:** the field prints bound **687.5** at the config period and **618.75** at the realised one,
both from 165 s. 165 is `LAP_TARGET` (`meta/04:82`), not any row's lap. `meta/04:195` gives arrival
laps **164/149/161/163/157/157/157/157**, and `meta/04:199` gives the config-period bounds
**683/621/669/678/655/655/655/655**. At the realised 0.13333 those become
**614.7/558.9/602.1/610.2/589.5/589.5/589.5/589.5**. **Your finding is confirmed and is stronger than
you stated**: ordinals 5–8 (624, 624, 640, 640) fail by 34.5 to 50.5 patches, not by 5.25 to 21.25,
and ordinals 1–4 still pass. Restate the two bounds per-row.

### `cid/tech/performance/02-server-frame-cost.md` — the outbound bandwidth figure contradicts the key that owns it
**Violates:** one number, one owning key.
**Fix:** `scanCostModel.otherCostsInsideTheSameTick[1].bandwidthAt7_5Hz` says *"about 62 kB/s at 16
players"*, and the Consequences line says *"Networking work may hold its 62 kB/s figure."* It does
not hold one. `replication.outboundBudget.cadences[0].ceilingBytesPerSecondAt16` is **55,680** —
55.7 kB/s. 62 is the `networking/_lead` index's retired figure, computed at 8.33 sends/s before the
writer applied the quantisation you supplied and got 7.5. Change to 55.7 kB/s. The 20 Hz figure
(149 vs 148.5) already agrees.

### `cid/tech/security/01-position-authority.md` — `cost.note` cites a figure Performance retired
**Violates:** no sheet cites a sibling's superseded value as that sibling's current one.
**Fix:** the field reads *"120 origin advances per second against the 752,000 patch distance tests
per second tech/performance is costing at `runtime.maxPlayers` 16."*
`serverCost.scanCostModel.figuresInCirculationThatAreWrong` names 752,000 explicitly as assuming a
25 Hz cadence `task.wait` cannot produce. The field is also internally inconsistent: its own 120/s
is 16 × 7.5 Hz while 752,000 is 16 × 25 Hz. Restate against whichever row `serverCost` finally
publishes and recompute the share (0.053% at 225,600, not 0.02%). The conclusion — negligible — is
unaffected.

### `cid/tech/security/01-position-authority.md` — publishes the speed ceiling at the config period
**Violates:** same.
**Fix:** `ladderMaxima.effectiveSpeedCeiling` is **45.83** with the derivation `5.5 / 0.12`.
`serverCost` RR-P4 rules that figure 11% optimistic everywhere it is printed and corrects it to
**41.25** (`5.5 / 0.13333`), listing three merged keys and one wave-4 sheet — but not this one, which
is a fifth site. Restate to 41.25 or cite RR-P4 and mark the field pending. **Your conclusion holds
either way and I re-derived it**: 30.72 against 41.25 is 74%, so the clamp still never binds and the
step bound still uses 30.72. I confirmed 30.72 = (16 + 6×1.6) × 1.20 against `GameConfig.luau:63-67`
and `:1528-1531`, and 36.04 = (5.5 + 8×1.1) × 1.44 × 1.75 against `:52-56`, `:1522-1537` and
`:1255`. Both reproduce exactly. So do "no new `interfaces` entry", "no thirteenth `PlayerState`
field" and "no `onLeave` hook" — the origin prunes inside the tick against the `states` collection the
tick already receives, and both re-anchor triggers (`state.spawnPivot`, `state.armState.character`)
are values the tick already reads. Confirmed on all three.

### `cid/tech/persistence/01-the-save-write.md` — no Studio write guard in a key that is asserted to hold one
**Violates:** a criterion in one key must be satisfiable by a field in the key that owns the code.
**Fix:** `release.environments.studioWriteRule` is *"no DataStore write path may run in Studio"* with
`guardLocation: "inside persistence.save, once"`, and `release` AC3 greps `IsStudio` inside
`Persistence.luau`'s write path. The `persistence` key has no such field — no `studioWriteGuard`, no
mention in `retry`, `staleSession` or `forbidden`. I confirmed the gap in the artifact:
`RunService:IsStudio()` appears **exactly once** in all of `game/src`, at `init.server.luau:512`
inside `onShutdown`, so the periodic loop and `onLeave` are unguarded and a Studio play-test past 45 s
writes the live store. Add `studioWriteGuard: { where: "persistence.save, once", readsPermitted: true,
writesPermitted: false }` and a `D16` row with its grep.

### `cid/tech/persistence/01-the-save-write.md` — the release counter has two readings
**Violates:** materially unstated; two builders diverge, and one of them reinstates the defect.
**Fix:** `staleSession.releaseMechanism` says *"three consecutive `save()` returns of
`(false, 'readFailed')`"*; the Consequences section says *"The counter resets on a successful pass."*
When a re-read **succeeds and returns a payload**, `neverClearsWhen` keeps writes blocked forever —
so under the manifest the pass is a failure and the player is released at 135 s, and under the prose
the pass is a success, the counter resets, and the returning player with 18 Finds plays the whole
session at 0 and loses it. That is the exact defect this sheet was written to close. Add to
`reasons[0]`: `"aReReadThatReturnsAPayloadCountsAsAFailedPass": true`, and change the prose to *"the
counter resets only on a pass that writes."* **Otherwise this rule is correct and I checked it
closes the path**: the three reasons separate on exactly the right axis — whether this session's
state came from a successful read — which is why only `readFailed` can never clear and only
`readFailed` releases, `lockHeld` clears cleanly, and `storeUnavailable` releases nobody because
every player in the server is in it.

### `cid/tech/persistence/01-the-save-write.md` — a `[research: url]` tag points at a page that does not carry the claim
**Violates:** every `[research: url]` corresponds to a real fetched source carrying the fact.
**Fix:** line 37 cites `[research: https://create.roblox.com/docs/reference/engine/classes/DataModel#BindToClose]`
for the 30-second budget. `persistence/_lead` records under "Fetched but incomplete" that this fetch
*"returned the Studio note but not the timeout"* and that the sentence came from a search snapshot.
`tech/deploy/_lead` fetched a page that does carry it:
`https://github.com/Roblox/creator-docs/blob/main/content/en-us/cloud-services/data-stores/player-data-purchasing.md`.
Re-cite to that. The fact is sound; the citation is not.

## Predicted cross-category conflicts

Recorded for the final pass, not failures now.

- **1,880 versus 1,760 will surface in three keys at once.** `persistence.payload.clearedMaxKeys`,
  `budgets.patchCountBasis.postTerminalBayPatchCount` and `serverCost.scanCostModel` all carry 1,880
  with `released: false`, and `persistence` RR-P5 asks `architect/03-state-shape` to write 1,880 into
  the contract. If wave 4 releases at 44 chunks, all four move together; if it releases at some third
  count, all four move again. They should cite `depths` rather than restating an integer.
- **Eleven proposed keys where the category lead expected five.** Ruled legitimate (below), but the
  final pass owns the question of whether `ingressLimits`, `prediction`, `ownershipAuthority`,
  `sessionLock`, `storeMigration` and `serverCost` are six keys or six blocks. Every one of the three
  splitting domains offered the collapse as mechanical.
- **Two sheets name the same unowned pipe from opposite sides.** `integrity.logging.pipeRequest`
  ("event-transport work — currently unowned") and `serverCost.instrumentOwner` ("device-measurement
  and telemetry-transport work"), plus `persistence.observability.pipe`. Three domains independently
  reached "nobody owns this." Analytics runs this wave and owns *what* to record, explicitly not the
  pipe. If Analytics also declines, that is one finding, not three.
- **`RequestState`'s cached snapshot holds live tables.** `security/02` `buildBound` caches the
  snapshot between `StateChanged` fires and calls it *"byte-identical by construction"*; `replication`
  `payload.nestedTablesCrossAs` makes `upgrades`, `rowsRevealed` and `found` the **live** tables, and
  `sendRule.changedMeans` does not list `rowsRevealed`. If a row lift can ever move without a
  `StateChanged`, the cache serves a stale row. Today `firstSession.withheld`'s three rows are
  `presentAtJoin: true`, so it is probably unreachable — which is why this is recorded rather than
  raised. If onboarding ever latches a row, it becomes live.
- **`architect` has already merged COMPLETE 7/7 and this category issues 15 revision requests against
  it** (RR-P1..P8, RR-N1/N2/N6, RR-P2..P5, RR-1/2/3/5/6). A closed contract that must reopen for a
  downstream wave is a process question the final pass should name, not a defect in any sheet.

## Settled here, so the final pass need not re-derive them

- **`UserOwnsGamePassAsync` caching: the writer is right and the lead is wrong.** The first-party
  generation source is banked at `cid/_research/pack.md:92` and states verbatim that for an
  out-of-experience purchase in the same session *"the cache is eventually updated, but this process
  might take several minutes to propagate."* The lead's contrary reading rests on an open devforum
  feature request with **no staff reply** that is not in the pack at all. Documentation beats an
  unanswered feature request. The overrule and RR-N4/RR-N5 stand. **And the writer's second claim is
  confirmed: the build is identical under either branch**, because `failureHandling.retry` is *"by the
  next poll only; no retry loop on the join path"* — so if the join check errors transiently, the poll
  is the only recovery for a player who paid, and the 180 s loop is justified with the cache question
  set aside entirely. One correction: the Consequences line says *"the three null `gamePassId`s may
  now be created."* There is **one**. `grep "= nil" GameConfig.luau` returns exactly one `gamePassId`,
  at line 1253, and `products.itemCount` is 1. `deploy/_lead` RR-3 already corrects the same stale
  count in `architect/02-modules`; fix the prose here too.
- **`SetAsync` → `UpdateAsync` survives the doubled API surface.** 16 ÷ 45 s = 21.33 writes/min against
  the experience write budget of 300 + 16×20 = 620 → 3.44%, and against the server budget of 60 +
  16×40 = 700 → 3.05%. Both reproduce. If `UpdateAsync` also consumes a read slot, reads are the same
  21.33/min against 940 experience and 700 server — 2.3% and 3.05%. The sheet's
  `api.budgetAccounting` claim that the block "holds at either reading" is **correct**. The queue
  survives because release was folded into the save write: 16 requests, not 32, against 30, and the
  48-retry figure never queues at once because retries are sequential per player. Per-key throughput
  29.5 kB/min against 4 MB/min = 0.72%, correct. One arithmetic nit, sub-bar and not acted on: the
  `cleared` character derivation sums to 21,453 (9×9 + 90×10 + 900×11 + 881×12), not the stated
  21,465, and the total to 22,127 rather than 22,100. Neither moves the 0.53%-of-cap figure or AC4's
  25,000-character bound.
- **The tick.** Quantisation confirmed: `ceil(d×60)/60`, 0.12 → 0.1333, 0.04 → 0.05, and nothing
  between 0.0334 and 0.05 reachable. The bay bound reproduces from both directions and is
  size-invariant — Performance's `186.3 / (2×1880) = 0.04955` and Gameplay's `40c ≤ 3.9637c / 2t`
  give the same number with the chunk count cancelling, which is why RR-V7's patch-count correction
  does not touch the ruling. Merged ordinals 5–8 do already fail at the realised period; see RR-V8
  for the corrected bound. **The ruling to hold at 0.12 is confirmed.**
- **The 16 emitter-null sites.** Enumeration is **exactly complete**: `grep -n "= nil,\?$"` on the
  shipped `GameConfig.luau` returns precisely the 16 lines listed (197, 375, 383, 439, 550, 597, 706,
  721, 737, 1000, 1239, 1253, 1286, 1354, 1552, 1696) and no others. The eight semantic marks are
  sound under the sheet's own test — a sibling carrying the fact as a machine-readable value makes a
  site documentary, and each of the eight documentary rows names one (`luckShaped = false`,
  `newSinkAppears = false`, `presentAtJoin = true`, `promptGamePassPurchaseCalls = 0`,
  `rolled = false`, `damage = false`). The sheet's self-correction of line 1286 from
  `Depths.invariants` to `Products.headroom` is right: `GameConfig.Products` opens at 1214 and
  `GameConfig.Rarity` at 1325. The four numeric→string type changes (197, 1286, 1552, 1696) match the
  stated count. No action.
- **`RunService:IsStudio()` appears exactly once**, at `init.server.luau:512` in `onShutdown`, with
  the periodic loop and `onLeave` unguarded. Confirmed by grep across all of `game/src`.
  **`release` is the right owner of the rule** — the Studio/live split *is* the environment split
  the workflow node assigns to Build & Deploy, and the sheet correctly routes the phase change to
  `architect/07-wiring` (RR-5) rather than editing it. The guard's *placement* is Persistence's, and
  that is the gap in RR-V12.
- **The key splits are justified; the keys should not nest.** `bridge/merge.mjs:152` rejects only a
  *duplicate* proposal — *"proposes X, already proposed by Y. One key, one owning sheet"* — and
  imposes no per-domain count. `verify-sheets.mjs:271` accepts an `"amends"` block as a data form, and
  `bridge/test/bridge.test.mjs:515` pins that behaviour. So all three splits are mechanically legal,
  each cited the correct line, each named genuinely different readers at different call sites, and
  each offered the collapse as a mechanical nesting. The category lead's "exactly one" was an
  expectation, not a rule, and it is the kind of expectation that should yield to a stated reason.
  Security's choice to carry one key across three sheets via `amends` is the alternative pattern and
  is equally correct. **No revision.**

## What must happen before this category can release

1. **RR-V1 through RR-V5 close.** These are not stylistic: as the sheets stand, a builder cannot
   satisfy `persistence/01` AC3 and `security/03` AC2 simultaneously, and cannot implement
   `security/01`'s step formula without failing `architect/01-runtime` AC3 and `performance/03` N10.
   The `os.*` cluster needs **one** escalation against `architect/01-runtime` criterion 3, jointly
   worded, not four sheets each solving it differently — and `persistence/02`'s RR-P7 as currently
   drafted does not cover `security/01`'s use.
2. **RR-V6 names one home for the log sink**, or the record ships with two writers and no interface.
3. **RR-V7 settles 1,880 versus 1,760 across all four sites at once**, or declines with a reason.
   The wave-4 gate issued the instruction explicitly and it was not executed.
4. **RR-V8 through RR-V14 close.** Each is a single field.
5. **The category re-verifies.** Six of the fourteen requests are cross-sheet, so closing one can
   open another; I will re-read every changed file rather than approving this verdict on its own
   authority.

**Wave 4 remains FAIL**, so every figure this category cites from it is provisional by construction.
That is disclosed correctly on every sheet that cites one and is **not** a reason to hold this
category — but it does mean release here is release of a category whose numbers move when stage 4
lands. The final cross-category pass owns that, and the three unowned pipes above.

---

# Round 2

**Status: FAIL** (round 2 of a maximum of 3)
Twelve of fourteen requests closed correctly, several of them better than I asked for. Three
defects remain, all cheap, and one of them is the round-1 defect in a new costume: the category
still contains a pair of acceptance criteria that cannot both pass, because the peer sheet the
escalation was aimed at did not move.

## Round-1 requests, re-verified against the changed files

| # | request | closed | evidence |
|---|---|---|---|
| V1 | security/03 Kick prohibition | **yes** | `response.forbidden` row now reads *"no `Player:Kick`, ban, disconnect or connection close caused by an integrity flag or by ANY `integrity.response` tier"*, with an `explicitlyExcluded` field naming `persistence/01 staleSession.releaseMechanism` and its reason. AC2 rewritten. |
| V2 | networking/02 `I3` | **yes** | AC2 now reads *"the over-limit branch of each of the two handlers contains no `warn`, `print`, `error`, `Kick`, `Ban` or connection close"*. Scoped to the branch. |
| V3 | security/01 `os.clock()` | **escalated, correctly — but see below** | RR-S1 issued; `step.criterionConflict` and `step.fallbackIfRefused` added. |
| V4 | networking/02 `os.clock()` | **escalated, correctly — but see below** | RR-N8 issued; `algorithm.clockExemption` added with `ridesPersistenceRRP7: false`. |
| V5 | security/03 `os.time()` | **yes, and best of the three** | `at` is now `math.floor(workspace:GetServerTimeNow())`, with a note stating why this sheet rides no escalation. |
| V6 | the log sink's home | **yes** | One sink in `clearing`, exposed as `log(record)`, one `interfaces` entry via RR-S2. |
| V7 | 1,880 → restated | **yes for Performance, no for Persistence** | See defect 2. |
| V8 | the `LAP_TARGET` bound | **yes** | 157.2 s laps, bounds 655 and 589.5, failures 5.9%/5.9%/8.6%/8.6%. |
| V9 | 62 kB/s | **yes, and better than asked** | Withdrawn outright rather than corrected: *"THIS KEY STATES NO BYTE TOTAL … `replication`'s value is authoritative."* One number, one owner. |
| V10 | 752,000 in security/01 | **yes** | `cost.shareOfTickWork` now cites `serverCost.scanCostModel.rows[]` and defers. |
| V11 | 45.83 in security/01 | **yes** | No longer present in the sheet. |
| V12 | `studioWriteGuard` | **yes** | Field added with `where`, `returns: "(false, 'studio')"`, `coversCallSites`, plus `D16` and a rewritten AC1. |
| V13 | the release counter | **yes** | Strict reading, three explicit fields. See ruling below. |
| V14 | the `BindToClose` citation | **yes** | Re-cited; the sheet no longer matches a grep for that anchor. |

## Ruling on the two clock escalations

**Both arguments are correct, and they are genuinely two arguments, not one repeated.**

**Security's (RR-S1) is right.** The stated rule in both criteria is layout determinism — N10's own
text is *"introducing a second source of randomness, or reordering, re-sorting, compacting or
reindexing `layout`'s patch array"* — and a monotonic elapsed-time read introduces none of the three
and reads nothing `layout` produces. The observable genuinely overshoots the rule it enforces. The
counter-argument is also right and I checked it: `GetServerTimeNow()` is synchronised, can step
backwards on a correction, and a backwards step inside a payout gate is a defect. Naming
`fallbackIfRefused` with its cost analysed (a backwards step yields `dt ≤ 0`, clamps to 0, advances
the origin not at all for one tick; a forwards step is bounded by `dtCapSeconds` **and** by the
coverage cap) means no builder waits on the escalation. That is exactly the shape I asked for.

**Networking's (RR-N8) is right and is a different argument.** *"A bucket refilled from a
synchronised wall clock refills backwards when that clock steps, handing a modified client free
tokens."* That is a security property of a rate limiter, not a restatement of Security's payout-gate
concern — different mechanism, different victim, different failure. Its distinction between the two
clocks is exactly correct: a lock heartbeat must be comparable **across** servers, so
`GetServerTimeNow()` is right in `persistence/02`; a token bucket needs a monotonic delta on **one**
server, so it is wrong here. Rejecting the per-tick refill job for destroying `serverCostAdded.perTick: 0`
is also right. And `ridesPersistenceRRP7: false` is correct on its stated ground: RR-P7's wording
neither forbids nor permits a bucket, because a bucket derives no placement, payout or grant.

**Security's `os.time()` → `GetServerTimeNow()` switch is right, and is the sharpest judgement in
the round.** A timestamp is an instant, not a duration; the synchronised clock serves an instant
exactly; and the switch removes a whole sheet from the escalation rather than widening it. "RR-S1
covers one use, not two" is a real reduction in what has to be argued upstream.

**So: two arguments, one fix.** Both uses need precisely the same sentence — *a monotonic
elapsed-time read is permitted* — and neither needs anything the other does not. **One restatement
covers both, and there must therefore be one request, not two.** That is defect 1.

## Ruling on the sink scoping

**Honest, not a retreat.** I re-read `security/01`'s original claim: *"No new `interfaces` entry, no
`PlayerState` field and no `onLeave` hook are needed, **because the re-anchor triggers are
`state.spawnPivot` and `state.armState.character`, which the tick already reads.**" The justification
given was always about the re-anchor path, so the claim was scoped by its own stated reason before
anyone narrowed it. It was never a claim about `integrity.logging`, and all three still hold for
`positionAuthority` — I re-verified each. The `narrowsWhichEarlierClaim` field says exactly this and
does not pretend the original was more careful than it was.

**The rejections are also right.** Two sinks genuinely cannot work: `maxRecordsPerServerPerMinute`
is one counter and two sinks would each enforce it separately, giving 120/minute. And
`server-main` genuinely cannot host it — `game/src/server/init.server.luau` is a `Script`, not a
`ModuleScript`, so it can expose nothing to `clearing`; I confirmed the file name. One
`interfaces` entry is the minimum, and RR-S2 asks for exactly one.

## Kick criteria: jointly satisfiable, and now mutually reinforcing

`persistence/01` AC3 requires exactly one `Player:Kick`. `security/03` AC2 now reads: *"`grep
":Kick(\|BanAsync\|banList" game/src/server/Clearing.luau` returns nothing, and the only `:Kick(`
anywhere in `game/src` is `persistence/01`'s stale-session release in `server-main`."*
`networking/02` AC2 is scoped to the over-limit branch of two handlers. **All three pass on the same
artifact.** Better than I asked for: `security/03` AC2 no longer merely tolerates the kick, it
*asserts the same fact* `persistence/01` AC3 asserts, so the two criteria now fail together if
anyone adds a second kick. That is the right repair.

## Persistence's strict reading closes the hole and opens no new one

`aReReadThatReturnsAPayloadCountsAsAFailedPass: true`, `aReReadThatFailsCountsAsAFailedPass: true`,
`counterResetsOn: "a pass that writes, and on nothing else"`. I checked the three populations:

- **Returning player, save intact, join read failed** — released at 135 s. This is the stated cost
  and it is the right trade: the alternative is the round-1 defect, a whole session lost silently.
- **New player, no save, join read failed transiently** — the re-read succeeds and returns `nil`,
  `clearsWhen` fires, the latch clears, the pass writes, the counter resets. **Never kicked.** The
  strict rule only releases players who have something to lose, which is the population it exists
  to protect.
- **Studio play-test** — this is where a strict "resets only on a pass that writes" rule would have
  kicked every player at 135 s, because `studioWriteGuard` suppresses every write. The sheet found
  that interaction itself: `studioWriteGuard.returns` is `"(false, 'studio')"`,
  `isAStaleSessionReason: false`, `countsTowardRelease: false`, and `releaseMechanism` triggers only
  on `readFailed`. **Closed before I could raise it**, and it is the interaction most likely to have
  been missed.

No new hole. RR-P3's widening of `save` to `(boolean, string?)` is what makes all three distinguishable.

## The reference rewrite (RR-P5): right shape, wrong target, and it did not pre-empt the conflict

Asking `stateShape` for a pointer instead of an integer is the correct move and it does remove
`persistence` from the class of sheets that must be edited every time a chunk count moves.
**But the pointer does not resolve, and the two sheets that now hold pointers disagree on it.**

- `persistence/01` `payload.clearedMaxKeysSource` → `depths.postTerminalBay.patchCount`
- `performance/01` and `/02` → `depths.postTerminalArea.patchCount`
- `cid/gameplay/_verified-wave4.md:354`, the released gate, names → **`solvency.postTerminalBay.patchCount`**

Three names, one field. A reference is worth exactly what its path is worth, and neither of these
two resolves. `bridge` cannot catch it because both are prose strings rather than merged manifest
paths, which is precisely why a human pass has to. `persistence/03` AC3 already requires that
*"every row names a contract key and field path that resolves in the merged manifest"* — the same
discipline has to apply here.

## Loop cost: one stale publisher remains

Wave 4 closed **PASS at round 3** with a 42-chunk bay, 1,680 patches, and
**201,600 / 537,600 / 806,400**. Performance restated to exactly those figures and added
`supersededFigures` recording all four dead sets — a good pattern, and its AC3 now forbids
752,000, 940,000, 902,400 and 844,800 by name. Security defers to `serverCost.scanCostModel.rows[]`
and publishes no number. **But `persistence/01` still publishes 1,880 as a value**, in
`clearedMaxKeysAtCitedRevision`, with `clearedMaxKeysSource` reading *"At the wave-4 revision those
are 1200 and 1880; **UNRELEASED, `cid/gameplay/_verified-wave4.md` line 3, 'Stage 4 does not
release'**"* — a status that is now false on both counts, since line 3 reads *"Final verdict: PASS
(round 3)"*. `supersedes` ("low by 2.94×") and `worstCaseDerivation` ("at 1880 keys") ride the same
stale figure. The payload bound stays safe because 1,680 < 1,880 and AC4 tests against 25,000
characters, so nothing a player sees moves — but the category does still publish a superseded number
and a false release status, which is what round 1 asked it to stop doing.

One smaller instance: `security/01` `cost.shareOfTickWork` says *"the 1,880-patch row `serverCost`
**currently publishes**"*. It publishes 1,680. The field defers correctly and the percentages hold
either way; the sentence about a sibling's current content is wrong.

## The two ceiling ranges: both derivations check out

- `serverWorldInstanceCeilingTestRange` [10,500, 12,800] against AC2's two anchors, 10,336 and
  12,920. Every value in the range keeps `10,336 ≤ ceiling` true and `12,920 > ceiling` true, so
  AC2 holds across the whole range instead of flipping inside it. Correct, and it is the open
  interval between the two numbers AC2 separates, rounded inward. This was my round-1 noted-not-acted
  item and Performance found it without being asked.
- `clientStreamedInstanceCeilingTestRange` [5,900, 10,000] against a 5,814 worst case. Every value
  is ≥ the worst case; no criterion asserts an upper breach, so the top is unconstrained. Correct.

## 589.5 versus 588.75

**589.5 is right.** `meta/04:199` publishes the merged config-period bound as **655** for ordinals
5–8, and `655 × 0.24 = 157.2 s`. Gameplay's 588.75 comes from the **rounded** 157 s on
`meta/04:195`, which is a display value. The clean check: the realised bound is the config bound ×
`0.12 / 0.13333` = × 0.9 exactly, and `655 × 0.9 = 589.5`. Gameplay's figure is 0.13% low. Nothing
turns on it — 624 and 640 exceed both — and Performance's stated failure margins (5.9%, 5.9%, 8.6%,
8.6%) reproduce against 589.5.

## The 225% breach: a Balance finding, and Performance has finished its part

**Wave-5 finding, no. Balance/Meta finding, yes — and it is now a cross-gate finding, which is the
sharper description.** Performance owns the ceiling and has published it; `depths`/`solvency` own
the patch count. Three chunk reductions (47 → 44 → 42) have moved the breach 251% → 225%, which is a
10% improvement for a 2.25× problem, and `performance/03` forbids every optimisation that would
close the gap — correctly, since each of them breaks a binding constraint. There is nothing left for
this domain to do: it named the ceiling, named the lever, and refused the cheap ways out.

What must be recorded, because neither gate can see it alone: **wave 4 released at PASS with a
post-terminal bay that breaches wave 5's server instance ceiling by 2.25×.** Wave 4 could not see it
because the ceiling did not exist when it ran; wave 5 cannot fix it because the lever is not its
field. That is the final cross-category pass's, and it is the single largest item this category
hands it. It does **not** block Tech's release: this category's sheets are internally consistent
about it and route it correctly.

## Round-2 revision requests

### `cid/tech/performance/03-what-optimisation-may-never-do.md` — N10 was not amended, so the contradiction is still inside the category
**Violates:** acceptance criteria must be mutually satisfiable.
**Fix:** N10's check cell is unchanged and still reads
`grep -rn "math.random\|Random.new()\|os.time()\|os.clock()\|tick()\|table.sort" game/src` matches
nothing. `security/01` and `networking/02` both now ship `os.clock()` deliberately. `performance/03`
AC2 requires every check in the table to produce its stated result against the current `game/src`,
including N10 by name — so if those two sheets are built, this sheet's own AC2 fails.
**An escalation against `architect/01-runtime` AC3 is legitimate: architect is upstream, merged, and
CID may not edit it. An escalation against `performance/03` N10 is not — it is a peer sheet, in this
category, in this wave, revised this round.** Amend N10's check to the agreed wording and record the
architect half as the only thing still open. Splitting the pair is the whole repair: the upstream
half goes up, the sibling half closes here.

### `cid/tech/networking/02-ingress-limits.md` — two competing restatements of one criterion
**Violates:** one field, one request.
**Fix:** RR-S1 asks for *"no module derives a placement, an award amount or a grant from an unseeded
RNG or from a wall clock; a monotonic elapsed-time read is permitted."* RR-N8 asks for *"no module
derives a placement or a grant … a monotonic elapsed-time read (`os.clock`) is permitted, and
`math.random`, `Random.new()` with no seed, `os.time()` and `tick()` remain forbidden."* Two
different texts against the same two criteria, and each sheet tells the other to join it —
`security/01` says *"`ingressLimits` … should cite RR-S1 rather than issue a third request"*, while
`networking/02` says *"RR-N8 is worded to cover both instruments; joining it is cheaper."* Architect
cannot apply both. **Withdraw RR-N8 and cite RR-S1, carrying RR-N8's better half into it** — the
explicit "and `math.random`, `Random.new()` with no seed, `os.time()` and `tick()` remain forbidden"
clause, which is what stops the restatement from being read as a general clock amnesty. Networking's
bucket argument is correct and should survive as the *second* justification inside the one request,
not as a second request.

### `cid/tech/persistence/01-the-save-write.md` — still publishes 1,880 and a false release status
**Violates:** no sheet publishes a superseded figure or a stale gate status.
**Fix:** `payload.clearedMaxKeysSource` reads *"At the wave-4 revision those are 1200 and 1880;
UNRELEASED, `cid/gameplay/_verified-wave4.md` line 3, 'Stage 4 does not release'."* Line 3 now reads
*"Final verdict: PASS (round 3)."* Set `clearedMaxKeysAtCitedRevision` to **1,680**, drop the
UNRELEASED clause, and correct `supersedes` (2.625×, not 2.94×) and `worstCaseDerivation` ("at 1,680
keys"). **And fix the path in the same edit:** `depths.postTerminalBay.patchCount` does not resolve;
`_verified-wave4.md:354` names **`solvency.postTerminalBay.patchCount`**. RR-P5's body carries the
same wrong path and the same 1,880 and must move with it. `performance/01` and `/02` carry a
*third* spelling, `depths.postTerminalArea.patchCount`; whichever of you is right, one field name
has to be agreed between the two of you before either pointer is worth having. Also
`security/01` `cost.shareOfTickWork` says `serverCost` "currently publishes" 1,880 — it publishes
1,680; one clause.

## What must happen before round 3 closes

1. **N10 is amended in this category** and the two clock requests become one against architect only.
   Until then a builder cannot satisfy `security/01`, `networking/02` and `performance/03` AC2
   together — the round-1 defect, relocated.
2. **One field name for the post-terminal bay's patch count**, agreed between Persistence and
   Performance and matching the released wave-4 gate, and 1,680 published everywhere or referenced
   everywhere.
3. Nothing else. The other eleven closures hold on re-reading, four of them are better than what I
   asked for, and no revision broke anything I had previously passed — I re-checked the Kick trio,
   the studio-guard/release-counter interaction, both ceiling ranges and every restated cost figure
   against the artifact.

---

# Round 3

**Status: FAIL** — one defect, one cell, mechanically determined, and **it is mine as much as
theirs.** Both round-2 items closed correctly and well. The amended `N10` fixed the token it was
asked to fix and left a second token in the same pattern that fails against the shipped artifact —
a defect present in the first draft, that I passed in rounds 1 and 2, and that is not a regression
caused by any revision in this wave.

## The amended N10 grep does not pass, and the reason is not the clock

The new pattern is
`grep -rn "math.random\|Random.new()\|os.time()\|tick()\|table.sort" game/src`, expected to match
nothing outside a `Random.new(seed)` derived from `GameConfig.LayoutSeed`. I ran every token against
the current tree:

| token | matches in `game/src` | verdict |
|---|---|---|
| `math.random` | none | passes |
| `Random.new()` | none — `Layout.luau:175, 299, 386, 597, 635` are all `Random.new(seedFor(...))`, which the literal pattern does not match and the exemption covers anyway | passes |
| `os.time()` | none | passes |
| `tick()` | none | passes |
| `os.clock()` | **out of the pattern, deliberately** — it would have matched `Pressables.luau:447, 548, 557` and `Beats.luau:416, 458, 500, 553` | the narrowing is correct; see below |
| `table.sort` | **`Layout.luau:428` and `Beats.luau:505`** | **fails** |

**So the grep returns two matches where the stated result is "nothing".** `performance/03` AC2 names
`N10` explicitly among the rows that must produce their stated result against the current
`game/src`, so **this sheet's own AC2 fails on this sheet's own artifact.**

**Neither match violates N10's rule, and that is what makes it dangerous rather than cosmetic.**
`Beats.luau:505` sorts a client-side beat queue and touches nothing `layout` produces.
`Layout.luau:428` is the sharp one: it builds a separate `order` array of *indices* and sorts it by
squared spawn distance, returning `order` while leaving `patches` untouched. That is the
spawn-distance ordinal `firstSession.placement` reads ("patch ordinal in spawn-distance order") and
that `discovery` reads for where the first Find sits. It is not a reordering of `layout`'s patch
array — but it is the single line in the repository that most *looks* like one. **A builder running
AC2, finding two failures, and reaching for the one inside `layout` would change which patch is
first by spawn distance, which moves the first Find.** That is player-visible and index-relevant,
and it is the outcome N10 exists to prevent. The observable, followed literally, instructs the
violation the rule forbids — the same disease as the `os.clock` case, one token over.

**Fix, and there is no judgement left in it:** drop `table.sort` from the pattern and carry it as a
named-site exemption instead — *"`table.sort` is permitted only on an index array derived from
`state.patches`, never on `state.patches` itself; `Layout.luau:428` (spawn-distance ordinal) and
`Beats.luau:505` (client beat queue) are the two permitted sites and no third may be added."* That
is checkable, it is narrower than the rule, and it protects what the rule protects.

## The narrowing is more justified than Performance argued

Worth recording because nobody said it: **`architect/01-runtime` AC3 has been failing against the
shipped build since before wave 5 ran.** Its pattern includes `os.clock()`, and
`game/src/client/Pressables.luau` and `game/src/client/Beats.luau` carry seven `os.clock()` calls
between them, shipped, type-checking, passing every gate. `Pressables.luau:436` even carries the
comment *"os.clock, not tick or DateTime: a monotonic clock cannot be moved by the system"* — an
earlier builder reached the same conclusion Security and Networking reached, independently, and the
criterion has been silently false ever since. So the one-token narrowing does not merely permit two
new uses; **it makes a merged acceptance criterion true for the first time.** Carrying it into
`architect/01-runtime` AC3 as a fourth change inside RR-P4 is the right route — only `architect` can
edit that pattern — and RR-S1/RR-N8 standing beside it is correct rather than redundant, because
they are the two sheets that have to cite something.

Tying the surviving `os.time()` ban to `01-FOUNDATION.md`'s *"no offline accumulation"*
`[brief: binding]` is the right anchor: it makes the ban a consequence of a binding brief line
rather than of a grep, so the narrowing cannot be read as a general clock amnesty. Good move.

## The pointer, and both original spellings

**Resolved correctly, and the verification method was right.** Both writers read the released
manifest rather than negotiating: `balance/03:96` declares `solvency`, `:124-125` carries
`postTerminalBay.patchCount: 1680`, `:115-122` carries the ledger with area 8 at **1,120**. I
confirmed the residue in `persistence/01`: `pointersThatDoNotResolve` records all four dead or stale
spellings with the reason each fails, including the two that *do* resolve but carry the superseded
640 (`depths.areas[].patchCount`, `endgame.postTerminalArea.patchCount`). Recording a pointer that
resolves-but-is-stale beside one that does not resolve at all is the more useful of the two facts
and it was not asked for.

`clearedMaxKeysSource` now reads
`max(solvency.areaLedger[].patchCount, solvency.postTerminalBay.patchCount)` — both halves inside
one manifest block, which is why one pointer suffices where the round-2 draft needed two. Correct.

## Spot-check of the re-derived character count: correct, and it explains my round-1 nit

`worstCaseChars` 22,100 → **19,700**, at 681 four-digit keys.

- **The key census is right.** 1,000…1,680 is 681 keys; 9 + 90 + 900 + 681 = 1,680 exactly.
- **The delta is exactly right.** 881 − 681 = 200 four-digit keys × 12 chars = **2,400**, and
  22,100 − 19,700 = 2,400.
- **My round-1 "arithmetic nit" was wrong and I withdraw it.** I computed the `cleared` term as
  21,453 against a stated 21,465 and called the 12-char gap a slip. The re-derivation makes the
  missing term explicit — *"plus a 12-char wrapper"* — so 19,053 + 12 = 19,065 and 21,453 + 12 =
  21,465. The sheet was right both times and I had missed a documented term. Recorded so the final
  pass does not inherit my error.
- **Every dependent figure moved with it, which is the part most often missed.**
  `worstCasePercentOfValueCap` 0.53 → **0.47** (19,700 / 4,194,304 = 0.470%),
  `perKeyUsedKBPerMin` 29.5 → **26.3** (19.7 KB × 60/45 = 26.27), `perKeyPercentOfThroughput`
  0.72 → **0.64** (26.3 / 4,096 = 0.642%), `supersedes` 2.94× → **2.625×** (1,680 / 640). All four
  reproduce.
- **One cosmetic residue, sub-bar and not acted on:** the component sum is 19,739 and the published
  total is 19,700, i.e. rounded *down* to the nearest hundred. A worst-case bound should round up.
  It is 0.2% on a figure with 5,261 characters of margin against AC4's 25,000, so nothing turns on
  it; the same rounding was in the 22,100.

Performance's middle row also reproduces at the released area-8 count of **1,120**:
1,120 × 16 × 7.5 / 20 / 30 = **134,400 / 358,400 / 537,600**. The bay row holds at
201,600 / 537,600 / 806,400. Both sides now compute from the same released ledger.

## Ruling on the RR-P8 timing change: right, and it prevents a gratuitous wipe

**`B1`/`B2` fire when `solvency`'s revision table lands in `depths` and `endgame`, not when
`solvency` released.** That is correct, and the reasoning is the load-bearing part: the index space
`state.cleared` is keyed to is whatever `layout.build(k)` actually produces, and `layout.build`
reads `depths.areas[].chunkCount` and `layout.composition`. `solvency` is a proposed key that no
module reads. Approving it changes **no byte** of `game/src/shared/GameConfig.luau`; editing
`depths`/`endgame` and re-emitting does. The sheet's own evidence proves it —
`endgame.postTerminalArea.patchCount` still reads 640, so the shipped build demonstrably still has
the old index space while `solvency` is released.

Getting this wrong in the other direction is expensive: a bump owed on *approval* would take
`ArgaRuin_v3` → `v4` for a change the build had not taken, and since `translate.discard` throws away
`cleared` on every migration, that is a gratuitous wipe of every player's current-area progress to
track a number nothing reads. Making RR-P8 conditional on the edit is the right call and it is the
kind of precision the trigger list was written for.

**One residual, named not raised:** `B2`'s field path is `depths.areas[].patchCount` and
`.chunkCount`. If any module ever begins reading `solvency`'s counts directly, the index space would
move without `B2`'s named field moving, and neither `B6` (semantic change) nor `B7` (encoding
change) names it either. Unreachable today because nothing reads `solvency`; worth one clause
whenever that key is promoted.

## The withdrawn `runOrdinal` request

**Withdrawing it was right for Persistence** — the request was never Persistence's to justify, the
seven persisted fields are untouched, `stateShape` stays at twelve, and reinforcing the withdrawal
in three places (`payload.runOrdinalDerivable: false`, `D9` banning a session or join counter by
name, and a `Not decided here` route) is the correct way to stop a withdrawn field being quietly
re-added by a later sheet. Nothing in this category depends on it.

**The predicate Analytics settled on is not quite what they think it is, and it is theirs to fix.**
"A brand-new save is byte-equal to `defaultState()`" is true, but so is the save of a player who
joined, cleared nothing, and left inside the first few seconds — `wiring.onLeave` step 2 saves
unconditionally, and every one of the seven fields is still at its default. So the predicate is
*"has never made progress"*, not *"run 1"*, and the two differ for exactly the join-and-bounce
population, who are counted as new on every return. That population is the one a first-session
funnel cares most about. Routed to Funnels and Engagement; it is not Tech's field and it bears on no
Tech decision.

## Carried to the final cross-category pass

1. **Wave 4 released at PASS with a post-terminal bay that breaches wave 5's server instance ceiling
   by 2.25×** — 16 × (1,680 + 6) = 26,976 against `budgets.serverWorldInstanceCeiling` 12,000. Wave 4
   could not see the ceiling because it did not exist when wave 4 ran; wave 5 cannot move the count
   because `solvency.postTerminalBay.patchCount` is not its field; and `performance/03` correctly
   forbids every optimisation that would close it, because each one breaks a binding constraint.
   Three chunk reductions have moved it 251% → 225%, so trimming is not converging. **Neither gate
   can close this alone and both have discharged their part.**
2. **42 explicit nulls across six Analytics sheets** — `funnels/02` 13, `kpis/02` 13,
   `engagement/03` 8, `engagement/01` 5, `engagement/02` 2, `economy/03` 1 — against
   `tech/deploy/02`'s rule that an emitted null is a **hard error**, with a 16-row remediation table
   naming none of them. Harmless while those keys are `proposed`, because a proposal is not emitted.
   **It becomes a promotion blocker the instant any one of them is promoted**, and it blocks in two
   places at once: `deploy/02` AC1 (`grep -n "= nil" GameConfig.luau` returns nothing) and AC3
   (`bridge --emit` must exit non-zero on any null). Either those 42 sites get sentinels under
   `deploy/02`'s per-type convention, or `deploy/02`'s rule is relaxed — and relaxing it re-opens
   the `gamePassId` → `0` decision that `release.provisioning`'s "the build runs at every gate"
   depends on. A dated conflict, not a latent one.

## Verdict

**FAIL**, on one defect: `performance/03` `N10`'s check retains `table.sort`, which matches
`Layout.luau:428` and `Beats.luau:505`, so `performance/03` AC2 does not pass against the artifact,
and the observable followed literally points a builder at the spawn-distance ordinal.

**It is a defect, not a design disagreement.** N10's *rule* is right and nobody disputes it; only
the observable over-matches, and the correction is one token plus a two-site exemption with no
judgement in it. Three qualifications belong on the record:

- **It is not a regression.** `table.sort` was in N10's pattern in the first draft and
  `Layout.luau:428` shipped long before wave 5. Nothing done in rounds 2 or 3 caused it.
- **I passed it twice.** I verified N10's clock token in both prior rounds and never ran the rest of
  its own pattern. The round-1 report should have caught this and did not.
- **Everything requiring judgement is settled.** All fourteen round-1 requests and both round-2
  requests are closed, several better than asked; both clock escalations are correct; both cost
  models now compute from the same released ledger; the pointer resolves; the character
  re-derivation is right; the RR-P8 timing change is right. This is the last mechanical thread in an
  otherwise closed category.

The three-round cap being spent is a fact about scheduling, not evidence about the artifact, and I
will not pass a criterion that fails against the shipped tree because I am out of rounds. If the
coordinator's process admits an erratum outside the round count, **this is erratum-class**: one
cell, one token, a two-site exemption, zero design content, and it needs no further verification
pass because there is nothing left to judge. If it does not, the category re-runs on this one cell
alone.

---

# Round 3 (continued) — the erratum, verified and closed

**Status: PASS. Tech & Data releases.**
The one cell that held round 3 open is fixed, and I re-ran every claim against the tree rather than
accepting the report of it.

## The amended N10 pattern passes

I ran the new pattern token by token against the shipped tree. `grep -rn
"math.random\|Random.new()\|os.time()\|tick()" game/src` returns **two matches and neither is code**:

| hit | what it is |
|---|---|
| `game/src/shared/Layout.luau:70` | a comment — *"no math.random, no unseeded Random.new, no os.time and no os.clock"* |
| `game/src/client/Beats.report.md:104` | a build-report line naming `tick()` in order to say it was not used |

**Zero code matches.** `os.clock` and `table.sort` are both out of the pattern, so the two sites that
failed round 3 — `Layout.luau:428` and `Beats.luau:505` — no longer match anything, and the seven
shipped `os.clock()` calls in `Pressables.luau` and `Beats.luau` no longer match either. The
prose hits are the rule being *described*, which is the healthiest possible failure mode for a grep
and needs no exemption.

**The exemption is a table with two rows and a new AC3 that counts them**, so a third site fails
rather than being silently absorbed. That is the part I asked for and the part most easily skipped.
The reasoning attached to `Layout.luau:428` is now stronger than my own: it *produces* an ordinal
rather than renumbering one, `patches` is never touched, and **the ordinal is what
`firstSession.placement.ordering` and `discovery` read — so removing the call is what would move the
first Find.** The row therefore protects the line rather than merely tolerating it, which inverts the
hazard I raised. `Beats.luau:505` is correctly separated on a different ground entirely: a
presentation queue on the drain path, no patch index, nothing persisted or replicated, on the far
side of the wire from any save data.

**`N10`'s observable has now overshot its own rule twice, and the sheet says so in those words.**
That is the right thing to have written down. Both overshoots were the same mistake — a token that
matched a mechanism rather than a consequence — and a rule stated as "deriving X from Y" with a grep
for Y will keep making it. Recorded for whoever writes the next prohibition set.

## The remaining round-3 items

- **Persistence, both closed.** Citation corrected and marked `RELEASED` with the correct line-3
  quote; bound 1,880 → **1,680**; area 8 1,200 → **1,120**; `supersedes` 2.94× → **2.625×**; pointer
  resolved to **`solvency.postTerminalBay.patchCount`** with all four dead or stale spellings kept in
  `pointersThatDoNotResolve`. `worstCaseChars` is now **19,739 exact**, which I recompute as
  19,065 + 491 + 48 + 67 + 58 + 10 and which reproduces to the character. The rounding rule was taken
  and generalised better than I stated it: *"a worst-case bound may only ever be restated upward;
  19700 rounds toward the thing it bounds and is wrong even with 5261 characters of margin."*
- **AC3's silent failure is carried into RR-P4** as the fourth change, which is the only route —
  `architect` owns that pattern. The narrowing makes a merged criterion true for the first time
  rather than widening one, and that sentence is now in the request rather than only in this file.

## The null rule is enforced, and it vindicated an enumeration done by hand

`validateManifest` (`bridge/schema.mjs:686`) now walks every merged value and names the JSON path of
any null. **It found exactly the 16 sites Build & Deploy had enumerated by hand** — the same 16 I
verified in round 1 by grepping the emitted artifact. A hand enumeration and an automated walk
agreeing exactly is the strongest available evidence that both were complete, and it is worth more
than either alone. The validator's own comment records that the rule then caught nulls in two Audio
sheets in the same wave, one of which had a criterion *requiring* the null — so the rule generalised
beyond the category that wrote it, which is what a good invariant does.

**The three sites that needed judgement rather than substitution are correctly judged.** `"none"` is
wrong on an upper-bound field, and both `traversal.fall.maxSurvivableFallStuds` and
`setBonus.axisHeadroom.value.availableToSets` took `"unbounded"` instead — `"none"` would have
asserted a zero-stud survivable fall and zero axis headroom, in both cases the exact inverse of the
decision. `depths.areas[0].maxRadiusProduct` took **2.18**, restructured rather than sentinelled,
because that row has a real threshold that no shipped product reaches: `"none"` would forbid every
product and `"unbounded"` would license any. Three fields where a sentinel would have lied, each
caught. That is the distinction `deploy/02` was written to force and it held on first contact.

**One state note, not a defect.** `game/src/shared/GameConfig.luau` still carries all 16 `= nil`
lines, because emission is a separate `--emit` step and `bridge` COMPLETE was run without it. The
sheets are fixed and the validator proves it; the artifact is stale. Per `CLAUDE.md` — *"specs are
build artifacts and are never hand-edited"* — this closes on the next emit and is a build step, not a
revision. `deploy/02` AC1 and AC4 and `persistence/01` `D6`'s observable all read that artifact, so
they pass only after it runs. `persistence/01` already discloses the same class of staleness for
`depths.areas[].patchCount`, which "was not re-emitted and still carries the superseded 640."

## Final check results

| # | check | result |
|---|---|---|
| 1 | every persisted value in the save schema | **PASS** |
| 2 | every remote has a server-side validation rule | **PASS** |
| 3 | budgets derive from the brief's device floor | **PASS against the narrowed check** — the original is unsatisfiable and the narrowing is recorded in round 1 |
| 4 | no module boundary crosses an authority boundary | **PASS** — closed by RR-S2's single `clearing.log(record)` entry |
| 5 | migration path and rollback procedure | **PASS** |
| 6 | unbounded growth named and capped | **PASS** |

## Handed to the final cross-category pass

1. **The 2.25× ceiling breach.** Wave 4 released at PASS with a post-terminal bay of 1,680 patches;
   16 × 1,686 = 26,976 against `budgets.serverWorldInstanceCeiling` 12,000. Wave 4 could not see the
   ceiling because it did not exist when wave 4 ran, and wave 5 cannot move the count because
   `solvency.postTerminalBay.patchCount` is not its field. Both gates have discharged their part and
   neither can close it. **This is the largest item leaving this category.**
2. **The Analytics nulls**, now fixed in every merged key and remaining only in unpromoted proposals,
   which the walk cannot reach until promotion. The validator will catch each one at the moment its
   key is promoted, which is the right time and the right mechanism.
3. **Three unowned pipes**, named identically from three directions: the integrity log transport, the
   device-measurement instrument, and the save-failure warning sink. Analytics owns *what* to record
   and explicitly not the pipe. If it also declines the transport, that is one finding, not three.
4. **Fifteen revision requests against a contract that had already merged COMPLETE 7/7.** A closed
   contract reopening for a downstream wave is a process question, not a defect in any sheet, but it
   should be answered once rather than fifteen times.

## What this verdict rests on

Every closure in rounds 2, 3 and this one was re-read against the changed file, and every figure was
recomputed rather than accepted: the ladder maxima against `GameConfig.luau`, the DataStore budget
against the published formulas, the quantisation and the tick bound from both directions, the
invariant bounds against `meta/04`'s own rows, the character count to the character, the two ceiling
test ranges against the criteria they must not invert, and the N10 pattern token by token against
the tree. Two of my own findings were withdrawn on re-checking and are recorded as withdrawn: the
21,465 "arithmetic nit," which was a documented wrapper I had missed, and the round-1 pass on N10's
own pattern, which I should have run and did not.

**The category releases.**
