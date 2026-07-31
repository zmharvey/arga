# 02 — Flavour and humor

**Domain:** Tone · **Category:** Theme & Narrative · **Wave:** 1

## Decision

**Dry means deadpan factual, and nothing else.** Every Find carries exactly one flavour line: one
sentence, 4 to 12 words, present tense, third person or no person, stating one observable condition
of that one object. **Exactly 3 of the 24 lines are funny** — `terrace` 0, `cistern` 1, `vault` 1,
`spire` 1 — and a funny line is **formally indistinguishable** from the other 21. The humor is in
the fact selected, never in the wording. A reviewer who is shown the 24 lines with the allowlist
hidden must not be able to tell which 3 are the jokes.

Understatement and the wry aside are both **rejected by name** (reasons in `## Why`). The only
punctuation flavour text adds to register `01`'s character class is **a terminal period** — no
comma, no dash, no ellipsis, no exclamation, no question mark, no apostrophe, no quotation mark.
That answers `01-register.md`'s standing request to name the characters flavour needs, and it is
what makes the aside mechanically unwritable rather than merely discouraged.

**The surface this decision governs does not exist.** No contract key holds flavour text, and
`modal-grid`'s item card is art, name, badge and price with no body-text field. The requirement is
filed in full below, with the three seam changes it needs and the cheapest render route.

**No manifest block: Tone owns no contract key.** The machine-holdable half of this sheet is a
field on `collection`, which `gameplay/meta` owns, so it is filed as a request below rather than
claimed here. `[research: repo — bridge/schema.mjs:30-133, :409-464, read this run]`

## Why

**The binding constraint, restated once with its provenance so a downstream reader can find it.**
*"**Dry and sparse.** Humor lives only in relic flavour text. No system copy, UI, error message,
tutorial text, or store copy is funny. No relic name is a pun."* `[brief: binding]` — developer, in
session 2026-07-30, present in no brief sheet. Not re-openable. The class noun is `Find` / `Finds`;
`relic` is banned (`cid/theme/vocabulary/02-banned-words.md`), so the decision is read with that
substitution.

### Why deadpan factual is not a preference but the only surviving form

The three candidate forms were tested against constraints already on disk. Two are closed.

| form | what it needs | why it is closed |
|---|---|---|
| **understatement** | a large fact to be small about | Lore's `S1` never answers what ended the place and rules that *"damage may be described as **present** and may not be **attributed**"*; `01-the-past` rules *"Nothing happened to them"* (`cid/theme/lore/02-the-silences.md`, `01-the-past.md`) `[research: repo — read this run]`. With no event, no cause and no consequence anywhere in canon, there is nothing to under-state, and understatement with nothing behind it reads as cuteness. |
| **wry aside** | a speaker with a stance toward the player | *"nothing in the world addresses the player"* and the role is legible with no words at all (`cid/theme/identity/01-player-role.md`) `[research: repo — read this run]`. An aside also needs a comma, a dash or an ellipsis, all of which register `01` bans and which this sheet declines to unban. |
| **deadpan factual** | a present condition | Exactly the one thing lore permits: *"a present condition passes, a cause or an intent fails"*. It needs no event, no speaker and no punctuation beyond a stop. |

`[cid: decided]` — the elimination is derived from three sheets on disk; the choice between what
survived and writing no flavour text at all is mine.

**So the humor device is a single unremarked oddity.** The line names something faintly odd about
the object's present state and the sheet's manner does not change. That is why the form rule
(identical shape for all 24) is the load-bearing half rather than a style note: **dryness is the
absence of a signal**, and a signal is a thing a reviewer can see. A joke that announces itself has
already failed, whatever it says.

**Why the ratio is 3, as an integer.** *"Sparse"* is binding and an earlier draft of this domain
said 1 in 8. There are 24 Finds `[brief: soft]` `[you accepted: R4 Q4]` (`02-GAMEPLAY.md`), fixed at
24 in the live manifest (`cid/gameplay/meta/02-the-collection.md`), so 1 in 8 is **3 lines** and the
whole game's humor budget is 3 strings out of 67 player-facing strings (43 in the contract today plus
24 flavour lines), about 4%. `[cid: decided]` on rendering the ratio as a count rather than a rate:
a rate invites rounding, and 24 is small enough that "1 in 8" and "3" are the same instruction only
if one of them is written down.

**Why the distribution is 0/1/1/1 rather than 3 anywhere.** Set one is entered first, the first
find is guaranteed in the first area (`cid/gameplay/onboarding/01-first-find.md`), and a game that
is funny in the first six lines a player reads has set its baseline as *funny*, after which the
other 18 read as flat rather than as the norm. Sets deepen one at a time and a set completes with an
area (`02-the-collection.md`), so one per set after the first means the player meets a joke at the
pace of set completion instead of in a cluster. `[cid: decided]`

**Why 4 to 12 words.** Derived from the render target, not from taste: a line is displayed in a
panel-width text region (see the requirement below), where 12 words is one to two lines at phone
size, and the floor of 4 is what separates a sentence from a second label. Register `01` sets 8
words for non-flavour strings; flavour is the only place in the game where a fact needs a verb and
an object, so it gets four more and no second sentence. Reading level inherits `01`'s FK grade 6
ceiling. `[cid: decided]`

**Why the pun ban's real check lands here and not on naming.** A pun needs a name whose second
sense is doing work. Naming can only check the name: the 24 on disk are the plain common nouns of
the objects they denote, so 24 of 24 pass. But **half of them are homonyms** — a line can activate
a second sense that the name alone never had, and at the moment `theme/vocabulary` and
`gameplay/meta` wrote the names, the lines did not exist to check. **The pun risk is name × line**,
which is why the two must be authored in one sheet (below) and why this sheet supplies the second
half of the check. `[cid: decided]`

**Inherited constraints that reach every flavour line, checked rather than assumed.** Each of the 24
lines is a player-facing string, so it is walked by the ban list and the label-length rule in
`crossCuttingProblems()`, and by lore's ~100-token grep and both of its structural tests
(`02-the-silences.md` rule 3). Two consequences worth stating because they bite prose harder than
they bite labels: lore's ban on the phrase `of the` removes the partitive construction, so
*"Two of the six holes are empty"* must be rewritten as *"Two holes remain empty"*; and lore's ban
on the possessive `'s` is enforced for free here, because this sheet's character class contains no
apostrophe. The apostrophe ban also removes contractions, which suits the register.

## The rule, as seven properties a reviewer holds

| # | property | the rule | the check |
|---|---|---|---|
| **F1** | **one object, one condition** | The line states an observable present condition of its own Find. Not its history, not its use by anyone, not the place, not the player, not another Find, not a system. | Reviewer, one line: **a present condition passes, a cause or an intent fails** (lore `S1`). |
| **F2** | **form** | Exactly one sentence, 4–12 words, initial capital, terminal period. No second sentence, no fragment, no word over three syllables. | `^[A-Z][A-Za-z0-9]*([ -][A-Za-z0-9]+)+\.$` plus a word count in `[4,12]` |
| **F3** | **characters** | Letters, digits, single interior spaces, interior hyphens, one terminal period. Nothing else. | the F2 regex; it admits no other character |
| **F4** | **person and tense** | Third person or no person. Present tense. | register `01`'s P1 and P3 greps, unchanged |
| **F5** | **the humor allowlist** | Exactly 3 lines are funny, named by Find, one each in `cistern`, `vault`, `spire`, none in `terrace`. A funny line off the allowlist is a defect regardless of quality. | count the allowlist: 3 entries, 0 in `terrace` |
| **F6** | **no name in a line** | A line contains no Find name — not its own, not any of the other 23. | whole-word case-insensitive grep of all 24 names over all 24 lines: 0 hits |
| **F7** | **no comic art** | The humor budget is spent on copy only. No `artPrompt` asks for a comic object. | `grep -iwE 'funny\|silly\|comic\|whimsical\|goofy\|cartoonish\|absurd\|joke'` over every `artPrompt` returns 0 |

**F6 is the strict one and it is strict on purpose.** It kills the commonest pun construction (a line
that sets up its own name's second sense), it stops a line wasting words restating the label above
it, and it stops a line asserting that two Finds belong together — which is set meaning, owned by
Meta & Content in wave 3, and adjacent to lore's `S3`. **Cost, stated:** it removes about 24 common
nouns from a 12-word vocabulary. **Release condition, if it ever binds too hard:** wave 3 rules on
the relationship first, then a line may name the other Find.

## What a violation looks like

Eight classes. Every example is about a deliberately unnamed object, because this sheet may not
write copy for the 24 Finds — that is the authoring sheet's job (see `## Not decided here`).

| # | class | example failure | fails |
|---|---|---|---|
| V1 | **the wink** | `Still keeping time. Somehow.` | F2 (two sentences), and the adverb is the signal F5 forbids |
| V2 | **the aside** | `The lid fits, more or less.` | F3 (comma). This is the form the punctuation rule exists to make impossible |
| V3 | **address** | `You will want this one.` | F4 (second person), and register `01` P1 |
| V4 | **attribution** | `Cracked when the roof came down.` | F1, and lore `S1`'s structural test |
| V5 | **the pun** | any line that activates a second sense of its own Find's name | F6, and the binding pun ban |
| V6 | **the system reference** | `Not part of any set.` | F1. The fiction does not know the collection is a system |
| V7 | **two facts** | a 17-word line joining two conditions with `and` | F2 |
| V8 | **the fourth joke** | a fourth funny line anywhere, or two in one set, or any funny line in `terrace` | F5 |

**A ninth, and it is the one most likely to ship:** a *perfectly formed* funny line that is
funny **and** the two neighbouring lines have been written funny to match. Sparseness is a property
of the set, not of a line, so a reviewer checks the count before they check the wording.

## Containment, per surface, conditional on the surface existing

The binding decision names surfaces the brief says do not exist. Stated per surface so the ban
neither invents a surface nor leaves a hole if one appears.

| surface | exists today | humor |
|---|---|---|
| `collection.sets[].relics[].flavour` | **no** — no key, no render path | **the only permitted surface.** 3 lines, per F5 |
| the 24 Find names | yes, in the manifest | forbidden, plus the binding pun ban. A name is the object's own common noun |
| `upgrades[].label` / `.blurb`, `tiers[].name`, `area.label`, `sets[].label`, `currency.name` / `.plural`, `collection.className` / `.classPlural` | yes, 43 strings | forbidden. Register `01`'s P1–P10 already make a joke mechanically hard: it needs a second clause, an aside or a wink, and all three are banned characters |
| system, confirmation and error copy | **no** — no contract key holds it | forbidden **if it ever exists.** Naming it here does not create it |
| onboarding or tutorial text | **no**, and *"No text, no tutorial"* (`02-GAMEPLAY.md`) `[brief: soft]` | forbidden **if it ever exists.** The binding decision constrains a surface the brief removed; the constraint is recorded, the surface is not conjured |
| SKU names and descriptions | not yet — Monetization, wave 3 | forbidden |
| store listing, title, tagline | wave 5 | **forbidden by the binding decision, which names store copy explicitly.** Note this reaches further than register `01`, which stops at the client boundary |
| `artPrompt` values | yes, for objects not yet drawn | forbidden per F7. Not copy, but it produces a player-facing thing, and a comic model would double a budget of 3 |

## The delivery requirement

Not a `manifest` block. `bridge` parses only ` ```manifest ` fences, so this fence claims nothing
and provides no key. `[research: repo — bridge/merge.mjs:28, relayed from 01-register.md]`

```json
{
  "requests": "a field that carries Find flavour text, and a surface that renders it",
  "requested_by": "cid/theme/tone/02-flavour-and-humor.md",
  "target_key": "collection",
  "owner_of_key": "gameplay/meta",
  "shape_change": {
    "from": "collection.sets[].relics: string[]",
    "to": "collection.sets[].relics: [{ name: string, flavour: string }]"
  },
  "seam_changes_this_forces": [
    "collection.check(): the duplicate test is seen.has(r) on a string. Against objects it compares identity, so every duplicate Find name becomes invisible and nothing errors.",
    "playerFacingStrings(): add() ignores non-strings, so object entries would silently vanish from the ban-word check, the label-length check and every register grep. Add collection.sets[i].relics[j].name and .flavour explicitly.",
    "crossCuttingProblems(): the label-length exemption tests path.endsWith('.blurb'). Extend it to '.flavour', or all 24 lines fail the 14-character limit on arrival."
  ],
  "fallback_if_the_shape_change_is_not_funded": "collection.sets[].flavour: string[] aligned by index with relics[], plus a check that the two arrays are the same length. Cheaper, and it orphans silently if a name is reordered.",
  "render_requirement": {
    "screen": "collection-index",
    "pattern": "modal-grid",
    "needed": "one text region showing the selected Find's line",
    "cheapest_route": "the pattern's existing sanctioned slot panelBottom, plus a selected-item state. No new pattern required.",
    "rejected": "a per-card caption inside a grid cell. A 12-word line in a one-third-width cell at phone size is unreadable, and it would force the line down to label length, which is the length that cannot hold a fact.",
    "visibility": "a line renders only for a found Find. An empty slot shows no line and leaks no text."
  },
  "line_rules": {
    "sentences": 1,
    "wordsMin": 4,
    "wordsMax": 12,
    "charClass": "^[A-Z][A-Za-z0-9]*([ -][A-Za-z0-9]+)+\\.$",
    "funnyLines": 3,
    "funnyPerSet": { "terrace": 0, "cistern": 1, "vault": 1, "spire": 1 },
    "namesInLines": 0,
    "fkGradeCeiling": 6
  },
  "authored_by": "whoever provides the collection key, in the same sheet that names the Finds, because the pun risk is name x line and splitting them across two sheets recreates it"
}
```

**Nothing is requested of the `vocabulary` key.** Register `01` already filed that amendment, one
key belongs to one sheet, and this sheet's additions are a character class and a count rather than
words. `[research: repo — cid/theme/vocabulary/02-banned-words.md, read this run]`

## Consequences for other work

- **Collection-content work** *[currently Meta & Content, wave 3 — `cid/gameplay/meta/02-the-collection.md`]*
  gains 24 lines of writing it does not currently owe, and owes them **in the same sheet as the 24
  names**. Its manifest value grows from 24 strings to 24 name-and-line pairs. It also inherits F5's
  allowlist: it must name which 3 lines are the funny ones, in prose, or the count cannot be checked.
- **Contract and seam work** *[whoever owns `bridge/schema.mjs`]* gets the three changes above.
  **The middle one is a silent-failure bug, not a feature request:** the moment `relics[]` holds
  objects, three existing lints stop seeing 24 strings and report success.
- **Screens work** *[currently UI/UX, wave 4]* owns whether the surface exists at all. The line is
  the requirement; `panelBottom` plus a selected-item state is the cheapest route named, and the
  per-card caption is rejected with a reason so it is not re-proposed. A found-only visibility rule
  comes with it.
- **Object art** *[currently Art & Visuals — Objects, wave 4]* inherits F7: no comic object, no
  whimsical prompt, including for the 3 Finds carrying funny lines. Ornament comes from carving and
  age, per `cid/theme/lore/01-the-past.md`.
- **Audio intent** *[currently Audio, wave 4]*: **no cue accompanies a flavour line.** A sound under
  a joke is pointing at it, which is the one thing dryness forbids. This is a prohibition on a
  moment, not a specification of a sound.
- **Beat-map work** *[sheet `03`, this domain]*: **a flavour line is never a beat.** It is read in a
  panel, at the player's initiative, after the reveal is over, so it does not compete for the loudest
  moment and does not need a slot in that sheet's ordering.
- **Store-listing copy** *[currently Discovery & Marketing, wave 5]*: the humor ban reaches you even
  though register `01`'s does not. All three neighbouring games in the family are exclamatory; none
  is funny, so this costs nothing measured against them.
- **Do-nots work** *[sheet `04`, this domain]*: V1–V8 above are **decided here** and must be cited,
  not restated. The exclusion list may add the surfaces this sheet leaves conditional; it may not
  re-derive the eight classes.
- **Naming work** *[Vocabulary Lead, this category]*: the pun ban's first half is yours and 24 of 24
  names pass it today. The second half (F6) is mine because it needs a line to check against. No new
  term is coined here, so the canonical list gains 0 entries.
- **Onboarding choreography** *[currently Onboarding, wave 2]*: the first Find a player uncovers has
  a flat line, guaranteed by `terrace` carrying 0 funny lines. Nothing in the first ten seconds is
  funny, and nothing in the first ten seconds is text.

## Acceptance criteria

1. **Count and distribution.** The sheet that authors the lines names exactly **3** funny lines by
   Find, distributed `terrace` 0, `cistern` 1, `vault` 1, `spire` 1. A 4th, or a 2nd in one set, or
   any in `terrace`, fails.
2. **Form.** All 24 lines match `^[A-Z][A-Za-z0-9]*([ -][A-Za-z0-9]+)+\.$` and contain 4 to 12
   words. 24 of 24, no exceptions, funny lines included.
3. **No name in a line.** A whole-word case-insensitive search for each of the 24 Find names across
   all 24 lines returns **0** hits.
4. **Containment.** Zero player-facing strings outside `collection.sets[].relics[].flavour` are
   funny, evidenced mechanically: no non-flavour string contains `.` `,` `!` `?` `…` or a second
   sentence (register `01` P5, 43 of 43 pass today), and `grep -iwE
   'funny|silly|comic|whimsical|goofy|cartoonish|absurd|joke'` over every `artPrompt` returns 0.

## Not decided here

**The 24 lines themselves** — routed to whoever provides the `collection` key
*[currently Meta & Content, wave 3]*, to be written in the same sheet as the names. This sheet
deliberately writes zero copy for any named Find; every example above is about an unnamed object, so
that wave 3 and Art & Visuals are constrained rather than pre-empted. Whether the field and the
render surface get built *(contract and seam work; UI/UX, wave 4)*. Typography, wrap behaviour and
where the region sits in the panel *(UI/UX — Screens)*. What the four sets mean and why six things
were found together *(Meta & Content, wave 3; bounded by lore's `S3`)*. Which words are banned
*(Vocabulary)*. Where the game peaks *(sheet `03`)*. The tonal exclusion list as an audit instrument
*(sheet `04`)*.

## Flagged to the developer

**The binding humor decision names the one surface the pipeline does not have.** Three live options,
in ascending cost:

| option | cost | consequence |
|---|---|---|
| **Ship no flavour text.** | zero | The binding decision is satisfied vacuously and **the game contains no humor at all.** That should be a stated choice, not a discovered one. |
| **Build the field and render it in `panelBottom`** with a selected-item state. **Recommended.** | 24 short strings, one text region, one selection state, three small seam edits | The humor decision becomes real, and lore gains the only delivery channel it has ever had — `cid/theme/lore/02-the-silences.md` records that no key holds fiction and neither pattern has a body-text field. |
| **Build a per-Find detail view** as a new `ui-forge` pattern. | a new pattern, and `ui-forge` currently has two | Better reading experience, and it is the pipeline's narrowest point per `CLAUDE.md`. Not needed for 12 words. |

**Two judgment calls inside my recommendation, both cheap to reverse.**
`[playtest unknown]` — **whether 3 funny lines reads as sparse or as absent.** Starting value 3. Test
range **2 to 5**, moved only in whole lines and never above one per set. What would settle it: ask a
player in the band, after a completed set, whether the game is funny; *"a bit, in places"* is the
target answer and *"no"* means raise it.
`[playtest unknown]` — **the 12-word ceiling.** Test range **8 to 16**, and it should move on the
measured width of the render region rather than on preference.

Sources: no URL was fetched in this run. Every `[research: repo — ...]` above cites a file read this
run, and the genre-register findings are relayed from `cid/theme/tone/_lead.md`.
