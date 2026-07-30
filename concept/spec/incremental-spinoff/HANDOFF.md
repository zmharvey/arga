# Handoff — subject index

**This is an index, not a staffing chart.** Whatever creative agents exist, they route
themselves: **read `CONCEPT.md`, `00-CORE.md`, then every numbered sheet up to and
including the deepest layer your work touches.**

## Layer dependency order

Each layer needs the ones above it. If your work is at layer N, everything in layers
1..N-1 is a constraint you inherit, not a decision you get to make.

| layer | sheet | answers |
|---|---|---|
| — | `CONCEPT.md` | the whole game in 20 lines. Everyone reads this |
| — | `00-CORE.md` | purpose, audience, genre, measurement — the framing |
| 1 | `01-FOUNDATION.md` | what this IS and what you DO in it |
| 2 | `02-GAMEPLAY.md` | what the systems are and how they feel |
| 3 | `03-META.md` | what it is all for, over weeks |
| 4 | `04-PRESENTATION.md` | how it looks, sounds, persists, gets measured |
| 5 | `05-OUTWARD.md` | how it is found and kept alive |
| — | `research/*.md` | sourced findings on reference games |
| — | `OPEN.md` | coverage audit, assumptions, and what is left open |

## Find your subject

| subject | sheet |
|---|---|
| theme, fantasy, tone, fiction | `01-FOUNDATION.md` |
| core loop, lap length, escalation, closure | `01-FOUNDATION.md` |
| mechanics, the signature hook | `02-GAMEPLAY.md` |
| controls, input scheme, game feel | `02-GAMEPLAY.md` |
| economy, currencies, faucets, sinks | `02-GAMEPLAY.md` |
| content roster structure and scale | `02-GAMEPLAY.md` |
| players, server shape, social model | `02-GAMEPLAY.md` |
| onboarding, the first sixty seconds | `02-GAMEPLAY.md` |
| failure states, friction, being stuck | `02-GAMEPLAY.md` |
| objectives across moment/session/month | `03-META.md` |
| world, zones, progression gating | `03-META.md` |
| replayability, reasons to return | `03-META.md` |
| monetization stance and its limits | `03-META.md` |
| scope and shipping order | `03-META.md` |
| art direction and the `ui-forge` vibe key | `04-PRESENTATION.md` |
| screens and UI shape | `04-PRESENTATION.md` |
| accessibility and who is excluded | `04-PRESENTATION.md` |
| integrity, exploits, what must be secured | `04-PRESENTATION.md` |
| audio, technical shape, analytics | `OPEN.md §2` (defaults, overridable) |
| discovery hook, name, pitch | `05-OUTWARD.md` |
| live-ops and update intent | `05-OUTWARD.md` + `OPEN.md §2` |

## How much latitude you have

| tag | latitude |
|---|---|
| `[you said]` | **binding** — stated in the original brief |
| `[you chose]` | **binding** — actively decided against an alternative |
| `[you accepted]` | **provisionally binding** — a recommendation taken without objection. Push back if you have a good reason |
| `[research: url]` | sourced fact — argue with the source, not the sheet |
| `[I assumed]` | **a starting point,** freely arguable. All listed in `OPEN.md §5` |

**Read this before you start.** There are **zero `[you chose]` tags in this spec.** All 19
interview answers were the recommended option, so everything reads `you accepted`. Nothing
was contested, and `OPEN.md §1` records two layer-1 items — **the core loop and the
audience** — never directly interviewed at all. You have more latitude than a normal spec
would give you. Use it, and say when you disagree.

## What is left for you

`OPEN.md §4` lists it, **named by kind of work** rather than by department — so it routes
correctly however the agent lineup is arranged. Highlights:

- all numeric curves and thresholds
- naming, fiction and tone copy
- the 24 buried objects and the tool ladder's visual escalation
- the four set themes and their completion bonuses
- the SKU ladder and price points
- the full screen set, including a persistent HUD `ui-forge` cannot currently build
- discovery rates per tier — **the highest-risk tuning in the game**

## Two constraints worth knowing before you start

- **Duplicates must be solved without introducing a third currency** (`02-GAMEPLAY.md`).
- **Every rarity tier must be distinguishable by shape or sparkle, not only hue**
  (`04-PRESENTATION.md`) — colour-only tiers exclude ~1 in 12 boys in this audience.

## Sheets not written, and why

- `NARRATIVE.md` — folded into `01-FOUNDATION.md`. Whether narrative exists at all is left
  open; a proximity-clearing incremental may correctly have none.
- `TECHNICAL.md` — short enough to live in `OPEN.md §2` at this scope. Promote it if it grows.

## The current consumer lineup — volatile, not structural

As of this writing the downstream set is a Creative Idea Department of ~14 agents in 5
waves. **That lineup is expected to change and nothing above depends on it.** It is
recorded here only as a convenience:

Theme & Narrative · Core Loop *(layer 1)* · Systems · Mechanics · Social *(layer 2)* ·
Meta & Content · Monetization *(layer 3)* · UI/UX · Art & Visuals · Audio · Tech & Data ·
Analytics *(layer 4)* · Discovery & Marketing · Live Ops *(layer 5)*

## Downstream of the creative work

`ui-forge` (stage 1) consumes a game context to build UI. The vibe key it needs is already
fixed: **`cartoon-vibrant`**. Note that **no code currently reads these sheets** — the
bridge from markdown to `ui-forge`'s `game-context.json` does not exist yet. See
`concept/README.md`.
