# 03 — Purchase headroom

**Domain:** gameplay/monetization · **Category:** Gameplay · **Wave:** 3

## Decision

**A purchase takes the residue and is sized last: for every axis and every depth,
`ladderMax × Π setFactors × Π productFactors ≤ 0.9 × ceiling`. When it fails, the product's factor
falls until it holds; the ceiling budget never rises, and an axis is not sold when its residue is
already over-subscribed by a claimant with priority — which is why `speed` is not sold.** When a
purchase stops applying, for any reason, **the player is shown nothing.**

## Why

**This sheet carries no manifest block.** Its constraints are the value of `products.headroom`,
supplied inside sheet `01`'s proposed `products` key. One key per subject.

**The collision.** `gameplay/systems/06` applies exactly one ceiling clamp, after every source, and
forbids a purchase that raises an axis past its ceiling. `gameplay/core-loop/05` reports depth-4
arrival at 3.84× of a 4.16× throughput cap — 92% of the escalation budget spent, speed already maxed
on arrival. **A clamped purchase delivers nothing to someone who paid**, silently, and nobody would
find out until a player complained. Both stopping-rule bars: a player would notice, and two builders
would resolve it differently.

**The order of claimants is the whole ruling.** Four things draw on one axis's ceiling: the ladder
at max (Balance & Tuning), the set-completion factors (Meta & Content for the axis, Balance for the
magnitude), the products (mine), and the ceiling itself (Meta & Content via `area.size`, architecture
via the tick rate). **Products are sized last**, because they are the only claimant that can be
reduced without breaking something else: a smaller pass is a smaller pass; a smaller ladder is a
different game. `[cid: decided]`

**The 0.9 margin is a reservation, not a safety factor.** Every input is owned elsewhere and none is
final — `gameplay/core-loop/05` explicitly recommends raising `upgrades[].maxLevel` to fix a
different collision, which would move this budget underneath me. Ten percent means a later change of
up to a tenth in any single input does not silently start clamping something a player bought.
`[playtest unknown]` for the fraction; starting value 0.9, test range 0.80 to 0.95.

**What it says at shipped values.** `value` has no ceiling at all — `gameplay/systems/06` clamps
radius and speed and names no third, and `gameplay/systems/04` fixes that income at max ladder is
"neither capped nor hidden". `radius` has 3.78×; `Span` takes 1.75 and leaves 2.16 for set factors,
which is more than four sets at ×1.2 (2.07) would spend, so `Span` is safe against any plausible set
allocation without asking Meta & Content for anything. **`speed` has 1.61× in total, and four sets
at ×1.2 alone would consume 2.07 of it** — over-subscribed by a claimant ahead of me before any
product exists. The honest ruling is that `speed` is not sold, not that it is sold small. That is
the derivation behind sheet `01`'s two-axis ladder.

**A finding that is not mine, reported rather than fixed:** the same arithmetic says
**`Π setFactors(speed) ≤ 1.61` or the set bonuses clamp themselves**, with no purchase involved.
Three sets at ×1.2 fit; four do not. Nobody has stated this. It belongs to set-bonus work and to
whoever owns the tick rate.

**The failure rule, all three branches.** Reduce the factor: always the first move. Drop the axis:
only when the residue at the worst depth is not exclusively available to me, as with `speed`.
**Raise the ceiling budget: never on this domain's request.** A monetization sheet that grew an axis
ceiling so a pass would fit would be buying its own product with someone else's design.

**Pacing is the second bound and it is tighter than the clamp.** Throughput is
`2 · effectiveRadius · effectiveSpeed` and lap wall-clock is footprint over throughput, so a radius
factor compresses the lap directly. `gameplay/core-loop/04` fixes a 75-to-200-second band; at the
165-second target `Span` alone gives 94 s, which is fine. **The problem is the combination.** A
value purchaser reaches ladder max sooner, and at the cap they arrive at depth 2 running 2.17× the
throughput that area was sized for — 76 s alone, **43 s with `Span` as well.**
`gameplay/core-loop/05`'s sizing formula already carries a tolerance branch, `200 · τ_tol(N)`, and
that is the correct home for this — **but `τ_tol` is defined against the greedy buyer, not the
greedy buyer holding every pass.** The requirement, and I set no value: **an area must be sized
against the throughput of a player who owns every product.**

**The depth-1 case pre-exists this domain**, named so nobody bills it here: a player at ladder max
inside a depth-1 area runs 4.16× and laps in 40 s owning nothing. That is the gating question
`OPEN.md §5 #3` leaves open; products only make it arrive sooner.

**What the player is shown when a purchase stops applying: nothing, in either case.** The
clamp-absorbed case is ruled impossible above, so there is nothing to show. The refund case —
`gameplay/systems/06` recomputes from live ownership at every join rather than latching, so a revoked
pass silently lowers an axis — gets **no notice, no toast, no modal, no re-prompt, and no change to
any surface except the store row returning to its unowned state.** `theme/fantasy/03` `C3` fixes
that nothing in this game is ever taken back, and under this ruling nothing is: every Shard earned
stays, every Find stays, every cleared patch stays cleared. A *rate* returns to its unpurchased
value, which is the one thing here that was never a possession. `theme/tone/04` `D12` already removes
every signal for "you cannot do that", and a "your pass has ended" notice is that signal wearing a
receipt. `[cid: decided]`

| axis | ladderMax | ceiling | 0.9 × ceiling | total headroom | product factor | residue for set factors | sold |
|---|---|---|---|---|---|---|---|
| `value` | — | none (`gameplay/systems/04`) | — | unbounded by clamp; bounded by pacing | 1.5 × 2.0 = 3.0 | unbounded | yes |
| `radius` | 5.5 + 8×1.1 = 14.3 | `area.size / 2` = 60 at the 120-stud depth-1 area | 54 | 3.776× | 1.75 | 2.158× | yes |
| `speed` | 16 + 6×1.6 = 25.6 | `movement.baseClearRadius / serverTickSeconds` = 5.5 / 0.12 = 45.83 `[research: game/src/shared/GameConfig.luau]` | 41.25 | 1.611× | none | 1.611× | **no** |

| # | rule | form |
|---|---|---|
| `H1` | Clamp inequality, every axis with a ceiling, every depth including the deepest | `ladderMax(A) · Π setFactors(A) · Π productFactors(A) ≤ 0.9 · ceiling(A, N)` for all `N` |
| `H2` | Pacing inequality, every depth including the deepest | `lapSeconds(N)` computed at the throughput of a player owning **every** product `≥ 75` |
| `H3` | Sizing order | `upgrades` → set factors → `area.size(N)` and the tick rate → **products last** |
| `H4` | Failure branch 1 | `H1` or `H2` fails → reduce `products[].factor` until both hold |
| `H5` | Failure branch 2 | The residue at the worst depth is claimable in full by a claimant ahead of products → the axis is not sold |
| `H6` | Failure branch 3 | The ceiling budget rises: **never on this domain's request.** Owners: `upgrades[].maxLevel`/`perLevel` (Balance & Tuning), `area.size(N)` (Meta & Content), `serverTickSeconds` (architecture), set factors (Meta & Content, then Balance) |
| `H7` | The clamp may never absorb a purchase | `min(computed, ceiling) == computed` with every product owned, at every depth |
| `H8` | Loss disclosure | None. No notice, toast, modal, prompt or copy anywhere acknowledges a purchase-sourced modifier being absent |

## Consequences for other work

| subject | what this forces or forbids |
|---|---|
| Balance & Tuning | `H1` and `H2` are predicates over values you own and this sheet sets none of them. Moving `upgrades[].maxLevel`, `perLevel` or `base` moves `ladderMax`, which moves my residue; the predicate is written so it fails loudly rather than being argued about. `H6` names you as an owner precisely so nobody reads this sheet as a request to raise a cap. |
| Set-bonus work (Meta & Content for the axis, Balance for the magnitude) | You inherit a live bound you did not have — `Π setFactors(speed) ≤ 1.61` and `Π setFactors(radius) ≤ 2.16` at shipped values — and the first is breached by four sets at ×1.2 with no purchase in the game. `gameplay/core-loop/02` hands you a worth band and `gameplay/systems/06` the conversion; this is the third constraint and it is a ceiling, not a band. |
| Area-sizing work (Meta & Content; formula from `gameplay/core-loop/05`) | `τ_tol(N)` must be computed with every product owned, or `H2` is unsatisfied for a purchaser at depth 2 (43 s against a 75 s floor). This changes what goes into your formula, not the formula. |
| Architecture (owner of the tick rate) | The speed ceiling is `movement.baseClearRadius / serverTickSeconds` and the shipped literal is `GameConfig.ClearTickRate = 0.12`. Halving it doubles the speed budget and would reopen selling `speed`; doubling it clamps the set bonuses on their own. Stated so the dependency is visible from your side. |
| Contract-and-seam work (owner of `bridge/schema.mjs`) | `H1` is one arithmetic check over the merged manifest and is the only thing standing between a paid product and a silent clamp. It needs `products` shaped first; until then `H1` is an acceptance criterion a human runs. |
| Store-surface and feedback-UI work | `H8` forbids a surface you might otherwise assume is owed. No expiry notice, no "reactivate" affordance, no state anywhere except the store row's owned/not-owned. |

## Acceptance criteria

1. `H1` evaluates true for every axis with a ceiling at every depth against the merged manifest. At
   shipped values that is `14.3 × Π setFactors(radius) × 1.75 ≤ 54` and
   `25.6 × Π setFactors(speed) ≤ 41.25`.
2. `products.axesNotSold` contains `"speed"`, and `"speed"` appears in no `products.items[].axis`.
3. The build contains zero strings matching
   `/expired|no longer own|refund|you lost|reactivate|repurchase|renew/i`, and zero notice, toast or
   modal code paths triggered by a purchase-sourced modifier being absent.
4. Lap wall-clock at every depth, computed for a player owning every product, is at least 75 seconds.

## Not decided here

Every value in `H1` and `H2`: `upgrades[].base`, `maxLevel` and `perLevel`, the four set factors,
`area.size(N)` at any depth, `ROUTE_SLACK`, `LAP_TARGET` and the server tick rate — Balance &
Tuning, Meta & Content and architecture, each named in `H6`. Which products exist, their factors and
their prices — sheet `01`, this domain, which holds the key these constraints ride in. What may
never be sold at all — sheet `02`, this domain. Whether the clamp is applied client-side as well as
server-side, and the wire shape of a modifier — `gameplay/systems/06` for the rule, architecture for
the transport. Whether the gating question lets a player over-level inside depth 1 — Meta & Content,
and it pre-dates this sheet. Whether `bridge/merge.mjs` grows the `H1` check or it stays a manual
step — contract-and-seam work.
