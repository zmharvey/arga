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
`depths.invariants[10]` is `patchCount <= lapSeconds(k) / (2 * runtime.clearTickRate)`.
Rearranged, the post-terminal bay admits a period of at most
`lapSeconds / (2 × patchCount) = 0.04955 s`, and **that threshold is size-invariant**: the bay's
lap and its patch count are both set by the same sizing rule at a fixed density, so their ratio
does not move when the chunk count does. It has survived the bay going 47 → 44 → 42 chunks
unchanged, which is why it is the one figure here I state as a bound rather than reading by
field. The realised 0.05 exceeds it. Adopting 0.04 through the shipped loop shape buys a 2.7×
cost increase and still fails the check.

**And the invariant is already false at merged values, because everyone evaluates it with the
config number instead of the realised one.** Merged ordinals 5 to 8 carry **157.2 s** laps
(`meta/04:199`; the rounded 157 at `meta/04:195` gives 588.75 and is 0.13% low). At the config
0.12 the bound is `157.2 / 0.24 = 655` and all four pass. At the realised 0.1333 it is
`157.2 / 0.26667 = 589.5` — the realised bound is always the config bound × 0.9, and
655 × 0.9 = 589.5 exactly — and the four rows carry 624, 624, 640 and 640, **failing by 5.9%,
5.9%, 8.6% and 8.6%.** My first draft used 165 s and reported 687.5 and 618.75, which
understated the failure by a factor of four. That gap *is* the finding: the check as coded
passes and the physical thing it names does not. **This makes RR-P3 mandatory rather than
convenient** — the invariant needs restating whatever the tick becomes.

**The rule it is confused with passes, and that one bounds something a player can feel.**
`modifiers.axes[speed].ceilingRule` is `effective × clearTickRate <= movement.baseClearRadius`
— the player must not cross a clear radius between ticks, which is the only way a tick period
becomes visible. At the realised 0.1333 the ceiling is **5.5 / 0.1333 = 41.25 studs/s**, not the
45.83 printed in three merged keys. Against the merged Pace top 25.6 × the Vault set factor
1.20 = 30.72, that is **1.34× of room** (1.61× against the bare ladder). `solvency`'s released
S7 now runs the same check at the shipped tick and reports 10.8% of room, so both sides agree.

**What `invariants[10]` protects is how many patch clears land on one tick**, a cue-coincidence
question owned by feedback and response work. That quantity is
`(patchCount / lapSeconds) × realisedPeriod`, which for the bay reduces to
`realisedPeriod / (2 × 0.04955) = 1.345` and is therefore **also size-invariant**; at merged
ordinal 8 it is `(640 / 157.2) × 0.1333 = 0.543`. `core-loop/02` already fixes 0.35 s between
coincident onsets and `mechanics/05` already owns beat latency, so it belongs to them with a
value they can set.

**Dropping it moves no footprint, and this is the part most likely to be doubted.**
`depths.sizingRule` is `footprint(k) = floorToChunk( min(LAP_TARGET × tau(k), LAP_CEILING ×
tauTol(k)) / ROUTE_SLACK )` — **there is no tick term in it.** `invariants[10]` is a check
applied after sizing, never an input to it, so restating it changes zero rows of
`depths.areas[]`, zero chunk counts and zero patch counts. Wave 4's own verification reached the
same conclusion from the other side: *"`invariants[10]`'s separate 'at most one patch per two
ticks' bounds nothing a player perceives"* `[research: cid/gameplay/_verified-wave4.md]`.

**Every circulating cost figure has been wrong, and the input has moved three times.** The scan
at `Clearing.luau:392` is a linear `ipairs` over the live bay that **skips cleared patches by
branch, not by removal**, so cost is flat across a lap. Cost is
`patchCount × players × (1 / realisedPeriod)` and **nothing else** — so the deliverable is the
formula plus a resolving pointer, not a total. **The pointer is
`solvency.postTerminalBay.patchCount`**, verified against
`cid/gameplay/balance/03-ladder-solvency.md:124-129`, whose own `clearingLoopCost.formula` reads
`postTerminalBay.patchCount` and whose figures now match mine row for row; the released gate at
`_verified-wave4.md:354` names the same path. **`depths.postTerminalArea.patchCount`, which I
wrote last round, does not resolve** — `postTerminalArea` belongs to `endgame` — and neither
does Persistence's `depths.postTerminalBay.patchCount`. At the released 42 chunks and
`runtime.maxPlayers` 16:

| basis | patches | 0.1333 s · 7.5 Hz | 0.05 s · 20 Hz | 0.0333 s · 30 Hz |
|---|---|---|---|---|
| merged, deepest area — `depths.areas[7].patchCount` | 640 | **76,800** | 204,800 | 307,200 |
| wave 4 area 8 — `solvency.areaLedger[7].patchCount` | 1,120 | 134,400 | 358,400 | 537,600 |
| wave 4 bay — `solvency.postTerminalBay.patchCount` | 1,680 | **201,600** | 537,600 | 806,400 |

**Only the first row is live.** The third is the one everyone has quoted and it has moved
three times.

**Raising the tick does not raise the per-frame spike — it raises how often the spike happens.**
One pass costs `patchCount × players` tests at any rate: 26,880 tests at the bay, every tick.
At 7.5 Hz that lands on one frame in eight; at 30 Hz on every second frame. **That is the shape
of the risk and a tests-per-second figure hides it**, so the budget below is stated in
milliseconds of one 16.67 ms frame. The per-iteration cost that converts tests to milliseconds
has **no published source** — two field reads, two subtractions, two multiplies, one add, one
compare. `[playtest unknown]`, 0.05 to 0.20 µs, MicroProfiler named as the instrument.

**Two other things run inside this tick and neither is significant.** Security's position
authority adds one vector subtract, one squared length and one clamp per player per tick — 16
operations against 10,240 distance tests, **0.16%**, and sheet `03`'s amended `N10` now permits
the monotonic elapsed-time read its accumulator needs. `protocol`'s `StateChanged` push is at
most one `FireClient` per player per *changed* tick, and **its bandwidth is `replication`'s
field and not mine to restate**; my lead's 62 kB/s came from a retired 8.33 sends/s derivation
and is withdrawn.

**The fallback, priced.** If the developer keeps `invariants[10]` as written, the only legal
period under 0.04 is **2 frames = 0.0333 s** and the bill is **806,400 tests/s**, 4.0× the live
figure. Bucketing then stops being optional: a **1-D partition along the lane axis (+Z), bucket
depth 120 studs** = 2 × the radius ceiling `plots.laneWidthStuds / 2`. **One axis suffices**
because the lane is only 120 studs wide, while a bay runs
`chunkCount × layout.chunk.depthStuds` — 480 studs merged, 1,260 at the released bay. A clear
circle of radius ≤ 60 spans at most two adjacent buckets, so a player tests 2 instead of the
whole bay, a `nBuckets / 2` reduction: at the released bay, `ceil(1260 / 120) = 11` buckets →
320 tests per player per tick → **153,600 tests/s, below today's unbucketed 201,600.** At merged
lengths there are 4 buckets and the reduction is 2×, which does not pay for the complexity.
**The loop's shape is `modules`/`clearing`'s, so this is RR-P5 and not my decision.**

**The burst is the other half of the same budget and nobody costed it.**
`plots.liveGeometry` builds a bay whole *"the instant the previous bay's last patch clears"* —
646 `Instance.new` calls merged, 1,686 at the released bay, on the single tick that fires the
game's largest payoff, plus the same cost at join. **Cap it at 250 creations per server frame,
server-wide**, not per player, or 16 concurrent joins queue 16 × 250. Build into a container
whose `Parent` stays `nil`, then assign `Parent` **once**: `theme/identity/03` requires that *"a
plot appears and disappears whole; nothing may stagger or animate its patches into existence"*,
and one parent assignment satisfies it while the creations spread across frames. **The player
sees nothing.** No loading screen, no freeze, no camera change, no forced idle —
`mechanics/05` forbids any beat taking control away — and at 250/frame the merged bay takes 3
frames (50 ms) and the released bay 7 (117 ms), against a walk from the last cleared patch to
the inward opening that `pacing` puts in the tens of seconds. At join the whole lane is parented
before the character is, so nothing spawns onto an absent slab.

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
      "requestWas": { "from": 0.12, "to": 0.04, "by": "gameplay/balance/03-ladder-solvency (solvency); the request is withdrawn in that sheet's released revision" },
      "maxPeriodAdmittedByInvariantTen": {
        "value": 0.04955,
        "derivation": "lapSeconds / (2 * patchCount) at the post-terminal bay",
        "sizeInvariant": true,
        "whySizeInvariant": "the bay's lap and its patch count are both set by depths.sizingRule at a fixed density, so their ratio does not move when chunkCount does. This threshold has survived the bay going 47 -> 44 -> 42 chunks unchanged.",
        "realised0_05Exceeds": true
      },
      "whyDeclined": [
        "0.04 realises as 0.05, which exceeds maxPeriodAdmittedByInvariantTen 0.04955. The request does not deliver what it was requested for, at any bay size.",
        "depths.invariants[10] bounds no physical quantity. The physical rule is modifiers.axes[speed].ceilingRule, and it passes at the realised 0.13333.",
        "the cost is 2.7x the proximity loop for a check that still fails."
      ],
      "speedCeilingAtRealisedPeriod": {
        "rule": "movement.baseClearRadius / realisedPeriodSeconds",
        "value": 41.25,
        "printedElsewhereAs": 45.83,
        "printedElsewhereWhy": "45.83 = 5.5 / 0.12 uses the CONFIG number, not the realised one. It appears in architect/01-runtime, modifiers.axes[speed] and products.headroom.H1_axisCeiling. See revisionRequests RR-P4.",
        "mergedHeadroom": { "ladderTop": 25.6, "withVaultSetFactor": 30.72, "roomAtRealised": 1.343, "roomAgainstBareLadder": 1.611 },
        "waveFourHeadroom": { "readByField": "upgrades.speed ladder top x setBonus's Vault factor", "corroboratedBy": "solvency test S7, which runs the same check at the shipped realised tick and reports 10.8% of room" },
        "noProductSellsSpeed": "monetization/01 sells nothing on value or speed, so no product factor enters this."
      },
      "invariantTenAlreadyFailsAtMergedValues": {
        "lapSecondsAtOrdinals5to8": 157.2,
        "lapSourceNote": "meta/04:199. The rounded 157 at meta/04:195 yields 588.75, which is 0.13% low. An earlier draft of this sheet used 165 and understated the failure by a factor of four.",
        "checkAsCoded": "evaluated at the config 0.12: bound 655, and 624 / 624 / 640 / 640 all pass",
        "checkAtRealisedPeriod": "bound 589.5; the same four rows FAIL by 5.9%, 5.9%, 8.6% and 8.6%",
        "cleanCheck": "the realised bound is always the config bound x 0.9, because 0.12 / 0.13333 = 0.9. 655 x 0.9 = 589.5 exactly.",
        "consequence": "the restatement in RR-P3 is required whatever the tick becomes. This is not a request to drop a working rule."
      },
      "patchClearsLandingOnOneTick": [
        { "basis": "merged ordinal 8", "patches": 640, "lapSeconds": 157.2, "perTick": 0.543 },
        { "basis": "post-terminal bay, any revision", "derivation": "realisedPeriodSeconds / (2 * maxPeriodAdmittedByInvariantTen)", "perTick": 1.345, "sizeInvariant": true }
      ]
    },
    "scanCostModel": {
      "shape": "linear ipairs over the live bay, squared XZ distance, cleared patches skipped by BRANCH not by removal, so cost is flat across a lap",
      "callSite": "game/src/server/Clearing.luau:392",
      "formula": "distanceTestsPerSecond = patchCount * players * (1 / realisedPeriodSeconds)",
      "formulaIsTheDeliverable": "read patchCount by field. This input has moved three times and every published total has been wrong at least once; the formula has not moved.",
      "players": 16,
      "playersSource": "runtime.maxPlayers. Not 20.",
      "rows": [
        { "basis": "merged deepest area", "patchCountField": "depths.areas[7].patchCount", "patches": 640, "live": true, "at7_5Hz": 76800, "at20Hz": 204800, "at30Hz": 307200 },
        { "basis": "wave 4 area 8", "patchCountField": "solvency.areaLedger[7].patchCount", "patches": 1120, "live": false, "at7_5Hz": 134400, "at20Hz": 358400, "at30Hz": 537600 },
        { "basis": "wave 4 post-terminal bay", "patchCountField": "solvency.postTerminalBay.patchCount", "patches": 1680, "live": false, "at7_5Hz": 201600, "at20Hz": 537600, "at30Hz": 806400 }
      ],
      "onlyTheFirstRowIsLive": true,
      "pathVerifiedAt": "cid/gameplay/balance/03-ladder-solvency.md:124-129 for postTerminalBay and :122 for areaLedger[7]; its own clearingLoopCost block publishes 201600 / 537600 / 806400 and matches this table row for row. The released gate at cid/gameplay/_verified-wave4.md:354 names solvency.postTerminalBay.patchCount.",
      "spellingsThatDoNotResolve": {
        "depths.postTerminalArea.patchCount": "this sheet's round-2 spelling. postTerminalArea is a field of ENDGAME (gameplay/meta/07), not of depths.",
        "depths.postTerminalBay.patchCount": "tech/persistence/01's spelling. Neither the container nor the field exists on depths."
      },
      "supersededTotals": {
        "940000": "1880 * 20 * 25 — an unreachable 25 Hz AND 20 players",
        "752000": "1880 * 16 * 25 — an unreachable 25 Hz",
        "225600 / 601600 / 902400": "1880 patches, the 47-chunk bay. This sheet's first draft.",
        "211200 / 563200 / 844800": "1760 patches, the 44-chunk bay, per _verified-wave4.md:507-509"
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
          { "basis": "released bay, 16 players", "testsPerTick": 26880, "msAt0_10us": 2.69, "msAt0_20us": 5.38, "verdict": "pass at 0.10, FAIL at 0.20" }
        ],
        "note": "the per-tick cost does not change with the tick rate. Only its frequency does: one frame in eight at 7.5 Hz, one in two at 30 Hz."
      },
      "otherCostsInsideTheSameTick": [
        { "subject": "security position authority", "owner": "tech/security (integrity)", "cost": "one vector subtract, one squared length, one clamp per player per tick", "shareOfTickAtMerged": 0.0016, "clockNote": "its accumulator needs a monotonic elapsed-time read, which performance/03 N10 permits as amended in round 3" },
        { "subject": "StateChanged push", "owner": "tech/networking (replication)", "cost": "at most one FireClient per player per CHANGED tick", "bandwidth": "replication's 16-player outbound field. THIS KEY STATES NO BYTE TOTAL. An earlier draft carried 62 kB/s from my lead's retired 8.33 sends/s derivation; it is withdrawn and replication's value is authoritative." }
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
      "instanceCountFormula": "patchCount + 6, per budgets.instanceCeilings.laneInstanceFormula",
      "deadlineMsFromCompletingClear": 500,
      "deadlineStatus": "[playtest unknown], test range 200 to 1000",
      "realised": [
        { "basis": "merged bay, one build queued",       "instances": 646,   "frames": 3,   "ms": 50 },
        { "basis": "released bay, one build queued",     "instances": 1686,  "frames": 7,   "ms": 117 },
        { "basis": "16 simultaneous joins, merged",      "instances": 10336, "frames": 42,  "ms": 690 },
        { "basis": "16 simultaneous joins, released bay","instances": 26976, "frames": 108, "ms": 1800 }
      ],
      "queueDegradation": "the 500 ms deadline holds for a single queued build. A full queue degrades it, which is accepted: the two cases are server fill (inside budgets.tiers[].loadToFirstInputSeconds, before any character spawns) and simultaneous area completion, which is unreachable because laps are unsynchronised.",
      "joinOrdering": "the whole lane — slab, four boundary parts, spawn Attachment, every patch — is parented before the character is parented. Nothing may spawn onto an absent slab.",
      "whatThePlayerSees": {
        "loadingScreen": "none", "freeze": "none", "cameraChange": "none", "forcedIdle": "none", "walkSpeedWrite": "none",
        "why": "mechanics/05 forbids any beat taking control away and response.negativeBeats is 0. At 117 ms against the tens of seconds pacing puts on the walk from the last cleared patch to the inward opening, the build is invisible."
      }
    },
    "bucketingRequirement": {
      "status": "CONDITIONAL — required only if depths.invariants[10] is kept as written",
      "routedAs": "revisionRequests RR-P5, to architect. The loop's shape is modules/clearing's, not this domain's.",
      "partition": "1-D along the lane axis (+Z)",
      "bucketDepthStuds": 120,
      "bucketDepthRule": "2 x the maximum effective clear radius, which modifiers.axes[radius].ceilingRule caps at plots.laneWidthStuds / 2 = 60",
      "whyOneAxisSuffices": "the lane is 120 studs wide, so one bucket already spans it, while a bay runs chunkCount x layout.chunk.depthStuds — 480 studs merged and 1260 at the released bay.",
      "bucketsTestedPerPlayerPerTick": 2,
      "why2": "a circle of radius <= 60 spans an interval of length <= 120 = one bucket depth, so it touches at most two adjacent buckets.",
      "nBuckets": "ceil(bayLengthStuds / 120)",
      "reduction": "nBuckets / 2",
      "payoff": [
        { "basis": "released bay at 30 Hz",        "bayLengthStuds": 1260, "buckets": 11, "testsPerPlayerPerTick": 320, "testsPerSecond": 153600, "reduction": 5.5, "verdict": "below today's unbucketed 201600" },
        { "basis": "merged deepest bay at 7.5 Hz", "bayLengthStuds": 480,  "buckets": 4,  "testsPerPlayerPerTick": 320, "testsPerSecond": 38400,  "reduction": 2.0, "verdict": "does not pay for the complexity" }
      ],
      "fallbackPeriodIfInvariantKept": { "requested": 0.0333, "frames": 2, "realised": 0.03333, "hz": 30.0, "testsPerSecondAtReleasedBay": 806400 }
    },
    "instrumentOwner": {
      "status": "UNOWNED",
      "what": "every [playtest unknown] in budgets and serverCost is settled by a MicroProfiler or Server Jobs reading on the floor device, and by Developer Console memory and render stats.",
      "noSheetOwnsIt": "not in cid/, not in architect/. Analytics owns WHAT to record and explicitly not the pipe; Security names the same hole from the logging side.",
      "kindOfWork": "device-measurement and telemetry-transport work",
      "routedTo": "the final cross-category pass"
    },
    "readFromOtherKeysNeverCopied": {
      "snapshotOutboundBandwidth": "replication's 16-player outbound field",
      "postTerminalBayPatchCount": "solvency.postTerminalBay.patchCount",
      "areaEightPatchCount": "solvency.areaLedger[7].patchCount",
      "mergedAreaPatchCounts": "depths.areas[].patchCount",
      "speedLadderTopAndVaultFactor": "upgrades.speed and setBonus's Vault row",
      "laneWidthAndChunkDepth": "plots.laneWidthStuds, layout.chunk.depthStuds",
      "laneInstanceCount": "budgets.instanceCeilings.laneInstanceFormula"
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
        "alsoTrueToday": "evaluated at the REALISED 0.13333 against those rows' 157.2 s laps (meta/04:199), the current form already fails at merged ordinals 5, 6, 7 and 8 — bound 589.5 against 624, 624, 640, 640, by 5.9% to 8.6%. It passes only because it is evaluated at the config 0.12, where the bound is 655. The realised bound is the config bound x 0.9.",
        "movesNoFootprint": "depths.sizingRule contains NO TICK TERM. invariants[10] is a check applied after sizing, never an input to it. Zero rows of depths.areas[], zero chunkCounts and zero patchCounts change."
      },
      {
        "id": "RR-P4",
        "against": "architect/sheets/01-runtime.md",
        "changes": [
          { "field": "runtime.clearTickRate", "expressAs": "clearTickFrames: 8, with realisedPeriodSeconds: 0.13333 published beside it", "reason": "a period is not settable to arbitrary precision through task.wait. A frame count is exactly what the scheduler honours, and it makes the unreachable 0.0334-0.05 band impossible to request by accident." },
          { "field": "line 25 prose", "currently": "0.12 s is roughly two frames at 60fps", "correctTo": "0.12 s is 7.2 frames at 60 Hz and realises through task.wait as 8 frames, 0.1333 s", "reason": "wrong by a factor of four" },
          { "field": "line 28 prose and acceptance criterion 2", "currently": "5.5 / 0.12 = 45.83 studs per second", "correctTo": "5.5 / 0.13333 = 41.25 studs per second", "reason": "the ceiling is a function of the realised period, not the requested one" },
          { "field": "acceptance criterion 3's grep pattern", "narrowBy": "os.clock", "reason": "carried jointly with security's RR-S1 and networking's RR-N8. A monotonic elapsed-time read introduces no randomness, no reordering and no reindexing, and touches nothing layout produces. math.random, an unseeded Random.new(), os.time() and tick() stay forbidden. performance/03 N10 has already taken this narrowing; architect AC3 carries the identical pattern and only architect can amend it." }
        ],
        "alsoFalsifiedElsewhere": [
          "modifiers.axes[speed].ceilingRule prints 45.83",
          "products.headroom.H1_axisCeiling.ceilings.speed prints 45.83"
        ],
        "noValueChanges": "clearTickRate's behaviour is identical. This publishes what the engine already does."
      },
      {
        "id": "RR-P5",
        "against": "architect/sheets/02-modules.md and 07-wiring.md, the clearing module",
        "status": "CONDITIONAL — issue only if depths.invariants[10] is kept as written",
        "requires": "replace the linear ipairs at Clearing.luau:392 with a 1-D bucketed scan: partition the live bay along +Z at a bucket depth of 120 studs, test the player's bucket and one neighbour.",
        "price": "0.0333 s period, 30 Hz, 806400 distance tests/s unbucketed at the released bay; 153600 bucketed",
        "constraintsItMayNotBreak": "performance/03 N3 and N10 — the partition is an index over the same state.patches array, in the same order, with no removal and no reordering. state.cleared is keyed by array index and is a save-migration boundary."
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
tick stays 0.12 and the speed ladder still passes — but 45.83 is printed in three merged keys,
and every one of them is 11% optimistic. **That sheet's decision is ratified; its arithmetic is
corrected by RR-P4**, which now also carries the `os.clock` narrowing Security and Networking
both need and neither can make.

## Consequences for other work

- **Area-authoring-by-depth work (`depths`)** gets RR-P3 and **loses nothing**: the sizing rule
  has no tick term, so no footprint, chunk count or patch count moves. It inherits the corrected
  bounds — 655 at the config tick, 589.5 realised, failing by 5.9% to 8.6%.
- **Runtime work (`architect/01-runtime`)** gets RR-P4: frame count, realised period, 45.83 →
  41.25, and the one-token grep narrowing in acceptance criterion 3.
- **Modifier-resolution work (`modifiers`) and purchase-headroom work (`products.headroom`)**
  both print a speed ceiling 11% too high. The merged Pace ladder still clears it at 1.34×, and
  `solvency`'s S7 reports 10.8% of room at the shipped tick from the other side.
- **Feedback and response work (`response`, `core-loop/02`)** inherits a field to value:
  `maxPatchClearsPerTick`, starting 1.0. Realised is 0.543 merged and 1.345 at the bay — the
  latter size-invariant, so it will not move when the bay does.
- **Clearing-module work (`modules`, `wiring.onTick`)** inherits the burst rule — unparented
  container, one parent assignment, 250 creations per server frame server-wide, whole lane
  parented before the character at join — and, conditionally, RR-P5's bucketed scan.
- **Security work (`integrity`)** is told its per-tick step is 0.16% of the pass and that its
  monotonic clock read is now permitted by `03` N10. **Networking work (`replication`)** owns
  snapshot bandwidth outright; my lead's 62 kB/s is withdrawn.
- **Persistence work (`persistence`)** should spell its bound `solvency.postTerminalBay.patchCount`,
  which is the only one of the three circulating spellings that resolves.

## Acceptance criteria

1. `ceil(runtime.clearTickRate × 60) / 60 == serverCost.tickRuling.realisedPeriodSeconds`
   evaluates true against the merged manifest (0.13333), and no `realised` value in
   `serverCost.quantisation.table` is other than an integer multiple of `1/60`.
2. `movement.baseClearRadius / serverCost.tickRuling.realisedPeriodSeconds ≥ speedLadderTop ×
   Π(set factors on speed)` evaluates true at merged values: 41.25 ≥ 30.72.
3. Every row of `serverCost.scanCostModel.rows` satisfies `at7_5Hz == patches × 16 × 7.5`,
   `at20Hz == patches × 16 × 20` and `at30Hz == patches × 16 × 30`, and no figure anywhere in
   the key equals 752,000, 940,000, 902,400 or 844,800.
4. Every `patchCountField` in `serverCost.scanCostModel.rows` resolves against the merged
   manifest, and `grep -n "depths.postTerminalArea\|depths.postTerminalBay"
   cid/tech/performance/` returns nothing outside `spellingsThatDoNotResolve`.

## Not decided here

Every ceiling on how much content exists — sheet `01`, which holds `budgets`. Which savings
this domain may never take — sheet `03`, which also owns `N10`'s wording. The tick's *value* is
`architect`'s, which is why my ruling is a hold plus two revision requests rather than an edit.
The loop's implementation shape, including whether RR-P5's bucketing is adopted —
`modules`/`clearing`. Whether `architect/01-runtime` acceptance criterion 3 takes the
`os.clock` narrowing — `architect`, on RR-P4, Security's RR-S1 and Networking's RR-N8. Every
patch count, lap length and footprint — `depths` and `solvency`, read by field. **Snapshot bytes
and outbound bandwidth — `replication`, outright.** What `maxPatchClearsPerTick` should be —
feedback and response work. What a clear, a reveal or an area completion sounds or looks like —
Audio, VFX, Feedback UI. The per-iteration cost, the per-tick millisecond budget and the
per-frame creation cap are all `[playtest unknown]` because **no published figure exists for any
of the three**, and the instrument that would settle them has no owner in either contract.
