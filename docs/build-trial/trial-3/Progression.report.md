# Build report — progression

## Stops

- **What "rejects a non-positive amount" means for `award`'s observable behaviour.** The
  interface says `award` "rejects a non-positive amount rather than clamping" and also that it
  "returns number — the new balance". It does not say which of the three available rejections
  it is: raise, warn-and-return, or return silently. These are not interchangeable, because
  `award` is called from inside `clearing.tick`, which the wiring says runs inside a pcall: a
  raise there aborts the rest of that player's tick (remaining patches in radius are not
  cleared this pass, `AreaRestored` may be delayed a tick), while a silent return makes a
  caller bug invisible forever. **I had to invent the failure mode.** I chose the middle one:
  `warn` once per occurrence with the offending amount, return `state.currency` unchanged,
  write nothing. If the intended behaviour is a raise, this module is wrong and the difference
  is only visible under a caller bug, which is the worst kind of divergence to leave to a
  builder.
- **Whether `award` is allowed to be called with a non-integer amount, and what it does with
  one.** `amount` is documented as "a positive whole number", but nothing says whether that is
  a precondition `award` enforces, a precondition it may assume, or a hint. Enforcing it
  (reject), normalising it (`math.floor`), and assuming it (add as given) produce three
  different currency balances for the same caller. **I had to invent this.** I assume it and
  add the amount as given, so a fractional amount silently makes `state.currency` fractional
  and the HUD would show it. `clearing` floors before calling, so this is unreachable on the
  shipped path; it becomes reachable the moment a second caller of `award` exists (a quest
  reward, a daily bonus, a Robux grant), and at that point the answer matters and is still not
  written down anywhere.
- **`GameConfig.BaseClearRadius` / `GameConfig.BaseWalkSpeed` are a second source for a number
  the upgrade defs already carry, and nothing reconciles them.** `movement.baseClearRadius` is
  5.5 and `Upgrades.radius.base` is 5.5; the brief tells me `clearRadius` must be
  `upgradeEffect(radius def, level)` *and* must equal `movement.baseClearRadius` at level 0.
  Those are the same number today by coincidence of emission, not by construction. There is no
  stated behaviour for the case where a sheet edit moves one and not the other. I did not
  invent a reconciliation (no assert, no preferring one over the other): the module reads
  `def.base` only, via `upgradeEffect`, and `GameConfig.BaseClearRadius` /
  `GameConfig.BaseWalkSpeed` are consequently **dead values as far as this module is
  concerned**. Whoever owns the emitter should either drop them or have the schema assert the
  equality; acceptance criterion 3 ("clear radius at level 0 equals `movement.baseClearRadius`")
  currently passes for a reason no code enforces.

Nothing numeric was missing. Every constant the five functions need (`costBase`, `costGrowth`,
`maxLevel`, `perLevel`, `base`, `mode` per axis) was in `GameConfig`, and both curves were
callable rather than needing restatement.

## Decided without a stated value

**Structure and naming**

1. Module table named `Progression` (returned directly, not `local M`). Follows
   `GameConfig.luau`, which names its table after the file.
2. Public functions declared as `function Progression.name(...)` (dot, no `self`), in the exact
   order of the brief's *Must expose* list: `award`, `tryBuy`, `clearRadius`, `walkSpeed`,
   `valueMultiplier`. Nothing depends on the order; it is stated so a second builder does not
   sort them differently.
3. Private helpers are `local function` above the public surface and are not exposed:
   `definitionFor`, `definitionOrError`, `heldLevel`, `effectOf`. All four names are invented.
4. Local variable names `def`, `held`, `cost`, `level` are invented. Parameter names (`state`,
   `amount`, `upgradeId`) are taken from the interfaces.
5. Constants `VALUE_UPGRADE_ID`, `RADIUS_UPGRADE_ID`, `SPEED_UPGRADE_ID` — the names, and the
   SCREAMING_SNAKE convention for module-local constants, are invented. `GameConfig` has no
   local constants, so it sets no precedent. The three id *strings* are specified (they are in
   *Values*), but the fact that they must appear as literals somewhere is a consequence of
   config exposing no symbolic per-axis accessor; I put them in one place at the top rather
   than at three call sites.
6. Tab indentation, `--[[ ]]` header block, and comment tone copied from `GameConfig.luau`. No
   `--!native`, no `--!optimize`, no `table.freeze` on the returned table.
7. Compound assignment (`+=`, `-=`) used for the currency writes, matching `GameConfig`'s
   `total += t.weight`.

**Types**

8. `PlayerState` is declared **local to this module and not exported**, and declares only the
   two fields progression is the stated writer of (`currency`, `upgrades`). Nothing in the
   build order says which module owns the Luau declaration of `PlayerState`, and no shared
   `Types` module is listed as a dependency by anyone, so every module in this build will
   declare its own version of the state type and they will drift. I chose the narrow version
   (a full state is accepted by width subtyping) specifically so nobody can `require` a
   half-complete `PlayerState` from here and believe it is the whole shape. A different builder
   would reasonably restate all eight fields from `03-state-shape.md` and export it.
9. `upgrades` typed as `{ [string]: number }` rather than a closed union of the three ids, so an
   id from a future config emission needs no code change. That also means the type system does
   not catch a typo'd id; `tryBuy` returning `false` is the only feedback.
10. `UpgradeDef` restated structurally in this file with all nine fields, because `GameConfig`
    exports no types. A field added to the generated config is a field to add here by hand, or
    the annotation quietly diverges. `mode` is typed `string`, not `"additive" | "compounding"`,
    matching `GameConfig.upgradeEffect`'s own parameter annotation.
11. Return annotations are `number` / `boolean` as specified; `award` returns a non-optional
    `number` even on the rejection path, which is what forced the "return the unchanged
    balance" choice above.

**Lookup of an upgrade definition**

12. Linear scan over `GameConfig.Upgrades` on every call, with no id→def index table. Motivated
    by the tree rule "performs no work at require time", which a prebuilt map would violate.
    Cost: three comparisons per `clearRadius` call, i.e. per player per 0.12 s tick. If that is
    ever measured as too much, the fix is a lazily built memo, not a require-time table.
13. The scan returns the **first** match. Nothing checks that ids are unique in
    `GameConfig.Upgrades`; a duplicate id would silently use the earlier entry.
14. A non-string `upgradeId` reaching `tryBuy` (despite the type annotation and despite
    `wiring.onPurchase` step 1 promising server-main rejects non-strings) matches no def and
    returns `false` rather than erroring. I deliberately added **no** runtime `type()` guard:
    the scan already fails safe, and a guard would be a second, weaker copy of a check the
    wiring assigns to server-main.
15. **Missing definition is fatal for the derived getters, silent for `tryBuy`.** An unknown id
    in `tryBuy` returns `false` (specified). A missing `"radius"` / `"speed"` / `"value"` entry
    in `GameConfig.Upgrades` makes `clearRadius` / `walkSpeed` / `valueMultiplier` raise, with
    a message naming the id. Unspecified, and invented by me. The alternative (fall back to
    `GameConfig.BaseClearRadius`, `GameConfig.BaseWalkSpeed`, and `1.0`) is available for two of
    the three but there is no stated base multiplier outside `value.base`, so a uniform loud
    failure beat a two-thirds-silent one. Reachable only via a config defect.
16. Error text: `Progression: GameConfig.Upgrades has no upgrade with id "x"`. Wording invented.
    `error()` is called with no level argument (level 1, pointing at this module) rather than
    level 2 (pointing at the caller) or 0 (no position). Built with `string.format("%q")`
    rather than Luau string interpolation, for the sake of matching `GameConfig`, which uses
    neither.

**`award`**

17. Guard is written `if not (amount > 0)` rather than `if amount <= 0`, which means **NaN is
    also rejected** (`nan > 0` is false). Nothing specified NaN handling; a NaN award would
    otherwise poison `state.currency` permanently and survive every save.
18. `math.huge` **is** accepted as a positive amount. No upper bound, no overflow or sanity cap
    on `state.currency`, because no maximum currency value is stated anywhere.
19. The warn fires on **every** rejected call, with no rate limit and no once-per-player latch.
    A misbehaving caller inside the 0.12 s tick would spam the server log. Chose noise over
    silence; `hud-binding`'s "warns here, once" shows the repo does have a once-idiom I could
    have copied.
20. Warn text: `Progression.award ignored a non-positive amount: <amount>`. Invented, including
    the `tostring` so that NaN and `-inf` are legible.
21. `award` writes `state.currency` and nothing else: no `state.upgrades` touch, no snapshot
    push, no save trigger, no analytics event. Snapshot pushing is server-main's per the wiring,
    and there is no analytics dependency to call.
22. `award` returns `state.currency` read back after the write (identical to the sum; stated so
    nobody reads a rounding step into it).

**`tryBuy`**

23. Check order: unknown id → at max level → insufficient currency. Unobservable (the result is
    `false` for all three) except that `upgradeCost` is therefore **never called with
    `level == maxLevel`**, which keeps the "highest price ever charged is
    `upgradeCost(def, maxLevel - 1)"` note true by construction rather than by luck.
24. The max-level guard is `held >= def.maxLevel`, not `held == def.maxLevel` as the interface
    words it. A state carrying a level above `maxLevel` (an old save from a config where the cap
    was higher) is refused rather than allowed one more purchase. Unspecified.
25. Affordability is `state.currency < cost`, so a purchase at **exactly** the price succeeds.
    The interface says "below its cost", which agrees, but the boundary is worth stating because
    it is the one case an off-by-one gets wrong.
26. `tryBuy` returns a bare `boolean` with no reason code, no second return value, and no
    message. server-main only branches on it, and the wiring says failure sends the client
    nothing.
27. On success it deducts, then increments, in that order, and does both unconditionally after
    the checks — no re-read of currency, no transaction wrapper. Single-threaded per player, so
    there is no interleaving to protect against; two `BuyUpgrade` messages in the same frame are
    processed one after the other and the second one prices itself against the already-deducted
    balance, which is the intended behaviour and is not stated.
28. The level is written under the caller's `upgradeId` string, not under `def.id`. Identical,
    since the scan matched on equality; stated because writing `def.id` would be the more
    defensive choice and produces the same result only while the comparison stays `==`.
29. **No rate limiting, cooldown or debounce** on purchases, and no per-player spend log. If the
    client can fire `BuyUpgrade` in a loop, this module will happily process every one. Any
    anti-spam belongs to server-main or input; nothing in the brief assigns it to anybody.
30. Levels read out of `state` are **not sanitised**: a negative, fractional or absurd persisted
    level flows straight into `upgradeCost` and `upgradeEffect`. `progression` trusts the state
    it is handed, because `persistence.defaultState` is stated to be the only constructor and
    validation is nobody's stated job.
31. `heldLevel` returns 0 for `nil` via an explicit `if level == nil` rather than `or 0`, so a
    stored `false` (which `or 0` would silently convert) reaches the arithmetic and errors
    loudly instead of buying at the level-0 price.
32. `state.upgrades` is assumed to exist. No `if state.upgrades == nil then state.upgrades = {} end`
    defensive creation: `persistence.defaultState` initialises it, and creating it here would
    make progression a second constructor of a persisted field, which the wiring's "THE ONLY
    CONSTRUCTOR" note forbids in spirit. A state missing the table raises instead.

**Derived getters**

33. All three getters are one line through a shared `effectOf(state, id)` helper, so the
    "one call to `upgradeEffect` and nothing else" rule is enforced structurally rather than
    repeated three times.
34. Return values are **not rounded, clamped or quantised**. `clearRadius` at radius level 6
    returns `12.100000000000001` and `valueMultiplier` will produce comparable float dust. No
    tolerance or display rounding is specified; radius is consumed as a distance comparison so
    dust is harmless, but a HUD that prints the number will show it, and that is not this
    module's decision to make.
35. Nothing is cached or memoised, including `walkSpeed` (the brief only says `clearRadius` is
    read fresh every tick). A getter is pure with respect to `state` and has no side effects, so
    calling any of them any number of times is free of consequence.
36. No public constants and no enumeration helper are exported: nothing here lists the upgrade
    ids, labels, blurbs or next-costs for the HUD or for `input`. Those callers read
    `GameConfig.Upgrades` themselves. A `nextCost(state, id)` helper was tempting and is
    deliberately absent because it is not on the *Must expose* list.

**Require and boot**

37. Followed `tree.examples.sharedFromAnySide` (WaitForChild the shared root once, index
    children after) rather than `tree.requireExample` (which chains a second `WaitForChild` for
    the module itself). The two examples in the brief disagree in style; the `rules` entry
    settles it in favour of the former.
38. Hoisted `game:GetService("ReplicatedStorage")` into its own local, which neither example
    does. Cosmetic.
39. `WaitForChild("UIForge")` is called with **no timeout**, so a renamed or missing shared root
    hangs this module's require forever with only Roblox's own 5-second infinite-yield warning.
    Any timeout would be an invented number and a second invented decision about what to do
    when it expires.
40. Nothing else happens at require time: no connections, no loops, no state, no logging.

**Verification**

41. `luau-analyze` on the module as written reports exactly three diagnostics, all
    environmental and unavoidable given the repo's declared `requireStyle: "instance"`:
    `Unknown global 'game'`, `Unknown global 'warn'`, and `Unknown require: unsupported path`.
    This build of `luau-analyze` has no flag for a Roblox definitions file, so to prove the
    remaining logic typechecks I analysed a byte-identical copy outside the build root with the
    require rewritten to a resolvable relative path and `warn` shimmed as a local: **clean, no
    diagnostics, exit 0**. Verifying that way, rather than adding a `.luaurc` or a globals
    stub to the build root, was my call — the instructions say one module and one report and
    nothing else.
42. I also executed that copy against the real `GameConfig` to check the three *Done when*
    criteria (insufficient funds → `false`, no change; at `maxLevel` → `false`, no change;
    radius at level 0 → 5.5) plus the whole radius ladder (40, 70, 122, 214, 375, 656, 1148,
    2010, then refused; radius ends at 14.3, which agrees with `GameConfig`'s own comment that
    maxed Reach is 14.3 and not 11.79). Deciding to run it at all, and where, was unspecified;
    no test file was written.

## Assumed about a dependency

- **Nothing but `GameConfig.luau` exists yet.** No `persistence`, `clearing`, `plots`,
  `protocol` or server entry point was present in the build root when I wrote this, so every
  statement below about a caller is taken from the wiring section of the brief, not from code.
- `GameConfig` is reachable at `ReplicatedStorage.UIForge.GameConfig`, is a ModuleScript of
  exactly that name, and is replicated before a server module requires it. The name `UIForge`
  for the shared root comes from `tree.sharedRoot`.
- `GameConfig.upgradeCost(def, level)` takes the level the player **holds**, so the first
  purchase costs `def.costBase` (confirmed against the emitted curve: 25 / 40 / 60) and the
  last legal purchase costs `upgradeCost(def, maxLevel - 1)`. `tryBuy` is built entirely on
  that convention; if it were ever changed to mean "the level being bought", every price in the
  game shifts by one step and nothing in this module would notice.
- `upgradeCost` returns an already-floored integer. I do not floor, round or re-check it, so a
  future non-integer cost would deduct a fractional balance.
- `upgradeEffect(def, level)` answers the additive-versus-compounding question. I pass the
  **whole def table** to both curve functions even though their annotations name only
  `{ base, perLevel, mode }` and `{ costBase, costGrowth }`; this relies on Luau width
  subtyping, which the analyser confirmed accepts it.
- `GameConfig.Upgrades` is a dense array (safe for `ipairs`), holds unique ids, and contains
  exactly `"value"`, `"radius"` and `"speed"`. Nothing in the config or in this module enforces
  any of the three; the third one is what the getters raise about.
- `GameConfig.Upgrades` and its entries are never mutated at runtime by any module. This module
  never copies a def, so it would observe a mutation immediately.
- Neither curve function yields and neither raises, so all five of my functions are safe to call
  from inside `clearing`'s 0.12 s tick and from inside a pcall.
- `persistence.defaultState()` really does initialise `currency = 0` and `upgrades = {}` for
  every player, including on a DataStore failure. `progression` defaults **no** persisted field
  and would raise on a state that lacks `upgrades`.
- `state.currency` and the values in `state.upgrades` come back from the DataStore as Luau
  numbers, not strings, and are not `nil` after a round trip.
- `clearing` pre-multiplies and floors the payout and never awards less than 1, so `award`'s
  rejection path is unreachable on the shipped path. That is also why I could not decide the
  rejection semantics from behaviour: nothing exercises them.
- `server-main` writes `humanoid.WalkSpeed = progression.walkSpeed(state)` on both `onSpawn`
  and `onPurchase`. `walkSpeed` returning the right number is all this module can guarantee;
  the trial-1 defect is only fixed on server-main's side and this module cannot detect its
  absence.
- `server-main` has already checked that `states[player.UserId]` exists and that the
  `BuyUpgrade` payload is a string before `tryBuy` is reached, and pushes the `StateChanged`
  snapshot on success. `tryBuy` returning `true` is not accompanied by any notification from
  here.
- `luau-analyze` in this environment has no Roblox type definitions and no flag to supply them,
  which is why `game` and `warn` are reported as unknown globals in every module in this build,
  not just this one.
