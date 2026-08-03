# 01 — Fantasy of record

**Domain:** Fantasy · **Category:** Theme & Narrative · **Wave:** 1

## Decision

**The fantasy of record, one sentence:**

> **An overgrown ruin where the work is one-way: the green you clear never comes back, and the
> object it uncovers is yours from the moment it shows.**

**The register of record is permanence.** Of the four registers the brief runs at once, one is kept
and three are demoted, each to a stated job.

| the brief's line | status |
|---|---|
| *"Cleared is permanent — overgrowth never returns. This is the payoff"* | **the register.** The promise, and the axis everything accrues along |
| *"An overgrown ruin being reclaimed"* | **subject matter — the vehicle.** Ratified verbatim as *what the place is and what happens to it*, demoted as *the promise*: reclamation describes an area, never the world |
| *"the clearing **is** the revealing"* | **a consequence, and the moment the register is delivered at.** Never the promise — it is the cleaning genre's commodity, and it is a moment, not an axis |
| *"an index"* / *"a permanent collection"* | **the display surface.** The index shows the register; it is not the register. A logbook is a format players already know |
| restoration (*"marketed as a restoration game, not an incremental"*) | **the shelf label and the store word, untouched and not the register.** A shelf is not a promise |
| *"what you uncover is what you keep"* | **retained, bounded.** Possessive about a Find, never about the place |

**The trajectory across a long play: nothing about the player changes.** What grows is the quantity
of the world that is permanently finished and the number of index slots that can never empty again.
The accrual is entirely outside the person, which is the only place left for it after power, mastery
and rebirth were all removed.

**Data form: an `amends` against `vocabulary`** (owner `theme/vocabulary`). A register is a promise,
not a value; the one part of it a machine can hold is a word list, and `vocabulary.bannedWords` is
the field that holds it — the merger runs a case-insensitive `\bword\b` test over every
player-facing string and raises a merge problem on a hit.
`[research: repo — bridge/schema.mjs, `crossCuttingProblems`, read this run]` **This sheet coins
zero terms.** *Permanence* is the brief's own word.

## Why

### The brief runs four registers and picks none

*"the clearing **is** the revealing — what you uncover is what you keep"* (`CONCEPT.md`) is
revelation and possession in one clause; *"revealed objects enter the permanent collection"* /
*"the collection is the only finishable thing"* is record-keeping; *"a **restoration** game"*
(`05-OUTWARD.md`) is custodial; *"An overgrown ruin being **reclaimed**"* is reclamation. All four
are `[brief: soft]` or a positioning claim, and nothing reconciles them. Picking is work the brief
left, not a preference `[cid: decided]`.

### Permanence wins because it is binding, unoccupied, and still true at hour ten

**Binding.** *"**Cleared is permanent — overgrowth never returns.** This is the payoff and it is
load-bearing."* `[brief: binding]` `[you chose: R2 Q1]`. *"Slow regrowth and decay-if-you-leave were
both offered and declined."* No other candidate register is stated as *the payoff* anywhere.

**The axis argument, which is the decisive one.** A register is the axis a fantasy accrues along,
and this design deleted every other axis by name: *"**No rebirth.**"* and *"**No offline
accumulation.**"* `[brief: binding]` `[you chose: R2 Q2]`, *"not a power fantasy"* `[brief: soft]`,
*"**No mastery layer.** ... **Stated so nobody invents one.**"* `[brief: soft]` `[I assumed]`. Four
axes removed. What is left is the count of things that are done and cannot be undone: cleared ground
and filled slots. Any other register names a promise the game has no axis to deliver over time
`[cid: decided]`.

**Unoccupied, on the evidence.** *"The one property no occupant I found has is permanence at area
scale"* — cleaning games re-dirty per job, dig sites refill, Fisch's water is inexhaustible, Grow a
Garden's plot grows rather than is reclaimed `[research: relayed from cid/theme/fantasy/_lead.md]`.

### Revelation is demoted because it is occupied, and the occupant's shape was checked

**Carpet Cleaning Simulator's loop is repeatable contracts plus rebirth**: *"Accept job → clean all
required zones → collect payment → upgrade gear → unlock harder jobs"*, with rebirth from level 50
`[research: https://carpet-cleaning-simulator.wiki/guides/how-to-play/]`. At ~26.6M visits in a
quarter, that is a much larger game delivering before-and-after revelation far more often than this
one can, precisely *because* nothing it cleans stays clean.

**The subject matter is not novel off-platform either.** `Overgrown Cleaner` ships clearing
overgrowth to reveal *"buried walls and fences"* and *"buried paths"*, with *"Salvageable scrap,
Repairable parts"* that are sold or crafted, **no promise that cleared ground stays cleared**, and no
logbook `[research: https://store.steampowered.com/app/3164790/Overgrown_Cleaner/]`. That qualifies
my own index's *"no shipping game found"*: the subject matter exists, off-platform, with the finds as
*materials*. It does not contest Roblox occupancy and does not touch `[you chose: R1 Q1]`. It shows
that clearing-plus-buried-things **without** permanence is a shape somebody already shipped.

**The structural reason, independent of occupancy:** a revealed thing is revealed once. With *"There
is no failure state"* and *"Zero tension is deliberate"* `[brief: soft, elevated]`, most minutes are
neither reveal nor completion, and a register that only exists at the peak leaves those minutes with
nothing. Sheet `03` names those minutes, and it can only do it under a register that holds between
peaks.

### Record-keeping is demoted to a surface

Filling a logbook is mainstream at very large scale: DIG's Collection is *"a detailed in-game
logbook"* of 601 items; Fisch's Bestiary is the same instrument at ~4.5bn visits
`[research: relayed from cid/theme/fantasy/_lead.md]`. A promise resting on the index being
interesting is a promise two larger games already keep. This changes nothing about *where distinction
lives* — *"the hidden-collection layer, not the noun"* `[brief: binding]` `[you chose: R1 Q1]` names
which **system** distinguishes the game, and I am not touching it. The index is where permanence is
*counted*; the ground is where it is *stood on*, and the ground is the only unoccupied half.

### Restoration is kept as the shelf and refused as the register

*"marketed as a **restoration game, not an incremental**"* `[brief: binding]` `[you chose: R4 Q2]` is
a statement about which category the game is sold in, and it stands unaltered. **A shelf label is not
a promise about what the player is doing**, and three things on disk make restoration unavailable as
the promise:

- *"Pure 'restore the ruin' was declined for underselling the collection"* `[brief: soft]`
  `[you accepted: R6 Q1]`.
- History work already limited the word: *"does 'restored' claim reconstruction? **Only exposure.**
  Nothing is rebuilt, repaired, or added"*, with `rebuild`, `repair`, `mortar`, `scaffold` banned
  (`cid/theme/lore/01-the-past.md`, L5) `[research: repo — read this run]`. A restorative register
  promises a repair verb the player does not possess: *"Input: movement only"* `[brief: soft]`.
- Custodianship is closed from the identity side: *"custodian · caretaker"* was rejected because
  *"a duty is owed to somebody, and nobody exists to owe it to"*
  (`cid/theme/identity/01-player-role.md`) `[research: repo — read this run]`. My register is
  admissible under that test: the place is **not owned** and **no obligation** attaches to anybody.

### Possession survives only as *had*, not as *worth*

*"what you uncover is what you keep"* stays, in the half identity work settled: *"The ruin is never
theirs; each Find is theirs from the moment it surfaces"*. The bounding matters because
possession-as-enrichment is the largest occupied fantasy in the map (Treasure Hunt Simulator, ~709M
visits, *"finds are currency rather than a record"*) `[research: relayed from
cid/theme/fantasy/_lead.md]` — and this game cannot make that promise anyway: *"**One currency.**"*
with clearing as the only faucet, *"duplicates have no sink"*, *"solve duplicates without adding a
currency"* `[brief: soft]`. Nothing converts a Find into anything, so a Find's worth is that it is
**irreversibly had**.

### Wordless deliverability, satisfied without a new surface

*"Clear → reveal inside the first ten seconds. ... **No text, no tutorial.**"* `[brief: soft]`, and
there is no flavour surface in `04-PRESENTATION.md`'s screen list. Every clause is arrivable at from
priority-1 behaviour: the green clears on contact; per-area cleared state persists, so a returning
player finds the boundary between cleared stone and standing overgrowth exactly where they left it;
the Find enters a grid with empties visible and no slot ever empties.

**So this sheet requests no copy, no screen and no flavour field.** The fantasy sentence is a
designer's sentence and is **never rendered**; it sits outside the 43 player-facing strings that tone
work governs, which is why its *"you"* does not breach that register's P1.

**`[playtest unknown]` — whether permanence is legible with zero words.** Starting value: **0 strings
of copy** state it. Test range: **0 to 1 string.** What would settle it: ask returning second-session
players in the band *"does the green grow back?"* If the answer is reliably no, no surface is owed;
if not, exactly one string is owed and that cost lands on interface-surface work.

```json
{
  "amends": "vocabulary",
  "requested_by": "cid/theme/fantasy/01-fantasy-of-record.md",
  "why": "the register of record is permanence, so the checkable half of it is a ban on words that promise a world which undoes the player's work",
  "ratifiesExistingEntries": [
    { "word": "treasure", "because": "treasure is a register of worth, and worth is convertible; this economy converts nothing - one currency, clearing as its only faucet, no Find sink at all" },
    { "word": "loot", "because": "same, and it contradicts the mason-and-clerk register of the collection" }
  ],
  "bannedWordsRequested": [
    { "word": "regrow",   "reason": "promises a world that undoes the player's work, against 'cleared is permanent - overgrowth never returns'" },
    { "word": "regrowth", "reason": "noun form of the same promise; the check is word-boundary exact so the inflection needs its own entry" },
    { "word": "respawn",  "reason": "names a thing coming back after being removed, which is the one event this register forbids" },
    { "word": "reset",    "reason": "names undoing accrued work; rebirth was declined by name and this is its verb" },
    { "word": "renew",    "reason": "renewal is a cycle, and a cycle makes finished work provisional" },
    { "word": "refill",   "reason": "implies a supply that empties and is restored, which no quantity in this game does" },
    { "word": "restart",  "reason": "begin-again framing; the 'seasons' reframe of rebirth was offered and declined" }
  ],
  "deliberatelyNotRequested": [
    { "word": "again", "why": "the forbidden thing is the phrase 'clear it again'; a word-boundary ban on 'again' would be unenforceably broad and would catch legitimate copy" }
  ],
  "disjointFrom": ["cid/theme/vocabulary/02-banned-words.md's 8 shipped entries", "cid/theme/lore/01-the-past.md L1/L3/L5", "cid/theme/tone/01-register.md P10 mood words", "cid/theme/identity/01-player-role.md's 11 role words", "cid/theme/fantasy/03-inhabiting.md's 8 deferral words"],
  "shippedPlayerFacingStringsAtRisk": 0,
  "coinsTerms": []
}
```

## Consequences for other work

- **Promise-over-time work** *(sheet `02`)*: inherits the axis and a prohibition. The hour-ten promise
  may not be *more reveals* and may not be *a fuller logbook as such*. It has to be stated as accrued
  done-ness.
- **Inhabiting work** *(sheet `03`)*: the in-between minutes are the minutes when done-ness is
  visibly accruing. `03` may not name the feeling *anticipation of a reveal*; that re-promotes the
  register I demoted.
- **World-scale and passage work**: reclamation is demoted to per-area, so the fantasy does **not**
  promise that the world ends up reclaimed, and the endless-place contradiction costs the fiction
  nothing. Owed: a cleared area must read as **finished at area scale**, from outside it, with no
  text; and if finished geometry collapses to a flag, the *count* of finished areas must survive as
  something a player can see.
- **Duplicate-handling work**: a duplicate is the one event in the game that adds **nothing
  permanent**. It may not be dressed as a reward and may not be given a conversion into the record.
  The honest reading is *already had*.
- **Set-content and discovery-rate work**: each Find is a **one-time event per name**, so what
  happens after the last first-time Find is a fiction problem as well as a content problem.
- **Naming work** *(owner of `vocabulary`)*: the seven entries in the block above, offered not
  imposed, plus the ratification of `treasure` and `loot`.
- **Price-and-SKU work**: **no consumable SKU, no expiring boost, no refill and no reset purchase.**
  A consumable is the one purchase shape whose value is used up.
- **Sound-design and visual-effect work**: the cue that carries this register most often is
  **completion**, not the reveal, because completion fires several times a session while a first-time
  reveal is finite. No cue or effect may read as a loop closing and reopening.
- **Discovery and marketing work**: *"restoration game"* stays as the shelf label `[brief: binding]`.
  The store line may **not** promise a world that ends up reclaimed, and may not sell the index as
  novel.
- **Art — Environment**: nothing may make cleared ground look temporary — no wilting, no settling
  dust, no debris drifting back onto cleared stone, no bloom that fades.

## Acceptance criteria

Counts are over the 43 player-facing strings `playerFacingStrings()` extracts from the merged
manifest.

1. **Gap-3 ratification check.** `vocabulary.bannedWords` contains both `treasure` and `loot`, and
   the 24 `collection.sets[].relics` strings return **0** hits for
   `gold|gilt|gilded|gem|gems|jewel|jewels|coin|coins|hoard|treasure|crown|precious`, whole-word and
   case-insensitive. **Verified 24 of 24 pass as written; this sheet requests 0 renames.**
2. **Irreversibility check.** Over the 43 player-facing strings,
   `regrow|regrowth|respawn|reset|renew|refill|restart|seasonal|season|cycle` returns **0** hits,
   whole-word and case-insensitive. **Verified 0 of 43 today.**
3. **Amendment-disjointness check.** The seven `bannedWordsRequested` entries share **0** words with
   `vocabulary.bannedWords` as shipped (8 entries), and each carries a non-empty `reason`, so
   `vocabulary`'s own `check()` passes if all seven are merged. Adding all seven raises **0** new
   merge problems against the 43 shipped strings.
4. **Cost check.** This sheet coins **0** terms, requests **0** new player-facing strings, **0** new
   screens, **0** contract keys, and **0** changes to any of the 43 strings on disk.

## Not decided here

What this fantasy is still offering at hour ten (sheet `02`). The named feeling of the minutes
between peaks (sheet `03`). One ruin or many, and what a cleared area physically becomes (world-scale
and passage work). Who the player is (`cid/theme/identity/01-player-role.md`, already ruled). The
ruin's history (history work, already ruled). Every word, including whether the seven offered bans
are accepted (naming work, owner of `vocabulary`). How duplicates are handled (Systems). Discovery
rates per depth tier (Meta & Content). The reveal and completion cues (Audio and mood-and-beat work).

## Pushing back

**Two `[brief: soft]` items are overruled, and both were already overruled on disk by somebody else.**

**1 · *"Relics must read as treasure"*** (`04-PRESENTATION.md`, reason 1 for `fantasy-ornate`). **I
ratify the *not treasure* side.** History work overruled it explicitly and Vocabulary shipped the ban,
so this is concurrence, which that sheet asked for by name. My own reason is the register one:
**treasure is a register of worth, and worth is convertible**, while this economy converts nothing.
**`fantasy-ornate` survives untouched** on its second stated reason — green overgrowth on warm stone
is high-contrast, which the accessibility requirement depends on.

**2 · *"An overgrown ruin being reclaimed"* as the fantasy** (`01-FOUNDATION.md`, `[brief: soft]`
`[you accepted: R2 Q3]`). **The subject matter is ratified verbatim**; what I overrule is its status
as *the promise*. Reclamation implies a place that ends up reclaimed, and *"Endless via shuffled
authored chunks"* `[brief: binding]` guarantees the place never ends. A promise the design cannot
keep is worse than a smaller one it keeps completely.

**Nothing binding is overruled.** If a reviewer reads *"restoration game, not an incremental"* as
also fixing the register, then this sheet is the defect and the fix is upstream.

## Flagged to the developer

**The register was never asked about**, so the whole of this sheet is `[cid: decided]`.

| alternative | why I did not take it | cost of overruling me |
|---|---|---|
| **Record-keeping** — the game is about completing an index | The format is occupied at ~4.5bn and ~56M visits (Fisch, DIG), and it makes the cleared ground incidental, which is the only unoccupied half | **Moderate.** Sheets `02` and `03` are rewritten and the store line changes. No contract value moves |
| **Revelatory** — the promise is the before-and-after | Occupied by the cleaning genre at 26.6M visits a quarter, delivered *better* because nothing stays clean; and it is a moment, so it leaves hour ten empty | **Cheap to state, expensive to hold.** It hands sheet `02` a promise that decays by construction |
| **Custodial / restorative** | Closed three ways: the brief declined *"pure restore the ruin"*, history work limited *restored* to exposure, identity work rejected a duty because no party exists to owe it to | **Expensive.** It reopens two wave-1 sheets and needs a repair verb the player does not have |

**My recommendation is the sheet as written**: permanence is the only register that is simultaneously
the brief's own stated payoff, unoccupied as far as anybody has checked, and still true at hour ten
with no new system.

**One ruling I would actually like.** The store says restoration; the game promises permanence. I
have treated *"marketed as a restoration game"* as a shelf label rather than a promise, which is what
lets a binding line and this register coexist. If you intended that line as the fantasy itself, say
so — it is a one-line ruling here and a rewrite of two sheets in history work.
