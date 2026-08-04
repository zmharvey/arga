# 05 — Depth escalation

**Domain:** Core Loop · **Category:** Gameplay · **Wave:** 1 (revised wave 7)

## Decision

**Clearing throughput must MATCH area growth: lap wall-clock holds flat across depth, never rises.**
Footprint is indexed to the throughput a player **arrives** at that depth with, not to the depth
index. **Escalation is delivered as footprint and density, never as duration.**

**Both growth curves are bounded (G5), by different mechanisms.** Throughput is hard-bounded by
`upgrades[].maxLevel` — finite levels, no rebirth to reset them, no fourth axis. Footprint is
bounded *by* throughput and therefore bounded too. Density is bounded above by
`runtime.clearTickRate` and below by sheet `01`'s three-second rule.

**The brief's escalation assumption is overruled.** Tool power, not time and patience, is the
binding constraint for the entire specced game. See `## Pushing back`.

The sizing rule shipped: it is `depths.sizingRule` verbatim, and its three checks are
`depths.invariants[9]`, `[10]` and `[11]`. This sheet amends that key with the ruling behind them.

## Why

### What the inherited constraints add up to

| inherited | source |
|---|---|
| lap wall-clock inside 75–200 s at every depth, at arrival **and** one upgrade level behind it | sheet `04`, realised as `depths.invariants[9]` |
| no 90 s stretch above a currency tick | sheet `01`, realised as `pacing.aboveTickGapMaxSeconds` |
| *"early areas are small and sparse, later areas are large and dense, so the binding constraint moves from **tool power** to **time and patience**"* | `01-FOUNDATION.md` `[brief: soft]` ← `[I assumed — extrapolated; not interviewed]`, and `OPEN.md §5 #2` names this domain |

**Two of the three hold at every depth. The third is the one that gives.**

### Arithmetic, not preference: there is no room for duration to escalate

`03-META.md` fixes the long-term objective at 24 of 24 `[brief: soft]` and `collection` buries one
set per depth, so the specced game is four depths — three growth steps. Sheet `04` bounds the lap at
200 s and depth 1 ships at 163.6 s arrival, leaving **1.22×** for three steps: **6.9% per depth.**
A lap 6.9% longer is not an escalation anybody can perceive; it is inside the measurement error of a
figure `OPEN.md §2` itself calls *"the pacing number nobody could source"*. `[cid: decided]`
**Duration cannot carry the escalation read. Footprint can:** `depths.areas` runs 14,400 to 57,600
studs², **4.0×**, at arrival laps of 153.1 to 164.0 s — a 7% spread, which is flat.

### Why the remaining headroom is under-buy tolerance rather than escalation budget

*"The only friction is the size of an area"* and *"a stuck player cannot exist"* `[brief: soft]` ←
`[you accepted: step 6 Q2]`. With no failure state, no tension and one verb, **the only way a player
can be worse at this game is by spending badly** — and spending badly is easy, because one of the
three axes buys income and moves no term in the sweep model at all. A player who puts everything
into `value` arrives at base throughput forever. `depths.valueOnlyPurchaserThreshold` is 7.0 and
exists precisely to name that player.

That variance **grows with depth**, so an area sized to a well-spent arrival carries more risk the
deeper it sits. Spending the band headroom on escalation would put a badly-spending player past
200 s at exactly the depths where *"a stuck player cannot exist"* is hardest to honour.
`[cid: decided]` **So the headroom is reserved**, and the reservation is the second term of the
`min(...)` in `depths.sizingRule`: `min(LAP_TARGET · τ, LAP_CEILING · τ_tol)`. It buys **one upgrade
level on each throughput axis** (`pacing.underbuyLevels` 1), and `pacing` reports the worst under-buy
lap at 186.3 s against the 200 s ceiling. **That is thin and I am not pretending otherwise**; the
fix is Balance's cost interleave, flagged below.

### Three results that repair other sheets rather than bill them

1. **Sheet `01`'s dead-spot failure was an artifact of assuming four identical areas.** It ran a
   greedy buyer over `4 × area.patchCount` at one footprint and found purchase deserts past its own
   90-second ceiling. Under depth growth the same gaps convert to a realised 18.6 to 30.5 s inside
   the eight areas and 42.0 s in an endless bay. **The desert was never a cost-curve fault; it was
   the cost of assuming depth does not exist.** `[cid: decided]`
2. **Density has room and is now an invariant rather than a hope.** `depths.invariants[6]` requires
   `patchCount / footprintStuds2` to be non-decreasing in ordinal and to **strictly increase at
   every depth step**, which is *"deeper areas are larger, denser"* `[brief: binding]` ←
   `[you chose: R3 Q2]` made mechanical. Its ceiling is the clear tick rate, not the geometry.
3. **Sheet `03`'s footprint ceiling is never binding and `04`'s band is.** `03` permits a much
   larger footprint at base throughput than the lap band does at any row. **Confirmed: the lap band
   is the tightest constraint on how large an area may be, at every depth.**

### The comparator, and why it cannot be used here

The closest shipping analogue of a completion-shaped lap runs from a few minutes to two or three
hours per job, with an early representative job at 30 to 45 minutes
`[research: https://earlyguides.com/powerwash-simulator/walkthrough]`, across 38 jobs and about 30
to 35 hours to complete every one
`[research: https://currently.att.yahoo.com/att/full-powerwash-simulator-2-mission-140000826.html]`.
Its jobs grow roughly **4× in duration** across the campaign. **It is the strongest available
evidence for the assumption I am overruling, and it does not transfer**: 4× of duration growth
requires a session that can absorb it, and `00-CORE.md` fixes 10 to 20 minutes, mobile, ages 8 to 14
`[brief: binding]` ← `[you chose: R1 Q4]`. The analogue confirms the *shape* of escalation and
inverts its *scale*.

```json
{
  "amends": "depths",
  "field": "escalation",
  "requestedBy": "cid/gameplay/core-loop/05-depth-escalation.md",
  "why": "depths carries sizingRule, footprintCeilingStuds2 and invariants 9 to 11 — the mechanism. It does not carry the ruling the mechanism realises, or the brief line the ruling overrules. A later sizing pass can satisfy every invariant and still deliver escalation as duration by moving LAP_TARGET, which is the one thing this sheet forbids.",
  "value": {
    "axis": "footprint and density",
    "notAxis": "duration",
    "lapWallClock": "flat across depth; never rising",
    "throughputVsAreaGrowth": "match. Not outpace, not lag.",
    "candidateCurvesTested": [
      { "curve": "match (flat lap)", "verdict": "taken; the design statement" },
      { "curve": "lag (rising lap)", "verdict": "rejected; 1.22x of band headroom over three depth steps is 6.9% each, imperceptible, and it spends the under-buy reservation" },
      { "curve": "outpace (falling lap)", "verdict": "rejected; makes the endgame the fastest part of the game and consumes authored areas fastest where they cost most to author" }
    ],
    "escalationBudgetSpent": "1.22x of lap-duration headroom is RESERVED for under-buy tolerance, not spent on escalation. pacing.underbuyLevels 1 is what it buys; the worst under-buy lap is 186.3 s against a 200 s ceiling.",
    "footprintGrowthRealised": "14400 to 57600 studs^2 across eight areas, 4.0x, at arrival laps of 153.1 to 164.0 s — a 7% spread",
    "densityRule": "non-decreasing in ordinal and strictly increasing at every depth step, per invariants[6]. This is the 'denser' half of the binding brief line, made mechanical.",
    "densityCeiling": "runtime.clearTickRate, via invariants[10]: patchCount <= lapSeconds / (2 * clearTickRate). Not the packing geometry, which permits far more.",
    "densityFloor": "pacing.tickGapMaxSeconds 3.0 — an area may not grow its footprint faster than its patch count",
    "throughputBoundedBy": "upgrades[].maxLevel and perLevel on the radius and speed axes only. value buys income and moves no term in the sweep model.",
    "footprintBoundedBy": "throughput, hence depths.footprintCeilingStuds2 73216 at any depth, forever",
    "nothingMayGateDepthOnThroughput": "a player who under-bought must still be ALLOWED into the deepest area and simply take longer. depths.unlockRule is previousAreaComplete and nothing else; this is the only reading under which 'a stuck player cannot exist' survives a flat lap.",
    "constantPerDepthRatioForbidden": "arrival throughput decelerates as the ladder empties, so a constant per-depth footprint ratio either overruns the ceiling late or shrinks the lap early. The sizing rule is a function of arrival throughput, not of the depth index.",
    "overrules": {
      "line": "Escalation - lap 1 vs lap 100: early areas are small and sparse, later areas are large and dense, so the binding constraint moves from tool power to time and patience",
      "source": "01-FOUNDATION.md",
      "tag": "[brief: soft] <- [I assumed - extrapolated from depth-based areas; not interviewed]",
      "keptVerbatim": "early areas are small and sparse, later areas are large and dense — made quantitatively true at 4.0x footprint and a strictly rising density",
      "overruled": "that the binding constraint moves to time and patience. It does not move at all; tool power binds for the whole specced game.",
      "reasons": ["the assumption is written for a game 25x longer than the one specced — 'lap 1 vs lap 100' against a four-depth ladder that closes at 24 of 24", "the budget does not exist: 1.22x over three steps is 6.9% each", "the headroom has a better use, and it is the brief's own requirement that a stuck player cannot exist"],
      "untouched": ["the loop's five steps", "the unit of progression", "permanence", "the three cuts", "areas, not zones", "depth is progression - deeper areas are larger, denser, and hide rarer sets"]
    }
  }
}
```

## Consequences for other work

- **Area authoring at depth** (`depths`) inherits a **formula, not a growth rate**, and it is
  already the shipped `sizingRule`. **A constant per-depth growth ratio is forbidden** in either
  direction.
- **`upgrades[].maxLevel` and `perLevel`** (Balance & Tuning) now carry the escalation budget: the
  whole game's footprint growth is the radius-times-speed ladder divided by its base. Lowering any
  `maxLevel`, or lowering `radius.perLevel` or `speed.perLevel`, shrinks every area at depth. Adding
  a fifth depth requires ladder headroom that must be proved, not assumed.
- **The offer ladder** (`products`) is bounded per row by `depths.areas[].maxRadiusProduct` — 1.27
  at row 2 is the tightest — because a radius multiplier shortens a lap toward `04`'s 75-second
  floor. That bound exists because the lap is flat; under a rising lap it would be looser late and
  tighter early.
- **Sheet `02`'s constant-magnitude ruling survives intact and is now load-bearing.** It forbade
  depth buying a larger cue; this ruling gives depth 4.0× the footprint and more than 4× the
  patches, so the clear cue fires **640 times in the deepest area against 140 in the first**. A cue
  merely tolerable at 140 repetitions is not automatically tolerable at 640.
- **Per-plot part count grows with footprint and density together** (Tech — Performance): the budget
  must be sized against the deepest area, not the first, times a 12-to-20 server.
- **The gating question** gains a constraint from the other side: because the lap holds flat while
  the area grows, **nothing may gate depth on throughput.**
- **Chunk authoring** (`layout`, with Theme & Narrative): 16 chunks at the deepest rows against 4 at
  the first, so the question of how many authored chunks a footprint needs before shuffling reads as
  repetition scales with this ruling and not with the depth count.

## Acceptance criteria

1. `npm run bridge` collects this sheet's `amends` block against `depths` and reports no problem;
   `depths` remains provided by exactly one sheet, `gameplay/meta/04-the-depth-ladder.md`.
2. `depths.invariants` contains all three of this sheet's checks — the 75–200 s lap band at arrival
   and one level behind, `patchCount <= lapSeconds / (2 · runtime.clearTickRate)`, and
   `footprintStuds2 <= footprintCeilingStuds2` — and all three hold for every one of the 8
   `depths.areas` rows.
3. `depths.areas[].footprintStuds2` is non-decreasing in ordinal and rises at least 3× from the
   first row to the last (14,400 to 57,600 is 4.0×), while the spread of
   `pacing.laps[].arrivalLapSeconds` across the same rows is at most 15% (today 153.1 to 164.0 is
   7%). **Escalation is in footprint and not in duration.**
4. `depths.areas[].patchCount / footprintStuds2` is non-decreasing in ordinal and strictly increases
   at every depth step, and `depths.unlockRule` conditions no area on any throughput, level, product
   or currency threshold.

## Pushing back

**Overruled:** `01-FOUNDATION.md`'s *"**Escalation — lap 1 vs lap 100:** early areas are small and
sparse, later areas are large and dense, so the binding constraint moves from **tool power** to
**time and patience**"* `[brief: soft]` ← `[I assumed — extrapolated from depth-based areas; not
interviewed]`. `OPEN.md §5 #2` names this domain as its inheritor.

**Half is kept and half is overruled.** Kept verbatim: *early areas are small and sparse, later
areas are large and dense*, now quantitatively true at 4.0× footprint and a strictly rising density.
**Overruled: that the binding constraint moves to time and patience.** It does not move at all.

Three reasons, in the order that decides it. **The assumption is written for a game 25× longer than
the one specced** — "lap 1 vs lap 100" against a four-depth ladder that closes at 24 of 24 is a
hundred-lap game reasoning about an eight-lap one, so its domain of validity is outside this
project. **The budget does not exist** — 1.22× over three steps is 6.9% each. **The headroom has a
better use, and it is the brief's own requirement** — *"a stuck player cannot exist"* is threatened
by an area sized for a player who spent well, because spending badly is the only remaining source of
player variance.

**What this does not overrule.** Nothing `[brief: binding]`. *"Depth is progression — deeper areas
are larger, denser, and hide rarer sets"* `[brief: binding]` ← `[you chose: R3 Q2]` is untouched and
satisfied. Only the *sensation* named for it changes, from patience to reach.

## Flagged to the developer

1. **Escalation is reach, not patience, and that is a change of feel you should see stated.**
   Alternatives: (a) flat lap with footprint escalation, taken here — the deepest area covers 4× the
   ground of the first and is cleared in about the same time, so getting deeper *feels like getting
   stronger*; (b) rising lap, the brief's assumption as written, which buys 6.9% per depth and
   spends the whole under-buy reservation; (c) falling lap, which makes the endgame the fastest part
   of the game. **Recommendation: (a).** It is the only one that both delivers a perceptible
   escalation and leaves a badly-spending player inside the band.
2. **The under-buy tolerance is one upgrade level and that is thin.** A player who buys `value`
   exclusively gains no throughput at all. Alternatives: (i) accept one level and let permanence
   absorb the rest as a two-session lap, taken here; (ii) have Balance interleave the cost ladders so
   the cheapest affordable purchase is *never* two consecutive `value` levels, forcing throughput
   growth structurally rather than hoping for it; (iii) lower the flat lap target, which widens
   tolerance and shortens every lap in the game. **Recommendation: (ii) alongside (i).** The shipped
   `costBase` values already produce the interleave by accident; nothing asserts it, and a single
   tuning pass could remove it silently.

## Not decided here

Every value: footprints, patch counts and `minSpacing` at any depth (`depths` for the shape, Balance
& Tuning for the figures), `upgrades[].maxLevel` / `perLevel` / `costBase` / `costGrowth`
(`solvency`), `collection.relicsPerArea` and `areasPerDepth` (Meta & Content), `routeSlack`,
`lapTargetSeconds` and `underbuyLevels` inside their stated ranges (`pacing`). How many authored
chunks a footprint needs before shuffling reads as repetition, and how chunks are themed by depth
(`layout`, with Theme & Narrative). What makes the next area available (`depths.unlockRule`).
Whether `tiers[].weight` shifts toward the rare end with depth (`tierMix`). The per-plot part budget
at the deepest area (Tech — Performance). How many payoff events a session contains (sheet `01`).
Payoff magnitudes (sheet `02`). Reveal placement (sheet `03`). Lap duration and session spanning
(sheet `04`). What the game is after 24/24 (`endgame`).
