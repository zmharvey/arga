# 02 — The first minute, beat by beat

**Domain:** gameplay/onboarding · **Category:** Gameplay · **Wave:** 3

## Decision

**Six beats, and no beat that pays may fire before the player caused it.** A character's
clearing pass is **disarmed until that character has moved 2.0 studs horizontally from its
spawn pivot**, so the first clear and the reveal riding it are both consequences of input. The
reveal still lands within 3 s of first input and within 10 s of join.

## Why

**The brief's sentence carries a verb with an agent; the shipped build drops the agent.**
*"The player spawns touching overgrowth, and the first patch **they clear** has something under
it"* `[brief: soft]` ← `[you accepted: R6 Q3]`, `02-GAMEPLAY.md`. The build keeps the ten seconds
and loses the agent: the placed Find sits on `indexNearestOrigin(patches)`, commented *"the one
the player spawns on top of"* `[research: game/src/shared/Layout.luau:137-144]`; clearing is a
server-tick XZ test reading no client message `[research: game/src/server/Clearing.luau:161-180]`;
the character is pivoted to that same origin on every `CharacterAdded`
`[research: game/src/server/init.server.luau:55-60]`. At a 5.5-stud radius against 6-stud spacing,
`B1` — *"the loudest single moment in the game"* `[cid: decided — theme/tone/03]` — fires on tick
one with zero input.

**The fix is a precondition, not a re-placement, and not a clearing.** `01`'s placement stands; a
patch-free disc at spawn was tried and **withdrawn** `[cid: decided — gameplay/mechanics/02]` for
contradicting *"spawns touching overgrowth"*. The patch stays; the **pass** waits. `[cid: decided]`

**Why 2.0 studs.** At the default walk speed of 16 `[cid: decided — gameplay/mechanics/01]` that
is 0.125 s of held input, below noticing, and far above the slide a 3-stud drop can produce
`[research: game/src/server/init.server.luau:55-60]`. It is strictly below
`movement.baseClearRadius`, which keeps the placed Find **inside the radius when the gate
releases**, so the reveal stays on the same tick as the first clear. `[playtest unknown]` 2.0,
test range 1.0–4.0.

**The gate is not a first-run special case** — it is how clearing works on every character spawn,
always, which avoids a persisted "is this run 1" test and the first-run-only behaviour `03` `T5`
forbids. Displacement is computed server-side from the root position, so it adds no remote and no
client trust `[brief: soft]`, `04-PRESENTATION.md`.

**If the player never moves, nothing happens, and that is the answer.** No timer, no prompt, no
text; `[cid: decided — theme/tone/04]` `D12` removes every way of signalling "you cannot do that"
and there is nothing they cannot do. The one channel still reaching a motionless player is a
**co-present stranger visibly clearing ground** at ≤128 studs, without input
`[cid: decided — gameplay/social/02]` — an existing decision, not a new instrument, and one that
delivers nothing on an empty server. Accepted rather than patched.

**The felt discovery rate inverts, so the second Find is bounded too.** Guaranteeing ordinal 1
then drawing uniformly makes the observed rate 1-in-1, then roughly 1-in-28. At ordinal 2 it
teaches abundance and takes it back; at ordinal 130 minute 1's back half holds nothing above a
currency tick. Hence the band below. `[cid: decided]`

**The reference is a model for shape, not for order.** It teaches cut → currency → upgrades →
rarity → zones → rebirth `[research: https://www.rosenberryrooms.com/grass-incremental/]`
`[research: https://www.ofzenandcomputing.com/grass-incremental-tips-tricks/]` — exactly the
*economy first, finds later* alternative `02-GAMEPLAY.md` declined, and it has no discovery layer
to teach. **Position 2 is the whole divergence and this sheet puts a Find there.**

**In wall-clock seconds the reference is unmeasured**, so no number here is sourced from it.
`[research owed: a timestamped capture of the first 120 seconds of Roblox place 133086043677134 —
time to first currency and to first upgrade. Three source types returned HTTP 405; a transcript
API or a stopwatch would settle it.]` Roblox's FTUE guidance **states no time threshold at all**
`[research: https://create.roblox.com/docs/production/game-design/onboarding]`; the brief's
ten-second window, chosen without a source, is independently corroborated
`[research: https://www.spaceport.xyz/blog/how-to-hook-players-in-the-first-2-minutes-game-retention-tips-for-roblox-devs]`.

| # | id | bySecond | source of the second | precondition | guaranteed outcome | teaches |
|---|---|---|---|---|---|---|
| 1 | `spawn` | 0.0 from join | inherited — pivot on `CharacterAdded` | character loaded and pivoted to the plot spawn point | stands inside standing overgrowth, tool welded and visible, ≥1 standing patch inside `baseClearRadius`, `clearedCount` 0 | nothing — the only beat with no concept |
| 2 | `firstClear` | 3.0 from **first input** | `[cid: decided — gameplay/core-loop/01]` 3 s payoff rule | `armed`: horizontal displacement from the spawn pivot has exceeded `armDistanceStuds` once this character life | ≥1 patch clears and credits currency on the same tick | contact clears; the tick that rides it is the currency |
| 3 | `firstReveal` | 10.0 from **join**, over sessions whose first input arrived by 5.0 | `[brief: soft]` `02-GAMEPLAY.md` ten-second promise | `firstClear` fired on the patch carrying the placed Find — held by `01` plus `spawnToNearestPatchMaxStuds` | exactly one Find revealed, entered permanently | clearing is revealing |
| 4 | `firstOrdinaryClear` | 15.0 from join `[playtest unknown]` 10–25 | `[cid: decided]` | `firstReveal` fired | ≥3 patches clear with no reveal — implied by `secondFindOrdinalMin` | the ground is not made of Finds |
| 5 | `tierContrast` | 45.0 from join `[playtest unknown]` 25–75 | `[cid: decided]` | the first 20 patches by spawn-distance ordinal hold ≥2 distinct `tierIndex` values | two clears with different credits and different silhouettes | overgrowth is graded, and grade pays |
| 6 | `firstSpendAffordable` | 60.0 from join `[playtest unknown]` 40–120 | `[cid: decided]`, **awaiting a value** | balance ≥ the cheapest upgrade's level-1 cost | the cheapest upgrade row lifts and is affordable | that clearing pays for reach — comprehension only, no control named |

**No sixth beat is added to `[cid: decided — gameplay/mechanics/05]`'s five**: rows 2, 4 and 5 are
its `B5`, row 3 its `B1`, row 6 precedes its `B4`, row 1 fires no cue, and **no row takes control
from the player.** Area completion, set completion and depth are out of reach: a lap is 165 s
`[cid: decided — gameplay/core-loop/04]`, so minute 1 is ~36% of one. `03` schedules them.

```manifest
{
  "provides": "firstSession",
  "value": {
    "armDistanceStuds": 2.0,
    "armScope": "perCharacterSpawn",
    "armMeasuredOn": "server, horizontal XZ displacement of the character root from the plot spawn pivot",
    "ceilings": {
      "secondsToFirstClear": { "max": 3.0, "measuredFrom": "firstInput", "population": "all run-1 sessions in which any input occurred" },
      "secondsToFirstReveal": { "max": 10.0, "measuredFrom": "join", "population": "run-1 sessions whose first input arrived by second 5.0" }
    },
    "placement": {
      "ordering": "patches sorted ascending by XZ distance from the plot spawn point",
      "firstFindOrdinal": 1,
      "secondFindOrdinalMin": 8,
      "secondFindOrdinalMax": 40,
      "tierContrastWithinFirstOrdinals": 20,
      "spawnToNearestPatchMaxStuds": 3.5,
      "spawnToNearestPatchFormula": "movement.baseClearRadius - firstSession.armDistanceStuds"
    },
    "firstPurchaseBand": {
      "appliesTo": "the cheapest upgrade's level-1 cost",
      "minPatchesOfClearing": 10,
      "maxSecondsOfClearing": 60,
      "atStats": "base"
    },
    "beats": [
      { "id": "spawn", "bySecond": 0.0, "from": "join", "precondition": "character loaded and pivoted to the plot spawn point", "guaranteedOutcome": "stands inside standing overgrowth, tool welded and visible, at least one standing patch inside movement.baseClearRadius, clearedCount 0", "teaches": null },
      { "id": "firstClear", "bySecond": 3.0, "from": "firstInput", "precondition": "armed: horizontal displacement from the spawn pivot has exceeded armDistanceStuds at least once this character life", "guaranteedOutcome": "at least one patch clears and credits currency on the same server tick", "teaches": ["contactClearing", "currency"] },
      { "id": "firstReveal", "bySecond": 10.0, "from": "join", "precondition": "firstClear fired on the patch carrying the placed Find", "guaranteedOutcome": "exactly one Find is revealed and enters the collection permanently", "teaches": ["theFind"] },
      { "id": "firstOrdinaryClear", "bySecond": 15.0, "from": "join", "testRange": [10.0, 25.0], "precondition": "firstReveal has fired", "guaranteedOutcome": "at least three patches clear with no reveal", "teaches": ["theFind"] },
      { "id": "tierContrast", "bySecond": 45.0, "from": "join", "testRange": [25.0, 75.0], "precondition": "the first 20 patches by spawn-distance ordinal hold at least two distinct tierIndex values", "guaranteedOutcome": "two clears with different currency credits and different silhouettes", "teaches": null },
      { "id": "firstSpendAffordable", "bySecond": 60.0, "from": "join", "testRange": [40.0, 120.0], "awaitingValue": "upgrades[].costBase", "precondition": "balance has reached the cheapest upgrade's level-1 cost", "guaranteedOutcome": "the cheapest upgrade row lifts and the player holds enough to buy it", "teaches": ["upgradeAxes"] }
    ],
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
    "withheld": [
      { "surface": "collectionCount", "presentAtJoin": true, "liftedBy": null, "latched": false, "joinValue": "0" },
      { "surface": "collectionDenominator", "presentAtJoin": false, "liftedBy": "beat:firstReveal", "latched": true, "latchSource": "the collection map is non-empty", "newSaveFields": 0 },
      { "surface": "currencyReadout", "presentAtJoin": true, "liftedBy": null, "latched": false, "joinValue": "0" },
      { "surface": "upgradeRow", "perRow": true, "presentAtJoin": false, "liftedBy": "balance has reached upgrades[i] level-1 cost", "latched": true, "latchSource": "one persisted boolean per row", "newSaveFields": 3 },
      { "surface": "areaProgress", "presentAtJoin": true, "liftedBy": null, "latched": false, "joinValue": "0%" },
      { "surface": "collectionPanel", "presentAtJoin": false, "liftedBy": "beat:firstReveal", "latched": true, "latchSource": "the collection map is non-empty", "newSaveFields": 0 }
    ],
    "suppressionForbidden": ["padlockOrLockGlyph", "greyedOrDimmedRow", "questionMarkPlaceholder", "unknownDenominatorForm", "explanatoryTooltip", "liftAnimation", "liftSound", "newBadgeOrDot", "reSuppression", "unrevealedFindsInCount", "percentFormOfCollectionCount", "reflowOnLift"],
    "permittedConfusion": ["patchTier", "costGrowth", "depthMeaning", "setBonus", "collectionEnd", "otherPlayersAreReal", "persistence", "absenceOfRebirthAndIdle"]
  }
}
```

## Consequences for other work

- **Clearing-pass work** (`game/src/server/Clearing.luau`): one boolean per character, set when XZ
  displacement from the spawn pivot exceeds `armDistanceStuds`, checked before the per-patch loop.
  Never persisted, never sent to a client, re-created on every spawn.
- **Spawn-placement and area-layout work**: `dist(spawnPoint, nearestPatch) <= baseClearRadius -
  armDistanceStuds` — **3.5 studs at shipped values**. A distance, not a coordinate and not a
  facing, so it composes with co-presence work's row-facing requirement.
- **Find-placement work** (the layout routine): the second Find's ordinal band 8–40, and two
  distinct tiers inside the first 20 ordinals. Both stay seed-derived, so nothing reads player
  state and the no-reachable-duplicate partition is untouched.
- **Cost-curve work**: the cheapest upgrade's level-1 cost must exceed the yield of 10 patches and
  fall below the yield of 60 s of clearing, at base stats — so the loop's fourth step has an event
  inside minute 1.
- **Instrumentation work**: two ceilings with **units and populations**, which the brief's
  measurement item states neither of. `secondsToFirstClear` is input-relative — a player who has
  not moved is not failing; `secondsToFirstReveal` stays join-relative, as promised.
- **Purchase-verb work**: only row 6's `bySecond` is exposed to the escalation; its content is
  affordability, which no verb changes.

## Acceptance criteria

1. In 100 consecutive fresh runs with no input given, that player's `clearedCount` stays 0 and
   zero Find reveals fire, for the whole run.
2. In 100 consecutive fresh runs, the first Find reveal occurs on the same server tick as the
   player's first cleared patch, and never on a tick before XZ displacement from the spawn pivot
   first exceeded `firstSession.armDistanceStuds`.
3. `firstSession.armDistanceStuds < movement.baseClearRadius`, and the XZ distance from the plot
   spawn point to the nearest patch is at most
   `movement.baseClearRadius - firstSession.armDistanceStuds`.
4. Every `bySecond` in `firstSession.beats[]` carries a `from` quoted from the brief, an inherited
   source, or a `testRange`; none is bare.

## Flagged to the developer

The brief never says the first reveal must be caused by the player, and its own sentence reads
both ways. **Two live alternatives:** (a) this sheet's arming gate, which keeps the player
touching overgrowth at spawn and delays only the pass; (b) moving the spawn point outside
`baseClearRadius` of every patch, cheaper and breaking *"spawns touching overgrowth"*.
**Recommendation: (a)** — 0.125 s, one boolean, no fiction.

## Not decided here

The `firstSession` **key's promotion** — proposed here, though widening `onboarding` instead is
cleaner and costs one edit to a shipped sheet; that is contract-and-seam work. Which surfaces are
on screen at each beat (`04`). What must be understood and by when (`03`). The verb that spends,
and any control at all (`input`, gameplay/mechanics, unsettled). Every value in the purchase and
ordinal bands (Balance & Tuning). What any beat sounds, looks or reads like (Audio, Art — VFX,
UI/UX). Whether any observable is instrumented (Analytics — Funnels). The second-session open
(return-hook work).
