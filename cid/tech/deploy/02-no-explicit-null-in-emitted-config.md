# 02 — No explicit null in an emitted config

**Domain:** tech/deploy · **Category:** Tech & Data · **Wave:** 5

## Decision

**An emitted value may never be an explicit null.** `bridge/emit-config.mjs` hard-errors on a
`null` or `undefined` inside a manifest value, naming the JSON path, instead of writing `nil`.
Absence is written as a declared sentinel of the field's own type: `false` for a boolean, `{}`
for a list, `0` for an unprovisioned platform id, and the string `"none"` for any scalar unless
the containing table declares a more specific sentinel in place.

## Why

**Verified, not inferred.** `bridge/emit-config.mjs:79` returns the literal `nil` for both `null`
and `undefined`, and Luau drops a nil-valued field from a table constructor — so **an explicit
null and a never-emitted key are the same bytes at runtime**
`[research: bridge/emit-config.mjs]`. Sixteen fields in the shipped `GameConfig.luau` are in that
state `[research: game/src/shared/GameConfig.luau]`. It follows necessarily that an emitted config
cannot carry an explicit null: not "should not" — cannot. What the sheets write instead is the
only decision left.

**The emitter already does absence properly, which is why the null is wrong.**
`DOCUMENTATION_ONLY` drops `forbidden`, `forbiddenApis` and `invariants` **by name**, with a
comment and an instruction that a fourth be added deliberately
`[research: bridge/emit-config.mjs]`. That is a reviewed act. A null is the same act performed
silently on a field nobody chose to drop. Hard-erroring rather than substituting keeps the fix
where the defect is: a sheet shipped a field it had not decided, and its owner should see the
path.

**`"none"` is not invented here.** `unlock = "none"` sits one line above
`maxRadiusProduct = nil` at `GameConfig.luau:196–197`, and `authoredCue` and `lossOnRespawn` use
it in `Traversal` `[research: game/src/shared/GameConfig.luau]`. It is already the artifact's
majority convention for "there is not one of these"; the sixteen below are the minority that says
it as a hole.

**The cost is a type change on four numeric fields, and it is the right cost.** Where a number
becomes `"none"` a reader doing arithmetic gets a loud type error instead of a silent nil-skip,
guarded by one `type(v) == "number"` test. The silent skip is the divergence this rule exists to
stop: to a loop reading `nil`, a bound that is missing and a bound that is infinite are the same
row.

**Eight of the sixteen are semantic, by a test a reviewer can re-run.** A site is **semantic** if
a reader iterating the containing table cannot recover the intended value and no sibling field
carries the same fact **as a machine-readable value**. Prose does not count —
`ceilingReason = "a currency multiplier breaks no invariant"` is unparseable, so
`ceilingRule = nil` beside it is semantic. A boolean does — `damage = false` beside
`maxSurvivableFallStuds = nil` recovers it exactly.

**One correction to my own domain index.** It placed line 1286 at
`Depths.invariants.H1_axisCeiling.ceilings.value`. It is
**`Products.headroom.H1_axisCeiling.ceilings.value`**: `GameConfig.Products` opens at 1214,
`GameConfig.Rarity` at 1325 `[research: game/src/shared/GameConfig.luau]`. The owner is
`products`, so the revision goes to `gameplay/monetization/03` — and had it truly been under
`invariants`, `DOCUMENTATION_ONLY` would have stripped the block and there would be no emitted
site at all, which is the sharpest available illustration of why the two kinds of absence must
not be confused.

| line | path in `GameConfig.luau` | class | replacement | owning key · sheet | what a reader gets wrong |
|---|---|---|---|---|---|
| 197 | `Depths.areas[1].maxRadiusProduct` | **semantic** | `"none"` | `depths` · `gameplay/meta/04` | rows 2–8 carry numeric bounds; a per-ordinal `H1` checker sees row 1 with none and cannot tell "unbounded" from "not yet derived" |
| 375 | `Discovery.sellableLuck` | documentary | `"none"` | `discovery` · `gameplay/systems/05` | nothing: sibling `luckShaped = false` carries it as a boolean |
| 383 | `Economy.balanceCap` | **semantic** | `"none"` | `economy` · `gameplay/systems/04` | "income continues and is neither capped nor hidden" is the sheet's ruling and is currently unreadable at runtime; a later cap check has no field to read |
| 439 | `Economy.atMaxLadder.convertsTo` | documentary | `"none"` | `economy` · `gameplay/systems/04` | nothing: sibling `newSinkAppears = false` carries it |
| 550 | `FirstSession.beats[spawn].teaches` | **semantic** | `{}` | `firstSession` · `gameplay/onboarding/02` | list-typed: `ipairs(nil)` errors, so the two readings are a crash and an empty loop, and two builders will differ on the guard |
| 597 | `FirstSession.beats[tierContrast].teaches` | **semantic** | `{}` | `firstSession` · `gameplay/onboarding/02` | same |
| 706 | `FirstSession.withheld[collectionCount].liftedBy` | documentary | `"none"` | `firstSession` · `gameplay/onboarding/02` | nothing: `presentAtJoin = true` and `latched = false` carry it |
| 721 | `FirstSession.withheld[currencyReadout].liftedBy` | documentary | `"none"` | `firstSession` · `gameplay/onboarding/02` | same |
| 737 | `FirstSession.withheld[areaProgress].liftedBy` | documentary | `"none"` | `firstSession` · `gameplay/onboarding/02` | same |
| 1000 | `Modifiers.axes[value].ceilingRule` | **semantic** | `"none"` | `modifiers` · `gameplay/systems/06` | a clamp built by iterating the three axes finds rules on two and nothing on the third; the sibling that explains it is prose |
| 1239 | `Products.prompt.method` | documentary | `"none"` | `products` · `gameplay/monetization/01` | nothing: sibling `promptGamePassPurchaseCalls = 0` carries it |
| 1253 | `Products.items[span].gamePassId` | **semantic** | `0` | `products` · `gameplay/monetization/01` | the sharpest one: an absent id reaches `UserOwnsGamePassAsync` as `nil` and errors, where `0` is a legal number no pass can have and one `> 0` test resolves the product to not-owned |
| 1286 | `Products.headroom.H1_axisCeiling.ceilings.value` | **semantic** | `"none"` | `products` · `gameplay/monetization/03` | a builder iterating `ceilings` sees two axes and cannot tell "the value axis has no ceiling" from "the value axis is missing" |
| 1354 | `Rarity.findRarityField` | documentary | `"none"` | `rarity` · `gameplay/systems/03` | nothing: `rolled = false` and `perObjectVisualGrade = false` carry it |
| 1552 | `SetBonus.axisHeadroom.value.availableToSets` | **semantic** | `"none"` | `setBonus` · `gameplay/meta/03` | a headroom check iterating three axes gets numbers for `radius` and `speed` and a hole for `value`; the sibling that explains it is prose |
| 1696 | `Traversal.fall.maxSurvivableFallStuds` | documentary | `"none"` | `traversal` · `gameplay/mechanics/06` | nothing: `damage = false` and `voidBelowPlayArea = false` carry it |

**No manifest block.** This is a prohibition on how any key is serialised, not a value: it shapes
`release` — whose `provisioning.unprovisionedIdValue` of `0` and whose `version.ledger` sentinel
`"unpublished"` exist because of it — and equally all 25 merged keys and every proposal behind
them. The key it would need is `release`, and sheet `01` carries that.

## Consequences for other work

- **Area authoring by depth (`depths`).** `areas[1].maxRadiusProduct` becomes `"none"`, or the
  real bound if Balance derives one; either way a per-ordinal `H1` check must skip non-number
  rows explicitly rather than by falsiness.
- **Earning-and-spending work (`economy`).** `balanceCap` and `convertsTo` become `"none"`. The
  first matters: your ruling that income is neither capped nor hidden is currently absent from
  the artifact rather than stated in it.
- **First-minute-beats work (`firstSession`).** Five fields: two `teaches` become `{}`, three
  `liftedBy` become `"none"`. The `teaches` pair is the crash-class one.
- **Modifier-stacking work (`modifiers`) and set-bonus work (`setBonus`).** One field each, same
  shape — an axis map where two entries have a value and the third has a hole. `"none"` in both,
  so a loop can read every row.
- **Offer-ladder work (`products`) and purchase-headroom work (`products.headroom`).** Three
  fields. `gamePassId` becomes `0` and every `UserOwnsGamePassAsync` call site gains a `> 0`
  guard — which is also what makes `release.provisioning`'s "the build runs at every gate" true.
  `ceilings.value` becomes `"none"`.
- **Save-write work (Persistence, same wave).** Its index already anticipates this: no nullable
  field may enter the `persistence` key it proposes, for exactly this reason. The rule is now
  stated once rather than re-derived per key.
- **Contract-and-seam work.** Two edits: the throw at `emit-config.mjs:79`, and a decision on
  whether `bridge/schema.mjs` should also reject a null at validation, one stage earlier. I ask
  for the first and route the second.
- **Rarity, discovery and traversal work.** One documentary field each. Setting it costs nothing
  and deleting it is equally correct; leaving a null is not.

## Acceptance criteria

1. `grep -n "= nil" game/src/shared/GameConfig.luau` returns nothing.
2. `grep -n '= "nil"' game/src/shared/GameConfig.luau` returns nothing — the fix is a sentinel,
   never the string `"nil"`.
3. `npm run bridge -- --emit` against a manifest containing `null` anywhere inside a key's value
   exits non-zero, prints the JSON path of the offending field, and does not write
   `game/src/shared/GameConfig.luau`.
4. Every one of the eight rows marked **semantic** above carries a non-null value in the sheet
   that owns it, and `GameConfig.Products.items[1].gamePassId` is a number.

## Not decided here

The **values** replacing the sixteen nulls: each belongs to the sheet named in its row and this
sheet edits none of them. Whether a documentary field is set to a sentinel or deleted outright —
either satisfies the rule, and its owner chooses. Whether `bridge/schema.mjs` rejects nulls at
validation as well as at emit — contract-and-seam work. What `forbidden`, `forbiddenApis` and
`invariants` mean and whether a fourth name joins them — also contract-and-seam work; I cite the
three as precedent and add none. When a value may be written into a sheet at all, and in what
order relative to a publish — sheet `01`, this domain, which holds `release` and whose
`provisioning` gate depends on the `0` decided here.
