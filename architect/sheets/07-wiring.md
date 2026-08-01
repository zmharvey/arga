# 07 — Wiring

**Stage:** architect · **Key:** wiring

## Decision

**`CharacterAutoLoads` is off, `world.configure()` is the first thing that runs, and a state does
not enter the live collection until both the DataStore and MarketplaceService have answered for
it.** Eleven phases, ordered. The six that answer a defect or a new decision:

- **`persistence.defaultState()` is the only thing that constructs a state**, and it is named in
  `constructs` alongside the fields it initialises.
- **`server-main` writes `Humanoid.WalkSpeed = modifiers.effective(state, "speed")` in `onSpawn`
  and again after any successful purchase.** It is the only Humanoid write in the game, because
  `response.humanoidWritesAllowed` is exactly `["WalkSpeed"]`.
- **`world.configure()` runs before the remotes and before any character can exist**, because a
  character that spawns before the collision group exists is a character in the wrong group for
  the rest of its life.
- **`entitlements.refresh` runs inside `onJoin`, before the publish point.**
  `modifiers.effective` reads `state.owned` on every tick; a state published with an empty
  `owned` map pays the unpurchased multiplier for as long as the web call takes.
- **The clearing tick is disarmed on every new character and arms itself.**
  `firstSession.armScope` is `perCharacterSpawn`, so no phase resets it — `clearing.tick` notices
  the character changed. That is why `armState` has one writer.
- **Finishing an area builds the next one from inside the tick.**
  `plots.liveGeometry.bayBuiltAt` is *"the instant the previous bay's last patch clears"*, so
  `clearing` calls `plots.advance(state)` on that pass and on no other.

## Why

- **`Players.CharacterAutoLoads = false` removes a race rather than handling it.** With it on,
  `CharacterAdded` can fire before `persistence.load` returns — load yields on a DataStore, and
  now `entitlements.refresh` yields on MarketplaceService too — and then `onSpawn` has to apply a
  walk speed from a state that does not exist. Turning it off and calling `player:LoadCharacter()`
  as the last step of join makes the ordering a property of the code rather than of the network.
  `[architect: decided]` This is the one structural call in this sheet, and wave 3 added a second
  yielding call to the join sequence, which makes it more load-bearing rather than less.
- **Turning auto-load off is a decision about the FIRST character, and it silently became a
  decision about every character after it.** `Players.RespawnTime` is never consulted again, so
  the delay, the guard and the second `LoadCharacter` are all the server's. `onDeath` runs long
  after `load` returned, so there is still no race, and it re-enters `onSpawn` through the
  connection `onJoin` already made rather than through a second code path. `[cid: decided]`
  `traversal.death` confirms the whole shape: `possibleByDesign: false`, `damageSources: 0`,
  `healthWrittenByGameCode: false`, `lossOnRespawn: "none"`, `authoredCue: "none"` — and it
  routes `respawnDelayOwner` to `architect/01-runtime`. Death is one menu item away at all times.
- **Death costs nothing, and that is why the phase is four steps.** `currency`, `upgrades`,
  `cleared`, `found` and `areasFinished` are untouched, the lane is not rebuilt, the slot is not
  released. The only things a death changes are where the character is standing — which
  `onSpawn` puts right by pivoting to the live bay's spawn Attachment — and the arming gate,
  which resets by design.
- **`traversal.death.respawnAt` is `"areaSpawn"`, and the spawn moves.** A player who dies in the
  eighth bay respawns at the eighth bay's spawn, not at the first's, because
  `plots.advance` moved the Attachment when the bay was built. `plots.spawn.plotLocal` gives the
  bay-1 value and `representation` carries the generalisation. Without this a Reset Character in
  bay 8 would be a 2,500-stud walk, which is a loss `traversal.death.lossOnRespawn` says does not
  exist.
- **The publish point is the insert into `states`, and it now has two prerequisites.** `clearing`
  ticks whatever is in the collection, every 0.12 s, from before the first player joins. So the
  insert publishes a player to the rest of the server, and it goes after `load` **and after
  `entitlements.refresh`** and before anything that mutates the state. `onLeave` is the mirror:
  lift the state out and delete the entry first, so no tick can touch a state being saved and
  torn down.
- **Walk speed is written twice, the tool head twice, and the other two axes never.** Radius and
  value are read fresh inside the tick that uses them, so a purchase takes effect on the next
  tick with no write anywhere. Walk speed lands on a `Humanoid` and the tool head lands on a
  `Part`, so both need a writer on every new character and after every purchase. Both re-applies
  are **unconditional** on success rather than gated on which upgrade was bought: the gated
  version is one line shorter and one refactor away from re-opening the trial-1 defect, and
  rewriting the same number costs nothing. `products.items[span]` is exactly why the tool refresh
  is not gated on `upgradeId == "radius"` either — an entitlement can change the head with no
  level changing at all.
- **Save before teardown, not after.** `plots.despawn` clears `state.patches` and
  `state.spawnPivot`; `persistence` does not save either, so the order does not currently matter
  — and it will the first time someone persists something `despawn` touches.
- **`onShutdown` skips Studio.** `BindToClose` runs on every Studio stop, and a Studio session
  writing to the live DataStore under `runtime.dataStoreName` corrupts real saves with test data.
- **The client asks, it is not only told.** `client-main` may not assume the join-time push
  arrived, because the HUD is built after the client boots. So the same snapshot arrives two
  ways: pushed on `StateChanged`, and pulled once through `RequestState` after every updater is
  live. Both go through the same fan-out, so a duplicate is idempotent.
- **The tick pushes a snapshot, because nothing else does.** `currency`, `clearedCount`, `found`
  and `areasFinished` change inside the tick and nowhere else, so between purchases the balance
  readout and the progress bar would be frozen. One `FireClient` per player per tick, only on a
  pass that changed something.
- **A successful purchase now fires two channels and a failed one fires none.**
  `input.verbs[buy].onPreconditionFail` is `silentNoOp` and
  `input.pressable.rejectionCueOnFailedPrecondition` is `"none"`, so failure is silence all the
  way down. Success fires `UpgradeApplied` — which `response.beats[upgradePurchased]` needs,
  with a 200 ms acknowledgment budget and `effectAppliedBeforeAcknowledgment: true`, meaning the
  effect lands first and the cue follows — and one `StateChanged`.
- **There is no area-complete latch any more, and nothing lost by that.** The wave-1 shape read
  a boolean in three places to stop a finished area paying twice. The shape now is that a
  finished bay has no patch record in `state.patches` for the tick to iterate, because `plots`
  only ever builds the live bay. `clearing` cannot pay for a patch that is not in the array it
  walks. `[brief: binding]` *"Cleared is permanent — overgrowth never returns"* is satisfied by
  construction rather than by a flag three modules agree to check.

```manifest
{
  "provides": "wiring",
  "value": {
    "boot": [
      { "order": 1, "module": "world", "fn": "configure()", "calledBy": "server-main", "does": "FIRST, before anything else. Register the collision group social.characterCollision.groupName names and set both rows of social.characterCollision.collidable; disable ChatWindowConfiguration.Enabled and BubbleChatConfiguration.Enabled, which is a WRITE because social.chat.overridesPlatformDefault records the window defaults to true; and READ Players.MaxPlayers, warning once naming social.maxPlayers if it is outside 12 to 20. It is first because a character that spawns before the collision group exists is in the wrong group for its whole life, and because a chat window that appears for one frame has already broken social.chat.playerAuthoredStringsToOtherClients being 0." },
      { "order": 2, "module": "server-main", "does": "Set Players.CharacterAutoLoads = false. Removes the race between a character spawning and the two yielding calls in onJoin returning." },
      { "order": 3, "module": "protocol", "fn": "createRemotes()", "calledBy": "server-main", "does": "Create the remotes Folder at tree.remotesRoot and one Instance per channel in protocol.REMOTES: six RemoteEvents and one RemoteFunction, each class taken from that table. protocol does this, not server-main, so the folder name and the class per channel live in the module that owns the names. Done before any player can join." },
      { "order": 4, "module": "server-main", "does": "Create the live collection: one empty table, keyed by UserId. Never replaced, only mutated, because clearing holds it by reference." },
      { "order": 5, "module": "clearing", "fn": "start(states)", "calledBy": "server-main", "does": "Hand clearing the collection and let it install its own runtime.clearTickRate loop. Ticking an empty collection before the first join is normal." },
      { "order": 6, "module": "server-main", "does": "Start the periodic save loop: every runtime.saveIntervalSeconds, call persistence.save for every state in the collection." },
      { "order": 7, "module": "server-main", "does": "Bind game:BindToClose to onShutdown, connect protocol.channel(\"BuyUpgrade\").OnServerEvent to onPurchase, and set protocol.channel(\"RequestState\").OnServerInvoke to return one snapshot for the calling player. Those two are input.clientOriginatedRemotes in full; there is no third handler to write because there is no third client-originated channel." }
    ],
    "onJoin": [
      { "order": 1, "module": "persistence", "fn": "load(player)", "calledBy": "server-main", "does": "Load the player's saved state, or defaultState() on a DataStore failure, and RECONCILE it before returning: clamp areasFinished at 0, drop any cleared index at or above layout.areaSpec(areasFinished + 1).patchCount with a warning, derive clearedCount from the cleared set rather than trusting the stored number, and fill missing rowsRevealed and found keys with false. YIELDS. Nothing else may run for this player until it returns." },
      { "order": 2, "module": "entitlements", "fn": "refresh(player, state)", "calledBy": "server-main", "does": "Resolve state.owned: one products.ownershipCheck call per products.items[] entry. YIELDS. It runs BEFORE the publish point because modifiers.effective reads state.owned on every tick, and a state published with an empty owned map pays the unpurchased multiplier for as long as the web call takes — products.F20 puts ownership on the join path and nowhere else, so this is the only place it can be resolved. Every gamePassId is null today, so it currently short-circuits without a web call." },
      { "order": 3, "module": "progression", "fn": "revealRows(state)", "calledBy": "server-main", "does": "Lift any upgrade row whose level-1 cost the loaded balance already meets. Idempotent and never lowers one — firstSession.suppressionForbidden bans reSuppression — so this only ever catches up a save whose balance moved without a row lifting." },
      { "order": 4, "module": "server-main", "does": "Set state.player = player. The only write to that field, ever." },
      { "order": 5, "module": "server-main", "does": "THE PUBLISH POINT: states[player.UserId] = state. The player becomes visible to clearing.tick at this instant and not before, which is why it is after steps 1 and 2." },
      { "order": 6, "module": "plots", "fn": "spawn(player, state)", "calledBy": "server-main", "does": "Claim a slot and build the lane for live area state.areasFinished + 1: the slab spanning plots.pitchStuds across and bays 1 to live inward, the four boundary parts, the spawn Attachment at the LIVE bay, and one Instance per patch of the LIVE BAY that state.cleared does not mark. Bays below the live one get walkable floor and nothing else. Writes state.patches and state.spawnPivot. Returns the spawn CFrame, which server-main keeps for this player until they leave." },
      { "order": 7, "module": "server-main", "does": "Push a snapshot: protocol.channel(\"StateChanged\"):FireClient(player, snapshot). May arrive before the client's HUD exists, which is why client-main also pulls one." },
      { "order": 8, "module": "server-main", "does": "Connect player.CharacterAdded to onSpawn. Safe to connect now: the state exists and the lane exists." },
      { "order": 9, "module": "server-main", "fn": "player:LoadCharacter()", "does": "Load the character, last. Everything onSpawn needs is now in place, so onSpawn needs no waits and no retries." }
    ],
    "onSpawn": [
      { "order": 1, "module": "server-main", "does": "Look up states[player.UserId]. If absent, the player left mid-spawn: return, do nothing, do not error." },
      { "order": 2, "module": "server-main", "does": "character:WaitForChild(\"Humanoid\") and wait for the HumanoidRootPart." },
      { "order": 3, "module": "world", "fn": "onCharacter(character)", "calledBy": "server-main", "does": "Put every BasePart of the character into the collision group and connect DescendantAdded so a part added later gets it too — social.characterCollision.appliedTo, whose second clause is why this is a connection and not a loop. Before the pivot, so two characters never overlap while colliding." },
      { "order": 4, "module": "server-main", "does": "Connect humanoid.Died to onDeath, once for THIS character. A Humanoid dies at most once and every new character brings a new one, so this leaks nothing and needs no disconnect. Connected BEFORE the pivot, so a character that somehow dies in the frame it spawned still respawns." },
      { "order": 5, "module": "server-main", "does": "PivotTo the spawn CFrame plots returned for this player, raised 3 studs on Y. traversal.death.respawnAt is 'areaSpawn' and plots moved the Attachment when the bay was built, so this is the LIVE bay's spawn and not bay 1's. In area 1 this is also where firstSession's opening beat is kept: the player arrives 8 studs into bay 1 with the nearest patch at most 3.5 studs away, and clears nothing until they move." },
      { "order": 6, "module": "modifiers", "fn": "effective(state, axis)", "calledBy": "server-main", "applies": "speed", "does": "THE DEFECT TRIAL 1 FOUND: server-main writes humanoid.WalkSpeed = modifiers.effective(state, \"speed\"). modifiers computes and never writes; this line is the only place the Pace upgrade — and any set or purchase factor on the speed axis — reaches the engine. IT IS ALSO THE ONLY HUMANOID PROPERTY WRITE IN THE GAME: response.humanoidWritesAllowed is exactly ['WalkSpeed'], traversal.jump's jumpHeight 7.2 and useJumpPower false are the engine's own defaults being recorded rather than values to write, and traversal.death.healthWrittenByGameCode is false." },
      { "order": 7, "module": "tool", "fn": "equip(player, state)", "calledBy": "server-main", "does": "Build the one held tool and weld it to RightHand — tool.grantedAt is 'spawn', so this runs on every character including the one onDeath loads. equip calls refresh itself, so the head width is right on the first frame." },
      { "order": 8, "module": "server-main", "does": "Push a snapshot on protocol.channel(\"StateChanged\"). The HUD is not rebuilt on a respawn, so this is a refresh, not a boot. It runs after a death respawn too: the client's ScreenGui survived, and one idempotent snapshot is cheaper than reasoning about whether it needed one." }
    ],
    "onDeath": [
      { "order": 1, "module": "server-main", "does": "humanoid.Died, from the connection onSpawn step 4 made for THIS character. Recover the player from the character. THIS PHASE IS THE ONLY THING IN THE GAME THAT LOADS A SECOND CHARACTER: with CharacterAutoLoads false and one LoadCharacter in onJoin, its absence meant the first death was the last for the session. traversal.death.possibleByDesign is false and damageSources is 0, so the only route here is the Roblox menu's Reset Character — which is available to every player in every session." },
      { "order": 2, "module": "server-main", "does": "Wait runtime.respawnDelaySeconds, read as GameConfig.RespawnDelaySeconds and never as a literal. Nothing is torn down during the wait: the state stays in the live collection so the save loop still writes it, the lane stays built, and clearing.tick keeps visiting the state and takes the character-or-HumanoidRootPart skip it already has. No death test is added to the tick, deliberately — a corpse does not move, and everything inside its clear radius was cleared while it was alive." },
      { "order": 3, "module": "server-main", "does": "AFTER the wait, re-test two things in this order: states[player.UserId] is still present, and player.Parent is still Players. If either is false the player left during the delay, and this phase then does NOTHING — no LoadCharacter, no warn, no error." },
      { "order": 4, "module": "server-main", "fn": "player:LoadCharacter()", "does": "Load the character. The CharacterAdded connection from onJoin step 8 is still live, so onSpawn runs again in full: the new character is put in the collision group, pivoted back to THIS player's LIVE bay spawn, given WalkSpeed from modifiers.effective, handed a fresh tool, and pushed a snapshot. Nothing else re-runs: no lane is rebuilt, no slot re-claimed, no state re-loaded, no ownership re-resolved and no currency touched. THE ARMING GATE RESETS BY ITSELF: clearing.tick sees a character it has not armed for and rewrites state.armState, so the player must move firstSession.armDistanceStuds again before anything clears — firstSession.armScope is perCharacterSpawn and this is the case that word is about." }
    ],
    "onPurchase": [
      { "order": 1, "module": "server-main", "does": "protocol.channel(\"BuyUpgrade\").OnServerEvent received with one string. Look up states[player.UserId]; if absent, drop the message. Reject any payload that is not a string. economy.authority: no client message carries a cost, an amount or a balance, and this handler enforces that by accepting nothing else." },
      { "order": 2, "module": "progression", "fn": "tryBuy(state, upgradeId)", "calledBy": "server-main", "does": "Validate and apply, or change nothing and return false. The server prices it; the client sent only an id. On false the phase ENDS HERE: nothing is sent, nothing is played, nothing is shown — input.verbs[buy].onPreconditionFail is silentNoOp and input.pressable.rejectionCueOnFailedPrecondition is 'none'." },
      { "order": 3, "module": "modifiers", "fn": "effective(state, axis)", "calledBy": "server-main", "applies": "speed", "does": "On success only: re-write humanoid.WalkSpeed from modifiers.effective(state, \"speed\"), UNCONDITIONALLY, whichever upgrade was bought. Gating this on upgradeId == \"speed\" is one line shorter and one refactor away from re-opening the trial-1 defect." },
      { "order": 4, "module": "tool", "fn": "refresh(player, state)", "calledBy": "server-main", "does": "On success only: re-resolve the tool head's width from modifiers.effective(state, \"radius\"). Also unconditional, and for a second reason: products.items[span] changes the effective radius with no level moving at all, so a gate on upgradeId would make a 499-Robux purchase invisible." },
      { "order": 5, "module": "server-main", "does": "On success only: fire protocol.channel(\"UpgradeApplied\"):FireClient(player, upgradeId, newLevel), then push a snapshot on StateChanged. In that order: response.beats[upgradePurchased].effectAppliedBeforeAcknowledgment is true, so the effect has already landed by the time the cue is told about it, and the 200 ms acknowledgment budget is measured from this packet. On failure send neither — the server is the only writer, so the client's HUD is already correct." }
    ],
    "onTick": [
      { "order": 1, "module": "clearing", "fn": "tick(states)", "calledBy": "clearing", "applies": "radius, value", "fires": "FindRevealed, SetCompleted, AreaRestored, StateChanged", "does": "Every runtime.clearTickRate, inside a pcall so one bad iteration cannot stop the loop. Per state, in this order. (1) THE ARMING GATE: if state.armState.character is not state.player.Character, rewrite armState as { character = the current one, armed = false } — that is how firstSession.armScope 'perCharacterSpawn' resets with only one module writing the field. Skip the state if the character or its HumanoidRootPart is absent. If not armed, measure the horizontal XZ displacement from state.spawnPivot; if it exceeds firstSession.armDistanceStuds (2.0) set armed true, and if it does not, RETURN FOR THIS STATE — no distance work, no clear, no award, no packet. (2) Read radius once with modifiers.effective(state, 'radius'). (3) Clear every uncleared patch within that XZ distance: set patch.cleared, destroy patch.instance, set state.cleared[index], increment state.clearedCount, and award max(economy.payoutFloor, floor(tiers[patch.tierIndex].value * modifiers.effective(state, 'value'))) — economy.faucets[patch-clear].formula verbatim, floored per its rounding rule, and the ONLY site the value multiplier is applied. If patch.find is set and state.found does not hold it, set it and fire FindRevealed; if that completes a set, fire SetCompleted once with the set id. (4) If clearedCount has reached the live area's patchCount: increment state.areasFinished by exactly 1, EMPTY state.cleared, zero clearedCount, call plots.advance(state) — plots.liveGeometry.bayBuiltAt is 'the instant the previous bay's last patch clears', so it is here and not in a deferred job — and fire AreaRestored once with the finished area's label. (5) If the pass changed anything, fire StateChanged once with a fresh snapshot; none at all on a pass that cleared nothing. All channels through protocol.channel(name). Reads no client message and uses no Touched event." }
    ],
    "onSave": [
      { "order": 1, "module": "persistence", "fn": "save(player, state)", "calledBy": "server-main", "does": "Every runtime.saveIntervalSeconds, for every state in the collection. A failure warns and the loop continues; the next pass retries by existing. The payload is the seven persisted fields and has no conditional branch in it: cleared already describes the live area only." }
    ],
    "onLeave": [
      { "order": 1, "module": "server-main", "does": "Players.PlayerRemoving. Lift the state out of the collection and delete states[player.UserId] FIRST, so no tick can touch a state that is being saved and torn down. If there is no entry, the player never finished joining: return." },
      { "order": 2, "module": "persistence", "fn": "save(player, state)", "calledBy": "server-main", "does": "Save, and wait for it. Before teardown." },
      { "order": 3, "module": "plots", "fn": "despawn(state)", "calledBy": "server-main", "does": "Destroy the lane slab, which takes its patches, its four boundary parts and its spawn Attachment with it, and release the slot so the next player reuses it — social.plotTenure.releasedOn is PlayerRemoving and slotReservedOnLeave is false. NOTHING ABOUT THE DEPARTURE IS PERCEPTIBLE TO ANY REMAINING PLAYER: social.plotTenure.onLeaveMidArea says so, and social.forbidden X11 bans join and leave notices, toasts, sounds and strings naming another player." },
      { "order": 4, "module": "server-main", "does": "Drop the spawn CFrame held for this player. Nothing else references the state; it is garbage." }
    ],
    "onShutdown": [
      { "order": 1, "module": "server-main", "does": "game:BindToClose. If RunService:IsStudio() then return immediately — a Studio stop must not write test data to the live store under runtime.dataStoreName. Otherwise call persistence.save for every state still in the collection and wait for all of them." }
    ],
    "onClientBoot": [
      { "order": 1, "module": "client-main", "does": "Create one ScreenGui in PlayerGui. Created once, and it survives every character respawn. It does NOT wait for the remotes Folder itself: protocol.channel does that once, inside Protocol.luau, on its first call." },
      { "order": 2, "module": "client-main", "does": "UIBuilder.build(Screens.hud, Theme, screenGui) to get the HUD's Root frame. No client module authors the HUD's readouts." },
      { "order": 3, "module": "hud-binding", "fn": "bind(root, gui)", "calledBy": "client-main", "does": "Resolve the HUD's named readouts once and return an updater. A node name that no longer resolves warns here, once. The updater also applies firstSession.withheld: no denominator on the collection count until the first reveal, no upgrade row until rowsRevealed says so, and none of firstSession.suppressionForbidden's devices to say so." },
      { "order": 4, "module": "input", "fn": "connect(gui)", "calledBy": "client-main", "does": "THE PURCHASE PATH, AND IT IS NOT A KEYPRESS. connect calls pressables.bind(gui, onActivate), which creates the four game-drawn pressables — input.gameDrawnPressables is 4 — and installs the handler: a purchase press fires BuyUpgrade with one upgrade id, and the index press calls index-screen.toggle() locally. input.travelRequiredToPurchase is 'none' and input.gameBoundInputClasses is ['pressable'], so a touch player buys in one press with no travel. It returns the updater pressables.bind gave it, so client-main holds no handle. THE SHIPPED Enum.KeyCode.One/Two/Three BINDING IS SUPERSEDED: input.pressable.keyboardAcceleratorRequired is false, so a key may sit beside a button and may never be the only path to one." },
      { "order": 5, "module": "index-screen", "fn": "bind(gui)", "calledBy": "client-main", "does": "Create the collection surface hidden and return an updater. It is absent for a player who has revealed nothing — firstSession.withheld.collectionPanel, latched on 'the collection map is non-empty' with newSaveFields 0, so its presence is derived from the snapshot's found map and nothing is stored for it." },
      { "order": 6, "module": "beats", "fn": "connect(gui)", "calledBy": "client-main", "does": "Connect FindRevealed, SetCompleted, AreaRestored and UpgradeApplied, and return an updater so the one unsequenced beat, patchClear, can be driven from a rise in snapshot.clearedCount. beats owns the schedule — response.beats[].rank, response.minOnsetGapSeconds, response.channelExclusivity and response.onOverload — and the cue bodies are EMPTY. What a reveal looks, sounds and reads like belongs to Art — VFX, Audio — Stingers and UI/UX — Feedback, none of which owns a contract key; they are connected anyway so each channel has a receiver and adding presentation is a change to one function body." },
      { "order": 7, "module": "client-main", "does": "Collect the four updaters from steps 3 to 6 into one fan-out, connect protocol.channel(\"StateChanged\").OnClientEvent to it, THEN call protocol.channel(\"RequestState\"):InvokeServer() once and pass the result to the same fan-out. In that order, so a push arriving during the round trip is not lost. Every updater is idempotent, which is also what makes two originators on StateChanged safe." }
    ],
    "constructs": [
      {
        "module": "persistence",
        "fn": "defaultState()",
        "initialises": ["currency", "upgrades", "rowsRevealed", "found", "areasFinished", "cleared", "clearedCount"],
        "values": {
          "currency": "0 — economy.startingBalance. economy.zeroCreditEvents[session-start] is explicit that there is no welcome grant, no return grant and no offline accrual.",
          "upgrades": "{} — an empty map. A missing key reads as level 0; no upgrade is written until it is bought.",
          "rowsRevealed": "{} — an empty map. firstSession.withheld.upgradeRow.presentAtJoin is false, so every row starts withheld and progression.revealRows lifts them.",
          "found": "{} — an empty map keyed by the Find names in collection.sets[].relics",
          "areasFinished": "0 — the live area is areasFinished + 1, so a new player starts in area 1, East Terrace",
          "cleared": "{} — an empty map keyed by layout index, describing the live area only",
          "clearedCount": "0"
        },
        "note": "THE ONLY CONSTRUCTOR. Every persisted field gets a value here, so a new player has no undefined field and no module has to guess a default at the point of use. It also sets the five live fields to their empty forms — patches {}, spawnPivot nil, owned {}, armState { character = nil, armed = false }, player nil — so the table is complete before anything touches it. persistence.load returns this on a DataStore failure, so it may not yield and may not touch a DataStore."
      },
      {
        "module": "server-main",
        "fn": "the PlayerAdded handler",
        "initialises": ["player"],
        "note": "Set once, in onJoin step 4, after both yielding calls have returned and before the state enters the collection. Never reassigned. Not persisted and not in a snapshot — protocol.snapshotShape does not name it, and social.forbidden X7 is why no player identifier crosses the wire at all."
      },
      {
        "module": "entitlements",
        "fn": "refresh(player, state)",
        "initialises": ["owned"],
        "note": "One key per products.items[] entry, resolved at join and NEVER persisted — products.F20 and modifiers.sources[purchase].storage both say ownership is read live every join. Runs before the publish point so no tick sees an empty map."
      },
      {
        "module": "plots",
        "fn": "spawn(player, state)",
        "initialises": ["patches", "spawnPivot"],
        "note": "patches is built from layout.build(state.areasFinished + 1) with the slot origin added, filtered by state.cleared for the INSTANCES but not for the records: a cleared patch keeps its record with cleared true and instance nil, so indices stay aligned with layout's order and therefore with state.cleared. It holds the LIVE BAY ONLY. spawnPivot is the world position of the live bay's spawn Attachment, which clearing measures firstSession's arming displacement from. Both are rebuilt by plots.advance when an area finishes, and both are discarded on leave; neither is persisted."
      },
      {
        "module": "clearing",
        "fn": "tick(states)",
        "initialises": ["armState"],
        "note": "Written on the first tick that sees a character, and rewritten on the first tick that sees a DIFFERENT one. That is the whole of firstSession.armScope 'perCharacterSpawn': the reset is a property of the tick rather than a second module's write, which is what keeps one writer on the field. defaultState leaves it { character = nil, armed = false }, which is the correct value for a state with no character."
      }
    ]
  }
}
```

## Consequences for the builders

A builder may now assume:

- That when `onSpawn` runs, the state exists, is fully loaded, has its ownership resolved, and
  the lane is already built. No waiting, no polling, no retry.
- That `clearing.tick` never sees a state without a `player`, never sees one with an empty
  `owned` map, and never sees one being torn down.
- That a snapshot arriving twice is normal, and every updater must therefore be idempotent.
- That nothing constructs a `PlayerState` except `persistence.defaultState()`.
- That the arming gate needs no code outside `clearing.tick`.

A builder may **not** assume:

- That `CharacterAutoLoads` is on. Exactly two steps in this contract spawn a character:
  `onJoin` step 9 and `onDeath` step 4, and there may never be a third.
- That a `Humanoid` retains a `WalkSpeed` written to a previous character, or that any other
  `Humanoid` property may be written at all.
- That a death is rare. It is one menu item away at all times.
- That `onPurchase` may send anything on a failed buy, or that a client may be told a price.
- That a new area is built by anything other than `clearing` calling `plots.advance` inside the
  tick.

## Acceptance criteria

1. In a fresh save, a player's `Humanoid.WalkSpeed` is `movement.baseWalkSpeed` (16) within one
   second of spawning; after buying Pace once it is 17.6 without respawning; after dying and
   respawning it is still 17.6.
2. **Reset Character from the Roblox menu returns the player to their CURRENT bay.** A new
   character appears `runtime.respawnDelaySeconds` after the death, on the live bay's spawn
   Attachment, with the same currency, levels, cleared set, found set, `areasFinished` and slot —
   and clears nothing until it has moved 2.0 studs.
3. Leaving during the death delay produces no error: one save, one despawn, and no character is
   loaded when the wait ends.
4. `clearing.tick` never observes a state whose `player` is nil or whose `owned` is empty, over
   100 join/leave cycles.
5. A player who joins with `areasFinished` 3 and `clearedCount` 40 stands on continuous floor
   over four bays, sees `depths.areas[4].patchCount - 40` patch Instances in bay 4 and none
   anywhere else.
6. **A brand-new player clears nothing while standing still, however long they stand there**,
   and clears the nearest patch within `firstSession.ceilings.secondsToFirstClear` (3 s) of
   their first input. The first reveal lands within
   `firstSession.ceilings.secondsToFirstReveal` (10 s) of join.
7. `AreaRestored` fires exactly once per player per area and never on the `FindRevealed` channel;
   `SetCompleted` fires exactly once per player per set.
8. Finishing an area builds the next bay before the next tick: there is no frame in which a
   player stands on a lane with no patches and no floor ahead of them.
9. Leaving mid-session saves before the lane is destroyed, and produces no notice, sound or
   string on any other client.
10. Stopping a Studio session writes nothing to the DataStore.
11. Erroring deliberately inside one iteration of `tick` leaves the loop running for every other
    player.
12. **The wave-1 exploit, as a test, at the new shape.** A player who finishes area 1 and rejoins
    is in area 2, has zero patch Instances in bay 1, is paid nothing for walking back through it,
    and has `areasFinished` reading 1 — never 2 — after ten more rejoins.
13. Clearing one patch pushes exactly one `StateChanged`; standing still for ten ticks pushes
    none. A successful purchase pushes one `UpgradeApplied` and one `StateChanged`; a failed one
    pushes neither.
14. All five server-to-client channels have a connected handler on the client after boot, and
    every module with a non-empty `fires` list depends on `protocol`.
15. No chat window and no chat bubble appears in any session, and two characters walk through
    each other.

## Not decided here

Retry and backoff inside `persistence`. What a snapshot is serialised as on the wire beyond the
field list `protocol.snapshotShape()` fixes. What a beat looks and sounds like — `beats` fixes
the schedule and the bodies are empty.

**Closed since wave 1:** the purchase affordance's shape used to be routed to UI/UX as an open
question, with keyboard 1/2/3 recorded as an interim. `input` answered it — a game-drawn
pressable, `travelRequiredToPurchase: "none"`, `keyboardAcceleratorRequired: false` — and
`pressables` is the module that executes it. The largest known gap in this pipeline, that a
mobile-heavy audience could not spend currency, is closed by that pair.

**Also closed since wave 1:** this sheet used to end by routing "there is nothing to walk into"
back to Meta & Content as the largest hole in either manifest. `depths`, `layout`, `plots` and
`endgame` filled it: eight areas, chunk composition, a lane of bays and an unlimited
post-terminal run. The three items this stage still routes back are in `02-modules.md` — set
bonuses with no magnitude, game passes with no id, and a store with no control to open it.
