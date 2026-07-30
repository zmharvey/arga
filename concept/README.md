# Stage 0 — concept

Raw idea in, validated concept document out. Everything downstream reads
`concept.json`; nothing downstream re-reads the original idea.

The stage exists because the nine things later stages need — purpose, players,
genre, core loop, mechanics, features, objectives, audience, references — are the
nine things a game idea never actually states. Left unstated they get inferred
silently, three stages apart, by three different prompts. Settling them once, in
one artifact, with a gate that refuses to emit while any are open, is cheaper than
discovering the disagreement later.

## Flow

```
node concept/src/cli.mjs run --input idea.md    # intake -> research -> questions
node concept/src/cli.mjs answer                 # fill them in
node concept/src/cli.mjs compile                # gate, then emit
```

`run` stops at the questionnaire deliberately. Everything before it is automatic;
everything after it depends on decisions only the developer can make.

Four desks, each writing a file the next one reads:

| step | reads | writes | what it does |
|---|---|---|---|
| `intake` | your idea | `draft.json` | reports what the input establishes, per dimension. Designs nothing. |
| `research` | `draft.json` | `research/*.json` | fetches each reference game's wiki and extracts its loop, monetization and conventions |
| `ask` | both | `questions.json` | one question per genuine gap, with options and a default |
| `compile` | all three | `concept.json`, `game-context.json` | assembles, then gates |

State lives in files, so the questionnaire can be filled in by a human, by an
agent, or half by each, and a failed compile retries without re-running research.
`status` shows where you are; `--out <dir>` runs several concepts side by side.

## Answering

`answer` walks the questionnaire in the terminal — Enter accepts the suggestion,
a number picks an option, anything else is taken literally. Or edit the `answer`
field of each question in `questions.json` directly, which is the path an agent
takes.

Unanswered *blocking* questions stop `compile`. `--force` compiles anyway and
infers them, which is recorded in provenance rather than hidden.

## The gate

`compile` will not write a document that fails `validateConcept`. Blocking
problems include: an unresolved required dimension; a core loop with no statement
of how it closes; a `reskin-base` reference with no deltas; a player mode its
server structure contradicts; a value outside the vocabulary; and placeholder text
like "TBD" in a content field.

Non-blocking **flags** are reported and stored on the document: escape-hatch
values, thin supporting dimensions, references with no verified source, priority
inflation, low-confidence inferences.

`node --test concept/test/gate.test.mjs` pins all of it.

## Vocabulary and the escape hatch

Genre, player mode, loop verbs, mechanic kinds and the rest come from closed
vocabularies in `src/vocab.mjs` — that is what lets a later stage `switch` on them
and be exhaustive. `node concept/src/cli.mjs vocab` prints them.

Anything genuinely novel travels as `custom:<label>`. It passes the gate and
raises a warning, because a custom value is a promise that some later stage needs
code written for it.

## Handoff to ui-forge

`game-context.json` is **derived from** `concept.json` by pure code
(`src/derive/game-context.mjs`) — never by a prompt. Screens come from what
features declare they need, priority is the strongest claim any requesting feature
makes, and a `reskin-base` reference becomes the inspiration source carrying its
deltas. It is a build artifact; change the concept and recompile.

```
node ui-forge/src/cli.mjs forge --context ../concept/out/game-context.json --viewport all
```

## Provenance

Every dimension records whether it was `stated`, `answered`, `researched` or
`inferred`. This is attributed by code from the intake and questionnaire records,
not self-reported — asked to self-report, the model marks everything `inferred`
because it elaborates on every answer, and a field where everything has the same
value carries no information.
