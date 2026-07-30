# CID — Creative Idea Department

**Status: not built.** This is the design brief for it, written at the end of the session
that built stage 0. Start here.

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
