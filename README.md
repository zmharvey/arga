# arga

A staged pipeline that takes a Roblox game idea through to a developed game.

```
idea → [concept] → spec sheets → [CID] → [ui-forge] → Luau → Rojo → Roblox
```

**Start here:** [`CLAUDE.md`](CLAUDE.md) — what each stage is, the architectural rules that
are load-bearing, and the known gaps.

**Working on CID next:** [`docs/CID.md`](docs/CID.md).

## Stages

| stage | what it does | state |
|---|---|---|
| **concept** | interviews you about a game idea, researches its reference games with live web fetches, and writes provenance-tagged spec sheets | working |
| **CID** | creative agents that invent each part of the game on top of that baseline | **not built** |
| **ui-forge** | compiles validated briefs into design-token UI, renders it, validates geometry and contrast, emits Luau | working |

## Quick start

```bash
npm install
cp .env.example .env        # add OPENAI_API_KEY
node --test concept/test/gate.test.mjs
npm run render -- --brief briefs/shop.brief.json --viewport all
```

Node ≥20.

## Why it is built this way

`ui-forge` exists because Claude's Roblox UI output was reliably ugly, and the diagnosis was
two missing systems rather than bad prompting: **no constraint** — nothing forbade inventing
arbitrary colours and spacing — and **no feedback** — generation was blind, nothing ever
rendered. Design tokens supply the first. The render → screenshot → critique loop supplies
the second.

The rule that follows from it: **prefer changes that make bad output impossible over changes
that make one screen prettier by hand.**

## The design record

`concept/spec/` holds two runs of the same brief through two versions of the concept skill.
`incremental-spinoff/` (v1) is **kept deliberately as a record of failure** — its own audit
table reports that it fails its gate, and it specced a game that already ships three times
over. `incremental-spinoff-v2/` is the same brief after the skill learned to check occupancy
before offering a theme.
