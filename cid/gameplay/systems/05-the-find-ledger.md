# 05 — The Find ledger

**Domain:** gameplay/systems · **Category:** Gameplay · **Wave:** 2

## Decision

**Duplicates are removed, not resolved.** The areas at one depth **partition** that depth's set —
`relicsPerArea × areasPerDepth == |set|` — so no name exists in two places and no draw can repeat
one. **Placement is derived from the fixed layout seed and never from player state**, so a rejoin
re-places nothing. The record is **one boolean per name in `collection`, and nothing else**.
**The silent discard at `Clearing.luau:209` is NOT ratified** — the guard stays, the silence goes.
**Nothing in this game is luck-shaped.**

## Why

- **The constraint, aimed at this domain by name.** `02-GAMEPLAY.md`: "**Constraint on whoever
  designs systems — solve duplicates without adding a currency.**" Both escapes, a duplicate-find
  currency and a discovery currency, were "offered and declined". `[brief: soft]`, treated as firm.
  A pool that cannot repeat satisfies it a fortiori: no duplicate exists, so nothing needs a sink.
- **Draw-without-replacement is a shipped, named mechanic.**
  `[research: https://www.gamerefinery.com/the-complete-guide-to-mobile-game-gachas-in-2022/]` —
  the box gacha, a prize "permanently removed from the gacha prize pool", no currency anywhere in
  the mechanism.
- **Scoping it per set is the same idea at the right width.**
  `[research: https://blizzardwatch.com/2020/03/23/hearthstones-duplicate-protection-new-player-experience-completely-change-game/]`
  — "you won't see a duplicate until you own every card of that rarity", guaranteed independently
  per rarity; four sets of six is that shape. That source keys exclusion on *ever-owned*, because
  disposal would otherwise be a re-roll.
- **The configuration I am avoiding has a name and a documented history.**
  `[research: https://machinations.io/articles/an-in-depth-look-at-gacha-boxes]` — complete gacha,
  a set-completion reward laid over a random draw, makes the *last* member of each set the
  bottleneck, cites the coupon collector's problem, and in its paid form was declared illegal in
  Japan. Four sets of six with a bonus on each completion is that unless the pool is bounded.
- **The partition is what closes the hole.** `collection`'s merge check permits over-supply
  (`areasPerDepth × relicsPerArea >= |set|`), and over-supply manufactures the repeat: at
  `areasPerDepth = 2` with `relicsPerArea = 6`, the second area either re-offers six names the
  player has or buries nothing. I tighten it to equality. **At today's values (6 × 1 = 6) the rule
  is a no-op**, which is what makes it safe to state before content work moves `areasPerDepth`.
- **Placement is the seed's, never the player's — the correction R2 forced, and a simplification.**
  `Layout.build()` takes no player state and resolves everything from one fixed seed, and
  `Plots.luau:366` calls it on every join *before* applying `state.cleared`
  `[research: game/src/server/Plots.luau]`. My first version told layout to draw from the set minus
  the player's found names; on a mid-area rejoin that re-places the outstanding Finds over all
  patches, drops some onto cleared ones, and makes the set uncompletable. **The partition already
  guarantees no name repeats, so the found set has no work to do in placement.** The seed picks the
  slots, the slice fills them in order, and an unfound Find's slot is never a cleared patch because
  clearing a patch is what reveals it. `social/01`'s rejoin-stability requirement then holds
  exactly rather than approximately.
- **The record shape.**
  `[research: https://devforum.roblox.com/t/how-would-i-go-about-making-a-index-like-find-the-markers/1715824]`
  — the Roblox-native finite index is a per-item boolean with the UI derived from it, never stored.
  `Persistence.luau:124` already holds `found = {}` as `{[string]: boolean}`
  `[research: game/src/server/Persistence.luau]`. Under this pool that shape is **correct rather
  than defective**: it cannot express a duplicate, and no duplicate exists.
- A with-replacement pool would instead need a per-item, non-fungible deepening mechanism rather
  than any conversion. That shape is in the research pack and is deliberately not described here:
  it is the priority-2 refinement, and this design ships without it.
- `[research owed: the index or bestiary page of a shipping Roblox game with a finite roster and a
  stated repeat rule — Fisch's fish index is the named candidate]`. The pass states plainly that no
  such Roblox game was reached; I do not present the precedents above as Roblox-native.

```manifest
{
  "provides": "discovery",
  "value": {
    "pool": {
      "scope": "per player, per depth",
      "source": "collection.sets[depth].relics",
      "replacement": "without",
      "areasPartitionTheSet": true,
      "invariant": "collection.relicsPerArea * collection.areasPerDepth == collection.sets[depth].relics.length",
      "invariantHoldsToday": "3 * 2 == 6. It USED to read 6 * 1 == 6 with the note that the rule changed no shipped behaviour -- true until ruling R-2 took relicsPerArea to 3 and areasPerDepth to 2. The no-op safety argument has expired: the draw is load-bearing now and must be tested rather than assumed, which is exactly why this sheet was written before it was needed.",
      "placementIsPlayerIndependent": true,
      "placementRule": "the layout seed alone picks which patch indices carry a Find; the area's slice fills those slots in order. Neither the player's found set nor cleared set is an input to placement.",
      "placementDomain": "uncleared patches only — derived, not filtered: clearing a patch reveals its Find, so an unfound Find's slot is never a cleared patch",
      "stableAcrossRejoin": true,
      "exclusionKey": "ever-found; it governs what a slot yields, never where a slot is",
      "spatialDistribution": "content-structure work's, not decided here",
      "tierWeighting": "none, per the rarity key",
      "guaranteedException": "onboarding's first Find sits on the patch nearest the plot origin, from the same seed, and consumes the first slot of depth 1's slice"
    },
    "record": {
      "keyedBy": "the Find's name, from collection.sets[].relics[].name",
      "entries": "sum(collection.sets[].relics.length)",
      "fields": [
        { "name": "found", "type": "boolean", "default": false, "persisted": true, "writtenBy": "server, at the instant the hiding patch clears", "clearedBy": "nothing, ever" }
      ],
      "derived": [
        "foundCount = the number of true entries",
        "setComplete(setId) = every name in that set is true",
        "collectionComplete = every name in collection is true",
        "newThisSession = compared against a snapshot taken at join, held in memory, never saved"
      ],
      "forbiddenFields": [
        "count", "duplicates", "timesFound", "timestamp", "foundAt", "depthFoundAt",
        "condition", "quality", "variant", "restoredLevel", "favourite",
        "seen", "isNew", "equipped", "sortIndex", "tradeable"
      ],
      "growth": "one boolean per name in collection, and nothing else; the record never grows with play"
    },
    "repeat": {
      "possible": false,
      "cause": "only a layout that assigns a name outside its area's slice, which is a build defect and not a game state",
      "runtimeBehaviour": "the patch hides nothing, the server logs a warning naming the Find and the patch index, the reveal channel does not fire",
      "silentDiscardRatified": false,
      "playerFacing": "nothing, and no player can reach this branch; it is a defect path, not the silent duplicate case core-loop/03 forbids"
    },
    "luckShaped": false,
    "luckShapedDetail": "the partition is fixed and placement is seed-derived, so the SET of Finds a depth yields is fully determined. There is no drop rate, so there is no rate for a multiplier to act on.",
    "theOnlyRandomQuantities": [
      "which patch indices the seed picks to carry a slice",
      "the order in which a depth's slices are assigned to its areas"
    ],
    "sellableLuck": "none",
    "sellableLuckAbsence": "\"none\" is the scalar sentinel from cid/tech/deploy/02 (no explicit null in an emitted config). There is no sellable luck quantity of any kind; the sibling luckShaped false carries the same fact as a boolean, so this field is documentary and the sentinel only keeps it readable.",
    "persistenceRequirement": "one boolean per name in collection and nothing else; the one part of save data bounded by design rather than by collapse"
  }
}
```

## Consequences for other work

- **Content-structure work (currently Meta & Content) inherits a hard equality.** Raising
  `areasPerDepth` requires lowering `relicsPerArea` to match, so a depth's set spreads across its
  areas rather than repeating into each. What that buys: every area at every depth buries a full
  quota of Finds the player lacks, so no session is spent in an area with nothing new in it — the
  brief's highest-risk objective protected structurally rather than by tuning.
- **The layout routine changes, but not the way my first version said.** `Layout.luau:130-153`
  places set one unconditionally; it must place *the area's slice*, which at `areasPerDepth = 1`
  is set one and is identical today. It must **not** take the player's found set as an input.
- **`core-loop/03` required that any duplicate answer "must also produce an audible event, or
  contact placement has a silent case in it".** This satisfies it by removing the case: no
  reachable duplicate exists, so there is no silent clear to sound. `Clearing.luau:209`'s guard
  stays and must warn to the server, because reaching it means the build is wrong, not the player.
- **Persistence work** gets a bounded answer to the thing `OPEN.md §2` flags as growing, and
  `social/01`'s rejoin-stability requirement is satisfied by placement being seed-derived.
- **Offer-ladder work (currently Monetization) is unblocked with a no.** There is no discovery
  rate, so a relic-luck multiplier has no quantity to move. The one quantity still random is how
  early in an area a Find surfaces; **my recommendation is not to build a SKU on it**, because
  revenue is a stated non-goal.
- **Feedback-UI and reveal-cue work** never need a duplicate state: no "already found" toast, no
  slot that fills twice, no consolation cue.

## Pushing back

`02-GAMEPLAY.md` states as a known consequence that a 24-object roster with depth-tiered sets
"**guarantees repeat finds**" `[brief: soft]` ← `[you accepted: R5 Q3 → R4 Q3]`. **I overrule the
premise, not the constraint:** that holds only for a with-replacement pool, and nothing requires one.

`core-loop/04` (stage 1, approved) recommends dropping `relicsPerArea` and raising `areasPerDepth`
to about 15 so the collection outlasts one session, on the stated premise that "duplicates are
already guaranteed by the brief". **My invariant forecloses that, and I name it rather than let
stage 3 hit it as a wall.** Under equality a 6-member set permits `areasPerDepth ∈ {1, 2, 3, 6}`,
capping the collection at 24 laps rather than the ~59 modelled. That still satisfies
`core-loop/04`'s own criterion — 24 laps at its 164 s target is far past a floor session — and
`core-loop/05` argues the opposite way from mine, that at ~15 areas per depth the ladder maxes
inside depth 1 and "deeper areas are larger" becomes false. My cap lands between the two. The
alternative I decline is `>=` with disjoint slices, which buys laps by leaving areas that bury
nothing, and an area with no Find in it is exactly where the session objective silently fails.

`03-META.md` lists "relic luck" among allowed paid multipliers `[brief: soft]` while
`02-GAMEPLAY.md` declines it as an earned axis. I resolve it in favour of `02-GAMEPLAY.md`: after
this decision that entry names a quantity with no referent.

## Acceptance criteria

1. A saved record contains exactly one boolean per name in `collection` and no field named in
   `discovery.record.forbiddenFields`.
2. `collection.relicsPerArea × collection.areasPerDepth` equals the length of each depth's set,
   checked at merge; a manifest where it does not is rejected.
3. **One scripted run, with a rejoin inside it.** Clear patches in the first area until at least
   one of that area's Finds is still unfound, rejoin, then clear every area at every depth. All
   four assertions hold: every Find outstanding at the rejoin reappears on the same patch index it
   held before; each of those sits on a patch `state.cleared` does not mark; no name is placed on a
   patch twice anywhere in the run; and `foundCount` reaches
   `sum(collection.sets[].relics.length)` without the repeat branch ever being entered.
4. Force a layout to assign a name outside its area's slice: the server logs a warning naming the
   Find and the patch index, the reveal channel does not fire, and the client shows nothing.

## Not decided here

How many areas exist at each depth, how many Finds each buries, which Finds are in which set, and
their names (`collection`, content-structure work). Per-depth discovery rates and whether burial is
spatially uniform or spread (content-structure work, then Balance & Tuning). When a reveal fires
relative to the clear (`gameplay/core-loop/03-reveal-placement`: on contact, per patch). What a
reveal looks and sounds like (Art — VFX; Audio — Stingers). The Luau type of the record and how it
reaches a DataStore (persistence work). Whether the guaranteed first patch survives
`mechanics/02`'s keep-clear disc (onboarding and area-layout work; I depend on it, I do not decide
it). Whether a Find carries a rarity (`03-rarity-ladders`, same domain — it does not).
