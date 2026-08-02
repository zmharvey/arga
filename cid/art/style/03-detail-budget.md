# 03 — Detail budget

**Domain:** Style Guide · **Category:** Art & Visuals · **Wave:** 6

## Decision

**The binding ceiling on everything Art adds to the world is
`budgets.instanceCeilings.clientStreamedInstanceCeiling`, not the server one, and it leaves
exactly 186 instances across nine loaded lanes.** This key sets that envelope and the rules
inside it; **it allocates nothing to a subject class** — `environment` and `effects` do, and
their totals are read by field. At the merged values the envelope holds at **161 of 186, with 25
spare**, and the over-subscription this key found in round 1 is **closed**. Triangles do not bind
and no art part may be a `Model`. **Below `batchingFactor` 5.805 no art budget exists at any
size**, which is a finding against `depths.areas[].patchCount`, not an art decision.

## Why

**This is a derivation, not an allocation. Every input is a field reference and every one of them
is `[playtest unknown]`.** If a figure below is wrong, the fix lands on the input.

**A key made only of citations needs the sweep most, and in round 2 it was the one key that did
not get one.** `RR-1` struck the per-subject rows correctly and then left every other figure at
its pre-strike value, so this sheet merged asserting a breach three keys had already closed and
instructing readers toward three paths that do not resolve. **Every number below is re-derived
against the merged manifest, and every external path is listed and resolved in `citeAs`.**

**Instances and parts are different quantities and `budgets` is inconsistent underneath every key
that reads it.** A lane is `patchCount + 6` = **662 instances** at `residentInstancesPerLane` 16
(`laneInstanceFormula`) and `patchCount + 5` = **661 parts** (`lanePartFormula`) at
`max(depths.areas[].patchCount)` 640. So `clientStreamedInstancesWorstCase` **5,814 is instances**
(9 × 646) and the nine-lane draw-call base **5,805 is parts** (9 × 645). **Instance ceilings take
646; draw calls and triangles take 645.** A sheet using one for the other is out by nine.

**The server arithmetic my lead established, carried rather than redone.**
`serverWorldInstanceCeiling` 12,000 ÷ `runtime.maxPlayers` 16 = **750** per player; minus a lane's
646 = **104** per lane, if nothing is shared.

**The client arithmetic it omitted, and it binds three times harder.**
`clientStreamedInstanceCeiling` **6,000** against a worst case of **5,814 instances** — nine lanes
inside a 512-stud `StreamingTargetRadius` at `plots.pitchStuds` 122, every one at the deepest
merged bay — leaves **186 instances total across nine lanes**, not per lane. The constraint is
`9E + S + F ≤ 186`. `[cid: decided]` on which ceiling binds; the ceilings are `budgets`'.

**The over-subscription is closed, and how it closed is worth keeping in the record.** In round 1
this key found that `9 × 18 + 24 = 186` spent 100% of the headroom and left nothing for
`effects`, whose 17–35 took the merged total to 6,017–6,035 against 6,000. It was real, no rule
in this key could close it, and it closed from both sides: **`environment` cut to 16 per lane and
struck the litter mat, and `effects` moved the reveal client-side, taking 17–35 to a hard bound
of 11.** A finding that was true and is now closed belongs in the record with its resolution, not
deleted.

**Which shared field enters which sum, named canonical because two keys picked differently.**
`clientStreamedInstanceCeiling` is a ceiling on *streamed* instances and
`clientStreamedInstancesWorstCase` is itself a streamed figure, so charging place-wide parts that
are never simultaneously inside `StreamingTargetRadius` double-counts. **The client and draw-call
sums take `environment.allowance.sharedMaxStreamedConcurrently`; the server sum takes
`environment.allowance.sharedPlaceInstances`.** The conservative reading — charging all 20 —
gives **5,989 ≤ 6,000**, so nothing breaks either way, which is why this is a naming ruling and
not an arithmetic one.

**What the envelope buys, restated at 16.** A merged deepest bay is 640 patches at 40 anchors per
chunk = **16 chunks** of `layout.chunk`, 480 studs, so `residentInstancesPerLane` 16 is **1.00
part per chunk**. `environment/04` states its own figure against `layout`'s 32 owed chunk looks
and it is read by field, not restated here. The lever remains `depths.areas[].patchCount`, which
is the same lever `tech/performance/01`'s escalation names and which four art sheets now cite.

**The reservation is over-sized, not under, and 24 instances are parked against a need that no
longer exists.** `environment.allowance.perClientReservation.effects` was sized against `effects`'
round-0 worst case; `effects.budget.clientInstancesAdded` is now **11** and
`clientInstancesAreAHardBound` is true, so **24 is releasable**. Its two named first calls are
Environment's own — the litter mat (`groundwork` 4 → 5) and the retained-boundary cross-walls
(`builtEdge` 6 → 10). **Those two together cost +5 per lane = 45 client instances, and 24
releases 2 per lane with 6 left over**, so 24 funds the litter mat and one of the four cross-wall
parts, not both in full. The derivation string is `environment`'s to fix; the division by nine is
stated here so the release is not spent twice.

**One arithmetic correction, shown rather than asserted.** Round 2 gives the draw-call floor as
`(9 × (645 + 16) + 6 + 11) / 1000` = 5.962. That expression evaluates to **5.966**: `9 × 661 =
5,949`, `+ 6 + 11 = 5,966`. The formula is right and the quotient is out by four parts. **I carry
5.966** and record the delta rather than adopting a figure I cannot reproduce. Nothing downstream
moves: at `batchingFactor` 50 draw calls are 12% of ceiling either way.

**Nothing in this envelope is met by a saving `tech/performance/03` forbids**, and two of its
rows do not reach the classes people will assume they do.

```manifest
{
  "provides": "detailBudget",
  "status": "proposed",
  "value": {
    "isADerivation": "every figure here is arithmetic over fields owned elsewhere. A contradiction lands on the input, not on this key.",
    "allocatesNothing": "struck on verification RR-1. Per-subject-class instance counts live in environment (world dressing) and effects (cues). This key sets the envelope, the binding ceiling, the instances-versus-parts rule, the canonical shared field, the draw-call feasibility and the forbidden savings — and reads every consumer total by field.",
    "citeAs": {
      "whyThisExists": "round 1 found three sheets citing paths into styleGuide that do not resolve; round 2 found this key doing the same thing outward. An alias is a merge error, not a synonym.",
      "canonical": [
        "detailBudget.bindingCeiling.which",
        "detailBudget.envelope.clientHeadroomInstances",
        "detailBudget.envelope.constraint",
        "detailBudget.envelope.canonicalSharedField",
        "detailBudget.instancesVersusParts",
        "detailBudget.drawCalls.minimumBatchingFactorForAnyBudget",
        "detailBudget.drawCalls.minimumBatchingFactorAtMergedTotals",
        "detailBudget.overSubscription",
        "detailBudget.reservationRelease",
        "detailBudget.noModelRule",
        "detailBudget.forbiddenSavings[] — keyed by .id",
        "detailBudget.whatNDoesNotReach",
        "detailBudget.instrument",
        "detailBudget.consequenceForPlots"
      ],
      "readByField": [
        { "path": "environment.allowance.residentInstancesPerLane", "mergedValue": 16, "entersWhich": "E in the client, server and draw-call sums" },
        { "path": "environment.allowance.sharedMaxStreamedConcurrently", "mergedValue": 6, "entersWhich": "S in the CLIENT and DRAW-CALL sums — canonical" },
        { "path": "environment.allowance.sharedPlaceInstances", "mergedValue": 20, "entersWhich": "S in the SERVER sum" },
        { "path": "environment.allowance.perClientReservation.effects", "entersWhich": "the reservation, not the realised sum" },
        { "path": "effects.budget.clientInstancesAdded", "mergedValue": 11, "entersWhich": "F in the client and draw-call sums" },
        { "path": "effects.budget.clientInstancesAreAHardBound", "mergedValue": true, "entersWhich": "why F cannot scale with loaded lanes" },
        { "path": "budgets.instanceCeilings.clientStreamedInstanceCeiling", "mergedValue": 6000 },
        { "path": "budgets.instanceCeilings.clientStreamedInstancesWorstCase", "mergedValue": 5814 },
        { "path": "budgets.instanceCeilings.laneInstanceFormula", "mergedValue": "patchCount + 6" },
        { "path": "budgets.instanceCeilings.lanePartFormula", "mergedValue": "patchCount + 5" },
        { "path": "budgets.renderCeilings.batchingFactor", "mergedValue": 50, "status": "[playtest unknown], test range [1, 500]" },
        { "path": "budgets.deviceFloor", "entersWhich": "the instrument. Cited by field, never from the brief — RR-P1." },
        { "path": "max(depths.areas[].patchCount)", "mergedValue": 640 },
        { "path": "runtime.maxPlayers", "mergedValue": 16 }
      ],
      "wrongSpellingsSeenInRoundTwo": [
        { "cited": "environment.perLaneInstances", "by": "this key, round 1", "resolvesTo": "environment.allowance.residentInstancesPerLane" },
        { "cited": "environment.sharedInstances", "by": "this key, round 1", "resolvesTo": "environment.allowance.sharedMaxStreamedConcurrently for the client sum, environment.allowance.sharedPlaceInstances for the server sum. The ambiguity is why one is now named canonical." },
        { "cited": "effects.totalInstances", "by": "this key, round 1", "resolvesTo": "effects.budget.clientInstancesAdded" }
      ],
      "notInThisKey": "no per-subject-class allocation. detailBudget.perLane.rows and detailBudget.shared.rows do not exist and never will."
    },
    "instancesVersusParts": {
      "problem": "budgets is inconsistent underneath every key that reads it: 5814 is INSTANCES (9 x 646) and 5805 is PARTS (9 x 645). They differ by the spawn Attachment, one per lane. budgets.renderCeilings.batchingFactor.escalationIfBelow10 says 'at 1:1 the merged design renders 5814 draw calls', which takes the instance figure for a draw-call figure.",
      "instanceFormula": "budgets.instanceCeilings.laneInstanceFormula — patchCount + 6. Use for every instance ceiling.",
      "partFormula": "budgets.instanceCeilings.lanePartFormula — patchCount + 5. Use for every draw-call and triangle figure.",
      "rule": "cite the one you mean. A sheet using one for the other is out by nine per nine lanes.",
      "alsoPerConsumer": "a consumer's instance count is not its part count. An Attachment, a Sound or a Folder is an instance and is not a draw call. Read a consumer's part figure for the draw-call sum where it publishes one.",
      "routedTo": "tech/performance, as a naming defect in budgets rather than an arithmetic error in it"
    },
    "bindingCeiling": {
      "which": "budgets.instanceCeilings.clientStreamedInstanceCeiling",
      "why": "9 * (646 + E) + S + F <= 6000 leaves 186 instances across nine lanes. The server ceiling leaves 104 per lane and does not bind.",
      "serverArithmeticForComparison": "12000 / 16 = 750 instances per player; 750 - 646 = 104 per lane if nothing is shared",
      "serverCheckAtMergedTotals": "runtime.maxPlayers * (646 + environment.allowance.residentInstancesPerLane) + environment.allowance.sharedPlaceInstances = 16 * 662 + 20 = 10612 <= 12000, headroom 1388"
    },
    "envelope": {
      "clientCeiling": 6000,
      "worstCaseInstances": 5814,
      "worstCaseIs": "INSTANCES — 9 lanes x (patchCount + 6) at max(depths.areas[].patchCount) 640, inside a 512-stud StreamingTargetRadius at plots.pitchStuds 122",
      "clientHeadroomInstances": 186,
      "constraint": "9 * environment.allowance.residentInstancesPerLane + environment.allowance.sharedMaxStreamedConcurrently + effects.budget.clientInstancesAdded <= 186",
      "atMergedValues": "9 * 16 + 6 + 11 = 144 + 6 + 11 = 161 <= 186. SATISFIED, 25 spare.",
      "asAbsoluteInstances": "5814 + 161 = 5975 <= 6000",
      "conservativeReading": "substituting sharedPlaceInstances 20 for sharedMaxStreamedConcurrently 6: 144 + 20 + 11 = 175 <= 186, i.e. 5989 <= 6000, 11 spare. Solvent under both accountings.",
      "environmentIdentityIncludingItsReservation": "9 * 16 + 6 + 35 = 185 <= 186, 1 spare. The 35 is a reservation, not a realised cost; see reservationRelease.",
      "canonicalSharedField": {
        "clientAndDrawCallSums": "environment.allowance.sharedMaxStreamedConcurrently",
        "serverSum": "environment.allowance.sharedPlaceInstances",
        "why": "clientStreamedInstanceCeiling is a ceiling on STREAMED instances and clientStreamedInstancesWorstCase is itself a streamed figure, so charging place-wide parts never simultaneously inside StreamingTargetRadius would double-count. The server ceiling counts what exists, so it takes the place-wide figure.",
        "settles": "round-2 RR-16 — environment/01's clientIdentity took 6 and vfx/01's criterion 3 took 20. Both evaluate true; this names one so a third key cannot pick the other.",
        "whoMustRead": "environment/01, vfx/01, and any later key entering either sum"
      },
      "whoSpendsIt": "environment and effects. Not this key.",
      "rangeIfTheCeilingMoves": "at clientStreamedInstanceCeiling's test-range top of 10000 the headroom is 4186. That single field is the only thing that moves it; batchingFactor does not, above 5.966.",
      "chunkArithmetic": "a merged deepest bay is 640 patches / 40 anchors per chunk = 16 chunks of layout.chunk, 480 studs. At residentInstancesPerLane 16 that is 1.00 part per chunk. environment/04 states its own figure against layout's 32 owed chunk looks; read it there rather than here."
    },
    "overSubscription": {
      "status": "CLOSED",
      "wasReal": true,
      "asFound": "round 1: environment 18 per lane + 24 shared = 9 * 18 + 24 = 186 exactly, 100% of headroom, leaving nothing for effects, whose 17-35 took the merged total to 6017-6035 against 6000.",
      "whyThisKeyCouldNotCloseIt": "this key allocates nothing, so it had nothing to take from. It could only state the breach and name the three levers.",
      "howItClosed": [
        "environment cut residentInstancesPerLane 18 -> 16 and struck the litter mat from its roster",
        "effects moved the reveal client-side, taking a 17-35 range to a hard bound of 11 (clientInstancesAreAHardBound: true, because neither cue replicates, so the figure cannot scale with loaded lanes)"
      ],
      "mergedTotalNow": "5975 (canonical accounting) to 5989 (conservative), against 6000",
      "spare": [11, 25],
      "keptAsARecordBecause": "a finding that was true and is now closed is worth more in the record than one that quietly disappears. If either consumer's total rises, this is the arithmetic that catches it again."
    },
    "reservationRelease": {
      "reserved": "environment.allowance.perClientReservation.effects — sized against effects' round-0 worst case",
      "actualNeed": "effects.budget.clientInstancesAdded, 11, a hard bound",
      "releasable": 24,
      "releasableIsClientInstances": "24 client instances, not 24 per lane. Divided by nine loaded lanes that is 2 additional per-lane instances with 6 left over.",
      "namedFirstCalls": [
        { "what": "the litter mat", "field": "groundwork 4 -> 5", "costPerLane": 1, "costInClientInstances": 9, "source": "environment/03's own Flagged to the developer: 'buy it back first; the place currently has nothing that says it was left alone'" },
        { "what": "the retained-boundary cross-walls", "field": "builtEdge 6 -> 10", "costPerLane": 4, "costInClientInstances": 36, "closes": "the residual retained-bay seam round 2 accepted" }
      ],
      "correction": "the two together cost +5 per lane = 45 client instances. 24 does NOT fund both: it funds the litter mat (9) and one of the four cross-wall parts (9), with 6 spare. The claim that releasing 24 funds both exactly does not survive division by nine lanes.",
      "whoseDerivationStringItIs": "environment.allowance.perClientReservation.effects. Reset it to read effects.budget.clientInstancesAdded by field; the division by nine is stated here so the release is not spent twice."
    },
    "triangles": {
      "binding": false,
      "patchesAtNineLanes": 580500,
      "computedFrom": "9 * lanePartFormula(640) * trianglesPerPatchBudget = 9 * 645 * 100 — PARTS, not instances",
      "remainingForArt": 419500,
      "perArtPartAtTheFullEnvelope": 2255,
      "whyNotBinding": "every art part is a primitive. uploadedMeshAssetsInWorldGeometry is 0 and N1 forbids UnionAsync and SubtractAsync, so no art part can approach 2255 triangles.",
      "theOneRiskIsNotMine": "budgets.renderCeilings.trianglesPerPatchRule already owns Ball, with a shape swap as its stated fix.",
      "noPerClassAllowanceSetHere": "struck with RR-1. A triangle allowance per subject class belongs beside the instance count, in environment."
    },
    "drawCalls": {
      "formula": "(9 * (lanePartFormula(patchCount) + environment.allowance.residentInstancesPerLane) + environment.allowance.sharedMaxStreamedConcurrently + effects.budget.clientInstancesAdded) / batchingFactor <= budgets.renderCeilings.drawCalls",
      "countsParts": true,
      "atMergedTotals": "(9 * 661 + 6 + 11) / f = 5966 / f",
      "minimumBatchingFactorAtMergedTotals": 5.966,
      "arithmeticShown": "9 * 661 = 5949; 5949 + 6 + 11 = 5966; 5966 / 1000 = 5.966",
      "roundTwoStated": 5.962,
      "delta": "round 2 gives the same expression and quotes 5.962. The expression evaluates to 5.966 — a four-part difference. I carry 5.966 rather than a figure I cannot reproduce; nothing downstream moves, because at batchingFactor 50 draw calls are 12% of ceiling either way. Recorded for one-line reconciliation.",
      "minimumBatchingFactorForAnyBudget": 5.805,
      "belowThat": "no art budget exists at ANY size. 9 * 645 = 5805 draw calls against 1000 with E = 0, and no legal streaming radius fixes it because one lane's deepest bay is already 645 parts. The lever is depths.areas[].patchCount and it is a finding against depths.",
      "between5805and5966": "the draw-call bound is tighter than the 186-instance bound",
      "atOrAbove5966": "the instance bound binds and does not loosen anywhere in the 1-500 range",
      "whatMovesTheEnvelope": "not batchingFactor. Only budgets.instanceCeilings.clientStreamedInstanceCeiling."
    },
    "noModelRule": {
      "rule": "zero Model instances in world geometry. Art adds Parts and cue hosts only, and no Folder or Model wrapper.",
      "protects": "budgets.streaming.ModelStreamingMode 'Default', chosen on the reasoning that world geometry contains no Model; a Model wrapper would silently change what streams.",
      "check": "grep -rn 'Instance.new(\"Model\")' game/src/server returns nothing"
    },
    "forbiddenSavings": [
      { "id": "N1", "wouldHaveBought": "an LOD or imposter on a wall run at 122 studs", "heldTo": "the envelope stands at every distance; formLanguage.featureSize.far is met by authored size, not by a distance rule" },
      { "id": "N2", "wouldHaveBought": "merging a chunk's dressing into one part", "heldTo": "every art part is one part; a chunk's dressing is not combined" },
      { "id": "N11", "wouldHaveBought": "pooling in-bay parts across bays", "heldTo": "a bay teardown is one Destroy on the slab; nothing is re-parented" },
      { "id": "N12", "wouldHaveBought": "collapsing tier heights to reclaim triangles", "heldTo": "triangles do not bind; nothing here is paid for by tiers" },
      { "id": "N17", "wouldHaveBought": "one uploaded mesh replacing ten parts", "heldTo": "zero uploaded assets; styleGuide.materials closes this at the palette layer" }
    ],
    "whatNDoesNotReach": "N12 forbids writing .Size on a PATCH after creation and N11 forbids pooling a PATCH Instance. NEITHER reaches a lane-tier art part that spans bays 1..k and is resized by the same applyLaneExtent that resizes the slab. environment's two-tier residency depends on that exemption; it is stated here so a builder does not misapply N11 or N12 to a parapet.",
    "instrument": {
      "what": "Developer Console render stats, and Developer Console > Memory > PlaceMemory.Instances",
      "where": "budgets.deviceFloor. Cited by field, never from the brief — RR-P1 strikes cid/gameplay/meta/01-the-area.md:39, which cites a floor existing only in concept/spec/syndicate-auction-test and concept/spec/sky-freight-test, both [simulated: R5 Q5].",
      "how": "one lane loaded, then nine, at max(depths.areas[].patchCount)",
      "ownerIsUnnamed": "no sheet in either contract owns taking this reading. tech/performance/01 names the same hole from its side (gap G4). Every figure in this key depends on it."
    },
    "consequenceForPlots": {
      "reopens": "plots.liveGeometry.torndownBeyond",
      "why": "representation.plot states that a finished bay 'IS bare, holding ground and nothing else, so there is nothing to tear down... That changes the first time Art dresses a bay, and the rule acquires a subject then.' environment now dresses bays, so it has changed.",
      "whatDoesNotReopenIt": "a lane-tier element spanning bays 1..k, resized rather than rebuilt on a bay advance.",
      "whatDoes": "environment's liveBay tier — cross-wall, basin, signature — which is destroyed and rebuilt with the bay.",
      "notResolvedHere": "the rule's new subject is plots' to state. environment/01 residency.reopensPlotsField says the same from its side; two sheets state it and neither resolves it, which is correct."
    },
    "scopeCheck": "no envelope figure, rule or exemption is reserved, stubbed or held open for procedural generation, rebirth, offline accrual, codes, daily rewards, leaderboards, trading, or seasons and events. 03-META.md priority 3; N9.",
    "everyCeilingIsPlaytestUnknown": "serverWorldInstanceCeiling, clientStreamedInstanceCeiling, drawCalls, triangles, trianglesPerPatchBudget and batchingFactor all carry status [playtest unknown] in budgets with their own test ranges. A domain that designs against them as firm will be redone."
  }
}
```

## Consequences for other work

- **Environment work** keeps the per-subject-class allocation outright; this key allocates nothing
  against it. What it inherits: the envelope `9E + S + F ≤ 186`, now **satisfied at 161 with 25
  spare**; the canonical shared field (`sharedMaxStreamedConcurrently` for the client and
  draw-call sums, `sharedPlaceInstances` for the server sum), which settles round 2's `RR-16` from
  the key that holds the sum; the `N11`/`N12` exemption its two-tier residency depends on; and
  **the correction that releasing 24 reserved instances funds the litter mat and one cross-wall
  part, not both in full**, because 24 client instances is 2 per lane across nine lanes.
- **VFX work (`effects`)** is funded. `clientInstancesAdded` 11 with `clientInstancesAreAHardBound`
  true is what closed the breach this key raised in round 1, and the client-side reveal is why the
  figure cannot scale with loaded lanes. Its criterion 3 should read
  `environment.allowance.sharedMaxStreamedConcurrently`, not `sharedPlaceInstances`, so the two
  keys enter one sum.
- **Area-authoring-by-depth work (`depths`)** receives the finding unchanged in direction and
  updated in size: at 640 patches, Environment gets **1.00 part per chunk** of `layout.chunk`.
  **The lever is `patchCount`**, and four art sheets plus `tech/performance/01` now name it.
- **Tech & Data — Performance** gets two things. `clientStreamedInstanceCeiling` binds before
  `serverWorldInstanceCeiling` for every non-patch instance in the game, and `batchingFactor` is
  **not** the field that sizes Art; above 5.966 it stops mattering. And `budgets` conflates 5,814
  instances with 5,805 parts inside its own `escalationIfBelow10`, which two art keys each
  inherited.
- **Plot-and-lane work (`plots`)** has `plots.liveGeometry.torndownBeyond` reopened, now
  unconditionally: `environment`'s `liveBay` tier is destroyed and rebuilt with the bay. The
  lane tier does not reopen it. The rule's subject is `plots`'.
- **Representation work (`architect/06`)** should note `noModelRule` alongside `vfx/02` `RR-V2`'s
  `effect-host` request: Art introduces zero `Model` instances, which is the condition
  `budgets.streaming.ModelStreamingMode` `Default` was chosen on.

## Acceptance criteria

1. `detailBudget.envelope.clientHeadroomInstances` equals
   `budgets.instanceCeilings.clientStreamedInstanceCeiling − 9 × (max(depths.areas[].patchCount) + 6)`:
   `6,000 − 5,814 = 186`.
2. `9 × environment.allowance.residentInstancesPerLane + environment.allowance.sharedMaxStreamedConcurrently + effects.budget.clientInstancesAdded ≤ 186`
   evaluates **true** at merged values (`144 + 6 + 11 = 161`, 25 spare), and still evaluates true
   under the conservative substitution of `environment.allowance.sharedPlaceInstances`
   (`144 + 20 + 11 = 175`, 11 spare).
3. Every path in `detailBudget.citeAs.readByField[].path` resolves in the merged manifest, and
   `detailBudget` contains zero per-subject-class allocation rows: no `perLane.rows`, no
   `shared.rows`, and no field naming a `P1`–`P9` class with an instance count.
4. `(9 × (645 + 16) + 6 + 11) / f ≤ budgets.renderCeilings.drawCalls` holds at
   `f = detailBudget.drawCalls.minimumBatchingFactorAtMergedTotals`
   (`5,966 / 5.966 = 1,000.0`) and fails at `f = 5.9` (`5,966 / 5.9 = 1,011.2 > 1,000`).

## Flagged to the developer

**Art's world-geometry envelope is 186 instances across nine loaded lanes, it is now solvent at
161, and the spare is 25.** That is arithmetic over approved keys, not a preference, and it is
solvent only because two domains each gave something up. The two live decisions left: **(a)**
whether the 24 released reserved instances are spent on the litter mat and a cross-wall or held
as cushion — Environment's, with the per-lane division stated above; **(b)** whether
`budgets.instanceCeilings.clientStreamedInstanceCeiling` is ever *measured*, since at its
test-range top of 10,000 the envelope becomes 4,186 and every one of these trades is unnecessary.
**My recommendation is to take the reading before spending the 24**, because it costs one
render-stats session and could make the whole allocation moot. Nobody owns taking it (gap G4),
which is why this is flagged rather than decided.

## Not decided here

**How many parts any subject class gets** — `environment` for world dressing and `effects` for
cues; struck on `RR-1` and read by field. Whether the released 24 is spent or held —
`environment`. Every colour, material and surface rule — sheet `01`, which holds `styleGuide`.
Every size, proportion, height and ornament count — sheet `02`, which holds `formLanguage`. How
many patches an area holds, how long a bay is and how many chunks it takes — `depths` and
`layout`, read by field. What a teardown rule with a subject looks like — `plots`. Every ceiling
this key divides — `budgets`; I set none of them and mark all of them `[playtest unknown]`.
Whether `budgets` renames 5,814 and 5,805 to say which is instances and which is parts, and
whether the round-2 floor reconciles at 5.966 — `tech/performance`. Which savings performance may
never take — `tech/performance/03`, cited. **Whether a device is ever measured, and by whom** —
unowned in both contracts, named here as gap G4 and not claimed.
