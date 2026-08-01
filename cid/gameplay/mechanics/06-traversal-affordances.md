# 06 — Traversal affordances

**Domain:** Mechanics · **Category:** Gameplay · **Wave:** 2

## Decision

**Jump exists at the platform default and changes no game state. The world cannot kill, drop or
damage the player. An area's edge is a barrier that stops the body and not the eye: solid to walk
into, and non-opaque, so it never breaks the co-presence sightline.** Player-to-player collision is
off, and the value that says so lives in `social.characterCollision`, not here.

## Why

**G6, jumping.** It exists. `[cid: decided]` The brief's "movement only" governs game verbs, and a
jump moves the body without touching a single game value. Removing it means actively deleting a
control every device already draws, including the mobile jump button, which reads as broken rather
than as minimal, and it is the first thing an 8-14 player tries `[brief: binding]` ← `[you chose:
R1 Q4]`, `00-CORE.md`. The price of keeping it is one rule: **nothing may ever be gated behind a
jump.** No patch, no Find and no route may require leaving the ground, so a player who never jumps
is never behind.

The engine defaults are `JumpHeight = 7.2` with `UseJumpPower = false`, carried unchanged so a
player's jump feels like every other Roblox game's. The literal is in the manifest so a builder does
not invent one, and it is the platform default that is binding rather than the number.
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

**The edge is a barrier, not a drop, and the barrier is not opaque.** `[cid: decided]` A drop implies
a fall, a fall implies either death or a recovery, and both are tension the brief forbids three
times. A wall implies neither. But `gameplay/social/02-presence-sufficiency` requires that "the
sightline between two spawn points must be unobstructed: no opaque wall, hedge, terrain rise or fog
density may sit between neighbouring plots", and a plot-edge barrier is exactly what sits there.
**Co-presence wins, because it is the only social system the game has and a solid-looking boundary
is worth nothing to the player.** So the barrier stops the body and not the eye. The ruin's walled
architecture, which is `theme/setting/01`'s terraced hillside, may still be built anywhere inside a
plot that does not cross the inter-plot sightline.

**G9, can one body block another.** No. `[cid: decided]` The binding social rule is "shared server,
parallel progression, own areas, no interaction. Interaction: none mechanical" `[brief: soft]` ←
`[you accepted: R6 Q2]`, `02-GAMEPLAY.md`, stated twice. A body that blocks another body is a
mechanical interaction, and it is the only one the game affords: blocking a route or parking on a
Find mid-dwell are each achievable by a stranger who cannot do anything else. Player characters
collide by default on Roblox, since "All BaseParts automatically belong to this default group unless
assigned to another group" `[research: https://create.roblox.com/docs/workspace/collisions]`, so
this requires an explicit collision group and will not happen by omission.

**The value lives in one key and it is not mine.** `gameplay/social/01-server-and-co-presence`
supplies `social.characterCollision` with the group name `Characters` and a full collidability
matrix. My first draft carried the same decision in `traversal.collision` under the group name
`Players`, which is one decision in two keys with two names. **`social` owns it.** The ruling above
stays here because G9 was routed to this sheet; the data does not.

**The boundary with sheet 02:** exclusions of *inputs* are 02's, exclusions of *world affordances*
are mine. Sheet 02 rules that there is no climb verb; this sheet rules that there is no climbable
surface to have needed one.

## What the body may do, and where

| property | value | note |
|---|---|---|
| jump | exists, platform default | `JumpHeight = 7.2`, `UseJumpPower = false` |
| jump gates | zero | no patch, Find or route requires it |
| jump upgrades | zero | no axis touches jump; the speed axis is walk speed only |
| fall damage | none | at any height |
| damage sources in the world | zero | no killbrick, no hazard, no trap, no drowning, no burning |
| void below the play area | none | the ground is continuous under every walkable surface |
| `Humanoid.Health` writes by game code | zero | health is never read or written |
| death by design | impossible | the respawn path exists only as fault recovery |
| respawn location | the area's spawn point | the delay's value is owned by runtime work, `architect/01-runtime`, not set here |
| loss on respawn | none | no currency, no upgrade level, no Find, no cleared patch |
| death cue | none authored | no screen, no sound, no colour flash, no message |
| area boundary | a collision barrier | 12 studs of walkable margin past the patch field on every side, then a barrier 20 studs tall |
| barrier opacity | **not opaque** | it may not obstruct the sightline `gameplay/social/02` requires between neighbouring spawn points |
| barrier behaviour | stops the character | not passable, not climbable, not jumpable; no teleport-back, no warning, no cue, no damage |
| maximum step height on any route | 2 studs | on every route between the spawn point and every patch |
| maximum slope where a patch may stand | 30 degrees | so no patch is unreachable by walking |
| climbable surfaces, ladders, trusses | zero | |
| seats, vehicles, mounts, ziplines | zero | |
| water, swimming, mud, slow ground | zero | no surface changes the player's speed |
| teleports inside an area | zero | every point is reached by walking |
| player-to-world collision | on | unchanged from the engine default |
| player-to-player collision | off, **owned by `social.characterCollision`** | this sheet states the ruling and carries no value for it |
| lockouts, hazards, fall penalties, timers | zero | zero tension is confirmed and instructed |

```manifest
{
  "provides": "traversal",
  "value": {
    "jump": { "exists": true, "jumpHeight": 7.2, "useJumpPower": false, "changesGameState": false, "upgradable": false, "gatedContent": 0 },
    "fall": { "damage": false, "voidBelowPlayArea": false, "maxSurvivableFallStuds": null },
    "death": { "possibleByDesign": false, "damageSources": 0, "healthWrittenByGameCode": false, "respawnAt": "areaSpawn", "lossOnRespawn": "none", "authoredCue": "none", "respawnDelayOwner": "architect/01-runtime" },
    "boundary": { "kind": "collisionBarrier", "walkableMarginStuds": 12, "heightStuds": 20, "passable": false, "climbable": false, "jumpable": false, "opaque": false, "sightlineObstruction": "none", "cue": "none", "teleportBack": false },
    "surface": { "maxStepStuds": 2, "maxSlopeDegreesWherePatchesStand": 30, "climbSurfaces": 0, "ladders": 0, "seats": 0, "vehicles": 0, "water": 0, "speedModifyingSurfaces": 0, "teleportsWithinArea": 0 },
    "collision": { "playerVsWorld": true, "playerVsPlayerOwner": "social.characterCollision" },
    "hazards": 0,
    "fallPenalties": 0,
    "lockouts": 0
  }
}
```

## Consequences for other work

- **Presence-sufficiency work (`gameplay/social/02`):** the boundary is non-opaque, so criterion 3's
  requirement that the line between two spawn points intersects zero instances with
  `Transparency < 1` survives my barrier. Presence stays carried entirely by sight and sound, and a
  stranger still cannot be bumped, blocked, pushed or stood on.
- **Server-and-co-presence work (`gameplay/social/01`):** `social.characterCollision` is the sole
  owner of player-to-player collision, under the group name `Characters`. Nothing in `traversal`
  competes with it.
- **Area-arrangement and plot-layout work:** the 12-stud walkable margin makes a plot's footprint
  `area.size + 24` per side, which is **144 studs at the depth-1 area's 120**. `social/02` now
  derives its separation ceiling at the phone viewport the audience actually uses and states
  **S ≈ 128 studs** `[playtest unknown]`, test range 85 to 185. My margin therefore exceeds S
  **at depth 1**, before any gutter between plots, so **plot pitch has to decouple from area size
  immediately, not by depth 4.** It gets worse with depth: at `gameplay/core-loop/05`'s 236-stud
  depth-4 area the footprint is 260 studs against the same 128. I am propagating `social/02`'s
  number, not re-deciding it, and the margin is the only term in this that is mine: if the
  arrangement cannot be made to work, 12 studs is what I can give back.
- **Environment and set-dressing work (Art and Visuals):** the barrier is a bound, not an object. It
  must be at least 20 studs tall, may not read as a thing to climb, and may not be opaque along the
  inter-plot axis. Walls, terraces and built geometry are yours anywhere that does not cross that
  sightline.
- **Architecture and runtime work:** `Players.CharacterAutoLoads` and `RespawnDelaySeconds` stay
  yours. This sheet requires only that a lost character is playing again at the area spawn with zero
  loss; whether the respawn stays hand-rolled is your call.

## Acceptance criteria

1. `Humanoid.Health` is written by zero lines of game code, the place contains zero damage sources,
   and a character walking or jumping anywhere in the area for ten minutes never dies.
2. The straight line between any two occupied spawn points intersects zero boundary instances with
   `Transparency < 1`, and the barrier still stops a character walking or jumping into it.
3. Every patch and every Find in the area is reachable from the spawn point without leaving the
   ground, and the barrier cannot be crossed by walking, jumping, or both.
4. A character forced into death by a debug command is playable again at the area spawn with the
   same currency, upgrade levels, Finds and cleared patches it had, and no cue is emitted.

## Not decided here

Area dimensions, walk speed and clear radius (`gameplay/meta/01` and sheet 01, both merged and
shipped). Patch collision (`art/objects/01`). Player-to-player collision as a value, its group name
and its collidability matrix (`gameplay/social/01`, which holds `social`). The separation ceiling S
and every figure inside its range (`gameplay/social/02`; I cite it and set none of it). The verb
list and every input exclusion (sheet 02). Plot pitch and area arrangement (area-arrangement work).
How the player moves between areas at different depths (Meta and Content). What the boundary and the
ruin's built geometry are made of (Art and Visuals). The respawn delay's value (architecture,
`01-runtime`).
