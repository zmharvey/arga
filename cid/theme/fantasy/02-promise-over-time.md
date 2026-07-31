# 02 — Promise over time

**Domain:** Fantasy · **Category:** Theme & Narrative · **Wave:** 1

## Decision

**This fantasy makes two promises, and only one of them survives familiarity.**

> **Finite:** the index fills. Promised once, kept once, **never re-promised.**
> **Unlimited:** no ground the player has finished will ever be asked of them again, and there is
> always more ground.

**What is promised about being finished: a part, yes. The index, yes, exactly once. The place,
never.** No second finishable thing may ever be introduced, at any depth, in any wave.

**Past 24 of 24 the fantasy makes no new promise.** The unlimited one is the whole offer, it is
smaller than what came before, and the sheet states that rather than patching it. The answer is
therefore **not** *nothing* — it is *one thing, stated at its true size*, which is the correct output
for a game whose brief declines retention as a goal by name.

**The one demand this places on the design: the finite promise may not be spendable inside a single
sitting.** Filling the index must take strictly more laps than the longest bound session contains —
**8 or more, against 4 at shipped values.** That is a requirement on numbers this sheet does not set.

**No `manifest` block: Fantasy owns no contract key, and this decision is not a value.** `SCHEMA` in
`bridge/schema.mjs` holds eleven keys — `area`, `tiers`, `upgrades`, `vocabulary`, `currency`,
`movement`, `patch`, `collection`, `onboarding`, `modules`, `runtime` — owners `gameplay/*` ×7,
`tech/architecture` ×2, `art/objects` ×1, `theme/vocabulary` ×1. **None holds a promise, a horizon or
a late-game offer.** I could not run `npm run bridge -- --contract`: this session has no shell tool.
The flag prints `contract()`, which maps `key`/`doc`/`owner` straight out of `SCHEMA`, so the source
read returns the same rows; the live coverage report is what I do not have.
`[research: repo — bridge/schema.mjs:29-499, read this run]`

**This sheet coins zero terms.** *Finished*, *cleared*, *index* and *part* are all already in use on
disk. Naming work gains nothing to collect.

---

## Why

### The three erosions, taken one at a time, because only one of them touches the promise

| erosion | what it costs | what survives it |
|---|---|---|
| **reveals become familiar** | the finite promise, entirely. A Find is first-of-its-kind exactly once per name, 24 times, and `cid/theme/setting/02-extent.md` states that past the fourth set the works continues *"with nothing new to find"* | nothing. This half is spent and the sheet says so |
| **the place is known to be endless** | the reclamation promise, which sheet `01` already demoted to per-area subject matter | **the unlimited promise is *funded* by it.** An uncounted works is an inexhaustible supply of ground to finish |
| **nothing accrued while away** | the genre's standard return promise | the complement of it: nothing decayed, nothing is owed, and the edge is where it was left |

**Endlessness is not a loss here, and that inversion is the load-bearing argument.** Sheet `01`
demoted *"An overgrown ruin being **reclaimed**"* from promise to subject matter precisely because
*"Endless via shuffled authored chunks"* `[brief: binding]` `[you chose: R5 Q1]` (`03-META.md`)
guarantees the place never ends. The same endlessness is what makes *"there is always more ground"*
true forever rather than for four depths. World-scale work states the mechanism in canon: the works
*"cannot be exhausted because it is uncounted, not because it is infinite"*, *"nothing is being
added"* `[research: repo — cid/theme/setting/02-extent.md, read this run]`. So the property that
kills one promise pays for the other, and neither claim needs a system that does not exist
`[cid: decided]`.

**The third row is an offer, not an absence, and it is the exact complement of the largest occupied
fantasy in the map.** *Grow a Garden* wins *"relaxing tending of a place that is yours"* at 35.3bn
visits with a world that **runs while players are offline**, which makes *"come back and see how it
changed"* both uncontestable and impossible here
`[research: relayed from cid/theme/fantasy/_lead.md — fetched in the index run, not re-fetched here]`.
What is available instead is the shadow that offer casts: a place that asks nothing. *"Nothing
regrows, so nothing can accrue while away"* `[brief: binding]` `[you chose: R2 Q2]`
(`01-FOUNDATION.md`) also means nothing wilted, nothing is due, and nobody is waiting — identity work
ruled the player *"owed nothing and owing nothing"* and rejected a custodian on the ground that *"a
duty also means something is lost if the work stops, which is tension"*
`[research: repo — cid/theme/identity/01-player-role.md, read this run]`. For *"8–14, mobile-heavy,
short sessions"* `[brief: binding]` `[you chose: R1 Q4]` (`00-CORE.md`), whose sessions are
interrupted by construction, *no upkeep* is a real thing to be offered. **The fiction may not announce
it:** mood-and-beat work ruled re-entry *"baseline, and silent about the absence"* and forbids any beat
being a return `[research: repo — cid/theme/tone/03-beat-map.md, M10, read this run]`. The player finds
the edge where they stopped and draws the conclusion.

### Thresholds as player state, because there are no time anchors and that is deliberate

*"Lap length: unknown, and deliberately so"* (`01-FOUNDATION.md`), so *hour two* cannot be written as
a duration `[brief: soft]`. The four states below are what *hour two* actually means, and they are
observable from a save file.

| player state | the finite promise | the unlimited promise |
|---|---|---|
| **S1** the first Find is out of the ground | live, 23 slots unfilled | live: one part finished |
| **S2** at least one set closed, empty slots still visible | live, and now demonstrated rather than implied | live, and now plural |
| **S3** every `upgrades[].maxLevel` reached, nothing left to buy | live only if slots remain | unchanged |
| **S4** the index is full | **spent, and never re-promised** | unchanged, and the whole offer |

At shipped values S3 and S4 arrive in the same area — core-loop work puts the ladder maxed *"at
cumulative patch 1112 of 1368, about 53% of the final area"* and 24/24 *"on its last patch"*
`[research: repo — cid/gameplay/core-loop/05-depth-escalation.md, read this run]`. **S4 is where this
sheet is really working**, and it is dated: *"minute 11 of session 1"*
`[research: repo — cid/gameplay/core-loop/04-lap-vs-session.md, read this run]`.

### Why the unlimited promise does not decay, stated as an audit of every quantity in the game

A promise decays when it depends on novelty or on a supply. This one depends on neither: it is a claim
about the accumulated past, and the past only ever gets larger. Every other quantity has a ceiling, a
sink, or both `[research: repo — the sheets cited in each row, read this run]`:

| quantity | why it cannot carry a durable promise |
|---|---|
| currency | spent. One faucet, one sink `[brief: soft]` `[you accepted: R5 Q3 → R4 Q3]` |
| the upgrade ladder | capped. Throughput hard-bounded at **4.16×** by `upgrades[].maxLevel`, no rebirth to reset it, no fourth axis (`core-loop/05`) |
| a first-time Find | one-time per name, 24 names |
| a set | four of them |
| the place | uncounted, so it is never finished and can never be claimed as finished |
| **parts the player has finished** | **no ceiling, no sink, no conversion, and nothing can take it back** |

That last row is the only quantity in the design that only ever rises and can never be spent. Sheet
`01` fixed the axis — *"the accrual is the one kind that cannot be taken back"* — and told this sheet
the hour-ten promise *"may not be *more reveals*"* and *"may not be *a fuller logbook as such*"*
`[research: repo — cid/theme/fantasy/01-fantasy-of-record.md, read this run]`. This is that axis
carried to S4 and found to still be there.

### Exactly one finishable thing, and why a second is forbidden rather than merely unbudgeted

*"**With endless areas, the collection is the only finishable thing**"* `[brief: soft]`
`[you accepted: R6 Q3 → R5 Q3]` (`03-META.md`). I ratify it and harden it into a prohibition, because
the soft version reads as an observation about the current content and the hard version is what stops
a second one being added at wave 3: **a second finishable thing re-promises finishing after the first
promise was kept**, which makes the first one provisional. That is the same error mood-and-beat work
already forbade in the cue channel — *"an escalating cue implies the earlier instance was
provisional"* — and it is why that sheet rules `M11` (24 of 24) to be `M5`'s fourth firing at `M5`'s
size, with *"no event fires that is conditional on the collection reaching 24 of 24"*
`[research: repo — cid/theme/tone/03-beat-map.md, read this run]`. **The fiction reason it needs no
ending is now stated: at S4 there is no promise left to close.** `[cid: decided]`

### The demand, derived rather than asserted: the finite promise must outlast one sitting

The brief's return hook is *"**An unfinished area and a half-empty index**"* `[brief: soft]`
`[you accepted: R3 Q3]` (`03-META.md`). **A half-empty index is a claim about the moment a player
comes back**, so the hook requires the index to still be half empty after any single sitting.
Core-loop work fixes a bound session at *"three to seven complete laps plus one in progress"*, so the
requirement is arithmetic: **laps to fill the index ≥ 8.**

At shipped values `ceil(24 / relicsPerArea)` = `ceil(24 / 6)` = **4 laps = 656 s**, and a ceiling
session is 1200 s = 7.3 laps. **So a long single sitting fills the index today, and half the stated
return hook stops existing at the end of it.** Core-loop work's own predicate asserts only
`lapsToComplete * lapSeconds > 600`, which passes by 9% against the *floor* session; that check is
weaker than the hook it was defending. `[cid: decided]`

**The floor is satisfiable far more cheaply than anyone has assumed, and this is the one number-shaped
contribution the sheet makes.** `relicsPerArea` 3 with `areasPerDepth` 2 gives 8 laps, keeps exactly
one set per depth, produces **zero duplicates**, and needs the schema invariant relaxed from
`relicsPerArea >= largest set` to `areasPerDepth · relicsPerArea >= setSize` — a relaxation core-loop
work already requested and world-scale work already backed in fiction (*"the four set labels are four
**kinds** of part, so `collection.areasPerDepth` may take any integer ≥ 1 with **zero renames**"*).
Note this is **much gentler than the ~15 areas per depth** core-loop work's coupon-collector reasoning
implies, and depth-escalation work states that 15 *"maxes the ladder inside depth 1"* and makes
*"deeper areas are larger"* false from depth 2. **Which values are chosen is Meta & Content's; the
floor is mine.** `[playtest unknown]` starting value **8 laps**, test range **8 to 60**.

### Is the honest answer "nothing"? No, and the reason it is not is also why it may be small

*"**This game exists to prove the `arga` pipeline works end to end.** ... Success is **shipped
artifacts, not players**"* and, as a stated non-goal, *"**Beating the genre's retention curve.**
Offered and declined"* `[brief: binding]` `[you chose: R1 Q3]` (`00-CORE.md`). The brief also concedes
the cost in advance: *"**Honest weakness:** without banked offline earnings, the pull to return is
materially weaker than the reference's. That was the accepted trade for permanence"* `[brief: soft]`.

So the bar this sheet has to clear is **truth, not size.** A promise the design cannot keep is worse
than a smaller one it keeps completely, and every candidate large promise is either occupied by a much
larger game or excluded by name: daily rewards, offline accrual and seasons are all priority 3, and the
*"seasons"* reframe was *"declined"* by name `[brief: binding]` `[you chose: R2 Q2]`. The reference's
own shape is the thing to write against rather than hope past — *"10,435 peak to 819 current, while
still being actively updated weekly ... satisfaction is not the same as retention"*
`[research: relayed from cid/theme/fantasy/_lead.md]`. **Producing a thin sheet is not the alternative
either:** the category brief makes *"giving every creative area real work"* the success condition, and
what this sheet owes is a stated bound with teeth, which criterion 1 is.

### Wordless deliverability, and the one place it can quietly fail

My index's rule 2, and gap 8: there is no flavour surface, and *"**No text, no tutorial**"*
`[brief: soft]` `[you accepted: R6 Q3]`. Both promises are arrivable from what happens on screen:

1. **the finite one** — a grid of 24 slots with empties visible, filling and never emptying.
2. **the unlimited one** — walk back into a part you finished and it is still finished; walk further
   in and there is another part standing green.

**The failure mode is specific.** `OPEN.md §2` defaults finished areas to collapsing *"to a completion
flag once finished"* to keep save size bounded `[brief: soft]` `[I assumed]`. If a finished part
therefore cannot be re-entered, carrier 2 disappears and the player's entire accrual at S4 is **a
number**. Sheet `01` already required that *"the count of finished areas must survive as something a
player can see"*; world-scale work already permits it (*"the no-total rule forbids counting **the
place**, never the player's work"*). **This sheet makes it conditional and load-bearing: either a
finished part stays re-enterable, or the count exists as a surface. One of the two, not neither.**

**`[playtest unknown]` — whether the unlimited promise alone holds anybody at S4.** Starting value:
**nothing is added past 24 of 24** — the game offers more parts and nothing else. Test range: from
*nothing added* to **one recurring unlimited offer added**, and never a second finishable thing (the
prohibition above is not a knob). What would settle it: whether players who have reached S4 enter a
new part and finish it in a later session. Nothing fetchable settles it.

**Nothing binding is overruled in this sheet.** One `[brief: soft]` reading is, in `## Pushing back`.

---

## Consequences for other work

- **Content-volume work** *[currently Meta & Content, wave 3, owner of `collection`]*: three things.
  **(a)** `ceil(24 / relicsPerArea) >= 8` is a floor on the finite promise, satisfiable at
  `relicsPerArea` 3 / `areasPerDepth` 2 with zero renames and zero duplicates. **(b)** Whatever exists
  past S4 must be **unlimited and recurring** — never a second bounded set, list, ladder, page or
  album the player completes. **(c)** Duplicates rise as `relicsPerArea` falls, and duplicates are not
  a promise; see the row below.
- **The build contract's collection invariant** *[build-contract definition, currently
  tech/architecture]*: `relicsPerArea >= largest set` forbids the only change that satisfies criterion
  1. **Three sheets in two categories now require the same relaxation** — core-loop work on pacing,
  world-scale work on fiction, this sheet on the promise. It is one predicate.
- **Duplicate-handling work** *[currently Systems, wave 2]*: **at S4 every Find a player uncovers is a
  duplicate, so the duplicate answer is the entire late reveal experience, not an edge case.** Nobody
  has stated that. Two prohibitions follow: it may not be framed as filling, completing or progressing
  anything, because there is nothing left to fill; and **the late promise may not be made to rest on
  it**, because sheet `01` fixed a duplicate as the one event that adds nothing permanent. The
  constraint *"solve duplicates without adding a currency"* `[brief: soft]` is untouched.
- **Balance and economy work** *[currently Balance & Tuning, wave 4; Systems for the sink]*: past S3,
  currency accrues with nothing to buy. **A meaningless rising number may not be the figure on screen
  at S4**, which is a requirement about what is displayed, not a request for a new sink.
- **Interface-surface work** *[currently UI/UX — Screens, wave 4]*: **exactly one figure counting the
  parts the player has finished, with no denominator, no fraction and no percent.** At S4 it is the only
  quantity still moving that means anything, and if finished geometry collapses it is the only carrier
  the promise has. Consistent with world-scale work's no-total rule; it forbids counting the place, not
  the player's work.
- **Cleared-area and passage work** *[currently Setting — `04-permanence-and-passage`, this domain's
  neighbour, not yet written]* **and persistence work** *[Tech & Data]*: the either/or above is yours to
  close. If a finished part is unreachable after completion, say so, so interface work knows the count
  is mandatory rather than nice.
- **Inhabiting work** *[sheet `03`, this domain]*: **at S4 every minute is a between-minute.** Your
  guarantee list stops being the connective tissue between peaks and becomes the whole late game. That
  is an argument for its weight, not a change to its subject.
- **Mood-and-beat work** *[`cid/theme/tone/03-beat-map.md`, this category, already ruled]*: ratified,
  not amended. `M11` gets a fiction reason it did not have — at S4 no promise remains to close — and
  nothing here changes a peak, a beat or a baseline input.
- **Discovery and marketing work** *[wave 5]*: *"Clear the overgrowth, find what's buried"*
  `[brief: soft]` `[you accepted: R6 Q1]` stays as the store hook and is **a first-session promise with
  a supply of 24.** It may not be restated on an in-game surface as a standing promise, no line may
  promise endless new things to find, and no line may promise a world that ends up reclaimed (sheet
  `01`). What is true and sayable at every hour: **finished work is never asked for twice.**
- **Live-ops work** *[wave 5]*: the only extension consistent with this promise is **more parts.**
  `05-OUTWARD.md` already notes new authored chunks need no system changes; that is the whole licence.
  Not events, not returns, not accrual, not a completion season.
- **Whoever owns the CID→build seam**: this sheet's only mechanical trace is criterion 1, which lands
  in `game/test/config.spec.luau` beside core-loop work's weaker assert. `npm run bridge` will report
  COMPLETE whether or not any of this survives.

---

## Acceptance criteria

Counts over the **43 player-facing strings** `playerFacingStrings()` extracts, as enumerated in
`cid/theme/tone/01-register.md`.

1. **Finite-promise durability, checkable against `cid/gameplay/core-loop/04-lap-vs-session.md`.**
   `game/test/config.spec.luau` asserts `ceil(totalFinds / collection.relicsPerArea) >= 8`, where 7 is
   the maximum complete laps in a bound session per that sheet. **This fails at the shipped manifest at
   4 against a required 8**, and passes at `relicsPerArea <= 3` once the schema invariant is relaxed to
   `areasPerDepth · relicsPerArea >= setSize`. The check is conservative in the right direction:
   duplicates only raise the real figure.
2. **No-ending check, both halves.** (a) Zero of the 43 strings matches
   `complete|completed|completion|final|finale|ending|master|trophy|prize|reward|congratulations|100`,
   whole-word and case-insensitive — **verified 0 of 43 today** against every `manifest` block on disk.
   (b) Zero events, strings or surfaces are conditional on the collection reaching 24 of 24; the events
   half is already asserted by `cid/theme/tone/03-beat-map.md` criterion 4, and this extends it to
   strings and surfaces.
3. **One-finishable-thing check, against every `manifest` block under `cid/`.** Exactly **one** array
   of named player-completable items exists — `collection.sets[].relics`, 24 entries — and **zero**
   sheets introduce a second bounded set, list, page or album the player completes. `upgrades[].maxLevel`
   is excluded by name: a cap on purchases is not a set that fills. This sheet adds **0** and carries
   **0** `manifest` blocks.
4. **Late-carrier check.** Exactly **1** player-facing figure counts the parts the player has finished,
   and it contains no denominator, no `of`, no `/` and no `%` — consistent with
   `cid/theme/setting/02-extent.md` criterion 2, which forbids a total for the place and exempts counts
   of the player's own work. This sheet requests **1** surface and **at most 1** new player-facing
   string, which must pass `cid/theme/tone/01-register.md`'s P1–P10; **0** is achievable if the figure
   sits beside an icon.

---

## Not decided here

What content exists past 24 of 24, and every value in criterion 1 — `collection.relicsPerArea`,
`collection.areasPerDepth`, discovery rates per depth tier, set-completion bonuses (Meta & Content,
wave 3, then Balance & Tuning). How duplicates are answered (Systems, wave 2). Whether a finished part
stays re-enterable, and what one physically becomes (Setting — `04-permanence-and-passage`, then
persistence work). Whether the finished-parts figure exists as a HUD, a screen or neither (UI/UX,
wave 4, then the pattern registry). Any cue, magnitude, sound or effect at any of the four states
(mood-and-beat work, Audio, Mechanics, Art). The named feeling of the minutes at S4 (sheet `03`, this
domain). Whether the schema should relax its collection invariant (build-contract definition). The
store line and the title (Discovery & Marketing, wave 5).

---

## Pushing back

**Overruled: the reading of *"Clear the overgrowth, find what's buried"* as the fantasy's standing
promise** (`05-OUTWARD.md`, *"A dual promise"*, `[brief: soft]` `[you accepted: R6 Q1]`). **The line
itself is untouched and stays the store hook.** What I overrule is its lifetime: its second half has a
supply of exactly 24, and world-scale work states in canon that past the fourth set the works
continues *"with nothing new to find"*. A promise with a countable supply is a first-session promise,
and treating it as the standing one guarantees the fantasy is lying by S4. Sheet `01` already demoted
revelation from *register* on occupancy and structural grounds; this is the same demotion applied to
the promise's clock, and it costs the brief nothing it did not already concede in its own *"honest
weakness"* paragraph.

**Not overruled, sharpened:** `03-META.md`'s objective table labels 24 of 24 *"long-term"*
`[brief: soft]`. At shipped values that label is false — core-loop work dates it inside session one. I
require it be made **true** (criterion 1) rather than relabelled, which is a requirement on content
volume, not an overrule of the ladder.

---

## Flagged to the developer

**Nothing in the brief states what the game offers a player who has finished the collection.**
`OPEN.md §1` carries no audit row for it; `OPEN.md §4` routes *"reasons to return"* to content work,
which answers a system question rather than this one. So the whole of this sheet is `[cid: decided]`.

| alternative | why I did not take it | cost of overruling me |
|---|---|---|
| **Nothing added past 24 of 24** — the offer reduces to permanence and more parts. **Taken.** | — | — |
| **Priority 2's *"visitable restored ruins"*** — the brief itself calls this *"the strongest future option, since restoration is inherently something you would want to show off"* | It is **priority 2**, needs a visiting system and a social surface nothing funds, and runs into *"no mechanical interaction"* `[brief: soft]` plus world-scale work's `A13` (nothing may be placed, dressed or decorated by a player) | **Expensive, and genuinely attractive.** It is the one candidate the brief names itself. It reopens a Setting row and needs a wave-2 system decision |
| **A second finishable thing** — a fifth set, an achievement list, a completion ladder | Contradicts *"the collection is the only finishable thing"* `[brief: soft]`, and re-promising a finish makes the first finish provisional | **Cheap to build, expensive to the fiction.** It also hands mood-and-beat work an ending it has ruled does not exist |
| **Daily rewards, offline accrual, or seasons** | All priority 3; offline accrual is binding by consequence; the *"seasons"* reframe was refused by name | Reopens `[you chose: R2 Q2]` |

**Two rulings I would actually like.**

1. **Is 24 of 24 inside session one acceptable, given that success is shipped artifacts rather than
   players?** If yes, criterion 1 should be struck and the finite promise is decoration — say so, and
   this sheet gets shorter rather than wrong. **Recommendation: take core-loop work's fix (i) at the
   cheap end — `relicsPerArea` 3, `areasPerDepth` 2, 8 laps — plus depth-escalation work's
   recommendation (i) on `maxLevel`.** It is two integers and one invariant, and it is the smallest
   change that makes both the return hook and the objective ladder true.
2. **May the store keep promising *find what's buried* while the game stops having anything new to
   find?** My answer is yes for the listing and never for an in-game surface, on the ground that a
   store line sells an entry and an in-game line makes a standing claim. If you want the two held to
   one standard, that is a one-line ruling here and a constraint on wave 5.

No URL was fetched in this run: every occupancy figure above is relayed from
`cid/theme/fantasy/_lead.md` and marked as such, and every `[research: repo — ...]` cites a file read
this run. `npm run bridge -- --contract` could not be executed because this session has no shell tool.
