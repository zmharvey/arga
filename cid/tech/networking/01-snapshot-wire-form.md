# 01 — Snapshot wire form

**Domain:** tech/networking · **Category:** Tech & Data · **Wave:** 5

## Decision

A snapshot crosses `StateChanged` as **one shallow Luau table, the single argument to `FireClient`**, carrying exactly the eight fields `protocol.snapshotShape()` names and no ninth, with `upgrades`, `rowsRevealed` and `found` passed as the **live** `PlayerState` tables and serialised at the call. **464 bytes uncompressed at the shipped content**, one push per player per *changed* tick and none on an unchanged pass. The snapshot derivation gets **exactly one definition in the build**, exported as `protocol.buildSnapshot(state)`; the two private copies that exist today are a defect.

## Why

**Four keys, not one, and the reason in one line:** `replication`, `ingressLimits`, `prediction` and `ownershipAuthority` are read by four different builders at four different call sites (`clearing`'s push, `server-main`'s `OnServerEvent`, the client's shadow test, `entitlements`), and the merger refuses only duplicate proposals `[cid: decided]`. My lead's index states the same reason and I keep it.

**The form is fixed, the fields are not mine.** Channel name, class, direction and the eight field names are `architect/05-interfaces`' `[research: architect/sheets/05-interfaces.md]`, so `UnreliableRemoteEvent` is not available to me and its documented ~900-byte cap is recorded as a fact I may not act on `[research owed: https://devforum.roblox.com/t/incorrect-size-of-data-being-sent-limit-specified-when-using-unreliableremoteevent/3048788 — the staff reply carrying the 900-byte figure and the base64+zstd compression statement. Fetched by my lead and absent from the research pack.]`

**Live tables, not copies.** `FireClient` serialises synchronously at the call and Luau is single-threaded, so no mutation can interleave between the call and the serialisation `[research: game/src/server/Clearing.luau]` — the shipped comment already argues this. Three defensive table copies per push would cost 120 allocations/s at 16 players and buy nothing. The price of keeping it is that the rule **forbids a deferred or queued send**: a snapshot may not be built on one tick and fired on another, and no caller may retain the returned table after `FireClient` returns.

**The `found` map is 48.5% of every push and it never changes.** 24 keys, 127 characters of names, 24 booleans — 225 B of 464. `wiring.onJoin` step 1 fills missing `found` and `rowsRevealed` keys with `false` before the first push `[research: architect/sheets/07-wiring.md]`, so **the 164 B fresh-save floor is unreachable in the shipped build**: every snapshot from the first one is full size. Deltaing it needs a new channel or a new field, both of which are architect's, so it is recorded as a cost and not taken.

**Every byte total here is an upper bound and none of them is a clean fetch.** The per-type table (blank call 9 B, string len+2, number 9, boolean 2, table 2) came back HTTP 403 on two direct attempts and through archive.org; the figures are a search index's rendering of that page. `[research owed: https://ffrostfall.net/stuff/list/remoteevents/ from an unblocked client]` Roblox also compresses remote payloads in transit, and the `found` map is 24 constant strings and 24 mostly-identical booleans — close to the best case for a dictionary coder. So the totals are `[playtest unknown]`; the instrument that settles them is a `Stats.DataSendKbps` differential taken across a counted number of pushes in Studio `[research owed: https://create.roblox.com/docs/reference/engine/classes/Stats — the page lists the property and states neither what it measures nor on which side]`.

**The rate is Performance's, the cost is mine.** The server heartbeat is capped at 60 Hz `[research: https://github.com/Roblox/creator-docs/blob/main/content/en-us/performance-optimization/identify.md]` and `task.wait` resumes on the next Heartbeat `[research: https://create.roblox.com/docs/scripting/scheduler]`, so `Clearing.luau`'s `task.wait(Config.ClearTickRate)` realises `ceil(d × 60) / 60` `[research: game/src/server/Clearing.luau]`. I cost the realised periods — 0.1333 s and 0.05 s — and state no tick preference. Balance's requested 0.04 is cited from an unreleased stage (`cid/gameplay/_verified-wave4.md` line 3) and is named by its realised value, never by its requested one.

**The producer has no owner and the two copies have already drifted.** `init.server.luau` and `Clearing.luau` each hold a private `buildSnapshot`; only the latter warns on a field that is neither a state field nor a derivation it knows `[research: game/src/server/init.server.luau]` `[research: game/src/server/Clearing.luau]`. `interfaces` exposes no snapshot builder, so nothing is violated today — but `areaPatchCount` and `areaLabel` are derived twice and must agree, or the progress readout means different things depending on which originator pushed it. `protocol` is the right home: it already owns `snapshotShape()` and states both derived fields' definitions in its own comment, and `Layout` requires only `GameConfig` and `Types`, so `protocol → layout` is acyclic `[research: game/src/shared/Layout.luau]` `[cid: decided]`.

```manifest
{
  "provides": "replication",
  "status": "proposed",
  "value": {
    "channel": "StateChanged",
    "channelOwnedBy": "architect/05-interfaces; this key fixes only what crosses it and how often",
    "payload": {
      "form": "one shallow Luau table, the single argument to FireClient",
      "argumentCount": 1,
      "fieldCount": 8,
      "fieldsAreExactly": "protocol.snapshotShape()",
      "extraFieldsPermitted": 0,
      "maxNestingDepth": 2,
      "nestedTables": ["upgrades", "rowsRevealed", "found"],
      "nestedTablesCrossAs": "the live PlayerState tables, not copies",
      "copyBeforeSend": false,
      "copyBeforeSendReason": "FireClient serialises synchronously at the call and Luau is single-threaded, so no mutation can interleave",
      "snapshotMayBeRetainedAfterFireClientReturns": false,
      "deferredOrQueuedSendPermitted": false,
      "carriesPlayerIdentifier": false,
      "carriesPlayerAuthoredString": false,
      "carriesPerPatchData": false,
      "carriesOwnedMap": false
    },
    "byteCost": {
      "model": "pre-compression upper bound",
      "perTypeBytes": { "blankRemoteCall": 9, "stringLengthPlus": 2, "number": 9, "boolean": 2, "table": 2 },
      "perTypeSourceStatus": "NOT A FETCH — HTTP 403 twice including via archive.org; figures from a search index's rendering. See researchOwed.",
      "components": [
        { "part": "remote call overhead",            "keysCounted": 9,   "keysFree": 9 },
        { "part": "outer table",                     "keysCounted": 2,   "keysFree": 2 },
        { "part": "the eight field-name keys",       "keysCounted": 97,  "keysFree": 0 },
        { "part": "currency (number)",               "keysCounted": 9,   "keysFree": 9 },
        { "part": "upgrades (table + 3 keys + 3 numbers)",     "keysCounted": 51,  "keysFree": 29 },
        { "part": "rowsRevealed (table + 3 keys + 3 booleans)","keysCounted": 30,  "keysFree": 8 },
        { "part": "found (table + 24 keys, 127 chars + 24 booleans)", "keysCounted": 225, "keysFree": 50 },
        { "part": "areasFinished (number)",          "keysCounted": 9,   "keysFree": 9 },
        { "part": "clearedCount (number)",           "keysCounted": 9,   "keysFree": 9 },
        { "part": "areaPatchCount (number)",         "keysCounted": 9,   "keysFree": 9 },
        { "part": "areaLabel (string, \"East Terrace\", 12 chars)", "keysCounted": 14, "keysFree": 14 }
      ],
      "totalWorstCaseBytesKeysCounted": 464,
      "totalWorstCaseBytesKeysFree": 148,
      "totalFreshSaveBytesKeysCounted": 164,
      "freshSaveIsUnreachable": true,
      "freshSaveIsUnreachableBecause": "wiring.onJoin step 1 fills missing found and rowsRevealed keys with false before the first push, so all 24 found keys are present from the first snapshot",
      "typicalEqualsWorstCase": true,
      "typicalVarianceBytes": [462, 466],
      "typicalVarianceSource": "areaLabel length only; every other component is constant across a session",
      "foundMapShareOfWorstCase": 0.485,
      "foundMapChangesAfterFill": "values only, never keys; 24 keys re-cross on every push",
      "status": "[playtest unknown]",
      "settledBy": "a Stats.DataSendKbps differential across a counted number of pushes in Studio; Roblox compresses remote payloads, so the measured figure will be lower and the 464 is a bound"
    },
    "sendRule": {
      "perPlayerPerChangedTick": 1,
      "perPlayerPerUnchangedTick": 0,
      "changedMeans": "any of currency, clearedCount, found or areasFinished was written during this tick's pass, or the area advanced",
      "wholeSnapshot": true,
      "deltaEncoding": false,
      "idempotent": true,
      "coalescingAcrossTicks": "forbidden",
      "fireAllClients": "forbidden on this channel — social.forbidden X7",
      "additionalPushes": [
        { "when": "wiring.onJoin step 7", "firedBy": "server-main" },
        { "when": "wiring.onSpawn step 8", "firedBy": "server-main" },
        { "when": "wiring.onPurchase step 5, on success only", "firedBy": "server-main" }
      ],
      "pull": { "channel": "RequestState", "class": "RemoteFunction", "firedBy": "client-main once per boot", "reply": "the same eight fields, built by the same producer" },
      "pushOnOwnershipChange": false,
      "pushOnOwnershipChangeReason": "owned never crosses the wire, so an ownership flip changes no snapshot byte; see 04-ownership-authority"
    },
    "outboundBudget": {
      "computedAt": { "maxPlayers": 16, "source": "architect runtime.maxPlayers" },
      "cadences": [
        { "requestedTickSeconds": 0.12, "realisedTickSeconds": 0.1333, "ceilingSendsPerSecondPerPlayer": 7.5,  "ceilingBytesPerSecondPerPlayer": 3480,  "ceilingBytesPerSecondAt16": 55680 },
        { "requestedTickSeconds": 0.04, "realisedTickSeconds": 0.05,   "ceilingSendsPerSecondPerPlayer": 20,   "ceilingBytesPerSecondPerPlayer": 9280,  "ceilingBytesPerSecondAt16": 148480 },
        { "requestedTickSeconds": 0.0333, "realisedTickSeconds": 0.0333, "ceilingSendsPerSecondPerPlayer": 30, "ceilingBytesPerSecondPerPlayer": 13920, "ceilingBytesPerSecondAt16": 222720 }
      ],
      "realisedPeriodRule": "ceil(requested * 60) / 60; nothing between 0.0334 and 0.05 is reachable",
      "realisedPeriodOwnedBy": "tech/performance serverCost; this key costs both and prefers neither",
      "steadyStateSendsPerSecondPerPlayerAtBaseStats": 0.85,
      "steadyStateDerivation": "one depth-1 lap is 140 patches over ~165 s, so a moving base-stat player produces a changed tick roughly 0.85 times a second and the 7.5 ceiling is a 9x overestimate",
      "steadyStateApproachesCeilingWhen": "the swept area per tick exceeds one patch spacing; at max ladder (radius 36, speed 30.7) about 2.9 patches clear per 0.1333 s tick, so nearly every tick is a changed tick",
      "status": "[playtest unknown]"
    },
    "otherServerToClientChannelCost": [
      { "channel": "FindRevealed",   "bytesWorstCase": 23, "frequency": "collection.relicsPerArea times per area" },
      { "channel": "SetCompleted",   "bytesWorstCase": 18, "frequency": "4 times per playthrough" },
      { "channel": "AreaRestored",   "bytesWorstCase": 23, "frequency": "once per area" },
      { "channel": "UpgradeApplied", "bytesWorstCase": 26, "frequency": "once per successful purchase" }
    ],
    "otherChannelShareOfTotal": "under 0.2% of outbound bytes at any cadence; not budgeted separately",
    "producer": {
      "definitionsInBuildToday": 2,
      "definitionsPermitted": 1,
      "locationsToday": ["game/src/server/init.server.luau", "game/src/server/Clearing.luau"],
      "haveAlreadyDrifted": true,
      "driftToday": "only the Clearing copy warns on a field that is neither a PlayerState field nor a derivation it knows",
      "proposedHome": "protocol.buildSnapshot(state) -> snapshot",
      "homeReason": "protocol already owns snapshotShape() and both derived fields' definitions; Layout requires only GameConfig and Types, so protocol -> layout is acyclic",
      "callers": [
        "server-main, wiring.onJoin step 7",
        "server-main, wiring.onSpawn step 8",
        "server-main, wiring.onPurchase step 5",
        "server-main, RequestState OnServerInvoke",
        "clearing, wiring.onTick step 1 clause (5)"
      ],
      "derivedFields": {
        "areaPatchCount": "layout.areaSpec(state.areasFinished + 1).patchCount",
        "areaLabel": "layout.areaSpec(state.areasFinished + 1).label"
      },
      "unknownFieldBehaviour": "warn once per field name for the life of the server, never once per tick, and send nil"
    },
    "revisionRequests": [
      {
        "id": "RR-N1",
        "against": "architect/sheets/05-interfaces.md",
        "asks": "add one entry, protocol.buildSnapshot(state) -> snapshot, beside protocol.snapshotShape(), naming the two derived fields and the five callers above",
        "because": "the producer of the wire form has no owner in the interface table, two private copies exist, and they already differ"
      },
      {
        "id": "RR-N2",
        "against": "architect/sheets/07-wiring.md",
        "asks": "state in onJoin step 7, onSpawn step 8, onPurchase step 5, boot step 7 and onTick step 1 clause (5) that the snapshot comes from protocol.buildSnapshot and from no local function",
        "because": "the phase list says 'push a snapshot' and never says who derives it"
      },
      {
        "id": "RR-N3",
        "against": "cid/_research/pack.md and whoever regenerates it",
        "asks": "bank the six sources cid/tech/networking/_lead.md records as fetched; none of them is in the pack, so four load-bearing facts in this sheet cannot be cited and are carried as [research owed:]",
        "because": "a lead that fetches into a table of bare URLs is not parsed by cid:research, and cid:verify fails a citation the pack lacks"
      }
    ],
    "researchOwed": [
      { "what": "per-type wire costs", "url": "https://ffrostfall.net/stuff/list/remoteevents/", "status": "403 twice, including via archive.org" },
      { "what": "remote payload compression and the UnreliableRemoteEvent 900-byte cap", "url": "https://devforum.roblox.com/t/incorrect-size-of-data-being-sent-limit-specified-when-using-unreliableremoteevent/3048788", "status": "fetched by the lead, absent from the pack" },
      { "what": "what Stats.DataSendKbps measures and on which side", "url": "https://create.roblox.com/docs/reference/engine/classes/Stats", "status": "fetched by the lead, absent from the pack; the page describes neither" }
    ]
  }
}
```

## Consequences for other work

- **Server-frame-cost work (`serverCost`, tech/performance sheet 02)** gets the network half of the tick decision as a cost and not an opinion: 55.7 kB/s at the realised 0.1333 s, 148.5 kB/s at the realised 0.05, 222.7 kB/s at the only reachable value under 0.04. Nothing here prefers a tick.
- **Whoever owns `clearing`'s loop shape (`architect`, `modules`)** inherits the send rule verbatim: one `FireClient` per player per changed tick, zero on an unchanged pass, and **no deferral**. A bucketed or spread tick that fires a player's snapshot on a different frame from the pass that changed it breaks the live-table rule and must copy instead.
- **Whoever executes RR-N1** owns a one-function move, not a redesign: both copies already produce the identical eight fields; only the warn differs, and the exported one keeps it.
- **Persistence work** is untouched and should stay so: nothing here adds a persisted field, and `found`'s wire cost is a consequence of the load-time fill, not of the save format.
- **Client HUD and index work** may assume every push is whole and idempotent, so a dropped push costs one tick of staleness and never a wrong value; and may **not** assume a snapshot ever names a patch, an owned product, or another player.
- **Store-surface work (`offerSurface`)** gets a hard fact: an ownership flip produces **zero** bytes on `StateChanged`, because the snapshot is byte-identical before and after. Its "applied silently through the existing state snapshot" needs the tool-head path in sheet 04, not this channel.

## Acceptance criteria

1. `game/src/shared/Protocol.luau` exports `buildSnapshot`, and a grep for `local function buildSnapshot` across `game/src/` returns **zero** matches.
2. Every `StateChanged` `FireClient` call site in `game/src/server/` passes exactly one argument, and that argument is the return of `protocol.buildSnapshot`.
3. A snapshot table produced at a fresh save has exactly 8 keys, and `#Protocol.snapshotShape() == 8`; a test that adds a ninth key to the produced table fails.
4. In `Clearing.tick`, the `StateChanged` `FireClient` is inside the `if changed then` branch and there is no second `FireClient` on that channel in the function.

## Not decided here

The channel name, class, direction and the eight field names (`architect/05-interfaces`). The clear tick's value and the cost of the scan (`tech/performance`, `serverCost`). Whether an incoming message is valid (`tech/security`, `integrity`). How many client messages the server will read (sheet `02`, this domain). What the client does between a predicted clear and its confirmation (sheet `03`). Whether `owned` is re-resolved during a session (sheet `04`). DataStore traffic (`tech/persistence`). Whether `found` should be deltaed, which needs a channel or a field neither of which is mine (`architect`).
