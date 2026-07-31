# 01 — The upgrade ladder

**Domain:** Balance & Tuning · **Category:** Gameplay · **Wave:** 4

## Decision

Three axes, exactly as the brief settles them: **value per unit, clear radius, move
speed**. Geometric cost growth per axis, with the cheapest axis being the one that
compounds (value) and the most expensive being the one that trivialises traversal (pace).

## Why

- `[brief: binding]` The three axes are settled in `02-GAMEPLAY.md`, and **relic luck was
  offered and declined** — so there is no fourth axis and nobody should add one.
- Growth rates differ per axis on purpose: value compounds with everything else, so it is
  cheapest to start and steepest to finish. Pace has the smallest ceiling because a very
  fast player outruns the clear tick.
- `[playtest unknown]` Every number here. 1.6x is the worked example in the interview
  skill's own text, not a sourced figure — the brief could not source the reference's cost
  curve across three source types.

**Every axis is additive: `effect(level) = base + perLevel × level`.** Stated because it was
not, and a builder handed `perLevel: 1.1` alone could not tell whether maxed Reach is 14.3 or
11.79. Both readings satisfied every acceptance criterion that existed at the time.

Additive rather than compounding because the ladder is short (6 to 10 levels) and the brief
wants *"progress you can see"* rather than a curve that does nothing for four levels and then
runs away. Compounding `speed` at 1.6 would reach a walk speed of 268, which is not a game
about clearing a terrace.

`value` is a multiplier and so starts at `1.0`; the other two start at the same numbers
`movement` publishes, and the schema now fails the merge if those two copies ever disagree.

```manifest
{
  "provides": "upgrades",
  "value": [
    { "id": "value",  "label": "Value", "blurb": "Each patch pays more",             "costBase": 25, "costGrowth": 1.6,  "maxLevel": 10, "perLevel": 0.25, "base": 1,   "mode": "additive" },
    { "id": "radius", "label": "Reach", "blurb": "Clear a wider sweep as you walk",  "costBase": 40, "costGrowth": 1.75, "maxLevel": 8,  "perLevel": 1.1,  "base": 5.5, "mode": "additive" },
    { "id": "speed",  "label": "Pace",  "blurb": "Move faster between patches",      "costBase": 60, "costGrowth": 1.8,  "maxLevel": 6,  "perLevel": 1.6,  "base": 16,  "mode": "additive" }
  ]
}
```

At full ladder: payout ×3.5, reach 14.3 studs, pace 25.6.

## Consequences for other work

- **UI/UX** needs three purchase rows, each showing level, cost, and whether it is
  affordable — and affordability may not be signalled by colour alone.
- **Meta & Content** inherits the constraint that one area must fund visible progress on
  this ladder, or the loop's fourth step is decoration.
- **Audio** gets one purchase confirmation sound, not three.

## Acceptance criteria

1. Every `costGrowth` exceeds 1, so no ladder is flat or inverted.
2. Upgrade ids are unique.
3. Clearing one full area buys at least 5 levels across the three axes.
4. The `value` axis reaches at least level 2 within one area, so later patches
   demonstrably pay more than early ones.

## Not decided here

The purchase UI (UI/UX — Store UI), the confirmation sound (Audio — UI Sound), and how
many areas the full ladder is meant to span (Meta & Content).
