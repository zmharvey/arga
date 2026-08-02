# 02 — The states of the collection surface

**Domain:** ui-ux/screens · **Category:** UI/UX · **Wave:** 5 · **Revision round 1**

## Decision

**No state of the `index` surface carries a player-facing string.** Two of the six are
unreachable by construction and are declared so rather than designed for; the other four are
silent, keep whatever is already drawn, and never unwrite a slot. **`screens` holds no system
copy**: the save-failure message is `notices.members[saveNotLoaded]` and belongs to Feedback UI.

## Why

**An empty state and a loading state are what the category's verification asks of every screen,
and this screen genuinely has neither.** The panel is available only from a snapshot holding at
least one true entry in `found` (`firstSession.withheld.collectionPanel`, `latchSource` as
corrected 2026-08-01 to *"at least one entry is true"*), so open-with-nothing and
open-before-a-snapshot cannot be reached through the one path that opens it. Saying that is
information; inventing an empty-state illustration to fill the section is not, and
`onboarding/03` `T5` forbids a first-run-only string outright.

| # | state | reachable | what renders | string | how it is caught |
|---|---|---|---|---|---|
| `S1` | absent, before the first Find | **yes** | nothing. `Visible` false, built and hidden | none | `toggle()` returns before touching `Visible`, movement or any cue |
| `S2` | open with zero slots filled | **no** | if reached: 4 headings, 24 empty slots, nothing else | none | one `warn` naming `S2`; a build defect, not a player state |
| `S3` | open before the first snapshot | **no** | as `S2` | none | as `S2`. The reachable neighbour is `S3b` |
| `S3b` | pressed before `bind()` has run | **yes** | nothing | none | `wiring.onClientBoot` connects `input` at step 4 and binds this surface at step 5; one `warn`, no cue |
| `S4` | a snapshot arrives with no `found`, or `found` is not a table | **yes** | exactly what was already drawn | none | the count of `Name.Text` transitions from non-empty to empty is 0 over any session |
| `S5` | `UIBuilder.build` threw, or a slot node did not resolve | **yes** | build failure: no surface at all, presses do nothing. Slot failure: that one slot stays empty forever, the other 23 unaffected | none | one `warn` per cause, once; the client entry point survives both |

**`S1` is silent and that is a ruling, not an omission.**
`input.pressable.rejectionCueOnFailedPrecondition` is `"none"`,
`firstSession.suppressionForbidden` bans an explanatory tooltip, and `tone/04` `D12` removes
every standard way of signalling *you cannot do that*. So a press on a surface not yet earned
produces no panel, no sound, no shake, no flash and no movement suspension. The shipped
behaviour is ratified `[research: game/src/client/IndexScreen.luau]`.

**`S4` is the one that would be got wrong by default.** The obvious implementation blanks the
labels it cannot confirm. `discovery.record`'s `found` field is cleared by *"nothing, ever"*,
and blanking a slot because one snapshot was malformed is exactly the re-suppression
`firstSession.suppressionForbidden` bans. **Once written, never unwritten**, including across a
respawn, a rebind attempt and a malformed payload `[cid: decided]`.

**`S5` chooses the surface over the client, deliberately.** A build throw is caught, the surface
does not exist, and the HUD and the purchase path keep working. That is the right trade because
this surface is the least costly of the four client bindings to lose, and it is the shipped
behaviour `[research: game/src/client/IndexScreen.luau]`. A `warn` is not a player-facing string
and `vocabulary` does not govern it.

**The system copy moved out of this key, and Feedback's argument was the better one.** My first
draft carried `screens.systemCopy.saveLoadFailed`; `feedback/03` independently wrote
`notices.members[saveNotLoaded].text` for the same trigger, the same channel and the same dwell
semantics. **Two strings for one event means the build renders whichever key merges last**, so
one had to go, and the surface argument settles which: a load-failure message is a transient
notice drawn over live play, not a screen. Feedback's string is also Title Case against
`vocabulary.casing: "title"`, where mine was sentence case. **This key now holds zero strings of
its own, in every state, on every surface** `[brief: soft]` ← `theme/tone/01`'s routing of error
copy, which this reverses with its own author's consent.

**What travels with it, so nothing is dropped in the handover:** the `PROSE_PATHS` request in
`bridge/schema.mjs` is now Feedback's and applies to `notices.members[].text`, not to a
`screens` prefix; the trigger requirement stands unchanged and unowned, that persistence must
be able to distinguish *loaded, empty* from *failed to load* and expose it at join, which
nothing does today; and the ruling that **every other failure in this game is silent** stays
here, because those failures are states of this surface.

```json
{
  "amends": "screens",
  "value": {
    "screens": [
      {
        "id": "index",
        "statesCarryNoString": true,
        "ownStringCountInEveryState": 0,
        "states": [
          { "id": "S1", "name": "absentBeforeFirstFind", "reachable": true, "renders": "nothing; Visible false", "string": null, "cue": "none", "movementSuspended": false, "citation": "firstSession.withheld.collectionPanel; input.pressable.rejectionCueOnFailedPrecondition none" },
          { "id": "S2", "name": "openWithZeroFilled", "reachable": false, "unreachableBecause": "the panel latches on a snapshot holding at least one true entry in found", "renders": "4 headings and 24 empty slots", "string": null, "cue": "none", "onReach": "warn once, naming S2" },
          { "id": "S3", "name": "openBeforeFirstSnapshot", "reachable": false, "unreachableBecause": "availability is derived from a snapshot; no snapshot means not available", "renders": "as S2", "string": null, "cue": "none", "onReach": "warn once, naming S3" },
          { "id": "S3b", "name": "pressedBeforeBind", "reachable": true, "renders": "nothing", "string": null, "cue": "none", "onReach": "warn once", "citation": "wiring.onClientBoot connects input at step 4 and binds this surface at step 5" },
          { "id": "S4", "name": "snapshotWithoutFound", "reachable": true, "renders": "exactly what was already drawn", "string": null, "cue": "none", "rule": "a slot written once is never unwritten, ever, by any cause", "citation": "discovery.record.found clearedBy nothing ever; firstSession.suppressionForbidden reSuppression" },
          { "id": "S5", "name": "buildOrSlotFailure", "reachable": true, "renders": "build failure: no surface, presses do nothing. Slot failure: that slot stays empty, the other 23 unaffected", "string": null, "cue": "none", "onReach": "warn once per cause", "rule": "the client entry point survives both" }
        ]
      }
    ],
    "systemCopy": {
      "heldByThisKey": false,
      "withdrawn": "screens.systemCopy.saveLoadFailed, revision round 1, RR-10",
      "heldInsteadAt": "notices.members[saveNotLoaded]",
      "ownedBy": "ui-ux/feedback",
      "because": "a load-failure message is a transient notice drawn over live play, not a screen; two strings for one event render whichever key merges last",
      "requirementsThatTravelWithIt": [
        "the PROSE_PATHS entry in bridge/schema.mjs applies to notices.members[].text, not to a screens prefix",
        "persistence must distinguish loaded-but-empty from failed-to-load and expose it at join; nothing does today, and without it the string can never fire correctly"
      ]
    },
    "everyOtherFailureIsSilent": [
      "index surface build threw",
      "a slot node did not resolve",
      "a snapshot arrived without found",
      "a mid-session persistence write failed",
      "a press arrived before bind"
    ]
  }
}
```

## Consequences for other work

- **Feedback UI (`notices`)** owns the save-failure string outright, surface and copy. It also
  inherits the two requirements above, one of which is a blocker it did not raise: nothing in
  the build can currently tell a failed load from an empty one, so as things stand the string
  either never fires or fires for every new player.
- **Persistence and architecture work** inherits that same distinction as the thing to build. If
  it is not built, the honest fix is to delete the string rather than fire it wrongly.
- **Contract and seam work** loses one of the three `PROSE_PATHS`-shaped requests this wave
  filed: mine is withdrawn, Feedback's stands.
- **HUD (`composition`)** is unaffected: no state of the index panel writes, hides or reflows
  anything on the persistent surface, and the collection count keeps its own states.
- **Analytics (Funnels)** gets one countable event worth instrumenting from this sheet: how
  often `S5` fires. It is a defect rather than behaviour, so a non-zero rate is a bug report.

## Acceptance criteria

1. `screens[index].states` has 6 entries, 2 marked `reachable: false` with a stated reason, and
   the `string` field of every entry is `null`.
2. Over a session of any length, the number of transitions of any `Slot_*/Name.Text` from a
   non-empty value to the empty string is 0, including across a respawn, a second `bind()` call
   and a snapshot that carries no `found` field.
3. The merged manifest holds exactly 1 save-failure string, at `notices.members[saveNotLoaded]`,
   and `screens` holds 0 player-facing strings at any path.
4. On a save with zero Finds held, `IndexSurface.Visible` is `false` at join and stays `false`
   across any number of `toggle()` calls, and those calls create no `Instance`, play no sound
   and change no `Humanoid` property.

## Not decided here

The screen inventory, the element tree, the panel extent and the producibility finding (sheet
01, which holds this key). Rendered case, minimum text size, wrap behaviour and the copy budget
(sheet 03). Whether a flavour line exists and what an empty `FlavourLine` renders as (sheet 04).
**The save-failure string, its surface, its dwell and its `PROSE_PATHS` entry (Feedback UI,
`notices.members[saveNotLoaded]`, which supersedes this sheet's first draft.)** Whether
persistence can distinguish a failed load from an empty one, and whether it retries
(architecture and persistence work). What the `warn` text says: it is not player-facing and
`vocabulary` does not govern it (build work).
