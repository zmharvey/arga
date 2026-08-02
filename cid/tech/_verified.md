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
