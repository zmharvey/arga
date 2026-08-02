# 03 — Detail budget

**Domain:** Style Guide · **Category:** Art & Visuals · **Wave:** 6

## Decision

**Art gets 19 instances per lane and 8 shared, at the merged 640-patch bay, and the binding
ceiling is `clientStreamedInstanceCeiling` rather than the server one.** Triangles do not bind
and no art part may be a `Model`. **At `batchingFactor` below 5.805 no art budget exists at any
size** — that is a finding against `depths.areas[].patchCount`, not an art decision and not an
optimisation request.

## Why

**This is a derivation, not an allocation. Every input is a field reference and every one of them
is `[playtest unknown]`.** If a figure below is wrong, the fix lands on the input.

**The server arithmetic my lead established, carried rather than redone.**
`budgets.instanceCeilings.serverWorldInstanceCeiling` 12,000 ÷ `runtime.maxPlayers` 16 = **750**
instances per player; a lane is `patchCount + 6` = **646** at `max(depths.areas[].patchCount)`
640; `750 − 646 = ` **104** for the whole of Art, if nothing at all is shared.

**The client arithmetic it omitted, and it binds three times harder.**
`budgets.instanceCeilings.clientStreamedInstanceCeiling` is **6,000** against a
`clientStreamedInstancesWorstCase` of **5,814** — nine lanes inside a 512-stud
`StreamingTargetRadius` at `plots.pitchStuds` 122, every one at the deepest merged bay. That
leaves **186 instances total across nine lanes**, not per lane. With `E` per-lane art instances
and `S` shared streamed instances the constraint is `9 × (646 + E) + S ≤ 6,000`. At **E = 19,
S = 8**: `9 × 665 + 8 = 5,993`, seven instances of headroom. The same allocation costs the
server `16 × 665 + 9 = 10,649` against 12,000, so **the server ceiling is not the one to design
against.** `[cid: decided]` on which ceiling binds; the ceilings themselves are `budgets`'.

**What 19 buys, stated because the number is the finding.** A merged deepest bay is 640 patches
at 40 anchors per chunk = **16 chunks** of `layout.chunk`, 480 studs. Twelve of the nineteen sit
on the lane and span its whole built length; **seven live inside the bay, which is 0.44 parts per
chunk.** `layout` owes Environment 32 authored chunk looks and 8 families × 16 variants of
shuffling, and **32 looks cannot differ from one another at 0.44 parts each.**
`theme/setting/05`'s twelve present classes cannot be realised as geometry at that rate either.
That is not an argument for a bigger budget — the ceilings are what they are — it is a finding
against `depths.areas[].patchCount`, which is the same lever `tech/performance/01`'s own
escalation names, and it belongs to area-authoring-by-depth work.

**Triangles are not binding and I set no per-part triangle allowance.** At
`trianglesPerPatchBudget` 100, nine lanes of patches cost `9 × 645 × 100 = ` **580,500** of
`budgets.renderCeilings.triangles` 1,000,000, leaving 419,500 across 179 art parts — 2,343 each.
No primitive approaches that, and every art part **is** a primitive, because
`uploadedMeshAssetsInWorldGeometry` is 0 and `N1` forbids `UnionAsync` and `SubtractAsync`. The
one triangle risk in the game is `Ball`, and it is already owned by
`budgets.renderCeilings.trianglesPerPatchRule` with a stated fix (a shape swap, never an LOD).

**Both ends of the batching factor, which has value 50, test range 1–500 and status
`[playtest unknown]`.** A lane is `patchCount + 5` = **645** parts, plus `E`:

| `f` | draw calls at `E = 19`, nine lanes + 8 shared | verdict |
|---|---|---|
| 1.0 | 5,984 against 1,000 | infeasible at any `E`, including 0 |
| 5.805 | 5,805 ÷ 5.805 = 1,000.0 at `E = 0` | the first factor at which *zero* art parts fit |
| **5.984** | 5,984 ÷ 5.984 = 1,000.0 | the first factor at which **this budget** fits |
| 6.75 | 883 | draw calls stop binding; the *server* bound of 104 would apply |
| 50 (starting value) | 120 | draw calls are 12% of ceiling; **`clientStreamedInstanceCeiling` binds, at 19** |

**So the whole range collapses to three cases.** Below 5.805, no art budget exists at any size.
Between 5.805 and 5.984, `E = ⌊111.1f − 645⌋`, i.e. between 0 and 18. At or above 5.984, `E = 19`
and it stays 19 all the way to 500, because the client instance ceiling took over. **The one
field that moves 19 is `budgets.instanceCeilings.clientStreamedInstanceCeiling`**, whose test
range tops out at 10,000, at which `E = 464`. **Art's real allowance is therefore 19 to 464 and
the batching factor barely touches it** — which is the opposite of what a reader of my lead's
index would expect, and is worth stating plainly.

**Nothing in this budget is met by a saving `tech/performance/03` forbids.**

| forbidden | what it would have bought me | held to |
|---|---|---|
| `N1` | an LOD or imposter on a wall run at 122 studs, halving the far cost | 19 stands at every distance; `formLanguage.featureSize.far` is met by authored size, not by a distance rule |
| `N2` | merging a chunk's dressing into one part | every art part is one part; a chunk's dressing is not combined |
| `N11` | pooling the 7 in-bay parts across bays | a bay teardown is one `Destroy` on the slab; nothing is re-parented |
| `N12` | collapsing tier heights to reclaim triangles | no line here is paid for by `tiers`; triangles do not bind |
| `N17` | one uploaded mesh replacing ten parts | zero uploaded assets, which `styleGuide.materials` already closes at the palette layer |
| — | a `Model` wrapper to simplify streaming | forbidden here: `budgets.streaming.ModelStreamingMode` `Default` is chosen on the reasoning that *world geometry contains no `Model`*, and one would silently change what streams |

**`N12` and `N11` do not reach the twelve lane-persistent parts, and a builder needs telling.**
`N12` forbids writing `.Size` on a **patch** after creation; the wall, parapet, end walls and
paving are **resized inward with the slab on a bay advance**, which is why they cost 12 instances
once rather than 12 per bay. `N11` forbids pooling a **patch** Instance; these are never
destroyed, so nothing is pooled.

**The device floor is cited by field, never from the brief.** `budgets.deviceFloor`, per `RR-P1`,
which strikes `cid/gameplay/meta/01-the-area.md:39`'s citation of a floor that exists only in two
simulated test briefs.

```manifest
{
  "provides": "detailBudget",
  "status": "proposed",
  "value": {
    "isADerivation": "every figure here is arithmetic over fields owned elsewhere. A contradiction lands on the input, not on this key.",
    "inputs": {
      "serverWorldInstanceCeiling": "budgets.instanceCeilings.serverWorldInstanceCeiling (12000) [playtest unknown], test range [10500, 12800]",
      "clientStreamedInstanceCeiling": "budgets.instanceCeilings.clientStreamedInstanceCeiling (6000) [playtest unknown], test range [5900, 10000]",
      "clientStreamedInstancesWorstCase": "budgets.instanceCeilings.clientStreamedInstancesWorstCase (5814) — nine lanes inside a 512-stud StreamingTargetRadius at plots.pitchStuds 122",
      "maxPlayers": "runtime.maxPlayers (16). NOT 20.",
      "laneInstanceFormula": "budgets.instanceCeilings.laneInstanceFormula — patchCount + 6",
      "lanePartFormula": "budgets.instanceCeilings.lanePartFormula — patchCount + 5",
      "patchCount": "max(depths.areas[].patchCount) (640)",
      "drawCalls": "budgets.renderCeilings.drawCalls (1000) [playtest unknown]",
      "triangles": "budgets.renderCeilings.triangles (1000000) [playtest unknown]",
      "trianglesPerPatchBudget": "budgets.renderCeilings.trianglesPerPatchBudget (100) [playtest unknown]",
      "batchingFactor": "budgets.renderCeilings.batchingFactor — value 50, test range [1, 500], [playtest unknown]",
      "deviceFloor": "budgets.deviceFloor. Cited by field, never from the brief — RR-P1.",
      "chunksPerMergedDeepestBay": "640 / 40 anchors per chunk = 16 chunks of layout.chunk, 480 studs"
    },
    "bindingCeiling": {
      "which": "clientStreamedInstanceCeiling",
      "why": "9 * (646 + E) + S <= 6000 leaves 186 instances across nine lanes. The server ceiling leaves 104 per lane and does not bind.",
      "serverArithmeticForComparison": "12000 / 16 = 750; 750 - 646 = 104 per lane if nothing is shared",
      "clientArithmetic": "9 * (646 + 19) + 8 = 5993 <= 6000, headroom 7",
      "serverCheckOfTheSameAllocation": "16 * (646 + 19) + 8 + 1 = 10649 <= 12000, headroom 1351. The +1 is the shipped lobby baseplate, which is not Art's."
    },
    "perLane": {
      "total": 19,
      "multipliedBy": "runtime.maxPlayers on the server, and by 9 loaded lanes on a client",
      "rows": [
        { "subjectClass": "P1 retaining wall, uphill long side", "instances": 4, "lifetime": "lane-persistent, resized with the slab on a bay advance" },
        { "subjectClass": "P1 low parapet, open long side", "instances": 4, "lifetime": "lane-persistent" },
        { "subjectClass": "P1 end walls, inward and outward, one opening each", "instances": 2, "lifetime": "lane-persistent" },
        { "subjectClass": "P1 paving and kerbs", "instances": 2, "lifetime": "lane-persistent" },
        { "subjectClass": "P1 piers and vaulting", "instances": 4, "lifetime": "in-bay, destroyed with the bay", "conditional": "depths 2-3 only; 0 at depths 1 and 4, where the lane total is 15" },
        { "subjectClass": "P2 channel and basin run", "instances": 2, "lifetime": "in-bay" },
        { "subjectClass": "P3 fixed fittings and gearwork", "instances": 1, "lifetime": "in-bay" },
        { "subjectClass": "P4 loose worked objects", "instances": 0, "why": "representation.find — a Find has no Instance at any point in its life" },
        { "subjectClass": "P6 litter layer", "instances": 0, "why": "realised as Color3 variance inside styleGuide's stone bands on parts already counted; no geometry" },
        { "subjectClass": "P7 weathering", "instances": 0, "why": "same, and theme/lore/01 L4 requires it identical at every depth" },
        { "subjectClass": "ornament (formLanguage.ornament)", "instances": 0, "why": "an ornamental element is a Part and is counted inside its parent class's row above. Ornament is not free and has no row of its own." },
        { "subjectClass": "effects (Art - VFX)", "instances": 0, "why": "not in this budget. A per-clear emitter at 8 clears/second x 16 players is a request against this key, and gap G8 is unruled." }
      ],
      "lanePersistent": 12,
      "inBay": 7,
      "partsPerChunkInsideABay": 0.44,
      "partsPerChunkIsTheFinding": "layout owes Environment 32 authored chunk looks across 8 families x 16 variants. 32 looks cannot differ from one another at 0.44 parts each, and theme/setting/05's twelve present classes cannot be realised as geometry at that rate. The lever is depths.areas[].patchCount. This is NOT an optimisation request and NOT an art decision."
    },
    "shared": {
      "total": 8,
      "countedOnce": true,
      "rows": [
        { "subjectClass": "P9 broadleaf canopy beyond the built edge", "instances": 8, "note": "one backdrop enclosure around the whole plot row, not per lane. Any modelled canopy motion — theme/setting/05's one motion budget — must fit inside these 8, or it is a request against this key." },
        { "subjectClass": "P8 open sky", "instances": 0, "note": "zero Sky instances — styleGuide.roles.sky" },
        { "subjectClass": "lobby baseplate", "instances": 0, "note": "1 shipped instance in game/default.project.json, outside Art's allowance and outside the build's reach" }
      ]
    },
    "triangles": {
      "binding": false,
      "patchesAtNineLanes": 580500,
      "remainingForArt": 419500,
      "artParts": 179,
      "perArtPartIfSpentEvenly": 2343,
      "whyNotBinding": "every art part is a primitive. uploadedMeshAssetsInWorldGeometry is 0 and N1 forbids UnionAsync and SubtractAsync, so no art part can approach 2343 triangles.",
      "theOneRiskIsNotMine": "budgets.renderCeilings.trianglesPerPatchRule already owns Ball, with a shape swap as its stated fix."
    },
    "drawCalls": {
      "formula": "(9 * (lanePartFormula(patchCount) + E) + S) / batchingFactor <= budgets.renderCeilings.drawCalls",
      "atThisBudget": "(9 * 664 + 8) / f = 5984 / f",
      "minimumBatchingFactorForThisBudget": 5.984,
      "minimumBatchingFactorForAnyBudget": 5.805,
      "belowThat": "no art budget exists at ANY size. 9 * 645 = 5805 draw calls against 1000 with E = 0, and no legal streaming radius fixes it because one lane's deepest bay is already 645 parts. The lever is depths.areas[].patchCount and it is a finding against depths.",
      "between5805and5984": "E = floor(111.1 * f - 645), i.e. 0 to 18",
      "atOrAbove5984": "E = 19, set by clientStreamedInstanceCeiling, and it does not rise again anywhere in the 1-500 range",
      "whatMovesIt": "not batchingFactor. The single field that moves 19 is budgets.instanceCeilings.clientStreamedInstanceCeiling; at its test-range top of 10000, E = 464.",
      "allowanceRange": [19, 464]
    },
    "noModelRule": {
      "rule": "zero Model instances in world geometry. Art adds Parts only, and no Attachment, Folder or Model wrapper.",
      "protects": "budgets.streaming.ModelStreamingMode 'Default', chosen on the reasoning that world geometry contains no Model; a Model wrapper would silently change what streams.",
      "check": "grep -rn 'Instance.new(\"Model\")' game/src/server returns nothing"
    },
    "forbiddenSavings": [
      { "id": "N1", "wouldHaveBought": "an LOD or imposter on a wall run at 122 studs", "heldTo": "19 stands at every distance; formLanguage.featureSize.far is met by authored size" },
      { "id": "N2", "wouldHaveBought": "merging a chunk's dressing into one part", "heldTo": "every art part is one part" },
      { "id": "N11", "wouldHaveBought": "pooling the 7 in-bay parts across bays", "heldTo": "a bay teardown is one Destroy on the slab; nothing is re-parented" },
      { "id": "N12", "wouldHaveBought": "collapsing tier heights to reclaim triangles", "heldTo": "triangles do not bind; nothing here is paid for by tiers" },
      { "id": "N17", "wouldHaveBought": "one uploaded mesh replacing ten parts", "heldTo": "zero uploaded assets; styleGuide.materials closes this at the palette layer" }
    ],
    "whatNDoesNotReach": "N12 forbids writing .Size on a PATCH after creation and N11 forbids pooling a PATCH Instance. Neither reaches the 12 lane-persistent art parts, which are resized inward with the slab on a bay advance and are never destroyed. That is why they cost 12 once rather than 12 per bay.",
    "instrument": {
      "what": "Developer Console render stats and Developer Console > Memory > PlaceMemory.Instances",
      "where": "budgets.deviceFloor. Cited by field, never from the brief — RR-P1.",
      "how": "one lane loaded, then nine, at max(depths.areas[].patchCount)",
      "ownerIsUnnamed": "no sheet in either contract owns taking this reading. tech/performance/01 names the same hole from its side (gap G4). Every figure in this key depends on it."
    },
    "consequenceForPlots": {
      "reopens": "plots.liveGeometry.torndownBeyond",
      "why": "representation.plot states that a finished bay 'IS bare, holding ground and nothing else, so there is nothing to tear down... That changes the first time Art dresses a bay, and the rule acquires a subject then.' Seven per-lane instances live inside a bay under this budget: piers and vaulting (4), channel and basin (2), fittings (1).",
      "whatIsNotReopened": "the 12 lane-persistent parts sit on the lane outside the live bay and are resized, not rebuilt. They are not a teardown subject.",
      "notResolvedHere": "the rule's new subject is plots' to state."
    },
    "scopeCheck": "no per-lane or shared row is reserved, stubbed or held open for procedural generation, rebirth, offline accrual, codes, daily rewards, leaderboards, trading, or seasons and events. 03-META.md priority 3; N9.",
    "everyCeilingIsPlaytestUnknown": "serverWorldInstanceCeiling, clientStreamedInstanceCeiling, drawCalls, triangles, trianglesPerPatchBudget and batchingFactor all carry status [playtest unknown] in budgets with their own test ranges. A domain that designs against them as firm will be redone."
  }
}
```

## Consequences for other work

- **Area-authoring-by-depth work (`depths`)** receives the finding, not a request: at
  `max(depths.areas[].patchCount)` 640 the whole of Art gets 0.44 parts per chunk inside a bay,
  and 32 authored chunk looks cannot differ at that rate. **The lever is `patchCount`.** This
  restates `tech/performance/01`'s escalation from the art side and adds the client-ceiling half
  it did not carry.
- **Tech & Data — Performance** should note that `clientStreamedInstanceCeiling` binds before
  `serverWorldInstanceCeiling` for every non-patch instance in the game, and that
  `batchingFactor` — named as the single largest uncertainty — is **not** the field that sizes
  Art. Above 5.984 it stops mattering entirely.
- **Plot-and-lane work (`plots`)** has `plots.liveGeometry.torndownBeyond` reopened by seven
  in-bay instances, exactly as `representation.plot` predicted. Twelve lane-persistent parts do
  **not** reopen it. The new subject is `plots`' to state, not mine.
- **Environment work** gets 19 per lane and 8 shared and cannot spend a twentieth. `P6` litter and
  `P7` weathering have **zero** instances by design — both are `Color3` variance on parts already
  counted — and `P4` is zero because a Find has no Instance. **The canopy is 8 parts for the
  whole place**, which is what a backdrop is, and any modelled motion in it lives inside those 8.
- **VFX work** has **no allowance in this key.** A per-clear `ParticleEmitter` at 8 clears/second
  × 16 players is a budget request against `detailBudget`, and gap G8 (whether a
  `ParticleEmitter` may exist at all) is unruled.
- **Representation work (`architect/06`)** should note `noModelRule`: Art introduces zero `Model`
  instances, which is the condition `budgets.streaming.ModelStreamingMode` `Default` was chosen
  on.
- **Whoever eventually owns the instrument (gap G4)** inherits a key whose every figure is a
  function of a reading nobody has taken.

## Acceptance criteria

1. `9 × (max(depths.areas[].patchCount) + 6 + detailBudget.perLane.total) + detailBudget.shared.total`
   `≤ budgets.instanceCeilings.clientStreamedInstanceCeiling` evaluates true at merged values:
   `9 × 665 + 8 = 5,993 ≤ 6,000`.
2. `runtime.maxPlayers × (max(depths.areas[].patchCount) + 6 + detailBudget.perLane.total) + detailBudget.shared.total`
   `≤ budgets.instanceCeilings.serverWorldInstanceCeiling`: `16 × 665 + 8 = 10,648 ≤ 12,000`.
3. `detailBudget.perLane.rows[].instances` sums to `19`, `detailBudget.shared.rows[].instances`
   sums to `8`, and `detailBudget.perLane.lanePersistent + detailBudget.perLane.inBay = 19`.
4. `(9 × (645 + 19) + 8) / f ≤ budgets.renderCeilings.drawCalls` holds at
   `f = detailBudget.drawCalls.minimumBatchingFactorForThisBudget` (5,984 / 5.984 = 1,000.0) and
   fails at `f = 5.9` (5,984 / 5.9 = 1,014.2 > 1,000).

## Flagged to the developer

**Art's whole world-geometry allowance is 19 instances per lane, and it does not fund the place
the fiction describes.** That is arithmetic over approved keys, not a preference. The three live
responses, in the order they cost: **(a)** reduce `depths.areas[].patchCount` — a content
decision, `depths`'; **(b)** raise `budgets.instanceCeilings.clientStreamedInstanceCeiling`
toward its 10,000 test-range top, which takes the allowance to 464 and is a measurement, not a
choice; **(c)** accept that a bay is bare ground with a wall around it, which is legal under
every approved sheet and is what ships today. **My recommendation is (b) first, because it costs
one render-stats reading and no design change**, and (a) only if the reading comes back low.
Nobody owns taking that reading (gap G4), which is why this is flagged rather than decided.

## Not decided here

Every colour, material and surface rule — sheet `01`, which holds `styleGuide`. Every size,
proportion, height and ornament count — sheet `02`, which holds `formLanguage`. How many patches
an area holds, how long a bay is and how many chunks it takes — `depths` and `layout`, read by
field. What a teardown rule with a subject looks like — `plots`. Every ceiling this key divides —
`budgets`; I set none of them and mark all of them `[playtest unknown]`. Which savings performance
may never take — `tech/performance/03`, cited. What a clear or a reveal costs in instances and
emitters, and whether a `ParticleEmitter` may exist at all — VFX's `effects`. Which of the 19 goes
to which wall, run or pier, and what each looks like — Environment's `environment`. **Whether a
device is ever measured, and by whom** — unowned in both contracts, named here as gap G4 and not
claimed.
