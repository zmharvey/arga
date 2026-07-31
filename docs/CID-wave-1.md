# CID Wave 1 — build spec

**Status: draft, one live slice run.** Graph: `docs/cid-workflow.json`.

Wave 1 is the two categories nothing else can start without. Everything downstream inherits
from them, so they are also where a defect is most expensive.

| agent | count | gates |
|---|---|---|
| Theme & Narrative Lead | 1 | all 8 other categories |
| Fantasy · Setting · Tone · Lore · Identity · Vocabulary Leads | 6 | — |
| leaf subagents | N per domain, lead decides | — |
| Theme & Narrative Verification | 1 | releases the category |
| Gameplay Lead → Core Loop Lead | 1 + 1 | Gameplay stages 2–4 |
| Gameplay Verification (pass 1) | 1 | Systems, Mechanics, Social |

Theme & Narrative and Core Loop run **concurrently**. They do not read each other. That is
deliberate: the loop is mechanical and the fiction is dressing, and forcing an order between
them makes one wait for nothing. Their first meeting point is Gameplay stage 2, where Systems
and Mechanics read both.

---

## The three contracts every wave-1 agent obeys

These are the parts that make the output usable rather than merely present. They apply to
every wave, not just this one.

### 1. Read the source sheets, never a paraphrase of them

A lead reads `concept/spec/{slug}/` directly, starting from `HANDOFF.md`. The category brief
a lead writes is an **assignment document**, not a retelling of the brief. Domain leads and
subagents also read the source sheets themselves.

Rationale: each retelling is a re-interpretation, and interpretation is where variance
re-enters. This is the same rule that makes `ui-forge`'s brief→spec seam pure code.

**Routing rule** (from the skill): read `CONCEPT.md`, `00-CORE.md`, and every numbered sheet
up to and including the deepest layer your work touches. Wave 1 touches layer 1, so wave 1
reads `CONCEPT.md`, `00-CORE.md`, `01-FOUNDATION.md`. It also reads `03-META.md` for the
scope ordering, and `OPEN.md` for latitude.

### 2. Carry provenance forward, or latitude dies at wave 1

Stage 0 tags every claim so a reader knows how much room it has. If CID sheets drop that,
wave 2 cannot tell a developer decision from a wave-1 invention, and by wave 4 nothing is
distinguishable. So every claim in a CID sheet carries one tag:

| tag | meaning | may a later wave overrule it? |
|---|---|---|
| `[brief: binding]` | traces to a `[you said]` or `[you chose]` item | **no** |
| `[brief: soft]` | traces to `[you accepted]` or `[I assumed]` | yes, with a stated reason |
| `[cid: decided]` | this agent decided it; the brief was silent | yes, with a stated reason |
| `[research: url]` | sourced externally | argue with the source |
| `[playtest unknown]` | cannot be known before playing; carries a starting value and a test range | must stay marked |

`[cid: decided]` is the important one. It is how a gap in the brief stays visible instead of
hardening into apparent fact.

### 3. End every leaf sheet with checkable acceptance criteria

2–4 criteria a build agent can check without judgment: a value, a count, a state, or an
observable behaviour.

> *"tone feels warm"* is not a criterion.
> *"no copy string anywhere uses an exclamation mark"* is.

This is what makes build-stage verification mechanical instead of another model's opinion.
A sheet whose criteria cannot be checked fails verification and comes back.

---

## Leaf spec sheet template

```markdown
# NN — <title>

**Domain:** <domain> · **Category:** <category> · **Wave:** 1

## Decision
<the call, in one or two lines. no hedging.>

## Why
<reasoning, every claim tagged. cite the brief line where it binds.>

## Consequences for other work
<what this forces or forbids elsewhere, named by subject not department.>

## Acceptance criteria
1. <checkable>
2. <checkable>

## Not decided here
<what this sheet deliberately leaves to someone else, and to which subject.>
```

`## Consequences for other work` is what cross-category verification diffs against. A sheet
with no stated consequences is either trivial or has not been thought through.

---

## Wave-1 agent contracts

### Theme & Narrative Lead
- **Reads:** the spec directory. **Writes:** `/cid/theme/_category.md`.
- **Produces:** an assignment document naming which of the six domains apply to *this* game,
  what each must cover, and what the brief has already settled for it.
- **Must state which domains are thin or absent for this game.** A game with no NPCs should
  have Identity told so explicitly, not left to discover it. Judging a domain unnecessary is
  a legitimate output; silently under-serving it is not.
- **Owns no content.** If this document contains a tone decision, it has overstepped.

### The six domain leads
Each reads the spec directory plus the category brief, enumerates its subject completely,
and writes `_lead.md` as an index: one numbered assignment per item, each with a one-line
statement of what that sheet must decide.

The index is the unit verification checks for coverage, so it has to be honest about what it
found missing in the brief.

**N is anchored to the build contract, not to the lead's taste.** Run
`npm run bridge -- --contract`: one sheet per contract key the domain owns, plus one per
genuine non-value decision, and nothing else. A domain that owns no keys says so in its
index, because that is a finding rather than an oversight.

*This line used to read "four small sheets beat one sheet with four sections." Given that
and no anchor, seven leads planned 51 sheets for wave 1 of which zero supplied a value a
build could read. Re-planned against the contract, the first three came back at 3, 5 and 4.*

### Theme & Narrative Verification
`checks` in the graph. The two with teeth:
- every term this category introduces appears **once** in the Vocabulary canonical list,
  spelled one way
- the tone sheets are specific enough to act on: a register and a humor level, **not an
  adjective**

Runs on `opus`, prompted to refute rather than confirm. A pass is the absence of a found
break, not an impression of coherence.

---

## Live slice — what actually ran

Input: `concept/spec/incremental-spinoff-v2/` (the designated test brief).

Ran the full vertical slice on one domain rather than all six, so the shape can be corrected
before it is repeated 53 times:

```
cid/theme/_category.md          Theme & Narrative Lead
cid/theme/tone/_lead.md         Tone Lead — 4 assignments
cid/theme/tone/01-register-baseline.md
cid/theme/tone/02-humor-level.md
cid/theme/tone/03-tonal-prohibitions.md
cid/theme/tone/04-emotional-beat-map.md
```

**Tone was chosen deliberately.** It is the gap the last skill pass fixed, and v2 predates
that fix, so this slice is also a live test of whether the fix was needed. Result is in
`02-humor-level.md`: the brief gives a register and three prohibitions but no humor level, so
the sheet had to mark its own call `[cid: decided]` and flag it upward. Under the amended
skill that decision would have come from the developer instead.

**One honest limit.** `must_verify` on Tone Lead requires fetching two shipping games in the
genre and recording their register. This dry run did not fetch. Every affected claim is
marked `[unverified — dry run]` with the specific fetch named, rather than written as though
sourced. A real run does the fetch first.
