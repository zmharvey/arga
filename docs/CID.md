# CID — Creative Idea Department

**Status: wave 1 built.** 37 sheets across 14 domains in Theme & Narrative, Core Loop and
the domains owning build-contract keys. `npm run cid:verify` passes. The rest of this file
is the original design brief; the run order below is what actually works.

## The rule that decides whether a domain runs

**A domain runs only if it owns at least one key in the build contract.** Check with
`npm run bridge -- --contract`. `npm run cid:verify` warns for every domain that breaks it.

This is the repo's own rule turned back on CID. Everything else here is checked for having a
consumer — an upgrade nothing applies is rejected, a state field nothing constructs is
rejected, a module nothing depends on is rejected. CID was the one stage exempt, and measured
after wave 1:

> **23 of 35 sheets and 6,297 of 8,051 lines came from domains that own no contract key.**
> 78% of the output could not be read by any build step.

| | sheets | lines |
|---|---|---|
| domains that own a key | 12 | 1,789 |
| domains that own nothing | **23** | **6,297** |

Those sheets are not bad writing; several are the best documents in the repo. But a decision
that cannot be stated as a contract value reaches the build only as prose, and prose has to be
re-interpreted by whoever reads it next. Exactly two rulings from those 23 sheets ever reached
the build, and a human carried both across by hand after noticing them.

**Three options when a domain has something real to say and no key to say it in:**

1. **Get it a key**, if the output is checkable. Tone's register was four sheets of prose; its
   checkable half is now `vocabulary.casing`, `.maxSentenceWords` and `.allowedPattern`, and
   the merger enforces all three on every player-facing string. `cid:verify` used to *warn*
   that labels shouted in some places and not others and leave the ruling to a human. It is a
   hard failure now, and the check that warned is deleted.
2. **Fold it into a domain that has one.** Naming is not a decision separate from the thing
   named, and neither is most tone.
3. **Do not run it.** A category that can only produce prose is advisory. Label it that way
   rather than funding it like a department.

The 23 sheets stay on disk as a record. Deleting them retroactively buys nothing; the rule is
for the next wave, which was going to add 41 more domains under the old one.

**Seven domains may run today:** `art/objects`, `gameplay/balance`, `gameplay/mechanics`,
`gameplay/meta`, `gameplay/onboarding`, `gameplay/systems`, `theme/vocabulary`.

## How to run a wave

```bash
# 1. leads plan. Category leads, then domain leads. Leads may fetch; writers may not.
#    Each domain lead writes cid/<category>/<domain>/_lead.md with an assignment table.

# 2. bank the research. Turns every [research: url] any lead wrote into one deduped file.
npm run cid:research

# 3. derive each writer's context. One pack per domain, nothing else needed.
npm run cid:pack -- --domain theme/tone --brief concept/spec/<slug> --out /tmp/pack.md

# 4. write. ONE cid-domain-writer per domain, handed its pack. Not one agent per sheet.

# 5. check mechanically, before spending an agent on judgement.
npm run cid:verify

# 6. only now, cid-verifier agents — on contradiction, occupancy and feasibility.
```

**Step 5 before step 6 is not a style preference.** In wave 1 three separate sheets each
spent ~150k tokens independently rediscovering that `area.label` is `EAST TERRACE` while
`collection.sets[].label` is `Terrace`. `cid:verify` finds it in milliseconds. An agent's
budget should go on judgement, never on counting.

### Why writers are batched by domain and handed a pack

Wave 1 ran one agent per sheet, each discovering its own context. That cost ~6.3M tokens of
input to produce ~110k of sheets — **~97% of the spend was input**, and most of it was the
same bytes delivered 37 times:

| what each writer pulled in | tokens |
|---|---|
| sibling sheets, to find where its subject stopped | ~86,000 |
| its own web searches, then fetches | ~60,000 |
| the brief, whole, including the report on how the brief was made | ~12,800 |
| `schema.mjs` + its lead's index | ~11,500 |

None of that is writing. It is re-derivation, paid once per sheet.

`npm run cid:pack` derives it once per *domain*: the assignment, the brief file list minus
process artifacts, the contract keys that domain owns, a 40-line digest of every decision
already made anywhere, and a pointer to the research pack. Measured on wave 1's own files,
**6.3M → 580k, about 11x**, at 14 agents instead of 37.

Detail is unaffected. `cid-domain-writer` inherits `cid-spec-writer`'s format contract
unchanged — same Decision, same manifest block, same 2-to-4 checkable acceptance criteria.
What changed is how context arrives and how many sheets one agent holds.

It also *removes* a defect rather than trading against one. Sibling overlap was the recurring
wave-1 failure, and reading siblings was how writers were supposed to prevent it. A writer
holding all of a domain's sheets cannot collide with itself.

**The one thing to watch:** a domain lead's assignment table is now parsed, and its
`must decide` cell is the writer's whole instruction. A vague row produces a vague sheet with
nothing upstream to fall back on.

## What it is

A set of creative agents that each invent one part of a game on top of stage 0's baseline.
Stage 0 establishes *constraints*; CID does the *creative work* inside them.

The division is strict and it is the whole point:

> Stage 0 settles "cosmetics only, never pay-to-win" — CID invents the SKUs.
> Stage 0 settles "fantasy-ornate, relics read as treasure" — CID invents the 24 relics.

## The lineup is deliberately NOT load-bearing

The current sketch is ~14 agents in 5 dependency waves:

| wave | departments |
|---|---|
| 1 | Theme & Narrative · Core Loop |
| 2 | Systems · Mechanics · Social |
| 3 | Meta & Content · Monetization |
| 4 | UI/UX · Art & Visuals · Audio · Tech & Data · Analytics |
| 5 | Discovery & Marketing · Live Ops |

**This lineup is expected to change and nothing in stage 0 depends on it.** That was an
explicit design decision: the spec sheets are organised by the *design's* dependency layers,
not by an org chart, so a reader routes itself by subject. If you reorganise into 9 agents or
20, the sheets still work unchanged.

Because of that, do not treat the table above as a spec. Treat it as one plausible slicing.

## What CID receives

`concept/spec/{slug}/` — 10 markdown files. Read `HANDOFF.md` in any spec directory first;
it is a subject index built for exactly this purpose.

**Routing rule:** a reader at layer N reads `CONCEPT.md`, `00-CORE.md`, and every numbered
sheet up to and including layer N. Nothing else is required.

**Provenance tags tell an agent how much latitude it has** — this is the mechanism that makes
the handoff work:

| tag | latitude |
|---|---|
| `[you said]` / `[you chose]` | **binding** — the developer decided it |
| `[you accepted]` | **provisionally binding** — a recommendation taken without objection |
| `[research: url]` | sourced fact |
| `[I assumed]` | **a starting point,** freely arguable |

`OPEN.md §4` lists what was **deliberately left open**, named by *kind of work* rather than
by department — so it routes correctly whatever the lineup is. That list is CID's actual
work queue.

## Use v2 as the test input

`concept/spec/incremental-spinoff-v2/` is the best available input: a restoration game where
you clear overgrowth off a ruin permanently and find relics underneath. 1,001 lines, 20
`[you chose]` tags, every layer-1 item interviewed.

It also carries constraints that will test whether the handoff actually works:

- **Duplicate relics must be solved without adding a currency** — a real constraint on Systems
- **Tension is zero by design** — Mechanics and Audio must not invent tension to fill it
- **Rarity tiers must differ by shape, not only hue** — an accessibility requirement on Art
- **Discovery rates are the highest-risk tuning** — the session objective silently fails if
  they are too low
- **`ui-forge` cannot build the persistent HUD this game needs** — UI/UX has to know it is
  proposing something the build stage can't make

If a CID agent ignores any of those, the sheets aren't doing their job and that's a finding
about stage 0, not about the agent.

## Open design questions for CID itself

Not decided. These are the first things to settle:

1. **Agent or workflow?** Each department as a subagent, or a deterministic script that fans
   out and joins? The waves are a dependency graph, which suggests orchestration rather than
   one agent per turn.
2. **What does a department output?** Prose ideas, or a structured artifact? Stage 0's whole
   thesis is that seams should be derivations rather than prose — the same argument probably
   applies here, but nothing forces it yet.
3. **How do departments disagree?** Wave 3 depends on wave 2's output. If Systems and
   Mechanics contradict each other, who reconciles? A judge pass, or a shared artifact they
   both edit?
4. **Does CID feed back into stage 0?** If Meta & Content discovers the discovery-rate target
   is impossible, that's a defect in the concept. Is there a return path, or does the
   developer re-run `/game-concept`?
5. **How does CID output reach `ui-forge`?** See gap 2 in `CLAUDE.md` — the bridge from
   markdown to `game-context.json` does not exist. CID may be the right place to produce it,
   since UI/UX is the department that knows the screen set.

## Read before starting

- `.claude/skills/game-concept/SKILL.md` — especially `<consumers>`, which explains why the
  sheets are layered rather than department-shaped, and `<failure_modes>`, which records
  eleven defects observed in real runs.
- `concept/spec/incremental-spinoff/OPEN.md` — the v1 audit, retained because **it fails its
  own gate** and says so. Useful for understanding what thin coverage looks like.
- `concept/spec/incremental-spinoff-v2/research/landscape.md` — why the noun can't
  differentiate a game in this genre. The most useful single research artifact produced.
