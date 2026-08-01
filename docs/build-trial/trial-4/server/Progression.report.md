# Build report — progression

## Stops

- **What `award` returns when it rejects.** The interface says `returns: number — the new
  balance` and separately that it "rejects a non-positive amount rather than clamping". It
  never says what a rejection *returns*, or whether a rejection is silent, logged or thrown.
  The three readings (return the unchanged balance / return 0 / `error()`) are all consistent
  with the sentence and are observably different to a caller. I would otherwise have had to
  invent a failure protocol for the only function that moves currency upward. **Chose:**
  leave the balance untouched, `warn` once, return the unchanged balance.
- **What happens when `GameConfig.Upgrades` has no entry for one of the three ids this
  module names.** `tryBuy` has a specified answer (unknown id → `false`), but `clearRadius`,
  `walkSpeed` and `valueMultiplier` have no defined behaviour if the ladder is re-emitted
  without a `radius`, `speed` or `value` entry. Every alternative is a number I would have
  had to invent: `GameConfig.BaseClearRadius`, `GameConfig.BaseWalkSpeed`, and for the value
  axis there is no config fallback at all, so I would have had to type `1.0`. **Chose:**
  `assert` and throw, so that no invented number can enter the game. Note the consequence:
  `clearing.tick` wraps its pass in a `pcall`, so this throw is caught and re-thrown every
  0.12s and the clear loop stops paying out silently apart from the log.
- **No rule for a held level above `maxLevel`.** `tryBuy` cannot create one, but nothing says
  what the derived quantities do if `persistence.load` returns `upgrades = { speed = 99 }`
  from a stale, hand-edited or previously-mis-tuned save. `upgradeEffect` is a pure formula
  with no ceiling, so a level of 99 yields a WalkSpeed of 174.4. The *Must not* covers only
  the purchase, not the read. I would have had to invent a clamp policy. **Chose:** no clamp
  — state is the record, `tryBuy` is the only writer in a healthy build, and clamping here
  would hide a persistence defect rather than surface it.
- **The require path for the config is spelled two different ways in one brief.**
  `tree.sharedRoot` and every example say `ReplicatedStorage.UIForge`; the `interfaces` entry
  for `config` says "`require(ReplicatedStorage.Shared.GameConfig)` IS this table". These are
  different Instance paths and only one of them resolves at runtime. **Chose:**
  `ReplicatedStorage:WaitForChild("UIForge")`, because `04-tree.md` is the file that owns
  where code lives and the `interfaces` sentence is prose making a different point (that the
  module is not callable). If the runtime folder is actually `Shared`, this module fails to
  load with a `WaitForChild` timeout and so does every other module in the build.
- **Two config keys hold the same two numbers, and this module is told to read the one that
  is not the obviously-named one.** `GameConfig.BaseClearRadius = 5.5` /
  `GameConfig.BaseWalkSpeed = 16` duplicate `Upgrades[radius].base` / `Upgrades[speed].base`,
  which come from two different sheets (`gameplay/mechanics/01-reach-and-pace.md` and
  `gameplay/balance/01-upgrade-ladder.md`). My interface says to compute from the *def*, and
  acceptance criterion 3 says the result must equal `movement.baseClearRadius`, i.e. the
  *other* key. Nothing in the emitted config ties them together, so re-emitting one sheet
  without the other makes criterion 3 fail with no code change and no error. This is not a
  value I could not find; it is a value I found twice, which is the same defect wearing a
  different hat. There is no `value`-axis equivalent of `BaseValueMultiplier`, so the
  duplication is not even uniform.

## Decided without a stated value

**Require preamble and naming**

- Split the require into `local ReplicatedStorage = game:GetService("ReplicatedStorage")` and
  `local Shared = ReplicatedStorage:WaitForChild("UIForge")`. The tree's `requireExample`
  inlines the whole chain on one line; its `sharedFromAnySide` example does not hoist the
  service either. Neither form is mandated.
- Named the shared-root local `Shared` even though the folder is `UIForge`, copying the
  tree's own example. A reader grepping for `UIForge` finds one line.
- Used `Shared.GameConfig` (a direct index) rather than `Shared:WaitForChild("GameConfig")`.
  The tree contradicts itself here: rule 2 says "WaitForChild the shared root once, into a
  local; index its children directly after that", while `requireExample` shows
  `:WaitForChild("GameConfig")`. I followed the rule over the example.
- Did not annotate the require's result or cast it. Under a resolved Rojo sourcemap that
  gives real type checking against the actual config; casting it to a locally-declared config
  type would silence the standalone analyzer but would also mask config drift in the real
  environment. See "How it was checked" below for what that costs.

**Module shape**

- Module table named `Progression`, declared `local Progression = {}` at the top and returned
  at the bottom, and members declared as `function Progression.name(...)` — the exact shape
  `GameConfig.luau` uses. A table literal with function fields would satisfy the brief
  equally.
- Public functions ordered as the *Must expose* list orders them (award, tryBuy, clearRadius,
  walkSpeed, valueMultiplier); the four private helpers sit above them all.
- Nothing runs at require time except the config require itself (tree rule 1).
- Tabs, ~90-column comments, a block header comment in the style of `GameConfig.luau`, and a
  short comment above each function. No convention for this is stated anywhere.
- Used backtick string interpolation for the two runtime messages. `GameConfig.luau` never
  demonstrates it, so it is an unforced style choice about how modern a Luau dialect this
  repo writes.

**Names I invented**

- Helpers: `findUpgrade`, `requireUpgrade`, `heldLevel`, `effectOf`.
- Constants: `VALUE_ID`, `RADIUS_ID`, `SPEED_ID`, SCREAMING_SNAKE. There is no local-constant
  precedent in `GameConfig.luau` to copy.
- Local types: `UpgradeDef`, `PlayerState`.
- Parameter/local names: `state`, `upgradeId`, `amount`, `def`, `level`, `cost`.

**The three ids are string literals in this module**

- `GameConfig.Upgrades` is an ordered array with no by-id accessor and no exported
  `UpgradeIds`, so a module that wants "the Reach axis" has no handle but the string
  `"radius"`. The three ids are specified values (they are in my *Values*), so writing them
  is not inventing one, but it does mean re-emitting the ladder with renamed ids breaks this
  module at runtime rather than at emit time. I put them in three named constants so the
  coupling is visible in one place. A `GameConfig.upgradeById(id)` accessor would remove it
  entirely; that is a dependency gap, not something I could fix here.

**Lookup**

- Linear scan over `GameConfig.Upgrades` on every call, no memoised id→def map, because tree
  rule 1 forbids work at require time and a lazily-built cache is a second source of truth
  for a table that could in principle be re-emitted. Three entries. `clearRadius` is called
  once per player per 0.12s tick, so this is 3 comparisons per player per tick; no
  performance budget is stated anywhere, so I did not treat it as a constraint.
- `findUpgrade` returns the first id match; duplicate ids in the ladder are not detected.
- `ipairs` rather than a numeric `for`, matching `GameConfig.tierByWeight`.

**`tryBuy` specifics**

- Check order: unknown id → at maxLevel → cannot afford. Unobservable today (all three
  return a bare `false` and mutate nothing), but it fixes which reason a future log or
  telemetry line would report.
- `level >= def.maxLevel` rejects, not `level == def.maxLevel` as the interface phrases it,
  so a corrupt over-max level cannot buy further levels. Verified: `{speed = 99}` is refused.
- Affordability is `state.currency < cost` → reject, so spending your balance to exactly zero
  is a legal purchase. The *Must not* says "below an upgrade's cost", which I read as strict.
- Returns a bare `boolean` with no reason code, no second return value, no error string.
  Server-main sends nothing to the client on failure, so no reason is transportable anyway.
- Deducts currency by writing `state.currency -= cost` directly rather than calling `award`
  with a negative amount — required by the state-shape note ("never decremented except by
  `tryBuy`, never increased except by `award`") and by `award`'s own rejection of
  non-positive amounts, but worth recording as the reason the two paths are not symmetric.
- Writes currency before the level. Both writes happen after every check, there is no yield
  between them, and no other coroutine can observe the interleaving, so the order is
  arbitrary.
- Does not validate that `upgradeId` is a string; `wiring.onPurchase` step 1 gives that job
  to server-main. If server-main skips it, a non-string id simply matches nothing and returns
  `false`, which is a benign accident rather than a designed defence.
- Does no logging on success. Nothing asks for an audit trail on currency movement.

**`award` specifics**

- The guard is `if not (amount > 0)` rather than `if amount <= 0`, so `NaN` is rejected
  instead of silently turning the balance into `NaN` forever. NaN is not mentioned anywhere.
- The rejection message is `progression.award: ignoring a non-positive award of {amount}`.
  Every character of that string is invented; there is no error-message or log-prefix
  convention in the brief or in `GameConfig.luau`. I prefixed it with the module name in
  lower case, matching how the brief refers to modules.
- Rejection is a `warn`, not an `error` and not silence. `error` would be caught by
  `clearing`'s per-tick `pcall` and would take out an entire tick's payouts for every player
  in that pass; silence would hide a caller bug the interface explicitly calls a caller bug.
- Does not check that `amount` is a whole number. The interface says the caller has already
  applied `max(1, floor(...))`, so a fractional award means the caller is broken, and I chose
  not to add a second floor that would paper over it.
- No upper bound, no overflow or cap check on `currency`. No maximum balance is stated.
- Returns `state.currency` after the add, i.e. reads the field back rather than returning a
  locally computed sum. Identical today; differs if anything ever adds a setter.

**Types**

- Declared `export type PlayerState = { currency: number, upgrades: { [string]: number } }`
  — only the two fields this module owns. The build order has **no shared types module**, so
  either every module declares its own view of `PlayerState` (drift between eight
  declarations) or they all take `any`. I chose the narrow view because the full state shape
  needs `Player`, `BasePart` and `Vector3`, and `GameConfig` deliberately constructs no
  Roblox types. Luau's width subtyping means the full state passes cleanly into these
  signatures. Whether the type should be exported at all, and under what name, is undecided
  by the brief; I exported it so a sibling *could* reference one declaration instead of
  writing a ninth.
- `upgrades` is typed `{ [string]: number }`. The state shape says `map<upgradeId,integer>`;
  Luau has no integer type and no way to constrain the key to the three ids without a
  literal union that would go stale when the ladder is re-emitted.
- Declared a local `UpgradeDef` with all nine fields of a ladder entry, purely so the helper
  signatures read. It restates the *shape* of a config entry (not any of its values) in a
  second file; if the emitter ever adds a field, this type does not need to change, but if it
  renames one it will not catch it either.

**Derived quantities**

- All three getters are the same three lines via a shared `effectOf` helper, so none of them
  can drift into inlining the curve. Only `clearRadius` is explicitly told to be uncached; I
  applied "compute, never cache" to all three.
- No clamping of the returned numbers to any range (see Stops).
- No rounding: `clearRadius` returns 14.3 at max, `walkSpeed` 25.6, `valueMultiplier` 3.5.
  Nothing says these should be rounded, and rounding would belong to the consumer anyway.
- No `nil`/shape guard on `state` or `state.upgrades`. If either is missing this errors
  rather than returning a default; the wiring's join barrier is what makes that safe.

**Not written**

- No `refund`, `spend`, `setLevel`, `levelOf`, `costOf` or `canAfford` public helper, even
  though a HUD affordance would plausibly want `costOf`. The *Must expose* list is exactly
  five names and I treated it as closed. `hud-binding` or `input` needing a price will have
  to recompute it from `GameConfig.upgradeCost`, which is fine, but nothing routes it through
  this module.
- No tests, no sibling module, no edit to `GameConfig.luau`.

**How it was checked**

- `luau-analyze game/src/server/Progression.luau` cannot be clean for any Roblox server
  module: with no `--defs` flag in this build (`luau-analyze` 0.6xx here has only
  `--mode`, `--formatter`, `--solver`) it knows neither the `game` global, nor `warn`, nor
  how to resolve an Instance require. Under `--solver=old` the file reports exactly those
  three environment errors and nothing else. Under the default new solver, the unresolved
  require additionally makes `GameConfig` `unknown`, which propagates into two more errors at
  the `findUpgrade` loop. Both extra errors are artefacts of the require, not of the code.
- To check the code itself I built a throwaway file in the session scratchpad that inlines
  `GameConfig.luau`'s body in place of the require and stubs `warn`, i.e. the same source
  with the dependency resolved. **That file is clean under both `--solver=old` and the new
  solver, exit 0.** It has been deleted; nothing outside the two deliverable files was
  written into the working root.
- I also executed that resolved file under `luau` to check the three *Done when* criteria
  rather than assert them: (1) 39 Shards against a 40 Shard Reach returns `false` and leaves
  currency and the upgrades map untouched; (2) `speed` at level 6 returns `false` and changes
  nothing; (3) `clearRadius` at level 0 is exactly `GameConfig.BaseClearRadius`. Also
  checked: the whole Value ladder bought one level at a time, one Shard short at every rung
  (10 refusals, 10 purchases, 4536 Shards total, balance exactly 0 after each), exact-cost
  purchases succeeding, unknown ids, and zero/negative/NaN awards. Maxed Reach comes out at
  14.3, which is the reading `GameConfig.luau`'s own comment says a builder could not have
  guessed from `perLevel` alone.

## Assumed about a dependency

- **`GameConfig.luau` exists and I read it**, so its four exposed names are checked, not
  assumed. Everything below is about behaviour I cannot see from the source, or about modules
  that do not exist yet.
- `GameConfig.upgradeCost` is declared `(upgrade: { costBase: number, costGrowth: number },
  level: number)`. I pass a whole `UpgradeDef`, per the interface's "the table itself and not
  its id". Assumed the narrower parameter type is a convenience, not a requirement that I
  pass a stripped table. (Structurally verified: it typechecks.)
- Assumed `upgradeCost` returns an already-floored integer — it does, in the source — and
  therefore that I must not floor it again, and that comparing `state.currency < cost` needs
  no epsilon.
- Assumed `upgradeEffect` remains the only place the additive-vs-compounding question is
  answered, so this module never reads `def.mode`, never branches on it, and would pick up a
  future compounding axis for free.
- Assumed ids in `GameConfig.Upgrades` are unique and stable across re-emits. Nothing in the
  emitted config enforces uniqueness.
- Assumed the config's runtime location is `ReplicatedStorage.UIForge.GameConfig` (see
  Stops), that requiring it from a server module is legal (it is shared, so it is not a
  cross-side require), and that it yields only for the one `WaitForChild`.
- **`persistence.defaultState()` guarantees `currency = 0` and `upgrades = {}` on every state
  that reaches me**, and `persistence.load` returns that same shape on a DataStore failure.
  This module nil-guards neither field: a state with `upgrades = nil` errors in all five
  functions. The construct table in the wiring says this is safe; if persistence is written
  differently, progression is where it will surface.
- Assumed `persistence.load` never hands back a negative currency or a non-numeric level.
- **`clearing` multiplies before it calls `award`**, passing `max(1, floor(tier.value *
  valueMultiplier(state)))`. `award` applies no multiplier of its own, so if clearing ever
  passes a raw tier value the Value upgrade silently stops existing, and if it ever applies
  the multiplier twice nothing here notices.
- **`server-main` writes `humanoid.WalkSpeed = progression.walkSpeed(state)`** in both
  `onSpawn` and `onPurchase`. This module computes that number and can neither perform nor
  detect the write; the trial-1 defect the brief describes is invisible from inside here.
- Assumed nothing calls `award` or `tryBuy` re-entrantly or across a yield. Neither yields,
  so under Roblox's scheduler each is atomic and no lock is needed.
- Assumed `warn` exists. It is a Roblox global, not Luau standard library, so unlike
  `GameConfig.luau` this module cannot be loaded by a bare `luau` test harness — though the
  `game:GetService` preamble already made that true regardless.
- Assumed no other module writes `state.currency` or `state.upgrades`. The state shape says
  so; nothing in the code can enforce it.
