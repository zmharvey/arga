# 02 — The verb roster

**Domain:** Mechanics · **Category:** Gameplay · **Wave:** 2

## Decision

**Five verbs exist and there is no sixth:** `move`, `look`, `jump`, `buy` and `openIndex`. All
five are issued with the movement control alone, `buy` by walking onto an upgrade pad and
`openIndex` by standing on the index plinth. "Movement only" is read strictly, so the shipped
keyboard `1`/`2`/`3` purchase binding is **superseded and removed**, and the game fires zero
game-defined client-to-server remotes.

## Why

**G1 — does "Input: movement only" cover spending currency?** Both readings, stated before the
call, because the brief supports either and nothing on disk resolves it.

| reading | what it says | what it implies | verdict |
|---|---|---|---|
| **A, literal** | "**Input: movement only.** No aiming, clicking, or ability buttons. One thumb." `[brief: soft]` ← `[you accepted: step 6 Q3]`, `02-GAMEPLAY.md` | Directional movement is the only input the player ever gives. A number key that spends currency is an ability button, so the shipped build breaks the brief. | **chosen** |
| **B, world-verb** | the same line read as governing interaction *with the world*, with menus and HUDs outside its scope, which is how the shipping client reads it: "the only client-originated message in the game" `[research: game/src/client/Input.luau]` | "Movement only" describes clearing, not commerce. A press to buy is legal and `1`/`2`/`3` is correct. | rejected |

Four reasons A wins, and the first is the one that changed the answer:

1. **The walk-into purchase pad is the defining purchase verb of the Roblox tycoon family, not a
   workaround.** It is an invisible trigger on a world part, filed under core mechanics as
   foundational to "every successful tycoon game on Roblox", with a world-space price readout and
   the cash check server-side `[research: https://www.creation.dev/templates/tycoon-template]`, and
   a working script confirms the mechanism is `Touched` on a world part guarded by an
   affordability test `[research: https://devforum.roblox.com/t/tycoon-button-system/1923669]`.
   Because it triggers on walking it is input-agnostic by construction, so reading A is *cheaper*
   than reading B, not merely stricter.
2. **Reading B keeps a desktop-only spending path** in a game whose audience band is binding and
   mobile-heavy `[brief: binding]` ← `[you chose: R1 Q4]`, `00-CORE.md`. That is a defect wearing a
   reading's clothes.
3. **The two alternatives the brief already refused were both press verbs**: "hold-to-clear and
   tap-to-swing were both offered and declined" `[brief: soft]`, `02-GAMEPLAY.md`. A number key is
   the same class of thing.
4. **The documented cross-platform alternative costs a verb.** A `ProximityPrompt` is directly
   tappable on a phone "regardless of the `ClickablePrompt` property's value" and displays the
   correct input glyph for keyboard, gamepad and touchscreen
   `[research: https://create.roblox.com/docs/ui/proximity-prompts]`, but it is press-to-confirm.
   Under A that cost buys nothing, so the prompt is the fallback if a purchase ever needs an
   explicit confirm step, and not the answer today.

**A verb is an act the player chooses; a consequence is what the world does about it.** Clearing, a
Find's reveal and area completion carry no choice, they happen wherever the player walks, so none of
the three is a verb and none appears below. **A verb absent from this table does not exist**, and
adding one is a revision of this sheet rather than an implementation detail.

| id | trigger kind | trigger | precondition | adjudicated by | devices |
|---|---|---|---|---|---|
| `move` | continuous directional | the platform's default movement control | character spawned | client, engine character physics; the server re-tests position for every award | touch, keyboard, gamepad |
| `look` | continuous free-look | the platform's default camera control | none | client only: changes no server state, unlocks nothing, aims at nothing | touch, keyboard, gamepad |
| `jump` | discrete impulse | the platform's default jump control | character on ground, engine-tested | client, engine; changes no game state. **Existence and bounds ruled in sheet 06**, listed here so the closed list is closed | touch, keyboard, gamepad |
| `buy` | discrete, movement-derived | entering the trigger volume of a marked place with role `upgrade` | **G8:** `balance >= cost(axis, level)` **and** `level < maxLevel`. Failing either, the entry is a silent no-op | **server**, inherited from `OPEN.md §2` "Secure server-side: clearing, currency, relic grants" and not decided here | touch, keyboard, gamepad |
| `openIndex` | continuous occupancy | standing inside the trigger volume of the marked place with role `index` | none | client only: displays state, grants nothing | touch, keyboard, gamepad |

**The marked place is the one trigger mechanism, with two roles.** Its contract:

| property | value |
|---|---|
| marked places per area | 4: three `upgrade` (one per axis, in `GameConfig.Upgrades` order) and one `index` |
| trigger volume | 6 × 6 studs footprint, 8 studs tall |
| placement | at the area's spawn point, reachable before anything is cleared |
| keep-clear radius | 8 studs, inside which no patch may be placed |
| activation | one activation per entry; the character must fully leave the volume and re-enter to activate again |
| re-entry debounce | 0.35 s `[playtest unknown]`, test 0.2 to 0.6 s |
| entry while unaffordable or maxed | no state change, no message, no rejection cue on any channel |
| price readout | present at each `upgrade` place in world space, carrying at minimum the current price |
| `openIndex` release | the panel closes when the character leaves the volume; no press is required to dismiss it |

**Verbs that do not exist.** Each row is a thing a builder could otherwise add without noticing.

| absent | ruling |
|---|---|
| click or tap to clear | clearing is proximity contact `[brief: soft]`, `02-GAMEPLAY.md`; there is no clear verb at all |
| hold-to-clear, tap-to-swing | offered and declined in the brief `[brief: soft]` |
| aim, target, lock-on | "No aiming" `[brief: soft]`; nothing in the game is aimed at |
| sprint, crouch, dash, roll, prone | `[cid: decided]` no second locomotion state; `move` has exactly one speed, owned by sheet 01 and the Pace axis |
| an ability button, hotbar, or cooldown | `[brief: soft]` "No ... ability buttons" |
| equip, unequip, stow, drop | `[cid: decided]` there is one tool, always held; see sheet 04 |
| pick up, carry, place or arrange a Find | `[cid: decided]` a Find is granted at reveal; it is never an object the player handles |
| a confirm or cancel press on any purchase | `[cid: decided]` the entry *is* the confirmation; the re-entry rule is the guard against an accidental repeat |
| a purchase-quantity or buy-max selector | `[cid: decided]` one entry buys exactly one level |
| a sell, convert, discard or trade verb | trading is priority 3 `[brief: soft]`, `03-META.md`; nothing the player owns can leave them |
| a keybind of any kind, remappable or not | `[cid: decided]` zero `Enum.KeyCode` bindings in game code; see sheet 03 |
| an emote, chat or nameplate verb | platform-supplied and not mine; ruled by Multiplayer and Social |

```manifest
{
  "provides": "input",
  "status": "proposed",
  "value": {
    "closed": true,
    "clientOriginatedRemotes": 0,
    "keyBindings": 0,
    "verbs": [
      { "id": "move", "trigger": "platformMovementControl", "kind": "continuousDirectional", "precondition": "characterSpawned", "adjudicatedBy": "client", "devices": ["touch", "keyboard", "gamepad"] },
      { "id": "look", "trigger": "platformCameraControl", "kind": "continuousFreeLook", "precondition": "none", "adjudicatedBy": "client", "devices": ["touch", "keyboard", "gamepad"] },
      { "id": "jump", "trigger": "platformJumpControl", "kind": "discreteImpulse", "precondition": "onGround", "adjudicatedBy": "client", "devices": ["touch", "keyboard", "gamepad"] },
      { "id": "buy", "trigger": "markedPlaceEntry", "markedPlaceRole": "upgrade", "kind": "discreteOccupancy", "precondition": "balance >= cost && level < maxLevel", "onPreconditionFail": "silentNoOp", "adjudicatedBy": "server", "devices": ["touch", "keyboard", "gamepad"] },
      { "id": "openIndex", "trigger": "markedPlaceOccupancy", "markedPlaceRole": "index", "kind": "continuousOccupancy", "precondition": "none", "adjudicatedBy": "client", "devices": ["touch", "keyboard", "gamepad"] }
    ],
    "markedPlace": {
      "perArea": 4,
      "roles": [
        { "role": "upgrade", "count": 3, "boundTo": "GameConfig.Upgrades order", "adjudicatedBy": "server" },
        { "role": "index", "count": 1, "adjudicatedBy": "client" }
      ],
      "triggerFootprintStuds": 6,
      "triggerHeightStuds": 8,
      "placement": "areaSpawn",
      "keepClearRadiusStuds": 8,
      "activationsPerEntry": 1,
      "requiresFullExitToReactivate": true,
      "reentryDebounceSeconds": 0.35,
      "priceVisibleAtPlace": true,
      "rejectionCueOnFailedPrecondition": "none",
      "indexDismissRequiresPress": false
    }
  }
}
```

## Consequences for other work

- **World-inventory work** (`theme/setting/05-inventory`, twelve classes and nothing else): this
  adds **one class, a marked place**, carrying two roles. Naming it, describing it and admitting it
  to the present column is theirs. I state the trigger contract and the count, never the object.
- **Build work on `game/src/client/Input.luau`:** superseded, delete it. `BuyUpgrade` becomes
  server-internal, driven by a `Touched` handler on the pad, and the client-to-server channel count
  drops to zero.
- **Store-screen and purchase-surface work (UI/UX):** no HUD pressable is required to spend
  currency, and the price readout is world-space. If a store screen is built it may never be the
  only path to a purchase.
- **Area-layout work (Meta and Content):** four keep-clear discs of 8 studs sit at the spawn, and
  the patch field must still hold `area.patchCount` at `area.minSpacing` around them.
- **Onboarding work:** the pads stand at spawn before anything is cleared, so first-minute
  choreography may rely on them being in view without inventing a prompt.
- **Networking and security work:** with purchase adjudicated at the pad, no game-defined message
  originates on the client, and the only exploit surface left is teleporting onto a pad, which the
  server's own balance check already refuses.

## Flagged to the developer

The brief names a currency sink and never says how a player reaches it, so this was decided rather
than inherited. Live alternatives, with my recommendation first: **(1) the walk-into pad**, chosen,
zero press verbs and one code path; **(2) a `ProximityPrompt`**, one press verb, auto-glyphed per
device, correct if a purchase ever needs an explicit confirm; **(3) an on-screen HUD button**, works
everywhere but needs a pressable readout the HUD pattern does not supply by default; **(4) a
tap-opened shop screen**, the most surface for the worst fit against "one thumb".

## Acceptance criteria

1. A search of the shipped client for `Enum.KeyCode` returns zero matches, and no verb is bound to a
   key, button or on-screen touch target.
2. `input.verbs` has exactly 5 entries and every `devices` array equals `["touch","keyboard","gamepad"]`.
3. Entering an `upgrade` place with a balance below the price changes no state and emits nothing on
   any channel; entering it with the price buys exactly one level per entry, and standing still on
   the place after that buys nothing further.
4. The game declares zero client-to-server remotes fired by player input.

## Not decided here

Costs, cost growth and which axis is cheapest (Balance and Tuning). What a marked place is made of
and whether it is admitted to the closed place-matter list (world-inventory work). What a purchase
sounds or looks like, and every acknowledgment budget (sheet 05, this domain). Whether the device
sets above are a shippability gate (sheet 03). Whether jump exists and what it may reach (sheet 06).
Chat, nameplates and any platform-supplied social surface (Multiplayer and Social).
