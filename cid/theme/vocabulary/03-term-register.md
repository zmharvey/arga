# 03 — Term register

**Domain:** Vocabulary · **Category:** Theme & Narrative · **Wave:** 1

## Decision

**The register is derived, not authored.** It lives at `docs/TERMS.md`, emitted by
`npm run bridge -- --emit` from the merged manifest alongside `GameConfig.luau` and
`docs/BUILD-ORDER.md`, printable without emitting by `npm run bridge -- --terms`, and never
hand-edited. **Nobody writes a term into the register. A term is in it because it is a value in a
contract key, or because it is a pathless writers' handle declared in `vocabulary.internalTerms`.**

**What makes it authoritative rather than advisory is that membership is computed and the invariant
is a merge problem, not a document.** One term, one row, one stored spelling: a word key holding two
spellings fails the merge, and a row carrying two paths from two different classes fails the merge.

**Wave-1 membership: 38 player-facing rows over 40 strings, 28 internal rows over 26 manifest values
plus 2 authored handles. This sheet coins nothing.** Two slots are empty and named below.

**No manifest block, and this is deliberate.** Vocabulary owns exactly one contract key,
`vocabulary`, and `cid/theme/vocabulary/02-banned-words.md` already provides it. One key, one sheet.
The machine-holdable half of this sheet is filed as an **amendment to 02** in a plain `json` fence,
which `bridge` does not parse and which claims nothing, the way `01-naming-form.md` and
`cid/theme/tone/01-register.md` both did. `[research: repo — bridge/merge.mjs:28, read this run]`

---

## Why

### Why not a markdown file somebody edits

**The merged manifest already is a list of every canonical player-facing term.**
`playerFacingStrings()` enumerates ten paths and returns 43 strings today, and
`crossCuttingProblems()` already walks that exact list for banned words and label length. Its own
comment says the list exists because *"four separate CID leads asked independently: which of my
constraints can actually be enforced?"* `[research: repo — bridge/schema.mjs:414-454 and :472-495,
read this run]` A hand-maintained file repeating those 40 strings would be a **second place they can
diverge**, and divergence is the only failure this domain has actually caught in the wild: `SHARDS`
shipped in `ui-forge/briefs/hud.brief.json` and `game/src/shared/Screens/hud.luau` while no sheet
owned the word, which is my index's gap G3 and the reason `cid/gameplay/systems/02-the-currency.md`
exists. Authoring a register to prevent copy drift, by making a copy, is the same mistake one level
up. `[cid: decided]`

**The repo rule is explicit and it decides this.** *"Specs are build artifacts and are never
hand-edited. A critic finding a problem edits the brief and recompiles"* and *"Seams are derivations,
never prompts"* (`CLAUDE.md`). The register is the most derivable artifact in the whole category:
every row is already a validated value with a known owning sheet.
`[research: repo — CLAUDE.md, read this run]` The precedent is on disk: `docs/BUILD-ORDER.md` carries
*"**Generated — do not edit.** Emitted by `npm run bridge -- --emit` from CID spec sheets"*, and the
`config` module's only acceptance criterion is *"regenerating ... produces no diff"*
(`cid/tech/architecture/02-module-plan.md`). `docs/TERMS.md` joins those two rather than inventing a
third convention.

### What the manifest cannot hold, and why that half is still not a markdown file

Two wave-1 coinages occupy **no contract path at all**: `works`
(`cid/theme/setting/01-the-ruin.md`, *"lowercase, internal, never rendered"*) and `finder`
(`cid/theme/identity/01-player-role.md`, *"lowercase, **internal, never a player-facing string**"*,
which asked to *"enter the canonical list marked internal"*). The category verification check is
*"every term this category introduces appears once in the Vocabulary canonical list, spelled one
way"* (`cid/theme/_category.md`), so dropping them fails the category.

**Duplication is the failure, not authorship.** A term with zero contract paths held in exactly one
place cannot drift, because there is nothing to drift from. So the authored half is admitted, and it
is put **inside the manifest** as `vocabulary.internalTerms` rather than in a markdown table, for
three reasons: the merger already refuses two sheets claiming that key, `validateManifest` ignores
extra fields so honouring it cannot fail the merge
`[research: repo — bridge/schema.mjs:386-399, read this run]`, and the no-overlap rule then becomes
checkable (an `internalTerms` word matching any player-facing string case-insensitively is a
problem). The result: **exactly one authored surface for terms in the whole repo, and it is a
validated manifest field, not a document.** `[cid: decided]`

### The one-spelling invariant, made real

`01-naming-form.md` established that casing is a **stored-value rule** precisely so this is
checkable: *"if uppercase is permitted in stored values then `EAST TERRACE` and `East Terrace` are
both legal spellings of one term, the canonical register holds two rows for one thing, and the
one-spelling invariant becomes uncheckable."* I make it two mechanical checks, both raised where the
ban check already lives, because that is the precedent the schema itself sets: *"A banned word is the
part of a naming rule that a machine can hold, so it is held here"* (`bridge/schema.mjs:463-471`).

1. **One spelling per word key.** Key = lowercase, split on space and hyphen. Sources: every word of
   every non-prose player-facing string, plus every interior word matching `/^[A-Z]/` inside a prose
   string (which is the lookup `01`'s prose casing rule defers to). A key holding two distinct stored
   spellings is a merge problem. **Today it fails on exactly one key**, `terrace`, held as `TERRACE`
   inside `area.label` and as `Terrace` in `collection.sets[0].label`. Zero failures once
   `area.label` becomes `East Terrace`, which Tone and `01` already ordered.
2. **One referent per row.** A row may carry more than one path only if those paths are a declared
   `pluralRule` pair. Two paths in two different classes (a find named the same as a set, say) is a
   merge problem, and so is two paths in one class (two tiers with one name, which no existing check
   catches: `tiers.check()` tests shapes, not names). Today: 36 rows with one path, 2 rows with a
   declared pair, 0 violations.

**The invariant is scoped to the player-facing set alone, and that scoping is load-bearing rather
than tidy.** Ids and labels are unrelated by design (`01`), so including the internal table would
report **7 false positives that exist right now**: `east`, `terrace`, `value`, `cistern`, `vault`,
`spire`, `shard` are all legitimate id-or-asset-key pairs of a player-facing term. A builder who
widens the check breaks it.

### The half that reaches outside the manifest

The in-manifest check cannot see the failure that motivated this domain, because `SHARDS` is not in
the manifest. So the invariant has a second half, a **lint over authored copy sources**, and its
scope is derived rather than hand-listed: the 11 files named by `modules[].path` plus
`ui-forge/briefs/hud.brief.json`. Every case-insensitive whole-word occurrence of a register term in
a rendered-text position must match the stored spelling exactly, or be a placeholder `HudBinding`
overwrites at runtime from `GameConfig` (that module already `reads` `currency` and `upgrades`).

**Scope, stated because an unscoped grep here is worthless.**
`game/src/shared/Screens/*.luau` are generated from briefs, so they are fixed by fixing the brief,
and six of the seven are `ui-forge` demo output for **other games**: `crates.luau:250` renders
`VALUE`, `quests.luau:425` renders `Reach prestige 3`, `roster.luau:78` renders
`CHOOSE YOUR CHAMPION`. None is this game. Identifiers are also out of scope, which is `02`'s
existing rule that internal field names are not governed: `init.client.luau:69` holds
`valueLabel("Readout_RELICS")`, a node name carrying a banned word, and it stays legal.
`[research: repo — game/src/**, ui-forge/briefs/hud.brief.json, read this run]`

### Two membership rulings, because the register admits words and 02 forbids them

My index routed *"the words it admits"* here (G1), and admission under this decision is **computed,
not granted**. Two words needed saying out loud anyway:

- **`Heartvine` is a member.** `cid/theme/lore/01-the-past.md` flagged it as an unresolved conflict
  between `02`'s `register` string (*"no invented compounds"*) and the shipped `tiers[].name`, and
  declined to resolve it. **Ruling: it stays.** The register has no veto: it cannot omit a word the
  manifest holds and cannot hold one the manifest lacks, so the only route to exclusion is a
  `bannedWords` entry, which is `02`'s and which `02` did not write. On the merits the compound is
  two ordinary words, transparent at eight, no pun, and it passes every checkable rule (one word, 9
  characters, Title Case, not a hue). `[cid: decided]`
- **`Find` / `Finds` is the class noun and the register's rows say so**, against `relic`, which `02`
  bans and which still ships in `hud.brief.json` as both a label and an icon key. That is not a
  register defect, it is an unkeyed-string defect, and adjudicating unkeyed strings is sheet `04`'s.

**Nothing on this sheet is playtest-dependent.** A file location, a row format and an invariant are
settled by reading the repo, not by playing, so there is no `[playtest unknown]` item here. The
brief is silent on all of it: `01-FOUNDATION.md` leaves *"the names of everything"* open and
`OPEN.md §4` routes *"all naming"* to this category, and neither says anything about where a list of
those names lives. Every ruling above is `[cid: decided]`.

---

## Wave-1 membership

### Player-facing: 38 rows over 40 strings

The 3 `upgrades[].blurb` values are prose, not terms: they are excluded from the table and contribute
only interior capitals to check 1. 40 + 3 = the 43 strings `playerFacingStrings()` returns today.

| class | rows | terms, as stored today | paths |
|---|---|---|---|
| area | 1 | `EAST TERRACE` (becomes `East Terrace`) | `area.label` |
| currency | 1 | `Shard` / `Shards` | `currency.name`, `currency.plural` |
| class-noun | 1 | `Find` / `Finds` | `collection.className`, `collection.classPlural` |
| tier | 4 | `Moss` · `Fern` · `Bramble` · `Heartvine` | `tiers[0..3].name` |
| upgrade | 3 | `VALUE` · `REACH` · `PACE` (become `Value` · `Reach` · `Pace`) | `upgrades[0..2].label` |
| set | 4 | `Terrace` · `Cistern` · `Vault` · `Spire` | `collection.sets[0..3].label` |
| find | 24 | `Sundial` `Ewer` `Hinge` `Tessera` `Stylus` `Bellcast` · `Sluice` `Weight` `Siphon` `Chain` `Grate` `Cup` · `Seal` `Ledger` `Coffer` `Key` `Tally` `Ring` · `Gnomon` `Lens` `Vane` `Crest` `Orrery` `Finial` | `collection.sets[0..3].relics[0..5]` |
| **total** | **38** | | **40 strings** |

Owning sheets, from `provenance`: `gameplay/meta/01-the-area.md` (1), `gameplay/systems/02-the-currency.md` (2),
`gameplay/meta/02-the-collection.md` (30), `gameplay/systems/01-overgrowth-tiers.md` (4),
`gameplay/balance/01-upgrade-ladder.md` (3).

### Internal-only: 28 rows, 26 derived and 2 authored

Never spell-checked against the player-facing table, never subject to the label ceiling, and
`playerFacingStrings()` must not be widened to reach any of them: `01` states that prohibition and
`patch.material` = `Grass` is why, being the reference game's own noun.

| kind | rows | values | source |
|---|---|---|---|
| slug | 8 | `east-terrace`; `value`, `radius`, `speed`; `terrace`, `cistern`, `vault`, `spire` | `area.id`, `upgrades[].id`, `collection.sets[].id` |
| asset-key | 1 | `shard` | `currency.icon` |
| engine-enum | 5 | `Grass`; `Block`, `Cylinder`, `Ball`, `Wedge` | `patch.material`, `tiers[].shape` |
| frozen-identifier | 1 | `ArgaRuin_v1` | `runtime.dataStoreName` |
| module-id | 11 | `config`, `layout`, `protocol`, `persistence`, `progression`, `plots`, `clearing`, `server-main`, `hud-binding`, `input`, `client-main` | `modules[].id` |
| writers-handle | 2 | `works`, `finder` | `vocabulary.internalTerms` (authored) |
| **total** | **28** | | **26 derived + 2 authored** |

`modules[].path`, `.responsibility`, `.criteria`, `.reads`, `.exposes` and `.dependsOn` are
technical prose and cross-references, not terms, and are excluded from the register entirely.

### The empty slots, stated plainly

1. **A player-facing word for the player: empty, and Identity ruled it should stay empty.** G6 asked
   me to hold the slot; `cid/theme/identity/01-player-role.md` has since filled the internal half
   (`finder`, never rendered) and recommends *"whether the player may ever be called anything at all
   in player-facing text. My answer is no."* So the register has 0 player-facing rows for the player
   and 1 internal row, and this is a decision awaiting a developer ruling Identity already
   requested, not an omission.
2. **`collection.sets[].relics[].flavour`: 0 rows, because no contract path exists.**
   `cid/theme/tone/02-flavour-and-humor.md` specifies 24 lines and states the surface does not
   exist. When the path exists the register gains 0 terms (prose is excluded) but its interior
   capitals enter check 1, which is what makes `01`'s prose rule non-vacuous.
3. **Areas 2 to 4: 0 rows, and no path could hold them.** The `area` key is a single object, so the
   register can hold exactly one area label. Whoever adds depths 2 to 4 needs a contract change
   first. Named here because a register that silently cannot represent three quarters of the world's
   labels is worse than one that says so.
4. **No SKU name, screen title, button label, or system-copy string has a path**, so the register
   holds 0 rows for any of them. The collection's icon key is the live example: `hud.brief.json`
   ships `"icon": "relic"` and there is no contract path for a collection icon at all.

---

## The amendment, addressed to the holder of the `vocabulary` key

Not a `manifest` fence: `bridge` parses only ` ```manifest ` blocks, so this claims no key. Every
field is additive and disjoint from Tone's amendment (`register`, `bannedWords`) and `01`'s
(lengths, casing, plurals).

```json
{
  "amends": "vocabulary",
  "requested_by": "cid/theme/vocabulary/03-term-register.md",
  "termRegister": {
    "artifact": "docs/TERMS.md",
    "authoredAnywhere": false,
    "emitter": "bridge/emit-terms.mjs, exporting emitTerms(manifest, provenance) -> string",
    "writtenBy": "npm run bridge -- --emit, only when problems and missing are both empty",
    "printedBy": "npm run bridge -- --terms, which merges, prints both tables, writes nothing, and exits with the merge's own code",
    "outFlag": "--terms-out",
    "header": "**Generated — do not edit.** Emitted by `npm run bridge -- --emit` from CID spec sheets. Change the sheet that owns the value and re-emit.",
    "playerFacingColumns": ["term", "plural", "class", "paths", "owningSheet"],
    "internalColumns": ["value", "kind", "path", "owningSheet"],
    "classByPath": {
      "area.label": "area",
      "currency.name": "currency",
      "currency.plural": "currency",
      "collection.className": "class-noun",
      "collection.classPlural": "class-noun",
      "tiers[].name": "tier",
      "upgrades[].label": "upgrade",
      "collection.sets[].label": "set",
      "collection.sets[].relics[]": "find",
      "collection.sets[].relics[].name": "find"
    },
    "classOrder": ["area", "currency", "class-noun", "tier", "upgrade", "set", "find"],
    "prosePathsExcludedFromTable": ["upgrades[].blurb", "collection.sets[].relics[].flavour"],
    "internalTermPaths": [
      "area.id",
      "upgrades[].id",
      "collection.sets[].id",
      "currency.icon",
      "patch.material",
      "tiers[].shape",
      "runtime.dataStoreName",
      "modules[].id"
    ],
    "excludedEntirely": [
      "modules[].path",
      "modules[].responsibility",
      "modules[].criteria",
      "modules[].reads",
      "modules[].exposes",
      "modules[].dependsOn"
    ],
    "kindByPath": {
      "area.id": "slug",
      "upgrades[].id": "slug",
      "collection.sets[].id": "slug",
      "currency.icon": "asset-key",
      "patch.material": "engine-enum",
      "tiers[].shape": "engine-enum",
      "runtime.dataStoreName": "frozen-identifier",
      "modules[].id": "module-id",
      "vocabulary.internalTerms": "writers-handle"
    },
    "kindOrder": ["slug", "asset-key", "engine-enum", "frozen-identifier", "module-id", "writers-handle"],
    "sort": {
      "playerFacing": "classOrder index, then first playerFacingStrings() index",
      "internal": "kindOrder index, then value ascending by code point"
    },
    "waveOneRows": {
      "playerFacing": 38,
      "internal": 28,
      "playerFacingStrings": 40,
      "proseStringsExcluded": 3,
      "internalValuesDerived": 26,
      "internalValuesAuthored": 2
    }
  },
  "internalTerms": [
    { "word": "works",  "kind": "writers-handle", "renderable": false, "coinedBy": "cid/theme/setting/01-the-ruin.md" },
    { "word": "finder", "kind": "writers-handle", "renderable": false, "coinedBy": "cid/theme/identity/01-player-role.md" }
  ],
  "oneSpelling": {
    "scope": "player-facing strings only; internal values are recorded and never compared against them",
    "scopeReason": "7 legitimate id-or-asset-key pairs collide case-insensitively today: east, terrace, value, cistern, vault, spire, shard",
    "wordKey": "lowercase, split on space and hyphen",
    "sources": [
      "every word of every non-prose player-facing string",
      "every interior word matching /^[A-Z]/ inside a prose player-facing string"
    ],
    "checks": {
      "oneSpellingPerKey": "a word key holding two distinct stored spellings is a merge problem",
      "oneReferentPerRow": "a row may carry more than one path only if those paths are a declared pluralRule pair; two paths in two classes, or two paths in one class that are not a declared pair, is a merge problem",
      "noAuthoredOverlap": "an internalTerms word matching any player-facing string case-insensitively is a merge problem",
      "raisedIn": "crossCuttingProblems(), beside the existing banned-word and label-length checks"
    },
    "outOfManifestLint": {
      "scope": "the files named by modules[].path, plus ui-forge/briefs/hud.brief.json",
      "renderedTextKeys": ["label", "value", "text", "title", "placeholder"],
      "rule": "a case-insensitive whole-word occurrence of a register term must match the stored spelling exactly, or be a placeholder HudBinding overwrites at runtime from GameConfig",
      "outOfScope": [
        "game/src/shared/Screens/*.luau, which are generated from briefs",
        "the six ui-forge demo screens, which belong to other games",
        "identifiers and node names such as Readout_RELICS"
      ],
      "gatingIsNotDecidedHere": "cid/theme/vocabulary/04-coinage-intake.md"
    },
    "knownFailuresToday": {
      "inManifest": 1,
      "inManifestDetail": "word key `terrace` holds TERRACE (inside area.label) and Terrace (collection.sets[0].label); 0 after area.label becomes East Terrace",
      "hudBriefSpelling": 5,
      "hudBriefBanned": 1,
      "moduleFiles": 0
    }
  }
}
```

---

## Consequences for other work

- **The holder of the `vocabulary` key** *[`cid/theme/vocabulary/02-banned-words.md`, this domain]*:
  folds the block above into its manifest value. It now has three amendments to merge, Tone's,
  `01`'s and mine, on disjoint fields. Two things land on you specifically. **(a)** Your `register`
  string's *"no invented compounds"* clause does not exclude `Heartvine`, and if you want it
  excluded the route is a `bannedWords` entry with a reason class, not a register omission, because
  the register cannot omit a shipped value. **(b)** `relic` and `relics` being banned does not reach
  `hud.brief.json`, because `crossCuttingProblems()` walks the manifest and nothing else.
- **Contract and seam work** *[whoever owns `bridge/schema.mjs`]*: four requests and one
  prohibition. Add `bridge/emit-terms.mjs` and write `docs/TERMS.md` on the same `ok && --emit` gate
  as `GameConfig.luau`; add `--terms` as a print-only mode; add the three merge checks under
  `oneSpelling.checks` to `crossCuttingProblems()`; add the out-of-manifest lint. **The prohibition
  is `01`'s and I restate it because my internal table makes it tempting: do not widen
  `playerFacingStrings()` to reach the internal paths.** The register reads them through a separate
  walk precisely so `Grass` and `ArgaRuin_v1` never enter the ban check.
- **Coinage-intake work** *[sheet `04`, this domain]*: three things are now yours rather than open.
  A submission must name the contract path its word will occupy (`01`) **and, if it has none, must
  be a submission to `vocabulary.internalTerms` marked non-renderable**, because those are the only
  two ways into the register. Whether the out-of-manifest lint gates a build or only reports is
  yours. And the unkeyed strings in `hud.brief.json` (`RELICS`, `SHARDS`, `"icon": "relic"`) are the
  live test case for your adjudication rule.
- **Area-content work** *[Meta & Content, `cid/gameplay/meta/01-the-area.md`, and wave 3]*: the
  `EAST TERRACE` re-casing is now load-bearing for one more reason than Tone and `01` gave. It is
  the single in-manifest one-spelling failure on disk, because `TERRACE` and `Terrace` are two
  spellings of one word across two keys. Separately: depths 2 to 4 have no contract path for their
  labels, so naming them requires a contract change first.
- **Upgrade-ladder work** *[Balance, `cid/gameplay/balance/01-upgrade-ladder.md`]*: after
  `VALUE`/`REACH`/`PACE` become `Value`/`Reach`/`Pace`, `hud.brief.json` and the generated
  `hud.luau` hold three stale spellings. That is not your fix, but your re-casing is what turns them
  from matching into violations, so the two changes should land together.
- **Screen and HUD work** *[UI/UX, wave 4]*: **no rendered string may be typed into a brief if the
  contract holds it.** `hud.brief.json` is the counter-example and it is the origin of this whole
  domain. The available fix is already specified: `hud-binding` reads `currency` and `upgrades` and
  writes into named nodes, so a label is bound rather than baked. Six of the seven screens under
  `game/src/shared/Screens/` are demo output for other games and are out of every check here.
- **Tier work** *[Systems, `cid/gameplay/systems/01-overgrowth-tiers.md`]*: `Heartvine` survives, and
  a rename is not owed. Also new: two tiers sharing a `name` would now fail the merge, which
  `tiers.check()` does not currently catch (it tests `shape`).
- **Collection-content work** *[Meta & Content, `cid/gameplay/meta/02-the-collection.md`]*: a find
  name may no longer duplicate a set label or any other class's term, which is stricter than the
  existing per-set uniqueness check. All 38 rows pass today. When `relics[]` becomes
  `relics[].name` plus `.flavour`, the register's `find` class follows automatically and the flavour
  lines enter as prose.
- **History and place work** *[Lore and Setting, this wave]*: the `Heartvine` conflict
  `cid/theme/lore/01-the-past.md` passed to me is closed, in favour of the shipped value. `works`
  enters the register as an internal writers' handle, exactly as `01-the-ruin` asked, and is
  therefore checkable as never-rendered.
- **Player-role work** *[Identity, this wave]*: `finder` is in the register, internal,
  non-renderable, and its no-overlap check is what makes *"one word away sits `Find`"* mechanical
  rather than a caution. The player-facing slot is recorded as empty by your decision, with your
  request for a developer ruling attached.
- **External-name work** *[Discovery & Marketing, wave 5]*: the title and tagline have no contract
  path, so they are outside the register and outside both halves of the invariant. If you use a
  register term in a store listing, the spelling in `docs/TERMS.md` is the one to use.

## Acceptance criteria

1. **Derived and reproducible.** `docs/TERMS.md` exists, is written only by
   `npm run bridge -- --emit`, and its first content line is the `header` string in the amendment
   verbatim. Running the emit twice produces no diff. `npm run bridge -- --terms` prints both tables
   and writes zero files. The player-facing table has **38** rows over **40** strings; the internal
   table has **28** rows over **26** manifest values plus **2** `vocabulary.internalTerms` entries.
2. **One referent per row.** Of the 38 player-facing rows, **36** carry exactly one path and **2**
   carry exactly two paths, and both of those are the declared `pluralRule` pairs
   (`currency.name`/`.plural`, `collection.className`/`.classPlural`). **0** rows carry paths from
   two different classes. Passes as written.
3. **One spelling inside the manifest.** Over the word keys of the 40 non-prose player-facing
   strings plus every interior capitalised word in the 3 blurbs, every key resolves to exactly one
   stored spelling. **Today this fails on exactly 1 key: `terrace`, holding `TERRACE` and `Terrace`.
   0 failures once `area.label` is `East Terrace`.** Run over the internal table as well it would
   report **7** false positives (`east`, `terrace`, `value`, `cistern`, `vault`, `spire`, `shard`),
   so a run that reports 7 or 8 has been mis-scoped.
4. **One spelling outside the manifest.** Over the 11 files named by `modules[].path` plus
   `ui-forge/briefs/hud.brief.json`, in the values of keys `label`, `value`, `text`, `title`,
   `placeholder`: every case-insensitive whole-word occurrence of a register term matches the stored
   spelling exactly. **Against the register after the four re-casings, today's count is 6 in
   `hud.brief.json` (5 spelling: `SHARDS`, `[1] VALUE`, `[2] REACH`, `[3] PACE`,
   `EAST TERRACE — 0% CLEAR`; 1 banned word: `RELICS`) and 0 in the 11 module files.** Target 0,
   reached by binding those labels from `GameConfig` rather than re-typing them.

## Not decided here

Which words are banned, and the `register` and `bannedWords` values themselves (`02`, which holds
the key). Word counts, character ceilings, casing regexes and the plural rule (`01`). How a word
enters after wave 1, who wins a clash between a key owner and a Vocabulary ruling, what a later wave
does when the word it needs is banned, where the out-of-manifest lint runs and whether it gates, and
how an unkeyed player-facing string such as `SHARDS` is adjudicated (`04`). Every value in every row:
the currency, the four tiers, the three upgrade labels, the area label, the four set labels and the
24 find names all live inside keys other domains own, and nothing here changes one. Whether
`Heartvine` should be banned outright (`02`, if it wants to). Whether the player is ever named in
player-facing text (a developer ruling Identity requested). Whether the `area` key becomes plural so
depths 2 to 4 can have labels (seam work, plus Meta & Content, wave 3). Rendered typography and
whether a label class displays uppercase (UI/UX, and it is unaffected: the register records the
stored form). The title and tagline (Discovery & Marketing, wave 5).

## Flagged to the developer

**The brief is silent on all of this.** *"the names of everything"* is left open
(`01-FOUNDATION.md`) and *"all naming"* is routed to this category (`OPEN.md §4`), but no sheet says
where a list of those names should live, and `OPEN.md §1` has no audit row for it. My index recorded
that as gap G1. Three calls were genuinely live.

| call | live alternative | why I did not take it | cost of overruling me |
|---|---|---|---|
| **The register is a generated `docs/TERMS.md`** | A hand-authored `cid/theme/vocabulary/TERMS.md` a writer edits, which is what the assignment's own wording implied | A second copy of 40 strings is a second place they diverge, and divergence is the only failure this domain has actually caught (`SHARDS`). The repo's own rule is that specs are build artifacts and are never hand-edited | Moderate. The row format, the class map and the sort order above transfer unchanged to a hand-written file; what is lost is the guarantee that the register cannot fall behind the manifest |
| **The two pathless handles live in `vocabulary.internalTerms`** | Leave `works` and `finder` in their coining sheets and let the category verifier read prose | The category check is *"appears once in the canonical list"*, and a term in prose is not in any list a machine can read. Putting them in a manifest field costs two lines and makes non-renderability checkable | Trivial: two entries move back into prose, and the no-overlap check disappears |
| **`Heartvine` stays** | Ban the compound and make Systems rename the fourth tier | The register has no veto over a shipped value, `02` did not ban it, and the word passes every checkable rule. Renaming a tier to satisfy an unenforced style clause in a sibling's prose field buys nothing measurable | One tier value plus four citations on disk (`lore/01-the-past.md`, `setting/01-the-ruin.md`, `tone/04-do-nots.md`, `vocabulary/01-naming-form.md`), all of which record it as passing |

**The ruling I would most like from you** is the one Identity already asked for and I inherit: whether
the player is ever named in player-facing text. My recommendation is no, which keeps the register at
38 player-facing rows and leaves `finder` a word for writers. If the answer is yes, the word needs a
contract path before it can be in the register at all, and that is a seam change rather than a naming
decision.

**No URL was fetched in this run.** `npm run bridge -- --contract` could not be executed because this
session has no shell tool; I read `SCHEMA`, `playerFacingStrings()`, `PROSE_PATHS`,
`crossCuttingProblems()` and `contract()` directly in `bridge/schema.mjs`, plus `bridge/merge.mjs`,
`bridge/cli.mjs`, `bridge/emit-buildorder.mjs`, `docs/BUILD-ORDER.md`, every manifest-carrying sheet
under `cid/`, `ui-forge/briefs/hud.brief.json` and the seven screens under
`game/src/shared/Screens/`. Every count on this sheet was derived by hand from those files and is
stated so it can be checked by re-running the merge.
