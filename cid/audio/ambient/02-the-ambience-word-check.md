# 02 — The ambience word check

**Domain:** Ambient · **Category:** Audio · **Wave:** 6

## Decision

**Both wave-1 greps reach `ambience`'s manifest strings, and this key complies with them rather
than claiming the exemption.** `theme/setting/01` criterion 4's fauna pattern and
`theme/setting/03` criterion 4's `RW` pattern each return **0** hits over the `ambience` block,
achieved by writing the descriptors in the register below and not by rewording around a check.

**No manifest block: this sheet is an adjudication of two other sheets' criteria, its data form is
the descriptor and `forbidden[]` strings inside `ambience`, and `ambience` is carried whole by
sheet `01`.**

## Why

**The exemption clause lapses because its stated ground is gone.** `theme/setting/01` criterion 4
ends *"Non-visual ambient audio is exempt, **and no manifest field holds it**."* That is
conjunctive, and its second half was a statement of fact about the contract as it stood in wave 1.
`ambience` makes it false. When a conditional's stated ground disappears the safe reading is that
the exemption lapses, not that it silently broadens to cover a field its writer had never seen.
`[cid: decided]`

**The stronger argument is that an exemption a reviewer must adjudicate is not a check.** Both
criteria are valuable precisely because they are mechanical: a grep, a count, no taste. Claiming
exemption converts two mechanical checks into two judgment calls permanently, and hands every
future Audio key the same claim — SFX has *"a soft rustle-and-snap"*, Stingers a resolving chord,
and each meets the same token lists. **The cost of complying is one descriptor in a different
register; the cost of exempting is that the two checks stop being checks.** `[cid: decided]`

**`theme/setting/03`'s own calibration is adopted, and I state how far it reaches.** That sheet
rules *"`Vane`, `Orrery`, `Sundial` and `Gnomon` are shipped values that **denote** weather, sky
and time; they pass, because denoting is not asserting."* **The calibration rescues a noun that
names an object. It does not rescue a noun that names the phenomenon** — `breeze`, `gust`, `gale`
and `weather` are in the pattern as phenomena, and the fauna pattern bans creature nouns outright
with no calibration note at all. Denotation is available for objects and closed for both weather
and fauna, which is why `ambience`'s descriptor names a **place and a distance** and never a
source. `[research: repo — cid/theme/setting/03-physical-law.md, read this run]`

**The prose exemption is load-bearing and I rely on it exactly as `theme/setting/04` did.** Both
criteria scope to *"every `manifest` string value and every `artPrompt` under `cid/`"*, and
`setting/04` criterion 4 states the exemption *"must be applied, or the check fails on other
sheets' own process notes."* This sheet carries no manifest block, so the tables below quote
banned tokens freely. `ambience`'s `forbidden[]` rows were written token-free anyway, so this key
does not depend on that exemption at any point.

**Zero revision requests against `theme/setting/03` criterion 4.** The `RW` check is correct as
written, its whole-word caveat is right, its resolve-as-a-question convention is right, and this
key satisfies it. Manufacturing a request against a check I can pass would be the thesaurus
outcome in reverse. **Two requests are owed and both are defects of fact, not policy.**

**`RR3` is citation drift reaching a load-bearing rule.** `theme/setting/03` `R5` — the single
rule this domain turns on — states its check as *"this is `tone/04-do-nots` `X1`'s trigger
count."* The shipped `tone/04-do-nots` carries `D1`–`D15` and **no `X1`**, and no row whose
substance is *nothing moves or sounds that the player did not cause*: `D2` is Art's light, shadow,
vignette and fog row; `D3` and `D4` are audio palette exclusions. Verified by grep this run
`[research: repo — cid/theme/tone/04-do-nots.md, read this run]`. **`R5`'s substance survives on
its own sentence and both my sheets rest on that sentence**, but a rule with an unresolvable check
is a rule a verifier cannot run. Filed, not repaired, per `G6`.

**One field-name note, so a naive grep does not report a false hit.** `ambience` holds the keys
`weatherAudio` and `timeOfDayAudio`. Both criteria scope to string *values*, and a field name is
not one; independently, `grep -iwE 'weather'` does not match `weatherAudio`, because the next
character is a word character and there is no boundary. **0** on either reading.

**`vocabulary` binds nothing here.** It governs player-facing strings and `ambience` holds
`playerFacingStrings: 0`, so `bannedWords`, `casing`, `maxLabelChars`, `maxSentenceWords` and
`allowedPattern` are satisfied vacuously. Stated rather than assumed, because the merger enforces
those five on every player-facing string and silence would read as an omission.

## The descriptor register — five rules a reviewer applies without taste

| # | rule | the test | passes | fails |
|---|---|---|---|---|
| `DR1` | A descriptor names the **place** and the **distance**. It never names the source. | Does any clause name a thing that could have made the sound? | `off-plot broadleaf wood heard across a built boundary` | `a distant chorus of woodland birds` |
| `DR2` | No verb whose subject is the world. Nothing in a descriptor does anything. | Does any clause attribute an action to the place, the air, the green or the stone? | `energy rolled off below 120 Hz and above 6 kHz` | `air stirring in the canopy` |
| `DR3` | No noun naming a weather phenomenon or an hour, denotation included. This is where `setting/03`'s object calibration stops. | Is the noun the name of an object, or of the phenomenon itself? | `no transient, onset or discrete event anywhere in the file` | `a soft breeze at first light` |
| `DR4` | **Every clause must be orderable.** A clause a supplier could not accept or reject is decoration and is deleted, not softened. | Could an audio supplier quote a price against this clause and be held to it? | `mono; peak-to-trough level range inside one loop at most 6 dB` | `warm, organic, tactile` |
| `DR5` | A string inside a `forbidden[]` array is a **denial**, and a denial cannot be an assertion about the place. **Structural, not semantic:** every element of that array must carry a `ruling` and an `observable`. | Is the string an element of such an array? | `no water bed of any kind`, in a row with a ruling and a count | the same words in a `descriptor` |

**`DR5` is offered to sibling Audio keys and is not used by `ambience`.** `sfx` and `uiSound` each
need to forbid sounds whose names sit in one of the four patterns — a crackle, a rustle, a chime —
and rewriting a ban to dodge a grep is how a forbidden list stops naming what it forbids.
`ambience`'s 18 rows are token-free without it, so this key claims nothing under `DR5`.

## The seven orderable property classes

`DR4`'s closed list. A clause in `descriptor` or `seamRule` is one of these, or it is deleted.

| # | class | the form it takes |
|---|---|---|
| 1 | duration | loop length in seconds; overlap length in seconds |
| 2 | channel count | mono or stereo |
| 3 | bandwidth | an upper and a lower Hz limit |
| 4 | transient content | a count of onsets or discrete events — for this key, `0` |
| 5 | pitch content | whether a nameable pitch centre is present |
| 6 | level range | peak-to-trough dB inside one loop |
| 7 | source distance | rendered at distance, across a built boundary, no locatable source |

## The substitutions — the fourteen words a bed descriptor reaches for

Each row is a token in one of the four live patterns, what a writer meant by it, and the orderable
clause that ships instead.

| token | pattern | what a writer meant | what passes |
|---|---|---|---|
| `bird`, `birds`, `insect` | `setting/01` c4 | life beyond the edge | `no source a listener could locate or name` (`DR1`) |
| `animal`, `beast` | `setting/01` c4 | the same, hedged | as above; the layer suggests life by breadth, not by naming |
| `breeze`, `gust`, `gale` | `RW` | unmodelled moving air, `P10` | `energy rolled off below 120 Hz and above 6 kHz` (class 3) |
| `weather` | `RW` | the climate | deleted. There is no weather (`R2`) and none is described |
| `stir`, `stirs` | `RW` | the canopy in air | `no transient, onset or discrete event` (class 4) |
| `hums`, `thrums`, `pulses` | `RW` | a tonal bed | `no pitch centre a listener could name` (class 5) |
| `breathes` | `RW` | slow level movement | `peak-to-trough level range ... at most 6 dB` (class 6) |
| `shimmer`, `glimmer` | `RW` | high-frequency air | `energy rolled off ... above 6 kHz` (class 3) |
| `glow`, `glowing` | `RW` | warmth, borrowed from light | deleted. Not an audible property; fails `DR4` |
| `aura`, `halo` | `RW` | space around the listener | `rendered at distance, across a built boundary` (class 7) |
| `dawn`, `sunrise` | `RW` | a first-light chorus | deleted. One hour (`R1`), and `DR3` closes denotation |
| `season`, `seasonal` | `RW` | a layer that changes | deleted. Priority 3, and `randomisedOverTime: false` |
| `awaken`, `sentient`, `watches` | `RW` | a place that is present | deleted. `R6`'s supernatural budget is zero |
| `fountain`, `puddle` | `05-inventory` c3 | water in a waterworks | deleted. The water is dry (`A6`); `F4` states the zero |

## Revision requests — filed, not repaired

Carried as data in `ambience.requestedRevisions` (sheet `01`), because one sheet carries a key
whole. Their substance is here.

| id | file | target | the defect | the ask |
|---|---|---|---|---|
| `RR1` | `cid/theme/setting/01-the-ruin.md` | acceptance criterion 4, final sentence | *"Non-visual ambient audio is exempt, and no manifest field holds it"* — the second clause is a statement of fact that `ambience` makes false, and the first depends on it | Strike the sentence; replace with *ambient audio descriptors are inside this check and comply with it (`cid/audio/ambient/02`)*. **0 renames, 0 shipped values at risk, 0 hits created** |
| `RR3` | `cid/theme/setting/03-physical-law.md` | `R5`, the check column | It reads *"this is `tone/04-do-nots` `X1`'s trigger count."* `tone/04` ships `D1`–`D15`, has no `X1`, and has no row of that substance | Replace with a self-contained count: *continuous layers whose level, content or filter differs at second N from second 0 for any reason but the listener's own position:* **0**. Then add the missing row to `tone/04` or drop the cross-reference. **One table cell** |

`RR2` — the one-layer-versus-two contradiction inside `theme/setting/05-inventory` — is **not this
sheet's**. It decides how many `Sound` instances exist, not what words a string may contain, and it
is argued in sheet `01`'s `## Pushing back`.

## Consequences for other work

| subject | what this forces |
|---|---|
| **In-world-sound and interface-sound work** *[Audio — SFX, UI Sound]* | **You inherit this ruling, not an exemption.** Both patterns, plus `05-inventory` criterion 3 and `setting/04` criterion 4, reach every string in `sfx` and `uiSound`. `DR5` is what lets a `forbidden[]` row keep naming the thing it forbids; `DR4` costs you most, because *"a soft rustle-and-snap"* is `OPEN.md §2`'s own wording and is not orderable. |
| **Reward-hit work** *[Audio — Stingers]* | `theme/tone/03` gives `B1` *"the best sound in the game"* and gives you no vocabulary for it. Under `DR4` the audible length, channel count and transient count are the descriptor; the adjectives are not. |
| **Place-rules work** *[Theme — Setting]* | `RR1` and `RR3`. **I edited neither file.** `RR3` is a defect in the check of the rule this domain turns on, routed to category verification per `G6`. |
| **Contract-and-seam work** | Four whole-word patterns now run over every `manifest` string under `cid/` and none is mechanised — three wave-1 sheets already asked for that lint. This sheet adds a fifth check, `DR4`'s orderability, which a lint **cannot** run, and says so rather than pretending otherwise. |

## Acceptance criteria

1. **Four patterns, zero hits.** Run whole-word and case-insensitive over every string value in the
   `ambience` `manifest` block: `theme/setting/01` criterion 4's fauna pattern returns **0**;
   `theme/setting/03` criterion 4's `RW` pattern returns **0**; `theme/setting/05` criterion 3's
   pattern returns **0**; `theme/setting/04` criterion 4's pattern returns **0**.
2. **Every clause is orderable.** Count of clauses in `ambience.layers[].descriptor` and
   `ambience.layers[].seamRule` that are not an instance of one of the seven property classes
   above: **0**. Count of adjectives of mood, warmth or character in those two fields: **0**.
3. **Filed, not repaired.** `ambience.requestedRevisions` has exactly **3** rows, each naming a
   target file, a criterion or rule id, the conflicting text and its replacement. Count of edits
   this domain made to `cid/theme/setting/01-the-ruin.md`,
   `cid/theme/setting/03-physical-law.md` or `cid/theme/setting/05-inventory.md`: **0**.
4. **`vocabulary` is satisfied and it is stated, not assumed.** `ambience.playerFacingStrings` is
   **0**, and the count of `ambience` string values rendered to a player anywhere in the build is
   **0**.

## Not decided here

Every value in `ambience` — layer count, spatialisation, loop length, sentinel, asset source, the
eighteen `forbidden[]` rows and the three `requestedRevisions[]` rows, all of which this sheet
supplies the register for and none of which it sets *(sheet `01`, this domain)*. Whether the two
target sheets accept `RR1` and `RR3` *(Theme — Setting, then category verification)*. Whether the
`RW`, fauna or `DR4` checks are ever mechanised as a lint *(contract-and-seam work — the same
missing machinery three wave-1 sheets requested)*. Whether any token above joins
`vocabulary.bannedWords` *(Theme — Vocabulary; `ambience` holds 0 player-facing strings, so this
key is unaffected either way)*. The register's application to `sfx`, `uiSound`, `stingers`, `music`
or `mix` strings, which inherit these rules but write their own values *(those five domains)*.
