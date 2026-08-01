# 03 — Device parity, as a check a build can fail

**Domain:** Mechanics · **Category:** Gameplay · **Wave:** 2

## Decision

**Every verb in sheet 02 must be reachable on all three device classes, touch, keyboard-and-mouse
and gamepad, and no verb's only path may be an input one device class lacks.** Since sheet 02 gives
the game exactly one bound input class, the whole of parity reduces to: **every pressable the game
draws is tappable, clickable and gamepad-selectable.** This sheet **carries no manifest block**: it
constrains `input.verbs[].devices` and `input.pressable` from sheet 02 and supplies no key of its own.

## Why

**G2.** The brief fixes the audience as "8–14, mobile-heavy, short sessions" `[brief: binding]` ←
`[you chose: R1 Q4]`, `00-CORE.md`, names a currency sink `[brief: soft]`, and never once says the
verb which spends it must work without a keyboard. The shipped surface binds purchase to keyboard
`1`, `2` and `3` and to nothing else `[research: game/src/client/Input.luau]`. That is the whole gap,
and it is a coverage failure rather than a design disagreement.

**No requirement here rests on the 70/25/5 split.** Those percentages are `[brief: soft]` ←
`[I assumed]`, `00-CORE.md`, and the wave-2 research pass states plainly that the ~70% mobile figure
is not corroborated by anything it fetched. The requirement rests on the band, which is binding.

**Gamepad is required despite ~5% console**, and the reason is recorded so nobody re-derives it: a
`GuiButton` is selectable on a gamepad for the cost of one property and one selection group, so
including gamepad is close to free. Had it cost a second code path, a figure the brief itself marks
assumed would have been too weak to justify it.

**The checks are narrowed to what the game binds, and that narrowing is the point.** An earlier
draft of this sheet asked for "zero pressables" and "every verb exercisable with the movement control
alone" — checks a correct build fails, because the platform draws a jump button on touch and `look`
needs a second finger there. Parity is a claim about the game's own surface; the platform's controls
are already parity-complete and are not mine to audit.

**Parity is not new scope.** "Three clearing upgrades" is already priority 1 `[brief: soft]`,
`03-META.md`; this sheet adds no system, it states that the verb which buys them must be reachable
by the audience already fixed, and turns that into five checks.

## The input class each verb requires

| verb | input class | bound by | what layout work must supply | what layout work must not do |
|---|---|---|---|---|
| `move` | continuous directional | the platform | nothing | occlude, replace, shrink or overlay the default movement control region |
| `look` | continuous free-look | the platform | nothing | lock, clamp, auto-frame or shake the camera for any beat |
| `jump` | discrete impulse | the platform | nothing | remove, re-purpose or re-label the default jump control |
| `buy` | discrete select | **the game** | three persistent pressables, each tappable, clickable and gamepad-selectable, reachable with no travel | require a hold, chord, drag, double-tap or keyboard key; hide them behind another screen; signal affordability by colour alone |
| `openIndex` | discrete select | **the game** | one pressable, same three activations | make its screen dismissible only by a control a device class cannot reach |

## The five checks

| # | check | passes when |
|---|---|---|
| P1 | activation parity | each of the 4 game-drawn pressables is activatable by a touch tap, a mouse click, and a gamepad selection; a run with each input class alone completes a purchase |
| P2 | device set | all 5 entries of `input.verbs[].devices` equal `["touch","keyboard","gamepad"]`, and exactly 2 have `boundByGame: true` |
| P3 | no game-bound input beyond the pressable | no verb the game defines requires an input the game binds other than a single activation of one pressable: no chord, no hold, no drag, no double-tap, and no two simultaneous game-bound inputs |
| P4 | no per-device verb path | zero reads of `UserInputService.TouchEnabled`, `.KeyboardEnabled` or `.GamepadEnabled` that change which verbs exist, which pressables are drawn, or how any verb adjudicates. A read that only sizes or positions an affordance passes |
| P5 | reachability of the game's own surface | every game-drawn pressable is `Selectable`, sits in one navigable selection group, is no smaller than the platform's own jump button on that device, and intersects neither the platform's movement nor its jump control region |

## Consequences for other work

- **On-screen control-layout work (currently UI/UX, Platform and Input):** you own four pressables
  and P5 is your floor. The two regions you may not touch are the platform's movement and jump
  controls, and the touch target you draw is measured against the platform's own jump button rather
  than against a pixel count I would have invented.
- **`ui-forge` pattern work:** `hud-overlay` states that nothing in it is `PRESSABLE` by default
  `[research: ui-forge/src/compose/patterns/hud-overlay.mjs]`. Under sheet 02 that default now
  blocks the game's only currency sink, so it is the one `ui-forge` change this wave requires. It is
  a default to change, not a capability to add: the pattern is a persistent HUD already.
- **Whoever maintains the repo's known-gap list:** the entry reading "no touch or gamepad purchase
  path" is real and is closed by P1 through P5, not by a world pad. The same list's claim that
  `ui-forge` has one pattern is stale; it exports two.
- **Accessibility work:** the brief claims movement-only input and one-handed play as accessible by
  construction `[brief: soft]`, `04-PRESENTATION.md`. That claim is now weaker by exactly one tap
  per purchase, which P3 bounds: a purchase is a single activation with no hold and no chord, so it
  stays inside one-handed play even though it is no longer inside movement alone.
- **Build and QA work:** P2 through P5 are static reads of source and manifest; only P1 needs a
  device, and it is three short runs.

## Acceptance criteria

1. P1 through P5 all pass on the shipped build, and each is recorded as pass or fail by name.
2. A player on a touch device with no keyboard and no gamepad attached can raise every upgrade axis
   to its maximum level and open the collection index.
3. Game code contains zero device conditionals that change which verbs exist or how one adjudicates.

## Not decided here

The verb list itself, its trigger contract and its preconditions (sheet 02, this domain). Where any
pressable sits, its size in pixels, its label, its colour and its states (on-screen control-layout
and HUD work). What the collection index panel contains (UI/UX). Whether `RespawnDelaySeconds`,
`CharacterAutoLoads` or any other engine default is set, and by whom (architecture, and sheet 06 for
what the player's body may do).
