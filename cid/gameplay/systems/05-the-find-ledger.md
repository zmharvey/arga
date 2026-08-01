# 05 — The Find ledger

**Domain:** gameplay/systems · **Category:** Gameplay · **Wave:** 2

## Decision

**Duplicates are removed, not resolved.** An area's Finds are drawn **without replacement** from
its depth's set minus what that player has ever found, and the areas at one depth **partition**
the set rather than each re-offering it — so `relicsPerArea × areasPerDepth == |set|` at every
depth. The record is **one boolean per Find name and nothing else**. A repeat cannot occur;
**the silent discard at `Clearing.luau:209` is NOT ratified** — the guard stays, the silence
goes. **Nothing in this game is luck-shaped.**

## Why

- **The constraint, aimed at this domain by name.** `02-GAMEPLAY.md`: "**Constraint on whoever
  designs systems — solve duplicates without adding a currency.**" Both escapes, a duplicate-find
  currency and a discovery currency, were "offered and declined", and `HANDOFF.md` repeats it as
  one of six pre-design facts. `[brief: soft]`, treated as firm. A draw that cannot repeat
  satisfies it a fortiori: no duplicate exists, so nothing needs a sink.
- **Draw-without-replacement is a shipped, named mechanic.**
  `[research: https://www.gamerefinery.com/the-complete-guide-to-mobile-game-gachas-in-2022/]` —
  the box gacha, where a prize is "permanently removed from the gacha prize pool", and the source
  states that no currency appears anywhere in the mechanism.
- **Scoping it per set is the same idea at the right width.**
  `[research: https://blizzardwatch.com/2020/03/23/hearthstones-duplicate-protection-new-player-experience-completely-change-game/]`
  — "you won't see a duplicate until you own every card of that rarity", guaranteed independently
  per rarity; four sets of six is that shape. The same source keys exclusion on *ever-owned*,
  because disposal would otherwise be a re-roll. Nothing can leave this collection, so the two
  coincide today; saying `ever-found` forecloses the exploit before a refinement can open it.
- **The configuration I am avoiding has a name and a documented history.**
  `[research: https://machinations.io/articles/an-in-depth-look-at-gacha-boxes]` — complete gacha,
  a set-completion reward laid over a random draw, makes the *last* member of each set the
  bottleneck, cites the coupon collector's problem as the governing maths, and in its paid form
  was declared illegal in Japan. Four sets of six with a permanent bonus on each completion is
  that configuration unless the draw is bounded. No monetary exposure here, but the same
  frustration, in the one system the brief calls the differentiator.
- **The partition is what actually closes the hole.** `collection`'s merge check permits
  over-supply (`areasPerDepth × relicsPerArea >= |set|`), and over-supply is what manufactures the
  repeat: at `areasPerDepth = 2` with `relicsPerArea = 6`, the second area either re-offers six
  names the player has or buries nothing. I tighten it to equality. **At today's values (6 × 1 =
  6) the rule is a no-op**, which is what makes it safe to state now rather than after
  content-structure work moves `areasPerDepth`.
- **The record shape.**
  `[research: https://devforum.roblox.com/t/how-would-i-go-about-making-a-index-like-find-the-markers/1715824]`
  — the Roblox-native finite index is a per-item boolean with the UI derived from it, never stored
  separately. `Persistence.luau:124` already holds `found = {}` as `{[string]: boolean}`
  `[research: game/src/server/Persistence.luau]`, recorded by my lead as unable to represent a
  repeat. It is, and under this draw rule that is **correct rather than defective**.
- **The mechanism I did not need.**
  `[research: https://game8.co/games/Genshin-Impact/archives/301611]` — a duplicate deepening the
  specific entry through a token bound to that one character, non-fungible by design. Correct if a
  pool must stay repeatable; unused here because there is no repeat to deepen. Recorded so the
  priority-2 "duplicate-handling refinement" has a shape waiting rather than a blank.
- `[research owed: the index or bestiary page of a shipping Roblox game with a finite roster and a
  stated repeat rule — Fisch's fish index is the named candidate]`. The pass states plainly that no
  such Roblox game was reached; I do not present the four precedents above as Roblox-native.

```manifest
{
  "provides": "discovery",
  "status": "proposed",
  "value": {
    "pool": {
      "scope": "per player, per depth",
      "source": "collection.sets[depth].relics",
      "replacement": "without",
      "exclusionKey": "ever-found, not currently-held",
      "areasPartitionTheSet": true,
      "invariant": "collection.relicsPerArea * collection.areasPerDepth == collection.sets[depth].relics.length",
      "invariantHoldsToday": "6 * 1 == 6; this rule changes no shipped behaviour at current values",
      "orderWithinArea": "the area's slice is shuffled; which patch hides which Find is uniform over patches",
      "tierWeighting": "none, per the rarity key",
      "guaranteedException": "onboarding's first Find is placed, not drawn, and consumes the first slot of depth 1's slice"
    },
    "record": {
      "keyedBy": "the Find's name, from collection.sets[].relics[].name",
      "entries": 24,
      "fields": [
        { "name": "found", "type": "boolean", "default": false, "persisted": true, "writtenBy": "server, at the instant the hiding patch clears", "clearedBy": "nothing, ever" }
      ],
      "derived": [
        "foundCount = the number of true entries",
        "setComplete(setId) = every name in that set is true",
        "collectionComplete = all 24 are true",
        "newThisSession = compared against a snapshot taken at join, held in memory, never saved"
      ],
      "forbiddenFields": [
        "count", "duplicates", "timesFound", "timestamp", "foundAt", "depthFoundAt",
        "condition", "quality", "variant", "restoredLevel", "favourite",
        "seen", "isNew", "equipped", "sortIndex", "tradeable"
      ],
      "growth": "fixed at the roster size; the record never grows with play"
    },
    "repeat": {
      "possible": false,
      "cause": "only a layout that places an already-found name, which is a build defect and not a game state",
      "runtimeBehaviour": "the patch hides nothing, the server logs a warning naming the Find and the patch index, the reveal channel does not fire",
      "silentDiscardRatified": false,
      "playerFacing": "nothing: no message, no cue, no consolation, no partial credit, no pity counter"
    },
    "luckShaped": false,
    "luckShapedDetail": "the pool is bounded and the partition is fixed, so the SET of Finds a depth yields is fully determined. There is no drop rate, so there is no rate for a multiplier to act on.",
    "theOnlyRandomQuantities": [
      "the order in which a depth's slice is assigned to its areas",
      "which patch inside an area hides each Find"
    ],
    "sellableLuck": null,
    "persistenceRequirement": "24 booleans and nothing else; this is the one part of save data bounded by design rather than by collapse"
  }
}
```

## Consequences for other work

- **Content-structure work (currently Meta & Content) inherits a hard equality.** Raising
  `areasPerDepth` above 1 now requires lowering `relicsPerArea` to match, so a depth's six Finds
  spread across its areas rather than repeat into each. What that buys: every area at every depth
  buries a full quota of Finds the player lacks, so no session is spent in an area with nothing new
  in it — the brief's highest-risk objective protected structurally rather than by tuning.
- **The clearing path must change.** `Clearing.luau:209` reads `if relic ~= nil and not
  state.found[relic]` and drops a repeat with no payout and no event. The condition is right and
  stays. The silence is not: reaching that branch means the draw is broken, so it must warn.
- **The layout routine must change.** `Layout.luau:130-153` places `relicNames[1..relicTarget]`
  unconditionally; it must draw from the depth's set minus the player's found names. At current
  values both produce the same result, and they diverge the moment a player re-enters a depth.
- **Persistence work** gets a bounded answer to the thing `OPEN.md §2` flags as growing: the
  collection record is 24 booleans forever. Per-area cleared state is still theirs.
- **Offer-ladder work (currently Monetization) is unblocked with a no.** There is no discovery
  rate, so a relic-luck multiplier has no quantity to move. Do not price one.
- **Feedback-UI and reveal-cue work** never need a duplicate state: no "already found" toast, no
  slot that fills twice, no consolation cue.

## Pushing back

`02-GAMEPLAY.md` states as a known consequence that a 24-object roster with depth-tiered sets
"**guarantees repeat finds**" `[brief: soft]` ← `[you accepted: R5 Q3 → R4 Q3]`. **I overrule the
premise, not the constraint:** that guarantee holds only for a with-replacement draw, and nothing
in the brief requires one. The constraint is satisfied more strongly than it asked.

`03-META.md` lists "relic luck" among allowed paid multipliers `[brief: soft]` while
`02-GAMEPLAY.md` declines it as an earned axis. I resolve it in favour of `02-GAMEPLAY.md`: after
this decision that entry names a quantity with no referent.

## Flagged to the developer

If the offer ladder wants a luck-shaped SKU, the one quantity still random is **how early in an
area a Find surfaces** — legal, because it cannot change *which* Finds a player gets, so completion
stays unbuyable. **My recommendation is not to build it**: revenue is a stated non-goal.

## Acceptance criteria

1. A saved player record contains at most 24 collection entries, every one a boolean, and no field
   named in `discovery.record.forbiddenFields`.
2. Clear every area at every depth for one player: no Find name is placed on a patch twice, and
   `foundCount` reaches 24 without the repeat branch ever being entered.
3. `collection.relicsPerArea × collection.areasPerDepth` equals the length of each depth's set,
   checked at merge; a manifest where it does not is rejected.
4. Force a layout to place an already-found name: the server logs a warning naming the Find and the
   patch index, the reveal channel does not fire, and the client shows and plays nothing.

## Not decided here

How many areas exist at each depth, how many Finds each buries, which Finds are in which set, and
their names (`collection`, content-structure work — currently Meta & Content). The per-depth
discovery rates and whether burial is spatially spread (content-structure work, then Balance &
Tuning for the figures). When a reveal fires relative to the clear
(`gameplay/core-loop/03-reveal-placement`: on contact, per patch). What a reveal looks and sounds
like (Art — VFX; Audio — Stingers). The Luau type of the record and how it reaches a DataStore
(persistence work). Whether a Find carries a rarity (`03-rarity-ladders`, same domain — it does not).
