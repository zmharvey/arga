# 01 — The Notice Channel

**Domain:** ui-ux/feedback · **Category:** UI/UX · **Wave:** 5

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

### Interaction, in the engine's own vocabulary

All four booleans false. Realised as `Active = false` — *"Determines whether this UI element
sinks input"* — and `Selectable = false` — *"Determine whether the GuiObject can be selected
by a gamepad"*
`[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/reference/engine/classes/GuiObject.yaml]`.
That is the whole of `response`'s *"a notice that swallows a tap would swallow a purchase"*,
expressed as two property writes a build can be failed against rather than as a sentence.

### The dwell timer lives in the cue body, never in the scheduler

`Beats.luau` schedules **onsets** and holds no notion of a dwell: `dwellSeconds` is carried
to the cue seam explicitly *"so that the first cue written reads its lifetime from config
rather than picking one"* `[research: game/src/client/Beats.luau]`. `response` does not
carry a dwell on either notice beat, so a builder reads it from
`notices.members[].dwellSeconds` and from nowhere else. `[cid: decided]` — I do **not** file
a revision request growing `response` a field, because two sources for one number is the
defect this key exists to close.

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
        "zIndexBelow": "pressable",
        "zIndexAbove": "hudReadout",
        "eventConnectionsPermitted": []
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
      "slots": 2,
      "growth": "downward",
      "slotAssignment": "arrivalOrder",
      "promoteOnExpiry": false,
      "memberPositionDerivedFromSlot": true,
      "requiredOf": "composition",
      "mayNotIntersect": [
        "the hit rectangle of any of the four game-drawn pressables (Pressable_BUY1, Pressable_BUY2, Pressable_BUY3, Pressable_INDEX)",
        "the area progress bar and its label",
        "the platform touch and jump control keepout regions, whose extent is viewport's"
      ],
      "mayOverlap": [
        "the collection count readout",
        "the currency readout",
        "the three upgrade readouts"
      ],
      "mayOverlapReason": "a readout is re-readable on the next frame; a control aimed at by an eight-year-old on a phone is not, and a purchase is the game's only currency sink"
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
      { "beat": "upgradePurchased", "ruling": "notice absent from channels; theme/tone/03 forbids it by name", "onScreenComponent": "the upgrade readout updating, owned by composition" },
      { "beat": "patchClear", "ruling": "notice absent from channels; theme/tone/03 forbids it by name", "onScreenComponent": "the currency and progress readouts updating, owned by composition" }
    ],
    "forbidden": [
      { "id": "revealNotice", "what": "any HUD-space plate at a Find reveal, including the Find's name", "ruling": "response.beats[findReveal].forbiddenChannels", "observable": "no notices member has beat findReveal; cueFindReveal writes nothing into onset.gui" },
      { "id": "purchaseNotice", "what": "a plate acknowledging an upgrade purchase", "ruling": "theme/tone/03 B4", "observable": "cueUpgradePurchased writes nothing into onset.gui" },
      { "id": "patchClearNotice", "what": "a plate at any patch clear", "ruling": "theme/tone/03 B5", "observable": "cuePatchClear writes nothing into onset.gui" },
      { "id": "gainFloater", "what": "a rising +N, a payout number, a total or a running score attached to any cue", "ruling": "economy - a completion notice cannot say +N", "observable": "no member text contains a digit; no cue body formats a number into a string" },
      { "id": "firstFindCelebrationModal", "what": "a panel, overlay or takeover at the first Find", "ruling": "onboarding/03 T6; firstSession.tutorialDevicesForbidden.unrequestedModalPanelOrOverlay", "observable": "interaction.modal is false and no module opens a Frame at a reveal" },
      { "id": "tutorialCallout", "what": "a coach mark, arrow, pointer, hint or highlight of any control", "ruling": "firstSession.tutorialDevicesForbidden; 02-GAMEPLAY.md 'No text, no tutorial'", "observable": "notices.members has no entry whose cause is a player's inaction or a first-run flag" },
      { "id": "firstRunOnlyString", "what": "any string shown once and never again", "ruling": "onboarding/03 T5", "observable": "every beat member's varies field is 'never'; no cue body reads a persisted boolean to choose text" },
      { "id": "liftAnnouncement", "what": "any plate, sound or motion when an upgrade row, the /24 denominator or the index panel lifts", "ruling": "firstSession S6/S7 - a lift is silent and still", "observable": "no member's cause is a firstSession lift" },
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
worked around. The same request covers sheet `03`'s longer string.

## Consequences for other work

- **Persistent-surface composition (`composition`, ui-ux/hud sheet `01`)** inherits one new
  anchor group, `noticeStack`, with three keepout rows and three may-overlap rows, all in the
  manifest above. It is a data row in your key, not a placement I made: I state the
  constraint and you carry the coordinates, the direction `social/01` used for
  `maxCoPresenceSeparationStuds`. **If no free region satisfies all three keepouts at a phone
  viewport, refuse it out loud** rather than moving the notice over a pressable — the
  fallback I would accept is releasing the upgrade-readout overlap, never the pressable one.
- **Instance representation (`representation`, architect sheet `06`)** must name a legal
  creator, and today there is none. Only `pressables` and `index-screen` may create a
  `GuiObject`, `HudBinding` contains no `Instance.new`, and `Beats.luau` holds the
  `ScreenGui` while its cue bodies are empty. **A notice cannot be built by any module in the
  current build order.** The smallest change is one row adding a `noticeStack` `Frame` with
  two `TextLabel` slots and one named creator; whether that creator is `Beats` or a new
  `notices` module is architecture's call, not mine.
- **Set-completion and area-completion cue work (Audio)** inherits a hard join: the audible
  length of the `B2` cue must be at most 3.0 s and the `B3` cue at most 2.5 s, or the plate
  leaves the screen while its sound is still playing. `theme/tone/03` lets `B2` be *"longer
  and wider than B1"*, so this is a live collision, not a hypothetical. If Audio needs more,
  the route is a revision request against this sheet raising the dwell inside its 5.0 s
  ceiling — one number, not a redesign.
- **Reveal-cue work (Art — VFX)** owns everything the reveal shows, and owns it exclusively:
  the `atPatch` channel is world-anchored and nothing about a reveal enters HUD space. **If
  you decline to render the Find's name at the patch, the name reaches the player only inside
  the collection index.** That is a finding for whoever owns the reveal's legibility; it is
  not something this key can supply.
- **Coinage intake (`theme/vocabulary/04`)** gets its first prose-class renderable coinage and
  a field rule that does not fit it. Three strings across this domain need it.
- **Collection-surface work (`screens`)** keeps the index panel's own empty, loading and error
  states. What it does **not** get is any transient message: nothing this key holds is drawn
  inside an opened surface, and nothing `screens` holds is drawn over live play.

## Acceptance criteria

1. `notices.members` filtered to `class: "beat"` has exactly two entries, whose `beat` fields
   are `setComplete` and `areaComplete`; no member anywhere in the key names `findReveal`,
   `upgradePurchased` or `patchClear`.
2. Each beat member's `text` is ≤ 14 characters, ≤ 12 words, matches
   `^[A-Za-z0-9 ,.'%%/-]+$`, contains no digit, contains none of `relic relics tier artifact
   antique rebirth loot treasure`, and appears in the built client as a single literal — zero
   uses of `string.format`, `..` or an `args` index in either notice cue body.
3. `notices.interaction` has all four booleans false, and the built client contains zero
   `Active = true`, zero `Selectable = true` and zero event connections on any descendant of
   the `noticeStack` anchor.
4. `forbidden[]` has 24 rows, every row carries an `observable` that is a grep or a count, and
   running all 24 against `game/src/` returns zero hits.

## Not decided here

- **What happens when both notices are live at once** — sheet `02`, this domain, which amends
  `maxConcurrent`, `onCoincidence` and the slot rules into this key.
- **Whether any non-beat message exists at all** — sheet `03`, this domain, which adds the
  `system` class. This sheet's `members` array holds only `class: "beat"` entries.
- **Where the `noticeStack` anchor physically sits, in scale, offset or cluster** —
  `composition` (ui-ux/hud). I state a keepout, not a position.
- **What a notice is made of visually** — panel art, trim, colour and font are Art & Visuals —
  UI Art; rendered case and typography are `screens`.
- **What either completion sounds like, and how loud** — Audio, under `theme/tone/03`'s
  ranking, which this sheet does not reopen.
- **What the reveal looks like at the patch** — Art & Visuals — VFX, under `response`'s
  `atPatch` channel and its `dwellSeconds` of 2.5.
- **Which module creates the Instance** — `representation`, architect. I state that none
  legally may today.
