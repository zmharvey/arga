# Handoff — subject index

> **⚠ SYNTHETIC TEST FIXTURE.** No developer was interviewed. Every `[simulated]` tag is really
> an `[I assumed]`. **Do not feed this to a build.**

**This is an index, not a staffing chart.** Route yourself: **read `CONCEPT.md`, `00-CORE.md`,
then every numbered sheet up to and including the deepest layer your work touches.** Also read
`03-META.md` for scope and `OPEN.md` for latitude, whatever your layer.

## Layer dependency order

| layer | sheet | answers |
|---|---|---|
| — | `CONCEPT.md` | the whole game in ~30 lines. Everyone reads this |
| — | `00-CORE.md` | purpose, where distinction lives, audience, genre |
| 1 | `01-FOUNDATION.md` | theme, **tone**, the core loop |
| 2 | `02-GAMEPLAY.md` | the split contract, reputation, controls, economy, roster, social, onboarding, failure |
| 3 | `03-META.md` | objectives, world, replayability, monetization, scope, **extension cost** |
| 4 | `04-PRESENTATION.md` | art, visual feedback, screens, accessibility, integrity, device floor |
| 5 | `05-OUTWARD.md` | hook, positioning risk, live-ops, references |
| — | `research/landscape.md` | **read this first** — the premise was fully occupied |
| — | `OPEN.md` | audit, batched defaults, assumptions, what is left open |
| — | `VERIFIED.md` | the gate. Check it before trusting anything above |

## How much latitude you have

| tag | latitude |
|---|---|
| `[simulated: RN QN]` | **a stand-in for a developer who was never asked. Treat as `[I assumed]`: freely arguable.** |
| `[research: url]` | sourced fact — argue with the source, not the sheet |
| `[I assumed]` | a starting point. All in `OPEN.md §5` |

**There are no binding tags in this brief.** Nothing was decided by a developer. Every
downstream agent has maximum latitude and no authority to defer to.

## Seven things to know before designing anything

1. **The premise is occupied at ~245M visits and one occupant is a month old.** Bid Battles
   (193.7M) and Storage Hunters: Open World (50.9M in one month, peak CCU 47,940) both ship
   bidding on unopened lots and reselling. `research/landscape.md`
2. **The peek, live PvP bidding and haul limits are genre-standard, not distinctions.** They were
   adopted deliberately from the incumbent, not invented here.
3. **The differentiator is the pre-reveal split contract.** Shares are agreed *before* anyone sees
   the contents, and **the game enforces them.** No renegotiation, ever. That is the whole design.
4. **Reputation is the progression track, not cash.** And it must key on behaviour a player
   controls, never on outcome, or it punishes bad luck.
5. **Other players are the mechanic.** This design is broken on a quiet server, not merely
   quieter. That is the central structural risk.
6. **Chat is a control surface, and it forces the 13+ band.** A game whose skill is talking
   cannot target the band that cannot talk freely.
7. **Jeopardy is intended.** Roughly one lot in three should disappoint. Do not soften the reveal
   to protect a losing player; tone forbids mockery, not loss.

## Four risks the sweep surfaced

- **Low population breaks it**, structurally and unfixably by content.
- **Alt-account collusion has no clean solution** and is the reason trading is excluded.
- **`ui-forge` cannot build three needed shapes**, and one is `syndicate-contract`, which is the
  differentiator itself: a form with per-player editable percentages summing to 100. `modal-grid`
  has no numeric input at all. `04-PRESENTATION.md`
- **The onboarding promise depends on another human acting**, which no tutorial can guarantee.

## What is left for you

`OPEN.md §4`, named by kind of work. Highest-risk item: **the peek's information content.** Too
clear and negotiation becomes arithmetic; too vague and nobody can improve at valuation, which
removes the mastery layer.

## Downstream

`ui-forge` (stage 1) builds UI. Vibe key: **`clean-modern`** — verified against the token file,
which is a dark cool ground with low juice. Do not describe it as warm. **No code currently reads
these sheets**; the bridge from markdown to `game-context.json` does not exist.
