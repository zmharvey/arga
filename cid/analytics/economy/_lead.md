# Economy Health — domain index

**Category:** Analytics · **Wave:** 5 · Reads: `HANDOFF.md`, `CONCEPT.md`, `00-CORE.md`,
`01-FOUNDATION.md`, `02-GAMEPLAY.md`, `03-META.md`, `04-PRESENTATION.md`, `OPEN.md`;
`cid/analytics/_category.md`; `cid/_contract.md`, `cid/_state.md`, `cid/_research/pack.md`;
`cid/gameplay/balance/_lead.md` and `02`–`05`; `cid/gameplay/_verified-wave4.md`;
`cid/gameplay/systems/04-earning-and-spending.md`, `05-the-find-ledger.md`;
`cid/gameplay/monetization/01-the-offer-ladder.md`; `cid/gameplay/meta/01-the-area.md`;
`game/src/server/Clearing.luau`, `Progression.luau`, `Entitlements.luau`,
`game/src/shared/Protocol.luau`; `bridge/schema.mjs`.

---

## What the brief gave me

Every line below is quoted from the source brief, not from my category brief.

| constraint | tag |
|---|---|
| *"**One currency.**"* — faucet *"clearing overgrowth, scaled by tier"*, sink *"clearing-speed upgrades"* (`02-GAMEPLAY.md`) | `[brief: soft]` ← `[you accepted: R5 Q3 → R4 Q3]` |
| *"**Known consequence — duplicates have no sink.** … **solve duplicates without adding a currency.**"* (`02-GAMEPLAY.md`) | `[brief: soft]` ← same answer |
| *"**Permanent multipliers only. Never content access.**"* · *"**Forbidden:** any paid area, relic, or set."* (`03-META.md`) | `[brief: soft]` ← `[you accepted: R5 Q4]` |
| *"Left open — the SKU ladder, price points, and where a premium item sits"* (`03-META.md`) · *"**The premium SKU has no home.**"* (`OPEN.md §6`) | stated hole |
| *"The reference sells only 2x multipliers plus a 2,500-Robux oversized tool, zero cosmetics, across 38M visits at a 96% like ratio."* (`03-META.md`) | `[research: research/grass-incremental.md]` |
| *"Success is **shipped artifacts, not players**"* · non-goals *"Beating the genre's retention curve"* and *"**Revenue.** Offered and declined"* (`00-CORE.md`) | `[brief: binding]` ← `[you chose: R1 Q3]` |
| *"**The economy is the only thing worth cheating.** Clearing and currency awards must be server-validated"* (`04-PRESENTATION.md`) | `[I assumed — not interviewed]`, and `OPEN.md` calls Integrity *"the least defensible"* of the zero-question items |
| *"**Cleared is permanent** — overgrowth never returns."* (`01-FOUNDATION.md`) | `[brief: binding]` ← `[you chose: R2 Q1]` — progress is monotonic; no economy reading may assume a reset or a decay |
| Measurement default: *"Three things: (1) did a first-session player reveal a relic … (2) average time to complete an area … (3) set-completion rate per set"* (`OPEN.md §2`) | `[brief: soft]` ← `[I assumed — §2 default]`. **None of the three is an economy subject.** The brief asks for zero currency measurement. |
| Priority 3: *"real procedural generation · rebirth · offline accrual · codes · daily rewards · leaderboards · trading · seasons and events"* (`03-META.md`) | ordering `[I assumed]`; rebirth `[you chose: R2 Q2]`, offline accrual follows `[you chose: R2 Q1]` |
| Approved wave 1, binding here: *"**Measure freely, display none of it**"* — `theme/tone/04` `X10` | approved spec |

**Scope gate, applied.** Nothing in my subject is priority 3, and my subject is not entirely
priority 3. The three live temptations are refused by name in sheet `03`: no comparative or
player-visible economy figure (leaderboards), no metric defined over a login window or a streak
(dailies/seasons), and no metric defined over a reset cycle or time-away accrual (rebirth /
offline). Naming them to exclude them is the compliant form.

---

## What the brief did not give me

Named and routed. Not filled.

1. **The brief asks for no economy measurement at all.** `OPEN.md §2`'s three subjects are
   onboarding, area pacing and set completion; `OPEN.md §5` row 8 lists measurement among four
   items *"batched by design"* at **0 interview questions**. Whether currency is measured, and
   with what, is entirely `[cid: decided]`. → **01**.
2. **No unit, no population and no pass mark for any measurement.** Same `[I assumed]` default.
   → **01** sets units and populations; the **verdict rule** (ship/no-ship pass marks) is
   KPI-shortlist work, not mine, and I state that boundary rather than inventing a pass mark.
3. **The brief says nothing about what may be collected from an 8–14 audience**, and
   `04-PRESENTATION.md`'s Integrity section is `[I assumed — not interviewed]`. Every population
   I define is bounded by that answer. → **event-catalog work** (currently Analytics — Event
   Logging), as a sourced research obligation; relayed here so **01** does not assume it.
4. **`economy.balanceCap` is `null`** (`systems/04`) and `_state.md` build note 5 records that
   Luau drops an explicit nil, so a module cannot distinguish "no cap" from "key never emitted".
   The brief never mentions a cap. **"Inflation warning threshold" therefore has no design
   referent in the usual sense.** → **03**, which says what replaces it.
5. **Nobody has said what happens when a reading contradicts a published figure.** The brief
   declines revenue and retention as goals and `OPEN.md §2` says the game *"ships and settles"*,
   so there is no live-ops loop to feed. → **03** states the routing rule (a breach becomes a
   revision request against the owning sheet, never a live tuning change).
6. **The one empirical reading this project has — 2026-08-01, developer, n = 1, four
   confirmations-by-feel including *"shard values felt right"* — is recorded in no sheet, no
   `cid/` file and no `docs/` file.** That is the closest thing to an economy datum in existence
   and my sheets cannot cite it. → **run-state work** (currently whoever holds `cid/_state.md`).
   Named so verification does not read its absence as my omission.
7. **`social.maxPlayers` inside 12–20 is still assigned to nobody** (`02-GAMEPLAY.md`,
   `[I assumed — no source]`; `_state.md` records `architect` has picked 16). It is the
   denominator of any per-server economy figure. → **per-server-capacity work** (currently
   Tech & Data, this wave). **01** may define no per-server aggregate until it lands.

---

## Why 3 sheets

**I own no key in the 25-key contract, and I propose exactly one: `economyHealth`.** By the
one-sheet-per-key rule that is one sheet, and one sheet is right for the currency half —
`AnalyticsService:LogEconomyEvent` carries `amount` and `endingBalance` in the *same call*
`[research: https://create.roblox.com/docs/reference/engine/classes/AnalyticsService]`, so the
faucet/sink volume record and the currency-held series are one decision, not two, and splitting
them would be one decision described twice. The other two sheets are rule-2 sheets, each
justified by that same key and each carrying no manifest block: **02** is a zero-tolerance
reading rule over a counter whose measured thing belongs to `discovery`, not to the economy, and
whose emission does not exist in the build; **03** is a prohibition — four of the five parts of
my `owns` cannot be supplied at all, and the required output is to say so as data with the
reason rather than to spec a dashboard that reads zero forever. That is the same split
`gameplay/monetization` used, where `01` carries `products` including its `forbidden` array and
`02` writes and justifies the rows. **A fourth sheet would have to be a second manifest on one
key, which the merger rejects**, so the count is bounded from above by the key and from below by
three decisions that can each be independently wrong.

| # | sheet | must decide |
|---|---|---|
| 01 | `currency-flow-and-holdings` | Supply the key `economyHealth`. Decide the two economy-flow records (one source, `economy.faucets[patch-clear]`; one sink, `economy.sinks[upgrade-purchase]`) as arguments to `AnalyticsService:LogEconomyEvent` — `currencyType` (take `currency`'s name verbatim from that key, do not coin one), `flowType`, `transactionType` from the default enum (`IAP`/`TimedReward`/`Onboarding`/`Shop`/`Gameplay`/`ContextualPurchase`), `itemSku`, and the **three** custom fields (values must be strings, ≤ 8,000 unique combinations across all three), spending that budget on the dimensions that make Balance's predictions separable rather than on anything else. Decide the **emission granularity for the faucet with the arithmetic shown**: the clear tick pays per patch and `solvency` requests a 0.04 s tick against areas of up to four figures of patches, so per-clear emission is a volume decision, not a default — state the events-per-player-per-lap figure for whichever you choose. Decide the balance series: its sample points, its unit, and its population. Then decide, as named rows, the derived readings and the alarm band on each, every one stated as *the field it refutes* and never as a copied number: realised expected value per patch against `tierMix.byDepth[d].expectedValuePerPatch`; realised area-1 level-0 yield against `gameplay/meta/01` acceptance criterion 3's 700–1,200 band; realised cumulative clearing income at area 7 against `solvency.ladderTotal` (this is the solvency ratio, and making it readable in production is the highest-value row on the sheet); realised rungs bought per area against `solvency.areaLedger[].rungsBought` and its `>= 4` invariant; ladder fraction bought at 24/24 against `solvency.ladderBoughtAtCollectionComplete`; wall-clock to ladder exhaustion against `pacing.milestones[ladderExhausted]`; and duplicate-reveal volume, whose expected value and alarm sheet `02` fixes. Every alarm is `[playtest unknown]` with a starting value and a test range, or `[research: url]`. Carry the `dormant` and `forbidden` arrays sheet `03` writes the rows of. **Wave 4 is FAIL and has not released** (`cid/gameplay/_verified-wave4.md`, sixteen requests, RR-1 moves `solvency`'s totals and RR-9/RR-10 move `pacing` rows): cite sheet and field for every predicted value and state which readings move if the corresponding revision lands. |
| 02 | `duplicate-and-defect-volume` | Decide how duplicate volume is read, given that `discovery.repeat.possible` is **false** and `systems/05` calls the branch *"a build defect and not a game state"* — so the predicted rate is exactly zero and any nonzero reading is a correctness alarm, not a tuning signal. Decide: the counter's definition and population; the alarm value (state whether it is literally 1); the routing rule, which must say that a breach is a revision request against `discovery` / `layout` / `collection` and may **never** produce a balance change or a currency sink, because `02-GAMEPLAY.md`'s *"solve duplicates without adding a currency"* forecloses the second; and the emission requirement, because the branch at `game/src/server/Clearing.luau` (the `state.found[find]` guard, ~line 293) **only `warn`s and fires no channel**, `Protocol.luau` declares *"Exactly seven channels, and no more"*, and `game/src/` contains zero analytics calls — so this reading needs something that does not exist and must be written as a stated requirement to logging-pipeline work, not as a design of theirs. State plainly why this matters now and did not before: ruling R-2 took `collection.relicsPerArea` to 3 and `areasPerDepth` to 2, and `_state.md` records that `systems/05`'s *"at today's 6×1 this is a no-op"* safety argument **expired** there, leaving the partition draw as the only thing preventing a duplicate. Carry no manifest block; state in one line that its content lands in `economyHealth`'s duplicate row, and record as a contract finding that a schema maintainer may prefer this counter in a cross-cutting defect key owned by runtime-integrity work instead. |
| 03 | `what-this-economy-cannot-report` | Decide, for each of the four subjects in my `owns` that this game cannot support, whether it is **dormant** (a reading exists, blocked on one named prerequisite) or **structurally absent** (no reading exists at all), give the reason from the owning sheet, and give the single change that would move it — writing all four as data rows, never as an apology. They are: **ARPDAU** and **payer share**, dormant, because every `products.items[].gamePassId` is `null` so `UserOwnsGamePassAsync` cannot return true (`products.externalPrerequisite`, `game/src/server/Entitlements.luau`) — and state the half that is *not* about this game, that the creator dashboard supplies ARPDAU, ARPPU, paying users and conversion rate with no game-side instrumentation at all `[research: https://create.roblox.com/docs/production/analytics/monetization]`, but only above **10 DAU and 10 play hours for 7 consecutive days** `[research: https://github.com/Roblox/creator-docs/blob/main/content/en-us/production/analytics/analytics-dashboard.md]`, which a project whose stated success is *"shipped artifacts, not players"* may never clear; **price elasticity**, structurally absent, because there is one item at one price with no store, no prompt and no variant (`products.storeExists` false, `promptGamePassPurchaseCalls` 0, ruling R-4, F12 forbidding a second price), so no experiment exists and none may be designed — say what the dashboard could still show and what it could not, and state that `products.items[span].factorStatus` makes two claims `_verified-wave4.md` ruling 5 found false and that **only a live price-to-value reading settles it, and it cannot be taken while `gamePassId` is null**; and **inflation in the classical sense**, structurally absent, because there is one faucet, one sink, no cap (`economy.balanceCap` null), no trade, no player-to-player price and `03-META.md`'s *"Never content access"* — name **ladder exhaustion** as what replaces it and hand the reading to `01`. Then write the prohibitions this implies as the rows `economyHealth.forbidden` carries: no comparative or player-visible economy figure (`X10` plus priority-3 leaderboards), no metric over a login window, streak or event calendar, no metric over a reset cycle or offline accrual, no A/B price test, no design change proposed to move revenue or retention (`00-CORE.md` declines both), and no live tuning response — a breach routes to the owning sheet as a revision request, because `OPEN.md §2` says the game *"ships and settles"*. Carry no manifest block; state in one line that its rows land in `economyHealth.dormant` and `economyHealth.forbidden`. |

## Subjects I considered and did not assign

- **A price-elasticity experiment, an A/B test, or a second price point.** No surface exists to
  run one on and F12 forbids a second price. Refused in `03` as data, not omitted.
- **A currency cap, a decay, a soft cap or a sink of any new kind.** All are economy *design*,
  owned by `gameplay/systems` and `gameplay/balance` (`does_not_own`). Where my exhaustion
  reading forces a question there, `01` states it as a consequence and lets its owner act.
- **The event catalog, event names, payload field names and sampling.** Event-catalog work's.
  **The boundary I am drawing, because it is the one that could collide:** `LogEconomyEvent` is
  a platform call with a fixed schema whose argument *values* are economy readings and therefore
  mine; every game-defined event name, every `LogCustomEvent` payload and the naming convention
  are event-catalog work's. Stated here so two sheets do not each claim the flow record.
- **The logging pipeline itself** — batching, retries, storage, and whether an analytics call
  site exists anywhere in `game/src/`. Logging-pipeline work (currently Tech & Data, this wave).
  I state requirements; I design nothing there.
- **Server-authority and anti-cheat readings on the economy.** `04-PRESENTATION.md` puts *"the
  economy is the only thing worth cheating"* under Integrity, which is security work's, not mine.
- **Any pass mark or ship/no-ship verdict.** KPI-shortlist work selects from my readings and sets
  targets and alarms at the project level. I set the alarm *band on a reading*; I set no verdict.
- **Session length, laps per session, and time-to-area.** Engagement's, explicitly
  (`OPEN.md §2` item 2). My exhaustion reading is stated in areas and in currency, and converts
  to wall clock only by citing `pacing`.

## Contract key finding

`economyHealth` does not exist in `bridge/schema.mjs` (25 keys, verified by reading it: `area`
through `firstSession`; no collision with wave 4's four proposals `tierMix`, `solvency`,
`axisBudget`, `pacing`, nor with wave 5's siblings `telemetry`, `funnels`, `engagement`, `kpis`).

**What it would hold:** two flow records with their platform-call arguments and emission
granularity; one balance series with sample points, unit and population; an array of derived
readings, each naming the key and field it refutes and carrying an alarm band; a `dormant` array
of readings blocked on a named prerequisite; and a `forbidden` array.

**The structural finding a schema maintainer should see, because it is new:** all 25 merged keys
are *design values a build module reads*. `economyHealth` is the first key whose value is a
**reading specification that cites other keys by field name**. Two consequences. (a) Its
cross-key checks run in the opposite direction from every existing one — the merger would check
that each cited field still exists, not that a module can consume the value. (b) It has **no
emitter path**: `bridge/emit-config.mjs` produces `GameConfig`, and nothing in `game/src/` calls
any analytics service (`AnalyticsService`, `LogService`: zero hits). Promotion therefore implies
either an analytics call-site module in the *technical* contract, or an explicit status of
"developer-facing, not read by a build" — the same shape as wave 2's escalation 1 about `social`
having no emitter path. That is a decision for whoever maintains the schema and the build order,
not for this domain.

## Verification note

**Sheet `01` is the one most likely to be contradicted, and wave-4 revision work will do it.**
Every prediction it instruments is in flux: `cid/gameplay/_verified-wave4.md` is **FAIL** with
sixteen requests, RR-1 corrects `solvency`'s ladder totals inside an instruction other agents
will execute, and RR-9/RR-10 move `pacing` rows. **This is not hypothetical — it has already
happened on disk.** `balance/03` currently publishes a ladder total and a solvency ratio that
differ from the figures `_verified-wave4.md` ruled correct, and `balance/05`'s per-area arrival
laps no longer match `balance/03`'s ledger. That is precisely why sheet `01` must cite
`solvency.ladderTotal` and `tierMix.byDepth[d].expectedValuePerPatch` as *fields*, and why a
copied number in it would be wrong before it was read.

Second: sheet `02`, contradicted by logging-pipeline work, which may decline the emission the
duplicate counter needs. That is a legitimate refusal and it revises `02` rather than defeating
it — the reading then falls back to a server log line nobody aggregates, and `02` should say so.

## Research owed

**My node in `docs/cid-workflow.json` carries no `must_verify`.** I fetched anyway, because the
writer has no fetch tools and whatever I do not bank here it must decide on reasoning alone.
Four pages fetched this pass, all reachable, all quoted above:

- **The economy call and its exact signature.** `LogEconomyEvent(player, flowType, currencyType,
  amount, endingBalance, transactionType, itemSku, customFields)`; `FireInGameEconomyEvent` is
  deprecated. `[research: https://create.roblox.com/docs/reference/engine/classes/AnalyticsService]`
- **The economy schema and its limits.** `Enum.AnalyticsEconomyFlowType` is `Source` / `Sink`;
  the default `Enum.AnalyticsEconomyTransactionType` values are `IAP`, `TimedReward`,
  `Onboarding`, `Shop`, `Gameplay`, `ContextualPurchase`. The dashboard shows total sources and
  sinks by category, **average wallet balance**, top sources and sinks, and all sources and sinks
  by date range. Up to five currencies; up to three custom-field breakdowns; **events send only
  from the server and only in a published game — not from the client and not from Studio**; a
  missing `itemSku` displays as N/A; `amount` is always positive whichever the flow.
  `[research: https://create.roblox.com/docs/production/analytics/economy-events]`
- **The custom-field budget**, which is the whole dimensioning constraint on sheet `01`: three
  fields, **values must be strings**, **up to 8,000 unique value combinations across all three**,
  and anything past `CustomField03.Name` is ignored rather than erroring.
  `[research: https://github.com/Roblox/creator-docs/blob/main/content/en-us/production/analytics/custom-fields.md]`
- **The monetization half, from the platform side.** Revenue split by developer products and
  passes, conversion rate (*"Percent of daily active users who are also paying users"*), paying
  users, ARPPU and ARPDAU are all supplied with **no game-side instrumentation**
  `[research: https://create.roblox.com/docs/production/analytics/monetization]` — and gated:
  *"Any game with more than 10 daily active users (DAU) and 10 play hours for 7 consecutive days
  is eligible for accessing all KPIs on the dashboard"*, with sales-data files updated every 48
  hours. `[research: https://github.com/Roblox/creator-docs/blob/main/content/en-us/production/analytics/analytics-dashboard.md]`

**Could not verify, each with the fetch that would settle it:**

- **Whether `LogEconomyEvent` has a documented call-rate limit or per-event throughput cap.**
  Neither page states one. This is load-bearing for sheet `01`'s per-clear-versus-aggregate
  decision. `[unverified]` `[research owed: the Roblox analytics events reference page or the
  AnalyticsService announcement thread, for a stated events-per-server or events-per-player
  rate limit]`
- **Data latency and retention on the Economy dashboard.** Only the 48-hour sales-file figure
  and "benchmarks update daily" were stated. `[unverified]` `[research owed: the analytics
  dashboard or economy-events page section on data freshness and retention window]`
- **Whether readings are suppressed or aggregated differently for under-13 accounts**, which
  bounds every population sheet `01` defines. Not found on any page fetched. `[unverified]`
  `[research owed: Roblox's data-collection or age-related policy page as it applies to
  AnalyticsService]` — the sourced-policy obligation itself belongs to event-catalog work
  (category gap 4); I record it because my populations inherit the answer.
- **An empirical economy reading from this game.** The 2026-08-01 playtest reported *"shard
  values felt right"*, n = 1, untimed, and is recorded in no file this pipeline can cite.
  `[research owed: an instrumented or timed capture of one full area-1 clear, giving realised
  currency at level 0 against `meta/01` criterion 3's band]`

**Operational note for whoever dispatches my writer:** four of the five URLs above are new to
this repo. `npm run cid:research` must be re-run before the writer starts, or `cid:verify` will
fail every `[research: url]` in my sheets for naming a URL absent from `cid/_research/pack.md` —
the defect `balance/03` already carries as a self-reported `[research owed:]`.
