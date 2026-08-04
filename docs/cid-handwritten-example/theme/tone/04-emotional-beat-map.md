# 04 — Emotional beat map

**Domain:** Tone · **Category:** Theme & Narrative · **Wave:** 1

**This is the load-bearing sheet in the domain.** With tension at zero, the beat map is the
only thing telling Audio, VFX and Feedback UI where this game is permitted to peak. Without it,
three domains each add moments independently and the flat baseline the design depends on
disappears by accumulation.

## Decision

**A flat baseline with exactly three peak events, strictly ordered by size.**

| peak | frequency | relative size | what it marks |
|---|---|---|---|
| **relic reveal** | several per session; the session objective is one find | **1×** | the differentiator firing |
| **area completion** | roughly once or twice a session | **3×** | a lap closing; the thing "completely" was for |
| **set completion** | four times in the whole game | **9×** | the only long-term objective |

Nothing else peaks. No fourth event gets a stinger, a particle burst, or a full-screen popup.

The baseline between peaks is **flat, not building.** Clearing has continuous tactile feedback
(a rustle, a snap, currency ticking) but that feedback does not escalate as an area nears
completion.

## Why

- **The brief names the two peaks and their instruments.** *"A relic reveal owns the best sound
  in the game"* and *"an area's completion gets a short resolving chord — the only
  'achievement' sound"* `[brief: soft]` `OPEN.md §2`. This sheet takes that and adds the third
  tier plus the magnitudes, because "best sound" and "only achievement sound" are in tension as
  written: both cannot be the top.
- **Set completion has to be the largest, and the brief implies it without saying it.**
  `[cid: decided]` Completing all four sets is the sole long-term objective `[brief: soft]`
  R5 Q3, a completed set grants a permanent bonus `[brief: soft]` R4 Q4, and with endless areas
  *"the collection is the only finishable thing"* `[brief: soft]` `03-META.md`. A game whose
  only finishable thing peaks lower than a routine area clear is mis-weighted.
- **The 1 / 3 / 9 ordering is a ratio, not a measurement.** `[cid: decided]` What matters and
  is checkable is the strict ordering and the absence of a fourth peak. The exact multipliers
  belong to Balance & Tuning; they are stated here only to make "strictly ordered" concrete
  enough to argue with.
- **A flat baseline is the whole reason a peak lands.** With no failure, no timer and no decay
  `[brief: binding]`, contrast is the only emotional tool the game has. Continuous escalation
  would spend it. This is also why the baseline must not build toward completion: an area
  filling up is exactly where a designer reaches for a rising cue, and that cue would
  manufacture the tension `03-tonal-prohibitions.md` P4 forbids.
- **Reveal frequency is a known tuning risk, and the beat map depends on it.** The brief flags
  discovery rates as *"the highest-risk tuning in the game"* because the session objective is
  one find `[brief: soft]` `03-META.md`. If rates come in too low, the 1× peak stops firing and
  the session has no beats at all. Named here so Balance & Tuning inherits it as a tone
  requirement, not only an economy one.

## Consequences for other work

- **Audio — Stingers** gets exactly three cues and may not add a fourth. The relic reveal cue
  is the most-heard, so it must survive heavy repetition; the set-completion cue is heard four
  times ever, so it can afford to be expensive.
- **Audio — Music** may not layer toward area completion. See P4.
- **Art & Visuals — VFX** gets three burst tiers matching the three peaks and no others.
  "Reward and level-up bursts" in its ownership must map onto this table.
- **UI/UX — Feedback UI** may show a full-screen or blocking celebration **only** at set
  completion. Relic reveal and area completion are non-blocking, because a blocking popup
  several times a session in a 10–20 minute mobile session `[brief: binding]` is friction.
- **UI/UX — HUD** area progress is a plain readout with no state change as it approaches full.
- **Gameplay — Balance & Tuning** inherits a floor: discovery rates must be high enough that a
  typical session fires at least one 1× peak.
- **Gameplay — Onboarding** the brief promises clear-to-reveal in the first ten seconds
  `[brief: soft]` R6 Q3, which means the 1× peak is the first thing a player ever experiences.
  It is the peak that has to work on a cold player with no context.

## Acceptance criteria

1. Exactly three peak events exist in the shipped game: relic reveal, area completion, set
   completion. No other event triggers a stinger, a particle burst, or a popup.
2. Peak magnitude is strictly ordered set completion > area completion > relic reveal, on every
   channel that expresses it (audio loudness, effect scale, UI prominence).
3. No audio or visual cue changes state as an area approaches completion.
4. Only set completion may present a blocking or full-screen celebration.

## Not decided here

The actual sounds (Audio — Stingers), the actual effects (Art & Visuals — VFX), the popup
layout (UI/UX — Feedback UI), and the numeric multipliers behind 1 / 3 / 9 (Gameplay —
Balance & Tuning). Discovery rates themselves (Balance & Tuning), though this sheet sets a
floor on them.
