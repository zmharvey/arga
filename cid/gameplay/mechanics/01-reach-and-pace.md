# 01 — Reach and pace, before upgrades

**Domain:** Mechanics · **Category:** Gameplay · **Wave:** 2

## Decision

The player starts with a clearing radius of **5.5 studs** and Roblox's default walk speed
of **16**. Both are the floor the upgrade ladder is measured against.

## Why

- `[brief: binding]` `02-GAMEPLAY.md`: "reach is the primary sensation — a wider tool must
  visibly sweep more per step." So the base radius has to be small enough that the first
  REACH level is felt.
- Default walk speed is kept deliberately: PACE reads as a real change only if the
  starting value is the one every Roblox player already has in their hands.
- `[playtest unknown]` 5.5 studs. Chosen so a patch is cleared by walking near it rather
  than onto it, since the brief specifies contact clearing with "no aiming".

```manifest
{
  "provides": "movement",
  "value": { "baseWalkSpeed": 16, "baseClearRadius": 5.5 }
}
```

## Consequences for other work

- **Meta & Content** must keep patch spacing above this radius, or one step clears three
  patches and REACH stops being an upgrade anyone can feel.
- **Tech** inherits that clearing is a proximity test, which means a server tick rather
  than a touch event.

## Acceptance criteria

1. Base clear radius is smaller than the area's minimum patch spacing.
2. Base walk speed equals the platform default of 16.
3. One REACH level increases the swept area by at least 30%.

## Not decided here

The clearing feedback (Mechanics — feel), the tick rate (Tech — Architecture).
