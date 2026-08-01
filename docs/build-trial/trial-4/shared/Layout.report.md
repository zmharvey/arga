# Build report — layout

**Check.** Clean. `luau-analyze` on its own reports six errors on this file, all of them
environmental rather than mine: `Unknown global 'game'`, `Unknown global 'Random'`,
`Unknown global 'Vector3'`, `Unknown type 'Vector3'`, `Unknown type 'BasePart'`,
`Unknown require: unsupported path`. That binary has no `--defs` flag and no Roblox
definitions, so it cannot check any file in this repo that touches the engine. I re-ran the
same typechecker through `luau-lsp analyze` with Roblox `globalTypes.d.luau` and a
hand-written Rojo sourcemap placing `GameConfig`/`Layout` under
`ReplicatedStorage.UIForge`: **zero errors, zero warnings**, and I confirmed the harness
actually bites by injecting a deliberate type error and watching it fail.

I also executed the module outside Roblox against stubbed `Vector3` and `Random` (a plain
LCG) to check the four "Done when" criteria: 140 patches, closest pair 6.24 studs against a
floor of 6, exactly 6 relics with no duplicated name, the nearest-origin patch holding
`Sundial`, identical output on two calls, `Y = 0`, `cleared = false`, `instance = nil`,
`tierIndex` in 1..4. Repeated over 60 different seeds the closest pair anywhere was 6.06, so
the spacing floor is structural and not a lucky seed. **The numbers a real run produces are
not verifiable outside the engine** — Roblox's `Random` is a different generator from my
stub — so what is verified is the algorithm's properties, not the shipped field.

## Stops

- **The seed.** The module's own *Owns* line says "deterministically from a fixed seed" and
  no seed value appears under *Values*, in `GameConfig`, or anywhere else on the page. I
  used `LAYOUT_SEED = 1`, flagged in the source as not-in-the-contract. It is the one number
  in this file that nobody designed, and it decides every position, every tier and every
  Find placement — and therefore the meaning of every persisted `cleared` index.
- **The placement algorithm.** *Values* gives `patchCount`, `size` and `minSpacing` but no
  procedure. "140 points in 120×120, none closer than 6" is satisfied by a jittered grid, by
  dart-throwing/Poisson-disk, by concentric rings, by a sunflower spiral, and by hand-placed
  points, and those produce visibly different areas *and* different index→patch mappings —
  which the brief itself calls a save migration. I invented one: a grid of
  `ceil(sqrt(patchCount))` columns by `ceil(patchCount/columns)` rows, per-row counts
  distributed Bresenham-style so the remainder does not leave a bald strip, each point
  jittered by at most half the slack between its cell pitch and `minSpacing`. Two builders
  handed this brief will not produce the same field, and nothing in the contract prefers
  mine. This is the largest gap in the module.
- **Who owns the Y component of `Patch.position`.** My interface note describes X and Z only
  ("span roughly ± area.size/2 on X and Z") and never mentions Y. The representation sheet
  says a patch Part's `Position` is "the patch's world position, with Y at tier.height / 2
  above the slab's top face", and `constructs` says `plots` builds patches "from
  layout.build() with the slot origin added" — an addition, with no Y arithmetic named. So
  either layout supplies `tier.height / 2` and plots adds a slot origin whose Y is the
  walkable plane, or layout supplies 0 and plots computes the height. I chose **Y = 0**, on
  the grounds that the height rule is written in plots' representation entry and is a
  property of the Part. If plots' builder read it the other way, every patch floats at
  double height; if we both read it my way, they are half-buried. Nothing on the page
  settles it.
- **Whether a patch must sit on, or within reach of, the plot origin.** `wiring.onSpawn`
  step 3 says the player "arrives at the plot origin, standing in the patch that hides the
  first Find of set one", and `GameConfig` calls it "the promise that the first patch has
  something under it". My criterion 2 only requires that the *nearest* patch carries relic
  one, which is a much weaker thing. Measured over 60 seeds, the nearest patch lands
  3.48–6.65 studs from the origin (median 5.23) and falls outside `BaseClearRadius` (5.5) on
  roughly a third of them, meaning the player spawns, clears nothing, and the first Find is
  whichever patch they happen to walk into. I cannot tell you which side of that line the
  shipped seed falls on, because the real `Random` only runs inside Roblox. To guarantee the
  promise I would have had to invent a rule the contract does not state — "index 1 sits at
  (0,0)", or "the guaranteed patch is placed within `BaseClearRadius`", or a grid rigged to
  put a cell centre on the origin — each of which also forces the grid dimensions. I built
  the honest reading of criterion 2 instead.
- **Which relic set is this area's.** No mapping from an area to a set exists anywhere: the
  area id is `east-terrace`, the set id is `terrace`, `depth` is 1, `areasPerDepth` is 1, and
  criterion 2 says "set one". I used `GameConfig.RelicSets[1]` on the strength of criterion 2
  alone. `build()` takes no area argument, so when a second area exists this module has no
  way to be told which set to bury — the signature itself would have to change.
- **How the other five Finds are distributed.** Nothing states a rule. Uniform? One per
  quadrant? Never adjacent? Not on the outer ring? Weighted by distance from spawn so the
  set paces out as the player expands? I used a uniform draw over the remaining patches,
  which legally allows all six Finds to sit in one corner of the terrace, or five of them
  within one clear radius of each other. That is a pacing decision and it currently has no
  owner.

## Decided without a stated value

**Placement geometry**

- Columns = `ceil(sqrt(patchCount))` = 12, rows = `ceil(patchCount / columns)` = 12. Any
  other factorisation (14×10 divides 140 exactly and would have been tidier) gives a
  different field; I picked the square-ish derivation because it survives a `patchCount`
  that is prime, which an exact factorisation does not.
- 12×12 is 144 cells for 140 patches. Rather than drop the last four cells (a 40×10 stud
  bald strip in one corner) I spread the deficit with a Bresenham split, so rows hold
  11,12,12,11,12,12,11,12,12,11,12,12. Nothing asked for an even field; a bald corner would
  have satisfied every stated criterion.
- Jitter is derived, not chosen: half the slack between the cell pitch and `minSpacing`, so
  ±2 studs on Z always, and ±2 (12-wide rows) or ±2.45 (11-wide rows) on X. I added no
  safety margin, which means the theoretical worst case is *exactly* `minSpacing`. I read
  "no two patches sit closer than minSpacing" as `>=`, so equality passes; a checker written
  as `> minSpacing` would disagree with me on a measure-zero draw.
- Row-to-row separation is what guarantees spacing between rows, and column-to-column
  separation within a row. There is no pairwise distance check anywhere in the module and no
  rejection loop: the construction makes the violation impossible rather than detecting it.
  Nothing states which of those two the design wanted.
- Field extent falls out as `size/2 − minSpacing/2` = ±57 studs, so a 3-stud patch stays 1.5
  studs inside the 120-stud slab. That is a coincidence of the arithmetic, not a rule I
  enforced: I never read `GameConfig.Patch.footprint`, so a larger footprint would start
  overhanging the slab edge and nothing here would notice. No stated rule forbids overhang.
- **Canonical order is row-major**: rows from −Z to +Z, columns from −X to +X within a row.
  The brief says "a fixed canonical order" without saying which. This ordering is now the
  durable identity of every save.
- The origin is taken as (0, 0) and **`area.originXZ` is never read**. It is `[0, 0]` today
  and the interface calls it "the plot CENTRE"; since positions are plot-local and the centre
  of a plot-local field is (0,0,0) by definition, reading it would double-count. If it ever
  becomes non-zero this module ignores it silently.

**Randomness**

- `Random.new(seed)` rather than a hand-written PRNG. That puts the determinism the whole
  save format depends on into the engine's hands: Roblox documents that a seed reproduces a
  sequence, but if the generator ever changed across an engine version, every layout index
  would move and the module's own *Must not* would be violated by an update rather than by a
  commit. A hand-rolled LCG would have removed that risk at the cost of inventing multiplier
  and modulus constants, which felt like the worse invention.
- One generator per `build()` call, created fresh inside the function. A module-level
  generator would make call N depend on call N−1 and break criterion 1 on the second plot.
- **Draw order**: per patch, in canonical order — jitter X, then jitter Z, then the tier
  roll; then, after the entire field exists, the relic draws. Any permutation of those three
  produces a completely different area from the same seed.
- Tier rolls are independent per patch with no spatial structure — no "rarer tiers further
  from spawn", no clustering. The `tierByWeight(roll)` interface implies one uniform roll per
  patch, but the absence of spatial structure is my reading, not a stated one.
- Remaining relics are placed by drawing `NextInteger(1, patchCount)` and rejecting a patch
  that already holds one, rather than by a partial Fisher-Yates shuffle. Both are
  deterministic; they consume the stream differently and give different answers.
- Relic *names* are dealt in set order to patches in draw order, so the name sequence has no
  relation to position or index: a player sweeping outward does not find Sundial, Ewer,
  Hinge in that order. Only relic one is anchored.
- Nearest-to-origin is measured on squared XZ distance (Y ignored, which is moot at Y = 0),
  with ties going to the lower index so the answer is stable.

**Contract edges nobody mentioned**

- `GuaranteedFirstRelic = false` is unhandled by the spec even though the flag exists to be
  flippable. I made false mean "all six drawn uniformly, name one going to the first patch
  drawn", so the anchor simply disappears.
- `relicTarget = min(RelicsPerArea, #relicNames, #patches)`. If a re-emitted config ever
  asks for more Finds than the set has names, this places fewer and says nothing. Erroring
  was the other option; the module has no stated error convention, returns data only, and a
  hard error here would take the whole join path down.
- `patchCount <= 0` returns an empty array rather than erroring.
- A guard skips a row that would hold zero patches. It is unreachable for any
  `patchCount >= rows`, and exists only so a degenerate config produces missing patches
  rather than a division by zero and a field of NaN positions.
- If `minSpacing` were ever >= the cell pitch (a config that genuinely cannot fit), jitter
  clamps to 0 and the module returns a rigid grid that *violates* the spacing floor, silently.
  The brief says the schema checks the fit upstream, so I trusted it rather than re-checking.
- The module emits no `warn`, logs nothing, and asserts nothing.

**Shape and naming**

- The module table is `Layout` and the export is `Layout.build`, matching the brief's
  `build()`.
- I declared and **exported `type Patch`** here. No shared types module exists in the build
  order, `plots`/`clearing`/`persistence` all need the type, and this is the module that
  constructs one. If a types module appears later this becomes a second definition of the
  same shape.
- `tierIndex: number`, because Luau has no integer type; `03-state-shape` says integer and
  nothing enforces it.
- `instance: BasePart?` in the exported type makes this module engine-only, unlike
  `GameConfig`, which deliberately constructs no Roblox type so it can be tested outside
  Roblox. Layout has to construct `Vector3` anyway, so that boundary was already crossed for
  it, but it does mean layout cannot be unit-tested the way config can.
- `cleared = false` and `relic = nil` / `instance = nil` are written explicitly in the table
  literal instead of being omitted. Identical at runtime; I wanted the record's full shape
  visible where it is built.
- Require form: `game:GetService("ReplicatedStorage"):WaitForChild("UIForge")` into a local,
  then `Shared.GameConfig`, copying `tree.examples.sharedFromAnySide`. `script.Parent.GameConfig`
  would also work and would not yield, and the tree gives no example of one shared module
  reaching another; I followed the general shared-root form.
- That `WaitForChild` runs at require time, which is arguably "work at require time" under
  the tree's first rule. The tree's own example does exactly this, so I did too.
- `build()` returns freshly-built tables on every call and memoizes nothing. `plots` writes
  `cleared` and `instance` into these records per player, so a cached shared array would leak
  one player's progress into another's plot. The brief never says whether the returned table
  may be cached or must be fresh; 140 records per join is cheap enough that I did not weigh it.
- Local names: `indexNearestOrigin`, `rowDepth`, `columnWidth`, `jitterX`, `jitterZ`,
  `filledBefore`, `inRow`, `centreX`, `centreZ`, `taken`, `placed`, `relicTarget`, `Shared`,
  `LAYOUT_SEED`.
- Config values are read inside `build()` rather than captured in module-level locals, so
  nothing is frozen at require time.

## Assumed about a dependency

- `GameConfig` exists at `ReplicatedStorage.UIForge.GameConfig` and requiring it yields the
  table itself. Its file was present and I read it; the runtime location is assumed from the
  tree.
- `tierByWeight(roll)` takes a uniform sample in [0,1) and returns `(index, tier)`; I keep
  only the index. I also assume a roll of exactly 0 is legal — `Random:NextNumber()` can
  return it, and the config's loop maps it to index 1.
- **`Random.new(seed)` yields the same sequence for the same seed across sessions, servers,
  places and engine versions.** Per-seed determinism is documented; cross-version stability
  is the assumption, and it is the assumption the entire "cleared indices survive a rejoin"
  guarantee rests on.
- `Random:NextNumber(min, max)` tolerates `min == max` (reachable only on an infeasible
  config) and `Random:NextNumber()` returns [0, 1).
- `Random:NextInteger(min, max)` is inclusive of both ends.
- **`plots` adds the tier height offset and the slot origin itself** and does not expect
  layout to have applied either. See the Y stop above.
- `plots`, `clearing` and `persistence` all treat the returned array's 1-based index as the
  key of `state.cleared` (stated) and never reorder or filter the array in a way that shifts
  it — `constructs` says a cleared patch keeps its record precisely to preserve alignment,
  so I assume no caller compacts the array.
- Callers may freely mutate the returned records; nothing is shared or frozen.
- Nothing requires `Layout` before `ReplicatedStorage.UIForge` exists, since the require
  yields on `WaitForChild`.
- `GameConfig.RelicsPerArea` (6) refers to the same set that `RelicSets[1]` names, and those
  six strings are the exact keys `state.found` is keyed by, so the strings I write into
  `Patch.relic` are directly usable as `found` keys by `clearing` with no translation.
- `GameConfig.Area.patchCount` fits at `Area.size` with `Area.minSpacing`, as the config's
  own comment claims the schema checks. The module does not re-verify it.
