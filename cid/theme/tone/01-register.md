# 01 — Register

**Domain:** theme/tone · **Category:** Theme & Narrative · **Wave:** 1

## Decision

Every player-facing string that is not a Find's flavour line is written to **P1–P9 below**:
no first or second person, declarative only, at most 12 words a sentence and 2 sentences a
string, ASCII letters plus six punctuation marks, Flesch-Kincaid grade 5 (hard ceiling 6),
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

**P4 was widened by its key owner and the widening is accepted.** P4 originally banned `/`.
`theme/vocabulary/02` added it on 2026-08-01 because excluding it made the collection readout
`0 / 24` illegal, and wrote `%` as `%%` so the pattern means the same thing to Lua's
`string.match` as to JavaScript's `RegExp`. P4's purpose is that a string be *typeable in the
game's character set*, not that marks be scarce, and a solidus is typeable on every keyboard
this audience owns. The row below is restated to the enforced pattern so this domain and the
key it feeds do not disagree `[research: bridge/schema.mjs]`.

### P1–P9, the register

| id | property | rule | check |
|---|---|---|---|
| P1 | person | **No first person, and no role address.** Copy names the thing, never a station it assigns the reader. Banned whole words, case-insensitive: `we us our ours let's I my me mine`. **Second person is permitted** — narrowed wave 7; `theme/identity/02` sets `secondPersonPermitted` true and rules the shipped `"Clear a wider sweep as you walk"` passes, and the two sheets were handing `gameplay/balance` opposite instructions about one string it had already shipped. Tone owns register; Identity owns whether the player is given a station; `you` is a pronoun, not a station. | regex over every player-facing string |
| P2 | mood | Declarative sentences only. No imperative, no question, no exclamation. **One exemption:** a control affordance may be a bare verb if it is exactly one word and names the action the control performs (`Close`, `Buy`, `Back`) | a string of 2+ words beginning with a bare verb fails |
| P3 | length | 12 words a sentence, 2 sentences a string, 1 sentence for anything that is not `.blurb` or `.flavour`. Where `theme/vocabulary` sets a tighter per-field ceiling, the tighter one governs | `vocabulary.maxSentenceWords`, merged at 12 |
| P4 | characters | The enforced set is `vocabulary.allowedPattern`, today `^[A-Za-z0-9 ,.'%%/-]+$`: the alphabet, the digits, space, and the six marks `,` `.` `'` `%` `-` `/`. Banned by name: `!` `?` `:` `;` `"` `*` `~` `#` `@` `+` `=` `\` `\|` `(` `)` `[` `]` `{` `}` `…` `—` `–` `’` `“` `”` and **every codepoint above U+007E**, which covers emoji, the genre's title glyphs and curly quotes | the merger runs the pattern over every player-facing string, prose included |
| P5 | reading level | Flesch-Kincaid grade 5.0 target, 6.0 hard ceiling, computed over all `.blurb` and `.flavour` strings concatenated, with proper nouns (Find names, tier names, set labels, currency name, area label) excluded from the syllable count | scored corpus; **no merged field carries it yet**, requested below |
| P6 | fourth wall | The copy never names the game, the platform, the interface or the input. Banned whole words: `game gamepass Robux server lobby menu screen button icon update version beta dev developer studio account user player session click tap press swipe hold drag` | word list. Roblox's own purchase and error chrome is platform text, not ours, and is out of scope |
| P7 | mood claim | **The fiction may not state its own mood, and may not praise the player.** Banned whole words (list M): `relaxing calm peaceful cozy chill soothing zen satisfying fun exciting epic legendary ultimate amazing awesome incredible insane crazy best congratulations congrats welcome nice great wow yay hooray`, plus the phrases `well done` `good job` | word list |
| P8 | veneration | Age is stated as fact, never as awe. Banned whole words (list R): `sacred holy hallowed blessed cursed haunted doomed forbidden lost forgotten vanished mysterious mystery secret legend myth spirit soul ghost tomb eternal immortal`. `old` and `ancient` are permitted, at most one age adjective a string. `lost` and `forgotten` also contradict canon: the place *"was never lost, only overgrown"* (`cid/theme/lore/01-the-past.md`, pack §4) | word list |
| P9 | emphasis | No stored all-caps word of 2+ letters, no repeated punctuation (`..`, `!!`), no markup characters inside a string. Rendered case is UI/UX's and may differ | `vocabulary.casing`, merged at `title` |

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
| `upgrades[].blurb` | prose | P1–P9 entire. The only populated free-prose field in the contract | `gameplay/balance` |
| `collection.sets[].relics[].flavour` | prose | P1 P3 P4 P5 P9, then sheet `02` governs voice and humor | `gameplay/meta` |
| `modules[].responsibility`, `modules[].criteria`, `runtime.dataStoreName` | technical | **not bound.** A player never reads them | `tech/architecture` |
| screen headings, button faces, empty-state lines, error and system messages | prose/label | P1–P9 entire, **and no contract path carries them**, so the bridge cannot check them and a human reviewer is the only gate | unowned; see below |

## Data form

**Three of P1–P9 already reached the build and five did not.** `vocabulary.casing` (`title`),
`vocabulary.maxSentenceWords` (`12`) and `vocabulary.allowedPattern` are merged and the merger
runs them over every player-facing string, so P3, P4 and P9 are enforced rather than read
`[research: bridge/schema.mjs]`. **P1, P6, P7 and P8 are word lists and `vocabulary.bannedWords`
holds eight entries, none of them from those lists** — so four of my nine rules are still prose
a reviewer must remember. The block below is the request that closes that gap. It amends a key
this domain does not own, so it is a request against `theme/vocabulary`, not a merge.

```manifest
{
  "amends": "vocabulary",
  "from": "theme/tone/01-register.md",
  "alreadyMerged": {
    "casing": "title",
    "maxSentenceWords": 12,
    "allowedPattern": "^[A-Za-z0-9 ,.'%%/-]+$",
    "note": "these three are P9, P3 and P4 and are not re-asked for here; listed so the origin of the values is recorded on the sheet that decided them"
  },
  "requestedFields": {
    "maxFleschKincaidGrade": 6.0,
    "targetFleschKincaidGrade": 5.0,
    "gradeScoredOver": "every .blurb and .flavour string concatenated, with proper nouns excluded from the syllable count",
    "maxSentencesPerString": 2,
    "maxSentencesOutsideProsePaths": 1
  },
  "mergeNote": "requestedBannedWords is grouped by rule so one reason is not repeated 81 times. Flatten each group to {word, reason} pairs, using the group's reason, before merging into vocabulary.bannedWords. Phrases containing a space work under the existing word-boundary test.",
  "requestedBannedWords": [
    {
      "rule": "P1",
      "reason": "P1: copy names the thing, never the reader. First and second person address the player and break the register",
      "words": ["you", "your", "yours", "yourself", "we", "us", "our", "ours", "let's", "my", "me"]
    },
    {
      "rule": "P6",
      "reason": "P6: the copy never names the game, the platform, the interface or the input",
      "words": ["game", "gamepass", "Robux", "server", "menu", "button", "icon", "update", "version", "beta", "dev", "developer", "studio", "account", "user", "player", "session", "click", "swipe"]
    },
    {
      "rule": "P7",
      "reason": "P7 list M: the fiction may not state its own mood and may not praise the player",
      "words": ["relaxing", "calm", "peaceful", "cozy", "chill", "soothing", "zen", "satisfying", "fun", "exciting", "epic", "legendary", "ultimate", "amazing", "awesome", "incredible", "insane", "crazy", "best", "congratulations", "congrats", "welcome", "nice", "great", "wow", "yay", "hooray", "well done", "good job"]
    },
    {
      "rule": "P8",
      "reason": "P8 list R: age is stated as fact, never as awe; and the place was never lost, only overgrown",
      "words": ["sacred", "holy", "hallowed", "blessed", "cursed", "haunted", "doomed", "forbidden", "lost", "forgotten", "vanished", "mysterious", "mystery", "secret", "legend", "myth", "spirit", "soul", "ghost", "tomb", "eternal", "immortal"]
    }
  ],
  "heldBack": [
    { "word": "I", "rule": "P1", "reason": "one letter, and the ban test is case-insensitive, so it would fire on any stray initial. Reviewer-enforced" },
    { "word": "mine", "rule": "P1", "reason": "also a physical place a later area or Find could legitimately name" },
    { "words": ["screen", "press", "hold", "drag", "tap", "lobby"], "rule": "P6", "reason": "each is also a physical object or a physical verb this fiction may need: a fire screen, an olive press, a bowl that holds water, a cistern tap, a lobby of a ruined house. Banned as interface words, reviewer-enforced, deliberately not machine-banned" }
  ],
  "breaksOnMerge": [],
  "breaksOnMergeWithdrawn": [
    {
      "path": "upgrades[1].blurb",
      "value": "Clear a wider sweep as you walk",
      "hadViolated": "P1, the word you",
      "withdrawnBecause": "P1 is narrowed: second person is PERMITTED. theme/identity/02 sets secondPersonPermitted true and rules this exact shipped string passes, and the two sheets were giving gameplay/balance — which owns upgrades[].blurb — opposite instructions about one string it has already shipped.",
      "ruling": "orchestrator, wave 7. The overlap was accidental: Tone owns REGISTER, how a string sounds; Identity owns whether the player is assigned a STATION. \"You\" is a pronoun, not a station, so P1 as written was broader than the thing it protects. First person stays banned — that is a register fact about a game with no narrator — and so does role address, which is Identity's rule and its actual concern (its alsoForbidden names role nouns, and its enforcementRoute is about our/us catching legitimate copy).",
      "consequence": "gameplay/balance changes nothing. The shipped string stands, and this was the only string in the merged manifest any requested word hit, so the whole 81-word request list is inert today."
    }
  ]
}
```

## Consequences for other work

- **Upgrade copy** (`gameplay/balance`, owns `upgrades[].blurb`) **changes nothing.** An earlier
  version of this bullet required `"Clear a wider sweep as you walk"` to become `"Clear a wider
  sweep while walking"`. That request is withdrawn: P1 is narrowed and second person is
  permitted, so the shipped string passes. `theme/identity/02` had already ruled it passes, and
  the two sheets were handing one owner opposite instructions about one string it had shipped.
  With that row gone, no string in the merged manifest is hit by any requested word, and the
  whole 81-word request list is inert today.
- **Banned-word maintenance** (`theme/vocabulary/02`, holds the `vocabulary` key): four grouped
  requests and a `heldBack` list are above. The held-back words are a decision, not an
  oversight — machine-banning `hold` would fail a flavour line about a bowl.
- **Existing all-caps values fail P9 and must be re-cased.** The ruling is Title Case and the
  merger now enforces it. This lands on the upgrade ladder's labels (`gameplay/balance`) and
  the area label (`gameplay/meta`). Stored case changes; rendered case is UI/UX's.
- **Currency naming** (`gameplay/systems`): P4 forbids any glyph in `currency.name`, which is
  the genre's default (a leaf, a magnet, a sprout in the title). The 10-character `plural`
  ceiling is the schema's, not mine.
- **Screen-copy budgeting** (UI/UX): every new on-screen string inherits P1–P9. Number
  formatting, separators and a colon between a label and a value are furniture composed at
  render time, not copy, and are outside P4.
- **Error and system copy** (unowned; nearest holder is UI/UX): it has a register now and still
  has no contract path. Somebody must own the surface or P1–P9 reaches it only as prose.
- **Store listing** (Discovery & Marketing): **not bound by this sheet.** Sheet `02`'s humor ban
  does reach it, because the binding decision names *store copy* by name; the register does not.

## Flagged to the developer

P7 forbids the game from calling itself relaxing, which is the one word all three competitors
lead with. Live alternatives: (a) as decided, the word never appears in the experience and the
listing is free to use it; (b) permit it in the listing only, which is already the effect of
the scope line above; (c) permit it in-experience, which makes the register indistinguishable
from the genre's. Recommendation: (a). `[cid: decided]`, the brief is silent.

## Acceptance criteria

1. Every string returned by `playerFacingStrings(manifest)` matches `vocabulary.allowedPattern`,
   contains no codepoint above U+007E, and contains no all-caps word of 2 or more letters.
2. Zero player-facing strings contain, as whole words case-insensitively, any word in the four
   `requestedBannedWords` groups above. **This passes today, and `breaksOnMerge` is empty.** It
   failed on exactly one string, `upgrades[1].blurb`, until P1 was narrowed in wave 7 to permit
   second person; see `breaksOnMergeWithdrawn` for the ruling and why the two sheets collided.
3. No sentence in any player-facing string exceeds 12 words; no string outside `.blurb` and
   `.flavour` contains more than one sentence; no string contains more than two.
4. Flesch-Kincaid grade over the concatenated `.blurb` and `.flavour` corpus, proper nouns
   excluded from the syllable count, is at most 6.0.

## Not decided here

The `vocabulary` key itself, its character ceiling `maxLabelChars`, its casing regexes and its
plural rule (`theme/vocabulary`, sheets `01` and `02`, which own the key; everything above is a
request against it). The voice of a Find's flavour line, the words banned only inside one, and
every question about humor (sheet `02`, this domain). When the game is permitted to be loud
(sheet `03`). What may not be built at all (sheet `04`). Rendered case, typography and number
formatting (UI/UX). The store listing's register (Discovery & Marketing).
