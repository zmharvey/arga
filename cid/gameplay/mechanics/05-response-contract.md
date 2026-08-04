# 05 — The response contract

**Domain:** Mechanics · **Category:** Gameplay · **Wave:** 2

## Decision

**No beat ever takes control away from the player, including area completion.** Each of the five
beats fires from a named cause on a named side, is acknowledged inside a stated latency budget, and
the reveal owns the world channel exclusively while the two completion notices own the notice
channel exclusively, so the reveal and the area-completion notice no longer share one.

## Why

- **G4, what the player can and cannot do during the completion moment: everything they could do a
  second earlier.** Zero tension is confirmed and instructed, "nobody downstream should invent
  tension to fill the gap" `[brief: soft]` ← `[you accepted: step 6 Q2]`, `02-GAMEPLAY.md`, and a
  lockout is tension with a timer on it. `gameplay/core-loop/02` reaches the same rule from the
  other side: none of the three coincident payoffs "may require the player to stop moving".
- **G5, how a reveal reads as distinct from an ordinary clear while remaining one action.** The
  brief binds the systems half, "Clearing and discovering are one action. Do not design them as
  separate systems" `[brief: soft]` ← `[you accepted: R2 Q3]`, `01-FOUNDATION.md`, and says nothing
  about the perceptual half. **The distinction is persistence, not a second action.** One event
  causes both; a clear leaves nothing behind at the patch position, and a reveal leaves an object
  there that dwells. Nothing is added to the player's input and nothing is added to the world's
  rules.
- **The revision `gameplay/core-loop/03` demanded is honoured by exclusive channel ownership.** B1
  may never use the `notice` channel and B3 may never use the `atPatch` channel. Audio is shared by
  every beat by construction, since Tone ranks all five in every channel; separating them inside
  audio is Audio's work, not mine.
- **Latency is mine, cadence and ordering are Core Loop's.** Every budget below is the interval from
  the deciding side's decision to the player's first perceptible acknowledgment. The coincident
  order and the onset separation are **not** mine and are inherited verbatim; see below.
- **B5's visual half is client-predicted and its economic half is not.** The server tick and the
  round trip together put a server-confirmed disappearance beyond 200 ms on the game's most repeated
  action, which a player feels thousands of times a session. Prediction costs nothing here because
  nothing contests it: a patch is standing or cleared, permanently, and the client only predicts
  patches its own character is inside the radius of. Integrity is unaffected because the award and
  the persisted state stay server-decided `[brief: soft]`, `04-PRESENTATION.md`, and a patch the
  server does not confirm is silently restored at the next snapshot.

## The five beats

Ranks are Tone's `theme/tone/03-beat-map` and are **not re-ranked here**. Every duration is
`[playtest unknown]` and carries a starting value with a test range.

| beat | rank | cause | decided by | acknowledgment budget | test range | channels | control affected |
|---|---|---|---|---|---|---|---|
| `patchClear` | B5 | the character's clear radius contains a standing patch | disappearance: **client**, predicted. Award and persisted state: **server** | 80 ms from the client's own radius test; 250 ms from the server decision for the currency readout | 40 to 120 ms; 150 to 400 ms | `atPatch`, `readout` | **no** |
| `findReveal` | B1 | the clearing of the patch that hides it, per patch, at that instant | **server** | 300 ms | 200 to 500 ms | `atPatch` (dwells), `audio`. **Never `notice`** | **no** |
| `setComplete` | B2 | the sixth Find of a set is revealed | **server** | 400 ms after its emission slot | 250 to 700 ms | `notice`, `audio` | **no** |
| `areaComplete` | B3 | the last standing patch in the area clears | **server** | 400 ms after its emission slot | 250 to 700 ms | `notice`, `audio`. **Never `atPatch`** | **no** |
| `upgradePurchased` | B4 | the `buy` precondition is satisfied at a purchase pressable | **server** | 200 ms | 120 to 350 ms | `readout`, `audio` | **no** |

**Sequencing, inherited not decided.** The coincident order is `gameplay/core-loop/02`'s, verbatim:
"In the coincident case the order is fixed: reveal → set completion → area completion", world-state
change last. My first draft had set and area reversed and gave no reason for it; the order below is
theirs. `upgradePurchased` precedes all three because it is causally unrelated to them and is the
only one that can be pending for a reason outside the clear.

The minimum onset separation is also theirs: **0.6 s** `[playtest unknown]`, test range 0.35 to
0.9 s, and the figure inside that range belongs to Balance and Tuning, not to me. My first draft set
1.2 s with a barely-overlapping range, which was one quantity owned by two sheets.

`patchClear` is outside the sequence: it is never queued, never delayed and never suppressed, and
the contract must tolerate at least **8 onsets per second** without dropping one, which is what a
maxed player sweeps at the base area's density (2 × 14.3 studs × 25.6 studs/s × 140/14400 patches
per square stud = 7.1 per second, values from `upgrades` and `area`, rounded up). Overlap is the
required degradation; dropping is not. **A lone sequenced beat is never delayed**; the separation
applies only when two are pending at once.

| timing rule | value |
|---|---|
| reveal dwell at the patch position | 2.5 s `[playtest unknown]`, test 1.5 to 4.0 s |
| residue left at the patch position by an ordinary clear | zero objects after 0.4 s `[playtest unknown]`, test 0.2 to 0.8 s |
| a Find's grant | at reveal, server-side. The dwell is display only, and walking away forfeits nothing |
| an upgrade's effect | in force in the same server tick in which its acknowledgment is dispatched, never after |
| a missed acknowledgment | a beat whose acknowledgment is dropped by the network still applied; state reconciles at the next snapshot, silently |

## What a beat may never do

Ten rules. G4 in the form a build can be failed against.

| # | rule |
|---|---|
| R1 | no input lockout, of any duration, for any beat |
| R2 | no forced movement: no auto-walk, no stop, no pull, no push, no teleport |
| R3 | no camera lock, pan, zoom, auto-frame, look-at or shake |
| R4 | no slow motion, no time freeze, and no walk-speed change other than a purchased speed level taking effect |
| R5 | no modal, panel or screen opened, focused or dismissed by any beat. The index screen is opened by a verb and never by a beat |
| R6 | no beat requires acknowledgment, confirmation or dismissal to end |
| R7 | no beat blocks, delays or disables a verb, including a purchase activated in the same second |
| R8 | no beat writes a `Humanoid` property, with one exception: `WalkSpeed`, written by `upgradePurchased` and only as the speed axis's purchased effect |
| R9 | no beat prevents, pauses or slows clearing while it plays |
| R10 | no failure, rejection or negative beat exists: a refused purchase and an unconfirmed clear emit nothing |

```manifest
{
  "provides": "response",
  "value": {
    "controlEverAffected": false,
    "sequencedBeats": ["findReveal", "setComplete", "areaComplete", "upgradePurchased"],
    "sequenceOrderOwner": "gameplay/core-loop/02-payoff-weights, which fixes reveal -> set completion -> area completion and says NOTHING about upgradePurchased. This array used to lead with upgradePurchased, contradicting beats[].rank (findReveal 1, setComplete 2, areaComplete 3, upgradePurchased 4) -- which is the owner's order with upgradePurchased appended. The array had it prepended, a position no sheet ever owned. Reordered to agree with rank; buy an upgrade while walking into a Find and the two readings produced opposite cue orders 600 ms apart. Found by the beats builder, which implemented rank because the acceptance criteria name it twice, and isolated the choice in one comparator so a reversal is a one-function change.",
    "minOnsetGapSeconds": 0.35,
    "minOnsetGapTestRangeSeconds": [0.35, 0.9],
    "minOnsetGapOwner": "gameplay/core-loop/02-payoff-weights, figure set by Balance & Tuning",
    "minOnsetGapWas": 0.6,
    "minOnsetGapIsACopyOf": "pacing.coincidentOnsetSeparationSeconds (gameplay/balance/05-time-to-milestone), which is 0.35. This field is a COPY and must track it. It carried 0.6 while naming Balance & Tuning as the owner of the figure, which is a copy disagreeing with the source it cites by name.",
    "minOnsetGapRuling": "0.35 governs, on two independent grounds. (1) minOnsetGapOwner already says the figure is Balance & Tuning's, and pacing is their key; a key that defers by name and then carries a different number is carrying a stale copy. (2) It is the better number on the merits. game/src/client/Beats.report.md finding 3 measured that at 0.6, areaComplete begins 600 ms after its packet against a 400 ms acknowledgmentBudgetMs — a 50% overrun EVERY TIME an area ends on a Find, which a player notices. At 0.35 that case passes (350 < 400). The two published values were each other's range endpoints (response tested [0.35, 0.9], pacing [0.2, 0.6]), so both were legal under both ranges and the disagreement was purely the point value.",
    "acknowledgmentBudgetsStillBlownAtThisGap": "upgradePurchased's 200 ms and the 300 ms row, whenever either waits behind another onset. This answers the builder's open question in Beats.report.md finding 3 in the direction it assumed: THE GAP WINS. An acknowledgment budget is defined for a lone beat; under coincidence the gap is dominant and a blown budget is not a defect. No value in either range clears all three budgets, so a rule that made the budget dominant would have no legal gap at all.",
    "onsetGapAppliesToTheStream": "gap-always, ratifying what the beats builder implemented under Beats.report.md finding 2. The gap is a property of two consecutive onsets, not only of a queue holding two things. The other reading puts two onsets 0.3 s apart, which a player hears.",
    "loneSequencedBeatDelayed": false,
    "unsequencedBeats": ["patchClear"],
    "minSustainedOnsetsPerSecond": 8,
    "onOverload": "overlap",
    "channelExclusivity": { "atPatch": "findReveal", "notice": ["setComplete", "areaComplete"] },
    "humanoidWritesAllowed": ["WalkSpeed"],
    "beats": [
      { "id": "patchClear", "rank": 5, "cause": "clearRadiusContainsStandingPatch", "decidedBy": "clientPredictedServerAuthoritative", "acknowledgmentBudgetMs": 80, "budgetTestRangeMs": [40, 120], "payoutBudgetMs": 250, "payoutTestRangeMs": [150, 400], "channels": ["atPatch", "readout"], "controlAffected": false, "queued": false, "residueLifetimeSeconds": 0.4 },
      { "id": "findReveal", "rank": 1, "cause": "patchHidingItCleared", "decidedBy": "server", "acknowledgmentBudgetMs": 300, "budgetTestRangeMs": [200, 500], "channels": ["atPatch", "audio"], "forbiddenChannels": ["notice"], "controlAffected": false, "queued": true, "dwellSeconds": 2.5, "dwellTestRangeSeconds": [1.5, 4.0], "grantedAt": "reveal" },
      { "id": "setComplete", "rank": 2, "cause": "sixthFindOfSetRevealed", "decidedBy": "server", "acknowledgmentBudgetMs": 400, "budgetTestRangeMs": [250, 700], "channels": ["notice", "audio"], "controlAffected": false, "queued": true },
      { "id": "areaComplete", "rank": 3, "cause": "lastStandingPatchCleared", "decidedBy": "server", "acknowledgmentBudgetMs": 400, "budgetTestRangeMs": [250, 700], "channels": ["notice", "audio"], "forbiddenChannels": ["atPatch"], "controlAffected": false, "queued": true },
      { "id": "upgradePurchased", "rank": 4, "cause": "buyPreconditionSatisfiedAtPressable", "decidedBy": "server", "acknowledgmentBudgetMs": 200, "budgetTestRangeMs": [120, 350], "channels": ["readout", "audio"], "controlAffected": false, "queued": true, "effectAppliedBeforeAcknowledgment": true }
    ],
    "negativeBeats": 0,
    "lockoutsSeconds": 0
  }
}
```

## Consequences for other work

- **Audio work:** five beats, five budgets, and audio is the one channel every beat shares. Tone
  ranks loudness; this sheet says when each may start and that none of them may gate anything. A cue
  longer than its beat's dwell or separation is legal only if it can overlap the next one, and at
  0.6 s separation that is the common case rather than the exception.
- **VFX work:** whatever the clear is made of must be gone from the patch position inside the
  residue lifetime, and whatever the reveal is made of must persist for the dwell. Those two numbers
  are the entire interface between this sheet and yours.
- **Feedback-UI work:** the `notice` channel is owned by the two completions and may never carry a
  reveal. Nothing on that channel may be dismissible-only, focusable, or block a click-through,
  because R5 and R6 forbid a beat needing a press, and because a notice that swallows a tap would
  swallow a purchase.
- **Tech and networking work:** B5 needs a client-side radius test that shadows the server's, and a
  snapshot that can restore an unconfirmed patch silently. The 80 ms and 250 ms budgets are the two
  numbers that decide whether a snapshot cadence is fast enough.
- **Area-completion detection work:** the last patch's clear must produce both B5 and B3 from one
  server decision, in different channels, not from two independent detections.

## Acceptance criteria

1. At every beat, the player's movement input continues to move the character with no interruption,
   no camera change, and no walk-speed change other than a purchased speed level, measured across an
   area completion that coincides with a Find reveal and a set completion.
2. An ordinary clear leaves zero objects at the patch position 0.4 s after it fires; a reveal leaves
   exactly one, for 2.5 s.
3. In the coincident case the three onsets occur in the order reveal, set completion, area
   completion, with at least 0.6 s between consecutive onsets, and no `patchClear` is delayed or
   dropped at up to 8 clears per second.
4. `findReveal` emits nothing on the `notice` channel and `areaComplete` emits nothing on the
   `atPatch` channel, in every ordering including the one where both fire from the same patch.

## Not decided here

What any beat sounds like, looks like, is made of, or how loud it is, in every channel (Audio, Art
and Visuals, UI/UX). The ranking of the five beats (`theme/tone/03-beat-map`, wave 1, not re-opened).
The coincident order and the onset separation (`gameplay/core-loop/02`, inherited above; the figure
inside its range is Balance and Tuning's). Payoff magnitudes and the cadence between payoffs
(`gameplay/core-loop/01` and `02`). Whether a reveal lands on contact or at completion, already
ratified (`gameplay/core-loop/03`). What a completed set grants (Meta and Content). The snapshot rate
and the wire format (Tech, architecture).
