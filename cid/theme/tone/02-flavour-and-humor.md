# 02 — Flavour and humor

**Domain:** theme/tone · **Category:** Theme & Narrative · **Wave:** 1

## Decision

**Dry means anticlimactic fact.** A flavour line is one sentence of at most 14 words stating
one ordinary property, use or condition of the object, evaluating nothing; where humor exists
it is the gap between what the object looks like and how small the fact is, and no other
mechanism is permitted. **Humor lives at exactly one contract path,
`collection.sets[].relics[].flavour`, in at most 6 of the 24 lines.** Every other
player-facing string in the game carries none.

## Why

The binding decision is *"**Dry and sparse.** Humor lives only in relic flavour text. No
system copy, UI, error message, tutorial text, or store copy is funny. No relic name is a
pun."* `[brief: binding]`, developer in session 2026-07-30, not present in any brief sheet.
*Dry* has at least four readings (deadpan understatement, irony, absurd juxtaposition,
bureaucratic flatness) and a writer held to an adjective will pick a different one each
Tuesday, so one is chosen and the other three are named as excluded. Understatement is the
only one of the four that survives P1's ban on addressing the reader and P7's ban on the game
evaluating anything (sheet `01`), because the other three need a narrator with an attitude.
`[cid: decided]`

**Sparse is a proportion, not a mood.** 6 of 24 is one funny line a set, which is roughly one
per hour of a completed set at the brief's 10 to 20 minute sessions `[brief: binding]` ←
`[you chose: R1 Q4]` (`00-CORE.md`). `[playtest unknown]`, test range 3 to 8 of 24; the count
moves, the mechanism does not.

**Whether this genre ships item text at all could not be established.** Two of three source
types failed (HTTP 402, HTTP 405) and the third characterises the reference rather than
quoting it, offering only a *"relaxing, meditative quality"*
`[research: https://www.rosenberryrooms.com/grass-incremental/]`. Recorded as unavailable, not
as absent. `[research owed: an in-client screenshot of the reference's collection panel, or a
fan wiki page in this family that reproduces item text]`

### F1–F8: the form a flavour line takes

Every flavour line inherits P1–P9 from sheet `01` entire. These are additional.

| id | rule | check |
|---|---|---|
| F1 | Exactly one sentence, at most 14 words, ending in `.` | word and sentence count |
| F2 | States a property, a use, or a physical condition of that object. No simile, no metaphor, no personification, no invented history | a line with `like`, `as if`, or a verb of intent fails |
| F3 | No wordplay of any kind: no pun, no homophone, no rhyme, no alliteration running 3 or more words, no idiom, no meme or pop-culture reference, no brand or person's name | read-aloud review, plus the name test below |
| F4 | No evaluation. Banned whole words beyond list M in sheet `01`: `rare precious valuable priceless worthless useless junk beautiful ugly perfect broken-beyond` | word list |
| F5 | No reference to another Find, to the collection, to sets, to counting, to the act of finding, or to the person doing it | word list plus review |
| F6 | May not answer any of the six silences `S1`–`S6` in `cid/theme/lore/02-the-silences.md` (pack §4). A flavour line is the cheapest place in the game to leak canon by accident | that sheet's own trigger-token test |
| F7 | At most **6 of 24** lines are marked humorous by the sheet that ships them; at least 18 carry no humorous intent. The mark is authored, in a `humor` column beside the line, so the proportion is countable rather than argued | count the column |
| F8 | The only permitted mechanism is **anticlimax**: the fact is smaller than the object implies. Excluded by name: irony, sarcasm, exaggeration, absurdity, self-deprecation, anachronism-as-joke, bathroom humor, a punchline in the final clause | review against this list |

### How the pun ban is checked

*"No relic name is a pun"* is binding and unenforceable as written, because no regex detects a
pun. It is converted into a property of the name instead. `[cid: decided]`

| id | test | pass condition |
|---|---|---|
| N1 | Each `collection.sets[].relics[].name` resolves to a single general-dictionary noun denoting a physical object or a physical part, **or** is a closed compound of two such nouns | dictionary lookup, per name |
| N2 | No name contains, as a substring or homophone, a proper noun of a person, brand, place outside the fiction, or meme | review against N1's dictionary result |
| N3 | Read-aloud backstop: reviewer A reads the 24 names aloud to reviewer B, who has not seen the list. Any name for which B reports a second meaning fails and is rewritten | count of reported second meanings is 0 |

N1 is the load-bearing one and it is not theoretical: the six names already shipped in
`collection.sets[0]` (`cid/gameplay/meta/02-the-collection.md`, pack §4) all pass it, including
the two compounds.

### Containment: where humor may and may not appear

| surface | humor | source |
|---|---|---|
| `collection.sets[].relics[].flavour` | **permitted, at most 6 of 24** | `[brief: binding]` |
| `collection.sets[].relics[].name` | forbidden | `[brief: binding]`, *"No relic name is a pun"* |
| `upgrades[].label`, `upgrades[].blurb` | forbidden | `[brief: binding]`, *"system copy"* |
| `tiers[].name`, `currency.name`, `currency.plural`, `area.label`, `collection.sets[].label`, `className`, `classPlural` | forbidden | `[brief: binding]`, *"system copy"* |
| HUD readouts, panel headings, button faces, empty-state lines | forbidden | `[brief: binding]`, *"UI"* |
| error and system messages | forbidden | `[brief: binding]`, *"error message"* |
| onboarding or tutorial copy, **if any ever exists** | forbidden | `[brief: binding]`, *"tutorial text"*, stated conditionally because `02-GAMEPLAY.md` says *"No text, no tutorial"* `[brief: soft]` and the ban must not invent the surface nor leave a hole if one appears |
| the store listing | forbidden | `[brief: binding]`, *"store copy"*. **Note the asymmetry:** the humor ban reaches the listing, sheet `01`'s register does not |
| loading screens, tips, changelogs, patch notes, group posts, thumbnails | forbidden | `[cid: decided]`, extending the binding list to surfaces it did not enumerate |

## The delivery requirement

The surface the binding decision names exists in the contract but is not yet populated.
`playerFacingStrings()` already reads `r.flavour` on a Find entry, `PROSE_PATHS` already
exempts `/\.flavour$/` from the label-length limit, and `crossCuttingProblems()` already runs
the banned-word check over it `[research: bridge/schema.mjs]`. So:

- **`gameplay/meta`** (owns `collection`): if flavour text ships, Find entries ship as objects
  `{ name, flavour }` rather than bare strings. Any other shape puts the line outside every
  naming and banned-word check.
- **UI/UX, wave 4:** the `collection-index` panel renders one flavour line per Find, visible
  only after that Find is revealed, never on an empty slot (sheet `03`, `B1`).
- **If neither ships,** the humor level has nowhere to live and the binding decision is
  vacuous. That is a finding about the seam, not a tone failure, and it is recorded here so it
  cannot be discovered later as a surprise.

## Flagged to the developer

The brief is silent on how much of the collection is funny. 6 of 24 is a decision. Live
alternatives: 24 of 24 with the humor very faint (rejected: *sparse* was binding), 12 of 24
(rejected: a joke every other slot becomes the register), 0 of 24 with flavour purely factual
(defensible, and the safest if flavour ships late). Recommendation: 6.

## Acceptance criteria

1. `flavour` appears at exactly one path class in the merged manifest,
   `collection.sets[i].relics[j].flavour`, and no other player-facing path holds prose except
   `upgrades[i].blurb`.
2. Every flavour string is one sentence, at most 14 words, ends in `.`, and matches sheet
   `01`'s P4 character set.
3. The sheet that ships the 24 lines carries a `humor` column; at most 6 rows are marked true
   and at least 18 are marked false.
4. Every `collection.sets[].relics[].name` passes N1: a dictionary noun denoting a physical
   object or part, or a closed compound of two such nouns.

## Not decided here

The 24 Finds themselves, their models and what any of them is (Art and Visuals, wave 4;
`gameplay/meta` holds the names). Set themes (Meta and Content, wave 3). Whether a flavour
surface is built and what it looks like (UI/UX, wave 4). The default voice of every other
string, including its punctuation and reading level (sheet `01`, this domain). Which words are
banned as a machine list (`theme/vocabulary`). When a reveal is allowed to be loud (sheet
`03`).
