# 05 — Interfaces

**Stage:** architect · **Key:** interfaces

## Decision

**Twenty-five interface entries across nine modules, every parameter resolved: twenty-three
callable functions and two data tables.** The two entry points, `server-main` and `client-main`,
appear here not at all — they expose nothing and are called by the engine. Four answers in here
are the ones that cost a build trial a guess each:

- **`upgradeCost(upgrade, level)` — `level` is the level currently HELD, not the target.**
  The first purchase of Reach is `upgradeCost(reach, 0)` and costs `costBase`, 40. Reading
  `level` as the target would price the same purchase at 70, a 75% error on every first buy.
- **`tick(states)` — `states` is the whole live collection, a map keyed by `UserId`.** Not an
  array, not keyed by `Player`. See `stateShape.collection`.
- **`walkSpeed(state)` computes a number and writes nothing.** The write to
  `Humanoid.WalkSpeed` belongs to `server-main`, in `onSpawn` and after any successful
  purchase. Trial 1 shipped this function with no writer, and Pace was purchasable with no
  effect.
- **`protocol.channel(name)` is the only way any module gets a RemoteEvent, and
  `protocol.createRemotes()` is the only thing that makes one.** Trial 3 found `clearing`
  required to fire two channels with no path to either, and its builder invented
  `ReplicatedStorage:FindFirstChild(name, true)` with a warning on a miss. Both functions are new
  in this sheet.

Two module signatures are amended by this sheet, in `02-modules.md`: `config` gains
`upgradeEffect(upgrade, level)` (it exists in the generated file and every derived quantity
goes through it, so leaving it undeclared makes three modules re-decide "additive or
compounding"), and `clearing.start()` becomes `clearing.start(states)` (it owns the cadence,
so it has to be handed the collection it ticks).

## Why

- **The `level` reading is not arbitrary and not mine.** `GameConfig.upgradeCost` is
  *generated*, and it computes `floor(costBase * costGrowth ^ level)`. At `level = 0` that is
  `costBase`, which is only meaningful as the price of the first purchase. The held reading is
  the one the emitted code already implements; stating it is recording a fact, not making a
  call. Same for `upgradeEffect`: `base + perLevel * level` is `base` at level 0, and
  `movement.baseClearRadius` is 5.5 while the Reach def's `base` is 5.5. `[cid: decided]`
  Balance owns those numbers and they already agree.
- **`award` takes a final amount, not a raw tier value.** `clearing` holds
  `applies: ["value"]`, so `clearing` multiplies and `award` does not. If both did, the Value
  upgrade would be squared — the same class of double-apply the `applies` field exists to
  make visible. Stated on both sides.
- **`clearRadius` and `valueMultiplier` need no apply step, and `walkSpeed` does.** That
  asymmetry is why the Pace defect existed and nothing caught it. Radius and value are read
  fresh inside the tick that uses them, so a purchase takes effect on the next tick with no
  write anywhere. Walk speed lives on a `Humanoid` the engine owns, so somebody has to push
  it. Any derived quantity that lands on an Instance needs a named writer; a derived quantity
  that is only ever read does not.
- **`spawn` returns the plot's spawn CFrame.** `onboarding.guaranteedFirstRelic` is
  `[brief: binding]`, and it is kept by *where the player stands*, not by the layout alone:
  the guaranteed Find is under the patch nearest the plot origin, so the character has to
  arrive at the plot origin. Deriving that point a second time inside `server-main` is how two
  modules end up with two formulas, so `plots` returns it and `server-main` uses it.
- **`layout.build()` takes no seed and no slot, so its positions are plot-local.** `plots`
  adds the slot origin and writes **world** positions into `state.patches[i].position`. That
  is the answer to "what does `patch.position` denote", which stopped a trial: local in
  `layout`'s return, world in the live state, converted in exactly one place.
- **The array index returned by `layout.build()` is a patch's durable identity.**
  `02-modules.md` already forbids per-session randomness in `layout` on the grounds that
  "persistence stores patch indices". `state.cleared` is keyed by that index. Reordering the
  layout is therefore a save migration, and it is stated here as well as there because the two
  facts are useless apart.
- **`claimSlot` and `releaseSlot` are exposed but called by `plots` itself.** `spawn` claims
  and `despawn` releases, so `server-main` never handles a slot number and no `slot` field
  appears in `PlayerState`. They stay exposed so `plots`'s own criterion — "a vacated slot is
  reused before a higher one is allocated" — can be tested without building 140 parts.
- **`protocol` owns the channels end to end, because splitting naming from creation splits one
  fact across two modules.** Before this, `protocol` held the names, `server-main` chose the folder
  and the class per channel inside its boot step, and `clearing` — which fires two of them — did
  not depend on `protocol` at all. Two of the three facts a caller needs existed only inside the
  entry point, so any other module wanting a remote had to guess, and one did. `createRemotes()`
  and `channel(name)` put all three in the module that already owned the names. The rejected
  alternative was `server-main` handing a table of Instances to `clearing.start(states, channels)`:
  it works, and it makes the tick's signature carry the transport while leaving `clearing`'s two
  outputs invisible in the module graph, which is how they went missing the first time.
- **`channel(name)` errors on an undeclared name; it does not warn and return nil.** The invention
  it replaces warned and continued, which turns one typo into a payoff channel that silently never
  arrives and that a playtest can miss for an hour. A name outside `protocol.declaresRemotes` is a
  build defect and belongs at the first call, loudly.
- **`load` is the exact inverse of `save`'s collapse, and that is the whole of the trial-3 fix.**
  `save` drops `cleared` when `areaComplete` is true; `load` refills it to every index when
  `areaComplete` is true, and derives `clearedCount` instead of trusting it. Without the inverse,
  `plots.spawn` respawned all `area.patchCount` patches on the next join and the tick paid for
  every one of them again, every rejoin, without bound. The payload is still one boolean, which is
  what `persistence` is forbidden to exceed. `[cid: decided]`
  `theme/setting/04-permanence-and-passage.md` `W2`: entering a finished part spawns **0** patches.
- **Two of these entries are not functions, and that is the point of the rule that put them
  here.** `config.GameConfig` and `protocol.REMOTES` are tables the module returns. Both used to
  be described inside their `exposes` string — `"GameConfig table"`, `"REMOTES table"` — and the
  graph builds a node from the text up to the first parenthesis, so both became nodes with a
  space in the name that nothing could match: `protocol.REMOTES` was declared here and read as
  exposed by nobody, which is a defect the check found and a human would not have. The
  distinction the word *table* was carrying is now structural rather than editorial: **an exposed
  name with parentheses is a callable and must appear here with every parameter resolved; a bare
  name is data and appears here with `params: []` and its contents written out.** A builder needs
  the second as much as the first — knowing `GameConfig` exists is worthless without knowing that
  the patch count is at `GameConfig.Area.patchCount`.
- **The HUD node names are not a convention a builder should have to infer.** They are already
  fixed by the emitted screen at `game/src/shared/Screens/hud.luau`, which a builder is
  allowed to read; the mapping from state field to node path is written out under
  `hud-binding.bind` so it is not re-derived by reading generated UI data.

```manifest
{
  "provides": "interfaces",
  "value": [
    {
      "module": "config",
      "fn": "GameConfig",
      "params": [],
      "returns": "table — the module's own returned table. Fields, in the spelling the emitter produces and the only spelling any module may use: Tiers, Upgrades, RelicSets, Currency, Patch, Area, BaseClearRadius, BaseWalkSpeed, RelicsPerArea, AreasPerDepth, FindNoun, GuaranteedFirstRelic, ClearTickRate, SaveIntervalSeconds, RespawnDelaySeconds, DataStoreName, plus the three functions below. NOT A CALLABLE: require(ReplicatedStorage.UIForge.GameConfig) IS this table, so a builder writes GameConfig.Area.patchCount and never GameConfig().Area.",
      "note": "This entry exists because `exposes` may carry only a name or a signature, so the word \"table\" in the old entry `\"GameConfig table\"` had to move somewhere a builder would still find it. The rule it demonstrates: an exposed name with parentheses is a callable and its parameters are resolved here; a bare name is data and this is where its contents are written down. Every field is GENERATED from both manifests by `npm run architect -- --emit`, so no module may hand-write a tuned value, hold a copy of one, or reach a number by any path but this table. Constructs no Roblox type — no Color3, no Vector3, no Enum, no Instance — which is what lets the module load outside the engine; a builder finding one here has found a bug in the emitter rather than a value to use."
    },
    {
      "module": "config",
      "fn": "upgradeCost(upgrade, level)",
      "params": [
        { "name": "upgrade", "type": "UpgradeDef", "note": "one entry of GameConfig.Upgrades, the table itself and not its id" },
        { "name": "level", "type": "integer", "meaning": "the level the player currently HOLDS, not the level being bought. The price of the first purchase is upgradeCost(def, 0) and equals def.costBase. The price of moving from level 3 to 4 is upgradeCost(def, 3)." }
      ],
      "returns": "integer — floor(costBase * costGrowth ^ level)",
      "note": "Generated. Do not reimplement the curve anywhere else. A purchase is legal only while the held level is strictly below def.maxLevel, so the highest price ever charged is upgradeCost(def, maxLevel - 1)."
    },
    {
      "module": "config",
      "fn": "upgradeEffect(upgrade, level)",
      "params": [
        { "name": "upgrade", "type": "UpgradeDef", "note": "needs base, perLevel and mode" },
        { "name": "level", "type": "integer", "meaning": "the level currently HELD, same convention as upgradeCost. Effect at level 0 is def.base, which is the pre-upgrade value: 5.5 studs for radius, 16 for speed, 1.0 for value." }
      ],
      "returns": "number — base + perLevel * level when mode is \"additive\", base * perLevel ^ level when mode is \"compounding\"",
      "note": "The single place the additive-versus-compounding question is answered. progression.clearRadius, progression.walkSpeed and progression.valueMultiplier are each one call to this and nothing else; none of them may inline the arithmetic. All three shipped upgrades are additive today, which is exactly why hand-inlining looks harmless and would silently ignore a future compounding axis."
    },
    {
      "module": "config",
      "fn": "tierByWeight(roll)",
      "params": [
        { "name": "roll", "type": "number", "meaning": "a uniform sample in [0, 1). Not a weight, not a tier index, and not pre-scaled by the weight total — the function scales it." }
      ],
      "returns": "(integer, TierDef) — the 1-based index into GameConfig.Tiers, then the tier table",
      "note": "The integer is what goes into Patch.tierIndex; the table is for reading value, height and shape at the point of use. Storing the table in a Patch instead of the index is forbidden by 03-state-shape: re-emitting the config would leave stale names in live patches."
    },
    {
      "module": "layout",
      "fn": "build()",
      "params": [],
      "returns": "{ Patch } — exactly area.patchCount records in a fixed canonical order",
      "note": "Positions are PLOT-LOCAL, in studs, with (0, 0, 0) at the plot origin, so they span roughly +/- area.size/2 on X and Z; area.originXZ is the plot CENTRE. tierIndex is resolved, relic is set on exactly collection.relicsPerArea of them, cleared is false and instance is nil. Takes no seed and no slot: every plot has the same layout, which is what makes state.cleared portable across a rejoin. The array index IS the patch's durable identity — state.cleared is keyed by it — so changing the order is a save migration, not a refactor."
    },
    {
      "module": "protocol",
      "fn": "REMOTES",
      "params": [],
      "returns": "table — the five channels below, keyed by name, each with its class, direction, payload and the one module that originates it. NAMES AND CLASSES, NOT INSTANCES: protocol.channel(name) returns the Instance.",
      "note": "A TABLE, NOT A CALLABLE — the second of the two bare names in the game, alongside config.GameConfig, and the reason both are written out here: `exposes` may carry only a name or a signature, so `\"REMOTES table\"` stopped being legal and the explanation moved here. Exactly five, and no more. There is deliberately no clearing channel and no currency channel — the server observes clearing on a tick, so there is nothing for a client to claim. FindRevealed and AreaRestored are two channels because they are two payoff kinds: gameplay/core-loop/03-reveal-placement.md rejects carrying completion on the reveal channel behind a \"__area_complete:\" string prefix, and names this pair. Every name here appears in protocol's declaresRemotes, and every module named in firedBy carries that name in its own fires list — that pair is what the architect gate checks, and it is why an output with no path to it is now a merge failure rather than something a build trial finds.",
      "channels": [
        { "name": "RequestState", "class": "RemoteFunction", "direction": "client -> server", "payload": "no arguments; returns one snapshot", "firedBy": "client-main", "handledBy": "server-main, which sets OnServerInvoke at boot", "why": "client-main may not assume the join-time push arrived, so it pulls once after its updater is live" },
        { "name": "StateChanged", "class": "RemoteEvent", "direction": "server -> client", "payload": "one snapshot, exactly the fields snapshotShape() names", "firedBy": "server-main on join, on spawn and after a successful purchase; clearing once per tick in which anything changed", "handledBy": "client-main, which passes it to the updater hud-binding.bind returned", "why": "TWO ORIGINATORS, deliberately and safely: it carries a whole snapshot rather than a delta, so a duplicate is idempotent and an extra push is harmless. currency, clearedCount and found only ever change inside the tick, so without clearing firing it the balance readout and the progress bar sit frozen until the next purchase — the same defect shape as a computed walk speed nobody writes." },
        { "name": "BuyUpgrade", "class": "RemoteEvent", "direction": "client -> server", "payload": "one upgrade id string and nothing else", "firedBy": "input", "handledBy": "server-main, wiring.onPurchase", "why": "the only client-originated message in the game; the server prices it" },
        { "name": "FindRevealed", "class": "RemoteEvent", "direction": "server -> client", "payload": "one find name string, from Patch.relic", "firedBy": "clearing", "handledBy": "client-main's onReveal handler, which is connected and empty: what a reveal looks like, sounds like and reads as is routed to Art — VFX, Audio — Stingers and UI/UX — Feedback, none of which owns a contract key yet. The HUD does not need it; the found count arrives on StateChanged.", "why": "up to collection.relicsPerArea times per area, per player" },
        { "name": "AreaRestored", "class": "RemoteEvent", "direction": "server -> client", "payload": "the area label string", "firedBy": "clearing", "handledBy": "client-main's onRestored handler, connected and empty for the same reason", "why": "exactly once per player per area, on the latch transition only. A rejoining finished player learns it from the snapshot's areaComplete field and from nothing else: [cid: decided] theme/setting/04-permanence-and-passage.md forbids any effect, sound, fade or transition marking entry into a finished part." }
      ]
    },
    {
      "module": "protocol",
      "fn": "createRemotes()",
      "params": [],
      "returns": "Folder — ReplicatedStorage.Remotes, holding one Instance per channel",
      "note": "SERVER ONLY, called exactly once, by server-main at boot before any player can join (wiring.boot step 2). Creates a Folder named \"Remotes\" directly under ReplicatedStorage — [architect: arbitrary] on the name, fixed here so two builders cannot pick differently; deliberately NOT under tree.sharedRoot, because that Folder is Rojo-managed and these Instances are made at runtime — then one RemoteEvent or RemoteFunction per entry of REMOTES, with the class taken from that table. Errors if called from a client. Idempotent on the server: a second call creates nothing and returns the existing Folder. Connects no handler; server-main connects BuyUpgrade and RequestState itself. This function exists because the folder name and the class-per-channel used to live in server-main's boot step, where no other module could see them."
    },
    {
      "module": "protocol",
      "fn": "channel(name)",
      "params": [
        { "name": "name", "type": "string", "note": "a key of REMOTES, taken from that table rather than hand-typed wherever the call site can reach it" }
      ],
      "returns": "RemoteEvent | RemoteFunction — the live Instance for that channel",
      "note": "THE ONLY PATH FROM A NAME TO A REMOTE INSTANCE, on both sides, for every module. Errors on a name REMOTES does not declare — it never warns and returns nil, because the thing it replaces did exactly that. Resolves the Remotes Folder once with WaitForChild on the first call and caches it: a client may call before the server's boot step has replicated, a server caller cannot, since createRemotes ran first. Does no work at require time, per tree's rule that a module returns one table and nothing else on load. Trial 3's builder, lacking this function, invented ReplicatedStorage:FindFirstChild(name, true) with a warning on a miss; that recursive search is forbidden, and so is any WaitForChild on a remote outside this module."
    },
    {
      "module": "protocol",
      "fn": "snapshotShape()",
      "params": [],
      "returns": "{ string } — the ordered field names a snapshot carries",
      "note": "Exactly currency, upgrades, clearedCount, found, areaComplete. A snapshot is NOT a PlayerState: patches, cleared and player never cross the wire — patches and cleared are hundreds of entries the HUD has no use for, and player is not serialisable. Both sides build and read the payload from this list rather than repeating field-name literals, which is protocol's second acceptance criterion."
    },
    {
      "module": "persistence",
      "fn": "load(player)",
      "params": [
        { "name": "player", "type": "Player" }
      ],
      "returns": "PlayerState — every persisted field populated AND RECONCILED; patches empty and player unset",
      "note": "Never throws and never returns nil. On a DataStore failure it warns and returns defaultState(), so the player is playable on a fresh session rather than stuck. It yields; server-main must not insert the state into the live collection until it has returned, or clearing.tick can see a half-loaded state. Reads under runtime.dataStoreName, keyed by the player's UserId. RECONCILES BEFORE RETURNING, which is the other half of save's collapse and the trial-3 fix: if areaComplete is true, cleared is filled with every index from 1 to area.patchCount and clearedCount is set to area.patchCount; otherwise clearedCount is set to the number of keys in cleared. The stored clearedCount is compared, never trusted, and a mismatch warns — a payload whose count disagrees with its set is exactly how a finished area re-opened and paid twice. Every caller may therefore assume, for any state this function returns: #cleared == clearedCount, and areaComplete implies clearedCount == area.patchCount."
    },
    {
      "module": "persistence",
      "fn": "save(player, state)",
      "params": [
        { "name": "player", "type": "Player" },
        { "name": "state", "type": "PlayerState" }
      ],
      "returns": "boolean — true if the write was accepted",
      "note": "Writes exactly the six persisted fields of 03-state-shape and nothing else. THE COLLAPSE: when state.areaComplete is true, cleared is written as an empty set, because the flag already implies every index. That is what keeps the payload bounded and what persistence's own prohibition is about. It is lossless ONLY because load is its exact inverse and refills the set from the same flag; dropping the list with nothing to expand it is what respawned a finished area. The live state.cleared is NOT emptied — this function collapses the payload, not the state. Yields. Idempotent — saving twice with no change between is not an error."
    },
    {
      "module": "persistence",
      "fn": "defaultState()",
      "params": [],
      "returns": "PlayerState — the opening balance",
      "note": "currency 0, upgrades an empty map (a missing key reads as level 0), cleared an empty map, clearedCount 0, found an empty map, areaComplete false, patches an empty array, player nil. THIS IS THE ONLY CONSTRUCTOR: no other module may build a PlayerState literal, and wiring.constructs names it. Trial 2 had no opening balance and no constructor, and both builders stopped on it independently. Does not yield and does not touch a DataStore, so load can call it on failure."
    },
    {
      "module": "progression",
      "fn": "award(state, amount)",
      "params": [
        { "name": "state", "type": "PlayerState" },
        { "name": "amount", "type": "integer", "meaning": "a positive whole number of currency to ADD to the balance. Not a new total, and already multiplied by valueMultiplier by the caller — award applies no multiplier of its own. If both applied one, the Value upgrade would be squared." }
      ],
      "returns": "number — the new balance",
      "note": "The only function that increases currency. Rejects a non-positive amount rather than clamping, because a zero or negative award is a caller bug and clearing's minimum payout is 1."
    },
    {
      "module": "progression",
      "fn": "tryBuy(state, upgradeId)",
      "params": [
        { "name": "state", "type": "PlayerState" },
        { "name": "upgradeId", "type": "string", "note": "one of the ids in upgrades: value, radius, speed" }
      ],
      "returns": "boolean — true only if currency was deducted and the level incremented",
      "note": "Reads the held level from state.upgrades[upgradeId], treating nil as 0; prices it with config.upgradeCost(def, heldLevel); on success deducts exactly that and increments the level by exactly 1. Returns false and changes NOTHING if the id is unknown, if the held level already equals def.maxLevel, or if state.currency is below the cost. Never accepts a cost, a level or a target from the caller — the client sends an id and nothing else."
    },
    {
      "module": "progression",
      "fn": "clearRadius(state)",
      "params": [
        { "name": "state", "type": "PlayerState" }
      ],
      "returns": "number — studs",
      "note": "config.upgradeEffect(radius def, held radius level). 5.5 at level 0, matching movement.baseClearRadius. Read fresh by clearing on every tick and cached nowhere, which is why the radius upgrade needs no apply step and takes effect on the next tick after a purchase."
    },
    {
      "module": "progression",
      "fn": "walkSpeed(state)",
      "params": [
        { "name": "state", "type": "PlayerState" }
      ],
      "returns": "number — studs per second",
      "note": "config.upgradeEffect(speed def, held speed level). 16 at level 0, matching movement.baseWalkSpeed. COMPUTES A NUMBER AND WRITES NOTHING. The write to Humanoid.WalkSpeed is server-main's, in wiring.onSpawn and wiring.onPurchase, which is why server-main and not progression holds applies: [\"speed\"]. Trial 1 shipped this function with no writer and Pace was purchasable with no effect."
    },
    {
      "module": "progression",
      "fn": "valueMultiplier(state)",
      "params": [
        { "name": "state", "type": "PlayerState" }
      ],
      "returns": "number — a multiplier, 1.0 at level 0",
      "note": "config.upgradeEffect(value def, held value level). Multiplies a single tier's value, not a payout stack: clearing computes max(1, floor(tier.value * valueMultiplier(state))). The floor and the minimum belong to clearing, not here, because they are properties of a payout and not of the multiplier."
    },
    {
      "module": "plots",
      "fn": "claimSlot()",
      "params": [],
      "returns": "integer — the lowest free 1-based slot index",
      "note": "Called by plots.spawn, not by server-main. Slot n's plot origin is (area.originXZ[1] + (n - 1) * (area.size + 40), 0, area.originXZ[2]): one row along +X, 40 studs of gutter between the playable fields, unbounded, so no player cap is implied anywhere. THE PITCH AND THE SLAB ARE THE SAME NUMBER: representation gives the plot slab a size of area.size + 40 = 160, exactly this stride, so consecutive slabs share an edge and there is no air between two plots at any index. That is half of the playtest fix for falling out of the world — the other half is the four plot-barrier parts at +/- area.size / 2, which stop a character reaching the outer rim of the row where the floor does end. The 40 is a plot-geometry constant, not a tuned game value: it lives here and in representation, it is used by plots and by nothing else, and it is deliberately NOT in GameConfig, which carries values more than one module reads and which must load outside the engine. A builder writes it as a named local in Plots.luau and cites this note. A slot's position is a function of its index alone and never of the live player count, which is plots's first prohibition. Exposed so slot reuse is testable without building 140 parts."
    },
    {
      "module": "plots",
      "fn": "releaseSlot(n)",
      "params": [
        { "name": "n", "type": "integer", "meaning": "a slot index previously returned by claimSlot, being returned to the free pool. Not a player count and not a plot Instance. Releasing an index that is not currently taken is a no-op, not an error." }
      ],
      "returns": "nil",
      "note": "Called by plots.despawn. The free pool hands back the lowest free index first, so a vacated slot is reused before a higher one is allocated."
    },
    {
      "module": "plots",
      "fn": "spawn(player, state)",
      "params": [
        { "name": "player", "type": "Player" },
        { "name": "state", "type": "PlayerState", "note": "read for cleared, written for patches" }
      ],
      "returns": "CFrame — the plot's spawn point, the WorldCFrame of the plot's spawn Attachment",
      "note": "Claims a slot for this player, builds the plot slab, its four barriers, its spawn Attachment and one Instance per patch that state.cleared does not mark, then writes state.patches. THE BARRIERS ARE NOT OPTIONAL AND ARE NOT CONDITIONAL: four of them, on every plot, including a finished one that has no patches at all, because they are what makes leaving the plot impossible rather than unlikely. Sizes, positions and properties are fixed in representation under plot-barrier; a patch's Size and Orientation are fixed there too, per tier.shape, and are not one formula for all four tiers. Converts layout's plot-local positions to WORLD by adding the slot origin, and it is the ONLY place that conversion happens. A cleared patch still gets its Patch record, with cleared true and instance nil, so indices stay aligned with layout's order. THE LATCH IS CHECKED FIRST AND SHORT-CIRCUITS THE SET: while state.areaComplete is true this builds ZERO patch Instances, and all area.patchCount records come back cleared true and instance nil. The slab, the four barriers and the spawn Attachment are built as usual, because a finished area stays walkable, stays fenced and stays bare — [cid: decided] theme/setting/04-permanence-and-passage.md W2, entering a finished part spawns 0 patches. It is a property of this function and not of its caller because plots is the only module that may create a patch Instance. Calling it twice for one player without a despawn between is a bug, not a second plot."
    },
    {
      "module": "plots",
      "fn": "despawn(state)",
      "params": [
        { "name": "state", "type": "PlayerState" }
      ],
      "returns": "nil",
      "note": "Destroys the plot for state.player, clears state.patches, and releases the slot internally via releaseSlot. Recovers the slot from its own registry keyed by UserId — PlayerState carries no slot field and must not gain one. Does not save: server-main calls persistence.save before this, which is server-main's second criterion."
    },
    {
      "module": "clearing",
      "fn": "tick(states)",
      "params": [
        { "name": "states", "type": "map<UserId, PlayerState>", "meaning": "the WHOLE live collection, one entry per connected player, keyed by UserId as an integer. Not an array, not keyed by Player, and not one player's state. See stateShape.collection. A builder handed this signature with no such statement guessed a map; a peer guessed differently." }
      ],
      "returns": "nil",
      "note": "One pass, in this order, per state: SKIP THE STATE ENTIRELY IF state.areaComplete IS TRUE — the latch is the FIRST test, before the character lookup and before any distance work, and it is what stops a finished area paying a second time; then skip it if state.player.Character or its HumanoidRootPart is absent; read radius once with progression.clearRadius(state); for every patch with cleared false whose XZ distance to the root part is within radius (XZ only, so height never affects reach) — set patch.cleared, destroy patch.instance and nil the field, set state.cleared[index], increment state.clearedCount, call progression.award with max(1, floor(tier.value * progression.valueMultiplier(state))), and if patch.relic is set and state.found[patch.relic] is not, set it and fire FindRevealed. After the loop, if clearedCount >= area.patchCount and areaComplete is false, latch it and fire AreaRestored exactly once. Finally, if the pass changed anything at all, fire StateChanged once with a fresh snapshot — at most one per player per tick, and none at all on a pass that cleared nothing. Every channel through protocol.channel(name); nothing here resolves a remote any other way. Never reads a client message; never uses Touched."
    },
    {
      "module": "clearing",
      "fn": "start(states)",
      "params": [
        { "name": "states", "type": "map<UserId, PlayerState>", "meaning": "the same live collection tick receives, captured once. Held by reference: server-main mutates the same table as players join and leave, and clearing never copies it." }
      ],
      "returns": "nil",
      "note": "Installs the runtime.clearTickRate loop (0.12s) and returns immediately. Called once by server-main at boot, before any player can join, so an empty collection on the first ticks is normal. Wraps each tick in a pcall and warns: an error in one iteration may not stop the loop, which is server-main's third criterion. Owns the cadence, so no other module reads runtime.clearTickRate."
    },
    {
      "module": "hud-binding",
      "fn": "bind(root, gui)",
      "params": [
        { "name": "root", "type": "GuiObject", "note": "what UIBuilder.build returned: the HUD's Root frame" },
        { "name": "gui", "type": "ScreenGui", "note": "the ScreenGui root sits in, for screen-level state such as Enabled" }
      ],
      "returns": "(snapshot) -> () — an updater the caller invokes with every snapshot",
      "note": "Resolves its node paths ONCE at bind time and closes over them, so an unresolved name warns once rather than on every snapshot. The node paths are fixed by the emitted screen: Cluster_topRight.Readout_SHARDS.ReadoutValue.Text takes the currency balance; Cluster_topLeft.Readout_RELICS.ReadoutValue.Text takes \"<found count> / <total finds across collection.sets>\"; Cluster_bottomRight.Readout_<n><LABEL UPPERCASED>.ReadoutValue.Text takes \"Lv <held level>  ·  <config.upgradeCost(def, held level)>\" for the nth entry of upgrades; Cluster_bottomLeft.ProgressGroup.BarLabel.Text takes \"<area.label uppercased> — <percent>% CLEAR\"; and ProgressGroup.Bar.BarFill.Size takes UDim2.fromScale(clearedCount / area.patchCount, 1), tweened rather than set. Affordability is signalled by text as well as colour. Authors no structure and creates no Instance except a Tween."
    },
    {
      "module": "input",
      "fn": "connect()",
      "params": [],
      "returns": "nil",
      "note": "Takes no arguments: it resolves its own channel with protocol.channel(\"BuyUpgrade\"), because there is exactly one way to get a remote and passing resolved Instances between modules is a second one. This supersedes the connect(remotes) signature 02-modules.md originally carried, and that sheet now records the amendment. Fires BuyUpgrade:FireServer(upgradeId) and nothing else, one id per press. Keyboard 1, 2 and 3 map to the 1st, 2nd and 3rd entries of upgrades — value, radius, speed — which is not a free choice: the emitted HUD already labels those rows \"[1] VALUE\", \"[2] REACH\" and \"[3] PACE\". Ignores input while UserInputService:GetFocusedTextBox() is non-nil, and ignores every other key. Sends no cost and no level."
    }
  ]
}
```

## Consequences for the builders

A builder may now assume:

- Every function it calls, with the meaning of every quantity argument. No signature has to be
  recovered by reading another module's source.
- That the client-to-server surface is one string on one remote. There is nothing else to
  validate, which is why `clearing` has no request path to secure.
- That `state.patches` holds world positions and `layout.build()` returns local ones, and that
  `plots.spawn` is the only converter.

A builder may **not** assume:

- That it may add a function to this list. An interface that is not here is a stop.
- That `progression` writes anything to a character. It writes to `state` only.
- That a snapshot and a `PlayerState` are the same table. They share five field names by
  construction and nothing more.

## Acceptance criteria

1. Every `interfaces` entry names a module that exists and a name in that module's `exposes`,
   and every exposed callable — every `exposes` entry carrying parentheses — has an entry here.
   The architect gate refuses both directions. A bare name is exempt from the second, having no
   parameters to resolve; `GameConfig` and `REMOTES` are the only two and both carry an entry.
2. `upgradeCost(def, 0)` equals `def.costBase` for all three upgrades, and
   `upgradeEffect(def, 0)` equals `def.base`.
3. `clearRadius` at level 0 equals `movement.baseClearRadius` and `walkSpeed` at level 0
   equals `movement.baseWalkSpeed`, both by identity rather than by a repeated literal.
4. `grep -rn "costGrowth\|perLevel" game/src` finds them only in `GameConfig.luau`.
5. No module other than `persistence` contains a table literal with the persisted field names
   in it.
6. `grep -rn "__area_complete" game/src` returns nothing.
7. `grep -rn 'Instance.new("Remote' game/src` matches `Protocol.luau` only, and no file outside
   it contains the string `"Remotes"` or a remote name literal.
8. Every `firedBy` in `protocol.REMOTES.channels` names a module whose `fires` list carries that
   channel, and every entry in every `fires` list appears in `channels`. `StateChanged` is the only
   name with two originators.
9. `plots.spawn` on a state with `areaComplete` true creates zero patch Instances, and
   `persistence.load` on the payload that state saves returns `#cleared == area.patchCount`.

## Not decided here

The body of any function. The DataStore key format, retry policy and serialisation of
`cleared` (`persistence`; `02-modules.md` already routes it there). The tween duration and
easing on the progress bar (UI/UX — Feedback). What a reveal looks and sounds like when
`FindRevealed` arrives (Art — VFX, Audio); this sheet fixes only the channel.

**Routed, not deferred:** what `onReveal` and `onRestored` do. Both handlers are connected at
boot and both are empty; the channel, the payload and the connection point are fixed here so that
adding a reveal is a change to one function body. Art — VFX, Audio — Stingers and UI/UX — Feedback
own the body, and none of the three owns a contract key yet.

**Back to CID:** the emitted HUD labels a readout `RELICS`
(`game/src/shared/Screens/hud.luau`, `text = "RELICS"`), and
`theme/vocabulary/02-banned-words.md` bans `relic` in player-facing strings while
`collection.className` is now `Find`. The internal field name `found` and the internal
`Patch.relic` are exempt and stay. The *label* is a live ban violation in a shipped screen and
belongs to whoever owns `ui-forge/briefs/hud.brief.json`; `hud-binding` is forbidden from
fixing it in code. `FINDS` is the obvious replacement and is 5 of `vocabulary.maxLabelChars`.
