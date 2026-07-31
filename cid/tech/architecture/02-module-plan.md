# 02 — Module plan

**Domain:** Architecture · **Category:** Tech & Data · **Wave:** 5

## Decision

Eleven modules: three shared, six server, two client. Split along **who owns a piece of
state**, not along what reads like a tidy layer diagram.

The boundaries below are not a guess. They are a decomposition of a working
implementation that was written as two monolithic files first, so every seam here is one
that already exists in code rather than one that sounded right on paper.

## Why

- `[brief: binding]` `04-PRESENTATION.md` integrity: clearing must be server-validated.
  So **`clearing` is server-only and no client module may expose a way to request one.**
  That prohibition is carried on the module, not left in prose.
- **`layout` is shared, and that is deliberate.** It must produce the same area from the
  same seed on any machine, because persistence stores patch *indices*: a rejoining
  player's saved cleared-set is meaningless if the layout differs. Making it shared and
  pure is what makes that testable.
- **`config` is generated, not written.** It is listed so dependencies resolve, and its
  only acceptance criterion is that nobody hand-edits it.
- **Sides may only depend inward.** Client and server both read `shared`; neither reads
  the other. The schema refuses violations, because a cross-side require is a runtime
  failure that is cheap to catch on paper.
- `[cid: decided]` The split into six server modules rather than three. The monolith
  worked, but `persistence` and `clearing` in one file meant a save-format change touched
  the clearing tick. Flagged as arguable: a smaller game might justify fewer.

```manifest
{
  "provides": "modules",
  "value": [
    {
      "id": "config",
      "path": "game/src/shared/GameConfig.luau",
      "side": "shared",
      "responsibility": "Hold every tuned value. Generated from spec sheets by the bridge, never authored.",
      "reads": [],
      "exposes": ["GameConfig table", "upgradeCost(upgrade, level)", "tierByWeight(roll)"],
      "dependsOn": [],
      "forbids": [
        "hand-editing this file — the bridge overwrites it and the sheet becomes a lie",
        "constructing any Roblox type, so the module stays loadable outside the engine"
      ],
      "criteria": [
        "regenerating with `npm run bridge -- --emit` produces no diff",
        "`luau game/test/config.spec.luau` passes with the file loaded outside Roblox"
      ]
    },
    {
      "id": "layout",
      "path": "game/src/shared/Layout.luau",
      "side": "shared",
      "responsibility": "Produce the area's patch positions, tiers and buried relics deterministically from a fixed seed.",
      "reads": ["area", "collection", "onboarding", "tiers"],
      "exposes": ["build(): { Patch }"],
      "dependsOn": ["config"],
      "forbids": [
        "any per-session randomness — persistence stores patch indices and a shifting layout invalidates every save",
        "creating Instances; this module returns data only"
      ],
      "criteria": [
        "two calls in different sessions return identical positions, tiers and relic placement",
        "the patch nearest the origin always carries the first relic of set one",
        "exactly `collection.relicsPerArea` patches carry a relic",
        "patch count equals `area.patchCount` and no two patches sit closer than `area.minSpacing`"
      ]
    },
    {
      "id": "protocol",
      "path": "game/src/shared/Protocol.luau",
      "side": "shared",
      "responsibility": "Name the remotes and define the shape of the state snapshot both sides agree on.",
      "reads": ["collection", "upgrades", "currency"],
      "exposes": ["REMOTES table", "snapshotShape()"],
      "dependsOn": ["config"],
      "forbids": [
        "declaring any remote that lets a client assert a cleared patch or a currency amount"
      ],
      "criteria": [
        "the remote list contains no clearing or currency-award channel",
        "client and server both derive field names from this module rather than repeating literals"
      ]
    },
    {
      "id": "persistence",
      "path": "game/src/server/Persistence.luau",
      "side": "server",
      "responsibility": "Load and save a player's currency, upgrades, collection and cleared state, and collapse a finished area to one flag.",
      "reads": ["runtime", "area"],
      "exposes": ["load(player): PlayerState", "save(player, state)", "defaultState(): PlayerState"],
      "dependsOn": ["config"],
      "forbids": [
        "storing a per-patch cleared list once an area is complete — the brief flags unbounded save growth as this design's one novel technical risk",
        "throwing on a DataStore failure; a failed load starts a fresh session with a warning"
      ],
      "criteria": [
        "a completed area occupies a single boolean in the payload, not a list",
        "a DataStore outage leaves the player playable rather than erroring",
        "loading a save written by the previous version does not lose currency"
      ]
    },
    {
      "id": "progression",
      "path": "game/src/server/Progression.luau",
      "side": "server",
      "responsibility": "Own currency, upgrade levels, purchase validation and the derived clear radius and walk speed.",
      "reads": ["upgrades", "movement"],
      "exposes": [
        "award(state, amount)",
        "tryBuy(state, upgradeId): boolean",
        "clearRadius(state): number",
        "walkSpeed(state): number"
      ],
      "dependsOn": ["config"],
      "forbids": [
        "trusting a client-supplied cost or level",
        "allowing a purchase above an upgrade's maxLevel or below its cost"
      ],
      "criteria": [
        "a purchase with insufficient currency changes nothing and returns false",
        "a purchase at maxLevel changes nothing and returns false",
        "clear radius at level 0 equals `movement.baseClearRadius`"
      ]
    },
    {
      "id": "plots",
      "path": "game/src/server/Plots.luau",
      "side": "server",
      "responsibility": "Build and tear down one player's plot of patch Instances, and hold the slot it occupies.",
      "reads": ["area", "patch", "tiers"],
      "exposes": ["claimSlot(): number", "releaseSlot(n)", "spawn(player, state)", "despawn(state)"],
      "dependsOn": ["config", "layout"],
      "forbids": [
        "deriving a plot's position from the live player count — a slot is claimed once and held, or plots move out from under their owners as people join and leave",
        "making a patch collide; contact clearing with movement-only input must never be blocked by the thing being cleared"
      ],
      "criteria": [
        "a rejoining player's already-cleared patches do not respawn",
        "two players never occupy the same plot position",
        "a vacated slot is reused before a higher one is allocated",
        "every spawned patch has CanCollide false"
      ]
    },
    {
      "id": "clearing",
      "path": "game/src/server/Clearing.luau",
      "side": "server",
      "responsibility": "Observe player positions on a tick, clear patches within reach, award currency and reveal relics.",
      "reads": ["runtime", "tiers", "movement"],
      "exposes": ["tick(states)", "start()"],
      "dependsOn": ["config", "progression", "plots"],
      "forbids": [
        "accepting any client message about clearing — the server observes, it never asks",
        "using Touched events, which fire from client-authoritative physics"
      ],
      "criteria": [
        "no RemoteEvent exists that a client can fire to claim a cleared patch",
        "walking within the current clear radius of a patch clears it within one tick",
        "payout equals tier value times the player's value multiplier, floored, minimum 1",
        "completing the last patch sets the area-complete flag exactly once"
      ]
    },
    {
      "id": "server-main",
      "path": "game/src/server/init.server.luau",
      "side": "server",
      "responsibility": "Wire lifecycle: create remotes, load and save around join and leave, start the tick, bind shutdown.",
      "reads": ["runtime"],
      "exposes": ["none — this is the entry point"],
      "dependsOn": ["protocol", "persistence", "progression", "plots", "clearing"],
      "forbids": [
        "containing game logic; anything with a rule in it belongs in one of the modules above"
      ],
      "criteria": [
        "a player who leaves has their state saved before their plot is destroyed",
        "the clear tick survives an error in one iteration without stopping",
        "server shutdown saves every connected player outside Studio"
      ]
    },
    {
      "id": "hud-binding",
      "path": "game/src/client/HudBinding.luau",
      "side": "client",
      "responsibility": "Find the named nodes in the ui-forge HUD and write live state into them.",
      "reads": ["upgrades", "currency"],
      "exposes": ["bind(root, gui): (snapshot) -> ()"],
      "dependsOn": ["protocol"],
      "forbids": [
        "authoring UI structure — the HUD comes from ui-forge/briefs/hud.brief.json and this module only binds to it",
        "signalling affordability by colour alone; the accessibility constraint applies to derived UI state too"
      ],
      "criteria": [
        "a node name that no longer resolves produces a warning rather than silent no-op",
        "affordability is readable with colour removed",
        "the progress bar animates rather than snapping"
      ]
    },
    {
      "id": "input",
      "path": "game/src/client/Input.luau",
      "side": "client",
      "responsibility": "Turn player input into purchase requests.",
      "reads": [],
      "exposes": ["connect(remotes)"],
      "dependsOn": ["protocol"],
      "forbids": [
        "sending anything except an upgrade id — the server owns cost and level"
      ],
      "criteria": [
        "input while a text field is focused is ignored",
        "an unknown key sends nothing"
      ]
    },
    {
      "id": "client-main",
      "path": "game/src/client/init.client.luau",
      "side": "client",
      "responsibility": "Boot the HUD screen, connect the binding and the input, and ask the server for initial state.",
      "reads": [],
      "exposes": ["none — this is the entry point"],
      "dependsOn": ["protocol", "hud-binding", "input"],
      "forbids": [
        "assuming the server's spawn-time push arrived; state is requested once handlers are live"
      ],
      "criteria": [
        "a returning player's HUD shows their saved currency and relic count before they clear anything",
        "the HUD survives a character respawn without rebuilding"
      ]
    }
  ]
}
```

## Consequences for other work

- **Performance** inherits `area.patchCount` anchored non-colliding parts per plot as its
  budget floor, multiplied by server size.
- **Security** has less to do than expected: with clearing observed rather than requested,
  the only client-originated message in the game is an upgrade id.
- **UI/UX** owns the HUD's shape; `hud-binding` is forbidden from authoring structure, so a
  layout change is a brief change and never a code change.

## Acceptance criteria

1. Every module's `reads` names a real contract key.
2. No dependency cycle, and no cross-side dependency except on `shared`.
3. Every module has at least one acceptance criterion.
4. `npm run bridge -- --emit` produces a build order whose module count matches this list.

## Not decided here

Implementation of any module. The save schema's field names (Persistence's own sheet). The
HUD's structure (UI/UX). Whether six server modules is right for a game this size — flagged
above as arguable.
