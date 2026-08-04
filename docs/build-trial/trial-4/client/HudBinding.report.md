# Build report — hud-binding

## Stops

Each of these is a value the module needed, could not find under *Values*, in `GameConfig`,
or in the `hud-binding.bind` interface note, and therefore had to invent. Every invented
literal is gathered in one flagged block at the top of the module under the comment
`UNSPECIFIED VALUES`, so that supplying the real ones is an edit to that block and nothing
else.

1. **Progress-bar tween duration.** Criterion 3 and the interface note both require the bar
   to be "tweened rather than set", and neither says for how long. I used **0.25 s**. This is
   not cosmetic: `runtime.clearTickRate` is 0.12 s, and clearing fires `StateChanged` on any
   tick that changed something, so any duration above 0.12 s means the bar is permanently
   mid-flight and never at rest while a player is walking. A designer choosing 0.5 s and a
   designer choosing 0.08 s produce visibly different games from the same specification.
2. **Progress-bar easing style and direction.** I used **`Enum.EasingStyle.Quad`** and
   **`Enum.EasingDirection.Out`**. Nothing in the brief names either. Linear would be an
   equally defensible reading of "animates rather than snapping".
3. **The text form of the affordability signal.** This is a direct contradiction inside the
   brief, not just an omission. The interface note fixes the upgrade readout as
   `"Lv <held level>  ·  <config.upgradeCost(def, held level)>"`, which contains no
   affordability information at all; *Must not* forbids "signalling affordability by colour
   alone"; criterion 2 requires affordability to be "readable with colour removed"; and the
   same interface note asserts "Affordability is signalled by text as well as colour". Those
   cannot all hold. I appended a suffix to the specified format: **`"  BUY"`** when
   `currency >= cost`, **`"  NEED"`** otherwise. Both words are invented, as is the decision
   to put the signal in `ReadoutValue` rather than in a sibling node the emitted screen may
   already have for it.
4. **The affordability colour, and the source of any colour at all.** The interface note says
   affordability is signalled "as well as colour", so a colour change is expected — but no
   affordable/unaffordable `Color3` is in *Values* or in `GameConfig`, and the only plausible
   owner of one is ui-forge's `Theme` module, which is **not** a declared dependency of
   `hud-binding` (my only dependency is `protocol`) and whose token names are not in this
   brief. I therefore set **no colour at all**. The module satisfies "readable with colour
   removed" by being colour-free, which is a strictly weaker result than the design asked
   for. Two values are missing: the affordable colour, the unaffordable colour. Also missing:
   whether the colour goes on `ReadoutValue` or on the whole `Readout_<n><LABEL>` node.
5. **What a maxed upgrade reads as.** `GameConfig.upgradeCost(def, maxLevel)` returns a real
   number (4398 for Value at level 10), so following the specified format literally would
   advertise a purchase `progression.tryBuy` must refuse. No max-level display is specified.
   I substituted the word **`"MAX"`** for the cost: `"Lv 10  ·  MAX"`. Whether a maxed row
   should instead grey out, hide, or read "Lv 10 / 10" is unspecified.
6. **The rounding rule for the progress percentage.** `"<area.label uppercased> — <percent>%
   CLEAR"` does not say how `clearedCount / area.patchCount` becomes an integer percent, or
   whether it is an integer at all. I used **`math.floor`**, so 139/140 shows 99% and only
   140/140 shows 100%. `math.round` would also show 99% there but would let 99.5%+ read as
   100% at a larger `patchCount`. One decimal place would read differently again.
7. **The number format of the Shards balance.** "takes the currency balance" fixes no
   formatting. I used a plain integer with **no thousands separator and no currency word**
   (`"4711"`). With `value` maxed and 140 patches per area, balances reach five figures, where
   `"4,711"` vs `"4711"` is a visible difference. `GameConfig.Currency.plural` exists and is
   unused by this module, which is suspicious: the only place a builder would use it is here.

## Decided without a stated value

**Node paths and names**

- The four cluster names, `Readout_SHARDS`, `Readout_RELICS`, `ReadoutValue`, `ProgressGroup`,
  `BarLabel`, `Bar` and `BarFill` are taken as **literal strings** exactly as the interface
  note spells them, not derived from config. That is forced for `Readout_RELICS`: the
  player-facing noun is `GameConfig.FindNoun` = "Find"/"Finds", so the node name cannot be
  derived from config and is a leftover of the noun the ban list already replaced once. I did
  **not** derive `Readout_SHARDS` from `GameConfig.Currency.plural:upper()` either, even
  though it happens to match, because the RELICS node proves the emitted screen's names do
  not track config. If ui-forge re-emits with the current noun, this module breaks with a
  warning rather than silently.
- `Readout_<n><LABEL UPPERCASED>` is read as `"Readout_" .. index .. label:upper()` with no
  separator, giving `Readout_1VALUE`, `Readout_2REACH`, `Readout_3PACE`. `Readout_1_VALUE`
  and `Readout_1Value` are equally consistent with the notation used.
- `<n>` is the 1-based index into `GameConfig.Upgrades` in emitted order. Nothing says the
  emitted screen numbers them in config order rather than by cost or alphabetically.
- The bar fill path is assumed to be `Cluster_bottomLeft.ProgressGroup.Bar.BarFill`. The note
  writes the label path with its cluster prefix but the fill path without one
  (`ProgressGroup.Bar.BarFill.Size`); I read that as the same `ProgressGroup` under
  `Cluster_bottomLeft`, not a second one elsewhere.
- All paths are resolved **relative to `root`**, the frame `UIBuilder.build` returned, so the
  clusters are assumed to be direct children of Root. Nothing states that Root is not itself
  named `Root` inside the screen with the clusters one level deeper.

**Resolution and warnings**

- `FindFirstChild` per path segment, **not** `WaitForChild`. `bind` runs after
  `UIBuilder.build` in `onClientBoot`, so a missing name is a screen that no longer matches
  this module; waiting forever would turn criterion 1's warning into a silent hang. Not
  recursive: a `Readout_SHARDS` moved to a different cluster is a miss, not a find.
- One warning per **unresolved path**, not per unique missing segment. A HUD whose Root is
  empty produces seven warnings, three of which name `Cluster_bottomRight` and two
  `Cluster_bottomLeft`. "warns here, once" was read as "once per bind rather than once per
  snapshot", which the code does satisfy.
- Warnings go to `warn`, are prefixed `[HudBinding]`, quote the missing child name with `%q`,
  and name the parent by `GetFullName()`. All of that wording is invented.
- A node that resolves but carries no text (or, for the fill, is not a `GuiObject`) gets its
  own distinct warning naming the actual `ClassName`. The brief only contemplates a name that
  does not resolve.
- A text node is accepted if it is a `TextLabel`, a `TextButton` **or** a `TextBox`. The
  emitted screen's classes are not in the brief, and `input` "installs the purchase
  affordance", so an upgrade readout could plausibly sit inside a button. Being permissive
  costs two pieces of structure: the resolver narrows with one `IsA` branch per class rather
  than an `or` chain, and every write goes through a `setText` helper that does the same,
  because Roblox has no common base class carrying `Text` and a property write against a
  union of class types does not typecheck. Accepting only `TextLabel` would delete both.
- Nodes are resolved once and closed over. If the HUD is later destroyed or reparented, the
  updater keeps writing to detached Instances rather than re-resolving or erroring. Nothing
  says the HUD can be destroyed; `client-main` creates the ScreenGui once and it survives
  respawns.

**The updater**

- Signature is `(Snapshot?) -> ()`: a **nil snapshot returns immediately** and touches
  nothing. The brief writes `(snapshot) -> ()` and never says whether
  `RequestState:InvokeServer()` can come back nil (it can, if the server answers before the
  player is in `states`). No warning is emitted on a nil snapshot, on the grounds that it
  would fire on every early pull.
- Snapshot fields are read as a typed struct (`currency`, `upgrades`, `clearedCount`, `found`,
  `areaComplete`) rather than indexed through `Protocol.snapshotShape()`. Dynamic indexing
  would satisfy "read the payload from this list" literally but would discard every type at
  the boundary. As compensation I added a **bind-time check** that warns if
  `snapshotShape()` has stopped declaring a field this module reads. That check is not asked
  for anywhere and is the only use this module makes of its one declared dependency.
- Field write order inside the updater: Shards, Finds, upgrades, bar label, bar fill.
  Arbitrary; nothing observes it.
- `snapshot.areaComplete` is **read by nothing**. The brief gives the HUD no behaviour for it,
  and at 100% the bar and label already say so. A finished area therefore looks exactly like a
  140/140 in-progress one, which may be intended (`theme/setting/04-permanence-and-passage.md`
  is quoted as forbidding any marker of entering a finished area) or may be a missing readout.
- `snapshot.upgrades[id]` missing reads as level **0**, per `stateShape`'s note. Applied by
  `or 0` rather than by trusting the server.
- The found count counts map entries whose **value is truthy**, not the number of keys, so a
  `found[name] = false` could never read as found. It does not check the name against
  `GameConfig.RelicSets`, so a junk key would inflate the count above 24.
- The finds total is the **sum of `#set.relics` over every set** (24), computed at bind time,
  not `RelicsPerArea * #RelicSets` and not `RelicsPerArea * AreasPerDepth`. The note says
  "total finds across collection.sets", which is the sum; the other two happen to agree today.
- The currency and cost numbers are floored before `%d`, because `string.format("%d", 1.5)`
  is a hard error in Luau. Awards are `max(1, floor(...))` so this should never bite; it is a
  guard, not a rounding policy.
- The bar fraction is **clamped to [0, 1]** and guarded against `patchCount <= 0`, neither of
  which the brief contemplates (`clearedCount` is documented as never exceeding
  `patchCount`).
- The bar is **not re-tweened when the fraction is unchanged**, which is what makes a
  duplicate snapshot free rather than restarting the animation. The previous tween is
  explicitly `Cancel`led before a new one starts rather than relying on TweenService's
  implicit takeover.
- The **first** snapshot tweens like any other, so a rejoining player at 80% sees the bar
  sweep up from 0. Snapping the first one and tweening the rest is an equally reasonable
  reading of "animates rather than snapping", and produces a different first three seconds.
- The bar fill is sized `UDim2.fromScale(fraction, 1)` exactly as stated, i.e. the fill's
  height is forced to scale 1 whatever the emitted screen set it to.

**Formatting characters**

- `"Lv %d  ·  %s"` uses two spaces, U+00B7, two spaces, copied verbatim from the note.
- The bar label separator is a spaced U+2014 em dash, also verbatim. Both are non-ASCII and
  neither is stated to be safe in whatever font the emitted screen uses.
- `"%d / %d"` for the finds readout: spaces around the slash, because the note writes
  `"<found count> / <total finds…>"` with them.
- `string.upper` on `GameConfig.Area.label` and on each upgrade label. Luau's `string.upper`
  is byte-wise ASCII; a label with an accent would not uppercase.

**Module shape**

- The `gui: ScreenGui` parameter is **accepted and never used**. The interface says it is
  there "for screen-level state such as `Enabled`" and no screen-level state is specified, so
  writing anything to it (including `gui.Enabled = true`) would be inventing behaviour.
- Nothing is computed at require time beyond the two `require`s and the shared-root
  `WaitForChild` the tree rules mandate. The finds total, the uppercased area label and the
  `TweenInfo` are all built inside `bind`, because `TweenInfo.new` is a Roblox datatype
  constructor and `GameConfig`'s own header makes a point of constructing none at load.
- Exported types `Snapshot` and `Updater` are added; the brief names neither. `Snapshot`
  duplicates the five field names `Protocol.snapshotShape()` already owns, which is exactly
  the duplication the bind-time check above exists to catch.
- Local names (`shardsValue`, `findsValue`, `barLabel`, `barFill`, `upgradeBindings`,
  `lastFraction`, `activeTween`), the `UpgradeBinding` record shape, and the choice to drop
  unresolved upgrade rows from that array rather than keep a nil hole, are all mine.

## Assumed about a dependency

- **`Protocol`** exists at `game/src/shared/Protocol.luau` and is reachable as
  `require(Shared.Protocol)` where `Shared` is `ReplicatedStorage:WaitForChild("UIForge")`. I
  read its source to check the signature: `snapshotShape()` returns a frozen ordered
  `{ string }` and does no work at require time, both of which this module relies on (it
  calls it once per bind and only iterates the result). I do not call `channel()`; the brief
  gives `client-main`, not this module, the job of connecting `StateChanged` to the updater.
- **`GameConfig`** is reachable the same way and supplies `Upgrades` (with `id`, `label`,
  `maxLevel`, `costBase`, `costGrowth`), `Area.label`, `Area.patchCount`, `RelicSets[].relics`
  and `upgradeCost(def, level)`. I assumed `upgradeCost` accepts a full upgrade entry even
  though it is annotated `{ costBase: number, costGrowth: number }` (Luau width subtyping
  makes this legal, and it type-checks with the real shape stubbed in).
- **`upgradeCost(def, level)` at the held level is the price of the NEXT level**, since level
  0 gives `costBase * growth^0 = costBase`. The interface note's format string implies this
  but does not state it; the affordability test depends on it entirely.
- **`UIBuilder.build`** has already run and returned a Root frame whose descendants are the
  named nodes, and `bind` is called after it. If `bind` were ever called first, every path
  would miss and the HUD would warn seven times and then do nothing.
- **`client-main`** owns the `StateChanged` connection, the `RequestState` pull and the order
  between them; this module assumes only that the same updater receives both and that
  duplicates are expected.
- **The server is the only writer of a snapshot**, so payload fields are typed as present and
  correctly typed rather than validated one by one. Only whole-snapshot nil is guarded.
- **The emitted screen** at `game/src/shared/Screens/hud.luau` does not exist in this working
  root, so every node path is taken on faith from the interface note and none could be
  checked against the artifact that defines them. This is the single largest untested
  assumption in the module: if any name is wrong, the result is a warning and a dead readout,
  which is at least the failure mode criterion 1 asks for.

## Verification

**`luau-lsp analyze` with the Roblox definitions and the two requires resolved: clean, exit 0,
zero diagnostics.** No Roblox definition file or Rojo project file exists in this working
root, so I fetched `globalTypes.d.luau` and hand-wrote a sourcemap mapping
`ReplicatedStorage.UIForge` at `game/src/shared`, which makes `require(Shared.GameConfig)` and
`require(Shared.Protocol)` resolve to the real modules. That is the check that matters: it
type-checks this module against the actual emitted `GameConfig` and the actual `Protocol`, not
against a stub of them. Both scratch files were outside the build root and are deleted.

That check found one real defect, which is now fixed: writing `node.Text` where `node` is
`TextLabel | TextButton | TextBox` is rejected outright ("Expected type table, got
'TextBox | TextButton | TextLabel'"), because Roblox class types do not support a property
write through a union. Four call sites now go through a `setText` helper that narrows per
class. Worth recording that a table-typed union *does* accept the same write, so a probe
against stub types passes it — the defect is only visible with real class types.

`luau-analyze` (the Homebrew build, which has no `--defs` flag and no way to load Roblox
definitions) reports 29 diagnostics, **all environmental**: `Unknown global 'game' / 'warn' /
'Enum' / 'TweenInfo' / 'UDim2'`, `Unknown type 'Instance' / 'GuiObject' / 'ScreenGui' /
'TextLabel' / 'TextButton' / 'TextBox' / 'Tween'`, `Unknown require: unsupported path` twice,
and knock-on errors from those requires resolving to `unknown` (`Type 'unknown' does not have
key 'relics' / 'label'`, and `Expected this to be 'string', but got 'unknown'` out of
`string.format`, reproduced in isolation to confirm the cause). None survive once the
definitions are present.

I also executed the module under `luau` against fake HUD nodes. The readouts come out as `0`,
`2 / 24`, `Lv 10  ·  MAX`, `Lv 3  ·  214  BUY`, `Lv 0  ·  60  NEED`,
`EAST TERRACE — 99% CLEAR` and `EAST TERRACE — 100% CLEAR`; a duplicate snapshot creates no
second tween and cancels nothing; a bind against an empty Root warns seven times, once per
unresolved path, and the updater then does nothing without erroring.
