# 04 — Lap against session

**Domain:** Core Loop · **Category:** Gameplay · **Wave:** 1

## Decision

**The session boundary falls strictly inside a lap, never on one.** A bound session is **three to
seven complete laps plus one in progress**, and one depth-1 lap targets **165 seconds** at base
stats (`[playtest unknown]`, test range 120 to 200 s). The lap is **not** grown to session length.
Area completion is a **repeating beat of the loop, not the session's climax**.

Laps span sessions. The shipped patch-granular `cleared` state that collapses to `areasComplete`
on completion is **ratified** (G4), with one addition: re-entry must restore the player's *place*
in the lap, not only their progress in it.

**Core Loop owns no build-contract key**, so this sheet carries no `manifest` block, and that is
correct rather than thin. I read `SCHEMA` in `bridge/schema.mjs`: all ten keys (`area`, `tiers`,
`upgrades`, `vocabulary`, `currency`, `movement`, `patch`, `collection`, `onboarding`, `modules`,
`runtime`) name another owner. My output is the predicate block below, sized for
`game/test/config.spec.luau`.

## Why

### The brief already answers "where does the boundary fall", and nobody read it that way

The return hook is stated: **"An unfinished area and a half-empty index"** `[brief: soft]` ←
`[you accepted: R3 Q3]` (`03-META.md`), and "doing nothing at all was offered and declined, so
there is a retention brief, just a cheap one."

**"An unfinished area" is a statement about where the session boundary falls.** It says that at the
moment a player stops, an area is in progress. That is only reliably true if the session boundary
lands *inside* a lap, which requires laps to be short relative to sessions. Under a lap sized to
one session, the boundary and the lap boundary coincide, and the player either finishes and leaves
with nothing unfinished (half the stated hook does not exist) or never finishes (the central payoff
never lands). **Both failure modes are produced by the same choice**, which is why I am not taking
it.

### Reading "a lap is finishing a space" without overruling it

`01-FOUNDATION.md`: **"A lap is finishing a space, not hitting a number"** `[brief: binding]` ←
`[you chose: R1 Q2]`. I am not overruling it and I do not need to. This category's own lead already
glosses it correctly: *"No threshold, quota, or target number may become the unit of progression. An
area being complete is the unit"* (`cid/gameplay/_category.md`). It fixes **the unit of
progression**. It says nothing about how many units fit in a sitting, and its declined alternatives
(farm-until-threshold, one-find-per-lap, two interleaved loops) are all alternative *units*, not
alternative rates.

Two further brief lines settle the rate the other way from "one lap per session":

- **Loop step 5, "move to a deeper area"** `[brief: binding]` ← `[you chose ×4]`, and the stated
  closure, *"faster tools from step 4 make the next area's completion reachable"*. At one lap per
  session, step 5 is the last thing a player does before quitting, or they never reach it, and the
  closure the brief describes is only ever felt across a logout. **A five-step loop whose fifth step
  is not reached inside a sitting is not a loop the player experiences.** At three or more laps, a
  player traverses 1 to 5 and returns to 1 at least twice per session.
- **The brief's own peak ordering already ranks the reveal above completion.** `OPEN.md §2`: *"a
  relic reveal owns the best sound in the game"*, while an area's completion gets *"a short
  resolving chord"* `[brief: soft]` ← `[I assumed]`. So making completion a repeating beat rather
  than the session's climax is consistent with the brief's own weighting, not a demotion I
  invented. The session's climax is the Find reveal, which is also what the session *objective*
  names: "find at least one new relic" `[brief: soft]`.

### The duration: inherited, not re-derived

Sheet 01 derived it from the shipped manifest and I carry the figure rather than recompute it:
`sweptPerSecond = 2 · baseClearRadius · baseWalkSpeed = 176 studs²/s`, `lapSeconds = size² /
sweptPerSecond · ROUTE_SLACK = 14400/176 · 2.0 = 164 s`. **Target 165 s; the derived value is 164
and the two differ by under 1%, so nothing in this sheet requires a change to `area.size` or
`area.patchCount`.** `[playtest unknown]` test range 120 to 200 s. Above 200 s the ruling itself
breaks (see the band), so a playtest that wants a five-minute lap is re-opening this sheet, not
tuning inside it.

`01-FOUNDATION.md` concedes lap length was unsourceable across three source types and rules the
reference's number non-transferable, so this is the first stated number rather than a contradiction
of a researched one. The closest shipping analogue of a completion-shaped lap runs from a few
minutes to two or three hours per job, with an early representative job at 30 to 45 minutes
`[research: https://earlyguides.com/powerwash-simulator/walkthrough]` (fetched in this domain's
planning pass, recorded in `_lead.md`, not re-fetched here). Its smallest early lap is 1.5x this
game's entire bound session and it survives that only on long desktop sittings. **It confirms the
shape and inverts the scale**, so it cannot be used to argue for a session-length lap here.

### The band, and where its two edges come from

```
SESSION_FLOOR / 8  <=  lapSeconds  <=  SESSION_FLOOR / 3
        75 s       <=     164 s    <=       200 s
```

**Upper edge, 3 laps per floor session.** `[cid: decided]` This is the edge that forbids the 4x area
growth sheet 01's supply figure implies. Below three laps in a 600-second session, the completion
beat does not repeat inside the session, so it reads as a one-off rather than as the loop's rhythm,
and step 5 is reached at most once. Three is the smallest count at which a player completes, moves
deeper, completes again, and is mid-third when they stop, which is exactly the state the return hook
describes.

**Lower edge, 8 laps per floor session.** `[cid: decided]` `02-GAMEPLAY.md`: *"The only friction is
the size of an area. A large dense area takes time; that is the entire difficulty curve"*
`[brief: soft]` ← `[you accepted: step 6 Q2]`. Under 75 seconds an area does not take time in any
sense a player would notice, and the game's entire difficulty curve has no expression. 75 seconds
is about 1200 studs of travel at base walk speed, which is a space; 40 seconds is a room.

**What the band means in studs, which is the number area authoring will actually use.** At base
stats it permits an area of **81 to 133 studs square**. East Terrace at 120 sits at **82% of the
ceiling**. At a maxed ladder (radius 14.3, speed 25.6, swept 732 studs²/s, 4.16x base) it permits up
to **271 studs square**. So the whole game's legal footprint range is a factor of about 3.3 in side
length. Note this binds **tighter than sheet 03's** Find-per-session ceiling of 471 studs square, so
**this band, not sheet 03's inequality, is the binding constraint on how large an area may be.**

### Why a lap may span sessions (G4), ratifying the shipped behaviour

1. **Permanence makes it free.** *"Cleared is permanent, overgrowth never returns"* `[brief:
   binding]` ← `[you chose: R2 Q1]`. A partial area is stable across a logout with no decay logic,
   because slow regrowth and decay-if-you-leave were both offered and declined.
2. **The return hook requires it.** An unfinished area is only a hook if it is still unfinished on
   return.
3. **The alternative is a failure state.** *"No death, no losing, no loss of progress"* `[brief:
   soft]` ← `[you accepted: step 6 Q2]`. Requiring one-sitting completion means an interrupted
   player loses the lap, on a mobile-heavy audience aged 8 to 14 `[brief: binding]` ←
   `[you chose: R1 Q4]` whose sessions are interrupted by definition.
4. The shipped `load`/`save` pair already does exactly this, and already collapses a finished area
   to one boolean, which is what `OPEN.md §2` demands to keep save size bounded. **Ratified as
   written.**

### The return pull, built only from permanence and an incomplete index

**The pull is a place left mid-restoration.** Because nothing returns, the area a player left is
exactly as they left it: a visible boundary between cleared stone and standing overgrowth, at the
spot where they stopped walking. That edge, plus an index with visible empty slots, is the whole
hook. The player comes back to **resume**, not to collect.

**That imposes one requirement, and it is the operative half of the hook.** The edge has to be in
front of the player when they arrive. If re-entry drops them at the plot origin in a field they
already cleared, the unfinished area is behind them and the hook is invisible. So the session
boundary is a position as well as a time, and re-entry must restore both. This is a requirement on
what persists, which `_lead.md` already lists as a consequence this domain forces outward.

### The cost of this ruling, stated in full rather than softened

**Under a multi-lap session the shipped collection structure completes the game's long-term
objective in about eleven minutes.** `gameplay/meta/02` sets `relicsPerArea` to 6 against 6-member
sets so that "completing an area completes exactly one set", and there is one set per depth. So
24/24 costs **4 laps = 656 seconds = 10.9 minutes**, which is **inside one floor session**, by a
margin of 9%. The brief's objective table orders its scopes moment < session < short-term <
long-term `[brief: soft]` ← `[you accepted: R6 Q3 → R5 Q3]`; at shipped values the bottom three
collapse into one.

**This is the bill my ruling sends, and I am not paying it with content.** The natural fix is fewer
Finds per area and more areas per depth tier. Worked through: at one Find per area with duplicates
drawn from a 6-member set, coupon-collector expectation is 6·H(6) ≈ 14.7 laps per set ≈ 40 minutes,
so short-term becomes two to four sessions and long-term becomes eight to sixteen. That satisfies
the ladder without a single new system, and duplicates are already guaranteed by the brief
(`02-GAMEPLAY.md`). It is Meta & Content's call, not mine.

**One obstruction to name, because it is mechanical.** `bridge/schema.mjs` asserts
`collection.relicsPerArea >= largest set size`, with the reason "that set can never complete from
one area". **That reason is only sound when exactly one area exists per depth**, and it therefore
forbids the fix above outright. The invariant needs to become
`areasPerDepth · relicsPerArea >= setSize`. That is build-contract definition work, flagged not
decided.

**And the opposite cost, so the trade is visible.** My ruling makes **area supply**, not area size,
the binding content axis: a player consumes about 22 areas per hour. This is why chunk shuffling is
on the priority-1 fence rather than being a nice-to-have. Under a session-length lap it would be
needed once per session; here it is needed three to seven times.

## The requirement, as a predicate

Pasteable into `game/test/config.spec.luau` **immediately after** the payoff-cadence block from
`gameplay/core-loop/01`, which defines `lapSeconds`. It deliberately does not recompute it: two
copies of `ROUTE_SLACK` is two lap lengths.

```luau
print("\n-- lap against session (gameplay/core-loop/04) --")

local SESSION_FLOOR = 600     -- 00-CORE.md "10-20 minute active sessions"
local SESSION_CEILING = 1200
local LAPS_MIN = 3            -- [cid: decided] step 5 must be reached twice inside a floor session
local LAPS_MAX = 8            -- [cid: decided] under 75s an area is a room, not a space

print(string.format("  lap %.0fs -> %.1f complete laps in a floor session, %.1f in a ceiling session",
	lapSeconds, SESSION_FLOOR / lapSeconds, SESSION_CEILING / lapSeconds))

-- The lap is a fraction of the session, bounded both ways. The upper bound is what
-- forbids growing the area to session length; the lower bound is what forbids
-- shrinking a lap into a checkpoint.
check(lapSeconds <= SESSION_FLOOR / LAPS_MIN,
	"a floor session contains at least 3 complete laps, so the loop's step 5 is reached inside a sitting")
check(lapSeconds >= SESSION_FLOOR / LAPS_MAX,
	"a lap is at least an eighth of a floor session, so an area is a space rather than a room")

-- The area footprint the band permits, at whatever throughput the player arrives with.
local sweptAtBase = 2 * GC.BaseClearRadius * GC.BaseWalkSpeed
print(string.format("  band permits %.0f-%.0f studs square at base stats; this area is %d (%.0f%% of ceiling)",
	math.sqrt(SESSION_FLOOR / LAPS_MAX * sweptAtBase / 2.0),
	math.sqrt(SESSION_FLOOR / LAPS_MIN * sweptAtBase / 2.0),
	GC.Area.size, 100 * lapSeconds / (SESSION_FLOOR / LAPS_MIN)))

-- The brief's objective table orders its scopes moment < session < short-term <
-- long-term. Long-term is 24/24, and 24/24 costs totalFinds/relicsPerArea laps.
local totalFinds, largestSet = 0, 0
for _, s in ipairs(GC.RelicSets) do
	totalFinds += #s.relics
	largestSet = math.max(largestSet, #s.relics)
end
local lapsToComplete = math.ceil(totalFinds / GC.RelicsPerArea)
print(string.format("  24/24 costs %d laps = %.0fs = %.2f floor sessions",
	lapsToComplete, lapsToComplete * lapSeconds, lapsToComplete * lapSeconds / SESSION_FLOOR))
check(lapsToComplete * lapSeconds > SESSION_FLOOR,
	"the long-term objective outlasts one floor session")

-- The short-term objective (one set) must outlast one ceiling session, or the ladder's
-- short-term and session scopes are the same scope. PRINTED, not asserted: the fix is
-- more areas per depth tier and depth 2+ does not exist yet, so a failure has no
-- addressee. Convert to a check when a second depth ships.
local lapsPerSet = math.ceil(largestSet / GC.RelicsPerArea)
print(string.format("  PENDING one set costs %d lap(s) = %.0fs against a %ds ceiling session; needs %d laps",
	lapsPerSet, lapsPerSet * lapSeconds, SESSION_CEILING,
	math.floor(SESSION_CEILING / lapSeconds) + 1))
```

At the shipped manifest: `lapSeconds` 164 inside a 75-to-200 band, 3.7 laps per floor session, band
81 to 133 studs against an area of 120, 24/24 at 656 s against a 600 s floor (passes by 9%), and one
set at 1 lap against a needed 8 (the printed line, failing).

## Consequences for other work

- **Area authoring by depth** [currently Meta & Content] inherits a two-sided band, not a target.
  `area.size² / (2 · baseClearRadius · baseWalkSpeed) · ROUTE_SLACK` must land between 75 and 200
  seconds **at the throughput a player plausibly arrives with**, at every depth. Growing an area's
  footprint is now legal only in proportion to the throughput growth that precedes it.
- **Sheet 01's predicate (1) has the wrong denominator under this ruling, and I am naming it rather
  than editing it.** It requires `area.patchCount >= 600 / secondsPerPatch` "for the deepest area
  reachable in one sitting, or a bound session runs out of overgrowth", which assumes one area serves
  one session. Under a multi-lap session that quantity is a property of **the set of areas reachable
  in one sitting**, not of one area, and the 27% supply figure it reports is the shortfall of a
  single area against a whole session rather than a defect. Sheet 01's own recommendation was "(b)
  with (d): make several areas reachable per session, so a session is three to six laps", which is
  this ruling. Its predicate simply predates it.
- **The gating question** [currently Meta & Content, `OPEN.md §5 #3`] is now load-bearing on this
  sheet. Three to seven laps per session means the next area must be **enterable at the instant one
  completes**, with no threshold, no cooldown and no travel worth measuring. Any gate at all
  converts the completion peak into a stall three to seven times a session.
- **`collection.relicsPerArea`** [currently Meta & Content] is the single value that makes this
  ruling collapse. At 6, with one area per depth, 24/24 lands inside one floor session. It must fall
  and areas per depth must rise, or this sheet's ladder-separation requirement cannot be met at any
  lap length inside the band.
- **The build contract's collection invariant** [build-contract definition, currently
  tech/architecture] must relax `relicsPerArea >= largest set` to
  `areasPerDepth · relicsPerArea >= setSize`. As written it forbids the only fix to the item above.
- **What must persist** [currently Systems, then Tech & Data] gains one field beyond the shipped
  set: the player's position at save time, restored on rejoin whenever their current area is
  incomplete. This is the operative half of the return hook, and it is bounded, one Vector3 per
  player, not per area, so it does not touch the unbounded-world-state risk `OPEN.md §2` names.
- **Spawn placement** [currently Mechanics, with Onboarding] inherits a conditional: place the player
  at their saved position when an area is partially cleared, and at the onboarding spawn otherwise.
  Run 1 has no saved position, so `gameplay/onboarding/01`'s guarantee that the first Find sits at
  the patch nearest spawn is untouched.
- **Depth escalation** [sheet 05, this domain] inherits the band as its entire budget. Because
  lap wall-clock is bounded above at 200 s at every depth, "the binding constraint moves from tool
  power to time and patience" `[brief: soft]` cannot be expressed as **longer laps** beyond a factor
  of 2.7 across the whole game, and **only 1.2x of that remains** once depth 1 ships at 165 s. Whether
  the assumption survives on that budget, and what else could carry it, is 05's ruling and I do not
  take it.
- **The completion cue** [currently Audio, sized by sheet 02] inherits a repetition count it did not
  have: the area-completion chord and the coincident set-completion event fire **three to seven times
  per session**, not once. `OPEN.md §2` calls completion one of "the two emotional peaks" and that
  survives, but a cue written to be heard once a sitting will be heard seven times.
- **Whatever content exists past collection completion** [currently Meta & Content] inherits a
  sharper deadline than sheets 01 and 03 stated. They establish that the terminal state is reachable
  and permanent; this sheet dates it. At shipped values it arrives at **minute 11 of session 1**.

## Acceptance criteria

1. `game/test/config.spec.luau` gains a lap-against-session section asserting both
   `lapSeconds <= 600 / 3` and `lapSeconds >= 600 / 8`. Both pass at the shipped manifest, where
   `lapSeconds` is 164 against a band of 75 to 200, and the file still exits `PASS`.
2. The same section asserts `ceil(totalFinds / collection.relicsPerArea) * lapSeconds > 600` and
   prints the resulting figure in floor-sessions. It passes at the shipped manifest at 656 s against
   600 s. The same section prints, without asserting, the laps-per-set line, which reports 1 lap
   against 8 needed.
3. Persistence round-trip, both halves: with `0 < clearedCount < area.patchCount`, a save followed by
   a load restores exactly `clearedCount` cleared patch indices and leaves `areasComplete[area.id]`
   false; with the area complete, the saved payload's `cleared` list is empty and
   `areasComplete[area.id]` is true.
4. The saved payload contains the player's position, and on rejoin with `areasComplete[area.id]`
   false the player's spawn position equals that stored position rather than the plot origin. On a
   save carrying no position, spawn is the onboarding spawn unchanged.

## Flagged to the developer

**The brief never states how many laps a session contains**, so the phase relationship between the
two boundaries is `[cid: decided]`. Two calls need you.

1. **A session is several laps, not one.** Alternatives: (a) three to seven laps per session, taken
   here, which makes area supply the binding content axis and needs the collection restructured; (b)
   one lap per session, which requires growing `area.size` about 2x (footprint 4x) at depth 1, makes
   the completion peak the session's climax, and costs the stated return hook plus the in-session
   experience of loop step 5; (c) two laps per session as a compromise, which gets neither the
   repeating beat nor the climax. **Recommendation: (a).** It is what "an unfinished area" as the
   return hook already describes, it is what sheet 01 independently recommended, and (b) requires
   overruling nothing in the brief but quietly deletes half of `[you accepted: R3 Q3]`.

2. **The collection completes in about eleven minutes under (a), and the build contract forbids the
   obvious fix.** Live alternatives: (i) drop `collection.relicsPerArea` and put several areas in
   each depth tier, which requires relaxing the schema invariant `relicsPerArea >= largest set`;
   (ii) enlarge the sets past six, overruling `[you accepted: R4 Q4]`; (iii) accept 24/24 in session
   one and have Meta & Content carry the game from minute eleven onward. **Recommendation: (i).** It
   changes one value and one invariant, keeps 24 Finds in 4 sets of 6 exactly as accepted, and the
   duplicates it produces are already a stated property of the design rather than a new problem.

## Not decided here

The magnitude of the completion peak relative to the other four payoff kinds, and whether the
coincident area-plus-set peak is one peak or two (sheet 02). How many payoff events a session
contains and the maximum gap between them (sheet 01). Whether a reveal lands on contact (sheet 03,
ratified there). Whether area growth by depth is bounded, and whether "time and patience" survives a
1.2x lap-duration budget (sheet 05). Every value: `area.size` and `patchCount` at any depth
(Meta & Content, then Balance & Tuning), `collection.relicsPerArea` and how many areas sit in a depth
tier (Meta & Content), `ROUTE_SLACK` and the lap-length figure itself once measured (Balance &
Tuning, instrumented as `OPEN.md §2` item 2). What makes the next area available (Meta & Content, the
gating question). How position is stored and restored (Tech & Data). What the game is after 24/24
(Meta & Content). Whether the contract should relax its collection invariant and grow a `pacing` key
(build-contract definition, currently tech/architecture; G11).
