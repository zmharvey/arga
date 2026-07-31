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

## 1. `config` — shared

**Write to:** `game/src/shared/GameConfig.luau`

**Owns:** Hold every tuned value. Generated from spec sheets by the bridge, never authored.

**Depends on:** nothing

### Must expose

- `GameConfig table`
- `upgradeCost(upgrade, level)`
- `tierByWeight(roll)`

### Must not

- hand-editing this file — the bridge overwrites it and the sheet becomes a lie
- constructing any Roblox type, so the module stays loadable outside the engine

### Values

- reads nothing from the contract

### Done when

1. regenerating with `npm run bridge -- --emit` produces no diff
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
  "label": "EAST TERRACE",
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

#### `runtime` *(from tech/architecture/01-server-cadences.md)*

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
  "label": "EAST TERRACE",
  "originXZ": [
    0,
    0
  ],
  "size": 120,
  "patchCount": 140,
  "minSpacing": 6
}
```

### Done when

1. a completed area occupies a single boolean in the payload, not a list
2. a DataStore outage leaves the player playable rather than erroring
3. loading a save written by the previous version does not lose currency

---

## 4. `progression` — server

**Write to:** `game/src/server/Progression.luau`

**Owns:** Own currency, upgrade levels, purchase validation and the derived clear radius and walk speed.

**Depends on:** `config`

### Must expose

- `award(state, amount)`
- `tryBuy(state, upgradeId): boolean`
- `clearRadius(state): number`
- `walkSpeed(state): number`

### Must not

- trusting a client-supplied cost or level
- allowing a purchase above an upgrade's maxLevel or below its cost

### Values

#### `upgrades` *(from gameplay/balance/01-upgrade-ladder.md)*

```json
[
  {
    "id": "value",
    "label": "VALUE",
    "blurb": "Each patch pays more",
    "costBase": 25,
    "costGrowth": 1.6,
    "maxLevel": 10,
    "perLevel": 0.25
  },
  {
    "id": "radius",
    "label": "REACH",
    "blurb": "Clear a wider sweep as you walk",
    "costBase": 40,
    "costGrowth": 1.75,
    "maxLevel": 8,
    "perLevel": 1.1
  },
  {
    "id": "speed",
    "label": "PACE",
    "blurb": "Move faster between patches",
    "costBase": 60,
    "costGrowth": 1.8,
    "maxLevel": 6,
    "perLevel": 1.6
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
    "label": "VALUE",
    "blurb": "Each patch pays more",
    "costBase": 25,
    "costGrowth": 1.6,
    "maxLevel": 10,
    "perLevel": 0.25
  },
  {
    "id": "radius",
    "label": "REACH",
    "blurb": "Clear a wider sweep as you walk",
    "costBase": 40,
    "costGrowth": 1.75,
    "maxLevel": 8,
    "perLevel": 1.1
  },
  {
    "id": "speed",
    "label": "PACE",
    "blurb": "Move faster between patches",
    "costBase": 60,
    "costGrowth": 1.8,
    "maxLevel": 6,
    "perLevel": 1.6
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
    "label": "VALUE",
    "blurb": "Each patch pays more",
    "costBase": 25,
    "costGrowth": 1.6,
    "maxLevel": 10,
    "perLevel": 0.25
  },
  {
    "id": "radius",
    "label": "REACH",
    "blurb": "Clear a wider sweep as you walk",
    "costBase": 40,
    "costGrowth": 1.75,
    "maxLevel": 8,
    "perLevel": 1.1
  },
  {
    "id": "speed",
    "label": "PACE",
    "blurb": "Move faster between patches",
    "costBase": 60,
    "costGrowth": 1.8,
    "maxLevel": 6,
    "perLevel": 1.6
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

- reads nothing from the contract

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
- `spawn(player, state)`
- `despawn(state)`

### Must not

- deriving a plot's position from the live player count — a slot is claimed once and held, or plots move out from under their owners as people join and leave
- making a patch collide; contact clearing with movement-only input must never be blocked by the thing being cleared

### Values

#### `area` *(from gameplay/meta/01-the-area.md)*

```json
{
  "id": "east-terrace",
  "label": "EAST TERRACE",
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
- `start()`

### Must not

- accepting any client message about clearing — the server observes, it never asks
- using Touched events, which fire from client-authoritative physics

### Values

#### `runtime` *(from tech/architecture/01-server-cadences.md)*

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

- reads nothing from the contract

### Done when

1. a returning player's HUD shows their saved currency and relic count before they clear anything
2. the HUD survives a character respawn without rebuilding

---

## 11. `server-main` — server

**Write to:** `game/src/server/init.server.luau`

**Owns:** Wire lifecycle: create remotes, load and save around join and leave, start the tick, bind shutdown.

**Depends on:** `protocol`, `persistence`, `progression`, `plots`, `clearing`

### Must expose

- `none — this is the entry point`

### Must not

- containing game logic; anything with a rule in it belongs in one of the modules above

### Values

#### `runtime` *(from tech/architecture/01-server-cadences.md)*

```json
{
  "clearTickRate": 0.12,
  "saveIntervalSeconds": 45,
  "dataStoreName": "ArgaRuin_v1"
}
```

### Done when

1. a player who leaves has their state saved before their plot is destroyed
2. the clear tick survives an error in one iteration without stopping
3. server shutdown saves every connected player outside Studio

---

## Coverage

Every contract key below is read by at least one module, or it is listed as unread. An
unread key is either a decision nothing needs — worth questioning — or a module that has
not been declared yet.

- **vocabulary** is supplied but no module reads it
