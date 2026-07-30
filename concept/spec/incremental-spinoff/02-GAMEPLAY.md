# 02 — Gameplay

**Layer 2 — gameplay.** Anyone working on systems, mechanics, controls, economy, the
roster or the social model reads this, plus layer 1 above it.

## Mechanics

The inherited skeleton, unchanged except where noted. [you said]

| mechanic | role | notes |
|---|---|---|
| proximity clearing | core | contact clears snow. No click, no aim, no timing. This is why the genre works one-thumbed. [research] |
| three upgrade axes | core | value per unit · spawn rate · clear radius [research] |
| rarity ladder on the material | core | tiers of snow, each a larger multiplier; a luck stat biases the roll [research] |
| rebirth | core | resets currency and upgrades, grants permanent multiplier currency [research] |
| zone unlock | core | gated on rebirth milestones, each zone carries a stacking multiplier [research] |
| idle accumulation | supporting | snow keeps spawning offline so returning has banked value [research] |
| **buried objects** | **the signature hook** | see below — the one addition [you accepted: R2 Q1] |

### The hook — buried objects

Clearing snow reveals objects hidden beneath it, which enter a permanent collection.
[you accepted: R2 Q1]

Chosen specifically because it gives the most creative areas real work for the least code,
which is the correct selection criterion given the purpose:

- content design gets a gating structure and a completion goal
- art gets a real object list to design
- systems gets a second progression track alongside currency
- UI gets an index screen
- marketing gets something to show that is not snow

It also fills the reference's most visible gap: there is no collection chase in Grass
Incremental at all, only numbers. [research]

### Snow model — discrete clumps

Snow spawns as **separate objects walked through**, exactly as grass does — not an
accumulating depth field. [you accepted: R2 Q2]

Deliberate: the depth-field version has better before/after feel and is genuinely novel
here, but costs mesh or heightmap engineering plus a mobile performance problem. With
the purpose being pipeline proof, that budget buys nothing. Recorded because it is the
most likely thing a future version would revisit.

## Controls & game feel

- **Input: movement only.** No aiming, no clicking, no ability buttons. One thumb on a
  virtual stick is the whole control surface. [research: the reference's model]
- **Device:** mobile-first, ~70%. [I assumed — see `00-CORE.md`]
- **Feel:** the tool's reach is the primary sensation. Radius upgrades must be *felt*,
  not just read in a menu — a wider tool should visibly sweep more per step.
  [I assumed — follows from radius being the whale SKU's axis]

Left open — clear-on-contact timing and feedback, whether there is any
active input beyond movement, how a radius increase is communicated in the moment. *[currently: Mechanics]*

## The actor

**A kid with a tool that upgrades visibly:** shovel → bigger shovel → plow → something
absurd. [you accepted: R2 Q3]

Load-bearing beyond flavour: it mirrors the reference's Trimmer → Giant Trimmer ladder,
which is also its 2,500-Robux whale SKU [research]. So the monetization stance chosen in
R1 already has a natural home, and radius upgrades — the most felt axis — are visible on
the character.

Left open — who this kid is, and the tool names. *[currently: Theme & Narrative]*

## Economy

**Two currencies.** [you accepted: R3 Q1]

| currency | faucet | sink |
|---|---|---|
| snow currency | clearing snow, scaled by rarity tier; accrues offline | the three upgrade axes |
| rebirth currency | performing a rebirth | permanent multipliers, zone unlocks |

Every additional currency is another balance surface and another number on screen; two
already exercise the economy fully at a two-zone scope.

**Known consequence — duplicates have no sink.** Combining two currencies with a tiered
set roster means players will uncover objects they already own, and there is no third
currency to convert them into. Unwanted duplicates are a well-known way for collection
games to feel like they are wasting your time. The `three currencies` option existed
precisely to solve this and was declined. **Constraint on whoever designs systems — solve the
duplicate case without introducing a third currency.** Converting to snow currency at a
tier-scaled rate is the obvious candidate but the choice is theirs.

## Content roster — buried objects

Structure and scale are settled here; **the objects themselves are invented downstream.**

- **~24 objects, in 4 themed sets of 6.** [you accepted: R3 Q2]
- **Each set is tied to a snow tier**, so an object's rarity and where it is found are
  the same axis — one concept for the player to learn instead of two.
- **Completing a set grants a permanent bonus.** This is what turns the collection from
  a checklist into progression, and it gives Meta & Content milestones between 0% and
  100% without any new mechanics.

Left open — set themes, the bonus each set grants, and discovery rates per tier.
*[currently: Meta & Content]* · Also left open — what the 24 objects actually are.
*[currently: Art & Visuals]*

## Players / social model

**Shared server, parallel progression, no mechanical interaction.** [you accepted: R3 Q3]

Everyone occupies the same world clearing their own snow and can see each other. Social
proof and liveness for free at zero systems cost. A solo instance was declined
specifically because an empty Roblox server reads as a dead game.

- **Server size:** 12–20. [I assumed — no source for the reference's figure; this is the
  Roblox default band for a game with many small physical objects per player]
- **Interaction:** none mechanical. Players are scenery to each other.

Left open — whether presence alone is enough, and what the cheapest
warmth-adding touch would be if not. *[currently: Social]*

## Onboarding / first session

**The first sixty seconds must deliver, in order:** snow clearing on contact (within ~5
seconds of spawn, before any UI is read), a visible number rising, and one affordable
upgrade purchased. [I assumed — never interviewed; this is the genre's standard opening
and the reference's own "spawn with a basic saw, walk into grass" shape [research]]

Nothing may require reading to get to the first clear. The audience is 8–14 on phones and
the input is movement only, so the game teaches itself by being walked into.

**Not designed:** any tutorial, prompt sequence, or gated first zone.

Left open — **the actual first-minute choreography**: what is on screen at spawn, whether
anything points the player at the snow, and how the first upgrade is surfaced.

## Failure & friction

**There is no failure state.** No death, no losing, no loss of progress that the player did
not choose. [I assumed — nothing in the chosen systems creates one, but this must be stated
explicitly rather than left silent, because silence reads as an oversight]

- **The only progress reset is rebirth, and it is voluntary and rewarded.**
- **The only friction is waiting** for snow to spawn, which the spawn-rate upgrade axis
  exists to relieve. Early laps being spawn-limited *is* the friction curve.
- **A stuck player cannot exist** in the usual sense: there is always more snow to clear,
  so progress is never blocked, only slow.

This matters more than it looks. Anyone designing feedback, audio, difficulty or retention
needs to know there is no fail state to design around — otherwise they will invent one.

## Scope

**Two zones · all three upgrade axes · rarity ladder · buried-object collection ·
rebirth.** [you accepted: R2 Q4]

Sized to exercise every creative area exactly once with nothing duplicated: two zones prove
gating, three axes prove the economy, the ladder proves the roll, the hook proves the
collection layer, rebirth proves the reset.

**Explicitly later, not now:** additional zones, codes, daily rewards, leaderboards,
trading, pets, any automation beyond passive offline spawn.
