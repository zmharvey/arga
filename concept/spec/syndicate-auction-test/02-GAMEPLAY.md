# 02 — Gameplay

> **⚠ SYNTHETIC TEST FIXTURE.** See `CONCEPT.md`.

**Layer 2.** Read layer 1 above this.

## Mechanics

| mechanic | role | notes |
|---|---|---|
| **the pre-reveal split contract** | **the differentiator** | agreed before contents are known, enforced by the game [simulated: R1 Q1] |
| **partner reputation** | **the progression track** | persistent, non-tradeable [simulated: R1 Q2] |
| syndicate formation | core | who is in, and for what share |
| partial peek | core | genre-standard; adopted deliberately [research: https://gamelandinsider.com/storage-hunters-open-world-guide] |
| live bidding | core | genre-standard; adopted deliberately [research: https://gamelandinsider.com/storage-hunters-open-world-guide] |
| lot reveal | core | a **shared** moment, unlike both incumbents |
| selling your share | core | see economy |
| ~~trading between players~~ | **cut** | priority 3 — see integrity |
| ~~renegotiating after the reveal~~ | **cut** | it is the whole point that you cannot |

### The split contract

- A syndicate is **2 to 4 players.** [simulated: R3 Q4]
- Shares are agreed as percentages summing to 100, before the lot opens.
- **The game enforces distribution.** No player ever holds another's share.
- **Contracts cannot be renegotiated after the reveal**, and this is load-bearing rather than
  a convenience: the entire skill is committing under uncertainty.

**Why enforcement and not trust** [simulated: R2 Q2]: trust-based splitting on Roblox is
scamming with extra steps. It would make the game's core loop a moderation problem, and on a
13+ audience that is not a trade worth making. Trust-based was offered and declined.

## Controls & game feel

- **Input: movement, one context button, and chat.** [simulated: R3 Q2] Chat is not a side
  feature here; it is a control.
- **Bidding is a single button with a rising number**, not a timing minigame. The incumbent
  uses a marker-on-a-bar skill check; **declined**, because a reflex test would decide auctions
  that should be decided by judgement.
- **Device split:** ~50 / 45 / 5, desktop-heavy for a Roblox game because typing matters.
  [simulated: R1 Q4]
- **Feel:** the clock is the primary sensation. An auction closing must feel like it is
  closing. [simulated: R3 Q2]

Left open — bid increment behaviour, the closing-clock curve, how a syndicate invite reads on a
phone. *[kind of work: all numeric curves, and interface feel]*

## Economy

**One currency, plus a non-tradeable reputation score.** [simulated: R3 Q3]

| faucet | sink |
|---|---|
| selling your share of a won lot | bids |
| | shop and storage upgrades |

- **Reputation is not a currency.** It cannot be bought, sold, given or spent. It only rises and
  falls with how syndicates you joined performed and whether you honoured your bids.
- **Cash can reach zero but never goes negative.** [simulated: R2 Q3] A player at zero can still
  join a syndicate at a 0% share to rebuild reputation, which is the floor that stops a dead end.
- **A second currency was offered and declined**: the split is already the interesting
  allocation problem, and a second currency would give players a way to be rich and stuck.

**Known consequence — reputation is a griefing surface.** A player can be blamed for a
syndicate's bad luck. **Constraint on whoever designs systems: reputation must key on
behaviour a player controls (did you pay your share, did you honour the bid) and never on
outcome.** Otherwise it punishes bad lots rather than bad partners.

## Content roster

Structure settled; the items are invented downstream.

- **~40 item types across 5 value bands.** [simulated: R3 Q4] Bands, not rarities — a band is a
  price range, because the skill being tested is valuation.
- **Item value must be learnable.** A player who has seen a band twice should be able to
  estimate it. This forbids random per-instance value rolls, which both incumbents lean on.
- **Lots are generated from bands with a visible partial cue**, so the peek is informative
  without being decisive.
- **Cast: yes, minimal.** An auctioneer archetype per venue. No named characters, no enemies.
  [simulated: R3 Q5]
- **Player body: their own Roblox avatar.** [simulated: R3 Q5] Necessary — you are reading
  people, so people must be visible and distinguishable.

Left open — the 40 items, what the bands are called, the auctioneer archetypes.
*[kind of work: the roster and the asset list]*

## Players / social model

**Shared server 8–16. The other players are the mechanic.** [simulated: R3 Q1]

- **Server size 8–16** [simulated: R3 Q1]: a syndicate is 2 to 4, and there must be enough
  players for at least two competing syndicates plus non-participants. Below 8 the auction is
  not competitive; above 16 negotiation gets too noisy to follow.
- **No PvP combat, no stealing, no trading.** The competition is economic only.
- **Chat: Roblox's own chat, on, and it is a control surface.** [simulated: R3 Q1] No custom
  negotiation UI beyond proposing and accepting a split, because free-text is where the actual
  negotiation happens and a structured UI would flatten it.
- **Moderation stance: platform default, plus one game-specific need.** Roblox handles abuse.
  What Roblox cannot see is a player repeatedly agreeing splits and then refusing to bid, so
  **failing to honour a bid must be a reputation penalty rather than a report.** Handling
  bad-faith play inside the economy rather than through moderation is a deliberate decision.

**No trading is an integrity decision, not an omission:** tradeable items plus enforced splits
would let two accounts launder a share and defeat reputation.

Left open — whether 8–16 is right, and what a syndicate invite should feel like socially.
*[kind of work: social feel]*

## Onboarding / first session

**Join someone else's syndicate on a cheap lot and get paid, inside 90 seconds.**
[simulated: R3 Q6]

The player spawns at a venue mid-auction with an open syndicate invite on screen and a
suggested share already filled in. They accept, the syndicate wins, the lot opens, they are
paid. **They learn by receiving before they learn by negotiating.**

**What must be understood before they are allowed to be confused:** that a share is agreed
before the lot opens, and that other people are involved. Bidding, valuation and reputation are
all taught later.

**Requires a guaranteed open invite in the first venue** and a lot cheap enough that any
syndicate wins it. Generation must not decide this one.

**90 seconds, not 60** — the previous briefs in this repo used 60, and this loop cannot fit in
it: forming a syndicate needs another human to act. That is an accepted cost of a social loop.

Left open — the second-lot choreography that teaches negotiation.
*[kind of work: onboarding beats]*

## Failure & friction

**Failure is real, shared, and bounded.** [simulated: R3 Q7]

- **A syndicate can overpay.** The lot is worth less than the bid and everyone loses
  proportionally to their share.
- **Cash floors at zero.** Never negative, never a debt mechanic.
- **The real cost is reputation**, and only for behaviour you control: not paying your share,
  or not honouring a bid you agreed to.
- **A stuck player cannot exist** — a 0% share syndicate seat is always available, which earns
  no cash but rebuilds standing.
- **Losing is frequent by design.** Perhaps a third of lots should disappoint, or the peek
  carries no information and the game is arithmetic.

**This is the opposite of a zero-tension game.** The jeopardy is the product, and it is shared,
which is rarer. Nobody downstream should soften the reveal to protect a losing player.
