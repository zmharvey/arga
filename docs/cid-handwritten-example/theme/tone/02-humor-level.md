# 02 — Humor level

**Domain:** Tone · **Category:** Theme & Narrative · **Wave:** 1

> **⚠ This sheet decides something the brief did not state.** Tagged `[cid: decided]` and
> flagged to the developer. If the answer is wrong, this is the cheapest possible moment to
> correct it: naming, music, effects and store copy all inherit from here.

## Decision

**Dry and sparse. Humor lives in exactly one place: relic flavour text.** Nowhere else in the
game is funny.

- At most **1 in 8** relic flavour lines carries a light observation. The other seven are plain
  description.
- **No system copy is funny.** Buttons, labels, tutorial text, error and warning messages,
  progress readouts and store copy are all straight.
- **No relic name is a pun.** Humor may sit in the description of a thing, never in what the
  thing is called.

## Why

- **The brief is silent, so this is a genuine gap.** `[cid: decided]` Nothing in 1,001 lines
  states a humor level. The register adjectives ("warm, aged, unhurried") `[brief: soft]`
  constrain it but do not decide it: warm is compatible with both gentle comedy and complete
  straightness.
- **The audience pulls one way and the register pulls the other.** 8–14, casual, mobile
  `[brief: binding]` R1 Q4 is the band where the genre is loudest and jokiest. But loud comedy
  fights both "unhurried" and the requirement that **relics read as treasure**
  `[brief: soft]` R5 Q2. A relic that is a joke is not treasure, and the collection is the
  entire differentiator `[brief: binding]` R1 Q1. Sparse humor is the resolution: the game is
  straight, the objects occasionally are not.
- **Flavour text is the only place humor is free.** It is optional to read, it does not repeat,
  and it is the one surface where a miss costs nothing. A joke in an error message is read by
  every player every time it fires.
- **Zero humor would be a mistake at this age band.** `[cid: decided]` The brief's audience is
  motivated by collection and completion, and completely straight-faced ornament risks reading
  as dry rather than warm. One in eight is enough to signal the game has a personality without
  undercutting the treasure.

`[unverified — dry run]` The 1-in-8 ratio is judgment, not sourced. What the reference and
adjacent restoration games actually do with flavour text is exactly the kind of thing the
`must_verify` fetch would settle, and it would probably move the ratio.

## Consequences for other work

- **Vocabulary** may not name a relic, currency, area, set or upgrade with a pun or a joke.
  This is a hard constraint on the canonical term list.
- **Feedback UI** copy is straight in every state, including empty and error states, which are
  the two places a writer most wants to be charming.
- **Store copy and the tagline** are straight. The brief's hook, *"Clear the overgrowth, find
  what's buried"* `[brief: soft]` R6 Q1, already sets that register and should not be
  jokified for the store.
- **Whoever writes the 24 relics** gets a ratio to hit, which is a real constraint on the
  relic set rather than a mood note. Three of 24 lines may be light; 21 are plain.
- **Audio** takes no comic cues. No boing, no slide whistle, no cartoon sting anywhere,
  including on the rarest reveal.

## Acceptance criteria

1. Of the relic flavour lines shipped, at most 1 in 8 is comic (for 24 relics: no more than 3).
2. No relic name contains a pun or wordplay.
3. Zero system copy strings are comic. Checkable as a category: buttons, labels, tutorial,
   errors, warnings, progress readouts, store copy.
4. No audio cue anywhere is a comic sound effect.

## Not decided here

What the register is (`01-register-baseline.md`). What is forbidden outright
(`03-tonal-prohibitions.md`). The relics themselves, or any actual flavour line — that is the
relic set's work (Art & Visuals — Objects, with Meta & Content on set themes). The exact
wording of any string (Vocabulary, and UI/UX — Screens for on-screen copy).

## Flagged to the developer

**Is dry-and-sparse right?** The two live alternatives were:

- **Straight throughout, zero humor.** Cleaner, better protects the treasure read, risks
  reading dry to an 8–14 audience.
- **Genre-standard light comedy throughout.** Matches audience expectation and the reference
  family, actively fights `fantasy-ornate` and the treasure requirement.

Recommendation is the middle option above. This is the developer's call, not CID's.
