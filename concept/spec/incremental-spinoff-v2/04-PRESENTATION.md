# 04 — Presentation & support

**Layer 4 — presentation & support.** Anyone working on UI, art, audio, persistence,
security, accessibility or analytics reads this, plus layers 1–3 above it.

## Art direction

**`ui-forge` vibe key: `fantasy-ornate`** [you accepted: R6 Q2 → R5 Q2]

In words: ornamented, warm, aged, crafted. Stone and foliage, not candy.

Three reasons it beat the alternatives:

1. **Relics must read as treasure.** The collection is the differentiator; `fantasy-ornate`
   is the only archetype built for ornament and age.
2. **Green overgrowth on warm stone is naturally high-contrast**, so rarity tiers stay
   legible — a real problem the v1 spec hit with white snow.
3. **`cartoon-vibrant` would fight the fiction.** An ancient ruin in candy colours loses the
   discovery mood, even though it is the safest choice for an 8–14 mobile audience.

**Tone note:** warm and unhurried, not spooky. This is reclamation, not a haunted place.

Left open — the 24 relics, how overgrowth tiers read at a glance on a phone, what "restored"
looks like versus "overgrown", and the depth-themed chunk looks.
*[currently: Art & Visuals]*

## Accessibility

**Hard constraint: rarity tiers must differ by shape or silhouette, not only hue.**
[you accepted: R6 Q4]

Four rarity tiers of foliage in a green environment is exactly the case red-green colour
blindness breaks, and roughly **1 in 12 boys** in an 8–14 audience is affected. Tier is a
core economic signal, so a player who cannot read it cannot see the game working. **This is a
requirement, not a nicety** — and it is nearly free if designed in from the start.

Already accessible by construction: movement-only input, no aiming, no timing windows, no
reaction demands, one-handed play.

**Declined:** a full pass with colourblind mode, text scaling and sensitivity options — out
of scope at this size. Also declined: extending to a text-free comprehension rule, which was
offered as the broader version.

## Integrity

[I assumed — not interviewed]

- **The economy is the only thing worth cheating.** Clearing and currency awards must be
  server-validated, or a client claiming arbitrary clears owns the game.
- **The collection is the second surface** — relic grants must be server-side, because with
  no paid content access the index is the one thing with prestige value.
- **No offline accrual means no timestamp exploit** — a whole class of abuse the reference has
  and this design does not, purely as a side effect of cutting idle.
- **Nothing else applies:** no trading, leaderboards, or PvP in scope.

## Screens

Deriving the full screen set is UI's job. Likely implied by the systems chosen:

| screen | priority | implied by |
|---|---|---|
| `collection-index` | 1 | the 24-relic 4-set roster — **the differentiator's home** |
| `upgrades` | 1 | the three clearing axes |
| `areas` | 2 | moving between areas by depth |
| `shop` | 2 | the multiplier SKUs |

**`ui-forge` capability warning.** The build stage currently produces only *centred
dismissible panels holding a grid of items*. `collection-index`, `upgrades` and `shop` fit
that shape well — the index especially, since a grid of relics with empty slots is exactly
what the pattern does.

**A persistent HUD does not fit**, and this game needs one: area-completion progress must be
visible while moving, since "how close am I to done" is the core tension. UI should know it is
proposing something the build stage cannot yet make.

## Audio intent · Technical shape · Measurement

Defaults in `OPEN.md §2`, overridable.
