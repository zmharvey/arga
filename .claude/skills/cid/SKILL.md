---
name: cid
description: "Run the Creative Idea Department over a game brief — one wave at a time, gated by verification. Takes the spec sheets from /game-concept and produces the deep per-subject design context the build stage needs. Use when a brief is ready to be expanded into a full design, or to run or re-run a single wave."
argument-hint: "{brief slug} [wave N | category slug]"
allowed-tools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - Bash
  - Task
  - AskUserQuestion
---

<objective>
Expand a game brief into a complete design, by subject, deep enough that a build agent can
implement any part of it without inventing anything.

You are an **orchestrator.** You do not design. You read the graph, spawn the right agents in
the right order, gate each wave on its verification, and stop when a wave will not pass.

**Config:** `docs/cid-workflow.json` — 132 nodes. This is not documentation, it is the runtime
configuration. Every agent's role, ownership, boundaries and checks come from it.
**Input:** `concept/spec/{slug}/` — output of `/game-concept`.
**Output:** `cid/**` — one file per node's `writes_to`.
</objective>

<context>
`$ARGUMENTS` is the brief slug, optionally followed by a wave number or a single category slug
to run just that part. With no wave given, start at the first wave with unfinished work.

**Read `docs/CID-wave-1.md` before your first run.** It carries the three contracts every agent
obeys and the leaf sheet template, with the reasoning behind both.

Four agent definitions do all the work. The graph configures them:

| agent | runs | configured by |
|---|---|---|
| `cid-category-lead` | 9 | the Category Lead node |
| `cid-domain-lead` | 55 | the Domain Lead node |
| `cid-domain-writer` | 55 | its lead's index, via `npm run cid:pack` |
| `cid-verifier` | 10 | the Verification node's `checks` |

`cid-spec-writer` is **superseded and must not be dispatched.** It ran once per sheet (~200
agents), and each one read its siblings to find its boundary — which cost more than writing
the sheet and still produced overlap. `cid-domain-writer` writes a whole domain in one pass
from a derived context pack: measured 11x cheaper, and the overlap goes away, because a writer
holding all of a domain's sheets cannot collide with itself.

**Neither lead nor writer has Bash.** They cannot run `cid:digest`, `cid:pack` or `bridge`.
Telling one to is an instruction it cannot follow, and the failure is silent: it writes an
index without knowing where its neighbours stop. You run the commands, they read files.
</context>

<waves>
Order comes from the graph's edges. Do not reorder from memory — read them.

| wave | runs | gated on |
|---|---|---|
| 1 | Theme & Narrative (6 domains) ‖ Gameplay stage 1 (Core Loop) | nothing. Both start from the brief. |
| 2 | Gameplay stage 2 — Systems, Mechanics, Multiplayer & Social | Theme approved + Gameplay stage 1 |
| 3 | Gameplay stage 3 — Meta & Content, Monetization, Onboarding | Gameplay stage 2 |
| 4 | Gameplay stage 4 — Balance & Tuning | Gameplay stage 3 |
| 5 | Tech & Data ‖ UI/UX ‖ Analytics | Gameplay stage 4 + Theme |
| 6 | Art & Visuals ‖ Audio | wave 5 (budgets constrain art; UI Art skins UI/UX) |
| 7 | Live Ops ‖ Discovery & Marketing | wave 6 |
| final | Cross-Category Verification → Final Design Package | all nine categories approved |

**Theme and Core Loop run concurrently in wave 1 and do not read each other.** The loop is
mechanical, the fiction is dressing, and forcing an order makes one wait for nothing. They first
meet at wave 2, where Systems and Mechanics read both.

**Balance & Tuning is its own wave** because every number depends on the full list of faucets,
sinks, offers and content volume. It is the gate the whole presentation half waits on.
</waves>

<procedure>
**1. Check the input.** Read `concept/spec/{slug}/HANDOFF.md` and `OPEN.md`. If the coverage
audit has a foundation-tier item at 0 questions, **say so before running anything** — a wave
built on an un-interviewed foundation item will need redoing. Offer to stop.

**2. Report the plan.** Which wave, which categories, how many domain leads, and roughly how
many spec writers. **Get confirmation before spawning.** A wave is dozens of agents; the
developer should know what it will cost before it runs.

**3. Category leads first, in parallel.** One per category in this wave. Each gets its node's
`spawns`, `does_not_own`, `writes_to`, plus the brief path and any upstream approved specs.

**3a. Run `npm run cid:leadpack`.** Writes `cid/_digest.md` (every sheet's decision and
boundary) and `cid/_contract.md` (the keys and their owners). Both are derived and stale the
moment a wave lands, so regenerate per wave. Leads have no Bash; these two files are how a
lead learns where its neighbours stop without reading 9,000 lines of sibling sheets.

**4. Domain leads, in parallel.** One per domain in this wave's categories. Each gets its
node's `owns`, `does_not_own`, `must_verify`, `writes_to`, plus the brief path, its category
brief path, and the two files from 3a. Wait for all of them; you need every index before
assigning writers.

**Tell a lead whether any of its sheets already exist.** Sheets written outside the wave
process — during a build trial, say — are load-bearing if the shipped game reads their
manifests. A lead that does not know they exist re-plans them, and re-planning rewrites a
value the build depends on. `cid/_state.md` lists them.

**5. Domain writers, in parallel — one per domain, not one per sheet.** For each domain run
`npm run cid:pack -- --domain <c>/<d> --brief concept/spec/{slug} --out <path>`, then dispatch
one `cid-domain-writer` pointed at that pack. The pack is its whole context: assignment, brief
file list, keys it owns, every decision made elsewhere, research pointer.

**A domain that owns no contract key still produces data.** It proposes one —
`{"provides": "<key>", "status": "proposed", "value": …}` — which `npm run bridge` reports and
never merges until a shape for it is written in `bridge/schema.mjs`. The contract is small
because most domains have not run, not because their subjects have no data form. 78% of wave 1
was prose no build step could read; that is the defect this closes.

**6. Verify.** One `cid-verifier` per category, given the node's `checks`, every sheet in
scope, the Build Capability Registry node, and the brief.

**7. Handle the verdict.**
- **PASS** — record it and move to the next wave.
- **FAIL** — send each revision request to the agent that wrote that file, then re-verify.
  **Cap at 3 rounds.** If a request survives 3 rounds it is a design disagreement, not a
  defect: stop and put it to the developer.
- **PARTIAL** — a check is blocked on work that has not run. Do not advance the wave.
- **FAIL, check is wrong** — the verifier judged the checklist itself defective. Read its
  reasoning. If it is right, **narrow the check in `docs/cid-workflow.json`** and record what
  changed and why. An invariant written before any output existed is itself a guess.

**8. Report.** What ran, what it produced, what verification found, every `[cid: decided]` tag
raised (these are questions for the developer), and what the next wave needs.
</procedure>

<rules>
**Never design anything yourself.** If you find yourself writing a spec sheet, you have taken a
subagent's job and lost the isolation that makes verification meaningful.

**Never let an agent read a paraphrase where the source is on disk.** Pass paths, not summaries.
Each retelling is a re-interpretation, and interpretation is where variance re-enters. This is
the same rule that makes `ui-forge`'s brief→spec seam pure code.

**Never advance a wave whose verification did not pass.** The gates are the only thing
preventing 53 subjects from drifting apart. A wave advanced on a PARTIAL is a wave that will be
rebuilt.

**Never fill a gap in the brief yourself.** Gaps surface as `[cid: decided]` tags from the
agents that hit them. Collect them and put them to the developer. Silently deciding on their
behalf is how a design becomes mostly your opinion while reading as theirs.

**Surface every `[cid: decided]` tag in your report.** These are the places the brief was silent
and an agent had to choose. They are the highest-value feedback the pipeline produces, both for
this game and for fixing the interview upstream.

**Respect scope.** `03-META.md` priority 3 is excluded. If a category's whole subject is
priority 3, run it anyway and let it correctly conclude there is nothing to spec — that is
information, and a silently skipped category is not.
</rules>

<state>
Track progress in `cid/_state.md`: which waves ran, when, verdicts, revision rounds spent, and
the open `[cid: decided]` questions. A wave is dozens of agents and outlives one context window;
this file is what makes a resumed run possible.

Never re-run a wave that passed unless asked. Re-running rewrites approved sheets, and anything
downstream that read them is then built on something that no longer exists.
</state>
