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

**A key value alone is a note.** `CLAUDE.md` binds *"prefer changes that make bad output
impossible"* `[research: CLAUDE.md]`, and `HANDOFF.md:107` states the hole plainly: *"**no code
currently reads these sheets**"*. So this sheet supplies three things and not one: the value,
the artifact both sides compare, and the check that fails a build. The check is a Node test
because `npm test` is already one of the four gates a wave must clear
`[research: cid/_state.md]`, and because `Theme.luau` is emitted by `ui-forge` rather than by
`bridge`, so `bridge/merge.mjs` never sees it. Parsing two string assignments out of a
generated Luau table with a regex is cheap and total.

**Two things stand between this key and the build, and neither is mine to fix.**
`deriveGameContext(concept)` emits `artDirection` with exactly `vibe`, `mood`, `paletteHints`
and `referenceNote` `[research: concept/src/derive/game-context.mjs]`, so no `tokenOverrides`
and no `tokens` this key holds can reach `generateTheme` today: **the key would merge and
change nothing.** And `deriveGameContext` consumes a `concept.json` that does not exist
anywhere in the repo, so the only producer of a consumable context cannot be run for this brief
at all. Both are filed below as `A3` and `A4`, `A4` against the same `ok && --emit` gate owner
that `hud/03` (`bridge/emit-hud-brief.mjs`) and `theme/vocabulary/03` (`bridge/emit-terms.mjs`)
already petitioned. **Scope it as one job, not three.**

**The archetype cannot legally be emitted until sheet `03` closes `A1`.** `fantasy-ornate`
resolves `fontStack: 'serif-ui'`, whose `numeric.roblox` is `'MerriweatherBold'`, which is not
a member of `Enum.Font` `[research: https://create.roblox.com/docs/reference/engine/enums/Font]`.
`cartoon-vibrant` is latent-safe only because its stack resolves. **This is the second defect
this wave that bites on its own fix**, and emitting the correct archetype before `A1` lands
either kills the client or silently renders every number in `Gotham`.

```manifest
{
  "provides": "uiTheme",
  "status": "proposed",
  "value": {
    "archetype": "fantasy-ornate",
    "archetypeLabel": "Fantasy Ornate",
    "sourceTitle": "Ruin Restoration",
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
      "carriesToday": ["vibe", "mood", "paletteHints", "referenceNote"],
      "mustAlsoCarry": ["artDirection.tokenOverrides", "artDirection.tokens", "title", "genre", "audience.ageBand", "audience.platformMix"]
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
          "Theme.luau meta.sourceTitle === uiTheme.sourceTitle",
          "Theme.luau meta.genre === uiTheme.genre",
          "Theme.luau contains no occurrence of MerriweatherBold",
          "game/src/ contains no occurrence of rbxassetid"
        ],
        "failureMode": "non-zero exit; a wave may not advance on it"
      },
      "blockedBy": ["A1"],
      "blockedByReason": "serif-ui numeric.roblox is not an Enum.Font member; emitting fantasy-ornate before A1 either throws in UIBuilder.luau:482 or renders every numeral in Gotham"
    },
    "uiForgeChanges": [
      { "id": "A2", "file": "ui-forge/src/cli.mjs", "at": "main(), line 121", "change": "delete the ?? 'examples/game-context.json' default; exit non-zero naming --context when it is absent", "refusable": false, "ifRefused": "any run without --context re-themes this game after Pet Ascend Simulator, which is the defect" },
      { "id": "A3", "file": "concept/src/derive/game-context.mjs", "at": "deriveGameContext(concept)", "change": "carry artDirection.tokenOverrides and artDirection.tokens through to the emitted context unchanged", "refusable": true, "ifRefused": "uiTheme merges and changes nothing beyond the archetype key; every override in sheets 03 and 06 is inert" },
      { "id": "A4", "owner": "contract-and-seam work (bridge/schema.mjs, bridge/merge.mjs)", "change": "write the game-context.json for this brief on the ok && --emit gate", "isThirdRequestAgainst": ["bridge/emit-hud-brief.mjs (hud/03)", "bridge/emit-terms.mjs (theme/vocabulary/03)"], "refusable": true, "ifRefused": "the context is hand-authored and unowned; say so out loud rather than leaving it implied" }
    ]
  }
}
```

## Consequences for other work

- **Contract-and-seam work** takes `A4` as the third request against one gate and `A3` as a
  four-field change to one function. Until both land, this key is a decision with no wire.
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
- **Whoever regenerates `hud.brief.json`** gets no new field from this sheet.

## Acceptance criteria

1. `game/src/shared/Theme.luau` contains `archetype = "fantasy-ornate"` and
   `sourceTitle = "Ruin Restoration"`, and `grep -rn "cartoon-vibrant\|Pet Ascend Simulator" game/src`
   returns nothing.
2. `bridge/test/theme-archetype.test.mjs` exists, runs under `npm test`, and exits non-zero when
   `meta.archetype`, `meta.sourceTitle` or `meta.genre` differs from `uiTheme`.
3. `ui-forge/src/cli.mjs` contains no string literal `examples/game-context.json`; running any
   `cli.mjs` command with no `--context` exits non-zero and names the flag.

## Flagged to the developer

**`sourceTitle` needs the game's name and the game has none.** `OPEN.md §3` records *"the
working name is a placeholder"* and reserves the name for you; `05-OUTWARD.md` routes naming to
Discovery & Marketing in wave 7. `meta.sourceTitle` is never rendered, so `vocabulary`'s
14-character ceiling and casing rule do not bind it, but it is stamped into a generated file and
into every screenshot review. Live alternatives: **(a)** `"Ruin Restoration"`, the brief's own
first line, which I have set as the starting value; **(b)** the slug
`"incremental-spinoff-v2"`, honest and ugly; **(c)** leave the field until wave 7, which means
the check in criterion 2 has nothing to compare. **I recommend (a)** and a one-field revision
when you name the game.

## Not decided here

Every token value and every panel, plate, chip and frame treatment: sheet `02`. The whole type
ramp, the `type.numeric.font` override and the `A1` font-stack correction: sheet `03`. Whether
any icon exists: sheet `04`. Pressable states and the affordability channel: sheet `05`. Motion
and the one additive token group: sheet `06`. What is on screen, where it sits, how it groups
and what it says: `composition`, `screens`, `viewport`, `notices`. Every world colour, material
and luma value: style-guide work, which holds `styleGuide`. Whether `uiTheme` is promoted into
`bridge/schema.mjs`, and whether `Theme.luau` gains a module owner in the build order:
contract-and-seam work and the architect, per `architect/06`'s note that no module owns
`ui-forge`'s briefs.
