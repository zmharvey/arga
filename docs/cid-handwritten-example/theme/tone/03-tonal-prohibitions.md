# 03 — Tonal prohibitions

**Domain:** Tone · **Category:** Theme & Narrative · **Wave:** 1

## Decision

Six prohibitions. Three are the brief's, restated as checkable rules. Three are derived from
constraints the brief settled elsewhere, and are marked as such.

| # | forbidden | source |
|---|---|---|
| P1 | **Spooky.** No haunting, no dread, no implication the place is watching. | `[brief: soft]` — "reclamation, not a haunted place" |
| P2 | **Grim.** No decay-as-tragedy, no death, no ruin-as-loss. | `[brief: soft]` |
| P3 | **Power fantasy.** The player is not a hero, chosen, master, or conqueror. | `[brief: soft]` |
| P4 | **Urgent.** No threat, timer, countdown, expiry, decay, or pressure of any kind. | derived from zero tension `[brief: binding]` step 6 Q2 |
| P5 | **Portentous.** No prophecy, destiny, ancient-evil, or mystery-that-must-be-solved framing. | derived from P1 + the absence of any conflict `[cid: decided]` |
| P6 | **Loud congratulation.** The game does not celebrate at the player; it shows them what happened. | derived from `01-register-baseline.md` |

## Why

**P1–P3 are the brief's own, and they are unusually explicit** for tonal guidance, so they are
worth holding tightly. The brief reached them by elimination: the theme beat
cobwebs-in-a-mansion and rust-on-machines partly on tonal grounds `[brief: soft]`
`01-FOUNDATION.md`, so spooky and grim were considered and rejected rather than never raised.

**P4 is the one most likely to be violated, and it is the most important.** The brief says so
itself: *"nobody downstream should invent tension to fill the gap"* `[brief: binding]`. Zero
tension is a deliberate design position `[brief: binding]` step 6 Q2, and the brief flags it
as an unverified risk. The failure mode is not one agent deciding to add a threat. It is
several agents each adding a small pressure cue that nothing forbids: a music layer that
builds, a progress bar that pulses when nearly full, a "don't stop now" nudge. Individually
defensible, collectively a tense game. P4 exists to make each of those a rule violation
rather than a judgment call.

**P5 fills a real gap.** `[cid: decided]` The brief forbids spooky but says nothing about
portentous, and an ancient overgrown ruin is a strong pull toward prophecy and lost-civilisation
mystery. The brief's own store-copy reasoning rejected *"Uncover a lost civilisation"* and
*"Every ruin hides something"* `[brief: soft]` `05-OUTWARD.md`, the latter because it *"promises
secrets the discovery pacing would then have to keep delivering."* That is a tonal argument,
and P5 generalises it: this place is old and quiet, not significant.

**P6 follows from the register** and is listed here so it is checkable rather than implied.

## Consequences for other work

- **Audio — Music** may not use an intensity layer that builds toward anything. The brief's own
  default already says "music sparse and low" `[brief: soft]` `OPEN.md §2`; P4 makes that a
  rule rather than a preference.
- **Art & Visuals — Lighting** may not use fog, low light, or desaturation to create unease.
  Aged and warm, never dim and cold.
- **UI/UX — Feedback UI** may not use a pulsing, flashing, or countdown state on any element,
  including a near-complete progress bar.
- **UI/UX — HUD** area-completion progress is a readout, not a pressure gauge.
- **Discovery & Marketing** may not sell mystery or secrets. The approved hook is a plain dual
  promise and it stays plain.
- **Lore** may not introduce a conflict, an antagonist, or an unresolved threat. This is the
  prohibition that shapes Lore's whole latitude, which is why `_category.md` states it there
  too.

## Acceptance criteria

1. No spec in any category introduces a threat, enemy, hazard, timer, countdown, expiry, decay
   mechanic, or fail state.
2. No music track has a building or escalating intensity layer.
3. No UI element has a pulsing, flashing, or urgency state.
4. No copy string addresses the player as hero, chosen, master, saviour, or legend.
5. No lore or marketing text frames the ruin as mysterious, cursed, prophesied, or significant.

## Not decided here

The positive register (`01-register-baseline.md`) and the humor level
(`02-humor-level.md`). Where the game *is* allowed to peak (`04-emotional-beat-map.md`) —
these prohibitions constrain the shape of a peak, they do not remove peaks. The specific
lighting, music or copy execution of any of this (Art & Visuals, Audio, UI/UX).
