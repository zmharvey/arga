# Event Logging — domain index

**Category:** Analytics · **Wave:** 5 · Reads: `concept/spec/incremental-spinoff-v2/HANDOFF.md`,
`CONCEPT.md`, `00-CORE.md`, `01-FOUNDATION.md`, `02-GAMEPLAY.md`, `03-META.md`,
`04-PRESENTATION.md`, `OPEN.md` · `cid/analytics/_category.md` · `cid/_digest.md` ·
`cid/_contract.md` · `cid/_state.md` · `architect/sheets/01-runtime.md`,
`architect/sheets/05-interfaces.md` · `cid/gameplay/_verified-wave4.md` (finding 5) ·
`game/src/server/Clearing.luau`, `game/src/server/init.server.luau`,
`bridge/context.mjs` (what my writer's pack actually contains)

**Proposes one key, `telemetry`. Owns none of the 25 merged keys.**

---

## What the brief gave me

Every line below is quoted from the source sheet, not from my category brief.

| quoted | tag | what it binds here |
|---|---|---|
| *"Three things: (1) did a first-session player reveal a relic, and how fast … (2) average time to complete an area … (3) set-completion rate per set"* (`OPEN.md §2`) | `[brief: soft]` ← `[I assumed — §2 default]` | The only measurement instruction in the brief. It names **three subjects and zero events**, so it constrains what my catalog must make *possible* and nothing about how. Overridable with a stated reason. |
| *"all three test assumptions this spec rests on rather than reporting vanity."* (`OPEN.md §2`) | `[brief: soft]` | **The selection principle, and it is the one rule I am handing every sheet.** An event that settles no stated prediction does not go in the catalog. |
| *"Watch: instance count per area on mobile, and save size as areas accumulate."* (`OPEN.md §2`, technical shape) | `[brief: soft]` ← `[I assumed — §2 default]` | **Two more things the brief asks to be watched, and my category brief did not carry them.** One of the two is not observable through the platform's analytics API at all — see the impossibility list. Routed to `01`. |
| *"8–14, mobile-heavy, short sessions."* (`00-CORE.md`) | `[brief: binding]` ← `[you chose: R1 Q4]` | Bounds what may be collected at all. The brief states no data rule, so this is discharged as research, not as a judgement — see `## Research owed`. |
| *"Success is **shipped artifacts, not players**"* (`00-CORE.md`) | `[brief: binding]` ← `[you chose: R1 Q3]` | The catalog is instrumentation for a design under test, not a live-service telemetry stack. |
| Non-goals: *"Beating the genre's retention curve. Offered and declined."* · *"Revenue. Offered and declined"* (`00-CORE.md`) | `[brief: binding]` ← `[you chose: R1 Q3]` | No event may exist whose only purpose is to move either. Both may be *measured*. |
| *"**Cleared is permanent** — overgrowth never returns."* (`01-FOUNDATION.md`) | `[brief: binding]` ← `[you chose: R2 Q1]` | Progress is monotonic. No event may describe a reset, a decay or a return to zero. |
| *"**There is no failure state.**"* · *"Zero tension is deliberate."* (`02-GAMEPLAY.md`) | `[brief: soft]` ← `[you accepted: step 6 Q2]` | There is no failure event to catalogue. The only route to a death in shipped code is the Roblox menu's Reset Character (`init.server.luau`, `onDeath`), which is a platform action and not a game outcome. |
| *"Shared server, parallel progression, own areas, **no mechanical interaction**."* (`02-GAMEPLAY.md`) | `[brief: soft]` ← `[you accepted: R6 Q2]` | No payload may be a function of a second player. Joins `social.forbidden` X7. |
| Priority 3: *"leaderboards · daily rewards · codes · seasons and events · rebirth · offline accrual · trading · real procedural generation"* (`03-META.md`) | the ordering is `[I assumed]`; the cuts are not | No event may be defined over any of them. **Naming one in order to forbid it is compliant** and `02` is where that happens. |
| *"The economy is the only thing worth cheating … clearing and currency awards must be server-validated"* (`04-PRESENTATION.md`, Integrity) | `[I assumed — not interviewed]` | Corroborated by the platform: analytics events cannot be sent from a client at all `[research: raw.githubusercontent.com/Roblox/creator-docs/…/custom-events.md]`. Every event in this catalog is server-emitted, which is not a choice I made. |
| Approved wave 1, `theme/tone/04` `X10`: *"Measure freely, display none of it"* | approved spec | No event may require or imply a player-facing surface. This domain owes `vocabulary` no player-facing string. |
| `theme/vocabulary/04`: internal field names *"are not player-facing and are not governed by this list"*, and *"every rule on this sheet is advisory"* (0 sheets on disk carry a `coinage` block) | approved spec | Event ids are internal identifiers. Whether this domain declares a `coinage` block and inherits `bannedWords`, or keeps ids ungoverned, is one line in `01`. |
| `Protocol.REMOTES`: *"Exactly seven channels, and no more"*, enforced against `input.clientOriginatedRemotes` at load (`architect/sheets/05-interfaces.md`) | approved technical contract | An event needing an eighth channel is **a stated requirement to whoever owns module and channel definition**, written as one, and never designed here. |

---

## What the brief did not give me

Named, routed, not filled. Nothing below is smoothed over by a default.

1. **The brief names no event, no payload field, no property, no required/optional split and no
   naming convention — anywhere.** `OPEN.md §5` row 8 lists measurement among four items
   *"batched by design"* at **0 interview questions**. This is the widest latitude in the
   category and it is a gap, not a licence. → **`01`**, which must say for every event which
   stated prediction it refutes, so the invention is checkable.
2. **The brief states no volume budget, no sampling rule, and no cost model for telemetry.**
   The one place it comes close is *"Watch: instance count per area on mobile"*, which is a
   performance concern, not a bandwidth one. → **`03`**, against the platform's published rate
   limit rather than against a preference.
3. **The brief says nothing about what may be collected from an 8–14 audience**, while
   Analytics Verification checks exactly that, and `OPEN.md §5` #6 marks Integrity
   `[I assumed]` and `OPEN.md` calls it *"the least defensible"* of the zero-question items.
   → **`02`**, discharged as sourced platform rules below, never as an asserted policy.
4. **No logging pipeline exists.** Zero hits for `AnalyticsService` or `LogService` in
   `game/src`; `architect`'s 7-key technical contract carries no logging module and
   `05-interfaces.md`'s 36 entries include none. Every insertion point this domain names is a
   *place a call could go*. → **`01`** states the requirement with its call sites; **module,
   channel and transport definition** [currently Tech & Data, this wave] owns whether it exists.
   I may not design it (`does_not_own`).
5. **`firstSession.ceilings.secondsToFirstClear` is `measuredFrom: "firstInput"` and nothing
   server-side observes input.** The arming gate observes *displacement past
   `firstSession.armDistanceStuds`*, which is strictly later than first input and is the
   nearest producible proxy. The brief does not state the difference and neither does
   `onboarding/02`. → **`01`** states what is actually observable at that call site; the
   population and pass mark stay with **funnel-definition work** (Funnels), whose headline
   instrument this is.
6. **No session identity, no join clock and no elapsed-time field exists anywhere.**
   `stateShape` carries none, `snapshotShape()` carries none, and
   `LogFunnelStepEvent` requires a `funnelSessionId` string
   `[research: create.roblox.com/docs/reference/engine/classes/AnalyticsService]`. Every
   wall-clock prediction in the game is unmeasurable without one. → **`01`**, as a field on
   the session-start event and a stated requirement on the module that holds it.
7. **`social.maxPlayers` is assigned to nobody** (`cid/_state.md`); `architect/01-runtime`
   picked **16** and says a script cannot execute it. It is the denominator of every rate in
   `03`. → relayed to **per-server-capacity work** [currently Tech & Data, this wave];
   `03` cites `runtime.maxPlayers` and re-derives if it moves.
8. **Wave 4 is FAIL and has not released.** `pacing`, `tierMix`, `axisBudget` and `solvency`
   are the keys this domain instruments and their figures are moving. → **every sheet cites
   the source sheet and the field name; no sheet copies a number.** `03`'s inequality is
   written over field names for exactly this reason.
9. **The pipeline has no artifact type for an empirical reading**, and the one playtest
   (2026-08-01, developer, n = 1) is recorded in no `cid/` or `docs/` file. This domain
   specifies instruments for a design whose only measurement so far cannot be cited.
   → **not mine.** Passed to whoever holds run state, named here so its absence is not read
   as an Analytics omission.

---

## The observation surface, as facts about shipped code

Read this run from `game/src`. These are **places a call could go**, not calls. Nothing in
`game/src` calls any analytics service. Every one is server-side, which the platform requires.

| # | insertion point | file · site | what is knowable there |
|---|---|---|---|
| 1 | one patch cleared | `server/Clearing.luau` · `clearPatch`, after `Progression.award` | patch index, `patch.tierIndex`, the payout, `state.clearedCount`, live ordinal `areasFinished + 1` |
| 2 | the arming transition | `server/Clearing.luau` · `tickPlayer`, at `arm.armed = true` | joined → started playing, per character, never persisted. **Not first input** — see gap 5 |
| 3 | a Find revealed | `server/Clearing.luau` · `clearPatch`, at the `FindRevealed` fire | one Find name, ≤ `collection.relicsPerArea` per area |
| 4 | a set completed | `server/Clearing.luau` · `clearPatch`, at the `SetCompleted` fire | one `collection.sets[].id`, once per player per set |
| 5 | an area restored | `server/Clearing.luau` · `tickPlayer` step 4, at the `areasFinished` increment | finished label and ordinal, on the latch transition only |
| 6 | a reachable duplicate | `server/Clearing.luau` · `clearPatch`, the `state.found[find]` guard | today a `warn`. `systems/05` makes it unreachable by partition; reaching it is a **build defect**, not a player event |
| 7 | an unknown tier index | `server/Clearing.luau` · `clearPatch`, the `tier == nil` branch | a config defect that still clears and pays `economy.payoutFloor` |
| 8 | a purchase attempt received | `server/init.server.luau` · `onPurchase`, before `tryBuy` | one upgrade id string, and nothing else — `economy.authority` |
| 9 | a purchase refused | `server/init.server.luau` · `onPurchase`, the `tryBuy` false branch | **that** it failed. Not **why**: `tryBuy` returns a bare boolean (`_state.md` build note 3) |
| 10 | a purchase applied | `server/init.server.luau` · `onPurchase`, at the `UpgradeApplied` fire | id and new held level. The price must be recomputed as `config.upgradeCost(def, newLevel - 1)` |
| 11 | an upgrade row lifting | `server/Progression.luau` · `revealRows` | a `firstSession.withheld.upgradeRow` latch transition |
| 12 | session start | `server/init.server.luau` · `onJoin` step 1, after `Persistence.load` | the restored state, and whether the load fell back to `defaultState()` on a DataStore failure |
| 13 | entitlement resolution | `server/init.server.luau` · `onJoin` step 2, after `Entitlements.refresh` | ownership booleans — **all false while every `products.items[].gamePassId` is null** |
| 14 | a slot claimed | `server/Plots.luau` · `claimSlot`, via `onJoin` step 6 | occupied-slot count at join, i.e. realised co-presence population |
| 15 | a character up | `server/init.server.luau` · `onSpawn` | join spawn and respawn are indistinguishable here without a counter |
| 16 | a reset | `server/init.server.luau` · `onDeath` | the Roblox menu's Reset Character, the only route to a death |
| 17 | session end | `server/init.server.luau` · `onLeave` | the final state, before `Plots.despawn` |
| 18 | a save | `server/init.server.luau` · `startSaveLoop` and `onShutdown`; `server/Persistence.luau` · `save` | the boolean return. The brief's *"save size as areas accumulate"* is readable here |

**What shipped code cannot produce today** — the required half of this list, and the largest
single request this domain makes:

- **Every client-side fact, categorically.** *"Events can only be sent from the server and in
  published games. Events can't be sent from the client or Studio."*
  `[research: raw.githubusercontent.com/Roblox/creator-docs/…/custom-events.md]` The two
  client-originated channels are `RequestState` and `BuyUpgrade`, checked against
  `input.clientOriginatedRemotes` at load, and `Protocol` declares *"exactly seven channels,
  and no more"*. So: **device class** (the brief's ~70/25/5, which `cid/_state.md` records as
  uncorroborated), viewport, frame rate, whether any beat was seen, index-panel opens
  (`index-screen.toggle()` is a direct local call with no packet), and **the brief's own
  `OPEN.md §2` watch item "instance count per area on mobile"** are all unobservable. Each
  needs an eighth channel or a field on an existing packet, which is a request with a stated
  reason and not a design of mine. **Mitigated in part:** the Creator Dashboard already breaks
  every default metric down by *Platform*, *OS* and *Age Group* with no developer event
  `[research: raw.githubusercontent.com/Roblox/creator-docs/…/analytics-dashboard.md]`, so
  device split needs no event — it needs a dashboard read.
- **First input.** Gap 5. Producible only by a new client message or a `UserInputService` read
  the client cannot log from.
- **Wall clock.** Gap 6. Nothing records a join time or holds a session id.
- **Why a purchase failed.** Point 9. `tryBuy`'s bare boolean erases the three cases.
- **Whether a neighbour was perceived.** `social/02`'s criteria need a client frustum test.
- **Duplicate volume as a metric.** Point 6: `systems/05`'s partition makes it structurally
  zero, so it is a defect counter and not an economy reading. Stated so that
  **economy-flow work** does not spec a rate against it.

---

## Why 4 sheets

**One key, so one sheet carrying a manifest, plus three that constrain it and carry none.**
`cid/_contract.md` lists 25 keys and none is mine, so `01` is the whole of my value-supplying
output and the naming pattern and per-event fields live inside it — *the sheet that decides a
thing names it*, and splitting "the names" from "the rule about names" would put two sheets on
one key, which the merger rejects. The other three exist because each is a **prohibition or an
inequality that shapes `telemetry`'s values rather than being one**, which is the only
justification available: `02` refuses payload content on sourced platform and approved-sheet
grounds; `03` bounds total emission against a published rate limit, on the precedent of
`monetization/03`, which bounds `products`'s values and carries no key of its own; `04` decides
a derivation technique that `03` forces and that `01` then applies per event. A fifth was
considered and rejected — the requirement on the logging pipeline is one paragraph inside `01`
next to the call sites it names, not a sheet, because the pipe belongs to somebody else.

| # | sheet | must decide |
|---|---|---|
| 01 | `event-catalog` | Name every event this game emits — one per producible observation point in shipped server code: the per-patch clear in `Clearing.clearPatch`, the arming transition in `Clearing.tickPlayer`, the `FindRevealed`, `SetCompleted` and area-increment sites, the duplicate and unknown-tier defect guards, `onPurchase` received / refused / applied, `Progression.revealRows`, `onJoin` after `Persistence.load` and after `Entitlements.refresh`, `Plots.claimSlot`, `onSpawn`, `onDeath`, `onLeave` and the save paths — and for each fix the event id, the exact function it is called from, which `AnalyticsService` method carries it (`LogCustomEvent`, `LogEconomyEvent`, `LogFunnelStepEvent`, `LogOnboardingFunnelStepEvent`), the single numeric `value`, **at most three custom fields** with each marked required or optional and each given its cardinality, and **the one design prediction it can refute, named as a sheet plus a field name and never as a copied number**; carry all of it as the proposed `telemetry` manifest with a `naming` block giving the pattern and casing every id must match; state in one line whether these ids are declared as a `coinage` block under `theme/vocabulary/04` or kept as ungoverned internal identifiers; and state, as a requirement to module-and-channel-definition work and not as a design, that no analytics call exists anywhere in `game/src` today and that the brief's own `OPEN.md §2` watch item "instance count per area on mobile" cannot be emitted at all because the platform forbids client-side logging. |
| 02 | `never-logged` | Write the closed list of things no event in this catalog may ever carry, one numbered row each, every row naming the rule that closes it and an observable a grep or a manifest read can check: personally identifiable information of any kind under the platform's own enumeration (email, address, phone, financial, medical, credentials, off-platform handles, images of a user), any identifier for a player other than the recipient of the event under `social.forbidden` X7, any player-authored string under X9, any second player's state under the brief's *"no mechanical interaction"*, any field that would require or imply a player-facing surface under `theme/tone/04`'s X10, any metric defined over a leaderboard, ranking, percentile, daily streak, login window, season, code, trade, rebirth or offline period under `03-META.md` priority 3 — naming each in order to forbid it — any figure a player could be shown that compares them to another player, and any custom field spent on a dimension the Creator Dashboard already breaks down by without an event (Platform, OS, Age Group); state which platform rule each compliance row rests on and mark `[unverified]` anything you cannot trace to a page in the research pack. |
| 03 | `emission-budget` | Decide how much this game may emit and what that forbids, as an inequality over field names rather than a table of copied numbers: take the platform's global limit of `120 + (20 × CCU)` AnalyticsService requests per minute, evaluate it at `runtime.maxPlayers` (16, and cite it — `cid/_state.md` records the figure as assigned to nobody and ratified by `architect/01-runtime`), derive the per-server budget, then show that per-occurrence emission of the currency tick cannot fit — `60 × maxPlayers / pacing.tickGapRealisedSeconds` requests per minute exceeds the budget for any realised gap below about 2.2 s, and `balance/05` publishes one well below that — and rule per event whether it is emitted per occurrence or aggregated, giving the aggregation window or count for each aggregated one as a `[playtest unknown]` starting value with a test range; state what happens to a dropped or throttled event; and state the two hard shape limits the catalog must live inside, 100 distinct event names and three custom fields per event with 8,000 combined values across all three per experience, plus the 90-day retention window, each cited to the page it came from. |
| 04 | `payoff-gap-instrument` | Decide how `core-loop/01`'s two gap ceilings — *"a moving player is paid at least once every 3 seconds"* and *"no more than 90 seconds"* between above-tick payoffs — become numbers rather than a stream, given that `03` forbids emitting every tick and that the Creator Dashboard aggregates rather than exporting raw events: fix which of the catalog's events count as above-tick (the four `core-loop/02` names: Find reveal, upgrade purchase, area completion, set completion), fix the clock and its origin, decide that the gap is computed server-side and carried as a value on the event that ends it rather than reconstructed by differencing timestamps downstream, decide what resets it (respawn, area advance, session end, the terminal state — `meta/07` scopes the 90-second rule to `found < totalFinds`), and decide whether the carried value is the gap itself or the running maximum; state plainly that this is the only instrument in the game that can settle `_verified-wave4.md` finding 5, which found the published above-tick figure to be *"a mean presented as a maximum"* with a real worst case past the ceiling; and hand the population, the pass mark and any target to KPI and funnel-definition work, deciding none of them here. |

**Not assigned, and why.** A *funnels* sheet: the steps, populations and pass marks belong to
funnel-definition work, and `LogFunnelStepEvent`'s call site and payload are one row of `01`,
not a sheet. A *dashboard or report layout* sheet: `does_not_own`, and it is KPI's. A
*retention-event* sheet: the Creator Dashboard supplies retention and average session time with
no developer event `[research: …/analytics-dashboard.md]`, so specifying one would be inventing
work the platform already does. A *pipeline / batching / retry* sheet: explicitly Tech & Data's;
`01` states the requirement and stops. A *device-telemetry* sheet: the platform forbids
client-side logging and already segments by Platform and OS, so the only remaining item is the
brief's mobile instance count, which is named as an impossibility in `01` rather than specced.
A *duplicate-rate* sheet: `systems/05` removed the quantity.

---

## The contract key this domain needs

`cid/_contract.md` has 25 keys and none belongs to `analytics/events`. **I could not run
`npm run bridge -- --contract` — this agent has no shell — so I read `cid/_contract.md`, which
is that command's committed derivation, and confirmed by name that `telemetry` is absent and
does not collide with the four keys wave 4 has in flight (`pacing`, `tierMix`, `axisBudget`,
`solvency`) or with the four this category's other domains propose.**

Proposed: **`telemetry`** `[cid: decided]`, supplied by `01` alone, holding

```
{ "provides": "telemetry", "status": "proposed", "value": {
    "naming":  { pattern, casing, maxLength, governedByVocabulary },
    "budget":  { requestsPerMinuteRule, evaluatedAtMaxPlayers, eventNameCap,
                 customFieldCap, combinedValueCap, retentionDays },
    "events":  [ { id, cause, insertionPoint, apiCall, value, cadence, samplingRule,
                   fields: [ { key, name, required, cardinality } ],
                   refutes: { sheet, field } } ],
    "forbiddenPayload": [ … ]   // 02's rows, as data
} }
```

What it settles that no key settles today: **what the game records, where the call goes, and
what is attached to it.** Without it, every number in `pacing`, `firstSession`, `tierMix`,
`solvency` and `axisBudget` stays `[playtest unknown]` permanently, because nothing in the
build produces the reading that would move it. The `refutes` field is the part worth keeping in
the schema: it makes "an event that settles no stated prediction" a merge failure rather than a
matter of taste.

---

## Verification note

**`03` is the sheet most likely to be contradicted, and by Tech & Data in this same wave.**
Two ways. If they ratify a `social.maxPlayers` other than `architect`'s 16, every rate in `03`
moves linearly and the per-patch verdict moves with it — which is why `03` is written as an
inequality over `runtime.maxPlayers` and not as a table. More seriously, if they choose a
transport other than `AnalyticsService` — an external endpoint over `HttpService`, or a
DataStore-backed log — then the `120 + 20 × CCU` limit, the three-custom-field cap and the
100-name cap do not apply and `03` is bounding the wrong pipe. `03` must therefore state the
transport it assumes in its first line, so the contradiction is visible rather than silent.

**Second exposure:** `01` and funnel-definition work can collide on the same call sites.
`LogFunnelStepEvent` takes a funnel name, a session id and a step number; the steps are theirs
and the call site and payload are mine. `01` must carry the call sites and leave every step
name, ordinal and pass mark unset, or two sheets will describe one call.

**Third:** `02` and `theme/vocabulary` cannot collide as long as `01` keeps event ids as
internal identifiers. The moment `01` declares a `coinage` block, `bannedWords` applies to every
event id and `02` inherits an adjudication it did not plan for. That is exactly why `01` must
state the choice in one line rather than leave it implied.

---

## Research owed

My node in `docs/cid-workflow.json` carries **no `must_verify`**. My category brief imposes one
anyway — the age band — and the sampling arithmetic needed a second. Both were fetched. This is
the last chance to fetch for this domain; my writer has no fetch tools and gets only what lands
in `cid/_research/pack.md`.

**Fetched and usable:**

- Rate limit, cardinality, retention, funnel and economy caps
  `[research: https://create.roblox.com/docs/production/analytics/event-types]` — global rate
  `120 + (20 * CCU)` requests per minute; custom fields max **3**; unique values *"Unlimited —
  After 8,000 combined values across all custom fields, values will be grouped as 'Other'"*;
  economy resource types **10**; transactionTypes grouped past **20**; itemSkus past **100**;
  funnels **10**, steps per funnel **100**; eventNames **100**; retention *"90 days from the
  last data received"*.
- Server-only emission and the batching advice
  `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/production/analytics/custom-events.md]`
  — *"Events can only be sent from the server and in published games. Events can't be sent from
  the client or Studio."* · *"You can add up to 100 custom events to your game."* · *"You should
  use custom fields whenever possible instead of event names, since there is a much tighter
  cardinality limit on event names than custom fields."* · values *"can also be used as a way to
  send events in batches in order to stay under the rate limits."*
- Method signatures
  `[research: https://create.roblox.com/docs/reference/engine/classes/AnalyticsService]` —
  `LogCustomEvent(player, eventName, value, customFields)`,
  `LogEconomyEvent(player, flowType, currencyType, amount, endingBalance, transactionType, itemSku, customFields)`,
  `LogFunnelStepEvent(player, funnelName, funnelSessionId, step, stepName, customFields)`,
  `LogOnboardingFunnelStepEvent(player, step, stepName, customFields)`,
  `LogProgressionEvent(...)`. The page states no rate limit and no data restriction.
- Custom field keys
  `[research: https://create.roblox.com/docs/production/analytics/custom-fields]` — only
  `Enum.AnalyticsCustomFieldKeys.CustomField01/02/03.Name`; *"Anything other than
  CustomField01.Name, CustomField02.Name, and CustomField03.Name is ignored."*
- Default dashboard metrics and breakdowns
  `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/production/analytics/analytics-dashboard.md]`
  — retention KPIs and average session time by default; breakdowns by *Age Group, Platform, OS,
  Gender, Source, country, language, when first played, active payer status*. **Consequence:
  device split, age segmentation, retention and session time need zero game-defined events.**
- The age-band data rule, discharged as platform policy
  `[research: https://about.roblox.com/community-standards]` — the enumerated PII list (email,
  passwords or access tokens, home address, financial information, medical information,
  telephone number, off-platform internet identifiers, sensitive credentials, visual and audio
  media of a user) and *"users may be prohibited from sharing or requesting personal information
  on Roblox depending on their age"*. This is the rule `02` complies with. **Note the shape of
  the compliance:** `LogCustomEvent` takes a `Player`, so identity is the platform's and the
  game defines no identifier at all — which is what makes an 8–14 audience a non-issue rather
  than a mitigation.

**Could not fetch, and what would settle each:**

- **Roblox Terms of Use** (`en.help.roblox.com/hc/en-us/articles/115004647846`) — **HTTP 403**.
  So is the Privacy and Cookie Policy (`…/115004630823`) and the Creator Third Party App Policy
  (`…/37924211313044`). Search results attribute to them *"users are only allowed to be
  identified by their user ID"* and a reference to a *"Creator Analytics Terms of Use"*, but
  **I did not read those pages and they are recorded as `[unverified]`.** Settling fetch: any
  of those three help-centre articles retrieved with a browser-class user agent, or the same
  clauses located in `Roblox/creator-docs` on GitHub.
- **The scope of `CCU` in the rate-limit formula** — the table says *"Total AnalyticsService
  requests per minute"* against `CCU` and does not say whether the budget is per server or per
  experience. `[unverified]`. `03` must assume the conservative reading (experience-wide, so a
  single 16-player server may not spend the whole budget) and say that it assumed it. Settling
  fetch: a Roblox DevForum announcement thread on the analytics rate limit, or a support
  clarification.
- **What happens past the rate limit** — dropped, throttled, or errored. Not published on any
  page fetched. `[unverified]`; `03` states the behaviour it assumes.
- **`pacing.tickGapRealisedSeconds`, `pacing.aboveTickGapMaxSeconds` and every wave-4 figure** —
  deliberately not copied. Wave 4 is FAIL and `_verified-wave4.md` RR-9 and RR-10 move rows this
  domain instruments. Every sheet names the field; none carries the number.
