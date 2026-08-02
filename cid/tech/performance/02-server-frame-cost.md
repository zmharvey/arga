# 02 — Server frame cost, the tick, and the bay-build burst

**Domain:** tech/performance · **Category:** Tech & Data · **Wave:** 5

## Decision

**Do not raise `runtime.clearTickRate`. It stays 0.12, which realises as 0.1333 s (8 frames),
and Balance's requested 0.04 realises as 0.05 s — which fails the invariant it was requested to
satisfy.** `depths.invariants[10]` is restated as the cue-coincidence bound it actually
protects (RR-P3), which moves no footprint. The bay-build burst is capped at **250 instance
creations per server frame**, built into an unparented container and **parented in one
operation**, so a bay still appears whole.

## Why

**The quantisation rule first, because every figure in circulation ignores it.** Server
heartbeat is capped at 60 FPS
`[research: https://github.com/Roblox/creator-docs/blob/main/content/en-us/performance-optimization/identify.md]`,
and `task.wait` *"yields the current thread until the given duration (in seconds) elapses and
then resumes the thread on the next Heartbeat step"*
`[research: https://create.roblox.com/docs/scripting/scheduler]`. `Clearing.luau:485` drives
the loop with `task.wait(Config.ClearTickRate)`, so the realised period is
**`ceil(d × 60) / 60`** and the only reachable periods are integer multiples of 16.67 ms.
**0.12 → 0.1333 s. 0.04 → 0.05 s. Nothing between 0.0334 and 0.05 is reachable at all**, because
2 frames is 0.0333 and 3 frames is 0.05.

**So the request as written does not deliver what it was requested for.**
`depths.invariants[10]` is `patchCount <= lapSeconds(k) / (2 * runtime.clearTickRate)`. At wave
4's post-terminal bay, 1,880 patches over a 186.3 s lap needs a period at or under
`186.3 / 3760 = 0.04955 s`. The realised 0.05 gives 1,863 — short by 17 patches, 0.90%, which
`_verified-wave4.md` line 54 records independently. Adopting 0.04 through the shipped loop
shape buys a 2.7× cost increase and still fails the check.

**And the invariant is already false at merged values, because everyone evaluates it with the
config number instead of the realised one.** At the realised 0.1333 the bound is
`165 / 0.26667 = 618.75` patches, and merged ordinals 5 to 8 carry 624, 624, 640 and 640.
**Four of eight merged areas fail it.** At the config 0.12 the bound is 687.5 and all eight
pass. That gap *is* the finding: the check as coded passes and the physical thing it names does
not. **This makes RR-P3 mandatory rather than convenient** — the invariant needs restating
whatever the tick becomes, so I am not asking to drop a working rule to save CPU.

**The rule it is confused with passes, and that one bounds something a player can feel.**
`modifiers.axes[speed].ceilingRule` is `effective × clearTickRate <= movement.baseClearRadius`
— the player must not cross a clear radius between ticks, which is the only way a tick period
becomes visible. At the realised 0.1333 the ceiling is **5.5 / 0.1333 = 41.25 studs/s**, not the
45.83 printed in three merged keys. Against the merged Pace top 25.6 × the Vault set factor
1.20 = 30.72, that is **1.34× of room** (1.61× against the bare ladder); under wave 4's
unreleased ladder, 32.0 × 1.20 = 38.4, it is **1.07×** — thin, and passing.

**What `invariants[10]` protects is how many patch clears land on one tick**, a cue-coincidence
question owned by feedback and response work. That quantity is
`(patchCount / lapSeconds) × realisedPeriod`: **0.52 at merged ordinal 8, 1.02 at wave 4's area
8, 1.35 at its bay.** `core-loop/02` already fixes 0.35 s between coincident onsets and
`mechanics/05` already owns beat latency, so it belongs to them with a value they can set.

**Dropping it moves no footprint, and this is the part most likely to be doubted.**
`depths.sizingRule` is `footprint(k) = floorToChunk( min(LAP_TARGET × tau(k), LAP_CEILING ×
tauTol(k)) / ROUTE_SLACK )` — **there is no tick term in it.** `invariants[10]` is a check
applied after sizing, never an input to it, so restating it changes zero rows of
`depths.areas[]`, zero chunk counts and zero patch counts. Wave 4's own verification reached the
same conclusion from the other side: *"`invariants[10]`'s separate 'at most one patch per two
ticks' bounds nothing a player perceives"* `[research: cid/gameplay/_verified-wave4.md]`.

**Both circulating cost figures are wrong and I recomputed all of them.** The scan at
`Clearing.luau:392` is a linear `ipairs` over the live bay that **skips cleared patches by
branch, not by removal**, so cost is flat across a lap. Cost is
`patchCount × players × (1 / realisedPeriod)`. **752,000 assumed an unreachable 25 Hz; 940,000
assumed 25 Hz and 20 players.** `runtime.maxPlayers` is 16.

| basis | patches | 0.1333 s · 7.5 Hz | 0.05 s · 20 Hz | 0.0333 s · 30 Hz |
|---|---|---|---|---|
| merged, deepest area | 640 | 76,800 | 204,800 | 307,200 |
| wave 4 area 8 *(unreleased)* | 1,200 | 144,000 | 384,000 | 576,000 |
| wave 4 post-terminal bay *(unreleased)* | 1,880 | **225,600** | **601,600** | **902,400** |

**Raising the tick does not raise the per-frame spike — it raises how often the spike happens.**
One pass costs `patchCount × players` tests at any rate: 30,080 tests at wave 4's bay, every
tick. At 7.5 Hz that lands on one frame in eight; at 30 Hz on every second frame. **That is the
shape of the risk and a tests-per-second figure hides it**, so the budget below is stated in
milliseconds of one 16.67 ms frame. The per-iteration cost that converts tests to milliseconds
has **no published source** — two field reads, two subtractions, two multiplies, one add, one
compare. `[playtest unknown]`, 0.05 to 0.20 µs, MicroProfiler named as the instrument.

**Two other things run inside this tick and neither is significant.** Security's position
authority adds one vector subtract, one squared length and one clamp per player per tick — 16
operations against 10,240 distance tests, **0.16%**. `protocol`'s `StateChanged` push is at most
one `FireClient` per player per *changed* tick, which `replication` costs at ≈62 kB/s at 16
players at this cadence and ≈149 kB/s at the realised 0.05.

**The fallback, priced.** If the developer keeps `invariants[10]` as written **and** wave 4
lands, the only legal period under 0.04 is **2 frames = 0.0333 s** and the bill is **902,400
tests/s**, 4.0× today. Bucketing then stops being optional: a **1-D partition along the lane
axis (+Z), bucket depth 120 studs** = 2 × the radius ceiling `plots.laneWidthStuds / 2`. **One
axis suffices** because the lane is only 120 studs wide, while a bay runs 480 studs merged and
1,410 requested. A clear circle of radius ≤ 60 spans at most two adjacent buckets, so a player
tests 2 instead of the whole bay: at the requested bay, 12 buckets → 313 tests per player per
tick, a 6.0× reduction, **150,240 tests/s, cheaper than today's unbucketed 225,600.** At merged
lengths there are 4 buckets and the reduction is 2×, which does not pay for the complexity.
**The loop's shape is `modules`/`clearing`'s, so this is RR-P5 and not my decision.**

**The burst is the other half of the same budget and nobody costed it.**
`plots.liveGeometry` builds a bay whole *"the instant the previous bay's last patch clears"* —
646 `Instance.new` calls merged, 1,886 at wave 4's bay, on the single tick that fires the game's
largest payoff, plus the same cost at join. **Cap it at 250 creations per server frame,
server-wide**, not per player, or 16 concurrent joins queue 16 × 250. Build into a container
whose `Parent` stays `nil`, then assign `Parent` **once**: `theme/identity/03` requires that *"a
plot appears and disappears whole; nothing may stagger or animate its patches into existence"*,
and one parent assignment satisfies it while the creations spread across frames. **The player
sees nothing.** No loading screen, no freeze, no camera change, no forced idle —
`mechanics/05` forbids any beat taking control away — and at 250/frame the merged bay takes 3
frames (50 ms) and the requested bay 8 (133 ms), against a walk from the last cleared patch to
the inward opening that `pacing` puts at 27 s. At join the whole lane is parented before the
character is, so nothing spawns onto an absent slab.

```manifest
{
  "provides": "serverCost",
  "status": "proposed",
  "value": {
    "quantisation": {
      "rule": "realisedPeriodSeconds = ceil(requestedSeconds * 60) / 60",
      "why": "server Heartbeat is capped at 60 FPS, and task.wait resumes on the NEXT Heartbeat step at or after the requested duration. Clearing.luau:485 drives the loop with task.wait(Config.ClearTickRate).",
      "sources": [
        "[research: https://github.com/Roblox/creator-docs/blob/main/content/en-us/performance-optimization/identify.md]",
        "[research: https://create.roblox.com/docs/scripting/scheduler]"
      ],
      "table": [
        { "requested": 0.12,   "frames": 8, "realised": 0.13333, "hz": 7.5 },
        { "requested": 0.05,   "frames": 3, "realised": 0.05,    "hz": 20.0 },
        { "requested": 0.04,   "frames": 3, "realised": 0.05,    "hz": 20.0 },
        { "requested": 0.034,  "frames": 3, "realised": 0.05,    "hz": 20.0 },
        { "requested": 0.0333, "frames": 2, "realised": 0.03333, "hz": 30.0 },
        { "requested": 0.017,  "frames": 2, "realised": 0.03333, "hz": 30.0 }
      ],
      "unreachableBand": "no period strictly between 0.03334 and 0.05 exists. 2 frames is 0.03333 and 3 frames is 0.05.",
      "dependsOn": "budgets.server.heartbeatStepsPerSecondCap 60. Below budgets.server.heartbeatFloor every realised period stretches and every figure in this key moves."
    },
    "tickRuling": {
      "decision": "hold runtime.clearTickRate at 0.12",
      "realisedPeriodSeconds": 0.13333,
      "realisedFrames": 8,
      "realisedHz": 7.5,
      "requestWas": { "from": 0.12, "to": 0.04, "by": "gameplay/balance/03-ladder-solvency (solvency), wave 4, NOT RELEASED" },
      "whyDeclined": [
        "0.04 realises as 0.05, and 0.05 fails depths.invariants[10] at the post-terminal bay: 186.3 / (2 * 0.05) = 1863 against 1880 patches, short by 0.90%. The request does not deliver what it was requested for.",
        "depths.invariants[10] bounds no physical quantity. The physical rule is modifiers.axes[speed].ceilingRule, and it passes at the realised 0.13333.",
        "the cost is 2.7x the proximity loop for a check that still fails."
      ],
      "speedCeilingAtRealisedPeriod": {
        "rule": "movement.baseClearRadius / realisedPeriodSeconds",
        "value": 41.25,
        "printedElsewhereAs": 45.83,
        "printedElsewhereWhy": "45.83 = 5.5 / 0.12 uses the CONFIG number, not the realised one. It appears in architect/01-runtime, modifiers.axes[speed], products.headroom.H1_axisCeiling and balance/04-axis-budget. See revisionRequests RR-P4.",
        "mergedHeadroom": { "ladderTop": 25.6, "withVaultSetFactor": 30.72, "roomAtRealised": 1.343, "roomAgainstBareLadder": 1.611 },
        "waveFourHeadroom": { "released": false, "ladderTop": 32.0, "withVaultSetFactor": 38.4, "roomAtRealised": 1.074 },
        "noProductSellsSpeed": "monetization/01 sells nothing on value or speed, so no product factor enters this."
      },
      "invariantTenAlreadyFailsAtMergedValues": {
        "checkAsCoded": "patchCount <= lapSeconds(k) / (2 * runtime.clearTickRate), evaluated at the config 0.12: bound 687.5, all eight merged areas pass",
        "checkAtRealisedPeriod": "bound 618.75; merged ordinals 5, 6, 7 and 8 carry 624, 624, 640, 640 and all four FAIL",
        "consequence": "the restatement in RR-P3 is required whatever the tick becomes. This is not a request to drop a working rule."
      },
      "patchClearsLandingOnOneTick": [
        { "basis": "merged ordinal 8", "patches": 640, "lapSeconds": 165.0, "perTick": 0.517 },
        { "basis": "wave 4 area 8 (unreleased)", "patches": 1200, "lapSeconds": 157.0, "perTick": 1.019 },
        { "basis": "wave 4 post-terminal bay (unreleased)", "patches": 1880, "lapSeconds": 186.3, "perTick": 1.345 }
      ]
    },
    "scanCostModel": {
      "shape": "linear ipairs over the live bay, squared XZ distance, cleared patches skipped by BRANCH not by removal, so cost is flat across a lap",
      "callSite": "game/src/server/Clearing.luau:392",
      "formula": "distanceTestsPerSecond = patchCount * players * (1 / realisedPeriodSeconds)",
      "players": 16,
      "playersSource": "runtime.maxPlayers. Not 20.",
      "rows": [
        { "basis": "merged deepest area", "patches": 640,  "released": true,  "at7_5Hz": 76800,  "at20Hz": 204800, "at30Hz": 307200 },
        { "basis": "wave 4 area 8",       "patches": 1200, "released": false, "at7_5Hz": 144000, "at20Hz": 384000, "at30Hz": 576000 },
        { "basis": "wave 4 bay",          "patches": 1880, "released": false, "at7_5Hz": 225600, "at20Hz": 601600, "at30Hz": 902400 }
      ],
      "figuresInCirculationThatAreWrong": {
        "752000": "1880 * 16 * 25 — assumes a 25 Hz cadence task.wait cannot produce",
        "940000": "1880 * 20 * 25 — assumes 25 Hz AND 20 players"
      },
      "perIterationCostMicroseconds": {
        "value": 0.10,
        "status": "[playtest unknown]",
        "testRange": [0.05, 0.20],
        "work": "two field reads, two subtractions, two multiplies, one add, one compare",
        "noSourceExists": true,
        "instrument": "MicroProfiler, server, the Clearing.tick label, on a full 640-patch bay at 16 players"
      },
      "perTickFrameBudgetMs": {
        "value": 4.0,
        "ofAFrame": 16.67,
        "status": "[playtest unknown]",
        "testRange": [2.0, 8.0],
        "realised": [
          { "basis": "merged, 16 players",       "testsPerTick": 10240, "msAt0_10us": 1.02, "msAt0_20us": 2.05, "verdict": "pass" },
          { "basis": "wave 4 bay, 16 players",   "testsPerTick": 30080, "msAt0_10us": 3.01, "msAt0_20us": 6.02, "verdict": "pass at 0.10, FAIL at 0.20" }
        ],
        "note": "the per-tick cost does not change with the tick rate. Only its frequency does: one frame in eight at 7.5 Hz, one in two at 30 Hz."
      },
      "otherCostsInsideTheSameTick": [
        { "subject": "security position authority", "owner": "tech/security (integrity)", "cost": "one vector subtract, one squared length, one clamp per player per tick", "shareOfTickAtMerged": 0.0016 },
        { "subject": "StateChanged push", "owner": "tech/networking (replication)", "cost": "at most one FireClient per player per CHANGED tick", "bandwidthAt7_5Hz": "about 62 kB/s at 16 players", "bandwidthAt20Hz": "about 149 kB/s at 16 players" }
      ]
    },
    "burstBudget": {
      "subject": "plots.liveGeometry bay build and join build",
      "instancesPerServerFrame": 250,
      "scope": "server-wide, one shared queue, NOT per player",
      "status": "[playtest unknown]",
      "testRange": [100, 800],
      "instrument": "MicroProfiler, server, the frame containing the bay build",
      "buildRule": "create every instance into a container whose Parent is nil, then assign the container's Parent ONCE. Instances are created across frames; the bay appears in one frame.",
      "whyOneParentAssignment": "theme/identity/03 requires that a plot appears and disappears whole and that nothing staggers or animates its patches into existence. A single parent assignment satisfies it without a single-frame burst.",
      "deadlineMsFromCompletingClear": 500,
      "deadlineStatus": "[playtest unknown], test range 200 to 1000",
      "realised": [
        { "basis": "merged bay, one build queued",     "instances": 646,   "frames": 3,   "ms": 50 },
        { "basis": "wave 4 bay, one build queued",     "instances": 1886,  "frames": 8,   "ms": 133 },
        { "basis": "16 simultaneous joins, merged",    "instances": 10336, "frames": 42,  "ms": 690 },
        { "basis": "16 simultaneous joins, wave 4 bay","instances": 30176, "frames": 121, "ms": 2017 }
      ],
      "queueDegradation": "the 500 ms deadline holds for a single queued build. A full queue degrades it, which is accepted: the two cases are server fill (inside budgets.tiers[].loadToFirstInputSeconds, before any character spawns) and simultaneous area completion, which is unreachable because laps are unsynchronised.",
      "joinOrdering": "the whole lane — slab, four boundary parts, spawn Attachment, every patch — is parented before the character is parented. Nothing may spawn onto an absent slab.",
      "whatThePlayerSees": {
        "loadingScreen": "none", "freeze": "none", "cameraChange": "none", "forcedIdle": "none", "walkSpeedWrite": "none",
        "why": "mechanics/05 forbids any beat taking control away and response.negativeBeats is 0. At 133 ms against a 27 s walk from the last cleared patch to the inward opening (pacing), the build is invisible."
      }
    },
    "bucketingRequirement": {
      "status": "CONDITIONAL — required only if depths.invariants[10] is kept as written AND wave 4's patch counts land",
      "routedAs": "revisionRequests RR-P5, to architect. The loop's shape is modules/clearing's, not this domain's.",
      "partition": "1-D along the lane axis (+Z)",
      "bucketDepthStuds": 120,
      "bucketDepthRule": "2 x the maximum effective clear radius, which modifiers.axes[radius].ceilingRule caps at plots.laneWidthStuds / 2 = 60",
      "whyOneAxisSuffices": "the lane is 120 studs wide, so one bucket already spans it, while a bay runs 480 studs merged and 1410 requested.",
      "bucketsTestedPerPlayerPerTick": 2,
      "why2": "a circle of radius <= 60 spans an interval of length <= 120 = one bucket depth, so it touches at most two adjacent buckets.",
      "payoff": [
        { "basis": "wave 4 bay at 30 Hz",        "buckets": 12, "testsPerPlayerPerTick": 313, "testsPerSecond": 150240, "reduction": 6.0 },
        { "basis": "merged deepest bay at 7.5 Hz","buckets": 4,  "testsPerPlayerPerTick": 320, "testsPerSecond": 38400,  "reduction": 2.0, "verdict": "does not pay for the complexity" }
      ],
      "fallbackPeriodIfInvariantKept": { "requested": 0.0333, "frames": 2, "realised": 0.03333, "hz": 30.0, "testsPerSecond": 902400 }
    },
    "instrumentOwner": {
      "status": "UNOWNED",
      "what": "every [playtest unknown] in budgets and serverCost is settled by a MicroProfiler or Server Jobs reading on the floor device, and by Developer Console memory and render stats.",
      "noSheetOwnsIt": "not in cid/, not in architect/. Analytics owns WHAT to record and explicitly not the pipe; Security names the same hole from the logging side.",
      "kindOfWork": "device-measurement and telemetry-transport work",
      "routedTo": "the final cross-category pass"
    },
    "revisionRequests": [
      {
        "id": "RR-P3",
        "against": "cid/gameplay/meta/04-the-depth-ladder.md",
        "field": "depths.invariants[10]",
        "currently": "patchCount <= lapSeconds(k) / (2 * runtime.clearTickRate)",
        "restateAs": "(patchCount / lapSeconds(k)) * realisedTickPeriodSeconds <= response.maxPatchClearsPerTick",
        "realisedTickPeriodSeconds": "ceil(runtime.clearTickRate * 60) / 60 — the invariant must read the realised period, never the config number",
        "maxPatchClearsPerTick": { "startingValue": 1.0, "status": "[playtest unknown]", "testRange": [0.5, 2.0], "ownedBy": "feedback and response work (response, plus core-loop/02's 0.35 s coincident onset separation)" },
        "reason": "as written the check bounds no physical quantity. The quantity it protects is how many patch clears land on one tick, which is a cue-coincidence bound. The physical rule — the player must not cross a clear radius between ticks — is modifiers.axes[speed].ceilingRule and it passes.",
        "alsoTrueToday": "evaluated at the REALISED 0.13333 the current form already fails at merged ordinals 5, 6, 7 and 8 (bound 618.75 against 624, 624, 640, 640). It passes only because it is evaluated at the config 0.12.",
        "movesNoFootprint": "depths.sizingRule is footprint(k) = floorToChunk( min(LAP_TARGET * tau(k), LAP_CEILING * tauTol(k)) / ROUTE_SLACK ) and contains NO TICK TERM. invariants[10] is a check applied after sizing, never an input to it. Zero rows of depths.areas[], zero chunkCounts and zero patchCounts change."
      },
      {
        "id": "RR-P4",
        "against": "architect/sheets/01-runtime.md",
        "changes": [
          { "field": "runtime.clearTickRate", "expressAs": "clearTickFrames: 8, with realisedPeriodSeconds: 0.13333 published beside it", "reason": "a period is not settable to arbitrary precision through task.wait. A frame count is exactly what the scheduler honours, and it makes the unreachable 0.0334-0.05 band impossible to request by accident." },
          { "field": "line 25 prose", "currently": "0.12 s is roughly two frames at 60fps", "correctTo": "0.12 s is 7.2 frames at 60 Hz and realises through task.wait as 8 frames, 0.1333 s", "reason": "wrong by a factor of four" },
          { "field": "line 28 prose and acceptance criterion 2", "currently": "5.5 / 0.12 = 45.83 studs per second", "correctTo": "5.5 / 0.13333 = 41.25 studs per second", "reason": "the ceiling is a function of the realised period, not the requested one" }
        ],
        "alsoFalsifiedElsewhere": [
          "modifiers.axes[speed].ceilingRule prints 45.83",
          "products.headroom.H1_axisCeiling.ceilings.speed prints 45.83",
          "gameplay/balance/04-axis-budget prints 45.83 as the merged case"
        ],
        "noValueChanges": "clearTickRate's behaviour is identical. This publishes what the engine already does."
      },
      {
        "id": "RR-P5",
        "against": "architect/sheets/02-modules.md and 07-wiring.md, the clearing module",
        "status": "CONDITIONAL — issue only if depths.invariants[10] is kept as written and wave 4's patch counts land",
        "requires": "replace the linear ipairs at Clearing.luau:392 with a 1-D bucketed scan: partition the live bay along +Z at a bucket depth of 120 studs, test the player's bucket and one neighbour.",
        "price": "0.0333 s period, 30 Hz, 902400 distance tests/s unbucketed; 150240 bucketed",
        "constraintsItMayNotBreak": "sheet 03 N3 and N10 — the partition is an index over the same state.patches array, in the same order, with no removal and no reordering. state.cleared is keyed by array index and is a save-migration boundary."
      }
    ]
  }
}
```

## Pushing back

**`architect/sheets/01-runtime.md`, its "Why" bullet on the tick.** Two claims there are wrong
and both are load-bearing: *"0.12 s is roughly two frames at 60fps"* (it is 7.2, and realises
as 8), and *"this number sets the speed ceiling at 5.5 / 0.12 = 45.83 studs per second"* (it is
41.25, because the ceiling is a function of the realised period). Neither changes a value — the
tick stays 0.12 and the speed ladder still passes — but 45.83 is printed in three merged keys
and one wave-4 sheet, and every one of them is 11% optimistic. **That sheet's decision is
ratified; its arithmetic is corrected by RR-P4.**

## Consequences for other work

- **Area-authoring-by-depth work (`depths`)** gets RR-P3 and **loses nothing**: the sizing rule
  has no tick term, so no footprint, chunk count or patch count moves. It also inherits the
  finding that the current form already fails at four merged ordinals when evaluated honestly.
- **Cost-curve work (`solvency`, wave 4)** gets its tick request declined **with arithmetic
  attached**, not deferred. The dependency it named is real; the value it asked for realises as
  something that fails the same check.
- **Runtime work (`architect/01-runtime`)** gets RR-P4: express the tick as a frame count,
  publish the realised period, correct 45.83 to 41.25 in prose and in acceptance criterion 2.
- **Modifier-resolution work (`modifiers`) and purchase-headroom work (`products.headroom`)**
  both print a speed ceiling 11% too high. The merged Pace ladder still clears it at 1.34×;
  **wave 4's unreleased ladder clears it at 1.07×**, the thinnest margin in the game and now
  thinner than anyone has published.
- **Feedback and response work (`response`, `core-loop/02`)** inherits a field to value:
  `maxPatchClearsPerTick`, starting 1.0. Realised is 0.52 merged and 1.35 at wave 4's bay, so
  1.0 is a live constraint on the deepest content.
- **Clearing-module work (`modules`, `wiring.onTick`)** inherits the burst rule — unparented
  container, one parent assignment, 250 creations per server frame server-wide, whole lane
  parented before the character at join — and, conditionally, RR-P5's bucketed scan.
- **Security work (`integrity`)** is told its per-tick step is 0.16% of the pass and is not a
  cost worth designing around. **Networking work (`replication`)** may hold its 62 kB/s figure:
  the cadence does not change.

## Acceptance criteria

1. `ceil(runtime.clearTickRate × 60) / 60 == serverCost.tickRuling.realisedPeriodSeconds`
   evaluates true against the merged manifest (0.13333), and no `realised` value in
   `serverCost.quantisation.table` is other than an integer multiple of `1/60`.
2. `movement.baseClearRadius / serverCost.tickRuling.realisedPeriodSeconds ≥ speedLadderTop ×
   Π(set factors on speed)` evaluates true at merged values: 41.25 ≥ 30.72.
3. `serverCost.scanCostModel.rows[i].at7_5Hz == patches × 16 × 7.5` for all three rows
   (76,800 / 144,000 / 225,600), and no figure anywhere in the key equals 752,000 or 940,000.
4. `grep -rn "task.wait(Config.ClearTickRate)" game/src` matches exactly one line
   (`Clearing.luau:485`), and every `Instance.new` on a bay-build path in
   `game/src/server/Plots.luau` is reachable only from a routine that assigns the container's
   `Parent` exactly once per build.

## Not decided here

Every ceiling on how much content exists — sheet `01`, which holds `budgets`. Which savings
this domain may never take — sheet `03`. The tick's *value* is `architect`'s, which is why my
ruling is a hold plus two revision requests rather than an edit. The loop's implementation
shape, including whether RR-P5's bucketing is adopted — `modules`/`clearing`. Every patch
count, lap length, footprint and `LAP_TARGET` — `depths` and `pacing`. What
`maxPatchClearsPerTick` should be — feedback and response work, with Balance for the figure
inside its range. What a clear, a reveal or an area completion sounds or looks like — Audio,
VFX, Feedback UI. The per-iteration cost, the per-tick millisecond budget and the per-frame
creation cap are all `[playtest unknown]` because **no published figure exists for any of the
three**, and the instrument that would settle them has no owner in either contract.
