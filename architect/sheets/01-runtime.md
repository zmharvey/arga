# 01 — Server cadences and place identity

**Stage:** architect · **Key:** runtime

## Decision

The server observes clearing on a **0.12 s tick**, saves every **45 s**, respawns a dead
character **3 s** after it dies, stores under **`ArgaRuin_v3`**, composes every area from the
fixed seed **20260801**, and runs a **16-player** place.

Three of those are new. The store name is bumped because waves 2 and 3 changed the save shape.
The layout seed exists because `layout.composition` says an area's chunk run is "seeded by
(layoutSeed, areaOrdinal) and by nothing else" and nothing supplied a seed. `maxPlayers` is
here because `social` decided a band and `Players.MaxPlayers` cannot be written from a script.

## Why

- **Observed, not requested.** `[brief: binding]` `04-PRESENTATION.md`: "clearing and
  currency awards must be server-validated, or a client claiming arbitrary clears owns the
  game." A tick that walks player positions against uncleared patches means there is no
  clear-request remote for a client to forge. `[cid: decided]` `economy.authority` now says
  the same thing from the creative side — "server only; no client message carries a cost, an
  amount or a balance" — and `input.clientOriginatedRemotes` lists exactly two channels,
  neither of which is a clear.
- 0.12 s is roughly two frames at 60fps: fast enough that walking into a patch feels like
  contact, slow enough that the position sweep stays cheap. **It is now load-bearing in a
  second place.** `modifiers.axes[speed].ceilingRule` is `effective * serverTickSeconds <=
  movement.baseClearRadius`, so this number sets the speed ceiling at 5.5 / 0.12 = 45.83
  studs per second. The whole Pace ladder maxes at 25.6, so there is headroom, and lowering
  the tick rate would lower the ceiling rather than only costing CPU.
  `depths.invariants` also reads it: `patchCount <= lapSeconds(k) / (2 * clearTickRate)`.
- **`ArgaRuin_v2`, and the bump is not cosmetic.** `areaComplete` (a boolean) became
  `areasFinished` (an integer), `cleared` narrowed from "the area" to "the live area", and
  `rowsRevealed` is three new persisted booleans that `firstSession.withheld` requires. A v1
  payload loaded as v2 would read `areasFinished` as nil and put every returning player back
  in East Terrace with a cleared set keyed to a layout that no longer exists. The sheet has
  said since wave 1 that "an unversioned key makes the first migration a data loss"; this is
  that migration, and the cheapest correct migration is a new key and no reader of the old
  one. `[architect: decided]` No v1 reader is written: nothing shipped to players.
- **`layoutSeed` is a technical constant and the number is arbitrary.** `[architect: arbitrary]`
  What is *not* arbitrary is that there is exactly one of them, that it is the same on every
  server, and that it never varies by player. `layout.composition` draws an area's chunk run
  from `(layoutSeed, areaOrdinal)`; `layout.anchorSource` derives every patch anchor from
  `hash(layoutSeed, chunkId)`; `discovery.pool.placementRule` says "the layout seed alone picks
  which patch indices carry a Find" and `discovery.pool.stableAcrossRejoin` is true. All three
  are false the moment the seed varies, and `state.cleared` — keyed by patch index — becomes
  meaningless across a rejoin. It sits in `runtime` rather than in `GameConfig`'s layout block
  because it is server identity, like the store name, and changing it is a save migration for
  exactly the same reason.
- **`maxPlayers` is the one decision here that a script cannot execute, and that is why it is
  written down.** `[cid: decided]` `social.maxPlayers` gives a band of 12 to 20 and states
  `scriptSettable: false`, `setVia: "place configuration"`. `Players.MaxPlayers` is read-only
  from a script, so no module can honour this by writing it. **16 is the number, and it is
  `[architect: arbitrary]` within CID's band** — mid-band, comfortably above the 12 below which
  "a player can spend a whole session alone", and two rungs below the 20 at which
  `social.maxPlayers.aboveMaxBreaks` says "per-plot instance count and plot-row length exceed
  the mobile budget". At depth 4 one live bay is 640 patch Instances; 16 players is 10,240 and
  20 is 12,800, and the difference is real on a phone.
- **A number nobody can write still has to be checkable, so `world` asserts it.** The rule this
  repo already enforces is that a decision with no path to the build is not a decision.
  `Players.MaxPlayers` is *readable*, so `world.configure()` reads it at boot and warns loudly
  when it is outside `social.maxPlayers`'s band. That converts "somebody must remember to set
  this in Studio" from an unowned step into a boot-time failure with a name on it. The
  publisher owns the setting; `world` owns catching it being wrong.
- **`respawnDelaySeconds` stays at 3 and stays here.** `[architect: arbitrary]` within a range:
  long enough that a death reads as an event, short enough that a game with no death penalty
  never makes the player wait. `[cid: decided]` `traversal.death` now confirms the design from
  the creative side — `possibleByDesign: false`, `damageSources: 0`, `lossOnRespawn: "none"` —
  and explicitly routes `respawnDelayOwner` to `architect/01-runtime`, which is this sheet.
  Death is reachable only through the Roblox menu's Reset Character.

```manifest
{
  "provides": "runtime",
  "value": {
    "clearTickRate": 0.12,
    "saveIntervalSeconds": 45,
    "respawnDelaySeconds": 3,
    "dataStoreName": "ArgaRuin_v3",
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
      "avatarRigType": {
        "value": "R15",
        "setVia": "place configuration — Avatar > Rig Type. Not scriptable and not emittable.",
        "ownedBy": "whoever publishes the place",
        "whyItMatters": "representation.tool welds to the character's RightHand, and RightHand EXISTS ONLY ON R15 — R6 has `Right Arm`. On an R6 place the tool module warns and builds nothing, so the player holds no tool and its acceptance criterion fails, with no error anywhere else. Found by the tool builder, which correctly refused to invent a fallback limb name.",
        "assertedBy": "tool.equip(), which warns naming this key when the expected limb is absent rather than silently building nothing"
      },
      "nothingElseIsPlaceConfiguration": "every other decision in social — collision groups, chat, plot access, the forbidden APIs — is executed by world.configure() at runtime. maxPlayers and avatarRigType are the two that cannot be, and they are the only entries in this block. Two further items are ALSO place configuration and are NOT yet listed with owners: TextChatService.ChatVersion (if it were LegacyChatService every chat write in world.configure() is inert while configure() reports success) and voice chat (enabled per experience in the Creator Dashboard, unreadable server-side, and social.chat.voice is false). Both were reported by the world builder; neither has a reliable read, so neither is asserted."
    },
    "storeVersionHistory": {
      "ArgaRuin_v1": "wave-1 shape: areaComplete boolean, single-area cleared set, no rowsRevealed. No reader is written; nothing shipped to players.",
      "ArgaRuin_v2": "areasFinished integer, live-area cleared set, rowsRevealed. Superseded and NOT loadable: its cleared indices name patches that no longer exist.",
      "ArgaRuin_v3": "current. Same SHAPE as v2 — the bump is not about shape at all. layout was rewritten from a single fixed area to chunk composition, and state.cleared is keyed by patch ARRAY INDEX, which is the durable identity. Every index now names a different patch, so a v2 save loaded under v3 rules would show a partly re-standing area and a collection whose finds sit under cleared ground. Found by the layout builder, which noticed its own rewrite invalidated a key nothing in its brief owned. A version bump is the migration: v2 keys are simply not read, and no player has a v2 save because nothing has shipped."
    }
  }
}
```

## Consequences for the builders

A builder may now assume:

- That `GameConfig.LayoutSeed` exists and is the only seed in the game. **No module calls
  `math.random`, `Random.new()` with no seed, `os.time()` or `tick()` to place anything.**
  A second source of randomness is a save-corrupting defect, not a style choice.
- That the tick rate is read by `clearing` alone, and that `modifiers` reads it only to compute
  the speed ceiling.
- That the DataStore key is `ArgaRuin_v3` and there is no migration path to write, because nothing has shipped and no v2 key exists in production. Were one to exist, the migration would not be a shape translation — it would be discarding `cleared` entirely, since the indices are unrecoverable.

A builder may **not** assume:

- That `Players.MaxPlayers` can be set. It cannot, and attempting it is a runtime error.
- That any module other than `world` reads `Players.MaxPlayers` at all.

## Acceptance criteria

1. No remote exists that a client can fire to claim a cleared patch, a currency amount or a
   cost. The client-originated surface is exactly `input.clientOriginatedRemotes`.
2. Tick rate is under 0.25 s, and `movement.baseClearRadius / clearTickRate` is above the top
   of the Pace ladder including every set and purchase factor.
3. `grep -rn "math.random\|Random.new()\|os.time()\|os.clock()" game/src` returns nothing
   outside a `Random.new(seed)` derived from `GameConfig.LayoutSeed`.
4. `grep -rn "task.wait(3)\|RespawnTime" game/src` returns nothing: the delay is read from
   `GameConfig.RespawnDelaySeconds`, and the engine's own respawn timer is never set.
5. `grep -rn "MaxPlayers" game/src` matches `World.luau` only, and that match is a read.
6. Starting a server whose `Players.MaxPlayers` is 8 or 24 produces exactly one warning naming
   `social.maxPlayers` and does not stop the boot.

## Not decided here

The save schema itself (`persistence`). Purchase validation (`progression`). What happens *at*
a death — `traversal.death.authoredCue` is `"none"` and `traversal.death.healthWrittenByGameCode`
is false, so `wiring.onDeath` is deliberately bare and stays bare.

**Routed back to CID, and it is the only item on this sheet:** the place's player cap is a
publish-time setting and this contract can only assert it. If the place is published at the
platform default of 50, `world` warns and the game still runs — degraded, because `plots` will
allocate 50 lanes and the row will be 6,100 studs long. That is a real operational step with no
owner inside `BUILD-ORDER.md`, and it belongs beside the two `game/default.project.json` edits
`tree` already collects for the same reason.
