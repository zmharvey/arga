# 06 — Representation

**Stage:** architect · **Key:** representation

## Decision

**Nothing in this game is a mesh or a model, and no asset needs to be produced to build it.**

| subject | is | count at runtime |
|---|---|---|
| `patch` | a `Part` (a `WedgePart` for Heartvine), anchored, non-colliding, **sized and rotated per `tier.shape`** | up to `area.patchCount` per plot, and **exactly 0** once that plot's owner has `areaComplete` |
| `plot` | one `Part` — the ground slab, which is also the container everything else parents to. **It spans the whole slot pitch, so neighbouring slabs share an edge** | 1 per connected player |
| `plot-barrier` | four invisible collidable `Part`s standing on the slab at the area boundary | 4 per plot |
| `spawn-anchor` | an `Attachment` on the plot slab | 1 per plot |
| `relic` | **nothing.** A Find has no Instance anywhere | 0 |
| `hud` | a `ScreenGui` created by `client-main`; everything inside it built by `ui-forge`, not by this build | 1 per client |

Two invariants a builder can check with a tape measure:

- **Every patch's world bounding box is `patch.footprint` x `tier.height` x `patch.footprint`,
  and the top of every patch is exactly `tier.height` above the slab** — whatever shape it is.
  The one exception is the Ball, which is `tier.height` on all three axes because a sphere has
  only one dimension to give.
- **A character cannot leave the slab it spawned on**, and there is no air within
  `area.size / 2 + 20` studs of any point it can stand on.

## Why

- **A patch is a Part because `tiers` already named Roblox part shapes.** `[cid: decided]`
  `gameplay/systems/01-overgrowth-tiers.md` ships `shape` values of `Block`, `Cylinder`, `Ball`
  and `Wedge`, and it makes silhouette *the primary channel* for rarity on a
  `[brief: binding]` accessibility constraint. Three of those four are `Enum.PartType` members
  on an ordinary `Part`; `Wedge` is the class `WedgePart`. So the accessibility requirement is
  satisfied by primitives, with no asset pipeline, no upload, and nothing for a build agent to
  wait on. A mesh set would satisfy it too and would block the build on 4 assets nobody has
  authored.
- **THE PLAYTEST DEFECT: naming the shape is not enough, because two of the four do not mean
  what a builder reads them to mean.** This sheet used to list `Shape`, `Size`, `Position`,
  `Color`, `Material`, `Anchored`, `CanCollide`, `CastShadow`, `Name` and `Parent` — and no
  rotation, with one `Size` formula for all four tiers. Under that spec:
  - `Enum.PartType.Cylinder` runs its **axis along local X**, so `Size = (3, 2.4, 3)`
    unrotated is a 3-stud-long cylinder lying on its side, 2.4 studs in diameter. The Fern
    renders as a fallen log.
  - `Enum.PartType.Ball` renders a sphere whose diameter is the **smallest** component, so
    `Size = (3, 2.8, 3)` silently discards the 3-stud footprint and gives a 2.8 sphere. The
    number the builder wrote and the number the engine used were different.
  - A `WedgePart`'s slope faces whatever direction its `CFrame` points it, and nothing pointed
    it anywhere.

  `tiers` carries a hard schema check that no two tiers may share a shape, because **shape is
  the rarity channel that survives colour being removed.** A tier that renders as the wrong
  solid does not degrade the accessibility rule, it deletes it — and it is the one rule in the
  whole brief a machine can check. So the geometry is now stated per shape, in
  `geometryByShape`, and `Orientation` is a property of a patch like every other.
- **`Wedge` is the one that needs saying twice.** `Part` has no `Enum.PartType.Wedge`; a
  builder setting `Shape` to a wedge gets a runtime error or, worse, silently keeps a block and
  the fourth silhouette collapses into the first. Heartvine is the 6%-weight tier, so the
  failure is rare enough to survive a playtest.
- **The Ball gives up the footprint, not the height.** A sphere cannot be 3 wide and 2.8 tall,
  and one creative number has to bend. `[architect: decided]` the diameter is `tier.height`:
  the height ladder (1.6, 2.4, 2.8, 3.4) is monotone in rarity and doing visible work, while
  the 0.2-stud shortfall against `patch.footprint` is 7% on a value whose job is spacing —
  `area.minSpacing` is 6, twice the footprint, so a *smaller* patch can never cause an overlap
  and undersizing is the safe direction to bend. It also keeps the invariant above true for all
  four tiers: the top of every patch is exactly `tier.height`.
- **The wedges all face the same way, and that is a choice rather than an oversight.**
  `[architect: arbitrary]` `Orientation` is `(0, 0, 0)` for Heartvine, so the slope direction is
  the engine's unrotated default, identically on every plot in every server. A per-patch yaw
  would look better and would need a deterministic source of rotation; `layout` owns
  determinism and its records carry no rotation field, so adding one is a change to the record
  that `state.cleared` is keyed against. Not worth it for ~8 patches in 140.
- **The plot slab is the container, so there is no Folder.** A `Part` may parent other parts.
  Collapsing container and floor into one Instance means destroying a plot is one `Destroy`,
  the ground cannot outlive its patches or its barriers, and the enum in this contract does not
  have to describe a Folder. `[architect: arbitrary]` a `Folder` holding a separate ground part
  is equally correct; I picked one because two builders would pick differently.
- **THE PLAYTEST DEFECT: the slab is the ground, and the ground had holes in it.** Plots are one
  row along +X at a pitch of `area.size + 40` = 160 studs, and the slab was `area.size` = 120,
  so **40 studs in every 160 were not floor.** The shipped `Baseplate` is 400 studs centred on
  the origin, so it covers the first gutter and part of the second and then stops: slot 2
  overhangs it and slot 3 is entirely past it. A player who walked off their slab fell out of
  the world, and the only thing preventing it was not walking that way. Two changes, and they
  are independent on purpose:
  1. **The slab now spans the full slot pitch**, `area.size + 40` = 160 square, so adjacent
     slabs share an edge and **there is no gap between plots at any slot index**. The gutter
     survives exactly as designed — it is still 40 studs, and it is still the separation
     between two players' fields — it is simply made of floor instead of air.
  2. **Four barriers stand at the area boundary**, ±`area.size / 2` from the plot origin, so a
     character cannot enter the gutter, cannot reach a neighbour, and is never within 20 studs
     of a slab edge.

  Either one alone stops the fall the playtest found. Together, reaching air requires passing
  a collision hull *and* crossing 20 studs of another plot's floor, which is what "impossible by
  construction" means here as against "nobody walks that way".
- **The gutter is not deleted, it is enforced for the first time.** Before this it was a
  *gap in the geometry* and a player was free to stand in the middle of it or walk into the
  next plot; now it is 40 studs of no-man's-land that neither neighbour can enter. Note that no
  cross-player interference was ever possible through it — `clearing.tick` measures a character
  against *its own state's* patches and nothing else, so the separation is spatial and social,
  not mechanical.
- **The barriers are invisible and do not answer raycasts.** `Transparency` 1 because a
  12-stud opaque wall on a 120-stud terrace would enclose the view and, worse, would be
  *construction* — `[cid: decided]` `theme/setting/04-permanence-and-passage.md` `W3` requires
  any area's walls to carry exactly two openings, and this build has no second area for an
  opening to lead to. A collision hull with no surface is not a wall and does not trigger that
  rule; it also leaves the boundary free for Art to build the real one on later, on exactly this
  rectangle. `CanQuery` is false so the default camera's occlusion raycasts pass straight
  through: an invisible wall that the camera collides with makes the view jam whenever a player
  stands near the boundary, which is the standard way this fix goes wrong.
- **12 studs tall, which is not a taste call.** A default `Humanoid` apexes around 7.2 studs and
  nothing in `upgrades` raises it — `speed` moves `WalkSpeed` only — and every patch is
  `CanCollide false`, so there is nothing on a plot to jump from. 12 leaves ~5 studs of headroom
  over the highest reachable point, and costs nothing.
- **The ground is per-plot, and that is forced.** A single world floor would have to be sized to
  a player cap; `plots` allocates slots without one. The shipped `Baseplate` is not the terrace
  and nothing parents to it. `tree` forbids the build from editing `game/default.project.json`,
  so it stays exactly as it is.
- **A Find is not an object.** `[cid: decided]` `gameplay/core-loop/03-reveal-placement.md`
  settles that a Find is *revealed on contact at the instant its patch clears* — an event, not
  a thing that is uncovered and left standing. Its whole durable existence is a key in
  `state.found` and a name on `FindRevealed`. Making it a model would demand 24 assets,
  block the build, and add a second source of truth for a fact the collection map already
  holds. What the reveal *looks* like is a VFX and audio question and is routed below.
- **`spawn-anchor` is an Attachment, not an invisible part and not arithmetic.** It carries a
  CFrame and nothing else: no rendering, no collision, no raycast surface, nothing to make
  invisible and forget. `server-main` needs the point again on every respawn — and since the
  playtest, on every *death* too, which is the only reason a second character ever exists — so
  it has to be discoverable from the plot rather than recomputed. Recomputing it in a second
  module is how two modules end up with two formulas for one location. `[brief: binding]`
  `onboarding.guaranteedFirstRelic` is kept by the player *arriving* at the plot origin, where
  `layout` put the guaranteed Find's patch.
- **`area.originXZ` is the plot CENTRE, not a corner.** Nothing in the creative manifest says
  which, and `layout`'s criterion — "the patch nearest the origin always carries the first
  relic of set one" — plus the onboarding promise both read naturally only if the player spawns
  at the origin with the terrace around them. `[architect: decided]` Centre. Patches span
  +/- `area.size / 2` on X and Z; the slab and the barriers are centred on the same point.
- **The HUD is out of scope by construction, but its one Instance is not.** `BUILD-ORDER.md`
  states that screens come from `ui-forge` via `npm run emit`. It is listed here so a builder
  knows the *structure* is not its job. `createdBy` has to be a module id or the literal
  `"nothing"`, though, because it is an edge in the build graph — and this row used to hold the
  sentence *"client-main, once, and it survives a character respawn rather than being rebuilt"*,
  which read as created by nobody. Resolving it forced the split to be stated: **`client-main`
  creates the `ScreenGui`; `UIBuilder.build` fills it.** Out of scope means the layout, not the
  container, and "out of scope" was never going to make a `ScreenGui` appear.
- **`relic`'s creator is `"nothing"`, flatly.** That row also held a sentence — *"nothing.
  clearing sets state.found[name] and fires FindRevealed"* — which is true and was in the wrong
  field twice over: a `kind: "none"` subject may not name a creator at all, and the two things
  `clearing` does on a reveal are a state write and a channel fire, both already edges elsewhere
  in the graph and neither of them a creation. The reasoning is in `note`; the field says
  `nothing`.

```manifest
{
  "provides": "representation",
  "value": [
    {
      "subject": "patch",
      "kind": "part",
      "rationale": "tiers already names Enum.PartType shapes, and silhouette is the primary rarity channel on a binding accessibility constraint. Primitives satisfy it with no asset to produce, so nothing blocks the build.",
      "class": "Part for Block, Cylinder and Ball; WedgePart for Heartvine — Enum.PartType has no Wedge member, and getting this wrong silently collapses the fourth silhouette into the first",
      "properties": {
        "Shape": "Enum.PartType[tier.shape] for Block, Cylinder and Ball; not set at all on a WedgePart",
        "Size": "PER SHAPE — see geometryByShape. It is NOT Vector3.new(patch.footprint, tier.height, patch.footprint) for every tier: that formula is what lays the Cylinder on its side and throws away the Ball's footprint.",
        "Orientation": "PER SHAPE — see geometryByShape. Vector3.new(0, 0, 90) for the Cylinder, Vector3.new(0, 0, 0) for Block, Ball and Wedge. Set after Position; rotation is about the part's own centre so the two do not interact.",
        "Position": "the patch's world position, with Y at tier.height / 2 above the slab's top face. TRUE FOR ALL FOUR SHAPES, which is the point of the sizes below: an upright cylinder of length tier.height, a sphere of diameter tier.height and a wedge of height tier.height all have their centre at tier.height / 2 and their top at exactly tier.height.",
        "Color": "Color3.fromRGB(unpack(tier.rgb)) — the SECONDARY channel; shape carries rarity first",
        "Material": "Enum.Material[patch.material] — Grass",
        "Anchored": "true",
        "CanCollide": "false — patch.collides is false, and it is load-bearing: contact clearing with movement-only input must never be blocked by the thing being cleared. It is also why a plot has nothing on it a character can climb or jump from.",
        "CastShadow": "false — up to 140 per plot times the player count, and shadows are the cheapest thing to give up",
        "Name": "\"Patch\" plus the 1-based layout index, so a live Instance can be traced to its state.cleared key",
        "Parent": "the plot slab"
      },
      "geometryByShape": {
        "Block": {
          "class": "Part",
          "Shape": "Enum.PartType.Block",
          "Size": "Vector3.new(patch.footprint, tier.height, patch.footprint) — 3 x 1.6 x 3 for Moss",
          "Orientation": "Vector3.new(0, 0, 0)",
          "why": "A Block's local axes are its world axes. This is the only shape the old single formula got right, which is why the bug survived: 52% of every plot looked correct."
        },
        "Cylinder": {
          "class": "Part",
          "Shape": "Enum.PartType.Cylinder",
          "Size": "Vector3.new(tier.height, patch.footprint, patch.footprint) — 2.4 x 3 x 3 for Fern. THE LENGTH GOES IN X.",
          "Orientation": "Vector3.new(0, 0, 90)",
          "why": "A Roblox Cylinder's axis runs along its LOCAL X: Size.X is the length between the two flat circular faces and Size.Y and Size.Z are the diameter. So an upright cylinder is length in X, footprint in Y and Z, rolled 90 degrees about Z to stand local X up along world Y. Unrotated, the Fern is a log lying on the ground and reads as a second Block."
        },
        "Ball": {
          "class": "Part",
          "Shape": "Enum.PartType.Ball",
          "Size": "Vector3.new(tier.height, tier.height, tier.height) — 2.8 cubed for Bramble",
          "Orientation": "Vector3.new(0, 0, 0)",
          "why": "A Ball renders a sphere whose diameter is the SMALLEST of the three components and ignores the other two, so any non-cubic Size is a lie about what appears on screen. tier.height wins over patch.footprint: it keeps the height ladder exact and the top of the patch at tier.height like every other tier, and it errs 0.2 studs SMALL against a footprint whose only consumer is a 6-stud spacing floor."
        },
        "Wedge": {
          "class": "WedgePart",
          "Shape": "not set — a WedgePart has no Shape property, and Enum.PartType has no Wedge member. Assigning one is a runtime error at best and a silent Block at worst.",
          "Size": "Vector3.new(patch.footprint, tier.height, patch.footprint) — 3 x 3.4 x 3 for Heartvine",
          "Orientation": "Vector3.new(0, 0, 0)",
          "why": "A WedgePart's own axes match a Block's; what a rotation would change is which way the slope faces, and nothing in the design cares. Fixed at zero so every Heartvine on every plot in every server is identical, rather than left unstated so that two builders pick two conventions."
        }
      },
      "createdBy": "plots",
      "destroyedBy": "clearing, one at a time as it clears them, and plots when the whole plot goes",
      "asset": null,
      "note": "The count is \"up to\" deliberately. A rejoining player gets one Instance per index state.cleared does not mark, and a player whose state.areaComplete is true gets ZERO — a finished area stays walkable and stays bare, [cid: decided] theme/setting/04-permanence-and-passage.md W2. plots.spawn owns that test and is the only module that may create one of these. THE MEASURABLE RULE, whatever the shape: the world bounding box is patch.footprint x tier.height x patch.footprint, except the Ball at tier.height cubed, and the highest point of every patch is exactly tier.height above the slab's top face."
    },
    {
      "subject": "plot",
      "kind": "part",
      "rationale": "One Part is both the ground a player walks on and the container its patches and barriers parent to, so tearing a plot down is one Destroy and the floor cannot outlive the things standing on it. A Folder plus a separate ground part is equally correct; this is the arbitrary half of the call and is stated so two builders do not make it differently.",
      "class": "Part",
      "properties": {
        "Size": "Vector3.new(area.size + 40, 1, area.size + 40) — 160 x 1 x 160. THE FULL SLOT PITCH, not area.size: 40 is the plot gutter that interfaces.plots.claimSlot puts between slot origins, so consecutive slabs share an edge exactly and there is no air between two plots at any index. The playable field is still area.size (120) and is fenced at that boundary by plot-barrier; the extra 20 studs on each side are the gutter's half, and they are floor rather than a hole.",
        "Position": "the slot origin, with the top face at Y = 0 so the slot origin doubles as the walkable plane. Centre Y is therefore -0.5.",
        "Anchored": "true",
        "CanCollide": "true — this is the one thing in the plot the player stands on",
        "Material": "Enum.Material.Slate",
        "Name": "\"Plot\" plus the slot index",
        "Parent": "Workspace"
      },
      "createdBy": "plots",
      "destroyedBy": "plots, in despawn",
      "asset": null,
      "note": "Slabs TILE the row: slot n is centred at (n - 1) * 160 on X and is 160 wide, so slot 1 spans -80..80, slot 2 spans 80..240, and so on with no gap and no overlap. That, plus plot-barrier, is the whole of the playtest fix for falling out of the world. The Baseplate in game/default.project.json is NOT this: it is 400 studs square, it is a lobby floor, nothing parents to it, and tree forbids the build from editing the project file. Slot geometry is in interfaces, under plots.claimSlot."
    },
    {
      "subject": "plot-barrier",
      "kind": "part",
      "rationale": "A collision hull with no appearance, so that leaving your own plot is impossible rather than merely unlikely. The playtest found a player could walk off the slab into the gutter and fall out of the world; the slab now tiles the row so there is no hole to fall into, and this stops a character reaching the outer rim where there still is one. It is deliberately not a wall: a wall is construction, and theme/setting/04-permanence-and-passage.md W3 obliges any wall to carry exactly two openings into somewhere, and there is no second area yet for one to lead to.",
      "class": "Part — four of them per plot",
      "properties": {
        "Size": "two of Vector3.new(1, 12, area.size + 2) and two of Vector3.new(area.size + 2, 12, 1). The + 2 makes the four overlap at the corners, so there is no one-stud diagonal gap to squeeze through.",
        "Position": "relative to the plot origin: the two long-in-Z barriers at X = +/- (area.size / 2 + 0.5), the two long-in-X barriers at Z = +/- (area.size / 2 + 0.5), all four at Y = 6. Their INNER faces sit exactly on the area boundary at +/- area.size / 2, which is 60, and the farthest patch edge is 58.5, so nothing intersects them.",
        "Anchored": "true",
        "CanCollide": "true — the one property that does the work",
        "Transparency": "1",
        "CanQuery": "false — the default camera's occlusion raycasts must pass through, or the view jams every time a player walks up to the boundary. This is the standard way an invisible wall goes wrong and it is one property to prevent.",
        "CanTouch": "false — nothing in the game uses Touched, and a barrier is the last thing that should start",
        "CastShadow": "false",
        "Material": "Enum.Material.SmoothPlastic",
        "Name": "\"Barrier\" plus one of PosX, NegX, PosZ, NegZ",
        "Parent": "the plot slab"
      },
      "createdBy": "plots",
      "destroyedBy": "plots, with the slab",
      "asset": null,
      "note": "12 studs tall because a default Humanoid apexes near 7.2 and nothing in upgrades raises jump — speed moves WalkSpeed only — and every patch is CanCollide false, so a plot contains nothing to climb. Built in plots.spawn alongside the slab, for every plot, including one whose owner has areaComplete true and therefore no patches at all. This is where Art's terrace wall goes when it exists: same rectangle, and W3's two openings become two gaps in this ring at the same moment they become two gaps in the wall."
    },
    {
      "subject": "spawn-anchor",
      "kind": "attachment",
      "rationale": "The character has to arrive at the plot origin for the guaranteed first Find to be under the patch it walks into, and server-main needs that point again on every respawn and on every death. An Attachment is a CFrame with no geometry, no collision and nothing to make invisible; holding it on the plot means the location is derived once, by plots, rather than twice by two modules.",
      "class": "Attachment",
      "properties": {
        "Name": "\"Spawn\"",
        "Position": "Vector3.new(0, 0.5, 0) relative to the plot slab — the slab's top face at its centre",
        "Parent": "the plot slab"
      },
      "createdBy": "plots",
      "destroyedBy": "plots, with the slab",
      "asset": null,
      "note": "plots.spawn returns this Attachment's WorldCFrame. server-main pivots the character to it plus 3 studs of Y on every CharacterAdded — which now includes the character wiring.onDeath loads, so a player who dies returns to their own plot and not to wherever Roblox would have put them. There is no SpawnLocation anywhere: a static spawn point cannot land a player inside a plot that is allocated after they join."
    },
    {
      "subject": "relic",
      "kind": "none",
      "rationale": "A Find has no Instance at any point in its life. gameplay/core-loop/03-reveal-placement.md settles that it is revealed on contact at the instant its patch clears — an event, not an object left standing. Its durable existence is a key in state.found; its transient existence is one FindRevealed remote carrying a name. Representing it as a model would demand 24 assets that do not exist, block the build on them, and create a second source of truth for a fact the collection map already holds.",
      "class": null,
      "createdBy": "nothing",
      "destroyedBy": "nothing",
      "asset": null,
      "note": "createdBy is \"nothing\" in the strict sense the graph needs: no module creates an Instance for a Find, at any point, ever. What DOES happen on a reveal is that clearing sets state.found[name] and fires FindRevealed — a state write and a channel, both of which are edges the graph already carries elsewhere, and neither of which is a creation. Which patch hides which Find is layout's Patch.relic, a string or nil, set at build time. That field is the entire world-side representation of a Find and it is data, not an Instance."
    },
    {
      "subject": "hud",
      "kind": "gui",
      "rationale": "Built by ui-forge from ui-forge/briefs/hud.brief.json and emitted to game/src/shared/Screens/hud.luau, which is DATA that UIBuilder.build turns into Instances. Deliberately outside the build order: no module in it authors UI structure.",
      "class": "ScreenGui",
      "createdBy": "client-main",
      "destroyedBy": "nothing during a session",
      "asset": null,
      "note": "client-main creates the ScreenGui itself, ONCE, in wiring.onClientBoot step 1, and it survives every character respawn — including the one wiring.onDeath causes — rather than being rebuilt; that is client-main's second criterion. Its CONTENTS are created by UIBuilder.build(Screens.hud, Theme, screenGui) from the emitted screen DATA at game/src/shared/Screens/hud.luau, which is why no module in this build authors UI structure: ui-forge owns the shape, client-main owns the one Instance it hangs from, and neither is the other. hud-binding writes text and sizes into named nodes and is forbidden from creating any Instance except a Tween. The node paths are in interfaces, under hud-binding.bind."
    }
  ]
}
```

## Consequences for the builders

A builder may now assume:

- **No asset id is needed anywhere.** If a module seems to want one, that is a stop, not a
  placeholder.
- That a plot is one `Destroy` away from gone, and that destroying it takes its patches, its
  four barriers, its ground and its spawn point with it.
- That the plot slab's top face is at `Y = 0`, so a patch's Y is `tier.height / 2` for **every**
  tier and the spawn CFrame is 3 studs above the origin.
- That a patch's `Size` depends on `tier.shape` and is written in the part's **local** axes, and
  that only the Cylinder is rotated.
- That there is no reachable air. A character on a plot cannot leave it, and the floor under the
  gutter is continuous with both neighbours.
- That a Find never needs to be found in the world, only in `state.found`.
- That nothing in a plot is a `Folder`. The one Folder this build creates is
  `ReplicatedStorage.Remotes`, which is transport rather than a subject here: `protocol` creates it
  in `createRemotes()` and `interfaces` fixes its name and contents.
- That a finished plot is a slab, four barriers and a spawn Attachment, forever.
- That `createdBy` names exactly one module for every subject that has an Instance, and that the
  module named there is the only one permitted to create it. `patch`, `plot`, `plot-barrier` and
  `spawn-anchor` are `plots`; `hud` is `client-main`; `relic` is `nothing` and there is nothing
  to create.

A builder may **not** assume:

- That `Workspace.Baseplate` is the terrace, or that anything may be parented to it, or that
  `game/default.project.json` may be edited to change it.
- That `Enum.PartType.Wedge` exists.
- That one `Size` formula works for all four tiers, or that an unrotated Cylinder stands up.
- That a patch may collide, cast a shadow, or be given a `Touched` handler. Clearing is a
  server-side proximity test on a tick; `Touched` fires from client-authoritative physics and
  is prohibited by `clearing`.
- That the barriers may be made visible, given a material a player can see, or opened. A gap in
  the ring is a way out of the world until a second area exists.

## Acceptance criteria

1. `grep -rn "rbxassetid" game/src` returns nothing.
2. Every patch Instance has `Anchored` true and `CanCollide` false, and its **world** bounding
   box measures `patch.footprint` x `tier.height` x `patch.footprint` — except Bramble, which
   measures `tier.height` on all three axes. A Fern measuring 3 wide and 2.4 tall has not been
   rotated and is a build failure.
3. The four tiers produce four visually distinct silhouettes with `Color` forced to one value:
   a block, an upright cylinder standing on a circular face, a sphere and a wedge. Heartvine is
   a `WedgePart`, and no file assigns `Enum.PartType.Wedge`.
4. The top of every patch is exactly `tier.height` above the slab, for all four tiers, measured
   on a plot with at least one of each.
5. Destroying the plot slab leaves no Instance from that plot anywhere in `Workspace` —
   patches, barriers and the spawn Attachment included.
6. **Falling is impossible.** Walking into each of the four barriers stops the character;
   jumping at one does not clear it; and there is no point on any plot from which a character
   can reach air. Two players in slots 1 and 2 stand on continuous floor between their fields
   and neither can enter the gutter.
7. The default camera does not push in when a character stands against a barrier, which is
   `CanQuery` being false.
8. A player standing at their spawn anchor is within `movement.baseClearRadius` of the patch
   carrying the first Find of set one.
9. No `SpawnLocation` exists in the project, and no plot is parented to `Workspace.Baseplate`.
10. A freed slot reused by a new player has exactly one slab, four barriers and one Attachment
    — no leftovers from the previous occupant.
11. `client-main` is the only module that creates a `ScreenGui`, and it creates exactly one.
    `grep -rln "ScreenGui" game/src/client` names `init.client.luau` and no other module file —
    `calibrate.client.luau` is a development harness and not a module in this contract — and
    `HudBinding.luau` contains no `Instance.new` at all, since a tween comes from
    `TweenService:Create`.

## Not decided here

What the clear-away effect and the reveal look like (Art — VFX), what they sound like (Audio —
Stingers), and how a reveal reads on screen (UI/UX — Feedback). All three fire off
`FindRevealed` and off a patch destruction, both of which this sheet and `interfaces` fix; none
of them changes what an object is *made of*.

How the terrace is dressed beyond the slab — walls, props, skybox, ruin geometry (Art —
Environment). Any of that may add Instances to `Workspace`; none of it may parent to a plot or
collide with a patch. **Two inherited requirements land on whoever builds walls.** First,
`[cid: decided]` `theme/setting/04-permanence-and-passage.md` `W3` requires every area to carry
exactly two openings, one inward and one outward, built as construction that was always open
and never as a doorway, arch, gateway or anything a hinge would belong to; the barrier ring
above is that rectangle, so a real wall is built on it and the two openings are two gaps in
both at once — and neither may be opened before a second area exists on the other side.
Second, `Workspace.Baseplate` and slot 1's slab both put a top face at `Y = 0` and overlap in
plan, which is a coincident-surface condition Art will want gone; `tree` forbids the build from
editing `game/default.project.json`, and `tree`'s "Not decided here" is where project-file
changes are collected for whoever gets to own that file.

**Back to CID, one item:** `art/objects/01-patch-footprint.md` ends with "the foliage models
themselves" left to Art — VFX. This sheet answers "what is it made of" with primitives, on the
grounds that primitives already satisfy the binding accessibility constraint and no asset
exists. If Art later specs actual foliage meshes, `patch.kind` becomes `mesh`, this contract
starts requiring an asset per tier, and the build blocks until those four assets exist. That is
a real cost and Art should know it is spending it before it does. It would also retire
`geometryByShape`, which exists only because `Enum.PartType` members disagree about what `Size`
means.
