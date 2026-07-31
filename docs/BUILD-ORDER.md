# Build order

**Generated — do not edit.** Emitted by `npm run bridge -- --emit` from CID spec sheets.
Edit the Architecture sheet that owns the module list and re-emit.

**11 modules, in dependency order.** Build them in this order and each one's
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
    "clientModuleFromAnotherClientModule": "local Input = require(script.Parent.Input)"
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
      "note": "Never decremented except by tryBuy, never increased except by award."
    },
    {
      "name": "upgrades",
      "type": "map<upgradeId,integer>",
      "writtenBy": "progression",
      "persisted": true,
      "note": "Keyed by upgrades[].id. A missing key reads as level 0."
    },
    {
      "name": "patches",
      "type": "Patch[]",
      "writtenBy": "plots",
      "persisted": false,
      "note": "Live world state, world-space positions, one record per layout index whether cleared or not. Rebuilt on join from cleared."
    },
    {
      "name": "cleared",
      "type": "map<patchIndex,boolean>",
      "writtenBy": "clearing",
      "persisted": true,
      "note": "Which patches are gone, keyed by the 1-based index into layout.build()'s canonical order. Bounded by area.patchCount, and written as empty once areaComplete latches. This is what makes 'cleared is permanent' survive a rejoin."
    },
    {
      "name": "clearedCount",
      "type": "integer",
      "writtenBy": "clearing",
      "persisted": true,
      "note": "Against area.patchCount. Equals the size of cleared while an area is in progress, and survives the collapse that empties it."
    },
    {
      "name": "found",
      "type": "map<relicName,boolean>",
      "writtenBy": "clearing",
      "persisted": true,
      "note": "Keyed by the strings in collection.sets[].relics."
    },
    {
      "name": "areaComplete",
      "type": "boolean",
      "writtenBy": "clearing",
      "persisted": true,
      "note": "Latch. Set once, never cleared. Collapses cleared to empty."
    },
    {
      "name": "player",
      "type": "Player",
      "writtenBy": "server-main",
      "persisted": false,
      "note": "The Roblox Player. Set at join, never reassigned. Exists because the collection is keyed by UserId, not by Player."
    }
  ],
  "types": {
    "Patch": {
      "position": "Vector3",
      "tierIndex": "integer",
      "relic": "string?",
      "cleared": "boolean",
      "instance": "BasePart?"
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
    "entryAppears": "in wiring.onJoin, immediately after persistence.load returns and state.player is set — never before, or clearing.tick can see a half-loaded state",
    "entryDisappears": "in wiring.onLeave, before the save and before the plot teardown, so no tick can touch a state that is being torn down",
    "absentMeans": "that player is not in this server, or has not finished joining. A lookup miss is a return, not an error",
    "passedTo": "clearing.start(states) once at boot and clearing.tick(states) every 0.12s, by reference — the table is mutated in place and never replaced",
    "iterationOrder": "undefined. Nothing may depend on it: payouts and reveals are per-player and order-free"
  }
}
```

#### `wiring` *(from 07-wiring.md)*

```json
{
  "boot": [
    {
      "order": 1,
      "module": "server-main",
      "does": "Set Players.CharacterAutoLoads = false. Removes the race between a character spawning and persistence.load returning."
    },
    {
      "order": 2,
      "module": "protocol",
      "fn": "REMOTES",
      "calledBy": "server-main",
      "does": "Create one Instance per name in protocol.REMOTES under a single Folder in ReplicatedStorage: four RemoteEvents and one RemoteFunction. Done before any player can join, so a client that boots instantly finds them."
    },
    {
      "order": 3,
      "module": "server-main",
      "does": "Create the live collection: one empty table, keyed by UserId. This table is never replaced, only mutated, because clearing holds it by reference."
    },
    {
      "order": 4,
      "module": "clearing",
      "fn": "start(states)",
      "calledBy": "server-main",
      "does": "Hand clearing the collection and let it install its own 0.12s loop. Ticking an empty collection before the first join is normal."
    },
    {
      "order": 5,
      "module": "server-main",
      "does": "Start the periodic save loop: every runtime.saveIntervalSeconds (45s), call persistence.save for every state in the collection."
    },
    {
      "order": 6,
      "module": "server-main",
      "does": "Bind game:BindToClose to the onShutdown phase, and connect the BuyUpgrade remote to the onPurchase phase."
    }
  ],
  "onJoin": [
    {
      "order": 1,
      "module": "persistence",
      "fn": "load(player)",
      "calledBy": "server-main",
      "does": "Load the player's saved state, or defaultState() on a DataStore failure. Yields. Nothing else may run for this player until it returns."
    },
    {
      "order": 2,
      "module": "server-main",
      "does": "Set state.player = player. The only write to that field, ever."
    },
    {
      "order": 3,
      "module": "server-main",
      "does": "THE BARRIER: states[player.UserId] = state. The player becomes visible to clearing.tick at this instant and not before, which is why it is after step 1."
    },
    {
      "order": 4,
      "module": "plots",
      "fn": "spawn(player, state)",
      "calledBy": "server-main",
      "does": "Claim a slot, build the plot slab, its spawn Attachment and one Instance per uncleared patch, and write state.patches. Returns the spawn CFrame, which server-main keeps for this player until they leave."
    },
    {
      "order": 5,
      "module": "server-main",
      "does": "Push a snapshot on REMOTES.StateChanged. May arrive before the client's HUD exists, which is why client-main also pulls one."
    },
    {
      "order": 6,
      "module": "server-main",
      "does": "Connect player.CharacterAdded to the onSpawn phase. Safe to connect now: the state exists and the plot exists."
    },
    {
      "order": 7,
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
      "module": "server-main",
      "does": "PivotTo the spawn CFrame that plots.spawn returned for this player, raised 3 studs on Y. This is where onboarding.guaranteedFirstRelic is kept: the player arrives at the plot origin, standing in the patch that hides the first Find of set one."
    },
    {
      "order": 4,
      "module": "progression",
      "fn": "walkSpeed(state)",
      "calledBy": "server-main",
      "applies": "speed",
      "does": "THE DEFECT TRIAL 1 FOUND: server-main writes humanoid.WalkSpeed = progression.walkSpeed(state). progression computes and never writes; this line is the only place the Pace upgrade reaches the engine. Without it the upgrade is purchasable and does nothing."
    },
    {
      "order": 5,
      "module": "server-main",
      "does": "Push a snapshot on REMOTES.StateChanged. The HUD is not rebuilt on a respawn, so this is a refresh, not a boot."
    }
  ],
  "onPurchase": [
    {
      "order": 1,
      "module": "server-main",
      "does": "REMOTES.BuyUpgrade received with one string. Look up states[player.UserId]; if absent, drop the message. Reject any payload that is not a string."
    },
    {
      "order": 2,
      "module": "progression",
      "fn": "tryBuy(state, upgradeId)",
      "calledBy": "server-main",
      "does": "Validate and apply, or change nothing and return false. The server prices it; the client sent only an id."
    },
    {
      "order": 3,
      "module": "progression",
      "fn": "walkSpeed(state)",
      "calledBy": "server-main",
      "applies": "speed",
      "does": "On success only: re-write humanoid.WalkSpeed unconditionally, whichever upgrade was bought. Gating this on upgradeId == \"speed\" is one line shorter and one refactor away from re-opening the trial-1 defect."
    },
    {
      "order": 4,
      "module": "server-main",
      "does": "On success only: push a snapshot on REMOTES.StateChanged. On failure send nothing — the server is the only writer, so the client's HUD is already correct."
    }
  ],
  "onTick": [
    {
      "order": 1,
      "module": "clearing",
      "fn": "tick(states)",
      "calledBy": "clearing",
      "applies": "radius, value",
      "does": "Every runtime.clearTickRate (0.12s), inside a pcall so one bad iteration cannot stop the loop. Per state: skip if the character or its HumanoidRootPart is absent; read progression.clearRadius(state) once; clear every uncleared patch within that XZ distance — set patch.cleared, destroy the Instance, set state.cleared[index], increment state.clearedCount, award max(1, floor(tier.value * progression.valueMultiplier(state))), and fire FindRevealed for a patch.relic that state.found does not already hold. Then, if clearedCount equals area.patchCount and areaComplete is false, latch areaComplete and fire AreaRestored once. Reads no client message and uses no Touched event."
    }
  ],
  "onSave": [
    {
      "order": 1,
      "module": "persistence",
      "fn": "save(player, state)",
      "calledBy": "server-main",
      "does": "Every runtime.saveIntervalSeconds (45s), for every state in the collection. A failure warns and the loop continues; the next pass retries by existing."
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
      "does": "Save, and wait for it. Before teardown, which is server-main's second criterion."
    },
    {
      "order": 3,
      "module": "plots",
      "fn": "despawn(state)",
      "calledBy": "server-main",
      "does": "Destroy the plot slab, which takes its patches and its spawn Attachment with it, and release the slot so the next player reuses it."
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
      "does": "Wait for the remotes Folder by name from protocol.REMOTES, and create one ScreenGui in PlayerGui. It is created once and survives every character respawn."
    },
    {
      "order": 2,
      "module": "client-main",
      "does": "UIBuilder.build(Screens.hud, Theme, screenGui) to get the HUD's Root frame. No client module authors UI structure."
    },
    {
      "order": 3,
      "module": "hud-binding",
      "fn": "bind(root, gui)",
      "calledBy": "client-main",
      "does": "Resolve the HUD's named nodes once and return an updater. A node name that no longer resolves warns here, once."
    },
    {
      "order": 4,
      "module": "input",
      "fn": "connect(remotes)",
      "calledBy": "client-main",
      "does": "Install the purchase affordance. Fires BuyUpgrade with one upgrade id and nothing else."
    },
    {
      "order": 5,
      "module": "client-main",
      "does": "Connect REMOTES.StateChanged.OnClientEvent to the updater, THEN call REMOTES.RequestState:InvokeServer() once and pass the result to the same updater. In that order, so a push arriving during the round trip is not lost. The updater is idempotent, so a duplicate snapshot is harmless."
    }
  ],
  "constructs": [
    {
      "module": "persistence",
      "fn": "defaultState()",
      "initialises": [
        "currency",
        "upgrades",
        "cleared",
        "clearedCount",
        "found",
        "areaComplete"
      ],
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
      "initialises": [
        "player"
      ],
      "note": "Set once, in onJoin step 2, immediately after load returns and before the state enters the collection. Never reassigned. Not persisted and not in a snapshot."
    },
    {
      "module": "plots",
      "fn": "spawn(player, state)",
      "initialises": [
        "patches"
      ],
      "note": "Built from layout.build() with the slot origin added, filtered by state.cleared for the Instances but not for the records: a cleared patch keeps its record with cleared true and instance nil, so indices stay aligned with layout's order and therefore with state.cleared. Rebuilt on every join and discarded on every leave; never persisted."
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
    "rationale": "tiers already names Enum.PartType shapes, and silhouette is the primary rarity channel on a binding accessibility constraint. Primitives satisfy it with no asset to produce, so nothing blocks the build.",
    "class": "Part for Block, Cylinder and Ball; WedgePart for Heartvine — Enum.PartType has no Wedge member, and getting this wrong silently collapses the fourth silhouette into the first",
    "properties": {
      "Shape": "Enum.PartType[tier.shape] for Block, Cylinder and Ball; not set on a WedgePart",
      "Size": "Vector3.new(patch.footprint, tier.height, patch.footprint) — 3 studs square, height by tier",
      "Position": "the patch's world position, with Y at tier.height / 2 above the slab's top face so it sits on the ground rather than through it",
      "Color": "Color3.fromRGB(unpack(tier.rgb)) — the SECONDARY channel; shape carries rarity first",
      "Material": "Enum.Material[patch.material] — Grass",
      "Anchored": "true",
      "CanCollide": "false — patch.collides is false, and it is load-bearing: contact clearing with movement-only input must never be blocked by the thing being cleared",
      "CastShadow": "false — up to 140 per plot times the player count, and shadows are the cheapest thing to give up",
      "Name": "\"Patch\" plus the 1-based layout index, so a live Instance can be traced to its state.cleared key",
      "Parent": "the plot slab"
    },
    "createdBy": "plots",
    "destroyedBy": "clearing, one at a time as it clears them, and plots when the whole plot goes",
    "asset": null
  },
  {
    "subject": "plot",
    "kind": "part",
    "rationale": "One Part is both the ground a player walks on and the container its patches parent to, so tearing a plot down is one Destroy and the floor cannot outlive its patches. A Folder plus a separate ground part is equally correct; this is the arbitrary half of the call and is stated so two builders do not make it differently.",
    "class": "Part",
    "properties": {
      "Size": "Vector3.new(area.size, 1, area.size) — 120 x 1 x 120",
      "Position": "the slot origin, with the top face at Y = 0 so the slot origin doubles as the walkable plane",
      "Anchored": "true",
      "CanCollide": "true — this is the one thing in the plot the player stands on",
      "Material": "Enum.Material.Slate",
      "Name": "\"Plot\" plus the slot index",
      "Parent": "Workspace"
    },
    "createdBy": "plots",
    "destroyedBy": "plots, in despawn",
    "asset": null,
    "note": "The Baseplate in game/default.project.json is NOT this. It is 400 studs square and stops short of slot 3, so it stays a lobby floor. Slot geometry is in interfaces, under plots.claimSlot."
  },
  {
    "subject": "spawn-anchor",
    "kind": "attachment",
    "rationale": "The character has to arrive at the plot origin for the guaranteed first Find to be under the patch it walks into, and server-main needs that point again on every respawn. An Attachment is a CFrame with no geometry, no collision and nothing to make invisible; holding it on the plot means the location is derived once, by plots, rather than twice by two modules.",
    "class": "Attachment",
    "properties": {
      "Name": "\"Spawn\"",
      "Position": "Vector3.new(0, 0.5, 0) relative to the plot slab — the slab's top face at its centre",
      "Parent": "the plot slab"
    },
    "createdBy": "plots",
    "destroyedBy": "plots, with the slab",
    "asset": null,
    "note": "plots.spawn returns this Attachment's WorldCFrame. server-main pivots the character to it plus 3 studs of Y on every CharacterAdded. There is no SpawnLocation anywhere: a static spawn point cannot land a player inside a plot that is allocated after they join."
  },
  {
    "subject": "relic",
    "kind": "none",
    "rationale": "A Find has no Instance at any point in its life. gameplay/core-loop/03-reveal-placement.md settles that it is revealed on contact at the instant its patch clears — an event, not an object left standing. Its durable existence is a key in state.found; its transient existence is one FindRevealed remote carrying a name. Representing it as a model would demand 24 assets that do not exist, block the build on them, and create a second source of truth for a fact the collection map already holds.",
    "class": null,
    "createdBy": "nothing. clearing sets state.found[name] and fires FindRevealed",
    "destroyedBy": "nothing",
    "asset": null,
    "note": "Which patch hides which Find is layout's Patch.relic, a string or nil, set at build time. That field is the entire world-side representation of a Find and it is data, not an Instance."
  },
  {
    "subject": "hud",
    "kind": "gui",
    "rationale": "Built by ui-forge from ui-forge/briefs/hud.brief.json and emitted to game/src/shared/Screens/hud.luau, which is DATA that UIBuilder.build turns into Instances. Deliberately outside the build order: no module in it authors UI structure.",
    "class": "ScreenGui, created by client-main; its contents created by UIBuilder.build",
    "createdBy": "client-main, once, and it survives a character respawn rather than being rebuilt",
    "destroyedBy": "nothing during a session",
    "asset": null,
    "note": "hud-binding writes text and sizes into named nodes and is forbidden from creating any Instance except a Tween. The node paths are in interfaces, under hud-binding.bind."
  }
]
```

---

## 1. `config` — shared

**Write to:** `game/src/shared/GameConfig.luau`

**Owns:** Hold every tuned value. Generated from spec sheets by the bridge, never authored.

**Depends on:** nothing

### Must expose

- `GameConfig table`
- `upgradeCost(upgrade, level)`
- `upgradeEffect(upgrade, level)`
- `tierByWeight(roll)`

### Must not

- hand-editing this file — the bridge overwrites it and the sheet becomes a lie
- constructing any Roblox type, so the module stays loadable outside the engine

### Values

- reads nothing from the contract

### Done when

1. regenerating with `npm run architect -- --emit` produces no diff — that command, not `npm run bridge -- --emit`, which cannot see the technical keys and errors on runtime.clearTickRate
2. `luau game/test/config.spec.luau` passes with the file loaded outside Roblox

---

## 2. `layout` — shared

**Write to:** `game/src/shared/Layout.luau`

**Owns:** Produce the area's patch positions, tiers and buried relics deterministically from a fixed seed.

**Depends on:** `config`

### Must expose

- `build(): { Patch }`

### Must not

- any per-session randomness — persistence stores patch indices and a shifting layout invalidates every save
- creating Instances; this module returns data only

### Values

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

#### `collection` *(from gameplay/meta/02-the-collection.md)*

```json
{
  "className": "Find",
  "classPlural": "Finds",
  "relicsPerArea": 6,
  "areasPerDepth": 1,
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

#### `onboarding` *(from gameplay/onboarding/01-first-find.md)*

```json
{
  "guaranteedFirstRelic": true
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
    "note": "Generated. Do not reimplement the curve anywhere else. A purchase is legal only while the held level is strictly below def.maxLevel, so the highest price ever charged is upgradeCost(def, maxLevel - 1)."
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
    "note": "The single place the additive-versus-compounding question is answered. progression.clearRadius, progression.walkSpeed and progression.valueMultiplier are each one call to this and nothing else; none of them may inline the arithmetic. All three shipped upgrades are additive today, which is exactly why hand-inlining looks harmless and would silently ignore a future compounding axis."
  },
  {
    "module": "config",
    "fn": "tierByWeight(roll)",
    "params": [
      {
        "name": "roll",
        "type": "number",
        "meaning": "a uniform sample in [0, 1). Not a weight, not a tier index, and not pre-scaled by the weight total — the function scales it."
      }
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
  }
]
```

### Done when

1. two calls in different sessions return identical positions, tiers and relic placement
2. the patch nearest the origin always carries the first relic of set one
3. exactly `collection.relicsPerArea` patches carry a relic
4. patch count equals `area.patchCount` and no two patches sit closer than `area.minSpacing`

---

## 3. `persistence` — server

**Write to:** `game/src/server/Persistence.luau`

**Owns:** Load and save a player's currency, upgrades, collection and cleared state, and collapse a finished area to one flag.

**Depends on:** `config`

### Must expose

- `load(player): PlayerState`
- `save(player, state)`
- `defaultState(): PlayerState`

### Must not

- storing a per-patch cleared list once an area is complete — the brief flags unbounded save growth as this design's one novel technical risk
- throwing on a DataStore failure; a failed load starts a fresh session with a warning

### Values

#### `runtime` *(from 01-runtime.md)*

```json
{
  "clearTickRate": 0.12,
  "saveIntervalSeconds": 45,
  "dataStoreName": "ArgaRuin_v1"
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

#### `interfaces (yours and your dependencies')`

```json
[
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
    "note": "Generated. Do not reimplement the curve anywhere else. A purchase is legal only while the held level is strictly below def.maxLevel, so the highest price ever charged is upgradeCost(def, maxLevel - 1)."
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
    "note": "The single place the additive-versus-compounding question is answered. progression.clearRadius, progression.walkSpeed and progression.valueMultiplier are each one call to this and nothing else; none of them may inline the arithmetic. All three shipped upgrades are additive today, which is exactly why hand-inlining looks harmless and would silently ignore a future compounding axis."
  },
  {
    "module": "config",
    "fn": "tierByWeight(roll)",
    "params": [
      {
        "name": "roll",
        "type": "number",
        "meaning": "a uniform sample in [0, 1). Not a weight, not a tier index, and not pre-scaled by the weight total — the function scales it."
      }
    ],
    "returns": "(integer, TierDef) — the 1-based index into GameConfig.Tiers, then the tier table",
    "note": "The integer is what goes into Patch.tierIndex; the table is for reading value, height and shape at the point of use. Storing the table in a Patch instead of the index is forbidden by 03-state-shape: re-emitting the config would leave stale names in live patches."
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
    "returns": "PlayerState — every persisted field populated; patches empty and player unset",
    "note": "Never throws and never returns nil. On a DataStore failure it warns and returns defaultState(), so the player is playable on a fresh session rather than stuck. It yields; server-main must not insert the state into the live collection until it has returned, or clearing.tick can see a half-loaded state. Reads under runtime.dataStoreName, keyed by the player's UserId."
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
    "note": "Writes exactly the six persisted fields of 03-state-shape and nothing else. THE COLLAPSE: when state.areaComplete is true, cleared is written as an empty set, because the flag already implies every index. That is what keeps the payload bounded and what persistence's own prohibition is about. clearedCount survives the collapse; cleared does not. Yields. Idempotent — saving twice with no change between is not an error."
  },
  {
    "module": "persistence",
    "fn": "defaultState()",
    "params": [],
    "returns": "PlayerState — the opening balance",
    "note": "currency 0, upgrades an empty map (a missing key reads as level 0), cleared an empty map, clearedCount 0, found an empty map, areaComplete false, patches an empty array, player nil. THIS IS THE ONLY CONSTRUCTOR: no other module may build a PlayerState literal, and wiring.constructs names it. Trial 2 had no opening balance and no constructor, and both builders stopped on it independently. Does not yield and does not touch a DataStore, so load can call it on failure."
  }
]
```

### Done when

1. a completed area occupies a single boolean in the payload, not a list
2. a DataStore outage leaves the player playable rather than erroring
3. loading a save written by the previous version does not lose currency

---

## 4. `progression` — server

**Write to:** `game/src/server/Progression.luau`

**Owns:** Own currency, upgrade levels, purchase validation, and every quantity derived from an upgrade level: clear radius, walk speed and the payout multiplier.

**Depends on:** `config`

### Must expose

- `award(state, amount)`
- `tryBuy(state, upgradeId): boolean`
- `clearRadius(state): number`
- `walkSpeed(state): number`
- `valueMultiplier(state): number`

### Must not

- trusting a client-supplied cost or level
- allowing a purchase above an upgrade's maxLevel or below its cost

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

#### `movement` *(from gameplay/mechanics/01-reach-and-pace.md)*

```json
{
  "baseWalkSpeed": 16,
  "baseClearRadius": 5.5
}
```

#### `interfaces (yours and your dependencies')`

```json
[
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
    "note": "Generated. Do not reimplement the curve anywhere else. A purchase is legal only while the held level is strictly below def.maxLevel, so the highest price ever charged is upgradeCost(def, maxLevel - 1)."
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
    "note": "The single place the additive-versus-compounding question is answered. progression.clearRadius, progression.walkSpeed and progression.valueMultiplier are each one call to this and nothing else; none of them may inline the arithmetic. All three shipped upgrades are additive today, which is exactly why hand-inlining looks harmless and would silently ignore a future compounding axis."
  },
  {
    "module": "config",
    "fn": "tierByWeight(roll)",
    "params": [
      {
        "name": "roll",
        "type": "number",
        "meaning": "a uniform sample in [0, 1). Not a weight, not a tier index, and not pre-scaled by the weight total — the function scales it."
      }
    ],
    "returns": "(integer, TierDef) — the 1-based index into GameConfig.Tiers, then the tier table",
    "note": "The integer is what goes into Patch.tierIndex; the table is for reading value, height and shape at the point of use. Storing the table in a Patch instead of the index is forbidden by 03-state-shape: re-emitting the config would leave stale names in live patches."
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
        "meaning": "a positive whole number of currency to ADD to the balance. Not a new total, and already multiplied by valueMultiplier by the caller — award applies no multiplier of its own. If both applied one, the Value upgrade would be squared."
      }
    ],
    "returns": "number — the new balance",
    "note": "The only function that increases currency. Rejects a non-positive amount rather than clamping, because a zero or negative award is a caller bug and clearing's minimum payout is 1."
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
        "note": "one of the ids in upgrades: value, radius, speed"
      }
    ],
    "returns": "boolean — true only if currency was deducted and the level incremented",
    "note": "Reads the held level from state.upgrades[upgradeId], treating nil as 0; prices it with config.upgradeCost(def, heldLevel); on success deducts exactly that and increments the level by exactly 1. Returns false and changes NOTHING if the id is unknown, if the held level already equals def.maxLevel, or if state.currency is below the cost. Never accepts a cost, a level or a target from the caller — the client sends an id and nothing else."
  },
  {
    "module": "progression",
    "fn": "clearRadius(state)",
    "params": [
      {
        "name": "state",
        "type": "PlayerState"
      }
    ],
    "returns": "number — studs",
    "note": "config.upgradeEffect(radius def, held radius level). 5.5 at level 0, matching movement.baseClearRadius. Read fresh by clearing on every tick and cached nowhere, which is why the radius upgrade needs no apply step and takes effect on the next tick after a purchase."
  },
  {
    "module": "progression",
    "fn": "walkSpeed(state)",
    "params": [
      {
        "name": "state",
        "type": "PlayerState"
      }
    ],
    "returns": "number — studs per second",
    "note": "config.upgradeEffect(speed def, held speed level). 16 at level 0, matching movement.baseWalkSpeed. COMPUTES A NUMBER AND WRITES NOTHING. The write to Humanoid.WalkSpeed is server-main's, in wiring.onSpawn and wiring.onPurchase, which is why server-main and not progression holds applies: [\"speed\"]. Trial 1 shipped this function with no writer and Pace was purchasable with no effect."
  },
  {
    "module": "progression",
    "fn": "valueMultiplier(state)",
    "params": [
      {
        "name": "state",
        "type": "PlayerState"
      }
    ],
    "returns": "number — a multiplier, 1.0 at level 0",
    "note": "config.upgradeEffect(value def, held value level). Multiplies a single tier's value, not a payout stack: clearing computes max(1, floor(tier.value * valueMultiplier(state))). The floor and the minimum belong to clearing, not here, because they are properties of a payout and not of the multiplier."
  }
]
```

### Done when

1. a purchase with insufficient currency changes nothing and returns false
2. a purchase at maxLevel changes nothing and returns false
3. clear radius at level 0 equals `movement.baseClearRadius`

---

## 5. `protocol` — shared

**Write to:** `game/src/shared/Protocol.luau`

**Owns:** Name the remotes and define the shape of the state snapshot both sides agree on.

**Depends on:** `config`

### Must expose

- `REMOTES table`
- `snapshotShape()`

### Must not

- declaring any remote that lets a client assert a cleared patch or a currency amount

### Values

#### `collection` *(from gameplay/meta/02-the-collection.md)*

```json
{
  "className": "Find",
  "classPlural": "Finds",
  "relicsPerArea": 6,
  "areasPerDepth": 1,
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
    "note": "Generated. Do not reimplement the curve anywhere else. A purchase is legal only while the held level is strictly below def.maxLevel, so the highest price ever charged is upgradeCost(def, maxLevel - 1)."
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
    "note": "The single place the additive-versus-compounding question is answered. progression.clearRadius, progression.walkSpeed and progression.valueMultiplier are each one call to this and nothing else; none of them may inline the arithmetic. All three shipped upgrades are additive today, which is exactly why hand-inlining looks harmless and would silently ignore a future compounding axis."
  },
  {
    "module": "config",
    "fn": "tierByWeight(roll)",
    "params": [
      {
        "name": "roll",
        "type": "number",
        "meaning": "a uniform sample in [0, 1). Not a weight, not a tier index, and not pre-scaled by the weight total — the function scales it."
      }
    ],
    "returns": "(integer, TierDef) — the 1-based index into GameConfig.Tiers, then the tier table",
    "note": "The integer is what goes into Patch.tierIndex; the table is for reading value, height and shape at the point of use. Storing the table in a Patch instead of the index is forbidden by 03-state-shape: re-emitting the config would leave stale names in live patches."
  },
  {
    "module": "protocol",
    "fn": "REMOTES",
    "params": [],
    "returns": "table — remote NAMES, not Instances. server-main creates the Instances at boot; both sides look them up by these names.",
    "note": "Exactly five, and no more: RequestState (RemoteFunction, client -> server, returns one snapshot, used once at client boot because client-main may not assume the join-time push arrived); StateChanged (RemoteEvent, server -> client, one snapshot); BuyUpgrade (RemoteEvent, client -> server, one upgrade id string and nothing else); FindRevealed (RemoteEvent, server -> client, one find name); AreaRestored (RemoteEvent, server -> client, the area label). There is deliberately no clearing channel and no currency channel — the server observes clearing on a tick, so there is nothing for a client to claim. FindRevealed and AreaRestored are two channels because they are two payoff kinds: gameplay/core-loop/03-reveal-placement.md rejects carrying completion on the reveal channel behind a \"__area_complete:\" string prefix, and names this pair."
  },
  {
    "module": "protocol",
    "fn": "snapshotShape()",
    "params": [],
    "returns": "{ string } — the ordered field names a snapshot carries",
    "note": "Exactly currency, upgrades, clearedCount, found, areaComplete. A snapshot is NOT a PlayerState: patches, cleared and player never cross the wire — patches and cleared are hundreds of entries the HUD has no use for, and player is not serialisable. Both sides build and read the payload from this list rather than repeating field-name literals, which is protocol's second acceptance criterion."
  }
]
```

### Done when

1. the remote list contains no clearing or currency-award channel
2. client and server both derive field names from this module rather than repeating literals

---

## 6. `hud-binding` — client

**Write to:** `game/src/client/HudBinding.luau`

**Owns:** Find the named nodes in the ui-forge HUD and write live state into them.

**Depends on:** `protocol`

### Must expose

- `bind(root, gui): (snapshot) -> ()`

### Must not

- authoring UI structure — the HUD comes from ui-forge/briefs/hud.brief.json and this module only binds to it
- signalling affordability by colour alone; the accessibility constraint applies to derived UI state too

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
  "relicsPerArea": 6,
  "areasPerDepth": 1,
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

#### `interfaces (yours and your dependencies')`

```json
[
  {
    "module": "protocol",
    "fn": "REMOTES",
    "params": [],
    "returns": "table — remote NAMES, not Instances. server-main creates the Instances at boot; both sides look them up by these names.",
    "note": "Exactly five, and no more: RequestState (RemoteFunction, client -> server, returns one snapshot, used once at client boot because client-main may not assume the join-time push arrived); StateChanged (RemoteEvent, server -> client, one snapshot); BuyUpgrade (RemoteEvent, client -> server, one upgrade id string and nothing else); FindRevealed (RemoteEvent, server -> client, one find name); AreaRestored (RemoteEvent, server -> client, the area label). There is deliberately no clearing channel and no currency channel — the server observes clearing on a tick, so there is nothing for a client to claim. FindRevealed and AreaRestored are two channels because they are two payoff kinds: gameplay/core-loop/03-reveal-placement.md rejects carrying completion on the reveal channel behind a \"__area_complete:\" string prefix, and names this pair."
  },
  {
    "module": "protocol",
    "fn": "snapshotShape()",
    "params": [],
    "returns": "{ string } — the ordered field names a snapshot carries",
    "note": "Exactly currency, upgrades, clearedCount, found, areaComplete. A snapshot is NOT a PlayerState: patches, cleared and player never cross the wire — patches and cleared are hundreds of entries the HUD has no use for, and player is not serialisable. Both sides build and read the payload from this list rather than repeating field-name literals, which is protocol's second acceptance criterion."
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
    "note": "Resolves its node paths ONCE at bind time and closes over them, so an unresolved name warns once rather than on every snapshot. The node paths are fixed by the emitted screen: Cluster_topRight.Readout_SHARDS.ReadoutValue.Text takes the currency balance; Cluster_topLeft.Readout_RELICS.ReadoutValue.Text takes \"<found count> / <total finds across collection.sets>\"; Cluster_bottomRight.Readout_<n><LABEL UPPERCASED>.ReadoutValue.Text takes \"Lv <held level>  ·  <config.upgradeCost(def, held level)>\" for the nth entry of upgrades; Cluster_bottomLeft.ProgressGroup.BarLabel.Text takes \"<area.label uppercased> — <percent>% CLEAR\"; and ProgressGroup.Bar.BarFill.Size takes UDim2.fromScale(clearedCount / area.patchCount, 1), tweened rather than set. Affordability is signalled by text as well as colour. Authors no structure and creates no Instance except a Tween."
  }
]
```

### Done when

1. a node name that no longer resolves produces a warning rather than silent no-op
2. affordability is readable with colour removed
3. the progress bar animates rather than snapping

---

## 7. `input` — client

**Write to:** `game/src/client/Input.luau`

**Owns:** Turn player input into purchase requests.

**Depends on:** `protocol`

### Must expose

- `connect(remotes)`

### Must not

- sending anything except an upgrade id — the server owns cost and level

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

#### `interfaces (yours and your dependencies')`

```json
[
  {
    "module": "protocol",
    "fn": "REMOTES",
    "params": [],
    "returns": "table — remote NAMES, not Instances. server-main creates the Instances at boot; both sides look them up by these names.",
    "note": "Exactly five, and no more: RequestState (RemoteFunction, client -> server, returns one snapshot, used once at client boot because client-main may not assume the join-time push arrived); StateChanged (RemoteEvent, server -> client, one snapshot); BuyUpgrade (RemoteEvent, client -> server, one upgrade id string and nothing else); FindRevealed (RemoteEvent, server -> client, one find name); AreaRestored (RemoteEvent, server -> client, the area label). There is deliberately no clearing channel and no currency channel — the server observes clearing on a tick, so there is nothing for a client to claim. FindRevealed and AreaRestored are two channels because they are two payoff kinds: gameplay/core-loop/03-reveal-placement.md rejects carrying completion on the reveal channel behind a \"__area_complete:\" string prefix, and names this pair."
  },
  {
    "module": "protocol",
    "fn": "snapshotShape()",
    "params": [],
    "returns": "{ string } — the ordered field names a snapshot carries",
    "note": "Exactly currency, upgrades, clearedCount, found, areaComplete. A snapshot is NOT a PlayerState: patches, cleared and player never cross the wire — patches and cleared are hundreds of entries the HUD has no use for, and player is not serialisable. Both sides build and read the payload from this list rather than repeating field-name literals, which is protocol's second acceptance criterion."
  },
  {
    "module": "input",
    "fn": "connect(remotes)",
    "params": [
      {
        "name": "remotes",
        "type": "table",
        "note": "the remote Instances, already resolved by name from protocol.REMOTES by client-main"
      }
    ],
    "returns": "nil",
    "note": "Fires REMOTES.BuyUpgrade:FireServer(upgradeId) and nothing else, one id per press. Keyboard 1, 2 and 3 map to the 1st, 2nd and 3rd entries of upgrades — value, radius, speed — which is not a free choice: the emitted HUD already labels those rows \"[1] VALUE\", \"[2] REACH\" and \"[3] PACE\". Ignores input while UserInputService:GetFocusedTextBox() is non-nil, and ignores every other key. Sends no cost and no level."
  }
]
```

### Done when

1. input while a text field is focused is ignored
2. an unknown key sends nothing

---

## 8. `plots` — server

**Write to:** `game/src/server/Plots.luau`

**Owns:** Build and tear down one player's plot of patch Instances, and hold the slot it occupies.

**Depends on:** `config`, `layout`

### Must expose

- `claimSlot(): number`
- `releaseSlot(n)`
- `spawn(player, state): CFrame`
- `despawn(state)`

### Must not

- deriving a plot's position from the live player count — a slot is claimed once and held, or plots move out from under their owners as people join and leave
- making a patch collide; contact clearing with movement-only input must never be blocked by the thing being cleared

### Values

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
    "note": "Generated. Do not reimplement the curve anywhere else. A purchase is legal only while the held level is strictly below def.maxLevel, so the highest price ever charged is upgradeCost(def, maxLevel - 1)."
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
    "note": "The single place the additive-versus-compounding question is answered. progression.clearRadius, progression.walkSpeed and progression.valueMultiplier are each one call to this and nothing else; none of them may inline the arithmetic. All three shipped upgrades are additive today, which is exactly why hand-inlining looks harmless and would silently ignore a future compounding axis."
  },
  {
    "module": "config",
    "fn": "tierByWeight(roll)",
    "params": [
      {
        "name": "roll",
        "type": "number",
        "meaning": "a uniform sample in [0, 1). Not a weight, not a tier index, and not pre-scaled by the weight total — the function scales it."
      }
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
    "module": "plots",
    "fn": "claimSlot()",
    "params": [],
    "returns": "integer — the lowest free 1-based slot index",
    "note": "Called by plots.spawn, not by server-main. Slot n's plot origin is (area.originXZ[1] + (n - 1) * (area.size + 40), 0, area.originXZ[2]): one row along +X, 40 studs of gutter between plots, unbounded, so no player cap is implied anywhere. A slot's position is a function of its index alone and never of the live player count, which is plots's first prohibition. Exposed so slot reuse is testable without building 140 parts."
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
    "note": "Called by plots.despawn. The free pool hands back the lowest free index first, so a vacated slot is reused before a higher one is allocated."
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
        "note": "read for cleared, written for patches"
      }
    ],
    "returns": "CFrame — the plot's spawn point, the WorldCFrame of the plot's spawn Attachment",
    "note": "Claims a slot for this player, builds the plot part, its spawn Attachment and one Instance per patch that state.cleared does not mark, then writes state.patches. Converts layout's plot-local positions to WORLD by adding the slot origin, and it is the ONLY place that conversion happens. A cleared patch still gets its Patch record, with cleared true and instance nil, so indices stay aligned with layout's order. Calling it twice for one player without a despawn between is a bug, not a second plot."
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
    "note": "Destroys the plot for state.player, clears state.patches, and releases the slot internally via releaseSlot. Recovers the slot from its own registry keyed by UserId — PlayerState carries no slot field and must not gain one. Does not save: server-main calls persistence.save before this, which is server-main's second criterion."
  }
]
```

### Done when

1. a rejoining player's already-cleared patches do not respawn
2. two players never occupy the same plot position
3. a vacated slot is reused before a higher one is allocated
4. every spawned patch has CanCollide false

---

## 9. `clearing` — server

**Write to:** `game/src/server/Clearing.luau`

**Owns:** Observe player positions on a tick, clear patches within reach, award currency and reveal relics.

**Depends on:** `config`, `progression`, `plots`

### Must expose

- `tick(states)`
- `start(states)`

### Must not

- accepting any client message about clearing — the server observes, it never asks
- using Touched events, which fire from client-authoritative physics

### Values

#### `runtime` *(from 01-runtime.md)*

```json
{
  "clearTickRate": 0.12,
  "saveIntervalSeconds": 45,
  "dataStoreName": "ArgaRuin_v1"
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

#### `movement` *(from gameplay/mechanics/01-reach-and-pace.md)*

```json
{
  "baseWalkSpeed": 16,
  "baseClearRadius": 5.5
}
```

#### `interfaces (yours and your dependencies')`

```json
[
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
    "note": "Generated. Do not reimplement the curve anywhere else. A purchase is legal only while the held level is strictly below def.maxLevel, so the highest price ever charged is upgradeCost(def, maxLevel - 1)."
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
    "note": "The single place the additive-versus-compounding question is answered. progression.clearRadius, progression.walkSpeed and progression.valueMultiplier are each one call to this and nothing else; none of them may inline the arithmetic. All three shipped upgrades are additive today, which is exactly why hand-inlining looks harmless and would silently ignore a future compounding axis."
  },
  {
    "module": "config",
    "fn": "tierByWeight(roll)",
    "params": [
      {
        "name": "roll",
        "type": "number",
        "meaning": "a uniform sample in [0, 1). Not a weight, not a tier index, and not pre-scaled by the weight total — the function scales it."
      }
    ],
    "returns": "(integer, TierDef) — the 1-based index into GameConfig.Tiers, then the tier table",
    "note": "The integer is what goes into Patch.tierIndex; the table is for reading value, height and shape at the point of use. Storing the table in a Patch instead of the index is forbidden by 03-state-shape: re-emitting the config would leave stale names in live patches."
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
        "meaning": "a positive whole number of currency to ADD to the balance. Not a new total, and already multiplied by valueMultiplier by the caller — award applies no multiplier of its own. If both applied one, the Value upgrade would be squared."
      }
    ],
    "returns": "number — the new balance",
    "note": "The only function that increases currency. Rejects a non-positive amount rather than clamping, because a zero or negative award is a caller bug and clearing's minimum payout is 1."
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
        "note": "one of the ids in upgrades: value, radius, speed"
      }
    ],
    "returns": "boolean — true only if currency was deducted and the level incremented",
    "note": "Reads the held level from state.upgrades[upgradeId], treating nil as 0; prices it with config.upgradeCost(def, heldLevel); on success deducts exactly that and increments the level by exactly 1. Returns false and changes NOTHING if the id is unknown, if the held level already equals def.maxLevel, or if state.currency is below the cost. Never accepts a cost, a level or a target from the caller — the client sends an id and nothing else."
  },
  {
    "module": "progression",
    "fn": "clearRadius(state)",
    "params": [
      {
        "name": "state",
        "type": "PlayerState"
      }
    ],
    "returns": "number — studs",
    "note": "config.upgradeEffect(radius def, held radius level). 5.5 at level 0, matching movement.baseClearRadius. Read fresh by clearing on every tick and cached nowhere, which is why the radius upgrade needs no apply step and takes effect on the next tick after a purchase."
  },
  {
    "module": "progression",
    "fn": "walkSpeed(state)",
    "params": [
      {
        "name": "state",
        "type": "PlayerState"
      }
    ],
    "returns": "number — studs per second",
    "note": "config.upgradeEffect(speed def, held speed level). 16 at level 0, matching movement.baseWalkSpeed. COMPUTES A NUMBER AND WRITES NOTHING. The write to Humanoid.WalkSpeed is server-main's, in wiring.onSpawn and wiring.onPurchase, which is why server-main and not progression holds applies: [\"speed\"]. Trial 1 shipped this function with no writer and Pace was purchasable with no effect."
  },
  {
    "module": "progression",
    "fn": "valueMultiplier(state)",
    "params": [
      {
        "name": "state",
        "type": "PlayerState"
      }
    ],
    "returns": "number — a multiplier, 1.0 at level 0",
    "note": "config.upgradeEffect(value def, held value level). Multiplies a single tier's value, not a payout stack: clearing computes max(1, floor(tier.value * valueMultiplier(state))). The floor and the minimum belong to clearing, not here, because they are properties of a payout and not of the multiplier."
  },
  {
    "module": "plots",
    "fn": "claimSlot()",
    "params": [],
    "returns": "integer — the lowest free 1-based slot index",
    "note": "Called by plots.spawn, not by server-main. Slot n's plot origin is (area.originXZ[1] + (n - 1) * (area.size + 40), 0, area.originXZ[2]): one row along +X, 40 studs of gutter between plots, unbounded, so no player cap is implied anywhere. A slot's position is a function of its index alone and never of the live player count, which is plots's first prohibition. Exposed so slot reuse is testable without building 140 parts."
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
    "note": "Called by plots.despawn. The free pool hands back the lowest free index first, so a vacated slot is reused before a higher one is allocated."
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
        "note": "read for cleared, written for patches"
      }
    ],
    "returns": "CFrame — the plot's spawn point, the WorldCFrame of the plot's spawn Attachment",
    "note": "Claims a slot for this player, builds the plot part, its spawn Attachment and one Instance per patch that state.cleared does not mark, then writes state.patches. Converts layout's plot-local positions to WORLD by adding the slot origin, and it is the ONLY place that conversion happens. A cleared patch still gets its Patch record, with cleared true and instance nil, so indices stay aligned with layout's order. Calling it twice for one player without a despawn between is a bug, not a second plot."
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
    "note": "Destroys the plot for state.player, clears state.patches, and releases the slot internally via releaseSlot. Recovers the slot from its own registry keyed by UserId — PlayerState carries no slot field and must not gain one. Does not save: server-main calls persistence.save before this, which is server-main's second criterion."
  },
  {
    "module": "clearing",
    "fn": "tick(states)",
    "params": [
      {
        "name": "states",
        "type": "map<UserId, PlayerState>",
        "meaning": "the WHOLE live collection, one entry per connected player, keyed by UserId as an integer. Not an array, not keyed by Player, and not one player's state. See stateShape.collection. A builder handed this signature with no such statement guessed a map; a peer guessed differently."
      }
    ],
    "returns": "nil",
    "note": "One pass, in this order, per state: skip the entry entirely if state.player.Character or its HumanoidRootPart is absent; read radius once with progression.clearRadius(state); for every patch with cleared false whose XZ distance to the root part is within radius (XZ only, so height never affects reach) — set patch.cleared, destroy patch.instance and nil the field, set state.cleared[index], increment state.clearedCount, call progression.award with max(1, floor(tier.value * progression.valueMultiplier(state))), and if patch.relic is set and state.found[patch.relic] is not, set it and fire FindRevealed. After the loop, if clearedCount equals area.patchCount and areaComplete is false, latch it and fire AreaRestored exactly once. Never reads a client message; never uses Touched."
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
    "note": "Installs the runtime.clearTickRate loop (0.12s) and returns immediately. Called once by server-main at boot, before any player can join, so an empty collection on the first ticks is normal. Wraps each tick in a pcall and warns: an error in one iteration may not stop the loop, which is server-main's third criterion. Owns the cadence, so no other module reads runtime.clearTickRate."
  }
]
```

### Done when

1. no RemoteEvent exists that a client can fire to claim a cleared patch
2. walking within the current clear radius of a patch clears it within one tick
3. payout equals tier value times the player's value multiplier, floored, minimum 1
4. completing the last patch sets the area-complete flag exactly once

---

## 10. `client-main` — client

**Write to:** `game/src/client/init.client.luau`

**Owns:** Boot the HUD screen, connect the binding and the input, and ask the server for initial state.

**Depends on:** `protocol`, `hud-binding`, `input`

### Must expose

- `none — this is the entry point`

### Must not

- assuming the server's spawn-time push arrived; state is requested once handlers are live

### Values

#### `interfaces (yours and your dependencies')`

```json
[
  {
    "module": "protocol",
    "fn": "REMOTES",
    "params": [],
    "returns": "table — remote NAMES, not Instances. server-main creates the Instances at boot; both sides look them up by these names.",
    "note": "Exactly five, and no more: RequestState (RemoteFunction, client -> server, returns one snapshot, used once at client boot because client-main may not assume the join-time push arrived); StateChanged (RemoteEvent, server -> client, one snapshot); BuyUpgrade (RemoteEvent, client -> server, one upgrade id string and nothing else); FindRevealed (RemoteEvent, server -> client, one find name); AreaRestored (RemoteEvent, server -> client, the area label). There is deliberately no clearing channel and no currency channel — the server observes clearing on a tick, so there is nothing for a client to claim. FindRevealed and AreaRestored are two channels because they are two payoff kinds: gameplay/core-loop/03-reveal-placement.md rejects carrying completion on the reveal channel behind a \"__area_complete:\" string prefix, and names this pair."
  },
  {
    "module": "protocol",
    "fn": "snapshotShape()",
    "params": [],
    "returns": "{ string } — the ordered field names a snapshot carries",
    "note": "Exactly currency, upgrades, clearedCount, found, areaComplete. A snapshot is NOT a PlayerState: patches, cleared and player never cross the wire — patches and cleared are hundreds of entries the HUD has no use for, and player is not serialisable. Both sides build and read the payload from this list rather than repeating field-name literals, which is protocol's second acceptance criterion."
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
    "note": "Resolves its node paths ONCE at bind time and closes over them, so an unresolved name warns once rather than on every snapshot. The node paths are fixed by the emitted screen: Cluster_topRight.Readout_SHARDS.ReadoutValue.Text takes the currency balance; Cluster_topLeft.Readout_RELICS.ReadoutValue.Text takes \"<found count> / <total finds across collection.sets>\"; Cluster_bottomRight.Readout_<n><LABEL UPPERCASED>.ReadoutValue.Text takes \"Lv <held level>  ·  <config.upgradeCost(def, held level)>\" for the nth entry of upgrades; Cluster_bottomLeft.ProgressGroup.BarLabel.Text takes \"<area.label uppercased> — <percent>% CLEAR\"; and ProgressGroup.Bar.BarFill.Size takes UDim2.fromScale(clearedCount / area.patchCount, 1), tweened rather than set. Affordability is signalled by text as well as colour. Authors no structure and creates no Instance except a Tween."
  },
  {
    "module": "input",
    "fn": "connect(remotes)",
    "params": [
      {
        "name": "remotes",
        "type": "table",
        "note": "the remote Instances, already resolved by name from protocol.REMOTES by client-main"
      }
    ],
    "returns": "nil",
    "note": "Fires REMOTES.BuyUpgrade:FireServer(upgradeId) and nothing else, one id per press. Keyboard 1, 2 and 3 map to the 1st, 2nd and 3rd entries of upgrades — value, radius, speed — which is not a free choice: the emitted HUD already labels those rows \"[1] VALUE\", \"[2] REACH\" and \"[3] PACE\". Ignores input while UserInputService:GetFocusedTextBox() is non-nil, and ignores every other key. Sends no cost and no level."
  }
]
```

### Done when

1. a returning player's HUD shows their saved currency and relic count before they clear anything
2. the HUD survives a character respawn without rebuilding

---

## 11. `server-main` — server

**Write to:** `game/src/server/init.server.luau`

**Owns:** Wire lifecycle: create remotes, load and save around join and leave, start the tick, bind shutdown, and apply derived character properties on spawn and after a purchase.

**Depends on:** `protocol`, `persistence`, `progression`, `plots`, `clearing`

### Must expose

- `none — this is the entry point`

### Must not

- containing game logic; anything with a rule in it belongs in one of the modules above

### Values

#### `runtime` *(from 01-runtime.md)*

```json
{
  "clearTickRate": 0.12,
  "saveIntervalSeconds": 45,
  "dataStoreName": "ArgaRuin_v1"
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
    "returns": "table — remote NAMES, not Instances. server-main creates the Instances at boot; both sides look them up by these names.",
    "note": "Exactly five, and no more: RequestState (RemoteFunction, client -> server, returns one snapshot, used once at client boot because client-main may not assume the join-time push arrived); StateChanged (RemoteEvent, server -> client, one snapshot); BuyUpgrade (RemoteEvent, client -> server, one upgrade id string and nothing else); FindRevealed (RemoteEvent, server -> client, one find name); AreaRestored (RemoteEvent, server -> client, the area label). There is deliberately no clearing channel and no currency channel — the server observes clearing on a tick, so there is nothing for a client to claim. FindRevealed and AreaRestored are two channels because they are two payoff kinds: gameplay/core-loop/03-reveal-placement.md rejects carrying completion on the reveal channel behind a \"__area_complete:\" string prefix, and names this pair."
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
      {
        "name": "player",
        "type": "Player"
      }
    ],
    "returns": "PlayerState — every persisted field populated; patches empty and player unset",
    "note": "Never throws and never returns nil. On a DataStore failure it warns and returns defaultState(), so the player is playable on a fresh session rather than stuck. It yields; server-main must not insert the state into the live collection until it has returned, or clearing.tick can see a half-loaded state. Reads under runtime.dataStoreName, keyed by the player's UserId."
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
    "note": "Writes exactly the six persisted fields of 03-state-shape and nothing else. THE COLLAPSE: when state.areaComplete is true, cleared is written as an empty set, because the flag already implies every index. That is what keeps the payload bounded and what persistence's own prohibition is about. clearedCount survives the collapse; cleared does not. Yields. Idempotent — saving twice with no change between is not an error."
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
      {
        "name": "state",
        "type": "PlayerState"
      },
      {
        "name": "amount",
        "type": "integer",
        "meaning": "a positive whole number of currency to ADD to the balance. Not a new total, and already multiplied by valueMultiplier by the caller — award applies no multiplier of its own. If both applied one, the Value upgrade would be squared."
      }
    ],
    "returns": "number — the new balance",
    "note": "The only function that increases currency. Rejects a non-positive amount rather than clamping, because a zero or negative award is a caller bug and clearing's minimum payout is 1."
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
        "note": "one of the ids in upgrades: value, radius, speed"
      }
    ],
    "returns": "boolean — true only if currency was deducted and the level incremented",
    "note": "Reads the held level from state.upgrades[upgradeId], treating nil as 0; prices it with config.upgradeCost(def, heldLevel); on success deducts exactly that and increments the level by exactly 1. Returns false and changes NOTHING if the id is unknown, if the held level already equals def.maxLevel, or if state.currency is below the cost. Never accepts a cost, a level or a target from the caller — the client sends an id and nothing else."
  },
  {
    "module": "progression",
    "fn": "clearRadius(state)",
    "params": [
      {
        "name": "state",
        "type": "PlayerState"
      }
    ],
    "returns": "number — studs",
    "note": "config.upgradeEffect(radius def, held radius level). 5.5 at level 0, matching movement.baseClearRadius. Read fresh by clearing on every tick and cached nowhere, which is why the radius upgrade needs no apply step and takes effect on the next tick after a purchase."
  },
  {
    "module": "progression",
    "fn": "walkSpeed(state)",
    "params": [
      {
        "name": "state",
        "type": "PlayerState"
      }
    ],
    "returns": "number — studs per second",
    "note": "config.upgradeEffect(speed def, held speed level). 16 at level 0, matching movement.baseWalkSpeed. COMPUTES A NUMBER AND WRITES NOTHING. The write to Humanoid.WalkSpeed is server-main's, in wiring.onSpawn and wiring.onPurchase, which is why server-main and not progression holds applies: [\"speed\"]. Trial 1 shipped this function with no writer and Pace was purchasable with no effect."
  },
  {
    "module": "progression",
    "fn": "valueMultiplier(state)",
    "params": [
      {
        "name": "state",
        "type": "PlayerState"
      }
    ],
    "returns": "number — a multiplier, 1.0 at level 0",
    "note": "config.upgradeEffect(value def, held value level). Multiplies a single tier's value, not a payout stack: clearing computes max(1, floor(tier.value * valueMultiplier(state))). The floor and the minimum belong to clearing, not here, because they are properties of a payout and not of the multiplier."
  },
  {
    "module": "plots",
    "fn": "claimSlot()",
    "params": [],
    "returns": "integer — the lowest free 1-based slot index",
    "note": "Called by plots.spawn, not by server-main. Slot n's plot origin is (area.originXZ[1] + (n - 1) * (area.size + 40), 0, area.originXZ[2]): one row along +X, 40 studs of gutter between plots, unbounded, so no player cap is implied anywhere. A slot's position is a function of its index alone and never of the live player count, which is plots's first prohibition. Exposed so slot reuse is testable without building 140 parts."
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
    "note": "Called by plots.despawn. The free pool hands back the lowest free index first, so a vacated slot is reused before a higher one is allocated."
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
        "note": "read for cleared, written for patches"
      }
    ],
    "returns": "CFrame — the plot's spawn point, the WorldCFrame of the plot's spawn Attachment",
    "note": "Claims a slot for this player, builds the plot part, its spawn Attachment and one Instance per patch that state.cleared does not mark, then writes state.patches. Converts layout's plot-local positions to WORLD by adding the slot origin, and it is the ONLY place that conversion happens. A cleared patch still gets its Patch record, with cleared true and instance nil, so indices stay aligned with layout's order. Calling it twice for one player without a despawn between is a bug, not a second plot."
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
    "note": "Destroys the plot for state.player, clears state.patches, and releases the slot internally via releaseSlot. Recovers the slot from its own registry keyed by UserId — PlayerState carries no slot field and must not gain one. Does not save: server-main calls persistence.save before this, which is server-main's second criterion."
  },
  {
    "module": "clearing",
    "fn": "tick(states)",
    "params": [
      {
        "name": "states",
        "type": "map<UserId, PlayerState>",
        "meaning": "the WHOLE live collection, one entry per connected player, keyed by UserId as an integer. Not an array, not keyed by Player, and not one player's state. See stateShape.collection. A builder handed this signature with no such statement guessed a map; a peer guessed differently."
      }
    ],
    "returns": "nil",
    "note": "One pass, in this order, per state: skip the entry entirely if state.player.Character or its HumanoidRootPart is absent; read radius once with progression.clearRadius(state); for every patch with cleared false whose XZ distance to the root part is within radius (XZ only, so height never affects reach) — set patch.cleared, destroy patch.instance and nil the field, set state.cleared[index], increment state.clearedCount, call progression.award with max(1, floor(tier.value * progression.valueMultiplier(state))), and if patch.relic is set and state.found[patch.relic] is not, set it and fire FindRevealed. After the loop, if clearedCount equals area.patchCount and areaComplete is false, latch it and fire AreaRestored exactly once. Never reads a client message; never uses Touched."
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
    "note": "Installs the runtime.clearTickRate loop (0.12s) and returns immediately. Called once by server-main at boot, before any player can join, so an empty collection on the first ticks is normal. Wraps each tick in a pcall and warns: an error in one iteration may not stop the loop, which is server-main's third criterion. Owns the cadence, so no other module reads runtime.clearTickRate."
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

### Done when

1. a player's Humanoid.WalkSpeed equals Progression.walkSpeed(state) after spawning and after any successful purchase
2. a player who leaves has their state saved before their plot is destroyed
3. the clear tick survives an error in one iteration without stopping
4. server shutdown saves every connected player outside Studio

---

## Coverage

Every contract key below is read by at least one module, or it is listed as unread. An
unread key is either a decision nothing needs — worth questioning — or a module that has
not been declared yet.

- **vocabulary** is supplied but no module reads it
