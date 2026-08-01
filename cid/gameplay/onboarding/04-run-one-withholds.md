# 04 — What run 1 does not show yet

**Domain:** gameplay/onboarding · **Category:** Gameplay · **Wave:** 3

## Decision

**Three of six surfaces ship at the first frame; three are suppressed.** Present: the currency
readout, the collection count (at `0`, with no denominator) and the area progress bar.
Suppressed: the **`/ 24` denominator** and the **collection panel** until the player holds a
Find, and **each upgrade row** until its own level-1 cost is affordable. Every lift is **latched
in persisted state and one-way** — nothing re-suppresses, and no lift waits on a session
boundary.

## Why

**The shipped default shows all six at second zero and that is a default, not a decision.**
`hud.brief.json` renders `RELICS 0 / 24`, `SHARDS 0`, three rows with levels and costs, and
`EAST TERRACE — 0% CLEAR` `[research: ui-forge/briefs/hud.brief.json]`. The brief withholds
nothing anywhere, so nobody has contested it. This sheet confirms three and contests three.

**The three that stay are the three the first minute changes.** The currency readout moves on
`firstClear`; the collection count moves on `firstReveal`, on the same tick; the area bar moves
on every clear. A readout that *appears* at the instant it changes puts a new object on screen
at the same moment as the payoff that changed it, and `firstReveal` is *"the loudest single
moment in the game in every channel"* `[cid: decided — theme/tone/03]`. **A number going 0 → 1
is legible; a number arriving already at 1 is a new thing to parse.** `[cid: decided]`

**The `/ 24` is the sharpest call and it goes.** *"This front-loads the differentiator instead of
hiding it behind a grind"* `[brief: soft]` ← `[you accepted: R6 Q3]`, `02-GAMEPLAY.md` — and the
differentiator is *"objects revealed by harvesting that enter a set-structured permanent index"*
`[brief: binding]` ← `[you chose: R1 Q1]`, `00-CORE.md`. **`0 / 24` at second zero delivers that
as a specification of what the player lacks, seconds before the event delivers it as a thing they
have.** *"Complete all four sets, 24 of 24"* is a long-term objective `[brief: soft]`
`03-META.md`, not a first-frame fact. After `firstReveal` the denominator describes something
held, and it arrives in the same instant the numerator moves — one change, not two.
`[cid: decided]`

**The upgrade rows go for a different reason: they are a price list for a concept with no event
yet.** Three rows at second zero name the whole ladder before one unit of currency exists, and
the session objective is *"find at least one new relic"*, not *buy* `[brief: soft]` `03-META.md`.
Lifting each row **when its own level-1 cost is first affordable** stages the ladder one rung at
a time, cheapest axis first — `value`, the one that compounds
`[cid: decided — gameplay/balance/01]`. `[cid: decided]`

**A live developer case has exactly this shape**, the feedback being *"theres like a gazillion ui
on my screen"* and the advice *"keep it minimal, basic"*
`[research: https://devforum.roblox.com/t/my-day-1-retention-is-awful-23-losing-half-my-players-in-under-2-minutes-what-am-i-doing-wrong-with-onboarding/4186434]`.
**I cite the qualitative observation and not the retention figure attached to it**, because
`00-CORE.md` makes beating the retention curve an explicit non-goal `[brief: binding]`.

**The area bar stays because the brief asked for it by name:** *"area-completion progress must be
visible while moving, since 'how close am I to done' is the core tension"* `[brief: soft]`,
`04-PRESENTATION.md`. It is also what `03` rank 5 teaches area completion from.

**Every lift is latched, so no suppression waits on a session nobody has specified.** Laps span
sessions `[cid: decided — gameplay/core-loop/04]`, there is no offline grant and nothing regrows,
so session 2 opens mid-lap with no event waiting and the brief's return hook stops at *"an
unfinished area and a half-empty index"* `[brief: soft]` `03-META.md`. **A lift condition of
"session 2" would land in a session nobody has designed.** None of mine does; that open item is
return-hook and re-entry work.

**A suppressed surface is absent, not represented.** No lock, no grey, no `?` — a padlock is
`03` `T5`'s first-run-only device drawn instead of written.

| # | surface | at join | lifted by | latch source |
|---|---|---|---|---|
| 1 | collection count (the numerator) | **present**, showing `0` | — | — |
| 2 | the `/ 24` denominator | **suppressed** | beat `firstReveal` | at least one entry in the collection map is TRUE; no new save field |
| 3 | currency readout | **present**, showing `0` | — | — |
| 4 | upgrade row, **each independently** | **suppressed** | that row's balance-reaches-level-1-cost | one persisted boolean per row, three total |
| 5 | area progress bar | **present**, showing 0% | — | — |
| 6 | collection panel | **suppressed** | beat `firstReveal` | at least one entry in the collection map is TRUE; no new save field |

| id | may not stand in for a suppressed surface, or accompany a lift | check |
|---|---|---|
| `S1` | a padlock, chain or lock glyph | zero instances |
| `S2` | a greyed, dimmed or reduced-opacity upgrade row | a suppressed row has no instance at all |
| `S3` | a `?`, `???` or `--` placeholder in a readout or a collection slot | zero |
| `S4` | a `0 / ?` or `0 / --` denominator form | the denominator is absent, not unknown |
| `S5` | a tooltip, hover or press response explaining why something is not there | zero |
| `S6` | a reveal, slide, bounce, flash, scale or fade animation on a lift | a lift is a state change, not a beat |
| `S7` | a sound on a lift | zero; every cue maps to one of the five named beats |
| `S8` | a `NEW`, badge, dot or pip on the collection panel or its entry surface | zero |
| `S9` | a re-suppression of any surface, ever, in any later session | lifts are one-way |
| `S10` | a count that includes Finds the player has not revealed | the count counts what is held |
| `S11` | a percent form of the collection count | the area bar is the only percent in the HUD |
| `S12` | reflow of the remaining rows when one upgrade row lifts | the cluster reserves its full three-row extent from frame one |

**This sheet carries no manifest block by design:** `02` proposes and holds `firstSession` and
folds the amendment below into it, because one key admits exactly one owning sheet.

```json
{
  "amends": "firstSession",
  "withheld": [
    { "surface": "collectionCount", "presentAtJoin": true, "liftedBy": null, "latched": false, "joinValue": "0" },
    { "surface": "collectionDenominator", "presentAtJoin": false, "liftedBy": "beat:firstReveal", "latched": true, "latchSource": "at least one entry in the collection map is TRUE, counted over the names in collection.sets", "newSaveFields": 0 },
    { "surface": "currencyReadout", "presentAtJoin": true, "liftedBy": null, "latched": false, "joinValue": "0" },
    { "surface": "upgradeRow", "perRow": true, "presentAtJoin": false, "liftedBy": "balance has reached upgrades[i] level-1 cost", "latched": true, "latchSource": "one persisted boolean per row", "newSaveFields": 3 },
    { "surface": "areaProgress", "presentAtJoin": true, "liftedBy": null, "latched": false, "joinValue": "0%" },
    { "surface": "collectionPanel", "presentAtJoin": false, "liftedBy": "beat:firstReveal", "latched": true, "latchSource": "at least one entry in the collection map is TRUE, counted over the names in collection.sets", "newSaveFields": 0 }
  ],
  "suppressionForbidden": ["padlockOrLockGlyph", "greyedOrDimmedRow", "questionMarkPlaceholder", "unknownDenominatorForm", "explanatoryTooltip", "liftAnimation", "liftSound", "newBadgeOrDot", "reSuppression", "unrevealedFindsInCount", "percentFormOfCollectionCount", "reflowOnLift"]
}
```

## Consequences for other work

- **HUD pattern work (`ui-forge`, `hud-overlay`):** the pattern must vary **presence** of an
  individual readout by state, and cannot today. This is a **second** required change alongside
  the `PRESSABLE` readout — a default to change, not a capability to add. If presence cannot be
  conditional, this list is a requirement on the pattern rather than a shipped behaviour, and
  that is a blocker to raise rather than a spec to reinterpret.
- **Persistence work:** three new booleans, one per upgrade row. **Zero new fields for the other
  two latches** — both read `next(collection) ~= nil`. The upgrade latches need storage because
  balance falls when the player spends, so `balance >= cost` re-evaluated is not one-way.
- **Purchase-surface and HUD layout work (UI/UX):** `S12` — reserve the full three-row extent
  from frame one so a lift never moves a row already being read. Whether a row is also the
  control that spends is `input`'s and unsettled; **my ruling binds presence whichever way that
  lands.**
- **Collection-surface work (UI/UX — Screens):** the panel and whatever surface offers a way into
  it are absent together and lift together. Which surface offers it is not mine; that it does not
  exist before the first Find is.
- **Feedback-UI and Audio work:** `S6` and `S7` — a lift is silent and still. The five beats own
  every cue in the game and a lift is none of them.
- **Return-hook and re-entry work (Core Loop, with Meta & Content):** you own the second-session
  open, and nothing here depends on it, deliberately.

## Acceptance criteria

1. At the first frame of a run-1 session the HUD renders exactly three of the six surfaces —
   `currencyReadout`, `collectionCount`, `areaProgress` — and `collectionDenominator`, all three
   `upgradeRow`s and `collectionPanel` have **no instance in the PlayerGui at all**.
2. `collectionCount` renders the single character `0` before the first Find — no `/`, no `%`, no
   second number — and `1 / 24` on the tick `firstReveal` fires.
3. In a fresh run driven to a balance above every `costBase` and then spent to zero, all three
   upgrade rows remain present; no lift is reversed in that session or any later one.
4. Zero instances anywhere in the place of the twelve `S1`–`S12` items, checked as an instance and
   asset grep rather than by eye.

## Flagged to the developer

All three suppressions are decisions on brief silence. **The live alternative is the shipped
default: show all six at second zero** — cheaper (no pattern change, no three booleans) and it
puts `0 / 24` in front of a player seconds before the game earns it. **Recommendation: suppress.**
The denominator is the one I would defend hardest; the row staging is the one I would trade first
if the pattern change proves expensive.

## Not decided here

Layout, position, size, wording, colour, casing and appearance of any of the six surfaces (UI/UX
— Screens and Feedback UI; theme/vocabulary and theme/tone own every string). The beat ids and
their ceilings (`02`, which holds the key and folds this block in). What must be understood and by
when (`03`). The verb that spends, and whether an upgrade row is itself the control (`input`,
gameplay/mechanics, unsettled). Every cost value the row lifts read (Balance & Tuning). The save
format for the three booleans (persistence work). The second-session open (return-hook work).
Whether any of this is measured (Analytics — Funnels).

> **Corrected 2026-08-01.** `latchSource` read *"the collection map is non-empty"* on both
> surfaces. `wiring.onJoin` step 1 has `persistence.load` fill missing `found` keys with
> `false`, so a brand-new save arrives on the wire with all 24 keys **present** — the map is
> never empty and `next(found) ~= nil` is true at join. Taken literally the withholding does
> nothing: the panel and the `/ 24` denominator both lift for a player who has found nothing,
> which is precisely the state these two rows exist to prevent.
>
> Found **independently by two builders in the same wave** — `index-screen`, which owns the
> panel, and `persistence`, which owns the fill that breaks it. Neither could see the other's
> module. Two agents reaching the same defect from opposite sides is the strongest signal this
> pipeline produces, and it is why the correction is a count rather than a presence test.
