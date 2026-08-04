# Performance — domain index

**Category:** Tech & Data · **Wave:** 5 · Reads: `concept/spec/incremental-spinoff-v2/` —
`HANDOFF.md`, `CONCEPT.md`, `00-CORE.md`, `01-FOUNDATION.md`, `02-GAMEPLAY.md`, `03-META.md`,
`04-PRESENTATION.md`, `OPEN.md` (all sections, §2 and §5 #6 in full); `cid/tech/_category.md`;
`cid/_contract.md`, `cid/_digest.md`, `cid/_state.md`; `cid/gameplay/_verified-wave4.md`;
`cid/gameplay/meta/01`, `04`, `05`, `06`; `cid/gameplay/social/01`; `cid/gameplay/balance/03`;
`cid/art/objects/01`; `architect/sheets/01-runtime` (full) and the six others by their digest
rows; `game/src/server/Clearing.luau`, `game/src/server/Plots.luau`, `game/src/server/World.luau`.

I have no shell in this session, so `npm run bridge -- --contract` was read as its committed
derivation, `cid/_contract.md` (25 keys), plus the seven `architect` keys, the nine wave-2
proposals and the four wave-4 proposals listed in `cid/_state.md`. **Neither `budgets` nor
`serverCost` exists in any of those lists.**

## What the brief gave me

Almost nothing, and the exact shape of the nothing matters.

- "Watch: **instance count per area on mobile**, and **save size as areas accumulate**."
  (`OPEN.md §2`) `[brief: soft]` ← `[I assumed — batched]`. **This is the entire performance
  instruction in the brief.** Two watch items, no number, no target, no floor. The second is
  Persistence's.
- "**8–14, mobile-heavy, short sessions.**" (`00-CORE.md`) `[brief: binding]` ←
  `[you chose: R1 Q4]`. Mobile-first is binding as a direction and supplies no device.
- "~70% mobile / ~25% desktop / ~5% console" (`00-CORE.md`) `[brief: soft]` ←
  `[I assumed — the split]`, confirmed at `[you accepted: step 6 Q4]` (`02-GAMEPLAY.md`).
  `cid/_state.md` records the 70% figure as "uncorroborated by anything fetched"; cite it soft
  or derive around it.
- "**Server size:** 12–20." (`02-GAMEPLAY.md`) `[brief: soft]` ← `[I assumed — no source]`.
  `runtime.maxPlayers` fixed **16** inside it; `social.maxPlayers` states a band, not a figure,
  and routes the figure here.
- "**Hard constraint: rarity tiers must differ by shape or silhouette, not only hue.** … **This
  is a requirement, not a nicety**" (`04-PRESENTATION.md`) `[brief: soft]` ←
  `[you accepted: R6 Q4]`, and `HANDOFF.md` carries it as one of six pre-design facts. Binding
  on me in one direction only: **no optimisation may flatten patch shape or height.**
- "**Cleared is permanent — overgrowth never returns.**" (`01-FOUNDATION.md`)
  `[brief: binding]` ← `[you chose: R2 Q1]`. A cleared patch is destroyed and never rebuilt, so
  instance count falls monotonically within a bay and the ceiling is always the bay's first
  tick.
- "**This game exists to prove the `arga` pipeline works end to end.** … Success is **shipped
  artifacts, not players**" (`00-CORE.md`) `[brief: binding]` ← `[you chose: R1 Q3]`. Sizes the
  measurement obligation: I may specify an instrument I cannot afford to run, provided I say so.
- Priority 3 (`03-META.md`) excludes eight systems. **Nothing in this domain reserves space for
  any of them**; no budget field is held open for a leaderboard, a season or offline accrual.
  Naming one in order to forbid it is the only mention permitted and I use it once, below.

## What the brief did not give me

Nine gaps. None is filled here; each is routed.

1. **No device floor, anywhere in the brief.** My `must_verify` says "set budgets against the
   device floor named in the brief". There is no such line in any of the eight sheets. → **01**,
   which publishes the floor I name below as `[cid: decided]`.
2. **A related fabrication, and it is worse than a missing line.** `cid/gameplay/meta/01-the-area.md:39`
   reads *"against the brief's 3 GB device floor"*. That sentence does not exist in this brief.
   It exists in two **other, simulated test briefs** — `concept/spec/syndicate-auction-test/04-PRESENTATION.md:113`
   and `concept/spec/sky-freight-test/04-PRESENTATION.md:110-111` — where it carries the tag
   `[simulated: R5 Q5]`, i.e. an answer nobody gave. `meta/01` is adopted and the shipped game
   reads its `area` key, so this is a **revision request against `cid/gameplay/meta/01-the-area.md`,
   not an edit**: strike "against the brief's 3 GB device floor" and cite `budgets.deviceFloor`
   instead. → **01** issues it. The number I land on is coincidentally near 3 GB, and **that
   coincidence must not be used to retire the request** — a right number with an invented source
   is still an invented source.
3. **No frame-rate target and no memory target,** for any device class. → **01**.
4. **No load-time or join-time target,** though `firstSession` promises a clear-and-reveal inside
   ten seconds and states no origin for the clock. → **01** sets the target; whether the ten
   seconds runs from join or from first input is onboarding-instrument work's, not mine, and
   **01** states which one its target assumes.
5. **No availability or crash tolerance.** Nothing says whether an out-of-memory crash on the
   floor device at some rate is acceptable. Persistence and Build & Deploy hit the same silence
   from the data-loss side. → **01**, as `[playtest unknown]` with a stated starting value.
6. **`StreamingEnabled` is unowned and unset.** It appears in neither contract, in no CID sheet,
   and nowhere in `game/src` (`World.luau` sets collision groups, chat and the forbidden-API
   surface, and touches no `Workspace` streaming property). It is a `Workspace` property, which
   makes it place configuration, which `architect/01-runtime.placeConfiguration` enumerates as
   exactly two items and says "nothing else is place configuration". → **01** decides the values;
   the *act of setting them* is a publish-time step and routes to publish-checklist work
   [currently Build & Deploy] as a third `placeConfiguration` entry, via a revision request
   against `architect/01-runtime`.
7. **No texture or material budget.** The brief gives `fantasy-ornate` and `patch.material`
   `Grass`; nothing states whether any image asset exists at all. → **01** sets the ceiling;
   what is drawn inside it is environment- and object-art work's.
8. **The realised server tick period is stated nowhere, and the one sheet that reasons about it
   is wrong.** `architect/01-runtime` line 25: *"0.12 s is roughly two frames at 60fps"*. At 60 Hz
   it is 7.2 frames, and through `task.wait` it realises as 8 frames = 0.1333 s. → **02**.
9. **No owner for the instrument.** Every number in this domain is verified by a MicroProfiler
   or Server Jobs reading on a physical device, and no sheet in either contract owns taking one.
   Security names the same hole from the logging side and Analytics owns *what* to record and
   explicitly not the pipe. → **02** names it; the pipe's owner is a cross-category question for
   the final pass. **The kind of work is device-measurement and telemetry-transport work**, not a
   department.

## The device floor, named here because `must_verify` cannot be satisfied as written

**A 3 GB-RAM phone at the Roblox platform minimum OS: an iPhone SE (2nd generation, 2020) on
iOS, and an Android 8.0+ device with 3 GB RAM and OpenGL ES 3.0 (Galaxy A12 class) on Android,
at a 60 Hz display.** `[cid: decided]`

Why that and not the platform minimum: Roblox's own performance guidance refuses to publish a
device ceiling and instead says to *"choose at least one 'baseline' device, test your game on it
throughout the development process, and pay close attention to frame rate and memory usage"*,
offering only one illustrative threshold — *"you need to stay below 1,000 draw calls and
1,000,000 triangles for the game to run well on your baseline device"*
`[research: https://github.com/Roblox/creator-docs/blob/main/content/en-us/performance-optimization/design.md]`.
So the floor is a choice the project must make, and the platform minimum is only its lower
bound. The audience is 8–14 and mobile-heavy `[brief: binding]`, which is a hand-me-down
population, so the floor sits one tier above the platform minimum rather than at it.

**The cost of the choice, stated so it can be overturned:** budgeting at the platform minimum
instead (2 GB, iPhone 6s / Android 8.0 class) would cut the client instance budget by roughly a
third and exclude nothing else. Flagged upward as `[cid: decided]`; the developer may move it
and **01** must publish the number in a single field so that moving it moves every derived
budget at once.

## Why 3 sheets

The contract is the anchor and it gives me **zero keys today**, so the count is driven by how
many keys my subject genuinely needs and by nothing else. It needs two, not one — and I am
pushing back on `cid/tech/_category.md`'s "each proposes exactly one" with a reason. `budgets`
is a set of **ceilings on content and configuration**, read by area, layout, plot and art work
and by the publish checklist; `serverCost` is a **cost function and a loop-shape requirement**,
read by `clearing`'s implementation and by anyone who wants to move `runtime.clearTickRate`.
They have different readers, different failure modes (a player sees a `budgets` breach as a
crash or a stutter on their own phone; a `serverCost` breach as sixteen players' patches all
lagging at once) and different owners of the fix. Folding them makes the tick ruling a footnote
inside a table of ceilings, which is how a load-bearing ruling gets lost.

That gives two value sheets. The third is the one non-value sheet rule 2 permits: a prohibition
set that constrains **both** keys I own and belongs to neither, because every entry in it is a
saving I am forbidden to take. It carries no `manifest` block and says so in one line.

What I considered and did **not** assign, each with the reason:

- **A separate sheet for the part/tri/texture budget, split from the device floor.** Rejected:
  you cannot state a ceiling without a floor, and a floor with no ceilings is the adjective a
  builder cannot build from. One decision, one sheet.
- **A separate sheet for the join-time and bay-build burst.** Rejected as a second sheet and
  **folded into 02**: the steady proximity loop and the burst that builds a bay are the same
  decision — what the server may spend inside one 16.67 ms frame — described at two moments.
  They are joined by the same Heartbeat cap and they trade against each other directly.
- **A LOD sheet.** Rejected: at this content there is nothing to level. Patches are primitive
  `Part`s with no mesh and no texture (`game/src/server/Plots.luau`), so the only LOD lever that
  exists is *removal*, which is streaming (in **01**) or a silhouette breach (forbidden in
  **03**). Saying "LOD rules" over a game with no meshes would be a heading, not a decision.
- **A save-size sheet.** Not mine — `OPEN.md §2`'s second watch item is Persistence's, and
  `endgame.persistence` and `stateShape` already bound it.
- **Anything at all about seasonal content, rebirth cost, offline accrual or leaderboard
  aggregation.** Priority 3. Named once, here, to forbid a budget field being held open for any
  of them; **03** carries the same prohibition as a static check.

| # | sheet | must decide |
|---|---|---|
| 01 | `device-floor-and-budgets` | Publish `budgets`: name the device floor (a 3 GB-RAM phone at the Roblox platform minimum OS — iPhone SE 2nd gen on iOS, Android 8.0+ / OpenGL ES 3.0 / 3 GB on Android, 60 Hz display) as one field every later number derives from and tag it `[cid: decided]`, not `[brief: binding]`; then set, per device tier, the target and floor frame rate, the client and server memory ceiling, the load-to-first-input target, and the per-plot and per-server instance, part, triangle and texture ceilings; rule which patch count the ceilings are computed against, given that `art/objects/01` states 140, `depths` states 640, and wave 4 requests 1,200 at area 8 and 1,880 in the post-terminal bay while `cid/gameplay/_verified-wave4.md` line 3 says "Stage 4 does not release" (compute at 16 players, which is `runtime.maxPlayers`, never the 20 wave 4 costed against, and show both the merged and the requested figure with its unreleased status attached); decide `StreamingEnabled` and the `StreamingMinRadius` / `StreamingTargetRadius` / `StreamingIntegrityMode` / `ModelStreamingMode` values, noting that the defaults are 64 and 1024 studs `[research: https://create.roblox.com/docs/workspace/streaming]` and that at `plots.pitchStuds` 122 a 1024-stud target radius reaches every lane in a 16-lane row, while `social.maxCoPresenceSeparationStuds` 128 is a hard floor under the min radius because a neighbour at 122 studs must still render; ratify `runtime.maxPlayers` 16 against the budget rather than re-deciding it, and supply the number behind `social.maxPlayers.aboveMaxBreaks`, which today asserts "per-plot instance count and plot-row length exceed the mobile budget" with no budget behind it; issue the revision request against `cid/gameplay/meta/01-the-area.md:39` striking "against the brief's 3 GB device floor" as a citation of a different, simulated brief; and issue the revision request against `architect/01-runtime.placeConfiguration` adding the streaming properties as a third entry with a named publish-time owner. |
| 02 | `server-frame-cost` | Publish `serverCost` and rule on Balance's `runtime.clearTickRate` 0.12 → 0.04 request with arithmetic rather than by deferring it: state the quantisation rule first — the server heartbeat is capped at 60 FPS `[research: https://github.com/Roblox/creator-docs/blob/main/content/en-us/performance-optimization/identify.md]` and `task.wait` *"yields the current thread until the given duration (in seconds) elapses and then resumes the thread on the next Heartbeat step"* `[research: https://create.roblox.com/docs/scripting/scheduler]`, so through `game/src/server/Clearing.luau:485`'s `task.wait(Config.ClearTickRate)` the realised period is `ceil(d × 60) / 60` and **0.12 realises as 0.1333 s, 0.04 realises as 0.05 s, and no value between 0.0334 and 0.05 is reachable at all**; then show that 0.05 fails `depths.invariants[10]` at the post-terminal bay (1,880 patches needs a period at or under 186.3 / (2 × 1880) = 0.0496 s) so **the request as written does not deliver what it was requested for**, and that the linear `ipairs` scan at `Clearing.luau:392` — which skips cleared patches by branch and not by removal, so cost is flat across a lap — costs 1,880 × 16 × 7.5 = 225,600 distance tests/s at the shipped rate, 601,600 at the realised 0.05 (not the 752,000 or 940,000 in circulation, both of which assumed an unrealisable period or 20 players), and 902,400 at the only legal value under 0.04, which is 2 frames = 0.0333 s; then rule, and my ruling to carry unless the arithmetic breaks is **do not raise the tick**, on the ground that `depths.invariants[10]` bounds no physical quantity while the rule it is confused with, `modifiers.axes[speed].ceilingRule`, passes at the realised 0.1333 s with 1.61× room at merged values (41.25 studs/s against a 25.6 ladder top) and 1.07× under wave 4's unreleased ladder — so issue a revision request against `cid/gameplay/meta/04-the-depth-ladder.md` restating `invariants[10]` in the quantity it protects, which is how many patch clears land on one tick and is therefore a cue-coincidence bound owned by feedback and response work, and **state explicitly that dropping it moves no footprint**, because `depths.sizingRule` contains no tick term and the invariant is a check applied after sizing rather than an input to it; state the fallback with its price if the developer keeps the invariant (0.0333 s, 902,400 tests/s, spatial bucketing becomes mandatory); specify the bucketing requirement conditionally as a 1-D partition along the lane axis with a bucket depth of twice the maximum effective clear radius, noting the lane is 120 studs wide and up to 1,410 long so one axis suffices, and route it as a **revision request** to `architect`, since the loop's shape is `modules`/`clearing`'s and not mine; issue a second revision request against `architect/01-runtime` requiring `clearTickRate` to be expressed as a frame count with its realised period published, and correcting line 25's "0.12 s is roughly two frames at 60fps", which is wrong by a factor of four; and finally set the per-frame burst budget for `plots.liveGeometry`'s "built whole when the previous bay completes" rule, which today creates up to 1,880 `Instance.new` calls on the single tick that fires the game's largest payoff, plus the same cost at join — decide how many instances may be created per frame, whether the build is deferred across frames, and what the player sees while it happens, given that `mechanics/05` forbids any beat taking control away. |
| 03 | `what-optimisation-may-never-do` | Enumerate the savings this domain is forbidden to take, each naming the approved sheet it protects and a check that can be run without a running game; this sheet carries **no `manifest` block** and states in one line that it constrains `budgets` and `serverCost` rather than supplying either; at minimum: no LOD, imposter, mesh-merge, billboard or distance-collapse rule may flatten a patch's shape or height, because silhouette is the rarity channel (`04-PRESENTATION.md`'s hard accessibility constraint, and `art/objects/01` criterion 3's four distinct tier heights) — a budget met by making four tiers one shape is a failed budget; no streaming, culling or despawn rule may remove or hide a patch **on the server**, because `Clearing.luau` reads `state.patches` as a Luau table and a saving taken against that table silently stops paying the player, which is the one optimisation that would meet stopping-rule bar (a) directly; no optimisation may make an area's inter-plot boundary opaque or remove a neighbour's character at under `social.maxCoPresenceSeparationStuds` 128 studs, because `mechanics/06` and `social/02` require the sightline and `plots.coPresence` already survives on 38.7 studs of margin; `StreamingIntegrityMode` may not be `Disabled`, since a player who outruns the loaded region in a game with no failure state produces a fall no rule in `traversal` allows; no budget field is reserved, stubbed or held open for any priority-3 system, naming procedural generation, rebirth, offline accrual, codes, daily rewards, leaderboards, trading and seasons in order to exclude them; and no optimisation may introduce a second source of randomness or reorder `layout`'s patch index, which `architect/01-runtime` and `layout` R9 both make a save-migration boundary. |

## Verification note

**Sheet 02 is the one most likely to be contradicted, and by two parties at once.**
`architect` owns `runtime.clearTickRate` and `modules`/`clearing`'s loop shape, so both of 02's
revision requests land in a contract that has already merged COMPLETE 7/7 and may decline them;
and Balance's wave 4 has not released (`cid/gameplay/_verified-wave4.md` line 3), so every
patch count 02 costs against — 1,200, 1,880, the 186.3 s bay lap — is cited from an unreleased
stage and may move under the sixteen open revision requests. 02 must therefore carry **both**
arithmetics: the merged case (640 patches, 16 players) and the requested case, each labelled,
so that a wave-4 revision changes which column is live rather than invalidating the sheet.

Sheet 01 is contradicted more cheaply: it will be wrong the first time anyone runs the game on a
phone, which is the correct kind of wrong and is why every ceiling in it must carry a test range
and a named measurement rather than a bare number.

Sheet 03 should not be contradicted at all. If it is, the contradiction is a design change, not
a performance decision, and it goes back to the sheet that owns the constraint.

## Research owed

**What `must_verify` asked for, and why half of it cannot be delivered as sourced fact.**

*"Verify the instance and part ceiling for that class of device rather than assuming."*
**There is no published instance or part ceiling for any class of device, and I established
that rather than assuming it.** Roblox's own performance documentation declines to give one and
instead instructs developers to pick a baseline device and measure — that instruction is quoted
in full above, and it is the strongest available answer to the question. The one numeric anchor
it offers is illustrative and per-device (fewer than 1,000 draw calls and 1,000,000 triangles).
So the ceiling is `[playtest unknown]` with a stated starting value, a test range and a named
measurement (Developer Console → Server Jobs → Heartbeat steps-per-sec, and Memory by category,
taken on the floor device), **not** `[research: url]`. A sheet that writes a part ceiling as
sourced is writing a claim that no page supports.

**Fetched and banked for the writer** (these are the whole of the external evidence available to
it, since it cannot fetch):

- `https://github.com/Roblox/creator-docs/blob/main/content/en-us/performance-optimization/design.md`
  — the baseline-device instruction, verbatim; the 1,000 draw calls / 1,000,000 triangles
  example; "Roblox does not have access to all of a device's memory"; instance streaming
  "improves join times, reduces memory footprint, and increases frame rate".
- `https://github.com/Roblox/creator-docs/blob/main/content/en-us/performance-optimization/identify.md`
  — *"Server heartbeat is capped at 60 FPS for all games, so lower values might indicate a
  performance issue."* Plus the Server Jobs / MicroProfiler reading method and the 16.67 ms
  frame. **This is the load-bearing source for sheet 02.**
- `https://create.roblox.com/docs/scripting/scheduler` — `task.wait` *"yields the current thread
  until the given duration (in seconds) elapses and then resumes the thread on the next
  Heartbeat step."* Verbatim, and mirrored at
  `https://github.com/Roblox/creator-docs/blob/main/content/en-us/scripting/scheduler.md`.
  **The second load-bearing source for 02**: with the 60 FPS cap it gives the quantisation rule.
- `https://create.roblox.com/docs/workspace/streaming` — `StreamingMinRadius` default 64 studs,
  `StreamingTargetRadius` default 1024 studs; the four `ModelStreamingMode` values with their
  descriptions; `StreamingIntegrityMode` recommended `PauseOutsideLoadedArea`.
- `https://create.roblox.com/docs/studio/optimization/memory-usage` (and its GitHub mirror) —
  the memory category tree: `CoreMemory`, `PlaceMemory`, `UntrackedMemory`, `PlaceScriptMemory`,
  `CoreScriptMemory`, with `PlaceMemory` subdividing into `Instances`, `PhysicsParts`,
  `PhysicsCollision`, `GraphicsTexture`, `GraphicsMeshParts`, `Sounds`, `Gui` and others.
  **These names are the data form for a memory budget** — a budget expressed in them is
  checkable against a real reading; one expressed in megabytes of "the game" is not.
- `https://create.roblox.com/docs/performance-optimization/improve` — "For parts that do not
  need collisions, disable their collisions by setting `BasePart.CanCollide`, `BasePart.CanTouch`
  and `BasePart.CanQuery` to false"; `CastShadow` guidance; draw-call instancing described for
  *meshes* sharing content and texture. Note for **01**: `Plots.luau` already sets `CanCollide`
  false and `CastShadow` false on patches but sets **neither `CanTouch` nor `CanQuery`**, which
  is a one-property saving available at no design cost and is a consequence for whoever holds
  `representation`.

**Could not verify, with the specific fetch that would settle each:**

- **The official Roblox mobile minimum specification.** `https://en.help.roblox.com/hc/en-us/articles/203625474-Roblox-Mobile-System-Requirements`
  returned HTTP 403 on direct fetch and the Fandom mirror returned HTTP 402. Search snapshots of
  the official page give iOS 14 / iPadOS 14 and iPhone 6s class, Android 8.0 with OpenGL ES 3.0;
  a dated secondary (`https://bloxboom.com/blog/roblox-system-requirements`, 2025-05-21) gives
  iOS 11 / Android 5.0 and 2 GB RAM, which **contradicts the snapshot on both OS versions**.
  `[unverified]`. The fetch that settles it is that help-centre article from a client the
  Zendesk edge does not reject. **The floor I named does not depend on which is right** — both
  candidates sit below it — but the sentence "the platform minimum is one tier below this floor"
  does, and **01** must carry it as `[unverified]` rather than as sourced.
- **Whether primitive `Part`s batch into shared draw calls the way meshes do.** The improve-page
  statement is about meshes. Unresolved, and it decides whether 30,160 patch parts is 30,160 draw
  calls or a few dozen — the single largest uncertainty in `budgets`. Settled only by a render-stats
  reading on the floor device, which is gap 9. `[playtest unknown]`.
- **Luau per-iteration cost for the proximity scan** (two field reads, two subtractions, two
  multiplies, one compare). No source exists. 02 must state a starting range with the
  MicroProfiler reading named as the instrument. `[playtest unknown]`.
- **Roblox part precision and streaming behaviour for anchored parts beyond roughly 20,000 studs
  from the origin.** Inherited unresolved from `gameplay/meta/06`'s own `[research owed:]`; it
  bounds `endgame`'s endless run (bay 42 at 480-stud bays, bay 12 at wave 4's 1,410-stud bays)
  and it is a `budgets` question as much as a `meta/07` one. Not fetched; named here so it is
  not lost. `[research owed:]`
