# arga

A staged pipeline that takes a Roblox game idea — new, or an existing game used as
inspiration — through to a developed game. Built stage by stage, deliberately, rather than
end to end at once.

## Stages

```
idea → [stage 0: concept] → spec sheets → [CID: NOT BUILT] → [stage 1: ui-forge] → Luau → Rojo → Roblox
```

| stage | where | state |
|---|---|---|
| **0 — concept** | `.claude/skills/game-concept/`, `concept/` | working; two real runs recorded |
| **CID** — Creative Idea Department | — | **not built.** See `docs/CID.md` |
| **1 — ui-forge** | `ui-forge/` | working; renders + emits Luau |
| **game** | `game/` | Rojo project, 7 emitted screens |

## Stage 0 — concept

Two implementations, deliberately. **The skill is the live one.**

**`/game-concept` (the skill)** — an interview. Researches reference games with real web
fetches, then questions the developer across several rounds, and writes provenance-tagged
markdown spec sheets to `concept/spec/{slug}/`. This is what to use.

**`concept/src/` (the deterministic CLI)** — predates the skill. Its `intake`/`ask`/`compile`
desks are superseded. Three parts are still live and worth keeping:

- `vocab.mjs` — closed vocabularies, surfaced by `npm run concept:vocab`. The skill calls
  this for question option menus.
- `validate.mjs` — the pure gate, with tests in `concept/test/gate.test.mjs` (31 passing).
- `derive/game-context.mjs` — the only thing that produces a `game-context.json` ui-forge
  can consume.

## Stage 1 — ui-forge

Exists because Claude's Roblox UI output was consistently ugly, and the diagnosis was two
missing systems rather than bad prompting: **no constraint** (nothing forbade inventing
colours and spacing) and **no feedback** (generation was blind, nothing ever rendered).
Design tokens supply the first; the HTML-render → screenshot → critique loop supplies the
second. **The bar is consistency, not one good result.**

## Architectural rules that are load-bearing

- **Seams are derivations, never prompts.** The brief→spec handoff is `compose(brief, theme)`
  — pure code. Prose has to be re-interpreted downstream, and interpretation is where visual
  variance re-enters.
- **Specs are build artifacts and are never hand-edited.** A critic finding a problem edits
  the *brief* and recompiles.
- **The pattern registry is the capability contract.** `validateBrief` rejects any brief
  naming a pattern or parameter the compiler cannot produce.
- **Arbitrary values enter through tokens, never as literals in a spec.** "Make it pink"
  overrides `color.accent.primary`. This is what keeps reskin working.
- **Prefer changes that make bad output impossible** (tokens, validators, lint passes) over
  changes that make one screen prettier by hand.

## Commands

```bash
# stage 0
node concept/src/cli.mjs vocab              # option menus for the skill
node --test concept/test/gate.test.mjs      # 31 tests
npm run concept:status

# stage 1
npm run render -- --brief briefs/shop.brief.json --viewport all
npm run forge -- --context <path> --viewport all   # idea → screens, one run
npm run gallery                             # self-contained review page
npm run emit                                # Luau for Rojo
npm run capabilities                        # the pattern registry
```

Needs `OPENAI_API_KEY` in `.env` (gitignored). Node ≥20.

## Known gaps

1. **CID does not exist.** Stage 0's output has no consumer. See `docs/CID.md`.
2. **No bridge from spec sheets to `game-context.json`.** `deriveGameContext` expects a
   structured object; the skill writes markdown. Nothing reads the sheets. The
   `fantasy-ornate` vibe key in `04-PRESENTATION.md` has to be carried across by hand.
3. **`ui-forge` has exactly one pattern** (`modal-grid` — a centred dismissible panel with a
   grid of items). Stage 0 routinely asks for screens outside that shape: persistent HUDs,
   settings lists, maps, text inputs. This is now the pipeline's narrowest point.
4. **`forge` has never been run on a stage-0-derived context.** Untested end to end.

## Two spec runs are committed as the design record

`concept/spec/incremental-spinoff/` (v1) and `incremental-spinoff-v2/` (v2) are the same
brief run through two versions of the skill. **v1 is retained deliberately as a record of
failure** — its own audit table says it fails its gate. Reading both side by side is the
fastest way to understand what the skill's coverage machinery is for:

| | v1 | v2 |
|---|---|---|
| `[you chose]` tags | 0 | 20 |
| layer-1 items never interviewed | 2 (core loop, audience) | 0 |
| outcome | specced a game that already ships | genuinely uncontested design |

v1 chose snow. Research in v2 found snow was already taken **three times**, including a game
with v1's exact three upgrade axes and tool ladder.
