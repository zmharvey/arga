# 03 — Reveal placement

**Domain:** Core Loop · **Category:** Gameplay · **Wave:** 1 (revised wave 7)

## Decision

**A Find is revealed on contact with the patch that hides it, per patch, at the instant that patch
clears.** There is no completion-gated batch. **The channel split this sheet demanded against
working code has since shipped** — `Protocol.luau` now carries `FindRevealed`, `SetCompleted` and
`AreaRestored` as three distinct RemoteEvents and the `__area_complete:` prefix is gone.

The ruling is carried by `discovery`, which `gameplay/systems` owns; this sheet amends that key with
the placement field and the footprint inequality it implies.

## Why

### The two readings, quoted

**The batch reading** — `01-FOUNDATION.md`, core loop table, row 2, `[brief: binding]` ←
`[you chose ×4: R1 Q2, R2 Q1, R2 Q2, R3 Q1]`:

> | 2 | keep clearing until the **area is completely clear** | every buried object in it, revealed |

**The contact reading** — same sheet, `[brief: soft]` ← `[you accepted: R2 Q3]`: *"Clearing and
discovering are one action. Do not design them as separate systems."* And `02-GAMEPLAY.md`,
`[brief: soft]` ← `[you accepted: R6 Q3]`: *"**Clear → reveal inside the first ten seconds.** …
the first patch they clear has something under it."*

### Why this is not an overrule of a binding item

Row 2 states an **entailment, not a timing**: clearing until an area is completely clear produces
every buried object in it, revealed. That is true under contact placement — after the last patch
falls, all three are in the index. The batch reading adds a claim about *when* that the row does not
make. And the four questions the `[you chose ×4]` tag cites are about the unit of progression,
permanence, no rebirth and accepting the divergence. **None of the four asked about reveal timing.**
So this is `[cid: decided]` on a silence inside a binding row, not a contradiction of a decision. It
is flagged below anyway.

### Four reasons contact wins, one of which is arithmetic

**1. Batch cannot satisfy the ten-second promise without a special case.** Under batch, a reveal
inside ten seconds requires area one to be *completeable* inside ten seconds; it is 140 patches over
a realised 141.5-second lap. Batch therefore needs the starting area exempted from the loop's own
rule, and `firstSession.ceilings.secondsToFirstReveal` 10.0 becomes unsatisfiable. **A design that
must special-case its first ten seconds to obey its own core loop is wrong at the loop.**

**2. Batch is the literal separation the theme line forbids.** `[brief: soft]` Deferring the reveal
to the lap boundary puts a queue between the clear and the discovery: two events, two triggers, two
moments. Contact is the only reading under which *"clearing and discovering are one action"* is true
rather than aspirational.

**3. Contact is worth a factor of exactly `collection.relicsPerArea` in how large an area may grow
before the brief's highest-risk objective fails.** `[cid: decided]` Let `f` be the fraction of an
area's footprint a player sweeps in one bound session:

```
f = (2 · movement.baseClearRadius · movement.baseWalkSpeed · ε · T) / footprintStuds2
```

with `T = 600` s, the session floor `[brief: binding]` ← `[you chose: R1 Q4]`, and `ε` an
effective-throughput factor. `[playtest unknown]` **ε starting value 0.35, test range 0.20–0.60**;
it is the reciprocal of `pacing.routeSlack` scaled by time not spent sweeping, and it belongs to no
manifest key.

- **Under contact,** expected Finds per session `= min(1, f) · relicsPerArea`. At least one gives
  `footprintStuds2 ≤ 2·r·v·ε·T · relicsPerArea`.
- **Under batch,** expected Finds per session `= relicsPerArea · 1[f ≥ 1]` — a step function. At
  least one gives `footprintStuds2 ≤ 2·r·v·ε·T`.

**The ratio of those two ceilings is `relicsPerArea`, and every unknown cancels.** ε cancels, `T`
cancels, radius and speed cancel, `patchCount` cancels out of both sides. The decision is worth
exactly 3× the growable footprint at today's `relicsPerArea` of 3, whatever the tuning turns out to
be — and it was worth 6× when that value was 6, which is the point: the ratio is structural.

**4. Batch turns the brief's self-declared highest-risk tuning into a cliff.** `[brief: binding]`
*"discovery rates must be generous enough that a typical session yields at least one find, or the
stated session objective silently fails."* Under batch the session objective is an indicator on lap
completion, and laps span sessions. Under contact the same quantity is monotone in patches cleared,
so it can be checked with arithmetic — which is what criterion 3 does. `pacing` reports 12 Finds in
a floor session under contact.

### What the batch reading was protecting, and where that value now lives

It was protecting the **finish line's payoff**: under contact a player can hold every Find in an
area with patches still standing, so the last stretch of a lap pays only currency. That residue is
`1/(k+1)` of a lap — **25% at `relicsPerArea` 3, about 33 to 38 seconds at realised lap lengths.**
It is bounded at its far end by the completion beat, purchases fall inside it at 18.6 to 30.5 s, and
sheet `01`'s 90-second ceiling absorbs it with room. If it ever stops absorbing it, the correct fix
is spatially spread burial, not batching.

### Two independent confirmations that contact is assumed elsewhere

`discovery.record.fields[found].writtenBy` is *"server, at the instant the hiding patch clears"* and
`response.beats[findReveal].cause` is `patchHidingItCleared` with `grantedAt: "reveal"`. Both are
merged keys written by other domains, and both are contact placement stated as fact. A batch reading
would require rewriting two contract values and the `clearing` module's responsibility line.

### The duplicate hole is closed, and I withdraw the requirement

Wave 1 demanded that a duplicate Find produce an audible event, because the shipped guard dropped
the reveal silently. `discovery.repeat.possible` is now `false` — placement is a seeded partition of
each depth's set across its areas, so no player can reach a repeat, and that key states the
remaining branch is *"a defect path, not the silent duplicate case core-loop/03 forbids"*.
**Contact placement has no silent case in it and needs no new event.** `[cid: decided]`

```json
{
  "amends": "discovery",
  "field": "revealPlacement",
  "requestedBy": "cid/gameplay/core-loop/03-reveal-placement.md",
  "why": "discovery states contact placement twice as an implementation detail (record.fields[found].writtenBy, and placementDomain's derivation) and never as a ruling with a bound attached. The bound is what area authoring at depth needs, and it exists in no key.",
  "value": {
    "placement": "onContact",
    "granularity": "perPatch",
    "trigger": "the instant the hiding patch clears",
    "batched": false,
    "completionGated": false,
    "channel": "Protocol.FindRevealed, distinct from SetCompleted and AreaRestored; no payoff kind is recovered by parsing a string prefix",
    "briefReading": "01-FOUNDATION row 2 is an ENTAILMENT ('a fully cleared area has had everything in it revealed'), not a TIMING. None of the four questions its [you chose x4] tag cites was about reveal timing.",
    "worthFactor": "collection.relicsPerArea",
    "worthFactorMeaning": "the ratio of the maximum area footprint under contact to the maximum under batch, at which a bound session still expects at least one Find. Every other term cancels: efficiency, session length, clear radius, walk speed and patch count all appear on both sides.",
    "footprintBound": "footprintStuds2 <= 2 * movement.baseClearRadius * movement.baseWalkSpeed * sweepEfficiency * sessionFloorSeconds * collection.relicsPerArea",
    "sweepEfficiency": 0.35,
    "sweepEfficiencyTestRange": [0.20, 0.60],
    "sweepEfficiencyStatus": "playtest unknown",
    "sessionFloorSeconds": 600,
    "boundIsNeverBinding": "depths.invariants[9] (the 75-200 s lap band) is tighter at every row. This bound is stated so that a future relaxation of the lap band cannot silently take the Find-per-session objective with it.",
    "endOfLapFindFreeTail": "1 / (collection.relicsPerArea + 1) of a lap, 25% today, 33 to 38 s at realised lap lengths. Bounded at its far end by areaComplete and absorbed by pacing.aboveTickGapMaxSeconds; the fix if it ever stops being absorbed is spatially spread burial, not batching.",
    "duplicateCase": "none. discovery.repeat.possible is false, so the silent-duplicate requirement this sheet raised in wave 1 is withdrawn rather than carried."
  }
}
```

## Consequences for other work

- **Area authoring at depth** (`depths`) inherits a hard ceiling, not a preference:
  `footprintStuds2` at any depth may not exceed the bound above at the throughput a player plausibly
  arrives with. Note `patchCount` **cancels**: density does not affect expected Finds per session,
  only footprint does. Packing more patches into the same ground costs nothing here; growing extent
  costs directly.
- **Depth escalation** (sheet `05`) must respect the bound's *shape*; it is stated as a predicate
  over `footprintStuds2` rather than a coefficient so it holds whatever any depth turns out to be.
- **Feedback semantics** (`response`): the reveal is a per-patch event that fires up to
  `relicsPerArea` times inside one lap and can land on the same tick as an ordinary clear. The
  design must survive a reveal and a clear coinciding, and three reveals in one lap without the
  third feeling like the first repeated. `response.beats[findReveal].forbiddenChannels` already
  keeps it off the notice channel, which is the two completions'.
- **Audio** (`stingers`): reveal and area completion are two distinct cues on two distinct channels,
  and that is now a fact of `Protocol.luau` rather than a request.
- **Payoff frequency** (sheet `01`) inherits a known worst case of `1/(relicsPerArea + 1)` of a lap
  with no Find in it, at the end of the lap, which its 90-second ceiling absorbs via purchases.
- **At 24/24 the reveal event stops firing entirely** — permanently, per player, because nothing
  regrows. `endgame` owns what replaces it; **I invent no content**, and whatever it supplies must be
  a recurring payoff kind that is not a re-reveal of an owned Find.

## Acceptance criteria

1. In a fresh save, clearing only the single patch nearest spawn fires **exactly one**
   `FindRevealed` event and leaves the collection count at 1 with 139 patches uncleared. *(This is
   the criterion batch fails.)*
2. `grep -r "__area_complete" game/src` returns nothing, and `FindRevealed`, `SetCompleted` and
   `AreaRestored` are three distinct entries in `Protocol.luau`. No client code branches on a string
   prefix to tell one payoff kind from another. **Both pass on disk today.**
3. `min(1, 2·baseClearRadius·baseWalkSpeed·0.35·600 / footprintStuds2) · relicsPerArea >= 1` holds
   for every row of `depths.areas`. At the largest row, 57,600 studs², the expression is 1.9 against
   a required 1. At the boundary where the expectation equals 1, two players in three still see a
   Find, so the median holds without a safety coefficient.
4. No reveal is emitted from the area-completion branch of the clearing tick, and no reveal is
   emitted on a tick in which the receiving player cleared no patch.

## Not decided here

Where in an area a Find sits, and whether burial is uniform or spatially spread (`discovery` and
`layout`, whose owners are Systems and Meta & Content). Every value in the inequality (Balance &
Tuning; `movement` is Mechanics'). What the reveal looks, sounds and reads like (`effects`,
`stingers`, `notices`, `response`). The relative *magnitude* of a reveal against the other four
payoff kinds (sheet `02`). How many payoff events a session must contain (sheet `01`). Lap duration
and session spanning (sheet `04`). Whether area growth by depth is bounded (sheet `05`). The remote
names, which `Protocol.luau` and the architect's technical contract own.

## Flagged to the developer

**The interview never asked when a Find is revealed, and the loop table can be read either way.** I
read row 2 as an entailment rather than a timing, because none of the four questions its
`[you chose ×4]` tag cites was about timing, and because the batch reading contradicts the
ten-second onboarding promise you accepted at R6 Q3.

| alternative | consequence |
|---|---|
| **1. Contact, per patch** — ratified here | satisfies onboarding with no exemption, makes the session objective checkable arithmetic, permits areas `relicsPerArea`× larger in footprint before that objective fails |
| **2. Completion-gated batch** | requires exempting area one from the loop, makes the session objective a step function on a lap length the brief calls unsourceable, and costs two thirds of the footprint headroom |
| **3. Hybrid: contact reveals plus a summary at completion** | not a *placement* change — it is reading 1 with a completion screen bolted on, and a summary of things already seen is `notices`' decision, not this sheet's |

**Recommendation: 1.** Zero behavioural change to shipped code, two merged keys stay consistent, and
the alternative costs a factor of `collection.relicsPerArea` in area headroom for a payoff the
completion beat plus the set bonus already delivers.
