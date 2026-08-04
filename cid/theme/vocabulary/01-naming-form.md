# 01 — Naming form

**Domain:** Vocabulary · **Category:** Theme & Narrative · **Wave:** 1

## Decision

**Every player-facing string in the contract is one word in Title Case under a per-field character
ceiling, with three named exceptions: `area.label` may be two words, `upgrades[].blurb` is sentence
case under a word ceiling, and the two singular/plural pairs must form their plural by adding `s`
alone.** Casing is a **stored-value rule** — the stored form is Title Case, and uppercase is a render
transform applied to a whole label class, never baked into a value.

**Both length numbers stand and they are not in conflict.** `maxLabelChars` 14 is the global backstop;
`currency.plural`'s 10 is a tighter per-field ceiling on the one string that shares a line with a
number. The correct shape is a per-field map with 14 as the fallback, because the contract already has
a per-field ceiling and therefore already is not a single-number model.

**No manifest block, and this is deliberate.** Vocabulary owns exactly one contract key, `vocabulary`,
and `cid/theme/vocabulary/02-banned-words.md` already provides it. One key, one sheet. The
machine-holdable half of this sheet is filed as an **amendment to 02** in a plain `json` fence below,
which `bridge` does not parse and which claims nothing.
`[research: repo — bridge/merge.mjs:28, bridge/schema.mjs:116-133, read this run]`

### The form table — every string-bearing field in the contract

Ten paths, which is exactly what `playerFacingStrings()` extracts. 43 strings today.
`[research: repo — bridge/schema.mjs:419-452, read this run]`

| path | words | chars | casing | why this ceiling |
|---|---|---|---|---|
| `area.label` | **1–2** | **14** | Title Case | full-width panel header and the HUD area readout. The only multi-word label |
| `currency.name` | 1 | **9** | Title Case | 9 so that `name + "s"` fits the schema's own 10-character plural check |
| `currency.plural` | 1 | **10** | Title Case | HUD corner cluster beside a growing number. Hard-checked at `schema.mjs:147` |
| `collection.className` | 1 | **9** | Title Case | same pluralisation arithmetic as the currency |
| `collection.classPlural` | 1 | **10** | Title Case | `className + "s"` |
| `tiers[].name` | 1 | **12** | Title Case | grid-cell width, the narrowest surface in the game |
| `upgrades[].label` | 1 | **12** | Title Case | grid cell on `upgrades` |
| `collection.sets[].label` | 1 | **12** | Title Case | grid cell or section header on `collection-index` |
| find name — `collection.sets[].relics[]`, and `…relics[].name` after Tone's shape change | 1 | **12** | Title Case | a one-third-width card in a grid at phone size |
| `upgrades[].blurb` | **≤ 8** (Tone P4) | **48** backstop | **sentence case** | prose. Exempt from the label ceiling by `PROSE_PATHS` (`schema.mjs:459`), so without a number here there is none |

**Casing, as two regexes rather than a prohibition.**

- **Label:** `^[A-Z0-9][a-z0-9]*([ -][A-Z0-9][a-z0-9]*)*$` — first letter of every word capital, no
  interior capital, letters and digits, single interior spaces, interior hyphens. Every word is
  capitalised, with no exception for articles or prepositions, because there is no string in the
  contract where a lowercase particle can occur (lore's `S2` forbids `of the` outright).
- **Prose:** `^[A-Z0-9][a-z0-9]*([ -][A-Za-z0-9]+)*$`, **plus** the rule that any interior word
  beginning with a capital must appear in the canonical register (sheet `03`). The strict form with no
  interior capital at all is `^[A-Z0-9][a-z0-9]*([ -][a-z0-9]+)*$`, and all 3 blurbs on disk pass it,
  so the register check is currently vacuous. It exists so that a blurb naming the currency — `Each
  patch pays more Shards` — is legal rather than a regex accident.

**Plural formation, as an invariant rather than a style note.** `plural === singular + "s"` for both
pairs, and the singular may not end in `s`, `x`, `z`, `ch`, `sh`, or a consonant followed by `y` —
i.e. `/(s|x|z|ch|sh|[^aeiou]y)$/i` must not match. `Shard`/`Shards` and `Find`/`Finds` both pass.

**Reading level at term level is the character ceiling, not a formula.** Flesch-Kincaid is
statistically meaningless on a one-word label, and Tone already owns the copy-level rule (FK 4 target,
grade 6 ceiling, no word over three syllables, ≤ 8 words). I add no second reading-level rule; the
12-character cell ceiling is the term-level proxy, because in this vocabulary the words that break 12
characters are the Latinate ones.

### Not player-facing. No rule on this sheet, or on 02, or on Tone's, reaches these

Reused from Tone's table so it is stated once per category rather than four times, with the schema
lines that make each one true.

| path | what it is | the real constraint |
|---|---|---|
| `patch.material` | **engine vocabulary** — a Roblox `Enum.Material` member name | membership in `Enum.Material`. Note it is typed `'string'` at `schema.mjs:169`, not an enum, so nothing checks it |
| `tiers[].shape` | **engine vocabulary** — properly constrained at `schema.mjs:61` as `enum:Block,Cylinder,Ball,Wedge` | the enum, plus the tiers key's own no-two-tiers-share-a-shape check |
| `runtime.dataStoreName` | **frozen identifier.** `ArgaRuin_v1` | renaming it orphans every save. It is not a word and it is not renameable on taste |
| `currency.icon` | asset key, `slug` at `schema.mjs:141` | the slug regex at `schema.mjs:329` |
| every `id` — `area.id`, `upgrades[].id`, `collection.sets[].id`, `modules[].id` | kebab-case identifiers | already validated as `slug` by the schema. A label's spelling and its id's spelling are unrelated by design |
| `modules[].path` / `.responsibility` / `.criteria` / `.reads` / `.exposes` / `.dependsOn` | technical strings a player never reads | the modules key's own checks |

**`patch.material` is the trap, and it is worth naming concretely.** Its value is `Grass` — which is
the reference game's own noun, `Grass Incremental`, exactly the kind of word an occupancy ban list
reaches for. `playerFacingStrings()` correctly does not walk it today. **Keeping it that way is a
requirement on seam work, not an accident to preserve.**

## Why

**The brief sets no label length, no word count, no casing convention and no term-level reading rule,
and says so twice.** *"Alternatives declined: ... 5–10 needing near-zero text"* and *"Also declined:
extending to a text-free comprehension rule"* (`00-CORE.md`, `04-PRESENTATION.md`) — text is
**permitted and unmeasured** `[brief: binding]` / `[brief: soft]`. `cid/theme/_category.md` gap 4
records the same finding independently: *"No reading level or text budget exists for the 8-14 band."*
So every number on this sheet is `[cid: decided]` against a blank page, and the alternative to deciding
is a builder deciding per string.

**The audience is the ceiling's only real source.** *"8–14, mobile-heavy, short sessions"* ·
*"~70% mobile"* `[brief: binding]` `[you chose: R1 Q4]` (`00-CORE.md`), against a build stage whose one
usable pattern is *"centred dismissible panels holding a grid of items"* and whose screen list is
`collection-index`, `upgrades`, `areas`, `shop` `[brief: soft]` (`04-PRESENTATION.md`). **Four of the
five surfaces are grid cells**, so the cell — not the panel — is the governing width, which is why 12
is the working ceiling and 14 is only the header's. A single global 14 would have been a ceiling
derived from the widest surface and applied to the narrowest.

**Why the two ceilings both stand instead of one replacing the other.** `crossCuttingProblems()`
applies `vocab.maxLabelChars` uniformly at `schema.mjs:488`, while `currency.check()` applies 10 to one
field at `schema.mjs:147`. That is already a two-tier model, arrived at by a builder who noticed one
string was special. Generalising it costs one lookup and removes the reason anyone would want to lower
14 globally — which would be the wrong fix, because `East Terrace` needs 12 and a HUD currency label
does not. `[research: repo — bridge/schema.mjs, read this run]`

**One defect, named because it is a contradiction inside the contract rather than between sheets.** The
message at `schema.mjs:148` says a HUD label *"has room for about 8"* while the check beside it fires at
`> 10`. **Ruling: the ceiling is 10.** The 8 is a target that was never the enforced number, and the
message should say 10 so that a builder reading the error is not told a third number. Not mine to edit.

**Why one word, everywhere except the area.** Four surfaces are cells; a two-word label in a
one-third-width cell wraps or truncates, and a truncated label is worse than a shorter word. `area.label`
is the exception on a stated ground rather than a feeling: the world is *"endless"* with
*"Areas, not zones"* `[brief: binding]` `[you chose: R3 Q2 / R5 Q1]` (`03-META.md`), and a one-word
namespace for an unbounded set of areas runs out, which is why the value on disk already carries a
locating modifier. **40 of 40 labels on disk already satisfy this**, so the rule costs nothing today and
is a bound on wave 3 and wave 4, which have 24 names and four set themes still to write.

**Why the plural rule is an invariant and not a preference — three reasons, one of them arithmetic.**
First, `plural === singular + "s"` makes the field derivable and checkable in one line, where today two
independent strings can drift apart silently. Second, it produces the 9-character singular ceiling: the
schema hard-checks the plural at 10, so a 10-character singular ships a plural that fails validation
after the naming decision is already made and cited elsewhere. Third and most importantly, an irregular
plural puts **two spellings of one term** into the game, and sheet `03`'s one-spelling invariant — the
thing this category's verification actually checks (*"every term ... appears once in the Vocabulary
canonical list, spelled one way"*, `cid/theme/_category.md`) — cannot survive that. `[cid: decided]`

**Casing is a stored-value rule, and the argument is the register's, not the typographer's.** Tone
reached the right answer from losslessness: `EAST TERRACE` cannot be converted back to `East Terrace`
without knowing which words are proper nouns, while uppercasing at render is free, and it fetched a
legibility study that runs the *other* way for glanceable isolated words
(`cid/theme/tone/01-register.md`, citing nngroup). **The reason this domain reaches the same answer
independently is stronger and it is the reason I rule for it:** if uppercase is permitted in stored
values then `EAST TERRACE` and `East Terrace` are both legal spellings of one term, the canonical
register holds two rows for one thing, and the one-spelling invariant becomes uncheckable. A register
cannot be built on top of a lossy value. Rendered case is typography and belongs to whoever owns the
screen. `[cid: decided]`

**Why `upgrades[].blurb` gets a character number at all, given `PROSE_PATHS` exempts it.** Because the
exemption is total: `schema.mjs:459` removes the label ceiling from `.blurb` and `.flavour` and puts
nothing in its place, so the only bound on a blurb today is Tone's 8 words — and 8 compliant words can
be 96 characters. **The backstop is 6 characters per permitted word**, from a mean English word length
near 4.7 plus a space, rounded up: 8 words → **48**. The three blurbs on disk run 20, 31 and 27
characters, so the longest has 4.4 characters per word and the backstop carries about 35% headroom. It
is a backstop, not the operative rule; word count is the operative rule. The same derivation gives any
prose path created later a number without another sheet: Tone's 12-word flavour line → **72**.
`[cid: decided]`, and `[playtest unknown]` on the exact figure — see the range at the end.

**Nothing here overrules a `[brief: binding]` or a `[brief: soft]` item, so there is no
`## Pushing back` section.** The brief is silent on all four of word count, character ceiling, casing
and plural formation; my index recorded that as gap G2 and routed it here.

### Tone's amendment: honoured in full, with one subsumption

`cid/theme/tone/01-register.md` filed a request addressed to this domain. **Honoured, not rejected,
item by item.**

| Tone asked for | ruling |
|---|---|
| Title Case stored, no ALL-CAPS, uppercase at render (P6) | **Honoured**, with the independent register argument above. This is the ruling the task routed to me and it lands the same way Tone recommended |
| `maxLabelChars` stays 14 | **Honoured unchanged.** 14 is the fallback for any path the map does not name |
| A lint for its character class (P5) | **Honoured.** My label regex is a strict subset of P5's, so a value passing mine passes P5 |
| A lint for `[A-Z]{2,}` (P6) | **Honoured and subsumed.** A positive Title Case regex catches everything the negative grep catches and also catches `eastTerrace`, which the grep passes. Tone's grep remains valid as the weaker check; the regex is what I ask the seam to run |
| 18 additions to `bannedWords` | **Not mine.** The ban list is 02's, and this sheet neither adds to nor removes from it. That request is between Tone and the holder of the key |
| ≤ 8 words on every non-flavour string (P4) | **Compatible and strictly looser than mine.** No 8-word ceiling ever binds a one-word label. Where the two touch — `area.label` — mine is 2 words and binds first |

**One boundary Tone drew that I confirm rather than move.** `collection.sets[].relics[].flavour` is
Tone's field (`cid/theme/tone/02-flavour-and-humor.md`), not mine: its word bounds, its terminal period
and its humor budget are all decided there. This sheet touches it in exactly one way — it carries the
**72-character prose backstop** into the amendment so the field is not unbounded on the day it is
created, since Tone 02 set word bounds and requested the `PROSE_PATHS` exemption without a character
number. If that reads as an overreach, the number is Tone's to change and the derivation is stated.

### The amendment, addressed to the holder of the `vocabulary` key

Not a `manifest` fence. `bridge` parses only ` ```manifest ` blocks, so this claims no key. Every field
below is **additive**: `validateManifest` checks that a shape's required fields are present and typed,
and ignores extra ones, so honouring this cannot fail the merge.
`[research: repo — bridge/schema.mjs:386-399, bridge/merge.mjs:28, read this run]`

```json
{
  "amends": "vocabulary",
  "requested_by": "cid/theme/vocabulary/01-naming-form.md",
  "maxLabelChars": 14,
  "pathNormalization": "replace /\\[\\d+\\]/g with '[]' before lookup, then fall back to maxLabelChars",
  "labelCharsByPath": {
    "area.label": 14,
    "currency.name": 9,
    "currency.plural": 10,
    "collection.className": 9,
    "collection.classPlural": 10,
    "tiers[].name": 12,
    "upgrades[].label": 12,
    "collection.sets[].label": 12,
    "collection.sets[].relics[]": 12,
    "collection.sets[].relics[].name": 12,
    "upgrades[].blurb": 48,
    "collection.sets[].relics[].flavour": 72
  },
  "wordsByPath": {
    "area.label": 2,
    "currency.name": 1,
    "currency.plural": 1,
    "collection.className": 1,
    "collection.classPlural": 1,
    "tiers[].name": 1,
    "upgrades[].label": 1,
    "collection.sets[].label": 1,
    "collection.sets[].relics[]": 1,
    "collection.sets[].relics[].name": 1,
    "upgrades[].blurb": 8,
    "collection.sets[].relics[].flavour": 12
  },
  "casing": {
    "label": "^[A-Z0-9][a-z0-9]*([ -][A-Z0-9][a-z0-9]*)*$",
    "prose": "^[A-Z0-9][a-z0-9]*([ -][A-Za-z0-9]+)*$",
    "proseInteriorCapitalRule": "an interior word beginning with a capital must appear in the canonical register",
    "prosePaths": ["upgrades[].blurb", "collection.sets[].relics[].flavour"],
    "storedForm": "Title Case for labels, sentence case for prose. Uppercase is a render transform applied to a whole label class and is never a stored value."
  },
  "pluralRule": {
    "form": "singular + s",
    "pairs": [["currency.name", "currency.plural"], ["collection.className", "collection.classPlural"]],
    "singularMaxChars": 9,
    "forbiddenSingularEndings": "(s|x|z|ch|sh|[^aeiou]y)$"
  },
  "proseCharsPerPermittedWord": 6,
  "notPlayerFacingPaths": [
    "patch.material",
    "tiers[].shape",
    "runtime.dataStoreName",
    "currency.icon",
    "area.id",
    "upgrades[].id",
    "collection.sets[].id",
    "modules[].id",
    "modules[].path",
    "modules[].responsibility",
    "modules[].criteria",
    "modules[].reads",
    "modules[].exposes",
    "modules[].dependsOn"
  ]
}
```

## Consequences for other work

- **The holder of the `vocabulary` key** *[`cid/theme/vocabulary/02-banned-words.md`, this domain]*:
  folds the block above into its manifest value. `maxLabelChars` 14 is unchanged and its `register`
  string is unchanged. It now has two amendments to merge, mine and Tone's, and they touch disjoint
  fields — Tone's are `register` and `bannedWords`, mine are lengths, casing and plurals.
- **Currency-naming work** *[Systems — `cid/gameplay/systems/02-the-currency.md`]*: gains a hard
  invariant on a field it owns. `name` ≤ 9 characters, `plural === name + "s"`, and no candidate ending
  in `s`, `x`, `z`, `ch`, `sh` or consonant-`y`. `Shard`/`Shards` passes both. An irregular or invariant
  plural is now unavailable, and so is a 10-character singular that would ship an 11-character plural
  into a check that fires at 10.
- **Collection-content work** *[Meta & Content — `cid/gameplay/meta/02-the-collection.md`]*: the same
  invariant binds `className`/`classPlural`, which matters because 02 bans `relic` and this sheet's
  ceiling constrains the replacement — one word, ≤ 9 characters, pluralised by `s` alone. `Find`/`Finds`
  satisfies it as written. The 24 find names stay **one word, ≤ 12 characters**; 24 of 24 pass today.
- **Area-content work** *[Meta & Content — `cid/gameplay/meta/01-the-area.md`]*: `EAST TERRACE` →
  `East Terrace`, 12 characters, inside the 14 ceiling. This is Tone's instruction and I cite it rather
  than re-derive it; what I add is that `area.label` is the **only** label permitted a second word, so
  the fix is a re-casing and not a rename.
- **Upgrade-ladder work** *[Balance — `cid/gameplay/balance/01-upgrade-ladder.md`]*: `VALUE` / `REACH` /
  `PACE` → `Value` / `Reach` / `Pace`, one word each, inside 12. The blurbs already pass sentence case
  and the new 48-character backstop at 20, 31 and 27 characters; their person-and-mood failures are
  Tone's finding, not mine, and re-wording them must not push any of them past 48.
- **Tier work** *[Systems — `cid/gameplay/systems/01-overgrowth-tiers.md`]*: `Moss` / `Fern` / `Bramble`
  / `Heartvine` pass on every axis — one word, ≤ 12, Title Case. Recorded so the rule is not read as a
  demand for a rename.
- **Object-naming work** *[Art & Visuals — Objects, wave 4]*: find names are **one word**. Stated
  release condition, so this is arguable rather than absolute: if a two-word find name is genuinely
  needed, it needs a wider card from screen work first, because the constraint is the cell and not my
  preference.
- **Contract and seam work** *[whoever owns `bridge/schema.mjs`]*: three requests and one prohibition.
  (1) `crossCuttingProblems()` consults `labelCharsByPath` after normalising `[\d+]` → `[]`, falling
  back to `maxLabelChars`. (2) The two casing regexes run over the same string list the ban check
  already walks, subsuming Tone's `[A-Z]{2,}` grep. (3) `currency.check()`'s message says *"about 8"*
  while the check fires at `> 10`; the ceiling is 10 and the message should say so. **The prohibition:
  do not extend `playerFacingStrings()` to `patch.material`, `runtime.dataStoreName`, `currency.icon`,
  any `id`, or any `modules[].*` field.** `patch.material` is `Grass`, the reference game's own noun,
  and a widened walk would fail the merge on an engine enum member. Separately and outside my subject:
  `patch.material` is typed `'string'` at line 169, so a typo ships as an invalid `Enum.Material` with
  nothing to catch it.
- **Screen work** *[UI/UX — Screens, wave 4]*: **rendered case is yours, stored case is not** —
  agreeing with Tone rather than adding to it. What is new for you is that **every ceiling in the table
  above is provisional on a measured render.** They were derived from surface class, not from measured
  glyph widths, because nothing has yet rendered a real string into a `modal-grid` cell at phone width.
  If 12 characters does not fit the cell at the chosen body size, the number moves down on your
  measurement and not on anyone's taste. You also inherit the fact that four of five surfaces are cells,
  which is the assumption the whole table rests on.
- **The canonical register** *[sheet `03`, this domain]*: its one-spelling invariant is only checkable
  because casing is a stored-value rule, so its row format must carry the **stored** form. It also now
  carries a second job: the prose casing rule defers to it for any interior capital inside a blurb, so a
  term missing from the register makes a legitimate blurb fail.
- **Coinage intake** *[sheet `04`, this domain]*: a submission is incomplete unless it names the contract
  path its word will occupy, because the ceiling and the word count are per path. A word submitted with
  no path cannot be checked.
- **External-name work** *[Discovery & Marketing, wave 5]*: the title, the tagline and the store
  description are **outside this table**. No ceiling, no word count, no casing rule and no plural rule on
  this sheet reaches them. Uppercase in a store listing is a listing decision.
- **Price-and-SKU work** *[Monetization, wave 3]*: no contract key holds an SKU name, so the table does
  not reach one either. If one is ever added to the contract, its ceiling is the surface it renders on
  and this sheet's derivation applies; the digit allowance in the label regex exists so `2x Value` is
  legal rather than a regex accident.

## Acceptance criteria

Counts are over the 43 strings `playerFacingStrings()` returns from the merged manifest today:
`area.label`, `currency.name`, `currency.plural`, `collection.className`, `collection.classPlural`, 4
`tiers[].name`, 3 `upgrades[].label`, 3 `upgrades[].blurb`, 4 `sets[].label`, 24 `sets[].relics`.

1. **Casing.** Every one of the 40 non-blurb strings matches
   `^[A-Z0-9][a-z0-9]*([ -][A-Z0-9][a-z0-9]*)*$`, and every one of the 3 blurbs matches
   `^[A-Z0-9][a-z0-9]*([ -][A-Za-z0-9]+)*$` with every interior capitalised word present in the
   canonical register. **39 of 43 pass as written. The 4 failures are `area.label` = `EAST TERRACE` and
   `upgrades[].label` = `VALUE`, `REACH`, `PACE`** — the same four Tone's P6 found, fixed by the same two
   sheets. Zero failures after they revise.
2. **Per-field ceilings.** No string exceeds its `labelCharsByPath` entry, with `maxLabelChars` 14 as
   the fallback. Specifically `currency.name` ≤ 9, `collection.className` ≤ 9, `currency.plural` ≤ 10,
   `collection.classPlural` ≤ 10, every tier name / upgrade label / set label / find name ≤ 12,
   `area.label` ≤ 14, every blurb ≤ 48. **43 of 43 pass as written**; the longest label is `East Terrace`
   at 12 and the longest blurb is 31 characters.
3. **Plural invariant.** `currency.plural === currency.name + "s"` and
   `collection.classPlural === collection.className + "s"`, and neither singular matches
   `/(s|x|z|ch|sh|[^aeiou]y)$/i`. **Both pairs pass as written** (`Shard`/`Shards`, `Find`/`Finds`).
4. **Word counts.** `area.label` is 1 or 2 words; each of the other 39 non-blurb strings is exactly 1
   word; each blurb is at most 8 words. **43 of 43 pass as written**; the longest blurb is 7 words.

## Not decided here

Which words are banned, and the `register` string itself (`02`, this domain — it holds the key). The
canonical list's location, row format and wave-1 membership (`03`). How a word enters after wave 1 and
who wins a clash (`04`). Every actual name: the currency, the four tiers, the three upgrade labels, the
area label, the four set labels and the 24 find names all live inside keys other domains own, and this
sheet supplies the form they must satisfy and not one of the values. Copy-level person, mood, tense,
intensity, the fourth wall and the mood-claim ban (Tone `01`, cited not restated). Flavour text's word
bounds, punctuation and humor budget (Tone `02`). The **global on-screen copy budget** — how much text a
screen may hold in total — which is screen work and is unset anywhere in the brief. Rendered typography,
font size, wrap behaviour and whether a label class displays uppercase (UI/UX — Screens). The title and
tagline (Discovery & Marketing, wave 5). Whether `patch.material` should be an enum in the contract
(seam work).

## Flagged to the developer

Four rulings answer questions the brief never asks. `cid/theme/_category.md` gap 4 and my domain index
gap G2 both record the silence, so all four are `[cid: decided]` against no developer input.

| ruling | live alternative | my recommendation |
|---|---|---|
| **A per-field character ceiling map, 9 to 14, instead of one global 14** | Keep the single 14 and let every field share it | **Keep the map.** The contract is already two-tier — `currency.plural` has its own hard 10 — so the single-number model does not exist to preserve. The map also removes the temptation to lower 14 globally, which would break `East Terrace` to fix a HUD label |
| **One word per label, `area.label` excepted at two** | Allow up to Tone's 8 words everywhere | **Keep one word.** 40 of 40 labels on disk already comply, so it costs nothing today and binds the 24 names and 4 set themes still to be written. Relaxing a ceiling later never invalidates a shipped string, which makes this the cheap direction to be wrong in |
| **Title Case in stored values; uppercase only as a render transform** | Store `EAST TERRACE`; the legibility study Tone fetched favours uppercase for glanceable isolated labels | **Keep Title Case stored.** Both renderings stay available, and the canonical register's one-spelling invariant is uncheckable if two casings of one term are both legal values. Cost of reversing: four strings |
| **`plural === singular + "s"`, singular ≤ 9 characters** | Let each pair be named freely | **Keep.** It is the only rule here that prevents a validation failure arriving *after* a name is decided and cited elsewhere, and it forecloses two spellings of one term |

**`[playtest unknown]` — the blurb backstop, and the ceilings generally.** Starting value 48 characters
for `upgrades[].blurb` (6 per permitted word × 8 words), 72 for a 12-word flavour line. Test range
**40 to 64** for the blurb. These should move on a **measured render** rather than on preference: what
would settle them is one `npm run render` of `collection-index` and `upgrades` at phone viewport with
the real strings in place, which has never been done with a stage-0-derived context. The 12-character
cell ceiling carries the same caveat and the same test.

**No URL was fetched in this run.** Every `[research: repo — ...]` above cites a file read this run, and
`npm run bridge -- --contract` could not be executed because this session has no shell; I read `SCHEMA`,
`playerFacingStrings()`, `PROSE_PATHS` and `crossCuttingProblems()` directly in `bridge/schema.mjs`,
which is what `contract()` prints from. The legibility finding is relayed from
`cid/theme/tone/01-register.md`, not re-fetched.
