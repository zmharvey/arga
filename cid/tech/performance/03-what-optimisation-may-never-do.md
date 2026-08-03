# 03 — What optimisation may never do

**Domain:** tech/performance · **Category:** Tech & Data · **Wave:** 5

## Decision

**Seventeen savings this domain is forbidden to take, `N1` to `N17`, each naming the approved
sheet it protects and a check runnable without a running game.** A ceiling met by taking any of
them is a failed ceiling, not a met one.

**This sheet carries no `manifest` block: it constrains `budgets` (sheet `01`) and `serverCost`
(sheet `02`) and supplies neither.**

**This sheet carries no manifest block.** A prohibition on how a budget may be met is a
constraint on **`budgets`**, which sheet `01` supplies with `deviceFloor`, `tiers` and
`instanceCeilings`. This sheet sets no ceiling of its own and moves none of theirs.

## Why

**Every ceiling in this domain has a cheap way out, and each cheap way out breaks something
already decided.** `01` sets a 1,000-draw-call ceiling and a 6,000-instance client ceiling
against a design that puts up to 640 primitive parts in one bay
`[research: cid/gameplay/meta/04-the-depth-ladder.md]`; the standard answers — LOD, mesh merge,
imposters, culling, pooling, despawn — are all *available* and all *forbidden*, for reasons
that live outside this domain entirely. Writing the ceiling without writing the exclusions
hands a builder a budget it can only meet by breaking a binding constraint.

**The one that matters most is `N3`, because it is the only one that meets stopping-rule bar
(a) directly.** `Clearing.luau:392` iterates `state.patches`, a Luau table, and pays the player
for every uncleared entry inside the radius. **A saving taken against that table silently stops
paying.** No error, no warning, no visible symptom other than currency that does not arrive —
in a game where *"the economy is the only thing worth cheating"* `[brief: soft]`
(`04-PRESENTATION.md`) and clearing is the only faucet. Streaming, culling and despawn are all
legitimate **client-side**, and `01` uses two of them; none of them may reach the server table.

**`N1`, `N2` and `N12` are one constraint stated three ways because there are three distinct
ways to violate it.** *"Rarity tiers must differ by shape or silhouette, not only hue … This is
a requirement, not a nicety"* `[brief: soft]` ← `[you accepted: R6 Q4]` (`04-PRESENTATION.md`),
carried by `HANDOFF.md` as one of six pre-design facts. **Silhouette is the rarity channel**,
so a budget met by making four tiers one shape is a failed budget — and the four shapes and
four heights are Block 1.6, Cylinder 2.4, Ball 2.8, Wedge 3.4
`[research: cid/gameplay/systems/01-overgrowth-tiers.md]`. `01` already routes the triangle
problem correctly: if `Ball` is expensive, the fix is a **shape swap**, which keeps four
distinct silhouettes, never a distance collapse, which does not.

**`N10`'s observable has now overshot its own rule twice, and both overshoots were the same
mistake.** The row's stated subject is **layout determinism** — randomness, reordering,
reindexing — because `state.cleared` is keyed by patch array index and `architect/01-runtime`
makes the seed a save-migration boundary. Round 3 removed `os.clock`, which introduces none of
the three. This round removes **`table.sort`**, which matches two real sites and violates
nothing at either: `Layout.luau:428` sorts a **separate `order` index array** built from
`patches` and leaves `patches` itself untouched, and `Beats.luau:505` sorts a client-side
presentation queue that no persisted index exists in.

**The `table.sort` case is worse than a false positive, which is why it is a named exemption
and not a deletion.** `Layout.luau:428`'s ordinal is precisely what `firstSession.placement`
and `discovery` read to decide which patch carries the first Find. A builder who runs
acceptance criterion 2, sees two failures and reaches for the one inside `layout` **moves the
first Find** — so the observable as written instructed the violation the rule forbids. Deleting
the token outright would lose the check; naming the two sites keeps a match at a **third** site
a finding. `[cid: decided]`

**`N15` and `N16` exist because the burst budget in `02` is the one place a performance
decision touches a beat.** A bay build lands on the tick that fires the game's largest payoff.
The available shortcuts — a loading screen, a frozen character, a camera lock, a staggered
fade-in — are each forbidden by a different approved sheet, and a builder under frame pressure
will reach for one.

**`N9` is a scope check, not a performance rule.** Priority 3 excludes eight systems
(`03-META.md`), three of them `[you chose]`-adjacent. **Naming them in order to forbid them is
the compliant form**; a `budgets` field held open for a leaderboard aggregate or a season flag
is not.

**This sheet should not be contradicted at all.** If it is, the contradiction is a design
change and it goes back to the sheet that owns the constraint, not to this domain
`[research: cid/tech/performance/_lead.md]`.

| id | forbidden saving | protects | check, no running game needed |
|---|---|---|---|
| N1 | Any LOD, imposter, mesh-merge, billboard, `RenderFidelity` or distance-collapse rule that changes a patch's `Size`, `Shape`, class or height with distance, camera angle or on-screen count | `04-PRESENTATION.md` silhouette constraint; `art/objects/01` criterion 3; `representation.patch.geometryByShape` | `grep -rn "LevelOfDetail\|RenderFidelity\|BillboardGui\|UnionAsync\|SubtractAsync\|Imposter" game/src` returns nothing |
| N2 | Merging two or more patches into one Instance, or drawing a bay as a single combined part | same as N1; `state.cleared` is keyed by patch array index | a live bay's patch Instance count equals `depths.areas[k].patchCount` exactly; every patch Instance name is `"Patch" .. index` for a unique index |
| N3 | Any streaming, culling, despawn, pooling or lazy rule that removes, hides, defers or nils an entry in the **server's** `state.patches` table | `Clearing.luau:392` pays from that table; a saving here silently stops paying the player | `grep -rn "table.remove\|table.clear\|table.move" game/src/server/Clearing.luau game/src/server/Plots.luau` matches only `table.clear(state.cleared)` at area completion; `#state.patches == areaSpec(areasFinished+1).patchCount` holds until the area completes |
| N4 | Using the presence or absence of a patch **Instance** as the source of truth for whether a patch is cleared | same as N3; `stateShape` gives `cleared` one writer | `grep -rn "FindFirstChild(\"Patch\|:IsDescendantOf\|GetPartBoundsInRadius\|GetPartsInPart" game/src/server` returns nothing in the clearing path |
| N5 | Setting `StreamingIntegrityMode` to `Disabled` | `traversal` permits no fall, no death by world and no failure state; a player who outruns the loaded region has no rule that catches them | the published value is `PauseOutsideLoadedArea` (`budgets.streaming`) |
| N6 | Setting `StreamingMinRadius` below `social.maxCoPresenceSeparationStuds` (128) | `social/02` criterion 1; `plots.pitchStuds` is 122, so a neighbour must render | `budgets.streaming.StreamingMinRadius >= social.maxCoPresenceSeparationStuds.value` |
| N7 | Making the inter-plot boundary opaque, or adding fog, `Atmosphere` or occlusion that obstructs the spawn-to-spawn sightline | `mechanics/06` (stops the body, not the eye); `social/02` criterion 3 | every instance intersecting the segment between two neighbouring spawn points has `Transparency == 1`; `grep -rn "Atmosphere\|FogEnd\|FogStart" game/src` returns nothing |
| N8 | Removing, hiding, un-replicating or transparency-fading another player's character inside 128 studs | `social/02` B2 and B3 (a body in motion whose ground is visibly being cleared) | `grep -rn "LocalTransparencyModifier\|ReplicationFocus\|PersistentPerPlayer\|Archivable = false" game/src` returns nothing |
| N9 | Reserving, stubbing, defaulting or holding open any `budgets` or `serverCost` field for procedural generation, rebirth, offline accrual, codes, daily rewards, leaderboards, trading, or seasons and events | `03-META.md` priority 3 | `grep -in "rebirth\|offline\|streak\|daily\|leaderboard\|OrderedDataStore\|MessagingService\|season\|promo\|procedural" cid/tech/performance/*.md` matches only this row and sheet `01`'s scope line |
| **N10** *(amended rounds 3 and 4)* | **Deriving a placement, an award amount or a grant from an unseeded RNG or from a wall clock; or reordering, re-sorting, compacting or reindexing `layout`'s patch array itself. A monotonic elapsed-time read is permitted, and so is sorting a separate index or presentation array that leaves `patches` untouched. `math.random`, an unseeded `Random.new()`, `os.time()` and `tick()` remain forbidden.** | `architect/01-runtime` (one `LayoutSeed`, and its AC3); `layout` R9; `state.cleared` is keyed by array index and is a save-migration boundary; `01-FOUNDATION.md`'s *"no offline accumulation"* `[brief: binding]`, which is what keeps `os.time()` banned | `grep -rn "math.random\|Random.new()\|os.time()\|tick()" game/src` returns nothing outside a `Random.new(seed)` derived from `GameConfig.LayoutSeed` — **verified clean against the shipped tree, zero code matches on all four.** `os.clock` and `table.sort` are deliberately absent from the pattern; `table.sort` is instead bounded by the two-site exemption below, and a match at any third site is a finding |
| N11 | Pooling, recycling or re-parenting a patch Instance across bays or across areas | *"Cleared is permanent"* `[brief: binding]` ← `[you chose: R2 Q1]`; a reused Instance carries a stale index | a lane teardown is one `Destroy` on the slab (`representation`); no patch Instance is ever assigned a second `Parent` or a second `Name` |
| N12 | Reducing the four tier heights toward each other, clamping `tier.height` at distance, or writing `.Size` on a patch after creation | `04-PRESENTATION.md`; `art/objects/01` criterion 3 (four distinct heights) | the four `tiers[].height` values in `GameConfig.luau` are pairwise distinct; `grep -rn "\.Size = " game/src/server/Plots.luau` matches only the creation path, the slab and the four boundary parts |
| N13 | Making a patch collidable, touchable or queryable in order to reuse an engine query as the proximity test | `art/objects/01` (does not collide); `mechanics/06` (nothing on a lane to climb or jump from) | `grep -rn "CanCollide = true" game/src/server/Plots.luau` matches only the slab and the boundary parts; no patch has a `Touched` connection |
| N14 | Deferring, batching, coalescing or dropping a currency award, a Find reveal or an area-completion push in order to smooth a frame | `core-loop/01`'s 3-second payoff ceiling; `mechanics/05`'s per-beat latency budgets; `core-loop/03` (reveal on contact, per patch) | `Progression.award` is called once per cleared patch inside the same tick as the clear; there is no queue, no accumulator and no coroutine between `clearPatch` and the award |
| N15 | Taking control away during a bay build or a join build — a loading screen, a frozen character, a camera lock, a forced idle, or a `WalkSpeed` write | `mechanics/05` (no beat takes control away); `response.negativeBeats` is 0 | `grep -rn "WalkSpeed = 0\|PlatformStand\|CameraType.Scriptable\|Enabled = false" game/src/client` returns nothing on a build path; no `ScreenGui` is created by a server module |
| N16 | Staggering, fading, tweening or animating patches into existence across frames in a way another client can observe | `theme/identity/03` (*"a plot appears and disappears whole; nothing may stagger or animate its patches into existence"*) | the bay container's `Parent` is assigned exactly once per build (`serverCost.burstBudget.buildRule`); `grep -rn "TweenService\|Transparency = " game/src/server/Plots.luau` returns nothing |
| N17 | Adding an uploaded image, mesh or sound asset to world geometry in order to reduce part count | `representation` (*"assembled from primitives; no asset ids"*); `budgets.textureCeilings` | `grep -rn "rbxassetid" game/src` returns nothing outside client UI files |

### `N10` · `table.sort` — the two permitted sites, and nothing else

| site | what it sorts | what it leaves alone | why it is not a reindex |
|---|---|---|---|
| `game/src/shared/Layout.luau:428` | a local `order: {number}` array of patch **indices**, ascending by squared XZ distance from the bay spawn, ties to the lower index so the ordering is total and deterministic | `patches` itself — the array `state.cleared` is keyed against is never touched, reordered or compacted | it **produces** an ordinal, it does not renumber one. `firstSession.placement.ordering` and `discovery` both read this ordinal, so changing or removing this call is what would move the first Find |
| `game/src/client/Beats.luau:505` | a client-side beat presentation `queue`, by rank then arrival | nothing persisted or replicated; no patch index exists in this table | it is a **client display order** on the drain path, on the far side of the wire from any save data |

**A `table.sort` at any third site in `game/src` is a finding against this row.** These two are
named because they exist and are correct, not because sorting is generally permitted.

## Amends

**`N10`, round 4 erratum, closing the round-3 verification's one open cell.** `table.sort`
matched `Layout.luau:428` and `Beats.luau:505`, so acceptance criterion 2 failed against this
project's own artifact — and the failure pointed a builder at the one call whose removal would
move the first Find. Token dropped from the pattern, replaced by the two-site exemption table
above. **Verified against the shipped tree: `math.random`, `Random.new()`, `os.time()` and
`tick()` now return zero code matches** (the only hits are the prose comments at
`Layout.luau:70`, `Beats.luau:378` and two `.report.md` lines), so `N10` passes as written.

**`N10`, round 3**, closing RR-P9 and adopting Security's RR-S1 and Networking's RR-N8 in the
sheet that owns the row: `os.clock()` moved from forbidden to permitted. Both escalated
correctly on substance and incorrectly on route — a peer sheet revised in the same round cannot
amend mine. **The same two narrowings are owed to `architect/01-runtime` acceptance criterion 3**,
which carries the identical pattern; that is a legitimate upstream escalation and rides in
`serverCost` RR-P4 alongside Security's and Networking's.

## Consequences for other work

- **Runtime work (`architect/01-runtime`)** should narrow acceptance criterion 3's grep by
  **both** tokens, not one. Until it does, that criterion and this row disagree, and AC3 fails
  against the shipped tree on two counts rather than one.
- **Area-layout work (`layout`) and onboarding-placement work (`firstSession`)** may treat
  `Layout.luau:428` as protected: it is named as permitted here, and removing it is what would
  break `firstSession.placement.ordering`. It was previously at risk from my own check.
- **Rate-limiting work (`integrity`) and reconciliation work (`prediction`)** are unblocked: a
  monotonic elapsed-time read is permitted. Neither may read `os.time()` or `tick()`.
- **Whoever implements `budgets`' render ceilings** learns that `N1`, `N2` and `N12` remove
  every standard lever for a draw-call problem. If primitive parts do not batch, the remaining
  lever is `depths.areas[].patchCount` — a content decision, escalated to `depths`, never an
  optimisation.
- **Clearing-module work (`modules`/`clearing`)** inherits `N3`, `N4`, `N10` and `N14` as
  constraints on any loop rewrite, including `serverCost` RR-P5's conditional bucketing: a
  bucket index is a **separate index array** over the same `patches`, which the exemption above
  now makes explicitly legal, with no removal and no renumbering of `patches` itself.
- **Plot-and-lane work (`plots`, `representation`)** inherits `N11`, `N13` and `N16`: teardown
  is one `Destroy`, a patch is never reused, and a bay is parented once.
- **Area-boundary and set-dressing work (Art & Visuals — Environment)** inherits `N7`: the
  inter-plot boundary is a bound, not an object, and no fog or `Atmosphere` may be added to
  shorten the draw distance.
- **Publish-checklist work (Build & Deploy)** inherits `N5` and `N6` as two properties that may
  not be tuned downward at publish time to fix a frame-rate complaint.
- **Feedback, VFX and audio work** inherits `N14` and `N15`. **Live-ops and roadmap work**
  inherits `N9`.

## Acceptance criteria

1. Every row `N1` to `N17` names at least one approved sheet or brief line in its `protects`
   column, and the seventeen `check` cells contain no cell that requires the game to be
   running: 17 of 17 are a grep, a manifest comparison or a static instance count.
2. Running every `grep` in the check column against the current `game/src` produces the stated
   result for all rows that name one (`N1`, `N3`, `N4`, `N7`, `N8`, `N9`, `N10`, `N12`, `N13`,
   `N15`, `N16`, `N17`). **`N10`'s pattern contains neither an `os.clock` nor a `table.sort`
   token**, and returns zero code matches against the shipped tree.
3. `grep -rn "table.sort" game/src` returns exactly the two sites named in the `N10` exemption
   table, plus comment and `.report.md` lines. A third code site is a finding.
4. This file contains zero fenced blocks tagged `manifest`, and `npm run bridge` reports no key
   provided or proposed by it.

## Not decided here

Every ceiling these rows constrain — sheet `01`, which holds `budgets`. Every cost model, tick
figure and burst rule these rows constrain — sheet `02`, which holds `serverCost`. **This sheet
supplies neither key and proposes none; the key it would need does not exist, because a
prohibition set is a constraint on two keys rather than a third thing.** What a patch, a
boundary or a bay looks like inside the ceilings — Art & Visuals. Whether the bucketed scan in
`serverCost` RR-P5 is adopted — `architect`, `modules`/`clearing`. **Whether
`architect/01-runtime` acceptance criterion 3 takes both narrowings — `architect`, on RR-P4,
Security's RR-S1 and Networking's RR-N8; I amended my row and cannot amend theirs.** Whether
these checks become a `bridge/merge.mjs` lint or stay build-report greps — contract-and-seam
work. Which savings a *client* may take that never touch the server table — sheet `01` already
takes two of them and nothing here forbids a third that leaves `state.patches` alone.
