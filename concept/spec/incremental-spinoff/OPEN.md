# Open items, assumptions, and coverage

## 1. Coverage audit

`Qs` counts **direct interview questions only.** Step-6 confirmations of my own
assumptions count as 0, because confirming my guess is not interviewing you.

| layer | item | state | Qs | where |
|---|---|---|---|---|
| F | theme / fantasy | you accepted (R1 Q2, R2 Q3) | 2 | `01-FOUNDATION.md` |
| F | **core loop** | you said + researched; escalation & lap length accepted at S6 | **0** | `01-FOUNDATION.md` |
| F | purpose | you accepted (R1 Q3) | 1 | `00-CORE.md` |
| F | **audience** | I assumed, accepted at S6 | **0** | `00-CORE.md` |
| G | players | you accepted (R3 Q3); server size assumed | 1 | `02-GAMEPLAY.md` |
| G | genre | you said | 0 | `00-CORE.md` |
| G | mechanics | you said + researched + you accepted (R2 Q1, R2 Q2) | 2 | `02-GAMEPLAY.md` |
| G | controls & game feel | researched; inferred from R2 Q3; feel target assumed | 0 | `02-GAMEPLAY.md` |
| G | onboarding / first session | I assumed | 0 | `02-GAMEPLAY.md` |
| G | failure & friction | I assumed — no failure state, stated explicitly | 0 | `02-GAMEPLAY.md` |
| G | economy | you accepted (R3 Q1) | 1 | `02-GAMEPLAY.md` |
| G | content roster | you accepted (R3 Q2) — structure only, entries deferred | 1 | `02-GAMEPLAY.md` |
| M | objectives | you accepted (R4 Q1); no mastery layer assumed | 1 | `03-META.md` |
| M | world | count & gating from R2 Q4 / R1 Q2; identity deferred | 0 | `03-META.md` |
| M | replayability | you accepted (R4 Q2) | 1 | `03-META.md` |
| M | monetization stance | you accepted (R1 Q4); no-content-gating inferred | 1 | `03-META.md` |
| M | scope & priority | you accepted (R2 Q4) | 1 | `03-META.md` |
| P | art direction | you accepted (R3 Q4) | 1 | `04-PRESENTATION.md` |
| P | accessibility | I assumed — **surfaced a real defect, see sheet** | 0 | `04-PRESENTATION.md` |
| P | integrity | I assumed | 0 | `04-PRESENTATION.md` |
| P | audio intent | I assumed — §2 | 0 | `OPEN.md §2` |
| P | technical shape | I assumed — §2 | 0 | `OPEN.md §2` |
| P | measurement | I assumed — §2 | 0 | `OPEN.md §2` |
| O | discovery hook | you accepted (R4 Q3) | 1 | `05-OUTWARD.md` |
| O | live-ops intent | I assumed — §2 | 0 | `OPEN.md §2` |
| O | references | you said + researched | 0 | `research/grass-incremental.md` |

*Layers: F foundation · G gameplay · M meta · P presentation · O outward. Ordered by design dependency — each layer needs the ones above it.*

### This audit fails its own gate

**Two foundation rows show 0 questions: `core loop` and `audience`.** The rule is that no
layer-1 item may reach this table at zero, because every other decision in the game rests
on them. Both were written by the interviewer and then confirmed at step 6, which the state
column made look like coverage.

- **`core loop` — 0.** Inherited wholesale from the reference and written up without ever
  being interviewed. It is the most load-bearing item in the document.
- **`audience` — 0.** Never asked; inferred from the reference's audience and confirmed
  as-written.

**Also: 19 of 19 answers were the recommended option.** No answer in this document
contested a default, which is why every tag reads `you accepted` and none reads
`you chose`. Treat the whole spec as provisionally binding rather than decided.

**Four items were added to the inventory after this run** — onboarding, failure & friction,
accessibility and integrity — and were filled in retroactively rather than interviewed, so
they also sit at 0. One of them earned its place immediately: the accessibility item
surfaced that snow rarity tiers are distinguished by colour alone, which excludes roughly 1
in 12 boys in the stated audience from reading the game's primary economic signal.

Retained deliberately as the honest record of the first run. A re-run should interview the
core loop and the audience directly, and present foundation options without a
recommendation.

## 2. Answer at your leisure — defaults stand if you don't

Edit any value in place. Untouched, these stay as `[I assumed]`. If you edit them, re-run
`/game-concept` and they become `[you accepted]`.

**Audio intent**
> Warm and tactile, carrying feedback rather than atmosphere. Every clear makes a soft
> satisfying crunch; rarity tiers get a distinct pitched chime; a buried object reveal gets
> the one genuinely triumphant sound in the game. Music low, sparse, unobtrusive — this is
> played with other audio on.
> *Rationale: audio is the cheapest way to sell a proximity-clear that has no animation
> weight, and reveals are the emotional peak so they should own the best sound.*

**Technical shape**
> Persist: collection state, rebirth count, permanent multipliers, zone unlocks, currency,
> offline timestamp. Secure server-side: currency awards and rebirth grants — clearing must
> be server-validated or the whole economy is client-editable. Watch: hundreds of small
> snow instances per player on mobile, so pooling and streaming matter. Offline earnings
> computed from a stored timestamp, capped to prevent long-idle abuse.
> *Rationale: the two-currency economy is the only thing worth cheating, and instance count
> is the one performance risk the discrete-clumps decision introduces.*

**Measurement**
> Because success is pipeline-shaped, instrument three things only: (1) did a first-session
> player find a buried object, and how long it took — this validates the session objective;
> (2) time to first rebirth, since that number is unverified and assumed; (3) set completion
> rate per set, to see whether tiered discovery rates are tuned.
> *Rationale: two of the three directly test assumptions the spec is resting on, which is
> what analytics is for on a proof build.*

**Live-ops intent**
> Ships and settles. No seasons, no events, no rotating content.
> *Rationale: your priority 3 already excludes seasons and events, so this default is
> constrained by a decision you made rather than invented.*

## 3. Needs you

Nothing blocking. Two things worth knowing:

- **Time to first rebirth is unverified.** Research could not establish the reference's
  pacing — one guide source returned HTTP 405 and I did not substitute a guess. The 45–90s
  figure in `01-FOUNDATION.md` is an assumption Core Loop will have to test rather than
  inherit.
- **The working name is a placeholder.** `incremental-spinoff` is the slug; the real name
  is Marketing's to invent. Rename the directory if you want it to read better.

## 4. Deliberately left open — decisions, not gaps

Named by **kind of work**, so this routes correctly whatever the downstream agent lineup
is. Current owner in brackets is a convenience, not the structure.

| kind of work left open | current owner |
|---|---|
| The setting's identity, who the kid is, snow-tier names, zone names | Theme & Narrative |
| Whether there is any narrative framing at all | Theme & Narrative |
| All curves: cost scaling per axis, rebirth threshold formula, zone multiplier values | Core Loop |
| How duplicate buried objects are handled — **constraint: without a third currency** | Systems |
| Clear-on-contact feedback, and whether any input beyond movement exists | Mechanics |
| Whether visible presence is enough, or what the cheapest warmth-adding touch would be | Social |
| The four set themes, each set's completion bonus, discovery rates per tier | Meta & Content |
| What the two zones actually are | Meta & Content + Theme & Narrative |
| The SKU ladder, price points, which axis the whale item sits on | Monetization |
| The full screen set — plus solving the persistent HUD that `ui-forge` cannot yet build | UI/UX |
| The 24 buried objects, tool ladder escalation, how snow tiers read on a phone | Art & Visuals |
| Name, icon, thumbnail composition, store description | Discovery & Marketing |

## 5. Every assumption, in one place

**Four assumptions were confirmed in step 6 and are no longer assumptions:** audience,
lap length, escalation shape, and the differentiation non-goal. Those were the ones
sitting on layer-1 items, which everything else in the design is built on.

What remains assumed:

| # | assumption | item | why | who inherits it |
|---|---|---|---|---|
| 1 | The loop's closure statement — later zones supply better raw material to step 1 | core loop | structurally implied but no source states it | Core Loop |
| 2 | Server size 12–20 | players | no source for the reference's figure | Social, Tech & Data |
| 3 | Radius upgrades must be physically felt, not just read | game feel | follows from radius being the whale SKU's axis | Mechanics, Art |
| 4 | No mastery objective exists or should be invented | objectives | no execution skill in proximity-clearing to master | Meta & Content |
| 5 | "Match the reference" excludes gating content behind payment | monetization | research found no paid-only zone or tier, and the explicit no-gating option was separate and unpicked — **the weakest inference in this document** | Monetization |
| 6–9 | Audio intent, technical shape, measurement, live-ops intent | §2 above | batched by design; defaults stand until edited | Audio, Tech & Data, Analytics, Live Ops |

None of these reach more than two departments. #5 is the one most worth a second look —
it is an inference from an absence of evidence rather than from evidence.
