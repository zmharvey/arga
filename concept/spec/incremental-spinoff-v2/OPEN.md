# Open items, assumptions, and coverage

## 1. Coverage audit

`Qs` counts **direct interview questions only.** Step-6 confirmations of my own assumptions
count as 0.

| layer | item | state | Qs | where |
|---|---|---|---|---|
| F | theme / fantasy | you chose (R1 Q1) + you accepted (R2 Q3) | 2 | `01-FOUNDATION.md` |
| F | **core loop** | **you chose ×4** (R1 Q2, R2 Q1, R2 Q2, R3 Q1) | **4** | `01-FOUNDATION.md` |
| F | purpose | you chose (R1 Q3) | 1 | `00-CORE.md` |
| F | **audience** | **you chose** (R1 Q4) | **1** | `00-CORE.md` |
| G | players | you accepted (R6 Q2) | 1 | `02-GAMEPLAY.md` |
| G | genre | you chose (R4 Q2) — **changed to restoration** | 1 | `00-CORE.md` |
| G | mechanics | you chose (R5 Q1) + inherited + researched | 1 | `02-GAMEPLAY.md` |
| G | controls & game feel | you accepted (S6 Q3) | 0 | `02-GAMEPLAY.md` |
| G | onboarding / first session | you accepted (R6 Q3) | 1 | `02-GAMEPLAY.md` |
| G | failure & friction | you accepted (S6 Q2) — zero tension **intended** | 0 | `02-GAMEPLAY.md` |
| G | economy | you accepted (R4 Q3) | 1 | `02-GAMEPLAY.md` |
| G | content roster | you accepted (R4 Q4) — structure only | 1 | `02-GAMEPLAY.md` |
| M | objectives | you accepted (R5 Q3) | 1 | `03-META.md` |
| M | world | you chose (R3 Q2) + R5 Q1 | 1 | `03-META.md` |
| M | replayability | you accepted (R3 Q3) | 1 | `03-META.md` |
| M | monetization stance | you accepted (R5 Q4) | 1 | `03-META.md` |
| M | scope & priority | you chose (R4 Q1) + you chose (R5 Q1) | 2 | `03-META.md` |
| P | art direction | you accepted (R5 Q2) | 1 | `04-PRESENTATION.md` |
| P | accessibility | you accepted (R6 Q4) | 1 | `04-PRESENTATION.md` |
| P | integrity | I assumed | 0 | `04-PRESENTATION.md` |
| P | audio intent | I assumed — §2 | 0 | `OPEN.md §2` |
| P | technical shape | I assumed — §2 | 0 | `OPEN.md §2` |
| P | measurement | I assumed — §2 | 0 | `OPEN.md §2` |
| O | discovery hook | you accepted (R6 Q1) | 1 | `05-OUTWARD.md` |
| O | live-ops intent | I assumed — §2 | 0 | `05-OUTWARD.md`, `OPEN.md §2` |
| O | references | you said + researched ×2 | 0 | `research/` |

*Layers: F foundation · G gameplay · M meta · P presentation · O outward. Ordered by design
dependency — each layer needs the ones above it.*

### This audit passes its gate

**No layer-1 item is at zero.** Core loop got **4 direct questions** and audience got **1**.
Both were at **0** in the previous run — the core loop was inherited from the reference and
the audience was never asked at all.

**22 questions across 6 rounds. 11 `[you chose]` and 11 `[you accepted]`** — versus 19
questions and **zero** `[you chose]` last run. Half the decisions in this document were
active choices against an alternative, so downstream latitude is genuinely narrower.

**Seven items sit at 0 questions and are disclosed, not hidden:** controls & game feel and
failure & friction (both since **confirmed at step 6**), integrity, and the four batched tail
items. **None is layer 1.** Integrity is the least defensible of them — it was never asked and
never confirmed.

**Every step-6 confirmation was accepted as written**, which is worth noting: my inferences on
the axes, controls, tension and device split were all correct, but that also means the last
round contested nothing.

## 2. Answer at your leisure — defaults stand if you don't

**Audio intent**
> Warm, organic, tactile. Clearing is a soft rustle-and-snap; each rarity tier a distinct
> pitched note; **a relic reveal owns the best sound in the game.** An area's completion gets
> a short resolving chord — the only "achievement" sound. Music sparse and low.
> *Rationale: with no failure, no timer and no tension, audio is carrying almost all of the
> feedback load. Reveals and completions are the two emotional peaks.*

**Technical shape**
> Persist: collection state, per-area cleared state, upgrade levels, currency. **Per-area
> cleared state is the unusual one** — permanence means the world itself is save data, which
> grows without bound unless areas are collapsed to a completion flag once finished. Secure
> server-side: clearing, currency, relic grants. Watch: instance count per area on mobile, and
> save size as areas accumulate.
> *Rationale: permanent clearing turns world state into persistence, which is the one genuinely
> novel technical risk this design introduces and the reference has no equivalent of.*

**Measurement**
> Three things: (1) did a first-session player reveal a relic, and how fast — validates the
> ten-second onboarding promise; (2) average time to complete an area — the pacing number
> nobody could source; (3) set-completion rate per set — whether depth-tiered discovery is
> tuned.
> *Rationale: all three test assumptions this spec rests on rather than reporting vanity.*

**Live-ops intent**
> Ships and settles. No seasons or events. Note that new authored chunks can be added without
> touching systems, so extension is cheap if ever wanted.
> *Rationale: priority 3 already excludes seasons, so this is constrained by your decision.*

## 3. Needs you

- **The working name is a placeholder.** `incremental-spinoff-v2` is a slug, not a name.

## 4. Deliberately left open — decisions, not gaps

Named by **kind of work**, so this routes correctly however the downstream lineup is arranged.

| kind of work left open | current owner |
|---|---|
| The ruin's identity and history, who the player is, all naming | Theme & Narrative |
| All curves: upgrade costs, density scaling by depth, area sizing | Core Loop |
| How duplicate relics are handled — **constraint: without adding a currency** | Systems |
| Clear-on-contact feedback; how "completely clear" is celebrated | Mechanics |
| Whether presence alone suffices socially | Social |
| Set themes, set-completion bonuses, discovery rates per depth tier | Meta & Content |
| How many authored chunks before shuffling feels repetitive | Meta & Content |
| The SKU ladder — **and where a premium item sits, given no tool ladder exists** | Monetization |
| Full screen set — plus the persistent HUD `ui-forge` cannot build | UI/UX |
| The 24 relics; overgrown-vs-restored looks; tier legibility on a phone | Art & Visuals |
| Name, icon, thumbnail, store description | Discovery & Marketing |

## 5. Every assumption, in one place

**Four were confirmed at step 6 and are no longer assumptions:** three upgrade axes,
movement-only controls, the platform split, and zero-tension-by-design. Those were the ones
sitting on layers 1–2.

What remains assumed — **none reaches more than two areas of work:**

| # | assumption | item | why | who inherits it |
|---|---|---|---|---|
| 1 | Rarity tiers live in the overgrowth, not a separate table | theme | carried from the reference | Art, Systems |
| 2 | Escalation is tool-power → time-and-patience | core loop | extrapolated from depth-based areas | Core Loop |
| 3 | No gating mechanism needed — depth reached by clearing | world | follows from cutting rebirth | Meta & Content |
| 4 | Server size 12–20 | players | no source | Social, Tech & Data |
| 5 | No mastery objective exists or should be invented | objectives | no execution skill to master | Meta & Content |
| 6 | Integrity surface as described | integrity | not interviewed | Tech & Data |
| 7 | Priority ordering in `03-META.md` | scope | resolved via R4/R5 but no explicit list interviewed | everyone |
| 8–11 | Audio, technical shape, measurement, live-ops | §2 | batched by design | Audio, Tech, Analytics, Live Ops |

## 6. Completeness sweep

Walked the five layers asking what a creative agent would come up short on. Three things it
surfaced, all now written into the sheets rather than left implicit:

- **Zero tension by construction.** No failure, no reset, no timer, no decay. Possibly correct
  for a relaxing restoration game; entirely unverified. → `02-GAMEPLAY.md`
- **World state is now save data.** Permanent clearing means per-area cleared state persists
  and grows unbounded unless finished areas collapse to a flag. The reference has no
  equivalent risk. → `OPEN.md §2`
- **The premium SKU has no home.** Monetization is multipliers-only, but the reference's
  high-price item was an oversized *tool* and no tool ladder was specified here. → `03-META.md`

No subject was found that the inventory has no item for.
