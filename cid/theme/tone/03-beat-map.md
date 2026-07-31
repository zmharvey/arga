# 03 — Beat map

**Domain:** Tone · **Category:** Theme & Narrative · **Wave:** 1

## Decision

**The fiction attends exactly fourteen moments and may peak at two of them: a Find coming out of the
ground, and a set closing at 6 of 6. Set completion is the loudest.** The other twelve are closed
below with a verdict each, and ten of them may never be peaks. **Between peaks the baseline is
invariant, not quiet:** it takes exactly one input, and six named inputs are forbidden it.

**I ratify `gameplay/core-loop/02-payoff-weights`'s ordering rather than re-deciding it.** That sheet
ranks payoff *magnitude* and splits the signature cue (the reveal, 24 firings) from the magnitude
ceiling (set completion, 4 firings). This sheet ranks what the fiction is permitted to *claim*, which
is a different question with the same answer, and it adds the three things magnitude does not cover:
**membership** (which moments may be peaks at all), **what a peak may not do** (four prohibitions),
and **how flat flat is** (one permitted variation, six forbidden ones). No number in that sheet is
restated here as mine.

**The ceiling does not rise with depth, with progress, or at 24 of 24.**

**No manifest block: Tone owns no contract key.** No shell in this run, so instead of
`npm run bridge -- --contract` I read `SCHEMA` in `bridge/schema.mjs` directly: eleven keys (`area`,
`tiers`, `upgrades`, `vocabulary`, `currency`, `movement`, `patch`, `collection`, `onboarding`,
`modules`, `runtime`), owners `gameplay/*` ×7, `tech/architecture` ×2, `art/objects` ×1,
`theme/vocabulary` ×1. The one `theme/*` key is `vocabulary` and it is already provided by
`cid/theme/vocabulary/02-banned-words.md`. **Nothing in the contract holds a beat ordering, a cue, a
peak or an ambient parameter**, so this sheet's whole output is a bound on other domains' work and a
table a reviewer holds. `[research: repo — bridge/schema.mjs:29-320, :499, read this run]`

---

### The inventory, closed

Fourteen rows. **A build that emits a feedback event mapping to no row has invented a moment**, and
the correction is to amend this table, not to ship the event.

| # | moment | verdict | in one line |
|---|---|---|---|
| **M1** | a patch clears | **baseline** | this is where before/after actually lives, at every patch of a lap |
| **M2** | an upgrade is bought | **beat, and the fiction is absent** | the player changed their own tool; the place does not know it happened |
| **M3** | an area becomes wholly clear | **beat** | the last instance of a claim the baseline has already made all lap |
| **M4** | a Find comes out of the ground | **peak** | the only new claim in the game: the world gives a thing up and it is kept |
| **M5** | a set closes at 6 of 6 | **peak, and the ceiling** | the only moment at which a bounded thing becomes whole |
| **M6** | the first Find of a save | **M4, at M4's size** | a first-time ceremony sizes every later reveal as a repeat of it |
| **M7** | a Find already owned is uncovered | **baseline** | may be audible; may not be a reduced M4 |
| **M8** | arriving in a deeper area | **baseline** | nothing gates it, so a peak here makes walking an accomplishment |
| **M9** | the collection index is opened | **baseline** | empty slots are information; opening is the player's act, not the world's |
| **M10** | re-entry after an absence | **baseline, and silent about the absence** | no beat may be a return |
| **M11** | 24 of 24 | **M5's fourth firing, at M5's size** | nothing follows it, and the game may not peak at its own exhaustion |
| **M12** | a stranger uncovers something | **baseline at most** | never comparative, and never carrying any part of M4's cue |
| **M13** | a session begins or ends | **no cue at all** | an opening flourish and a wind-down are shapes this fiction does not have |
| **M14** | the stretch before M3 or M4 | **no channel exists** | anticipation is the smallest available unit of tension. See `B1`, `B2` |

Two peaks (M4, M5), two beats (M2, M3), ten rows that may not be peaks.

### What a peak may not do

| # | prohibition | the check |
|---|---|---|
| **K1** | **A peak may not be praise.** No peak evaluates the player or their action. No graded, ranked, streak-counted, multiplied or comparative token appears in one: no star, no letter, no rating, no "×N" callout, no percentile, no other player's figure. | enumerate the tokens in each peak's payload; the count of evaluative tokens is 0 |
| **K2** | **Every peak is struck, not swelled.** Its onset is its maximum in every channel, non-increasing after. Nothing precedes it, in any channel, that would not have happened had the peak not occurred. | no pre-roll, no wind-up, no scheduled-ahead state; first rendered frame is the maximum |
| **K3** | **A peak's world footprint is exactly the thing that just changed.** No peak alters the appearance or state of anything the player did not just change. Interface may occupy the screen; the world may not restate itself. | no ground already cleared changes at M3, M4 or M5; no area-wide light, colour, growth or bloom change fires at any peak |
| **K4** | **A peak may not point at what is undone, and may not be a return, a cycle or a renewal.** No peak names or displays a remainder, a next target, a thing owed, or a thing coming back. | no peak's payload contains a count of what is missing or a forward reference |

### How flat the baseline is

**Flat means invariant, not quiet.** How loud the baseline may be is `core-loop/02`'s (it caps the
tick channel's spread and puts tier variance in pitch rather than level) and I do not restate it. What
this sheet fixes is that **the baseline takes exactly one input: the tier of the patch being cleared.**

Six inputs are forbidden to every continuous or ambient channel:

| # | forbidden input | what it would be |
|---|---|---|
| **B1** | the player's distance to a buried Find | a hot-and-cold cue: seeking, then anticipation, then a mastery the brief forbids inventing |
| **B2** | the fraction of the area still standing | a build toward M3. A readout may show it; nothing ambient may respond to it |
| **B3** | the area's depth | a rising ceiling, which is escalation with the word filed off |
| **B4** | the collection count, or any progress figure | the ambient layer rewarding a fuller index, which is praise with no words in it |
| **B5** | elapsed session time | a session shape: a warm-up or a wind-down |
| **B6** | time since the last session | the world having done something while the player was away |

**One permitted variation, and it is already owned elsewhere:** the tier of the patch cleared
(`gameplay/systems/01`, carried as pitch per `core-loop/02`). Anything else is a seventh input and
fails.

## Why

### Zero tension is binding, and every route in is a baseline variation

*"Zero tension is deliberate ... Satisfaction comes from before/after and discovery, nothing else"*
and *"nobody downstream should invent tension to fill the gap"* (`02-GAMEPLAY.md`), the second
elevated by `HANDOFF.md` into one of six things to know before designing anything: `[brief: binding]`
on the instruction, `[brief: soft]` `[you accepted: step 6 Q2]` on the choice. `01-register.md` closed
the grammatical routes (no imperative, no future, no exclamation). **The routes it could not close are
all in the ambient layer, because tension is a derivative:** a cue that varies with proximity, with
remaining work, with depth or with time away is a cue that is *going somewhere*, and going somewhere
is the whole of what a build is. `B1` to `B6` are that closed as six named inputs rather than as an
adjective. `[cid: decided]`

`B1` is the one a competent audio or VFX pass would reach for first, and it costs the most. Under
contact placement (`core-loop/03`) a Find is met by sweeping, so a proximity cue converts sweeping
into hunting, and hunting is an execution skill against *"**No mastery layer.** ... Stated so nobody
invents one"* (`03-META.md`) `[brief: soft]` `[I assumed]`. It also converts M4 from a surprise into
an arrival, which spends the one thing `OPEN.md §2` calls the best in the game.

`B2` needs care, because the brief appears to ask for it. `04-PRESENTATION.md`: *"area-completion
progress must be visible while moving, since 'how close am I to done' is the core tension"*
`[brief: soft]`, untagged prose in a layer-4 sheet. **I read *"core tension"* as a figure of speech
and honour the requirement it carries:** the readout stays, it may change monotonically as the player
clears, and **nothing ambient may respond to it.** Read literally it would contradict a binding
handoff item, which is not mine to resolve. Flagged below.

### The claim ladder, which is why the ordering comes out the same way from this side

The fiction can make exactly three kinds of statement in this game, and they rank:

| claim | where it lands | how often |
|---|---|---|
| **it stays** | the baseline, at every patch (`M1`), for the last time in an area at `M3` | continuously |
| **it comes out, and it is kept** | `M4` | 24 times |
| **it is whole** | `M5` | 4 times |

**Area completion is a beat rather than a peak because its claim is not new.** *"Cleared is permanent,
overgrowth never returns ... This is the payoff and it is load-bearing"* (`01-FOUNDATION.md`)
`[brief: binding]` `[you chose: R2 Q1]` is demonstrated at every patch in the lap. The completion
moment is the last instance of a claim the player has already been shown all lap, not a new one.
`[cid: decided]` `core-loop/04` reached the same verdict from frequency (3 to 7 firings a sitting, *"a
repeating beat of the loop, not the session's climax"*); this is the tonal reason for it, and it
carries a consequence frequency does not: **the before/after payoff is a requirement on the baseline,
not on a peak.** The cleared-against-standing contrast has to read at the scale of one patch, because
that is where the brief's first named source of satisfaction is actually delivered. That lands on Art,
below.

**Set completion is the ceiling because whole is the strongest thing this fiction can say.** With
endless areas, *"the collection is the only finishable thing"* (`03-META.md`) `[brief: soft]`
`[you accepted: R6 Q3 → R5 Q3]`, and its objective ladder puts *"complete one set"* above *"find at
least one new relic"*. An area finishing is finished-here-and-there-is-always-more; a set closing is
six scattered things together and not undoable. `[cid: decided]` This is the same rung `core-loop/02`
put at the top of its magnitude ladder on the strength of that same objective table, arrived at from
the claim side, so **the two orderings agree and neither is the other's evidence.**

**Discovery keeps the signature, which is `OPEN.md §2` verbatim and survives intact:** *"a relic
reveal owns the best sound in the game"* `[brief: soft]` `[I assumed]`. Largest and most recognisable
are different properties of different moments, a distinction `core-loop/02` drew first and I inherit.

### Ten rows that may not be peaks, and the specific thing each one would import

`[cid: decided]` throughout. The brief names none of these moments.

- **M6, the first Find.** `core-loop/02` already forbids a cue that grows with progress, so Find 1
  must land at full weight: *"the first patch they clear has something under it"* (`02-GAMEPLAY.md`)
  `[brief: soft]` `[you accepted: R6 Q3]`. The tonal half is the converse and it is the one at risk: a
  first-time ceremony makes reveal 2 a reduced version of reveal 1, and the player meets 23 of those.
  `S6` in `cid/theme/lore/02-the-silences.md` independently bans *"first"* as a canon claim, and the
  sheet names first-session choreography as its most likely violator.
- **M8, arriving deeper.** *"No gating mechanism needed"* (`03-META.md`) `[brief: soft]`
  `[I assumed]`, and `core-loop/04` requires the next area be enterable the instant one completes.
  Nothing was passed, so a peak here celebrates walking, and `B3` forbids the ambient layer noticing
  depth in any case.
- **M9, opening the index.** The empty slots are half of the stated return hook (*"An unfinished area
  and a half-empty index"*, `03-META.md`, `[brief: soft]` `[you accepted: R3 Q3]`). Information, at
  the player's initiative. `02-flavour-and-humor.md` already rules that a flavour line read in that
  panel is never a beat, and I ratify rather than restate it.
- **M10, re-entry.** The most dangerous row in the table. A welcome-back is a return beat, which is
  binding-forbidden (*"**No rebirth.** ... Reframing it as 'seasons' and making it optional were both
  declined"*, `01-FOUNDATION.md`, `[brief: binding]` `[you chose: R2 Q2]`); if it ever counts anything
  it presumes a daily visit, which `cid/theme/_category.md`'s scope gate forbids by name; and lore
  `S5` forbids the waiting figure that is the cheapest fictional patch for a weak return pull.
  **The world is exactly as it was left, and says nothing about having been left.** `core-loop/04`
  makes the mechanical half of this work for me: re-entry restores the player's place, so the
  unfinished edge is already in front of them and needs no announcing.
- **M11, 24 of 24.** It is M5's fourth firing at M5's size, and no extra event fires. Three reasons:
  nothing scales with effort (`core-loop/02`); `core-loop/01` and `03` establish that both peak kinds
  go extinct permanently there and *"what content exists past collection completion"* does not exist
  yet; and an ending cue would put the game's largest moment at the point it stops having moments.
  **A game with no failure state also has no ending available to it**, and manufacturing one is the
  same error as manufacturing tension.
- **M12, a stranger's find.** *"no mechanical interaction"* (`02-GAMEPLAY.md`) `[brief: soft]`
  `[you accepted: R6 Q2]`, and the scope gate forbids *"any fiction of exchange, gifting, rivalry,
  ranking, or comparison between players"*. `cid/theme/identity/03-co-present-stranger.md` names *"an
  ambient note when anyone uncovers something"* as a warmth touch that would extend it, and I do not
  overrule that: **the baseline may hold such an event; the peak inventory may not grow to hold it**,
  and it may carry no part of M4's cue, or the player learns that someone else's find sounds like
  theirs.
- **M13, session edges.** `B5` covers the ambient case; the row exists because a one-off flourish at
  login is not an ambient variation and would slip past it.
- **M2, purchase, and M7, duplicate.** Both keep the magnitudes `core-loop/02` gave them. The tonal
  addition is that **the fiction does not attend either**: nothing in the world may react to a
  purchase, because the player changed their own tool and lore `L6` says nobody is watching
  (`cid/theme/lore/01-the-past.md`); and a duplicate's cue must be a member of the baseline family
  rather than a shortened, muted or pitched-down M4, because a reduced peak is a disappointment and
  **this fiction has no negative register at all.** `core-loop/03` records that a duplicate currently
  fires nothing and `core-loop/02` puts its eventual answer between the tick and the purchase beat;
  that band is where this rule lands.

### The ceiling is flat, and permanence is why

`core-loop/02` rules that depth does not buy volume, from onboarding and from endlessness. The tonal
reason is independent and stronger: **an escalating cue implies the earlier instance was provisional.**
In a game whose entire fiction is that a change is permanent, a reveal that gets bigger later says the
first one was worth less, and a completion that gets bigger deeper in says the shallow area is less
finished than the deep one. Both are false in the canon: lore `L4` fixes depth as coverage rather than
chronology and holds weathering identical at every depth. `[cid: decided]` So `B3` is not a taste
preference about restraint; it is the ambient layer being forbidden from contradicting permanence.

### What a peak is allowed to be about, given restoration means exposure

`cid/theme/lore/01-the-past.md` rules *"the stone was always sound under the green"* and `L5` permits
**exposure, not reconstruction**, banning `restore`/`restored` as a claim about any object. `K3` is
that made observable at the moment it is most likely to be broken: at M3 the obvious flourish is the
place visibly becoming better, a light change, a bloom, growth reversing, and every one of those is
reconstruction. **The stone at completion looks exactly as it looked one patch earlier, minus one
patch of green.** `[cid: decided]` `K3` also protects the baseline's job: if the world restates itself
at a boundary, the 139 clears before it were incomplete after all.

### `[playtest unknown]`, and the knob that cannot become tension

`OPEN.md §6` concedes zero tension is *"possibly correct for a relaxing restoration game; **entirely
unverified**"*, and my index routes that doubt here with an instruction not to resolve it by adding
tension.

- **Peak count: starting value 2. Test range 2 to 3.** A third may only be created by **promoting a
  row already in the table**, and the sole promotable row is M3. Adding a row is re-opening this
  sheet. What would settle it: whether players in the band can name the game's biggest moment after a
  session, and whether they name the same one twice.
- **Permitted baseline inputs: starting value 1 (tier). Test range 1 to 2.** If flatness reads as
  monotony, **the only admissible second input is a per-area constant chosen at area entry and
  unchanged for the whole lap.** That is stated in advance precisely so a playtest cannot answer
  monotony with a ramp: a value that is constant within a lap cannot build inside one, which is what
  keeps this knob from turning into `B2` by another name. What would settle it: whether players stop
  moving out of boredom in a lap's second half.

## Consequences for other work

- **Feedback and celebration design for the completely-clear moment** *[currently Mechanics, wave 2,
  and it is one of the two kinds of work that can overturn this sheet]*: M3 is a **beat**. Its
  celebration is yours and its ceiling is `core-loop/02`'s. What this sheet adds is `K3`: the
  celebration may not change the appearance of ground already cleared and may not include an area-wide
  light, colour, growth or bloom change. If you build a large completion celebration the claim ladder
  inverts and this sheet is wrong rather than merely overruled, so please overrule it in a
  `## Pushing back` citing this file.
- **Audio intent** *[currently Audio, wave 4, and the second kind of work that can overturn this]*:
  you inherit the closed inventory, `K1` to `K4` and `B1` to `B6`. Three specifics. **No ambient
  channel may take any of the six forbidden inputs**, which is a harder rule than a mix note and rules
  out the two most idiomatic moves in the genre. **The word *"achievement"* is struck from your own
  `OPEN.md §2` default** (see `## Pushing back`); the magnitude ordering it sat inside is untouched.
  And **no cue accompanies a flavour line**, which is `02-flavour-and-humor.md`'s ruling, cited here so
  it is not lost between sheets.
- **Art, environment and VFX** *[currently Art & Visuals, wave 4]*: two things, and the first is the
  larger. **The cleared-against-standing contrast is a baseline requirement and must read at the scale
  of a single patch**, because that is where the brief's before/after is actually delivered; a contrast
  that only reads across a finished area moves the payoff onto a beat that is forbidden from carrying
  it. Second, `K3`: no peak may restate the world, which with lore `L5` means no gilding, brightening,
  regrowth-reversal or bloom at M3, M4 or M5.
- **Duplicate handling** *[currently Systems, wave 2]*: whatever answer arrives without a second
  currency must produce an audible event **in the baseline family**, not a reduced M4. A shortened,
  muted or pitched-down reveal is the only shape explicitly forbidden.
- **Presence-sufficiency work** *[currently Social, wave 2]*: an ambient note for M12 is permitted and
  is bounded twice over: baseline band, and no shared material with M4. A ranking, a progress readout
  of someone else's work, or a comparative anything is out under the scope gate, not under me.
- **The progress readout and the persistent HUD** *[currently UI/UX, wave 4]*: the readout stays and
  may change monotonically. `B2` forbids anything ambient responding to it, and `K4` forbids a peak
  displaying a remainder. This is the row where the brief's own wording is nearest to a
  contradiction; see `## Flagged to the developer`.
- **Onboarding choreography** *[currently Onboarding, wave 2, with UI/UX]*: M6 gets no ceremony. Run
  1's reveal is the ordinary reveal at ordinary size, and `gameplay/onboarding/01-first-find.md`'s
  guarantee is about placement, which is untouched. The first ten seconds stay wordless (register
  `01`) and unceremonious (here).
- **Area authoring by depth** *[currently Meta & Content, wave 3]*: depth may shift what the tick
  channel is made of, per `core-loop/02`, and may buy nothing larger anywhere. Arrival at a new area
  is not a moment, so no authored layout may open with a set-piece.
- **What content exists past collection completion** *[currently Meta & Content]*: whatever fills the
  empty top of the payoff ladder must be a **recurring** moment. This sheet supplies no ending beat
  and rules that none exists to supply, so content that reads as a finale is out even though the
  ladder has room for it.
- **The return hook and live-ops intent** *[currently Live Ops, wave 5]*: M10 is binding-adjacent and
  not negotiable at your wave. Nothing may mark a return, count consecutive days, or represent
  anything the world did while the player was away. Lore `S5` names you as its most likely violator
  and this sheet agrees.
- **Payoff-magnitude work** *[`gameplay/core-loop/02`, wave 1]*: nothing here changes any of its five
  weights, its loudness ordering, its onset-separation rule or its coincident-case sequence. One note
  for the record and not a correction: its criterion 4 orders **level**, and this sheet's ordering is
  of **permitted claim**, so a reviewer should not read them as two measurements of one quantity.
- **Do-nots work** *[sheet `04`, this domain]*: `M1` to `M14`, `K1` to `K4` and `B1` to `B6` are
  **decided here** and must be cited rather than restated. The one thing sheet `04` can usefully add
  is the audit route: how a reviewer discovers that a build emitted an event matching no row.

## Acceptance criteria

1. **Inventory closure.** This sheet's table contains exactly 14 rows, of which exactly 2 are marked
   `peak` and exactly 2 `beat`. Every distinct feedback event a build emits maps to exactly one row,
   and the number of emitted events mapping to a row marked `peak` is 2.
2. **Baseline invariance (`B1`–`B6`).** No continuous or ambient feedback parameter takes as an input
   the player's distance to a buried Find, the fraction of the area uncleared, the area's depth, the
   collection count, elapsed session time, or time since the last session. Exactly one input is
   permitted and it is the cleared patch's tier. A build in which any of the six values reaches an
   ambient parameter fails, whatever it sounds or looks like.
3. **Struck, not swelled (`K2`), and no world restatement (`K3`).** For each of the 2 peaks, no code
   path schedules, renders or alters anything before its onset; the cue reaches its maximum in its
   first rendered frame and is non-increasing after; and no patch, prop, light or material outside the
   thing that just changed is modified by the peak.
4. **No praise and no ending (`K1`, `K4`, M6, M11).** No peak payload contains an evaluative, graded,
   ranked, streak or comparative token, and none contains a count of what remains. The fourth
   set-completion event is identical in kind and magnitude to the first, no event fires that is
   conditional on the collection reaching 24 of 24, and no event fires that is conditional on a Find
   being the player's first.

## Pushing back

**Overruled: the word *"achievement"* in `OPEN.md §2`** (*"An area's completion gets a short resolving
chord, the only 'achievement' sound"*) `[brief: soft]` `[I assumed]`. **There is no achievement sound
in this game.** A peak marks a change in the world; it does not return a verdict on the player.
Register `01` forbids the game congratulating the player, `01-FOUNDATION.md` rules out a power fantasy
`[brief: soft]`, `03-META.md` designs no mastery layer, and lore `L6` states that nobody is watching.
An achievement cue is the audible form of the observer that canon says is absent.

**This changes what the top cue is about and not where it sits.** `core-loop/02` moved the achievement
ceiling from area completion to set completion; I am striking the category rather than moving it
again, and its magnitude ordering, its onset-separation rule and its 24-firing repetition budget all
stand. M5 stays the loudest moment in the game. What it may not do is congratulate.

**Also overruled, in the same line and for the same reason:** the reading of `OPEN.md §2`'s *"Reveals
and completions are the two emotional peaks"* under which area completion is a peak. That was already
overruled by `core-loop/02` on frequency grounds and I ratify it on claim grounds. Recorded because
the sentence is the closest thing the brief has to a beat map, and a downstream reader who finds it
should find both overrules together.

## Flagged to the developer

1. **`04-PRESENTATION.md` calls *"how close am I to done"* the game's *"core tension"*, and read
   literally that contradicts a binding handoff item.** I have read it as a figure of speech and kept
   the requirement (progress visible while moving) while forbidding anything ambient from responding
   to it (`B2`). Live alternatives: (a) figure of speech, taken here, which costs nothing and keeps
   the readout; (b) literal, in which case the game has one intended tension source and `HANDOFF.md`'s
   *"do not invent tension to fill the gap"* needs an exception written into it by you rather than
   inferred by me; (c) drop the readout, which I recommend against because the persistent HUD is
   already the game's known UI risk and removing its content does not remove the risk.
   **Recommendation: (a).**
2. **The completion moment gets a beat and not a peak, and that is the call most likely to feel
   wrong.** It is the moment the fiction is *about* (a place is done and stays done), and it is ranked
   third. Live alternatives: (a) beat, taken here, on the ground that the baseline has already made
   the permanence claim at every patch and a boundary event that restates it says the earlier ones
   were provisional; (b) promote M3 to a third peak, which is the one promotion this sheet's playtest
   range permits, at the cost of the game having three top moments and therefore none; (c) invert M3
   above M4, which is a revision request against `core-loop/02`'s magnitude ladder and I am not
   filing it. **Recommendation: (a), reviewed after the first playtest**, because it is the row a
   player's own answer to "what was the best bit" would settle in one session.
3. **Two kinds of work can overturn this sheet and both are downstream:** *feedback and celebration
   design for the completely-clear moment* [currently Mechanics, wave 2] and *audio intent* [currently
   Audio, wave 4]. Named so that a later wave overrules deliberately in a `## Pushing back` rather
   than diverging quietly, which is the failure mode my domain index predicts for this sheet.

## Not decided here

Every magnitude, every level, every duration, every onset separation and every rate
(`gameplay/core-loop/01` and `02`, then Balance & Tuning). What any cue is made of: the sound
(Audio, SFX and Stingers), the particles and lighting (Art, VFX), the notice or panel (UI/UX,
Feedback UI), the feel at the clear moment (Mechanics). How the completely-clear moment is celebrated
inside the ceiling above (Mechanics, wave 2). What a duplicate's answer is (Systems, wave 2) and what
its cue is (Audio). Whether a stranger's find registers at all (Social, wave 2). Whether the progress
readout exists as a HUD and what it looks like (UI/UX, wave 4). What a completed set grants
(Meta & Content, wave 3). What the game is after 24 of 24 (Meta & Content). Whether the contract
should grow a key that could hold any of this (build-contract definition, currently
tech/architecture; `core-loop`'s G11). The register the game speaks in (sheet `01`), how flavour text
is written (sheet `02`), and the exclusion list as an audit instrument (sheet `04`).
