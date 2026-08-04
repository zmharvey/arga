# Onboarding — domain index

**Category:** gameplay · **Wave:** 3 · Reads: `HANDOFF.md`, `CONCEPT.md`, `00-CORE.md`,
`01-FOUNDATION.md`, `02-GAMEPLAY.md`, `03-META.md`, `04-PRESENTATION.md` (cited on me by name),
`OPEN.md`, `research/grass-incremental.md`, `cid/gameplay/_category.md §07`, `cid/_digest.md`,
`cid/_contract.md`, and my own adopted `01-first-find.md`. Repo reads: `bridge/schema.mjs`,
`bridge/merge.mjs`, `bridge/emit-config.mjs`, `game/src/shared/Layout.luau`,
`game/src/server/Clearing.luau`, `game/src/server/init.server.luau`, `ui-forge/briefs/hud.brief.json`.

## What the brief gave me

**The settled beat, in full** (`02-GAMEPLAY.md` § Onboarding / first session):

> **Clear → reveal inside the first ten seconds.** The player spawns touching overgrowth, and
> **the first patch they clear has something under it.** No text, no tutorial. This front-loads
> the differentiator instead of hiding it behind a grind — the genre-standard alternative
> (economy first, finds later) was explicitly declined because a new player could quit before
> ever seeing what makes this game different.
> **Requires a guaranteed find in the starting area** — the shuffle must not be allowed to
> decide this one.

`[brief: soft]` ← `[you accepted: R6 Q3]`. Restated in `CONCEPT.md` and listed in `03-META.md`
priority 1 as "guaranteed first-area find", so it ships.

> Left open — the actual first-minute choreography and how the index is first surfaced.

`[brief: soft]`. My category lead split it: the beat sequence and its timing are mine; the
screens and callouts are on-screen-surface work. For the index I own *when* it appears and what
must be understood by then, not what it looks like.

| constraint | tag | where |
|---|---|---|
| "**There is no failure state.** No death, no losing, no loss of progress" · "**Zero tension is deliberate.** … **audio and visual feedback carry the entire load** — and nobody downstream should invent tension to fill the gap." | `[brief: soft]` ← `[you accepted: step 6 Q2]`, confirmed in `OPEN.md §5` | `02-GAMEPLAY.md` |
| "**Input: movement only.** No aiming, clicking, or ability buttons. One thumb." | `[brief: soft]` ← `[you accepted: step 6 Q3]`, `OPEN.md §5` records it as no longer an assumption | `02-GAMEPLAY.md` |
| "**8–14, mobile-heavy, short sessions**" · "10–20 minute active sessions" · "casual but **genre-literate**" | `[brief: binding]` ← `[you chose: R1 Q4]` | `00-CORE.md` |
| "Said plainly because genre-literate players will otherwise arrive expecting rebirth and idle and not find them." | `[brief: binding]` (follows `[you chose: R2 Q1]`, `[you chose: R2 Q2]`) | `CONCEPT.md` |
| "Also declined: extending to a **text-free comprehension rule**, which was offered as the broader version." | `[brief: soft]` ← `[you accepted: R6 Q4]` | `04-PRESENTATION.md` |
| Measurement (1): "did a first-session player reveal a relic, **and how fast** — validates the ten-second onboarding promise." | `[brief: soft]` ← `[I assumed — §2 default]` | `OPEN.md §2` |
| Objectives: moment "clear the patch in front of you" · session "**find at least one new relic**" | `[brief: soft]` ← `[you accepted: R6 Q3 → R5 Q3]` | `03-META.md` |
| Priority 3, excluded entire: "codes · daily rewards · leaderboards · trading · seasons and events", plus rebirth and offline accrual | `[brief: soft]` ← `[I assumed — the ordering]`; rebirth and offline accrual independently `[brief: binding]` | `03-META.md` |

**Scope check, stated because it is unusually consequential here.** Nothing in my subject is
priority 3, so nothing is excluded outright. But every instrument the genre onboards with is
gone by some other decision: a text tutorial (the settled quote), a guided arrow or dialogue as
`create.roblox.com` suggests `[research: https://create.roblox.com/docs/production/game-design/onboarding]`,
an NPC or guide (`theme/identity/04` declares nine entity classes and none of them exists), a
quest or objective marker (no such system in priority 1), a daily or login reward (priority 3), a
starter currency grant (`gameplay/systems/04` fixes one faucet and one sink, so a join grant is a
second faucet), chat (`gameplay/social/01` turns it off), and a forced camera or cutscene
(`gameplay/mechanics/05` forbids any beat taking control from the player). **The beat sequence is
therefore the entire onboarding surface.** There is no second channel to fall back on, and no
sheet of mine may reach for one.

**What wave 2 fixed under me**, each `[cid: decided]` by the named sheet and merged:

- A moving player is paid **at least once every 3 seconds**; between two payoffs above a currency
  tick, **no more than 90 seconds**. `[cid: decided — gameplay/core-loop/01]` My whole first
  minute lives inside both.
- A depth-1 lap targets **165 s** (`[playtest unknown]`, 120–200 s), and **laps span sessions**.
  `[cid: decided — gameplay/core-loop/04]` So minute 1 is ~36% of one lap: area completion and set
  completion are **out of reach** in the first minute, and the concepts behind them cannot be
  taught by their own events there.
- A Find reveals **on contact with the patch that hides it**, per patch, at the instant it clears.
  `[cid: decided — gameplay/core-loop/03]` My adopted `01` survives this unchanged.
- Payoff weights `1 / 3 / 8 / 20 / 50`; a Find reveal is a **peak** at 20 and a currency tick is
  **texture** at 1. `[cid: decided — gameplay/core-loop/02]` A Find reveal is "the loudest single
  moment in the game in every channel" and **nothing rises as a completion approaches**.
  `[cid: decided — theme/tone/03]`
- Five beats with named causes and latency budgets, and **no beat takes control away**.
  `[cid: decided — gameplay/mechanics/05]` My teaching order sits on top of it and adds no beat.
- The draw is **without replacement** and the areas at one depth **partition** that depth's set,
  so no reachable duplicate exists. `[cid: decided — gameplay/systems/05]` My adopted `01`'s
  guarantee is compatible: `05` explicitly leaves "whether the guaranteed first patch survives"
  to onboarding-and-area-layout work, and `gameplay/mechanics/02` **withdrew** the keep-clear disc
  that would have displaced it, so it survives.
- Chat off, characters non-colliding, 12–20 players. `[cid: decided — gameplay/social/01]` **No
  other player can act on a first session** — but one must be *perceptible from spawn, without
  input, at ≤128 studs* `[cid: decided — gameplay/social/02]`, which lands a stranger inside my
  first ten seconds whether I sequence for it or not.
- Register: no first or second person, declarative, ≤12 words a sentence, grade 5 reading level.
  `[cid: decided — theme/tone/01]` Binds any string a beat of mine is allowed to put on screen.

**The verb that spends is not settled and I have not assumed it.** `gameplay/mechanics/02` ruled
purchase is issued through a pressable reachable with no travel; it also records that its first
draft's world-pad reading was withdrawn, and my instruction is that the binding is under revision.
Every teaching beat I assign for spending is written as **what must be understood** — that
clearing pays, that the payment buys reach, that the buy is reachable without leaving the ground
you are clearing — and never as which control does it. **The verb binding is `input`'s and it is
unsettled.** No sheet of mine names a key, a button, a pad or a gesture.

## What the brief did not give me

Ten gaps, each routed. None is filled here.

1. **Nothing says the first reveal must be caused by the player, and in the shipped build it is
   not.** `Layout.luau:137-144` places set one's first name on `indexNearestOrigin(patches)`,
   commented "the one the player spawns on top of"; `Clearing.luau` clears on a horizontal XZ
   distance test on a server tick, reading no client message; `init.server.luau` pivots the
   character to that origin raised 3 studs on Y. Y is not in the test, and the base clear radius
   is 5.5 studs against a 6-stud minimum spacing. **So the loudest beat in the game fires on the
   first server tick, before the player has touched a control.** The brief's own sentence is "the
   first patch **they clear**". → **02**, which must rule on whether a reveal may precede input
   and state the precondition that enforces it.
2. **Nothing says what happens if the player never moves.** No failure state, no timer, no
   prompt, no text, and `theme/tone/04` `D12` removes every standard way of signalling
   "you cannot do that". The brief's onboarding silently assumes motion. → **02**.
3. **The felt discovery rate inverts inside the first minute.** Guaranteeing the first Find makes
   the observed rate 1 patch per Find, then ~1 in 28 for the remaining five of six across 140
   patches. The brief front-loads the differentiator and says nothing about what the second wait
   teaches. → **02** for the spacing requirement, **03** for what the player is allowed to
   conclude from a sample of one.
4. **"No text, no tutorial" is scoped to the onboarding line only.** `04-PRESENTATION.md` declined
   a game-wide text-free comprehension rule, so text is not banned generally, and nobody has said
   whether the ban lifts at second 11, at minute 2, or never. → **03**.
5. **No comprehension floor exists anywhere.** With no failure state confusion has no punishment,
   which changes what onboarding is *for* — the brief never makes that observation and never says
   what a player must understand versus may stay confused about indefinitely. → **03**.
6. **Nobody owns whether the first session corrects the genre-literate expectation.**
   `CONCEPT.md` requires the absence of rebirth and idle to be "said plainly"; outside-the-game
   communication is discovery-and-positioning work; inside-the-game is unassigned. → **03**,
   which may legitimately answer "the first session says nothing about it".
7. **Nothing is withheld, and the shipped build proves the default.** `hud.brief.json` renders,
   at join, `RELICS 0 / 24`, `SHARDS 0`, three upgrade rows with costs, and `EAST TERRACE — 0%
   CLEAR`. The collection's size and the whole upgrade ladder are named before the player has one
   Find or one Shard. The brief withholds nothing; my category lead's instruction is to contest or
   confirm that. → **04**.
8. **No pass mark on the one instrumented onboarding number.** `OPEN.md §2` item (1) measures
   "how fast" and states no ceiling. → **02** states the ceiling and its unit; the figure is
   number-and-curve work [currently Balance & Tuning].
9. **No second-session open.** Laps span sessions, there is no offline grant and nothing regrows,
   so session 2 starts mid-lap on partly cleared ground with no event waiting. The brief's return
   hook is "an unfinished area and a half-empty index" and stops there. **Not mine** — it is
   return-hook and re-entry work [currently Core Loop, with Meta & Content] — but **04** must
   name it, because a run-1 suppression whose lift condition is "session 2" would land in a
   session nobody has specified.
10. **The first purchase is a beat with no guaranteed timing.** A join grant is forbidden by the
    one-faucet rule, so the first upgrade is affordable only after N patches at tier values
    Balance has not set. Whether a spend beat fits inside minute 1 at all is undetermined. →
    **02** states the requirement and the unit; the value is number-and-curve work.

## Why 4 sheets

One key I already own and one key this subject needs, plus two rules that shape the second key's
value rather than being it. `01` exists, holds `onboarding`, and its boolean is already emitted
into `GameConfig.GuaranteedFirstRelic`, so it stays exactly one sheet. The first minute needs a
data form nothing in the contract can hold today — that is `02`, and it is one sheet because a
beat sequence is one artefact and splitting it by beat would produce four sheets that cannot be
read independently. **Teaching order is not the beat sequence**: five of the seven concepts a
first session can teach are unreachable inside minute 1 (a 165-second lap puts area completion,
set completion and depth past it, and the first purchase depends on an unset cost), so the
comprehension schedule spans the whole session and outlives `02`'s last row — that is `03`.
**Withholding is not teaching**: deferring a concept and suppressing a surface that already
exists are separable decisions with different failure modes, the shipped HUD shows the default is
"everything at second zero", and two builders reading only `02` and `03` would ship different
first frames — that is `04`. There is no fifth. "The guaranteed-outcome events the shuffle may
not override" is deliberately **not** a sheet: `01` holds the flagship instance and `02` carries
the rest as per-beat preconditions, and a third sheet on the same subject would be two more
claims on one key.

| # | sheet | must decide |
|---|---|---|
| 01 | `first-find` | Hold the `onboarding` key unchanged — the first Find is placed on the patch nearest spawn rather than drawn, `guaranteedFirstRelic` stays true — and restate the placement rule precisely enough that a layout routine cannot violate it; adopted as written, decide nothing new. |
| 02 | `first-minute-beats` | Decide the first minute as an ordered beat list, each beat carrying an id, a ceiling second, the precondition that must hold before it may fire, its guaranteed outcome, and the one concept it carries — and rule explicitly on whether the first reveal may fire before the player has given any input, given the shipped build fires it on the first server tick with none; carry it as a fenced `manifest` block proposing `firstSession` with `"status": "proposed"`, folding in 03's and 04's amendment blocks, with every second either quoted from the brief, inherited from a merged wave-2 sheet, or marked `[playtest unknown]` with a test range. |
| 03 | `teaching-order` | Rank the seven concepts a first session can teach — contact clearing, the Find, the currency, the three upgrade axes, area completion, sets, depth — naming for each the event that teaches it, the observable that proves it landed, and the beat or minute by which it must have landed; name the ones this game deliberately never teaches, rule on whether "no text" holds past second ten and whether the first session says anything about the absent rebirth and idle, and state what a player is allowed to stay confused about given confusion carries no punishment; emit it as a fenced `json` block with `"amends": "firstSession"` supplying a `teaching[]` array, written as comprehension and never as a control, because the verb that spends is unsettled and is not yours. |
| 04 | `run-one-withholds` | Decide, for each surface a run-1 player can see at join — the collection count and its `/ 24` denominator, the currency readout, the three upgrade rows and their costs, the area progress bar, and the collection panel — whether it is present from the first frame or suppressed, and the exact observable event that lifts each suppression, contesting or confirming the shipped default that shows all six at second zero; emit it as a fenced `json` block with `"amends": "firstSession"` supplying a `withheld[]` array of `{ surface, presentAtJoin, liftedBy }`, deciding presence and timing only and never layout, position, wording or appearance. |

## The key this subject needs

`onboarding` exists, is mine, and holds exactly one field: `guaranteedFirstRelic: boolean`
`[research: repo — bridge/schema.mjs:264-270]`. That is the whole of what the contract can say
about a first session, and it cannot hold a beat, a time, a precondition or a suppression.

**`02` proposes `firstSession`**, which would hold: `beats[]` of
`{ id, bySecond, precondition, guaranteedOutcome, teaches }`; `teaching[]` of
`{ concept, taughtBy, byBeat, evidence }` from `03`; `withheld[]` of
`{ surface, presentAtJoin, liftedBy }` from `04`; and the two ceilings the instrumented
measurement needs — seconds to first clear and seconds to first reveal.

**The finding for whoever maintains the schema, stated plainly: this should probably be one key,
not two.** `onboarding`'s doc string is already "What the first session is guaranteed to deliver",
which is precisely what `beats[]` is. The reason I am proposing a second key rather than widening
the first is mechanical, not conceptual: `merge.mjs:127` refuses two sheets asserting one key, and
`01` is shipped and read by `emit-config.mjs:206`, so widening `onboarding` means either editing a
shipped sheet's manifest or having a second sheet claim its key
`[research: repo — bridge/merge.mjs:113-134, bridge/emit-config.mjs:204-207]`. **Two routes are
open and I do not own the choice:** promote `firstSession` as a sibling key, or add
`beats[]`/`teaching[]`/`withheld[]` to `onboarding`'s shape and let `01` fold my sheets'
amendment blocks in the way `theme/vocabulary/02` folds four. The second is cleaner and costs one
edit to a shipped sheet. This is contract-and-seam work, not mine.

## Verification note

**`02` is the sheet most likely to be contradicted, and by two different owners.** First, by
whoever re-decides the purchase verb: `gameplay/mechanics/02` is under revision against
`gameplay/core-loop/01`'s "buying must be reachable from anywhere in the area with no travel",
and if the answer lands anywhere near a place the player walks to, the spend beat gains a
traversal cost and its `bySecond` moves. I have written the assignment so that only the beat's
*timing* is exposed to that, never its content. Second, by number-and-curve work: the second at
which a first purchase becomes affordable is a function of `tiers[].value`, the tier weights and
`upgrades[].costBase`, none of which exists yet, so any `bySecond` on a spend beat is a
requirement awaiting a value and must be marked as one.

**`04` carries the second risk, and it is a capability risk rather than a disagreement.** A
suppression is only real if the surface can be conditionally absent, and `04-PRESENTATION.md`
plus `OPEN.md §4` both record that the persistent HUD is the thing `ui-forge` cannot currently
build; `gameplay/mechanics/03` adds that `hud-overlay` has no `PRESSABLE` readout. If on-screen
surface work or pattern work cannot vary a readout by state, `04`'s list becomes a set of
requirements on a pattern rather than a shipped behaviour. That is worth knowing before it is
written, not after.

**One challenge to my adopted `01`, raised rather than acted on.** `01` is correct that the
first Find must be placed and not rolled, and I am not re-assigning it. But its acceptance
criterion — "a brand-new player reveals a relic within their first three cleared patches" — is
satisfied by the shipped build in a way that breaks the brief's actual sentence: the patch is
inside the clear radius at spawn on the first tick, so the count of *player-caused* clears at the
moment of the reveal is zero, not one. `01`'s ruling stands; the missing precondition is `02`'s
to add, and the fix is a precondition, not a re-placement.

## Research owed

**What `must_verify` asked:** play or watch a first session of the reference and record what it
taught, in what order, and how long before the first payoff. `research/grass-incremental.md`
answers none of the three — it documents the skeleton, the monetization and the CCU decay, and
its "Not verified" list ends at time-to-first-rebirth. So this was fetched fresh.

**What it taught, and in what order** — two independently fetched guides agree:

- The reference's teaching order is **cut → currency → upgrades → rarity → zones → rebirth**.
  The beginner guide's own priority is "Grass Value" then "Grass Growth Speed" then "Blade Size";
  mutations (Silver, Gold, Diamond) are met after upgrades; islands and rebirth come last, with
  its Phase 1 covering the "First Hour"
  `[research: https://www.rosenberryrooms.com/grass-incremental/]`
- The same order restated as the game's own loop: "Cut Grass – Walk through grass blocks to
  collect them, Earn Currency – Each grass block gives you grass currency, Purchase Upgrades –
  Spend grass on improvements, Unlock Rebirths – Reset for permanent multipliers, Access New
  Islands – Discover new upgrade paths"
  `[research: https://www.ofzenandcomputing.com/grass-incremental-tips-tricks/]`
- **The reference has no discovery layer, so it never teaches one.** Its store page describes it
  as "A relaxing lawn-trimming simulator game 🌿 The more you rebirth and upgrade, the more fun
  the game becomes!"
  `[research: https://www.roblox.com/games/133086043677134/Grass-Incremental-Simulator]`
  **This is the finding that matters: the reference's teaching order is exactly the
  economy-first, finds-later alternative `02-GAMEPLAY.md` explicitly declined.** It is not a
  model to copy in order, only in shape, and the item at position 2 is the entire divergence.

**How long before the first payoff:**

- **Structurally, immediately, and that part is sourced.** The player "spawn[s] on a small grassy
  platform with a basic saw blade attached to your character", and grass appears "as green blocks
  that you can walk through to cut and collect"
  `[research: https://www.ofzenandcomputing.com/grass-incremental-tips-tricks/]`; the action is
  "Simply walk through grass blocks to cut them automatically", with no animation or interaction
  `[research: https://www.rosenberryrooms.com/grass-incremental/]`. Tool equipped at spawn,
  standing in the resource, proximity harvest: **the first payoff is the first blade touched.**
  Our design inherits that shape and adds a Find to the same instant.
- **In wall-clock seconds, `[unverified]`.** No source I reached states a measured time to first
  currency or to first upgrade. The two milestone figures I did get are thresholds, not
  durations: a first rebirth "usually around 1,000 grass" and Island 2 after "5 rebirths"
  `[research: https://www.ofzenandcomputing.com/grass-incremental-tips-tricks/]`, and they
  disagree with the other guide's advice to grind "approximately 10-15 rebirths before seriously
  pursuing the second island" `[research: https://www.rosenberryrooms.com/grass-incremental/]`,
  which is a strategy claim rather than a gate. **The specific fetch that would settle it:** a
  transcript or timestamped capture of the first 120 seconds of game id 133086043677134 — the
  "Basic Overview" video at `youtube.com/watch?v=csvIwLzV5eI` is the obvious candidate and
  returned only YouTube's footer chrome, so it needs a transcript API or a human watching with a
  stopwatch. Failing that, joining the place and timing it.
- **One fetch failed the same way the brief's did.** `deltiasgaming.com/roblox-grass-incremental-a-beginners-guide/`
  returned HTTP 405, which is the third source type in this project to 405 on this game. Recorded
  so nobody spends another pass on it.
- **I did not use the Grass Cutting Incremental wiki**, which search surfaces first. That is
  LethalDolphin's sibling game with 5+ nested reset layers, and `research/grass-incremental.md`
  already records one guide conflating the two. Its absence here is deliberate.

**Beyond `must_verify`, because my writer cannot fetch and these are what its sheets have to
justify themselves against:**

- Roblox's own FTUE guidance defines onboarding as "the first few minutes of gameplay that new
  players experience", sets three goals — teach the essentials (both controls and the core loop,
  and both *what* to do and *why*), get to the fun quickly because "New players typically decide
  their interest in a game within minutes", and leave players wanting more via short/mid/long
  goals plus "moments of joy" — and measures it with Day 1 retention and a player funnel that
  shows drop-off at each step. It offers "a guided arrow" as an alternative to dialogue and
  **states no time threshold at all**
  `[research: https://create.roblox.com/docs/production/game-design/onboarding]`
  `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/production/game-design/onboarding.md]`
- Vendor-published benchmarks, useful as direction and **not as measured data** — treat the
  numbers as claims by parties selling retention services. Simulator-specific: "If it is a
  simulator, they should be clicking, collecting, and seeing numbers go up before the first
  minute ends"; comparison points of an obby jumping within 10 seconds and a tycoon placing a
  first machine within 30; "A 15-second mandatory cutscene … can cost you 5% of all new players
  before they ever touch a control"; "Every second of non-gameplay in the first five minutes
  costs you roughly 2-3% of your new player cohort"
  `[research: https://rolearn.dev/guidance/first-week-retention-optimization/]`
- "The most decisive moment in a player's journey is the first 10 seconds" and "50% of your
  traffic is gone within the first two minutes", with advice to show mechanics visually rather
  than in text and to reinforce a new mechanic at least three times with rewards before assuming
  it landed. The ten-second figure independently corroborates the brief's own choice of window,
  which was made without a source
  `[research: https://www.spaceport.xyz/blog/how-to-hook-players-in-the-first-2-minutes-game-retention-tips-for-roblox-devs]`
- Genre benchmarks: simulator D1 32%, D7 14%, D30 6.2%, "from 850+ promoted games | Updated
  March 2026" — the highest D1 of the eight genres listed, attributed to progression loops
  `[research: https://bloxg.com/statistics/roblox-retention-benchmarks]`. Recorded as context
  only: `00-CORE.md` makes beating the retention curve an explicit non-goal, so **no sheet of
  mine may argue from retention.** The three-times-reinforcement claim above is likewise
  context, not licence — this game has one recurring event to reinforce with.
- A live developer case with the shape my `04` is about: 23% D1, 30% of players lost in the first
  minute, and the feedback centred on the first frame being overloaded — "theres like a gazillion
  ui on my screen" — with the advice to "keep it minimal, basic". No forced-tutorial or
  immediate-reward mechanism was recommended
  `[research: https://devforum.roblox.com/t/my-day-1-retention-is-awful-23-losing-half-my-players-in-under-2-minutes-what-am-i-doing-wrong-with-onboarding/4186434]`

**Repo evidence my sheets rest on, read rather than fetched:**

- The guaranteed Find is placed on `indexNearestOrigin(patches)` under the comment "the one the
  player spawns on top of", gated on `GameConfig.GuaranteedFirstRelic`
  `[research: repo — game/src/shared/Layout.luau:127-155]`
- Clearing is a server-tick horizontal XZ distance test (`dx`/`dz` only, no Y), reading no client
  message and using no `Touched` event `[research: repo — game/src/server/Clearing.luau:4-18,161-180]`
- The character is pivoted to the plot's spawn CFrame raised 3 studs on Y, on every
  `CharacterAdded` `[research: repo — game/src/server/init.server.luau:18,55-57]`
- The join-time HUD carries all five readouts plus the progress bar, including `RELICS` at
  `0 / 24` `[research: repo — ui-forge/briefs/hud.brief.json]`
- `onboarding` holds one boolean; a proposal is reported and never merged; one key admits exactly
  one owning sheet, proposals included
  `[research: repo — bridge/schema.mjs:264-270, bridge/merge.mjs:97-134]`
