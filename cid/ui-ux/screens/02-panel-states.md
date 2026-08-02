# 02 — The five states of the collection surface, and the one system string

**Domain:** ui-ux/screens · **Category:** UI/UX · **Wave:** 5

## Decision

**No state of the `index` surface carries a player-facing string.** Two of the five are
unreachable by construction and are declared so rather than designed for; the other three
are silent, keep whatever is already drawn, and never unwrite a slot. Separately, **exactly
one system string exists in this game**, `screens.systemCopy.saveLoadFailed`, shown at most
once per session on the notice channel and nowhere on this panel.

## Why

**An empty state and a loading state are what the category's verification asks of every
screen, and this screen genuinely has neither.** The panel is available only from a snapshot
holding at least one true entry in `found` (`firstSession.withheld.collectionPanel`,
`latchSource` as corrected 2026-08-01 to *"at least one entry is true"*), so open-with-nothing
and open-before-a-snapshot cannot both be reached through the one path that opens it. Saying
that is information; inventing an empty-state illustration to fill the section is not, and
`onboarding/03` `T5` forbids a first-run-only string outright.

| # | state | reachable | what renders | string | how it is caught |
|---|---|---|---|---|---|
| `S1` | absent, before the first Find | **yes** | nothing. `Visible` false, built and hidden | none | `toggle()` returns before touching `Visible`, movement or any cue |
| `S2` | open with zero slots filled | **no** | if reached: 4 headings, 24 empty slots, nothing else | none | one `warn` naming `S2`; the state is a build defect, not a player state |
| `S3` | open before the first snapshot | **no** | as `S2` | none | as `S2`. The reachable neighbour is `S3b` |
| `S3b` | pressed before `bind()` has run | **yes** | nothing | none | `wiring.onClientBoot` connects `input` at step 4 and binds this surface at step 5; one `warn`, no cue |
| `S4` | a snapshot arrives with no `found`, or `found` is not a table | **yes** | exactly what was already drawn | none | the count of `Name.Text` transitions from non-empty to empty is 0 over any session |
| `S5` | `UIBuilder.build` threw, or a slot node did not resolve | **yes** | build failure: no surface at all, presses do nothing. Slot failure: that one slot stays empty forever, the other 23 are unaffected | none | one `warn` per cause, once; the client entry point survives both |

**`S1` is silent and that is a ruling, not an omission.**
`input.pressable.rejectionCueOnFailedPrecondition` is `"none"`,
`firstSession.suppressionForbidden` bans an explanatory tooltip, and `tone/04` `D12` removes
every standard way of signalling *you cannot do that*. So a press on a surface not yet earned
produces no panel, no sound, no shake, no flash and no movement suspension. The shipped
behaviour is ratified `[research: game/src/client/IndexScreen.luau]`.

**`S4` is the one that would be got wrong by default.** The obvious implementation blanks the
labels it cannot confirm. `discovery.record`'s `found` field is cleared by *"nothing, ever"*,
and blanking a slot because one snapshot was malformed is exactly the re-suppression
`firstSession.suppressionForbidden` bans. **Once written, never unwritten**, including across
a respawn, a rebind attempt and a malformed payload `[cid: decided]`.

**`S5` chooses the surface over the client, deliberately.** A build throw is caught, the
surface does not exist, and the HUD and the purchase path keep working. That is the right
trade because this surface is the least costly of the four client bindings to lose, and it is
the shipped behaviour `[research: game/src/client/IndexScreen.luau]`. A `warn` is not a
player-facing string and is not governed by `vocabulary`.

**The system copy nobody owned.** `theme/tone/01` records error and system copy as
*"unowned; nearest holder is UI/UX ... somebody must own the surface or `P1`-`P9` reaches it
only as prose"*. `02-GAMEPLAY.md` has no failure state `[brief: soft]`, so it never
contemplated a failure *message*, but a DataStore load failure is real and shipped. I own the
copy. The surface is Feedback UI's.

> **`saveLoadFailed`:** `Earlier progress did not load. New progress may not be kept.`

Two sentences, 5 and 6 words, no first or second person, no imperative, no mood word, no
exclamation mark, no question mark, no colon, no em dash, no middot, inside
`vocabulary.allowedPattern` and clear of all eight banned words. It states a fact and asks for
nothing, which is what `theme/tone/01` `P1`-`P9` requires and what keeps it clear of
*"do not invent tension to fill the gap"* `[brief: binding]` (`HANDOFF.md`, six-things #4). A
save failure is a system event, not a game failure state, so `D6`'s ban on alert states binds
its presentation and not its existence.

**One string, once, and no second.** Every other failure in this game is silent: a failed
build, an unresolved slot, a malformed snapshot, a write failure mid-session. A message that
can appear while the player is clearing is a recurring interruption in a game whose whole
premise is that nothing goes wrong. So the rule is: **shown at join or not at all, at most
once per session, never re-shown, never on the `index` panel.** `[cid: decided]`

**Its route into the register does not exist yet, and the coinage intake has no shape for
it.** `theme/vocabulary/04`'s block coins one *word* matching the label regex; this is a
59-character prose string. It needs a contract path, which `screens.systemCopy.saveLoadFailed`
supplies, and it needs `PROSE_PATHS` in `bridge/schema.mjs` to gain `/^screens\.systemCopy\./`
or the 14-character label ceiling fails it `[research: bridge/schema.mjs]`. Stated as a
requirement on seam work, not assumed.

```json
{
  "amends": "screens",
  "value": {
    "screens": [
      {
        "id": "index",
        "statesCarryNoString": true,
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
      "entryCount": 1,
      "saveLoadFailed": {
        "text": "Earlier progress did not load. New progress may not be kept.",
        "sentences": 2,
        "wordsPerSentence": [5, 6],
        "chars": 59,
        "trigger": "persistence load failed for this player at join",
        "shownAt": "join, within 10 seconds",
        "maxPerSession": 1,
        "reShown": false,
        "channel": "notice",
        "surfaceOwner": "ui-ux/feedback (notices)",
        "blocking": false,
        "focusable": false,
        "dismissibleOnly": false,
        "carriedByIndexPanel": false,
        "prosePath": true,
        "requiresSeamChange": "bridge/schema.mjs PROSE_PATHS must gain /^screens\\.systemCopy\\./ or the 14-character label ceiling fails it"
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
}
```

## Consequences for other work

- **Feedback UI (`notices`)** inherits one string it did not write and a decision it must
  ratify or refuse: the notice channel carries one non-beat event, at join, once. `response`
  says that channel is *"owned by the two completions"*, so this is a widening and it is
  yours to accept or decline. **If you decline, the string ships unused and the game is
  silent on save failure.** That is a legitimate outcome and I have written the string so the
  refusal costs one line rather than a redesign.
- **Persistence and architecture work** inherits the trigger, not the behaviour: something has
  to distinguish *"loaded, empty"* from *"failed to load"* and expose it to the client at join.
  Today nothing does. If that distinction is not made, this string can never fire correctly and
  the honest fix is to delete it rather than fire it on every new player.
- **Contract and seam work** inherits one `PROSE_PATHS` entry. Without it the merge fails this
  string on `maxLabelChars` the day `screens` is promoted.
- **HUD (`composition`)** is unaffected: no state of the index panel writes, hides or reflows
  anything on the persistent surface, and the collection count keeps its own states.
- **Analytics (Funnels)** gets two countable events worth instrumenting and no more: how often
  `S5` fires, and how often `saveLoadFailed` fires. Both are defects rather than behaviour, so
  a non-zero rate is a bug report.

## Flagged to the developer

The brief has no failure state, so it never said what the game should do when a save does not
load. I decided that it says one sentence pair, once, at join. **Live alternatives:** say
nothing at all and let the player discover the loss (defensible, and the smallest answer);
say the same thing but block play until the player rejoins (rejected, because
`response.controlEverAffected` is false and nothing may take control); or retry silently and
say nothing unless the retry also fails (best if persistence work will build the retry, and it
does not change the string). **Recommendation: keep the string, one firing, non-blocking.**

## Acceptance criteria

1. `screens[index].states` has 6 entries, 2 marked `reachable: false` with a stated reason,
   and the `string` field of every entry is `null`.
2. Over a session of any length, the number of transitions of any `Slot_*/Name.Text` from a
   non-empty value to the empty string is 0, including across a respawn, a second `bind()`
   call and a snapshot that carries no `found` field.
3. `screens.systemCopy` holds exactly 1 string; it is at most 2 sentences of at most 12 words
   each, matches `vocabulary.allowedPattern`, contains none of the 8 banned words, and
   contains no `!`, `?`, `:`, em dash or middot.
4. On a save with zero Finds held, `IndexSurface.Visible` is `false` at join and stays `false`
   across any number of `toggle()` calls, and those calls create no `Instance`, play no sound
   and change no `Humanoid` property.

## Not decided here

The screen inventory, the element tree and the producibility finding (sheet 01, which holds
this key). Rendered case, minimum text size, wrap behaviour and the copy budget the system
string is measured against (sheet 03). Whether a flavour line exists and what an empty
`FlavourLine` renders as (sheet 04). Whether the notice channel accepts a non-beat event, what
a notice structurally is, its dwell and its queueing (Feedback UI). Whether persistence can
distinguish a failed load from an empty one, and whether it retries (architecture and
persistence work). Whether `bridge/schema.mjs` gains the `PROSE_PATHS` entry (contract and
seam work). What the `warn` text says: it is not player-facing and `vocabulary` does not
govern it (build work).
