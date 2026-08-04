# Build report — progression

**Analyzer.** `luau-analyze` (both `--solver=new`, the default, and `--solver=old`) reports
exactly two root diagnostics on the delivered file, both from the require line:

```
Progression.luau(20,27): TypeError: Unknown global 'game'; consider assigning to it first
Progression.luau(21,20): TypeError: Unknown require: unsupported path
```

and, under the new solver only, two cascades from `GameConfig` therefore being `unknown`
(`Type 'unknown' does not have key 'id'` at the index-building loop). There is no Roblox
type-definition file and no analyzer configuration anywhere in the working root, so an
engine-style require cannot resolve outside Studio. I verified the rest of the module by
analyzing a byte-identical copy whose only difference was `require("../shared/GameConfig")`
in place of the two require lines: **clean, zero diagnostics, under both solvers and under
`--mode=strict`**, with `GameConfig`'s real types resolved. I then executed that copy under
the `luau` CLI against the real config and confirmed all three "Done when" criteria plus the
edge cases listed below. Scratch files were deleted. See the require entry under *Stops*.

## Stops

- **Which source is authoritative for the level-0 reach and pace.** `movement.baseClearRadius`
  (5.5) and `upgrades[radius].base` (5.5) are two independently emitted copies of the same
  number, as are `movement.baseWalkSpeed` (16) and `upgrades[speed].base` (16). Nothing states
  a precedence, and "Done when 3" names `movement.baseClearRadius` while `GameConfig`'s own
  comment says every axis goes through `upgradeEffect`, which reads `upgrade.base`. I went
  through `upgradeEffect`, so `GameConfig.BaseClearRadius` and `GameConfig.BaseWalkSpeed` are
  read by nothing in this module and criterion 3 passes only because the two values currently
  agree. Editing one sheet without the other silently breaks the acceptance criterion and
  nothing would catch it. What I would otherwise have had to invent: a precedence rule, or a
  runtime assertion that they match (I invented neither).
- **Whether `upgradeCost(upgrade, level)` is indexed by the level you have or the level you are
  buying.** The config gives only `floor(costBase * costGrowth^level)`. I used the *current*
  level, so the first purchase of an axis costs exactly `costBase` (25 / 40 / 60) and the last
  costs `costBase * costGrowth^(maxLevel-1)`. The other reading multiplies the entire ladder by
  `costGrowth`: the Value ladder costs 4,536 shards as built and 7,258 the other way. That is a
  balance number, and I had to pick one to deliver `tryBuy` at all. I picked the near-universal
  convention rather than blocking, but the design never says.
- **The opening balance and the starting upgrade map for a new player, and who builds them.**
  `currency` and `upgrades` are declared `writtenBy: progression, persisted: true`, but my
  *Must expose* list contains no constructor or initializer and no starting value is listed
  anywhere. I did not invent one. The module requires the caller to hand it a state that
  already has both fields; a state with `upgrades = nil` is a runtime error on first index. If
  the intent is that progression owns the default, then a starting-currency value is missing
  from the contract.
- **The runtime path from a server module to the shared config.** No `default.project.json`,
  no `.luaurc`, no sibling server module I was permitted to read, and the one file that would
  show this repo's convention (`init.server.luau`) is forbidden. I invented
  `game:GetService("ReplicatedStorage")` + `ReplicatedStorage.Shared.GameConfig`, including the
  capitalisation of the `Shared` folder, which is a name Rojo's project file decides and I
  cannot see. This is the only reason the delivered file does not analyze clean.
- **Whether currency is an integer.** Costs are floored integers; awards are not. A tier value
  of 1 times a level-1 multiplier of 1.25 is 1.25, so a balance goes fractional on the second
  patch of the game. Nothing says whether the award is rounded, whether only the display is
  rounded, or whether fractional shards are intended. I do not round anywhere, so `award(1.25)`
  stores 1.25 and the HUD will show whatever the HUD decides.
- **Whether a successful purchase has to tell anyone.** `tryBuy` returns a boolean and writes
  state. Nothing in my contract fires an event, and `walkSpeed` is a getter, so after buying
  Pace nothing in this module makes the player move faster. Some unnamed party must call
  `walkSpeed(state)` and write the Humanoid. Which party, and on what trigger, is unowned.
- **Whether a currency cap exists.** No maximum is stated, so none is enforced.

## Decided without a stated value

**Contract surface and shape**

- Module table is named `Progression`, matching the file name, matching `GameConfig`'s
  `local GameConfig = {}` convention. Returned at the bottom, no metatable.
- Plain free functions taking `state` as the first argument, not `:` methods and not a
  per-player object. The signatures in the brief settle this; I am recording that I read them
  as literal.
- Exposed exactly the five listed functions and nothing else. `levelOf` and the axis lookup are
  file-locals. I deliberately did **not** expose `currentLevel(state, id)` or
  `nextCost(state, id)` even though a shop UI needs both to draw a row; the client can
  recompute them from the shared `GameConfig` and the replicated level. If the design wanted
  the server to be the single source of the displayed price, that function is absent.
- Function order in the file mirrors the *Must expose* order (award, tryBuy, clearRadius,
  walkSpeed, valueMultiplier).
- `award` returns nothing, because the brief's signature shows no return type. Returning the
  new balance, or a boolean "was applied", would both have been useful; neither was specified.
- `tryBuy`'s boolean carries no reason. A caller cannot distinguish "cannot afford" from
  "already maxed" from "no such id" without recomputing the cost itself, so any refusal text
  the UI shows is re-derived rather than returned.
- Two exported types, `UpgradeLevels` and `ProgressionState`; both names are mine. The state
  type declares only `currency` and `upgrades` rather than the full `PlayerState` record from
  the brief, because the other five fields belong to other modules and two of them
  (`Vector3`, `BasePart`, `Player`) are engine types this file would then have to name, which
  would cost the module the property `GameConfig` advertises: loading outside the engine.
  Luau width subtyping lets a caller pass the full record; I verified that under both solvers.
- A local, unexported `Upgrade` type restates the *shape* of a `GameConfig.Upgrades` entry
  (nine fields, no values). The alternative, `typeof(GameConfig.Upgrades[1])`, does not survive
  an engine-style require. This is a second place that has to change if the config schema gains
  a field, though only additively.

**Behaviour nobody specified**

- `award` ignores any amount that is not strictly positive, rather than erroring or asserting.
  The state contract says currency is "never decremented except by `tryBuy`", so a negative
  award must not apply; a silent no-op was chosen over `error()` so that a bad award cannot
  kill the clearing loop that calls it. A zero award is likewise a no-op.
- `award` also ignores `NaN` and `+inf`. Unstated; I chose "reject non-finite" over "apply".
- `award` does not round, floor, clamp or cap.
- Affordability is written `if not (state.currency >= cost) then return false end` rather than
  `if state.currency < cost`. With a `NaN` balance the second form buys the upgrade for free,
  because `NaN < 25` is false. Verified: a `NaN` balance now refuses.
- Exactly affordable is a purchase. `currency == cost` succeeds and leaves the player at 0.
- One level per call. No bulk buy, no buy-max, no queueing.
- Check order inside `tryBuy` is: unknown id, then maxLevel, then affordability. A maxed axis
  therefore returns false regardless of balance. The order is not externally observable because
  nothing is written until every check has passed, which is also how "changes nothing" is
  guaranteed: the two writes (currency, then level) are the last two statements and no yield
  separates them.
- An unknown `upgradeId` returns false rather than raising. A server-side typo is silent.
- No runtime `type(upgradeId) == "string"` guard. A non-string or `nil` id reaches a table read,
  which is legal in Lua and yields `nil`, which yields false. Verified.
- `levelOf` floors and clamps the stored level to `[0, upgrade.maxLevel]` before anything uses
  it. Nothing asked for this. It means a save written under a config with a wider ladder reads
  low and can never be bought back up (the stored number is left untouched until the next
  successful purchase, which then normalises it to `clamped + 1`), and it means a negative or
  fractional stored level cannot produce a reach outside the tuned range. The alternative,
  trusting the stored number, hands a corrupt save straight into `upgradeEffect`.
- `levelOf` reads `NaN` as level 0.
- `levelOf` reads a missing key as level 0. This one *is* stated in the state contract; I list
  it because the same function invents the three treatments above.
- A successful purchase writes `clamped level + 1`, not `stored level + 1`.
- An axis id that this module derives a quantity from but that is missing from
  `GameConfig.Upgrades` is fatal **at module load**, via `error(..., 0)`, rather than falling
  back to `BaseClearRadius` / `BaseWalkSpeed` / a multiplier of 1. Reasoning: the config is a
  build artifact, so a missing axis is a defect that should surface at startup rather than at
  the first clear tick, and two of the three fallbacks would have been invented numbers. Note
  the resulting asymmetry, which is a choice: an unknown id *from a caller* is a soft false, an
  absent axis *in the config* is a hard stop.
- The error string is mine, verbatim:
  `Progression: GameConfig.Upgrades has no axis with id "<id>"`, raised with level 0 so no
  file:line prefix is attached.
- Nothing prunes or validates unknown keys in `state.upgrades`. A key from a retired axis
  survives in the save forever and is ignored.
- No defensive `state.upgrades = state.upgrades or {}`. If the field is missing the module
  raises on index rather than repairing state it did not create.

**Mapping and naming**

- The upgrade-id → quantity mapping (`radius` → `clearRadius`, `speed` → `walkSpeed`,
  `value` → `valueMultiplier`) is inferred from the ids and blurbs; the brief never states it.
  Those three ids are the only config-derived string literals in the file, held in
  `VALUE_ID` / `RADIUS_ID` / `SPEED_ID`. There is no way to pull them from the config without
  inventing a convention (positional index, or a name→role field the schema does not have).
- `SCREAMING_CASE` for those three id constants, camelCase for every other local
  (`upgradeById`, `valueAxis`, `radiusAxis`, `speedAxis`, `stored`, `level`, `cost`,
  `upgrade`). `GameConfig` has PascalCase data tables and camelCase functions but no precedent
  for module-level constants.
- Parameter names `state`, `amount`, `upgradeId` are taken from the brief's signatures;
  everything else is mine.
- Tabs, `--[[ ]]` file header, sentence-case comments explaining *why* rather than *what*:
  copied from `GameConfig`.
- Plain `..` concatenation in the error message rather than backtick interpolation, since
  `GameConfig` uses no interpolation anywhere.

**Structure and performance**

- The id → upgrade index (`upgradeById`) is built once at module load with `ipairs`, rather
  than scanned linearly per call. With three axes this is not a performance decision, it is a
  readability one. Config order is preserved into the table but never depended on.
- The three axes are resolved to module-level locals once at load, so `clearRadius` (which a
  clearing loop may call at 0.12s cadence per player) does a table read and two arithmetic ops
  and allocates nothing.
- Nothing is cached per player. `clearRadius` recomputes on every call; there is no
  invalidation to get wrong.
- No debounce, mutex, or reentrancy guard on `tryBuy`. The module never yields, so a purchase
  is atomic with respect to other server code.
- No logging, telemetry, analytics or events on award or purchase.
- No persistence. Both owned fields are `persisted: true` but this module never touches a
  DataStore; `GameConfig.DataStoreName` and `SaveIntervalSeconds` are somebody else's.
- `walkSpeed` returns a number and does not write `Humanoid.WalkSpeed`, does not clamp to any
  engine speed limit, and never touches a character.
- `clearRadius` is not rounded or snapped to a stud grid; it returns 5.5, 6.6 … 14.3 exactly.
- `valueMultiplier` returns the multiplier and multiplies nothing. The brief gives progression
  "the payout multiplier", not the payout, so the multiply happens at the clearing site.
- `math.clamp` / `math.floor` used rather than hand-rolled comparisons.

## Assumed about a dependency

- **`GameConfig` is reachable at `ReplicatedStorage.Shared.GameConfig` at runtime.** Invented;
  see *Stops*. It is one line to change if the Rojo tree says otherwise.
- **`GameConfig.upgradeEffect` is fair game.** The brief's dependency list names only
  `GameConfig table`, `upgradeCost` and `tierByWeight`; `upgradeEffect` is in the file, is
  documented there as "the one formula … so 'additive or compounding' is answered in one place
  rather than re-decided by each module that reads a level", and all three of my derived
  quantities go through it. Either the brief's list of the dependency's surface is incomplete
  or I am calling something outside the declared contract. I read the file's own comment as
  the stronger signal.
- **`upgradeCost(upgrade, level)` returns the price of leaving `level`,** not of arriving at
  it. See *Stops*; this is the single assumption with the largest balance consequence.
- **`upgradeCost` returns a non-negative number** and is monotonically non-decreasing in level.
  I do not verify either; a negative cost would pay the player.
- **Every entry in `GameConfig.Upgrades` carries all nine fields** in my `Upgrade` shape, and
  **`id` is unique across entries.** The config's comments say the schema enforces unique tier
  *shapes*, but nothing says ids are unique. If two entries shared an id, my index silently
  keeps the last and the first axis becomes unbuyable.
- **`maxLevel >= 0`, `perLevel >= 0`, `costGrowth > 1`.** Unchecked. A `maxLevel` of 0 would
  make an axis permanently unbuyable and `math.clamp` would still behave; a `costGrowth` below
  1 would make the ladder cheapen.
- **`GameConfig` is immutable at runtime.** I hold references to three of its upgrade tables
  rather than copies, so a mutation of `GameConfig.Upgrades` after load would change behaviour
  mid-session. I never mutate them.
- **`upgradeEffect`'s `mode` handling is complete.** It branches on `"compounding"` and treats
  everything else as additive; all three current axes are `"additive"`. A typo in a future
  `mode` string fails silently as additive, in the dependency, not here.
- **The state table is per-player and safe to mutate in place,** and no other module writes
  `currency` or `upgrades` (the state contract says progression owns both), so there is no
  read-modify-write race to defend against.
- **`clearing` calls `valueMultiplier` and applies it before calling `award`,** and whoever
  owns the character calls `walkSpeed` after a successful purchase. Neither is wired from here.
- **`Clearing.luau` appeared in `game/src/server/` while I was writing.** I did not open it, so
  I have assumed nothing from it and matched nothing in it.
