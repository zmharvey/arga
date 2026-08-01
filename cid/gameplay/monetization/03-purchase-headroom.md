# 03 — Purchase headroom

**Domain:** gameplay/monetization · **Category:** Gameplay · **Wave:** 3 · **Revised:** wave-3
verification RR-4 / RR-9 / RR-11, and the `[cid: decided]` invariant

## Decision

**Two inequalities bound a purchase, not one. `H1` caps the axis: `ladderMax × Π setFactors ×
Π productFactors ≤ 0.9 × ceiling`. `H2` caps the lap: `2 × footprint(N) / τ(N) ≥ 75 s` at every
area ordinal, with τ computed for a player owning every product — and `H2` is joint across `radius`
and `speed`, not per-axis. `H2` is the binding one and my first draft did not carry it as data.**
Purchases are still sized last and reduced first; the ceiling budget never rises. When a purchase
stops applying, **the player is shown nothing.**

## Why

**This sheet carries no manifest block.** Its constraints are the value of `products.headroom`,
supplied inside sheet `01`'s proposed `products` key. One key per subject.

**What I got wrong, stated first.** The first draft named the lap floor in prose ("43 s with `Span`
as well") and then routed the fix to area sizing. Wave-3 verification RR-4 showed area sizing cannot
take it — area 2's footprint is already at its under-buy cap, and raising it to the 34,650 the floor
would need puts the one-level-behind lap at 255.7 s, past `core-loop/04`'s 200 s ceiling. **There is
no footprint that satisfies both.** Under my own `H4` the fix was always mine, and the draft failed
to carry the lap floor as an evaluable term, so nothing could check it. That is the defect this
revision closes: `H2` is now data, with a per-ordinal table and an explicit statement of what
invalidates it.

**The two bounds are not the same bound, and `H1` is not the tight one.** `H1` is a physical clamp
from `gameplay/systems/06`: exceed it and the clamp silently absorbs what a player paid for. `H2` is
a pacing floor from `core-loop/04`: satisfy `H1` comfortably and still hand a purchaser a 54-second
lap. At shipped values, after `meta/03`'s set factors, radius has **1.50× of `H1` residue** and the
throughput axes together have **1.14× of `H2` residue**. `H2` binds. A sheet that checked only `H1`
would have passed the ladder that broke `meta/04`.

**`H2` is joint across `radius` and `speed`, and that is the correction that matters most here.**
τ is `2 · radius · speed`, so a product factor on either axis multiplies it identically. The
per-ordinal bound is therefore on `Π productFactors(radius) × Π productFactors(speed)` as one
quantity — 1.99 at ordinal 2, the binding row. `Span` at 1.75 spends it down to **1.14×**, and that
is the whole budget any further throughput product would have to fit inside, on either axis. My
first draft's per-axis framing would have let a radius pass and a speed pass each pass their own
check and break the lap together.

**How a value factor reaches τ, which is why the bound is not per-axis in the other direction
either.** A value factor multiplies τ *indirectly*: more income advances the greedy purchase order,
so the player arrives at each area holding higher ladder levels. At a combined value factor of 3.0
the area-2 arrival moves from radius L3 / speed L2 to L5 / L5, τ 337.92 → 528, and the ordinal-2
bound falls from **1.99 to 1.27** (verified wave 3). The three axes are not three budgets.
`headroom.H2_lapFloor.valueFactorWarning` states this in the key so the next sheet adding a
multiplier cannot miss it. `[cid: decided]`, flagged below.

**`H2` is one-sided and that is worth carrying as a field.** Every product factor is ≥ 1 and every
factor shortens a lap, so a purchase can breach the 75 s floor and can never approach the 200 s
ceiling. Checking both directions on a product is wasted work; `ceilingAtRisk: false` says so.

**What the axis ceilings say at shipped values, against `meta/03`'s actual allocation.** `value` has
no ceiling — `gameplay/systems/06` clamps radius and speed and names no third, and
`gameplay/systems/04` fixes that income at max ladder is "neither capped nor hidden". `radius`:
`meta/03` puts two set factors at ×1.2 (Cistern, Spire) and `Span` takes 1.75, so 14.3 × 1.44 × 1.75
= 36.0 against 54 — **1.50× of `H1` left.** `speed`: `meta/03` puts one factor at ×1.2 (Vault), so
25.6 × 1.2 = 30.7 against 41.25 — **1.34× of `H1` left.**

**So why is `speed` not sold, given it has 1.34× of `H1` room?** Because `H2` is joint and `Span`
already spent the throughput budget: after 1.75 of the ordinal-2 bound of 1.99, **1.14× is all that
remains for any further product on either throughput axis**, and a ×1.14 pass is not something to
charge for. That is a stronger and narrower reason than my first draft gave, which argued from a
hypothetical four-set speed allocation `meta/03` did not make. The hypothetical still matters as a
warning about the axis rather than about a product: **four sets at ×1.2 on speed would be 25.6 ×
2.07 = 53.0 against 41.25 and would clamp the set bonuses with no purchase involved.** `meta/03`
allocated one, so it holds today.

**RR-11, the dangling reference.** `ceilings.radius` read `area.size(N) / 2`. `area` is a single
object carrying one `size`, for ordinal 1 only, and `depths` deliberately carries no dimension, so
`area.size(N)` for N > 1 resolved to nothing and no schema author could write the check. It now
reads **`plots.laneWidthStuds / 2`** — numerically identical at 60 and defined at every ordinal.
`ladderMax` is a lookup by `upgrades[].id == A` rather than `upgrades[A]`, which was never a valid
index into an array. **One thing changed with the field and should not pass unremarked:**
`systems/06` justified the radius ceiling as "one position clears the whole area", written when an
area was a square. It now bounds a **lane's width**, not an area's extent, and along the lane there
is no ceiling at all. The bound is still correct and its reason is now narrower than its author
wrote it.

**The failure rule, all three branches, with the gap RR-4 exposed now closed.** Reduce a factor:
always first — and **which** factor is now stated as `H9`, because `H4` alone did not say, which is
how wave 3 shipped three passes that broke a lap floor. Drop the axis: when its residue is not worth
charging for, as with `speed`. **Raise the ceiling budget: never on this domain's request.** A
monetization sheet that grew an axis ceiling so a pass would fit would be buying its own product
with someone else's design.

**What the player is shown when a purchase stops applying: nothing, in either case.** The
clamp-absorbed case is ruled impossible by `H1` plus `H7`, so there is nothing to show. The refund
case — `gameplay/systems/06` recomputes from live ownership at every join rather than latching, so a
revoked pass silently lowers an axis — gets **no notice, no toast, no modal, no re-prompt.** Under
R-4 there is not even a store row to change state. `theme/fantasy/03` `C3` fixes that nothing here is
ever taken back, and nothing is: every Shard earned stays, every Find stays, every cleared patch
stays cleared. A *rate* returns to its unpurchased value, which is the one thing here that was never
a possession. `[cid: decided]`, flagged below.

| axis | ladderMax | ceiling | 0.9 × ceiling | set factors (`meta/03`) | product factor | `H1` residue | sold |
|---|---|---|---|---|---|---|---|
| `value` | — | none (`gameplay/systems/04`) | — | 1 × ×1.2 (Terrace) | none | unbounded | no — reaches τ through arrival levels, and `H2` is what pays for them |
| `radius` | 5.5 + 8×1.1 = 14.3 | `plots.laneWidthStuds / 2` = 60 | 54 | 2 × ×1.2 = 1.44 (Cistern, Spire) | 1.75 | 1.50× | **yes** |
| `speed` | 16 + 6×1.6 = 25.6 | `movement.baseClearRadius / serverTickSeconds` = 5.5 / 0.12 = 45.83 `[research: game/src/shared/GameConfig.luau]` | 41.25 | 1 × ×1.2 (Vault) | none | 1.34× | no — `H2`'s joint residue after `Span` is 1.14×, which is not worth charging for |

| ordinal | arrival τ | footprint | max `Π productFactors(radius) × Π productFactors(speed)` at the 75 s floor | lap at 1.75 |
|---|---|---|---|---|
| 1 | 176.00 | 14,400 | 2.18 | 93.5 s |
| 2 | 337.92 | 25,200 | **1.99 — binding** | **85.2 s** |
| 3 | 492.80 | 39,600 | 2.14 | 91.8 s |
| 4 | 619.52 | 50,400 | 2.17 | 93.0 s |
| 5–8 | 732.16 | 57,600 | 2.10 | 89.9 s |

| # | rule | form |
|---|---|---|
| `H1` | Axis-ceiling inequality, every axis with a ceiling, every ordinal | `ladderMax(A) · Π setFactors(A) · Π productFactors(A) ≤ 0.9 · ceiling(A, N)` for all `N`. **Canonical** — `setBonus.invariants[4]` states the same bound without the margin and `H1` subsumes it; a schema author writes `H1` only |
| `H2` | Lap-floor inequality, every area ordinal, τ computed for a player owning **every** product | `ROUTE_SLACK · depths.areas[N−1].footprintStuds2 / τ(N) ≥ 75 s`, where `τ(N) = 2 · (arrivalRadius(N) · Π productFactors(radius)) · (arrivalSpeed(N) · Π productFactors(speed))` |
| `H2a` | `H2` is **joint** across `radius` and `speed` | The bound is on the product of every product factor on both throughput axes, as one quantity. A radius pass and a speed pass each passing their own check can still break the lap together |
| `H2b` | `H2` is one-sided | Every product factor is ≥ 1, so a purchase only ever shortens a lap. The 200 s ceiling is never at risk from a product and is not checked against one |
| `H2c` | `H2`'s per-ordinal bounds are conditional on the value factor | The table above is valid **only** at `combinedFactorCap.value == 1.0`. Adding any value product requires re-running the greedy purchase order against `upgrades[]` and re-deriving the whole table; at a combined value factor of 3.0 the ordinal-2 bound is 1.27 |
| `H3` | Sizing order | `upgrades` → set factors → footprints and the tick rate → **products last** |
| `H4` | Failure branch 1 | `H1` or `H2` fails → reduce a `products[].factor` until both hold |
| `H5` | Failure branch 2 | The residue at the worst ordinal is not worth charging for → the axis is not sold |
| `H6` | Failure branch 3 | The ceiling budget rises: **never on this domain's request.** Owners: `upgrades[].maxLevel`/`perLevel` (Balance & Tuning), `plots.laneWidthStuds` and `depths.areas[].footprintStuds2` (Meta & Content), `serverTickSeconds` (architecture), set factors (Meta & Content, then Balance) |
| `H7` | The clamp may never absorb a purchase | `min(computed, ceiling) == computed` with every product owned, at every ordinal |
| `H8` | Loss disclosure | None. No notice, toast, modal, prompt or copy anywhere acknowledges a purchase-sourced modifier being absent |
| `H9` | Which factor gives way under `H4` | The factor on the axis the brief does not name as open. The brief names the premium SKU, whose shape is a radius item, so **radius is reduced last** |

## Consequences for other work

| subject | what this forces or forbids |
|---|---|
| Area-sizing and depth-ladder work (`meta/04`) | `H2` is the evaluable form of the bound RR-4 asked you to state, and it lives in `products` rather than `depths`, so you assert no product exposure at all. Your eight footprints are inputs to it and do not move. If any footprint or arrival level changes, the per-ordinal table must be re-derived and `Span`'s factor re-checked against it. |
| Set-bonus work (`meta/03`, with Balance for magnitudes) | Your allocation fits both bounds: radius 14.3 × 1.44 × 1.75 = 36.0 ≤ 54, speed 25.6 × 1.2 = 30.7 ≤ 41.25. **Two live warnings.** Adding a third radius set factor at ×1.2 gives 43.2 ≤ 54 and still fits; a fourth does not. Moving any set factor onto `speed` such that they multiply above 1.61 clamps the set bonuses with no purchase involved. `H1` is canonical over `setBonus.invariants[4]` — same inequality, two strictnesses, write one. |
| Balance & Tuning | `H1` and `H2` are predicates over values you own and this sheet sets none of them. Moving `upgrades[].maxLevel`, `perLevel` or `base` moves both `ladderMax` and every arrival level, so it moves both bounds at once. You now inherit five sheets' constraints on one curve; `H6` names you so nobody reads this as a request to raise a cap. |
| Architecture (owner of the tick rate) | The speed ceiling is `movement.baseClearRadius / serverTickSeconds`, shipped literal `GameConfig.ClearTickRate = 0.12`. Halving it doubles the speed `H1` budget — but not the `H2` budget, which is where speed actually died, so it would not by itself reopen selling `speed`. |
| Plot-arrangement work (`meta/06`, owner of `plots`) | `plots.laneWidthStuds` is now read by `products.headroom.H1` as the radius ceiling. Lowering it lowers a purchase's ceiling; at a 120-stud lane the ceiling is 60 and `Span` plus two set factors use 36.0. Stated because the field acquired a consumer it did not have. |
| Contract-and-seam work (owner of `bridge/schema.mjs`) | `H1` and `H2` are two arithmetic checks over the merged manifest and are the only things standing between a paid product and either a silent clamp or a 54-second lap. Both now reference fields that exist at every ordinal (RR-11). Until `products` is shaped, both are acceptance criteria a human runs. |
| Store-surface and feedback-UI work | `H8` forbids a surface you might otherwise assume is owed, and under R-4 there is no store row either. No expiry notice, no "reactivate" affordance, no state anywhere. |

## Acceptance criteria

1. `H1` evaluates true for every axis with a ceiling at every ordinal against the merged manifest.
   At shipped values: radius `14.3 × 1.44 × 1.75 = 36.0 ≤ 54`, speed `25.6 × 1.2 = 30.7 ≤ 41.25`.
2. `H2` evaluates true at every area ordinal with every product owned. At shipped values the laps
   are 93.5 / 85.2 / 91.8 / 93.0 / 89.9 / 89.9 / 89.9 / 89.9 seconds, all at or above 75.
3. `products.axesNotSold` contains `"speed"` and `"value"`, and neither appears in any
   `products.items[].axis`.
4. The build contains zero strings matching
   `/expired|no longer own|refund|you lost|reactivate|repurchase|renew/i`, and zero notice, toast or
   modal code paths triggered by a purchase-sourced modifier being absent.

## Flagged to the developer

| item | position |
|---|---|
| **The 0.9 margin on `H1`** | `[cid: decided]`, `[playtest unknown]`, starting value 0.9, test range 0.80–0.95. Every input to `H1` is owned elsewhere and none is final; ten percent means a later change of up to a tenth in any one input does not silently start clamping something a player bought. It is a reservation, not a safety factor, and it costs `Span` nothing today. |
| **`H8`: nothing is shown when a purchase stops applying** | `[cid: decided]`. The brief is silent and so is every merged sheet. The alternative is a notice saying a pass is gone, which `theme/tone/04` `D12` and `theme/fantasy/03` `C3` both argue against, and which under R-4 has no surface to appear on. If you want a player told, it needs a surface that does not exist and a ruling that contests `C3`. |
| **`H9`: radius is reduced last** | `[cid: decided]`. `H4` said "reduce a factor" and did not say which, which is how wave 3 shipped three passes that broke a lap floor. The tie-break is the brief's own open item, and it is what removed the two value passes rather than shrinking `Span` to 1.27. If you would rather the tie-break ran the other way, sheet `01`'s `## Flagged` carries the mirror ladder as a one-field flip. |

## Not decided here

Every value in `H1` and `H2`: `upgrades[].base`, `maxLevel` and `perLevel`, the set factors,
`plots.laneWidthStuds`, `depths.areas[].footprintStuds2`, `ROUTE_SLACK`, `LAP_TARGET` and the server
tick rate — Balance & Tuning, Meta & Content and architecture, each named in `H6`. The arrival
levels `H2` reads — `meta/04`, which derives them; this sheet recomputed them to check the table and
sets none. Which products exist, their factors and their prices — sheet `01`, this domain, which
holds the key these constraints ride in. What may never be sold at all — sheet `02`, this domain.
Whether the clamp is applied client-side as well as server-side, and the wire shape of a modifier —
`gameplay/systems/06` for the rule, architecture for the transport. Whether `bridge/merge.mjs` grows
the `H1` and `H2` checks or they stay manual — contract-and-seam work.
