# 03 — Clear prediction and reconciliation

**Domain:** tech/networking · **Category:** Tech & Data · **Wave:** 5

## Decision

The client predicts **one thing and nothing else: hiding a patch Instance in its own live bay** whose XZ distance to its own `HumanoidRootPart` is inside a radius it derives from the snapshot. **Confirmation is the server destroying that Instance**, which replicates on its own and needs no snapshot field and no new remote. An unconfirmed patch is **restored silently after 600 ms** by undoing the hide. The client **hides, never destroys** — a destroyed replica cannot be restored, because the server never re-replicates it.

## Why

**The snapshot cannot confirm a patch and never will.** It carries eight fields and none of them names a patch `[research: game/src/shared/Protocol.luau]`; `patches` and `cleared` are excluded deliberately as "hundreds of entries the HUD has no use for". So a reconciliation rule built on the snapshot needs a ninth field, which is `architect/05-interfaces`' and not mine to add. **The confirmation already exists and nobody had named it:** `clearPatch` calls `instance:Destroy()` on a server-created, server-owned part, and that destruction replicates to every client that has it `[research: game/src/server/Clearing.luau]`. The `Destroying` signal, or the instance's parent going nil, is a per-patch server confirmation that costs zero bytes of new protocol `[cid: decided]`.

**Hiding is forced by restorability.** If the client destroys its replica and the server did not clear the patch, the patch is gone locally forever — the server has no reason to re-send an Instance it never removed. So the predicted state must be reversible on the client alone. A client-side `Transparency` write to a server-replicated part is local and is only clobbered if the server writes that property, and nothing on the server writes patch `Transparency` after creation `[research: game/src/server/Plots.luau]`. `LocalTransparencyModifier` would be the more idiomatic instrument and is recorded as the alternative `[research owed: https://create.roblox.com/docs/reference/engine/classes/BasePart — whether LocalTransparencyModifier is writable on a server-replicated part from a LocalScript and whether it survives a server property write]`.

**The predictor's radius is derivable, with one hole.** The client can reconstruct upgrade levels from the snapshot's `upgrades` map and set-completion factors from its `found` map against `collection.sets[]`. It **cannot** see `owned`, which never crosses `[research: game/src/shared/Protocol.luau]`, so a `Span` owner's true radius is 1.75× the derived one — 36.04 studs against 20.6. Predicting at the derived value would leave a paid owner with a 15-stud annulus that clears on a full round trip while the inner disc clears instantly, so the one purchase in the game would make the game feel *worse* in the band it paid for.

**So the client widens on observation, and that is not an ownership assertion.** When the server destroys a patch that sits outside the client's current predict radius, the client raises the radius to that observed distance and keeps it for the session. It sends nothing, asserts nothing and names nothing: `economy.authority` forbids a client *message* carrying ownership, and this is a local render decision with no packet `[research: game/src/shared/GameConfig.luau]`. `products.F19` forbids naming, showing or pricing a product anywhere in the game, and a silently wider sweep names nothing. Latching is one-way and per-session; it is never lowered, because a lower observation is only evidence that no far patch happened to be in range.

**The economic half is never predicted, and `mechanics/05` already said so.** `patchClear` is "disappearance: client, predicted. Award and persisted state: server" with an 80 ms client budget and a 250 ms server-readout budget `[research: cid/gameplay/mechanics/05-response-contract.md]`. The `atPatch` cue fires on the prediction; the `readout` channel — the currency number — moves only when a snapshot moves it.

**A mispredicted clear leaves its cue standing, and that is accepted.** `response.negativeBeats` is 0 and `theme/tone/04` `D12` removes every way of signalling "that did not happen" `[research: cid/gameplay/mechanics/05-response-contract.md]`. So a restore is silent: the patch reappears, no sound, no notice, no retraction of the cue that already played. The alternative — delaying the cue to confirmation — costs the 80 ms budget, which is the whole reason prediction exists.

**The 600 ms restore wait is not a taste call.** The floor is one realised tick period plus a round trip: the server may not test this patch until its next pass (133 ms at the realised 0.1333 s `[research: cid/tech/performance/_lead.md]`) and the destruction then has to reach the client. The brief states no latency assumption anywhere for an audience it calls ~70% mobile, and that figure is itself recorded as uncorroborated, so p95 RTT is a guess. 600 ms = 133 + 2 × 200 + 67 of margin. Too short re-shows a patch that is about to vanish (visible flicker); too long leaves a phantom hole in the overgrowth. Both are observable in one session.

**Loss, duplication and reordering cost a predicted patch nothing.** Confirmation is instance replication, not the snapshot, so a dropped snapshot delays only the currency readout by one tick. `StateChanged` is a reliable `RemoteEvent` fired by two server-side originators on a single-threaded server, so out-of-order delivery on that channel is not reachable and no sequence number is needed. A duplicate snapshot is idempotent by `wiring`'s rule and by the whole-snapshot form sheet `01` fixes.

```manifest
{
  "provides": "prediction",
  "status": "proposed",
  "value": {
    "predictedThingCount": 1,
    "predicted": {
      "id": "patchHide",
      "beat": "patchClear",
      "what": "hide one patch Instance in the client's own live bay",
      "test": "squared XZ distance from the client's own HumanoidRootPart position to patch.Position <= predictRadiusStuds^2",
      "axis": "XZ only; height never affects reach, matching the server test",
      "runsOn": "RenderStepped or Heartbeat on the client, at the client's own frame rate, not on a copy of the server tick",
      "scope": "the client's own plot only; a neighbour's patches are never predicted",
      "mechanism": "set Transparency to 1 on the client's replica",
      "mechanismAlternative": "LocalTransparencyModifier = 1, preferred if it is writable on a replicated part from a LocalScript",
      "mechanismForbidden": "Destroy, Parent = nil, or any removal — a destroyed replica cannot be restored because the server never re-sends it",
      "cueFiresOn": "prediction, not confirmation",
      "cueBudgetMs": 80,
      "cueBudgetTestRangeMs": [40, 120]
    },
    "neverPredicted": [
      { "field": "currency",       "reason": "economy.authority: server only" },
      { "field": "clearedCount",   "reason": "server-decided; the readout budget is 250 ms and is measured from the server decision" },
      { "field": "found",          "reason": "relic grants must be server-side" },
      { "field": "areasFinished",  "reason": "area advance is a server latch and rebuilds a bay" },
      { "field": "areaPatchCount", "reason": "derived server-side from layout" },
      { "field": "areaLabel",      "reason": "derived server-side from layout" },
      { "field": "upgrades",       "reason": "levels move only through onPurchase" },
      { "field": "rowsRevealed",   "reason": "row lifts are latched server-side and never re-suppressed" },
      { "beat": "findReveal",      "reason": "server-decided, own channel" },
      { "beat": "setComplete",     "reason": "server-decided, own channel" },
      { "beat": "areaComplete",    "reason": "server-decided, own channel" },
      { "beat": "upgradePurchased","reason": "server-decided, own channel" },
      { "thing": "area advance and the bay rebuild", "reason": "plots.advance is a server act with instance consequences" },
      { "thing": "the tool head width",              "reason": "written by tool.refresh on the server" },
      { "thing": "any other player's patches",       "reason": "social.forbidden X7 and X10" }
    ],
    "predictRadius": {
      "source": "derived on the client from the snapshot; there is no other source",
      "derivation": "GameConfig.Movement.baseClearRadius, plus upgrades.radius level times the radius axis perLevel, times the product of set factors for every collection.sets[] entry whose relics are all true in the snapshot's found map, clamped at the radius axis ceiling",
      "invisibleTerm": "products.items[].factor — owned never crosses the wire, so a Span owner's true radius is 1.75x the derived value (36.04 against 20.6 studs at the merged ladder)",
      "invisibleTermHandling": "observationalWidening",
      "observationalWidening": {
        "trigger": "the server destroys a patch whose XZ distance from the client's own root at the moment of destruction exceeds predictRadiusStuds",
        "action": "raise predictRadiusStuds to that observed distance",
        "monotonic": true,
        "neverLowered": true,
        "neverLoweredReason": "a smaller observation is only evidence that no far patch was in range, not evidence the radius shrank",
        "resetOn": "client boot only",
        "clampedAt": "the radius axis ceiling from modifiers",
        "sendsAnything": false,
        "assertsOwnership": false,
        "assertsOwnershipReason": "no packet leaves the client; economy.authority forbids a client message carrying ownership and this is a local render decision"
      },
      "recomputedOn": "every snapshot, and on every observational widening"
    },
    "confirmation": {
      "source": "the patch Instance leaving the DataModel",
      "signal": "Instance.Destroying, or AncestryChanged with the instance no longer a descendant of game",
      "requiresSnapshotField": false,
      "requiresNewRemote": false,
      "bytesOfNewProtocol": 0,
      "why": "clearing calls instance:Destroy() on a server-owned part, which replicates without any message the game writes"
    },
    "restore": {
      "trigger": "a hidden patch whose Instance is still in the DataModel restoreAfterMs after it was hidden",
      "restoreAfterMs": 600,
      "restoreAfterMsTestRange": [400, 1200],
      "restoreAfterMsDerivation": "one realised tick period (133 ms at the realised 0.1333 s) + 2 x assumed p95 RTT (200 ms) + 67 ms margin",
      "p95RttAssumedMs": 200,
      "p95RttStatus": "[playtest unknown] — the brief states no latency or network-quality assumption anywhere",
      "action": "restore the authored Transparency",
      "silent": true,
      "cue": "none",
      "sound": "none",
      "notice": "none",
      "cueAlreadyPlayedIsRetracted": false,
      "closedBy": ["response.negativeBeats = 0", "theme/tone/04 D12", "input.rejectionCueOnFailedPrecondition = none"],
      "perPatchTimerStorage": "a client-local map from Instance to the clock value at which it was hidden, cleared on confirmation and on restore",
      "maxConcurrentHiddenPatches": "bounded by the patches inside one radius sweep; at radius 36 and depth-1 density about 40",
      "statusOfEveryFigure": "[playtest unknown]"
    },
    "networkFaults": [
      { "fault": "a StateChanged push is dropped", "costToAPredictedPatch": "none — confirmation is instance replication, not the snapshot", "costElsewhere": "the currency, count and progress readouts are one changed tick stale until the next push" },
      { "fault": "a StateChanged push is duplicated", "costToAPredictedPatch": "none", "costElsewhere": "none — the payload is a whole snapshot and every updater is idempotent" },
      { "fault": "two StateChanged pushes arrive out of order", "reachable": false, "why": "a reliable RemoteEvent fired by two originators on a single-threaded server delivers in order per channel; no sequence number is specified and none is needed" },
      { "fault": "the patch destruction is dropped", "reachable": false, "why": "instance replication is not a message the game sends and is not subject to this channel's loss" },
      { "fault": "the client predicts a clear the server never makes", "cost": "the patch is hidden for restoreAfterMs and then reappears, silently; the atPatch cue that already played is not retracted" },
      { "fault": "the server clears a patch the client did not predict", "cost": "the patch disappears on replication with no cue; acceptable, and it is the base-stat behaviour outside the predict radius before the first widening" }
    ],
    "budgets": {
      "clientAcknowledgmentMs": 80,
      "clientAcknowledgmentTestRangeMs": [40, 120],
      "serverReadoutMs": 250,
      "serverReadoutTestRangeMs": [150, 400],
      "serverReadoutFloorMs": 133,
      "serverReadoutFloorReason": "one realised clear tick at the realised 0.1333 s; at the realised 0.05 s it falls to 50 ms",
      "serverReadoutBudgetIsAtRiskWhen": "realised tick period + one-way latency exceeds 250 ms, which the realised 0.1333 s leaves 117 ms of room for",
      "source": "gameplay/mechanics/05 response.beats[patchClear]"
    },
    "revisionRequests": [],
    "revisionRequestsNote": "none — this rule was written specifically so that it needs no new snapshot field and no new remote; a rule that needed either would be a request against architect/05-interfaces or protocol.REMOTES rather than a value here"
  }
}
```

## Consequences for other work

- **Clear-feedback work (`response.beats[patchClear]`, `gameplay/mechanics`)** gets its 80 ms budget met on the client's own frame and inherits one case it must survive: a cue that has already played for a patch that comes back. Nothing may be built that assumes a played `patchClear` cue implies a paid clear.
- **VFX work (Art & Visuals)** inherits the same case, plus a hard constraint on the clear effect: the patch part must still exist while it is predicted-cleared, so the effect may not be parented to the patch in a way that requires the patch to be gone, and the residue lifetime (0.4 s) is shorter than the 600 ms restore wait.
- **Patch representation work (`representation`, `art/objects/01`)** must keep a patch's authored `Transparency` readable from the client at runtime, because the restore writes it back. A patch whose visibility is carried by anything other than `Transparency` — a `Decal`, a `SurfaceAppearance`, a mesh swap — breaks the hide and the restore together.
- **Position-authority work (`integrity.positionAuthority`, tech/security sheet 01)** should note that the client's predictor reads the client's own root position, which is exactly the value that sheet declares untrustworthy. That is safe here and only here: a client lying to its own predictor hides its own patches early and then watches them come back 600 ms later, and gains nothing, because no currency, count or Find follows a prediction.
- **Server-frame-cost work (`serverCost`)** gets one thing it can spend: at the realised 0.1333 s the server-readout budget has 117 ms of headroom, and at the realised 0.05 s it has 200 ms. Neither cadence breaks B5.
- **Store-surface work (`offerSurface`)** should know that a `Span` purchase becomes visible to the *predictor* only after the first far patch clears, so the first one to two clears after an ownership flip are unpredicted and land late. That is a real, small, silent artefact of `owned` not crossing the wire, and no surface may explain it.

## Acceptance criteria

1. A grep of `game/src/client/` for `:Destroy()` applied to any patch Instance returns zero matches.
2. The client's predicted-hide path writes exactly one property on the patch Instance, and the restore path writes the same property back to the value it read before hiding.
3. With the server's clearing loop stopped, a client walking over a patch hides it and the patch is visible again within 1,200 ms, with no sound and no GUI change in that interval.
4. The client module implementing this reads no snapshot field other than `upgrades` and `found`, and fires no remote.

## Not decided here

What the clear cue is made of, how long it lasts and how loud it is (Audio, Art — VFX, `gameplay/mechanics/05` for the budget). The clear radius base and per-level values (`movement`, `upgrades`). Whether the client's own position may be trusted for a *payout*, which it may not (`tech/security`, `integrity.positionAuthority`). The snapshot's field list and the remote inventory (`architect/05-interfaces`). The clear tick's value (`tech/performance`, `serverCost`). How many bytes a snapshot is and how often it is sent (sheet `01`, this domain). When `owned` is re-resolved (sheet `04`). What a player is shown about a purchase, which is nothing (`ui-ux/store`, `offerSurface`).
