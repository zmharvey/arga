# Build report — clearing

**Analysis:** clean. Bare `luau-analyze` cannot resolve instance requires (`require(Shared.GameConfig)`)
or Roblox globals, so it reports noise regardless of the code. Run under `luau-lsp analyze` 1.69.0
with the Roblox `globalTypes.d.luau` and a hand-written Rojo-style sourcemap placing this module at
`ServerScriptService.Game.Clearing` alongside `Progression`, and `GameConfig`/`Protocol` at
`ReplicatedStorage.UIForge`, it reports **zero errors and zero lints**. One real defect was found and
fixed that way: `local ok, err = pcall(Clearing.tick, states)` does not typecheck, because a `pcall`
of a function declared to return nothing is typed as returning one value, so the error message cannot
be read back out. See the `xpcall` entry below.

## Stops

1. **The payload shape of a snapshot.** `protocol.snapshotShape()` gives the *field names*, and the
   brief says both sides build the payload "from this list rather than repeating field-name
   literals" — but nothing states whether the thing that crosses the wire is a **dictionary keyed by
   those names** or an **array in that order** (`snapshotShape` is described as "the *ordered* field
   names", which actively suggests the second reading). Both satisfy every sentence written about it.
   Getting it wrong is invisible on this side and total on the other: `client-main` and `hud-binding`
   read it, and a HUD fed an array where it indexes `snapshot.currency` shows nothing at all. There
   are also two originators of `StateChanged` (`server-main` and this module) which must agree with
   each other, and no shared constructor exists — `protocol` exposes the field list but no
   `buildSnapshot(state)`. **I chose a dictionary keyed by field name.** The right fix is a
   `protocol.snapshot(state)` that both originators call, so the format has one author.

2. **No symbolic handle for a channel name.** The brief's `Fires` clause says to resolve each channel
   "never by a name you typed yourself", and that is not satisfiable against `Protocol` as built:
   `REMOTES` is keyed *by* the name, and `channel(name)` takes the name as a string. There is no
   `Protocol.Channels.FindRevealed` constant to reach for, and the only name-free discriminator on a
   channel record is `firedBy = "clearing"`, which matches two of my three channels and cannot tell
   `FindRevealed` from `AreaRestored`. **I typed the three names as named locals**
   (`FIND_REVEALED`, `AREA_RESTORED`, `STATE_CHANGED`). The saving grace is that `Protocol.channel`
   errors on an undeclared name, so a typo is loud at the first fire rather than a silent nil — but
   the prohibition as written cannot be honoured.

3. **The minimum payout of 1 is specified in prose and absent from config.** It appears three times
   in the brief (`max(1, floor(tier.value * ...))` in wiring, in the interfaces note, and as
   acceptance criterion 3) but the emitter produces no `GameConfig` key for it, so the instruction
   "pull every value from `GameConfig` rather than restating a literal" cannot be followed for it. It
   is held as `local MINIMUM_PAYOUT = 1` with a comment. Re-emitting the config cannot change it.
   (`plots` reported the same shape of gap for its 40-stud gutter and 1-stud slab, so this is at
   least the third tuned number living in prose.)

4. **No module owns the `PlayerState` and `Patch` types.** `plots` restated `PlayerState` because
   nothing exported one; I cannot even reuse *that* copy, because requiring `Plots.luau` is one of my
   explicit prohibitions, and `Layout` — which does export `Patch` — is not among my declared
   dependencies. So a third copy of `Patch` and a second copy of `PlayerState` now exist, hand-typed
   from `03-state-shape.md` in the brief. Any field the state shape gains has to be added in every
   copy, and nothing will fail if it is not. This is a build-order gap: something shared has to own
   these types.

## Decided without a stated value

**Reach geometry**

- The distance test is **root part centre to patch centre**, because `patch.position` is the only
  position a `Patch` record carries. A patch is `GameConfig.Patch.footprint` = 3 studs square, so a
  surface-based test would clear at up to ~1.5 studs further out. Nothing states which is meant, and
  the difference is 27% of the base radius.
- The boundary is **inclusive** (`<=` radius). Exactly-on-the-edge clears.
- Compared as **squared distances**, no `math.sqrt`. Exactly equivalent for a non-negative radius and
  it keeps a square root out of a 140-iteration inner loop.
- **No epsilon anywhere.** The radius ladder is `5.5 + 1.1 * level` and `1.1` is not exact in binary,
  so the boundary is fuzzy in the last ULP; the payout is `math.floor` of a float product with no
  tolerance nudge. Both are the naive reading and both are silently different from a specification
  that intended rounding.
- Y is ignored entirely, per "XZ only" — including for a player who is falling, jumping or standing
  on top of a patch.

**The pass, and its ordering**

- Order of the guards: `areaComplete` → character/HumanoidRootPart → `state.patches` → radius. The
  first two are specified; the third is mine.
- `state.patches == nil` is a **skip, not an error**. The character guard already covers the only
  window in which it can be nil (`persistence.defaultState()` does not construct `patches`;
  `plots.spawn` writes it before the character loads), but a state with no patches aborting the whole
  pass for every other player is a bad trade.
- `state.player` is **not** nil-guarded. The state shape says it is set before the state enters the
  collection, so a nil there is a wiring bug I would rather see as an error than swallow.
- The root part is found with `character:FindFirstChild("HumanoidRootPart")` plus an `IsA("BasePart")`
  narrowing — not `character.PrimaryPart`, not `humanoid.RootPart`.
- **No Humanoid health check.** A dead character that has not yet despawned still clears patches it
  is lying in. Nobody said either way.
- `progression.valueMultiplier(state)` is **hoisted out of the loop** and read once per pass, the same
  treatment the brief specifies for the radius but does not specify for the multiplier (its prose
  writes the call inline in the award expression). Nothing in the loop yields, so the two cannot
  differ; this is purely 140 fewer calls per player per tick.
- The award is made **per patch**, not accumulated and awarded once per pass. The brief's prose is
  per patch. With `max(1, ...)` applied per patch this is not the same number as one award on a
  summed total — flooring 140 times is not flooring once — so it is load-bearing, not stylistic.
- `clearedCount` is incremented **only when `state.cleared[index]` was not already set**. The state
  shape says the count "always equals the number of keys in cleared", and criterion 5 says it never
  exceeds `patchCount`; an idempotent write is what makes both true even if `patch.cleared` and
  `state.cleared` ever disagree. The brief just says "increment".
- No explicit clamp of `clearedCount` to `area.patchCount`. It is bounded by the length of
  `state.patches` instead. If `layout.build()` ever returns more than `patchCount` records the clamp
  is gone.
- **Patch with a `tierIndex` `GameConfig.Tiers` does not have:** the patch is still cleared and
  counted, one `warn` is emitted, and **nothing is paid**. Rejected alternatives: skipping the patch
  (it can then never be cleared, the area can never be completed, and the warn repeats 8x/second
  forever) and paying the minimum of 1 (invents a payout for a patch whose value is unknown). Nobody
  specified this case.
- A `Patch` with `cleared == false` but `instance == nil` clears normally; the `Destroy` is
  conditional. Not specified; it is what a plot that failed to build one part would look like.
- `state.found[relic]` is tested for truthiness, so an explicit `false` counts as not-found and
  re-fires the reveal. The map is documented as `map<relicName, boolean>` and nothing says only
  `true` is ever written.
- The `FindRevealed` payload is `Patch.relic` verbatim, **unvalidated** against
  `GameConfig.RelicSets`. Clearing trusts whatever `layout` put in the record.
- Remote ordering within a pass: every `FindRevealed` (in patch-index order), then `AreaRestored`,
  then one `StateChanged`. That is the brief's prose order, but it means the client is told about a
  Find *before* it receives the snapshot in which `found` contains it. Nobody said which the client
  should see first.
- Patches are visited in `ipairs` order over `state.patches`, so within one tick the payouts happen in
  layout index order rather than nearest-first. Only observable if something ever caps a tick's
  payout.
- No per-tick cap on how many patches may clear. A maxed radius that engulfs the plot clears all 140
  in one pass: 140 awards, up to 6 reveals, one `AreaRestored` and one `StateChanged`, in one frame.
- No spatial index, no early exit, no cull of already-cleared entries — a linear scan of all
  `patchCount` records per player per tick, forever, because `plots` requires the array to keep every
  index aligned with `state.cleared`.

**The latch and the push**

- The latch sets `changed = true`, so a pass that latches without clearing anything still pushes a
  snapshot. That pass is only reachable if a state arrives with `clearedCount >= patchCount` and
  `areaComplete` false, but `areaComplete` is a snapshot field and the HUD would otherwise never
  learn of it.
- The `and areaComplete is false` half of the latch test is kept even though the guard at the top of
  the function makes it unreachable-false. It is where the "exactly once" property is visible.
- The snapshot is built **after** the latch, so a completing pass pushes one snapshot with
  `areaComplete` already true, rather than one before and one after.
- The snapshot is **shallow**: `upgrades` and `found` cross the wire as the live tables. Roblox
  serialises at the moment of `FireClient`, so a later mutation cannot reach a sent payload, but the
  returned table is not defensively copied or frozen.
- `Protocol.channel(name)` is called **at each fire site**, not resolved once into a local at `start`.
  `Protocol` caches internally, so this is two hash lookups, and it means nothing here can hold a
  stale Instance.

**The loop**

- `task.spawn` + `while true do task.wait(ClearTickRate) ... end`. Rejected: a `RunService.Heartbeat`
  connection with a time accumulator.
- **Waits before the first pass**, so tick 1 lands at t=0.12 and not during the rest of boot (`start`
  is boot step 4; the save loop and the remote handlers are steps 5 and 6).
- **No drift compensation and no catch-up.** `task.wait(0.12)` resumes on the first Heartbeat at or
  after 0.12s, so the real cadence at 60 Hz is ~0.133s (8 frames), about 7.5 passes per second rather
  than 8.33. Nothing says whether `clearTickRate` is a period to hit or a minimum to exceed.
- **There is no way to stop the loop.** No `stop()`, no sentinel; it dies with the server. Nothing in
  the contract asks for one, and `onShutdown` does not mention quiescing it — a tick can therefore
  run concurrently with the shutdown save.
- `start` is **idempotent with a warn**: a second call is ignored rather than installing a second loop
  and doubling the effective tick rate. Nothing specified this; "called once by server-main at boot"
  is a statement about the caller, not a guarantee.
- **`xpcall`, not `pcall`.** Semantically the same guard, chosen because `pcall` of a function typed
  as returning nothing does not typecheck when you want the error message (see Analysis above). The
  brief says "pcall" literally.
- The guard wraps **the whole tick pass**, not each state, per `start`'s note ("wraps each tick in a
  pcall"). Consequence: one state that throws aborts the remaining states in *that* pass — their
  order is undefined, so which ones is nondeterministic. A per-state guard would have contained it,
  and the wiring sheet's phrasing ("one bad iteration") arguably wants that; I followed `start`'s
  wording instead.
- A failing tick warns **every time**, with no rate limit. A persistent fault produces ~8 warnings a
  second.

**Names, text and shape**

- Warning prefix `[Clearing]`, following `Plots`' `[Plots]`. The repo has two conventions —
  `Progression` uses `progression.award: ` — and nothing picks one.
- Exact warning strings: `"[Clearing] start called more than once; the second collection is ignored"`,
  `` `[Clearing] a tick failed and was skipped: {err}` ``, and the tier-index warning naming both the
  patch index and the bad `tierIndex`.
- Private helper names `tickPlayer`, `rootPartOf`, `buildSnapshot`; local `started`; loop locals
  `dx`, `dz`, `radiusSquared`, `multiplier`, `changed`.
- Named constants `MINIMUM_PAYOUT`, `ROOT_PART_NAME`, `FIND_REVEALED`, `AREA_RESTORED`,
  `STATE_CHANGED`.
- `PlayerState` and `States` are **exported** types even though the contract only requires two
  functions, matching what `Plots` did. This means two server modules now export a `PlayerState`;
  they are structurally compatible today and nothing keeps them so.
- `pairs` over the collection, value only, index discarded — the UserId key is never read, and the
  keys are not validated as UserIds.
- `GameConfig.Area` is indexed twice (`patchCount`, `label`) rather than hoisted; `GameConfig.Tiers`
  is hoisted into a local because it is read inside the loop.
- The module never writes to the `states` table itself: no insert, no delete, no replacement.

## Assumed about a dependency

**progression** (read `Progression.luau`)

- `award`, `clearRadius` and `valueMultiplier` never yield. If any of them did, the "nothing in the
  loop yields" reasoning behind hoisting the multiplier, and the safety of mutating `state` mid-loop,
  both fail.
- `award` rejects a non-positive amount with a warn rather than erroring. I never send one —
  `max(1, ...)` guarantees ≥ 1 — but if `valueMultiplier` ever returned NaN, `math.floor(NaN)` is NaN,
  `math.max(1, NaN)` is implementation-order-dependent, and `award`'s `not (amount > 0)` test would
  catch it and warn rather than corrupting the balance. I rely on that.
- `Progression.PlayerState` (`currency`, `upgrades`) is a structural subset of my `PlayerState`, so
  passing mine typechecks by width subtyping. Confirmed by the analyzer, not by the contract.
- Each of `clearRadius`/`valueMultiplier` linearly scans `GameConfig.Upgrades` and calls
  `upgradeEffect`. Two scans of three entries per player per tick; assumed acceptable.
- `clearRadius` returns a non-negative number. A negative would make `radiusSquared` positive and
  clear a ring, which nothing guards against.

**protocol** (read `Protocol.luau`)

- `createRemotes()` has already run (boot step 2) before `start` (step 4), so my first
  `Protocol.channel` call cannot block on `WaitForChild`. If that order were ever reversed the first
  tick would hang the tick thread, not error.
- `channel(name)` returns `any`, so `:FireClient(...)` is unchecked at compile time. I assume the
  three names I use resolve to `RemoteEvent`s — true per `REMOTES`, but the type system is not
  carrying it.
- `snapshotShape()` returns a shared frozen array that I only read. I call it on every push rather
  than caching it at require time, on the assumption it is cheap and that caching a frozen table at
  load would count as work at require time.
- The five channels are the whole set and no sixth exists for clearing to use.

**plots** (read `Plots.luau`; deliberately **not** required)

- `state.patches` is indexed 1..N in `layout.build()`'s canonical order and that index is the
  `state.cleared` key. Verified by reading the source, not guaranteed by a type.
- `patch.position` is already **world space** when it reaches me. `Plots.spawn` performs the
  conversion; a tick that ran against plot-local positions would clear the wrong patches for every
  slot but slot 1, and nothing would report it.
- Already-cleared patches arrive with `cleared = true` and `instance = nil`, so I never `Destroy`
  a nil and never re-pay on a rejoin.
- `plots` does not mutate `state.patches` while a tick could be running. It does clear the array in
  `despawn`, but `onLeave` removes the state from the collection first, so no pass can see it.
- Destroying `patch.instance` is safe for `plots` — the slab is the parent, so a later
  `slab:Destroy()` does not care that a child is already gone.

**persistence** (not read)

- `defaultState()` constructs `currency`, `upgrades`, `cleared`, `clearedCount`, `found` and
  `areaComplete`, so I nil-guard none of them. It does **not** construct `patches`, which is why that
  one is guarded.
- `load` refills `cleared` from the `areaComplete` latch and re-derives `clearedCount` from the
  cleared set. Criterion 5 ("clearedCount never exceeds patchCount over any number of rejoins")
  depends on that inverse being exact; nothing on my side can enforce it.

**server-main** (not read, and its file is forbidden)

- Writes `state.player` before the state enters the collection, so `state.player` is never nil in a
  tick.
- Removes the state from the collection *before* saving and tearing down the plot, so a tick can
  never touch a state mid-teardown.
- Builds its `StateChanged` payload in the same shape mine uses — see stop 1. This is the assumption
  I am least comfortable with, because nothing in either module can detect a mismatch.
- Owns the write to `Humanoid.WalkSpeed`. `clearing` reads no speed and writes no Instance property.

**config**

- `GameConfig.Tiers[i].value` is a number, `GameConfig.Area.patchCount` is the count `layout` actually
  produces, `GameConfig.Area.label` is the human string `AreaRestored` carries, and
  `GameConfig.ClearTickRate` is seconds.

**layout** (not read at all)

- The `Patch` record shape was taken from `03-state-shape.md` as quoted in the brief, not from
  `Layout.luau`, which is not one of my declared dependencies. `relic` is `string?` and is the entire
  world-side representation of a Find.
