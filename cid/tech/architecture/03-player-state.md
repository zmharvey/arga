# 03 — Player state

**Domain:** Architecture · **Category:** Tech & Data · **Wave:** 1

## Decision

**One table per player, `PlayerState`, with seven named fields, each naming the single module
that writes it and whether it survives a rejoin.** Every module reads the whole table and
writes only its own fields.

This sheet exists because the first build trial proved nothing owned it. Two builders working
from the same build order invented two different shapes an hour apart: one wrote
`state.levels`, the other assumed `state.upgrades`, and a third record, the patch, was
invented entirely by whoever needed it first. They would have met only at runtime.

## Why

- **Eleven contract keys and not one of them described a type.** [cid: decided] The contract
  was built by asking "what number did the hand-builder invent", which found every value and
  no structure. A value nobody supplies is caught by the merger at once; a *shape* nobody
  supplies is invisible until two modules disagree about a field name.
- **`writtenBy` is the whole point, not documentation.** With one writer per field, a
  disagreement is a merge error rather than a race. Two modules writing `currency` is exactly
  the "one key, one owner" rule this repo already enforces on sheets, applied to runtime state.
- **`persisted` had to be explicit.** [cid: decided] `runtime.saveIntervalSeconds` is 45, which
  implies something is saved, but nothing said what. A builder guessing conservatively persists
  the patch array, which is 140 instances of transient world state; a builder guessing the
  other way loses the player's collection. Both guesses look correct in a single session.
- **`patches` is not persisted, and that is a design decision rather than an optimisation.**
  [brief: binding] *"Cleared is permanent"* (`01-FOUNDATION.md`, `[you chose: R2 Q1]`) is
  satisfied by `clearedCount` plus the found set. Re-spawning 140 patches and marking the
  cleared ones would make a rejoin slower the further a player has got, which punishes
  progress.
- **`areaComplete` is persisted even though it is derivable** from `clearedCount` against
  `area.patchCount`. [cid: decided] The criterion is *"sets the area-complete flag exactly
  once"*, and a flag recomputed on every join fires its side effect on every join.

```manifest
{
  "provides": "playerState",
  "value": {
    "fields": [
      { "name": "currency",     "type": "number",                  "writtenBy": "progression", "persisted": true,  "note": "Never decremented except by tryBuy." },
      { "name": "upgrades",     "type": "map<upgradeId,integer>",   "writtenBy": "progression", "persisted": true,  "note": "Keyed by upgrades[].id. A missing key reads as level 0." },
      { "name": "patches",      "type": "Patch[]",                  "writtenBy": "plots",       "persisted": false, "note": "Live world state. Rebuilt on join from clearedCount and found." },
      { "name": "clearedCount", "type": "integer",                  "writtenBy": "clearing",    "persisted": true,  "note": "Against area.patchCount. The only record of clearing that survives." },
      { "name": "found",        "type": "map<relicName,boolean>",   "writtenBy": "clearing",    "persisted": true,  "note": "Keyed by the strings in collection.sets[].relics." },
      { "name": "areaComplete", "type": "boolean",                  "writtenBy": "clearing",    "persisted": true,  "note": "Latch. Set once, never cleared." },
      { "name": "player",       "type": "Player",                   "writtenBy": "server-main", "persisted": false, "note": "The Roblox Player. Set at join, never reassigned." }
    ],
    "types": {
      "Patch": {
        "position":  "Vector3",
        "tierIndex": "integer",
        "relic":     "string?",
        "cleared":   "boolean",
        "instance":  "BasePart?"
      },
      "Player": { "__roblox": "Player" }
    }
  }
}
```

## Consequences for other work

- **`plots` owns the `Patch` record and is the only module that may construct one.** Its
  `tierIndex` is an index into `tiers`, not a copy of a tier, so re-emitting the config cannot
  leave a stale name in a live patch.
- **`clearing` may set `cleared` on a patch it did not create.** The single-writer rule is per
  field, and `patches` is `plots`'s array of `plots`'s records; the `cleared` flag inside one
  is `clearing`'s. Stated because it is the one place the rule is not literal.
- **`persistence` reads this table and nothing else.** Its saved payload is exactly the five
  `persisted: true` fields. Adding a field without setting `persisted` now fails the merge, so
  the save format cannot drift from the state shape silently.
- **A rejoining player's `patches` is rebuilt, not restored.** Whoever writes `plots` must
  produce the same layout for the same player, which makes the patch scatter a function of a
  stable seed rather than of `math.random()`. That is a requirement on `plots`, not a decision
  I am making for it.

## Acceptance criteria

1. `PlayerState` has exactly seven fields; every one names a `writtenBy` that appears in
   `modules`, and the merge fails if it does not.
2. No field is written by two modules, and no module writes a field it does not declare.
3. The persisted payload contains exactly the five fields marked `persisted: true`; `patches`
   and `player` never reach a DataStore.
4. `areaComplete` transitions false to true at most once in a player's lifetime, across any
   number of rejoins.

## Not decided here

The save format, key naming and retry policy for the DataStore (`persistence`). How patches are
laid out or seeded (`plots`). What happens *when* `areaComplete` becomes true (`clearing` sets
it; Meta & Content decides what it means). Whether a second area adds fields to this table or
gets its own (`gameplay/meta`, at the point a second area exists).
