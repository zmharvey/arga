# 03 — Set bonuses

**Domain:** Meta & Content · **Category:** Gameplay · **Wave:** 3

## Decision

**Terrace multiplies `value`. Cistern multiplies `radius`. Vault multiplies `speed`. Spire
multiplies `radius` again.** One axis per set, no magnitudes, and **`radius` is the axis that
repeats because it is the only one with the headroom to be granted twice.**

## Why

- `[brief: soft]` ← `[you accepted: R4 Q4]` (`02-GAMEPLAY.md`): "Completing a set grants a
  permanent bonus, this is what makes the collection progression rather than a checklist."
  The brief says a bonus exists and never says what it is. That silence is the whole of
  this sheet.
- **The shape is not mine and I do not restate it.** `gameplay/systems/06` fixes a bonus as
  `{ sourceClass, sourceId, axis, factor >= 1 }`, multiplicative, on one of exactly three
  axes, and hands the *choice of axis in kind* here. `gameplay/core-loop/02` hands over a
  worth band in base ticks. Both are consumed, neither is re-decided.
- **`value` has a sink for exactly one grant, so it goes first.** `gameplay/systems/04`:
  "at max ladder income continues, buys nothing, converts to nothing." Under sheet `04`'s
  ladder a greedy free buyer maxes every upgrade during area 4 at the shipped `upgrades`
  figures `[research: game/src/shared/GameConfig.luau]`, and Terrace completes at the end of
  area 2 with roughly half the ladder unbought. **A `value` factor granted at any later set
  multiplies a number nothing can be done with.** `[cid: decided]`
- **Which axis may repeat is decided by a ceiling, not by taste.** `systems/06` clamps
  `speed` against the server tick rate at `movement.baseClearRadius / runtime.clearTickRate`
  = 45.83, against a ladder maximum of 25.6, leaving **1.61x of total headroom on `speed`**;
  `radius` has 3.78x, of which offer-ladder work has stated it will consume 1.75 and leave
  **2.16x**; `value` has no ceiling. Three speed-targeting sets fit under 1.61x and four do
  not, so a fourth would be silently absorbed and a player would complete a set and feel
  nothing. **One `speed` set is what this sheet spends, and the repeat goes to `radius`
  where two factors have room.** `[cid: decided]`, arithmetic supplied by offer-ladder work.
- **`speed` still has to appear once, and Vault is where it is worth most.** `core-loop/05`:
  "`speed` is already maxed at depth-4 arrival, so one of the three axes dies before the
  last depth opens." A `speed` factor is the only thing that can move that axis after its
  `maxLevel`, and Vault completes at the end of area 6, after the ladder is spent.
- **Spire takes `radius` because the last event in the game should be visible.**
  `gameplay/mechanics/04` welds a tool whose head width is driven by the Reach axis alone,
  so a `radius` grant is the one bonus a player *sees* on their own body rather than infers
  from a rate. Spire's grant is the last permanent change the game ever makes.
- **The fiction may not explain any of this** via `theme/setting/03-physical-law` R6: a bonus
  may be a permanent multiplier, and the fiction may not say the objects, the place or any
  party do anything. `theme/identity/04` adds that no being may be at the bottom of it. The
  key carries `explainedInFiction: false` and this domain writes no flavour line for a grant.
- **No magnitudes appear here.** `core-loop/02` prices a grant at between `area.patchCount`
  and `ladderTotal / perTick / 4` base ticks, and Balance and Tuning sets every factor inside
  that band. Naming one here would be the second opinion the band exists to prevent.

```manifest
{
  "provides": "setBonus",
  "value": {
    "sourceClass": "setCompletion",
    "explainedInFiction": false,
    "grantedAt": "the clear of the last patch of the last area at that set's depth",
    "axisMayRepeat": true,
    "rows": [
      { "setId": "terrace", "depth": 1, "axis": "value" },
      { "setId": "cistern", "depth": 2, "axis": "radius" },
      { "setId": "vault",   "depth": 3, "axis": "speed" },
      { "setId": "spire",   "depth": 4, "axis": "radius" }
    ],
    "invariants": [
      "every rows[].setId is a collection.sets[].id",
      "every collection.sets[].id appears in exactly one row",
      "every rows[].axis is an upgrades[].id",
      "no rows[] entry carries a factor, a magnitude, a percentage or a duration",
      "the product of all factors granted on one axis must stay under that axis's systems/06 ceiling with every product applied"
    ]
  }
}
```

## Consequences for other work

- **The schema maintainer can collapse this key into `collection` with one field, and here
  it is exactly.** Add `bonus` to `collection.sets[]` as
  `{ "axis": "value"|"radius"|"speed" }`, required, checked inside the `c.sets` walk
  `SCHEMA.collection.check` already runs `[research: bridge/schema.mjs]`: every
  `sets[].bonus.axis` must equal some `upgrades[].id`. One field in the shape, one line in
  the check. **I may not make that edit**: `collection` is supplied by `02-the-collection.md`
  and the merger permits one sheet per key, so a wave-3 sheet carrying
  `provides: collection` is rejected after being written. Until the maintainer acts,
  `setBonus` is the carrier and `02` is untouched.
- **Balance and Tuning** has four named targets and one hard join: the two `radius` factors
  multiply each other, and their product must stay inside the 2.16x that offer-ladder work
  has left. **`speed` carries one factor against 1.61x of headroom and is the axis most
  likely to be priced into its own clamp**; `value` has no ceiling and is the only factor
  that may be sized purely on `core-loop/02`'s band.
- **Offer-ladder work is unblocked with the distribution it asked for.** `speed` carries one
  set factor, so the 1.61x it declined to sell into is not further consumed by me. `radius`
  carries two, so the 2.16x it reserved is fully spoken for and a second radius product would
  now breach the ceiling rather than share it.
- **Modifier-resolution work** (`systems/06`'s resolver) reads this key at grant time and
  never re-derives it. A set complete on load must reapply its factor before the first clear
  of the session, or a rejoining player is quietly weaker than they went to bed.
- **Feedback and audio work** gets four grants that differ in *axis* and not in *kind*. One
  set-completion cue serves all four (`theme/tone/03` `B2`, unreopened); nothing may signal
  which axis was granted by making the cue louder, longer or different.
- **UI/UX** has no bonus screen to build on my authority. No bonus list, no bonus tooltip,
  no per-set reward preview: a player learns what a set grants by having completed it.

## Acceptance criteria

1. `setBonus.rows` has exactly 4 entries; the multiset of `setId` values equals the multiset
   of `collection.sets[].id`, and every `axis` string is present in `upgrades[].id`.
2. No `rows[]` entry holds a numeric field other than `depth`.
3. The set at depth 1 carries `value`, and no set at depth 3 or depth 4 carries `value`.
4. All three of `value`, `radius` and `speed` appear at least once, and `speed` appears at
   most once.

## Not decided here

Every factor and every magnitude, inside `core-loop/02`'s band and under `systems/06`'s
ceilings (Balance and Tuning). How factors compose and where they clamp
(`gameplay/systems/06`, which holds `modifiers`). Which products exist and what they cost
(offer-ladder work, which supplied the headroom figures above and sets none of mine). When
a set completes in the run of areas (sheet `04`, this domain, which holds `depths`). What a
set completion sounds, looks or reads like (Audio, Art, UI/UX). Whether `setBonus` is
promoted or collapsed into `collection.sets[].bonus` (the schema maintainer, from the
revision spelled out above). Any player-facing string about a bonus: there is none, and
Vocabulary is owed no word by this sheet.
