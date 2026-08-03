# Core Loop — domain index

**Category:** Gameplay · **Wave:** 1, revised wave 7 · Reads: `HANDOFF.md`, `CONCEPT.md`,
`00-CORE.md`, `01-FOUNDATION.md`, `02-GAMEPLAY.md`, `03-META.md`, `OPEN.md`,
`research/grass-incremental.md`, plus `cid/gameplay/_category.md`, `bridge/schema.mjs`,
`game/test/config.spec.luau`, `game/src/shared/Protocol.luau`,
`game/src/server/Clearing.luau`, and the neighbouring value sheets that set the throughput
denominator and the payoff surfaces.

## Contract keys: this domain owns none and contributes to four

The wave-1 index concluded that because no key was owned here, **no sheet below should carry a
manifest block**. That was the wave-1 defect: a domain does not need a contract key to run, it needs
to produce data a build step can read. `[research: bridge/verify-sheets.mjs]`

**Every sheet below now carries an `amends` block against the key that holds its subject.** The
routing was checked field by field against the merged and proposed manifests, and it turned out that
**core-loop needs no new key** — four existing keys already carry this domain's numbers, in three
cases with core-loop named in their own values as the source. What each of them lacked was the
*ruling* the numbers realise, which is what a later tuning pass can satisfy figure-by-figure while
breaking the design. `[cid: decided]`

| sheet | amends | field | what the key was missing |
|---|---|---|---|
| `01` | `pacing` (proposed, `gameplay/balance`) | `payoffBudget` | the closed list of payoff kinds and the per-session floor on each. `pacing` carries both gap ceilings and no taxonomy of what a payoff is |
| `02` | `response` (merged, `gameplay/mechanics`) | `beats[].economicWeight` | the economic weight ladder. `response.beats[].rank` is the *presentation* order, which `theme/tone/03` owns and which differs at the top two rungs |
| `03` | `discovery` (merged, `gameplay/systems`) | `revealPlacement` | placement as a ruling with a footprint bound attached, rather than as an implementation detail inside `record.fields[found].writtenBy` |
| `04` | `pacing` | `sessionBoundary` | where the boundary falls relative to the lap, and that the lap is deliberately not grown to session length |
| `05` | `depths` (merged, `gameplay/meta`) | `escalation` | the ruling behind `sizingRule`, and the `[brief: soft]` line it overrules |

**`pacing` is the important one, and it is why this domain proposes nothing.** It is owned by
Balance & Tuning and it carries `tickGapMaxSeconds` 3.0, `aboveTickGapMaxSeconds` 90.0,
`coincidentOnsetSeparationSeconds`, the lap band, the lap count and every realised wall-clock figure
— all of them core-loop decisions, several citing core-loop sheets by name in the value itself.
**Proposing a second pacing key would be a hard merge error** (`bridge/merge.mjs` refuses a second
proposal of one key) and would be wrong on the merits: the figures belong to whoever tunes them, and
the rulings belong here. An amendment is exactly that split.

**Two thirds of my `owns` line is closed before I start, and that is correct, not an omission.**

- **Tension is fixed at zero** `[brief: soft]` ← `[you accepted: step 6 Q2]`, stated three times
  with the instruction that nobody downstream should invent tension. **I design none:** no timer, no
  hazard, no soft-fail, no urgency, no scarcity, no streak-at-risk. What survives of "tension vs
  downtime" is the downtime half, and it lives in sheet `01` as a maximum-gap rule.
- **Streaks and dailies have no available instrument.** Daily rewards are priority 3
  `[brief: soft]`; offline accrual is cut `[brief: binding]` ← derived from `[you chose: R2 Q1]`.
  **No sheet below proposes a hook.** The brief's answer is on record — *"an unfinished area and a
  half-empty index"* `[brief: soft]` ← `[you accepted: R3 Q3]` — and the cadence residue is sheet `04`.

## What the brief gave me

| constraint, quoted | tag |
|---|---|
| The five-step loop, verbatim: *"move through overgrowth; it clears on contact → currency, scaled by the overgrowth's tier"* · *"keep clearing until the **area is completely clear** → every buried object in it, revealed"* · *"revealed objects enter the permanent collection"* · *"spend currency on clearing-speed upgrades"* · *"move to a deeper area"* | `[brief: binding]` ← `[you chose ×4: R1 Q2, R2 Q1, R2 Q2, R3 Q1]` |
| *"**How it closes:** faster tools from step 4 make the next area's completion reachable, and deeper areas hide the sets that are still incomplete."* | `[brief: binding]` ← same item |
| *"**A lap is finishing a space, not hitting a number.**"* · declined: farm-until-threshold, one-find-per-lap, two interleaved loops | `[brief: binding]` ← `[you chose: R1 Q2]` |
| *"**Cleared is permanent — overgrowth never returns.** This is the payoff and it is load-bearing."* | `[brief: binding]` ← `[you chose: R2 Q1]` |
| *"**No rebirth.** Areas *are* the progression."* · *"**No offline accumulation.**"* | `[brief: binding]` ← `[you chose: R2 Q2]` / by consequence |
| *"10–20 minute active sessions"* · *"8–14, mobile-heavy, short sessions"* · *"motivated by **collection, relaxation, completion**"* | `[brief: binding]` ← `[you chose: R1 Q4]` |
| *"**Areas, not zones.**"* · *"**Depth is progression** — deeper areas are larger, denser, and hide rarer sets."* | `[brief: binding]` ← `[you chose: R3 Q2]` + `[you chose: R5 Q1]` |
| *"Left open — how long an area should take, the cost curve on clearing upgrades, how density scales with depth, and where the pacing dead-spots are."* | `[brief: binding]` as this domain's assignment |
| *"**Lap length: unknown, and deliberately so.** … **This design's lap is an area, not a rebirth cycle, so the reference's number would not have transferred anyway.**"* | explicitly unsourced; stated by the brief against itself |
| *"**Tuning burden:** discovery rates must be generous enough that a typical session yields at least one find, or the stated session objective silently fails. **This is the highest-risk tuning in the game**"* | `[brief: binding]` as a stated risk; the rates themselves open |
| Objectives: moment *"clear the patch in front of you"* · session *"**find at least one new relic**"* · short-term *"6 of 6 in a set"* · long-term *"24 of 24"* · mastery *"none designed"* | `[brief: soft]` ← `[you accepted: R6 Q3 → R5 Q3]` |
| *"**There is no failure state.**"* · *"**The only friction is the size of an area.**"* · *"**A stuck player cannot exist.**"* · *"**audio and visual feedback carry the entire load**"* | `[brief: soft]` ← `[you accepted: step 6 Q2]`, recorded in `OPEN.md §5` as no longer an assumption |
| *"**Escalation — lap 1 vs lap 100:** … the binding constraint moves from *tool power* to *time and patience*."* | `[brief: soft]` ← `[I assumed — extrapolated; not interviewed]`; `OPEN.md §5 #2` names this domain. **Overruled in sheet `05`** |
| *"**Three axes:** value per unit, clear radius, and move speed."* | `[brief: soft]` ← `[you accepted: step 6 Q1]` |
| *"**Completing a set grants a permanent bonus** … it supplies milestones between 0% and 100%."* | `[brief: soft]` ← `[you accepted: R4 Q4]` |
| *"**Clear → reveal inside the first ten seconds.**"* · *"**Requires a guaranteed find in the starting area**"* | `[brief: soft]` ← `[you accepted: R6 Q3]` |
| Audio default: *"a relic reveal owns the best sound in the game."* · *"Reveals and completions are the two emotional peaks."* (`OPEN.md §2`) | `[brief: soft]` ← `[I assumed]`, batched, overridable by this domain's cadence |
| Measurement item (2): *"average time to complete an area — **the pacing number nobody could source**"* | `[brief: soft]` ← `[I assumed]`; derived in `pacing`, still `[playtest unknown]` |

## What the brief did not give me

| # | the gap | where it landed |
|---|---|---|
| G1 | **Whether a Find reveals on contact or in a batch at completion.** The loop table reads both ways and this one ambiguity sets the entire payoff spacing of the game | **sheet `03`** — ratified on contact, now carried by `discovery.revealPlacement` |
| G2 | **Lap length.** The brief states its own hole and rules the reference's number non-transferable | **sheet `04`** — a band; the figure is `pacing.lapTargetSeconds` |
| G3 | **Payoff frequency is entirely absent.** No unit, no session budget, anywhere | **sheet `01`** — two ceilings and a per-kind floor |
| G4 | **Whether a lap may span sessions** | **sheet `04`** — ratified; `persistence` carries it |
| G5 | **Whether area size and density growth by depth is bounded** | **sheet `05`** — both bounded; `depths.footprintCeilingStuds2` and `invariants[6]`, `[10]` |
| G6 | **The shape of the upgrade cost curve.** Since resolved by `solvency` | **sheet `01`** keeps only the residue: how many purchase beats a lap must contain |
| G7 | **No theory of dead-spots.** In a game with no failure state the ordinary definition does not apply | **sheet `01`**, as the negation of its own gap rule |
| G8 | **The session objective becomes unsatisfiable at 24/24** | **Not mine to solve.** Sheets `01`, `02` and `03` state how the budget degrades and invent nothing. `endgame` owns the answer; `pacing.aboveTickGapScope` scopes the rule off |
| G9 | **Whether run 1's cadence differs** | **sheet `01`** — it does not; `firstSession` delivers all three kinds inside 25 s |
| G10 | **Where the spend beat sits** | **sheet `01`** — continuous, now closed by `input.pressable.roles` and `response` R7 |
| G11 | **The contract has no key for cadence** | **Closed.** `pacing` exists as a proposal from `gameplay/balance/05` and every sheet here amends it or a sibling key. **This domain proposes nothing and that is the finding, not a shortfall** |
| G12 | **Only one area exists** | **Closed.** `depths` ships eight areas across four depths, sized by sheet `05`'s rule |

## Why 5 sheets

There is no key here, so the count is driven by the number of genuinely separate decisions, and each
candidate was tested the same way: **could Balance & Tuning satisfy one and violate another?** Five
survive. Payoff *frequency* and *magnitude* are separate because a value set can hit every gap
requirement with all five kinds sized identically. Reveal *placement* is separate because it is a
structural reading of an ambiguous brief rather than a rhythm, and because the shipped code had
already committed to it. *Lap-versus-session* is a placement decision with a persistence
consequence, not a curve. *Depth escalation* is the ruling on an inherited soft assumption that
`OPEN.md §5 #2` assigns here by name, and burying a licence to overrule the brief inside a sheet
about something else is how an overrule stops being visible.

Three candidates were rejected as sheets. **The loop in one line** is closed — the brief's five-step
table is it, verbatim. **Tension** is fixed at zero with an instruction not to invent any.
**Streaks and dailies** have no legal instrument. Two more were folded: dead-spots are the negation
of `01`'s gap rule, and spend-beat placement is a frequency question about the timeline `01` owns.

| # | sheet | must decide |
|---|---|---|
| 01 | `payoff-frequency` | How many payoff events a bound session must contain, of which kinds, and the maximum tolerable gap between two consecutive ones. Includes **G7**, the dead-spot definition, and **G10**, ratifying continuous mid-area spend. States how the budget degrades at 24/24 (**G8**) and invents nothing to fill it. Amends `pacing.payoffBudget`. Timeline only: no magnitudes, no reveal placement |
| 02 | `payoff-weights` | The relative magnitude ordering of the five payoff kinds, which are peaks and which are texture, and whether a payoff's size scales with the effort that produced it. Must separate **economic weight** from **presentation rank**, which `theme/tone/03-beat-map` owns and which `response.beats[].rank` ships. Must rule on whether area and set completion fuse. Amends `response.beats[].economicWeight` |
| 03 | `reveal-placement` | **G1.** Contact or completion-gated batch. Quote both readings, ratify or challenge the shipped resolution with the reason written either way, then state the session-level Find requirement as an inequality over `footprintStuds2`, `relicsPerArea` and sweep throughput. Amends `discovery.revealPlacement` |
| 04 | `lap-vs-session` | Where the session boundary falls relative to the lap boundary, and **G4**. Do not estimate the duration: derive it. Ratify or challenge session-spanning laps. Ends with the return-pull statement built only from permanence and an incomplete index. **May not name, imply or reserve space for daily rewards, streaks, offline accrual, seasons or events.** Amends `pacing.sessionBoundary` |
| 05 | `depth-escalation` | Whether clearing throughput must **outpace, match or lag** area growth as depth increases, and **G5**. The ruling on `[brief: soft]` assumption #2, which `OPEN.md §5 #2` hands here. Keep it or overrule it, with the reason written either way. Output is a requirement on any future area row, phrased so it holds whatever values that row picks. No coefficients. Binds `01` and `04` jointly, which is why it is last |

## Verification note

**Most likely to be contradicted: `02`, by presentation-channel work.** It is the one sheet whose
subject is split across two owners — economic weight here, peak level in `theme/tone/03-beat-map`
and `mix.levelLadder` — and wave 1 got that split wrong by asserting a loudness order it did not
own. The sheet now withdraws that claim and names the reconciliation, but any channel key that reads
`economicWeight` as loudness re-creates the conflict. **It also files a live one:** `response`
publishes `minOnsetGapSeconds` 0.6 while `pacing` publishes 0.35 for the same quantity, and
`response` names Balance as the figure's owner.

**Runner-up: `05`, by area authoring at depth.** Its rule is now `depths.sizingRule` verbatim and
its three checks are `depths.invariants[9]`–`[11]`, so a contradiction lands as a failed invariant
rather than an argument. That is the intended shape.

**Least likely: `03` and `04`**, precisely because the build already committed on both and the
revisions each demanded have shipped — three distinct payoff RemoteEvents in `Protocol.luau`, and
patch-granular `cleared` collapsing to a counter. `04` withdraws one requirement it should never
have stated as a mechanism; see its `## Pushing back`.

**Consequences this domain forces on neighbours.** Feedback semantics at the moment of reveal, given
reveals are per-patch (`response`). Whether reveal, set completion and area completion remain three
distinct cues and what the coincident case sounds like (`stingers`, `mix`). A maximum-gap
requirement plus "how close am I to done" legibility while moving (`composition`). A footprint and
density predicate at every depth (`depths`). A per-row radius-product bound the offer ladder must
respect (`products`). And a recurring above-tick payoff kind after 24/24, or an explicit decision
that there is none (`endgame`).

## Research owed

**`must_verify` was discharged in the planning pass and is not re-fetched.** Per the category ruling
I did not chase the reference's rebirth-cycle length: the brief already ruled it non-transferable
because this design's lap is an area, not a reset. The comparator is `PowerWash Simulator`, the
closest *shipping* analogue of a completion-shaped lap — a job finishes when every unit of surface
is clean, there is no failure state, satisfaction is explicitly located in the before/after, partial
progress persists, and small early jobs grow into large late ones. It is not Roblox and not an
incremental; only its lap-shape cadence is used.

| finding, quoted or figure | source |
|---|---|
| *"There are **38 jobs** in PowerWash Simulator 2's base campaign."* · *"Solo players should expect it to take around **30-35 hours to complete every job**."* · some jobs *"require only a few minutes"*, others *"can take 2-3 hours to clean fully"* | `[research: https://currently.att.yahoo.com/att/full-powerwash-simulator-2-mission-140000826.html]` (GameSpot text, syndicated; the original returned 403) |
| Early small house job *"30-45 minutes"*; a later job *"takes 1-2 hours solo"*; jobs grow larger through the campaign | `[research: https://earlyguides.com/powerwash-simulator/walkthrough]` |
| Player-reported longest jobs: Subway *"3 hours 20 minutes"*, Treehouse *"2 hours 35 minutes"* | `[research: https://steamcommunity.com/app/1290000/discussions/0/5069383987784255569/]` (player-reported, not telemetry) |
| Partial progress persists mid-lap: *"the game saves at regular intervals during washing, or when you exit the job"* | `[research: https://steamcommunity.com/app/1290000/discussions/0/3112530528185447905/]` |
| Roblox's own core-loop documentation defines the loop as *"minute to minute player interaction"*, *"most repeated set of actions"*, *"progression engine"*, and contains **no timing, session-length or reward-frequency numbers at all** | `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/production/game-design/core-loops.md]` — useful negative result: platform docs cannot source cadence |
| Cycle-length heuristic: *"How long does it take a new player to complete one satisfying cycle of your core loop? If the honest answer is over 15 minutes, that's a design problem worth solving"* | `[research: https://rowatcher.com/news/what-the-roblox-algorithm-actually-rewards-in-2026-not-ccu]` — **opinion piece, not measured data.** Used only as the heuristic; its retention prescriptions are deliberately not imported |

**What the research establishes.** In the closest shipping analogue a completion-shaped lap runs
from a few minutes to two or three hours, with an early representative job around half an hour —
1.5× this game's entire bound session, surviving only because its audience plays long desktop
sittings. This design gets partial persistence free from permanence and has the opposite session
shape. **The analogue confirms the *shape* of the inherited escalation assumption and supplies no
evidence that it survives a 20-minute ceiling**, which is what sheet `05` exists to rule on.

**Not verified, with the fetch that would settle each.** `[unverified]` A Roblox-native per-area
completion time: no page found states how long a lap takes in any Roblox area-completion game. The
honest settling instrument is our own instrumentation, already specified as `OPEN.md §2` measurement
item (2). `[unverified]` A first-party per-job duration table for the comparator: the Fandom `Jobs`
page returned HTTP 402 and `gamespot.com` returned 403, so the figures above are sourced but
second-hand. Settling fetch: that page through a client that clears its paywall, or HowLongToBeat's
per-job data.

**Scope check.** Priority 3 was read before assigning. No sheet specs, names, implies, reserves
space for, or stubs any excluded item; sheet `04` carries that prohibition in writing because it is
the one where the pull is real. Nothing else is dropped and no escalation to the category lead is
required.
