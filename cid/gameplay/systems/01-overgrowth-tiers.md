# 01 — Overgrowth tiers

**Domain:** Systems · **Category:** Gameplay · **Wave:** 2

## Decision

Four tiers, each a different **silhouette** first and a different green second. Rarer
tiers pay more, and the payout gap widens faster than the rarity gap so a Heartvine
feels like a find rather than a rounding error.

## Why

- Four tiers is the count `04-PRESENTATION.md` assumes when it says "four rarity tiers
  of foliage in a green environment is exactly the case red-green colour blindness
  breaks". `[brief: soft]`
- **Shape is the primary channel, not colour.** `[brief: binding]` The brief makes this
  a hard accessibility constraint rather than a nicety, because tier is a core economic
  signal and a player who cannot read it cannot see the game working.
- Weights sum to 100 so the distribution is legible without arithmetic.
- `[playtest unknown]` The 1 / 3 / 8 / 20 payout ladder. Starting values. The reference's
  own payout curve could not be sourced across three source types.

```manifest
{
  "provides": "tiers",
  "value": [
    { "name": "Moss",      "shape": "Block",    "rgb": [104, 142, 76], "value": 1,  "weight": 52, "height": 1.6 },
    { "name": "Fern",      "shape": "Cylinder", "rgb": [78, 128, 66],  "value": 3,  "weight": 28, "height": 2.4 },
    { "name": "Bramble",   "shape": "Ball",     "rgb": [58, 104, 58],  "value": 8,  "weight": 14, "height": 2.8 },
    { "name": "Heartvine", "shape": "Wedge",    "rgb": [44, 86, 52],   "value": 20, "weight": 6,  "height": 3.4 }
  ]
}
```

## Consequences for other work

- **Art** inherits four silhouettes it may not collapse into one. A single foliage model
  recoloured four ways breaks the accessibility constraint even if every hue differs.
- **Balance & Tuning** inherits the payout ladder as a starting point and owns whether it
  survives contact with a real area size.
- **Audio** has four distinct clear sounds to place, one per tier, and the brief gives
  each tier "a distinct pitched note".

## Acceptance criteria

1. No two tiers share a `shape`.
2. Tier weights sum to 100.
3. Sorted by descending weight, each tier's `value` is strictly greater than the last.
4. Every tier renders as a distinct silhouette in a greyscale screenshot.

## Not decided here

The clear sound per tier (Audio — SFX), the foliage models (Art — Objects), and whether
these payouts survive tuning (Balance & Tuning).
