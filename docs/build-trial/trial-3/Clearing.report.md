# Build report — clearing

## Stops

1. **How `clearing` reaches the two RemoteEvents it is required to fire.** `tick` must "fire
   FindRevealed" and "fire AreaRestored", but `clearing`'s declared dependencies are `config`,
   `progression`, `plots` — `protocol` is not among them; `start(states)` and `tick(states)` are
   handed nothing but the collection; and no interface in my pack hands `clearing` a remote
   Instance, a remotes table or a resolver. To fire anything I had to invent one of three
   interfaces the design does not contain: a `protocol` accessor (`protocol.REMOTES` is declared
   to return *names, not Instances*), a second parameter on `start`/`tick`, or a hard-coded path
   to the Folder. **This is a contract defect of the same shape as the trial-1 `walkSpeed` defect:
   a module owns an output it has no wire to.** What I did instead of inventing an interface:
   resolve each RemoteEvent lazily by name with `ReplicatedStorage:FindFirstChild(name, true)`,
   cache it, and on a miss warn once and drop the notification while still writing the durable
   state. The recommended fix belongs upstream, not here: either add `protocol` to `clearing`'s
   dependencies with a `remotes` resolver, or change the signature to `start(states, remotes)`.

2. **The name of the Folder that holds the remotes.** The wiring says server-main creates them
   "under a single Folder in ReplicatedStorage" and that client-main "wait[s] for the remotes
   Folder by name from protocol.REMOTES", but the name itself appears nowhere in my pack. I would
   have had to invent `"Remotes"` and a literal path `ReplicatedStorage.Remotes.FindRevealed`.
   The recursive by-name lookup exists purely to avoid inventing that string.

3. **The payload of `AreaRestored`.** My pack never states what either notification carries.
   `representation.relic` settles FindRevealed ("one FindRevealed remote carrying a name"), so I
   fire `FireClient(player, relic)`. For AreaRestored my pack is silent, and the choice between
   no argument, the area id, the area label and a snapshot is not a small one — a client reading
   `arg1` would print `nil` or `"east-terrace"` instead of "East Terrace". **Disclosure:** rather
   than invent it, I checked `docs/BUILD-ORDER.md` (the artifact my pack is generated from, and
   not a forbidden file), whose §5 `protocol.REMOTES` note reads "AreaRestored (RemoteEvent,
   server -> client, **the area label**)". So the value exists in the design and the *pack
   generator dropped it*: `protocol`'s interface entry is copied into the packs of six other
   modules but not into `clearing`'s, which is the one module that fires two of the five remotes.
   I fire `FireClient(player, GameConfig.Area.label)`. A builder with only the pack would have
   guessed.

4. **`area` is missing from `clearing`'s *Values* block.** Criterion 4 ("completing the last patch
   sets the area-complete flag") and the interface note both key on `area.patchCount`, and the
   AreaRestored payload is `area.label`, but the only sheets quoted to me are `runtime`, `tiers`
   and `movement`. I took both values from `GameConfig.Area` (`patchCount = 140`,
   `label = "East Terrace"`) rather than inventing them, which is legal because config is a
   declared dependency I am allowed to read — but the pack's own promise that "everything a
   module needs is under *Values*" is not kept here. `tiers` and `movement` are quoted and are
   the two blocks I need *least*: I read tier values through `GameConfig.Tiers`, and I never touch
   `movement` at all (the radius arrives via `progression.clearRadius`).

5. **How the HUD ever learns about currency earned by clearing.** `StateChanged` is pushed on
   join, on respawn and on a successful purchase. `onTick` pushes nothing, and `clearing` has no
   snapshot builder (`protocol.snapshotShape` is not a declared dependency of mine either). As
   specified, a player who clears 140 patches sees the shard counter move only when they buy
   something or respawn, which makes criterion 3 ("payout equals tier value times the multiplier")
   unobservable in play. I implemented it exactly as written — **no push** — because the
   alternatives (a push per patch, a push per tick, a dirty flag server-main polls) are all
   invented behaviour with very different bandwidth costs. Someone needs to decide which.

6. **What a rejoin into a completed area does.** The latch collapses `state.cleared` to empty and
   `clearedCount` survives at 140. On the next join, `plots.spawn` builds "one Instance per patch
   that `state.cleared` does not mark" — and nothing marks any patch any more — so all 140 patches
   come back, `tick` clears them again and pays for them again, and `clearedCount` runs to 280.
   That is an unbounded currency farm reachable by rejoining. Three values I could not find: whether
   a completed area's patches respawn, whether `clearing` keeps paying past `patchCount`, and
   whether `clearedCount` is allowed to exceed `area.patchCount`. I did not add a guard (skipping
   states with `areaComplete` true would silently redefine the clear loop, and what to build after
   completion is `plots`'s call, not mine). With `AreasPerDepth = 1` and one area in the config
   there is no next-area rule to fall back on.

7. **`plots` is listed as a dependency that `clearing` cannot use.** All four of its functions
   (`claimSlot`, `releaseSlot`, `spawn`, `despawn`) are documented as called by `plots` itself or
   by server-main, and nothing in `tick`/`start` needs any of them. I did not require it. Not a
   missing value — a dependency edge in the build order that should not be there, and it is
   suspicious next to the missing `protocol` edge, as though the two were swapped.

## Decided without a stated value

**Shape and naming**

1. Module table named `Clearing`, assigned to a `local` and returned at the end, mirroring
   `GameConfig.luau`.
2. `tick` and `start` are dot functions (`function Clearing.tick(...)`), not methods; no `self`.
3. Both annotated `: ()` (the interface says "returns nil"); neither returns a value.
4. Local type aliases `Patch`, `PlayerState`, `States` declared in this file, because the build
   order has no shared `Types` module. Every other server module will restate the same three
   types and **nothing checks that the copies agree**. Confirmed in practice: the `Progression.luau`
   that landed during this build declares a two-field `PlayerState` against this module's eight.
5. `PlayerState.patches` is typed optional (`{ Patch }?`) even though `03-state-shape` declares it
   non-optional, because the barrier (onJoin 3) precedes `plots.spawn` (onJoin 4).
6. `tierIndex`, `clearedCount` and the `States` key are typed `number`; Luau has no integer type,
   so "integer" in the state shape is unenforced here.
7. Constants `FIND_REVEALED`, `AREA_RESTORED`, `ROOT_PART_NAME`, `TICK_RATE`, `TIERS`,
   `PATCH_COUNT`, `AREA_LABEL` — names, casing and the decision to hoist them at all.
8. Config values are snapshotted into module locals at require time. A re-emitted config needs a
   server restart to take effect, which it needs anyway.
9. Mapping from the brief's sheet names to the generated config's field names:
   `runtime.clearTickRate` → `GameConfig.ClearTickRate`, `area.patchCount` → `GameConfig.Area.patchCount`,
   `tiers[i].value` → `GameConfig.Tiers[i].value`.
10. `local ReplicatedStorage = game:GetService(...)` and `WaitForChild("UIForge")` at the top
    level, per the tree's `requireExample`, even though the tree's first rule says a module
    "performs no work at require time" and a top-level `WaitForChild` is a yield point. On the
    server the folder exists at boot, so it returns immediately. The rule and the example
    disagree; I followed the example.
11. `Shared` as the local name for the shared root, from the tree's own example.
12. Header comment block, tab indentation, double quotes and the "why" voice copied from
    `GameConfig.luau`.

**The clear loop**

13. Guard clauses with `continue` rather than nested `if`s, for flatness. No `goto`-style
    restructuring, no early `return` (that would abandon the other players).
14. The collection is iterated with `pairs` (undefined order, as the contract permits) and
    `state.patches` with `ipairs`.
15. **The layout index is the `ipairs` index of `state.patches`.** Nothing states that the array
    index and the `state.cleared` key are the same number; it is only implied by `plots`'s note
    about keeping indices aligned. If `plots` ever returns a sparse or reordered array, this
    module writes the wrong keys silently.
16. Distance is measured from `patch.position` (the record), not `patch.instance.Position`. The
    record is authoritative and exists even when the Instance does not.
17. **The boundary is inclusive** — a patch exactly `radius` studs away clears.
18. Compared as squared distances (`dx*dx + dz*dz <= radius*radius`) instead of taking a square
    root. Identical semantics; no epsilon or tolerance is introduced anywhere.
19. **Centre-to-centre reach.** `patch.footprint` (3 studs) is neither added to nor subtracted
    from the radius, and the character's own width is ignored. A 3-stud-wide patch whose centre is
    5.6 studs away does not clear at radius 5.5 even though its edge is 4.1 studs away.
20. `Y` is discarded entirely, per "XZ only, so height never affects reach": a player on top of a
    120-stud tower clears patches below them.
21. `progression.valueMultiplier` is read **once per state per pass**, like the radius. The
    contract only says "once" about the radius. Nothing in the pass yields, so this cannot differ
    observably today; it would if `progression` ever yielded.
22. `progression.award` is called **once per patch**, not once per pass with a summed total. The
    interface lists it per patch, and a summed call would interact differently with `award`'s
    reject-non-positive rule.
23. `award`'s return value (the new balance) is discarded.
24. Payout is `math.max(1, math.floor(tier.value * multiplier))`, in that nesting: floor first,
    then clamp. (With the shipped additive multipliers the two orders agree; they would not for a
    multiplier below 1.)
25. Order of operations inside one patch is exactly the order the interface lists (flag, destroy,
    `cleared` map, count, award, reveal). Nothing observable depends on it inside a non-yielding
    pass; I kept it literally anyway.
26. `patch.instance = nil` after `:Destroy()`, per the interface. If `instance` is already nil the
    destroy step is skipped and everything else still runs.
27. Patches are processed in layout order, not nearest-first. Payout order within one pass is
    therefore arbitrary with respect to distance.
28. No cap on how many patches one pass may clear, and no rate limit. A wide sweep can clear and
    pay for a dozen patches in one 0.12 s pass.
29. No per-state memory between passes (no cached radius, root part or last position), so a
    teleport is treated exactly like a walk and there is no swept-path check between two passes:
    **at 16 studs/s and 0.12 s a player moves ~1.9 studs per pass, so nothing is skipped today,
    but a large enough Pace level plus an external velocity source could tunnel past a patch.**
    Nothing in the brief says a clear must be swept rather than sampled.

**Completion latch**

30. `>=` rather than `==` in the completion test, so an overshoot (more patch records than
    `area.patchCount`, or the rejoin case in Stop 6) still latches. A deliberate deviation from
    "clearedCount equals area.patchCount": with `==`, a pass that jumps from 139 to 141 would
    never latch at all.
31. The conjunction is ordered `not state.areaComplete and clearedCount >= PATCH_COUNT` (cheap
    test first).
32. **The collapse of `state.cleared` to `{}` happens here, at the latch.** `onTick` never
    mentions it; only `stateShape`'s notes on `cleared` and `areaComplete` do, and they name
    `clearing` as the writer. `persistence.save` collapses again on write, so this is duplicated
    on purpose.
33. The collapse assigns a **fresh empty table** rather than emptying the existing one in place.
    Anything holding a reference to the old table (nothing does today) would keep stale data.
34. `clearedCount` is not reset by the collapse, and is never clamped to `patchCount`.
35. The latch is checked after the patch loop, inside the same per-state block — so a player
    whose character is missing does not get their latch evaluated that pass. It will be evaluated
    on the first pass after they respawn.
36. Both notifications go to the owning player with `FireClient`, not `FireAllClients`. One plot
    per player, so "the area is restored" is a per-player fact, and a shared broadcast would leak
    one player's progress to everyone.

**Remotes**

37. Resolution strategy: recursive `FindFirstChild(name, true)` under `ReplicatedStorage`, first
    match by name, validated with `IsA("RemoteEvent")`, then cached in a module table.
38. The cache is never invalidated. If the remotes Folder were ever destroyed and rebuilt, this
    module would hold a dead reference and fire into nothing, silently.
39. One warning per missing name (`warnedMissing`), but the scan is retried on every later
    attempt, so a late-created remote is still picked up rather than being given up on forever.
40. **A missing channel does not stop the state write.** `state.found[relic] = true` and
    `areaComplete = true` happen before the fire, so the durable record is never hostage to a
    missing remote — and, symmetrically, a dropped notification is never re-sent, because
    `found` already holds the relic and the latch already holds the area.
41. The two remote names are literal strings in this module rather than reads of
    `protocol.REMOTES`. This duplicates the names in two files, which is exactly what
    `protocol`'s second criterion forbids for snapshot field names.
42. No `StateChanged` push after clearing (spec-literal; see Stop 5).

**Failures, guards and messages**

43. A patch whose `tierIndex` resolves to no tier: **warn and leave the patch standing** — not
    cleared, not paid. The alternative (clear it and pay the minimum of 1) hides a `plots`/`layout`
    bug and spends a patch for free; leaving it standing means the area can never complete, which
    I judged the louder and more diagnosable failure. Nothing in the brief covers it.
44. That warning repeats every pass while a player stands next to such a patch. I chose log spam
    over per-patch warn-once bookkeeping, since the condition should be impossible.
45. `state.player == nil` is guarded even though the contract says `player` is set before the
    barrier.
46. `state.patches == nil` is guarded (belt-and-braces: the character check already covers it,
    because `LoadCharacter` is onJoin step 7).
47. **No** guard on `state.cleared`, `state.found`, `state.clearedCount` or `state.areaComplete`
    being nil. `persistence.defaultState` is declared to be the only constructor and to initialise
    all of them, so a nil there is a persistence bug and I let it raise inside the pcall rather
    than papering over it with a default I would have had to invent.
48. The root part is fetched with `FindFirstChild` and never `WaitForChild` — a tick may not yield.
49. The root part is checked with `IsA("BasePart")` before `.Position` is read; a non-part child of
    that name is skipped rather than erroring.
50. `pcall` granularity is **the whole pass**, per "wraps each tick in a pcall". So one bad state
    abandons the remaining states of that pass (they are retried 0.12 s later). Per-state pcalls
    would isolate better; that is a deviation, so I did not.
51. `pcall(Clearing.tick, states)` in function-plus-argument form rather than wrapping a closure:
    no allocation per pass, and it honours a later reassignment of `Clearing.tick`.
52. Warning prefix `[Clearing] `, lower-case sentences, no trailing punctuation; `warn` rather
    than `error` or `print`; no log levels and no analytics event.
53. Exact warning strings: `start called twice; the second call does nothing`,
    `tick failed: <err>`, `no RemoteEvent named "<name>" under ReplicatedStorage; not sending`,
    `patch <i> has no tier <n>; leaving it standing`.
54. Backtick string interpolation for those messages, rather than `..` or `string.format`.
55. `tostring(err)` around the pcall error, since an error object need not be a string.

**The loop**

56. Loop shape: `task.spawn` plus `while true do task.wait(TICK_RATE) ... end`. Not
    `RunService.Heartbeat` with an accumulator, not a drift-corrected schedule.
57. Consequence, unstated anywhere: `task.wait` is frame-quantised, so the real cadence is
    slightly over 0.12 s and drifts with frame rate. Missed passes are never caught up, and no
    delta time is passed to `tick`.
58. Wait-before-tick, so `start` performs no pass in the frame that calls it and truly "returns
    immediately". (`task.spawn` runs the thread up to its first yield synchronously, so
    tick-before-wait would have run a full pass inside `start`.)
59. The loop never terminates and there is no `stop()`; nothing in *Must expose* asks for one, so
    the cadence cannot be paused or shut down cleanly.
60. `start` called a second time warns and returns, keeping exactly one loop. The contract says
    "called once" but not what a second call does; two loops would double every payout.
61. That guard is a module-level `started` boolean, so it is per-server-instance, and `tick` itself
    stays callable directly (which is what makes the exposed `tick(states)` testable).
62. `tick` is exposed and used by `start` through the module table, so both share one code path.

## Assumed about a dependency

`Plots.luau` and `Protocol.luau` do not exist in this working root, so everything said about them
below is taken on faith from the signatures in the pack. `Progression.luau` appeared mid-build
(written by a sibling builder); I read only its function declarations, which the brief permits, and
all three I call match the pack exactly: `award(state, amount): number`, `clearRadius(state): number`,
`valueMultiplier(state): number`. One divergence worth recording: its `PlayerState` type declares
only `currency` and `upgrades` — the two fields it touches — so it is a *different* type from the
eight-field `PlayerState` this module declares. The call still typechecks (Luau allows a table with
extra properties where a narrower one is expected), but the two declarations are independent and
nothing reconciles them.

1. `Progression` will be a ModuleScript at `script.Parent.Progression`
   (`ServerScriptService.Game.Progression`), returning a table, doing no work and no yielding at
   require time.
2. `progression.clearRadius(state)`, `valueMultiplier(state)` and `award(state, amount)` have the
   declared signatures and **do not yield**. If any of them yielded, this module's core assumption
   — that a pass is atomic with respect to purchases and saves — would break, and the "read once"
   optimisation would become observable.
3. `award` mutates `state.currency` in place (I ignore its return value) and tolerates being
   called dozens of times in one pass.
4. `award` never throws for a positive integer amount. My payout is always `>= 1`, so its
   reject-non-positive rule is never exercised from here.
5. `clearRadius` returns a positive number of studs. A zero or negative return would clear
   nothing rather than error; nothing validates it.
6. `valueMultiplier` returns a number (1.0 at level 0) and never nil.
7. `progression` writes nothing to the engine, so this module does not need to apply the radius
   anywhere — it only reads it.
8. `plots.spawn` writes `state.patches` as a **dense, 1-based array in `layout.build()` order**,
   one record per layout index, with `cleared = true` and `instance = nil` for indices already in
   `state.cleared`, and with **world-space** positions (the slot origin already added). Items 15
   and 16 of the previous section rest entirely on this.
9. `plots` keeps no second reference to a patch Instance that a `:Destroy()` here would leave
   dangling, and nothing in `plots` watches for a patch disappearing or needs to be told.
10. `plots` tolerates `patch.instance` being nil for patches this module cleared during the
    session (it must, since `despawn` destroys the slab, not the individual parts).
11. `persistence.defaultState()` really does initialise `cleared`, `clearedCount`, `found` and
    `areaComplete` for every state, including on a DataStore failure, so this module never has to
    create any of them.
12. `persistence.save` writes `clearedCount` as it finds it and performs its own collapse of
    `cleared`; my collapse at the latch is therefore redundant rather than conflicting.
13. `server-main` sets `state.player` **before** inserting the entry (the barrier) and removes the
    entry **before** save and teardown, so `tick` can never see a half-loaded or torn-down state,
    and it never replaces the `states` table with a new one.
14. `server-main` creates RemoteEvents named exactly `FindRevealed` and `AreaRestored` somewhere
    under `ReplicatedStorage`, before `start` is called (boot order 2 before 4), and never renames,
    reparents or destroys them.
15. **No other Instance anywhere under `ReplicatedStorage` is named `FindRevealed` or
    `AreaRestored`** — my recursive lookup takes the first name match, and a `Screens` data module
    or a UI node with either name would shadow the real remote. This is the price of not being
    given the folder name.
16. The client treats `FindRevealed` as one string argument and `AreaRestored` as one string
    argument (the area label), and tolerates never receiving either — it holds no state that must
    be reconciled from them, since `found` and `areaComplete` also travel in the snapshot.
17. `GameConfig.Area.patchCount` (140) equals the number of records `layout.build()` returns. If
    layout returns fewer, the latch never fires; if more, `>=` catches it (item 30).
18. `GameConfig.Tiers` is indexed by the same integer `layout`/`plots` wrote into `patch.tierIndex`
    (i.e. the first return of `config.tierByWeight`).
19. A `Character` always has a direct child named `HumanoidRootPart` (true for R6 and R15), and it
    is a `BasePart`.
20. `GameConfig` constructs no Roblox types, so requiring it from the server is free and its
    `Area`/`Tiers` tables are plain data I can hold by reference.

## `luau-analyze`

- **Plain run** (`luau-analyze game/src/server/Clearing.luau`): 15 diagnostics, **all
  environmental** — `Unknown global 'game' / 'script' / 'warn' / 'task'`, `Unknown type 'Vector3' /
  'BasePart' / 'Player' / 'RemoteEvent'`, and `Unknown require: unsupported path` for
  `Shared.GameConfig` and `script.Parent.Progression`. This working root has no Roblox type
  definitions, no `.luaurc` and no Rojo sourcemap, so every module that touches the engine reports
  these. **Not one diagnostic refers to this module's own logic**, and none is fixable from inside
  the file.
- **Checked run:** because unknown globals degrade to `any` and therefore check nothing, I
  re-ran the same body in a scratch harness that supplies local stand-ins for the Roblox types and
  the two required modules. Result: **clean** — zero type errors and zero lints, the only output
  being a `CommentDirective` notice about the spliced `--!strict` line, which is an artifact of the
  harness and not of the module. The scratch files have been deleted; they were outside the
  deliverable tree.
- Caveat: the harness collapses `Instance`/`BasePart`/`RemoteEvent` into one structural type, so it
  does not exercise the `IsA` refinements on `root:IsA("BasePart")` and `found:IsA("RemoteEvent")`.
  Those rely on Luau's `IsA` magic function narrowing, which only exists with the real Roblox
  definitions loaded.
