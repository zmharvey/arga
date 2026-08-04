# Build report — plots

**Analysis.** The `luau-analyze` on this machine (`/opt/homebrew/bin/luau-analyze`, the
upstream Luau CLI) has no `--defs` flag and ships no Roblox definitions, so it cannot know
`game`, `Vector3`, `Instance`, `Enum`, `Color3`, `warn`, `BasePart`, `Player`, `CFrame` or
`Enum.Material`, and it reports `Unknown require: unsupported path` for both dependencies.
On `Plots.luau` it emits 44 diagnostics, every one of that kind or a cascade from the
unresolved require; the already-built `Layout.luau` emits the same class of error (6).
Nothing it reports is a defect in this file, and nothing it reports can be fixed without
definitions.

To get a real check I ran `luau-lsp 1.69.0 analyze` with Roblox `globalTypes.d.luau` and a
hand-written sourcemap so the two requires resolve to the actual `GameConfig` and `Layout`
types: **zero diagnostics, strict mode.** I verified the harness was really typechecking by
re-running it against copies with a deliberate `area.sizze` and `patch.tierIndexx`, both of
which it caught. I also executed the module outside the engine against stubbed Roblox
globals and the real `GameConfig`/`Layout` to confirm the five "Done when" criteria: 140
records / 140 instances fresh; 140 records / 137 instances on a rejoin with three cleared;
140 records / **0** instances with `areaComplete` true (with `state.cleared` replaced by a
table that throws on any read, which never fired — the latch really does short-circuit it);
slot stride 160 studs between two players; `Plot1` reused after a despawn before `Plot3` is
allocated; every patch `CanCollide = false`. Those harness files were temporary and are
deleted; no test file was added to the build.

## Stops

- **The orientation of the Cylinder and Wedge silhouettes.** `06-representation.md` gives
  `Shape`, `Size`, `Position`, `Color`, `Material`, `Anchored`, `CanCollide`, `CastShadow`,
  `Name` and `Parent`, and no rotation. In Roblox, `Enum.PartType.Cylinder`'s axis runs
  along **X**, so `Size = Vector3.new(3, tier.height, 3)` with an unrotated part renders
  Fern as a cylinder **lying on its side** — 3 studs long on X with a 2.4 × 3 elliptical
  cross-section — not as an upright column. A `WedgePart`'s slope likewise faces a fixed
  direction that nothing states. The sheet calls shape the *primary* rarity channel on an
  accessibility constraint, so this is the channel the omission damages. Standing the Fern
  up would mean inventing `CFrame.Angles(0, 0, math.rad(90))` (or an `Orientation`), and
  aiming the Heartvine would mean inventing a yaw; I invented neither and built exactly the
  property list the sheet gives. Related, same root cause: `Enum.PartType.Ball` renders a
  sphere sized by the **smallest** component, so for Bramble the 3-stud footprint is
  discarded and `tier.height` alone sets the diameter. One `Size` formula does not mean the
  same thing across the four shapes, and nothing in the contract acknowledges that.

- **Adjacent finding, not a missing value: two tuned numbers exist only in prose, not in
  `GameConfig`.** Both are specified, so I did not have to invent either, but neither can
  be re-emitted, and the `config` interface note in my own brief says "no module may
  hand-write a tuned value, hold a copy of one, or reach a number by any path but this
  table". This module breaks that rule twice because it has no choice:
  - **The 40-stud gutter between plots.** Stated once, in the `plots.claimSlot` interface
    note. There is no `GameConfig` key for it. It is now `PLOT_GUTTER_STUDS = 40` in
    `Plots.luau`. Changing plot spacing is a code edit.
  - **The slab's 1-stud thickness.** Stated as the middle term of
    `Vector3.new(area.size, 1, area.size)` in `06-representation.md`. It is now
    `SLAB_THICKNESS_STUDS = 1`. Three things derive from it: the slab's centre sits half of
    it below Y = 0 so the top face is the walkable plane, the spawn Attachment sits half of
    it above the slab centre (which is exactly the `Vector3.new(0, 0.5, 0)` the same sheet
    states independently), and it is therefore also the number that keeps those two facts
    consistent with each other. Two independent statements of the same number in one sheet
    is a small invitation to divergence.

## Decided without a stated value

**Geometry and placement**

- The plot slab's **centre** is at `slotOrigin - (0, SLAB_THICKNESS/2, 0)`. The sheet gives
  "the slot origin, with the top face at Y = 0"; I read the slot origin's Y as 0 (the
  `claimSlot` formula writes it as 0) and derived the centre. The alternative reading —
  centre at the slot origin, top face at +0.5 — was excluded because the spawn Attachment's
  stated local Y of 0.5 would then land at Y = 1, one stud above the walkable plane.
- A patch's world position is `(originX + local.X, tier.height / 2, originZ + local.Z)`.
  I **discard layout's Y entirely** rather than adding it; layout writes 0 there today and
  its own comment says plots owns the vertical offset, but if a future layout put meaning
  in Y this module would silently throw it away.
- **The record's `position` stores that same world position, including the
  `tier.height / 2` Y** — for cleared records too, which have no Instance. `03-state-shape`
  says only "world-space positions". The other defensible reading is Y = 0, the ground
  point. `clearing` measures XZ distance, so neither reading changes behaviour today; a
  future feature that reads `patch.position.Y` will find the Part's centre, not the ground.
- Slot 1's slab is centred on the world origin with its top face at Y = 0. I could not
  check whether that is coplanar with the lobby Baseplate the representation sheet mentions
  (`game/default.project.json` is not present in this working root), so a z-fighting or
  double-floor problem at slots 1 and 2 is possible and unresolved.
- Nothing is rotated. Every Instance this module creates has identity rotation.

**The latch and the cleared set**

- The latch is hoisted into `local areaComplete = state.areaComplete == true` **before** the
  loop, and each iteration tests `areaComplete or state.cleared[index] == true`. Lua's `or`
  short-circuits, so while the latch is set `state.cleared` is never indexed even once. I
  chose this over an early return with a separate all-cleared loop (two loops to keep in
  step) and over a per-iteration `if state.areaComplete then`.
- Explicit `== true` on both, rather than truthiness. A stray non-boolean in either field
  now reads as "not complete" / "not cleared" instead of as true.
- When `areaComplete` is true I set `patch.cleared = true` on all 140 records rather than
  leaving layout's `false` and letting `instance == nil` carry the meaning. The brief says
  the records "come back cleared true".
- No check that `#Layout.build() == GameConfig.Area.patchCount`, and no guard for a
  `patch.tierIndex` outside `GameConfig.Tiers`; an out-of-range index would throw inside
  `spawn`, i.e. inside a join. I trusted layout's stated contract rather than adding a
  failure mode nobody specified a response to.

**Slots**

- `claimSlot` **allocates**: it marks the slot taken and returns it. The interface says only
  "the lowest free 1-based slot index", but `releaseSlot`'s existence makes a pure query
  meaningless, and the acceptance criterion "two players never occupy the same plot
  position" requires it. Any caller other than `spawn` therefore consumes a slot.
- Free-pool representation: one `takenSlots: {[number]: boolean}` table, scanned linearly
  from 1. Release is `takenSlots[n] = nil` (delete, not `= false`). O(taken) per claim,
  which is nothing at any plausible player count and keeps "lowest free first" obviously
  true rather than requiring a sorted free list.
- No upper bound and no error when slot indices grow; the brief says unbounded.
- `releaseSlot` validates nothing: not that `n` is an integer, not that it is ≥ 1, not that
  it was ever claimed. Releasing an untaken index is inherently a no-op with this
  representation, which is what the interface asks for.

**Lifecycle**

- **Calling `spawn` twice for one player without a despawn** is called "a bug, not a second
  plot" and given no behaviour. I made "not a second plot" literally true: `warn` naming the
  player, then tear the existing plot down (destroy the slab, release its slot) and build
  the new one. Rejected: returning the existing spawn CFrame silently (the caller's `state`
  would keep stale records), and building a second slab (orphans an Instance and leaks a
  slot forever).
- `despawn` on a state with no registered plot is a silent no-op, extending `releaseSlot`'s
  stated tolerance. It still sets `state.patches = {}` first, unconditionally.
- `despawn` clears `state.patches` to **a fresh empty table**, not to `nil`; the field is
  typed non-optional and `#state.patches == 0` is the natural test.
- `despawn` does not nil out each record's `instance` field before discarding the array.
- `despawn` reads `state.player.UserId` with **no nil guard**. The type says `Player` and
  `03-state-shape` says the field is set at join and never reassigned, so a state that never
  finished joining would throw here rather than warn. The wiring says server-main only calls
  despawn for a state it just lifted out of the collection.
- Teardown order inside `despawn`: deregister, then `Destroy`, then `releaseSlot`, so a
  re-entrant call cannot find a dead Instance and the slot is only freed after the Instance
  is gone.
- Order inside `spawn`: duplicate check, claim slot, build slab, build Attachment, **write
  the registry**, resolve the material once, `Layout.build()`, patch loop, write
  `state.patches`, return. The registry is written before the 140 parts so that an error
  mid-loop still leaves a plot `despawn` can recover.
- The returned CFrame is the Attachment's `WorldCFrame` read once at spawn time. Nothing
  moves the slab, so re-reading it later would give the same answer; server-main is told to
  keep the value.
- The module holds no connections, spawns no threads and never yields, so `despawn` has
  nothing to disconnect.

**Instances**

- Names have no separator: `"Plot" .. slot` → `Plot1`, `"Patch" .. index` → `Patch1`. The
  sheets say "plus the slot index" / "plus the 1-based layout index".
- `Parent` is assigned **last** on both the slab and each patch.
- Patches are parented directly to the slab. No intermediate Folder, no `CollectionService`
  tag, no Attributes, no `ObjectValue` — the Name is the only trace back to the
  `state.cleared` key, as the sheet says.
- Unspecified properties are left at engine defaults: the slab's `Color`, `Transparency`,
  `CastShadow`, surface types and `Locked`; a patch's `Transparency`, `Reflectance`,
  `Locked`, `Massless`, `CollisionGroup` and surface types.
- `Color3.fromRGB(tier.rgb[1], tier.rgb[2], tier.rgb[3])` rather than `unpack(tier.rgb)` as
  the sheet writes it; the indexed form typechecks in strict mode and the unpacked one does
  not.
- `Enum.Material[GameConfig.Patch.material]` is resolved **by name at call time**, once per
  `spawn` and shared by all 140 patches, not at require time (modules here do no work when
  they load) and not from a hard-coded `Enum.Material.Grass` (re-emitting the config has to
  change the material without a code edit). Same dynamic-by-name treatment for
  `Enum.PartType[tier.shape]`.
- **Fallbacks nobody specified.** A `Patch.material` that is not an `Enum.Material` warns
  and uses `Enum.Material.Plastic` (the engine default, not a design value). A `tier.shape`
  that is neither a `PartType` member nor `"Wedge"` warns and produces a `Part` at the
  engine's default Block shape — the exact silhouette collapse the sheet warns about, but
  loudly. The alternative was throwing inside a join.
- `"Wedge"` is matched by string equality against a named constant `WEDGE_SHAPE_NAME`.
  I rejected the more general rule "no `Enum.PartType` member → make a `WedgePart`", which
  would turn a typo in a re-emitted config into a silent wedge.
- `CanCollide` on a patch comes from `GameConfig.Patch.collides`, not from a literal
  `false`. `CanCollide = true` on the slab and `CastShadow = false` on a patch are literals,
  because the representation sheet states them as fixed and the config has no key for
  either.
- `Enum.Material.Slate` for the slab is a literal for the same reason.

**Code shape and naming**

- Local names: `takenSlots`, `plotsByUserId`, `slotOrigin`, `teardown`, `patchMaterial`,
  `createPatchPart`, `buildPatch`, `slab`, `spawnPoint`, `origin`, `stride`,
  `localPosition`. `slab` rather than `plot` inside `spawn`, because "plot" is the concept
  and the Part is only its floor.
- Only the four contract functions are on the returned table; the six helpers are file
  locals. `slotOrigin` in particular is not exposed, though a test of slot geometry would
  want it.
- The registry value is `{ slot: number, plot: BasePart }` — one table per player rather
  than two parallel maps.
- **`export type PlayerState`** is declared in this file, restating all eight fields of
  `03-state-shape.md`. No module in the build order owns a shared state type; `layout` hit
  the same wall with `Patch` and exported one, which this file imports rather than restates.
  If `persistence` also declares a `PlayerState`, there are now two, and they agree only by
  luck. `patches` is typed non-optional even though `defaultState()` does not construct it,
  so between `load` and `spawn` the field genuinely does not exist.
- `type TierDef = typeof(GameConfig.Tiers[1])` instead of hand-writing the tier record's
  type, so re-emitting a tier field cannot leave a stale type behind.
- Warning strings, their `[Plots]` prefix and their wording are mine. Backtick string
  interpolation rather than `string.format`.
- `local Workspace = game:GetService("Workspace")` at module scope, next to the blessed
  `WaitForChild` of the shared root. `game:GetService("Workspace")` rather than the
  `workspace` global.
- The patch loop is `for index, patch in ipairs(patches)`, and it **mutates the records
  `Layout.build()` returned in place** (writing `position`, `cleared`, `instance`) instead
  of copying them into new tables. Safe only because `build()` allocates a fresh array per
  call.
- The `player` argument is used for `UserId` and, in the duplicate-spawn warning, `Name`.
  Nothing else. The slot registry could equally have been keyed by the Player Instance; the
  brief says UserId.

## Assumed about a dependency

- **`layout`**
  - `Layout.build()` returns **fresh tables on every call**, so mutating its records in
    place cannot corrupt another player's plot. This is true of the source I read, but it is
    not in the declared signature, and a future memoised `build()` would make two players'
    plots share records.
  - It exports the `Patch` type and that type is the `Patch` of `03-state-shape.md`. I
    import it rather than restate it.
  - It does not yield, so `spawn` does not yield. The wiring's join ordering depends on that.
  - It returns exactly `GameConfig.Area.patchCount` records, in the canonical order
    `state.cleared` is keyed by, with every `tierIndex` a valid index into
    `GameConfig.Tiers`. I check none of these.
  - Its positions are plot-local and its Y carries no information.
  - Its `LAYOUT_SEED = 1` is flagged **by its own comment** as a placeholder that its builder
    reported as a stop. My module aligns Instances to layout indices, and `state.cleared` is
    keyed by those indices, so if that seed is ever given a real value every persisted
    `cleared` set silently starts pointing at different patches in different places. That is
    a live migration hazard in a dependency, reported not fixed.
- **`config`**
  - `GameConfig.Patch.collides` is a boolean and is the value `CanCollide` should take.
  - `GameConfig.Patch.material` names a real `Enum.Material` member, and every
    `tier.shape` names a real `Enum.PartType` member except `"Wedge"`. Defended with warns,
    not assumed blindly.
  - `GameConfig.Area.originXZ` is `{x, z}` in that order and is the plot **centre**.
  - `GameConfig` constructs no Roblox types, so every `Vector3`, `Color3` and `Enum` in the
    plot is constructed here.
  - `GameConfig.Tiers` is a non-empty array, since `typeof(GameConfig.Tiers[1])` is the
    source of the tier type.
- **`persistence` (not my dependency, but its output arrives in `spawn`)**
  - `state.cleared` is always a table, never nil, for a state whose `areaComplete` is false.
    A nil there throws in the patch loop.
  - `state.areaComplete` is a real boolean rather than a truthy value.
- **`server-main` (my caller)**
  - `state.player` is set before `despawn` is ever called.
  - Each `spawn` is paired with exactly one `despawn`, and `despawn` is not called for a
    player who never finished joining.
  - It keeps the returned CFrame itself; this module does not hold or re-serve it.
- **The tree**
  - The shared root Instance is named `UIForge` and both `GameConfig` and `Layout` are its
    direct children, so `Shared.Layout` resolves without a second `WaitForChild`.
  - `Workspace` is the right parent for a plot slab (the representation sheet says so) and
    nothing else in the game reparents or destroys it. `clearing` destroys individual patch
    Instances; this module's registry holds only the slab, so it never notices.
