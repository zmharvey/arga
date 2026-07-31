# 02 — Payoff weights

**Domain:** Core Loop · **Category:** Gameplay · **Wave:** 1

## Decision

**Five kinds, one ladder, weights `1 / 3 / 8 / 20 / 50`:** currency tick 1, upgrade purchase 3,
area completion 8, **Find reveal 20, set completion 50.** The first four weights *are*
`tiers[].value` verbatim; the fifth continues that ladder at its own smallest step. **Two peaks
(reveal, set completion), two beats (purchase, area completion), one texture (the tick).**

**A payoff's size does not scale with the effort that produced it.** Every kind is
constant-magnitude for the life of the game. The one in-kind variance is the tick's tier, and
that variance is carried by **pitch, not magnitude** — the presentational spread across tiers is
capped at 2x even though `tiers[].value` spreads 20x.

**The collision the index flagged does not exist.** `03-reveal-placement` put reveals on contact,
so a set closes when its sixth Find is revealed — on average 14% of a lap *before* the area
completes. The two coincide only when the last patch cleared is a Find patch, 6 in 140 = **4.3%
of laps**. That case is **sequenced, never fused**: reveal → set completion → area completion,
onsets at least 0.35 s apart.

**Core Loop owns no build-contract key, so this sheet carries no `manifest` block, and that is
correct rather than thin.** No Bash in this run, so instead of `npm run bridge -- --contract` I
read `SCHEMA` in `bridge/schema.mjs` directly: eleven keys — `area`, `tiers`, `upgrades`,
`vocabulary`, `currency`, `movement`, `patch`, `collection`, `onboarding`, `modules`, `runtime` —
and every one names another owner. There is no key for a payoff hierarchy. My output is the
predicate block below, sized for `game/test/config.spec.luau`.

## Why

### The ordering is the brief's own objective ladder, and only two rungs needed deciding

`03-META.md` orders its objective scopes **moment < session < short-term < long-term**
`[brief: soft]` ← `[you accepted: R6 Q3 → R5 Q3]`, and three of my five kinds are exactly those
scopes:

| scope | objective, quoted | payoff kind | weight |
|---|---|---|---|
| moment | "clear the patch in front of you" | currency tick | 1 |
| session | "**find at least one new relic**" | Find reveal | 20 |
| short-term | "complete one set" | set completion | 50 |

**So the brief already ranks set completion above a single Find, and a Find above a tick.** That
is a stated ordering in a `[you accepted]` sheet, and it is the reason the top of my ladder is not
where `OPEN.md §2`'s batched audio default put it. `[cid: decided]` on which of two brief items
wins; the ordering itself is inherited, not invented.

The two kinds the objective ladder does not name are placed by one rule each:

- **Area completion sits below the reveal**, which is `OPEN.md §2` verbatim — "a relic reveal owns
  the best sound in the game" against an area's "short resolving chord" `[brief: soft]` ←
  `[I assumed]` — and which `04-lap-vs-session` already ratified when it ruled area completion "a
  repeating beat of the loop, not the session's climax", 3 to 7 times a session. A kind that fires
  3 to 7 times a sitting cannot outrank the kind the session objective is measured on.
- **Upgrade purchase sits below area completion** and above the tick. It is self-initiated, so the
  player already knows it happened; `gameplay/balance/01` calls its cue a "purchase confirmation
  sound", which is confirmation class, not achievement class; and its real payoff is the next
  clear feeling different, which `02-GAMEPLAY.md` names as the primary sensation — "reach is the
  primary sensation — a wider tool must visibly sweep more per step" `[brief: soft]` ←
  `[I assumed]`. A confirmation that outshouted a completion would be announcing the receipt
  instead of the purchase.

### Why the weights are `tiers[].value` rather than five new numbers

`[cid: decided]` The game already contains one legible magnitude ladder, and the player learns its
intervals in the first minute from the tick channel: **1 / 3 / 8 / 20** (`gameplay/systems/01`).
Reusing it means the payoff hierarchy and the tier hierarchy teach the same steps, and it means
four of my five weights are a value another sheet already owns rather than five figures I made up.
The fifth rung continues at the ladder's own smallest step, 2.5x, giving 50. Adjacent ratios are
3.0, 2.67, 2.5, 2.5 — no step under 2.5x, which is the binding part.

**Magnitude means the whole feedback budget, not loudness.** Duration, level, screen area, particle
count and interruption together. Stated because a 50:1 ladder read as amplitude alone is 34 dB and
would clip; read as a budget it is comfortable, and the requirement is only that **no channel
inverts the order.**

### The collision, ruled by arithmetic rather than preference

The index flagged that `collection.relicsPerArea` is 6 against 6-member sets, so "area completion
and set completion land at the same instant". **Under batch placement they would. Under contact
placement they do not.** `03-reveal-placement` ratified contact and derived the residue itself:
with `k` Finds uniformly buried and a monotone sweep, the expected fraction of a lap after the
last Find is `1/(k+1)`, "about 14% at `relicsPerArea` 6, roughly 20 patches and 33 seconds".

A set therefore closes **~33 s before** the area does at depth 1, and the two land together only
when the final patch cleared happens to be one of the 6 Find patches: **6/140 = 4.3%**.
`[cid: decided]`

**So: not a stacked peak, not a smeared one. Adjacent, and in the 4.3% case sequenced.** Three
consequences follow, and they are the whole ruling:

1. **The last 14% of a lap pays ticks only, ending on the rank-8 beat.** That is fine and needs no
   fix, because area completion is a beat rather than the climax (`04`), and 33 s sits well inside
   `01`'s 90-second above-tick ceiling. Under batch placement this stretch would have been the
   climax and the reveals would have been withheld to pay for it — which is the trade `03` priced
   at a factor of 6 in area footprint.
2. **The generic lap has a two-beat finish, not one:** set completion at ~86% of the lap, area
   completion at 100%. Two events, 33 s apart, weights 50 and 8. A player learns which is which
   because they are usually separated; fusing them in the 4.3% case would unteach that.
3. **In the coincident case the order is fixed: reveal → set completion → area completion.**
   Causal first (a set cannot close before the Find that closes it is seen), world-state change
   last, because `02-GAMEPLAY.md` locates satisfaction in "before/after and discovery, nothing
   else" `[brief: soft]` ← `[you accepted: step 6 Q2]` and the restored space *is* the before/after.
   This is also the order the shipped `clearPatch` already emits for the two events that exist
   (reveal at line 432, completion at 439), so it costs no reordering. Minimum onset separation
   **0.6 s** `[playtest unknown]`, test range 0.35 to 0.9 s; under ~0.2 s two cues read as one
   chord, which is the fusion this rule exists to forbid.

### Why nothing scales with effort

`[cid: decided]` Three reasons, each closing one escape:

- **There is no effort to measure.** "There is no failure state" and "**The only friction is the
  size of an area. A large dense area takes time; that is the entire difficulty curve**"
  `[brief: soft]` ← `[you accepted: step 6 Q2]`. The only quantity effort-scaling could track is
  duration, so an effort-scaled payoff pays the deepest areas most and the ten-second onboarding
  promise least.
- **The onboarding promise forecloses a growth curve.** "the first patch they clear has something
  under it" `[brief: soft]` ← `[you accepted: R6 Q3]` means Find #1 must land at full weight. A
  cue that grows with progress must under-size its first instance to leave headroom, which spends
  the promise the brief front-loaded deliberately.
- **Endless areas give a growing completion cue no ceiling.** `03-META.md` "Endless via shuffled
  authored chunks" `[brief: binding]` ← `[you chose: R5 Q1]`, and `04` puts 3 to 7 completions in
  every session forever. There is no last one to grow toward.

So a reveal is the same size at Find 1 and Find 24; a completion the same at depth 1 and depth 4;
a purchase the same at level 1 and level 10; a set completion the same at set 1 and set 4. **Depth
does not buy volume.** What depth buys is `tiers[].weight` shifting toward the rare end, which
moves the *pitch* mix of the tick channel without touching any magnitude.

### The two material requirements, in units somebody else's values can be checked against

**The tick channel must span at least 10x, adjacent steps at least 2x.** The tick is the only kind
whose magnitude varies, and `04-PRESENTATION.md` makes tier "a core economic signal" whose four
silhouettes Art must draw. A flat ladder means those four silhouettes signal nothing economic and
the accessibility work is spent on a distinction with no content. Shipped `1 / 3 / 8 / 20` gives
20x end to end and a smallest step of 2.5x. Passes with room.

**A set-completion bonus is worth 280 base ticks — two laps of clearing — inside a band of 140 to
791.** `[playtest unknown]`, test range = the band itself. Both edges are predicates over shipped
keys, not preferences:

```
floor  = area.patchCount                        = 140 ticks  = 515 Shards
       one lap of ticks. The area completion this bonus accompanies grants nothing
       material, so a bonus worth less than the lap that earned it puts the top of the
       payoff ladder below the texture channel it interrupts.

ceiling = ladderTotal / perTick / #collection.sets = 791 ticks = 2911 Shards
       the four bonuses together must cost less than the upgrade ladder, or the
       collection becomes the economy. gameplay/balance/01's own words: one area must
       fund visible ladder progress "or the loop's fourth step is decoration".

start  = 2 * area.patchCount                    = 280 ticks = 1030 Shards
```

`perTick` is the tier-weighted mean, `0.52·1 + 0.28·3 + 0.14·8 + 0.06·20 = 3.68`; `ladderTotal` is
11,644 Shards across all 24 levels. **The unit is tick-equivalents at grant time**, deliberately,
because Meta & Content has not chosen what kind of thing the bonus is: a flat grant, a multiplier
and a permanent radius bump all convert into this unit, so the requirement survives their choice.

**Band integrity, one cross-check:** the richest single tick must stay under a tenth of the largest
payoff, or texture outweighs a peak. Heartvine at 20 against 1030 clears it 5.2x.

### The kind I ranked first does not exist anywhere

`[cid: decided]` Stated plainly because it is the most actionable thing in this sheet. `SCHEMA`'s
`collection` key holds `className`, `classPlural`, `relicsPerArea`, `areasPerDepth` and `sets`, and
**no field for what a completed set grants.** `game/src/server/init.server.luau` fires exactly two
payoff events — a reveal and an area completion, both down `RelicFound` — and **has no
set-completion path at all**. Meanwhile `02-GAMEPLAY.md` states "**Completing a set grants a
permanent bonus** … it supplies milestones between 0% and 100%" `[brief: soft]` ←
`[you accepted: R4 Q4]`, and `01-payoff-frequency` already counts set completion in its session
budget. So the top rung of the payoff ladder is currently prose. The contract needs the field and
the server needs the event, or weight 50 is decoration.

## The requirement, as a predicate

Pasteable into `game/test/config.spec.luau` after the `-- collection --` block. It needs only `GC`
and `check`, so it does not depend on `01`'s or `04`'s sections having been added first.

```luau
print("\n-- payoff weights (gameplay/core-loop/02) --")

-- Five kinds, one ladder. The first four weights ARE tiers[].value, so the payoff
-- hierarchy teaches the same intervals the tick channel already teaches; the fifth
-- continues that ladder at its own smallest step.
local W = { tick = 1, purchase = 3, area = 8, reveal = 20, set = 50 }

-- The tick is the only kind whose magnitude varies, and the variance IS the tier
-- ladder. Flatten it and four accessibility-mandated silhouettes signal nothing.
local lo, hi = math.huge, 0
for _, t in ipairs(GC.Tiers) do
	lo, hi = math.min(lo, t.value), math.max(hi, t.value)
end
local byValue = table.clone(GC.Tiers)
table.sort(byValue, function(a, b) return a.value < b.value end)
local worstStep = math.huge
for i = 2, #byValue do
	worstStep = math.min(worstStep, byValue[i].value / byValue[i - 1].value)
end
print(string.format("  tick channel spans %dx, smallest tier step %.2fx", hi / lo, worstStep))
check(hi / lo >= 10, "the tick channel spans at least 10x, so tier is economic information")
check(worstStep >= 2, "adjacent tiers differ by 2x or more, so two ticks rank without arithmetic")

-- The payoff ladder may not be flatter than the tier ladder it was borrowed from.
check(W.set / W.reveal >= worstStep, "set completion outranks a Find reveal by at least the tier ladder's own step")
check(W.reveal / W.area >= worstStep, "a Find reveal outranks the area-completion beat by at least that step")

-- The material half: what a set-completion bonus is worth, in base ticks.
local weightTotal = 0
for _, t in ipairs(GC.Tiers) do weightTotal += t.weight end
local perTick = 0
for _, t in ipairs(GC.Tiers) do perTick += (t.weight / weightTotal) * t.value end

local ladderTotal = 0
for _, u in ipairs(GC.Upgrades) do
	for lvl = 0, u.maxLevel - 1 do ladderTotal += GC.upgradeCost(u, lvl) end
end

local bonusFloor = GC.Area.patchCount                             -- one lap of ticks
local bonusCeil = ladderTotal / perTick / #GC.RelicSets           -- four bonuses < the ladder
local BONUS_TICKS = 2 * GC.Area.patchCount -- [playtest unknown] start; range = the band

print(string.format("  set bonus band %.0f-%.0f ticks (%.0f-%.0f %s); starting %.0f ticks (%.0f)",
	bonusFloor, bonusCeil, bonusFloor * perTick, bonusCeil * perTick,
	GC.Currency.plural, BONUS_TICKS, BONUS_TICKS * perTick))
check(bonusFloor <= bonusCeil, "a set bonus worth one lap of clearing still leaves the ladder the larger sink")
check(BONUS_TICKS >= bonusFloor and BONUS_TICKS <= bonusCeil, "the starting set-bonus figure sits inside its own band")
check(hi * 10 <= BONUS_TICKS * perTick, "the richest single tick is under a tenth of a set bonus, so texture cannot outweigh a peak")

-- The collision, sized rather than asserted: reveals land on contact (core-loop/03),
-- so a set closes 1/(k+1) of a lap before the area does and the two coincide only when
-- the last patch cleared is a Find patch.
print(string.format("  set closes ~%.0f%% of a lap before the area; they coincide on %.1f%% of laps",
	100 / (GC.RelicsPerArea + 1), 100 * GC.RelicsPerArea / GC.Area.patchCount))
```

At the shipped manifest: tick channel 20x with a smallest step of 2.50x, `50/20 = 2.5 >= 2.5` and
`20/8 = 2.5 >= 2.5` both bind exactly at the boundary, band 140 to 791 ticks (515 to 2911 Shards)
with a starting 280 (1030), `200 <= 1030`, and the printed collision line reads 14% and 4.3%.

## Consequences for other work

- **The clear cue, the reveal stinger and the completion chord [Audio — SFX and Stingers] inherit a
  five-rung budget with no ties and a fixed loudness order:** set completion ≥ reveal ≥ area
  completion ≥ purchase ≥ the loudest tier clear. Two specifics. The **tick's tier variance is
  pitch, not level** — `OPEN.md §2` already says "each rarity tier a distinct pitched note", and
  the level spread across the four tiers is capped at 2x so the loudest tick stays under the
  purchase beat. And the **set-completion cue is new work that does not exist in the brief's audio
  default**, sized above the reveal.
- **The reveal stinger has to survive 24 firings and the completion chord 3 to 7 a session**, both
  at constant size, because nothing scales with effort. A cue written to be heard once will be
  heard 24 times unchanged.
- **Coincidence handling at the clear moment [Mechanics]** gains one enumerated case: on the 4.3%
  of laps where the final patch is a Find patch, three above-tick payoffs fire on one clear and
  must be emitted reveal → set completion → area completion with at least 0.35 s between onsets.
  Separately, **none of the three may require the player to stop moving** — input is movement-only
  and `04` puts this sequence in front of a player 3 to 7 times a session.
- **`protocol` and `clearing` [tech/architecture] inherit three channels, not two.**
  `03-reveal-placement` demanded reveal and area completion stop sharing `RelicFound` with an
  `__area_complete:` magic string. My ordering is why that matters and it adds a third: these are
  three kinds at weights 20, 8 and 50, and a set completion recovered by parsing a string prefix is
  the largest payoff in the game routed by accident.
- **What a completed set grants [Meta & Content, with Systems for the stacking model] inherits a
  unit and a band, not a value:** whatever kind of bonus it is, its worth at grant time must convert
  to between `area.patchCount` and `ladderTotal / perTick / #sets` base ticks. All four sets must
  grant the **same kind** of thing, or the ordering has nothing to be checked against.
- **The build contract [build-contract definition, currently tech/architecture] needs
  `collection.sets[].bonus`.** Without it the top rung of this ladder cannot reach the build, which
  is the same class of failure as the six Find names the builder once invented. Noted alongside G11
  and `04`'s `areasPerDepth · relicsPerArea >= setSize` relaxation; I am flagging, not deciding.
- **Duplicate handling [Systems] inherits a hole in the band.** Per `03`, a duplicate fires
  *nothing* — the guard drops the reveal — so a buried Find the player already owns currently pays
  less than an ordinary Moss patch. Whatever answer is reached without a second currency has to
  land somewhere in this ordering, and the only free slot is **between the tick and the purchase
  beat**: audible, above texture, unmistakably below a reveal.
- **Tier values [Balance & Tuning] are now bounded both ways.** Below: 10x end to end, 2x adjacent.
  Above: `max(tiers[].value) * 10 <= setBonusTicks * perTick`. Compressing the ladder to make early
  income smoother breaks the first; a jackpot top tier breaks the second.
- **Area authoring by depth [Meta & Content]:** depth may shift `tiers[].weight` toward the rare end
  freely, and may not buy a larger cue for a deeper completion. If `relicsPerArea` falls, as `04`
  recommends, set completion stops being once-per-lap and becomes *rarer*, which strengthens weight
  50 rather than breaking it — but the two-beat lap finish disappears and the 14% Find-free tail
  grows to `1/(k+1)` at the new `k`, which `01`'s 90-second rule then has to absorb.
- **At 24/24 both peaks go extinct permanently.** Ranks 20 and 50 stop firing — the reveal by the
  collection guard, set completion by there being four sets — leaving a ladder whose top surviving
  rung is 8. `01` and `03` established the terminal state; this sheet prices it: **the game loses
  its two largest payoff kinds and keeps its two smallest.** I invent no content. It belongs to
  *what content exists past collection completion* [currently Meta & Content], and whatever it
  supplies has to occupy the empty top of this ladder.
- **The two peaks need two surfaces [UI/UX — Feedback UI]:** a set-completion surface distinct from
  the area-completion notice, and a purchase confirmation ranked *below* the completion beat. Note
  that the reveal and the set closure are usually ~33 s apart and occasionally 0.6 s apart, so one
  surface cannot serve both.
- **One note for the record, not a correction to anyone's sheet.** `03-reveal-placement` writes that
  the coincident completion "stacks two payoff kinds on the final patch"; its own `1/(k+1)`
  arithmetic, two paragraphs later, is what shows they are adjacent rather than stacked 95.7% of the
  time. I am ruling on the stacking question, which that sheet explicitly left to me, and its
  numbers are the ones I ruled with.

## Acceptance criteria

1. `game/test/config.spec.luau` gains a payoff-weights section asserting
   `max(tiers[].value) / min(tiers[].value) >= 10` and that the smallest adjacent step, sorted
   ascending by value, is at least 2. Both pass at the shipped manifest, where the figures are 20
   and 2.50, and the file still exits `PASS`.
2. The same section asserts `W.set / W.reveal >= worstStep` and `W.reveal / W.area >= worstStep`
   against the weight vector `1 / 3 / 8 / 20 / 50`, and prints the set-completion bonus band
   computed from `area.patchCount`, the tier-weighted mean tick and
   `ladderTotal / #collection.sets`. The printed band is 140 to 791 ticks (515 to 2911 Shards), the
   starting figure is 280 ticks (1030 Shards), and `hi * 10 <= BONUS_TICKS * perTick` passes at 200
   against 1030.
3. Reveal, set completion and area completion arrive on three distinct RemoteEvents, and no two
   payoff events of different kinds share an onset. On the clear that completes both a set and the
   area, the emitted order is reveal, then set completion, then area completion, with at least
   0.35 s between consecutive onsets.
4. At the default mix, measured peak level is non-increasing down the order set completion → reveal
   → area completion → purchase → loudest tier clear, with no two adjacent cues equal above the
   tick band; and the loudest tier clear is at most 6 dB above the quietest, with tier distinguished
   by pitch.

## Pushing back

**Overruled:** `OPEN.md §2`'s "Reveals and completions are the two emotional peaks"
`[brief: soft]` ← `[I assumed]`, a batched default the category lead and this domain's index both
record as overridable by this domain's cadence.

**It got the count right and the membership wrong.** There are two peaks. They are the **Find
reveal and set completion**, not the reveal and *area* completion. Two reasons, neither of them
mine:

1. `04-lap-vs-session` already made area completion fire 3 to 7 times a session and called it "a
   repeating beat of the loop, not the session's climax". A kind at that frequency is a beat by
   construction, and `OPEN.md §2` was written before anyone had counted laps per session.
2. `OPEN.md §2` never mentions set completion at all, so the peak it omits is the one `03-META.md`'s
   objective ladder ranks *above* the session objective. Between a batched `[I assumed]` audio note
   and a `[you accepted]` objective table, the objective table wins.

**Also overruled, in the same line:** area completion is no longer "the only 'achievement' sound" —
set completion takes the achievement ceiling. What survives *intact* is the sentence that default
is best remembered for: **"a relic reveal owns the best sound in the game."** I read *best* as
identity and *biggest* as magnitude, and they are not the same claim. The reveal keeps the
signature cue, heard 24 times, and stays above area completion exactly as written; set completion
takes the magnitude ceiling, heard 4 times. And the chord staying "short" is upgraded from taste to
requirement, because `04` made it fire 3 to 7 times a sitting.

## Flagged to the developer

1. **Set completion outranks the Find reveal, which reverses the emphasis of the audio default you
   were offered.** Live alternatives: (a) set completion first, taken here, on the strength of
   `03-META.md`'s objective ladder placing "complete one set" above "find at least one new relic";
   (b) Find reveal first, which matches `OPEN.md §2` verbatim and puts the game's largest cue on the
   event a player meets 24 times rather than 4, at the cost of the objective ladder's top two rungs
   being indistinguishable in feel; (c) equal, rejected outright, because two equal top cues means
   there is no top cue. **Recommendation: (a).** It is the only reading under which the objective
   ladder you accepted is audible, and it costs one sentence of a batched default you were invited
   to override.
2. **The payoff kind I ranked first exists in no artifact.** `bridge/schema.mjs` has no field for a
   set-completion bonus, `game/src/server/init.server.luau` has no set-completion event, and
   `01-payoff-frequency` already spends it in the session budget. Alternatives: (i) grow
   `collection.sets[].bonus` in the contract and a third payoff event in `protocol`, which is one
   field and one RemoteEvent; (ii) leave set completion unimplemented, in which case the top of this
   ladder is prose and a player's four biggest payoffs never fire; (iii) fold it into area
   completion, which is the fusion this sheet spent its whole collision ruling forbidding.
   **Recommendation: (i).**

## Not decided here

The cue itself in every channel — the sound of any of the five (Audio — SFX, Stingers), the
particles (Art — VFX), the notice (UI/UX — Feedback UI). What a completed set actually grants, in
kind (Meta & Content) and how it stacks (Systems). Every value: `tiers[].value` and `weight`
(Systems, then Balance & Tuning), the set-bonus figure inside my band and the onset separation
inside its range (Balance & Tuning), `area.patchCount` and `collection.relicsPerArea` at any depth
(Meta & Content). What the player can and cannot do during the completion moment (Mechanics). How
many payoff events a session contains and the maximum gap between them (`01`). Whether a reveal
lands on contact (`03`, ratified there and depended on here). Lap duration and session spanning
(`04`). Whether area growth by depth is bounded (`05`). What the game is after 24/24, and what
occupies the top of this ladder once both peaks are extinct (Meta & Content). Whether the contract
should grow `collection.sets[].bonus` and a `pacing` key (build-contract definition, currently
tech/architecture; G11).
