# Gameplay — category brief

**Wave:** 1. Source: `/Users/zachsmacbook/Desktop/Code/arga/concept/spec/incremental-spinoff-v2/`.
Read `HANDOFF.md` first.

This is an **assignment document.** It contains no gameplay decisions. Every quotation below is
copied from the brief with its original provenance tag attached. Where I have made a ruling, it
is a ruling about *who owns a question*, never about the answer.

**Routing rule you inherit (from `HANDOFF.md`):** read `CONCEPT.md`, `00-CORE.md`, then every
numbered sheet up to and including the deepest layer your work touches. This category spans
layers 1–3, so the floor for every domain here is `CONCEPT.md`, `00-CORE.md`,
`01-FOUNDATION.md`, `02-GAMEPLAY.md`, `03-META.md`, plus `OPEN.md`. Monetization and
Meta & Content additionally need `research/grass-incremental.md`; anyone tempted to
differentiate on theme needs `research/landscape.md`.

**Do not read this document instead of the brief.** It tells you which lines bind *you*. It is
not a summary and it is not authority. If this document and a sheet disagree, the sheet wins.

## Upstream

Nothing. Wave 1 starts from the brief. No approved specs exist yet.

## What the brief binds for this whole category

| constraint | tag | consequence |
|---|---|---|
| "**This game exists to prove the `arga` pipeline works end to end.**" · "Target: the **smallest game that still gives every creative area real work.**" · Non-goals: "Beating the genre's retention curve. Offered and declined." / "Revenue. Offered and declined" | `[brief: binding]` ← `[you chose: R1 Q3]` (`00-CORE.md`) | No domain may add a system to improve retention or revenue. "Would this help retention" is not a valid argument in this project. The success test is that your sheets are usable, not that the game performs. |
| "**The hidden-collection layer, not the noun.**" · "the distinguishing system is objects revealed by harvesting that enter a set-structured permanent index" · "**Consequence downstream:** content design is the primary creative work on this project" | `[brief: binding]` ← `[you chose: R1 Q1]` (`00-CORE.md`) | Distinction is located in one system and may not be relocated. Where effort has to be traded, it is traded *toward* the collection. |
| "**A lap is finishing a space, not hitting a number.**" · "Alternatives declined: farm-until-threshold (the reference's shape), one-find-per-lap, and two interleaved loops." | `[brief: binding]` ← `[you chose: R1 Q2]` (`01-FOUNDATION.md`) | No threshold, quota, or target number may become the unit of progression. An area being complete is the unit. |
| "**Cleared is permanent — overgrowth never returns.** … This is the payoff and it is load-bearing. Slow regrowth and decay-if-you-leave were both offered and declined." | `[brief: binding]` ← `[you chose: R2 Q1]` (`01-FOUNDATION.md`) | Nothing respawns, decays, resets, or is taken back. Any design that needs a renewable resource is out. |
| "**No rebirth.** … Areas *are* the progression. … Reframing it as 'seasons' and making it optional were both declined." | `[brief: binding]` ← `[you chose: R2 Q2]` (`01-FOUNDATION.md`) | Not as an option, not renamed, not as prestige, not as a "new game plus". Reframing was specifically offered and refused. |
| "**No offline accumulation.** Nothing regrows, so nothing can accrue while away. Follows directly from permanence." · `CONCEPT.md`: "Both deliberately cut" | `[brief: binding]` (derived from `[you chose: R2 Q1]`) (`01-FOUNDATION.md`) | No idle income, no away-timer, no welcome-back grant, no "while you were gone" screen. |
| "**Three of the reference's seven systems are gone** — rebirth, offline accrual, and farm-until-threshold progression. … accepted deliberately: *'it's a better game now.'*" | `[brief: binding]` ← `[you chose: R3 Q1]` (`01-FOUNDATION.md`) | These three are the category's hardest boundary. A domain that reintroduces any of them under a new name fails verification. |
| "**Not true procedural generation.** A set of hand-authored area layouts, recombined with randomised object placement and density." | `[brief: binding]` ← `[you chose: R5 Q1]` (`02-GAMEPLAY.md`) | Real procgen "was wanted and consciously traded". Do not re-litigate it inside a domain. |
| "**8–14, mobile-heavy, short sessions.**" · "casual but **genre-literate**" · "10–20 minute active sessions" · "motivated by **collection, relaxation, completion**" | `[brief: binding]` ← `[you chose: R1 Q4]` (`00-CORE.md`) — **except** the "~70% mobile / ~25% desktop / ~5% console" split, which is `[brief: soft]` ← `[I assumed]` | Every cadence claim is measured against a 10–20 minute session. Genre-literate means players *arrive expecting rebirth and idle* and must not find them; that expectation is a communication problem for Theme and Discovery, not a reason to add the systems back. |
| "**Clearing and discovering are one action.** Do not design them as separate systems." · "**Depth is the progression read**" · "**Rarity ladder lives in the overgrowth**, not in a separate drop table" (this last one only: `[I assumed]`) | `[brief: soft]` ← `[you accepted: R2 Q3]`; the rarity-ladder bullet is `[brief: soft]` ← `[I assumed]` | One verb produces both currency and discovery. Splitting them into two systems needs a written reason. The rarity-ladder line is the weakest item on this sheet and is explicitly listed as an inherited assumption in `OPEN.md §5 #1`. |
| "**Input: movement only.** No aiming, clicking, or ability buttons. One thumb. [hold-to-clear and tap-to-swing were both offered and declined]" | `[brief: soft]` ← `[you accepted: step 6 Q3]`, and `OPEN.md §5` records it as **no longer an assumption** | Treat as effectively closed. Gameplay verification checks "every mechanic maps to a verb the brief's control scheme actually supports" and "no system requires an input the brief's control scheme does not have", so a domain that needs a second input breaks two checks at once. |
| "**One currency.**" · "**Known consequence — duplicates have no sink.** … **Constraint on whoever designs systems — solve duplicates without adding a currency.**" · "A duplicate-find currency and a separate discovery currency were both offered and declined." | `[brief: soft]` ← `[you accepted: R5 Q3 → R4 Q3]`, written as an explicit constraint and listed in `HANDOFF.md` as one of six things to know before designing anything | The no-second-currency rule is unusual and load-bearing: both obvious escapes were named and refused. Overruling it means overruling the economy, and that decision comes back to me rather than being taken inside a domain. |
| "**There is no failure state.** No death, no losing, no loss of progress — and with rebirth cut, no voluntary reset either." · "**Zero tension is deliberate.** … Satisfaction comes from before/after and discovery, nothing else. **Consequence: audio and visual feedback carry the entire load** — and nobody downstream should invent tension to fill the gap." | `[brief: soft]` ← `[you accepted: step 6 Q2]`, confirmed and recorded in `OPEN.md §5` as no longer an assumption; the brief states it twice and `HANDOFF.md` a third time | This is the second unusual constraint. A gentle tension source *was offered and declined*, and flagging it as a playtest risk was *also* declined. No timer, no hazard, no soft-fail, no urgency, no scarcity, no "risk of losing the streak". If a domain finds the loop flat, the answer is feedback (Audio, Art, Feedback UI), not stakes. `OPEN.md §6` records it as "possibly correct … entirely unverified" — that is a known risk you inherit, not a licence to fix it. |
| "**~24 objects in 4 sets of 6.**" · "**Each set tied to area depth**" · "**Completing a set grants a permanent bonus**" · "Structure and scale settled here; **the objects themselves are invented downstream.**" | `[brief: soft]` ← `[you accepted: R4 Q4]` (`02-GAMEPLAY.md`) | The shape of the collection is settled. The 24 relics themselves are **Art & Visuals**, and set themes are Meta & Content. No Gameplay domain names a relic. |
| "**Three axes:** value per unit, clear radius, and move speed." · "Relic luck as a fourth axis was offered and declined." · "Spawn rate … is meaningless here: nothing respawns." | `[brief: soft]` ← `[you accepted: step 6 Q1]`, recorded in `OPEN.md §5` as no longer an assumption | Three axes, named. Note the collision to resolve, not ignore: `03-META.md` lists "relic luck" among *allowed paid multipliers* while `02-GAMEPLAY.md` declines it as an earned axis. Systems and Monetization must not each quietly assume the other's reading. |
| "**Shared server, parallel progression, own areas, no mechanical interaction.**" · "Everyone occupies one world clearing their own patch, visible to each other. Social proof at zero systems cost." · "**Server size:** 12–20. `[I assumed — no source]`" | `[brief: soft]` ← `[you accepted: R6 Q2]`; server size `[brief: soft]` ← `[I assumed]` | Shared areas are explicitly avoided because permanence would make them shared persistent world state. "Co-op clearing and visitable restored ruins were both offered" and the latter is priority 2, i.e. not this project. |
| "**Permanent multipliers only. Never content access.**" · "**Forbidden:** any paid area, relic, or set. **A paid-only object would turn 100% completion into a purchase**, which poisons the differentiating system." · "Cosmetics-only was offered and declined as needing a display system first." | `[brief: soft]` ← `[you accepted: R5 Q4]` (`03-META.md`) | The forbidden half is stated as a hard limit with a stated reason. The multiplier list is "clearing value, radius, move speed, relic luck". |
| "**Clear → reveal inside the first ten seconds.** … the first patch they clear has something under it. No text, no tutorial." · "**Requires a guaranteed find in the starting area** — the shuffle must not be allowed to decide this one." | `[brief: soft]` ← `[you accepted: R6 Q3]` (`02-GAMEPLAY.md`) | The genre-standard alternative (economy first, finds later) "was explicitly declined". The guaranteed find is a constraint on the shuffle system, so it binds Meta & Content and Systems as well as Onboarding. |
| Objectives ladder: moment "clear the patch in front of you" · session "**find at least one new relic**" · short-term "complete one set" · long-term "complete all four sets / 24 of 24" · mastery "*none designed*" | `[brief: soft]` ← `[you accepted: R6 Q3 → R5 Q3]`; "No mastery layer" is `[brief: soft]` ← `[I assumed]` and reads "Stated so nobody invents one" | "**With endless areas, the collection is the only finishable thing** — which is why every objective scope hangs off it." The session objective is a *measurable commitment* — "collection count rose this session" — and it is the one the brief says can silently fail. |
| "**Tuning burden:** discovery rates must be generous enough that a typical session yields at least one find, or the stated session objective silently fails. **This is the highest-risk tuning in the game**" | `[brief: binding]` as a stated risk (`03-META.md`); the *rates* are open | Named as the single highest-risk number in the game, and `HANDOFF.md` repeats it as the highest-risk open item. It has to be arithmetic against the 10–20 minute session, not vibes. |
| "**An unfinished area and a half-empty index.**" as the return hook · "**Honest weakness:** without banked offline earnings, the pull to return is materially weaker than the reference's. That was the accepted trade for permanence." · "doing nothing at all was offered and declined, so **there is a retention brief — just a cheap one.**" | `[brief: soft]` ← `[you accepted: R3 Q3]` (`03-META.md`) | Retention exists as a requirement but the two standard instruments are gone (offline accrual is cut; daily rewards are priority 3). Read this together with Core Loop's scope note below. |
| "**Hard constraint: rarity tiers must differ by shape or silhouette, not only hue.**" · "Tier is a core economic signal, so a player who cannot read it cannot see the game working. **This is a requirement, not a nicety**" | `[brief: soft]` ← `[you accepted: R6 Q4]` (`04-PRESENTATION.md`), and `HANDOFF.md` lists it among six pre-design facts | Layer 4 and owned by Art & Visuals, but it binds this category because tier is an *economic* signal, not a decorative one. Any Gameplay domain that leans on tier as information must say so, so Art knows the signal is load-bearing. Gameplay does not choose the shapes. |

## Scope gate

`03-META.md` priority 3, quoted in full:

> **Priority 3 — explicitly not in this project:**
> real procedural generation · rebirth · offline accrual · codes · daily rewards ·
> leaderboards · trading · seasons and events.

**No domain in this category may name, imply, build fiction around, reserve space for, or spec
a "future home" for any of those eight things.** Not as a stub, not as a hook, not as a
commented-out option, not as "if we ever add X". A spec that mentions one of them as a
placeholder still forces every downstream reader to decide what to do with it, which is the
cost the exclusion exists to avoid.

**Also excluded, from priority 2 rather than 3 — same instruction, different reason:**

> **Priority 2 — after it works:** richer authored chunk variety · a duplicate-handling
> refinement · visitable restored ruins.

Priority 2 is "not now", not "never". A domain may state that its design leaves room for a
priority-2 item **without specifying that item**. Note specifically that "a duplicate-handling
refinement" is priority 2, which means priority 1 needs a duplicate answer that stands on its
own (see Systems).

**Priority 1, so this is the fence your work has to fit inside:**

> proximity clearing · area-completion detection · three clearing upgrades · the 24-relic
> 4-set collection · chunk shuffling for endless areas · guaranteed first-area find.

**The one honest caveat on the gate, relayed rather than smoothed:** the priority ordering
itself is tagged
`[I assumed — the ordering; scope was resolved through R4 Q1 and R5 Q1 but no explicit priority
list was interviewed]`, and `OPEN.md §5 #7` lists it as an assumption inherited by "everyone".
The authority behind the list is therefore **uneven**:

- **rebirth**, **offline accrual** and **real procedural generation** are independently binding
  from `[you chose: R2 Q2]`, `[you chose: R2 Q1]` and `[you chose: R5 Q1]`. The priority list is
  not what excludes them. They are closed.
- **codes, daily rewards, leaderboards, trading, seasons and events** rest on the `[I assumed]`
  ordering alone. **Treat all six as excluded anyway.** If a domain believes one is genuinely
  required by something the brief already committed to, it does not decide that; it writes the
  argument and sends it to me, and I take it up. Verification will read that as an escalation,
  not a gap.

## Domain assignments

Eight domains across four internal stages. Gameplay verification runs once per stage and
**stage N must clear before stage N+1 spawns**, so a stage-2 lead is reading approved stage-1
specs, not guessing at them.

| stage | domains | gated on |
|---|---|---|
| 1 | Core Loop | nothing — starts from the brief. **This wave.** |
| 2 | Systems · Mechanics · Multiplayer & Social | Gameplay Stage 1 Approved |
| 3 | Meta & Content · Monetization · Onboarding | Gameplay Stage 2 Approved |
| 4 | Balance & Tuning | Gameplay Stage 3 Approved. This is the gate the rest of the pipeline waits on. |

**Only stage 1 is being acted on in this wave.** Stages 2–4 are written here because the
assignment should exist once and because a stage-1 lead needs to know what it is *not* deciding.

### The rule that crosses all eight domains: numbers

Verification checks: "**every economy, pacing or progression number appears in Balance & Tuning
and nowhere else** — a domain may state a requirement on a number it does not set."

So the pattern for every domain in stages 1–3 is: **state the requirement, name the quantity,
give the unit, do not give the value.** "Area completion must land inside a 10–20 minute
session" is yours. "An area is 340 units of overgrowth" is not. Write the requirement in a form
Balance can satisfy or contradict, because a requirement Balance cannot test is a requirement
Balance will ignore.

**This overrides one line in the brief, and you should know why.** `OPEN.md §4` assigns "All
curves: upgrade costs, density scaling by depth, area sizing" to **Core Loop**, and "discovery
rates per depth tier" to **Meta & Content**. That table was written against the lineup in
`HANDOFF.md`, which has no Balance & Tuning domain at all and which the brief itself labels
"**volatile, not structural**". My ruling: those `OPEN.md §4` rows mean **Core Loop and
Meta & Content own the *shape, direction and acceptance test* of those curves; Balance & Tuning
owns the *values*.** Nobody loses the question, and the number lands in one table.

### Two other places the brief's routing does not match this lineup

- **Onboarding** appears in `02-GAMEPLAY.md` routing as *[currently: UI/UX + Onboarding]* but is
  absent from the `HANDOFF.md` lineup list. It is a real domain here, at stage 3.
- **Balance & Tuning** appears nowhere in the brief. It is new. Every domain should assume its
  numbers requirements will be read by an agent that has read all of stages 1–3 and will notice
  contradictions between them.

---

### 01 · Core Loop Lead → `/Users/zachsmacbook/Desktop/Code/arga/cid/gameplay/core-loop/_lead.md`

**Stage 1. Running now. Everything else in this category waits on your approved specs.**

**Latitude: narrow on structure, wide on rhythm.** The loop's five steps, its unit of
progression, and its permanence are all `[you chose]` and closed. What the brief does *not*
have is any account of **when payoffs land and how they feel spaced**, and that is your entire
job. `01-FOUNDATION.md` hands it to you by name:

> Left open — how long an area should take, the cost curve on clearing upgrades, how density
> scales with depth, and where the pacing dead-spots are. *[currently: Core Loop]*

**The loop as the brief states it, so you do not restate or re-derive it** (`01-FOUNDATION.md`,
the five-row table, `[you chose ×4]`: R1 Q2, R2 Q1, R2 Q2, R3 Q1 — the most heavily interviewed
item in the entire spec, 4 direct questions):

> 1 move through overgrowth; it clears on contact → currency, scaled by the overgrowth's tier
> 2 keep clearing until the **area is completely clear** → every buried object in it, revealed
> 3 revealed objects enter the permanent collection → set progress; a completed set grants a permanent bonus
> 4 spend currency on clearing-speed upgrades → faster clearing of the next area
> 5 move to a deeper area → denser overgrowth, rarer relics

And how it closes, also stated:

> **How it closes:** faster tools from step 4 make the next area's completion reachable, and
> deeper areas hide the sets that are still incomplete. The collection is the thing that
> persists across laps.

Verification checks "the loop closes: the last step feeds the first". The brief has already
closed it. Your job is not to re-close it; it is to establish the **cadence** at which it
closes.

**Constraints that bind you specifically:**

- Every constraint in the category table above, in particular the three cuts, permanence, and
  zero tension.
- **Your `owns` line includes "tension vs downtime across a session".** For this game, tension
  is fixed at zero by `[you accepted: step 6 Q2]` and the brief instructs that "nobody
  downstream should invent tension to fill the gap". So that half of your remit is
  **pre-answered**, and what remains of it is the *downtime* half: pacing without stakes. Say
  plainly in your index that tension is zero and that you are not designing any, so verification
  does not read the absence as an omission.
- **Your `owns` line also includes "streaks, dailies, and other pull-back hooks". Priority 3
  excludes "daily rewards".** Combined with "No offline accumulation", two of the three
  instruments named in your own remit are unavailable. The brief's answer to return-pull is
  already on record — "**An unfinished area and a half-empty index**" `[you accepted: R3 Q3]` —
  along with its own admission that this is "materially weaker than the reference's". Your job
  here is to state what the return hook *is* given the instruments you have, not to reach for a
  banned one.
- **You do not own the systems that deliver payoffs** (Systems, stage 2) or the content volume
  they are drawn from (Meta & Content, stage 3). You are setting the rhythm they must hit.
- Session length: "10–20 minute active sessions" `[brief: binding]` ← `[you chose: R1 Q4]`. Every
  cadence claim you make is checkable against that window, and should be written so it is.

**What is genuinely open and yours:**

- The **shape** of the earn→spend→gain cadence: how many payoff events a 10–20 minute session
  should contain, of what kinds, and in what relative sizes.
- The **shape** of the upgrade cost curve and of density-scaling by depth — direction, curvature,
  and the acceptance test. Not the coefficients.
- The **relative** sizing of an area at depth 1 versus depth N. Ratios and orderings are yours;
  absolute values are Balance & Tuning's.
- Where the **pacing dead-spots** are, and what a dead-spot means in a game with no failure
  state. The brief names dead-spots as open and offers no theory of them.
- The distinct **payoff kinds** the loop already contains: a currency tick, a relic reveal, an
  area completion, a set completion, an upgrade purchase. Their relative weight and frequency is
  yours. `OPEN.md §2` records an audio default that already treats reveal and completion as "the
  two emotional peaks" — that is Audio's default, overridable, and you are the domain whose
  cadence decides whether it holds.

**Two things you must know are holes rather than oversights:**

1. **Lap length is unsourced and the brief says so out loud** (`01-FOUNDATION.md`):

   > **Lap length: unknown, and deliberately so.** The reference's pacing could not be verified
   > across three source types — one 405'd, one gave a level gate rather than a duration, and
   > that same guide is probably describing the sibling game. **This design's lap is an area, not
   > a rebirth cycle, so the reference's number would not have transferred anyway.**

   Your node's `must_verify` is: "Verify payoff cadence against a shipping game rather than
   intuition. The brief flags its own lap-length number as unsourced across three source types,
   so this is a known hole, not an oversight." Two consequences. First, **do not go looking for
   the reference's rebirth-cycle length and treat finding it as a fix** — the brief has already
   ruled it non-transferable. Go find cadence data for *completion-shaped* games. Second, if you
   cannot source it, the honest output is a stated target with an explicit `[playtest unknown]`
   and a test range, which is exactly the form Balance & Tuning is required to accept.
   `OPEN.md §2` already nominates "average time to complete an area" as measurement item (2),
   described as "the pacing number nobody could source". That is your number, and it is
   instrumented.

2. **Your inherited assumption.** `OPEN.md §5 #2`: "Escalation is tool-power →
   time-and-patience", from `01-FOUNDATION.md`:

   > **Escalation — lap 1 vs lap 100:** early areas are small and sparse, later areas are large
   > and dense, so the binding constraint moves from *tool power* to *time and patience*.
   > `[I assumed — extrapolated from depth-based areas; not interviewed]`

   `OPEN.md §5` names **Core Loop** as the inheritor. This is `[brief: soft]` and it is the one
   place in your domain where you can overrule the brief with a reason. Note what it implies if
   you keep it: late-game difficulty is *duration*, in a game whose audience plays 10–20 minutes.
   Whether that survives contact with the session length is a question the brief never asked.

**A gap that is yours to name and share:** the session objective is "find at least one new
relic", and there are exactly 24 relics. After 24/24, the session objective is unsatisfiable and
the brief says nothing about what the game is then. Flag it in your index; Meta & Content (stage
3) owns what content exists past completion. Do not solve it by inventing content.

---

### 02 · Systems Lead → `/Users/zachsmacbook/Desktop/Code/arga/cid/gameplay/systems/_lead.md`

**Stage 2. Gated on Gameplay Stage 1 Approved.**

**Latitude: medium, and unevenly distributed.** Roughly half your standard remit is empty for
this game and one item in it is the hardest single problem in the category.

**Empty or excluded by the brief, so do not spec them and do say they are empty:** pets, units,
minions (nothing in the brief has them); crafting, building, tycoon output (none); **player-to-player
exchange** — "trading" is priority 3 and the social model is "no mechanical interaction". Your
real surface is: the persistent power track, the single currency, the collection index, and
duplicates.

**Settled for you, quote it rather than re-decide it:**

- Economy shape (`02-GAMEPLAY.md`, `[you accepted: R5 Q3 → R4 Q3]`): "**One currency.**" with one
  faucet, "clearing overgrowth, scaled by tier", and one sink, "clearing-speed upgrades".
  "Rebirth currency existed to serve a reset layer that was cut, so removing it is consistency
  rather than simplification."
- The power track (`02-GAMEPLAY.md`, `[you accepted: step 6 Q1]`): "**Three axes:** value per
  unit, clear radius, and move speed." Plus "Spawn rate — the reference's third axis — is
  meaningless here: nothing respawns."
- The collection's structure (`02-GAMEPLAY.md`, `[you accepted: R4 Q4]`): "**~24 objects in 4 sets
  of 6**", "**Each set tied to area depth**", "**Completing a set grants a permanent bonus** —
  this is what makes the collection progression rather than a checklist, and it supplies
  milestones between 0% and 100%." What each set *grants* is Meta & Content, stage 3.
- Verification will check "every currency has at least one faucet and one sink" and "every reward
  granted anywhere has a source system". With one currency that is easy; the second half is not,
  because set-completion bonuses and permanent multipliers are rewards whose *source system* is
  yours to name.

**The hard one, and it is yours** (`02-GAMEPLAY.md`, and `OPEN.md §4` names Systems as owner):

> **Known consequence — duplicates have no sink.** A 24-object roster with depth-tiered sets
> guarantees repeat finds, and there is no second currency to convert them into.
> **Constraint on whoever designs systems — solve duplicates without adding a currency.**

`HANDOFF.md` lists this as one of six things to know before designing anything: "**Duplicate
relics must be solved without adding a currency.**" Both obvious escapes — "a duplicate-find
currency and a separate discovery currency" — "were both offered and declined". And note the
scope gate: "a duplicate-handling refinement" is **priority 2**, so priority 1 needs an answer
that works unrefined. This is the single most constrained open problem in the category and the
reason your domain is not thin.

**Also genuinely open and yours:**

- Whether relic rarity and overgrowth tier are **one axis or two**. `01-FOUNDATION.md` asserts
  "**Rarity ladder lives in the overgrowth**, not in a separate drop table" but tags it
  `[I assumed — carried from the reference's model; not interviewed]`, and `OPEN.md §5 #1` names
  **Systems** (with Art) as the inheritor. Meanwhile `02-GAMEPLAY.md` says of relic sets that
  "rarity and location are one axis, so there is one concept to learn rather than two". Whether
  those two statements describe one ladder or two is not resolved anywhere. Resolve it explicitly
  or Art and Meta & Content will each assume differently.
- The **collection index as a system**: what a discovery record is, what state it holds, what
  "permanent" means operationally. Note that "Left open — … how the index is first surfaced" is
  UI/UX's, and what the index *looks* like is Art's. You own what it *is*.
- Whether set-completion bonuses and paid multipliers **stack on the same three axes**, and
  whether they are the same kind of object. You define the stacking model; **Balance & Tuning
  sets caps and factors.**
- The **relic-luck contradiction** flagged in the category table: declined as an earned fourth
  axis in `02-GAMEPLAY.md`, listed as an allowed paid multiplier in `03-META.md`. If paid relic
  luck exists, something in your system has to be luck-shaped. Name that or Monetization (stage
  3) will be specifying a multiplier on a quantity that does not exist.

**Not yours:** the verbs that drive systems (Mechanics, same stage — coordinate through me, not
directly); any value (Balance & Tuning); how any of it is stored or replicated (Tech & Data). On
that last point, `OPEN.md §2` flags "**Per-area cleared state is the unusual one** — permanence
means the world itself is save data, which grows without bound unless areas are collapsed to a
completion flag once finished." That is Tech & Data's problem, but if your persistence claims
assume unbounded per-area detail, you are writing them a bill. State what must persist; let them
decide how.

---

### 03 · Mechanics Lead → `/Users/zachsmacbook/Desktop/Code/arga/cid/gameplay/mechanics/_lead.md`

**Stage 2. Gated on Gameplay Stage 1 Approved.**

**Latitude: very narrow on the verb list, wide on feel.** The brief has fixed the input, the
core verb, and the absence of every other verb. What it has not specified at all is what
clearing *feels* like, and that is where your work is.

**Settled, quoted** (`02-GAMEPLAY.md` mechanics table):

> | proximity clearing | core | contact clears overgrowth. No click, no aim, no timing `[research]` |
> | **area completion** | core | an area is *done* when fully cleared — this is the lap `[you chose: R1 Q2]` |
> | **buried objects** | **the differentiator** | revealed by clearing; enter a permanent index `[you chose: R1 Q1]` |
> | clearing-speed upgrades | core | see economy below |
> | rarity tiers on overgrowth | supporting | denser/rarer material pays more `[I assumed — carried from the reference]` |
> | chunk shuffling | supporting | authored layouts recombined with randomised placement `[you chose: R5 Q1]` |
> | ~~rebirth~~ | **cut** | `[you chose: R2 Q2]` |
> | ~~offline accumulation~~ | **cut** | follows from permanent clearing |

Input, `[brief: soft]` ← `[you accepted: step 6 Q3]` but recorded in `OPEN.md §5` as no longer an
assumption: "**Input: movement only.** No aiming, clicking, or ability buttons. One thumb.
[hold-to-clear and tap-to-swing were both offered and declined]". Device: "mobile-first,
~70/25/5" `[you accepted: step 6 Q4]`.

The one feel statement the brief makes, and it is soft: "**Feel:** reach is the primary
sensation — a wider tool must visibly sweep more per step. `[I assumed]`"

**Explicitly handed to you** (`02-GAMEPLAY.md`, and `OPEN.md §4`):

> Left open — clear-on-contact feedback, whether any input beyond movement exists, and how an
> area's "completely clear" moment is celebrated. *[currently: Mechanics]*

Note that "whether any input beyond movement exists" is listed as open **while the input line is
`[you accepted]` and two alternatives were declined.** Relaying that honestly: you have the
latitude to argue for a second input, and you are arguing against a step-6 confirmation plus two
declined options plus two verification checks. The bar is high, not infinite.

**What is genuinely open and yours:**

- Clear-on-contact **feedback semantics** — what the player perceives at the moment overgrowth
  goes away. Not the particles (Art & Visuals — VFX), not the sound (Audio — SFX), not the toast
  (UI/UX — Feedback UI). The *behaviour* they attach to. Given zero tension, this is the primary
  load-bearing sensation in the game.
- The **area-completion moment** as a mechanic: what event fires, what state changes, what the
  player can and cannot do during it.
- How **reveal** reads as an action distinct from clearing while remaining the same verb —
  `01-FOUNDATION.md` binds "Clearing and discovering are one action. Do not design them as
  separate systems", which is a constraint on systems, not a prohibition on the reveal being
  perceptually distinct.
- **Movement as the only verb**, taken seriously: what movement affordances exist inside an area,
  and what "clear radius" means as a physical behaviour rather than a stat.

**One cross-domain question I am assigning to you, because Monetization is blocked on it.**
`03-META.md` records:

> **Note the tension:** with no whale-tool ladder equivalent decided, the high-price SKU has no
> obvious home yet.

`OPEN.md §6` repeats it as one of three sweep findings: "**The premium SKU has no home.**
Monetization is multipliers-only, but the reference's high-price item was an oversized *tool* and
no tool ladder was specified here." The unasked question underneath is **whether a "tool" is a
thing the player holds and sees at all, or purely an abstraction over three stat axes.** That is
a mechanics question, it sits at stage 2, and Monetization at stage 3 cannot resolve its premium
SKU without an answer. **Answer it in your index explicitly, either way.** You are not deciding
what is sold; you are deciding whether tools are objects.

---

### 04 · Multiplayer & Social Lead → `/Users/zachsmacbook/Desktop/Code/arga/cid/gameplay/social/_lead.md`

**Stage 2. Gated on Gameplay Stage 1 Approved. This domain is thin, and that is a decision, not
neglect — see the thin-domains section below.**

**Latitude: one real question, and a strong prior against most of your standard remit.**

**Settled** (`02-GAMEPLAY.md`, `[you accepted: R6 Q2]`):

> **Shared server, parallel progression, own areas, no mechanical interaction.**
> Everyone occupies one world clearing their own patch, visible to each other. Social proof at
> zero systems cost.
> **This choice avoided a hard problem:** areas are *permanently* cleared, so shared areas would
> mean shared persistent world state. Co-op clearing and visitable restored ruins were both
> offered — the latter is the strongest future option, since restoration is inherently something
> you would want to show off.

> - **Server size:** 12–20. `[I assumed — no source]`
> - **Interaction:** none mechanical.

**Excluded from your remit, and you should say so rather than leave it ambiguous:**
leaderboards and trading are **priority 3**. Teams, guilds and shared goals require mechanical
interaction, which is refused. PvP has no verb to run on (movement only, no failure state).
"Visitable restored ruins" is **priority 2** — named as "the strongest future option", which is
precisely why it is not yours to spec now.

**The one thing genuinely open, handed to you by name** (`02-GAMEPLAY.md`, `OPEN.md §4`):

> Left open — whether presence alone suffices, and the cheapest warmth-adding touch if not.
> *[currently: Social]*

**"Whether presence alone suffices" is a real question and answering "yes" is a legitimate
output.** If you answer no, the brief's own framing binds the answer's shape: "the cheapest
warmth-adding touch", at "zero systems cost", with no mechanical interaction, no ranking, and
nothing that reintroduces tension or competition. That is a narrow needle and you should thread
it or decline it, not widen it.

**Also yours, and it is the only number-adjacent item here:** the server-size figure is
`[I assumed — no source]` and `OPEN.md §5 #4` names **Social and Tech & Data** as inheritors. You
own the *requirement* — what social read the game needs a server population to produce, and what
breaks if it is 8 or 40. Balance & Tuning and Tech & Data own the figure. Also note "visible to
each other" is asserted with no statement of *what* is visible: chat is a Roblox default surface
and the brief never rules on it. Name it.

**Not yours:** out-of-game community management and moderation (Live Ops — Community).

---

### 05 · Meta & Content Lead → `/Users/zachsmacbook/Desktop/Code/arga/cid/gameplay/meta/_lead.md`

**Stage 3. Gated on Gameplay Stage 2 Approved. This is the largest job in the category.**

`00-CORE.md` states it directly: "**Consequence downstream:** content design is the primary
creative work on this project, not art or marketing." Read your assignment as the one that gets
the most attention, and note the corollary — **under-scoping here is the failure mode the brief
has already pointed at.** Your node's `must_verify` says so: "Check content volume at launch
against two shipping games in the genre. Under-scoping content is the most common reason a
correct loop still fails."

**Settled for you, so do not re-decide:**

- World shape (`03-META.md`): "**Areas, not zones.** Discrete spaces that are cleared and
  permanently done." · "**Depth is progression** — deeper areas are larger, denser, and hide
  rarer sets." · "**Endless via shuffled authored chunks**, not generation. `[you chose: R5 Q1]`"
- Collection structure: "**~24 objects in 4 sets of 6**", "**Each set tied to area depth**",
  "**Completing a set grants a permanent bonus**" `[you accepted: R4 Q4]`.
- The objectives ladder in `03-META.md` `[you accepted: R6 Q3 → R5 Q3]`, including
  "**With endless areas, the collection is the only finishable thing** — which is why every
  objective scope hangs off it", and the declined alternatives: "restoring one hero landmark
  (fights endless generation), reaching the deepest layer (weak without something at the bottom),
  and no long-term objective at all."
- Replayability `[you accepted: R3 Q3]`: "**An unfinished area and a half-empty index.**"
- "**No mastery layer.** `[I assumed]` There is no execution skill in proximity-clearing to
  master. **Stated so nobody invents one.**" `OPEN.md §5 #5` names you as the inheritor. It is
  soft, and the instruction attached to it is not.
- **Your `owns` line includes "endgame, rebirth, reasons to return".** Rebirth is cut
  `[you chose: R2 Q2]`. Reasons to return are already answered above. So that third of your remit
  reduces to **endgame**, which is where your genuinely unanswered question lives.

**Explicitly handed to you** (`02-GAMEPLAY.md`, `03-META.md`, `OPEN.md §4`):

> Left open — set themes, what each completed set grants, discovery rates per depth tier.
> *[currently: Meta & Content]*
> Left open — what the ruin actually is, how chunks are themed by depth, and how many authored
> layouts are needed before shuffling stops feeling repetitive.
> *[currently: Meta & Content + Theme & Narrative]*

Split that last one: **what the ruin actually is** is Theme & Narrative's, not yours. **How
chunks are themed by depth** is shared — you own the depth structure and the number of distinct
looks required; they own what the themes mean. **How many authored layouts before shuffling feels
repetitive** is yours as a requirement with a test; the count itself is a number, so it lands in
Balance & Tuning.

**The highest-risk item in the whole category is yours** (`03-META.md`):

> **Tuning burden:** discovery rates must be generous enough that a typical session yields at
> least one find, or the stated session objective silently fails. **This is the highest-risk
> tuning in the game** and it is the same risk the previous run identified.

`HANDOFF.md` escalates it further: "Highest-risk item: **discovery rates per depth tier** — the
session objective is 'find one new relic', so if rates are too low that objective silently
fails." You do not set the rates. You **state the constraint they must satisfy**, in a form
Balance & Tuning can check: 24 relics, 4 depth-tiered sets, a 10–20 minute session, and a
requirement that a typical session yields at least one *new* find. That arithmetic has never been
done in this project. Do it, and hand the inequality over rather than the number.
`OPEN.md §2` already instruments it as measurement item (3), "set-completion rate per set".

**Also open and yours:**

- **What "endgame" is at 24/24.** Every objective hangs off a collection that finishes, in a world
  that does not. The brief never says what the game is after the last relic. Core Loop will flag
  the same hole from the other side. It is yours to answer, inside the scope gate — which means
  not with rebirth, not with seasons, not with leaderboards.
- **The gating question.** `03-META.md`: "**No gating mechanism needed** — with rebirth cut, depth
  is reached by clearing, not by hitting a threshold. `[I assumed — follows from cutting rebirth;
  not interviewed]`", and `OPEN.md §5 #3` names you as inheritor. "Reached by clearing" does not
  say *what* makes the next area available, or how many areas exist at launch, or whether depth
  is a line or a branch. That is content structure, and it is yours.
- **What each completed set grants.** Systems (stage 2) will have defined the stacking model; you
  choose what the four bonuses *are* in kind. Their magnitudes are Balance & Tuning's.

**Not yours:** how zones look (Art & Visuals — Environment); when content releases post-launch
(Live Ops — Roadmap); the relics themselves — `02-GAMEPLAY.md` says "Also left open — what the 24
relics actually are. *[currently: Art & Visuals]*". You own set *themes* and depth assignment;
Art owns the objects. Coordinate through the category boundary, not around it.

---

### 06 · Monetization Lead → `/Users/zachsmacbook/Desktop/Code/arga/cid/gameplay/monetization/_lead.md`

**Stage 3. Gated on Gameplay Stage 2 Approved. Thin by decision — see the thin-domains section.**

**Latitude: the stance is closed, the ladder is open, and one structural question is unresolved
upstream of you.**

**First, the framing you must not lose:** `00-CORE.md` lists "Revenue. Offered and declined — the
genre demonstrably earns, and that is not why this is being built." among the **non-goals**
`[you chose: R1 Q3]`. You are specifying a monetization surface because a shipped Roblox game has
one and because it gives this pipeline stage real work — not to maximise anything. That should
change how you argue.

**Settled** (`03-META.md`, `[you accepted: R5 Q4]`):

> **Permanent multipliers only. Never content access.**
> - **Allowed:** permanent multipliers on clearing value, radius, move speed, relic luck.
> - **Forbidden:** any paid area, relic, or set. **A paid-only object would turn 100% completion
>   into a purchase**, which poisons the differentiating system.
> - Matching the reference exactly was offered and declined precisely because it leaves paid
>   content gating open. Cosmetics-only was offered and declined as needing a display system
>   first.

The reference data point, sourced: "The reference sells only 2x multipliers plus a 2,500-Robux
oversized tool, zero cosmetics, across 38M visits at a 96% like ratio.
`[research: research/grass-incremental.md]`"

**Explicitly handed to you** (`03-META.md`, `OPEN.md §4`):

> Left open — the SKU ladder, price points, and where a premium item sits given no tool ladder
> was specified. *[currently: Monetization]*

**Your blocked dependency, and how it clears.** The premium-SKU hole is a real gap
(`OPEN.md §6`), and its root cause is that no tool ladder exists. I have assigned **Mechanics
(stage 2)** the question of whether a tool is a held object or an abstraction over three stat
axes. Read their approved spec before you design the top of your ladder; if they answered "pure
abstraction", then the reference's 2,500-Robux oversized tool has no analogue here and your top
SKU has to be shaped differently. Do not invent a tool ladder yourself — that is Mechanics and
Systems territory, and building a SKU on it would make monetization the tail wagging the systems
dog.

**Also note, and resolve rather than assume:** "relic luck" is an *allowed paid multiplier* in
`03-META.md` while `02-GAMEPLAY.md` declines relic luck as an earned axis
`[you accepted: step 6 Q1]`. Check what Systems (stage 2) concluded. If nothing in the game is
luck-shaped, a relic-luck multiplier has no quantity to multiply. Also check it against the
Forbidden clause yourself: a multiplier on relic discovery is the closest legal thing to buying
access to the collection, and the brief's stated reason for the ban — completion must not be
purchasable — is the test to apply.

**What is genuinely open and yours:** the SKU ladder's rungs, what each offer *is*, the offer
mix, and which of the four allowed multiplier targets are sold at all. **Price points are numbers
and belong to Balance & Tuning** — but your node's `must_verify` still applies to you: "Fetch
current price points from at least two shipping games in the genre before setting any price.
Robux pricing conventions shift and recalled numbers are usually stale." Do the research, hand
the sourced range and the price-to-value ratios you require to Balance & Tuning, and let the
final figures land in their table.

**Not yours:** how offers appear on screen (UI/UX — Store UI); season pass scheduling (Live Ops —
Seasons, and note seasons are priority 3 anyway, so there is nothing to hand over).

---

### 07 · Onboarding Lead → `/Users/zachsmacbook/Desktop/Code/arga/cid/gameplay/onboarding/_lead.md`

**Stage 3. Gated on Gameplay Stage 2 Approved.**

**Latitude: the first beat is pre-decided, the rest of the first minute is empty.**

**Settled, and it is unusually specific** (`02-GAMEPLAY.md`, `[you accepted: R6 Q3]`):

> **Clear → reveal inside the first ten seconds.**
> The player spawns touching overgrowth, and **the first patch they clear has something under
> it.** No text, no tutorial. This front-loads the differentiator instead of hiding it behind a
> grind — the genre-standard alternative (economy first, finds later) was explicitly declined
> because a new player could quit before ever seeing what makes this game different.
> **Requires a guaranteed find in the starting area** — the shuffle must not be allowed to decide
> this one.

That last line is the clearest example in the brief of your `owns` item "the guaranteed-outcome
events the shuffle may not override". It is priority 1 ("guaranteed first-area find"), so it
ships. Your job includes stating it as a constraint on the shuffle system precisely enough that
Meta & Content and Tech & Data cannot accidentally violate it.

**Explicitly left open** (`02-GAMEPLAY.md`):

> Left open — the actual first-minute choreography and how the index is first surfaced.
> *[currently: UI/UX + Onboarding]*

Split it: **the beat sequence and its timing are yours; the screens and callouts that deliver it
are UI/UX's** (Screens, Feedback UI). "How the index is first surfaced" is shared — you own
*when* in the sequence it appears and what the player must have understood by then; they own the
surface.

**What is genuinely open and yours:**

- Beats 2 through N of the first minute. The brief specifies second ten and nothing after.
- **Teaching order** for the things that exist: contact clearing, currency, three upgrade axes,
  area completion, the collection index, sets, depth. Seven concepts, no text, one thumb, an 8–14
  audience. That ordering is the substance of your domain.
- **What is deliberately withheld on run 1.** Nothing in the brief withholds anything, which means
  the default is that a first-minute player is shown everything at once. Contest that or confirm
  it.
- What must be understood **before** the player is allowed to be confused — noting that with no
  failure state, confusion has no punishment attached, which changes what onboarding is *for*
  here. The brief never makes that observation; it is yours to make.

**Constraints that bind you specifically:**

- "No text, no tutorial" is part of the settled quote. If you need text, you are overruling a
  `[you accepted]` and must say so and why. Note that `04-PRESENTATION.md` records a *declined*
  extension: "extending to a text-free comprehension rule, which was offered as the broader
  version" was declined — so text is not banned game-wide, but it is absent from the onboarding
  line specifically.
- Genre-literate players "expect rebirth to behave the way it always does" and will not find it.
  The brief says the genre change is "Said plainly because genre-literate players will otherwise
  arrive expecting rebirth and idle and not find them" (`CONCEPT.md`). Whether the first session
  is where that expectation gets corrected is a real question in your domain. Communicating it
  outside the game is Discovery & Marketing's.
- Your node's `must_verify`: "Play or watch a first session of the reference game and record what
  it taught, in what order, and how long before the first payoff. Onboarding is the item most
  often designed from memory." The brief's reference is
  `[🌱] Grass Incremental Simulator` (Unequal Games) — see `research/grass-incremental.md`, and
  note the brief's own warning there that one source is probably describing the sibling game.
- Every timing you state is a number. "Inside the first ten seconds" is already in the brief and
  you may repeat it as an inherited constraint; anything new you need timed goes to Balance &
  Tuning as a requirement. `OPEN.md §2` instruments this as measurement item (1): "did a
  first-session player reveal a relic, and how fast — validates the ten-second onboarding
  promise."

**Not yours:** the screens or callouts (UI/UX); whether players complete it (Analytics — Funnels).

---

### 08 · Balance & Tuning Lead → `/Users/zachsmacbook/Desktop/Code/arga/cid/gameplay/balance/_lead.md`

**Stage 4. Gated on Gameplay Stage 3 Approved. This is the gate the rest of the pipeline waits
on, because it is where the numbers land.**

**You are new. The brief does not know you exist.** `HANDOFF.md`'s lineup has no Balance &
Tuning domain, and `OPEN.md §4` therefore distributes number-work to Core Loop, Meta & Content
and Monetization. My ruling, restated so you can cite it: **those domains own the shape,
direction and acceptance test of every curve; you own every value.** Verification enforces the
other half — "every economy, pacing or progression number appears in Balance & Tuning and nowhere
else". If you find a bare value in a stage-1-to-3 spec, that is a verification finding, not
something you silently absorb.

**Latitude: total over values, zero over what is being valued.** You do not decide what systems,
offers or content exist. You assign their numbers, and you own "the single canonical table every
number lives in".

**Your evidence standard, from your node, and it is stricter than the rest of the category:**
"Every curve must be sourced or explicitly marked a playtest unknown with a starting value and a
test range. **Never present an invented number as sourced.**" Your subagents' acceptance criteria
say the same: "Every row is a named quantity with a value, a unit, and either a source or a
`[playtest unknown]` marker with a test range. A sheet containing an unmarked bare number fails
verification."

**The brief's numeric inheritance, in full, with its honesty attached:**

| quantity | what the brief says | tag |
|---|---|---|
| session length | "10–20 minute active sessions" | `[brief: binding]` ← `[you chose: R1 Q4]` |
| collection size | "**~24 objects in 4 sets of 6**" — note the `~` | `[brief: soft]` ← `[you accepted: R4 Q4]` |
| upgrade axes | three: "value per unit, clear radius, and move speed" | `[brief: soft]` ← `[you accepted: step 6 Q1]` |
| device split | "~70% mobile / ~25% desktop / ~5% console" | `[brief: soft]` ← `[I assumed]` |
| server size | "12–20" | `[brief: soft]` ← `[I assumed — no source]`, `OPEN.md §5 #4` |
| onboarding | "inside the first ten seconds" | `[brief: soft]` ← `[you accepted: R6 Q3]` |
| reference monetization | "only 2x multipliers plus a 2,500-Robux oversized tool, zero cosmetics, across 38M visits at a 96% like ratio" | `[research: research/grass-incremental.md]` — argue with the source, not the sheet |
| lap length | "**unknown, and deliberately so**" — unverifiable across three source types, and the reference's number "would not have transferred anyway" | explicitly unsourced; `01-FOUNDATION.md` |
| discovery rates | "**This is the highest-risk tuning in the game**" | open; `03-META.md` |

**Two numbers you should expect to be the hardest, both flagged by the brief itself:** area
completion time (unsourced, and `OPEN.md §2` measurement item 2 calls it "the pacing number
nobody could source") and discovery rate per depth tier (the highest-risk tuning, and the one
that makes the session objective silently fail). Both are strong candidates for
`[playtest unknown]` with a range, and saying so is the correct output, not a failure.

**Not yours:** what the systems, offers or content are (Systems, Monetization, Meta & Content);
monitoring them once live (Analytics — Economy Health).

## Domains judged thin for this game, and why that is stated rather than silent

**Multiplayer & Social — thin, deliberately, with one real question.** Its standard remit is
teams, guilds, shared goals, PvP, leaderboards, ranking, visible prestige and chat. In this game:
"no mechanical interaction" `[you accepted: R6 Q2]` removes teams, guilds, shared goals and PvP;
priority 3 removes leaderboards and trading; movement-only input plus no failure state leaves PvP
with no verb; and "visitable restored ruins" — the flex/prestige answer, and named by the brief as
"the strongest future option" — is **priority 2**, not this project. What survives is server
shape, mutual visibility, and the single question the brief asks by name: "whether presence alone
suffices, and the cheapest warmth-adding touch if not." **Answering "presence suffices" and
specifying nothing further is a legitimate output for this domain.** It is not permitted to fill
the space by reaching into priority 2 or 3. Verification should read a small social output as
correct here.

**Monetization — thin, structurally.** One currency, no cosmetics (declined), no content access
(forbidden), no gacha (nothing to pull from without touching the collection), no seasons or
battle pass (priority 3), revenue an explicit non-goal, and the reference's own store is only two
SKU types. Of the domain's `owns` list — "game passes · dev products · boosts · gacha and pull
rates · the offer ladder from impulse to whale · price points" — gacha is effectively closed by
the content-access ban and pull rates have nothing to attach to. What remains real: the ladder,
the offer mix across four allowed multiplier targets, and the unresolved premium-SKU question.
That is enough for a domain, and it is much less than the `owns` list implies.

**Core Loop's "tension vs downtime" and "streaks/dailies" slices — pre-answered and excluded
respectively.** Tension is fixed at zero with an explicit instruction not to add any; daily
rewards are priority 3; offline accrual is cut. Two thirds of the pull-back-hook instrument set
is unavailable to the domain that nominally owns it. Core Loop should state this rather than
leave a reader wondering why its specs contain no streak.

**Meta & Content's "rebirth" slice — cut, not thin.** Its `owns` line names "endgame, rebirth,
reasons to return". Rebirth is `[you chose: R2 Q2]` cut and may not be reframed as seasons or made
optional; reasons to return are already answered `[you accepted: R3 Q3]`. Only endgame is live,
and it is genuinely unanswered. The rest of the domain is the biggest job in the category, so
"thin" applies to one slice, not the domain.

**Systems' pets/crafting/tycoon/trading slices — absent.** No pets, units or minions exist
anywhere in the brief; there is no crafting, building or tycoon layer; player-to-player exchange
is priority 3. Systems Lead should say these are empty in its index so verification does not read
their absence as an oversight. The domain is not thin overall — the duplicates problem alone
justifies it.

**No domain in this category is dropped.** All eight run. None is being given a placeholder
assignment.

## Gaps in the brief this category hit

Passed upward, not filled. Each names the domain that will have to decide it.

1. **Lap length / area completion time is unsourced, and the brief says so.** "The reference's
   pacing could not be verified across three source types — one 405'd, one gave a level gate
   rather than a duration, and that same guide is probably describing the sibling game", plus
   "This design's lap is an area, not a rebirth cycle, so the reference's number would not have
   transferred anyway." → **Core Loop** states the target and its acceptance test; **Balance &
   Tuning** sets the value or marks it `[playtest unknown]` with a range. Instrumented as
   `OPEN.md §2` measurement item (2).

2. **Discovery rates per depth tier — the brief's own highest-risk item.** "if rates are too low
   that objective silently fails". The arithmetic linking 24 relics, 4 depth-tiered sets, and a
   10–20 minute session has never been done. → **Meta & Content** states the inequality; **Balance
   & Tuning** sets the rates.

3. **Duplicates have no sink and no currency may be added.** Both obvious solutions were named
   and declined, and the "refinement" is priority 2, so priority 1 needs an answer that stands
   alone. → **Systems**.

4. **No tool ladder exists, so the premium SKU has no home.** Flagged twice (`03-META.md`,
   `OPEN.md §6`). The unasked question beneath it is whether a tool is a held object at all. →
   **Mechanics** (stage 2) answers the object question; **Monetization** (stage 3) then places the
   SKU.

5. **The session objective becomes unsatisfiable at 24/24, and the brief does not say what the
   game is then.** Every objective scope hangs off a finite collection inside an endless world. →
   **Meta & Content** owns endgame; **Core Loop** should flag the cadence side of it in stage 1.

6. **"No gating mechanism needed" is `[I assumed]` and leaves the actual unlock rule unstated.**
   "depth is reached by clearing, not by hitting a threshold" does not say what makes the next
   area available, how many areas exist at launch, or whether depth is linear or branching. →
   **Meta & Content** (`OPEN.md §5 #3` names it as inheritor).

7. **Whether relic rarity and overgrowth tier are one ladder or two is unresolved and the sheets
   read both ways.** `01-FOUNDATION.md` puts the rarity ladder in the overgrowth `[I assumed]`;
   `02-GAMEPLAY.md` says relic "rarity and location are one axis". → **Systems** resolves it
   (`OPEN.md §5 #1` names Systems and Art). Consequence outside this category: **Art & Visuals**
   cannot design tier legibility until it knows how many ladders it is drawing.

8. **Relic luck is declined as an earned axis and allowed as a paid multiplier.** A direct
   contradiction between `02-GAMEPLAY.md` and `03-META.md`. → **Systems** (stage 2) says whether
   anything in the game is luck-shaped; **Monetization** (stage 3) then decides whether to sell
   it, tested against the completion-must-not-be-purchasable rule.

9. **Escalation from tool-power to time-and-patience is `[I assumed]` and untested against a
   10–20 minute session.** Late-game difficulty being *duration* may not survive the stated
   session length. → **Core Loop** (`OPEN.md §5 #2` names it as inheritor).

10. **Server size 12–20 has no source.** → **Social** states the requirement; **Balance & Tuning**
    and **Tech & Data** set the figure (`OPEN.md §5 #4`).

11. **Zero tension is deliberate and, by the brief's own admission, "entirely unverified"**
    (`OPEN.md §6`). Flagging it as a playtest risk was offered *and declined*, so it cannot even
    be recorded as a risk inside a spec sheet without contradicting a decision. → No domain fixes
    this. It is a project-level risk, recorded here, and it belongs to whoever owns playtest
    planning. **Nobody in this category invents tension to cover it.**

12. **Priority ordering is `[I assumed]`, so six of the eight priority-3 exclusions rest on an
    assumption rather than a decision** (codes, daily rewards, leaderboards, trading, seasons,
    events). → Treated as excluded by all eight domains. Any argument to reinstate one comes to
    **me** as an escalation; no domain decides it.

13. **Nothing in this category is named, and the brief does not provide the names.** One currency
    with no name, 24 relics with no names, four sets with no themes, areas with no titles, and a
    working name that `OPEN.md §3` calls "a placeholder … a slug, not a name". → **Theme &
    Narrative — Vocabulary** owns the canonical term list. Every domain here writes "the
    currency", "a relic", "a set", "an area", and lets Vocabulary name them. A Gameplay spec that
    invents a name will be caught by Theme's verification check that "every term this category
    introduces appears once in the Vocabulary canonical list".

### Consequences this category forces on others, stated as consequences only

- **Audio and Art inherit the entire feedback load**, because "audio and visual feedback carry the
  entire load" is the stated consequence of zero tension. Mechanics will specify *when* feedback
  fires; it does not specify the sound or the particle.
- **Tech & Data inherits unbounded per-area cleared state** as the one genuinely novel technical
  risk, per `OPEN.md §2`. Systems will state what must persist, not how.
- **UI/UX inherits a persistent-HUD problem the build stage cannot currently produce** — the Build
  Capability Registry records that "`ui-forge` produces only centred dismissible panels holding a
  grid of items. A persistent HUD is not yet buildable", and `OPEN.md §4` already flags "the
  persistent HUD `ui-forge` cannot build". Not this category's to solve; noted because a collection
  index and a currency readout are both things Gameplay will require a surface for.
- **Art & Visuals owns the 24 relics and rarity-tier legibility**, including the shape-not-hue
  constraint. Gameplay states that tier is a load-bearing economic signal; Art decides how it
  reads.
