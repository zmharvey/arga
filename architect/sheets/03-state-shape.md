# 03 — Player state

**Stage:** architect · **Key:** stateShape

## Decision

**One table per player, `PlayerState`, with twelve named fields — seven persisted, five live —
each naming the single module that writes it.** The collection that holds many of them is
`states`, a map keyed by `UserId`.

Four fields are new, one is renamed, and one is deleted:

| change | field | why |
|---|---|---|
| **new** | `areasFinished: integer` | `endgame.risingQuantity`, and `endgame.persistence`: "one integer count, never one boolean per area" |
| **new** | `rowsRevealed: map<upgradeId,boolean>` | `firstSession.withheld.upgradeRow` — `latchSource: "one persisted boolean per row"`, `newSaveFields: 3` |
| **new** | `owned: map<productId,boolean>` | `products.ownershipCheck`, **not persisted** — `products.F20` |
| **new** | `armState: ArmState` | `firstSession.armDistanceStuds`, `armScope: "perCharacterSpawn"` |
| **new** | `spawnPivot: Vector3` | `firstSession.armMeasuredOn` measures from the plot spawn pivot, and `plots` is the only module that knows where it is |
| **deleted** | `areaComplete: boolean` | replaced by `areasFinished`; one area became eight and then unlimited |

**There is deliberately no set-completion field.** That is the one thing the brief asked for
that this sheet refuses, and the refusal is `[cid: decided]`: `modifiers.sources[set-completion].storage`
reads *"derived from `discovery.record` at every read; never latched, never persisted"*, and
`modifiers.forbidden` bans "a set bonus written into save data". `found` already holds every
bit needed to derive it; a `setsComplete` field would be a second source of truth for a fact one
map already carries, and the contract forbids it in two places.

## Why

- **`writtenBy` is the whole point, not documentation.** With one writer per field, a
  disagreement is a merge error rather than a race. The gate refuses two writers on one field.
- **`areasFinished` is one integer and it does the work of eight booleans and then of an
  unbounded number.** `[cid: decided]` `endgame.persistence.postTerminalAreasStoredAs` is *"one
  integer count, never one boolean per area"*, with the reason stated: *"an unlimited run of
  identical unnumbered bays must not turn world state into unbounded save data."* The same
  integer covers the eight authored areas, because there is no reason for the authored half to
  be stored differently from the endless half. **The live area is `areasFinished + 1`, always.**
  `depths.unlockRule` is *"the area before it in this list is complete; nothing else conditions
  any area or any depth"*, which is exactly that expression and nothing more.
- **The collapse got simpler rather than more complicated, and the inverse rule is why.** The
  shipped shape stored `cleared` for one whole area, emptied it on save when `areaComplete` was
  true, and refilled it on load — a lossy-looking payload made lossless by `load` being `save`'s
  exact inverse. That was one defect away from an unbounded currency farm, and it found it.
  With eight areas the same trick would need eight collapses. So: **`cleared` and `clearedCount`
  describe the LIVE area only, and finishing an area empties them as part of finishing it.**
  Every area below the live one is entirely cleared *by implication of `areasFinished`*, and
  every area above it does not exist yet. The inverse is now structural instead of conditional:
  `plots.spawn` builds bare ground for bays `1..areasFinished`, patch Instances only for bay
  `areasFinished + 1`, and filters those by `cleared`. **`persistence` is still the exact inverse
  of the collapse — there is simply less collapse to invert**, and the respawn-farm defect is
  unreachable because a finished bay has no patch record in `state.patches` for a tick to
  measure against, not because a latch is remembered in three places.
- **The payload is bounded by the largest single area, not by progress.** At most 640 keys in
  `cleared` (depth 4), 24 in `found`, 3 in `rowsRevealed`, three integers and one map of held
  levels. A player who has finished twenty post-terminal areas has a payload the same size as a
  player who has finished none. That is what `endgame.persistence.reason` asks for.
- **`cleared` is still keyed by patch index, and `layout` is still pure, and those two facts are
  one fact.** `discovery.pool.stableAcrossRejoin` is true and
  `discovery.pool.placementIsPlayerIndependent` is true, so `layout.build(k)` returns the same
  ordered records on every machine in every session. The index is the patch's durable identity.
  With eight areas the index is now scoped to an area, which is safe precisely because only one
  area's set is ever live.
- **`owned` is not persisted, and that is a rule rather than an optimisation.**
  `[cid: decided]` `products.F20`: *"No purchase-derived state is written to persistence.
  Ownership is read live every join"*, and `modifiers.sources[purchase].storage`: *"recomputed
  from live ownership at every join; never persisted, never latched."* It is in the state table
  at all because `modifiers.effective` runs on every tick and `UserOwnsGamePassAsync` yields;
  the join-time resolution is the only place the two meet.
- **`armState` is one record with one writer, and that shape is forced by the reset.**
  `firstSession.armScope` is `perCharacterSpawn`, so the gate resets on every character — which
  is `server-main`'s phase — while the measurement is a per-tick distance test, which is
  `clearing`'s. Splitting it into `armed` (written by `clearing`) and a reset (written by
  `server-main`) would be two writers on one fact. So the record carries the **character
  instance it was armed for**, and `clearing.tick` re-arms by noticing that
  `state.armState.character ~= state.player.Character`. One field, one writer, no coordination,
  and it is correct on the first tick after a respawn without anybody remembering to clear it.
- **`spawnPivot` exists because the arming test needs a pivot the tick can trust.**
  `firstSession.armMeasuredOn` is *"server, horizontal XZ displacement of the character root from
  the plot spawn pivot"*. Measuring from wherever the character happened to be on the first tick
  is wrong: `server-main` pivots the character in `onSpawn`, and a tick landing between
  `CharacterAdded` and the pivot would record the world origin and arm the player instantly on
  the teleport. `plots` already computes the pivot and returns it; writing it into the state
  costs one `Vector3` and removes the race. It moves when a bay is built, because the spawn does.
- **`rowsRevealed` is persisted and `firstSession` says so in a number.**
  `firstSession.withheld.upgradeRow` gives `latched: true`, `latchSource: "one persisted boolean
  per row"` and `newSaveFields: 3`. `firstSession.suppressionForbidden` includes
  `reSuppression`, so a flag that goes true never goes false; a derived-on-load reading would
  re-suppress a row for a player who spent below the threshold. The two other latched surfaces,
  `collectionDenominator` and `collectionPanel`, both declare `newSaveFields: 0` and latch on
  *"the collection map is non-empty"*, so they are derived from `found` and add nothing here —
  which is the same sheet telling us exactly which of its latches costs a field and which does
  not.
- **The collection is keyed by `UserId`, and the `player` field is what forces that.**
  `tick(states)` was handed to a builder with no statement of what `states` was; it guessed a
  map, a peer guessed differently. Keying by `UserId` also means the live key and the DataStore
  key are the same value, and a state being saved during `PlayerRemoving` is not indexed by an
  Instance the engine is destroying.
- **`Patch.relic` is now `Patch.find`.** `collection.className` is `Find`,
  `vocabulary.bannedWords` bans `relic`, and while an internal field name is exempt from the ban,
  keeping a stale noun in the one record five modules read is how a banned word gets back into a
  label. `discovery.record.keyedBy` is *"the Find's name"*, so `found` keeps its name and its
  keys are find names.

```manifest
{
  "provides": "stateShape",
  "value": {
    "fields": [
      { "name": "currency",      "type": "number",                   "writtenBy": "progression",  "persisted": true,  "note": "Shards. Increased only by progression.award, decreased only by progression.tryBuy. economy.startingBalance is 0, economy.balanceCap is null, and economy.negativeBalance says a purchase that cannot be afforded changes nothing at all." },
      { "name": "upgrades",      "type": "map<upgradeId,integer>",    "writtenBy": "progression",  "persisted": true,  "note": "Held level per upgrades[].id. A missing key reads as level 0. modifiers.sources[upgrade-level].storage: the held level is persisted and the effect is derived from it at every read, never the other way round." },
      { "name": "rowsRevealed",  "type": "map<upgradeId,boolean>",    "writtenBy": "progression",  "persisted": true,  "note": "firstSession.withheld.upgradeRow: presentAtJoin false, liftedBy 'balance has reached upgrades[i] level-1 cost', latched true, latchSource 'one persisted boolean per row', newSaveFields 3. Set true by progression.revealRows and NEVER set false — firstSession.suppressionForbidden bans reSuppression. Three keys, forever." },
      { "name": "found",         "type": "map<findName,boolean>",     "writtenBy": "clearing",     "persisted": true,  "note": "discovery.record: keyed by the Find's name from collection.sets[].relics, one boolean per name, default false, written by the server at the instant the hiding patch clears, clearedBy nothing ever. Exactly sum(collection.sets[].relics.length) = 24 keys at most, and discovery.record.growth says the record never grows with play. None of discovery.record.forbiddenFields may appear beside it. Set completion, the collection count, the denominator and the collection panel are ALL derived from this map and none of them is stored." },
      { "name": "areasFinished", "type": "integer",                   "writtenBy": "clearing",     "persisted": true,  "note": "endgame.risingQuantity. The count of areas this player has cleared to the last patch, 0 to 8 for the authored ladder and unbounded after it. THE LIVE AREA IS areasFinished + 1, always, which is depths.unlockRule stated as arithmetic. endgame.persistence.postTerminalAreasStoredAs is 'one integer count, never one boolean per area' and this is that integer for the authored areas too. Incremented exactly once per area, by clearing, at the instant the live bay's last patch clears." },
      { "name": "cleared",       "type": "map<patchIndex,boolean>",   "writtenBy": "clearing",     "persisted": true,  "note": "THE LIVE AREA ONLY. Keyed by the 1-based index into layout.build(areasFinished + 1)'s canonical order. Bounded by that area's patchCount, at most 640. Emptied — not collapsed, EMPTIED — as part of incrementing areasFinished, so a finished area contributes nothing to it and the payload never grows with progress. Every area below the live one is entirely cleared by implication of areasFinished; every area above it does not exist yet. persistence.load is still the exact inverse of what save writes: it drops any index at or above the live area's patchCount, with a warning, because the live area changed size." },
      { "name": "clearedCount",  "type": "integer",                   "writtenBy": "clearing",     "persisted": true,  "note": "The number of keys in cleared, for the LIVE area, and never above that area's patchCount. A cache so the progress readout does not count a 640-key table every tick, not a second source of truth: persistence.load derives it from the cleared set rather than trusting the stored number. Reset to 0 with cleared when an area finishes." },
      { "name": "patches",       "type": "Patch[]",                   "writtenBy": "plots",        "persisted": false, "note": "THE LIVE BAY ONLY — plots.liveGeometry.patchInstancesExistIn is 'the live bay only'. One record per index of layout.build(areasFinished + 1), whether cleared or not, with WORLD positions. Rebuilt on join from cleared and rebuilt wholesale by plots.advance when an area finishes. A finished bay has no record here at all, which is why clearing cannot pay for one twice and why no latch is needed to stop it." },
      { "name": "spawnPivot",    "type": "Vector3",                   "writtenBy": "plots",        "persisted": false, "note": "The world position of the live bay's spawn Attachment, written by plots.spawn and rewritten by plots.advance. clearing measures firstSession's arming displacement from this, in XZ only. It exists so the tick never has to guess the pivot from wherever the character happens to be standing on the frame it first sees it — server-main pivots in onSpawn, and a tick landing before that pivot would arm the player on the teleport." },
      { "name": "owned",         "type": "map<productId,boolean>",    "writtenBy": "entitlements", "persisted": false, "note": "One key per products.items[] entry, resolved once per join by entitlements.refresh through products.ownershipCheck. NEVER PERSISTED — products.F20: 'No purchase-derived state is written to persistence. Ownership is read live every join', and modifiers.sources[purchase].storage repeats it. Read by modifiers.effective and by nothing else. Every gamePassId is null today, so every value is false." },
      { "name": "armState",      "type": "ArmState",                  "writtenBy": "clearing",     "persisted": false, "note": "firstSession's arming gate. armScope is perCharacterSpawn, so this carries the character it was armed FOR: clearing.tick re-arms whenever armState.character is not state.player.Character, which makes the reset a property of the tick rather than a second module's write. armed goes true when the horizontal XZ displacement of the character root from spawnPivot first exceeds firstSession.armDistanceStuds (2.0) during that character's life, and clearing clears nothing at all while it is false." },
      { "name": "player",        "type": "Player",                    "writtenBy": "server-main",  "persisted": false, "note": "The Roblox Player. Set once at join, never reassigned. Exists because the collection is keyed by UserId, not by Player." }
    ],
    "types": {
      "Patch": {
        "position":  "Vector3",
        "tierIndex": "integer",
        "find":      "string?",
        "cleared":   "boolean",
        "instance":  "BasePart?"
      },
      "ArmState": {
        "character": "Instance?",
        "armed":     "boolean"
      },
      "Vector3": { "__roblox": "Vector3" },
      "Player":  { "__roblox": "Player" }
    },
    "collection": {
      "name": "states",
      "keyedBy": "UserId",
      "keyType": "integer — player.UserId, the same value persistence keys its DataStore by",
      "holds": "exactly one PlayerState per connected player, and nothing else",
      "ownedBy": "server-main",
      "entryAppears": "in wiring.onJoin, after persistence.load returns and entitlements.refresh has resolved and state.player is set — never before, or clearing.tick can see a state whose owned map is empty and pay the wrong multiplier",
      "entryDisappears": "in wiring.onLeave, before the save and before the lane teardown, so no tick can touch a state that is being torn down",
      "absentMeans": "that player is not in this server, or has not finished joining. A lookup miss is a return, not an error",
      "passedTo": "clearing.start(states) once at boot and clearing.tick(states) every runtime.clearTickRate, by reference — the table is mutated in place and never replaced",
      "iterationOrder": "undefined. Nothing may depend on it: social.worldStateScope and social.progressScope are both per-player, social.sharedState is empty, and social.forbidden X3 bans any server-held value more than one player's action increments"
    }
  }
}
```

## Consequences for the builders

- **`plots` owns the `Patch` record and is the only module that may construct one.** Its
  `tierIndex` is an index into `tiers`, not a copy of a tier, so re-emitting the config cannot
  leave a stale name in a live patch.
- **`clearing` may set `Patch.cleared` on a patch it did not create.** The single-writer rule is
  per field of `PlayerState`; `patches` is `plots`'s array of `plots`'s records, and the flag
  inside one is `clearing`'s. Stated because it is the one place the rule is not literal.
- **`writtenBy` means "the single module that MUTATES this field during a session".**
  `persistence.defaultState` initialises the seven persisted fields and `persistence.load`
  reconstitutes them; neither is a session write, and `wiring.constructs` records both.
- **`persistence`'s payload is exactly the seven `persisted: true` fields.** Adding a field
  without setting `persisted` fails the merge, so the save format cannot drift from the state
  shape silently.
- **Nothing here names an area other than through `areasFinished`.** There is no `areaId`, no
  `depth`, no `currentArea` record. All three are `depths.areas[areasFinished + 1]`, or
  `endgame.postTerminalArea` once that index passes 8.
- **A rejoining player's `patches` is rebuilt, not restored**, from
  `layout.build(areasFinished + 1)`.

## Acceptance criteria

1. `PlayerState` has exactly twelve fields; every one names a `writtenBy` that appears in
   `modules`, and no field is written by two modules.
2. The persisted payload contains exactly the seven fields marked `persisted: true`. `patches`,
   `spawnPivot`, `owned`, `armState` and `player` never reach a DataStore.
3. `#cleared` equals `clearedCount` at every instant of a live session, and both are 0
   immediately after `areasFinished` increments.
4. `clearedCount` never exceeds `depths.areas[areasFinished + 1].patchCount`, over any number of
   rejoins and any number of areas.
5. `areasFinished` is monotonically non-decreasing over a player's whole lifetime and increments
   by exactly 1 per completed area.
6. The save payload's size does not grow with `areasFinished`. A player at 0 and a player at 40
   produce payloads within one integer's width of each other.
7. `states` is indexed by an integer everywhere in `game/src/server`, and no code path indexes it
   with a `Player`.
8. `grep -rn "areaComplete\|setsComplete\|state.owned" game/src/server/Persistence.luau` returns
   nothing.
9. A character that respawns has `armState.armed` false on the first tick after
   `CharacterAdded`, without any module other than `clearing` writing to `armState`.

## Not decided here

The save format, key naming and retry policy for the DataStore (`persistence`). How patches are
laid out or seeded (`layout`). What a set completion is *worth* — `setBonus.rows` carries the
axis and, by its own invariant, no magnitude, so `modifiers` reads which axis and treats the
absent factor as 1.0. **That is routed back to CID in `02-modules.md` and is the one place this
contract currently promises a player something it cannot deliver.**
