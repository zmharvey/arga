# 03 — The purchase read

**Domain:** analytics/funnels · **Category:** Analytics · **Wave:** 5

## Decision

**The first-purchase funnel has zero observable in-game steps.** All six steps a conventional
purchase funnel would carry are closed by an approved prohibition or a platform fact, each named
below. **One live reading exists** — the join-time ownership boolean `Entitlements.refresh` writes
to `state.owned` — and it is **specced-but-dormant**, a structural constant while every
`products.items[].gamePassId` is `null`.

> **Revised, round 1** (`cid/analytics/_verified.md` RR-10): the ownership dimension is encoded
> `owned ["none","span"]`, adopted from `telemetry.customFields.field02`. **Round 2:** five
> acceptance criteria become four; no row, closure or conclusion moves in either round.

## Why

**This is a negative finding and it is written as data, because a negative finding folded into a
step table becomes a footnote.** The category brief pre-ratifies it: *"Expect a lead that spends
most of its sheets on onboarding and one short sheet stating precisely why the purchase funnel is a
join-time ownership read."* What makes the sheet useful is not the conclusion but the six rows, each
carrying the specific rule that closes it — so that if a purchase surface is ever proposed, the
reader sees exactly which prohibition has to be reopened and by whom.

**The closure is over-determined, and that is the honest description.** Ruling R-4 removed the
in-game store; `products.storeExists` is `false` and `purchaseSurface` is *"the Roblox experience
page"*; `products.prompt.method` is `null` with `promptGamePassPurchaseCalls: 0`; `F13` forbids any
prompt in any path; `F19` forbids a product being *"named, shown, priced or referred to anywhere
inside the game"*; `F20` forbids persisting any purchase-derived state. **Any one of these alone
removes at least two steps.** Reopening one does not reopen the funnel.

**The two platform facts, and one of them is `[unverified]` and stays that way.**
`UserOwnsGamePassAsync` results are cached, and *"If the user purchases a game pass outside of the
experience while remaining in the same session, the cache is eventually updated, but this process
might take several minutes to propagate"*
`[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/reference/engine/classes/MarketplaceService.yaml]`,
corroborated developer-side
`[research: https://devforum.roblox.com/t/do-not-cache-results-of-userownsgamepassasync/3639404]`.
`PromptGamePassPurchaseFinished(player, gamePassId, wasPurchased)` exists and is documented as
firing when a purchase prompt closes
`[research: https://create.roblox.com/docs/reference/engine/classes/MarketplaceService]` — but the
first-party pages **state no triggering condition**, so *"an experience-page purchase fires no
server-side event"* is `[unverified]` as a first-party claim. **Networking work and store-UI work
are ruling on the same fact and disagree**, so I carry the tag rather than assert the mechanism.
**It changes no row here**: the game calls no prompt at all under `F13`, so no prompt-completion
event can fire whatever the trigger turns out to be. The fetch that settles it is the
`MarketplaceService.yaml` description field for that event, or a staff reply naming the trigger.

**The one reading, precisely bounded.** `Entitlements.refresh` builds `state.owned` once per join
and *"never again — not on respawn, not on purchase (there is no in-game purchase), and not on a
timer"* `[research: game/src/server/Entitlements.luau]`. It is not persisted (`F20`) and it is not
one of the eight snapshot fields, so it never crosses the wire. **What it can be attributed to:**
that this player owned the pass at the instant of this join. **What it cannot:** when they bought
it, whether they bought it during this session, whether they bought it because of anything the game
did, or whether a mid-session purchase has taken effect — under the cache behaviour above and
`Entitlements`'s once-per-join contract, a mid-session purchase applies only at the *next* join,
which is a different session from the purchase. `cid/_state.md` build note 4 records the same
conclusion from the design side.

**And it reads a constant today.** Every `gamePassId` is `null`, so `ownsProduct` resolves false
with no web call at all. `products.externalPrerequisite` names the provisioning step and its owner
(*"the developer, or whoever holds the Roblox creator account"*). **Dormant is not excluded**: the
reading is specced, the population is defined, and it returns one value until an id is filled.

**The consequence is larger than this sheet.** `pacing` publishes **ten `milestones[]` rows, each
with a `baseSeconds` and a `purchaserSeconds`**. The purchaser column is defined over `spanOwners`,
which is definable and **empty**. So the dormancy suspends **the purchaser half of ten instruments,
not one** — and `01`'s `owned` custom field is spent on a dimension that reads `none` for every
session until the id exists. Spending it anyway is deliberate, and verification ruled the same way:
the field costs nothing while constant, and **a reading taken without the split cannot be re-split
later**, so adding it on the day the id is filled would put a discontinuity across the whole 90-day
retention window.

**No purchase surface is proposed here, and none may be inferred from this sheet.** Sheet `04`'s
`forbiddenActions[]` includes an in-game store by name, so a dormant reading cannot be argued into a
reason to build one.

| # | conventional step | what it would observe | closed by | evidence a check can read |
|---|---|---|---|---|
| 1 | offer impression | the product was rendered where a player could see it | `products.storeExists: false`; `F19` | no `products[].label` and no `priceRobux` value appears in any string the game renders |
| 2 | offer opened | a store, shop tab or detail view was opened | ruling R-4; `products.purchaseSurface` is the Roblox experience page, outside the game process | zero screens, patterns or briefs name a store, shop or offer row |
| 3 | prompt shown | `PromptGamePassPurchase` was called | `products.prompt.method: null`, `promptGamePassPurchaseCalls: 0`; `F13` | zero `PromptGamePassPurchase` calls anywhere in the build, in any path |
| 4 | prompt accepted or dismissed | `PromptGamePassPurchaseFinished` fired with `wasPurchased` | it fires on completion of a prompt the experience raised, and zero are raised. `[unverified]` that an experience-page purchase raises nothing server-side | zero connections to `PromptGamePassPurchaseFinished` in the build |
| 5 | purchase completed | the transaction succeeded | same as 4, plus `UserOwnsGamePassAsync` is cached and an out-of-experience purchase propagates over *"several minutes"* | the only ownership call site is `Entitlements.ownsProduct`, reached once per join |
| 6 | effect applied | the multiplier began to act on this player's stats | `F20` forbids persisting ownership; `Entitlements.refresh` runs once per join and not on purchase | the save payload contains no pass id, no product id and no purchase-sourced factor |

| the one live reading | value |
|---|---|
| what | `state.owned[itemId]`, a boolean per `products.items[]` entry |
| written by | `Entitlements.refresh(player, state)`, `game/src/server/Entitlements.luau` |
| cadence | once per join. Not on respawn, not on purchase, not on a timer |
| persisted | no — `F20` |
| on the wire | no — not one of the eight snapshot fields |
| population | every session (`allSessions`); the derived split is `spanOwners` / non-owners |
| carried as | `funnels.customFields[owned]`, values `none` / `span`, shared with `telemetry.customFields.field02` |
| attributable to | this player owning the pass at the instant of this join |
| **not** attributable to | purchase time, purchase during this session, any in-game cause, or a mid-session purchase taking effect |
| status | **specced-but-dormant** — `products.externalPrerequisite` |
| reads today | `none`, for every player, resolved with no web call because `gamePassId` is `null` |

```json
{
  "amends": "funnels",
  "value": {
    "purchase": {
      "isFunnel": false,
      "observableSteps": 0,
      "reason": "Ruling R-4 removed the in-game store. There is no surface, no prompt and no in-game transaction, so there is no ordered sequence of in-game states for a player to drop off between. This is a closed finding, not an unfinished specification.",
      "proposesNoSurface": true,
      "steps": [
        { "ordinal": 1, "id": "offerImpression", "wouldObserve": "the product was rendered somewhere a player could see it", "observable": false, "closedBy": ["products.storeExists == false", "products.forbidden[F19]"], "check": "no products[].label and no priceRobux value appears in any string the game renders" },
        { "ordinal": 2, "id": "offerOpened", "wouldObserve": "a store, shop tab or product detail view was opened", "observable": false, "closedBy": ["coordinator ruling R-4", "products.purchaseSurface == 'the Roblox experience page'"], "check": "zero screens, ui-forge patterns or briefs name a store, shop or offer row" },
        { "ordinal": 3, "id": "promptShown", "wouldObserve": "MarketplaceService:PromptGamePassPurchase was called", "observable": false, "closedBy": ["products.prompt.method == null", "products.prompt.promptGamePassPurchaseCalls == 0", "products.forbidden[F13]"], "check": "zero PromptGamePassPurchase calls anywhere in the build, in any path" },
        { "ordinal": 4, "id": "promptAccepted", "wouldObserve": "PromptGamePassPurchaseFinished fired with wasPurchased true or false", "observable": false, "closedBy": ["products.forbidden[F13] — the event is documented as firing when a prompt the experience raised closes, and zero are raised"], "unverified": "that a pass bought on the Roblox experience page raises no server-side event at all. First-party pages document PromptGamePassPurchaseFinished(player, gamePassId, wasPurchased) and state no triggering condition. Networking work and store-UI work are ruling on the same fact and disagree. This does not change the row: with zero prompts raised, no prompt-completion event can fire whatever the trigger is.", "settledBy": "the MarketplaceService.yaml description field for PromptGamePassPurchaseFinished in github.com/Roblox/creator-docs, or a Roblox staff reply naming the trigger", "check": "zero connections to PromptGamePassPurchaseFinished in the build" },
        { "ordinal": 5, "id": "purchaseCompleted", "wouldObserve": "the Robux transaction succeeded", "observable": false, "closedBy": ["products.forbidden[F13]", "UserOwnsGamePassAsync results are cached and an out-of-experience same-session purchase propagates over 'several minutes'"], "source": "https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/reference/engine/classes/MarketplaceService.yaml", "check": "the only ownership call site in the build is Entitlements.ownsProduct, reached once per join" },
        { "ordinal": 6, "id": "effectApplied", "wouldObserve": "the purchased multiplier began acting on this player's stats", "observable": false, "closedBy": ["products.forbidden[F20]", "Entitlements.refresh runs once per join and not on purchase"], "note": "a mid-session purchase applies at the NEXT join, which is a different session from the purchase", "check": "the save payload contains no pass id, no product id and no purchase-sourced factor" }
      ],
      "liveReading": {
        "id": "ownedAtJoin",
        "field": "state.owned[itemId]",
        "type": "boolean per products.items[] entry",
        "writtenBy": "server/Entitlements.luau :: Entitlements.refresh",
        "cadence": "once per join",
        "persisted": false,
        "onTheWire": false,
        "population": "allSessions",
        "derivedSplit": ["spanOwners", "nonOwners"],
        "carriedAs": "funnels.customFields[owned]",
        "encoding": ["none", "span"],
        "encodingSharedWith": "telemetry.customFields.field02",
        "attributableTo": "that this player owned the pass at the instant of this join",
        "notAttributableTo": ["when the pass was bought", "whether it was bought during this session", "any in-game cause", "whether a mid-session purchase has taken effect"],
        "readableToday": true,
        "constantToday": "none"
      },
      "status": "specced-but-dormant",
      "dormantUntil": "products.externalPrerequisite",
      "dormancyOwner": "the developer, or whoever holds the Roblox creator account",
      "dormancyCause": "every products.items[].gamePassId is null, so Entitlements.ownsProduct resolves false with no web call and the reading is a structural constant",
      "suspendedInstruments": {
        "count": 10,
        "what": "the purchaserSeconds column of every pacing.milestones[] row",
        "why": "purchaserSeconds is defined over the spanOwners population, which is definable and empty",
        "alsoSuspends": ["funnels.customFields[owned] as a discriminating dimension"],
        "note": "the owned field is emitted anyway from day one; it costs nothing while constant, and a reading taken without the split cannot be re-split later, so adding it on the day the id is filled would put a discontinuity across the whole 90-day retention window"
      }
    }
  }
}
```

## Consequences for other work

- **Number-and-curve work (Balance)** inherits the fact that the purchaser half of `pacing`'s ten
  milestone rows cannot be measured at all, in any wave, until an id is provisioned. Every
  `purchaserSeconds` figure stays a derivation checked against a derivation. That is not an argument
  to delete the column; it is an argument for saying so beside it.
- **Economy-flow work (Analytics — Economy Health)** should read this sheet's `liveReading` block as
  the definition and not restate it: payer share and ARPDAU are structurally zero for the same
  single cause, and two keys carrying two descriptions of one boolean is the divergence to avoid.
- **Event-catalog work** and this sheet share one encoding for one dimension,
  `owned ["none","span"]`. A funnel-step breakdown and a custom-event breakdown join with no mapping
  table.
- **Networking work and store-UI work** are ruling on the `[unverified]` above and disagree. The tag
  here is deliberately not a vote. Whichever way it lands, no row in this sheet moves.
- **Offer-ladder work (`products`)** is contradicted by nothing here. No surface, no prompt and no
  store is proposed, and `04` forbids one as a threshold action.
- **Dashboard-and-target work (KPI)** already declined DAU, ARPDAU and payer share as structurally
  constant; this sheet is the derivation behind that, and `04`'s `T17` alarm on this reading is the
  one purchase-side number that can move — as a build defect, not as a player behaviour.

## Acceptance criteria

1. `funnels.purchase.steps[]` has exactly 6 entries, `observableSteps` is 0, every entry has
   `observable: false` and a non-empty `closedBy` array, and `funnels.purchase.isFunnel` is `false`.
2. Exactly one step carries an `unverified` field and it is `promptAccepted`; that field names the
   fetch that would settle it in `settledBy`.
3. `funnels.purchase.suspendedInstruments.count` equals the number of `pacing.milestones[]` rows
   carrying a `purchaserSeconds` field; `funnels.purchase.liveReading.encoding` is identical to both
   `funnels.customFields[owned].values` and `telemetry.customFields.field02`'s values; and the string
   `ownsSpan` appears inside no `manifest` or `amends` block under `cid/analytics/`.
4. No file in `cid/analytics/funnels/` names a purchase surface, a store screen, an offer row, a
   price string or a `PromptGamePassPurchase` call as something to build.

## Not decided here

Which products exist, their axis, factor and price (`gameplay/monetization/01`, which holds
`products`). What may never be sold and the `F1`–`F20` rows themselves (`gameplay/monetization/02`).
The inequalities bounding a purchase (`gameplay/monetization/03`). Whether the `[unverified]`
trigger claim is true (networking work and store-UI work, who disagree; the settling fetch is named
in the block). Payer share, ARPDAU and price-to-value as readings (economy-flow work). The custom
field's event-side name and position (event-catalog work; I adopt its encoding and set no id).
Whether a purchase surface is ever built — nobody, under R-4; reopening it is a revision against
`monetization/01` and `mechanics/02`. The `gamePassId` value itself
(`products.externalPrerequisite`, the developer's). The pass mark and alarm on the one live reading
(`04`, this domain).
