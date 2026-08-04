# 01 — The KPI admission rule

**Domain:** analytics/kpis · **Category:** Analytics · **Wave:** 5

## Decision

A number may be a headline KPI in this project only if it passes **all eight of `K1`–`K8`**
below, and the set as a whole must satisfy `K0`. The reconciliation those rules encode:
**`00-CORE.md`'s success claim is answered by the `pipeline` row and by nothing else; every
player reading admitted here is evidence about whether a shipped artifact is *true*, never
evidence about whether the project succeeded.** Retention and revenue may be recorded freely
and may never carry a target, an alarm or an actor.

This sheet **carries no manifest block.** It constrains which rows `kpis.rows[]` may hold
rather than being them; `02-the-shortlist.md` supplies `kpis` and is the domain's only manifest.

## Why

**The contradiction is real and it resolves by separating two populations, not by choosing
one.** *"Success is shipped artifacts, not players"* `[brief: binding]` ← `[you chose: R1 Q3]`
is a claim about the repo. It is falsifiable from the repo — the gates print COMPLETE or they
do not — and nothing a player does settles it either way. So it gets exactly one row, its
population is the repo, and it is the only row in this category that returns a verdict.

**That leaves the game rows a job, and they have one.** This design is a stack of stated
numeric predictions — nine realised laps in `pacing`, two ceilings in `firstSession`, a ladder
against an income ledger in `solvency` — every one `[playtest unknown]`. A shipped artifact
predicting a 165-second lap and delivering 400 is a shipped artifact that is **wrong**, and
"we shipped it" does not make it right. Player readings are therefore admitted as evidence
about artifacts, which is `OPEN.md §2`'s own principle — *"all three test assumptions this spec
rests on rather than reporting vanity"* `[brief: soft]` ← `[I assumed — §2 default]` — taken
literally rather than softened. That is `K1`.

**The declined goals are handled by removing the target, not the reading.** A number with a
target and an actor is a thing somebody is trying to move; a number with neither is a thing
somebody is looking at. D1/D7/D30 arrive from the platform with zero instrumentation
`[research: https://create.roblox.com/docs/production/analytics/analytics-dashboard]`, so
refusing to *record* them would be a second mistake on top of the first. `K3` draws the line at
the target, which is where *"Beating the genre's retention curve. Offered and declined"*
`[brief: binding]` ← `[you chose: R1 Q3]` actually binds. Ruling R-3 (`cid/_state.md`) already
declined an under-scoping finding on this ground, and a retention target reopens it sideways.

**`K2` exists because the standard shortlist reads zero here structurally, not empirically.**
Every `products.items[].gamePassId` is `null`, so `UserOwnsGamePassAsync` cannot return true;
ARPDAU, payer share and conversion rate are constants no play moves. The platform will not show
them below 10 DAU and 10 play hours for seven consecutive days
`[research: https://github.com/Roblox/creator-docs/blob/main/content/en-us/production/analytics/analytics-dashboard.md]`,
which a project whose success is artifacts may never clear. A shortlist reading zero forever
tells nobody anything, and a reviewer cannot tell refusal from omission unless refusal is a
rule. `[cid: decided]` — the brief states no pass mark for any number in this game, so all
eight rules are mine.

**`K4` is the graph's own bar** — *"every KPI has a target, an alarm value, and a stated owner
action"* (`docs/cid-workflow.json`, `analytics-verification.checks`). A KPI with no named actor
is a number on a wall. There is one actor, the developer, and `OPEN.md §4` names open work by
**kind of work** because the lineup changes; a row names a kind of work with a bracketed
current holder, and inventing a team would be the failure mode here.

**`K5` and `K6` defend against a live event, not a style preference.** Wave 4 is **FAIL** with
sixteen revision requests and has not released (`cid/gameplay/_verified-wave4.md`); RR-9 and
RR-10 move fields that admitted rows point at. A copied number goes stale silently; a pointer
moves with the field it names. **`K5` is a rule about the row, not about the path string** —
that distinction is what `kpis.refGrammar` makes mechanical, and the grammar stated there is
normative for every key that cites another key's field.

### The rule

| id | rule | what it excludes | the check a reviewer runs on a row |
|---|---|---|---|
| `K1` | It refutes **exactly one** stated design prediction, named as an owning sheet plus a manifest field path. | telemetry for its own sake; any number nobody wrote a claim about — CCU, index-panel opens, patches cleared per minute. | `predictionRefuted` is a `refGrammar` ref that resolves: a `manifestField` path against a merged or proposed key, or a `briefLine` carrying a `sheet` and a quoted `claim`. |
| `K2` | It **can move.** A number fixed by a structural fact of the shipped build rather than by play is not a KPI. | ARPDAU, payer share, revenue per session, conversion rate — all constant while every `gamePassId` is `null`. | Name the one structural fact that would have to change. If it exists and is outside this pipeline, the row is declined, not headlined. |
| `K3` | Its prediction is about **execution**, not a declined goal. Retention and revenue may be recorded; neither may carry a target, an alarm or an actor. | D1/D7/D30 as targets; any row whose claim reduces to "more players should return" or "more money should arrive". | Restate the row's claim in one sentence and check it is neither of those two. |
| `K4` | It names a **kind of work** that acts, with a bracketed current holder, and an action that is a revision request against a named sheet and field. **A verdict handed to a domain that has declined it is unowned and fails this rule.** | any number with no available response — terminal-state reach rate, declined by R-3; the device split, which nothing would be changed for. | `actorKindOfWork` non-empty; `action` names a sheet path and a field path. The second clause is what brought the above-tick payoff gap back in as a row. |
| `K5` | Its target is a **pointer**, never a copied number. | every figure in `pacing`, `solvency`, `firstSession` and `discovery` transcribed into this domain. | **The check is on the row, not on the path string.** No ref and no row carries `value`, `min`, `max` or a numeric `target`. A numeric literal is legal in a path only inside square brackets, where it is an array index. `kpis.refGrammar` is normative. |
| `K6` | Its alarm is either **pointer-relative** or `[playtest unknown]` with a starting value and a test range. | an invented threshold presented as sourced; a pass-to-alarm gap finer than the confidence interval at `minimumSessions`. | `alarm.basis === "pointer"`, or `alarm.status === "playtest unknown"` with both `startingValue` and `testRange`. |
| `K7` | It is **developer-facing only.** | any row implying a player-visible figure, badge, percentile or progress readout. | `theme/tone/04` `X10`, *"measure freely, display none of it"*: the row requires no new player-facing surface and owes `vocabulary` no string. |
| `K8` | It is **not comparative between two players**, and is not defined over a leaderboard, ranking, streak, login window, season, code, trade, rebirth or offline period. | all of `03-META.md` priority 3, named here in order to forbid it. | The row's population is one player or all players in aggregate, never one player against another. |
| `K0` | *A rule on the set, not on a row.* The shortlist contains **at least one row whose population is the repository and not players.** | a shortlist that cannot report on the project's own success claim. | some row carries `family: "pipeline"`. |

## Consequences for other work

- **Every other Analytics domain** (`telemetry`, `funnels`, `engagement`, `lapClock`,
  `retentionReadout`, `economyHealth`): defining a reading does not make it a KPI. Promotion
  happens in `kpis` alone, through `K1`–`K8`. Your keys hold readings with their own units,
  populations and per-instrument thresholds. Recording a number with no target, no alarm and no
  actor is legal and, under `K3`, sometimes required. **`K4`'s second clause binds both ways:**
  handing a verdict to a domain that has declined it leaves the reading unowned, which is a
  `K4` failure on whichever sheet still holds the instrument.
- **Retention-readout work and the dormant monetization half of economy-flow work**: `K3` is
  why `optimiseFor: false` and `dormant` are the correct forms and why neither may be
  headlined. That restraint is this rule, not an omission a verifier should close.
- **Balance and pacing work** (owners of `pacing`, `solvency`, `upgrades`): under `K5` a target
  of mine is a pointer at a field of yours, so a rename breaks a row silently until the
  resolver exists. A rename should carry the row ids that cite it.
- **Cross-category verification**: check the shortlist against this table row by row. Eight
  verdicts per row is the expected artefact; a row that cannot be tested against `K1`–`K8` was
  not written to this sheet.
- **Contract-and-seam work**: `K1` and `K5` are mechanical once the `refGrammar` resolver
  exists. The grammar is stated normatively in `02` — ref kinds, path grammar, subscript
  quantifiers, the absent-versus-null rule and a migration for each existing encoding — and
  nothing here restates it.

## Acceptance criteria

1. Every row of `kpis.rows[]` passes all eight of `K1`–`K8`, and a reviewer can produce eight
   recorded verdicts per row from the fourth column of the rule table alone.
2. No row of `kpis.rows[]` names D1, D7, D30, retention, revenue, ARPDAU, payer share or
   conversion rate in its `predictionRefuted`, and each appears in `kpis.declined[]` with a
   `reason` and the `K` id it fails.
3. At least one row of `kpis.rows[]` carries `family: "pipeline"` and a population that is the
   repository rather than players (`K0`).
4. This file contains zero ` ```manifest ` blocks, and `npm run bridge` reports exactly one
   sheet providing `kpis`.

## Flagged to the developer

**The reconciliation above is a reading of a `[brief: binding]` line, and readings can be
wrong.** I read *"success is shipped artifacts, not players"* as scoping the **verdict**, not
as forbidding player measurement. Two live alternatives, both narrower: (a) admit **no** player
row at all, which is internally consistent and throws away the only external check the design's
arithmetic has ever had; (b) admit player rows with no alarm on any of them, which makes this a
dashboard rather than a KPI set and fails the graph's own `analytics-verification` check.
**My recommendation is the reading as written**, because `OPEN.md §2`'s stated rationale is an
instruction to measure the design, and this design is almost entirely unmeasured.

## Not decided here

Which numbers pass this test, and their targets, alarms, actors, cadence, placement, verdict
rule and reference grammar — `02-the-shortlist.md`, which holds `kpis`. Event names, payloads,
sampling and call sites, and the above-tick clock behind row 7 — event-catalog work, which
holds `telemetry`. Onboarding steps, their populations and per-step conversion pass marks —
onboarding-funnel work, which holds `funnels`. The lap measurement's origins and its
session-spanning rule — lap-clock work, which holds `lapClock`. Every currency-side reading
definition and the duplicate counter's population — economy-flow work, which holds
`economyHealth`. Whether the pipeline has an artifact type for an empirical reading — closed
since this domain raised it: `cid/_playtest.md` exists and is run-state work's. Whether
`bridge/schema.mjs` grows the resolver that makes `K1` and `K5` mechanical — contract-and-seam
work, specified in `02`.
