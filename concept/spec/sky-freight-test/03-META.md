# 03 — Meta

> **⚠ SYNTHETIC TEST FIXTURE.** See `CONCEPT.md`.

**Layer 3.** Read layers 1–2 above this.

## Objectives

| scope | objective | measurable |
|---|---|---|
| moment | reach the next waypoint without losing altitude you cannot recover | still airborne, cargo intact |
| **session** | clear the contract board at your home depot | board empty or all remaining contracts ungated-out |
| short-term | acquire a capability class you do not have | class count rose |
| long-term | **open every route in the archipelago** | all routes flown at least once |
| mastery | route time and cargo condition records | personal bests per route |

**Mastery exists here**, unlike a cosy game: flying a route well is a skill, so there is
something to get better at. Stated explicitly because the previous brief in this repo had no
mastery layer and had to say so. [simulated: R4 Q1]

**Tuning burden:** the board must always contain at least one takeable contract, or the
session objective becomes unreachable and the game reads as broken rather than hard. **This
is the highest-risk tuning in the game.**

## World

- **An authored archipelago, four regions.** [simulated: R2 Q4] Not generated: capability
  gating requires space built deliberately around a capability, which generation cannot
  guarantee.
- **Regions gate on capability class, not on level or currency.** [simulated: R1 Q1] You
  reach region 2 when you can physically fly there.
- **Day/night is real and mechanical.** [simulated: R4 Q2] Thermals give lift by day and fade
  at night, so the same glide route is a different flight at different hours.
- **Weather is real and mechanical.** [simulated: R4 Q2] Wind direction and strength change
  which crossings are viable. Some contracts are only takeable in some conditions.
- **No fast travel.** The flight *is* the game; skipping it removes the product.

**Both cycles were asked rather than assumed** because lighting, ambient audio and set
dressing all have to agree on them and are decided separately.

Left open — what the four regions are, how many routes each holds, what the depots are.
*[kind of work: region and route authoring]*

## Replayability

**A rerolling contract board plus route mastery.** [simulated: R4 Q3]

- The board refreshes on a cadence, so tomorrow's work differs from today's.
- Route times and cargo-condition records give a reason to re-fly a route already opened.
- Weather and daylight make a repeated route genuinely different rather than nominally
  different.

**Honest weakness:** once every route is open, the long-term objective is complete and only
mastery remains. That is a thinner endgame than a collection game's, and it is the accepted
cost of a finite authored world. *[kind of work: endgame]*

## Monetization stance

**Cosmetics and convenience only. Never capability access.** [simulated: R4 Q4]

- **Allowed:** creature and rider cosmetics, depot decoration, a currency multiplier, extra
  contract board slots.
- **Forbidden:** any paid capability class, paid creature that grants a class, paid route
  access, or paid weather control. **A paid capability would put map content behind money**,
  which is the one thing the gating design cannot survive.
- Cosmetics work here specifically because the player rides their own Roblox avatar and the
  creature is always on screen, so there is a display surface. That is why the avatar
  decision in `02-GAMEPLAY.md` is load-bearing rather than incidental.

**Note the tension:** with capability access forbidden and no gacha, there is no obvious
high-price SKU. The convenience ceiling is low in a game with one currency.

Left open — the SKU ladder and price points. *[kind of work: the offer ladder]*

## Scope & priority

**Priority 1 — first shippable version:**
region 1 · two capability classes (glide, haul) · four creatures · the contract board ·
the delivery loop · cargo condition · wind · guaranteed-takeable-contract rule ·
own-avatar rider.

**Priority 2 — after it works:**
regions 2 and 3 · the climb class · the fourth class · day/night thermals · route records ·
depot decoration.

**Priority 3 — explicitly not in this project:**
region 4 · breeding · PvP racing · trading · seasons and events · codes · daily rewards ·
leaderboards · guilds · generated routes · fast travel.

[simulated: R4 Q5 — the ordering was posed as a decision and answered]

**Note that day/night is priority 2 while wind is priority 1.** They are separated on
purpose: wind is a route condition the gate needs, and thermals are a refinement that makes
glide interesting. Anyone building region 1 should not need a day/night cycle to do it.

## Extension cost

**High, and unavoidably so.** [simulated: R4 Q6]

The next unit of content after launch is **one authored route**, and it costs:

- hand-built terrain, because capability gating requires space designed around a specific
  capability and generation cannot guarantee it
- a capability assignment, checked against what the player can already do
- a contract or set of contracts that make the route worth flying
- placement in the region graph so it does not open something out of order

**This is the opposite of a shuffled or procedural world**, where new content is a
recombination and costs almost nothing. It is a direct consequence of the gating decision in
`00-CORE.md`, not a separate choice, and it cannot be reduced without giving up the gate.

**What it forbids:** a fast update cadence, seasonal content, and any live-ops plan that
assumes content can be added between drops. Priority 3 already excludes seasons and events,
so nothing currently depends on a cadence this design cannot feed — but anyone planning a
roadmap should size drops against hand-authoring, not against a content generator.

**Stated explicitly, and it agrees with `05-OUTWARD.md`**, which reaches the same conclusion
from the live-ops side. The two are consistent here on purpose: system cost and world cost are
different numbers, and a design can have a low one and a high one at once. This brief's
systems are cheap to leave alone and its world is expensive to grow.
