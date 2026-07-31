# Open items, assumptions, and coverage

> **⚠ SYNTHETIC TEST FIXTURE.** No developer was interviewed. Every `[simulated]` tag is really
> an `[I assumed]`, and the `Qs` column counts decision points *posed and resolved by the
> interviewer*, not questions a person answered.

## 1. Coverage audit

| layer | item | state | Qs | where |
|---|---|---|---|---|
| F | theme / fantasy | simulated (R2 Q2) | 1 | `01-FOUNDATION.md` |
| F | **tone** | simulated (R2 Q1) | 1 | `01-FOUNDATION.md` |
| F | **core loop** | simulated (R1 Q2) | 1 | `01-FOUNDATION.md` |
| F | purpose | simulated (R1 Q3) | 1 | `00-CORE.md` |
| F | audience | simulated (R1 Q4) — band forced by chat | 1 | `00-CORE.md` |
| G | players | simulated (R3 Q1) — incl. chat and moderation | 1 | `02-GAMEPLAY.md` |
| G | genre | simulated (R1 Q1) — **no vocab match; see below** | 1 | `00-CORE.md` |
| G | mechanics | simulated (R1 Q1, R2 Q2) + researched | 2 | `02-GAMEPLAY.md` |
| G | controls & game feel | simulated (R3 Q2) | 1 | `02-GAMEPLAY.md` |
| G | economy | simulated (R3 Q3) | 1 | `02-GAMEPLAY.md` |
| G | content roster | simulated (R3 Q4, R3 Q5) — bands, cast, avatar | 2 | `02-GAMEPLAY.md` |
| G | onboarding / first session | simulated (R3 Q6) | 1 | `02-GAMEPLAY.md` |
| G | failure & friction | simulated (R3 Q7) — jeopardy **intended** | 1 | `02-GAMEPLAY.md` |
| M | objectives | simulated (R4 Q1) | 1 | `03-META.md` |
| M | world | simulated (R4 Q2) — time of day yes, weather **no** | 1 | `03-META.md` |
| M | replayability | simulated (R4 Q3) | 1 | `03-META.md` |
| M | monetization stance | simulated (R4 Q4) | 1 | `03-META.md` |
| M | scope & priority | simulated (R4 Q5) | 1 | `03-META.md` |
| M | **extension cost** | simulated (R4 Q6) — **low; inverts the usual case** | 1 | `03-META.md` |
| P | art direction | simulated (R5 Q1) — token file checked | 1 | `04-PRESENTATION.md` |
| P | audio intent | I assumed — §2 | 0 | `OPEN.md §2` |
| P | visual feedback intent | simulated (R5 Q2) | 1 | `04-PRESENTATION.md` |
| P | technical shape | simulated (R5 Q5) — device floor named | 1 | `04-PRESENTATION.md`, §2 |
| P | measurement | I assumed — §2 | 0 | `OPEN.md §2` |
| P | accessibility | simulated (R5 Q3) — one accepted exclusion | 1 | `04-PRESENTATION.md` |
| P | integrity | simulated (R5 Q4) | 1 | `04-PRESENTATION.md` |
| O | discovery hook | simulated (R5 Q6) | 1 | `05-OUTWARD.md` |
| O | live-ops intent | I assumed — §2 | 0 | `OPEN.md §2`, `05-OUTWARD.md` |
| O | references | researched ×6 | 0 | `research/landscape.md` |

*Layers: F foundation · G gameplay · M meta · P presentation · O outward.*

### What this audit proves and does not

All 29 items have a row and **no foundation item sits at 0.** Four sit at 0 and are disclosed:
audio intent, measurement, live-ops intent (batched by design) and references (researched).

**It does not prove the brief is good.** Every non-research row is `simulated`, so the
`you chose` / `I assumed` split is 0 to 25. On a real run that split is the audit's whole value.

**A vocabulary gap, recorded not forced:** the closed `GENRES` list has no entry for a
negotiation or auction game. `delivery-logistics` matches the contract shape and `roleplay`
matches the emergent-social shape; neither is right. Forcing one would mislead every downstream
reader about what this game is, so the genre is stated in prose instead. **This is the second
vocabulary gap found by running the skill** and suggests the list needs a periodic occupancy
review of its own.

## 2. Answer at your leisure — defaults stand if you don't

**Audio intent**
> The room is the bed: crowd murmur, strip-light hum, a distant roller door. **The closing clock
> owns the best sound in the game** — a rising tick that tightens, because it is the only real
> time pressure and it has to work on a muted phone too (see accessibility). The reveal is a
> roller door and then near-silence, so three or four players' own reactions fill it. Payout is a
> short dry cash figure. No music during an auction; music only between lots.
> *Rationale: this is a game about reading a room, so the room has to be audible. Anything that
> masks the crowd or the clock works against the core skill.*

**Technical shape**
> Persist: cash, reputation, item inventory, venue access, valuation-accuracy history, cosmetics.
> Secure server-side: **bid amounts, split contracts, share payout, and reputation** — the
> contract especially, since it is immutable once agreed and is the differentiator. Alt-account
> collusion is the standing threat and needs detection rather than prevention. Watch: **latency
> fairness on a live shared clock**, not framerate — losing an auction to lag is a fairness bug.
> Nothing here streams; venues are small interiors.
> *Rationale: the unusual risk in this design is real-time consistency between several clients,
> which is a different problem from every other brief in this repo.*

**Measurement**
> Three: (1) did a first-session player get paid from a syndicate within 90 seconds — validates
> the onboarding promise, which depends on another human and so can fail for reasons the
> tutorial cannot fix; (2) **share of auctions with two or more competing syndicates** — the
> direct health metric for the whole design, and the thing low population destroys; (3) valuation
> accuracy over time per player — tells you whether the peek is learnable, which is the highest-risk
> tuning.
> *Rationale: all three test assumptions this brief rests on. (2) is the one that would tell you
> the game is dying while cash and session length still looked fine.*

**Live-ops intent**
> Modest cadence, aimed at **concurrency rather than content.** Timed venue events that
> concentrate players into shared hours are worth more than new venues, because content is cheap
> and population is the constraint. A Roblox group and a Discord, because negotiation communities
> form off-platform whether you provide the channel or not — better to own it. No seasons, no
> codes: both are priority 3.
> *Rationale: this is the one design in this repo where shipping content is the wrong lever.*

## 3. Needs you

- **A developer.** No binding decisions exist in this brief.
- **The working name is a placeholder.** `syndicate-auction-test` is a slug.

## 4. Deliberately left open — decisions, not gaps

| kind of work left open | note |
|---|---|
| Naming and fiction — venues, bands, the auctioneer, all terms | `storage`, `hunters`, `bid battles` unusable; see `05-OUTWARD.md` |
| All numeric curves — bid increments, closing-clock shape, band value ranges, reputation weights | no occupant's figures could be sourced |
| **The peek's information content** | **highest-risk tuning.** Too clear and negotiation is arithmetic; too vague and nobody improves |
| The roster and asset list — 40 items, 5 bands, venue looks | structure set, entries not |
| Reputation formula — what raises and lowers it | **constraint: must key on controllable behaviour, never on outcome** |
| Alt-account collusion detection | no clean solution exists; must be designed for |
| Venue and schedule authoring | cheap per unit; see extension cost |
| Onboarding beats — the second lot that teaches negotiation | first lot specified |
| The offer ladder | no obvious high-price SKU; see `03-META.md` |
| Social feel — server size, how an invite reads on a phone | 8–16 is assumed |

## 5. Every assumption, in one place

**All 25 non-research rows in §1 are assumptions.** Beyond those, these were made without even
posing a decision point:

| # | assumption | item | why | who inherits it |
|---|---|---|---|---|
| 1 | Device split ~50/45/5 | audience | no source; desktop-weighted because typing matters | interface, performance |
| 2 | Server size 8–16 | players | reasoned from syndicate size, not sourced | social, technical |
| 3 | Syndicate size 2–4 | mechanics | nothing justifies 4 over 5 | systems, interface |
| 4 | 40 items in 5 bands | content roster | shape only | roster, curves |
| 5 | ~1 lot in 3 should disappoint | failure | needed for the peek to matter; no source | curves |
| 6 | Audio, measurement, live-ops | §2 | batched by design | audio, analytics, live ops |
| 7 | Time of day yes, weather no | world | reasoned from art budget, not asked | art, audio, world |

## 6. Completeness sweep

Walked the five layers. Four things surfaced, all now written into the sheets:

- **The design degrades badly at low population.** A syndicate needs other humans, so a quiet
  server is broken rather than quieter. Neither incumbent has this fragility because both are
  solo. → `03-META.md`, `05-OUTWARD.md`
- **Reputation is a griefing surface** unless it keys on controllable behaviour rather than
  outcome. Nothing in the inventory prompted this; it came from the sweep. → `02-GAMEPLAY.md`
- **Alt-account collusion is design-specific and has no clean fix.** Two accounts in one
  syndicate can farm standing for each other. It is the main reason trading is excluded.
  → `04-PRESENTATION.md`
- **The onboarding promise depends on another human acting.** Every other brief in this repo
  could guarantee its first minute; this one cannot, which is why it is 90 seconds and not 60.
  → `02-GAMEPLAY.md`

**No subject was found that the inventory has no item for.** `extension cost`, added after the
previous run's sweep, earned its place immediately: this design's answer is *low*, the inverse of
the previous brief's, and without the item nothing would have asked.
