# Gameplay — verification, wave 3 (stage 3: Meta & Content · Monetization · Onboarding)

**Status: FAIL**

Stage 3 does not release. Four of the eleven sheets carry contradictions that a build would hit
on day one, and two of them are between wave-3 sheets written in the same wave against each
other. Three checks fail and one universal invariant fails. Nothing here is a taste argument:
every finding below is either a disjoint pair of manifest constraints or arithmetic I re-ran.

**Scope read in full this pass:** the 11 wave-3 sheets; `meta/_lead`, `monetization/_lead`,
`onboarding/_lead`; `_category.md` (scope gate); the four constraint sheets (`meta/01`,
`meta/02`, `onboarding/01`, and `_verified.md` wave 2); `core-loop/01`, `04`, `05`;
`systems/05`, `06`; `mechanics/02`, `06`; `social/01`, `02`; `theme/fantasy/02`,
`theme/setting/04`; `game/src/shared/GameConfig.luau`; `cid/_research/pack.md`;
`cid/_state.md` including R-1/R-2/R-3; the Build Capability Registry node in
`docs/cid-workflow.json`.

**The mechanical half was taken as clean per the wave brief and not re-run.** Everything below
is judgement or arithmetic. Where I depended on a number a sheet asserted, I recomputed it from
`GameConfig.luau` rather than trusting it — that is how findings 4, 8 and 9 were found, and it
is also how I confirmed that `meta/04`'s eight-row lap table is exactly right.

---

## What I recomputed and found correct

Stated first, because three of the four things the brief pointed me at survive the attack and
the wave should get credit for them.

**`meta/04`'s lap table is right, digit for digit.** I re-ran the greedy buyer from
`GameConfig.Upgrades` against `core-loop/05`'s formula, per area ordinal, with the 3,600-stud²
chunk quantisation from `meta/05`:

| row | arrival τ | ×base | min(165τ, 200τ_tol)/2 | floored | lap | one level behind |
|---|---|---|---|---|---|---|
| 1 | 176.00 | 1.00 | — (fixed at `area`) | 14,400 | **163.6 → 164** | — |
| 2 | 337.92 | 1.92 | 27,104 | 25,200 (7) | **149.2 → 149** | **186.0** |
| 3 | 492.80 | 2.80 | 40,656 | 39,600 (11) | **160.7 → 161** | **192.3** |
| 4 | 619.52 | 3.52 | 51,110 | 50,400 (14) | **162.7 → 163** | **190.9 → 191** |
| 5–8 | 732.16 | 4.16 | 60,403 | 57,600 (16) | **157.3 → 157** | **181.8 → 182** |

All eight arrival laps and all seven under-buy laps reproduce. Every chunk count, patch count
and density figure reproduces (`4/7/11/14/16` chunks × `35/37/39/40` patches = `140/245/407/518/624/624/640`).
Tick-saturation reproduces (`683/621/669/678/655`). Density is non-decreasing and strictly rises
at every depth step. The ladder-exhaustion figure reproduces: cumulative ladder cost **11,644**
against cumulative areas 1–7 income of **≈38,500**. `core-loop/01` criterion 2's surviving half,
`patchCount / relicsPerArea × secondsPerPatch >= 15`, evaluates to **54.7 / 49.7 / 53.6 / 54.2 /
52.5 / 52.5 / 52.5 / 52.5 s** against a 15 s floor — passes on every row, as claimed.

**R-2's duplicate problem is genuinely handled.** `meta/04`'s `relicSlice` partition ([1,3] and
[4,6] per depth) agrees with `systems/05`'s equality field by field: 3 × 2 == 6, no overlap, no
gap, no name in two places. `meta/05` R5/R6 keep the draw seed-only and player-independent, so
nothing re-places a name a player already holds. A mid-area rejoin resolves because placement is
`(layoutSeed, areaOrdinal)`-derived and `cleared` is keyed by `(ordinal, patchIndex)`. **I looked
for a re-placement path and there is none.** One field does disagree — see RR-12.

**`meta/03`'s set-bonus allocation fits its ceilings.** Terrace `value` / Cistern `radius` /
Vault `speed` / Spire `radius`. `radius`: ladderMax 14.3, ceiling `area.size/2` = 60, 0.9× = 54,
`Span` takes 1.75 → 2.158× left for two set factors; 1.2² = 1.44 fits. `speed`: ladderMax 25.6,
ceiling 5.5/0.12 = 45.83, 0.9× = 41.25 → 1.611× for one factor; fits. `value` has no ceiling and
takes one factor at depth 1, where a sink still exists (the ladder is 22% bought when Terrace
completes). `systems/06`'s `composition` and `resolutionOrder` do produce the numbers `03`
assumes: one clamp, after every source, factors multiplying on top of `upgradeEffect`. **The
carrier gap wave 2 recorded twice is closed by this key.**

**Every `[research: url]` in the wave resolves.** I checked all 24 distinct URLs cited across the
11 sheets against `cid/_research/pack.md` by hand. All present, including
`dig-it-roblox.fandom.com/wiki/Collection` — which `meta/_lead` records as 402 *this run* but
which carries a real earlier fetch at `pack.md:343`, so `meta/04`'s citation of it is legal.

---

## Check results

| # | check | result | evidence |
|---|---|---|---|
| 1 | every currency has at least one faucet and one sink | **PASS** | No wave-3 sheet adds a currency. `monetization/02` `F2` forbids selling it, `endgame.forbidden` includes `secondCurrency`. The sink dies at area 4 (`meta/04`), but `systems/04` already ruled that ("income continues, buys nothing") and `meta/04` states the fix as a Balance requirement with the figure attached rather than inventing a second sink. |
| 2 | every reward granted anywhere has a source system | **PASS** | Set bonus → `setBonus` (`meta/03`), which closes the carrier gap `_verified.md` recorded twice. Purchase factor → `products` (`monetization/01`) → `modifiers.sources[purchase]`. Post-terminal area completion → `endgame`. First Find → `onboarding` + `layout`. The one deliverable without an agreed source is `Span`'s "visibly wider tool head", and `monetization/01` states it as a requirement on `tool` with the owner named and a refusal path — the correct handling, not a gap. |
| 3 | every mechanic maps to a verb the control scheme supports | **PASS** | No wave-3 sheet adds a mechanic. `onboarding/02`'s arming gate is a server-side precondition on an existing pass, adds no remote and no verb. `meta/06`'s passage is `move`. The Robux-purchase trigger is an *input* question and is failed under check 4, not here. |
| 4 | no system requires an input the control scheme does not have | **FAIL** | `products` cannot be bought. `monetization/02` `F13` requires `PromptGamePassPurchase` fire only from "an explicit player activation of the store control"; `mechanics/02` states "Five verbs exist and there is no sixth" and fixes `gameDrawnPressables: 4`, asserted by its own criterion 2 and by `mechanics/03` `P2`. A store control is a fifth pressable and its activation is a sixth verb, so adding one fails two approved criteria and not adding one makes all three products unreachable. `monetization/01` records the collision in a `## Consequences` row and carries no `## Pushing back` and no `## Flagged` item for it, which is the escape hatch the narrowed check requires. See **RR-10**. |
| 5 | a value that IS the shape of a key the domain owns belongs in that key's manifest, `[playtest unknown]` with a test range | **FAIL**, 3 instances | (a) `plots.spawn.plotLocal: [0, 0, 8]` — the 8 is invented, is the shape of `plots`, carries no marker, no range and no derivation, and is the exact value that breaks the origin/spawn identity (**RR-7**). (b) `products.items[].factor` (1.5 / 2.0 / 1.75) carries no marker and no test range, while `priceRobux` — which the sheet argues at length is *less* Balance's than a factor — carries both a band and a `priceTestRange`. `Span`'s 1.75 is the single number that breaks `meta/04`'s rows 2 and 3 (**RR-9**). (c) `firstSession.armDistanceStuds: 2.0` is marked `[playtest unknown]` 1.0–4.0 in prose and lands in the manifest bare; `beats[].testRange` shows the sheet knows the form. **Clean by contrast:** `layout.chunksPerFamilyRange`/`Status` (`meta/05`) is exactly right, and `meta/04` discharges its footprints correctly by carrying `sizingRule` in the manifest so they are recomputable rather than asserted. |
| 6 | no sheet reserves space for, stubs, describes or specifies a priority-2 or priority-3 item | **PASS**, with the check itself contested | Every priority-3 item is named only to forbid it: `endgame.forbidden` (13 names), `monetization/02` `F5`/`F15`, `onboarding/03` `N1`/`N2`/`N8`, `firstSession.neverTaught`. Nothing is specced. **But the check's "reserves space for" clause fails `meta/05`, and it should not:** `meta/05` says priority 2's "richer authored chunk variety" needs no system change and "nothing further about it is described here", which is verbatim what `_category.md` explicitly permits ("A domain may state that its design leaves room for a priority-2 item **without specifying that item**"). The check and the category brief disagree. I am passing the sheet and escalating the check. |
| 7 | the loop closes: the last step feeds the first | **PASS** | Earn → spend → gain → deeper → earn. `meta/04`'s `unlockRule` closes area → area with no gate. `meta/03` feeds set completion back into throughput. `meta/07` closes past 24/24 with unlimited bays. `onboarding/02` beat 6 puts step 4 inside minute 1. **Two stated breaks, both owned:** the spend step is dead from area 4 (`meta/04` → Balance, with the requirement and the figure) and at 24/24 (`meta/07` → `systems/04`, already ruled). Neither is invented and neither is hidden. |
| 8 | no sheet contradicts a ruling in an approved sheet of an earlier stage without a `## Pushing back` naming that sheet | **FAIL**, 3 instances | (a) `meta/04`'s `unlockRule: "the area before it in this list is complete"` and criterion 4's `previousAreaComplete` are exactly the ruling `theme/setting/04` `W5` overruled ("the inward opening is passable whether the part is finished or not"). `meta/04` cites W5 *as supporting it*. No pushback (**RR-5**). (b) `meta/06` says "what stops a player walking inward before finishing is … the same boundary that bounds the lane laterally … and the player's own last clear is what removes it", one paragraph after asserting "`theme/setting/04` W3 and W4 are satisfied, not contested" — W3 requires two openings "always open … no barrier", W5's check is "count of conditions, checks, prompts, barriers or refusals attached to an opening: **0**". `meta/06` has no `## Pushing back` section at all (**RR-6**). (c) `meta/04`'s fixed per-ordinal `relicSlice` contradicts `discovery.theOnlyRandomQuantities[1]`, "the order in which a depth's slices are assigned to its areas" (**RR-12**). **Compliant by contrast:** `meta/04`'s pushback on `core-loop/01` criterion 2 and `core-loop/05` criterion 4 is exemplary — it names the sheet, the criterion, the half it keeps, and why the sheet it could *not* overrule instead is the one it left standing. |

---

## Universal invariants

- **No sheet contradicts a `[brief: binding]` item** — **FAIL, one instance.** `meta/04` rows
  5–8 hold `footprintStuds2` flat at 57,600 across the depth-3 → depth-4 step, which makes
  "**deeper areas are larger**, denser" `[brief: binding]` ← `[you chose: R3 Q2]` false between
  Vault and Spire. The sheet states this plainly in `## Why` ("Density rises and size does not,
  past area 5") and routes the fix to Balance, but carries no `## Pushing back` naming the brief
  line. Note that `core-loop/05` overruled only the *"time and patience"* half of that sentence
  and kept "larger and denser" verbatim, so this half is unpushed by anyone. **RR-13.**
- **2 to 4 acceptance criteria two people could not disagree about** — **PASS.** All 11 wave-3
  sheets carry exactly 4. Two are soft and noted below (`meta/05` criterion 3's "unless the seed
  drew it" cannot fail as written; `onboarding/03` criterion 3's "no string is imperative mood"
  is a judgement where its own `T1` gives a grep). Neither meets a stopping-rule bar. The
  adopted `meta/02` carries 5, out of scope and recorded.
- **No sheet specs content excluded by `03-META.md` priority 3** — **PASS.** See check 6.
- **No sheet names a capability absent from the Build Capability Registry** — **PASS.**
  `onboarding/04` requires `hud-overlay` to vary a readout's *presence* by state and states it
  as a default to change with the file named and the blocker raised — the second branch the
  registry node sanctions, and the same handling `mechanics/02`/`03` used for `PRESSABLE`. It is
  now the **second** load-bearing `ui-forge` change and still nobody owns scheduling it.
- **Every `[research: url]` corresponds to a real fetched source** — **PASS.** All 24 distinct
  URLs across the wave verified by hand against `cid/_research/pack.md`. Repo-path citations
  each name a file I opened.
- **Every `[cid: decided]` is flagged upward rather than buried** — **FAIL.** Seven of the
  eleven sheets carry `[cid: decided]` and have neither a `## Flagged to the developer` nor a
  `## Pushing back` section: `meta/03` (×2), `meta/05` (×3), `meta/06` (×1), `meta/07` (×2),
  `monetization/02` (×1), `monetization/03` (×2), `onboarding/03` (×4). Four sheets do it right
  (`meta/04`, `monetization/01`, `onboarding/02`, `onboarding/04`). Separately, **none of wave
  3's `[cid: decided]` tags has reached `cid/_state.md`**, whose open-questions section still
  lists wave 2's thirteen. Each tag is argued in its own `## Why`, so nothing is hidden — but
  there is no single place a developer can rule from, which is what "flagged upward" means.
  **RR-14**, one file.

---

## Revision requests

Fourteen. Each names one file, one problem, one fix. Ranked: 1–6 meet both stopping-rule bars;
7–11 meet one; 12–14 are invariant and provenance defects with one-line fixes.

### RR-1 · `cid/gameplay/meta/05-area-layout.md` — `spawnAdjacency` and `firstSession.placement` are disjoint; no value satisfies both

**Violates:** cross-sheet consistency inside the wave; a manifest-level contradiction between two
proposed keys about to be promoted together.
**Evidence:** `meta/05` R8 and `layout.spawnAdjacency` require the nearest patch centre be **at
least `movement.baseClearRadius`** and at most `baseClearRadius + minSpacing` from the spawn —
**[5.5, 11.5] studs**. `onboarding/02` `firstSession.placement.spawnToNearestPatchMaxStuds` is
**3.5**, with the formula `movement.baseClearRadius - firstSession.armDistanceStuds`, and its
criterion 3 asserts it. **The intervals are disjoint.** The two sheets solved the same problem
(the reveal firing with no input) two different ways: `meta/05` moved the patch out of radius,
which is precisely the alternative `onboarding/02` `## Flagged to the developer` names as (b)
and declines; `onboarding/02` kept the patch inside radius and disarmed the pass, and needs it
inside radius so "the reveal stays on the same tick as the first clear". `meta/05` never cites
`onboarding/02` and does not mention the arming gate.
**Fix:** replace R8 and `layout.spawnAdjacency` with
`{ "minStuds": 0, "maxStuds": "movement.baseClearRadius - firstSession.armDistanceStuds" }` and
delete the "a patch inside `baseClearRadius` at spawn clears with no input" argument from
`## Why`, citing `firstSession.armDistanceStuds` as what closes it instead. If you disagree with
the arming gate, the legal output is a `## Pushing back` naming `onboarding/02` and its criterion
3 — not a second, silently incompatible interval.

### RR-2 · `cid/gameplay/meta/05-area-layout.md` — the guaranteed first Find is placed against the wrong reference point

**Violates:** check 8 against `onboarding/01` (adopted, shipped, supplies `onboarding`).
**Evidence:** R7 and `layout.findPlacement.onboardingOverride.patch` both read "**nearest the
plot origin**", and `## Why` attributes that to `onboarding/01`. `onboarding/01` says "buried
under the patch nearest the **player's spawn**", and `firstSession.placement.ordering` is
"patches sorted ascending by XZ distance from the **plot spawn point**". Under the shipped build
these coincided. Under `meta/06` the spawn sits 8 studs inward of the plot origin, and at a
6-stud `minSpacing` with a 1.5-stud edge keepout the nearest-to-origin patch and the
nearest-to-spawn patch are routinely different patches. When they differ, the first patch the
player clears carries no Find, `firstSession.beats[firstReveal].precondition` is unmet, and the
brief's "the first patch **they clear** has something under it" `[brief: soft]` breaks.
**Fix:** change R7, `onboardingOverride.patch` and the `## Why` attribution from "the plot
origin" to "the plot spawn point", so `layout`, `onboarding` and `firstSession` all join on one
reference point.

### RR-3 · `cid/gameplay/meta/05-area-layout.md` — one-find-per-contiguous-group puts the second Find outside `firstSession`'s ordinal band on almost every seed

**Violates:** cross-sheet consistency; `onboarding/02` states the band as a requirement on "the
layout routine" and `meta/05` is that routine.
**Evidence:** `firstSession.placement.secondFindOrdinalMin: 8`, `secondFindOrdinalMax: 40`, in
spawn-distance order. `meta/05` R5 splits area 1's **4 chunks** into **3** as-equal-as-possible
contiguous groups and buries one find in each. Group 2 is therefore chunk 2 or chunk 3, i.e.
patch ordinals ~36–70 or ~71–105. Under a (2,1,1) split the second find cannot be below ordinal
71 at all; under a (1,1,2) split it lands in [8,40] only if the seed draws one of chunk 2's first
five anchors, ~14% of seeds. `onboarding/02` set the band for a stated reason ("at ordinal 130
minute 1's back half holds nothing above a currency tick"); the group rule reintroduces the tail
it was written to remove.
**Fix:** add to `findPlacement` a per-ordinal-1 constraint that group 1 ends at or before patch
index `firstSession.placement.secondFindOrdinalMax`, so group 2's draw falls inside the band; or
carry a `## Pushing back` naming `onboarding/02` and `secondFindOrdinalMax` and state what
replaces it. Do not leave two keys asserting incompatible placements.

### RR-4 · `cid/gameplay/meta/04-the-depth-ladder.md` — the product exposure is computed on the `value` axis only; the radius pass breaks rows 2 and 3

**Violates:** cross-sheet consistency with `monetization/03` `H2` and its criterion 4; and the
sheet asserts a bound that does not reproduce.
**Evidence:** `## Consequences` states "No combination of purchasable `value` multipliers may
reach **3.94x**" and "Areas 3 to 8 need 6.0x or more to be under-run and **no player can reach
that**, so this is a single-row exposure". I re-ran both claims.

- **3.94× does not reproduce.** A value multiplier `M` scales income, which advances the same
  greedy purchase order sooner in patches. Simulated: at `M` = 3 (the shipped `yield`×`measure`
  cap) a player reaches area 2 holding radius L5 / speed L5, τ = 528 (3.00×), lap **95.5 s** —
  safe. At `M` = 5, τ = 580.8 (3.30×), lap **86.8 s** — safe. At `M` = 7, τ = 675.8 (3.84×), lap
  **74.6 s** — first failure. The real value-only threshold is **≈7×, not 3.94×.** The stated
  bound is wrong in the safe direction, so the conclusion (3.0 is fine on `value` alone) happens
  to hold.
- **The radius pass is omitted entirely, and it is what breaks the table.** `Span` multiplies
  effective radius by 1.75, which multiplies τ directly and is not bounded by the 4.16× ladder
  cap. A player owning all three passes arrives at **area 2** with radius (5.5+5×1.1)×1.75 =
  19.25 and speed 24 → τ = **924 (5.25×)** → lap **54.5 s**. At **area 3** the ladder is maxed
  (inside area 2 at `M` = 3), so τ = 2×(14.3×1.75)×25.6 = **1281.3 (7.28×)** → lap **61.8 s**.
  Row 4 is 78.7 s and rows 5–8 are 89.9 s. **Two rows, not one, run under `core-loop/04`'s 75 s
  floor**, which is exactly the failure `monetization/03` `H2` and criterion 4 forbid.
- **It cannot be closed by resizing.** Row 2's footprint is already at its under-buy cap
  (27,104 raw, floored to 25,200). Raising it to the 34,650 the 75 s floor would need puts the
  one-level-behind lap at 255.7 s, past `core-loop/04`'s 200 s ceiling. There is no footprint
  that satisfies both.

**Fix:** replace the `value`-only bound with the binding one, computed against every product:
**`Π productFactors(radius) ≤ 1.27` at row 2** (and ≤ 1.44 at row 3, ≤ 1.84 at row 4, ≤ 2.10 at
rows 5–8), state that `Span` at 1.75 breaches it, and route the residue to `monetization/01`
under `monetization/03` `H4` ("reduce `products[].factor`") rather than to area sizing, since
resizing is arithmetically unavailable. Keep the row-1 figure (2.18×) and delete "no player can
reach that".

### RR-5 · `cid/gameplay/meta/04-the-depth-ladder.md` — `previousAreaComplete` is the passage condition `theme/setting/04` W5 struck, cited as if it endorsed it

**Violates:** check 8.
**Evidence:** `## Why` reads "**Gating: none** … `theme/setting/04` W5 ('there is nothing
there')". W5 does not say that. W5 says "**Nothing conditions passage.** The inward opening is
passable **whether the part is finished or not.** Walking on early forfeits the `Finds` under the
green you left … That is the only brake and it is patience, not a lock," with the check "count of
conditions, checks, prompts, barriers or refusals attached to an opening: **0**". `meta/04`'s
`unlockRule` ("the area before it in this list is complete") and criterion 4 ("every row's
`unlock` is the string `previousAreaComplete` … No row carries any other condition of any kind")
are that condition. `theme/setting/04` names the reversal as a one-line strike a later sheet must
*request* — "**Strike `W5`** → the inward opening is passable only when the part is finished" —
and it is a strike nobody has made.
**Fix:** add a `## Pushing back` section naming `theme/setting/04` and `W5`, stating that this
sheet takes the named strike, and issue the corresponding one-line revision request against
`theme/setting/04` (strike `W5`, keep `W1`–`W4` and `W6`). Note in it that the strike also
removes the multi-partial-part persistence cost W5 created, which is the argument in your favour.
Delete the mis-citation of W5 as support.

### RR-6 · `cid/gameplay/meta/06-plot-arrangement.md` — the bay boundary is a barrier in an opening W3 requires to be always open, and the sheet claims W3 satisfied

**Violates:** check 8, and the sheet contradicts itself two paragraphs apart.
**Evidence:** `## Why` asserts "**`theme/setting/04` W3 and W4 are satisfied, not contested.**
Every bay has exactly two openings, both always open, both holding nothing" — and in the same
bullet, "**What stops a player walking inward before finishing** is not a door: it is the same
boundary that bounds the lane laterally on every plot, and the player's own last clear is what
removes it." A boundary that removes itself on an event is a condition on the opening, which
`W5`'s check counts and requires to be zero, and it is not "always open", which `W3` requires.
`liveGeometry.bayBuiltAt: "the instant the previous bay's last patch clears"` is the same ruling
as data. The sheet carries no `## Pushing back` section at all.
**Fix:** add a `## Pushing back` naming `theme/setting/04` `W3` and `W5`, take the same strike
`meta/04` takes (RR-5), and add the barrier to the `plots` manifest as a named field
(`openings.gatedUntilPreviousBayComplete: true`) so it is data a later sheet cannot widen,
instead of a sentence that contradicts the claim two lines above it.

### RR-7 · `cid/gameplay/meta/06-plot-arrangement.md` — the 8-stud spawn offset is an unmarked invented literal, and it is what breaks the onboarding guarantee

**Violates:** check 5.
**Evidence:** `spawn.plotLocal: [0, 0, 8]`. The 8 is the shape of `plots`, is invented (no
derivation, no citation, no `[playtest unknown]`, no test range), and is the whole cause of RR-2:
the sheet then asserts "the plot origin is the mouth centre and the spawn is 8 studs from it, so
'the patch nearest the plot origin' and 'the patch nearest the spawn' are the same patch." That
identity does not hold at `minSpacing` 6 with `layout.chunk.edgeKeepoutStuds` 1.5 — a patch at
z = 1.5 is 6.5 studs from the spawn while a patch at z = 14 is 6.0, so the nearer-to-spawn patch
is the further-from-origin one. The claim is asserted, not derived.
**Fix:** either set `spawn.plotLocal` to `[0, 0, 0]` and delete the identity claim, or keep the
offset, mark it `[playtest unknown]` with a test range in the manifest, and replace the identity
claim with a stated requirement on `layout` that the nearest patch to the **spawn point** carry
the first Find (which is RR-2's fix from the other side). Do not leave a bare literal carrying an
untrue geometric identity.

### RR-8 · `cid/gameplay/meta/06-plot-arrangement.md` — co-presence is delivered for the first ~39 studs of the lane and never again

**Violates:** cross-sheet consistency with `social/02` `B1`–`B3` and its criteria 1 and 2, which
the sheet claims to satisfy.
**Evidence:** `## Why` asserts "At 122 studs, dead ahead, a body clearing its own ground is in
frame with no input, which is `social/02` (c)." That is true of a neighbour standing **at their
own spawn**. `social/01`'s field requirement is spawn-point to spawn-point and is satisfied
(122 ≤ 128). But `social/02`'s three perceptibles are a **body, in motion, whose ground is
visibly being cleared**, and its criterion 2 requires 10 seconds of that neighbour clearing to be
visible from A's spawn viewpoint. With pitch 122 against S = 128, the longitudinal budget is
`sqrt(128² − 122²)` = **38.7 studs**: a neighbour is within S only while they are inside
z ∈ [0, 46.7] of a lane that runs to **3,000**. A neighbour clearing bay 2 is ≥ 165.6 studs away;
bay 8 is ≥ 2,530. `liveGeometry` puts their patch instances in the live bay only, so there is
nothing of theirs to watch disappear either. **The game's only social system delivers for
roughly the first 40 studs of play.** The lane geometry is what created this — under a square
area a player never left a 170-stud diagonal of their own spawn.
**Fix:** state it in `## Consequences for other work` as an unclosed requirement naming
`social/02` `B2`/`B3` and criterion 2, with the 38.7-stud figure, and either (a) lower
`pitchStuds` to buy longitudinal room (at pitch 100 the budget is 79.9 studs) or (b) hand the
residue to `social/02` as a requirement it must re-derive against a lane rather than a square.
Do not leave "satisfied, not contested" standing against a criterion that holds for 1.6% of the
lane.

### RR-9 · `cid/gameplay/monetization/01-the-offer-ladder.md` — `Span`'s factor breaches this domain's own `H2`, and no product factor carries a test range

**Violates:** check 5; and `monetization/03` `H2` and its criterion 4, written by this domain.
**Evidence:** `products.items[].factor` = 1.5 / 2.0 / 1.75, each with a `priceTestRange` and no
`factorTestRange` and no `[playtest unknown]` marker — while `priceRobux`, which this sheet
argues at length is *less* Balance's than a factor, carries both a band and a range. The
consequence is not cosmetic: against `meta/04`'s shipped rows, a player owning all three passes
laps area 2 in **54.5 s** and area 3 in **61.8 s** against `H2`'s 75 s floor (arithmetic in
RR-4). `monetization/03` anticipated this generically ("43 s with `Span` as well") and assigned
the fix to area sizing; area sizing cannot take it, because row 2 is already at its under-buy
cap. Under `H4` the fix is therefore yours.
**Fix:** add `factorTestRange` and a `[playtest unknown]` marker to every `products.items[]`
entry, and set `Span`'s factor to the row-2 binding value **≤ 1.27** with the derivation stated,
or state in `## Flagged to the developer` that `Span` at 1.75 requires `core-loop/04`'s 75 s
floor to be contested for a purchaser and name who rules on it.

### RR-10 · `cid/gameplay/monetization/01-the-offer-ladder.md` — the ladder has no trigger, and the only key that could supply one forbids it

**Violates:** check 4 (narrowed).
**Evidence:** `F13` requires the prompt fire only from "an explicit player activation of the
store control". No store control exists: `mechanics/02` states "Five verbs exist and there is no
sixth", fixes `gameBoundInputClasses: ["pressable"]` and `gameDrawnPressables: 4` (one per
`upgrades[]` entry plus the index opener), and **both `mechanics/02` criterion 2 and
`mechanics/03` `P2` assert that count** precisely so a later sheet cannot widen it. So a store
control fails two approved criteria, and no store control means no product in this key can ever
be bought. The sheet records this in a `## Consequences` table row ("Whether a store control is a
sixth pressable is escalated with `mechanics/02`, not assumed here") and nowhere else — it is not
in `## Flagged to the developer`, which carries three other items.
**Fix:** add a fourth row to `## Flagged to the developer` naming the collision, quoting
`input.gameDrawnPressables: 4` and `mechanics/02` criterion 2, and ranking the alternatives you
can see (a fifth pressable widening `input`; the store reached through the existing index
pressable's screen; no store at all). This is the same escalation shape `mechanics/02` used for
the input overrule and it is what makes the ladder's unbuyability visible to a ruling rather than
to a builder.

### RR-11 · `cid/gameplay/monetization/01-the-offer-ladder.md` — `headroom.ceilings.radius` reads a field no key supplies past depth 1

**Violates:** key-shape consistency; blocks promotion of `products` against `depths`.
**Evidence:** `products.headroom.ceilings.radius` is `"min over depths of (area.size(N) / 2)"`.
`area` is a **single object** with one `size`, for depth 1 only. `depths` deliberately carries no
dimension — `meta/04` `## Consequences`: "**This key carries no dimension**, only ground area,
because the shape of that ground is an arrangement decision and carrying it twice is how two keys
diverge." The per-area dimension now lives in `plots.laneWidthStuds` (120) and
`plots.bays[].lengthStuds`. So `area.size(N)` for N > 1 resolves to nothing, and a schema author
promoting these keys together cannot write the check. Same class of defect in the same block:
`headroom.ladderMax` is written `"upgrades[A].base + …"` where `upgrades` is an array keyed by
`id`, not by axis.
**Fix:** change `ceilings.radius` to `"plots.laneWidthStuds / 2"` (numerically identical at 60,
and now defined at every depth) and rewrite `ladderMax` as a lookup by `upgrades[].id == A`.
Note in `## Consequences` that the ceiling's *reason* in `systems/06` ("one position clears the
whole area") was written for a square and now bounds a lane's width rather than an area's extent.

### RR-12 · `cid/gameplay/meta/04-the-depth-ladder.md` — `relicSlice` is fixed per ordinal; `discovery` says that assignment is random

**Violates:** check 8, against `systems/05` (approved stage 2).
**Evidence:** `depths.areas[].relicSlice` hard-codes [1,3] for the East area and [4,6] for the
West at every depth, and `layout.findPlacement` reads it as fixed ("group g carries
`depths.areas[k].relicSlice[0] + g − 1`"). `discovery.theOnlyRandomQuantities` lists exactly two
items, the second of which is "**the order in which a depth's slices are assigned to its
areas**". A builder holding `discovery` seeds that assignment; a builder holding `depths` reads a
table. Both are entitled to trust their key.
**Fix:** either state in `## Pushing back` that this sheet fixes the assignment and issue the
one-line revision against `systems/05` removing that entry from
`discovery.theOnlyRandomQuantities`, or replace the literal slices with
`"seeded by (layoutSeed, depth)"` and keep the partition invariant. One of the two — not both
keys asserting different things about the same draw.

### RR-13 · `cid/gameplay/meta/04-the-depth-ladder.md` — "deeper areas are larger" is made false at the depth-3 → depth-4 step with no pushback

**Violates:** the universal invariant on `[brief: binding]` items.
**Evidence:** rows 5–8 all hold `footprintStuds2` 57,600, so East Vault (depth 3) and East Spire
(depth 4) are the same size. `03-META.md`'s "**depth is progression — deeper areas are larger,
denser**, and hide rarer sets" is `[brief: binding]` ← `[you chose: R3 Q2]`, and `core-loop/05`'s
`## Pushing back` kept that clause **verbatim** while overruling only the "time and patience"
half. So the "larger" half is unpushed by anyone and this table falsifies it.
**Fix:** add to `## Pushing back` a third entry naming `03-META.md`'s "deeper areas are larger,
denser" `[brief: binding]`, stating that only "denser" survives from area 5 onward, that the
cause is the 4.16× throughput cap and not a design choice, and that the requirement already
stated to Balance (`Σ upgradeCost > cumulative income of areas 1–7`) is what restores it. This is
a documentation fix, not a design change — the argument is already in `## Why` and only the
section is missing.

### RR-14 · `cid/_state.md` — wave 3's `[cid: decided]` questions are not flagged upward anywhere

**Violates:** the universal invariant "every `[cid: decided]` tag is flagged upward rather than
buried".
**Evidence:** seven wave-3 sheets carry `[cid: decided]` with neither a `## Flagged to the
developer` nor a `## Pushing back` section (`meta/03` ×2, `meta/05` ×3, `meta/06` ×1, `meta/07`
×2, `monetization/02` ×1, `monetization/03` ×2, `onboarding/03` ×4 — fifteen decisions). Each is
argued in its own `## Why`, so nothing is concealed, but `cid/_state.md`'s "Open `[cid: decided]`
questions for the developer" section still lists only wave 2's thirteen. A developer reading the
state file sees none of wave 3's calls.
**Fix:** add a wave-3 block to `cid/_state.md`'s open-questions section listing the four that
most want a ruling. My nominations, in order: **(a)** passage is now gated on completion, against
`theme/setting/04` W5 (RR-5/RR-6) — this reverses an approved wave-1 ruling and changes what
persistence has to store; **(b)** the areas are lanes and co-presence expires 40 studs in
(RR-8); **(c)** `speed` is not sold and `radius` carries two set factors plus a pass, which
spends the last axis with headroom (`meta/03` + `monetization/03`); **(d)** `/ 24`, the
collection panel and all three upgrade rows are absent at second zero (`onboarding/04`, which
already flags it in-sheet but which changes the first frame of the game).

---

## Predicted cross-category conflicts

Recorded for the final pass. Not failures now.

- **`input.gameDrawnPressables: 4` is a constant and `onboarding/04` makes it a variable.**
  Criterion 1 requires all three upgrade rows have "no instance in the PlayerGui at all" at the
  first frame, so the realised pressable count at join is 1. `mechanics/02` criterion 2 and
  `mechanics/03` `P2` assert 4. Both are satisfiable if the 4 is read as a declaration rather
  than a runtime count, and no sheet says which. UI/UX inherits it.
- **The saved position `core-loop/04` criterion 4 requires is world-space in a world where slots
  move.** `social/01` gives a rejoining player "any-free" slot, and `plots.slotOrigin` is a
  function of slot index, so a stored world position lands in someone else's lane. `meta/06`
  states the spawn in plot-local coordinates, which is the right convention, but no sheet states
  that the *saved* position is plot-local. Persistence and Tech & Data inherit it.
- **`endgame` and `plots` both extend past bay 8 and only one of them has a bound.** `meta/07`
  makes the post-terminal run unlimited; `meta/06` carries `[research owed: Roblox part-precision
  and streaming behaviour for anchored parts beyond roughly 20,000 studs from the origin]` and
  assumes it is not a problem inside 3,000. At 480 studs a bay, bay 42 crosses 20,000. Tech &
  Performance inherits a lane that must eventually rebase.
- **`setBonus.invariants[4]` and `products.headroom.H1` state the same inequality at two
  strictnesses.** `setBonus` says "under that axis's `systems/06` ceiling"; `H1` says
  `≤ 0.9 × ceiling`. `H1` subsumes it, so nothing breaks, but a schema author will write two
  checks unless told which is canonical. Stage 4 and contract-and-seam work.
- **`relicSlice` has two shapes.** `depths.areas[].relicSlice` is an inclusive `[start, end]`
  range; `endgame.postTerminalArea.relicSlice` is `[]`. A validator written for a range will not
  accept the empty list without an explicit "no slice" case.
- **`plots.invariants[0]` compares a scalar to an object.** `pitchStuds <=
  social.maxCoPresenceSeparationStuds`, but that field in `social` is an object carrying `value`,
  `testRangeStuds` and `measuredAt`. The check needs `.value`. Same in `plots.pitchRule`.
- **`plots.pitchStuds: 122` and `plots.pitchRule` cannot both be honoured.** The rule is
  `laneWidthStuds + the inter-plot boundary's thickness, which traversal owns`, capped at 8. The
  literal 122 pins the thickness at 2, which no key states. If traversal picks any other legal
  value the two disagree. Also note `meta/06` takes `mechanics/06`'s 12-stud walkable margin to
  zero — legitimately, since `mechanics/06` offered it — but `traversal.walkableMarginStuds: 12`
  has not actually been revised, and if traversal declines, pitch becomes ≥ 144 and
  `meta/06` criterion 1 fails outright.
- **`Span`'s deliverable still depends on a `tool` change nobody has agreed.** `monetization/01`
  criterion 4 fails a build where the head width does not move, and `mechanics/04` `T11` says
  width moves with the Reach axis alone. Stated correctly with a refusal path; nobody owns the
  ruling.
- **Balance & Tuning now inherits five sheets' constraints on one curve**, up from three:
  `core-loop/05`'s arrival-under-cap, `systems/04`'s ladder band, `meta/04`'s
  `Σ upgradeCost > income(areas 1–7)`, `monetization/03`'s `H1`/`H2`, and `meta/03`'s two-factor
  radius join. It should be handed all five at once.

---

## Noted, deliberately not acted on

Each meets neither stopping-rule bar.

1. **`meta/03`'s speed-headroom derivation drops the 0.9 margin.** "45.83 against a ladder
   maximum of 25.6, leaving 1.61x" — that quotient is 1.79; 1.61 is `0.9 × 45.83 / 25.6`. The
   figure is right as cited from `monetization/03` and the conclusion (four sets at ×1.2 do not
   fit) holds under either reading.
2. **`meta/03`'s "roughly half the ladder unbought" at Terrace completion is 78%.** Cumulative
   spend at the end of area 2 is 2,607 of 11,644. The argument (a `value` grant at depth 1 has a
   sink) is stronger than stated, not weaker.
3. **`meta/04`'s "patch 322 of area 4" is patch 320 in my run**, from rounding whole patches at
   each purchase. Cumulative patch 1,112 matches `core-loop/05` exactly.
4. **`meta/05`'s case against a 60-stud chunk does not reproduce under its own flooring rule.**
   "A 60-stud chunk overshoots row 2's cap by 6% and fails that sheet's 200 s check" is true if
   the footprint is *rounded* to the chunk grid (28,800, 6.3% over, 212.5 s one level behind) and
   false if it is *floored*, which is what `meta/04` specifies (21,600, 159.4 s). The chosen
   value of 30 studs is legal either way; only the justification is off.
5. **`meta/05` criterion 3's second half cannot fail as written.** "in areas 2 to 8 the group-1
   find is not on that patch **unless the seed drew it**" is satisfied by any placement. The
   intent (the override applies at ordinal 1 only) is unambiguous from R7.
6. **`onboarding/03` criterion 3 asks a verifier to judge mood.** "no string is imperative mood"
   is a judgement; the sheet's own `T1` gives the mechanical form ("no player-facing string's
   first word is a bare verb"). Criterion 3 should quote `T1`.
7. **`meta/02` carries 5 acceptance criteria** against the 2-to-4 invariant. Adopted, shipped,
   revised by R-2, explicitly out of revision scope this wave. Recorded so the next pass does not
   read it as new.
8. **`meta/01` criterion 3 does not hold at shipped values.** "A full clear of this area yields
   between 700 and 1,200 currency at upgrade level 0" — 140 patches × the weighted per-patch
   value of 3.68 is **515**. Adopted, shipped, out of scope, and no builder diverges because the
   figure is derived from keys that already exist. Recorded because nobody appears to have run it.
9. **`monetization/01`'s premium price argument survives its own non-goal rule.** 499 is
   justified on ladder shape and observed ceilings, with the revenue-concentration argument for
   999–4,999 explicitly declined on `00-CORE.md` grounds. I looked for a revenue argument
   smuggled in and did not find one.

---

## The checklist itself

**Check 6 is too wide by one clause and should be narrowed.** As written it fails
"reserves space for … a priority-2 item", but `_category.md` — the brief these writers work from
— explicitly permits it: "A domain may state that its design leaves room for a priority-2 item
**without specifying that item**." `meta/05` does exactly that and nothing more. Two documents
give the writer opposite instructions and the sheet followed the one addressed to it.

**Recommended narrowing:** "no sheet **describes or specifies** a priority-2 or priority-3 item.
Naming one in order to forbid it is compliant, and stating that a design leaves room for a
priority-2 item without describing it is compliant." Under that wording `meta/05` passes on its
own text and nothing else in the wave moves. Wave 2's narrowing of this check fixed the
"naming to forbid" half; this is the other half of the same defect.

Everything else on the list did its job. **Check 8, added by wave 2, is the highest-yield check
in the set** — three of this wave's fourteen findings are check-8 findings, and all three are
cases where a sheet cited an approved ruling *as support* while contradicting it. That failure
mode is invisible without the check.

---

## What must happen before this category can release

1. **RR-1, RR-2 and RR-3 land.** Three edits to `meta/05`, all reconciling `layout` with
   `firstSession` and `onboarding`. These are the ones that block key promotion: three keys
   currently disagree about where the first Find is and how far the nearest patch sits.
2. **RR-4 and RR-9 land together**, as one decision seen from two sides. The arithmetic says the
   fix cannot be area sizing, so `Span`'s factor moves or the 75 s floor is contested for a
   purchaser. Whichever is chosen, both sheets change.
3. **RR-5 and RR-6 land**, and the `theme/setting/04` `W5` strike is actually requested. Until
   it is, an approved wave-1 sheet and two wave-3 sheets describe two different games at the
   opening between areas, and persistence is being told two different things about how many
   partial areas exist.
4. **RR-7, RR-8, RR-10, RR-11, RR-12, RR-13 land.** Six single-section edits with no design
   argument in any of them except RR-8, which needs a number chosen.
5. **RR-14 lands**, so the developer can rule on wave 3 from one page.
6. **The check-6 narrowing is accepted or rejected.** If rejected, `meta/05`'s priority-2 line
   comes out and `_category.md`'s permission should be struck to match.

**Can wave 4 proceed?** No. Balance & Tuning is the domain that inherits every number in
dispute here — `Span`'s factor, the four set factors against two ceilings, `maxLevel` against
both the ladder-exhaustion requirement and the "deeper areas are larger" restoration, and the
lap band a purchaser currently under-runs. Spawning it against a stage-3 that has two sheets
asserting incompatible geometry and one asserting an unreachable purchase would produce a tuning
pass that has to be redone. Items 1–3 are the gate; items 4–5 can land in the same round.
