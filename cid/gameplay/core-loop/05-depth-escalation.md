# 05 — Depth escalation

**Domain:** Core Loop · **Category:** Gameplay · **Wave:** 1

## Decision

**Clearing throughput must MATCH area growth: lap wall-clock holds flat across depth, never rises.**
Footprint is indexed to the throughput a player **arrives** at that depth with, not to the depth
index — `size(N)² = min(165 · τ(N), 200 · τ_tol(N)) / ROUTE_SLACK`. Escalation is delivered as
**footprint and density, never as duration.**

**Both growth curves are bounded (G5), by different mechanisms.** Throughput is hard-bounded at
**4.16× base** by `upgrades[].maxLevel` — finite levels, no rebirth to reset them, no fourth axis.
Footprint is bounded *by* throughput, hence bounded too: **270 studs square, forever, at any
depth**. Density is bounded above by `runtime.clearTickRate` and below by `01`'s three-second rule.

**The brief's escalation assumption is overruled.** Tool power, not time and patience, is the
binding constraint for the entire specced game. See `## Pushing back`.

**Core Loop owns no build-contract key, so this sheet carries no `manifest` block, and that is
correct rather than thin.** No Bash in this run, so instead of `npm run bridge -- --contract` I read
`SCHEMA` in `bridge/schema.mjs` directly: eleven keys — `area`, `tiers`, `upgrades`, `vocabulary`,
`currency`, `movement`, `patch`, `collection`, `onboarding`, `modules`, `runtime` — and every one
names another owner. There is no key for a growth curve. My output is the predicate block below,
sized for `game/test/config.spec.luau`.

## Why

### What the three inherited constraints actually add up to

| inherited | source | tag |
|---|---|---|
| lap wall-clock inside 75–200 s at every depth; depth 1 shipped at 164 s, leaving **1.21×** | `04-lap-vs-session` | `[cid: decided]` there |
| no 90 s stretch above a currency tick; the ladder's top rungs already produce 97–156 patch deserts = 113–182 s from lap 5 | `01-payoff-frequency` | `[cid: decided]` there |
| "early areas are small and sparse, later areas are large and dense, so the binding constraint moves from *tool power* to *time and patience*" | `01-FOUNDATION.md` | `[brief: soft]` ← `[I assumed — extrapolated; not interviewed]`, `OPEN.md §5 #2` names this domain |

**Two of the three hold at every depth. The third is the one that gives, and it gives at depth 2.**

### Arithmetic, not preference: there is no room for duration to escalate

`03-META.md` fixes the long-term objective at "complete all four sets / 24 of 24" `[brief: soft]` ←
`[you accepted: R6 Q3 → R5 Q3]`, and `gameplay/meta/02` buries one set per depth. **So the specced
game is four depths, which is three growth steps.** 04's remaining budget spread over three steps
is `1.21^(1/3)` = **6.6% per depth**. A lap 6.6% longer is not an escalation anybody can perceive;
it is inside the measurement error of a figure `OPEN.md §2` itself calls "the pacing number nobody
could source". `[cid: decided]` **Duration cannot carry the escalation read, so something else must,
and footprint can: 3.87× at shipped values.**

I also worked the two alternatives to flat, and this is what settled the word "match" rather than
argument. Sizing to a fixed level-count tolerance produces laps of 164 / 160 / 168 / 172 s (a mild
*lag*); sizing so a player one whole depth behind fits the ceiling produces 164 / 104 / 128 / 156 s
(*outpace*, and non-monotone). **All three candidate curves sit within ±5% of flat except the
depth-2 dip, and that dip is the one thing all three agree is wrong.** `[cid: decided]` So flat is
the design statement and the ±5% residue is Balance & Tuning's, not mine.

### Why the 1.21× is under-buy tolerance rather than escalation budget

`02-GAMEPLAY.md`: "**The only friction is the size of an area.** A large dense area takes time; that
is the entire difficulty curve" and "**A stuck player cannot exist**" `[brief: soft]` ←
`[you accepted: step 6 Q2]`. With no failure state, no tension, and one verb, **the only way a
player can be worse at this game is by spending badly** — and spending badly is easy, because the
cheapest axis buys income, not sweep rate. A player who puts everything into VALUE has
`τ` = base forever, and `upgrades[].perLevel` on `value` moves no term in the sweep model at all.

That variance **grows with depth**: the spread between a greedy buyer's arrival throughput and a
base player's is 1.00× at depth 1, 1.92× at depth 2, 3.00× at depth 3, 3.84× at depth 4. An area
sized to greedy arrival therefore carries more risk the deeper it sits. Spending the band headroom
on escalation would put a badly-spending player's lap past 200 s at exactly the depths where the
brief's own "a stuck player cannot exist" is hardest to honour. `[cid: decided]` **So the headroom
is reserved, and the reservation is what the `min(...)` second term in the decision is.**

At shipped values it buys **one upgrade level on each throughput axis**: depth 2 at exactly 200 s,
depth 3 at 196 s, depth 4 at 192 s. Two levels behind spills past the ceiling, which permanence
absorbs — 04 ratified session-spanning laps, so a badly-spending player takes two sittings over one
area rather than being stuck. **That is thin and I am not pretending otherwise**; the fix is
Balance's cost interleave, flagged below.

### Why the tolerance is tightest at depth 2, which nobody expected

One level is worth proportionally most when you hold few. At depth-2 arrival (radius 3, speed 2) one
level off each axis costs 24.7% of throughput, against 04's 21.2% of headroom — so **flat 165 s is
3% too long at depth 2 specifically**, and the tolerance term binds there while the lap target binds
at depths 3 and 4. `[cid: decided]` That is why the decision is a `min` of two terms rather than one
formula: both terms bind somewhere in a four-depth game.

### The forward recursion, which is the whole output

Not circular. Each depth's footprint depends only on arrival throughput, which depends only on the
laps already cleared, so it is a forward recursion over the greedy buyer `config.spec.luau` already
models. At shipped values, with density held at depth 1's `140/120²`:

| depth | throughput | size | patches | lap | s/clear | one level behind |
|---|---|---|---|---|---|---|
| 1 | 1.00× (176) | 120 | 140 | 164 s | 1.17 s | — (everyone arrives at base) |
| 2 | 1.92× (338) | 165 | 263 | 160 s | 0.61 s | 200 s |
| 3 | 3.00× (528) | 209 | 423 | 165 s | 0.39 s | 196 s |
| 4 | 3.84× (676) | 236 | 542 | 165 s | 0.30 s | 192 s |
| cap | 4.16× (732) | **270 max** | — | — | — | — |

**Depth 1 is untouched.** The shipped 120/140 already satisfies every predicate here, so nothing in
this sheet asks the running build to change.

### Three results that repair other sheets rather than bill them

1. **`01`'s dead-spot failure is repaired by depth, and it was an artifact of four identical areas.**
   `01` ran its greedy buyer over `4 × area.patchCount` and found 97–156 patch purchase deserts =
   113–182 s against its own 90 s ceiling, calling it "a stated failure rather than a caution".
   Those deserts are the same length **in patches** under my recursion, but seconds-per-clear falls
   from 1.17 s to 0.30 s as density-times-footprint grows, so the worst gap across all four depths is
   **47 s against the 90 s ceiling**. `[cid: decided]` The desert was never a cost-curve fault; it
   was the cost of assuming depth does not exist.
2. **Both terminal states land inside depth 4.** The ladder maxes at cumulative patch 1112 of 1368,
   about 53% of the final area; the collection completes on its last patch. `01` reported the ladder
   outliving the collection by four laps — that too was the four-identical-areas model, and depth
   growth funds the ladder 2.4× faster in laps. `[cid: decided]`
3. **`03`'s footprint ceiling is never binding and 04's band is.** `03` permits 471 studs square at
   base throughput; 04's band permits 133; mine permits 120→236 rising with throughput. Confirmed:
   **this sheet's rule is the tightest constraint on how large an area may be, at every depth.**

### The comparator, and why it cannot be used here

The closest shipping analogue of a completion-shaped lap runs from a few minutes to 2–3.5 hours per
job with an early representative job at 30–45 minutes
`[research: https://earlyguides.com/powerwash-simulator/walkthrough]`
`[research: https://currently.att.yahoo.com/att/full-powerwash-simulator-2-mission-140000826.html]`
(fetched in this domain's planning pass, recorded in `_lead.md`, not re-fetched here). Its jobs grow
by roughly **4× in duration** across a 38-job campaign on long desktop sittings. **It is the
strongest available evidence for the assumption I am overruling, and it does not transfer**: 4× of
duration growth requires a session that can absorb it, and `00-CORE.md` fixes 10–20 minutes, mobile,
ages 8–14 `[brief: binding]` ← `[you chose: R1 Q4]`. The analogue confirms the *shape* of escalation
and inverts its *scale*, which is exactly what `_lead.md` predicted it would do.

## The requirement, as a predicate

Pasteable into `game/test/config.spec.luau` **after** the payoff-cadence block from
`gameplay/core-loop/01`. It re-declares `ROUTE_SLACK` deliberately — `01`'s copy is scoped to a lap
at depth 1 and this one walks four — and it is the only figure here it shares.

```luau
print("\n-- depth escalation (gameplay/core-loop/05) --")

local ROUTE_SLACK = 2.0       -- core-loop/01, [playtest unknown] 1.5-3.0
local LAP_TARGET = 165        -- core-loop/04, [playtest unknown] 120-200
local LAP_CEILING = 200       -- core-loop/04, upper band edge
local LAP_FLOOR = 75          -- core-loop/04, lower band edge
local UNDERBUY_LEVELS = 1     -- [playtest unknown] test range 1-3. Levels behind
                              -- greedy arrival, per throughput axis, that must
                              -- still finish an area inside LAP_CEILING.

local perLevelOf = {}
local maxLevelOf = {}
for _, u in ipairs(GC.Upgrades) do
	perLevelOf[u.id], maxLevelOf[u.id] = u.perLevel, u.maxLevel
end

-- Only radius and speed move the sweep. `value` buys income, which is exactly why a
-- player can spend everything and gain no throughput at all.
local function swept(rLevels, sLevels)
	return 2 * (GC.BaseClearRadius + rLevels * perLevelOf.radius)
	         * (GC.BaseWalkSpeed + sLevels * perLevelOf.speed)
end

local sweptBase = swept(0, 0)
local sweptCap = swept(maxLevelOf.radius, maxLevelOf.speed)
local maxSide = math.sqrt(LAP_CEILING * sweptCap / ROUTE_SLACK)
print(string.format("  throughput %.0f -> %.0f studs^2/s (%.2fx), hard-bounded by maxLevel",
	sweptBase, sweptCap, sweptCap / sweptBase))
print(string.format("  footprint ceiling %.0f studs square, at any depth, forever", maxSide))
check(GC.Area.size <= maxSide, "every authored area is inside the permanent footprint ceiling")

local density = GC.Area.patchCount / (GC.Area.size ^ 2)
local weightSum = 0
for _, t in ipairs(GC.Tiers) do weightSum += t.weight end
local perPatch = 0
for _, t in ipairs(GC.Tiers) do perPatch += (t.weight / weightSum) * t.value end

local lv = { value = 0, radius = 0, speed = 0 }
local purse, secondsSinceBuy, worstGap = 0, 0, 0
local vUp = GC.Upgrades[1]
local depths = #GC.RelicSets
local arrivalDeepest = sweptBase

for depth = 1, depths do
	local tp = swept(lv.radius, lv.speed)
	arrivalDeepest = tp

	-- MATCH: the lap holds flat, so footprint tracks arrival throughput -- capped by
	-- the footprint an under-buying player can still finish inside the ceiling.
	local tol = swept(math.max(0, lv.radius - UNDERBUY_LEVELS), math.max(0, lv.speed - UNDERBUY_LEVELS))
	local area2 = math.min(LAP_TARGET * tp, LAP_CEILING * tol) / ROUTE_SLACK
	local side = (depth == 1) and GC.Area.size or math.sqrt(area2)
	local patches = (depth == 1) and GC.Area.patchCount or math.floor(density * side ^ 2)
	local lapSeconds = (side ^ 2) / tp * ROUTE_SLACK
	local secondsPerPatch = lapSeconds / patches

	print(string.format("  depth %d: %.0f studs, %d patches, %.2fx throughput, lap %.0fs, %.2fs/clear, %.0fs one level behind",
		depth, side, patches, tp / sweptBase, lapSeconds, secondsPerPatch, (side ^ 2) / tol * ROUTE_SLACK))

	check(lapSeconds >= LAP_FLOOR and lapSeconds <= LAP_CEILING,
		string.format("depth %d's lap holds inside core-loop/04's 75-200s band", depth))
	check(secondsPerPatch <= 3.0,
		string.format("depth %d holds core-loop/01's density floor -- a clear at least every 3s", depth))
	check(patches <= lapSeconds / (2 * GC.ClearTickRate),
		string.format("depth %d averages at most one clear per two clear ticks, so the tick channel does not saturate", depth))
	if depth > 1 then
		check((side ^ 2) / tol * ROUTE_SLACK <= LAP_CEILING,
			string.format("depth %d still finishes inside the ceiling %d level(s) behind greedy arrival", depth, UNDERBUY_LEVELS))
	end

	for _ = 1, patches do
		purse += perPatch * (1 + vUp.perLevel * lv.value)
		secondsSinceBuy += secondsPerPatch
		while true do
			local best, bestCost = nil, math.huge
			for _, u in ipairs(GC.Upgrades) do
				if lv[u.id] < u.maxLevel then
					local c = GC.upgradeCost(u, lv[u.id])
					if c <= purse and c < bestCost then best, bestCost = u, c end
				end
			end
			if not best then break end
			purse -= bestCost
			lv[best.id] += 1
			worstGap = math.max(worstGap, secondsSinceBuy)
			secondsSinceBuy = 0
		end
	end
end

-- The ruling on OPEN.md 5 #2. If the ladder is already maxed when the deepest depth
-- opens, tool power has stopped being the binding constraint, there is nothing left to
-- buy footprint growth with, and escalation dies before the content does.
print(string.format("  arrival at depth %d is %.2fx against a %.2fx cap",
	depths, arrivalDeepest / sweptBase, sweptCap / sweptBase))
check(arrivalDeepest < sweptCap,
	"throughput is still growing when the deepest depth opens, so tool power stays the binding constraint")
check(worstGap <= 90,
	"no 90s above-tick gap survives depth escalation -- core-loop/01's post-lap-4 deserts close as density rises")
```

At the shipped manifest: throughput 176 → 732 (4.16×), footprint ceiling 270 studs, the four-row
depth table above, arrival 3.84× against 4.16×, worst above-tick gap 47 s. Every `check` passes and
the file still exits `PASS`.

## Consequences for other work

- **Area authoring by depth** [currently Meta & Content] inherits a **formula, not a growth rate**.
  `size(N)² = min(165·τ(N), 200·τ_tol(N)) / ROUTE_SLACK`, with `τ(N)` the greedy buyer's arrival
  throughput. **A constant per-depth growth ratio is forbidden** in either direction: throughput
  grows 1.92× / 1.56× / 1.28× per step, decelerating, so a constant ratio either overruns the
  ceiling late or shrinks the lap at depth 2. At shipped values the sizes are 165, 209, 236 studs and
  the patch counts 263, 423, 542.
- **`upgrades[].maxLevel` and `perLevel`** [Balance & Tuning] now carry the escalation budget. The
  whole game's footprint growth is `2·(baseClearRadius + radius.maxLevel·perLevel)·(baseWalkSpeed +
  speed.maxLevel·perLevel)` divided by its base, and **at shipped values depth-4 arrival is 3.84× of
  a 4.16× cap — 92% spent.** Lowering any `maxLevel`, lowering `radius.perLevel` or
  `speed.perLevel`, or adding a fifth depth fails the arrival-under-cap check. Note also that
  **`speed` is already maxed at depth-4 arrival**, so one of the three axes dies before the last
  depth opens.
- **04's collection restructure and this escalation curve compete for the same budget, and nobody has
  noticed.** 04 recommends dropping `collection.relicsPerArea` and raising `areasPerDepth` to about
  15 so the collection outlasts one session. At 15 areas per depth the ladder maxes inside **depth
  1**, arrival at depths 2–4 is all 4.16×, and every one of those areas is the same 246 studs at the
  same lap. **"Deeper areas are larger" becomes false from depth 2 onward**, leaving only density,
  which has 17% of room. The two fixes are `upgrades[].maxLevel` rising so the ladder outlasts the
  collection [Balance & Tuning], or fewer areas per depth [Meta & Content]. **The predicate above is
  the instrument that catches this**, and it will fail loudly rather than be argued about.
- **`collection.areasPerDepth` is in `SCHEMA` but is not emitted to `GameConfig.luau`**
  [build-contract definition, currently tech/architecture]. My predicate therefore cannot see the
  value 04's recommendation changes, and walks `#GC.RelicSets` assuming one area per depth. Emit it,
  or the check above silently tests the wrong world the day `areasPerDepth` moves.
- **Density is nearly pinned, and this reverses an expectation** [Meta & Content, with
  tech/architecture for `runtime.clearTickRate`]. Density must be **non-decreasing** (01's 3 s rule)
  and is capped by the tick rate at `lapSeconds / (2 · clearTickRate)` = 687 patches. Depth 4 at
  constant density is 542, so **"later areas are denser" has only 1.27× of room once "larger" has
  taken the throughput.** The packing check in `area.check` permits 1182 at that size, so the binding
  ceiling is the tick rate, not the geometry.
- **Per-plot part count grows 3.9×** [Tech — Performance]. `gameplay/meta/01` hands over 140 anchored
  parts per plot as "its budget floor"; depth 4 is 542 at constant density and up to 687 at the
  density ceiling, times a 12–20 server. That budget must be sized against the deepest area, not the
  shipped one.
- **`01`'s worst-case purchase desert is superseded, and I am naming it rather than editing it.** Its
  97–156 patch figures and its 113–182 s conversion were computed against `4 × area.patchCount`
  identical areas. Under depth growth the same gaps convert to 38–47 s. Its 90 s ceiling holds
  everywhere, and its "stated failure" is contingent on depth 2+ not existing.
- **`02`'s constant-magnitude ruling survives intact and is now load-bearing.** It forbade depth
  buying a larger cue; my ruling gives depth 3.87× the footprint and 3.87× the patches, so the clear
  cue fires **542 times in the final area against 140 in the first** [Audio — SFX, Mechanics — feel].
  A cue that is merely tolerable at 140 repetitions is not automatically tolerable at 542.
- **The gating question** [currently Meta & Content, `OPEN.md §5 #3`] gains a constraint from the
  other side: because the lap holds flat while the area grows, **nothing may gate depth on
  throughput**. A player who under-bought must still be *allowed* into depth 4 and simply take
  longer, which is the only reading under which "a stuck player cannot exist" survives my ruling.
- **The terminal state now has a date and a place** [currently Meta & Content, *what content exists
  past collection completion*]. `01` established that it exists, `04` dated it at minute 11 of
  session 1; this sheet puts both terminal events **inside depth 4** — the ladder maxed at 53% of the
  final area, 24/24 at its last patch. **There is no late game after depth 4 for anything to be the
  binding constraint of.** I invent no content.

## Acceptance criteria

1. `game/test/config.spec.luau` gains a depth-escalation section that walks `#collection.sets`
   depths, sizes each depth past the first from the greedy buyer's arrival throughput, and asserts
   arrival throughput at the deepest depth is strictly below
   `2·(baseClearRadius + radius.maxLevel·perLevel)·(baseWalkSpeed + speed.maxLevel·perLevel)`. It
   passes at the shipped manifest at 3.84× against 4.16×, and the file still exits `PASS`.
2. The same section asserts, for every depth, all three of: lap seconds inside 75–200; seconds per
   clear at most 3.0; patch count at most `lapSeconds / (2 · runtime.clearTickRate)`. All pass, and
   the printed depth table reads 120/140, 165/263, 209/423, 236/542 studs/patches at laps 164, 160,
   165, 165 s.
3. The same section asserts that at every depth past the first, a player one level behind greedy
   arrival on both throughput axes finishes inside 200 s — printing 200, 196, 192 — and that the
   worst gap between consecutive upgrade purchases across all four depths, in seconds, is at most 90.
   It passes at 47 s.
4. `area.size` is asserted at most `sqrt(200 · sweptCap / ROUTE_SLACK)`, which evaluates to 270 studs
   at the shipped manifest, and the shipped 120 passes. No `area` sheet at any depth may exceed that
   figure.

## Pushing back

**Overruled:** `01-FOUNDATION.md`'s "**Escalation — lap 1 vs lap 100:** early areas are small and
sparse, later areas are large and dense, so the binding constraint moves from *tool power* to *time
and patience*" `[brief: soft]` ← `[I assumed — extrapolated from depth-based areas; not
interviewed]`. `OPEN.md §5 #2` names this domain as its inheritor and `cid/gameplay/_category.md`
calls it "the one place in your domain where you can overrule the brief with a reason".

**Half of it is kept and half is overruled.** Kept verbatim: *early areas are small and sparse,
later areas are large and dense.* My ruling makes that quantitatively true — 3.87× the footprint,
3.87× the patches, from 120 to 236 studs. **Overruled: that the binding constraint moves to time and
patience.** It does not move at all. Tool power binds for the whole specced game, and at depth-4
arrival it is 3.84× of a 4.16× cap with the entire content behind it.

**Three reasons, in the order that decides it:**

1. **The assumption is written for a game 25× longer than the one specced.** "Lap 1 vs lap 100"
   against four depths and a collection that closes at 24/24 is a hundred-lap game reasoning about a
   four-lap one. Its domain of validity is outside this project. That is the cleanest reason, and it
   is not a claim the assumption is wrong in principle.
2. **The budget does not exist.** Depth 1 ships at 82% of 04's ceiling, so 1.21× remains for three
   steps — 6.6% each. Nothing can be "the binding constraint" at 6.6% per step.
3. **The headroom has a better use, and it is the brief's own requirement.** "A stuck player cannot
   exist" and "the only friction is the size of an area" `[brief: soft]` ←
   `[you accepted: step 6 Q2]` are both threatened by an area sized for a player who spent well,
   because spending badly is the only remaining source of player variance. Spending the 1.21× on
   escalation puts a badly-spending player past the ceiling at every depth.

**What this does not overrule.** Nothing `[brief: binding]`. The loop's five steps, the unit of
progression, permanence, the three cuts, "areas, not zones", and "depth is progression — deeper
areas are larger, denser, and hide rarer sets" `[brief: binding]` ← `[you chose: R3 Q2]` +
`[you chose: R5 Q1]` are all untouched and all satisfied: depth remains progression, and deeper
areas remain larger and denser. Only the *sensation* named for it changes, from patience to reach.

## Flagged to the developer

1. **Escalation is reach, not patience, and that is a change of feel you should see stated.** Live
   alternatives: (a) flat lap, footprint escalation, taken here — the deepest area covers 3.9× the
   ground of the first and is cleared in the same 165 seconds, so getting deeper *feels like getting
   stronger*; (b) rising lap, which is the brief's assumption as written and buys 6.6% per depth,
   imperceptible, and spends the whole ceiling headroom; (c) falling lap, which makes the endgame the
   fastest part of the game and consumes authored areas fastest exactly where they are most expensive
   to author. **Recommendation: (a).** It is the only one of the three that both delivers a
   perceptible escalation and leaves a badly-spending player inside the band.
2. **The under-buy tolerance is one upgrade level and that is thin.** A player who buys VALUE
   exclusively gains no throughput at all, and at depth 4 they would need 633 seconds for one area.
   Alternatives: (i) accept one level of tolerance and let permanence absorb the rest as a
   two-session lap, taken here; (ii) have Balance & Tuning interleave the cost ladders so the
   cheapest affordable purchase is *never* two consecutive `value` levels, which forces throughput
   growth structurally rather than hoping for it; (iii) lower the flat lap target below 165 s, which
   widens tolerance and shortens every lap in the game. **Recommendation: (ii) alongside (i).** The
   shipped `costBase` values 25 / 40 / 60 already produce the interleave by accident; nothing asserts
   it, and a single tuning pass on `value.costBase` could remove it silently.
3. **04's collection fix and this escalation curve cannot both be paid for.** If `areasPerDepth`
   rises to about 15 so the collection outlasts one session, the ladder maxes inside depth 1 and
   depths 2 to 4 are identical in size and duration. Alternatives: (i) raise `upgrades[].maxLevel` so
   the ladder outlasts the collection at the new lap count; (ii) fewer areas per depth and accept
   04's short collection; (iii) accept that footprint escalation stops at depth 2 and only density
   moves after that. **Recommendation: (i).** It is the only one that keeps both sheets' rulings, and
   it is a change to three integers in one manifest key.

## Not decided here

Every value: `area.size`, `patchCount` and `minSpacing` at any depth (Meta & Content for the shape,
then Balance & Tuning for the figures), `upgrades[].maxLevel` / `perLevel` / `costBase` /
`costGrowth` (Balance & Tuning), `collection.relicsPerArea` and `areasPerDepth` (Meta & Content),
`ROUTE_SLACK`, `LAP_TARGET` and `UNDERBUY_LEVELS` inside their stated ranges (Balance & Tuning,
instrumented as `OPEN.md §2` measurement item 2). How many authored chunks a 236-stud area needs
before shuffling reads as repetition, and how chunks are themed by depth (Meta & Content, with Theme
& Narrative). What makes the next depth available (Meta & Content, the gating question). Per-depth
discovery rates and whether `tiers[].weight` shifts toward the rare end with depth (Meta & Content,
then Balance & Tuning). The per-plot part budget at the deepest area (Tech — Performance). How many
payoff events a session contains and the maximum gap between them (`01`). Payoff magnitudes and
whether area and set completion stack (`02`). Reveal placement (`03`). Lap duration and session
spanning (`04`). What the game is after 24/24 (Meta & Content). Whether the contract should emit
`collection.areasPerDepth` to `GameConfig` and grow a `pacing` key (build-contract definition,
currently tech/architecture; G11).
