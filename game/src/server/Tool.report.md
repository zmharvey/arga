# Build report — tool

## Stops

Sorted: the first three change what a player sees or would make two builders ship
different games. The rest are narrower.

1. **The representation row specifies ONE WeldConstraint, and one is not enough to hold
   the tool together.** `representation.tool.class` is "Model containing two Parts and one
   WeldConstraint" and `properties.weld` is "one WeldConstraint from the handle to the
   character's RightHand". Every part is `Anchored = false` and `Massless = true`. With
   only that constraint the HEAD is joined to nothing, and an unanchored massless part
   joined to nothing falls through the world on the frame it spawns — every player would
   see the tool lose its head at every spawn. I built **two** WeldConstraints (handle→
   RightHand named `HandWeld`, head→handle named `HeadWeld`). The alternative readings a
   second builder could take — weld the head to RightHand as well, anchor the head, or
   make the tool one part — all differ visibly or violate another stated property. What I
   needed and could not find: a statement of how the head is joined to the handle.

2. **No pose is stated for the handle relative to the hand.** Sizes are given for both
   parts and nothing says where the tool sits, which way it points, or how it is rotated
   in the fist. A WeldConstraint freezes whatever relative CFrame exists when it is
   created, so this is not a detail a builder can decline to decide — it is the entire
   visible placement of the one held object in the game. I set `handle.CFrame =
   RightHand.CFrame` (the handle centred on the hand part, sharing its orientation, its
   1.4-stud length along the hand's own Z). That is a placeholder, marked as such in the
   source. Two builders would place this differently and both games would look different.
   The head-to-handle offset I did NOT invent: it is `handleSize.Z / 2 + headDepth / 2`,
   the two stated sizes touching, so the head is flush on the handle's front face.

3. **The rig type is never stated, and `tool.attachment` names an R15-only part.**
   `RightHand` exists on an R15 character and does not exist on R6, where the limb is
   `Right Arm`. Nothing in the brief, in `GameConfig`, or in `game/default.project.json`
   fixes `StarterPlayer.AvatarSettings` / the rig type, and `tree` forbids editing the
   project file. On an R6 server this module warns and builds no tool at all, which fails
   acceptance criterion 1 ("a player owning zero products spawns with a tool welded to the
   right hand"). I did not invent an R6 fallback limb name. What I needed: either a stated
   rig type or a stated fallback attachment.

4. **`(1.75 × effective radius)` is not `(1.75 × head width)`, and the two acceptance
   criteria do not quite agree.** The formula the interface note carries is affine, not
   proportional: width = 1.2 + 0.35 × (effective − 5.5) / 1.1. At Reach 8 the head is
   **4.0 studs**; owning Span it is **7.4125 studs**, a ratio of **1.853**, not 1.75. The
   criterion that matters (`products`: "a build where the two widths are equal is a
   failure") is satisfied and Span is very visible; but a reader who expects the head to
   scale with the factor will find it does not, and a builder who implements "1.75× the
   width" instead of "the stated expression" ships a different number. I implemented the
   stated expression verbatim. What is missing is a line saying which of the two is
   intended.

5. **Nothing states an upper bound on head width, and the radius ceiling permits a very
   large one.** `modifiers.ceiling("radius", n)` is 60 studs, which maps to a head
   **18.54 studs wide** — a sixth of the 120-stud lane, held in one hand. At shipped
   values the worst reachable case is all four sets complete plus Span: effective 36.04,
   head **10.92 studs**. `tool.headWidthBaseTestRangeStuds` and
   `headWidthPerLevelTestRangeStuds` bound the two inputs and nothing bounds the product.
   I applied no cap, because inventing one is exactly the forbidden move. If a 10.9-stud
   head is wrong, the missing value is a `tool.headWidthMaxStuds`.

6. **No colour, material or transparency for either part.** The tool is the one object
   the player looks at all game and no key names its appearance —
   `representation.tool.properties` lists sizes and physics flags only. I set none of
   them, so the engine defaults (Medium stone grey, Plastic, opaque) stand. Two builders
   would ship two differently-coloured tools; I judged "set nothing" to be the only
   defensible non-invention, but a stated `tool.rgb` / `tool.material` would settle it.

7. **Five of the tool's seven dimensions are not in `GameConfig`.** `handle.Size`
   (0.3, 0.3, 1.4) and the head's thickness (0.2) and depth (0.6) live in the
   `representation` key and in no emitted config block; only `headWidthBaseStuds` and
   `headWidthPerLevelStuds` reached `GameConfig.Tool`. They are therefore named constants
   in this module, which breaks the rule that re-emitting the config changes behaviour
   without editing code. Not a stop for a *value* — I had the numbers — but the config key
   that should hold them does not exist.

8. **The brief's prohibition list is seven unlabelled entries, not the T1–T12 the
   dispatch names.** My build pack's *Must not* section has seven bullets and no
   identifiers. All seven are honoured: no Roblox `Tool` and no Backpack touch; no
   Humanoid property write anywhere; nothing clears; `Massless`/`CanCollide`/`CanTouch`/
   `CanQuery` all read from `GameConfig.Tool`; no ParticleEmitter and no animation; the
   value and speed axes are never read; and the width resolves from
   `modifiers.effective(state, "radius")` and never from `state.upgrades`. If a T1–T12
   list exists it did not reach the pack, and I could not check against it.

## Decided without a stated value

- **Part names.** `Handle` and `Head`, unstated. `refresh` runs on a character it did not
  build in the same call and has to find the head again; a name is the only stable handle,
  so a lookup by size or by index was rejected. The Model's name `Tool` IS stated.
- **The two WeldConstraint names**, `HandWeld` and `HeadWeld`. Unstated and unread by
  anything.
- **`refresh` on a character with no tool returns silently, with no warning.**
  `onPurchase` step 4 calls it unconditionally, and a purchase can land during
  `runtime.respawnDelaySeconds` while the state is live and the character is not. The next
  `equip` recomputes the width from scratch, so there is nothing to recover. `equip` on a
  nil character also returns silently.
- **`equip` warns exactly once per attempt when `RightHand` is missing**, naming the
  config field. Nothing states whether that case should be silent, a warn or an error. I
  chose warn: it is a defect that produces a visibly missing object and must not kill the
  spawn path, which continues into a snapshot push.
- **`equip` destroys any existing tool on the character before building.** `tool.count`
  is 1 and criterion 5 asks for exactly one after a respawn — which is already true,
  because the old character takes its tool. This makes a double `equip` on one character
  idempotent as well. Nothing states it.
- **`FindFirstChild` rather than `WaitForChild` for `RightHand`.** A `WaitForChild` needs
  a timeout, and no timeout value is stated; an untimed wait on a rig with no such part
  would hang `wiring.onSpawn` before its snapshot push. So the miss is reported instead of
  waited on. If character limbs are ever not present at `CharacterAdded` on the server,
  this becomes a real miss and the missing value is a wait timeout in seconds.
- **Both part CFrames are set before either constraint is created**, and the model is
  parented to the character before the constraints are made. Ordering, unstated, but a
  WeldConstraint created before the pose freezes the wrong pose.
- **The head extends along the handle's −Z** (Roblox's front face) rather than +Z, so it
  points away from the character. The width grows on ±X, symmetric about the handle axis,
  which is what makes `refresh` a pure `Size` write with no re-weld.
- **`refresh` writes `Size` and moves nothing.** Resizing a welded part keeps its centre,
  so the head widens evenly on both sides. A builder who chose to keep the head's inner
  edge fixed would produce a tool that grows to one side only. Unstated.
- **`PrimaryPart = handle`** — stated in the representation row, restated here because it
  is set on a Model that is never `PivotTo`d, so nothing reads it today.
- **`CastShadow = false` on both parts**, which the representation row does state; and
  `Anchored = false`, also stated. Colour, Material, Transparency, Reflectance and
  CollisionGroup are all left at the engine default (see stop 6). The tool is NOT put in
  `social.characterCollision.groupName` — `world.onCharacter` connects `DescendantAdded`
  on the character and will pick it up, and `CanCollide` is false regardless.
- **A zero `perLevel` on the radius upgrade reads as 0 equivalent levels** rather than
  dividing by zero and writing an `inf` Size. Nothing states it; it cannot happen at
  shipped values.
- **A negative equivalent-level count is floored at 0**, so a config in which the clamp
  drove effective radius below `base` would produce the 1.2-stud base head rather than an
  invalid Size. Cannot happen at shipped values (ceiling 60, base 5.5).
- **A missing `radius` row in `GameConfig.Upgrades` is an `error`, not a fallback**,
  matching `modifiers.requireAxis`. The message names the id it looked for.
- **Linear scan over `GameConfig.Upgrades` per call** instead of a built index, because
  `tree.rules` forbids work at require time and the array has three entries. `refresh` is
  not on the tick path.
- **The state parameter is typed `any`** rather than re-declaring `PlayerState`. This
  module never indexes the state — it passes it straight to `modifiers.effective` — and
  `Types.luau` forbids declaring a copy while an instance require gives `luau-analyze`
  nothing to resolve. `Modifiers.luau` records the same tension and solved it with a narrow
  reader type; I had no fields to read, so I did not declare one.
- **`GameConfig` and `Modifiers` are required at the top of the file**, through one
  `WaitForChild` on the shared root and direct indexing after it, per `tree.rules` and
  `tree.requireExample`. That is technically work at require time; the rule against work at
  require time is read as "no side effects", and every stated example does this.
- **Both dependency requires are cast `:: any` and then narrowed to a locally declared
  shape** (`ConfigShape`, and a one-function type for `Modifiers`), which is the pattern
  `Modifiers.luau` uses.
- **No boot-time or per-call assertion that the computed width is inside
  `headWidthBaseTestRangeStuds`.** Those are tuning ranges for the inputs, not runtime
  bounds, and this module has no boot hook in `wiring`.

## Assumed about a dependency

- **`Modifiers.effective(state, "radius")` returns studs, is pure, never yields, and
  already contains `upgrades[radius].base`, every set factor, every purchase factor and the
  one ceiling clamp.** I read the shipped `game/src/shared/Modifiers.luau` to check the
  signature only. The equivalent-level expression subtracts `base` back out, which is
  correct only because step 1 is `upgradeEffect(def, level)` and steps 2 and 3 are pure
  factors on it — if a future axis were `compounding`, the subtraction would still be
  arithmetically defined but would stop meaning "levels".
- **`Modifiers.effective` warns rather than throws on a config defect**, so `equip` cannot
  fail on it. It does `assert` on an unknown axis; `"radius"` is a literal here and comes
  from `upgrades[].id`.
- **`GameConfig.Tool` carries `headWidthBaseStuds`, `headWidthPerLevelStuds`, `attachment`,
  `massless`, `canCollide`, `canTouch` and `canQuery` under exactly those names** —
  verified in the emitted file.
- **`GameConfig.Upgrades` contains a row with `id == "radius"` carrying `base` and
  `perLevel`** — verified.
- **`server-main` calls `equip(player, state)` in `wiring.onSpawn` step 7 with
  `player.Character` already set, the Humanoid and HumanoidRootPart already present, and
  `world.onCharacter` already run**; and calls `refresh(player, state)` in
  `wiring.onPurchase` step 4 on success only, unconditionally, whichever upgrade was
  bought. Neither call is made from a tick. I did not open `init.server.luau`.
- **`entitlements.refresh` has resolved `state.owned` before any `equip`**, per the join
  order, so the first frame's width already includes a purchase factor. Today every
  `gamePassId` is nil, so `owned.span` is false for everyone and the 7.4125-stud head is
  not reachable in a live server until a pass id is filled in.
- **Nothing else creates, destroys, renames or reparents an Instance named `Tool` under a
  character.** `equip` and `refresh` both find the tool by that name.

## Check

`luau-analyze --mode=strict game/src/server/Tool.luau` reports 21 diagnostics and every one
of them is `Unknown global 'game' / 'Vector3' / 'CFrame' / 'Instance' / 'warn'` or
`Unknown type 'Model' / 'BasePart' / 'Player'`. This build of `luau-analyze` (Homebrew) has
no `--definitions` flag and no Roblox type definitions, and the same limitation is recorded
in three earlier build reports. Re-run against a prelude that supplies those globals and
types as `any`, the module is **clean: zero diagnostics, exit 0**. No diagnostic concerns
this module's own logic.

### The three widths this module is checked against

| state | effective radius | head width |
|---|---|---|
| Reach level 0, nothing owned | 5.5 | **1.2 studs** |
| Reach level 8 (cap), nothing owned | 14.3 | **4.0 studs** |
| Reach level 8, owning `Span` | 25.025 | **7.4125 studs** |

The third is **1.853×** the second, **not** 1.75×, because the width mapping is affine:
the `+1.2` base and the `−5.5` base-radius subtraction do not scale with the factor. The
criterion that a build with two equal widths is a failure is met — Span widens the head by
3.4125 studs, 85%, with no level moving — but if 1.75× was meant literally, this formula
does not produce it. See stop 4.
