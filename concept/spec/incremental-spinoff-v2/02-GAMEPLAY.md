# 02 — Gameplay

**Layer 2 — gameplay.** Anyone working on systems, mechanics, controls, economy, the roster
or the social model reads this, plus layer 1 above it.

## Mechanics

| mechanic | role | notes |
|---|---|---|
| proximity clearing | core | contact clears overgrowth. No click, no aim, no timing [research] |
| **area completion** | core | an area is *done* when fully cleared — this is the lap [you chose: R1 Q2] |
| **buried objects** | **the differentiator** | revealed by clearing; enter a permanent index [you chose: R1 Q1] |
| clearing-speed upgrades | core | see economy below |
| rarity tiers on overgrowth | supporting | denser/rarer material pays more [I assumed — carried from the reference] |
| chunk shuffling | supporting | authored layouts recombined with randomised placement [you chose: R5 Q1] |
| ~~rebirth~~ | **cut** | [you chose: R2 Q2] |
| ~~offline accumulation~~ | **cut** | follows from permanent clearing |

### Endless areas, cheaply

**Not true procedural generation.** A set of hand-authored area layouts, recombined with
randomised object placement and density. [you chose: R5 Q1]

This resolved a live contradiction: R4 chose *"build real generation, cut everything else"*
— an option that explicitly meant one upgrade axis and a tiny collection — while R1 had
located distinction in the collection and R4 had also specified a full 24-object roster.
Put back to the developer, the collection won and generation became cheap. **Recorded
because the walked-back answer is context: real procgen was wanted and consciously traded.**

### Upgrade axes

**Three axes:** value per unit, clear radius, and move speed.
[you accepted: step 6 Q1 — R4's "cut everything" implied one axis and R5 walked it back
without restoring three, so this was put back to you explicitly. Relic luck as a fourth axis
was offered and declined.]

Spawn rate — the reference's third axis — is meaningless here: nothing respawns.

## Controls & game feel

- **Input: movement only.** No aiming, clicking, or ability buttons. One thumb.
  [you accepted: step 6 Q3 — hold-to-clear and tap-to-swing were both offered and declined]
- **Device:** mobile-first, ~70/25/5. [you accepted: step 6 Q4]
- **Feel:** reach is the primary sensation — a wider tool must visibly sweep more per step.
  [I assumed]

Left open — clear-on-contact feedback, whether any input beyond movement exists, and how an
area's "completely clear" moment is celebrated. *[currently: Mechanics]*

## Economy

**One currency.** [you accepted: R5 Q3 → R4 Q3]

| faucet | sink |
|---|---|
| clearing overgrowth, scaled by tier | clearing-speed upgrades |

Rebirth currency existed to serve a reset layer that was cut, so removing it is consistency
rather than simplification. A duplicate-find currency and a separate discovery currency were
both offered and declined.

**Known consequence — duplicates have no sink.** A 24-object roster with depth-tiered sets
guarantees repeat finds, and there is no second currency to convert them into.
**Constraint on whoever designs systems — solve duplicates without adding a currency.**

## Content roster — buried relics

Structure and scale settled here; **the objects themselves are invented downstream.**

- **~24 objects in 4 sets of 6.** [you accepted: R4 Q4]
- **Each set tied to area depth** — rarity and location are one axis, so there is one concept
  to learn rather than two.
- **Completing a set grants a permanent bonus** — this is what makes the collection
  progression rather than a checklist, and it supplies milestones between 0% and 100%.

**This is the differentiating system.** It gets the most creative attention, and monetization
may not touch it (see `03-META.md`).

Left open — set themes, what each completed set grants, discovery rates per depth tier.
*[currently: Meta & Content]* · Also left open — what the 24 relics actually are.
*[currently: Art & Visuals]*

## Players / social model

**Shared server, parallel progression, own areas, no mechanical interaction.**
[you accepted: R6 Q2]

Everyone occupies one world clearing their own patch, visible to each other. Social proof at
zero systems cost.

**This choice avoided a hard problem:** areas are *permanently* cleared, so shared areas
would mean shared persistent world state. Co-op clearing and visitable restored ruins were
both offered — the latter is the strongest future option, since restoration is inherently
something you would want to show off.

- **Server size:** 12–20. [I assumed — no source]
- **Interaction:** none mechanical.

Left open — whether presence alone suffices, and the cheapest warmth-adding touch if not.
*[currently: Social]*

## Onboarding / first session

**Clear → reveal inside the first ten seconds.** [you accepted: R6 Q3]

The player spawns touching overgrowth, and **the first patch they clear has something under
it.** No text, no tutorial. This front-loads the differentiator instead of hiding it behind a
grind — the genre-standard alternative (economy first, finds later) was explicitly declined
because a new player could quit before ever seeing what makes this game different.

**Requires a guaranteed find in the starting area** — the shuffle must not be allowed to
decide this one.

Left open — the actual first-minute choreography and how the index is first surfaced.
*[currently: UI/UX + Onboarding]*

## Failure & friction

**There is no failure state.** No death, no losing, no loss of progress — and with rebirth
cut, no voluntary reset either. [you accepted: step 6 Q2 — zero tension is
**intended**, not an oversight. Adding a gentle tension source and flagging it as a
playtest risk were both offered and declined.]

- **The only friction is the size of an area.** A large dense area takes time; that is the
  entire difficulty curve.
- **A stuck player cannot exist** — there is always more to clear.
- **Zero tension is deliberate.** [you accepted: step 6 Q2] Satisfaction comes from
  before/after and discovery, nothing else. **Consequence: audio and visual feedback carry
  the entire load** — and nobody downstream should invent tension to fill the gap.
