# 02 — Patch payout and the depth mix

**Domain:** Balance & Tuning · **Category:** Gameplay · **Wave:** 4

## Decision

**`tiers[].value` does not move: 1 / 3 / 8 / 20 stays.** What a patch pays by depth moves
instead, as **four weight vectors, one per depth**, proposed as the key `tierMix` and read by
`layout`'s anchor generation at `tierMix.byDepth[depths.areas[k].depth]`. Expected value per
patch rises 5.16 → 5.85 → 6.66 → 7.45, and the depth-1 vector is raised from the shipped
52/28/14/6 so that a level-0 full clear of area 1 yields **722**, inside `meta/01` criterion 3's
700-to-1,200 band. **That criterion needs no revision.**

## Why

- **Moving `value` would break a join worth keeping.** `core-loop/02`'s payoff ladder is
  `1 / 3 / 8 / 20 / 50` and its first four rungs *are* `tiers[].value` verbatim. Re-pricing the
  tiers turns a stated identity into a coincidence and buys nothing the weights cannot buy.
  `[cid: decided]` — the brief is silent on both.
- **"Deeper areas … hide rarer sets" `[brief: binding]` ← `[you chose: R3 Q2]` (`03-META.md`)
  had no numeric carrier at all.** `systems/03` states flatly that per-depth rarity needs a
  weight dimension `tiers` does not have, and hands Balance "a channel with no values in it".
  This key is that dimension.
- **The rank ordering is preserved at every depth, and that is what caps the escalation.**
  `tiers` criterion 3 requires that, sorted by descending weight, each tier's `value` exceeds
  the last. Holding Moss > Fern > Bramble > Heartvine at all four depths caps expected value at
  **7.57**, reached only at 27/26/24/23. With depth 1 pinned at 5.16 by `meta/01`'s 700 floor,
  **the most escalation available is ×1.47, and I take ×1.44.** Stated because a later sheet
  asking for "twice the payout at depth 4" is asking for a rank inversion, not a bigger number.
- **The depth-1 lift is the cheapest way to make an approved criterion true.** At the shipped
  52/28/14/6 the expected value is 3.68 and a level-0 clear yields 515 against a stated band of
  700–1,200 — recorded by wave-3 verification and never acted on. 38/30/21/11 yields 722. Moss
  stays the most common patch at every depth; Heartvine stays the rarest at every depth.
- **The free parameter is bounded on both sides by feasibility, not by taste.** Four strictly
  descending integers summing to 100 satisfy `4·w₄ + 6 ≤ 100`, so `w₄ ≤ 23` — at 24 and 25 no
  legal vector exists at all (24+25+26+27 = 102). Below 19 the depth-4 expected value cannot
  exceed depth 3's 6.66. `[playtest unknown]`, test range **19 to 23** (22 shipped).
- **No new player-facing string.** Tier names, the currency name and the three upgrade labels
  are untouched, so nothing here reaches `vocabulary`'s ban list, casing rule or 14-character
  limit `[research: cid/theme/vocabulary/02-banned-words.md]`.

**Precedence, in one line:** `tierMix.byDepth[d]` is the sole authority for any area whose
`depths.areas[].depth` is `d`; `tiers[].weight` is the depth-1 fallback for a call site holding
no depth, and must equal `byDepth["1"]` exactly.

**Who reads it.** The per-depth weights are consumed at the one site that assigns a patch's
`tierIndex` — `layout`'s anchor generation, which already holds the area ordinal and can
therefore reach `depths.areas[ordinal].depth`. The emitted helper `GameConfig.tierByWeight(roll)`
sums `GameConfig.Tiers[].weight` globally `[research: bridge/emit-config.mjs]` and must take a
depth argument. Both are revision requests below; **without them this key has no reader and
`tiers[].weight` stays the only live vector.**

```manifest
{
  "provides": "tierMix",
  "status": "proposed",
  "value": {
    "tierOrder": ["Moss", "Fern", "Bramble", "Heartvine"],
    "tierValuesUnchanged": [1, 3, 8, 20],
    "precedence": "tierMix.byDepth[d] is the sole authority for any area whose depths.areas[].depth is d. tiers[].weight is the depth-1 fallback for a call site with no depth in hand and must equal byDepth['1'] exactly.",
    "consumedBy": {
      "site": "layout's anchor generation, at the moment a patch anchor is assigned a tierIndex",
      "lookup": "tierMix.byDepth[String(depths.areas[ordinal].depth)].weights",
      "emittedHelper": "GameConfig.tierByWeight(roll) must become tierByWeight(roll, depth); it currently sums GameConfig.Tiers[].weight with no depth in scope",
      "requiredRevisions": ["layout gains tierWeightSource", "bridge/emit-config.mjs tierByWeight gains a depth parameter"]
    },
    "collapseIfPreferred": "add tiers[].weightByDepth as a 4-element array per row, indexed by depth, and delete this key. Same numbers, one fewer key, and the consumer problem is unchanged.",
    "weightStatus": "playtest unknown",
    "freeParameter": { "field": "byDepth['4'].weights[3]", "shipped": 22, "testRange": [19, 23], "boundReason": "above 23 no strictly-descending integer vector sums to 100 (4*w4 + 6 <= 100); below 19 depth 4's expected value does not exceed depth 3's 6.66" },
    "maxExpectedValueUnderRankOrdering": { "value": 7.57, "vector": [27, 26, 24, 23], "escalationCeiling": 1.467 },
    "byDepth": {
      "1": { "weights": [38, 30, 21, 11], "expectedValuePerPatch": 5.16 },
      "2": { "weights": [34, 29, 23, 14], "expectedValuePerPatch": 5.85 },
      "3": { "weights": [30, 28, 24, 18], "expectedValuePerPatch": 6.66 },
      "4": { "weights": [27, 26, 25, 22], "expectedValuePerPatch": 7.45 }
    },
    "expectedValueFormula": "sum(weights[i] * tiers[i].value) / 100; economy.payoutFloor is 1 and never binds because tiers[0].value is 1",
    "incomePerAreaAtLevelZero": [
      { "ordinal": 1, "depth": 1, "patchCount": 140,  "currency": 722 },
      { "ordinal": 2, "depth": 1, "patchCount": 175,  "currency": 903 },
      { "ordinal": 3, "depth": 2, "patchCount": 259,  "currency": 1515 },
      { "ordinal": 4, "depth": 2, "patchCount": 370,  "currency": 2165 },
      { "ordinal": 5, "depth": 3, "patchCount": 585,  "currency": 3896 },
      { "ordinal": 6, "depth": 3, "patchCount": 702,  "currency": 4675 },
      { "ordinal": 7, "depth": 4, "patchCount": 1000, "currency": 7450 },
      { "ordinal": 8, "depth": 4, "patchCount": 1120, "currency": 8344 }
    ],
    "incomeNote": "patchCount is sheet 03's revised depths row set, not the merged one. At level 0 with no set bonus, which is a measurement condition and not a play state past area 1.",
    "invariants": [
      "every byDepth[d].weights sums to exactly 100",
      "every byDepth[d].weights is strictly descending, so rarer tiers pay more at every depth",
      "byDepth[d].expectedValuePerPatch is strictly increasing in d",
      "byDepth['1'].weights equals tiers[].weight elementwise",
      "byDepth[d].weights has exactly one entry per tiers[] row, in tiers[] declaration order",
      "depths.areas[0].patchCount * byDepth['1'].expectedValuePerPatch is between 700 and 1200"
    ]
  }
}
```

## Revision requests

| key / file | field | current | requested | why |
|---|---|---|---|---|
| `tiers` (`systems/01`) | `tiers[0..3].weight` | 52 / 28 / 14 / 6 | **38 / 30 / 21 / 11** | the depth-1 fallback must equal `tierMix.byDepth["1"]`; at 52/28/14/6 a level-0 clear of area 1 yields 515 against `meta/01` criterion 3's 700 floor |
| `layout` (`meta/05`) | new field `tierWeightSource` | absent | `"tierMix.byDepth[String(depths.areas[ordinal].depth)].weights"`, and the anchor-generation description states the tier draw reads it | `meta/05`'s `## Not decided here` routes tier weights back to `systems/01`, which has no depth dimension. After `tierMix` nothing states the join |
| `bridge/emit-config.mjs` | `GameConfig.tierByWeight(roll)` | sums `GameConfig.Tiers[].weight` | `tierByWeight(roll, depth)`, summing the emitted per-depth vector | the only emitted draw helper has no depth in scope, so the per-depth vectors cannot reach a patch without it |

`value`, `name`, `shape`, `rgb` and `height` are untouched on all four `tiers` rows. All four
`tiers` acceptance criteria still pass at the requested weights.

## Consequences for other work

- **Area authoring by depth (owner of `depths`)** gets a per-depth income figure to size
  against, and inherits the ceiling above: expected value per patch cannot exceed 7.57 at any
  depth without inverting the tier rank. If a deeper area must be worth more than 1.44× a
  depth-1 one, the lever is `patchCount`, not the mix.
- **Area-layout work (`layout`)** gains one field and one behaviour: the tier draw becomes
  depth-aware. This is the single change that makes the key readable, and it is small — the
  routine already resolves an area ordinal to place its Find slice.
- **Overgrowth-tier work (`tiers`)** keeps every value, name, silhouette and colour, and gives
  up only the single global weight vector, which becomes the depth-1 row.
- **Find-placement work (`discovery`)** is untouched: `systems/03` forbids Find placement
  reading a patch's tier, and nothing here gives it one to read.
- **Clear-cue work (Audio — SFX)** inherits a changed *mix*, not a changed set. Four notes, one
  per tier; the rarest fires 11% of the time at depth 1 and 22% at depth 4, so the Heartvine
  note is heard twice as often deep as shallow and must not be written as a once-a-session
  event.
- **Economy work (`economy`)** is untouched: the faucet formula, the floor of 1 and the
  single-multiplier-application rule all hold.

## Acceptance criteria

1. Each of the four `byDepth[d].weights` arrays sums to exactly 100 and is strictly
   descending.
2. `byDepth[d].expectedValuePerPatch` equals `sum(weights[i] × tiers[i].value) / 100` for each
   depth, and the four values are strictly increasing in `d`.
3. `byDepth["1"].weights` equals `tiers[].weight` elementwise after the revision above, and
   `depths.areas[0].patchCount × byDepth["1"].expectedValuePerPatch` is between 700 and 1,200
   (722), so `meta/01` acceptance criterion 3 passes as written.
4. Exactly one code path assigns `tierIndex`, and it takes a depth argument: the emitted
   `tierByWeight` signature has two parameters and no call site passes only one.

## Not decided here

What one patch costs to clear in time, and every footprint and patch count the income table
multiplies against (sheet `03`, this domain). Every multiplier that is not an upgrade level
(sheet `04`). Wall-clock anything (sheet `05`). The tier names, silhouettes, colours and heights
(`gameplay/systems/01`). Which patch buries a Find (`gameplay/meta/05`, `gameplay/systems/05`).
What the four clear notes sound like (Audio — SFX, wave 6).
