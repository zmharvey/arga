# 02 — The collection

**Domain:** Meta & Content · **Category:** Gameplay · **Wave:** 3

## Decision

**24 finds in 4 sets of 6**, one set per area depth. Six are buried in each area, so
completing an area completes exactly one set.

Set one, the Terrace: Sundial, Ewer, Hinge, Tessera, Stylus, Bellcast.

**The class noun is `Find`, plural `Finds`** — renamed from `relic`, which
`theme/vocabulary/02-banned-words.md` bans.

## Why

- `[brief: soft]` `02-GAMEPLAY.md` settles "~24 objects in 4 sets of 6", each set tied to
  area depth, and a completed set granting a permanent bonus.
- **Six per area is not arbitrary**: it is what makes set completion coincide with area
  completion, so the short-term objective and the lap land together instead of drifting
  apart.
- Names are concrete objects a mason or a clerk would leave behind, not treasure. The
  brief's tone is "reclamation, not a haunted place", and a hoard reads as the wrong genre.
- **This sheet exists because these names were once invented by the builder.** When no
  sheet supplied them, the person writing the game made up six on the spot. That is the
  failure the manifest seam removes.
- **`relic` is banned and this sheet had to rename.** `[cid: decided]` Vocabulary found the
  word occupied inside this game's own genre family — `Scrap Incremental` and
  `Faith Incremental` both ship "Relics", and in both it is a *rolled multiplier item*
  rather than a discovered set collectible. The merge failed until this changed, which is
  the ban list doing its job rather than sitting in prose nobody read.

  **`Find` was chosen because it is the plain noun of the thing the player just did.** Four
  characters, no genre baggage, and it fits the stated register of plain concrete nouns.
  Vocabulary's research confirmed `clearing`, `overgrowth` and `index` were free; `Find` was
  not tested against occupancy and that is a `[unverified]` gap — the settling search is
  Roblox for a game whose signature collectible noun is "Find".

```manifest
{
  "provides": "collection",
  "value": {
    "className": "Find",
    "classPlural": "Finds",
    "relicsPerArea": 6,
    "sets": [
      { "id": "terrace", "label": "Terrace", "depth": 1, "relics": ["Sundial", "Ewer", "Hinge", "Tessera", "Stylus", "Bellcast"] },
      { "id": "cistern", "label": "Cistern", "depth": 2, "relics": ["Sluice", "Weight", "Siphon", "Chain", "Grate", "Cup"] },
      { "id": "vault",   "label": "Vault",   "depth": 3, "relics": ["Seal", "Ledger", "Coffer", "Key", "Tally", "Ring"] },
      { "id": "spire",   "label": "Spire",   "depth": 4, "relics": ["Gnomon", "Lens", "Vane", "Crest", "Orrery", "Finial"] }
    ]
  }
}
```

## Consequences for other work

- **Art — Objects** owes 24 models, and each must read at icon size in a grid.
- **Vocabulary** must not reuse any of these 24 words for anything else in the game.
- **UI/UX — Screens** needs a collection surface showing 24 slots with empties visible,
  which the `modal-grid` pattern already covers.
- **Audio — Stingers** gets one reveal cue, reused 24 times, so it must survive repetition.

## Acceptance criteria

1. 24 finds total across 4 sets.
2. No find name appears in two sets.
3. No player-facing string here matches a word on Vocabulary's ban list.
4. `relicsPerArea` is not fewer than the largest set, or that set can never complete.
5. Every name is one word and reads at 12px in a grid cell.

## Not decided here

The models (Art — Objects), the set-completion bonus (Systems), the reveal cue
(Audio — Stingers).
