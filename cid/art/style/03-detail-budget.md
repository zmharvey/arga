# 03 — Detail budget

**Domain:** Style Guide · **Category:** Art & Visuals · **Wave:** 6

## Decision

**The binding ceiling on everything Art adds to the world is
`budgets.instanceCeilings.clientStreamedInstanceCeiling`, not the server one, and it leaves
exactly 186 instances across nine loaded lanes.** This key sets that envelope and the rules
inside it; **it allocates nothing to a subject class** — `environment` and `effects` do that, and
their totals are read by field. Triangles do not bind and no art part may be a `Model`. **Below
`batchingFactor` 5.805 no art budget exists at any size**, which is a finding against
`depths.areas[].patchCount`, not an art decision and not an optimisation request.

## Why

**This is a derivation, not an allocation. Every input is a field reference and every one of them
is `[playtest unknown]`.** If a figure below is wrong, the fix lands on the input.

**Struck on verification `RR-1`: this key no longer carries per-subject-class rows.** A first
draft allocated 19 per-lane and 8 shared instances across named `P1`–`P9` classes. That is
Environment's geometry, against my own node's `does_not_own: any individual asset`, and it was
arbitrated in Environment's favour at **18 + 24**, whose rows have named consumers that sum and
are spent. **The envelope, the arithmetic and the rules stay here; the parts go there.**

**Instances and parts are different quantities and `budgets` is inconsistent underneath both of
us.** A lane is `patchCount + 6` = **646 instances** (`laneInstanceFormula`) and `patchCount + 5`
= **645 parts** (`lanePartFormula`) at `max(depths.areas[].patchCount)` 640. So
`clientStreamedInstancesWorstCase` **5,814 is instances** (9 × 646) and the nine-lane draw-call
figure **5,805 is parts** (9 × 645). Every line below names which one it means. **Instance
ceilings take 646; draw calls take 645.** A sheet that uses one for the other is out by nine.

**The server arithmetic my lead established, carried rather than redone.**
`budgets.instanceCeilings.serverWorldInstanceCeiling` 12,000 ÷ `runtime.maxPlayers` 16 = **750**
instances per player; minus a lane's 646 = **104** per lane, if nothing at all is shared.

**The client arithmetic it omitted, and it binds three times harder.**
`clientStreamedInstanceCeiling` is **6,000** against a worst case of **5,814 instances** — nine
lanes inside a 512-stud `StreamingTargetRadius` at `plots.pitchStuds` 122, every one at the
deepest merged bay. That leaves **186 instances total across nine lanes**, not per lane. With `E`
per-lane and `S` shared streamed instances the constraint is `9 × (646 + E) + S ≤ 6,000`, i.e.
**`9E + S ≤ 186`.** `[cid: decided]` on which ceiling binds; the ceilings themselves are
`budgets`'.

**At the arbitrated allocation the envelope is spent to the last instance, and then over-spent.**
`environment`'s 18 + 24 is `9 × 18 + 24 = ` **186** exactly — 100% of the headroom, zero left.
`effects` needs a further **17 to 35**, landing the merged total at **6,017 to 6,035 against
6,000**. **The client instance ceiling is over-subscribed by 17 to 35 instances today**, and no
rule in this key closes it, because there is nothing left to take from.

**What 186 buys, stated because the number is the finding.** A merged deepest bay is 640 patches
at 40 anchors per chunk = **16 chunks** of `layout.chunk`, 480 studs. At `environment`'s 18
per-lane instances that is **1.13 parts per chunk before any lane-persistent element is
subtracted**, and `layout` owes Environment **32 authored chunk looks** across 8 families × 16
variants. **32 looks cannot differ from one another at roughly one part each**, and
`theme/setting/05`'s twelve present classes cannot be realised as geometry at that rate. That is
not an argument for a bigger budget — the ceilings are what they are — it is a finding against
`depths.areas[].patchCount`, the same lever `tech/performance/01`'s own escalation names, and it
belongs to area-authoring-by-depth work.

**Triangles are not binding and I set no per-part triangle allowance.** At
`trianglesPerPatchBudget` 100, nine lanes of **patches** cost `9 × 645 × 100 = ` **580,500** of
`budgets.renderCeilings.triangles` 1,000,000, leaving 419,500 across at most 186 art parts —
about 2,255 each. No primitive approaches that, and every art part **is** a primitive, because
`uploadedMeshAssetsInWorldGeometry` is 0 and `N1` forbids `UnionAsync` and `SubtractAsync`. The
one triangle risk in the game is `Ball`, already owned by
`budgets.renderCeilings.trianglesPerPatchRule` with a stated fix (a shape swap, never an LOD).

**Both ends of the batching factor, which has value 50, test range 1–500 and status
`[playtest unknown]`.** Draw calls count **parts**: `9 × (645 + E) + S`.

| `f` | draw calls at the arbitrated `E = 18`, `S = 24` | verdict |
|---|---|---|
| 1.0 | 5,991 against 1,000 | infeasible at any `E`, including 0 |
| 5.805 | 5,805 ÷ 5.805 = 1,000.0 at `E = 0`, `S = 0` | the first factor at which *zero* art parts fit |
| **5.991** | 5,991 ÷ 5.991 = 1,000.0 | the first factor at which **the arbitrated allocation** fits |
| 6.75 | 888 | draw calls stop binding; the *server* bound of 104 per lane would apply |
| 50 (starting value) | 120 | draw calls are 12% of ceiling; **`clientStreamedInstanceCeiling` binds** |

**So the whole range collapses to three cases.** Below 5.805, no art budget exists at any size.
Between 5.805 and 5.991, the draw-call bound is tighter than the instance bound. At or above
5.991, `9E + S ≤ 186` binds and it does not loosen anywhere in the 1–500 range. **The one field
that moves 186 is `clientStreamedInstanceCeiling`**, whose test range tops out at 10,000, where
the headroom becomes 4,186. **Art's real envelope is 186 to 4,186 instances and the batching
factor barely touches it** — which is the opposite of what a reader of my lead's index would
expect, and is worth stating plainly.

**Nothing in this envelope is met by a saving `tech/performance/03` forbids**, and two of its
rows do not reach the classes people will assume they do.

```manifest
{
  "provides": "detailBudget",
  "status": "proposed",
  "value": {
    "isADerivation": "every figure here is arithmetic over fields owned elsewhere. A contradiction lands on the input, not on this key.",
    "allocatesNothing": "struck on verification RR-1. Per-subject-class instance counts live in environment (world dressing) and effects (cues). This key sets the envelope, the binding ceiling, the instances-versus-parts rule, the draw-call feasibility and the forbidden savings — and reads their totals by field.",
    "citeAs": {
      "canonical": [
        "detailBudget.bindingCeiling.which",
        "detailBudget.envelope.clientHeadroomInstances",
        "detailBudget.envelope.constraint",
        "detailBudget.instancesVersusParts",
        "detailBudget.drawCalls.minimumBatchingFactorForAnyBudget",
        "detailBudget.drawCalls.minimumBatchingFactorAtArbitratedTotals",
        "detailBudget.overSubscription",
        "detailBudget.noModelRule",
        "detailBudget.forbiddenSavings[] — keyed by .id",
        "detailBudget.whatNDoesNotReach",
        "detailBudget.instrument",
        "detailBudget.consequenceForPlots"
      ],
      "notInThisKey": "detailBudget.perLane.rows and detailBudget.shared.rows do not exist. Read environment.perLaneInstances, environment.sharedInstances and effects.totalInstances by field."
    },
    "instancesVersusParts": {
      "problem": "budgets is inconsistent underneath this key and environment's: 5814 is INSTANCES (9 x 646) and 5805 is PARTS (9 x 645). They differ by the spawn Attachment, one per lane.",
      "instanceFormula": "budgets.instanceCeilings.laneInstanceFormula — patchCount + 6 = 646 at merged max. Use for every instance ceiling.",
      "partFormula": "budgets.instanceCeilings.lanePartFormula — patchCount + 5 = 645 at merged max. Use for every draw-call and triangle figure.",
      "rule": "cite the one you mean. A sheet using one for the other is out by nine per nine lanes.",
      "routedTo": "tech/performance, as a naming defect in budgets rather than an arithmetic error in it"
    },
    "bindingCeiling": {
      "which": "budgets.instanceCeilings.clientStreamedInstanceCeiling",
      "why": "9 * (646 + E) + S <= 6000 leaves 186 instances across nine lanes. The server ceiling leaves 104 per lane and does not bind.",
      "serverArithmeticForComparison": "12000 / 16 = 750 instances per player; 750 - 646 = 104 per lane if nothing is shared",
      "serverCheckAtArbitratedTotals": "16 * (646 + 18) + 24 = 10648 <= 12000, headroom 1352"
    },
    "envelope": {
      "clientCeiling": 6000,
      "worstCaseInstances": 5814,
      "worstCaseIs": "INSTANCES — 9 lanes x (patchCount + 6) at max(depths.areas[].patchCount) 640, inside a 512-stud StreamingTargetRadius at plots.pitchStuds 122",
      "clientHeadroomInstances": 186,
      "constraint": "9 * environment.perLaneInstances + environment.sharedInstances + effects.totalInstances <= 186",
      "whoSpendsIt": "environment and effects. Not this key.",
      "rangeIfTheCeilingMoves": "at clientStreamedInstanceCeiling's test-range top of 10000 the headroom is 4186. That single field is the only thing that moves it; batchingFactor does not, above 5.991.",
      "chunkArithmetic": "a merged deepest bay is 640 patches / 40 anchors per chunk = 16 chunks of layout.chunk, 480 studs. At environment's 18 per-lane instances that is 1.13 parts per chunk before any lane-persistent element is subtracted, against the 32 authored chunk looks layout owes."
    },
    "overSubscription": {
      "status": "BREACHED at the arbitrated totals",
      "environmentSpends": "9 * 18 + 24 = 186 — 100% of the headroom",
      "effectsNeeds": "17 to 35 further instances",
      "mergedTotal": "6017 to 6035 against a 6000 ceiling",
      "overBy": [17, 35],
      "noRuleHereClosesIt": "there is nothing left to take from. The three live responses are: reduce depths.areas[].patchCount (a content decision, depths'); raise clientStreamedInstanceCeiling toward its 10000 test-range top (a measurement, not a choice); or cut environment's or effects' own totals (theirs).",
      "whatIsNotAnOption": "any saving in forbiddenSavings below, and any allocation change made inside this key, which allocates nothing."
    },
    "triangles": {
      "binding": false,
      "patchesAtNineLanes": 580500,
      "computedFrom": "9 * lanePartFormula(640) * trianglesPerPatchBudget = 9 * 645 * 100 — PARTS, not instances",
      "remainingForArt": 419500,
      "perArtPartAtTheFullEnvelope": 2255,
      "whyNotBinding": "every art part is a primitive. uploadedMeshAssetsInWorldGeometry is 0 and N1 forbids UnionAsync and SubtractAsync, so no art part can approach 2255 triangles.",
      "theOneRiskIsNotMine": "budgets.renderCeilings.trianglesPerPatchRule already owns Ball, with a shape swap as its stated fix.",
      "noPerClassAllowanceSetHere": "struck with RR-1. If a triangle allowance per subject class is ever needed, it belongs beside the instance count, in environment."
    },
    "drawCalls": {
      "formula": "(9 * (lanePartFormula(patchCount) + environment.perLaneInstances) + environment.sharedInstances) / batchingFactor <= budgets.renderCeilings.drawCalls",
      "countsParts": true,
      "atArbitratedTotals": "(9 * 663 + 24) / f = 5991 / f",
      "minimumBatchingFactorAtArbitratedTotals": 5.991,
      "minimumBatchingFactorForAnyBudget": 5.805,
      "belowThat": "no art budget exists at ANY size. 9 * 645 = 5805 draw calls against 1000 with E = 0, and no legal streaming radius fixes it because one lane's deepest bay is already 645 parts. The lever is depths.areas[].patchCount and it is a finding against depths.",
      "between5805and5991": "the draw-call bound is tighter than the 186-instance bound",
      "atOrAbove5991": "the instance bound binds and does not loosen anywhere in the 1-500 range",
      "whatMovesTheEnvelope": "not batchingFactor. Only budgets.instanceCeilings.clientStreamedInstanceCeiling."
    },
    "noModelRule": {
      "rule": "zero Model instances in world geometry. Art adds Parts only, and no Attachment, Folder or Model wrapper.",
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
    "whatNDoesNotReach": "N12 forbids writing .Size on a PATCH after creation and N11 forbids pooling a PATCH Instance. NEITHER reaches an art part that is resized inward with the slab on a bay advance and never destroyed. Whether any given dressing element is lane-persistent or in-bay is environment's; the exemption is stated here so a builder does not misapply N11 or N12 to a wall.",
    "instrument": {
      "what": "Developer Console render stats, and Developer Console > Memory > PlaceMemory.Instances",
      "where": "budgets.deviceFloor. Cited by field, never from the brief — RR-P1 strikes cid/gameplay/meta/01-the-area.md:39, which cites a floor existing only in two simulated test briefs.",
      "how": "one lane loaded, then nine, at max(depths.areas[].patchCount)",
      "ownerIsUnnamed": "no sheet in either contract owns taking this reading. tech/performance/01 names the same hole from its side (gap G4). Every figure in this key depends on it."
    },
    "consequenceForPlots": {
      "reopens": "plots.liveGeometry.torndownBeyond, conditionally",
      "condition": "if and only if environment places any instance INSIDE a bay rather than on the lane. environment owns that split; this key does not set it.",
      "why": "representation.plot states that a finished bay 'IS bare, holding ground and nothing else, so there is nothing to tear down... That changes the first time Art dresses a bay, and the rule acquires a subject then.'",
      "whatDoesNotReopenIt": "an element that sits on the lane outside the live bay and is resized rather than rebuilt on a bay advance.",
      "notResolvedHere": "the rule's new subject is plots' to state."
    },
    "scopeCheck": "no envelope figure, rule or exemption is reserved, stubbed or held open for procedural generation, rebirth, offline accrual, codes, daily rewards, leaderboards, trading, or seasons and events. 03-META.md priority 3; N9.",
    "everyCeilingIsPlaytestUnknown": "serverWorldInstanceCeiling, clientStreamedInstanceCeiling, drawCalls, triangles, trianglesPerPatchBudget and batchingFactor all carry status [playtest unknown] in budgets with their own test ranges. A domain that designs against them as firm will be redone."
  }
}
```

## Consequences for other work

- **Environment work** owns the per-subject-class allocation outright and this key allocates
  nothing against it. What it inherits is the envelope — `9E + S ≤ 186` — the instances-versus-
  parts rule, and the fact that its arbitrated 18 + 24 spends **exactly 186**, leaving zero for
  `effects`. It also inherits `noModelRule` and the `N11`/`N12` exemption for a lane-persistent
  element that is resized rather than rebuilt.
- **VFX work (`effects`)** inherits the breach directly: its 17–35 instances have **no room**
  under the arbitrated totals, and the merged claim lands at 6,017–6,035 against 6,000. This is
  the number that must move before `effects` is buildable, and it is not movable inside this key.
- **Area-authoring-by-depth work (`depths`)** receives the finding, not a request: at
  `max(depths.areas[].patchCount)` 640, Environment gets about 1.13 parts per chunk of
  `layout.chunk`, and 32 authored chunk looks cannot differ at that rate. **The lever is
  `patchCount`.** This restates `tech/performance/01`'s escalation from the art side and adds the
  client-ceiling half it did not carry.
- **Tech & Data — Performance** gets two things. `clientStreamedInstanceCeiling` binds before
  `serverWorldInstanceCeiling` for every non-patch instance in the game, and `batchingFactor` —
  named as the single largest uncertainty — is **not** the field that sizes Art; above 5.991 it
  stops mattering. And `budgets` names 5,814 and 5,805 without saying that the first is instances
  and the second is parts, which is a naming defect two Art domains each hit.
- **Plot-and-lane work (`plots`)** has `plots.liveGeometry.torndownBeyond` reopened **only if**
  `environment` puts dressing inside a bay. The condition is stated here; the split and the
  resulting rule are not mine.
- **Representation work (`architect/06`)** should note `noModelRule`: Art introduces zero `Model`
  instances, which is the condition `budgets.streaming.ModelStreamingMode` `Default` was chosen on.
- **Whoever eventually owns the instrument (gap G4)** inherits a key whose every figure is a
  function of a reading nobody has taken.

## Acceptance criteria

1. `detailBudget.envelope.clientHeadroomInstances` equals
   `budgets.instanceCeilings.clientStreamedInstanceCeiling − 9 × (max(depths.areas[].patchCount) + 6)`:
   `6,000 − 5,814 = 186`.
2. `9 × environment.perLaneInstances + environment.sharedInstances + effects.totalInstances ≤ 186`
   evaluates **false** at merged values, and `detailBudget.overSubscription.overBy` equals the
   shortfall: `9 × 18 + 24 = 186`, plus `effects` 17–35, is 17–35 over.
3. `detailBudget` contains **zero** per-subject-class allocation rows: no `perLane.rows`, no
   `shared.rows`, and no field naming `P1`–`P9` with an instance count.
4. `(9 × (645 + 18) + 24) / f ≤ budgets.renderCeilings.drawCalls` holds at
   `f = detailBudget.drawCalls.minimumBatchingFactorAtArbitratedTotals` (5,991 / 5.991 = 1,000.0)
   and fails at `f = 5.9` (5,991 / 5.9 = 1,015.4 > 1,000).

## Flagged to the developer

**Art's whole world-geometry envelope is 186 instances across nine loaded lanes, and it is
already over-subscribed by 17 to 35 before a single ornament is cut.** That is arithmetic over
approved keys, not a preference. The three live responses, in the order they cost: **(a)** reduce
`depths.areas[].patchCount` — a content decision, `depths`'; **(b)** raise
`budgets.instanceCeilings.clientStreamedInstanceCeiling` toward its 10,000 test-range top, which
takes the envelope to 4,186 and is a measurement rather than a choice; **(c)** accept that a bay
is bare ground with a wall around it, which is legal under every approved sheet and is what ships
today. **My recommendation is (b) first, because it costs one render-stats reading and no design
change**, and (a) only if the reading comes back low. Nobody owns taking that reading (gap G4),
which is why this is flagged rather than decided.

## Not decided here

**How many parts any subject class gets** — `environment` for world dressing and `effects` for
cues; struck from this key on `RR-1` and read by field. Every colour, material and surface rule —
sheet `01`, which holds `styleGuide`. Every size, proportion, height and ornament count — sheet
`02`, which holds `formLanguage`. How many patches an area holds, how long a bay is and how many
chunks it takes — `depths` and `layout`, read by field. What a teardown rule with a subject looks
like, and whether one is needed — `plots`. Every ceiling this key divides — `budgets`; I set none
of them and mark all of them `[playtest unknown]`. Whether `budgets` renames 5,814 and 5,805 to
say which is instances and which is parts — `tech/performance`. Which savings performance may
never take — `tech/performance/03`, cited. **Whether a device is ever measured, and by whom** —
unowned in both contracts, named here as gap G4 and not claimed.
