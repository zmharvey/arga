# Build report — clearing

**`luau-analyze`:** clean, with a caveat worth reading. The installed build
(`/opt/homebrew/bin/luau-analyze`) has no `--definitions` flag and no Roblox type definitions,
and cannot resolve Roblox-style `require` paths. Run directly on this file it reports **23
errors, none of which is a defect in the module**:

- 13 are the direct environmental class — `Unknown global 'game'/'script'`, `Unknown type
  'Player'/'BasePart'/'Vector3'/'RBXScriptConnection'`, `Unknown require: unsupported path`, and
  `Unknown type 'Progression.State'`.
- The remaining 10 (lines 106–143: *"Key 'position' not found in table
  `{ read cleared: false? }`"*, *"Property cleared … is read-only"*, *"Cannot assign … to a field
  of type never"*) all **cascade from that last one**. `PlayerState` is an intersection with
  `Progression.State`; when that type cannot resolve, `PlayerState` collapses, `patches` loses
  its element type, and every field access on a patch fails in sequence. They vanish the moment
  the require resolves. They look like real defects and are not, which is itself worth flagging:
  this is what the pipeline's own check command prints for a correct module.

To check the module's own types I re-ran the identical body against scratch stubs for those
globals and for `GameConfig`
and `Progression` — the `Progression` stub mirroring the real file's exported signatures and its
`State = { currency, levels }` type: **0 errors under both `--solver=new` and `--solver=old`,
`--mode=strict`**, with one exception recorded as Stop 1 (removing the `valueMultiplier` stub,
i.e. modelling `Progression` exactly as it actually ships, yields
`TypeError: Key 'valueMultiplier' not found in table 'Progression'`).
One line cannot be checked this way — `root:IsA("BasePart")` narrowing `Instance?` to `BasePart`
relies on Luau's built-in `IsA` refinement for *class* types, which plain-table stubs cannot
model. It is the standard Roblox idiom and typechecks under `luau-lsp` with real definitions,
but it is unverified here.

---

## Stops

1. **A value-multiplier accessor on `progression`. This one is confirmed broken, not
   speculative.** "Done when" 3 requires "the player's value multiplier". `progression`'s
   declared surface is `award`, `tryBuy`, `clearRadius`, `walkSpeed` — it derives radius and
   speed but not value. No sheet in my *Values* carries the upgrade ladder either. To proceed
   without stopping I would have had to invent the curve, and the two obvious readings of
   `GameConfig.Upgrades.value.perLevel = 0.25` diverge badly: additive `1 + level * 0.25` gives
   3.5× at maxLevel 10, multiplicative `1.25 ^ level` gives 9.31×. I call
   `Progression.valueMultiplier(state)` rather than pick one.

   `Progression.luau` was written by another builder while I worked, so I checked its signatures
   (permitted by my brief). It exposes exactly the four declared functions and **nothing else**;
   the strings "multiplier" and "value" do not occur anywhere in it outside comments. So the
   payout half of "Done when" 3 **cannot be satisfied by any builder working from these two
   packs**: one pack asks for a multiplier, the other pack never tells anyone to produce one.
   Modelling the real `Progression` surface in a typecheck harness reproduces it exactly:
   `TypeError: Key 'valueMultiplier' not found in table 'Progression'`.

   I did not fix it by computing the curve here. That would have hidden a live contract gap
   behind a number I invented, which is the failure this exercise exists to detect.
2. **The shape of a patch record.** `plots.spawn(player, state)` builds the patches, but nothing
   declares what it writes onto `state`. I needed five things and got none of them: where the
   patch list lives, how a patch reports its world position, how it names its tier, how it
   carries a relic, and how "already cleared" is recorded. I invented the entire `Patch` type.
   This is the largest gap in the brief by a wide margin — everything this module does happens
   through a data structure no sheet describes.
3. **How one patch is removed.** `plots` exposes only whole-plot `spawn`/`despawn`. Nothing owns
   "this single patch is now gone". I call `instance:Destroy()` from inside Clearing, which puts
   Instance teardown in two modules and contradicts "call your dependencies, do not reimplement
   them" — there was nothing to call.
4. **The name and location of the area-complete flag.** "Done when" 4 names "the area-complete
   flag" as if it were already specified. It is not, anywhere in my pack. I chose
   `state.areaComplete`.
5. **What consumes the area-complete flag.** "exactly once" only means something if there is a
   one-shot side effect — a notification, a next-area unlock, a forced save, a badge. No
   consumer, signal, callback or remote is named. I set a boolean and do nothing else, so if the
   intended once-only effect was an action, **this module silently does not perform it** and
   "Done when" 4 is satisfied only in the trivial sense.
6. **What "reveal a relic" means.** My *Owns* line ends "and reveal relics", and nothing else in
   the brief mentions relics again. No storage location, no client channel, no ordering, no
   relation to `GameConfig.RelicSets`, `RelicsPerArea = 6`, `FindNoun` or
   `GuaranteedFirstRelic = true`. I write `state.relics[name] = true` and send nothing.
7. **Which relic set the current area draws from.** `GameConfig.Area.id` is `"east-terrace"`;
   `GameConfig.RelicSets` ids are `terrace`, `cistern`, `vault`, `spire`. The mapping from one
   to the other is nowhere. I dodged it by taking the relic name off the patch record, which
   pushes the same unspecified mapping into `plots`.
8. **How `start()` reaches the state table.** The contract is `tick(states)` (state passed in)
   and `start()` (nothing passed in). No source for `states` inside `start` is declared, and
   the module that owns the table is `init.server.luau`, which I may not read. I invented a
   `Clearing.states` registry plus an optional parameter so both call shapes work.
9. **The Rojo instance paths for the requires.** No `default.project.json` is in the pack, so
   which service `src/shared` lands under is unknowable. I guessed
   `ReplicatedStorage.Shared.GameConfig`. If the project maps `src/shared` to the
   `ReplicatedStorage` root instead, this module fails to load.
10. **Who owns the player-state table, and what is in it.** `Progression.luau` (checked after it
    appeared) declares `export type State = { currency: number, levels: UpgradeLevels }`. That
    is the whole thing: no `patches`, no `relics`, no `areaComplete`, no player reference, no
    slot. Yet `plots.despawn(state)` must find a slot on it and my module must find patches on
    it. **No module in either pack owns the composite state type**, so every builder invents a
    partial view of the same table and the views only meet at runtime. I mitigated my half by
    intersecting `Progression.State` (see below) rather than restating `currency`/`levels`, but
    nothing does that for `patches` or the slot.
11. **Who applies `walkSpeed`.** `progression.walkSpeed(state)` is handed to me as an available
    dependency, and `movement.baseWalkSpeed` is handed to me as one of my three *Values* blocks,
    but nothing in my *Owns* or *Done when* says anyone writes it onto a `Humanoid`. I do not.
    If no other module does, the Pace upgrade is inert and nobody's brief would say so.

---

## Decided without a stated value

### Where the values went
- **`movement.baseClearRadius` and `movement.baseWalkSpeed` are packed to me but deliberately
  unused.** `Progression.clearRadius(state)` owns the derived radius; reading the base here too
  would give two modules a claim on it. `GameConfig.BaseClearRadius` and `GameConfig.BaseWalkSpeed`
  therefore appear nowhere in this file. If the pack intended me to use them, this module is wrong.
- **`runtime.saveIntervalSeconds` and `runtime.dataStoreName` are also unused.** Nothing in this
  module persists anything. They were packed to a module that has no use for them.
- Tier `weight` and `GameConfig.tierByWeight` are unused: tier assignment happens at spawn.
- Tier `shape`, `rgb`, `height` and all of `GameConfig.Patch` are unused: assumed Plots' concern.
- `GameConfig.ClearTickRate` and `GameConfig.Tiers[i].value` are the only config this module
  actually reads. Three *Values* blocks were packed; roughly one and a half fields were needed.
- **I did not read `docs/BUILD-ORDER.md` or `pack-progression.md`, both present in my working
  root**, because the brief says it is the whole specification. If either settles the value
  multiplier or the patch shape, the finding is that they were not routed into the pack.

### Names I chose
- Module table `Clearing`; types `Patch`, `PlayerState`, `States`, all `export type` so
  Progression/Plots could import them, though nothing asked for that.
- `Patch` fields: `instance`, `position`, `tierIndex`, `relic`, `cleared`.
- State fields: `patches`, `relics`, `areaComplete`.
- Locals: `rootPosition`, `payout`, `clearForPlayer`, `heartbeat`, `accumulated`, `target`,
  `earned`, `remaining`, `radiusSquared`, `multiplier`, `origin`.
- Public fallback registry named `Clearing.states`.
- Chose `tierIndex: number` over storing the tier table itself, because `GameConfig.tierByWeight`
  returns `(index, tier)` and returning the index at all implies the index is the storable form.
  Pure inference from a function signature.

### Data-shape calls
- `states` is keyed by `Player`, not an array and not a userId map. Inferred from
  `plots.spawn(player, state)` taking the player *separately*, which suggests `state` does not
  carry it. Nothing says so, and `plots.despawn(state)` taking state alone points the other way.
- `state.relics` is a **set** (`{[string]: boolean}`), not a list. A relic found twice collapses
  silently. A list would have made the duplicate visible. Nothing says whether a relic can
  recur.
- `PlayerState` is `Progression.State & { patches, relics, areaComplete }` — an **intersection**
  with the dependency's exported type rather than a restatement of it. Chosen after
  `Progression.luau` appeared mid-build and turned out to type its `State` as
  `{ currency, levels }`: had I kept my original self-contained `PlayerState`, passing it to
  `Progression.award(state: State, …)` would have failed typechecking for missing properties.
  Nothing in either pack says the state is shared or composite; this is inference from two
  function signatures. Plots' half (the slot, and `patches` itself) is still unowned.
- Consequently this module imports a *type* from Progression as well as functions, a coupling
  direction the build order does not mention. I took the trade knowingly: it makes the module
  correct against the real dependency at the cost of making a standalone `luau-analyze` run
  cascade 10 spurious errors (see the note above). Correctness under real resolution beat
  tidiness under a check that cannot resolve anything anyway.
- `patches` is typed optional (`{Patch}?`); `relics` and `areaComplete` are typed non-optional.
  That asymmetry is a guess: plots spawn lazily, counters presumably initialise with the state.
- The patch list is assumed array-like, 1-based and dense (`ipairs`).
- Cleared patches stay in the array with `cleared = true` rather than being removed, so the
  array never compacts and per-tick scan cost never falls as the area empties.
- `state.relics` is assumed to exist; Clearing does not create it. If nil, the tick errors.

### Loop shape and cost
- Every player is checked against **every** patch every tick — 140 patches × N players × 8.33 Hz.
  No spatial hashing, no bucketing, no per-tick budget, no early exit once one patch is found.
- `remaining` is recounted from scratch each tick rather than kept as a counter on state: cannot
  drift out of sync, costs a full scan.
- Iteration over `states` uses `pairs`, so order is nondeterministic. Judged safe only because
  plots are per-player and disjoint. If two players could ever contend for one patch this is a
  race whose winner varies run to run.
- **All** patches inside the radius clear in the same tick, not one per tick. "Done when" 2
  ("clears it within one tick") reads that way but does not say it.

### Geometry and tolerances
- Distance is **horizontal (XZ) only**; Y is ignored entirely. Chosen because the Reach upgrade
  blurb is "clear a wider sweep as you walk" and because `HumanoidRootPart` sits ~3 studs above
  ground, which a true 3D distance would quietly subtract from a 5.5-stud radius. Consequence: a
  player on a ledge 40 studs above the terrace still clears what is beneath them.
- Boundary is **inclusive** (`<=`), compared as squared distance, with no epsilon and no
  float tolerance.
- The test is against the patch's stored **centre point**, not its footprint.
  `GameConfig.Patch.footprint = 3`, so a patch whose near edge is 1 stud inside the radius but
  whose centre is 1 stud outside does not clear. Nobody said which the radius measures to.
- Position is sampled from a child named `HumanoidRootPart` via `FindFirstChild`, not from
  `Humanoid.RootPart` and not from the model's pivot. A non-`BasePart` with that name is treated
  as absent.
- No check that a player is standing on *their own* plot. The test is purely geometric, so if
  two plots ever overlap in world space, a player clears the other player's patches.

### Edge cases nobody mentioned
- No character, or no `HumanoidRootPart`: skip that player for that tick. Silent — no warning,
  no error, no retry.
- **No check on `Humanoid.Health`.** A dead character still clears if its root part is present
  and positioned. Nothing in the brief mentions death at all.
- A player with `patches` nil **or an empty array returns early and is not marked complete.**
  Without this guard, an unspawned plot reads as `remaining == 0` and would fire area-complete on
  the very first tick. This is the single most likely silent bug in a naive reading of "Done
  when" 4.
- Once `areaComplete` is true, the whole per-player pass short-circuits, so clearing stops
  entirely. Nothing says whether a completed area should keep accepting late patches.
- `patch.instance` being nil is tolerated (the patch still clears) rather than treated as an
  error.
- `patch.instance` is set to nil after `Destroy()`, so state stops holding a destroyed object.
- A `tierIndex` that does not resolve raises `assert` with the message
  `Clearing: patch {index} has no tier at index {tierIndex}`. I chose loud failure over clamping
  to tier 1 or skipping the patch. **The cost of that choice:** if Plots ever emits a bad index,
  the assert fires 8.33 times a second forever, and the currency already accumulated earlier in
  that same pass is lost because `Progression.award` sits below the loop.
- The tier lookup and its assert happen **before** any mutation of the patch, so an assert can
  never leave a patch marked cleared with its Instance still standing.
- Duplicate relic writes are unconditional — no "first time" branch — because no first-find side
  effect was specified.

### Payout
- `math.max(1, math.floor(value * multiplier))` — floor first, then the minimum, so a multiplier
  below 1 still pays 1 rather than 0. "floored, minimum 1" admits the other order, which would
  differ for any multiplier under 1.
- Currency is accumulated across the tick and `Progression.award` is called **once per player
  per tick**, not once per patch. The total is identical because the floor and minimum are
  applied per patch first, but anything Progression does *per call* — a dirty flag, an event, a
  stat, a rate limit — now fires once instead of N times.
- `award` is skipped entirely when `earned == 0` rather than called with 0.
- `clearRadius` and `valueMultiplier` are each read once per player per tick and cached for the
  whole pass, so an upgrade bought mid-pass applies from the next tick.

### Cadence
- `RunService.Heartbeat` with an accumulator, **not** `while true do task.wait(ClearTickRate) end`
  and not chained `task.delay`. `task.wait(0.12)` resumes on the first Heartbeat past 0.12 s,
  which at 60 Hz is 0.1333 s — an ~11% slow cadence, permanently. Carrying the remainder averages
  the configured rate.
- The remainder is clamped to at most one interval (`math.min(accumulated - rate, rate)`), so a
  long hitch yields one catch-up tick rather than a burst. Nothing specified hitch behaviour.
- At most one clear pass per frame regardless of how many intervals elapsed.
- `Heartbeat` rather than `Stepped`/`PreSimulation`; ordering against physics unspecified.

### Lifecycle and errors
- `start()` is idempotent via a module-level `heartbeat` guard. A second call is a **silent
  no-op**, not an error and not a restart.
- `start()` returns nothing, and no `stop()` or disconnect path is exposed, so the connection
  lives for the server's lifetime.
- **No `pcall` anywhere.** One player's malformed state aborts the pass for every player after it
  in iteration order — and since iteration order is nondeterministic, *which* players get skipped
  varies between ticks. Roblox catches the error at the connection boundary, so the next tick
  still runs.
- No logging, no analytics, no `warn` anywhere in the module.

### Surface
- `Plots` is a declared dependency but is **not required at all**, because none of its four
  functions is reachable from anything in my *Owns* or *Done when*. The real coupling to Plots is
  the shape of `state.patches`, which is data coupling the build order has no way to express.
  Requiring it for form's sake would have been an unused import.
- No RemoteEvent, RemoteFunction, BindableEvent or Attribute is created, and none is listened to.
  "Done when" 1 is satisfied by absence.
- Consequently **nothing is replicated to the client from this module** — not the payout, not the
  relic, not area-complete. Whatever the player sees must come from Progression's own
  replication, which is outside my brief.
- Requires are `ReplicatedStorage.Shared.GameConfig` and `script.Parent.Progression`. The sibling
  form assumes `src/server/init.server.luau` turns `src/server` into a Script whose siblings are
  its children — inferred from the filename I am forbidden to open.
- `Clearing.states` is typed by casting an empty table literal (`{} :: States`).
- Style: tab indentation, `--[[ ]]` header block then line comments above declarations, matching
  `GameConfig.luau`. String interpolation (backticks) for the assert message.

---

## Assumed about a dependency

### `progression` (did not exist when I started; appeared mid-build, signatures checked)
- **`Progression.valueMultiplier(state): number` exists. It does not — this is now a verified
  break, not an assumption.** Assumed semantics, for whoever adds it: a plain multiplier that is
  `1.0` at level 0, not a percentage, not a bonus-only delta, not already applied to the tier
  value.
- I read only the exported signatures and type declarations of `Progression.luau`, which my
  brief permits ("to check a signature"). I did not read its body or its report.
- `Progression.clearRadius(state): number` returns **studs**, already including upgrades, and is
  cheap enough to call once per player per tick.
- `Progression.award(state, amount)` takes a positive integer, mutates `state` in place, and does
  not itself floor, clamp or cap. Assumed it does not care which patch produced the currency.
- Neither `award` nor `clearRadius` nor `valueMultiplier` yields. A yield inside a Heartbeat
  callback would stall the pass.
- Progression, not Clearing, initialises the player's state table.

### `plots` (file does not exist)
- `Plots.spawn(player, state)` writes `state.patches` as an array of records carrying
  `position` (a world-space `Vector3`), `tierIndex` (a 1-based index into `GameConfig.Tiers`),
  `cleared = false`, an optional `relic` name string, and `instance` (the `BasePart`). **None of
  this is declared anywhere.** Every field name and type here is mine.
- `state.patches` is nil or empty before Plots spawns it.
- Plots does not re-read `patch.instance` after Clearing destroys it, and `despawn(state)`
  tolerates entries whose `instance` is already nil.
- Plots keeps each player's plot spatially disjoint from every other player's, since my radius
  test is purely geometric and has no plot-ownership check.
- Plots (or whoever creates the state) initialises `state.relics` to a table and
  `state.areaComplete` to `false`.
- Plots honours `GameConfig.GuaranteedFirstRelic` at placement time. Clearing does nothing to
  guarantee a first find.
- Plots resolves which relic set `"east-terrace"` draws from, since I take the name off the patch.

### `config`
- `GameConfig.Tiers` is 1-based and dense, and `value` is the pre-multiplier payout in currency
  units (not a per-second rate, not a display number).
- `GameConfig.ClearTickRate = 0.12` is **seconds per tick**, not ticks per second. Read the other
  way it would be one tick every 8.3 seconds, which is why it is worth stating.
- `GameConfig` loads outside the engine (its own header says so), so requiring it from a server
  module is safe and cheap.

### Elsewhere in the server
- Something else calls `Clearing.start(...)` and something else populates the state table.
  Clearing registers no `PlayerAdded`/`PlayerRemoving` handler and creates no state.
- Something else applies `Progression.walkSpeed(state)` to the `Humanoid`.
- Something else replicates currency, relics and area-complete to the client.
- The Rojo project maps `src/shared` to `ReplicatedStorage.Shared`. Unverifiable — there is no
  project file in the pack.
