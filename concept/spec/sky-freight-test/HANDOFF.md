# Handoff — subject index

> **⚠ SYNTHETIC TEST FIXTURE.** No developer was interviewed. Every `[simulated]` tag is
> really an `[I assumed]`. **Do not feed this to a build.** It exists to exercise the
> stage-0 gates.

**This is an index, not a staffing chart.** Whatever agents exist, they route themselves:
**read `CONCEPT.md`, `00-CORE.md`, then every numbered sheet up to and including the deepest
layer your work touches.** Also read `03-META.md` for scope and `OPEN.md` for latitude,
whatever your layer.

## Layer dependency order

| layer | sheet | answers |
|---|---|---|
| — | `CONCEPT.md` | the whole game in ~30 lines. Everyone reads this |
| — | `00-CORE.md` | purpose, where distinction lives, audience, genre |
| 1 | `01-FOUNDATION.md` | theme, **tone**, the core loop |
| 2 | `02-GAMEPLAY.md` | capability classes, controls, economy, roster, social, onboarding, failure |
| 3 | `03-META.md` | objectives, world with day/night and wind, replayability, monetization, scope |
| 4 | `04-PRESENTATION.md` | art, visual feedback, screens, accessibility, integrity, device floor |
| 5 | `05-OUTWARD.md` | hook, positioning, live-ops, references |
| — | `research/landscape.md` | **read this** — why the opening premise was abandoned |
| — | `research/creature-taming-incumbents.md` | the two games that own the fantasy |
| — | `OPEN.md` | audit, batched defaults, assumptions, what is left open |
| — | `VERIFIED.md` | the gate. Check it before trusting anything above |

## How much latitude you have

| tag | latitude |
|---|---|
| `[you said]` | binding — stated in the original idea |
| `[simulated: RN QN]` | **a stand-in for a developer who was never asked. Treat as `[I assumed]`: freely arguable.** |
| `[research: url]` | sourced fact — argue with the source, not the sheet |
| `[I assumed]` | a starting point. All listed in `OPEN.md §5` |

**Read this before you start.** There are **no binding tags in this brief.** Nothing here was
decided by a developer. On a real run roughly half of a good brief is `[you chose]`; here it
is zero, and every downstream agent has maximum latitude and no authority to defer to.

## Six things to know before designing anything

1. **The opening premise is occupied at 1.9 billion visits.** Tame-flying-creatures-on-islands
   belongs to Dragon Adventures (1.67B) and the official How To Train Your Dragon (201M).
   Distinction lives in **capability gating** and **creature-borne freight**, nowhere else.
   `research/landscape.md`
2. **"Each creature changes how you travel" is not a distinction.** Palworld ships it as the
   reference implementation and Dig It ships it on Roblox. The gate on *space* is the new part.
3. **The creature is a key, not a stat.** A gated route is impossible, not merely harder.
4. **Failure exists and tension is intended** — cargo can be lost. Do not smooth it away.
5. **Free flight is the genre default and this game breaks it.** That will read as friction
   to anyone arriving from either incumbent. It is an accepted cost, not an oversight.
6. **Never put a capability behind money.** It would gate map content on payment.

## Three risks the sweep surfaced

- **A stall state exists.** A player with the wrong classes and no currency has no takeable
  contract. The board must always offer one, without adding a second currency.
- **`ui-forge` cannot build three shapes this game needs**, and one of them — a persistent
  flight HUD — is load-bearing rather than a nicety. `04-PRESENTATION.md`
- **The world is expensive to extend.** An authored archipelago gated on capability cannot
  add content cheaply, which makes a heavy live-ops cadence a poor fit. `05-OUTWARD.md`

## What is left for you

`OPEN.md §4`, named by kind of work. Highest-risk item: **the guaranteed-takeable-contract
rule** — if the board can present a player with nothing they can fly, the session objective
is unreachable and the game reads as broken rather than hard.

## Downstream

`ui-forge` (stage 1) builds UI. Vibe key: **`clean-modern`**. Note that **no code currently
reads these sheets** — the bridge from markdown to `game-context.json` does not exist.
