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
smaller than what came before, and this sheet states that rather than patching it — the correct
output for a game whose brief declines retention as a goal by name.

**The one demand this places on the design: the finite promise may not be spendable inside a single
sitting.** Filling the index must take strictly more laps than the longest bound session contains —
**8 or more, against a maximum of 7 complete laps in a bound session.**

**Data form: an `amends` against `endgame`** (owner `gameplay/meta`). Everything this sheet decides
about the state past the last Find is carried by that key, which already holds `gameEnds`,
`collectionEnds`, `risingQuantity`, `postTerminalArea` and a 13-entry `forbidden` list. A second key
would be a second source of truth for one subject. **This sheet coins zero terms.**

## Why

### The three erosions, taken one at a time

| erosion | what it costs | what survives it |
|---|---|---|
| **reveals become familiar** | the finite promise, entirely. A Find is first-of-its-kind exactly once per name, 24 times, and `cid/theme/setting/02-extent.md` states that past the fourth set the works continues *"with nothing new to find"* | nothing. This half is spent and the sheet says so |
| **the place is known to be endless** | the reclamation promise, which sheet `01` already demoted to per-area subject matter | **the unlimited promise is *funded* by it.** An uncounted works is an inexhaustible supply of ground to finish |
| **nothing accrued while away** | the genre's standard return promise | the complement of it: nothing decayed, nothing is owed, and the edge is where it was left |

**Endlessness is not a loss here, and that inversion is the load-bearing argument.** Sheet `01`
demoted reclamation from promise to subject matter precisely because *"Endless via shuffled authored
chunks"* `[brief: binding]` `[you chose: R5 Q1]` guarantees the place never ends. The same
endlessness makes *"there is always more ground"* true forever rather than for four depths.
World-scale work states the mechanism in canon: the works *"cannot be exhausted because it is
uncounted, not because it is infinite"*, *"nothing is being added"*
`[research: repo — cid/theme/setting/02-extent.md, read this run]`. The property that kills one
promise pays for the other, and neither claim needs a system that does not exist `[cid: decided]`.

**The third row is an offer, not an absence, and it is the exact complement of the largest occupied
fantasy in the map.** *Grow a Garden* wins *"relaxing tending of a place that is yours"* at 35.3bn
visits with a world that **runs while players are offline**, which makes *"come back and see how it
changed"* both uncontestable and impossible here `[research: relayed from
cid/theme/fantasy/_lead.md]`. What is available instead is the shadow that offer casts: a place that
asks nothing. *"Nothing regrows, so nothing can accrue while away"* `[brief: binding]`
`[you chose: R2 Q2]` also means nothing wilted, nothing is due, and nobody is waiting — identity work
ruled the player *"owed nothing and owing nothing"*. For *"8–14, mobile-heavy, short sessions"*
`[brief: binding]`, *no upkeep* is a real thing to be offered. **The fiction may not announce it:**
mood-and-beat work ruled re-entry *"baseline, and silent about the absence"*
`[research: repo — cid/theme/tone/03-beat-map.md, M10, read this run]`. The player finds the edge
where they stopped and draws the conclusion.

### Thresholds as player state, because there are no time anchors

*"Lap length: unknown, and deliberately so"*, so *hour two* cannot be written as a duration
`[brief: soft]`. The four states below are what it actually means, and each is observable from a save
file.

| player state | the finite promise | the unlimited promise |
|---|---|---|
| **S1** the first Find is out of the ground | live, 23 slots unfilled | live: one part finished |
| **S2** at least one set closed, empty slots still visible | live, and now demonstrated rather than implied | live, and now plural |
| **S3** every `upgrades[].maxLevel` reached, nothing left to buy | live only if slots remain | unchanged |
| **S4** the index is full | **spent, and never re-promised** | unchanged, and the whole offer |

`endgame` names S4 in the contract: `terminalCondition` is *"the player's found count reaches the
total number of names in collection"*, reached at area 8 `[research: repo —
cid/gameplay/meta/07-after-the-last-find.md, read this run]`. **S4 is where this sheet is really
working.**

### Why the unlimited promise does not decay

A promise decays when it depends on novelty or on a supply. This one depends on neither: it is a
claim about the accumulated past, and the past only ever gets larger. Every other quantity has a
ceiling, a sink, or both `[research: repo — the sheets cited in each row, read this run]`:

| quantity | why it cannot carry a durable promise |
|---|---|
| currency | spent. One faucet, one sink `[brief: soft]` |
| the upgrade ladder | capped by `upgrades[].maxLevel`, no rebirth to reset it, no fourth axis |
| a first-time Find | one-time per name, 24 names |
| a set | four of them |
| the place | uncounted, so it is never finished and can never be claimed as finished |
| **parts the player has finished** | **no ceiling, no sink, no conversion, and nothing can take it back** |

That last row is the only quantity in the design that only ever rises and can never be spent, and
`endgame.risingQuantity` already names it `areasFinished`. Sheet `01` fixed the axis — *"the accrual
is the one kind that cannot be taken back"* — and told this sheet the hour-ten promise *"may not be
more reveals"* and *"may not be a fuller logbook as such"*. This is that axis carried to S4 and found
to still be there.

### Exactly one finishable thing, and why a second is forbidden rather than merely unbudgeted

*"**With endless areas, the collection is the only finishable thing**"* `[brief: soft]`. I ratify it
and harden it into a prohibition, because the soft version reads as an observation about current
content and the hard version is what stops a second one being added later: **a second finishable
thing re-promises finishing after the first promise was kept**, which makes the first one
provisional. That is the same error mood-and-beat work forbade in the cue channel — *"an escalating
cue implies the earlier instance was provisional"* — and it is why `M11` (24 of 24) is `M5`'s fourth
firing at `M5`'s size, with *"no event fires that is conditional on the collection reaching 24 of
24"*. **The fiction reason it needs no ending is now stated: at S4 there is no promise left to
close.** `[cid: decided]`

### The demand, derived rather than asserted, and now satisfied on disk

The brief's return hook is *"**An unfinished area and a half-empty index**"* `[brief: soft]`. **A
half-empty index is a claim about the moment a player comes back**, so the hook requires the index to
still be half empty after any single sitting. Core-loop work bounds a session at *"three to seven
complete laps plus one in progress"*, so the requirement is arithmetic: **laps to fill the index
≥ 8.**

**At the shipped manifest this now passes.** `collection.relicsPerArea` is **3** and
`collection.areasPerDepth` is **2**, so `ceil(24 / 3) = 8` laps against a ceiling of 7
`[research: repo — cid/gameplay/meta/02-the-collection.md, read this run]`. When this sheet was first
written the values were 6 and 1, giving 4 laps, and the sheet recorded the failure and named the fix
— *"`relicsPerArea` 3 with `areasPerDepth` 2 gives 8 laps, keeps exactly one set per depth, produces
zero duplicates"*, needing the schema invariant relaxed to `areasPerDepth · relicsPerArea >= setSize`.
Both the values and the invariant landed. **The floor is mine; the values are Meta & Content's, and
they chose them.** `[playtest unknown]` starting value **8 laps**, test range **8 to 60**.

### Is the honest answer "nothing"? No, and the reason it is not is also why it may be small

*"**This game exists to prove the `arga` pipeline works end to end.** ... Success is **shipped
artifacts, not players**"* and, as a stated non-goal, *"**Beating the genre's retention curve.**
Offered and declined"* `[brief: binding]` `[you chose: R1 Q3]`. The brief concedes the cost in
advance: *"**Honest weakness:** without banked offline earnings, the pull to return is materially
weaker than the reference's. That was the accepted trade for permanence"* `[brief: soft]`.

So the bar is **truth, not size.** Every candidate large promise is either occupied by a much larger
game or excluded by name: daily rewards, offline accrual and seasons are all priority 3, and the
*"seasons"* reframe was *"declined"* by name `[brief: binding]`. The reference's own shape is the
thing to write against rather than hope past — *"10,435 peak to 819 current, while still being
actively updated weekly ... satisfaction is not the same as retention"* `[research: relayed from
cid/theme/fantasy/_lead.md]`.

### Wordless deliverability, and the one place it can quietly fail

Both promises are arrivable from what happens on screen: a grid of 24 slots with empties visible,
filling and never emptying; and a part you finished that is still finished when you walk back into
it, with another part standing green further in.

**The failure mode is specific.** `OPEN.md §2` defaults finished areas to collapsing *"to a
completion flag once finished"* to keep save size bounded `[brief: soft]` `[I assumed]`, and
`endgame.persistence` already stores post-terminal areas as *"one integer count, never one boolean
per area"*. If a finished part cannot be re-entered, the second carrier disappears and the player's
entire accrual at S4 is **a number**. **This sheet makes it conditional and load-bearing: either a
finished part stays re-enterable, or the count exists as a surface. One of the two, not neither.**

**`[playtest unknown]` — whether the unlimited promise alone holds anybody at S4.** Starting value:
**nothing is added past 24 of 24.** Test range: from *nothing added* to **one recurring unlimited
offer added**, and never a second finishable thing (the prohibition is not a knob). What would settle
it: whether players who have reached S4 enter a new part and finish it in a later session.

**Nothing binding is overruled in this sheet.** One `[brief: soft]` reading is, in `## Pushing back`.

```json
{
  "amends": "endgame",
  "requested_by": "cid/theme/fantasy/02-promise-over-time.md",
  "why": "the promise this fantasy still makes past the last Find is the fiction half of the state endgame already carries; it belongs in that key, not in a new one",
  "ratifies": {
    "gameEnds": false,
    "collectionEnds": true,
    "endScreen": false,
    "risingQuantity": "areasFinished",
    "postTerminalArea.unlimited": true,
    "postTerminalArea.buriesFinds": 0,
    "note": "each of these is the mechanical form of a promise this sheet states in fiction; none is amended"
  },
  "promises": [
    {
      "id": "P-FINITE",
      "statement": "the index fills",
      "lifetime": "promised once, kept once, never re-promised",
      "spentAt": "endgame.terminalCondition",
      "carrier": "a grid of 24 slots with empty slots visible, filling and never emptying",
      "mayNotBeRestatedAsAStandingClaimOnAnyInGameSurface": true
    },
    {
      "id": "P-UNLIMITED",
      "statement": "no ground the player has finished will ever be asked of them again, and there is always more ground",
      "lifetime": "permanent; depends on no supply and no novelty",
      "carrier": "a finished part re-entered and still finished, with another part standing green further in",
      "fundedBy": "endgame.postTerminalArea.unlimited"
    }
  ],
  "finitePromiseFloor": {
    "predicate": "ceil(totalFinds / collection.relicsPerArea) >= 8",
    "eightBecause": "core-loop/04 bounds a session at three to seven complete laps plus one in progress, so 8 is the smallest integer that outlasts the longest bound sitting",
    "shipped": { "totalFinds": 24, "relicsPerArea": 3, "areasPerDepth": 2, "lapsToFill": 8, "satisfied": true },
    "historyOfThisRow": "written when the values were 6 and 1 (4 laps, failing); the two integers and the relaxed collection invariant have since landed",
    "status": "playtest unknown",
    "testRangeLaps": [8, 60],
    "conservativeDirection": "duplicates only raise the real figure, never lower it"
  },
  "oneFinishableThing": {
    "count": 1,
    "theOne": "collection.sets[].relics, 24 names",
    "excludedByName": "upgrades[].maxLevel - a cap on purchases is not a set that fills",
    "prohibition": "no second bounded set, list, page, album, ladder or achievement roster the player completes may be introduced at any depth in any wave",
    "forbiddenListRatified": true,
    "coveredAlreadyBy": {
      "secondCollection": "a fifth set or a parallel index",
      "badgeLadder": "an achievement roster",
      "completionPercent": "a percentage that re-promises finishing",
      "seasonPass": "a bounded seasonal track",
      "rebirth": "re-promising the whole game"
    },
    "newForbiddenEntriesRequested": 0,
    "why": "the shipped list already covers every shape this prohibition names; adding a synonym would be a second spelling of one rule"
  },
  "lateCarrier": {
    "requirement": "either a finished part stays re-enterable, or exactly one player-facing figure counts the parts the player has finished. One of the two, never neither.",
    "figureConstraints": { "denominator": false, "containsOf": false, "containsSlash": false, "containsPercent": false },
    "consistentWith": "cid/theme/setting/02-extent.md's no-total rule, which forbids counting the place and exempts counts of the player's own work",
    "requestedOf": ["whoever owns the re-enterability of a finished part", "whoever owns the persistent HUD's composition"],
    "newPlayerFacingStringsRequested": "at most 1, and 0 is achievable if the figure sits beside an icon"
  },
  "liveOpsLicence": {
    "permitted": ["more parts"],
    "forbidden": ["an event", "a return bonus", "any accrual while absent", "a completion season", "a second finishable thing"]
  }
}
```

## Consequences for other work

- **Content-volume work** *(owner of `collection`)*: `ceil(24 / relicsPerArea) >= 8` is a floor on the
  finite promise and is **satisfied at the shipped values**. Whatever exists past S4 must be
  **unlimited and recurring** — never a second bounded set the player completes.
- **Duplicate-handling work**: **at S4 every Find a player uncovers is a duplicate, so the duplicate
  answer is the entire late reveal experience, not an edge case.** It may not be framed as filling,
  completing or progressing anything, and **the late promise may not be made to rest on it**.
- **Balance and economy work**: past S3, currency accrues with nothing to buy. **A meaningless rising
  number may not be the figure on screen at S4** — a requirement about what is displayed, not a
  request for a new sink.
- **Interface-surface work**: **exactly one figure counting the parts the player has finished, with
  no denominator, no fraction and no percent.** At S4 it is the only quantity still moving that means
  anything.
- **Cleared-area and passage work, and persistence work**: the either/or above is yours to close. If
  a finished part is unreachable after completion, say so, so interface work knows the count is
  mandatory rather than nice.
- **Inhabiting work** *(sheet `03`)*: **at S4 every minute is a between-minute.** Your guarantee list
  stops being connective tissue between peaks and becomes the whole late game.
- **Mood-and-beat work**: ratified, not amended. `M11` gets a fiction reason it did not have — at S4
  no promise remains to close.
- **Discovery and marketing work**: *"Clear the overgrowth, find what's buried"* stays as the store
  hook and is **a first-session promise with a supply of 24.** It may not be restated on an in-game
  surface as a standing promise, **no line may promise endless new things to find**, and **no line
  may promise a world that ends up reclaimed** (sheet `01`). What is true and sayable at every hour:
  **finished work is never asked for twice.**
- **Live-ops work**: the only extension consistent with this promise is **more parts.** Not events,
  not returns, not accrual, not a completion season.

## Acceptance criteria

1. **Finite-promise durability.** `game/test/config.spec.luau` asserts
   `ceil(totalFinds / collection.relicsPerArea) >= 8`, where 7 is the maximum complete laps in a bound
   session. **Passes at the shipped manifest: 24 / 3 = 8.** Any later change to `relicsPerArea` that
   drops the figure below 8 fails the assert rather than the promise.
2. **No-ending check, both halves.** (a) Zero of the 43 player-facing strings matches
   `complete|completed|completion|final|finale|ending|master|trophy|prize|reward|congratulations|100`,
   whole-word and case-insensitive — **verified 0 of 43 today**. (b) Zero events, strings or surfaces
   are conditional on the collection reaching 24 of 24; `endgame.endScreen` is `false` and
   `cid/theme/tone/03-beat-map.md` criterion 4 already asserts the events half.
3. **One-finishable-thing check, across every `manifest` block under `cid/`.** Exactly **one** array
   of named player-completable items exists — `collection.sets[].relics`, 24 entries — and **zero**
   sheets introduce a second bounded set, list, page, album or achievement roster.
   `upgrades[].maxLevel` is excluded by name.
4. **Late-carrier check.** Either a finished part is re-enterable, or exactly **1** player-facing
   figure counts the parts the player has finished; that figure contains no denominator, no `of`, no
   `/` and no `%`. The count of designs satisfying **neither** branch is **0**.

## Not decided here

What content exists past 24 of 24 beyond the unlimited bay `endgame` already carries, and every value
in criterion 1 (Meta & Content, then Balance & Tuning). How duplicates are answered (Systems).
Whether a finished part stays re-enterable, and what one physically becomes (passage work, then
persistence work). Whether the finished-parts figure exists as a HUD, a screen or neither (UI/UX,
then the pattern registry). Any cue, magnitude, sound or effect at any of the four states
(mood-and-beat work, Audio, Mechanics, Art). The named feeling of the minutes at S4 (sheet `03`). The
store line and the title (Discovery & Marketing).

## Pushing back

**Overruled: the reading of *"Clear the overgrowth, find what's buried"* as the fantasy's standing
promise** (`05-OUTWARD.md`, *"A dual promise"*, `[brief: soft]` `[you accepted: R6 Q1]`). **The line
itself is untouched and stays the store hook.** What I overrule is its lifetime: its second half has
a supply of exactly 24, and world-scale work states in canon that past the fourth set the works
continues *"with nothing new to find"*. A promise with a countable supply is a first-session promise,
and treating it as the standing one guarantees the fantasy is lying by S4.

**Not overruled, sharpened:** `03-META.md`'s objective table labels 24 of 24 *"long-term"*
`[brief: soft]`. At the values shipped when this sheet was written that label was false. I required it
be made **true** rather than relabelled, and Meta & Content made it true.

## Flagged to the developer

**Nothing in the brief states what the game offers a player who has finished the collection.**
`OPEN.md §1` carries no audit row for it. So the whole of this sheet is `[cid: decided]`.

| alternative | why I did not take it | cost of overruling me |
|---|---|---|
| **Nothing added past 24 of 24** — the offer reduces to permanence and more parts. **Taken.** | — | — |
| **Priority 2's *"visitable restored ruins"*** — the brief calls this *"the strongest future option"* | It is **priority 2**, needs a visiting system and a social surface nothing funds, and runs into *"no mechanical interaction"* plus world-scale work's `A13` | **Expensive, and genuinely attractive.** It is the one candidate the brief names itself |
| **A second finishable thing** — a fifth set, an achievement list | Contradicts *"the collection is the only finishable thing"*, and re-promising a finish makes the first finish provisional | **Cheap to build, expensive to the fiction.** It also hands mood-and-beat work an ending it has ruled does not exist |
| **Daily rewards, offline accrual, or seasons** | All priority 3; offline accrual is binding by consequence; the *"seasons"* reframe was refused by name | Reopens `[you chose: R2 Q2]` |

**One ruling I would actually like.** May the store keep promising *find what's buried* while the
game stops having anything new to find? My answer is yes for the listing and never for an in-game
surface, on the ground that a store line sells an entry and an in-game line makes a standing claim.
If you want the two held to one standard, that is a one-line ruling here and a constraint on
marketing work.
