# Build report — progression

## Stops

- **The shape of `state`.** All four exposed functions take `state` as their first
  argument and the brief never says what it is: no field name for the balance, no field
  name for the levels, no type, and no module in my dependency list (`config` only) that
  owns it. I needed `state.<balance>` and `state.<levels>[<upgradeId>]` to write a single
  line. Would have had to invent, and did: `{ currency: number, levels: { [string]: number } }`,
  exported as `Progression.State` so the guess is at least nameable. Every module that
  saves, loads, replicates or displays the player's shards has to agree with a name I
  chose, and none of them was told it.

- **The `value` upgrade has an effect nothing can reach.** `upgrades[0]` is
  `value / perLevel 0.25 / maxLevel 10`, but *Must expose* derives only `clearRadius` and
  `walkSpeed`. There is no `payout` / `valueMultiplier` in my contract and — unlike
  radius and speed, which each got a stated base under `movement` — there is no
  `baseValue` or `baseMultiplier` under *Values* for `0.25` to be a step away from. I
  would have had to invent both a function name and a base of `1.0`, so I built neither.
  **As written, `value` is purchasable and inert:** it costs 25 → 1099 across ten levels
  and changes nothing anywhere. This is the largest hole in the brief.

- **Additive or compounding derived stats.** `perLevel` is never defined. Both readings
  satisfy Done-when 3 (`level 0 == base` holds either way). Additive gives a maxed reach
  of `5.5 + 8×1.1 = 14.3`; compounding gives `5.5 × 1.1^8 = 11.79`. Two builders pick
  differently and neither can tell. I chose additive rather than stopping, on two pieces
  of evidence: the key is named `perLevel` (a step, not a rate), and compounding `speed`
  puts walk speed at `16 × 1.6^6 = 268` at its own maxLevel, which is not a shippable
  number. The equation is still not in the specification.

- **Whether currency is an integer.** Tier values are whole (1/3/8/20) but the `value`
  upgrade's `perLevel` is `0.25`, so any payout scaled by it is fractional. Nothing says
  where rounding happens — at the award site, inside `award`, or never. I chose never, so
  a fractional balance is compared against a floored cost. If shards are meant to be
  whole, both the rule (floor/round/ceil) and its owner are unspecified.

- **The starting balance.** Nothing states what a new player begins with. I dodged needing
  it by treating a missing `levels` entry as 0 (which quietly specifies starting levels),
  but the opening `currency` has no stated value, so I wrote no constructor and left the
  first assignment to a module that was not told the number either.

- **Where `GameConfig` lives in the DataModel.** The brief gives a filesystem path and
  there is no `default.project.json` in my working root, so the require path is a guess:
  `ReplicatedStorage.Shared.GameConfig`, from Rojo's default `src/shared` mapping. A wrong
  guess fails at require time, not at analyze time.

- **Which upgrade drives which stat.** Nothing in the brief or in `GameConfig` says
  `radius` → clear radius and `speed` → walk speed. It is obvious from the ids, and I
  encoded it, but it is the one place in the module where I restate a string a sheet owns
  (`RADIUS_UPGRADE_ID` / `SPEED_UPGRADE_ID`). Renaming an id in
  `gameplay/balance/01-upgrade-ladder.md` reverts both stats to base **silently** — no
  error, no warning — because config carries no stat → upgrade mapping for me to read.

- **`award`'s return value.** *Must expose* writes `award(state, amount)` while the other
  three entries carry return types, so the omission may be deliberate or may be an
  oversight. Not stated whether it returns nothing, the new balance, or the amount
  actually applied. Chose: returns nothing.

## Decided without a stated value

**Cost indexing (the most consequential entry here).** `upgradeCost(upgrade, level)` does
not say whether `level` is the level being bought or the level currently held. I chose
*held*, so the step 0 → 1 costs `floor(25 × 1.6^0) = 25 = costBase`. The other reading
makes the first `value` purchase cost 40 and shifts every price on every ladder up one
growth step. I decided rather than stopped because `costBase` reads as the price of the
first level, but nothing states it.

**Names**

- Module local `Progression`, returned directly at the end, mirroring `GameConfig`'s shape.
- Balance field named `currency`, not `shards` / `balance` / `money`. I deliberately did
  **not** derive the field name from `GameConfig.Currency` ("Shard"/"Shards"): that is a
  renameable display string, and a save key named from it breaks every existing save the
  day a sheet renames the currency.
- Levels field named `levels`, a map keyed by upgrade id — not a parallel array indexed by
  the config's order (which would corrupt if the ladder is reordered) and not one field
  per upgrade.
- `export type State` (not `PlayerState` / `ProgressionState` / `Profile` / `Data`), and a
  separate `export type UpgradeLevels`. Exported at all so peers can annotate against it
  instead of re-declaring it; nothing asked for exported types.
- Private helpers `findUpgrade`, `heldLevel`, `derived`. `derived` as a noun is a slightly
  odd choice over `stat` / `deriveStat`.
- Constants in `SCREAMING_SNAKE`; `GameConfig` has no local-constant precedent to copy.
- A local `type Upgrade` restating the seven fields of a `GameConfig.Upgrades` entry,
  because `GameConfig` exports no type for one. It will drift if the emitter ever drops a
  field.

**Loop and lookup shape**

- Linear scan per lookup rather than an id → upgrade map built at require time. Three
  entries, so the scan is free, and there is no cache to go stale against a re-emitted
  config. Nothing measured either way.
- `ipairs` in array order, so a duplicate id resolves to the **first** occurrence. Nothing
  forbids duplicate ids and nothing says which should win.
- Derived values are recomputed on every call, not memoised per state. Relevant only
  because `GameConfig.ClearTickRate = 0.12` implies something may call these on a tick.

**Mutation and signalling**

- `state` is mutated in place; no copy, no new state returned.
- **Nothing is notified.** No callback, no signal, no BindableEvent, no dirty flag when
  currency or a level changes. `GameConfig.SaveIntervalSeconds = 45` implies a timed
  saver exists; whether it needs a dirty flag out of me is unstated, so I emit none.
- `tryBuy` buys exactly one level. No bulk buy, no max-buy.
- There is no way to *ask* the price. No `costOf(state, upgradeId)` is in the contract, so
  a shop UI has to call `upgradeCost` itself and therefore has to independently guess the
  level-indexing convention I picked above. Two guesses, one displayed price, no test that
  they agree.
- `tryBuy` returns a bare boolean with no reason code, per contract. A client told `false`
  cannot distinguish "broke" from "maxed" and has to re-derive it.

**Ordering**

- `tryBuy` checks unknown id → maxLevel → affordability. Unobservable from outside since
  all three return a plain `false`, but it fixes which reason wins when two apply.
- Deduct-then-increment inside one synchronous block; no yield between them, so the pair
  cannot interleave.
- Functions are defined in the order of the *Must expose* list.

**Edge cases nobody mentioned**

- **Unknown / empty / non-string `upgradeId`** → `false`, no error, no log. I added no
  explicit `type(upgradeId) ~= "string"` guard: the scan fails naturally, and the *Must
  not* names cost and level, not id.
- **A stored level outside `[0, maxLevel]`** (corrupt save, tampered datastore, a config
  whose `maxLevel` was lowered after players banked levels): clamped on read, `math.floor`
  applied, negative → 0, NaN → 0. Chosen because otherwise a level of 999 gives 1614 walk
  speed by a door the *Must not* does not guard. Done silently — no log, no error, and no
  repair written back to state, because this module never sees the load.
- **Clamping applies to the derived getters as well as to `tryBuy`.** The *Must not* only
  covers purchases.
- **A fractional stored level** (e.g. 2.9) floors to 2 for derivation, and buying once
  normalises it to 3, so a corrupt level silently loses its fraction on the next purchase.
- **`award` with a non-positive amount** is ignored — not clamped, not an error, not an
  assert — so it cannot be used as a spend path. Written as `if not (amount > 0)`
  specifically so **NaN** is ignored too; one NaN in the balance would make every later
  purchase fail forever, and nothing in the brief covers it.
- **No maximum balance** and no overflow handling.
- **`award` does not validate `state`.** A nil state or nil `levels` is an unhandled
  runtime error.
- **No `error()`, no `assert`, no logging anywhere in the module.** Every failure is a
  silent `false` or a no-op. There are therefore no error strings to be inconsistent — a
  decision in itself, since a server that never says why a purchase failed is hard to
  support.
- **If a driving upgrade id is missing from config**, the derived getter returns the base
  rather than erroring, so a config typo degrades to base speed/radius silently. The
  alternative (erroring) would throw on every respawn, which is worse.
- **Balance exactly equal to cost buys** (`<`, not `<=`). Level exactly at `maxLevel`
  refuses (`>=`). Both verified.
- **No epsilon** on the affordability comparison; `upgradeCost` already floors.

**Output shape**

- Derived values are unrounded floats (`5.5 + 3 × 1.1` carries the usual float residue).
  No `math.round`, no quantisation, no clamp against any engine walk-speed maximum.
- `walkSpeed` returns a number and never touches a `Humanoid`. Whoever applies it owns the
  *when* — spawn, purchase, respawn — which is not specified for me either.

**House style**

- Tabs, `--!strict`, block-comment header, `local X = {}` … `return X`, comments that
  explain why rather than what: all copied from `GameConfig.luau`, the only convention
  sample I was allowed.
- The module reads only `Upgrades`, `BaseClearRadius`, `BaseWalkSpeed` and `upgradeCost`.
  It never touches `Tiers`, `Currency`, `Patch`, `Area`, `RelicSets` or `ClearTickRate`,
  and re-exports nothing.
- Require written as a hoisted `game:GetService("ReplicatedStorage")` plus a dotted path,
  rather than `WaitForChild` (which types as `Instance` and defeats the analyzer) or a
  `script.Parent.Parent` relative path.

**A scope decision worth recording**

- `pack-clearing.md` sits in the same directory as my brief and describes the module that
  is the obvious caller of `award`. It would very likely have revealed the intended
  `state` shape. It is not listed as a dependency or as readable, so I did not open it. If
  the state shape *is* settled over there, then the gap is in how the briefs are packed —
  two modules sharing a mutable structure that neither brief defines — rather than in the
  design.

## Assumed about a dependency

- `GameConfig` resolves to `ReplicatedStorage.Shared.GameConfig` at runtime.
- `GameConfig.upgradeCost(upgrade, level)` takes the **held** level, 0-based, and returns
  the price of the next one. Its `math.floor` is inside the function, so I round nothing.
- I pass whole `GameConfig.Upgrades` entries to `upgradeCost`, which declares only
  `{ costBase: number, costGrowth: number }`. Luau accepts the wider table; I assume the
  function reads no other field.
- Every `GameConfig.Upgrades` entry has a unique, stable `id` and numeric `costBase`,
  `costGrowth`, `maxLevel`, `perLevel`. The emitter's schema is assumed to enforce this —
  I do not check, and a missing `maxLevel` would make `heldLevel` compare against nil.
- `GameConfig.BaseClearRadius` and `GameConfig.BaseWalkSpeed` are the level-0 values of
  exactly the two stats I derive, in studs and Roblox walk-speed units respectively.
- `GameConfig` is immutable at runtime and requires are cached, so repeated scans see one
  consistent table.
- Nothing outside this module writes `state.currency` or `state.levels`; if a save loader
  populates them, it uses the same two field names.
- `GameConfig.tierByWeight` is not used here.

## Analyzer

`luau-analyze game/src/server/Progression.luau` reports two diagnostics, both
environmental:

```
(17,27): TypeError: Unknown global 'game'; consider assigning to it first
(19,20): TypeError: Unknown require: unsupported path
```

This build of `luau-analyze` has no `--defs` and no `--sourcemap` flag, so it has neither
the Roblox global table nor Rojo path resolution. Every Roblox require form produces the
same pair — `script.Parent.Parent...` swaps the first message for `Unknown global
'script'` and keeps the second — so there is no wording of the require that makes the file
clean here.

With the require pointed at a resolvable path in a scratch copy, **both the new and the
old solver report 0 errors and 0 lints** on the module body. (Against the real file the
new solver adds two cascade errors — `Type 'unknown' does not have key 'id'` — purely
because `GameConfig` types as `unknown` when the require fails; the old solver does not
emit them, and they vanish once the require resolves.)

I also ran the module under `luau` against 26 behavioural assertions, all passing,
covering the three Done-when criteria plus exact-cost purchase, the full 8-step reach
ladder draining to exactly zero, clamped and NaN levels, unknown ids, and the `award`
guards.
