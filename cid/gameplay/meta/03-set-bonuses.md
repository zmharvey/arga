# 03 — Set bonuses

**Domain:** Meta & Content · **Category:** Gameplay · **Wave:** 3

## Decision

**Terrace multiplies `value`. Cistern multiplies `radius`. Vault multiplies `speed`. Spire
multiplies `radius` again.** One axis per set, **each carrying a starting factor of 1.20**
`[playtest unknown]` (test range 1.10 to 1.35, Balance and Tuning's to settle), and **`radius`
is the axis that repeats because it is the only one with the headroom to be granted twice.**

## Why

- `[brief: soft]` ← `[you accepted: R4 Q4]` (`02-GAMEPLAY.md`): "Completing a set grants a
  permanent bonus, this is what makes the collection progression rather than a checklist."
  The brief says a bonus exists and never says what it is. That silence is the whole of
  this sheet.
- **The shape is not mine and I do not restate it.** `gameplay/systems/06` fixes a bonus as
  `{ sourceClass, sourceId, axis, factor >= 1 }`, multiplicative, on one of exactly three
  axes, and hands the *choice of axis in kind* here. `gameplay/core-loop/02` hands over a
  worth band in base ticks. Both are consumed, neither is re-decided.
- **This sheet's first version carried no factor, and that was wrong.** `modifiers` resolves
  an absent factor as **1.0** and warns at boot, so a player would complete a set and nothing
  would happen, while `economy.zeroCreditEvents[set-complete].paysInstead` promises "exactly
  one modifier". **A factor is the shape of this key, not a tuning coefficient**, and my own
  domain rule says a value that *is* the shape of a key I own belongs in the manifest with a
  test range, exactly as `tiers[].value` does. **1.20 is a starting value, not a ruling**: the
  range below is Balance's to close and the *ordering* of the axes is what this sheet decides.
  `[cid: decided]`
- **1.20 is the largest round factor that survives the tightest join.** `radius` carries two
  set factors and an offer-ladder pass; at the pass's shipped 1.75, `systems/06` leaves
  **2.158x** for the two of them (`0.9 × 60 / 14.3 / 1.75`), and `1.20² = 1.44` fits with
  room. The top of my range, `1.35² = 1.82`, still fits. `speed` carries one factor against
  **1.611x** (`0.9 × 45.83 / 25.6`), so 1.35 fits there too. `value` has no ceiling.
- **`value` has a sink for exactly one grant, so it goes first.** `gameplay/systems/04`:
  "at max ladder income continues, buys nothing, converts to nothing." Under sheet `04`'s
  ladder a greedy free buyer maxes every upgrade during area 4 at the shipped `upgrades`
  figures `[research: game/src/shared/GameConfig.luau]`, and Terrace completes at the end of
  area 2 with **78% of the ladder unbought** (2,607 spent of 11,644). **A `value` factor
  granted at any later set multiplies a number nothing can be done with.** `[cid: decided]`
- **Which axis may repeat is decided by a ceiling, not by taste.** Three speed-targeting sets
  fit under 1.611x and four do not (`1.2⁴ = 2.07`), so a fourth would be silently absorbed and
  a player would complete a set and feel nothing. **One `speed` set is what this sheet spends,
  and the repeat goes to `radius` where two factors have room.** Arithmetic supplied by
  offer-ladder work and re-derived above.
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

```manifest
{
  "provides": "setBonus",
  "value": {
    "sourceClass": "setCompletion",
    "explainedInFiction": false,
    "grantedAt": "the reveal of the sixth Find of that set -- response.beats[setComplete].cause, sixthFindOfSetRevealed, and modifiers.sources[set-completion].storage, which derives completion from state.found at every read. This USED to say 'the clear of the last patch of the last area at that set's depth', which was the same instant while areasPerDepth was 1 and stopped being so under ruling R-2: at 3 x 2 the sixth name lands mid-area and the area finishes later. Two of the three keys already agreed on the reveal; this was the odd one out, and left standing it turned a 1.2x value bonus on at the wrong moment and fired its cue at another. Found by the clearing builder, which could not tell which key was authoritative.",
    "axisMayRepeat": true,
    "factorStatus": "playtest unknown",
    "factorTestRange": [1.10, 1.35],
    "rows": [
      { "setId": "terrace", "depth": 1, "axis": "value",  "factor": 1.20 },
      { "setId": "cistern", "depth": 2, "axis": "radius", "factor": 1.20 },
      { "setId": "vault",   "depth": 3, "axis": "speed",  "factor": 1.20 },
      { "setId": "spire",   "depth": 4, "axis": "radius", "factor": 1.20 }
    ],
    "axisHeadroomAbsenceRule": "cid/tech/deploy/02 forbids an explicit null in an emitted config and permits a table to declare a more specific sentinel than \"none\". The value axis declares \"unbounded\" rather than \"none\", because on a headroom field \"none\" would assert that ZERO headroom remains — the opposite of the truth, which is that no ceiling exists on that axis at all. A checker iterating the three axes must test type(v) == \"number\" before comparing, and must treat \"unbounded\" as passing.",
    "axisHeadroom": {
      "radius": { "availableToSetsAtShippedPass": 2.158, "spentAtStartingFactors": 1.44, "derivation": "0.9 * systems06Ceiling(radius) / upgradeLadderMax(radius) / productFactor(radius)" },
      "speed":  { "availableToSets": 1.611, "spentAtStartingFactors": 1.20, "derivation": "0.9 * (movement.baseClearRadius / runtime.clearTickRate) / upgradeLadderMax(speed)" },
      "value":  { "availableToSets": "unbounded", "spentAtStartingFactors": 1.20, "derivation": "no ceiling exists on this axis" }
    },
    "invariants": [
      "every rows[].setId is a collection.sets[].id",
      "every collection.sets[].id appears in exactly one row",
      "every rows[].axis is an upgrades[].id",
      "every rows[].factor is at least 1.0 and inside factorTestRange",
      "for each axis, the product of its set factors times every product factor on that axis is at most 0.9 times that axis's systems/06 ceiling",
      "an axisHeadroom entry whose availableToSets is \"unbounded\" passes the check above trivially and is never compared numerically"
    ]
  }
}
```

## Consequences for other work

- **The schema maintainer can collapse this key into `collection` with one field, and here
  it is exactly.** Add `bonus` to `collection.sets[]` as
  `{ "axis": "value"|"radius"|"speed", "factor": number >= 1 }`, required, checked inside the
  `c.sets` walk `SCHEMA.collection.check` already runs `[research: bridge/schema.mjs]`: every
  `sets[].bonus.axis` must equal some `upgrades[].id`. One field in the shape, one line in the
  check. **I may not make that edit**: `collection` is supplied by `02-the-collection.md` and
  the merger permits one sheet per key, so a wave-3 sheet carrying `provides: collection` is
  rejected after being written.
- **Balance and Tuning owns the four figures and inherits one hard join**: the two `radius`
  factors multiply each other *and* the offer ladder's radius pass, so all three must clear
  `0.9 × ceiling` together. Moving `Span`'s factor moves the room I have, and moving mine
  moves the room it has. **`speed` carries one factor against the thinnest headroom in the
  game and is the axis most likely to be priced into its own clamp.** Its own `axisBudget`
  proposal carries the same `value.availableToSets` field with a **null**; under
  `cid/tech/deploy/02` that becomes `"unbounded"` before `axisBudget` is promoted, or the
  merge rejects it the moment it is.
- **Offer-ladder work is unblocked with the distribution it asked for.** `speed` carries one
  set factor, so the 1.611x it declined to sell into is not further consumed by me. `radius`
  carries two, so at its shipped 1.75 the axis sits at `1.75 × 1.44 = 2.52` of a 3.776 budget
  and a second radius product would breach it.
- **Modifier-resolution work** reads this key at grant time and never re-derives it. A set
  complete on load must reapply its factor before the first clear of the session, or a
  rejoining player is quietly weaker than they went to bed.
- **Feedback and audio work** gets four grants that differ in *axis* and not in *kind*. One
  set-completion cue serves all four (`theme/tone/03` `B2`, unreopened); nothing may signal
  which axis was granted by making the cue louder, longer or different.
- **UI/UX** has no bonus screen to build on my authority. No bonus list, no bonus tooltip,
  no per-set reward preview: a player learns what a set grants by having completed it.

## Flagged to the developer

Two calls this sheet made on the brief's silence, both worth a ruling.

1. **`speed` is granted once and `radius` twice, which spends the last axis that had room.**
   With the offer ladder selling a radius pass, `radius` now carries three multiplicative
   sources and is the most constrained axis in the game, while `speed` is sold by nobody and
   dies at its `maxLevel` before depth 4 opens. The alternative is Spire on `speed` (two speed
   sets, `1.2² = 1.44` against 1.611, which fits but leaves 0.11 of margin and makes the last
   grant invisible). **Recommendation: keep `radius`, and require Balance to hold the two set
   factors and the pass under one budget**, because a visible grant at the end of the game is
   worth more than the margin.
2. **A starting factor of 1.20 is mine and the brief never sized a bonus.** `core-loop/02`
   gives a band in base ticks and Balance closes it. If a set bonus should feel larger than a
   single upgrade level (1.20 on `radius` is roughly two Reach levels), the range's top is
   1.35 and the ceiling arithmetic above is what bounds it.

## Acceptance criteria

1. `setBonus.rows` has exactly 4 entries; the multiset of `setId` values equals the multiset
   of `collection.sets[].id`, and every `axis` string is present in `upgrades[].id`.
2. Every `rows[]` entry carries a `factor` of at least 1.0 and inside `factorTestRange`; the
   product of the two `radius` factors is at most 2.158 and the single `speed` factor is at
   most 1.611.
3. The set at depth 1 carries `value`, and no set at depth 3 or depth 4 carries `value`.
4. All three of `value`, `radius` and `speed` appear at least once, and `speed` appears at
   most once.

## Not decided here

The final value of any factor inside its stated range, and every figure in `core-loop/02`'s
band (Balance and Tuning). How factors compose and where they clamp (`gameplay/systems/06`,
which holds `modifiers`). Which products exist, what they cost and what factor each carries
(offer-ladder work; I consume its radius figure and set none of it). When a set completes in
the run of areas (sheet `04`, this domain). What a set completion sounds, looks or reads like
(Audio, Art, UI/UX). Whether `setBonus` is promoted or collapsed into `collection.sets[].bonus`
(the schema maintainer). Any player-facing string about a bonus: there is none.
