# Research — [🌱] Grass Incremental Simulator

**Relationship:** `reskin-base`. The functional skeleton is inherited deliberately and
almost unchanged; the fiction is replaced. [you said]

**Creator:** Unequal Games · **Game id:** 133086043677134 · Roblox, still labelled
early access. [research: https://www.roblox.com/games/133086043677134/Grass-Incremental-Simulator]

Identity confirmed before use — there are three similarly-named games and picking the
wrong one would have poisoned everything downstream:

| game | creator | why not this one |
|---|---|---|
| `[🌱] Grass Incremental Simulator` | Unequal Games | **this is the reference** |
| Grass Cutting Incremental | LethalDolphin | 5+ nested reset layers, far deeper — a much harder spin-off base |
| Lumber / Ore / Resource Incremental | various | already-shipped reskins of the same skeleton |

## Numbers

| metric | value |
|---|---|
| visits | 38,233,842 |
| favorites | 575,376 |
| like ratio | 96.2% (135,235 up / 5,319 down) |
| peak CCU (all-time) | 10,435 |
| **current CCU** | **819** |
| created / last update | ~1 year ago / 1 week ago |

[research: https://www.rolimons.com/game/133086043677134]

**The most important number here is the CCU decay: 10,435 peak to 819 current, while
still being actively updated weekly.** A 96% like ratio and 38M visits say the loop is
genuinely satisfying; the decay says satisfaction is not the same as retention. Any
spin-off inherits this shape by default and has to decide whether it is trying to beat
it or just ride it. This is the single most useful fact research produced.

## The functional skeleton

1. **Proximity auto-harvest.** Walk into a spawned object and it is collected — no
   click, no aim, no combat, no timing. Proximity alone triggers it.
2. **Currency**, earned per unit harvested.
3. **Three upgrade axes:** unit value, spawn/regrowth rate, collection radius.
4. **Rarity ladder** on the harvested object — Silver / Gold / Diamond, each a larger
   multiplier. A "luck" stat biases the roll.
5. **Zones (islands)** unlocked at rebirth milestones, each carrying its own stacking
   multiplier upgrades.
6. **Rebirth.** Resets currency and purchased upgrades; grants a permanent-multiplier
   currency. Repeatable, and the spine of long-term progression.
7. **Idle.** Objects keep spawning while offline, so returning has banked value.

[research: https://www.rosenberryrooms.com/grass-incremental/]

**Sources disagree on currency count.** The beginner guide describes essentially one
currency plus rebirth currency. The game-pass list contains `2x Bronze` and `2x EXP`,
which imply at least one further currency and a character level track. The live game is
almost certainly richer than the guide. Treat "one currency" as the *minimum* skeleton,
not a verified description of the reference.

## Monetization — pure pay-for-multiplier

| pass | Robux |
|---|---|
| 2x Walkspeed | 29 |
| 2x Rebirths | 99 |
| 2x Grass Luck | 99 |
| 2x EXP | 99 |
| 2x Bronze | 199 |
| [OP] Giant Trimmer | 2,500 |

Offsale: "2x Grass", "Nothing". [research: https://www.rolimons.com/game/133086043677134]

**Every single SKU is a permanent multiplier on an axis the player is already grinding,
or a bigger tool.** There are no cosmetics at all. The 29-Robux walkspeed pass is the
impulse entry point; the 2,500-Robux Giant Trimmer is the whale item and is a radius
upgrade, i.e. the most directly felt of the three axes.

This is a decision the spin-off inherits by default and may not want.

## What players of this will expect

- Numbers that keep climbing, visibly, with no dead stretches.
- Rebirth as the correct move, telegraphed — players want to be told when to reset.
- A luck/rarity roll to chase, and a visible collection of what they have found.
- Offline earnings, so returning is rewarded.
- Codes for free boosts, and a group-join reward. Both are near-universal on Roblox
  incrementals and their absence reads as an unfinished game.
- Zones as the visible marker of progress.

## Not verified

- Actual island count, and the rebirth thresholds that gate them.
- How `Bronze` and `EXP` work, what they are spent on, and how they relate to the
  primary currency.
- Time-to-first-rebirth (the key pacing number). One guide source returned HTTP 405 and
  I did not substitute a guess.
- Whether pets, auto-collectors or any automation beyond passive regrowth exist.
- Revenue. Visit and CCU figures are third-party estimates, not developer-reported.
