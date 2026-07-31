# Syndicate auction — concept

> **⚠ SYNTHETIC TEST FIXTURE.** No developer was interviewed. Every `[simulated]` tag is
> really an `[I assumed]`. **Do not feed this to a build.** Slug `syndicate-auction-test`.

*Everyone downstream reads this.*

A Roblox game where you **pool money with strangers** to bid on unopened storage lots none of
you could afford alone, agree how to split the contents **before** anyone sees them, and then
find out together whether you all won or all lost.

**Fantasy.** A market-floor operator. Not a treasure hunter and not a shop owner. Someone who
reads people as much as they read lots.

**Tone.** Wry and transactional. A busy market at closing time: friendly, a little seedy,
nobody's feelings hurt. Humor is present and dry, because haggling is funny.

**Core loop.** Peek at a lot through the gap → form a syndicate and agree a split → bid
together against other syndicates → win, open, reveal → the game enforces the agreed split →
sell your share → your partner reputation updates → better syndicates will take you.

**A lap is one lot,** peek to split. Roughly one every few minutes.

**The split is agreed before the reveal, and the game enforces it.** You negotiate under the
same ignorance as everyone else, and you cannot renege. That is the whole design.

**The premise it started as is occupied at ~245M visits.** Bid Battles (193.7M, four years)
and Storage Hunters: Open World (50.9M in **one month**, peak CCU 47,940) both ship bidding on
unopened units and reselling the contents. The partial peek, the live PvP bid and the load
limit are all genre-standard. See `research/landscape.md`.

**What nothing does:** every occupant is solo — one player bids, one player profits — and the
leading one has no permanent downside. Distinction lives in **shared risk** and **real loss**.

**Genre.** A **negotiation game** wearing an auction game's clothes. Said plainly because the
mechanics look like the incumbents and the skill being tested is completely different.

**Failure is real.** A syndicate can pay more than the lot is worth. Cash can reach zero.
Reputation damage persists and is the thing that actually costs you.

**Players.** Shared server 8–16, and **the other players are the mechanic**, not scenery. No
PvP combat; the competition is economic.

**Chat is load-bearing, and that sets the age band.** Negotiation needs real conversation, so
this is 13+ and uses Roblox's own chat rather than a custom surface.

**Audience.** 13+, socially motivated, ~50% mobile, 20–35 minute sessions.

**Economy.** One currency plus a non-tradeable reputation score. Bids drain, sales pay.

**Roster.** ~40 item types across 5 value bands, structure only. Items are the content.

**Monetization.** Cosmetics and shop decoration only. **Never bid power, never reputation** —
either would let money buy the negotiation.

**Look.** `clean-modern`. Concrete, chain-link, sodium light, hard-edged legible interface.

**Onboarding.** Join someone else's syndicate on a cheap lot and get paid, inside 90 seconds.

**Hook line.** *You can't afford it alone.*

**Why it exists.** To exercise the `arga` pipeline end to end on a fresh idea. Success is the
gates firing and wave 1 running, not players.
