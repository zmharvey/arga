# 04 — Lap against session

**Domain:** Core Loop · **Category:** Gameplay · **Wave:** 1 (revised wave 7)

## Decision

**The session boundary falls strictly inside a lap, never on one.** A bound session is **four to
eight complete laps plus one in progress**, and one lap targets **165 seconds of arrival lap**
inside a band of **75 to 200 seconds**. The lap is **not** grown to session length. Area completion
is a **repeating beat of the loop, not the session's climax**.

**Laps span sessions.** Patch-granular `cleared` state collapsing to a completion flag is ratified
(G4). **The wave-1 requirement that re-entry restore the player's saved position is withdrawn** —
bay geometry delivers the same thing for free. See `## Pushing back`.

Every figure here lives in `pacing`, which `gameplay/balance` owns. This sheet amends that key with
the ruling those figures realise.

## Why

### The brief already answers "where does the boundary fall", and nobody read it that way

The return hook is stated: **"An unfinished area and a half-empty index"** `[brief: soft]` ←
`[you accepted: R3 Q3]` (`03-META.md`), and *"doing nothing at all was offered and declined, so
there is a retention brief, just a cheap one."*

**"An unfinished area" is a statement about where the session boundary falls.** It says that at the
moment a player stops, an area is in progress. That is only reliably true if the boundary lands
*inside* a lap, which requires laps short relative to sessions. Under a lap sized to one session the
two boundaries coincide, and the player either finishes and leaves with nothing unfinished — half
the stated hook does not exist — or never finishes, and the central payoff never lands. **Both
failure modes come from the same choice**, which is why I am not taking it.

### Reading "a lap is finishing a space" without overruling it

*"A lap is finishing a space, not hitting a number"* `[brief: binding]` ← `[you chose: R1 Q2]`. I am
not overruling it and do not need to. It fixes **the unit of progression**; it says nothing about
how many units fit in a sitting, and its declined alternatives — farm-until-threshold,
one-find-per-lap, two interleaved loops — are all alternative *units*, not alternative rates.

Two further brief lines settle the rate against one lap per session:

- **Loop step 5, "move to a deeper area"** `[brief: binding]`, and the stated closure *"faster tools
  from step 4 make the next area's completion reachable"*. At one lap per session, step 5 is the
  last thing a player does before quitting, or they never reach it, and the closure is only ever
  felt across a logout. **A five-step loop whose fifth step is not reached inside a sitting is not a
  loop the player experiences.** At four or more laps a player traverses 1 to 5 and returns to 1
  three times a sitting.
- **The brief's own peak ordering already ranks the reveal above completion.** `OPEN.md §2`
  `[brief: soft]`. Making completion a repeating beat rather than the session's climax is consistent
  with the brief's weighting, not a demotion I invented. The session's climax is the Find reveal,
  which is also what the session *objective* names.

### The duration, and the correction I accept rather than argue with

Sheet `01` derived the lap from the manifest at 164 s; `pacing` now publishes 165 s as the **arrival
lap** — footprint × `routeSlack` ÷ throughput *on entering* the area — and 141.5 s as the
**realised** lap, because throughput rises inside an area as rungs are bought. The ratio is 0.868.
**`gameplay/balance/05` used that to correct this sheet's lap count from three-to-seven to four-to-
eight, and the correction is right.** `[cid: decided]` Dividing a session by the arrival lap
overstates the lap and understates the count. **The shape is untouched:** the boundary still falls
strictly inside a lap, laps still span sessions, and area completion is still a beat.
`01-FOUNDATION.md` conceded lap length was unsourceable and ruled the reference's number
non-transferable, so this is the first stated number rather than a contradiction of a researched one.

### The band, and where its two edges come from

```
SESSION_FLOOR / 8  <=  arrivalLapSeconds  <=  SESSION_FLOOR / 3
        75 s       <=       165 s         <=       200 s
```

**Upper edge, three arrival laps per floor session.** `[cid: decided]` Below three, the completion
beat does not repeat inside the session, so it reads as a one-off rather than as the loop's rhythm,
and step 5 is reached at most once. Three is the smallest count at which a player completes, moves
deeper, completes again, and is mid-third when they stop — exactly the state the return hook
describes. In realised terms this yields four.

**Lower edge, eight per floor session.** `[cid: decided]` *"The only friction is the size of an
area. A large dense area takes time; that is the entire difficulty curve"* `[brief: soft]` ←
`[you accepted: step 6 Q2]`. Under 75 seconds an area does not take time in any sense a player would
notice, and the game's entire difficulty curve has no expression. 75 seconds is about 1,200 studs of
travel at base walk speed, which is a space; 40 seconds is a room. **This edge is live, not
theoretical:** `depths` reports that the `Span` radius product breaches it at rows 2 and 3, and that
the breach is the offer ladder's to fix rather than area sizing's.

### Why a lap may span sessions (G4)

1. **Permanence makes it free.** *"Cleared is permanent, overgrowth never returns"* `[brief:
   binding]` ← `[you chose: R2 Q1]`. A partial area is stable across a logout with no decay logic.
2. **The return hook requires it.** An unfinished area is only a hook if it is still unfinished on
   return.
3. **The alternative is a failure state.** *"No death, no losing, no loss of progress"*
   `[brief: soft]`. Requiring one-sitting completion means an interrupted player loses the lap, on a
   mobile-heavy audience aged 8 to 14 `[brief: binding]` whose sessions are interrupted by
   definition.
4. `persistence` already saves patch-granular `cleared` and collapses a finished area to a counter,
   which is what keeps save size bounded. **Ratified as written.**

### The cost, stated rather than softened, and it has been paid

Wave 1 reported that under a multi-lap session the shipped collection completed the long-term
objective in about eleven minutes, and recommended dropping `collection.relicsPerArea` and putting
several areas in each depth tier. **That fix shipped**: `relicsPerArea` is 3, `areasPerDepth` is 2,
`depths` carries eight areas, and the schema invariant that blocked it was relaxed to
`areasPerDepth × relicsPerArea >= setSize`. `pacing.milestones` now puts 24 of 24 at 1,073.6 s —
**17.9 minutes, outside a floor session**, which is what the objective ladder needed.

**The opposite cost stands.** This ruling makes **area supply**, not area size, the binding content
axis: a player consumes four to eight areas a session against eight authored. That is why chunk
shuffling sits on the priority-1 fence rather than being a nice-to-have, and it is why `endgame`
needed a post-terminal bay at all.

```json
{
  "amends": "pacing",
  "field": "sessionBoundary",
  "requestedBy": "cid/gameplay/core-loop/04-lap-vs-session.md",
  "why": "pacing carries completeLapsPerSession, the band and the lap target as figures. It does not carry the RULING those figures realise — where the boundary falls relative to the lap, and that the lap is deliberately not grown to session length. A later tuning pass can satisfy every figure and break the ruling by making one lap the session.",
  "value": {
    "boundaryFallsInside": "a lap, always. Never on a lap boundary.",
    "completeLapsPerFloorSession": 4,
    "completeLapsPerCeilingSession": 8,
    "lapCountCorrectionAccepted": "gameplay/balance/05 raised this from three-to-seven to four-to-eight. Wave 1 divided the session by the ARRIVAL lap; the realised lap is 0.868x it. Accepted in full; the shape is unchanged.",
    "lapIsGrownToSessionLength": false,
    "areaCompletionIs": "a repeating beat of the loop, not the session's climax",
    "sessionClimaxIs": "findReveal, which is also what the session objective names",
    "bandDerivation": {
      "upperEdgeLapsPerFloorSession": 3,
      "upperEdgeWhy": "below three arrival laps the completion beat does not repeat inside a session, and loop step 5 is reached at most once",
      "lowerEdgeLapsPerFloorSession": 8,
      "lowerEdgeWhy": "under 75 s an area is a room rather than a space, and the brief's entire difficulty curve (area size) has no expression",
      "lowerEdgeIsLive": "depths reports the Span radius product breaching it at rows 2 and 3; that breach belongs to the offer ladder, not to area sizing"
    },
    "lapsSpanSessions": true,
    "spanRatifiedBecause": ["permanence makes a partial area stable with no decay logic", "an unfinished area is only a hook if it is still unfinished on return", "requiring one-sitting completion is a loss-of-progress failure state on an interrupted mobile audience"],
    "returnPull": {
      "builtOnlyFrom": ["permanence", "an incomplete index"],
      "mustNotUse": ["daily rewards", "streaks", "offline accrual", "seasons", "events", "a waiting figure or any returning party"],
      "operativeRequirement": "the boundary between cleared stone and standing overgrowth must be in front of the player when they arrive, not behind them",
      "satisfiedBy": "bay geometry, not by a saved position: the spawn attachment sits at the LIVE bay and every bay below it is already clear, so the working edge is ahead of the player by construction",
      "savedPositionWithdrawn": "wave 1 required the player's position in the save payload. Withdrawn: spawnPivot is a live field, never persisted, and the requirement it existed to meet is met by geometry."
    },
    "gatingConstraint": "four to eight laps a session means the next area must be enterable at the instant one completes. depths.unlockRule is previousAreaComplete and nothing else; any threshold, cooldown or travel worth measuring converts the completion beat into a stall four to eight times a session."
  }
}
```

## Consequences for other work

- **Area authoring at depth** (`depths`) inherits a two-sided band, not a target, at every row and
  at the throughput a player plausibly arrives with. It is already carried as
  `depths.invariants[9]`. Growing a footprint is legal only in proportion to the throughput growth
  that precedes it.
- **The offer ladder** (`products`) owns the lower-edge breach. A radius multiplier shortens every
  lap, and `depths.areas[].maxRadiusProduct` is the per-row bound it must respect: 1.27 at row 2 is
  the tightest, against `Span` at 1.75.
- **The gating question** (`depths.unlockRule`) is load-bearing on this sheet and is settled the way
  it needs: the previous area's completion and nothing else.
- **What must persist** (`persistence`, `stateShape`) keeps patch-granular `cleared` collapsing to a
  counter and gains **nothing** from this sheet. The wave-1 position field is withdrawn.
- **Spawn placement** (Mechanics, with Onboarding): the spawn sits at the live bay, so run 1 is
  untouched and `firstSession`'s guarantee that the first Find sits nearest the plot origin still
  holds.
- **Depth escalation** (sheet `05`) inherits the band as its entire budget: because lap wall-clock
  is bounded above at every depth, *"the binding constraint moves from tool power to time and
  patience"* cannot be expressed as longer laps. Whether the assumption survives is `05`'s ruling.
- **The completion cue** (`stingers`, `mix`) inherits a repetition count it did not have: the area
  chord fires **four to eight times a session**, not once. A cue written to be heard once a sitting
  will be heard eight times.

## Acceptance criteria

1. `npm run bridge` collects this sheet's `amends` block against `pacing` and reports no problem;
   `pacing` remains provided by exactly one sheet, and this sheet's `field` (`sessionBoundary`) does
   not collide with sheet `01`'s (`payoffBudget`).
2. Every `pacing.laps[].arrivalLapSeconds` is inside 75 to 200, and
   `pacing.laps[3].cumulativeSeconds` ≤ 600 < `pacing.laps[4].cumulativeSeconds` — four complete
   laps at the session floor. Today: 536.1 ≤ 600 < 683.2.
3. `pacing.milestones[collectionComplete].baseSeconds` > 600, so the long-term objective outlasts a
   floor session. Today: 1,073.6 s against 600.
4. Persistence round-trip, both halves: with `0 < clearedCount < patchCount`, a save then a load
   restores exactly `clearedCount` cleared patch indices and leaves the area unfinished; with the
   area complete, the saved `cleared` list is empty and the completion counter has advanced. No
   player position appears in the persisted payload.

## Pushing back

**Withdrawn: this sheet's wave-1 requirement that the save payload carry the player's position and
that re-entry restore it.** The architect's state shape makes `spawnPivot` a **live** field that
never reaches a DataStore, and the spawn attachment is built at the *live bay* with every bay below
it already cleared. `[research: architect/sheets/05-interfaces.md]`

**The requirement is met and the mechanism is better.** What I actually needed was that *the working
edge be in front of the player on arrival*. A saved position achieves that by remembering; bay
geometry achieves it by construction, costs no persisted field, cannot drift, and cannot strand a
player at a coordinate an authored layout no longer contains. **I was specifying a mechanism when I
should have specified the requirement**, and the requirement is now stated as one in the amendment
above. `[cid: decided]`

## Flagged to the developer

**The brief never states how many laps a session contains**, so the phase relationship between the
two boundaries is `[cid: decided]`. One call is still yours.

**A session is several laps, not one.** Alternatives: (a) four to eight laps per session, taken
here, which makes area supply the binding content axis and is what the shipped eight-area ladder now
assumes; (b) one lap per session, which requires growing each footprint about 4×, makes the
completion beat the session's climax, and costs the stated return hook plus the in-session
experience of loop step 5; (c) two laps as a compromise, which gets neither the repeating beat nor
the climax. **Recommendation: (a).** It is what *"an unfinished area"* as the return hook already
describes, it is what sheet `01` independently recommended, and (b) requires overruling nothing in
the brief but quietly deletes half of `[you accepted: R3 Q3]`.

**This sheet names, implies and reserves space for no daily reward, streak, offline accrual, season
or event.** The return pull is permanence and an incomplete index, and nothing else.

## Not decided here

The magnitude of the completion beat against the other four kinds (sheet `02`). How many payoff
events a session contains and the maximum gap between them (sheet `01`). Whether a reveal lands on
contact (sheet `03`). Whether area growth by depth is bounded (sheet `05`). Every value: footprints
and patch counts at any depth (`depths`), `collection.relicsPerArea` and `areasPerDepth`
(Meta & Content), `routeSlack`, `lapTargetSeconds` and every realised wall-clock figure (`pacing`,
owner Balance & Tuning). What makes the next area available (`depths.unlockRule`). How state is
stored and restored (`persistence`, `stateShape`). What the game is after 24/24 (`endgame`).
