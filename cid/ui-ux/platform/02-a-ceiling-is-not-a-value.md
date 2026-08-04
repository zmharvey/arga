# 02 — A ceiling is not a value

**Domain:** ui-ux/platform · **Category:** UI/UX · **Wave:** 5

## Decision

Every numeric field `viewport` publishes carries a **kind** — `floor`, `ceiling` or `value` —
and the kinds are data, in `viewport.fieldKinds`, not prose. **A builder may never derive a
position, a size or a reserved extent from a field whose kind is `ceiling`.** A `ceiling` may
appear only where it bounds a measurement: as an operand of a comparison, as an argument to
`math.min`, as the third argument to `math.clamp`, or as an assignment to a `MaxSize` /
`maxSize` property. Anywhere else is a build failure, not a code-review note.

**This sheet carries no `manifest` block.** It is a prohibition that shapes the values of one
key — `viewport`, supplied by sheet `01` of this domain, which carries the `fieldKinds` map
this rule reads — and it supplies none of them.

**This sheet carries no manifest block, because its data form is already a field of a
neighbour's key**: the kinds are **`viewport.fieldKinds`**, which sheet `01` supplies and which
this sheet reads rather than restates. Verified this run — that field exists and holds the six
paths, including the two `classes.*.` wildcards.

## Why

**The failure is shipped, dated and player-visible, so this is not a hypothetical.**
`hud-overlay.mjs:243` sets `maxSize: { s: [0.46, null] }` on every corner cluster — the widest
that cluster may ever be `[research: ui-forge/src/compose/patterns/hud-overlay.mjs]`.
`Pressables.luau:151-171` reserved that 0.46 as the width the cluster *has*, placed the
purchase column at `1 − 0.46`, and so put the column's right edge at **0.54 of viewport width,
dead centre of the screen, on top of the player's own character**
`[research: game/src/client/Pressables.luau]`. The module's own comment records the realised
cluster as about **0.11** of an 1800 px viewport. The developer reported it as *"big purple
boxes that cover the screen"* `[research: cid/_playtest.md]` — a 0.46-against-0.11 error, in
the first and only playthrough, on the game's single currency sink.

**It was not a careless read.** The comment block at `Pressables.luau:142-151` argues, correctly
and at length, that 0.46 is *"NOT invented"* and is the pattern's own ceiling. Everything about
the provenance was right. The one thing nobody wrote down was what a ceiling may be *used for*,
and the value's own name — `maxSize` — was the only carrier of that fact. **A naming convention
is not a contract**, and the same convention was read the other way by a competent builder in a
module whose comments show it was thinking hard about exactly this number.

**It is a class of defect, not an instance, and the same file contains both halves.** The fix
committed after the playtest — `math.clamp(scale, FALLBACK, MAX)` at `Pressables.luau:195` — is
a ceiling in its legal position, and `constraint.MinSize = Vector2.new(MIN_TOUCH_TARGET_PX, …)`
is a floor in its legal position. Two correct uses and one wrong use of the same three kinds sit
within fifty lines of each other, distinguishable only by reading the surrounding prose. That
is precisely the state a build agent cannot be asked to arbitrate `[cid: decided]`.

**A tagged manifest makes it greppable, which is the whole point.** `viewport` publishes two
ceilings — `pressableMaxWidthScale` and `persistentSurfaceShortAxisShareMax` — and the second
is the one most likely to repeat the defect, because 0.65 of a 414 px short axis reads exactly
like a layout instruction and is not one. The budget bounds what `composition` may spend; it is
not the height of anything.

**What this rule does not catch, stated so nobody over-trusts it.** The shipped
`MIN_TOUCH_TARGET_PX = 96` failure is a *floor* used as a floor — legal under this rule and
still wrong, because the constant itself was invented. That defect is closed by sheet `01`'s
derivation of the floor from the platform jump button, not by this sheet. **This rule catches a
bound read as a quantity; it does not catch a wrong quantity.** The two are separate checks and
both are needed.

**Why it belongs in this domain rather than in the contract seam.** Every field it governs is
one this domain publishes, and the two live instances are both geometry. If the seam later
promotes `kind` into `bridge/schema.mjs` as a general field, that is strictly better and costs
this sheet nothing — the rule is stated as a property of a tagged field, not of `viewport`.
`[research owed: whether bridge/merge.mjs can host a per-field kind annotation without a schema change, which would make this a merge check rather than a source lint]`

## The rule, as three tables a builder can check

| kind | means | may be assigned to a position, size or extent | may be compared against one |
|---|---|---|---|
| `value` | the quantity itself | yes | yes |
| `floor` | the smallest legal quantity | yes — assigning the floor is the minimum-legal layout | yes |
| `ceiling` | the largest legal quantity | **no** | yes, and this is its only use |

| legal appearance of a `ceiling`-kind identifier | example |
|---|---|
| operand of `<`, `<=`, `>`, `>=` | `assert(realised <= share)` |
| argument to `math.min` | `math.min(measured, share)` |
| third argument to `math.clamp` | `math.clamp(scale, floor, ceiling)` |
| right-hand side of a `MaxSize` or `maxSize` assignment | `constraint.MaxSize = …` |
| anything else | **fails the build** |

| the two `ceiling` fields `viewport` publishes | what reads it | the wrong use to watch for |
|---|---|---|
| `classes.*.pressableMaxWidthScale` | `composition`, then the module that sizes a pressable | `button.Size = UDim2.new(ceiling, …)` |
| `classes.*.persistentSurfaceShortAxisShareMax` | `composition`, then whoever lays out a cluster | reserving `0.65 × H` as the HUD's height |

## Consequences for other work

- **Device and viewport rules (sheet `01`, this domain).** It carries `fieldKinds` covering
  every numeric field it publishes, with no field untagged. A new numeric field added to
  `viewport` without a kind is this rule failing silently, which is the one way it can fail.
- **Persistent-surface composition (owner of `composition`).** Both ceilings above are read by
  that key and by nothing else, and it inherits the prohibition directly: the realised extent
  of a group is measured and compared against `persistentSurfaceShortAxisShareMax`, never
  derived from it. It also inherits the retirement of `HUD_CLUSTER_MAX_WIDTH_SCALE` and
  `HUD_CLUSTER_FALLBACK_WIDTH_SCALE`, which are the same pair of numbers under local names.
- **`ui-forge` pattern work.** `hud-overlay.mjs`'s `maxSize` on `cluster()` stays and is
  correct; the finding is not against the pattern. What the pattern owes is that any numeric it
  exposes to a brief be nameable as one of the three kinds, so a downstream module cannot read
  a cap as a size again. `modal-grid`'s parameters get the same treatment when a sheet publishes
  values into them.
- **Whoever writes the wave's build checks, and the contract seam.** The grep in the second
  table is a lint that does not exist. It is cheap — one pattern per `ceiling`-kind field —
  and it converts the single most expensive defect this project has recorded into a build
  failure. This is the fourth CID request in the same direction and it should be counted as one.
- **Every later domain that publishes a bound.** Audio's loudness caps, Tech's part-count and
  save-size budgets and Analytics' event-rate limits are all ceilings, all likely to be read as
  targets, and all covered the moment they carry a kind.

## Acceptance criteria

1. Every numeric field of the merged `viewport` value appears exactly once in
   `viewport.fieldKinds` with a value in `{ "floor", "ceiling", "value" }`; the count of
   untagged numeric fields is **0**.
2. In `game/src/**` and `ui-forge/src/emit/**`, every occurrence of an identifier bound to a
   `ceiling`-kind field is inside a comparison, a `math.min`, `math.clamp`'s third argument, or
   a `MaxSize` / `maxSize` assignment. Any other occurrence fails the check. Count of failing
   occurrences: **0**.
3. At each of the four device classes, the realised short-axis extent of the persistent surface
   is strictly less than `persistentSurfaceShortAxisShareMax` for that class, and the literal
   value of that field appears in no size or position expression in the built tree.

## Not decided here

- **Every number `viewport` publishes, and its kind tag** — sheet `01`, this domain, which
  supplies the key. This sheet states what a kind means and forbids one use of one kind; it sets
  no value and assigns no tag.
- **The realised width of any element, and the extent any group occupies** — `composition`
  (`ui-ux/hud/01`), which spends the budget this rule protects.
- **Whether `kind` is promoted into `bridge/schema.mjs` as a general per-field annotation, and
  whether the lint gates a build or only reports** — contract-and-seam work.
- **Whether `hud-overlay`'s `maxSize` value of 0.46 is the right ceiling** — `composition`. The
  number may well be wrong; this sheet is about what may be done with it either way.
- **The `MIN_TOUCH_TARGET_PX = 96` defect** — sheet `01`, which closes it by derivation. This
  rule would not have caught it and does not claim to.
