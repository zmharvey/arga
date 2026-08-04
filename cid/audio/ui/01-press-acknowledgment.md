# 01 — Press Acknowledgment

**Domain:** audio/ui · **Category:** Audio · **Wave:** 6

## Decision

**No press-edge cue exists on any of the three purchase controls. A purchase makes exactly one
sound, and it is `B4` `upgradePurchased` played from the server-decided beat at
`Beats.cueUpgradePurchased` inside `response`'s 200 ms budget — one onset per applied purchase,
never a client prediction of it.** A cue may fire on a control's press edge **only** where
`verb.adjudicatedBy == "client"` and `verb.precondition == "none"`, which is true of `openIndex`
and false of `buy`; sheet `02` spends that permission and nothing may widen it by analogy. A
non-beat interface cue class **is admissible** (U1, ruled permissive, `## Pushing back` below).
This sheet proposes `uiSound` whole.

## Why

**The pair nobody had noticed.** `input` acceptance criterion 4 reads *"Activating a purchase
control with a balance below the price, or at max level, changes no state and **emits nothing on
any channel**"* `[research: cid/gameplay/mechanics/02-verb-roster.md]`, unqualified. The only
press event that fires on all three device classes is `GuiButton.Activated` — *"a left click
press-and-release … on desktop, touch release … on mobile, or A/cross … on console"*
`[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/reference/engine/classes/GuiButton.yaml]`
— and it fires **before** adjudication, because `response.beats[upgradePurchased].decidedBy` is
`"server"`. A press-edge cue on a purchase control therefore fires on the failure. That is not a
tuning problem; it is criterion 4 failing. Press and release also cannot be two cues without a
mouse-only binding, since `MouseButton1Down`/`Up` are mouse-only in the same source.

**The only escape is a prediction, and I decline it.** A client can gate the cue on the predicate
`composition`'s `ReadoutState` already derives to print `Ready` / `Short` / `Max`
`[research: cid/ui-ux/hud/01-persistent-surface-composition.md]`. That satisfies criterion 4
literally and introduces a worse defect: `response` marks exactly one beat predicted (`patchClear`,
`clientPredictedServerAuthoritative`) and four `"server"`, so the distinction is a deliberate field
in a merged key, and making `upgradePurchased` a second predicted beat is a change to `response`
rather than to `uiSound`. On a mispredict — a stale snapshot, or a second press inside the 0.35 s
debounce window — the cue confirms a purchase that did not happen, and `theme/tone/03` defines
`B4` as *"a confirmation, not a celebration"*. A confirmation that confirms nothing is worse than
a slower one `[cid: decided]`.

**Two onsets for one confirmation fails on its own.** A press cue plus `B4` puts two onsets inside
200 ms on the game's only currency sink, both mine, with nothing separating them:
`response.minOnsetGapSeconds` 0.6 governs sequenced **beats** and a press cue is not one. That is
a self-inflicted concurrency case handed to `mix`, against *"the smallest game that still gives
every creative area real work"* `[brief: binding]` ← `[you chose: R1 Q3]` (`00-CORE.md`).

**What it costs.** The acknowledgment arrives at 200 ms rather than 0 ms. That figure is
`response`'s own budget for this beat, so paying it is compliant by construction rather than a
compromise.

**`onsetsPerPurchase: 1` is an invariant.** `cid/_state.md` build note 1 records that
`server-main` fires `UpgradeApplied` while a dispatch instruction named `progression`; unresolved
it is *"either a double-fire (the `upgradePurchased` cue plays twice) or silence"*. Carried below
as a value a later sheet cannot widen, with the requirement stated as `RQ1`.

**Audible length is derived, not chosen.** `input.pressable.debounceSeconds` 0.35 is the fastest
legal repeat, so `audibleSeconds <= 0.35` is the condition under which this cue never overlaps its
own next onset. `response.onOverload: "overlap"` makes overlap legal; three deep at 2.9
activations a second is machine-gunning, which is the failure the lead asked be prevented.

**The asset form is `mix`'s, mirrored here.** `Sound.SoundId` is a **ContentId** string
`[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/reference/engine/classes/Sound.yaml]`,
so `release.provisioning.unprovisionedIdValue`'s `0` does not transfer by type. The guard sits at
the **play site**, not at the id, because an id that will not load errors in the console rather
than failing silently
`[research: https://devforum.roblox.com/t/failed-to-load-soundid-error-spam-extreme-log-file-sizes/2225682]`.
Uploaded audio is private and needs a per-experience grant, and the Creator Store carries
free-to-use audio `[research: https://create.roblox.com/docs/sound/assets]` — which is why each row
carries a `sourceClass` that makes the upload orderable work rather than a redesign.

**No `Sound` exists in the build and no key may create one.** A grep of `game/src` returns zero
`Sound`, `SoundGroup` and `SoundService` occurrences `[research: game/src]`; `Beats.luau` holds
only a `ScreenGui` and its five cue bodies are empty `[research: game/src/client/Beats.luau]`.
Stated as `RQ2` against instance-representation work, not designed here (U4/G5).

**Muted play, honestly.** `B4` carries `readout` as well as `audio`, so `audioOnlyBeats: 0`
survives on `response`'s own channel arrays and needs no motive from me. The category's *"a large
share of sessions run muted"* premise is **unsourced**; the one survey available reports 34.9%
always / 23.6% often / 19% sometimes / **9.3% never** playing with sound, n=541, general mobile,
neither Roblox-specific nor 8–14
`[research: https://www.international-sound-directory.com/2025/12/07/do-people-really-play-mobile-games-without-sound-myth-or-reality/]`.
The invariant holds on the channel arrays; the motive is not restated as fact.

**What the readout carries with sound off.** `composition` changes `Lv N` → `Lv N+1`, re-derives
`{cost}` to `Ready` / `Short` / `Max`, and drops currency, all in one node on one event. So `B4`
is **not** audio-only today. **Nothing in either contract states whether three simultaneous value
changes in one 14-character node read as an acknowledgment to an eight-year-old on a phone inside
200 ms.** That is U6, it is a finding routed to persistent-readout work, and I neither decide it
nor treat it as closed.

## Pushing back

**`gameplay/onboarding/04-run-one-withholds` `S7`.** Its check column reads *"zero; every cue maps
to one of the five named beats"* and its consequence line says the five beats own every cue in the
game — but its **manifest scope is `liftSound` only** (`suppressionForbidden`), so the strong
reading lives in its prose and not in its data. I rule the narrow reading: `S7` forbids a **lift**
cue, which sheet `03` carries as three separate rows and does not weaken by one row. Precedent for
a non-beat class in an approved key: `notices.classes.system`, with `systemNoticesAreBeats: false`
`[research: cid/ui-ux/feedback/03-system-notices.md]`. Under the strong reading the index open and
close edges have no owner in either contract and the game's only mode change is silent by omission
rather than by ruling.

## Flagged to the developer

Every ruling here is `[cid: decided]` against a brief that recorded audio intent at **0 questions**
(`OPEN.md §1`, gap `G8`). The live alternative is a client-predicted press cue gated on
`ReadoutState == "Ready"`: it buys ~200 ms of perceived responsiveness and costs a false
confirmation on every mispredict plus a change to `response.beats[upgradePurchased].decidedBy`.
**Recommendation: as ruled.** Reversing it is a revision against `gameplay/mechanics/05`.

```manifest
{
  "provides": "uiSound",
  "status": "proposed",
  "value": {
    "scope": "every sound the interface makes, every interface moment deliberately silent, and the ruling behind each. Excludes the three payoff stingers (audio/stingers), in-world sound (audio/sfx), beds (audio/ambient), tracks (audio/music) and every level, bus, roll-off and cap (audio/mix).",
    "nonBeatCueClass": {
      "admissible": true,
      "ruling": "gameplay/onboarding/04 S7's manifest scope is liftSound only; notices.classes.system is an approved non-beat class precedent",
      "seeAlso": "01 ## Pushing back",
      "sixthBeatAdded": false,
      "responseUnchanged": true
    },
    "pressEdgeRule": {
      "activationEvent": "GuiButton.Activated",
      "activationEventReason": "the only press event firing on desktop, touch and console; MouseButton1Down/Up are mouse-only",
      "pressAndReleaseAreOneCue": true,
      "cueMayFireOnPressEdgeWhen": "verb.adjudicatedBy == 'client' && verb.precondition == 'none'",
      "purchaseControlsHavePressEdgeCue": false,
      "purchaseControlsFailingVerb": "buy",
      "purchaseControlsFailingReason": "adjudicatedBy server with precondition 'balance >= cost && level < maxLevel'; a press-edge cue fires before adjudication and therefore on failure, breaking input acceptance criterion 4",
      "clientPredictionOfServerDecidedBeat": false,
      "predictedBeatsInResponse": ["patchClear"],
      "widenableBy": "a revision against gameplay/mechanics/05 changing response.beats[upgradePurchased].decidedBy; never by an audio sheet"
    },
    "onsetsPerPurchase": 1,
    "onsetsPerPurchaseGrounds": "cid/_state.md build note 1 - unresolved, UpgradeApplied is either a double-fire or silence",
    "loudnessOrder": {
      "rule": "every non-beat uiSound cue is strictly quieter than B4, the quietest beat carrying an audio channel",
      "expressedAs": "an ordering, not a level",
      "levelsOwnedBy": "audio/mix",
      "inheritedRanking": "theme/tone/03 B1 > B2 > B3 > B4 > B5, no ties, nothing rising with depth"
    },
    "asset": {
      "idField": "Sound.SoundId",
      "idType": "ContentId (string)",
      "sentinel": "",
      "sentinelOwner": "audio/mix/03-the-asset-ledger",
      "sentinelMirroredNotDecided": true,
      "zeroDoesNotTransfer": "release.provisioning.unprovisionedIdValue is 0, a number; SoundId is a string",
      "guardSite": "the play site, not the id assignment",
      "guardRule": "no cue calls Play() unless its SoundId is a non-empty string",
      "guardReason": "an id that will not load errors in the console rather than failing silently",
      "unprovisionedBuildMust": ["boot", "play nothing", "write no warn or error"],
      "preloadRequirement": "all uiSound assets belong in whatever preload set mix declares, because a purchase and an index open are both reachable inside minute 1 per firstSession",
      "preloadOwner": "audio/mix/03-the-asset-ledger",
      "creatorOfSoundInstances": "unowned in both contracts; requirement stated to instance-representation work, architect sheet 06"
    },
    "cues": [
      {
        "id": "upgradePurchased",
        "beat": "upgradePurchased",
        "isBeat": true,
        "cause": "UpgradeApplied received on the client for a purchase the server applied",
        "playSite": "game/src/client/Beats.luau cueUpgradePurchased",
        "channelsOfBeat": ["readout", "audio"],
        "acknowledgmentBudgetMs": 200,
        "budgetOwner": "response; cited, not set here",
        "audibleSeconds": 0.3,
        "audibleTestRangeSeconds": [0.15, 0.35],
        "audiblePlaytestUnknown": true,
        "audibleCeilingRule": "audibleSeconds <= input.pressable.debounceSeconds (0.35), so the cue never overlaps its own next onset at the fastest legal repeat",
        "variesBy": "nothing",
        "variesByForbidden": ["upgrade axis", "level", "cost", "whether it is the first or last purchase", "depth", "product ownership"],
        "variesByRuling": "theme/tone/03 - a confirmation, not a celebration. Identical at every level and on every axis",
        "assetCount": 1,
        "soundId": "",
        "sourceClass": "creatorStore",
        "channels": 1,
        "spatialisation": "2D",
        "spatialisationReason": "an interface cue has no world position; a Sound under SoundService is heard identically regardless of listener position",
        "appliesEffect": false,
        "appliesEffectReason": "response.beats[upgradePurchased].effectAppliedBeforeAcknowledgment is true - this acknowledges and never applies"
      }
    ],
    "requirements": [
      { "id": "RQ1", "to": "purchase-wiring work (architect, build stage)", "what": "exactly one UpgradeApplied per applied purchase, from one site, in the fixed order UpgradeApplied then StateChanged", "because": "onsetsPerPurchase is 1 and cid/_state.md build note 1 leaves it at either two or zero" },
      { "id": "RQ2", "to": "instance-representation work (architect sheet 06)", "what": "name a module permitted to create a Sound and a SoundGroup; game/src contains zero of either today", "because": "no key in either contract names a creator, and every cue in this key needs one" },
      { "id": "RQ3", "to": "audio/mix", "what": "B4 and every non-beat uiSound cue need bus assignment, level and a concurrency ruling for two onsets landing inside 200 ms of one another", "because": "this key sets an ordering and no level, no bucket and no cap" },
      { "id": "RQ4", "to": "gameplay/mechanics/05 (response)", "what": "note that this key defines a non-beat acknowledgment budget for cues response does not describe; no sixth beat is proposed and no existing budget is moved", "because": "U2 - response sets five budgets and defines no non-beat cause" }
    ],
    "openFindings": [
      { "id": "U6", "what": "whether composition's three simultaneous readout changes (Lv N to Lv N+1, {cost} to Ready/Short/Max, currency falling) read as an acknowledgment to an eight-year-old on a phone inside 200 ms", "status": "open", "routedTo": "persistent-readout work, composition, ui-ux/hud", "notDecidedHere": true, "notClosed": true },
      { "id": "L1", "what": "first-play latency for a preloaded versus non-preloaded Sound on the 3 GB floor device against the 200 ms budget", "status": "unmeasured", "settledBy": "a device or Studio measurement; joins the unowned listening-test list tech/performance/01 records" }
    ]
  }
}
```

## Consequences for other work

- **Purchase-wiring work (architect, build stage)** inherits `RQ1` as a hard invariant: one
  `UpgradeApplied` per applied purchase. At two, `B4` plays twice on every purchase; at zero, the
  200 ms budget has nothing to measure and the only currency sink in the game is silent.
- **Instance-representation work (`representation`, architect sheet `06`)** gets `RQ2` — the same
  finding `notices` raised for the notice plate, one class wider. Today no module may create a
  `Sound`, so **no cue in this category is buildable**, not only mine.
- **Mix work (`mix`)** gets `RQ3` and the ordering: one beat cue at 0.3 s and two non-beat cues
  from sheet `02`, all 2D, all below `B4`. I set no volume, bus, roll-off or cap, and the sentinel
  and preload set are its rulings mirrored rather than competed with.
- **Persistent-readout work (`composition`, ui-ux/hud)** gets U6 as a live finding: `B4`'s
  non-audio channel is three value changes in one node and no key says whether that reads as an
  acknowledgment. If it does not, the fix is the readout, because a louder sound reaches nobody
  playing muted.
- **Purchase-control work (`pressables`)** may not connect a `Sound` to any `Activated` handler on
  `Pressable_BUY1/2/3`. The debounce it already owns bounds repeat; no audio behaviour rides on it.
- **Stingers work** is unaffected: `B4` is routed here by the category, `B1`–`B3` stay whole, and
  nothing here occupies the `notice` or `atPatch` channel.
- **Onboarding work (`firstSession`)** should read the `## Pushing back` above: `S7` stands on
  lifts and its prose claim that the five beats own every cue in the game is narrowed.

## Acceptance criteria

1. `uiSound.cues[]` contains zero rows whose `playSite` names `Pressable_BUY1`, `Pressable_BUY2`
   or `Pressable_BUY3`, and `uiSound.pressEdgeRule.purchaseControlsHavePressEdgeCue` is `false`.
2. `uiSound.onsetsPerPurchase` is `1`, and `game/src/client/` contains exactly one call site that
   plays a `uiSound` cue for a purchase.
3. Every row in `uiSound.cues[]` has `audibleSeconds <= 0.35` and a `soundId` whose value is the
   empty string until provisioned; a build with every `soundId` empty starts, plays no sound, and
   writes zero `warn` or error lines mentioning `SoundId`.
4. `uiSound.pressEdgeRule.clientPredictionOfServerDecidedBeat` is `false` and
   `response.beats[upgradePurchased].decidedBy` is still `"server"`.

## Not decided here

Whether the index open and close edges make a sound, how many cues that is, and which close paths
fire one — sheet `02`, which spends the press-edge permission ruled above. Every interface moment
that makes no sound, including the failed-press and three lift rows — sheet `03`. Whether the one
system notice makes a sound — sheet `04`. Every volume, bus, `SoundGroup`, roll-off curve,
concurrency cap, MB allowance and the sentinel's value itself — `mix`; this key mirrors its form
and sets none. `B1`, `B2` and `B3` — Stingers. The clear cue and the platform's default character
sounds — SFX. Which module may create a `Sound` — instance-representation work, architect sheet
`06`. Whether the `readout` channel is legible as an acknowledgment for a muted player —
persistent-readout work (`composition`), stated as U6 and left open. The 200 ms budget itself and
every beat's cause, channel and rank — `response` (`gameplay/mechanics/05`), cited and not moved.
