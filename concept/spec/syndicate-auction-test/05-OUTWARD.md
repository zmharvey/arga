# 05 — Outward

> **⚠ SYNTHETIC TEST FIXTURE.** See `CONCEPT.md`.

**Layer 5.** Read every layer above this.

## Discovery hook

**"You can't afford it alone."** [simulated: R5 Q6]

- **It promises the one thing no competitor can claim.** Every occupant is a solo bid and a solo
  profit; this is the only line in the family that implies other people.
  [research: `research/landscape.md`]
- **It gives a thumbnail two composable halves** — a closed roller door with a price on it, and
  three or four players standing together looking at it.
- "Bid on storage units" was declined outright: it is Bid Battles' and Storage Hunters' exact
  promise, and one of them did 50.9M visits in a month.
  [research: https://www.rolimons.com/game/98800969324557]
- "Split the loot" was declined for implying the split happens *after* the reveal, which is the
  opposite of the design.

**The positioning risk is larger than the line, and it is real.** This game looks exactly like
two very successful games and plays differently underneath. Players arriving expecting Storage
Hunters will find a negotiation game and some will bounce. **This is a retention problem, not a
discovery problem**, and it cannot be solved by copy: the store page can only set the
expectation, and the first 90 seconds have to deliver a syndicate rather than a solo bid. See
`02-GAMEPLAY.md`.

**Name is not settled.** One constraint from research: **`storage`, `hunters`, `bid battles`
and any close variant are unusable** — two occupants own them and one is a month old and
growing. `syndicate`, `split`, `share` and `stake` all came back free across the searches run.

Left open — the name, icon, thumbnail composition, store description.
*[kind of work: naming and store presentation]*

## Live-ops intent

Default in `OPEN.md §2`, overridable.

**One asymmetry worth flagging, and it inverts the usual advice.** Content here is cheap (see
`03-META.md` extension cost) and **population is everything.** A quiet server is not a slightly
worse game, it is a broken one: a syndicate needs other humans. So live-ops effort is better
spent on concurrency — timed venue events that concentrate players into the same hours — than on
shipping more venues. **Shipping content to a game nobody is in is the wrong lever here**, and
that is the opposite of what a content-cheap design usually invites.

## References and how this differs

| reference | what it shares | how this differs |
|---|---|---|
| Storage Hunters: Open World (50.9M in ~1 month, peak CCU 47,940) | the peek, live PvP bidding, haul limits, resale | solo bid and solo profit; no permanent setback; private reveal |
| Bid Battles! (193.7M, 4 years) | garage auctions, find treasure, sell in your shop | solo throughout; shop-tycoon progression rather than reputation |
| Bid For Brainrot | player-versus-player bidding as the whole game | an explicit *duel*; no pooling, no split, no shared risk |
| Hit The Thrift | hunt, refurbish, resell for profit | no auction, no other bidders, no negotiation |
| Pawn Shop Simulator | valuing goods offered to you | you are the buyer at a counter, not a bidder in a crowd |

**The differences are all in the same place:** every one of these is a game about one player and
some objects. This is a game about several players and one object.

**One reference is not a Roblox game and is not listed above**, deliberately: the design's
closest ancestor is the pre-reveal binding-split structure found in real-world auction
syndicates. That is a real practice rather than a game, so it carries no monetization or session
assumptions at all, and citing it would imply a precedent that does not exist in this medium.
