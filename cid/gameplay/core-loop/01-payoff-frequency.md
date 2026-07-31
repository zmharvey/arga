# 01 — Payoff frequency

**Domain:** Core Loop · **Category:** Gameplay · **Wave:** 1

## Decision

**Two gap ceilings, and every count in this sheet is one of them integrated over the session.**
A moving player is paid **at least once every 3 seconds**. Between two consecutive payoffs
**above a currency tick** (Find reveal, upgrade purchase, area completion, set completion) no
more than **90 seconds** may pass. A dead-spot is exactly a violation of either.

Integrated over the bound session that `00-CORE.md` fixes at 10 to 20 minutes, that is the
budget:

| kind | floor session (10 min) | ceiling session (20 min) | role |
|---|---|---|---|
| currency tick | **≥ 200** | ≥ 400 | texture; the only continuous channel |
| above-tick, any kind | **≥ 6** | ≥ 13 | beats and peaks |
| of which Find reveal | **≥ 1** | ≥ 1 | the brief's own session objective |
| of which upgrade purchase | **≥ 1** | ≥ 1 | the loop's fourth step, felt |
| area completion | 0 or more | 0 or more | may fall in another session |
| set completion | 0 or more | 0 or more | only four ever exist |

Mid-area spend is **ratified as continuous** (G10). The 24/24 degradation is stated below and
nothing is invented to fill it (G8).

**Core Loop owns no build-contract key.** I read `SCHEMA` in `bridge/schema.mjs`: payout values
are `tiers` (Systems), cost curves are `upgrades` (Balance), extent and patch count are `area`
(Meta). **So this sheet carries no `manifest` block, deliberately.** Its output is the predicate
block below, sized to be pasted into `game/test/config.spec.luau`, which is the only instrument
that can hold a pacing requirement.

## Why

**The brief has no payoff-frequency statement of any kind.** `[cid: decided]` It never says how
often anything lands, in any unit. What it does fix, and what every number here is derived
against:

- "10–20 minute active sessions", "8–14, mobile-heavy" `[brief: binding]` ← `[you chose: R1 Q4]`
  (`00-CORE.md`). This is the denominator.
- Session objective "find at least one new relic", with "collection count rose this session" as
  the measurable, plus "discovery rates must be generous enough that a typical session yields at
  least one find, or the stated session objective silently fails. **This is the highest-risk
  tuning in the game**" `[brief: binding]` as a stated risk (`03-META.md`). **One find per
  session is a floor the brief already set**, so I do not get to choose whether it is in the
  budget, only how much headroom it gets.
- "Zero tension is deliberate … **Consequence: audio and visual feedback carry the entire
  load**" `[brief: soft]` ← `[you accepted: step 6 Q2]` (`02-GAMEPLAY.md`). This is why the
  tick ceiling exists at all. In a game with no timer, no hazard and no failure, the clear cue
  is the *only* thing telling a player the game is running. A silence is not neutral here; it is
  the absence of the entire feedback system.
- "**A lap is finishing a space, not hitting a number**" `[brief: binding]` ←
  `[you chose: R1 Q2]`. So no count in this sheet is a quota the player is working toward. These
  are floors on what the game owes the player, never targets shown to the player.

### The throughput is derivable now, so nothing here is estimated

The brief calls per-area time "the pacing number nobody could source" (`OPEN.md §2`). It is
still unsourced and it is no longer unknown: the shipped manifest determines it. A
boustrophedon sweep at base stats has to pass the whole area through a swath the width of the
clear diameter.

```
sweptPerSecond = 2 * movement.baseClearRadius * movement.baseWalkSpeed
               = 2 * 5.5 * 16                              = 176 studs²/s
lapSeconds     = area.size² / sweptPerSecond * ROUTE_SLACK
               = 14400 / 176 * 2.0                         = 164 s
secondsPerPatch= lapSeconds / area.patchCount
               = 164 / 140                                 = 1.17 s
```

`ROUTE_SLACK` 2.0 is the one invented figure and it stands for the fact that nobody plays an
optimal lawnmower route on a phone. `[playtest unknown]` test range 1.5 to 3.0. Everything else
is manifest arithmetic. Two cross-checks: `runtime.clearTickRate` 0.12 s at speed 16 advances
1.9 studs per tick, well under the 5.5-stud radius, so tick granularity skips no patch; and
`area.patchCount` 140 in 120² gives a 10-stud patch pitch against an 11-stud swath, so one
sweep lane collects roughly one row of patches, which is what makes the coverage model the
right one rather than a travelling-salesman one.

At those values one depth-1 lap delivers **140 ticks, 6 Find reveals, 1 area completion, 1 set
completion and about 10 upgrade purchases: 18 above-tick payoffs in 164 seconds.** That is one
tick per 1.17 s and one above-tick payoff per 9.1 s, which clears both ceilings by 2.6x and
9.9x. `[cid: decided]` **The shipped values are not rate-starved. They are supply-starved**, and
that distinction is the most load-bearing thing in this sheet, because it points the fix at
`area` rather than at `tiers` or `upgrades`.

### Where 3 seconds comes from

The modelled figure is 1.17 s, so 3 s is a 2.5x tolerance over what the manifest already
produces. It is not slack for its own sake: it is the amount by which a future area may become
larger and sparser before the tick channel goes quiet, and it converts directly into a density
floor that binds every area anyone authors later. `[playtest unknown]` test range 2 to 5 s.
Below 2 s the rule forbids an area from ever being sparse; above 5 s a player can walk five
seconds of a relaxation game hearing nothing, which is the one thing zero tension cannot
absorb.

### Where 90 seconds comes from

Derived to cut exactly between the gaps the shipped ladder produces and the deserts it
produces. Running the greedy buyer already in `config.spec.luau` out to four laps by hand, the
purchase gaps are 7, 9, 7, 12, 9, 11, 16, 15, 16, 23, 23, 26, 31, 38, 41, 46, 62, 65, 66
patches. The worst inside four laps is **66 patches = 77 modelled seconds**. From lap 5 onward,
where the ladder's top rungs cost 1073 to 2010 against an income of about 11 per patch, the
gaps become **97, 95, 96, 143 and 156 patches = 113 to 182 seconds**. A ceiling of 90 s clears
every ordinary gap and catches every desert. 120 s would miss the 97-patch one; 60 s would flag
the perfectly ordinary 62-, 65- and 66-patch ones at 72 to 77 s. `[playtest unknown]` test range
60 to 120 s. 90 s is also 15% of the floor session, which is why the above-tick count comes out
at 6: a 600-second session cannot contain more than six 90-second gaps.

**One caveat on that 77 s figure, and it eats most of the margin.** The test's income model is
fractional; the shipped server floors each payout
(`math.max(1, math.floor(patch.value * payoutMultiplier))`), which costs 4 to 8% of real income
depending on value level. The true worst gap inside four laps is therefore nearer 71 patches and
83 seconds against a 90-second ceiling, a margin of about 8%. Stated so nobody reads 77 as
comfortable.

### Ratifying continuous mid-area spend (G10)

The shipped build accepts `BuyUpgrade` at any time. **Ratified, and the 90-second rule is what
forces it.** `[cid: decided]` If spend were gated to an area boundary, the 10 purchases a
depth-1 lap funds would collapse into a single instant at the end, leaving one 164-second
stretch containing nothing but ticks and reveals, which violates the rule outright. Boundary
spend would also mean an upgrade never affects the lap that paid for it, so the loop's step-4 to
step-1 closure, which `01-FOUNDATION.md` states as "faster tools from step 4 make the next
area's completion reachable" `[brief: binding]`, would be invisible inside a lap. The cost of
ratifying is real and is named as a consequence: with movement-only input `[brief: soft]` ←
`[you accepted: step 6 Q3]`, buying means standing still, so purchase must not additionally
require travel.

### Run 1 (G9)

**Run 1 needs no separate cadence, and that is a finding rather than a shrug.**
`[cid: decided]` `gameplay/onboarding/01` places the first Find deterministically at the patch
nearest spawn, so the reveal kind fires on patch 1, inside the ten seconds
`02-GAMEPLAY.md` promises `[brief: soft]` ← `[you accepted: R6 Q3]`. The remaining requirement
is that the *purchase* kind also appears early, because it is the only payoff kind a new player
would otherwise not meet for minutes: the cheapest `costBase` must be affordable inside a tenth
of a lap. At shipped values that is 25 against 51.5, reached at patch 7, about 8 seconds in. All
three recurring kinds therefore land inside the first 20 seconds without anyone choreographing
them. Beat sequencing past that is *first-session sequencing work* and stays with Onboarding.

### How the budget degrades (G8), with nothing invented to fill it

The above-tick kinds are finite in two different ways, and the terminal state breaks this
sheet's own rule.

| player state | above-tick kinds alive | worst gap | verdict |
|---|---|---|---|
| collection incomplete, ladder unmaxed | 4 | 83 s | inside the rule |
| 24/24, ladder unmaxed | 2 (purchase, area completion) | 83 s | inside the rule |
| ladder maxed, collection incomplete | 3 (reveal, area, set) | one lap between reveals worst case | at the edge |
| **both complete** | **1 (area completion)** | **one whole lap, 164 s and rising with depth** | **violates it** |

At shipped values the collection completes around lap 4 and the ladder completes around lap 8,
so the terminal state is reachable and permanent. **No rearrangement of frequency fixes it**:
with one above-tick kind firing once per lap, and laps getting longer with depth, the gap can
only grow. This is the cadence face of the hole the brief left, and the answer is content that
does not exist. It belongs to *what content exists past collection completion* [currently Meta &
Content]. I invent none.

### The comparator, used only for lap shape

In the closest shipping analogue of a completion-shaped lap, an early small job runs "30-45
minutes" and a later one "1-2 hours solo", across 38 jobs and "around 30-35 hours to complete
every job", with partial progress persisting mid-job.
`[research: https://earlyguides.com/powerwash-simulator/walkthrough]`
`[research: https://currently.att.yahoo.com/att/full-powerwash-simulator-2-mission-140000826.html]`
(fetched in this domain's planning pass, not re-fetched here). Its *smallest* early lap is 1.5x
this game's entire bound session, and it survives that only because its audience sits down for
long desktop sessions. This game's derived depth-1 lap is 2.7 minutes. **The analogue confirms
the shape and inverts the scale**, which is the second independent reason to read the shipped
slice as under-supplied rather than mis-rated.

## The requirement, as a predicate

Pasteable into `game/test/config.spec.luau` after its `-- is the economy reachable? --` block,
which already defines `GC`, `check` and `perPatchBase`.

```luau
print("\n-- payoff cadence (gameplay/core-loop/01) --")

-- A boustrophedon sweep at base stats: the whole area passes through a swath the
-- width of the clear diameter. ROUTE_SLACK is the only invented number here and
-- stands for nobody playing an optimal lawnmower route on a phone.
local ROUTE_SLACK = 2.0 -- [playtest unknown] test range 1.5 - 3.0
local sweptPerSecond = 2 * GC.BaseClearRadius * GC.BaseWalkSpeed
local lapSeconds = (GC.Area.size ^ 2) / sweptPerSecond * ROUTE_SLACK
local secondsPerPatch = lapSeconds / GC.Area.patchCount
print(string.format("  modelled lap %.0fs; one clear every %.2fs", lapSeconds, secondsPerPatch))

-- Texture. With zero tension the clear cue is the only continuous feedback there is.
check(secondsPerPatch <= 3.0, "a moving player is paid at least once every 3s")

-- Peaks. Frequent enough that a quarter-lap session still finds something; rare
-- enough that a reveal does not decay into texture.
check(GC.RelicsPerArea >= 4, "a session clearing a quarter of an area yields a Find at the median")
check(GC.Area.patchCount / GC.RelicsPerArea * secondsPerPatch >= 15, "Finds average 15s or more apart, so a reveal stays a peak")

-- Run 1: the spend half of the loop is reachable inside a tenth of a lap.
local cheapestFirst = math.huge
for _, u in ipairs(GC.Upgrades) do cheapestFirst = math.min(cheapestFirst, u.costBase) end
check(cheapestFirst <= perPatchBase * GC.Area.patchCount / 10, "the first upgrade is affordable inside a tenth of a lap")

-- Beats, generalised past one area. Four laps because collection.sets defines four
-- depths; this is what "bought >= 5" and "levels.value >= 2" become when the ladder
-- is funded by four laps instead of one.
local lv = { value = 0, radius = 0, speed = 0 }
local purse, lastBuyAt, worstGap = 0, 0, 0
local buysInLap = { 0, 0, 0, 0 }
local vUp = GC.Upgrades[1]
for patch = 1, 4 * GC.Area.patchCount do
	purse += perPatchBase * (1 + vUp.perLevel * lv.value)
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
		worstGap = math.max(worstGap, patch - lastBuyAt)
		lastBuyAt = patch
		buysInLap[math.ceil(patch / GC.Area.patchCount)] += 1
	end
end
print(string.format("  buys per lap: %d %d %d %d; worst purchase gap %d patches (%.0fs)",
	buysInLap[1], buysInLap[2], buysInLap[3], buysInLap[4], worstGap, worstGap * secondsPerPatch))
check(math.min(buysInLap[1], buysInLap[2], buysInLap[3], buysInLap[4]) >= 2, "every one of the four laps content exists for buys at least two levels")
check(worstGap * secondsPerPatch <= 90, "no 90s stretch passes with nothing above a currency tick — the dead-spot rule")

-- Supply, printed rather than asserted: area authoring at depth owns the fix and
-- depth 2+ does not exist yet, so there is nobody for a failure to address.
print(string.format("  payoff supply: %d patches against %.0f a 10-minute session can consume (%.0f%%)",
	GC.Area.patchCount, 600 / secondsPerPatch, 100 * GC.Area.patchCount / (600 / secondsPerPatch)))
```

## Consequences for other work

- **Area authoring by depth** [currently Meta & Content] inherits two predicates, and the first
  one currently fails. (1) `area.patchCount` must be at least `600 / secondsPerPatch` for the
  deepest area reachable in one sitting, or a bound session runs out of overgrowth: 140 against
  513 today, **27%**. (2) `secondsPerPatch <= 3` is a density floor, so `patchCount` must grow at
  least as fast as `size²`. An area that doubles its side length and only doubles its patch count
  halves its payoff rate and breaks the tick rule.
- **Cost-curve work** [currently Balance & Tuning] inherits a zero-margin constraint. The fourth
  lap buys exactly two levels, so any increase to any `costGrowth`, any decrease to
  `value.perLevel`, or any decrease to `area.patchCount` fails the four-lap check. Separately,
  the ladder's top four rungs produce 97- to 156-patch purchase deserts from lap 5 onward,
  which is a stated failure rather than a caution: at shipped values 24 levels take about eight
  laps while the collection finishes in four.
- **The purchase surface** [currently UI/UX] inherits continuous spend as ratified, which means
  buying must be reachable from anywhere in the area with no travel and no area exit. A vendor
  the player walks to converts every purchase beat into a traversal cost and pushes gaps past
  90 s. This is the persistent HUD that `OPEN.md §4` already flags as unbuildable by the current
  `ui-forge` pattern set.
- **What content exists past collection completion** [currently Meta & Content] inherits a stated
  rule violation, not a suggestion: at 24/24 with a maxed ladder exactly one above-tick payoff
  kind survives and it fires once per lap.
- **Reveal placement** [sheet 03, this domain] is now load-bearing on my numbers. The Find
  spacing rule assumes reveals land per patch on contact. If 03 batches them at completion, six
  reveals collapse into one instant, the spacing rule becomes vacuous, and a lap's above-tick
  count falls from 18 to 13 with five of them stacked on the completion peak.
- **Whether area and set completion stack** [sheet 02, this domain] does not move any predicate
  here: my count of 18 treats them as two events at one instant, and 17 passes identically.
- **Feedback semantics at the clear moment** [currently Mechanics] and **the clear cue**
  [currently Audio] inherit a repetition budget: about 140 firings per lap, one every 1.17 s. The
  3-second rule makes the cue's *presence* load-bearing, not its size, so a cue designed to be
  impressive once will be exhausting here.
- **Lap duration and session spanning** [sheet 04, this domain] inherits the 164-second derived
  lap and the 27% supply figure as inputs it must rule on, not re-derive.

## Acceptance criteria

1. `game/test/config.spec.luau` gains a payoff-cadence section that computes seconds-per-clear
   from `area.size`, `area.patchCount`, `movement.baseClearRadius`, `movement.baseWalkSpeed` and
   one named `ROUTE_SLACK` constant, and asserts it is at most 3.0. The assertion passes at the
   shipped manifest, where the value is 1.17.
2. The same section asserts both `collection.relicsPerArea >= 4` and
   `area.patchCount / collection.relicsPerArea * secondsPerPatch >= 15`. Both pass at the shipped
   manifest, where the values are 6 and 27.3 s.
3. The same section asserts the smallest `upgrades[].costBase` is at most
   `perPatchBase * area.patchCount / 10`. It passes at the shipped manifest, 25 against 51.5.
4. The greedy purchase simulation already in that file is extended from `area.patchCount` to
   `4 * area.patchCount` patches and asserts (a) each of the four laps buys at least 2 levels and
   (b) the largest gap between consecutive purchases, times seconds-per-clear, is at most 90. Both
   pass at the shipped manifest, and the file still exits `PASS`.

## Flagged to the developer

**The brief is silent on payoff frequency entirely**, so every figure above is `[cid: decided]`
against derived throughput rather than against a stated intent. Two items need your call.

1. **The shipped slice supplies about 27% of one floor session.** A depth-1 lap is over in a
   modelled 2.7 minutes against a 10-to-20-minute session. Live alternatives: (a) grow
   `area.patchCount` roughly 3.7x at depth 1; (b) make several areas reachable per session, so a
   session is three to six laps; (c) reduce `movement.baseClearRadius` or `baseWalkSpeed` so a
   sweep takes longer; (d) accept depth 1 as a three-minute opening area and let depth 2 onward
   carry session length. **Recommendation: (b) with (d).** "Areas, not zones" and "depth is
   progression" `[brief: binding]` ← `[you chose: R3 Q2]` both point at more laps rather than one
   bloated lap, and (c) fights "reach is the primary sensation" directly.
2. **The terminal state violates this sheet's own rule and no legal content fills it.** At 24/24
   with a maxed ladder, area completion is the only above-tick payoff left and it fires once per
   lap. Every instrument that would normally patch this (rebirth, dailies, seasons, leaderboards)
   is cut or priority 3, so this is not something a domain can quietly absorb. It needs either an
   endgame content answer from Meta & Content or an explicit decision that the game is finished
   at 24/24 and the rule stops applying there.

## Not decided here

Payoff *magnitudes* and which kinds are peaks versus texture, including whether area and set
completion stack (sheet 02). Whether a reveal lands on contact or at completion (sheet 03). The
depth-1 lap duration target and whether a lap may span sessions (sheet 04). Whether throughput
must outpace area growth with depth, and whether either is bounded (sheet 05). Every value:
`tiers[].value` and weights (Systems, then Balance & Tuning), `upgrades[].costBase` /
`costGrowth` / `perLevel` / `maxLevel` (Balance & Tuning), `area.patchCount` and `size` at any
depth (Meta & Content, then Balance & Tuning), per-depth discovery rates (Meta & Content). What
the game is after 24/24 (Meta & Content). The first minute's beat sequence past the three kinds
named above (Onboarding). Whether the build contract should grow a `pacing` key so a sheet like
this one is enforceable by `npm run bridge` rather than only by a Luau test (build-contract
definition, currently Tech & Architecture); flagged in this domain's index as G11 and not
decided here.
