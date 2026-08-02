# 01 — Position authority

**Domain:** tech/security · **Category:** Tech & Data · **Wave:** 5

## Decision

`clearing.tick` measures its radius test from a **server-held XZ origin**, advanced toward the
reported `HumanoidRootPart` position by at most one bounded step per tick, and never from
`root.Position` itself (`Clearing.luau:345`, `:398`). The step is a formula over
`modifiers.effective(state, "speed")` and **measured** elapsed time, capped so the swept corridor
is always continuous; a deviation becomes a *violation* only through a leaky-bucket accumulator.

## Why

- **The exploit is real and the brief never named it.** The server pays for every patch inside a
  radius of `root.Position`, and a client with network ownership of its character can "teleport to
  any position" and "manipulate their movement and state, such as flying or changing their speed"
  `[research: https://create.roblox.com/docs/scripting/security/network-ownership]`. Position is a
  client-owned input and it is the sole input to both protected surfaces: `state.found` and
  `state.cleared` are written only inside the same loop that credits currency
  `[research: game/src/server/Clearing.luau]`.
- **A delayed origin loses a legitimate player nothing, and that is a brief decision rather than a
  tolerance.** *"Cleared is permanent — overgrowth never returns"* `[brief: binding]` ←
  `[you chose: R2 Q1]`. An origin that lags sweeps the segment it skipped one tick later and the
  patch is still standing when it gets there. Nothing is lost and nothing is re-paid.
- **The straight-line catch-up is what makes lag free.** The origin never jumps: it always moves
  *along* the segment toward the reported point. Combined with the coverage cap below — the
  advance is never more than `1.5 × effective radius` — consecutive discs always overlap, so no
  patch inside the corridor the origin walks can be skipped. That inequality is the reason the cap
  exists; it is not a tuning preference `[cid: decided]`.
- **The constant is the wrong clock and the sheet must say so.** `Clearing.luau:485` drives the
  loop with `task.wait(Config.ClearTickRate)`, which resumes on the next 60 Hz Heartbeat and
  realises `ceil(0.12 × 60) / 60 = 0.1333 s`, not 0.12. It grows further under load. A validator
  using `runtime.clearTickRate` as its elapsed time under-budgets every step and false-positives on
  every server hitch, which is exactly the failure Roblox warns about — "basic heuristics can flag
  innocent players with unstable connections", and position updates require "averaging over time"
  `[research: https://create.roblox.com/docs/scripting/security/network-ownership]`. The same page's
  leaky-bucket recommendation supplies the averaging.
- **The instrument is `os.clock()` and the criterion that forbids it is the thing that is wrong.**
  Two greps in force — `architect/01-runtime` AC3 and `performance/03` `N10` — match `os.clock()`
  across `game/src` and expect zero. **Both stated rules are about layout determinism**: `N10`'s is
  *"introducing a second source of randomness, or reordering, re-sorting, compacting or reindexing
  `layout`'s patch array"*, and AC3's purpose is one `LayoutSeed`. A monotonic elapsed-time read
  introduces neither randomness nor reordering and touches nothing `layout` produces, so **the
  observable overshoots the rule it enforces.** A wall clock here would be strictly worse:
  `workspace:GetServerTimeNow()` is synchronised and can step backwards on a correction, which is a
  clock-skew defect inside a payout gate. One revision request is issued below; it is narrower than
  `persistence/02`'s RR-P7, whose wording (*"no module derives a placement, a payout or a grant from
  a clock"*) still forbids this use, since the origin advance gates which patches pay
  `[cid: decided]`.
- **A 36-stud legitimate reach means distance-to-patch is not a discriminator.** Re-derived below
  against the merged manifest, effective radius reaches **36.04 studs** and effective speed
  **30.72 studs/s**. A patch 36 studs from a character can be legitimately cleared, so no
  "that patch is too far" test exists. **Displacement rate is the only discriminator**, and it is
  bounded by a number the server already computes for a different reason.
- **The three re-anchors need no new interface, because `state.spawnPivot` already is one.**
  `plots.spawn` writes it at join and `plots.advance` rewrites it on area completion
  `[research: architect/sheets/03-state-shape.md]`, and `onSpawn`'s pivot is
  `CFrame.new(pivot) * held.Rotation` — XZ **identical** to `spawnPivot`
  (`init.server.luau:216`, `:316`). So the origin re-anchors to `state.spawnPivot` whenever that
  value changes or the tick re-arms on a new character, and **the re-anchor never reads a
  client-owned value at all.**
- **No thirteenth `PlayerState` field.** `architect/03-state-shape` fixes twelve with one writer
  each. The origin lives in a **module-local table inside `clearing`, keyed by `UserId`** — the
  precedent is `server-main`'s `spawnPoses: { [number]: CFrame }` at `init.server.luau:138`. It is
  pruned inside the tick against the `states` collection the tick already receives, so it needs no
  `onLeave` hook and can never outlive a session.
- **Every slack constant here is `[playtest unknown]`.** The brief states no latency budget, no
  connection-quality tolerance and no device floor, and I fetched no shipping game's published
  anti-teleport thresholds. Each carries a starting value and a test range, and **none is sourced.**
  `[research owed: a shipping Roblox experience's published movement-validation thresholds]`

## Pushing back

**The line, quoted:** *"**The economy is the only thing worth cheating.** Clearing and currency
awards must be server-validated, or a client claiming arbitrary clears owns the game."* ·
*"**Nothing else applies:** no trading, leaderboards, or PvP in scope."* — `04-PRESENTATION.md`,
tagged **`[I assumed — not interviewed]`**, and `OPEN.md §1` calls integrity *"the least
defensible"* of the zero-question items.

The conclusion is right and the sufficiency is wrong. Clearing and currency **already are**
server-validated in the strongest sense that sentence can mean: `protocol.REMOTES` carries no
clearing channel and no currency channel, `Clearing.luau` reads no client message and uses no
`Touched`, and `progression.award` has one call site. There is nothing for a client to claim — and
the game is still totally exploitable, because *validated* was read as *computed* while the input
is client-owned. **"Nothing else applies" is wrong by exactly one item: the character's XZ
position.** The mandate is not overruled; it gets stricter, and should read *"server-validated
against a server-bounded position"*. The collection needs no second rule: `state.found` is written
only by `clearing` at the instant a patch clears, so one position bound protects both surfaces.

## Revision request issued

**RR-S1 · `architect/sheets/01-runtime.md` acceptance criterion 3 and
`cid/tech/performance/03-what-optimisation-may-never-do.md` `N10`, jointly.** Both observables grep
`os.clock()` to zero across `game/src` while both stated rules are about layout determinism.
**Restate the observable in both to:** *"no module derives a placement, an award amount or a grant
from an unseeded RNG or from a wall clock; a monotonic elapsed-time read is permitted."* That is
narrower than `persistence/02`'s RR-P7, which as drafted still forbids this use, and it is the
wording that lets both sheets ride one escalation. `networking/02`'s `algorithm.refillModel` has the
identical need and should cite this request rather than issue a third.

**Not blocking.** `positionAuthority.step.fallbackIfRefused` names a working design under the
criterion as written, at a stated cost, so no builder waits on this.

```manifest
{
  "provides": "integrity",
  "status": "proposed",
  "value": {
    "protectedSurfaces": ["currency", "found", "cleared", "areasFinished"],
    "threatModelExclusions": [
      { "class": "offline-accrual / timestamp", "why": "no save field is converted to income and there is no lastSeen; deleted by 01-FOUNDATION.md's no-offline-accumulation, not defended against" },
      { "class": "trading, leaderboards, PvP, ranking", "why": "03-META.md priority 3; social.forbidden X8 bans OrderedDataStore and X3 bans any server-held value more than one player increments" },
      { "class": "Find duplication", "why": "discovery.record is one boolean per name, growth forbidden; there is no quantity to duplicate and no transfer path" },
      { "class": "cleared-area re-farm", "why": "a finished bay holds no record in state.patches, so no tick can measure against it (architect/03-state-shape)" },
      { "class": "currency duplication across two servers", "why": "reduces to session locking, which is tech/persistence's subject, not this key's" }
    ],
    "positionAuthority": {
      "rule": "clearing.tick's per-patch distance test measures from a server-held origin O, never from HumanoidRootPart.Position. The reported root position is admitted only as the TARGET of a bounded advance.",
      "projection": "XZ only. The Y component of O is never stored, never compared and never written.",
      "insertionPoint": "inside clearing.tick, after the arming gate (step 1) and before the radius read (step 2). O replaces rootPosition in the arming test and in the per-patch dx/dz test, both.",
      "storage": {
        "where": "a module-local table inside clearing, keyed by UserId",
        "precedent": "server-main's spawnPoses: { [number]: CFrame } at init.server.luau:138",
        "playerStateFieldsAdded": 0,
        "recordFields": ["originX", "originZ", "lastClockSeconds", "bucketStuds", "anchorX", "anchorZ", "flagCount"],
        "entryCreatedAt": "the first tick after a re-anchor condition is seen",
        "entryRemovedAt": "inside the tick, by pruning any UserId key absent from the states collection the tick already receives; no onLeave hook and no new interface entry",
        "maxEntries": "runtime.maxPlayers (16)"
      },
      "step": {
        "elapsedTime": "dt = clamp(os.clock() - lastClockSeconds, 0, dtCapSeconds). MEASURED and MONOTONIC, never runtime.clearTickRate: task.wait(0.12) resumes on the next 60 Hz Heartbeat and realises ceil(0.12*60)/60 = 0.1333 s, and grows under load.",
        "criterionConflict": {
          "criteria": ["architect/01-runtime acceptance criterion 3", "performance/03 N10"],
          "whatTheyGrep": "math.random | Random.new() | os.time() | os.clock() | tick() | table.sort across game/src, expecting zero",
          "whyTheGrepIsWrongHere": "both stated rules are about layout determinism and a second source of randomness. A monotonic elapsed-time read introduces no randomness, no reordering and no reindexing, and reads nothing layout produces. The observable is wider than the rule it enforces.",
          "escalation": "RR-S1, issued in this sheet, jointly against both criteria. persistence/02's RR-P7 as drafted does NOT cover this use, because it forbids deriving a payout from a clock and the origin advance gates which patches pay.",
          "status": "open, and NOT blocking — see fallbackIfRefused"
        },
        "fallbackIfRefused": {
          "instrument": "workspace:GetServerTimeNow(), the clock sessionLock already established as permitted in this build",
          "costOfTheFallback": "it is synchronised rather than monotonic and may step backwards on a correction. A backwards step yields dt <= 0, which clamps to 0 and advances the origin not at all for one tick; a forwards step is bounded by dtCapSeconds AND by the coverage cap, so no clock jump can advance the origin more than coverageCapMultiple * effective radius in one tick.",
          "verdict": "acceptable but strictly worse. Adopt only if RR-S1 is refused."
        },
        "firstTickAfterAnchor": "lastClockSeconds is unset; set it, advance zero this tick, clear nothing extra. Deterministic, not a special case.",
        "budgetFormula": "budget = modifiers.effective(state, \"speed\") * dt * stepSlackFactor + stepAllowanceStuds",
        "coverageCapFormula": "advance = min(budget, coverageCapMultiple * modifiers.effective(state, \"radius\"))",
        "applyFormula": "delta = (reportedXZ - O); d = |delta|; if d <= advance then O = reportedXZ else O = O + (delta / d) * advance",
        "catchUpRule": "O moves ALONG the segment and never jumps. A lagged origin sweeps the ground it skipped on the following ticks; nothing is lost because cleared is permanent (01-FOUNDATION.md, [you chose: R2 Q1]).",
        "coverageInvariant": "coverageCapMultiple < 2.0, so consecutive test discs always overlap and no patch inside the swept corridor can be skipped. This is a hard invariant, not a tuning figure.",
        "worstCaseStep": "at effective speed 30.72 and the starting constants, budget = 30.72 * 0.1333 * 1.5 + 0.5 = 6.64 studs; the coverage cap at minimum effective radius 5.5 is 8.25, so the cap does not bind at base and does bind under a hitch."
      },
      "accumulator": {
        "kind": "leaky bucket",
        "source": "https://create.roblox.com/docs/scripting/security/network-ownership — leaky bucket-style accumulators for burst movement while preventing sustained violations, and XZ projection for ground-based movement",
        "chargeFormula": "bucketStuds = max(0, bucketStuds - bucketDrainStudsPerSecond * dt) + max(0, d - advance)",
        "flagCondition": "bucketStuds > bucketCapacityStuds",
        "onFlag": "subtract bucketCapacityStuds from bucketStuds, increment flagCount, and hand one record to integrity.logging. THE PLAYER IS NOT TOUCHED — see integrity.response.",
        "neverNegative": true
      },
      "reAnchors": {
        "count": 3,
        "sourceValue": "state.spawnPivot, in XZ. No re-anchor ever reads a client-owned value.",
        "rows": [
          { "id": "join",           "trigger": "state.spawnPivot differs from the stored anchor and no character has changed", "writtenBy": "plots.spawn", "citation": "init.server.luau:380" },
          { "id": "characterSpawn", "trigger": "state.armState.character ~= state.player.Character — the same test the tick already runs to re-arm", "writtenBy": "server-main's PivotTo, whose XZ is CFrame.new(state.spawnPivot) * held.Rotation", "citation": "init.server.luau:216, :316" },
          { "id": "areaAdvance",    "trigger": "state.spawnPivot differs from the stored anchor after clearing incremented areasFinished", "writtenBy": "plots.advance", "citation": "architect/sheets/05-interfaces.md, plots.advance" }
        ],
        "onReAnchor": "O = state.spawnPivot XZ; lastClockSeconds unset; bucketStuds = 0; flagCount PRESERVED across the session",
        "andNothingElse": "No fourth discontinuity exists. A death, a menu reset and a rejoin all arrive through characterSpawn. The domain index says 'exactly-four' and then enumerates three; three is correct and this sheet is the count."
      },
      "constants": [
        { "name": "stepSlackFactor",           "value": 1.5,  "unit": "multiplier",  "status": "playtest unknown", "testRange": [1.25, 2.25], "note": "headroom for jitter and for a client whose reported position leads the server's clock" },
        { "name": "stepAllowanceStuds",        "value": 0.5,  "unit": "studs",       "status": "playtest unknown", "testRange": [0.25, 2.0],  "note": "absolute floor so a near-stationary player is never charged for sub-stud noise" },
        { "name": "coverageCapMultiple",       "value": 1.5,  "unit": "multiplier",  "status": "playtest unknown", "testRange": [1.0, 1.9],   "hardMaximum": 1.99, "note": "the hard maximum is the coverage invariant and is NOT a playtest figure" },
        { "name": "dtCapSeconds",              "value": 1.0,  "unit": "seconds",     "status": "playtest unknown", "testRange": [0.5, 2.0],   "note": "a 30-second freeze may not grant a 900-stud budget" },
        { "name": "bucketCapacityStuds",       "value": 120,  "unit": "studs",       "status": "playtest unknown", "testRange": [60, 400],    "note": "starting value is one lane width (plots.laneWidthStuds), so one bad hitch across the lane does not flag" },
        { "name": "bucketDrainStudsPerSecond", "value": 60,   "unit": "studs/s",     "status": "playtest unknown", "testRange": [30, 150],    "note": "roughly twice base walk speed; a recovering connection empties the bucket in about two seconds" }
      ],
      "ladderMaxima": {
        "verifiedAgainst": "the merged manifest as emitted to game/src/shared/GameConfig.luau; wave 4's proposed solvency key is NOT merged and is not used here",
        "effectiveSpeedMaxStudsPerSecond": 30.72,
        "effectiveSpeedDerivation": "upgrades[speed].base 16 + upgrades[speed].maxLevel 6 * upgrades[speed].perLevel 1.6 = 25.6 (GameConfig.luau:63-67), * setBonus.rows[vault].factor 1.20 (GameConfig.luau:1528-1531) = 30.72. No products.items[] entry has axis == \"speed\", so no purchase factor applies.",
        "effectiveSpeedCeiling": 41.25,
        "effectiveSpeedCeilingDerivation": "modifiers.ceiling(\"speed\") = movement.baseClearRadius 5.5 / the REALISED tick period 0.13333 = 41.25. NOT 45.83: that figure divides by runtime.clearTickRate's requested 0.12, and serverCost RR-P4 rules it 11% optimistic at every site it is printed. This sheet was the fifth such site and is corrected here rather than left pending.",
        "effectiveSpeedCeilingHeadroom": "30.72 is 74% of 41.25, so THE CLAMP STILL NEVER BINDS and the step bound still uses 30.72. The correction moves the margin, not the conclusion.",
        "effectiveRadiusMaxStuds": 36.04,
        "effectiveRadiusDerivation": "upgrades[radius].base 5.5 + maxLevel 8 * perLevel 1.1 = 14.3 (GameConfig.luau:52-56), * setBonus.rows[cistern].factor 1.20 * setBonus.rows[spire].factor 1.20 = 1.44 (GameConfig.luau:1522-1537) -> 20.592, * products.items[span].factor 1.75 (GameConfig.luau:1255) = 36.036.",
        "effectiveRadiusCeiling": 60,
        "effectiveRadiusCeilingDerivation": "modifiers.ceiling(\"radius\") = area.size 120 / 2. Unaffected by the tick period. 36.04 is 60% of it, so this clamp never binds either.",
        "discriminator": "displacement rate, and nothing else. A 36-stud legitimate reach means no distance-to-patch test can separate a cheat from a maxed player.",
        "reDeriveIf": "any of upgrades[speed|radius].maxLevel or .perLevel, setBonus.rows[].factor, products.items[].factor, the realised tick period or area.size moves. Wave 4's proposed solvency (20 rungs per axis) would put speed at 57.6 against a 41.25 clamp and radius at 69.3 against 60 — BOTH clamps would then bind and both figures above are re-derived, not adjusted."
      },
      "cost": {
        "perPlayerPerTick": "one monotonic clock read, one XZ subtract, one squared length, one comparison, and on the clamped branch only one square root and one scalar multiply-add",
        "realisedTickPeriodSeconds": 0.1333,
        "evaluationsPerSecondAtMaxPlayers": 120,
        "evaluationsDerivation": "runtime.maxPlayers 16 * the realised 7.5 Hz cadence. One advance per player per tick.",
        "comparedAgainst": "serverCost.scanCostModel.rows[] at the same 7.5 Hz cadence and the same 16 players. CITED, NOT COPIED: that key owns the figure and its basis is provisional while wave 4 is FAIL.",
        "shareOfTickWork": "0.06% against the wave-4 re-derived 1,680-patch, 42-chunk bay (1,680 * 7.5 * 16 = 201,600 tests/s), and 0.05% against the 1,880-patch row serverCost currently publishes. Negligible under either, and under the 44-chunk reading between them.",
        "figuresThisSheetNoLongerCites": "752,000 — retired by serverCost.scanCostModel.figuresInCirculationThatAreWrong as assuming a 25 Hz cadence task.wait cannot produce. An earlier draft of this field cited it beside a 7.5 Hz evaluation count and was internally inconsistent."
      },
      "forbidden": [
        "reading HumanoidRootPart.Position or .CFrame anywhere that credits currency, writes found, writes cleared or increments areasFinished",
        "using runtime.clearTickRate as the elapsed time in the step formula",
        "adding a thirteenth PlayerState field",
        "re-anchoring the origin to any client-reported position",
        "rejecting a single over-budget tick as a violation without the accumulator",
        "moving, pulling back, freezing or rubber-banding the character — response.controlEverAffected is false"
      ]
    },
    "serverAuthorityAlternative": {
      "what": "Workspace.AuthorityMode = \"Server\", in which the server is the single source of truth and movement validation moves off the client",
      "source": "https://create.roblox.com/docs/projects/server-authority",
      "prerequisites": ["NextGenerationReplication", "PlayerScriptsUseInputActionSystem", "SignalBehavior = Deferred", "UseFixedSimulation", "StreamingEnabled"],
      "status": "recorded, not specced. All five are place configuration with no script path, so it is publish-time checklist work [currently tech/deploy], and it would also touch input and tech/performance's streaming rules.",
      "ifAdopted": "positionAuthority is deleted, not tuned. It is a hand-rolled substitute for exactly this."
    }
  }
}
```

## Consequences for other work

- **Runtime work (`architect/01-runtime`) and optimisation-limit work (`performance/03`):** RR-S1
  above, one joint restatement of one observable. Both stated rules survive verbatim.
- **Tick-cost work (`serverCost`, tech/performance):** one origin advance per player per tick, and
  this sheet now cites your `scanCostModel` row rather than carrying a figure of its own. **You own
  the 1,880-versus-1,760-versus-1,680 question and I inherit whichever row you publish**; my share
  stays under 0.06% at every candidate. I have also adopted RR-P4's correction, 45.83 → **41.25**.
  This sheet was the fifth site and is no longer pending.
- **Module-shape work (`architect`, `02-modules` / `07-wiring`): one revision request.** Add a step
  inside `clearing.tick` between the arming gate and the radius read, and permit `clearing` a
  module-local table keyed by `UserId`. **For `positionAuthority` specifically, no new `interfaces`
  entry, no `PlayerState` field and no `onLeave` hook are needed** — the re-anchor triggers are
  `state.spawnPivot` and `state.armState.character`, which the tick already reads. **That claim is
  scoped to this key and does not extend to `integrity.logging`, which does need one** — see sheet
  `03`, which issues it.
- **Ladder work (`upgrades`, gameplay/balance) and set-bonus work (`setBonus`):** the two maxima
  above are read, not owned. Any change to `maxLevel`, `perLevel` or a factor on `speed` or
  `radius` sends this sheet's step bound back for re-derivation.
- **Rate-ceiling work (`ingressLimits`, tech/networking):** this sheet sets no messages-per-second
  figure. Your `algorithm.refillModel` has the same `os.clock()` problem and should cite RR-S1
  rather than issue a third request.

## Acceptance criteria

1. In `Clearing.luau`, the identifiers used in the per-patch `dx`/`dz` test and in the arming
   distance test are the server-held origin, and `root.Position` is read exactly once per state per
   tick, into a variable used only as the advance target.
2. `PlayerState` still has exactly twelve fields, and the origin table's entry count never exceeds
   `runtime.maxPlayers` (16) after any sequence of joins, respawns and leaves.
3. A test that reports a root position 500 studs from the origin in one tick clears **no more
   patches in that tick** than a test that reports one `effective(speed) × dt` studs away.
4. `grep -n "ClearTickRate" game/src/server/Clearing.luau` matches only the `task.wait` driver line
   and no line inside the step or bucket arithmetic.

## Not decided here

What the server accepts on each client-originated channel, and what an inadmissible message does
(sheet `02`, this domain). What a flag *does* to a player, what is written down, and where the log
sink lives (sheet `03`, this domain). Accepted messages per second on either remote
(`ingressLimits`, tech/networking). The tick period's final value, the tick driver's shape, and the
per-second scan cost this sheet's share is measured against (`architect`, with `serverCost`). Every
`upgrades`, `setBonus` and `products` figure this sheet reads (gameplay/balance and its owners).
Session locking, the only surviving currency-duplication route (tech/persistence). Whether the place
ever adopts server authority (publish-time checklist work, tech/deploy).
