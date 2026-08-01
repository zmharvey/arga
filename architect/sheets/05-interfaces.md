# 05 — Interfaces

**Stage:** architect · **Key:** interfaces

## Decision

**Thirty-six interface entries across sixteen modules, every parameter resolved: thirty-four
callables and two data tables.** The two entry points appear here not at all. Six answers are
the ones a builder would otherwise have to guess, and three of them are new since wave 1:

- **`upgradeCost(upgrade, level)` — `level` is the level currently HELD, not the target.**
  The first purchase of Reach is `upgradeCost(reach, 0)` and costs `costBase`, 40. Reading it as
  the target prices the same purchase at 70.
- **`modifiers.effective(state, axis)` is the ONLY function that returns an effective value.**
  `progression.clearRadius`, `walkSpeed` and `valueMultiplier` are deleted. A call to one of
  them is a stale file.
- **`layout.build(areaOrdinal)` — `areaOrdinal` is 1-based and 1 IS East Terrace.** It is
  `state.areasFinished + 1` at every call site in the game, and above 8 it means a post-terminal
  area, all of which are identical.
- **`tick(states)` — `states` is the whole live collection, a map keyed by `UserId`.**
- **`plots.advance(state)` builds the next bay and `clearing` is its only caller.** It is called
  from inside the tick, on the pass that finishes an area, and never anywhere else.
- **`pressables.bind(gui, onActivate)` — `onActivate` is called with `(role, index)`, where
  `index` is 1-based into `upgrades` for the purchase role and always 1 for the index role.**
  This is the seam that replaces `Enum.KeyCode.One`.

## Why

- **The `level` reading is not arbitrary and not mine.** `GameConfig.upgradeCost` is
  *generated*, and it computes `floor(costBase * costGrowth ^ level)`. At `level = 0` that is
  `costBase`, which is only meaningful as the price of the first purchase. Same for
  `upgradeEffect`: `base + perLevel * level` is `base` at level 0.
- **`effective` takes the axis as a string and returns a number, and it is one function rather
  than three.** `[cid: decided]` `modifiers.singleDefinition`: *"effective(axis) has exactly one
  implementation and every consumer calls it"*, `modifiers.composition` writes the expression
  out, `modifiers.resolutionOrder` fixes the four steps and `modifiers.clampApplication` says
  the clamp happens once at the end. Three named functions would be three places for the clamp
  to drift and three places for `base` to be multiplied in twice, which
  `modifiers.baseIsNotAppliedTwice` and `modifiers.forbidden` each ban explicitly.
- **`award` takes a final amount, not a raw tier value.** `[cid: decided]`
  `economy.faucets[patch-clear].multiplierAppliedOnce` is *"at this site only; never again inside
  the award function"*, and `modifiers.forbidden` lists "the value multiplier applied both at
  the faucet formula and inside the award function". `clearing` multiplies; `award` does not.
- **`clearRadius` needed no apply step, `walkSpeed` did, and that asymmetry survives the move
  into `modifiers`.** Radius and value are read fresh inside the tick that uses them, so a
  purchase takes effect on the next tick with no write anywhere. Walk speed lands on a
  `Humanoid` the engine owns, so `server-main` writes it — and `response.humanoidWritesAllowed`
  is exactly `["WalkSpeed"]`, which makes that the only Humanoid write in the game.
- **`plots.spawn` returns a `CFrame` and `plots.advance` returns a new one.** The spawn moves
  when the live bay moves: `traversal.death.respawnAt` is `"areaSpawn"`, and respawning a player
  who is 2,500 studs into the eighth bay at bay one's spawn point would be a walk the design
  never asks for. `plots.spawn.plotLocal` is `[0, 0, 8]` for bay 1; the general rule is
  `(0, 0, bays[k].zStart + 8)`, which **reproduces CID's number exactly at k = 1** and is the
  only reading under which the same +8 offset means the same thing in every bay.
  `[architect: derived]`, and routed back below.
- **`layout.areaSpec(areaOrdinal)` exists so nobody indexes `depths.areas` by hand.** Above
  ordinal 8 the row is `endgame.postTerminalArea`, which has the same fields with an empty
  `relicSlice`. Four modules need that row; three of them would have written the same
  `if k > 8` branch.
- **`entitlements.refresh` yields and `modifiers.effective` does not**, which is the whole
  reason they are two modules. Ownership is a web call; the factor arithmetic runs 8 times a
  second per player.
- **`pressables.bind` takes the callback rather than exposing an event**, so there is exactly
  one place a press becomes a decision, and it is in `input` where
  `input.verbs[buy].adjudicatedBy` puts it. `input.connect(gui)` returns the updater `bind`
  gave it, so `client-main` fans one snapshot out to four updaters and holds no handles.
- **`world.onCharacter` is separate from `world.configure`** because
  `social.characterCollision.appliedTo` is *"every BasePart of every character, on
  `CharacterAdded` and on every BasePart added to it thereafter"* — a per-character connection,
  not a boot setting. Folding it into `configure` would leave a limb added at runtime in the
  default collision group, which is how two characters start colliding again three months later.
- **Two of these entries are not functions.** `config.GameConfig` and `protocol.REMOTES` are
  tables the module returns. An exposed name with parentheses is a callable and must appear here
  with every parameter resolved; a bare name is data and appears here with `params: []` and its
  contents written out.

```manifest
{
  "provides": "interfaces",
  "value": [
    {
      "module": "config",
      "fn": "GameConfig",
      "params": [],
      "returns": "table — the module's own returned table, generated from BOTH manifests by `npm run architect -- --emit`. NOT A CALLABLE: requiring it IS this table, so a builder writes GameConfig.Depths.areas[3].patchCount and never GameConfig().Depths.",
      "note": "Every value either contract carries is reachable from here, in the spelling the emitter produces and the only spelling any module may use. The wave-1 blocks keep their hand-written names — Tiers, Upgrades, RelicSets, Currency, Patch, Area, BaseClearRadius, BaseWalkSpeed, RelicsPerArea, AreasPerDepth, FindNoun, GuaranteedFirstRelic, ClearTickRate, SaveIntervalSeconds, RespawnDelaySeconds, DataStoreName — and every wave-2 and wave-3 key is emitted whole under its own PascalCase name: Input, Tool, Response, Traversal, SetBonus, Depths, Layout, Plots, Endgame, Products, FirstSession, Social, Rarity, Economy, Discovery, Modifiers. LayoutSeed and MaxPlayers come from runtime. Constructs no Roblox type — no Color3, no Vector3, no Enum, no Instance — which is what lets the module load outside the engine; a builder finding one here has found a bug in the emitter rather than a value to use. No module may hand-write a tuned value, hold a copy of one, or reach a number by any path but this table."
    },
    {
      "module": "config",
      "fn": "upgradeCost(upgrade, level)",
      "params": [
        { "name": "upgrade", "type": "UpgradeDef", "note": "one entry of GameConfig.Upgrades, the table itself and not its id" },
        { "name": "level", "type": "integer", "meaning": "the level the player currently HOLDS, not the level being bought. The price of the first purchase is upgradeCost(def, 0) and equals def.costBase. The price of moving from level 3 to 4 is upgradeCost(def, 3)." }
      ],
      "returns": "integer — floor(costBase * costGrowth ^ level)",
      "note": "Generated. Do not reimplement the curve anywhere else. A purchase is legal only while the held level is strictly below def.maxLevel, so the highest price ever charged is upgradeCost(def, maxLevel - 1). firstSession.withheld.upgradeRow lifts row i when the balance reaches upgradeCost(def_i, 0), which is the same call with the same convention."
    },
    {
      "module": "config",
      "fn": "upgradeEffect(upgrade, level)",
      "params": [
        { "name": "upgrade", "type": "UpgradeDef", "note": "needs base, perLevel and mode" },
        { "name": "level", "type": "integer", "meaning": "the level currently HELD, same convention as upgradeCost. Effect at level 0 is def.base, which is the pre-upgrade value: 5.5 studs for radius, 16 for speed, 1.0 for value." }
      ],
      "returns": "number — base + perLevel * level when mode is \"additive\", base * perLevel ^ level when mode is \"compounding\"",
      "note": "STEP 1 OF modifiers.resolutionOrder, and the only place the additive-versus-compounding question is answered. modifiers.axes[].baseFrom says of all three axes that the base is 'already inside upgradeEffect', and modifiers.baseIsNotAppliedTwice forbids multiplying it in again — so modifiers.effective calls this ONCE and multiplies FACTORS onto its result. All three shipped upgrades are additive today, which is exactly why hand-inlining looks harmless and would silently ignore a future compounding axis."
    },
    {
      "module": "config",
      "fn": "tierByWeight(roll)",
      "params": [
        { "name": "roll", "type": "number", "meaning": "a uniform sample in [0, 1). Not a weight, not a tier index, and not pre-scaled by the weight total — the function scales it. It must come from layout's seeded stream; rarity.ladders[overgrowth-tier].rolled is true and rolledFrom is tiers[].weight." }
      ],
      "returns": "(integer, TierDef) — the 1-based index into GameConfig.Tiers, then the tier table",
      "note": "The integer is what goes into Patch.tierIndex; the table is for reading value, height and shape at the point of use. Storing the table in a Patch instead of the index is forbidden by 03-state-shape: re-emitting the config would leave stale names in live patches. rarity.depthRarityChannel wants these weights shifted toward the rare end per depth and rarity.depthRarityBlocker says tiers has no depth dimension, so there is ONE weight table for all four depths and adding a second is a revision to the tiers sheet, not a branch here."
    },
    {
      "module": "layout",
      "fn": "areaSpec(areaOrdinal)",
      "params": [
        { "name": "areaOrdinal", "type": "integer", "meaning": "the 1-based ordinal of an area in depths.areas. 1 is East Terrace. It is state.areasFinished + 1 at every call site in the game — depths.unlockRule is 'the area before it in this list is complete', which is that expression and nothing else. An ordinal above 8 is a post-terminal area." }
      ],
      "returns": "AreaSpec — { ordinal, depth, setId, label, relicSlice, footprintStuds2, chunkCount, patchCount, minSpacing, unlock }",
      "note": "For ordinal 1..8 this is depths.areas[ordinal] verbatim. For ordinal > 8 it is endgame.postTerminalArea with depth 4, setId 'spire', an EMPTY relicSlice, and the same footprint, chunkCount and patchCount as depths.areas[8] — endgame's own invariant requires those three to be equal. Exists so the `if ordinal > 8` branch is written once: plots, clearing, hud-binding and this module's own build() all need the row, and three of them would otherwise have written it themselves. The label for a post-terminal area is endgame.postTerminalArea.label ('Spire') and carries no ordinal and no number, per endgame.postTerminalArea.labelCarriesNoOrdinalOrNumber."
    },
    {
      "module": "layout",
      "fn": "build(areaOrdinal)",
      "params": [
        { "name": "areaOrdinal", "type": "integer", "meaning": "same convention as areaSpec: the 1-based area ordinal, which is state.areasFinished + 1. NOT a depth, NOT a chunk index and NOT a bay index — bays and areas happen to share their ordinals because plots.bays[k] holds depths.areas[k], and that coincidence is a fact about the lane, not about this function." }
      ],
      "returns": "{ Patch } — exactly areaSpec(areaOrdinal).patchCount records in a fixed canonical order",
      "note": "PLOT-LOCAL POSITIONS, in studs, with X in [-48, 48] and Z inside plots.bays[areaOrdinal]'s span; plots adds the slot origin and writes WORLD positions into state.patches. THE ARRAY INDEX IS THE PATCH'S DURABLE IDENTITY — state.cleared is keyed by it — so changing the order is a save migration, not a refactor. Composition, in order: (1) draw areaSpec.chunkCount variants without replacement from the depth family's layout.variantsPerFamily (16 = 8 chunks x 2 orientations), seeded by (GameConfig.LayoutSeed, areaOrdinal) and by NOTHING ELSE, honouring layout.repetitionRules R1 to R4; (2) lay them nose to tail inward along +Z, each layout.chunk.widthStuds x layout.chunk.depthStuds; (3) generate each chunk's anchors from hash(LayoutSeed, chunkId) and freeze them — layout.anchorSource says authored per chunk, and until authoring exists this is 'the same data by a cheaper route'; (4) roll each patch's tier from tierByWeight on a DISJOINT seeded stream, after placement, because rarity.findPlacementReadsTier and layout.findPlacement.mayReadPatchTier are both false; (5) split the chunk run into collection.relicsPerArea (3) contiguous groups of as-equal-as-possible length and bury exactly one Find in each, group g carrying areaSpec.relicSlice[0] + g - 1, per layout.findPlacement.rule. TWO CONSTRAINTS ON AREA 1 ONLY: layout.findPlacement.onboardingOverride puts group 1's Find on the patch nearest the plot origin, and firstSession.placement requires that patch to be at most 3.5 studs from the spawn point (movement.baseClearRadius - firstSession.armDistanceStuds), the second Find between spawn-distance ordinals 8 and 40, and at least two distinct tierIndex values inside the first 20 ordinals. Reads no player, no state and no clock. Takes no slot: every lane has the same layout, which is what makes state.cleared portable across a rejoin."
    },
    {
      "module": "protocol",
      "fn": "REMOTES",
      "params": [],
      "returns": "table — the seven channels below, keyed by name, each with its class, direction, payload and the one module that originates it. NAMES AND CLASSES, NOT INSTANCES: protocol.channel(name) returns the Instance.",
      "note": "A TABLE, NOT A CALLABLE. Exactly seven, and no more. THE TWO CLIENT-TO-SERVER NAMES ARE input.clientOriginatedRemotes VERBATIM — RequestState and BuyUpgrade — and this module's first criterion checks the two lists against each other in both directions, which is what makes 'the client surface is closed' a merge property rather than a promise. There is deliberately no clearing channel and no currency channel: the server observes clearing on a tick, so there is nothing for a client to claim, and economy.authority says no client message carries a cost, an amount or a balance. Two channels are new since wave 1 and both come from response: setComplete and areaComplete are distinct beats on the notice channel with their own budgets, and response.channelExclusivity forbids either sharing atPatch with a reveal; upgradePurchased has a 200 ms acknowledgment budget and input.verbs[buy].onPreconditionFail is silentNoOp, so a client cannot tell an accepted purchase from a dropped one by diffing snapshots. NO PAYLOAD CARRIES A PLAYER IDENTIFIER OTHER THAN THE RECIPIENT'S — social.forbidden X7 — and none carries a player-authored string, which is X9.",
      "channels": [
        { "name": "RequestState", "class": "RemoteFunction", "direction": "client -> server", "payload": "no arguments; returns one snapshot", "firedBy": "client-main", "handledBy": "server-main, which sets OnServerInvoke at boot", "why": "client-main may not assume the join-time push arrived, so it pulls once after its updaters are live" },
        { "name": "StateChanged", "class": "RemoteEvent", "direction": "server -> client", "payload": "one snapshot, exactly the fields snapshotShape() names", "firedBy": "server-main on join, on spawn and after a successful purchase; clearing once per tick in which anything changed", "handledBy": "client-main, which fans it out to every updater", "why": "TWO ORIGINATORS, deliberately and safely: it carries a whole snapshot rather than a delta, so a duplicate is idempotent. currency, clearedCount, found and areasFinished only ever change inside the tick, so without clearing firing it the readouts sit frozen until the next purchase." },
        { "name": "BuyUpgrade", "class": "RemoteEvent", "direction": "client -> server", "payload": "one upgrade id string and nothing else", "firedBy": "input", "handledBy": "server-main, wiring.onPurchase", "why": "one of the two client-originated messages in the game, and the only one a player's input produces — input.clientRemotesFiredByPlayerInput is exactly [BuyUpgrade]. The server prices it." },
        { "name": "FindRevealed", "class": "RemoteEvent", "direction": "server -> client", "payload": "one Find name string, from Patch.find", "firedBy": "clearing", "handledBy": "beats, as response.beats[findReveal]: rank 1, 300 ms acknowledgment budget, channels atPatch and audio, notice FORBIDDEN, queued, 2.5 s dwell", "why": "up to collection.relicsPerArea (3) times per area, per player, and never for a post-terminal area" },
        { "name": "SetCompleted", "class": "RemoteEvent", "direction": "server -> client", "payload": "one collection.sets[].id string", "firedBy": "clearing", "handledBy": "beats, as response.beats[setComplete]: rank 2, 400 ms budget, channels notice and audio, queued", "why": "exactly once per player per set, on the sixth Find of that set — response.beats[setComplete].cause is sixthFindOfSetRevealed. A separate channel from FindRevealed because response.channelExclusivity puts them on two channels and gameplay/core-loop/03 rejects carrying one on the other behind a string prefix." },
        { "name": "AreaRestored", "class": "RemoteEvent", "direction": "server -> client", "payload": "the area label string from layout.areaSpec(ordinal).label", "firedBy": "clearing", "handledBy": "beats, as response.beats[areaComplete]: rank 3, 400 ms budget, channels notice and audio, atPatch FORBIDDEN, queued", "why": "exactly once per player per area, on the latch transition only — response.beats[areaComplete].cause is lastStandingPatchCleared. A post-terminal area fires it too: endgame.survivingPayoffKinds includes areaCompletion." },
        { "name": "UpgradeApplied", "class": "RemoteEvent", "direction": "server -> client", "payload": "one upgrade id string and the new held level", "firedBy": "server-main", "handledBy": "beats, as response.beats[upgradePurchased]: rank 4, 200 ms budget, channels readout and audio, queued, effectAppliedBeforeAcknowledgment true", "why": "fired ONLY on a successful purchase. input.verbs[buy].onPreconditionFail is silentNoOp, so a failed buy produces no packet at all — which is exactly why success needs one: recovering the event by diffing two snapshots makes a 200 ms budget unmeasurable." }
      ]
    },
    {
      "module": "protocol",
      "fn": "createRemotes()",
      "params": [],
      "returns": "Folder — the runtime-created remotes folder, holding one Instance per channel",
      "note": "SERVER ONLY, called exactly once, by server-main at boot before any player can join. Creates a Folder named \"Remotes\" at tree.remotesRoot — deliberately NOT under tree.sharedRoot, because that Folder is Rojo-managed and these Instances are made at runtime — then one RemoteEvent or RemoteFunction per entry of REMOTES, with the class taken from that table. Errors if called from a client. Idempotent on the server: a second call creates nothing and returns the existing Folder. Connects no handler; server-main connects BuyUpgrade and RequestState itself."
    },
    {
      "module": "protocol",
      "fn": "channel(name)",
      "params": [
        { "name": "name", "type": "string", "note": "a key of REMOTES, taken from that table rather than hand-typed wherever the call site can reach it" }
      ],
      "returns": "RemoteEvent | RemoteFunction — the live Instance for that channel",
      "note": "THE ONLY PATH FROM A NAME TO A REMOTE INSTANCE, on both sides, for every module. Errors on a name REMOTES does not declare — it never warns and returns nil, because the thing it replaces did exactly that. Resolves the remotes Folder once with WaitForChild on the first call and caches it: a client may call before the server's boot step has replicated, a server caller cannot, since createRemotes ran first. Does no work at require time. A recursive FindFirstChild for a remote is forbidden anywhere in the build, and so is any WaitForChild on a remote outside this module."
    },
    {
      "module": "protocol",
      "fn": "snapshotShape()",
      "params": [],
      "returns": "{ string } — the ordered field names a snapshot carries",
      "note": "Exactly currency, upgrades, rowsRevealed, found, areasFinished, clearedCount, areaPatchCount, areaLabel. A SNAPSHOT IS NOT A PlayerState: patches, cleared, spawnPivot, owned, armState and player never cross the wire — patches and cleared are hundreds of entries the HUD has no use for, owned would put a purchase on the wire for no reader, and player is not serialisable. The last two fields are DERIVED and are on the wire because the client would otherwise need depths and endgame to draw a progress bar: areaPatchCount is layout.areaSpec(areasFinished + 1).patchCount and areaLabel is that row's label. Both sides build and read the payload from this list rather than repeating field-name literals. NOTHING HERE NAMES ANOTHER PLAYER — social.forbidden X7 — and nothing here is a player-authored string, which is X9."
    },
    {
      "module": "modifiers",
      "fn": "effective(state, axis)",
      "params": [
        { "name": "state", "type": "PlayerState", "note": "read for upgrades, found and owned, and written never. This function is pure." },
        { "name": "axis", "type": "string", "note": "exactly one of \"value\", \"radius\", \"speed\". modifiers.axisIdsJoinUpgrades: axes[].id is upgrades[].id verbatim, and 'Pace is a label and never an id'. Any other string is an error, not a fallback." }
      ],
      "returns": "number — the axis's effective value: a multiplier for value, studs for radius, studs per second for speed",
      "note": "THE ONE IMPLEMENTATION — modifiers.singleDefinition. modifiers.composition writes it out: clamp(upgradeEffect(axis, heldLevel) * PROD(setFactors(axis)) * PROD(purchaseFactors(axis)), ceilingRule). FOUR STEPS, IN modifiers.resolutionOrder AND IN NO OTHER ORDER: (1) config.upgradeEffect(def, state.upgrades[axis] or 0) — this ALREADY CONTAINS upgrades[axis].base and modifiers.baseIsNotAppliedTwice forbids multiplying it in again; (2) multiply by every set factor on this axis, for every set in collection.sets whose six names are all true in state.found, in collection declaration order — setBonus.rows says WHICH axis each set targets and setBonus.invariants forbids a row carrying a magnitude, so an absent factor is 1.0 and modifiers warns once at boot naming the four sets, WHICH MEANS A COMPLETED SET CURRENTLY CHANGES NOTHING; (3) multiply by products.items[].factor for every item whose axis matches and whose id is true in state.owned, in offer-ladder order — every gamePassId is null today so this step is currently empty too; (4) clamp ONCE against ceiling(axis, state.areasFinished + 1), never between two sources — modifiers.clampApplication. Derives set completion from state.found on EVERY CALL and caches nothing: modifiers.sources[set-completion].storage is 'derived from discovery.record at every read; never latched, never persisted', which is why there is no setsComplete field to go stale. Never yields. Never writes. Called by clearing (radius and value, every tick), by server-main (speed, on spawn and after a purchase) and by tool (radius, on spawn and after a purchase), and by no client module."
    },
    {
      "module": "modifiers",
      "fn": "ceiling(axis, areaOrdinal)",
      "params": [
        { "name": "axis", "type": "string", "note": "\"value\", \"radius\" or \"speed\"" },
        { "name": "areaOrdinal", "type": "integer", "meaning": "the 1-based area ordinal the ceiling is being evaluated for — state.areasFinished + 1 at every live call site. It is a parameter because modifiers.axes[radius].ceilingRule is 'effective < area.size / 2' and products.headroom.ceilings.radius is 'min over depths of (area.size(N) / 2)', so the rule is per area even though every area is the same lane width today." }
      ],
      "returns": "number? — the ceiling for that axis, or nil when the axis has none",
      "note": "modifiers.axes[value].ceilingRule is null with the reason 'a currency multiplier breaks no invariant', so this returns nil for value and the clamp is skipped. radius: area.size / 2 = 60, which is plots.laneWidthStuds / 2 and the same number by both routes — beyond it 'one position clears the whole area and a lap stops existing'. speed: movement.baseClearRadius / runtime.clearTickRate = 5.5 / 0.12 = 45.83 — beyond it 'the player outruns the tool between ticks and patches are never cleared'. Also the input to the boot-time headroom assertion: products.headroom.rule requires ladderMax(A) * every set factor * every product factor to stay at or below products.headroom.marginFraction (0.9) times this, for every axis and every depth, and products.headroom.clampMayAbsorbAPurchase is false — so a configuration where the clamp would eat a purchased factor is a boot-time warning, not a silent flatline."
    },
    {
      "module": "persistence",
      "fn": "load(player)",
      "params": [
        { "name": "player", "type": "Player" }
      ],
      "returns": "PlayerState — every persisted field populated AND RECONCILED; patches empty, owned empty, armState blank and player unset",
      "note": "Never throws and never returns nil. On a DataStore failure it warns and returns defaultState(), so the player is playable on a fresh session rather than stuck. It yields; server-main must not insert the state into the live collection until it has returned. Reads under runtime.dataStoreName, keyed by the player's UserId. RECONCILES BEFORE RETURNING, in this order: clamp areasFinished at 0 and below; drop any key of cleared at or above layout.areaSpec(areasFinished + 1).patchCount, with one warning, because the live area may have changed size between versions and a stale index would mark a patch that is not there; then set clearedCount from the number of keys in cleared, comparing the stored value and warning on a mismatch rather than trusting it; then fill any missing rowsRevealed key with false and any missing found key with false. Every caller may therefore assume, for any state this function returns: #cleared == clearedCount, clearedCount < the live area's patchCount, and every key of upgrades, rowsRevealed and found exists. THERE IS NO v1 READER — runtime.storeVersionHistory says why, and the store name is different so no v1 payload is reachable."
    },
    {
      "module": "persistence",
      "fn": "save(player, state)",
      "params": [
        { "name": "player", "type": "Player" },
        { "name": "state", "type": "PlayerState" }
      ],
      "returns": "boolean — true if the write was accepted",
      "note": "Writes exactly the seven persisted fields of 03-state-shape and nothing else. NO COLLAPSE IS NEEDED ANY MORE, and that is the point: cleared describes the LIVE area only and is emptied by clearing as part of incrementing areasFinished, so the payload is bounded by the largest single area's patchCount (640) whatever the player has done, and this function has no conditional branch in it at all. The wave-1 shape emptied cleared on the way out and refilled it on the way in, and the trial-3 defect was that nothing refilled it. Removing the collapse removes the class. THE PAYLOAD CONTAINS NO PURCHASE-DERIVED STATE — products.F20 — no set-completion flag, and no per-area boolean; endgame.persistence.postTerminalAreasStoredAs is 'one integer count' and areasFinished is it. Yields. Idempotent."
    },
    {
      "module": "persistence",
      "fn": "defaultState()",
      "params": [],
      "returns": "PlayerState — the opening balance",
      "note": "currency 0 (economy.startingBalance), upgrades an empty map (a missing key reads as level 0), rowsRevealed an empty map (every row starts withheld — firstSession.withheld.upgradeRow.presentAtJoin is false), found an empty map, areasFinished 0, cleared an empty map, clearedCount 0, patches an empty array, spawnPivot nil, owned an empty map, armState { character = nil, armed = false }, player nil. THIS IS THE ONLY CONSTRUCTOR: no other module may build a PlayerState literal, and wiring.constructs names it. economy.zeroCreditEvents[session-start] is explicit that there is no welcome grant, no return grant and no offline accrual, so 0 is 0. Does not yield and does not touch a DataStore, so load can call it on failure."
    },
    {
      "module": "progression",
      "fn": "award(state, amount)",
      "params": [
        { "name": "state", "type": "PlayerState" },
        { "name": "amount", "type": "integer", "meaning": "a positive whole number of currency to ADD to the balance. Not a new total, and ALREADY MULTIPLIED by modifiers.effective(state, 'value') by the caller — award applies no multiplier of its own. economy.faucets[patch-clear].multiplierAppliedOnce is 'at this site only; never again inside the award function', and modifiers.forbidden bans applying it in both places." }
      ],
      "returns": "number — the new balance",
      "note": "The only function that increases currency, and clearing is its only caller — economy.faucetCount is 1. Rejects a non-positive amount rather than clamping, because clearing's minimum payout is economy.payoutFloor (1). Calls revealRows(state) after crediting, so a row lifts on the tick the balance crosses its threshold rather than on the next purchase attempt. Does not cap: economy.balanceCap is null."
    },
    {
      "module": "progression",
      "fn": "tryBuy(state, upgradeId)",
      "params": [
        { "name": "state", "type": "PlayerState" },
        { "name": "upgradeId", "type": "string", "note": "one of the ids in upgrades: value, radius, speed. Sent by the client as a bare string and validated here; never a cost, never a level, never a target." }
      ],
      "returns": "boolean — true only if currency was deducted and the level incremented",
      "note": "Reads the held level from state.upgrades[upgradeId], treating nil as 0; prices it with config.upgradeCost(def, heldLevel); on success deducts exactly that and increments the level by exactly 1. Returns false and changes NOTHING if the id is unknown, if the held level already equals def.maxLevel, or if state.currency is below the cost — economy.sinks[0].onInsufficientFunds is 'nothing changes, nothing is deducted, no partial purchase exists' and refundable is false. THE FAILURE IS SILENT: input.verbs[buy].onPreconditionFail is silentNoOp and input.pressable.rejectionCueOnFailedPrecondition is 'none', so server-main sends nothing at all on a false return. economy.sinkCount is 1 and this is it."
    },
    {
      "module": "progression",
      "fn": "revealRows(state)",
      "params": [
        { "name": "state", "type": "PlayerState" }
      ],
      "returns": "boolean — true if any row lifted on this call",
      "note": "For each upgrades[] entry i, sets state.rowsRevealed[id] = true when state.currency is at or above config.upgradeCost(def_i, 0) — firstSession.withheld.upgradeRow.liftedBy is 'balance has reached upgrades[i] level-1 cost'. NEVER SETS ONE FALSE: firstSession.suppressionForbidden lists reSuppression, so a row that has appeared stays. Called by award after every credit, and once by server-main in onJoin so a returning player's rows are consistent with a balance that may have moved in a previous version. Writes nothing else."
    },
    {
      "module": "entitlements",
      "fn": "refresh(player, state)",
      "params": [
        { "name": "player", "type": "Player" },
        { "name": "state", "type": "PlayerState", "note": "written for owned, and for nothing else" }
      ],
      "returns": "nil",
      "note": "YIELDS. One products.ownershipCheck call — UserOwnsGamePassAsync(userId, gamePassId) — per products.items[] entry, wrapped in pcall, writing state.owned[id] = true or false. Called once per join, in wiring.onJoin, BEFORE the state enters the live collection: modifiers.effective reads state.owned on every tick and a state published with an empty owned map would pay the unpurchased multiplier for as long as the web call took. EVERY products.items[].gamePassId IS NULL TODAY, so every entry short-circuits to false without a web call and the whole function is currently free — see 02-modules.md, which routes the missing ids back. A failed or timed-out check warns once and resolves to false; a player is never blocked from playing by a monetization call. Writes nothing to persistence, ever — products.F20 — and calls no prompt: products.F13 restricts PromptGamePassPurchase to an explicit activation of a store control, and input declares no such control."
    },
    {
      "module": "plots",
      "fn": "claimSlot()",
      "params": [],
      "returns": "integer — the lowest free 1-based slot index",
      "note": "Called by plots.spawn, not by server-main. plots.slotClaiming is lowestFreeIndex and plots.slotsAreContiguousWhileOccupied is true, so a vacated slot is reused before a higher one is allocated. Slot n's lane origin is (plots.slotOrigin) = (area.originXZ[1] + (n - 1) * plots.pitchStuds, 0, area.originXZ[2]): one row along plots.rowAxis (+X) at a pitch of 122. THE PITCH AND THE SLAB WIDTH ARE THE SAME NUMBER, 122, so consecutive slabs share an edge and there is no air between two lanes at any index; the walkable lane is plots.laneWidthStuds (120) and the remaining 2 studs are the inter-plot boundary, which plots.pitchRule caps at 8. 122 is at or below social.maxCoPresenceSeparationStuds (128), which is plots's own first invariant and the only reason the pitch is not larger. A slot's position is a function of its index alone and never of the live player count. Exposed so slot reuse is testable without building 640 parts. plots.plotTenure: claimed on PlayerAdded, held for the whole connected session, released on PlayerRemoving, slotReservedOnLeave false, rejoinSlot any-free."
    },
    {
      "module": "plots",
      "fn": "releaseSlot(n)",
      "params": [
        { "name": "n", "type": "integer", "meaning": "a slot index previously returned by claimSlot, being returned to the free pool. Not a player count and not a plot Instance. Releasing an index that is not currently taken is a no-op, not an error." }
      ],
      "returns": "nil",
      "note": "Called by plots.despawn. The free pool hands back the lowest free index first."
    },
    {
      "module": "plots",
      "fn": "spawn(player, state)",
      "params": [
        { "name": "player", "type": "Player" },
        { "name": "state", "type": "PlayerState", "note": "read for areasFinished and cleared, written for patches and spawnPivot" }
      ],
      "returns": "CFrame — the live bay's spawn point, the WorldCFrame of the lane's spawn Attachment",
      "note": "Claims a slot, then builds the lane for a player whose live area is state.areasFinished + 1: the slab spanning plots.pitchStuds across and from 12 studs outward of bay 1 to 12 studs inward of the live bay's end (traversal.boundary.walkableMarginStuds), the four boundary parts, the spawn Attachment, and ONE INSTANCE PER PATCH THAT state.cleared DOES NOT MARK, IN THE LIVE BAY ONLY. plots.liveGeometry: patchInstancesExistIn 'the live bay only', groundExistsIn 'every bay from 1 up to and including the live bay', builtWhole true. Every bay below the live one is bare walkable floor with no patch Instance and no patch record — which is what makes 'cleared is permanent' structural rather than latched, and is why no rejoin can pay for a finished area a second time. Writes state.patches (records for the LIVE bay only, cleared ones kept with instance nil so indices stay aligned with layout's order) and state.spawnPivot. Converts layout's plot-local positions to WORLD by adding the slot origin, and it is the ONLY place that conversion happens. Sizes and properties are fixed in representation. Calling it twice for one player without a despawn between is a bug, not a second lane."
    },
    {
      "module": "plots",
      "fn": "advance(state)",
      "params": [
        { "name": "state", "type": "PlayerState", "note": "read for the NEW areasFinished, which clearing has already incremented; written for patches and spawnPivot" }
      ],
      "returns": "CFrame — the new live bay's spawn point",
      "note": "CALLED BY clearing, FROM INSIDE THE TICK, ON THE PASS THAT FINISHES AN AREA, AND FROM NOWHERE ELSE. plots.liveGeometry.bayBuiltAt is 'the instant the previous bay's last patch clears', so this is not a deferred job. In order: destroy every patch Instance of the bay just finished (there are none left standing, but the records go); extend the slab inward to cover the new live bay plus traversal.boundary.walkableMarginStuds; move the inward boundary part to the new end; build layout.build(state.areasFinished + 1)'s patch Instances, all of them, since state.cleared was emptied with the increment; rewrite state.patches and state.spawnPivot; move the spawn Attachment to the new bay's spawn point, (0, 0, plots.bays[k].zStart + 8) in plot-local — the same +8 plots.spawn.plotLocal gives bay 1. DESTROYS NOTHING A PLAYER IS STANDING ON: the floor is only ever extended, never shortened. plots.liveGeometry.torndownBeyond talks about tearing bays down beyond the live one minus two and rebuilding them BARE on re-entry; a finished bay in this build IS bare — it holds ground and nothing else — so there is nothing to tear down and the ground invariant wins. That changes the day Art dresses a bay, and the rule acquires a subject then."
    },
    {
      "module": "plots",
      "fn": "despawn(state)",
      "params": [
        { "name": "state", "type": "PlayerState" }
      ],
      "returns": "nil",
      "note": "Destroys the lane for state.player, clears state.patches and state.spawnPivot, and releases the slot internally via releaseSlot. Recovers the slot from its own registry keyed by UserId — PlayerState carries no slot field and must not gain one. Does not save: server-main calls persistence.save before this. social.plotTenure.onLeaveMidArea: 'the plot instance tree is destroyed and the slot freed; the partial cleared set survives only in the leaving player's own save; nothing about the departure is perceptible to any remaining player' — so no notice, no sound and no string, which is social.forbidden X11."
    },
    {
      "module": "tool",
      "fn": "equip(player, state)",
      "params": [
        { "name": "player", "type": "Player" },
        { "name": "state", "type": "PlayerState", "note": "read for upgrades and owned, through modifiers.effective; written never" }
      ],
      "returns": "nil",
      "note": "Builds ONE Model — tool.count is 1, tool.instanceClass is Model, tool.isRobloxToolInstance is false and tool.entersBackpack is false — and welds it to the character's RightHand attachment (tool.attachment). tool.grantedAt is 'spawn', so this is called from wiring.onSpawn on every character including the one that follows a death, and the previous character's tool goes with the previous character. Every part is massless, CanCollide false, CanTouch false and CanQuery false (tool.canCollide, canTouch, canQuery, massless). It writes no Humanoid property (tool.writesHumanoidProperties false), carries no ParticleEmitter (tool.particleEmitters 0), plays no animation (tool.animates false) and clears nothing (tool.clearsOnContact false). Then calls refresh."
    },
    {
      "module": "tool",
      "fn": "refresh(player, state)",
      "params": [
        { "name": "player", "type": "Player" },
        { "name": "state", "type": "PlayerState" }
      ],
      "returns": "nil",
      "note": "Sets the head's width, which is the ONE appearance channel — tool.appearanceChannel is headWidth and tool.changesWithAxes is exactly ['radius'], tool.unaffectedByAxes exactly ['value', 'speed']. THE WIDTH RESOLVES FROM EFFECTIVE RADIUS, NOT FROM THE REACH LEVEL: products.items[span].deliverable says so in as many words — 'requires tool head width to resolve from effective radius, not Reach level' — because Span is a multiplicative factor and a level-only reading would make a 499-Robux product invisible. The formula is tool.headWidthBaseStuds + tool.headWidthPerLevelStuds * equivalentLevels, where equivalentLevels = (modifiers.effective(state, 'radius') - upgrades[radius].base) / upgrades[radius].perLevel — that is, the number of Reach levels the effective radius is worth, which is the held level exactly when no factor applies and more when one does. 1.2 studs at base, 0.35 wider per equivalent level. Called by tool.equip and by server-main after a successful purchase, and by nothing on a tick: the width changes only when a level or an entitlement changes."
    },
    {
      "module": "clearing",
      "fn": "tick(states)",
      "params": [
        { "name": "states", "type": "map<UserId, PlayerState>", "meaning": "the WHOLE live collection, one entry per connected player, keyed by UserId as an integer. Not an array, not keyed by Player, and not one player's state. See stateShape.collection." }
      ],
      "returns": "nil",
      "note": "One pass, in this order, per state. (1) THE ARMING GATE, FIRST: if state.armState.character is not state.player.Character, rewrite armState as { character = the current character, armed = false } — that is how firstSession.armScope 'perCharacterSpawn' resets without a second module writing the field. Skip the state if the character or its HumanoidRootPart is absent. If not armed, test the horizontal XZ distance from state.spawnPivot; if it exceeds firstSession.armDistanceStuds (2.0), set armed true; if it does not, RETURN FOR THIS STATE — no distance work, no clear, no award, no packet. firstSession.armMeasuredOn is 'server, horizontal XZ displacement of the character root from the plot spawn pivot' and this is that sentence. (2) Read radius once with modifiers.effective(state, 'radius'). (3) For every record in state.patches with cleared false whose XZ distance to the root part is within radius — XZ only, so height never affects reach: set patch.cleared, destroy patch.instance and nil the field, set state.cleared[index], increment state.clearedCount, and call progression.award with max(economy.payoutFloor, floor(tiers[patch.tierIndex].value * modifiers.effective(state, 'value'))), which is economy.faucets[patch-clear].formula verbatim and is the ONLY site the value multiplier is applied — economy.faucets[patch-clear].rounding is 'floor, never round-half-up'. If patch.find is set and state.found[patch.find] is not, set it and fire FindRevealed; then, if every name in that Find's set is now true, fire SetCompleted once with the set id. (4) After the loop, if clearedCount >= layout.areaSpec(state.areasFinished + 1).patchCount: increment state.areasFinished by exactly 1, EMPTY state.cleared, set clearedCount to 0, call plots.advance(state) and fire AreaRestored once with the finished area's label. (5) Finally, if the pass changed anything, fire StateChanged once with a fresh snapshot — at most one per player per tick, none on a pass that cleared nothing. Every channel through protocol.channel(name). Never reads a client message; never uses Touched. THERE IS NO AREA-COMPLETE LATCH TO CHECK: a finished bay has no record in state.patches, so step 3 has nothing to iterate over it, which is why the wave-1 rejoin farm cannot recur."
    },
    {
      "module": "clearing",
      "fn": "start(states)",
      "params": [
        { "name": "states", "type": "map<UserId, PlayerState>", "meaning": "the same live collection tick receives, captured once. Held by reference: server-main mutates the same table as players join and leave, and clearing never copies it." }
      ],
      "returns": "nil",
      "note": "Installs the runtime.clearTickRate loop (0.12s) and returns immediately. Called once by server-main at boot, before any player can join, so an empty collection on the first ticks is normal. Wraps each tick in a pcall and warns: an error in one iteration may not stop the loop. Owns the cadence, so no other module reads runtime.clearTickRate — except modifiers.ceiling, which reads it as a NUMBER to compute the speed ceiling and never as a cadence."
    },
    {
      "module": "world",
      "fn": "configure()",
      "params": [],
      "returns": "nil",
      "note": "SERVER ONLY, called once, as the FIRST step of boot — before protocol.createRemotes, because a character may not spawn into a place whose collision groups do not exist. In order: (1) register the collision group named by social.characterCollision.groupName and set both rows of social.characterCollision.collidable — Characters vs Characters false, Characters vs Default true, so two players walk through each other and both stand on a slab (social.characterCollision.playerVsPlayer false, traversal.collision.playerVsWorld true, traversal.collision.playerVsPlayerOwner names social); (2) disable chat — ChatWindowConfiguration.Enabled false and BubbleChatConfiguration.Enabled false on TextChatService's children, which is a WRITE and not an omission, because social.chat.overridesPlatformDefault records that the window defaults to true; (3) READ Players.MaxPlayers and warn, once, naming social.maxPlayers, if it is outside 12 to 20 — social.maxPlayers.scriptSettable is false and runtime.placeConfiguration records that the setting belongs to whoever publishes the place. THIS FUNCTION IS THE ANSWER TO 'social HAS NO EMITTER PATH': everything social decides except the player cap is executed here, at runtime, by a named module."
    },
    {
      "module": "world",
      "fn": "onCharacter(character)",
      "params": [
        { "name": "character", "type": "Model", "note": "the character Model from CharacterAdded" }
      ],
      "returns": "nil",
      "note": "Sets every BasePart of the character into the collision group, and connects DescendantAdded so a part added later gets it too — social.characterCollision.appliedTo is 'every BasePart of every character, on CharacterAdded and on every BasePart added to it thereafter', and the second clause is why this is a connection rather than a loop. Called by server-main in wiring.onSpawn, before the pivot. Sets no Humanoid property and no Health: traversal.death.healthWrittenByGameCode is false, traversal.death.damageSources is 0, and response.humanoidWritesAllowed is exactly ['WalkSpeed'], which belongs to server-main."
    },
    {
      "module": "hud-binding",
      "fn": "bind(root, gui)",
      "params": [
        { "name": "root", "type": "GuiObject", "note": "what UIBuilder.build returned: the HUD's Root frame" },
        { "name": "gui", "type": "ScreenGui", "note": "the ScreenGui root sits in, for screen-level state such as Enabled" }
      ],
      "returns": "(snapshot) -> () — an updater the caller invokes with every snapshot",
      "note": "Resolves its node paths ONCE at bind time and closes over them, so an unresolved name warns once rather than on every snapshot. The node paths are fixed by the emitted screen: Cluster_topRight.Readout_SHARDS.ReadoutValue.Text takes the balance; Cluster_topLeft.Readout_RELICS.ReadoutValue.Text takes the collection count; Cluster_bottomRight.Readout_<n><LABEL UPPERCASED>.ReadoutValue.Text takes \"Lv <held level>  ·  <config.upgradeCost(def, held level)>\" for the nth entry of upgrades; Cluster_bottomLeft.ProgressGroup.BarLabel.Text takes \"<snapshot.areaLabel uppercased> — <percent>% CLEAR\"; and ProgressGroup.Bar.BarFill.Size takes UDim2.fromScale(clearedCount / snapshot.areaPatchCount, 1), tweened rather than set. WITHHOLDING, per firstSession.withheld, and every rule about HOW comes from firstSession.suppressionForbidden: the collection count is present at join reading \"0\" with NO DENOMINATOR, and the denominator appears at the first reveal, latched on 'the collection map is non-empty', with no lift animation, no lift sound, no new badge and NO REFLOW of anything around it; an upgrade row is absent until snapshot.rowsRevealed says otherwise, and is never re-suppressed; the currency readout and the area progress are present at join reading 0 and 0%. No padlock, no greyed row, no question mark, no unknown-denominator form, no explanatory tooltip and no percent form of the collection count. Affordability is signalled by text as well as colour — input.pressable.affordabilityByColourAlone is false. Authors no structure and creates no Instance except a Tween."
    },
    {
      "module": "pressables",
      "fn": "bind(gui, onActivate)",
      "params": [
        { "name": "gui", "type": "ScreenGui", "note": "the HUD ScreenGui client-main created. The four buttons are parented inside it." },
        { "name": "onActivate", "type": "(role: string, index: number) -> ()", "note": "called on an ACCEPTED press. role is \"purchase\" or \"index\", exactly the two entries of input.pressable.roles. For \"purchase\", index is the 1-based position in GameConfig.Upgrades — input.pressable.roles[purchase].boundTo is 'upgrades declaration order', so 1 is Value, 2 is Reach, 3 is Pace. For \"index\", it is always 1. THIS ARGUMENT IS THE SEAM THAT REPLACES Enum.KeyCode.One: the button decides that a press happened, input decides what it means." }
      ],
      "returns": "(snapshot) -> () — an updater the caller invokes with every snapshot",
      "note": "THE ONE FUNCTION IN THIS BUILD THAT AUTHORS UI STRUCTURE, and it authors exactly four TextButtons — input.gameDrawnPressables is 4 and input.pressable.roles is three purchase plus one index. It exists because ui-forge's hud-overlay pattern ships no pressable readout; that is a default rather than an incapability, and the day it grows one this function resolves four node names instead of creating four Instances, with no other change anywhere. Names, sizes and properties are fixed in representation under `pressable`. RULES, ALL FROM input.pressable: one activation per press (activationsPerPress 1) with a 0.35 s debounce; no hold and no chord (holdRequired false, chordRequired false); NO REJECTION CUE when the precondition fails (rejectionCueOnFailedPrecondition 'none', and input.verbs[buy].onPreconditionFail is silentNoOp) — an unaffordable press does nothing, shows nothing and plays nothing; not smaller than the platform jump button (minTouchTargetRule) and never overlapping a platform control region (mayOverlapPlatformControlRegions false); gamepad-selectable; a keyboard accelerator is ALLOWED and NOT REQUIRED, so 1/2/3 may exist beside the buttons and may never be the only path. The updater applies affordability — by text and not by colour alone — and row visibility from snapshot.rowsRevealed, appearing a button without moving the other three (firstSession.suppressionForbidden bans reflowOnLift). Both roles are persistent: the buttons are created once and survive a respawn."
    },
    {
      "module": "index-screen",
      "fn": "bind(gui)",
      "params": [
        { "name": "gui", "type": "ScreenGui", "note": "the HUD ScreenGui; the collection surface is a frame inside it, created hidden" }
      ],
      "returns": "(snapshot) -> () — an updater the caller invokes with every snapshot",
      "note": "Draws the 24 names of collection.sets grouped under the four set labels. THE SET HEADING IS THE ONLY PLACE A SET IS LEGIBLE — rarity.ladders[find-set].legibilityChannel is 'the set heading on the collection surface, and nothing on the object' and perObjectVisualGrade is false. An unfound name is an empty slot with its heading and NOTHING ELSE: no padlock, no greyed row, no question mark (firstSession.suppressionForbidden), and no rarity colour, frame, glow, border, sparkle or badge (rarity.forbidden, which lists all six). No count, no duplicate, no timestamp, no condition, no isNew — discovery.record.forbiddenFields, all fifteen. The whole surface is absent at join and appears at the first reveal, latched on 'the collection map is non-empty' with newSaveFields 0 — firstSession.withheld.collectionPanel — so its presence is derived from the snapshot's found map and nothing is stored for it."
    },
    {
      "module": "index-screen",
      "fn": "toggle()",
      "params": [],
      "returns": "nil",
      "note": "Called by input when the index pressable is activated, and by nothing else — input.verbs[openIndex].adjudicatedBy is 'client', which is why this is a direct call and not a remote. Opening it suspends movement and closing it restores it: input.pressable.indexScreenSuspendsMovement is true. THAT DOES NOT CONTRADICT response.controlEverAffected BEING FALSE: response governs BEATS — what a payoff may do to a player — and every beat's controlAffected is false and response.lockoutsSeconds is 0. This suspension is caused by the player's own press and ends on their next press, so nothing the game does to the player ever takes control away. Stated because two builders would otherwise have to decide which key wins."
    },
    {
      "module": "input",
      "fn": "connect(gui)",
      "params": [
        { "name": "gui", "type": "ScreenGui", "note": "the HUD ScreenGui, passed straight to pressables.bind" }
      ],
      "returns": "(snapshot) -> () — the updater pressables.bind returned, passed through so client-main holds no handle",
      "note": "Calls pressables.bind(gui, onActivate) once and installs the handler. On role \"purchase\" with index i: read the id of GameConfig.Upgrades[i] and fire protocol.channel(\"BuyUpgrade\"):FireServer(id) — ONE STRING AND NOTHING ELSE, no cost, no level, no target, because economy.authority is 'server only' and input.verbs[buy].adjudicatedBy is 'server'. On role \"index\": call index-screen.toggle(), locally, with no packet. THE SHIPPED FILE BINDS Enum.KeyCode.One, Two AND Three AND IS SUPERSEDED: input.gameBoundInputClasses is exactly ['pressable'], input.travelRequiredToPurchase is 'none' and input.worldObjectsTriggeringAVerb is 0, so the purchase surface is a button on screen, reachable by touch, and a keyboard accelerator may exist beside it but may never be the only path — input.pressable.keyboardAcceleratorRequired is false. Binds nothing for move, look or jump: all three have boundByGame false and are the platform's. Ignores input while UserInputService:GetFocusedTextBox() is non-nil. Resolves its own channel with protocol.channel and accepts no Instance from its caller."
    },
    {
      "module": "beats",
      "fn": "connect(gui)",
      "params": [
        { "name": "gui", "type": "ScreenGui", "note": "the HUD ScreenGui the cues are drawn into" }
      ],
      "returns": "(snapshot) -> () — an updater, so the one unsequenced beat can be driven from a snapshot",
      "note": "Connects the four payoff channels and schedules what arrives on them as beats. THE SCHEDULE, from response: the four in response.sequencedBeats — upgradePurchased, findReveal, setComplete, areaComplete — are QUEUED, ordered by response.beats[].rank lowest first, and no two of them BEGIN closer together than response.minOnsetGapSeconds (0.6); a beat with nothing queued ahead of it plays immediately, because response.loneSequencedBeatDelayed is false. Each must begin within its own acknowledgmentBudgetMs of the packet arriving: 200 for upgradePurchased, 300 for findReveal, 400 for setComplete and areaComplete. response.channelExclusivity keeps findReveal on atPatch and setComplete and areaComplete on notice; response.beats[findReveal].forbiddenChannels bans notice and [areaComplete].forbiddenChannels bans atPatch. patchClear is response.unsequencedBeats, queued false — it is driven off the UPDATER, from a rise in snapshot.clearedCount, and it plays on arrival or not at all; response.minSustainedOnsetsPerSecond is 8 and response.onOverload is 'overlap', so eight clears in a second produce eight onsets that overlap rather than a queue or a drop. NOTHING HERE TOUCHES CONTROL: response.controlEverAffected is false, every beat's controlAffected is false and response.lockoutsSeconds is 0 — no camera move, no input lockout, no WalkSpeed write. THE CUE BODIES ARE EMPTY. What a reveal looks like, sounds like and reads as belongs to Art — VFX, Audio — Stingers and UI/UX — Feedback, none of which owns a contract key; this module fixes WHEN each one starts and on which channel, so adding one is a change to one function body and to no scheduling. response.negativeBeats is 0, so there is no failure cue to write."
    }
  ]
}
```

## Consequences for the builders

A builder may now assume:

- Every function it calls, with the meaning of every quantity argument.
- That `modifiers.effective(state, axis)` is the only source of an effective value, and that
  calling `progression.clearRadius` is a compile error rather than a subtle one.
- That `layout.build` and `layout.areaSpec` both take a 1-based area ordinal that is always
  `state.areasFinished + 1`.
- That the client-to-server surface is two channels, one of which carries one string.
- That `state.patches` holds world positions for the live bay only, `layout.build` returns
  plot-local ones, and `plots.spawn` is the only converter.

A builder may **not** assume:

- That it may add a function to this list. An interface that is not here is a stop.
- That `progression` writes anything to a character, or that `tool` or `beats` writes anything
  to a `Humanoid`. `response.humanoidWritesAllowed` is `["WalkSpeed"]` and `server-main` is its
  only writer.
- That a snapshot and a `PlayerState` are the same table. They share six field names by
  construction, add two derived ones, and share nothing else.

## Acceptance criteria

1. Every `interfaces` entry names a module that exists and a name in that module's `exposes`,
   and every exposed callable has an entry here.
2. `upgradeCost(def, 0)` equals `def.costBase` and `upgradeEffect(def, 0)` equals `def.base`,
   for all three upgrades.
3. `modifiers.effective(state, axis)` at level 0 with nothing complete and nothing owned equals
   `def.base` for every axis, by identity rather than by a repeated literal.
4. `grep -rn "costGrowth\|perLevel" game/src` finds them only in `GameConfig.luau` and in
   `Modifiers.luau`'s equivalent-levels expression, which is `tool`'s only route to a width.
5. `grep -rn "clearRadius\|valueMultiplier" game/src` returns nothing.
6. `grep -rn 'Instance.new("Remote' game/src` matches `Protocol.luau` only, and no file outside
   it contains the string `"Remotes"` or a remote name literal.
7. Every `firedBy` in `protocol.REMOTES.channels` names a module whose `fires` list carries that
   channel, and every entry in every `fires` list appears in `channels`. `StateChanged` is the
   only name with two originators.
8. `layout.build(k)` called twice in two processes returns identical output, for every `k` from
   1 to 12.
9. `pressables.bind` is the only call to `Instance.new` that produces a `GuiObject` anywhere in
   `game/src`.

## Not decided here

The body of any function. The DataStore key format, retry policy and serialisation
(`persistence`). The tween duration and easing on the progress bar (UI/UX — Feedback). What a
beat looks and sounds like (Art — VFX, Audio — Stingers); `beats` fixes only when it starts and
on which channel.

**Back to CID, two items:**

1. **`traversal.death.respawnAt` is `"areaSpawn"` and `plots.spawn` declares one spawn point,
   at plot-local `[0, 0, 8]`, which is inside bay 1.** Taken literally together, a player who
   dies in the eighth bay respawns 2,500 studs away and walks back — a cost `traversal` says
   does not exist (`lossOnRespawn: "none"`, `death.possibleByDesign: false`). This stage reads
   `areaSpawn` as *the live area's* spawn and generalises CID's own number to
   `(0, 0, bays[k].zStart + 8)`, which **reproduces `[0, 0, 8]` exactly at k = 1**. That is a
   derivation from one datum and it should be a stated value in the `plots` key.
2. **`traversal.boundary.walkableMarginStuds` (12) cannot hold on the lane axis.** The sheet
   says "12 studs of walkable margin past the patch field on every side"; `layout.chunk.widthStuds`
   equals `plots.laneWidthStuds` (both 120) and `plots.pitchStuds` is 122, so the lane's whole
   width is patch field and there are 2 studs between two lanes. Widening the pitch to fit 12
   studs a side would need 146, and `plots.invariants` caps the pitch at
   `social.maxCoPresenceSeparationStuds` (128). **The resolution here honours the 12 by narrowing
   the patch field to the central 96 studs of the chunk rather than by widening the lane** —
   `layout.chunk.edgeKeepoutStuds` is 1.5 and 12 satisfies it, and no footprint, chunk count or
   patch count changes. CID's own `_verified.md` already flags this number as invented geometry
   with no range; it should carry one, and whichever sheet owns it should say whether the margin
   comes out of the chunk or out of the pitch.
