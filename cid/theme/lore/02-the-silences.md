# 02 — The silences

**Domain:** Lore · **Category:** Theme & Narrative · **Wave:** 1

## Decision

**Six questions the canon never answers, listed below as `S1`–`S6`, each with a runnable trigger-token
test.** A later sheet may resolve one, but only by naming the entry id in its own `## Pushing back`
section and citing this file; an answer that arrives inside a name, a blurb, an `artPrompt` or a store
line without that citation is drift and the later sheet is revised, not this one.

**No manifest block. Lore owns no build-contract key** — `bridge/schema.mjs` assigns all ten keys to
`gameplay/*`, `art/objects` and `tech/architecture`, and no key or field holds fiction.
`[research: repo — bridge/schema.mjs]`

**The one-line reviewer test that covers most cases: a present condition passes, a cause or an intent
fails.** "Cracked" passes. "Cracked by the fire" fails. "Buried" passes; it is the hook line's own word.
"Buried by the last of them" fails.

## Why

**A silence is only a decision if the alternative is stated and rejected.** Every entry below says what
answering would cost. Where I could not name that cost, I dropped the entry rather than ship a gap
wearing a prohibition's clothes.

**Why this sheet is an instrument and not prose.** `validateManifest` checks shapes, that tier weights
sum to 100, that rarer pays more, that `currency.plural` is ≤10 characters and that no two sheets claim
one key. **There is no check anywhere that a name is consistent with the canon**, so a wave-4 `artPrompt`
contradicting wave-1 canon passes the merge silently. `[research: repo — bridge/schema.mjs, bridge/merge.mjs]`
The token lists below exist so that this sheet can be *run*, not read: whole-word, case-insensitive, over
every string value in the merged manifest plus every `artPrompt`. That converts most of an unenforceable
prohibition into a lint. It does not catch paraphrase, so a reviewer is still required, and this sheet is
written to be the thing that reviewer holds.

**The empty ownership slot, reported rather than filled.** *"Why the conflict exists"* has no answer
because there is no conflict: *"**There is no failure state.**"* / *"**Zero tension is deliberate.**"*
(`02-GAMEPLAY.md`) `[brief: soft]` `[you accepted: step 6 Q2]`, elevated by `HANDOFF.md` to one of six
things to know before designing anything, therefore treated as `[brief: binding]`. **That slot is not a
silence.** A silence is a question the canon declines to answer; an empty slot is a question the game does
not contain. Nobody should read `S1`–`S6` as coyness about a villain.

---

### `S1` — What ended the place. Why it was left.

**Never answered.** Not by a cause, not by a date, not by a hint.

**Why not answering beats answering.** Every available cause is closed by something already decided. An
agent (war, a rival, an enemy) is the antagonist `HANDOFF.md` names in its six-item list and instructs
nobody to invent `[brief: binding]`. An event (fire, flood, quake, plague) reads grim against *"Not spooky,
not grim"* and *"reclamation, not a haunted place"* `[brief: soft]` ×2 (`01-FOUNDATION.md`,
`04-PRESENTATION.md`). A gradual decline reads as decay still in progress, which pulls against
*"**Cleared is permanent — overgrowth never returns.** ... This is the payoff and it is load-bearing"*
`[brief: binding]` `[you chose: R2 Q1]` by making the world a thing that trends downward. And the
apparently neutral answer ("they simply left") is not neutral: it invites *why*, so it buys nothing and
spends the only delivery channel there is. `[cid: decided]`

**Tokens** (whole word, case-insensitive):
`abandoned|abandon|fled|flee|sacked|siege|war|battle|fire|flood|quake|plague|famine|curse|cursed|destroyed|collapsed|doom|fell|ruined`

**Structural test.** In any player-facing string or `artPrompt`, damage may be described as *present*
and may not be *attributed*. A prepositional phrase of cause (`by the`, `after the`, `during the`,
`when the`) attached to a damage word fails.

**Most likely violator:** the 24 object prompts *[currently Art & Visuals — Objects, wave 4]*, where an
`artPrompt` has unlimited room and *"Put the flavour in artPrompt"* is the pipeline's own instruction.
`[research: repo — ui-forge/src/ideate/brief.mjs]`

---

### `S2` — Who made the place, and what they were called.

**Never answered as an identity.** Whether anyone was here at all is `01-the-past`'s to settle. This entry
forbids the *name*: canon gives the makers no proper noun, no title, no count, no order, no dynasty, no
language and no face, under either of `01`'s rulings.

**Why not answering beats answering.** A proper noun for a people is the cheapest possible route back to
*"Uncover a lost civilisation"*, which *"was declined ... because the verb disappears"* `[brief: soft]`
`[you accepted: R6 Q1]` (`05-OUTWARD.md`) — the store line was refused, and a canon that names a
civilisation hands wave 5 the refused line back. It also implies a faction, which
`cid/theme/identity/_lead.md` reports empty by construction, and a face, which priority 1 funds no art
for. And it would be the only proper noun in the world besides the object names and player account names,
so at a delivery bandwidth of zero it would dominate the fiction by default. This entry is the answer to
Identity's routed gap 5, *"whether the ruin's makers exist as a nameable group is unstated"*, which was
sent to history work: **they are not nameable.** `[cid: decided]`

**Tokens:**
`civilisation|civilization|empire|kingdom|dynasty|tribe|clan|ancients|elders|priest|priests|king|queen|lord|founder|founders|architect|makers|forefathers`

**Structural test.** No player-facing string and no `artPrompt` may contain a possessive `'s` or the
phrase `of the`, both of which attribute an object to a party. Currently zero of the 37 player-facing
strings on disk contains either.

**Ratified, so the rule is not read as a demand for a rename.** A trade *register* is not a named party.
`Ledger`, `Tally`, `Stylus` and `cid/gameplay/meta/02-the-collection.md`'s own rationale
(*"objects a mason or a clerk would leave behind"*) all pass: a common-noun occupation in a rationale is
allowed, a capitalised party in a shipped string is not.

**Most likely violator:** the store description *[currently Discovery & Marketing — Name, wave 5]*, which
needs a sentence and for which "lost civilisation" is the genre's reflex.

---

### `S3` — Who buried the objects, and whether they were hidden on purpose.

**Never answered.** No agent of burial, no intent behind it, no anticipation of the player.

**Why not answering beats answering.** This is the entry with a mechanical argument rather than a tonal
one. *"**Clearing and discovering are one action.** Do not design them as separate systems"* `[brief: soft]`
(`01-FOUNDATION.md`) is *the stated reason this theme beat cobwebs, ash and rust*. A burial agent splits
one action into two events with two agencies — something was put there, then something grew over it — and
that is exactly the property the theme was selected for. Deliberate concealment additionally gives the
world an entity with intent that anticipated the player, which is both the seed of tension the handoff
forbids and a chosen-one framing against *"not a power fantasy"*. And the loop already explains it with
zero fiction: things are under the overgrowth because the overgrowth grew over them, which the player sees
inside *"the first ten seconds"* with *"No text, no tutorial"* `[brief: soft]` `[you accepted: R6 Q3]`.
An answer restates something already legible, at the cost of the only channel there is. `[cid: decided]`

**Tokens:**
`hidden|hid|concealed|cached|stashed|hoard|sealed|entombed|interred|offering|offerings|entrusted`

**Structural test.** `buried`, `beneath`, `under` and `overgrown` all pass: they describe a state. A
transitive burial (`buried by`, `left for`, `placed here`, `waiting for`) fails.

**Most likely violator:** set themes *[currently Meta & Content, wave 3]*, because *"what the four sets
mean"* is the natural place to write "these six were put away together".

---

### `S4` — Why clearing pays, and where a Shard comes from.

**Never answered.** The counter goes up. Canon supplies no origin, no counterparty, and no property of
the overgrowth that makes it valuable.

**Why not answering beats answering.** Each of the three available answers spends something the game does
not have. An **economic** answer needs a counterparty — a buyer, a patron, a market — and
`cid/theme/identity/_lead.md` declares the cast empty while priority 1 funds no NPC model. A **material**
answer makes value a property of the overgrowth, which pre-decides *"whether relic rarity exists as a
concept separate from overgrowth rarity"* — open in the source and routed to systems and set-content work
by `OPEN.md §5` assumption 1, not to me. A **magical** answer spends the supernatural budget on a HUD
counter, and that budget belongs to place-rules work *[currently Setting — `03-physical-law`, this wave]*.
Against that, a rising counter is genre-legible with zero fiction: the reference ships one across 38M
visits at 96% likes `[research: research/grass-incremental.md]`. An answer costs three things and buys
nothing. `[cid: decided]`

**Tokens:**
`sell|sold|buyer|buy|merchant|market|trade|wages|salvage|bounty|magic|magical|enchanted|blessed|sacred`

**Ratified, and this is the calibration case.** `upgrades[].blurb` currently holds *"Each patch pays
more"*, *"Clear a wider sweep as you walk"*, *"Move faster between patches"*
(`cid/gameplay/balance/01-upgrade-ladder.md`). **All three pass.** `pays` names no payer, and the blurbs
state an effect on the player's action rather than a source of money. `pays` is deliberately not a token:
failing it would be this sheet blocking a contract key it does not own, which my domain index rules out
by name. A blurb fails only if it names a party or a substance that supplies the currency.

**Where this entry can lose in wave 1.** If place-rules work spends its supernatural budget specifically
on the currency, that is a same-wave collision and this entry yields to it. Raised as a consequence for
that subject, never as a rename from here.

**Most likely violator:** the premium SKU *[currently Monetization, wave 3]*, because `03-META.md` and
`OPEN.md §6` both record that *"the premium SKU has no home"*, and a fiction of value is the usual way one
is found.

---

### `S5` — Whether anyone besides the players will ever see the restored place, or is owed it.

**Never answered.** The player's own relation to the makers is player-role work's *[currently Identity —
`01-player-role`, this wave]*, and this entry does not touch it. What stays silent is whether any **other**
party is coming, waiting, or owed the work.

**Why not answering beats answering, and this is the clearest case in the sheet: both answers are already
ruled out.** "Someone is coming back" is the returning-benefactor fiction the category gate forbids as
importing daily rewards (`cid/theme/_category.md`, from priority 3), and it makes restoration instrumental
when *"Satisfaction comes from before/after and discovery, nothing else"* (`02-GAMEPLAY.md`). "No one is
coming" is the melancholy reading, against *"not grim"* and *"reclamation, not a haunted place"*
`[brief: soft]` ×2. When every available answer is closed by a stated constraint, a silence is the correct
output rather than an unmade decision. `[cid: decided]`

**Tokens:**
`awaits|await|awaiting|someday|reunion|homecoming|heir|heirs|inherit|inheritance|owed|duty|promised|forgotten`

**Structural test.** `return` and `returns` fail when the subject is any party other than a player.
`returns to the collection` passes; `until they return` fails.

**Most likely violator:** the return hook *[currently Live Ops, wave 5]*, because `03-META.md` records the
pull to come back is *"materially weaker than the reference's"* and a waiting figure is the cheapest
fictional patch for it.

---

### `S6` — Whether the player is the first, or the only one, to do this.

**Never answered.** No precedence, no singularity, no predecessors.

**Why not answering beats answering.** "First" is a chosen-one framing adjacent to the *"not a power
fantasy"* the brief softly forbids, and it is falsified on sight: *"Everyone occupies one world clearing
their own patch, visible to each other"* at a server size of 12–20 `[brief: soft]` `[you accepted: R6 Q2]`
(`02-GAMEPLAY.md`), so a second player walking past contradicts the canon within seconds. "Not first"
requires predecessors, a class of being Identity declares absent and priority 1 does not fund. **A canon
that takes either position is refuted by the game's own screen**, and the observable world already answers
the question better than any text could. `[cid: decided]`

**Tokens:**
`first|only one|untouched|virgin|chosen|finally|before you|pioneer|discoverer`

**Most likely violator:** the first-session choreography *[currently Onboarding, wave 2, plus UI/UX, wave
4]*, because a first find is exactly where "you are the first" wants to be written, and
`cid/gameplay/onboarding/01-first-find.md` already owns that moment.

---

## The enforcement rule

**1 · Precedence, stated in all three directions.**

| against | who wins | what happens |
|---|---|---|
| `01-the-past`, same domain, same wave | **`01` wins** | If `01` answers a listed question, the entry is struck from **this** sheet, not from `01`. That is my domain index's own conflict rule, and it exists because `01` was assigned inhabitants, era, whether deeper means older, and whether the place is recoverable. |
| any sheet in wave 2 or later | **this sheet wins** | The later sheet revises. Its string, blurb or prompt is the defect. |
| a same-wave sibling holding the subject by assignment (the `S4` case) | **the sibling wins** | This sheet yields and records the loss as a consequence for that subject. |
| the developer | **the developer wins, always** | Every entry is `[cid: decided]` against a blank page. Reopening is theirs. |

**2 · Resolving a silence is allowed. Resolving it quietly is not.** A later sheet that needs an answer
adds a `## Pushing back` section naming the entry id (`S1`–`S6`) and citing
`cid/theme/lore/02-the-silences.md`. Without that section, an answer appearing in a name, a label, a
blurb, an `artPrompt` or a store line is drift, and the reviewer's action is revision rather than debate.

**3 · The runnable check.** One whole-word, case-insensitive pattern over every string value in the merged
manifest, every `artPrompt`, and every quoted player-facing string under `cid/`:

```
grep -iwE 'abandoned|abandon|fled|flee|sacked|siege|war|battle|fire|flood|quake|plague|famine|curse|cursed|destroyed|collapsed|doom|fell|ruined|civilisation|civilization|empire|kingdom|dynasty|tribe|clan|ancients|elders|priest|priests|king|queen|lord|founder|founders|architect|makers|forefathers|hidden|hid|concealed|cached|stashed|hoard|sealed|entombed|interred|offering|offerings|entrusted|sell|sold|buyer|buy|merchant|market|trade|wages|salvage|bounty|magic|magical|enchanted|blessed|sacred|awaits|await|awaiting|someday|reunion|homecoming|heir|heirs|inherit|inheritance|owed|duty|promised|forgotten|first|only one|untouched|virgin|chosen|finally|before you|pioneer|discoverer'
```

Run whole-word or it produces false hits (`sealed` must not match the object name `Seal`, `buy` must not
match `Bellcast`). **A hit is not automatically a failure; it is a question a reviewer must answer.** The
grep catches token-level violations only. Paraphrase, implication and a well-written sentence that names no
banned word all pass it and still fail this sheet, which is why entry 2 above requires a citation rather
than a clean grep.

**4 · What this sheet may not do, checked.** No entry forbids anything a contract-key owner needs to fill
its key. `collection.sets[].relics` (24 object nouns), `collection.sets[].label` (four place nouns),
`area.label`, `tiers[].name` (four plant nouns), `currency.name` / `.plural`, `upgrades[].label` and all
three `upgrades[].blurb` values currently on disk pass every token list and both structural tests. A
silence that blocked one of those would be a silence that failed.

## Consequences for other work

- **`01-the-past`** must not answer `S1`–`S6`, and holds the reverse precedence if it does. It was
  assigned four questions; none of them is on this list, and that separation is deliberate rather than
  lucky.
- **Set themes** *[Meta & Content, wave 3]* may say where six things were found together and may not say
  why they were together. That is `S3`, and it is the constraint most likely to feel like a loss.
- **The 24 object prompts** *[Art & Visuals — Objects, wave 4]* inherit the strictest version of this
  sheet, because `artPrompt` is the only unlimited-length field in the pipeline and is therefore the only
  place a full sentence of invented history can fit. `[research: repo — ui-forge/src/ideate/brief.mjs]`
- **The store description** *[Discovery & Marketing, wave 5]* inherits `S2` and `S6`. The one sentence the
  genre would reach for is the one `05-OUTWARD.md` already declined.
- **Place rules** *[Setting — `03-physical-law`, this wave]* is told that `S4` yields to it if it spends
  its supernatural budget on the currency, and is asked not to spend it there.
- **The banned-word list and the canonical term list** *[Vocabulary, this wave]* should collect these
  tokens as a second class alongside the occupancy bans: different reason, same enforcement surface, and
  Vocabulary is the last writer. This sheet coins no proper noun, so it adds nothing to the register
  itself.
- **The tonal do-not list** *[Tone — `04-do-nots`, this wave]* and this sheet are not duplicates and
  verification should confirm it: Tone fails copy for *sounding* wrong, this fails copy for *presupposing*
  an answer. A funny line about a flood breaks both, for two unrelated reasons.
- **Contract and seam work** *[whoever owns `bridge/schema.mjs` and `bridge/merge.mjs`]*: the grep in rule
  3 is a lint that does not exist. Adding it would make this the first fiction constraint in the pipeline
  the merge can enforce. Stated as a requirement, not assumed.

## Acceptance criteria

1. This sheet contains exactly 6 entries, `S1` through `S6`, and each carries a question, a stated reason
   not answering beats answering, and at least 8 trigger tokens.
2. Every entry names at least one subject and its wave as the most likely violator.
3. This sheet answers zero of its own six questions and contains zero proper nouns naming a person, a
   people, a place, an event or a date.
4. Run whole-word and case-insensitive, the rule-3 pattern returns zero hits against the 37 player-facing
   strings currently in manifest blocks under `cid/` (`area.label`, four `sets[].label`, 24
   `sets[].relics`, four `tiers[].name`, three `upgrades[].label`, three `upgrades[].blurb`,
   `currency.name`, `currency.plural`).

## Not decided here

Whether there were inhabitants, whether an era exists, whether deeper means older, and whether the place
returns to its former condition — all four are `01-the-past`'s, this domain, this wave. What exists in the
place and what does not, and whether anything supernatural is permitted (Setting). Who the player is and
what a co-present stranger is (Identity). The register these silences are written in, and the tonal
exclusion list (Tone). Which words are banned for occupancy reasons, and where the canonical term list
lives (Vocabulary). The 24 names, the four set themes, and any set's meaning (Meta & Content, wave 3).

## Flagged to the developer

**The brief is silent on all six of these, and so is the interview.** `OPEN.md §1` has no audit row for
the ruin's history; `01-FOUNDATION.md` states it twice as left open. So every entry is `[cid: decided]`
against zero developer input, and a silence is the one kind of decision that is invisible once made:
nothing downstream ever asks for it, so nobody will notice if it was wrong.

The live alternative for each entry is simply *answer it instead*, and the cost of doing so is written
into that entry. **My recommendation is to keep all six.** The reason is not restraint, it is bandwidth:
the pipeline funds no lore surface at all — no contract key holds fiction, neither `ui-forge` pattern has
a per-item body-text field, `04-PRESENTATION.md`'s screen list has no lore screen, and onboarding is
*"No text, no tutorial"*. `[research: repo — bridge/schema.mjs, ui-forge/src/compose/patterns/]` A canon
that answers questions it cannot state produces contradictions it cannot correct.

**The one entry worth a second look is `S2`.** If the game ever wants a store sentence with a subject in
it, a named people is the most useful thing this sheet forbids, and wave 5 is where that pressure will
arrive.
