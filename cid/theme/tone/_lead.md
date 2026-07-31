# Tone — domain index

**Category:** Theme & Narrative · **Wave:** 1 · Reads: `HANDOFF.md`, `CONCEPT.md`, `00-CORE.md`,
`01-FOUNDATION.md`, `02-GAMEPLAY.md`, `03-META.md`, `04-PRESENTATION.md`, `05-OUTWARD.md`,
`OPEN.md` (all six sections), `research/landscape.md`, `research/grass-incremental.md`, and
`cid/theme/_category.md`.

**Subject:** mood · humor level · seriousness · pacing of emotional beats in the fiction ·
tonal do-nots. **Not mine:** the visual or audio execution of that tone (Art & Visuals, Audio).

---

## What the brief gave me

| constraint | tag |
|---|---|
| *"**Tone: warm, aged, unhurried.** Not spooky, not grim, not a power fantasy."* (`01-FOUNDATION.md`) | `[brief: soft]` — inherits `[you accepted: R2 Q3]` |
| *"**Tone note:** warm and unhurried, not spooky. This is reclamation, not a haunted place."* (`04-PRESENTATION.md`) | `[brief: soft]` — `[you accepted: R6 Q2 → R5 Q2]` |
| **Dry and sparse.** Humor lives only in relic flavour text. No system copy, UI, error message, tutorial text, or store copy is funny. No relic name is a pun. | `[brief: binding]` — **developer, in session 2026-07-30, not present in any sheet.** A downstream reader cannot find this by reading the brief. |
| *"**There is no failure state.** No death, no losing, no loss of progress"* / *"**Zero tension is deliberate.** ... Satisfaction comes from before/after and discovery, nothing else."* (`02-GAMEPLAY.md`) | `[brief: soft]` on the *choice* (`[you accepted: step 6 Q2]`) |
| *"nobody downstream should invent tension to fill the gap"* (`02-GAMEPLAY.md`), restated in `HANDOFF.md` as one of six things to know before designing anything | `[brief: binding]` on the *instruction*. My launcher directed me to treat zero tension as binding; the sheet tag on the design choice is still `[you accepted]`, so both are recorded rather than collapsed. **No sheet here may argue tension back in.** |
| *"**Consequence: audio and visual feedback carry the entire load**"* (`02-GAMEPLAY.md`) | consequence, not a decision — and the reason sheet 04 exists |
| *"**8–14, mobile-heavy, short sessions.**"* · *"casual but **genre-literate**"* · *"motivated by **collection, relaxation, completion**"* · *"10–20 minute active sessions"* (`00-CORE.md`) | `[brief: binding]` — `[you chose: R1 Q4]`, both ends of the band declined by name |
| *"this is being marketed as a **restoration game, not an incremental**"* (`05-OUTWARD.md`) | `[brief: binding]` — `[you chose: R4 Q2]` |
| *"**Cleared is permanent — overgrowth never returns.**"* / *"**No rebirth.**"* (`01-FOUNDATION.md`) | `[brief: binding]` — `[you chose: R2 Q1 / R2 Q2]`. No beat may be a return, a cycle, or a renewal. |
| *"**Clear → reveal inside the first ten seconds.** ... **No text, no tutorial.**"* (`02-GAMEPLAY.md`) | `[brief: soft]` — `[you accepted: R6 Q3]`. Everything this domain writes is optional and reaches the player after second ten. |
| *"Also declined: extending to a text-free comprehension rule"* (`04-PRESENTATION.md`) | `[brief: soft]` — text **is** permitted. The broader no-text rule was offered and refused. |
| *"a relic reveal owns the best sound in the game"* · *"An area's completion gets a short resolving chord — the only 'achievement' sound"* · *"Music sparse and low"* · *"Reveals and completions are the two emotional peaks"* (`OPEN.md §2`) | `[brief: soft]` — `[I assumed]`, explicitly overridable. **This is the closest thing the brief has to a beat map, and it lives in an audio default.** |
| *"Target: the **smallest game that still gives every creative area real work.**"* (`00-CORE.md`) | `[brief: binding]` — `[you chose: R1 Q3]`. Cuts both ways: no thin sheets, no fiction needing unfunded content. |
| *"**`ui-forge` vibe key: `fantasy-ornate`**"* · *"ornamented, warm, aged, crafted. Stone and foliage, not candy."* (`04-PRESENTATION.md`) | `[brief: soft]` — an override of the register reaches this |
| Priority 3 exclusions (`03-META.md`) | `[brief: soft]` on the ordering (`[I assumed]`, inherited by everyone per `OPEN.md §5` assumption 7); individual items harder, per `cid/theme/_category.md` |

**Not upgraded.** *"Warm, aged, unhurried"* appears twice and reads settled. Both instances are
`[you accepted]` consequences of a `[you accepted]` theme. It is relayed as `[brief: soft]` and
sheet 01 may argue with it. If it does, `04-PRESENTATION.md` used it to justify `fantasy-ornate`
over `cartoon-vibrant`, so the override reaches Art & Visuals and must survive that.

---

## What the brief did not give me

| # | gap | routed to |
|---|---|---|
| 1 | **No surface exists for flavour text.** The binding humor decision names *relic flavour text* as the one place humor lives, but no sheet establishes such a field. `04-PRESENTATION.md`'s screen list is `collection-index`, `upgrades`, `areas`, `shop`, and the build stage produces only *"centred dismissible panels holding a grid of items"*. | **Sheet 03**, which states a delivery requirement and does not assume the surface. The decision whether the surface exists is *on-screen-copy-surface design* [currently: UI/UX, wave 4] plus the pattern registry. If it cannot be built, the humor level has nowhere to live and that is a finding about stage 0, not a tone problem. |
| 2 | **The humor decision constrains a surface the brief says does not exist.** It forbids funny *"tutorial text"*; `02-GAMEPLAY.md` says *"No text, no tutorial."* | **Sheet 03.** State the ban per surface and conditional on the surface existing, so it neither invents a tutorial nor leaves a hole if onboarding copy later appears. |
| 3 | **No reading level, word budget, or per-label length exists anywhere for the 8–14 band.** The band is binding and text is permitted (the text-free rule was declined), yet nothing sets a target. | **Sheet 01** states this domain's requirement. The global on-screen copy budget belongs to *screen-copy budgeting* [currently: UI/UX — Screens]; Vocabulary Lead states its own. Sourced ranges are in Research owed; the choice is the sheet's. |
| 4 | **There is no beat map.** The brief names two peaks only inside an `[I assumed]`, overridable audio default. Nothing states what the baseline between peaks should feel like, whether any third beat exists, or whether the ceiling rises with depth. With no failure, timer or decay, this is the only instrument telling audio, effects and UI feedback where the game is allowed to peak. | **Sheet 04.** Its output is `[cid: decided]` built on a `[brief: soft]` default, and must say so. |
| 5 | **Whether the game states its own mood to the player is unaddressed.** All three genre games fetched self-describe as *"relaxing"* in store copy; this brief's hook line is *"Clear the overgrowth, find what's buried"* and never claims a mood. Nothing says whether the fiction is allowed to tell the player it is calm. | **Sheet 02.** Store copy itself is *store-listing copy* [currently: Discovery & Marketing, wave 5] and is not decided here; sheet 02 decides only whether the fiction is permitted to claim its own mood. |
| 6 | **System and error copy has no register at all.** The humor decision forbids funny error messages, so error copy is presumed to exist, but no sheet gives it a voice, and the brief has no failure state to hang one on. | **Sheet 01**, which owns the default voice for every non-flavour surface including system and error strings. |
| 7 | **Zero tension is, by the brief's own admission, untested.** `OPEN.md §6`: *"Possibly correct for a relaxing restoration game; **entirely unverified**."* | **Sheet 04**, as a `[playtest unknown]` with a starting value and a test range. It may not resolve the doubt by adding tension. |

### Consequences other subjects must absorb

- **Mechanics** [wave 2] owns *"how an area's 'completely clear' moment is celebrated"* (`02-GAMEPLAY.md`). Sheet 04 sets a ceiling on that celebration relative to a relic reveal. The ceiling is tonal; the celebration is theirs.
- **Audio** [wave 4] holds the `OPEN.md §2` default that already ranks the two peaks. Sheet 04 either ratifies that ranking or overrides it; either way Audio inherits a ranking it did not set.
- **Vocabulary Lead** [this category] inherits *"No relic name is a pun"* directly, and inherits sheet 01's sentence-length and reading-level requirement as a bound on term length.
- **Fantasy Lead** [this category] owns *"the emotional promise at minute 1 versus hour 10"*. Sheet 04 owns beats inside a session and their relative intensity; it does not own the long arc and must remain compatible with whatever Fantasy writes.
- **Discovery & Marketing** [wave 5] gets a measured fact rather than an instruction: the genre's store register is exclamatory, emoji-dense and imperative (three games fetched), while this game's positioning is *restoration, not incremental*. A quiet listing in a market where every neighbour shouts is a discoverability question, not a tone question. Sheet 01 bounds the game's voice; it does not bound the store listing, and it should say so.

### Scope check

Nothing in this subject is priority 3, so nothing here is excluded and all five sheets are
assignable. One live risk: a beat map is exactly where excluded systems get smuggled back in.
**No sheet may name a beat that presumes a daily visit, a streak, a returning benefactor, a
festival or calendar moment, a season, another player's progress, or anything the world did
while the player was away.** Each of those imports a priority-3 system by implication. Stated
here so sheet 04's writer inherits it as a constraint rather than discovering it in review.

---

## Why 5 sheets

The subject splits on two axes that do not overlap: *whose voice* and *when the game is loud*.
The voice axis divides once more on a line the binding humor decision already drew for me:
flavour text is permitted humor and everything else is not, so the default voice (01) and the
flavour voice (03) are two different specs written to two different rules, and merging them
would let a writer smear a dry joke into an error string. Sitting between them is a stance
question neither answers, because *how sentences are built* and *how straight the world plays
itself* are independently settable: a plain register can still wink at the player, and a
reverent one can still be exclamatory. That is 02, and dry humor is unwritable until it is
settled, since dryness only exists against a straight world. The second axis is 04, which the
brief leaves emptiest and which the handoff makes load-bearing: with no failure, timer or
decay, the beat map is the only artifact telling Audio, Art and UI feedback where this game is
permitted to peak, and it must be redoable without touching the voice work. 05 is separate
because it is an audit instrument, not a spec: four other categories and two later waves will
cite it, and a forbidden list buried as the last heading of a register sheet gets read by
nobody. Two candidate splits were rejected. A "voice inventory" sheet counting how many voices
exist was folded into 01 and 03, because the humor decision already forces the split and
counting it again is one decision described twice. A separate depth-escalation sheet was folded
into 04, because a beat map that does not say whether the ceiling rises deeper in is not
finished.

| # | sheet | must decide |
|---|---|---|
| 01 | `register` | The default voice for every surface that is not relic flavour text, stated as measurable properties a reviewer can check: person, mood, sentence-length ceiling, punctuation and emoji policy, a reading-level target chosen from the two sourced brackets in Research owed, and whether *"warm, aged, unhurried"* survives as the register or is overruled with a stated reason and its cascade into `fantasy-ornate` acknowledged. Must cover system and error strings (gap 6) and state this domain's text requirement for the 8–14 band (gap 3). |
| 02 | `seriousness` | How straight the fiction plays itself: whether the world is presented as factually real, whether the game ever acknowledges the player as a player or itself as a game, whether it is permitted to claim its own mood (gap 5), and how much reverence the ruin's age is treated with. This is the ground dryness in 03 is measured against. |
| 03 | `flavour-and-humor` | What *"dry and sparse"* means as a rule a writer can be held to and a reviewer can fail copy against, including which form of dryness is in play, what proportion of flavour entries carry any humor at all versus none, how the pun ban is checked, and the containment boundary that keeps humor out of every surface the binding decision names. Must state the delivery requirement for a flavour surface that does not exist (gap 1) and scope the tutorial-text clause conditionally (gap 2). May not name relics or write example entries for objects that do not exist yet. |
| 04 | `beat-map` | The complete inventory of moments the fiction is permitted to peak at, their relative intensity ordering, which single moment is the game's loudest, how flat the baseline between peaks is required to be, and whether the ceiling rises as the player goes deeper. Carries gap 7 as `[playtest unknown]` with a starting value and a test range. Everything in it is `[cid: decided]` over a `[brief: soft]` audio default. No seconds, no minutes, no rates, no assets. |
| 05 | `do-nots` | The tonal exclusion list as an audit instrument, each entry phrased as an observable violation another category can be checked against rather than an adjective. Must contain **only** exclusions not already derivable from 01–04, and must cite them rather than restate them; a do-nots sheet that paraphrases the register sheet is a duplicate and fails. Includes the inherited ones (not spooky, not grim, not a power fantasy, no tension invented to fill the gap, no cycle or renewal framing, no mastery or prowess) plus whatever the register itself forbids. |

**Every sheet ends in 2 to 4 checkable criteria** (a value, a count, a state, or an observable
behaviour), per the category verification bar. *"Feels calm"* fails. For this domain that means
criteria of the form "no sentence in this spec's example copy exceeds N words", "this sheet
names zero sounds and zero colours", "the exclusion list contains N entries and each names an
observable violation", "the beat inventory contains exactly N beats and ranks them".

**Boundary all five share:** name no sound, no instrument, no colour, no animation, no timing
number, no asset. Where the tone forces something audible or visible, write it as a requirement
on that subject and let its owner execute. Verification will reject an art or audio asset here,
and it will also reject a mechanic, an economy value, or a pacing number.

---

## Verification note

**Sheet 04 is the most likely to be contradicted, and the contradiction is already scheduled.**
Two other pieces of work hold overlapping authority over the same moments. *Feedback and
celebration design for the completely-clear moment* [currently: Mechanics, wave 2] decides how
that moment is celebrated, and *audio intent* [currently: Audio, wave 4] holds the `OPEN.md §2`
default that already ranks a relic reveal above an area completion. Sheet 04 ranks those two
beats in wave 1, two and three waves before either of them writes. If Mechanics builds a large
completion celebration, or Audio overrides its own default, the ladder inverts and 04 is wrong
rather than merely overruled. The mitigation is in the sheet's own construction: it must state
its ranking as `[cid: decided]` over a `[brief: soft]` default, and it must name the two kinds
of work that can overturn it, so a later wave overrides it deliberately instead of quietly
diverging.

Second-most exposed is **01**, which will be contradicted by *screen-copy budgeting* [currently:
UI/UX, wave 4] if that work sets a label length shorter than the register's sentence ceiling
allows, and by *naming* [Vocabulary Lead, this category] if a canonical term is longer than the
register can carry on a phone-width label. Both are cheap to reconcile if 01 states its
requirement as a bound rather than a preference.

**Least exposed is 03**, and only because its subject is binding. The risk there is not
contradiction but irrelevance: if no flavour surface is ever built, the sheet specifies a voice
with nowhere to speak.

---

## Research owed

`must_verify`: *"Check how the register actually reads to the brief's stated age band. Fetch two
shipping games in the genre and record their tone, so 'warm and unhurried' is measured against
something rather than asserted."* Done before anything below was enumerated. Two were required;
three were fetched.

**Genre register, measured.** All three games in this family self-describe as *relaxing* and
punctuate like a hype trailer. The gap between the word and the punctuation is the finding.

- **`[🌱] Grass Incremental Simulator`** (Unequal Games, the direct reference). Description:
  *"A relaxing lawn-trimming simulator game 🌿 The more you rebirth and upgrade, the more fun
  the game becomes!"*, followed by imperative bulleted features (*"Trim the grass!"*,
  *"Upgrade for faster trimming!"*) and an early-access note. Register: emoji in the title and
  the first line, exclamatory, second-person imperative, enthusiastic rather than jokey. No
  humor and no puns surfaced in the store copy.
  `[research: https://www.roblox.com/games/133086043677134/Grass-Incremental-Simulator]`
  Numbers re-confirmed on a second source: 38.3M visits, 96.2% likes, 10,435 peak CCU,
  1,400 current, and a gamepass list of pure multipliers plus `[OP] Giant Trimmer` at 2,500
  Robux. Note the bracketed `[OP]` prefix: the genre marks its whale item with slang, which is
  a register decision this game will have to make or refuse.
  `[research: https://www.rolimons.com/game/133086043677134]`
- **`[UPDT🍂] Leaves Incremental 🍂`** (PrestigeLabs Studios, a different studio, and the one
  game in the family that ships without rebirth). Description: *"A relaxing leaf-gathering
  simulator! Collect, upgrade, and explore colorful autumn worlds!"* plus *"Gather fallen
  leaves!"*, *"Unlock new areas and discover rare leaf types!"*, *"USE CODE: RELEASE"* and
  *"👍 Enjoying the game?"*. Register: emoji-dense including an update badge inside the title,
  every feature line exclamatory, engagement prompts and a code promo in the description.
  `[research: https://www.roblox.com/games/113380129609386/Leaves-Incremental]`
- **`Scrap Incremental 🧲`** (third, taken for triangulation). Description: *"A relaxing magnet
  simulator game 😎 The more you rebirth and upgrade, the more fun the game becomes!"*, with
  seven distinct emoji, numbered feature brackets, *"Enjoying the game? Leave a Like and
  Favorite!"* and *"Join the Unequal Games group for in-game boosts!"*.
  `[research: https://www.roblox.com/games/92876036717311/Scrap-Incremental]`

**A refinement to the brief's landscape research, from that last quote.** `research/landscape.md`
attributes the shared marketing sentence to *"at least two different studios"* and lists Grass
and Scrap as separate entries. Scrap Incremental's own description sends players to *"the
Unequal Games group"*, which is the reference's studio, so Grass and Scrap are very likely one
studio's template rather than two independent shippers. The independent same-sentence shipper is
PrestigeLabs (Leaves). This does not weaken the brief's conclusion, it sharpens it: the genre's
register norm is more concentrated than the sheet implies, which makes departing from it a
smaller act of contrarianism than the four-game list suggests.
`[research: https://www.roblox.com/games/92876036717311/Scrap-Incremental]`

**What this measures *"warm and unhurried"* against.** The genre baseline is: relaxation as a
claimed noun, energy as the actual delivery. So *"warm, aged, unhurried"* is not a differentiator
if it stays an adjective (every competitor already claims the adjacent one), and it **is** a
differentiator if it is executed at the punctuation level, where none of the three do it. That
is exactly the *"a register and a humor level, not an adjective"* bar, and it is sheet 01's to
clear.

**The age band, sourced.** The band 8–14 straddles the platform's two largest cohorts: among
age-checked daily active users, *"35% are younger than 13, 38% are age 13 to 17, and 27% are 18
or older"*, averaged over the seven days ended 31 January 2026 across the 45% of 144M DAU then
age-verified. Primary source, not an aggregator.
`[research: https://about.roblox.com/newsroom/2026/02/moving-beyond-self-reported-age]`

**Reading level, sourced, decision not taken.** On the standard Flesch-Kincaid mapping, ages
8–11 fall in the 3–6 band and ages 11–14 in the 6–9 band, and *"text intended for readership by
the general public should aim for a grade level of around 8, schooling age 13 to 14."*
`[research: https://readable.com/readability/flesch-reading-ease-flesch-kincaid-grade-level/]`
**Consequence, not a choice I am making:** an 8–14 band spans two brackets, so no single target
serves all of it, and the general-public default of 8 sits at the *top* of the band rather than
the middle. Sheet 01 picks the target and says which end of the band it is serving.

**What I could not verify.**

1. **How the register actually reads to 8–14 year olds.** Nothing fetchable settles this. It is
   reception, not fact. `[playtest unknown]` — starting position is whatever sheet 01 sets;
   the specific tests that would settle it are a read-back comprehension check with players in
   the band against the written copy, and, as a cheap proxy available before any playtest, a
   Flesch-Kincaid score computed on the actual copy once it exists.
2. **Whether any game in this family ships item-level flavour text at all**, which would tell
   sheet 03 whether the surface it needs has genre precedent. Three source types were tried and
   two failed: the Grass Cutting Incremental `Items` wiki returned HTTP 402, and a beginner
   guide returned HTTP 405 (the same 405 pattern `research/grass-incremental.md` already
   records for this genre's guide sites). A third source fetched successfully but characterises
   the game rather than quoting it, offering only that the experience has a *"relaxing,
   meditative quality"* and an *"accessible, straightforward approach"* with no in-game copy
   reproduced. `[research: https://www.rosenberryrooms.com/grass-incremental/]` **Recorded as
   unavailable, not as absent.** The specific fetch that would settle it is an in-client
   screenshot of the reference's collection or tool panel, or any fan wiki page for a game in
   this family that reproduces item text.
3. **Whether the reference's in-game copy matches its store copy.** Only store descriptions were
   reachable. The two Roblox strings that surfaced during fetching (*"Purchase Completed"*,
   *"Error occurred"*) are platform chrome, not the game's own writing, and are **not** evidence
   about the genre's system-copy register. Named because gap 6 would otherwise look answered.
