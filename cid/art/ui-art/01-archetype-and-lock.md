# 01 — The archetype this game emits, and the lock that keeps it

**Domain:** art/ui-art · **Category:** Art & Visuals · **Wave:** 6

## Decision

This game emits **`fantasy-ornate`**. `uiTheme.archetype` is the only place that answer is
stated, `game/src/shared/Theme.luau`'s `meta` block is the artifact that must agree with it,
and a Node test on the `npm test` gate fails the build when the two differ. The default context
at `ui-forge/src/cli.mjs:121` is deleted, because that default is the mechanism that themed this
game after a different game.

## Why

The brief names the key three times and never names another: *"**`ui-forge` vibe key:
`fantasy-ornate`**"* `[brief: soft]` (`04-PRESENTATION.md:8`, `CONCEPT.md:47`,
`HANDOFF.md:105`), and it argues against the shipped one **by name**: *"**`cartoon-vibrant`
would fight the fiction.** An ancient ruin in candy colours loses the discovery mood"*
`[brief: soft]` (`04-PRESENTATION.md:18-19`). Nothing needed designing for this to be right:
`ARCHETYPES['fantasy-ornate']` is complete on disk `[research: ui-forge/src/theme/palettes.mjs]`.

**The mechanism, in two halves, both verified.** `cli.mjs:121` reads
`args.context ?? 'examples/game-context.json'`, the Pet Ascend Simulator demo carrying
`"vibe": "cartoon-vibrant"` `[research: ui-forge/src/cli.mjs]`. And `resolveArchetype` falls
through `GENRE_DEFAULTS`, where `simulator` maps to `cartoon-vibrant`, so a context with the
wrong `genre` and no `vibe` reproduces the same wrong theme by a second route
`[research: ui-forge/src/theme/palettes.mjs]`. `uiTheme.vibe` is therefore fixed as a literal
`ARCHETYPES` key (exact match returns first) and `genre` is corrected to `restoration`, which
is the brief's own word: *"a **restoration / completion game**, not an incremental"*
`[brief: binding]` (`CONCEPT.md:25`). A wrong `genre` string in a generated file is a fact a
later reader will believe.

**What this enforcement actually is, at three different strengths, because they are not the
same thing.** Two routes are made **impossible**: the `cli.mjs` default (`A2`, not refusable)
and the alias-and-genre resolution route, closed by fixing `vibe` to a literal `ARCHETYPES`
key. One thing is **detected, not prevented**: the Node test fails a wave *after* a wrong
emission, which is worth having and is not the same as impossibility. And one thing is **not
enforced at all today**: every `tokenOverride` and every additive group this key holds, because
`deriveGameContext` does not carry them (`A3`) from a `concept.json` that does not exist
(`A4`), and `A4` is refusable. **If `A3` and `A4` land, the whole key reaches `generateTheme`
and the test compares against values that actually shaped the artifact. If `A4` is refused, the
archetype is still enforced and every token value in sheets `02`, `03` and `06` is advisory.**
That is the residual risk, and it is data in `emission.enforcementToday` rather than a sentence
in a paragraph.

**`A3` is a two-field change, and stating it larger than it is invites a refusal it does not
deserve.** `deriveGameContext` already emits `title`, `genre`, `subgenre`, `inspiration`,
`audience.ageBand` and `audience.platformMix` (`game-context.mjs:136-143`)
`[research: concept/src/derive/game-context.mjs]`. The only fields genuinely absent are
`artDirection.tokenOverrides` and `artDirection.tokens`, because the `artDirection` block it
builds carries exactly `vibe`, `mood`, `paletteHints` and `referenceNote`. **Two fields, one
object literal.** Until they are carried, the key merges and changes nothing beyond the
archetype. Separately, `deriveGameContext` consumes a `concept.json` that does not exist
anywhere in the repo, so the only producer of a consumable context cannot be run for this brief
at all: that is `A4`, the **third** petition against the same `ok && --emit` gate owner, after
`hud/03`'s `bridge/emit-hud-brief.mjs` and `theme/vocabulary/03`'s `bridge/emit-terms.mjs`.
**Scope it as one job, not three.**

**One string is now held by two keys, so the seam is stated here rather than discovered at build
time.** `title.value` → `ctx.title` → `generate.mjs:116` → `Theme.luau`'s `meta.sourceTitle` is a
real path. Wave 7's proposed `title` **decides** the value; `uiTheme.sourceTitle` **emits and
checks** it. So `title` is authoritative, `uiTheme.sourceTitle` mirrors it, and the check reads
`title.value` when that key is merged and falls back to my field while wave 7 has not run.
**If the Name lead recommends something other than `"Ruin Restoration"`, that revision against
this approved key is accepted in advance**, it moves one field and criterion 1's literal, and it
requires no new round.

**The archetype cannot legally be emitted until sheet `03` closes `A1`.** `fantasy-ornate`
resolves `fontStack: 'serif-ui'`, whose `numeric.roblox` is `'MerriweatherBold'`, which is not
a member of `Enum.Font` `[research: https://create.roblox.com/docs/reference/engine/enums/Font]`.
Indexing `Enum.Font` with an absent member **raises**, so `UIBuilder.luau:482`'s
`or Enum.Font.Gotham` fallback never runs and every `numeric`-typed node throws inside
`buildNode`, taking the client with it. The blast radius is bounded to `type.numeric`, read only
by `ReadoutValue`; `Pressables.luau:404` indexes the same way but reads `type.body`, which
resolves to `SourceSans` `[research: cid/art/_verified.md]`. `cartoon-vibrant` is latent-safe
only because its stack resolves. **This is the second defect this wave that bites on its own
fix.**

```manifest
{
  "provides": "uiTheme",
  "status": "proposed",
  "value": {
    "archetype": "fantasy-ornate",
    "archetypeLabel": "Fantasy Ornate",
    "sourceTitle": "Ruin Restoration",
    "sourceTitleAuthority": {
      "decidedBy": "title (Discovery and Marketing, wave 7, proposed)",
      "emittedBy": "uiTheme, through ctx.title at generate.mjs:116 into Theme.luau meta.sourceTitle",
      "rule": "uiTheme.sourceTitle must equal title.value; the check reads title.value when that key is merged and this field only until then",
      "revisionAcceptedInAdvance": true,
      "movesOnRevision": ["uiTheme.sourceTitle", "acceptance criterion 1's literal"]
    },
    "genre": "restoration",
    "resolutionRule": "artDirection.vibe must be a literal key of ARCHETYPES; resolveArchetype returns an exact key before consulting VIBE_ALIASES or GENRE_DEFAULTS, so no alias and no genre value may be load-bearing",
    "artDirection": {
      "vibe": "fantasy-ornate",
      "mood": ["ornamented", "warm", "aged", "crafted"],
      "paletteHints": [],
      "referenceNote": "",
      "tokenOverrides": "written by sheet 03 only; sheet 02 adds none, by ruling",
      "tokens": "written by sheet 06 only; the single group is ui.motion"
    },
    "context": {
      "path": "ui-forge/contexts/ruin-restoration.game-context.json",
      "producer": "concept/src/derive/game-context.mjs",
      "producerRunnable": false,
      "producerBlockedBy": "no concept.json exists anywhere in the repo; the stage-0 spec is markdown",
      "alreadyCarried": ["title", "genre", "subgenre", "inspiration", "audience.ageBand", "audience.platformMix", "artDirection.vibe", "artDirection.mood", "artDirection.paletteHints", "artDirection.referenceNote", "economy", "coreLoop", "screens"],
      "alreadyCarriedEvidence": "concept/src/derive/game-context.mjs:130-159",
      "mustAlsoCarry": ["artDirection.tokenOverrides", "artDirection.tokens"],
      "gapSize": "two fields on one object literal"
    },
    "emission": {
      "artifact": "game/src/shared/Theme.luau",
      "generatedBy": "ui-forge emit (emitTheme in ui-forge/src/emit/to-luau.mjs)",
      "handEditForbidden": true,
      "gate": "npm test",
      "check": {
        "file": "bridge/test/theme-archetype.test.mjs",
        "runner": "node --test, via npm test",
        "assertions": [
          "Theme.luau meta.archetype === uiTheme.archetype",
          "Theme.luau meta.sourceTitle === title.value, or === uiTheme.sourceTitle while title is unmerged",
          "Theme.luau meta.genre === uiTheme.genre",
          "Theme.luau contains no occurrence of MerriweatherBold",
          "game/src/ contains no occurrence of rbxassetid"
        ],
        "failureMode": "non-zero exit; a wave may not advance on it"
      },
      "blockedBy": ["A1"],
      "blockedByReason": "serif-ui numeric.roblox is not an Enum.Font member; indexing Enum.Font with an absent member raises, so every numeric-typed node throws inside buildNode. Bounded to type.numeric, read only by ReadoutValue; Pressables.luau:404 reads type.body and is safe.",
      "enforcementToday": {
        "impossible": [
          { "route": "cli.mjs defaults args.context to the Pet Ascend demo", "closedBy": "A2", "refusable": false },
          { "route": "resolveArchetype falls through VIBE_ALIASES or GENRE_DEFAULTS", "closedBy": "resolutionRule: vibe is a literal ARCHETYPES key", "refusable": false }
        ],
        "detectedNotPrevented": [
          { "what": "a wrong archetype, sourceTitle or genre in the emitted artifact", "by": "the npm test check", "timing": "after emission, before a wave may advance" }
        ],
        "notEnforcedAtAll": [
          { "what": "every tokenOverride and every additive group in sheets 02, 03 and 06", "why": "deriveGameContext carries neither artDirection.tokenOverrides nor artDirection.tokens (A3), and there is no concept.json to run it against (A4)", "status": "advisory until both land" }
        ]
      },
      "enforcementIfA3AndA4Land": {
        "gains": "the whole key reaches generateTheme, so the emitted artifact becomes a function of uiTheme and the npm test check compares against values that actually shaped it",
        "stillOnlyDetection": "nothing makes a hand-edited Theme.luau impossible; what makes it harmless is that it is regenerated"
      },
      "residualRisk": "A4 is refusable. If it is refused, the context stays hand-authored and unowned, the archetype is still enforced, and every token value this domain sets is a recommendation."
    },
    "uiForgeChanges": [
      { "id": "A2", "file": "ui-forge/src/cli.mjs", "at": "main(), line 121", "change": "delete the ?? 'examples/game-context.json' default; exit non-zero naming --context when it is absent", "refusable": false, "ifRefused": "any run without --context re-themes this game after Pet Ascend Simulator, which is the defect" },
      { "id": "A3", "file": "concept/src/derive/game-context.mjs", "at": "deriveGameContext(concept), the artDirection object literal at lines 144-149", "change": "add artDirection.tokenOverrides and artDirection.tokens, carried through unchanged", "scope": "two fields; title, genre, audience.ageBand and audience.platformMix are already emitted at lines 136-143 and are not part of this request", "refusable": false, "ifRefused": "uiTheme merges and changes nothing beyond the archetype key; every override in sheets 03 and 06 is inert" },
      { "id": "A4", "owner": "contract-and-seam work (bridge/schema.mjs, bridge/merge.mjs)", "change": "write the game-context.json for this brief on the ok && --emit gate", "isThirdRequestAgainst": ["bridge/emit-hud-brief.mjs (hud/03)", "bridge/emit-terms.mjs (theme/vocabulary/03)"], "refusable": true, "ifRefused": "the context is hand-authored and unowned; say so out loud rather than leaving it implied" }
    ]
  }
}
```

## Consequences for other work

- **Contract-and-seam work** takes `A4` as the third request against one gate. `A3` is two fields
  on one object literal and is not refusable, because without it this key's token values reach
  nothing.
- **Naming work (`title`, wave 7)** decides the string this key emits. It should know that
  `title.value` is not an orphan: it reaches `Theme.luau` through `ctx.title`. A recommendation
  other than `"Ruin Restoration"` is accepted here in advance and moves one field.
- **`ui-forge` pattern and CLI work** takes `A2`. It is the only change on this sheet that
  makes the defect impossible rather than detected.
- **Build work** must not hand-edit `Theme.luau` to close this. The artifact is generated; a
  hand edit passes the check once and regenerates wrong.
- **Type and font work (my sheet `03`)** holds the blocker. Nothing here ships first.
- **Style-guide work** inherits a boundary it already stated from its side: the world palette is
  not derived from a UI archetype in either direction, and its `B7`/`G3` finding stands
  untouched. `fantasy-ornate` paints interface surfaces only.
- **Store-surface work (`offerSurface`)** named this key as *"the sibling instance of
  `artifactHygiene`'s root cause"*. It is the same root cause and this is the fix.

## Acceptance criteria

1. `game/src/shared/Theme.luau` contains `archetype = "fantasy-ornate"` and a `sourceTitle`
   equal to `title.value`, or to `uiTheme.sourceTitle` while `title` is unmerged; and
   `grep -rn "cartoon-vibrant\|Pet Ascend Simulator" game/src` returns nothing.
2. `bridge/test/theme-archetype.test.mjs` exists, runs under `npm test`, and exits non-zero when
   `meta.archetype`, `meta.sourceTitle` or `meta.genre` differs from its source key.
3. `ui-forge/src/cli.mjs` contains no string literal `examples/game-context.json`; running any
   `cli.mjs` command with no `--context` exits non-zero and names the flag.

## Flagged to the developer

**`sourceTitle` needs the game's name and the game has none.** `OPEN.md §3` records *"the
working name is a placeholder"* and reserves the name for you; `05-OUTWARD.md` routes naming to
Discovery & Marketing in wave 7, which is now running and holds the proposed key `title`.
`meta.sourceTitle` is never rendered, so `vocabulary`'s 14-character ceiling and casing rule do
not bind it, but it is stamped into a generated file and into every screenshot review. Live
alternatives: **(a)** `"Ruin Restoration"`, the brief's own first line, which I have set as the
starting value and as the fallback until `title` merges; **(b)** whatever the Name lead
recommends, which supersedes (a) with no round here; **(c)** the slug
`"incremental-spinoff-v2"`, honest and ugly. **I recommend (b) over (a)** now that a key exists
to hold the answer.

## Not decided here

The game's name itself: naming work, which holds `title`; this key emits and checks it. Every
token value and every panel, plate, chip and frame treatment: sheet `02`. The whole type ramp,
the `type.numeric.font` override and the `A1` font-stack correction: sheet `03`. Whether any icon
exists: sheet `04`. Pressable states and the affordability channel: sheet `05`. Motion and the
one additive token group: sheet `06`. What is on screen, where it sits, how it groups and what it
says: `composition`, `screens`, `viewport`, `notices`. Every world colour, material and luma
value: style-guide work, which holds `styleGuide`. Whether `uiTheme` is promoted into
`bridge/schema.mjs`, and whether `Theme.luau` gains a module owner in the build order:
contract-and-seam work and the architect, per `architect/06`'s note that no module owns
`ui-forge`'s briefs.
