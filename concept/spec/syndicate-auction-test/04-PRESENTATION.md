# 04 — Presentation & support

> **⚠ SYNTHETIC TEST FIXTURE.** See `CONCEPT.md`.

**Layer 4.** Read layers 1–3 above this.

## Art direction

**`ui-forge` vibe key: `clean-modern`** [simulated: R5 Q1]

In words: concrete, chain-link, sodium and strip light, painted line markings. Ordinary and a
little grubby. The interface is hard-edged and legible over it.

Three reasons it beat the alternatives:

1. **Numbers are the content.** Bids, shares, percentages and value estimates all have to be
   read fast under a closing clock. `clean-modern` is the only archetype built for
   instrumentation.
2. **`cartoon-vibrant` would fight the tone.** Wry and transactional is not loud, and a
   cartoon treatment would make the money feel fake, which removes the jeopardy.
3. **`premium-gloss` would read as gacha**, promising randomised rewards — exactly the wrong
   expectation for a game where value is meant to be learnable, not rolled.

**Note the check** made against the token file rather than the key's name: `clean-modern`
resolves to a dark cool ground with low juice, which suits sodium-lit concrete and does **not**
suit anything warm. A previous brief in this repo picked this key and then described it as
"warm, sunlit", which was flatly wrong. This one describes what the key actually is.

Left open — the 40 items, venue looks, how a value band reads at a glance, the auctioneer
archetypes. *[kind of work: the asset list]*

## Visual feedback intent

**Visuals carry commitment and consequence; audio carries the clock.** [simulated: R5 Q2]

- **Who is in your syndicate and for what share must be visible continuously**, without opening
  anything, from the moment the contract is agreed until payout. This is the single most
  important readout in the game.
- **The closing clock must be visible and felt in the world**, not only as a number.
- **The reveal is the biggest moment and it is shared.** Every syndicate member sees the lot
  open at the same instant, and the visual has to work for three or four people reacting
  together rather than one player alone. Both incumbents reveal privately; this does not.
- **A losing reveal must be legible without being cruel.** The player should know immediately
  that it went badly, and the game must not editorialise. Tone forbids mockery.

Nothing else peaks.

## Audio intent · Technical shape · Measurement

Defaults in `OPEN.md §2`, overridable.

## Screens

Deriving the full set is interface work. Implied by the systems chosen:

| screen | priority | implied by |
|---|---|---|
| `syndicate-contract` | 1 | the split agreement — **the differentiator's home** |
| `lot-reveal` | 1 | the shared peak |
| `item-sale` | 1 | selling your share |
| `reputation-profile` | 2 | the progression track |
| `venue-select` | 2 | venues and the schedule |

**`ui-forge` capability warning.** The build stage produces only *centred dismissible panels
holding a grid of items* (`modal-grid`). `lot-reveal` and `item-sale` fit that shape well.

**Three things this game needs do not fit, and one is load-bearing:**

1. **A persistent auction HUD** — current bid, closing clock, your syndicate and its shares must
   all be visible *during* bidding, which is the entire game. **This is not optional.**
2. **`syndicate-contract` is a form, not a grid.** It needs per-player rows with editable
   percentages that must sum to 100, plus accept states per member. `modal-grid`'s item card
   carries art, name and price and has no numeric input at all.
3. **`reputation-profile` is a record**, not a grid of items.

Interface work should know it is proposing three shapes that do not exist, and that the
contract screen is the differentiator, so its absence is not a cosmetic gap.

## Accessibility

**Two hard constraints, and one accepted exclusion.** [simulated: R5 Q3]

1. **Value bands must not be signalled by colour alone.** A band is the core economic signal
   and a player who cannot read it cannot value a lot. Shape or icon as well as hue.
2. **The closing clock must not rely on audio alone**, since it is the main time pressure and
   many players play muted.

**Accepted exclusion, stated as a decision:** this game requires reading and typing under time
pressure. That excludes players with low reading fluency and some motor impairments, and it
cannot be removed without removing the negotiation. **A text-free version of this game does not
exist.** Recorded so it is a decision rather than an accident.

Reading load is **high** — the highest of any brief in this repo. That is inherent.

## Integrity

[simulated: R5 Q4]

- **The split contract is the critical surface.** Share allocation and payout must be
  server-authoritative and immutable once agreed, or the differentiator is exploitable.
- **Reputation must be server-side and non-transferable.** It is the progression track and the
  anti-bad-faith mechanism at once.
- **Alt-account collusion is the real threat**, and it is specific to this design: two accounts
  in one syndicate can farm reputation for each other, or one can absorb a loss to protect the
  other. **This has no clean solution and must be designed for rather than assumed away.** It is
  the main reason trading is excluded.
- **Bid amounts must be server-validated.** A client claiming an arbitrary bid controls
  every auction.
- **No player-authored content beyond chat**, which Roblox filters. No custom moderation surface.

## Technical shape note

**Device floor: a 3 GB-RAM Android phone of roughly 2019 vintage.** [simulated: R5 Q5] Every
budget is set against that, not desktop. This design is unusually kind to it: venues are small
interiors, there is no open world and no streaming problem. **The real technical risk is not
rendering, it is latency** — a live shared auction with a closing clock is a real-time
consistency problem, and a player on a poor connection losing an auction to lag is a fairness
failure rather than a performance one.
