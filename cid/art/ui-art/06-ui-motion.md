# 06 — What may move on an interface surface

**Domain:** art/ui-art · **Category:** Art & Visuals · **Wave:** 6

## Decision

**Two things move on any interface surface in this game and nothing else does.** A pressed
control scales to 0.94 over 0.11 s with `quad` easing and returns; a notice plate fades at
`feedback/01`'s 0.15 s, which is cited here and set there. `easing: 'back'` is deleted: it is
`Enum.EasingStyle.Back`, an overshoot, and a bounce on every purchase is the candy language the
brief argued against by name.

## Why

**Motion is not archetype-derived, which is the finding this sheet exists for.**
`actionButton()` hard-codes `states.hover.scale 1.05`, `states.pressed.scale 0.94` and
`motion: { duration: 0.11, easing: 'back' }` at `hud-overlay.mjs:191-197`
`[research: ui-forge/src/compose/patterns/hud-overlay.mjs]`. `back` maps to
`Enum.EasingStyle.Back` in `UIBuilder.luau:26-33`, an overshoot: the control springs past its
rest size on release. **Correcting the archetype removes the purple and leaves the bounce**,
because no archetype token reaches any of those three values. Sheet `01` would have shipped a
warm, aged, aged-stone interface that boings.

**One value is wrong and it is the easing, so one value moves.** 0.11 s is 110 ms, inside the
200 ms acknowledgment budget `response.upgradePurchased` allows, so the duration is already
compatible with an approved key and I am not touching it. A 6% shrink is an acknowledgment, not a
cartoon, so 0.94 stays. `quad` is what `applyStates` already defaults to when `easing` is absent
(`UIBuilder.luau:308`), and it is stated explicitly rather than left to a default, because a
default is a value a builder invents. **A stated wrong answer can be corrected; two invented
numbers cannot.** `[cid: decided]`

**The hover state is deleted, not retimed.** `applyStates` reaches hover only through
`MouseEnter` (`:331`), which touch never fires, so a hover scale is spent on nothing for ~70% of
this audience. Sheet `05` carries the ruling; this sheet carries its motion consequence, which is
that `states.hover` disappears and release returns the control to base through `to(nil)`.

**The zeros are the substance of this sheet.** `theme/tone/04` `D6` bans any pulsing or blinking
element; `theme/tone/03` `B5` fixes exactly one intensity forever with *"no crescendo near
completion"*; `firstSession` `S6`/`S7` make a lift silent and still and `suppressionForbidden`
bans reflow; `screens/01`'s `forbiddenNodes` already names `fillAnimation`, `liftAnimation`,
`tween`, `pulse` and `blink`; `notices.motion.animated` is `false`. None of that is re-derived
below. What the table adds is the emitter-level mechanisms those rules do not name, which are the
ones a builder reaches for: `motion.enter`, the `CanvasGroup` that a subtree fade implies, a
numeral roll-up, a colour tween on a state change, and a stroke-thickness tween, which the
platform warns against directly: *"Avoid tweening the `Thickness` property of a `UIStroke`
instance applied to text objects"*
`[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/ui/appearance-modifiers.md]`.

**The token group, and the exact key it must be written as.** `generate.mjs:172-176` splits an
additive group name on `.` and routes to `theme.color` **only** when the root segment is literally
`color`; otherwise the target is the theme root and **the root segment is discarded**. So a
top-level motion group must be written `<anything-but-color>.motion`, and `"motion.ui"` would
silently create `theme.ui`. I fix the key as **`"ui.motion"`**, which lands at `theme.motion`
under today's code with no change to `generateTheme`. `A8` therefore asks for an assertion, not a
behaviour change: a group whose root is neither `color` nor a documented namespace should throw,
the way `deepSet` already throws on an unknown override path. **My key does not depend on `A8`
landing**, which is the point of choosing a group name that is already correct.

**A group nothing reads is a value with no consumer, so the readers are named.** Today **nothing
reads a motion token**: `applyStates` takes `node.motion.duration` as a raw number from the spec.
The chain is `uiTheme.motion` → the brief → `actionButton()` / the pressable readout → the node's
`motion` block → `applyStates`. The pattern change is `A7`, and it is the same function
`hud/03` `U1` and `U3` already rewrite, so **it folds into `U1` and is not filed twice**. If `U1`
is refused, the numbers below stay hard-coded in the pattern and the correction to `back` must be
made in `hud-overlay.mjs` directly, which is a one-word edit either way.

| what | permitted | duration | easing | property |
|---|---|---|---|---|
| a control is pressed | yes | 0.11 s | `quad`, Out | `UIScale.Scale` 1 → 0.94 |
| a control is released | yes | 0.11 s | `quad`, Out | `UIScale.Scale` → 1 |
| a notice plate appears or leaves | yes, and not mine | 0.15 s | `feedback/01`'s | `notices.motion.fadeInSeconds` / `fadeOutSeconds` |
| the collection group fades on its lift | yes, and not mine | `hud-binding`'s `collectFade` | same | `composition` and readout-writing work own it |
| hover | **no** | 0 | — | `MouseEnter` never fires on touch |
| entrance animation (`motion.enter` pop / fade-scale / slide-up) | **no** | 0 | — | zero nodes carry `motion.enter`, so zero `CanvasGroup`s are created |
| the progress bar filling | **no** | 0 | — | `BarFill.Size` is written, never tweened |
| a numeral counting or rolling up to its new value | **no** | 0 | — | `ReadoutValue.Text` is written |
| a colour changing on an affordability change | **no** | 0 | — | the state is written, not tweened |
| `UIStroke.Thickness` tweening | **no** | 0 | — | the platform warns against it on text objects |
| a panel opening, closing, scaling or sliding | **no** | 0 | — | the index appears and disappears whole |
| a scrim, dim, blur or vignette fading | **no** | 0 | — | there is no scrim; `D2` |
| rotation of any interface node | **no** | 0 | — | `applyStateProps` supports it; nothing uses it |
| reflow or layout animation | **no** | 0 | — | `firstSession.suppressionForbidden` |
| camera move, shake, zoom, screen flash, slow motion | **no** | 0 | — | `theme/tone/04` `D5` |
| a pulse, blink, glow throb or attention loop | **no** | 0 | — | `D6`; `theme/setting/03`: no idle, loop or attract animation anywhere |
| any duration or amplitude that is a function of progress, streak, count, elapsed time or depth | **no** | 0 | — | `theme/tone/03` `B5` |
| a transition marking passage, area entry or a returning player | **no** | 0 | — | `theme/setting/04` |

```json
{
  "amends": "uiTheme",
  "requested_by": "cid/art/ui-art/06-ui-motion.md",
  "value": {
    "tokens": {
      "ui.motion": {
        "pressScale": 0.94,
        "pressSeconds": 0.11,
        "pressEasing": "quad",
        "releaseSeconds": 0.11,
        "maxDurationSeconds": 0.15
      }
    },
    "tokenGroupNotes": {
      "landsAt": "theme.motion",
      "why": "generate.mjs:172-176 splits the group name on '.', routes to theme.color only when the root segment is literally 'color', and otherwise writes to the theme root while discarding the root segment; 'motion.ui' would silently create theme.ui",
      "readers": [
        { "file": "ui-forge/src/compose/patterns/hud-overlay.mjs", "function": "actionButton(a) and the pressable readout", "status": "does not read it today; A7, folded into hud/03 U1" },
        { "file": "ui-forge/src/emit/runtime/UIBuilder.luau", "function": "applyStates(inst, theme, node)", "status": "reads node.motion.duration and node.motion.easing already; needs no change once the pattern passes them through" },
        { "file": "game/src/client/HudBinding.luau", "function": "collectFade", "status": "may read theme.motion if it wants a token home; its duration is composition's and is not set here" }
      ],
      "fieldKinds": { "maxDurationSeconds": "ceiling", "pressScale": "value", "pressSeconds": "value", "pressEasing": "value", "releaseSeconds": "value" },
      "ceilingRule": "maxDurationSeconds may only bound a comparison; no duration may be derived from it, per ui-ux/platform/02"
    },
    "motion": {
      "allowed": [
        { "id": "press", "trigger": "MouseButton1Down on a game-drawn pressable", "property": "UIScale.Scale", "from": 1, "to": 0.94, "durationSeconds": 0.11, "easing": "quad", "direction": "Out" },
        { "id": "release", "trigger": "MouseButton1Up", "property": "UIScale.Scale", "to": 1, "durationSeconds": 0.11, "easing": "quad", "direction": "Out" }
      ],
      "citedNotSet": [
        { "id": "noticeFade", "owner": "notices (ui-ux/feedback/01)", "field": "notices.motion.fadeInSeconds / fadeOutSeconds", "value": 0.15, "note": "deliberately not duplicated into this key" },
        { "id": "collectFade", "owner": "composition and readout-writing work", "note": "the one module-side fade; its duration is not this key's" }
      ],
      "zero": ["hover", "motion.enter (pop, fade-scale, slide-up)", "CanvasGroup subtree fade", "progress-bar fill tween", "numeral roll-up", "colour tween on a state change", "UIStroke.Thickness tween", "panel open/close/scale/slide", "scrim or blur fade", "node rotation", "layout reflow animation", "camera move, shake, zoom", "screen flash, slow motion, freeze frame", "pulse, blink, glow throb, attract loop", "any duration or amplitude read from progress, streak, count, elapsed time or depth", "any transition marking passage or area entry"],
      "canvasGroupCount": 0
    },
    "uiForgeChanges": [
      { "id": "A7", "file": "ui-forge/src/compose/patterns/hud-overlay.mjs", "at": "actionButton(a) and the new pressable readout, lines 178-198", "change": "take states and motion from the brief rather than hard-coding scale 1.05/0.94 and duration 0.11 / easing 'back'; emit no states.hover and no states.disabled", "foldInto": "hud/03 U1", "fileTwice": false, "refusable": true, "ifRefused": "the values stay hard-coded and the easing correction is a one-word edit in the same function; nothing about this key changes" },
      { "id": "A8", "file": "ui-forge/src/theme/generate.mjs", "at": "the additive-tokens loop, lines 172-176", "change": "throw on a group whose root segment is neither 'color' nor a documented namespace, instead of silently discarding it", "refusable": true, "dependedOnByThisKey": false, "why": "'ui.motion' is already routed correctly today; the assertion protects the next key, not this one" }
    ],
    "buildReportFindings": [
      { "id": "M1", "where": "ui-forge/src/compose/patterns/hud-overlay.mjs:191-197", "finding": "every motion and state value on the only interactive HUD element is hard-coded and archetype-independent, so no archetype swap can ever change how anything moves", "playerVisible": true, "twoBuildersWouldDiverge": true },
      { "id": "M2", "where": "ui-forge/src/theme/generate.mjs:172-176", "finding": "an additive group named 'motion.ui' silently creates theme.ui; the root segment is discarded unless it is literally 'color'", "playerVisible": false, "twoBuildersWouldDiverge": true }
    ]
  }
}
```

## Consequences for other work

- **`ui-forge` pattern work** takes `A7` **inside** `hud/03` `U1`, not beside it. Two sheets
  filing one edit against one function is the duplication the final cross-category pass was asked
  to remove.
- **Purchase-control work (`pressables`)** gets the only animation in the game it is responsible
  for, and a prohibition: no `TweenService` call in `game/src/client/` outside the press handler.
- **Feedback work (`notices`)** keeps `motion.animated: false` and both 0.15 s fades. This sheet
  cites them, sets neither, and adds a ceiling that both already satisfy.
- **VFX work (`effects`)** inherits the boundary rather than a rule: everything above is interface
  motion. The clear residue at 0.4 s and the reveal dwell at 2.5 s are `response`'s and VFX's, and
  a world cue is not bounded by `maxDurationSeconds`.
- **Audio work** inherits one join: a UI sound accompanying a press has 0.11 s of visible motion to
  sit against, and `theme/tone/03` `B4` allows a purchase cue in audio and UI only.
- **Contract-and-seam work** gets `A8` as a cheap assertion and `M2` as the reason.

## Acceptance criteria

1. `grep -rn "EasingStyle.Back\|easing: 'back'" ui-forge/src game/src` returns nothing.
2. The built HUD and index contain zero `CanvasGroup` instances, and `game/src/client/` contains
   no `TweenService:Create` call outside the press and release handlers.
3. `uiTheme.motion.allowed` has exactly two entries, and every property named in
   `uiTheme.motion.zero` has no animation of any duration anywhere in `game/src/`.

## Not decided here

The notice fade, the dwell figures and whether a notice is animated at all: `notices`
(`ui-ux/feedback/01`), which owns `motion.animated: false` and both 0.15 s values.
`collectFade`'s duration: `composition` and readout-writing work. What a clear, a reveal or an
area completion looks like in the world, and for how long: VFX work (`effects`) under `response`.
What any beat sounds like: Audio. Which control is pressed, when it becomes interactive and what
a press does: `input`, `navigation` and `composition`. The archetype, the token values, the type
ramp, the icon count and the pressable state appearance: sheets `01` to `05` of this domain.
Whether `generateTheme` grows a documented namespace list: contract-and-seam work, via `A8`.
