# Gameplay — verification, wave 4 (stage 4: Balance & Tuning)

**Final verdict: PASS (round 3).** Rounds 1 and 2 below are the record of what was found and are
not edited.

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

## What I recomputed and found correct

**The insolvency claim is true, digit for digit.** `Σ floor(costBase × costGrowth^l)` over the
shipped ladder: `value` 25@1.6×10 = **4,536**; `radius` 40@1.75×8 = **4,635**; `speed` 60@1.8×6 =
**2,473**; total **11,644** — exact. Areas 1–7 at the merged `depths` (3,198 patches), EV 3.68,
value multiplier rising to its ×3.5 cap during area 4, yields **≈38,300**, which reproduces
`meta/04`'s "about 38,500" and its ×3.3 shortfall.

**Sheet `04`'s demolition of `depths.areas[2].maxRadiusProduct` = 1.27 is right.** Row 2's lap
floor gives `τ_max = 2 × 25,200 / 75 = 672`; against the free player's arrival τ of 337.92 that is
**1.99**, and 1.27 requires an arrival τ of **528.5 = 3.00× base**, which only a `value` pass can
produce. `monetization/01` line 32 already states "1.99 with no value pass owned and 1.27 with
both", so the merged contract has carried two disjoint answers for one quantity since wave 3.

**Every derived table in sheets `03`, `04` and `05` reproduces** — τ at all nine rows, footprints,
patch counts, the sizing rule, the laps, the joint-bound rows and margins, the income column, the
`tierMix` expected values, `Span`'s 1.82 bound, the 9.625-stud disc, the plots bay table.

**The `clearTickRate` request is causally genuine** and **the 9.625-stud spawn case is correctly
closed** for the disc.

## Check results

| # | check | result | evidence |
|---|---|---|---|
| 1 | every currency has a faucet and a sink | **PASS** | `economy` keeps `faucetCount` 1 / `sinkCount` 1; `03` adds 36 rungs to the same sink; no second currency in any of the four manifests. |
| 2 | every reward granted anywhere has a source system | **FAIL** | `tierMix` decides what a patch pays by depth and **no key reads it**. `02` line 113 declares `layout` "untouched", which is the opposite of true for the tier draw. RR-12. |
| 3 | every mechanic maps to a supported verb | **PASS** | No new verb. `05`'s `firstPurchase` rides `buy` (R-1); `04`'s `Span` is an ownership read with no input. |
| 4 | no system requires an absent input | **PASS** | No balance sheet widens `input`'s five-verb / four-pressable surface. |
| 5 | no contradiction of an approved earlier-stage ruling without `## Pushing back` | **FAIL** | **Zero `## Pushing back` sections** in `balance/01`–`05` or `_lead.md`. Three ruling-level contradictions: `03` vs `meta/07`; `04` vs `meta/04`; `05` vs `core-loop/04`. RR-13/14/15. |
| 6 | tuning coefficients set in one place | **FAIL** | The joint lap bound lives in **three** keys with two sets of numbers. RR-4. |
| 7 | no priority-2/3 item specced | **PASS** | `_lead.md` names the excluded systems in order to exclude them; `05` says "Nothing here builds a hook". |
| 8 | the loop closes | **PASS** | Demonstrated across nine ledger rows and in wall clock. |

## Universal invariants

- No `[brief: binding]` contradiction. PASS.
- 2–4 checkable criteria per sheet — **FAIL on content**: `03` criterion 1 is false by 39 (RR-1),
  `05` criterion 3's second half is false by its own numbers (RR-9).
- No priority-3 content. PASS. No capability outside the registry. PASS.
- `[research: url]` all real and correctly limited. PASS.
- `[cid: decided]` — **FAIL, over-tagged**: `04` claims novelty for a finding `monetization/01`
  already carries. RR-16.

## Revision requests

**RR-1 · `03`** — the ladder totals are un-floored geometric sums. Under the sheet's own
`floor(costBase × costGrowth^l)`: `value` **60,204**, `radius` **80,275**, `speed` **104,360**,
total **244,839**, top speed rung **25,400**. Criterion 1 asserts 244,878 and is false.

**RR-2 · `04`** — the `setBonus.axisHeadroom` request is wrong on both figures. `radius` =
`0.9 × 60 / 20.5 / 1.75` = **1.505**, not 1.464 (and 1.44/1.505 = 0.957, this sheet's own "95.7%
spent"); `speed` = **3.867**, not 3.223 — the two rows use two different formulas.

**RR-3 · `04`** — the radius set-factor range is inherited illegal. At 20.5 studs two factors at
1.35 give 65.4 against a 54 bound; the legal top is **1.22**. Split per axis.

**RR-4 · `04`** — no request against `monetization/03`, which owns `products.headroom`. Its H1/H2
tables, `atShippedValues`, `H2.maxThroughputProductFactorByOrdinal` and criteria 1–2 are all false
after this sheet and receive nothing.

**RR-5 · `04`** — `modifiers.axes[speed].ceilingRule` and `products.headroom.H1.ceilings.speed`
both name `serverTickSeconds`, **a key that does not exist**; the emitted name is `clearTickRate`.

**RR-6 · `04`** — `axes[speed].ceiling` 137.5 rests on an architect value the technical contract
has not adopted. Publish the merged case; keep 0.04 conditional.

**RR-7 · `03`** — the chunk-library breach is an area problem, not a bay problem: 16 variants
against **26, 30 and 47**. No request against `meta/05`.

**RR-8 · `03`** — the depths revision falsifies `meta/04` criteria 2 and 3, `endgame`
`invariants[2]` + criterion 3 + `bayLengthStuds`, and `products` criterion 3, naming none.

**RR-9 · `05`** — criterion 3's second half is false: 1,200/127.9 = **9.38**, not ≤ 9. The
conclusion is right; it cannot be tested against the minimum lap. Use `cumulativeSeconds`.

**RR-10 · `05`** — first purchase at **17.0 s / 9.7 s** sits outside
`firstSession.beats[firstSpendAffordable].testRange` [40, 120] and lets a purchaser buy before the
first reveal. Settle it in one of the two owners.

**RR-11 · `02`** — the free parameter's range [18, 25] is infeasible above 23 (`4·w4 + 6 ≤ 100`),
and its bound reason is wrong. The rank-ordering ceiling is **7.57**, not 7.8.

**RR-12 · `02`** — `tierMix` has no consumer.

**RR-13/14/15 · `03`/`04`/`05`** — three missing `## Pushing back` sections, against `meta/07`,
`meta/04` and `core-loop/04`.

**RR-16 · `04`** — drop the `[cid: decided]` novelty claim and cite `monetization/01`.

## Rulings on the seven requests the wave brief named

1. **Correct in substance, wrong in arithmetic** — insolvency confirmed; Σ is 244,839 (RR-1). The
   1.32 derivation is loose (realised ratio 1.78, not 2.0) but inside its test range.
2. **Correct** — 38/30/21/11 sums to 100, strictly descending, 722 inside the 700–1,200 band.
3. **Correct but incomplete** — ceiling should be **226,714**, and the definition changed to
   include set factors. Needs `## Pushing back` and the unnamed criteria.
4. **Correct**, and should have been paired with the speed rule (RR-5).
5. **Correct** — 1.82 reproduces and both claims in the shipped string are false.
6. **Mixed** — `plots` correct; `endgame` and `core-loop/04` correct in value, missing push-back;
   `setBonus.axisHeadroom` wrong on both numbers.
7. **Entitled and genuinely load-bearing, but paid against a proxy.** The invariant's physical
   purpose is the speed ceiling, which passes at 0.12 with 4.4× of room; the two-ticks-per-patch
   clause bounds nothing perceptible. The cost is a 3× proximity loop handed to an unrun domain.

**The 9.625-stud spawn claim: correct** for the disc. The open purchaser case is first-purchase
timing (RR-10).

## What neither Balance nor its lead saw

1. The purchaser buys before the game has taught buying (RR-10).
2. The chunk library breaks at areas 7 and 8, not only at the bay (RR-7).
3. `monetization/03` receives no request at all (RR-4).
4. **The end-of-lap walk-back roughly triples** — 900 and 1,410 studs, ~27 s and ~37 s of unpaid
   ground, against `meta/06`'s stated 540 studs / 21 s. *Bar (a), marginal; owner is `meta/06`.*
5. **`aboveTickGapRealisedSeconds` 49.9 is a mean presented as a maximum** — two reveals can sit
   2/3 of a lap apart, 99.7 s at area 7, past the 90 s ceiling.
6. **`endgame`'s precision horizon arrives 3.5× sooner** — bay 12, not bay 42.
7. `realisedToArrivalRatio` 0.83 is mislabelled; realised ÷ arrival is 0.865.
8. `02`'s Decision line says the shipped vector is "52/28/14/11", which sums to 105.

## Predicted cross-category conflicts

- **Tech — Performance (wave 5)** inherits a 25 Hz loop, 1,880 patches per bay against
  `art/objects/01`'s 140, and 16–20 players. Spatial bucketing stops being optional.
- **Art — Environment (wave 6)** inherits 26–47 chunks per bay against 8 authored looks per family.
- **UI/UX (wave 5)** inherits a five-digit cost string and a radius readout at 86% of lane width.
- **Held-tool work** still owes the `T11`-versus-`products`-criterion-4 ruling, now over 20 rungs.
- **Analytics — Funnels** inherits ten instruments whose targets move if RR-10 moves.
- **`social.maxPlayers`** is unassigned by CID and already picked at 16 by `architect`.

## When the checklist itself is wrong

**Check 5 is over-broad.** As written it fires on any contradiction of an approved earlier-stage
sheet, including every value revision Balance exists to make. Narrow it to: *no sheet contradicts a
**ruling, invariant or acceptance test** without a `## Pushing back`; a value the owning sheet
explicitly cedes is revised by `## Revision request` and needs no push-back.* Check 5 still fails
under the narrowing, so nothing is passed by relaxing it.

**Check 6 should read *set in one place*, not *set in Balance*.** The `_lead.md` structural finding
is correct: "every number in Balance and nowhere else" is unsatisfiable against one-owner-per-key.

## What must happen before this category can release

RR-1/2/11 first (wrong numbers inside instructions others will execute); then RR-4/7/8 (name every
criterion falsified); RR-10 settled by one owner; the three push-back sections; the six
single-field corrections; re-run the gates; re-verify with every changed file re-read.

**The tick request does not block the release.** It blocks the *build*, and should reach
`architect` and Performance as an open item with the cheaper alternative attached.

---

# Round 2

**Status: FAIL** — three requests, all single-field.

Fourteen of sixteen are properly closed. Both pushbacks are **upheld**, and one corrects an error
of mine. What fails is one manifest field contradicting another field of the same manifest, and a
breach the wave-5 Performance ruling opened underneath sheet `04` after it was written.

## What I re-derived

`Σ floor(95 × 1.32^l)` = **76,263** exactly; total **260,898**; ratio **3.663**. Every income row,
τ, footprint, arrival lap, under-buy lap, realised lap and joint-bound row reproduces. The bay
window (148,781–169,344, centre 158,730 → **44 chunks**) reproduces, and at 47 chunks the under-buy
lap really is 199.83 s against 200. Swept cap **12.88** = 7.4545 × 1.728 — the round-1 figure of
10.73 forgot Vault, and the self-correction is right. `realisedToArrivalRatio` **0.865** with the
round-1 confusion named rather than silently fixed. Criterion 3 now tests the cumulative sequence
and passes. Sheet `02`'s free parameter is [19, 23] with the correct bound, 7.57, and a
`consumedBy`. **Checks 2, 5 and 6 now PASS.**

## The two pushbacks

**1. RR-10 — upheld, and my request was over-specified.** Footprint derives from arrival τ, which
derives from cumulative income, which derives from footprint, so raising the cheapest `costBase`
contracts the whole game. Corroborated in Balance's own ledger: 75 → 95 already cost 5.1% of
income(1..7). 177 also flips `value` from cheapest to dearest axis, a regime change in the greedy
order. **My 177 was computed statically from first-purchase timing without noticing `costBase`
scales all twenty rungs**; with one geometric ladder the cheap fix I implied does not exist.
Balance paid the load-bearing half (purchaser 12.3 s, past the 10 s reveal ceiling).

**2. RR-2's speed figure — upheld; the catch is against me.** `0.9 × 45.83 / 32.0` = **1.2891**.
My 3.867 used `clearTickRate` 0.04, which my own RR-6 forbade as a primary figure. The two requests
were mutually inconsistent.

## FAIL 1 — `03` and `05`: `rungsBought` contradicts `arrivalLevels`

The `arrivalLevels` are **right** — I reproduced the greedy order and it matches `cumulativeSpend`
exactly (area 1: 95, 100, 125, 130, 132, 165 = **747** → 3/2/1; area 2 continues 171, 174, 218,
226, 229, 288, 298 = **2,351** → 5/4/4). Deltas are **6/7/7/7/7/6/6/4** (sum 50, the bay's arrival
total); the field says 6/6/7/6/6/6/6/5 (sum 48). Wrong on rows 2, 4, 5, 8, in two manifests, and it
propagates into `purchaseCadenceSeconds` — the field now carrying the 90-second rule.

**Fix:** set both to 6/7/7/7/7/6/6/4; recompute cadence (area 8 → **34.5 s**); S5's "5 to 7" →
**"4 to 7"**. No conclusion moves, but criterion 3's `>= 4` sits *at* its boundary.

## FAIL 2 — `04`: the speed axis breaches its own 0.9 bound at the realised tick

`task.wait` resumes on the next Heartbeat at 60 Hz, so **0.12 realises as 0.13333**:

| | at nominal 0.12 | **at realised 0.13333** |
|---|---|---|
| `ceiling(speed)` | 45.83 | **41.25** |
| 0.9 bound | 41.25 | **37.125** |
| effective 32.0 × 1.20 | 38.40 | 38.40 |
| fraction of bound | 0.931 ✓ | **1.034 ✗** |

The physical rule still passes (5.12 ≤ 5.5). The 0.9 reservation fails in four keys at once.
**Fix:** evaluate every ceiling at the realised tick, then close the 3.4% breach — Vault 1.20 →
**1.15** is the one that ripples nowhere.

## FAIL 3 — `03`: the 880,000-test bill is wrong twice

25 Hz is unreachable and 20 players contradicts `runtime.maxPlayers` 16. Correct:
**211,200 / 563,200 / 844,800** = `1,760 × Hz × 16`. Performance's 225,600 and 601,600 are right in
method against the superseded 47-chunk bay.

## Ruling on the tick

At the bay the invariant is size-invariant: `40c ≤ 3.9637c / (2t)` reduces to **`t ≤ 0.04955`**
with the chunk count cancelling — I checked 41, 42 and 43. So **0.04 is unreachable and 0.05 fails
at every legal bay size**; the next reachable value 0.0334 costs 4× the shipped loop to buy what
Balance itself calls "nothing a player perceives". **Withdraw the request; take the `invariants[10]`
restatement.** Coupled: withdrawing it makes FAIL 2 mandatory, because the speed ceiling then stays
at 41.25 permanently.

## Round 2 status by check

1 PASS · 2 **PASS** · 3 PASS · 4 PASS · 5 **PASS** · 6 **PASS** · 7 PASS · 8 PASS. Two acceptance
criteria still false, both inside FAIL 2 and the tick ruling.

---

# Round 3

**Status: PASS.** The wave releases. All three round-2 requests are closed and closed correctly;
both round-2 pushbacks were upheld and their consequences carried through. Two items are recorded
rather than fixed, and neither meets either stopping-rule bar. The 3-round cap is spent and nothing
outstanding is a design disagreement — the outbound revision requests are the designed mechanism,
not unfinished work.

**Re-read in full:** `balance/02`, `03`, `04`, `05`. Every figure below is recomputed from the
manifests, not read off them.

## The `rungsBought` delta discrepancy — Balance is right, and so was I

I re-ran the greedy order from `costBase` 95/100/130 at growth 1.32 and it reproduces
`cumulativeSpend` **exactly at all eight rows**: 747 / 2,351 / 5,378 / 11,284 / 22,509 / 39,985 /
**64,099** / **101,803**. Purchase 45 lands at cum 64,099 leaving **v16 / r15 / s14**; purchase 46
costs 6,338 and needs cum 70,437.

That is the whole discrepancy. **Round 2's income(1..7) was 71,233, which covers 70,437, so the
buyer held 46 purchases at area 8 and the deltas were 6/7/7/7/7/6/6/4. Round 3's income is 70,017,
which does not, so the buyer holds 45 and the deltas are 6/7/7/7/7/6/5/5.** Neither list was
wrong; the ledger moved underneath when Vault 1.15 cut rows 7 and 8. One purchase migrated from
area 7 into area 8.

**And the derivation now generates the field, so I checked the rule rather than the list.** Summed
`arrivalLevels` are 0 / 6 / 13 / 20 / 27 / 34 / 40 / 45 / 50; consecutive differences are
**6 / 7 / 7 / 7 / 7 / 6 / 5 / 5**, summing to 50. `rungsBoughtDerivation` states exactly that, and
every published `rungsBought` matches it. The two fields can no longer diverge, which was the point.

**The boundary case is stated honestly.** S5 reads *"5 to 7 across the eight areas; the endless
bay's 4 sits AT the floor and not inside it"* — which is the correction I asked for, and it is now
more accurate than my own round-2 wording (the 4 moved from area 8 to the bay when the deltas
changed). Criterion 3 carries the same. Nothing is dressed up.

## Spot-checks

| what | result |
|---|---|
| income(1..7) = **70,017**, ratio **×3.73** | **PASS.** Rows 1–6 unchanged sum to 41,025; row 7 at 1,000 patches × 7.45 × 3.892 = 28,992; total 70,017 exactly. 260,898 / 70,017 = **3.726**. My independent estimate of row 7 came to 29,048 — a 0.08% gap that is the exact fractional position of five rungs inside the area, and it changes nothing: 16/15/14 falls out either way. |
| bay = **42 chunks** | **PASS, and it is the only legal value.** Window 142,583–162,290 (τ 3,802.2 and 1,622.9), geometric centre 152,118 → 42.25 → 42. I checked the neighbours: 41 gives a floor margin of 0.035 (under the 0.06 target) and 43 gives a ceiling margin of 0.046 (under the 0.05 target). 42 is forced. |
| bay against the 16-variant library | **The breach persists and is correctly carried.** 25 / 28 / 42 all exceed 8 × 2 = 16 variants, and 42 exceeds even `chunksPerFamilyRange`'s top of 16 per family (32). The request to `meta/05` names all three counts and both costed options (family → 21, or window R1 at 16). This is round-1 RR-7 still open **against its owner**, which is where it belongs; it is not Balance's to close. |
| binding margin **0.061** vs target 0.06 | **The constraint passes; the published figure is 0.0006 high.** maxAllowed = 302,400 / (1,312 × 75) = **3.07317**; withProduct = 1.656 × 1.75 = 2.898; margin = 3.07317 / 2.898 − 1 = **0.0604**. Every route agrees — the lap form gives 79.53 / 75 − 1 = 0.0604 too. So the true figure is **0.060**, not 0.061, and it appears as 0.061 in four places. It still clears the 0.06 target, by 0.0004. Recorded below, not failed. |
| area 8 arrival 16/15/**14** | **PASS — breaks nothing unnamed.** I checked every criterion that referenced the old values: `plots` criterion 3 (spawn ≥ 1,400 studs from the midpoint of the built lane — at 3,360 the midpoint is 1,680 and the spawn is 8, so **1,672 ✓**, and this was worth checking because the lane shrank); `meta/03` criteria 2 and 4; `setBonus`'s ceiling invariant (1.15 × 32.0 = 36.8 ≤ 37.125 ✓); `core-loop/02`'s set-bonus worth band (Vault at 1.15 is worth ≈3,900 base ticks against a 140 floor, nowhere near it); and `depths`, `endgame`, `products` and `monetization/03`, all of which are named in the request tables. |

**Other figures re-derived and confirmed:** row 7 τ 805.2 × 1.38 = 1,111.18 → 25 chunks / 90,000 /
1,000; row 8 τ 911.2 × 1.38 = 1,257.46 → 28 / 100,800 / 1,120; bay τ 1,051.2 × 1.656 = 1,740.79 →
173.7 s arrival, 186.3 s under-buy; swept cap 7.4545 × 1.656 = **12.345**, area 8 at 1,257.46 / 176
= **7.145**; `footprintCeilingStuds2` 200 × 1,312 × 1.656 / 2 = **217,267**; lane 120 + 150 + 210 +
300 + 450 + 540 + 750 + 840 = **3,360**; precision horizon (20,000 − 3,360) / 1,260 = 13.2, so the
14th endless bay, **bay 22**; joint-bound rows 7 and 8 at maxAllowed 2.98 and 2.95 against
withProduct 2.415; realised laps 135.9 / 152.3 / 136.3 for areas 6–8, giving 24/24 at
971.4 + 0.75 × 136.3 = **1,073.6 s** to the decimal; ratio 1,107.7 / 1,276.8 = **0.868**.

## Vault 1.15 and the ceiling

**99.1% is real.** Realised tick `ceil(0.12 × 60) / 60` = 0.13333; ceiling 5.5 / 0.13333 = 41.25;
bound 0.9 × 41.25 = 37.125; effective 32.0 × 1.15 = 36.80; **36.80 / 37.125 = 0.9912**. Set-factor
top 37.125 / 32.0 = **1.1602** → [1.10, 1.16] ✓, and `setBonus.axisHeadroom.speed` **1.160** ✓.

**Nothing else on the speed axis sits over its bound.** Speed carries one set factor and no
product, so the only other reachable point is the range top: 32.0 × 1.16 = 37.12 ≤ 37.125 ✓ — by
0.005, which criterion 3 states rather than hides. The axis now has effectively zero headroom, and
that is the honest consequence of a ceiling that is a function of a tick the design does not own.
Any later increase to `speed.perLevel` or `maxLevel`, or any second speed set factor, breaches it.

**Criterion 4 confirmed:** 36.80 × 0.13333 = **4.907 ≤ 5.5**, 10.8% of room, at the shipped tick.

## The tick, and Performance's `invariants[10]` finding

**Withdrawal accepted.** `clearTickRate` stays 0.12 and the restatement is the sole recommendation.

**Performance's independent finding is right, and stronger than it states.** At the realised
0.13333 the old bound is `lapSeconds / 0.26667`. Their 618.75 presumes a 165 s lap; `meta/04`'s
merged rows 5–8 print **157 s**, so the real bound is **588.75** against patch counts of
624/624/640/640. It fails either way and fails harder than reported. **The merged, shipped `depths`
already violates `invariants[10]` today** — and nobody saw it because every prior evaluation
divided by the nominal 0.12, where 157 / 0.24 = 654 passes. That makes the restatement **mandatory
rather than a convenience**, and it makes the withdrawal correct twice over: the tick change could
not have fixed the shipped rows either.

This is the single most important thing to carry out of wave 4, because it is a defect in an
already-approved wave-3 key that only surfaces under a wave-5 ruling.

## Loop cost — final state across the three sheets

`1,680 × Hz × 16`: **201,600** (7.5 Hz, shipped realised) · **537,600** (20 Hz) · **806,400**
(30 Hz). Arithmetic confirmed. Only the first is live, since the tick request is withdrawn.

`solvency.clearingLoopCost.note` names all three superseded figure sets by origin — Balance's own
880,000, my 211,200/563,200/844,800, and Performance's 225,600/601,600 — and says why each is
stale. That is the right form.

**They will not ship agreeing unless one edit is made outside this category.** Balance's sheet is
now correct and my rounds 1 and 2 are a dated verification record, which is fine. **Tech —
Performance's wave-5 sheet still carries 225,600 / 601,600 against a 47-chunk bay that no longer
exists**, and Balance cannot edit it. **Carried to wave 5 as a named item:** Performance restates
its loop-cost figures against `solvency.postTerminalBay.patchCount` 1,680 and `runtime.maxPlayers`
16, or reads them from `solvency.clearingLoopCost` rather than recomputing. One field, and it is
exactly the class of divergence the final cross-category pass would otherwise find at more cost.

## Recorded, not fixed — both below both bars

1. **The binding joint-bound margin is 0.0604, published as 0.061**, in the bay row, criterion 2,
   `postTerminalBay.derivation` and the requested `products.factorStatus` string. The correct value
   rounds to **0.060**. I considered failing on this, because round 1 failed criterion 1 for a
   stated equality that was false by 39, and consistency matters. I am not failing on it, for three
   reasons: the operative clause of criterion 2 (`withProduct ≤ maxAllowed`, 2.898 ≤ 3.073) is true
   and is what a predicate checks; the target is 0.06 and 0.0604 clears it, so no decision changes
   and the bay stays at its only legal size; and it meets neither stopping-rule bar. **It is a
   defect, not a disagreement, and the fix is to write 0.060 in four places when the sheet is
   adopted.** Worth knowing that the slack against target is 0.0004, not 0.001.
2. **`ladderExhausted` 1,569 s** is the one figure I could not reproduce closely — my estimate is
   ~1,535 s, a 2.2% gap driven by the bay's exit τ and the value multiplier inside a bay, neither
   of which is published. Not load-bearing for anything: it sits past 24/24, past area 8, and past
   the point any acceptance criterion reads.

## Final state by check

1 PASS · 2 PASS · 3 PASS · 4 PASS · 5 PASS · 6 PASS · 7 PASS · 8 PASS.

Universal invariants: no `[brief: binding]` contradiction; 4 checkable criteria per sheet, all true
except the 0.061 rounding recorded above; no priority-3 content; no capability outside the
registry; every `[research: url]` real and correctly limited; every `[cid: decided]` visible.

**Outbound revision requests, correctly formed and owned elsewhere** — these are the condition of
the *build*, not of this release: `depths` (8 rows, ceiling, criteria 2–3, `invariants[10]`
restatement — **mandatory, see above**), `layout` (25/28/42 against 16 variants, two costed
options), `endgame` (42 / 151,200 / 1,680 / 1,260 and `invariants[2]`), `plots` (bays, lane 3,360),
`setBonus` (Vault 1.15, per-axis ranges, headroom, criterion 2), `products` and `monetization/03`
(factor range, `factorStatus`, H1/H2 tables and criteria), `modifiers` (two `ceilingRule` fixes),
`firstSession` (beat range and the ordering note), `core-loop/04` (four to eight, arrival vs
realised), `tiers` (38/30/21/11), and `01-upgrade-ladder` (12 fields).

**Nothing outstanding is a design disagreement.** The wave argued three rulings, contained each in
a `## Pushing back`, and won all three on arithmetic I reproduced. Stage 4 releases.
