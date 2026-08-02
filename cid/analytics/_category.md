# Analytics — category brief

**Wave:** 5. Source: `concept/spec/incremental-spinoff-v2/`. Read `HANDOFF.md` first, then
`CONCEPT.md`, `00-CORE.md`, and every numbered sheet through `04-PRESENTATION.md` — that sheet's
own header names you: *"Anyone working on UI, art, audio, persistence, security, accessibility or
**analytics** reads this, plus layers 1–3 above it."* `OPEN.md §2` carries your batched default.

This is an **assignment document.** It contains no Analytics decisions. No event name, no metric,
no threshold, no target, no alarm value and no sampling rule appears below. If one does, a domain
lead has been robbed of its job.

**The category's job in one line:** this game's design is a stack of stated numeric predictions,
one human confirmed four of them by feel on 2026-08-01, and **your five domains exist to make
those predictions falsifiable in production.** An event that settles no stated prediction is
telemetry for its own sake. A prediction with no event is a guess that will never be corrected.

---

## What the brief binds for this whole category

| constraint | tag | consequence for Analytics |
|---|---|---|
| *"This game exists to prove the `arga` pipeline works end to end."* … *"Success is **shipped artifacts, not players**"* (`00-CORE.md`) | `[brief: binding]` ← `[you chose: R1 Q3]` | The project's own success metric is **not a player metric.** Every domain here must say what its numbers are *for* against that, and KPI must reconcile it explicitly rather than assume a live-service dashboard. |
| Non-goals: *"Beating the genre's retention curve. Offered and declined."* · *"Revenue. Offered and declined"* (`00-CORE.md`) | `[brief: binding]` ← `[you chose: R1 Q3]` | Retention and revenue may be **measured**; neither may be optimised for, and no domain may propose a design change to move them. Engagement and Economy Health both sit on top of a declined goal and must state it. |
| *"**8–14, mobile-heavy, short sessions.**"* · *"10–20 minute active sessions"* (`00-CORE.md`) | `[brief: binding]` ← `[you chose: R1 Q4]` | The 600–1,200 s band is the divisor every wall-clock prediction in `pacing` was derived from. It is also the **age band** that bounds what may be collected at all. |
| *"~70% mobile / ~25% desktop / ~5% console"* (`00-CORE.md`) | `[brief: soft]` ← `[I assumed]` — *"the split; the band was chosen"* | Device is a legitimate dimension **and the split itself is a prediction with no source.** `cid/_state.md` records it as uncorroborated by anything wave 2 fetched. |
| *"**Tuning burden:** discovery rates must be generous enough that a typical session yields at least one find, or the stated session objective silently fails. **This is the highest-risk tuning in the game**"* (`03-META.md`) | stated risk; Balance relays it as `[brief: binding]` | The brief names its own highest risk. `balance/05` says it is now carried by exactly two numbers (`collection.relicsPerArea` 3 and the realised lap) and *"re-opens only if `relicsPerArea` falls to 1 or the realised lap passes 600 s"*. That is a falsifiable claim and it is the single most valuable thing this category can instrument. |
| Session objective: *"find at least one new relic"* → measurable: *"collection count rose this session"* (`03-META.md`) | `[brief: soft]` ← `[you accepted: R6 Q3 → R5 Q3]` | The brief already wrote one measurable definition for you. Do not re-invent it; do decide its population and its pass mark, which the brief states for nothing. |
| `OPEN.md §2` Measurement: *"Three things: (1) did a first-session player reveal a relic, and how fast … (2) average time to complete an area — the pacing number nobody could source; (3) set-completion rate per set"* | `[brief: soft]` ← `[I assumed — §2 default]` | **Your starting point, and it is overridable with a reason.** It names three subjects and **no unit, no population and no pass mark for any of them.** Item (3) is partly obsolete: `systems/05` removed the discovery rate and made placement a seeded partition. |
| Rationale on the same default: *"all three test assumptions this spec rests on rather than reporting vanity."* | `[brief: soft]` | The stated selection principle. Every domain should be able to answer "which stated assumption does this test?" for each thing it defines. |
| *"**Permanent multipliers only. Never content access.**"* (`03-META.md`) | `[brief: soft]` ← `[you accepted: R5 Q4]` | Bounds what a monetization metric can even be about. There is one axis sold, one item, one price. |
| *"**Cleared is permanent** — overgrowth never returns."* (`01-FOUNDATION.md`) | `[brief: binding]` ← `[you chose: R2 Q1]` | Progress is monotonic. No metric may assume a reset, a decay or a return-to-zero, and `OPEN.md §2`'s technical note that *"the world itself is save data"* is what makes per-area state readable at all. |
| *"**Zero tension is deliberate.**"* · *"There is no failure state."* (`02-GAMEPLAY.md`) | `[brief: soft]` ← `[you accepted: step 6 Q2]` | There is no failure event, no death, no loss, no retry. **A funnel step whose drop-off implies failure is describing a game that does not exist.** Drop-off here means "stopped playing", never "lost". |
| *"Shared server, parallel progression, own areas, **no mechanical interaction**."* (`02-GAMEPLAY.md`) | `[brief: soft]` ← `[you accepted: R6 Q2]` | Nothing measured about one player is a function of another. Leaderboards are priority 3, so **no comparative figure may be surfaced to players.** |
| Live-ops: *"Ships and settles. No seasons or events."* (`OPEN.md §2`) | `[brief: soft]` ← `[I assumed]` | No metric exists to trigger a live event, because there are none. The KPI *"who acts on what"* column has one plausible actor and it is the developer. |
| Approved upstream, wave 1: *"**Measure freely, display none of it**"* — `theme/tone/04`'s `X10`, relayed by `theme/fantasy/03` | approved spec, not brief | **Binding on all five domains.** Nothing this category defines may appear on a player-facing surface. It also means no domain here owes `vocabulary` a player-facing string. |

**One boundary from the graph, restated because it is easy to cross:** you do not own *"the
technical logging pipeline (Tech & Data) — this category defines what to record and how to read
it, not how the pipe is built."* Tech & Data runs in this same wave. Where you need something
emitted that no module produces today, that is a **stated requirement to Tech & Data**, not a
design of theirs you may write.

---

## Scope gate

`03-META.md` **priority 3 — explicitly not in this project:**

> real procedural generation · rebirth · offline accrual · codes · daily rewards ·
> **leaderboards** · trading · seasons and events

*(the priority **ordering** carries `[I assumed]`; the cuts themselves do not — rebirth is
`[you chose: R2 Q2]` and offline accrual follows from `[you chose: R2 Q1]`.)*

**No domain may name, imply, or build fiction around any of it.** In this category the live
temptations are specific and all three must be refused:

1. **Leaderboards.** A ranking, a percentile shown to a player, a "top clearers" figure, or any
   metric whose stated purpose is comparison between players. Measuring a distribution internally
   is fine; a surface is not, and `X10` closes it anyway.
2. **Daily rewards and seasons.** A retention metric may not be defined in terms of a daily
   streak, a login window, or an event calendar, because none exists and none may be reserved for.
3. **Rebirth and offline accrual.** No metric may be defined over a reset cycle or over time away
   from the game accruing anything.

**Naming one of these in order to forbid it is compliant** and is the expected form. A domain
whose whole subject turns out to be priority 3 still runs and correctly concludes there is nothing
to spec — that conclusion is information and it belongs in the sheet.

---

## The measurable surface, enumerated once

Five leads partition **this** list. Do not each invent your own.

### A · What the shipped game can observe today, without one new module

Derived from `game/src/` and `game/src/shared/Protocol.luau`, read this run. These are facts about
code that exists, not a design.

| observation point | what is knowable there | where |
|---|---|---|
| the server clearing tick | a patch cleared, its tier, its area ordinal, the currency credited, the running cleared count | `server/Clearing.luau` |
| the arming gate | whether the character has moved past `firstSession.armDistanceStuds` this life — the boundary between "joined" and "started playing" | `server/Clearing.luau`, per character, never persisted |
| `FindRevealed` | one Find name, at the instant its patch clears, up to `collection.relicsPerArea` per area | server → client |
| `SetCompleted` | one set id, once per player per set | server → client |
| `AreaRestored` | one area label, once per player per area, on the latch transition | server → client |
| `BuyUpgrade` → `UpgradeApplied` | a purchase attempt, and separately a **successful** purchase with its id and new held level | client → server, then server → client |
| `StateChanged` / `RequestState` | the eight snapshot fields: `currency`, `upgrades`, `rowsRevealed`, `found`, `areasFinished`, `clearedCount`, `areaPatchCount`, `areaLabel` | both directions |
| join / spawn | session start, plot assignment, restored state | `server/init.server.luau`, `server/Plots.luau`, `server/Persistence.luau` |
| entitlement resolution at join | product ownership booleans — **all false today** | `server/Entitlements.luau` |

**Two facts about this list that bind every domain.** A failed purchase produces **no packet at
all** (`input.verbs[buy].onPreconditionFail` is `silentNoOp`), so a client-side diff cannot
distinguish an ignored buy from an accepted one — `UpgradeApplied` exists precisely because of
that. And **nothing in the repo calls any analytics service**: grepped `AnalyticsService`,
`LogService`, zero hits in `game/src/`. Every one of these observation points is a *place a call
could go*, not a call that exists. That is the single largest request this category will make of
Tech & Data.

### B · The stated design predictions, which are what the above exists to test

Every row is a number a sheet already published. Each domain assignment below names which of these
rows it is responsible for making refutable.

- **`pacing`** (`balance/05`, proposed): `lapTargetSeconds` 165 `[120, 200]` · `routeSlack` 2.0
  `[1.5, 2.6]` · nine `realisedLapSeconds` (127.9–149.6) and nine `underbuyLapSeconds` ·
  `revealGapSeconds` per lap against `aboveTickGapMaxSeconds` 90.0 · `tickGapRealisedSeconds` 1.17
  against 3.0 · `completeLapsPerSession` `[4, 8]` against `sessionBandSeconds` `[600, 1200]` ·
  `purchaserFloorMarginTarget` 0.13 and `arrivalCeilingMarginTarget` 0.05, both
  `marginTargetTestRange` `[0.10, 0.25]` · **ten `milestones[]` rows**, each with `baseSeconds`,
  `purchaserSeconds`, `measuredFrom` and a `source`.
- **`firstSession`** (`onboarding/02`): `ceilings.secondsToFirstClear` 3.0 from `firstInput` with
  a stated population · `ceilings.secondsToFirstReveal` 10.0 from `join` with a stated population ·
  beats `firstOrdinaryClear` 15.0 `[10, 25]`, `tierContrast` 45.0 `[25, 75]`,
  `firstSpendAffordable` 60.0 `[40, 120]` · **seven `teaching[]` rows, each already carrying an
  `evidence` string that is a measurable predicate** · six `withheld[]` surfaces with their lift
  conditions, three of them latched to persisted booleans.
- **`tierMix`** (`balance/02`, proposed): `expectedValuePerPatch` 5.16 / 5.85 / 6.66 / 7.45 by
  depth · eight `incomePerAreaAtLevelZero` rows · `freeParameter` 22, `testRange` `[18, 25]`
  (wave-4 verification requires `[18, 23]`).
- **`solvency` / `upgrades`** (`balance/03`, proposed): `costGrowth` test range `[1.24, 1.40]`,
  `maxLevel` `[16, 24]`, the ladder total against cumulative income (the ×3.26 solvency ratio).
- **`axisBudget`** (`balance/04`, proposed): four `setBonus` factors at 1.20, `[1.10, 1.35]`
  (verification requires radius `[1.10, 1.22]`) · **`products.items[span].factor` 1.75,
  `factorTestRange` `[1.40, 1.95]`, requested `[1.40, 1.82]`.**
- **`social`** (`social/01`, `social/02`): `maxCoPresenceSeparationStuds` 128 `[85, 185]`, now
  scoped `spawnMomentOnly` · `maxPlayers` inside 12–20, **assigned to nobody** (`_state.md`).
- **`layout` / `depths` / `endgame`**: `chunksPerFamily` 8, `[8, 16]` — the prediction is *how many
  authored chunks before shuffling reads as repetition* · `meta/06`'s inward offset 8 studs and its
  *"whether 10 seconds reads as a stall"* · `meta/07`'s open question *"whether a player reaches
  the terminal state at all"*, against DIG's cited 0.4%.
- **`response` / `mechanics`**: reveal dwell 2.5 s `[1.5, 4.0]` · residue 0.4 s `[0.2, 0.8]` ·
  onset separation 0.6 s `[0.35, 0.9]`, taken to 0.35 s by `pacing` · repeat-guard debounce 0.35 s
  `[0.2, 0.6]` · `movement.baseClearRadius` 5.5 · five per-beat acknowledgment budgets (80 ms,
  200 ms, 250 ms, 300 ms, 400 ms).
- **Wave-1 theme predictions with a stated numeric form**: `theme/fantasy/02`'s promise floor of
  8 laps `[8, 60]` · `theme/tone/01`'s register figure, target 5.0, ceiling 6.0, `[4, 8]` ·
  `theme/tone/02`'s humour count, 3 to 8 of 24.

### C · The one empirical reading that exists

One playtest, one player (the developer), 2026-08-01. Reported: area 1's clear time matched the
estimate, the first find arrived quickly, shard values felt right, the area transition read well,
the purchase buttons rendered in the wrong place. **Four of five are quantities the design
predicted and one human confirmed by feel; n = 1 and none was timed.**

**Note for whoever holds run state:** that reading is recorded in no sheet, in no `cid/` file and
in no `docs/` file. It reached this category through a dispatch message. See the gaps section.

---

## Domain assignments

Each domain writes `_lead.md` plus its numbered sheets and **must produce data, not only prose.**
The key named for each is the one I expect it to propose, in the form
`{"provides": "<key>", "status": "proposed", "value": …}`. None of the five collides with the 25
merged keys or with wave 4's four proposals (`tierMix`, `solvency`, `axisBudget`, `pacing`) —
verify that yourself against `cid/_contract.md` before you write, because proposing an existing
key is an error the merger rejects.

---

### 01 · Event Logging Lead → `/cid/analytics/events/_lead.md`

**Proposes: `telemetry`.**

**Owns** (from the graph): the event catalog · naming convention · properties per event · sampling
rules · required vs optional fields.
**Does not own:** how events are aggregated into a report (Funnels, Engagement, Economy Health);
how the pipe is built, batched, retried or stored (Tech & Data).

**Latitude: wide, and it is the widest in this category.** The brief says nothing about events at
all. `OPEN.md §2`'s measurement default names three *subjects* and zero events. Nothing upstream
has named an event, a payload field or a convention. This is genuinely yours to invent.

**What binds you specifically:**

- **Surface A above is your input, and it is closed today.** Seven declared channels, one server
  tick, one join path. `Protocol.luau` states *"Exactly seven channels, and no more"* and enforces
  the client-originated set against `GameConfig.Input.clientOriginatedRemotes` at load. **An event
  you define that needs an eighth channel is a request to Tech & Data with a stated reason, and it
  must be written as one.**
- **The age band.** *"8–14"* `[brief: binding]` ← `[you chose: R1 Q4]`. Analytics Verification
  checks *"nothing collected exceeds what the brief's audience age band allows"*. The brief says
  nothing about this, so **it is a research obligation, not a judgement call** — cite the platform
  rule you are complying with rather than asserting a policy.
- **`X10`, "measure freely, display none of it."** No event may require a player-facing surface.
- **Naming.** Event names are internal identifiers. `theme/vocabulary/04` rules that internal
  identifiers *"are not player-facing and are not governed by this list"*, **but** that a declared
  coinage *is* governed — *"a writers' handle is a word writers then use across sheets"*. If you
  declare a coinage block you inherit `bannedWords`; if you keep names as bare identifiers you do
  not. Decide which, and say which, in one line. Note that the coinage mechanism is **advertised
  and unimplemented**: `theme/vocabulary/04` states plainly *"none of them exists yet … every rule
  on this sheet is advisory"*.

**What is genuinely open:** every event, every payload field, the required/optional split, the
naming convention, sampling (and whether a game at this population needs any), and whether an
event fires per patch or per aggregate — the clearing tick runs at 25 Hz under `balance/03`'s
requested `clearTickRate`, so per-patch emission is a volume decision you must make consciously.

**The prediction your work is capable of refuting:** `core-loop/01`'s two gap ceilings —
*"A moving player is paid at least once every 3 seconds"* and *"no more than 90 seconds"* between
above-tick payoffs. Neither is checkable without a timestamped payoff stream, and
`_verified-wave4.md` finding 5 says the published 49.9 s figure *"is a mean presented as a
maximum"* with a real worst case near 99.7 s. **You are the only domain that can settle that.**

---

### 02 · Funnels Lead → `/cid/analytics/funnels/_lead.md`

**Proposes: `funnels`.**

**Owns:** onboarding funnel steps · first-purchase funnel · tutorial completion · drop-off
thresholds that trigger action.
**Does not own:** long-run retention curves (Engagement); the beats themselves (`gameplay/onboarding`,
approved wave 3 — you measure them, you do not re-time them).

**Latitude: narrow on the onboarding half, and that is a gift.** `onboarding/02` and `03` have
already written your steps and, in the `teaching[]` array, your evidence predicates. `onboarding/03`
says so directly: *"the observable column is a list of definitions, not a measurement plan.
Whether any of the seven is instrumented, and at what pass mark, is yours."* `onboarding/04`
closes with *"Whether any of this is measured (Analytics — Funnels)."* **Do not re-decide a beat.
Decide populations, pass marks, and which of the seven is worth an instrument at all.**

**What binds you specifically:**

- `OPEN.md §2` item (1): *"did a first-session player reveal a relic, and how fast — validates the
  ten-second onboarding promise"* `[brief: soft]` ← `[I assumed]`. This is your headline funnel and
  the brief hands it to you already scoped.
- `firstSession.ceilings` gives you **units and populations the brief did not**:
  `secondsToFirstClear` is `measuredFrom: "firstInput"`, population *"all run-1 sessions in which
  any input occurred"*; `secondsToFirstReveal` is `measuredFrom: "join"`, population *"run-1
  sessions whose first input arrived by second 5.0"*. `onboarding/02` states the reasoning: *"a
  player who has not moved is not failing."* **Inherit both origins exactly.** `balance/05` warns
  that every other milestone row is join-relative, so mixed origins are already live.
- **Zero tension.** *"There is no failure state."* `[brief: soft]` ← `[you accepted: step 6 Q2]`.
  A drop-off is a player who stopped, never a player who lost.
- **The first-purchase funnel is not a funnel, and you must say so rather than build one.**
  Ruling R-4 removed the in-game store. `products` states `storeExists: false`,
  `purchaseSurface: "the Roblox experience page"`, `promptGamePassPurchaseCalls: 0`, and F19
  forbids a product being *"named, shown, priced or referred to anywhere inside the game."* Every
  `gamePassId` is `null`. **There is no in-game step sequence to instrument** — only an ownership
  boolean resolved at join, which is false for everyone today. Spec what is live; state what is
  specced-but-dormant; **do not spec a funnel through a surface that does not exist.**

**What is genuinely open:** pass marks (nothing upstream states one), populations beyond the two
inherited, which of `onboarding/03`'s seven concepts earns an instrument, drop-off thresholds, and
what "triggers action" means in a project whose stated success is shipped artifacts.

**The predictions your work is capable of refuting:** all six `firstSession.beats[]` bands, both
ceilings, and — the live one — **the contradiction between `pacing.milestones[firstPurchase]` at
17.0 s base / 9.7 s purchaser and `firstSession.beats[firstSpendAffordable].testRange` of
`[40, 120]`.** `_verified-wave4.md` RR-10 is fixing that in Balance, and its own note is the point
of your domain: *"Sheet `03`'s S3 only tests `firstPurchaseBand` … so nothing caught it."* A
funnel over the ordered beats would have. **Say in your sheet what your funnel would have caught,
because that is the argument for the domain existing.**

---

### 03 · Engagement Lead → `/cid/analytics/engagement/_lead.md`

**Proposes: `engagement`.**

**Owns:** session length and count · D1/D7/D30 retention · playtime distribution · feature adoption
rates · churn signals.
**Does not own:** the retention mechanics themselves (`gameplay/core-loop`, approved wave 1).

**Latitude: wide on definition, and constrained by a declined goal you must name.**
*"Beating the genre's retention curve. Offered and declined"* `[brief: binding]` ←
`[you chose: R1 Q3]`. You are the domain most exposed to that non-goal. **Measuring retention is
in scope; treating a retention number as a thing to improve is not.** State that in your `_lead.md`
so verification does not read your restraint as an omission.

**What binds you specifically:**

- *"10–20 minute active sessions"* `[brief: binding]` ← `[you chose: R1 Q4]`. `pacing` turned this
  into `sessionBandSeconds [600, 1200]` and derived `completeLapsPerSession [4, 8]` from it.
  **The brief's session band is itself an unverified prediction** — `balance/_lead` records
  `[research owed: the 2025 Roblox Benchmark Report's session-length interval table]` and says
  *"nothing here cites it."* Your domain is what would settle it from the game's own data.
- `OPEN.md §2` item (2): *"average time to complete an area — **the pacing number nobody could
  source**"* `[brief: soft]` ← `[I assumed]`. `core-loop/_lead` and `core-loop/04` both explicitly
  route their lap figure to this instrument. **`pacing` publishes nine realised laps, 127.9 to
  149.6 s, all `[playtest unknown]`. This is the highest-value single measurement in the game.**
- *"**Honest weakness:** without banked offline earnings, the pull to return is materially weaker
  than the reference's. That was the accepted trade for permanence."* (`03-META.md`,
  `[brief: soft]` ← `[you accepted: R3 Q3]`). The brief predicts weak return. You can check it.
  You may not fix it: offline accrual is cut, dailies and seasons are priority 3.
- **Feature adoption has four features.** Three upgrade rows and one index panel. That is the
  whole surface — `input` is closed at five verbs and four pressables. Size the subject to it.
- *"no mechanical interaction"* `[brief: soft]` ← `[you accepted: R6 Q2]` and leaderboards are
  priority 3: no engagement metric may be comparative or player-visible.

**What is genuinely open:** every definition (what a session is, when it ends, what churn means
with no failure state), the retention windows worth keeping given the declined goal, and whether
D1/D7/D30 need any event at all — the Roblox creator dashboard supplies them without one, and
saying so is a legitimate finding rather than a gap.

**The predictions your work is capable of refuting:** `sessionBandSeconds [600, 1200]` ·
`completeLapsPerSession [4, 8]` · all nine `realisedLapSeconds` and hence `lapTargetSeconds` 165
and `routeSlack` 2.0 · `meta/07`'s open *"whether a player reaches the terminal state at all"*,
which `pacing` puts at 1,059.5 s base / 605.4 s purchaser · `theme/fantasy/02`'s 8-lap promise
floor `[8, 60]` · and `balance/05`'s note that *"a 10-minute floor session ends inside area 5 for a
base player, so the collection is never finished in one floor session and is finished in one
ceiling session."*

---

### 04 · Economy Health Lead → `/cid/analytics/economy/_lead.md`

**Proposes: `economyHealth`.**

**Owns:** faucet and sink volume tracking · currency held per player over time · inflation warning
thresholds · price elasticity signals · ARPDAU and payer share.
**Does not own:** the economy design being measured (`gameplay/systems`, `gameplay/balance`);
cheating and server authority (Tech & Data — Security; `04-PRESENTATION.md` puts *"the economy is
the only thing worth cheating"* under Integrity, `[I assumed — not interviewed]`).

**Latitude: wide on the currency half, near-zero on the monetization half, and the asymmetry is
the assignment.**

**What binds you specifically:**

- **One currency, one faucet, one sink.** *"One currency."* `[brief: soft]` ←
  `[you accepted: R5 Q3 → R4 Q3]`; faucet *"clearing overgrowth, scaled by tier"*, sink
  *"clearing-speed upgrades"* (`02-GAMEPLAY.md`). `economy` keeps `faucetCount: 1` /
  `sinkCount: 1`. Your flow graph has two edges. Size the domain to that.
- **The ladder is the sink and it runs out.** `balance/03` puts the ladder total at 244,839 against
  cumulative income of 113,880 — a ×3.26 solvency ratio — and `pacing` dates ladder exhaustion at
  1,459 s base. `_verified-wave4.md` confirms *"42% of the ladder bought at 24/24"*. **Currency
  held per player is therefore predicted to be non-accumulating right up to exhaustion and
  monotonic after it.** `GameConfig.Economy.balanceCap` is `nil` (`_state.md` build note 5), so
  nothing caps it.
- **Duplicates went live under ruling R-2 and nobody has measured them.** `_state.md`: *"the
  duplicate problem goes live. `systems/05`'s safety argument was 'at today's 6×1 this is a
  no-op', and that expires here … the draw is now load-bearing and must be tested rather than
  assumed."* `core-loop/03` adds that a duplicate *"fires nothing"* — a silent case. **That is a
  design prediction with a stated failure mode and no instrument.**
- **The monetization half is specced and dormant, and you must label it that way.** One item, one
  axis, one price: `priceRobux` 499, `priceTestRange [349, 999]`, `factor` 1.75. **Every
  `gamePassId` is `null`**, so `UserOwnsGamePassAsync` cannot return true, `entitlements` resolves
  every product to not-owned, and **payer share is structurally 0 and ARPDAU is structurally 0
  today.** `products.externalPrerequisite` names this as a provisioning step owned by the
  developer. Spec the reading; state that it returns a constant until the id is filled; propose no
  in-game purchase surface, because F13 and R-4 forbid one.
- **Price elasticity has no experiment available.** No store, no prompt, no variant, one price.
  Say what could be read from the creator dashboard and what could not; do not design an A/B test
  the game cannot run.

**What is genuinely open:** every definition and threshold on the currency side, what an
"inflation warning" means in a one-faucet one-sink economy with no cap, how duplicate volume is
read, and the price-to-value reading itself. Note that `balance/_lead` explicitly reserved
*"the price-to-value ratio, as one row of `04`: Robux per unit of axis factor"* — that is Balance's
figure; **yours is the live reading that would confirm or refute it.**

**The predictions your work is capable of refuting:** `tierMix`'s four `expectedValuePerPatch`
figures and its eight per-area income rows · `meta/01` criterion 3's 700–1,200 band, predicted at
722 · `solvency`'s ×3.26 ratio and the 42%-bought figure · the duplicate rate implied by R-2 ·
and **`products.items[span].factor` 1.75, whose `factorStatus` string `_verified-wave4.md` ruling 5
found to make two false claims — *"1.95 is not the limit and area 2 is not where it binds (the bay
is, at 13.7%)."* A live price-to-value reading is the only thing that settles it, and it cannot be
taken while `gamePassId` is null. Say both halves.**

---

### 05 · KPI Lead → `/cid/analytics/kpis/_lead.md`

**Proposes: `kpis`.**

**Owns:** the KPI shortlist · target and alarm values per KPI · review cadence · dashboard layout ·
who acts on what.
**Does not own:** the underlying event definitions (Event Logging); any of the four domains'
metrics, which you select from rather than author.

**Latitude: wide, and pointed at the hardest question in this category.** Analytics Verification
requires *"every KPI has a target, an alarm value, and a stated owner action."* **The brief states
no target for anything and no pass mark for any number in the game.** You are inventing all of
them, against a project whose own purpose sheet says:

> *"Success is **shipped artifacts, not players** — every creative area produced usable output, the
> sheets fed them without gaps, and a playable build with real UI came out the far end."*
> `[brief: binding]` ← `[you chose: R1 Q3]`

and whose non-goals are retention and revenue. **Reconcile that explicitly.** A KPI set that reads
like a live-service dashboard for a game that declined retention and revenue would be a KPI set
for a different project. A KPI set organised around *"which stated design prediction is currently
falsified"* — `OPEN.md §2`'s own rationale, *"all three test assumptions this spec rests on rather
than reporting vanity"* — is the reading this brief supports.

**What binds you specifically:**

- The `X10` display ban: your dashboard is developer-facing by construction.
- *"Ships and settles. No seasons or events."* `[brief: soft]` ← `[I assumed]`. **Review cadence
  has to be honest about that:** there is no live-ops loop to feed, and `05-OUTWARD.md` says the
  design *"is unusually easy to extend, which is a live-ops advantage nobody asked for."*
- **"Who acts on what" has one actor.** The developer. `_state.md` records that *"the developer
  declined to arbitrate"* on wave-2 rulings. Name the actor honestly rather than inventing a team.
- Every alarm value you set is a number, and this project's rule for an unsourced number is
  established across four waves: `[playtest unknown]` with a starting value and a test range, never
  an invented number presented as sourced (`gameplay/_category.md`).

**What is genuinely open:** the shortlist itself, every target and alarm, cadence, layout, and
whether a "KPI" in this project is a player metric at all. **Judging that the headline set is
three prediction-checks rather than five business metrics is a legitimate output.**

**The prediction your work is capable of refuting:** `00-CORE.md`'s own success claim. It is the
only prediction in the brief that is about the pipeline rather than the game, and it is the one
this project was built to test.

---

## Domains judged thin for this game, and why that is stated rather than silent

**No domain is absent. Three are thin, and each is thin for a reason another sheet already
decided.** Verification should read a short sheet in these three as correct, not as under-served.

1. **Funnels' first-purchase half is thin to the point of being a single boolean.** Ruling R-4
   removed the in-game store; `products.storeExists` is `false`; `promptGamePassPurchaseCalls` is
   `0`; F13 forbids any prompt in any path; F19 forbids a product being named anywhere in-game; and
   every `gamePassId` is `null`. **There are no intermediate steps to drop off between.** The
   onboarding half of the domain is full-sized and well specified. Expect a lead that spends most
   of its sheets on onboarding and one short sheet stating precisely why the purchase funnel is a
   join-time ownership read.

2. **Economy Health's ARPDAU / payer-share half is dormant, not thin by design.** One product, one
   price, no dev products, no repeatables, no bundles, no discounts (F5, F12), and no live pass id.
   Both figures are structurally zero until the developer provisions the pass. The faucet/sink and
   currency-held half is real work. **Dormant is different from excluded — spec the reading and
   mark it as awaiting `products.externalPrerequisite`.**

3. **Engagement's retention half sits on a declined goal and mostly needs no events.** D1/D7/D30
   arrive from the platform's own creator analytics; the brief declined *"beating the genre's
   retention curve"*; dailies, seasons and leaderboards are priority 3, so **two thirds of the
   pull-back-hook instrument set does not exist** (`gameplay/_category.md` records the same
   finding for Core Loop). Concluding that this half needs zero game-defined events is a
   legitimate output. The session-length and lap-time half is the most valuable measurement in the
   category and is not thin at all.

**Event Logging and KPI are full-sized.** Event Logging has the widest latitude in the category
because nothing upstream has named an event. KPI has the hardest question because nothing upstream
has named a target.

---

## Gaps in the brief this category hit

Passed upward, not filled. Each names the domain that will have to decide it.

1. **The measurement default names three subjects and no unit, no population and no pass mark for
   any of them.** `OPEN.md §2`, `[I assumed]`, and `OPEN.md §5` row 8 lists it among four items
   *"batched by design"* at **0 interview questions**. `onboarding/02` already noticed: *"two
   ceilings with **units and populations**, which the brief's measurement item states neither of."*
   → **Funnels** (item 1), **Engagement** (item 2), **Economy Health** with **Engagement** (item 3).

2. **Measurement item (3) is partly obsolete and the brief cannot know it.** *"set-completion rate
   per set — whether depth-tiered discovery is tuned"* presumes a discovery *rate*. `systems/05`
   removed it: placement is a seeded partition and no draw can repeat, so set completion is
   deterministic given areas cleared. The tuning question survives as a **pacing** question, which
   `balance/05` says is carried by `collection.relicsPerArea` and the realised lap. → **Engagement**
   decides what replaces it; **Economy Health** if it is read as a flow question instead.

3. **No logging pipeline exists, anywhere.** Zero analytics calls in `game/src/`; nothing in
   `OPEN.md §2`'s technical shape default mentions one; the architect's 7-key technical contract
   does not carry one. **This category cannot build it** (`does_not_own`). → **Event Logging**
   states the requirement; **Tech & Data**, this same wave, owns whether it exists.

4. **The brief says nothing about what may be collected from an 8–14 audience**, while
   Analytics Verification checks exactly that. Integrity in `04-PRESENTATION.md` is
   `[I assumed — not interviewed]` and `OPEN.md` calls it *"the least defensible"* of the
   zero-question items. → **Event Logging**, as a sourced research obligation rather than an
   assumption.

5. **No pass mark exists for any number in this game.** Not one sheet across four waves states "we
   ship if X ≥ Y". Every figure is a prediction with a test range and no verdict rule. → **KPI**.

6. **The brief declines retention and revenue as goals while this category's domains are named for
   them.** That is not a contradiction to resolve silently. → **KPI** states the reconciliation;
   **Engagement** and **Economy Health** each state it locally.

7. **`products.items[span].factorStatus` makes two claims verification found false, and no live
   reading can settle either while `gamePassId` is `null`.** → **Economy Health** specifies the
   reading and marks it dormant; the id itself is `products.externalPrerequisite`, owned by the
   developer and outside this pipeline.

8. **The one playtest is recorded nowhere.** 2026-08-01, developer, n = 1, five observations, four
   of them confirmations-by-feel of predicted quantities. It appears in no `cid/` sheet, no
   `docs/` file and no `_state.md` section. **The pipeline has no artifact type for an empirical
   reading**, which is a structural gap in a project whose numbers are almost entirely
   `[playtest unknown]`. → **not this category's to fix.** Passed to whoever holds `cid/_state.md`;
   named here so verification does not treat its absence as an Analytics omission.

9. **`social.maxPlayers` inside 12–20 is still assigned to nobody.** `_state.md`: Balance declined
   it (*"nothing in the loop reads population"*), routed it to per-server-capacity work, and
   *"`architect` has already picked 16. Wave 5 should ratify rather than re-decide."* It is a
   Tech & Data item, not an Analytics one, but **it is the denominator of every per-server figure
   any domain here defines.** → **Tech & Data**, this wave; relayed so no Analytics lead assumes it.

10. **Wave 4 has not released.** `cid/gameplay/_verified-wave4.md` is **FAIL** with sixteen
    revision requests, nine of them inside instructions other agents are about to execute.
    `pacing`, `tierMix`, `axisBudget` and `solvency` are the keys this category measures and
    **their figures are in flux** — RR-9 and RR-10 both move rows this category would instrument.
    → **every domain here** cites the merged manifest and states which of its instruments moves if
    the corresponding revision lands. Do not copy a figure without naming its source sheet.
