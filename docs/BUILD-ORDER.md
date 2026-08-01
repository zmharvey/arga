# Build order

**Generated — do not edit.** Emitted by `npm run bridge -- --emit` from CID spec sheets.
Edit the Architecture sheet that owns the module list and re-emit.

**18 modules, in dependency order.** Build them in this order and each one's
dependencies already exist. Every value a module needs is resolved below, so nothing here
requires reading a spec sheet or inventing a number.

**Two rules for whoever builds these:**

1. **Do not invent a value.** If you need a number that is not listed under your module's
   *Values*, that is a gap in the contract. Stop and report it rather than choosing one —
   a chosen number is indistinguishable from a specified one once it is in the code.
2. **The prohibitions are not advice.** A module's *Must not* list exists because the
   design breaks if it is violated, usually for a reason recorded in the brief.

UI modules are absent on purpose: screens come from `ui-forge` via
`npm run emit`, not from here.

---

# How this build is put together

**Read this once. It applies to every module below**, so it is not repeated in each one.
These are the architect's decisions, not the designers': where code lives, what a player's
state looks like, what each object is made of, and what happens in what order.

#### `tree` *(from 04-tree.md)*

```json
{
  "sharedRoot": "ReplicatedStorage.UIForge",
  "serverRoot": "ServerScriptService.Game",
  "clientRoot": "StarterPlayer.StarterPlayerScripts.UIBoot",
  "remotesRoot": "ReplicatedStorage.Remotes",
  "requireStyle": "instance",
  "requireExample": "local GameConfig = require(game:GetService(\"ReplicatedStorage\"):WaitForChild(\"UIForge\"):WaitForChild(\"GameConfig\"))",
  "projectFile": "game/default.project.json",
  "clientRuntimeRoot": "Players.LocalPlayer.PlayerScripts.UIBoot",
  "diskPaths": {
    "shared": "game/src/shared",
    "server": "game/src/server",
    "client": "game/src/client"
  },
  "rootClass": {
    "shared": "Folder — game/src/shared has no init file, so the root is a plain container",
    "server": "Script — game/src/server/init.server.luau IS ServerScriptService.Game; the other server modules are its children",
    "client": "LocalScript — game/src/client/init.client.luau IS StarterPlayerScripts.UIBoot; the other client modules are its children"
  },
  "examples": {
    "sharedFromAnySide": "local Shared = game:GetService(\"ReplicatedStorage\"):WaitForChild(\"UIForge\")\nlocal GameConfig = require(Shared.GameConfig)\nlocal Layout = require(Shared.Layout)\nlocal Protocol = require(Shared.Protocol)",
    "serverModuleFromTheServerEntryPoint": "local Persistence = require(script.Persistence)",
    "serverModuleFromAnotherServerModule": "local Progression = require(script.Parent.Progression)",
    "clientModuleFromTheClientEntryPoint": "local HudBinding = require(script.HudBinding)",
    "clientModuleFromAnotherClientModule": "local Input = require(script.Parent.Input)",
    "sharedModuleFromAnotherSharedModule": "local GameConfig = require(script.Parent.GameConfig)"
  },
  "moduleFiles": {
    "shared": [
      "GameConfig.luau",
      "Types.luau (generated)",
      "Layout.luau",
      "Protocol.luau",
      "Modifiers.luau"
    ],
    "server": [
      "init.server.luau (the root itself)",
      "World.luau",
      "Persistence.luau",
      "Progression.luau",
      "Entitlements.luau",
      "Plots.luau",
      "Tool.luau",
      "Clearing.luau"
    ],
    "client": [
      "init.client.luau (the root itself)",
      "HudBinding.luau",
      "Pressables.luau",
      "IndexScreen.luau",
      "Beats.luau",
      "Input.luau"
    ],
    "note": "Seven of these are new in this revision — Modifiers, World, Entitlements, Tool, Pressables, IndexScreen and Beats — and every one is a plain PascalCase.luau ModuleScript under an EXISTING root. NO FOURTH ROOT IS NEEDED and game/default.project.json still needs no edit, which is the property this key exists to protect."
  },
  "fileNaming": {
    "module": "PascalCase.luau -> a ModuleScript of the same name. Persistence.luau -> ServerScriptService.Game.Persistence",
    "serverEntry": "init.server.luau -> the Script at serverRoot itself, not a child of it",
    "clientEntry": "init.client.luau -> the LocalScript at clientRoot itself, not a child of it",
    "extraClientScripts": "any other *.client.luau in game/src/client becomes a sibling LocalScript, e.g. calibrate.client.luau -> UIBoot.calibrate"
  },
  "rules": [
    "Every module returns exactly one table and performs no work at require time.",
    "WaitForChild the shared root once, into a local; index its children directly after that.",
    "Never require across sides except into shared. A server module may not require a client module and the reverse, and the module schema refuses it on paper.",
    "Never write clientRuntimeRoot as a literal path. A client module reaching a sibling uses script.Parent; the entry point uses script.",
    "The client tree is authored at clientRoot and replicated to clientRuntimeRoot per player. Both names are here so a builder recognises the second one in an error message, not so anything indexes it."
  ]
}
```

#### `stateShape` *(from 03-state-shape.md)*

```json
{
  "fields": [
    {
      "name": "currency",
      "type": "number",
      "writtenBy": "progression",
      "persisted": true,
      "note": "Shards. Increased only by progression.award, decreased only by progression.tryBuy. economy.startingBalance is 0, economy.balanceCap is null, and economy.negativeBalance says a purchase that cannot be afforded changes nothing at all."
    },
    {
      "name": "upgrades",
      "type": "map<upgradeId,integer>",
      "writtenBy": "progression",
      "persisted": true,
      "note": "Held level per upgrades[].id. A missing key reads as level 0. modifiers.sources[upgrade-level].storage: the held level is persisted and the effect is derived from it at every read, never the other way round."
    },
    {
      "name": "rowsRevealed",
      "type": "map<upgradeId,boolean>",
      "writtenBy": "progression",
      "persisted": true,
      "note": "firstSession.withheld.upgradeRow: presentAtJoin false, liftedBy 'balance has reached upgrades[i] level-1 cost', latched true, latchSource 'one persisted boolean per row', newSaveFields 3. Set true by progression.revealRows and NEVER set false — firstSession.suppressionForbidden bans reSuppression. Three keys, forever."
    },
    {
      "name": "found",
      "type": "map<findName,boolean>",
      "writtenBy": "clearing",
      "persisted": true,
      "note": "discovery.record: keyed by the Find's name from collection.sets[].relics, one boolean per name, default false, written by the server at the instant the hiding patch clears, clearedBy nothing ever. Exactly sum(collection.sets[].relics.length) = 24 keys at most, and discovery.record.growth says the record never grows with play. None of discovery.record.forbiddenFields may appear beside it. Set completion, the collection count, the denominator and the collection panel are ALL derived from this map and none of them is stored."
    },
    {
      "name": "areasFinished",
      "type": "integer",
      "writtenBy": "clearing",
      "persisted": true,
      "note": "endgame.risingQuantity. The count of areas this player has cleared to the last patch, 0 to 8 for the authored ladder and unbounded after it. THE LIVE AREA IS areasFinished + 1, always, which is depths.unlockRule stated as arithmetic. endgame.persistence.postTerminalAreasStoredAs is 'one integer count, never one boolean per area' and this is that integer for the authored areas too. Incremented exactly once per area, by clearing, at the instant the live bay's last patch clears."
    },
    {
      "name": "cleared",
      "type": "map<patchIndex,boolean>",
      "writtenBy": "clearing",
      "persisted": true,
      "note": "THE LIVE AREA ONLY. Keyed by the 1-based index into layout.build(areasFinished + 1)'s canonical order. Bounded by that area's patchCount, at most 640. Emptied — not collapsed, EMPTIED — as part of incrementing areasFinished, so a finished area contributes nothing to it and the payload never grows with progress. Every area below the live one is entirely cleared by implication of areasFinished; every area above it does not exist yet. persistence.load is still the exact inverse of what save writes: it drops any index at or above the live area's patchCount, with a warning, because the live area changed size."
    },
    {
      "name": "clearedCount",
      "type": "integer",
      "writtenBy": "clearing",
      "persisted": true,
      "note": "The number of keys in cleared, for the LIVE area, and never above that area's patchCount. A cache so the progress readout does not count a 640-key table every tick, not a second source of truth: persistence.load derives it from the cleared set rather than trusting the stored number. Reset to 0 with cleared when an area finishes."
    },
    {
      "name": "patches",
      "type": "Patch[]",
      "writtenBy": "plots",
      "persisted": false,
      "note": "THE LIVE BAY ONLY — plots.liveGeometry.patchInstancesExistIn is 'the live bay only'. One record per index of layout.build(areasFinished + 1), whether cleared or not, with WORLD positions. Rebuilt on join from cleared and rebuilt wholesale by plots.advance when an area finishes. A finished bay has no record here at all, which is why clearing cannot pay for one twice and why no latch is needed to stop it."
    },
    {
      "name": "spawnPivot",
      "type": "Vector3",
      "writtenBy": "plots",
      "persisted": false,
      "note": "The world position of the live bay's spawn Attachment, written by plots.spawn and rewritten by plots.advance. clearing measures firstSession's arming displacement from this, in XZ only. It exists so the tick never has to guess the pivot from wherever the character happens to be standing on the frame it first sees it — server-main pivots in onSpawn, and a tick landing before that pivot would arm the player on the teleport."
    },
    {
      "name": "owned",
      "type": "map<productId,boolean>",
      "writtenBy": "entitlements",
      "persisted": false,
      "note": "One key per products.items[] entry, resolved once per join by entitlements.refresh through products.ownershipCheck. NEVER PERSISTED — products.F20: 'No purchase-derived state is written to persistence. Ownership is read live every join', and modifiers.sources[purchase].storage repeats it. Read by modifiers.effective and by nothing else. Every gamePassId is null today, so every value is false."
    },
    {
      "name": "armState",
      "type": "ArmState",
      "writtenBy": "clearing",
      "persisted": false,
      "note": "firstSession's arming gate. armScope is perCharacterSpawn, so this carries the character it was armed FOR: clearing.tick re-arms whenever armState.character is not state.player.Character, which makes the reset a property of the tick rather than a second module's write. armed goes true when the horizontal XZ displacement of the character root from spawnPivot first exceeds firstSession.armDistanceStuds (2.0) during that character's life, and clearing clears nothing at all while it is false."
    },
    {
      "name": "player",
      "type": "Player",
      "writtenBy": "server-main",
      "persisted": false,
      "note": "The Roblox Player. Set once at join, never reassigned. Exists because the collection is keyed by UserId, not by Player."
    }
  ],
  "types": {
    "Patch": {
      "position": "Vector3",
      "tierIndex": "integer",
      "find": "string?",
      "cleared": "boolean",
      "instance": "BasePart?"
    },
    "ArmState": {
      "character": "Instance?",
      "armed": "boolean"
    },
    "Vector3": {
      "__roblox": "Vector3"
    },
    "Player": {
      "__roblox": "Player"
    }
  },
  "collection": {
    "name": "states",
    "keyedBy": "UserId",
    "keyType": "integer — player.UserId, the same value persistence keys its DataStore by",
    "holds": "exactly one PlayerState per connected player, and nothing else",
    "ownedBy": "server-main",
    "entryAppears": "in wiring.onJoin, after persistence.load returns and entitlements.refresh has resolved and state.player is set — never before, or clearing.tick can see a state whose owned map is empty and pay the wrong multiplier",
    "entryDisappears": "in wiring.onLeave, before the save and before the lane teardown, so no tick can touch a state that is being torn down",
    "absentMeans": "that player is not in this server, or has not finished joining. A lookup miss is a return, not an error",
    "passedTo": "clearing.start(states) once at boot and clearing.tick(states) every runtime.clearTickRate, by reference — the table is mutated in place and never replaced",
    "iterationOrder": "undefined. Nothing may depend on it: social.worldStateScope and social.progressScope are both per-player, social.sharedState is empty, and social.forbidden X3 bans any server-held value more than one player's action increments"
  }
}
```

#### `wiring` *(from 07-wiring.md)*

```json
{
  "boot": [
    {
      "order": 1,
      "module": "world",
      "fn": "configure()",
      "calledBy": "server-main",
      "does": "FIRST, before anything else. Register the collision group social.characterCollision.groupName names and set both rows of social.characterCollision.collidable; disable ChatWindowConfiguration.Enabled and BubbleChatConfiguration.Enabled, which is a WRITE because social.chat.overridesPlatformDefault records the window defaults to true; and READ Players.MaxPlayers, warning once naming social.maxPlayers if it is outside 12 to 20. It is first because a character that spawns before the collision group exists is in the wrong group for its whole life, and because a chat window that appears for one frame has already broken social.chat.playerAuthoredStringsToOtherClients being 0."
    },
    {
      "order": 2,
      "module": "server-main",
      "does": "Set Players.CharacterAutoLoads = false. Removes the race between a character spawning and the two yielding calls in onJoin returning."
    },
    {
      "order": 3,
      "module": "protocol",
      "fn": "createRemotes()",
      "calledBy": "server-main",
      "does": "Create the remotes Folder at tree.remotesRoot and one Instance per channel in protocol.REMOTES: six RemoteEvents and one RemoteFunction, each class taken from that table. protocol does this, not server-main, so the folder name and the class per channel live in the module that owns the names. Done before any player can join."
    },
    {
      "order": 4,
      "module": "server-main",
      "does": "Create the live collection: one empty table, keyed by UserId. Never replaced, only mutated, because clearing holds it by reference."
    },
    {
      "order": 5,
      "module": "clearing",
      "fn": "start(states)",
      "calledBy": "server-main",
      "does": "Hand clearing the collection and let it install its own runtime.clearTickRate loop. Ticking an empty collection before the first join is normal."
    },
    {
      "order": 6,
      "module": "server-main",
      "does": "Start the periodic save loop: every runtime.saveIntervalSeconds, call persistence.save for every state in the collection."
    },
    {
      "order": 7,
      "module": "server-main",
      "does": "Bind game:BindToClose to onShutdown, connect protocol.channel(\"BuyUpgrade\").OnServerEvent to onPurchase, and set protocol.channel(\"RequestState\").OnServerInvoke to return one snapshot for the calling player. Those two are input.clientOriginatedRemotes in full; there is no third handler to write because there is no third client-originated channel."
    }
  ],
  "onJoin": [
    {
      "order": 1,
      "module": "persistence",
      "fn": "load(player)",
      "calledBy": "server-main",
      "does": "Load the player's saved state, or defaultState() on a DataStore failure, and RECONCILE it before returning: clamp areasFinished at 0, drop any cleared index at or above layout.areaSpec(areasFinished + 1).patchCount with a warning, derive clearedCount from the cleared set rather than trusting the stored number, and fill missing rowsRevealed and found keys with false. YIELDS. Nothing else may run for this player until it returns."
    },
    {
      "order": 2,
      "module": "entitlements",
      "fn": "refresh(player, state)",
      "calledBy": "server-main",
      "does": "Resolve state.owned: one products.ownershipCheck call per products.items[] entry. YIELDS. It runs BEFORE the publish point because modifiers.effective reads state.owned on every tick, and a state published with an empty owned map pays the unpurchased multiplier for as long as the web call takes — products.F20 puts ownership on the join path and nowhere else, so this is the only place it can be resolved. Every gamePassId is null today, so it currently short-circuits without a web call."
    },
    {
      "order": 3,
      "module": "progression",
      "fn": "revealRows(state)",
      "calledBy": "server-main",
      "does": "Lift any upgrade row whose level-1 cost the loaded balance already meets. Idempotent and never lowers one — firstSession.suppressionForbidden bans reSuppression — so this only ever catches up a save whose balance moved without a row lifting."
    },
    {
      "order": 4,
      "module": "server-main",
      "does": "Set state.player = player. The only write to that field, ever."
    },
    {
      "order": 5,
      "module": "server-main",
      "does": "THE PUBLISH POINT: states[player.UserId] = state. The player becomes visible to clearing.tick at this instant and not before, which is why it is after steps 1 and 2."
    },
    {
      "order": 6,
      "module": "plots",
      "fn": "spawn(player, state)",
      "calledBy": "server-main",
      "does": "Claim a slot and build the lane for live area state.areasFinished + 1: the slab spanning plots.pitchStuds across and bays 1 to live inward, the four boundary parts, the spawn Attachment at the LIVE bay, and one Instance per patch of the LIVE BAY that state.cleared does not mark. Bays below the live one get walkable floor and nothing else. Writes state.patches and state.spawnPivot. Returns the spawn CFrame, which server-main keeps for this player until they leave."
    },
    {
      "order": 7,
      "module": "server-main",
      "does": "Push a snapshot: protocol.channel(\"StateChanged\"):FireClient(player, snapshot). May arrive before the client's HUD exists, which is why client-main also pulls one."
    },
    {
      "order": 8,
      "module": "server-main",
      "does": "Connect player.CharacterAdded to onSpawn. Safe to connect now: the state exists and the lane exists."
    },
    {
      "order": 9,
      "module": "server-main",
      "fn": "player:LoadCharacter()",
      "does": "Load the character, last. Everything onSpawn needs is now in place, so onSpawn needs no waits and no retries."
    }
  ],
  "onSpawn": [
    {
      "order": 1,
      "module": "server-main",
      "does": "Look up states[player.UserId]. If absent, the player left mid-spawn: return, do nothing, do not error."
    },
    {
      "order": 2,
      "module": "server-main",
      "does": "character:WaitForChild(\"Humanoid\") and wait for the HumanoidRootPart."
    },
    {
      "order": 3,
      "module": "world",
      "fn": "onCharacter(character)",
      "calledBy": "server-main",
      "does": "Put every BasePart of the character into the collision group and connect DescendantAdded so a part added later gets it too — social.characterCollision.appliedTo, whose second clause is why this is a connection and not a loop. Before the pivot, so two characters never overlap while colliding."
    },
    {
      "order": 4,
      "module": "server-main",
      "does": "Connect humanoid.Died to onDeath, once for THIS character. A Humanoid dies at most once and every new character brings a new one, so this leaks nothing and needs no disconnect. Connected BEFORE the pivot, so a character that somehow dies in the frame it spawned still respawns."
    },
    {
      "order": 5,
      "module": "server-main",
      "does": "PivotTo the spawn CFrame plots returned for this player, raised 3 studs on Y. traversal.death.respawnAt is 'areaSpawn' and plots moved the Attachment when the bay was built, so this is the LIVE bay's spawn and not bay 1's. In area 1 this is also where firstSession's opening beat is kept: the player arrives 8 studs into bay 1 with the nearest patch at most 3.5 studs away, and clears nothing until they move."
    },
    {
      "order": 6,
      "module": "modifiers",
      "fn": "effective(state, axis)",
      "calledBy": "server-main",
      "applies": "speed",
      "does": "THE DEFECT TRIAL 1 FOUND: server-main writes humanoid.WalkSpeed = modifiers.effective(state, \"speed\"). modifiers computes and never writes; this line is the only place the Pace upgrade — and any set or purchase factor on the speed axis — reaches the engine. IT IS ALSO THE ONLY HUMANOID PROPERTY WRITE IN THE GAME: response.humanoidWritesAllowed is exactly ['WalkSpeed'], traversal.jump's jumpHeight 7.2 and useJumpPower false are the engine's own defaults being recorded rather than values to write, and traversal.death.healthWrittenByGameCode is false."
    },
    {
      "order": 7,
      "module": "tool",
      "fn": "equip(player, state)",
      "calledBy": "server-main",
      "does": "Build the one held tool and weld it to RightHand — tool.grantedAt is 'spawn', so this runs on every character including the one onDeath loads. equip calls refresh itself, so the head width is right on the first frame."
    },
    {
      "order": 8,
      "module": "server-main",
      "does": "Push a snapshot on protocol.channel(\"StateChanged\"). The HUD is not rebuilt on a respawn, so this is a refresh, not a boot. It runs after a death respawn too: the client's ScreenGui survived, and one idempotent snapshot is cheaper than reasoning about whether it needed one."
    }
  ],
  "onDeath": [
    {
      "order": 1,
      "module": "server-main",
      "does": "humanoid.Died, from the connection onSpawn step 4 made for THIS character. Recover the player from the character. THIS PHASE IS THE ONLY THING IN THE GAME THAT LOADS A SECOND CHARACTER: with CharacterAutoLoads false and one LoadCharacter in onJoin, its absence meant the first death was the last for the session. traversal.death.possibleByDesign is false and damageSources is 0, so the only route here is the Roblox menu's Reset Character — which is available to every player in every session."
    },
    {
      "order": 2,
      "module": "server-main",
      "does": "Wait runtime.respawnDelaySeconds, read as GameConfig.RespawnDelaySeconds and never as a literal. Nothing is torn down during the wait: the state stays in the live collection so the save loop still writes it, the lane stays built, and clearing.tick keeps visiting the state and takes the character-or-HumanoidRootPart skip it already has. No death test is added to the tick, deliberately — a corpse does not move, and everything inside its clear radius was cleared while it was alive."
    },
    {
      "order": 3,
      "module": "server-main",
      "does": "AFTER the wait, re-test two things in this order: states[player.UserId] is still present, and player.Parent is still Players. If either is false the player left during the delay, and this phase then does NOTHING — no LoadCharacter, no warn, no error."
    },
    {
      "order": 4,
      "module": "server-main",
      "fn": "player:LoadCharacter()",
      "does": "Load the character. The CharacterAdded connection from onJoin step 8 is still live, so onSpawn runs again in full: the new character is put in the collision group, pivoted back to THIS player's LIVE bay spawn, given WalkSpeed from modifiers.effective, handed a fresh tool, and pushed a snapshot. Nothing else re-runs: no lane is rebuilt, no slot re-claimed, no state re-loaded, no ownership re-resolved and no currency touched. THE ARMING GATE RESETS BY ITSELF: clearing.tick sees a character it has not armed for and rewrites state.armState, so the player must move firstSession.armDistanceStuds again before anything clears — firstSession.armScope is perCharacterSpawn and this is the case that word is about."
    }
  ],
  "onPurchase": [
    {
      "order": 1,
      "module": "server-main",
      "does": "protocol.channel(\"BuyUpgrade\").OnServerEvent received with one string. Look up states[player.UserId]; if absent, drop the message. Reject any payload that is not a string. economy.authority: no client message carries a cost, an amount or a balance, and this handler enforces that by accepting nothing else."
    },
    {
      "order": 2,
      "module": "progression",
      "fn": "tryBuy(state, upgradeId)",
      "calledBy": "server-main",
      "does": "Validate and apply, or change nothing and return false. The server prices it; the client sent only an id. On false the phase ENDS HERE: nothing is sent, nothing is played, nothing is shown — input.verbs[buy].onPreconditionFail is silentNoOp and input.pressable.rejectionCueOnFailedPrecondition is 'none'."
    },
    {
      "order": 3,
      "module": "modifiers",
      "fn": "effective(state, axis)",
      "calledBy": "server-main",
      "applies": "speed",
      "does": "On success only: re-write humanoid.WalkSpeed from modifiers.effective(state, \"speed\"), UNCONDITIONALLY, whichever upgrade was bought. Gating this on upgradeId == \"speed\" is one line shorter and one refactor away from re-opening the trial-1 defect."
    },
    {
      "order": 4,
      "module": "tool",
      "fn": "refresh(player, state)",
      "calledBy": "server-main",
      "does": "On success only: re-resolve the tool head's width from modifiers.effective(state, \"radius\"). Also unconditional, and for a second reason: products.items[span] changes the effective radius with no level moving at all, so a gate on upgradeId would make a 499-Robux purchase invisible."
    },
    {
      "order": 5,
      "module": "server-main",
      "does": "On success only: fire protocol.channel(\"UpgradeApplied\"):FireClient(player, upgradeId, newLevel), then push a snapshot on StateChanged. In that order: response.beats[upgradePurchased].effectAppliedBeforeAcknowledgment is true, so the effect has already landed by the time the cue is told about it, and the 200 ms acknowledgment budget is measured from this packet. On failure send neither — the server is the only writer, so the client's HUD is already correct."
    }
  ],
  "onTick": [
    {
      "order": 1,
      "module": "clearing",
      "fn": "tick(states)",
      "calledBy": "clearing",
      "applies": "radius, value",
      "fires": "FindRevealed, SetCompleted, AreaRestored, StateChanged",
      "does": "Every runtime.clearTickRate, inside a pcall so one bad iteration cannot stop the loop. Per state, in this order. (1) THE ARMING GATE: if state.armState.character is not state.player.Character, rewrite armState as { character = the current one, armed = false } — that is how firstSession.armScope 'perCharacterSpawn' resets with only one module writing the field. Skip the state if the character or its HumanoidRootPart is absent. If not armed, measure the horizontal XZ displacement from state.spawnPivot; if it exceeds firstSession.armDistanceStuds (2.0) set armed true, and if it does not, RETURN FOR THIS STATE — no distance work, no clear, no award, no packet. (2) Read radius once with modifiers.effective(state, 'radius'). (3) Clear every uncleared patch within that XZ distance: set patch.cleared, destroy patch.instance, set state.cleared[index], increment state.clearedCount, and award max(economy.payoutFloor, floor(tiers[patch.tierIndex].value * modifiers.effective(state, 'value'))) — economy.faucets[patch-clear].formula verbatim, floored per its rounding rule, and the ONLY site the value multiplier is applied. If patch.find is set and state.found does not hold it, set it and fire FindRevealed; if that completes a set, fire SetCompleted once with the set id. (4) If clearedCount has reached the live area's patchCount: increment state.areasFinished by exactly 1, EMPTY state.cleared, zero clearedCount, call plots.advance(state) — plots.liveGeometry.bayBuiltAt is 'the instant the previous bay's last patch clears', so it is here and not in a deferred job — and fire AreaRestored once with the finished area's label. (5) If the pass changed anything, fire StateChanged once with a fresh snapshot; none at all on a pass that cleared nothing. All channels through protocol.channel(name). Reads no client message and uses no Touched event."
    }
  ],
  "onSave": [
    {
      "order": 1,
      "module": "persistence",
      "fn": "save(player, state)",
      "calledBy": "server-main",
      "does": "Every runtime.saveIntervalSeconds, for every state in the collection. A failure warns and the loop continues; the next pass retries by existing. The payload is the seven persisted fields and has no conditional branch in it: cleared already describes the live area only."
    }
  ],
  "onLeave": [
    {
      "order": 1,
      "module": "server-main",
      "does": "Players.PlayerRemoving. Lift the state out of the collection and delete states[player.UserId] FIRST, so no tick can touch a state that is being saved and torn down. If there is no entry, the player never finished joining: return."
    },
    {
      "order": 2,
      "module": "persistence",
      "fn": "save(player, state)",
      "calledBy": "server-main",
      "does": "Save, and wait for it. Before teardown."
    },
    {
      "order": 3,
      "module": "plots",
      "fn": "despawn(state)",
      "calledBy": "server-main",
      "does": "Destroy the lane slab, which takes its patches, its four boundary parts and its spawn Attachment with it, and release the slot so the next player reuses it — social.plotTenure.releasedOn is PlayerRemoving and slotReservedOnLeave is false. NOTHING ABOUT THE DEPARTURE IS PERCEPTIBLE TO ANY REMAINING PLAYER: social.plotTenure.onLeaveMidArea says so, and social.forbidden X11 bans join and leave notices, toasts, sounds and strings naming another player."
    },
    {
      "order": 4,
      "module": "server-main",
      "does": "Drop the spawn CFrame held for this player. Nothing else references the state; it is garbage."
    }
  ],
  "onShutdown": [
    {
      "order": 1,
      "module": "server-main",
      "does": "game:BindToClose. If RunService:IsStudio() then return immediately — a Studio stop must not write test data to the live store under runtime.dataStoreName. Otherwise call persistence.save for every state still in the collection and wait for all of them."
    }
  ],
  "onClientBoot": [
    {
      "order": 1,
      "module": "client-main",
      "does": "Create one ScreenGui in PlayerGui. Created once, and it survives every character respawn. It does NOT wait for the remotes Folder itself: protocol.channel does that once, inside Protocol.luau, on its first call."
    },
    {
      "order": 2,
      "module": "client-main",
      "does": "UIBuilder.build(Screens.hud, Theme, screenGui) to get the HUD's Root frame. No client module authors the HUD's readouts."
    },
    {
      "order": 3,
      "module": "hud-binding",
      "fn": "bind(root, gui)",
      "calledBy": "client-main",
      "does": "Resolve the HUD's named readouts once and return an updater. A node name that no longer resolves warns here, once. The updater also applies firstSession.withheld: no denominator on the collection count until the first reveal, no upgrade row until rowsRevealed says so, and none of firstSession.suppressionForbidden's devices to say so."
    },
    {
      "order": 4,
      "module": "input",
      "fn": "connect(gui)",
      "calledBy": "client-main",
      "does": "THE PURCHASE PATH, AND IT IS NOT A KEYPRESS. connect calls pressables.bind(gui, onActivate), which creates the four game-drawn pressables — input.gameDrawnPressables is 4 — and installs the handler: a purchase press fires BuyUpgrade with one upgrade id, and the index press calls index-screen.toggle() locally. input.travelRequiredToPurchase is 'none' and input.gameBoundInputClasses is ['pressable'], so a touch player buys in one press with no travel. It returns the updater pressables.bind gave it, so client-main holds no handle. THE SHIPPED Enum.KeyCode.One/Two/Three BINDING IS SUPERSEDED: input.pressable.keyboardAcceleratorRequired is false, so a key may sit beside a button and may never be the only path to one."
    },
    {
      "order": 5,
      "module": "index-screen",
      "fn": "bind(gui)",
      "calledBy": "client-main",
      "does": "Create the collection surface hidden and return an updater. It is absent for a player who has revealed nothing — firstSession.withheld.collectionPanel, latched on 'the collection map is non-empty' with newSaveFields 0, so its presence is derived from the snapshot's found map and nothing is stored for it."
    },
    {
      "order": 6,
      "module": "beats",
      "fn": "connect(gui)",
      "calledBy": "client-main",
      "does": "Connect FindRevealed, SetCompleted, AreaRestored and UpgradeApplied, and return an updater so the one unsequenced beat, patchClear, can be driven from a rise in snapshot.clearedCount. beats owns the schedule — response.beats[].rank, response.minOnsetGapSeconds, response.channelExclusivity and response.onOverload — and the cue bodies are EMPTY. What a reveal looks, sounds and reads like belongs to Art — VFX, Audio — Stingers and UI/UX — Feedback, none of which owns a contract key; they are connected anyway so each channel has a receiver and adding presentation is a change to one function body."
    },
    {
      "order": 7,
      "module": "client-main",
      "does": "Collect the four updaters from steps 3 to 6 into one fan-out, connect protocol.channel(\"StateChanged\").OnClientEvent to it, THEN call protocol.channel(\"RequestState\"):InvokeServer() once and pass the result to the same fan-out. In that order, so a push arriving during the round trip is not lost. Every updater is idempotent, which is also what makes two originators on StateChanged safe."
    }
  ],
  "constructs": [
    {
      "module": "persistence",
      "fn": "defaultState()",
      "initialises": [
        "currency",
        "upgrades",
        "rowsRevealed",
        "found",
        "areasFinished",
        "cleared",
        "clearedCount"
      ],
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
      "initialises": [
        "player"
      ],
      "note": "Set once, in onJoin step 4, after both yielding calls have returned and before the state enters the collection. Never reassigned. Not persisted and not in a snapshot — protocol.snapshotShape does not name it, and social.forbidden X7 is why no player identifier crosses the wire at all."
    },
    {
      "module": "entitlements",
      "fn": "refresh(player, state)",
      "initialises": [
        "owned"
      ],
      "note": "One key per products.items[] entry, resolved at join and NEVER persisted — products.F20 and modifiers.sources[purchase].storage both say ownership is read live every join. Runs before the publish point so no tick sees an empty map."
    },
    {
      "module": "plots",
      "fn": "spawn(player, state)",
      "initialises": [
        "patches",
        "spawnPivot"
      ],
      "note": "patches is built from layout.build(state.areasFinished + 1) with the slot origin added, filtered by state.cleared for the INSTANCES but not for the records: a cleared patch keeps its record with cleared true and instance nil, so indices stay aligned with layout's order and therefore with state.cleared. It holds the LIVE BAY ONLY. spawnPivot is the world position of the live bay's spawn Attachment, which clearing measures firstSession's arming displacement from. Both are rebuilt by plots.advance when an area finishes, and both are discarded on leave; neither is persisted."
    },
    {
      "module": "clearing",
      "fn": "tick(states)",
      "initialises": [
        "armState"
      ],
      "note": "Written on the first tick that sees a character, and rewritten on the first tick that sees a DIFFERENT one. That is the whole of firstSession.armScope 'perCharacterSpawn': the reset is a property of the tick rather than a second module's write, which is what keeps one writer on the field. defaultState leaves it { character = nil, armed = false }, which is the correct value for a state with no character."
    }
  ]
}
```

#### `representation` *(from 06-representation.md)*

```json
[
  {
    "subject": "patch",
    "kind": "part",
    "rationale": "tiers already names Enum.PartType shapes, and rarity.ladders[overgrowth-tier].legibilityChannel makes silhouette the primary channel on a binding accessibility constraint. Primitives satisfy it with no asset to produce, so nothing blocks the build.",
    "class": "Part for Block, Cylinder and Ball; WedgePart for Heartvine — Enum.PartType has no Wedge member, and getting this wrong silently collapses the fourth silhouette into the first",
    "properties": {
      "Shape": "Enum.PartType[tier.shape] for Block, Cylinder and Ball; not set at all on a WedgePart",
      "Size": "PER SHAPE — see geometryByShape. It is NOT Vector3.new(patch.footprint, tier.height, patch.footprint) for every tier: that formula lays the Cylinder on its side and throws away the Ball's footprint.",
      "Orientation": "PER SHAPE — see geometryByShape. Vector3.new(0, 0, 90) for the Cylinder, Vector3.new(0, 0, 0) for Block, Ball and Wedge. Set after Position; rotation is about the part's own centre so the two do not interact.",
      "Position": "the patch's world position, with Y at tier.height / 2 above the slab's top face. TRUE FOR ALL FOUR SHAPES: an upright cylinder of length tier.height, a sphere of diameter tier.height and a wedge of height tier.height all have their centre at tier.height / 2 and their top at exactly tier.height.",
      "Color": "Color3.fromRGB(unpack(tier.rgb)) — the SECONDARY channel; shape carries rarity first",
      "Material": "Enum.Material[patch.material] — Grass",
      "Anchored": "true",
      "CanCollide": "false — patch.collides is false, and it is load-bearing: contact clearing with movement-only input must never be blocked by the thing being cleared. It is also why a lane has nothing on it a character can climb or jump from, which is what keeps traversal.boundary.heightStuds sufficient.",
      "CastShadow": "false — up to 640 per lane times the player count, and shadows are the cheapest thing to give up",
      "Name": "\"Patch\" plus the 1-based layout index, so a live Instance can be traced to its state.cleared key",
      "Parent": "the lane slab"
    },
    "geometryByShape": {
      "Block": {
        "class": "Part",
        "Shape": "Enum.PartType.Block",
        "Size": "Vector3.new(patch.footprint, tier.height, patch.footprint) — 3 x 1.6 x 3 for Moss",
        "Orientation": "Vector3.new(0, 0, 0)",
        "why": "A Block's local axes are its world axes. This is the only shape the old single formula got right, which is why the bug survived: 52% of every lane looked correct."
      },
      "Cylinder": {
        "class": "Part",
        "Shape": "Enum.PartType.Cylinder",
        "Size": "Vector3.new(tier.height, patch.footprint, patch.footprint) — 2.4 x 3 x 3 for Fern. THE LENGTH GOES IN X.",
        "Orientation": "Vector3.new(0, 0, 90)",
        "why": "A Roblox Cylinder's axis runs along its LOCAL X: Size.X is the length between the two flat circular faces and Size.Y and Size.Z are the diameter. Unrotated, the Fern is a log lying on the ground and reads as a second Block."
      },
      "Ball": {
        "class": "Part",
        "Shape": "Enum.PartType.Ball",
        "Size": "Vector3.new(tier.height, tier.height, tier.height) — 2.8 cubed for Bramble",
        "Orientation": "Vector3.new(0, 0, 0)",
        "why": "A Ball renders a sphere whose diameter is the SMALLEST of the three components and ignores the other two, so any non-cubic Size is a lie about what appears on screen. tier.height wins over patch.footprint: it keeps the height ladder exact and errs 0.2 studs SMALL against a footprint whose only consumer is a spacing floor of 6."
      },
      "Wedge": {
        "class": "WedgePart",
        "Shape": "not set — a WedgePart has no Shape property, and Enum.PartType has no Wedge member. Assigning one is a runtime error at best and a silent Block at worst.",
        "Size": "Vector3.new(patch.footprint, tier.height, patch.footprint) — 3 x 3.4 x 3 for Heartvine",
        "Orientation": "Vector3.new(0, 0, 0)",
        "why": "A WedgePart's own axes match a Block's; what a rotation would change is which way the slope faces, and nothing in the design cares. Fixed at zero so every Heartvine on every lane in every server is identical, rather than left unstated so that two builders pick two conventions."
      }
    },
    "createdBy": "plots",
    "destroyedBy": "clearing, one at a time as it clears them, and plots when a bay is replaced or the lane goes",
    "asset": null,
    "note": "THE COUNT IS PER BAY, NOT PER LANE. plots.liveGeometry.patchInstancesExistIn is 'the live bay only', so a player whose areasFinished is 3 has patch Instances in bay 4 and none in bays 1 to 3 — a finished bay is walkable and bare, and it has no patch RECORD either, which is what makes 'cleared is permanent' structural rather than latched. On join a player gets one Instance per index state.cleared does not mark, in the live bay. plots.spawn owns that test and is the only module that may create one. THE MEASURABLE RULE, whatever the shape: the world bounding box is patch.footprint x tier.height x patch.footprint, except the Ball at tier.height cubed, and the highest point is exactly tier.height above the slab's top face. NO ANCHOR IS WITHIN traversal.boundary.walkableMarginStuds (12) OF A LANE EDGE, which is why layout confines anchors to the central 96 studs of each 120-stud chunk."
  },
  {
    "subject": "plot",
    "kind": "part",
    "rationale": "One Part is both the ground a player walks on and the container its patches, boundary and spawn Attachment parent to, so tearing a lane down is one Destroy and the floor cannot outlive the things standing on it. Resizing it inward is how a bay is built, and resizing a Part does not move what is parented to it. A Folder plus a separate ground part is equally correct; this is the arbitrary half of the call and is stated so two builders do not make it differently.",
    "class": "Part",
    "properties": {
      "Size": "Vector3.new(plots.pitchStuds, 1, margin + plots.bays[live].zEnd + margin) where margin is traversal.boundary.walkableMarginStuds (12) and live is state.areasFinished + 1. THE FULL SLOT PITCH ACROSS, 122, not laneWidthStuds: consecutive slabs share an edge exactly and there is no air between two lanes at any index. At bay 1 that is 122 x 1 x 144; at bay 8 it is 122 x 1 x 3024. Above ordinal 8 each post-terminal area adds another 480, since endgame.postTerminalArea.footprintStuds2 equals depths.areas[8]'s.",
      "Position": "centred on the slot origin across X and spanning from 12 studs outward of bay 1 to 12 studs inward of the live bay's end on Z, with the top face at Y = 0 so the slot origin doubles as the walkable plane. Centre Y is therefore -0.5.",
      "Anchored": "true",
      "CanCollide": "true — this is the one thing in the lane the player stands on, and traversal.collision.playerVsWorld is true",
      "Material": "Enum.Material.Slate",
      "Name": "\"Plot\" plus the slot index",
      "Parent": "the world container"
    },
    "createdBy": "plots",
    "destroyedBy": "plots, in despawn",
    "asset": null,
    "note": "Slabs TILE the row: slot n is centred at (n - 1) * plots.pitchStuds on X and is pitchStuds wide, so there is no gap and no overlap between neighbours. That, plus plot-boundary, is the whole of the fix for falling out of the world. GROWS INWARD, NEVER SHRINKS: plots.advance resizes it to cover the new live bay, which is plots.liveGeometry.groundExistsIn — 'every bay from 1 up to and including the live bay' — and a player standing in bay 2 while bay 5 is built never loses their floor. plots.liveGeometry.torndownBeyond asks for bays more than two outward of the live one to be destroyed and rebuilt bare on re-entry; in this build a finished bay IS bare, holding ground and nothing else, so there is nothing to tear down and the ground invariant is the one that binds. That changes the first time Art dresses a bay, and the rule acquires a subject then. tree forbids the build from editing game/default.project.json, so the lobby floor that ships in it stays exactly as it is and nothing parents to it."
  },
  {
    "subject": "plot-boundary",
    "kind": "part",
    "rationale": "A collision hull with no appearance, so that leaving your own lane is impossible rather than merely unlikely. traversal.boundary.kind is 'collisionBarrier', passable, climbable and jumpable are all false, and teleportBack is false — there is no way out and nothing to catch a player who finds one. It is deliberately not a wall: theme/setting/04 W3 obliges any wall to carry exactly two openings into somewhere, and plots.openings describes those as construction, which is Art's.",
    "class": "Part — four of them per lane",
    "properties": {
      "Size": "two of Vector3.new(plots.pitchStuds - plots.laneWidthStuds, traversal.boundary.heightStuds, laneLength + 2) running along the lane, and two of Vector3.new(plots.laneWidthStuds + 2, traversal.boundary.heightStuds, 2) across its ends — 2 x 20 x (laneLength + 2) and 122 x 20 x 2. The + 2 makes the four overlap at the corners, so there is no one-stud diagonal gap to squeeze through. laneLength is the slab's Z extent, so the two long parts are resized with the slab.",
      "Position": "relative to the slot origin: the two long parts at X = +/- (plots.laneWidthStuds / 2 + 1), i.e. +/- 61, so the 2-stud boundary occupies exactly the pitch that is not lane; the two end parts at the outward face of the margin (Z = -13) and at the inward face of the live bay's margin (Z = plots.bays[live].zEnd + 13). All four at Y = traversal.boundary.heightStuds / 2 = 10. Slot n's +X part and slot n+1's -X part occupy the same volume; both are built, because a lane is destroyed with its owner and neither may depend on the other existing.",
      "Anchored": "true",
      "CanCollide": "true — the one property that does the work",
      "Transparency": "1 — traversal.boundary.opaque is false and sightlineObstruction is 'none'. social.maxCoPresenceSeparationStuds.requirement needs an unobstructed sightline between two occupied spawn points 122 studs apart, and an opaque wall between them deletes the only social system the game has.",
      "CanQuery": "false — the default camera's occlusion raycasts must pass through, or the view jams every time a player walks up to the boundary. This is the standard way an invisible wall goes wrong and it is one property to prevent.",
      "CanTouch": "false — nothing in the game uses Touched, and a boundary is the last thing that should start",
      "CastShadow": "false",
      "Material": "Enum.Material.SmoothPlastic",
      "Name": "\"Boundary\" plus one of PosX, NegX, Outward, Inward",
      "Parent": "the lane slab"
    },
    "createdBy": "plots",
    "destroyedBy": "plots, with the slab",
    "asset": null,
    "note": "traversal.boundary.heightStuds is 20 and it is not a taste call: a default Humanoid apexes at traversal.jump.jumpHeight (7.2), traversal.jump.upgradable is false, and every patch is CanCollide false, so a lane contains nothing to climb. THE INWARD PART MOVES WHEN A BAY IS BUILT — plots.advance repositions it to the new end — and the two long parts are resized with the slab. There is NO collision part between two bays: plots.openings gives each bay two openings, always open and shared with its neighbour, so the lane is continuous in Z and only its two ends are closed. The openings are gaps in a WALL that does not exist yet; when Art builds one it is built on this rectangle and the two openings become gaps in both at once, and neither may be opened where there is nothing on the other side. traversal.boundary.cue is 'none', so nothing marks it."
  },
  {
    "subject": "spawn-anchor",
    "kind": "attachment",
    "rationale": "The character has to arrive at a known point: firstSession measures the arming displacement from it, layout puts the first Find within 3.5 studs of it, and server-main needs it again on every respawn. An Attachment is a CFrame with no geometry, no collision and nothing to make invisible; holding it on the slab means the location is derived once, by plots, rather than twice by two modules.",
    "class": "Attachment",
    "properties": {
      "Name": "\"Spawn\"",
      "Position": "Vector3.new(0, 0.5, plots.bays[live].zStart + 8) relative to the lane slab's own origin — the slab's top face, centred across the lane, 8 studs into the live bay. plots.spawn.plotLocal is [0, 0, 8], which is this expression at live = 1; the generalisation is what makes traversal.death.respawnAt ('areaSpawn') mean the live area rather than always the first.",
      "Parent": "the lane slab"
    },
    "createdBy": "plots",
    "destroyedBy": "plots, with the slab",
    "asset": null,
    "note": "plots.spawn returns this Attachment's WorldCFrame and writes its position into state.spawnPivot; plots.advance moves it and rewrites both. server-main pivots the character to it plus 3 studs of Y on every CharacterAdded, including the character wiring.onDeath loads. Its LookVector is plots.spawn.lookVector: (1, 0, 0) for slot 1 and (-1, 0, 0) for every slot above — parallel to plots.rowAxis and NEVER to laneAxis, which is plots.spawn.neverFacesLaneAxis, so a player never spawns staring down the lane at the whole area. plots.spawn.atPlotCentre is false, and the +8 is why. There is no SpawnLocation anywhere: a static spawn point cannot land a player inside a lane that is allocated after they join."
  },
  {
    "subject": "tool",
    "kind": "model",
    "rationale": "tool.instanceClass is Model, tool.isRobloxToolInstance is false and tool.entersBackpack is false — it is a held object welded to the hand, not a Roblox Tool. Two Parts: a handle and a head whose width is the one appearance channel. Assembled at runtime from primitives, exactly like a patch, so it needs no upload and blocks nothing.",
    "class": "Model containing two Parts and one WeldConstraint",
    "properties": {
      "Name": "\"Tool\"",
      "PrimaryPart": "the handle",
      "Parent": "the character Model",
      "handle.Size": "Vector3.new(0.3, 0.3, 1.4)",
      "head.Size": "Vector3.new(headWidth, 0.2, 0.6), where headWidth is tool.headWidthBaseStuds (1.2) plus tool.headWidthPerLevelStuds (0.35) per EQUIVALENT Reach level of modifiers.effective(state, 'radius') — interfaces.tool.refresh carries the expression. tool.headWidthBaseTestRangeStuds is [0.8, 1.8] and headWidthPerLevelTestRangeStuds is [0.2, 0.6], so both are tunable without changing anything here.",
      "every part Anchored": "false — it is welded to a moving character, not pinned to the world",
      "every part Massless": "true — tool.massless",
      "every part CanCollide": "false — tool.canCollide",
      "every part CanTouch": "false — tool.canTouch, and tool.clearsOnContact is false: clearing is a server proximity test in clearing.tick and the tool is appearance",
      "every part CanQuery": "false — tool.canQuery",
      "every part CastShadow": "false",
      "weld": "one WeldConstraint from the handle to the character's RightHand — tool.attachment"
    },
    "createdBy": "tool",
    "destroyedBy": "tool, with the character that holds it",
    "asset": "none — assembled at runtime from two Parts and a WeldConstraint. THIS ROW IS THE ONE PLACE THE SCHEMA'S ASSET RULE MISFIRES: it demands an asset for any model, on the sound ground that a mesh or model usually implies something somebody has to upload, and a Model built from primitives implies nothing. Saying so here is deliberate; naming a fake rbxassetid would not be, and `grep -rn \"rbxassetid\" game/src` still returns nothing. Flagged under Not decided here.",
    "note": "tool.count is 1, tool.grantedAt is 'spawn', and tool.held is true, so every living character has exactly one and a character that dies takes it with it. tool.writesHumanoidProperties is FALSE — the only Humanoid write in this game is server-main's WalkSpeed, per response.humanoidWritesAllowed. tool.animates is false and tool.particleEmitters is 0, so there is no AnimationTrack and no emitter anywhere in it. tool.changesWithAxes is exactly ['radius'] and unaffectedByAxes exactly ['value', 'speed']: the head widens and nothing else about it ever changes. tool.premiumVariantAllowed is true and premiumVariantMayBeOnlyTool is false, which products.F8 restates as 'a player owning zero products spawns with a tool welded to the right hand' — that is this row's first acceptance criterion and there is no variant in this build."
  },
  {
    "subject": "find",
    "kind": "none",
    "rationale": "A Find has no Instance at any point in its life. gameplay/core-loop/03 settles that it is revealed on contact at the instant its patch clears — an event, not an object left standing. Its durable existence is a key in state.found; its transient existence is one FindRevealed remote carrying a name. Representing it as a model would demand 24 assets that do not exist, block the build on them, and create a second source of truth for a fact discovery.record already holds.",
    "class": null,
    "createdBy": "nothing",
    "destroyedBy": "nothing",
    "asset": null,
    "note": "Renamed from `relic`: collection.className is Find, collection.classPlural is Finds, and vocabulary.bannedWords bans the old noun with the reason that it is occupied by two shipping games for a rolled multiplier item. An internal field name is exempt from the ban, but keeping a stale noun in the record five modules read is how a banned word gets back into a label — Patch.relic became Patch.find for the same reason. createdBy is 'nothing' in the strict sense the graph needs: no module creates an Instance for a Find, ever. What DOES happen on a reveal is that clearing sets state.found[name] and fires FindRevealed, and if that name completes a set, SetCompleted — state writes and channels, all of which are edges the graph already carries elsewhere and none of which is a creation. Which patch hides which Find is layout's Patch.find, a string or nil, set at build time from the seed and from nothing else."
  },
  {
    "subject": "hud",
    "kind": "gui",
    "rationale": "Built by ui-forge from ui-forge/briefs/hud.brief.json and emitted to game/src/shared/Screens/hud.luau, which is DATA that UIBuilder.build turns into Instances. Deliberately outside the build order: no module in it authors the HUD's readouts.",
    "class": "ScreenGui",
    "createdBy": "client-main",
    "destroyedBy": "nothing during a session",
    "asset": null,
    "note": "client-main creates the ScreenGui itself, ONCE, in wiring.onClientBoot step 1, and it survives every character respawn including the one wiring.onDeath causes. Its READOUTS are created by UIBuilder.build from the emitted screen DATA; hud-binding writes text and sizes into named nodes and is forbidden from creating any Instance except a Tween. THREE THINGS ARE PARENTED INTO IT BY MODULES RATHER THAN BY ui-forge, and each has its own subject: the four `pressable` buttons, the `index-surface` frame, and whatever a beat cue turns out to be when Art specifies one. Out of scope means the readouts, not the container."
  },
  {
    "subject": "pressable",
    "kind": "gui",
    "rationale": "input declares gameDrawnPressables: 4 and worldObjectsTriggeringAVerb: 0, so the purchase and index controls are on screen and not in the world. ui-forge's hud-overlay pattern ships no pressable readout — a default rather than an incapability — and no module in this build order owns ui-forge's briefs, so a spec that waited for it would be a required step with no owner. pressables creates them instead, and this row fixes the names so that the day hud-overlay grows one, pressables.bind resolves four names instead of creating four Instances and nothing else changes.",
    "class": "TextButton — four of them, inside the HUD ScreenGui",
    "properties": {
      "Name": "\"Pressable_BUY1\", \"Pressable_BUY2\", \"Pressable_BUY3\", \"Pressable_INDEX\". The three purchase buttons are bound to GameConfig.Upgrades in declaration order — input.pressable.roles[purchase].boundTo — so BUY1 is Value, BUY2 is Reach and BUY3 is Pace.",
      "Size": "at least the platform jump button's, on every device — input.pressable.minTouchTargetRule is 'notSmallerThanPlatformJumpButton'. A UDim2 in scale with a UISizeConstraint holding the floor in offset, so a phone and a desktop both clear it.",
      "Position": "inside the HUD's bottom-right cluster for the three purchase buttons, aligned with the upgrade readouts hud-binding writes; the index button in the top-left cluster beside the collection readout. NEVER OVERLAPPING A PLATFORM CONTROL REGION — input.pressable.mayOverlapPlatformControlRegions is false, and the touch jump button and the thumbstick both live in the bottom corners.",
      "Text": "the upgrade's label and its next cost for a purchase button, and the collection class plural for the index button. vocabulary.maxLabelChars is 14 and vocabulary.casing is title.",
      "Visible": "for a purchase button, snapshot.rowsRevealed[id] — firstSession.withheld.upgradeRow is presentAtJoin false, latched. Appearing one may not move the other three: firstSession.suppressionForbidden bans reflowOnLift, so all four positions are fixed and only Visible changes.",
      "AutoButtonColor": "false — affordability is signalled by text as well as colour, because input.pressable.affordabilityByColourAlone is false",
      "SelectionGroup": "true — input.pressable.gamepadSelectable is true, so a gamepad can move between the four",
      "Parent": "the HUD ScreenGui"
    },
    "createdBy": "pressables",
    "destroyedBy": "nothing during a session",
    "asset": null,
    "note": "input.pressable.roles: three with role 'purchase', adjudicatedBy 'server', persistent true; one with role 'index', adjudicatedBy 'client', persistent true. Persistent means created once and surviving a respawn, which they do because the ScreenGui does. ONE ACTIVATION PER PRESS (activationsPerPress 1) with a debounce of input.pressable.debounceSeconds (0.35); no hold and no chord (holdRequired false, chordRequired false). NO REJECTION CUE: input.pressable.rejectionCueOnFailedPrecondition is 'none' and input.verbs[buy].onPreconditionFail is silentNoOp, so an unaffordable press does nothing, shows nothing and plays nothing. A keyboard accelerator is ALLOWED and NOT REQUIRED — keyboardAcceleratorAllowed true, keyboardAcceleratorRequired false — which is precisely the ruling that supersedes the shipped Enum.KeyCode.One/Two/Three binding: 1/2/3 may exist beside these buttons and may never be the only path to a purchase. NO PRODUCT IS NAMED, SHOWN OR PRICED HERE — products.F19."
  },
  {
    "subject": "index-surface",
    "kind": "gui",
    "rationale": "The openIndex verb needs somewhere to open. input.pressable.roles carries one 'index' pressable adjudicated on the client, and firstSession.withheld.collectionPanel makes the surface absent at join and present from the first reveal. ui-forge has a modal-grid pattern that fits it; nothing in this build order owns the brief that would emit it, so index-screen creates the frame for the same reason pressables creates the buttons.",
    "class": "Frame inside the HUD ScreenGui, created with Visible false",
    "properties": {
      "Name": "\"IndexSurface\"",
      "Visible": "false until the first reveal has happened and the index pressable has been activated. Absence at join is firstSession.withheld.collectionPanel (presentAtJoin false, liftedBy beat:firstReveal, latched, latchSource 'the collection map is non-empty', newSaveFields 0) — so it is derived from the snapshot's found map and nothing is stored for it.",
      "contents": "four labelled groups, one per collection.sets entry, each holding six slots in the declared order of that set's names. A held name reads as its name; an unfound name reads as an empty slot. NOTHING ELSE: no padlock, no greyed row, no question-mark placeholder, no unknown-denominator form (firstSession.suppressionForbidden) and no rarity colour, frame, glow, border, sparkle or badge (rarity.forbidden).",
      "Parent": "the HUD ScreenGui"
    },
    "createdBy": "index-screen",
    "destroyedBy": "nothing during a session",
    "asset": null,
    "note": "rarity.ladders[find-set].legibilityChannel is 'the set heading on the collection surface, and nothing on the object', and perObjectVisualGrade is false — so the four set headings here are the ONLY place the second rarity ladder is legible anywhere in the game, and there is nothing on a patch or a reveal that varies by set. rarity.forbidden also bans 'a reveal cue that varies by which set the Find belongs to', which is beats's constraint and is restated here because this surface is the one place the sets are distinguished at all. Opening it suspends movement (input.pressable.indexScreenSuspendsMovement) and closing it restores it; that is caused by the player's own press, which is why it does not touch response.controlEverAffected being false. Shows no other player anything — social.forbidden X6 and X7 — and names no product, per products.F19."
  }
]
```

---

## 1. `config` — shared

**Write to:** `game/src/shared/GameConfig.luau`

**Owns:** Hold every tuned value from both contracts. Generated by the bridge, never authored.

**Depends on:** nothing

### Must expose

- `GameConfig`
- `upgradeCost(upgrade, level)`
- `upgradeEffect(upgrade, level)`
- `tierByWeight(roll)`

### Must not

- hand-editing this file — the emitter overwrites it and the sheet becomes a lie
- constructing any Roblox type, so the module stays loadable outside the engine

### Values

- reads nothing from the contract

### Done when

1. regenerating with `npm run architect -- --emit` produces no diff
2. `luau game/test/config.spec.luau` passes with the file loaded outside Roblox
3. every one of the 25 creative keys and the technical values a module reads is reachable from this table; a module that cannot find a value here has found an emitter gap, not a value to invent

---

## 2. `entitlements` — server

**Write to:** `game/src/server/Entitlements.luau`

**Owns:** Resolve which game passes a player owns, once per join, into state.owned. The only module that talks to MarketplaceService.

**Depends on:** `config`

### Must expose

- `refresh(player, state)`

### Must not

- writing anything to persistence, or reading ownership from a saved payload — products.F20
- calling PromptGamePassPurchase, PromptProductPurchase, or implementing ProcessReceipt. products.F5 and F13, and there is no store control in input for a prompt to be reachable from
- reading Player.MembershipType or MembershipType.Premium — products.F18
- calling PolicyService:GetPolicyInfoForPlayerAsync — products.F3
- treating a nil gamePassId as owned. Every products.items[].gamePassId is null today, so every product resolves to NOT owned and every factor is 1
- erroring or yielding the join sequence indefinitely on a MarketplaceService failure; a failed check warns and resolves to not owned

### Values

#### `products` *(from gameplay/monetization/01-the-offer-ladder.md)*

```json
{
  "storeExists": false,
  "purchaseSurface": "the Roblox experience page. The game draws no store, no shop screen, no offer row and no purchase control of any kind (coordinator ruling R-4).",
  "itemCount": 1,
  "kindsUsed": [
    "gamePass"
  ],
  "devProductCount": 0,
  "axesSold": [
    "radius"
  ],
  "axesNotSold": [
    "value",
    "speed"
  ],
  "rungVocabulary": [
    "impulse",
    "mid",
    "premium"
  ],
  "rungsUsed": [
    "premium"
  ],
  "ownershipCheck": "UserOwnsGamePassAsync(userId, gamePassId), read at join and never persisted",
  "prompt": {
    "method": null,
    "promptGamePassPurchaseCalls": 0,
    "reason": "R-4 removed the in-game store. There is no verb, pressable or screen that could trigger a prompt, and none is reserved. If a purchase surface is ever built, this field is what must be revised first."
  },
  "externalPrerequisite": {
    "what": "products.items[].gamePassId must be filled with the id of a pass created on the Roblox creator site and priced to match priceRobux",
    "owner": "the developer, or whoever holds the Roblox creator account",
    "blocking": "until it is filled, ownershipCheck cannot return true for any player and the product is unownable. This is a provisioning step, not an unfinished specification."
  },
  "items": [
    {
      "id": "span",
      "label": "Span",
      "kind": "gamePass",
      "gamePassId": null,
      "axis": "radius",
      "factor": 1.75,
      "factorTestRange": [
        1.4,
        1.95
      ],
      "factorStatus": "playtest unknown — whether 1.75 reads as an oversized tool is a feel question; the upper bound 1.95 is the hard lap-floor limit at area ordinal 2, not a taste figure",
      "priceRobux": 499,
      "priceBand": "premium 249-499",
      "priceTestRange": [
        349,
        999
      ],
      "rung": "premium",
      "repeatable": false,
      "stacksWithSelf": false,
      "persisted": false,
      "deliverable": "multiplicative factor on the radius axis AND a visibly wider tool head; requires tool head width to resolve from effective radius, not Reach level"
    }
  ],
  "combinedFactorCap": {
    "value": 1,
    "radius": 1.75,
    "speed": 1
  },
  "forbidden": [
    {
      "id": "F1",
      "rule": "No paid area, Find or set, and no paid access to any of them.",
      "closedBy": "03-META.md (brief)",
      "check": "no products[] entry grants a collection entry, an area id or a set; axis is always one of value|radius|speed"
    },
    {
      "id": "F2",
      "rule": "No sale of currency at any rate, in any bundle, ever.",
      "closedBy": "gameplay/systems/04",
      "check": "no products[] field names Shards or an amount; priceRobux exists and no priceShards field does; zero code paths credit currency from a purchase"
    },
    {
      "id": "F3",
      "rule": "No gacha, loot box, crate, roll, spin, pull, egg or randomised purchase outcome.",
      "closedBy": "gameplay/systems/03 + gameplay/systems/05 + platform paid-random-items rules",
      "check": "every products[] entry has a deterministic factor; zero odds tables anywhere; zero PolicyService:GetPolicyInfoForPlayerAsync calls"
    },
    {
      "id": "F4",
      "rule": "No luck multiplier, discovery-rate multiplier or find-better-Finds product.",
      "closedBy": "gameplay/systems/05 (luckShaped: false), gameplay/systems/03 (no per-Find rank)",
      "check": "no products[].axis equals luck; the substring 'luck' appears in zero player-facing strings"
    },
    {
      "id": "F5",
      "rule": "No developer products, and nothing repeatable.",
      "closedBy": "gameplay/systems/06 (one instance per product id) + platform guidance",
      "check": "every products[].kind is gamePass and every repeatable is false; zero PromptProductPurchase calls; zero ProcessReceipt callbacks"
    },
    {
      "id": "F6",
      "rule": "No timed boost, and no modifier that expires, decays, resets, is consumed or is spent.",
      "closedBy": "gameplay/systems/06",
      "check": "no products[] field named duration, expires, seconds, uses, charges or cooldown; no purchase-derived modifier carries a timestamp"
    },
    {
      "id": "F7",
      "rule": "No cosmetics: no skin, trail, aura, particle, hat, accessory, follower, pet, mount, emote, title or nameplate.",
      "closedBy": "03-META.md (declined, needs a display system first) + theme/identity/04 + theme/identity/02",
      "check": "no product changes any instance parented to the character other than the tool head's width"
    },
    {
      "id": "F8",
      "rule": "No premium tool that is the only way to have a tool.",
      "closedBy": "gameplay/mechanics/04 T12 (premiumVariantMayBeOnlyTool: false)",
      "check": "a player owning zero products spawns with a tool welded to the right hand"
    },
    {
      "id": "F9",
      "rule": "One axis and one factor per product. No product grants a second modifier, currency, a Find, an area or a cosmetic.",
      "closedBy": "gameplay/systems/06",
      "check": "every products[] entry has exactly one axis field and one factor field and no grants array"
    },
    {
      "id": "F10",
      "rule": "No timer, countdown, expiry, 'limited', 'new', 'ends in' or 'today only' attached to any offer, anywhere in the game.",
      "closedBy": "theme/tone/04 D9-D10 + platform monetization guidance",
      "check": "zero player-facing strings match /limited|hurry|today only|ends in|last chance|expires/i; no element updates on a clock"
    },
    {
      "id": "F11",
      "rule": "No manufactured scarcity or urgency: no stock count, no 'only N left', no 'N players own this', no waitlist, no queue.",
      "closedBy": "platform monetization guidance (false sense of urgency, artificial scarcity)",
      "check": "no player-facing string contains a number sourced from anything but the player's own state"
    },
    {
      "id": "F12",
      "rule": "No discount, no strikethrough price, no sale price, no bundle price, no first-purchase bonus.",
      "closedBy": "theme/tone/04 D9 + platform monetization guidance",
      "check": "exactly one price per product; products[] has no priceWas, discount, bundle or bonus field"
    },
    {
      "id": "F13",
      "rule": "No purchase prompt of any kind. Under R-4 there is no in-game store, so PromptGamePassPurchase is never called.",
      "closedBy": "theme/tone/04 D10 + coordinator ruling R-4 + gameplay/mechanics/02 (input closed at five verbs)",
      "check": "zero PromptGamePassPurchase calls anywhere in the build, in any path"
    },
    {
      "id": "F14",
      "rule": "No offer may interrupt a beat: nothing purchase-related opens, animates or changes within 2 s of a Find reveal, a set completion or an area completion.",
      "closedBy": "theme/tone/03 beat map B1-B3 + gameplay/mechanics/05",
      "check": "no purchase-related instance or string exists at all, so no code path can reach the reveal or completion channels"
    },
    {
      "id": "F15",
      "rule": "No code entry field, and no like, favourite, follow, group-join, rate-us or share prompt, anywhere in the game.",
      "closedBy": "03-META.md priority 3 (codes) + theme/tone/04 D10",
      "check": "zero TextBox instances in any screen; zero strings match /code|group|favou?rite|follow|rate us|share/i"
    },
    {
      "id": "F16",
      "rule": "No verb behind a paywall. move, look, jump, buy and openIndex all work with zero products owned.",
      "closedBy": "gameplay/mechanics/02",
      "check": "all five verbs function in a session with zero passes owned"
    },
    {
      "id": "F17",
      "rule": "No purchase may shorten, skip, auto-complete or bypass clearing work: no instant-clear, no auto-clear, no area skip, no completion grant.",
      "closedBy": "03-META.md (never content access) + theme/fantasy/03 C3",
      "check": "no product clears a patch, completes an area, or grants a Find; 24/24 is reachable owning zero products"
    },
    {
      "id": "F18",
      "rule": "No subscription, no recurring charge, and no benefit gated on Roblox Premium membership.",
      "closedBy": "gameplay/systems/06 (nothing timed or expiring) + 03-META.md (never content access)",
      "check": "zero reads of Player.MembershipType or MembershipType.Premium anywhere in the build"
    },
    {
      "id": "F19",
      "rule": "No product is named, shown, priced or referred to anywhere inside the game. R-4 leaves no surface that may mention one.",
      "closedBy": "theme/tone/04 D10 + coordinator ruling R-4",
      "check": "no products[].label and no priceRobux value appears in any string rendered by the game"
    },
    {
      "id": "F20",
      "rule": "No purchase-derived state is written to persistence. Ownership is read live every join.",
      "closedBy": "gameplay/systems/06 (recomputed from live ownership, never persisted)",
      "check": "the save payload contains no pass id, no product id and no purchase-sourced factor"
    }
  ],
  "headroom": {
    "canonical": "H1 below is the canonical form of the axis-ceiling inequality. setBonus.invariants[4] states the same bound without the 0.9 margin; H1 subsumes it and a schema author should write H1 only.",
    "H1_axisCeiling": {
      "rule": "for every axis A and every area ordinal N: ladderMax(A) * prod(setFactors on A) * prod(products.items[].factor where axis == A) <= marginFraction * ceiling(A, N)",
      "marginFraction": 0.9,
      "ladderMax": "for the entry of upgrades[] whose id equals A: base + maxLevel * perLevel",
      "ceilings": {
        "value": null,
        "radius": "plots.laneWidthStuds / 2",
        "speed": "movement.baseClearRadius / runtime.serverTickSeconds"
      },
      "atShippedValues": "radius 14.3 * 1.44 * 1.75 = 36.0 <= 0.9 * 60 = 54; speed 25.6 * 1.2 = 30.7 <= 0.9 * 45.83 = 41.25"
    },
    "H2_lapFloor": {
      "rule": "for every area ordinal N: ROUTE_SLACK * depths.areas[N-1].footprintStuds2 / tau(N) >= floorSeconds, where tau(N) is computed for a player owning EVERY product",
      "tau": "2 * (arrivalRadius(N) * prod(productFactors on radius)) * (arrivalSpeed(N) * prod(productFactors on speed))",
      "joint": "the bound below is on prod(productFactors on radius) * prod(productFactors on speed) as ONE quantity, not per axis. A radius product and a speed product each passing their own check can still break the lap together.",
      "floorSeconds": 75,
      "ceilingSeconds": 200,
      "ceilingAtRisk": false,
      "ceilingNote": "a product factor is >= 1, so it can only shorten a lap. H2 is one-sided.",
      "bindingOrdinal": 2,
      "maxThroughputProductFactorByOrdinal": {
        "1": 2.18,
        "2": 1.99,
        "3": 2.14,
        "4": 2.17,
        "5": 2.1,
        "6": 2.1,
        "7": 2.1,
        "8": 2.1
      },
      "spentByCurrentProducts": 1.75,
      "remaining": 1.14,
      "computedAtCombinedValueFactor": 1,
      "valueFactorWarning": "every bound above FALLS as combinedFactorCap.value rises, because a value product advances the greedy purchase order and raises arrival levels. At a combined value factor of 3.0 the ordinal-2 bound is 1.27, verified in wave 3. Adding any product on the value axis requires re-running the greedy purchase order against upgrades[] and re-deriving this whole table; these bounds are not valid at any other value factor."
    },
    "onFailure": "reduceFactor",
    "reduceWhich": "the factor on the axis the brief does not name as open. The brief names one open item in this domain, the premium SKU, and its shape is a radius item; so radius is reduced last.",
    "sizedLast": true,
    "clampMayAbsorbAPurchase": false,
    "lossNotice": "none"
  }
}
```

#### `interfaces (yours and your dependencies')`

```json
[
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
      {
        "name": "upgrade",
        "type": "UpgradeDef",
        "note": "one entry of GameConfig.Upgrades, the table itself and not its id"
      },
      {
        "name": "level",
        "type": "integer",
        "meaning": "the level the player currently HOLDS, not the level being bought. The price of the first purchase is upgradeCost(def, 0) and equals def.costBase. The price of moving from level 3 to 4 is upgradeCost(def, 3)."
      }
    ],
    "returns": "integer — floor(costBase * costGrowth ^ level)",
    "note": "Generated. Do not reimplement the curve anywhere else. A purchase is legal only while the held level is strictly below def.maxLevel, so the highest price ever charged is upgradeCost(def, maxLevel - 1). firstSession.withheld.upgradeRow lifts row i when the balance reaches upgradeCost(def_i, 0), which is the same call with the same convention."
  },
  {
    "module": "config",
    "fn": "upgradeEffect(upgrade, level)",
    "params": [
      {
        "name": "upgrade",
        "type": "UpgradeDef",
        "note": "needs base, perLevel and mode"
      },
      {
        "name": "level",
        "type": "integer",
        "meaning": "the level currently HELD, same convention as upgradeCost. Effect at level 0 is def.base, which is the pre-upgrade value: 5.5 studs for radius, 16 for speed, 1.0 for value."
      }
    ],
    "returns": "number — base + perLevel * level when mode is \"additive\", base * perLevel ^ level when mode is \"compounding\"",
    "note": "STEP 1 OF modifiers.resolutionOrder, and the only place the additive-versus-compounding question is answered. modifiers.axes[].baseFrom says of all three axes that the base is 'already inside upgradeEffect', and modifiers.baseIsNotAppliedTwice forbids multiplying it in again — so modifiers.effective calls this ONCE and multiplies FACTORS onto its result. All three shipped upgrades are additive today, which is exactly why hand-inlining looks harmless and would silently ignore a future compounding axis."
  },
  {
    "module": "config",
    "fn": "tierByWeight(roll)",
    "params": [
      {
        "name": "roll",
        "type": "number",
        "meaning": "a uniform sample in [0, 1). Not a weight, not a tier index, and not pre-scaled by the weight total — the function scales it. It must come from layout's seeded stream; rarity.ladders[overgrowth-tier].rolled is true and rolledFrom is tiers[].weight."
      }
    ],
    "returns": "(integer, TierDef) — the 1-based index into GameConfig.Tiers, then the tier table",
    "note": "The integer is what goes into Patch.tierIndex; the table is for reading value, height and shape at the point of use. Storing the table in a Patch instead of the index is forbidden by 03-state-shape: re-emitting the config would leave stale names in live patches. rarity.depthRarityChannel wants these weights shifted toward the rare end per depth and rarity.depthRarityBlocker says tiers has no depth dimension, so there is ONE weight table for all four depths and adding a second is a revision to the tiers sheet, not a branch here."
  },
  {
    "module": "entitlements",
    "fn": "refresh(player, state)",
    "params": [
      {
        "name": "player",
        "type": "Player"
      },
      {
        "name": "state",
        "type": "PlayerState",
        "note": "written for owned, and for nothing else"
      }
    ],
    "returns": "nil",
    "note": "YIELDS. One products.ownershipCheck call — UserOwnsGamePassAsync(userId, gamePassId) — per products.items[] entry, wrapped in pcall, writing state.owned[id] = true or false. Called once per join, in wiring.onJoin, BEFORE the state enters the live collection: modifiers.effective reads state.owned on every tick and a state published with an empty owned map would pay the unpurchased multiplier for as long as the web call took. EVERY products.items[].gamePassId IS NULL TODAY, so every entry short-circuits to false without a web call and the whole function is currently free — see 02-modules.md, which routes the missing ids back. A failed or timed-out check warns once and resolves to false; a player is never blocked from playing by a monetization call. Writes nothing to persistence, ever — products.F20 — and calls no prompt: products.F13 restricts PromptGamePassPurchase to an explicit activation of a store control, and input declares no such control."
  }
]
```

### Done when

1. state.owned has exactly one key per products.items[] entry after refresh returns, and every value is a boolean
2. with every gamePassId null, every value is false, every axis is at its unpurchased effective value, and the game is fully playable — products.F16, F17, F8
3. no field of state.owned reaches persistence.save; `grep -rn 'owned' game/src/server/Persistence.luau` returns nothing
4. a MarketplaceService outage produces one warning per product and a playable session

---

## 3. `layout` — shared

**Write to:** `game/src/shared/Layout.luau`

**Owns:** Compose one area from authored chunks and place its patches, tiers and Finds, deterministically from runtime.layoutSeed and the area ordinal alone.

**Depends on:** `config`

### Must expose

- `areaSpec(areaOrdinal)`
- `build(areaOrdinal)`

### Must not

- reading the player, the player's state, the found set or the cleared set. discovery.pool.placementIsPlayerIndependent is true and placementRule says the seed alone picks the indices; a layout that reads progress is a layout that is not stable across a rejoin
- reading a patch's tier when placing a Find. rarity.findPlacementReadsTier is false and layout.findPlacement.mayReadPatchTier is false, so tiers are rolled AFTER placement or from a disjoint stream
- any randomness that is not derived from runtime.layoutSeed — no math.random, no unseeded Random.new, no os.time
- creating Instances; this module returns data only
- drawing a chunk from a family that is not the area's depth family (layout.R4), or the same variant twice in one area (R1)

### Values

#### `layout` *(from gameplay/meta/05-area-layout.md)*

```json
{
  "chunk": {
    "widthStuds": 120,
    "depthStuds": 30,
    "footprintStuds2": 3600,
    "edgeKeepoutStuds": 1.5
  },
  "chunksPerFamily": 8,
  "chunksPerFamilyRange": [
    8,
    16
  ],
  "chunksPerFamilyStatus": "playtest unknown",
  "orientations": [
    "asAuthored",
    "mirroredAcrossLaneCentre"
  ],
  "variantsPerFamily": 16,
  "families": [
    {
      "depth": 1,
      "setId": "terrace",
      "idPrefix": "terrace-",
      "patchesPerChunk": 35
    },
    {
      "depth": 2,
      "setId": "cistern",
      "idPrefix": "cistern-",
      "patchesPerChunk": 37
    },
    {
      "depth": 3,
      "setId": "vault",
      "idPrefix": "vault-",
      "patchesPerChunk": 39
    },
    {
      "depth": 4,
      "setId": "spire",
      "idPrefix": "spire-",
      "patchesPerChunk": 40
    }
  ],
  "familiesShareNoChunk": true,
  "composition": "an area of N chunks is an ordered run of N variants drawn without replacement from its depth family's 16, seeded by (layoutSeed, areaOrdinal) and by nothing else",
  "anchorSource": "authored per chunk; until authoring exists, generated once from hash(layoutSeed, chunkId) and frozen, which is the same data by a cheaper route",
  "findPlacement": {
    "rule": "split the area's patch run into collection.relicsPerArea contiguous groups and bury exactly one find in each; group g carries the g-th name of the area's resolved slice, per depths.relicSliceAssignment",
    "groupCutBy": {
      "areaOrdinal1": "patch ordinal in spawn-distance order, at firstSession.placement.secondFindOrdinalMin and secondFindOrdinalMax",
      "allOtherAreas": "chunk, into as-equal-as-possible contiguous runs"
    },
    "withinGroup": "one patch index drawn from the seed over that group's indices",
    "onboardingOverride": {
      "areaOrdinal": 1,
      "group": 1,
      "patch": "nearest the plot spawn point",
      "appliesExactlyOnce": true
    },
    "mayReadPatchTier": false,
    "mayReadPlayerState": false
  },
  "spawnAdjacencyOwnedBy": "onboarding, via firstSession.placement.spawnToNearestPatchMaxStuds and firstSession.armDistanceStuds; this key states no interval of its own",
  "repetitionRules": [
    "R1",
    "R2",
    "R3",
    "R4"
  ],
  "invariants": [
    "depths.areas[k].chunkCount * chunk.footprintStuds2 == depths.areas[k].footprintStuds2",
    "depths.areas[k].chunkCount * families[depth].patchesPerChunk == depths.areas[k].patchCount",
    "chunksPerFamily * orientations >= max chunkCount over all areas",
    "patchesPerChunk is strictly increasing in depth",
    "no two anchors in one chunk are closer than depths.areas[k].minSpacing",
    "the nearest patch to the spawn satisfies firstSession.placement.spawnToNearestPatchMaxStuds, which this key does not restate"
  ]
}
```

#### `depths` *(from gameplay/meta/04-the-depth-ladder.md)*

```json
{
  "depthCount": 4,
  "areaCount": 8,
  "sizingRule": "footprint(k) = floorToChunk( min(LAP_TARGET * tau(k), LAP_CEILING * tauTol(k)) / ROUTE_SLACK ), tau(k) = 2*(baseClearRadius + radiusLevel*perLevel)*(baseWalkSpeed + speedLevel*perLevel) at arrival",
  "footprintCeilingStuds2": 73216,
  "unlockRule": "the area before it in this list is complete; nothing else conditions any area or any depth. This is a strike on theme/setting/04 W5, taken in this sheet's Pushing back.",
  "relicSliceAssignment": "each depth's set is cut into collection.areasPerDepth contiguous slices of collection.relicsPerArea names in name order; the slices are assigned to that depth's areas in an order seeded by (layoutSeed, depth), per gameplay/systems/05 discovery.theOnlyRandomQuantities[1]",
  "purchaserFloorRule": "row k is under core-loop/04's 75 s floor above tau = 2 * footprintStuds2 / 75; the product of every product factor on the radius axis must stay at or under that row's maxRadiusProduct",
  "valueOnlyPurchaserThreshold": 7,
  "areas": [
    {
      "ordinal": 1,
      "depth": 1,
      "setId": "terrace",
      "relicSliceIndex": "seeded(layoutSeed, depth)",
      "label": "East Terrace",
      "footprintStuds2": 14400,
      "chunkCount": 4,
      "patchCount": 140,
      "minSpacing": 6,
      "unlock": "none",
      "maxRadiusProduct": null
    },
    {
      "ordinal": 2,
      "depth": 1,
      "setId": "terrace",
      "relicSliceIndex": "seeded(layoutSeed, depth)",
      "label": "West Terrace",
      "footprintStuds2": 25200,
      "chunkCount": 7,
      "patchCount": 245,
      "minSpacing": 6,
      "unlock": "previousAreaComplete",
      "maxRadiusProduct": 1.27
    },
    {
      "ordinal": 3,
      "depth": 2,
      "setId": "cistern",
      "relicSliceIndex": "seeded(layoutSeed, depth)",
      "label": "East Cistern",
      "footprintStuds2": 39600,
      "chunkCount": 11,
      "patchCount": 407,
      "minSpacing": 6,
      "unlock": "previousAreaComplete",
      "maxRadiusProduct": 1.44
    },
    {
      "ordinal": 4,
      "depth": 2,
      "setId": "cistern",
      "relicSliceIndex": "seeded(layoutSeed, depth)",
      "label": "West Cistern",
      "footprintStuds2": 50400,
      "chunkCount": 14,
      "patchCount": 518,
      "minSpacing": 6,
      "unlock": "previousAreaComplete",
      "maxRadiusProduct": 1.84
    },
    {
      "ordinal": 5,
      "depth": 3,
      "setId": "vault",
      "relicSliceIndex": "seeded(layoutSeed, depth)",
      "label": "East Vault",
      "footprintStuds2": 57600,
      "chunkCount": 16,
      "patchCount": 624,
      "minSpacing": 6,
      "unlock": "previousAreaComplete",
      "maxRadiusProduct": 2.1
    },
    {
      "ordinal": 6,
      "depth": 3,
      "setId": "vault",
      "relicSliceIndex": "seeded(layoutSeed, depth)",
      "label": "West Vault",
      "footprintStuds2": 57600,
      "chunkCount": 16,
      "patchCount": 624,
      "minSpacing": 6,
      "unlock": "previousAreaComplete",
      "maxRadiusProduct": 2.1
    },
    {
      "ordinal": 7,
      "depth": 4,
      "setId": "spire",
      "relicSliceIndex": "seeded(layoutSeed, depth)",
      "label": "East Spire",
      "footprintStuds2": 57600,
      "chunkCount": 16,
      "patchCount": 640,
      "minSpacing": 6,
      "unlock": "previousAreaComplete",
      "maxRadiusProduct": 2.1
    },
    {
      "ordinal": 8,
      "depth": 4,
      "setId": "spire",
      "relicSliceIndex": "seeded(layoutSeed, depth)",
      "label": "West Spire",
      "footprintStuds2": 57600,
      "chunkCount": 16,
      "patchCount": 640,
      "minSpacing": 6,
      "unlock": "previousAreaComplete",
      "maxRadiusProduct": 2.1
    }
  ],
  "requestedRevisions": [
    {
      "sheet": "cid/gameplay/meta/02-the-collection.md",
      "change": "relicsPerArea 6 -> 3, areasPerDepth 1 -> 2",
      "reason": "areas at one depth partition that depth's set (gameplay/systems/05); 3 x 2 = 6 is the pair theme/fantasy/02 criterion 1 names"
    },
    {
      "sheet": "cid/theme/setting/04-permanence-and-passage.md",
      "change": "strike W5; keep W1-W4 and W6",
      "reason": "the inward opening is passable only when the part is finished; this sheet and meta/06 take the strike that sheet itself names"
    }
  ],
  "invariants": [
    "areas[0].footprintStuds2 == area.size ^ 2 and areas[0].patchCount == area.patchCount and areas[0].minSpacing == area.minSpacing",
    "count of areas at each depth == collection.areasPerDepth; this key does not carry that number",
    "collection.relicsPerArea * collection.areasPerDepth == the size of every set",
    "the resolved slices of one depth's areas partition that set with no overlap and no gap",
    "footprintStuds2 is a whole multiple of layout.chunk.footprintStuds2 and equals chunkCount times it",
    "patchCount == chunkCount * layout.patchesPerChunkByDepth[depth]",
    "patchCount / footprintStuds2 is non-decreasing in ordinal and strictly increases at every depth step",
    "minSpacing > movement.baseClearRadius",
    "footprintStuds2 <= footprintCeilingStuds2 for every row",
    "lapSeconds(k) = footprintStuds2(k) / tau(k) * ROUTE_SLACK is inside 75..200 for every row, both at arrival and one upgrade level behind arrival on both throughput axes",
    "patchCount <= lapSeconds(k) / (2 * runtime.clearTickRate)",
    "the product of every products[].factor on the radius axis is at most maxRadiusProduct for every row"
  ]
}
```

#### `discovery` *(from gameplay/systems/05-the-find-ledger.md)*

```json
{
  "pool": {
    "scope": "per player, per depth",
    "source": "collection.sets[depth].relics",
    "replacement": "without",
    "areasPartitionTheSet": true,
    "invariant": "collection.relicsPerArea * collection.areasPerDepth == collection.sets[depth].relics.length",
    "invariantHoldsToday": "6 * 1 == 6; this rule changes no shipped behaviour at current values",
    "placementIsPlayerIndependent": true,
    "placementRule": "the layout seed alone picks which patch indices carry a Find; the area's slice fills those slots in order. Neither the player's found set nor cleared set is an input to placement.",
    "placementDomain": "uncleared patches only — derived, not filtered: clearing a patch reveals its Find, so an unfound Find's slot is never a cleared patch",
    "stableAcrossRejoin": true,
    "exclusionKey": "ever-found; it governs what a slot yields, never where a slot is",
    "spatialDistribution": "content-structure work's, not decided here",
    "tierWeighting": "none, per the rarity key",
    "guaranteedException": "onboarding's first Find sits on the patch nearest the plot origin, from the same seed, and consumes the first slot of depth 1's slice"
  },
  "record": {
    "keyedBy": "the Find's name, from collection.sets[].relics[].name",
    "entries": "sum(collection.sets[].relics.length)",
    "fields": [
      {
        "name": "found",
        "type": "boolean",
        "default": false,
        "persisted": true,
        "writtenBy": "server, at the instant the hiding patch clears",
        "clearedBy": "nothing, ever"
      }
    ],
    "derived": [
      "foundCount = the number of true entries",
      "setComplete(setId) = every name in that set is true",
      "collectionComplete = every name in collection is true",
      "newThisSession = compared against a snapshot taken at join, held in memory, never saved"
    ],
    "forbiddenFields": [
      "count",
      "duplicates",
      "timesFound",
      "timestamp",
      "foundAt",
      "depthFoundAt",
      "condition",
      "quality",
      "variant",
      "restoredLevel",
      "favourite",
      "seen",
      "isNew",
      "equipped",
      "sortIndex",
      "tradeable"
    ],
    "growth": "one boolean per name in collection, and nothing else; the record never grows with play"
  },
  "repeat": {
    "possible": false,
    "cause": "only a layout that assigns a name outside its area's slice, which is a build defect and not a game state",
    "runtimeBehaviour": "the patch hides nothing, the server logs a warning naming the Find and the patch index, the reveal channel does not fire",
    "silentDiscardRatified": false,
    "playerFacing": "nothing, and no player can reach this branch; it is a defect path, not the silent duplicate case core-loop/03 forbids"
  },
  "luckShaped": false,
  "luckShapedDetail": "the partition is fixed and placement is seed-derived, so the SET of Finds a depth yields is fully determined. There is no drop rate, so there is no rate for a multiplier to act on.",
  "theOnlyRandomQuantities": [
    "which patch indices the seed picks to carry a slice",
    "the order in which a depth's slices are assigned to its areas"
  ],
  "sellableLuck": null,
  "persistenceRequirement": "one boolean per name in collection and nothing else; the one part of save data bounded by design rather than by collapse"
}
```

#### `rarity` *(from gameplay/systems/03-rarity-ladders.md)*

```json
{
  "gradedLadderCount": 1,
  "ladders": [
    {
      "id": "overgrowth-tier",
      "kind": "graded",
      "sourceField": "patch.tierIndex",
      "definedBy": "tiers",
      "rungs": 4,
      "rolled": true,
      "rolledFrom": "tiers[].weight",
      "perObjectVisualGrade": true,
      "legibilityChannel": "silhouette first, colour second",
      "affects": [
        "the per-clear payout, via economy.faucets[patch-clear]"
      ]
    },
    {
      "id": "find-set",
      "kind": "ordinal",
      "sourceField": "collection.sets[].index",
      "definedBy": "collection",
      "rungs": 4,
      "rolled": false,
      "perObjectVisualGrade": false,
      "legibilityChannel": "the set heading on the collection surface, and nothing on the object",
      "affects": []
    }
  ],
  "findRarityField": null,
  "findPlacementReadsTier": false,
  "findPlacementWeighting": "blind to tier: the probability a patch carries a Find is independent of its tierIndex. Whether that choice is spatially uniform or spread is content-structure work's, not this key's.",
  "depthRarityChannel": "tiers[].weight, shifted toward the rare end per depth",
  "depthRarityBlocker": "tiers has no depth dimension; adding one is a revision to 01-overgrowth-tiers, not a change made here",
  "forbidden": [
    "a rarity, grade, tier, star, quality or condition field on a Find",
    "a rarity colour, frame, glow, border, sparkle or badge on a collection slot",
    "a rarer patch hiding a Find more often than a common patch does",
    "a rarer patch hiding a rarer Find",
    "a fifth overgrowth tier added to signal depth",
    "a per-depth recolour of the four tiers that changes their silhouettes",
    "a reveal cue that varies by which set the Find belongs to",
    "any rarity read a player must learn in addition to the four silhouettes"
  ]
}
```

#### `firstSession` *(from gameplay/onboarding/02-first-minute-beats.md)*

```json
{
  "armDistanceStuds": 2,
  "armScope": "perCharacterSpawn",
  "armMeasuredOn": "server, horizontal XZ displacement of the character root from the plot spawn pivot",
  "ceilings": {
    "secondsToFirstClear": {
      "max": 3,
      "measuredFrom": "firstInput",
      "population": "all run-1 sessions in which any input occurred"
    },
    "secondsToFirstReveal": {
      "max": 10,
      "measuredFrom": "join",
      "population": "run-1 sessions whose first input arrived by second 5.0"
    }
  },
  "placement": {
    "ordering": "patches sorted ascending by XZ distance from the plot spawn point",
    "firstFindOrdinal": 1,
    "secondFindOrdinalMin": 8,
    "secondFindOrdinalMax": 40,
    "tierContrastWithinFirstOrdinals": 20,
    "spawnToNearestPatchMaxStuds": 3.5,
    "spawnToNearestPatchFormula": "movement.baseClearRadius - firstSession.armDistanceStuds"
  },
  "firstPurchaseBand": {
    "appliesTo": "the cheapest upgrade's level-1 cost",
    "minPatchesOfClearing": 10,
    "maxSecondsOfClearing": 60,
    "atStats": "base"
  },
  "beats": [
    {
      "id": "spawn",
      "bySecond": 0,
      "from": "join",
      "precondition": "character loaded and pivoted to the plot spawn point",
      "guaranteedOutcome": "stands inside standing overgrowth, tool welded and visible, at least one standing patch inside movement.baseClearRadius, clearedCount 0",
      "teaches": null
    },
    {
      "id": "firstClear",
      "bySecond": 3,
      "from": "firstInput",
      "precondition": "armed: horizontal displacement from the spawn pivot has exceeded armDistanceStuds at least once this character life",
      "guaranteedOutcome": "at least one patch clears and credits currency on the same server tick",
      "teaches": [
        "contactClearing",
        "currency"
      ]
    },
    {
      "id": "firstReveal",
      "bySecond": 10,
      "from": "join",
      "precondition": "firstClear fired on the patch carrying the placed Find",
      "guaranteedOutcome": "exactly one Find is revealed and enters the collection permanently",
      "teaches": [
        "theFind"
      ]
    },
    {
      "id": "firstOrdinaryClear",
      "bySecond": 15,
      "from": "join",
      "testRange": [
        10,
        25
      ],
      "precondition": "firstReveal has fired",
      "guaranteedOutcome": "at least three patches clear with no reveal",
      "teaches": [
        "theFind"
      ]
    },
    {
      "id": "tierContrast",
      "bySecond": 45,
      "from": "join",
      "testRange": [
        25,
        75
      ],
      "precondition": "the first 20 patches by spawn-distance ordinal hold at least two distinct tierIndex values",
      "guaranteedOutcome": "two clears with different currency credits and different silhouettes",
      "teaches": null
    },
    {
      "id": "firstSpendAffordable",
      "bySecond": 60,
      "from": "join",
      "testRange": [
        40,
        120
      ],
      "awaitingValue": "upgrades[].costBase",
      "precondition": "balance has reached the cheapest upgrade's level-1 cost",
      "guaranteedOutcome": "the cheapest upgrade row lifts and the player holds enough to buy it",
      "teaches": [
        "upgradeAxes"
      ]
    }
  ],
  "teaching": [
    {
      "concept": "contactClearing",
      "taughtBy": "beat:firstClear",
      "byBeat": "firstClear",
      "evidence": "five or more clears in the 15 s after the first, with no input gap over 3 s",
      "required": true
    },
    {
      "concept": "currency",
      "taughtBy": "beat:firstClear",
      "byBeat": "firstClear",
      "evidence": "the currency readout is non-zero and rising while the player moves",
      "required": false
    },
    {
      "concept": "theFind",
      "taughtBy": "beat:firstReveal, corrected by beat:firstOrdinaryClear",
      "byBeat": "firstOrdinaryClear",
      "evidence": "the player keeps clearing new ground after firstOrdinaryClear rather than re-walking the reveal site",
      "required": false
    },
    {
      "concept": "upgradeAxes",
      "taughtBy": "beat:firstSpendAffordable",
      "byBeat": "firstSpendAffordable",
      "evidence": "a first purchase occurs in session 1",
      "required": false
    },
    {
      "concept": "areaCompletion",
      "taughtBy": "the area progress readout moving, and the standing/cleared edge",
      "byBeat": "minute:5",
      "testRange": [
        3,
        8
      ],
      "evidence": "cleared fraction at session end exceeds the fraction at first sight of the readout",
      "required": false
    },
    {
      "concept": "sets",
      "taughtBy": "the collection surface showing one filled slot in a labelled group of six",
      "byBeat": "firstReveal+60s",
      "testRange": [
        30,
        180
      ],
      "evidence": "the collection surface is opened at least once in session 1",
      "required": false
    },
    {
      "concept": "depth",
      "taughtBy": "entering a second area through an opening that needs no explanation",
      "byBeat": "minute:6",
      "testRange": [
        3,
        12
      ],
      "evidence": "a second area is entered in session 1",
      "required": false
    }
  ],
  "neverTaught": [
    "rebirth",
    "offlineAccrual",
    "findRarity",
    "discoveryRate",
    "duplicates",
    "failure",
    "anyControl",
    "codesDailiesLeaderboardsTrading"
  ],
  "tutorialDevicesForbidden": [
    "imperativeString",
    "tipHintHowToPlayObjectiveGoalString",
    "pointerArrowChevronBeamWaypointOutlineHighlight",
    "ghostedOrPulsingControlGlyph",
    "firstRunOnlyString",
    "unrequestedModalPanelOrOverlay",
    "countdownOrTutorialChecklist",
    "voiceOverOrSpokenLine",
    "welcomeOrWelcomeBackString",
    "stringNamingAControl",
    "uncausedCameraMoveZoomOrReframe",
    "promptingSound"
  ],
  "withheld": [
    {
      "surface": "collectionCount",
      "presentAtJoin": true,
      "liftedBy": null,
      "latched": false,
      "joinValue": "0"
    },
    {
      "surface": "collectionDenominator",
      "presentAtJoin": false,
      "liftedBy": "beat:firstReveal",
      "latched": true,
      "latchSource": "the collection map is non-empty",
      "newSaveFields": 0
    },
    {
      "surface": "currencyReadout",
      "presentAtJoin": true,
      "liftedBy": null,
      "latched": false,
      "joinValue": "0"
    },
    {
      "surface": "upgradeRow",
      "perRow": true,
      "presentAtJoin": false,
      "liftedBy": "balance has reached upgrades[i] level-1 cost",
      "latched": true,
      "latchSource": "one persisted boolean per row",
      "newSaveFields": 3
    },
    {
      "surface": "areaProgress",
      "presentAtJoin": true,
      "liftedBy": null,
      "latched": false,
      "joinValue": "0%"
    },
    {
      "surface": "collectionPanel",
      "presentAtJoin": false,
      "liftedBy": "beat:firstReveal",
      "latched": true,
      "latchSource": "the collection map is non-empty",
      "newSaveFields": 0
    }
  ],
  "suppressionForbidden": [
    "padlockOrLockGlyph",
    "greyedOrDimmedRow",
    "questionMarkPlaceholder",
    "unknownDenominatorForm",
    "explanatoryTooltip",
    "liftAnimation",
    "liftSound",
    "newBadgeOrDot",
    "reSuppression",
    "unrevealedFindsInCount",
    "percentFormOfCollectionCount",
    "reflowOnLift"
  ],
  "permittedConfusion": [
    "patchTier",
    "costGrowth",
    "depthMeaning",
    "setBonus",
    "collectionEnd",
    "otherPlayersAreReal",
    "persistence",
    "absenceOfRebirthAndIdle"
  ]
}
```

#### `endgame` *(from gameplay/meta/07-after-the-last-find.md)*

```json
{
  "terminalCondition": "the player's found count reaches the total number of names in collection",
  "reachedAt": {
    "areaOrdinal": 8,
    "event": "the reveal on the last patch of the eighth bay that carries a Find"
  },
  "gameEnds": false,
  "collectionEnds": true,
  "endScreen": false,
  "survivingPayoffKinds": [
    "currencyTick",
    "areaCompletion"
  ],
  "extinctPayoffKinds": [
    "upgradePurchase",
    "findReveal",
    "setCompletion"
  ],
  "risingQuantity": "areasFinished",
  "postTerminalArea": {
    "unlimited": true,
    "depth": 4,
    "setId": "spire",
    "label": "Spire",
    "labelCarriesNoOrdinalOrNumber": true,
    "footprintStuds2": 57600,
    "chunkCount": 16,
    "patchCount": 640,
    "minSpacing": 6,
    "relicSliceIndex": "none",
    "buriesFinds": 0,
    "unlock": "previousAreaComplete",
    "bayLengthStuds": 480,
    "drawsFrom": "the depth-4 chunk family, under layout's R1 to R4"
  },
  "predicateScopeChange": {
    "maxAboveTickGapSeconds": {
      "value": 90,
      "appliesWhile": "found < totalFinds"
    },
    "maxSecondsPerClear": {
      "value": 3,
      "appliesAlways": true
    },
    "lapSecondsBand": {
      "value": [
        75,
        200
      ],
      "appliesAlways": true
    },
    "arrivalBelowThroughputCap": {
      "appliesWhile": "found < totalFinds"
    }
  },
  "persistence": {
    "postTerminalAreasStoredAs": "one integer count, never one boolean per area",
    "reason": "an unlimited run of identical unnumbered bays must not turn world state into unbounded save data"
  },
  "forbidden": [
    "rebirth",
    "prestige",
    "offlineAccrual",
    "dailyReward",
    "seasonPass",
    "seasonalEvent",
    "leaderboard",
    "trading",
    "redeemCode",
    "secondCollection",
    "completionPercent",
    "badgeLadder",
    "secondCurrency"
  ],
  "invariants": [
    "survivingPayoffKinds and extinctPayoffKinds partition core-loop/02's five kinds with no overlap",
    "postTerminalArea.relicSliceIndex is none and buriesFinds is 0",
    "postTerminalArea's footprint, chunkCount and patchCount equal depths.areas[7]'s",
    "no entry in forbidden appears as an identifier anywhere in game/src",
    "nothing in this key names a reward, a grant, a threshold or a recurrence"
  ]
}
```

#### `onboarding` *(from gameplay/onboarding/01-first-find.md)*

```json
{
  "guaranteedFirstRelic": true
}
```

#### `collection` *(from gameplay/meta/02-the-collection.md)*

```json
{
  "className": "Find",
  "classPlural": "Finds",
  "relicsPerArea": 3,
  "areasPerDepth": 2,
  "sets": [
    {
      "id": "terrace",
      "label": "Terrace",
      "depth": 1,
      "relics": [
        "Sundial",
        "Ewer",
        "Hinge",
        "Tessera",
        "Stylus",
        "Bellcast"
      ]
    },
    {
      "id": "cistern",
      "label": "Cistern",
      "depth": 2,
      "relics": [
        "Sluice",
        "Weight",
        "Siphon",
        "Chain",
        "Grate",
        "Cup"
      ]
    },
    {
      "id": "vault",
      "label": "Vault",
      "depth": 3,
      "relics": [
        "Seal",
        "Ledger",
        "Coffer",
        "Key",
        "Tally",
        "Ring"
      ]
    },
    {
      "id": "spire",
      "label": "Spire",
      "depth": 4,
      "relics": [
        "Gnomon",
        "Lens",
        "Vane",
        "Crest",
        "Orrery",
        "Finial"
      ]
    }
  ]
}
```

#### `tiers` *(from gameplay/systems/01-overgrowth-tiers.md)*

```json
[
  {
    "name": "Moss",
    "shape": "Block",
    "rgb": [
      104,
      142,
      76
    ],
    "value": 1,
    "weight": 52,
    "height": 1.6
  },
  {
    "name": "Fern",
    "shape": "Cylinder",
    "rgb": [
      78,
      128,
      66
    ],
    "value": 3,
    "weight": 28,
    "height": 2.4
  },
  {
    "name": "Bramble",
    "shape": "Ball",
    "rgb": [
      58,
      104,
      58
    ],
    "value": 8,
    "weight": 14,
    "height": 2.8
  },
  {
    "name": "Heartvine",
    "shape": "Wedge",
    "rgb": [
      44,
      86,
      52
    ],
    "value": 20,
    "weight": 6,
    "height": 3.4
  }
]
```

#### `area` *(from gameplay/meta/01-the-area.md)*

```json
{
  "id": "east-terrace",
  "label": "East Terrace",
  "originXZ": [
    0,
    0
  ],
  "size": 120,
  "patchCount": 140,
  "minSpacing": 6
}
```

#### `traversal` *(from gameplay/mechanics/06-traversal-affordances.md)*

```json
{
  "jump": {
    "exists": true,
    "jumpHeight": 7.2,
    "useJumpPower": false,
    "changesGameState": false,
    "upgradable": false,
    "gatedContent": 0
  },
  "fall": {
    "damage": false,
    "voidBelowPlayArea": false,
    "maxSurvivableFallStuds": null
  },
  "death": {
    "possibleByDesign": false,
    "damageSources": 0,
    "healthWrittenByGameCode": false,
    "respawnAt": "areaSpawn",
    "lossOnRespawn": "none",
    "authoredCue": "none",
    "respawnDelayOwner": "architect/01-runtime"
  },
  "boundary": {
    "kind": "collisionBarrier",
    "walkableMarginStuds": 12,
    "heightStuds": 20,
    "passable": false,
    "climbable": false,
    "jumpable": false,
    "opaque": false,
    "sightlineObstruction": "none",
    "cue": "none",
    "teleportBack": false
  },
  "surface": {
    "maxStepStuds": 2,
    "maxSlopeDegreesWherePatchesStand": 30,
    "climbSurfaces": 0,
    "ladders": 0,
    "seats": 0,
    "vehicles": 0,
    "water": 0,
    "speedModifyingSurfaces": 0,
    "teleportsWithinArea": 0
  },
  "collision": {
    "playerVsWorld": true,
    "playerVsPlayerOwner": "social.characterCollision"
  },
  "hazards": 0,
  "fallPenalties": 0,
  "lockouts": 0
}
```

#### `runtime` *(from 01-runtime.md)*

```json
{
  "clearTickRate": 0.12,
  "saveIntervalSeconds": 45,
  "respawnDelaySeconds": 3,
  "dataStoreName": "ArgaRuin_v2",
  "layoutSeed": 20260801,
  "maxPlayers": 16,
  "placeConfiguration": {
    "maxPlayers": {
      "value": 16,
      "band": "social.maxPlayers, 12 to 20",
      "setVia": "place configuration — Players.MaxPlayers is read-only from a script and no module may write it",
      "ownedBy": "whoever publishes the place",
      "assertedBy": "world.configure(), which READS Players.MaxPlayers at boot and warns naming this key when it is outside the band"
    },
    "nothingElseIsPlaceConfiguration": "every other decision in social — collision groups, chat, plot access, the forbidden APIs — is executed by world.configure() at runtime. maxPlayers is the only one that is not, and it is the only entry in this block."
  },
  "storeVersionHistory": {
    "ArgaRuin_v1": "wave-1 shape: areaComplete boolean, single-area cleared set, no rowsRevealed. No reader is written; nothing shipped to players.",
    "ArgaRuin_v2": "current. areasFinished integer, live-area cleared set, rowsRevealed."
  }
}
```

#### `interfaces (yours and your dependencies')`

```json
[
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
      {
        "name": "upgrade",
        "type": "UpgradeDef",
        "note": "one entry of GameConfig.Upgrades, the table itself and not its id"
      },
      {
        "name": "level",
        "type": "integer",
        "meaning": "the level the player currently HOLDS, not the level being bought. The price of the first purchase is upgradeCost(def, 0) and equals def.costBase. The price of moving from level 3 to 4 is upgradeCost(def, 3)."
      }
    ],
    "returns": "integer — floor(costBase * costGrowth ^ level)",
    "note": "Generated. Do not reimplement the curve anywhere else. A purchase is legal only while the held level is strictly below def.maxLevel, so the highest price ever charged is upgradeCost(def, maxLevel - 1). firstSession.withheld.upgradeRow lifts row i when the balance reaches upgradeCost(def_i, 0), which is the same call with the same convention."
  },
  {
    "module": "config",
    "fn": "upgradeEffect(upgrade, level)",
    "params": [
      {
        "name": "upgrade",
        "type": "UpgradeDef",
        "note": "needs base, perLevel and mode"
      },
      {
        "name": "level",
        "type": "integer",
        "meaning": "the level currently HELD, same convention as upgradeCost. Effect at level 0 is def.base, which is the pre-upgrade value: 5.5 studs for radius, 16 for speed, 1.0 for value."
      }
    ],
    "returns": "number — base + perLevel * level when mode is \"additive\", base * perLevel ^ level when mode is \"compounding\"",
    "note": "STEP 1 OF modifiers.resolutionOrder, and the only place the additive-versus-compounding question is answered. modifiers.axes[].baseFrom says of all three axes that the base is 'already inside upgradeEffect', and modifiers.baseIsNotAppliedTwice forbids multiplying it in again — so modifiers.effective calls this ONCE and multiplies FACTORS onto its result. All three shipped upgrades are additive today, which is exactly why hand-inlining looks harmless and would silently ignore a future compounding axis."
  },
  {
    "module": "config",
    "fn": "tierByWeight(roll)",
    "params": [
      {
        "name": "roll",
        "type": "number",
        "meaning": "a uniform sample in [0, 1). Not a weight, not a tier index, and not pre-scaled by the weight total — the function scales it. It must come from layout's seeded stream; rarity.ladders[overgrowth-tier].rolled is true and rolledFrom is tiers[].weight."
      }
    ],
    "returns": "(integer, TierDef) — the 1-based index into GameConfig.Tiers, then the tier table",
    "note": "The integer is what goes into Patch.tierIndex; the table is for reading value, height and shape at the point of use. Storing the table in a Patch instead of the index is forbidden by 03-state-shape: re-emitting the config would leave stale names in live patches. rarity.depthRarityChannel wants these weights shifted toward the rare end per depth and rarity.depthRarityBlocker says tiers has no depth dimension, so there is ONE weight table for all four depths and adding a second is a revision to the tiers sheet, not a branch here."
  },
  {
    "module": "layout",
    "fn": "areaSpec(areaOrdinal)",
    "params": [
      {
        "name": "areaOrdinal",
        "type": "integer",
        "meaning": "the 1-based ordinal of an area in depths.areas. 1 is East Terrace. It is state.areasFinished + 1 at every call site in the game — depths.unlockRule is 'the area before it in this list is complete', which is that expression and nothing else. An ordinal above 8 is a post-terminal area."
      }
    ],
    "returns": "AreaSpec — { ordinal, depth, setId, label, relicSlice, footprintStuds2, chunkCount, patchCount, minSpacing, unlock }",
    "note": "For ordinal 1..8 this is depths.areas[ordinal] verbatim. For ordinal > 8 it is endgame.postTerminalArea with depth 4, setId 'spire', an EMPTY relicSlice, and the same footprint, chunkCount and patchCount as depths.areas[8] — endgame's own invariant requires those three to be equal. Exists so the `if ordinal > 8` branch is written once: plots, clearing, hud-binding and this module's own build() all need the row, and three of them would otherwise have written it themselves. The label for a post-terminal area is endgame.postTerminalArea.label ('Spire') and carries no ordinal and no number, per endgame.postTerminalArea.labelCarriesNoOrdinalOrNumber."
  },
  {
    "module": "layout",
    "fn": "build(areaOrdinal)",
    "params": [
      {
        "name": "areaOrdinal",
        "type": "integer",
        "meaning": "same convention as areaSpec: the 1-based area ordinal, which is state.areasFinished + 1. NOT a depth, NOT a chunk index and NOT a bay index — bays and areas happen to share their ordinals because plots.bays[k] holds depths.areas[k], and that coincidence is a fact about the lane, not about this function."
      }
    ],
    "returns": "{ Patch } — exactly areaSpec(areaOrdinal).patchCount records in a fixed canonical order",
    "note": "PLOT-LOCAL POSITIONS, in studs, with X in [-48, 48] and Z inside plots.bays[areaOrdinal]'s span; plots adds the slot origin and writes WORLD positions into state.patches. THE ARRAY INDEX IS THE PATCH'S DURABLE IDENTITY — state.cleared is keyed by it — so changing the order is a save migration, not a refactor. Composition, in order: (1) draw areaSpec.chunkCount variants without replacement from the depth family's layout.variantsPerFamily (16 = 8 chunks x 2 orientations), seeded by (GameConfig.LayoutSeed, areaOrdinal) and by NOTHING ELSE, honouring layout.repetitionRules R1 to R4; (2) lay them nose to tail inward along +Z, each layout.chunk.widthStuds x layout.chunk.depthStuds; (3) generate each chunk's anchors from hash(LayoutSeed, chunkId) and freeze them — layout.anchorSource says authored per chunk, and until authoring exists this is 'the same data by a cheaper route'; (4) roll each patch's tier from tierByWeight on a DISJOINT seeded stream, after placement, because rarity.findPlacementReadsTier and layout.findPlacement.mayReadPatchTier are both false; (5) split the chunk run into collection.relicsPerArea (3) contiguous groups of as-equal-as-possible length and bury exactly one Find in each, group g carrying areaSpec.relicSlice[0] + g - 1, per layout.findPlacement.rule. TWO CONSTRAINTS ON AREA 1 ONLY: layout.findPlacement.onboardingOverride puts group 1's Find on the patch nearest the plot origin, and firstSession.placement requires that patch to be at most 3.5 studs from the spawn point (movement.baseClearRadius - firstSession.armDistanceStuds), the second Find between spawn-distance ordinals 8 and 40, and at least two distinct tierIndex values inside the first 20 ordinals. Reads no player, no state and no clock. Takes no slot: every lane has the same layout, which is what makes state.cleared portable across a rejoin."
  }
]
```

### Done when

1. two calls with the same areaOrdinal, in different sessions and on different machines, return byte-identical positions, tiers and Find placement
2. build(k) returns exactly depths.areas[k].patchCount records for k in 1..8, and endgame.postTerminalArea.patchCount for k > 8
3. no two patch anchors in one chunk are closer than depths.areas[k].minSpacing, and no anchor lies within traversal.boundary.walkableMarginStuds of a lane edge
4. exactly collection.relicsPerArea patches carry a Find, one per contiguous group of the chunk run, and group g carries depths.areas[k].relicSlice[0] + g - 1
5. for areaOrdinal 1 the patch nearest the plot spawn point is at most firstSession.placement.spawnToNearestPatchMaxStuds away and carries the first Find of depth 1's slice
6. sorting area 1's patches by XZ distance from the spawn point puts the first Find at ordinal 1 and the second between firstSession.placement.secondFindOrdinalMin and Max, and the first 20 ordinals hold at least two distinct tierIndex values
7. an area at ordinal > 8 carries no Find at all (endgame.postTerminalArea.relicSlice is empty)

---

## 4. `modifiers` — shared

**Write to:** `game/src/shared/Modifiers.luau`

**Owns:** THE ONE IMPLEMENTATION of effective(state, axis): upgrade effect, then set-completion factors, then purchase factors, then one ceiling clamp.

**Depends on:** `config`

### Must expose

- `effective(state, axis)`
- `ceiling(axis, areaOrdinal)`

### Must not

- applying upgrades[axis].base a second time. config.upgradeEffect already contains it — modifiers.baseIsNotAppliedTwice — and the set and purchase steps are FACTORS, multiplied onto its result
- clamping between two sources. modifiers.clampApplication is 'once, after every source has been applied; never per source'
- reordering the four steps. modifiers.resolutionOrder is upgradeEffect, set-completion, purchase, ceiling clamp, and modifiers.withinStepOrder fixes the order inside each step as contract declaration order
- latching, caching or persisting a set factor or a purchase factor. modifiers.sources[set-completion].storage says 'derived from discovery.record at every read; never latched, never persisted' and [purchase] says the same, which is why there is no setsComplete field in stateShape
- admitting a factor below modifiers.factorFloor (1), or an axis id that is not an upgrades[].id
- yielding. Every input is state or GameConfig; UserOwnsGamePassAsync belongs to entitlements
- being called from a client module. The server is the only authority on an effective value; a client that needs one reads it off the snapshot

### Values

#### `modifiers` *(from gameplay/systems/06-modifier-stacking.md)*

```json
{
  "modifierObject": {
    "fields": [
      {
        "name": "sourceClass",
        "type": "enum: upgrade-level | set-completion | purchase"
      },
      {
        "name": "sourceId",
        "type": "string",
        "meaning": "the upgrade id, collection set id or product id that granted it"
      },
      {
        "name": "axis",
        "type": "enum: value | radius | speed"
      },
      {
        "name": "factor",
        "type": "number >= 1"
      }
    ],
    "revocable": false,
    "expires": false,
    "grantsNothingElse": "a modifier changes exactly one axis; it never grants currency, a Find, an area, a cosmetic or a second modifier"
  },
  "axisIdsJoinUpgrades": "axes[].id is upgrades[].id verbatim; Pace is a label and never an id",
  "axes": [
    {
      "id": "value",
      "label": "Value",
      "unit": "multiplier on tiers[].value",
      "baseFrom": "upgrades[value].base, already inside upgradeEffect",
      "consumedBy": "economy.faucets[patch-clear].formula",
      "ceilingRule": null,
      "ceilingReason": "a currency multiplier breaks no invariant"
    },
    {
      "id": "radius",
      "label": "Reach",
      "unit": "studs",
      "baseFrom": "movement.baseClearRadius, already inside upgradeEffect",
      "consumedBy": "the clearing proximity test",
      "ceilingRule": "effective < area.size / 2",
      "ceilingReason": "beyond it one position clears the whole area and a lap stops existing"
    },
    {
      "id": "speed",
      "label": "Pace",
      "unit": "studs per second",
      "baseFrom": "movement.baseWalkSpeed, already inside upgradeEffect",
      "consumedBy": "the character's WalkSpeed",
      "ceilingRule": "effective * serverTickSeconds <= movement.baseClearRadius",
      "ceilingReason": "beyond it the player outruns the tool between ticks and patches are never cleared"
    }
  ],
  "sources": [
    {
      "class": "upgrade-level",
      "step": 1,
      "instances": "exactly one per upgrade id",
      "mayTarget": [
        "value",
        "radius",
        "speed"
      ],
      "compositionMode": "per upgrades[].mode (additive or compounding)",
      "stacksWithSelf": true,
      "boundedBy": "upgrades[].maxLevel",
      "storage": "the held level is persisted; the effect is derived from it at every read",
      "assignmentOwner": "gameplay/balance"
    },
    {
      "class": "set-completion",
      "step": 2,
      "instances": "at most one per collection.sets[].id",
      "mayTarget": [
        "value",
        "radius",
        "speed"
      ],
      "compositionMode": "multiplicative",
      "stacksWithSelf": false,
      "boundedBy": "the number of sets in collection",
      "storage": "derived from discovery.record at every read; never latched, never persisted",
      "worthBand": "core-loop/02 requires a set bonus be worth between area.patchCount and ladderTotal/perTick/#sets base ticks at grant time; this composition is what converts a factor into that unit",
      "assignmentOwner": "content-structure work (currently gameplay/meta) chooses which axis each set targets; gameplay/balance sets each factor"
    },
    {
      "class": "purchase",
      "step": 3,
      "instances": "at most one per product id",
      "mayTarget": [
        "value",
        "radius",
        "speed"
      ],
      "compositionMode": "multiplicative",
      "stacksWithSelf": false,
      "boundedBy": "the offer ladder",
      "storage": "recomputed from live ownership at every join; never persisted, never latched",
      "assignmentOwner": "offer-ladder work (currently gameplay/monetization) chooses which products exist; gameplay/balance sets each factor"
    }
  ],
  "resolutionOrder": [
    "upgradeEffect (base and level together)",
    "set-completion",
    "purchase",
    "ceiling clamp"
  ],
  "withinStepOrder": "contract declaration order: upgrades[], then collection.sets[], then the offer ladder's own order",
  "composition": "effective(axis) = clamp(upgradeEffect(axis, heldLevel) * PROD(setFactors(axis)) * PROD(purchaseFactors(axis)), ceilingRule)",
  "baseIsNotAppliedTwice": "upgradeEffect already contains upgrades[].base; nothing multiplies the base in again",
  "factorFloor": 1,
  "clampApplication": "once, after every source has been applied; never per source",
  "singleDefinition": "effective(axis) has exactly one implementation and every consumer calls it",
  "forbidden": [
    "a factor below 1, in any source",
    "an additive bonus expressed as a percentage or a flat amount",
    "an axis id that is not an upgrades[].id",
    "a source that targets an axis outside the three",
    "a source that grants currency, a Find, an area, a cosmetic or a second modifier",
    "a modifier that expires, decays, resets, is timed or is spent",
    "a purchase that raises an axis past its ceiling rule",
    "a set bonus written into save data",
    "a purchase written into save data",
    "the value multiplier applied both at the faucet formula and inside the award function",
    "a clamp applied between two sources"
  ]
}
```

#### `setBonus` *(from gameplay/meta/03-set-bonuses.md)*

```json
{
  "sourceClass": "setCompletion",
  "explainedInFiction": false,
  "grantedAt": "the clear of the last patch of the last area at that set's depth",
  "axisMayRepeat": true,
  "factorStatus": "playtest unknown",
  "factorTestRange": [
    1.1,
    1.35
  ],
  "rows": [
    {
      "setId": "terrace",
      "depth": 1,
      "axis": "value",
      "factor": 1.2
    },
    {
      "setId": "cistern",
      "depth": 2,
      "axis": "radius",
      "factor": 1.2
    },
    {
      "setId": "vault",
      "depth": 3,
      "axis": "speed",
      "factor": 1.2
    },
    {
      "setId": "spire",
      "depth": 4,
      "axis": "radius",
      "factor": 1.2
    }
  ],
  "axisHeadroom": {
    "radius": {
      "availableToSetsAtShippedPass": 2.158,
      "spentAtStartingFactors": 1.44,
      "derivation": "0.9 * systems06Ceiling(radius) / upgradeLadderMax(radius) / productFactor(radius)"
    },
    "speed": {
      "availableToSets": 1.611,
      "spentAtStartingFactors": 1.2,
      "derivation": "0.9 * (movement.baseClearRadius / runtime.clearTickRate) / upgradeLadderMax(speed)"
    },
    "value": {
      "availableToSets": null,
      "spentAtStartingFactors": 1.2,
      "derivation": "no ceiling exists on this axis"
    }
  },
  "invariants": [
    "every rows[].setId is a collection.sets[].id",
    "every collection.sets[].id appears in exactly one row",
    "every rows[].axis is an upgrades[].id",
    "every rows[].factor is at least 1.0 and inside factorTestRange",
    "for each axis, the product of its set factors times every product factor on that axis is at most 0.9 times that axis's systems/06 ceiling"
  ]
}
```

#### `products` *(from gameplay/monetization/01-the-offer-ladder.md)*

```json
{
  "storeExists": false,
  "purchaseSurface": "the Roblox experience page. The game draws no store, no shop screen, no offer row and no purchase control of any kind (coordinator ruling R-4).",
  "itemCount": 1,
  "kindsUsed": [
    "gamePass"
  ],
  "devProductCount": 0,
  "axesSold": [
    "radius"
  ],
  "axesNotSold": [
    "value",
    "speed"
  ],
  "rungVocabulary": [
    "impulse",
    "mid",
    "premium"
  ],
  "rungsUsed": [
    "premium"
  ],
  "ownershipCheck": "UserOwnsGamePassAsync(userId, gamePassId), read at join and never persisted",
  "prompt": {
    "method": null,
    "promptGamePassPurchaseCalls": 0,
    "reason": "R-4 removed the in-game store. There is no verb, pressable or screen that could trigger a prompt, and none is reserved. If a purchase surface is ever built, this field is what must be revised first."
  },
  "externalPrerequisite": {
    "what": "products.items[].gamePassId must be filled with the id of a pass created on the Roblox creator site and priced to match priceRobux",
    "owner": "the developer, or whoever holds the Roblox creator account",
    "blocking": "until it is filled, ownershipCheck cannot return true for any player and the product is unownable. This is a provisioning step, not an unfinished specification."
  },
  "items": [
    {
      "id": "span",
      "label": "Span",
      "kind": "gamePass",
      "gamePassId": null,
      "axis": "radius",
      "factor": 1.75,
      "factorTestRange": [
        1.4,
        1.95
      ],
      "factorStatus": "playtest unknown — whether 1.75 reads as an oversized tool is a feel question; the upper bound 1.95 is the hard lap-floor limit at area ordinal 2, not a taste figure",
      "priceRobux": 499,
      "priceBand": "premium 249-499",
      "priceTestRange": [
        349,
        999
      ],
      "rung": "premium",
      "repeatable": false,
      "stacksWithSelf": false,
      "persisted": false,
      "deliverable": "multiplicative factor on the radius axis AND a visibly wider tool head; requires tool head width to resolve from effective radius, not Reach level"
    }
  ],
  "combinedFactorCap": {
    "value": 1,
    "radius": 1.75,
    "speed": 1
  },
  "forbidden": [
    {
      "id": "F1",
      "rule": "No paid area, Find or set, and no paid access to any of them.",
      "closedBy": "03-META.md (brief)",
      "check": "no products[] entry grants a collection entry, an area id or a set; axis is always one of value|radius|speed"
    },
    {
      "id": "F2",
      "rule": "No sale of currency at any rate, in any bundle, ever.",
      "closedBy": "gameplay/systems/04",
      "check": "no products[] field names Shards or an amount; priceRobux exists and no priceShards field does; zero code paths credit currency from a purchase"
    },
    {
      "id": "F3",
      "rule": "No gacha, loot box, crate, roll, spin, pull, egg or randomised purchase outcome.",
      "closedBy": "gameplay/systems/03 + gameplay/systems/05 + platform paid-random-items rules",
      "check": "every products[] entry has a deterministic factor; zero odds tables anywhere; zero PolicyService:GetPolicyInfoForPlayerAsync calls"
    },
    {
      "id": "F4",
      "rule": "No luck multiplier, discovery-rate multiplier or find-better-Finds product.",
      "closedBy": "gameplay/systems/05 (luckShaped: false), gameplay/systems/03 (no per-Find rank)",
      "check": "no products[].axis equals luck; the substring 'luck' appears in zero player-facing strings"
    },
    {
      "id": "F5",
      "rule": "No developer products, and nothing repeatable.",
      "closedBy": "gameplay/systems/06 (one instance per product id) + platform guidance",
      "check": "every products[].kind is gamePass and every repeatable is false; zero PromptProductPurchase calls; zero ProcessReceipt callbacks"
    },
    {
      "id": "F6",
      "rule": "No timed boost, and no modifier that expires, decays, resets, is consumed or is spent.",
      "closedBy": "gameplay/systems/06",
      "check": "no products[] field named duration, expires, seconds, uses, charges or cooldown; no purchase-derived modifier carries a timestamp"
    },
    {
      "id": "F7",
      "rule": "No cosmetics: no skin, trail, aura, particle, hat, accessory, follower, pet, mount, emote, title or nameplate.",
      "closedBy": "03-META.md (declined, needs a display system first) + theme/identity/04 + theme/identity/02",
      "check": "no product changes any instance parented to the character other than the tool head's width"
    },
    {
      "id": "F8",
      "rule": "No premium tool that is the only way to have a tool.",
      "closedBy": "gameplay/mechanics/04 T12 (premiumVariantMayBeOnlyTool: false)",
      "check": "a player owning zero products spawns with a tool welded to the right hand"
    },
    {
      "id": "F9",
      "rule": "One axis and one factor per product. No product grants a second modifier, currency, a Find, an area or a cosmetic.",
      "closedBy": "gameplay/systems/06",
      "check": "every products[] entry has exactly one axis field and one factor field and no grants array"
    },
    {
      "id": "F10",
      "rule": "No timer, countdown, expiry, 'limited', 'new', 'ends in' or 'today only' attached to any offer, anywhere in the game.",
      "closedBy": "theme/tone/04 D9-D10 + platform monetization guidance",
      "check": "zero player-facing strings match /limited|hurry|today only|ends in|last chance|expires/i; no element updates on a clock"
    },
    {
      "id": "F11",
      "rule": "No manufactured scarcity or urgency: no stock count, no 'only N left', no 'N players own this', no waitlist, no queue.",
      "closedBy": "platform monetization guidance (false sense of urgency, artificial scarcity)",
      "check": "no player-facing string contains a number sourced from anything but the player's own state"
    },
    {
      "id": "F12",
      "rule": "No discount, no strikethrough price, no sale price, no bundle price, no first-purchase bonus.",
      "closedBy": "theme/tone/04 D9 + platform monetization guidance",
      "check": "exactly one price per product; products[] has no priceWas, discount, bundle or bonus field"
    },
    {
      "id": "F13",
      "rule": "No purchase prompt of any kind. Under R-4 there is no in-game store, so PromptGamePassPurchase is never called.",
      "closedBy": "theme/tone/04 D10 + coordinator ruling R-4 + gameplay/mechanics/02 (input closed at five verbs)",
      "check": "zero PromptGamePassPurchase calls anywhere in the build, in any path"
    },
    {
      "id": "F14",
      "rule": "No offer may interrupt a beat: nothing purchase-related opens, animates or changes within 2 s of a Find reveal, a set completion or an area completion.",
      "closedBy": "theme/tone/03 beat map B1-B3 + gameplay/mechanics/05",
      "check": "no purchase-related instance or string exists at all, so no code path can reach the reveal or completion channels"
    },
    {
      "id": "F15",
      "rule": "No code entry field, and no like, favourite, follow, group-join, rate-us or share prompt, anywhere in the game.",
      "closedBy": "03-META.md priority 3 (codes) + theme/tone/04 D10",
      "check": "zero TextBox instances in any screen; zero strings match /code|group|favou?rite|follow|rate us|share/i"
    },
    {
      "id": "F16",
      "rule": "No verb behind a paywall. move, look, jump, buy and openIndex all work with zero products owned.",
      "closedBy": "gameplay/mechanics/02",
      "check": "all five verbs function in a session with zero passes owned"
    },
    {
      "id": "F17",
      "rule": "No purchase may shorten, skip, auto-complete or bypass clearing work: no instant-clear, no auto-clear, no area skip, no completion grant.",
      "closedBy": "03-META.md (never content access) + theme/fantasy/03 C3",
      "check": "no product clears a patch, completes an area, or grants a Find; 24/24 is reachable owning zero products"
    },
    {
      "id": "F18",
      "rule": "No subscription, no recurring charge, and no benefit gated on Roblox Premium membership.",
      "closedBy": "gameplay/systems/06 (nothing timed or expiring) + 03-META.md (never content access)",
      "check": "zero reads of Player.MembershipType or MembershipType.Premium anywhere in the build"
    },
    {
      "id": "F19",
      "rule": "No product is named, shown, priced or referred to anywhere inside the game. R-4 leaves no surface that may mention one.",
      "closedBy": "theme/tone/04 D10 + coordinator ruling R-4",
      "check": "no products[].label and no priceRobux value appears in any string rendered by the game"
    },
    {
      "id": "F20",
      "rule": "No purchase-derived state is written to persistence. Ownership is read live every join.",
      "closedBy": "gameplay/systems/06 (recomputed from live ownership, never persisted)",
      "check": "the save payload contains no pass id, no product id and no purchase-sourced factor"
    }
  ],
  "headroom": {
    "canonical": "H1 below is the canonical form of the axis-ceiling inequality. setBonus.invariants[4] states the same bound without the 0.9 margin; H1 subsumes it and a schema author should write H1 only.",
    "H1_axisCeiling": {
      "rule": "for every axis A and every area ordinal N: ladderMax(A) * prod(setFactors on A) * prod(products.items[].factor where axis == A) <= marginFraction * ceiling(A, N)",
      "marginFraction": 0.9,
      "ladderMax": "for the entry of upgrades[] whose id equals A: base + maxLevel * perLevel",
      "ceilings": {
        "value": null,
        "radius": "plots.laneWidthStuds / 2",
        "speed": "movement.baseClearRadius / runtime.serverTickSeconds"
      },
      "atShippedValues": "radius 14.3 * 1.44 * 1.75 = 36.0 <= 0.9 * 60 = 54; speed 25.6 * 1.2 = 30.7 <= 0.9 * 45.83 = 41.25"
    },
    "H2_lapFloor": {
      "rule": "for every area ordinal N: ROUTE_SLACK * depths.areas[N-1].footprintStuds2 / tau(N) >= floorSeconds, where tau(N) is computed for a player owning EVERY product",
      "tau": "2 * (arrivalRadius(N) * prod(productFactors on radius)) * (arrivalSpeed(N) * prod(productFactors on speed))",
      "joint": "the bound below is on prod(productFactors on radius) * prod(productFactors on speed) as ONE quantity, not per axis. A radius product and a speed product each passing their own check can still break the lap together.",
      "floorSeconds": 75,
      "ceilingSeconds": 200,
      "ceilingAtRisk": false,
      "ceilingNote": "a product factor is >= 1, so it can only shorten a lap. H2 is one-sided.",
      "bindingOrdinal": 2,
      "maxThroughputProductFactorByOrdinal": {
        "1": 2.18,
        "2": 1.99,
        "3": 2.14,
        "4": 2.17,
        "5": 2.1,
        "6": 2.1,
        "7": 2.1,
        "8": 2.1
      },
      "spentByCurrentProducts": 1.75,
      "remaining": 1.14,
      "computedAtCombinedValueFactor": 1,
      "valueFactorWarning": "every bound above FALLS as combinedFactorCap.value rises, because a value product advances the greedy purchase order and raises arrival levels. At a combined value factor of 3.0 the ordinal-2 bound is 1.27, verified in wave 3. Adding any product on the value axis requires re-running the greedy purchase order against upgrades[] and re-deriving this whole table; these bounds are not valid at any other value factor."
    },
    "onFailure": "reduceFactor",
    "reduceWhich": "the factor on the axis the brief does not name as open. The brief names one open item in this domain, the premium SKU, and its shape is a radius item; so radius is reduced last.",
    "sizedLast": true,
    "clampMayAbsorbAPurchase": false,
    "lossNotice": "none"
  }
}
```

#### `upgrades` *(from gameplay/balance/01-upgrade-ladder.md)*

```json
[
  {
    "id": "value",
    "label": "Value",
    "blurb": "Each patch pays more",
    "costBase": 25,
    "costGrowth": 1.6,
    "maxLevel": 10,
    "perLevel": 0.25,
    "base": 1,
    "mode": "additive"
  },
  {
    "id": "radius",
    "label": "Reach",
    "blurb": "Clear a wider sweep as you walk",
    "costBase": 40,
    "costGrowth": 1.75,
    "maxLevel": 8,
    "perLevel": 1.1,
    "base": 5.5,
    "mode": "additive"
  },
  {
    "id": "speed",
    "label": "Pace",
    "blurb": "Move faster between patches",
    "costBase": 60,
    "costGrowth": 1.8,
    "maxLevel": 6,
    "perLevel": 1.6,
    "base": 16,
    "mode": "additive"
  }
]
```

#### `movement` *(from gameplay/mechanics/01-reach-and-pace.md)*

```json
{
  "baseWalkSpeed": 16,
  "baseClearRadius": 5.5
}
```

#### `collection` *(from gameplay/meta/02-the-collection.md)*

```json
{
  "className": "Find",
  "classPlural": "Finds",
  "relicsPerArea": 3,
  "areasPerDepth": 2,
  "sets": [
    {
      "id": "terrace",
      "label": "Terrace",
      "depth": 1,
      "relics": [
        "Sundial",
        "Ewer",
        "Hinge",
        "Tessera",
        "Stylus",
        "Bellcast"
      ]
    },
    {
      "id": "cistern",
      "label": "Cistern",
      "depth": 2,
      "relics": [
        "Sluice",
        "Weight",
        "Siphon",
        "Chain",
        "Grate",
        "Cup"
      ]
    },
    {
      "id": "vault",
      "label": "Vault",
      "depth": 3,
      "relics": [
        "Seal",
        "Ledger",
        "Coffer",
        "Key",
        "Tally",
        "Ring"
      ]
    },
    {
      "id": "spire",
      "label": "Spire",
      "depth": 4,
      "relics": [
        "Gnomon",
        "Lens",
        "Vane",
        "Crest",
        "Orrery",
        "Finial"
      ]
    }
  ]
}
```

#### `depths` *(from gameplay/meta/04-the-depth-ladder.md)*

```json
{
  "depthCount": 4,
  "areaCount": 8,
  "sizingRule": "footprint(k) = floorToChunk( min(LAP_TARGET * tau(k), LAP_CEILING * tauTol(k)) / ROUTE_SLACK ), tau(k) = 2*(baseClearRadius + radiusLevel*perLevel)*(baseWalkSpeed + speedLevel*perLevel) at arrival",
  "footprintCeilingStuds2": 73216,
  "unlockRule": "the area before it in this list is complete; nothing else conditions any area or any depth. This is a strike on theme/setting/04 W5, taken in this sheet's Pushing back.",
  "relicSliceAssignment": "each depth's set is cut into collection.areasPerDepth contiguous slices of collection.relicsPerArea names in name order; the slices are assigned to that depth's areas in an order seeded by (layoutSeed, depth), per gameplay/systems/05 discovery.theOnlyRandomQuantities[1]",
  "purchaserFloorRule": "row k is under core-loop/04's 75 s floor above tau = 2 * footprintStuds2 / 75; the product of every product factor on the radius axis must stay at or under that row's maxRadiusProduct",
  "valueOnlyPurchaserThreshold": 7,
  "areas": [
    {
      "ordinal": 1,
      "depth": 1,
      "setId": "terrace",
      "relicSliceIndex": "seeded(layoutSeed, depth)",
      "label": "East Terrace",
      "footprintStuds2": 14400,
      "chunkCount": 4,
      "patchCount": 140,
      "minSpacing": 6,
      "unlock": "none",
      "maxRadiusProduct": null
    },
    {
      "ordinal": 2,
      "depth": 1,
      "setId": "terrace",
      "relicSliceIndex": "seeded(layoutSeed, depth)",
      "label": "West Terrace",
      "footprintStuds2": 25200,
      "chunkCount": 7,
      "patchCount": 245,
      "minSpacing": 6,
      "unlock": "previousAreaComplete",
      "maxRadiusProduct": 1.27
    },
    {
      "ordinal": 3,
      "depth": 2,
      "setId": "cistern",
      "relicSliceIndex": "seeded(layoutSeed, depth)",
      "label": "East Cistern",
      "footprintStuds2": 39600,
      "chunkCount": 11,
      "patchCount": 407,
      "minSpacing": 6,
      "unlock": "previousAreaComplete",
      "maxRadiusProduct": 1.44
    },
    {
      "ordinal": 4,
      "depth": 2,
      "setId": "cistern",
      "relicSliceIndex": "seeded(layoutSeed, depth)",
      "label": "West Cistern",
      "footprintStuds2": 50400,
      "chunkCount": 14,
      "patchCount": 518,
      "minSpacing": 6,
      "unlock": "previousAreaComplete",
      "maxRadiusProduct": 1.84
    },
    {
      "ordinal": 5,
      "depth": 3,
      "setId": "vault",
      "relicSliceIndex": "seeded(layoutSeed, depth)",
      "label": "East Vault",
      "footprintStuds2": 57600,
      "chunkCount": 16,
      "patchCount": 624,
      "minSpacing": 6,
      "unlock": "previousAreaComplete",
      "maxRadiusProduct": 2.1
    },
    {
      "ordinal": 6,
      "depth": 3,
      "setId": "vault",
      "relicSliceIndex": "seeded(layoutSeed, depth)",
      "label": "West Vault",
      "footprintStuds2": 57600,
      "chunkCount": 16,
      "patchCount": 624,
      "minSpacing": 6,
      "unlock": "previousAreaComplete",
      "maxRadiusProduct": 2.1
    },
    {
      "ordinal": 7,
      "depth": 4,
      "setId": "spire",
      "relicSliceIndex": "seeded(layoutSeed, depth)",
      "label": "East Spire",
      "footprintStuds2": 57600,
      "chunkCount": 16,
      "patchCount": 640,
      "minSpacing": 6,
      "unlock": "previousAreaComplete",
      "maxRadiusProduct": 2.1
    },
    {
      "ordinal": 8,
      "depth": 4,
      "setId": "spire",
      "relicSliceIndex": "seeded(layoutSeed, depth)",
      "label": "West Spire",
      "footprintStuds2": 57600,
      "chunkCount": 16,
      "patchCount": 640,
      "minSpacing": 6,
      "unlock": "previousAreaComplete",
      "maxRadiusProduct": 2.1
    }
  ],
  "requestedRevisions": [
    {
      "sheet": "cid/gameplay/meta/02-the-collection.md",
      "change": "relicsPerArea 6 -> 3, areasPerDepth 1 -> 2",
      "reason": "areas at one depth partition that depth's set (gameplay/systems/05); 3 x 2 = 6 is the pair theme/fantasy/02 criterion 1 names"
    },
    {
      "sheet": "cid/theme/setting/04-permanence-and-passage.md",
      "change": "strike W5; keep W1-W4 and W6",
      "reason": "the inward opening is passable only when the part is finished; this sheet and meta/06 take the strike that sheet itself names"
    }
  ],
  "invariants": [
    "areas[0].footprintStuds2 == area.size ^ 2 and areas[0].patchCount == area.patchCount and areas[0].minSpacing == area.minSpacing",
    "count of areas at each depth == collection.areasPerDepth; this key does not carry that number",
    "collection.relicsPerArea * collection.areasPerDepth == the size of every set",
    "the resolved slices of one depth's areas partition that set with no overlap and no gap",
    "footprintStuds2 is a whole multiple of layout.chunk.footprintStuds2 and equals chunkCount times it",
    "patchCount == chunkCount * layout.patchesPerChunkByDepth[depth]",
    "patchCount / footprintStuds2 is non-decreasing in ordinal and strictly increases at every depth step",
    "minSpacing > movement.baseClearRadius",
    "footprintStuds2 <= footprintCeilingStuds2 for every row",
    "lapSeconds(k) = footprintStuds2(k) / tau(k) * ROUTE_SLACK is inside 75..200 for every row, both at arrival and one upgrade level behind arrival on both throughput axes",
    "patchCount <= lapSeconds(k) / (2 * runtime.clearTickRate)",
    "the product of every products[].factor on the radius axis is at most maxRadiusProduct for every row"
  ]
}
```

#### `discovery` *(from gameplay/systems/05-the-find-ledger.md)*

```json
{
  "pool": {
    "scope": "per player, per depth",
    "source": "collection.sets[depth].relics",
    "replacement": "without",
    "areasPartitionTheSet": true,
    "invariant": "collection.relicsPerArea * collection.areasPerDepth == collection.sets[depth].relics.length",
    "invariantHoldsToday": "6 * 1 == 6; this rule changes no shipped behaviour at current values",
    "placementIsPlayerIndependent": true,
    "placementRule": "the layout seed alone picks which patch indices carry a Find; the area's slice fills those slots in order. Neither the player's found set nor cleared set is an input to placement.",
    "placementDomain": "uncleared patches only — derived, not filtered: clearing a patch reveals its Find, so an unfound Find's slot is never a cleared patch",
    "stableAcrossRejoin": true,
    "exclusionKey": "ever-found; it governs what a slot yields, never where a slot is",
    "spatialDistribution": "content-structure work's, not decided here",
    "tierWeighting": "none, per the rarity key",
    "guaranteedException": "onboarding's first Find sits on the patch nearest the plot origin, from the same seed, and consumes the first slot of depth 1's slice"
  },
  "record": {
    "keyedBy": "the Find's name, from collection.sets[].relics[].name",
    "entries": "sum(collection.sets[].relics.length)",
    "fields": [
      {
        "name": "found",
        "type": "boolean",
        "default": false,
        "persisted": true,
        "writtenBy": "server, at the instant the hiding patch clears",
        "clearedBy": "nothing, ever"
      }
    ],
    "derived": [
      "foundCount = the number of true entries",
      "setComplete(setId) = every name in that set is true",
      "collectionComplete = every name in collection is true",
      "newThisSession = compared against a snapshot taken at join, held in memory, never saved"
    ],
    "forbiddenFields": [
      "count",
      "duplicates",
      "timesFound",
      "timestamp",
      "foundAt",
      "depthFoundAt",
      "condition",
      "quality",
      "variant",
      "restoredLevel",
      "favourite",
      "seen",
      "isNew",
      "equipped",
      "sortIndex",
      "tradeable"
    ],
    "growth": "one boolean per name in collection, and nothing else; the record never grows with play"
  },
  "repeat": {
    "possible": false,
    "cause": "only a layout that assigns a name outside its area's slice, which is a build defect and not a game state",
    "runtimeBehaviour": "the patch hides nothing, the server logs a warning naming the Find and the patch index, the reveal channel does not fire",
    "silentDiscardRatified": false,
    "playerFacing": "nothing, and no player can reach this branch; it is a defect path, not the silent duplicate case core-loop/03 forbids"
  },
  "luckShaped": false,
  "luckShapedDetail": "the partition is fixed and placement is seed-derived, so the SET of Finds a depth yields is fully determined. There is no drop rate, so there is no rate for a multiplier to act on.",
  "theOnlyRandomQuantities": [
    "which patch indices the seed picks to carry a slice",
    "the order in which a depth's slices are assigned to its areas"
  ],
  "sellableLuck": null,
  "persistenceRequirement": "one boolean per name in collection and nothing else; the one part of save data bounded by design rather than by collapse"
}
```

#### `area` *(from gameplay/meta/01-the-area.md)*

```json
{
  "id": "east-terrace",
  "label": "East Terrace",
  "originXZ": [
    0,
    0
  ],
  "size": 120,
  "patchCount": 140,
  "minSpacing": 6
}
```

#### `runtime` *(from 01-runtime.md)*

```json
{
  "clearTickRate": 0.12,
  "saveIntervalSeconds": 45,
  "respawnDelaySeconds": 3,
  "dataStoreName": "ArgaRuin_v2",
  "layoutSeed": 20260801,
  "maxPlayers": 16,
  "placeConfiguration": {
    "maxPlayers": {
      "value": 16,
      "band": "social.maxPlayers, 12 to 20",
      "setVia": "place configuration — Players.MaxPlayers is read-only from a script and no module may write it",
      "ownedBy": "whoever publishes the place",
      "assertedBy": "world.configure(), which READS Players.MaxPlayers at boot and warns naming this key when it is outside the band"
    },
    "nothingElseIsPlaceConfiguration": "every other decision in social — collision groups, chat, plot access, the forbidden APIs — is executed by world.configure() at runtime. maxPlayers is the only one that is not, and it is the only entry in this block."
  },
  "storeVersionHistory": {
    "ArgaRuin_v1": "wave-1 shape: areaComplete boolean, single-area cleared set, no rowsRevealed. No reader is written; nothing shipped to players.",
    "ArgaRuin_v2": "current. areasFinished integer, live-area cleared set, rowsRevealed."
  }
}
```

#### `interfaces (yours and your dependencies')`

```json
[
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
      {
        "name": "upgrade",
        "type": "UpgradeDef",
        "note": "one entry of GameConfig.Upgrades, the table itself and not its id"
      },
      {
        "name": "level",
        "type": "integer",
        "meaning": "the level the player currently HOLDS, not the level being bought. The price of the first purchase is upgradeCost(def, 0) and equals def.costBase. The price of moving from level 3 to 4 is upgradeCost(def, 3)."
      }
    ],
    "returns": "integer — floor(costBase * costGrowth ^ level)",
    "note": "Generated. Do not reimplement the curve anywhere else. A purchase is legal only while the held level is strictly below def.maxLevel, so the highest price ever charged is upgradeCost(def, maxLevel - 1). firstSession.withheld.upgradeRow lifts row i when the balance reaches upgradeCost(def_i, 0), which is the same call with the same convention."
  },
  {
    "module": "config",
    "fn": "upgradeEffect(upgrade, level)",
    "params": [
      {
        "name": "upgrade",
        "type": "UpgradeDef",
        "note": "needs base, perLevel and mode"
      },
      {
        "name": "level",
        "type": "integer",
        "meaning": "the level currently HELD, same convention as upgradeCost. Effect at level 0 is def.base, which is the pre-upgrade value: 5.5 studs for radius, 16 for speed, 1.0 for value."
      }
    ],
    "returns": "number — base + perLevel * level when mode is \"additive\", base * perLevel ^ level when mode is \"compounding\"",
    "note": "STEP 1 OF modifiers.resolutionOrder, and the only place the additive-versus-compounding question is answered. modifiers.axes[].baseFrom says of all three axes that the base is 'already inside upgradeEffect', and modifiers.baseIsNotAppliedTwice forbids multiplying it in again — so modifiers.effective calls this ONCE and multiplies FACTORS onto its result. All three shipped upgrades are additive today, which is exactly why hand-inlining looks harmless and would silently ignore a future compounding axis."
  },
  {
    "module": "config",
    "fn": "tierByWeight(roll)",
    "params": [
      {
        "name": "roll",
        "type": "number",
        "meaning": "a uniform sample in [0, 1). Not a weight, not a tier index, and not pre-scaled by the weight total — the function scales it. It must come from layout's seeded stream; rarity.ladders[overgrowth-tier].rolled is true and rolledFrom is tiers[].weight."
      }
    ],
    "returns": "(integer, TierDef) — the 1-based index into GameConfig.Tiers, then the tier table",
    "note": "The integer is what goes into Patch.tierIndex; the table is for reading value, height and shape at the point of use. Storing the table in a Patch instead of the index is forbidden by 03-state-shape: re-emitting the config would leave stale names in live patches. rarity.depthRarityChannel wants these weights shifted toward the rare end per depth and rarity.depthRarityBlocker says tiers has no depth dimension, so there is ONE weight table for all four depths and adding a second is a revision to the tiers sheet, not a branch here."
  },
  {
    "module": "modifiers",
    "fn": "effective(state, axis)",
    "params": [
      {
        "name": "state",
        "type": "PlayerState",
        "note": "read for upgrades, found and owned, and written never. This function is pure."
      },
      {
        "name": "axis",
        "type": "string",
        "note": "exactly one of \"value\", \"radius\", \"speed\". modifiers.axisIdsJoinUpgrades: axes[].id is upgrades[].id verbatim, and 'Pace is a label and never an id'. Any other string is an error, not a fallback."
      }
    ],
    "returns": "number — the axis's effective value: a multiplier for value, studs for radius, studs per second for speed",
    "note": "THE ONE IMPLEMENTATION — modifiers.singleDefinition. modifiers.composition writes it out: clamp(upgradeEffect(axis, heldLevel) * PROD(setFactors(axis)) * PROD(purchaseFactors(axis)), ceilingRule). FOUR STEPS, IN modifiers.resolutionOrder AND IN NO OTHER ORDER: (1) config.upgradeEffect(def, state.upgrades[axis] or 0) — this ALREADY CONTAINS upgrades[axis].base and modifiers.baseIsNotAppliedTwice forbids multiplying it in again; (2) multiply by every set factor on this axis, for every set in collection.sets whose six names are all true in state.found, in collection declaration order — setBonus.rows says WHICH axis each set targets and setBonus.invariants forbids a row carrying a magnitude, so an absent factor is 1.0 and modifiers warns once at boot naming the four sets, WHICH MEANS A COMPLETED SET CURRENTLY CHANGES NOTHING; (3) multiply by products.items[].factor for every item whose axis matches and whose id is true in state.owned, in offer-ladder order — every gamePassId is null today so this step is currently empty too; (4) clamp ONCE against ceiling(axis, state.areasFinished + 1), never between two sources — modifiers.clampApplication. Derives set completion from state.found on EVERY CALL and caches nothing: modifiers.sources[set-completion].storage is 'derived from discovery.record at every read; never latched, never persisted', which is why there is no setsComplete field to go stale. Never yields. Never writes. Called by clearing (radius and value, every tick), by server-main (speed, on spawn and after a purchase) and by tool (radius, on spawn and after a purchase), and by no client module."
  },
  {
    "module": "modifiers",
    "fn": "ceiling(axis, areaOrdinal)",
    "params": [
      {
        "name": "axis",
        "type": "string",
        "note": "\"value\", \"radius\" or \"speed\""
      },
      {
        "name": "areaOrdinal",
        "type": "integer",
        "meaning": "the 1-based area ordinal the ceiling is being evaluated for — state.areasFinished + 1 at every live call site. It is a parameter because modifiers.axes[radius].ceilingRule is 'effective < area.size / 2' and products.headroom.ceilings.radius is 'min over depths of (area.size(N) / 2)', so the rule is per area even though every area is the same lane width today."
      }
    ],
    "returns": "number? — the ceiling for that axis, or nil when the axis has none",
    "note": "modifiers.axes[value].ceilingRule is null with the reason 'a currency multiplier breaks no invariant', so this returns nil for value and the clamp is skipped. radius: area.size / 2 = 60, which is plots.laneWidthStuds / 2 and the same number by both routes — beyond it 'one position clears the whole area and a lap stops existing'. speed: movement.baseClearRadius / runtime.clearTickRate = 5.5 / 0.12 = 45.83 — beyond it 'the player outruns the tool between ticks and patches are never cleared'. Also the input to the boot-time headroom assertion: products.headroom.rule requires ladderMax(A) * every set factor * every product factor to stay at or below products.headroom.marginFraction (0.9) times this, for every axis and every depth, and products.headroom.clampMayAbsorbAPurchase is false — so a configuration where the clamp would eat a purchased factor is a boot-time warning, not a silent flatline."
  }
]
```

### Done when

1. effective(state, axis) at every level 0, with no set complete and no product owned, equals upgrades[axis].base — 1 for value, movement.baseClearRadius for radius, movement.baseWalkSpeed for speed
2. there is exactly one arithmetic expression in game/src that multiplies a set factor or a purchase factor; `grep -rn 'combinedFactorCap\|setFactor\|purchaseFactor' game/src` matches this file only
3. for every axis, ladderMax * every set factor * every purchase factor is at most products.headroom.marginFraction (0.9) times ceiling(axis, 8), asserted once at boot and warned by name on failure
4. effective('radius') never reaches ceiling('radius', k) for any k, and effective('speed') * runtime.clearTickRate never exceeds movement.baseClearRadius
5. a player owning zero products and holding zero levels is playable and every axis is at its base — products.F16 and F8
6. completing a set changes effective on that set's axis on the very next read, with nothing written to state and nothing saved

---

## 5. `pressables` — client

**Write to:** `game/src/client/Pressables.luau`

**Owns:** Create and maintain the four game-drawn pressables, and report an activation. THE ONE MODULE IN THIS BUILD THAT AUTHORS UI STRUCTURE, and it authors exactly four buttons.

**Depends on:** `config`

### Must expose

- `bind(gui, onActivate)`

### Must not

- creating any Instance other than the four buttons representation names and their text labels. This module exists because ui-forge's hud-overlay pattern ships no pressable readout, and its scope is that gap and nothing wider
- adding a fifth pressable, or a pressable for a verb input does not declare. input.closed is true, gameDrawnPressables is 4, and input.pressable.roles is three purchase and one index
- requiring a hold or a chord. input.pressable.holdRequired and chordRequired are both false, and activationsPerPress is 1
- making a keyboard accelerator the only way to press one. input.pressable.keyboardAcceleratorAllowed is true and keyboardAcceleratorRequired is FALSE — the shipped Enum.KeyCode.One/Two/Three binding is superseded and may exist only as an accelerator alongside the button
- sizing a button below input.pressable.minTouchTargetRule (not smaller than the platform jump button) or overlapping a platform control region — input.pressable.mayOverlapPlatformControlRegions is false
- showing a rejection cue on a failed precondition. input.pressable.rejectionCueOnFailedPrecondition is 'none' and input.verbs[buy].onPreconditionFail is silentNoOp
- signalling affordability by colour alone, or naming a product anywhere — products.F19

### Values

#### `input` *(from gameplay/mechanics/02-verb-roster.md)*

```json
{
  "closed": true,
  "gameBoundInputClasses": [
    "pressable"
  ],
  "gameDrawnPressables": 4,
  "travelRequiredToPurchase": "none",
  "clientOriginatedRemotes": [
    "RequestState",
    "BuyUpgrade"
  ],
  "clientRemotesFiredByPlayerInput": [
    "BuyUpgrade"
  ],
  "verbs": [
    {
      "id": "move",
      "trigger": "platformMovementControl",
      "boundByGame": false,
      "kind": "continuousDirectional",
      "precondition": "characterSpawned",
      "adjudicatedBy": "client",
      "devices": [
        "touch",
        "keyboard",
        "gamepad"
      ]
    },
    {
      "id": "look",
      "trigger": "platformCameraControl",
      "boundByGame": false,
      "kind": "continuousFreeLook",
      "precondition": "none",
      "adjudicatedBy": "client",
      "devices": [
        "touch",
        "keyboard",
        "gamepad"
      ]
    },
    {
      "id": "jump",
      "trigger": "platformJumpControl",
      "boundByGame": false,
      "kind": "discreteImpulse",
      "precondition": "onGround",
      "adjudicatedBy": "client",
      "devices": [
        "touch",
        "keyboard",
        "gamepad"
      ]
    },
    {
      "id": "buy",
      "trigger": "gamePressable",
      "pressableRole": "purchase",
      "boundByGame": true,
      "kind": "discreteSelect",
      "precondition": "balance >= cost && level < maxLevel",
      "onPreconditionFail": "silentNoOp",
      "adjudicatedBy": "server",
      "devices": [
        "touch",
        "keyboard",
        "gamepad"
      ]
    },
    {
      "id": "openIndex",
      "trigger": "gamePressable",
      "pressableRole": "index",
      "boundByGame": true,
      "kind": "discreteSelect",
      "precondition": "none",
      "adjudicatedBy": "client",
      "devices": [
        "touch",
        "keyboard",
        "gamepad"
      ]
    }
  ],
  "pressable": {
    "roles": [
      {
        "role": "purchase",
        "count": 3,
        "boundTo": "upgrades declaration order",
        "adjudicatedBy": "server",
        "persistent": true
      },
      {
        "role": "index",
        "count": 1,
        "adjudicatedBy": "client",
        "persistent": true
      }
    ],
    "activationsPerPress": 1,
    "debounceSeconds": 0.35,
    "holdRequired": false,
    "chordRequired": false,
    "rejectionCueOnFailedPrecondition": "none",
    "affordabilityByColourAlone": false,
    "minTouchTargetRule": "notSmallerThanPlatformJumpButton",
    "mayOverlapPlatformControlRegions": false,
    "gamepadSelectable": true,
    "keyboardAcceleratorAllowed": true,
    "keyboardAcceleratorRequired": false,
    "indexScreenSuspendsMovement": true
  },
  "worldObjectsTriggeringAVerb": 0
}
```

#### `upgrades` *(from gameplay/balance/01-upgrade-ladder.md)*

```json
[
  {
    "id": "value",
    "label": "Value",
    "blurb": "Each patch pays more",
    "costBase": 25,
    "costGrowth": 1.6,
    "maxLevel": 10,
    "perLevel": 0.25,
    "base": 1,
    "mode": "additive"
  },
  {
    "id": "radius",
    "label": "Reach",
    "blurb": "Clear a wider sweep as you walk",
    "costBase": 40,
    "costGrowth": 1.75,
    "maxLevel": 8,
    "perLevel": 1.1,
    "base": 5.5,
    "mode": "additive"
  },
  {
    "id": "speed",
    "label": "Pace",
    "blurb": "Move faster between patches",
    "costBase": 60,
    "costGrowth": 1.8,
    "maxLevel": 6,
    "perLevel": 1.6,
    "base": 16,
    "mode": "additive"
  }
]
```

#### `firstSession` *(from gameplay/onboarding/02-first-minute-beats.md)*

```json
{
  "armDistanceStuds": 2,
  "armScope": "perCharacterSpawn",
  "armMeasuredOn": "server, horizontal XZ displacement of the character root from the plot spawn pivot",
  "ceilings": {
    "secondsToFirstClear": {
      "max": 3,
      "measuredFrom": "firstInput",
      "population": "all run-1 sessions in which any input occurred"
    },
    "secondsToFirstReveal": {
      "max": 10,
      "measuredFrom": "join",
      "population": "run-1 sessions whose first input arrived by second 5.0"
    }
  },
  "placement": {
    "ordering": "patches sorted ascending by XZ distance from the plot spawn point",
    "firstFindOrdinal": 1,
    "secondFindOrdinalMin": 8,
    "secondFindOrdinalMax": 40,
    "tierContrastWithinFirstOrdinals": 20,
    "spawnToNearestPatchMaxStuds": 3.5,
    "spawnToNearestPatchFormula": "movement.baseClearRadius - firstSession.armDistanceStuds"
  },
  "firstPurchaseBand": {
    "appliesTo": "the cheapest upgrade's level-1 cost",
    "minPatchesOfClearing": 10,
    "maxSecondsOfClearing": 60,
    "atStats": "base"
  },
  "beats": [
    {
      "id": "spawn",
      "bySecond": 0,
      "from": "join",
      "precondition": "character loaded and pivoted to the plot spawn point",
      "guaranteedOutcome": "stands inside standing overgrowth, tool welded and visible, at least one standing patch inside movement.baseClearRadius, clearedCount 0",
      "teaches": null
    },
    {
      "id": "firstClear",
      "bySecond": 3,
      "from": "firstInput",
      "precondition": "armed: horizontal displacement from the spawn pivot has exceeded armDistanceStuds at least once this character life",
      "guaranteedOutcome": "at least one patch clears and credits currency on the same server tick",
      "teaches": [
        "contactClearing",
        "currency"
      ]
    },
    {
      "id": "firstReveal",
      "bySecond": 10,
      "from": "join",
      "precondition": "firstClear fired on the patch carrying the placed Find",
      "guaranteedOutcome": "exactly one Find is revealed and enters the collection permanently",
      "teaches": [
        "theFind"
      ]
    },
    {
      "id": "firstOrdinaryClear",
      "bySecond": 15,
      "from": "join",
      "testRange": [
        10,
        25
      ],
      "precondition": "firstReveal has fired",
      "guaranteedOutcome": "at least three patches clear with no reveal",
      "teaches": [
        "theFind"
      ]
    },
    {
      "id": "tierContrast",
      "bySecond": 45,
      "from": "join",
      "testRange": [
        25,
        75
      ],
      "precondition": "the first 20 patches by spawn-distance ordinal hold at least two distinct tierIndex values",
      "guaranteedOutcome": "two clears with different currency credits and different silhouettes",
      "teaches": null
    },
    {
      "id": "firstSpendAffordable",
      "bySecond": 60,
      "from": "join",
      "testRange": [
        40,
        120
      ],
      "awaitingValue": "upgrades[].costBase",
      "precondition": "balance has reached the cheapest upgrade's level-1 cost",
      "guaranteedOutcome": "the cheapest upgrade row lifts and the player holds enough to buy it",
      "teaches": [
        "upgradeAxes"
      ]
    }
  ],
  "teaching": [
    {
      "concept": "contactClearing",
      "taughtBy": "beat:firstClear",
      "byBeat": "firstClear",
      "evidence": "five or more clears in the 15 s after the first, with no input gap over 3 s",
      "required": true
    },
    {
      "concept": "currency",
      "taughtBy": "beat:firstClear",
      "byBeat": "firstClear",
      "evidence": "the currency readout is non-zero and rising while the player moves",
      "required": false
    },
    {
      "concept": "theFind",
      "taughtBy": "beat:firstReveal, corrected by beat:firstOrdinaryClear",
      "byBeat": "firstOrdinaryClear",
      "evidence": "the player keeps clearing new ground after firstOrdinaryClear rather than re-walking the reveal site",
      "required": false
    },
    {
      "concept": "upgradeAxes",
      "taughtBy": "beat:firstSpendAffordable",
      "byBeat": "firstSpendAffordable",
      "evidence": "a first purchase occurs in session 1",
      "required": false
    },
    {
      "concept": "areaCompletion",
      "taughtBy": "the area progress readout moving, and the standing/cleared edge",
      "byBeat": "minute:5",
      "testRange": [
        3,
        8
      ],
      "evidence": "cleared fraction at session end exceeds the fraction at first sight of the readout",
      "required": false
    },
    {
      "concept": "sets",
      "taughtBy": "the collection surface showing one filled slot in a labelled group of six",
      "byBeat": "firstReveal+60s",
      "testRange": [
        30,
        180
      ],
      "evidence": "the collection surface is opened at least once in session 1",
      "required": false
    },
    {
      "concept": "depth",
      "taughtBy": "entering a second area through an opening that needs no explanation",
      "byBeat": "minute:6",
      "testRange": [
        3,
        12
      ],
      "evidence": "a second area is entered in session 1",
      "required": false
    }
  ],
  "neverTaught": [
    "rebirth",
    "offlineAccrual",
    "findRarity",
    "discoveryRate",
    "duplicates",
    "failure",
    "anyControl",
    "codesDailiesLeaderboardsTrading"
  ],
  "tutorialDevicesForbidden": [
    "imperativeString",
    "tipHintHowToPlayObjectiveGoalString",
    "pointerArrowChevronBeamWaypointOutlineHighlight",
    "ghostedOrPulsingControlGlyph",
    "firstRunOnlyString",
    "unrequestedModalPanelOrOverlay",
    "countdownOrTutorialChecklist",
    "voiceOverOrSpokenLine",
    "welcomeOrWelcomeBackString",
    "stringNamingAControl",
    "uncausedCameraMoveZoomOrReframe",
    "promptingSound"
  ],
  "withheld": [
    {
      "surface": "collectionCount",
      "presentAtJoin": true,
      "liftedBy": null,
      "latched": false,
      "joinValue": "0"
    },
    {
      "surface": "collectionDenominator",
      "presentAtJoin": false,
      "liftedBy": "beat:firstReveal",
      "latched": true,
      "latchSource": "the collection map is non-empty",
      "newSaveFields": 0
    },
    {
      "surface": "currencyReadout",
      "presentAtJoin": true,
      "liftedBy": null,
      "latched": false,
      "joinValue": "0"
    },
    {
      "surface": "upgradeRow",
      "perRow": true,
      "presentAtJoin": false,
      "liftedBy": "balance has reached upgrades[i] level-1 cost",
      "latched": true,
      "latchSource": "one persisted boolean per row",
      "newSaveFields": 3
    },
    {
      "surface": "areaProgress",
      "presentAtJoin": true,
      "liftedBy": null,
      "latched": false,
      "joinValue": "0%"
    },
    {
      "surface": "collectionPanel",
      "presentAtJoin": false,
      "liftedBy": "beat:firstReveal",
      "latched": true,
      "latchSource": "the collection map is non-empty",
      "newSaveFields": 0
    }
  ],
  "suppressionForbidden": [
    "padlockOrLockGlyph",
    "greyedOrDimmedRow",
    "questionMarkPlaceholder",
    "unknownDenominatorForm",
    "explanatoryTooltip",
    "liftAnimation",
    "liftSound",
    "newBadgeOrDot",
    "reSuppression",
    "unrevealedFindsInCount",
    "percentFormOfCollectionCount",
    "reflowOnLift"
  ],
  "permittedConfusion": [
    "patchTier",
    "costGrowth",
    "depthMeaning",
    "setBonus",
    "collectionEnd",
    "otherPlayersAreReal",
    "persistence",
    "absenceOfRebirthAndIdle"
  ]
}
```

#### `interfaces (yours and your dependencies')`

```json
[
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
      {
        "name": "upgrade",
        "type": "UpgradeDef",
        "note": "one entry of GameConfig.Upgrades, the table itself and not its id"
      },
      {
        "name": "level",
        "type": "integer",
        "meaning": "the level the player currently HOLDS, not the level being bought. The price of the first purchase is upgradeCost(def, 0) and equals def.costBase. The price of moving from level 3 to 4 is upgradeCost(def, 3)."
      }
    ],
    "returns": "integer — floor(costBase * costGrowth ^ level)",
    "note": "Generated. Do not reimplement the curve anywhere else. A purchase is legal only while the held level is strictly below def.maxLevel, so the highest price ever charged is upgradeCost(def, maxLevel - 1). firstSession.withheld.upgradeRow lifts row i when the balance reaches upgradeCost(def_i, 0), which is the same call with the same convention."
  },
  {
    "module": "config",
    "fn": "upgradeEffect(upgrade, level)",
    "params": [
      {
        "name": "upgrade",
        "type": "UpgradeDef",
        "note": "needs base, perLevel and mode"
      },
      {
        "name": "level",
        "type": "integer",
        "meaning": "the level currently HELD, same convention as upgradeCost. Effect at level 0 is def.base, which is the pre-upgrade value: 5.5 studs for radius, 16 for speed, 1.0 for value."
      }
    ],
    "returns": "number — base + perLevel * level when mode is \"additive\", base * perLevel ^ level when mode is \"compounding\"",
    "note": "STEP 1 OF modifiers.resolutionOrder, and the only place the additive-versus-compounding question is answered. modifiers.axes[].baseFrom says of all three axes that the base is 'already inside upgradeEffect', and modifiers.baseIsNotAppliedTwice forbids multiplying it in again — so modifiers.effective calls this ONCE and multiplies FACTORS onto its result. All three shipped upgrades are additive today, which is exactly why hand-inlining looks harmless and would silently ignore a future compounding axis."
  },
  {
    "module": "config",
    "fn": "tierByWeight(roll)",
    "params": [
      {
        "name": "roll",
        "type": "number",
        "meaning": "a uniform sample in [0, 1). Not a weight, not a tier index, and not pre-scaled by the weight total — the function scales it. It must come from layout's seeded stream; rarity.ladders[overgrowth-tier].rolled is true and rolledFrom is tiers[].weight."
      }
    ],
    "returns": "(integer, TierDef) — the 1-based index into GameConfig.Tiers, then the tier table",
    "note": "The integer is what goes into Patch.tierIndex; the table is for reading value, height and shape at the point of use. Storing the table in a Patch instead of the index is forbidden by 03-state-shape: re-emitting the config would leave stale names in live patches. rarity.depthRarityChannel wants these weights shifted toward the rare end per depth and rarity.depthRarityBlocker says tiers has no depth dimension, so there is ONE weight table for all four depths and adding a second is a revision to the tiers sheet, not a branch here."
  },
  {
    "module": "pressables",
    "fn": "bind(gui, onActivate)",
    "params": [
      {
        "name": "gui",
        "type": "ScreenGui",
        "note": "the HUD ScreenGui client-main created. The four buttons are parented inside it."
      },
      {
        "name": "onActivate",
        "type": "(role: string, index: number) -> ()",
        "note": "called on an ACCEPTED press. role is \"purchase\" or \"index\", exactly the two entries of input.pressable.roles. For \"purchase\", index is the 1-based position in GameConfig.Upgrades — input.pressable.roles[purchase].boundTo is 'upgrades declaration order', so 1 is Value, 2 is Reach, 3 is Pace. For \"index\", it is always 1. THIS ARGUMENT IS THE SEAM THAT REPLACES Enum.KeyCode.One: the button decides that a press happened, input decides what it means."
      }
    ],
    "returns": "(snapshot) -> () — an updater the caller invokes with every snapshot",
    "note": "THE ONE FUNCTION IN THIS BUILD THAT AUTHORS UI STRUCTURE, and it authors exactly four TextButtons — input.gameDrawnPressables is 4 and input.pressable.roles is three purchase plus one index. It exists because ui-forge's hud-overlay pattern ships no pressable readout; that is a default rather than an incapability, and the day it grows one this function resolves four node names instead of creating four Instances, with no other change anywhere. Names, sizes and properties are fixed in representation under `pressable`. RULES, ALL FROM input.pressable: one activation per press (activationsPerPress 1) with a 0.35 s debounce; no hold and no chord (holdRequired false, chordRequired false); NO REJECTION CUE when the precondition fails (rejectionCueOnFailedPrecondition 'none', and input.verbs[buy].onPreconditionFail is silentNoOp) — an unaffordable press does nothing, shows nothing and plays nothing; not smaller than the platform jump button (minTouchTargetRule) and never overlapping a platform control region (mayOverlapPlatformControlRegions false); gamepad-selectable; a keyboard accelerator is ALLOWED and NOT REQUIRED, so 1/2/3 may exist beside the buttons and may never be the only path. The updater applies affordability — by text and not by colour alone — and row visibility from snapshot.rowsRevealed, appearing a button without moving the other three (firstSession.suppressionForbidden bans reflowOnLift). Both roles are persistent: the buttons are created once and survive a respawn."
  }
]
```

### Done when

1. four buttons exist after bind and no more, three bound to upgrades in declaration order (input.pressable.roles[purchase].boundTo) and one to the index
2. a purchase press produces exactly one activation, and pressing again within input.pressable.debounceSeconds (0.35) produces none
3. every button is reachable by touch, by mouse, by gamepad selection (input.pressable.gamepadSelectable) and, optionally, by a keyboard accelerator
4. no button is smaller than the platform jump button on a phone, and none overlaps the movement or jump control region
5. pressing buy with an unaffordable balance does nothing, shows nothing and plays nothing
6. a row hidden by firstSession.withheld.upgradeRow has no button, and the button appears the instant the row lifts without moving the other three

---

## 6. `progression` — server

**Write to:** `game/src/server/Progression.luau`

**Owns:** Own the balance, the held upgrade levels and the purchase decision. The one sink and the one faucet's credit both land here.

**Depends on:** `config`

### Must expose

- `award(state, amount): number`
- `tryBuy(state, upgradeId): boolean`
- `revealRows(state)`

### Must not

- computing an effective value. clearRadius, walkSpeed and valueMultiplier used to live here and are now modifiers.effective(state, axis); a second implementation is what modifiers.singleDefinition forbids
- trusting a client-supplied cost, level or amount — economy.authority
- allowing a balance below zero, or a partial purchase. economy.negativeBalance is 'impossible; a purchase that cannot be afforded changes nothing at all' and economy.sinks[0].onInsufficientFunds says nothing is deducted
- crediting currency for anything but a patch clear. economy.faucetCount is 1 and every entry in economy.zeroCreditEvents credits 0 — including purchase, which is why no code path converts Robux to currency
- clearing a rowsRevealed flag. firstSession.suppressionForbidden lists reSuppression; the lift is latched forever
- capping the balance. economy.balanceCap is null and economy.atMaxLadder.balanceFrozen is false

### Values

#### `upgrades` *(from gameplay/balance/01-upgrade-ladder.md)*

```json
[
  {
    "id": "value",
    "label": "Value",
    "blurb": "Each patch pays more",
    "costBase": 25,
    "costGrowth": 1.6,
    "maxLevel": 10,
    "perLevel": 0.25,
    "base": 1,
    "mode": "additive"
  },
  {
    "id": "radius",
    "label": "Reach",
    "blurb": "Clear a wider sweep as you walk",
    "costBase": 40,
    "costGrowth": 1.75,
    "maxLevel": 8,
    "perLevel": 1.1,
    "base": 5.5,
    "mode": "additive"
  },
  {
    "id": "speed",
    "label": "Pace",
    "blurb": "Move faster between patches",
    "costBase": 60,
    "costGrowth": 1.8,
    "maxLevel": 6,
    "perLevel": 1.6,
    "base": 16,
    "mode": "additive"
  }
]
```

#### `economy` *(from gameplay/systems/04-earning-and-spending.md)*

```json
{
  "currencyKey": "currency",
  "startingBalance": 0,
  "balanceCap": null,
  "negativeBalance": "impossible; a purchase that cannot be afforded changes nothing at all",
  "authority": "server only; no client message carries a cost, an amount or a balance, and whether a client message exists at all is input's",
  "faucetCount": 1,
  "faucets": [
    {
      "id": "patch-clear",
      "trigger": "one patch transitions from standing to cleared",
      "formula": "max(payoutFloor, floor(tiers[patch.tierIndex].value * modifiers.effective('value')))",
      "perEvent": true,
      "rounding": "floor, never round-half-up",
      "multiplierAppliedOnce": "at this site only; never again inside the award function"
    }
  ],
  "payoutFloor": 1,
  "payoutFloorReason": "every clear must be a payment, because payoff frequency is measured in payments",
  "zeroCreditEvents": [
    {
      "id": "area-complete",
      "credits": 0,
      "paysInstead": "permanence: the area stays cleared and stays walkable"
    },
    {
      "id": "set-complete",
      "credits": 0,
      "paysInstead": "exactly one modifier, per the modifiers key"
    },
    {
      "id": "find-reveal",
      "credits": 0,
      "paysInstead": "one bit in the collection record, per the discovery key"
    },
    {
      "id": "session-start",
      "credits": 0,
      "paysInstead": "nothing: no welcome grant, no return grant, no offline accrual"
    },
    {
      "id": "purchase",
      "credits": 0,
      "paysInstead": "one modifier; Robux never converts to currency at any rate"
    }
  ],
  "sinkCount": 1,
  "sinks": [
    {
      "id": "upgrade-purchase",
      "debits": "the cost of the next level of one upgrade",
      "costOwner": "gameplay/balance",
      "triggerOwner": "input, via the buy verb; this key states the debit, never the verb",
      "onInsufficientFunds": "nothing changes, nothing is deducted, no partial purchase exists",
      "refundable": false
    }
  ],
  "atMaxLadder": {
    "incomeContinues": true,
    "convertsTo": null,
    "newSinkAppears": false,
    "readoutHidden": false,
    "balanceFrozen": false,
    "requirementOnBalance": "the total cost of maxing all three axes must exceed the total currency yielded by clearing the areas needed to complete the collection, so the ladder outlasts it",
    "ladderLengthBand": "that requirement is a FLOOR and core-loop/01's 90-second purchase-gap ceiling is a CEILING on the same curve. Where they conflict, the resolution is more levels at smaller steps, never a shorter ladder: a ladder that ends before the collection does leaves the only sink dead mid-game.",
    "unownedConsequence": "what the game is once the ladder and the collection are both finished belongs to content-structure work; this key states only that no currency sink appears there"
  },
  "forbidden": [
    "a second currency under any name, including a token, a mark, a point or a fragment",
    "a Robux-to-currency exchange rate, bundle or starter pack",
    "an offline, welcome-back, daily, streak or code grant",
    "a currency price on anything that is not an upgrade level",
    "a currency cost charged to enter, re-enter or leave an area",
    "a client-authored or client-trusted award of any size",
    "a payout that varies by anything other than tier and the value modifier"
  ]
}
```

#### `firstSession` *(from gameplay/onboarding/02-first-minute-beats.md)*

```json
{
  "armDistanceStuds": 2,
  "armScope": "perCharacterSpawn",
  "armMeasuredOn": "server, horizontal XZ displacement of the character root from the plot spawn pivot",
  "ceilings": {
    "secondsToFirstClear": {
      "max": 3,
      "measuredFrom": "firstInput",
      "population": "all run-1 sessions in which any input occurred"
    },
    "secondsToFirstReveal": {
      "max": 10,
      "measuredFrom": "join",
      "population": "run-1 sessions whose first input arrived by second 5.0"
    }
  },
  "placement": {
    "ordering": "patches sorted ascending by XZ distance from the plot spawn point",
    "firstFindOrdinal": 1,
    "secondFindOrdinalMin": 8,
    "secondFindOrdinalMax": 40,
    "tierContrastWithinFirstOrdinals": 20,
    "spawnToNearestPatchMaxStuds": 3.5,
    "spawnToNearestPatchFormula": "movement.baseClearRadius - firstSession.armDistanceStuds"
  },
  "firstPurchaseBand": {
    "appliesTo": "the cheapest upgrade's level-1 cost",
    "minPatchesOfClearing": 10,
    "maxSecondsOfClearing": 60,
    "atStats": "base"
  },
  "beats": [
    {
      "id": "spawn",
      "bySecond": 0,
      "from": "join",
      "precondition": "character loaded and pivoted to the plot spawn point",
      "guaranteedOutcome": "stands inside standing overgrowth, tool welded and visible, at least one standing patch inside movement.baseClearRadius, clearedCount 0",
      "teaches": null
    },
    {
      "id": "firstClear",
      "bySecond": 3,
      "from": "firstInput",
      "precondition": "armed: horizontal displacement from the spawn pivot has exceeded armDistanceStuds at least once this character life",
      "guaranteedOutcome": "at least one patch clears and credits currency on the same server tick",
      "teaches": [
        "contactClearing",
        "currency"
      ]
    },
    {
      "id": "firstReveal",
      "bySecond": 10,
      "from": "join",
      "precondition": "firstClear fired on the patch carrying the placed Find",
      "guaranteedOutcome": "exactly one Find is revealed and enters the collection permanently",
      "teaches": [
        "theFind"
      ]
    },
    {
      "id": "firstOrdinaryClear",
      "bySecond": 15,
      "from": "join",
      "testRange": [
        10,
        25
      ],
      "precondition": "firstReveal has fired",
      "guaranteedOutcome": "at least three patches clear with no reveal",
      "teaches": [
        "theFind"
      ]
    },
    {
      "id": "tierContrast",
      "bySecond": 45,
      "from": "join",
      "testRange": [
        25,
        75
      ],
      "precondition": "the first 20 patches by spawn-distance ordinal hold at least two distinct tierIndex values",
      "guaranteedOutcome": "two clears with different currency credits and different silhouettes",
      "teaches": null
    },
    {
      "id": "firstSpendAffordable",
      "bySecond": 60,
      "from": "join",
      "testRange": [
        40,
        120
      ],
      "awaitingValue": "upgrades[].costBase",
      "precondition": "balance has reached the cheapest upgrade's level-1 cost",
      "guaranteedOutcome": "the cheapest upgrade row lifts and the player holds enough to buy it",
      "teaches": [
        "upgradeAxes"
      ]
    }
  ],
  "teaching": [
    {
      "concept": "contactClearing",
      "taughtBy": "beat:firstClear",
      "byBeat": "firstClear",
      "evidence": "five or more clears in the 15 s after the first, with no input gap over 3 s",
      "required": true
    },
    {
      "concept": "currency",
      "taughtBy": "beat:firstClear",
      "byBeat": "firstClear",
      "evidence": "the currency readout is non-zero and rising while the player moves",
      "required": false
    },
    {
      "concept": "theFind",
      "taughtBy": "beat:firstReveal, corrected by beat:firstOrdinaryClear",
      "byBeat": "firstOrdinaryClear",
      "evidence": "the player keeps clearing new ground after firstOrdinaryClear rather than re-walking the reveal site",
      "required": false
    },
    {
      "concept": "upgradeAxes",
      "taughtBy": "beat:firstSpendAffordable",
      "byBeat": "firstSpendAffordable",
      "evidence": "a first purchase occurs in session 1",
      "required": false
    },
    {
      "concept": "areaCompletion",
      "taughtBy": "the area progress readout moving, and the standing/cleared edge",
      "byBeat": "minute:5",
      "testRange": [
        3,
        8
      ],
      "evidence": "cleared fraction at session end exceeds the fraction at first sight of the readout",
      "required": false
    },
    {
      "concept": "sets",
      "taughtBy": "the collection surface showing one filled slot in a labelled group of six",
      "byBeat": "firstReveal+60s",
      "testRange": [
        30,
        180
      ],
      "evidence": "the collection surface is opened at least once in session 1",
      "required": false
    },
    {
      "concept": "depth",
      "taughtBy": "entering a second area through an opening that needs no explanation",
      "byBeat": "minute:6",
      "testRange": [
        3,
        12
      ],
      "evidence": "a second area is entered in session 1",
      "required": false
    }
  ],
  "neverTaught": [
    "rebirth",
    "offlineAccrual",
    "findRarity",
    "discoveryRate",
    "duplicates",
    "failure",
    "anyControl",
    "codesDailiesLeaderboardsTrading"
  ],
  "tutorialDevicesForbidden": [
    "imperativeString",
    "tipHintHowToPlayObjectiveGoalString",
    "pointerArrowChevronBeamWaypointOutlineHighlight",
    "ghostedOrPulsingControlGlyph",
    "firstRunOnlyString",
    "unrequestedModalPanelOrOverlay",
    "countdownOrTutorialChecklist",
    "voiceOverOrSpokenLine",
    "welcomeOrWelcomeBackString",
    "stringNamingAControl",
    "uncausedCameraMoveZoomOrReframe",
    "promptingSound"
  ],
  "withheld": [
    {
      "surface": "collectionCount",
      "presentAtJoin": true,
      "liftedBy": null,
      "latched": false,
      "joinValue": "0"
    },
    {
      "surface": "collectionDenominator",
      "presentAtJoin": false,
      "liftedBy": "beat:firstReveal",
      "latched": true,
      "latchSource": "the collection map is non-empty",
      "newSaveFields": 0
    },
    {
      "surface": "currencyReadout",
      "presentAtJoin": true,
      "liftedBy": null,
      "latched": false,
      "joinValue": "0"
    },
    {
      "surface": "upgradeRow",
      "perRow": true,
      "presentAtJoin": false,
      "liftedBy": "balance has reached upgrades[i] level-1 cost",
      "latched": true,
      "latchSource": "one persisted boolean per row",
      "newSaveFields": 3
    },
    {
      "surface": "areaProgress",
      "presentAtJoin": true,
      "liftedBy": null,
      "latched": false,
      "joinValue": "0%"
    },
    {
      "surface": "collectionPanel",
      "presentAtJoin": false,
      "liftedBy": "beat:firstReveal",
      "latched": true,
      "latchSource": "the collection map is non-empty",
      "newSaveFields": 0
    }
  ],
  "suppressionForbidden": [
    "padlockOrLockGlyph",
    "greyedOrDimmedRow",
    "questionMarkPlaceholder",
    "unknownDenominatorForm",
    "explanatoryTooltip",
    "liftAnimation",
    "liftSound",
    "newBadgeOrDot",
    "reSuppression",
    "unrevealedFindsInCount",
    "percentFormOfCollectionCount",
    "reflowOnLift"
  ],
  "permittedConfusion": [
    "patchTier",
    "costGrowth",
    "depthMeaning",
    "setBonus",
    "collectionEnd",
    "otherPlayersAreReal",
    "persistence",
    "absenceOfRebirthAndIdle"
  ]
}
```

#### `interfaces (yours and your dependencies')`

```json
[
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
      {
        "name": "upgrade",
        "type": "UpgradeDef",
        "note": "one entry of GameConfig.Upgrades, the table itself and not its id"
      },
      {
        "name": "level",
        "type": "integer",
        "meaning": "the level the player currently HOLDS, not the level being bought. The price of the first purchase is upgradeCost(def, 0) and equals def.costBase. The price of moving from level 3 to 4 is upgradeCost(def, 3)."
      }
    ],
    "returns": "integer — floor(costBase * costGrowth ^ level)",
    "note": "Generated. Do not reimplement the curve anywhere else. A purchase is legal only while the held level is strictly below def.maxLevel, so the highest price ever charged is upgradeCost(def, maxLevel - 1). firstSession.withheld.upgradeRow lifts row i when the balance reaches upgradeCost(def_i, 0), which is the same call with the same convention."
  },
  {
    "module": "config",
    "fn": "upgradeEffect(upgrade, level)",
    "params": [
      {
        "name": "upgrade",
        "type": "UpgradeDef",
        "note": "needs base, perLevel and mode"
      },
      {
        "name": "level",
        "type": "integer",
        "meaning": "the level currently HELD, same convention as upgradeCost. Effect at level 0 is def.base, which is the pre-upgrade value: 5.5 studs for radius, 16 for speed, 1.0 for value."
      }
    ],
    "returns": "number — base + perLevel * level when mode is \"additive\", base * perLevel ^ level when mode is \"compounding\"",
    "note": "STEP 1 OF modifiers.resolutionOrder, and the only place the additive-versus-compounding question is answered. modifiers.axes[].baseFrom says of all three axes that the base is 'already inside upgradeEffect', and modifiers.baseIsNotAppliedTwice forbids multiplying it in again — so modifiers.effective calls this ONCE and multiplies FACTORS onto its result. All three shipped upgrades are additive today, which is exactly why hand-inlining looks harmless and would silently ignore a future compounding axis."
  },
  {
    "module": "config",
    "fn": "tierByWeight(roll)",
    "params": [
      {
        "name": "roll",
        "type": "number",
        "meaning": "a uniform sample in [0, 1). Not a weight, not a tier index, and not pre-scaled by the weight total — the function scales it. It must come from layout's seeded stream; rarity.ladders[overgrowth-tier].rolled is true and rolledFrom is tiers[].weight."
      }
    ],
    "returns": "(integer, TierDef) — the 1-based index into GameConfig.Tiers, then the tier table",
    "note": "The integer is what goes into Patch.tierIndex; the table is for reading value, height and shape at the point of use. Storing the table in a Patch instead of the index is forbidden by 03-state-shape: re-emitting the config would leave stale names in live patches. rarity.depthRarityChannel wants these weights shifted toward the rare end per depth and rarity.depthRarityBlocker says tiers has no depth dimension, so there is ONE weight table for all four depths and adding a second is a revision to the tiers sheet, not a branch here."
  },
  {
    "module": "progression",
    "fn": "award(state, amount)",
    "params": [
      {
        "name": "state",
        "type": "PlayerState"
      },
      {
        "name": "amount",
        "type": "integer",
        "meaning": "a positive whole number of currency to ADD to the balance. Not a new total, and ALREADY MULTIPLIED by modifiers.effective(state, 'value') by the caller — award applies no multiplier of its own. economy.faucets[patch-clear].multiplierAppliedOnce is 'at this site only; never again inside the award function', and modifiers.forbidden bans applying it in both places."
      }
    ],
    "returns": "number — the new balance",
    "note": "The only function that increases currency, and clearing is its only caller — economy.faucetCount is 1. Rejects a non-positive amount rather than clamping, because clearing's minimum payout is economy.payoutFloor (1). Calls revealRows(state) after crediting, so a row lifts on the tick the balance crosses its threshold rather than on the next purchase attempt. Does not cap: economy.balanceCap is null."
  },
  {
    "module": "progression",
    "fn": "tryBuy(state, upgradeId)",
    "params": [
      {
        "name": "state",
        "type": "PlayerState"
      },
      {
        "name": "upgradeId",
        "type": "string",
        "note": "one of the ids in upgrades: value, radius, speed. Sent by the client as a bare string and validated here; never a cost, never a level, never a target."
      }
    ],
    "returns": "boolean — true only if currency was deducted and the level incremented",
    "note": "Reads the held level from state.upgrades[upgradeId], treating nil as 0; prices it with config.upgradeCost(def, heldLevel); on success deducts exactly that and increments the level by exactly 1. Returns false and changes NOTHING if the id is unknown, if the held level already equals def.maxLevel, or if state.currency is below the cost — economy.sinks[0].onInsufficientFunds is 'nothing changes, nothing is deducted, no partial purchase exists' and refundable is false. THE FAILURE IS SILENT: input.verbs[buy].onPreconditionFail is silentNoOp and input.pressable.rejectionCueOnFailedPrecondition is 'none', so server-main sends nothing at all on a false return. economy.sinkCount is 1 and this is it."
  },
  {
    "module": "progression",
    "fn": "revealRows(state)",
    "params": [
      {
        "name": "state",
        "type": "PlayerState"
      }
    ],
    "returns": "boolean — true if any row lifted on this call",
    "note": "For each upgrades[] entry i, sets state.rowsRevealed[id] = true when state.currency is at or above config.upgradeCost(def_i, 0) — firstSession.withheld.upgradeRow.liftedBy is 'balance has reached upgrades[i] level-1 cost'. NEVER SETS ONE FALSE: firstSession.suppressionForbidden lists reSuppression, so a row that has appeared stays. Called by award after every credit, and once by server-main in onJoin so a returning player's rows are consistent with a balance that may have moved in a previous version. Writes nothing else."
  }
]
```

### Done when

1. a purchase with insufficient currency changes nothing and returns false, and nothing is sent to the client — input.verbs[buy].onPreconditionFail is silentNoOp
2. a purchase at maxLevel changes nothing and returns false
3. the first purchase of an upgrade costs config.upgradeCost(def, 0) which equals def.costBase
4. award(state, amount) rejects a non-positive amount rather than clamping
5. revealRows sets rowsRevealed[u] true for every upgrade whose config.upgradeCost(def, 0) is at or below the balance, and never sets one false
6. a player who reaches the cheapest level-1 cost after 10 patches of clearing at base stats sees that row lift — firstSession.firstPurchaseBand

---

## 7. `protocol` — shared

**Write to:** `game/src/shared/Protocol.luau`

**Owns:** Own the remote channels end to end — name them, create the Instances, hand any module the Instance for a name — and define the snapshot shape both sides agree on.

**Depends on:** `config`

**Declares the remote channels:** `RequestState`, `StateChanged`, `BuyUpgrade`, `FindRevealed`, `SetCompleted`, `AreaRestored`, `UpgradeApplied`. You create them and you resolve them; no other module may look one up.

### Must expose

- `REMOTES`
- `snapshotShape()`
- `createRemotes()`
- `channel(name)`

### Must not

- declaring any client-to-server channel that is not in input.clientOriginatedRemotes. That list is exactly RequestState and BuyUpgrade, and this module's own criterion checks the two lists against each other
- declaring any remote that lets a client assert a cleared patch, a currency amount or a cost
- putting any player identifier other than the recipient's in a payload — social.forbidden X7, and it is why a snapshot carries no UserId at all
- letting any other module find a remote for itself: channel(name) is the only path from a name to an Instance, and an undeclared name is an error rather than a warning and a nil
- creating a remote anywhere but createRemotes, and calling createRemotes from a client
- yielding at require time; the Remotes folder is resolved on the first channel() call and cached

### Values

#### `input` *(from gameplay/mechanics/02-verb-roster.md)*

```json
{
  "closed": true,
  "gameBoundInputClasses": [
    "pressable"
  ],
  "gameDrawnPressables": 4,
  "travelRequiredToPurchase": "none",
  "clientOriginatedRemotes": [
    "RequestState",
    "BuyUpgrade"
  ],
  "clientRemotesFiredByPlayerInput": [
    "BuyUpgrade"
  ],
  "verbs": [
    {
      "id": "move",
      "trigger": "platformMovementControl",
      "boundByGame": false,
      "kind": "continuousDirectional",
      "precondition": "characterSpawned",
      "adjudicatedBy": "client",
      "devices": [
        "touch",
        "keyboard",
        "gamepad"
      ]
    },
    {
      "id": "look",
      "trigger": "platformCameraControl",
      "boundByGame": false,
      "kind": "continuousFreeLook",
      "precondition": "none",
      "adjudicatedBy": "client",
      "devices": [
        "touch",
        "keyboard",
        "gamepad"
      ]
    },
    {
      "id": "jump",
      "trigger": "platformJumpControl",
      "boundByGame": false,
      "kind": "discreteImpulse",
      "precondition": "onGround",
      "adjudicatedBy": "client",
      "devices": [
        "touch",
        "keyboard",
        "gamepad"
      ]
    },
    {
      "id": "buy",
      "trigger": "gamePressable",
      "pressableRole": "purchase",
      "boundByGame": true,
      "kind": "discreteSelect",
      "precondition": "balance >= cost && level < maxLevel",
      "onPreconditionFail": "silentNoOp",
      "adjudicatedBy": "server",
      "devices": [
        "touch",
        "keyboard",
        "gamepad"
      ]
    },
    {
      "id": "openIndex",
      "trigger": "gamePressable",
      "pressableRole": "index",
      "boundByGame": true,
      "kind": "discreteSelect",
      "precondition": "none",
      "adjudicatedBy": "client",
      "devices": [
        "touch",
        "keyboard",
        "gamepad"
      ]
    }
  ],
  "pressable": {
    "roles": [
      {
        "role": "purchase",
        "count": 3,
        "boundTo": "upgrades declaration order",
        "adjudicatedBy": "server",
        "persistent": true
      },
      {
        "role": "index",
        "count": 1,
        "adjudicatedBy": "client",
        "persistent": true
      }
    ],
    "activationsPerPress": 1,
    "debounceSeconds": 0.35,
    "holdRequired": false,
    "chordRequired": false,
    "rejectionCueOnFailedPrecondition": "none",
    "affordabilityByColourAlone": false,
    "minTouchTargetRule": "notSmallerThanPlatformJumpButton",
    "mayOverlapPlatformControlRegions": false,
    "gamepadSelectable": true,
    "keyboardAcceleratorAllowed": true,
    "keyboardAcceleratorRequired": false,
    "indexScreenSuspendsMovement": true
  },
  "worldObjectsTriggeringAVerb": 0
}
```

#### `social` *(from gameplay/social/01-server-and-co-presence.md)*

```json
{
  "model": "shared-server-parallel-progression",
  "maxPlayers": {
    "min": 12,
    "max": 20,
    "scriptSettable": false,
    "setVia": "place configuration",
    "belowMinBreaks": "a player can spend a whole session alone and receives no social proof",
    "aboveMaxBreaks": "per-plot instance count and plot-row length exceed the mobile budget"
  },
  "maxCoPresenceSeparationStuds": {
    "value": 128,
    "unit": "studs",
    "status": "playtest unknown",
    "testRangeStuds": [
      85,
      185
    ],
    "derivedIn": "cid/gameplay/social/02-presence-sufficiency.md",
    "requirement": "whenever two or more players are connected, from any occupied plot's spawn point the spawn point of at least one other occupied plot lies within this distance, with an unobstructed sightline",
    "measuredAt": {
      "viewportWidthPx": 1280,
      "viewportHeightPx": 720,
      "fieldOfViewDegrees": 70,
      "fieldOfViewAxis": "vertical",
      "subjectHeightStuds": 5,
      "legibilityFloorPx": 20,
      "legibilityFloorViewportFraction": 0.0278,
      "formula": "px = viewportHeightPx * (subjectHeightStuds / distanceStuds) / (2 * tan(fieldOfViewDegrees / 2))"
    },
    "realisedStuds": 160,
    "satisfiedByShippedBuild": false
  },
  "progressScope": "per-player",
  "worldStateScope": "per-player",
  "sharedState": [],
  "plotAccess": {
    "ownerOnly": true,
    "othersMayEnter": false,
    "enforcedBy": "the collidable boundary built on every plot"
  },
  "plotTenure": {
    "claimedOn": "PlayerAdded",
    "slotRule": "lowest-free-index",
    "heldFor": "the whole connected session",
    "releasedOn": "PlayerRemoving",
    "rejoinSlot": "any-free",
    "slotReservedOnLeave": false,
    "onLeaveMidArea": "the plot instance tree is destroyed and the slot freed; the partial cleared set survives only in the leaving player's own save; nothing about the departure is perceptible to any remaining player"
  },
  "characterCollision": {
    "playerVsPlayer": false,
    "groupName": "Characters",
    "groupNameOwnedBy": "social.characterCollision, and by no other key",
    "appliedTo": "every BasePart of every character, on CharacterAdded and on every BasePart added to it thereafter",
    "collidable": [
      {
        "a": "Characters",
        "b": "Characters",
        "collides": false
      },
      {
        "a": "Characters",
        "b": "Default",
        "collides": true
      }
    ]
  },
  "chat": {
    "text": false,
    "chatWindowEnabled": false,
    "bubbleChatEnabled": false,
    "voice": false,
    "playerAuthoredStringsToOtherClients": 0,
    "overridesPlatformDefault": "ChatWindowConfiguration.Enabled defaults to true"
  },
  "friendSurfacing": {
    "readsSocialGraph": false,
    "friendJoinedNotice": false,
    "forbiddenApis": [
      "Player:IsFriendsWith",
      "Players:GetFriendsAsync",
      "SocialService:CanSendGameInviteAsync",
      "SocialService:PromptGameInvite"
    ]
  },
  "mechanicalInteraction": "none",
  "forbidden": [
    {
      "id": "X1",
      "forbids": "a leaderstats Folder under any Player, or any Value inside one"
    },
    {
      "id": "X2",
      "forbids": "Team instances, and any write to Player.Team or Player.TeamColor"
    },
    {
      "id": "X3",
      "forbids": "any server-held value that more than one player's action increments"
    },
    {
      "id": "X4",
      "forbids": "any path by which one player's action changes another player's currency"
    },
    {
      "id": "X5",
      "forbids": "any path by which one player's action adds an entry to another player's found set"
    },
    {
      "id": "X6",
      "forbids": "a BillboardGui, SurfaceGui, overhead label, plot sign or DisplayName mutation carrying another player's currency, upgrade level, cleared count or collection count"
    },
    {
      "id": "X7",
      "forbids": "any replicated payload containing a player identifier other than the recipient's"
    },
    {
      "id": "X8",
      "forbids": "OrderedDataStore, and any global, weekly or all-time ranking"
    },
    {
      "id": "X9",
      "forbids": "any remote handler accepting a string that is later rendered to a different client"
    },
    {
      "id": "X10",
      "forbids": "any cue, visual or audible, caused by one player's input and perceptible to another beyond their character in motion and their own patches clearing, instance and cue"
    },
    {
      "id": "X11",
      "forbids": "join or leave notices, toasts, sounds or strings naming another player"
    },
    {
      "id": "X12",
      "forbids": "ProximityPrompt or ClickDetector parented into a character model"
    },
    {
      "id": "X13",
      "forbids": "writes to another character's Humanoid.Health or TakeDamage, and any force or velocity applied to a character that is not the actor's"
    },
    {
      "id": "X14",
      "forbids": "Camera.CameraSubject set to a Humanoid that is not the local player's"
    }
  ]
}
```

#### `collection` *(from gameplay/meta/02-the-collection.md)*

```json
{
  "className": "Find",
  "classPlural": "Finds",
  "relicsPerArea": 3,
  "areasPerDepth": 2,
  "sets": [
    {
      "id": "terrace",
      "label": "Terrace",
      "depth": 1,
      "relics": [
        "Sundial",
        "Ewer",
        "Hinge",
        "Tessera",
        "Stylus",
        "Bellcast"
      ]
    },
    {
      "id": "cistern",
      "label": "Cistern",
      "depth": 2,
      "relics": [
        "Sluice",
        "Weight",
        "Siphon",
        "Chain",
        "Grate",
        "Cup"
      ]
    },
    {
      "id": "vault",
      "label": "Vault",
      "depth": 3,
      "relics": [
        "Seal",
        "Ledger",
        "Coffer",
        "Key",
        "Tally",
        "Ring"
      ]
    },
    {
      "id": "spire",
      "label": "Spire",
      "depth": 4,
      "relics": [
        "Gnomon",
        "Lens",
        "Vane",
        "Crest",
        "Orrery",
        "Finial"
      ]
    }
  ]
}
```

#### `upgrades` *(from gameplay/balance/01-upgrade-ladder.md)*

```json
[
  {
    "id": "value",
    "label": "Value",
    "blurb": "Each patch pays more",
    "costBase": 25,
    "costGrowth": 1.6,
    "maxLevel": 10,
    "perLevel": 0.25,
    "base": 1,
    "mode": "additive"
  },
  {
    "id": "radius",
    "label": "Reach",
    "blurb": "Clear a wider sweep as you walk",
    "costBase": 40,
    "costGrowth": 1.75,
    "maxLevel": 8,
    "perLevel": 1.1,
    "base": 5.5,
    "mode": "additive"
  },
  {
    "id": "speed",
    "label": "Pace",
    "blurb": "Move faster between patches",
    "costBase": 60,
    "costGrowth": 1.8,
    "maxLevel": 6,
    "perLevel": 1.6,
    "base": 16,
    "mode": "additive"
  }
]
```

#### `currency` *(from gameplay/systems/02-the-currency.md)*

```json
{
  "name": "Shard",
  "plural": "Shards",
  "icon": "shard"
}
```

#### `interfaces (yours and your dependencies')`

```json
[
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
      {
        "name": "upgrade",
        "type": "UpgradeDef",
        "note": "one entry of GameConfig.Upgrades, the table itself and not its id"
      },
      {
        "name": "level",
        "type": "integer",
        "meaning": "the level the player currently HOLDS, not the level being bought. The price of the first purchase is upgradeCost(def, 0) and equals def.costBase. The price of moving from level 3 to 4 is upgradeCost(def, 3)."
      }
    ],
    "returns": "integer — floor(costBase * costGrowth ^ level)",
    "note": "Generated. Do not reimplement the curve anywhere else. A purchase is legal only while the held level is strictly below def.maxLevel, so the highest price ever charged is upgradeCost(def, maxLevel - 1). firstSession.withheld.upgradeRow lifts row i when the balance reaches upgradeCost(def_i, 0), which is the same call with the same convention."
  },
  {
    "module": "config",
    "fn": "upgradeEffect(upgrade, level)",
    "params": [
      {
        "name": "upgrade",
        "type": "UpgradeDef",
        "note": "needs base, perLevel and mode"
      },
      {
        "name": "level",
        "type": "integer",
        "meaning": "the level currently HELD, same convention as upgradeCost. Effect at level 0 is def.base, which is the pre-upgrade value: 5.5 studs for radius, 16 for speed, 1.0 for value."
      }
    ],
    "returns": "number — base + perLevel * level when mode is \"additive\", base * perLevel ^ level when mode is \"compounding\"",
    "note": "STEP 1 OF modifiers.resolutionOrder, and the only place the additive-versus-compounding question is answered. modifiers.axes[].baseFrom says of all three axes that the base is 'already inside upgradeEffect', and modifiers.baseIsNotAppliedTwice forbids multiplying it in again — so modifiers.effective calls this ONCE and multiplies FACTORS onto its result. All three shipped upgrades are additive today, which is exactly why hand-inlining looks harmless and would silently ignore a future compounding axis."
  },
  {
    "module": "config",
    "fn": "tierByWeight(roll)",
    "params": [
      {
        "name": "roll",
        "type": "number",
        "meaning": "a uniform sample in [0, 1). Not a weight, not a tier index, and not pre-scaled by the weight total — the function scales it. It must come from layout's seeded stream; rarity.ladders[overgrowth-tier].rolled is true and rolledFrom is tiers[].weight."
      }
    ],
    "returns": "(integer, TierDef) — the 1-based index into GameConfig.Tiers, then the tier table",
    "note": "The integer is what goes into Patch.tierIndex; the table is for reading value, height and shape at the point of use. Storing the table in a Patch instead of the index is forbidden by 03-state-shape: re-emitting the config would leave stale names in live patches. rarity.depthRarityChannel wants these weights shifted toward the rare end per depth and rarity.depthRarityBlocker says tiers has no depth dimension, so there is ONE weight table for all four depths and adding a second is a revision to the tiers sheet, not a branch here."
  },
  {
    "module": "protocol",
    "fn": "REMOTES",
    "params": [],
    "returns": "table — the seven channels below, keyed by name, each with its class, direction, payload and the one module that originates it. NAMES AND CLASSES, NOT INSTANCES: protocol.channel(name) returns the Instance.",
    "note": "A TABLE, NOT A CALLABLE. Exactly seven, and no more. THE TWO CLIENT-TO-SERVER NAMES ARE input.clientOriginatedRemotes VERBATIM — RequestState and BuyUpgrade — and this module's first criterion checks the two lists against each other in both directions, which is what makes 'the client surface is closed' a merge property rather than a promise. There is deliberately no clearing channel and no currency channel: the server observes clearing on a tick, so there is nothing for a client to claim, and economy.authority says no client message carries a cost, an amount or a balance. Two channels are new since wave 1 and both come from response: setComplete and areaComplete are distinct beats on the notice channel with their own budgets, and response.channelExclusivity forbids either sharing atPatch with a reveal; upgradePurchased has a 200 ms acknowledgment budget and input.verbs[buy].onPreconditionFail is silentNoOp, so a client cannot tell an accepted purchase from a dropped one by diffing snapshots. NO PAYLOAD CARRIES A PLAYER IDENTIFIER OTHER THAN THE RECIPIENT'S — social.forbidden X7 — and none carries a player-authored string, which is X9.",
    "channels": [
      {
        "name": "RequestState",
        "class": "RemoteFunction",
        "direction": "client -> server",
        "payload": "no arguments; returns one snapshot",
        "firedBy": "client-main",
        "handledBy": "server-main, which sets OnServerInvoke at boot",
        "why": "client-main may not assume the join-time push arrived, so it pulls once after its updaters are live"
      },
      {
        "name": "StateChanged",
        "class": "RemoteEvent",
        "direction": "server -> client",
        "payload": "one snapshot, exactly the fields snapshotShape() names",
        "firedBy": "server-main on join, on spawn and after a successful purchase; clearing once per tick in which anything changed",
        "handledBy": "client-main, which fans it out to every updater",
        "why": "TWO ORIGINATORS, deliberately and safely: it carries a whole snapshot rather than a delta, so a duplicate is idempotent. currency, clearedCount, found and areasFinished only ever change inside the tick, so without clearing firing it the readouts sit frozen until the next purchase."
      },
      {
        "name": "BuyUpgrade",
        "class": "RemoteEvent",
        "direction": "client -> server",
        "payload": "one upgrade id string and nothing else",
        "firedBy": "input",
        "handledBy": "server-main, wiring.onPurchase",
        "why": "one of the two client-originated messages in the game, and the only one a player's input produces — input.clientRemotesFiredByPlayerInput is exactly [BuyUpgrade]. The server prices it."
      },
      {
        "name": "FindRevealed",
        "class": "RemoteEvent",
        "direction": "server -> client",
        "payload": "one Find name string, from Patch.find",
        "firedBy": "clearing",
        "handledBy": "beats, as response.beats[findReveal]: rank 1, 300 ms acknowledgment budget, channels atPatch and audio, notice FORBIDDEN, queued, 2.5 s dwell",
        "why": "up to collection.relicsPerArea (3) times per area, per player, and never for a post-terminal area"
      },
      {
        "name": "SetCompleted",
        "class": "RemoteEvent",
        "direction": "server -> client",
        "payload": "one collection.sets[].id string",
        "firedBy": "clearing",
        "handledBy": "beats, as response.beats[setComplete]: rank 2, 400 ms budget, channels notice and audio, queued",
        "why": "exactly once per player per set, on the sixth Find of that set — response.beats[setComplete].cause is sixthFindOfSetRevealed. A separate channel from FindRevealed because response.channelExclusivity puts them on two channels and gameplay/core-loop/03 rejects carrying one on the other behind a string prefix."
      },
      {
        "name": "AreaRestored",
        "class": "RemoteEvent",
        "direction": "server -> client",
        "payload": "the area label string from layout.areaSpec(ordinal).label",
        "firedBy": "clearing",
        "handledBy": "beats, as response.beats[areaComplete]: rank 3, 400 ms budget, channels notice and audio, atPatch FORBIDDEN, queued",
        "why": "exactly once per player per area, on the latch transition only — response.beats[areaComplete].cause is lastStandingPatchCleared. A post-terminal area fires it too: endgame.survivingPayoffKinds includes areaCompletion."
      },
      {
        "name": "UpgradeApplied",
        "class": "RemoteEvent",
        "direction": "server -> client",
        "payload": "one upgrade id string and the new held level",
        "firedBy": "server-main",
        "handledBy": "beats, as response.beats[upgradePurchased]: rank 4, 200 ms budget, channels readout and audio, queued, effectAppliedBeforeAcknowledgment true",
        "why": "fired ONLY on a successful purchase. input.verbs[buy].onPreconditionFail is silentNoOp, so a failed buy produces no packet at all — which is exactly why success needs one: recovering the event by diffing two snapshots makes a 200 ms budget unmeasurable."
      }
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
      {
        "name": "name",
        "type": "string",
        "note": "a key of REMOTES, taken from that table rather than hand-typed wherever the call site can reach it"
      }
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
  }
]
```

### Done when

1. the set of channels whose direction is client -> server equals input.clientOriginatedRemotes exactly, in both directions
2. the remote list contains no clearing channel and no currency-award channel
3. client and server both derive field names from snapshotShape() rather than repeating literals
4. channel(name) returns the same Instance on server and client for every declared name, and errors on a name REMOTES does not declare
5. `grep -rn 'Instance.new("Remote' game/src` matches this file only, and no other file contains a remote name literal or the string "Remotes"
6. no snapshot field carries another player's name, UserId, balance, level or count

---

## 8. `world` — server

**Write to:** `game/src/server/World.luau`

**Owns:** Execute every scriptable part of social at boot — collision groups, chat, the forbidden-API surface — and assert the one part that is place configuration.

**Depends on:** `config`

### Must expose

- `configure()`
- `onCharacter(character)`

### Must not

- writing Players.MaxPlayers. social.maxPlayers.scriptSettable is false; this module READS it and warns when it is outside the band, and runtime.placeConfiguration records who owns the setting
- creating a leaderstats Folder, a Team, or writing Player.Team or Player.TeamColor — social.forbidden X1 and X2
- calling Player:IsFriendsWith, Players:GetFriendsAsync, SocialService:CanSendGameInviteAsync or SocialService:PromptGameInvite — social.friendSurfacing.forbiddenApis, all four
- using an OrderedDataStore or building any ranking — social.forbidden X8
- enabling chat of any kind. social.chat.text, voice, chatWindowEnabled and bubbleChatEnabled are all false, and overridesPlatformDefault records that ChatWindowConfiguration.Enabled defaults to TRUE, so this is a write and not an omission
- letting two characters collide. social.characterCollision.playerVsPlayer is false, the group is named by social.characterCollision.groupName and by no other key, and Characters-vs-Default stays true so a character still stands on a slab

### Values

#### `social` *(from gameplay/social/01-server-and-co-presence.md)*

```json
{
  "model": "shared-server-parallel-progression",
  "maxPlayers": {
    "min": 12,
    "max": 20,
    "scriptSettable": false,
    "setVia": "place configuration",
    "belowMinBreaks": "a player can spend a whole session alone and receives no social proof",
    "aboveMaxBreaks": "per-plot instance count and plot-row length exceed the mobile budget"
  },
  "maxCoPresenceSeparationStuds": {
    "value": 128,
    "unit": "studs",
    "status": "playtest unknown",
    "testRangeStuds": [
      85,
      185
    ],
    "derivedIn": "cid/gameplay/social/02-presence-sufficiency.md",
    "requirement": "whenever two or more players are connected, from any occupied plot's spawn point the spawn point of at least one other occupied plot lies within this distance, with an unobstructed sightline",
    "measuredAt": {
      "viewportWidthPx": 1280,
      "viewportHeightPx": 720,
      "fieldOfViewDegrees": 70,
      "fieldOfViewAxis": "vertical",
      "subjectHeightStuds": 5,
      "legibilityFloorPx": 20,
      "legibilityFloorViewportFraction": 0.0278,
      "formula": "px = viewportHeightPx * (subjectHeightStuds / distanceStuds) / (2 * tan(fieldOfViewDegrees / 2))"
    },
    "realisedStuds": 160,
    "satisfiedByShippedBuild": false
  },
  "progressScope": "per-player",
  "worldStateScope": "per-player",
  "sharedState": [],
  "plotAccess": {
    "ownerOnly": true,
    "othersMayEnter": false,
    "enforcedBy": "the collidable boundary built on every plot"
  },
  "plotTenure": {
    "claimedOn": "PlayerAdded",
    "slotRule": "lowest-free-index",
    "heldFor": "the whole connected session",
    "releasedOn": "PlayerRemoving",
    "rejoinSlot": "any-free",
    "slotReservedOnLeave": false,
    "onLeaveMidArea": "the plot instance tree is destroyed and the slot freed; the partial cleared set survives only in the leaving player's own save; nothing about the departure is perceptible to any remaining player"
  },
  "characterCollision": {
    "playerVsPlayer": false,
    "groupName": "Characters",
    "groupNameOwnedBy": "social.characterCollision, and by no other key",
    "appliedTo": "every BasePart of every character, on CharacterAdded and on every BasePart added to it thereafter",
    "collidable": [
      {
        "a": "Characters",
        "b": "Characters",
        "collides": false
      },
      {
        "a": "Characters",
        "b": "Default",
        "collides": true
      }
    ]
  },
  "chat": {
    "text": false,
    "chatWindowEnabled": false,
    "bubbleChatEnabled": false,
    "voice": false,
    "playerAuthoredStringsToOtherClients": 0,
    "overridesPlatformDefault": "ChatWindowConfiguration.Enabled defaults to true"
  },
  "friendSurfacing": {
    "readsSocialGraph": false,
    "friendJoinedNotice": false,
    "forbiddenApis": [
      "Player:IsFriendsWith",
      "Players:GetFriendsAsync",
      "SocialService:CanSendGameInviteAsync",
      "SocialService:PromptGameInvite"
    ]
  },
  "mechanicalInteraction": "none",
  "forbidden": [
    {
      "id": "X1",
      "forbids": "a leaderstats Folder under any Player, or any Value inside one"
    },
    {
      "id": "X2",
      "forbids": "Team instances, and any write to Player.Team or Player.TeamColor"
    },
    {
      "id": "X3",
      "forbids": "any server-held value that more than one player's action increments"
    },
    {
      "id": "X4",
      "forbids": "any path by which one player's action changes another player's currency"
    },
    {
      "id": "X5",
      "forbids": "any path by which one player's action adds an entry to another player's found set"
    },
    {
      "id": "X6",
      "forbids": "a BillboardGui, SurfaceGui, overhead label, plot sign or DisplayName mutation carrying another player's currency, upgrade level, cleared count or collection count"
    },
    {
      "id": "X7",
      "forbids": "any replicated payload containing a player identifier other than the recipient's"
    },
    {
      "id": "X8",
      "forbids": "OrderedDataStore, and any global, weekly or all-time ranking"
    },
    {
      "id": "X9",
      "forbids": "any remote handler accepting a string that is later rendered to a different client"
    },
    {
      "id": "X10",
      "forbids": "any cue, visual or audible, caused by one player's input and perceptible to another beyond their character in motion and their own patches clearing, instance and cue"
    },
    {
      "id": "X11",
      "forbids": "join or leave notices, toasts, sounds or strings naming another player"
    },
    {
      "id": "X12",
      "forbids": "ProximityPrompt or ClickDetector parented into a character model"
    },
    {
      "id": "X13",
      "forbids": "writes to another character's Humanoid.Health or TakeDamage, and any force or velocity applied to a character that is not the actor's"
    },
    {
      "id": "X14",
      "forbids": "Camera.CameraSubject set to a Humanoid that is not the local player's"
    }
  ]
}
```

#### `traversal` *(from gameplay/mechanics/06-traversal-affordances.md)*

```json
{
  "jump": {
    "exists": true,
    "jumpHeight": 7.2,
    "useJumpPower": false,
    "changesGameState": false,
    "upgradable": false,
    "gatedContent": 0
  },
  "fall": {
    "damage": false,
    "voidBelowPlayArea": false,
    "maxSurvivableFallStuds": null
  },
  "death": {
    "possibleByDesign": false,
    "damageSources": 0,
    "healthWrittenByGameCode": false,
    "respawnAt": "areaSpawn",
    "lossOnRespawn": "none",
    "authoredCue": "none",
    "respawnDelayOwner": "architect/01-runtime"
  },
  "boundary": {
    "kind": "collisionBarrier",
    "walkableMarginStuds": 12,
    "heightStuds": 20,
    "passable": false,
    "climbable": false,
    "jumpable": false,
    "opaque": false,
    "sightlineObstruction": "none",
    "cue": "none",
    "teleportBack": false
  },
  "surface": {
    "maxStepStuds": 2,
    "maxSlopeDegreesWherePatchesStand": 30,
    "climbSurfaces": 0,
    "ladders": 0,
    "seats": 0,
    "vehicles": 0,
    "water": 0,
    "speedModifyingSurfaces": 0,
    "teleportsWithinArea": 0
  },
  "collision": {
    "playerVsWorld": true,
    "playerVsPlayerOwner": "social.characterCollision"
  },
  "hazards": 0,
  "fallPenalties": 0,
  "lockouts": 0
}
```

#### `runtime` *(from 01-runtime.md)*

```json
{
  "clearTickRate": 0.12,
  "saveIntervalSeconds": 45,
  "respawnDelaySeconds": 3,
  "dataStoreName": "ArgaRuin_v2",
  "layoutSeed": 20260801,
  "maxPlayers": 16,
  "placeConfiguration": {
    "maxPlayers": {
      "value": 16,
      "band": "social.maxPlayers, 12 to 20",
      "setVia": "place configuration — Players.MaxPlayers is read-only from a script and no module may write it",
      "ownedBy": "whoever publishes the place",
      "assertedBy": "world.configure(), which READS Players.MaxPlayers at boot and warns naming this key when it is outside the band"
    },
    "nothingElseIsPlaceConfiguration": "every other decision in social — collision groups, chat, plot access, the forbidden APIs — is executed by world.configure() at runtime. maxPlayers is the only one that is not, and it is the only entry in this block."
  },
  "storeVersionHistory": {
    "ArgaRuin_v1": "wave-1 shape: areaComplete boolean, single-area cleared set, no rowsRevealed. No reader is written; nothing shipped to players.",
    "ArgaRuin_v2": "current. areasFinished integer, live-area cleared set, rowsRevealed."
  }
}
```

#### `interfaces (yours and your dependencies')`

```json
[
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
      {
        "name": "upgrade",
        "type": "UpgradeDef",
        "note": "one entry of GameConfig.Upgrades, the table itself and not its id"
      },
      {
        "name": "level",
        "type": "integer",
        "meaning": "the level the player currently HOLDS, not the level being bought. The price of the first purchase is upgradeCost(def, 0) and equals def.costBase. The price of moving from level 3 to 4 is upgradeCost(def, 3)."
      }
    ],
    "returns": "integer — floor(costBase * costGrowth ^ level)",
    "note": "Generated. Do not reimplement the curve anywhere else. A purchase is legal only while the held level is strictly below def.maxLevel, so the highest price ever charged is upgradeCost(def, maxLevel - 1). firstSession.withheld.upgradeRow lifts row i when the balance reaches upgradeCost(def_i, 0), which is the same call with the same convention."
  },
  {
    "module": "config",
    "fn": "upgradeEffect(upgrade, level)",
    "params": [
      {
        "name": "upgrade",
        "type": "UpgradeDef",
        "note": "needs base, perLevel and mode"
      },
      {
        "name": "level",
        "type": "integer",
        "meaning": "the level currently HELD, same convention as upgradeCost. Effect at level 0 is def.base, which is the pre-upgrade value: 5.5 studs for radius, 16 for speed, 1.0 for value."
      }
    ],
    "returns": "number — base + perLevel * level when mode is \"additive\", base * perLevel ^ level when mode is \"compounding\"",
    "note": "STEP 1 OF modifiers.resolutionOrder, and the only place the additive-versus-compounding question is answered. modifiers.axes[].baseFrom says of all three axes that the base is 'already inside upgradeEffect', and modifiers.baseIsNotAppliedTwice forbids multiplying it in again — so modifiers.effective calls this ONCE and multiplies FACTORS onto its result. All three shipped upgrades are additive today, which is exactly why hand-inlining looks harmless and would silently ignore a future compounding axis."
  },
  {
    "module": "config",
    "fn": "tierByWeight(roll)",
    "params": [
      {
        "name": "roll",
        "type": "number",
        "meaning": "a uniform sample in [0, 1). Not a weight, not a tier index, and not pre-scaled by the weight total — the function scales it. It must come from layout's seeded stream; rarity.ladders[overgrowth-tier].rolled is true and rolledFrom is tiers[].weight."
      }
    ],
    "returns": "(integer, TierDef) — the 1-based index into GameConfig.Tiers, then the tier table",
    "note": "The integer is what goes into Patch.tierIndex; the table is for reading value, height and shape at the point of use. Storing the table in a Patch instead of the index is forbidden by 03-state-shape: re-emitting the config would leave stale names in live patches. rarity.depthRarityChannel wants these weights shifted toward the rare end per depth and rarity.depthRarityBlocker says tiers has no depth dimension, so there is ONE weight table for all four depths and adding a second is a revision to the tiers sheet, not a branch here."
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
      {
        "name": "character",
        "type": "Model",
        "note": "the character Model from CharacterAdded"
      }
    ],
    "returns": "nil",
    "note": "Sets every BasePart of the character into the collision group, and connects DescendantAdded so a part added later gets it too — social.characterCollision.appliedTo is 'every BasePart of every character, on CharacterAdded and on every BasePart added to it thereafter', and the second clause is why this is a connection rather than a loop. Called by server-main in wiring.onSpawn, before the pivot. Sets no Humanoid property and no Health: traversal.death.healthWrittenByGameCode is false, traversal.death.damageSources is 0, and response.humanoidWritesAllowed is exactly ['WalkSpeed'], which belongs to server-main."
  }
]
```

### Done when

1. the collision group named by social.characterCollision.groupName exists before the first character spawns, and both rows of social.characterCollision.collidable are set
2. every BasePart of every character carries that group, including parts added after CharacterAdded — social.characterCollision.appliedTo
3. two characters walk through each other; both stand on the slab
4. no chat window and no chat bubble appears in a session, and no player-authored string reaches another client — social.chat.playerAuthoredStringsToOtherClients is 0
5. booting a place whose Players.MaxPlayers is outside social.maxPlayers's band produces exactly one warning naming the key, and the game still runs
6. `grep -rEn 'IsFriendsWith|GetFriendsAsync|CanSendGameInviteAsync|PromptGameInvite|OrderedDataStore|leaderstats|TeamColor' game/src` returns nothing

---

## 9. `beats` — client

**Write to:** `game/src/client/Beats.luau`

**Owns:** Receive the payoff channels and schedule them as beats: rank, queue, minimum onset gap, channel exclusivity and overload behaviour.

**Depends on:** `config`, `protocol`

### Must expose

- `connect(gui)`

### Must not

- affecting control. response.controlEverAffected is false, response.lockoutsSeconds is 0 and every beat's controlAffected is false — no camera move, no input lockout, no walk-speed change, ever
- playing two beats on one exclusive channel at once. response.channelExclusivity gives atPatch to findReveal and notice to setComplete and areaComplete
- delaying a lone sequenced beat. response.loneSequencedBeatDelayed is false: a beat with nothing queued ahead of it plays immediately, and the gap only applies between two
- queueing patchClear. response.unsequencedBeats is ['patchClear'] and its queued is false; it plays on arrival or not at all
- dropping a beat under load. response.onOverload is 'overlap', not 'drop' and not 'queue-forever'
- playing a negative beat or a failure cue. response.negativeBeats is 0
- prompting. firstSession.tutorialDevicesForbidden lists promptingSound, pointerArrowChevronBeamWaypointOutlineHighlight and uncausedCameraMoveZoomOrReframe

### Values

#### `response` *(from gameplay/mechanics/05-response-contract.md)*

```json
{
  "controlEverAffected": false,
  "sequencedBeats": [
    "upgradePurchased",
    "findReveal",
    "setComplete",
    "areaComplete"
  ],
  "sequenceOrderOwner": "gameplay/core-loop/02-payoff-weights",
  "minOnsetGapSeconds": 0.6,
  "minOnsetGapTestRangeSeconds": [
    0.35,
    0.9
  ],
  "minOnsetGapOwner": "gameplay/core-loop/02-payoff-weights, figure set by Balance & Tuning",
  "loneSequencedBeatDelayed": false,
  "unsequencedBeats": [
    "patchClear"
  ],
  "minSustainedOnsetsPerSecond": 8,
  "onOverload": "overlap",
  "channelExclusivity": {
    "atPatch": "findReveal",
    "notice": [
      "setComplete",
      "areaComplete"
    ]
  },
  "humanoidWritesAllowed": [
    "WalkSpeed"
  ],
  "beats": [
    {
      "id": "patchClear",
      "rank": 5,
      "cause": "clearRadiusContainsStandingPatch",
      "decidedBy": "clientPredictedServerAuthoritative",
      "acknowledgmentBudgetMs": 80,
      "budgetTestRangeMs": [
        40,
        120
      ],
      "payoutBudgetMs": 250,
      "payoutTestRangeMs": [
        150,
        400
      ],
      "channels": [
        "atPatch",
        "readout"
      ],
      "controlAffected": false,
      "queued": false,
      "residueLifetimeSeconds": 0.4
    },
    {
      "id": "findReveal",
      "rank": 1,
      "cause": "patchHidingItCleared",
      "decidedBy": "server",
      "acknowledgmentBudgetMs": 300,
      "budgetTestRangeMs": [
        200,
        500
      ],
      "channels": [
        "atPatch",
        "audio"
      ],
      "forbiddenChannels": [
        "notice"
      ],
      "controlAffected": false,
      "queued": true,
      "dwellSeconds": 2.5,
      "dwellTestRangeSeconds": [
        1.5,
        4
      ],
      "grantedAt": "reveal"
    },
    {
      "id": "setComplete",
      "rank": 2,
      "cause": "sixthFindOfSetRevealed",
      "decidedBy": "server",
      "acknowledgmentBudgetMs": 400,
      "budgetTestRangeMs": [
        250,
        700
      ],
      "channels": [
        "notice",
        "audio"
      ],
      "controlAffected": false,
      "queued": true
    },
    {
      "id": "areaComplete",
      "rank": 3,
      "cause": "lastStandingPatchCleared",
      "decidedBy": "server",
      "acknowledgmentBudgetMs": 400,
      "budgetTestRangeMs": [
        250,
        700
      ],
      "channels": [
        "notice",
        "audio"
      ],
      "forbiddenChannels": [
        "atPatch"
      ],
      "controlAffected": false,
      "queued": true
    },
    {
      "id": "upgradePurchased",
      "rank": 4,
      "cause": "buyPreconditionSatisfiedAtPressable",
      "decidedBy": "server",
      "acknowledgmentBudgetMs": 200,
      "budgetTestRangeMs": [
        120,
        350
      ],
      "channels": [
        "readout",
        "audio"
      ],
      "controlAffected": false,
      "queued": true,
      "effectAppliedBeforeAcknowledgment": true
    }
  ],
  "negativeBeats": 0,
  "lockoutsSeconds": 0
}
```

#### `interfaces (yours and your dependencies')`

```json
[
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
      {
        "name": "upgrade",
        "type": "UpgradeDef",
        "note": "one entry of GameConfig.Upgrades, the table itself and not its id"
      },
      {
        "name": "level",
        "type": "integer",
        "meaning": "the level the player currently HOLDS, not the level being bought. The price of the first purchase is upgradeCost(def, 0) and equals def.costBase. The price of moving from level 3 to 4 is upgradeCost(def, 3)."
      }
    ],
    "returns": "integer — floor(costBase * costGrowth ^ level)",
    "note": "Generated. Do not reimplement the curve anywhere else. A purchase is legal only while the held level is strictly below def.maxLevel, so the highest price ever charged is upgradeCost(def, maxLevel - 1). firstSession.withheld.upgradeRow lifts row i when the balance reaches upgradeCost(def_i, 0), which is the same call with the same convention."
  },
  {
    "module": "config",
    "fn": "upgradeEffect(upgrade, level)",
    "params": [
      {
        "name": "upgrade",
        "type": "UpgradeDef",
        "note": "needs base, perLevel and mode"
      },
      {
        "name": "level",
        "type": "integer",
        "meaning": "the level currently HELD, same convention as upgradeCost. Effect at level 0 is def.base, which is the pre-upgrade value: 5.5 studs for radius, 16 for speed, 1.0 for value."
      }
    ],
    "returns": "number — base + perLevel * level when mode is \"additive\", base * perLevel ^ level when mode is \"compounding\"",
    "note": "STEP 1 OF modifiers.resolutionOrder, and the only place the additive-versus-compounding question is answered. modifiers.axes[].baseFrom says of all three axes that the base is 'already inside upgradeEffect', and modifiers.baseIsNotAppliedTwice forbids multiplying it in again — so modifiers.effective calls this ONCE and multiplies FACTORS onto its result. All three shipped upgrades are additive today, which is exactly why hand-inlining looks harmless and would silently ignore a future compounding axis."
  },
  {
    "module": "config",
    "fn": "tierByWeight(roll)",
    "params": [
      {
        "name": "roll",
        "type": "number",
        "meaning": "a uniform sample in [0, 1). Not a weight, not a tier index, and not pre-scaled by the weight total — the function scales it. It must come from layout's seeded stream; rarity.ladders[overgrowth-tier].rolled is true and rolledFrom is tiers[].weight."
      }
    ],
    "returns": "(integer, TierDef) — the 1-based index into GameConfig.Tiers, then the tier table",
    "note": "The integer is what goes into Patch.tierIndex; the table is for reading value, height and shape at the point of use. Storing the table in a Patch instead of the index is forbidden by 03-state-shape: re-emitting the config would leave stale names in live patches. rarity.depthRarityChannel wants these weights shifted toward the rare end per depth and rarity.depthRarityBlocker says tiers has no depth dimension, so there is ONE weight table for all four depths and adding a second is a revision to the tiers sheet, not a branch here."
  },
  {
    "module": "protocol",
    "fn": "REMOTES",
    "params": [],
    "returns": "table — the seven channels below, keyed by name, each with its class, direction, payload and the one module that originates it. NAMES AND CLASSES, NOT INSTANCES: protocol.channel(name) returns the Instance.",
    "note": "A TABLE, NOT A CALLABLE. Exactly seven, and no more. THE TWO CLIENT-TO-SERVER NAMES ARE input.clientOriginatedRemotes VERBATIM — RequestState and BuyUpgrade — and this module's first criterion checks the two lists against each other in both directions, which is what makes 'the client surface is closed' a merge property rather than a promise. There is deliberately no clearing channel and no currency channel: the server observes clearing on a tick, so there is nothing for a client to claim, and economy.authority says no client message carries a cost, an amount or a balance. Two channels are new since wave 1 and both come from response: setComplete and areaComplete are distinct beats on the notice channel with their own budgets, and response.channelExclusivity forbids either sharing atPatch with a reveal; upgradePurchased has a 200 ms acknowledgment budget and input.verbs[buy].onPreconditionFail is silentNoOp, so a client cannot tell an accepted purchase from a dropped one by diffing snapshots. NO PAYLOAD CARRIES A PLAYER IDENTIFIER OTHER THAN THE RECIPIENT'S — social.forbidden X7 — and none carries a player-authored string, which is X9.",
    "channels": [
      {
        "name": "RequestState",
        "class": "RemoteFunction",
        "direction": "client -> server",
        "payload": "no arguments; returns one snapshot",
        "firedBy": "client-main",
        "handledBy": "server-main, which sets OnServerInvoke at boot",
        "why": "client-main may not assume the join-time push arrived, so it pulls once after its updaters are live"
      },
      {
        "name": "StateChanged",
        "class": "RemoteEvent",
        "direction": "server -> client",
        "payload": "one snapshot, exactly the fields snapshotShape() names",
        "firedBy": "server-main on join, on spawn and after a successful purchase; clearing once per tick in which anything changed",
        "handledBy": "client-main, which fans it out to every updater",
        "why": "TWO ORIGINATORS, deliberately and safely: it carries a whole snapshot rather than a delta, so a duplicate is idempotent. currency, clearedCount, found and areasFinished only ever change inside the tick, so without clearing firing it the readouts sit frozen until the next purchase."
      },
      {
        "name": "BuyUpgrade",
        "class": "RemoteEvent",
        "direction": "client -> server",
        "payload": "one upgrade id string and nothing else",
        "firedBy": "input",
        "handledBy": "server-main, wiring.onPurchase",
        "why": "one of the two client-originated messages in the game, and the only one a player's input produces — input.clientRemotesFiredByPlayerInput is exactly [BuyUpgrade]. The server prices it."
      },
      {
        "name": "FindRevealed",
        "class": "RemoteEvent",
        "direction": "server -> client",
        "payload": "one Find name string, from Patch.find",
        "firedBy": "clearing",
        "handledBy": "beats, as response.beats[findReveal]: rank 1, 300 ms acknowledgment budget, channels atPatch and audio, notice FORBIDDEN, queued, 2.5 s dwell",
        "why": "up to collection.relicsPerArea (3) times per area, per player, and never for a post-terminal area"
      },
      {
        "name": "SetCompleted",
        "class": "RemoteEvent",
        "direction": "server -> client",
        "payload": "one collection.sets[].id string",
        "firedBy": "clearing",
        "handledBy": "beats, as response.beats[setComplete]: rank 2, 400 ms budget, channels notice and audio, queued",
        "why": "exactly once per player per set, on the sixth Find of that set — response.beats[setComplete].cause is sixthFindOfSetRevealed. A separate channel from FindRevealed because response.channelExclusivity puts them on two channels and gameplay/core-loop/03 rejects carrying one on the other behind a string prefix."
      },
      {
        "name": "AreaRestored",
        "class": "RemoteEvent",
        "direction": "server -> client",
        "payload": "the area label string from layout.areaSpec(ordinal).label",
        "firedBy": "clearing",
        "handledBy": "beats, as response.beats[areaComplete]: rank 3, 400 ms budget, channels notice and audio, atPatch FORBIDDEN, queued",
        "why": "exactly once per player per area, on the latch transition only — response.beats[areaComplete].cause is lastStandingPatchCleared. A post-terminal area fires it too: endgame.survivingPayoffKinds includes areaCompletion."
      },
      {
        "name": "UpgradeApplied",
        "class": "RemoteEvent",
        "direction": "server -> client",
        "payload": "one upgrade id string and the new held level",
        "firedBy": "server-main",
        "handledBy": "beats, as response.beats[upgradePurchased]: rank 4, 200 ms budget, channels readout and audio, queued, effectAppliedBeforeAcknowledgment true",
        "why": "fired ONLY on a successful purchase. input.verbs[buy].onPreconditionFail is silentNoOp, so a failed buy produces no packet at all — which is exactly why success needs one: recovering the event by diffing two snapshots makes a 200 ms budget unmeasurable."
      }
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
      {
        "name": "name",
        "type": "string",
        "note": "a key of REMOTES, taken from that table rather than hand-typed wherever the call site can reach it"
      }
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
    "module": "beats",
    "fn": "connect(gui)",
    "params": [
      {
        "name": "gui",
        "type": "ScreenGui",
        "note": "the HUD ScreenGui the cues are drawn into"
      }
    ],
    "returns": "(snapshot) -> () — an updater, so the one unsequenced beat can be driven from a snapshot",
    "note": "Connects the four payoff channels and schedules what arrives on them as beats. THE SCHEDULE, from response: the four in response.sequencedBeats — upgradePurchased, findReveal, setComplete, areaComplete — are QUEUED, ordered by response.beats[].rank lowest first, and no two of them BEGIN closer together than response.minOnsetGapSeconds (0.6); a beat with nothing queued ahead of it plays immediately, because response.loneSequencedBeatDelayed is false. Each must begin within its own acknowledgmentBudgetMs of the packet arriving: 200 for upgradePurchased, 300 for findReveal, 400 for setComplete and areaComplete. response.channelExclusivity keeps findReveal on atPatch and setComplete and areaComplete on notice; response.beats[findReveal].forbiddenChannels bans notice and [areaComplete].forbiddenChannels bans atPatch. patchClear is response.unsequencedBeats, queued false — it is driven off the UPDATER, from a rise in snapshot.clearedCount, and it plays on arrival or not at all; response.minSustainedOnsetsPerSecond is 8 and response.onOverload is 'overlap', so eight clears in a second produce eight onsets that overlap rather than a queue or a drop. NOTHING HERE TOUCHES CONTROL: response.controlEverAffected is false, every beat's controlAffected is false and response.lockoutsSeconds is 0 — no camera move, no input lockout, no WalkSpeed write. THE CUE BODIES ARE EMPTY. What a reveal looks like, sounds like and reads as belongs to Art — VFX, Audio — Stingers and UI/UX — Feedback, none of which owns a contract key; this module fixes WHEN each one starts and on which channel, so adding one is a change to one function body and to no scheduling. response.negativeBeats is 0, so there is no failure cue to write."
  }
]
```

### Done when

1. two sequenced beats never begin closer together than response.minOnsetGapSeconds (0.6)
2. a sequenced beat with nothing ahead of it begins within its own acknowledgmentBudgetMs of the packet arriving — 300 ms for findReveal, 400 for setComplete and areaComplete, 200 for upgradePurchased
3. the ordering of two queued beats follows response.beats[].rank, lowest first
4. eight clears in one second produce eight readout onsets — response.minSustainedOnsetsPerSecond
5. nothing this module does changes WalkSpeed, the camera, or what an input does
6. a reveal and a set completion arriving on the same tick play in rank order on two different channels, never both on atPatch

---

## 10. `hud-binding` — client

**Write to:** `game/src/client/HudBinding.luau`

**Owns:** Resolve the ui-forge HUD's named readouts once and write live state into them, including which readouts are withheld.

**Depends on:** `config`, `protocol`

### Must expose

- `bind(root, gui)`

### Must not

- authoring UI structure. The HUD comes from ui-forge/briefs/hud.brief.json and this module only binds to it — pressables is the one exception in this contract and it owns four buttons and nothing else
- signalling affordability by colour alone. input.pressable.affordabilityByColourAlone is false
- using any device in firstSession.suppressionForbidden to withhold a readout: no padlock, no greyed row, no question mark, no unknown denominator, no tooltip, no lift animation, no lift sound, no new badge, and no reflow when a readout lifts
- re-suppressing a readout that has lifted, or showing the collection count as a percentage
- counting an unrevealed Find in the collection count

### Values

#### `upgrades` *(from gameplay/balance/01-upgrade-ladder.md)*

```json
[
  {
    "id": "value",
    "label": "Value",
    "blurb": "Each patch pays more",
    "costBase": 25,
    "costGrowth": 1.6,
    "maxLevel": 10,
    "perLevel": 0.25,
    "base": 1,
    "mode": "additive"
  },
  {
    "id": "radius",
    "label": "Reach",
    "blurb": "Clear a wider sweep as you walk",
    "costBase": 40,
    "costGrowth": 1.75,
    "maxLevel": 8,
    "perLevel": 1.1,
    "base": 5.5,
    "mode": "additive"
  },
  {
    "id": "speed",
    "label": "Pace",
    "blurb": "Move faster between patches",
    "costBase": 60,
    "costGrowth": 1.8,
    "maxLevel": 6,
    "perLevel": 1.6,
    "base": 16,
    "mode": "additive"
  }
]
```

#### `currency` *(from gameplay/systems/02-the-currency.md)*

```json
{
  "name": "Shard",
  "plural": "Shards",
  "icon": "shard"
}
```

#### `collection` *(from gameplay/meta/02-the-collection.md)*

```json
{
  "className": "Find",
  "classPlural": "Finds",
  "relicsPerArea": 3,
  "areasPerDepth": 2,
  "sets": [
    {
      "id": "terrace",
      "label": "Terrace",
      "depth": 1,
      "relics": [
        "Sundial",
        "Ewer",
        "Hinge",
        "Tessera",
        "Stylus",
        "Bellcast"
      ]
    },
    {
      "id": "cistern",
      "label": "Cistern",
      "depth": 2,
      "relics": [
        "Sluice",
        "Weight",
        "Siphon",
        "Chain",
        "Grate",
        "Cup"
      ]
    },
    {
      "id": "vault",
      "label": "Vault",
      "depth": 3,
      "relics": [
        "Seal",
        "Ledger",
        "Coffer",
        "Key",
        "Tally",
        "Ring"
      ]
    },
    {
      "id": "spire",
      "label": "Spire",
      "depth": 4,
      "relics": [
        "Gnomon",
        "Lens",
        "Vane",
        "Crest",
        "Orrery",
        "Finial"
      ]
    }
  ]
}
```

#### `firstSession` *(from gameplay/onboarding/02-first-minute-beats.md)*

```json
{
  "armDistanceStuds": 2,
  "armScope": "perCharacterSpawn",
  "armMeasuredOn": "server, horizontal XZ displacement of the character root from the plot spawn pivot",
  "ceilings": {
    "secondsToFirstClear": {
      "max": 3,
      "measuredFrom": "firstInput",
      "population": "all run-1 sessions in which any input occurred"
    },
    "secondsToFirstReveal": {
      "max": 10,
      "measuredFrom": "join",
      "population": "run-1 sessions whose first input arrived by second 5.0"
    }
  },
  "placement": {
    "ordering": "patches sorted ascending by XZ distance from the plot spawn point",
    "firstFindOrdinal": 1,
    "secondFindOrdinalMin": 8,
    "secondFindOrdinalMax": 40,
    "tierContrastWithinFirstOrdinals": 20,
    "spawnToNearestPatchMaxStuds": 3.5,
    "spawnToNearestPatchFormula": "movement.baseClearRadius - firstSession.armDistanceStuds"
  },
  "firstPurchaseBand": {
    "appliesTo": "the cheapest upgrade's level-1 cost",
    "minPatchesOfClearing": 10,
    "maxSecondsOfClearing": 60,
    "atStats": "base"
  },
  "beats": [
    {
      "id": "spawn",
      "bySecond": 0,
      "from": "join",
      "precondition": "character loaded and pivoted to the plot spawn point",
      "guaranteedOutcome": "stands inside standing overgrowth, tool welded and visible, at least one standing patch inside movement.baseClearRadius, clearedCount 0",
      "teaches": null
    },
    {
      "id": "firstClear",
      "bySecond": 3,
      "from": "firstInput",
      "precondition": "armed: horizontal displacement from the spawn pivot has exceeded armDistanceStuds at least once this character life",
      "guaranteedOutcome": "at least one patch clears and credits currency on the same server tick",
      "teaches": [
        "contactClearing",
        "currency"
      ]
    },
    {
      "id": "firstReveal",
      "bySecond": 10,
      "from": "join",
      "precondition": "firstClear fired on the patch carrying the placed Find",
      "guaranteedOutcome": "exactly one Find is revealed and enters the collection permanently",
      "teaches": [
        "theFind"
      ]
    },
    {
      "id": "firstOrdinaryClear",
      "bySecond": 15,
      "from": "join",
      "testRange": [
        10,
        25
      ],
      "precondition": "firstReveal has fired",
      "guaranteedOutcome": "at least three patches clear with no reveal",
      "teaches": [
        "theFind"
      ]
    },
    {
      "id": "tierContrast",
      "bySecond": 45,
      "from": "join",
      "testRange": [
        25,
        75
      ],
      "precondition": "the first 20 patches by spawn-distance ordinal hold at least two distinct tierIndex values",
      "guaranteedOutcome": "two clears with different currency credits and different silhouettes",
      "teaches": null
    },
    {
      "id": "firstSpendAffordable",
      "bySecond": 60,
      "from": "join",
      "testRange": [
        40,
        120
      ],
      "awaitingValue": "upgrades[].costBase",
      "precondition": "balance has reached the cheapest upgrade's level-1 cost",
      "guaranteedOutcome": "the cheapest upgrade row lifts and the player holds enough to buy it",
      "teaches": [
        "upgradeAxes"
      ]
    }
  ],
  "teaching": [
    {
      "concept": "contactClearing",
      "taughtBy": "beat:firstClear",
      "byBeat": "firstClear",
      "evidence": "five or more clears in the 15 s after the first, with no input gap over 3 s",
      "required": true
    },
    {
      "concept": "currency",
      "taughtBy": "beat:firstClear",
      "byBeat": "firstClear",
      "evidence": "the currency readout is non-zero and rising while the player moves",
      "required": false
    },
    {
      "concept": "theFind",
      "taughtBy": "beat:firstReveal, corrected by beat:firstOrdinaryClear",
      "byBeat": "firstOrdinaryClear",
      "evidence": "the player keeps clearing new ground after firstOrdinaryClear rather than re-walking the reveal site",
      "required": false
    },
    {
      "concept": "upgradeAxes",
      "taughtBy": "beat:firstSpendAffordable",
      "byBeat": "firstSpendAffordable",
      "evidence": "a first purchase occurs in session 1",
      "required": false
    },
    {
      "concept": "areaCompletion",
      "taughtBy": "the area progress readout moving, and the standing/cleared edge",
      "byBeat": "minute:5",
      "testRange": [
        3,
        8
      ],
      "evidence": "cleared fraction at session end exceeds the fraction at first sight of the readout",
      "required": false
    },
    {
      "concept": "sets",
      "taughtBy": "the collection surface showing one filled slot in a labelled group of six",
      "byBeat": "firstReveal+60s",
      "testRange": [
        30,
        180
      ],
      "evidence": "the collection surface is opened at least once in session 1",
      "required": false
    },
    {
      "concept": "depth",
      "taughtBy": "entering a second area through an opening that needs no explanation",
      "byBeat": "minute:6",
      "testRange": [
        3,
        12
      ],
      "evidence": "a second area is entered in session 1",
      "required": false
    }
  ],
  "neverTaught": [
    "rebirth",
    "offlineAccrual",
    "findRarity",
    "discoveryRate",
    "duplicates",
    "failure",
    "anyControl",
    "codesDailiesLeaderboardsTrading"
  ],
  "tutorialDevicesForbidden": [
    "imperativeString",
    "tipHintHowToPlayObjectiveGoalString",
    "pointerArrowChevronBeamWaypointOutlineHighlight",
    "ghostedOrPulsingControlGlyph",
    "firstRunOnlyString",
    "unrequestedModalPanelOrOverlay",
    "countdownOrTutorialChecklist",
    "voiceOverOrSpokenLine",
    "welcomeOrWelcomeBackString",
    "stringNamingAControl",
    "uncausedCameraMoveZoomOrReframe",
    "promptingSound"
  ],
  "withheld": [
    {
      "surface": "collectionCount",
      "presentAtJoin": true,
      "liftedBy": null,
      "latched": false,
      "joinValue": "0"
    },
    {
      "surface": "collectionDenominator",
      "presentAtJoin": false,
      "liftedBy": "beat:firstReveal",
      "latched": true,
      "latchSource": "the collection map is non-empty",
      "newSaveFields": 0
    },
    {
      "surface": "currencyReadout",
      "presentAtJoin": true,
      "liftedBy": null,
      "latched": false,
      "joinValue": "0"
    },
    {
      "surface": "upgradeRow",
      "perRow": true,
      "presentAtJoin": false,
      "liftedBy": "balance has reached upgrades[i] level-1 cost",
      "latched": true,
      "latchSource": "one persisted boolean per row",
      "newSaveFields": 3
    },
    {
      "surface": "areaProgress",
      "presentAtJoin": true,
      "liftedBy": null,
      "latched": false,
      "joinValue": "0%"
    },
    {
      "surface": "collectionPanel",
      "presentAtJoin": false,
      "liftedBy": "beat:firstReveal",
      "latched": true,
      "latchSource": "the collection map is non-empty",
      "newSaveFields": 0
    }
  ],
  "suppressionForbidden": [
    "padlockOrLockGlyph",
    "greyedOrDimmedRow",
    "questionMarkPlaceholder",
    "unknownDenominatorForm",
    "explanatoryTooltip",
    "liftAnimation",
    "liftSound",
    "newBadgeOrDot",
    "reSuppression",
    "unrevealedFindsInCount",
    "percentFormOfCollectionCount",
    "reflowOnLift"
  ],
  "permittedConfusion": [
    "patchTier",
    "costGrowth",
    "depthMeaning",
    "setBonus",
    "collectionEnd",
    "otherPlayersAreReal",
    "persistence",
    "absenceOfRebirthAndIdle"
  ]
}
```

#### `interfaces (yours and your dependencies')`

```json
[
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
      {
        "name": "upgrade",
        "type": "UpgradeDef",
        "note": "one entry of GameConfig.Upgrades, the table itself and not its id"
      },
      {
        "name": "level",
        "type": "integer",
        "meaning": "the level the player currently HOLDS, not the level being bought. The price of the first purchase is upgradeCost(def, 0) and equals def.costBase. The price of moving from level 3 to 4 is upgradeCost(def, 3)."
      }
    ],
    "returns": "integer — floor(costBase * costGrowth ^ level)",
    "note": "Generated. Do not reimplement the curve anywhere else. A purchase is legal only while the held level is strictly below def.maxLevel, so the highest price ever charged is upgradeCost(def, maxLevel - 1). firstSession.withheld.upgradeRow lifts row i when the balance reaches upgradeCost(def_i, 0), which is the same call with the same convention."
  },
  {
    "module": "config",
    "fn": "upgradeEffect(upgrade, level)",
    "params": [
      {
        "name": "upgrade",
        "type": "UpgradeDef",
        "note": "needs base, perLevel and mode"
      },
      {
        "name": "level",
        "type": "integer",
        "meaning": "the level currently HELD, same convention as upgradeCost. Effect at level 0 is def.base, which is the pre-upgrade value: 5.5 studs for radius, 16 for speed, 1.0 for value."
      }
    ],
    "returns": "number — base + perLevel * level when mode is \"additive\", base * perLevel ^ level when mode is \"compounding\"",
    "note": "STEP 1 OF modifiers.resolutionOrder, and the only place the additive-versus-compounding question is answered. modifiers.axes[].baseFrom says of all three axes that the base is 'already inside upgradeEffect', and modifiers.baseIsNotAppliedTwice forbids multiplying it in again — so modifiers.effective calls this ONCE and multiplies FACTORS onto its result. All three shipped upgrades are additive today, which is exactly why hand-inlining looks harmless and would silently ignore a future compounding axis."
  },
  {
    "module": "config",
    "fn": "tierByWeight(roll)",
    "params": [
      {
        "name": "roll",
        "type": "number",
        "meaning": "a uniform sample in [0, 1). Not a weight, not a tier index, and not pre-scaled by the weight total — the function scales it. It must come from layout's seeded stream; rarity.ladders[overgrowth-tier].rolled is true and rolledFrom is tiers[].weight."
      }
    ],
    "returns": "(integer, TierDef) — the 1-based index into GameConfig.Tiers, then the tier table",
    "note": "The integer is what goes into Patch.tierIndex; the table is for reading value, height and shape at the point of use. Storing the table in a Patch instead of the index is forbidden by 03-state-shape: re-emitting the config would leave stale names in live patches. rarity.depthRarityChannel wants these weights shifted toward the rare end per depth and rarity.depthRarityBlocker says tiers has no depth dimension, so there is ONE weight table for all four depths and adding a second is a revision to the tiers sheet, not a branch here."
  },
  {
    "module": "protocol",
    "fn": "REMOTES",
    "params": [],
    "returns": "table — the seven channels below, keyed by name, each with its class, direction, payload and the one module that originates it. NAMES AND CLASSES, NOT INSTANCES: protocol.channel(name) returns the Instance.",
    "note": "A TABLE, NOT A CALLABLE. Exactly seven, and no more. THE TWO CLIENT-TO-SERVER NAMES ARE input.clientOriginatedRemotes VERBATIM — RequestState and BuyUpgrade — and this module's first criterion checks the two lists against each other in both directions, which is what makes 'the client surface is closed' a merge property rather than a promise. There is deliberately no clearing channel and no currency channel: the server observes clearing on a tick, so there is nothing for a client to claim, and economy.authority says no client message carries a cost, an amount or a balance. Two channels are new since wave 1 and both come from response: setComplete and areaComplete are distinct beats on the notice channel with their own budgets, and response.channelExclusivity forbids either sharing atPatch with a reveal; upgradePurchased has a 200 ms acknowledgment budget and input.verbs[buy].onPreconditionFail is silentNoOp, so a client cannot tell an accepted purchase from a dropped one by diffing snapshots. NO PAYLOAD CARRIES A PLAYER IDENTIFIER OTHER THAN THE RECIPIENT'S — social.forbidden X7 — and none carries a player-authored string, which is X9.",
    "channels": [
      {
        "name": "RequestState",
        "class": "RemoteFunction",
        "direction": "client -> server",
        "payload": "no arguments; returns one snapshot",
        "firedBy": "client-main",
        "handledBy": "server-main, which sets OnServerInvoke at boot",
        "why": "client-main may not assume the join-time push arrived, so it pulls once after its updaters are live"
      },
      {
        "name": "StateChanged",
        "class": "RemoteEvent",
        "direction": "server -> client",
        "payload": "one snapshot, exactly the fields snapshotShape() names",
        "firedBy": "server-main on join, on spawn and after a successful purchase; clearing once per tick in which anything changed",
        "handledBy": "client-main, which fans it out to every updater",
        "why": "TWO ORIGINATORS, deliberately and safely: it carries a whole snapshot rather than a delta, so a duplicate is idempotent. currency, clearedCount, found and areasFinished only ever change inside the tick, so without clearing firing it the readouts sit frozen until the next purchase."
      },
      {
        "name": "BuyUpgrade",
        "class": "RemoteEvent",
        "direction": "client -> server",
        "payload": "one upgrade id string and nothing else",
        "firedBy": "input",
        "handledBy": "server-main, wiring.onPurchase",
        "why": "one of the two client-originated messages in the game, and the only one a player's input produces — input.clientRemotesFiredByPlayerInput is exactly [BuyUpgrade]. The server prices it."
      },
      {
        "name": "FindRevealed",
        "class": "RemoteEvent",
        "direction": "server -> client",
        "payload": "one Find name string, from Patch.find",
        "firedBy": "clearing",
        "handledBy": "beats, as response.beats[findReveal]: rank 1, 300 ms acknowledgment budget, channels atPatch and audio, notice FORBIDDEN, queued, 2.5 s dwell",
        "why": "up to collection.relicsPerArea (3) times per area, per player, and never for a post-terminal area"
      },
      {
        "name": "SetCompleted",
        "class": "RemoteEvent",
        "direction": "server -> client",
        "payload": "one collection.sets[].id string",
        "firedBy": "clearing",
        "handledBy": "beats, as response.beats[setComplete]: rank 2, 400 ms budget, channels notice and audio, queued",
        "why": "exactly once per player per set, on the sixth Find of that set — response.beats[setComplete].cause is sixthFindOfSetRevealed. A separate channel from FindRevealed because response.channelExclusivity puts them on two channels and gameplay/core-loop/03 rejects carrying one on the other behind a string prefix."
      },
      {
        "name": "AreaRestored",
        "class": "RemoteEvent",
        "direction": "server -> client",
        "payload": "the area label string from layout.areaSpec(ordinal).label",
        "firedBy": "clearing",
        "handledBy": "beats, as response.beats[areaComplete]: rank 3, 400 ms budget, channels notice and audio, atPatch FORBIDDEN, queued",
        "why": "exactly once per player per area, on the latch transition only — response.beats[areaComplete].cause is lastStandingPatchCleared. A post-terminal area fires it too: endgame.survivingPayoffKinds includes areaCompletion."
      },
      {
        "name": "UpgradeApplied",
        "class": "RemoteEvent",
        "direction": "server -> client",
        "payload": "one upgrade id string and the new held level",
        "firedBy": "server-main",
        "handledBy": "beats, as response.beats[upgradePurchased]: rank 4, 200 ms budget, channels readout and audio, queued, effectAppliedBeforeAcknowledgment true",
        "why": "fired ONLY on a successful purchase. input.verbs[buy].onPreconditionFail is silentNoOp, so a failed buy produces no packet at all — which is exactly why success needs one: recovering the event by diffing two snapshots makes a 200 ms budget unmeasurable."
      }
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
      {
        "name": "name",
        "type": "string",
        "note": "a key of REMOTES, taken from that table rather than hand-typed wherever the call site can reach it"
      }
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
    "module": "hud-binding",
    "fn": "bind(root, gui)",
    "params": [
      {
        "name": "root",
        "type": "GuiObject",
        "note": "what UIBuilder.build returned: the HUD's Root frame"
      },
      {
        "name": "gui",
        "type": "ScreenGui",
        "note": "the ScreenGui root sits in, for screen-level state such as Enabled"
      }
    ],
    "returns": "(snapshot) -> () — an updater the caller invokes with every snapshot",
    "note": "Resolves its node paths ONCE at bind time and closes over them, so an unresolved name warns once rather than on every snapshot. The node paths are fixed by the emitted screen: Cluster_topRight.Readout_SHARDS.ReadoutValue.Text takes the balance; Cluster_topLeft.Readout_RELICS.ReadoutValue.Text takes the collection count; Cluster_bottomRight.Readout_<n><LABEL UPPERCASED>.ReadoutValue.Text takes \"Lv <held level>  ·  <config.upgradeCost(def, held level)>\" for the nth entry of upgrades; Cluster_bottomLeft.ProgressGroup.BarLabel.Text takes \"<snapshot.areaLabel uppercased> — <percent>% CLEAR\"; and ProgressGroup.Bar.BarFill.Size takes UDim2.fromScale(clearedCount / snapshot.areaPatchCount, 1), tweened rather than set. WITHHOLDING, per firstSession.withheld, and every rule about HOW comes from firstSession.suppressionForbidden: the collection count is present at join reading \"0\" with NO DENOMINATOR, and the denominator appears at the first reveal, latched on 'the collection map is non-empty', with no lift animation, no lift sound, no new badge and NO REFLOW of anything around it; an upgrade row is absent until snapshot.rowsRevealed says otherwise, and is never re-suppressed; the currency readout and the area progress are present at join reading 0 and 0%. No padlock, no greyed row, no question mark, no unknown-denominator form, no explanatory tooltip and no percent form of the collection count. Affordability is signalled by text as well as colour — input.pressable.affordabilityByColourAlone is false. Authors no structure and creates no Instance except a Tween."
  }
]
```

### Done when

1. at join, a new player sees the currency readout at 0, the collection count at 0 with NO denominator, and the area progress at 0% — firstSession.withheld, joinValue by joinValue
2. the collection denominator and the collection panel appear at the first reveal and never disappear again
3. an upgrade row appears when rowsRevealed says so, with no animation, no sound and no reflow of the rows around it
4. a node name that no longer resolves produces one warning at bind time rather than a silent no-op on every snapshot
5. affordability is readable with colour removed
6. the area progress readout names the live area from snapshot.areaLabel and draws its bar from clearedCount over snapshot.areaPatchCount — this module reads no area table at all, which is why those two fields are on the wire

---

## 11. `index-screen` — client

**Write to:** `game/src/client/IndexScreen.luau`

**Owns:** The collection surface: which Finds are held, grouped by set, opened and closed by the index pressable.

**Depends on:** `config`, `protocol`

### Must expose

- `bind(gui)`
- `toggle()`

### Must not

- showing a rarity colour, frame, glow, border, sparkle or badge on a slot, or any per-Find grade. rarity.forbidden lists all of them and rarity.findRarityField is null
- showing anything about a Find beyond its name and whether it is held. discovery.record.forbiddenFields bans count, duplicates, timesFound, timestamp, condition, quality, variant, favourite, seen, isNew, equipped, sortIndex and tradeable
- existing before the first reveal. firstSession.withheld.collectionPanel is presentAtJoin false, liftedBy beat:firstReveal, latched on 'the collection map is non-empty'
- using a padlock, a greyed slot, a question-mark placeholder or an unknown denominator for an unfound name — firstSession.suppressionForbidden
- naming or pricing a product — products.F19
- showing another player anything — social.forbidden X6 and X7

### Values

#### `collection` *(from gameplay/meta/02-the-collection.md)*

```json
{
  "className": "Find",
  "classPlural": "Finds",
  "relicsPerArea": 3,
  "areasPerDepth": 2,
  "sets": [
    {
      "id": "terrace",
      "label": "Terrace",
      "depth": 1,
      "relics": [
        "Sundial",
        "Ewer",
        "Hinge",
        "Tessera",
        "Stylus",
        "Bellcast"
      ]
    },
    {
      "id": "cistern",
      "label": "Cistern",
      "depth": 2,
      "relics": [
        "Sluice",
        "Weight",
        "Siphon",
        "Chain",
        "Grate",
        "Cup"
      ]
    },
    {
      "id": "vault",
      "label": "Vault",
      "depth": 3,
      "relics": [
        "Seal",
        "Ledger",
        "Coffer",
        "Key",
        "Tally",
        "Ring"
      ]
    },
    {
      "id": "spire",
      "label": "Spire",
      "depth": 4,
      "relics": [
        "Gnomon",
        "Lens",
        "Vane",
        "Crest",
        "Orrery",
        "Finial"
      ]
    }
  ]
}
```

#### `rarity` *(from gameplay/systems/03-rarity-ladders.md)*

```json
{
  "gradedLadderCount": 1,
  "ladders": [
    {
      "id": "overgrowth-tier",
      "kind": "graded",
      "sourceField": "patch.tierIndex",
      "definedBy": "tiers",
      "rungs": 4,
      "rolled": true,
      "rolledFrom": "tiers[].weight",
      "perObjectVisualGrade": true,
      "legibilityChannel": "silhouette first, colour second",
      "affects": [
        "the per-clear payout, via economy.faucets[patch-clear]"
      ]
    },
    {
      "id": "find-set",
      "kind": "ordinal",
      "sourceField": "collection.sets[].index",
      "definedBy": "collection",
      "rungs": 4,
      "rolled": false,
      "perObjectVisualGrade": false,
      "legibilityChannel": "the set heading on the collection surface, and nothing on the object",
      "affects": []
    }
  ],
  "findRarityField": null,
  "findPlacementReadsTier": false,
  "findPlacementWeighting": "blind to tier: the probability a patch carries a Find is independent of its tierIndex. Whether that choice is spatially uniform or spread is content-structure work's, not this key's.",
  "depthRarityChannel": "tiers[].weight, shifted toward the rare end per depth",
  "depthRarityBlocker": "tiers has no depth dimension; adding one is a revision to 01-overgrowth-tiers, not a change made here",
  "forbidden": [
    "a rarity, grade, tier, star, quality or condition field on a Find",
    "a rarity colour, frame, glow, border, sparkle or badge on a collection slot",
    "a rarer patch hiding a Find more often than a common patch does",
    "a rarer patch hiding a rarer Find",
    "a fifth overgrowth tier added to signal depth",
    "a per-depth recolour of the four tiers that changes their silhouettes",
    "a reveal cue that varies by which set the Find belongs to",
    "any rarity read a player must learn in addition to the four silhouettes"
  ]
}
```

#### `discovery` *(from gameplay/systems/05-the-find-ledger.md)*

```json
{
  "pool": {
    "scope": "per player, per depth",
    "source": "collection.sets[depth].relics",
    "replacement": "without",
    "areasPartitionTheSet": true,
    "invariant": "collection.relicsPerArea * collection.areasPerDepth == collection.sets[depth].relics.length",
    "invariantHoldsToday": "6 * 1 == 6; this rule changes no shipped behaviour at current values",
    "placementIsPlayerIndependent": true,
    "placementRule": "the layout seed alone picks which patch indices carry a Find; the area's slice fills those slots in order. Neither the player's found set nor cleared set is an input to placement.",
    "placementDomain": "uncleared patches only — derived, not filtered: clearing a patch reveals its Find, so an unfound Find's slot is never a cleared patch",
    "stableAcrossRejoin": true,
    "exclusionKey": "ever-found; it governs what a slot yields, never where a slot is",
    "spatialDistribution": "content-structure work's, not decided here",
    "tierWeighting": "none, per the rarity key",
    "guaranteedException": "onboarding's first Find sits on the patch nearest the plot origin, from the same seed, and consumes the first slot of depth 1's slice"
  },
  "record": {
    "keyedBy": "the Find's name, from collection.sets[].relics[].name",
    "entries": "sum(collection.sets[].relics.length)",
    "fields": [
      {
        "name": "found",
        "type": "boolean",
        "default": false,
        "persisted": true,
        "writtenBy": "server, at the instant the hiding patch clears",
        "clearedBy": "nothing, ever"
      }
    ],
    "derived": [
      "foundCount = the number of true entries",
      "setComplete(setId) = every name in that set is true",
      "collectionComplete = every name in collection is true",
      "newThisSession = compared against a snapshot taken at join, held in memory, never saved"
    ],
    "forbiddenFields": [
      "count",
      "duplicates",
      "timesFound",
      "timestamp",
      "foundAt",
      "depthFoundAt",
      "condition",
      "quality",
      "variant",
      "restoredLevel",
      "favourite",
      "seen",
      "isNew",
      "equipped",
      "sortIndex",
      "tradeable"
    ],
    "growth": "one boolean per name in collection, and nothing else; the record never grows with play"
  },
  "repeat": {
    "possible": false,
    "cause": "only a layout that assigns a name outside its area's slice, which is a build defect and not a game state",
    "runtimeBehaviour": "the patch hides nothing, the server logs a warning naming the Find and the patch index, the reveal channel does not fire",
    "silentDiscardRatified": false,
    "playerFacing": "nothing, and no player can reach this branch; it is a defect path, not the silent duplicate case core-loop/03 forbids"
  },
  "luckShaped": false,
  "luckShapedDetail": "the partition is fixed and placement is seed-derived, so the SET of Finds a depth yields is fully determined. There is no drop rate, so there is no rate for a multiplier to act on.",
  "theOnlyRandomQuantities": [
    "which patch indices the seed picks to carry a slice",
    "the order in which a depth's slices are assigned to its areas"
  ],
  "sellableLuck": null,
  "persistenceRequirement": "one boolean per name in collection and nothing else; the one part of save data bounded by design rather than by collapse"
}
```

#### `input` *(from gameplay/mechanics/02-verb-roster.md)*

```json
{
  "closed": true,
  "gameBoundInputClasses": [
    "pressable"
  ],
  "gameDrawnPressables": 4,
  "travelRequiredToPurchase": "none",
  "clientOriginatedRemotes": [
    "RequestState",
    "BuyUpgrade"
  ],
  "clientRemotesFiredByPlayerInput": [
    "BuyUpgrade"
  ],
  "verbs": [
    {
      "id": "move",
      "trigger": "platformMovementControl",
      "boundByGame": false,
      "kind": "continuousDirectional",
      "precondition": "characterSpawned",
      "adjudicatedBy": "client",
      "devices": [
        "touch",
        "keyboard",
        "gamepad"
      ]
    },
    {
      "id": "look",
      "trigger": "platformCameraControl",
      "boundByGame": false,
      "kind": "continuousFreeLook",
      "precondition": "none",
      "adjudicatedBy": "client",
      "devices": [
        "touch",
        "keyboard",
        "gamepad"
      ]
    },
    {
      "id": "jump",
      "trigger": "platformJumpControl",
      "boundByGame": false,
      "kind": "discreteImpulse",
      "precondition": "onGround",
      "adjudicatedBy": "client",
      "devices": [
        "touch",
        "keyboard",
        "gamepad"
      ]
    },
    {
      "id": "buy",
      "trigger": "gamePressable",
      "pressableRole": "purchase",
      "boundByGame": true,
      "kind": "discreteSelect",
      "precondition": "balance >= cost && level < maxLevel",
      "onPreconditionFail": "silentNoOp",
      "adjudicatedBy": "server",
      "devices": [
        "touch",
        "keyboard",
        "gamepad"
      ]
    },
    {
      "id": "openIndex",
      "trigger": "gamePressable",
      "pressableRole": "index",
      "boundByGame": true,
      "kind": "discreteSelect",
      "precondition": "none",
      "adjudicatedBy": "client",
      "devices": [
        "touch",
        "keyboard",
        "gamepad"
      ]
    }
  ],
  "pressable": {
    "roles": [
      {
        "role": "purchase",
        "count": 3,
        "boundTo": "upgrades declaration order",
        "adjudicatedBy": "server",
        "persistent": true
      },
      {
        "role": "index",
        "count": 1,
        "adjudicatedBy": "client",
        "persistent": true
      }
    ],
    "activationsPerPress": 1,
    "debounceSeconds": 0.35,
    "holdRequired": false,
    "chordRequired": false,
    "rejectionCueOnFailedPrecondition": "none",
    "affordabilityByColourAlone": false,
    "minTouchTargetRule": "notSmallerThanPlatformJumpButton",
    "mayOverlapPlatformControlRegions": false,
    "gamepadSelectable": true,
    "keyboardAcceleratorAllowed": true,
    "keyboardAcceleratorRequired": false,
    "indexScreenSuspendsMovement": true
  },
  "worldObjectsTriggeringAVerb": 0
}
```

#### `firstSession` *(from gameplay/onboarding/02-first-minute-beats.md)*

```json
{
  "armDistanceStuds": 2,
  "armScope": "perCharacterSpawn",
  "armMeasuredOn": "server, horizontal XZ displacement of the character root from the plot spawn pivot",
  "ceilings": {
    "secondsToFirstClear": {
      "max": 3,
      "measuredFrom": "firstInput",
      "population": "all run-1 sessions in which any input occurred"
    },
    "secondsToFirstReveal": {
      "max": 10,
      "measuredFrom": "join",
      "population": "run-1 sessions whose first input arrived by second 5.0"
    }
  },
  "placement": {
    "ordering": "patches sorted ascending by XZ distance from the plot spawn point",
    "firstFindOrdinal": 1,
    "secondFindOrdinalMin": 8,
    "secondFindOrdinalMax": 40,
    "tierContrastWithinFirstOrdinals": 20,
    "spawnToNearestPatchMaxStuds": 3.5,
    "spawnToNearestPatchFormula": "movement.baseClearRadius - firstSession.armDistanceStuds"
  },
  "firstPurchaseBand": {
    "appliesTo": "the cheapest upgrade's level-1 cost",
    "minPatchesOfClearing": 10,
    "maxSecondsOfClearing": 60,
    "atStats": "base"
  },
  "beats": [
    {
      "id": "spawn",
      "bySecond": 0,
      "from": "join",
      "precondition": "character loaded and pivoted to the plot spawn point",
      "guaranteedOutcome": "stands inside standing overgrowth, tool welded and visible, at least one standing patch inside movement.baseClearRadius, clearedCount 0",
      "teaches": null
    },
    {
      "id": "firstClear",
      "bySecond": 3,
      "from": "firstInput",
      "precondition": "armed: horizontal displacement from the spawn pivot has exceeded armDistanceStuds at least once this character life",
      "guaranteedOutcome": "at least one patch clears and credits currency on the same server tick",
      "teaches": [
        "contactClearing",
        "currency"
      ]
    },
    {
      "id": "firstReveal",
      "bySecond": 10,
      "from": "join",
      "precondition": "firstClear fired on the patch carrying the placed Find",
      "guaranteedOutcome": "exactly one Find is revealed and enters the collection permanently",
      "teaches": [
        "theFind"
      ]
    },
    {
      "id": "firstOrdinaryClear",
      "bySecond": 15,
      "from": "join",
      "testRange": [
        10,
        25
      ],
      "precondition": "firstReveal has fired",
      "guaranteedOutcome": "at least three patches clear with no reveal",
      "teaches": [
        "theFind"
      ]
    },
    {
      "id": "tierContrast",
      "bySecond": 45,
      "from": "join",
      "testRange": [
        25,
        75
      ],
      "precondition": "the first 20 patches by spawn-distance ordinal hold at least two distinct tierIndex values",
      "guaranteedOutcome": "two clears with different currency credits and different silhouettes",
      "teaches": null
    },
    {
      "id": "firstSpendAffordable",
      "bySecond": 60,
      "from": "join",
      "testRange": [
        40,
        120
      ],
      "awaitingValue": "upgrades[].costBase",
      "precondition": "balance has reached the cheapest upgrade's level-1 cost",
      "guaranteedOutcome": "the cheapest upgrade row lifts and the player holds enough to buy it",
      "teaches": [
        "upgradeAxes"
      ]
    }
  ],
  "teaching": [
    {
      "concept": "contactClearing",
      "taughtBy": "beat:firstClear",
      "byBeat": "firstClear",
      "evidence": "five or more clears in the 15 s after the first, with no input gap over 3 s",
      "required": true
    },
    {
      "concept": "currency",
      "taughtBy": "beat:firstClear",
      "byBeat": "firstClear",
      "evidence": "the currency readout is non-zero and rising while the player moves",
      "required": false
    },
    {
      "concept": "theFind",
      "taughtBy": "beat:firstReveal, corrected by beat:firstOrdinaryClear",
      "byBeat": "firstOrdinaryClear",
      "evidence": "the player keeps clearing new ground after firstOrdinaryClear rather than re-walking the reveal site",
      "required": false
    },
    {
      "concept": "upgradeAxes",
      "taughtBy": "beat:firstSpendAffordable",
      "byBeat": "firstSpendAffordable",
      "evidence": "a first purchase occurs in session 1",
      "required": false
    },
    {
      "concept": "areaCompletion",
      "taughtBy": "the area progress readout moving, and the standing/cleared edge",
      "byBeat": "minute:5",
      "testRange": [
        3,
        8
      ],
      "evidence": "cleared fraction at session end exceeds the fraction at first sight of the readout",
      "required": false
    },
    {
      "concept": "sets",
      "taughtBy": "the collection surface showing one filled slot in a labelled group of six",
      "byBeat": "firstReveal+60s",
      "testRange": [
        30,
        180
      ],
      "evidence": "the collection surface is opened at least once in session 1",
      "required": false
    },
    {
      "concept": "depth",
      "taughtBy": "entering a second area through an opening that needs no explanation",
      "byBeat": "minute:6",
      "testRange": [
        3,
        12
      ],
      "evidence": "a second area is entered in session 1",
      "required": false
    }
  ],
  "neverTaught": [
    "rebirth",
    "offlineAccrual",
    "findRarity",
    "discoveryRate",
    "duplicates",
    "failure",
    "anyControl",
    "codesDailiesLeaderboardsTrading"
  ],
  "tutorialDevicesForbidden": [
    "imperativeString",
    "tipHintHowToPlayObjectiveGoalString",
    "pointerArrowChevronBeamWaypointOutlineHighlight",
    "ghostedOrPulsingControlGlyph",
    "firstRunOnlyString",
    "unrequestedModalPanelOrOverlay",
    "countdownOrTutorialChecklist",
    "voiceOverOrSpokenLine",
    "welcomeOrWelcomeBackString",
    "stringNamingAControl",
    "uncausedCameraMoveZoomOrReframe",
    "promptingSound"
  ],
  "withheld": [
    {
      "surface": "collectionCount",
      "presentAtJoin": true,
      "liftedBy": null,
      "latched": false,
      "joinValue": "0"
    },
    {
      "surface": "collectionDenominator",
      "presentAtJoin": false,
      "liftedBy": "beat:firstReveal",
      "latched": true,
      "latchSource": "the collection map is non-empty",
      "newSaveFields": 0
    },
    {
      "surface": "currencyReadout",
      "presentAtJoin": true,
      "liftedBy": null,
      "latched": false,
      "joinValue": "0"
    },
    {
      "surface": "upgradeRow",
      "perRow": true,
      "presentAtJoin": false,
      "liftedBy": "balance has reached upgrades[i] level-1 cost",
      "latched": true,
      "latchSource": "one persisted boolean per row",
      "newSaveFields": 3
    },
    {
      "surface": "areaProgress",
      "presentAtJoin": true,
      "liftedBy": null,
      "latched": false,
      "joinValue": "0%"
    },
    {
      "surface": "collectionPanel",
      "presentAtJoin": false,
      "liftedBy": "beat:firstReveal",
      "latched": true,
      "latchSource": "the collection map is non-empty",
      "newSaveFields": 0
    }
  ],
  "suppressionForbidden": [
    "padlockOrLockGlyph",
    "greyedOrDimmedRow",
    "questionMarkPlaceholder",
    "unknownDenominatorForm",
    "explanatoryTooltip",
    "liftAnimation",
    "liftSound",
    "newBadgeOrDot",
    "reSuppression",
    "unrevealedFindsInCount",
    "percentFormOfCollectionCount",
    "reflowOnLift"
  ],
  "permittedConfusion": [
    "patchTier",
    "costGrowth",
    "depthMeaning",
    "setBonus",
    "collectionEnd",
    "otherPlayersAreReal",
    "persistence",
    "absenceOfRebirthAndIdle"
  ]
}
```

#### `interfaces (yours and your dependencies')`

```json
[
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
      {
        "name": "upgrade",
        "type": "UpgradeDef",
        "note": "one entry of GameConfig.Upgrades, the table itself and not its id"
      },
      {
        "name": "level",
        "type": "integer",
        "meaning": "the level the player currently HOLDS, not the level being bought. The price of the first purchase is upgradeCost(def, 0) and equals def.costBase. The price of moving from level 3 to 4 is upgradeCost(def, 3)."
      }
    ],
    "returns": "integer — floor(costBase * costGrowth ^ level)",
    "note": "Generated. Do not reimplement the curve anywhere else. A purchase is legal only while the held level is strictly below def.maxLevel, so the highest price ever charged is upgradeCost(def, maxLevel - 1). firstSession.withheld.upgradeRow lifts row i when the balance reaches upgradeCost(def_i, 0), which is the same call with the same convention."
  },
  {
    "module": "config",
    "fn": "upgradeEffect(upgrade, level)",
    "params": [
      {
        "name": "upgrade",
        "type": "UpgradeDef",
        "note": "needs base, perLevel and mode"
      },
      {
        "name": "level",
        "type": "integer",
        "meaning": "the level currently HELD, same convention as upgradeCost. Effect at level 0 is def.base, which is the pre-upgrade value: 5.5 studs for radius, 16 for speed, 1.0 for value."
      }
    ],
    "returns": "number — base + perLevel * level when mode is \"additive\", base * perLevel ^ level when mode is \"compounding\"",
    "note": "STEP 1 OF modifiers.resolutionOrder, and the only place the additive-versus-compounding question is answered. modifiers.axes[].baseFrom says of all three axes that the base is 'already inside upgradeEffect', and modifiers.baseIsNotAppliedTwice forbids multiplying it in again — so modifiers.effective calls this ONCE and multiplies FACTORS onto its result. All three shipped upgrades are additive today, which is exactly why hand-inlining looks harmless and would silently ignore a future compounding axis."
  },
  {
    "module": "config",
    "fn": "tierByWeight(roll)",
    "params": [
      {
        "name": "roll",
        "type": "number",
        "meaning": "a uniform sample in [0, 1). Not a weight, not a tier index, and not pre-scaled by the weight total — the function scales it. It must come from layout's seeded stream; rarity.ladders[overgrowth-tier].rolled is true and rolledFrom is tiers[].weight."
      }
    ],
    "returns": "(integer, TierDef) — the 1-based index into GameConfig.Tiers, then the tier table",
    "note": "The integer is what goes into Patch.tierIndex; the table is for reading value, height and shape at the point of use. Storing the table in a Patch instead of the index is forbidden by 03-state-shape: re-emitting the config would leave stale names in live patches. rarity.depthRarityChannel wants these weights shifted toward the rare end per depth and rarity.depthRarityBlocker says tiers has no depth dimension, so there is ONE weight table for all four depths and adding a second is a revision to the tiers sheet, not a branch here."
  },
  {
    "module": "protocol",
    "fn": "REMOTES",
    "params": [],
    "returns": "table — the seven channels below, keyed by name, each with its class, direction, payload and the one module that originates it. NAMES AND CLASSES, NOT INSTANCES: protocol.channel(name) returns the Instance.",
    "note": "A TABLE, NOT A CALLABLE. Exactly seven, and no more. THE TWO CLIENT-TO-SERVER NAMES ARE input.clientOriginatedRemotes VERBATIM — RequestState and BuyUpgrade — and this module's first criterion checks the two lists against each other in both directions, which is what makes 'the client surface is closed' a merge property rather than a promise. There is deliberately no clearing channel and no currency channel: the server observes clearing on a tick, so there is nothing for a client to claim, and economy.authority says no client message carries a cost, an amount or a balance. Two channels are new since wave 1 and both come from response: setComplete and areaComplete are distinct beats on the notice channel with their own budgets, and response.channelExclusivity forbids either sharing atPatch with a reveal; upgradePurchased has a 200 ms acknowledgment budget and input.verbs[buy].onPreconditionFail is silentNoOp, so a client cannot tell an accepted purchase from a dropped one by diffing snapshots. NO PAYLOAD CARRIES A PLAYER IDENTIFIER OTHER THAN THE RECIPIENT'S — social.forbidden X7 — and none carries a player-authored string, which is X9.",
    "channels": [
      {
        "name": "RequestState",
        "class": "RemoteFunction",
        "direction": "client -> server",
        "payload": "no arguments; returns one snapshot",
        "firedBy": "client-main",
        "handledBy": "server-main, which sets OnServerInvoke at boot",
        "why": "client-main may not assume the join-time push arrived, so it pulls once after its updaters are live"
      },
      {
        "name": "StateChanged",
        "class": "RemoteEvent",
        "direction": "server -> client",
        "payload": "one snapshot, exactly the fields snapshotShape() names",
        "firedBy": "server-main on join, on spawn and after a successful purchase; clearing once per tick in which anything changed",
        "handledBy": "client-main, which fans it out to every updater",
        "why": "TWO ORIGINATORS, deliberately and safely: it carries a whole snapshot rather than a delta, so a duplicate is idempotent. currency, clearedCount, found and areasFinished only ever change inside the tick, so without clearing firing it the readouts sit frozen until the next purchase."
      },
      {
        "name": "BuyUpgrade",
        "class": "RemoteEvent",
        "direction": "client -> server",
        "payload": "one upgrade id string and nothing else",
        "firedBy": "input",
        "handledBy": "server-main, wiring.onPurchase",
        "why": "one of the two client-originated messages in the game, and the only one a player's input produces — input.clientRemotesFiredByPlayerInput is exactly [BuyUpgrade]. The server prices it."
      },
      {
        "name": "FindRevealed",
        "class": "RemoteEvent",
        "direction": "server -> client",
        "payload": "one Find name string, from Patch.find",
        "firedBy": "clearing",
        "handledBy": "beats, as response.beats[findReveal]: rank 1, 300 ms acknowledgment budget, channels atPatch and audio, notice FORBIDDEN, queued, 2.5 s dwell",
        "why": "up to collection.relicsPerArea (3) times per area, per player, and never for a post-terminal area"
      },
      {
        "name": "SetCompleted",
        "class": "RemoteEvent",
        "direction": "server -> client",
        "payload": "one collection.sets[].id string",
        "firedBy": "clearing",
        "handledBy": "beats, as response.beats[setComplete]: rank 2, 400 ms budget, channels notice and audio, queued",
        "why": "exactly once per player per set, on the sixth Find of that set — response.beats[setComplete].cause is sixthFindOfSetRevealed. A separate channel from FindRevealed because response.channelExclusivity puts them on two channels and gameplay/core-loop/03 rejects carrying one on the other behind a string prefix."
      },
      {
        "name": "AreaRestored",
        "class": "RemoteEvent",
        "direction": "server -> client",
        "payload": "the area label string from layout.areaSpec(ordinal).label",
        "firedBy": "clearing",
        "handledBy": "beats, as response.beats[areaComplete]: rank 3, 400 ms budget, channels notice and audio, atPatch FORBIDDEN, queued",
        "why": "exactly once per player per area, on the latch transition only — response.beats[areaComplete].cause is lastStandingPatchCleared. A post-terminal area fires it too: endgame.survivingPayoffKinds includes areaCompletion."
      },
      {
        "name": "UpgradeApplied",
        "class": "RemoteEvent",
        "direction": "server -> client",
        "payload": "one upgrade id string and the new held level",
        "firedBy": "server-main",
        "handledBy": "beats, as response.beats[upgradePurchased]: rank 4, 200 ms budget, channels readout and audio, queued, effectAppliedBeforeAcknowledgment true",
        "why": "fired ONLY on a successful purchase. input.verbs[buy].onPreconditionFail is silentNoOp, so a failed buy produces no packet at all — which is exactly why success needs one: recovering the event by diffing two snapshots makes a 200 ms budget unmeasurable."
      }
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
      {
        "name": "name",
        "type": "string",
        "note": "a key of REMOTES, taken from that table rather than hand-typed wherever the call site can reach it"
      }
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
    "module": "index-screen",
    "fn": "bind(gui)",
    "params": [
      {
        "name": "gui",
        "type": "ScreenGui",
        "note": "the HUD ScreenGui; the collection surface is a frame inside it, created hidden"
      }
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
  }
]
```

### Done when

1. the surface groups the 24 names into the four labelled sets of collection.sets, and the set heading is the ONLY place a set is legible — rarity.ladders[find-set].legibilityChannel
2. an unfound name is shown as an empty slot with its set heading and nothing else
3. opening it suspends movement and closing it restores it, and neither is caused by anything but the player's own press — input.pressable.indexScreenSuspendsMovement
4. it does not exist at join for a new player and appears at the first reveal, once, without animation or sound

---

## 12. `persistence` — server

**Write to:** `game/src/server/Persistence.luau`

**Owns:** Load and save the seven persisted fields under runtime.dataStoreName, and reconcile a payload before returning it.

**Depends on:** `config`, `layout`

### Must expose

- `load(player): PlayerState`
- `save(player, state): boolean`
- `defaultState(): PlayerState`

### Must not

- storing one boolean per finished area. endgame.persistence.postTerminalAreasStoredAs is 'one integer count, never one boolean per area', and areasFinished is that integer for authored areas too
- storing anything purchase-derived: no gamePassId, no product id, no purchase-sourced factor — products.F20, checkable on the payload
- storing a set-completion flag — modifiers.sources[set-completion].storage forbids latching it
- growing the found map with play. discovery.record.growth is 'one boolean per name in collection, and nothing else', so the map has at most 24 keys forever and none of discovery.record.forbiddenFields may appear
- throwing on a DataStore failure; a failed load starts a fresh session with a warning
- returning a state whose cleared, clearedCount and areasFinished disagree. load reconciles all three before it returns, so no module downstream has to check and none of them may
- trusting the stored clearedCount. It is derived from the cleared set, and the derived value wins
- reading or writing a v1 payload. runtime.storeVersionHistory records why there is no migration

### Values

#### `runtime` *(from 01-runtime.md)*

```json
{
  "clearTickRate": 0.12,
  "saveIntervalSeconds": 45,
  "respawnDelaySeconds": 3,
  "dataStoreName": "ArgaRuin_v2",
  "layoutSeed": 20260801,
  "maxPlayers": 16,
  "placeConfiguration": {
    "maxPlayers": {
      "value": 16,
      "band": "social.maxPlayers, 12 to 20",
      "setVia": "place configuration — Players.MaxPlayers is read-only from a script and no module may write it",
      "ownedBy": "whoever publishes the place",
      "assertedBy": "world.configure(), which READS Players.MaxPlayers at boot and warns naming this key when it is outside the band"
    },
    "nothingElseIsPlaceConfiguration": "every other decision in social — collision groups, chat, plot access, the forbidden APIs — is executed by world.configure() at runtime. maxPlayers is the only one that is not, and it is the only entry in this block."
  },
  "storeVersionHistory": {
    "ArgaRuin_v1": "wave-1 shape: areaComplete boolean, single-area cleared set, no rowsRevealed. No reader is written; nothing shipped to players.",
    "ArgaRuin_v2": "current. areasFinished integer, live-area cleared set, rowsRevealed."
  }
}
```

#### `discovery` *(from gameplay/systems/05-the-find-ledger.md)*

```json
{
  "pool": {
    "scope": "per player, per depth",
    "source": "collection.sets[depth].relics",
    "replacement": "without",
    "areasPartitionTheSet": true,
    "invariant": "collection.relicsPerArea * collection.areasPerDepth == collection.sets[depth].relics.length",
    "invariantHoldsToday": "6 * 1 == 6; this rule changes no shipped behaviour at current values",
    "placementIsPlayerIndependent": true,
    "placementRule": "the layout seed alone picks which patch indices carry a Find; the area's slice fills those slots in order. Neither the player's found set nor cleared set is an input to placement.",
    "placementDomain": "uncleared patches only — derived, not filtered: clearing a patch reveals its Find, so an unfound Find's slot is never a cleared patch",
    "stableAcrossRejoin": true,
    "exclusionKey": "ever-found; it governs what a slot yields, never where a slot is",
    "spatialDistribution": "content-structure work's, not decided here",
    "tierWeighting": "none, per the rarity key",
    "guaranteedException": "onboarding's first Find sits on the patch nearest the plot origin, from the same seed, and consumes the first slot of depth 1's slice"
  },
  "record": {
    "keyedBy": "the Find's name, from collection.sets[].relics[].name",
    "entries": "sum(collection.sets[].relics.length)",
    "fields": [
      {
        "name": "found",
        "type": "boolean",
        "default": false,
        "persisted": true,
        "writtenBy": "server, at the instant the hiding patch clears",
        "clearedBy": "nothing, ever"
      }
    ],
    "derived": [
      "foundCount = the number of true entries",
      "setComplete(setId) = every name in that set is true",
      "collectionComplete = every name in collection is true",
      "newThisSession = compared against a snapshot taken at join, held in memory, never saved"
    ],
    "forbiddenFields": [
      "count",
      "duplicates",
      "timesFound",
      "timestamp",
      "foundAt",
      "depthFoundAt",
      "condition",
      "quality",
      "variant",
      "restoredLevel",
      "favourite",
      "seen",
      "isNew",
      "equipped",
      "sortIndex",
      "tradeable"
    ],
    "growth": "one boolean per name in collection, and nothing else; the record never grows with play"
  },
  "repeat": {
    "possible": false,
    "cause": "only a layout that assigns a name outside its area's slice, which is a build defect and not a game state",
    "runtimeBehaviour": "the patch hides nothing, the server logs a warning naming the Find and the patch index, the reveal channel does not fire",
    "silentDiscardRatified": false,
    "playerFacing": "nothing, and no player can reach this branch; it is a defect path, not the silent duplicate case core-loop/03 forbids"
  },
  "luckShaped": false,
  "luckShapedDetail": "the partition is fixed and placement is seed-derived, so the SET of Finds a depth yields is fully determined. There is no drop rate, so there is no rate for a multiplier to act on.",
  "theOnlyRandomQuantities": [
    "which patch indices the seed picks to carry a slice",
    "the order in which a depth's slices are assigned to its areas"
  ],
  "sellableLuck": null,
  "persistenceRequirement": "one boolean per name in collection and nothing else; the one part of save data bounded by design rather than by collapse"
}
```

#### `endgame` *(from gameplay/meta/07-after-the-last-find.md)*

```json
{
  "terminalCondition": "the player's found count reaches the total number of names in collection",
  "reachedAt": {
    "areaOrdinal": 8,
    "event": "the reveal on the last patch of the eighth bay that carries a Find"
  },
  "gameEnds": false,
  "collectionEnds": true,
  "endScreen": false,
  "survivingPayoffKinds": [
    "currencyTick",
    "areaCompletion"
  ],
  "extinctPayoffKinds": [
    "upgradePurchase",
    "findReveal",
    "setCompletion"
  ],
  "risingQuantity": "areasFinished",
  "postTerminalArea": {
    "unlimited": true,
    "depth": 4,
    "setId": "spire",
    "label": "Spire",
    "labelCarriesNoOrdinalOrNumber": true,
    "footprintStuds2": 57600,
    "chunkCount": 16,
    "patchCount": 640,
    "minSpacing": 6,
    "relicSliceIndex": "none",
    "buriesFinds": 0,
    "unlock": "previousAreaComplete",
    "bayLengthStuds": 480,
    "drawsFrom": "the depth-4 chunk family, under layout's R1 to R4"
  },
  "predicateScopeChange": {
    "maxAboveTickGapSeconds": {
      "value": 90,
      "appliesWhile": "found < totalFinds"
    },
    "maxSecondsPerClear": {
      "value": 3,
      "appliesAlways": true
    },
    "lapSecondsBand": {
      "value": [
        75,
        200
      ],
      "appliesAlways": true
    },
    "arrivalBelowThroughputCap": {
      "appliesWhile": "found < totalFinds"
    }
  },
  "persistence": {
    "postTerminalAreasStoredAs": "one integer count, never one boolean per area",
    "reason": "an unlimited run of identical unnumbered bays must not turn world state into unbounded save data"
  },
  "forbidden": [
    "rebirth",
    "prestige",
    "offlineAccrual",
    "dailyReward",
    "seasonPass",
    "seasonalEvent",
    "leaderboard",
    "trading",
    "redeemCode",
    "secondCollection",
    "completionPercent",
    "badgeLadder",
    "secondCurrency"
  ],
  "invariants": [
    "survivingPayoffKinds and extinctPayoffKinds partition core-loop/02's five kinds with no overlap",
    "postTerminalArea.relicSliceIndex is none and buriesFinds is 0",
    "postTerminalArea's footprint, chunkCount and patchCount equal depths.areas[7]'s",
    "no entry in forbidden appears as an identifier anywhere in game/src",
    "nothing in this key names a reward, a grant, a threshold or a recurrence"
  ]
}
```

#### `firstSession` *(from gameplay/onboarding/02-first-minute-beats.md)*

```json
{
  "armDistanceStuds": 2,
  "armScope": "perCharacterSpawn",
  "armMeasuredOn": "server, horizontal XZ displacement of the character root from the plot spawn pivot",
  "ceilings": {
    "secondsToFirstClear": {
      "max": 3,
      "measuredFrom": "firstInput",
      "population": "all run-1 sessions in which any input occurred"
    },
    "secondsToFirstReveal": {
      "max": 10,
      "measuredFrom": "join",
      "population": "run-1 sessions whose first input arrived by second 5.0"
    }
  },
  "placement": {
    "ordering": "patches sorted ascending by XZ distance from the plot spawn point",
    "firstFindOrdinal": 1,
    "secondFindOrdinalMin": 8,
    "secondFindOrdinalMax": 40,
    "tierContrastWithinFirstOrdinals": 20,
    "spawnToNearestPatchMaxStuds": 3.5,
    "spawnToNearestPatchFormula": "movement.baseClearRadius - firstSession.armDistanceStuds"
  },
  "firstPurchaseBand": {
    "appliesTo": "the cheapest upgrade's level-1 cost",
    "minPatchesOfClearing": 10,
    "maxSecondsOfClearing": 60,
    "atStats": "base"
  },
  "beats": [
    {
      "id": "spawn",
      "bySecond": 0,
      "from": "join",
      "precondition": "character loaded and pivoted to the plot spawn point",
      "guaranteedOutcome": "stands inside standing overgrowth, tool welded and visible, at least one standing patch inside movement.baseClearRadius, clearedCount 0",
      "teaches": null
    },
    {
      "id": "firstClear",
      "bySecond": 3,
      "from": "firstInput",
      "precondition": "armed: horizontal displacement from the spawn pivot has exceeded armDistanceStuds at least once this character life",
      "guaranteedOutcome": "at least one patch clears and credits currency on the same server tick",
      "teaches": [
        "contactClearing",
        "currency"
      ]
    },
    {
      "id": "firstReveal",
      "bySecond": 10,
      "from": "join",
      "precondition": "firstClear fired on the patch carrying the placed Find",
      "guaranteedOutcome": "exactly one Find is revealed and enters the collection permanently",
      "teaches": [
        "theFind"
      ]
    },
    {
      "id": "firstOrdinaryClear",
      "bySecond": 15,
      "from": "join",
      "testRange": [
        10,
        25
      ],
      "precondition": "firstReveal has fired",
      "guaranteedOutcome": "at least three patches clear with no reveal",
      "teaches": [
        "theFind"
      ]
    },
    {
      "id": "tierContrast",
      "bySecond": 45,
      "from": "join",
      "testRange": [
        25,
        75
      ],
      "precondition": "the first 20 patches by spawn-distance ordinal hold at least two distinct tierIndex values",
      "guaranteedOutcome": "two clears with different currency credits and different silhouettes",
      "teaches": null
    },
    {
      "id": "firstSpendAffordable",
      "bySecond": 60,
      "from": "join",
      "testRange": [
        40,
        120
      ],
      "awaitingValue": "upgrades[].costBase",
      "precondition": "balance has reached the cheapest upgrade's level-1 cost",
      "guaranteedOutcome": "the cheapest upgrade row lifts and the player holds enough to buy it",
      "teaches": [
        "upgradeAxes"
      ]
    }
  ],
  "teaching": [
    {
      "concept": "contactClearing",
      "taughtBy": "beat:firstClear",
      "byBeat": "firstClear",
      "evidence": "five or more clears in the 15 s after the first, with no input gap over 3 s",
      "required": true
    },
    {
      "concept": "currency",
      "taughtBy": "beat:firstClear",
      "byBeat": "firstClear",
      "evidence": "the currency readout is non-zero and rising while the player moves",
      "required": false
    },
    {
      "concept": "theFind",
      "taughtBy": "beat:firstReveal, corrected by beat:firstOrdinaryClear",
      "byBeat": "firstOrdinaryClear",
      "evidence": "the player keeps clearing new ground after firstOrdinaryClear rather than re-walking the reveal site",
      "required": false
    },
    {
      "concept": "upgradeAxes",
      "taughtBy": "beat:firstSpendAffordable",
      "byBeat": "firstSpendAffordable",
      "evidence": "a first purchase occurs in session 1",
      "required": false
    },
    {
      "concept": "areaCompletion",
      "taughtBy": "the area progress readout moving, and the standing/cleared edge",
      "byBeat": "minute:5",
      "testRange": [
        3,
        8
      ],
      "evidence": "cleared fraction at session end exceeds the fraction at first sight of the readout",
      "required": false
    },
    {
      "concept": "sets",
      "taughtBy": "the collection surface showing one filled slot in a labelled group of six",
      "byBeat": "firstReveal+60s",
      "testRange": [
        30,
        180
      ],
      "evidence": "the collection surface is opened at least once in session 1",
      "required": false
    },
    {
      "concept": "depth",
      "taughtBy": "entering a second area through an opening that needs no explanation",
      "byBeat": "minute:6",
      "testRange": [
        3,
        12
      ],
      "evidence": "a second area is entered in session 1",
      "required": false
    }
  ],
  "neverTaught": [
    "rebirth",
    "offlineAccrual",
    "findRarity",
    "discoveryRate",
    "duplicates",
    "failure",
    "anyControl",
    "codesDailiesLeaderboardsTrading"
  ],
  "tutorialDevicesForbidden": [
    "imperativeString",
    "tipHintHowToPlayObjectiveGoalString",
    "pointerArrowChevronBeamWaypointOutlineHighlight",
    "ghostedOrPulsingControlGlyph",
    "firstRunOnlyString",
    "unrequestedModalPanelOrOverlay",
    "countdownOrTutorialChecklist",
    "voiceOverOrSpokenLine",
    "welcomeOrWelcomeBackString",
    "stringNamingAControl",
    "uncausedCameraMoveZoomOrReframe",
    "promptingSound"
  ],
  "withheld": [
    {
      "surface": "collectionCount",
      "presentAtJoin": true,
      "liftedBy": null,
      "latched": false,
      "joinValue": "0"
    },
    {
      "surface": "collectionDenominator",
      "presentAtJoin": false,
      "liftedBy": "beat:firstReveal",
      "latched": true,
      "latchSource": "the collection map is non-empty",
      "newSaveFields": 0
    },
    {
      "surface": "currencyReadout",
      "presentAtJoin": true,
      "liftedBy": null,
      "latched": false,
      "joinValue": "0"
    },
    {
      "surface": "upgradeRow",
      "perRow": true,
      "presentAtJoin": false,
      "liftedBy": "balance has reached upgrades[i] level-1 cost",
      "latched": true,
      "latchSource": "one persisted boolean per row",
      "newSaveFields": 3
    },
    {
      "surface": "areaProgress",
      "presentAtJoin": true,
      "liftedBy": null,
      "latched": false,
      "joinValue": "0%"
    },
    {
      "surface": "collectionPanel",
      "presentAtJoin": false,
      "liftedBy": "beat:firstReveal",
      "latched": true,
      "latchSource": "the collection map is non-empty",
      "newSaveFields": 0
    }
  ],
  "suppressionForbidden": [
    "padlockOrLockGlyph",
    "greyedOrDimmedRow",
    "questionMarkPlaceholder",
    "unknownDenominatorForm",
    "explanatoryTooltip",
    "liftAnimation",
    "liftSound",
    "newBadgeOrDot",
    "reSuppression",
    "unrevealedFindsInCount",
    "percentFormOfCollectionCount",
    "reflowOnLift"
  ],
  "permittedConfusion": [
    "patchTier",
    "costGrowth",
    "depthMeaning",
    "setBonus",
    "collectionEnd",
    "otherPlayersAreReal",
    "persistence",
    "absenceOfRebirthAndIdle"
  ]
}
```

#### `interfaces (yours and your dependencies')`

```json
[
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
      {
        "name": "upgrade",
        "type": "UpgradeDef",
        "note": "one entry of GameConfig.Upgrades, the table itself and not its id"
      },
      {
        "name": "level",
        "type": "integer",
        "meaning": "the level the player currently HOLDS, not the level being bought. The price of the first purchase is upgradeCost(def, 0) and equals def.costBase. The price of moving from level 3 to 4 is upgradeCost(def, 3)."
      }
    ],
    "returns": "integer — floor(costBase * costGrowth ^ level)",
    "note": "Generated. Do not reimplement the curve anywhere else. A purchase is legal only while the held level is strictly below def.maxLevel, so the highest price ever charged is upgradeCost(def, maxLevel - 1). firstSession.withheld.upgradeRow lifts row i when the balance reaches upgradeCost(def_i, 0), which is the same call with the same convention."
  },
  {
    "module": "config",
    "fn": "upgradeEffect(upgrade, level)",
    "params": [
      {
        "name": "upgrade",
        "type": "UpgradeDef",
        "note": "needs base, perLevel and mode"
      },
      {
        "name": "level",
        "type": "integer",
        "meaning": "the level currently HELD, same convention as upgradeCost. Effect at level 0 is def.base, which is the pre-upgrade value: 5.5 studs for radius, 16 for speed, 1.0 for value."
      }
    ],
    "returns": "number — base + perLevel * level when mode is \"additive\", base * perLevel ^ level when mode is \"compounding\"",
    "note": "STEP 1 OF modifiers.resolutionOrder, and the only place the additive-versus-compounding question is answered. modifiers.axes[].baseFrom says of all three axes that the base is 'already inside upgradeEffect', and modifiers.baseIsNotAppliedTwice forbids multiplying it in again — so modifiers.effective calls this ONCE and multiplies FACTORS onto its result. All three shipped upgrades are additive today, which is exactly why hand-inlining looks harmless and would silently ignore a future compounding axis."
  },
  {
    "module": "config",
    "fn": "tierByWeight(roll)",
    "params": [
      {
        "name": "roll",
        "type": "number",
        "meaning": "a uniform sample in [0, 1). Not a weight, not a tier index, and not pre-scaled by the weight total — the function scales it. It must come from layout's seeded stream; rarity.ladders[overgrowth-tier].rolled is true and rolledFrom is tiers[].weight."
      }
    ],
    "returns": "(integer, TierDef) — the 1-based index into GameConfig.Tiers, then the tier table",
    "note": "The integer is what goes into Patch.tierIndex; the table is for reading value, height and shape at the point of use. Storing the table in a Patch instead of the index is forbidden by 03-state-shape: re-emitting the config would leave stale names in live patches. rarity.depthRarityChannel wants these weights shifted toward the rare end per depth and rarity.depthRarityBlocker says tiers has no depth dimension, so there is ONE weight table for all four depths and adding a second is a revision to the tiers sheet, not a branch here."
  },
  {
    "module": "layout",
    "fn": "areaSpec(areaOrdinal)",
    "params": [
      {
        "name": "areaOrdinal",
        "type": "integer",
        "meaning": "the 1-based ordinal of an area in depths.areas. 1 is East Terrace. It is state.areasFinished + 1 at every call site in the game — depths.unlockRule is 'the area before it in this list is complete', which is that expression and nothing else. An ordinal above 8 is a post-terminal area."
      }
    ],
    "returns": "AreaSpec — { ordinal, depth, setId, label, relicSlice, footprintStuds2, chunkCount, patchCount, minSpacing, unlock }",
    "note": "For ordinal 1..8 this is depths.areas[ordinal] verbatim. For ordinal > 8 it is endgame.postTerminalArea with depth 4, setId 'spire', an EMPTY relicSlice, and the same footprint, chunkCount and patchCount as depths.areas[8] — endgame's own invariant requires those three to be equal. Exists so the `if ordinal > 8` branch is written once: plots, clearing, hud-binding and this module's own build() all need the row, and three of them would otherwise have written it themselves. The label for a post-terminal area is endgame.postTerminalArea.label ('Spire') and carries no ordinal and no number, per endgame.postTerminalArea.labelCarriesNoOrdinalOrNumber."
  },
  {
    "module": "layout",
    "fn": "build(areaOrdinal)",
    "params": [
      {
        "name": "areaOrdinal",
        "type": "integer",
        "meaning": "same convention as areaSpec: the 1-based area ordinal, which is state.areasFinished + 1. NOT a depth, NOT a chunk index and NOT a bay index — bays and areas happen to share their ordinals because plots.bays[k] holds depths.areas[k], and that coincidence is a fact about the lane, not about this function."
      }
    ],
    "returns": "{ Patch } — exactly areaSpec(areaOrdinal).patchCount records in a fixed canonical order",
    "note": "PLOT-LOCAL POSITIONS, in studs, with X in [-48, 48] and Z inside plots.bays[areaOrdinal]'s span; plots adds the slot origin and writes WORLD positions into state.patches. THE ARRAY INDEX IS THE PATCH'S DURABLE IDENTITY — state.cleared is keyed by it — so changing the order is a save migration, not a refactor. Composition, in order: (1) draw areaSpec.chunkCount variants without replacement from the depth family's layout.variantsPerFamily (16 = 8 chunks x 2 orientations), seeded by (GameConfig.LayoutSeed, areaOrdinal) and by NOTHING ELSE, honouring layout.repetitionRules R1 to R4; (2) lay them nose to tail inward along +Z, each layout.chunk.widthStuds x layout.chunk.depthStuds; (3) generate each chunk's anchors from hash(LayoutSeed, chunkId) and freeze them — layout.anchorSource says authored per chunk, and until authoring exists this is 'the same data by a cheaper route'; (4) roll each patch's tier from tierByWeight on a DISJOINT seeded stream, after placement, because rarity.findPlacementReadsTier and layout.findPlacement.mayReadPatchTier are both false; (5) split the chunk run into collection.relicsPerArea (3) contiguous groups of as-equal-as-possible length and bury exactly one Find in each, group g carrying areaSpec.relicSlice[0] + g - 1, per layout.findPlacement.rule. TWO CONSTRAINTS ON AREA 1 ONLY: layout.findPlacement.onboardingOverride puts group 1's Find on the patch nearest the plot origin, and firstSession.placement requires that patch to be at most 3.5 studs from the spawn point (movement.baseClearRadius - firstSession.armDistanceStuds), the second Find between spawn-distance ordinals 8 and 40, and at least two distinct tierIndex values inside the first 20 ordinals. Reads no player, no state and no clock. Takes no slot: every lane has the same layout, which is what makes state.cleared portable across a rejoin."
  },
  {
    "module": "persistence",
    "fn": "load(player)",
    "params": [
      {
        "name": "player",
        "type": "Player"
      }
    ],
    "returns": "PlayerState — every persisted field populated AND RECONCILED; patches empty, owned empty, armState blank and player unset",
    "note": "Never throws and never returns nil. On a DataStore failure it warns and returns defaultState(), so the player is playable on a fresh session rather than stuck. It yields; server-main must not insert the state into the live collection until it has returned. Reads under runtime.dataStoreName, keyed by the player's UserId. RECONCILES BEFORE RETURNING, in this order: clamp areasFinished at 0 and below; drop any key of cleared at or above layout.areaSpec(areasFinished + 1).patchCount, with one warning, because the live area may have changed size between versions and a stale index would mark a patch that is not there; then set clearedCount from the number of keys in cleared, comparing the stored value and warning on a mismatch rather than trusting it; then fill any missing rowsRevealed key with false and any missing found key with false. Every caller may therefore assume, for any state this function returns: #cleared == clearedCount, clearedCount < the live area's patchCount, and every key of upgrades, rowsRevealed and found exists. THERE IS NO v1 READER — runtime.storeVersionHistory says why, and the store name is different so no v1 payload is reachable."
  },
  {
    "module": "persistence",
    "fn": "save(player, state)",
    "params": [
      {
        "name": "player",
        "type": "Player"
      },
      {
        "name": "state",
        "type": "PlayerState"
      }
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
  }
]
```

### Done when

1. the payload is exactly the seven fields stateShape marks persisted, and its size is bounded by the largest single area's patchCount (640) plus 24 plus 3 plus three integers — never by how far the player has got
2. a player who has finished six areas has NO per-area structure in their payload: one integer reading 6
3. a DataStore outage leaves the player playable rather than erroring
4. a payload whose clearedCount disagrees with its cleared set loads with the derived value and one warning
5. a payload whose cleared holds an index at or above the live area's patchCount loads with that index dropped and one warning — the live area changed size, and a stale index would clear a patch that is not there
6. `grep -rn 'areaComplete' game/src` returns nothing

---

## 13. `plots` — server

**Write to:** `game/src/server/Plots.luau`

**Owns:** Build and maintain one player's lane: the slab, its boundary, its spawn Attachment, and the patch Instances of the live bay only.

**Depends on:** `config`, `layout`

### Must expose

- `claimSlot(): number`
- `releaseSlot(n)`
- `spawn(player, state): CFrame`
- `advance(state): CFrame`
- `despawn(state)`

### Must not

- deriving a lane's position from the live player count — plots.slotClaiming is lowestFreeIndex and a slot is claimed once and held for the connected session
- creating a patch Instance for any bay but the live one. plots.liveGeometry.patchInstancesExistIn is 'the live bay only', and this is where 'cleared is permanent' is enforced in the world
- creating a patch Instance for an index state.cleared marks
- making a patch collide; contact clearing with movement-only input must never be blocked by the thing being cleared
- leaving a hole in the floor. plots.liveGeometry.groundExistsIn is 'every bay from 1 up to and including the live bay', and slabs tile the row at plots.pitchStuds so two neighbours share an edge
- opening the boundary. traversal.boundary.passable, climbable and jumpable are all false; plots.openings describes CONSTRUCTION, which is Art's, and there is no gap in the collision ring
- using one Size formula for all four tiers. A Cylinder's length is its local X and a Ball takes its smallest component, so one formula lays the Fern down and shrinks the Bramble — and shape is the rarity channel that has to survive colour being removed
- putting a SpawnLocation anywhere, or letting a lane exceed plots.pitchStuds in width

### Values

#### `plots` *(from gameplay/meta/06-plot-arrangement.md)*

```json
{
  "rowAxis": "+X",
  "laneAxis": "+Z",
  "laneWidthStuds": 120,
  "pitchStuds": 122,
  "assumedBoundaryThicknessStuds": 2,
  "maxBoundaryThicknessStuds": 8,
  "pitchRule": "laneWidthStuds + the inter-plot boundary's thickness, which traversal owns; pitchStuds must never exceed social.maxCoPresenceSeparationStuds.value, which caps that thickness at 8",
  "slotOrigin": "(area.originXZ[0] + (slot - 1) * pitchStuds, 0, area.originXZ[1])",
  "slotClaiming": "lowestFreeIndex",
  "slotsAreContiguousWhileOccupied": true,
  "spawn": {
    "plotLocal": [
      0,
      0,
      8
    ],
    "inwardOffsetStatus": "playtest unknown",
    "inwardOffsetTestRange": [
      4,
      16
    ],
    "lookVector": {
      "slot1": [
        1,
        0,
        0
      ],
      "slot2AndAbove": [
        -1,
        0,
        0
      ]
    },
    "neverFacesLaneAxis": true,
    "atPlotCentre": false
  },
  "coPresence": {
    "scope": "spawnMomentOnly",
    "longitudinalBudgetStuds": 38.7,
    "derivation": "sqrt(S.value^2 - pitchStuds^2)",
    "satisfiesSocial02CriterionOne": true,
    "satisfiesSocial02CriterionTwoBeyondStuds": false,
    "unclosedRequirementOwnedBy": "gameplay/social/02"
  },
  "bayLengthRule": "depths.areas[k].footprintStuds2 / laneWidthStuds",
  "bays": [
    {
      "ordinal": 1,
      "zStart": 0,
      "zEnd": 120,
      "lengthStuds": 120
    },
    {
      "ordinal": 2,
      "zStart": 120,
      "zEnd": 330,
      "lengthStuds": 210
    },
    {
      "ordinal": 3,
      "zStart": 330,
      "zEnd": 660,
      "lengthStuds": 330
    },
    {
      "ordinal": 4,
      "zStart": 660,
      "zEnd": 1080,
      "lengthStuds": 420
    },
    {
      "ordinal": 5,
      "zStart": 1080,
      "zEnd": 1560,
      "lengthStuds": 480
    },
    {
      "ordinal": 6,
      "zStart": 1560,
      "zEnd": 2040,
      "lengthStuds": 480
    },
    {
      "ordinal": 7,
      "zStart": 2040,
      "zEnd": 2520,
      "lengthStuds": 480
    },
    {
      "ordinal": 8,
      "zStart": 2520,
      "zEnd": 3000,
      "lengthStuds": 480
    }
  ],
  "openings": {
    "perBay": 2,
    "centredOnX": 0,
    "sharedWithNeighbour": true,
    "outwardOpeningOfBay1": "the works' edge, per theme/setting/04",
    "studsBetweenParts": 0,
    "alwaysOpen": true,
    "barrierInOpening": false,
    "gatedUntilPreviousBayComplete": true,
    "gateMechanism": "the ground beyond does not exist yet; the built lane's inward edge is bounded by the same plot boundary that bounds its two long sides, and no barrier is ever placed in an opening"
  },
  "liveGeometry": {
    "patchInstancesExistIn": "the live bay only",
    "groundExistsIn": "every bay from 1 up to and including the live bay",
    "builtWhole": true,
    "bayBuiltAt": "the instant the previous bay's last patch clears",
    "torndownBeyond": "bays more than two outward of the live one are destroyed and rebuilt bare on re-entry"
  },
  "requestedRevisions": [
    {
      "sheet": "cid/gameplay/mechanics/06-traversal-affordances.md",
      "change": "traversal.walkableMarginStuds 12 -> 0",
      "reason": "that sheet offers the 12 studs back if the arrangement cannot otherwise be made to work; at 12 the pitch is 144 and breaches S"
    },
    {
      "sheet": "cid/theme/setting/04-permanence-and-passage.md",
      "change": "strike W5; keep W1-W4 and W6",
      "reason": "passage is conditioned on the previous bay being complete; the opening itself is unchanged"
    }
  ],
  "invariants": [
    "pitchStuds <= social.maxCoPresenceSeparationStuds.value",
    "pitchStuds == laneWidthStuds + the realised inter-plot boundary thickness",
    "the realised distance between the spawns of two consecutive occupied slots equals pitchStuds at every bay ordinal",
    "bays[k].lengthStuds * laneWidthStuds == depths.areas[k].footprintStuds2",
    "bays[k].zEnd == bays[k+1].zStart",
    "bays[0].lengthStuds == laneWidthStuds == area.size",
    "the spawn's plot-local Z is not the midpoint of bays[0].zStart and the last bay's zEnd",
    "the spawn's LookVector is parallel to rowAxis and never to laneAxis",
    "no instance with CanCollide true is ever placed inside an opening"
  ]
}
```

#### `traversal` *(from gameplay/mechanics/06-traversal-affordances.md)*

```json
{
  "jump": {
    "exists": true,
    "jumpHeight": 7.2,
    "useJumpPower": false,
    "changesGameState": false,
    "upgradable": false,
    "gatedContent": 0
  },
  "fall": {
    "damage": false,
    "voidBelowPlayArea": false,
    "maxSurvivableFallStuds": null
  },
  "death": {
    "possibleByDesign": false,
    "damageSources": 0,
    "healthWrittenByGameCode": false,
    "respawnAt": "areaSpawn",
    "lossOnRespawn": "none",
    "authoredCue": "none",
    "respawnDelayOwner": "architect/01-runtime"
  },
  "boundary": {
    "kind": "collisionBarrier",
    "walkableMarginStuds": 12,
    "heightStuds": 20,
    "passable": false,
    "climbable": false,
    "jumpable": false,
    "opaque": false,
    "sightlineObstruction": "none",
    "cue": "none",
    "teleportBack": false
  },
  "surface": {
    "maxStepStuds": 2,
    "maxSlopeDegreesWherePatchesStand": 30,
    "climbSurfaces": 0,
    "ladders": 0,
    "seats": 0,
    "vehicles": 0,
    "water": 0,
    "speedModifyingSurfaces": 0,
    "teleportsWithinArea": 0
  },
  "collision": {
    "playerVsWorld": true,
    "playerVsPlayerOwner": "social.characterCollision"
  },
  "hazards": 0,
  "fallPenalties": 0,
  "lockouts": 0
}
```

#### `endgame` *(from gameplay/meta/07-after-the-last-find.md)*

```json
{
  "terminalCondition": "the player's found count reaches the total number of names in collection",
  "reachedAt": {
    "areaOrdinal": 8,
    "event": "the reveal on the last patch of the eighth bay that carries a Find"
  },
  "gameEnds": false,
  "collectionEnds": true,
  "endScreen": false,
  "survivingPayoffKinds": [
    "currencyTick",
    "areaCompletion"
  ],
  "extinctPayoffKinds": [
    "upgradePurchase",
    "findReveal",
    "setCompletion"
  ],
  "risingQuantity": "areasFinished",
  "postTerminalArea": {
    "unlimited": true,
    "depth": 4,
    "setId": "spire",
    "label": "Spire",
    "labelCarriesNoOrdinalOrNumber": true,
    "footprintStuds2": 57600,
    "chunkCount": 16,
    "patchCount": 640,
    "minSpacing": 6,
    "relicSliceIndex": "none",
    "buriesFinds": 0,
    "unlock": "previousAreaComplete",
    "bayLengthStuds": 480,
    "drawsFrom": "the depth-4 chunk family, under layout's R1 to R4"
  },
  "predicateScopeChange": {
    "maxAboveTickGapSeconds": {
      "value": 90,
      "appliesWhile": "found < totalFinds"
    },
    "maxSecondsPerClear": {
      "value": 3,
      "appliesAlways": true
    },
    "lapSecondsBand": {
      "value": [
        75,
        200
      ],
      "appliesAlways": true
    },
    "arrivalBelowThroughputCap": {
      "appliesWhile": "found < totalFinds"
    }
  },
  "persistence": {
    "postTerminalAreasStoredAs": "one integer count, never one boolean per area",
    "reason": "an unlimited run of identical unnumbered bays must not turn world state into unbounded save data"
  },
  "forbidden": [
    "rebirth",
    "prestige",
    "offlineAccrual",
    "dailyReward",
    "seasonPass",
    "seasonalEvent",
    "leaderboard",
    "trading",
    "redeemCode",
    "secondCollection",
    "completionPercent",
    "badgeLadder",
    "secondCurrency"
  ],
  "invariants": [
    "survivingPayoffKinds and extinctPayoffKinds partition core-loop/02's five kinds with no overlap",
    "postTerminalArea.relicSliceIndex is none and buriesFinds is 0",
    "postTerminalArea's footprint, chunkCount and patchCount equal depths.areas[7]'s",
    "no entry in forbidden appears as an identifier anywhere in game/src",
    "nothing in this key names a reward, a grant, a threshold or a recurrence"
  ]
}
```

#### `patch` *(from art/objects/01-patch-footprint.md)*

```json
{
  "footprint": 3,
  "collides": false,
  "material": "Grass"
}
```

#### `tiers` *(from gameplay/systems/01-overgrowth-tiers.md)*

```json
[
  {
    "name": "Moss",
    "shape": "Block",
    "rgb": [
      104,
      142,
      76
    ],
    "value": 1,
    "weight": 52,
    "height": 1.6
  },
  {
    "name": "Fern",
    "shape": "Cylinder",
    "rgb": [
      78,
      128,
      66
    ],
    "value": 3,
    "weight": 28,
    "height": 2.4
  },
  {
    "name": "Bramble",
    "shape": "Ball",
    "rgb": [
      58,
      104,
      58
    ],
    "value": 8,
    "weight": 14,
    "height": 2.8
  },
  {
    "name": "Heartvine",
    "shape": "Wedge",
    "rgb": [
      44,
      86,
      52
    ],
    "value": 20,
    "weight": 6,
    "height": 3.4
  }
]
```

#### `interfaces (yours and your dependencies')`

```json
[
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
      {
        "name": "upgrade",
        "type": "UpgradeDef",
        "note": "one entry of GameConfig.Upgrades, the table itself and not its id"
      },
      {
        "name": "level",
        "type": "integer",
        "meaning": "the level the player currently HOLDS, not the level being bought. The price of the first purchase is upgradeCost(def, 0) and equals def.costBase. The price of moving from level 3 to 4 is upgradeCost(def, 3)."
      }
    ],
    "returns": "integer — floor(costBase * costGrowth ^ level)",
    "note": "Generated. Do not reimplement the curve anywhere else. A purchase is legal only while the held level is strictly below def.maxLevel, so the highest price ever charged is upgradeCost(def, maxLevel - 1). firstSession.withheld.upgradeRow lifts row i when the balance reaches upgradeCost(def_i, 0), which is the same call with the same convention."
  },
  {
    "module": "config",
    "fn": "upgradeEffect(upgrade, level)",
    "params": [
      {
        "name": "upgrade",
        "type": "UpgradeDef",
        "note": "needs base, perLevel and mode"
      },
      {
        "name": "level",
        "type": "integer",
        "meaning": "the level currently HELD, same convention as upgradeCost. Effect at level 0 is def.base, which is the pre-upgrade value: 5.5 studs for radius, 16 for speed, 1.0 for value."
      }
    ],
    "returns": "number — base + perLevel * level when mode is \"additive\", base * perLevel ^ level when mode is \"compounding\"",
    "note": "STEP 1 OF modifiers.resolutionOrder, and the only place the additive-versus-compounding question is answered. modifiers.axes[].baseFrom says of all three axes that the base is 'already inside upgradeEffect', and modifiers.baseIsNotAppliedTwice forbids multiplying it in again — so modifiers.effective calls this ONCE and multiplies FACTORS onto its result. All three shipped upgrades are additive today, which is exactly why hand-inlining looks harmless and would silently ignore a future compounding axis."
  },
  {
    "module": "config",
    "fn": "tierByWeight(roll)",
    "params": [
      {
        "name": "roll",
        "type": "number",
        "meaning": "a uniform sample in [0, 1). Not a weight, not a tier index, and not pre-scaled by the weight total — the function scales it. It must come from layout's seeded stream; rarity.ladders[overgrowth-tier].rolled is true and rolledFrom is tiers[].weight."
      }
    ],
    "returns": "(integer, TierDef) — the 1-based index into GameConfig.Tiers, then the tier table",
    "note": "The integer is what goes into Patch.tierIndex; the table is for reading value, height and shape at the point of use. Storing the table in a Patch instead of the index is forbidden by 03-state-shape: re-emitting the config would leave stale names in live patches. rarity.depthRarityChannel wants these weights shifted toward the rare end per depth and rarity.depthRarityBlocker says tiers has no depth dimension, so there is ONE weight table for all four depths and adding a second is a revision to the tiers sheet, not a branch here."
  },
  {
    "module": "layout",
    "fn": "areaSpec(areaOrdinal)",
    "params": [
      {
        "name": "areaOrdinal",
        "type": "integer",
        "meaning": "the 1-based ordinal of an area in depths.areas. 1 is East Terrace. It is state.areasFinished + 1 at every call site in the game — depths.unlockRule is 'the area before it in this list is complete', which is that expression and nothing else. An ordinal above 8 is a post-terminal area."
      }
    ],
    "returns": "AreaSpec — { ordinal, depth, setId, label, relicSlice, footprintStuds2, chunkCount, patchCount, minSpacing, unlock }",
    "note": "For ordinal 1..8 this is depths.areas[ordinal] verbatim. For ordinal > 8 it is endgame.postTerminalArea with depth 4, setId 'spire', an EMPTY relicSlice, and the same footprint, chunkCount and patchCount as depths.areas[8] — endgame's own invariant requires those three to be equal. Exists so the `if ordinal > 8` branch is written once: plots, clearing, hud-binding and this module's own build() all need the row, and three of them would otherwise have written it themselves. The label for a post-terminal area is endgame.postTerminalArea.label ('Spire') and carries no ordinal and no number, per endgame.postTerminalArea.labelCarriesNoOrdinalOrNumber."
  },
  {
    "module": "layout",
    "fn": "build(areaOrdinal)",
    "params": [
      {
        "name": "areaOrdinal",
        "type": "integer",
        "meaning": "same convention as areaSpec: the 1-based area ordinal, which is state.areasFinished + 1. NOT a depth, NOT a chunk index and NOT a bay index — bays and areas happen to share their ordinals because plots.bays[k] holds depths.areas[k], and that coincidence is a fact about the lane, not about this function."
      }
    ],
    "returns": "{ Patch } — exactly areaSpec(areaOrdinal).patchCount records in a fixed canonical order",
    "note": "PLOT-LOCAL POSITIONS, in studs, with X in [-48, 48] and Z inside plots.bays[areaOrdinal]'s span; plots adds the slot origin and writes WORLD positions into state.patches. THE ARRAY INDEX IS THE PATCH'S DURABLE IDENTITY — state.cleared is keyed by it — so changing the order is a save migration, not a refactor. Composition, in order: (1) draw areaSpec.chunkCount variants without replacement from the depth family's layout.variantsPerFamily (16 = 8 chunks x 2 orientations), seeded by (GameConfig.LayoutSeed, areaOrdinal) and by NOTHING ELSE, honouring layout.repetitionRules R1 to R4; (2) lay them nose to tail inward along +Z, each layout.chunk.widthStuds x layout.chunk.depthStuds; (3) generate each chunk's anchors from hash(LayoutSeed, chunkId) and freeze them — layout.anchorSource says authored per chunk, and until authoring exists this is 'the same data by a cheaper route'; (4) roll each patch's tier from tierByWeight on a DISJOINT seeded stream, after placement, because rarity.findPlacementReadsTier and layout.findPlacement.mayReadPatchTier are both false; (5) split the chunk run into collection.relicsPerArea (3) contiguous groups of as-equal-as-possible length and bury exactly one Find in each, group g carrying areaSpec.relicSlice[0] + g - 1, per layout.findPlacement.rule. TWO CONSTRAINTS ON AREA 1 ONLY: layout.findPlacement.onboardingOverride puts group 1's Find on the patch nearest the plot origin, and firstSession.placement requires that patch to be at most 3.5 studs from the spawn point (movement.baseClearRadius - firstSession.armDistanceStuds), the second Find between spawn-distance ordinals 8 and 40, and at least two distinct tierIndex values inside the first 20 ordinals. Reads no player, no state and no clock. Takes no slot: every lane has the same layout, which is what makes state.cleared portable across a rejoin."
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
      {
        "name": "n",
        "type": "integer",
        "meaning": "a slot index previously returned by claimSlot, being returned to the free pool. Not a player count and not a plot Instance. Releasing an index that is not currently taken is a no-op, not an error."
      }
    ],
    "returns": "nil",
    "note": "Called by plots.despawn. The free pool hands back the lowest free index first."
  },
  {
    "module": "plots",
    "fn": "spawn(player, state)",
    "params": [
      {
        "name": "player",
        "type": "Player"
      },
      {
        "name": "state",
        "type": "PlayerState",
        "note": "read for areasFinished and cleared, written for patches and spawnPivot"
      }
    ],
    "returns": "CFrame — the live bay's spawn point, the WorldCFrame of the lane's spawn Attachment",
    "note": "Claims a slot, then builds the lane for a player whose live area is state.areasFinished + 1: the slab spanning plots.pitchStuds across and from 12 studs outward of bay 1 to 12 studs inward of the live bay's end (traversal.boundary.walkableMarginStuds), the four boundary parts, the spawn Attachment, and ONE INSTANCE PER PATCH THAT state.cleared DOES NOT MARK, IN THE LIVE BAY ONLY. plots.liveGeometry: patchInstancesExistIn 'the live bay only', groundExistsIn 'every bay from 1 up to and including the live bay', builtWhole true. Every bay below the live one is bare walkable floor with no patch Instance and no patch record — which is what makes 'cleared is permanent' structural rather than latched, and is why no rejoin can pay for a finished area a second time. Writes state.patches (records for the LIVE bay only, cleared ones kept with instance nil so indices stay aligned with layout's order) and state.spawnPivot. Converts layout's plot-local positions to WORLD by adding the slot origin, and it is the ONLY place that conversion happens. Sizes and properties are fixed in representation. Calling it twice for one player without a despawn between is a bug, not a second lane."
  },
  {
    "module": "plots",
    "fn": "advance(state)",
    "params": [
      {
        "name": "state",
        "type": "PlayerState",
        "note": "read for the NEW areasFinished, which clearing has already incremented; written for patches and spawnPivot"
      }
    ],
    "returns": "CFrame — the new live bay's spawn point",
    "note": "CALLED BY clearing, FROM INSIDE THE TICK, ON THE PASS THAT FINISHES AN AREA, AND FROM NOWHERE ELSE. plots.liveGeometry.bayBuiltAt is 'the instant the previous bay's last patch clears', so this is not a deferred job. In order: destroy every patch Instance of the bay just finished (there are none left standing, but the records go); extend the slab inward to cover the new live bay plus traversal.boundary.walkableMarginStuds; move the inward boundary part to the new end; build layout.build(state.areasFinished + 1)'s patch Instances, all of them, since state.cleared was emptied with the increment; rewrite state.patches and state.spawnPivot; move the spawn Attachment to the new bay's spawn point, (0, 0, plots.bays[k].zStart + 8) in plot-local — the same +8 plots.spawn.plotLocal gives bay 1. DESTROYS NOTHING A PLAYER IS STANDING ON: the floor is only ever extended, never shortened. plots.liveGeometry.torndownBeyond talks about tearing bays down beyond the live one minus two and rebuilding them BARE on re-entry; a finished bay in this build IS bare — it holds ground and nothing else — so there is nothing to tear down and the ground invariant wins. That changes the day Art dresses a bay, and the rule acquires a subject then."
  },
  {
    "module": "plots",
    "fn": "despawn(state)",
    "params": [
      {
        "name": "state",
        "type": "PlayerState"
      }
    ],
    "returns": "nil",
    "note": "Destroys the lane for state.player, clears state.patches and state.spawnPivot, and releases the slot internally via releaseSlot. Recovers the slot from its own registry keyed by UserId — PlayerState carries no slot field and must not gain one. Does not save: server-main calls persistence.save before this. social.plotTenure.onLeaveMidArea: 'the plot instance tree is destroyed and the slot freed; the partial cleared set survives only in the leaving player's own save; nothing about the departure is perceptible to any remaining player' — so no notice, no sound and no string, which is social.forbidden X11."
  }
]
```

### Done when

1. a rejoining player's already-cleared patches of the live bay do not respawn, and no bay below the live one has a patch Instance at all
2. a player whose areasFinished is 3 gets continuous walkable floor over bays 1 to 4 and patch Instances only in bay 4
3. two players never occupy the same lane, and a vacated slot is reused before a higher one is allocated
4. the realised distance between the spawn points of two consecutive occupied slots is exactly plots.pitchStuds (122) at every bay ordinal, which is at or below social.maxCoPresenceSeparationStuds (128)
5. every spawned patch has CanCollide false, and no patch anchor is within traversal.boundary.walkableMarginStuds of a lane edge
6. a character cannot leave its own lane: the boundary stops it on all four sides, jumping does not clear it (traversal.jump.jumpHeight is 7.2 and the boundary is traversal.boundary.heightStuds, 20), and no point it can stand on reaches air
7. each tier's world bounding box is patch.footprint x tier.height x patch.footprint, except Bramble at tier.height cubed, and the top of every patch is exactly tier.height above the slab
8. advance(state) extends the floor by one bay, builds that bay's patches, moves the spawn Attachment to the new bay, and destroys nothing that a player is standing on

---

## 14. `tool` — server

**Write to:** `game/src/server/Tool.luau`

**Owns:** Build and maintain the one held tool: a Model welded to the right hand whose head width is the visible reading of effective radius.

**Depends on:** `config`, `modifiers`

### Must expose

- `equip(player, state)`
- `refresh(player, state)`

### Must not

- creating a Roblox Tool instance or touching the Backpack. tool.isRobloxToolInstance is false and tool.entersBackpack is false; it is a Model welded to the RightHand attachment
- writing any Humanoid property. tool.writesHumanoidProperties is false and response.humanoidWritesAllowed is exactly ['WalkSpeed'], which is server-main's write and nobody else's
- clearing anything. tool.clearsOnContact is false; the tool is appearance, and clearing is a server proximity test in clearing.tick
- colliding, touching, being raycast or having mass. tool.canCollide, canTouch and canQuery are false and massless is true
- animating, or carrying a ParticleEmitter. tool.animates is false and tool.particleEmitters is 0
- changing with the value or speed axes. tool.unaffectedByAxes is ['value', 'speed'] and tool.changesWithAxes is ['radius']
- resolving head width from the Reach LEVEL. products.items[span].deliverable requires it to resolve from EFFECTIVE radius, so a purchased factor widens the head and a level-only reading would make a 499-Robux product invisible

### Values

#### `tool` *(from gameplay/mechanics/04-tool-as-object.md)*

```json
{
  "held": true,
  "count": 1,
  "grantedAt": "spawn",
  "drivenBy": "radius",
  "appearanceChannel": "headWidth",
  "headWidthBaseStuds": 1.2,
  "headWidthBaseTestRangeStuds": [
    0.8,
    1.8
  ],
  "headWidthPerLevelStuds": 0.35,
  "headWidthPerLevelTestRangeStuds": [
    0.2,
    0.6
  ],
  "attachment": "RightHand",
  "instanceClass": "Model",
  "isRobloxToolInstance": false,
  "entersBackpack": false,
  "canCollide": false,
  "canTouch": false,
  "canQuery": false,
  "massless": true,
  "clearsOnContact": false,
  "animates": false,
  "writesHumanoidProperties": false,
  "particleEmitters": 0,
  "changesWithAxes": [
    "radius"
  ],
  "unaffectedByAxes": [
    "value",
    "speed"
  ],
  "premiumVariantAllowed": true,
  "premiumVariantMayBeOnlyTool": false
}
```

#### `upgrades` *(from gameplay/balance/01-upgrade-ladder.md)*

```json
[
  {
    "id": "value",
    "label": "Value",
    "blurb": "Each patch pays more",
    "costBase": 25,
    "costGrowth": 1.6,
    "maxLevel": 10,
    "perLevel": 0.25,
    "base": 1,
    "mode": "additive"
  },
  {
    "id": "radius",
    "label": "Reach",
    "blurb": "Clear a wider sweep as you walk",
    "costBase": 40,
    "costGrowth": 1.75,
    "maxLevel": 8,
    "perLevel": 1.1,
    "base": 5.5,
    "mode": "additive"
  },
  {
    "id": "speed",
    "label": "Pace",
    "blurb": "Move faster between patches",
    "costBase": 60,
    "costGrowth": 1.8,
    "maxLevel": 6,
    "perLevel": 1.6,
    "base": 16,
    "mode": "additive"
  }
]
```

#### `interfaces (yours and your dependencies')`

```json
[
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
      {
        "name": "upgrade",
        "type": "UpgradeDef",
        "note": "one entry of GameConfig.Upgrades, the table itself and not its id"
      },
      {
        "name": "level",
        "type": "integer",
        "meaning": "the level the player currently HOLDS, not the level being bought. The price of the first purchase is upgradeCost(def, 0) and equals def.costBase. The price of moving from level 3 to 4 is upgradeCost(def, 3)."
      }
    ],
    "returns": "integer — floor(costBase * costGrowth ^ level)",
    "note": "Generated. Do not reimplement the curve anywhere else. A purchase is legal only while the held level is strictly below def.maxLevel, so the highest price ever charged is upgradeCost(def, maxLevel - 1). firstSession.withheld.upgradeRow lifts row i when the balance reaches upgradeCost(def_i, 0), which is the same call with the same convention."
  },
  {
    "module": "config",
    "fn": "upgradeEffect(upgrade, level)",
    "params": [
      {
        "name": "upgrade",
        "type": "UpgradeDef",
        "note": "needs base, perLevel and mode"
      },
      {
        "name": "level",
        "type": "integer",
        "meaning": "the level currently HELD, same convention as upgradeCost. Effect at level 0 is def.base, which is the pre-upgrade value: 5.5 studs for radius, 16 for speed, 1.0 for value."
      }
    ],
    "returns": "number — base + perLevel * level when mode is \"additive\", base * perLevel ^ level when mode is \"compounding\"",
    "note": "STEP 1 OF modifiers.resolutionOrder, and the only place the additive-versus-compounding question is answered. modifiers.axes[].baseFrom says of all three axes that the base is 'already inside upgradeEffect', and modifiers.baseIsNotAppliedTwice forbids multiplying it in again — so modifiers.effective calls this ONCE and multiplies FACTORS onto its result. All three shipped upgrades are additive today, which is exactly why hand-inlining looks harmless and would silently ignore a future compounding axis."
  },
  {
    "module": "config",
    "fn": "tierByWeight(roll)",
    "params": [
      {
        "name": "roll",
        "type": "number",
        "meaning": "a uniform sample in [0, 1). Not a weight, not a tier index, and not pre-scaled by the weight total — the function scales it. It must come from layout's seeded stream; rarity.ladders[overgrowth-tier].rolled is true and rolledFrom is tiers[].weight."
      }
    ],
    "returns": "(integer, TierDef) — the 1-based index into GameConfig.Tiers, then the tier table",
    "note": "The integer is what goes into Patch.tierIndex; the table is for reading value, height and shape at the point of use. Storing the table in a Patch instead of the index is forbidden by 03-state-shape: re-emitting the config would leave stale names in live patches. rarity.depthRarityChannel wants these weights shifted toward the rare end per depth and rarity.depthRarityBlocker says tiers has no depth dimension, so there is ONE weight table for all four depths and adding a second is a revision to the tiers sheet, not a branch here."
  },
  {
    "module": "modifiers",
    "fn": "effective(state, axis)",
    "params": [
      {
        "name": "state",
        "type": "PlayerState",
        "note": "read for upgrades, found and owned, and written never. This function is pure."
      },
      {
        "name": "axis",
        "type": "string",
        "note": "exactly one of \"value\", \"radius\", \"speed\". modifiers.axisIdsJoinUpgrades: axes[].id is upgrades[].id verbatim, and 'Pace is a label and never an id'. Any other string is an error, not a fallback."
      }
    ],
    "returns": "number — the axis's effective value: a multiplier for value, studs for radius, studs per second for speed",
    "note": "THE ONE IMPLEMENTATION — modifiers.singleDefinition. modifiers.composition writes it out: clamp(upgradeEffect(axis, heldLevel) * PROD(setFactors(axis)) * PROD(purchaseFactors(axis)), ceilingRule). FOUR STEPS, IN modifiers.resolutionOrder AND IN NO OTHER ORDER: (1) config.upgradeEffect(def, state.upgrades[axis] or 0) — this ALREADY CONTAINS upgrades[axis].base and modifiers.baseIsNotAppliedTwice forbids multiplying it in again; (2) multiply by every set factor on this axis, for every set in collection.sets whose six names are all true in state.found, in collection declaration order — setBonus.rows says WHICH axis each set targets and setBonus.invariants forbids a row carrying a magnitude, so an absent factor is 1.0 and modifiers warns once at boot naming the four sets, WHICH MEANS A COMPLETED SET CURRENTLY CHANGES NOTHING; (3) multiply by products.items[].factor for every item whose axis matches and whose id is true in state.owned, in offer-ladder order — every gamePassId is null today so this step is currently empty too; (4) clamp ONCE against ceiling(axis, state.areasFinished + 1), never between two sources — modifiers.clampApplication. Derives set completion from state.found on EVERY CALL and caches nothing: modifiers.sources[set-completion].storage is 'derived from discovery.record at every read; never latched, never persisted', which is why there is no setsComplete field to go stale. Never yields. Never writes. Called by clearing (radius and value, every tick), by server-main (speed, on spawn and after a purchase) and by tool (radius, on spawn and after a purchase), and by no client module."
  },
  {
    "module": "modifiers",
    "fn": "ceiling(axis, areaOrdinal)",
    "params": [
      {
        "name": "axis",
        "type": "string",
        "note": "\"value\", \"radius\" or \"speed\""
      },
      {
        "name": "areaOrdinal",
        "type": "integer",
        "meaning": "the 1-based area ordinal the ceiling is being evaluated for — state.areasFinished + 1 at every live call site. It is a parameter because modifiers.axes[radius].ceilingRule is 'effective < area.size / 2' and products.headroom.ceilings.radius is 'min over depths of (area.size(N) / 2)', so the rule is per area even though every area is the same lane width today."
      }
    ],
    "returns": "number? — the ceiling for that axis, or nil when the axis has none",
    "note": "modifiers.axes[value].ceilingRule is null with the reason 'a currency multiplier breaks no invariant', so this returns nil for value and the clamp is skipped. radius: area.size / 2 = 60, which is plots.laneWidthStuds / 2 and the same number by both routes — beyond it 'one position clears the whole area and a lap stops existing'. speed: movement.baseClearRadius / runtime.clearTickRate = 5.5 / 0.12 = 45.83 — beyond it 'the player outruns the tool between ticks and patches are never cleared'. Also the input to the boot-time headroom assertion: products.headroom.rule requires ladderMax(A) * every set factor * every product factor to stay at or below products.headroom.marginFraction (0.9) times this, for every axis and every depth, and products.headroom.clampMayAbsorbAPurchase is false — so a configuration where the clamp would eat a purchased factor is a boot-time warning, not a silent flatline."
  },
  {
    "module": "tool",
    "fn": "equip(player, state)",
    "params": [
      {
        "name": "player",
        "type": "Player"
      },
      {
        "name": "state",
        "type": "PlayerState",
        "note": "read for upgrades and owned, through modifiers.effective; written never"
      }
    ],
    "returns": "nil",
    "note": "Builds ONE Model — tool.count is 1, tool.instanceClass is Model, tool.isRobloxToolInstance is false and tool.entersBackpack is false — and welds it to the character's RightHand attachment (tool.attachment). tool.grantedAt is 'spawn', so this is called from wiring.onSpawn on every character including the one that follows a death, and the previous character's tool goes with the previous character. Every part is massless, CanCollide false, CanTouch false and CanQuery false (tool.canCollide, canTouch, canQuery, massless). It writes no Humanoid property (tool.writesHumanoidProperties false), carries no ParticleEmitter (tool.particleEmitters 0), plays no animation (tool.animates false) and clears nothing (tool.clearsOnContact false). Then calls refresh."
  },
  {
    "module": "tool",
    "fn": "refresh(player, state)",
    "params": [
      {
        "name": "player",
        "type": "Player"
      },
      {
        "name": "state",
        "type": "PlayerState"
      }
    ],
    "returns": "nil",
    "note": "Sets the head's width, which is the ONE appearance channel — tool.appearanceChannel is headWidth and tool.changesWithAxes is exactly ['radius'], tool.unaffectedByAxes exactly ['value', 'speed']. THE WIDTH RESOLVES FROM EFFECTIVE RADIUS, NOT FROM THE REACH LEVEL: products.items[span].deliverable says so in as many words — 'requires tool head width to resolve from effective radius, not Reach level' — because Span is a multiplicative factor and a level-only reading would make a 499-Robux product invisible. The formula is tool.headWidthBaseStuds + tool.headWidthPerLevelStuds * equivalentLevels, where equivalentLevels = (modifiers.effective(state, 'radius') - upgrades[radius].base) / upgrades[radius].perLevel — that is, the number of Reach levels the effective radius is worth, which is the held level exactly when no factor applies and more when one does. 1.2 studs at base, 0.35 wider per equivalent level. Called by tool.equip and by server-main after a successful purchase, and by nothing on a tick: the width changes only when a level or an entitlement changes."
  }
]
```

### Done when

1. a player owning zero products spawns with a tool welded to the right hand — products.F8
2. head width is tool.headWidthBaseStuds (1.2) at radius level 0 with nothing owned, and tool.headWidthPerLevelStuds (0.35) wider per equivalent Reach level of effective radius
3. buying the Span pass widens the head without any level changing
4. the tool has no Humanoid write, no Touched handler, no ParticleEmitter and no AnimationTrack anywhere in it
5. a character that respawns gets exactly one tool, and the previous one is gone

---

## 15. `clearing` — server

**Write to:** `game/src/server/Clearing.luau`

**Owns:** Observe player positions on a tick, arm on first movement, clear patches within effective reach, credit currency, reveal Finds, complete sets and advance areas.

**Depends on:** `config`, `modifiers`, `progression`, `plots`, `protocol`

**Fires:** `FindRevealed`, `SetCompleted`, `AreaRestored`, `StateChanged`. Resolve each one through the module that declares the channel list — never by searching the tree, and never by a name you typed yourself.

### Must expose

- `tick(states)`
- `start(states)`

### Must not

- clearing anything before the character is armed. firstSession.armDistanceStuds is 2.0, armScope is perCharacterSpawn and armMeasuredOn is 'server, horizontal XZ displacement of the character root from the plot spawn pivot'. The gate is per character life, not per session, and it re-arms on every respawn
- accepting any client message about clearing — the server observes, it never asks
- using Touched events, which fire from client-authoritative physics
- applying the value multiplier twice. economy.faucets[patch-clear].multiplierAppliedOnce is 'at this site only; never again inside the award function', so this module multiplies and progression.award does not
- rounding a payout any way but floor, or paying below economy.payoutFloor (1)
- crediting anything for a reveal, a set completion or an area completion. Every economy.zeroCreditEvents entry credits 0
- touching a patch that belongs to a bay below the live one. state.patches holds the live bay only, which is plots's guarantee, and this module never indexes past it
- reaching a remote by any means other than protocol.channel(name)
- firing a set-completion or area-completion beat on the reveal channel. response.channelExclusivity puts findReveal on atPatch and setComplete and areaComplete on notice, and response.beats[findReveal].forbiddenChannels contains notice

### Values

#### `runtime` *(from 01-runtime.md)*

```json
{
  "clearTickRate": 0.12,
  "saveIntervalSeconds": 45,
  "respawnDelaySeconds": 3,
  "dataStoreName": "ArgaRuin_v2",
  "layoutSeed": 20260801,
  "maxPlayers": 16,
  "placeConfiguration": {
    "maxPlayers": {
      "value": 16,
      "band": "social.maxPlayers, 12 to 20",
      "setVia": "place configuration — Players.MaxPlayers is read-only from a script and no module may write it",
      "ownedBy": "whoever publishes the place",
      "assertedBy": "world.configure(), which READS Players.MaxPlayers at boot and warns naming this key when it is outside the band"
    },
    "nothingElseIsPlaceConfiguration": "every other decision in social — collision groups, chat, plot access, the forbidden APIs — is executed by world.configure() at runtime. maxPlayers is the only one that is not, and it is the only entry in this block."
  },
  "storeVersionHistory": {
    "ArgaRuin_v1": "wave-1 shape: areaComplete boolean, single-area cleared set, no rowsRevealed. No reader is written; nothing shipped to players.",
    "ArgaRuin_v2": "current. areasFinished integer, live-area cleared set, rowsRevealed."
  }
}
```

#### `economy` *(from gameplay/systems/04-earning-and-spending.md)*

```json
{
  "currencyKey": "currency",
  "startingBalance": 0,
  "balanceCap": null,
  "negativeBalance": "impossible; a purchase that cannot be afforded changes nothing at all",
  "authority": "server only; no client message carries a cost, an amount or a balance, and whether a client message exists at all is input's",
  "faucetCount": 1,
  "faucets": [
    {
      "id": "patch-clear",
      "trigger": "one patch transitions from standing to cleared",
      "formula": "max(payoutFloor, floor(tiers[patch.tierIndex].value * modifiers.effective('value')))",
      "perEvent": true,
      "rounding": "floor, never round-half-up",
      "multiplierAppliedOnce": "at this site only; never again inside the award function"
    }
  ],
  "payoutFloor": 1,
  "payoutFloorReason": "every clear must be a payment, because payoff frequency is measured in payments",
  "zeroCreditEvents": [
    {
      "id": "area-complete",
      "credits": 0,
      "paysInstead": "permanence: the area stays cleared and stays walkable"
    },
    {
      "id": "set-complete",
      "credits": 0,
      "paysInstead": "exactly one modifier, per the modifiers key"
    },
    {
      "id": "find-reveal",
      "credits": 0,
      "paysInstead": "one bit in the collection record, per the discovery key"
    },
    {
      "id": "session-start",
      "credits": 0,
      "paysInstead": "nothing: no welcome grant, no return grant, no offline accrual"
    },
    {
      "id": "purchase",
      "credits": 0,
      "paysInstead": "one modifier; Robux never converts to currency at any rate"
    }
  ],
  "sinkCount": 1,
  "sinks": [
    {
      "id": "upgrade-purchase",
      "debits": "the cost of the next level of one upgrade",
      "costOwner": "gameplay/balance",
      "triggerOwner": "input, via the buy verb; this key states the debit, never the verb",
      "onInsufficientFunds": "nothing changes, nothing is deducted, no partial purchase exists",
      "refundable": false
    }
  ],
  "atMaxLadder": {
    "incomeContinues": true,
    "convertsTo": null,
    "newSinkAppears": false,
    "readoutHidden": false,
    "balanceFrozen": false,
    "requirementOnBalance": "the total cost of maxing all three axes must exceed the total currency yielded by clearing the areas needed to complete the collection, so the ladder outlasts it",
    "ladderLengthBand": "that requirement is a FLOOR and core-loop/01's 90-second purchase-gap ceiling is a CEILING on the same curve. Where they conflict, the resolution is more levels at smaller steps, never a shorter ladder: a ladder that ends before the collection does leaves the only sink dead mid-game.",
    "unownedConsequence": "what the game is once the ladder and the collection are both finished belongs to content-structure work; this key states only that no currency sink appears there"
  },
  "forbidden": [
    "a second currency under any name, including a token, a mark, a point or a fragment",
    "a Robux-to-currency exchange rate, bundle or starter pack",
    "an offline, welcome-back, daily, streak or code grant",
    "a currency price on anything that is not an upgrade level",
    "a currency cost charged to enter, re-enter or leave an area",
    "a client-authored or client-trusted award of any size",
    "a payout that varies by anything other than tier and the value modifier"
  ]
}
```

#### `discovery` *(from gameplay/systems/05-the-find-ledger.md)*

```json
{
  "pool": {
    "scope": "per player, per depth",
    "source": "collection.sets[depth].relics",
    "replacement": "without",
    "areasPartitionTheSet": true,
    "invariant": "collection.relicsPerArea * collection.areasPerDepth == collection.sets[depth].relics.length",
    "invariantHoldsToday": "6 * 1 == 6; this rule changes no shipped behaviour at current values",
    "placementIsPlayerIndependent": true,
    "placementRule": "the layout seed alone picks which patch indices carry a Find; the area's slice fills those slots in order. Neither the player's found set nor cleared set is an input to placement.",
    "placementDomain": "uncleared patches only — derived, not filtered: clearing a patch reveals its Find, so an unfound Find's slot is never a cleared patch",
    "stableAcrossRejoin": true,
    "exclusionKey": "ever-found; it governs what a slot yields, never where a slot is",
    "spatialDistribution": "content-structure work's, not decided here",
    "tierWeighting": "none, per the rarity key",
    "guaranteedException": "onboarding's first Find sits on the patch nearest the plot origin, from the same seed, and consumes the first slot of depth 1's slice"
  },
  "record": {
    "keyedBy": "the Find's name, from collection.sets[].relics[].name",
    "entries": "sum(collection.sets[].relics.length)",
    "fields": [
      {
        "name": "found",
        "type": "boolean",
        "default": false,
        "persisted": true,
        "writtenBy": "server, at the instant the hiding patch clears",
        "clearedBy": "nothing, ever"
      }
    ],
    "derived": [
      "foundCount = the number of true entries",
      "setComplete(setId) = every name in that set is true",
      "collectionComplete = every name in collection is true",
      "newThisSession = compared against a snapshot taken at join, held in memory, never saved"
    ],
    "forbiddenFields": [
      "count",
      "duplicates",
      "timesFound",
      "timestamp",
      "foundAt",
      "depthFoundAt",
      "condition",
      "quality",
      "variant",
      "restoredLevel",
      "favourite",
      "seen",
      "isNew",
      "equipped",
      "sortIndex",
      "tradeable"
    ],
    "growth": "one boolean per name in collection, and nothing else; the record never grows with play"
  },
  "repeat": {
    "possible": false,
    "cause": "only a layout that assigns a name outside its area's slice, which is a build defect and not a game state",
    "runtimeBehaviour": "the patch hides nothing, the server logs a warning naming the Find and the patch index, the reveal channel does not fire",
    "silentDiscardRatified": false,
    "playerFacing": "nothing, and no player can reach this branch; it is a defect path, not the silent duplicate case core-loop/03 forbids"
  },
  "luckShaped": false,
  "luckShapedDetail": "the partition is fixed and placement is seed-derived, so the SET of Finds a depth yields is fully determined. There is no drop rate, so there is no rate for a multiplier to act on.",
  "theOnlyRandomQuantities": [
    "which patch indices the seed picks to carry a slice",
    "the order in which a depth's slices are assigned to its areas"
  ],
  "sellableLuck": null,
  "persistenceRequirement": "one boolean per name in collection and nothing else; the one part of save data bounded by design rather than by collapse"
}
```

#### `firstSession` *(from gameplay/onboarding/02-first-minute-beats.md)*

```json
{
  "armDistanceStuds": 2,
  "armScope": "perCharacterSpawn",
  "armMeasuredOn": "server, horizontal XZ displacement of the character root from the plot spawn pivot",
  "ceilings": {
    "secondsToFirstClear": {
      "max": 3,
      "measuredFrom": "firstInput",
      "population": "all run-1 sessions in which any input occurred"
    },
    "secondsToFirstReveal": {
      "max": 10,
      "measuredFrom": "join",
      "population": "run-1 sessions whose first input arrived by second 5.0"
    }
  },
  "placement": {
    "ordering": "patches sorted ascending by XZ distance from the plot spawn point",
    "firstFindOrdinal": 1,
    "secondFindOrdinalMin": 8,
    "secondFindOrdinalMax": 40,
    "tierContrastWithinFirstOrdinals": 20,
    "spawnToNearestPatchMaxStuds": 3.5,
    "spawnToNearestPatchFormula": "movement.baseClearRadius - firstSession.armDistanceStuds"
  },
  "firstPurchaseBand": {
    "appliesTo": "the cheapest upgrade's level-1 cost",
    "minPatchesOfClearing": 10,
    "maxSecondsOfClearing": 60,
    "atStats": "base"
  },
  "beats": [
    {
      "id": "spawn",
      "bySecond": 0,
      "from": "join",
      "precondition": "character loaded and pivoted to the plot spawn point",
      "guaranteedOutcome": "stands inside standing overgrowth, tool welded and visible, at least one standing patch inside movement.baseClearRadius, clearedCount 0",
      "teaches": null
    },
    {
      "id": "firstClear",
      "bySecond": 3,
      "from": "firstInput",
      "precondition": "armed: horizontal displacement from the spawn pivot has exceeded armDistanceStuds at least once this character life",
      "guaranteedOutcome": "at least one patch clears and credits currency on the same server tick",
      "teaches": [
        "contactClearing",
        "currency"
      ]
    },
    {
      "id": "firstReveal",
      "bySecond": 10,
      "from": "join",
      "precondition": "firstClear fired on the patch carrying the placed Find",
      "guaranteedOutcome": "exactly one Find is revealed and enters the collection permanently",
      "teaches": [
        "theFind"
      ]
    },
    {
      "id": "firstOrdinaryClear",
      "bySecond": 15,
      "from": "join",
      "testRange": [
        10,
        25
      ],
      "precondition": "firstReveal has fired",
      "guaranteedOutcome": "at least three patches clear with no reveal",
      "teaches": [
        "theFind"
      ]
    },
    {
      "id": "tierContrast",
      "bySecond": 45,
      "from": "join",
      "testRange": [
        25,
        75
      ],
      "precondition": "the first 20 patches by spawn-distance ordinal hold at least two distinct tierIndex values",
      "guaranteedOutcome": "two clears with different currency credits and different silhouettes",
      "teaches": null
    },
    {
      "id": "firstSpendAffordable",
      "bySecond": 60,
      "from": "join",
      "testRange": [
        40,
        120
      ],
      "awaitingValue": "upgrades[].costBase",
      "precondition": "balance has reached the cheapest upgrade's level-1 cost",
      "guaranteedOutcome": "the cheapest upgrade row lifts and the player holds enough to buy it",
      "teaches": [
        "upgradeAxes"
      ]
    }
  ],
  "teaching": [
    {
      "concept": "contactClearing",
      "taughtBy": "beat:firstClear",
      "byBeat": "firstClear",
      "evidence": "five or more clears in the 15 s after the first, with no input gap over 3 s",
      "required": true
    },
    {
      "concept": "currency",
      "taughtBy": "beat:firstClear",
      "byBeat": "firstClear",
      "evidence": "the currency readout is non-zero and rising while the player moves",
      "required": false
    },
    {
      "concept": "theFind",
      "taughtBy": "beat:firstReveal, corrected by beat:firstOrdinaryClear",
      "byBeat": "firstOrdinaryClear",
      "evidence": "the player keeps clearing new ground after firstOrdinaryClear rather than re-walking the reveal site",
      "required": false
    },
    {
      "concept": "upgradeAxes",
      "taughtBy": "beat:firstSpendAffordable",
      "byBeat": "firstSpendAffordable",
      "evidence": "a first purchase occurs in session 1",
      "required": false
    },
    {
      "concept": "areaCompletion",
      "taughtBy": "the area progress readout moving, and the standing/cleared edge",
      "byBeat": "minute:5",
      "testRange": [
        3,
        8
      ],
      "evidence": "cleared fraction at session end exceeds the fraction at first sight of the readout",
      "required": false
    },
    {
      "concept": "sets",
      "taughtBy": "the collection surface showing one filled slot in a labelled group of six",
      "byBeat": "firstReveal+60s",
      "testRange": [
        30,
        180
      ],
      "evidence": "the collection surface is opened at least once in session 1",
      "required": false
    },
    {
      "concept": "depth",
      "taughtBy": "entering a second area through an opening that needs no explanation",
      "byBeat": "minute:6",
      "testRange": [
        3,
        12
      ],
      "evidence": "a second area is entered in session 1",
      "required": false
    }
  ],
  "neverTaught": [
    "rebirth",
    "offlineAccrual",
    "findRarity",
    "discoveryRate",
    "duplicates",
    "failure",
    "anyControl",
    "codesDailiesLeaderboardsTrading"
  ],
  "tutorialDevicesForbidden": [
    "imperativeString",
    "tipHintHowToPlayObjectiveGoalString",
    "pointerArrowChevronBeamWaypointOutlineHighlight",
    "ghostedOrPulsingControlGlyph",
    "firstRunOnlyString",
    "unrequestedModalPanelOrOverlay",
    "countdownOrTutorialChecklist",
    "voiceOverOrSpokenLine",
    "welcomeOrWelcomeBackString",
    "stringNamingAControl",
    "uncausedCameraMoveZoomOrReframe",
    "promptingSound"
  ],
  "withheld": [
    {
      "surface": "collectionCount",
      "presentAtJoin": true,
      "liftedBy": null,
      "latched": false,
      "joinValue": "0"
    },
    {
      "surface": "collectionDenominator",
      "presentAtJoin": false,
      "liftedBy": "beat:firstReveal",
      "latched": true,
      "latchSource": "the collection map is non-empty",
      "newSaveFields": 0
    },
    {
      "surface": "currencyReadout",
      "presentAtJoin": true,
      "liftedBy": null,
      "latched": false,
      "joinValue": "0"
    },
    {
      "surface": "upgradeRow",
      "perRow": true,
      "presentAtJoin": false,
      "liftedBy": "balance has reached upgrades[i] level-1 cost",
      "latched": true,
      "latchSource": "one persisted boolean per row",
      "newSaveFields": 3
    },
    {
      "surface": "areaProgress",
      "presentAtJoin": true,
      "liftedBy": null,
      "latched": false,
      "joinValue": "0%"
    },
    {
      "surface": "collectionPanel",
      "presentAtJoin": false,
      "liftedBy": "beat:firstReveal",
      "latched": true,
      "latchSource": "the collection map is non-empty",
      "newSaveFields": 0
    }
  ],
  "suppressionForbidden": [
    "padlockOrLockGlyph",
    "greyedOrDimmedRow",
    "questionMarkPlaceholder",
    "unknownDenominatorForm",
    "explanatoryTooltip",
    "liftAnimation",
    "liftSound",
    "newBadgeOrDot",
    "reSuppression",
    "unrevealedFindsInCount",
    "percentFormOfCollectionCount",
    "reflowOnLift"
  ],
  "permittedConfusion": [
    "patchTier",
    "costGrowth",
    "depthMeaning",
    "setBonus",
    "collectionEnd",
    "otherPlayersAreReal",
    "persistence",
    "absenceOfRebirthAndIdle"
  ]
}
```

#### `response` *(from gameplay/mechanics/05-response-contract.md)*

```json
{
  "controlEverAffected": false,
  "sequencedBeats": [
    "upgradePurchased",
    "findReveal",
    "setComplete",
    "areaComplete"
  ],
  "sequenceOrderOwner": "gameplay/core-loop/02-payoff-weights",
  "minOnsetGapSeconds": 0.6,
  "minOnsetGapTestRangeSeconds": [
    0.35,
    0.9
  ],
  "minOnsetGapOwner": "gameplay/core-loop/02-payoff-weights, figure set by Balance & Tuning",
  "loneSequencedBeatDelayed": false,
  "unsequencedBeats": [
    "patchClear"
  ],
  "minSustainedOnsetsPerSecond": 8,
  "onOverload": "overlap",
  "channelExclusivity": {
    "atPatch": "findReveal",
    "notice": [
      "setComplete",
      "areaComplete"
    ]
  },
  "humanoidWritesAllowed": [
    "WalkSpeed"
  ],
  "beats": [
    {
      "id": "patchClear",
      "rank": 5,
      "cause": "clearRadiusContainsStandingPatch",
      "decidedBy": "clientPredictedServerAuthoritative",
      "acknowledgmentBudgetMs": 80,
      "budgetTestRangeMs": [
        40,
        120
      ],
      "payoutBudgetMs": 250,
      "payoutTestRangeMs": [
        150,
        400
      ],
      "channels": [
        "atPatch",
        "readout"
      ],
      "controlAffected": false,
      "queued": false,
      "residueLifetimeSeconds": 0.4
    },
    {
      "id": "findReveal",
      "rank": 1,
      "cause": "patchHidingItCleared",
      "decidedBy": "server",
      "acknowledgmentBudgetMs": 300,
      "budgetTestRangeMs": [
        200,
        500
      ],
      "channels": [
        "atPatch",
        "audio"
      ],
      "forbiddenChannels": [
        "notice"
      ],
      "controlAffected": false,
      "queued": true,
      "dwellSeconds": 2.5,
      "dwellTestRangeSeconds": [
        1.5,
        4
      ],
      "grantedAt": "reveal"
    },
    {
      "id": "setComplete",
      "rank": 2,
      "cause": "sixthFindOfSetRevealed",
      "decidedBy": "server",
      "acknowledgmentBudgetMs": 400,
      "budgetTestRangeMs": [
        250,
        700
      ],
      "channels": [
        "notice",
        "audio"
      ],
      "controlAffected": false,
      "queued": true
    },
    {
      "id": "areaComplete",
      "rank": 3,
      "cause": "lastStandingPatchCleared",
      "decidedBy": "server",
      "acknowledgmentBudgetMs": 400,
      "budgetTestRangeMs": [
        250,
        700
      ],
      "channels": [
        "notice",
        "audio"
      ],
      "forbiddenChannels": [
        "atPatch"
      ],
      "controlAffected": false,
      "queued": true
    },
    {
      "id": "upgradePurchased",
      "rank": 4,
      "cause": "buyPreconditionSatisfiedAtPressable",
      "decidedBy": "server",
      "acknowledgmentBudgetMs": 200,
      "budgetTestRangeMs": [
        120,
        350
      ],
      "channels": [
        "readout",
        "audio"
      ],
      "controlAffected": false,
      "queued": true,
      "effectAppliedBeforeAcknowledgment": true
    }
  ],
  "negativeBeats": 0,
  "lockoutsSeconds": 0
}
```

#### `depths` *(from gameplay/meta/04-the-depth-ladder.md)*

```json
{
  "depthCount": 4,
  "areaCount": 8,
  "sizingRule": "footprint(k) = floorToChunk( min(LAP_TARGET * tau(k), LAP_CEILING * tauTol(k)) / ROUTE_SLACK ), tau(k) = 2*(baseClearRadius + radiusLevel*perLevel)*(baseWalkSpeed + speedLevel*perLevel) at arrival",
  "footprintCeilingStuds2": 73216,
  "unlockRule": "the area before it in this list is complete; nothing else conditions any area or any depth. This is a strike on theme/setting/04 W5, taken in this sheet's Pushing back.",
  "relicSliceAssignment": "each depth's set is cut into collection.areasPerDepth contiguous slices of collection.relicsPerArea names in name order; the slices are assigned to that depth's areas in an order seeded by (layoutSeed, depth), per gameplay/systems/05 discovery.theOnlyRandomQuantities[1]",
  "purchaserFloorRule": "row k is under core-loop/04's 75 s floor above tau = 2 * footprintStuds2 / 75; the product of every product factor on the radius axis must stay at or under that row's maxRadiusProduct",
  "valueOnlyPurchaserThreshold": 7,
  "areas": [
    {
      "ordinal": 1,
      "depth": 1,
      "setId": "terrace",
      "relicSliceIndex": "seeded(layoutSeed, depth)",
      "label": "East Terrace",
      "footprintStuds2": 14400,
      "chunkCount": 4,
      "patchCount": 140,
      "minSpacing": 6,
      "unlock": "none",
      "maxRadiusProduct": null
    },
    {
      "ordinal": 2,
      "depth": 1,
      "setId": "terrace",
      "relicSliceIndex": "seeded(layoutSeed, depth)",
      "label": "West Terrace",
      "footprintStuds2": 25200,
      "chunkCount": 7,
      "patchCount": 245,
      "minSpacing": 6,
      "unlock": "previousAreaComplete",
      "maxRadiusProduct": 1.27
    },
    {
      "ordinal": 3,
      "depth": 2,
      "setId": "cistern",
      "relicSliceIndex": "seeded(layoutSeed, depth)",
      "label": "East Cistern",
      "footprintStuds2": 39600,
      "chunkCount": 11,
      "patchCount": 407,
      "minSpacing": 6,
      "unlock": "previousAreaComplete",
      "maxRadiusProduct": 1.44
    },
    {
      "ordinal": 4,
      "depth": 2,
      "setId": "cistern",
      "relicSliceIndex": "seeded(layoutSeed, depth)",
      "label": "West Cistern",
      "footprintStuds2": 50400,
      "chunkCount": 14,
      "patchCount": 518,
      "minSpacing": 6,
      "unlock": "previousAreaComplete",
      "maxRadiusProduct": 1.84
    },
    {
      "ordinal": 5,
      "depth": 3,
      "setId": "vault",
      "relicSliceIndex": "seeded(layoutSeed, depth)",
      "label": "East Vault",
      "footprintStuds2": 57600,
      "chunkCount": 16,
      "patchCount": 624,
      "minSpacing": 6,
      "unlock": "previousAreaComplete",
      "maxRadiusProduct": 2.1
    },
    {
      "ordinal": 6,
      "depth": 3,
      "setId": "vault",
      "relicSliceIndex": "seeded(layoutSeed, depth)",
      "label": "West Vault",
      "footprintStuds2": 57600,
      "chunkCount": 16,
      "patchCount": 624,
      "minSpacing": 6,
      "unlock": "previousAreaComplete",
      "maxRadiusProduct": 2.1
    },
    {
      "ordinal": 7,
      "depth": 4,
      "setId": "spire",
      "relicSliceIndex": "seeded(layoutSeed, depth)",
      "label": "East Spire",
      "footprintStuds2": 57600,
      "chunkCount": 16,
      "patchCount": 640,
      "minSpacing": 6,
      "unlock": "previousAreaComplete",
      "maxRadiusProduct": 2.1
    },
    {
      "ordinal": 8,
      "depth": 4,
      "setId": "spire",
      "relicSliceIndex": "seeded(layoutSeed, depth)",
      "label": "West Spire",
      "footprintStuds2": 57600,
      "chunkCount": 16,
      "patchCount": 640,
      "minSpacing": 6,
      "unlock": "previousAreaComplete",
      "maxRadiusProduct": 2.1
    }
  ],
  "requestedRevisions": [
    {
      "sheet": "cid/gameplay/meta/02-the-collection.md",
      "change": "relicsPerArea 6 -> 3, areasPerDepth 1 -> 2",
      "reason": "areas at one depth partition that depth's set (gameplay/systems/05); 3 x 2 = 6 is the pair theme/fantasy/02 criterion 1 names"
    },
    {
      "sheet": "cid/theme/setting/04-permanence-and-passage.md",
      "change": "strike W5; keep W1-W4 and W6",
      "reason": "the inward opening is passable only when the part is finished; this sheet and meta/06 take the strike that sheet itself names"
    }
  ],
  "invariants": [
    "areas[0].footprintStuds2 == area.size ^ 2 and areas[0].patchCount == area.patchCount and areas[0].minSpacing == area.minSpacing",
    "count of areas at each depth == collection.areasPerDepth; this key does not carry that number",
    "collection.relicsPerArea * collection.areasPerDepth == the size of every set",
    "the resolved slices of one depth's areas partition that set with no overlap and no gap",
    "footprintStuds2 is a whole multiple of layout.chunk.footprintStuds2 and equals chunkCount times it",
    "patchCount == chunkCount * layout.patchesPerChunkByDepth[depth]",
    "patchCount / footprintStuds2 is non-decreasing in ordinal and strictly increases at every depth step",
    "minSpacing > movement.baseClearRadius",
    "footprintStuds2 <= footprintCeilingStuds2 for every row",
    "lapSeconds(k) = footprintStuds2(k) / tau(k) * ROUTE_SLACK is inside 75..200 for every row, both at arrival and one upgrade level behind arrival on both throughput axes",
    "patchCount <= lapSeconds(k) / (2 * runtime.clearTickRate)",
    "the product of every products[].factor on the radius axis is at most maxRadiusProduct for every row"
  ]
}
```

#### `endgame` *(from gameplay/meta/07-after-the-last-find.md)*

```json
{
  "terminalCondition": "the player's found count reaches the total number of names in collection",
  "reachedAt": {
    "areaOrdinal": 8,
    "event": "the reveal on the last patch of the eighth bay that carries a Find"
  },
  "gameEnds": false,
  "collectionEnds": true,
  "endScreen": false,
  "survivingPayoffKinds": [
    "currencyTick",
    "areaCompletion"
  ],
  "extinctPayoffKinds": [
    "upgradePurchase",
    "findReveal",
    "setCompletion"
  ],
  "risingQuantity": "areasFinished",
  "postTerminalArea": {
    "unlimited": true,
    "depth": 4,
    "setId": "spire",
    "label": "Spire",
    "labelCarriesNoOrdinalOrNumber": true,
    "footprintStuds2": 57600,
    "chunkCount": 16,
    "patchCount": 640,
    "minSpacing": 6,
    "relicSliceIndex": "none",
    "buriesFinds": 0,
    "unlock": "previousAreaComplete",
    "bayLengthStuds": 480,
    "drawsFrom": "the depth-4 chunk family, under layout's R1 to R4"
  },
  "predicateScopeChange": {
    "maxAboveTickGapSeconds": {
      "value": 90,
      "appliesWhile": "found < totalFinds"
    },
    "maxSecondsPerClear": {
      "value": 3,
      "appliesAlways": true
    },
    "lapSecondsBand": {
      "value": [
        75,
        200
      ],
      "appliesAlways": true
    },
    "arrivalBelowThroughputCap": {
      "appliesWhile": "found < totalFinds"
    }
  },
  "persistence": {
    "postTerminalAreasStoredAs": "one integer count, never one boolean per area",
    "reason": "an unlimited run of identical unnumbered bays must not turn world state into unbounded save data"
  },
  "forbidden": [
    "rebirth",
    "prestige",
    "offlineAccrual",
    "dailyReward",
    "seasonPass",
    "seasonalEvent",
    "leaderboard",
    "trading",
    "redeemCode",
    "secondCollection",
    "completionPercent",
    "badgeLadder",
    "secondCurrency"
  ],
  "invariants": [
    "survivingPayoffKinds and extinctPayoffKinds partition core-loop/02's five kinds with no overlap",
    "postTerminalArea.relicSliceIndex is none and buriesFinds is 0",
    "postTerminalArea's footprint, chunkCount and patchCount equal depths.areas[7]'s",
    "no entry in forbidden appears as an identifier anywhere in game/src",
    "nothing in this key names a reward, a grant, a threshold or a recurrence"
  ]
}
```

#### `tiers` *(from gameplay/systems/01-overgrowth-tiers.md)*

```json
[
  {
    "name": "Moss",
    "shape": "Block",
    "rgb": [
      104,
      142,
      76
    ],
    "value": 1,
    "weight": 52,
    "height": 1.6
  },
  {
    "name": "Fern",
    "shape": "Cylinder",
    "rgb": [
      78,
      128,
      66
    ],
    "value": 3,
    "weight": 28,
    "height": 2.4
  },
  {
    "name": "Bramble",
    "shape": "Ball",
    "rgb": [
      58,
      104,
      58
    ],
    "value": 8,
    "weight": 14,
    "height": 2.8
  },
  {
    "name": "Heartvine",
    "shape": "Wedge",
    "rgb": [
      44,
      86,
      52
    ],
    "value": 20,
    "weight": 6,
    "height": 3.4
  }
]
```

#### `interfaces (yours and your dependencies')`

```json
[
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
      {
        "name": "upgrade",
        "type": "UpgradeDef",
        "note": "one entry of GameConfig.Upgrades, the table itself and not its id"
      },
      {
        "name": "level",
        "type": "integer",
        "meaning": "the level the player currently HOLDS, not the level being bought. The price of the first purchase is upgradeCost(def, 0) and equals def.costBase. The price of moving from level 3 to 4 is upgradeCost(def, 3)."
      }
    ],
    "returns": "integer — floor(costBase * costGrowth ^ level)",
    "note": "Generated. Do not reimplement the curve anywhere else. A purchase is legal only while the held level is strictly below def.maxLevel, so the highest price ever charged is upgradeCost(def, maxLevel - 1). firstSession.withheld.upgradeRow lifts row i when the balance reaches upgradeCost(def_i, 0), which is the same call with the same convention."
  },
  {
    "module": "config",
    "fn": "upgradeEffect(upgrade, level)",
    "params": [
      {
        "name": "upgrade",
        "type": "UpgradeDef",
        "note": "needs base, perLevel and mode"
      },
      {
        "name": "level",
        "type": "integer",
        "meaning": "the level currently HELD, same convention as upgradeCost. Effect at level 0 is def.base, which is the pre-upgrade value: 5.5 studs for radius, 16 for speed, 1.0 for value."
      }
    ],
    "returns": "number — base + perLevel * level when mode is \"additive\", base * perLevel ^ level when mode is \"compounding\"",
    "note": "STEP 1 OF modifiers.resolutionOrder, and the only place the additive-versus-compounding question is answered. modifiers.axes[].baseFrom says of all three axes that the base is 'already inside upgradeEffect', and modifiers.baseIsNotAppliedTwice forbids multiplying it in again — so modifiers.effective calls this ONCE and multiplies FACTORS onto its result. All three shipped upgrades are additive today, which is exactly why hand-inlining looks harmless and would silently ignore a future compounding axis."
  },
  {
    "module": "config",
    "fn": "tierByWeight(roll)",
    "params": [
      {
        "name": "roll",
        "type": "number",
        "meaning": "a uniform sample in [0, 1). Not a weight, not a tier index, and not pre-scaled by the weight total — the function scales it. It must come from layout's seeded stream; rarity.ladders[overgrowth-tier].rolled is true and rolledFrom is tiers[].weight."
      }
    ],
    "returns": "(integer, TierDef) — the 1-based index into GameConfig.Tiers, then the tier table",
    "note": "The integer is what goes into Patch.tierIndex; the table is for reading value, height and shape at the point of use. Storing the table in a Patch instead of the index is forbidden by 03-state-shape: re-emitting the config would leave stale names in live patches. rarity.depthRarityChannel wants these weights shifted toward the rare end per depth and rarity.depthRarityBlocker says tiers has no depth dimension, so there is ONE weight table for all four depths and adding a second is a revision to the tiers sheet, not a branch here."
  },
  {
    "module": "protocol",
    "fn": "REMOTES",
    "params": [],
    "returns": "table — the seven channels below, keyed by name, each with its class, direction, payload and the one module that originates it. NAMES AND CLASSES, NOT INSTANCES: protocol.channel(name) returns the Instance.",
    "note": "A TABLE, NOT A CALLABLE. Exactly seven, and no more. THE TWO CLIENT-TO-SERVER NAMES ARE input.clientOriginatedRemotes VERBATIM — RequestState and BuyUpgrade — and this module's first criterion checks the two lists against each other in both directions, which is what makes 'the client surface is closed' a merge property rather than a promise. There is deliberately no clearing channel and no currency channel: the server observes clearing on a tick, so there is nothing for a client to claim, and economy.authority says no client message carries a cost, an amount or a balance. Two channels are new since wave 1 and both come from response: setComplete and areaComplete are distinct beats on the notice channel with their own budgets, and response.channelExclusivity forbids either sharing atPatch with a reveal; upgradePurchased has a 200 ms acknowledgment budget and input.verbs[buy].onPreconditionFail is silentNoOp, so a client cannot tell an accepted purchase from a dropped one by diffing snapshots. NO PAYLOAD CARRIES A PLAYER IDENTIFIER OTHER THAN THE RECIPIENT'S — social.forbidden X7 — and none carries a player-authored string, which is X9.",
    "channels": [
      {
        "name": "RequestState",
        "class": "RemoteFunction",
        "direction": "client -> server",
        "payload": "no arguments; returns one snapshot",
        "firedBy": "client-main",
        "handledBy": "server-main, which sets OnServerInvoke at boot",
        "why": "client-main may not assume the join-time push arrived, so it pulls once after its updaters are live"
      },
      {
        "name": "StateChanged",
        "class": "RemoteEvent",
        "direction": "server -> client",
        "payload": "one snapshot, exactly the fields snapshotShape() names",
        "firedBy": "server-main on join, on spawn and after a successful purchase; clearing once per tick in which anything changed",
        "handledBy": "client-main, which fans it out to every updater",
        "why": "TWO ORIGINATORS, deliberately and safely: it carries a whole snapshot rather than a delta, so a duplicate is idempotent. currency, clearedCount, found and areasFinished only ever change inside the tick, so without clearing firing it the readouts sit frozen until the next purchase."
      },
      {
        "name": "BuyUpgrade",
        "class": "RemoteEvent",
        "direction": "client -> server",
        "payload": "one upgrade id string and nothing else",
        "firedBy": "input",
        "handledBy": "server-main, wiring.onPurchase",
        "why": "one of the two client-originated messages in the game, and the only one a player's input produces — input.clientRemotesFiredByPlayerInput is exactly [BuyUpgrade]. The server prices it."
      },
      {
        "name": "FindRevealed",
        "class": "RemoteEvent",
        "direction": "server -> client",
        "payload": "one Find name string, from Patch.find",
        "firedBy": "clearing",
        "handledBy": "beats, as response.beats[findReveal]: rank 1, 300 ms acknowledgment budget, channels atPatch and audio, notice FORBIDDEN, queued, 2.5 s dwell",
        "why": "up to collection.relicsPerArea (3) times per area, per player, and never for a post-terminal area"
      },
      {
        "name": "SetCompleted",
        "class": "RemoteEvent",
        "direction": "server -> client",
        "payload": "one collection.sets[].id string",
        "firedBy": "clearing",
        "handledBy": "beats, as response.beats[setComplete]: rank 2, 400 ms budget, channels notice and audio, queued",
        "why": "exactly once per player per set, on the sixth Find of that set — response.beats[setComplete].cause is sixthFindOfSetRevealed. A separate channel from FindRevealed because response.channelExclusivity puts them on two channels and gameplay/core-loop/03 rejects carrying one on the other behind a string prefix."
      },
      {
        "name": "AreaRestored",
        "class": "RemoteEvent",
        "direction": "server -> client",
        "payload": "the area label string from layout.areaSpec(ordinal).label",
        "firedBy": "clearing",
        "handledBy": "beats, as response.beats[areaComplete]: rank 3, 400 ms budget, channels notice and audio, atPatch FORBIDDEN, queued",
        "why": "exactly once per player per area, on the latch transition only — response.beats[areaComplete].cause is lastStandingPatchCleared. A post-terminal area fires it too: endgame.survivingPayoffKinds includes areaCompletion."
      },
      {
        "name": "UpgradeApplied",
        "class": "RemoteEvent",
        "direction": "server -> client",
        "payload": "one upgrade id string and the new held level",
        "firedBy": "server-main",
        "handledBy": "beats, as response.beats[upgradePurchased]: rank 4, 200 ms budget, channels readout and audio, queued, effectAppliedBeforeAcknowledgment true",
        "why": "fired ONLY on a successful purchase. input.verbs[buy].onPreconditionFail is silentNoOp, so a failed buy produces no packet at all — which is exactly why success needs one: recovering the event by diffing two snapshots makes a 200 ms budget unmeasurable."
      }
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
      {
        "name": "name",
        "type": "string",
        "note": "a key of REMOTES, taken from that table rather than hand-typed wherever the call site can reach it"
      }
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
      {
        "name": "state",
        "type": "PlayerState",
        "note": "read for upgrades, found and owned, and written never. This function is pure."
      },
      {
        "name": "axis",
        "type": "string",
        "note": "exactly one of \"value\", \"radius\", \"speed\". modifiers.axisIdsJoinUpgrades: axes[].id is upgrades[].id verbatim, and 'Pace is a label and never an id'. Any other string is an error, not a fallback."
      }
    ],
    "returns": "number — the axis's effective value: a multiplier for value, studs for radius, studs per second for speed",
    "note": "THE ONE IMPLEMENTATION — modifiers.singleDefinition. modifiers.composition writes it out: clamp(upgradeEffect(axis, heldLevel) * PROD(setFactors(axis)) * PROD(purchaseFactors(axis)), ceilingRule). FOUR STEPS, IN modifiers.resolutionOrder AND IN NO OTHER ORDER: (1) config.upgradeEffect(def, state.upgrades[axis] or 0) — this ALREADY CONTAINS upgrades[axis].base and modifiers.baseIsNotAppliedTwice forbids multiplying it in again; (2) multiply by every set factor on this axis, for every set in collection.sets whose six names are all true in state.found, in collection declaration order — setBonus.rows says WHICH axis each set targets and setBonus.invariants forbids a row carrying a magnitude, so an absent factor is 1.0 and modifiers warns once at boot naming the four sets, WHICH MEANS A COMPLETED SET CURRENTLY CHANGES NOTHING; (3) multiply by products.items[].factor for every item whose axis matches and whose id is true in state.owned, in offer-ladder order — every gamePassId is null today so this step is currently empty too; (4) clamp ONCE against ceiling(axis, state.areasFinished + 1), never between two sources — modifiers.clampApplication. Derives set completion from state.found on EVERY CALL and caches nothing: modifiers.sources[set-completion].storage is 'derived from discovery.record at every read; never latched, never persisted', which is why there is no setsComplete field to go stale. Never yields. Never writes. Called by clearing (radius and value, every tick), by server-main (speed, on spawn and after a purchase) and by tool (radius, on spawn and after a purchase), and by no client module."
  },
  {
    "module": "modifiers",
    "fn": "ceiling(axis, areaOrdinal)",
    "params": [
      {
        "name": "axis",
        "type": "string",
        "note": "\"value\", \"radius\" or \"speed\""
      },
      {
        "name": "areaOrdinal",
        "type": "integer",
        "meaning": "the 1-based area ordinal the ceiling is being evaluated for — state.areasFinished + 1 at every live call site. It is a parameter because modifiers.axes[radius].ceilingRule is 'effective < area.size / 2' and products.headroom.ceilings.radius is 'min over depths of (area.size(N) / 2)', so the rule is per area even though every area is the same lane width today."
      }
    ],
    "returns": "number? — the ceiling for that axis, or nil when the axis has none",
    "note": "modifiers.axes[value].ceilingRule is null with the reason 'a currency multiplier breaks no invariant', so this returns nil for value and the clamp is skipped. radius: area.size / 2 = 60, which is plots.laneWidthStuds / 2 and the same number by both routes — beyond it 'one position clears the whole area and a lap stops existing'. speed: movement.baseClearRadius / runtime.clearTickRate = 5.5 / 0.12 = 45.83 — beyond it 'the player outruns the tool between ticks and patches are never cleared'. Also the input to the boot-time headroom assertion: products.headroom.rule requires ladderMax(A) * every set factor * every product factor to stay at or below products.headroom.marginFraction (0.9) times this, for every axis and every depth, and products.headroom.clampMayAbsorbAPurchase is false — so a configuration where the clamp would eat a purchased factor is a boot-time warning, not a silent flatline."
  },
  {
    "module": "progression",
    "fn": "award(state, amount)",
    "params": [
      {
        "name": "state",
        "type": "PlayerState"
      },
      {
        "name": "amount",
        "type": "integer",
        "meaning": "a positive whole number of currency to ADD to the balance. Not a new total, and ALREADY MULTIPLIED by modifiers.effective(state, 'value') by the caller — award applies no multiplier of its own. economy.faucets[patch-clear].multiplierAppliedOnce is 'at this site only; never again inside the award function', and modifiers.forbidden bans applying it in both places."
      }
    ],
    "returns": "number — the new balance",
    "note": "The only function that increases currency, and clearing is its only caller — economy.faucetCount is 1. Rejects a non-positive amount rather than clamping, because clearing's minimum payout is economy.payoutFloor (1). Calls revealRows(state) after crediting, so a row lifts on the tick the balance crosses its threshold rather than on the next purchase attempt. Does not cap: economy.balanceCap is null."
  },
  {
    "module": "progression",
    "fn": "tryBuy(state, upgradeId)",
    "params": [
      {
        "name": "state",
        "type": "PlayerState"
      },
      {
        "name": "upgradeId",
        "type": "string",
        "note": "one of the ids in upgrades: value, radius, speed. Sent by the client as a bare string and validated here; never a cost, never a level, never a target."
      }
    ],
    "returns": "boolean — true only if currency was deducted and the level incremented",
    "note": "Reads the held level from state.upgrades[upgradeId], treating nil as 0; prices it with config.upgradeCost(def, heldLevel); on success deducts exactly that and increments the level by exactly 1. Returns false and changes NOTHING if the id is unknown, if the held level already equals def.maxLevel, or if state.currency is below the cost — economy.sinks[0].onInsufficientFunds is 'nothing changes, nothing is deducted, no partial purchase exists' and refundable is false. THE FAILURE IS SILENT: input.verbs[buy].onPreconditionFail is silentNoOp and input.pressable.rejectionCueOnFailedPrecondition is 'none', so server-main sends nothing at all on a false return. economy.sinkCount is 1 and this is it."
  },
  {
    "module": "progression",
    "fn": "revealRows(state)",
    "params": [
      {
        "name": "state",
        "type": "PlayerState"
      }
    ],
    "returns": "boolean — true if any row lifted on this call",
    "note": "For each upgrades[] entry i, sets state.rowsRevealed[id] = true when state.currency is at or above config.upgradeCost(def_i, 0) — firstSession.withheld.upgradeRow.liftedBy is 'balance has reached upgrades[i] level-1 cost'. NEVER SETS ONE FALSE: firstSession.suppressionForbidden lists reSuppression, so a row that has appeared stays. Called by award after every credit, and once by server-main in onJoin so a returning player's rows are consistent with a balance that may have moved in a previous version. Writes nothing else."
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
      {
        "name": "n",
        "type": "integer",
        "meaning": "a slot index previously returned by claimSlot, being returned to the free pool. Not a player count and not a plot Instance. Releasing an index that is not currently taken is a no-op, not an error."
      }
    ],
    "returns": "nil",
    "note": "Called by plots.despawn. The free pool hands back the lowest free index first."
  },
  {
    "module": "plots",
    "fn": "spawn(player, state)",
    "params": [
      {
        "name": "player",
        "type": "Player"
      },
      {
        "name": "state",
        "type": "PlayerState",
        "note": "read for areasFinished and cleared, written for patches and spawnPivot"
      }
    ],
    "returns": "CFrame — the live bay's spawn point, the WorldCFrame of the lane's spawn Attachment",
    "note": "Claims a slot, then builds the lane for a player whose live area is state.areasFinished + 1: the slab spanning plots.pitchStuds across and from 12 studs outward of bay 1 to 12 studs inward of the live bay's end (traversal.boundary.walkableMarginStuds), the four boundary parts, the spawn Attachment, and ONE INSTANCE PER PATCH THAT state.cleared DOES NOT MARK, IN THE LIVE BAY ONLY. plots.liveGeometry: patchInstancesExistIn 'the live bay only', groundExistsIn 'every bay from 1 up to and including the live bay', builtWhole true. Every bay below the live one is bare walkable floor with no patch Instance and no patch record — which is what makes 'cleared is permanent' structural rather than latched, and is why no rejoin can pay for a finished area a second time. Writes state.patches (records for the LIVE bay only, cleared ones kept with instance nil so indices stay aligned with layout's order) and state.spawnPivot. Converts layout's plot-local positions to WORLD by adding the slot origin, and it is the ONLY place that conversion happens. Sizes and properties are fixed in representation. Calling it twice for one player without a despawn between is a bug, not a second lane."
  },
  {
    "module": "plots",
    "fn": "advance(state)",
    "params": [
      {
        "name": "state",
        "type": "PlayerState",
        "note": "read for the NEW areasFinished, which clearing has already incremented; written for patches and spawnPivot"
      }
    ],
    "returns": "CFrame — the new live bay's spawn point",
    "note": "CALLED BY clearing, FROM INSIDE THE TICK, ON THE PASS THAT FINISHES AN AREA, AND FROM NOWHERE ELSE. plots.liveGeometry.bayBuiltAt is 'the instant the previous bay's last patch clears', so this is not a deferred job. In order: destroy every patch Instance of the bay just finished (there are none left standing, but the records go); extend the slab inward to cover the new live bay plus traversal.boundary.walkableMarginStuds; move the inward boundary part to the new end; build layout.build(state.areasFinished + 1)'s patch Instances, all of them, since state.cleared was emptied with the increment; rewrite state.patches and state.spawnPivot; move the spawn Attachment to the new bay's spawn point, (0, 0, plots.bays[k].zStart + 8) in plot-local — the same +8 plots.spawn.plotLocal gives bay 1. DESTROYS NOTHING A PLAYER IS STANDING ON: the floor is only ever extended, never shortened. plots.liveGeometry.torndownBeyond talks about tearing bays down beyond the live one minus two and rebuilding them BARE on re-entry; a finished bay in this build IS bare — it holds ground and nothing else — so there is nothing to tear down and the ground invariant wins. That changes the day Art dresses a bay, and the rule acquires a subject then."
  },
  {
    "module": "plots",
    "fn": "despawn(state)",
    "params": [
      {
        "name": "state",
        "type": "PlayerState"
      }
    ],
    "returns": "nil",
    "note": "Destroys the lane for state.player, clears state.patches and state.spawnPivot, and releases the slot internally via releaseSlot. Recovers the slot from its own registry keyed by UserId — PlayerState carries no slot field and must not gain one. Does not save: server-main calls persistence.save before this. social.plotTenure.onLeaveMidArea: 'the plot instance tree is destroyed and the slot freed; the partial cleared set survives only in the leaving player's own save; nothing about the departure is perceptible to any remaining player' — so no notice, no sound and no string, which is social.forbidden X11."
  },
  {
    "module": "clearing",
    "fn": "tick(states)",
    "params": [
      {
        "name": "states",
        "type": "map<UserId, PlayerState>",
        "meaning": "the WHOLE live collection, one entry per connected player, keyed by UserId as an integer. Not an array, not keyed by Player, and not one player's state. See stateShape.collection."
      }
    ],
    "returns": "nil",
    "note": "One pass, in this order, per state. (1) THE ARMING GATE, FIRST: if state.armState.character is not state.player.Character, rewrite armState as { character = the current character, armed = false } — that is how firstSession.armScope 'perCharacterSpawn' resets without a second module writing the field. Skip the state if the character or its HumanoidRootPart is absent. If not armed, test the horizontal XZ distance from state.spawnPivot; if it exceeds firstSession.armDistanceStuds (2.0), set armed true; if it does not, RETURN FOR THIS STATE — no distance work, no clear, no award, no packet. firstSession.armMeasuredOn is 'server, horizontal XZ displacement of the character root from the plot spawn pivot' and this is that sentence. (2) Read radius once with modifiers.effective(state, 'radius'). (3) For every record in state.patches with cleared false whose XZ distance to the root part is within radius — XZ only, so height never affects reach: set patch.cleared, destroy patch.instance and nil the field, set state.cleared[index], increment state.clearedCount, and call progression.award with max(economy.payoutFloor, floor(tiers[patch.tierIndex].value * modifiers.effective(state, 'value'))), which is economy.faucets[patch-clear].formula verbatim and is the ONLY site the value multiplier is applied — economy.faucets[patch-clear].rounding is 'floor, never round-half-up'. If patch.find is set and state.found[patch.find] is not, set it and fire FindRevealed; then, if every name in that Find's set is now true, fire SetCompleted once with the set id. (4) After the loop, if clearedCount >= layout.areaSpec(state.areasFinished + 1).patchCount: increment state.areasFinished by exactly 1, EMPTY state.cleared, set clearedCount to 0, call plots.advance(state) and fire AreaRestored once with the finished area's label. (5) Finally, if the pass changed anything, fire StateChanged once with a fresh snapshot — at most one per player per tick, none on a pass that cleared nothing. Every channel through protocol.channel(name). Never reads a client message; never uses Touched. THERE IS NO AREA-COMPLETE LATCH TO CHECK: a finished bay has no record in state.patches, so step 3 has nothing to iterate over it, which is why the wave-1 rejoin farm cannot recur."
  },
  {
    "module": "clearing",
    "fn": "start(states)",
    "params": [
      {
        "name": "states",
        "type": "map<UserId, PlayerState>",
        "meaning": "the same live collection tick receives, captured once. Held by reference: server-main mutates the same table as players join and leave, and clearing never copies it."
      }
    ],
    "returns": "nil",
    "note": "Installs the runtime.clearTickRate loop (0.12s) and returns immediately. Called once by server-main at boot, before any player can join, so an empty collection on the first ticks is normal. Wraps each tick in a pcall and warns: an error in one iteration may not stop the loop. Owns the cadence, so no other module reads runtime.clearTickRate — except modifiers.ceiling, which reads it as a NUMBER to compute the speed ceiling and never as a cadence."
  }
]
```

### Done when

1. a character that has not moved firstSession.armDistanceStuds since it spawned clears nothing, however many patches are inside its radius; moving 2.0 studs in any direction arms it for that character's whole life
2. with the first Find at firstSession.placement.spawnToNearestPatchMaxStuds (3.5) from the spawn point, arming and clearing it both happen within firstSession.ceilings.secondsToFirstClear (3 s) of the first input
3. walking within modifiers.effective(state, 'radius') of a patch clears it within one tick
4. payout equals floor(tiers[tierIndex].value * modifiers.effective(state, 'value')), minimum economy.payoutFloor
5. clearing the last patch of the live bay increments areasFinished exactly once, empties cleared, zeroes clearedCount, calls plots.advance and fires AreaRestored exactly once
6. clearedCount never exceeds the live area's patchCount, over any number of rejoins and any number of areas
7. the sixth Find of a set fires SetCompleted exactly once, ever, per player per set
8. a player who has found every name in collection keeps clearing, keeps being paid and keeps advancing into post-terminal areas — endgame.gameEnds is false and survivingPayoffKinds is currencyTick and areaCompletion
9. clearing one patch pushes exactly one StateChanged; standing still for ten ticks pushes none

---

## 16. `input` — client

**Write to:** `game/src/client/Input.luau`

**Owns:** Adjudicate the two game-bound verbs: turn a pressable activation into a BuyUpgrade message or an index toggle. Binds no key as the only path to either.

**Depends on:** `protocol`, `pressables`, `index-screen`

**Fires:** `BuyUpgrade`. Resolve each one through the module that declares the channel list — never by searching the tree, and never by a name you typed yourself.

### Must expose

- `connect(gui)`

### Must not

- binding Enum.KeyCode.One, Two or Three as the only way to buy. THE SHIPPED FILE DOES EXACTLY THAT AND IS SUPERSEDED: input.gameBoundInputClasses is ['pressable'], and a keyboard-only purchase path leaves a mobile-heavy audience unable to spend
- binding move, look or jump. input.verbs[move|look|jump].boundByGame is false for all three; those are platform controls and this module never touches them
- sending anything except an upgrade id. The server owns cost and level — economy.authority, and input.verbs[buy].adjudicatedBy is 'server'
- sending a message on a failed precondition. input.verbs[buy].precondition is 'balance >= cost && level < maxLevel' and onPreconditionFail is silentNoOp — the client may PREDICT the precondition to grey nothing, but the server decides and the client sends nothing when it knows it would fail
- firing any channel that is not in input.clientOriginatedRemotes
- accepting a table of remote Instances from its caller, or resolving one by name. It asks protocol.channel("BuyUpgrade")

### Values

#### `input` *(from gameplay/mechanics/02-verb-roster.md)*

```json
{
  "closed": true,
  "gameBoundInputClasses": [
    "pressable"
  ],
  "gameDrawnPressables": 4,
  "travelRequiredToPurchase": "none",
  "clientOriginatedRemotes": [
    "RequestState",
    "BuyUpgrade"
  ],
  "clientRemotesFiredByPlayerInput": [
    "BuyUpgrade"
  ],
  "verbs": [
    {
      "id": "move",
      "trigger": "platformMovementControl",
      "boundByGame": false,
      "kind": "continuousDirectional",
      "precondition": "characterSpawned",
      "adjudicatedBy": "client",
      "devices": [
        "touch",
        "keyboard",
        "gamepad"
      ]
    },
    {
      "id": "look",
      "trigger": "platformCameraControl",
      "boundByGame": false,
      "kind": "continuousFreeLook",
      "precondition": "none",
      "adjudicatedBy": "client",
      "devices": [
        "touch",
        "keyboard",
        "gamepad"
      ]
    },
    {
      "id": "jump",
      "trigger": "platformJumpControl",
      "boundByGame": false,
      "kind": "discreteImpulse",
      "precondition": "onGround",
      "adjudicatedBy": "client",
      "devices": [
        "touch",
        "keyboard",
        "gamepad"
      ]
    },
    {
      "id": "buy",
      "trigger": "gamePressable",
      "pressableRole": "purchase",
      "boundByGame": true,
      "kind": "discreteSelect",
      "precondition": "balance >= cost && level < maxLevel",
      "onPreconditionFail": "silentNoOp",
      "adjudicatedBy": "server",
      "devices": [
        "touch",
        "keyboard",
        "gamepad"
      ]
    },
    {
      "id": "openIndex",
      "trigger": "gamePressable",
      "pressableRole": "index",
      "boundByGame": true,
      "kind": "discreteSelect",
      "precondition": "none",
      "adjudicatedBy": "client",
      "devices": [
        "touch",
        "keyboard",
        "gamepad"
      ]
    }
  ],
  "pressable": {
    "roles": [
      {
        "role": "purchase",
        "count": 3,
        "boundTo": "upgrades declaration order",
        "adjudicatedBy": "server",
        "persistent": true
      },
      {
        "role": "index",
        "count": 1,
        "adjudicatedBy": "client",
        "persistent": true
      }
    ],
    "activationsPerPress": 1,
    "debounceSeconds": 0.35,
    "holdRequired": false,
    "chordRequired": false,
    "rejectionCueOnFailedPrecondition": "none",
    "affordabilityByColourAlone": false,
    "minTouchTargetRule": "notSmallerThanPlatformJumpButton",
    "mayOverlapPlatformControlRegions": false,
    "gamepadSelectable": true,
    "keyboardAcceleratorAllowed": true,
    "keyboardAcceleratorRequired": false,
    "indexScreenSuspendsMovement": true
  },
  "worldObjectsTriggeringAVerb": 0
}
```

#### `upgrades` *(from gameplay/balance/01-upgrade-ladder.md)*

```json
[
  {
    "id": "value",
    "label": "Value",
    "blurb": "Each patch pays more",
    "costBase": 25,
    "costGrowth": 1.6,
    "maxLevel": 10,
    "perLevel": 0.25,
    "base": 1,
    "mode": "additive"
  },
  {
    "id": "radius",
    "label": "Reach",
    "blurb": "Clear a wider sweep as you walk",
    "costBase": 40,
    "costGrowth": 1.75,
    "maxLevel": 8,
    "perLevel": 1.1,
    "base": 5.5,
    "mode": "additive"
  },
  {
    "id": "speed",
    "label": "Pace",
    "blurb": "Move faster between patches",
    "costBase": 60,
    "costGrowth": 1.8,
    "maxLevel": 6,
    "perLevel": 1.6,
    "base": 16,
    "mode": "additive"
  }
]
```

#### `interfaces (yours and your dependencies')`

```json
[
  {
    "module": "protocol",
    "fn": "REMOTES",
    "params": [],
    "returns": "table — the seven channels below, keyed by name, each with its class, direction, payload and the one module that originates it. NAMES AND CLASSES, NOT INSTANCES: protocol.channel(name) returns the Instance.",
    "note": "A TABLE, NOT A CALLABLE. Exactly seven, and no more. THE TWO CLIENT-TO-SERVER NAMES ARE input.clientOriginatedRemotes VERBATIM — RequestState and BuyUpgrade — and this module's first criterion checks the two lists against each other in both directions, which is what makes 'the client surface is closed' a merge property rather than a promise. There is deliberately no clearing channel and no currency channel: the server observes clearing on a tick, so there is nothing for a client to claim, and economy.authority says no client message carries a cost, an amount or a balance. Two channels are new since wave 1 and both come from response: setComplete and areaComplete are distinct beats on the notice channel with their own budgets, and response.channelExclusivity forbids either sharing atPatch with a reveal; upgradePurchased has a 200 ms acknowledgment budget and input.verbs[buy].onPreconditionFail is silentNoOp, so a client cannot tell an accepted purchase from a dropped one by diffing snapshots. NO PAYLOAD CARRIES A PLAYER IDENTIFIER OTHER THAN THE RECIPIENT'S — social.forbidden X7 — and none carries a player-authored string, which is X9.",
    "channels": [
      {
        "name": "RequestState",
        "class": "RemoteFunction",
        "direction": "client -> server",
        "payload": "no arguments; returns one snapshot",
        "firedBy": "client-main",
        "handledBy": "server-main, which sets OnServerInvoke at boot",
        "why": "client-main may not assume the join-time push arrived, so it pulls once after its updaters are live"
      },
      {
        "name": "StateChanged",
        "class": "RemoteEvent",
        "direction": "server -> client",
        "payload": "one snapshot, exactly the fields snapshotShape() names",
        "firedBy": "server-main on join, on spawn and after a successful purchase; clearing once per tick in which anything changed",
        "handledBy": "client-main, which fans it out to every updater",
        "why": "TWO ORIGINATORS, deliberately and safely: it carries a whole snapshot rather than a delta, so a duplicate is idempotent. currency, clearedCount, found and areasFinished only ever change inside the tick, so without clearing firing it the readouts sit frozen until the next purchase."
      },
      {
        "name": "BuyUpgrade",
        "class": "RemoteEvent",
        "direction": "client -> server",
        "payload": "one upgrade id string and nothing else",
        "firedBy": "input",
        "handledBy": "server-main, wiring.onPurchase",
        "why": "one of the two client-originated messages in the game, and the only one a player's input produces — input.clientRemotesFiredByPlayerInput is exactly [BuyUpgrade]. The server prices it."
      },
      {
        "name": "FindRevealed",
        "class": "RemoteEvent",
        "direction": "server -> client",
        "payload": "one Find name string, from Patch.find",
        "firedBy": "clearing",
        "handledBy": "beats, as response.beats[findReveal]: rank 1, 300 ms acknowledgment budget, channels atPatch and audio, notice FORBIDDEN, queued, 2.5 s dwell",
        "why": "up to collection.relicsPerArea (3) times per area, per player, and never for a post-terminal area"
      },
      {
        "name": "SetCompleted",
        "class": "RemoteEvent",
        "direction": "server -> client",
        "payload": "one collection.sets[].id string",
        "firedBy": "clearing",
        "handledBy": "beats, as response.beats[setComplete]: rank 2, 400 ms budget, channels notice and audio, queued",
        "why": "exactly once per player per set, on the sixth Find of that set — response.beats[setComplete].cause is sixthFindOfSetRevealed. A separate channel from FindRevealed because response.channelExclusivity puts them on two channels and gameplay/core-loop/03 rejects carrying one on the other behind a string prefix."
      },
      {
        "name": "AreaRestored",
        "class": "RemoteEvent",
        "direction": "server -> client",
        "payload": "the area label string from layout.areaSpec(ordinal).label",
        "firedBy": "clearing",
        "handledBy": "beats, as response.beats[areaComplete]: rank 3, 400 ms budget, channels notice and audio, atPatch FORBIDDEN, queued",
        "why": "exactly once per player per area, on the latch transition only — response.beats[areaComplete].cause is lastStandingPatchCleared. A post-terminal area fires it too: endgame.survivingPayoffKinds includes areaCompletion."
      },
      {
        "name": "UpgradeApplied",
        "class": "RemoteEvent",
        "direction": "server -> client",
        "payload": "one upgrade id string and the new held level",
        "firedBy": "server-main",
        "handledBy": "beats, as response.beats[upgradePurchased]: rank 4, 200 ms budget, channels readout and audio, queued, effectAppliedBeforeAcknowledgment true",
        "why": "fired ONLY on a successful purchase. input.verbs[buy].onPreconditionFail is silentNoOp, so a failed buy produces no packet at all — which is exactly why success needs one: recovering the event by diffing two snapshots makes a 200 ms budget unmeasurable."
      }
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
      {
        "name": "name",
        "type": "string",
        "note": "a key of REMOTES, taken from that table rather than hand-typed wherever the call site can reach it"
      }
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
    "module": "pressables",
    "fn": "bind(gui, onActivate)",
    "params": [
      {
        "name": "gui",
        "type": "ScreenGui",
        "note": "the HUD ScreenGui client-main created. The four buttons are parented inside it."
      },
      {
        "name": "onActivate",
        "type": "(role: string, index: number) -> ()",
        "note": "called on an ACCEPTED press. role is \"purchase\" or \"index\", exactly the two entries of input.pressable.roles. For \"purchase\", index is the 1-based position in GameConfig.Upgrades — input.pressable.roles[purchase].boundTo is 'upgrades declaration order', so 1 is Value, 2 is Reach, 3 is Pace. For \"index\", it is always 1. THIS ARGUMENT IS THE SEAM THAT REPLACES Enum.KeyCode.One: the button decides that a press happened, input decides what it means."
      }
    ],
    "returns": "(snapshot) -> () — an updater the caller invokes with every snapshot",
    "note": "THE ONE FUNCTION IN THIS BUILD THAT AUTHORS UI STRUCTURE, and it authors exactly four TextButtons — input.gameDrawnPressables is 4 and input.pressable.roles is three purchase plus one index. It exists because ui-forge's hud-overlay pattern ships no pressable readout; that is a default rather than an incapability, and the day it grows one this function resolves four node names instead of creating four Instances, with no other change anywhere. Names, sizes and properties are fixed in representation under `pressable`. RULES, ALL FROM input.pressable: one activation per press (activationsPerPress 1) with a 0.35 s debounce; no hold and no chord (holdRequired false, chordRequired false); NO REJECTION CUE when the precondition fails (rejectionCueOnFailedPrecondition 'none', and input.verbs[buy].onPreconditionFail is silentNoOp) — an unaffordable press does nothing, shows nothing and plays nothing; not smaller than the platform jump button (minTouchTargetRule) and never overlapping a platform control region (mayOverlapPlatformControlRegions false); gamepad-selectable; a keyboard accelerator is ALLOWED and NOT REQUIRED, so 1/2/3 may exist beside the buttons and may never be the only path. The updater applies affordability — by text and not by colour alone — and row visibility from snapshot.rowsRevealed, appearing a button without moving the other three (firstSession.suppressionForbidden bans reflowOnLift). Both roles are persistent: the buttons are created once and survive a respawn."
  },
  {
    "module": "index-screen",
    "fn": "bind(gui)",
    "params": [
      {
        "name": "gui",
        "type": "ScreenGui",
        "note": "the HUD ScreenGui; the collection surface is a frame inside it, created hidden"
      }
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
      {
        "name": "gui",
        "type": "ScreenGui",
        "note": "the HUD ScreenGui, passed straight to pressables.bind"
      }
    ],
    "returns": "(snapshot) -> () — the updater pressables.bind returned, passed through so client-main holds no handle",
    "note": "Calls pressables.bind(gui, onActivate) once and installs the handler. On role \"purchase\" with index i: read the id of GameConfig.Upgrades[i] and fire protocol.channel(\"BuyUpgrade\"):FireServer(id) — ONE STRING AND NOTHING ELSE, no cost, no level, no target, because economy.authority is 'server only' and input.verbs[buy].adjudicatedBy is 'server'. On role \"index\": call index-screen.toggle(), locally, with no packet. THE SHIPPED FILE BINDS Enum.KeyCode.One, Two AND Three AND IS SUPERSEDED: input.gameBoundInputClasses is exactly ['pressable'], input.travelRequiredToPurchase is 'none' and input.worldObjectsTriggeringAVerb is 0, so the purchase surface is a button on screen, reachable by touch, and a keyboard accelerator may exist beside it but may never be the only path — input.pressable.keyboardAcceleratorRequired is false. Binds nothing for move, look or jump: all three have boundByGame false and are the platform's. Ignores input while UserInputService:GetFocusedTextBox() is non-nil. Resolves its own channel with protocol.channel and accepts no Instance from its caller."
  }
]
```

### Done when

1. `grep -rn 'KeyCode' game/src/client/Input.luau` finds no binding that is the sole path to a verb
2. a purchase is reachable on a touch device with no keyboard and no gamepad, in one press, with no travel — input.travelRequiredToPurchase is 'none'
3. the index verb is adjudicated on the client and the buy verb on the server, per input.verbs[].adjudicatedBy
4. input while a text field is focused is ignored
5. exactly one BuyUpgrade message leaves the client per accepted press, carrying one string

---

## 17. `client-main` — client

**Write to:** `game/src/client/init.client.luau`

**Owns:** Boot the HUD screen, connect every binder, connect every server-to-client channel, and ask the server for initial state.

**Depends on:** `protocol`, `hud-binding`, `pressables`, `index-screen`, `beats`, `input`

**Fires:** `RequestState`. Resolve each one through the module that declares the channel list — never by searching the tree, and never by a name you typed yourself.

### Must expose

- nothing. This is an entry point: the engine runs it, and no module may require it.

### Must not

- being required by any other module. This is the client entry point and Roblox is its only caller
- assuming the server's join-time push arrived; state is requested once every handler is live
- resolving a remote by name or by search; protocol.channel(name) is the only lookup
- authoring UI structure. It creates one ScreenGui and calls UIBuilder.build; pressables owns the four buttons and index-screen owns the collection surface
- leaving a server-to-client channel unconnected. An unconnected channel is an output with nothing at the end of it

### Values

#### `interfaces (yours and your dependencies')`

```json
[
  {
    "module": "protocol",
    "fn": "REMOTES",
    "params": [],
    "returns": "table — the seven channels below, keyed by name, each with its class, direction, payload and the one module that originates it. NAMES AND CLASSES, NOT INSTANCES: protocol.channel(name) returns the Instance.",
    "note": "A TABLE, NOT A CALLABLE. Exactly seven, and no more. THE TWO CLIENT-TO-SERVER NAMES ARE input.clientOriginatedRemotes VERBATIM — RequestState and BuyUpgrade — and this module's first criterion checks the two lists against each other in both directions, which is what makes 'the client surface is closed' a merge property rather than a promise. There is deliberately no clearing channel and no currency channel: the server observes clearing on a tick, so there is nothing for a client to claim, and economy.authority says no client message carries a cost, an amount or a balance. Two channels are new since wave 1 and both come from response: setComplete and areaComplete are distinct beats on the notice channel with their own budgets, and response.channelExclusivity forbids either sharing atPatch with a reveal; upgradePurchased has a 200 ms acknowledgment budget and input.verbs[buy].onPreconditionFail is silentNoOp, so a client cannot tell an accepted purchase from a dropped one by diffing snapshots. NO PAYLOAD CARRIES A PLAYER IDENTIFIER OTHER THAN THE RECIPIENT'S — social.forbidden X7 — and none carries a player-authored string, which is X9.",
    "channels": [
      {
        "name": "RequestState",
        "class": "RemoteFunction",
        "direction": "client -> server",
        "payload": "no arguments; returns one snapshot",
        "firedBy": "client-main",
        "handledBy": "server-main, which sets OnServerInvoke at boot",
        "why": "client-main may not assume the join-time push arrived, so it pulls once after its updaters are live"
      },
      {
        "name": "StateChanged",
        "class": "RemoteEvent",
        "direction": "server -> client",
        "payload": "one snapshot, exactly the fields snapshotShape() names",
        "firedBy": "server-main on join, on spawn and after a successful purchase; clearing once per tick in which anything changed",
        "handledBy": "client-main, which fans it out to every updater",
        "why": "TWO ORIGINATORS, deliberately and safely: it carries a whole snapshot rather than a delta, so a duplicate is idempotent. currency, clearedCount, found and areasFinished only ever change inside the tick, so without clearing firing it the readouts sit frozen until the next purchase."
      },
      {
        "name": "BuyUpgrade",
        "class": "RemoteEvent",
        "direction": "client -> server",
        "payload": "one upgrade id string and nothing else",
        "firedBy": "input",
        "handledBy": "server-main, wiring.onPurchase",
        "why": "one of the two client-originated messages in the game, and the only one a player's input produces — input.clientRemotesFiredByPlayerInput is exactly [BuyUpgrade]. The server prices it."
      },
      {
        "name": "FindRevealed",
        "class": "RemoteEvent",
        "direction": "server -> client",
        "payload": "one Find name string, from Patch.find",
        "firedBy": "clearing",
        "handledBy": "beats, as response.beats[findReveal]: rank 1, 300 ms acknowledgment budget, channels atPatch and audio, notice FORBIDDEN, queued, 2.5 s dwell",
        "why": "up to collection.relicsPerArea (3) times per area, per player, and never for a post-terminal area"
      },
      {
        "name": "SetCompleted",
        "class": "RemoteEvent",
        "direction": "server -> client",
        "payload": "one collection.sets[].id string",
        "firedBy": "clearing",
        "handledBy": "beats, as response.beats[setComplete]: rank 2, 400 ms budget, channels notice and audio, queued",
        "why": "exactly once per player per set, on the sixth Find of that set — response.beats[setComplete].cause is sixthFindOfSetRevealed. A separate channel from FindRevealed because response.channelExclusivity puts them on two channels and gameplay/core-loop/03 rejects carrying one on the other behind a string prefix."
      },
      {
        "name": "AreaRestored",
        "class": "RemoteEvent",
        "direction": "server -> client",
        "payload": "the area label string from layout.areaSpec(ordinal).label",
        "firedBy": "clearing",
        "handledBy": "beats, as response.beats[areaComplete]: rank 3, 400 ms budget, channels notice and audio, atPatch FORBIDDEN, queued",
        "why": "exactly once per player per area, on the latch transition only — response.beats[areaComplete].cause is lastStandingPatchCleared. A post-terminal area fires it too: endgame.survivingPayoffKinds includes areaCompletion."
      },
      {
        "name": "UpgradeApplied",
        "class": "RemoteEvent",
        "direction": "server -> client",
        "payload": "one upgrade id string and the new held level",
        "firedBy": "server-main",
        "handledBy": "beats, as response.beats[upgradePurchased]: rank 4, 200 ms budget, channels readout and audio, queued, effectAppliedBeforeAcknowledgment true",
        "why": "fired ONLY on a successful purchase. input.verbs[buy].onPreconditionFail is silentNoOp, so a failed buy produces no packet at all — which is exactly why success needs one: recovering the event by diffing two snapshots makes a 200 ms budget unmeasurable."
      }
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
      {
        "name": "name",
        "type": "string",
        "note": "a key of REMOTES, taken from that table rather than hand-typed wherever the call site can reach it"
      }
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
    "module": "hud-binding",
    "fn": "bind(root, gui)",
    "params": [
      {
        "name": "root",
        "type": "GuiObject",
        "note": "what UIBuilder.build returned: the HUD's Root frame"
      },
      {
        "name": "gui",
        "type": "ScreenGui",
        "note": "the ScreenGui root sits in, for screen-level state such as Enabled"
      }
    ],
    "returns": "(snapshot) -> () — an updater the caller invokes with every snapshot",
    "note": "Resolves its node paths ONCE at bind time and closes over them, so an unresolved name warns once rather than on every snapshot. The node paths are fixed by the emitted screen: Cluster_topRight.Readout_SHARDS.ReadoutValue.Text takes the balance; Cluster_topLeft.Readout_RELICS.ReadoutValue.Text takes the collection count; Cluster_bottomRight.Readout_<n><LABEL UPPERCASED>.ReadoutValue.Text takes \"Lv <held level>  ·  <config.upgradeCost(def, held level)>\" for the nth entry of upgrades; Cluster_bottomLeft.ProgressGroup.BarLabel.Text takes \"<snapshot.areaLabel uppercased> — <percent>% CLEAR\"; and ProgressGroup.Bar.BarFill.Size takes UDim2.fromScale(clearedCount / snapshot.areaPatchCount, 1), tweened rather than set. WITHHOLDING, per firstSession.withheld, and every rule about HOW comes from firstSession.suppressionForbidden: the collection count is present at join reading \"0\" with NO DENOMINATOR, and the denominator appears at the first reveal, latched on 'the collection map is non-empty', with no lift animation, no lift sound, no new badge and NO REFLOW of anything around it; an upgrade row is absent until snapshot.rowsRevealed says otherwise, and is never re-suppressed; the currency readout and the area progress are present at join reading 0 and 0%. No padlock, no greyed row, no question mark, no unknown-denominator form, no explanatory tooltip and no percent form of the collection count. Affordability is signalled by text as well as colour — input.pressable.affordabilityByColourAlone is false. Authors no structure and creates no Instance except a Tween."
  },
  {
    "module": "pressables",
    "fn": "bind(gui, onActivate)",
    "params": [
      {
        "name": "gui",
        "type": "ScreenGui",
        "note": "the HUD ScreenGui client-main created. The four buttons are parented inside it."
      },
      {
        "name": "onActivate",
        "type": "(role: string, index: number) -> ()",
        "note": "called on an ACCEPTED press. role is \"purchase\" or \"index\", exactly the two entries of input.pressable.roles. For \"purchase\", index is the 1-based position in GameConfig.Upgrades — input.pressable.roles[purchase].boundTo is 'upgrades declaration order', so 1 is Value, 2 is Reach, 3 is Pace. For \"index\", it is always 1. THIS ARGUMENT IS THE SEAM THAT REPLACES Enum.KeyCode.One: the button decides that a press happened, input decides what it means."
      }
    ],
    "returns": "(snapshot) -> () — an updater the caller invokes with every snapshot",
    "note": "THE ONE FUNCTION IN THIS BUILD THAT AUTHORS UI STRUCTURE, and it authors exactly four TextButtons — input.gameDrawnPressables is 4 and input.pressable.roles is three purchase plus one index. It exists because ui-forge's hud-overlay pattern ships no pressable readout; that is a default rather than an incapability, and the day it grows one this function resolves four node names instead of creating four Instances, with no other change anywhere. Names, sizes and properties are fixed in representation under `pressable`. RULES, ALL FROM input.pressable: one activation per press (activationsPerPress 1) with a 0.35 s debounce; no hold and no chord (holdRequired false, chordRequired false); NO REJECTION CUE when the precondition fails (rejectionCueOnFailedPrecondition 'none', and input.verbs[buy].onPreconditionFail is silentNoOp) — an unaffordable press does nothing, shows nothing and plays nothing; not smaller than the platform jump button (minTouchTargetRule) and never overlapping a platform control region (mayOverlapPlatformControlRegions false); gamepad-selectable; a keyboard accelerator is ALLOWED and NOT REQUIRED, so 1/2/3 may exist beside the buttons and may never be the only path. The updater applies affordability — by text and not by colour alone — and row visibility from snapshot.rowsRevealed, appearing a button without moving the other three (firstSession.suppressionForbidden bans reflowOnLift). Both roles are persistent: the buttons are created once and survive a respawn."
  },
  {
    "module": "index-screen",
    "fn": "bind(gui)",
    "params": [
      {
        "name": "gui",
        "type": "ScreenGui",
        "note": "the HUD ScreenGui; the collection surface is a frame inside it, created hidden"
      }
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
      {
        "name": "gui",
        "type": "ScreenGui",
        "note": "the HUD ScreenGui, passed straight to pressables.bind"
      }
    ],
    "returns": "(snapshot) -> () — the updater pressables.bind returned, passed through so client-main holds no handle",
    "note": "Calls pressables.bind(gui, onActivate) once and installs the handler. On role \"purchase\" with index i: read the id of GameConfig.Upgrades[i] and fire protocol.channel(\"BuyUpgrade\"):FireServer(id) — ONE STRING AND NOTHING ELSE, no cost, no level, no target, because economy.authority is 'server only' and input.verbs[buy].adjudicatedBy is 'server'. On role \"index\": call index-screen.toggle(), locally, with no packet. THE SHIPPED FILE BINDS Enum.KeyCode.One, Two AND Three AND IS SUPERSEDED: input.gameBoundInputClasses is exactly ['pressable'], input.travelRequiredToPurchase is 'none' and input.worldObjectsTriggeringAVerb is 0, so the purchase surface is a button on screen, reachable by touch, and a keyboard accelerator may exist beside it but may never be the only path — input.pressable.keyboardAcceleratorRequired is false. Binds nothing for move, look or jump: all three have boundByGame false and are the platform's. Ignores input while UserInputService:GetFocusedTextBox() is non-nil. Resolves its own channel with protocol.channel and accepts no Instance from its caller."
  },
  {
    "module": "beats",
    "fn": "connect(gui)",
    "params": [
      {
        "name": "gui",
        "type": "ScreenGui",
        "note": "the HUD ScreenGui the cues are drawn into"
      }
    ],
    "returns": "(snapshot) -> () — an updater, so the one unsequenced beat can be driven from a snapshot",
    "note": "Connects the four payoff channels and schedules what arrives on them as beats. THE SCHEDULE, from response: the four in response.sequencedBeats — upgradePurchased, findReveal, setComplete, areaComplete — are QUEUED, ordered by response.beats[].rank lowest first, and no two of them BEGIN closer together than response.minOnsetGapSeconds (0.6); a beat with nothing queued ahead of it plays immediately, because response.loneSequencedBeatDelayed is false. Each must begin within its own acknowledgmentBudgetMs of the packet arriving: 200 for upgradePurchased, 300 for findReveal, 400 for setComplete and areaComplete. response.channelExclusivity keeps findReveal on atPatch and setComplete and areaComplete on notice; response.beats[findReveal].forbiddenChannels bans notice and [areaComplete].forbiddenChannels bans atPatch. patchClear is response.unsequencedBeats, queued false — it is driven off the UPDATER, from a rise in snapshot.clearedCount, and it plays on arrival or not at all; response.minSustainedOnsetsPerSecond is 8 and response.onOverload is 'overlap', so eight clears in a second produce eight onsets that overlap rather than a queue or a drop. NOTHING HERE TOUCHES CONTROL: response.controlEverAffected is false, every beat's controlAffected is false and response.lockoutsSeconds is 0 — no camera move, no input lockout, no WalkSpeed write. THE CUE BODIES ARE EMPTY. What a reveal looks like, sounds like and reads as belongs to Art — VFX, Audio — Stingers and UI/UX — Feedback, none of which owns a contract key; this module fixes WHEN each one starts and on which channel, so adding one is a change to one function body and to no scheduling. response.negativeBeats is 0, so there is no failure cue to write."
  }
]
```

### Done when

1. a returning player's HUD shows their saved currency and collection count before they clear anything
2. the HUD survives a character respawn without rebuilding
3. all five server-to-client channels have a connected handler after boot
4. one snapshot arriving twice is harmless: every updater is idempotent

---

## 18. `server-main` — server

**Write to:** `game/src/server/init.server.luau`

**Owns:** Wire lifecycle: configure the place, create the remotes, load and save around join and leave, start the tick, and apply the one Humanoid property this game writes.

**Depends on:** `protocol`, `modifiers`, `persistence`, `progression`, `entitlements`, `plots`, `tool`, `clearing`, `world`

**Fires:** `StateChanged`, `UpgradeApplied`. Resolve each one through the module that declares the channel list — never by searching the tree, and never by a name you typed yourself.

### Must expose

- nothing. This is an entry point: the engine runs it, and no module may require it.

### Must not

- being required by any other module. This is the server entry point and Roblox is its only caller
- containing game logic; anything with a rule in it belongs in one of the modules above
- writing any Humanoid property except WalkSpeed. response.humanoidWritesAllowed is exactly ['WalkSpeed']; traversal.jump.jumpHeight (7.2) and traversal.jump.useJumpPower (false) are the ENGINE DEFAULTS being recorded, not values to write, and traversal.death.healthWrittenByGameCode is false
- creating a remote itself, choosing where the remotes live, or naming one in a literal
- loading a character before persistence.load has returned and entitlements.refresh has resolved

### Values

#### `runtime` *(from 01-runtime.md)*

```json
{
  "clearTickRate": 0.12,
  "saveIntervalSeconds": 45,
  "respawnDelaySeconds": 3,
  "dataStoreName": "ArgaRuin_v2",
  "layoutSeed": 20260801,
  "maxPlayers": 16,
  "placeConfiguration": {
    "maxPlayers": {
      "value": 16,
      "band": "social.maxPlayers, 12 to 20",
      "setVia": "place configuration — Players.MaxPlayers is read-only from a script and no module may write it",
      "ownedBy": "whoever publishes the place",
      "assertedBy": "world.configure(), which READS Players.MaxPlayers at boot and warns naming this key when it is outside the band"
    },
    "nothingElseIsPlaceConfiguration": "every other decision in social — collision groups, chat, plot access, the forbidden APIs — is executed by world.configure() at runtime. maxPlayers is the only one that is not, and it is the only entry in this block."
  },
  "storeVersionHistory": {
    "ArgaRuin_v1": "wave-1 shape: areaComplete boolean, single-area cleared set, no rowsRevealed. No reader is written; nothing shipped to players.",
    "ArgaRuin_v2": "current. areasFinished integer, live-area cleared set, rowsRevealed."
  }
}
```

#### `traversal` *(from gameplay/mechanics/06-traversal-affordances.md)*

```json
{
  "jump": {
    "exists": true,
    "jumpHeight": 7.2,
    "useJumpPower": false,
    "changesGameState": false,
    "upgradable": false,
    "gatedContent": 0
  },
  "fall": {
    "damage": false,
    "voidBelowPlayArea": false,
    "maxSurvivableFallStuds": null
  },
  "death": {
    "possibleByDesign": false,
    "damageSources": 0,
    "healthWrittenByGameCode": false,
    "respawnAt": "areaSpawn",
    "lossOnRespawn": "none",
    "authoredCue": "none",
    "respawnDelayOwner": "architect/01-runtime"
  },
  "boundary": {
    "kind": "collisionBarrier",
    "walkableMarginStuds": 12,
    "heightStuds": 20,
    "passable": false,
    "climbable": false,
    "jumpable": false,
    "opaque": false,
    "sightlineObstruction": "none",
    "cue": "none",
    "teleportBack": false
  },
  "surface": {
    "maxStepStuds": 2,
    "maxSlopeDegreesWherePatchesStand": 30,
    "climbSurfaces": 0,
    "ladders": 0,
    "seats": 0,
    "vehicles": 0,
    "water": 0,
    "speedModifyingSurfaces": 0,
    "teleportsWithinArea": 0
  },
  "collision": {
    "playerVsWorld": true,
    "playerVsPlayerOwner": "social.characterCollision"
  },
  "hazards": 0,
  "fallPenalties": 0,
  "lockouts": 0
}
```

#### `response` *(from gameplay/mechanics/05-response-contract.md)*

```json
{
  "controlEverAffected": false,
  "sequencedBeats": [
    "upgradePurchased",
    "findReveal",
    "setComplete",
    "areaComplete"
  ],
  "sequenceOrderOwner": "gameplay/core-loop/02-payoff-weights",
  "minOnsetGapSeconds": 0.6,
  "minOnsetGapTestRangeSeconds": [
    0.35,
    0.9
  ],
  "minOnsetGapOwner": "gameplay/core-loop/02-payoff-weights, figure set by Balance & Tuning",
  "loneSequencedBeatDelayed": false,
  "unsequencedBeats": [
    "patchClear"
  ],
  "minSustainedOnsetsPerSecond": 8,
  "onOverload": "overlap",
  "channelExclusivity": {
    "atPatch": "findReveal",
    "notice": [
      "setComplete",
      "areaComplete"
    ]
  },
  "humanoidWritesAllowed": [
    "WalkSpeed"
  ],
  "beats": [
    {
      "id": "patchClear",
      "rank": 5,
      "cause": "clearRadiusContainsStandingPatch",
      "decidedBy": "clientPredictedServerAuthoritative",
      "acknowledgmentBudgetMs": 80,
      "budgetTestRangeMs": [
        40,
        120
      ],
      "payoutBudgetMs": 250,
      "payoutTestRangeMs": [
        150,
        400
      ],
      "channels": [
        "atPatch",
        "readout"
      ],
      "controlAffected": false,
      "queued": false,
      "residueLifetimeSeconds": 0.4
    },
    {
      "id": "findReveal",
      "rank": 1,
      "cause": "patchHidingItCleared",
      "decidedBy": "server",
      "acknowledgmentBudgetMs": 300,
      "budgetTestRangeMs": [
        200,
        500
      ],
      "channels": [
        "atPatch",
        "audio"
      ],
      "forbiddenChannels": [
        "notice"
      ],
      "controlAffected": false,
      "queued": true,
      "dwellSeconds": 2.5,
      "dwellTestRangeSeconds": [
        1.5,
        4
      ],
      "grantedAt": "reveal"
    },
    {
      "id": "setComplete",
      "rank": 2,
      "cause": "sixthFindOfSetRevealed",
      "decidedBy": "server",
      "acknowledgmentBudgetMs": 400,
      "budgetTestRangeMs": [
        250,
        700
      ],
      "channels": [
        "notice",
        "audio"
      ],
      "controlAffected": false,
      "queued": true
    },
    {
      "id": "areaComplete",
      "rank": 3,
      "cause": "lastStandingPatchCleared",
      "decidedBy": "server",
      "acknowledgmentBudgetMs": 400,
      "budgetTestRangeMs": [
        250,
        700
      ],
      "channels": [
        "notice",
        "audio"
      ],
      "forbiddenChannels": [
        "atPatch"
      ],
      "controlAffected": false,
      "queued": true
    },
    {
      "id": "upgradePurchased",
      "rank": 4,
      "cause": "buyPreconditionSatisfiedAtPressable",
      "decidedBy": "server",
      "acknowledgmentBudgetMs": 200,
      "budgetTestRangeMs": [
        120,
        350
      ],
      "channels": [
        "readout",
        "audio"
      ],
      "controlAffected": false,
      "queued": true,
      "effectAppliedBeforeAcknowledgment": true
    }
  ],
  "negativeBeats": 0,
  "lockoutsSeconds": 0
}
```

#### `interfaces (yours and your dependencies')`

```json
[
  {
    "module": "protocol",
    "fn": "REMOTES",
    "params": [],
    "returns": "table — the seven channels below, keyed by name, each with its class, direction, payload and the one module that originates it. NAMES AND CLASSES, NOT INSTANCES: protocol.channel(name) returns the Instance.",
    "note": "A TABLE, NOT A CALLABLE. Exactly seven, and no more. THE TWO CLIENT-TO-SERVER NAMES ARE input.clientOriginatedRemotes VERBATIM — RequestState and BuyUpgrade — and this module's first criterion checks the two lists against each other in both directions, which is what makes 'the client surface is closed' a merge property rather than a promise. There is deliberately no clearing channel and no currency channel: the server observes clearing on a tick, so there is nothing for a client to claim, and economy.authority says no client message carries a cost, an amount or a balance. Two channels are new since wave 1 and both come from response: setComplete and areaComplete are distinct beats on the notice channel with their own budgets, and response.channelExclusivity forbids either sharing atPatch with a reveal; upgradePurchased has a 200 ms acknowledgment budget and input.verbs[buy].onPreconditionFail is silentNoOp, so a client cannot tell an accepted purchase from a dropped one by diffing snapshots. NO PAYLOAD CARRIES A PLAYER IDENTIFIER OTHER THAN THE RECIPIENT'S — social.forbidden X7 — and none carries a player-authored string, which is X9.",
    "channels": [
      {
        "name": "RequestState",
        "class": "RemoteFunction",
        "direction": "client -> server",
        "payload": "no arguments; returns one snapshot",
        "firedBy": "client-main",
        "handledBy": "server-main, which sets OnServerInvoke at boot",
        "why": "client-main may not assume the join-time push arrived, so it pulls once after its updaters are live"
      },
      {
        "name": "StateChanged",
        "class": "RemoteEvent",
        "direction": "server -> client",
        "payload": "one snapshot, exactly the fields snapshotShape() names",
        "firedBy": "server-main on join, on spawn and after a successful purchase; clearing once per tick in which anything changed",
        "handledBy": "client-main, which fans it out to every updater",
        "why": "TWO ORIGINATORS, deliberately and safely: it carries a whole snapshot rather than a delta, so a duplicate is idempotent. currency, clearedCount, found and areasFinished only ever change inside the tick, so without clearing firing it the readouts sit frozen until the next purchase."
      },
      {
        "name": "BuyUpgrade",
        "class": "RemoteEvent",
        "direction": "client -> server",
        "payload": "one upgrade id string and nothing else",
        "firedBy": "input",
        "handledBy": "server-main, wiring.onPurchase",
        "why": "one of the two client-originated messages in the game, and the only one a player's input produces — input.clientRemotesFiredByPlayerInput is exactly [BuyUpgrade]. The server prices it."
      },
      {
        "name": "FindRevealed",
        "class": "RemoteEvent",
        "direction": "server -> client",
        "payload": "one Find name string, from Patch.find",
        "firedBy": "clearing",
        "handledBy": "beats, as response.beats[findReveal]: rank 1, 300 ms acknowledgment budget, channels atPatch and audio, notice FORBIDDEN, queued, 2.5 s dwell",
        "why": "up to collection.relicsPerArea (3) times per area, per player, and never for a post-terminal area"
      },
      {
        "name": "SetCompleted",
        "class": "RemoteEvent",
        "direction": "server -> client",
        "payload": "one collection.sets[].id string",
        "firedBy": "clearing",
        "handledBy": "beats, as response.beats[setComplete]: rank 2, 400 ms budget, channels notice and audio, queued",
        "why": "exactly once per player per set, on the sixth Find of that set — response.beats[setComplete].cause is sixthFindOfSetRevealed. A separate channel from FindRevealed because response.channelExclusivity puts them on two channels and gameplay/core-loop/03 rejects carrying one on the other behind a string prefix."
      },
      {
        "name": "AreaRestored",
        "class": "RemoteEvent",
        "direction": "server -> client",
        "payload": "the area label string from layout.areaSpec(ordinal).label",
        "firedBy": "clearing",
        "handledBy": "beats, as response.beats[areaComplete]: rank 3, 400 ms budget, channels notice and audio, atPatch FORBIDDEN, queued",
        "why": "exactly once per player per area, on the latch transition only — response.beats[areaComplete].cause is lastStandingPatchCleared. A post-terminal area fires it too: endgame.survivingPayoffKinds includes areaCompletion."
      },
      {
        "name": "UpgradeApplied",
        "class": "RemoteEvent",
        "direction": "server -> client",
        "payload": "one upgrade id string and the new held level",
        "firedBy": "server-main",
        "handledBy": "beats, as response.beats[upgradePurchased]: rank 4, 200 ms budget, channels readout and audio, queued, effectAppliedBeforeAcknowledgment true",
        "why": "fired ONLY on a successful purchase. input.verbs[buy].onPreconditionFail is silentNoOp, so a failed buy produces no packet at all — which is exactly why success needs one: recovering the event by diffing two snapshots makes a 200 ms budget unmeasurable."
      }
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
      {
        "name": "name",
        "type": "string",
        "note": "a key of REMOTES, taken from that table rather than hand-typed wherever the call site can reach it"
      }
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
      {
        "name": "state",
        "type": "PlayerState",
        "note": "read for upgrades, found and owned, and written never. This function is pure."
      },
      {
        "name": "axis",
        "type": "string",
        "note": "exactly one of \"value\", \"radius\", \"speed\". modifiers.axisIdsJoinUpgrades: axes[].id is upgrades[].id verbatim, and 'Pace is a label and never an id'. Any other string is an error, not a fallback."
      }
    ],
    "returns": "number — the axis's effective value: a multiplier for value, studs for radius, studs per second for speed",
    "note": "THE ONE IMPLEMENTATION — modifiers.singleDefinition. modifiers.composition writes it out: clamp(upgradeEffect(axis, heldLevel) * PROD(setFactors(axis)) * PROD(purchaseFactors(axis)), ceilingRule). FOUR STEPS, IN modifiers.resolutionOrder AND IN NO OTHER ORDER: (1) config.upgradeEffect(def, state.upgrades[axis] or 0) — this ALREADY CONTAINS upgrades[axis].base and modifiers.baseIsNotAppliedTwice forbids multiplying it in again; (2) multiply by every set factor on this axis, for every set in collection.sets whose six names are all true in state.found, in collection declaration order — setBonus.rows says WHICH axis each set targets and setBonus.invariants forbids a row carrying a magnitude, so an absent factor is 1.0 and modifiers warns once at boot naming the four sets, WHICH MEANS A COMPLETED SET CURRENTLY CHANGES NOTHING; (3) multiply by products.items[].factor for every item whose axis matches and whose id is true in state.owned, in offer-ladder order — every gamePassId is null today so this step is currently empty too; (4) clamp ONCE against ceiling(axis, state.areasFinished + 1), never between two sources — modifiers.clampApplication. Derives set completion from state.found on EVERY CALL and caches nothing: modifiers.sources[set-completion].storage is 'derived from discovery.record at every read; never latched, never persisted', which is why there is no setsComplete field to go stale. Never yields. Never writes. Called by clearing (radius and value, every tick), by server-main (speed, on spawn and after a purchase) and by tool (radius, on spawn and after a purchase), and by no client module."
  },
  {
    "module": "modifiers",
    "fn": "ceiling(axis, areaOrdinal)",
    "params": [
      {
        "name": "axis",
        "type": "string",
        "note": "\"value\", \"radius\" or \"speed\""
      },
      {
        "name": "areaOrdinal",
        "type": "integer",
        "meaning": "the 1-based area ordinal the ceiling is being evaluated for — state.areasFinished + 1 at every live call site. It is a parameter because modifiers.axes[radius].ceilingRule is 'effective < area.size / 2' and products.headroom.ceilings.radius is 'min over depths of (area.size(N) / 2)', so the rule is per area even though every area is the same lane width today."
      }
    ],
    "returns": "number? — the ceiling for that axis, or nil when the axis has none",
    "note": "modifiers.axes[value].ceilingRule is null with the reason 'a currency multiplier breaks no invariant', so this returns nil for value and the clamp is skipped. radius: area.size / 2 = 60, which is plots.laneWidthStuds / 2 and the same number by both routes — beyond it 'one position clears the whole area and a lap stops existing'. speed: movement.baseClearRadius / runtime.clearTickRate = 5.5 / 0.12 = 45.83 — beyond it 'the player outruns the tool between ticks and patches are never cleared'. Also the input to the boot-time headroom assertion: products.headroom.rule requires ladderMax(A) * every set factor * every product factor to stay at or below products.headroom.marginFraction (0.9) times this, for every axis and every depth, and products.headroom.clampMayAbsorbAPurchase is false — so a configuration where the clamp would eat a purchased factor is a boot-time warning, not a silent flatline."
  },
  {
    "module": "persistence",
    "fn": "load(player)",
    "params": [
      {
        "name": "player",
        "type": "Player"
      }
    ],
    "returns": "PlayerState — every persisted field populated AND RECONCILED; patches empty, owned empty, armState blank and player unset",
    "note": "Never throws and never returns nil. On a DataStore failure it warns and returns defaultState(), so the player is playable on a fresh session rather than stuck. It yields; server-main must not insert the state into the live collection until it has returned. Reads under runtime.dataStoreName, keyed by the player's UserId. RECONCILES BEFORE RETURNING, in this order: clamp areasFinished at 0 and below; drop any key of cleared at or above layout.areaSpec(areasFinished + 1).patchCount, with one warning, because the live area may have changed size between versions and a stale index would mark a patch that is not there; then set clearedCount from the number of keys in cleared, comparing the stored value and warning on a mismatch rather than trusting it; then fill any missing rowsRevealed key with false and any missing found key with false. Every caller may therefore assume, for any state this function returns: #cleared == clearedCount, clearedCount < the live area's patchCount, and every key of upgrades, rowsRevealed and found exists. THERE IS NO v1 READER — runtime.storeVersionHistory says why, and the store name is different so no v1 payload is reachable."
  },
  {
    "module": "persistence",
    "fn": "save(player, state)",
    "params": [
      {
        "name": "player",
        "type": "Player"
      },
      {
        "name": "state",
        "type": "PlayerState"
      }
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
      {
        "name": "state",
        "type": "PlayerState"
      },
      {
        "name": "amount",
        "type": "integer",
        "meaning": "a positive whole number of currency to ADD to the balance. Not a new total, and ALREADY MULTIPLIED by modifiers.effective(state, 'value') by the caller — award applies no multiplier of its own. economy.faucets[patch-clear].multiplierAppliedOnce is 'at this site only; never again inside the award function', and modifiers.forbidden bans applying it in both places."
      }
    ],
    "returns": "number — the new balance",
    "note": "The only function that increases currency, and clearing is its only caller — economy.faucetCount is 1. Rejects a non-positive amount rather than clamping, because clearing's minimum payout is economy.payoutFloor (1). Calls revealRows(state) after crediting, so a row lifts on the tick the balance crosses its threshold rather than on the next purchase attempt. Does not cap: economy.balanceCap is null."
  },
  {
    "module": "progression",
    "fn": "tryBuy(state, upgradeId)",
    "params": [
      {
        "name": "state",
        "type": "PlayerState"
      },
      {
        "name": "upgradeId",
        "type": "string",
        "note": "one of the ids in upgrades: value, radius, speed. Sent by the client as a bare string and validated here; never a cost, never a level, never a target."
      }
    ],
    "returns": "boolean — true only if currency was deducted and the level incremented",
    "note": "Reads the held level from state.upgrades[upgradeId], treating nil as 0; prices it with config.upgradeCost(def, heldLevel); on success deducts exactly that and increments the level by exactly 1. Returns false and changes NOTHING if the id is unknown, if the held level already equals def.maxLevel, or if state.currency is below the cost — economy.sinks[0].onInsufficientFunds is 'nothing changes, nothing is deducted, no partial purchase exists' and refundable is false. THE FAILURE IS SILENT: input.verbs[buy].onPreconditionFail is silentNoOp and input.pressable.rejectionCueOnFailedPrecondition is 'none', so server-main sends nothing at all on a false return. economy.sinkCount is 1 and this is it."
  },
  {
    "module": "progression",
    "fn": "revealRows(state)",
    "params": [
      {
        "name": "state",
        "type": "PlayerState"
      }
    ],
    "returns": "boolean — true if any row lifted on this call",
    "note": "For each upgrades[] entry i, sets state.rowsRevealed[id] = true when state.currency is at or above config.upgradeCost(def_i, 0) — firstSession.withheld.upgradeRow.liftedBy is 'balance has reached upgrades[i] level-1 cost'. NEVER SETS ONE FALSE: firstSession.suppressionForbidden lists reSuppression, so a row that has appeared stays. Called by award after every credit, and once by server-main in onJoin so a returning player's rows are consistent with a balance that may have moved in a previous version. Writes nothing else."
  },
  {
    "module": "entitlements",
    "fn": "refresh(player, state)",
    "params": [
      {
        "name": "player",
        "type": "Player"
      },
      {
        "name": "state",
        "type": "PlayerState",
        "note": "written for owned, and for nothing else"
      }
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
      {
        "name": "n",
        "type": "integer",
        "meaning": "a slot index previously returned by claimSlot, being returned to the free pool. Not a player count and not a plot Instance. Releasing an index that is not currently taken is a no-op, not an error."
      }
    ],
    "returns": "nil",
    "note": "Called by plots.despawn. The free pool hands back the lowest free index first."
  },
  {
    "module": "plots",
    "fn": "spawn(player, state)",
    "params": [
      {
        "name": "player",
        "type": "Player"
      },
      {
        "name": "state",
        "type": "PlayerState",
        "note": "read for areasFinished and cleared, written for patches and spawnPivot"
      }
    ],
    "returns": "CFrame — the live bay's spawn point, the WorldCFrame of the lane's spawn Attachment",
    "note": "Claims a slot, then builds the lane for a player whose live area is state.areasFinished + 1: the slab spanning plots.pitchStuds across and from 12 studs outward of bay 1 to 12 studs inward of the live bay's end (traversal.boundary.walkableMarginStuds), the four boundary parts, the spawn Attachment, and ONE INSTANCE PER PATCH THAT state.cleared DOES NOT MARK, IN THE LIVE BAY ONLY. plots.liveGeometry: patchInstancesExistIn 'the live bay only', groundExistsIn 'every bay from 1 up to and including the live bay', builtWhole true. Every bay below the live one is bare walkable floor with no patch Instance and no patch record — which is what makes 'cleared is permanent' structural rather than latched, and is why no rejoin can pay for a finished area a second time. Writes state.patches (records for the LIVE bay only, cleared ones kept with instance nil so indices stay aligned with layout's order) and state.spawnPivot. Converts layout's plot-local positions to WORLD by adding the slot origin, and it is the ONLY place that conversion happens. Sizes and properties are fixed in representation. Calling it twice for one player without a despawn between is a bug, not a second lane."
  },
  {
    "module": "plots",
    "fn": "advance(state)",
    "params": [
      {
        "name": "state",
        "type": "PlayerState",
        "note": "read for the NEW areasFinished, which clearing has already incremented; written for patches and spawnPivot"
      }
    ],
    "returns": "CFrame — the new live bay's spawn point",
    "note": "CALLED BY clearing, FROM INSIDE THE TICK, ON THE PASS THAT FINISHES AN AREA, AND FROM NOWHERE ELSE. plots.liveGeometry.bayBuiltAt is 'the instant the previous bay's last patch clears', so this is not a deferred job. In order: destroy every patch Instance of the bay just finished (there are none left standing, but the records go); extend the slab inward to cover the new live bay plus traversal.boundary.walkableMarginStuds; move the inward boundary part to the new end; build layout.build(state.areasFinished + 1)'s patch Instances, all of them, since state.cleared was emptied with the increment; rewrite state.patches and state.spawnPivot; move the spawn Attachment to the new bay's spawn point, (0, 0, plots.bays[k].zStart + 8) in plot-local — the same +8 plots.spawn.plotLocal gives bay 1. DESTROYS NOTHING A PLAYER IS STANDING ON: the floor is only ever extended, never shortened. plots.liveGeometry.torndownBeyond talks about tearing bays down beyond the live one minus two and rebuilding them BARE on re-entry; a finished bay in this build IS bare — it holds ground and nothing else — so there is nothing to tear down and the ground invariant wins. That changes the day Art dresses a bay, and the rule acquires a subject then."
  },
  {
    "module": "plots",
    "fn": "despawn(state)",
    "params": [
      {
        "name": "state",
        "type": "PlayerState"
      }
    ],
    "returns": "nil",
    "note": "Destroys the lane for state.player, clears state.patches and state.spawnPivot, and releases the slot internally via releaseSlot. Recovers the slot from its own registry keyed by UserId — PlayerState carries no slot field and must not gain one. Does not save: server-main calls persistence.save before this. social.plotTenure.onLeaveMidArea: 'the plot instance tree is destroyed and the slot freed; the partial cleared set survives only in the leaving player's own save; nothing about the departure is perceptible to any remaining player' — so no notice, no sound and no string, which is social.forbidden X11."
  },
  {
    "module": "tool",
    "fn": "equip(player, state)",
    "params": [
      {
        "name": "player",
        "type": "Player"
      },
      {
        "name": "state",
        "type": "PlayerState",
        "note": "read for upgrades and owned, through modifiers.effective; written never"
      }
    ],
    "returns": "nil",
    "note": "Builds ONE Model — tool.count is 1, tool.instanceClass is Model, tool.isRobloxToolInstance is false and tool.entersBackpack is false — and welds it to the character's RightHand attachment (tool.attachment). tool.grantedAt is 'spawn', so this is called from wiring.onSpawn on every character including the one that follows a death, and the previous character's tool goes with the previous character. Every part is massless, CanCollide false, CanTouch false and CanQuery false (tool.canCollide, canTouch, canQuery, massless). It writes no Humanoid property (tool.writesHumanoidProperties false), carries no ParticleEmitter (tool.particleEmitters 0), plays no animation (tool.animates false) and clears nothing (tool.clearsOnContact false). Then calls refresh."
  },
  {
    "module": "tool",
    "fn": "refresh(player, state)",
    "params": [
      {
        "name": "player",
        "type": "Player"
      },
      {
        "name": "state",
        "type": "PlayerState"
      }
    ],
    "returns": "nil",
    "note": "Sets the head's width, which is the ONE appearance channel — tool.appearanceChannel is headWidth and tool.changesWithAxes is exactly ['radius'], tool.unaffectedByAxes exactly ['value', 'speed']. THE WIDTH RESOLVES FROM EFFECTIVE RADIUS, NOT FROM THE REACH LEVEL: products.items[span].deliverable says so in as many words — 'requires tool head width to resolve from effective radius, not Reach level' — because Span is a multiplicative factor and a level-only reading would make a 499-Robux product invisible. The formula is tool.headWidthBaseStuds + tool.headWidthPerLevelStuds * equivalentLevels, where equivalentLevels = (modifiers.effective(state, 'radius') - upgrades[radius].base) / upgrades[radius].perLevel — that is, the number of Reach levels the effective radius is worth, which is the held level exactly when no factor applies and more when one does. 1.2 studs at base, 0.35 wider per equivalent level. Called by tool.equip and by server-main after a successful purchase, and by nothing on a tick: the width changes only when a level or an entitlement changes."
  },
  {
    "module": "clearing",
    "fn": "tick(states)",
    "params": [
      {
        "name": "states",
        "type": "map<UserId, PlayerState>",
        "meaning": "the WHOLE live collection, one entry per connected player, keyed by UserId as an integer. Not an array, not keyed by Player, and not one player's state. See stateShape.collection."
      }
    ],
    "returns": "nil",
    "note": "One pass, in this order, per state. (1) THE ARMING GATE, FIRST: if state.armState.character is not state.player.Character, rewrite armState as { character = the current character, armed = false } — that is how firstSession.armScope 'perCharacterSpawn' resets without a second module writing the field. Skip the state if the character or its HumanoidRootPart is absent. If not armed, test the horizontal XZ distance from state.spawnPivot; if it exceeds firstSession.armDistanceStuds (2.0), set armed true; if it does not, RETURN FOR THIS STATE — no distance work, no clear, no award, no packet. firstSession.armMeasuredOn is 'server, horizontal XZ displacement of the character root from the plot spawn pivot' and this is that sentence. (2) Read radius once with modifiers.effective(state, 'radius'). (3) For every record in state.patches with cleared false whose XZ distance to the root part is within radius — XZ only, so height never affects reach: set patch.cleared, destroy patch.instance and nil the field, set state.cleared[index], increment state.clearedCount, and call progression.award with max(economy.payoutFloor, floor(tiers[patch.tierIndex].value * modifiers.effective(state, 'value'))), which is economy.faucets[patch-clear].formula verbatim and is the ONLY site the value multiplier is applied — economy.faucets[patch-clear].rounding is 'floor, never round-half-up'. If patch.find is set and state.found[patch.find] is not, set it and fire FindRevealed; then, if every name in that Find's set is now true, fire SetCompleted once with the set id. (4) After the loop, if clearedCount >= layout.areaSpec(state.areasFinished + 1).patchCount: increment state.areasFinished by exactly 1, EMPTY state.cleared, set clearedCount to 0, call plots.advance(state) and fire AreaRestored once with the finished area's label. (5) Finally, if the pass changed anything, fire StateChanged once with a fresh snapshot — at most one per player per tick, none on a pass that cleared nothing. Every channel through protocol.channel(name). Never reads a client message; never uses Touched. THERE IS NO AREA-COMPLETE LATCH TO CHECK: a finished bay has no record in state.patches, so step 3 has nothing to iterate over it, which is why the wave-1 rejoin farm cannot recur."
  },
  {
    "module": "clearing",
    "fn": "start(states)",
    "params": [
      {
        "name": "states",
        "type": "map<UserId, PlayerState>",
        "meaning": "the same live collection tick receives, captured once. Held by reference: server-main mutates the same table as players join and leave, and clearing never copies it."
      }
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
      {
        "name": "character",
        "type": "Model",
        "note": "the character Model from CharacterAdded"
      }
    ],
    "returns": "nil",
    "note": "Sets every BasePart of the character into the collision group, and connects DescendantAdded so a part added later gets it too — social.characterCollision.appliedTo is 'every BasePart of every character, on CharacterAdded and on every BasePart added to it thereafter', and the second clause is why this is a connection rather than a loop. Called by server-main in wiring.onSpawn, before the pivot. Sets no Humanoid property and no Health: traversal.death.healthWrittenByGameCode is false, traversal.death.damageSources is 0, and response.humanoidWritesAllowed is exactly ['WalkSpeed'], which belongs to server-main."
  }
]
```

### Done when

1. a player's Humanoid.WalkSpeed equals modifiers.effective(state, 'speed') after spawning and after any successful purchase
2. `grep -rn 'Humanoid\.' game/src` finds no property write other than WalkSpeed, and no write to JumpHeight, JumpPower, UseJumpPower, Health, MaxHealth or WalkSpeed outside this file
3. world.configure() runs before the remotes exist and the remotes exist before any player can join
4. a player who leaves has their state saved before their lane is destroyed
5. the clear tick survives an error in one iteration without stopping
6. server shutdown saves every connected player outside Studio
7. a player who dies gets a new character runtime.respawnDelaySeconds later, on their own lane's CURRENT bay spawn, with currency, levels, cleared patches and areasFinished unchanged, and the arming gate re-armed
8. a player who leaves during the death delay produces no error and no loaded character
9. a successful purchase fires exactly one UpgradeApplied and one StateChanged; a failed one fires neither

---

## Coverage

Every contract key below is read by at least one module, or it is listed as unread. An
unread key is either a decision nothing needs — worth questioning — or a module that has
not been declared yet.

- **vocabulary** is supplied but no module reads it
