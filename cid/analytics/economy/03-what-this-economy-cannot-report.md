# 03 — What this economy cannot report

**Domain:** analytics/economy · **Category:** Analytics · **Wave:** 5

## Decision

**Of the five subjects this domain owns, two are dormant on one named external prerequisite, two
are structurally absent, and only faucet/sink volume and currency held are live.** ARPDAU and
payer share are **dormant** — the reading exists and returns a constant until
`products.items[span].gamePassId` is filled. Price elasticity and classical inflation are
**structurally absent** — no reading exists at all, and **ladder exhaustion is what replaces
inflation**, read by sheet `01`.

**No manifest block.** These rows land in `economyHealth.dormant`, `.structurallyAbsent` and
`.forbidden`, which sheet `01` carries. The split into two arrays rather than the one my index
named is deliberate: a dormant row has a `blockedBy` and a structurally-absent row has none, and
one array would make that field nullable and unenforceable.

## Why

**Dormant is not thin and not excluded, and the distinction is the whole output.** A dormant
reading is specified, correct, and returns a constant for a stated reason with a stated
unblocking step. A structurally absent one has no correct form at any effort, so specifying one
would be inventing a dashboard that reads zero forever and calling it coverage.

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
`cid/analytics/economy/_lead.md` gap 4 records the same conclusion from the cap: `balanceCap` is
`null`, and `_state.md` build note 5 records that Luau drops an explicit nil, so a module cannot
even distinguish *"no cap"* from *"key never emitted"*. **The failure mode this economy actually
has is ladder exhaustion**, and it is real: the shipped ladder was bought out during area 4, which
is why `balance/03` exists. Sheet `01` reads it as `areaOrdinalAtLadderExhaustion` and
`unspentBalanceShare`.

**A note on why the prohibitions are written at all.** This domain is named for two goals
`00-CORE.md` declines — *"Beating the genre's retention curve. Offered and declined"* and
*"Revenue. Offered and declined"*, both `[brief: binding]` ← `[you chose: R1 Q3]`. Measuring both
is in scope; proposing a design change to move either is not. A prohibition list is how a reviewer
tells that restraint from an omission.

## Dormant — a reading exists, blocked on one named prerequisite

| id | reading | why it returns a constant | the single change that moves it | reads what once unblocked |
|---|---|---|---|---|
| `arpdau` | Robux revenue per daily active user | every `products.items[].gamePassId` is `null`, so `products.ownershipCheck` (`UserOwnsGamePassAsync`) cannot return true and `Entitlements` resolves every product to not-owned for every player | the developer fills `products.items[span].gamePassId` on the creator site — `products.externalPrerequisite`, *"a provisioning step, not an unfinished specification"* | the creator dashboard's Monetization page, with **zero game-side instrumentation**, above the 10 DAU / 10 play-hours / 7-consecutive-days gate |
| `payerShare` | conversion rate — *"percent of daily active users who are also paying users"* — and paying-user count | same; `products.itemCount` 1 and `devProductCount` 0, so there is exactly one thing anyone could pay for and nobody can | same | same page, same gate, plus ARPPU |

Both rows also carry `entitlement` as sheet `01`'s second custom field, which is **constant
`"base"` today**. That constant is itself the evidence: the day it stops being constant is the
day these two rows come alive, and no other signal in the game changes.

## Structurally absent — no reading exists at all

| id | why no reading exists | what would have to change | what replaces it |
|---|---|---|---|
| `priceElasticity` | one item, one price, no store, no prompt, no variant: `products.storeExists` false, `promptGamePassPurchaseCalls` 0, ruling R-4, `products.forbidden[F12]` forbids a second price. No experiment exists and **none may be designed** | a second price point, which F12 forbids, on a surface R-4 removed | nothing. `balance/_lead` reserves the price-to-value ratio as a Balance figure; the live confirmation of it is what cannot be taken |
| `classicalInflation` | one faucet, one sink, `balanceCap` null, no trade, no player-to-player price, *"Never content access"*. No basket and no price level, so nothing to inflate against | a second sink, a second currency, or a market between players — all forbidden or priority 3 | **ladder exhaustion**, read by `economyHealth.readings[areaOrdinalAtLadderExhaustion]` and `readings[unspentBalanceShare]` |

## Forbidden — the rows `economyHealth.forbidden` carries

| id | rule | closed by | observable |
|---|---|---|---|
| E1 | No comparative or player-visible economy figure: no ranking, no percentile, no "top clearer", no other player's balance, income or progress on any surface | `theme/tone/04` X10 *"measure freely, display none of it"*; leaderboards are priority 3; `social.forbidden` X7 | zero rows in `economyHealth` carry a `surface` field; no player-facing string renders a figure derived from a second player |
| E2 | No metric defined over a login window, a streak, a daily period or an event calendar | priority 3 — codes, daily rewards, seasons and events; `OPEN.md §2` *"Ships and settles. No seasons or events."* | no `readings[].window` or `balanceSeries` field names a day, a streak, a login or a season; the only window in the key is a patch count |
| E3 | No metric defined over a reset cycle or an offline accrual period | priority 3 — rebirth `[you chose: R2 Q2]`, offline accrual; `01-FOUNDATION.md` *"Cleared is permanent"* `[brief: binding]` ← `[you chose: R2 Q1]` | no reading has a `resetsAt` field; no reading assumes balance falls other than by a sink event; `economy.startingBalance` is read once at first join and never re-applied |
| E4 | No A/B price test, no second price point, no price variant, no discount, no bundle, no promotional arm | ruling R-4; `products.forbidden[F12]`; `products.prompt.promptGamePassPurchaseCalls` 0 | `products.items` has exactly one entry with exactly one `priceRobux`; zero `PromptGamePassPurchase` calls in `game/src/` |
| E5 | No design change proposed on the strength of a revenue or a retention reading | `00-CORE.md` non-goals, both `[brief: binding]` | no `readings[].routesTo` or KPI action names revenue or retention as its objective |
| E6 | No live tuning response: no reading writes a shipped value at runtime, and no alarm changes configuration without a sheet revision | `OPEN.md §2` *"ships and settles"*; specs are build artifacts and are never hand-edited | every breach in this domain routes as `"revision request against <sheet>"`; zero rows name a runtime write or a remote-config read |
| E7 | No currency sink, credit, conversion or balance change is created to answer any reading in this domain | `02-GAMEPLAY.md` *"solve duplicates without adding a currency"*; `economy.sinkCount` 1 | `economy.faucetCount` and `economy.sinkCount` both stay `1` in the merged manifest, and no `economyHealth` row proposes a flow record beyond the two in sheet `01` |

## Consequences for other work

- **KPI work** may not headline `arpdau` or `payerShare`, and its own index already reached the
  same conclusion. What it inherits from here is the *reason* as data — a `blockedBy` naming
  `products.externalPrerequisite` and a `platformGate` naming the 10 DAU / 7-day threshold — so a
  dashboard row that reads zero is distinguishable from one that reads nothing.
- **Offer-ladder work** gets one thing it did not have: confirmation that
  `products.items[span].factorStatus`'s surviving claim is **not settleable by this pipeline**.
  Whether 1.75 reads correctly is a live reading blocked behind a provisioning step nobody in the
  pipeline owns, so the field must keep a `[playtest unknown]` status indefinitely rather than
  waiting on Analytics.
- **The developer** owns the only unblocking action in this sheet, and it is one field. Named as
  a kind of work per `OPEN.md §4`'s convention: creator-account provisioning.
- **Balance and Tuning** inherits the replacement, not a request: inflation is not the economy's
  failure mode and ladder exhaustion is, so a currency cap, a decay or a soft cap answers a
  problem this game does not have. E7 forbids this domain from proposing any of them.
- **Systems work** keeps every duplicate answer on its table. E7 forbids a *currency* response
  and nothing else; `theme/fantasy/03`'s permission to consume or convert a duplicate `Find` is
  untouched.
- **Live-ops work (wave 7)** inherits E2 and E6 as data rather than as absence: there is no
  metric that could trigger an event, because there are none, and no alarm here may become one.

## Acceptance criteria

1. `economyHealth.dormant` has exactly 2 rows, `arpdau` and `payerShare`, each with
   `blockedBy: "products.externalPrerequisite"` and a `platformGate` naming 10 DAU, 10 play hours
   and 7 consecutive days.
2. `economyHealth.structurallyAbsent` has exactly 2 rows, `priceElasticity` and
   `classicalInflation`, and the `classicalInflation` row's `replacedBy` names
   `economyHealth.readings[areaOrdinalAtLadderExhaustion]`.
3. `economyHealth.forbidden` has 7 rows, `E1` through `E7`, each with a non-empty `closedBy` and
   a non-empty `observable`.
4. No row anywhere in `economyHealth` carries a `target` whose subject is revenue or retention,
   and every breach routing string in the key begins with `"revision request"`.

## Not decided here

Whether any of these rows is a headline KPI, and every pass mark and verdict — KPI work, which
holds `kpis`. Which products exist, their prices and their factors — offer-ladder work, which
holds `products`; I read its fields and set none. The `gamePassId` itself — the developer, outside
this pipeline. The price-to-value ratio as a Balance figure — `balance/04`; mine is the live
reading that cannot be taken. Whether a currency cap, decay or second sink should exist —
`gameplay/systems` and `gameplay/balance`; I forbid only this domain from proposing one. D1/D7/D30
retention and session length, which arrive from the same dashboard pages — engagement work.
Whether the platform's age policy restricts what may be collected from an 8–14 audience — a
sourced research obligation held by event-catalog work; every population in sheet `01` inherits
its answer. `[research owed: a Roblox data-collection or age-policy page stating whether
AnalyticsService readings are suppressed or aggregated differently for under-13 accounts]`
