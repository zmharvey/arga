# Build report — server-main

## Stops

**1. Nothing in the contract respawns a dead player, and `CharacterAutoLoads = false` means
the engine will not either.** Boot step 1 turns automatic character loading off. That flag
does not only suppress the join-time spawn, it suppresses every respawn: once it is false, a
character appears only where something calls `LoadCharacter`. The wiring calls it exactly
once, in `onJoin` step 7. There is no `onDeath` phase, no `Humanoid.Died` edge and no
`Players.RespawnTime` anywhere in the brief, yet `onSpawn` is written as if respawns happen
("every CharacterAdded", "the HUD is not rebuilt on a respawn", "the respawn gap after a
death" in clearing's own comments). Death is reachable: `06-representation.md` says the
Baseplate is 400 studs square and "stops short of slot 3", so the third player onward can
walk off their plot edge into the void, fall past `FallenPartsDestroyHeight`, die, and stay
dead for the rest of the session. I did not implement a respawn, because doing so needs two
things nobody specified: the decision that death should respawn at all, and the delay before
it does. What I would have had to invent is a `Humanoid.Died` handler plus a wait, either a
literal number of seconds or a decision to read `Players.RespawnTime` (engine default 5)
which no sheet owns. **As shipped, a player who dies is stuck.** The cheapest fixes are one
of: give the plot slab or the world a floor/killbrick-free guarantee so death is
unreachable; add an `onDeath` phase to `07-wiring.md`; or state that `CharacterAutoLoads`
goes back to true after the first load.

**2. No module owns the `PlayerState` type, and the three that declare one disagree.**
`Persistence.PlayerState` types `player` as `Player?` (it constructs the state before
server-main sets that field); `Plots.PlayerState` and `Clearing.PlayerState` type it as
`Player`. Under `--!strict` a table property is invariant, so those types are not
interchangeable and the entry point cannot pass `Persistence.load`'s return value to
`Plots.spawn`, nor a live state back to `Persistence.save`, without a cast. I would have had
to invent a canonical type; instead I aliased clearing's as the live one and wrote two named
identity casts (`asLive`, `asLoaded`) so that every place the disagreement costs something is
greppable. `03-state-shape.md` describes the shape but the build order names no owner for
the Luau type, and `plots`, `clearing` and `persistence` each say in a comment that they are
restating it because no shared type exists. One exported type (or a `Types` module) removes
four declarations and every cast in this file.

**3. `RequestState` has no specified answer for a caller with no state entry.** The contract
says the handler returns "one snapshot for the calling player". A client can invoke it while
that player's `persistence.load` is still yielding, which is the exact window `client-main`
exists to cover. Nothing says whether to return nil, to return a default-shaped snapshot, or
to wait. I return nil and rely on the join-time push (`onJoin` step 5) arriving a moment
later. If `client-main`'s updater indexes the payload without a nil check, that is a crash
this decision causes and neither brief would have caught it.

**4. The player lifecycle connections have no place in the boot order.** `wiring.boot` has
six numbered steps and none of them is "connect `Players.PlayerAdded`" or
"`Players.PlayerRemoving`". The `onJoin` phase never names its trigger at all (only
`wiring.constructs` calls it "the PlayerAdded handler"); `onLeave` names `PlayerRemoving` in
its own step 1. So the one ordering question the boot list exists to answer, namely whether a
player can join before the remotes and the tick are up, is the one it does not answer. I
connected both after step 6, and backfilled `Players:GetPlayers()` for a player who was
already present when the Script first ran. Neither the connections' position nor the backfill
is specified.

**5. The shutdown wait has no budget.** `onShutdown` says "wait for all of them" with no
timeout. Roblox's own `BindToClose` limit (30 seconds) is the only bound, so a hung
`SetAsync` holds the close open until the engine cuts it. I did not invent a timeout.

**6. Values stated in prose that `GameConfig` does not carry** (not stops, since I did not
have to invent them, but the same defect class the sibling modules reported):
- The 3-stud spawn lift. `wiring.onSpawn` step 3 says "raised 3 studs on Y" and no config key
  exists, so it lives here as `SPAWN_LIFT_STUDS` and cannot be re-emitted. Re-emitting the
  config cannot change where a character arrives.
- `GameConfig.ClearTickRate`, `SaveIntervalSeconds` and `DataStoreName` are all emitted and
  read from config. Only the lift is orphaned in this file.

**7. The generic instruction "returning a table" contradicts this module's own contract.**
The pack's *What to write* says the module is "Luau, `--!strict`, returning a table"; the
module's *Must expose* says "nothing. This is an entry point", and *Must not* says a require
would run the boot sequence twice. A Roblox `Script` cannot be required at all, so a returned
table would be dead weight that implies otherwise. I return nothing.

## Decided without a stated value

**Shape of the file**

1. No `return` statement at the end, per stop 7.
2. Requires sit at the top of the file, above boot step 1 (`CharacterAutoLoads = false`),
   matching every sibling module. This is technically a deviation from "order 1": the shared
   root `WaitForChild("UIForge")` runs before the flag is cleared, and if that ever yielded, a
   player joining in the gap would auto-load a character. It does not yield in practice
   because `UIForge` is Rojo-managed and present at server start. Moving the flag above the
   requires is equally defensible and I did not do it.
3. The live collection table is constructed where it is declared, at the top of the file,
   rather than literally at boot step 3. Nothing can observe the difference; boot step 3 is a
   comment pointing at the declaration.
4. Handler names mirror the wiring phase names exactly (`onJoin`, `onSpawn`, `onPurchase`,
   `onLeave`, `onShutdown`), plus `onRequestState`, `saveEveryone`, `liveStates`,
   `pushSnapshot`, `snapshotOf`, `humanoidOf`, `applyWalkSpeed`, `describe`, `asLive`,
   `asLoaded`. None of these names is specified.
5. `LOG_PREFIX = "[Server]"`. The module is called `server-main`; siblings use `[Persistence]`,
   `[Plots]`, `[Clearing]`. `[ServerMain]` or `[Server-Main]` would have been just as correct.
6. `describe(player)` formats as `Name (UserId)`, copied from `Persistence.luau` so log lines
   from the two modules line up. Not specified anywhere.
7. Every warning string is mine. No message text is specified for anything in this file.
8. Nothing in this file ever calls `error`. Boot is not wrapped in a pcall either: if a
   dependency throws at require time the server should fail loudly and immediately.

**Names, constants and types**

9. The three channel names are written as string literals in named constants
   (`STATE_CHANGED`, `BUY_UPGRADE`, `REQUEST_STATE`). `Protocol` exposes `REMOTES` keyed by
   name but no symbolic constant per channel, so there is no way to reach a channel without
   typing its name once. Clearing made the same call for its three.
10. `HUMANOID_NAME` / `ROOT_PART_NAME` as named constants rather than inline strings.
11. `states` is typed as `Clearing.States`. Choosing persistence's or plots' spelling instead
    would move the casts around but not remove them.
12. `spawnCFrames`, `characterConnections` and `joining` are three separate tables keyed by
    UserId rather than fields on `PlayerState`. The state shape is closed and plots is told
    explicitly that "PlayerState carries no slot field and must not gain one"; I read that as
    applying to my bookkeeping too.
13. Those tables' value types are declared optional (`CFrame?`, `RBXScriptConnection?`) purely
    so that a lookup miss is a nil the type checker can see. `Clearing.States` is not
    optional-valued, so `states[userId] == nil` is a check the types say cannot fail; the
    checker permits it, but a stricter one would flag every lookup miss in this file.

**Snapshots**

14. `snapshotOf` is a seven-line loop over `Protocol.snapshotShape()`, character for
    character the same loop `Clearing.luau` had to write. Protocol owns the field list but
    exposes no `snapshot(state)` builder, so the one thing both sides were told not to
    duplicate (field-name literals) is avoided at the cost of duplicating the builder. A
    `Protocol.snapshot(state)` would remove it.
15. The snapshot is a fresh table per push and shallow: `upgrades` and `found` cross the wire
    as the live tables. Same choice clearing made. Nothing specifies a copy.
16. A snapshot is built per push rather than cached and invalidated.

**onJoin**

17. A re-entrancy guard (`joining`) exists only so the boot backfill cannot double-load a
    player that `PlayerAdded` also delivers. It is lifecycle bookkeeping, not state.
18. Known weakness I accepted: if a player leaves during their load and rejoins the same
    server instantly, the abandoned thread clears `joining[userId]` on its way out, which is
    the new thread's guard. The consequence is at worst the double-join the guard was there
    to prevent, which `Plots.spawn` already warns about and repairs. Fixing it properly needs
    a per-attempt token.
19. If the player leaves while `persistence.load` yields, I bail with
    `player:IsDescendantOf(Players)` and never insert the state. Not specified. Without it,
    `PlayerRemoving` has already run and found no entry, so the state and its plot and its
    slot would leak for the life of the server.
20. `player:LoadCharacter()` is wrapped in a pcall, because it throws for a player who has
    left in the preceding lines.
21. `LoadCharacter` is kept rather than swapped for `LoadCharacterAsync`. The wiring names
    `player:LoadCharacter()` explicitly; the Roblox API dump marks it deprecated. This is the
    one thing the analyzer still reports (see below).
22. The `CharacterAdded` connection is stored and disconnected in `onLeave`. The wiring's
    four `onLeave` steps do not mention it. It is not required for correctness (`onSpawn`
    returns on a missing state) but it drops a closure that holds the Player.
23. The join-time snapshot is pushed before the character is loaded, per the stated order,
    which means the first `StateChanged` a client sees can precede its own HUD. The brief
    says this is intended.

**onSpawn**

24. `WaitForChild` with no timeout for both the Humanoid and the HumanoidRootPart, matching
    the wiring's literal wording. If a character is destroyed mid-wait, that thread yields
    forever. A timeout would have meant inventing one.
25. After the waits I re-read the state and check `player.Character == character`, so a
    thread that was yielding across a death or a leave does not pivot or write to a stale
    character. Not specified.
26. The HumanoidRootPart is waited for and then not used; the pivot moves the whole model.
    The wiring asks for the wait, so it stays.
27. `character:PivotTo(spawnCFrame + Vector3.new(0, 3, 0))`. `+ Vector3` translates in world
    space; `* CFrame.new(0, 3, 0)` would translate in the attachment's local space. These
    agree only because the plot slab is unrotated. Nothing says which is meant.
28. The pivot uses the whole returned CFrame, so the character also inherits the attachment's
    orientation (identity today). Facing direction on spawn is unspecified.
29. If no spawn CFrame is held for the player (should be unreachable), I warn, skip the pivot,
    and still apply walk speed and push the snapshot, rather than returning. The alternative
    leaves the player at the world origin with a stale WalkSpeed.
30. A child named `Humanoid` that is not a `Humanoid` warns and returns.
31. Order within the function: state lookup, waits, re-check, pivot, walk speed, snapshot.
    The type guard on the Humanoid sits between the waits and the pivot, which the numbered
    steps do not mention.

**onPurchase**

32. The state lookup happens before the payload type check, in the order the wiring lists
    them. A message from a player with no state is dropped whatever its payload.
33. A non-string payload is dropped silently, with no warning. A warn here is a log an
    exploiter can flood.
34. Extra arguments are ignored rather than rejected: the handler binds two parameters and
    does not inspect `...`. "One upgrade id string and nothing else" could also mean rejecting
    a message that carries a second argument.
35. An unknown-but-string id is not distinguished from an unaffordable one: both come back
    from `tryBuy` as false and both send nothing.
36. If the player has no character up when the purchase succeeds, the WalkSpeed write is
    skipped silently and the next `onSpawn` applies the same number. Nothing specifies this
    case. The snapshot is still pushed.
37. No rate limit on `BuyUpgrade`. Nothing asks for one; `tryBuy` is cheap and a failed buy
    sends no traffic back.

**onLeave**

38. When there is no state entry I still clear `joining` and the character connection before
    returning. The wiring's step 1 says only "return".
39. `Persistence.save` is wrapped in a pcall on the leave path, as on the periodic and
    shutdown paths. By inspection it never throws, but a throw here would skip the plot
    teardown and leak a slot.
40. Nothing is cleared out of the state on leave (`state.player` stays set). `Plots.despawn`
    reads `state.player.UserId`, so it must; the state is dropped whole afterwards.
41. The spawn CFrame is dropped last, per the stated order, even though nothing reads it
    after the entry has left the collection.

**Saving**

42. The periodic loop waits before its first pass, so the first save is at t+45s, not t+0.
43. A pass collects the live states into an array before saving any of them. `save` yields,
    and adding a key to a Lua table part-way through a `pairs` traversal of it is undefined;
    joins and leaves do exactly that during the yield. A player who leaves mid-pass is
    therefore saved once more than necessary, which `save` documents as harmless.
44. The periodic pass saves serially, one player at a time. Shutdown saves in parallel and
    waits on a counter, because the close budget is shared and N serial round trips are not.
    Neither cadence is specified.
45. The shutdown wait is `while remaining > 0 do task.wait() end`, a frame-granularity spin
    on a counter decremented by each spawned saver.
46. Shutdown returns immediately when the collection is empty, before spawning anything.
47. `RunService:IsStudio()` is the Studio test, taken from the wiring's own wording. It is
    true in Studio's Run mode as well as Play, so a Studio Run never writes. `IsStudio() and
    not IsRunning()` would behave differently.
48. Players still inside `onJoin` at shutdown (loaded but not yet at the barrier) are not
    saved. They have no entry in the collection, and nothing has changed for them since the
    load.
49. The periodic save loop is never stopped, at shutdown or otherwise. It dies with the
    server, the way clearing's tick does.
50. `saveEveryone` reads `state.player` for the save rather than the collection key, so the
    key type never has to be converted back into a Player.
51. Save failures warn and are not counted, retried or escalated. The next pass "retries by
    existing", per the brief.

**Boot**

52. Order within boot step 6 is `BindToClose`, then `BuyUpgrade`, then `RequestState`, the
    order the sentence lists them in.
53. `Protocol.createRemotes()`'s return value (the Folder) is discarded. Nothing in this file
    needs it; `channel()` resolves the folder itself.
54. The backfill over `Players:GetPlayers()` uses `task.spawn` per player so one player's
    load cannot delay the next.
55. Nothing validates that `GameConfig.SaveIntervalSeconds` is positive. A zero or negative
    value would turn the save loop into a spin.

## Assumed about a dependency

**Protocol**

- `channel(name)` returns `any`, so `FireClient`, `OnServerEvent` and `OnServerInvoke` are
  entirely unchecked in this file. I am trusting `REMOTES` that `RequestState` is the
  RemoteFunction and that `StateChanged` and `BuyUpgrade` are RemoteEvents. A typo in one of
  my three name constants is a runtime error at the first use, which is what `channel`
  promises, but the class mismatch would only show up as "attempt to index nil".
- `createRemotes()` must run before any server-side `channel()` call. Boot step 2 is the
  call; the first `channel()` is in boot step 6 and every other one is inside a handler.
- `snapshotShape()` returns a shared frozen table in a stable order. I only read it, once per
  snapshot, and never hold it.
- Nothing in Protocol yields at require time.

**Persistence**

- `load` never throws and never returns nil, so it is not wrapped in a pcall. If it did
  throw, that player's `joining` flag would stay set forever and they would never get a plot
  even on a rejoin to the same server. That is the single most load-bearing assumption in
  this file.
- `load` yields, and the state it returns has `patches` empty and `player` unset, so writing
  `state.player` is a first write and not a reassignment.
- `save` yields, never throws, warns on its own failures, and is idempotent, so saving the
  same unchanged state on the periodic pass, on leave and again on shutdown is not an error.
- `save` reads the state synchronously into a detached payload before it yields, so handing
  it a state that clearing is still mutating is safe.
- `PlayerState.player` is assignable (`Player?`), and persistence never requires it to be
  set.
- `defaultState()` is never called from this file. Only `load` constructs a state here.

**Progression**

- `walkSpeed`, `tryBuy` and the rest accept a full live state where they declare a
  two-field one, by width subtyping. Verified with the type checker, not just by reading.
- None of them yields, so the WalkSpeed write happens in the same frame as the purchase.
- `tryBuy` mutates only `currency` and `upgrades`, and mutates nothing at all when it returns
  false, so a failed purchase genuinely needs no push.
- `walkSpeed` returns a number in a range a Humanoid accepts (16 to 25.6 across the ladder);
  nothing clamps it here.

**Plots**

- `spawn` returns the Attachment's `WorldCFrame` by value, so holding it after the plot is
  destroyed is safe and holding it across a respawn is correct.
- `spawn` registers the plot internally against `player.UserId`, and `despawn` recovers it
  from `state.player.UserId`. So `state.player` must still be set when `despawn` runs, and
  the state passed to `despawn` must be the same player's. Both hold here.
- `despawn` releases the slot and does not save, and is safe to call for a player whose plot
  was never built (it is a no-op on an unknown UserId).
- `spawn` does not yield, so the barrier and the plot both land in the same frame.

**Clearing**

- `start` holds the collection by reference and never copies or replaces it, so my mutations
  to `states` are the ones it ticks. This is why `states` is assigned into and never
  reassigned.
- `start` installs the loop and returns immediately, and pcalls each pass. **Acceptance
  criterion 4 of this module ("the clear tick survives an error in one iteration without
  stopping") is delivered entirely by clearing, not by anything in this file.**
- Clearing fires `StateChanged` on its own, so this file's three pushes are the second
  originator on that channel and duplicates are harmless.
- `Clearing.PlayerState` and `Plots.PlayerState` are structurally identical to
  `Persistence.PlayerState` apart from `player`'s optionality. I read all three to confirm it
  before writing the casts; if any of them gains a field, the casts start hiding a real
  mismatch instead of a cosmetic one.

**Tree**

- `script.Persistence` and its siblings resolve because `init.server.luau` IS
  `ServerScriptService.Game` and the other server modules are its children, per `04-tree.md`.
- `ReplicatedStorage.UIForge` is Rojo-managed and exists at server start, so the one
  `WaitForChild` at the top does not yield in practice.

## Analyzer

Checked with `luau-lsp analyze` against a Rojo sourcemap that places this file at
`ServerScriptService.Game` with the four server modules as its children, plus the Roblox API
definitions (`globalTypes.d.luau`). Bare `luau-analyze` cannot resolve `game`, `script` or
instance-style requires and reports 40+ errors for that reason alone, so it gives no usable
answer on this tree.

Clean except for one lint, which I left in deliberately:

```
init.server.luau(286,3): DeprecatedApi: Member 'LoadCharacter' is deprecated,
use 'Player:LoadCharacterAsync' instead
```

`wiring.onJoin` step 7 names `player:LoadCharacter()` as the call. Swapping in
`LoadCharacterAsync` would silence the lint and behave the same, but the contract names a
specific API and the deprecation is the kind of thing the spec should hear about rather than
have quietly corrected. Fixing it is a one-word edit to the sheet and to this line.

Two type errors were found and fixed during the pass: `CFrame` and `RBXScriptConnection`
cannot be compared with `~= nil` when the table they came from declares a non-optional value
type, so both bookkeeping tables now declare optional values.

## Acceptance criteria

1. **WalkSpeed after spawn and after any successful purchase** — `applyWalkSpeed` is called
   from `onSpawn` step 4 and `onPurchase` step 3, unconditionally in both, and from nowhere
   else. Caveat on the purchase path: if no character is up there is no Humanoid to write to,
   and the next spawn applies it.
2. **Every remote through `Protocol.channel`, and remotes exist before any player can join** —
   three `Protocol.channel` calls, no `Instance.new` for a remote, no `FindFirstChild` and no
   `WaitForChild` on a remote. `createRemotes()` is boot step 2; `PlayerAdded` is connected
   after boot step 6.
3. **State saved before the plot is destroyed on leave** — `onLeave` removes the entry, then
   saves and waits, then calls `Plots.despawn`.
4. **The clear tick survives an error in one iteration** — provided by `Clearing.start`, not
   by this file.
5. **Shutdown saves every connected player outside Studio** — `BindToClose(onShutdown)`,
   which returns immediately under `RunService:IsStudio()` and otherwise saves every state in
   the collection in parallel and waits for all of them.

Untestable here: nothing in this environment runs a Roblox DataModel, so none of the five was
executed. They are read off the code, not observed.
