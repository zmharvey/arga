# Build report — input

**Analysis.** Clean. `luau-lsp analyze` (1.69.0) with the Roblox API definitions and a Rojo
sourcemap that resolves `Shared.GameConfig` and `Shared.Protocol` to the real modules reports
**zero diagnostics**. Bare `luau-analyze` reports only unresolvable engine names (`game`,
`Enum`, `warn`, `RemoteEvent`, `InputObject`, `RBXScriptConnection`, `Enum.KeyCode`, and the
two Instance-path requires) — the same class of error that `Protocol.luau`, an already-built
dependency, produces, and an artefact of the CLI having no Roblox type definitions rather
than of the code.

One real defect was caught by that pass and fixed: `UserInputService:GetFocusedTextBox() ~= nil`
fails to typecheck, because the API dump declares the return as `TextBox` rather than `TextBox?`
and Luau refuses the comparison. The guard is now a truthiness test, which is identical at
runtime (an Instance is always truthy) but does not depend on the declared nullability.

**Behaviour was executed, not just typechecked.** I ran the module's real logic against a fake
`UserInputService`/`Protocol` and the real `GameConfig`: keys 1/2/3 fire exactly one argument
each — `value`, `radius`, `speed`, taken from the config's order; keys 4 and W fire nothing;
a press with a focused text box fires nothing; `Protocol.channel` is called exactly once and
only with `"BuyUpgrade"`; a second `connect()` warns and installs no second listener.

## Stops

- **No purchase path for touch or gamepad players.** The brief fixes keyboard 1/2/3 and
  nothing else, `hud-binding` is forbidden from creating any Instance except a Tween, and
  `client-main` only hangs a ScreenGui. So on a phone there is no way to spend currency, and
  the whole spend half of the loop is unreachable. To close it I would have had to invent one
  of: the HUD node names of the three rows plus the assumption that they are clickable
  (`GuiButton`) rather than labels; or a `ContextActionService:BindAction` with an invented
  button title, position and image; or a tap-target size. I built keyboard-only, exactly as
  specified, and left the gap visible.
- **No rate limit or cooldown for the only client-originated channel.** `BuyUpgrade` can be
  fired as fast as a player can press a key (or as fast as an exploiter can call `FireServer`),
  and nothing in my brief states a debounce interval, a per-second cap, or that the server
  enforces one. A client-side cooldown would have required inventing a seconds-per-press
  number, so I built none. If the intended answer is "the server absorbs it", that is a
  statement my brief does not make anywhere I can see.
- **`connect()` has no stated behaviour for a second call.** Nothing says whether it should be
  idempotent, re-install, or error. This is a behaviour, not a number, so I decided it (below)
  rather than leaving the module unbuildable — but the decision is load-bearing: the other
  reading double-fires every purchase.

## Decided without a stated value

Ordering, naming and shape:

1. Module table named `Input`, matching the file name; `Input.connect` as the only public
   member. `Must expose` gives the function name, not the table name.
2. Local names, all mine: `Shared`, `CHANNEL_NAME`, `UPGRADE_KEYS`, `connection`,
   `buildKeyMap`, `map`, `bindable`, `keyToUpgradeId`, `buyUpgrade`, `inputObject`, `index`,
   `upgradeId`.
3. `Input.connect(): ()` — "returns nil" in the interface table is written as *returns no
   values*, not as an explicit `return nil`. Indistinguishable to a caller, different in the
   signature a reader sees.
4. Order of work inside `connect()`: double-connect guard, then the over-supply warning, then
   the key map, then the channel, then the connection. In particular the warning is emitted
   before `Protocol.channel` is called, so a mis-sized config is still reported if the remote
   never resolves. Arbitrary.
5. Header comment block in `Protocol.luau`'s style (a `--[[ ]]` banner plus per-decision line
   comments). No comment convention is stated.

Input handling:

6. **`UserInputService.InputBegan`** is the event. Not `InputEnded`, not `InputChanged`, not
   `ContextActionService`, not `UserInputService.InputBegan` filtered by `UserInputState`.
   "One id per press" reads as fire-on-press, and `InputBegan` does not auto-repeat while a
   key is held, so a held key sends exactly one message. Nobody said whether holding 1 should
   buy repeatedly; it does not.
7. **The `gameProcessedEvent` argument is not used, and not even accepted.** The handler takes
   only the `InputObject`. The brief names `GetFocusedTextBox()` as the guard, so I used only
   that. Consequence: any *other* consumer of input in the place (a CoreGui prompt, a
   third-party UI) does not suppress a purchase. Gating on `gameProcessed` would have been one
   character of extra caution and a different, unspecified behaviour.
8. `Enum.KeyCode.One/Two/Three`, i.e. the top-row digits. **Numpad 1/2/3 (`KeypadOne` etc.) do
   nothing**, and I did not match on the typed character, so a keyboard layout where those
   physical keys produce another glyph still buys. Nobody said which of the three readings of
   "keyboard 1, 2 and 3" was meant.
9. No `inputObject.UserInputType == Enum.UserInputType.Keyboard` test. `KeyCode.One` is only
   produced by a keyboard, so the map lookup is already the filter; the extra test would be
   dead code.
10. Guard order inside the handler: focused-text-box first, key lookup second. No observable
    difference; the cheap universal guard goes first.
11. The unknown-key path is a silent `return`. No warning, no log, no "that key does nothing"
    feedback. Criterion 2 says "sends nothing", which I read as *sends nothing and says
    nothing*.

The key-to-upgrade mapping:

12. The mapping is **positional against `GameConfig.Upgrades`**, not a literal table of ids.
    No `"value"`, `"radius"` or `"speed"` string appears in the module. This follows the rule
    that values come from config, but it means the key bindings silently re-aim if the bridge
    ever re-emits `Upgrades` in a different order.
13. `math.min(#UPGRADE_KEYS, #GameConfig.Upgrades)` as the loop bound. With fewer upgrades than
    keys, the extra keys are simply unbound and nothing is said about it. With more upgrades
    than keys, the extra upgrades are unbuyable and `connect()` warns once.
14. **The over-supply warning exists at all**, and its exact text:
    `"Input.connect: %d upgrades are declared but only %d keys are bound; the rest cannot be bought"`.
    I chose warn over silence (a purchasable-but-unreachable upgrade is the same defect shape
    the brief keeps citing) and over `error` (a config change should not brick client boot).
    No error or warning string for this module is specified anywhere.
15. There is **no fourth key**. If a fifth upgrade axis is ever added, `Enum.KeyCode.Four` is
    the obvious extension and I did not make it, because the HUD only labels three rows.
16. Zero upgrades in config: the listener still installs and every key falls through. No
    warning for that case.
17. The key map is built **inside `connect()`**, not at require time, per the tree rule that a
    module does no work on load. It is therefore a snapshot of `GameConfig.Upgrades` as of the
    call, which matters not at all today and would matter if config were ever mutated at
    runtime.
18. `UPGRADE_KEYS` is `table.freeze`d, mirroring `Protocol.SNAPSHOT_FIELDS`. Nobody asked for
    immutability here.

The channel:

19. The string `"BuyUpgrade"` is typed by hand, once, into a module-level `CHANNEL_NAME`
    constant. There is a genuine tension here: the brief says resolve channels "never by a
    name you typed yourself", but `Protocol` exposes the names only as *keys* of `REMOTES`, so
    reading one out requires already knowing it. The input interface note itself writes
    `protocol.channel("BuyUpgrade")`, so a literal is clearly intended; a name constant on
    `Protocol` (e.g. `Protocol.Channels.BuyUpgrade`) would remove the last hand-typed remote
    name in the game. I did not add a defensive `Protocol.REMOTES[CHANNEL_NAME] ~= nil` check
    because `Protocol.channel` already errors on an undeclared name.
20. The channel is resolved **once, in `connect()`**, and captured in the closure, rather than
    per press. `Protocol` caches either way, so the only difference is that the first-call
    `WaitForChild` yield lands during boot instead of inside a keystroke handler. **This means
    `connect()` can yield**, which delays `client-main`'s `onClientBoot` step 5. Nothing states
    whether `connect()` is allowed to yield.
21. No `pcall` around `Protocol.channel`. If the remote never appears, `connect()` yields
    forever inside `WaitForChild` (protocol's behaviour, not mine) and if the name were
    undeclared it would raise. I let both propagate rather than swallowing them.
22. `buyUpgrade` is annotated `RemoteEvent` even though `Protocol.channel` returns `any`. It is
    an unchecked assertion at runtime; I made it because `REMOTES` declares the class and it
    buys typechecking on `FireServer`.
23. `FireServer(upgradeId)` is called with exactly one argument. No player, no timestamp, no
    client-computed cost, no nonce.

Session lifetime:

24. **A second `connect()` is a no-op plus a warn** (`"Input.connect: already connected; ignoring this call"`),
    implemented with a module-level `connection` upvalue. The alternatives were re-connecting
    (two listeners, two purchases per press) or erroring.
25. `connection` is assigned only after `Connect` returns, so a failure earlier in `connect()`
    leaves the module still connectable.
26. **No `disconnect()` and no teardown.** The connection lives for the client session. The
    `Must expose` list has one entry, so I added nothing next to it. The module also keeps no
    reference the caller can use to unbind.
27. No `LocalPlayer` reference, no `PlayerGui` reference, no character dependency. The module
    works before the character exists and keeps working across respawns without being told
    about either.

Deliberate non-behaviours:

28. **No client-side affordability, max-level or duplicate-purchase check.** Pressing 3 with
    zero currency, or with Pace already at level 6, still sends the id and the server rejects
    it. Follows from "the server prices it", but an equally spec-compliant build could grey the
    key out; that would need HUD state this module is not given.
29. **No local feedback on a press** — no click sound, no button flash, no optimistic HUD
    change, no "not enough Shards" message. The failure case is invisible to the player until
    they notice the balance did not move. Feedback is routed to categories that own no
    contract key, so there is nothing to call.
30. No analytics or telemetry call on a purchase attempt. No analytics contract exists.
31. The shared root is resolved at require time (`ReplicatedStorage:WaitForChild("UIForge")`)
    per `tree.requireStyle`, so requiring this module can yield. I read tree rule 1 ("performs
    no work at require time") as forbidding side effects and loops, not the sanctioned require
    preamble — `Protocol.luau` calls `game:GetService` at the top for the same reason.

## Assumed about a dependency

- **`Protocol.channel("BuyUpgrade")` returns a live `RemoteEvent`.** Read from the source: the
  return type is `any`, and `REMOTES.BuyUpgrade.class` is `"RemoteEvent"`. My `RemoteEvent`
  annotation is trusting that pairing.
- **`Protocol.channel` may yield on its first call** (it `WaitForChild`s the Remotes folder)
  and caches thereafter, so calling it once in `connect()` is equivalent to calling it per
  press apart from where the yield lands. Read from the source.
- **`Protocol` does no work at require time**, so requiring it at module scope on a client that
  boots before the server's `createRemotes()` has replicated is safe. Read from the source and
  stated in its header.
- **`GameConfig.Upgrades` is a dense array whose order is the HUD's row order** — 1st = Value,
  2nd = Reach, 3rd = Pace — and whose entries each carry a string `id` the server recognises.
  Nothing in `GameConfig.luau` marks that order as load-bearing, and nothing I can read ties
  the HUD's `[1]/[2]/[3]` rows to the same array; if the emitted HUD hard-codes its row order
  independently, a re-emit that reorders `Upgrades` puts the keys and the labels out of step
  and no test in my module would notice.
- **`GameConfig.Upgrades` is not frozen** (verified: the generated file freezes nothing), so
  reading `#` and indexing it at connect time is safe, and a caller could in principle mutate
  it before `connect()`.
- **The shared root Instance is a Folder named `UIForge` directly under `ReplicatedStorage`**,
  with `GameConfig` and `Protocol` as direct children — from `tree.sharedRoot` and its rule
  about indexing children after one `WaitForChild`.
- **`server-main` validates the id.** I send whatever string the config carries, with no
  membership test against anything, on the strength of `wiring.onPurchase` step 1 ("Reject any
  payload that is not a string") and step 2 (`progression.tryBuy` "validate and apply, or
  change nothing").
- **`client-main` calls `Input.connect()` exactly once, with no arguments**, at
  `onClientBoot` step 4, after the HUD is built but before it connects `StateChanged`. My
  module does not depend on that ordering, but it does assume the call happens at all — nothing
  in this module self-installs.
- **`UserInputService:GetFocusedTextBox()` returns non-nil while the Roblox chat bar is
  focused**, which is what makes criterion 1 cover chat as well as any in-game text field. That
  is engine behaviour, not a dependency I was given, but it is the whole of criterion 1.
