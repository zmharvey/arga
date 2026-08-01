# 06 — Representation

**Stage:** architect · **Key:** representation

## Decision

**Nine subjects. One of them is a Model and it is assembled at runtime from primitives, so no
asset needs to be produced to build this game.**

| subject | is | count at runtime |
|---|---|---|
| `patch` | a `Part` (a `WedgePart` for Heartvine), anchored, non-colliding, sized and rotated per `tier.shape` | up to the live area's `patchCount` per lane, and **exactly 0** in every bay below the live one |
| `plot` | one `Part` — the lane slab, which is also the container everything else parents to. **It spans the full slot pitch and grows inward one bay at a time** | 1 per connected player |
| `plot-boundary` | four invisible collidable `Part`s: two along the lane, two across its ends | 4 per lane |
| `spawn-anchor` | an `Attachment` on the slab, **moved inward when a bay is built** | 1 per lane |
| `tool` | a `Model` welded to `RightHand`, assembled from two `Part`s, **no asset** | 1 per living character |
| `find` | **nothing.** A Find has no Instance anywhere | 0 |
| `hud` | a `ScreenGui` created by `client-main`; its readouts built by `ui-forge` | 1 per client |
| `pressable` | four `TextButton`s inside the HUD, created by `pressables` | 4 per client |
| `index-surface` | a `Frame` inside the HUD, created hidden by `index-screen` | 1 per client |

Three invariants a builder can check with a tape measure:

- **Every patch's world bounding box is `patch.footprint` × `tier.height` × `patch.footprint`,
  and the top of every patch is exactly `tier.height` above the slab** — whatever shape it is.
  The Ball is `tier.height` on all three axes, because a sphere has one dimension to give.
- **A character cannot leave the lane it spawned on**, and there is no air within
  `traversal.boundary.walkableMarginStuds` of any point it can stand on.
- **No patch anchor lies within `traversal.boundary.walkableMarginStuds` (12) of a lane edge.**

## Why

- **A patch is a Part because `tiers` already named Roblox part shapes.** `[cid: decided]`
  `gameplay/systems/01` ships `shape` values of `Block`, `Cylinder`, `Ball` and `Wedge`, and
  `rarity.ladders[overgrowth-tier].legibilityChannel` is *"silhouette first, colour second"* on a
  `[brief: binding]` accessibility constraint. Three of those four are `Enum.PartType` members on
  an ordinary `Part`; `Wedge` is the class `WedgePart`. Primitives satisfy the requirement with
  no asset pipeline and nothing for a build agent to wait on.
- **THE PLAYTEST DEFECT, kept because it is still the shape of the trap:** naming the shape is
  not enough. `Enum.PartType.Cylinder` runs its axis along local X, so an unrotated Fern is a log
  lying on its side. `Enum.PartType.Ball` renders a sphere whose diameter is the *smallest*
  component, so a non-cubic Size is a lie about what appears on screen. `Part` has no
  `Enum.PartType.Wedge`, so a builder assigning one silently keeps a Block and the fourth
  silhouette collapses into the first. `geometryByShape` states all four, and `Orientation` is a
  property of a patch like every other.
- **The lane replaced the plot, and the slab grows.** `[cid: decided]` `plots` makes a lane
  `laneWidthStuds` (120) across at a `pitchStuds` (122) stride, divided into eight `bays` whose
  lengths are `depths.areas[k].footprintStuds2 / laneWidthStuds`. `plots.liveGeometry` says
  ground exists in *"every bay from 1 up to and including the live bay"* and patch Instances in
  *"the live bay only"*. So the slab is **one Part, resized inward by `plots.advance`** rather
  than one Part per bay: resizing a Part does not move the parts welded or parented to it, a lane
  is still one `Destroy` away from gone, and a player can never be standing on a bay that is
  being replaced. **The floor is only ever extended and never shortened**, which is the whole of
  the answer to `plots.liveGeometry.torndownBeyond`: a finished bay in this build holds ground
  and nothing else, so there is nothing to tear down and the ground invariant wins. That changes
  the day Art dresses a bay.
- **`walkableMarginStuds` comes out of the chunk, not out of the pitch, and that is the only
  reading that is buildable.** `[cid: decided]` `traversal` wants *"12 studs of walkable margin
  past the patch field on every side, then a barrier 20 studs tall"*. But `layout.chunk.widthStuds`
  and `plots.laneWidthStuds` are both 120 and `plots.pitchStuds` is 122, so the lane's whole width
  is chunk and the gap between two lanes is 2 studs. Widening the pitch to 146 would break
  `plots.invariants`, which caps it at `social.maxCoPresenceSeparationStuds` (128). So **the patch
  field is the central 96 studs of each 120-stud chunk** and the 12 studs on each side are
  walkable floor with nothing on them. `layout.chunk.edgeKeepoutStuds` is 1.5 and 12 satisfies
  it; no footprint, chunk count or patch count moves. On the lane's two ends the margin is real
  floor beyond the first and last chunk. `[architect: decided]`, and routed back in `interfaces`
  because CID's own `_verified.md` already flags the 12 as geometry with no range.
- **The boundary is 20 studs tall and 2 studs thick, and both numbers come from CID.**
  `traversal.boundary.heightStuds` is 20; `plots.pitchRule` makes the inter-plot boundary's
  thickness `pitchStuds - laneWidthStuds` = 2, and caps it at 8. A default `Humanoid` apexes at
  `traversal.jump.jumpHeight` (7.2) and nothing raises it — `traversal.jump.upgradable` is false
  and every patch is `CanCollide` false, so there is nothing on a lane to jump from. 20 leaves
  ~13 studs of headroom over the highest reachable point.
- **The boundary is invisible and does not answer raycasts, and `traversal` now says so
  directly.** `traversal.boundary.opaque` is false, `sightlineObstruction` is `"none"` and `cue`
  is `"none"`. `social.maxCoPresenceSeparationStuds.requirement` needs *"an unobstructed
  sightline"* between two occupied spawn points, and an opaque wall between two lanes 122 studs
  apart destroys the only social system the game has. `CanQuery` is false so the default camera's
  occlusion raycasts pass through; an invisible wall the camera collides with jams the view
  whenever a player walks up to it, which is the standard way this fix goes wrong.
- **`plots.openings` describes construction, not collision, and the ring stays unbroken.**
  `traversal.boundary.passable`, `climbable` and `jumpable` are all false and `teleportBack` is
  false, so there is no way out and nothing to catch a player who finds one. `plots.openings`
  gives each bay two openings, shared with its neighbour, always open, centred on X = 0 — and
  those are gaps in a **wall**, which is Art's and does not exist yet. Bay-to-bay there is no
  collision part at all: the lane is continuous in Z and the only two Z boundaries are at the two
  ends of the built floor. `[cid: decided]` `theme/setting/04` `W3` obliges any wall to carry
  exactly two openings; the barrier ring is the rectangle that wall is built on, and the openings
  become gaps in both at the same moment.
- **The tool is a Model and it needs no asset, which the `representation` schema cannot currently
  express.** `[cid: decided]` `tool.instanceClass` is `"Model"`, `isRobloxToolInstance` is false
  and `entersBackpack` is false. The schema demands an `asset` for any `model`, on the sound
  ground that a mesh or model usually implies something somebody has to upload. A Model assembled
  at runtime from two `Part`s implies nothing. **The `asset` field says exactly that in words
  rather than naming a fake id**, and `grep -rn "rbxassetid" game/src` still returns nothing.
  Flagged below as a schema gap, not worked around silently.
- **The head width is the one appearance channel, and it reads effective radius.**
  `tool.appearanceChannel` is `headWidth`, `changesWithAxes` is `["radius"]` and
  `unaffectedByAxes` is `["value", "speed"]`. `products.items[span].deliverable` requires the
  width to *"resolve from effective radius, not Reach level"*, so a purchased factor widens the
  head. `interfaces` carries the expression.
- **The four pressables are `TextButton`s and `pressables` creates them.** `input` declares
  `gameDrawnPressables: 4` and `worldObjectsTriggeringAVerb: 0`, so they are on screen and not in
  the world; `input.pressable.minTouchTargetRule` is *"notSmallerThanPlatformJumpButton"* and
  `mayOverlapPlatformControlRegions` is false, which fixes both their size floor and where they
  may not go. Their names are fixed here so that the day `ui-forge`'s `hud-overlay` grows a
  `pressable` readout, `pressables.bind` resolves four names instead of creating four Instances
  and nothing else in the build changes.
- **A Find is not an object.** `[cid: decided]` `gameplay/core-loop/03` settles that a Find is
  revealed on contact at the instant its patch clears — an event, not a thing left standing.
  `discovery.record` is one boolean per name and `discovery.record.growth` says it never grows.
  Making it a model would demand 24 assets, block the build, and add a second source of truth.
  The subject is renamed from `relic` to `find` because `collection.className` is `Find` and
  `vocabulary` bans the old noun; the rename costs one graph node and removes a word that keeps
  finding its way back into labels.
- **`area.originXZ` is the lane's ORIGIN CORNER on Z and its CENTRE on X.** `plots.slotOrigin` is
  `(originXZ[0] + (slot - 1) * pitchStuds, 0, originXZ[1])` and `plots.bays[0].zStart` is 0, so
  bays run from the origin inward along `plots.laneAxis` (+Z) while the lane is centred on the
  origin across `plots.rowAxis` (+X). `[architect: decided]`, forced by the two together, and it
  is a change from the wave-1 reading where the origin was the centre of a square terrace.

```manifest
{
  "provides": "representation",
  "value": [
    {
      "subject": "patch",
      "kind": "part",
      "rationale": "tiers already names Enum.PartType shapes, and rarity.ladders[overgrowth-tier].legibilityChannel makes silhouette the primary channel on a binding accessibility constraint. Primitives satisfy it with no asset to produce, so nothing blocks the build.",
      "class": "Part for Block, Cylinder and Ball; WedgePart for Heartvine — Enum.PartType has no Wedge member, and getting this wrong silently collapses the fourth silhouette into the first",
      "properties": {
        "Shape": "Enum.PartType[tier.shape] for Block, Cylinder and Ball; not set at all on a WedgePart",
        "Size": "PER SHAPE — see geometryByShape. It is NOT Vector3.new(patch.footprint, tier.height, patch.footprint) for every tier: that formula lays the Cylinder on its side and throws away the Ball's footprint.",
        "Orientation": "PER SHAPE — see geometryByShape. Vector3.new(0, 0, 90) for the Cylinder, Vector3.new(0, 0, 0) for Block, Ball and Wedge. Set after Position; rotation is about the part's own centre so the two do not interact.",
        "Position": "the patch's world position, with Y at tier.height / 2 above the slab's top face. TRUE FOR ALL FOUR SHAPES: an upright cylinder of length tier.height, a sphere of diameter tier.height and a wedge of height tier.height all have their centre at tier.height / 2 and their top at exactly tier.height.",
        "Color": "Color3.fromRGB(unpack(tier.rgb)) — the SECONDARY channel; shape carries rarity first",
        "Material": "Enum.Material[patch.material] — Grass",
        "Anchored": "true",
        "CanCollide": "false — patch.collides is false, and it is load-bearing: contact clearing with movement-only input must never be blocked by the thing being cleared. It is also why a lane has nothing on it a character can climb or jump from, which is what keeps traversal.boundary.heightStuds sufficient.",
        "CastShadow": "false — up to 640 per lane times the player count, and shadows are the cheapest thing to give up",
        "Name": "\"Patch\" plus the 1-based layout index, so a live Instance can be traced to its state.cleared key",
        "Parent": "the lane slab"
      },
      "geometryByShape": {
        "Block": {
          "class": "Part",
          "Shape": "Enum.PartType.Block",
          "Size": "Vector3.new(patch.footprint, tier.height, patch.footprint) — 3 x 1.6 x 3 for Moss",
          "Orientation": "Vector3.new(0, 0, 0)",
          "why": "A Block's local axes are its world axes. This is the only shape the old single formula got right, which is why the bug survived: 52% of every lane looked correct."
        },
        "Cylinder": {
          "class": "Part",
          "Shape": "Enum.PartType.Cylinder",
          "Size": "Vector3.new(tier.height, patch.footprint, patch.footprint) — 2.4 x 3 x 3 for Fern. THE LENGTH GOES IN X.",
          "Orientation": "Vector3.new(0, 0, 90)",
          "why": "A Roblox Cylinder's axis runs along its LOCAL X: Size.X is the length between the two flat circular faces and Size.Y and Size.Z are the diameter. Unrotated, the Fern is a log lying on the ground and reads as a second Block."
        },
        "Ball": {
          "class": "Part",
          "Shape": "Enum.PartType.Ball",
          "Size": "Vector3.new(tier.height, tier.height, tier.height) — 2.8 cubed for Bramble",
          "Orientation": "Vector3.new(0, 0, 0)",
          "why": "A Ball renders a sphere whose diameter is the SMALLEST of the three components and ignores the other two, so any non-cubic Size is a lie about what appears on screen. tier.height wins over patch.footprint: it keeps the height ladder exact and errs 0.2 studs SMALL against a footprint whose only consumer is a spacing floor of 6."
        },
        "Wedge": {
          "class": "WedgePart",
          "Shape": "not set — a WedgePart has no Shape property, and Enum.PartType has no Wedge member. Assigning one is a runtime error at best and a silent Block at worst.",
          "Size": "Vector3.new(patch.footprint, tier.height, patch.footprint) — 3 x 3.4 x 3 for Heartvine",
          "Orientation": "Vector3.new(0, 0, 0)",
          "why": "A WedgePart's own axes match a Block's; what a rotation would change is which way the slope faces, and nothing in the design cares. Fixed at zero so every Heartvine on every lane in every server is identical, rather than left unstated so that two builders pick two conventions."
        }
      },
      "createdBy": "plots",
      "destroyedBy": "clearing, one at a time as it clears them, and plots when a bay is replaced or the lane goes",
      "asset": null,
      "note": "THE COUNT IS PER BAY, NOT PER LANE. plots.liveGeometry.patchInstancesExistIn is 'the live bay only', so a player whose areasFinished is 3 has patch Instances in bay 4 and none in bays 1 to 3 — a finished bay is walkable and bare, and it has no patch RECORD either, which is what makes 'cleared is permanent' structural rather than latched. On join a player gets one Instance per index state.cleared does not mark, in the live bay. plots.spawn owns that test and is the only module that may create one. THE MEASURABLE RULE, whatever the shape: the world bounding box is patch.footprint x tier.height x patch.footprint, except the Ball at tier.height cubed, and the highest point is exactly tier.height above the slab's top face. NO ANCHOR IS WITHIN traversal.boundary.walkableMarginStuds (12) OF A LANE EDGE, which is why layout confines anchors to the central 96 studs of each 120-stud chunk."
    },
    {
      "subject": "plot",
      "kind": "part",
      "rationale": "One Part is both the ground a player walks on and the container its patches, boundary and spawn Attachment parent to, so tearing a lane down is one Destroy and the floor cannot outlive the things standing on it. Resizing it inward is how a bay is built, and resizing a Part does not move what is parented to it. A Folder plus a separate ground part is equally correct; this is the arbitrary half of the call and is stated so two builders do not make it differently.",
      "class": "Part",
      "properties": {
        "Size": "Vector3.new(plots.pitchStuds, 1, margin + plots.bays[live].zEnd + margin) where margin is traversal.boundary.walkableMarginStuds (12) and live is state.areasFinished + 1. THE FULL SLOT PITCH ACROSS, 122, not laneWidthStuds: consecutive slabs share an edge exactly and there is no air between two lanes at any index. At bay 1 that is 122 x 1 x 144; at bay 8 it is 122 x 1 x 3024. Above ordinal 8 each post-terminal area adds another 480, since endgame.postTerminalArea.footprintStuds2 equals depths.areas[8]'s.",
        "Position": "centred on the slot origin across X and spanning from 12 studs outward of bay 1 to 12 studs inward of the live bay's end on Z, with the top face at Y = 0 so the slot origin doubles as the walkable plane. Centre Y is therefore -0.5.",
        "Anchored": "true",
        "CanCollide": "true — this is the one thing in the lane the player stands on, and traversal.collision.playerVsWorld is true",
        "Material": "Enum.Material.Slate",
        "Name": "\"Plot\" plus the slot index",
        "Parent": "the world container"
      },
      "createdBy": "plots",
      "destroyedBy": "plots, in despawn",
      "asset": null,
      "note": "Slabs TILE the row: slot n is centred at (n - 1) * plots.pitchStuds on X and is pitchStuds wide, so there is no gap and no overlap between neighbours. That, plus plot-boundary, is the whole of the fix for falling out of the world. GROWS INWARD, NEVER SHRINKS: plots.advance resizes it to cover the new live bay, which is plots.liveGeometry.groundExistsIn — 'every bay from 1 up to and including the live bay' — and a player standing in bay 2 while bay 5 is built never loses their floor. plots.liveGeometry.torndownBeyond asks for bays more than two outward of the live one to be destroyed and rebuilt bare on re-entry; in this build a finished bay IS bare, holding ground and nothing else, so there is nothing to tear down and the ground invariant is the one that binds. That changes the first time Art dresses a bay, and the rule acquires a subject then. tree forbids the build from editing game/default.project.json, so the lobby floor that ships in it stays exactly as it is and nothing parents to it."
    },
    {
      "subject": "plot-boundary",
      "kind": "part",
      "rationale": "A collision hull with no appearance, so that leaving your own lane is impossible rather than merely unlikely. traversal.boundary.kind is 'collisionBarrier', passable, climbable and jumpable are all false, and teleportBack is false — there is no way out and nothing to catch a player who finds one. It is deliberately not a wall: theme/setting/04 W3 obliges any wall to carry exactly two openings into somewhere, and plots.openings describes those as construction, which is Art's.",
      "class": "Part — four of them per lane",
      "properties": {
        "Size": "two of Vector3.new(plots.pitchStuds - plots.laneWidthStuds, traversal.boundary.heightStuds, laneLength + 2) running along the lane, and two of Vector3.new(plots.laneWidthStuds + 2, traversal.boundary.heightStuds, 2) across its ends — 2 x 20 x (laneLength + 2) and 122 x 20 x 2. The + 2 makes the four overlap at the corners, so there is no one-stud diagonal gap to squeeze through. laneLength is the slab's Z extent, so the two long parts are resized with the slab.",
        "Position": "relative to the slot origin: the two long parts at X = +/- (plots.laneWidthStuds / 2 + 1), i.e. +/- 61, so the 2-stud boundary occupies exactly the pitch that is not lane; the two end parts at the outward face of the margin (Z = -13) and at the inward face of the live bay's margin (Z = plots.bays[live].zEnd + 13). All four at Y = traversal.boundary.heightStuds / 2 = 10. Slot n's +X part and slot n+1's -X part occupy the same volume; both are built, because a lane is destroyed with its owner and neither may depend on the other existing.",
        "Anchored": "true",
        "CanCollide": "true — the one property that does the work",
        "Transparency": "1 — traversal.boundary.opaque is false and sightlineObstruction is 'none'. social.maxCoPresenceSeparationStuds.requirement needs an unobstructed sightline between two occupied spawn points 122 studs apart, and an opaque wall between them deletes the only social system the game has.",
        "CanQuery": "false — the default camera's occlusion raycasts must pass through, or the view jams every time a player walks up to the boundary. This is the standard way an invisible wall goes wrong and it is one property to prevent.",
        "CanTouch": "false — nothing in the game uses Touched, and a boundary is the last thing that should start",
        "CastShadow": "false",
        "Material": "Enum.Material.SmoothPlastic",
        "Name": "\"Boundary\" plus one of PosX, NegX, Outward, Inward",
        "Parent": "the lane slab"
      },
      "createdBy": "plots",
      "destroyedBy": "plots, with the slab",
      "asset": null,
      "note": "traversal.boundary.heightStuds is 20 and it is not a taste call: a default Humanoid apexes at traversal.jump.jumpHeight (7.2), traversal.jump.upgradable is false, and every patch is CanCollide false, so a lane contains nothing to climb. THE INWARD PART MOVES WHEN A BAY IS BUILT — plots.advance repositions it to the new end — and the two long parts are resized with the slab. There is NO collision part between two bays: plots.openings gives each bay two openings, always open and shared with its neighbour, so the lane is continuous in Z and only its two ends are closed. The openings are gaps in a WALL that does not exist yet; when Art builds one it is built on this rectangle and the two openings become gaps in both at once, and neither may be opened where there is nothing on the other side. traversal.boundary.cue is 'none', so nothing marks it."
    },
    {
      "subject": "spawn-anchor",
      "kind": "attachment",
      "rationale": "The character has to arrive at a known point: firstSession measures the arming displacement from it, layout puts the first Find within 3.5 studs of it, and server-main needs it again on every respawn. An Attachment is a CFrame with no geometry, no collision and nothing to make invisible; holding it on the slab means the location is derived once, by plots, rather than twice by two modules.",
      "class": "Attachment",
      "properties": {
        "Name": "\"Spawn\"",
        "Position": "Vector3.new(0, 0.5, plots.bays[live].zStart + 8) relative to the lane slab's own origin — the slab's top face, centred across the lane, 8 studs into the live bay. plots.spawn.plotLocal is [0, 0, 8], which is this expression at live = 1; the generalisation is what makes traversal.death.respawnAt ('areaSpawn') mean the live area rather than always the first.",
        "Parent": "the lane slab"
      },
      "createdBy": "plots",
      "destroyedBy": "plots, with the slab",
      "asset": null,
      "note": "plots.spawn returns this Attachment's WorldCFrame and writes its position into state.spawnPivot; plots.advance moves it and rewrites both. server-main pivots the character to it plus 3 studs of Y on every CharacterAdded, including the character wiring.onDeath loads. Its LookVector is plots.spawn.lookVector: (1, 0, 0) for slot 1 and (-1, 0, 0) for every slot above — parallel to plots.rowAxis and NEVER to laneAxis, which is plots.spawn.neverFacesLaneAxis, so a player never spawns staring down the lane at the whole area. plots.spawn.atPlotCentre is false, and the +8 is why. There is no SpawnLocation anywhere: a static spawn point cannot land a player inside a lane that is allocated after they join."
    },
    {
      "subject": "tool",
      "kind": "model",
      "rationale": "tool.instanceClass is Model, tool.isRobloxToolInstance is false and tool.entersBackpack is false — it is a held object welded to the hand, not a Roblox Tool. Two Parts: a handle and a head whose width is the one appearance channel. Assembled at runtime from primitives, exactly like a patch, so it needs no upload and blocks nothing.",
      "class": "Model containing two Parts and one WeldConstraint",
      "properties": {
        "Name": "\"Tool\"",
        "PrimaryPart": "the handle",
        "Parent": "the character Model",
        "handle.Size": "Vector3.new(0.3, 0.3, 1.4)",
        "head.Size": "Vector3.new(headWidth, 0.2, 0.6), where headWidth is tool.headWidthBaseStuds (1.2) plus tool.headWidthPerLevelStuds (0.35) per EQUIVALENT Reach level of modifiers.effective(state, 'radius') — interfaces.tool.refresh carries the expression. tool.headWidthBaseTestRangeStuds is [0.8, 1.8] and headWidthPerLevelTestRangeStuds is [0.2, 0.6], so both are tunable without changing anything here.",
        "every part Anchored": "false — it is welded to a moving character, not pinned to the world",
        "every part Massless": "true — tool.massless",
        "every part CanCollide": "false — tool.canCollide",
        "every part CanTouch": "false — tool.canTouch, and tool.clearsOnContact is false: clearing is a server proximity test in clearing.tick and the tool is appearance",
        "every part CanQuery": "false — tool.canQuery",
        "every part CastShadow": "false",
        "weld": "one WeldConstraint from the handle to the character's RightHand — tool.attachment"
      },
      "createdBy": "tool",
      "destroyedBy": "tool, with the character that holds it",
      "asset": "none — assembled at runtime from two Parts and a WeldConstraint. THIS ROW IS THE ONE PLACE THE SCHEMA'S ASSET RULE MISFIRES: it demands an asset for any model, on the sound ground that a mesh or model usually implies something somebody has to upload, and a Model built from primitives implies nothing. Saying so here is deliberate; naming a fake rbxassetid would not be, and `grep -rn \"rbxassetid\" game/src` still returns nothing. Flagged under Not decided here.",
      "note": "tool.count is 1, tool.grantedAt is 'spawn', and tool.held is true, so every living character has exactly one and a character that dies takes it with it. tool.writesHumanoidProperties is FALSE — the only Humanoid write in this game is server-main's WalkSpeed, per response.humanoidWritesAllowed. tool.animates is false and tool.particleEmitters is 0, so there is no AnimationTrack and no emitter anywhere in it. tool.changesWithAxes is exactly ['radius'] and unaffectedByAxes exactly ['value', 'speed']: the head widens and nothing else about it ever changes. tool.premiumVariantAllowed is true and premiumVariantMayBeOnlyTool is false, which products.F8 restates as 'a player owning zero products spawns with a tool welded to the right hand' — that is this row's first acceptance criterion and there is no variant in this build."
    },
    {
      "subject": "find",
      "kind": "none",
      "rationale": "A Find has no Instance at any point in its life. gameplay/core-loop/03 settles that it is revealed on contact at the instant its patch clears — an event, not an object left standing. Its durable existence is a key in state.found; its transient existence is one FindRevealed remote carrying a name. Representing it as a model would demand 24 assets that do not exist, block the build on them, and create a second source of truth for a fact discovery.record already holds.",
      "class": null,
      "createdBy": "nothing",
      "destroyedBy": "nothing",
      "asset": null,
      "note": "Renamed from `relic`: collection.className is Find, collection.classPlural is Finds, and vocabulary.bannedWords bans the old noun with the reason that it is occupied by two shipping games for a rolled multiplier item. An internal field name is exempt from the ban, but keeping a stale noun in the record five modules read is how a banned word gets back into a label — Patch.relic became Patch.find for the same reason. createdBy is 'nothing' in the strict sense the graph needs: no module creates an Instance for a Find, ever. What DOES happen on a reveal is that clearing sets state.found[name] and fires FindRevealed, and if that name completes a set, SetCompleted — state writes and channels, all of which are edges the graph already carries elsewhere and none of which is a creation. Which patch hides which Find is layout's Patch.find, a string or nil, set at build time from the seed and from nothing else."
    },
    {
      "subject": "hud",
      "kind": "gui",
      "rationale": "Built by ui-forge from ui-forge/briefs/hud.brief.json and emitted to game/src/shared/Screens/hud.luau, which is DATA that UIBuilder.build turns into Instances. Deliberately outside the build order: no module in it authors the HUD's readouts.",
      "class": "ScreenGui",
      "createdBy": "client-main",
      "destroyedBy": "nothing during a session",
      "asset": null,
      "note": "client-main creates the ScreenGui itself, ONCE, in wiring.onClientBoot step 1, and it survives every character respawn including the one wiring.onDeath causes. Its READOUTS are created by UIBuilder.build from the emitted screen DATA; hud-binding writes text and sizes into named nodes and is forbidden from creating any Instance except a Tween. THREE THINGS ARE PARENTED INTO IT BY MODULES RATHER THAN BY ui-forge, and each has its own subject: the four `pressable` buttons, the `index-surface` frame, and whatever a beat cue turns out to be when Art specifies one. Out of scope means the readouts, not the container."
    },
    {
      "subject": "pressable",
      "kind": "gui",
      "rationale": "input declares gameDrawnPressables: 4 and worldObjectsTriggeringAVerb: 0, so the purchase and index controls are on screen and not in the world. ui-forge's hud-overlay pattern ships no pressable readout — a default rather than an incapability — and no module in this build order owns ui-forge's briefs, so a spec that waited for it would be a required step with no owner. pressables creates them instead, and this row fixes the names so that the day hud-overlay grows one, pressables.bind resolves four names instead of creating four Instances and nothing else changes.",
      "class": "TextButton — four of them, inside the HUD ScreenGui",
      "properties": {
        "Name": "\"Pressable_BUY1\", \"Pressable_BUY2\", \"Pressable_BUY3\", \"Pressable_INDEX\". The three purchase buttons are bound to GameConfig.Upgrades in declaration order — input.pressable.roles[purchase].boundTo — so BUY1 is Value, BUY2 is Reach and BUY3 is Pace.",
        "Size": "at least the platform jump button's, on every device — input.pressable.minTouchTargetRule is 'notSmallerThanPlatformJumpButton'. A UDim2 in scale with a UISizeConstraint holding the floor in offset, so a phone and a desktop both clear it.",
        "Position": "inside the HUD's bottom-right cluster for the three purchase buttons, aligned with the upgrade readouts hud-binding writes; the index button in the top-left cluster beside the collection readout. NEVER OVERLAPPING A PLATFORM CONTROL REGION — input.pressable.mayOverlapPlatformControlRegions is false, and the touch jump button and the thumbstick both live in the bottom corners.",
        "Text": "the upgrade's label and its next cost for a purchase button, and the collection class plural for the index button. vocabulary.maxLabelChars is 14 and vocabulary.casing is title.",
        "Visible": "for a purchase button, snapshot.rowsRevealed[id] — firstSession.withheld.upgradeRow is presentAtJoin false, latched. Appearing one may not move the other three: firstSession.suppressionForbidden bans reflowOnLift, so all four positions are fixed and only Visible changes.",
        "AutoButtonColor": "false — affordability is signalled by text as well as colour, because input.pressable.affordabilityByColourAlone is false",
        "SelectionGroup": "true — input.pressable.gamepadSelectable is true, so a gamepad can move between the four",
        "Parent": "the HUD ScreenGui"
      },
      "createdBy": "pressables",
      "destroyedBy": "nothing during a session",
      "asset": null,
      "note": "input.pressable.roles: three with role 'purchase', adjudicatedBy 'server', persistent true; one with role 'index', adjudicatedBy 'client', persistent true. Persistent means created once and surviving a respawn, which they do because the ScreenGui does. ONE ACTIVATION PER PRESS (activationsPerPress 1) with a debounce of input.pressable.debounceSeconds (0.35); no hold and no chord (holdRequired false, chordRequired false). NO REJECTION CUE: input.pressable.rejectionCueOnFailedPrecondition is 'none' and input.verbs[buy].onPreconditionFail is silentNoOp, so an unaffordable press does nothing, shows nothing and plays nothing. A keyboard accelerator is ALLOWED and NOT REQUIRED — keyboardAcceleratorAllowed true, keyboardAcceleratorRequired false — which is precisely the ruling that supersedes the shipped Enum.KeyCode.One/Two/Three binding: 1/2/3 may exist beside these buttons and may never be the only path to a purchase. NO PRODUCT IS NAMED, SHOWN OR PRICED HERE — products.F19."
    },
    {
      "subject": "index-surface",
      "kind": "gui",
      "rationale": "The openIndex verb needs somewhere to open. input.pressable.roles carries one 'index' pressable adjudicated on the client, and firstSession.withheld.collectionPanel makes the surface absent at join and present from the first reveal. ui-forge has a modal-grid pattern that fits it; nothing in this build order owns the brief that would emit it, so index-screen creates the frame for the same reason pressables creates the buttons.",
      "class": "Frame inside the HUD ScreenGui, created with Visible false",
      "properties": {
        "Name": "\"IndexSurface\"",
        "Visible": "false until the first reveal has happened and the index pressable has been activated. Absence at join is firstSession.withheld.collectionPanel (presentAtJoin false, liftedBy beat:firstReveal, latched, latchSource 'the collection map is non-empty', newSaveFields 0) — so it is derived from the snapshot's found map and nothing is stored for it.",
        "contents": "four labelled groups, one per collection.sets entry, each holding six slots in the declared order of that set's names. A held name reads as its name; an unfound name reads as an empty slot. NOTHING ELSE: no padlock, no greyed row, no question-mark placeholder, no unknown-denominator form (firstSession.suppressionForbidden) and no rarity colour, frame, glow, border, sparkle or badge (rarity.forbidden).",
        "Parent": "the HUD ScreenGui"
      },
      "createdBy": "index-screen",
      "destroyedBy": "nothing during a session",
      "asset": null,
      "note": "rarity.ladders[find-set].legibilityChannel is 'the set heading on the collection surface, and nothing on the object', and perObjectVisualGrade is false — so the four set headings here are the ONLY place the second rarity ladder is legible anywhere in the game, and there is nothing on a patch or a reveal that varies by set. rarity.forbidden also bans 'a reveal cue that varies by which set the Find belongs to', which is beats's constraint and is restated here because this surface is the one place the sets are distinguished at all. Opening it suspends movement (input.pressable.indexScreenSuspendsMovement) and closing it restores it; that is caused by the player's own press, which is why it does not touch response.controlEverAffected being false. Shows no other player anything — social.forbidden X6 and X7 — and names no product, per products.F19."
    }
  ]
}
```

## Consequences for the builders

A builder may now assume:

- **No asset id is needed anywhere.** The one `model` in the contract is assembled from two
  `Part`s at runtime, and its `asset` field says so in words.
- That a lane is one `Destroy` away from gone, and that destroying it takes its patches, its four
  boundary parts, its ground, its spawn point and everything welded to them.
- That the slab's top face is at `Y = 0`, so a patch's Y is `tier.height / 2` for **every** tier
  and the spawn CFrame is 3 studs above it.
- That the floor only ever grows. A player standing in bay 2 while bay 6 is built loses nothing.
- That there is no reachable air, on any lane, at any bay ordinal, at any slot index.
- That a Find never needs to be found in the world, only in `state.found`.
- That `createdBy` names exactly one module for every subject that has an Instance, and that
  module is the only one permitted to create it: `plots` for `patch`, `plot`, `plot-boundary`
  and `spawn-anchor`; `tool` for `tool`; `client-main` for `hud`; `pressables` for `pressable`;
  `index-screen` for `index-surface`; and nothing for `find`.

A builder may **not** assume:

- That `Enum.PartType.Wedge` exists, or that one `Size` formula works for all four tiers, or that
  an unrotated Cylinder stands up.
- That a patch may collide, cast a shadow, or be given a `Touched` handler.
- That the boundary may be made visible, given a material a player can see, or opened. A gap in
  the ring is a way out of the world until Art builds a wall on the same rectangle.
- That `game/default.project.json` may be edited.
- That any module other than `pressables` and `index-screen` may create a `GuiObject`.

## Acceptance criteria

1. `grep -rn "rbxassetid" game/src` returns nothing.
2. Every patch Instance has `Anchored` true and `CanCollide` false, and its **world** bounding
   box measures `patch.footprint` × `tier.height` × `patch.footprint` — except Bramble, which
   measures `tier.height` on all three axes.
3. The four tiers produce four visually distinct silhouettes with `Color` forced to one value.
   Heartvine is a `WedgePart`, and no file assigns `Enum.PartType.Wedge`.
4. The top of every patch is exactly `tier.height` above the slab, for all four tiers.
5. Destroying the lane slab leaves no Instance from that lane anywhere in the world container.
6. **Falling is impossible, at every bay ordinal.** Walking into each of the four boundary parts
   stops the character; jumping at one does not clear it; and no point on any lane reaches air.
   Two players in slots 1 and 2 stand on continuous floor between their lanes and neither can
   enter the other's.
7. No patch anchor is within 12 studs of a lane edge, on any chunk of any depth.
8. The default camera does not push in when a character stands against the boundary.
9. A player standing at their spawn anchor in area 1 is within
   `firstSession.placement.spawnToNearestPatchMaxStuds` (3.5) of the patch carrying the first
   Find, and does not clear it until they have moved `firstSession.armDistanceStuds` (2.0).
10. No `SpawnLocation` exists in the project, and no lane is parented to the lobby floor that
    ships in `game/default.project.json`.
11. A freed slot reused by a new player has exactly one slab, four boundary parts and one
    Attachment — no leftovers from the previous occupant.
12. `client-main` creates exactly one `ScreenGui`. Every `Instance.new` producing a `GuiObject`
    in `game/src/client` is in `Pressables.luau` or `IndexScreen.luau`, and `HudBinding.luau`
    contains no `Instance.new` at all.
13. A player owning zero game passes spawns holding a tool, and its head measures
    `tool.headWidthBaseStuds` across.

## Not decided here

What the clear-away effect and the reveal look like (Art — VFX), what they sound like (Audio —
Stingers), and how a beat reads on screen (UI/UX — Feedback). `beats` fixes when each one starts
and on which channel; none of that changes what an object is *made of*.

How a lane is dressed beyond the slab — walls, props, skybox, ruin geometry (Art — Environment).
Two inherited requirements land on whoever builds walls: `theme/setting/04` `W3` requires every
area to carry exactly two openings, built as construction that was always open, and
`plots.openings` now gives the count, the axis and the fact that neighbouring bays share one; and
`traversal.boundary.opaque` being false means whatever is built there may not obstruct the
sightline `social.maxCoPresenceSeparationStuds` depends on.

**A schema gap, stated rather than worked around:** `representation`'s check demands an `asset`
for any subject of kind `mesh` or `model`, because a mesh or model usually implies an upload.
A Model assembled at runtime from primitives implies nothing, and `tool.instanceClass` is
`Model` by `[cid: decided]`. The `asset` field on the `tool` row therefore carries a sentence
saying there is no asset, which satisfies the check without lying — but the honest fix is for
the schema to accept `asset: null` when the row carries an `assembledFrom` field, and that is a
change to `architect/schema.mjs` rather than to this sheet.

**Back to CID, one item, unchanged from wave 1 and now larger:** `art/objects/01-patch-footprint.md`
leaves "the foliage models themselves" to Art — VFX. This sheet answers "what is it made of" with
primitives. If Art later specs actual foliage meshes, `patch.kind` becomes `mesh`, this contract
starts requiring an asset per tier, and the build blocks until four assets exist — and at 640
patches per lane times sixteen players, a mesh is also a rendering budget question that
`social.maxPlayers.aboveMaxBreaks` already names.
