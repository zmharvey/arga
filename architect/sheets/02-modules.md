# 02 — Module plan

**Domain:** Architecture · **Category:** Tech & Data · **Wave:** 5

## Decision

Eleven modules: three shared, five server, three client. Split along **who owns a piece of
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
- `[cid: decided]` The split into five server modules rather than one file. The monolith
  worked, but `persistence` and `clearing` in one file meant a save-format change touched
  the clearing tick. Flagged as arguable: a smaller game might justify fewer.
- **`exposes` carries a name or a signature and never a sentence.** Two entries used to be
  prose, and both cost the graph an edge. `config` offered `"GameConfig table"` and `protocol`
  offered `"REMOTES table"`; the parser turns each entry into a node by taking the text up to
  the first parenthesis, so those became nodes called `GameConfig table` and `REMOTES table`,
  which no `interfaces` entry could match — `protocol.REMOTES` was declared as an interface and
  read as exposed by nobody. The word *table* was doing real work, so it moved to where a
  machine can read it: **an exposed name with parentheses is a callable and must have its
  parameters resolved in `interfaces`; a bare name is data.** `GameConfig` and `REMOTES` are
  the only two bare names in the game, and `05-interfaces.md` now carries an entry for each
  saying what is in it.
- **An entry point declares itself in a field, not in a sentence.** `server-main` and
  `client-main` exposed `"none — this is the entry point"`, which read as a function called
  *none* and left the fact that nothing may require these two files inferable only by a human.
  Both now carry `"entryPoint": true` with an empty `exposes`. The pair is enforced both ways:
  a module that exposes nothing must set the flag, and a module that sets it must expose
  nothing, because an entry point is called by the engine and requiring one is a second
  execution of the whole boot sequence.
- **There is one way to get a RemoteEvent, and `protocol` owns it end to end.** The third build
  trial found `clearing` required to fire `FindRevealed` and `AreaRestored` while `protocol`
  exposed only names, and `clearing` did not depend on it. The builder resolved the gap by
  inventing `ReplicatedStorage:FindFirstChild(name, true)` with a warning on a miss — a recursive
  search the design does not contain, in the module owning two of the game's five outputs. So
  `protocol` now **creates** the Instances (`createRemotes()`) and **resolves** them
  (`channel(name)`), every module that originates traffic declares it in `fires`, and `protocol`
  declares the list in `declaresRemotes`. The gate refuses a `fires` list on a module that cannot
  reach the owner, and refuses a name nobody declared. The alternative — `server-main` passing a
  table of Instances into `clearing.start` — works, and was rejected because it leaves the folder
  name and the class of each channel inside the entry point, which is where they were hiding when
  the trial went looking.
- **A finished area spawns nothing, and that is `[cid: decided]`, not a guard I invented.**
  `theme/setting/04-permanence-and-passage.md` `W2`: entering a finished part *"spawns **0**
  patches"*, because *"the prohibition is on the list, not on the flag"* and the flag *"is what
  stops a finished part coming back green"* — `[brief: binding]` *"Cleared is permanent —
  overgrowth never returns."* So `areaComplete` is an **input** to `plots.spawn` and the **first
  test** in `clearing.tick`, not a display flag. Before this, the collapse that empties `cleared`
  in the payload respawned all 140 patches on the next join, clearing re-cleared them,
  `progression.award` paid again, and `clearedCount` ran past `area.patchCount` every rejoin
  without bound.

```manifest
{
  "provides": "modules",
  "value": [
    {
      "id": "config",
      "path": "game/src/shared/GameConfig.luau",
      "side": "shared",
      "responsibility": "Hold every tuned value. Generated from spec sheets by the bridge, never authored.",
      "reads": ["tree"],
      "exposes": ["GameConfig", "upgradeCost(upgrade, level)", "upgradeEffect(upgrade, level)", "tierByWeight(roll)"],
      "dependsOn": [],
      "forbids": [
        "hand-editing this file — the bridge overwrites it and the sheet becomes a lie",
        "constructing any Roblox type, so the module stays loadable outside the engine"
      ],
      "criteria": [
        "regenerating with `npm run architect -- --emit` produces no diff — that command, not `npm run bridge -- --emit`, which cannot see the technical keys and errors on runtime.clearTickRate",
        "`luau game/test/config.spec.luau` passes with the file loaded outside Roblox"
      ]
    },
    {
      "id": "layout",
      "path": "game/src/shared/Layout.luau",
      "side": "shared",
      "responsibility": "Produce the area's patch positions, tiers and buried relics deterministically from a fixed seed.",
      "reads": ["area", "collection", "onboarding", "tiers", "tree", "stateShape", "interfaces"],
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
      "responsibility": "Own the remote channels end to end — name them, create the Instances, and hand any module the Instance for a name — and define the shape of the state snapshot both sides agree on.",
      "reads": ["collection", "upgrades", "currency", "tree", "stateShape", "interfaces"],
      "exposes": ["REMOTES", "snapshotShape()", "createRemotes()", "channel(name)"],
      "declaresRemotes": ["RequestState", "StateChanged", "BuyUpgrade", "FindRevealed", "AreaRestored"],
      "dependsOn": ["config"],
      "forbids": [
        "declaring any remote that lets a client assert a cleared patch or a currency amount",
        "letting any other module find a remote for itself: channel(name) is the only path from a name to an Instance in the whole game, and an undeclared name is an error rather than a warning and a nil",
        "creating a remote anywhere but createRemotes, and calling createRemotes from a client",
        "yielding at require time; the Remotes folder is resolved on the first channel() call and cached, per tree's rule that a module returns a table and does nothing else on load"
      ],
      "criteria": [
        "the remote list contains no clearing or currency-award channel",
        "client and server both derive field names from this module rather than repeating literals",
        "channel(name) returns the same Instance on server and client for every declared name, and errors on a name REMOTES does not declare",
        "`grep -rn 'Instance.new(\"Remote' game/src` matches this file only, and no other file contains a remote name literal or the string \"Remotes\""
      ]
    },
    {
      "id": "persistence",
      "path": "game/src/server/Persistence.luau",
      "side": "server",
      "responsibility": "Load and save a player's currency, upgrades, collection and cleared state: collapse a finished area to one flag on the way out, and expand it back on the way in.",
      "reads": ["runtime", "area", "stateShape", "tree", "interfaces", "wiring"],
      "exposes": ["load(player): PlayerState", "save(player, state)", "defaultState(): PlayerState"],
      "dependsOn": ["config"],
      "forbids": [
        "storing a per-patch cleared list once an area is complete — the brief flags unbounded save growth as this design's one novel technical risk",
        "throwing on a DataStore failure; a failed load starts a fresh session with a warning",
        "returning a state whose cleared, clearedCount and areaComplete disagree with each other. load reconciles all three before it returns, so no module downstream has to check and none of them may",
        "trusting the stored clearedCount. It is compared against the cleared set and the flag, and the derived value wins"
      ],
      "criteria": [
        "a completed area occupies a single boolean in the payload, not a list",
        "a DataStore outage leaves the player playable rather than erroring",
        "loading a save written by the previous version does not lose currency",
        "a payload with areaComplete true loads back with cleared holding every index from 1 to area.patchCount and clearedCount equal to area.patchCount — the collapse is lossless because load is its exact inverse",
        "a payload whose clearedCount disagrees with its cleared set loads with the derived value and one warning, never with the stored one"
      ]
    },
    {
      "id": "progression",
      "path": "game/src/server/Progression.luau",
      "side": "server",
      "responsibility": "Own currency, upgrade levels, purchase validation, and every quantity derived from an upgrade level: clear radius, walk speed and the payout multiplier.",
      "reads": ["upgrades", "movement", "stateShape", "tree", "interfaces"],
      "exposes": [
        "award(state, amount)",
        "tryBuy(state, upgradeId): boolean",
        "clearRadius(state): number",
        "walkSpeed(state): number",
        "valueMultiplier(state): number"
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
      "responsibility": "Build and tear down one player's plot — the slab, its four barriers, its spawn Attachment and its patch Instances — and hold the slot it occupies.",
      "reads": ["area", "patch", "tiers", "stateShape", "tree", "interfaces", "representation"],
      "exposes": ["claimSlot(): number", "releaseSlot(n)", "spawn(player, state): CFrame", "despawn(state)"],
      "dependsOn": ["config", "layout"],
      "forbids": [
        "deriving a plot's position from the live player count — a slot is claimed once and held, or plots move out from under their owners as people join and leave",
        "making a patch collide; contact clearing with movement-only input must never be blocked by the thing being cleared",
        "creating a patch Instance for an index state.cleared marks, or for any index at all while state.areaComplete is true. This is where \"cleared is permanent\" is enforced in the world, and no caller may be trusted to remember it",
        "building a plot without its four barriers, sizing the slab to area.size instead of the full slot pitch, or making a barrier visible or query-able. A plot missing any of that has a way out of the world in it, which is what the first playtest walked into",
        "using one Size formula for all four tiers. A Cylinder's length is its local X and a Ball takes its smallest component, so the single formula lays the Fern down and shrinks the Bramble — and shape is the rarity channel that has to survive colour being removed"
      ],
      "criteria": [
        "a rejoining player's already-cleared patches do not respawn",
        "a player whose areaComplete is true gets a plot slab, its four barriers, a spawn Attachment and ZERO patch Instances, with all area.patchCount Patch records present and marked cleared — a finished area stays walkable and stays bare",
        "two players never occupy the same plot position",
        "a vacated slot is reused before a higher one is allocated",
        "every spawned patch has CanCollide false",
        "a character cannot leave the plot it spawned on: each of the four barriers stops it, jumping does not clear one, and no point on the plot reaches air",
        "each tier's world bounding box is patch.footprint x tier.height x patch.footprint, except Bramble at tier.height cubed, and the top of every patch is exactly tier.height above the slab"
      ]
    },
    {
      "id": "clearing",
      "path": "game/src/server/Clearing.luau",
      "side": "server",
      "responsibility": "Observe player positions on a tick, clear patches within reach, award currency and reveal relics.",
      "reads": ["runtime", "area", "tiers", "movement", "stateShape", "tree", "interfaces", "wiring", "representation"],
      "applies": ["radius", "value"],
      "fires": ["FindRevealed", "AreaRestored", "StateChanged"],
      "exposes": ["tick(states)", "start(states)"],
      "dependsOn": ["config", "progression", "plots", "protocol"],
      "forbids": [
        "accepting any client message about clearing — the server observes, it never asks",
        "using Touched events, which fire from client-authoritative physics",
        "touching a state whose areaComplete is true in any way: no distance test, no award, no write, no remote. The latch is the first thing the pass reads and the rest of the pass is unreachable behind it",
        "reaching a remote by any means other than protocol.channel(name)",
        "requiring Plots.luau. The dependency on plots is the Patch record contract and the build order, not a call: clearing reads state.patches, sets Patch.cleared and destroys Patch.instance, and calls nothing on plots"
      ],
      "criteria": [
        "no RemoteEvent exists that a client can fire to claim a cleared patch",
        "walking within the current clear radius of a patch clears it within one tick",
        "payout equals tier value times the player's value multiplier, floored, minimum 1",
        "completing the last patch sets the area-complete flag exactly once",
        "state.clearedCount never exceeds area.patchCount, over any number of rejoins",
        "a player whose areaComplete is true is awarded nothing and fires nothing, however far they walk",
        "clearing one patch pushes exactly one StateChanged; standing still for ten ticks pushes none"
      ]
    },
    {
      "id": "server-main",
      "path": "game/src/server/init.server.luau",
      "side": "server",
      "responsibility": "Wire lifecycle: ask protocol to create the remotes, load and save around join and leave, start the tick, bind shutdown, and apply derived character properties on spawn and after a purchase.",
      "reads": ["runtime", "stateShape", "upgrades", "tree", "interfaces", "wiring", "movement"],
      "applies": ["speed"],
      "fires": ["StateChanged"],
      "exposes": [],
      "entryPoint": true,
      "dependsOn": ["protocol", "persistence", "progression", "plots", "clearing"],
      "forbids": [
        "being required by any other module. This is the server entry point — entryPoint true, exposes empty — and Roblox is its only caller; a require would run this whole boot sequence a second time, creating a second remotes folder and a second clear tick",
        "containing game logic; anything with a rule in it belongs in one of the modules above",
        "creating a remote itself, choosing where the remotes live, or naming one in a literal — protocol.createRemotes() creates them and protocol.channel(name) resolves them"
      ],
      "criteria": [
        "a player's Humanoid.WalkSpeed equals Progression.walkSpeed(state) after spawning and after any successful purchase",
        "every remote in this file is reached through protocol.channel, and the remotes exist before any player can join",
        "a player who leaves has their state saved before their plot is destroyed",
        "the clear tick survives an error in one iteration without stopping",
        "server shutdown saves every connected player outside Studio",
        "a player who dies gets a new character runtime.respawnDelaySeconds later, on their own plot's spawn Attachment, with their currency, levels and cleared patches unchanged — and gets another one every time they die after that",
        "a player who leaves during the death delay produces no error and no loaded character"
      ]
    },
    {
      "id": "hud-binding",
      "path": "game/src/client/HudBinding.luau",
      "side": "client",
      "responsibility": "Find the named nodes in the ui-forge HUD and write live state into them.",
      "reads": ["upgrades", "currency", "collection", "area", "tree", "interfaces", "representation"],
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
      "reads": ["upgrades", "tree", "interfaces"],
      "exposes": ["connect()"],
      "fires": ["BuyUpgrade"],
      "dependsOn": ["protocol"],
      "forbids": [
        "sending anything except an upgrade id — the server owns cost and level",
        "accepting a table of remote Instances from its caller, or resolving one by name. It asks protocol.channel(\"BuyUpgrade\"), which is the only lookup in the game"
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
      "responsibility": "Boot the HUD screen, connect the binding and the input, connect every server-to-client channel, and ask the server for initial state.",
      "reads": ["tree", "interfaces", "wiring", "representation"],
      "fires": ["RequestState"],
      "exposes": [],
      "entryPoint": true,
      "dependsOn": ["protocol", "hud-binding", "input"],
      "forbids": [
        "being required by any other module. This is the client entry point — entryPoint true, exposes empty — and Roblox is its only caller; a require would build a second ScreenGui and a second set of handlers",
        "assuming the server's spawn-time push arrived; state is requested once handlers are live",
        "resolving a remote by name or by search; protocol.channel(name) is the only lookup",
        "leaving FindRevealed or AreaRestored unconnected. Their presentation is not specified yet and their handlers are empty, but an unconnected channel is an output with nothing at the end of it"
      ],
      "criteria": [
        "a returning player's HUD shows their saved currency and relic count before they clear anything",
        "the HUD survives a character respawn without rebuilding",
        "all four server-to-client channels have a connected handler after boot, and adding presentation to a reveal is a change to one function body and to no wiring"
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

1. Every module's `reads` names a real key in one of the two contracts — the nine creative keys
   in `bridge/schema.mjs` or the seven technical ones in `architect/schema.mjs`.
2. No dependency cycle, and no cross-side dependency except on `shared`.
3. Every module has at least one acceptance criterion.
4. `npm run architect -- --emit` produces a build order whose module count matches this list.
5. Every entry in an `exposes` list is a bare name or a signature, never prose, and every
   entry point carries `entryPoint: true` with an empty `exposes`. The architect gate refuses
   both failures.
6. Every exposed *callable* — every entry carrying parentheses — appears in `interfaces` with its
   parameters resolved, and every `interfaces` entry names a function its module exposes. The
   gate now refuses both directions. A bare name is exempt from the first, since a table has no
   parameters; `GameConfig` and `REMOTES` are the only two, and both carry an entry anyway.
7. Every module that originates remote traffic declares it in `fires`, depends on the module
   holding `declaresRemotes`, and fires only names on that list. The architect gate refuses all
   three failures.
8. Each of `protocol`'s five channels has exactly one originating module across every `fires`
   list, and every one of those five names appears in some `fires` list. A channel nobody fires is
   a dead channel; a channel two modules fire is only allowed for `StateChanged`, which carries a
   whole snapshot and is therefore idempotent, and is stated in `interfaces`.

## Not decided here

Implementation of any module. The save schema's field names (Persistence's own sheet). The
HUD's structure (UI/UX). Whether five server modules is right for a game this size — flagged
above as arguable.

**Amended by `05-interfaces.md`:** `config.GameConfig` and `protocol.REMOTES` each gained an
`interfaces` entry, because the explanation that used to sit inside the `exposes` string ("table")
needs somewhere to live and a builder still has to be told what is in each of them.
`input.connect(remotes)` became `input.connect()`, because
`protocol.channel(name)` exists and passing resolved Instances between modules is a second way to
get one. `config` gained `upgradeEffect(upgrade, level)`, which exists
in the generated file and which `progression`'s three derived quantities each call, so leaving it
undeclared made three modules re-decide "additive or compounding". `clearing.start()` became
`clearing.start(states)`, because it owns the tick cadence and therefore has to be handed the
collection it ticks. `plots.spawn` now states its return, a `CFrame`, because
`onboarding.guaranteedFirstRelic` is kept by where the character arrives and `server-main` may
not derive that point a second time.
