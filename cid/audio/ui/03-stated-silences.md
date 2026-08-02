# 03 — Stated Silences

**Domain:** audio/ui · **Category:** Audio · **Wave:** 6

## Decision

**Thirty interface moments make no sound, each with the sheet that forbids it and an observable a
grep or a count settles — against a permitted set of three cues.** Twenty-nine of them, `F1` to
`F29`, are stated here; the thirtieth is the system notice and sheet `04` carries it, so one row
is not written twice. Five rows are inherited from `notices`, say so, are scoped to **sound only**
and re-rule nothing about the plate. Seven are priority-3 reflexes named in order to forbid them,
and one closes the whole class by forbidding any reserved bus, empty cue slot or held-open field
for them.

## Why

**A stated zero is a build instruction and an unstated one is an invitation.** `00-CORE.md` binds
this project to *"the smallest game that still gives every creative area real work"*
`[brief: binding]` ← `[you chose: R1 Q3]`, and the reflexes below are what a builder adds when a
sheet is silent rather than when a sheet is wrong. Every row is countable because a build agent
cannot check *"restrained"* and can check *zero `MouseEnter` connections*.

**Every row here forbids a *UI sound*, and nothing else.** The scope is stated once because a
reviewer reading an observable in isolation can take it as a ban on the mechanism rather than on
this domain's use of it — which is what happened to `F17` in round 1, where an unqualified *"zero
writes to a `SoundService` property"* caught `mix`'s required `AmbientReverb` and `DopplerScale`
boot configuration (RR-6). No row in this sheet reaches a sibling Audio domain's values, a plate,
a motion, a string or a surface.

**The rejection rows (`F1`–`F4`) are the ones most likely to be re-added.** Four approved sources
close them independently and in different vocabularies:
`input.pressable.rejectionCueOnFailedPrecondition: "none"`, `buy.onPreconditionFail:
"silentNoOp"`, `input` acceptance criterion 4's *"emits nothing on any channel"*
`[research: cid/gameplay/mechanics/02-verb-roster.md]`, `response.negativeBeats: 0`
`[research: cid/gameplay/mechanics/05-response-contract.md]`, and `theme/tone/04` `D12`, which
*"removes every standard way of signalling 'you cannot do that' in a game where there is nothing
you cannot do"* `[research: cid/theme/tone/04-do-nots.md]`. `notices.forbidden.rejectionCue`
already holds the plate half; `F1` is the **sound** half and cites it as inherited rather than
duplicating the claim.

**Hover is a stated zero on every device class, not a sheet.** Roblox's own mobile input surface
documents touch gestures, device motion, haptics and on-screen buttons and **no pointer or hover
state at all**
`[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/input/mobile.md]`;
`GuiObject.MouseEnter` and `MouseLeave` are described purely as mouse events
`[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/reference/engine/classes/GuiObject.yaml]`.
The brief's audience is *"mobile-heavy"* `[brief: binding]` ← `[you chose: R1 Q4]`
(`00-CORE.md`), so most of it cannot produce the event; `composition` defines no hover state for
any element; and a desktop-only cue on the game's only currency sink breaks `mechanics/03`'s
parity floor, which requires every verb be reachable on all three device classes with no path a
device class lacks. The **gamepad focus move** falls to the same argument from the other end:
`SelectionGained` / `SelectionLost` fire only when *"the Gamepad selector starts/stops focusing
on"* an object `[research: .../GuiObject.yaml]`, across a set `navigation` fixes at four members
whether the panel is open or closed, and console is the smallest slice of the audience. One row
each, and no sheet `[cid: decided]`.

**Toggle and slider feedback is zero because neither object exists.** `input` is a closed
five-verb list with `gameDrawnPressables: 4` and no toggle role; `navigation.notNodes` includes
`settings`; and `04-PRESENTATION.md` *"Declined: a full pass with colourblind mode, text scaling
and sensitivity options"* `[brief: soft]` ← `[you accepted: R6 Q4]`. So the in-game volume slider
this domain would otherwise sound **does not exist**, and the player's only volume control is the
platform's own. That is a consequence for `mix`, routed and not decided here.

**Platform UI sounds are outside the game's surface, ruled rather than assumed.** `navigation/03`
has the game do nothing at all on `MenuOpened`
`[research: cid/ui-ux/navigation/03-close-and-focus-by-device.md]`. Whether Roblox CoreScripts
play a sound on platform-menu open or close on mobile is
`[research owed: a device check, or the current PlayerModule/CoreGui source, stating whether any
CoreScript plays a sound on platform-menu open or close]`. **The ruling does not depend on the
answer**: this game neither adds to nor suppresses any platform interface sound, in either case,
because suppression is a write the game has no reason to make and addition is a cue with no cause
in `input` (U8). `F17` bans that write **from this domain**; `mix` owns `SoundService`
configuration and is untouched by it.

**The seven priority-3 rows and the reservation row are one argument in eight parts.**
`03-META.md` lists *"real procedural generation · rebirth · offline accrual · codes · daily
rewards · leaderboards · trading · seasons and events"* as explicitly not in this project
`[brief: soft]` ← `[I assumed — the ordering]`, hard as a gate. Naming one to forbid it is
compliant; **reserving a bus, a `SoundGroup`, an empty cue slot or a `"future"` field for one is
not**, which is why `F29` exists as its own countable row rather than as a caveat on the other
seven. `rebirth` additionally fails the merge as a `vocabulary.bannedWords` member.

**Five rows are inherited and one is not repeated.** `F5`–`F7` (the three lifts), `F8` (a
save-succeeded sound) and `F12` (a notice-authored sound) all restate a `notices` row **scoped to
sound**, name it as inherited, and add nothing to the plate ruling. The system notice's own
sound is **`F30`, sheet `04`'s row, and is not carried here**, because one key with one row
written twice is the collision this batching exists to prevent. The count below is the whole set;
the rows below are this sheet's twenty-nine.

## Consequences for other work

- **Purchase-control work (`pressables`)** inherits `F1`–`F4` as four greps over one module: the
  failed-precondition branch, the debounce-swallowed branch, the `Activated` edge and the desktop
  `1`/`2`/`3` accelerator each reach zero `Sound`. This is the single most likely place a builder
  adds a sound by reflex and it is now four countable checks rather than a style note.
- **Mix work (`mix`)** inherits three things. `F29` forbids it reserving a bus, a `SoundGroup` or
  a headroom allocation for any priority-3 subject, so its bus tree closes at what the six domains
  actually hold. `F15`/`F16` hand it the consequence it must state and I may not: there is no
  in-game volume control, no mute and no settings verb, so its defaults are the only mix any
  player will ever have. And **`F17` and criterion 2 are scoped to UI-sound writes**, so its own
  `SoundService` configuration — `AmbientReverb`, `DopplerScale`, `RolloffScale`, `DistanceFactor`
  — is outside both and is blocked by nothing in this sheet.
- **Feedback-UI work (`notices`)** is contradicted by nothing here. Five rows cite its forbidden
  entries as inherited and scope themselves to sound; its plate rulings are untouched and its
  `rejectionCue` and `liftAnnouncement` observables are not restated in its own terms.
- **Index-panel work (`screens`)** gets `F19`–`F21`: no scroll tick (there is no scroll region),
  no per-slot fill sound (the reveal is `B1` and owns that moment), and no sound for an empty or
  unrevealed slot, which is `theme/tone/04` `D8` in the audio channel.
- **Instance-representation work (architect sheet `06`)** gets a bound alongside sheet `01`'s
  `RQ2`: whatever module it names as a legal `Sound` creator may create **three** `Sound`
  instances and no `SoundGroup` reserved for a subject with no cue.
- **Store and monetization work (`offerSurface`, `products`)** gets `F10` and `F11` as the audio
  half of `F19`/R-4: no cue names, prices, prompts or acknowledges a product, and a pass applying
  mid-session or at rejoin is silent. `cid/_state.md`'s recorded harm — a purchased pass that
  produces no visible change — is not closed by a sound, and this row says so rather than leaving
  it as the obvious fix.
- **Verification work** gets 29 checks from this sheet, all mechanical, most of them one grep.

| id | forbidden, named | ruling | observable |
|---|---|---|---|
| `F1` | Any sound on a press whose precondition failed — balance below cost, or level at `maxLevel` | `input.rejectionCueOnFailedPrecondition: "none"`; `buy.onPreconditionFail: "silentNoOp"`; `input` criterion 4 *"emits nothing on any channel"*; `response.negativeBeats: 0`; `theme/tone/04` `D12`. Inherits `notices.forbidden.rejectionCue`, scoped to sound | no `Sound` play call is reachable from a failed `BuyUpgrade` path in `game/src/`; `uiSound.cues[]` has no row whose `cause` names a failed precondition |
| `F2` | A sound on a press swallowed by `input.pressable.debounceSeconds` 0.35 | same as `F1` — a swallowed press is a refused press. Named separately because it is a different code branch | the debounce branch in the purchase-control module contains zero `Sound` references |
| `F3` | Any cue on the `Activated` edge of `Pressable_BUY1/2/3` | sheet `01`: a press-edge cue on a server-adjudicated verb fires before adjudication and therefore on failure | `uiSound.pressEdgeRule.purchaseControlsHavePressEdgeCue` is `false`; no `cues[]` row's `playSite` names a purchase pressable |
| `F4` | A distinct sound for the desktop `1`/`2`/`3` keyboard accelerator | `navigation.keyboardAccelerator.exists: false`; `mechanics/03` parity floor — a desktop-only cue on the only currency sink is a path two device classes lack | zero `Sound` play calls reachable from a `UserInputService` or `ContextActionService` handler in `game/src/client/` |
| `F5` | Any sound when an upgrade row lifts | **inherited** from `notices.forbidden.liftAnnouncement` (*"any plate, sound or motion"*) and `firstSession` `S6`/`S7`; scoped to sound, plate untouched | no `uiSound` cue's `cause` is a `firstSession` lift or a `composition.presence` transition |
| `F6` | Any sound when the `/ 24` denominator lifts | **inherited**, same two sources | same observable as `F5` |
| `F7` | Any sound when the index control becomes interactive at the first Find | **inherited**, same two sources; distinct from sheet `02`'s `indexOpen`, which needs a player activation | `uiSound.cues[indexOpen].cause` names an activation and not `navigation.selectability.pressableIndexSelectableFrom` |
| `F8` | A save-succeeded sound, chime or tick | **inherited** from `notices.forbidden.saveSucceededNotice`; scoped to sound | `game/src/server/Persistence.luau` contains no client-facing call, and `uiSound.cues[]` names no persistence cause |
| `F9` | A shutdown, restart, migration or maintenance sound | `release.shutdown.playerFacing: "nothing"` | `uiSound.cues[]` has no row whose `cause` names `BindToClose`, shutdown or a place version |
| `F10` | Any cue naming, pricing, prompting or advertising a product | `products` `F19`; ruling **R-4** (no in-game store); `offerSurface` | `uiSound` contains no string matching `pass`, `robux`, `buy now`, `store`, `offer` or `Span` in any cue `cause` or `id` |
| `F11` | A sound when a purchased pass resolves, applies mid-session, or applies at rejoin | `products` `F19`; `notices.systemSilences[midSessionPassPurchase].fires: false`; `cid/_state.md` build note 4 | `uiSound.cues[]` has no row whose `cause` names `entitlements`, `UserOwnsGamePassAsync` or `products` |
| `F12` | A notice-specific sound authored outside Audio, and any delegation of a cue to `notices` | **inherited** from `notices.forbidden.noticeSound` — cited, not re-ruled | `notices` carries no `soundId`, and no `uiSound` cue's `playSite` names a `notices` member or the `noticeStack` anchor |
| `F13` | A hover, mouse-over, `MouseEnter`, `MouseLeave` or pointer cue on any element, on any device class | Roblox's mobile input surface documents no pointer or hover state, so most of the audience cannot produce the event; `composition` defines no hover state; `mechanics/03` parity `[cid: decided]` | zero `MouseEnter`, `MouseLeave` and `MouseMoved` connections in `game/src/client/` |
| `F14` | A gamepad focus-move cue on `SelectionGained` or `SelectionLost` across the four selectable controls | same parity ground; `navigation.selectability.selectableCount` is 4 and constant open or closed `[cid: decided]` | zero `SelectionGained` and `SelectionLost` connections in `game/src/client/` |
| `F15` | Toggle, switch or checkbox feedback of any kind | **no toggle exists**: `input` is a closed five-verb list with four pressables and no toggle role; `navigation.notNodes` includes `settings`; `04-PRESENTATION.md` declined the options pass | `input.verbs` has 5 entries and `gameDrawnPressables` is 4; no `composition` or `screens` node has a two-state interactive role |
| `F16` | Slider drag, tick, detent or release feedback, **including a volume slider** | same ruling; the in-game volume control this row would sound does not exist. Consequence routed to `mix`, not decided here | zero `GuiObject` with a drag or slider role in `composition.elements` and `screens[index].tree` |
| `F17` | Any platform UI sound **this domain** adds to, replaces or suppresses — platform menu, chat, purchase chrome | `navigation/03`: the game does nothing at all on `MenuOpened`; U8 `[cid: decided]`, and the ruling holds under either answer to the research owed above. **Scoped to UI sound: `mix` owns `SoundService` configuration and this row does not reach it** (RR-6) | no module that plays a `uiSound` cue writes a `SoundService` property or overrides `CoreGui` or `RbxCharacterSounds`; `mix`'s boot-time `AmbientReverb`, `DopplerScale`, `RolloffScale` and `DistanceFactor` writes are outside this row |
| `F18` | A join, splash, logo or first-frame cue | `onboarding/03` `T6` forbids an unrequested panel and `T5` forbids a first-session-only surface; a join sound is a cue with no player action behind it | `uiSound.cues[]` has no row whose `cause` names join, `PlayerAdded`, `CharacterAdded` or the first snapshot |
| `F19` | A scroll tick, rubber-band or overscroll sound in the index panel | `screens/01`: the panel has **no scroll region** | `screens[index].tree` contains zero `ScrollingFrame` nodes |
| `F20` | A per-slot fill sound when a collection slot resolves in the index | the reveal is `B1` and owns `atPatch` + `audio`; the Audio verification check is *"every reward moment has exactly one stinger, not two"* | no `uiSound` cue names a `Slot_*` node or `screens[index]` |
| `F21` | Any sound for an empty, unrevealed or locked slot | `theme/tone/04` `D8` (no padlock, no strikethrough, no permanently-unavailable state) in the audio channel; `D11` (nothing shown for an unrevealed Find) | `uiSound.cues[]` has no row whose `cause` names an unrevealed Find or an empty slot |
| `F22` | A daily-login chime, streak escalation or login-reward sting | `03-META.md` priority 3 — daily rewards | `uiSound` contains no string matching `daily`, `login`, `streak` or `reward` |
| `F23` | A code-redeem or code-entry sound | `03-META.md` priority 3 — codes; `theme/tone/04` `D10` | `uiSound` contains no string matching `code` or `redeem` |
| `F24` | A leaderboard, rank, percentile or placement cue | `03-META.md` priority 3 — leaderboards; `theme/tone/04` `D7`; `social/03` `X11` | `uiSound` contains no string matching `leaderboard`, `rank` or `percentile` |
| `F25` | A trade, gift or send sound | `03-META.md` priority 3 — trading; `social/03` `X11` | `uiSound` contains no string matching `trade`, `gift` or `send` |
| `F26` | A seasonal, holiday, anniversary or event sting | `03-META.md` priority 3 — seasons and events; `OPEN.md §2` *"Ships and settles"*; `theme/tone/04` `D15` | `uiSound` contains no string matching `season`, `event`, `holiday` or `anniversary` |
| `F27` | A returning-player or welcome-back greeting, including an offline-accrual return cue | `03-META.md` priority 3 — offline accrual; `theme/tone/04` `D15`; `notices` carries no returning-player member | `uiSound` contains no string matching `welcome`, `returning`, `back` or `offline` |
| `F28` | A rebirth, prestige or reset sting | `03-META.md` priority 3 — rebirth; `01-FOUNDATION.md` *"Cleared is permanent"* `[brief: binding]`, so nothing may announce a reset; `rebirth` is in `vocabulary.bannedWords` and fails the merge | `uiSound` contains no string matching `rebirth`, `prestige` or `reset` |
| `F29` | Any reserved `SoundGroup`, empty cue slot, unused bus, placeholder id or `future`/`planned`/`tbd` field held open for `F22`–`F28` | the category scope gate: naming a priority-3 subject to forbid it is compliant, reserving space for it is not | every `uiSound.cues[]` row has a non-empty `cause` and a named `playSite`; `uiSound` contains no key named `reserved`, `future`, `planned`, `tbd` or `placeholder` |
| `F30` | Any sound accompanying the one system notice | **sheet `04`'s row, listed here for completeness and written there** | see sheet `04` |

```manifest
{
  "amends": "uiSound",
  "value": {
    "forbiddenCount": 30,
    "forbiddenRowsWrittenHere": 29,
    "forbiddenRowIdsWrittenHere": ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "F13", "F14", "F15", "F16", "F17", "F18", "F19", "F20", "F21", "F22", "F23", "F24", "F25", "F26", "F27", "F28", "F29"],
    "forbiddenRowWrittenElsewhere": { "id": "F30", "sheet": "cid/audio/ui/04-system-notice-sound.md", "reason": "one key, one row, one sheet" },
    "permittedCueCount": 3,
    "forbiddenScope": "UI sound only. No row bans a mechanism, a plate, a motion, a string or a surface, and no row reaches a sibling Audio domain's values. Where a row's observable names an engine API, it is scoped to modules that play a uiSound cue.",
    "doesNotReach": [
      { "what": "SoundService configuration - AmbientReverb, DopplerScale, RolloffScale, DistanceFactor", "owner": "audio/mix", "row": "F17", "note": "RR-6: criterion 2 and F17 were unqualified in round 1 and caught writes mix requires" },
      { "what": "SoundGroup structure, bus levels and the ducking rule", "owner": "audio/mix", "row": "F29", "note": "F29 bans a bus reserved for a priority-3 subject, not a bus with members" },
      { "what": "the platform's default character sounds - footstep, jump, landing", "owner": "audio/sfx", "row": "F17", "note": "in-world sound, category gap G4" }
    ],
    "inheritedRows": ["F5", "F6", "F7", "F8", "F12"],
    "inheritedFrom": "notices (ui-ux/feedback/01 and /03), cited and not re-ruled",
    "priorityThreeRows": ["F22", "F23", "F24", "F25", "F26", "F27", "F28"],
    "reservationForbiddenRow": "F29",
    "notCarriedHere": [
      { "what": "a sound for the one system notice", "owner": "cid/audio/ui/04-system-notice-sound.md", "id": "F30" },
      { "what": "silence on the respawn close path", "owner": "cid/audio/ui/02-index-open-and-close.md closePaths", "reason": "it is a path of a permitted cue, not a forbidden class" }
    ],
    "consequenceRoutedNotDecided": {
      "what": "no in-game volume control, mute, caption or audio-settings surface exists, so the platform's own volume is the player's only control",
      "grounds": "input is a closed five-verb list; navigation.notNodes includes settings; 04-PRESENTATION.md declined the options pass",
      "routedTo": "audio/mix",
      "decidedHere": false
    },
    "forbidden": [
      { "id": "F1", "what": "any sound on a press whose precondition failed", "ruling": "input.rejectionCueOnFailedPrecondition none; buy.onPreconditionFail silentNoOp; input criterion 4; response.negativeBeats 0; theme/tone/04 D12; inherits notices.forbidden.rejectionCue scoped to sound", "observable": "no Sound play call reachable from a failed BuyUpgrade path in game/src/; no cues[] row whose cause names a failed precondition" },
      { "id": "F2", "what": "a sound on a press swallowed by debounceSeconds 0.35", "ruling": "a swallowed press is a refused press; F1's sources reach it", "observable": "the debounce branch of the purchase-control module contains zero Sound references" },
      { "id": "F3", "what": "any cue on the Activated edge of Pressable_BUY1/2/3", "ruling": "cid/audio/ui/01 - a press-edge cue on a server-adjudicated verb fires before adjudication", "observable": "uiSound.pressEdgeRule.purchaseControlsHavePressEdgeCue is false; no cues[] row's playSite names a purchase pressable" },
      { "id": "F4", "what": "a distinct sound for the desktop 1/2/3 keyboard accelerator", "ruling": "navigation.keyboardAccelerator.exists false; mechanics/03 parity floor", "observable": "zero Sound play calls reachable from a UserInputService or ContextActionService handler in game/src/client/" },
      { "id": "F5", "what": "any sound when an upgrade row lifts", "ruling": "inherited: notices.forbidden.liftAnnouncement, firstSession S6/S7", "observable": "no uiSound cue's cause is a firstSession lift or a composition.presence transition" },
      { "id": "F6", "what": "any sound when the / 24 denominator lifts", "ruling": "inherited: notices.forbidden.liftAnnouncement, firstSession S6/S7", "observable": "same as F5" },
      { "id": "F7", "what": "any sound when the index control becomes interactive at the first Find", "ruling": "inherited: notices.forbidden.liftAnnouncement, firstSession S6/S7", "observable": "uiSound.cues[indexOpen].cause names an activation, not navigation.selectability.pressableIndexSelectableFrom" },
      { "id": "F8", "what": "a save-succeeded sound, chime or tick", "ruling": "inherited: notices.forbidden.saveSucceededNotice, scoped to sound", "observable": "Persistence.luau contains no client-facing call; no uiSound cue names a persistence cause" },
      { "id": "F9", "what": "a shutdown, restart, migration or maintenance sound", "ruling": "release.shutdown.playerFacing is nothing", "observable": "no cues[] row whose cause names BindToClose, shutdown or a place version" },
      { "id": "F10", "what": "any cue naming, pricing, prompting or advertising a product", "ruling": "products F19; ruling R-4; offerSurface", "observable": "uiSound contains no string matching pass, robux, buy now, store, offer or Span in any cue cause or id" },
      { "id": "F11", "what": "a sound when a purchased pass resolves, applies mid-session or applies at rejoin", "ruling": "products F19; notices.systemSilences[midSessionPassPurchase].fires false; cid/_state.md build note 4", "observable": "no cues[] row whose cause names entitlements, UserOwnsGamePassAsync or products" },
      { "id": "F12", "what": "a notice-specific sound authored outside Audio, and any delegation of a cue to notices", "ruling": "inherited: notices.forbidden.noticeSound, cited and not re-ruled", "observable": "notices carries no soundId; no uiSound cue's playSite names a notices member or the noticeStack anchor" },
      { "id": "F13", "what": "a hover, mouse-over, MouseEnter, MouseLeave or pointer cue on any element on any device class", "ruling": "cid: decided - Roblox mobile input documents no pointer or hover state; composition defines no hover state; mechanics/03 parity floor", "observable": "zero MouseEnter, MouseLeave and MouseMoved connections in game/src/client/" },
      { "id": "F14", "what": "a gamepad focus-move cue on SelectionGained or SelectionLost", "ruling": "cid: decided - same parity ground; navigation.selectability.selectableCount is 4 and constant", "observable": "zero SelectionGained and SelectionLost connections in game/src/client/" },
      { "id": "F15", "what": "toggle, switch or checkbox feedback of any kind", "ruling": "no toggle exists: input is a closed five-verb list, navigation.notNodes includes settings, 04-PRESENTATION.md declined the options pass", "observable": "input.verbs has 5 entries and gameDrawnPressables is 4; no composition or screens node has a two-state interactive role" },
      { "id": "F16", "what": "slider drag, tick, detent or release feedback, including a volume slider", "ruling": "same as F15; the in-game volume control this would sound does not exist", "observable": "zero GuiObject with a drag or slider role in composition.elements and screens[index].tree" },
      { "id": "F17", "what": "any platform UI sound THIS DOMAIN adds to, replaces or suppresses - platform menu, chat, purchase chrome", "ruling": "cid: decided - navigation/03 has the game do nothing on MenuOpened; U8; holds under either answer to the research owed. Scoped to UI sound: mix owns SoundService configuration and this row does not reach it (RR-6)", "observable": "no module that plays a uiSound cue writes a SoundService property or overrides CoreGui or RbxCharacterSounds; mix's boot-time AmbientReverb, DopplerScale, RolloffScale and DistanceFactor writes are outside this row" },
      { "id": "F18", "what": "a join, splash, logo or first-frame cue", "ruling": "onboarding/03 T5 and T6; a join sound has no player action behind it", "observable": "no cues[] row whose cause names join, PlayerAdded, CharacterAdded or the first snapshot" },
      { "id": "F19", "what": "a scroll tick, rubber-band or overscroll sound in the index panel", "ruling": "screens/01 - the panel has no scroll region", "observable": "screens[index].tree contains zero ScrollingFrame nodes" },
      { "id": "F20", "what": "a per-slot fill sound when a collection slot resolves", "ruling": "the reveal is B1 and owns atPatch plus audio; the Audio check is one stinger per reward moment, not two", "observable": "no uiSound cue names a Slot_* node or screens[index]" },
      { "id": "F21", "what": "any sound for an empty, unrevealed or locked slot", "ruling": "theme/tone/04 D8 and D11 in the audio channel", "observable": "no cues[] row whose cause names an unrevealed Find or an empty slot" },
      { "id": "F22", "what": "a daily-login chime, streak escalation or login-reward sting", "ruling": "03-META.md priority 3 - daily rewards", "observable": "uiSound contains no string matching daily, login, streak or reward" },
      { "id": "F23", "what": "a code-redeem or code-entry sound", "ruling": "03-META.md priority 3 - codes; theme/tone/04 D10", "observable": "uiSound contains no string matching code or redeem" },
      { "id": "F24", "what": "a leaderboard, rank, percentile or placement cue", "ruling": "03-META.md priority 3 - leaderboards; theme/tone/04 D7; social/03 X11", "observable": "uiSound contains no string matching leaderboard, rank or percentile" },
      { "id": "F25", "what": "a trade, gift or send sound", "ruling": "03-META.md priority 3 - trading; social/03 X11", "observable": "uiSound contains no string matching trade, gift or send" },
      { "id": "F26", "what": "a seasonal, holiday, anniversary or event sting", "ruling": "03-META.md priority 3 - seasons and events; OPEN.md ships and settles; theme/tone/04 D15", "observable": "uiSound contains no string matching season, event, holiday or anniversary" },
      { "id": "F27", "what": "a returning-player or welcome-back greeting, including an offline-accrual return cue", "ruling": "03-META.md priority 3 - offline accrual; theme/tone/04 D15", "observable": "uiSound contains no string matching welcome, returning, back or offline" },
      { "id": "F28", "what": "a rebirth, prestige or reset sting", "ruling": "03-META.md priority 3 - rebirth; 01-FOUNDATION.md cleared is permanent; rebirth is in vocabulary.bannedWords", "observable": "uiSound contains no string matching rebirth, prestige or reset" },
      { "id": "F29", "what": "any reserved SoundGroup, empty cue slot, unused bus, placeholder id or future/planned/tbd field held open for F22-F28", "ruling": "the category scope gate: naming a priority-3 subject to forbid it is compliant, reserving space for it is not", "observable": "every cues[] row has a non-empty cause and a named playSite; uiSound contains no key named reserved, future, planned, tbd or placeholder" }
    ]
  }
}
```

## Acceptance criteria

1. The merged `uiSound.forbidden` has exactly 30 rows with ids `F1` through `F30`, each carrying a
   non-empty `what`, `ruling` and `observable`; 29 of them are supplied by this sheet and `F30` by
   sheet `04`, and `uiSound.forbiddenCount` is 30.
2. `game/src/client/` contains zero `MouseEnter`, `MouseLeave`, `MouseMoved`, `SelectionGained`
   and `SelectionLost` connections, and **no module that plays a `uiSound` cue writes any
   `SoundService` property**. `mix`'s own boot-time `SoundService` configuration —
   `AmbientReverb`, `DopplerScale`, `RolloffScale`, `DistanceFactor` — is outside this criterion
   and is not counted by it.
3. `uiSound` contains no string matching any of `rebirth`, `prestige`, `daily`, `login`, `streak`,
   `code`, `redeem`, `leaderboard`, `rank`, `trade`, `gift`, `season`, `event`, `holiday`,
   `offline`, `welcome`, `reserved`, `future`, `planned`, `tbd` or `placeholder`.
4. Every `uiSound.cues[]` row has a non-empty `cause` and a `playSite`, and
   `uiSound.permittedCueCount` (3) is less than `uiSound.forbiddenCount` (30).

## Not decided here

Whether the one system notice makes a sound, and the `F30` row itself — sheet `04`, this domain,
which carries it so it is not written twice. The press-edge ruling `F3` cites, and the whole
permitted cue set — sheet `01`. The two index cues and the respawn close path — sheet `02`. Every
plate, motion, string and surface these rows sit beside — `notices` (`ui-ux/feedback`) and
`composition` (`ui-ux/hud`); five rows here are its rulings in the audio channel and re-decide
none of them. **Every `SoundService` and `SoundGroup` value, including `AmbientReverb`,
`DopplerScale`, `RolloffScale` and `DistanceFactor`, plus volume, buses, roll-off, the concurrency
cap and the MB allowance — `mix`; `F17` and criterion 2 are scoped off them and forbid none.**
Whether an options, volume or mute surface should exist at all — the developer, via
`04-PRESENTATION.md`'s declined pass; the consequence of its absence is `mix`'s to state. Whether
Roblox CoreScripts play any sound on platform-menu open or close — `[research owed]` above; the
`F17` ruling stands either way. The platform's default character sounds (footstep, jump, landing)
— SFX, category gap `G4`; they are in-world sound and not interface sound. Whether any of these
greps becomes a `bridge/merge.mjs` check or stays a build-report item — contract-and-seam work.
