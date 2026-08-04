# Build report — clearing

## Stops

- **Require paths / the Rojo tree.** Nothing readable says where `game/src/shared` and
  `game/src/server` land in the DataModel. I had to invent
  `require(ReplicatedStorage.Shared.GameConfig)` and `require(script.Parent.Progression)`.
  If shared maps to `ReplicatedStorage.GameConfig` (no `Shared` folder), or the server
  folder is not a `Script` with sibling ModuleScripts as children, this module does not
  load at all. This is the single most likely way the build fails, and it is not a value
  any sheet owns.
- **How `start()` gets the player states.** The contract is `start()` with no parameter and
  `tick(states)` with one, and no third thing (registry module, `setStates`, an events
  module) is named that could carry the collection between them. I would have had to invent
  a state registry. Instead I made the parameter optional — `start(states: PlayerStates?)` —
  which is still callable as `start()`, and documented that a zero-argument call means the
  caller is driving `tick` on its own cadence. If server-main calls `start()` and expects
  clearing to find the states itself, clearing silently does nothing forever.
- **The shape of `states`.** Array, map keyed by `Player`, or map keyed by `UserId`? The
  player-state sheet gives the fields of *one* state and never the collection. I typed the
  parameter `{ [any]: PlayerState }` and iterate with `pairs`, which works for all three but
  will produce a type error at a strict-mode call site that passes a differently-keyed table.
- **Who removes a cleared patch's Instance.** `plots` owns "one player's plot of patch
  Instances" but exposes only `spawn`/`despawn` for the whole plot; there is no
  `clear(patch)` or `remove(patch)`. Something has to make a cleared patch stop being
  visible, so clearing calls `instance:Destroy()` itself and nils `patch.instance`. That is
  clearing reaching into another module's Instances. Either `plots` is missing a
  per-patch function or clearing's *Owns* line is missing "remove the patch's part".
- **What clearing a patch looks and sounds like.** No fade, no tween duration, no easing, no
  particle, no sound asset, no delay before removal is specified anywhere I can read. I
  destroy the part instantly on the tick it is cleared. If a sheet specifies a 0.2s shrink,
  this is wrong and nothing in the brief would have told me.
- **`plots` is listed as a dependency but nothing needs it.** None of `claimSlot`,
  `releaseSlot`, `spawn`, `despawn` is required by anything in *Owns*, *Must expose* or
  *Done when*. I do not require it (a dead require is also a lint warning). Either the
  dependency edge is spurious or the interface it should have exposed is missing — see the
  Instance-removal stop above, which is my guess at what that edge was for.
- **What area completion causes.** *Done when 4* says the flag is set exactly once, and the
  sheet says it is a latch. It does not say what observes it: no event, no unlock of a
  second area (`AreasPerDepth = 1` and there is one area in config), no message to the
  client, no completion reward. I set the boolean and do nothing else. If a "you cleared the
  East Terrace" moment is meant to exist, no module in my brief fires it.
- **Nobody applies walk speed.** `Progression.walkSpeed(state)` exists and the `speed`
  upgrade is real, but clearing's *Owns* covers only positions, clearing, currency and
  relics, and progression has no tick to push a value from. Clearing is the only module in
  my brief that touches the character every tick, so it is the obvious place, but writing
  `Humanoid.WalkSpeed` is not in my *Owns* and I did not do it. If no other module does it,
  the Pace upgrade is purchasable and has no effect.
- **3D distance or ground-plane distance.** "within the current clear radius of a patch" does
  not say which, and nothing states the vertical relationship between `patch.position` and
  the character's root. With a root roughly 3 studs up and tier heights of 1.6–3.4, a 3D
  test would make the rarest tiers measurably harder to reach for no designed reason. I used
  X/Z only. This changes effective reach and is a balance decision I had to make.
- **What `patch.position` denotes.** Base of the patch, centre of the part, or the ground
  point? `plots` writes it and I only read it, but the answer moves the distance test by up
  to `height/2` (0.8–1.7 studs against a 5.5-stud radius).
- **Whether persisted state is loaded before a state is ticked.** Clearing writes three
  persisted fields (`clearedCount`, `found`, `areaComplete`). No sheet gives a "loaded" flag
  or an ordering guarantee, so if server-main puts a state into the collection before its
  DataStore read returns, clearing can pay out against a `clearedCount` that is then
  overwritten by the load. I assumed the ordering is safe rather than inventing a gate field.
- **Whether `clearedCount` may exceed `Area.patchCount`.** If `plots` ever spawns more
  patches than `patchCount`, the count runs past it (my harness produced 143 of 140) and
  those extra patches still pay. Nothing says whether that is legal, capped, or impossible.

## Decided without a stated value

**Module and file shape**

- Module table named `Clearing`, matching the file name, mirroring `local GameConfig = {}` /
  `return GameConfig` in the config module.
- Header comment block in the same style as `GameConfig.luau` (why, not what), tabs for
  indentation, backtick interpolation for the two warn strings.
- Requires at the top of the file; `ReplicatedStorage` fetched with `game:GetService`.
- Direct indexing (`ReplicatedStorage.Shared.GameConfig`) rather than `WaitForChild`. Server
  scripts run after the place tree exists, so the wait would only hide a mapping error.
- Every value read through `GameConfig` (`ClearTickRate`, `Tiers[i].value`,
  `Area.patchCount`); no literal restated in this file. The one string literal is
  `"HumanoidRootPart"`, an engine name rather than a tuned value, hoisted to a named
  constant `ROOT_PART_NAME`.

**Types**

- I declared `Patch`, `PlayerState` and `PlayerStates` in this module and `export`ed them.
  No module is named as the owner of the shared state types, so every module that touches
  state will declare its own structurally-identical copy. That is duplication the build
  order did not decide against.
- `tierIndex` and `clearedCount` are typed `number`, not a nonexistent integer type; nothing
  enforces integrality.
- `PlayerStates = { [any]: PlayerState }` (see the stop above) and `pairs` rather than
  `ipairs` over the collection.
- Player sweep order within a tick is `pairs` order, i.e. undefined. Harmless only because
  patches are per-player; two players can never contend for one patch.

**Reading the player's position**

- Position comes from `character:FindFirstChild("HumanoidRootPart")`, not `PrimaryPart`, not
  `Humanoid.RootPart`, not `character:GetPivot()`.
- The found child is `IsA("BasePart")`-checked before `.Position` is read.
- No character, or no root part: the player is skipped silently for that tick. No warn, no
  error, no counter. Applies between spawns, during death, and before the first spawn.
- Nothing checks whether the player is standing inside *their own* plot. A player standing
  in another player's plot clears nothing there, because the sweep only ever walks
  `state.patches` for the state whose own `player` supplied the position — but that also
  means a player who somehow reaches another plot's coordinates clears *their own* patches
  at the matching offset if the plots overlap in world space. Whether plot slots are
  disjoint in world space is `plots`' business and I assumed they are.

**The distance test**

- Ground-plane (X/Z) distance, squared comparison against `radius * radius`, no `math.sqrt`.
- Boundary is inclusive: exactly `radius` away clears. (Verified: 5.5 clears, 5.51 does not.)
- No tolerance or epsilon added to the radius.
- Radius and value multiplier are read once per player per tick, not once per patch. Neither
  dependency call yields, so no purchase can land mid-loop; every patch cleared on one tick
  is paid at one rate.

**The sweep loop**

- `ipairs` over `state.patches` in array order, so ties (two patches equally near) resolve by
  index, not by distance or by tier value. Nothing observable depends on this today.
- `ipairs` stops at the first hole; I assume `patches` is dense.
- Every in-range patch clears on the same tick. No per-tick cap, no "one patch per tick", no
  nearest-first. *Done when 2* reads as an upper bound on latency, not a rate limit.
- Cleared patches stay in the array as tombstones and are re-tested on every subsequent tick
  (`if not patch.cleared`). I never remove entries, so `#state.patches` is stable for whoever
  else reads it. Cost is a full 140-entry scan per player per tick forever; no spatial
  partition, no cursor, no early exit.
- States with `areaComplete == true` are still swept, because a plot could hold more patches
  than `Area.patchCount`.
- A state left in the collection after its player leaves keeps being swept and no-ops
  (`Character` is nil). Clearing never removes anything from the collection.

**Clearing one patch**

- `patch.cleared = true` is set *first*, before the destroy, the award and the counter, so a
  throw anywhere downstream cannot cause a second payout on the next tick. The trade is that
  a throw inside `award` loses that patch's currency permanently. I chose losing one payout
  over minting one.
- Instance removal is `:Destroy()`, not `Debris:AddItem`, not reparent-to-nil, not pooled for
  reuse; `patch.instance` is set to nil before the destroy so nothing can double-destroy.
- Payout is `math.max(1, math.floor(tierValue * multiplier))` — floor first, then the
  minimum. "floored, minimum 1" could also be read as min-then-floor; the two differ for any
  product in (0, 1), which is reachable only if a multiplier below 1 ever exists.
- A `tierIndex` with no configured tier warns and is treated as value 0, which the minimum
  lifts to 1. The patch still clears and still counts. The alternative (skip it) would make
  the area permanently uncompletable, which is worse.
- Relic reveal is `state.found[relic] = true`, unconditionally. No check that the name
  appears in `GameConfig.RelicSets`, no "already found" branch, no duplicate handling, and a
  relic adds nothing to the payout.
- Nothing happens when a relic *set* completes (all 6 of a set found). Clearing writes
  `found` and stops there.
- `clearedCount` is incremented after the award and before the latch check.
- The latch compares `state.clearedCount >= GameConfig.Area.patchCount` (not `==`, which a
  double-increment bug would step over, and not `#state.patches`, because the player-state
  sheet says the count is "against area.patchCount").
- Currency is only ever written through `Progression.award`; this module never touches
  `state.currency`.

**`tick`**

- Returns nothing. No count of patches cleared, no telemetry.
- No nil-guard on `states`; the type says non-nil and a nil there is a caller bug I would
  rather see thrown.
- Exposed separately from the loop so the rule is callable without a scheduler, which is
  also what makes the optional-`states` compromise in `start` safe.

**`start`**

- Idempotent via a module-level `started` boolean: a second call updates the states reference
  but never spawns a second loop (which would double the specified cadence).
- No `stop()`, no way to pause; the loop runs for the life of the server.
- The states table is held by reference and re-read each tick, so joins and leaves written
  into the same table are picked up without restarting.
- Loop is `task.spawn` + `while true do task.wait(rate) ... end`, waiting *first*, so the
  first sweep happens one tick after `start()` rather than immediately.
- `task.wait` yields *at least* the interval, so real cadence is 0.12 plus up to a frame.
  No accumulator, no `RunService.Heartbeat`, no catch-up when a frame runs long. I read
  `clearTickRate: 0.12` as seconds between sweeps, not as a frequency in Hz (0.12 Hz would be
  one sweep per 8.3 seconds); `saveIntervalSeconds: 45` sitting beside it supports that.
- The tick is wrapped in `pcall`; a failure warns and the loop continues on the next
  cadence. One failure loses the whole sweep for every player that tick, not just the failing
  one — I did not isolate per player, because a per-player pcall costs a closure per player
  per tick.
- Exact strings I invented: `` `[Clearing] tick failed: {err}` `` and
  `` `[Clearing] patch has tierIndex {n}, which is not a configured tier` ``. The `[Clearing]`
  prefix convention is mine; no logging convention is specified and there is no logging
  module in my dependency list.
- `warn` rather than `error` or `print` for both.

**The prohibitions**

- No `RemoteEvent`, `RemoteFunction`, `BindableEvent` or `BindableFunction` is created or
  connected anywhere in this file, and no `Touched` connection exists. The consequence I had
  to accept without a stated value: nothing signals a clear to the client, so the only
  feedback a player gets is the part disappearing through ordinary replication. If a HUD is
  meant to pop a "+3 Shards" on the clear, the signal for it does not exist here.

## Assumed about a dependency

**`progression` (file does not exist yet; coded against the declared signatures)**

- `award(state, amount)` adds to `state.currency` and is the only sanctioned way to do so.
  It takes an already-floored integer, does not re-floor or re-clamp, and does not yield.
- `clearRadius(state)` returns studs **including** the 5.5 base (`GameConfig.BaseClearRadius`
  / the `radius` upgrade's `base`), so clearing never adds the base itself. If it returns only
  the upgrade delta, every reach in this module is 5.5 studs short.
- `valueMultiplier(state)` returns a plain multiplier that is 1.0 at level 0 (the `value`
  upgrade has `base = 1`, `mode = "additive"`, `perLevel = 0.25`), not a percentage and not a
  bonus-only delta. Payout is `tier.value * that`. If it returned 0.25 at level 1, every
  payout collapses to the minimum of 1.
- Both readers are pure, cheap and non-yielding — that is what licenses caching them once per
  player per tick.
- Missing `upgrades` keys read as level 0 inside progression (per the player-state note), so
  clearing never seeds that map.
- It lives at `game/src/server/Progression.luau` as a sibling ModuleScript reachable at
  `script.Parent.Progression`.

  *Checked after writing.* A `Progression.luau` was written into the tree by another builder
  while I worked, and my brief permits reading a dependency's source to check a signature, so
  I did. All five signatures match. Its parameter type is
  `ProgressionState = { currency, upgrades }`, which my `PlayerState` satisfies by width
  subtyping (verified with `luau-analyze`). `clearRadius` and `valueMultiplier` both return
  `GameConfig.upgradeEffect(axis, level)`, i.e. the full value including the axis `base`, which
  is what this module assumed: no base is added here and no multiplier is re-derived. `award`
  does **not** floor its argument and ignores anything not strictly positive and finite, so the
  floor-and-minimum in this module is load-bearing rather than belt-and-braces. Its comment on
  `walkSpeed` says outright that "writing it onto a Humanoid belongs to whoever owns the
  character" — which independently confirms the stop above: two modules both decline to apply
  it and the build order names no third.

**`plots` (file does not exist yet; not required by this module)**

- It sets `cleared = false`, a valid 1-based `tierIndex` into `GameConfig.Tiers`, a `position`
  in world space and an `instance` on every patch it spawns.
- On join it rebuilds `patches` from `clearedCount` and `found` (per the player-state note),
  marking already-cleared patches `cleared = true` so clearing does not pay for them twice.
- It keeps no second reference to a patch's `instance` that breaks when clearing destroys it,
  and it tolerates `patch.instance == nil` on `despawn`.
- Plot slots are disjoint in world space, so one player's position can never fall inside
  another player's patches.
- `GameConfig.Area.patchCount` is how many patches it spawns per plot.
- It places relics, including the guaranteed first one (`GuaranteedFirstRelic`), drawing names
  from `GameConfig.RelicSets[].relics`; clearing only reads `patch.relic` and never validates it.

**`config`**

- `GameConfig.Tiers` is a dense 1-based array and its indices are exactly what `plots` writes
  into `patch.tierIndex`.
- `GameConfig.ClearTickRate` is seconds.
- I did not need `upgradeCost` or `tierByWeight`.

**server-main (not in my dependency list, but it calls me)**

- It sets `state.player` before the state enters the collection handed to `tick`, and loads
  persisted fields before that.
- It calls either `start(states)` or `tick(states)`, not both against different tables.
- Nothing else writes `clearedCount`, `found` or `areaComplete` — the player-state sheet says
  clearing owns all three.

**Roblox**

- Default character rigs, so `HumanoidRootPart` exists on every live character.
- `Destroy` on a server-owned part replicates the removal to clients.

## Checks run

- `luau-analyze game/src/server/Clearing.luau` reports 13 errors, **all environmental**: this
  machine's `luau-analyze` (0.731, Homebrew) ships no Roblox type definitions and has no
  `--defs` flag, so `game`, `script`, `task` and `warn` are "unknown global", `Player`,
  `Vector3` and `BasePart` are "unknown type", and both instance requires are "unsupported
  path". None is a defect in the module and none is fixable without either a definitions file
  or `luau-lsp`, neither of which is installed.
- To get a real check I ran the module body in a scratch harness with those globals shimmed,
  the **real** `GameConfig.luau` required by path, and a `Progression` stub carrying exactly
  the brief's signatures: **clean, exit 0**, including a deliberate-typo control run that
  confirmed the harness catches wrong `GameConfig` field names.
- I also executed it against fake states under `luau` and confirmed: a patch at exactly 5.5
  clears and one at 5.51 does not; a patch 43 studs below the root still clears (ground-plane
  distance); payouts at multiplier 1.25 are 1 / 10 / 25 for Moss / Bramble / Heartvine
  (floored, minimum 1); a second tick pays nothing more; the relic is recorded; the instance
  is destroyed and nulled; `areaComplete` latches at `patchCount` and does not re-fire; a
  player with no character is a silent no-op; an out-of-range `tierIndex` warns and pays 1.
