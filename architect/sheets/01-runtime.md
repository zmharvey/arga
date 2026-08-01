# 01 — Server cadences

**Domain:** Architecture · **Category:** Tech & Data · **Wave:** 5

## Decision

The server observes clearing on a **0.12 s tick**, saves every **45 s**, respawns a dead
character **3 s** after it dies, and stores under `ArgaRuin_v1`.

## Why

- **Observed, not requested.** `[brief: binding]` `04-PRESENTATION.md`: "clearing and
  currency awards must be server-validated, or a client claiming arbitrary clears owns the
  game." A tick that walks player positions against uncleared patches means there is no
  clear-request remote for a client to forge. Integrity by construction rather than by
  validation.
- 0.12 s is roughly two frames at 60fps: fast enough that walking into a patch feels like
  contact, slow enough that the position sweep is cheap at 140 patches and 20 players.
- The store name is versioned because the save shape will change, and an unversioned key
  makes the first migration a data loss.
- **`respawnDelaySeconds` is here because it is a server cadence and it had nowhere else to
  live.** `wiring` turns `Players.CharacterAutoLoads` off, so the engine's own
  `Players.RespawnTime` is never consulted and the delay between `Humanoid.Died` and the next
  `LoadCharacter` is entirely the server's to choose. The first playtest found that nothing
  chose it: there was no respawn at all, and **a player who used the Roblox menu's Reset
  Character stayed dead for the rest of the session.** A number with no home becomes a
  `task.wait(3)` literal inside the entry point, which is the same defect class as the gutter
  width the last builder had to name itself. It sits beside `clearTickRate` and
  `saveIntervalSeconds` because all three are "how often the server does a thing", all three
  are read by exactly one module, and all three are emitted into `GameConfig` by the same
  block.
- **3 s, and it is a judgement rather than a derivation.** `[architect: arbitrary]` within a
  range: long enough that a death reads as an event rather than a teleport glitch, short
  enough that a game with no combat and no death penalty never makes the player wait. Roblox's
  own default is 5 s, tuned for games where dying costs something; here it costs nothing —
  `cleared`, `currency` and `upgrades` are untouched by death, and `wiring.onDeath` rebuilds
  no plot — so the shorter end is right. Anything above about 5 s would need a reason this
  game does not have.

```manifest
{
  "provides": "runtime",
  "value": {
    "clearTickRate": 0.12,
    "saveIntervalSeconds": 45,
    "respawnDelaySeconds": 3,
    "dataStoreName": "ArgaRuin_v1"
  }
}
```

## Consequences for other work

- **Security** does not need a clearing validation rule, because there is no clearing
  request to validate. It does still own bid-style validation for purchases.
- **Persistence** must collapse a finished area to a single completion flag rather than
  storing every cleared patch index, or save size grows without bound — the brief flags
  this as the one genuinely novel technical risk in the design.
- **`server-main` is the only reader of `respawnDelaySeconds`**, through
  `GameConfig.RespawnDelaySeconds`, in `wiring.onDeath`. No other module may wait on it and
  no file may restate the number.

## Acceptance criteria

1. No remote exists that a client can fire to claim a cleared patch.
2. Tick rate is under 0.25 s, or contact clearing feels laggy.
3. A completed area occupies one boolean in the save payload, not a list.
4. `grep -rn "task.wait(3)\|RespawnTime" game/src` returns nothing: the delay is read from
   `GameConfig.RespawnDelaySeconds`, and the engine's own respawn timer is never set, because
   `CharacterAutoLoads` is off and it would do nothing.

## Not decided here

The save schema itself (Persistence), purchase validation (Security). What happens *at* a
death — animation, camera, any message — which is UI/UX and Audio, neither of which owns a
contract key; `wiring.onDeath` is the wire those would hang from and it is deliberately bare.
