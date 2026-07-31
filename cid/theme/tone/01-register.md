# 01 — Register

**Domain:** theme/tone · **Category:** Theme & Narrative · **Wave:** 1

## Decision

Every player-facing string that is not a Find's flavour line is written to **P1–P9 below**:
no first or second person, declarative only, at most 12 words a sentence and 2 sentences a
string, ASCII letters plus five punctuation marks, Flesch-Kincaid grade 5 (hard ceiling 6),
no reference to the game as a game, no word naming a mood, and no veneration of the ruin's
age. *"Warm, aged, unhurried"* is **not overruled**: it survives as the label and P1–P9 are
its operative form, so `04-PRESENTATION.md`'s `fantasy-ornate` cascade is untouched.

## Why

The register has to be executed at the punctuation level or it is not a register. All three
games in this family open with the word *relaxing* and then punctuate like a trailer:
*"Trim the grass!"*, *"Gather fallen leaves!"*, *"Enjoying the game?"*, glyphs in the title
`[research: https://www.roblox.com/games/133086043677134/Grass-Incremental-Simulator]`
`[research: https://www.roblox.com/games/113380129609386/Leaves-Incremental]`
`[research: https://www.roblox.com/games/92876036717311/Scrap-Incremental]`. Claiming the
adjective is the genre norm; declining to claim it, and writing flat, is the departure. That
is the whole content of `[brief: soft]` *"Tone: warm, aged, unhurried"* (`01-FOUNDATION.md`)
once it is made checkable.

**Reading level serves the bottom of the band, not the middle.** Ages 8–11 map to grade 3–6
and 11–14 to grade 6–9, and the general-public default of 8 sits at the *top* of the band
`[research: https://readable.com/readability/flesch-reading-ease-flesch-kincaid-grade-level/]`.
The band is binding `[brief: binding]` ← `[you chose: R1 Q4]` (`00-CORE.md`). A 13-year-old
loses nothing reading grade-5 copy; an 8-year-old who cannot parse grade-8 copy loses the
string entirely, and 35% of age-checked daily users are under 13
`[research: https://about.roblox.com/newsroom/2026/02/moving-beyond-self-reported-age]`.
Target 5.0, ceiling 6.0 `[playtest unknown]`, test range 4 to 8.

**P9 is decided against the one piece of evidence that contradicts it.** For glanceable
isolated words, *"Lowercase lettering required 26% more time for accurate reading than
uppercase"*, though character size dominates case
`[research: https://www.nngroup.com/articles/glanceable-fonts/]`. P9 still forbids stored
all-caps, because `theme/vocabulary/01-naming-form` (pack §4) already fixed Title Case,
uppercase is lossy, and rendered case is typography that UI/UX can apply to a whole class of
label at draw time. `[cid: decided]`

### P1–P9, the register

| id | property | rule | check |
|---|---|---|---|
| P1 | person | No first or second person. Copy names the thing, never the reader. Banned whole words, case-insensitive: `you your yours yourself we us our ours let's I my me mine` | regex over every player-facing string |
| P2 | mood | Declarative sentences only. No imperative, no question, no exclamation. **One exemption:** a control affordance may be a bare verb if it is exactly one word and names the action the control performs (`Close`, `Buy`, `Back`) | a string of 2+ words beginning with a bare verb fails |
| P3 | length | 12 words a sentence, 2 sentences a string, 1 sentence for anything that is not `.blurb` or `.flavour`. Where `theme/vocabulary` sets a tighter per-field ceiling, the tighter one governs | word count |
| P4 | characters | `/^[A-Za-z0-9 ,.'%-]+$/`, which is the alphabet, the digits, space, and the five marks `,` `.` `'` `%` `-`. Banned by name: `!` `?` `:` `;` `"` `*` `~` `#` `@` `+` `=` `/` `\` `|` `(` `)` `[` `]` `{` `}` `…` `—` `–` `’` `“` `”` and **every codepoint above U+007E**, which covers emoji, the genre's title glyphs and curly quotes | regex; also protects the emitted Luau string literals |
| P5 | reading level | Flesch-Kincaid grade 5.0 target, 6.0 hard ceiling, computed over all `.blurb` and `.flavour` strings concatenated, with proper nouns (Find names, tier names, set labels, currency name, area label) excluded from the syllable count | scored corpus |
| P6 | fourth wall | The copy never names the game, the platform, the interface or the input. Banned whole words: `game gamepass Robux server lobby menu screen button icon update version beta dev developer studio account user player session click tap press swipe hold drag` | word list. Roblox's own purchase and error chrome is platform text, not ours, and is out of scope |
| P7 | mood claim | **The fiction may not state its own mood, and may not praise the player.** Banned whole words (list M): `relaxing calm peaceful cozy chill soothing zen satisfying fun exciting epic legendary ultimate amazing awesome incredible insane crazy best congratulations congrats welcome nice great wow yay hooray`, plus the phrases `well done` `good job` | word list |
| P8 | veneration | Age is stated as fact, never as awe. Banned whole words (list R): `sacred holy hallowed blessed cursed haunted doomed forbidden lost forgotten vanished mysterious mystery secret legend myth spirit soul ghost tomb eternal immortal`. `old` and `ancient` are permitted, at most one age adjective a string. `lost` and `forgotten` also contradict canon: the place *"was never lost, only overgrown"* (`cid/theme/lore/01-the-past.md`, pack §4) | word list |
| P9 | emphasis | No stored all-caps word of 2+ letters, no repeated punctuation (`..`, `!!`), no markup characters inside a string. Rendered case is UI/UX's and may differ | regex |

### Where the bound lands, path by path

`bridge/schema.mjs` now exposes **eleven** player-facing path classes through
`playerFacingStrings()`, not the six my index listed; `collection.sets[].label` and the
`{name, flavour}` Find shape were added after it was written `[research: bridge/schema.mjs]`.

| contract path | class | bound by | key owner |
|---|---|---|---|
| `area.label` | label | P1 P2 P4 P6 P7 P8 P9 | `gameplay/meta` |
| `currency.name`, `currency.plural` | label | P1 P2 P4 P6 P7 P8 P9 | `gameplay/systems` |
| `collection.className`, `collection.classPlural` | label | P1 P2 P4 P6 P7 P8 P9 | `gameplay/meta` |
| `tiers[].name` | label | P1 P2 P4 P6 P7 P8 P9 | `gameplay/systems` |
| `collection.sets[].label` | label | P1 P2 P4 P6 P7 P8 P9 | `gameplay/meta` |
| `collection.sets[].relics[].name` | label | P1 P2 P4 P6 P7 P8 P9 + the pun ban (sheet `02`) | `gameplay/meta` |
| `upgrades[].label` | label | P1 P2 P4 P6 P7 P8 P9 | `gameplay/balance` |
| `upgrades[].blurb` | prose | P1–P9 entire. The only free-prose field in the contract | `gameplay/balance` |
| `collection.sets[].relics[].flavour` | prose | P1 P3 P4 P5 P9, then sheet `02` governs voice and humor | `gameplay/meta` |
| `modules[].responsibility`, `modules[].criteria`, `runtime.dataStoreName` | technical | **not bound.** A player never reads them | `tech/architecture` |
| screen headings, button faces, empty-state lines, error and system messages | prose/label | P1–P9 entire, **and no contract path carries them**, so the bridge cannot check them and a human reviewer is the only gate | unowned; see below |

## Consequences for other work

- **Existing all-caps values fail P9 and must be re-cased.** `cid:verify` already warns that
  player-facing labels use two casing conventions and asks Tone to rule; the ruling is Title
  Case `[research: bridge/schema.mjs]`. Concretely this lands on the **upgrade ladder's three
  labels** (`gameplay/balance`) and the **area label** (`gameplay/meta`). Stored case changes;
  rendered case is UI/UX's and may still be uppercase.
- **Banned-word maintenance** (`theme/vocabulary`, holds `vocabulary.bannedWords`): lists M
  (P7) and R (P8) are requested as additions, with reasons. Until they are in the key, P7 and
  P8 are prose a reviewer enforces rather than a merge failure, and that is the difference
  between a rule and a wish `[research: bridge/schema.mjs]`.
- **Upgrade copy** (`gameplay/balance`, owns `upgrades[].blurb`): a blurb containing *you* or
  *your* fails P1. The blurb is the only place in the contract where P3's two-sentence
  allowance is ever reachable.
- **Currency naming** (`gameplay/systems`): P4 forbids any glyph in `currency.name`, which is
  the genre's default (a leaf, a magnet, a sprout in the title). The 10-character `plural`
  ceiling is the schema's, not mine.
- **Screen-copy budgeting** (UI/UX, wave 4): every new on-screen string inherits P1–P9. Number
  formatting, separators and a colon between a label and a value are furniture composed at
  render time, not copy, and are outside P4.
- **Error and system copy** (unowned; nearest holder is UI/UX): it has a register now and still
  has no contract path. Somebody must own the surface or P1–P9 reaches it only as prose.
- **Store listing** (Discovery & Marketing, wave 5): **not bound by this sheet.** The listing
  competes in a market where every neighbour shouts. Sheet `02`'s humor ban does reach it,
  because the binding decision names *store copy* by name; the register does not.

## Flagged to the developer

P7 forbids the game from calling itself relaxing, which is the one word all three competitors
lead with. Live alternatives: (a) as decided, the word never appears in the experience and the
listing is free to use it; (b) permit it in the listing only, which is already the effect of
the scope line above; (c) permit it in-experience, which makes the register indistinguishable
from the genre's. Recommendation: (a). `[cid: decided]`, the brief is silent.

## Acceptance criteria

1. Every string returned by `playerFacingStrings(manifest)` matches `/^[A-Za-z0-9 ,.'%-]+$/`,
   contains no codepoint above U+007E, and contains no all-caps word of 2 or more letters.
2. Zero player-facing strings contain, as whole words case-insensitively, any word from P1's
   person list, P6's meta list, P7's list M or P8's list R.
3. No sentence in any player-facing string exceeds 12 words; no string outside `.blurb` and
   `.flavour` contains more than one sentence; no string contains more than two.
4. Flesch-Kincaid grade over the concatenated `.blurb` and `.flavour` corpus, proper nouns
   excluded from the syllable count, is at most 6.0.

## Not decided here

Which words are banned as a machine-checkable list, the character ceiling `maxLabelChars`, the
casing regex and the plural rule (`theme/vocabulary`, sheets `01` and `02`, which hold the
`vocabulary` key). The voice of a Find's flavour line and every question about humor (sheet
`02`, this domain). When the game is permitted to be loud (sheet `03`). Rendered case,
typography and number formatting (UI/UX). The store listing's register (Discovery & Marketing).
Whether an error-copy surface exists at all (UI/UX, wave 4).
