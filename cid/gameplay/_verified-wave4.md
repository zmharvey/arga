# Gameplay — verification, wave 4 (stage 4: Balance & Tuning)

# Round 1

**Status: FAIL**

Stage 4 does not release. The wave's central claim is **correct** — the shipped ladder really is
insolvent, and the replacement really does close it — but sixteen defects sit on top of it, and
nine of them are inside revision requests that other agents are about to apply. A wrong revision
request is the worst artefact this pipeline can produce, because it gets executed.

**Scope read in full:** `balance/_lead`, `balance/01`–`05`; `meta/01`, `03`, `04`, `05`, `06`,
`07`; `systems/01`, `04`, `06`; `monetization/01`, `03`; `onboarding/01`, `02`; `core-loop/01`,
`05`; `mechanics/01`, `04`; `art/objects/01`; `architect/sheets/01-runtime`, `architect/schema.mjs`;
`cid/_contract.md`, `cid/_digest.md`, `cid/_state.md` (R-1..R-4), `_verified-wave3.md`;
`docs/cid-workflow.json` (Gameplay Verification `checks`, Build Capability Registry).

**Everything numeric below I recomputed by hand from the merged manifests.** Where a sheet's
figure and mine disagree, mine is shown with its derivation.

---

## What I recomputed and found correct

Stated first, because the load-bearing half of the wave survives the attack.

**The insolvency claim is true, digit for digit.** `Σ floor(costBase × costGrowth^l)` over the
shipped ladder: `value` 25@1.6×10 = **4,536**; `radius` 40@1.75×8 = **4,635**; `speed` 60@1.8×6 =
**2,473**; total **11,644** — exact. Areas 1–7 at the merged `depths` (3,198 patches), EV 3.68,
value multiplier rising to its ×3.5 cap during area 4, yields **≈38,300**, which reproduces
`meta/04`'s "about 38,500" and its ×3.3 shortfall. `01-upgrade-ladder.md` fails `meta/04`'s
requirement and sheet `03` is right to replace it.

**Sheet `04`'s demolition of `depths.areas[2].maxRadiusProduct` = 1.27 is right, and I found the
same number by a different route.** Row 2's lap floor gives `τ_max = 2 × 25,200 / 75 = 672`.
Against the free player's arrival τ of 337.92 that is a bound of **1.99**; 1.27 requires an
arrival τ of **528.5 = 3.00× base**, which only a `value` pass can produce and
`monetization/01` withdrew both. Confirmed independently: `monetization/01` line 32 already
states "**1.99 with no value pass owned and 1.27 with both**", so the merged contract has carried
two disjoint answers for one quantity since wave 3. Sheet `04` is correct — see RR-16 on its
provenance tag.

**Every derived table in sheets `03`, `04` and `05` reproduces.** τ at all nine rows from the
arrival levels; footprint = chunks × 3,600; patchCount = chunks × `layout.patchesPerChunkByDepth`
(35/37/39/40); `footprint(k) = 165·τ(k)/2` floored to the chunk grid at all eight ordinals; laps
`footprint × 2 / τ`; the nine under-buy laps (worst 180.0 s at area 2, 199.8 s at the bay); the
nine realised laps under `footprint × 2 / sqrt(τ_arr · τ_exit)`; all nine joint-lap-bound rows and
their margins; the eight income figures against the value ladder plus Terrace; the cumulative
column to 75,033 and 113,880. The `tierMix` expected values (5.16 / 5.85 / 6.66 / 7.45), the 722
at area 1, and all four weight vectors summing to 100 and strictly descending. `Span`'s 1.82
upper bound = `0.9 × 60 / (20.5 × 1.44)`. The 9.625-stud disc (2.83 vs 0.92 patches). The plots
bay table (120/150/210/300/450/570/780/900, sum 3,480) and 1,410 for the bay. The 42%-bought and
2.2-bay figures.

**The `clearTickRate` request is causally genuine.** `depths.invariants[10]` fails from ordinal 6
at 0.12 s (158.5/0.24 = 660 against 741 patches) and passes at 0.04 with margin; 0.05 fails at
the bay by 1% (1,863 against 1,880). With density owned by `layout` and the lap band closed at
75–200, the tick is the only free term. Balance is entitled to request it and routes it as a
request rather than setting it. See the ruling below on what it costs.

**The 9.625-stud spawn case is correctly closed.** `firstFindOrdinal` 1 sits at ≤ 3.5 studs,
inside both the 5.5 and the 9.625 disc, so `beats[firstClear]` and `beats[firstReveal]` both hold
and no `firstSession` revision is owed **for the disc**. The purchaser's real `firstSession`
problem is elsewhere and neither sheet saw it — RR-10.

---

## Check results

| # | check | result | evidence |
|---|---|---|---|
| 1 | every currency has at least one faucet and one sink | **PASS** | `economy` keeps `faucetCount` 1 / `sinkCount` 1; `02` line 119 "Economy work is untouched"; `03` adds 36 rungs to the same sink and no second currency appears in any of the four manifests. Searched all five sheets for a second balance, token or point: none. |
| 2 | every reward granted anywhere has a source system | **FAIL** | `tierMix` decides what a patch pays by depth and **no key reads it.** `economy.faucets[patch-clear].formula` reads `tiers[patch.tierIndex].value`; the thing that assigns `tierIndex` is `layout`'s anchor generation, and `meta/05`'s "Not decided here" routes tier weights back to `systems/01`. `02` line 113 declares `layout` "untouched". After this key, nothing states where the draw reads its weights. RR-12. |
| 3 | every mechanic maps to a verb the control scheme supports | **PASS** | The four sheets introduce no verb. `05`'s `firstPurchase` milestone rides `buy`, which `mechanics/02` owns and ruling R-1 ratified as a pressable; `04`'s `Span` is an ownership read with no input at all (`products.prompt.promptGamePassPurchaseCalls: 0` under R-4). Searched for any new press, hold, chord or aim: none. |
| 4 | no system requires an input the control scheme lacks | **PASS** | Same evidence. No balance sheet widens `input`'s closed five-verb / four-pressable surface, and none needs a `## Pushing back` for it because it consumes an approved overrule rather than making a new one. |
| 5 | no sheet contradicts a ruling in an approved earlier-stage sheet without `## Pushing back` | **FAIL** | **Zero `## Pushing back` sections exist in `balance/01`–`05` or `_lead.md`** (grepped `^## Pushing back`, no matches). Three clear contradictions of rulings, not values: `03` vs `meta/07`'s "each identical to area 8" and its `invariants[2]`; `04` vs `meta/04`'s "the residue routes to `monetization/03` `H4` … not to me", plus its rewrite of `depths.invariants[11]`; `05` vs `core-loop/04`'s "a bound session is three to seven complete laps". RR-13/14/15. **The check as written also fires on pure value revisions and should not — see "When the checklist is wrong".** |
| 6 | tuning coefficients belong to Balance and are set nowhere else | **FAIL** | The joint lap bound now lives in **three** keys with two sets of numbers: `products.headroom.H2.maxThroughputProductFactorByOrdinal` (2.18/1.99/2.14/2.17/2.10×4, untouched), `depths.maxTauMultiplier` (2.18/2.04/2.06/2.07/2.53/2.54/3.10/3.07, requested) and `axisBudget.jointLapBound.rows` (same nine, published). Balance created a third home instead of collapsing to one. RR-4. The earlier-sheet sweep is otherwise clean: `LAP_TARGET`/`ROUTE_SLACK`/`UNDERBUY_LEVELS` were correctly held open by `meta/04` and `core-loop/05` and land in `pacing`; `setBonus.rows[].factor` and `products.items[].factor` are key-shape values carrying `[playtest unknown]` and test ranges, which the check permits. |
| 7 | no priority-2 or priority-3 item is reserved for, stubbed, described or specced | **PASS** | `_lead.md` lines 128–130 name procgen, rebirth, offline accrual, codes, dailies, leaderboards, trading, seasons and events in order to exclude them — compliant. `05`'s "Return-hook work inherits the shape of the arc … **Nothing here builds a hook**" is the same compliant form. Searched all four sheets for a reserved field, a null placeholder or a "later" note on any excluded system: none. |
| 8 | the loop closes: the last step feeds the first | **PASS** | Clear → `economy` faucet → `upgrades` sink → higher τ and value → faster clearing, demonstrated numerically across nine rows in `03`'s ledger and in wall clock in `05`'s clock. The spend step stays alive for the whole specced game (42% of the ladder bought at 24/24) and dies only at ladder exhaustion 2.2 bays past area 8, which is `economy.atMaxLadder`'s existing ruling and not a new opening. |

---

## Universal invariants

- **No sheet contradicts a `[brief: binding]` item** — checked each: the three axes are unchanged;
  "permanent multipliers only, never content access" holds (`04` sells no access); "cleared is
  permanent" untouched; "deeper areas are larger, denser, hide rarer sets" is made *true* by `03`
  and `02` for the first time; the 10–20 minute session band is the divisor `05` derives from. PASS.
- **2–4 checkable acceptance criteria per leaf sheet** — `02` 4, `03` 4, `04` 4, `05` 4. FAIL on
  content: `03` criterion 1 asserts an equality that is false by 39 (RR-1) and `05` criterion 3's
  second half is false by its own numbers (RR-9). Both are checkable and both fail.
- **No priority-3 content specced** — PASS, see check 7.
- **No capability named that is absent from the Build Capability Registry** — PASS. No balance
  sheet names a `ui-forge` pattern, a screen or an emitter. `03`'s "five-digit worst-case cost
  string" is a consequence note handed to UI/UX, not a capability claim.
- **Every `[research: url]` is a real fetched source** — PASS with one defect, not a fabrication:
  `_lead.md`'s four cost-curve and session-shape URLs are real and the sheet is explicit about what
  each does and does not license. `03` cites them **through `cid/gameplay/balance/_lead.md`** rather
  than the pack and says so in its own `[research owed:]`; `04` and `05` do the same. No URL in any
  of the four sheets is asserted without a matching fetch record.
- **Every `[cid: decided]` is flagged upward, not buried** — FAIL, in the unusual direction: `04`'s
  `[cid: decided]` on the stale-bound diagnosis claims "no sheet states this" when `monetization/01`
  states it twice. RR-16. The other five `[cid: decided]` tags across the wave are visible in their
  Decision or Why sections.

---

## Revision requests

### `03-ladder-solvency.md` — the ladder totals are the un-floored geometric sums, not what the stated formula produces
**Violates:** acceptance criteria must be checkable and true; universal invariant on criteria.
**Fix:** under the sheet's own `costFormula` `floor(costBase × costGrowth^heldLevel)` the sums are
`value` **60,204** (not 60,216), `radius` **80,275** (not 80,287), `speed` **104,360** (not
104,375), total **244,839** (not 244,878), and `speed`'s level-20 rung is **25,400** (not 25,401).
Change `ladderTotal`, `perAxisTotal`, the table's `Σ cost` and `level-20` columns, and acceptance
criterion 1's "equals 244,878". The solvency ratio moves from ×3.264 to ×3.263 and nothing else
in the sheet changes.

### `04-axis-budget.md` — the `setBonus.axisHeadroom` revision request is wrong on both figures
**Violates:** a revision request must be arithmetically correct before it is applied.
**Fix:** using `meta/03`'s own derivation strings at sheet `03`'s ladder, `radius` available-to-sets
is `0.9 × 60 / 20.5 / 1.75` = **1.505**, not 1.464; `speed` is `0.9 × 137.5 / 32.0` = **3.867**,
not 3.223 (3.223 divides by the Vault factor as well, which is the *remaining* headroom, not the
*available* one — the two rows use two different formulas). 1.505 is also the only value
consistent with this sheet's own "95.7% spent" (1.44 / 1.505 = 0.957; 1.44 / 1.464 = 0.984).

### `04-axis-budget.md` — the radius set-factor test range is carried forward unchanged and is now illegal at its top
**Violates:** "every figure `[playtest unknown]` with a test range" — the range must be reachable.
**Fix:** `setFactorTestRange: [1.10, 1.35]` is `meta/03`'s and was legal against a 14.3-stud ladder.
At 20.5 studs, two radius factors at 1.35 give `20.5 × 1.8225 × 1.75` = **65.4 against a bound of
54**. The largest legal symmetric pair is **1.22** (`sqrt(54 / (20.5 × 1.75))` = 1.2268). Split the
field per axis: radius **[1.10, 1.22]**, speed and value **[1.10, 1.35]**, and add a row to the
revision table against `meta/03`'s `factorTestRange` and its acceptance criterion 2, which
hardcodes 2.158 and 1.611.

### `04-axis-budget.md` — no revision request is issued against `monetization/03`, which owns `products.headroom`
**Violates:** check 6, and "a tuning coefficient is set nowhere else".
**Fix:** add rows for `products.headroom.H2.maxThroughputProductFactorByOrdinal`
(2.18/1.99/2.14/2.17/2.10×4 → the nine new bounds, or delete it in favour of
`depths.maxTauMultiplier`), `H1_axisCeiling.atShippedValues` ("14.3 × 1.44 × 1.75 = 36.0 … 25.6 ×
1.2 = 30.7 ≤ 0.9 × 45.83"), and `monetization/03`'s two tables plus its acceptance criteria 1 and 2,
which print 14.3 / 25.6 / 45.83 / 36.0 / 30.7 and the lap list 93.5 / 85.2 / 91.8 / 93.0 / 89.9×4.
Every one of those is false after this sheet and `monetization/03` receives no request at all today.

### `04-axis-budget.md` — the speed ceiling's divisor is named `serverTickSeconds` in two merged keys and that key does not exist
**Violates:** check 6 and the sheet's own charter to "state each axis's ceiling and the input it reads".
**Fix:** this sheet uses `runtime.clearTickRate`, which is correct and is the emitted name
(`bridge/emit-config.mjs:298`; `game/src/shared/Modifiers.report.md:138` reports the defect from the
build side). Add two rows to the revision table: `modifiers.axes[speed].ceilingRule`
(`effective * serverTickSeconds <= movement.baseClearRadius` → `clearTickRate`) and
`products.headroom.H1_axisCeiling.ceilings.speed` (`movement.baseClearRadius /
runtime.serverTickSeconds` → `/ runtime.clearTickRate`). The radius rule is already requested; the
speed rule is the one that names a nonexistent key.

### `04-axis-budget.md` — `axisBudget` publishes a ceiling derived from an unadopted architect key as its primary figure
**Violates:** a proposed CID key may not depend on a technical value the technical contract has not accepted.
**Fix:** `axes[speed].ceiling` 137.5 and `bound` 123.75 are computed at `clearTickRate` 0.04, which
`architect/01-runtime` has not adopted. This sheet already states the merged case and calls it
"legal either way" (45.83 / 41.25 / 93.1% spent). Publish the merged case as `ceiling` and `bound`,
and keep 137.5 only inside `ceilingsAreEvaluatedAt` as the conditional. `fractionOfBound` moves
0.310 → 0.931 and no invariant changes.

### `03-ladder-solvency.md` — the chunk-library breach is stated as a bay problem, is an area problem, and carries no revision request
**Violates:** check 5; `layout`'s `invariants[3]` and acceptance criterion 1 (R1).
**Fix:** `layout.chunksPerFamily` 8 × 2 orientations = **16 variants**. This sheet's areas 7 and 8
need **26** and **30**, and the bay **47**, so R1 ("no chunk variant appears twice in one area's
run") is unsatisfiable on three rows, not one — and `chunksPerFamilyRange`'s top of 16 per family
(32 variants) still does not cover 47. Move this out of `## Consequences` into a
`## Revision request against cid/gameplay/meta/05-area-layout.md` naming `chunksPerFamily`,
`chunksPerFamilyRange` and R1, with the three counts.

### `03-ladder-solvency.md` — the depths revision falsifies the printed acceptance criteria of three approved sheets and names none of them
**Violates:** check 5; revision requests must name every field they falsify.
**Fix:** add one row each for `meta/04` acceptance criterion 2 (prints 164/149/161/163/157×4 arrival
and 186/192/191/182×4 under-buy) and criterion 3 (prints 140/683, 245/621, 407/669, 518/678,
624/655×3, 640/655, and "`footprintStuds2` at most 73,216"); `endgame` `invariants[2]`
("postTerminalArea's footprint, chunkCount and patchCount equal `depths.areas[7]`'s"), acceptance
criterion 3 (57,600 / 16 / 640) and `postTerminalArea.bayLengthStuds` (480 → **1,410**); and
`products` acceptance criterion 3 (93.5 / 85.2 / 91.8 / 93.0 / 89.9×4).

### `05-time-to-milestone.md` — acceptance criterion 3's second half is false at this sheet's own numbers
**Violates:** acceptance criteria must be checkable and true.
**Fix:** `sessionBandSeconds[1] / 127.9` = **9.38**, not "at most 9"; the manifest invariant
`sessionBandSeconds[1] / min(realisedLapSeconds) <= completeLapsPerSession[1] + 1` fails identically.
The conclusion "four to eight" is **right** — a 1,200 s session walks areas 1–8 in 1,094 s and stops
106 s into a 166 s bay — but it cannot be tested against the *minimum* lap, because a session never
repeats one area. Restate criterion 3 and the invariant over `laps[].cumulativeSeconds`:
`cumulativeSeconds[3]` (528.9) ≤ 600 < `cumulativeSeconds[4]` and `cumulativeSeconds[7]` (1,094.0)
≤ 1,200 < `cumulativeSeconds[7] + realisedLapSeconds[bay]`.

### `05-time-to-milestone.md` — first purchase lands outside `firstSession`'s own beat range and reorders the first minute
**Violates:** check 5, and it contradicts `04`'s claim that `firstSession` owes nothing.
**Fix:** this sheet publishes `firstPurchase` at **17.0 s base / 9.7 s purchaser**.
`firstSession.beats[firstSpendAffordable]` is `bySecond` 60.0 with `testRange` **[40.0, 120.0]**, and
beats 4 (`firstOrdinaryClear`, 15 s) and 5 (`tierContrast`, 45 s) are specced to precede it — so at
17 s the player can buy before the game has shown them two tiers, and at 9.7 s a `Span` owner can
buy before the first reveal's 10 s ceiling. Sheet `03`'s S3 only tests `firstPurchaseBand`
(10 patches .. 60 s), which 75 satisfies, so nothing caught it. Pick one and state it: either issue
a revision request against `firstSession.beats[firstSpendAffordable].testRange`, or hand sheet `03`
a floor on the cheapest `costBase` of **≈177** (40 s × 0.856 patches/s × 5.16), which is still
inside its own stated band.

### `02-patch-payout-and-depth-mix.md` — the free parameter's test range includes two infeasible values and its bound reason is wrong
**Violates:** a test range must be reachable without failing the sheet's own invariants.
**Fix:** four strictly-descending integers summing to 100 satisfy `4·w4 + 6 ≤ 100`, so
`w4 ≤ 23`; at 24 and 25 **no legal vector exists at all** (24+25+26+27 = 102). Change
`freeParameter.testRange` to **[18, 23]** and `boundReason` to "above 23 no strictly-descending
integer vector sums to 100". The related prose claim that the strict-descending limit is "about 7.8
per patch" is also high: the true maximum is **7.57** at 27/26/24/23, so the available escalation is
×1.47, not ×1.51.

### `02-patch-payout-and-depth-mix.md` — `tierMix` has no consumer
**Violates:** check 2.
**Fix:** name the reader. The per-depth weights are consumed by whatever assigns a patch's
`tierIndex`, which under `meta/05` is `layout`'s anchor generation — and `meta/05`'s "Not decided
here" points tier weights back at `systems/01`, so after this key nothing states the join. Either
add a `consumedBy` field giving the lookup `tierMix.byDepth[depths.areas[k].depth]` and a revision
request against `layout` adding it, or state in one line why `tiers[].weight`'s existing call site
already has the area ordinal in hand. Today `02` line 113 says `layout` is "untouched", which is the
opposite of true for the tier draw.

### `03-ladder-solvency.md` — no `## Pushing back` for the `endgame` reversal
**Violates:** check 5.
**Fix:** `meta/07`'s Decision says post-terminal bays are "each identical to area 8" and its
`invariants[2]` encodes it; this sheet makes the bay 47 chunks against area 8's 30. Add a
`## Pushing back` naming `gameplay/meta/07-after-the-last-find` and that ruling, with the reason
already in the request (one fixed bay must hold a 75–200 s lap from τ 1,816.5 to τ 3,967.5, and
area 8's size gives 59.9 s at the top).

### `04-axis-budget.md` — no `## Pushing back` for the `meta/04` routing reversal
**Violates:** check 5.
**Fix:** `meta/04` rules that "the residue routes to `monetization/03` `H4`, 'reduce
`products[].factor`', **not to me**". This sheet reverses it ("`H4` is not owed") and rewrites
`depths.invariants[11]` and `purchaserFloorRule`, which are that sheet's acceptance tests and not
values it ceded. Add a `## Pushing back` naming `gameplay/meta/04-the-depth-ladder` and both rulings.

### `05-time-to-milestone.md` — no `## Pushing back` for the `core-loop/04` reversal
**Violates:** check 5.
**Fix:** `core-loop/04`'s Decision states "a bound session is **three to seven** complete laps plus
one in progress". This sheet makes it four to eight. That sheet ceded "the lap-length figure itself
once measured", not the lap count. Add a `## Pushing back` naming
`gameplay/core-loop/04-lap-vs-session` and that ruling, stating the containment (the shape is
unchanged: the boundary still falls strictly inside a lap).

### `04-axis-budget.md` — a `[cid: decided]` tag claims novelty for a finding an approved sheet already carries
**Violates:** the `[cid: decided]` invariant, in the direction of over-tagging.
**Fix:** "`[cid: decided]` — no sheet states this and the brief is silent" is false.
`monetization/01` line 32 states "the ordinal-2 bound is **1.99 with no value pass owned and 1.27
with both**", and `products.headroom.H2.valueFactorWarning` states it again. Drop the `[cid:
decided]` and cite `monetization/01` as corroboration — the diagnosis is correct and is stronger
with a second sheet behind it than as a fresh developer question.

---

## Rulings on the seven requests the wave brief named

| # | request | ruling |
|---|---|---|
| 1 | `01`'s 12 fields; 20 rungs at 1.32; 244,878 vs 75,033 | **correct in substance, wrong in arithmetic.** Insolvency confirmed (11,644 vs ≈38,300, ×3.3). The replacement clears every stated constraint. But Σ is **244,839** and the three per-axis totals are each 12–15 low — RR-1. The 1.32 rationale ("income doubles per area", so `g^7.5 = 2` → 1.10 merged → 1.32 per axis) is loose: the ledger's realised ratio is **1.78**, which derives 1.255. Inside the [1.24, 1.40] test range, so the value stands and the derivation should be restated. |
| 2 | `tiers[].weight` 52/28/14/6 → 38/30/21/11 | **correct.** Sums to 100, strictly descending, all four `tiers` criteria hold, 140 × 5.16 = 722 lands inside `meta/01` criterion 3's 700–1,200 band, and 515 confirms the old vector failed it. Cheapest available fix. |
| 3 | all 8 `depths` rows, ceiling 73,216 → 226,690, `maxRadiusProduct` → `maxTauMultiplier`, `purchaserFloorRule`, `invariants[10]`/`[11]` | **correct but incomplete.** Every row reproduces. The ceiling should be **226,714** (`200 × 1312 × 1.728 / 2`), and note the definition changed — the old 73,216 excluded set factors and the new one includes them. `invariants[10]`/`[11]` are acceptance tests, so they need `## Pushing back` — RR-14. Three sheets' criteria are falsified and unnamed — RR-8. |
| 4 | `modifiers.axes[radius].ceilingRule` → `plots.laneWidthStuds / 2` | **correct**, and already independently recommended by `meta/04` and `meta/06`. It should have been paired with the `speed` rule, which names a key that does not exist — RR-5. |
| 5 | `products.items[span].factorTestRange` → [1.40, 1.82] and the `factorStatus` string | **correct.** 1.82 = `0.9 × 60 / (20.5 × 1.44)` reproduces, and both claims in the shipped string are false: 1.95 is not the limit and area 2 is not where it binds (the bay is, at 13.7%). Belongs with a request against `monetization/03`, which owns the H1/H2 tables — RR-4. |
| 6 | `setBonus.axisHeadroom`, `plots` 3,000 → 3,480, `endgame` 30 → 47 chunks, `core-loop/04` three-to-seven → four-to-eight | **mixed.** `plots` **correct** (every bay length = footprint/120, sum 3,480, and `plots`' own four criteria still pass). `endgame` **correct in value, missing the `## Pushing back`** and three neighbouring fields — RR-8, RR-13. `core-loop/04` **correct in value, missing the `## Pushing back`**, and its acceptance criterion is untestable as written — RR-9, RR-15. `setBonus.axisHeadroom` **wrong on both numbers** — RR-2. |
| 7 | `runtime.clearTickRate` 0.12 → 0.04 | **correct as a request, entitled, genuinely load-bearing — and paid against a proxy.** The dependency is real (0.12 fails `depths.invariants[10]` from ordinal 6; 0.05 fails at the bay). Balance is entitled: it routes it as a request to the owning contract, `architect/schema.mjs` permits anything under 0.25, and `architect/01-runtime` criterion 2 still passes at 0.04 (137.5 > 38.4). **But**: the invariant it satisfies is a *proxy*. Its physical purpose, per `core-loop/01`, is that the player must not advance more than a clear radius between ticks — that is `modifiers.axes[speed].ceilingRule`, and it passes at 0.12 with 4.4× of room. `invariants[10]`'s separate "at most one patch per two ticks" bounds nothing a player perceives: the design clears **7.5 patches per second** at area 8 either way, and the tick only changes whether they arrive 0.9 or 0.3 at a time. **The cost is 3× the proximity loop — 1,880 patches × 25 Hz × 20 players = 940,000 tests/s, which sheet `03` correctly computes and correctly says forces spatial bucketing.** That is a real bill handed to Tech — Performance, which has not run. Recorded as a cross-category conflict below, and the cheaper alternative — restate `invariants[10]` in the quantity it is protecting — should be offered to `meta/04` beside the tick request rather than instead of it. **Not a blocker: the request is legal and stated with its cost, which is exactly the required form.** |

**And the 9.625-stud spawn claim: correct.** 2.83 vs 0.92 patches reproduces, `firstFindOrdinal` 1
at ≤ 3.5 studs is inside both discs, and `beats[firstClear]` / `beats[firstReveal]` both survive.
No `firstSession` revision is owed *for the disc*. The purchaser case that **is** open is
first-purchase affordability at 9.7 s — RR-10.

---

## What neither Balance nor its lead saw

1. **The purchaser buys before the game has taught buying** — RR-10. `04` closed the
   purchaser/`firstSession` question on the disc and declared "Onboarding work owes nothing"; `05`
   then published 9.7 s, which reopens it on a different field.
2. **The chunk library breaks at areas 7 and 8, not only at the bay** — RR-7. `03` states the bay
   case and stops one row short of the two that are inside the specced game.
3. **`monetization/03` receives no revision request at all** — RR-4, though it owns every field
   sheet `04` supersedes.
4. **The end-of-lap walk-back roughly triples.** `meta/06` sized the worst walk from the last
   cleared patch to the inward opening at **540 studs / 21 s** and called it "inside every cadence
   rule". At the revised bay lengths it is **900 studs** at area 8 and **1,410** at the post-terminal
   bay — about 27 s and 37 s of unpaid ground against `core-loop/01`'s 3-second ceiling. `05`'s
   `tickGapRealisedSeconds` 1.17 is an in-area average and excludes it.
   *Meets bar (a) marginally; recorded, not requested, because it predates this wave and its owner
   is `meta/06`.*
5. **`aboveTickGapRealisedSeconds` 49.9 is a mean presented as a maximum.** With one find per
   contiguous third, two consecutive reveals can be up to **2/3 of a lap** apart — 99.7 s at area 7,
   past the 90 s ceiling. In practice upgrade purchases (~20 s cadence through areas 1–8) fill it,
   which is precisely what `05`'s claim that "reveal spacing, not purchase cadence, is what carries
   it" denies. *Bar (b) on the wording of one claim; recorded, not requested.*
6. **`endgame`'s float-precision horizon arrives 3.5× sooner.** `meta/06` bounds the endless run at
   "bay 42 crosses 20,000 studs"; at 1,410 studs a bay it is **bay 12**. `03`'s note that the run is
   "bounded by the same thing it was before, further out" is true of the lane end (3,000 → 3,480)
   and false of the bay index. *Recorded; the `[research owed:]` that settles it is `meta/06`'s.*
7. **`05`'s `realisedToArrivalRatio` 0.83 is mislabelled.** Realised ÷ arrival is **0.865**
   (1,094.0 / 1,264.2); 0.83 is realised ÷ `8 × LAP_TARGET` (1,094 / 1,320). Both appear in the
   sheet. *Noted, not acted — the conclusion is unaffected.*
8. **`02`'s Decision line says the shipped vector is "52/28/14/11"**, which sums to 105. The shipped
   vector is 52/28/14/6 and the revision table has it right. *Noted, not acted.*

---

## Predicted cross-category conflicts

Recorded so the final pass diffs against them instead of rediscovering them.

- **Tech & Data — Performance (wave 5) inherits three compounding bills at once**: a 25 Hz
  proximity loop, up to **1,880 anchored patches per live bay** (against `art/objects/01`'s stated
  140 and `meta/04`'s 640), and 16–20 players. 940,000 distance tests per second under a linear
  scan. Spatial bucketing stops being an option. When Performance runs, it will either accept the
  tick or send `depths.invariants[10]` back — and the second outcome un-picks sheet `03`'s
  footprints.
- **Art & Visuals — Environment (wave 6) inherits 26–47 chunks per bay against 8 authored looks
  per family.** Whatever closes RR-7 is a content bill Environment pays, and `meta/05`'s stated
  range (8–16 per family) does not reach it.
- **UI/UX (wave 5) inherits a purchase row whose worst-case cost string is 25,400** and a radius
  readout that reaches 51.66 studs in a 120-stud lane. The second is the one to watch: at 95.7% of
  its ceiling the sweep is 86% of the lane width, and whether that still reads as "a wider sweep"
  rather than "the whole lane" is a legibility question no sheet has asked.
- **Held-tool work still owes the ruling `04` names and cannot make.** `mechanics/04` `T11` drives
  head width from Reach *level*; `products` criterion 4 fails a build where `Span` does not widen
  it. `03` raises `radius.maxLevel` 8 → 20, so the tool now has 20 width rungs instead of 8 and the
  same unresolved question.
- **Analytics — Funnels (wave 5) inherits ten instruments from `pacing`** with two populations and
  mixed measurement origins (`firstClear` input-relative, everything else join-relative). If RR-10
  moves `firstPurchase`, that instrument's target moves with it.
- **`social.maxPlayers` remains unassigned by anyone.** Balance declined it on the stated ground
  that nothing in the loop reads population, and routed it to per-server-capacity work. `architect`
  has already picked 16. Wave 5 should ratify rather than re-decide.

---

## When the checklist itself is wrong

**Check 5 is over-broad and should be narrowed.** As written it fires on *any* contradiction of an
approved earlier-stage sheet, which includes every value revision Balance exists to make. Sheet
`02` revising `tiers[].weight` is not a ruling reversal: `systems/01` explicitly hands Balance "the
payout ladder as a starting point" and "whether it survives contact with a real area size". Forcing
a `## Pushing back` onto that would make the wave's routine work indistinguishable from its three
genuine reversals, which is the opposite of what the section is for.

**Narrow it to:** *no sheet contradicts a **ruling, invariant or acceptance test** of an approved
earlier-stage sheet without a `## Pushing back` naming that sheet and the ruling. A value the
owning sheet's `## Not decided here` or `## Consequences` explicitly cedes is revised by
`## Revision request` and needs no push-back.*

Under that narrowing check 5 still **FAILS** — RR-13, RR-14 and RR-15 all clear the narrowed bar —
so nothing is being passed by relaxing it. I am flagging it because a re-run against the broad
reading would generate a dozen spurious requests and teach the next wave to bury real reversals
inside routine ones.

**Second, smaller:** the `_lead.md` structural finding is correct and should be adopted as a rule.
"Every number appears in Balance & Tuning and nowhere else" is unsatisfiable against one-owner-per-
key, and the lead's resolution — the number stays in the key that holds it and Balance reaches it
by revision request — is right. The check should be read as *set in one place*, not *set in
Balance*. Check 6 fails here on that reading too, because the joint lap bound now has three homes.

---

## What must happen before this category can release

1. **RR-1, RR-2 and RR-11 first**, because they are wrong numbers inside instructions other agents
   will execute. Nothing else should be applied until they are corrected.
2. **RR-4, RR-7 and RR-8**: the revision requests must name every acceptance criterion, invariant
   and printed figure they falsify, in `meta/04`, `meta/05`, `meta/07`, `monetization/01`,
   `monetization/03` and `products`. A revision that lands half a sheet is a sheet that fails its own
   criteria on the next verify.
3. **RR-10** must be settled by one of the two named owners, not left between them.
4. **RR-13, RR-14, RR-15**: three `## Pushing back` sections, then check 5 clears under the narrowed
   reading.
5. **RR-3, RR-5, RR-6, RR-9, RR-12, RR-16**: single-field corrections, no dependencies.
6. **Re-run `npm run cid:verify -- --category gameplay` and `npm run bridge`** after the revisions
   land. Four new proposed keys arrive in this wave (`tierMix`, `solvency`, `axisBudget`, `pacing`)
   against a 25-key contract, and `solvency.requestedUpgrades` must be deleted the moment `01`
   adopts the figures, exactly as its own note says.
7. **Then re-verify.** I will re-read every changed file; no verdict here carries forward.

**The tick request does not block the release.** It is correctly formed, correctly costed and
correctly routed. It blocks the *build*, and it should reach `architect` and Tech — Performance as
an open item with the cheaper alternative attached, not as a settled value.

---

# Round 2

**Status: FAIL** — three requests, all single-field. Round 3 of 3 should close them.

Fourteen of sixteen are properly closed, not papered over. Both pushbacks are **upheld**, and one
of them corrects an error of mine. What fails is (a) one manifest field that contradicts another
field of the same manifest, now replicated into two keys, and (b) a breach the wave-5 Performance
ruling opened underneath sheet `04` after it was written.

**Re-read in full this round:** `balance/02`, `03`, `04`, `05`. Nothing from round 1 is carried
forward on trust; every figure below is recomputed.

## What I re-derived

`Σ floor(95 × 1.32^l)` = **76,263** exactly (95, 125, 165, 218, 288, 380, 502, 663, 875, 1155,
1525, 2013, 2658, 3509, 4631, 6114, 8070, 10653, 14062, 18562); total **260,898** ✓; ratio
260,898 / 71,233 = **3.663** ✓. Every income row reproduces against the value ladder plus Terrace
(area 7: 1,040 × 7.45 × 3.90 = 30,208 ✓; area 2: 175 × 5.16 × 1.68 = 1,515 ✓). Every τ, every
footprint (`165 τ / 2` floored to 3,600), and every arrival, under-buy and realised lap reproduces
on all nine rows. All nine `jointLapBound` rows and margins reproduce, including the bay at
3.024 ≤ 3.22, margin 0.0646. The bay window (148,781–169,344 studs², geometric centre 158,730 →
**44 chunks**) reproduces, and at 47 chunks the under-buy lap really is 199.83 s against 200.
Swept cap **12.88** = 7.4545 × 1.728 ✓ — the round-1 figure of 10.73 forgot Vault's factor on
`speed`, and the self-correction is right. `realisedToArrivalRatio` **0.865** = 1,103.7 / 1,275.8 ✓,
with the round-1 confusion named in the manifest rather than silently fixed. Criterion 3 now tests
the cumulative sequence and passes (536.1 ≤ 600 < 683.2; 1,103.7 ≤ 1,200 < 1,259.4). Sheet `02`'s
free parameter is now [19, 23] with the correct bound (`4·w4 + 6 ≤ 100`), 7.57 at 27/26/24/23,
escalation 1.467, and a `consumedBy` plus a `layout` revision request.

**Checks 2, 5 and 6 now PASS.** The joint bound has exactly one home, enforced by `axisBudget`
criterion 4 and invariant 6; three `## Pushing back` sections exist, each naming a sheet and a
ruling; `tierMix` names its consumer and the two revisions that consumer needs.

## The two pushbacks

**1. RR-10 — upheld, and my request was over-specified.** I verified the mechanism rather than the
figure: footprint derives from arrival τ, which derives from cumulative income, which derives from
footprint, so raising the cheapest `costBase` contracts the whole game rather than only delaying
one purchase. It is corroborated inside Balance's own ledger — 75 → 95 (×1.267) already cost 5.1%
of income(1..7), 75,033 → 71,233 — and 177 additionally flips `value` from the cheapest axis to the
dearest, a regime change in the greedy order that steepens the loss past a constant elasticity.
I could not reproduce 45,800 by hand and do not need to: the direction, the mechanism and the
regime change are all real. **My 177 figure was computed statically from first-purchase timing
without noticing that `costBase` scales all twenty rungs of that axis.** With one geometric ladder
there is no way to raise rung 1 without raising rung 20, so the cheap fix I implied does not exist.
Balance also paid the load-bearing half (75 → 95; purchaser 12.3 s, past the 10 s reveal ceiling)
and stated the residue in the beat list rather than engineering it away. **Accept.** `firstSession`'s
owner still rules on the widened [10, 120] range, which is correctly routed as a request.

**2. RR-2's speed figure — upheld; the catch is genuine and it is against me.**
`0.9 × 45.83 / 32.0` = **1.2891**. My 3.867 used `clearTickRate` 0.04, which my own RR-6 forbade as
a primary figure — the two requests were mutually inconsistent, and Balance caught it. 1.289 with
3.867 as the conditional is the correct form, and the derived speed set-factor top of 1.28
(`41.25 / 32.0`) follows from it.

## FAIL 1 — `03` and `05`: `rungsBought` contradicts `arrivalLevels`

**Violates:** two fields of one manifest must agree; `solvency.tests.S5`'s stated value is false.

The ledger's `arrivalLevels` are **right** — I reproduced the greedy order from `costBase`
95/100/130 and it matches `cumulativeSpend` exactly. Area 1: 95, 100, 125, 130, 132, 165 = **747**,
leaving 3/2/1 ✓. Area 2 continues 171, 174, 218, 226, 229, 288, 298 = **2,351**, leaving 5/4/4 ✓.
So area 2 buys **7** rungs, not 6.

Level deltas across the eight rows are **6 / 7 / 7 / 7 / 7 / 6 / 6 / 4**, summing to 50, which is
the bay's arrival total. `rungsBought` says **6 / 6 / 7 / 6 / 6 / 6 / 6 / 5**, summing to 48 —
wrong on rows 2, 4, 5 and 8, and two rungs short. The error is now in two manifests and propagates
into `pacing.laps[].purchaseCadenceSeconds`, which is the field that carries `core-loop/01`'s
90-second rule after this wave moved it off reveal spacing.

**Fix:** set `solvency.areaLedger[].rungsBought` and `pacing.laps[].rungsBought` to
6/7/7/7/7/6/6/4; recompute `purchaseCadenceSeconds` as `realisedLapSeconds / rungsBought` (area 2
18.6, area 4 19.0, area 5 21.0, **area 8 34.5**); change `S5`'s value from "5 to 7" to **"4 to 7"**;
and change the prose in both sheets from "5 to 7 rungs per area … 18.8 to 27.6 seconds" to
"4 to 7 … 18.6 to 34.5 seconds". **No conclusion moves** — every cadence stays far under 90 s and
purchases still carry the rule — but sheet `03`'s acceptance criterion 3 (`rungsBought >= 4`) sits
*at* its boundary at area 8 rather than comfortably inside it, and the sheet should say so.

## FAIL 2 — `04`: the speed axis breaches its own 0.9 bound at the realised tick

**Violates:** `axisBudget` acceptance criterion 1, and the same inequality in three other keys.

Performance's quantisation ruling is correct: `task.wait` resumes on the next Heartbeat and the
server heartbeat caps at 60 Hz, so a nominal `d` realises as `ceil(d × 60) / 60`. **0.12 realises
as 0.13333.** Sheet `04` publishes every ceiling at the nominal 0.12 — the right response to RR-6,
and now the wrong number:

| | at nominal 0.12 | **at realised 0.13333** |
|---|---|---|
| `ceiling(speed)` = 5.5 / t | 45.83 | **41.25** |
| 0.9 bound | 41.25 | **37.125** |
| effective = 32.0 × 1.20 | 38.40 | 38.40 |
| fraction of bound | 0.931 ✓ | **1.034 ✗** |

The *physical* rule still passes — `38.40 × 0.13333 = 5.12 ≤ 5.5`, 6.9% of room — so nothing clamps
and no player notices. What fails is the 0.9 reservation, in four places at once: `axisBudget`
criterion 1; `axisBudget.axes[speed].setFactorTestRange` (top 1.28, where the realised maximum is
**1.160**); `setBonus` acceptance criterion 2 as sheet `04` revises it (1.289 → 1.160, so the
shipped 1.20 no longer fits); and `products.headroom.H1_axisCeiling.atShippedValues` as sheet `04`
restates it ("32.0 × 1.20 = 38.40 ≤ 41.25" is the bound at 0.12, not at 0.13333).

**Fix — one choice, stated in the sheet:** evaluate every ceiling at the **realised** tick
`ceil(clearTickRate × 60) / 60` rather than the nominal one, then close the 3.4% breach with one of
— `setBonus.rows[vault].factor` 1.20 → **1.15** (32.0 × 1.15 = 36.8 ≤ 37.125; cheapest, inside
`meta/03`'s original range, touches nothing else); `speed.perLevel` 0.80 → **0.74** (ladderMax 30.8,
× 1.20 = 36.96, but it moves every τ and therefore every footprint in sheet `03`); or state the 0.9
margin as knowingly spent on this axis with the hard ceiling as the real bound. **Vault at 1.15 is
the one that ripples nowhere.**

## FAIL 3 — `03`: the 880,000-test bill is wrong on two counts

**Violates:** a figure handed to an unrun domain as its budget must be computable from the contract.

`1,760 × 25 Hz × 20 players` uses a frequency the engine cannot produce and a player count the
technical contract fixed at 16 (`runtime.maxPlayers`; `social.maxPlayers` is a 12–20 band and
`architect/01-runtime` took 16, which Balance's own `_lead` deferred to).

**Fix:** publish all three, since the sheet offers three routes — shipped `0.12 → 0.13333` (7.5 Hz):
**211,200**; requested `0.04 → 0.05` (20 Hz): **563,200**; the value that actually delivers,
`0.0334` (30 Hz): **844,800**. Each is `1,760 × Hz × 16`. Performance's own 225,600 and 601,600 are
right in method and were computed against the superseded 47-chunk bay (1,880 patches); at 44 chunks
they become 211,200 and 563,200. **Both sides should restate against 1,760 and 16.**

## Ruling on the tick, given the quantisation finding

**The request does not survive as a value request. Balance's own alternative is now the only route
that works.**

At the bay the invariant is size-invariant: `patchCount = 40c` and
`arrivalLap = 7200c / 1816.5 = 3.9637c`, so `40c ≤ 3.9637c / (2t)` reduces to **`t ≤ 0.04955`, with
the chunk count cancelling.** No bay size inside the legal 41.3–47.0-chunk window fixes it — I
checked 41, 42 and 43 and the ratio is constant at 10.09 patches per second of lap against a 10.07
requirement.

So: **0.04 is unreachable, and its realisation 0.05 fails the very invariant it was requested for**,
by 0.9%, at every legal bay size — which Balance's own `S7` already states ("1,744 against 1,760")
and which its acceptance criterion 4 still contradicts by asserting the hold "at
`clearTickRate = 0.04`". The next reachable value is **0.03333**, which passes every row with
margin, at **844,800 tests/s — 4× the shipped 211,200** — to buy what Balance itself calls "literal
compliance with that invariant, and nothing a player perceives."

**Therefore: withdraw the tick request and take the `invariants[10]` restatement.** Balance already
drafted it — `max effective(speed) × runtime.clearTickRate ≤ movement.baseClearRadius`, deleting the
two-ticks-per-patch clause — and it passes at the realised shipped tick (5.12 ≤ 5.5). Sheet `03`
should present it as the recommendation rather than as the second of two equal options, and
acceptance criterion 4 should be rewritten against the restated invariant.

**Note the coupling:** withdrawing the tick request makes FAIL 2 mandatory to close, because the
speed ceiling then stays at the realised 41.25 permanently and cannot be rescued by a later tick
change. The two must be settled together.

## Recorded, not requested

- Balance's "19% of room" on the speed physical rule is measured at the nominal 0.12 (5.5 / 4.608).
  At the realised 0.13333 it is **6.9%** (5.5 / 5.12). Same root cause as FAIL 2, same edit.
- `pacing`'s two margin targets now bind on the same row (the bay, both at 0.065), so they are one
  constraint wearing two names. Stated correctly; noted only because the round-1 rationale for
  having two was that they pull in opposite directions.
- The end-of-lap walk-back (27 s / 38 s) and the reveal-gap tail (99.7 s) were round-1 noted items
  and are now both carried explicitly in `pacing`, the walk-back routed to `meta/06` and the tail
  closed by purchase cadence. Correctly handled; no longer open.

## Round 2 status by check

1 PASS · 2 **PASS** (was FAIL) · 3 PASS · 4 PASS · 5 **PASS** (was FAIL) · 6 **PASS** (was FAIL) ·
7 PASS · 8 PASS.

Universal invariants hold except two acceptance criteria: sheet `03`'s criterion 4 asserts the hold
at an unreachable tick, and sheet `04`'s criterion 1 fails at the realised tick. Both sit inside
FAIL 2 and the tick ruling. The round-1 `[cid: decided]` over-tag is closed.

**Three edits and one choice stand between this and release.**
