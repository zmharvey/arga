# 02 — The silences

**Domain:** Lore · **Category:** Theme & Narrative · **Wave:** 1 (revised wave 7)

## Decision

**Six questions the canon never answers, `S1`–`S6`, each with a runnable trigger-token test.** They
are emitted as an amendment to `canon.silences`, the field `01-the-past` declares and this sheet
fills. A later sheet may resolve one, but only by naming the entry id in its own `## Pushing back`
and citing this file; an answer arriving inside a name, a blurb, an `artPrompt` or a store line
without that citation is drift, and the later sheet is revised.

**The one-line reviewer test that covers most cases: a present condition passes, a cause or an
intent fails.** "Cracked" passes. "Cracked by the fire" fails. "Buried" passes; it is the hook
line's own word. "Buried by the last of them" fails.

| id | the question | why not answering beats answering | most likely violator |
|---|---|---|---|
| `S1` | What ended the place. Why it was left | every available cause is closed. An **agent** (war, a rival) is the antagonist `HANDOFF.md` instructs nobody to invent `[brief: binding]`. An **event** (fire, flood, plague) reads grim against *"not spooky, not grim"* and *"reclamation, not a haunted place"* `[brief: soft]` ×2. A **gradual decline** makes the world trend downward against *"cleared is permanent"* `[brief: binding]` ← `[you chose: R2 Q1]`. And *"they simply left"* is not neutral: it invites *why*, so it buys nothing and spends the only channel there is | the 24 object prompts, `objectArt[].artPrompt` — unlimited room, and *"put the flavour in artPrompt"* is the pipeline's own instruction |
| `S2` | Who made the place, and what they were called | a proper noun for a people is the cheapest route back to *"uncover a lost civilisation"*, declined *"because the verb disappears"* `[brief: soft]` ← `[you accepted: R6 Q1]`. It implies a faction Identity reports empty, and a face priority 1 funds no art for. At a delivery bandwidth of zero it would dominate the fiction by default. This is the answer to Identity's routed gap 5: **they are not nameable** | `storeListing.description` — it needs a sentence, and "lost civilisation" is the genre's reflex |
| `S3` | Who buried the objects, and whether they were hidden on purpose | *"clearing and discovering are one action; do not design them as separate systems"* `[brief: soft]` is **the stated reason this theme beat cobwebs, ash and rust**. A burial agent splits one action into two events with two agencies. Deliberate concealment additionally gives the world an entity that anticipated the player. And the loop explains it with zero fiction: things are under the overgrowth because the overgrowth grew over them, seen inside *"the first ten seconds"* with *"no text, no tutorial"* | set themes (Meta & Content) — *"what the four sets mean"* is the natural place to write "these were put away together" |
| `S4` | Why clearing pays, and where a Shard comes from | each answer spends something. **Economic** needs a counterparty; Identity declares the cast empty and priority 1 funds no NPC. **Material** makes value a property of the overgrowth, which `rarity` has since ruled out: `gradedLadderCount` is 1 and `findPlacementReadsTier` is false. **Magical** spends the supernatural budget on a HUD counter, and that budget is Setting's. A rising counter is genre-legible with zero fiction across 38.2M visits at a 96.2% like ratio `[research: https://www.roblox.com/games/133086043677134/Grass-Incremental-Simulator]` | the premium SKU — `products` sells a throughput multiplier, and a fiction of value is the usual way one is justified |
| `S5` | Whether anyone besides the players will ever see the restored place, or is owed it | **both answers are already ruled out.** "Someone is coming back" is the returning-benefactor fiction the category gate forbids as importing daily rewards (priority 3), and it makes restoration instrumental when *"satisfaction comes from before/after and discovery, nothing else"*. "No one is coming" is the melancholy reading, against *"not grim"* `[brief: soft]` ×2. When every answer is closed by a stated constraint, a silence is the correct output rather than an unmade decision | the return hook (Live Ops) — `roadmap` and `events` both rule nothing ships, and a waiting figure is the cheapest fictional patch for a weak pull |
| `S6` | Whether the player is the first, or the only one, to do this | "first" is a chosen-one framing adjacent to the *"not a power fantasy"* the brief forbids, and it is **falsified on sight**: `social` puts a full server of players in one world clearing their own plots, visible to each other, so a second player walking past contradicts the canon within seconds. "Not first" requires predecessors, a class of being Identity declares absent | the first minute (`firstSession.beats`) — a first find is exactly where "you are the first" wants to be written |

## Why

**A silence is only a decision if the alternative is stated and rejected.** Every entry above names
what answering would cost. Where I could not name that cost I dropped the entry rather than ship a
gap wearing a prohibition's clothes. Every entry is `[cid: decided]` against a blank page:
`OPEN.md §1` has no audit row for the ruin's history and `01-FOUNDATION.md` states it twice as left
open.

**Why this sheet is an instrument.** `validateManifest` checks shapes, weights, casing and banned
words. **There is no check anywhere that a name is consistent with the canon**, and
`playerFacingStrings()` does not enumerate an `artPrompt` at all, so a wave-4 prompt contradicting
wave-1 canon passes the merge silently. `[research: bridge/schema.mjs]` The token lists below exist
so this sheet can be *run*: whole-word, case-insensitive, over every string value in the merged
manifest plus every `artPrompt`. It does not catch paraphrase, so a reviewer is still required, and
this sheet is written to be the thing that reviewer holds.

**The empty ownership slot, reported rather than filled.** *"Why the conflict exists"* has no answer
because there is no conflict: *"there is no failure state"* / *"zero tension is deliberate"*
`[brief: soft]` ← `[you accepted: step 6 Q2]`, elevated by `HANDOFF.md`. **That slot is not a
silence.** A silence is a question the canon declines to answer; an empty slot is a question the
game does not contain. Nobody should read `S1`–`S6` as coyness about a villain.

**One entry moved since wave 1.** `S3`'s duplicate-handling worry is closed rather than open:
`discovery.repeat.possible` is `false` and that key states in its own value that the remaining
branch *"is a defect path, not the silent duplicate case core-loop/03 forbids"*. No fiction is owed
for a branch no player can reach.

```json
{
  "amends": "canon",
  "field": "silences",
  "requestedBy": "cid/theme/lore/02-the-silences.md",
  "matchRule": "whole-word, case-insensitive, over every string value in the merged manifest, every artPrompt in any key, and storeListing.description",
  "hitSemantics": "a hit is a question a reviewer must answer, not an automatic failure. The subset promoted to vocabulary.bannedWords by 01-the-past is the hard half; this list is the review half.",
  "resolutionRule": "a later sheet may answer an entry only by naming its id in its own '## Pushing back' section and citing cid/theme/lore/02-the-silences.md. An answer appearing without that citation is drift and the later sheet is revised.",
  "precedence": [
    { "against": "01-the-past, same domain", "winner": "01", "effect": "if 01 answers a listed question the entry is struck from THIS sheet, not from 01" },
    { "against": "any later wave", "winner": "this sheet", "effect": "the later sheet revises; its string, blurb or prompt is the defect" },
    { "against": "a sibling holding the subject by assignment", "winner": "the sibling", "effect": "this sheet yields and records the loss as a consequence" },
    { "against": "the developer", "winner": "the developer", "effect": "every entry is [cid: decided] against a blank page; reopening is theirs" }
  ],
  "rows": [
    {
      "id": "S1",
      "question": "what ended the place, and why it was left",
      "answer": "never, by no cause, no date and no hint",
      "tokens": ["abandoned","abandon","fled","flee","sacked","siege","war","battle","fire","flood","quake","plague","famine","curse","cursed","destroyed","collapsed","doom","fell","ruined"],
      "structuralTest": "damage may be described as PRESENT and may not be ATTRIBUTED. A prepositional phrase of cause ('by the', 'after the', 'during the', 'when the') attached to a damage word fails.",
      "likelyViolator": "objectArt[].artPrompt"
    },
    {
      "id": "S2",
      "question": "who made the place, and what they were called",
      "answer": "never as an identity: no proper noun, title, count, order, dynasty, language or face",
      "tokens": ["civilisation","civilization","empire","kingdom","dynasty","tribe","clan","ancients","elders","priest","priests","king","queen","lord","founder","founders","architect","makers","forefathers"],
      "structuralTest": "no player-facing string and no artPrompt may contain a possessive apostrophe-s or the phrase 'of the', both of which attribute an object to a party. Zero of the 43 strings on disk contain either.",
      "ratifiedException": "a trade REGISTER is not a named party. Ledger, Tally and Stylus pass; a common-noun occupation in a rationale is allowed, a capitalised party in a shipped string is not.",
      "likelyViolator": "storeListing.description"
    },
    {
      "id": "S3",
      "question": "who buried the objects, and whether they were hidden on purpose",
      "answer": "never: no agent of burial, no intent, no anticipation of the player",
      "tokens": ["hidden","hid","concealed","cached","stashed","hoard","sealed","entombed","interred","offering","offerings","entrusted"],
      "structuralTest": "'buried', 'beneath', 'under' and 'overgrown' all pass: they describe a state. A transitive burial ('buried by', 'left for', 'placed here', 'waiting for') fails.",
      "likelyViolator": "collection set themes"
    },
    {
      "id": "S4",
      "question": "why clearing pays, and where a Shard comes from",
      "answer": "never: no origin, no counterparty, no property of the overgrowth that makes it valuable",
      "tokens": ["sell","sold","buyer","buy","merchant","market","trade","wages","salvage","bounty","magic","magical","enchanted","blessed","sacred"],
      "structuralTest": "a blurb fails only if it names a party or a substance that supplies the currency. 'pays' is deliberately not a token: 'Each patch pays more' names no payer and states an effect on the player's action.",
      "likelyViolator": "products[].label and storeListing.description"
    },
    {
      "id": "S5",
      "question": "whether anyone besides the players will ever see the restored place, or is owed it",
      "answer": "never; the player's own relation to the makers is Identity's and is untouched here",
      "tokens": ["awaits","await","awaiting","someday","reunion","homecoming","heir","heirs","inherit","inheritance","owed","duty","promised","forgotten"],
      "structuralTest": "'return' and 'returns' fail when the subject is any party other than a player. 'returns to the collection' passes; 'until they return' fails.",
      "likelyViolator": "any return-hook copy"
    },
    {
      "id": "S6",
      "question": "whether the player is the first, or the only one, to do this",
      "answer": "never: no precedence, no singularity, no predecessors",
      "tokens": ["first","only one","untouched","virgin","chosen","finally","before you","pioneer","discoverer"],
      "structuralTest": "an ordinal about the PLAYER fails; an ordinal about a game object ('the first patch you clear') is not player-facing copy and is out of scope.",
      "likelyViolator": "firstSession.beats copy"
    }
  ]
}
```

## The runnable check

One whole-word, case-insensitive pattern over every string value in the merged manifest, every
`artPrompt`, and every quoted player-facing string under `cid/`:

```
grep -iwE 'abandoned|abandon|fled|flee|sacked|siege|war|battle|fire|flood|quake|plague|famine|curse|cursed|destroyed|collapsed|doom|fell|ruined|civilisation|civilization|empire|kingdom|dynasty|tribe|clan|ancients|elders|priest|priests|king|queen|lord|founder|founders|architect|makers|forefathers|hidden|hid|concealed|cached|stashed|hoard|sealed|entombed|interred|offering|offerings|entrusted|sell|sold|buyer|buy|merchant|market|trade|wages|salvage|bounty|magic|magical|enchanted|blessed|sacred|awaits|await|awaiting|someday|reunion|homecoming|heir|heirs|inherit|inheritance|owed|duty|promised|forgotten|first|only one|untouched|virgin|chosen|finally|before you|pioneer|discoverer'
```

Run whole-word or it produces false hits: `sealed` must not match the find name `Seal`, `buy` must
not match `Bellcast`. **A hit is a question a reviewer must answer, not an automatic failure.**

**What this sheet may not do, checked.** No entry forbids anything a contract-key owner needs to
fill its key. All 43 player-facing values on disk — `area.label`, four `collection.sets[].label`,
24 `relics`, four `tiers[].name`, three `upgrades[].label`, three `blurb`, `currency.name`,
`currency.plural`, `collection.className` and `collection.classPlural` — pass every token list and
both structural tests. A silence that blocked one of those would be a silence that failed.

## Consequences for other work

- **`01-the-past`** declares `canon.silences` and must not answer `S1`–`S6`; it holds the reverse
  precedence if it does. The 25 words it promotes into `vocabulary.bannedWords` are the hard half of
  the same rule and overlap this list at `forgotten`, `cursed`, `hoard` and `empire`.
- **Set themes** (Meta & Content) may say where finds were found together and may not say why they
  were together. That is `S3`, and it is the constraint most likely to feel like a loss.
- **The 24 object prompts** (`objectArt`) inherit the strictest version of this sheet, because
  `artPrompt` is the only unlimited-length field in the pipeline and the only place a full sentence
  of invented history fits.
- **The store description** (`storeListing`) inherits `S2` and `S6`.
- **Place rules** (Setting): `S4` yields if the supernatural budget is spent specifically on the
  currency, and asks that it not be.
- **The tonal do-not list** (Tone) and this sheet are not duplicates: Tone fails copy for
  *sounding* wrong, this fails copy for *presupposing* an answer. A funny line about a flood breaks
  both, for two unrelated reasons.
- **Whoever owns `bridge/schema.mjs`**: promoting `canon` would make this the first fiction
  constraint the merge can hold. The grep above is a lint that does not exist. Stated as a
  requirement, not assumed.

## Acceptance criteria

1. The `canon` amendment contains exactly 6 rows, `S1` through `S6`, and each carries a `question`,
   an `answer`, a `structuralTest`, a `likelyViolator` and at least 8 `tokens`.
2. This sheet answers zero of its own six questions and contains zero proper nouns naming a person,
   a people, a place, an event or a date.
3. Run whole-word and case-insensitive, the pattern above returns **zero** hits against every value
   `playerFacingStrings()` returns for the merged manifest — 43 strings today.
4. `npm run bridge` reports no problem for this sheet: an `amends` block is collected, never merged,
   and no second sheet claims `canon`.

## Not decided here

Whether there were inhabitants, whether an era exists, whether deeper means older, whether the place
returns to its former condition, and the six `L` rules — all `01-the-past`, this domain, which owns
the `canon` key this sheet amends. What exists in the place and whether anything supernatural is
permitted (Setting). Who the player is (Identity). The register these silences are written in
(Tone). Which words are banned for occupancy reasons, and whether `vocabulary` accepts the 25
canon bans (Vocabulary). The 24 names and the four set themes (Meta & Content).

## Flagged to the developer

**The brief is silent on all six, and so is the interview.** Every entry is `[cid: decided]` against
zero developer input, and a silence is the one kind of decision that is invisible once made: nothing
downstream ever asks for it, so nobody will notice if it was wrong.

The live alternative for each entry is *answer it instead*, and the cost is written into the row.
**Recommendation: keep all six.** The reason is bandwidth, not restraint: no merged key holds
fiction, neither `ui-forge` pattern has a per-item body-text field, and onboarding is *"no text, no
tutorial"*. A canon that answers questions it cannot state produces contradictions it cannot
correct. **The one entry worth a second look is `S2`** — if the store listing ever wants a sentence
with a subject in it, a named people is the most useful thing this sheet forbids.
