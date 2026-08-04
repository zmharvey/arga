# 02 — Coincidence and Stacking

**Domain:** ui-ux/feedback · **Category:** UI/UX · **Wave:** 5

## Decision

**Two notices may be on screen at once and never three. Neither is replaced, truncated,
queued or extended: both run their own full dwell in their own slot, the earlier one never
moves, and the later one never promotes into the earlier one's slot when it expires.**
`maxConcurrent` is 2, `queue.exists` is false.

## Why

### The concurrency set is closed, so this is an enumeration and not a policy

| pair | can it coincide? | why |
|---|---|---|
| `setComplete` + `areaComplete` | **yes**, 0.6 s apart in that fixed order | `core-loop/02`: on the 4.3% of laps where the final patch is a Find patch, three above-tick payoffs fire on one clear, ordered reveal → set completion → area completion |
| `areaComplete` + `areaComplete` | no | one area completes at a time and `pacing` floors a lap at 75 s |
| `setComplete` + `setComplete` | no | a set completes on the clear that surfaces its last Find; one Find per patch, one set per Find, so two cannot resolve on one clear |
| `findReveal` + anything | no | `findReveal` produces no notice (sheet `01`) |
| either beat + a system notice | **unreachable in play**, permitted by the rule | sheet `03`'s one system member fires at the first snapshot; the earliest area completion is ≥ 75 s later |

**So the maximum live count is 2 by construction, not by policy, and a queue can never
form.** That is the fact the shipped scheduler's structure obscures and the reason this sheet
is separate from `01`.

### Why the other three answers are wrong, each on a stated ground

| answer | why it fails |
|---|---|
| **queue `areaComplete` behind `setComplete`'s dwell** | `response.beats[areaComplete].acknowledgmentBudgetMs` is 400. Holding it for a 3.0 s dwell delivers the acknowledgment 3.0 s after its cause, **7.5× over budget**. Queueing is not a taste question; it breaks a merged key. |
| **truncate the incumbent** | `setComplete` is the largest payoff in the game — weight 50 against area completion's 8 (`core-loop/02`) — and it always arrives first in the coincident order. Truncating it to 0.6 s so the smaller beat can take the slot inverts `theme/tone/03`'s `B2 > B3` ranking in the one channel where I can express it. |
| **extend the incumbent's dwell** | the plate then says `Set Complete` while the area has also finished, which is a false state, and dwell would vary by coincidence — a run-varying string's timing twin, and the thing `T5` exists to prevent. |
| **replace, i.e. one slot** | same rank inversion as truncation, plus it makes 4.3% of laps the only laps on which an area completion is announced differently from the other 95.7%. |

### Why no promotion when slot 1 expires

`setComplete` (3.0 s) and `areaComplete` (2.5 s) at a 0.6 s onset gap expire at t+3.0 and
t+3.1 — 0.1 s apart. Promoting the survivor for 0.1 s would move a plate a player is reading
by one slot height, for one tenth of a second, at the loudest moment in the game.
`firstSession.suppressionForbidden` bans `reflowOnLift` for exactly this reason on the
persistent surface `[brief: soft]` ← `gameplay/onboarding/04`; **I apply the same rule to the
transient surface because it is the same visual defect** and there is nothing to gain.
`[cid: decided]`

### Reconciling with `Beats.luau`'s shipped scheduler — nothing changes, one claim is corrected

The drain enforces `minOnsetGapSeconds` (0.6) *"between consecutive onsets, always"*, sorts by
`response.beats[].rank` lowest first, and releases at most one sequenced onset per frame
`[research: game/src/client/Beats.luau]`. That is exactly the coincident order `core-loop/02`
requires, at exactly the required separation, and **this sheet asks for no change to it.**

The module header asserts *"One onset never begins inside another on the same exclusive
channel"* and offers two reasons: the 0.6 s gap, and `channelExclusivity`. **The second reason
is wrong for `notice`.** `channelExclusivity.notice` is a list of two beats, so it separates
`setComplete` from `areaComplete` from nothing at all — it excludes the other three beats from
the channel, which is a membership rule, not a mutual-exclusion rule. The conclusion survives
on the first reason alone. `[cid: decided]` that this is a finding about a comment, not a
behaviour defect: no code path reads the claim.

**The real gap the comment hides is that the scheduler separates onsets and has no concept of
a dwell at all.** 0.6 s of separation against a 2.5–3.0 s dwell guarantees overlap on every
coincident lap; the shipped module has no field, timer or branch that would notice. So the
dwell timer belongs in the cue body or a notice module and **never in
`Beats.connect`'s `queue`** — a dwell that gated the queue would silently become the
queueing answer this sheet just rejected.

### The post-24/24 state

The rule does not differ, and the state is simply unreachable. `endgame` makes `findReveal`
and `setComplete` extinct permanently, so `areaComplete` is the only notice the game has left,
firing once per post-terminal bay at roughly 157-second intervals, forever. `maxConcurrent`
stays 2 because a system notice can still coexist with it, and because a rule that changes at
a state boundary is a second rule to get wrong.

### Overflow, which cannot happen and is specified anyway

If a re-emitted `response` ever puts a third notice on the channel, the incoming one is
**dropped** and one `warn` is emitted. Dropping the incoming is the only option that cannot
move or shorten something already being read, and a warn is what makes a contract change that
should have been impossible visible instead of silent — the same discipline
`Beats.checkContract` already uses at connect `[research: game/src/client/Beats.luau]`.

```json
{
  "amends": "notices",
  "value": {
    "maxConcurrent": 2,
    "maxConcurrentReason": "the concurrency set is closed at one ordered pair: setComplete then areaComplete, 0.6 s apart, on 4.3% of laps",
    "onCoincidence": "stackNoTruncate",
    "queue": {
      "exists": false,
      "reason": "queueing a notice behind an incumbent's dwell delivers areaComplete 3.0 s after its cause against response.beats[areaComplete].acknowledgmentBudgetMs of 400"
    },
    "dwellMayBeTruncatedBySuccessor": false,
    "dwellMayBeExtendedByCoincidence": false,
    "incumbentMayBeReplaced": false,
    "slots": {
      "count": 2,
      "assignment": "arrivalOrder",
      "growth": "downward",
      "anchorFixed": true,
      "promoteOnExpiry": false,
      "promoteOnExpiryReason": "the two dwells expire 0.1 s apart; promoting would move a plate being read for one tenth of a second, which is firstSession.suppressionForbidden.reflowOnLift applied to the transient surface",
      "emptySlotRendersNothing": true
    },
    "onOverflow": {
      "action": "dropIncoming",
      "warns": true,
      "reachableToday": false,
      "reason": "dropping the incoming is the only action that cannot move or shorten a plate already on screen"
    },
    "coincidentCase": {
      "trigger": "the final patch of an area is the patch burying the last Find of that depth's set",
      "frequencyOfLaps": 0.043,
      "frequencySource": "gameplay/core-loop/02",
      "order": ["findReveal", "setComplete", "areaComplete"],
      "orderSource": "gameplay/core-loop/02, enforced by response.beats[].rank in Beats.luau's comparator",
      "onsetGapSeconds": 0.6,
      "onsetGapSource": "response.minOnsetGapSeconds",
      "noticesProduced": ["setComplete", "areaComplete"],
      "timeline": [
        { "t": 0.0, "event": "findReveal onset - atPatch and audio only, no notice" },
        { "t": 0.6, "event": "setComplete onset - plate enters slot 1" },
        { "t": 1.2, "event": "areaComplete onset - plate enters slot 2; slot 1 does not move" },
        { "t": 3.6, "event": "slot 1 clears at its own 3.0 s dwell" },
        { "t": 3.7, "event": "slot 2 clears at its own 2.5 s dwell; it never occupied slot 1" }
      ],
      "simultaneouslyVisibleSeconds": 2.4,
      "playerMustStopMoving": false,
      "playerMustStopMovingSource": "core-loop/02 - none of the three may require the player to stop moving; response.controlEverAffected is false"
    },
    "dwellTimerOwner": "the cue body or a notice module, never Beats.connect's queue",
    "dwellTimerOwnerReason": "a dwell that gated the drain would silently reinstate the queueing answer this sheet rejects",
    "postCollectionComplete": {
      "membersRemaining": ["areaComplete"],
      "ruleDiffers": false,
      "concurrencyReachable": false,
      "reason": "endgame makes findReveal and setComplete extinct; areaComplete fires once per post-terminal bay at roughly 157 s intervals"
    },
    "schedulerFindings": [
      {
        "id": "N1",
        "file": "game/src/client/Beats.luau",
        "claim": "the header justifies non-overlap partly on channelExclusivity giving notice to setComplete and areaComplete",
        "verdict": "the reasoning is wrong for the notice channel - exclusivity to a pair of beats separates them from nothing; it is a membership rule. The conclusion holds on minOnsetGapSeconds alone.",
        "behaviourChange": "none - no code path reads the claim",
        "class": "comment defect"
      },
      {
        "id": "N2",
        "file": "game/src/client/Beats.luau",
        "claim": "the scheduler separates onsets and carries no concept of a dwell",
        "verdict": "correct, and it is why this sheet exists: 0.6 s of separation against a 2.5-3.0 s dwell guarantees overlap on every coincident lap",
        "behaviourChange": "the dwell timer is added in the cue seam, not in the drain",
        "class": "gap, now closed by this key"
      }
    ]
  }
}
```

## Consequences for other work

- **Persistent-surface composition (`composition`, ui-ux/hud sheet `01`)** must carry
  `noticeStack` as a **two-slot** anchor, not a single point, and the reserved extent is the
  same whether zero, one or two slots are live — an empty slot renders nothing and reserves
  its space. This is the same S12-style reservation `firstSession` requires of the upgrade
  cluster, applied to a group whose members are transient, and `ui-ux/hud` sheet `02` is
  already ruling on the reserve-versus-collapse contradiction for its own cluster. **Whatever
  it rules there, this anchor reserves**, because there is no lift to latch and nothing to
  regenerate.
- **Set-completion and area-completion cue work (Audio)** inherits the same 2.4 s of genuine
  overlap on 4.3% of laps: two cues in the audio channel and two plates in the notice channel
  are live together, and `response`'s 0.6 s onset gap is all that separates them. A `B2` cue
  longer than 3.0 s outlives its plate; a `B3` cue longer than 2.5 s outlives its plate. Both
  are revision requests against sheet `01`'s dwell figures, which are `[playtest unknown]`
  and have room to 5.0 s.
- **Balance & Tuning** owns `minOnsetGapSeconds` inside `core-loop/02`'s 0.35–0.9 s range.
  Every figure above is derived against 0.6. **At 0.35 the overlap grows to 2.65 s and at 0.9
  it falls to 2.1 s — the ruling is unaffected at either end**, so this is a note and not a
  dependency. What would affect it is a dwell change, which is mine.
- **Whoever rewrites or regenerates `Beats.luau`** inherits two findings, `N1` and `N2` in the
  block above, and one instruction: the drain is correct and stays. Add the dwell timer in the
  cue seam. Do not add a dwell test to `RunService.Heartbeat`'s drain condition.
- **Analytics — Engagement** may instrument the coincident lap if it wants a real frequency:
  `core-loop/02`'s 4.3% is derived, not observed, and `cid/_playtest.md` records that nothing
  past area 1 has ever been seen. Not a requirement, an offer.

## Acceptance criteria

1. `notices.maxConcurrent` is 2, `notices.queue.exists` is false,
   `dwellMayBeTruncatedBySuccessor` is false, `dwellMayBeExtendedByCoincidence` is false and
   `slots.promoteOnExpiry` is false.
2. In a run of the coincident case, the two plates are simultaneously visible for
   **2.4 s ± 0.1 s**, the slot-1 plate's `AbsolutePosition` is unchanged across its entire
   dwell, and the slot-2 plate's `AbsolutePosition` never equals slot 1's.
3. `game/src/client/Beats.luau`'s `RunService.Heartbeat` drain condition reads
   `minOnsetGapSeconds` and nothing else — zero references to `dwellSeconds`, a dwell timer,
   or a notice's live state inside `Beats.connect`.
4. A forced third concurrent notice produces exactly one `warn` and zero third plates.

## Not decided here

- **Which beats produce a notice, what each says, its dwell figure and the closed `forbidden`
  list** — sheet `01`, this domain, which holds the `notices` key.
- **Whether any non-beat message exists** — sheet `03`, this domain. This sheet's rules apply
  to a `system` member unchanged; whether one exists is `03`'s.
- **`minOnsetGapSeconds`' final value inside 0.35–0.9 s** — Balance & Tuning.
- **The `noticeStack` anchor's coordinates, and the pixel height of a slot** — `composition`
  (ui-ux/hud), then `viewport` (ui-ux/platform) for the scaling rule.
- **How long either completion cue sounds** — Audio. I state the ceiling its length must clear
  and set none of it.
- **Whether the coincident lap's 4.3% figure is right** — `gameplay/core-loop/02` derived it;
  nobody has observed it.
