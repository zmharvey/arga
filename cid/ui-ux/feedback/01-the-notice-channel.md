# 01 — The Notice Channel

**Domain:** ui-ux/feedback · **Category:** UI/UX · **Wave:** 5

> **Revised, round 1** (`cid/ui-ux/_verified.md`). **RR-6** closed: the `zIndexBelow`/
> `zIndexAbove` pair is **withdrawn** and replaced by a depth *constraint with its reason*,
> for `composition` to arbitrate. **RR-7** closed: the two `noticeStack` rectangle lists are
> re-derived against `composition.groups` post-fusion and are now stated as group ids and a
> predicate, not as element descriptions. Membership, strings, dwell and `forbidden[]` are
> unchanged and were upheld.

## Decision

A notice is a **static, non-interactive text plate in HUD space** holding one fixed
title-case string and nothing else — no number, no name, no icon, no control, no motion.
**Exactly two of `response`'s five beats produce one**: `setComplete` → `Set Complete` at
3.0 s, `areaComplete` → `Area Complete` at 2.5 s. **`findReveal` has zero HUD-space
component.** After 24/24 the channel carries one member forever.

## Why

### The membership walk, run against `response` rather than inherited

| beat | `channels` | `forbiddenChannels` | in `channelExclusivity.notice` | verdict | the ruling that closes it |
|---|---|---|---|---|---|
| `findReveal` (B1) | `atPatch`, `audio` | **`notice`** | no | **out** | `response.beats[findReveal].forbiddenChannels` names `notice` by id; `theme/tone/03` adds that the notice channel *"may never carry a reveal"* |
| `setComplete` (B2) | **`notice`**, `audio` | — | **yes** | **in** | `response` grants it the channel and `channelExclusivity.notice` lists it |
| `areaComplete` (B3) | **`notice`**, `audio` | `atPatch` | **yes** | **in** | same, and its `atPatch` ban is why it cannot be delivered at the last patch instead |
| `upgradePurchased` (B4) | `readout`, `audio` | — | no | **out** | `notice` is absent from its `channels`, and `theme/tone/03` forbids it by name: *"may not show a notice for `B4` or `B5`"* |
| `patchClear` (B5) | `atPatch`, `readout` | — | no | **out** | same two grounds, and at 8 onsets a second a notice per clear is structurally impossible |

Verified against `game/src/client/Beats.luau`, whose five cue-body headers restate every row
above independently of `GameConfig` — `cueFindReveal` carries *"NOTICE IS FORBIDDEN to this
beat"*, `cueSetComplete` and `cueAreaComplete` both read *"notice + audio, 400 ms budget"*
`[research: game/src/client/Beats.luau]`. **Two, both completions, and one after the
collection finishes** because `endgame` makes reveal and set completion extinct permanently.

### `findReveal` has no on-screen component that is mine

`atPatch` is a world channel: it names a position, not a layer. Anything drawn there is
world-anchored and belongs to Art — VFX under `response`'s residue and dwell budgets, not to
this key. So `notices` has no `findReveal` member and the reveal's `onset.args[1]` — the
Find's name — **never reaches HUD space**. `theme/tone/03` permits the identity to be
rendered once `B1` fires; the two surfaces that may carry it are the patch itself (VFX) and
the collection index (`screens`) `[brief: soft]` ← `04-PRESENTATION.md`'s *"the
differentiator's home"*. **If VFX declines to draw the name at the patch, a Find's name
reaches the player only inside an opened panel** — a finding I record and cannot close.

### The strings

Both are **labels in form and prose values in kind**, so I hold them to both bounds at once:
≤ 14 characters, ≤ 12 words, `casing: "title"`, `allowedPattern` `^[A-Za-z0-9 ,.'%%/-]+$`,
none of the eight banned words `[research: bridge/schema.mjs]`.

| string | chars | words | why not the alternative |
|---|---|---|---|
| `Set Complete` | 12 | 2 | may not name the set (`meta/03`: nothing may signal which axis was granted), may not count sets (`theme/setting/02`: *"No total, no plan, no survey mark"*), may not say `+N` (`economy`) |
| `Area Complete` | 13 | 2 | may not carry `onset.args[1]`, the area label: `endgame` runs unnumbered post-terminal bays forever, so a label-bearing string is either a repeated `Spire` or empty at the state the game spends most of its life in |

Neither varies by run, by set, by depth or by ordinal, so
`firstSession.tutorialDevicesForbidden.firstRunOnlyString` cannot be reached, and `T5`'s ban
on strings that vary by run holds by construction. Neither is second person, an imperative, a
mood word or a claim about age (`theme/tone/01` P1, P2, P7, P8). Neither contains a digit.

### Dwell, and where the 5-second ceiling actually comes from

**3.0 s for `setComplete`, 2.5 s for `areaComplete`, hard ceiling 5.0 s.** All three
`[playtest unknown]`; test ranges in the manifest.

2.5 s is not invented: it is `response.beats[findReveal].dwellSeconds`, the only dwell figure
the merged contract holds, so the game gets one dwell shape rather than two
`[research: game/src/client/Beats.luau]`. `setComplete` takes 3.0 s because `theme/tone/03`
ranks `B2` above `B3` with no ties, and **dwell is the only dimension of a notice I own**:
size and prominence are `composition`'s, loudness is Audio's, and motion, colour and
per-set variance are all forbidden. It is a weak carrier of that rank and I say so; the
strong carrier is audio, which `theme/tone/03` already hands `B2`.

**A correction to my own domain index, worth making because a builder would otherwise cite
the wrong source.** WCAG SC 2.2.2 governs *"any moving, blinking or scrolling information"*
that lasts more than five seconds `[research: https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html]`.
A static plate is outside its scope entirely, so 2.2.2 does not set my dwell. What it does
settle is the **motion** ruling: `response` `R5`–`R6` forbid providing a pause or dismiss
control, so a moving notice would breach 2.2.2 with no legal remedy available — which is why
`motion.animated` is false rather than merely discouraged. The 5.0 s ceiling itself is the
platform's own `DEFAULT_NOTIFICATION_DURATION`
`[research: https://raw.githubusercontent.com/Roblox/Core-Scripts/master/CoreScriptsRoot/CoreScripts/NotificationScript2.lua]`,
and Roblox publishes no other duration guidance for in-experience messages
`[research: https://create.roblox.com/docs/production/game-design/onboarding]`.
`[research owed: a words-per-minute reading rate for an 8–11 age band, which would let dwell be derived from word count rather than picked]`

### Interaction, and the depth constraint that replaces my z-order value — RR-6

All four booleans false. Realised as `Active = false` — *"Determines whether this UI element
sinks input"* — and `Selectable = false` — *"Determine whether the GuiObject can be selected
by a gamepad"*
`[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/reference/engine/classes/GuiObject.yaml]`.
**That pair is the whole of *"a notice must never swallow a tap"*, and it holds at every
depth**, which is what my withdrawn `zIndexBelow: "pressable"` was redundantly trying to buy.
It bought nothing and cost `B2` and `B3` behind an open panel. **Accepted, not contested.**

**The constraint, stated so the arbitration has something to satisfy rather than a number to
obey:** *the notice layer's depth must be strictly greater than the depth of every surface
that can be co-present with it — the index panel, every interactive group, and every
non-interactive readout — because a notice is the only carrier `B2` and `B3` have on this
channel, so an occluded notice is a dropped beat rather than a dimmed one.* Per the
coordinator's routing I carry **no depth value**; `navigation/02`'s layer table (readout 1,
`indexPanel` 10, `gameDrawnPressables` 20, `notice` 30) satisfies it, and `composition`
arbitrates.

**It is reachable, and worth deriving rather than asserting**, because `input`'s
`indexScreenSuspendsMovement` makes it look unreachable: if the player cannot move, no patch
clears, so no completion fires. But the coincident triple takes 1.2 s to drain at
`minOnsetGapSeconds` 0.6 and the plates outlive it by 2.5 s. Clear the final patch at t = 0,
press the index at t = 0.3, and the `setComplete` plate is scheduled at t = 0.6 into an open
panel. **The largest payoff in the game, invisible, on a lap the player reaches four times.**
`[cid: decided]` on the derivation; the ruling is `navigation/02`'s and I adopt it.

### The dwell timer lives in the cue body, never in the scheduler

`Beats.luau` schedules **onsets** and holds no notion of a dwell: `dwellSeconds` is carried
to the cue seam explicitly *"so that the first cue written reads its lifetime from config
rather than picking one"* `[research: game/src/client/Beats.luau]`. `response` does not
carry a dwell on either notice beat, so a builder reads it from
`notices.members[].dwellSeconds` and from nowhere else. `[cid: decided]` — I do **not** file
a revision request growing `response` a field, because two sources for one number is the
defect this key exists to close.

### The keepout, re-derived against the fused element set — RR-7

My first draft named element descriptions and `composition` then fused four of them into
pressables: the collection count **is** `Pressable_INDEX`, and the three upgrade readouts
**are** `Pressable_BUY1/2/3` `[research: cid/ui-ux/hud/01-persistent-surface-composition.md]`.
Four of my five may-overlap surfaces were on my own may-not-intersect list.

**Restated as group ids and one predicate, so it survives the next fusion too:**

| list | contents, post-fusion | reason |
|---|---|---|
| may not intersect | **every group where `interactive == true`** — today `collection`, `upgradeValue`, `upgradeReach`, `upgradePace` | a control aimed at by an eight-year-old on a phone must be seen to be hit; `Active = false` stops the plate eating the tap, not the player missing the button |
| may not intersect | `areaProgress` | `04-PRESENTATION.md`'s *"area-completion progress must be visible while moving"* is the brief's only sentence about a persistent element |
| may not intersect | the platform touch and jump keepout regions | `input.mayOverlapPlatformControlRegions: false`; the extent is `viewport`'s |
| **may overlap** | `currency` — **and it is the only one** | a readout is re-readable on the next frame, and `economy` requires it visible and uncapped, not unoccludable |

**`composition.slots.hudTop` already sets `mayOverlapAnyGroup: false`, which is stricter than
this, and I do not contest it.** A safe superset is the right default. What the table above
becomes is the **relaxation ladder** if the top edge between the `topLeft` and `topRight`
clusters proves too narrow at a phone viewport to hold two slots:

1. release the `currency` overlap;
2. release the `areaProgress` overlap **for the plate's dwell only** — both notices fire at or
   just after a completion, when the bar has filled or reset, so *"visible while moving"* is
   untouched;
3. shrink the plate itself, which is legal at both strings' 12 and 13 characters.

**There is no rung 4.** No plate ever intersects an interactive group, and `slots` never falls
below 2 — sheet `02`'s stacking rule is not viewport-conditional, and dropping to one slot
would reinstate the truncation it rejects. If all three rungs are spent and the region still
does not fit, **refuse the anchor out loud in `composition`** and hand it back; that is a
producibility finding for `viewport` and `ui-forge`, not a licence to overlap a button.

```manifest
{
  "provides": "notices",
  "status": "proposed",
  "value": {
    "readBy": [
      "game/src/client/Beats.luau — the five cue bodies in CUES; two of them draw, three stay empty of notice work",
      "game/src/server/Persistence.luau — the read-failure path in load (see sheet 03)"
    ],
    "definition": "A static text plate in HUD space holding one fixed string. Not a panel, not a modal, not a control, not a log.",
    "interaction": {
      "focusable": false,
      "blocksInput": false,
      "dismissible": false,
      "modal": false,
      "realisation": {
        "Active": false,
        "Selectable": false,
        "eventConnectionsPermitted": [],
        "depthValue": null,
        "depthOwnedBy": "composition",
        "depthConstraint": "strictly greater than the depth of every surface that can be co-present with a notice: navigation.zOrder's indexPanel layer, every interactive group, and every non-interactive readout",
        "depthConstraintReason": "a notice is the only carrier B2 and B3 have on this channel, so an occluded notice is a dropped beat rather than a dimmed one",
        "depthConstraintSatisfiedBy": "navigation/02's notice layer at ZIndex 30 against indexPanel 10, gameDrawnPressables 20, readout 1",
        "nonBlockingIsIndependentOfDepth": true,
        "nonBlockingIsIndependentOfDepthReason": "Active=false does not sink input at any ZIndex, so the tap guarantee never depended on drawing below anything",
        "supersedes": "the withdrawn zIndexBelow: pressable / zIndexAbove: hudReadout pair of round 0"
      },
      "source": "response — nothing on the notice channel may be dismissible-only, focusable, or block a click-through"
    },
    "motion": {
      "animated": false,
      "blink": false,
      "pulse": false,
      "slide": false,
      "scale": false,
      "fadeInSeconds": 0.15,
      "fadeOutSeconds": 0.15,
      "reason": "response R5-R6 forbid a pause or dismiss control, so moving content would breach WCAG SC 2.2.2 with no remedy available"
    },
    "carriesNumber": false,
    "carriesIcon": false,
    "carriesFindName": false,
    "dwellCeilingSeconds": 5.0,
    "dwellCeilingSource": "Roblox CoreScript DEFAULT_NOTIFICATION_DURATION = 5",
    "anchorGroup": {
      "id": "noticeStack",
      "compositionSlot": "hudTop",
      "slots": 2,
      "growth": "downward",
      "slotAssignment": "arrivalOrder",
      "promoteOnExpiry": false,
      "memberPositionDerivedFromSlot": true,
      "slotExtentOwnedBy": "composition",
      "slotExtentConstraint": "two slots must both fit without either intersecting a rectangle named in mayNotIntersectGroupsWhere, mayNotIntersectGroups or mayNotIntersectRegions",
      "requiredOf": "composition",
      "statedAgainst": "composition.groups as of hud/01 — six groups, four of them interactive",
      "mayNotIntersectGroupsWhere": { "field": "interactive", "equals": true, "todayResolvesTo": ["collection", "upgradeValue", "upgradeReach", "upgradePace"] },
      "mayNotIntersectGroups": ["areaProgress"],
      "mayNotIntersectRegions": ["the platform touch thumbstick and jump button keepout regions, whose extent is viewport's"],
      "mayOverlapGroups": ["currency"],
      "compositionMayBeStricter": true,
      "compositionCurrentRule": "slots.hudTop.mayOverlapAnyGroup is false, which is a safe superset of this list and is not contested",
      "relaxationLadder": [
        { "rung": 1, "release": "the currency overlap ban", "cost": "one readout occluded for at most 3.0 s; economy requires it visible and uncapped, not unoccludable" },
        { "rung": 2, "release": "the areaProgress overlap ban, for the plate's dwell only", "cost": "none in practice - both notices fire at or just after a completion, when the bar has filled or reset" },
        { "rung": 3, "release": "the plate's own width and height", "cost": "none - both strings are 12 and 13 characters" }
      ],
      "neverRelaxed": [
        "intersecting any group where interactive is true",
        "reducing slots below 2, because sheet 02's stacking rule is not viewport-conditional"
      ],
      "ifLadderExhausted": "composition refuses the anchor out loud and hands it back as a producibility finding for viewport and ui-forge; it does not overlap a control"
    },
    "members": [
      {
        "id": "setComplete",
        "class": "beat",
        "beat": "setComplete",
        "cause": "response.beats[setComplete], delivered on the SetCompleted channel",
        "text": "Set Complete",
        "textChars": 12,
        "textWords": 2,
        "varies": "never",
        "dwellSeconds": 3.0,
        "dwellTestRange": [2.0, 4.5],
        "dwellPlaytestUnknown": true,
        "firingsPerCollection": 4,
        "extinctAfter": "the collection reaches 24 of 24 (endgame)",
        "anchorGroup": "noticeStack"
      },
      {
        "id": "areaComplete",
        "class": "beat",
        "beat": "areaComplete",
        "cause": "response.beats[areaComplete], delivered on the AreaRestored channel",
        "text": "Area Complete",
        "textChars": 13,
        "textWords": 2,
        "varies": "never",
        "dwellSeconds": 2.5,
        "dwellTestRange": [1.5, 4.0],
        "dwellPlaytestUnknown": true,
        "firingsPerCollection": 8,
        "extinctAfter": null,
        "anchorGroup": "noticeStack"
      }
    ],
    "beatsWithNoNotice": [
      { "beat": "findReveal", "ruling": "response.beats[findReveal].forbiddenChannels contains notice", "onScreenComponent": "world-anchored only, at the patch, owned by Art - VFX under the atPatch channel" },
      { "beat": "upgradePurchased", "ruling": "notice absent from channels; theme/tone/03 forbids it by name", "onScreenComponent": "the upgradeValue/Reach/Pace group's own readouts updating, owned by composition" },
      { "beat": "patchClear", "ruling": "notice absent from channels; theme/tone/03 forbids it by name", "onScreenComponent": "the currency and areaProgress groups updating, owned by composition" }
    ],
    "forbidden": [
      { "id": "revealNotice", "what": "any HUD-space plate at a Find reveal, including the Find's name", "ruling": "response.beats[findReveal].forbiddenChannels", "observable": "no notices member has beat findReveal; cueFindReveal writes nothing into onset.gui" },
      { "id": "purchaseNotice", "what": "a plate acknowledging an upgrade purchase", "ruling": "theme/tone/03 B4", "observable": "cueUpgradePurchased writes nothing into onset.gui" },
      { "id": "patchClearNotice", "what": "a plate at any patch clear", "ruling": "theme/tone/03 B5", "observable": "cuePatchClear writes nothing into onset.gui" },
      { "id": "gainFloater", "what": "a rising +N, a payout number, a total or a running score attached to any cue", "ruling": "economy - a completion notice cannot say +N", "observable": "no member text contains a digit; no cue body formats a number into a string" },
      { "id": "firstFindCelebrationModal", "what": "a panel, overlay or takeover at the first Find", "ruling": "onboarding/03 T6; firstSession.tutorialDevicesForbidden.unrequestedModalPanelOrOverlay", "observable": "interaction.modal is false and no module opens a Frame at a reveal" },
      { "id": "tutorialCallout", "what": "a coach mark, arrow, pointer, hint or highlight of any control", "ruling": "firstSession.tutorialDevicesForbidden; 02-GAMEPLAY.md 'No text, no tutorial'", "observable": "notices.members has no entry whose cause is a player's inaction or a first-run flag" },
      { "id": "firstRunOnlyString", "what": "any string shown once and never again", "ruling": "onboarding/03 T5", "observable": "every beat member's varies field is 'never'; no cue body reads a persisted boolean to choose text" },
      { "id": "liftAnnouncement", "what": "any plate, sound or motion when an upgrade group, the /24 denominator or the index panel lifts", "ruling": "firstSession S6/S7 - a lift is silent and still", "observable": "no member's cause is a firstSession lift or a composition.presence transition" },
      { "id": "duplicateFoundToast", "what": "an 'already found' plate, a slot that fills twice, a consolation cue", "ruling": "discovery - no reachable duplicate exists", "observable": "no member's cause is a repeat find" },
      { "id": "rejectionCue", "what": "any response to an unaffordable or refused press", "ruling": "input.rejectionCueOnFailedPrecondition is none; theme/tone/04 D12; response.negativeBeats is 0", "observable": "no member has class 'negative'; no cue body is reachable from a failed BuyUpgrade" },
      { "id": "setBonusNotice", "what": "a plate naming the axis a completed set granted, or its factor", "ruling": "meta/03 - nothing may signal which axis was granted", "observable": "setComplete.text is byte-identical for all four sets and reads no set id" },
      { "id": "playerJoinOrLeaveNotice", "what": "a plate, sound or string naming or counting another player", "ruling": "social/03 X11", "observable": "no member's cause is another player's join, leave or progress" },
      { "id": "endScreen", "what": "a completion screen, congratulation, ceremony or percentage at 24 of 24", "ruling": "endgame - no end screen, no congratulation, no completion percentage", "observable": "no member's cause is collection completion; setComplete goes extinct rather than escalating" },
      { "id": "productNameOrPrice", "what": "naming, showing, pricing or prompting any product in a notice", "ruling": "products F19; ruling R-4", "observable": "no member text contains a product name, a Robux figure or the word Pass" },
      { "id": "rejoinInstruction", "what": "any string telling the player to rejoin, restart or come back", "ruling": "theme/tone/01 P1 (no second person), P2 (declarative only), P6 (no game/server/session); NOT products F19, which reaches only the product case", "observable": "no member text contains rejoin, restart, reconnect, again, back, you or your" },
      { "id": "timedOfferRibbon", "what": "a countdown, timer, expiry, streak or limited-time banner", "ruling": "monetization/02 F11 bans manufactured scarcity; priority 3 bans seasons and events", "observable": "no member has a countdown field; no member text contains a time unit" },
      { "id": "dailyRewardPopup", "what": "a daily reward, login streak, code entry field or event banner", "ruling": "03-META.md priority 3", "observable": "notices.members has 3 entries total and none of these ids" },
      { "id": "offlineEarningsSummary", "what": "a 'while you were away' plate", "ruling": "03-META.md priority 3 cuts offline accrual", "observable": "no member's cause is elapsed real time" },
      { "id": "warningState", "what": "a countdown, timer, low-anything warning, red state or 'are you sure'", "ruling": "02-GAMEPLAY.md 'There is no failure state' and 'Zero tension is deliberate'; theme/tone/04 D12", "observable": "no member has a severity or colour field" },
      { "id": "saveSucceededNotice", "what": "any acknowledgment of a successful periodic write", "ruling": "cid: decided - a successful save is the expected case and announcing it teaches the player to fear the unannounced one", "observable": "Persistence.save contains no client-facing call" },
      { "id": "areaEnterNotice", "what": "a plate on entering an area, a depth, or a post-terminal bay", "ruling": "meta/04 - the next area is enterable with no threshold and no gate; setting/04 - the opening holds nothing", "observable": "no member's cause is an area transition; only its completion" },
      { "id": "dismissControl", "what": "a close button, an X, a tap-to-dismiss region or a 'got it' affordance on any notice", "ruling": "response R5-R7 forbid a beat needing a press; interaction.dismissible is false", "observable": "no GuiButton descendant exists under the noticeStack anchor" },
      { "id": "noticeHistory", "what": "a log, feed, ticker, archive or 'N more' badge of past or pending notices", "ruling": "cid: decided - maxConcurrent is 2 and no queue exists (sheet 02), so there is nothing to badge or replay", "observable": "the notice module holds no array of expired notices" },
      { "id": "noticeSound", "what": "a sound authored by this key", "ruling": "cid: decided - audio is the notice beats' second channel and Audio owns it; a notice-specific sound would be a sixth cue", "observable": "notices carries no soundId, and no cue body plays a Sound this key names" }
    ]
  }
}
```

```coinage
{
  "coins": "Set Complete",
  "renderable": true,
  "kind": "notice-text",
  "wave": 5,
  "because": "the set-completion notice string; it has no contract path until notices is promoted",
  "requestsPath": "notices.members[setComplete].text",
  "surface": "the noticeStack plate, drawn over live play"
}
```

```coinage
{
  "coins": "Area Complete",
  "renderable": true,
  "kind": "notice-text",
  "wave": 5,
  "because": "the area-completion notice string; it has no contract path until notices is promoted",
  "requestsPath": "notices.members[areaComplete].text",
  "surface": "the noticeStack plate, drawn over live play"
}
```

**One field rule I cannot satisfy, stated rather than mangled.** `theme/vocabulary/04` sets
`coins` as *"one word"* when `renderable` is true. A notice string is a prose value, not a
label, and splitting it into `Set` and `Complete` would put two ordinary English words into
the register while recording neither string. **The route is a `class` field on the intake, not
a shorter string** — a revision request against `theme/vocabulary/04`, filed here and not
worked around. The same request covers sheet `03`'s longer string, and both need the
`PROSE_PATHS` entry at `bridge/schema.mjs` that the verification confirmed is real.

## Consequences for other work

- **Persistent-surface composition (`composition`, ui-ux/hud sheet `01`)** — this is RR-8's
  (a), and here is exactly what to hold. Add `noticeStack` as an anchor group inside
  `slots.hudTop` with: `slots` 2, `growth`, `slotAssignment`, `promoteOnExpiry`,
  `mayNotIntersectGroupsWhere` (a predicate on `groups[].interactive`, so it re-resolves if
  the group set changes again), `mayNotIntersectGroups`, `mayNotIntersectRegions`,
  `mayOverlapGroups`, `relaxationLadder`, `neverRelaxed`, and one depth field satisfying
  `interaction.realisation.depthConstraint`. **I carry no coordinates and no depth number.**
  Your `mayOverlapAnyGroup: false` is stricter than my list and is accepted as written; the
  list is what to relax *to*, in order. **If the ladder is exhausted, refuse it out loud** —
  the answer is never a plate over `Pressable_BUY1`.
- **Screen graph and concurrency (`navigation`, sheets `01`–`03`)** — your `notice` layer at
  30 is adopted and my contradicting z-order pair is withdrawn, so RR-6 closes from my side
  with nothing owed back. Your invariant that every `gameDrawnPressables` member outranks
  `IndexSurface` is untouched by anything here; a notice sits above all of it and sinks no
  input at any depth.
- **Audio — Stingers (wave 6)** owns `B2` and `B3` and inherits a hard join: the audible
  length of the `B2` cue must be at most 3.0 s and the `B3` cue at most 2.5 s, or the plate
  leaves the screen while its sound is still playing. `theme/tone/03` lets `B2` be *"longer
  and wider than B1"*, so this is live. **There is 2.0 s of headroom to the 5.0 s ceiling and
  it resolves as one number** — a revision request against this sheet's `dwellSeconds`, not a
  redesign of either channel.
- **Audio — UI Sound (wave 6)** inherits `forbidden[noticeSound]`: this key authors no sound
  and names no `soundId`. The notice beats' audio is the `audio` channel of `B2` and `B3`,
  which is Stingers'. **A notice-specific sound would be a sixth cue against
  `theme/tone/03`'s five**, so if UI Sound has anything to place it is on a pressable, not
  here.
- **Instance representation (`representation`, architect sheet `06`)** must name a legal
  creator, and today there is none. Only `pressables` and `index-screen` may create a
  `GuiObject`, `HudBinding` contains no `Instance.new`, and `Beats.luau` holds the
  `ScreenGui` while its cue bodies are empty. The smallest change is one row adding a
  `noticeStack` `Frame` with two `TextLabel` slots and one named creator.
- **Reveal-cue work (Art — VFX)** owns everything the reveal shows, exclusively: the
  `atPatch` channel is world-anchored and nothing about a reveal enters HUD space. **If you
  decline to render the Find's name at the patch, the name reaches the player only inside the
  collection index.**
- **Collection-surface work (`screens`)** keeps the index panel's own empty, loading and error
  states, and per RR-10 deletes `screens.systemCopy` in favour of
  `notices.members[saveNotLoaded]`. Nothing this key holds is drawn inside an opened surface.

## Acceptance criteria

1. `notices.members` filtered to `class: "beat"` has exactly two entries, whose `beat` fields
   are `setComplete` and `areaComplete`; no member anywhere in the key names `findReveal`,
   `upgradePurchased` or `patchClear`.
2. Each beat member's `text` is ≤ 14 characters, ≤ 12 words, matches
   `^[A-Za-z0-9 ,.'%%/-]+$`, contains no digit, contains none of `relic relics tier artifact
   antique rebirth loot treasure`, and appears in the built client as a single literal — zero
   uses of `string.format`, `..` or an `args` index in either notice cue body.
3. On the built HUD: all four `notices.interaction` booleans are false, every node under the
   `noticeStack` anchor has `Active == false`, `Selectable == false` and zero event
   connections, and its realised `ZIndex` is **strictly greater** than `IndexSurface.ZIndex`
   and than the `ZIndex` of every node named in `composition.groups[].node`.
4. `forbidden[]` has 24 rows, every row carries an `observable` that is a grep or a count, and
   running all 24 against `game/src/` returns zero hits.

## Not decided here

- **What happens when both notices are live at once** — sheet `02`, this domain, unchanged by
  this round and approved as of `_verified.md`.
- **Whether any non-beat message exists at all** — sheet `03`, this domain, unchanged by this
  round and approved. Its `saveNotLoaded` member is the only `class: "system"` entry.
- **The `noticeStack` anchor's coordinates, its slot extent in pixels, and the depth value
  satisfying my constraint** — `composition` (ui-ux/hud), arbitrating four domains'
  requirements per RR-8. I state a constraint, a predicate and a ladder; I set no number.
- **Whether a fifth game-drawn pressable exists** — RR-3, between `navigation/03`,
  `screens/01` and the owner of `input`. `noticeStack` holds no control either way.
- **What a notice is made of visually** — panel art, trim, colour and font are Art & Visuals —
  UI Art; rendered case and typography are `screens`.
- **What either completion sounds like and how long for** — Audio — Stingers, against the
  dwell ceiling above.
- **What the reveal looks like at the patch** — Art & Visuals — VFX, under `response`'s
  `atPatch` channel and its `dwellSeconds` of 2.5.
- **Which module creates the Instance** — `representation`, architect. None legally may today.
