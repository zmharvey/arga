# 02 — Module plan

**Stage:** architect · **Key:** modules

## Decision

**Eighteen modules: four shared, eight server, six client.** Eleven of them shipped; seven are
new, and every one of the seven exists because a wave-2 or wave-3 creative decision had no
module that could execute it.

| new module | side | the decision it exists to execute |
|---|---|---|
| `modifiers` | shared | `modifiers.singleDefinition` — `effective(axis)` has exactly one implementation |
| `entitlements` | server | `products.ownershipCheck`, and `F20`: ownership read live every join, never persisted |
| `tool` | server | `tool.held` — a Model welded to the right hand whose head width tracks effective radius |
| `world` | server | `social` — collision groups, chat, and the `maxPlayers` assertion. **This is the answer to "social has no emitter path."** |
| `pressables` | client | `input.gameDrawnPressables: 4` — purchase is a game-drawn pressable, not a keypress |
| `index-screen` | client | the `openIndex` verb, and `firstSession.withheld.collectionPanel` |
| `beats` | client | `response.sequencedBeats`, `minOnsetGapSeconds`, `channelExclusivity`, `onOverload` |

Three shipped modules change shape rather than gaining a key:

- **`layout` now composes eight areas from authored chunks** instead of producing one 140-patch
  terrace. It takes an `areaOrdinal`.
- **`clearing` gained an arming gate and lost the area-complete latch.** `firstSession` disarms
  it for 2.0 studs of movement per character spawn; `areasFinished` replaced `areaComplete`.
- **`input` no longer binds a key.** `Enum.KeyCode.One/Two/Three` in the shipped
  `game/src/client/Input.luau` is **superseded** by `input.gameBoundInputClasses: ["pressable"]`
  and `travelRequiredToPurchase: "none"`. That file is rewritten, not extended.

`progression` also **loses three functions**. `clearRadius`, `walkSpeed` and `valueMultiplier`
move into `modifiers.effective(state, axis)`, because `modifiers.singleDefinition` forbids a
second implementation and set bonuses and purchases multiply the same three axes those
functions used to own alone.

## Why

- **Where the pressable lives, and who owns it.** `[cid: decided]` `input` declares `buy` as a
  `discreteSelect` on a `gamePressable`, `boundByGame: true`, `travelRequiredToPurchase: "none"`,
  `worldObjectsTriggeringAVerb: 0`, and four game-drawn pressables (three purchase, one index).
  Zero world objects trigger a verb, so the pressable **is not in the world**; it is a
  `GuiButton` in the HUD `ScreenGui`. That leaves one question with a real cost either way, and
  it is answered here: **`pressables` creates the four buttons, and it is the one module in this
  build permitted to author UI structure.**

  The alternative was to have `ui-forge`'s `hud-overlay` pattern emit them and have a module
  bind `Activated`. That is the better long-run shape and it is **not chosen**, for the reason
  `tree` gives about `game/default.project.json`: `ui-forge` is not a module in this build
  order, no module owns `ui-forge/briefs/hud.brief.json`, and a required step with no owner is
  the defect class this stage exists to remove. `hud-overlay` shipping no `pressable` readout is
  a default rather than an incapability, so the day it grows one, `pressables` stops calling
  `Instance.new("TextButton")` and starts resolving four node names — a change to one function
  body, which is why the four button names are fixed in `representation` now rather than later.
  `[architect: decided]`, and it is the one place a module is allowed to build a GuiObject.
- **`social`'s emitter problem, and why the answer is a boot module rather than an emitter.**
  The CID writer flagged that promoting `social` implies either a place-configuration emitter or
  a named boot module. **A named boot module, `world`.** Of everything `social` decides,
  exactly one item — `maxPlayers` — cannot be executed by a script, and it is the item an
  emitter could not have executed either: `bridge/emit-config.mjs` writes Luau, and no Luau
  writes `Players.MaxPlayers`. Everything else is runtime work by nature:
  `PhysicsService:RegisterCollisionGroup("Characters")` and the two collidability rows must be
  set on a live `PhysicsService`; `social.characterCollision.appliedTo` says "every BasePart of
  every character, on `CharacterAdded` and on every BasePart added to it thereafter", which is a
  connection and not a setting; and `TextChatService.ChatWindowConfiguration.Enabled = false`
  plus `BubbleChatConfiguration.Enabled = false` are property writes on service children that
  exist at runtime. A place-configuration emitter would have had to produce
  `game/default.project.json` — the one file `tree` forbids this build from touching — to do
  strictly less. So `world` executes the scriptable eleven-twelfths, `runtime.placeConfiguration`
  records the twelfth, and `world.configure()` reads `Players.MaxPlayers` and warns when it is
  outside `social.maxPlayers`'s band. Nothing about `social` reaches the build by hope.
- **`effective(axis)` is shared, not server, and it is one function.** `[cid: decided]`
  `modifiers.composition` is
  `clamp(upgradeEffect(axis, heldLevel) * PROD(setFactors(axis)) * PROD(purchaseFactors(axis)), ceilingRule)`,
  `resolutionOrder` fixes the four steps, `clampApplication` is "once, after every source",
  `baseIsNotAppliedTwice` is explicit, and `singleDefinition` says every consumer calls the one
  implementation. `progression` computing three of them and something else computing set and
  purchase factors is exactly the double-apply `modifiers.forbidden` lists twice. It is
  **shared** rather than server for the same reason `layout` is: it is pure arithmetic over
  `state` and `GameConfig`, it constructs no Instance, and being shared means it can be executed
  outside the engine by the same harness that runs the cost curves. No client module calls it
  today; that is a policy in `modifiers`'s `forbids`, not an accident of where the file sits.
- **`entitlements` is a separate module from `modifiers`, and the split is the persistence
  rule.** `products.forbidden.F20` is "No purchase-derived state is written to persistence.
  Ownership is read live every join", and `modifiers.sources[purchase].storage` repeats it:
  "recomputed from live ownership at every join; never persisted, never latched". Ownership is a
  yielding web call per player per product; factor arithmetic is pure and runs on every tick.
  Putting them in one module means either the tick yields or the arithmetic caches, and the
  second is what `never latched` forbids. So `entitlements` yields once at join and writes
  `state.owned`; `modifiers` reads `state.owned` and yields never.
- **`clearing` now calls `plots`, and the old prohibition is lifted deliberately.**
  `plots.liveGeometry.bayBuiltAt` is "the instant the previous bay's last patch clears", which
  is inside the tick. The shipped contract forbade `clearing` from calling `plots` at all
  ("the dependency is the Patch record contract and the build order, not a call"). That was
  right when an area was terminal and wrong now that finishing one builds the next. `clearing`
  calls exactly one function, `plots.advance(state)`, on exactly one event. It still may not
  create a patch Instance, and `plots` is still the only module that may.
- **`layout` stays shared and stays pure, and that matters more than it used to.**
  `discovery.pool.stableAcrossRejoin` is true, `placementIsPlayerIndependent` is true, and
  `state.cleared` is keyed by patch index. Eight areas multiply the number of ways a
  non-deterministic layout can lose a player's progress by eight. `runtime.layoutSeed` is the
  only seed and `layout` is the only module that reads it.
- **`clearing` is server-only and no client module may request one.** `[brief: binding]`
  `04-PRESENTATION.md` integrity. `[cid: decided]` `economy.authority`: "server only; no client
  message carries a cost, an amount or a balance". `input.clientOriginatedRemotes` is
  `["RequestState", "BuyUpgrade"]` and `clientRemotesFiredByPlayerInput` is `["BuyUpgrade"]`,
  which is the same statement from the input side and is what `protocol` checks itself against.
- **Sides may only depend inward**, and the schema refuses violations. A module id may collide
  with a contract key name — `layout`, `plots`, `input`, `tool` and `modifiers` are each both —
  and that is deliberate: the module that executes a key is named after it. The graph keeps them
  in separate namespaces; a builder should read `reads: ["tool"]` on the `tool` module as "this
  module is the one that executes that key", not as a self-reference.
- **`exposes` carries a name or a signature and never a sentence**, and an entry point declares
  itself with `entryPoint: true` and an empty `exposes`. Both rules are enforced; both were
  written after a prose entry became a graph node nothing could match.
- **There is one way to get a RemoteEvent and `protocol` owns it end to end** —
  `createRemotes()` makes them, `channel(name)` resolves them, `declaresRemotes` is the list,
  and every originator declares the channel in `fires`. Two channels are new:
  `SetCompleted`, because `response.beats.setComplete` is a distinct beat with its own budget
  and its own `notice` channel and `response.channelExclusivity` forbids it sharing `atPatch`
  with a reveal; and `UpgradeApplied`, because `response.beats.upgradePurchased` has a 200 ms
  acknowledgment budget and `input.verbs[buy].onPreconditionFail` is `silentNoOp` — a client
  that fired `BuyUpgrade` cannot tell success from silence by watching a snapshot diff, and
  diffing a snapshot to recover an event is how a beat budget stops being measurable.

```manifest
{
  "provides": "modules",
  "value": [
    {
      "id": "config",
      "path": "game/src/shared/GameConfig.luau",
      "side": "shared",
      "responsibility": "Hold every tuned value from both contracts. Generated by the bridge, never authored.",
      "reads": ["tree"],
      "exposes": ["GameConfig", "upgradeCost(upgrade, level)", "upgradeEffect(upgrade, level)", "tierByWeight(roll)"],
      "dependsOn": [],
      "forbids": [
        "hand-editing this file — the emitter overwrites it and the sheet becomes a lie",
        "constructing any Roblox type, so the module stays loadable outside the engine"
      ],
      "criteria": [
        "regenerating with `npm run architect -- --emit` produces no diff",
        "`luau game/test/config.spec.luau` passes with the file loaded outside Roblox",
        "every one of the 25 creative keys and the technical values a module reads is reachable from this table; a module that cannot find a value here has found an emitter gap, not a value to invent"
      ]
    },
    {
      "id": "layout",
      "path": "game/src/shared/Layout.luau",
      "side": "shared",
      "responsibility": "Compose one area from authored chunks and place its patches, tiers and Finds, deterministically from runtime.layoutSeed and the area ordinal alone.",
      "reads": ["layout", "depths", "discovery", "rarity", "firstSession", "endgame", "onboarding", "collection", "tiers", "area", "traversal", "runtime", "tree", "stateShape", "interfaces"],
      "exposes": ["areaSpec(areaOrdinal)", "build(areaOrdinal)"],
      "dependsOn": ["config"],
      "forbids": [
        "reading the player, the player's state, the found set or the cleared set. discovery.pool.placementIsPlayerIndependent is true and placementRule says the seed alone picks the indices; a layout that reads progress is a layout that is not stable across a rejoin",
        "reading a patch's tier when placing a Find. rarity.findPlacementReadsTier is false and layout.findPlacement.mayReadPatchTier is false, so tiers are rolled AFTER placement or from a disjoint stream",
        "any randomness that is not derived from runtime.layoutSeed — no math.random, no unseeded Random.new, no os.time",
        "creating Instances; this module returns data only",
        "drawing a chunk from a family that is not the area's depth family (layout.R4), or the same variant twice in one area (R1)"
      ],
      "criteria": [
        "two calls with the same areaOrdinal, in different sessions and on different machines, return byte-identical positions, tiers and Find placement",
        "build(k) returns exactly depths.areas[k].patchCount records for k in 1..8, and endgame.postTerminalArea.patchCount for k > 8",
        "no two patch anchors in one chunk are closer than depths.areas[k].minSpacing, and no anchor lies within traversal.boundary.walkableMarginStuds of a lane edge",
        "exactly collection.relicsPerArea patches carry a Find, one per contiguous group of the chunk run, and group g carries depths.areas[k].relicSlice[0] + g - 1",
        "for areaOrdinal 1 the patch nearest the plot spawn point is at most firstSession.placement.spawnToNearestPatchMaxStuds away and carries the first Find of depth 1's slice",
        "sorting area 1's patches by XZ distance from the spawn point puts the first Find at ordinal 1 and the second between firstSession.placement.secondFindOrdinalMin and Max, and the first 20 ordinals hold at least two distinct tierIndex values",
        "an area at ordinal > 8 carries no Find at all (endgame.postTerminalArea.relicSlice is empty)"
      ]
    },
    {
      "id": "protocol",
      "path": "game/src/shared/Protocol.luau",
      "side": "shared",
      "responsibility": "Own the remote channels end to end — name them, create the Instances, hand any module the Instance for a name — and define the snapshot shape both sides agree on.",
      "reads": ["input", "social", "collection", "upgrades", "currency", "tree", "stateShape", "interfaces"],
      "exposes": ["REMOTES", "snapshotShape()", "createRemotes()", "channel(name)"],
      "declaresRemotes": ["RequestState", "StateChanged", "BuyUpgrade", "FindRevealed", "SetCompleted", "AreaRestored", "UpgradeApplied"],
      "dependsOn": ["config"],
      "forbids": [
        "declaring any client-to-server channel that is not in input.clientOriginatedRemotes. That list is exactly RequestState and BuyUpgrade, and this module's own criterion checks the two lists against each other",
        "declaring any remote that lets a client assert a cleared patch, a currency amount or a cost",
        "putting any player identifier other than the recipient's in a payload — social.forbidden X7, and it is why a snapshot carries no UserId at all",
        "letting any other module find a remote for itself: channel(name) is the only path from a name to an Instance, and an undeclared name is an error rather than a warning and a nil",
        "creating a remote anywhere but createRemotes, and calling createRemotes from a client",
        "yielding at require time; the Remotes folder is resolved on the first channel() call and cached"
      ],
      "criteria": [
        "the set of channels whose direction is client -> server equals input.clientOriginatedRemotes exactly, in both directions",
        "the remote list contains no clearing channel and no currency-award channel",
        "client and server both derive field names from snapshotShape() rather than repeating literals",
        "channel(name) returns the same Instance on server and client for every declared name, and errors on a name REMOTES does not declare",
        "`grep -rn 'Instance.new(\"Remote' game/src` matches this file only, and no other file contains a remote name literal or the string \"Remotes\"",
        "no snapshot field carries another player's name, UserId, balance, level or count"
      ]
    },
    {
      "id": "modifiers",
      "path": "game/src/shared/Modifiers.luau",
      "side": "shared",
      "responsibility": "THE ONE IMPLEMENTATION of effective(state, axis): upgrade effect, then set-completion factors, then purchase factors, then one ceiling clamp.",
      "reads": ["modifiers", "setBonus", "products", "upgrades", "movement", "collection", "depths", "discovery", "area", "runtime", "tree", "stateShape", "interfaces"],
      "exposes": ["effective(state, axis)", "ceiling(axis, areaOrdinal)"],
      "dependsOn": ["config"],
      "forbids": [
        "applying upgrades[axis].base a second time. config.upgradeEffect already contains it — modifiers.baseIsNotAppliedTwice — and the set and purchase steps are FACTORS, multiplied onto its result",
        "clamping between two sources. modifiers.clampApplication is 'once, after every source has been applied; never per source'",
        "reordering the four steps. modifiers.resolutionOrder is upgradeEffect, set-completion, purchase, ceiling clamp, and modifiers.withinStepOrder fixes the order inside each step as contract declaration order",
        "latching, caching or persisting a set factor or a purchase factor. modifiers.sources[set-completion].storage says 'derived from discovery.record at every read; never latched, never persisted' and [purchase] says the same, which is why there is no setsComplete field in stateShape",
        "admitting a factor below modifiers.factorFloor (1), or an axis id that is not an upgrades[].id",
        "yielding. Every input is state or GameConfig; UserOwnsGamePassAsync belongs to entitlements",
        "being called from a client module. The server is the only authority on an effective value; a client that needs one reads it off the snapshot"
      ],
      "criteria": [
        "effective(state, axis) at every level 0, with no set complete and no product owned, equals upgrades[axis].base — 1 for value, movement.baseClearRadius for radius, movement.baseWalkSpeed for speed",
        "there is exactly one arithmetic expression in game/src that multiplies a set factor or a purchase factor; `grep -rn 'combinedFactorCap\\|setFactor\\|purchaseFactor' game/src` matches this file only",
        "for every axis, ladderMax * every set factor * every purchase factor is at most products.headroom.marginFraction (0.9) times ceiling(axis, 8), asserted once at boot and warned by name on failure",
        "effective('radius') never reaches ceiling('radius', k) for any k, and effective('speed') * runtime.clearTickRate never exceeds movement.baseClearRadius",
        "a player owning zero products and holding zero levels is playable and every axis is at its base — products.F16 and F8",
        "completing a set changes effective on that set's axis on the very next read, with nothing written to state and nothing saved"
      ]
    },
    {
      "id": "persistence",
      "path": "game/src/server/Persistence.luau",
      "side": "server",
      "responsibility": "Load and save the seven persisted fields under runtime.dataStoreName, and reconcile a payload before returning it.",
      "reads": ["runtime", "discovery", "endgame", "firstSession", "stateShape", "tree", "interfaces", "wiring"],
      "exposes": ["load(player): PlayerState", "save(player, state): boolean", "defaultState(): PlayerState"],
      "dependsOn": ["config", "layout"],
      "forbids": [
        "storing one boolean per finished area. endgame.persistence.postTerminalAreasStoredAs is 'one integer count, never one boolean per area', and areasFinished is that integer for authored areas too",
        "storing anything purchase-derived: no gamePassId, no product id, no purchase-sourced factor — products.F20, checkable on the payload",
        "storing a set-completion flag — modifiers.sources[set-completion].storage forbids latching it",
        "growing the found map with play. discovery.record.growth is 'one boolean per name in collection, and nothing else', so the map has at most 24 keys forever and none of discovery.record.forbiddenFields may appear",
        "throwing on a DataStore failure; a failed load starts a fresh session with a warning",
        "returning a state whose cleared, clearedCount and areasFinished disagree. load reconciles all three before it returns, so no module downstream has to check and none of them may",
        "trusting the stored clearedCount. It is derived from the cleared set, and the derived value wins",
        "reading or writing a v1 payload. runtime.storeVersionHistory records why there is no migration"
      ],
      "criteria": [
        "the payload is exactly the seven fields stateShape marks persisted, and its size is bounded by the largest single area's patchCount (640) plus 24 plus 3 plus three integers — never by how far the player has got",
        "a player who has finished six areas has NO per-area structure in their payload: one integer reading 6",
        "a DataStore outage leaves the player playable rather than erroring",
        "a payload whose clearedCount disagrees with its cleared set loads with the derived value and one warning",
        "a payload whose cleared holds an index outside 1..patchCount inclusive loads with that index dropped and one warning (1-based keys: 'at or above patchCount' would drop the valid highest index and re-pay it every rejoin) — the live area changed size, and a stale index would clear a patch that is not there",
        "`grep -rn 'areaComplete' game/src` returns nothing"
      ]
    },
    {
      "id": "progression",
      "path": "game/src/server/Progression.luau",
      "side": "server",
      "responsibility": "Own the balance, the held upgrade levels and the purchase decision. The one sink and the one faucet's credit both land here.",
      "reads": ["upgrades", "economy", "firstSession", "stateShape", "tree", "interfaces"],
      "exposes": ["award(state, amount): number", "tryBuy(state, upgradeId): boolean", "revealRows(state)"],
      "dependsOn": ["config"],
      "forbids": [
        "computing an effective value. clearRadius, walkSpeed and valueMultiplier used to live here and are now modifiers.effective(state, axis); a second implementation is what modifiers.singleDefinition forbids",
        "trusting a client-supplied cost, level or amount — economy.authority",
        "allowing a balance below zero, or a partial purchase. economy.negativeBalance is 'impossible; a purchase that cannot be afforded changes nothing at all' and economy.sinks[0].onInsufficientFunds says nothing is deducted",
        "crediting currency for anything but a patch clear. economy.faucetCount is 1 and every entry in economy.zeroCreditEvents credits 0 — including purchase, which is why no code path converts Robux to currency",
        "clearing a rowsRevealed flag. firstSession.suppressionForbidden lists reSuppression; the lift is latched forever",
        "capping the balance. economy.balanceCap is null and economy.atMaxLadder.balanceFrozen is false"
      ],
      "criteria": [
        "a purchase with insufficient currency changes nothing and returns false, and nothing is sent to the client — input.verbs[buy].onPreconditionFail is silentNoOp",
        "a purchase at maxLevel changes nothing and returns false",
        "the first purchase of an upgrade costs config.upgradeCost(def, 0) which equals def.costBase",
        "award(state, amount) rejects a non-positive amount rather than clamping",
        "revealRows sets rowsRevealed[u] true for every upgrade whose config.upgradeCost(def, 0) is at or below the balance, and never sets one false",
        "a player who reaches the cheapest level-1 cost after 10 patches of clearing at base stats sees that row lift — firstSession.firstPurchaseBand"
      ]
    },
    {
      "id": "entitlements",
      "path": "game/src/server/Entitlements.luau",
      "side": "server",
      "responsibility": "Resolve which game passes a player owns, once per join, into state.owned. The only module that talks to MarketplaceService.",
      "reads": ["products", "stateShape", "tree", "interfaces"],
      "exposes": ["refresh(player, state)"],
      "dependsOn": ["config"],
      "forbids": [
        "writing anything to persistence, or reading ownership from a saved payload — products.F20",
        "calling PromptGamePassPurchase, PromptProductPurchase, or implementing ProcessReceipt. products.F5 and F13, and there is no store control in input for a prompt to be reachable from",
        "reading Player.MembershipType or MembershipType.Premium — products.F18",
        "calling PolicyService:GetPolicyInfoForPlayerAsync — products.F3",
        "treating a nil gamePassId as owned. Every products.items[].gamePassId is null today, so every product resolves to NOT owned and every factor is 1",
        "erroring or yielding the join sequence indefinitely on a MarketplaceService failure; a failed check warns and resolves to not owned"
      ],
      "criteria": [
        "state.owned has exactly one key per products.items[] entry after refresh returns, and every value is a boolean",
        "with every gamePassId null, every value is false, every axis is at its unpurchased effective value, and the game is fully playable — products.F16, F17, F8",
        "no field of state.owned reaches persistence.save; `grep -rn 'owned' game/src/server/Persistence.luau` returns nothing",
        "a MarketplaceService outage produces one warning per product and a playable session"
      ]
    },
    {
      "id": "plots",
      "path": "game/src/server/Plots.luau",
      "side": "server",
      "responsibility": "Build and maintain one player's lane: the slab, its boundary, its spawn Attachment, and the patch Instances of the live bay only.",
      "reads": ["plots", "traversal", "endgame", "patch", "tiers", "representation", "styleGuide", "stateShape", "tree", "interfaces"],
      "exposes": ["claimSlot(): number", "releaseSlot(n)", "spawn(player, state): CFrame", "advance(state): CFrame", "despawn(state)"],
      "dependsOn": ["config", "layout"],
      "forbids": [
        "deriving a lane's position from the live player count — plots.slotClaiming is lowestFreeIndex and a slot is claimed once and held for the connected session",
        "creating a patch Instance for any bay but the live one. plots.liveGeometry.patchInstancesExistIn is 'the live bay only', and this is where 'cleared is permanent' is enforced in the world",
        "creating a patch Instance for an index state.cleared marks",
        "making a patch collide; contact clearing with movement-only input must never be blocked by the thing being cleared",
        "leaving a hole in the floor. plots.liveGeometry.groundExistsIn is 'every bay from 1 up to and including the live bay', and slabs tile the row at plots.pitchStuds so two neighbours share an edge",
        "opening the boundary. traversal.boundary.passable, climbable and jumpable are all false; plots.openings describes CONSTRUCTION, which is Art's, and there is no gap in the collision ring",
        "using one Size formula for all four tiers. A Cylinder's length is its local X and a Ball takes its smallest component, so one formula lays the Fern down and shrinks the Bramble — and shape is the rarity channel that has to survive colour being removed",
        "putting a SpawnLocation anywhere, or letting a lane exceed plots.pitchStuds in width"
      ],
      "criteria": [
        "a rejoining player's already-cleared patches of the live bay do not respawn, and no bay below the live one has a patch Instance at all",
        "a player whose areasFinished is 3 gets continuous walkable floor over bays 1 to 4 and patch Instances only in bay 4",
        "two players never occupy the same lane, and a vacated slot is reused before a higher one is allocated",
        "the realised distance between the spawn points of two consecutive occupied slots is exactly plots.pitchStuds (122) at every bay ordinal, which is at or below social.maxCoPresenceSeparationStuds (128)",
        "every spawned patch has CanCollide false, and no patch anchor is within traversal.boundary.walkableMarginStuds of a lane edge",
        "a character cannot leave its own lane: the boundary stops it on all four sides, jumping does not clear it (traversal.jump.jumpHeight is 7.2 and the boundary is traversal.boundary.heightStuds, 20), and no point it can stand on reaches air",
        "each tier's world bounding box is patch.footprint x tier.height x patch.footprint, except Bramble at tier.height cubed, and the top of every patch is exactly tier.height above the slab",
        "advance(state) extends the floor by one bay, builds that bay's patches, moves the spawn Attachment to the new bay, and destroys nothing that a player is standing on"
      ]
    },
    {
      "id": "tool",
      "path": "game/src/server/Tool.luau",
      "side": "server",
      "responsibility": "Build and maintain the one held tool: a Model welded to the right hand whose head width is the visible reading of effective radius.",
      "reads": ["tool", "upgrades", "representation", "stateShape", "tree", "interfaces"],
      "exposes": ["equip(player, state)", "refresh(player, state)"],
      "dependsOn": ["config", "modifiers"],
      "forbids": [
        "creating a Roblox Tool instance or touching the Backpack. tool.isRobloxToolInstance is false and tool.entersBackpack is false; it is a Model welded to the RightHand attachment",
        "writing any Humanoid property. tool.writesHumanoidProperties is false and response.humanoidWritesAllowed is exactly ['WalkSpeed'], which is server-main's write and nobody else's",
        "clearing anything. tool.clearsOnContact is false; the tool is appearance, and clearing is a server proximity test in clearing.tick",
        "colliding, touching, being raycast or having mass. tool.canCollide, canTouch and canQuery are false and massless is true",
        "animating, or carrying a ParticleEmitter. tool.animates is false and tool.particleEmitters is 0",
        "changing with the value or speed axes. tool.unaffectedByAxes is ['value', 'speed'] and tool.changesWithAxes is ['radius']",
        "resolving head width from the Reach LEVEL. products.items[span].deliverable requires it to resolve from EFFECTIVE radius, so a purchased factor widens the head and a level-only reading would make a 499-Robux product invisible"
      ],
      "criteria": [
        "a player owning zero products spawns with a tool welded to the right hand — products.F8",
        "head width is tool.headWidthBaseStuds (1.2) at radius level 0 with nothing owned, and tool.headWidthPerLevelStuds (0.35) wider per equivalent Reach level of effective radius",
        "buying the Span pass widens the head without any level changing",
        "the tool has no Humanoid write, no Touched handler, no ParticleEmitter and no AnimationTrack anywhere in it",
        "a character that respawns gets exactly one tool, and the previous one is gone"
      ]
    },
    {
      "id": "clearing",
      "path": "game/src/server/Clearing.luau",
      "side": "server",
      "responsibility": "Observe player positions on a tick, arm on first movement, clear patches within effective reach, credit currency, reveal Finds, complete sets and advance areas.",
      "reads": ["runtime", "economy", "discovery", "firstSession", "response", "depths", "endgame", "tiers", "stateShape", "tree", "interfaces", "wiring", "representation"],
      "applies": ["radius", "value"],
      "fires": ["FindRevealed", "SetCompleted", "AreaRestored", "StateChanged"],
      "exposes": ["tick(states)", "start(states)"],
      "dependsOn": ["config", "modifiers", "progression", "plots", "protocol"],
      "forbids": [
        "clearing anything before the character is armed. firstSession.armDistanceStuds is 2.0, armScope is perCharacterSpawn and armMeasuredOn is 'server, horizontal XZ displacement of the character root from the plot spawn pivot'. The gate is per character life, not per session, and it re-arms on every respawn",
        "accepting any client message about clearing — the server observes, it never asks",
        "using Touched events, which fire from client-authoritative physics",
        "applying the value multiplier twice. economy.faucets[patch-clear].multiplierAppliedOnce is 'at this site only; never again inside the award function', so this module multiplies and progression.award does not",
        "rounding a payout any way but floor, or paying below economy.payoutFloor (1)",
        "crediting anything for a reveal, a set completion or an area completion. Every economy.zeroCreditEvents entry credits 0",
        "touching a patch that belongs to a bay below the live one. state.patches holds the live bay only, which is plots's guarantee, and this module never indexes past it",
        "reaching a remote by any means other than protocol.channel(name)",
        "firing a set-completion or area-completion beat on the reveal channel. response.channelExclusivity puts findReveal on atPatch and setComplete and areaComplete on notice, and response.beats[findReveal].forbiddenChannels contains notice"
      ],
      "criteria": [
        "a character that has not moved firstSession.armDistanceStuds since it spawned clears nothing, however many patches are inside its radius; moving 2.0 studs in any direction arms it for that character's whole life",
        "with the first Find at firstSession.placement.spawnToNearestPatchMaxStuds (3.5) from the spawn point, arming and clearing it both happen within firstSession.ceilings.secondsToFirstClear (3 s) of the first input",
        "walking within modifiers.effective(state, 'radius') of a patch clears it within one tick",
        "payout equals floor(tiers[tierIndex].value * modifiers.effective(state, 'value')), minimum economy.payoutFloor",
        "clearing the last patch of the live bay increments areasFinished exactly once, empties cleared, zeroes clearedCount, calls plots.advance and fires AreaRestored exactly once",
        "clearedCount never exceeds the live area's patchCount, over any number of rejoins and any number of areas",
        "the sixth Find of a set fires SetCompleted exactly once, ever, per player per set",
        "a player who has found every name in collection keeps clearing, keeps being paid and keeps advancing into post-terminal areas — endgame.gameEnds is false and survivingPayoffKinds is currencyTick and areaCompletion",
        "clearing one patch pushes exactly one StateChanged; standing still for ten ticks pushes none"
      ]
    },
    {
      "id": "world",
      "path": "game/src/server/World.luau",
      "side": "server",
      "responsibility": "Execute every scriptable part of social at boot — collision groups, chat, the forbidden-API surface — and assert the one part that is place configuration.",
      "reads": ["social", "traversal", "runtime", "tree", "interfaces"],
      "exposes": ["configure()", "onCharacter(character)"],
      "dependsOn": ["config"],
      "forbids": [
        "writing Players.MaxPlayers. social.maxPlayers.scriptSettable is false; this module READS it and warns when it is outside the band, and runtime.placeConfiguration records who owns the setting",
        "creating a leaderstats Folder, a Team, or writing Player.Team or Player.TeamColor — social.forbidden X1 and X2",
        "calling Player:IsFriendsWith, Players:GetFriendsAsync, SocialService:CanSendGameInviteAsync or SocialService:PromptGameInvite — social.friendSurfacing.forbiddenApis, all four",
        "using an OrderedDataStore or building any ranking — social.forbidden X8",
        "enabling chat of any kind. social.chat.text, voice, chatWindowEnabled and bubbleChatEnabled are all false, and overridesPlatformDefault records that ChatWindowConfiguration.Enabled defaults to TRUE, so this is a write and not an omission",
        "letting two characters collide. social.characterCollision.playerVsPlayer is false, the group is named by social.characterCollision.groupName and by no other key, and Characters-vs-Default stays true so a character still stands on a slab"
      ],
      "criteria": [
        "the collision group named by social.characterCollision.groupName exists before the first character spawns, and both rows of social.characterCollision.collidable are set",
        "every BasePart of every character carries that group, including parts added after CharacterAdded — social.characterCollision.appliedTo",
        "two characters walk through each other; both stand on the slab",
        "no chat window and no chat bubble appears in a session, and no player-authored string reaches another client — social.chat.playerAuthoredStringsToOtherClients is 0",
        "booting a place whose Players.MaxPlayers is outside social.maxPlayers's band produces exactly one warning naming the key, and the game still runs",
        "`grep -rEn 'IsFriendsWith|GetFriendsAsync|CanSendGameInviteAsync|PromptGameInvite|OrderedDataStore|leaderstats|TeamColor' game/src` returns nothing"
      ]
    },
    {
      "id": "server-main",
      "path": "game/src/server/init.server.luau",
      "side": "server",
      "responsibility": "Wire lifecycle: configure the place, create the remotes, load and save around join and leave, start the tick, and apply the one Humanoid property this game writes.",
      "reads": ["runtime", "traversal", "response", "stateShape", "tree", "interfaces", "wiring"],
      "applies": ["speed"],
      "fires": ["StateChanged", "UpgradeApplied"],
      "exposes": [],
      "entryPoint": true,
      "dependsOn": ["protocol", "modifiers", "persistence", "progression", "entitlements", "plots", "tool", "clearing", "world"],
      "forbids": [
        "being required by any other module. This is the server entry point and Roblox is its only caller",
        "containing game logic; anything with a rule in it belongs in one of the modules above",
        "writing any Humanoid property except WalkSpeed. response.humanoidWritesAllowed is exactly ['WalkSpeed']; traversal.jump.jumpHeight (7.2) and traversal.jump.useJumpPower (false) are the ENGINE DEFAULTS being recorded, not values to write, and traversal.death.healthWrittenByGameCode is false",
        "creating a remote itself, choosing where the remotes live, or naming one in a literal",
        "loading a character before persistence.load has returned and entitlements.refresh has resolved"
      ],
      "criteria": [
        "a player's Humanoid.WalkSpeed equals modifiers.effective(state, 'speed') after spawning and after any successful purchase",
        "`grep -rn 'Humanoid\\.' game/src` finds no property write other than WalkSpeed, and no write to JumpHeight, JumpPower, UseJumpPower, Health, MaxHealth or WalkSpeed outside this file",
        "world.configure() runs before the remotes exist and the remotes exist before any player can join",
        "a player who leaves has their state saved before their lane is destroyed",
        "the clear tick survives an error in one iteration without stopping",
        "server shutdown saves every connected player outside Studio",
        "a player who dies gets a new character runtime.respawnDelaySeconds later, on their own lane's CURRENT bay spawn, with currency, levels, cleared patches and areasFinished unchanged, and the arming gate re-armed",
        "a player who leaves during the death delay produces no error and no loaded character",
        "a successful purchase fires exactly one UpgradeApplied and one StateChanged; a failed one fires neither"
      ]
    },
    {
      "id": "hud-binding",
      "path": "game/src/client/HudBinding.luau",
      "side": "client",
      "responsibility": "Resolve the ui-forge HUD's named readouts once and write live state into them, including which readouts are withheld.",
      "reads": ["upgrades", "currency", "collection", "firstSession", "tree", "interfaces", "representation"],
      "exposes": ["bind(root, gui)"],
      "dependsOn": ["config", "protocol"],
      "forbids": [
        "authoring UI structure. The HUD comes from ui-forge/briefs/hud.brief.json and this module only binds to it — pressables is the one exception in this contract and it owns four buttons and nothing else",
        "signalling affordability by colour alone. input.pressable.affordabilityByColourAlone is false",
        "using any device in firstSession.suppressionForbidden to withhold a readout: no padlock, no greyed row, no question mark, no unknown denominator, no tooltip, no lift animation, no lift sound, no new badge, and no reflow when a readout lifts",
        "re-suppressing a readout that has lifted, or showing the collection count as a percentage",
        "counting an unrevealed Find in the collection count"
      ],
      "criteria": [
        "at join, a new player sees the currency readout at 0, the collection count at 0 with NO denominator, and the area progress at 0% — firstSession.withheld, joinValue by joinValue",
        "the collection denominator and the collection panel appear at the first reveal and never disappear again",
        "an upgrade row appears when rowsRevealed says so, with no animation, no sound and no reflow of the rows around it",
        "a node name that no longer resolves produces one warning at bind time rather than a silent no-op on every snapshot",
        "affordability is readable with colour removed",
        "the area progress readout names the live area from snapshot.areaLabel and draws its bar from clearedCount over snapshot.areaPatchCount — this module reads no area table at all, which is why those two fields are on the wire"
      ]
    },
    {
      "id": "pressables",
      "path": "game/src/client/Pressables.luau",
      "side": "client",
      "responsibility": "Create and maintain the four game-drawn pressables, and report an activation. THE ONE MODULE IN THIS BUILD THAT AUTHORS UI STRUCTURE, and it authors exactly four buttons.",
      "reads": ["input", "upgrades", "firstSession", "representation", "tree", "interfaces"],
      "exposes": ["bind(gui, onActivate)"],
      "dependsOn": ["config"],
      "forbids": [
        "creating any Instance other than the four buttons representation names and their text labels. This module exists because ui-forge's hud-overlay pattern ships no pressable readout, and its scope is that gap and nothing wider",
        "adding a fifth pressable, or a pressable for a verb input does not declare. input.closed is true, gameDrawnPressables is 4, and input.pressable.roles is three purchase and one index",
        "requiring a hold or a chord. input.pressable.holdRequired and chordRequired are both false, and activationsPerPress is 1",
        "making a keyboard accelerator the only way to press one. input.pressable.keyboardAcceleratorAllowed is true and keyboardAcceleratorRequired is FALSE — the shipped Enum.KeyCode.One/Two/Three binding is superseded and may exist only as an accelerator alongside the button",
        "sizing a button below input.pressable.minTouchTargetRule (not smaller than the platform jump button) or overlapping a platform control region — input.pressable.mayOverlapPlatformControlRegions is false",
        "showing a rejection cue on a failed precondition. input.pressable.rejectionCueOnFailedPrecondition is 'none' and input.verbs[buy].onPreconditionFail is silentNoOp",
        "signalling affordability by colour alone, or naming a product anywhere — products.F19"
      ],
      "criteria": [
        "four buttons exist after bind and no more, three bound to upgrades in declaration order (input.pressable.roles[purchase].boundTo) and one to the index",
        "a purchase press produces exactly one activation, and pressing again within input.pressable.debounceSeconds (0.35) produces none",
        "every button is reachable by touch, by mouse, by gamepad selection (input.pressable.gamepadSelectable) and, optionally, by a keyboard accelerator",
        "no button is smaller than the platform jump button on a phone, and none overlaps the movement or jump control region",
        "pressing buy with an unaffordable balance does nothing, shows nothing and plays nothing",
        "a row hidden by firstSession.withheld.upgradeRow has no button, and the button appears the instant the row lifts without moving the other three"
      ]
    },
    {
      "id": "index-screen",
      "path": "game/src/client/IndexScreen.luau",
      "side": "client",
      "responsibility": "The collection surface: which Finds are held, grouped by set, opened and closed by the index pressable.",
      "reads": ["collection", "rarity", "discovery", "input", "firstSession", "representation", "tree", "interfaces"],
      "exposes": ["bind(gui)", "toggle()"],
      "dependsOn": ["config", "protocol"],
      "forbids": [
        "showing a rarity colour, frame, glow, border, sparkle or badge on a slot, or any per-Find grade. rarity.forbidden lists all of them and rarity.findRarityField is null",
        "showing anything about a Find beyond its name and whether it is held. discovery.record.forbiddenFields bans count, duplicates, timesFound, timestamp, condition, quality, variant, favourite, seen, isNew, equipped, sortIndex and tradeable",
        "existing before the first reveal. firstSession.withheld.collectionPanel is presentAtJoin false, liftedBy beat:firstReveal, latched on 'the collection map is non-empty'",
        "using a padlock, a greyed slot, a question-mark placeholder or an unknown denominator for an unfound name — firstSession.suppressionForbidden",
        "naming or pricing a product — products.F19",
        "showing another player anything — social.forbidden X6 and X7"
      ],
      "criteria": [
        "the surface groups the 24 names into the four labelled sets of collection.sets, and the set heading is the ONLY place a set is legible — rarity.ladders[find-set].legibilityChannel",
        "an unfound name is shown as an empty slot with its set heading and nothing else",
        "opening it suspends movement and closing it restores it, and neither is caused by anything but the player's own press — input.pressable.indexScreenSuspendsMovement",
        "it does not exist at join for a new player and appears at the first reveal, once, without animation or sound"
      ]
    },
    {
      "id": "beats",
      "path": "game/src/client/Beats.luau",
      "side": "client",
      "responsibility": "Receive the payoff channels and schedule them as beats: rank, queue, minimum onset gap, channel exclusivity and overload behaviour.",
      "reads": ["response", "tree", "interfaces"],
      "exposes": ["connect(gui)"],
      "dependsOn": ["config", "protocol"],
      "forbids": [
        "affecting control. response.controlEverAffected is false, response.lockoutsSeconds is 0 and every beat's controlAffected is false — no camera move, no input lockout, no walk-speed change, ever",
        "playing two beats on one exclusive channel at once. response.channelExclusivity gives atPatch to findReveal and notice to setComplete and areaComplete",
        "delaying a lone sequenced beat. response.loneSequencedBeatDelayed is false: a beat with nothing queued ahead of it plays immediately, and the gap only applies between two",
        "queueing patchClear. response.unsequencedBeats is ['patchClear'] and its queued is false; it plays on arrival or not at all",
        "dropping a beat under load. response.onOverload is 'overlap', not 'drop' and not 'queue-forever'",
        "playing a negative beat or a failure cue. response.negativeBeats is 0",
        "prompting. firstSession.tutorialDevicesForbidden lists promptingSound, pointerArrowChevronBeamWaypointOutlineHighlight and uncausedCameraMoveZoomOrReframe"
      ],
      "criteria": [
        "two sequenced beats never begin closer together than response.minOnsetGapSeconds (0.6)",
        "a sequenced beat with nothing ahead of it begins within its own acknowledgmentBudgetMs of the packet arriving — 300 ms for findReveal, 400 for setComplete and areaComplete, 200 for upgradePurchased",
        "the ordering of two queued beats follows response.beats[].rank, lowest first",
        "eight clears in one second produce eight readout onsets — response.minSustainedOnsetsPerSecond",
        "nothing this module does changes WalkSpeed, the camera, or what an input does",
        "a reveal and a set completion arriving on the same tick play in rank order on two different channels, never both on atPatch"
      ]
    },
    {
      "id": "input",
      "path": "game/src/client/Input.luau",
      "side": "client",
      "responsibility": "Adjudicate the two game-bound verbs: turn a pressable activation into a BuyUpgrade message or an index toggle. Binds no key as the only path to either.",
      "reads": ["input", "upgrades", "tree", "interfaces"],
      "exposes": ["connect(gui)"],
      "fires": ["BuyUpgrade"],
      "dependsOn": ["protocol", "pressables", "index-screen"],
      "forbids": [
        "binding Enum.KeyCode.One, Two or Three as the only way to buy. THE SHIPPED FILE DOES EXACTLY THAT AND IS SUPERSEDED: input.gameBoundInputClasses is ['pressable'], and a keyboard-only purchase path leaves a mobile-heavy audience unable to spend",
        "binding move, look or jump. input.verbs[move|look|jump].boundByGame is false for all three; those are platform controls and this module never touches them",
        "sending anything except an upgrade id. The server owns cost and level — economy.authority, and input.verbs[buy].adjudicatedBy is 'server'",
        "gating a press on a precondition the client evaluated. input.verbs[buy].precondition is 'balance >= cost && level < maxLevel' and onPreconditionFail is silentNoOp, and BOTH ARE THE SERVER'S. The client FIRES UNCONDITIONALLY. This rule previously ended '...and the client sends nothing when it knows it would fail', which contradicted this same sheet's interfaces note for input.connect, wiring.onClientBoot step 4, and pressables' own header, all of which describe an unconditional fire. The input builder reported that the two readings produce two differently shaped modules -- a gating client has to cache the snapshot and wrap the updater rather than pass it through. The unconditional reading wins on a fact neither reading stated: the client's snapshot is at least one tick stale, so a client-side gate silently drops purchases the server would have accepted, and the player sees a dead button with no cue, which is the one failure onPreconditionFail's silence cannot be distinguished from",
        "firing any channel that is not in input.clientOriginatedRemotes",
        "accepting a table of remote Instances from its caller, or resolving one by name. It asks protocol.channel(\"BuyUpgrade\")"
      ],
      "criteria": [
        "`grep -rn 'KeyCode' game/src/client/Input.luau` finds no binding that is the sole path to a verb",
        "a purchase is reachable on a touch device with no keyboard and no gamepad, in one press, with no travel — input.travelRequiredToPurchase is 'none'",
        "the index verb is adjudicated on the client and the buy verb on the server, per input.verbs[].adjudicatedBy",
        "input while a text field is focused is ignored",
        "exactly one BuyUpgrade message leaves the client per accepted press, carrying one string"
      ]
    },
    {
      "id": "client-main",
      "path": "game/src/client/init.client.luau",
      "side": "client",
      "responsibility": "Boot the HUD screen, connect every binder, connect every server-to-client channel, and ask the server for initial state.",
      "reads": ["tree", "interfaces", "wiring", "representation"],
      "fires": ["RequestState"],
      "exposes": [],
      "entryPoint": true,
      "dependsOn": ["protocol", "hud-binding", "pressables", "index-screen", "beats", "input"],
      "forbids": [
        "being required by any other module. This is the client entry point and Roblox is its only caller",
        "assuming the server's join-time push arrived; state is requested once every handler is live",
        "resolving a remote by name or by search; protocol.channel(name) is the only lookup",
        "authoring UI structure. It creates one ScreenGui and calls UIBuilder.build; pressables owns the four buttons and index-screen owns the collection surface",
        "leaving a server-to-client channel unconnected. An unconnected channel is an output with nothing at the end of it"
      ],
      "criteria": [
        "a returning player's HUD shows their saved currency and collection count before they clear anything",
        "the HUD survives a character respawn without rebuilding",
        "all five server-to-client channels have a connected handler after boot",
        "one snapshot arriving twice is harmless: every updater is idempotent"
      ]
    }
  ]
}
```

## Consequences for the builders

A builder may now assume:

- **The purchase path is a button, not a key**, and `pressables` builds it. `input` never reads
  a `KeyCode` as the only path to a verb.
- **Exactly one function computes an effective axis value**, and it is
  `modifiers.effective(state, axis)`. `progression.clearRadius`, `walkSpeed` and
  `valueMultiplier` are gone; a call to one of them is a stale file, not a missing export.
- **Everything `social` decides has an owner.** `world` executes it at boot; `runtime` records
  the one item a script cannot.
- **`layout` takes an area ordinal.** There is no such thing as "the area" any more.

A builder may **not** assume:

- That `game/src/client/Input.luau` as shipped is a starting point. It binds three keys and
  every one of them is superseded.
- That `areaComplete` exists. It is `areasFinished`, an integer, and `grep` for the old name
  must return nothing.
- That `ui-forge` may be edited. It is not in this build order and no module owns its briefs.

## Acceptance criteria

1. Every module's `reads` names a real key in one of the two contracts, and every one of the 25
   creative keys is read by at least one module or is enforced by tooling.
2. No dependency cycle, and no cross-side dependency except on `shared`.
3. Every module has at least one acceptance criterion.
4. Every entry in an `exposes` list is a bare name or a signature, and every entry point carries
   `entryPoint: true` with an empty `exposes`.
5. Every exposed callable appears in `interfaces` with its parameters resolved, and every
   `interfaces` entry names a function its module exposes.
6. Every module that originates remote traffic declares it in `fires`, depends on `protocol`,
   and fires only names `protocol.declaresRemotes` carries. All seven channels are fired by
   something, and `StateChanged` is the only one with two originators.
7. Each of `value`, `radius` and `speed` is applied by exactly one module: `clearing`, `clearing`
   and `server-main`.

## Not decided here

Implementation of any module. The DataStore key format and retry policy (`persistence`). The
HUD's structure beyond the four pressables (`ui-forge`). What a reveal looks and sounds like
(Art — VFX, Audio — Stingers), which is why `beats` owns the *scheduling* and its handler bodies
are empty.

**Routed back to CID, three items, all of which reach the build as a stated no-op rather than as
an invention:**

1. **No set bonus has a magnitude.** `setBonus.rows` carries `setId`, `depth` and `axis`, and
   `setBonus.invariants` explicitly forbids a row carrying "a factor, a magnitude, a percentage
   or a duration"; `modifiers.sources[set-completion].assignmentOwner` says "gameplay/balance
   sets each factor" and that sheet has not run. So `modifiers` knows *which axis* each of the
   four sets multiplies and not *by how much*. **The build treats an absent factor as 1.0** and
   `modifiers` warns once at boot naming the four sets, which makes a completed set currently
   change nothing — and `economy.zeroCreditEvents[set-complete].paysInstead` promises "exactly
   one modifier". That promise is unkept until a number exists, and inventing one here would be
   a balance decision wearing an architect's badge.
2. **Every `products.items[].gamePassId` is null.** A null id cannot be passed to
   `UserOwnsGamePassAsync`, so `entitlements` resolves every product to not-owned and every
   purchase factor to 1. The game is fully playable in that state (`F16`, `F17`, `F8`), so this
   blocks nothing — but no player can own a pass until three ids exist, and creating a game pass
   is an operational act outside both contracts.
3. **`products.storeExists` is true and `input` supplies no way to reach a store.** `input` is
   `closed: true`, `gameDrawnPressables: 4` (three purchase, one index), and
   `worldObjectsTriggeringAVerb: 0`, so there is no declared control from which
   `PromptGamePassPurchase` could be called — and `products.prompt.calledOnlyFrom` requires an
   explicit activation of exactly such a control. **This build therefore has no in-game store,
   and honours ownership bought from the experience's own platform store page**, which needs no
   in-game control and satisfies every one of `F10` through `F15` by construction. That is a
   coherent game, but it is not what `storeExists: true` says, and the two sheets need to agree.
   Adding a fifth pressable would contradict `input.closed`, so this stage will not do it.
