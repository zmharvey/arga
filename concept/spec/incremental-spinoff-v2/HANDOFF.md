# Handoff — subject index

**This is an index, not a staffing chart.** Whatever creative agents exist, they route
themselves: **read `CONCEPT.md`, `00-CORE.md`, then every numbered sheet up to and including
the deepest layer your work touches.**

## Layer dependency order

Each layer needs the ones above it. If your work is at layer N, everything in layers 1..N-1
is a constraint you inherit, not a decision you get to make.

| layer | sheet | answers |
|---|---|---|
| — | `CONCEPT.md` | the whole game in ~25 lines. Everyone reads this |
| — | `00-CORE.md` | purpose, where distinction lives, audience, genre |
| 1 | `01-FOUNDATION.md` | what this IS and what you DO in it |
| 2 | `02-GAMEPLAY.md` | systems, controls, economy, roster, social, onboarding, failure |
| 3 | `03-META.md` | objectives, world, replayability, monetization, scope |
| 4 | `04-PRESENTATION.md` | art, accessibility, integrity, screens |
| 5 | `05-OUTWARD.md` | discovery hook, live-ops |
| — | `research/grass-incremental.md` | the reference, with corrections |
| — | `research/landscape.md` | **read this** — why the noun cannot differentiate |
| — | `OPEN.md` | audit, batched defaults, assumptions, what is left open |

## Find your subject

| subject | sheet |
|---|---|
| theme, fiction, tone, the ruin | `01-FOUNDATION.md` |
| core loop, area completion, permanence, what was cut | `01-FOUNDATION.md` |
| mechanics, chunk shuffling, upgrade axes | `02-GAMEPLAY.md` |
| controls, input, game feel | `02-GAMEPLAY.md` |
| economy and the duplicate problem | `02-GAMEPLAY.md` |
| the relic roster — structure and scale | `02-GAMEPLAY.md` |
| players, server shape, social model | `02-GAMEPLAY.md` |
| onboarding, the first ten seconds | `02-GAMEPLAY.md` |
| failure, friction, and why tension is zero | `02-GAMEPLAY.md` |
| objectives across moment/session/long-term | `03-META.md` |
| world, areas, depth, endlessness | `03-META.md` |
| replayability and the return hook | `03-META.md` |
| monetization stance and its hard limit | `03-META.md` |
| scope and shipping order | `03-META.md` |
| art direction and the `ui-forge` vibe key | `04-PRESENTATION.md` |
| accessibility — **one hard constraint** | `04-PRESENTATION.md` |
| integrity, exploits, what must be secured | `04-PRESENTATION.md` |
| screens and UI shape | `04-PRESENTATION.md` |
| audio, technical shape, measurement | `OPEN.md §2` (defaults, overridable) |
| discovery hook, name, pitch, positioning | `05-OUTWARD.md` |
| live-ops intent | `05-OUTWARD.md` + `OPEN.md §2` |

## How much latitude you have

| tag | latitude |
|---|---|
| `[you said]` | **binding** — stated in the original brief |
| `[you chose]` | **binding** — actively decided against an alternative |
| `[you accepted]` | **provisionally binding** — a recommendation taken without objection. Push back with good reason |
| `[research: url]` | sourced fact — argue with the source, not the sheet |
| `[I assumed]` | **a starting point,** freely arguable. All listed in `OPEN.md §5` |

**Read this before you start.** Roughly **half this spec is `[you chose]`** — 11 of 22
interview answers were active decisions against a stated alternative, including every layer-1
item. Treat those as firm. The `[you accepted]` half is softer.

## Six things to know before you design anything

1. **The noun is not the differentiator.** Grass, lumber, ore, scrap, leaves, snow (×3),
   slime, souls, sand and pressure-washing are all occupied, several with identical marketing
   copy. Distinction lives in the **collection layer**. `research/landscape.md`
2. **Cleared is permanent** and **rebirth and offline accrual are cut.** Three of the
   reference's seven systems are gone. Do not reintroduce them.
3. **This is a restoration game, not an incremental** — despite incremental bones.
4. **Tension is zero by design**, confirmed deliberately. Audio and visual feedback carry the
   entire feedback load. **Do not invent tension to fill the gap.**
5. **Duplicate relics must be solved without adding a currency.**
6. **Rarity tiers must differ by shape or silhouette, not only hue** — colour-only tiers
   exclude ~1 in 12 boys in this age band from the core economic signal.

## Two risks the sweep surfaced

- **World state is now save data.** Permanent clearing means per-area cleared state persists
  and grows unbounded unless finished areas collapse to a completion flag. The reference has
  no equivalent risk. → `OPEN.md §2`
- **The premium SKU has no home.** Monetization is multipliers-only, but the reference's
  high-price item was an oversized *tool*, and no tool ladder was specified here.
  → `03-META.md`

## What is left for you

`OPEN.md §4`, **named by kind of work** rather than department so it routes however the lineup
is arranged. Highest-risk item: **discovery rates per depth tier** — the session objective is
"find one new relic", so if rates are too low that objective silently fails.

## The current consumer lineup — volatile, not structural

As of writing, the downstream set is ~14 agents in 5 waves. **That lineup is expected to
change and nothing above depends on it.** Recorded only as a convenience:

Theme & Narrative · Core Loop *(1)* · Systems · Mechanics · Social *(2)* · Meta & Content ·
Monetization *(3)* · UI/UX · Art & Visuals · Audio · Tech & Data · Analytics *(4)* ·
Discovery & Marketing · Live Ops *(5)*

## Downstream of the creative work

`ui-forge` (stage 1) builds UI. Vibe key is fixed: **`fantasy-ornate`**. Note that **no code
currently reads these sheets** — the bridge from markdown to `game-context.json` does not
exist yet. See `concept/README.md`.
