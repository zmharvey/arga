# 07 — Wiring

**Stage:** architect · **Key:** wiring

## Decision

**`CharacterAutoLoads` is off, and `server-main` loads the character itself as the last step of
join.** Everything else follows from that.

Nine phases, ordered. The three that answer a defect:

- **`persistence.defaultState()` is the only thing that constructs a state**, and it is named
  in `constructs` alongside the fields it initialises. Trial 2 had no opening balance and no
  constructor; both builders stopped on it independently.
- **`server-main` writes `Humanoid.WalkSpeed = progression.walkSpeed(state)` in `onSpawn` and
  again after any successful purchase.** Trial 1 computed the number and never wrote it, so
  Pace was purchasable with no effect.
- **A state enters the live collection only after `persistence.load` has returned, and the
  character loads only after that.** So no tick and no spawn can see a half-loaded state.
- **`protocol` creates the remotes and resolves them; nothing else touches one by name.** Trial 3
  found `clearing` required by this sheet to fire two channels it had no path to.
- **A finished area spawns nothing and pays nothing, and the tick's first test is the latch.**
  Trial 3 found the collapse that empties `cleared` respawning all 140 patches on rejoin and
  paying for them again, without bound.

## Why

- **`Players.CharacterAutoLoads = false` removes a race rather than handling it.** With it on,
  `CharacterAdded` can fire before `persistence.load` returns — load yields on a DataStore —
  and then `onSpawn` has to apply a walk speed from a state that does not exist yet. Every fix
  that keeps auto-load is a wait or a retry inside the spawn handler. Turning it off and calling
  `player:LoadCharacter()` as the last step of join makes the ordering a property of the code
  rather than of the network. `[architect: decided]` This is the one structural call in this
  sheet.
- **The barrier is the insert into `states`, and it is a single line with a reason.** `clearing`
  ticks whatever is in the collection, every 0.12s, from before the first player joins. So the
  insert is what publishes a player to the rest of the server, and it goes *after* load and
  *before* anything that mutates the state. `onLeave` is the mirror: lift the state out and
  delete the entry first, so no tick can touch a state that is being saved and torn down.
- **Walk speed is written twice and the other two upgrades are written never.** `clearRadius`
  and `valueMultiplier` are read fresh inside the tick that uses them, so a purchase takes
  effect on the next tick with no write anywhere. `walkSpeed` lands on a `Humanoid` the engine
  owns, so it needs a writer, on every new character and after every purchase. The re-apply is
  **unconditional** on success rather than gated on `upgradeId == "speed"`: the gated version is
  one line shorter and one refactor away from being wrong again, and re-writing the same number
  costs nothing.
- **Save before teardown, not after.** `plots.despawn` clears `state.patches`; `persistence`
  does not save `patches`, so the order does not currently matter — and it will the first time
  someone persists something `despawn` touches. `server-main`'s own criterion states the order,
  so it is fixed here rather than left as an accident that happens to hold.
- **`onShutdown` skips Studio.** `BindToClose` runs on every Studio stop, and a Studio session
  writing to the live DataStore under `runtime.dataStoreName` corrupts real saves with test
  data. `server-main`'s fourth criterion says "outside Studio", so the `RunService:IsStudio()`
  guard is the criterion, not a nicety.
- **The client asks, it is not only told.** `client-main` may not assume the join-time push
  arrived, because the HUD is built after the client boots and the push may already have
  happened. So the same snapshot arrives two ways: pushed on `StateChanged`, and pulled once
  through `RequestState` after the updater is live. Both go through the same updater, so a
  duplicate is idempotent.
- **`protocol` creates the remotes; `server-main` only asks it to.** Boot step 2 used to read
  "create one Instance per name in `protocol.REMOTES`", which left the folder and the class of each
  channel inside this file while `protocol` held only the names. `clearing` fires two of those
  channels and did not depend on `protocol`, so trial 3's builder invented
  `ReplicatedStorage:FindFirstChild(name, true)` with a warning on a miss — a lookup the design
  does not contain, written into the module that owns two of the game's five outputs. That is the
  walk-speed defect again: an output computed with nothing connecting it to the player.
  `protocol.channel(name)` is now the only path from a name to an Instance, every module that
  originates traffic declares it in `fires`, and the architect gate checks each `fires` list
  against `protocol.declaresRemotes` and against the dependency graph.
- **The tick pushes a snapshot, because nothing else did.** `StateChanged` fired on join, on spawn
  and after a purchase. `currency`, `clearedCount` and `found` change inside the tick and nowhere
  else, so between purchases the balance readout and the progress bar were frozen — a value written
  to state with no path to the player, which is the same shape as the trial-1 defect pointed the
  other way. One `FireClient` per player per tick, only on a pass that changed something, is the
  whole fix. `StateChanged` carries a full snapshot rather than a delta precisely so that having two
  originators is safe: a duplicate is idempotent, which `client-main` already relies on.
- **The latch is read in three places and none of them is a courtesy.** A finished area's save
  carries `areaComplete` and an empty `cleared`, so before this `plots.spawn` — which builds one
  Instance per index `cleared` does not mark — respawned every patch on the next join, the tick
  cleared them again, `progression.award` paid again, and `clearedCount` ran past `area.patchCount`
  every rejoin without bound. `persistence.load` now refills the set from the flag, `plots.spawn`
  creates no Instance while the flag is true, and the flag is the tick's first test.
  `[brief: binding]` *"Cleared is permanent — overgrowth never returns."* `[cid: decided]`
  `theme/setting/04-permanence-and-passage.md` `W2` had already ruled the exact shape — entering a
  finished part *"spawns **0** patches"*, and re-entry is *"a read of that boolean plus a `layout`
  call that spawns zero patches"* — and its own check reads *"with the completion flag true,
  entering that part spawns 0 patches"*. The same sheet forbids *"any effect, sound, fade, camera
  move or transition"* marking entry into a finished part, so `AreaRestored` fires on the transition
  only and a rejoining finished player learns it from the snapshot's `areaComplete` and nothing
  else.
- **The reveal and the completion notice are two channels**, `[cid: decided]`
  `gameplay/core-loop/03-reveal-placement.md`, which rejects carrying completion on the reveal
  channel behind a `__area_complete:` string prefix. `onTick` fires `FindRevealed` up to
  `collection.relicsPerArea` times per area and `AreaRestored` exactly once, ever, per player
  per area.

```manifest
{
  "provides": "wiring",
  "value": {
    "boot": [
      { "order": 1, "module": "server-main", "does": "Set Players.CharacterAutoLoads = false. Removes the race between a character spawning and persistence.load returning." },
      { "order": 2, "module": "protocol", "fn": "createRemotes()", "calledBy": "server-main", "does": "Create the ReplicatedStorage.Remotes Folder and one Instance per channel in protocol.REMOTES: four RemoteEvents and one RemoteFunction, each class taken from that table. protocol does this, not server-main, so the folder name and the class per channel live in the module that owns the names — they used to live in this step, which is why the module firing two channels had nowhere to look and invented a recursive search. Done before any player can join, so a client that boots instantly finds them." },
      { "order": 3, "module": "server-main", "does": "Create the live collection: one empty table, keyed by UserId. This table is never replaced, only mutated, because clearing holds it by reference." },
      { "order": 4, "module": "clearing", "fn": "start(states)", "calledBy": "server-main", "does": "Hand clearing the collection and let it install its own 0.12s loop. Ticking an empty collection before the first join is normal." },
      { "order": 5, "module": "server-main", "does": "Start the periodic save loop: every runtime.saveIntervalSeconds (45s), call persistence.save for every state in the collection." },
      { "order": 6, "module": "server-main", "does": "Bind game:BindToClose to the onShutdown phase, connect protocol.channel(\"BuyUpgrade\").OnServerEvent to the onPurchase phase, and set protocol.channel(\"RequestState\").OnServerInvoke to return one snapshot for the calling player. Every remote in this file is reached through protocol.channel and named in no literal anywhere else." }
    ],
    "onJoin": [
      { "order": 1, "module": "persistence", "fn": "load(player)", "calledBy": "server-main", "does": "Load the player's saved state, or defaultState() on a DataStore failure, and RECONCILE it before returning: if areaComplete is true, refill cleared with every index from 1 to area.patchCount; then set clearedCount from the cleared set rather than trusting the stored number. This is the inverse of save's collapse and it is why a finished area does not come back green. Yields. Nothing else may run for this player until it returns." },
      { "order": 2, "module": "server-main", "does": "Set state.player = player. The only write to that field, ever." },
      { "order": 3, "module": "server-main", "does": "THE BARRIER: states[player.UserId] = state. The player becomes visible to clearing.tick at this instant and not before, which is why it is after step 1." },
      { "order": 4, "module": "plots", "fn": "spawn(player, state)", "calledBy": "server-main", "does": "Claim a slot, build the plot slab, its spawn Attachment and one Instance per uncleared patch — and NONE AT ALL if state.areaComplete is true, because a finished area stays walkable and stays bare — then write state.patches. The latch is checked before the cleared set and short-circuits it. Returns the spawn CFrame, which server-main keeps for this player until they leave." },
      { "order": 5, "module": "server-main", "does": "Push a snapshot: protocol.channel(\"StateChanged\"):FireClient(player, snapshot). May arrive before the client's HUD exists, which is why client-main also pulls one." },
      { "order": 6, "module": "server-main", "does": "Connect player.CharacterAdded to the onSpawn phase. Safe to connect now: the state exists and the plot exists." },
      { "order": 7, "module": "server-main", "fn": "player:LoadCharacter()", "does": "Load the character, last. Everything onSpawn needs is now in place, so onSpawn needs no waits and no retries." }
    ],
    "onSpawn": [
      { "order": 1, "module": "server-main", "does": "Look up states[player.UserId]. If absent, the player left mid-spawn: return, do nothing, do not error." },
      { "order": 2, "module": "server-main", "does": "character:WaitForChild(\"Humanoid\") and wait for the HumanoidRootPart." },
      { "order": 3, "module": "server-main", "does": "PivotTo the spawn CFrame that plots.spawn returned for this player, raised 3 studs on Y. This is where onboarding.guaranteedFirstRelic is kept: the player arrives at the plot origin, standing in the patch that hides the first Find of set one." },
      { "order": 4, "module": "progression", "fn": "walkSpeed(state)", "calledBy": "server-main", "applies": "speed", "does": "THE DEFECT TRIAL 1 FOUND: server-main writes humanoid.WalkSpeed = progression.walkSpeed(state). progression computes and never writes; this line is the only place the Pace upgrade reaches the engine. Without it the upgrade is purchasable and does nothing." },
      { "order": 5, "module": "server-main", "does": "Push a snapshot on protocol.channel(\"StateChanged\"). The HUD is not rebuilt on a respawn, so this is a refresh, not a boot." }
    ],
    "onPurchase": [
      { "order": 1, "module": "server-main", "does": "protocol.channel(\"BuyUpgrade\").OnServerEvent received with one string. Look up states[player.UserId]; if absent, drop the message. Reject any payload that is not a string." },
      { "order": 2, "module": "progression", "fn": "tryBuy(state, upgradeId)", "calledBy": "server-main", "does": "Validate and apply, or change nothing and return false. The server prices it; the client sent only an id." },
      { "order": 3, "module": "progression", "fn": "walkSpeed(state)", "calledBy": "server-main", "applies": "speed", "does": "On success only: re-write humanoid.WalkSpeed unconditionally, whichever upgrade was bought. Gating this on upgradeId == \"speed\" is one line shorter and one refactor away from re-opening the trial-1 defect." },
      { "order": 4, "module": "server-main", "does": "On success only: push a snapshot on protocol.channel(\"StateChanged\"). On failure send nothing — the server is the only writer, so the client's HUD is already correct." }
    ],
    "onTick": [
      { "order": 1, "module": "clearing", "fn": "tick(states)", "calledBy": "clearing", "applies": "radius, value", "fires": "FindRevealed, AreaRestored, StateChanged", "does": "Every runtime.clearTickRate (0.12s), inside a pcall so one bad iteration cannot stop the loop. Per state, in this order: SKIP THE STATE ENTIRELY IF state.areaComplete IS TRUE — the latch is the first test, before the character lookup and before any distance work, and it is what stops a finished area paying twice; skip if the character or its HumanoidRootPart is absent; read progression.clearRadius(state) once; clear every uncleared patch within that XZ distance — set patch.cleared, destroy the Instance, set state.cleared[index], increment state.clearedCount, award max(1, floor(tier.value * progression.valueMultiplier(state))), and fire FindRevealed for a patch.relic that state.found does not already hold. Then, if clearedCount >= area.patchCount and areaComplete is false, latch areaComplete and fire AreaRestored once. Finally, if this pass changed anything, fire StateChanged once with a fresh snapshot — at most one per player per tick, none on a pass that cleared nothing — because currency, clearedCount and found change here and nowhere else, and nothing else pushes them. All three channels through protocol.channel(name). Reads no client message and uses no Touched event." }
    ],
    "onSave": [
      { "order": 1, "module": "persistence", "fn": "save(player, state)", "calledBy": "server-main", "does": "Every runtime.saveIntervalSeconds (45s), for every state in the collection. A failure warns and the loop continues; the next pass retries by existing." }
    ],
    "onLeave": [
      { "order": 1, "module": "server-main", "does": "Players.PlayerRemoving. Lift the state out of the collection and delete states[player.UserId] FIRST, so no tick can touch a state that is being saved and torn down. If there is no entry, the player never finished joining: return." },
      { "order": 2, "module": "persistence", "fn": "save(player, state)", "calledBy": "server-main", "does": "Save, and wait for it. Before teardown, which is server-main's second criterion." },
      { "order": 3, "module": "plots", "fn": "despawn(state)", "calledBy": "server-main", "does": "Destroy the plot slab, which takes its patches and its spawn Attachment with it, and release the slot so the next player reuses it." },
      { "order": 4, "module": "server-main", "does": "Drop the spawn CFrame held for this player. Nothing else references the state; it is garbage." }
    ],
    "onShutdown": [
      { "order": 1, "module": "server-main", "does": "game:BindToClose. If RunService:IsStudio() then return immediately — a Studio stop must not write test data to the live store under runtime.dataStoreName. Otherwise call persistence.save for every state still in the collection and wait for all of them." }
    ],
    "onClientBoot": [
      { "order": 1, "module": "client-main", "does": "Create one ScreenGui in PlayerGui. It is created once and survives every character respawn. It does NOT wait for the remotes Folder itself: protocol.channel does that once, inside Protocol.luau, on its first call." },
      { "order": 2, "module": "client-main", "does": "UIBuilder.build(Screens.hud, Theme, screenGui) to get the HUD's Root frame. No client module authors UI structure." },
      { "order": 3, "module": "hud-binding", "fn": "bind(root, gui)", "calledBy": "client-main", "does": "Resolve the HUD's named nodes once and return an updater. A node name that no longer resolves warns here, once." },
      { "order": 4, "module": "input", "fn": "connect()", "calledBy": "client-main", "does": "Install the purchase affordance. Takes no arguments and resolves its own channel with protocol.channel(\"BuyUpgrade\"); client-main passes it nothing. Fires BuyUpgrade with one upgrade id and nothing else." },
      { "order": 5, "module": "client-main", "does": "Connect protocol.channel(\"StateChanged\").OnClientEvent to the updater, THEN call protocol.channel(\"RequestState\"):InvokeServer() once and pass the result to the same updater. In that order, so a push arriving during the round trip is not lost. The updater is idempotent, so a duplicate snapshot is harmless — which is also what makes two originators on StateChanged safe." },
      { "order": 6, "module": "client-main", "does": "Connect the two payoff channels: protocol.channel(\"FindRevealed\").OnClientEvent to a local onReveal(findName), and protocol.channel(\"AreaRestored\").OnClientEvent to a local onRestored(areaLabel). Both handlers exist and both are EMPTY today. What a reveal looks like, sounds like and reads as is routed to Art — VFX, Audio — Stingers and UI/UX — Feedback, none of which owns a contract key yet; they are connected anyway so that each channel has a receiver at the end of the wire and adding presentation is a change to one function body rather than to the wiring. The HUD does not depend on either: the found count, the balance and the progress bar all arrive on StateChanged." }
    ],
    "constructs": [
      {
        "module": "persistence",
        "fn": "defaultState()",
        "initialises": ["currency", "upgrades", "cleared", "clearedCount", "found", "areaComplete"],
        "values": {
          "currency": 0,
          "upgrades": "{} — an empty map. A missing key reads as level 0; no upgrade is written until it is bought.",
          "cleared": "{} — an empty map keyed by layout index",
          "clearedCount": 0,
          "found": "{} — an empty map keyed by the find names in collection.sets[].relics",
          "areaComplete": false
        },
        "note": "THE ONLY CONSTRUCTOR. Every persisted field gets a value here, so a new player has no undefined field and no module has to guess a default at the point of use. Trial 2 stopped on this twice, independently. persistence.load also returns this on a DataStore failure, so it may not yield and may not touch a DataStore."
      },
      {
        "module": "server-main",
        "fn": "the PlayerAdded handler",
        "initialises": ["player"],
        "note": "Set once, in onJoin step 2, immediately after load returns and before the state enters the collection. Never reassigned. Not persisted and not in a snapshot."
      },
      {
        "module": "plots",
        "fn": "spawn(player, state)",
        "initialises": ["patches"],
        "note": "Built from layout.build() with the slot origin added, filtered by state.cleared for the Instances but not for the records: a cleared patch keeps its record with cleared true and instance nil, so indices stay aligned with layout's order and therefore with state.cleared. Rebuilt on every join and discarded on every leave; never persisted."
      }
    ]
  }
}
```

## Consequences for the builders

A builder may now assume:

- That when `onSpawn` runs, the state exists, is fully loaded, and the plot is already built.
  No waiting, no polling, no retry.
- That `clearing.tick` never sees a state without a `player`, and never sees one that is being
  torn down.
- That a snapshot arriving twice is normal, and the updater must therefore be idempotent.
- That nothing constructs a `PlayerState` except `persistence.defaultState()`.

A builder may **not** assume:

- That `CharacterAutoLoads` is on. Nothing spawns a character except `onJoin` step 7.
- That a `Humanoid` retains a `WalkSpeed` written to a previous character. Every new character
  is a fresh write.
- That `onPurchase` may push anything on a failed buy, or that a client may be told a price.

## Acceptance criteria

1. In a fresh save, a player's `Humanoid.WalkSpeed` is `movement.baseWalkSpeed` (16) within one
   second of spawning; after buying Pace once it is 17.6 without respawning; after dying and
   respawning it is still 17.6.
2. `clearing.tick` never observes a state whose `player` field is nil, over 100 join/leave
   cycles.
3. A player who joins with `clearedCount` at 40 sees `area.patchCount - 40` patch Instances,
   and none of the 40 they had already cleared.
4. A brand-new player's first cleared patch fires exactly one `FindRevealed`, and the
   collection count reads 1 with 139 patches still standing.
5. `AreaRestored` fires exactly once per player per area, across any number of rejoins, and
   never on the `FindRevealed` channel.
6. Leaving mid-session saves before the plot is destroyed: a rejoin immediately after shows the
   same currency, the same levels, and the same missing patches.
7. Stopping a Studio session writes nothing to the DataStore.
8. Erroring deliberately inside one iteration of `tick` leaves the loop running for every other
   player.
9. **The trial-3 exploit, as a test.** A player whose `areaComplete` is true rejoins to zero patch
   Instances on a walkable plot, no `AreaRestored`, and a balance that does not move over 60
   seconds of walking anywhere in it. `clearedCount` still reads `area.patchCount` — 140, never 280
   — and rejoining ten more times does not change that.
10. Clearing one patch pushes exactly one `StateChanged`, and the balance readout and the progress
    bar move within one tick of a clear with no purchase in between. Standing still for ten ticks
    pushes none.
11. `grep -rn 'Instance.new("Remote' game/src` matches `Protocol.luau` only; no other file names a
    remote in a literal, and no file outside `Protocol.luau` calls `WaitForChild` for a remote or
    `FindFirstChild` with a recursive flag.
12. All four server-to-client channels have a connected handler on the client after boot, and
    every module with a non-empty `fires` list depends on `protocol`.

## Not decided here

Retry and backoff inside `persistence` (its own module). What a snapshot is serialised as on the
wire beyond the field list `protocol.snapshotShape()` fixes. The purchase affordance's shape —
which key, which button, what a mobile player presses — is a control-scheme question and is
routed to **UI/UX**, a CID category that owns no contract key; `interfaces` records keyboard
1/2/3 as an interim, derived from the labels the emitted HUD already ships, and flags it.

**Back to CID, and it is now reachable.** With the rejoin farm closed, a player who finishes the
area stands on a walkable, permanently bare plot with no patches and no income: the game has a
terminal state and there is nothing in it. `[cid: decided]`
`theme/setting/04-permanence-and-passage.md` has already decided the way out, and it is walking — a
finished part stays walkable, carries an inward opening, and the next part is *"enterable at the
instant one completes, with no threshold, no cooldown and no travel worth measuring"*. What does
not exist is anything to walk into: `collection.areasPerDepth` is 1, `area` supplies one area, and
no contract key describes a second area, the current-area field that sheet asks `persistence` for,
or the two openings it requires every part to carry. **That is Meta & Content's, and it is the
largest hole either manifest now has.** This stage will not invent an area, and the latch is where
that content attaches when it exists. `gameplay/core-loop/03-reveal-placement.md` routes "what
content exists past collection completion" the same way.
