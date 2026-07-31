# Core Loop — domain index

**Category:** Gameplay (stage 1) · **Wave:** 1 (re-plan) · Reads: `HANDOFF.md`, `CONCEPT.md`,
`00-CORE.md`, `01-FOUNDATION.md`, `02-GAMEPLAY.md`, `03-META.md`, `OPEN.md`,
`research/grass-incremental.md`, plus `cid/gameplay/_category.md`, `bridge/schema.mjs`,
`game/test/config.spec.luau`, `game/src/shared/GameConfig.luau`,
`game/src/server/init.server.luau`, and the four already-written value sheets
(`gameplay/balance/01`, `gameplay/meta/01`, `gameplay/meta/02`, `gameplay/systems/01`,
plus `gameplay/mechanics/01` and `gameplay/onboarding/01` because they set the throughput
denominator and the first payoff).

## Contract keys I own: none

I read `SCHEMA` in `/Users/zachsmacbook/Desktop/Code/arga/bridge/schema.mjs`. It has ten
keys. Every one has an owner and none is mine:

`area` → gameplay/meta · `tiers` → gameplay/systems · `upgrades` → gameplay/balance ·
`currency` → gameplay/systems · `movement` → gameplay/mechanics · `patch` → art/objects ·
`collection` → gameplay/meta · `onboarding` → gameplay/onboarding · `modules` and `runtime`
→ tech/architecture.

**So no sheet below carries a `manifest` block, and that is correct rather than thin.** My
subject is pacing, and the contract has no key for pacing. Every sheet here states a
requirement on a value someone else supplies.

**The consequence, and it is the most important line in this index.** Because there is no
contract key, `npm run bridge` cannot enforce anything I write. The instrument that *can* is
`game/test/config.spec.luau`, which already executes `GameConfig`'s curves outside Roblox and
already contains two assertions of exactly the shape my domain produces:

```luau
check(bought >= 5, "one area yields at least 5 upgrade levels, so progress is visible")
check(levels.value >= 2, "the value axis moves, so later patches pay more than early ones")
```

Those two lines are a Core Loop requirement that someone wrote as a test. **Every sheet below
must express its requirement in that form**: a predicate over named manifest keys, phrased so
it could be pasted into that file. `[cid: decided]` A requirement Balance cannot execute is a
requirement Balance will ignore, and prose in a sheet nobody's test reads is the exact failure
the manifest seam exists to remove.

**Two thirds of my `owns` line is closed before I start, and that is correct, not an omission.**

- **Tension is fixed at zero** `[brief: soft]` ← `[you accepted: step 6 Q2]`, stated three
  times across the brief, with the instruction that "nobody downstream should invent tension to
  fill the gap". **I am designing none:** no timer, no hazard, no soft-fail, no urgency, no
  scarcity, no streak-at-risk. What survives of "tension vs downtime" is the downtime half, and
  it lives inside sheet 01 as a maximum-gap rule, not as its own sheet.
- **Streaks and dailies have no available instrument.** "daily rewards" is priority 3
  `[brief: soft]` ← `[I assumed — the ordering]`, treated as binding per the category ruling;
  offline accrual is cut `[brief: binding]` ← derived from `[you chose: R2 Q1]`. **No sheet
  below proposes a hook.** The brief's answer is already on record, "an unfinished area and a
  half-empty index" `[brief: soft]` ← `[you accepted: R3 Q3]`. What is left for me is the
  cadence residue, which is sheet 04.

## What the brief gave me

| constraint, quoted | tag |
|---|---|
| The five-step loop, verbatim: "move through overgrowth; it clears on contact → currency, scaled by the overgrowth's tier" · "keep clearing until the **area is completely clear** → every buried object in it, revealed" · "revealed objects enter the permanent collection" · "spend currency on clearing-speed upgrades" · "move to a deeper area" (`01-FOUNDATION.md`) | `[brief: binding]` ← `[you chose ×4: R1 Q2, R2 Q1, R2 Q2, R3 Q1]` |
| "**How it closes:** faster tools from step 4 make the next area's completion reachable, and deeper areas hide the sets that are still incomplete. The collection is the thing that persists across laps." | `[brief: binding]` ← same item |
| "**A lap is finishing a space, not hitting a number.**" · "Alternatives declined: farm-until-threshold (the reference's shape), one-find-per-lap, and two interleaved loops." | `[brief: binding]` ← `[you chose: R1 Q2]` |
| "**Cleared is permanent — overgrowth never returns.** This is the payoff and it is load-bearing." | `[brief: binding]` ← `[you chose: R2 Q1]` |
| "**No rebirth.** Areas *are* the progression." · "**No offline accumulation.** Nothing regrows, so nothing can accrue while away." | `[brief: binding]` ← `[you chose: R2 Q2]` / derived from `[you chose: R2 Q1]` |
| "10–20 minute active sessions" · "8–14, mobile-heavy, short sessions" · "motivated by **collection, relaxation, completion**" (`00-CORE.md`) | `[brief: binding]` ← `[you chose: R1 Q4]` |
| "**Areas, not zones.**" · "**Depth is progression** — deeper areas are larger, denser, and hide rarer sets." (`03-META.md`) | `[brief: binding]` ← `[you chose: R3 Q2]` + `[you chose: R5 Q1]` |
| Non-goals: "Beating the genre's retention curve. Offered and declined." · "Revenue. Offered and declined." · "Success is **shipped artifacts, not players**" (`00-CORE.md`) | `[brief: binding]` ← `[you chose: R1 Q3]` |
| "Left open — how long an area should take, the cost curve on clearing upgrades, how density scales with depth, and where the pacing dead-spots are." (`01-FOUNDATION.md`) | `[brief: binding]` as this domain's assignment |
| "**Lap length: unknown, and deliberately so.** … **This design's lap is an area, not a rebirth cycle, so the reference's number would not have transferred anyway.**" | explicitly unsourced; stated by the brief against itself |
| "**Tuning burden:** discovery rates must be generous enough that a typical session yields at least one find, or the stated session objective silently fails. **This is the highest-risk tuning in the game**" (`03-META.md`) | `[brief: binding]` as a stated risk; the rates themselves are open |
| Objectives: moment "clear the patch in front of you" · session "**find at least one new relic**" / "collection count rose this session" · short-term "6 of 6 in a set" · long-term "24 of 24" · mastery "*none designed*" | `[brief: soft]` ← `[you accepted: R6 Q3 → R5 Q3]`; "No mastery layer" is `[brief: soft]` ← `[I assumed]` |
| "**There is no failure state.**" · "**The only friction is the size of an area. A large dense area takes time; that is the entire difficulty curve.**" · "**A stuck player cannot exist.**" · "**audio and visual feedback carry the entire load**" | `[brief: soft]` ← `[you accepted: step 6 Q2]`, recorded in `OPEN.md §5` as no longer an assumption |
| "**Escalation — lap 1 vs lap 100:** early areas are small and sparse, later areas are large and dense, so the binding constraint moves from *tool power* to *time and patience*." | `[brief: soft]` ← `[I assumed — extrapolated from depth-based areas; not interviewed]`; `OPEN.md §5 #2` names this domain as inheritor |
| "**Three axes:** value per unit, clear radius, and move speed." | `[brief: soft]` ← `[you accepted: step 6 Q1]` |
| "**~24 objects in 4 sets of 6.**" · "**Each set tied to area depth**" · "**Completing a set grants a permanent bonus** … it supplies milestones between 0% and 100%." | `[brief: soft]` ← `[you accepted: R4 Q4]` |
| "**Clear → reveal inside the first ten seconds.** … the first patch they clear has something under it." · "**Requires a guaranteed find in the starting area**" | `[brief: soft]` ← `[you accepted: R6 Q3]` |
| Audio default: "**a relic reveal owns the best sound in the game.** An area's completion gets a short resolving chord — the only 'achievement' sound." · "Reveals and completions are the two emotional peaks." (`OPEN.md §2`) | `[brief: soft]` ← `[I assumed]`, batched default, overridable by this domain's cadence |
| Measurement item (2): "average time to complete an area — **the pacing number nobody could source**" (`OPEN.md §2`) | `[brief: soft]` ← `[I assumed]`; my number, and instrumented |
| Priority 1 fence: "proximity clearing · area-completion detection · three clearing upgrades · the 24-relic 4-set collection · chunk shuffling for endless areas · guaranteed first-area find." | `[brief: soft]` ← `[I assumed — the ordering]`; treated as binding |

**Values already set by neighbours that my requirements are stated against**, so no sheet
below restates them and no sheet below changes them: `area` 120 studs square, 140 patches,
6-stud minimum spacing (`gameplay/meta/01`); `tiers` paying 1 / 3 / 8 / 20 at weights
52 / 28 / 14 / 6 (`gameplay/systems/01`); `upgrades` at `costGrowth` 1.6 / 1.75 / 1.8 and
`maxLevel` 10 / 8 / 6 (`gameplay/balance/01`); `collection.relicsPerArea` 6 with one set per
depth (`gameplay/meta/02`); `movement` 16 walk speed and 5.5 clear radius
(`gameplay/mechanics/01`); `runtime.clearTickRate` 0.12s (`tech/architecture/01`). All
`[playtest unknown]` in their own sheets.

## What the brief did not give me

Twelve gaps. Each routed to the sheet that must decide it, or out of the domain as a
consequence. Every one is `[cid: decided]` where a sheet resolves it.

| # | the gap | routed to |
|---|---|---|
| G1 | **Whether a relic reveal lands on contact with the patch that hides it, or in a batch at area completion.** The brief reads both ways: loop row 2 is "keep clearing until the **area is completely clear** → every buried object in it, revealed", while `01-FOUNDATION.md` says "clearing *is* revealing" and onboarding puts a reveal inside "the first ten seconds", long before any area is complete. This single ambiguity sets the entire payoff spacing of the game. **The shipped build resolved it one way**: `clearPatch` in `game/src/server/init.server.luau` grants the relic and fires `RelicFound` on contact, per patch. | **sheet 03**, which must ratify or challenge that resolution with reasons, not leave it open |
| G2 | **Lap length.** The brief states its own hole out loud and rules the reference's number non-transferable. No target, no range, no acceptance test. | **sheet 04** |
| G3 | **Payoff frequency is entirely absent.** The brief never says how often anything lands, in any unit, anywhere. There is no session budget. | **sheet 01** |
| G4 | **Whether a lap may span sessions.** Permanence makes a partially cleared area survive a logout for free, but nothing states whether an area is *intended* to be finished in one sitting. **Shipped build resolved it**: `cleared` persists at patch granularity and collapses to `areasComplete` only once the area is done, so laps already span sessions. | **sheet 04**, ratify or challenge |
| G5 | **Whether area size and density growth by depth is bounded.** "deeper areas are larger, denser" is stated for an endless area supply against a 10–20 minute session, with no cap, asymptote or ceiling. | **sheet 05** |
| G6 | **The shape of the upgrade cost curve.** Named as open in the brief; since resolved as geometric per axis by `gameplay/balance/01`. My residue is not the curve, it is **how many purchase beats a lap must contain** and whether the two assertions already in `config.spec.luau` generalise past one area. | **sheet 01** |
| G7 | **No theory of dead-spots.** "where the pacing dead-spots are" was handed over with zero content, and in a game with no failure state the ordinary definition (a stretch where you might lose) does not apply. | **sheet 01**, as the negation of its own maximum-gap rule |
| G8 | **The session objective becomes unsatisfiable at 24/24.** "find at least one new relic" against exactly 24 relics means the highest-weight recurring payoff kind ceases to exist at completion, in a world that does not end. | **Not mine to solve.** Sheets 01 and 03 state how the payoff budget **degrades**, and invent no content. The kind of work that owns the answer: *what content exists past collection completion* [currently: Meta & Content] |
| G9 | **Whether the first session's cadence differs from a typical session's.** The brief fixes second ten (`gameplay/onboarding/01` has since made the first find deterministic) and is silent on the rest of run 1. | **sheet 01** states the run-1 requirement only. Beat choreography is *first-session sequencing work* [currently: Onboarding] |
| G10 | **Where the spend beat sits.** With movement-only input, buying means stopping. Nothing says whether that happens mid-area or at a boundary. **Shipped build resolved it**: `BuyUpgrade` is accepted at any time, so spend is continuous. | **sheet 01**, ratify or challenge |
| G11 | **The build contract has no key for cadence, so nothing this domain writes is enforceable by the bridge.** `SCHEMA` covers area, tiers, upgrades, currency, movement, patch, collection, onboarding, modules, runtime. There is no `pacing`. A pacing sheet can therefore be silently ignored in a way a `tiers` sheet cannot. | **Not mine to fix.** Every sheet below states its requirement as an executable predicate over existing manifest keys, which routes it into `game/test/config.spec.luau`. Whether the contract should instead grow a key is *build-contract definition work* [currently: tech/architecture, which owns `modules` and `runtime`]. Flagged upward, not decided |
| G12 | **Only one area exists.** `gameplay/meta/01` ships East Terrace alone, described as "one area of an intended four". Depth is unimplemented, so sheet 05's requirements have no addressee yet and will be read after the fact. | **sheet 05** must therefore be written as a requirement on *any* future area sheet, not as a comment on an existing one. The kind of work that will meet it: *area authoring by depth* [currently: Meta & Content] |

## Why 5 sheets

There is no contract key here, so the count is driven entirely by the number of genuinely
separate decisions, and I tested each candidate the same way: **could Balance & Tuning satisfy
one and violate another?** Five survive. Payoff *frequency* and payoff *magnitude* are separate
because a set of values can hit every gap requirement with all five payoff kinds sized
identically, which passes 01 and fails 02, and the reverse is equally possible. Reveal
*placement* is separate from both because it is a structural reading of an ambiguous brief
rather than a rhythm, and because it is the one thing in this domain the shipped code has
already committed to, so it must be ratified or challenged in a file cheap to redo. The
*lap-versus-session* boundary is separate because it is a placement decision with a persistence
consequence, not a curve. *Depth escalation* is separate because it is the ruling on an
inherited soft assumption that `OPEN.md §5 #2` assigns to this domain by name, and burying a
licence-to-overrule-the-brief inside a sheet about something else is how an overrule stops being
visible.

Three candidates were rejected as sheets. **The loop in one line** is closed: the brief's
five-step table is it, verbatim, with four direct interview questions behind it, and restating
it is re-deriving it. **Tension** is fixed at zero with an instruction not to invent any, so it
is stated as closed above instead of specced. **Streaks and dailies** have no legal instrument,
so there is nothing to assign. Two more were rejected as *separate* sheets and folded:
dead-spots are the negation of 01's maximum-gap rule rather than a subject of their own, and the
spend-beat placement is a frequency question about the same timeline 01 already owns.

| # | sheet | must decide |
|---|---|---|
| 01 | `payoff-frequency` | How many payoff events one bound 10–20 minute session must contain, of which kinds, and the maximum tolerable gap between two consecutive ones. Must be written as an inequality over named manifest keys (`area.patchCount`, `area.size`, `area.minSpacing`, `collection.relicsPerArea`, `movement.baseWalkSpeed`, `movement.baseClearRadius`, `runtime.clearTickRate`, `upgrades[].costBase`/`costGrowth`) so it can be pasted into `game/test/config.spec.luau`. Includes the **purchase-beat requirement**, which must generalise the two assertions already in that file (`bought >= 5`, `levels.value >= 2`) so they still bind when areas 2 to 4 exist and the ladder is shared across four laps rather than funded by one. Includes **G7**, the dead-spot definition, as the negation of its own gap rule, and **G10**, ratifying or challenging continuous mid-area spend. States how the budget degrades at 24/24 (**G8**) and invents nothing to fill it. Timeline only: no magnitudes (02), no reveal placement (03). |
| 02 | `payoff-weights` | The relative magnitude ordering of the five payoff kinds the loop already contains (currency tick, relic reveal, area completion, set completion, upgrade purchase), which are peaks and which are texture, and whether a payoff's size scales with the effort that produced it. Must be stated as a requirement on values it does not set: the spread required across `tiers[].value`, and the size of a set-completion bonus measured against one currency tick. Must rule on a collision the shipped values create and nobody has noticed: `collection.relicsPerArea` is 6 and one set is buried per area, so **area completion and set completion land at the same instant** by design (`gameplay/meta/02`). Two of the five payoff kinds therefore coincide, and whether that is a stacked peak or a smeared one is this sheet's call. Confirms or overrides the `OPEN.md §2` audio default that reveal and completion are "the two emotional peaks". |
| 03 | `reveal-placement` | **G1.** Whether a reveal lands on contact or in a completion-gated batch. Quote both readings from the brief, then ratify or challenge the shipped resolution (on contact, per patch, inside `clearPatch`) with the reason written either way. Then the session-level requirement that a median bound session yields at least one *new* relic, as an inequality over `collection.relicsPerArea`, `area.patchCount` and sweep throughput. This is the brief's self-declared highest-risk tuning seen from the cadence side; the per-tier discovery rates stay with *discovery-rate content work* [currently: Meta & Content] and the values stay with Balance & Tuning. |
| 04 | `lap-vs-session` | Where the session boundary falls relative to the lap boundary. The target duration of one depth-1 lap against the 10–20 minute window, and **G4**, whether a lap may span sessions. **Do not estimate the duration: derive it.** The brief called this "the pacing number nobody could source", but the shipped manifest now makes it computable from `area.size`, `area.patchCount`, `area.minSpacing`, `movement.baseWalkSpeed`, `movement.baseClearRadius` and `runtime.clearTickRate`. Show the derivation, then state the requirement as a bound plus an acceptance test, carrying `[playtest unknown]` with a starting target and a test range. Ratify or challenge the shipped session-spanning behaviour (patch-granular `cleared` state collapsing to a completion flag). Ends with the return-pull statement built only from permanence and an incomplete index. **This sheet may not name, imply, or reserve space for daily rewards, streaks, offline accrual, seasons or events.** |
| 05 | `depth-escalation` | Whether clearing throughput must **outpace, match, or lag** area growth as depth increases, and **G5**, whether either growth is bounded and against what. This is the ruling on `[brief: soft]` assumption #2, "the binding constraint moves from *tool power* to *time and patience*", which `OPEN.md §5 #2` hands to this domain and which nobody has tested against a 10–20 minute session played by 8–14 year olds on phones. Keep it or overrule it, with the reason written either way. Output is a requirement on any future `area` sheet and on `upgrades[].maxLevel`/`perLevel`, phrased so it holds whatever values those sheets pick (**G12**). No coefficients. Binds 01 and 04 jointly, which is why it is last. |

## Verification note

**Most likely to be contradicted: 05 `depth-escalation`, by area-authoring work at depth.**

It is the only sheet with nothing implemented behind it. `gameplay/balance/01` set a ladder of
24 total levels (10 + 8 + 6) explicitly sized so that "one area of an intended four" funds
visible but partial progress, and `game/test/config.spec.luau` proves that holds for East
Terrace's 140 patches. Nothing anywhere states what area 2 costs to clear. If area authoring
sizes depth 2 at several times the patch count, the ladder ceiling may make my invariant
unsatisfiable at any value, and the collision will surface in the wrong wave. 05 must therefore
be a predicate over `area.patchCount` at depth N rather than a preference, so the contradiction
lands as a failed check rather than as an argument.

**Runner-up: 01 `payoff-frequency`, by cost-curve work.** The two assertions already in
`config.spec.luau` were written against one area's income. Generalising them past that is my
requirement, and it constrains `costGrowth`, which Balance & Tuning has already set per axis
against a single area. If the generalisation is strict, existing shipped values may fail it.
That is the correct place for that collision, and it is why 01 must produce a predicate rather
than a paragraph.

**Least likely: 03 and 04**, precisely because the build already committed on both. Their value
is that a ratification with reasons converts an accident of implementation into a decision on
the record. If either sheet instead challenges the shipped behaviour, it stops being least
likely and becomes an escalation.

**Consequences this domain forces on neighbours, stated as consequences only.** Feedback
semantics at the moment of reveal, given reveals are per-patch [Mechanics]. What partial-area
state must persist if laps span sessions, which is the state `OPEN.md §2` warns "grows without
bound unless areas are collapsed to a completion flag" [what-must-persist definition, currently
Systems, then storage work, currently Tech & Data]. Whether reveal and completion remain the two
audio peaks, and what a doubled area-plus-set peak sounds like [Audio]. A maximum-gap
requirement plus "how close am I to done" legibility while moving, which points at the
persistent HUD the build stage cannot currently produce [UI/UX, already flagged in
`OPEN.md §4`]. A patch-count-at-depth predicate [area authoring by depth, currently Meta &
Content]. And the contract-shape question in G11 [build-contract definition].

## Research owed

**`must_verify` was discharged in the previous plan and is not re-fetched**, per instruction.
Per the category ruling I did not chase the reference's rebirth-cycle length: the brief already
ruled it non-transferable because this design's lap is an area, not a reset. The comparator is
`PowerWash Simulator`, chosen because it is the closest *shipping* analogue of a
completion-shaped lap: a job finishes when every unit of surface is clean, there is no failure
state, satisfaction is explicitly located in the before/after, partial progress persists, and
small early jobs grow into large late ones. It is not Roblox and not an incremental; only its
lap-shape cadence is used.

| finding, quoted or figure | source, fetched |
|---|---|
| "There are **38 jobs** in PowerWash Simulator 2's base campaign." · "Solo players should expect it to take around **30-35 hours to complete every job**." · "Some jobs are short and require only a few minutes" · "some larger jobs can take 2-3 hours to clean fully" | `[research: https://currently.att.yahoo.com/att/full-powerwash-simulator-2-mission-140000826.html]` (GameSpot text, syndicated; the gamespot.com original returned 403) |
| Early small house job "30-45 minutes"; a later job "takes 1-2 hours solo"; jobs grow larger through the campaign, and the later job is "one of the most satisfying jobs due to the dramatic before/after transformation" | `[research: https://earlyguides.com/powerwash-simulator/walkthrough]` |
| Player-reported longest jobs: Subway "3 hours 20 minutes", Treehouse "2 hours 35 minutes", Mini Golf "2 hours 24 minutes" | `[research: https://steamcommunity.com/app/1290000/discussions/0/5069383987784255569/]` (player-reported, not telemetry) |
| Partial progress persists mid-lap: "the game saves at regular intervals during washing. or when you exit the job"; a job can be left and resumed with cleaning intact (career mode) | `[research: https://steamcommunity.com/app/1290000/discussions/0/3112530528185447905/]` |
| Roblox's own core-loop documentation defines the loop as "Minute to minute player interaction", "Most repeated set of actions", "Progression engine", and contains **no timing, session-length or reward-frequency numbers at all** | `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/production/game-design/core-loops.md]` (useful negative result: platform docs cannot source cadence) |
| Cross-check heuristic on cycle length: "How long does it take a new player to complete one satisfying cycle of your core loop? If the honest answer is over 15 minutes, that's a design problem worth solving" | `[research: https://rowatcher.com/news/what-the-roblox-algorithm-actually-rewards-in-2026-not-ccu]` — **opinion piece, not measured data.** Used only as the cycle-length heuristic; its retention and re-engagement prescriptions are deliberately not imported, because `00-CORE.md` declines retention as a non-goal and several would breach priority 3 |

**What the research establishes, and it is the spine of sheets 04 and 05.** In the closest
shipping analogue a completion-shaped lap runs from a few minutes at the small end to 2 to 3.5
hours at the large end, with an early representative job around half an hour. That early figure
alone is 1.5x this game's entire bound session, and the analogue survives its own late-game
lengths only because its audience plays long desktop sittings and its partial progress persists
so a lap spans them. This design gets the second property free from permanence and has the
opposite of the first: 10 to 20 minutes, mobile, ages 8 to 14. The analogue therefore confirms
the *shape* of inherited assumption #2 (early small, late large, difficulty as duration) while
supplying no evidence at all that the shape survives a 20-minute ceiling. That is exactly the
question 05 exists to rule on, and it is why 05 is a ruling rather than an inheritance.

**One thing changed since the previous plan and it changes an output.** The brief called
per-area completion time unsourceable, and it still is, but it is no longer *unknown*: the
shipped manifest supplies area size, patch count, minimum spacing, base walk speed, base clear
radius and clear tick rate, which jointly determine a sweep time. Sheet 04 must compute it
rather than estimate it. That converts "the pacing number nobody could source" into a derived
figure that is still `[playtest unknown]` for validation but is no longer a guess.

**Not verified, with the fetch that would settle each.**

1. **A Roblox-native per-area completion time.** No page found states how long a lap takes in
   any Roblox area-completion game; the lawn-mowing cluster and the reference family publish no
   durations. `[unverified]` Settling fetch: none available on the open web. The honest settling
   instrument is our own instrumentation, already specified as `OPEN.md §2` measurement item (2),
   "average time to complete an area".
2. **First-party per-job duration table for the comparator.**
   `powerwash-simulator.fandom.com/wiki/Jobs` returned HTTP 402 and the individual job pages sit
   behind the same wall; `howlongtobeat.com` is not fetchable by this tool; `gamespot.com`
   returned 403. I substituted a syndicated copy of the same GameSpot text plus a walkthrough
   site plus player-reported figures rather than record it unavailable, so the figures above are
   sourced but second-hand and the per-job table itself is `[unverified]`. Settling fetch: the
   Fandom `Jobs` page through a client that clears its paywall, or HowLongToBeat's per-job data.
3. **A time-trial figure for the comparator's smallest job.** A search summary offered
   gold/silver/bronze thresholds. **Not recorded as sourced**, because that is precisely the
   failure `research/grass-incremental.md` documents, where "the minutes figure was the search
   engine's invention". Settling fetch: the Fandom challenge-mode page, same paywall.
4. **Nothing sources this game's own numbers and nothing here tries to.** Every value stays with
   Balance & Tuning. What the five sheets hand over are predicates, orderings and acceptance
   tests.

**Scope check.** Priority 3 was read before assigning. No sheet specs, names, implies, reserves
space for, or stubs any of the eight excluded items; sheet 04 carries that prohibition in
writing because it is the one where the pull is real. The streaks-and-dailies slice of my `owns`
line is entirely priority 3 and is assigned nothing. The rest of the subject is priority 1, so
nothing else is dropped and no escalation to the category lead is required, beyond G11 which is
flagged rather than escalated.
