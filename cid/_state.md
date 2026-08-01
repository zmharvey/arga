# CID run state — `incremental-spinoff-v2`

Brief: `concept/spec/incremental-spinoff-v2/`. Graph: `docs/cid-workflow.json`.

A wave is dozens of agents and outlives one context window. This file is what makes a
resumed run possible, and what stops a passed wave being silently rewritten.

## Gates a wave must clear before the next one starts

| gate | what it is | where |
|---|---|---|
| `npm run cid:verify -- --category <c>` | mechanical: index matches disk, sections present, criteria countable, provenance tagged, one spelling per term, cited URLs in the pack, data form present | `bridge/verify-sheets.mjs` |
| `npm run bridge` | the creative contract still merges; no key claimed twice; new keys land as proposals | `bridge/merge.mjs` |
| `cid-verifier` agent | the judgement half, run against that category's `checks` in the graph | `.claude/agents/cid-verifier.md` |
| `npm test` | 159 tests, incl. the shipped manifest's own copy rules | — |

A wave advanced on a PARTIAL is a wave that will be rebuilt.

## Waves

| wave | categories / domains | status | verdict |
|---|---|---|---|
| 1 | Theme & Narrative (6) ‖ Gameplay stage 1 — Core Loop | **done** | see below |
| 2 | Gameplay stage 2 — Systems, Mechanics, Multiplayer & Social | running | — |
| 3 | Gameplay stage 3 — Meta & Content, Monetization, Onboarding | not started | — |
| 4 | Gameplay stage 4 — Balance & Tuning | not started | — |
| 5 | Tech & Data ‖ UI/UX ‖ Analytics | not started | — |
| 6 | Art & Visuals ‖ Audio | not started | — |
| 7 | Live Ops ‖ Discovery & Marketing | not started | — |
| final | Cross-Category Verification | not started | — |

### Wave 1 — done, recorded after the fact

27 sheets across 7 domains (theme × 6, gameplay/core-loop). `cid:verify` PASS, `bridge`
COMPLETE 9/9. Its verdict was never written down at the time; this row is reconstructed from
the commit trail (`d55cc18` "Wave 1 complete: all 27 sheets written" through `856cfbe`).

**Open wave-1 debt, deliberately not blocking wave 2:**

- 6 of its 7 domains propose no contract key (`gameplay/core-loop`, `theme/fantasy`,
  `theme/identity`, `theme/lore`, `theme/setting`, `theme/tone`). `theme/tone` is the worked
  example of the fix — four sheets of register prose became `vocabulary.casing`,
  `.maxSentenceWords`, `.allowedPattern`. The other five have not had the same pass.
- 22 sheets are over the 100-line prose budget by 3,009 lines total.
- `theme/tone/02-flavour-and-humor.md` carries one `[research owed:]`.

## Sheets written outside the wave process — adopted, not rewritten

Eight sheets were written ad hoc during the build trials, before their domains had a lead.
The shipped game reads their manifests, so **their domain leads index them at their existing
numbers and plan only the gaps.** Rewriting them would break a running build.

| sheet | key it supplies | wave it belongs to |
|---|---|---|
| `gameplay/systems/01-overgrowth-tiers.md` | `tiers` | 2 |
| `gameplay/systems/02-the-currency.md` | `currency` | 2 |
| `gameplay/mechanics/01-reach-and-pace.md` | `movement` | 2 |
| `gameplay/meta/01-the-area.md` | `area` | 3 |
| `gameplay/meta/02-the-collection.md` | `collection` | 3 |
| `gameplay/onboarding/01-first-find.md` | `onboarding` | 3 |
| `gameplay/balance/01-upgrade-ladder.md` | `upgrades` | 4 |
| `art/objects/01-patch-footprint.md` | `patch` | 6 |

## Graph nodes that no longer describe reality

- **`architecture-lead` (`/cid/tech/architecture/`) does not run.** `a5171f1` split creative
  from technical: modules, runtime and stateShape moved to `architect/`, which owns them
  under its own 7-key contract. Wave 5 runs Tech & Data's other five domains only.

## Open `[cid: decided]` questions for the developer

_None collected yet — wave 1 predates this file._
