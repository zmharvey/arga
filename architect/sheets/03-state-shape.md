# 03 — Player state

**Stage:** architect · **Key:** stateShape

## Decision

**One table per player, `PlayerState`, with eight named fields, each naming the single module
that writes it and whether it survives a rejoin.** Every module reads the whole table and
writes only its own fields.

**The collection that holds many of them is `states`, a map keyed by `UserId`.** Not an array
and not keyed by `Player`.

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
  satisfied by `cleared` plus `clearedCount` plus the found set. Re-spawning 140 patches and
  marking the cleared ones would make a rejoin slower the further a player has got, which
  punishes progress; spawning only the ones `cleared` does not name has the opposite slope.
- **`cleared` was missing, and its absence made `plots`'s own first criterion unsatisfiable.**
  [cid: decided] This sheet previously said `clearedCount` was "the only record of clearing that
  survives", while `02-modules.md` gives `plots` the criterion *"a rejoining player's
  already-cleared patches do not respawn"* and forbids per-session randomness in `layout`
  explicitly because *"persistence stores patch indices"*. **A count cannot tell you which.** A
  builder resolving it by skipping the first `clearedCount` patches in layout order would
  destroy patches the player never cleared — including, one time in six, a patch hiding a Find
  they had not collected, making it permanently unobtainable and breaking a binding promise. So
  the durable record is a set of layout indices, and `clearedCount` stays because the HUD's
  progress bar reads a fraction and nothing should have to count a 140-key table every tick to
  draw it. It is a cache of `#cleared`, not a second source of truth: the bullet below is what
  keeps the two from ever disagreeing.
- **The collapse is in the payload only, and it is lossless because `load` is its exact inverse.**
  `persistence` forbids "storing a per-patch cleared list *once an area is complete*" and the
  runtime sheet's criterion 3 is "a completed area occupies one boolean in the save payload, not a
  list", so a finished area saves as `areaComplete` true and an empty `cleared`. The payload is
  bounded by `area.patchCount` while an area is in progress and by one boolean forever after.
  **What the third build trial found is that nothing expanded it back.** `plots.spawn` builds one
  Instance per index `cleared` does not mark, so an emptied set respawned all 140 patches on the
  next join, `clearing` re-cleared them, `progression.award` paid for them again, and
  `clearedCount` ran to 280 and kept climbing every rejoin — an unbounded currency farm, and a
  straight breach of `[brief: binding]` *"Cleared is permanent — overgrowth never returns."* So
  `cleared` is **complete in memory at all times** and collapsed only on the wire out: `save`
  drops it because `areaComplete` implies it, `load` refills it because `areaComplete` implies it,
  and no module downstream ever sees a state that lies about what is cleared. `[cid: decided]`
  `theme/setting/04-permanence-and-passage.md` `W2` had already fixed this shape from the fiction
  side — *"the prohibition is on the list, not on the flag"*, the flag *"is what stops a finished
  part coming back green"*, and re-entry is *"a read of that boolean plus a `layout` call that
  spawns zero patches"* — so this is a defect against a decision that existed, not a new call.
- **Two modules read the latch, and neither is being polite about it.** `plots.spawn` creates no
  patch Instance while `areaComplete` is true, and `clearing.tick` skips such a state before it
  measures anything. Either one alone closes the farm; both are stated because they own different
  facts — `plots` owns whether a patch exists in the world, `clearing` owns whether one can be
  cleared — and a guard that lives only in a caller is the failure this stage exists to remove.
  `clearedCount` may therefore never exceed `area.patchCount`, and that is checkable.
- **The collection is keyed by `UserId`, and the `player` field is what forces that.** [cid: decided]
  `tick(states)` was handed to a builder with no statement of what `states` was; it guessed a
  map, a peer guessed differently, and both were guessing. `player` already exists in this table
  precisely so a state can name its own `Player` — which is only necessary if the key is not the
  `Player`. Keying by `UserId` also means the live key and the DataStore key are the same value,
  and that a state being saved during `PlayerRemoving` cannot be indexed by an Instance the
  engine is in the middle of destroying.
- **`areaComplete` is persisted even though it is derivable** from `clearedCount` against
  `area.patchCount`. [cid: decided] The criterion is *"sets the area-complete flag exactly
  once"*, and a flag recomputed on every join fires its side effect on every join.

```manifest
{
  "provides": "stateShape",
  "value": {
    "fields": [
      { "name": "currency",     "type": "number",                  "writtenBy": "progression", "persisted": true,  "note": "Never decremented except by tryBuy, never increased except by award." },
      { "name": "upgrades",     "type": "map<upgradeId,integer>",   "writtenBy": "progression", "persisted": true,  "note": "Keyed by upgrades[].id. A missing key reads as level 0." },
      { "name": "patches",      "type": "Patch[]",                  "writtenBy": "plots",       "persisted": false, "note": "Live world state, world-space positions, one record per layout index whether cleared or not. Rebuilt on join from cleared." },
      { "name": "cleared",      "type": "map<patchIndex,boolean>",  "writtenBy": "clearing",    "persisted": true,  "note": "Which patches are gone, keyed by the 1-based index into layout.build()'s canonical order. COMPLETE IN MEMORY AT ALL TIMES: one key per cleared patch while the area is in progress, and all area.patchCount keys once areaComplete is true, refilled by persistence.load from the flag. Only the SAVE collapses it to empty (persistence's prohibition, runtime criterion 3); load is the exact inverse, which is what makes the collapse lossless instead of a respawn. Bounded by area.patchCount, always. clearing is its only session writer; persistence constructs and reconstitutes it, which is not a session write. This plus areaComplete is what makes 'cleared is permanent' survive a rejoin." },
      { "name": "clearedCount", "type": "integer",                  "writtenBy": "clearing",    "persisted": true,  "note": "Against area.patchCount, and NEVER above it. Always equals the number of keys in cleared, including immediately after a rejoin with areaComplete true, where both equal area.patchCount. persistence.load derives it from cleared and the flag rather than trusting the stored value, so a stale, partial or hand-edited count cannot re-open a finished area." },
      { "name": "found",        "type": "map<relicName,boolean>",   "writtenBy": "clearing",    "persisted": true,  "note": "Keyed by the strings in collection.sets[].relics." },
      { "name": "areaComplete", "type": "boolean",                  "writtenBy": "clearing",    "persisted": true,  "note": "Latch. Set once by clearing, never cleared, and the one field the save stores in place of a 140-key list. It is an INPUT, not a display flag: plots.spawn creates zero patch Instances while it is true, clearing.tick skips the state before it measures anything, and persistence.load refills cleared from it. That is what stops a finished area coming back green and paying a second time." },
      { "name": "player",       "type": "Player",                   "writtenBy": "server-main", "persisted": false, "note": "The Roblox Player. Set at join, never reassigned. Exists because the collection is keyed by UserId, not by Player." }
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
    },
    "collection": {
      "name": "states",
      "keyedBy": "UserId",
      "keyType": "integer — player.UserId, the same value persistence keys its DataStore by",
      "holds": "exactly one PlayerState per connected player, and nothing else",
      "ownedBy": "server-main",
      "entryAppears": "in wiring.onJoin, immediately after persistence.load returns and state.player is set — never before, or clearing.tick can see a half-loaded state",
      "entryDisappears": "in wiring.onLeave, before the save and before the plot teardown, so no tick can touch a state that is being torn down",
      "absentMeans": "that player is not in this server, or has not finished joining. A lookup miss is a return, not an error",
      "passedTo": "clearing.start(states) once at boot and clearing.tick(states) every 0.12s, by reference — the table is mutated in place and never replaced",
      "iterationOrder": "undefined. Nothing may depend on it: payouts and reveals are per-player and order-free"
    }
  }
}
```

## Consequences for other work

- **`plots` owns the `Patch` record and is the only module that may construct one.** Its
  `tierIndex` is an index into `tiers`, not a copy of a tier, so re-emitting the config cannot
  leave a stale name in a live patch.
- **`clearing` may set `Patch.cleared` on a patch it did not create.** The single-writer rule is
  per field, and `patches` is `plots`'s array of `plots`'s records; the `cleared` flag inside one
  is `clearing`'s. Stated because it is the one place the rule is not literal.
- **`state.cleared` and `Patch.cleared` are the durable and the live view of one fact**, and
  `clearing` writes both in the same operation. `plots.spawn` seeds `Patch.cleared` from
  `state.areaComplete or state.cleared[index]` — the latch first, short-circuiting the set — and
  creates no Instance for a patch it marks. Nothing else may write either.
- **`writtenBy` means "the single module that MUTATES this field during a session".** It is not
  "the only module that ever puts a value in it". `persistence.defaultState` initialises all six
  persisted fields and `persistence.load` reconstitutes them from a payload; neither is a session
  write, and `wiring.constructs` records the first of them explicitly. That distinction is what
  lets `load` refill `cleared` and repair `clearedCount` without becoming a second writer of
  either, and it is why the single-writer rule is still literally true with `clearing` named on
  all three of `cleared`, `clearedCount` and `areaComplete`.
- **`persistence` reads this table and nothing else.** Its saved payload is exactly the six
  `persisted: true` fields. Adding a field without setting `persisted` now fails the merge, so
  the save format cannot drift from the state shape silently.
- **A rejoining player's `patches` is rebuilt, not restored.** `layout.build()` takes no seed and
  no player, so every plot has the same layout and an index means the same patch in every
  session — which is what makes `cleared` portable across a rejoin at all.

## Acceptance criteria

1. `PlayerState` has exactly eight fields; every one names a `writtenBy` that appears in
   `modules`, and the merge fails if it does not.
2. No field is written by two modules, and no module writes a field it does not declare.
3. The persisted payload contains exactly the six fields marked `persisted: true`; `patches`
   and `player` never reach a DataStore.
4. `areaComplete` transitions false to true at most once in a player's lifetime, across any
   number of rejoins.
5. `#cleared` equals `clearedCount` at every instant of a live session, including immediately
   after a rejoin with `areaComplete` true, where both equal `area.patchCount`; and `cleared` is
   empty in every *saved payload* where `areaComplete` is true.
6. `states` is indexed by an integer everywhere in `game/src/server`, and no code path indexes
   it with a `Player`.
7. `clearedCount` never exceeds `area.patchCount`, over any number of rejoins. Reaching 141 is a
   failure of this contract, not a balance problem.
8. A player who rejoins with `areaComplete` true sees zero patch Instances, is awarded no
   currency however long they walk, and receives no `AreaRestored`.

## Not decided here

The save format, key naming and retry policy for the DataStore (`persistence`). How patches are
laid out or seeded (`plots`). What happens *when* `areaComplete` becomes true (`clearing` sets
it; Meta & Content decides what it means). Whether a second area adds fields to this table or
gets its own (`gameplay/meta`, at the point a second area exists) — `[cid: decided]`
`theme/setting/04-permanence-and-passage.md` has already asked persistence for "one new bounded
field: the id of the part the player is currently in", and for the ability to hold more than one
part in a partial state at once. Neither is buildable while `area` supplies one area and no contract key
names a second, so this table stays single-area and that request is routed back with the area
itself.
