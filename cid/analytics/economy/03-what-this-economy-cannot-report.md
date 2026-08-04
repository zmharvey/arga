# 03 — What this economy cannot report

**Domain:** analytics/economy · **Category:** Analytics · **Wave:** 5

## Decision

**Of the five subjects this domain owns, two are dormant on one named external prerequisite, two
are structurally absent, and only faucet/sink volume and currency held are live.** ARPDAU and
payer share are **dormant** — the reading exists and returns a constant until
`products.items[span].gamePassId` is filled. Price elasticity and classical inflation are
**structurally absent** — no reading exists at all, and **ladder exhaustion is what replaces
inflation**, read by sheet `01`.

**All three sets are emitted as data.** The `amends` block below supplies
`economyHealth.dormant`, `.structurallyAbsent` and `.forbidden`; sheet `01` owns the key and no
longer carries placeholder strings for them. My first draft wrote these as markdown tables only,
which reached no builder — the wave's own rule, correctly turned on my sheet.

## Why

**Dormant is not thin and not excluded, and the distinction is the whole output.** A dormant
reading is specified, correct, and returns a constant for a stated reason with a stated
unblocking step. A structurally absent one has no correct form at any effort, so specifying one
would be inventing a dashboard that reads zero forever and calling it coverage. They are two
arrays rather than one because a dormant row has a `blockedBy` and a structurally-absent row has
none; merging them would make that field nullable and its check unenforceable.

**The half that is not about this game.** The creator dashboard supplies revenue, paying users,
ARPPU, ARPDAU and conversion rate — *"percent of daily active users who are also paying users"* —
with **no game-side instrumentation at all**
`[research: https://create.roblox.com/docs/production/analytics/monetization]`. So the dormancy is
not an instrumentation gap; there is nothing to instrument. It is gated instead: *"Any game with
more than 10 daily active users (DAU) and 10 play hours for 7 consecutive days is eligible for
accessing all KPIs on the dashboard"*
`[research: https://github.com/Roblox/creator-docs/blob/main/content/en-us/production/analytics/analytics-dashboard.md]`.
**A project whose stated success is *"shipped artifacts, not players"* `[brief: binding]` ←
`[you chose: R1 Q3]` may never clear that gate**, and if it does not, these two rows are
unavailable for a reason that has nothing to do with this design and cannot be fixed by any sheet.

**Price elasticity has no experiment and none may be designed.** `products.itemCount` is 1,
`products.devProductCount` is 0, `products.storeExists` is `false`,
`products.prompt.promptGamePassPurchaseCalls` is 0 under ruling R-4, and
`products.forbidden[F12]` forbids a discount, a strikethrough, a sale, a bundle and a
first-purchase bonus — so a second price point is forbidden and the surface a variant would be
shown on was removed. **One point on a demand curve is not a slope.** What the dashboard could
still show, once the id is filled and the gate cleared: revenue, paying users, ARPPU and
conversion **at the one price**. What it could not show, ever: any derivative of demand with
respect to price, any counterfactual, any A/B arm.

**And the claim that cannot be settled.** `products.items[span].factorStatus` makes two claims
`cid/gameplay/_verified-wave4.md` ruling 5 found false — *"1.95 is not the limit and area 2 is not
where it binds (the bay is, at 13.7%)"*. Both are arithmetic and are being corrected in Balance.
The residue is the taste half — whether 1.75 reads as an oversized tool at 499 R$ — and
**only a live price-to-value reading settles it, and it cannot be taken while `gamePassId` is
`null`.** Both halves stated, because reporting only the first would imply the field is fixed.

**Inflation in the classical sense has no referent here.** `economy.faucetCount` is 1,
`economy.sinkCount` is 1, `economy.balanceCap` is `null`, trading is priority 3, there is no
player-to-player price (`02-GAMEPLAY.md`, *"no mechanical interaction"* `[brief: soft]` ←
`[you accepted: R6 Q2]`) and `03-META.md` binds *"Never content access"*. There is no basket, no
second holder of value and no price level, so there is nothing for a currency to inflate against.
`_state.md` build note 5 adds that Luau drops an explicit nil, so a module cannot even distinguish
*"no cap"* from *"key never emitted"*. **The failure mode this economy actually has is ladder
exhaustion**, and it is real: the shipped ladder was bought out during area 4, which is why
`balance/03` exists. Sheet `01` reads it as `areaOrdinalAtLadderExhaustion` and
`unspentBalanceShare`.

**A note on why the prohibitions are written at all.** This domain is named for two goals
`00-CORE.md` declines — *"Beating the genre's retention curve. Offered and declined"* and
*"Revenue. Offered and declined"*, both `[brief: binding]` ← `[you chose: R1 Q3]`. Measuring both
is in scope; proposing a design change to move either is not. A prohibition list written as data
is how a reviewer tells that restraint from an omission, and how a merge can.

```manifest
{
  "amends": "economyHealth",
  "status": "proposed",
  "amendedBy": "cid/analytics/economy/03-what-this-economy-cannot-report.md",
  "value": {
    "dormant": [
      {
        "id": "arpdau",
        "reading": "Robux revenue per daily active user",
        "returnsConstant": 0,
        "reason": "every products.items[].gamePassId is null, so products.ownershipCheck (UserOwnsGamePassAsync) cannot return true and Entitlements resolves every product to not-owned for every player",
        "evidence": ["products.items[span].gamePassId", "products.externalPrerequisite", "game/src/server/Entitlements.luau"],
        "blockedBy": "products.externalPrerequisite",
        "unblockingChange": "the developer fills products.items[span].gamePassId with the id of a pass created on the creator site and priced to match priceRobux",
        "unblockingOwner": "creator-account provisioning work [currently the developer]",
        "gameSideInstrumentation": "none, ever",
        "readFrom": "the creator dashboard Monetization page",
        "platformGate": { "minDau": 10, "minPlayHours": 10, "consecutiveDays": 7, "note": "a project whose stated success is shipped artifacts, not players, may never clear this", "source": "https://github.com/Roblox/creator-docs/blob/main/content/en-us/production/analytics/analytics-dashboard.md" },
        "liveSignalOfUnblocking": "economyHealth.flows[*].customFields[entitlement] stops being constant 'none'"
      },
      {
        "id": "payerShare",
        "reading": "conversion rate, defined by the platform as the percent of daily active users who are also paying users, plus paying-user count and ARPPU",
        "returnsConstant": 0,
        "reason": "same as arpdau; products.itemCount is 1 and devProductCount is 0, so there is exactly one thing anyone could pay for and nobody can",
        "evidence": ["products.itemCount", "products.devProductCount", "products.storeExists"],
        "blockedBy": "products.externalPrerequisite",
        "unblockingChange": "the same single field",
        "unblockingOwner": "creator-account provisioning work [currently the developer]",
        "gameSideInstrumentation": "none, ever",
        "readFrom": "the creator dashboard Monetization page",
        "platformGate": { "minDau": 10, "minPlayHours": 10, "consecutiveDays": 7, "source": "https://github.com/Roblox/creator-docs/blob/main/content/en-us/production/analytics/analytics-dashboard.md" },
        "liveSignalOfUnblocking": "the same"
      }
    ],
    "structurallyAbsent": [
      {
        "id": "priceElasticity",
        "reason": "one item at one price with no store, no prompt and no variant, so no experiment exists and none may be designed",
        "evidence": ["products.storeExists false", "products.prompt.promptGamePassPurchaseCalls 0", "ruling R-4", "products.forbidden[F12]"],
        "whatTheDashboardCouldStillShow": ["revenue at the one price", "paying users", "ARPPU", "conversion rate"],
        "whatItCouldNeverShow": ["any derivative of demand with respect to price", "any counterfactual arm", "any A/B result"],
        "wouldRequire": "a second price point, which products.forbidden[F12] forbids, on a surface ruling R-4 removed",
        "unsettleableClaim": {
          "field": "products.items[span].factorStatus",
          "twoClaimsRuledFalse": "cid/gameplay/_verified-wave4.md ruling 5 — 1.95 is not the limit, and area 2 is not where it binds; the bay is",
          "residue": "whether 1.75 reads as an oversized tool at 499 Robux",
          "settledOnlyBy": "a live price-to-value reading",
          "cannotBeTakenWhile": "products.items[span].gamePassId is null",
          "consequence": "the field must keep a playtest-unknown status indefinitely rather than waiting on Analytics"
        },
        "replacedBy": null
      },
      {
        "id": "classicalInflation",
        "reason": "one faucet, one sink, no cap, no trade and no player-to-player price, so there is no basket and no price level for a currency to inflate against",
        "evidence": ["economy.faucetCount 1", "economy.sinkCount 1", "economy.balanceCap null", "03-META.md Never content access", "02-GAMEPLAY.md no mechanical interaction", "trading is priority 3"],
        "wouldRequire": "a second sink, a second currency, or a market between players, all of them forbidden or priority 3",
        "replacedBy": ["economyHealth.readings[areaOrdinalAtLadderExhaustion]", "economyHealth.readings[unspentBalanceShare]"],
        "replacementIsReal": "the shipped ladder was bought out during area 4, which is why balance/03 exists"
      }
    ],
    "forbidden": [
      { "id": "E1", "rule": "No comparative or player-visible economy figure: no ranking, no percentile, no top-clearer figure, no other player's balance, income or progress on any surface.", "closedBy": "theme/tone/04 X10; leaderboards are priority 3; social.forbidden X7", "observable": "zero economyHealth rows carry a surface field, and no player-facing string renders a figure derived from a second player" },
      { "id": "E2", "rule": "No metric defined over a login window, a streak, a daily period or an event calendar.", "closedBy": "03-META.md priority 3 (codes, daily rewards, seasons and events); OPEN.md section 2, ships and settles", "observable": "no readings[].window or balanceSeries field names a day, a streak, a login or a season; the only window in the key is a patch count" },
      { "id": "E3", "rule": "No metric defined over a reset cycle or an offline accrual period.", "closedBy": "03-META.md priority 3 (rebirth, offline accrual); 01-FOUNDATION.md, cleared is permanent", "observable": "no reading has a resetsAt field and no reading assumes balance falls other than by a sink event" },
      { "id": "E4", "rule": "No A/B price test, no second price point, no price variant, no discount, no bundle, no promotional arm.", "closedBy": "ruling R-4; products.forbidden[F12]; products.prompt.promptGamePassPurchaseCalls 0", "observable": "products.items has exactly one entry with exactly one priceRobux, and zero PromptGamePassPurchase calls exist in game/src" },
      { "id": "E5", "rule": "No design change proposed on the strength of a revenue or a retention reading.", "closedBy": "00-CORE.md non-goals, both brief-binding", "observable": "no readings[].routesTo and no KPI action in this domain names revenue or retention as its objective" },
      { "id": "E6", "rule": "No live tuning response: no reading writes a shipped value at runtime, and no alarm changes configuration without a sheet revision.", "closedBy": "OPEN.md section 2, ships and settles; specs are build artifacts and are never hand-edited", "observable": "every breach routing string in this domain begins with 'revision request', and zero rows name a runtime write or a remote-config read" },
      { "id": "E7", "rule": "No currency sink, credit, conversion or balance change is created to answer any reading in this domain.", "closedBy": "02-GAMEPLAY.md, solve duplicates without adding a currency; economy.sinkCount 1", "observable": "economy.faucetCount and economy.sinkCount both stay 1 in the merged manifest, and no economyHealth row proposes a flow record beyond the two in sheet 01", "scopeNote": "this forbids a currency response only. theme/fantasy/03's permission to consume or convert a duplicate Find is untouched and belongs to gameplay/systems." }
    ]
  }
}
```

## Consequences for other work

- **KPI work** may not headline `arpdau` or `payerShare`, and its own index reached the same
  conclusion. What it inherits from here is the *reason as data* — `blockedBy` naming
  `products.externalPrerequisite` and `platformGate` naming 10 DAU / 10 play hours / 7 consecutive
  days — so a row reading zero is distinguishable from one reading nothing. The verifier notes
  this gate sits beside `engagement.eligibilityGate`; the two are the same threshold and should
  not be published as two numbers.
- **Offer-ladder work** gets one thing it did not have: confirmation that
  `products.items[span].factorStatus`'s surviving claim is **not settleable by this pipeline**, so
  the field keeps a `[playtest unknown]` status indefinitely rather than waiting on Analytics.
- **The developer** owns the only unblocking action in this sheet, and it is one field. Named as a
  kind of work per `OPEN.md §4`'s convention: creator-account provisioning.
- **Balance and Tuning** inherits the replacement, not a request: inflation is not this economy's
  failure mode and ladder exhaustion is, so a currency cap, a decay or a soft cap answers a problem
  this game does not have. E7 forbids this domain from proposing any of them.
- **Systems work** keeps every duplicate answer on its table; E7's `scopeNote` says so in the data
  rather than only in prose.
- **Live-ops work (wave 7)** inherits E2 and E6 as data rather than as absence: no metric could
  trigger an event because there are none, and no alarm here may become one.

## Acceptance criteria

1. This sheet carries exactly one fenced block, its `amends` is `"economyHealth"`, it has no
   `provides` field, and `bridge` reports it as an amendment rather than a second claim on the key.
2. The block's `dormant` array has exactly 2 rows, `arpdau` and `payerShare`, each with
   `blockedBy: "products.externalPrerequisite"` and a `platformGate` carrying `minDau: 10`,
   `minPlayHours: 10` and `consecutiveDays: 7`.
3. The block's `structurallyAbsent` array has exactly 2 rows, `priceElasticity` and
   `classicalInflation`; `priceElasticity.replacedBy` is `null`; and `classicalInflation.replacedBy`
   names `economyHealth.readings[areaOrdinalAtLadderExhaustion]`.
4. The block's `forbidden` array has 7 rows, `E1` through `E7`, each with a non-empty `closedBy`
   and a non-empty `observable`.

## Not decided here

Whether any of these rows is a headline KPI, and every pass mark and verdict — KPI work, which
holds `kpis`. Which products exist, their prices and their factors — offer-ladder work, which
holds `products`; I read its fields and set none. The `gamePassId` itself — the developer, outside
this pipeline. The price-to-value ratio as a Balance figure — `balance/04`; mine is the live
reading that cannot be taken. Whether a currency cap, decay or second sink should exist —
`gameplay/systems` and `gameplay/balance`; I forbid only this domain from proposing one. D1/D7/D30
retention and session length, which arrive from the same dashboard pages — engagement and
`retentionReadout` work, which also holds `eligibilityGate`; I cite the same threshold and set it
in neither place. Whether the platform's age policy restricts what may be collected from an 8–14
audience — a sourced research obligation held by event-catalog work; every population in sheet
`01` inherits its answer. `[research owed: a Roblox data-collection or age-policy page stating
whether AnalyticsService readings are suppressed or aggregated differently for under-13 accounts]`
