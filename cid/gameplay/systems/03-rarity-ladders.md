# 03 — Rarity ladders

**Domain:** gameplay/systems · **Category:** Gameplay · **Wave:** 2

## Decision

**One graded rarity ladder exists in this game. It is the overgrowth's, it is read from
`patch.tierIndex`, and nothing else is graded.** A Find carries no rarity field of its own:
its set is a *position* — which depth it was buried at — not a grade, and it is never drawn,
lit, framed or sounded as one. **Find placement may not read a patch's tier.**

## Why

- `01-FOUNDATION.md`: "**Rarity ladder lives in the overgrowth**, not in a separate drop
  table." `[brief: soft]` ← `[I assumed]`, and `OPEN.md §5 #1` names Systems as inheritor. It
  is the weakest line binding this domain, so I did not keep it on its own authority — I kept
  it because the firmer line agrees. `02-GAMEPLAY.md` on the roster: "**Each set tied to area
  depth** — rarity and location are one axis, so there is one concept to learn rather than
  two." `[brief: soft]` ← `[you accepted: R4 Q4]`. Two ladders is the reading that contradicts
  the brief; one is the reading that satisfies both lines at once.
- **The accessibility constraint prices the alternative, and this is the cost my lead asked me
  to state rather than let Art discover.** `04-PRESENTATION.md` makes shape-not-hue a
  requirement because "tier is a core economic signal"; `HANDOFF.md` repeats it as one of six
  pre-design facts. `[brief: soft]` ← `[you accepted: R6 Q4]`. Four foliage silhouettes in a
  green frame on a phone is already the hard case. A second graded ladder would put a second
  silhouette system on 24 hand-authored objects, readable at the same instant, in the same
  frame, under the same rule — and the reveal is the loudest moment in the game, so it would
  be read under motion. That is affordable in a game whose primary creative work is content
  (`00-CORE.md`), and it is not affordable *twice*. Art draws four silhouettes and no more.
- **The shipped build already answers this way and I ratify it.** `Layout.luau:130-153` places
  the whole of set one with no reference to `tierIndex`; every patch is an equally likely
  host. `[research: game/src/shared/Layout.luau]`
- **Weighted placement would also break a `[brief: soft]` guarantee.** `onboarding` fixes the
  first Find under the patch nearest spawn, deterministically. If rarity biased placement, that
  patch would additionally need a tier the shuffle cannot promise, and the guarantee would
  depend on two rolls instead of none.
- **Where depth's "rarer" goes instead.** `03-META.md` says deeper areas "hide rarer sets"
  `[brief: soft]`. Under one ladder that promise is kept on the overgrowth: the tier mix shifts
  toward the rare end with depth, so a deeper area *is* rarer material and the Finds in it are
  simply later. `[cid: decided]` — the brief never says which channel carries it. The blocker
  is named in the manifest: `tiers` is a flat array with no depth dimension, and adding one is
  a revision to `01-overgrowth-tiers`, which I may not edit.

```manifest
{
  "provides": "rarity",
  "status": "proposed",
  "value": {
    "gradedLadderCount": 1,
    "ladders": [
      {
        "id": "overgrowth-tier",
        "kind": "graded",
        "sourceField": "patch.tierIndex",
        "definedBy": "tiers",
        "rungs": 4,
        "rolled": true,
        "rolledFrom": "tiers[].weight",
        "perObjectVisualGrade": true,
        "legibilityChannel": "silhouette first, colour second",
        "affects": ["the per-clear payout, via economy.faucets[patch-clear]"]
      },
      {
        "id": "find-set",
        "kind": "ordinal",
        "sourceField": "collection.sets[].index",
        "definedBy": "collection",
        "rungs": 4,
        "rolled": false,
        "perObjectVisualGrade": false,
        "legibilityChannel": "the set heading on the collection surface, and nothing on the object",
        "affects": []
      }
    ],
    "findRarityField": null,
    "findPlacementReadsTier": false,
    "findPlacementWeighting": "uniform over the area's patches",
    "depthRarityChannel": "tiers[].weight, shifted toward the rare end per depth",
    "depthRarityBlocker": "tiers has no depth dimension; adding one is a revision to 01-overgrowth-tiers, not a change made here",
    "forbidden": [
      "a rarity, grade, tier, star, quality or condition field on a Find",
      "a rarity colour, frame, glow, border, sparkle or badge on a collection slot",
      "a rarer patch hiding a Find more often than a common patch does",
      "a rarer patch hiding a rarer Find",
      "a fifth overgrowth tier added to signal depth",
      "a per-depth recolour of the four tiers that changes their silhouettes",
      "a reveal cue that varies by which set the Find belongs to",
      "any rarity read a player must learn in addition to the four silhouettes"
    ]
  }
}
```

## Consequences for other work

- **Rarity-legibility work (currently Art & Visuals) draws one ladder, four rungs.** It is not
  being asked to make two systems readable at once, and it may not invent a per-Find grade to
  fill the space. The 24 objects differ by *what they are*, never by rank.
- **Reveal-cue work (Audio — Stingers; Art — VFX) gets one cue, not four.** A Find reveal
  sounds and looks the same at depth 1 and depth 4. The tier note the brief's audio default
  assigns per rarity belongs to the clear, not the reveal.
- **Content-structure work inherits a live blocker:** if depth is to read as rarer, `tiers`
  needs a per-depth weight dimension. That is a change to sheet `01`'s key and it needs the
  key owner, not a downstream reader assuming a second field exists.
- **Balance & Tuning** gets a channel with no values in it: the per-depth tier mix. I set none.
- **Offer-ladder work** may not sell a "find better Finds" multiplier: there is no per-Find
  rank for a multiplier to move. Sheet `05` closes the rate half of the same question.

## Pushing back

`03-META.md`'s "deeper areas are larger, denser, and **hide rarer sets**" `[brief: soft]` reads
as though a Find has a rarity. I am overruling that reading, not the sentence: depth still
delivers rarer *material*, and a set is still met later than the one above it, but no object in
the collection outranks another. The alternative keeps a word and costs a second accessibility
system, which the brief prices as a requirement rather than a nicety.

## Acceptance criteria

1. `rarity.findRarityField` is `null`, and no manifest key, emitted config field or module
   carries a rarity, grade, tier, star or quality value attached to a Find.
2. Place 10,000 Finds through the layout routine and bucket the host patches by `tierIndex`:
   the resulting distribution matches `tiers[].weight` with no significant difference, because
   placement is uniform and blind to tier.
3. In a greyscale screenshot of an area, the four overgrowth silhouettes remain distinguishable
   and no revealed Find carries a rank marking of any kind.
4. Exactly one entry in `rarity.ladders` has `perObjectVisualGrade: true`.

## Not decided here

The tier names, shapes, colours, heights, weights and payouts (`01-overgrowth-tiers`, same
domain, already supplied as `tiers`). What pool a Find is drawn from and what a repeat does
(`05-the-find-ledger`, same domain). Which patch hides which Find within an area, and the
per-depth discovery rates (content-structure work, currently Meta & Content; then Balance &
Tuning for the figures). What any tier or any Find actually looks like (Art & Visuals). The
per-depth weight values, once `tiers` can hold them (Balance & Tuning).
