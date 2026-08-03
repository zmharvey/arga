# 02 — No explicit null in an emitted config

**Domain:** tech/deploy · **Category:** Tech & Data · **Wave:** 5

## Decision

**An emitted value may never be an explicit null.** `bridge/schema.mjs` rejects a `null` anywhere
inside a merged value at validation time, naming the JSON path, rather than letting
`emit-config.mjs` write `nil`. Absence is written as a declared sentinel of the field's own type:
`false` for a boolean, `[]` for a list, `0` for an unprovisioned platform id, and the string
`"none"` for any scalar unless the containing table declares a more specific sentinel in place.

**This sheet carries no manifest block, and in this one case that is the strongest possible
outcome: the rule is executable.** `bridge/schema.mjs` rejects a `null` anywhere inside a merged
value at validation time, naming the JSON path, and `npm run bridge` runs it on every merge — so
this decision reaches the build as code rather than as a value a builder reads. The sentinel table
it defines (`false`, `[]`, `0`, `"none"`) is cited by field across four categories. **`release`**
(sheet `01`) is the key this domain owns.

## Why

**Verified, not inferred.** `bridge/emit-config.mjs:79` returns the literal `nil` for both `null`
and `undefined`, and Luau drops a nil-valued field from a table constructor — so **an explicit
null and a never-emitted key are the same bytes at runtime**
`[research: bridge/emit-config.mjs]`. Sixteen fields in the shipped `GameConfig.luau` were in that
state `[research: game/src/shared/GameConfig.luau]`. It follows necessarily that an emitted config
cannot carry an explicit null: not "should not" — cannot. What the sheets write instead is the
only decision left.

**The rule is safe because it only ever rewrites a field that already carries a null, and never
adds one.** That is the whole of why an absence-test is legitimate here where a null-test would
not be: every substitution below preserves what the field asserted, and none introduces a value
the sheet had not decided. A sentinel that changes the assertion is the one failure mode, and it
is handled by restructuring instead — see the two `"unbounded"` rows and the one filled number.

**Validation is the right place and emit is the wrong one.** At emit the key is already merged and
the sheet that wrote it is out of context; at validation the path names the field, so the owner
sees `economy.balanceCap` rather than a line number in a generated file. Erroring rather than
substituting keeps the fix where the defect is: a sheet shipped a field it had not decided.

**The emitter already does absence properly, which is why the null was wrong.**
`DOCUMENTATION_ONLY` drops `forbidden`, `forbiddenApis` and `invariants` **by name**, with a
comment and an instruction that a fourth be added deliberately
`[research: bridge/emit-config.mjs]`. That is a reviewed act. A null is the same act performed
silently on a field nobody chose to drop.

**`"none"` is not invented here.** `unlock = "none"` sat one line above `maxRadiusProduct = nil`
at `GameConfig.luau:196–197`, and `authoredCue` and `lossOnRespawn` use it in `Traversal`
`[research: game/src/shared/GameConfig.luau]`. It was already the artifact's majority convention
for "there is not one of these"; the sixteen were the minority that said it as a hole.

**`"none"` is wrong on an upper-bound field, and two sites got `"unbounded"` instead.** On
`setBonus.axisHeadroom.value.availableToSets` and `traversal.fall.maxSurvivableFallStuds`,
absence means *no ceiling exists*, so `"none"` would assert **zero headroom** and **zero survivable
fall** — in both cases the exact opposite of the decision. Those two declare `"unbounded"` in
place, which the sentinel rule permits and which the containing table now documents. A wrong
sentinel reads as decided and is worse than the null it replaced.

**One site was restructured rather than sentinelled.** `depths.areas[0].maxRadiusProduct` had no
correct sentinel in either direction: row 1 *does* have a radius-product threshold, about **2.18**,
and simply no shipped product reaches it. `"none"` would forbid every product and `"unbounded"`
would permit any. The figure was already derived twice in that sheet's own prose, so the field was
filled with it — which also makes `depths.invariants[11]` evaluable on all eight rows instead of
seven. Balance's separate request to delete the field entirely is untouched.

**A type change on four numeric fields is the accepted cost.** Where a number becomes a string a
reader doing arithmetic gets a loud type error instead of a silent nil-skip, guarded by one
`type(v) == "number"` test. The silent skip is the divergence this rule exists to stop: to a loop
reading `nil`, a bound that is missing and a bound that is infinite are the same row.

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
`products`, so the fix landed in `gameplay/monetization/01` — and had it truly been under
`invariants`, `DOCUMENTATION_ONLY` would have stripped the block and there would be no emitted
site at all, which is the sharpest available illustration of why the two kinds of absence must
not be confused.

| line | manifest path | class | applied | owning sheet | what a reader got wrong |
|---|---|---|---|---|---|
| 197 | `depths.areas[0].maxRadiusProduct` | **semantic** | **`2.18` — restructured, not sentinelled** | `gameplay/meta/04` | rows 2–8 carry numeric bounds; a per-ordinal `H1` checker saw row 1 with none and could not tell "unbounded" from "not yet derived". Neither sentinel was correct, so the sheet's own derived figure was supplied |
| 375 | `discovery.sellableLuck` | documentary | `"none"` | `gameplay/systems/05` | nothing: sibling `luckShaped = false` carries it as a boolean |
| 383 | `economy.balanceCap` | **semantic** | `"none"` | `gameplay/systems/04` | "income continues and is neither capped nor hidden" was the sheet's ruling and was unreadable at runtime. `0` was rejected: it asserts a cap of zero |
| 439 | `economy.atMaxLadder.convertsTo` | documentary | `"none"` | `gameplay/systems/04` | nothing: sibling `newSinkAppears = false` carries it |
| 550 | `firstSession.beats[0].teaches` | **semantic** | `[]` | `gameplay/onboarding/02` | list-typed: `ipairs(nil)` errors, so the two readings are a crash and an empty loop, and two builders would differ on the guard |
| 597 | `firstSession.beats[4].teaches` | **semantic** | `[]` | `gameplay/onboarding/02` | same |
| 706 | `firstSession.withheld[0].liftedBy` | documentary | `"none"` | `gameplay/onboarding/02` | nothing: `presentAtJoin = true` and `latched = false` carry it |
| 721 | `firstSession.withheld[2].liftedBy` | documentary | `"none"` | `gameplay/onboarding/02` | same |
| 737 | `firstSession.withheld[4].liftedBy` | documentary | `"none"` | `gameplay/onboarding/02` | same |
| 1000 | `modifiers.axes[0].ceilingRule` | **semantic** | `"none"` | `gameplay/systems/06` | a clamp built by iterating the three axes found rules on two and nothing on the third; the sibling that explains it is prose |
| 1239 | `products.prompt.method` | documentary | `"none"` | `gameplay/monetization/01` | nothing: sibling `promptGamePassPurchaseCalls = 0` carries it |
| 1253 | `products.items[0].gamePassId` | **semantic** | **`0`, a number** | `gameplay/monetization/01` | the sharpest one: an absent id reached `UserOwnsGamePassAsync` as `nil` and errored. `0` is a legal number no pass can hold, and one `> 0` test resolves the product to not-owned |
| 1286 | `products.headroom.H1_axisCeiling.ceilings.value` | **semantic** | `"none"` | `gameplay/monetization/01` (the block `monetization/03` wrote) | a builder iterating `ceilings` saw two axes and could not tell "the value axis has no ceiling" from "the value axis is missing" |
| 1354 | `rarity.findRarityField` | documentary | `"none"` | `gameplay/systems/03` | nothing: `rolled = false` and `perObjectVisualGrade = false` carry it |
| 1552 | `setBonus.axisHeadroom.value.availableToSets` | **semantic** | **`"unbounded"`, not `"none"`** | `gameplay/meta/03` | a headroom check iterating three axes got numbers for `radius` and `speed` and a hole for `value`. `"none"` would have asserted zero headroom, the opposite of the truth |
| 1696 | `traversal.fall.maxSurvivableFallStuds` | documentary | **`"unbounded"`, not `"none"`** | `gameplay/mechanics/06` | the siblings `damage = false` and `voidBelowPlayArea = false` recover the fact, but `"none"` would have asserted a zero-stud survivable fall |

| sentinel | for | example |
|---|---|---|
| `false` | an absent boolean | any flag that is off rather than unstated |
| `[]` | an absent list | `firstSession.beats[].teaches` |
| `0` | an unprovisioned **numeric** platform id | `products.items[0].gamePassId` |
| `""` | an unprovisioned **string** id, e.g. a `ContentId` | Audio's six sound keys, declared in place |
| `"none"` | any other absent scalar | `economy.balanceCap`, `modifiers.axes[0].ceilingRule` |
| `"unbounded"` | an absent **upper bound**, where `"none"` would assert zero | `setBonus.axisHeadroom.value.availableToSets`, `traversal.fall.maxSurvivableFallStuds` |
| a sentinel the table declares | anything else, documented at the site | `release.version.ledger[].placeVersion` `"unpublished"` |

**`0` and `""` are the same rule applied to two types and must not be read onto each other.** A
game-pass id is a number, so its unprovisioned value is `0`; a `ContentId` is a string, so its
unprovisioned value is `""`. `0` in a `ContentId` field and `""` in a pass-id field are both type
errors, and each key states which it is at the site.

**No manifest block.** This is a prohibition on how any key is serialised, not a value: it shapes
`release` — whose `provisioning.unprovisionedIdValue` of `0` and whose `version.ledger` sentinel
`"unpublished"` exist because of it — and equally all 25 merged keys and every proposal behind
them. The key it would need is `release`, and sheet `01` carries that.

## Consequences for other work

- **All sixteen sites are closed in their owning sheets**, by the rule above and not by a second
  decision. Eight semantic, eight documentary; one restructured, two given a more specific
  sentinel, thirteen given the house one.
- **Save-write work (Persistence, same wave).** Its index already anticipates this: no nullable
  field may enter the `persistence` key it proposes. The rule is now enforced at validation, so a
  null in a promoted key is a merge failure rather than a note.
- **Every domain still holding a proposed key.** The check walks merged values only, so a null in
  an unpromoted proposal is invisible today and fails the moment the key is promoted. Live cases
  found while applying this: `axisBudget` (`gameplay/balance/04`, `value.availableToSets` plus
  three sibling fields on the same row), and null-carrying proposals in Analytics, Art, UI/UX and
  `tech/networking`. **Fix them before promotion, not after.**
- **Contract-and-seam work.** The check now lives in `validateManifest`. The remaining open
  question is whether `emit-config.mjs:79` should also throw as a second line of defence, or stay
  permissive now that nothing can reach it with a null.
- **Object and Find art work (Art — Objects).** Five sheets cite `rarity.findRarityField` as
  *"is `null`"*. The fact is unchanged — a Find has no rarity field — but the wording is stale by
  one word; it is `"none"`. A wording fix in those sheets, not a design change.
- **HUD and onboarding readers.** `firstSession.withheld[].liftedBy` is now always a string, so a
  truthiness test reads all six surfaces as lifted. Test against `"none"`.

## Acceptance criteria

1. `npm run bridge` reports zero problems of the form `<path> is null`, and
   `grep -n "= nil" game/src/shared/GameConfig.luau` returns nothing after a re-emit.
2. `grep -n '= "nil"' game/src/shared/GameConfig.luau` returns nothing — the fix is a sentinel,
   never the string `"nil"`.
3. Adding `"x": null` to any merged key's manifest value makes `npm run bridge` exit non-zero and
   print the JSON path of that field.
4. All eight rows marked **semantic** carry a non-null value in the sheet that owns them;
   `products.items[0].gamePassId` is a number; and no field whose absence means "no upper bound"
   carries `"none"`.

## Not decided here

The **values** replacing the sixteen nulls belonged to the sheets named in each row and were
applied there, not decided here. Whether a documentary field is set to a sentinel or deleted
outright — either satisfies the rule, and its owner chooses. Whether `emit-config.mjs` throws as
well as `validateManifest` — contract-and-seam work. What `forbidden`, `forbiddenApis` and
`invariants` mean and whether a fourth name joins them — also contract-and-seam work; I cite the
three as precedent and add none. Whether `depths.areas[].maxRadiusProduct` survives at all —
Balance's `04-axis-budget` asks for its deletion, and filling row 1 does not prejudge that. When a
value may be written into a sheet at all, and in what order relative to a publish — sheet `01`,
this domain, which holds `release` and whose `provisioning` gate depends on the `0` decided here.
