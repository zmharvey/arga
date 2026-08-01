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
| 2 | Gameplay stage 2 — Systems, Mechanics, Multiplayer & Social | **closed** | round 1 FAIL (16) → round 2 PARTIAL (3) → all 19 closed; **1 escalated** |
| 3 | Gameplay stage 3 — Meta & Content, Monetization, Onboarding | writing | 3 indexes done, 11 sheets in flight |
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

## Wave 2 — 15 sheets, 3 domains

`cid:verify` PASS, 0 failures. `bridge` COMPLETE 9/9, 0 problems, 9 proposals collected.
163 tests green. The three adopted sheets are byte-identical. **Zero wave-2 sheets exceed the
100-line prose budget**; all 22 that do are wave 1's.

### The proposed-key queue — 9 keys, deliberately not promoted yet

Promotion means writing a shape and cross-key checks in `bridge/schema.mjs`, and the checks
worth having span keys — `economy` against `upgrades` against `modifiers` cannot be written
well one at a time. **Promote as a batch before the architect runs, not per wave.** Nothing is
lost by waiting: `sheetDigest` carries a proposed `provides` exactly like a supplied one, so
waves 3–7 already see these as decided facts.

| key | sheet | what it settles |
|---|---|---|
| `rarity` | `systems/03` | one graded ladder, read from `patch.tierIndex`; a Find has no rarity of its own |
| `economy` | `systems/04` | faucets, sinks, the clear formula, the payout floor |
| `discovery` | `systems/05` | the per-Find record, the draw rule, what a repeat does |
| `modifiers` | `systems/06` | what a permanent stat change is, and the order sources resolve in |
| `input` | `mechanics/02` | the closed verb list, with per-device bindings |
| `tool` | `mechanics/04` | held or abstraction, and what drives its appearance |
| `response` | `mechanics/05` | per beat: what fires, which side, latency budget, channel |
| `traversal` | `mechanics/06` | jump, edges, falling, player-to-player collision |
| `social` | `social/01` | population band, progress scope, plot tenure, collision, chat |

### Escalations from wave 2 — findings that outlive the wave

1. **`social` has no emitter path even once promoted.** `Players.MaxPlayers` is read-only from
   a script, chat is configured on `TextChatService` children, collision groups are set at
   boot. None is produced by `bridge/emit-config.mjs`; none is carried by
   `game/default.project.json`. Promotion implies a place-configuration emitter or a named
   boot module **in the technical contract**. For the architect, not for CID.
2. **Spawn orientation, not plot pitch, is what breaks "visible to each other".**
   `game/src/server/Plots.luau`'s spawn `Attachment` carries no rotation, so a character
   spawns facing −Z while the plot row runs +X: the nearest neighbour is 90° off axis, outside
   the frustum. A player spawns and sees nobody until they turn. Body and motion otherwise
   clear the legibility floor at the shipped 160-stud pitch with margin. **Meets bar (a).**
3. **`mechanics/01`'s acceptance criterion 1 does not deliver its stated intent** — radius 5.5
   < spacing 6, where the intent needs radius < spacing/2. Both the Mechanics lead and its
   writer flagged it independently. Meets neither stopping-rule bar and the values are
   shipped, so it is recorded, not fixed.
4. **The G1 ruling supersedes shipped code.** `game/src/client/Input.luau` is to be deleted;
   the game then fires zero game-defined client-to-server remotes. Nothing acts on this until
   the build stage re-runs.
5. **Two `[brief: soft]` lines were pushed back on**, both in `systems/05`: `02-GAMEPLAY.md`'s
   "guarantees repeat finds" is true only of a with-replacement draw, and `03-META.md`'s
   relic-luck allowance names a quantity with no referent once `luckShaped: false`.

### Research owed, still open after the wave-2 batched pass

- An index page from a shipping **Roblox** game with a finite roster and a stated repeat rule.
  The pass found four mechanisms but three are non-Roblox precedents, stated as such.
- Current `StarterPlayer`/`Humanoid` jump defaults. The decision ("platform default,
  unchanged, gating nothing") survives whatever the number is.
- The brief's ~70% mobile figure is uncorroborated by anything fetched. Nothing in wave 2
  rests on it, and `mechanics/03` says so in the sheet rather than quietly avoiding it.

## Escalations that need the developer, not another revision round

Both are at the point the skill calls a design disagreement rather than a defect: the sheets
have argued, contained and flagged, and another round would produce the same sheet with more
words.

### 1. The input overrule — `mechanics/02-verb-roster`

`buy` is a discrete select on a persistent pressable, overruling the brief's `[brief: soft]`
*"Input: movement only. No aiming, clicking, or ability buttons."* Contained to one input
class, two verbs, four controls, stated in the manifest so a later sheet cannot widen it
without failing a criterion.

**Why it happened:** the walk-into pad was the literal-compliance answer and does not survive
arithmetic — 10.6 s round trip at depth 1, 13.0 s at `core-loop/05`'s 236-stud depth-4 area
with speed already maxed, both legs over cleared ground that pays nothing, and bounding the
detour under `core-loop/01`'s 3-second tick ceiling needs 25 pad clusters in one depth-1 area.

**The part worth your attention:** `core-loop/01` mandated no-travel *while believing the
surface that ruling requires could not be built* — it names "the persistent HUD that
`OPEN.md §4` already flags as unbuildable". `hud-overlay` exists and is a persistent HUD; what
it lacks is `PRESSABLE` **by default**, which is a default and not an incapability.

**Your call:** accept reading B as written, or reopen `core-loop/01`'s no-travel ruling now
that its premise is false. Four alternatives are ranked in the sheet's
`## Flagged to the developer`.

### 2. `relicsPerArea` is over-constrained by two approved sheets

- `core-loop/01` criterion 2 — `collection.relicsPerArea >= 4`
- `theme/fantasy/02` criterion 1 — `ceil(24 / relicsPerArea) >= 8`, i.e. `<= 3`, recommends 3
- `systems/05` partition equality — at a six-member set, only (6,1), (3,2), (2,3), (1,6)

**No value satisfies both, and neither sheet cites the other.** `meta/04` must overrule one and
will say which. The real resolution may instead be revising the brief's "4 sets of 6"
`[you accepted: R4 Q4]`, which is yours and not a writer's.

### 3. Meta resolved the deadlock and the fix edits a shipped sheet — `meta/04`

`meta/04-the-depth-ladder` takes `relicsPerArea` **3**, overruling `core-loop/01`'s `>= 4`,
and issues a **revision request** against `02-the-collection` rather than editing it:
`relicsPerArea` 6 → 3, `areasPerDepth` 1 → 2. **Four depths, two areas each, eight areas.**

**I have not applied it.** Two reasons it is yours and not mine:

- It changes a value the shipped game reads, and doubles the area count.
- It makes the duplicate problem **go live**. `systems/05`'s draw rule was built for exactly
  this (`relicsPerArea × areasPerDepth == |set|`, so `3 × 2 = 6`) and is a no-op only while
  `areasPerDepth` is 1. So the design is coherent — but the safety of "it is a no-op today"
  ends here.

**I verified it validates clean:** applying 3/2 to the merged manifest produces zero problems
against every existing `collection` check, including the uncompletable-set check. So this is a
decision about scope, not a technical blocker.

It is probably the same conversation as the under-scoping note below, and possibly resolved by
the same ruling — `meta/04` lists 4 sets of 12 (48 finds, 4 areas per depth) as its own live
alternative (a).

### Related, and probably the same conversation

The `must_verify` for content volume found **DIG ships two islands against a 601-item
collection**, gating the second on 50% journal completion rather than on power, with per-area
100% badges at a 0.4% win rate. This game ships four areas and a collection `core-loop/04`
dates at **minute 11 of session 1**. That is the under-scoping the check was pointed at.

## Open `[cid: decided]` questions for the developer

Wave 1 predates this file. Wave 2 raised **13**, the four that most want a ruling:

- **Completion events credit zero currency** (`systems/04`). The brief is silent, and
  `core-loop/02`'s `1/3/8/20/50` payoff weights are numerically identical to `tiers[].value`,
  which invites the opposite reading.
- **Purchase is a walk-into pad and the keyboard binding goes** (`mechanics/02`). Four
  alternatives were ranked in the sheet's `## Flagged to the developer`.
- **Chat is off on all three surfaces** (`social/01`), decided on the sourced platform default
  rather than on age-gating, which stayed `[unverified]`.
- **Jump exists at the platform default and gates nothing** (`mechanics/06`).
