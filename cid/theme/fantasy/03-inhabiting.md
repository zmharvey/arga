# 03 — Inhabiting

**Domain:** Fantasy · **Category:** Theme & Narrative · **Wave:** 1

## Decision

**The minutes that are neither a reveal nor a completion feel like *sure work*.**

> **The green goes as fast as the person walks; every step of it counts the same as every other step;
> and none of it can be done wrong or taken back. The only thing ever in doubt in this game is what is
> under the green — never what the walking does.**

**"Sure" means *not in doubt*. It never means *skilled*.** Nothing below is about the player becoming
better at anything: *"**No mastery layer.** ... **Stated so nobody invents one.**"* `[brief: soft]`
`[I assumed]`. The certainty is a property of the design, held constant from the first step to the
last, and the player acquires none of it.

### The guarantees about the player's own work

Six, `C1`–`C6`, each stated as a violation another category can be counted against. `C` because `R`,
`A`, `P`, `L`, `S`, `X`, `B`, `M`, `K`, `G`, `W` and `F` are all taken by sheets already on disk.

| # | guarantee | the violation |
|---|---|---|
| **C1** | **Nothing a step produces waits.** The whole yield of a cleared patch — the green gone, the credit, the `Find` if one is under it — lands inside the step that produced it. Nothing is held at a boundary, a panel, a button or a rejoin. **A recap of what the player already saw is permitted; a withholding is not.** | count of code paths or surfaces by which any yield of a cleared patch becomes available only after a later act: **0** |
| **C2** | **The ground is the record, and no surface is its only carrier.** What the player has done this sitting is readable from the ground itself, without opening or reading anything. | in one screenshot from the player's own camera, in a part between a fifth and four fifths cleared, with every interface element hidden, the boundary between finished stone and standing green is visible. Count of guarantees whose delivery needs a string, a screen or a figure: **0** |
| **C3** | **The same work never pays less for coming later.** No decay, no diminishing schedule, no soft cap, no per-session or per-day ceiling, no reduction for having cleared that kind of patch before. **Depth may make a step pay more; nothing may make it pay less.** | count of yield terms multiplied by a factor below 1: **0**. Count of caps on what a session, a day or a lifetime may produce: **0**. The values stay with balance-and-tuning work; I set none |
| **C4** | **No step can be the wrong step.** Holding upgrade levels fixed, one set of patches yields the same currency and the same `Finds` in any order, by any route, at any speed, at any hour. | count of yield terms reading route, order, streak, combo, timing, precision, elapsed time or time of day: **0** |
| **C5** | **Finished work is never asked for again, in either direction.** It is never re-cleared, and the game never *requires* going back to it — no upkeep, no inspection, no collection round, no maintenance, no errand into finished ground. It stays walkable so the player may go back **by choice** (`setting/04` `W2`). | count of systems that require re-entering a finished part: **0**. Count of states a finished part can lose: **0** |
| **C6** | **The record of the work is not a resource.** A filled slot and a finished part can never be spent, traded, converted, wagered, sacrificed or paid with. **Two exemptions by name:** currency, which is what the work *yielded* rather than the record of it, and a duplicate `Find`, which occupies no slot — so duplicate-handling work keeps every answer it had. | count of costs, sinks, wagers or conversions priced in filled slots or finished parts: **0**. Count of code paths that decrement the collection count or set an `areasComplete` flag from true to false: **0** |

**Data form: a proposed key, `assurances`.** Six named invariants, each with a counted violation, is
data — the same shape `characterArt.zeros` and `endgame.invariants` already use. No existing key
carries them: `response` governs one beat, `modifiers.factorFloor` covers a sliver of `C3`, and
nothing at all covers *"no yield term reads route or order"* or *"no code path decrements the
collection count"*. `[research: repo — bridge/schema.mjs, the 26 keys read this run]`

**This sheet coins one term: `sure work`.** Lowercase, two words, no hyphen, **writer-facing and
never rendered** — the same treatment `finder` was given in `cid/theme/identity/01-player-role.md`.

## Why

### The brief assigns the carrier and never the cargo

*"**Consequence: audio and visual feedback carry the entire load** — and nobody downstream should
invent tension to fill the gap"* `[brief: soft]` `[you accepted: step 6 Q2]`, elevated by
`HANDOFF.md` into one of six things to know before designing anything. `OPEN.md §2` names *"two
emotional peaks"* and names no emotion. **So a load is assigned, a carrier is assigned, and the thing
being carried is never stated** — and the minutes at issue are not even the two peaks, they are
everything between them. `OPEN.md §1` carries no audit row and no interview question touches it, so
all of this is `[cid: decided]`.

### Which minutes these are, in counts rather than adjectives

At the shipped manifest a depth-1 lap is roughly **164 modelled seconds and 140 clears**, of which
**3 carry a `Find` reveal** (`collection.relicsPerArea` is 3) and 1 is the area completion: **at
least 95% of the clears in a lap carry nothing above a currency tick**, one about every 1.2 s
`[research: repo — cid/gameplay/core-loop/01-payoff-frequency.md and 02-payoff-weights.md, read this
run]`. A bound session is **three to seven complete laps plus one in progress**, so this sheet governs
four hundred to a thousand clears a sitting.

**And after 24 of 24 it governs all of them.** Both peak kinds go permanently extinct at that point —
`endgame.extinctPayoffKinds` is `["upgradePurchase", "findReveal", "setCompletion"]`, leaving the tick
and the area completion `[research: repo — cid/gameplay/meta/07-after-the-last-find.md, read this
run]`. Sheet `02` put it plainly: *"at S4 every minute is a between-minute ... Your guarantee list
stops being the connective tissue between peaks and becomes the whole late game."*

### Why certainty is the affect this design left standing

Four sources of feeling were removed by name, and each removal deletes a *doubt*:

| removed | tag | the doubt it deletes |
|---|---|---|
| *"There is no failure state. No death, no losing, no loss of progress"* | `[brief: soft]` `[you accepted: step 6 Q2]` | whether the work survives |
| *"**No mastery layer.** ... Stated so nobody invents one"* | `[brief: soft]` `[I assumed]` | whether the player is doing it well |
| *"**Cleared is permanent — overgrowth never returns.** This is the payoff"* | `[brief: binding]` `[you chose: R2 Q1]` | whether it stays done |
| *"Input: movement only. No aiming, clicking, or ability buttons"* | `[brief: soft]` `[you accepted: step 6 Q3]` | whether the input landed |

**Strip jeopardy, competence, decay and execution and what is left is not an absence — it is
doubtlessness, and doubtlessness is a feeling.** `[cid: decided]` The test is that the design removed
every source of doubt about *the player's own action* while leaving every source of doubt about *the
world* untouched: which tier the next patch is, which part comes next, what is under the green. **The
uncertainty this genre's players expect is intact** — the reference's audience already wants *"a
luck/rarity roll to chase"* `[research: relayed from cid/theme/fantasy/_lead.md]` — and it lives
entirely on the world's side of the line. `C3` and `C4` forbid nothing about tier variance, burial or
shuffling, and say so.

**This is also the reading under which the brief's own moment-scale objective is a feeling rather
than a chore.** `03-META.md` states it as *"moment | clear the patch in front of you | overgrowth
disappears on contact"* `[brief: soft]`. **The measurable it chose is an immediate visible effect** —
not a number, not a total. `C1` and `C2` are that sentence held to for four hundred clears a sitting
instead of one.

### Reach is the mechanism, and it is the only anchor the brief gave me

*"**Feel:** reach is the primary sensation — a wider tool must visibly sweep more per step"*
`[brief: soft]` `[I assumed]`. Reach is felt as **coverage per step**, and coverage is only *felt*
rather than *reported* if the step's result arrives inside the step (`C1`) and is legible in the
ground rather than in a readout (`C2`). `[cid: decided]` Payoff work describes the ladder the same
way — *"its real payoff is the next clear feeling different"*.

**`C4` is where reach and the no-mastery rule meet.** A wider sweep must pay for itself in *ground per
step*, never in *ground per skilful step*. The moment a route, an order or a timing is worth more than
another, reach becomes a technique, and technique is the mastery layer the brief says nobody should
invent. Mood-and-beat work closed the perceptual half — its `B1` forbids any ambient channel taking
the player's distance to a buried `Find`, because *"a proximity cue converts sweeping into hunting,
and hunting is an execution skill"*. **`C4` closes the economic half**: it is not enough that the game
does not *cue* a better route, it must not *pay* one.

### What this does not do: it adds no third source of satisfaction

*"Satisfaction comes from before/after and discovery, nothing else"* `[brief: soft]`. **I am not
adding a source.** Before/after is the *event*; sure work is what before/after feels like when it is
guaranteed four hundred times a sitting. Mood-and-beat work says where the cleared-against-standing
contrast must read (at one patch); `C2` says what the contrast is *of* — **a boundary the player
made, at the scale of a whole sitting.** Two different scales, one cited and not restated.

### Occupancy: both available names for these minutes are taken

**The genre's own name for these minutes is *relaxing*, and every neighbour claims it**: all three
shipping games in the `X Incremental` family self-describe as relaxing, and `Carpet Cleaning
Simulator` ships *"calming gameplay"* and *"cozy and subliminal spaces to restore"* at ~26.6M visits
in a quarter `[research: relayed from cid/theme/fantasy/_lead.md and cid/theme/tone/_lead.md]`.
Register work then banned the word outright as a mood the game may not claim about itself — `P10`,
ten mood words including `relaxing`, `calm`, `cozy` and `peaceful`. **So *calm* is simultaneously
occupied, unsayable and unfalsifiable.** Sure work is none of the three: it is six things a build
either does or does not do.

The second available name is *anticipation*, and it is closed twice — sheet `01` forbids this sheet
naming the feeling *anticipation of a reveal*, and mood-and-beat work's `M14` calls anticipation
*"the smallest available unit of tension"* and gives it no channel.

### Wordless deliverability, with zero new surfaces

All six guarantees are arrivable at from priority-1 behaviour: the patch vanishes on contact and is
credited in the same tick; the ground behind the player carries the shape of where they walked; the
thousandth clear pays like the first; a part walked back into is still finished and nothing asked the
player to come; nothing in the game ever offers to take a slot or a part.

**`[playtest unknown]` — whether `C5` is legible with no words**, because it is the one guarantee a
player cannot verify inside a single sitting. Starting value: **0 strings state any of the six.** Test
range: **0 to 1 string**, and if one is ever owed it states `C5` and nothing else.

### `[playtest unknown]` — whether "nothing at stake" reads as flat

`OPEN.md §6` concedes zero tension is *"possibly correct for a relaxing restoration game; **entirely
unverified**"*. **Starting value: 0 friction terms, all six guarantees in force.** The range is a
spend order rather than a knob, because "it feels empty" must not be answerable by adding a penalty:
(1) increase the non-numeric per-patch feedback; (2) increase **area supply** so more ground stands in
front of the player; (3) a developer ruling, never a domain's — and even then `C4` and `C6` are the
last two to move, because a graded step and a spendable record are the two changes that would make
every other sheet in this category wrong.

**Nothing binding and nothing soft is overruled anywhere in this sheet, so there is no
`## Pushing back` section.**

```manifest
{
  "provides": "assurances",
  "status": "proposed",
  "value": {
    "affect": {
      "term": "sure work",
      "definition": "not in doubt; never skilled",
      "rendered": false,
      "playerFacing": false,
      "casing": "lowercase, two words, no hyphen",
      "collectedBy": "vocabulary's canonical list, marked internal"
    },
    "scope": {
      "clearsPerLapAtDepth1": 140,
      "findsPerLap": 3,
      "areaCompletionsPerLap": 1,
      "fractionOfClearsCarryingNothingAboveATick": { "atShippedValues": 0.95, "floor": 0.95, "past24of24": 1.0 },
      "lapsPerBoundSession": [3, 7],
      "governsAllMinutesOnceFoundEqualsTotalFinds": true
    },
    "guarantees": [
      {
        "id": "C1",
        "guarantee": "nothing a step produces waits",
        "countOf": "code paths, surfaces or interactions by which any yield of a cleared patch - its currency, its Find, or its disappearance - becomes available only after a later act (a button, an area boundary, a panel, a rejoin)",
        "expect": 0,
        "permits": ["a recap of what the player already saw"],
        "forbids": ["a claim, collect or cash-in affordance of any kind"],
        "landsOn": ["clear-on-contact feedback work", "interface-surface work"]
      },
      {
        "id": "C2",
        "guarantee": "the ground is the record, and no surface is its only carrier",
        "countOf": "guarantees whose delivery requires a string, a screen or a figure",
        "expect": 0,
        "observable": "in one screenshot from the player's own camera, in a part between a fifth and four fifths cleared, with every interface element hidden, the boundary between finished stone and standing green is visible",
        "landsOn": ["environment and VFX work", "interface-surface work"]
      },
      {
        "id": "C3",
        "guarantee": "the same work never pays less for coming later",
        "countOf": "yield terms multiplied by a factor below 1, plus caps on what a session, a day or a lifetime may produce",
        "expect": 0,
        "permits": ["depth raising yield per step", "permanent multipliers above 1", "any steepness of cost growth"],
        "forbids": ["decay", "a diminishing schedule", "a soft cap", "a per-session or per-day ceiling", "a reduction for having cleared that kind of patch before", "a SKU that lifts a cap, removes a diminishing return, refills anything, or restores a rate the base game lowered"],
        "alreadyPartlyHeldBy": "modifiers.factorFloor >= 1",
        "landsOn": ["balance-and-tuning work", "price-and-SKU work", "area-authoring and depth work"]
      },
      {
        "id": "C4",
        "guarantee": "no step can be the wrong step",
        "countOf": "yield terms reading route, order, streak, combo, timing, precision, elapsed time or time of day",
        "expect": 0,
        "observable": "holding upgrade levels fixed, two runs over the same 140 patches in different orders differ by 0 in currency and in the set of Finds",
        "doesNotConstrain": "how a clear FEELS; only what it is worth",
        "landsOn": ["balance-and-tuning work", "clear-on-contact feedback work"]
      },
      {
        "id": "C5",
        "guarantee": "finished work is never asked for again, in either direction",
        "countOf": "systems that require re-entering a finished part, plus states a finished part can lose",
        "expect": 0,
        "dependsOn": "cid/theme/setting/04-permanence-and-passage.md W2 - a finished part stays walkable so the player may return by choice",
        "fallbackIfW2Struck": "the finished-parts figure required by cid/theme/fantasy/02-promise-over-time.md",
        "landsOn": ["endgame-content work", "passage work"]
      },
      {
        "id": "C6",
        "guarantee": "the record of the work is not a resource",
        "countOf": "costs, sinks, wagers, trades or conversions priced in a filled slot or a finished part, plus code paths that decrement the collection count or set an areasComplete entry from true to false",
        "expect": 0,
        "exemptByName": ["currency, which is what the work yielded rather than the record of it", "a duplicate Find, which occupies no slot - consuming or converting one stays fully available to duplicate-handling work"],
        "forbids": ["prestiging a set", "trading a slot", "sacrificing a completed part", "showing a filled slot or finished part competitively or comparatively"],
        "landsOn": ["duplicate-handling work", "endgame-content work", "presence work"]
      }
    ],
    "requiresOfVocabulary": {
      "bannedWordsRequested": [
        { "word": "claim",     "reason": "names a deferral C1 forbids: a yield the player must go and take" },
        { "word": "claimed",   "reason": "inflection of the same; the check is word-boundary exact" },
        { "word": "unclaimed", "reason": "names a yield being held back, which C1 forbids" },
        { "word": "redeem",    "reason": "a second deferral verb, and it implies a conversion C6 forbids" },
        { "word": "payout",    "reason": "frames the tick as a settlement at a later moment rather than a result inside the step" },
        { "word": "pending",   "reason": "names a yield that exists but has not arrived, which is exactly C1's violation" },
        { "word": "idle",      "reason": "names accrual without action, which permanence forbids and which no system here produces" },
        { "word": "penalty",   "reason": "names a reduction, and C3 forbids any factor below 1" }
      ],
      "deliberatelyExcluded": [
        { "word": "collect", "why": "'motivated by collection' is a binding audience line and the index is the game's own surface; a ban would put the design's own vocabulary at risk" },
        { "word": "collection", "why": "same" }
      ],
      "shippedPlayerFacingStringsAtRisk": 0
    },
    "escalationIfFlat": {
      "problem": "the playtest finding that zero tension reads as empty",
      "spendOrder": [
        "increase the non-numeric per-patch feedback (clear-feedback and audio work, already funded)",
        "increase area supply so more ground stands in front of the player (content-volume work)",
        "a developer ruling"
      ],
      "neverFirst": ["add a penalty", "grade a step by route or timing", "make the record spendable"],
      "lastTwoToMove": ["C4", "C6"],
      "status": "playtest unknown",
      "settledBy": "whether players in the band stop moving in a lap's second half"
    },
    "measuredNotDisplayed": {
      "readings": [
        { "id": "tickOnlyFraction", "measure": "fraction of clears yielding nothing above a tick", "expect": ">= 0.95 at shipped values, 1.0 past 24 of 24" },
        { "id": "emptyStepCount", "measure": "steps yielding nothing at all", "expect": 0, "note": "any non-zero figure is a C1 violation in the build" }
      ],
      "displayedToPlayer": false,
      "ruledBy": "cid/theme/tone/04-do-nots.md X10 - measure freely, display none of it"
    }
  }
}
```

## Consequences for other work

- **Clear-on-contact feedback work**: `C1`, `C2` and `C4` land here hardest, because the per-patch
  clear is the carrier for ≥95% of the clears in a lap. **The tick is a result, not a gift** — nothing
  about it may read as the game granting, awarding or approving something. `C4` constrains **yield**,
  not feel: make one clear feel different from another, as long as it is not worth more.
- **Duplicate-handling work**: **permitted, explicitly** — consuming, converting or otherwise using a
  duplicate `Find`, because a duplicate occupies no slot and `C6` exempts it by name; *"solve
  duplicates without adding a currency"* is untouched and no answer is taken off the table.
  **Forbidden:** framing the duplicate as a *discount* on the step that produced it.
- **Balance-and-tuning work**: `C3` is a sign constraint on every curve you own and sets no number.
  **No factor below 1 anywhere in a yield term, and no per-session, per-day or lifetime cap.**
- **Area-authoring and depth work**: `C3` explicitly permits everything depth was going to do.
  *"deeper areas are larger, denser, and hide rarer sets"* raises yield per step or holds it; a denser
  area that paid less per patch would be the one reading of "patience" `C3` forbids.
- **Endgame-content work**: `C5` forbids **upkeep or a collection round through finished parts**;
  `C6` forbids **spending finished work**; `C3` forbids a **per-session cap** dressed as pacing. What
  is left, agreeing with sheet `02` and with `endgame.postTerminalArea`, is recurring and unbounded:
  more ground.
- **Passage work**: `C5` depends on `W2` and cites it. `W5` (*"Walking on early forfeits the `Finds`
  under the green you left"*) **does not violate `C4`**: what is forfeited is a `Find` still under
  standing green, which was never the player's.
- **Price-and-SKU work**: `C3` forecloses **introducing a friction and selling its removal.** No SKU
  may be the lifting of a cap, the removal of a diminishing return, or the restoration of a rate the
  base game lowered. Permanent multipliers above 1 remain fully available.
- **Interface-surface work**: `C1` forbids a **claim, collect or cash-in affordance of any kind**, and
  forbids any yield being available only after a panel is opened. It **permits** a recap. `C2` forbids
  the progress readout being the **only** carrier of the sitting's work.
- **Environment and VFX work**: `C2` requires that after two hundred clears the *cumulative* boundary
  still reads from the player's own camera with the interface hidden. A treatment that makes a single
  patch pop but lets a half-cleared part read as speckle fails this.
- **Audio work**: the cargo your channel was assigned and never given is **sure work**, and the one
  thing that falsifies it is a cue that reads as a *grant* rather than as a *result*.
- **Presence work**: `C6`'s ban on the record being a resource covers the social direction — **no
  filled slot or finished part may be given, shown competitively, or compared.** A stranger's presence
  costs this sheet nothing: `C4` means nobody else's walking changes what the player's own walking is
  worth.
- **Analytics work**: measure the two readings in `assurances.measuredNotDisplayed`. **Measure freely,
  display none of it** — `tone/04`'s `D16`.
- **Naming work**: one internal term to collect (`sure work`, never rendered), plus the eight
  candidate `bannedWords` entries in the block, offered not imposed. They share zero tokens with the
  eight entries already in `bannedWords`, with register work's list, with `L1`/`L3`/`L5`, with
  identity work's eleven role words, or with sheet `01`'s seven irreversibility words. **Zero of the
  43 shipped player-facing strings contains any of the eight.**

## Acceptance criteria

1. **No-deferral check (`C1`).** Count of code paths, surfaces or interactions by which any yield of a
   cleared patch becomes available only after a later act: **0**. Over the 43 player-facing strings,
   `claim|claimed|unclaimed|redeem|payout|pending|idle|penalty` returns **0** hits, whole-word and
   case-insensitive — **verified 0 of 43 today**.
2. **Order-independence and no-shrinkage check (`C3`, `C4`).** Holding upgrade levels fixed, two runs
   over the same 140 patches in different orders differ by **0** in currency and in the set of
   `Finds`. Count of yield terms reading route, order, streak, combo, timing, precision or elapsed
   time: **0**. Count of yield terms multiplied by a factor below 1, and count of per-session, per-day
   or lifetime caps: **0** and **0**.
3. **Record-not-a-resource check (`C5`, `C6`).** Count of code paths that decrement the collection
   count or set an `areasComplete` entry from true to false: **0**. Count of costs, sinks, wagers,
   trades or conversions priced in a filled slot or a finished part: **0**. Count of systems that
   require re-entering a finished part: **0**. Currency and duplicate `Finds` are exempt by name.
4. **Carrier check (`C2`), and the key's own shape.** In one screenshot from the player's own camera,
   in a part between a fifth and four fifths cleared, with every interface element hidden, the
   boundary between finished stone and standing green is visible. Count of guarantees whose delivery
   requires a string, a screen or a figure: **0**; this sheet requests **0** new strings and **0**
   screens. `assurances.guarantees` has exactly **6** entries, every one with an `expect` of `0`.

## Not decided here

Every cue, sound, particle, effect, magnitude, onset and duration at any moment (mood-and-beat work
for membership, `gameplay/core-loop/02` for magnitude, then Audio, Art, Mechanics and UI/UX). How the
clear moment feels in the hand (clear-feedback work). Every number `C3` and `C4` constrain the sign
of: tier values and weights, cost curves, per-level factors, discovery rates (Systems, Meta &
Content, then Balance & Tuning). What a duplicate's answer is (Systems). Whether the progress readout
exists as a HUD (UI/UX, then the pattern registry). What content exists past 24 of 24 (`endgame`, and
sheet `02`). Whether a finished part stays re-enterable (passage work's `W2`, ruled there). Which SKUs
exist (Monetization). Whether the eight offered tokens join `vocabulary.bannedWords` (naming work).
The register the game speaks in (register work, ruled).

## Flagged to the developer

**Nothing in the brief names what these minutes feel like**, and they are the overwhelming majority of
the minutes the game contains. `OPEN.md §1` has no audit row; no interview question in six rounds
touches it. So the whole of this sheet is `[cid: decided]`.

| alternative | why I did not take it | cost of overruling me |
|---|---|---|
| **Anticipation — the minutes are the approach to the next `Find`** | Closed twice before I got to it: sheet `01` demoted revelation from the register and forbade naming anticipation, and mood-and-beat work's `M14` gives anticipation no channel because it is *"the smallest available unit of tension"* | **Expensive.** It reopens two wave-1 sheets, needs the proximity cue `B1` forbids, and converts sweeping into hunting |
| **Calm, absorption, flow — the genre's own answer** | Occupied by much larger games, banned as a self-claim by register work's `P10`, and it is a statement about the player's attention rather than their work, so it hands Art and Audio nothing to build and nothing to fail | **Cheap to state, worth nothing** |
| **Efficiency — the minutes are the player learning to sweep well** | *"**No mastery layer.** ... Stated so nobody invents one"*, and it would require `C4` to be false | **Reopens a brief item** and inverts the guarantee every other sheet in this category leans on |
| **Sure work — taken** | — | — |

**My recommendation is the sheet as written**, on one argument: it is the only candidate stated as six
things a build either does or does not do, so a later reviewer can prove it was delivered rather than
assert that it feels right.

**Two rulings I would actually like.**

1. **The genre sells these minutes as *calming*; this sheet sells them as *lossless*.** My answer is
   lossless, because calming is occupied, unsayable under the register already on disk, and
   uncheckable. If you want the calm claim back, it is a ruling here and a revision to `P10`.
2. **`C3` forecloses the genre's most reliable monetization lever.** Introducing a cap, a decay or a
   diminishing return and selling its removal is the standard shape, and this sheet forbids the
   friction ever existing. Combined with sheet `01`'s ban on consumables and `tone/04`'s `X9` ban on
   the oversized tool, **three wave-1 sheets have each removed one shape from a premium SKU the brief
   already calls homeless. Recommendation: keep `C3`** — a paid removal of a penalty is the clearest
   possible contradiction of *"none of it can be done wrong or taken back"* — but this is the entry
   with a revenue number behind it and you should see the three together.
