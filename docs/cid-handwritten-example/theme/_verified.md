# Theme & Narrative — verification (partial)

**Status: PARTIAL — cannot release the category.** 1 of 6 domains has run (Tone). Four of the
five category checks require domains that do not exist yet.

Run against `checks` on `theme-narrative-verification` in `docs/cid-workflow.json`.
Prompted to refute.

## Check results

| # | check | result |
|---|---|---|
| 1 | every term introduced appears once in the Vocabulary canonical list | **blocked** — Vocabulary has not run |
| 2 | no tone rule contradicts the fantasy; no lore entry breaks Setting | **blocked** — Fantasy, Setting, Lore have not run |
| 3 | every named character has a faction or explicit "unaffiliated" | **n/a** — brief specifies no cast, recorded in `_category.md` |
| 4 | nothing here specifies a mechanic, a number, or an art asset | **FAIL** — see below |
| 5 | tone sheets give a register and a humor level, not an adjective | **pass** |

## Check 4 — FAIL

Three sheets specify numbers:

- `04-emotional-beat-map.md` — peak magnitudes `1× / 3× / 9×`
- `02-humor-level.md` — comic flavour lines at `1 in 8`, and `no more than 3` of 24 relics
- `04-emotional-beat-map.md` — a floor on discovery rates

**But the check is wrong, not the sheets.** Two of these are not the kind of number the
invariant was written to catch:

- `1 / 3 / 9` is a **relative ordering**, not a value. Removing it leaves "strictly ordered",
  which is unarguable and therefore unusable. The tone domain has to be able to say one moment
  is bigger than another.
- `1 in 8` is a **content ratio**. Balance & Tuning owns economy and pacing; it has no business
  owning how funny the flavour text is.

The discovery-rate floor is a genuine boundary case, and it resolves correctly: the sheet states
a *requirement* on the rate and explicitly does not set it, which is what a non-owner should do.

**Resolution:** the invariant was too blunt and has been narrowed in the graph to *economy,
pacing and progression* numbers. Content ratios and relative orderings stay with the domain
that owns the subject. Applied to `theme-narrative-verification` check 4,
`gameplay-verification` check 5, and the cross-category equivalent.

This is the class of defect the pipeline exists to catch, found on the first slice, so the
mechanism worked. It is also a reminder that an invariant written before any output exists is
itself a guess.

## Predicted cross-category conflicts

Not failures now. Recorded so cross-category verification has something to diff against rather
than rediscovering them at the end.

1. **`01-register-baseline.md` criterion 1 forbids exclamation marks in all copy.** Discovery &
   Marketing writes store copy, where Roblox convention leans hard on them. Real conflict,
   likely to surface at Store Page Lead. Tone should win inside the game; the store listing may
   deserve a stated exception.
2. **`02-humor-level.md` criterion 1 hard-codes 24 relics** (`no more than 3` comic lines). The
   roster size is `[brief: soft]` R4 Q4, so if Meta & Content changes it the criterion silently
   goes stale. Should be expressed as the ratio with the count derived.
3. **`04-emotional-beat-map.md` gives Stingers exactly three cues.** Stingers Lead's ownership
   in the graph lists five candidate cue types (reward, unlock, level-up, rebirth, rare-drop,
   announcement, failure). Most are already excluded by scope (rebirth is priority 3) but
   "rare-drop" will read as a legitimate fourth peak to that lead. Flagged now.

## What must happen before this category can release

Run Fantasy, Setting, Lore, Identity and Vocabulary. Checks 1 and 2 cannot be evaluated on a
single domain, which is a property of category-level verification rather than a defect: it
means **a partial category is never releasable**, and the wave gate is real.
