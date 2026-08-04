# 04 — Presentation & support

> **⚠ SYNTHETIC TEST FIXTURE.** See `CONCEPT.md`.

**Layer 4.** Read layers 1–3 above this.

## Art direction

**`ui-forge` vibe key: `clean-modern`** [simulated: R5 Q1]

In words: warm, sunlit, hand-painted skies over legible hard-edged interface. The world is
painterly; the instrumentation is not.

Three reasons it beat the alternatives:

1. **The interface carries real information.** Contracts, capability requirements, cargo
   condition and wind all have to be read at a glance on a phone. `clean-modern` is the only
   archetype built for instrumentation.
2. **`cartoon-vibrant` would fight the tone.** Loud and rewarding is wrong for practical,
   unhurried competence, even though it is the safest choice for the age band.
3. **The incumbents are both ornate-fantasy.** Looking unlike them is worth something when
   the fantasy is otherwise adjacent.
   [research: `research/creature-taming-incumbents.md`]

**Split stated deliberately:** painterly world, plain interface. If the UI also goes
painterly the information stops reading.

Left open — the twelve creatures, what each region looks like, the depot architecture, how
cargo weight reads visually. *[kind of work: the asset list]*

## Visual feedback intent

**Visuals carry the state; audio carries the events.** [simulated: R5 Q2]

- **Weight and cargo condition must be visible on the creature**, continuously, without
  opening anything. A player should know they are overloaded by looking.
- **Wind must be visible in the world** — not only in a readout — because it is a routing
  input and a number alone will not be planned around.
- **The biggest moment is a delivery landing**: cargo detaching, the payout resolving. It is
  the loop's only guaranteed peak and it happens many times a session, so it must survive
  heavy repetition rather than being spectacular once.
- **The second peak is a route opening** when a new class lands. Rarer, so it can be larger.

Nothing else peaks. No third effect tier.

## Audio intent · Technical shape · Measurement

Defaults in `OPEN.md §2`, overridable.

## Screens

Deriving the full set is interface work. Implied by the systems chosen:

| screen | priority | implied by |
|---|---|---|
| `contract-board` | 1 | the loop's entry point — **the differentiator's home** |
| `creature-roster` | 1 | four classes, twelve creatures |
| `capability-upgrades` | 2 | the currency sink |
| `cosmetics-shop` | 2 | the monetization stance |

**`ui-forge` capability warning.** The build stage currently produces only *centred
dismissible panels holding a grid of items* (`modal-grid`). `creature-roster`,
`capability-upgrades` and `cosmetics-shop` fit that shape.

**Three things this game needs do not fit, and the build stage cannot yet make them:**

1. **A persistent flight HUD** — stamina, altitude, cargo condition and wind must be visible
   *while flying*, which is the entire skill of the game. This is not optional here.
2. **A map or route view.** Capability gating is meaningless if the player cannot see which
   routes are closed and why.
3. **A filterable list.** The contract board is a list with a filter state (takeable versus
   gated-out), not a grid of tiles.

Interface work should know it is proposing three shapes that do not exist yet, and that
item 1 is load-bearing rather than a nicety.

## Accessibility

**Two hard constraints.** [simulated: R5 Q3]

1. **Capability requirements and route status must not be signalled by colour alone.** A
   gated contract is the core economic signal; a player who cannot read it cannot see the
   game working. Use a shape or an icon as well as a hue.
2. **Sustained-hold flight must have an alternative.** Hold-to-ascend for the length of a
   route is a real endurance demand and excludes players with motor impairments. A toggle
   equivalent is required, not optional.

**Not accessible by construction, and accepted:** this game has genuine reaction and
planning demands. Unlike a cosy game it cannot be made fully undemanding without removing
the product. **Stated as a decision, not an oversight.**

Reading load is moderate: contract cards carry text. No text-free rule.

## Integrity

[simulated: R5 Q4]

- **Payout is the only thing worth cheating.** Contract completion, cargo condition and
  payout must all be server-validated, or a client claiming arbitrary deliveries owns the
  economy.
- **Capability ownership must be server-side**, because it is the access-control mechanism
  for map content. A client that can claim a class can reach anything.
- **Position and altitude need sanity checks.** A flight game is a teleport-exploit surface
  by construction, and the gate is spatial: teleporting past a gate defeats the design.
- **No trading and no player-authored content**, so no dupe surface and no moderation
  surface. Stated so nobody builds either.

## Technical shape note

Named here because it constrains art and performance separately: **device floor is a
3 GB-RAM Android phone of roughly 2019 vintage.** [simulated: R5 Q5] Every budget — part
count, texture, draw distance across an open sky archipelago — is set against that, not
against desktop. An open-world flight game with long sightlines is the hardest possible case
for streaming on that floor, and it is the main technical risk in the design.
