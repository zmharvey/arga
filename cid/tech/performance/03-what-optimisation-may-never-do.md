# 03 — What optimisation may never do

**Domain:** tech/performance · **Category:** Tech & Data · **Wave:** 5

## Decision

**Seventeen savings this domain is forbidden to take, `N1` to `N17`, each naming the approved
sheet it protects and a check runnable without a running game.** A ceiling met by taking any of
them is a failed ceiling, not a met one.

**This sheet carries no `manifest` block: it constrains `budgets` (sheet `01`) and `serverCost`
(sheet `02`) and supplies neither.**

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

**`N10` is amended this round, and the reason is that its observable overshot its own rule.**
Its stated subject is **layout determinism** — randomness, reordering, reindexing — because
`state.cleared` is keyed by patch array index and `architect/01-runtime` makes the seed a
save-migration boundary. Its grep also caught `os.clock()`, which introduces none of the three
and touches nothing `layout` produces: a monotonic elapsed-time read cannot move a patch. Both
Security (RR-S1) and Networking (RR-N8) need one for rate limiting and reconciliation, and both
were right on the substance, so **I amend it rather than make them escalate against a peer
sheet they cannot edit.** The wording below keeps `os.time()` and `tick()` forbidden by name,
because a wall clock *can* reach an award — `01-FOUNDATION.md`'s *"no offline accumulation"*
`[brief: binding]` is exactly the rule a `lastSeen` read would break — so this is a narrowing,
not a clock amnesty. **It is also not cosmetic: acceptance criterion 2 runs `N10`'s grep against
current `game/src`, so the unamended row would have failed my own sheet the moment Security and
Networking built as specified.**

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
| **N10** *(amended, round 3)* | **Deriving a placement, an award amount or a grant from an unseeded RNG or from a wall clock; or reordering, re-sorting, compacting or reindexing `layout`'s patch array. A monotonic elapsed-time read is permitted. `math.random`, an unseeded `Random.new()`, `os.time()` and `tick()` remain forbidden.** | `architect/01-runtime` (one `LayoutSeed`, and its AC3); `layout` R9; `state.cleared` is keyed by array index and is a save-migration boundary; `01-FOUNDATION.md`'s *"no offline accumulation"* `[brief: binding]`, which is what keeps `os.time()` banned | `grep -rn "math.random\|Random.new()\|os.time()\|tick()\|table.sort" game/src` matches nothing outside a `Random.new(seed)` derived from `GameConfig.LayoutSeed`. **`os.clock()` is deliberately absent from the pattern**, and no `os.clock()` return value may appear in an argument to `Progression.award`, in a patch position, or in a `layout` call |
| N11 | Pooling, recycling or re-parenting a patch Instance across bays or across areas | *"Cleared is permanent"* `[brief: binding]` ← `[you chose: R2 Q1]`; a reused Instance carries a stale index | a lane teardown is one `Destroy` on the slab (`representation`); no patch Instance is ever assigned a second `Parent` or a second `Name` |
| N12 | Reducing the four tier heights toward each other, clamping `tier.height` at distance, or writing `.Size` on a patch after creation | `04-PRESENTATION.md`; `art/objects/01` criterion 3 (four distinct heights) | the four `tiers[].height` values in `GameConfig.luau` are pairwise distinct; `grep -rn "\.Size = " game/src/server/Plots.luau` matches only the creation path, the slab and the four boundary parts |
| N13 | Making a patch collidable, touchable or queryable in order to reuse an engine query as the proximity test | `art/objects/01` (does not collide); `mechanics/06` (nothing on a lane to climb or jump from) | `grep -rn "CanCollide = true" game/src/server/Plots.luau` matches only the slab and the boundary parts; no patch has a `Touched` connection |
| N14 | Deferring, batching, coalescing or dropping a currency award, a Find reveal or an area-completion push in order to smooth a frame | `core-loop/01`'s 3-second payoff ceiling; `mechanics/05`'s per-beat latency budgets; `core-loop/03` (reveal on contact, per patch) | `Progression.award` is called once per cleared patch inside the same tick as the clear; there is no queue, no accumulator and no coroutine between `clearPatch` and the award |
| N15 | Taking control away during a bay build or a join build — a loading screen, a frozen character, a camera lock, a forced idle, or a `WalkSpeed` write | `mechanics/05` (no beat takes control away); `response.negativeBeats` is 0 | `grep -rn "WalkSpeed = 0\|PlatformStand\|CameraType.Scriptable\|Enabled = false" game/src/client` returns nothing on a build path; no `ScreenGui` is created by a server module |
| N16 | Staggering, fading, tweening or animating patches into existence across frames in a way another client can observe | `theme/identity/03` (*"a plot appears and disappears whole; nothing may stagger or animate its patches into existence"*) | the bay container's `Parent` is assigned exactly once per build (`serverCost.burstBudget.buildRule`); `grep -rn "TweenService\|Transparency = " game/src/server/Plots.luau` returns nothing |
| N17 | Adding an uploaded image, mesh or sound asset to world geometry in order to reduce part count | `representation` (*"assembled from primitives; no asset ids"*); `budgets.textureCeilings` | `grep -rn "rbxassetid" game/src` returns nothing outside client UI files |

## Amends

**`N10`, round 3, closing RR-P9 and adopting Security's RR-S1 and Networking's RR-N8 in the
sheet that owns the row.** Both escalated correctly on substance and incorrectly on route — a
peer sheet in the same category, revised in the same round, cannot be told to amend mine, so I
amended it. `os.clock()` moves from forbidden to permitted; `math.random`, an unseeded
`Random.new()`, `os.time()` and `tick()` are unchanged, and the grep pattern is narrowed by
exactly one token. **The same one-token narrowing is owed to `architect/01-runtime` acceptance
criterion 3**, which carries the identical pattern and which neither Security nor Networking
can edit either — that one is a legitimate upstream escalation and both of theirs stand.

## Consequences for other work

- **Rate-limiting work (`integrity`) and reconciliation work (`prediction`)** are unblocked:
  a monotonic elapsed-time read is permitted, so an ingress counter and a restore timer need no
  new field and no waiver. Neither may read `os.time()` or `tick()`.
- **Runtime work (`architect/01-runtime`)** should narrow acceptance criterion 3's grep by the
  same token, per Security's RR-S1 and Networking's RR-N8. Until it does, that criterion and
  this row disagree by one string and the build fails the stricter of the two.
- **Whoever implements `budgets`' render ceilings** learns that `N1`, `N2` and `N12` remove
  every standard lever for a draw-call problem. If primitive parts do not batch, the remaining
  lever is `depths.areas[].patchCount` — a content decision, escalated to `depths`, never an
  optimisation.
- **Clearing-module work (`modules`/`clearing`)** inherits `N3`, `N4`, `N10` and `N14` as
  constraints on any loop rewrite, including `serverCost` RR-P5's conditional bucketing: a
  bucket index is an index over the same array, in the same order, with no removal.
- **Plot-and-lane work (`plots`, `representation`)** inherits `N11`, `N13` and `N16`: teardown
  is one `Destroy`, a patch is never reused, and a bay is parented once.
- **Area-boundary and set-dressing work (Art & Visuals — Environment)** inherits `N7`: the
  inter-plot boundary is a bound, not an object, and no fog or `Atmosphere` may be added to
  shorten the draw distance.
- **Publish-checklist work (Build & Deploy)** inherits `N5` and `N6` as two properties that may
  not be tuned downward at publish time to fix a frame-rate complaint.
- **Feedback, VFX and audio work** inherits `N14` and `N15`: no beat may be batched or delayed
  for frame budget, and no build may interrupt one.
- **Live-ops and roadmap work** inherits `N9` — this domain holds no space for any of the eight
  excluded systems, so adding one later is new budget work, not a field that is already there.

## Acceptance criteria

1. Every row `N1` to `N17` names at least one approved sheet or brief line in its `protects`
   column, and the seventeen `check` cells contain no cell that requires the game to be
   running: 17 of 17 are a grep, a manifest comparison or a static instance count.
2. Running every `grep` in the check column against the current `game/src` produces the stated
   result for all rows that name one (`N1`, `N3`, `N4`, `N7`, `N8`, `N9`, `N10`, `N12`, `N13`,
   `N15`, `N16`, `N17`). **`N10`'s pattern contains no `os.clock` token**, so a build that uses
   a monotonic elapsed-time read for rate limiting or reconciliation passes it.
3. This file contains zero fenced blocks tagged `manifest`, and `npm run bridge` reports no key
   provided or proposed by it.
4. `budgets.streaming.StreamingIntegrityMode != "Disabled"` and
   `budgets.streaming.StreamingMinRadius >= social.maxCoPresenceSeparationStuds.value` both
   hold in the merged manifest (`N5`, `N6`).

## Not decided here

Every ceiling these rows constrain — sheet `01`, which holds `budgets`. Every cost model,
tick figure and burst rule these rows constrain — sheet `02`, which holds `serverCost`. **This
sheet supplies neither key and proposes none; the key it would need does not exist, because a
prohibition set is a constraint on two keys rather than a third thing.** What a patch, a
boundary or a bay looks like inside the ceilings — Art & Visuals. Whether the bucketed scan in
`serverCost` RR-P5 is adopted — `architect`, `modules`/`clearing`. **Whether
`architect/01-runtime` acceptance criterion 3 takes the same one-token narrowing — `architect`,
on Security's RR-S1 and Networking's RR-N8; I amended my row and cannot amend theirs.** Whether
the checks above become a `bridge/merge.mjs` lint or stay build-report greps —
contract-and-seam work; three wave-1 sheets have already asked for the same machinery. Which
savings a *client* may take that never touch the server table — sheet `01` already takes two of
them and nothing here forbids a third that leaves `state.patches` alone.
