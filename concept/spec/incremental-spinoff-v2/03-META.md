# 03 — Meta

**Layer 3 — meta.** Anyone working on objectives, world structure, replayability,
monetization or scope reads this, plus layers 1–2 above it.

## Objectives

| scope | objective | measurable |
|---|---|---|
| moment | clear the patch in front of you | overgrowth disappears on contact |
| **session** | find at least one new relic | collection count rose this session |
| short-term | complete one set | 6 of 6 in a set |
| **long-term** | complete all four sets | 24 of 24 [you accepted: R6 Q3 → R5 Q3] |
| mastery | *none designed* | — |

**With endless areas, the collection is the only finishable thing** — which is why every
objective scope hangs off it. Alternatives declined: restoring one hero landmark (fights
endless generation), reaching the deepest layer (weak without something at the bottom), and
no long-term objective at all.

**Tuning burden:** discovery rates must be generous enough that a typical session yields at
least one find, or the stated session objective silently fails. **This is the highest-risk
tuning in the game** and it is the same risk the previous run identified.

**No mastery layer.** [I assumed] There is no execution skill in proximity-clearing to
master. Stated so nobody invents one.

## World

- **Areas, not zones.** Discrete spaces that are cleared and permanently done.
- **Depth is progression** — deeper areas are larger, denser, and hide rarer sets.
- **Endless via shuffled authored chunks**, not generation. [you chose: R5 Q1]
- **No gating mechanism needed** — with rebirth cut, depth is reached by clearing, not by
  hitting a threshold. [I assumed — follows from cutting rebirth; not interviewed]

Left open — what the ruin actually is, how chunks are themed by depth, and how many authored
layouts are needed before shuffling stops feeling repetitive.
*[currently: Meta & Content + Theme & Narrative]*

## Replayability

**An unfinished area and a half-empty index.** [you accepted: R3 Q3]

Both fall out of systems already chosen, so retention costs nothing extra. A daily new-area
unlock and a pure collection-driven pull were both offered; doing nothing at all was offered
and declined, so **there is a retention brief — just a cheap one.**

**Honest weakness:** without banked offline earnings, the pull to return is materially weaker
than the reference's. That was the accepted trade for permanence.

## Monetization stance

**Permanent multipliers only. Never content access.** [you accepted: R5 Q4]

- **Allowed:** permanent multipliers on clearing value, radius, move speed, relic luck.
- **Forbidden:** any paid area, relic, or set. **A paid-only object would turn 100%
  completion into a purchase**, which poisons the differentiating system.
- Matching the reference exactly was offered and declined precisely because it leaves paid
  content gating open. Cosmetics-only was offered and declined as needing a display system
  first.

The reference sells only 2x multipliers plus a 2,500-Robux oversized tool, zero cosmetics,
across 38M visits at a 96% like ratio. [research: `research/grass-incremental.md`]

**Note the tension:** with no whale-tool ladder equivalent decided, the high-price SKU has no
obvious home yet.

Left open — the SKU ladder, price points, and where a premium item sits given no tool ladder
was specified. *[currently: Monetization]*

## Scope & priority

**Priority 1 — first shippable version:**
proximity clearing · area-completion detection · three clearing upgrades · the 24-relic
4-set collection · chunk shuffling for endless areas · guaranteed first-area find.

**Priority 2 — after it works:**
richer authored chunk variety · a duplicate-handling refinement · visitable restored ruins.

**Priority 3 — explicitly not in this project:**
real procedural generation · rebirth · offline accrual · codes · daily rewards ·
leaderboards · trading · seasons and events.

[I assumed — the ordering; scope was resolved through R4 Q1 and R5 Q1 but no explicit
priority list was interviewed]

**Cost warning carried from `01-FOUNDATION.md`:** the "cheap to build" premise no longer
holds. Area-completion detection and chunk shuffling are new work the reference does not
have, and real procgen was wanted and traded away rather than never considered.
