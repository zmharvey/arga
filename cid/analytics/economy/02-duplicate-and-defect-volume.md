# 02 — Duplicate and defect volume

**Domain:** analytics/economy · **Category:** Analytics · **Wave:** 5

## Decision

**Duplicate volume is a correctness counter with an expected value of exactly zero and an alarm
value of literally 1.** One reachable duplicate, once, on any server, opens a revision request
against `discovery` / `layout` / `collection` — and may never produce a balance change, a credit,
a conversion or a currency sink. The same shape governs a second economy defect nobody has
claimed: a patch clearing at an unknown `tierIndex`.

**No manifest block.** Both counters land as rows in `economyHealth.readings[]` —
`duplicateReveal` and `unknownTierClear` — which sheet `01` carries.

**This sheet carries no manifest block.** Its readings are rows of **`economyHealth`**, which
sheet `01` supplies and which already carries `refShape`, `refSites[]` and `refCount` for exactly
this kind of citation. A volume reading that names a duplicate or a defect is a reading *of* that
key, not a second key beside it.

## Why

**The predicted rate is zero, so a rate is the wrong instrument.** `discovery.repeat.possible` is
`false`; its `cause` is *"only a layout that assigns a name outside its area's slice, which is a
build defect and not a game state"*; and `discovery.repeat.playerFacing` says *"no player can
reach this branch; it is a defect path"* `[research: repo — cid/gameplay/systems/05-the-find-ledger.md]`.
A rate needs a denominator, and a denominator asserts that some non-zero numerator is legitimate.
There is no legitimate non-zero here. **A count with a target of 0 and an alarm at 1 is the only
honest form**, and it is the form `analytics/kpis/_lead` independently reached for the same row.

**Why this matters now and did not before.** Ruling R-2 took `collection.relicsPerArea` 6 → 3 and
`collection.areasPerDepth` 1 → 2 `[research: repo — cid/_state.md]`. `systems/05`'s safety
argument was *"at today's 6×1 this is a no-op"*, and `_state.md` records that it **expired there**:
*"the draw is now load-bearing and must be tested rather than assumed."* The only thing now
preventing a duplicate is `discovery.pool.invariant` —
`relicsPerArea × areasPerDepth == |set|` — holding at runtime over a seeded partition. **A
structural guarantee that has never been observed is a prediction, and this is its instrument.**

**Zero tolerance, and the tolerance is not a taste call.** Under `core-loop/03` a duplicate fires
nothing at all, so the player walks over a buried Find and the game says less than it would for
an ordinary patch — a silent case in contact placement. `theme/fantasy/01` fixes a duplicate as
the one event in the game that adds nothing permanent. Both readings agree that the correct
population of duplicates is zero, so any nonzero reading is a build defect and not a player
experience to tune. `[research: repo — cid/gameplay/core-loop/03-reveal-placement.md]`

**The second counter, claimed here because nobody else has it and it corrupts an economy reading.**
`Clearing.clearPatch` has a `tier == nil` branch that clears the patch and pays
`economy.payoutFloor` `[research: game/src/server/Clearing.luau]`. That is a config defect that
**silently deflates the faucet**: sheet `01`'s `realisedValuePerPatch` would read low against
`tierMix.byDepth[d].expectedValuePerPatch` and the alarm would fire on the weight vector, which is
the wrong sheet. So the interlock is stated as data: **`realisedValuePerPatch`'s alarm is void
while `unknownTierClear` is above zero.** `analytics/events/_lead` names this branch as insertion
point 7 and assigns it no reading; taking it here rather than leaving it unowned.

**The reading requires an emission that does not exist, and that is a requirement on other work,
not a design of theirs.** The guard at `game/src/server/Clearing.luau` (`if state.found[find] then`,
line 288, warning at line 293) **only `warn`s and fires no channel**; `Protocol.luau` declares
*"Exactly seven channels, and no more"*; and `game/src/` contains zero `AnalyticsService` and zero
`LogService` calls. Both counters need one `LogCustomEvent` call each at an existing branch — no
new channel, no client message, no packet, no gameplay change. That is the smallest possible ask
and it is still an ask. **If logging-pipeline work declines it, that is a legitimate refusal and
it revises this sheet rather than defeating it**: the fallback is the existing `warn` line in a
server log nobody aggregates, and in that case the counter's status is **unread, not zero**. A
dashboard row that reads zero because nothing reports is indistinguishable from one that reads
zero because the design holds, and that distinction is the whole value of the row.

**Neither counter is a `LogEconomyEvent`.** No currency flows at either branch, so both ride
`LogCustomEvent`, whose call site, event id and naming are event-catalog work's. What is mine is
the reading: the definition, the population, the alarm and where a breach routes.

## Counters

| field | `duplicateReveal` | `unknownTierClear` |
|---|---|---|
| definition | one increment each time `clearPatch` reaches the `state.found[find]` guard | one increment each time `clearPatch` reaches the `tier == nil` branch |
| site | `game/src/server/Clearing.luau`, the guard warning at line 293 | `game/src/server/Clearing.luau`, the warning at line 274 |
| population | every session in a published place, all servers, unsampled | same |
| window | none — a lifetime count over the published place, never a per-session or per-day rate | same |
| expected value | exactly `0` | exactly `0` |
| alarm value | literally `1` | literally `1` |
| alarm status | invariant, not `[playtest unknown]` — there is no band to test | invariant |
| payload | the Find name and the patch index, both already in the warning string | the patch index and the offending `tierIndex` |
| readable today | **no** | **no** |
| fallback if emission is declined | a server `warn` nobody aggregates; status becomes **unread**, not zero | same |
| is a tuning signal | no | no |

## Routing on breach

| # | breach | routes to, as a revision request | forbidden response |
|---|---|---|---|
| D1 | `duplicateReveal >= 1` | `discovery` — the draw rule and `pool.invariant` | any balance change |
| D2 | `duplicateReveal >= 1` | `layout` — the per-area slice assignment and the layout seed | any currency credited for a duplicate |
| D3 | `duplicateReveal >= 1` | `collection` — `relicsPerArea × areasPerDepth` against set size | a duplicate sink, a conversion rate, a shard-per-duplicate |
| D4 | `duplicateReveal >= 1` | never to Balance and never to a cost curve | a consolation cue that costs or credits currency |
| D5 | `unknownTierClear >= 1` | `layout` — anchor generation assigns `tierIndex` | raising `economy.payoutFloor` to mask the shortfall |
| D6 | `unknownTierClear >= 1` | `tiers` — the row set the index points into | treating the deflated faucet as a weight-vector error |
| D7 | either counter | never a live tuning change of a shipped value | any runtime write triggered by an alarm |

**D1–D4's currency prohibition is forced, not chosen.** `02-GAMEPLAY.md` states
*"solve duplicates without adding a currency"* `[brief: soft]` ← `[you accepted: R5 Q3 → R4 Q3]`,
and `economy.zeroCreditEvents[find-reveal].credits` is `0`. **The prohibition is on a currency,
not on every answer**: `theme/fantasy/03` explicitly permits consuming or converting a duplicate
`Find` because a duplicate occupies no slot. That permission is Systems' to use and is untouched
here — I forbid only a currency response, which is what this domain could otherwise cause.

## Contract finding

A schema maintainer may reasonably prefer both counters in a **cross-cutting defect key owned by
runtime-integrity work** rather than inside `economyHealth`. Recorded rather than argued, with my
recommendation: **keep the *reading* here and let the *event* live in `telemetry`.** `unknownTierClear`
voids an economy reading and `duplicateReveal` routes to keys this domain measures, so the routing
rule belongs beside the readings it protects; but if a defect key is created, both rows move
whole, and nothing in sheet `01` changes except two `definedBy` pointers.

## Acceptance criteria

1. `economyHealth.readings` contains rows `duplicateReveal` and `unknownTierClear`, each with
   `expected: 0`, `alarm: 1` and `kind: "correctness"`, and **neither carries a `band`,
   `denominator`, `rate`, `tolerance` or `testRange` field**.
2. `economyHealth.readings[realisedValuePerPatch].voidedBy` equals `"unknownTierClear"`.
3. Both counters are declared `readableToday: false` and their emission requirement names
   `game/src/server/Clearing.luau` and the guard expression `state.found[find]`.
4. No row in `economyHealth` or in the merged `economy` key creates a second faucet or sink in
   response to either counter: `economy.faucetCount` and `economy.sinkCount` both stay `1`.

## Not decided here

Whether the two `LogCustomEvent` calls are written, their event ids, their naming and their
sampling — event-catalog work, which holds `telemetry`; the pipe itself — logging-pipeline work.
What a duplicate *does* in the game, and whether one is consumed or converted — `gameplay/systems`,
which holds `discovery`; I forbid only a currency response. The draw rule, the partition and the
slice assignment — `discovery` and `layout`. `relicsPerArea` and `areasPerDepth` — `collection`.
Whether a duplicate has a cue — Audio and feedback work, per `core-loop/03`. The pass mark and
whether either counter is a headline row — KPI work. Whether these counters move to a runtime
integrity key — whoever maintains `bridge/schema.mjs`.
