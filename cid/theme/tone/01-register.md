# 01 — Register

**Domain:** Tone · **Category:** Theme & Narrative · **Wave:** 1

## Decision

**Every player-facing string that is not Find flavour text is third person or no person, indicative
present, at most 8 words, and drawn from the characters `A-Z a-z 0-9`, single interior spaces and
interior hyphens — nothing else.** No exclamation mark, no question mark, no terminal period, no
emoji, no run of two or more capitals, no superlative, no reference to the game as a game, and no
word naming the game's own mood.

*"Warm, aged, unhurried"* survives verbatim as a **description** and is replaced as an
**instruction**: warmth is delivered by naming physical things and issuing no orders, unhurriedness
by the absence of the imperative and the exclamation. Ten properties below, each with a check.

**No manifest block: Tone owns no contract key.** I read `SCHEMA` and `contract()` in
`bridge/schema.mjs` directly (no shell in this run, so `npm run bridge -- --contract` was not
executed): eleven keys, owners `gameplay/*` ×7, `tech/architecture` ×2, `art/objects` ×1, and
`theme/vocabulary` ×1. The one key that could hold part of this register — `vocabulary` — is already
provided by `cid/theme/vocabulary/02-banned-words.md`, and one key means one sheet, so the
machine-holdable half of this decision is **routed there** in the block below rather than claimed
here. `[research: repo — bridge/schema.mjs:30-133, :400-450, read this run]`

### The register, as ten properties

| # | property | the rule | the check |
|---|---|---|---|
| **P1** | **person** | Third person, or no person at all. The game describes things; it addresses nobody. | `grep -iwE '\b(i\|me\|my\|mine\|we\|us\|our\|ours\|you\|your\|yours)\b'` returns 0 hits |
| **P2** | **mood** | Indicative, or a bare noun phrase. No imperative, no question, no exclamation. | Reviewer test, one line: **reads as an instruction to the player → fails; describes a thing or a state → passes.** |
| **P3** | **tense** | Present. No future promise, no past narration. | `grep -iwE '\b(will\|soon\|coming\|upcoming)\b'` returns 0 hits |
| **P4** | **length** | ≤ 8 words per string. One sentence or one fragment, never two. No word over three syllables. | word count per string |
| **P5** | **characters** | `^[A-Za-z0-9]+([ -][A-Za-z0-9]+)*$`. Letters, digits, single interior spaces, interior hyphens. No `!` `?` `.` `,` `:` `;` `…` `'` `"` `[` `]`, no emoji, no non-ASCII glyph. | the regex |
| **P6** | **case** | First letter capital. **No run of two or more capitals.** Labels Title Case, blurbs sentence case. | `grep -E '[A-Z]{2,}'` returns 0 hits |
| **P7** | **intensity** | No superlative, no hype intensifier, no awe adjective. Quantities use digits, not number words. | `grep -iwE '\b(best\|greatest\|finest\|ultimate\|epic\|legendary\|mythic\|insane\|crazy\|op)\b'` returns 0 hits |
| **P8** | **concreteness** | Any string over three words names a physical thing: an object, a surface, or a movement. | Reviewer test: **swap the nouns for another game's and it still reads → fails.** |
| **P9** | **fourth wall** | The game never refers to itself as a game, to the player as a player, or to updates, likes, favourites, codes, groups, the studio or the store. | `grep -iwE '\b(game\|player\|players\|update\|favorite\|favourite\|code\|codes\|join\|group)\b'` returns 0 hits |
| **P10** | **mood claim** | The game never names its own mood. | `grep -iwE '\b(relaxing\|relax\|calm\|calming\|cozy\|cosy\|chill\|peaceful\|soothing\|zen)\b'` returns 0 hits |

**Reading level: Flesch-Kincaid grade 4 as the target, grade 6 as the ceiling** — the *bottom* of the
8–14 band, not the general-public default of 8. FK is statistically meaningless on a 4-word
fragment, so **P4 is the operative rule and FK is the audit** — computed once the copy in a build
totals 100 words or more. `[playtest unknown]` — see the range at the end of `## Why`.

### What this register covers, and what it does not

**Covered:** all 43 player-facing strings the contract can hold today (`playerFacingStrings()`);
system copy; error copy; purchase and confirmation copy; SKU names and SKU descriptions; any HUD
readout label; any collection-index furniture; and any onboarding string that ever comes to exist.

**Not covered, deliberately:** Find flavour text (sheet `02`, this domain); the store listing, the
title and the tagline *[currently Discovery & Marketing, wave 5]*; `modules[].responsibility`,
`modules[].criteria`, `runtime.dataStoreName`, every `id` and slug, and `patch.material` — technical
strings and engine names a player never reads, and my domain index rules that a register reaching
them has overreached; and `artPrompt` values, which are instructions to a generator rather than copy
(they are bound by `cid/theme/lore/02-the-silences.md`, not by me).

**Exactly one named exemption.** If the hook line *"Clear the overgrowth, find what's buried"*
`[brief: soft]` `[you accepted: R6 Q1]` (`05-OUTWARD.md`) ever appears on an in-game surface, it
appears unchanged, as a quotation of the store line. It is imperative, second person and comma'd, and
it would fail P1, P2 and P5. It is the *only* string permitted to.

## Why

**The brief's tone line is three adjectives, and an adjective is exactly what four readers can act on
four ways.** *"Tone: warm, aged, unhurried. Not spooky, not grim, not a power fantasy."*
(`01-FOUNDATION.md`) and *"Tone note: warm and unhurried, not spooky. This is reclamation, not a
haunted place."* (`04-PRESENTATION.md`), both `[brief: soft]` ×2. Verification for this category
demands *"a register and a humor level, not an adjective"* (`cid/theme/_category.md`), and the humor
level was handed down bindingly, so the register is the part that has to be earned.

**Nothing here overrules a `[brief: soft]` item, so there is no `## Pushing back` section.** *"Warm,
aged, unhurried"* is kept word for word; `04-PRESENTATION.md` used it to justify `fantasy-ornate`
over `cartoon-vibrant`, and that justification is untouched. **Ornament lives in the frame, not in
the words** — a museum plaque is plain text in a carved surround, and this register is the plain text
`[cid: decided]`.

**Executing the register at the punctuation level is the only version of it that is worth anything.**
All three shipping games in this family self-describe as *relaxing* and punctuate like a hype
trailer: the reference's *"Trim the grass!"* / *"Upgrade for faster trimming!"*, `Leaves
Incremental`'s glyph-in-the-title plus *"USE CODE: RELEASE"* and *"Enjoying the game?"*, `Scrap
Incremental`'s seven glyphs and *"Leave a Like and Favorite!"*.
`[research: relayed from cid/theme/tone/_lead.md — fetched in the index run, not re-fetched here]`
The word *relaxing* is therefore free and carries no signal, while **no competitor in the family
ships a single non-exclamatory description**. P5, P6, P7, P9 and P10 are that finding turned into
five greps: they forbid, mechanically, every surface convention all three neighbours share. That is
why P10 answers my index's gap 5 with **no** — the game does not tell the player it is calm.

**P1 and P2 are where *unhurried* stops being an adjective.** A command is a hurry; the genre's
register is second-person imperative throughout. Removing the imperative removes the hurry from the
grammar rather than asserting its absence. It also lines up with a ruling already on disk: player-role
work concluded that *"nothing in the world addresses the player"* and that the role must be legible
with no words at all (`cid/theme/identity/01-player-role.md`) `[research: repo — read this run]`. A
UI string barking an order at the player is the one thing that would contradict it in text.
`[cid: decided]`

**P1 also disposes of apology copy without needing a word ban.** *"Sorry, something went wrong!"*
fails three properties at once — an exclamation (P5), an implied first person (P1), and it names no
state (P8). My index's gap 6 recorded that system and error copy has no register anywhere in the
brief; the answer is that **error copy names the state and stops**. Calibration, offered and **not
imposed**, since no contract key holds these strings and nobody owns them yet: `Progress not saved` ·
`Purchase not completed` · `Saving`. Each passes all ten.

**P4's ceiling is set at the bottom of the audience band because text here is optional by
construction.** *"8–14, mobile-heavy, short sessions"* and *"~70% mobile"* `[brief: binding]`
`[you chose: R1 Q4]` (`00-CORE.md`); *"Clear → reveal inside the first ten seconds. ... No text, no
tutorial."* `[brief: soft]` `[you accepted: R6 Q3]` (`02-GAMEPLAY.md`). Nothing this register governs
is ever a prerequisite for understanding the game, so no copy has to reach a 14-year-old's ceiling,
while any copy an 8-year-old cannot glance past is wasted. Serving the bottom costs the top nothing.
The sourced brackets — ages 8–11 at FK 3–6, ages 11–14 at FK 6–9, general public around 8 — are
relayed, not re-fetched. `[research: relayed from cid/theme/tone/_lead.md]`

**P6 is the one property where the verifiable evidence runs against me, and I am deciding on
losslessness rather than on legibility.** The one page I fetched this run reports that for
glanceable reading of short isolated words, *"Lowercase lettering required 26% more time for accurate
reading than uppercase"*, with the caveat that character size dominates case and that all-caps is
still not recommended for longer text.
`[research: https://www.nngroup.com/articles/glanceable-fonts/]` A HUD label is exactly that
glanceable isolated case, so a legibility argument would favour `EAST TERRACE`. **The argument that
decides it is that uppercase is lossy and Title Case is not:** `EAST TERRACE` cannot be converted
back to `East Terrace` without knowing which words are proper nouns, while uppercasing at render time
is free. Storing Title Case keeps both renderings available and keeps the manifest diffable; storing
uppercase throws information away and hard-codes one surface's typography into a value four surfaces
read. The tonal reason is real but secondary: a stored all-caps string is the genre's shouting
convention sitting in the data. `[cid: decided]`

**The register is currently inconsistent in the manifest, which is the proof this sheet was needed.**
Six string fields hold two conventions: `area.label` is `EAST TERRACE` and `upgrades[].label` are
`VALUE` / `REACH` / `PACE`, while `currency.name` is `Shard`, `collection.className` is `Find`,
`tiers[].name` are `Moss` / `Fern` / `Bramble` / `Heartvine` and `sets[].label` are `Terrace` /
`Cistern` / `Vault` / `Spire`. Nobody chose that split; two builders defaulted differently because no
sheet had ruled. `[research: repo — cid/gameplay/**, read this run]`

**Fourth-wall stance (P9): none, in either direction.** The game does not know it is a game. This is
where the genre's engagement furniture dies — *"Enjoying the game?"*, *"Leave a Like and
Favorite!"*, *"USE CODE: RELEASE"*, *"Join the ... group for in-game boosts!"* — and P2's ban on
questions plus P5's ban on `?` kills the interrogative form of all four before the word list is even
consulted. It also settles the register question my index flagged from the reference's `[OP] Giant
Trimmer` gamepass: **bracket slang on a premium SKU is forbidden by P5's character class**, so the
whale item cannot be marked with genre slang. `[cid: decided]`

**Reverence toward the ruin's age: descriptive, never reverent (P7, P8).** The register never asserts
the place is important. Age reaches the player through art and through the plainness of the objects,
which is consistent with history work's ruling that damage may be *present* but never *attributed*
(`cid/theme/lore/02-the-silences.md`) and with the collection's own rationale, *"objects a mason or a
clerk would leave behind, not treasure"* (`cid/gameplay/meta/02-the-collection.md`). An awe adjective
would be the register claiming what `05-OUTWARD.md` already declined at the store level: *"Uncover a
lost civilisation"* was refused. `[brief: soft]` `[you accepted: R6 Q1]`

**Zero tension survives this register by construction, not by instruction.** *"Zero tension is
deliberate"* and *"nobody downstream should invent tension to fill the gap"* (`02-GAMEPLAY.md`,
elevated in `HANDOFF.md`) `[brief: binding]` on the instruction. Urgency is grammatical before it is
lexical: it needs an imperative (P2), a future threat (P3) or an exclamation (P5), and all three are
gone. I deliberately state **no word list** for urgency — word lists are the exclusion sheet's and
Vocabulary's, and duplicating them here is the failure mode my domain index warns sheet `04` about.

**The binding humor decision is respected without being restated.** *"Dry and sparse. Humor lives
only in relic flavour text. No system copy, UI, error message, tutorial text, or store copy is
funny."* `[brief: binding]` — developer, in session 2026-07-30, in no sheet. This register makes the
non-flavour half mechanically hard to break: a joke needs two clauses (P4 forbids a second sentence),
an aside needs a comma or a dash (P5 forbids both), and a wink needs an exclamation or an ellipsis
(P5 forbids both). **How dryness is written where it is permitted is sheet `02`'s, not mine.**

**`[playtest unknown]` — how this reads to 8–14 year olds.** Starting values: P4 at 8 words, FK
target 4. Test range: **6 to 12 words**. Drop toward 6 if first-session players skip copy entirely;
raise toward 12 if 13–14s read the register as terse or babyish. What would settle it: a read-back
comprehension check with players in the band, and as a cheap proxy available first, FK computed on
the shipped copy. Nothing fetchable settles reception.

### Routed to naming work, because this is the one path by which a register becomes enforceable

Not a `manifest` block — `vocabulary` is owned by `cid/theme/vocabulary/02-banned-words.md` and one
key belongs to one sheet. Below is the exact amendment requested of that sheet's owner. `bridge`
parses only ` ```manifest ` fences, so this fence claims nothing.
`[research: repo — bridge/merge.mjs:28, read this run]`

```json
{
  "amends": "vocabulary",
  "requested_by": "cid/theme/tone/01-register.md",
  "register": "Plain concrete nouns, one word where possible; no ornament, no invented compounds, no incremental-genre vocabulary. Copy: third person or none, indicative present, 8 words maximum per string, sentence or Title Case with no ALL-CAPS run, characters limited to letters digits single spaces and interior hyphens, and no word naming the game's own mood.",
  "maxLabelChars": 14,
  "bannedWords_additions": [
    { "word": "relaxing",  "reason": "the game may not name its own mood; all three games in this family claim relaxing and punctuate against it, so the claim carries no signal" },
    { "word": "relax",     "reason": "same, verb form; the ban check is word-boundary exact" },
    { "word": "calm",      "reason": "same class of mood claim" },
    { "word": "cozy",      "reason": "same class of mood claim, and the genre's second-most-used one" },
    { "word": "chill",     "reason": "same, and it is register-wrong for aged stone" },
    { "word": "peaceful",  "reason": "same class of mood claim" },
    { "word": "soothing",  "reason": "same class of mood claim" },
    { "word": "epic",      "reason": "hype intensifier; the register carries no superlative" },
    { "word": "legendary", "reason": "awe adjective; the register describes rather than reveres, and no tier or set needs it" },
    { "word": "mythic",    "reason": "same, and it imports a fiction the canon does not contain" },
    { "word": "ultimate",  "reason": "superlative, and it implies a top of a ladder the design does not have" },
    { "word": "insane",    "reason": "the genre's multiplier-SKU adjective; forbidden by the register's intensity rule" },
    { "word": "crazy",     "reason": "same" },
    { "word": "op",        "reason": "the reference marks its 2500-Robux item [OP]; slang on a premium SKU is register-wrong and P5 already forbids the brackets" },
    { "word": "favorite",  "reason": "fourth-wall engagement prompt; the game does not know it is a game" },
    { "word": "favourite", "reason": "same, other spelling" },
    { "word": "game",      "reason": "fourth wall; no player-facing string refers to the game as a game" },
    { "word": "player",    "reason": "fourth wall; the game addresses nobody and names no audience. The single entry most likely to need release if a later sheet finds a legitimate need" }
  ]
}
```

**Also requested of naming work, in prose because no field holds it:** two runnable lints that do not
exist yet — P5's character class and P6's `[A-Z]{2,}` test, applied inside `crossCuttingProblems()` to
the same string list the ban check already walks. That function was written precisely so *"a banned
word is the part of a naming rule that a machine can hold"*; a character class and a capital-run test
are two more such parts. `[research: repo — bridge/schema.mjs:421-450, read this run]`

## Consequences for other work

- **Upgrade-ladder work** *[currently Balance & Tuning, wave 4 — `cid/gameplay/balance/01-upgrade-ladder.md`]*:
  five of its six strings change. `VALUE` / `REACH` / `PACE` → Title Case (P6). Two blurbs fail P1
  and P2 — *"Clear a wider sweep as you walk"* (imperative plus `you`) and *"Move faster between
  patches"* (imperative). *"Each patch pays more"* already passes all ten and is the calibration
  case. Offered, **not imposed**, only to prove the rule is satisfiable: `A wider sweep with every
  step` and `Faster steps between patches` pass. The wording is that sheet's.
- **Area-content work** *[currently Meta & Content, wave 3 — `cid/gameplay/meta/01-the-area.md`]*:
  `area.label` `EAST TERRACE` → `East Terrace`, which is 12 characters and still inside
  `maxLabelChars` 14. No other value in that sheet is touched.
- **Naming work** *[Vocabulary Lead, this wave, owner of the `vocabulary` key]*: the JSON above is a
  request, not a claim. Its existing `register` string is a *naming* rule and is kept; the amendment
  adds the *copy* rule beside it. Its `maxLabelChars` of 14 and my P4 never conflict — no 8-word
  ceiling ever binds a 14-character label. Note also that this sheet coins **zero** new player-facing
  terms, so it adds nothing to the canonical list.
- **Screen-copy budgeting** *[currently UI/UX — Screens, wave 4]*: inherits P1–P10 as the bound on
  every new on-screen string, and inherits the legibility finding with it. **Rendered case is
  typography and is yours; stored case is not.** If a HUD label should read as uppercase, apply the
  transform to a whole class of label at render time — the fetched study says uppercase wins for
  glanceable isolated words but that size matters more than case
  `[research: https://www.nngroup.com/articles/glanceable-fonts/]`. Baking the transform into one
  string is what P6 forbids.
- **System-and-error copy** *[currently UI/UX, wave 4, and Tech & Data, wave 4, jointly — nobody owns
  it today]*: this register is its voice, and it is the half of my bound the manifest cannot check,
  because no contract key holds a system or error string. A human reviewer running the five greps is
  the only gate. Requested explicitly rather than assumed.
- **Price-and-SKU work** *[currently Monetization, wave 3]*: SKU names and descriptions are inside
  this register. No bracket prefix, no `[OP]`, no exclamation, no superlative, 8 words. The
  reference's whale-item convention is unavailable, and the brief already forbids the content access
  that convention usually decorates.
- **Store-listing copy, the title and the tagline** *[currently Discovery & Marketing, wave 5]*:
  **not bound by this sheet.** The listing competes in a store where all three neighbours shout, and
  that is a discoverability decision, not a tone one. Two things follow anyway: the in-game voice may
  not claim a mood even if the listing does (P10 stops at the client boundary), and the hook line is
  the single exemption if it ever appears in game.
- **Flavour-and-humor work** *[sheet `02`, this domain]*: flavour text is outside P1–P10 and sets its
  own length and mood rules. But **today the manifest holds no flavour field**, so every one of the 43
  strings a check can reach is non-flavour and the greps run cleanly over all of them. If flavour text
  later needs a character outside P5's class — a comma, a period, an ellipsis — sheet `02` must name
  that character, because the merge cannot tell a flavour string from a label.
- **Beat-map work** *[sheet `03`, this domain]*: **copy may not be a peak.** No capital run, no
  exclamation and no intensifier means a reveal cannot be made louder in text, so every beat in that
  sheet's ordering has to be carried by sound or image. That agrees with *"audio and visual feedback
  carry the entire load"* (`02-GAMEPLAY.md`) rather than competing with it.
- **Do-nots work** *[sheet `04`, this domain]*: the fourth-wall stance (P9) and the mood-claim ban
  (P10) are **decided here**, and must be cited rather than restated. So must P7's intensity rule; an
  exclusion list that re-derives it is the duplicate its own criteria forbid.
- **Onboarding choreography** *[currently Onboarding, wave 2, and UI/UX, wave 4]*: the default is zero
  strings, because *"No text, no tutorial"*. If any first-session string appears, this register binds
  it, and it cannot be an instruction — which means the first ten seconds stay wordless whether or not
  a text surface ever exists.
- **Silences work** *[`cid/theme/lore/02-the-silences.md`, this domain's neighbour]*: its string count
  of 37 and mine of 43 disagree. `playerFacingStrings()` extracts 43 today — its own list omits
  `collection.className` and `collection.classPlural` and its arithmetic differs. Noted, not
  corrected; the function is the source of truth for any check either sheet claims.
- **Contract and seam work** *[whoever owns `bridge/schema.mjs`]*: the two lints named above.

## Acceptance criteria

Counts are over the string values returned by `playerFacingStrings()` on the merged manifest — **43
strings today**: `area.label`, `currency.name`, `currency.plural`, `collection.className`,
`collection.classPlural`, 4 `tiers[].name`, 3 `upgrades[].label`, 3 `upgrades[].blurb`, 4
`sets[].label`, 24 `sets[].relics`.

1. **Character-class check (P5).** Every one of the 43 matches `^[A-Za-z0-9]+([ -][A-Za-z0-9]+)*$`.
   **43 of 43 pass as written.**
2. **Case check (P6).** No string contains a run of two or more consecutive capitals (`[A-Z]{2,}`).
   **4 of 43 fail as written:** `area.label` = `EAST TERRACE`, and `upgrades[].label` = `VALUE`,
   `REACH`, `PACE`. Zero after those two sheets revise.
3. **Person-and-mood check (P1, P2).** No string matches
   `\b(i|me|my|mine|we|us|our|ours|you|your|yours)\b` case-insensitively, and no string reads as an
   instruction to the player. **2 of 43 fail as written**, both `upgrades[].blurb`: *"Clear a wider
   sweep as you walk"* and *"Move faster between patches"*. Zero after that sheet revises.
4. **Length check (P4).** No string exceeds 8 words, none contains two sentences, and no word in one
   exceeds three syllables. **43 of 43 pass as written**; the longest is 7 words.

**So this register fails 6 of the 43 strings now on disk and passes 37**, and every failure names its
sheet and its fix. A register that failed none would not have been a decision.

## Not decided here

Rendered typography, font size and whether a label class is displayed uppercase (UI/UX — Screens).
The actual system, error and confirmation strings (nobody owns them; UI/UX and Tech & Data jointly,
wave 4). Flavour text's own length, mood and punctuation (sheet `02`, this domain). Where the game is
allowed to peak and which beat is loudest (sheet `03`). The tonal exclusion list as an audit
instrument (sheet `04`). Which words are banned and what the canonical list holds — the JSON above is
a request to the owner of the `vocabulary` key, not a decision (Vocabulary Lead). The store listing,
the title and the tagline (Discovery & Marketing, wave 5). Whether the register reads correctly to the
band (playtest). The words other domains choose *inside* these bounds: naming a currency, a tier, an
area or a Find remains entirely theirs.

## Flagged to the developer

Four rulings here answer questions the brief never asks, and my domain index routed all four to this
sheet as gaps. Each is cheap to reverse and each has a live alternative.

| ruling | live alternative | my recommendation |
|---|---|---|
| **No exclamation marks, no questions, no emoji, anywhere in game** (P5) | Match the family: all three neighbours are exclamatory and glyph-dense, and it demonstrably sells — the reference has 38.3M visits at 96.2% likes | **Keep the ban.** It is the only place *"warm, aged, unhurried"* becomes a fact rather than a claim, and it costs nothing: the strings on disk already contain no punctuation at all. Note this bans it **in game only** — the listing is wave 5's call |
| **Title Case in stored strings; no ALL-CAPS** (P6) | Keep `EAST TERRACE` and `VALUE` / `REACH` / `PACE`; the fetched legibility study favours uppercase for glanceable labels | **Keep Title Case in the data and let UI uppercase at render.** Uppercase in a stored value is lossy and throws away the other rendering; this way you keep both. Cost of reversing: four strings |
| **The game never says it is relaxing** (P10) | Say it, as all three neighbours do | **Keep.** Every competitor already claims the word, so it differentiates nothing, and the brief's own hook line claims no mood |
| **Third person, no imperative, ever** (P1, P2) | Second-person imperative, the genre standard and what two blurbs on disk already use | **Keep**, and this is the one I would most like a ruling on, because it is the property that reaches the most future copy. It is also the one that would be expensive to reverse later: every string written under it would need rewriting, while reversing it today costs two blurbs |

**Reading level (FK 4 target, 8-word ceiling) is the fifth, and it is the one I would not reverse on
taste** — it is `[playtest unknown]` with a stated 6-to-12 range, so it should be moved on evidence
rather than preference.

Sources fetched this run: [NN/g — Typography for Glanceable Reading](https://www.nngroup.com/articles/glanceable-fonts/).
