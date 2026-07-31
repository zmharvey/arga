# Theme & Narrative — category brief

**Wave 1.** Source: `concept/spec/incremental-spinoff-v2/`. Read `HANDOFF.md` first.

This is an **assignment document.** It contains no tone, lore, or naming decisions. Those
belong to the six domain leads below. Where the brief already settled something, it is quoted
with its tag so a lead knows whether it may push back.

## What the brief binds for this whole category

| constraint | tag | consequence |
|---|---|---|
| An overgrown ruin being reclaimed; cut vines and moss off ancient stone | `[brief: soft]` R2 Q3 | the fiction is given, not yours to replace |
| **The noun is not the differentiator** — distinction lives in the collection layer | `[brief: binding]` R1 Q1 | do not try to make the theme carry distinction; it cannot |
| **Clearing *is* revealing** — one action, not two systems | `[brief: binding]` | no fiction may separate them |
| Cleared is permanent; overgrowth never returns | `[brief: binding]` R2 Q1 | no fiction of decay, regrowth, or reclaiming-again |
| Tone: warm, aged, unhurried. Not spooky, not grim, not a power fantasy | `[brief: soft]` | see Tone |
| **Zero tension is intended, not an oversight** | `[brief: binding]` step 6 Q2 | **no domain may invent a threat to fill the gap** |
| Depth is the progression read | `[brief: binding]` | deeper means denser and rarer, in fiction as well as systems |
| `fantasy-ornate`; relics read as treasure | `[brief: soft]` R5 Q2 | ornament and age, not candy |
| Audience 8–14, ~70% mobile, 10–20 min sessions | `[brief: binding]` R1 Q4 | reading load is a real constraint on every name and line |
| Marketed as a **restoration game, not an incremental** | `[brief: binding]` R4 Q2 | vocabulary should not borrow incremental genre terms |

**Scope gate.** `03-META.md` priority 3 excludes rebirth, offline accrual, codes, daily
rewards, leaderboards, trading, seasons and events, and real procedural generation. **No
domain may name, imply, or build fiction around any of them.** A lore entry explaining "the
cycle of seasons" is out of scope work, not colour.

## Domain assignments

### 01 · Fantasy Lead → `/cid/theme/fantasy/`
Narrow latitude: the fantasy is given. What is open is **what the player becomes** and **the
emotional promise**. Note the explicit prohibition: this is *not a power fantasy*, so the
promise cannot be mastery or dominance. The brief's own reasoning is that clearing and
revealing are the same action, so the promise likely lives in *uncovering* rather than
*conquering*. Establish that, do not restate the ruin.

### 02 · Setting Lead → `/cid/theme/setting/`
Wide latitude. The brief settles only that the place is an ancient overgrown ruin, that it is
traversed by discrete areas, and that deeper areas are denser. **Location, era, scale and the
physical logic of the place are open.** Two constraints: areas are permanently cleared, so the
place cannot be one that heals; and there is no gating mechanism, so the fiction must not
require a key, a rank, or a permission to go deeper.

### 03 · Tone Lead → `/cid/theme/tone/`
The brief gives a register as three adjectives and three prohibitions. **It does not state a
humor level.** Treat that as a real gap and decide it explicitly rather than absorbing it into
the register. Hard constraint: zero tension. Audio and visual feedback carry the entire
feedback load, so tone is doing more work here than in a game with stakes.

### 04 · Lore Lead → `/cid/theme/lore/`
Widest latitude in the category. Fully open: the ruin's identity and history, why it was
abandoned, what the four relic sets mean. Two constraints: the lore may not introduce a
conflict (zero tension), and it may not explain the world in a way that requires reading,
given an 8–14 mobile audience with 10–20 minute sessions. Lore that only exists in a wall of
text is lore nobody receives.

### 05 · Identity Lead → `/cid/theme/identity/`
**Read this before starting: the brief specifies no cast.** `02-GAMEPLAY.md`'s roster is 24
relics and nothing else. There are no NPCs, enemies, or named characters anywhere in the
brief, and the social model is "shared server, parallel progression, no mechanical
interaction."

So the honest scope here is **the player's role only**, and even that is unstated. **Do not
invent a cast.** If you conclude the game needs one, say so as a flagged recommendation to
the developer, not as a spec, because it is new work outside priority 1 and it would create
downstream obligations for character art, animation, and creature audio that nothing in the
brief funds.

### 06 · Vocabulary Lead → `/cid/theme/vocabulary/`
Wide latitude and high leverage: every other category is checked against your canonical list.
Fully open. Must cover at minimum: the single currency, the collection and its four sets, the
relics as a class, the areas, the clearing action, and the upgrade axes (value per unit, clear
radius, move speed). Two constraints: the terms must read at an 8–14 level on a phone, and
they must not borrow incremental-genre vocabulary, because the game is deliberately positioned
out of that category.

## Domains judged thin for this game, and why that is stated rather than silent

- **Identity** is thin because there is no cast. That is a legitimate finding, not
  under-service. Recorded so verification does not read it as a gap.
- **Lore** is wide but low-stakes: with no conflict and no text budget, lore mostly surfaces
  through relic naming and set themes, which makes it partly Vocabulary's and Meta & Content's
  problem in practice.

## Gaps in the brief this category hit

Passed upward rather than filled silently.

1. **No humor level stated.** Decided in `tone/02-humor-level.md` and tagged `[cid: decided]`.
2. **No player role stated.** Identity's only real subject is unstated in the brief.
3. **No cast, never explicitly ruled out.** The brief implies none but never says so, which is
   why this document says it instead.
