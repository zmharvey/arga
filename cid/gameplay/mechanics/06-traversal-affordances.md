# 06 — Traversal affordances

**Domain:** Mechanics · **Category:** Gameplay · **Wave:** 2

## Decision

**Jump exists at the platform default and changes no game state. The world cannot kill, drop or
damage the player, and an area is bounded by a wall the player cannot pass rather than by an edge
they can fall off. One player's body cannot block another's: player-to-player collision is off.**

## Why

**G6, jumping.** It exists. `[cid: decided]` The brief's "movement only" governs game verbs, and a
jump moves the body without touching a single game value. Removing it means actively deleting a
control every device already draws, including the mobile jump button, which reads as broken rather
than as minimal, and it is the first thing an 8-14 player tries `[brief: binding]` ← `[you chose:
R1 Q4]`, `00-CORE.md`. The price of keeping it is one rule: **nothing may ever be gated behind a
jump.** No patch, no Find, no marked place and no route may require leaving the ground, so a player
who never jumps is never behind.

The engine defaults are `JumpHeight = 7.2` with `UseJumpPower = false`, which I carry unchanged so a
player's jump feels like every other Roblox game's.
`[research owed: Roblox's current StarterPlayer and Humanoid jump defaults, specifically whether
CharacterJumpHeight is 7.2 with UseJumpPower false in the current engine version]`

**G7, death and edges.** There is none, and it is not a near miss. "There is no failure state. No
death, no losing, no loss of progress" `[brief: soft]` ← `[you accepted: step 6 Q2]`,
`02-GAMEPLAY.md`. So: zero damage sources, zero killbricks, zero void below the play area, zero fall
damage, and `Humanoid.Health` written by zero lines of game code.

The shipped build sets `RespawnDelaySeconds = 3` with `Players.CharacterAutoLoads` off and a
hand-rolled respawn `[research: game/src/shared/GameConfig.luau]`, which is a death path in a game
whose brief says it has none. **The resolution is that the path stays and becomes a recovery, not a
mechanic.** A character can still be lost to an engine fault or a bug, and the first playtest found
that a player who died stayed dead for the session, so deleting the path is worse than keeping it.
Its cost is fixed at nothing: no currency loss, no progress loss, no cleared-state loss, respawn at
the area spawn, and no game-authored death cue of any kind.

**The edge is a barrier, not a drop.** `[cid: decided]` A drop implies a fall, a fall implies either
death or a recovery, and both are tension the brief forbids three times. A wall implies neither, and
it is the setting's own architecture: the ruin is "level platforms cut and walled into a hillside"
`[research: cid/_digest.md]`, `theme/setting/01`. The barrier is placed past the patch field so the
player never clears with their back against it, and it is taller than a jump can reach so it is not
a puzzle.

**G9, can one body block another.** No. `[cid: decided]` The binding social rule is "shared server,
parallel progression, own areas, no interaction. Interaction: none mechanical" `[brief: soft]` ←
`[you accepted: R6 Q2]`, `02-GAMEPLAY.md`, stated twice. A body that blocks another body is a
mechanical interaction, and it is the only one the game affords: standing on a purchase pad,
blocking a doorway, or parking on a Find mid-dwell are each achievable by a stranger who cannot do
anything else. Player characters collide by default on Roblox, since "All BaseParts automatically
belong to this default group unless assigned to another group"
`[research: https://create.roblox.com/docs/workspace/collisions]`, so this requires an explicit
collision group and will not happen by omission. Player-to-world collision stays on.

**The boundary with sheet 02:** exclusions of *inputs* are 02's, exclusions of *world affordances*
are mine. Sheet 02 rules that there is no climb verb; this sheet rules that there is no climbable
surface to have needed one.

## What the body may do, and where

| property | value | note |
|---|---|---|
| jump | exists, platform default | `JumpHeight = 7.2`, `UseJumpPower = false` |
| jump gates | zero | no patch, Find, marked place or route requires it |
| jump upgrades | zero | no axis touches jump; Pace is walk speed only |
| fall damage | none | at any height |
| damage sources in the world | zero | no killbrick, no hazard, no trap, no drowning, no burning |
| void below the play area | none | the ground is continuous under every walkable surface |
| `Humanoid.Health` writes by game code | zero | health is never read or written |
| death by design | impossible | the respawn path exists only as fault recovery |
| respawn location | the area's spawn point | the delay's value is owned by runtime work, `architect/01-runtime`, not set here |
| loss on respawn | none | no currency, no upgrade level, no Find, no cleared patch |
| death cue | none authored | no screen, no sound, no colour flash, no message |
| area boundary | a collision barrier | 12 studs of walkable margin past the patch field on every side, then a wall 20 studs tall |
| barrier behaviour | stops the character | not passable, not climbable, not jumpable; no teleport-back, no warning, no cue, no damage |
| maximum step height on any route | 2 studs | between spawn, every patch and every marked place |
| maximum slope where a patch may stand | 30 degrees | so no patch is unreachable by walking |
| climbable surfaces, ladders, trusses | zero | |
| seats, vehicles, mounts, ziplines | zero | |
| water, swimming, mud, slow ground | zero | no surface changes the player's speed |
| teleports inside an area | zero | every point is reached by walking |
| player-to-player collision | off | one collision group for characters, non-colliding with itself |
| player-to-world collision | on | unchanged from the engine default |
| pushing, shoving, standing on another player | impossible | follows from non-collision |
| lockouts, hazards, fall penalties, timers | zero | zero tension is confirmed and instructed |

```manifest
{
  "provides": "traversal",
  "status": "proposed",
  "value": {
    "jump": { "exists": true, "jumpHeight": 7.2, "useJumpPower": false, "changesGameState": false, "upgradable": false, "gatedContent": 0 },
    "fall": { "damage": false, "voidBelowPlayArea": false, "maxSurvivableFallStuds": null },
    "death": { "possibleByDesign": false, "damageSources": 0, "healthWrittenByGameCode": false, "respawnAt": "areaSpawn", "lossOnRespawn": "none", "authoredCue": "none", "respawnDelayOwner": "architect/01-runtime" },
    "boundary": { "kind": "collisionBarrier", "walkableMarginStuds": 12, "heightStuds": 20, "passable": false, "climbable": false, "jumpable": false, "cue": "none", "teleportBack": false },
    "surface": { "maxStepStuds": 2, "maxSlopeDegreesWherePatchesStand": 30, "climbSurfaces": 0, "ladders": 0, "seats": 0, "vehicles": 0, "water": 0, "speedModifyingSurfaces": 0, "teleportsWithinArea": 0 },
    "collision": { "playerVsPlayer": false, "playerVsWorld": true, "collisionGroup": "Players", "pushable": false, "standOnOtherPlayers": false },
    "hazards": 0,
    "fallPenalties": 0,
    "lockouts": 0
  }
}
```

## Consequences for other work

- **Presence-sufficiency work (currently Multiplayer and Social, wave 2):** presence is carried
  entirely by sight and sound. A stranger cannot be bumped, blocked, pushed or stood on, so if the
  cheapest warmth-adding touch turns out to be needed, **it may not be physical.** This also removes
  the game's only griefing surface, which is worth having before the question is asked.
- **Area-layout work (Meta and Content):** the walkable surface extends 12 studs past the patch
  field on every side before the barrier, and every route from spawn to every patch and every marked
  place must be walkable within a 2-stud step and a 30-degree slope. No layout may place a patch, a
  Find or a marked place anywhere reachable only by jumping.
- **Environment and set-dressing work (Art and Visuals):** the barrier is a bound, not an object.
  What stands at the boundary is yours, inside two constraints: it must be at least 20 studs tall
  and it may not read as a thing to climb.
- **Architecture and runtime work:** `Players.CharacterAutoLoads` and `RespawnDelaySeconds` stay
  yours. This sheet requires only that a lost character is playing again at the area spawn with zero
  loss; whether the respawn stays hand-rolled is your call.
- **Tech and performance work:** one collision group for player characters, configured
  non-colliding with itself, is the only collision-group requirement in the game. Patch
  non-collision is already set by `art/objects/01` and is not restated here.

## Acceptance criteria

1. `Humanoid.Health` is written by zero lines of game code, the place contains zero damage sources,
   and a character walking or jumping anywhere in the area for ten minutes never dies.
2. Two characters standing in the same spot pass through each other, and neither can be pushed,
   blocked or stood upon; both still collide with the ground and the boundary.
3. Every patch, every Find and all four marked places in the area are reachable from the spawn point
   without leaving the ground, and the barrier cannot be crossed by walking, jumping, or both.
4. A character forced into death by a debug command is playable again at the area spawn with the
   same currency, upgrade levels, Finds and cleared patches it had, and no cue is emitted.

## Not decided here

Area dimensions, walk speed and clear radius (`gameplay/meta/01` and sheet 01, both merged and
shipped). Patch collision (`art/objects/01`). The verb list, the trigger contract and every input
exclusion (sheet 02). How the player moves between areas at different depths, and whether that
transition is a walk, a load or a teleport (Meta and Content). What the boundary and the ruin's
built geometry are made of (Art and Visuals). The respawn delay's value and the character-loading
path (architecture, `01-runtime`).
