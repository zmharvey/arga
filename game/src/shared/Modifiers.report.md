# Build report — modifiers

Written to `game/src/shared/Modifiers.luau`. Exposes exactly `effective(state, axis)` and
`ceiling(axis, areaOrdinal)`. Depends only on `config`.

`luau-analyze game/src/shared/Modifiers.luau` reports seven errors, all of one class:
`Unknown global 'script'` (line 42) and `Unknown global 'warn'` (six warn sites). Both are
Roblox environment globals that the bare CLI has no definitions for; every other module in
`game/src` reports the same class (`Progression.luau`, `Protocol.luau`, `Layout.luau`,
`World.luau` all do). Nothing else is reported: the `:: any` on the require means the
config reads type-check against a declared `ConfigShape` instead of producing the
`Type 'unknown' does not have key ...` errors the sibling modules carry.

The module was executed against the real `GameConfig.luau` outside Roblox (the config
constructs no Roblox types, so it loads under plain `luau`). Numbers below are measured,
not derived on paper.

## The six numbers

At level 0 on every axis, nothing owned, no set complete:

| axis | `effective` | why |
|---|---|---|
| `value` | **1** | `upgradeEffect(value, 0)` = `base` 1. No ceiling on this axis, so no clamp. |
| `radius` | **5.5** | `upgradeEffect(radius, 0)` = `base` 5.5 = `movement.baseClearRadius`. Ceiling 60, not binding. |
| `speed` | **16** | `upgradeEffect(speed, 0)` = `base` 16 = `movement.baseWalkSpeed`. Ceiling 45.833…, not binding. |

At the ladder cap on every axis, all four sets complete, `span` owned, live area 8:

| axis | `effective` | arithmetic |
|---|---|---|
| `value` | **4.2** | `(1 + 0.25 x 10) = 3.5`, x terrace 1.2. No product on this axis. No ceiling. |
| `radius` | **36.036** | `(5.5 + 1.1 x 8) = 14.3`, x cistern 1.2 x spire 1.2 = 20.592, x span 1.75. Ceiling 60, not binding. |
| `speed` | **30.72** | `(16 + 1.6 x 6) = 25.6`, x vault 1.2. No product on this axis. Ceiling 45.833…, not binding. |

**The radius figure is not reachable in the shipped build.** `products.items[span].gamePassId`
is `nil`, so `entitlements.refresh` resolves `owned.span` to false for every player and the
purchase step contributes 1 on every axis. The maximum a player can actually reach today is
`value` 4.2, `radius` **20.592**, `speed` 30.72. The brief names this as a provisioning step
with an owner (`products.externalPrerequisite`), not an unfinished specification, so it is
recorded here and not listed as a stop.

Neither ceiling binds at any reachable configuration, which is what
`products.headroom.H1_axisCeiling` is for: at the shipped values `radius` sits at 36.036
against a margin of `0.9 x 60 = 54` and `speed` at 30.72 against `0.9 x 45.833 = 41.25`.
`effective("speed") x runtime.clearTickRate` is `30.72 x 0.12 = 3.686`, well under
`movement.baseClearRadius` 5.5, so done-when 4 holds with room.

## Stops

- **The brief contradicts itself about whether a completed set does anything, and the two
  readings differ by 20% on an axis a player watches.** The `interfaces` note for
  `effective` says "an absent factor is 1.0 and modifiers warns once at boot naming the four
  sets, WHICH MEANS A COMPLETED SET CURRENTLY CHANGES NOTHING". The `setBonus` Values block
  in the same brief, and `GameConfig.SetBonus.rows` on disk, carry `factor = 1.2` on all four
  rows. A builder who follows the note literally ships a game where collecting all 24 Finds
  changes no number; a builder who follows the config ships +20% on value, +44% on radius and
  +20% on speed. I followed the config (rows carry a factor; the note's rule is conditional on
  absence and its parenthetical assertion about "currently" is stale) and implemented the
  absent-factor path as documented: read as 1.0, warned once naming the offending set ids.
  The note should be struck or the rows should lose their factors, but not both readings can
  stand.

- **Done-when 3 requires a boot-time headroom assertion and `wiring` has no step that calls
  one.** The `Must expose` list is two pure functions, neither of which is a boot hook, and
  no entry in `wiring.boot` names `modifiers`. Three defensible builds exist: assert at
  require time (which `tree.rules` forbids, "every module performs no work at require time"),
  export a third function that nothing in the wiring calls (so it never runs), or run it
  lazily. I ran it lazily, once, on the first call to `effective` or `ceiling`, which in
  practice is the first character spawn. The consequence of getting this wrong is a silent
  one: this assertion is the only thing that tells anybody a re-tuned factor has started
  being eaten by the clamp, and `products.headroom.clampMayAbsorbAPurchase` is false. No
  player sees it either way, but two builders would place it differently and one placement
  never fires. If the intent is a real boot assertion, `wiring.boot` needs a step and the
  `Must expose` list needs a third name.

## Decided without a stated value

- **Which route computes the radius ceiling.** `modifiers.axes[radius].ceilingRule` is
  `effective < area.size / 2`; `products.headroom.ceilings.radius` is
  `plots.laneWidthStuds / 2`. Both are 60. `GameConfig.Area` describes ordinal 1 only and
  `GameConfig.Depths.areas[N]` carries `footprintStuds2` and no `size`, so `area.size` has no
  value for N > 1; a builder deriving it as `sqrt(footprintStuds2) / 2` would return 120 at
  ordinal 5 and above. I used `Plots.laneWidthStuds / 2` for every ordinal, on the brief's own
  statement that "every area is the same lane width today" (areas grow longer in Z, never
  wider). The module warns at first use if the two routes ever stop agreeing.
- **`areaOrdinal` is accepted and does not change the answer.** It is threaded through
  `laneWidthAt(areaOrdinal)` so the parameter has a place to matter later rather than being
  ignored at the top of the function. It is not validated: a zero or negative ordinal returns
  the same ceiling rather than erroring.
- **The clamp is inclusive, `math.min(result, cap)`.** The radius rule is written as a strict
  inequality (`effective < area.size / 2`) and no epsilon is specified anywhere, so a value
  that overshoots lands exactly ON 60 rather than just below it. Inventing an epsilon would
  have been inventing a number; H1 is what actually keeps the strict inequality true, and it
  is asserted. Speed's rule is written non-strict (`<=`) and needs nothing.
- **What happens to a factor below `modifiers.factorFloor`.** Forbidden by
  `modifiers.forbidden`, with no stated runtime behaviour. I read it as 1 (the identity for a
  multiplicative step) and warn once naming the set or product, rather than throwing on a path
  that runs every tick for every player.
- **What happens to a `products.items[]` entry with no `factor`.** The brief documents the
  missing-factor rule only for set rows. I applied the same treatment to products for
  symmetry: read as 1, and the floor audit names the item.
- **Set-completion is "all six names true in `state.found`",** per
  `discovery.record.derived.setComplete`, not `setBonus.grantedAt` ("the clear of the last
  patch of the last area at that set's depth"). Those coincide as long as layout keeps a
  depth's slice inside that depth's areas, which `discovery.pool` guarantees. A set with zero
  names would read as vacuously complete; no set has zero names.
- **Iteration order inside step 2.** `modifiers.withinStepOrder` says collection declaration
  order, so the loop walks `GameConfig.RelicSets` and looks the bonus row up by `setId`,
  rather than walking `SetBonus.rows` (same order today). A set with no row contributes
  nothing. Within the loop the axis test runs before the completeness test, so a set on
  another axis costs one string comparison instead of six map lookups per tick.
- **Floating-point ordering.** Multiplication is applied left to right in declaration order.
  It is not associative in doubles, so a different order could differ in the last bits; the
  brief fixes an order and I followed it.
- **No nil guard on `state.owned` or `state.found`.** `persistence.defaultState` initialises
  both and `wiring.onJoin` resolves `owned` before the publish point, so a state that reaches
  `effective` always has them. A state that somehow does not will throw rather than silently
  paying the unpurchased multiplier, which is the failure mode `wiring.onJoin` step 2 exists
  to prevent.
- **An unknown axis throws.** `assert` with a message naming the three valid ids, per "Any
  other string is an error, not a fallback". The message is mine.
- **`ceiling` returns nil for an axis with no rule** rather than erroring, so a fourth axis
  added to the ladder is simply unclamped. The audit warns if `GameConfig.Modifiers.axes`
  states a `ceilingRule` for an axis this module has no branch for, which is the case that
  would otherwise be silent.
- **The audit runs once per server, not once per state,** and its findings are all about the
  config rather than about a player. It warns once per condition; the H1 warning is emitted
  once per axis at the tightest ordinal rather than once per axis per area (all eight ordinals
  carry the same ceiling today, so the per-area form was eight identical lines).
- **No runtime guard against a client requiring this module.** The prohibition is enforced by
  nobody requiring it from the client; adding a `RunService:IsClient()` check would have added
  a service dependency the brief does not list.
- **Local names, comment wording and warning strings** are mine: `admit`, `runAudit`,
  `laneWidthAt`, `setFactorProduct`, `purchaseFactorProduct`, `isSetComplete`,
  `maxSetFactorProduct`, `maxPurchaseFactorProduct`, `VALUE_ID` / `RADIUS_ID` / `SPEED_ID`
  (the last three following `Progression.luau`'s precedent).
- **`runtime.serverTickSeconds` does not exist.** `GameConfig.Products.headroom.H1_axisCeiling.ceilings.speed`
  spells the speed divisor that way; the emitted key is `ClearTickRate`, and the brief's
  interface note gives the same 45.83 from `runtime.clearTickRate`. It is prose inside a
  config string, so it computes nothing, but it is the same spelling defect that has bitten
  this build before.
- **`grep -rn 'combinedFactorCap\|setFactor\|purchaseFactor' game/src` now matches two files,**
  not one: `Modifiers.luau` and `GameConfig.luau`, where `combinedFactorCap` is an emitted data
  key. Done-when 2's intent (one arithmetic site) holds; the grep as literally written cannot.

## Assumed about a dependency

- **`GameConfig` is the module's returned table, not a callable,** and every block named in
  the brief is emitted under the PascalCase name the interface note gives. Verified by reading
  `game/src/shared/GameConfig.luau`: `Upgrades`, `RelicSets`, `SetBonus`, `Products`,
  `Modifiers`, `Plots`, `Depths`, `Area`, `BaseClearRadius`, `ClearTickRate` all exist with
  the shapes assumed.
- **`GameConfig.upgradeEffect(def, level)` already contains `def.base`** and is the only place
  the additive-versus-compounding question is answered. Called once per `effective`, never
  reimplemented. The headroom audit gets its ladder max from `upgradeEffect(def, def.maxLevel)`
  rather than from H1's stated `base + maxLevel * perLevel`, so a future compounding axis is
  bounded correctly instead of by a formula that only holds for additive ones.
- **`entitlements.refresh` fills `state.owned` with one key per `products.items[]` entry
  before the state is published,** so `effective` reading it on the first tick is safe. That
  module is not yet written; I coded against the declared behaviour in `wiring.onJoin` step 2
  and `stateShape.owned`.
- **`state.found` is keyed by the Find's name exactly as it appears in
  `collection.sets[].relics`,** written by `clearing`. Set completion compares against those
  strings directly.
- **`state.upgrades` is keyed by `upgrades[].id`** and a missing key means level 0, per
  `stateShape.upgrades`. Same convention `Progression.luau` already uses.
- **`Types.luau` is not required.** It is generated, it says "Require this. Do not declare your
  own copy", and it is not listed as a dependency of this module. An instance require does not
  resolve for this repo's `luau-analyze` (`type X = Types.PlayerState` produces
  `Unknown type 'Types.PlayerState'`), so I declared a narrow reader type covering only the
  four fields this module reads. A full `Types.PlayerState` satisfies it structurally. This is
  known gap 2 in `CLAUDE.md` rather than a new finding.
- **`progression` no longer exposes `clearRadius`, `walkSpeed` or `valueMultiplier`.**
  Confirmed on disk: `Progression.luau` was rewritten during this wave and its header now
  points those three at `modifiers.effective`. `Clearing.luau` has not been rewritten yet and
  still calls `Progression.clearRadius(state)` and `Progression.valueMultiplier(state)` at
  lines 165 and 167, which are now nil. That is `clearing`'s repair, not mine, and it is
  presumably already in this wave; noting it because until it lands the value and radius axes
  reach nothing at all.

## Disclosure

While grepping `game/src` for the three retired `progression` function names I did not scope
the grep, and three matching lines from `game/src/server/init.server.luau` (a file my brief
forbids) appeared in the output. What they show is that the wave-1 server entry point still
calls `Progression.walkSpeed`. Nothing in them bears on this module's resolution order,
factors, ceilings or values, all of which were settled from the brief before the grep ran. I
opened neither forbidden file.
