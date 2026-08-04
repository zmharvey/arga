# 03 — Teaching order, and the comprehension floor

**Domain:** gameplay/onboarding · **Category:** Gameplay · **Wave:** 3

## Decision

**Seven concepts, one floor.** Only **contact clearing** must land, and it must land at beat
`firstClear`; the other six are *offered* on a schedule and a player may stay confused about
every one of them forever. **"No text, no tutorial" is a permanent ban on instruction, not a
ten-second ban on strings** — labels, counts, costs and names are legal from the first frame,
imperatives never are.

## Why

**With no failure state, confusion has no price, so a comprehension floor can only be justified
by what a player loses by not knowing.** *"There is no failure state. No death, no losing, no
loss of progress"* and *"A stuck player cannot exist — there is always more to clear"*
`[brief: soft]` ← `[you accepted: step 6 Q2]`, `02-GAMEPLAY.md`. Misreading tier rarity costs
nothing; misreading cost growth costs nothing; not knowing a set has a bonus costs nothing,
because the bonus arrives whether or not it was understood. **Exactly one misunderstanding is
terminal: not knowing that walking is the verb.** A player who believes they must click, aim or
wait produces zero clears and the design never starts. The floor has one item. `[cid: decided]`

**The order is fixed by what is reachable, not by what is important.** A depth-1 lap targets
165 s `[cid: decided — gameplay/core-loop/04]`, so area completion, sets and depth cannot be
taught by their own events inside minute 1, and the first purchase waits on a cost nobody has
set. Ranks 1–4 are minute-1 work; ranks 5–7 span the 10–20 minute session
`[brief: binding]` ← `[you chose: R1 Q4]`, `00-CORE.md`.

**Rank 2 is the divergence and it is deliberate.** The reference teaches
cut → currency → upgrades → rarity → zones → rebirth
`[research: https://www.rosenberryrooms.com/grass-incremental/]`
`[research: https://www.ofzenandcomputing.com/grass-incremental-tips-tricks/]`, the *economy
first, finds later* order `02-GAMEPLAY.md` **declined** *"because a new player could quit before
ever seeing what makes this game different"*. It has no discovery layer to teach; this game puts
the Find at position 2 in *time*, riding `firstClear`.

**The Find needs two events, not one.** `firstReveal` teaches that Finds exist;
`firstOrdinaryClear` teaches that most ground has none. A sample of one would otherwise teach a
1-in-1 rate, and the honest rate is roughly 1-in-28 after the guarantee. Both are `02`'s beats
and this sheet only names what they must land. `[cid: decided]`

**"No text, no tutorial" scopes to instruction because that is the only reading that survives.**
`04-PRESENTATION.md` **declined** a game-wide text-free comprehension rule `[brief: soft]` ←
`[you accepted: R6 Q4]`, and the shipped HUD is made entirely of strings, so a literal ban is
already contradicted. The line that holds at every second is: **no string whose purpose is to
tell the player what to do.** That is already half-machine-enforced —
`[cid: decided — theme/tone/01]` `P1` forbids first and second person and requires declarative
mood, which forbids an imperative mechanically. The other half is the device table below, which
is a grep rather than a taste. `[cid: decided]`

**Teaching is visual because nothing else is left.** Roblox's FTUE guidance offers a guided
arrow as an alternative to dialogue `[research: https://create.roblox.com/docs/production/game-design/onboarding]`
and both are closed here — an arrow is row `T3`, dialogue needs a speaker and no entity class
exists `[cid: decided — theme/identity/04]`. Advice to show a mechanic visually and reinforce it
repeatedly before assuming it landed `[research: https://www.spaceport.xyz/blog/how-to-hook-players-in-the-first-2-minutes-game-retention-tips-for-roblox-devs]`
meets one recurring event here — the patch clear — which is why rank 1 is the only required rank.

**The first session says nothing about rebirth or idle.** `CONCEPT.md` requires their absence be
*"said plainly because genre-literate players will otherwise arrive expecting rebirth and idle
and not find them"* `[brief: binding]` ← `[you chose: R2 Q1, R2 Q2]`. Saying so in-game needs a
string naming a system this game does not have, which is instruction about an absence and the
single most confusing thing a first minute could contain. **The obligation is real and it is the
store listing's, not the first session's.** `[cid: decided]`

| rank | concept | taught by | observable that proves it landed | must have landed by | required |
|---|---|---|---|---|---|
| 1 | contact clearing | beat `firstClear` | five or more clears in the 15 s after the first, with no input gap over 3 s | beat `firstClear` | **yes** |
| 2 | the currency | the tick that rides beat `firstClear` | the currency readout is non-zero and rising while the player moves | beat `firstClear` | no |
| 3 | the Find | beat `firstReveal`, corrected by beat `firstOrdinaryClear` | the player keeps clearing new ground rather than re-walking the reveal site | beat `firstOrdinaryClear` | no |
| 4 | the three upgrade axes | beat `firstSpendAffordable` — that clearing pays for reach | a first purchase occurs in session 1 | beat `firstSpendAffordable` | no |
| 5 | area completion | the area progress readout moving, and the standing/cleared edge | cleared fraction at session end exceeds the fraction at first sight of the readout | minute 5 `[playtest unknown]` 3–8 | no |
| 6 | sets | the collection surface showing one filled slot in a labelled group of six | the collection surface is opened at least once in session 1 | 60 s after `firstReveal` `[playtest unknown]` 30–180 | no |
| 7 | depth | entering a second area through an opening that needs no explanation | a second area is entered in session 1 | minute 6 `[playtest unknown]` 3–12 | no |

**Rank 6 survives the collection restructure.** One filled slot among five empty siblings is true
whether an area buries a whole set or a slice of one, so this row does not break if
`relicsPerArea` falls.

| id | never taught, at any second | because |
|---|---|---|
| `N1` | rebirth | cut `[brief: binding]` ← `[you chose: R2 Q2]`; naming it to deny it is instruction about an absence |
| `N2` | offline accrual | cut, follows from permanence `[brief: binding]` |
| `N3` | that a Find is rarer than another Find | no Find carries a rarity `[cid: decided — gameplay/systems/03]` |
| `N4` | a discovery rate, or luck | no such quantity exists `[cid: decided — gameplay/systems/05]` |
| `N5` | duplicates | no reachable duplicate exists `[cid: decided — gameplay/systems/05]` |
| `N6` | failure, danger, loss or a wrong move | none exists `[brief: soft]` `02-GAMEPLAY.md` |
| `N7` | any control, on any device | the verb roster is `input`'s and under revision; this sheet is comprehension only |
| `N8` | codes, dailies, leaderboards, trading, seasons | priority 3 `[brief: soft]` `03-META.md` |

| id | forbidden tutorial device — at every second, not just the first ten | check |
|---|---|---|
| `T1` | an imperative-mood string anywhere | no player-facing string's first word is a bare verb |
| `T2` | a string containing `tip`, `hint`, `how to play`, `objective`, `goal`, `tutorial` | grep the merged manifest and every brief |
| `T3` | an arrow, chevron, beam, waypoint, outline or highlight pointing at a patch, an opening or a surface | zero instances of those classes in the place |
| `T4` | a ghosted, pulsing or animated control glyph | zero |
| `T5` | any first-run-only string | every string is present on run 1 and run 50 alike |
| `T6` | a modal, panel or overlay that appears without the player asking for it | zero unrequested `Enabled = true` transitions |
| `T7` | a countdown, a tutorial step counter, or a checklist | zero |
| `T8` | a voice-over or spoken line | zero audio assets with speech |
| `T9` | a `welcome` or `welcome back` string on join or rejoin | grep |
| `T10` | a string naming a key, button, pad, gesture, tap, press, click, hold, swipe, drag, joystick, stick or trigger | grep those 13 tokens across all player-facing strings |
| `T11` | a camera move, zoom or reframe the player did not cause | zero writes to `Camera.CFrame` outside player control |
| `T12` | a sound whose purpose is to prompt rather than to acknowledge | every cue maps to one of the five named beats |

| id | a player may stay confused about this **indefinitely**, with no correction and no cost |
|---|---|
| `C1` | which tier a patch is, and that tiers pay differently at all |
| `C2` | that upgrade cost grows geometrically |
| `C3` | that the second area is *deeper* rather than merely next |
| `C4` | that a completed set grants anything |
| `C5` | that the collection ends at 24 |
| `C6` | that the other figures in view are real people rather than scenery |
| `C7` | that anything is saved between sessions |
| `C8` | that there is no rebirth and no idle |

**This sheet carries no manifest block by design:** `02` proposes and holds `firstSession` and
folds the amendment below into it, because one key admits exactly one owning sheet.

```json
{
  "amends": "firstSession",
  "teaching": [
    { "concept": "contactClearing", "taughtBy": "beat:firstClear", "byBeat": "firstClear", "evidence": "five or more clears in the 15 s after the first, with no input gap over 3 s", "required": true },
    { "concept": "currency", "taughtBy": "beat:firstClear", "byBeat": "firstClear", "evidence": "the currency readout is non-zero and rising while the player moves", "required": false },
    { "concept": "theFind", "taughtBy": "beat:firstReveal, corrected by beat:firstOrdinaryClear", "byBeat": "firstOrdinaryClear", "evidence": "the player keeps clearing new ground after firstOrdinaryClear rather than re-walking the reveal site", "required": false },
    { "concept": "upgradeAxes", "taughtBy": "beat:firstSpendAffordable", "byBeat": "firstSpendAffordable", "evidence": "a first purchase occurs in session 1", "required": false },
    { "concept": "areaCompletion", "taughtBy": "the area progress readout moving, and the standing/cleared edge", "byBeat": "minute:5", "testRange": [3, 8], "evidence": "cleared fraction at session end exceeds the fraction at first sight of the readout", "required": false },
    { "concept": "sets", "taughtBy": "the collection surface showing one filled slot in a labelled group of six", "byBeat": "firstReveal+60s", "testRange": [30, 180], "evidence": "the collection surface is opened at least once in session 1", "required": false },
    { "concept": "depth", "taughtBy": "entering a second area through an opening that needs no explanation", "byBeat": "minute:6", "testRange": [3, 12], "evidence": "a second area is entered in session 1", "required": false }
  ],
  "neverTaught": ["rebirth", "offlineAccrual", "findRarity", "discoveryRate", "duplicates", "failure", "anyControl", "codesDailiesLeaderboardsTrading"],
  "tutorialDevicesForbidden": ["imperativeString", "tipHintHowToPlayObjectiveGoalString", "pointerArrowChevronBeamWaypointOutlineHighlight", "ghostedOrPulsingControlGlyph", "firstRunOnlyString", "unrequestedModalPanelOrOverlay", "countdownOrTutorialChecklist", "voiceOverOrSpokenLine", "welcomeOrWelcomeBackString", "stringNamingAControl", "uncausedCameraMoveZoomOrReframe", "promptingSound"],
  "permittedConfusion": ["patchTier", "costGrowth", "depthMeaning", "setBonus", "collectionEnd", "otherPlayersAreReal", "persistence", "absenceOfRebirthAndIdle"]
}
```

## Consequences for other work

- **On-screen copy work (UI/UX):** `T1`–`T12` are twelve build-time greps, not a style note. `T5`
  forbids the whole class of first-session-only strings, so nothing you write may vary by run.
- **Store-listing work (Discovery & Marketing):** you inherit the **entire** obligation to say
  plainly that there is no rebirth and no idle. The game will never say it, on any surface, at any
  second. If you also decline it, that binding brief line is unsatisfied by anyone — a finding,
  not a gap I can close.
- **Collection-surface work (UI/UX — Screens):** rank 6 teaches sets by *grouping*, so a group of
  six must be distinguishable with exactly one slot filled and five empty. That is structure, not
  layout; empty slots stay visible and stay unmarked.
- **Area-arrangement and passage work:** rank 7 teaches depth by arrival, so the opening further
  in must need no explanation — no label, no marker, no gate; `T3` applies to it by name.
- **Audio and VFX work:** `T12` means every cue maps to one of the five named beats. No prompting
  sound, no idle nudge, no attract loop.
- **Analytics work (Funnels):** the observable column is a list of *definitions*, not a
  measurement plan. Whether any of the seven is instrumented, and at what pass mark, is yours.
- **Feedback-UI work:** `T6` forbids any unrequested panel, which includes a first-Find
  celebration modal. The reveal owns the world channel and nothing else.

## Acceptance criteria

1. `firstSession.teaching[]` has exactly 7 entries; exactly one has `required: true`, and it is
   `contactClearing` with `byBeat: "firstClear"`.
2. Zero player-facing strings anywhere in the merged manifest or in any `ui-forge` brief contain
   any of: `tip`, `hint`, `how to play`, `objective`, `goal`, `tutorial`, `welcome`, `rebirth`,
   `prestige`, `idle`, `offline`, `afk`.
3. Zero player-facing strings contain any of the 13 control tokens named in `T10`, and no string
   is imperative mood.
4. Every string present on a run-1 session is byte-identical to the string present on a run-50
   session for the same surface and state (`T5`).

## Not decided here

The beat ids, their ceilings and their preconditions (`02`, which holds the key and folds this
block in). Which surfaces are on screen when (`04`). The verb that spends and every control
(`input`, gameplay/mechanics, unsettled). What any string actually says, its register, casing and
length (theme/tone, theme/vocabulary — merged). What the collection surface looks like, and what
an empty slot is drawn as (UI/UX — Screens). Whether any observable here is measured, and the
pass mark if so (Analytics — Funnels). The set-completion bonus and what it grants (Meta &
Content, with Systems).
