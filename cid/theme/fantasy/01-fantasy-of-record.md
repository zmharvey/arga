# 01 — Fantasy of record

**Domain:** Fantasy · **Category:** Theme & Narrative · **Wave:** 1

## Decision

**The fantasy of record, one sentence:**

> **An overgrown ruin where the work is one-way: the green you clear never comes back, and the
> object it uncovers is yours from the moment it shows.**

**The register of record is permanence.** Of the four the brief runs at once, one is kept and three
are demoted, each to a stated job:

| the brief's line | status |
|---|---|
| *"Cleared is permanent — overgrowth never returns. This is the payoff"* | **the register.** The promise, and the axis everything accrues along |
| *"An overgrown ruin being reclaimed"* | **subject matter — the vehicle.** Ratified verbatim as *what the place is and what happens to it*, demoted as *the promise*: reclamation describes an area, never the world |
| *"the clearing **is** the revealing"* | **a consequence, and the moment the register is delivered at.** Never the promise — it is the cleaning genre's commodity and it is a moment, not an axis |
| *"an index"* / *"a permanent collection"* | **the display surface.** The index shows the register; it is not the register. A logbook is a format players already know |
| restoration (*"marketed as a restoration game, not an incremental"*) | **the shelf label and the store word, untouched and not the register.** A shelf is not a promise |
| *"what you uncover is what you keep"* | **retained, bounded.** Possessive about a Find, never about the place |

**The trajectory across a long play: nothing about the player changes.** What grows is the quantity
of the world that is permanently finished and the number of index slots that can never empty again.
The fantasy's accrual is entirely outside the person — which is the only place left for it after
power, mastery and rebirth were all removed.

**No `manifest` block: Fantasy owns no contract key, and this decision is not a value.** `SCHEMA` in
`bridge/schema.mjs` holds eleven keys — `area`, `tiers`, `upgrades`, `vocabulary`, `currency`,
`movement`, `patch`, `collection`, `onboarding`, `modules`, `runtime` — owned by `gameplay/*` ×7,
`tech/architecture` ×2, `art/objects` ×1 and `theme/vocabulary` ×1. None holds a register, a promise
or a fantasy. **I could not run `npm run bridge -- --contract`: this session has no shell tool.** The
flag prints `contract()`, which is `key`/`doc`/`owner` straight out of `SCHEMA`, so the source read is
the same rows; the live coverage report is what I do not have.
`[research: repo — bridge/schema.mjs:29-300 and :463, read this run]`

**This sheet coins zero terms.** *Permanence* is the brief's own word, used in five sheets.

---

## Why

### The brief runs four registers and picks none, and that is gap 2

*"the clearing **is** the revealing — what you uncover is what you keep"* (`CONCEPT.md`) is
revelation and possession in one clause; *"revealed objects enter the permanent collection"* /
*"the collection is the only finishable thing"* (`01-FOUNDATION.md`, `03-META.md`) is record-keeping;
*"a **restoration** game, not an incremental"* (`05-OUTWARD.md`) is custodial; *"An overgrown ruin
being **reclaimed**"* (`01-FOUNDATION.md`) is reclamation. All four are `[brief: soft]` or a
positioning claim; nothing in six sheets reconciles them. Picking is therefore work the brief left,
not a preference `[cid: decided]`.

### Permanence wins because it is the only candidate that is binding *and* unoccupied *and* still true at hour ten

**Binding.** *"**Cleared is permanent — overgrowth never returns.** This is the payoff and it is
load-bearing."* `[brief: binding]` `[you chose: R2 Q1]` (`01-FOUNDATION.md`). *"Slow regrowth and
decay-if-you-leave were both offered and declined."* No other candidate register is stated as *the
payoff* anywhere in the brief.

**The axis argument, which is the decisive one.** A register is the axis a fantasy accrues along.
This design deleted every other axis by name: *"**No rebirth.**"* and *"**No offline
accumulation.**"* `[brief: binding]` `[you chose: R2 Q2]`, *"not a power fantasy"* `[brief: soft]`
×3, *"**No mastery layer.** ... **Stated so nobody invents one.**"* `[brief: soft]` `[I assumed]`
(`03-META.md`). Four axes removed. What is left with anything on it is the count of things that are
done and cannot be undone: cleared ground and filled slots. Choosing any other register would name a
promise the game has no axis to deliver over time `[cid: decided]`.

**Unoccupied, on the evidence I have.** *"The one property no occupant I found has is permanence at
area scale"* — cleaning games re-dirty per job, dig sites refill, Fisch's water is inexhaustible,
Grow a Garden's plot grows rather than is reclaimed
`[research: relayed from cid/theme/fantasy/_lead.md — fetched in the index run, not re-fetched here]`.
Two checks of my own this run, below, both hold it up.

### Revelation is demoted because it is occupied, and I verified the occupant's shape myself

**Carpet Cleaning Simulator's loop is repeatable contracts plus rebirth**: *"Accept job → clean all
required zones → collect payment → upgrade gear → unlock harder jobs"*, with rebirth from level 50
`[research: https://carpet-cleaning-simulator.wiki/guides/how-to-play/]`. At ~26.6M visits in a
quarter `[research: relayed from cid/theme/fantasy/_lead.md]`, that is a much larger game delivering
before-and-after revelation far more often than this one can, precisely *because* nothing it cleans
stays clean. **Promising revelation is promising the thing an occupant delivers better** — my domain
index's rule 6, applied.

**And the subject matter itself is not novel off-platform.** `Overgrown Cleaner` (Steam) ships
clearing overgrowth to reveal *"buried walls and fences"* and *"buried paths"*, with *"Salvageable
scrap, Repairable parts, Strange but useful leftovers"* that are sold or crafted, and **no promise
anywhere that cleared ground stays cleared**, and no logbook
`[research: https://store.steampowered.com/app/3164790/Overgrown_Cleaner/`, fetched this run`]`.
**This qualifies my own index**, which reported *"no shipping game found"* for the reclaim-overgrowth
fantasy after four Roblox-scoped searches: the subject matter exists, off-platform, with the finds as
*materials*. It does not contest Roblox occupancy and it does not touch `[you chose: R1 Q1]` — the
noun was never going to differentiate. It does show that clearing-plus-buried-things without
permanence is a shape somebody already shipped, which is the argument for where the register sits.

**The structural reason, independent of occupancy:** a revealed thing is revealed once. With *"There
is no failure state"* and *"Zero tension is deliberate"* `[brief: soft, elevated]` (`02-GAMEPLAY.md`,
`HANDOFF.md`), most minutes are neither reveal nor completion, and a register that only exists at the
peak leaves those minutes with nothing. Naming those minutes is sheet `03`'s, and it can only do it
under a register that holds between peaks.

### Record-keeping is demoted to a surface, because the format is familiar and the ground is the half nobody else has

Filling a logbook is mainstream at very large scale: DIG's Collection is *"a detailed in-game
logbook"* of 601 items with zone completion unlocking Mounts; Fisch's Bestiary is the same instrument
at ~4.5bn visits with page-completion rewards
`[research: relayed from cid/theme/fantasy/_lead.md]`. So a promise resting on the index being
interesting is a promise two larger games already keep. This changes nothing about *where distinction
lives* — *"the hidden-collection layer, not the noun"* `[brief: binding]` `[you chose: R1 Q1]` is a
statement about which **system** distinguishes the game, and I am not touching it. A system can be
the differentiator while the promise runs along a different axis; the index is where permanence is
*counted*, and the ground is where it is *stood on*. Making record-keeping the register would make
the cleared ground incidental, and the cleared ground is the only unoccupied half.

### Restoration is kept as the shelf and refused as the register, which overrules nothing binding

*"this is being marketed as a **restoration game, not an incremental**"* `[brief: binding]`
`[you chose: R4 Q2]` is a statement about which category the game is sold in, and it stands
unaltered: it moves the game off the shelf every competitor sits on. **A shelf label is not a
promise about what the player is doing**, and three things on disk make restoration unavailable as
the promise:

- The brief refused it at hook-line level: *"Pure 'restore the ruin' was declined for underselling
  the collection"* `[brief: soft]` `[you accepted: R6 Q1]` (`05-OUTWARD.md`).
- History work already limited the word: *"does 'restored' claim reconstruction? **Only exposure.**
  Nothing is rebuilt, repaired, or added"*, with `rebuild`, `repair`, `mortar`, `scaffold` on a
  runnable ban list (`cid/theme/lore/01-the-past.md`, L5) `[research: repo — read this run]`. A
  restorative register promises a repair verb the player does not possess: *"Input: movement only"*
  `[brief: soft]` `[you accepted: step 6 Q3]`.
- Custodianship is closed from the identity side: *"custodian · caretaker"* was rejected because *"a
  duty is owed to somebody, and nobody exists to owe it to"* and *"a duty also means something is
  lost if the work stops, which is tension"* (`cid/theme/identity/01-player-role.md`)
  `[research: repo — read this run]`. My register is admissible under that sheet's own test: it says
  the place is **not owned**, and attaches **no obligation** to anybody.

Restoration-plus-collection is also the closest occupied neighbour anyone found: `reStore`,
*"Discovery old antiques, restore them to their former beauty ... share your collection"*, ~1.05M
visits `[research: relayed from cid/theme/fantasy/_lead.md]`.

### Possession survives only where it was already ratified, and only as *had*, not as *worth*

*"what you uncover is what you keep"* (`CONCEPT.md`) is the brief's own line and it stays, in the
half identity work has already settled: *"The ruin is never theirs; each Find is theirs from the
moment it surfaces"* `[research: repo — cid/theme/identity/01-player-role.md, read this run]`. My
sentence's second clause is that ruling stated as a promise, and it answers my index's gap 6 from the
fantasy side: **the promise is possessive about a Find and non-possessive about the place.**

The bounding matters because possession-as-enrichment is the largest occupied fantasy in the map:
Treasure Hunt Simulator, ~709M visits, whose *"finds are currency rather than a record"*
`[research: relayed from cid/theme/fantasy/_lead.md]`. This game cannot make that promise anyway —
*"**One currency.**"* with clearing as the only faucet `[brief: soft]` `[you accepted: R5 Q3 → R4
Q3]`, and *"duplicates have no sink"* with *"solve duplicates without adding a currency"*
`[brief: soft]` (`02-GAMEPLAY.md`). Nothing converts a Find into anything. So a Find's worth is that
it is **irreversibly had**, which is the register, and not that it is worth something, which is a
register the economy forbids.

### The trajectory: nothing changes about the player, stated as a decision rather than a shrug

This answers my index's gap 1, which had **zero interview questions behind it anywhere in the
brief** (`OPEN.md §1` carries no audit row for the player at all) `[cid: decided]`. Identity work
independently reached *"static and non-exclusive: identical at minute one and at hour ten"* and told
this sheet that *"whatever trajectory sheet `01-fantasy-of-record` fixes must be expressed in the
state of the ground and the fullness of the collection, never as a change in who the player is"*
`[research: repo — cid/theme/identity/01-player-role.md, read this run]`. I fix it there, and I add
the part that makes it a fantasy rather than an absence: **the accrual is the one kind that cannot be
taken back.** In the audience's own terms — *"8–14 ... motivated by collection, relaxation,
completion"* `[brief: binding]` `[you chose: R1 Q4]` — it is *I did that, and it stayed done.* No
other Roblox loop in this family can say the second half.

Note the register reaches even the monetization stance without straining: *"**Permanent multipliers
only. Never content access.**"* `[brief: soft]` `[you accepted: R5 Q4]`. A permanent multiplier is
irreversible accrual bought rather than cleared, and content access would make a slot fillable by
purchase — which under this register is the one thing a purchase must never be able to do.

### Wordless deliverability, satisfied without a new surface

My index's rule 2 and its gap 8: *"Clear → reveal inside the first ten seconds. ... **No text, no
tutorial.**"* `[brief: soft]` `[you accepted: R6 Q3]`, and there is no flavour surface in
`04-PRESENTATION.md`'s screen list. Every clause of the sentence is arrivable at from what is
already funded at priority 1:

1. *the green you clear* — overgrowth clears on contact, no input but movement.
2. *never comes back* — per-area cleared state persists; a returning player finds the boundary
   between cleared stone and standing overgrowth exactly where they stopped walking, and core-loop
   work has already made re-entry restore the player's *place* in the lap so that edge is in front of
   them (`cid/gameplay/core-loop/04-lap-vs-session.md`) `[research: repo — read this run]`.
3. *is yours from the moment it shows* — the Find enters a grid of 24 slots with empties visible, and
   no slot ever empties.

**So this sheet requests no copy, no screen and no flavour field.** The fantasy sentence itself is a
designer's sentence and is **never rendered**; it sits outside the 43 player-facing strings that tone
work governs, which is why its *"you"* does not breach that register's P1
(`cid/theme/tone/01-register.md`). If anyone ever renders it, they rewrite it under P1–P10 and that
is their string, not mine.

**`[playtest unknown]` — whether permanence is legible with zero words.** Starting value: **0 strings
of copy** state it. Test range: **0 to 1 string.** What would settle it: ask returning
second-session players in the band *"does the green grow back?"*. If the answer is reliably no, the
register is delivered by the world and no surface is owed; if it is not, exactly one string is owed
and that cost lands on interface-surface work *(wave 4)*, not on this decision. Nothing fetchable
settles it.

---

## Consequences for other work

- **Promise-over-time work** *(sheet `02`, this domain)*: inherits the axis, and inherits a
  prohibition with it. The hour-ten promise may not be *more reveals* (revelation is demoted, and it
  decays with familiarity) and may not be *a fuller logbook as such* (the format is familiar). It has
  to be stated as accrued done-ness. It also inherits the sharpest live threat to this register:
  core-loop work dates 24/24 at **minute 11 of session 1** at shipped values, after which nothing new
  is both permanent and first-of-its-kind.
- **Inhabiting work** *(sheet `03`, this domain)*: the in-between minutes are the minutes when
  done-ness is visibly accruing, and the cleared/standing edge is the only object in the game that
  displays it continuously. `03` may not name the feeling as *anticipation of a reveal*; that would
  re-promote the register I demoted.
- **World-scale work** *[currently Setting Lead, this wave — `02-extent`, `04-permanence-and-passage`]*:
  two things, one free and one owed. **Free:** reclamation is demoted to per-area, so the fantasy does
  **not** promise that the world ends up reclaimed, and the endless-place contradiction (its gap 4,
  my gap 5) costs the fiction nothing. **Owed:** a cleared area must read as **finished at area
  scale**, from outside it, with no text. And if a finished area's geometry collapses to a completion
  flag per `OPEN.md §2`, the *count* of finished areas must survive as something a player can see —
  the register dies quietly if finished work becomes invisible.
- **Duplicate-handling work** *[currently Systems, wave 2]*: under this register a duplicate is the
  one event in the game that adds **nothing permanent**. It may not be dressed as a reward and it may
  not be given a conversion (already forbidden without a currency). The honest reading is *already
  had*, and whatever is built should not contradict that.
- **Set-content and discovery-rate work** *(wave 3)*: the register makes each Find a **one-time event
  per name**, so what happens after the last first-time Find is a fiction problem as well as a content
  problem. Also: set-completion bonuses are permanent, which is inside the register and needs no
  fiction.
- **Naming work** *[currently Vocabulary Lead, this wave, owner of the `vocabulary` key]*: **offered,
  not imposed** — seven candidate `bannedWords` entries that no existing list covers, each because it
  promises a world that undoes the player's work against `[you chose: R2 Q1]`: `regrow`, `regrowth`,
  `respawn`, `reset`, `renew`, `refill`, `restart`. These duplicate neither history work's L1/L3/L5
  lists nor tone work's mood-claim list. `again` is **deliberately excluded**: the forbidden thing is
  the phrase *clear it again*, and a word-boundary ban on `again` would be unenforceably broad. This
  sheet coins nothing, so the canonical list gains no term from it.
- **Price-and-SKU work** *[currently Monetization, wave 3]*: **no consumable SKU, no expiring boost,
  no refill and no reset purchase.** A consumable is the one purchase shape whose value is used up,
  which contradicts the register directly. `03-META.md` records that *"the premium SKU has no home"*
  — it may not be given one by making it a consumable.
- **Sound-design and visual-effect work** *(wave 4)*: the cue that carries this register most often is
  **completion**, not the reveal, because completion fires three to seven times a session at shipped
  values while a first-time reveal is finite. Nothing about intensity or ordering is decided here.
  One prohibition: no cue or effect may read as a loop closing and reopening.
- **Discovery and marketing work** *(wave 5)*: *"restoration game"* stays as the shelf label
  `[brief: binding]`, and the hook line stays. The store line may **not** promise a world that ends up
  reclaimed, and may not sell the index as novel. On the evidence above, the line worth writing is the
  permanence.
- **Art — Environment** *(wave 4)*: nothing may make cleared ground look temporary — no wilting, no
  settling dust, no debris drifting back onto cleared stone, no bloom that fades. This is narrower
  than history work's *"exposure, not reconstruction"* and points the other way: not only must nothing
  be rebuilt, nothing may look like it is being lost.
- **Whoever owns the CID→build seam**: this register reaches the build only as a constraint on strings
  other domains own, and `npm run bridge` will report COMPLETE whether or not a word of it survives.
  Criteria 1 and 2 below are the only mechanical trace it has.

---

## Acceptance criteria

Counts are over the 43 player-facing strings `playerFacingStrings()` extracts from the merged
manifest, as enumerated in `cid/theme/tone/01-register.md`.

1. **Gap-3 ratification check, against two sheets.** `cid/theme/vocabulary/02-banned-words.md`'s
   `bannedWords` contains both `treasure` and `loot` (**2 of its 8 entries as written**), and the 24
   `collection.sets[].relics` strings in `cid/gameplay/meta/02-the-collection.md` return **0** hits for
   `gold|gilt|gilded|gem|gems|jewel|jewels|coin|coins|hoard|treasure|crown|precious`, whole-word and
   case-insensitive. **Verified 24 of 24 pass as written; this sheet requests 0 renames.**
2. **Irreversibility check.** Over the 43 player-facing strings, `regrow|regrowth|respawn|reset|renew|refill|restart|seasonal|season|cycle`
   returns **0** hits, whole-word and case-insensitive. **Verified 0 of 43 today.** The two
   `respawn` occurrences in `cid/tech/architecture/02-module-plan.md` are exempt — `modules[].criteria`
   is not player-facing per `cid/theme/tone/01-register.md`, and both strings *assert* permanence
   (*"a rejoining player's already-cleared patches do not respawn"*) rather than deny it.
3. **Trajectory check, against `cid/theme/identity/01-player-role.md`.** This sheet's `## Decision`
   section contains **0** occurrences of `stronger|faster|better|powerful|skill|skilled|mastery|rank|level`
   and names **0** persons, ranks, places, sets or Finds — so the trajectory it fixes is expressible
   entirely as ground state and index fullness, which is what that sheet's consequence (b) requires of
   it.
4. **Cost check.** This sheet coins **0** terms, carries **0** `manifest` blocks, and requests **0**
   new player-facing strings, **0** new screens and **0** changes to any of the 43 strings on disk.

---

## Not decided here

What this fantasy is still offering at hour ten, and what is promised about ever being finished
(sheet `02`, this domain). The named feeling of the minutes between peaks (sheet `03`). One ruin or
many, which way depth points, and what a cleared area physically becomes (world-scale work, this
wave; then persistence work). Who the player is and whether they are ever named (role-and-cast work,
already ruled). The ruin's history and what stays unsaid (history work, already ruled). Every word:
the class noun, the tier names, the area labels, the set labels, the 24 Find names (naming work plus
the owners of `collection`, `tiers`, `area`, `upgrades`). How duplicates are handled (Systems, wave
2). Discovery rates per depth tier and what exists after 24/24 (Meta & Content, wave 3). The reveal
and completion cues, their intensity and their ordering (Audio and mood-and-beat work). Whether any
surface ever states any of this (interface-surface work, wave 4, then the pattern registry).

---

## Pushing back

**Two `[brief: soft]` items are overruled, and both were already overruled on disk by somebody else.**

**1 · *"Relics must read as treasure"*** (`04-PRESENTATION.md`, reason 1 for `fantasy-ornate`,
`[brief: soft]` `[you accepted: R6 Q2 → R5 Q2]`). **I ratify the *not treasure* side of my index's
gap 3.** History work overruled it explicitly and Vocabulary shipped the ban, so I am concurring
rather than opening a front — and concurrence is required, because that sheet asked for *"a stated
ratification of it, not silence"*. My own reason is the register one: **treasure is a register of
worth, and worth is convertible**, while this economy converts nothing — one currency, clearing as its
only faucet, no Find sink at all. A treasure register would promise an exchange the design forbids.
Third reason, relayed: treasure-as-fantasy is occupied at ~709M visits. **`fantasy-ornate` survives
untouched** on its second stated reason — green overgrowth on warm stone is high-contrast, which the
accessibility requirement depends on — and ornament is a property of carved stone and cast fittings.

**2 · *"An overgrown ruin being reclaimed"* as the fantasy** (`01-FOUNDATION.md`, `[brief: soft]`
`[you accepted: R2 Q3]`). **The subject matter is ratified verbatim and is not in question**; what I
overrule is its status as *the promise*. Reclamation implies a place that ends up reclaimed, and the
design guarantees the place never ends: *"Endless via shuffled authored chunks"* `[brief: binding]`
`[you chose: R5 Q1]` against *"the collection is the only finishable thing"*. A promise the design
cannot keep is worse than a smaller promise it keeps completely, and *"the noun is a vehicle"*
`[brief: binding]` `[you chose: R1 Q1]` already says the subject matter was never carrying the
promise.

**Nothing binding is overruled anywhere in this sheet.** *"Restoration game, not an incremental"*
`[brief: binding]` is kept as the positioning claim it is written as; if a reviewer reads that line as
also fixing the register, then this sheet is the defect and the fix is upstream, not here.

---

## Flagged to the developer

**The register was never asked about**, so the whole of this sheet is `[cid: decided]` against a brief
that runs four registers at once. Three alternatives were genuinely live.

| alternative | why I did not take it | cost of overruling me |
|---|---|---|
| **Record-keeping** — the game is about completing an index; the ground is the means | The format is occupied at ~4.5bn and ~56M visits (Fisch, DIG), so the promise is one two larger games keep better; and it makes the cleared ground incidental, which is the only half nobody occupies | **Moderate.** Sheets `02` and `03` are rewritten and the store line changes. No contract value moves; the 24 Find names and the index survive either way |
| **Revelatory** — the promise is the before-and-after, the moment of seeing | Occupied by the cleaning genre at 26.6M visits a quarter, delivered *better* precisely because nothing stays clean (verified this run); and it is a moment, so it leaves the between-minutes and hour ten empty | **Cheap to state, expensive to hold.** It hands sheet `02` a promise that decays by construction |
| **Custodial / restorative** — the player holds the place in trust and restores it | Closed three ways already: the brief declined *"pure restore the ruin"*, history work limited *restored* to exposure with a runnable ban on repair words, and identity work rejected a duty because no party exists to owe it to and a duty is tension | **Expensive.** It reopens two wave-1 sheets in another domain and needs a repair verb the player does not have |

**My recommendation is the sheet as written**, on one argument: permanence is the only register that
is simultaneously the brief's own stated payoff, unoccupied as far as anybody has checked, and still
true at hour ten with no new system.

**Two rulings I would actually like from you.**

1. **The store says restoration; the game promises permanence.** I have treated *"marketed as a
   restoration game"* as a shelf label rather than a promise, which is what lets a binding line and
   this register coexist. If you intended that line as the fantasy itself, say so — it is a one-line
   ruling here and a rewrite of two sheets in history work.
2. **The register runs out of fuel at minute 11 at shipped values.** Core-loop work dates 24/24
   inside the first session and states the fix (fewer Finds per area, more areas per depth, plus one
   relaxed schema invariant). I am flagging it again from the fiction side because it is *this*
   register that breaks: after the last first-time Find, cleared ground is the only thing still
   accruing permanently, and no sheet has yet said whether that is enough. **Recommendation: take
   core-loop work's fix (i).**

Sources fetched this run: [Carpet Cleaning Simulator — how to play](https://carpet-cleaning-simulator.wiki/guides/how-to-play/) · [Overgrown Cleaner on Steam](https://store.steampowered.com/app/3164790/Overgrown_Cleaner/). Every other occupancy figure is relayed from `cid/theme/fantasy/_lead.md` and marked as such.
