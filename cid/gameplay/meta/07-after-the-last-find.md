# 07 — After the last find

**Domain:** Meta & Content · **Category:** Gameplay · **Wave:** 3

## Decision

**The collection is finished at 24 of 24. The place is not, and never is.** Past area 8 the
lane keeps going inward with more Spire bays, each identical to area 8 and **burying nothing**,
without limit and without a count. **Two of `core-loop/02`'s five payoff kinds survive, the
currency tick and area completion**, and `core-loop/01`'s 90-second above-tick rule **stops
applying at the moment the twenty-fourth Find is revealed.** No new system appears, and none
of the thirteen excluded ones is added or reserved for.

## Why

- **`core-loop/01` asked for exactly one of two answers and I give both halves of the one it
  named.** Its flagged item: "It needs either an endgame content answer from Meta & Content or
  an explicit decision that the game is finished at 24/24 and the rule stops applying there."
  The content answer is more of the same ground; the rule answer is the scope change below.
  `core-loop/05` had already put both terminal events inside depth 4 and stated "there is no
  late game after depth 4 for anything to be the binding constraint of."
- **What continues is fixed by the fiction, not chosen by me.** `theme/setting/02-extent`:
  "Depth past 4 is more parts of the same four kinds; no fifth kind, no final part, no summit,
  no floor, nothing may be labelled or dressed as the last one." `theme/setting/04` W3: "No
  part is the last, so no part may lack an inward opening." An unlimited run of Spire bays is
  the only shape those two sentences leave. `[cid: decided]` that they are **dimensionally
  identical to area 8** rather than continuing to grow: arrival throughput is at the ladder's
  cap from area 5 onward, so `core-loop/05`'s sizing formula returns the same footprint
  forever, and growing them anyway would break the flat lap it fixed.
- **They bury nothing, and that is forced.** `gameplay/systems/05` removes duplicates by
  construction ("no reachable duplicate exists"), and `collection` is closed at 24 names. A
  post-terminal bay with a Find in it would have to hold a name the player already has.
  `theme/fantasy/02` forbids the alternative directly: whatever exists past the last set "may
  never be a second bounded set, list, ladder, page or album." **An unlimited run of identical
  unnumbered bays is the one thing that is recurring without being a second list.**
- **Which payoffs survive is arithmetic on three approved sheets, not a preference.** The
  upgrade purchase is extinct because `gameplay/systems/04` fixes one sink and sheet `04` has
  the ladder maxed during area 4. The reveal is extinct because there is nothing left to
  reveal. Set completion is extinct because all four sets are complete. The tick survives
  because `systems/04` rules that "at max ladder income continues, buys nothing, converts to
  nothing, and is neither capped nor hidden." Area completion survives because the bays keep
  coming. **Two of five, and the survivor at weight 8 is now the top of the ladder.**
- **So the 90-second rule cannot be met and must stop, rather than be quietly failed.** At
  a 157-second lap, area completion alone leaves a 157-second gap between above-tick payoffs.
  Every instrument that would normally close it is cut or priority 3 `[brief: binding]`
  (rebirth, `[you chose: R2 Q2]`) or `[brief: soft]` (dailies, seasons, leaderboards, codes,
  `03-META.md` priority 3). **The honest reading is that the rule was written for a game with
  something left to find, and 24/24 is where that stops being true.** `[cid: decided]`
- **The 3-second tick rule does not stop.** It bounds whether the ground still answers the
  player's feet, and it is met at 0.246 s per clear in a post-terminal bay. `theme/fantasy/03`
  fixes the minutes between peaks as "sure work" and a post-terminal bay is entirely those
  minutes; the ground behaving exactly as it always has is the whole of what is promised there.
- **Nothing is added and nothing is reserved.** `03-META.md` priority 3 excludes real procgen,
  rebirth, offline accrual, codes, daily rewards, leaderboards, trading, seasons and events,
  and `01-FOUNDATION.md` cut rebirth as a `[you chose]`. Naming them to forbid them is
  compliant with the scope gate; leaving room for one is not, and this sheet leaves none.
- **The one quantity still moving is the count of parts the player has finished**, which
  `theme/fantasy/02` already required be shown as "exactly one figure, with no denominator, no
  fraction and no percent." It is unbounded, it is permanent, it is a count of the player's own
  work, and `theme/setting/02`'s no-total rule explicitly permits it.
- `[playtest unknown]` **Whether a player reaches the terminal state at all.** In the one
  shipping comparison available, finishing a single *area's* collection is a 0.4% event
  `[research: https://www.rolimons.com/gamebadge/1768992749628648]`, so this sheet may govern
  a state almost nobody sees. It is still the state three approved sheets route here, and it
  costs one predicate guard and no content.

| rule | after 24/24 | why |
|---|---|---|
| `core-loop/01` 90 s between above-tick payoffs | **stops applying** | only one above-tick kind survives and it fires once a lap |
| `core-loop/01` at most 3 s between clears | applies unchanged | the ground still answers the feet |
| `core-loop/04` lap inside 75 to 200 s | applies unchanged | a post-terminal bay is a lap |
| `core-loop/04` `24/24 outlasts one floor session` | **stops applying** | nothing is left to complete |
| `core-loop/05` density under the tick ceiling | applies unchanged | 640 against 655 |
| `core-loop/05` arrival below the throughput cap | **stops applying** | the cap was reached in area 4 |
| sheet `04` slice assignment partitions the set | **stops applying** | post-terminal bays hold no slice |
| sheet `04` `maxRadiusProduct` per row | applies unchanged | at 2.10, the loosest row in the game |
| sheet `05` R5 to R8 (find placement) | **stop applying** | there are no finds to place |
| sheet `05` R1 to R4 (chunk repetition) | apply unchanged | repetition is still seen |
| sheet `06` pitch, spawn and openings | apply unchanged | the lane does not change shape |
| "Cleared is permanent" | applies unchanged | `[brief: binding]` ← `[you chose: R2 Q1]` |

```manifest
{
  "provides": "endgame",
  "status": "proposed",
  "value": {
    "terminalCondition": "the player's found count reaches the total number of names in collection",
    "reachedAt": { "areaOrdinal": 8, "event": "the reveal on the last patch of the eighth bay that carries a Find" },
    "gameEnds": false,
    "collectionEnds": true,
    "endScreen": false,
    "survivingPayoffKinds": ["currencyTick", "areaCompletion"],
    "extinctPayoffKinds": ["upgradePurchase", "findReveal", "setCompletion"],
    "risingQuantity": "areasFinished",
    "postTerminalArea": {
      "unlimited": true,
      "depth": 4,
      "setId": "spire",
      "label": "Spire",
      "labelCarriesNoOrdinalOrNumber": true,
      "footprintStuds2": 57600,
      "chunkCount": 16,
      "patchCount": 640,
      "minSpacing": 6,
      "relicSliceIndex": "none",
      "buriesFinds": 0,
      "unlock": "previousAreaComplete",
      "bayLengthStuds": 480,
      "drawsFrom": "the depth-4 chunk family, under layout's R1 to R4"
    },
    "predicateScopeChange": {
      "maxAboveTickGapSeconds": { "value": 90, "appliesWhile": "found < totalFinds" },
      "maxSecondsPerClear": { "value": 3.0, "appliesAlways": true },
      "lapSecondsBand": { "value": [75, 200], "appliesAlways": true },
      "arrivalBelowThroughputCap": { "appliesWhile": "found < totalFinds" }
    },
    "persistence": {
      "postTerminalAreasStoredAs": "one integer count, never one boolean per area",
      "reason": "an unlimited run of identical unnumbered bays must not turn world state into unbounded save data"
    },
    "forbidden": ["rebirth", "prestige", "offlineAccrual", "dailyReward", "seasonPass", "seasonalEvent", "leaderboard", "trading", "redeemCode", "secondCollection", "completionPercent", "badgeLadder", "secondCurrency"],
    "invariants": [
      "survivingPayoffKinds and extinctPayoffKinds partition core-loop/02's five kinds with no overlap",
      "postTerminalArea.relicSliceIndex is none and buriesFinds is 0",
      "postTerminalArea's footprint, chunkCount and patchCount equal depths.areas[7]'s",
      "no entry in forbidden appears as an identifier anywhere in game/src",
      "nothing in this key names a reward, a grant, a threshold or a recurrence"
    ]
  }
}
```

## Consequences for other work

- **Whoever writes the cadence predicate gains one guard and loses nothing.**
  `core-loop/01`'s 90-second assertion becomes conditional on `found < totalFinds`; the
  three-second assertion and the lap band stay unconditional. That is two lines in
  `game/test/config.spec.luau` and it converts a permanent known failure into a scoped rule.
- **Persistence work** must not grow a boolean per post-terminal area. One integer, and the
  bay currently occupied. This closes the half of `OPEN.md §2`'s unbounded-world-state risk
  that an endless run would otherwise reopen.
- **UI and readout work inherits a substitution, not a new screen.** `systems/04` requires
  currency stay visible and uncapped; `theme/fantasy/02` requires that "a meaningless rising
  number may not be the figure on screen at S4." **Both hold at once only if the headline
  figure becomes the finished-parts count and currency stays on screen without being it.**
  I state the requirement and design no surface; there is no end screen, no congratulation
  and no completion percentage to build.
- **Audio and feedback work** loses two of its five beats permanently. The reveal stinger and
  the set-completion chord are never heard again after area 8, so **the area-completion chord
  is the only non-tick cue a post-terminal player ever hears**, at 157-second intervals,
  indefinitely. `core-loop/02` sized it to be heard 3 to 7 times a session; here it is heard
  that often forever and nothing else joins it.
- **Art and Visuals** owes nothing new. A post-terminal bay is a depth-4 bay drawn from the
  same 8-chunk family, so the endless run costs zero additional assets, which is what
  `05-OUTWARD.md` means by "new content can be added as new authored chunks without touching
  existing systems."
- **Plot-arrangement work (sheet `06`)** extends its bay table by 480 studs per post-terminal
  bay under the same teardown rule. Its `[research owed:]` on part precision far from the
  origin is the one thing that bounds the run: at 480 studs a bay, **bay 42 crosses 20,000
  studs** and the lane must rebase from there. Tech and Performance inherits that.
- **Live Ops and Monetization** get an explicit no. There is nothing here to schedule, sell
  or refresh, and the thirteen names in `forbidden` are the list to diff a proposal against.

## Flagged to the developer

Two calls this sheet made where the brief simply stops, both worth a ruling.

1. **The game permanently stops enforcing its own cadence rule at 24/24.** After the last
   Find, 157 seconds pass between above-tick payoffs against a 90-second ceiling, forever.
   `core-loop/01` offered this as one of its two acceptable answers, but it is still a rule
   the game abandons rather than meets, and every instrument that would close it is cut or
   priority 3. **Recommendation: accept it.** The alternative is reintroducing something from
   priority 3, which is a scope decision and not mine.
2. **The place continues and the collection does not, which means the last hour of play has
   no new object in it.** More Spire bays is what the fiction permits and it is genuinely
   unlimited, but it is also the same lap repeating. The one change that would give it new
   content is sheet `04`'s `## Flagged` item, a larger collection, and the two should be ruled
   on together: at 4 sets of 12 the terminal state arrives at minute 42 instead of minute 21
   and this sheet governs proportionally less of the game.

## Acceptance criteria

1. `endgame.survivingPayoffKinds` is exactly `["currencyTick", "areaCompletion"]` and
   `endgame.extinctPayoffKinds` is exactly the remaining three of `core-loop/02`'s five kinds,
   with no kind in both lists and none missing.
2. `game/test/config.spec.luau` contains the 90-second above-tick assertion guarded by
   `found < totalFinds` and the 3-second per-clear assertion with no guard, and the file exits
   `PASS`.
3. Every area generated past ordinal 8 reports `footprintStuds2` 57,600, `chunkCount` 16,
   `patchCount` 640, a `relicSliceIndex` of `none`, and the label `Spire` containing no digit,
   ordinal or qualifier.
4. `endgame.forbidden` holds 13 names, and a case-insensitive search of `game/src` for each of
   them returns zero identifiers.

## Not decided here

How many areas exist before the terminal state, and their sizes (sheet `04`, this domain,
which holds `depths`). What a bay's interior is made of and which chunks a post-terminal bay
draws from (sheet `05`, which holds `layout`). Where the bays sit and how far the run may
physically extend before rebasing (sheet `06`, which holds `plots`, and Tech and Performance).
What a completed set granted and at what factor (sheet `03`, then Balance). Whether income is
capped, hidden or converted: it is none of those and that is `gameplay/systems/04`'s ruling.
What the finished-parts figure looks like, where it sits and whether currency stays beside it
(UI/UX; `theme/fantasy/02` fixed its form and I state only that both requirements must hold
together). What the area-completion cue sounds like at its ten-thousandth firing (Audio).
Whether the game should have more collection at all, which is sheet `04`'s
`## Flagged to the developer` and the developer's call.
