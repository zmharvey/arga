# Open items, assumptions, and coverage

> **⚠ SYNTHETIC TEST FIXTURE.** No developer was interviewed. Every `[simulated]` tag is
> really an `[I assumed]`, and the `Qs` column below counts decision points *posed and
> resolved by the interviewer*, not questions a person answered. **On a real run this
> document would be far weaker than it looks.**

## 1. Coverage audit

`Qs` counts direct decision points only. Step-6 confirmations of my own assumptions count 0.

| layer | item | state | Qs | where |
|---|---|---|---|---|
| F | theme / fantasy | simulated (R2 Q2) | 1 | `01-FOUNDATION.md` |
| F | **tone** | **simulated (R2 Q1)** — asked as its own item | **1** | `01-FOUNDATION.md` |
| F | **core loop** | **simulated (R1 Q2)** | **1** | `01-FOUNDATION.md` |
| F | purpose | simulated (R1 Q3) | 1 | `00-CORE.md` |
| F | audience | simulated (R1 Q4) | 1 | `00-CORE.md` |
| G | players | simulated (R3 Q1) — incl. chat and moderation | 1 | `02-GAMEPLAY.md` |
| G | genre | simulated (R1 Q1) | 1 | `00-CORE.md` |
| G | mechanics | simulated (R1 Q1, R2 Q3) + researched | 2 | `02-GAMEPLAY.md` |
| G | controls & game feel | simulated (R3 Q2) + researched | 1 | `02-GAMEPLAY.md` |
| G | economy | simulated (R3 Q3) | 1 | `02-GAMEPLAY.md` |
| G | content roster | simulated (R3 Q4, R3 Q5) — structure, cast, avatar | 2 | `02-GAMEPLAY.md` |
| G | onboarding / first session | simulated (R3 Q6) | 1 | `02-GAMEPLAY.md` |
| G | failure & friction | simulated (R3 Q7) — friction **intended** | 1 | `02-GAMEPLAY.md` |
| M | objectives | simulated (R4 Q1) | 1 | `03-META.md` |
| M | world | simulated (R2 Q4, R4 Q2) — incl. day/night and weather | 2 | `03-META.md` |
| M | replayability | simulated (R4 Q3) | 1 | `03-META.md` |
| M | monetization stance | simulated (R4 Q4) | 1 | `03-META.md` |
| M | scope & priority | simulated (R4 Q5) | 1 | `03-META.md` |
| M | **extension cost** | **simulated (R4 Q6)** — high, and a consequence of gating | **1** | `03-META.md` |
| P | art direction | simulated (R5 Q1) | 1 | `04-PRESENTATION.md` |
| P | audio intent | I assumed — §2 | 0 | `OPEN.md §2` |
| P | visual feedback intent | simulated (R5 Q2) | 1 | `04-PRESENTATION.md` |
| P | technical shape | simulated (R5 Q5) — device floor named | 1 | `04-PRESENTATION.md`, §2 |
| P | measurement | I assumed — §2 | 0 | `OPEN.md §2` |
| P | accessibility | simulated (R5 Q3) — two hard constraints | 1 | `04-PRESENTATION.md` |
| P | integrity | simulated (R5 Q4) | 1 | `04-PRESENTATION.md` |
| O | discovery hook | simulated (R5 Q6) | 1 | `05-OUTWARD.md` |
| O | live-ops intent | I assumed — §2 | 0 | `OPEN.md §2`, `05-OUTWARD.md` |
| O | references | researched ×5 | 0 | `research/` |

*Layers: F foundation · G gameplay · M meta · P presentation · O outward.*

### What this audit does and does not prove

**It passes the mechanical gate:** all 28 inventory items have a row, and **no foundation item
sits at 0.** Four items sit at 0 and are disclosed: audio intent, measurement, live-ops intent
(all batched by design) and references (researched, not asked).

**It does not prove the brief is good.** Every non-research row is `simulated`, which means
this document is entirely the interviewer's judgement wearing a developer's tag. On a real run
the value of the audit is the split between `you chose` and `I assumed`; here that split is
0 to 24. **The audit is passing a test the brief should fail**, and that is itself a finding
about what a coverage audit can measure.

## 2. Answer at your leisure — defaults stand if you don't

**Audio intent**
> Wind is the bed and it is always there, changing pitch and volume with speed and altitude —
> the player should be able to fly by ear. Creature wingbeats carry effort: slower and heavier
> under load. **The delivery landing owns the best sound in the game**, a cargo-release
> thunk plus a short resolving payout figure. A route opening gets the only fanfare. Music is
> sparse, warm and absent in flight, because wind is doing that job.
> *Rationale: this is a game about reading conditions, so audio has to be an instrument, not
> decoration. Anything that masks wind is working against the core skill.*

**Technical shape**
> Persist: creature roster and capability classes, currency, route-open state, per-route best
> times, cosmetics owned. Secure server-side: contract completion, payout, cargo condition,
> **capability ownership** (it is the access control for map content), and position sanity
> checks. Watch: draw distance and streaming across an open sky archipelago on the 3 GB device
> floor — long sightlines are the hardest case for streaming and this is the main technical
> risk. Route-open state is small and bounded; per-route records grow with route count only.
> *Rationale: capability ownership is unusual — it is normally cosmetic data, and here it is
> an authorization boundary.*

**Measurement**
> Three: (1) did a first-session player complete a delivery and get paid, and how fast —
> validates the sixty-second onboarding promise; (2) rate of sessions containing zero takeable
> contracts — directly tests the stall state, the design's worst failure; (3) per-route
> abandon rate — tells you which authored routes are badly tuned, which is the only way to
> find that in an authored world.
> *Rationale: all three test assumptions this brief rests on rather than reporting vanity.*

**Live-ops intent**
> Ships and settles. No seasons, events or codes — priority 3 already excludes them. **A
> Roblox group only, no Discord and no socials**, because nothing in the design generates
> community activity to sustain a channel and an unattended channel is worse than none.
> *Rationale: an authored archipelago has a high content cost per drop, so a cadence this
> design cannot feed would be a promise it breaks.*

## 3. Needs you

- **A developer.** This brief has no binding decisions in it at all. Every item marked
  `simulated` needs a real answer before anything downstream should be trusted.
- **The working name is a placeholder.** `sky-freight-test` is a slug.

## 4. Deliberately left open — decisions, not gaps

Named by **kind of work**, so this routes correctly however the downstream lineup is arranged.

| kind of work left open | note |
|---|---|
| Naming and fiction — creatures, regions, depots, who sends the cargo | `dragon` and `mount` are unusable; see `05-OUTWARD.md` |
| All numeric curves — route timings, stamina drain, ascent rate, weight-to-handling, payout scaling, upgrade costs | lap length could not be sourced at all |
| Capability design — what the fourth class is | held back for region 2 on purpose |
| Region and route authoring — four regions, route counts, depot placement | **the primary creative work on this project** |
| The roster and asset list — the twelve creatures, depot handler archetypes, region looks | structure is set; entries are not |
| The guaranteed-takeable-contract rule | **highest-risk item.** Without it the session objective is unreachable |
| Onboarding beats — the second contract that teaches gating | first contract is specified; the teaching one is not |
| The offer ladder and price points | no obvious high-price SKU exists; see `03-META.md` |
| Endgame — what remains once every route is open | acknowledged thin |
| Social feel — whether seeing other couriers suffices | |

## 5. Every assumption, in one place

**All 24 non-research rows in §1 are assumptions.** That is the honest summary and it is why
this fixture must not reach a build. Beyond the simulated answers, these are assumptions I
made without even posing a decision point:

| # | assumption | item | why | who inherits it |
|---|---|---|---|---|
| 1 | Device split ~65/30/5 | audience | no source; the band was chosen, the split was not | interface, performance |
| 2 | Server size 12–24 | players | no source | social, technical |
| 3 | Three creatures per class, twelve total | content roster | shape only; nothing justifies twelve over nine | roster, region authoring |
| 4 | Within a class, creatures differ by capacity and stamina only | content roster | keeps the class as the key | roster, systems |
| 5 | Audio, measurement, live-ops | §2 | batched by design | audio, analytics, live ops |
| 6 | Board refresh cadence exists but is unspecified | replayability | needed for the reroll to mean anything | curves |
| 7 | Wind is priority 1 and thermals priority 2 | scope | separable, but never tested as separable | scope, world |

## 6. Completeness sweep

Walked the five layers asking what a creative agent would come up short on. Four things it
surfaced, all now written into the sheets rather than left implicit:

- **A stall state exists.** One currency plus binary gating means a player can hold the wrong
  keys and no money. The reference designs never face this because their worlds are open.
  → `02-GAMEPLAY.md`, `03-META.md`
- **Free flight is the genre default and this game breaks it.** Both incumbents let you fly
  anywhere. Gating will read as friction to anyone arriving from them, and no sheet had said
  so. → `01-FOUNDATION.md`
- **Capability ownership is an authorization boundary, not cosmetic data.** It controls access
  to map content, which makes it a security surface most creature games do not have.
  → `OPEN.md §2`, `04-PRESENTATION.md`
- **The world is expensive to extend**, which contradicts the usual assumption that a live
  game can add content cheaply. → `05-OUTWARD.md`

**One subject the inventory had no item for**, surfaced by this sweep: **the cost of
extending the world.** `live-ops intent` asks *whether* a game gets ongoing content and
`scope & priority` asks what ships first, but nothing asked how expensive the next unit of
content is. An authored, capability-gated world and a shuffled procedural one give opposite
answers, and roadmap and content work both need it.

**Now fixed in the skill** as a layer-3 inventory item, `extension cost`, and answered for
this brief in `03-META.md`. Recording it here rather than quietly filling it is what caused
the fix, which is the whole point of the sweep.

**The real instance of the defect is in the other brief, not this one.**
`concept/spec/incremental-spinoff-v2/05-OUTWARD.md` calls an authored-chunk world
*"unusually easy to extend, which is a live-ops advantage nobody asked for"* — reasoning
purely from the systems being untouched, while every new chunk still has to be hand-built.
System cost and world cost are different numbers and that sheet conflates them. With no
inventory item forcing the question, nothing made it check.

This brief avoided that by accident rather than by process: `05-OUTWARD.md` happened to
reason from the world side and reached the right answer. The item exists so the next brief
does not need luck.
