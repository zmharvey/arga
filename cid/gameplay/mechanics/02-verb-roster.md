# 02 — The verb roster

**Domain:** Mechanics · **Category:** Gameplay · **Wave:** 2

## Decision

**Five verbs exist and there is no sixth: `move`, `look`, `jump`, `buy`, `openIndex`.** Three are
the platform's and the game binds nothing for them. Two are the game's, and both are issued through
**one input class the game draws: a pressable**, reachable from anywhere in the area with no travel,
activatable by touch, by mouse and by gamepad. The game binds no key as any verb's only path.

## Why

**G1 — does "Input: movement only" cover spending currency?** Both readings, corrected from this
sheet's first draft, which stated reading A in a form its own roster contradicted.

| reading | what it says | what it implies | verdict |
|---|---|---|---|
| **A** | "**Input: movement only.** No aiming, clicking, or ability buttons. One thumb." `[brief: soft]` ← `[you accepted: step 6 Q3]`, `02-GAMEPLAY.md`, read as **the game binds no input of its own**: every input the player gives is one the platform already draws | Purchase must be triggered by walking. A walk-into pad is the tycoon family's standard purchase verb, input-agnostic by construction `[research: https://www.creation.dev/templates/tycoon-template]`, `[research: https://devforum.roblox.com/t/tycoon-button-system/1923669]` | **rejected**, and this sheet's first draft chose it |
| **B** | the same line read as governing **the world**: no aiming, no clicking and no ability button acts on the ruin, and commerce is not the ruin | The game may draw exactly one input class for commerce, on the condition that it is reachable on every device | **chosen, narrowed to one class and two verbs** |

**Reading A is right about input and wrong about pacing, and three approved stage-1 rulings decide
it against me.** Reading them is what changed this sheet; the first draft never saw them.

1. **`gameplay/core-loop/01-payoff-frequency` ruled against the pad by name**, before it existed:
   "buying must be reachable from anywhere in the area with no travel and no area exit. A vendor the
   player walks to converts every purchase beat into a traversal cost and pushes gaps past 90 s."
2. **The arithmetic confirms it and I could not defend the pad.** With the pads at the area spawn,
   `area.size` 120 and `movement.baseWalkSpeed` 16, the worst-case round trip is a full diagonal,
   `120 × √2 ≈ 170` studs, **10.6 s**. At `gameplay/core-loop/05`'s depth-4 area of 236 studs, with
   speed already maxed on arrival at `16 + 1.6 × 6 = 25.6`, it is `236 × √2 ≈ 334` studs, **13.0 s**.
   Both legs cross permanently cleared ground, which pays nothing, so the pad breaks
   `core-loop/01`'s currency-tick ceiling outright and gets worse with depth. Bounding the detour
   under that ceiling needs a pad triple every ~24 studs, which is 25 clusters in a depth-1 area.
3. **`gameplay/balance/01-upgrade-ladder` already binds the surface:** "UI/UX needs three purchase
   rows, each showing level, cost, and whether it is affordable, and affordability may not be
   signalled by colour alone." Three rows with three states is a readout, not a place.

**The surface `core-loop/01` named as unbuildable is buildable.** It called the no-travel purchase
surface "the persistent HUD that `OPEN.md §4` already flags as unbuildable by the current `ui-forge`
pattern set". `ui-forge/src/compose/patterns/hud-overlay.mjs` is exactly a persistent HUD and states
only that nothing in it is `PRESSABLE` **by default**
`[research: ui-forge/src/compose/patterns/hud-overlay.mjs]`. That is a default, not an incapability,
which is what makes reading B affordable now and did not when `core-loop/01` was written.

**The documented press-verb alternative stays on the shelf.** A `ProximityPrompt` is directly
tappable on a phone "regardless of the `ClickablePrompt` property's value" and auto-displays the
right glyph per input type `[research: https://create.roblox.com/docs/ui/proximity-prompts]`, but it
is anchored to a world object and therefore carries the same travel cost as the pad.

**A verb is an act the player chooses; a consequence is what the world does about it.** Clearing, a
Find's reveal and area completion carry no choice, they happen wherever the player walks, so none of
the three is a verb and none appears below. **A verb absent from this table does not exist**, and
adding one is a revision of this sheet rather than an implementation detail.

| id | trigger kind | trigger | precondition | adjudicated by | devices |
|---|---|---|---|---|---|
| `move` | continuous directional | the platform's default movement control; the game binds nothing | character spawned | client, engine character physics; the server re-tests position for every award | touch, keyboard, gamepad |
| `look` | continuous free-look | the platform's default camera control; the game binds nothing | none | client only: changes no server state, unlocks nothing, aims at nothing | touch, keyboard, gamepad |
| `jump` | discrete impulse | the platform's default jump control; the game binds nothing. **Existence and bounds ruled in sheet 06**, listed here so the closed list is closed | character on ground, engine-tested | client, engine; changes no game state | touch, keyboard, gamepad |
| `buy` | discrete select | activating one of the three game-drawn purchase pressables | **G8:** `balance >= cost(axis, level)` **and** `level < maxLevel`. Failing either, the activation is a silent no-op | **server**, inherited from `OPEN.md §2` "Secure server-side: clearing, currency, relic grants" and not decided here | touch, keyboard, gamepad |
| `openIndex` | discrete select | activating the game-drawn index pressable | none | client only: displays state, grants nothing | touch, keyboard, gamepad |

**The pressable is the one input class the game draws.** Its contract, stated as a floor an
on-screen-layout domain satisfies rather than a design:

| property | value |
|---|---|
| pressables the game draws | 4: one per `upgrades[]` entry in declared order, plus one index control |
| travel needed to reach any of them | **none**, from any point in any area, at any depth |
| persistence | the three purchase controls are present throughout play, never gated behind another screen |
| activation | one activation buys one level; no hold, chord, double-tap or drag |
| repeat guard | 0.35 s debounce per control `[playtest unknown]`, test 0.2 to 0.6 s |
| activation while unaffordable or maxed | the control stays visible and keeps showing the price; activating it changes no state and emits nothing on any channel |
| affordability signal | never colour alone, inherited from `gameplay/balance/01` |
| minimum touch target | never smaller than the platform's own jump button on the same device `[research owed: a measured minimum touch-target size for an 8-14 audience on a phone-sized Roblox viewport]` |
| overlap with platform controls | zero: no pressable may intersect the platform's movement or jump control regions |
| gamepad reachability | every pressable `Selectable` and in one navigable selection group |
| keyboard accelerator | permitted, never required, and never the only path to any verb |
| index screen | modal: the character stands still while it is open, it is dismissible at will, and it is the only state in the game in which a verb suspends movement |

**Verbs that do not exist.** Each row is a thing a builder could otherwise add without noticing.

| absent | ruling |
|---|---|
| click or tap to clear | clearing is proximity contact `[brief: soft]`, `02-GAMEPLAY.md`; there is no clear verb at all |
| hold-to-clear, tap-to-swing | offered and declined in the brief `[brief: soft]` |
| aim, target, lock-on | "No aiming" `[brief: soft]`; nothing in the game is aimed at |
| sprint, crouch, dash, roll, prone | `[cid: decided]` no second locomotion state; `move` has one speed, owned by sheet 01 and the speed axis |
| an ability button, hotbar, cooldown or charge | `[brief: soft]` "No ... ability buttons"; the two pressable roles above are the whole game-drawn surface |
| equip, unequip, stow, drop | `[cid: decided]` there is one tool, always held; see sheet 04 |
| pick up, carry, place or arrange a Find | `[cid: decided]` a Find is granted at reveal; it is never an object the player handles |
| a confirm or cancel step on a purchase | `[cid: decided]` the activation is the confirmation; the debounce is the guard against a repeat |
| a purchase-quantity or buy-max selector | `[cid: decided]` one activation buys exactly one level |
| a sell, convert, discard or trade verb | trading is priority 3 `[brief: soft]`, `03-META.md`; nothing the player owns can leave them |
| a walk-into purchase pad or vendor | ruled out above by `gameplay/core-loop/01`; no world object triggers a purchase |
| an emote, chat or nameplate verb | platform-supplied and not mine; `gameplay/social/01` and `03` rule on them |

```manifest
{
  "provides": "input",
  "status": "proposed",
  "value": {
    "closed": true,
    "gameBoundInputClasses": ["pressable"],
    "gameDrawnPressables": 4,
    "travelRequiredToPurchase": "none",
    "clientOriginatedRemotes": ["RequestState", "BuyUpgrade"],
    "clientRemotesFiredByPlayerInput": ["BuyUpgrade"],
    "verbs": [
      { "id": "move", "trigger": "platformMovementControl", "boundByGame": false, "kind": "continuousDirectional", "precondition": "characterSpawned", "adjudicatedBy": "client", "devices": ["touch", "keyboard", "gamepad"] },
      { "id": "look", "trigger": "platformCameraControl", "boundByGame": false, "kind": "continuousFreeLook", "precondition": "none", "adjudicatedBy": "client", "devices": ["touch", "keyboard", "gamepad"] },
      { "id": "jump", "trigger": "platformJumpControl", "boundByGame": false, "kind": "discreteImpulse", "precondition": "onGround", "adjudicatedBy": "client", "devices": ["touch", "keyboard", "gamepad"] },
      { "id": "buy", "trigger": "gamePressable", "pressableRole": "purchase", "boundByGame": true, "kind": "discreteSelect", "precondition": "balance >= cost && level < maxLevel", "onPreconditionFail": "silentNoOp", "adjudicatedBy": "server", "devices": ["touch", "keyboard", "gamepad"] },
      { "id": "openIndex", "trigger": "gamePressable", "pressableRole": "index", "boundByGame": true, "kind": "discreteSelect", "precondition": "none", "adjudicatedBy": "client", "devices": ["touch", "keyboard", "gamepad"] }
    ],
    "pressable": {
      "roles": [
        { "role": "purchase", "count": 3, "boundTo": "upgrades declaration order", "adjudicatedBy": "server", "persistent": true },
        { "role": "index", "count": 1, "adjudicatedBy": "client", "persistent": true }
      ],
      "activationsPerPress": 1,
      "debounceSeconds": 0.35,
      "holdRequired": false,
      "chordRequired": false,
      "rejectionCueOnFailedPrecondition": "none",
      "affordabilityByColourAlone": false,
      "minTouchTargetRule": "notSmallerThanPlatformJumpButton",
      "mayOverlapPlatformControlRegions": false,
      "gamepadSelectable": true,
      "keyboardAcceleratorAllowed": true,
      "keyboardAcceleratorRequired": false,
      "indexScreenSuspendsMovement": true
    },
    "worldObjectsTriggeringAVerb": 0
  }
}
```

## Consequences for other work

- **Purchase-surface and HUD work (UI/UX):** you own four pressables, their layout, labels and
  states. The floor above is a parity floor, not a design. The three purchase controls must be
  reachable with no travel from anywhere in the area, which is `core-loop/01`'s ruling, not mine.
- **`ui-forge` pattern work:** `hud-overlay` needs a `PRESSABLE` readout. This is the project's
  known gap and it is now load-bearing on the game's only currency sink. It is a default to change,
  not a capability to add.
- **World-inventory work (`theme/setting/05-inventory`):** **withdrawn.** The first draft of this
  sheet added a marked place to your closed twelve-class list. It does not any more, and this sheet
  adds no class of place matter at all.
- **Onboarding and area-layout work:** **withdrawn.** The first draft reserved four 8-stud
  patch-free discs at the spawn, which contradicted "the player spawns touching overgrowth"
  `[brief: soft]` ← `[you accepted: R6 Q3]` and displaced `gameplay/onboarding/01`'s guaranteed
  first Find. No layout constraint of mine survives.
- **Build work on `game/src/client/Input.luau`:** it survives. Its keyboard `1`/`2`/`3` binding is
  demoted to an optional desktop accelerator and may not be the only path to `buy`.
- **Networking and security work:** two client-originated remotes exist and both stay.
  `BuyUpgrade` carries an upgrade id and never a cost, a level or a balance, which is exactly what
  `gameplay/systems/04` asserts. `RequestState` is fired by `client-main` at join, not by player
  input, and deleting it blanks the HUD until the first clear.

## Pushing back

**Overruled: the brief's "Input: movement only. No aiming, clicking, or ability buttons"**
`[brief: soft]` ← `[you accepted: step 6 Q3]`, `02-GAMEPLAY.md`. The game now draws pressables, which
is an input the brief's line excludes on its strictest reading. Overruled because the only reading
that preserves it, a walk-into pad, contradicts `gameplay/core-loop/01-payoff-frequency` by name and
by 10.6 s at depth 1 and 13.0 s at depth 4, and because `gameplay/balance/01-upgrade-ladder` already
requires three purchase rows with three affordability states. **Contained to one input class, two
verbs and four controls**, which is stated in the manifest so a later sheet cannot widen it quietly.
Nothing else in the brief's line is touched: no aiming, no clicking on the world, no ability button,
and no verb that acts on the ruin by anything but walking.

## Flagged to the developer

The brief names a currency sink and never says how a player reaches it. Live alternatives, mine
first: **(1) a persistent HUD pressable**, chosen, no travel, one bound input class, needs a
`PRESSABLE` readout in `hud-overlay`; **(2) a walk-into pad**, zero bound inputs and the genre
standard, rejected only on pacing, and correct if `core-loop/01`'s travel ruling is ever relaxed;
**(3) a `ProximityPrompt`**, auto-glyphed per device but world-anchored, so it carries the pad's
travel cost and a press verb both; **(4) automatic purchase of the cheapest affordable level**, zero
inputs and zero travel, rejected because it deletes the only choice the player makes.

## Acceptance criteria

1. Every game-drawn pressable is activatable by a touch tap, by a mouse click and by gamepad
   selection, and no verb's only path is a keyboard key.
2. `input.verbs` has exactly 5 entries; every `devices` array equals `["touch","keyboard","gamepad"]`;
   exactly 2 entries have `boundByGame: true`.
3. A purchase can be committed from any point in any area without the character moving, measured
   from the far corner of a depth-1 and a depth-4 area.
4. Activating a purchase control with a balance below the price, or at max level, changes no state
   and emits nothing on any channel; activating it with the price buys exactly one level.

## Not decided here

Costs, cost growth and which axis is cheapest (Balance and Tuning). Where any pressable sits, how
large it is in pixels, what it says and what it looks like (UI/UX, purchase-surface and HUD work).
What a purchase sounds or looks like, and every acknowledgment budget (sheet 05, this domain).
Whether the device sets above are a shippability gate (sheet 03). Whether jump exists and what it
may reach (sheet 06). Chat, nameplates and character collision (`gameplay/social/01` and `03`).
