# Build report — persistence

## Stops

- **No module owns the `PlayerState` type declaration.** The state shape is specified once,
  in prose, in the brief's preamble. Every server module in the build order takes or returns
  one (`plots.spawn(player, state)`, `progression.tryBuy(state, upgradeId)`,
  `clearing.tick(states)`, `save(player, state)`), but there is no shared `Types` module and
  persistence's only declared dependency is `config`, so I could not import the type from
  anywhere. I needed a home for it and there isn't one. I declared `export type PlayerState`
  and `export type Patch` in `Persistence.luau`, which is the honest place given persistence
  is "THE ONLY CONSTRUCTOR" — but it forces every other server module either to
  `require(script.Parent.Persistence)` purely for a type (an edge the dependency graph does
  not have) or to re-declare the shape by hand (two declarations, one of which will drift).
  A `game/src/shared/Types.luau` in the build order would settle it. As written, the four
  other server modules will each decide this independently.

- **The payload encoding of `cleared` is unspecified, and Roblox's serialiser makes it
  matter.** The state shape calls it `map<patchIndex,boolean>` keyed by a 1-based integer,
  and `save`'s note says it is "written as an empty set" when the area is complete. Nothing
  says what the *stored* value looks like. Three encodings are all consistent with the prose:
  an integer-keyed map, a string-keyed map, or an array of indices. They are not
  interchangeable — a DataStore round trip of a non-array table converts number keys to
  strings, so a builder who writes an integer-keyed map and reads it back with
  `type(key) == "number"` loses every partially-cleared area silently. I had to invent one.
  I write the map with the same integer keys the live state uses (the most literal reading of
  "cleared is written as an empty set"), and made `load` accept either integer or numeric
  string keys via `tonumber`, so the write survives whichever way the engine serialises it.
  Two builders will not choose the same thing here and their saves will not be mutually
  readable. Worse: if `DataStoreService` outright rejects a table with non-string keys rather
  than coercing them, every save fails, my `pcall` swallows it into a warning, and nothing in
  this build catches that until someone plays it. I cannot check that from outside the engine.

- **Criterion 3 asks for cross-version loading with no version marker specified.** "Loading a
  save written by the previous version does not lose currency" is a done-when, but no payload
  field records a schema version and no migration rule exists. I could not write a deliberate
  migration, so I implemented structural tolerance instead: `load` starts from
  `defaultState()` and overlays the payload field by field, with a type check on each, so a
  missing field keeps its default and an unrecognised field is ignored. That satisfies the
  criterion for additive changes only. A *renaming* change (say `currency` becomes `shards`)
  silently loses the field, which is exactly the failure the criterion names, and there is no
  lever in the payload to detect one. I did not invent a `version` key, because a schema key
  is a value.

- **`load`'s two stated rules contradict each other for one payload.** The Must-not says
  `load` may not return "a state whose cleared, clearedCount and areaComplete disagree with
  each other". The state shape says `areaComplete` is `writtenBy: clearing`, "Latch. Set once
  by clearing", and that persistence merely "constructs and reconstitutes" `cleared`, "which
  is not a session write". For a payload holding `areaComplete = false` and a `cleared` set
  with all 140 indices, those two rules point opposite ways: reconciling the disagreement
  means latching a flag persistence is not the writer of, and not latching it means returning
  a state where `clearedCount == area.patchCount` while `areaComplete` is false. The stated
  reconcile rule is one-directional (`areaComplete` → refill `cleared`) and says nothing about
  the reverse. I chose **not** to latch: I honour the ownership rule, derive `clearedCount`
  from the set, and warn. That leaves the correction to `clearing.tick`, whose spec latches
  when `clearedCount >= area.patchCount` — but see the dependency assumption below, because
  that only self-heals if the latch check runs on a tick that cleared nothing.

- **The shared root is named two different things inside this one brief.** The `tree` block
  gives `"sharedRoot": "ReplicatedStorage.UIForge"` and a `requireExample` that
  `WaitForChild`s `"UIForge"`. The `interfaces` entry for `config` says
  `require(ReplicatedStorage.Shared.GameConfig) IS this table`. One of those two folder names
  is wrong and I could not tell which. I followed the `tree` block (`UIForge`), because the
  tree is the sheet that owns paths and the interfaces line reads as prose about callability
  rather than about location. If `Shared` is the real name, this module yields forever on
  `WaitForChild` at require time and the server never boots — a failure with no error message.

## Decided without a stated value

### Where things live and what they are called

- Module table named `Persistence`, matching the file name, following `GameConfig.luau`'s
  convention of naming the returned local after the module.
- The exported type names `PlayerState` and `Patch`, taken verbatim from the state shape's
  `types` block. Nothing said they should be exported at all.
- Every private helper name is mine: `getStore`, `keyFor`, `describe`, `applyPayload`,
  `countKeys`, `reconcile`. So is the private type name `Payload`.
- Order of definitions in the file: types, then private helpers, then `defaultState`, then
  `load`, then `save`. The Must-expose list orders them load / save / defaultState; I put
  `defaultState` first because `load` calls it and Luau needs it defined.
- Tab indentation, a `--[[ ]]` block header, and `--` comments above each section, copied
  from `GameConfig.luau`. Nothing specified a style.
- `local LOG_PREFIX = "[Persistence]"` on every warning. There is no logging convention
  anywhere in the brief or in `GameConfig.luau`, so the prefix, the bracket style and the
  decision to have a prefix at all are invented. Five other modules will each invent their own.
- Two service locals at module scope (`DataStoreService`, `ReplicatedStorage`) rather than
  inline `game:GetService` calls. The tree's example inlines the `ReplicatedStorage` one.

### DataStore mechanics — none of this is in the brief

- **The key is `tostring(player.UserId)`, bare.** The brief says "keyed by the player's
  UserId"; a DataStore key is a string, so something has to render it. No prefix, no
  separator, no padding. Most shipped games use `"Player_" .. UserId`. If any other tool ever
  touches this store expecting a prefix, every save is orphaned, and the mistake is not
  recoverable after launch.
- **No `scope` argument to `GetDataStore`**, so the default `"global"` scope.
- **`SetAsync`, not `UpdateAsync`, and no session locking.** Nothing in the brief mentions
  concurrent servers, and "writes exactly the six persisted fields" reads as a whole-record
  write. Consequence, stated plainly because nobody else will: a player who leaves server A
  and joins server B fast enough can have A's leave-save land *after* B's load, and then B's
  next 45-second save writes B's stale-loaded state over A's. `UpdateAsync` would not fix that
  by itself either — it needs a session lock, which is a design decision with values
  (lock TTL, steal timeout) that I would have had to invent.
- **The DataStore handle is opened lazily on first use and memoised**, not fetched at require
  time, because the tree's rules say "every module ... performs no work at require time".
  `WaitForChild` on the shared root is the one exception, and only because the require
  convention prescribes it.
- **`GetDataStore` is retried on every call if it failed, but warned about only once.** An
  outage that clears should not need a server restart; a warning every 45 seconds for the life
  of the server is noise. The one-warning latch is a file-local boolean.
- **No retry loop and no backoff around `GetAsync`/`SetAsync`.** I read
  "the next pass retries by existing" in `onSave` as an instruction not to build one, and any
  attempt count or backoff delay would have been an invented number. A `load` failure
  therefore costs the player their whole session's progress with a single warning and no
  second attempt, which is the harshest reading of "a DataStore outage leaves the player
  playable".
- **No `GetRequestBudgetForRequestType` throttle check.** With a 45-second interval and a
  save on leave, budget exhaustion is unlikely, but nothing measures it.
- **Three separate `pcall`s** — one around `GetDataStore`, one around `GetAsync`, one around
  `SetAsync` — so an unavailable service and a failed read are distinguishable in the log.

### What `load` does with a payload

- A `nil` result (a player who has never saved) is **not** treated as a failure and produces
  **no** warning. The default state is the correct answer for a new player and warning about
  every first join would be wrong.
- A non-`nil`, non-table result (someone wrote a scalar under this key) warns and starts
  fresh. Silence there would lose a save without a trace.
- The payload is merged over a fresh `defaultState()` field by field. Unknown payload keys are
  ignored; absent keys keep their default.
- `currency`: accepted if `type(...) == "number"`, with **no range check**. A negative,
  fractional, NaN or infinite currency loads as-is. Clamping is a policy nobody stated, and
  clamping silently would be worse than not clamping.
- `upgrades`: a key survives only if it is a string and its value is a number. Levels are
  **not** clamped to `def.maxLevel`, and ids **not** present in `GameConfig.Upgrades` are
  **not** pruned. Pruning would delete a player's purchase the first time an upgrade id is
  renamed in a re-emitted config, and nothing gave persistence a mandate to destroy data.
- `found`: a key survives only if it is a string and its value is exactly `true`. Stored
  `false` entries are dropped, on the unstated assumption that a missing key means "not
  found" the way a missing upgrade key means level 0 (the state shape says that explicitly for
  `upgrades` and not for `found`). Names are **not** validated against
  `GameConfig.RelicSets[].relics`, so a relic renamed in a re-emit stays in the map and will
  inflate whatever downstream counts `found`.
- `areaComplete`: only a literal `true` sets it. `1`, `"true"` and anything else leave the
  default `false`.
- `cleared`: a key survives only if `tonumber(key)` yields an integer in
  `[1, GameConfig.Area.patchCount]` **and** the value is exactly `true`. The lower bound, the
  upper bound and the integrality test are all mine — the state shape says "Bounded by
  area.patchCount, always", which I read as a constraint `load` must enforce rather than one
  it may assume. Without it, an out-of-range key would push `clearedCount` above
  `area.patchCount`, which the state shape forbids outright.
- Discarded `cleared` keys produce **one aggregate warning naming the count**, not one warning
  per key. A corrupt 140-key payload should not print 140 lines.
- The stored `clearedCount` is compared **only when the payload carried a number**. An absent
  count (a pre-field payload) does not warn, because an absence is not a disagreement. A
  present-but-wrong count warns exactly once and names both numbers.
- The mismatch warning also fires in the `areaComplete` branch, where anything but
  `area.patchCount` disagrees with the derived value.
- Order inside `load`: read → apply → warn about discarded keys → reconcile → return. The
  discarded-key warning therefore fires even when the area is complete and the discarded keys
  turn out not to have mattered.
- `load` leaves `state.patches` as an empty array and never sets `state.player`, per the
  interface's "patches empty and player unset".
- When the store handle cannot be opened at all, `load` does not warn a second time —
  `getStore` already warned once — and returns the default state.
- A payload with `areaComplete = true` **and** a non-empty `cleared` list (written by a
  version before the collapse existed) loads correctly and **silently**. I chose not to warn:
  it is a legitimate old format, not corruption.

### What `reconcile` does

- In the `areaComplete` branch the existing keys are **not** cleared before the refill. They
  are already constrained to `[1, patchCount]`, so filling `1..patchCount` produces exactly
  the same set either way; skipping the clear is one fewer loop.
- `clearedCount` is always assigned, even when it already matches, so there is one code path
  rather than a conditional.
- The set is refilled to the **current** `GameConfig.Area.patchCount`. There is no count
  recorded in the payload to compare against, so if `area.patchCount` ever changes, a save
  written when it was 140 expands to whatever the new number is and the player is credited
  with completing an area they never saw. With `AreasPerDepth = 1` and one area shipped this
  is hypothetical today.
- `reconcile` does not latch `areaComplete` — see Stops.

### What `save` writes

- The payload is a **fresh table with fresh copies** of `upgrades`, `cleared` and `found`,
  built before the yielding write. `SetAsync` yields and `clearing` mutates the live state
  every 0.12 s; handing the live tables to a yielding call is a data race nobody asked about.
- `clearedCount` is written from the live state **unchanged**, including when `areaComplete`
  is true (where it equals `area.patchCount`). The collapse is specified for `cleared` only.
  I did not also collapse the count to 0, because `load` derives it anyway and a stored 140
  makes the payload readable by eye.
- The `cleared` copy drops falsy values, so a hypothetical `state.cleared[i] = false` never
  reaches the store. `clearing` is not supposed to write one.
- `save` returns `false` **without a warning of its own** when the store handle is
  unavailable; `getStore` already warned once. A caller that only watches the log will see one
  line for a permanently unsaveable server rather than one per save.
- No dirty check: `save` writes unconditionally every time, on the strength of "Idempotent —
  saving twice with no change between is not an error". Tracking a dirty flag would need a
  hook into every writer, which the brief does not describe.
- `save` never reads or writes anything on `state` other than the six persisted fields.
- `save` does not validate `state`; the parameter is typed.

### Types

- `clearedCount` and `Patch.tierIndex` are typed `number`, not an integer type. Luau has none.
- `cleared` is typed `{ [number]: boolean }`.
- `patches` is typed `{ Patch }`, from `Patch[]` in the state shape.
- `player` is typed `Player?` and is **omitted** from the `defaultState` table literal rather
  than written as `player = nil`, with a comment saying so.
- `Patch.instance` is typed `BasePart?`. The state shape writes "BasePart?"; the
  representation sheet says a patch is a `Part` for three tiers and a `WedgePart` for
  Heartvine, and `BasePart` is the supertype that covers both.
- `applyPayload` takes `{ [any]: any }` for the raw payload, because a DataStore can return
  anything.

### Wording

- Every warning string is invented — the wording, the punctuation, the em-dash-free phrasing,
  the decision to include `player.Name` alongside `player.UserId` (via the `describe` helper),
  and the decision to name concrete numbers in the mismatch and discard messages so the log
  is diagnosable without a repro.

### Verification

- `luau-analyze` reports **no diagnostics of any kind** on this module once the Roblox type
  environment is supplied. I confirmed this on both solvers (`--solver=old --mode=strict` and
  the default new solver), against a harness copy in which `Player`, `BasePart`, `Vector3`,
  `DataStore` and `warn` are declared and the instance-path require of `GameConfig` is
  replaced by an equivalently-typed literal.
- Run directly, the shipped file reports 20 diagnostics, and **all 20 are the analyzer having
  no Roblox definitions**, not defects: `Unknown global 'game'` (×2), `Unknown global 'warn'`
  (×6), `Unknown type` for `Player` / `BasePart` / `Vector3` / `DataStore` (×9),
  `Unknown require: unsupported path` (×1), and two `Expected this to be 'string'/'number',
  but got 'unknown'` inside a `string.format` whose arguments are `unknown` only because
  `GameConfig` and `Player` are. The `luau-analyze` on this machine has no `--definitions`
  flag and no Roblox globals of its own; `GameConfig.luau` itself passes only because it
  touches no Roblox type at all, which is precisely what its own header says it is for. Any
  module in this build order that touches an Instance will produce the same 20-ish class of
  noise, and the build order does not say what "passes luau-analyze" means under that tool.
- Separately, I ran the module against a fake DataStore and checked 60 behavioural assertions
  covering: the default state's every field; a partial-area round trip; the payload holding
  exactly six fields and no aliases of the live tables; the collapse writing an empty `cleared`
  while leaving the live set intact; the inverse refilling `1..140` with `clearedCount == 140`
  and no warning; a stored count of 137 against a 2-key set losing to the derived value with
  one warning; a stored count of 4 against `areaComplete = true` still loading as 140; a
  JSON-style payload whose cleared keys came back as `"7"` and `"9"`; a legacy payload holding
  only `currency`; junk keys (`0`, `141`, `2.5`, `"x"`, `false`) being discarded; read failure,
  write failure, and `GetDataStore` failure from a cold module; a scalar stored under the key;
  and a never-saved player producing no warning. All pass. This was a scratch harness, not a
  test file, and it was deleted — the brief says not to write tests.

## Assumed about a dependency

- **`config`.** I read `game/src/shared/GameConfig.luau`. It exists, it returns one table, it
  does no work at require time, and it constructs no Roblox type, so requiring it from the
  server is safe. I use exactly two values from it: `GameConfig.DataStoreName` (`"ArgaRuin_v1"`)
  and `GameConfig.Area.patchCount` (`140`). I call none of its three functions; persistence has
  no use for a cost curve, an effect curve or a tier roll.
- **`config`'s location.** I assumed the shared root ships as `ReplicatedStorage.UIForge` and
  that `GameConfig` is a direct child of it, per the tree. `WaitForChild` is called with no
  timeout, so if that name is ever wrong this module hangs at require time silently rather
  than erroring. See the corresponding Stop.
- **`clearing` keeps `state.clearedCount` equal to the number of keys in `state.cleared`.**
  `save` copies both rather than recounting, so if `clearing` ever lets them drift, the drift
  is written to the store and `load` silently corrects it on the next join with a warning. I
  chose not to re-derive the count inside `save`, because `save`'s spec says it writes the six
  fields and reconciling is `load`'s stated job.
- **`clearing` only ever writes `true` into `state.cleared`, and only for indices in
  `1..area.patchCount`.** Anything outside that range would survive a save (I do not filter on
  write) and be discarded on the next load, with a warning.
- **`clearing.tick` runs its `clearedCount >= area.patchCount` latch check on every tick, not
  only on a tick that cleared something.** My decision not to latch `areaComplete` inside
  `load` is only self-healing if that is true. If the latch check sits inside the "something
  was cleared" branch, a state that loads with a full `cleared` set and `areaComplete = false`
  never completes, because no patch Instance is left to walk into. I cannot see `clearing`'s
  module and did not read its brief.
- **`plots.spawn` is the only writer of `state.patches`**, and it tolerates receiving an empty
  array from `load`.
- **`server-main` sets `state.player` after `load` returns** and before the state enters the
  live collection, so nothing here needs to populate it.
- **`server-main` treats a `false` return from `save` as "warn and continue"** rather than as
  a reason to retry or to block a shutdown. `save` warns on its own, so a caller that ignores
  the boolean entirely still gets a log line.
- **Nothing else in the game opens a DataStore under `GameConfig.DataStoreName`**, which is
  what makes a whole-record `SetAsync` safe.
- **`load` is called exactly once per join, before anything else touches the player**, per
  `onJoin` step 1. Nothing in this module guards against a second concurrent `load` for the
  same UserId.
