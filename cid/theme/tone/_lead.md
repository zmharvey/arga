# Tone — domain index

**Category:** Theme & Narrative · **Wave:** 1 · Reads: `bridge/schema.mjs` (the build contract),
`HANDOFF.md`, `CONCEPT.md`, `00-CORE.md`, `01-FOUNDATION.md`, `02-GAMEPLAY.md`, `03-META.md`,
`04-PRESENTATION.md`, `05-OUTWARD.md`, `OPEN.md` (all six sections), `research/landscape.md`,
`research/grass-incremental.md`, `cid/theme/_category.md`.

**Subject:** mood · humor level · seriousness · pacing of emotional beats in the fiction ·
tonal do-nots. **Not mine:** the visual or audio execution of that tone (Art & Visuals, Audio).

**This replaces a 5-sheet index written under the old "bias toward more, smaller sheets" rule.**
The change: one sheet was merged (`seriousness` into `register`), and every sheet is now
justified against the build contract rather than against thoroughness.

---

## Contract keys I own: none

I read `SCHEMA` in `/Users/zachsmacbook/Desktop/Code/arga/bridge/schema.mjs`. It has ten keys:
`area`, `tiers`, `upgrades`, `currency`, `movement`, `patch`, `collection`, `onboarding`,
`modules`, `runtime`. Their `owner` fields are `gameplay/*` (seven), `tech/architecture` (two)
and `art/objects` (one). **Not one key is owned by `theme/*`, and none is owned by tone.**

So **no sheet in this index carries a manifest block, and that is the correct result, not an
omission.** This domain produces zero values a build reads. Its entire output is a bound on
values other domains supply. Stated plainly so verification does not read the absence as a gap
and so nobody adds a manifest block to make a tone sheet look load-bearing.

**Where that bound actually lands.** The contract contains exactly six player-facing string
fields, and my register sheet constrains all six without owning any of them:

| contract field | owner per `SCHEMA` | what this domain bounds |
|---|---|---|
| `currency.name`, `currency.plural` | `gameplay/systems` | register; and note the schema already hard-checks `plural.length > 10` |
| `tiers[].name` | `gameplay/systems` | register; and `04-PRESENTATION.md`'s shape-not-hue rule reaches these too (Vocabulary Lead's row, not mine) |
| `upgrades[].label`, `upgrades[].blurb` | `gameplay/balance` | register. `blurb` is the only free-prose field in the whole contract |
| `collection.sets[].id` and the relic name strings inside `sets[].relics` | `gameplay/meta` | register, plus the binding pun ban |
| `area.label` | `gameplay/meta` | register |
| `patch.material` | `art/objects` | not bounded: an engine material name, not player-facing copy |

`modules[].responsibility`, `modules[].criteria` and `runtime.dataStoreName` are technical
strings a player never sees. **My register does not bound them, and a sheet that tries to has
overreached.** Said here because "register applies to all copy" is the obvious wrong reading.

**Two consequences for other subjects, stated not acted on.** (1) The `SCHEMA` header says the
six relic names are *"literally CID's job"*, yet assigns `collection` to `gameplay/meta`. Whether
this category's naming output has any manifest slot at all is *contract-key ownership work*
[currently: whoever maintains `SCHEMA`'s `owner` fields], not mine. (2) No contract key carries
relic flavour text, item text, system copy or error copy in any form. See gap 1: the one surface
the binding humor decision names is absent from the build contract as well as from the brief.

---

## What the brief gave me

| constraint | tag |
|---|---|
| *"**Tone: warm, aged, unhurried.** Not spooky, not grim, not a power fantasy."* (`01-FOUNDATION.md`) | `[brief: soft]`, inherits `[you accepted: R2 Q3]` |
| *"**Tone note:** warm and unhurried, not spooky. This is reclamation, not a haunted place."* (`04-PRESENTATION.md`) | `[brief: soft]`, `[you accepted: R6 Q2 → R5 Q2]` |
| **Dry and sparse.** Humor lives only in relic flavour text. No system copy, UI, error message, tutorial text, or store copy is funny. No relic name is a pun. | `[brief: binding]`, **developer, in session 2026-07-30, not present in any sheet.** A downstream reader cannot find this by reading the brief. Not re-openable. |
| *"**There is no failure state.**"* / *"**Zero tension is deliberate.** ... Satisfaction comes from before/after and discovery, nothing else."* (`02-GAMEPLAY.md`) | `[brief: soft]` on the *choice*, `[you accepted: step 6 Q2]` |
| *"nobody downstream should invent tension to fill the gap"* (`02-GAMEPLAY.md`), restated in `HANDOFF.md` as one of six things to know before designing anything | `[brief: binding]` on the *instruction*. Both are recorded rather than collapsed: the design choice is `[you accepted]`, the do-not is binding. **No sheet here may argue tension back in.** |
| *"**Consequence: audio and visual feedback carry the entire load**"* (`02-GAMEPLAY.md`) | a consequence, not a decision, and the reason sheet 03 exists |
| *"**8–14, mobile-heavy, short sessions.**"* · *"casual but **genre-literate**"* · *"motivated by **collection, relaxation, completion**"* · *"10–20 minute active sessions"* (`00-CORE.md`) | `[brief: binding]`, `[you chose: R1 Q4]`, both ends of the band declined by name |
| *"a **restoration game, not an incremental**"* (`05-OUTWARD.md`, `CONCEPT.md`) | `[brief: binding]`, `[you chose: R4 Q2]` |
| *"**Cleared is permanent.**"* / *"**No rebirth.**"* (`01-FOUNDATION.md`) | `[brief: binding]`, `[you chose: R2 Q1 / R2 Q2]`. No beat may be a return, a cycle or a renewal. |
| *"**Clear → reveal inside the first ten seconds.** ... **No text, no tutorial.**"* (`02-GAMEPLAY.md`) | `[brief: soft]`, `[you accepted: R6 Q3]`. Everything this domain writes is optional and reaches the player after second ten. |
| *"Also declined: extending to a text-free comprehension rule"* (`04-PRESENTATION.md`) | `[brief: soft]`. Text **is** permitted; the broader no-text rule was offered and refused. |
| *"a relic reveal owns the best sound in the game"* · *"An area's completion gets a short resolving chord, the only 'achievement' sound"* · *"Music sparse and low"* · *"Reveals and completions are the two emotional peaks"* (`OPEN.md §2`) | `[brief: soft]`, `[I assumed]`, explicitly overridable. **The closest thing the brief has to a beat map, and it lives inside an audio default.** |
| *"Target: the **smallest game that still gives every creative area real work.**"* (`00-CORE.md`) | `[brief: binding]`, `[you chose: R1 Q3]`. Cuts both ways: no padded sheets, no fiction needing unfunded content. |
| *"**`ui-forge` vibe key: `fantasy-ornate`**"* · *"ornamented, warm, aged, crafted. Stone and foliage, not candy."* (`04-PRESENTATION.md`) | `[brief: soft]`. An override of the register reaches this. |
| Priority 3 exclusions (`03-META.md`) | `[brief: soft]` on the ordering (`[I assumed]`, inherited by everyone per `OPEN.md §5` assumption 7); individual items harder, per the per-item table in `cid/theme/_category.md` |

**Not upgraded.** *"Warm, aged, unhurried"* appears twice and reads settled. Both instances are
`[you accepted]` consequences of a `[you accepted]` theme, so it is relayed as `[brief: soft]`
and sheet 01 may argue with it. If it does, `04-PRESENTATION.md` used it to justify
`fantasy-ornate` over `cartoon-vibrant`, so the override reaches Art & Visuals and has to
survive that.

---

## What the brief did not give me

| # | gap | routed to |
|---|---|---|
| 1 | **No surface exists for flavour text, in the brief or in the build contract.** The binding humor decision names *relic flavour text* as the one place humor lives. `04-PRESENTATION.md`'s screen list is `collection-index`, `upgrades`, `areas`, `shop`; the build stage produces only *"centred dismissible panels holding a grid of items"*; and `SCHEMA` has no key holding item text of any kind. **The one thing the humor level applies to currently cannot be built and cannot be delivered through the manifest.** | **Sheet 02**, which states a delivery requirement and does not assume the surface. Deciding whether it exists is *on-screen-copy-surface design* [currently: UI/UX, wave 4] plus the pattern registry, and, newly, *contract-key ownership work* [whoever maintains `SCHEMA`]. If none of the three produces a surface, the humor level has nowhere to live, and that is a finding about stage 0 and the seam, not a tone problem. |
| 2 | **The humor decision constrains a surface the brief says does not exist.** It forbids funny *"tutorial text"*; `02-GAMEPLAY.md` says *"No text, no tutorial."* | **Sheet 02.** State the ban per surface and conditional on the surface existing, so it neither invents a tutorial nor leaves a hole if onboarding copy later appears. |
| 3 | **No reading level, word budget or per-label length exists anywhere for the 8–14 band.** The band is binding and text is permitted, yet nothing sets a target. The only length rule in the entire pipeline is `SCHEMA`'s `currency.plural` check at 10 characters with a stated comfortable target of 8, and that is a HUD-fit rule, not a register. | **Sheet 01** states this domain's requirement as a bound. The global on-screen copy budget is *screen-copy budgeting* [currently: UI/UX — Screens]; Vocabulary Lead states its own. Sourced brackets are in Research owed; the choice is the sheet's. |
| 4 | **There is no beat map.** The brief names two peaks only inside an `[I assumed]` audio default. Nothing states what the baseline between peaks feels like, whether a third beat exists, or whether the ceiling rises with depth. With no failure, timer or decay, this is the only artifact telling audio, effects and UI feedback where the game is permitted to peak. | **Sheet 03.** Its output is `[cid: decided]` over a `[brief: soft]` default and must say so on its face. |
| 5 | **Whether the game may state its own mood to the player is unaddressed.** All three genre games fetched self-describe as *"relaxing"*; this brief's hook line is *"Clear the overgrowth, find what's buried"* and claims no mood. Nothing says whether the fiction is allowed to tell the player it is calm. | **Sheet 01** (this arrived from the merged `seriousness` subject). Store copy itself is *store-listing copy* [currently: Discovery & Marketing, wave 5] and is not decided here. |
| 6 | **System and error copy has no register at all.** The humor decision forbids funny error messages, so error copy is presumed to exist, but no sheet gives it a voice, the brief has no failure state to hang one on, and no contract key carries it. | **Sheet 01**, which owns the default voice for every non-flavour surface. It must note that most of what it bounds is copy the manifest does not carry, so the bridge cannot validate it and a human reviewer is the only check. |
| 7 | **Zero tension is, by the brief's own admission, untested.** `OPEN.md §6`: *"Possibly correct for a relaxing restoration game; **entirely unverified**."* | **Sheet 03**, as `[playtest unknown]` with a starting value and a test range. It may not resolve the doubt by adding tension. |
| 8 | **Nothing this category writes has a slot in the build contract.** Every player-facing string in `SCHEMA` is owned by a gameplay or art domain. A register, a humor level and a beat ordering are unrepresentable in the manifest, so they can only reach the build as prose a builder chooses to honour. That is the exact failure mode `bridge/schema.mjs` was written to eliminate. | Not mine to fix, and not a sheet. Routed to *contract-key ownership work* and to whoever sequences CID. Recorded because the honest answer to "what value does Tone hand the build" is "none, by construction of the contract", and that should be a visible decision rather than a discovered surprise. |

### Consequences other subjects must absorb

- **Feedback and celebration design for the completely-clear moment** [currently: Mechanics, wave 2] inherits a ceiling from sheet 03, relative to a relic reveal. The ceiling is tonal; the celebration is theirs.
- **Audio intent** [currently: Audio, wave 4] holds the `OPEN.md §2` default that already ranks the two peaks. Sheet 03 either ratifies or overrides that ranking; either way Audio inherits a ranking it did not set.
- **Naming** [Vocabulary Lead, this category] inherits *"No relic name is a pun"* directly, and inherits sheet 01's sentence-length and reading-level bound as a bound on term length. Sheet 01 must be checkable against the six contract string fields listed above, because that is where naming lands.
- **Emotional promise at minute 1 versus hour 10** [Fantasy Lead, this category] is not sheet 03's. Sheet 03 owns beats inside a session and their relative intensity, and must stay compatible with whatever long arc Fantasy writes.
- **Store-listing copy** [currently: Discovery & Marketing, wave 5] gets a measured fact rather than an instruction: the genre's store register is exclamatory, emoji-dense and imperative (three games fetched), while this game's positioning is *restoration, not incremental*. A quiet listing in a market where every neighbour shouts is a discoverability question, not a tone question. Sheet 01 bounds the game's voice and must say it does not bound the listing.

### Scope check

Nothing in this subject is priority 3, so nothing here is excluded and all four sheets are
assignable. One live risk: a beat map is exactly where excluded systems get smuggled back in.
**No sheet may name a beat that presumes a daily visit, a streak, a returning benefactor, a
festival or calendar moment, a season, another player's progress, or anything the world did while
the player was away.** Each imports a priority-3 system by implication. Stated here so sheet 03's
writer inherits it rather than discovering it in review.

---

## Why 4 sheets

Under the contract rule I own no keys, so every sheet here is a rule or a prohibition and the
count has to be earned on separation of decisions alone. Three separations are real. Verification
demands *"a register and a humor level, not an adjective"* as two distinct things, and the binding
humor decision draws the line itself: humor is permitted in exactly one surface and banned in
every other, so 01 and 02 are written to opposite polarities and merging them would let a writer
smear a dry joke into an error string. 03 is orthogonal to both, because *how a sentence is
written* and *when the game is allowed to be loud* are settled independently, and the handoff makes
it load-bearing: with no failure, timer or decay, the beat ordering is the only thing telling
Audio, Art and UI feedback where this game peaks, and it must be redoable without touching the
voice work. 04 is prohibitions only, and it earns a file because it is the artifact five other
domains and the category verifier cite; an exclusion list buried as the last heading of a register
sheet is read by nobody. Three merges were made or rejected deliberately. **`seriousness` was
merged into 01** (it was a separate sheet in the previous index): fourth-wall stance, whether the
fiction may claim its own mood, and how much reverence the ruin's age gets are properties of one
voice, not a second spec, and the previous justification (*"they are independently settable"*) is
not the test. A depth-escalation sheet stays folded into 03, because a beat map that does not say
whether the ceiling rises deeper in is unfinished. A voice-inventory sheet stays folded into 01
and 02, because the humor decision already forces that split and counting it again is one
decision described twice.

| # | sheet | must decide |
|---|---|---|
| 01 | `register` | The default voice for every surface that is not relic flavour text, as measurable properties (person, mood, sentence-length ceiling, punctuation and emoji policy, a reading-level target picked from the two sourced brackets, fourth-wall stance, whether the fiction may claim its own mood, reverence toward the ruin's age), whether *"warm, aged, unhurried"* survives or is overruled with its `fantasy-ornate` cascade acknowledged, and the bound stated so it is checkable against the six contract string fields. No manifest block: this sheet bounds strings other domains own. |
| 02 | `flavour-and-humor` | What *"dry and sparse"* means as a rule a writer is held to and a reviewer fails copy against: which form of dryness, what proportion of flavour entries carry any humor at all, how the pun ban is checked, and the containment boundary keeping humor out of every surface the binding decision names, plus the delivery requirement for a surface that exists neither in the brief nor in the contract. May not name relics or write example entries for objects nobody has invented. No manifest block. |
| 03 | `beat-map` | The inventory of moments the fiction may peak at, their relative intensity ordering, which single moment is the loudest, how flat the baseline between peaks must be, and whether the ceiling rises with depth. Orderings only: no seconds, no rates, no assets. Everything `[cid: decided]` over a `[brief: soft]` audio default, and it must name the two kinds of work that can overturn it. No manifest block. |
| 04 | `do-nots` | The tonal exclusion list as an audit instrument: every entry an observable violation another category can be failed against, each marked inherited-and-binding or decided-here, each citing its source. Must contain **only** exclusions not derivable from 01 to 03 and must cite rather than restate them; a paraphrase of 01 is a duplicate and fails. No manifest block, and no new tonal position: this sheet converts prohibitions into checks, it does not invent them. |

**Every sheet ends in 2 to 4 checkable criteria** (a value, a count, a state, or an observable
behaviour), per the category verification bar. *"Feels calm"* fails. For this domain that means
criteria of the form "no sentence in this spec's example copy exceeds N words", "this sheet names
zero sounds and zero colours", "the exclusion list contains N entries and each names an observable
violation", "the beat inventory contains exactly N beats and ranks them".

**Boundary all four share:** name no sound, no instrument, no colour, no animation, no timing
number, no asset, no mechanic, no economy value, no pacing number. Where the tone forces something
audible or visible, write it as a requirement on that subject and let its owner execute.

---

## Verification note

**Sheet 03 is the most likely to be contradicted, and the contradiction is already scheduled.**
Two other pieces of work hold overlapping authority over the same two moments. *Feedback and
celebration design for the completely-clear moment* [currently: Mechanics, wave 2] decides how that
moment is celebrated, and *audio intent* [currently: Audio, wave 4] holds the `OPEN.md §2` default
that already ranks a relic reveal above an area completion. Sheet 03 ranks those two beats in wave
1, two and three waves before either writes. If Mechanics builds a large completion celebration or
Audio overrides its own default, the ladder inverts and 03 is wrong rather than merely overruled.
The mitigation is in the sheet's construction and is carried forward unchanged from the previous
index: state the ranking as `[cid: decided]` over a `[brief: soft]` default, and name the two kinds
of work that can overturn it, so a later wave overrides deliberately instead of quietly diverging.

Second-most exposed is **01**, and it now has a machine-checkable failure mode it did not have
before: `SCHEMA` hard-fails `currency.plural` over 10 characters and states a comfortable target of
8. If 01's register implies longer or more ornate labels than that, the bridge rejects the manifest
the moment `gameplay/systems` names the currency. It will also be contradicted by *screen-copy
budgeting* [currently: UI/UX, wave 4] if that sets a label length shorter than the register's
sentence ceiling allows, and by *naming* [Vocabulary Lead, this category] if a canonical term is
longer than the register can carry on a phone-width label. All three are cheap to reconcile if 01
states its requirement as a bound rather than a preference.

**Least exposed is 02**, and only because its subject is binding. Its risk is not contradiction but
irrelevance: gap 1 means it may specify a voice with nowhere to speak. **04's risk is the opposite
and it is the one to watch in review**: a do-nots sheet that restates 01 looks complete and adds
nothing, which is why its uniqueness rule is written into its own criteria.

---

## Research owed

`must_verify`: *"Check how the register actually reads to the brief's stated age band. Fetch two
shipping games in the genre and record their tone, so 'warm and unhurried' is measured against
something rather than asserted."* **Completed in the previous index and reused here per instruction,
not re-fetched.** Two were required; three were fetched.

**Genre register, measured. All three games in this family self-describe as *relaxing* and
punctuate like a hype trailer. The gap between the word and the punctuation is the finding.**

- **`Grass Incremental Simulator`** (Unequal Games, the direct reference). Description: *"A relaxing
  lawn-trimming simulator game"* with a foliage glyph, then *"The more you rebirth and upgrade, the
  more fun the game becomes!"*, followed by imperative bulleted features (*"Trim the grass!"*,
  *"Upgrade for faster trimming!"*) and an early-access note. Register: a glyph in the title and in
  the first line, exclamatory, second-person imperative, enthusiastic rather than jokey. No humor
  and no puns surfaced in the store copy.
  `[research: https://www.roblox.com/games/133086043677134/Grass-Incremental-Simulator]`
  Numbers re-confirmed on a second source: 38.3M visits, 96.2% likes, 10,435 peak CCU, 1,400
  current, and a gamepass list of pure multipliers plus `[OP] Giant Trimmer` at 2,500 Robux. Note
  the bracketed `[OP]` prefix: the genre marks its whale item with slang, which is a register
  decision this game will have to make or refuse.
  `[research: https://www.rolimons.com/game/133086043677134]`
- **`Leaves Incremental`** (PrestigeLabs Studios, a different studio, and the one game in the family
  that ships without rebirth). Description: *"A relaxing leaf-gathering simulator! Collect, upgrade,
  and explore colorful autumn worlds!"* plus *"Gather fallen leaves!"*, *"Unlock new areas and
  discover rare leaf types!"*, *"USE CODE: RELEASE"* and *"Enjoying the game?"*. Register: glyph-dense
  including an update badge and a leaf glyph inside the title itself, every feature line exclamatory,
  engagement prompts and a code promo in the description.
  `[research: https://www.roblox.com/games/113380129609386/Leaves-Incremental]`
- **`Scrap Incremental`** (third, taken for triangulation). Description: *"A relaxing magnet
  simulator game"* with a sunglasses glyph, then the same *"The more you rebirth and upgrade..."*
  sentence, with seven distinct glyphs, numbered feature brackets, *"Enjoying the game? Leave a Like
  and Favorite!"* and *"Join the Unequal Games group for in-game boosts!"*.
  `[research: https://www.roblox.com/games/92876036717311/Scrap-Incremental]`

**A refinement to the brief's landscape research, from that last quote.** `research/landscape.md`
attributes the shared marketing sentence to *"at least two different studios"* and lists Grass and
Scrap as separate entries. Scrap Incremental's own description sends players to *"the Unequal Games
group"*, which is the reference's studio, so Grass and Scrap are very likely one studio's template
rather than two independent shippers. The independent same-sentence shipper is PrestigeLabs
(Leaves). This does not weaken the brief's conclusion, it sharpens it: the genre's register norm is
more concentrated than the sheet implies, which makes departing from it a smaller act of
contrarianism than a four-game list suggests.
`[research: https://www.roblox.com/games/92876036717311/Scrap-Incremental]`

**What this measures *"warm and unhurried"* against.** The genre baseline is relaxation as a claimed
noun and energy as the actual delivery. So *"warm, aged, unhurried"* is not a differentiator if it
stays an adjective, because every competitor already claims the adjacent one, and it **is** a
differentiator if it is executed at the punctuation level, where none of the three do it. That is
exactly the *"a register and a humor level, not an adjective"* bar, and it is sheet 01's to clear.

**The age band, sourced.** The band 8–14 straddles the platform's two largest cohorts: among
age-checked daily active users, *"35% are younger than 13, 38% are age 13 to 17, and 27% are 18 or
older"*, averaged over the seven days ended 31 January 2026 across the 45% of 144M DAU then
age-verified. Primary source, not an aggregator.
`[research: https://about.roblox.com/newsroom/2026/02/moving-beyond-self-reported-age]`

**Reading level, sourced, decision not taken.** On the standard Flesch-Kincaid mapping, ages 8–11
fall in the 3–6 band and ages 11–14 in the 6–9 band, and *"text intended for readership by the
general public should aim for a grade level of around 8, schooling age 13 to 14."*
`[research: https://readable.com/readability/flesch-reading-ease-flesch-kincaid-grade-level/]`
**Consequence, not a choice I am making:** an 8–14 band spans two brackets, so no single target
serves all of it, and the general-public default of 8 sits at the *top* of the band rather than the
middle. Sheet 01 picks the target and says which end of the band it is serving.

**What I could not verify.**

1. **How the register actually reads to 8–14 year olds.** Nothing fetchable settles this; it is
   reception, not fact. `[playtest unknown]`, starting position whatever sheet 01 sets. What would
   settle it: a read-back comprehension check with players in the band against the written copy, and
   as a cheap proxy available before any playtest, a Flesch-Kincaid score computed on the actual copy
   once it exists.
2. **Whether any game in this family ships item-level flavour text at all**, which would tell sheet
   02 whether the surface it needs has genre precedent. Three source types were tried and two failed:
   the Grass Cutting Incremental `Items` wiki returned HTTP 402, and a beginner guide returned HTTP
   405 (the same 405 pattern `research/grass-incremental.md` already records for this genre's guide
   sites). A third fetched successfully but characterises the game rather than quoting it, offering
   only a *"relaxing, meditative quality"* and an *"accessible, straightforward approach"* with no
   in-game copy reproduced. `[research: https://www.rosenberryrooms.com/grass-incremental/]`
   **Recorded as unavailable, not as absent.** What would settle it: an in-client screenshot of the
   reference's collection or tool panel, or any fan wiki page for a game in this family that
   reproduces item text.
3. **Whether the reference's in-game copy matches its store copy.** Only store descriptions were
   reachable. The two Roblox strings that surfaced during fetching (*"Purchase Completed"*, *"Error
   occurred"*) are platform chrome, not the game's own writing, and are **not** evidence about the
   genre's system-copy register. Named because gap 6 would otherwise look answered.
