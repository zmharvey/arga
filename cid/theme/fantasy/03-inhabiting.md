# 03 — Inhabiting

**Domain:** Fantasy · **Category:** Theme & Narrative · **Wave:** 1

## Decision

**The minutes that are neither a reveal nor a completion feel like *sure work*.**

> **The green goes as fast as the person walks; every step of it counts the same as every other step;
> and none of it can be done wrong or taken back. The only thing ever in doubt in this game is what is
> under the green — never what the walking does.**

**"Sure" means *not in doubt*. It never means *skilled*.** Nothing below is about the player becoming
better at anything: *"**No mastery layer.** ... **Stated so nobody invents one.**"* `[brief: soft]`
`[I assumed]` (`03-META.md`). The certainty is a property of the design, held constant from the first
step to the last, and the player acquires none of it.

### The guarantees about the player's own work

Six, `C1`–`C6`, each stated as a violation another category can be counted against. `C` because `R`,
`A`, `P`, `L`, `S`, `X`, `B`, `M`, `K`, `G`, `W` and `F` are all taken by sheets already on disk.

| # | guarantee | the violation |
|---|---|---|
| **C1** | **Nothing a step produces waits.** The whole yield of a cleared patch — the green gone, the credit, the `Find` if one is under it — lands inside the step that produced it. Nothing is held at a boundary, a panel, a button or a rejoin. **A recap of what the player already saw is permitted; a withholding is not.** | count of code paths or surfaces by which any yield of a cleared patch becomes available only after a later act: **0** |
| **C2** | **The ground is the record, and no surface is its only carrier.** What the player has done this sitting is readable from the ground itself, without opening or reading anything. | in one screenshot from the player's own camera, in a part between a fifth and four fifths cleared, with every interface element hidden, the boundary between finished stone and standing green is visible. Count of guarantees whose delivery needs a string, a screen or a figure: **0** |
| **C3** | **The same work never pays less for coming later.** No decay, no diminishing schedule, no soft cap, no per-session or per-day ceiling, no reduction for having cleared that kind of patch before. **Depth may make a step pay more; nothing may make it pay less.** | count of yield terms multiplied by a factor below 1: **0**. Count of caps on what a session, a day or a lifetime may produce: **0**. The values themselves stay with balance-and-tuning work; I set none |
| **C4** | **No step can be the wrong step.** Holding upgrade levels fixed, one set of patches yields the same currency and the same `Finds` in any order, by any route, at any speed, at any hour. | count of yield terms reading route, order, streak, combo, timing, precision, elapsed time or time of day: **0** |
| **C5** | **Finished work is never asked for again, in either direction.** It is never re-cleared, and the game never *requires* going back to it — no upkeep, no inspection, no collection round, no maintenance, no errand into finished ground. It stays walkable so the player may go back **by choice** (`setting/04` `W2`). | count of systems that require re-entering a finished part: **0**. Count of states a finished part can lose: **0** |
| **C6** | **The record of the work is not a resource.** A filled slot and a finished part can never be spent, traded, converted, wagered, sacrificed or paid with. **Two exemptions by name:** currency, which is what the work *yielded* rather than the record of it, and a duplicate `Find`, which occupies no slot — so duplicate-handling work keeps every answer it had. | count of costs, sinks, wagers or conversions priced in filled slots or finished parts: **0**. Count of code paths that decrement the collection count or set an `areasComplete` flag from true to false: **0** |

**No `manifest` block: Fantasy owns no contract key, and a named feeling is not a value.** `SCHEMA` in
`bridge/schema.mjs` holds eleven keys — `area`, `tiers`, `upgrades`, `vocabulary`, `currency`,
`movement`, `patch`, `collection`, `onboarding`, `modules`, `runtime` — owners `gameplay/*` ×7,
`tech/architecture` ×2, `art/objects` ×1, `theme/vocabulary` ×1. **None holds a feeling, an affect or
a guarantee.** I could not run `npm run bridge -- --contract`: this session has no shell tool. The flag
prints `contract()`, which is `key`/`doc`/`owner` straight out of `SCHEMA`, so reading the source
returns the same eleven rows; the live coverage report is what I do not have.
`[research: repo — bridge/schema.mjs, the key list read directly this run]`

**This sheet coins one term: `sure work`.** Lowercase, two words, no hyphen, **writer-facing and never
rendered** — the same treatment `finder` was given in `cid/theme/identity/01-player-role.md`. Surfaced
to naming work for the canonical list marked internal. Every other word above is the brief's own.

---

## Why

### The brief assigns the carrier and never the cargo, and that is my domain index's gap 7

*"**Consequence: audio and visual feedback carry the entire load** — and nobody downstream should
invent tension to fill the gap"* `[brief: soft]` `[you accepted: step 6 Q2]`, elevated by `HANDOFF.md`
into one of six things to know before designing anything (`02-GAMEPLAY.md`). `OPEN.md §2` names *"two
emotional peaks"* and names no emotion. **So a load is assigned, a carrier is assigned, and the thing
being carried is never stated** — and the minutes at issue are not even the two peaks, they are
everything between them. `OPEN.md §1` carries no audit row for it and no interview question anywhere
touches it, so all of this is `[cid: decided]`.

### Which minutes these are, in counts rather than in adjectives

At the shipped manifest a depth-1 lap is **164 modelled seconds and 140 clears**, of which **6 carry a
`Find` reveal and 1 is the area completion**: at least **133 of 140 clears, 95%, carry nothing above a
currency tick**, one every 1.17 s, with reveals averaging 27.3 s apart
`[research: repo — cid/gameplay/core-loop/01-payoff-frequency.md, cid/gameplay/core-loop/02-payoff-weights.md, read this run]`.
A bound session is **three to seven complete laps plus one in progress**
`[research: repo — cid/gameplay/core-loop/04-lap-vs-session.md, read this run]`, so the sheet governs
four hundred to a thousand clears a sitting.

**And after 24 of 24 it governs all of them.** Both peak kinds go permanently extinct at that point —
the reveal by the collection guard, set completion by there being four sets — leaving the tick and the
purchase `[research: repo — cid/gameplay/core-loop/02-payoff-weights.md and 03-reveal-placement.md,
read this run]`, and sheet `02` of this domain records that state as arriving at *"minute 11 of session
1"* at shipped values. Sheet `02` put it plainly: *"at S4 every minute is a between-minute ... Your
guarantee list stops being the connective tissue between peaks and becomes the whole late game."*

### Why certainty is the affect this design left standing, arrived at by elimination and then checked

Four sources of feeling were removed by name, and each removal deletes a *doubt*:

| removed | tag | the doubt it deletes |
|---|---|---|
| *"There is no failure state. No death, no losing, no loss of progress"* | `[brief: soft]` `[you accepted: step 6 Q2]` | whether the work survives |
| *"**No mastery layer.** ... Stated so nobody invents one"* | `[brief: soft]` `[I assumed]` | whether the player is doing it well |
| *"**Cleared is permanent — overgrowth never returns.** This is the payoff"* | `[brief: binding]` `[you chose: R2 Q1]` | whether it stays done |
| *"Input: movement only. No aiming, clicking, or ability buttons"* | `[brief: soft]` `[you accepted: step 6 Q3]` | whether the input landed |

**Strip jeopardy, competence, decay and execution and what is left is not an absence — it is
doubtlessness, and doubtlessness is a feeling.** `[cid: decided]` That is the whole argument of this
sheet, and its test is that the design removed every source of doubt about *the player's own action*
while leaving every source of doubt about *the world* untouched: which tier the next patch is
(`tiers[].weight`, Systems'), which part comes next (the shuffle), what is under the green. **The
uncertainty this genre's players expect is intact** — the reference's own audience already wants *"a
luck/rarity roll to chase"* `[research: relayed from cid/theme/fantasy/_lead.md — fetched in the index
run, not re-fetched here]` — and it lives entirely on the world's side of the line. `C3` and `C4`
forbid nothing about tier variance, burial or shuffling, and say so.

**This is also the reading under which the brief's own moment-scale objective is a feeling rather than
a chore.** `03-META.md` states it as *"moment | clear the patch in front of you | overgrowth disappears
on contact"* `[brief: soft]` `[you accepted: R5 Q3]`. **The measurable it chose is an immediate visible
effect** — not a number, not a total. `C1` and `C2` are that sentence held to for four hundred clears a
sitting instead of one.

### Reach is the mechanism, and it is the only anchor the brief gave me

*"**Feel:** reach is the primary sensation — a wider tool must visibly sweep more per step"*
`[brief: soft]` `[I assumed]` (`02-GAMEPLAY.md`). Reach is felt as **coverage per step**, and coverage
is only *felt* rather than *reported* if the step's result arrives inside the step (`C1`) and is legible
in the ground rather than in a readout (`C2`). `[cid: decided]` The upgrade ladder's whole payoff is
described the same way by payoff work — *"its real payoff is the next clear feeling different"*
`[research: repo — cid/gameplay/core-loop/02-payoff-weights.md, read this run]` — which is a claim
about the in-between minutes, made by a Gameplay sheet, with no fiction attached until now.

**`C4` is where reach and the no-mastery rule meet.** A wider sweep must pay for itself in *ground per
step*, never in *ground per skilful step*. The moment a route, an order or a timing is worth more than
another, reach becomes a technique, and technique is the mastery layer the brief says nobody should
invent. Mood-and-beat work closed the perceptual half of this already — its `B1` forbids any ambient
channel taking the player's distance to a buried `Find`, on the ground that *"a proximity cue converts
sweeping into hunting, and hunting is an execution skill"*
`[research: repo — cid/theme/tone/03-beat-map.md, read this run]`. **`C4` closes the economic half**: it
is not enough that the game does not *cue* a better route, it must not *pay* one.

### What this does not do: it adds no third source of satisfaction

*"Satisfaction comes from before/after and discovery, nothing else"* `[brief: soft]`
`[you accepted: step 6 Q2]`. **I am not adding a source and this sheet does not need one.** Before/after
is the *event*; sure work is what before/after feels like when it is guaranteed four hundred times a
sitting. The nearest instance of the distinction is already on disk on the carrier side: mood-and-beat
work ruled that *"the before/after payoff is a requirement on the baseline, not on a peak"* and that the
cleared-against-standing contrast must read **at the scale of a single patch**. That sheet says where
the contrast must read; `C2` says what the contrast is *of* — **a boundary the player made, at the scale
of a whole sitting.** Two different scales, one cited and not restated.

### Occupancy, and why the two available names for these minutes are both taken

My index's rule 6 forbids re-differentiating, and rule 1 of my own reading of it is not to promise what
an occupant delivers better. **The genre's own name for these minutes is *relaxing*, and it is claimed
by every neighbour**: all three shipping games in the `X Incremental` family self-describe as relaxing,
and `Carpet Cleaning Simulator` ships *"calming gameplay"* and *"cozy and subliminal spaces to
restore"* at ~26.6M visits in a quarter
`[research: relayed from cid/theme/fantasy/_lead.md and cid/theme/tone/_lead.md — fetched in those runs,
not re-fetched here]`. Register work then banned the word outright as a mood the game may not claim
about itself — `P10`, ten mood words including `relaxing`, `calm`, `cozy` and `peaceful`
`[research: repo — cid/theme/tone/01-register.md, read this run]`. **So *calm* is simultaneously
occupied, unsayable and unfalsifiable.** Sure work is none of the three: it is stated as six things a
build either does or does not do.

The second available name is *anticipation*, and it is closed twice — sheet `01` of this domain forbids
this sheet naming the feeling *anticipation of a reveal*, because that would re-promote the register it
demoted, and mood-and-beat work's `M14` calls anticipation *"the smallest available unit of tension"*
and gives it no channel at all.

### Wordless deliverability, satisfied with zero new surfaces

My index's rule 2 and gap 8: *"**No text, no tutorial**"* `[brief: soft]` `[you accepted: R6 Q3]`, and
`04-PRESENTATION.md`'s screen list holds no flavour surface. All six guarantees are arrivable at from
priority-1 behaviour:

1. `C1`, `C2`, `C4` — the patch in front of the player vanishes on contact, credited in the same tick,
   and the ground behind them carries the shape of where they walked.
2. `C3` — the thousandth clear pays like the first.
3. `C5` — a part walked back into is still finished, and nothing asked the player to come.
4. `C6` — nothing in the game ever offers to take a slot or a part.

**So this sheet requests zero strings, zero screens and zero fields.** `[playtest unknown]` **— whether
`C5` is legible with no words**, because it is the one guarantee a player cannot verify inside a single
sitting. Starting value: **0 strings state any of the six.** Test range: **0 to 1 string**, and if one
is ever owed it states `C5` and nothing else. What would settle it: ask second-session players in the
band whether they expect to have to clear the same ground twice. Nothing fetchable settles it.

### `[playtest unknown]` — whether "nothing at stake" reads as flat, and the escalation order that stops the wrong fix

`OPEN.md §6` concedes zero tension is *"possibly correct for a relaxing restoration game; **entirely
unverified**"*. **Starting value: 0 friction terms, all six guarantees in force.** The range is stated
as a spend order rather than a knob, because "it feels empty" must not be answerable by adding a
penalty: (1) increase the non-numeric per-patch feedback, which is clear-feedback work's and audio
work's and is already funded; (2) increase **area supply** so more ground stands in front of the player,
which is content-volume work's and is the fix core-loop work already recommends; (3) a developer ruling,
never a domain's, and even then `C4` and `C6` are the last two to move because a graded step and a
spendable record are the two changes that would make every other sheet in this category wrong. What
would settle it: whether players in the band stop moving in a lap's second half.

**Nothing binding and nothing soft is overruled anywhere in this sheet, so there is no
`## Pushing back` section.** Every `[brief: soft]` item it touches — reach as the primary sensation,
zero tension, no mastery, warm-aged-unhurried, before/after as the source — is kept and used.

---

## Consequences for other work

- **Clear-on-contact feedback work** *[currently Mechanics, wave 2]*: `C1`, `C2` and `C4` land here
  first and hardest, because the per-patch clear is the entire carrier for 95% of the clears in a lap.
  **The tick is a result, not a gift** — nothing about it may read as the game granting, awarding or
  approving something, which is the cargo mood-and-beat work's `K1` was written for and never named.
  Its `M1` verdict, `core-loop/02`'s constant magnitude and `tone/04`'s `X6` and `X7` already bound the
  execution; this sheet adds only what the cue is *about*. And `C4` is a constraint on **yield**, not on
  feel: make one clear feel different from another all you like, as long as it is not worth more.
- **Duplicate-handling work** *[currently Systems, wave 2]*: two things, one permission and one
  prohibition. **Permitted, explicitly:** consuming, converting or otherwise using a duplicate `Find`,
  because a duplicate occupies no slot and `C6` exempts it by name — the constraint *"solve duplicates
  without adding a currency"* `[brief: soft]` is untouched and no answer is taken off your table.
  **Forbidden:** framing the duplicate as a *discount* on the step that produced it. `core-loop/03`
  records that a duplicate currently fires nothing, which makes it the only step in the game whose
  visible yield is smaller than an identical-looking step; under `C3` the answer may not be dressed as
  less. Mood-and-beat work already forbids a reduced reveal cue; this is the same rule reaching the
  economy.
- **Balance-and-tuning work** *[currently Balance & Tuning, wave 4]*: `C3` is a sign constraint on every
  curve you own and sets no number. **No factor below 1 anywhere in a yield term, and no per-session,
  per-day or lifetime cap.** Permanent multipliers above 1 are untouched, and `C3` does not bound how
  *steeply* costs grow — only that what a step pays never falls.
- **Area-authoring and depth work** *[currently Meta & Content, wave 3, owner of `area` and
  `collection`]*: `C3` explicitly permits everything depth was going to do. *"Depth is progression —
  deeper areas are larger, denser, and hide rarer sets"* `[brief: binding]` `[you chose: R3 Q2]` raises
  yield per step or holds it; *"the binding constraint moves from tool power to time and patience"*
  `[brief: soft]` `[I assumed]` buys **more ground per lap**, never **less pay per step**. A denser area
  that paid less per patch would be the one reading of "patience" `C3` forbids.
- **Endgame-content work** *[currently Meta & Content, wave 3 — "what content exists past collection
  completion"]*: this sheet closes three of the standard shapes before you reach for them. `C5` forbids
  **upkeep or a collection round through finished parts** (which would also be offline accrual by
  another name, priority 3). `C6` forbids **spending finished work** — no prestiging a set, no trading a
  slot, no sacrificing a completed part. `C3` forbids a **per-session cap** dressed as pacing. What is
  left, and it agrees with sheet `02` of this domain and with mood-and-beat work independently, is
  recurring and unbounded: more ground.
- **Cleared-area and passage work** *[Setting — `04-permanence-and-passage`, this domain's neighbour,
  already ruled]*: **ratified, with one reconciliation stated rather than left for a reviewer to find.**
  `C5` depends on `W2` and cites it. `W5` (*"Walking on early forfeits the `Finds` under the green you
  left"*) **does not violate `C4`**: what is forfeited is a `Find` still under standing green, which was
  never the player's, and no work already done is reduced. If `W2` is struck at the named hinge, `C5`'s
  second clause falls back to the finished-parts figure that sheet `02` of this domain requires, and
  `C1`–`C4` and `C6` are unchanged.
- **Price-and-SKU work** *[currently Monetization, wave 3]*: `C3` forecloses the largest remaining
  monetization pattern in this genre — **introducing a friction and selling its removal.** No SKU may
  be the lifting of a cap, the removal of a diminishing return, the refilling of anything, or the
  restoration of a rate the base game lowered, because under `C3` none of those frictions may exist to
  be sold. Sheet `01` of this domain already forbade consumables. `03-META.md` records three times that
  *"the premium SKU has no home"*; this narrows the space further and says so rather than letting wave 3
  discover it. Permanent multipliers above 1 remain fully available and are what the stance already
  names.
- **Interface-surface work** *[currently UI/UX — Screens and Feedback UI, wave 4]*: `C1` forbids a
  **claim, collect or cash-in affordance of any kind**, and forbids any yield being available only after
  a panel is opened. It **permits** a recap of what the player already saw, which is exactly the option
  `core-loop/03` left with you — so the completion summary it declined to rule on stays yours, provided
  nothing is withheld until it. `C2` forbids the progress readout being the **only** carrier of the
  sitting's work; the readout itself survives untouched, rising and counting cleared, per
  `04-PRESENTATION.md` and `tone/04`'s `X10`.
- **Environment and VFX work** *[currently Art & Visuals, wave 4]*: `C2` is a requirement at a scale
  nobody has stated. Mood-and-beat work requires the cleared-against-standing contrast to read at **one
  patch**; this sheet requires that after two hundred clears the *cumulative* boundary still reads from
  the player's own camera, with the interface hidden. A treatment that makes a single patch pop but lets
  a half-cleared part read as speckle satisfies that sheet and fails this one.
- **Audio work** *[currently Audio, wave 4]*: the cargo your channel was assigned and never given is
  **sure work**, and the one thing that falsifies it is a cue that reads as a *grant* rather than as a
  *result*. Nothing about execution is decided here: the inventory, `K1`–`K4` and `B1`–`B6` are
  mood-and-beat work's, and every magnitude is `core-loop/02`'s.
- **Presence work** *[currently Social, wave 2]*: `C6`'s ban on the record being a resource covers the
  social direction too — **no filled slot or finished part may be given, shown competitively, or
  compared**, which agrees with the category scope gate rather than extending it. A stranger's presence
  costs this sheet nothing: `C4` means nobody else's walking can change what the player's own walking is
  worth.
- **Analytics work** *[currently Analytics, wave 4]*: two measurable forms of this sheet, both already
  inside the `OPEN.md §2` default's spirit. Count the fraction of clears yielding nothing above a tick
  (expected ≥ 95% at shipped values, 100% past 24 of 24), and count steps yielding nothing at all
  (expected 0, and any non-zero figure is a `C1` violation in the build). **Measure freely, display
  none of it** — `tone/04`'s `X10`.
- **Naming work** *[currently Vocabulary Lead, this wave, last writer, owner of the `vocabulary` key]*:
  one internal term to collect (`sure work`, never rendered), plus **offered, not imposed** — eight
  candidate `bannedWords` entries that are the mechanical trace of `C1` and `C3`, each because it names
  a deferral or a penalty the design does not contain: `claim`, `claimed`, `unclaimed`, `redeem`,
  `payout`, `pending`, `idle`, `penalty`. **`collect` and `collection` are deliberately excluded** —
  *"motivated by collection"* is a binding audience line `[you chose: R1 Q4]` and the index is the
  game's own surface, so a ban there would put the design's own vocabulary at risk. This list shares
  zero tokens with the eight entries already in `bannedWords`, with register work's eighteen, with
  `XW`, with `L1`/`L3`/`L5`, with `S1`–`S6`, with identity work's eleven role words, with sheet `01`'s
  seven irreversibility words, or with passage work's criterion-4 tokens. **It puts zero shipped values
  at risk:** none of the 43 player-facing strings on disk contains any of the eight.
- **Whoever owns the CID→build seam**: like every sheet in this domain, this one reaches the build only
  as constraints on other domains' work, and `npm run bridge` will report COMPLETE whether or not a word
  of it survives. Criteria 1 and 4 are its only mechanical trace.

---

## Acceptance criteria

String counts are over the **43 player-facing strings** `playerFacingStrings()` extracts from the
merged manifest, as enumerated in `cid/theme/tone/01-register.md`.

1. **No-deferral check (`C1`).** Count of code paths, surfaces or interactions by which any yield of a
   cleared patch — its currency, its `Find`, or its disappearance — becomes available only after a later
   act (a button, an area boundary, a panel, a rejoin): **0**. Over the 43 strings, the whole-word
   case-insensitive pattern `claim|claimed|unclaimed|redeem|payout|pending|idle|penalty` returns **0**
   hits — **verified 0 of 43 today** against every `manifest` block under `cid/`.
2. **Order-independence and no-shrinkage check (`C3`, `C4`).** Holding upgrade levels fixed, clearing a
   given set of patches yields identical currency and an identical set of `Finds` in any order, by any
   route, at any speed: two runs over the same 140 patches in different orders differ by **0**. Count of
   yield terms reading route, order, streak, combo, timing, precision or elapsed time: **0**. Count of
   yield terms multiplied by a factor below 1, and count of per-session, per-day or lifetime caps:
   **0** and **0**.
3. **Record-not-a-resource check (`C5`, `C6`).** Count of code paths that decrement the collection count
   or set an `areasComplete` entry from true to false: **0**. Count of costs, sinks, wagers, trades or
   conversions priced in a filled slot or a finished part: **0**. Count of systems that require
   re-entering a finished part: **0**. Currency and duplicate `Finds` are exempt by name and are not
   counted.
4. **Carrier-and-non-duplication check (`C2`, and the cross-sheet test).** In one screenshot from the
   player's own camera, in a part between a fifth and four fifths cleared, with every interface element
   hidden, the boundary between finished stone and standing green is visible. Count of guarantees whose
   delivery requires a string, a screen or a figure: **0**; this sheet requests **0** new strings, **0**
   screens and **0** contract fields. And it cites at least **8** sibling rule ids by name — `M1`, `M14`,
   `K1`, `B1`, `X6`, `X10`, `W2`, `W5` — while re-deriving **0** of them, and it carries **0** `manifest`
   blocks.

---

## Not decided here

Every cue, sound, particle, effect, magnitude, onset and duration at any moment (mood-and-beat work for
membership, `gameplay/core-loop/02` for magnitude, then Audio, Art — VFX, Mechanics and UI/UX for what
they are made of). How the clear moment feels in the hand (clear-feedback work, wave 2). Every number
`C3` and `C4` constrain the sign of: tier values and weights, cost curves, per-level factors, discovery
rates per depth (Systems, Meta & Content, then Balance & Tuning). What a duplicate's answer is, and what
its cue is (Systems, wave 2; Audio). Whether the progress readout exists as a HUD, and what a recap
panel looks like if one is built (UI/UX, wave 4, then the pattern registry). What content exists past 24
of 24 (Meta & Content, wave 3) and whether the collection is restructured so that state arrives later at
all (core-loop work's fix, plus the schema's collection invariant). Whether a finished part stays
re-enterable (passage work's `W2`, ruled there; this sheet depends on it and does not re-decide it).
Which SKUs exist (Monetization, wave 3). Whether the eight offered tokens join `vocabulary.bannedWords`
(naming work). The register the game speaks in and the mood it may not claim (register work, ruled).

---

## Flagged to the developer

**Nothing in the brief names what these minutes feel like**, and they are the overwhelming majority of
the minutes the game contains. `OPEN.md §1` has no audit row; no interview question in six rounds
touches it. So the whole of this sheet is `[cid: decided]`, and three alternatives were genuinely live.

| alternative | why I did not take it | cost of overruling me |
|---|---|---|
| **Anticipation — the minutes are the approach to the next `Find`** | Closed twice before I got to it: sheet `01` of this domain demoted revelation from the register and forbade this sheet naming anticipation, and mood-and-beat work's `M14` gives anticipation no channel because it is *"the smallest available unit of tension"*, against a handoff instruction elevated to binding | **Expensive.** It reopens two wave-1 sheets, needs the proximity cue `B1` forbids, and converts sweeping into hunting, which is the mastery layer the brief says nobody should invent |
| **Calm, absorption, flow — the genre's own answer** | Occupied by much larger games (`Carpet Cleaning Simulator` at ~26.6M visits in a quarter; all three `X Incremental` neighbours self-describe as relaxing), banned as a self-claim by register work's `P10`, and — decisively — it is a statement about the player's attention rather than about the player's work, so it hands Art and Audio nothing to build and nothing to fail | **Cheap to state, worth nothing.** It is the version of this sheet that would fail its own category's *"a register, not an adjective"* bar |
| **Efficiency — the minutes are the player learning to sweep well** | *"**No mastery layer.** ... Stated so nobody invents one"*, and it would require `C4` to be false | **Reopens a brief item** and inverts the one guarantee every other sheet in this category leans on |
| **Sure work — taken** | — | — |

**My recommendation is the sheet as written**, on one argument: it is the only candidate that is stated
as six things a build either does or does not do, so a later reviewer can prove it was delivered rather
than assert that it feels right.

**Three rulings I would actually like from you.**

1. **The genre sells these minutes as *calming*; this sheet sells them as *lossless*.** That is the real
   choice, and it is one line either way. My answer is lossless, because calming is occupied by larger
   games, unsayable under the register already on disk, and uncheckable. If you want the calm claim back,
   it is a ruling here and a revision to register work's `P10`.
2. **`C3` forecloses the genre's most reliable monetization lever.** Introducing a cap, a decay or a
   diminishing return and selling its removal is the standard shape, and this sheet forbids the friction
   ever existing, which means it can never be sold. Combined with sheet `01`'s ban on consumables and
   `tone/04`'s `X9` ban on the oversized tool, **three wave-1 sheets have now each removed one shape from
   a premium SKU the brief already calls homeless.** **Recommendation: keep `C3`** — a paid removal of a
   penalty is the clearest possible contradiction of *"none of it can be done wrong or taken back"* — but
   this is the entry with a revenue number behind it and you should see the three together.
3. **At shipped values this sheet is the whole game from minute 11.** Core-loop work dates 24 of 24
   inside session one, after which every minute is a between-minute and two of five payoff kinds are
   permanently extinct. **Recommendation: take core-loop work's fix (i)** — `relicsPerArea` down,
   `areasPerDepth` up, one schema invariant relaxed — which is the same fix sheets `01` and `02` of this
   domain and two Gameplay sheets have now each asked for independently. It is the difference between
   these guarantees carrying the space between peaks and carrying the game alone.

No URL was fetched in this run: every occupancy and genre figure is relayed from
`cid/theme/fantasy/_lead.md` or `cid/theme/tone/_lead.md` and marked as relayed, and every
`[research: repo — ...]` cites a file read this run. `npm run bridge -- --contract` could not be executed
because this session has no shell tool.
