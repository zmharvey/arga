# 02 — Index Open and Close

**Domain:** audio/ui · **Category:** Audio · **Wave:** 6

## Decision

**Yes, and they are two cues, not one: `indexOpen` and `indexClose`, both fired at the
`Pressable_INDEX` `Activated` handler and nowhere else.** They are the only two non-beat cues in
the game. **The respawn close is silent** — `navigation.respawn.outcome` is `"close"` with no
player activation, and this key's whole permitted set is defined as *a player activated a
control*. Gamepad `B` reaches the same toggle path and therefore the same cue, best-effort.
There are **four** activatable controls, not five: `navigation/03` withdrew the drawn close
glyph, so the category's surface list and this domain's index gap `U7` are both stale.

## Why

**The permission is sheet `01`'s and is spent exactly here.** `01` rules that a cue may fire on a
press edge only where `verb.adjudicatedBy == "client"` and `verb.precondition == "none"`.
`input.verbs[openIndex]` is `{ "adjudicatedBy": "client", "precondition": "none" }`
`[research: cid/gameplay/mechanics/02-verb-roster.md]`, so this edge has **no failure case at
all** and `input` acceptance criterion 4 does not reach it. That is the entire difference between
this sheet and `01`, it is a field rather than a judgement, and it is carried below as data so
nothing widens it by analogy. U1 is inherited from `01` and not re-decided.

**Two cues, because this is the only mode change in the game.** `input.pressable.
indexScreenSuspendsMovement` is `true`. Everywhere else `response.controlEverAffected` is `false`
and `lockoutsSeconds` is `0`, so the player's controls are never interrupted
`[research: cid/gameplay/mechanics/05-response-contract.md]`. A phone player with a thumb on the
movement stick loses response at open and regains it at close. One symmetric cue says *a mode
changed*; it does not say **which way**, and which way is the only thing that differs between the
two edges `[cid: decided]`. The panel itself is `0.94 × 0.86` of the viewport
`[research: cid/ui-ux/screens/01-collection-index.md]`, so audio is nowhere near the sole carrier
here and the cue pair is confirmation of a change the player can also see occupy most of the
screen — which is why two cues cost nothing in the muted case and buy something in the audible one.

**Why the respawn close is silent.** `navigation/02` makes `CharacterAdded` close the panel and
records `isABeat: false`; its only route is the platform menu's Reset Character
`[research: cid/ui-ux/navigation/02-concurrency-and-suspension.md]`. The player asked to respawn;
they did not ask to close the panel. A cue there would be this key announcing a state change it
made on its own, and it would land among a character rebuild, a camera cut and a movement restore
with no ordering rule, because `response` sequences only its own five beats and this is none of
them. Scoping every `uiSound` cue to a player activation is what makes the set countable
`[cid: decided]`.

**Why not one cue reused at both edges.** Rejected on the argument above and on one arithmetic:
one asset saves at most a fraction of a megabyte against `budgets.memoryCeilingsByCategory.
Sounds` 20 MB, which is `mix`'s to spend across six domains, and buys a cue that is ambiguous at
the one moment in the game where the player's controls stop. Two short assets is the cheaper
mistake to correct.

**No beat, no budget, and no sixth beat proposed.** `response` defines five beats and five
budgets and no non-beat cause (U2). `openIndex` fires no remote and crosses no wire
`[research: cid/gameplay/mechanics/02-verb-roster.md]`, so the only latency in the path is
`Sound:Play()` on a resident asset. I state `acknowledgmentBudgetMs` 100 inside this key,
`[playtest unknown]`, test range 50 to 200, and route the observation to `response` as `RQ4` in
sheet `01` rather than adding a beat.

**Loudness.** Both cues sit strictly below `B4` under `01`'s `loudnessOrder`. Opening a panel is
not a payoff and `theme/tone/03` gives the game exactly one recurring emphasis between beats
`[research: cid/theme/tone/03-beat-map.md]`. `mix` sets the levels; I set the ordering.

**Nothing here carries a string.** There is no close glyph and no label change between the two
meanings of `Pressable_INDEX` — `composition` fixes `Finds` / `Parts` and `navigation/03` adds no
state-dependent string `[research: cid/ui-ux/navigation/03-close-and-focus-by-device.md]`. So
`vocabulary` has nothing in this sheet to bind, in either direction.

**The control is inert until the first Find**, per `navigation.selectability.
pressableIndexSelectableFrom`. Neither cue can fire before then, and the moment the control
becomes interactive is a **lift**, which is silent under sheet `03`. Two different events, two
different rulings, and neither leaks into the other.

**One asset per cue, and both are the sentinel until provisioned**, written through `mix`'s
unprovisioned form with the play-site guard `01` states, since an id that will not load errors in
the console rather than failing silently
`[research: https://devforum.roblox.com/t/failed-to-load-soundid-error-spam-extreme-log-file-sizes/2225682]`.

```manifest
{
  "amends": "uiSound",
  "value": {
    "activatableControls": {
      "count": 4,
      "members": ["Pressable_BUY1", "Pressable_BUY2", "Pressable_BUY3", "Pressable_INDEX"],
      "drawnCloseGlyphExists": false,
      "drawnCloseGlyphRuling": "navigation/03 closeControl.separateDrawnCloseControlExists is false; screens/01 hasCloseControl is false with CloseButton in forbiddenNodes",
      "correctsStaleClaim": "cid/audio/_category.md row D and cid/audio/ui/_lead.md U7 both assume a fifth activatable object; navigation has since dropped it and the set is constant at four, open or closed"
    },
    "cues": [
      {
        "id": "indexOpen",
        "beat": null,
        "isBeat": false,
        "cause": "Pressable_INDEX activated while the index node is closed",
        "verb": "openIndex",
        "adjudicatedBy": "client",
        "precondition": "none",
        "firesNoRemote": true,
        "playSite": "the Pressable_INDEX Activated handler in the client module owning the toggle (game/src/client/IndexScreen.luau today; the module is representation's to name)",
        "devices": ["touch", "keyboard", "gamepad"],
        "acknowledgmentBudgetMs": 100,
        "budgetTestRangeMs": [50, 200],
        "budgetPlaytestUnknown": true,
        "budgetGrounds": "client-adjudicated, no remote, no wire; the only cost is Play() on a resident asset",
        "audibleSeconds": 0.25,
        "audibleTestRangeSeconds": [0.12, 0.4],
        "audiblePlaytestUnknown": true,
        "audibleCeilingRule": "audibleSeconds <= input.pressable.debounceSeconds (0.35)",
        "variesBy": "nothing",
        "variesByForbidden": ["how many Finds are held", "which sets are complete", "area ordinal", "depth", "device class", "run ordinal"],
        "assetCount": 1,
        "soundId": "",
        "sourceClass": "creatorStore",
        "channels": 1,
        "spatialisation": "2D",
        "quieterThan": "upgradePurchased",
        "carriesString": false
      },
      {
        "id": "indexClose",
        "beat": null,
        "isBeat": false,
        "cause": "Pressable_INDEX activated while the index node is open",
        "verb": "openIndex",
        "adjudicatedBy": "client",
        "precondition": "none",
        "firesNoRemote": true,
        "playSite": "the same Pressable_INDEX Activated handler; the toggle's other branch",
        "devices": ["touch", "keyboard", "gamepad"],
        "gamepadBReachesThisCue": true,
        "gamepadBIsBestEffortOnly": true,
        "gamepadBGrounds": "navigation/03 permits B as a best-effort extra and never relies on it; it reaches the same toggle path, so it reaches the same cue with no second play site",
        "acknowledgmentBudgetMs": 100,
        "budgetTestRangeMs": [50, 200],
        "budgetPlaytestUnknown": true,
        "audibleSeconds": 0.25,
        "audibleTestRangeSeconds": [0.12, 0.4],
        "audiblePlaytestUnknown": true,
        "audibleCeilingRule": "audibleSeconds <= input.pressable.debounceSeconds (0.35)",
        "distinctFromIndexOpen": true,
        "distinctReason": "indexScreenSuspendsMovement is true, so these are the only two moments in the game where the player's controls stop and start; one cue cannot say which way",
        "variesBy": "nothing",
        "assetCount": 1,
        "soundId": "",
        "sourceClass": "creatorStore",
        "channels": 1,
        "spatialisation": "2D",
        "quieterThan": "upgradePurchased",
        "carriesString": false
      }
    ],
    "closePaths": [
      { "path": "tap Pressable_INDEX", "devices": ["touch"], "playsIndexClose": true },
      { "path": "click Pressable_INDEX", "devices": ["keyboard"], "playsIndexClose": true },
      { "path": "activate Pressable_INDEX with A/cross", "devices": ["gamepad"], "playsIndexClose": true },
      { "path": "gamepad B", "devices": ["gamepad"], "playsIndexClose": true, "bestEffort": true },
      { "path": "respawn (CharacterAdded while open)", "devices": ["touch", "keyboard", "gamepad"], "playsIndexClose": false, "ruling": "navigation.respawn.outcome is close with no player activation and isABeat false; every uiSound cue is scoped to a player activation" },
      { "path": "platform menu opened", "devices": ["touch", "keyboard", "gamepad"], "playsIndexClose": false, "ruling": "navigation/03 - the panel is unchanged on MenuOpened, so there is no close and therefore no edge" }
    ]
  }
}
```

## Consequences for other work

- **Mix work (`mix`)** takes two more 2D cues, both below `B4`, both at 0.25 s, into its bus tree,
  its preload set and its concurrency arithmetic. Neither can coincide with a beat by design —
  they fire on a player activation, and `response`'s four sequenced beats fire on a server
  decision — but nothing prevents an accidental overlap and no ducking rule covers a non-beat.
- **Navigation work (`navigation`)** gains an audio consumer for `respawn.outcome: "close"` and
  should not read this sheet as a request to change it: the close **happens**, and only the sound
  is withheld. Its `closeControl.ifThatDependencyIsReleased` clause is the one thing that would
  reopen this sheet, because a fifth pressable is a fifth cue site.
- **Index-panel work (`screens`)** is asked for nothing. A cue attaches to `Pressable_INDEX`,
  which sits outside `IndexSurface` and is guaranteed uncovered by
  `screens[index].geometry.mustNotIntersect`. No node inside the panel makes any sound.
- **Instance-representation work (architect sheet `06`)** inherits a second named play site for
  `RQ2` alongside `Beats.luau`: whichever module owns the `Pressable_INDEX` toggle needs a
  `Sound` it may create or reach.
- **Whoever maintains `cid/audio/_category.md`** owns a correction: its surface list row for the
  panel close control, and this domain's `U7`, both assume a fifth activatable object that
  `navigation/03` has withdrawn. The set is constant at four.
- **Onboarding work (`firstSession`)** is untouched. The lift that makes `Pressable_INDEX`
  interactive is silent under sheet `03`; only a subsequent activation sounds.

## Acceptance criteria

1. `uiSound.cues[]` contains exactly two rows with `isBeat: false` and `beat: null`, ids
   `indexOpen` and `indexClose`, each with `assetCount` 1 and `audibleSeconds <= 0.35`.
2. `uiSound.closePaths[]` has exactly six rows; the row whose `path` names `respawn` has
   `playsIndexClose: false`, and `game/src/client/` contains zero `Sound` play calls reachable
   from a `CharacterAdded` handler.
3. Every play site named by an `indexOpen` or `indexClose` row resolves to the
   `Pressable_INDEX` `Activated` handler, and no `uiSound` cue names a node inside `IndexSurface`.
4. `uiSound.activatableControls.count` is `4` and its `members` array equals
   `navigation.selectability.selectable`.

## Not decided here

Whether a purchase press makes a sound and how `B4` is played — sheet `01`, this domain, which
holds the key and rules the press-edge condition this sheet spends. Every silent interface moment,
including the index-panel lift and the failed press — sheet `03`, this domain. Whether the system
notice makes a sound — sheet `04`, this domain. Volume, bus assignment, ducking when either cue
overlaps a beat, roll-off, the concurrency cap, the MB allowance and the sentinel's value — `mix`;
this sheet mirrors its form and sets none. Which physical input triggers the `closeIndex` edge on
each device class, where focus goes, and whether a fifth pressable ever exists — `navigation`
(`ui-ux/navigation/03`), whose rulings this sheet reads and does not move. The panel's extent,
anchor and internal layout — `screens`. What suspends movement and how — `input` and
`navigation/02`. Which module creates the `Sound` — instance-representation work, architect sheet
`06`.
