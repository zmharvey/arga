# arga

A staged pipeline that takes a Roblox game idea — new, or an existing game used as
inspiration — through to a developed game. Built stage by stage, deliberately, rather than
end to end at once.

## Stages

```
idea → [0: concept] → [CID] → 9 creative keys ┐
                                              ├→ [architect] → 7 technical keys → BUILD-ORDER.md → [build] → game
                              ui-forge ───────┘   screens only
```

| stage | where | state |
|---|---|---|
| **0 — concept** | `.claude/skills/game-concept/`, `concept/` | working; four runs recorded |
| **CID** — what the game is | `.claude/agents/cid-*`, `cid/` | wave 1; **9 creative keys**, 7 domains eligible |
| **bridge** — the creative seam | `bridge/` | working; validates the 9, enforces the copy rules |
| **architect** — how it gets built | `.claude/agents/build-architect.md`, `architect/` | working; **7 technical keys**, one graph traversal |
| **build** | `.claude/agents/game-builder.md`, `bridge/build-pack.mjs` | working; **11 modules built, 2,732 lines** |
| **ui-forge** — screens only | `ui-forge/` | working; one pattern. Deliberately outside the build order |
| **game** | `game/` | **pipeline-built and playable.** Clearing pays, the HUD updates, purchases apply. Hand-written control kept at `docs/hand-written-control/` |

**The loop closes.** Ten agents wrote eleven modules from two contracts; none read another's
code or the hand-written control; the result runs. Clearing awards, the snapshot crosses the
wire, the HUD updates, a keypress buys an upgrade and it takes effect. That is the claim four
build trials could not settle by counting stops, because nothing ran.

**Two contracts, sixteen keys, and that is the whole interface.** CID answers what the game
is; the architect answers how it gets built; a builder reads one brief composed from both and
should never open either. The split exists because two build trials measured what actually
stopped a builder and **roughly 15 of 21 stops were not creative questions** — require paths,
collection shapes, who writes a Humanoid property.

`docs/workflow.html` is this diagram as a page, in plain language, for showing people.

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

# CID
npm run bridge                              # sheets -> validated build manifest
npm run bridge -- --contract                # what a build needs, and who owns each key
npm run cid:verify                          # mechanical checks. run BEFORE any verifier agent
npm run cid:research                         # bank every [research: url] into one deduped pack
npm run cid:digest                          # every sheet's decision + boundary, ~40 lines
npm run cid:pack -- --domain theme/tone --brief concept/spec/<slug>

# stage 1
npm run render -- --brief briefs/shop.brief.json --viewport all
npm run forge -- --context <path> --viewport all   # idea → screens, one run
npm run gallery                             # self-contained review page
npm run emit                                # Luau for Rojo
npm run capabilities                        # the pattern registry
```

Needs `OPENAI_API_KEY` in `.env` (gitignored). Node ≥20.

## Agent context is a derivation too

The same rule that governs `compose(brief, theme)` governs how a CID agent gets its context.
An agent that reads 26 sibling sheets to learn where its subject stops, or searches the web
for a page another agent fetched an hour ago, is paying to re-derive something a parser
states once.

Wave 1 ran one agent per sheet and cost **~6.3M tokens of input to produce ~110k of sheets**
— 97% input, most of it the same bytes delivered 37 times. `bridge/context.mjs` derives that
context instead: `cid:digest` (every decision, 234x smaller than the sheets), `cid:research`
(fetch once, cite many), `cid:pack` (one domain's complete context). Writers are batched one
per domain and have no fetch tools. Measured: **11x cheaper, and sibling overlap goes away**,
because a writer holding all of a domain's sheets cannot collide with itself.

**Run `cid:verify` before dispatching any verifier agent.** Three wave-1 sheets each spent
~150k tokens rediscovering one string comparison the script finds in milliseconds.

## A domain runs only if it owns a contract key

The rule that keeps CID honest, and the one that was missing. Everything in this repo is
checked for having a consumer; CID was exempt, and 78% of wave 1 (23 of 35 sheets, 6,297 of
8,051 lines) came from domains owning no key — output no build step could read.

If a domain's output is checkable, it gets a key: tone's register became `vocabulary.casing`,
`.maxSentenceWords` and `.allowedPattern`, enforced by the merger on every player-facing
string. If it is not checkable, it is advisory and should not be funded like a department.
`npm run cid:verify` warns for every domain that breaks the rule. Seven domains qualify today.

**The corollary for reviewing this pipeline:** a warning that needs a human ruling is a worse
version of a contract field that settles it. When you find one, move the decision into the
contract and delete the warning.

## Known gaps

1. **Four known runtime defects, unfixed on purpose** so a playtest can rank them: death is
   permanent (`CharacterAutoLoads = false`, one `LoadCharacter`, no `onDeath`); slot 3 walks
   off a 400-stud baseplate; part rotation is unspecified so a Cylinder tier may render on its
   side, and shape is the colour-blind rarity channel; no touch or gamepad purchase path.
3. **Six CID domains own no contract key** and are frozen by the rule above. Their 23 sheets
   stay as a record.
4. **`ui-forge` has exactly one pattern** and is undeclared as a dependency, which is why
   `client-main` is the one module that does not type-check.
5. **`forge` has never been run on a stage-0-derived context.** Untested end to end.

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
