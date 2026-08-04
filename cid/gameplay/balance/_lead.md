# Balance & Tuning — domain index

**Category:** Gameplay · **Wave:** 4 (stage 4, the last Gameplay stage) · Reads:
`HANDOFF.md`, `CONCEPT.md`, `00-CORE.md`, `01-FOUNDATION.md`, `02-GAMEPLAY.md`, `03-META.md`,
`OPEN.md`; `cid/_digest.md`, `cid/_contract.md`, `cid/_state.md`, `cid/gameplay/_category.md`,
`cid/gameplay/_verified-wave3.md`; the merged manifests of `upgrades`, `tiers`, `economy`,
`modifiers`, `setBonus`, `depths`, `products`, `firstSession`; `bridge/schema.mjs`,
`bridge/merge.mjs`.

## What the brief gave me

Nine numeric inheritances, and the brief is honest that most of them are not numbers yet.

- "**10–20 minute active sessions**" · "**8–14, mobile-heavy**" `[brief: binding]` ←
  `[you chose: R1 Q4]` (`00-CORE.md`). Every milestone I set is divided by this window.
- "**~24 objects in 4 sets of 6**" `[brief: soft]` ← `[you accepted: R4 Q4]` — revised in
  effect by ruling R-2 to 3 relics × 2 areas × 4 depths = 8 areas.
- "**Three axes:** value per unit, clear radius, and move speed." · "Relic luck as a fourth
  axis was offered and declined." `[brief: soft]` ← `[you accepted: step 6 Q1]`.
- "**Lap length: unknown, and deliberately so.** … **This design's lap is an area, not a
  rebirth cycle, so the reference's number would not have transferred anyway.**"
  (`01-FOUNDATION.md`) — explicitly unsourced, and the brief forbids importing the
  reference's figure as a fix.
- "**Tuning burden:** discovery rates must be generous enough that a typical session yields at
  least one find, or the stated session objective silently fails. **This is the highest-risk
  tuning in the game**" `[brief: binding]` as a stated risk (`03-META.md`).
- "Left open — how long an area should take, **the cost curve on clearing upgrades**, how
  density scales with depth, and where the pacing dead-spots are." (`01-FOUNDATION.md`).
- "**Depth is progression** — deeper areas are larger, denser, and hide rarer sets."
  `[brief: binding]` ← `[you chose: R3 Q2]` (`03-META.md`), already **pushed back in part** by
  `meta/04`: from area 5 onward only "denser" survives, and it says the "larger" half is
  restored by one change that is mine.
- "**Permanent multipliers only. Never content access.**" `[brief: soft]` ←
  `[you accepted: R5 Q4]`; the reference sells "2x multipliers plus a 2,500-Robux oversized
  tool" `[research: research/grass-incremental.md]`.
- "**The only friction is the size of an area.** A large dense area takes time; that is the
  entire difficulty curve." `[brief: soft]` ← `[you accepted: step 6 Q2]`. There is no
  difficulty coefficient in this game. Every number I set is a *pacing* number, not a
  challenge number, and no sheet here may introduce one.

And the category ruling I cite rather than re-derive: **"those domains own the shape, direction
and acceptance test of every curve; you own every value"** (`_category.md` §08).

## What the brief did not give me

Named, not filled. Each routed to the item that decides it.

1. **No cost curve exists anywhere in the brief, and none is sourceable.** The brief could not
   verify the reference's pacing across three source types; my own pass could not reach its
   cost table either (two fetches failed, below). → **03**, as `[playtest unknown]` with test
   ranges and a stated derivation, never as a sourced figure.
2. **The brief's highest-risk number no longer exists.** `systems/05` removed the discovery
   *rate*: areas at one depth partition that depth's set, placement is seed-derived, no draw
   can repeat. The risk did not vanish with it — "a typical session yields at least one find"
   is now a **pacing** claim (laps per session × finds per lap), not a probability. → **05**.
3. **"Deeper areas hide rarer material" has no numeric carrier.** `tiers[].weight` is a single
   global vector; `systems/03` says flatly that per-depth rarity needs a weight dimension
   `tiers` does not have, and that Balance gets "a channel with no values in it". → **02**.
4. **Nothing in the brief says a multiplier has a ceiling**, or that set bonuses and a game
   pass draw on one budget. That structure was invented downstream (`systems/06`, `meta/03`,
   `monetization/03`) and its figures were never allocated by one owner. → **04**.
5. **No time-to-milestone target exists for anything except onboarding's ten seconds.** Not
   for the first purchase, not for a set, not for 24/24. → **05**.
6. **`meta/01` criterion 3 is false at shipped values** — "700 and 1,200 currency" for a full
   clear of area 1 against 140 × 3.68 = **515**. Recorded by wave-3 verification and never
   acted on. → **02**, which either makes it true or requests its revision.
7. **The 12% lap margin has no source and no owner.** It is the residue of wave 3 withdrawing
   both value passes, not a chosen target. → **05**.
8. **Server population inside 12–20 is a number with no loop-side determinant.** Deliberately
   not assigned — see below.

## Why 5 sheets (4 new)

**I own exactly one contract key, `upgrades`, and its sheet already exists and ships.** By the
one-sheet-per-key rule that is zero new sheets, and it would be wrong: my subject is the only
one in this project whose values live inside *other domains'* keys, and three of those values
have no key at all. So the count comes from the keys my subject **needs**: `tierMix` (what a
patch pays by depth — no key can express it), `axisBudget` (the multiplier budget and who
spends it — three sheets state inequalities over it and none carries the allocation), and
`pacing` (lap band, coefficients and milestones — flagged as G11 by three `core-loop` sheets
and proposed by nobody). That is three sheets. The fourth, `03`, has no new key and is
justified under rule 2 by a key I do own: the shipped `upgrades` figures fail two approved
requirements, and the merger permits one sheet per key, so the correction is a revision request
and not a second manifest block. Splitting further would divide one equation: income, cost,
budget and time are four decisions that each need the other three's outputs, which is why they
are four sheets read in that order and not fourteen.

**The structural finding, stated once here so a schema maintainer sees it.** The category rule
"every number appears in Balance & Tuning and nowhere else" is unsatisfiable against a contract
that gives each key one owner: `setBonus.rows[].factor`, `products.items[].factor`,
`depths.areas[].footprintStuds2` and `social.maxPlayers` are all *mine to set* and all live in
somebody else's key. I am **not** proposing a mirror table to fix that — a second copy of every
figure is two sources of truth, and this pipeline exists to remove those. The resolution is
provenance, not relocation: the number stays in the key that holds it, and Balance reaches it
by revision request. `pacing` is the exception that earns a key, because the coefficients in it
belong to no other key at all.

| # | sheet | must decide |
|---|---|---|
| 01 | `upgrade-ladder` | **Already written, merged, and read by the shipped game; it supplies `upgrades`.** Do not rewrite it and do not re-derive the three axes. Sheet `03` carries the revision to its figures as a request against this file. |
| 02 | `patch-payout-and-depth-mix` | Decide what one cleared patch pays and how that changes with depth: keep or move `tiers[].value` (`1/3/8/20`), and set a four-tier weight vector per depth so expected value per patch is non-decreasing in depth and "deeper areas hide rarer material" becomes true in numbers. Publish the resulting income for all eight areas at base stats, propose it as key `tierMix` while naming `tiers[].weightByDepth` as the cheaper collapse the schema maintainer may prefer, state the precedence between the two weight sources in one line, and say plainly whether `meta/01` criterion 3's "700 to 1,200" band survives at 140 patches or must be revised. |
| 03 | `ladder-solvency` | Set `costBase`, `costGrowth`, `maxLevel`, `perLevel` and `base` for all three axes so that: the sum of every `upgradeCost(u, l)` exceeds the clearing income of areas 1 to 7 (today 11,644 against about 38,500, a failure of `meta/04`'s stated requirement); arrival throughput at area 8 stays under `core-loop/05`'s swept cap; no rung opens a purchase desert past `core-loop/01`'s 90-second above-tick ceiling; and `firstSession`'s minute-1 purchase still lands (cheapest level-1 cost above 10 patches, below 60 seconds of clearing at base stats). Issue it as a `## Revision request` against `01` naming each field and its new value, and **carry no second `upgrades` manifest block** — the merger rejects two sheets on one key. Every figure `[playtest unknown]` with a test range unless you can cite the pack; the 1.07–1.15 idle-game band is evidence about *shape* on ladders of hundreds of rungs and is not authority for a 24-rung ladder. |
| 04 | `axis-budget` | Allocate each axis's finite multiplier budget across its three claimants and set the figures: the four `setBonus` factors (currently 1.20 each, range 1.10–1.35) and `Span`'s factor (currently 1.75, range 1.40–1.95). State each axis's ceiling and the input it reads (`radius`: `area.size / 2`; `speed`: `movement.baseClearRadius / serverTickSeconds`, whose tick is architecture's and not yours; `value`: none). Make the lap bound **joint and complete**: one `tau = 2 · radius · speed` term counting set factors as well as product factors, evaluated at every area ordinal and at spawn — where a purchaser's effective clear radius is **9.625 studs, not 5.5**, which `firstSession.placement` and the arming gate both derive unmultiplied. Resolve the live contradiction between `depths.areas[2].maxRadiusProduct` (1.27) and `products.items[span].factor` (1.75). Propose it as key `axisBudget`; issue revision requests for any figure landing in `setBonus`, `products`, `firstSession` or `modifiers`. |
| 05 | `time-to-milestone` | Set the lap band and every coefficient that belongs to no other key — `LAP_TARGET`, `ROUTE_SLACK`, `UNDERBUY_LEVELS`, the margin target now sitting at 12% by accident, `core-loop/01`'s 3-second and 90-second gap ceilings, `core-loop/03`'s 0.20–0.60 s onset separation — and publish the cumulative time-to-milestone table across all eight areas: first Find, first purchase, each of the four set completions, 24/24, and ladder exhaustion, each in wall-clock seconds against a 10–20 minute session and stated for a base player and a purchaser. Say in one line what now carries the brief's "typical session yields at least one find" risk given that no discovery rate exists. Propose it as key `pacing`; every row is a named quantity with a unit and either a citation from the pack or `[playtest unknown]` with a test range. |

## Subjects I considered and did not assign

- **The server population figure inside 12–20.** `_category.md` §10 routes it to me and to
  Tech & Data, and `social/01` states what breaks at each edge. Nothing in the economy, the
  cadence or any curve reads population, so I have no loop-side reason to prefer 12 over 20;
  its binding constraint is per-plot instance count and server capacity. Routed to
  **per-server-capacity work** (currently Tech & Data, wave 5), which owns the determinant.
- **`priceRobux`.** `monetization/01` kept 499 inside `products` with a stated `[cid: decided]`
  argument — a Robux price enters no curve and is sourced from an external market — and gave a
  no-revision band of 349–999. I accept the containment. What I do take is the **price-to-value
  ratio**, as one row of `04`: Robux per unit of axis factor, against the reference's
  2,500-Robux tool.
- **A `tuning` mirror table.** My `owns` line names "the single canonical table every number
  lives in". The merged manifest **is** that table. A second key restating every figure would
  be two sources of truth, which is the failure this repo removes; see the structural finding
  above.
- **Area footprints and patch counts.** They are values, but `meta/04` derives all eight from a
  formula over throughput. Moving them is moving the formula's inputs, which is `03` and `04`.
  I set no footprint directly and no sheet here may.
- **A difficulty or challenge coefficient.** There is none to set: zero tension is confirmed
  twice in the brief, and "the only friction is the size of an area". Stated so verification
  does not read the absence as an omission.
- **Anything in priority 3.** Nothing here touches procgen, rebirth, offline accrual, codes,
  daily rewards, leaderboards, trading, seasons or events. My subject is entirely inside
  priority 1's "three clearing upgrades" and the pacing of the loop around them.

## Verification note

**Sheet `03` is the one most likely to be contradicted, and Meta & Content will do it.** Every
figure in it is an input to somebody else's derived value: `maxLevel` and `perLevel` set
`ladderMax`, which sets every axis's headroom (`meta/03`'s four factors, `monetization/03`'s
`H1`), and they set arrival throughput, which is what `meta/04` sizes all eight footprints
from and what `core-loop/05`'s formula consumes. Raising the ladder so it outlasts area 7 —
which `meta/04` requires — is exactly the change that re-opens rows 5 to 8's footprints and
restores the "larger" half of the brief line `meta/04` pushed back on. That is a good outcome
and it is still a contradiction of eight merged rows, so `03` must state which `depths` rows
move as a consequence and hand them back rather than silently assuming they hold.

Second most likely: `04`, contradicted by whoever settles the `tool` question. `Span` is
delivered as an oversized tool head and `mechanics/04` `T11` says width moves with the Reach
*level* alone, so a factor sold on the radius axis has no visible deliverable until that
ruling lands. `04` sets the factor; it does not get to settle that.

## Research owed

My `must_verify` is an evidence standard, not a fetch list: *"Every curve must be sourced or
explicitly marked a playtest unknown with a starting value and a test range. Never present an
invented number as sourced."* What I fetched, so the writer can cite it:

- **The cost-curve canon, and its limits.** `Price = BaseCost × Multiplier^(#Owned)`; Clicker
  Heroes uses 1.07 across all 35 heroes, every Cookie Clicker building uses 1.15, AdVenture
  Capitalist's ten businesses each sit between 1.07 and 1.15, and Steam's *Monster* goes as
  high as 2.5; "the curves produced between those bounds are balanced and satisfying"
  `[research: https://code.tutsplus.com/numbers-getting-bigger-the-design-and-math-of-incremental-games--cms-24023a]`.
  Corroborated with `cost_next = cost_base × rate_growth^owned`, AdVenture Capitalist's
  Lemonade Stand at `rate_growth = 1.07, cost_base = 4`, and the exponential-cost-versus-
  polynomial-income framing
  `[research: https://www.gamedeveloper.com/design/the-math-of-idle-games-part-i]`.
  **The caveat is load-bearing:** both describe ladders of hundreds of purchases against income
  that grows with every purchase. This ladder is 24 rungs total against income that is flat per
  patch. The sources bound the *shape* argument and are not authority for any value here.
- **Session-shape evidence for the milestone table.** "The core loop of a simulator is
  completable in under five minutes"; if one satisfying cycle takes over 15 minutes "that's a
  design problem"; sessions-per-user below 1.2 is "a structural re-engagement problem"; the
  24-hour return window is weighted most heavily
  `[research: https://rowatcher.com/news/what-the-roblox-algorithm-actually-rewards-in-2026-not-ccu]`.
  This is the first external corroboration the project has for a sub-five-minute lap, and it
  supports the current 93-second lap far better than it supports `core-loop/04`'s original 165.
- **Negative evidence, recorded so nobody re-searches it.** Two Roblox DevForum threads on
  simulator cost curves give ad-hoc formulas (`value = 6*level^3`, `price = steepness^rebirth`)
  and explicitly **no** multipliers, level-span guidance, income-to-cost ratios or
  time-to-afford targets; the advice given is "use desmos … to see what you like"
  `[research: https://devforum.roblox.com/t/balancing-exponential-upgrade-progression/2434950]`
  `[research: https://devforum.roblox.com/t/simulator-formulas/853976]`. **There is no
  Roblox-native cost-curve convention to cite.** Every cost figure in `03` is therefore
  `[playtest unknown]` by necessity, not by laziness.

**Could not verify, with the fetch that would settle each:**

- **The reference's own upgrade prices.** Two source types failed this pass — a Fandom cost
  table returned HTTP 402 and a beginner's guide HTTP 405 — on top of the three failures
  `01-FOUNDATION.md` already records. `[research owed: an upgrade price table for place
  133086043677134, or an in-client screenshot of its upgrade panel showing cost per level]`.
  Note the brief has already ruled the reference's *pacing* non-transferable; its cost
  *curvature* would still be the only Roblox-native datum in the domain.
- **Time to first upgrade in the reference**, still open from wave 2's batched pass, and the
  one figure that would let `05` anchor its first-purchase milestone to something shipped.
  `[research owed: a timestamped capture of the first 120 seconds of place 133086043677134]`.
- **The 2025 Roblox Benchmark Report's 13–18 minute session band**, which a search summary
  attributes to it and which would corroborate the brief's 10–20 minute window directly. The
  two hosts reachable this pass carried no session-length figures.
  `[research owed: the report PDF itself, for its session-length interval table]`. Marked
  `[unverified]`; nothing in `05` may cite it until it is fetched.

## Contradictions between approved sheets, found while enumerating

Reported here rather than absorbed. All three are mine to resolve, in `04`.

1. **`Span` breaches its own area bound today.** `depths.areas[2].maxRadiusProduct` is **1.27**
   and `depths.invariants[11]` requires the radius product to stay at or under it, while
   `products.items[span].factor` is **1.75** and its `factorStatus` calls 1.95 "the hard
   lap-floor limit at area ordinal 2". Two merged keys give incompatible bounds for one
   quantity at one area. `bridge` does not catch it because these invariants are prose strings
   inside a manifest, not executable checks.
2. **Every radius bound in the contract counts products and forgets sets.**
   `maxRadiusProduct` is defined over `products[].factor` alone, but `setBonus` puts ×1.20 on
   `radius` twice (cistern, spire) and those multiply the same `tau` and shorten the same lap.
   This is the general form of the `H2`-is-joint defect: the lap bound must be joint across
   `radius` and `speed` **and** across every multiplier source, not just across axes.
3. **`modifiers.axes[radius].ceilingRule` reads `area.size / 2`, and `area` holds one area.**
   Areas 2 to 8 carry `footprintStuds2` and no `size`. The rule happens to be right because
   the lane is 120 studs wide at every depth, but that fact lives in `plots.laneWidthStuds`,
   not in `area.size`, so the ceiling is correct by coincidence rather than by reference.
