# 04 — Ownership authority

**Domain:** tech/networking · **Category:** Tech & Data · **Wave:** 5

## Decision

Ownership is **server-resolved only**, by `entitlements` calling `products.ownershipCheck`, written to `state.owned` and nowhere else, never persisted, and **never asserted, hinted at or acknowledged by any client message**. An in-server re-resolution trigger **does exist**: `entitlements.refresh` runs again on a **180-second per-player timer**, staggered by `UserId`, and `owned[id]` is **monotonic within a session** — it may go false→true and never true→false. A flip to true sends **zero packets**; it reaches the player through `tool.refresh` and the next clearing tick.

## Why

**I am overruling my own lead index's central finding.** It ruled that no in-server re-resolution trigger exists, because `UserOwnsGamePassAsync` "caches per player per server for the session". Its evidence is an open devforum feature request with no staff reply — and that thread is not in the research pack, so I could not cite it even if I agreed. The first-party source is in the pack and says something different, verbatim: *"If the user purchases a game pass outside of the experience while remaining in the same session, the cache is eventually updated, but this process might take several minutes to propagate"* `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/reference/engine/classes/MarketplaceService.yaml]`. That is the source `create.roblox.com`'s reference page is generated from, and it also states that the results are cached and that the cache updates when a purchase prompt closes.

**Both claims can be true, and here is exactly how.** "Cached" and "eventually updated" are both properties of a cache with a refresh, and the pack's second source says only *"Currently Roblox will cache the results of `UserOwnsGamePassAsync`"* with rejoining as the *common workaround* — it never says the cache is immortal `[research: https://devforum.roblox.com/t/do-not-cache-results-of-userownsgamepassasync/3639404]`. The feature request my lead read asks for the cache to be invalidated *when `PromptGamePassPurchaseFinished` fires*, i.e. for an **immediate** update on the in-experience path; the documentation says that path already updates immediately. So the request is about latency, not permanence, and neither source supports "re-polling returns the join-time answer forever". **Documentation beats an unanswered feature request, and the ruling is: a re-poll works, on an unbounded window the platform calls several minutes.** `[cid: decided]`

**The Store UI lead read the same page and reached the same conclusion, and I am ratifying it rather than re-deriving it** `[research: cid/ui-ux/store/_lead.md]`. Its sheet 02 asks for exactly this and explicitly routes the interval, the retry shape and the rate budget to ownership-resolution work. Those three values are what this sheet supplies.

**The other half of my lead's finding stands.** `PromptGamePassPurchaseFinished` fires only for a prompt the experience raised `[research: https://create.roblox.com/docs/reference/engine/classes/MarketplaceService]`, `products.F13` forbids every `PromptGamePassPurchase` call in the build, and no in-experience event fires for a website purchase `[research: https://devforum.roblox.com/t/new-event-marketplaceservicewebsite-gamepasspurchaseplayer-gamepassid/1157069]`. So there is no **event** trigger. A **poll** is the only trigger, and it is sufficient.

**180 seconds, staggered.** One product exists `[research: https://create.roblox.com/docs/production/monetization/game-passes]`, so a poll is one web call per player. At 16 players that is 0.089 calls/s server-wide, which is negligible against any plausible `MarketplaceService` budget; and against an unbounded "several minutes" propagation window a 180-second poll adds at most 180 seconds of detection latency to a delay the platform already owns. Staggering the phase by `UserId % 180` matters more than the interval does: sixteen players joining inside the first thirty seconds would otherwise poll in a burst forever. A 10–20 minute session `[brief: binding]` gets 3 to 6 polls.

**Monotonic within a session, and this is a change to the shipped rule.** `Entitlements.luau` resolves a failed check to NOT OWNED, which is correct at join because there is no prior answer `[research: game/src/server/Entitlements.luau]`. Under a poll loop the same rule silently **revokes** a paid multiplier on one transient `MarketplaceService` error. `products.F20` reads ownership live every join anyway, so the cost of monotonicity is bounded at one session for a genuinely refunded pass; the cost of the alternative is a player who paid watching their sweep shrink with no explanation, in a game whose `response.negativeBeats` is 0 and whose every explanatory surface is forbidden. `[cid: decided]`

**A flip to true sends nothing, and that is not an oversight.** `owned` never crosses the wire, so the snapshot is byte-identical before and after `[research: game/src/shared/Protocol.luau]`. `Modifiers.effective` reads `state.owned` fresh on every clearing tick, so the radius applies on the next tick with no apply step `[research: game/src/server/Clearing.luau]`. The only thing that needs a push is the tool head, and `wiring.onPurchase` step 4 already calls `tool.refresh` unconditionally *for exactly this reason* `[research: architect/sheets/07-wiring.md]`. `UpgradeApplied` must not fire: it is the acknowledgment for an upgrade purchase, `products.F19` forbids any surface acknowledging a product, and `theme/tone/03` `B4` forbids a notice for a purchase at all.

**The client cannot assert ownership at any latency and there is no field for it to try.** The client surface is two channels, checked at load: `RequestState` takes zero arguments and `BuyUpgrade` takes one upgrade id `[research: game/src/shared/Protocol.luau]`. Neither has a field capable of carrying a product id, so "the client tells the server it bought something" is not merely forbidden by `economy.authority` — it is unrepresentable.

**The `HttpService` inventory-endpoint route is recorded and not needed.** I could not fetch an endpoint reference and no official page was found, so whether it bypasses the engine cache is `[unverified]`. Under this ruling it is unnecessary, which is the right outcome: it is recorded as an alternative nobody has to design around rather than as a route that is known to work.

## Pushing back

I am overruling `cid/tech/networking/_lead.md`, which instructed sheet 04 to record as named data that **"no in-server re-resolution trigger exists under the shipped rule set"** and that the effective contract is "a purchased factor applies from the player's next join". Both are wrong. The lead's own research table marks its supporting source as a feature request with **no staff reply**, and that thread is absent from `cid/_research/pack.md`. The first-party generation source for the `MarketplaceService` reference page is in the pack and states the opposite. I am also correcting `cid/_state.md` build note 4 by the same evidence, and issuing RR-N4 against the lead index so the record is not left standing.

## Flagged to the developer

`03-META.md` fixes what may be sold and is silent on **when a purchased multiplier starts applying**. Three live answers, and I recommend the second. (a) Next join — the shipped behaviour, simplest, and it means a paying player gets nothing for the rest of a session they may not return from. (b) A 180-second poll, silently applied — costs one timer and 0.089 web calls/s at 16 players, and bounds the wait at the platform's propagation window plus 180 s. (c) Relax `products.F13` so the game raises the prompt itself, which the documentation says updates the cache immediately — the fastest answer, and it costs the R-4 ruling and every prohibition riding on it. I recommend (b) and have specified it; (c) is the offer ladder's and the developer's, not mine.

```manifest
{
  "provides": "ownershipAuthority",
  "status": "proposed",
  "value": {
    "authority": {
      "resolvedBy": "server only, via entitlements",
      "method": "products.ownershipCheck (MarketplaceService:UserOwnsGamePassAsync)",
      "writtenTo": "state.owned",
      "writers": ["entitlements"],
      "writerCount": 1,
      "persisted": false,
      "persistedForbiddenBy": "products.F20",
      "readBy": ["modifiers.effective, on every clearing tick", "tool.refresh, for the head width"],
      "crossesTheWire": false,
      "clientMayAssertOwnership": false,
      "clientMayHintAtOwnership": false,
      "clientMayAcknowledgeOwnership": false,
      "clientChannelsCapableOfCarryingAProductId": 0,
      "clientChannelsCapableOfCarryingAProductIdWhy": "RequestState takes zero arguments and BuyUpgrade takes one upgrade id checked against GameConfig.Upgrades; Protocol.luau asserts the client surface is exactly those two at require time",
      "closedBy": ["economy.authority", "input.clientOriginatedRemotes", "products.F20"]
    },
    "resolutionPoints": [
      { "when": "wiring.onJoin step 2", "before": "the publish point", "yields": true, "required": true },
      { "when": "every refreshIntervalSeconds thereafter, while the state is in the live collection", "yields": true, "required": true, "newInThisSheet": true }
    ],
    "reResolution": {
      "triggerKind": "poll",
      "eventTriggerExists": false,
      "eventTriggerAbsentBecause": "PromptGamePassPurchaseFinished fires only for a prompt the experience raised, and products.F13 forbids every PromptGamePassPurchase call in the build; no in-experience event fires for a website purchase",
      "pollWorks": true,
      "pollWorksBecause": "the ownership cache is eventually updated for an out-of-experience purchase in the same session, on a window the platform documents only as 'several minutes'",
      "propagationWindowSeconds": null,
      "propagationWindowStated": "several minutes, with no bound, distribution or retry recommendation published",
      "propagationWindowStatus": "[playtest unknown] — settled only by timing a real purchase against a live pass",
      "refreshIntervalSeconds": 180,
      "refreshIntervalTestRange": [60, 600],
      "refreshIntervalStatus": "[playtest unknown]",
      "phaseStagger": "UserId % refreshIntervalSeconds, so sixteen joins inside thirty seconds do not poll in a burst",
      "maxInFlightCallsPerPlayer": 1,
      "maxCallsPerPlayerPerInterval": 1,
      "serverWideCallsPerSecondAt16Players": 0.089,
      "pollsPerSessionAt10To20Minutes": [3, 6],
      "stopsWhen": "the state leaves the live collection at wiring.onLeave step 1",
      "runsDuringRespawnDelay": true,
      "detectionLatencyWorstCaseSeconds": "the platform propagation window plus refreshIntervalSeconds"
    },
    "monotonicity": {
      "withinSession": "owned[id] may go false -> true and never true -> false",
      "reason": "a transient MarketplaceService error would otherwise revoke a paid multiplier mid-session, and response.negativeBeats is 0 with every explanatory surface forbidden",
      "correctedAt": "the next join, which re-reads from scratch per products.F20",
      "costAccepted": "a genuinely refunded pass keeps its factor for at most the remainder of one session",
      "changesShippedBehaviour": true,
      "shippedBehaviourToday": "a failed check resolves to NOT OWNED and is not retried"
    },
    "failureHandling": {
      "call": "pcall, result type-checked before use",
      "onFailure": "leave owned[id] at its current value; never write false over a true",
      "onFailureAtJoin": "resolve to false — there is no prior value and not-owned never grants an unpaid factor",
      "retry": "by the next poll only; no retry loop on the join path",
      "retryReasonForNoLoop": "a retry loop on the join path is how a MarketplaceService outage turns into a room of players with no character",
      "warnsAtMostOncePerPlayerPerSession": true,
      "warnsPerAttempt": false,
      "blocksJoin": false,
      "errors": false
    },
    "onFlipToTrue": {
      "packetsSent": 0,
      "stateChangedPush": false,
      "stateChangedPushWhy": "owned never crosses the wire, so the snapshot is byte-identical before and after the flip",
      "upgradeAppliedFire": false,
      "upgradeAppliedFireWhy": "it is the acknowledgment for an upgrade purchase; products.F19 forbids any surface acknowledging a product and theme/tone/03 B4 forbids a purchase notice",
      "serverSideEffects": [
        { "order": 1, "module": "tool", "fn": "refresh(player, state)", "does": "re-resolve the head width from modifiers.effective(state, 'radius'); this is the only visible consequence" },
        { "order": 2, "module": "server-main", "does": "re-write humanoid.WalkSpeed from modifiers.effective(state, 'speed') only if a product on the speed axis flipped; no shipped product is on that axis" }
      ],
      "clearRadiusAppliesFrom": "the next clearing tick, with no apply step, because modifiers.effective reads state.owned fresh on every tick",
      "playerFacingSurface": "none",
      "playerFacingSurfaceForbiddenBy": ["products.F19", "ruling R-4", "input.rejectionCueOnFailedPrecondition = none"],
      "predictorConsequence": "the client's predict radius does not widen until the first patch clears outside it; see prediction.predictRadius.observationalWidening"
    },
    "conditionsUnderWhichAFasterTriggerBecomesAvailable": [
      { "id": "C1", "change": "relax products.F13 so the experience raises its own prompt", "effect": "PromptGamePassPurchaseFinished fires and the documentation states the cache updates when the prompt closes, making application immediate", "cost": "reopens ruling R-4 and the F13 and F19 prohibition rows", "owner": "the offer ladder (products), then the developer", "status": "sourced" },
      { "id": "C2", "change": "read the Roblox inventory endpoint over HttpService", "effect": "would bypass the engine cache if the endpoint is authoritative", "status": "[unverified]", "settledBy": "an Open Cloud or inventory API reference for game-pass ownership by user id; search results assert it works and no official page was fetched", "recommendation": "not needed under this ruling and not designed around" }
    ],
    "revisionRequests": [
      { "id": "RR-N4", "against": "cid/tech/networking/_lead.md", "asks": "strike the ruling that no in-server re-resolution trigger exists and that a purchased factor applies from the next join", "because": "its source is an open devforum feature request with no staff reply and is absent from the research pack, while the first-party MarketplaceService generation source in the pack states an out-of-experience purchase propagates to the cache in the same session" },
      { "id": "RR-N5", "against": "cid/_state.md build note 4", "asks": "restate 'a mid-session pass purchase does not apply until rejoin' as 'applies within the platform propagation window plus ownershipAuthority.reResolution.refreshIntervalSeconds'", "because": "the same evidence" },
      { "id": "RR-N6", "against": "architect/sheets/07-wiring.md", "asks": "add a twelfth phase, onOwnershipRefresh, calling entitlements.refresh on the interval above with the two server-side effects listed in onFlipToTrue, and state that it fires no remote", "because": "entitlements.refresh today documents itself as called once per join and never again, and a timer with no phase has no owner" },
      { "id": "RR-N7", "against": "game/src/server/Entitlements.luau and whoever owns the entitlements module", "asks": "change 'resolves to NOT OWNED' on a failed check to 'leaves the current value' once the poll exists, and warn at most once per player per session rather than once per failure", "because": "under polling the shipped rule revokes a paid factor on one transient error" }
    ]
  }
}
```

## Consequences for other work

- **Offer-ladder work (`products`)** gets its `F13` cost priced: keeping the prohibition costs the platform's several-minute window plus 180 seconds; relaxing it makes application immediate. It owns C1 and I do not decide it. It also gains a field it did not have — the answer to "when does a purchased factor start applying" — which `03-META.md` never states.
- **Store-surface work (`offerSurface.pendingPurchase`, UI/UX)** is ratified and unblocked with its three missing numbers: interval 180 s, one in-flight call per player, and a detection latency of the propagation window plus 180 s. Its "nothing appears on any surface" is correct and is now correct for a *bounded* wait rather than an unbounded one.
- **Whoever owns `entitlements` and `server-main` (`architect`, `modules` and `wiring`)** inherits RR-N6 and RR-N7: a twelfth phase and a one-line change to the failure rule. Neither adds a `PlayerState` field and neither fires a remote.
- **Snapshot work (sheet `01`, this domain)** is confirmed unaffected: an ownership flip produces zero bytes on `StateChanged`, so nothing in the outbound budget moves.
- **Prediction work (sheet `03`, this domain)** inherits the one visible artefact: after a flip the client's predict radius is stale until the first patch clears outside it, so one or two clears land late and silently. No surface may explain it.
- **Build & Deploy work (`release`)** inherits the ordering consequence it was already told to wait for: the three null `gamePassId`s may now be created, because the re-resolution question is answered rather than open.
- **Security work (`integrity`)** gains nothing to validate here and should not invent it: there is no inbound ownership message to check, because there is no field one could ride on.

## Acceptance criteria

1. A grep of `game/src/` for `PromptGamePassPurchase`, `PromptProductPurchase` and `ProcessReceipt` returns zero matches.
2. `MarketplaceService` is referenced in exactly one file, `game/src/server/Entitlements.luau`, and `state.owned` is assigned in exactly one function.
3. With a mocked ownership check that returns `false` then `true`, `modifiers.effective(state, "radius")` rises within `refreshIntervalSeconds + 1` of the flip, and the count of `FireClient` calls made in that interval is zero.
4. With a mocked ownership check that returns `true` then errors, `state.owned` still holds `true` after the next poll, and exactly one `warn` was emitted for that player.

## Not decided here

Which products exist, their prices, factors and the `F13`/`F19`/`F20` prohibitions themselves (`gameplay/monetization/01`, which holds `products`). Whether `F13` is relaxed (that sheet, then the developer). What a player is shown about a purchase, which is nothing (`ui-ux/store`, `offerSurface`). How a factor composes with set bonuses and the ladder, and where it clamps (`gameplay/systems/06`, `modifiers`). The tool head's geometry at any width (`gameplay/mechanics/04`, `tool`, and Art & Visuals). Creating the game passes and sequencing the operational step (`tech/deploy`, `release`). Whether an incoming message is valid (`tech/security`, `integrity`). The snapshot's bytes and cadence (sheet `01`), the ingress ceilings (sheet `02`), and the predictor's radius derivation (sheet `03`), all this domain.
