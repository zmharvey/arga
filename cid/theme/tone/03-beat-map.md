# 03 — Beat map

**Domain:** theme/tone · **Category:** Theme & Narrative · **Wave:** 1

## Decision

**Five beats, ranked with no ties: `B1` a Find reveals, `B2` a set completes, `B3` an area
completes, `B4` an upgrade is purchased, `B5` a patch clears.** `B1` is the loudest single
moment in the game in every channel. Between beats the game has exactly one recurring
emphasis (`B5`) at exactly one intensity, and **nothing anywhere rises as a completion
approaches.** The ceiling does not rise with depth: `B1` at depth 4 is exactly as loud as
`B1` at depth 1.

## Why

This is the only artifact that tells Audio, VFX and Feedback UI where the game may peak,
because *"There is no failure state"* and *"Zero tension is deliberate"* leave no other
structure `[brief: soft]` ← `[you accepted: step 6 Q2]` (`02-GAMEPLAY.md`), and the consequence
is stated in the same sheet: *"audio and visual feedback carry the entire load"*.

**`B1` over `B2`, and the reason is masking rather than taste.** `gameplay/core-loop/02`
(pack §4) ranks payoff *weight* `1 / 3 / 8 / 20 / 50`, putting set completion above a Find
reveal. That ladder is economic magnitude integrated over a session, and it is correct for
what it measures. **Payoff weight is not cue intensity.** A set completes because its sixth
Find reveals: the two moments are coincident, so a completion cue that out-peaks the reveal
masks the reveal that caused it, and the player loses the one beat the whole game is built to
deliver. `B2` may therefore be **longer and wider** than `B1`, occupying more channels and
resolving after it, but never sharper. This also ratifies the brief's own default,
*"a relic reveal owns the best sound in the game"* `[brief: soft]` ← `[I assumed]`
(`OPEN.md §2`). `[cid: decided]`

**Nothing changes with depth, and this is the line most likely to be argued with.**
`gameplay/core-loop/05` (pack §4) holds lap wall-clock flat across depth, so peak frequency is
already flat; a rising ceiling would make depth 1 a demo of the real game, and the beat that
must land hardest is the very first one, inside ten seconds, on a player who has read nothing
`[brief: soft]` ← `[you accepted: R6 Q3]` (`02-GAMEPLAY.md`). A ladder that rises also has
nowhere to go: the ceiling is a phone speaker and a child, not a design choice. `[cid: decided]`

### The five beats

| id | moment | rank | may occupy | constraint |
|---|---|---|---|---|
| `B1` | a Find is revealed at the instant its patch clears | **loudest** | every channel: audio, VFX, UI notice, haptics | The peak of the game. Not amplified for the first one ever, not amplified for the last one, not amplified by depth or rarity of the Find |
| `B2` | a set completes, 6 of 6 | 2nd | every channel | Begins only after `B1`'s peak has passed, since the sixth reveal triggers it. May be longer and wider than `B1`. Never sharper. 24 of 24 is the fourth `B2` and nothing further |
| `B3` | an area completes, last patch cleared | 3rd | audio and VFX; no modal | The *"only 'achievement' sound"* per `OPEN.md §2`. Where `B2` and `B3` coincide, `B3` resolves inside `B2` and does not fire twice |
| `B4` | an upgrade is purchased | 4th | audio and UI only, no VFX in the world | A confirmation, not a celebration. Identical at every level and on every axis |
| `B5` | one patch clears and pays | **texture, not a beat** | one channel | Exactly one intensity, every time, forever. No streak escalation, no combo, no rising pitch ladder, no crescendo near completion |

### Moments that are forbidden from peaking

| forbidden peak | why |
|---|---|
| entering or leaving an area | not a payoff; `gameplay/core-loop/02` ranks no such kind |
| time passing, idling, standing still | imports a timer into a game with none |
| returning after an absence, a first visit of the day, a streak | priority 3: daily rewards, offline accrual (`03-META.md`, category scope gate) |
| another player's reveal or completion | *"no mechanical interaction"* `[brief: soft]` ← `[you accepted: R6 Q2]`; and `cid/theme/identity/03-co-present-stranger.md` (pack §4) |
| a duplicate Find | resolves at `B5` texture. A duplicate is not a new Find and may not borrow `B1` |
| the approach to a completion | **the load-bearing one.** A ramp is tension, and `HANDOFF.md` binds *"nobody downstream should invent tension to fill the gap"* `[brief: binding]` on the instruction. Completion progress is read as a static indicator, never as mounting intensity |
| a purchase offer, an unlock, a milestone banner, a level-up | no such kinds exist in the payoff ladder; inventing one adds a beat class |

### How flat the baseline is, stated checkably

| rule | check |
|---|---|
| The number of distinct intensity levels for `B5` is 1 | one spec, not a table by tier or depth |
| No cue's intensity is a function of progress, streak, count, elapsed time, or depth | zero cue parameters read those inputs |
| Every beat class has exactly one intensity specification across all four depths | count of specs per class is 1 |
| Between two `B1` events the game produces no emphasis other than `B5` | no third recurring cue exists |

## Pushing back

`OPEN.md §2` says *"Reveals and completions are the two emotional peaks"* `[brief: soft]` ←
`[I assumed]`. I keep the reveal at the top and overrule the pair: **completions are two
different beats, not one**, and an upgrade purchase is a ranked beat rather than nothing. The
default was written before a set-completion payoff kind existed in the ladder, and treating a
set completion and an area completion as one thing hands Audio a rank it cannot act on when
both fire at the same instant.

## Playtest unknown

Zero tension is *"entirely unverified"* by the brief's own admission (`OPEN.md §6`). Starting
position: the flat baseline above. If playtesting shows disengagement between peaks, **the one
permitted remedy is more `B1` events per session** (discovery rates, Meta and Content). Adding
a beat class, a ramp, a timer or a threat is not in the test range, because that is the gap the
handoff forbids filling.

## Consequences for other work

- **Feedback and celebration design for the completely-clear moment** (Mechanics, wave 2)
  inherits `B3` third, below `B1` and `B2`, audio and VFX only, no modal, and no ramp
  preceding it.
- **Audio intent** (Audio, wave 4) inherits a ranking it did not set, including the coincidence
  rule between `B1`, `B2` and `B3`, and the single-intensity rule on `B5`.
- **Feedback UI** (UI/UX, wave 4) may not show a notice for `B4` or `B5`, and may not render a
  Find's identity before `B1` fires.
- **Discovery rates** (Meta and Content, wave 3) own the frequency of `B1`, which is the only
  lever this sheet leaves for pacing.

**These two kinds of work can overturn this sheet, and only these two:** feedback and
celebration design for the completely-clear moment, and audio intent. To overturn it, name the
`B` ids being re-ranked and cite this file, so the ladder inverts deliberately rather than
quietly.

## Acceptance criteria

1. The beat inventory contains exactly 5 entries ranked `B1` to `B5` with no ties, and `B1` is
   the Find reveal.
2. This sheet names zero sounds, zero instruments, zero colours, zero assets, zero durations,
   zero rates and zero numeric values.
3. Every beat class has exactly one intensity specification covering all four depths, and no
   cue parameter anywhere in the build reads progress, streak, count, elapsed time or depth.
4. No cue increases in intensity as an area approaches completion, and `B5` has exactly one
   intensity level.

## Not decided here

Every cue in every channel: what any beat sounds like, looks like, how long it lasts, how loud
it is in decibels, and what it is made of (Audio, Art and Visuals, UI/UX, waves 2 and 4).
Payoff magnitudes and the weight ladder (`gameplay/core-loop/02`). Discovery rates and how
often `B1` fires (Meta and Content). The emotional promise across a whole playthrough
(`theme/fantasy`, sheets `02` and `03`). What words appear at any beat (sheets `01` and `02`,
this domain).
