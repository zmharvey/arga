# 01 — Foundation

**Layer 1 — foundation.** Everything else in the game is downstream of this sheet. Anyone
working on theme, fiction, tone or the loop creates *within* these constraints; the names,
the copy and the tuning are theirs to invent.

## Theme / fantasy

**An overgrown ruin being reclaimed.** Cut back vines and moss from ancient stone.
[you accepted: R2 Q3]

Chosen for **mechanical fit rather than novelty**: clearing *is* revealing, so the core loop
and the differentiating hook are the same physical action. That property is why this beat
cobwebs-in-a-mansion, volcanic ash, and rust-on-machines — all of which fit less cleanly,
and the last of which is object-scale rather than area-scale.

What the direction fixes:

- **Clearing and discovering are one action.** Do not design them as separate systems.
- **Depth is the progression read** — further in means denser overgrowth and rarer finds.
- **Tone: warm, aged, unhurried.** Not spooky, not grim, not a power fantasy.
- **Rarity ladder lives in the overgrowth**, not in a separate drop table.
  [I assumed — carried from the reference's model; not interviewed]

**The noun is a vehicle, not the differentiator.** [you chose: R1 Q1] Research established
the noun cannot distinguish anything here — at least two studios ship `X Incremental` with a
shared marketing sentence, and nouns are consumed faster than a game can ship.
[research: `research/landscape.md`]

Left open — the ruin's identity and history, who the player is, what the four sets of relics
mean, the names of everything. *[currently: Theme & Narrative]*

## Core loop

**Interviewed directly this run across four questions** — R1 Q2, R2 Q1, R2 Q2, R3 Q1. The
previous run inherited it from the reference without ever asking, which is how it ended up
with a lap length off by more than an order of magnitude.

| # | player action | produces |
|---|---|---|
| 1 | move through overgrowth; it clears on contact | currency, scaled by the overgrowth's tier |
| 2 | keep clearing until the **area is completely clear** | every buried object in it, revealed |
| 3 | revealed objects enter the permanent collection | set progress; a completed set grants a permanent bonus |
| 4 | spend currency on clearing-speed upgrades | faster clearing of the next area |
| 5 | move to a deeper area | denser overgrowth, rarer relics |

**A lap is finishing a space, not hitting a number.** [you chose: R1 Q2] Alternatives
declined: farm-until-threshold (the reference's shape), one-find-per-lap, and two
interleaved loops.

**How it closes:** faster tools from step 4 make the next area's completion reachable, and
deeper areas hide the sets that are still incomplete. The collection is the thing that
persists across laps.

**Cleared is permanent — overgrowth never returns.** [you chose: R2 Q1] This is the payoff
and it is load-bearing. Slow regrowth and decay-if-you-leave were both offered and declined.

**Two systems were cut as consequences, not oversights:**

- **No rebirth.** [you chose: R2 Q2] Areas *are* the progression. Genre-literate players
  will notice its absence; `Leaves Incremental` also ships without it, so there is
  precedent. [research: `research/landscape.md`] Reframing it as "seasons" and making it
  optional were both declined.
- **No offline accumulation.** Nothing regrows, so nothing can accrue while away. Follows
  directly from permanence.

**Escalation — lap 1 vs lap 100:** early areas are small and sparse, later areas are large
and dense, so the binding constraint moves from *tool power* to *time and patience*.
[I assumed — extrapolated from depth-based areas; not interviewed]

**Lap length: unknown, and deliberately so.** The reference's pacing could not be verified
across three source types — one 405'd, one gave a level gate rather than a duration, and
that same guide is probably describing the sibling game. [research:
`research/grass-incremental.md`] **This design's lap is an area, not a rebirth cycle, so the
reference's number would not have transferred anyway.**

Left open — how long an area should take, the cost curve on clearing upgrades, how density
scales with depth, and where the pacing dead-spots are. *[currently: Core Loop]*

## The divergence, stated plainly

This began as "keep the skeleton, it's cheap to build" and is no longer that.
**Three of the reference's seven systems are gone** — rebirth, offline accrual, and
farm-until-threshold progression. The drift was surfaced mid-interview and **accepted
deliberately**: *"it's a better game now."* [you chose: R3 Q1]

**Consequence: the "cheap to build" rationale no longer holds.** Area-completion detection
and chunk-shuffling are both new work the reference does not have. Anyone estimating this
should not use the reference as a cost proxy.
