# 03 — Device parity, as a check a build can fail

**Domain:** Mechanics · **Category:** Gameplay · **Wave:** 2

## Decision

**Every verb in sheet 02 must be reachable on all three device classes, touch, keyboard-and-mouse
and gamepad, through one code path with no per-device branch.** A build in which any verb's device
set is smaller than all three does not ship. This sheet **carries no manifest block**: it constrains
`input.verbs[].devices` from sheet 02 and supplies no key of its own.

## Why

**G2.** The brief fixes the audience as "8–14, mobile-heavy, short sessions" `[brief: binding]` ←
`[you chose: R1 Q4]`, `00-CORE.md`, names a currency sink `[brief: soft]`, and never once says the
verb which spends it must work without a keyboard. The shipped surface binds purchase to keyboard
`1`, `2` and `3` and to nothing else `[research: game/src/client/Input.luau]`. That is the whole gap,
and it is a coverage failure rather than a design disagreement.

**No requirement here rests on the 70/25/5 split.** Those percentages are `[brief: soft]` ←
`[I assumed]`, `00-CORE.md`, and the wave-2 research pass states plainly that the ~70% mobile figure
is not corroborated by anything it fetched. The requirement rests on the band, which is binding, and
on cost: under sheet 02's answer full coverage is one occupancy test, so there is no percentage at
which excluding a device class would pay.

**Gamepad is required despite ~5% console**, and the reason is recorded so nobody re-derives it: an
occupancy trigger has no per-device branch to write, so including gamepad costs nothing. Had it cost
anything, a figure the brief itself marks assumed would have been too weak to justify it.

**Parity is not a preference and it is not new scope.** "Three clearing upgrades" is already
priority 1 `[brief: soft]`, `03-META.md`; this sheet adds no system, it states that the verb which
buys them must be reachable by the audience already fixed, and turns that into five checks.

## The input class each verb requires

Written for on-screen-layout work to satisfy without re-deciding anything. Every row's supply column
is "nothing", which is the point: under sheet 02 no verb needs a control surface that the platform
does not already draw.

| verb | input class | what layout work must supply | what layout work must not do |
|---|---|---|---|
| `move` | continuous directional | nothing; the platform default movement control | occlude, replace, shrink or overlay the default movement control region |
| `look` | continuous free-look | nothing; the platform default camera control | lock, clamp, auto-frame or shake the camera for any beat |
| `jump` | discrete impulse | nothing; the platform default jump control | remove, re-purpose or re-label the default jump control |
| `buy` | occupancy, no control surface | nothing | add a pressable that duplicates it, or gate it behind a screen |
| `openIndex` | occupancy, no control surface | nothing; the panel closes when the character leaves | require a press to open or to dismiss it |

## The five checks

| # | check | passes when |
|---|---|---|
| P1 | key sweep | zero references to `Enum.KeyCode`, `Enum.UserInputType` or `ContextActionService:BindAction` anywhere in game client code |
| P2 | device set | all 5 entries of `input.verbs[].devices` equal `["touch","keyboard","gamepad"]` |
| P3 | one thumb | every verb is exercisable using the movement control alone; no verb requires two simultaneous inputs, a chord, a hold, or a second finger |
| P4 | no branch | zero reads of `UserInputService.TouchEnabled`, `.KeyboardEnabled` or `.GamepadEnabled` in game code, because a branch is a second path that can rot |
| P5 | pressable independence | the game is completable start to finish with zero pressables in the interface |

## Consequences for other work

- **On-screen control-layout work (currently UI/UX, Platform and Input):** you own the surface, and
  under this ruling the surface for verbs is empty. Your obligation reduces to leaving the platform's
  default control regions alone. `ui-forge`'s `hud-overlay` pattern states that nothing in it is
  `PRESSABLE` by default `[research: ui-forge/src/compose/patterns/hud-overlay.mjs]`; that default is
  **not a blocker here**, because no verb needs a pressable and the HUD stays a readout.
- **Whoever maintains the repo's known-gap list:** the entry reading "no touch or gamepad purchase
  path, closing it needs a `pressable` readout in `hud-overlay`" is answered by a world pad instead,
  so it closes without a `ui-forge` change. That is a correction to the gap's stated cause, not a
  claim about what `ui-forge` can build.
- **Accessibility work:** the brief already claims movement-only input and one-handed play as
  accessible by construction `[brief: soft]`, `04-PRESENTATION.md`. P3 is what makes that claim
  checkable rather than asserted, and it now covers spending as well as clearing.
- **Build and QA work:** parity is testable without a device farm. P1, P2 and P4 are static reads of
  the source and the manifest; only P3 and P5 need a person, and both are one pass each.

## Acceptance criteria

1. P1 through P5 all pass on the shipped build, and each is recorded as pass or fail by name.
2. A player on a touch device with no keyboard and no gamepad attached can raise every upgrade axis
   to its maximum level and open the collection index, using the movement control only.
3. Game code contains zero per-device conditionals: no verb has two implementations.

## Not decided here

The verb list itself, its trigger contract and its preconditions (sheet 02, this domain). Anything
about layout, position, size, art or the platform default control regions' geometry (on-screen
control-layout work). What the collection index panel contains and how it is composed (UI/UX).
Whether `RespawnDelaySeconds`, `CharacterAutoLoads` or any other engine default is set, and by whom
(architecture, and sheet 06 for what the player's body may do).
