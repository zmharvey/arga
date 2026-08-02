# 03 — Emission budget

**Domain:** analytics/events · **Category:** Analytics · **Wave:** 5

**Transport assumed: `AnalyticsService`, and nothing else.** Every ceiling below is that API's. If
logging-pipeline work chooses an external endpoint over `HttpService` or a DataStore-backed log,
this sheet bounds the wrong pipe and must be re-derived; the assumption is stated here rather than
buried so the contradiction is visible.

## Decision

**A server budgets `20 × runtime.maxPlayers` requests per minute — 320 at 16 — and never counts the
platform's flat 120.** Per-occurrence emission of the currency tick does not fit at any realised
tick gap `balance/05` publishes, so the patch clear is **aggregated to one economy event per area
completion**; nine events are per occurrence, three are capped per session, and one is aggregated
per session. A throttled event is **dropped silently and never retried**.

This sheet carries no manifest block: it decides the values of `telemetry.budget` and every
`telemetry.events[].cadence`, both supplied by sheet `01`.

## Why

- **The rule is `120 + (20 × CCU)` total `AnalyticsService` requests per minute**
  `[research: https://create.roblox.com/docs/production/analytics/event-types]`. `runtime.maxPlayers`
  is **16**, picked by `architect/01-runtime` and recorded in `cid/_state.md` as a figure assigned
  to nobody inside `social.maxPlayers`'s 12-to-20 band
  `[research: architect/sheets/01-runtime.md]`.
- **The scope of `CCU` is `[unverified]` and the conservative reading is taken.** The published
  table says *"Total AnalyticsService requests per minute"* against `CCU` and does not say whether
  the budget is per server or per experience. **This sheet assumes experience-wide**, which means
  the flat 120 cannot be divided among servers and a single server may not spend it. So the
  per-server allowance is `20 × runtime.maxPlayers` = **320 per minute**, or **20 per player per
  minute**, and the permissive reading's 440 is recorded only as the slack this leaves.
  *Settling fetch: a Roblox DevForum announcement thread on the analytics rate limit, or a support
  clarification stating whether the budget is per server or per universe.*
- **Aggregation of the tick is forced by arithmetic, not preferred.** Per-occurrence emission of the
  currency tick costs

  > `60 × runtime.maxPlayers / pacing.tickGapRealisedSeconds` requests per minute per server,
  > equivalently `60 / pacing.tickGapRealisedSeconds` per player per minute.

  That fits the conservative allowance only while `pacing.tickGapRealisedSeconds ≥ 3.0 s`, and the
  permissive one only while it is `≥ 2.18 s`. **`balance/05` publishes a realised tick gap well
  below both**, which is the whole point of the figure: `core-loop/01`'s ceiling is one payment
  every 3 seconds and the design beats it comfortably. The same success that makes the loop good
  makes per-clear emission impossible. Cited as a field, not copied: wave 4 is FAIL and
  `_verified-wave4.md` RR-9 moves rows in `pacing`.
- **The catalog's own steady-state rate is checked against the same allowance, as an inequality:**

  > `(1 + collection.relicsPerArea + 1 + 1 + solvency.areaLedger[k].rungsBought) × 60
  > / pacing.laps[k].realisedLapSeconds ≤ telemetry.budget.perPlayerRequestsPerMinute`

  — one `area_cleared`, up to `collection.relicsPerArea` reveals, one aggregated economy source, at
  most one `set_completed`, and one economy sink per rung bought. At the shipped shape that is
  roughly 12 requests per lap against a lap of order `pacing.lapTargetSeconds`, about **4.4 per
  player per minute against an allowance of 20** — under a quarter, with the rest of the headroom
  spent on the join burst below.
- **The worst realised minute is a full-server join, not steady play.** Sixteen players joining
  inside one minute produce `runtime.maxPlayers × 4` = 64 requests (`session_start`, `slot_claimed`,
  `run_armed`, one onboarding funnel step) on top of about 70 of in-play traffic — **134 against
  320**. Stated because it is the case a rate limit actually catches, and because it is the reason
  no session-scoped event may be split into two.
- **`upgrade_refused` needs a per-session cap and would otherwise be the catalog's one unbounded
  hole.** `BuyUpgrade` is client-originated and `onPurchase` drops a malformed message silently
  `[research: game/src/server/init.server.luau]`, so a client firing the remote in a loop would
  produce one analytics request per fire and exhaust the server's whole allowance by itself. The cap
  is **6 per player per session** `[playtest unknown]`, test range 3 to 20 — high enough that a
  genuine refusal is never lost (rows lift only when affordable, so the expected count is near
  zero) and low enough that a loop costs 6 requests, not 6,000.
- **`defect_unknown_tier` is capped for the mirror reason.** A config whose `tierMix` draw produces
  an index `tiers` does not have reaches that branch on *every* patch. One per player per session is
  enough to raise an alarm; the second one carries no information the first did not.
- **A dropped event is silent, and the instruments are shaped around that.** The one sourced
  statement about over-limit behaviour is that events *"will succeed but those that exceed the limit
  will be dropped and will not be shown"*
  `[research: https://devforum.roblox.com/t/clarification-on-funnel-analytics-limits/3084051]` —
  said of funnel cardinality, and assumed here to hold for the request rate as well `[unverified]`.
  **Three consequences bind sheet `04` and every reader:** no instrument may be the difference of
  two events; no instrument may be an exact count of anything; and **the telemetry module must not
  retry**, because a retry converts a throttle into a longer throttle. Server-computed gaps and
  running maxima survive loss, which is why sheet `04` carries them as values rather than asking a
  dashboard to difference timestamps.
  *Settling fetch: a first-party statement of what `AnalyticsService` does past `120 + 20 × CCU` —
  drop, throttle or error.*
- **Nothing here is readable inside a session.** *"Events are aggregated daily so it may take up to
  24 hours for charts to populate"*
  `[research: https://create.roblox.com/docs/production/analytics/custom-events]`, so no reading in
  this catalog can inform anything faster than daily, whatever cadence anyone would prefer.

### The four hard shape limits, and what each forbids

| limit | value | source | what it forbids here |
|---|---|---|---|
| distinct custom event names | **100** per experience | `[research: https://create.roblox.com/docs/production/analytics/event-types]`, restated as *"You can add up to 100 custom events to your game"* `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/production/analytics/custom-events.md]` | 13 used. Nothing forbidden today; the rule is that a dimension becomes a field, never a name — the same page says *"You should use custom fields whenever possible instead of event names"* |
| custom fields per event | **3**, and only `CustomField01/02/03.Name` are honoured — *"Anything other than CustomField01.Name, CustomField02.Name, and CustomField03.Name is ignored"* | `[research: https://create.roblox.com/docs/production/analytics/custom-fields]` | a fourth field is not an error, it is silent data loss. This is the cap that binds the whole catalog |
| combined unique values | **8,000** across all custom fields, after which *"values will be grouped as 'Other'"* | `[research: https://create.roblox.com/docs/production/analytics/event-types]` | 936 used (`9 × 2 × 52`). Forbids any free-text or unbounded field — sheet `02` `N24` |
| retention | **90 days** *"from the last data received"* | `[research: https://create.roblox.com/docs/production/analytics/event-types]` | no instrument may be defined over a window longer than 90 days, and a comparison across a 90-day gap in play is impossible. Every reading this catalog supports is within-session or within-cohort, never longitudinal |

Three further ceilings are relayed rather than spent: **10 funnels and 100 steps per funnel** to
funnel-definition work, and **10 economy resource types, `transactionType` grouped past 20 and
`itemSku` past 100** to economy-flow work, all from the same page.

### Cadence, per event

| event | cadence | window or cap |
|---|---|---|
| the patch clear (`Clearing.clearPatch`) | **aggregated** to one `LogEconomyEvent` source | per **area completion** `[playtest unknown]`; alternative is a fixed 60 s window, test range 30 to 180 s |
| `session_start` · `session_end` · `slot_claimed` · `character_reset` | per occurrence | — |
| `run_armed` | per occurrence | first arm of a session only |
| `find_revealed` | per occurrence | bounded by `collection.relicsPerArea` per area |
| `set_completed` | per occurrence | at most 4 per player ever |
| `area_cleared` | per occurrence | — |
| `upgrade_row_lifted` | per occurrence | at most 3 per player ever |
| `upgrade_refused` | per occurrence, **capped** | 6 per player per session `[playtest unknown]`, test range 3 to 20 |
| `defect_duplicate_find` | per occurrence, **capped** | 1 per player per session |
| `defect_unknown_tier` | per occurrence, **capped** | 1 per player per session |
| `save_written` | **aggregated** | the last successful save of a session, plus every failure |
| the `LogEconomyEvent` sink at `onPurchase` | per occurrence | bounded by `solvency.areaLedger[].rungsBought` |
| onboarding funnel steps | per occurrence | at most 4 per player ever, `LogOnboardingFunnelStepEvent` being once-per-user by construction |

## Consequences for other work

- **Economy-flow work** inherits the faucet's granularity as a ruling, not an option: the patch
  clear is one `Source` event per area completion carrying the lap's total, never one per clear. It
  still owns `currencyType`, `transactionType`, `itemSku` and the three custom fields, and it
  inherits the 10-resource-type and 100-`itemSku` ceilings.
- **Funnel-definition work** inherits 10 funnels and 100 steps per funnel, and the fact that a
  funnel step is a request against the same 320-per-minute server budget as everything else.
- **Per-server-capacity work** owns `runtime.maxPlayers`. If it ratifies anything other than 16,
  every figure here moves linearly and the two tick-gap thresholds (3.0 s and 2.18 s) do not — they
  are per-player and independent of population, which is why the inequality is written over field
  names.
- **Logging-pipeline work** inherits three requirements and one prohibition: hold the per-session
  emission counters that enforce the three caps; enforce them in the module, not at the call site;
  batch nothing across players, because every call takes one `Player`; and **implement no retry**.
- **Cadence-predicate work (`core-loop/01`)** should note the shape of the result: the 3-second tick
  ceiling is instrumented as a per-session maximum bucket, not as a stream, and that is a direct
  consequence of this budget rather than a choice about rigour.
- **KPI-shortlist work** inherits a floor on review cadence of one day and a ceiling on any
  longitudinal window of 90 days.

## Acceptance criteria

1. `telemetry.budget.perServerRequestsPerMinute` equals `20 × runtime.maxPlayers` (320 at 16),
   `perPlayerRequestsPerMinute` is 20, and `ccuScope` records the experience-wide reading as
   `unverified` with the flat 120 excluded.
2. No `telemetry.events[]` entry has `cadence: "perOccurrence"` at a site inside
   `Clearing.clearPatch`'s payout path; the patch clear appears only in
   `telemetry.economyCallSites` with `cadence: "aggregated per area completion"`.
3. Every entry whose cadence is `aggregated` or capped carries a stated window or per-session cap;
   `upgrade_refused`, `defect_duplicate_find` and `defect_unknown_tier` all carry one.
4. `telemetry.budget` carries `eventNameCap` 100, `customFieldCap` 3, `combinedValueCap` 8000 and
   `retentionDays` 90, and the worst-minute sum (`runtime.maxPlayers × 4` join requests plus
   steady-state in-play traffic) is at most `perServerRequestsPerMinute`.

## Not decided here

Which events exist, their ids, sites, payloads and required/optional fields — sheet `01`, this
domain, which holds the key these values ride in. What no event may ever carry — sheet `02`. The
clock, the gap derivation, what resets it and whether the carried value is the gap or the maximum —
sheet `04`. `runtime.maxPlayers` itself — per-server-capacity work; this sheet cites it and sets
none of it. Every `LogEconomyEvent` argument value and the faucet's `transactionType` — economy-flow
work. Funnel names, step ordinals and pass marks — funnel-definition work. Whether the transport is
`AnalyticsService` at all, and how the pipe batches, stores or fails — logging-pipeline work. Every
figure in `pacing`, `solvency` and `collection` this inequality is evaluated over — Balance and
Meta, and wave 4 has not released.
