# 04 — Presentation & support

**Layer 4 — presentation & support.** Anyone working on UI, art, audio, persistence,
security, accessibility or analytics reads this, plus layers 1–3 above it.

## Art direction

**`ui-forge` vibe key: `cartoon-vibrant`** [you accepted: R3 Q4]

In words: saturated, chunky, thick dark outlines, generous reward juice. Numbers pop,
payoffs are loud, nothing is subtle.

This was a genuine tension and was decided deliberately rather than defaulted. The warm
low-stress tone from layer 1 pointed at `minimal-soft`, and two concrete arguments beat it:

1. **Incrementals live on visible payoff.** Muted feedback undercuts the only thing the
   genre does.
2. **A mostly-white snow field washes out a pale palette.** Saturated accents are what
   keep the UI, the rarity tiers and the buried objects readable against snow. This is a
   legibility problem, not a taste preference.

**Tone note for Art:** vibrant palette, *warm-hearted* subject. Loud rendering of a cozy
idea — a kid with an absurd shovel, not an aggressive one. `premium-gloss` and
`horror-grim` were both wrong for this and were not close.

Left open — the 24 buried objects, the tool ladder's visual
escalation, the two zones' looks, and how the four snow tiers read at a glance on a phone. *[currently: Art & Visuals]*

## Screens

**Deriving the full screen set is UI/UX's job** — you named none explicitly, so nothing
is being locked here. Two things UI/UX needs to know before it starts:

Likely screens implied by the systems chosen, as a starting point only:

| screen | priority | implied by |
|---|---|---|
| `upgrades` | 1 | the three upgrade axes |
| `collection-index` | 1 | the buried-object hook and its four sets |
| `rebirth` | 1 | the reset and permanent multipliers |
| `zones` | 2 | two zones with unlock thresholds |
| `shop` | 2 | the multiplier SKUs |

**`ui-forge` capability warning.** The build stage currently produces only *centred
dismissible panels holding a grid of items*. `upgrades`, `collection-index` and `shop`
fit that shape well. **A persistent HUD does not** — and this game needs one badly, since
currency, rebirth progress and set progress all have to be visible while moving. UI/UX
should know it is proposing something the build stage cannot yet make, rather than
assuming it can.

## Accessibility

This design starts unusually accessible and has **one real problem.**

Already good, structurally: movement-only input, no aiming, no timing windows, no reaction
demands, near-zero reading load, and it plays one-handed on a phone.

**The problem — rarity tiers distinguished by colour alone.** Powder / packed / ice /
crystal is a colour ladder on a white field, which is exactly the case red-green colour
blindness breaks, and roughly 1 in 12 boys in an 8–14 audience is affected. Snow tiers are
the primary economic signal in the game, so a player who cannot tell them apart cannot see
the loop working. **Constraint: every rarity tier must be distinguishable by shape,
sparkle, or silhouette in addition to hue.** [I assumed — never interviewed; surfaced by
checking the design against colour dependence]

Also worth carrying: a mostly-white field with vibrant UI over it is a contrast risk at
small phone sizes even for full-sight players.

**Not addressed and consciously so:** no colourblind mode, no text scaling, no remapping —
out of scope at this size, and the shape-differentiation constraint above is the cheaper
fix that removes the actual exclusion.

## Integrity

**The economy is the only thing worth cheating, and it is fully cheatable if clearing is
client-authoritative.** [I assumed — follows from a two-currency incremental with no
combat; nothing else in the game has value to steal]

- **Server must validate** snow clearing and every currency award. A client that can claim
  "I cleared 10,000 snow" owns the game.
- **Offline earnings are the second surface** — computed from a stored timestamp, so they
  need a server clock and a cap, or a player edits their way to any balance.
- **Nothing else applies.** No trading, no leaderboards, no PvP, no chat-driven scams —
  because none of those are in scope. If trading is ever added, this section is wrong.

## Audio intent

Default in `OPEN.md §2`, overridable.

## Technical shape

Default in `OPEN.md §2`, overridable.

## Analytics

Default in `OPEN.md §2`, overridable.
