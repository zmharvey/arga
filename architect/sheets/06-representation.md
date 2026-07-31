# 06 — Representation

**Stage:** architect · **Key:** representation

## Decision

**Nothing in this game is a mesh or a model, and no asset needs to be produced to build it.**

| subject | is | count at runtime |
|---|---|---|
| `patch` | a `Part` (a `WedgePart` for Heartvine), anchored, non-colliding | up to `area.patchCount` per plot |
| `plot` | one `Part` — the ground slab, which is also the container the patches parent to | 1 per connected player |
| `spawn-anchor` | an `Attachment` on the plot slab | 1 per plot |
| `relic` | **nothing.** A Find has no Instance anywhere | 0 |
| `hud` | a `ScreenGui`, built by `ui-forge`, not by this build | 1 per client |

## Why

- **A patch is a Part because `tiers` already named Roblox part shapes.** `[cid: decided]`
  `gameplay/systems/01-overgrowth-tiers.md` ships `shape` values of `Block`, `Cylinder`, `Ball`
  and `Wedge`, and it makes silhouette *the primary channel* for rarity on a
  `[brief: binding]` accessibility constraint. Three of those four are `Enum.PartType` members
  on an ordinary `Part`; `Wedge` is the class `WedgePart`. So the accessibility requirement is
  satisfied by primitives, with no asset pipeline, no upload, and nothing for a build agent to
  wait on. A mesh set would satisfy it too and would block the build on 4 assets nobody has
  authored.
- **`Wedge` is the one that needs saying.** `Part` has no `Enum.PartType.Wedge`; a builder
  setting `Shape` to a wedge gets a runtime error or, worse, silently keeps a block and the
  fourth silhouette collapses into the first. Heartvine is the 6%-weight tier, so the failure
  is rare enough to survive a playtest.
- **The plot slab is the container, so there is no Folder.** A `Part` may parent other parts.
  Collapsing container and floor into one Instance means destroying a plot is one `Destroy`,
  the ground cannot outlive its patches, and the enum in this contract does not have to
  describe a Folder. `[architect: arbitrary]` a `Folder` holding a separate ground part is
  equally correct; I picked one because two builders would pick differently.
- **The ground is per-plot, and that is forced.** `game/default.project.json` ships a
  `Baseplate` 400 studs square. Plots are `area.size` (120) plus a 40-stud gutter apart along
  +X, so slot 3 already ends at 440 and slot 6 is entirely off it. A single world floor would
  need a player cap to size; a slab per plot needs none, and `plots` already builds and tears
  down per player. The shipped `Baseplate` stays as a lobby floor and is not the terrace.
- **A Find is not an object.** `[cid: decided]` `gameplay/core-loop/03-reveal-placement.md`
  settles that a Find is *revealed on contact at the instant its patch clears* — an event, not
  a thing that is uncovered and left standing. Its whole durable existence is a key in
  `state.found` and a name on `FindRevealed`. Making it a model would demand 24 assets,
  block the build, and add a second source of truth for a fact the collection map already
  holds. What the reveal *looks* like is a VFX and audio question and is routed below.
- **`spawn-anchor` is an Attachment, not an invisible part and not arithmetic.** It carries a
  CFrame and nothing else: no rendering, no collision, no raycast surface, nothing to make
  invisible and forget. `server-main` needs the point again on every respawn, so it has to be
  discoverable from the plot rather than recomputed — recomputing it in a second module is how
  two modules end up with two formulas for one location. `[brief: binding]`
  `onboarding.guaranteedFirstRelic` is kept by the player *arriving* at the plot origin, where
  `layout` put the guaranteed Find's patch.
- **`area.originXZ` is the plot CENTRE, not a corner.** Nothing in the creative manifest says
  which, and `layout`'s criterion — "the patch nearest the origin always carries the first
  relic of set one" — plus the onboarding promise both read naturally only if the player spawns
  at the origin with the terrace around them. `[architect: decided]` Centre. Patches span
  +/- `area.size / 2` on X and Z.
- **The HUD is out of scope by construction.** `BUILD-ORDER.md` states that screens come from
  `ui-forge` via `npm run emit`. It is listed here so a builder knows it is not its job.

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
        "Shape": "Enum.PartType[tier.shape] for Block, Cylinder and Ball; not set on a WedgePart",
        "Size": "Vector3.new(patch.footprint, tier.height, patch.footprint) — 3 studs square, height by tier",
        "Position": "the patch's world position, with Y at tier.height / 2 above the slab's top face so it sits on the ground rather than through it",
        "Color": "Color3.fromRGB(unpack(tier.rgb)) — the SECONDARY channel; shape carries rarity first",
        "Material": "Enum.Material[patch.material] — Grass",
        "Anchored": "true",
        "CanCollide": "false — patch.collides is false, and it is load-bearing: contact clearing with movement-only input must never be blocked by the thing being cleared",
        "CastShadow": "false — up to 140 per plot times the player count, and shadows are the cheapest thing to give up",
        "Name": "\"Patch\" plus the 1-based layout index, so a live Instance can be traced to its state.cleared key",
        "Parent": "the plot slab"
      },
      "createdBy": "plots",
      "destroyedBy": "clearing, one at a time as it clears them, and plots when the whole plot goes",
      "asset": null
    },
    {
      "subject": "plot",
      "kind": "part",
      "rationale": "One Part is both the ground a player walks on and the container its patches parent to, so tearing a plot down is one Destroy and the floor cannot outlive its patches. A Folder plus a separate ground part is equally correct; this is the arbitrary half of the call and is stated so two builders do not make it differently.",
      "class": "Part",
      "properties": {
        "Size": "Vector3.new(area.size, 1, area.size) — 120 x 1 x 120",
        "Position": "the slot origin, with the top face at Y = 0 so the slot origin doubles as the walkable plane",
        "Anchored": "true",
        "CanCollide": "true — this is the one thing in the plot the player stands on",
        "Material": "Enum.Material.Slate",
        "Name": "\"Plot\" plus the slot index",
        "Parent": "Workspace"
      },
      "createdBy": "plots",
      "destroyedBy": "plots, in despawn",
      "asset": null,
      "note": "The Baseplate in game/default.project.json is NOT this. It is 400 studs square and stops short of slot 3, so it stays a lobby floor. Slot geometry is in interfaces, under plots.claimSlot."
    },
    {
      "subject": "spawn-anchor",
      "kind": "attachment",
      "rationale": "The character has to arrive at the plot origin for the guaranteed first Find to be under the patch it walks into, and server-main needs that point again on every respawn. An Attachment is a CFrame with no geometry, no collision and nothing to make invisible; holding it on the plot means the location is derived once, by plots, rather than twice by two modules.",
      "class": "Attachment",
      "properties": {
        "Name": "\"Spawn\"",
        "Position": "Vector3.new(0, 0.5, 0) relative to the plot slab — the slab's top face at its centre",
        "Parent": "the plot slab"
      },
      "createdBy": "plots",
      "destroyedBy": "plots, with the slab",
      "asset": null,
      "note": "plots.spawn returns this Attachment's WorldCFrame. server-main pivots the character to it plus 3 studs of Y on every CharacterAdded. There is no SpawnLocation anywhere: a static spawn point cannot land a player inside a plot that is allocated after they join."
    },
    {
      "subject": "relic",
      "kind": "none",
      "rationale": "A Find has no Instance at any point in its life. gameplay/core-loop/03-reveal-placement.md settles that it is revealed on contact at the instant its patch clears — an event, not an object left standing. Its durable existence is a key in state.found; its transient existence is one FindRevealed remote carrying a name. Representing it as a model would demand 24 assets that do not exist, block the build on them, and create a second source of truth for a fact the collection map already holds.",
      "class": null,
      "createdBy": "nothing. clearing sets state.found[name] and fires FindRevealed",
      "destroyedBy": "nothing",
      "asset": null,
      "note": "Which patch hides which Find is layout's Patch.relic, a string or nil, set at build time. That field is the entire world-side representation of a Find and it is data, not an Instance."
    },
    {
      "subject": "hud",
      "kind": "gui",
      "rationale": "Built by ui-forge from ui-forge/briefs/hud.brief.json and emitted to game/src/shared/Screens/hud.luau, which is DATA that UIBuilder.build turns into Instances. Deliberately outside the build order: no module in it authors UI structure.",
      "class": "ScreenGui, created by client-main; its contents created by UIBuilder.build",
      "createdBy": "client-main, once, and it survives a character respawn rather than being rebuilt",
      "destroyedBy": "nothing during a session",
      "asset": null,
      "note": "hud-binding writes text and sizes into named nodes and is forbidden from creating any Instance except a Tween. The node paths are in interfaces, under hud-binding.bind."
    }
  ]
}
```

## Consequences for the builders

A builder may now assume:

- **No asset id is needed anywhere.** If a module seems to want one, that is a stop, not a
  placeholder.
- That a plot is one `Destroy` away from gone, and that destroying it takes its patches, its
  ground and its spawn point with it.
- That the plot slab's top face is at `Y = 0`, so a patch's Y is `tier.height / 2` and the
  spawn CFrame is 3 studs above the origin.
- That a Find never needs to be found in the world, only in `state.found`.

A builder may **not** assume:

- That `Workspace.Baseplate` is the terrace, or that anything may be parented to it.
- That `Enum.PartType.Wedge` exists.
- That a patch may collide, cast a shadow, or be given a `Touched` handler. Clearing is a
  server-side proximity test on a tick; `Touched` fires from client-authoritative physics and
  is prohibited by `clearing`.

## Acceptance criteria

1. `grep -rn "rbxassetid" game/src` returns nothing.
2. Every patch Instance has `Anchored` true, `CanCollide` false, and a `Size.X` and `Size.Z`
   equal to `patch.footprint`.
3. The four tiers produce four visually distinct silhouettes with `Color` forced to one value,
   and Heartvine is a `WedgePart`.
4. Destroying the plot slab leaves no Instance from that plot anywhere in `Workspace`.
5. A player standing at their spawn anchor is within `movement.baseClearRadius` of the patch
   carrying the first Find of set one.
6. No `SpawnLocation` exists in the project, and no plot is parented to `Workspace.Baseplate`.

## Not decided here

What the clear-away effect and the reveal look like (Art — VFX), what they sound like (Audio —
Stingers), and how a reveal reads on screen (UI/UX — Feedback). All three fire off
`FindRevealed` and off a patch destruction, both of which this sheet and `interfaces` fix; none
of them changes what an object is *made of*.

How the terrace is dressed beyond the slab — walls, props, skybox, ruin geometry (Art —
Environment). Any of that may add Instances to `Workspace`; none of it may parent to a plot or
collide with a patch.

**Back to CID, one item:** `art/objects/01-patch-footprint.md` ends with "the foliage models
themselves" left to Art — VFX. This sheet answers "what is it made of" with primitives, on the
grounds that primitives already satisfy the binding accessibility constraint and no asset
exists. If Art later specs actual foliage meshes, `patch.kind` becomes `mesh`, this contract
starts requiring an asset per tier, and the build blocks until those four assets exist. That is
a real cost and Art should know it is spending it before it does.
