# 02 — Gameplay

> **⚠ SYNTHETIC TEST FIXTURE.** See `CONCEPT.md`.

**Layer 2.** Read layer 1 above this.

## Mechanics

| mechanic | role | notes |
|---|---|---|
| **capability gating** | **the differentiator** | a route is impossible without the right class [simulated: R1 Q1] |
| contract board | core | the filtered work list; the loop's entry point [simulated: R1 Q2] |
| cargo loading | core | weight changes handling; condition on arrival scales payout |
| ridden flight | core | hold-to-ascend against stamina [simulated: R2 Q2] |
| taming | core | a resource cost plus a short skill check [simulated: R2 Q3] |
| capability upgrades | core | see economy |
| wind and thermals | supporting | route conditions; day thermals give lift [simulated: R4 Q2] |
| ~~breeding~~ | **cut** | priority 3 — collection depth is the incumbents' moat |
| ~~PvP racing~~ | **cut** | priority 3 |

### The four capability classes

**Four classes, three creatures each, twelve total.** [simulated: R3 Q4]

Three are named now; **the fourth is deliberately held for later content** so the second
region has something to open with.

| class | what it makes possible |
|---|---|
| glide | long horizontal crossings on thermals, cheap stamina, no lift |
| climb | vertical ascent past sheer faces; slow and stamina-hungry |
| haul | heavy or bulky cargo other classes cannot lift at all |
| *(fourth)* | held for region 2 *[kind of work: capability design]* |

**The gate is binary, not a stat check.** A climb route is not "hard without climb", it is
impossible. That is what makes a creature a key. [simulated: R1 Q1]

## Controls & game feel

- **Input: movement plus one context button** (load / drop / interact). Mobile-first.
  [simulated: R3 Q2]
- **Flight: hold to ascend, against a stamina meter.** Deliberately the same grammar as
  Palworld's, because that is the reference implementation players will have in their hands.
  [research: https://palworld.wiki.gg/wiki/Rideable_Pals]
- **Device split:** ~65 / 30 / 5. [simulated: R1 Q4]
- **Feel:** weight is the primary sensation. A loaded creature must visibly and audibly
  handle worse than an empty one, or cargo is just a number. [simulated: R3 Q2]

Left open — the ascent curve, stamina drain rates, how weight maps to handling.
*[kind of work: all numeric curves]*

## Economy

**One currency.** [simulated: R3 Q3]

| faucet | sink |
|---|---|
| delivering cargo, scaled by value and condition | capability upgrades |
| | taming costs |

A second currency for taming was offered and declined: two currencies would let a player be
rich in the wrong one and stall, which in a gated game means stalling *against a wall they
cannot see the other side of*.

**Known consequence — a stall state exists.** A player with the wrong three classes and no
currency has no takeable contract. **Constraint on whoever designs systems: guarantee at
least one takeable contract at all times, without adding a currency.**

## Content roster

Structure and scale settled; the creatures themselves are invented downstream.

- **~12 creatures, 4 capability classes, 3 per class.** [simulated: R3 Q4]
- **Within a class, creatures differ by cargo capacity and stamina, not by capability.** The
  class is the key; the creature is the grade of key.
- **Cast: yes, minimal.** Depot handlers as archetypes, no named characters, no enemies.
  Stated explicitly so nobody writes a cast that does not exist and nobody assumes the world
  is empty. [simulated: R3 Q5]
- **Player body: their own Roblox avatar.** [simulated: R3 Q5] This is what gives cosmetics
  somewhere to live, which the monetization stance depends on.

Left open — what the twelve creatures are, what the fourth class is, the depot handler
archetypes. *[kind of work: the roster and the asset list]*

## Players / social model

**Shared server, parallel contracts, no PvP, no trading.** [simulated: R3 Q1]

- **Server size:** 12–24. [simulated: R3 Q1]
- **Interaction:** none mechanical. You see other couriers flying their own routes, which is
  social proof at zero systems cost.
- **Chat: Roblox default filtered chat, on.** No custom chat surface, no whisper, no trade
  chat. [simulated: R3 Q1]
- **Moderation stance:** platform default only. Nothing in this game generates
  player-authored content, so there is no custom moderation surface to build and no
  reporting flow beyond Roblox's own. Stated so nobody writes a moderation policy for a
  surface that does not exist.

**No trading is a deliberate integrity decision**, not an omission: tradeable creatures in a
gated game would let a new player buy past the gate that is the entire design.

Left open — whether seeing other couriers is enough, or whether the world wants one cheap
warmth-adding touch. *[kind of work: social feel]*

## Onboarding / first session

**One complete delivery, paid, inside sixty seconds.** [simulated: R3 Q6]

The player starts at a depot, already on a creature, with one contract on the board and a
destination in sight. No text tutorial. The first route requires the class they already
have, and the payout lands before anything else is introduced.

**What must be understood before they are allowed to be confused:** that cargo goes from A
to B, and that the board is the source of work. Capability gating is **not** taught in the
first minute — it is taught by the second contract being untakeable, with the reason shown
on the card.

**Requires a guaranteed first contract** matched to the starting creature. The board's
generation must not be allowed to decide this one.

Left open — the second-contract choreography that teaches gating.
*[kind of work: onboarding beats]*

## Failure & friction

**Failure exists, and it costs money rather than progress.** [simulated: R3 Q7]

- **Cargo can be lost or damaged** — dropped on rough landing, or degraded by weather it was
  not protected against. Payout scales with condition on arrival.
- **Stamina exhaustion is a soft fail.** The creature descends; you land somewhere you did
  not intend and fly on. No death, no respawn cost.
- **The cost is the contract fee.** Never currency already banked, never a capability,
  never progress.
- **A stuck player is possible** and must be prevented in systems: see the stall state in
  the economy section.

**This is deliberately not a zero-tension game.** A route has a real chance of going badly,
and that is the tension the loop runs on. Whoever designs feedback should support that
rather than smoothing it away.
