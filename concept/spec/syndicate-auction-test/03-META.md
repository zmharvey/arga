# 03 — Meta

> **⚠ SYNTHETIC TEST FIXTURE.** See `CONCEPT.md`.

**Layer 3.** Read layers 1–2 above this.

## Objectives

| scope | objective | measurable |
|---|---|---|
| moment | decide whether this lot is worth the current bid | you bid or you pass |
| **session** | be in at least one profitable syndicate | net cash rose |
| short-term | reach a reputation tier that unlocks larger syndicates | tier changed |
| long-term | **be someone the best syndicates want** — top reputation tier | tier reached |
| mastery | valuation accuracy: how close your estimate is to the realised value | tracked per lot |

**Reputation is the long-term objective, not wealth.** [simulated: R4 Q1] Cash is a means; the
thing you accumulate that cannot be lost to a bad lot is standing.

**Mastery is valuation**, and it is measurable in a way most Roblox games' mastery is not: the
game knows what you guessed and what it was worth.

**Tuning burden:** the peek must carry real but incomplete information. Too informative and
negotiation is arithmetic; too vague and it is a coin flip nobody can get better at. **This is
the highest-risk tuning in the game** and it has no external reference, since no occupant's
peek figures could be sourced.

## World

- **Venues, not an open world.** [simulated: R4 Q2] Discrete auction sites, each with its own
  lot value band and its own crowd. You travel between them.
- **Venues gate on reputation, not cash.** [simulated: R1 Q1] A higher venue admits you when
  syndicates there will take you. This keeps reputation as the progression spine.
- **Time of day: yes, and it is mechanical.** [simulated: R4 Q2] Venues run on a schedule, so
  which venues are open depends on when you play. Late venues have the best lots and the
  thinnest crowds, which changes the negotiation.
- **Weather: no.** [simulated: R4 Q2] Explicitly ruled out. Interiors and yards under lights;
  weather would cost art and audio budget for no mechanical return. **Stated so nobody invents
  it.**

Left open — how many venues, what they are, how the schedule reads.
*[kind of work: venue and schedule authoring]*

## Replayability

**A fresh crowd and fresh lots every session.** [simulated: R4 Q3]

- Lots are generated from bands, so the inventory is never the same twice.
- **The crowd is the real variable.** Who is on the server determines what syndicates are
  possible, and that changes every session at no content cost.
- Valuation accuracy gives a personal-best track.

**Honest weakness:** the social variable cuts both ways. A quiet server is a worse game, and
unlike a solo title this design **degrades badly at low population.** That is the central
retention risk and it is structural.

## Monetization stance

**Cosmetics and shop decoration only.** [simulated: R4 Q4]

- **Allowed:** avatar and venue cosmetics, shop decoration, extra storage slots, a cosmetic
  reputation frame.
- **Forbidden:** any bid multiplier, any starting-cash advantage, any reputation purchase, any
  paid information about a lot. **Money must not buy negotiating position**, because the
  negotiation is the game.
- Cosmetics work because you are read by other players — being visually distinctive has social
  value here, which is rarer than it sounds.

**Note the tension:** with bid power, information and reputation all forbidden, the high-price
SKU has no obvious home. Cosmetics on a 13+ audience is a thinner ceiling than a multiplier.

Left open — the SKU ladder and price points. *[kind of work: the offer ladder]*

## Scope & priority

**Priority 1 — first shippable version:**
one venue · the peek · live bidding · syndicate formation 2–4 · the enforced split contract ·
the reveal · selling a share · reputation for honoured bids · 40 items in 5 bands ·
zero-cash floor and the 0% seat · guaranteed first invite.

**Priority 2 — after it works:**
additional venues · reputation tiers gating venues · the venue schedule and time of day ·
valuation-accuracy tracking · shop decoration.

**Priority 3 — explicitly not in this project:**
trading · weather · PvP combat · seasons and events · codes · daily rewards · leaderboards ·
guilds · renegotiation after reveal · a full player-driven market.

[simulated: R4 Q5]

**Note that reputation-for-honoured-bids is priority 1 while reputation tiers are priority 2.**
Separated deliberately: the anti-bad-faith function is needed on day one, the progression
function is not.

## Extension cost

**Low, and that is a genuine advantage.** [simulated: R4 Q6]

The next unit of content after launch is **one venue plus a value band**, and it costs:

- an authored venue space, which is a room and a yard rather than a landscape
- a band definition and its item types, which are data
- a schedule slot

**The world does not have to be built to gate anything.** Progression gates on reputation,
which is a number, so a new venue needs no bespoke traversal or access design. Compare an
authored world gated on player capability, where every unit of content must be designed around
the gate.

**What it permits:** a real update cadence. New venues, new bands and new item types are all
cheap, and the *crowd* — the thing that actually varies the game — is free content generated by
players being present.

**What it still does not permit:** anything depending on population. No cadence can fix a quiet
server, so live-ops effort is better spent on concurrency than on content.

**Stated because it is the inverse of the usual case**, and because a roadmap sized against
"content is expensive" would under-ship here. System cost and world cost are different numbers,
and both are low in this design.
