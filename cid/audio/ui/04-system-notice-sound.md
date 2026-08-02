# 04 — System Notice Sound

**Domain:** audio/ui · **Category:** Audio · **Wave:** 6

## Decision

**No. `Saved Progress Did Not Load. New Progress Is Not Kept.` is silent.** The permission to
sound it existed and I declined it: it is not a beat, so `response.negativeBeats: 0` never reached
it, and sheet `01` rules a non-beat cue class admissible. It is a **`forbidden[]` row with its
reason**, `F30`, not an omission. If the plate is ever judged to be missed, the fix is
`notices.members[saveNotLoaded].dwellSeconds` — 5.0 s inside a `[4.0, 8.0]` range with a 5.0 s
ceiling of headroom to spare — as a revision request against `ui-ux/feedback/03`, and never a
sound added to this key.

## Why

**The permission was real, and stating it is half the ruling.** `notices.systemNoticesAreBeats` is
`false` and `systemNoticesEnterBeatScheduler` is `false`, so this member never enters
`Beats.connect`'s queue `[research: cid/ui-ux/feedback/03-system-notices.md]`.
`response.negativeBeats: 0` governs failures *in the game's rules* — there are none, because
`theme/tone/04` `D12` removed every one — and a DataStore read failure is not one of them
`[research: cid/gameplay/mechanics/05-response-contract.md]`. So nothing in either contract
forbade this sound before this sheet, and no sheet in either contract decided it. This is the
only genuinely open question the domain was handed.

**Every sound that could express the cause is banned, and what is left cannot.**
`theme/tone/04` `D3` forbids *"a minor-key sting, a dissonant or detuned interval, a sub-bass
drone"* and `D4` forbids *"an announcer voice line … an air horn, a riser"*; `D6` forbids
anything reading as *"a red alert state, a pulsing or blinking element"*
`[research: cid/theme/tone/04-do-nots.md]`. What survives inside the palette is a warm, consonant,
unhurried cue — which is to say, a cue indistinguishable from the confirmation `B4`. A sound that
cannot express its own cause is decoration on a failure, and adding it would put the game's only
"something went wrong" moment in the same timbre as its only "it worked" moment `[cid: decided]`.

**The decisive argument is that nothing is actionable.** `notices.forbiddenAdditions[retryControl]`
bans a retry, reload or reconnect control; `rejoinInstruction` bans any string telling the player
to come back; `notices.interaction.dismissible` and `.focusable` are both `false`. So the plate is
a statement of fact with no response available. A sound's function is to redirect attention, and
redirecting attention to a message the player cannot act on spends the only alarm this game has on
a moment where the alarm changes nothing `[cid: decided]`. `02-GAMEPLAY.md`'s *"nobody downstream
should invent tension to fill the gap"*, relayed at `[brief: binding]` strength by `theme/tone/03`,
is the brief line this binds to: an unactionable alarm is manufactured tension by definition.

**The plate fires at the moment attention is least specialised.** `firesAt` is *"the first
snapshot that carries the unreadable flag"*, which is at join, and `firstSession` puts three
surfaces on screen at the first frame with join values so the HUD stands at zeros rather than
blank `[research: cid/ui-ux/feedback/03-system-notices.md]`. A player who has not yet moved is
looking at a screen, not at a patch under their feet. That is an argument, not a measurement, and
I mark it as such: whether the plate is actually read is `[playtest unknown]`, and **no instrument
in this project can settle it** — the fire rate is server-observable, the read is not. Naming that
honestly is better than inventing a threshold I have no way to test against.

**Not decided on the muted-player premise, in either direction.** The category's *"a large share
of sessions run muted"* line is unsourced; the one available survey reports 34.9% always / 23.6%
often / 19% sometimes / **9.3% never** playing with sound, n=541, general mobile and neither
Roblox-specific nor 8–14
`[research: https://www.international-sound-directory.com/2025/12/07/do-people-really-play-mobile-games-without-sound-myth-or-reality/]`.
That figure would be an argument *for* a sound as often as against one, and the ruling rests on
`D3`/`D6` and on unactionability instead. `audioOnlyBeats: 0` is unaffected either way: this is
not a beat and the plate is its only channel, so a sound could only ever have been a second one.

**Cost of the ruling, stated.** One asset saved against a 20 MB shared ceiling for an event that
fires at most once per session and only when a DataStore read fails — the rarest player-facing
event in the game. `00-CORE.md`'s *"the smallest game that still gives every creative area real
work"* `[brief: binding]` ← `[you chose: R1 Q3]` makes that the correct direction to be wrong in,
because a ruling is one line to reverse and an asset is an upload, a permission grant and a budget
line.

## Flagged to the developer

This is the one moment in this game where something has genuinely gone wrong for the player, and
the brief recorded audio intent at **0 questions** (`OPEN.md §1`, category gap `G8`), so the
ruling is `[cid: decided]` against a silent brief.

- **(a) As ruled — silent.** Recommended. Costs nothing and is reversible in one row.
- **(b) A warm, consonant, sub-`B4` cue at 0.3 s.** Buys attention at the moment the plate
  appears; costs one asset, one upload, one permission grant, and a cue that sounds like the
  purchase confirmation because `D3`, `D4` and `D6` leave nothing else inside the palette.
- **(c) Raise `notices.members[saveNotLoaded].dwellSeconds` from 5.0 toward its 8.0 test-range
  ceiling.** The non-audio route to the same goal, owned by `ui-ux/feedback/03`, and the route
  this sheet recommends if (a) is ever judged insufficient.

```manifest
{
  "amends": "uiSound",
  "value": {
    "systemNoticeRuling": {
      "member": "notices.members[saveNotLoaded]",
      "text": "Saved Progress Did Not Load. New Progress Is Not Kept.",
      "makesSound": false,
      "isABeat": false,
      "negativeBeatsReachesIt": false,
      "negativeBeatsReason": "response.negativeBeats governs failures in the game's rules; this is an infrastructure failure and notices.systemNoticesAreBeats is false",
      "permissionExisted": true,
      "permissionDeclined": true,
      "declinedBecause": [
        "theme/tone/04 D3 and D4 ban every timbre that could express the cause, and D6 bans anything reading as an alert state; what survives is indistinguishable from B4",
        "nothing is actionable - notices.forbiddenAdditions bans a retry control and a rejoin instruction, and notices.interaction.dismissible and .focusable are false",
        "02-GAMEPLAY.md, relayed binding by theme/tone/03: an unactionable alarm is invented tension"
      ],
      "notDecidedOn": "the muted-player premise, which is unsourced in this repo and would argue both ways",
      "soleCarrier": "the plate, notices.members[saveNotLoaded], in the noticeStack anchor for 5.0 s",
      "carrierWasAlreadySole": true,
      "carrierWasAlreadySoleNote": "a sound would have been a second channel, never the carrier; audioOnlyBeats: 0 is untouched",
      "playSiteIfEverReversed": "Persistence's read-failure path reaching the client as one live never-persisted boolean, per notices/03 requiresWire; no new channel and no new field",
      "reversalRoute": {
        "preferred": "raise notices.members[saveNotLoaded].dwellSeconds within its [4.0, 8.0] test range",
        "preferredOwner": "ui-ux/feedback/03, as a revision request",
        "audioRoute": "a revision against this sheet naming F30",
        "notMeasurable": "whether the plate is read is unobservable by any instrument in this project; the fire rate is server-observable and the read is not",
        "playtestUnknown": true
      }
    },
    "forbidden": [
      { "id": "F30", "what": "any sound, sting, tone or tick accompanying the one system notice, at its onset, during its dwell or at its expiry", "ruling": "cid: decided - theme/tone/04 D3, D4 and D6 leave no timbre that expresses the cause, and the message is unactionable, so a cue redirects attention to something the player cannot answer. Not ruled on the muted-player premise, which is unsourced.", "observable": "uiSound.cues[] has no row whose cause names saveNotLoaded, Persistence, blockedSaves or readable; game/src/client/ plays no Sound reachable from the unreadable-flag handler" }
    ]
  }
}
```

## Consequences for other work

- **Feedback-UI work (`notices`)** keeps the plate as the sole carrier and inherits the reversal
  route: if this notice is ever judged missed, the request is against `dwellSeconds` inside its
  own `[4.0, 8.0]` range, not against Audio. Its `forbidden.noticeSound` is confirmed rather than
  contested — it authors no sound, and now neither does anyone else for this member.
- **Persistence and wire work (`protocol`, `replication`, `tech/persistence`)** is asked for
  **nothing by this sheet**. The one live boolean `notices/03` already requires is unchanged, no
  field is added, and no audio consequence rides on when it arrives.
- **Mix work (`mix`)** gets one fewer asset and one fewer bus consumer. The `uiSound` asset count
  closes at **three**, which is the figure its 20 MB per-domain split should be sized against.
- **Stingers work** is unaffected. This is not a beat, so nothing here touches `B1`, `B2` or `B3`
  and nothing competes for the `notice` channel's audio.
- **Screens work (`screens`)** keeps the index panel's own empty, loading and error states, all of
  which are silent by the same argument and by `F19`–`F21` in sheet `03`.

## Acceptance criteria

1. `uiSound.systemNoticeRuling.makesSound` is `false`, and `uiSound.forbidden` contains exactly
   one row with id `F30` naming `saveNotLoaded`.
2. `uiSound.cues[]` contains zero rows whose `cause` names `saveNotLoaded`, `Persistence`,
   `blockedSaves` or `readable`, and `uiSound.cues[]` has exactly 3 rows in total.
3. `notices.members[saveNotLoaded]` carries no `soundId` field and `notices.forbidden.noticeSound`
   is unchanged by this sheet.

## Not decided here

What the notice says, its dwell, its slot, its anchor and every interaction property — `notices`
(`ui-ux/feedback/01` and `/03`), which holds the key; this sheet decides only whether it is
accompanied by a sound. Whether `blockedSaves` is retried, whether the read failure is
recoverable, and whether a failed session is locked — `tech/persistence`. The field name, channel
and encoding of the boolean that carries it to the client — `protocol` and `replication`. The
press cue ruling and the permitted cue set — sheet `01`, this domain, which holds `uiSound`. The
index open and close cues — sheet `02`. The other twenty-nine silences — sheet `03`, which
deliberately does not carry `F30`. Whether a plate that is never read should exist at all —
`ui-ux/screens/02` raised it and `notices` answered it; not reopened here. Every volume, bus and
MB allowance a reversal would need — `mix`.
