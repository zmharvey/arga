# 03 — Store versions and migration

**Domain:** tech/persistence · **Category:** Tech & Data · **Wave:** 5

## Decision

**Seven named changes force a new `runtime.dataStoreName`, eight named changes do not, and no prior
version is ever read while `shippedToPlayers` is false.** The moment that flips, a bump requires a
translating reader that carries five fields, discards `cleared` and `clearedCount` always, reads at
most one prior version, and leaves the old key byte-untouched as the rollback. **The procedure has
never been executed.**

## Why

- **`cleared` is keyed by the patch array index, so the index space is the schema.**
  `game/src/shared/Layout.luau` says in its own header that changing the composition order, grid,
  seed or draw sequence "is a save migration, not a refactor", and `stateShape` records the same
  thing as v3's whole rationale. Every trigger below is either "the index space moved" or "a key set
  moved". `[research: game/src/shared/Layout.luau]`
- **The non-trigger list is half the value of this sheet.** Without it a builder bumps the store for
  a price change, wipes everyone, and calls it caution. Eight rows, each naming what it protects.
- **"A new key and no reader of the old one" is correct and is conditional.**
  `architect/01-runtime` states it as the cheapest correct migration `[architect: decided]`, and it
  is true only while nothing has shipped. The condition is not a date and not a judgment: it is
  `shippedToPlayers`, a boolean whose owner is **Build & Deploy** (`release.provisioning`), flipped
  at the first publish to a live universe that a player joins. Naming the flag is what makes the
  rule survive the day it stops being true.
- **The chain depth is one, deliberately.** A reader that walks v1 → v2 → v3 is three translations
  that have to stay correct forever, and each bump doubles the surface. One prior version means a
  player who skips a version loses their save — acceptable, because a version's lifetime exceeds a
  10–20 minute session by orders of magnitude, and because the alternative is a translation matrix
  nobody will ever test. `[cid: decided]`
- **`cleared` is discarded on every migration, whatever the trigger.** It is not translatable across
  a layout change, and a bump that leaves the index space identical should not have been a bump. The
  player restarts the live area with its ground standing and keeps every Shard, every held level,
  every revealed row and every Find. That is the whole of the per-migration loss and it is one
  area's partial work.
- **The old key is the rollback because nothing writes to it.** Step `M5` is a prohibition, not a
  procedure: a reader that also *deletes* the old key destroys the only artefact a revert would
  restore. Reverting is then two acts — set `runtime.dataStoreName` back, republish — and the
  previous store is exactly as it was at the instant of the bump.
- **Within one version there is effectively no rollback, and the number is one hour.** DataStore
  versioned backups keep the latest forever and expire others 30 days after being overwritten, but
  **successive writes within the same UTC hour overwrite permanently**
  `[research: https://create.roblox.com/docs/cloud-services/data-stores/versioning-listing-and-caching]`.
  At a 45-second interval that is 79 of every 80 writes unrecoverable, so per-key recovery
  granularity is **one hour, not one save**. That makes per-player restore a manual Open Cloud act
  by whoever holds the API key, and it is why sheet 01's `D11` forbids `GetVersionAsync`,
  `ListVersionsAsync` and `RemoveAsync` in game code: a half-built in-game restore against
  hour-granular history would silently discard an hour of play.
- **The bump-to-revert window is bounded by the restart procedure, not by this key.** Publishing
  does not evict players; outdated servers drain naturally or are restarted with a **1–60 minute**
  delay `[research: https://create.roblox.com/docs/projects/update-games]`, and restoring a place
  version does not publish it `[research: https://create.roblox.com/docs/projects/version-history]`.
  That is Build & Deploy's `rollback` block; I state the data consequence and set none of its
  timings.
- **The data-loss tolerance is `[cid: decided]` because the brief states none.** The nearest line in
  the whole brief is `00-CORE.md`'s "Success is **shipped artifacts, not players**"
  `[brief: binding]` ← `[you chose: R1 Q3]`. So: **pre-ship, total loss is acceptable and is the
  default**; post-ship, the per-migration row above becomes binding at the same instant
  `shippedToPlayers` flips. Saying that plainly is the deliverable — designing for an installed base
  that does not exist would be the error.
- **Wave 4 has released, and my trigger list is armed but has not fired yet — the distinction is the
  point.** `cid/gameplay/_verified-wave4.md` line 3 reads *"Final verdict: PASS (round 3)."* The
  released `solvency` carries chunk counts **4/5/7/10/15/18/25/28** and a **42-chunk, 1,680-patch**
  bay. `depths.areas[].chunkCount` still reads **4/7/11/14/16/16/16/16** and
  `endgame.postTerminalArea` still reads 30 chunks and 640 patches, because neither key was
  re-emitted — `solvency` carries a revision table asking for both. **`B1` and `B2` fire when that
  table lands, not when `solvency` released**, because the index space is defined by `depths` and
  `layout`, not by the sheet that proposes their new values. When it lands, `ArgaRuin_v3` becomes
  `ArgaRuin_v4`. `[research: cid/gameplay/balance/03-ladder-solvency.md]`
- **`B3` is not currently armed by anything of mine.** Sheet 01's round-1 request for a persisted
  `sessions` / `runOrdinal` field is **withdrawn**: Funnels and Engagement settled it between them
  on the ground that a brand-new save is byte-equal to `defaultState()`, so run 1 is a predicate
  over the seven fields already persisted rather than an eighth field. `stateShape` gains nothing
  and there is no bump to pay for it. The trigger row stays, because the next writer to want a
  persisted field needs to know what it costs.
- **The seam with Build & Deploy, stated from my side.** I own the save schema's version, what
  forces it to move, the migration procedure and what a failed write costs inside a session. That
  domain owns what a deploy does around them — when a bump may ship, whether a publish may proceed
  with an unexercised migration, and the restart. Neither of us restates the other.

```manifest
{
  "provides": "storeMigration",
  "status": "proposed",
  "value": {
    "currentStore": "runtime.dataStoreName — ArgaRuin_v3. Architect's field; cited here, never set here.",
    "shippedToPlayers": false,
    "shippedToPlayersOwner": "cid/tech/deploy, release.provisioning — flipped at the first publish to a live universe that a player joins",
    "bumpTriggers": [
      { "id": "B1", "field": "layout.composition and runtime.layoutSeed", "rule": "any change to an area's chunk run, its composition order, its grid, its seed or its draw sequence", "why": "state.cleared is keyed by the patch array index into layout.build(k); every index then names a different patch" },
      { "id": "B2", "field": "depths.areas[].patchCount and depths.areas[].chunkCount", "rule": "any change to either, for any area", "why": "the index space of that area changes size and identity" },
      { "id": "B3", "field": "stateShape.fields where persisted is true", "rule": "adding, removing, renaming or retyping any persisted field", "why": "load applies the payload field by field; an unknown field is dropped and a missing one silently keeps its default" },
      { "id": "B4", "field": "collection.sets[].relics", "rule": "any rename, addition or removal of a Find name", "why": "found is keyed by the Find's name, so a rename loses that Find for every player who had it" },
      { "id": "B5", "field": "upgrades[].id", "rule": "any change to an upgrade id", "why": "upgrades and rowsRevealed are both keyed by id; a rename refunds nothing and re-suppresses a row" },
      { "id": "B6", "field": "any persisted field's meaning", "rule": "a semantic change with no shape change — areasFinished becoming 0-based, cleared becoming area-scoped, a key prefix being added", "why": "the payload still validates and is still wrong, which is the only class of migration a type check cannot catch" },
      { "id": "B7", "field": "the encoding of any persisted value", "rule": "map to array, integer keys to a run-length or bitfield, any compression, even with the field name and meaning unchanged", "why": "this is the optimisation a builder reaches for when the cleared map looks large, and it is a migration" }
    ],
    "nonTriggers": [
      { "id": "N1", "field": "tiers[].value, tiers[].weight, tierMix", "why": "nothing persisted is keyed by a tier" },
      { "id": "N2", "field": "upgrades[].costBase, costGrowth, perLevel, maxLevel", "why": "the held level is persisted and the effect is derived from it at every read" },
      { "id": "N3", "field": "depths.areas[].size and footprintStuds2 where patchCount is unchanged", "why": "the index space is unchanged" },
      { "id": "N4", "field": "any player-facing string that is not a found key or an upgrades id", "why": "area labels, tier names, blurbs and the currency name are read from config, never from a payload" },
      { "id": "N5", "field": "runtime.clearTickRate and runtime.saveIntervalSeconds", "why": "neither appears in a payload; the interval changes the cadence, not the shape" },
      { "id": "N6", "field": "products[] and every price", "why": "products.F20 keeps every purchase-derived value out of persistence entirely" },
      { "id": "N7", "field": "every model, material, cue, colour and effect", "why": "no art asset is referenced by a persisted value" },
      { "id": "N8", "field": "sessionLock.steal.afterSeconds and every sessionLock timing", "why": "the lock record is an envelope field with no historical meaning; a stale lock under a new rule is stolen, not migrated" }
    ],
    "readerPolicy": {
      "readersWrittenToday": 0,
      "priorVersionsWithNoReader": ["ArgaRuin_v1", "ArgaRuin_v2"],
      "ruleWhileNotShipped": "a bump is a new key and no reader of the old one; the old key is simply never read",
      "ruleOnceShipped": "no bump may ship without a translating reader for exactly the fields in translate.carry",
      "chainDepth": 1,
      "chainRule": "only the immediately-previous store name is ever consulted. There is no v1 to v2 to v3 chain, and a player who skips a version loses their save.",
      "readsPerJoin": "at most one extra request, and only on a miss under the current key"
    },
    "procedure": [
      { "id": "M1", "step": "on a miss under the current key — the join UpdateAsync returns no payload — read the immediately-previous store name once, with the load retry profile" },
      { "id": "M2", "step": "translate the fields in translate.carry verbatim" },
      { "id": "M3", "step": "set the fields in translate.discard to their empty forms: cleared = {}, clearedCount = 0" },
      { "id": "M4", "step": "write the translated payload under the current key, through the same UpdateAsync that stamps the lock" },
      { "id": "M5", "step": "never write to and never remove the previous key. It is the rollback, and a reader that deletes it destroys the only artefact a revert would restore." },
      { "id": "M6", "step": "the whole procedure is idempotent: M1 fires only on a miss under the current key, so a second join reads the current key and never touches the previous one" }
    ],
    "translate": {
      "carry": ["currency", "upgrades", "rowsRevealed", "found", "areasFinished"],
      "discard": ["cleared", "clearedCount"],
      "discardReason": "cleared is keyed by the patch array index into layout.build(areasFinished + 1). Every trigger either re-identifies that index space or should not have been a bump, so there is no translation, and inventing one would mark patches that are not there.",
      "discardCost": "the player restarts the live area with its ground standing, and keeps every Shard, every held level, every revealed row and every Find",
      "envelopeFields": "lock is never carried — a lock from a previous version names a server that no longer holds anything. It is the only envelope field that exists: the persisted set is the seven stateShape fields and no eighth was added.",
      "carryPlusDiscardEquals": "exactly the seven fields stateShape marks persisted: true, with no field in both lists"
    },
    "rollback": {
      "trigger": "a bump ships and the translated payload is wrong",
      "procedure": "revert runtime.dataStoreName to the previous value and republish; because M5 never wrote the old key, the previous store is exactly as it was at the instant of the bump",
      "lost": "everything played under the new name between the bump and the revert",
      "boundedBy": "the server-restart window — publishing does not evict players, outdated servers drain naturally or are restarted with a 1 to 60 minute delay, and restoring a place version does not publish it",
      "boundedByOwner": "cid/tech/deploy, release.rollback — the timings are that domain's, the data consequence is stated here",
      "withinVersionRollback": {
        "supported": false,
        "granularity": "one hour per key, not one save",
        "why": "versioned backups keep the latest forever and expire others 30 days after being overwritten, but successive writes within the same UTC hour overwrite permanently. At a 45-second interval that is 79 of every 80 writes unrecoverable.",
        "ifNeeded": "a manual Open Cloud operation by whoever holds the API key",
        "gameCodeMayCall": "nothing — GetVersionAsync, ListVersionsAsync and RemoveAsync are forbidden by persistence.forbidden D11"
      }
    },
    "tolerance": {
      "tag": "[cid: decided] — the brief states no availability, uptime or data-loss tolerance anywhere",
      "perFailedWriteSeconds": 45,
      "perFailedWriteNote": "one save interval of play; the next pass writes the same live state",
      "perMigration": "at most one area's partial clearing. Zero currency, zero upgrade levels, zero revealed rows, zero Finds.",
      "preShip": "total loss is acceptable and is the default",
      "preShipSource": "00-CORE.md, 'Success is shipped artifacts, not players' [brief: binding]. Nothing has shipped, so a wipe costs nobody anything today.",
      "postShip": "preShip stops applying at the same instant shippedToPlayers flips, and perMigration becomes the binding row"
    },
    "everExecuted": false,
    "test": {
      "path": "game/test/migration.spec.luau",
      "existsToday": false,
      "setup": "in a Studio session with API access enabled, write a synthetic previous-version payload under the previous store name for a known UserId, then join as that UserId",
      "asserts": [
        "currency, upgrades, rowsRevealed, found and areasFinished equal the synthetic payload exactly",
        "cleared is empty and clearedCount is 0",
        "the previous key's stored value is unchanged after the join",
        "across two joins, exactly one request is made against the previous store name"
      ]
    },
    "openConsequences": [
      {
        "id": "W1",
        "cause": "solvency's revision table, asking depths.areas[].chunkCount to move to 4/5/7/10/15/18/25/28 and endgame.postTerminalArea to a 42-chunk, 1680-patch bay",
        "fires": ["B1", "B2"],
        "firesWhen": "the table lands in depths and endgame — NOT when solvency released, because the index space is defined by depths and layout rather than by the sheet proposing their values",
        "effect": "ArgaRuin_v3 becomes ArgaRuin_v4",
        "wave4Status": "RELEASED — cid/gameplay/_verified-wave4.md line 3, 'Final verdict: PASS (round 3).'",
        "revisionStatus": "not yet applied to depths or endgame; both still carry the pre-wave-4 counts"
      },
      {
        "id": "W2",
        "cause": "sheet 01's round-1 request for a persisted sessions / runOrdinal field",
        "fires": [],
        "status": "WITHDRAWN. Funnels and Engagement settled it: a brand-new save is byte-equal to defaultState(), so run 1 is a predicate over the seven persisted fields, not an eighth field. stateShape gains nothing and B3 is armed by nothing today."
      }
    ]
  }
}
```

## Revision request issued

**RR-P8 · `architect/sheets/01-runtime.md` — `dataStoreName` and `storeVersionHistory`.** Wave 4 has
released at PASS, but `depths` and `endgame` have not yet absorbed `solvency`'s revision table, so
the trigger is armed and unfired. **The request is conditional on that table landing, not on wave 4
releasing:** when `depths.areas[].chunkCount` and `endgame.postTerminalArea` move, `B1` and `B2` both
fire and the store must become **`ArgaRuin_v4`**, with a `storeVersionHistory` entry whose reason is
the chunk-count revision re-identifying every patch index — the same reason `ArgaRuin_v3` already
records for the layout rewrite. I name the field and set nothing. (Build & Deploy's `RR-2` against
the stale `ArgaRuin_v2` heading on the same sheet is a separate defect and I do not duplicate it.)

## Consequences for other work

- **Whoever executes `solvency`'s revision table** is executing a **save migration**, not a tuning
  edit. The moment `depths.areas[].chunkCount` or `endgame.postTerminalArea` moves, `RR-P8` becomes
  due in the same change. It is free today because nothing has shipped, and that is the only reason.
- **Build & Deploy work** owns `shippedToPlayers` and is the only thing that can flip it. A publish
  may not proceed with an unexercised migration once that flag is true, and `release.rollback`'s
  revert-and-republish is what bounds my per-bump loss. The one-hour recovery granularity is the
  number both of us needed and neither of us should restate twice.
- **Area-layout work (`layout`) and area-authoring work (`depths`)** inherit a hard statement: a
  change to composition order, grid, seed, draw sequence, `patchCount` or `chunkCount` is a **save
  migration**, and it costs every player their current area's partial clearing.
- **Balance and tuning work** inherits the opposite and should be reassured by it: costs, growth
  rates, per-level factors, tier values, tier weights and every price move freely — `N1`, `N2` and
  `N6` — because nothing persisted is keyed by any of them.
- **Theme and vocabulary work** inherits `B4` and `B5`: renaming a Find or an upgrade id is a
  migration, while renaming an area label, a tier name or the currency is not.
- **Engagement, Funnels and Event Logging work** should note that `translate.carry` is now the whole
  persisted set minus `cleared` — no analytics field rides a migration, because no analytics field
  is persisted at all.
- **Whoever writes `game/test/`** inherits a named, currently-absent test with four asserts. It is
  the only thing that would convert "never executed" into "executed once."

## Acceptance criteria

1. `grep -rn "ArgaRuin_v1\|ArgaRuin_v2" game/src` returns nothing: no reader of any prior version
   exists while `shippedToPlayers` is false.
2. `grep -rn "GetVersionAsync\|ListVersionsAsync\|RemoveAsync" game/src` returns nothing.
3. `bumpTriggers` and `nonTriggers` are disjoint, total 15 rows, and every row names a contract key
   and field path that resolves in the merged manifest.
4. `translate.carry` and `translate.discard` are disjoint and their union is exactly the seven
   fields `stateShape` marks `persisted: true`.

## Not decided here

The store name and `storeVersionHistory` themselves — `architect/01-runtime`; RR-P8 names the field
and sets none of it. The persisted field list — `architect/03-state-shape`, which gains no field
from this domain: the `runOrdinal` request is withdrawn and **no run ordinal is available to anyone
from persisted state**, which is Funnels' `saveState` predicate to carry and not mine. The key
format, the retry schedule, the request budget, the payload bound and what a failed write does
inside a session — sheet 01, this domain, which holds `persistence`. The lock record that
`translate` refuses to carry — sheet 02, which holds `sessionLock`. Every patch and chunk count —
`solvency` and `depths`; I read them and set none. When a publish may proceed, the environment
split, the build version, the restart delay and the hotfix procedure — `cid/tech/deploy`, which
holds `release`. What the player is told if a migration goes wrong — `notices`; nothing here
requests a string.
