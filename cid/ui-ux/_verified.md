# UI/UX — verification

**Status: FAIL**
Wave 5's UI/UX category does not release. Six domains wrote six keys in parallel, none could read
another, and four of them state requirements against `composition` that `composition` does not
carry — two of which are not jointly satisfiable as written. Thirteen revision requests, all
one-file, all closable in one round. The four `ui-forge` capability claims are **all confirmed
against the source**; the sheets did not overstate them.

---

## Check results

| # | check | result | evidence |
|---|---|---|---|
| 1 | every screen referenced by any other category exists in the screen inventory | **PASS** | `screens/01` inventories `index` present, `areas` + `upgrades` absent with citations, `shop` forbidden. Grepped `cid/**` for `collection-index`, `collection panel`, `index panel`, `loading screen`, `end screen`, `settings screen`, `shop screen`: every hit outside `ui-ux/` is either `onboarding/04`'s `collectionPanel` (= `index`), `analytics/engagement/03`'s reference to the same, or a surface named in order to be forbidden. The one live candidate not in the inventory is G2's error surface, and `feedback/03` rules it a notice rather than a screen while `navigation/01.addNodeRule` states what it must satisfy if it ever becomes one. No orphan. |
| 2 | every screen has an entry point in the screen graph and a way back | **FAIL** | Entry point is agreed (`Pressable_INDEX`). The **way back is specified twice, oppositely**. `navigation/01:146-147` sets `separateCloseControlExists: true`, `separateCloseControlOwnedBy: "screens"`; `navigation/03:113-122` makes it a real node with `SelectionOrder` 0 that holds gamepad focus on open, and its close-path table lists it first on all three device classes. `screens/01:77-80` rules **"No close control"**, `hasCloseControl: false` (`:148`), `CloseButton` and `backArrow` in `forbiddenNodes` (`:180`), and acceptance criterion 1 requires **0 nodes named `CloseButton`**. Both are proposed contract keys. A builder cannot satisfy both. Worse, the disagreement is substantive rather than clerical: `screens` is right that a drawn close control is a fifth game-drawn pressable against `input.gameDrawnPressables: 4`, and `navigation` is right that Roblox's mobile input surface has no back input at all (`creator-docs input/mobile.md`, banked). Nobody pushed back on `input`. |
| 3 | every purchasable in Monetization has a store surface | **FAIL — check is wrong** | See the ruling below. `store/01` is the correct output; the check is not. |
| 4 | every value the HUD displays has a source in Systems or Balance & Tuning | **PASS** | All 13 elements in `composition.elements` carry a `source`. Traced each against the eight-field snapshot (`analytics/_category.md:90`, `architect/05:169` `snapshotShape()`): `snapshot.found`, `.currency`, `.areaLabel`, `.clearedCount`, `.areaPatchCount`, `.upgrades[]`, `.areasFinished`, `.rowsRevealed` all exist. `config.collection.classPlural`, `config.currency.plural`, `config.upgrades[i].label` are `collection`/`currency`/`upgrades` values. `derived:upgradeCost(u, level)` is `upgrades` + `solvency` (`gameplay/balance/03`, wave 4 verified). No displayed value is sourceless. *(Amended in round 3 — see the correction there. This pass was granted on incomplete tracing.)* |
| 5 | every screen states its empty, loading and error states | **PASS** | `screens/02` enumerates six (`S1`–`S5` plus `S3b`), assigns each a render, a string (`null` in every case) and a catch. Two are marked `reachable: false` **with the derivation that makes them unreachable** rather than skipped, which is the compliant form. `S4`'s "written once, never unwritten" is the one a default implementation gets wrong and it is stated as a rule with a countable check. |
| 6 | no screen requires a pattern the Build Capability Registry does not list | **PARTIAL** | On the letter: both sheets name only registered patterns (`modal-grid`, `hud-overlay` — `ui-forge/src/compose/index.mjs`), so no unlisted pattern is required. **All four `modal-grid` counts in `screens/01` are confirmed** (`modal-grid.mjs:322` clamps `columns` to 1–4 and `:327` chunks one flat list; `:459` `slots: ['panelTop','panelBottom']`; `:475-487` requires `title`, `name`, `price`, `art`; `:400-407` root is an unconditional full-viewport `Backdrop` at transparency 0.45). `screens` passes because it declares `producibleBy: null`, `refusedBy: "modal-grid"` and names the shipped interim: `index-screen` builds it by hand, which is what runs today. **`composition` fails**: `hud/03` rules its own realisation not producible on either route, and `hud/01.rules.oneNodePerGroup.adjacentSiblingRealisationForbidden: true` forbids the only shape available today, while `hud/03.retires` deletes `Pressables.luau`'s `Instance.new`. Between them there is no legal way to build the HUD until six unowned `ui-forge` edits land. See RR-11. |
| 7 | on-screen copy uses only Vocabulary terms | **PARTIAL** | Every string authored this wave passes: `Lv`, `Ready`, `Short`, `Max`, `Clear`, `Parts` (all ≤ 14, Title Case, inside `^[A-Za-z0-9 ,.'%%/-]+$`, none of the eight banned words); `Set Complete` (12), `Area Complete` (13). Two prose strings correctly identify that they need a `PROSE_PATHS` entry in `bridge/schema.mjs:713` (which is `[/\.blurb$/, /\.flavour$/]` today) — verified, the exemption is real and the request is right. The live `hud.brief.json` violation is real and I counted it independently: **six** vocabulary failures (`FINDS`, `SHARDS`, `VALUE`, `REACH`, `PACE` against `casing: "title"`; `"EAST TERRACE - 0% CLEAR"` at 23 chars against `maxLabelChars: 14`). HUD reports 7 because its seventh row is `content.readouts[*].value`, which is a structural finding, not a vocabulary one — an overcount of one, not worth a request. **The fail is ownership, not compliance**: two sheets wrote two different strings for one event. See RR-10. |

---

## Ruling on check 3, which is wrong for this game

**The check should be narrowed to: *every purchasable in Monetization has a named offer path, and
every in-game surface that could carry one is enumerated with the ruling that closes it.***

The check as written assumes a purchasable implies an in-game surface. Ruling R-4 removed the
in-game store and `products.F19` forbids a product being *"named, shown, priced or referred to
anywhere inside the game"*. Under the check as written, the only compliant output is a violation
of an approved key. That inverts the provenance ladder: a verification invariant written before
any output existed would beat a coordinator ruling and a merged key.

`store/01` satisfies the narrowed check and then some. It enumerates **eighteen** surfaces, each
with the ruling that closes it and a per-row observable (a grep, an instance count, a require-graph
check), rather than one unfalsifiable blanket rule. It states the offer path (`the Roblox
experience page's own game-pass listing`), answers the surfaceless-trigger question the brief never
asked (`promptGamePassPurchaseCalls: 0`), and records `04-PRESENTATION.md`'s `shop` row as
`status: "deleted", deferred: false` so a later reader cannot read priority-2 deferral into it.
`playerFacingStrings.count: 0` is stated as a field rather than shown by omission.

I verified its one live finding independently: `game/src/shared/Screens/` holds **eight** `.luau`
files, `init.client.luau` requires one (`hud`), and `shop.luau`, `shop-v2.luau`,
`shop-galaxy.luau` and `crates.luau` are ui-forge demo storefronts replicating into every client.
Correct, correctly classified as bar (b) not bar (a), and correctly routed as an artifact change.

**A domain concluding "nothing" produced more checkable data than most domains that concluded
"something".** The check is what fails here, not the sheet.

---

## The four `ui-forge` capability claims — all four confirmed, read from source

| claim | verdict | what I read |
|---|---|---|
| `hud-overlay` emits `Cluster_bottomRight` twice | **confirmed** | `hud-overlay.mjs:288` `children = [...byCluster].map(([key, kids]) => cluster(key, kids, 'vertical'))`, then `:289-291` `if (actions.length) children.push(cluster('bottomRight', ...))`. Two siblings, same `name`. `HudBinding.luau:101` binds `CLUSTER_BOTTOM_RIGHT = "Cluster_bottomRight"` and resolves by `FindFirstChild`; `Pressables.luau:182` calls `gui:FindFirstChild("Cluster_bottomRight", true)`. Neither has a tiebreak. Latent because `hud.brief.json` has no `actions` — and all three upgrade readouts in it already carry `cluster: "bottomRight"`, so adding `actions` produces the collision immediately. **It bites on the fix.** |
| `modal-grid` cannot produce the collection index, on four counts | **confirmed, all four** | Line refs above under check 6. One addition the sheet did not count: `modalGrid()` also emits the rows inside an unconditional `ScrollingFrame` named `Grid` (`:354-368`), which `screens/01` forbids by name and tests for in its criterion 1. A fifth count, not a defect in the ruling. |
| `MinSize` is never written; `maxSize` in scale resolves to `math.huge` | **confirmed** | Grepped `ui-forge/src` for `MinSize|UITextSizeConstraint|TextScaled|TextTruncate|minSize`: **zero matches anywhere**. `UIBuilder.luau:224-237` reads only `node.maxSize` and writes `MaxSize`; `:232` is `node.maxSize[2]`, and `to-luau.mjs:54-57` serialises `[s.x, o.x, s.y, o.y]`, so index 2 is the **X offset**. `hud-overlay.mjs:243` sets `maxSize: { s: [0.46, null], o: [null, null] }` — offset null → 0 → `math.huge`. **`HUD_CLUSTER_MAX_WIDTH_SCALE = 0.46` has never applied on Roblox.** `hud/03`'s `F2` is right and it is the more interesting half of the playtest defect. |
| `actionButton()` hard-sizes 52×52 / 56×56 against a 70/120 floor | **confirmed** | `hud-overlay.mjs:178-198`, `size: {o: [52,52]}` at `:182`, `at.mobile` `56×56` at `:183`. No `tablet` entry, and `UIBuilder.luau:20-24` `BREAKPOINTS` has a `tablet` class, so a tablet takes the base 52 against a 120 floor. Jump-button geometry banked at `pack.md:361` (`TouchJump.lua`): `isSmallScreen = minAxis <= 500`, `jumpButtonSize = isSmallScreen and 70 or 120`. 52 < 70 and 52 < 120. |

**Platform's "none of this blocks the purchase path today" — confirmed.** `Pressables.luau:413-433`
creates its own `TextButton`s and sets `constraint.MinSize` itself at `:433`, so it never touches
`actionButton()`. The shipped floor is `math.max(BUTTON_HEIGHT_PX, minTouchPx)` = `max(64, 96)` =
**96** (`:502`, `:116`, `:121`): above the phone floor of 70 and **below the tablet floor of 120**.
Both halves of Platform's failure 1 are correct, and the arithmetic in failure 2 checks —
`414 − (90 + 24 + 2×108 + 96) = −12`. The topmost purchase button is off the top of a phone.

**Navigation's bar-(a) defect — confirmed.** `IndexScreen.luau:581-585`: `frame.Active = true` with
the comment *"It covers neither the top-left nor the bottom-right cluster"*. `PANEL_WIDTH_SCALE` is
`0.9` (`:128`) at `anchor = {0.5, 0.5}`, `pos = {0.5, 0, 0.5, 0}` (`:402-404`), so x ∈ [0.05, 0.95]
and it covers both horizontally. **And the shipped z-order really is inverted**: `SURFACE_Z_INDEX =
10` (`:134`) with the comment at `:131` stating in terms that the four pressables *"are left at the
default ZIndex of 1"*. Navigation fixing this by z-order rather than geometry is the right call —
it does not depend on the `[unverified]` touch-tap-sinking fact, and it needs nobody's cooperation.

**The `firstSession` S2/S12 ruling — mechanism confirmed.** `HudBinding.luau:307` `collectFade`
exists and does what `hud/02` says: it collects per-instance writers that drive every transparency
to 1 and restore them, described at `:88-89` and `:304-306` as *"no placeholder, no padlock and no
outline, and the lift is one frame with no tween"*. `Pressables.luau` writes `.Visible` at `:471`,
`:485` and `:588` — `hud/02` names 471 and 588 and misses 485 (the index button), which under its
own ruling is a third line to change. The `UIListLayout` collapse behaviour is banked twice
(`pack.md:668`, `:2496680`) and `hud/02` correctly declines to rest on it: *"reserve explicitly
rather than depend on the engine reserving for you."* **The ruling is sound and the sheet is
honest about its `[unverified]`.**

**F3 — confirmed, and it is the most dangerous finding in the wave.** `HudBinding.luau:404-406`
`string.format("Readout_%s", string.upper(label))`. `hud-overlay.mjs:76`
``name: `Readout_${(r.label ?? r.value).replace(/[^A-Za-z0-9]/g, '')}` `` — no case transform. It
resolves today only because `hud.brief.json:15-19` ships `FINDS`/`SHARDS`/`VALUE`/`REACH`/`PACE`
uppercase. The moment `casing: "title"` is honoured — which `vocabulary` already requires and which
`screens/03` `R1` and `hud/01` both now mandate — the pattern emits `Readout_Shards`, `HudBinding`
looks for `Readout_SHARDS`, and **every readout silently stops updating.** Fixing the vocabulary
violation triggers it. `HudBinding.luau:667` has a second `string.upper` in the bar label, which
`screens/03`'s criterion-1 grep also catches.

**H6's withdrawal is correct.** `vocabulary.allowedPattern` is `^[A-Za-z0-9 ,.'%%/-]+$`
(`theme/vocabulary/02:54`). Inside a character class, JavaScript's `RegExp` reads `%%` as a
redundant repeat of a literal `%`; Lua's `string.match` reads `%%` as an escaped literal `%`. Both
admit `%`. `theme/vocabulary/02:78-88` already records this as `[cid: decided]` on 2026-08-01.
**HUD was right to withdraw its own bill and right to route the stale `HudBinding.luau:142-149`
comment as a build-report correction instead.** This is the wave's best example of a domain
checking a claim before designing around it.

---

## The finding this wave exists to settle: does `composition` prevent the reported defect?

**As a key, yes. As shipped, not yet — and one of its two halves is contradicted by another sheet
in the same category.**

`composition` closes the defect *as a specification*. `oneNodePerGroup` +
`adjacentSiblingRealisationForbidden` + `memberPositionIsDerived` + the uniqueness invariant on
`groups[].node` make "one row with a button on it" the only expressible answer. `count(groups where
interactive) equals input.gameDrawnPressables` makes a sixth box a build failure rather than a
playtest report. The collection half is closed by deletion — fusing the count into
`Pressable_INDEX` deletes the second box the developer saw, and I confirmed the cause:
`Pressables.luau:480` writes `GameConfig.FindNoun.plural` onto the index button while
`hud.brief.json:15` puts a `FINDS` readout in the same `topLeft` cluster. Two boxes, both reading
*Finds*, exactly as reported.

Two things stop it landing:

1. **There is no legal realisation today** (check 6, RR-11). `hud-overlay` cannot emit an
   interactive readout, `hud/01` forbids the two-adjacent-nodes shape, and `hud/03` retires
   `Pressables.luau`'s `Instance.new`. The defect stays open until six `ui-forge` edits land, and
   `ui-forge` pattern work has no owner in the build order.
2. **The fusion is contradicted.** `navigation/01` requires `Pressable_INDEX` absent before the
   first reveal (RR-1). Under fusion that node *is* the collection count, which `firstSession`
   requires present at join. One of them has to move, and until it does the top-left corner has
   two specifications.

---

## Three domains, one composition: are the four requirement sets jointly satisfiable?

**No, and `composition` carries none of them.** All four were written in the same wave by writers
who could not read each other, which is the intended failure mode of a parallel wave and is
precisely what this pass is for.

| requirement, and who states it | is it in `composition`? | satisfiable? |
|---|---|---|
| `noticeStack`, 2 slots, 3 keepouts, 3 may-overlaps (`feedback/01:143-161`) | **no.** `composition.slots.hudTop.availableTo: ["notices"]` is the nearest thing and it is not an anchor group | **no, as written.** Feedback's may-overlap list is *"the collection count readout, the currency readout, the three upgrade readouts"* and its may-not-intersect list is *"any of the four game-drawn pressables"*. **Under fusion those are the same rectangles.** The collection count *is* `Pressable_INDEX`; the three upgrade readouts *are* `Pressable_BUY1/2/3`. The only surface left in the may-overlap list is the currency readout, and Feedback's stated fallback — *"releasing the upgrade-readout overlap, never the pressable one"* — is void, because they are one release. |
| pressable `ZIndex` 20, notice 30, cluster rects disjoint from `IndexSurface` (`navigation/02:108-118`) | **no.** `composition` carries no `ZIndex` field at all | partly. The z-order is trivially satisfiable and correct. Disjointness is contradicted by `screens/01`, which permits the intersection (RR-4). |
| focus order at 4 and 5 members; **one common parent node** for the four pressables (`platform/01:187-197`, `navigation/03:220-222`) | **no.** No group-parent node exists | **no.** The four interactive groups sit in two different clusters (`topLeft` × 1, `bottomRight` × 3). Under `hud-overlay` the clusters are siblings of `Root`, so the only common parent is `Root`, which also contains every readout and the notice slot. Platform's `selectionGroupSetOn: "theOneGroupParentNode"` names a node the pattern cannot emit. Platform's `selectionOrderRule` also reads `composition.groupIndex`, which does not exist — `composition` has `orderInCluster`, scoped per cluster. |
| `variant.anchor` (`hud/01:91` `"inset"` vs `platform/01:179-180` `edge`, `patternInsetVariantForbidden: true`) | contradicted | one must yield. Platform is right on the merits (`ScreenInsets = CoreUISafeInsets` + `ANCHOR_INSET` double-counts) and HUD's own sheet says it owns no pixel. |

The pattern is consistent and worth naming: **every domain correctly stated its requirement as
data addressed to `composition`, exactly as the category lead instructed, and `composition` was
written in the same wave and could not receive any of them.** That is a sequencing defect in the
wave, not a writing defect in the sheets. It is closed by one revision round in which
`hud/01` folds the four requirement sets in and refuses out loud whichever cannot be met.

---

## Universal invariants

- **No sheet contradicts a `[brief: binding]` item.** Checked each of the five binding items against
  all 17 sheets. The mobile-heavy 8–14 band is honoured (and is the argument in `screens/03`'s text
  floor and `platform/01`'s touch floor); *"smallest game"* is honoured — three domains deleted
  subjects rather than staffing them, with reasons; *"distinction lives in the hidden-collection
  layer"* is honoured; the humor-in-flavour-text decision is closed by `screens/04` rather than left
  vacuous; shape-not-hue reaches UI as `affordabilityByColourAlone: false` and `colourIsSecondaryOnly`.
- **2 to 4 acceptance criteria per leaf sheet.** All 17 comply: sixteen have 4, `platform/02` has 3.
  Spot-checked ten for disagreement-resistance; all are a count, a grep, a property value or a
  pixel comparison. `feedback/01`'s criterion 4 ("`forbidden[]` has 24 rows") is exact — I counted 24.
  `hud/01`'s criterion 1 (6 groups, 13 elements) is exact. `hud/01`'s criterion 4 is **wrong** and is
  RR-12.
- **No sheet specs `03-META.md` priority-3 content.** Every domain names the priority-3 list in order
  to forbid it, which the category gate treats as information: `navigation/01.notNodes.priority3Surfaces`,
  `feedback/01.forbidden` rows `dailyRewardPopup`/`timedOfferRibbon`/`offlineEarningsSummary`,
  `screens/01`'s absent table. No sheet reserves a slot, tab or region for one.
- **No sheet names a capability absent from the Build Capability Registry.** Both patterns named are
  registered. Both sheets that need a capability the compiler lacks say so with file, function, line
  and a named smallest change, which is the compliant form. `composition`'s missing interim is
  RR-11, not an invariant breach.
- **Every `[research: url]` corresponds to a real fetched source.** Sampled 16 URLs across all six
  domains against `cid/_research/pack.md` — `TouchJump.lua`, `DynamicThumbstick.lua`,
  `gestalt-proximity`, `glanceable-fonts`, `pause-stop-hide`, `NotificationScript2.lua`,
  `size-modifiers`, `kitsblox`, `uilistlayout-.../45323`, `bypassing-uilistlayout/2496680`,
  `roblox-menu-...b-button/639726`, `input/mobile.md`, `accessibility.md`, `ScreenInsets`,
  `SafeAreaCompatibility`, `paid-random-items`. **All 16 present.** No fabricated URL found. The
  domains that had no `must_verify` fetched anyway and banked it, which is why their writers could
  cite anything at all.
- **Every `[cid: decided]` is flagged upward.** Five sheets carry an explicit *"Flagged to the
  developer"* section with live alternatives and a recommendation (`hud/01` fusion, `screens/02`
  save-failure copy, `screens/04` `RR-1`, `navigation/01` entry point, `navigation/03` accelerator,
  `platform/01` orientation). None is buried. `store/02` records the second cost of R-4 as a cost
  rather than reopening the ruling, which is the correct direction.

---

## Revision requests

### RR-1 · `cid/ui-ux/navigation/01-the-screen-graph.md` — the entry control cannot be absent, because it is the collection count

**Violates:** check 2; `firstSession` (collection count present at join, `joinValue` 0).
**Current:** `entryControl.presenceRule` = *"drawn only once nodes[index].presence has lifted;
before the lift no instance named `Pressable_INDEX` is visible in the PlayerGui"*, and acceptance
criterion 2 tests exactly that.
**Required:** re-rule against `composition.groups[collection]`, which fuses the collection count
into `Pressable_INDEX`. Under fusion, hiding the control hides a readout `firstSession` requires
present at join with value `0`. `hud/02.presence.byGroup[collection]` already offers the answer —
present from join as a readout, `Active: false`, `Selectable: false`, `interactiveFrom` the first
snapshot with a Find — which satisfies `onboarding/04`'s *"absent together"* in the sense that
matters (there is nothing to press and no way to press it) without deleting a required readout.
Withdraw the revision request against `representation` at `:253`, or re-issue it as "created
non-interactive" rather than "created with `Visible = false`".
**Why:** the two sheets were written in parallel and the fusion post-dates the absence ruling. As
written, the top-left corner has two incompatible specifications and a builder must pick one.

### RR-2 · `cid/ui-ux/navigation/01-the-screen-graph.md` — criterion 2 mandates the one write `hud/02` forbids

**Violates:** `composition.presence.visibleIsForbidden`.
**Current:** criterion 2 accepts *"absent or has `Visible == false`"* for `Pressable_INDEX`.
**Required:** drop the `Visible == false` branch. `hud/02` rules that **no module may write
`Visible` on a node named in `composition.groups[].node`**, and `Pressable_INDEX` is
`groups[collection].node`. `Visible = false` collapses the child out of the `UIListLayout` flow,
which is `reflowOnLift` — the thing `firstSession.suppressionForbidden` bans and `hud/02` was
written to prevent.
**Why:** two sheets in one category specify opposite mechanisms for one property on one node.

### RR-3 · `cid/ui-ux/navigation/03-close-and-focus-by-device.md` — the close control is a fifth game-drawn pressable and no sheet says so

**Violates:** `input.gameDrawnPressables: 4` (`gameplay/mechanics/02`, approved).
**Current:** the close control is required on all three device classes and `closeControl` is a full
sub-object, with no `## Pushing back` section and no mention of the pressable count.
**Required:** add a `## Pushing back` section against `cid/gameplay/mechanics/02-verb-roster.md`
naming `gameDrawnPressables: 4`, quoting its provenance, and stating the containment as a manifest
value — e.g. `navigation.closeControl.countsTowardGameDrawnPressables: true` with a proposed count
of 5, **or** an explicit argument that a control drawn inside an opened surface is outside that
count. `screens/01` refused the node on exactly this ground and it is a real ground; your
counter-evidence (`input/mobile.md`: the Android hardware back button appears nowhere, so on ~70%
of the audience there is no platform back input) is strong and belongs in a pushback section where
`input`'s owner can rule on it.
**Why:** this is the only route by which two approved keys get reconciled instead of one silently
winning at build time.

### RR-4 · `cid/ui-ux/screens/01-collection-index.md` — the panel forbids the close control `navigation` requires

**Violates:** check 2.
**Current:** `hasCloseControl: false`, `CloseButton` and `backArrow` in `forbiddenNodes`, criterion
1 tests for 0 `CloseButton` nodes.
**Required:** once RR-3 resolves, either add the close control to the tree (`SelectionOrder` 0, no
text, rect disjoint from all four pressables, per `navigation/03.closeControl`) and remove
`CloseButton` from `forbiddenNodes` and criterion 1 — **or** state the refusal as a `## Pushing
back` against `navigation/03` naming the pressable-count ground, so one of the two sheets carries
the resolution rather than both carrying half.
**Why:** the way back into the HUD is currently specified as existing and as forbidden.

### RR-5 · `cid/ui-ux/navigation/02-concurrency-and-suspension.md` — `spatialDisjointnessAlsoRequired` contradicts the panel geometry `screens` decided

**Violates:** internal category coherence; `screens[index].geometry.mayIntersect`.
**Current:** `purchaseWhileOpen.spatialDisjointnessAlsoRequired: true` with
`rule: "the rect of IndexSurface and the rect of each of the four instances in
input.pressable.roles are disjoint"`, plus a revision request against `screens` demanding it.
`screens/01:57-63` decides the opposite deliberately: `mayIntersect: ["Pressable_BUY1",
"Pressable_BUY2", "Pressable_BUY3"]`, `mustNotIntersect: ["Pressable_INDEX"]`, on the ground that
*"a mode the player opened with one press and closes with one press is not travel"*, at
`0.84 × 0.72` bottom-anchored so the top-left cluster stays clear on every viewport.
**Required:** withdraw the disjointness requirement against the three purchase pressables and keep
it against `Pressable_INDEX` only, or state which of the two keys governs. Your own sheet already
concedes the arithmetic is impossible: *"a 0.9 × 0.72 centred panel leaves 5% of width and 14% of
height for four controls and their readouts"* — the same is true at 0.84.
**Why:** z-order is your stated mechanism and it is the right one; the disjointness clause adds a
second, unsatisfiable requirement that a builder will read as binding because it is a `rule` field.

### RR-6 · `cid/ui-ux/feedback/01-the-notice-channel.md` — the notice z-order is stated below the pressables and required above them

**Violates:** `navigation.zOrder.layers`.
**Current:** `interaction.realisation.zIndexBelow: "pressable"`, `zIndexAbove: "hudReadout"`.
`navigation/02:114` puts `notice` at `ZIndex` 30, above `gameDrawnPressables` at 20 and
`indexPanel` at 10, and issues a revision request saying so, because *"a notice below a `ZIndex`
10 panel silently drops `B2` and `B3`"*.
**Required:** set the notice layer to 30, above both. Your reason for going below — not swallowing
a tap — is already carried by `interaction.blocksInput: false` and `Active = false`, which is a
stronger guarantee than z-order and does not cost you `B2`/`B3` behind an open panel.
**Why:** at your value, a set completion fired while the index is open is invisible.

### RR-7 · `cid/ui-ux/feedback/01-the-notice-channel.md` — the `noticeStack` may-overlap list is void under `composition`'s fusion

**Violates:** joint satisfiability with `composition`.
**Current:** `anchorGroup.mayNotIntersect` names *"any of the four game-drawn pressables"*;
`mayOverlap` names *"the collection count readout, the currency readout, the three upgrade
readouts"*.
**Required:** re-derive against `composition.groups`. The collection count is
`groups[collection].node` = `Pressable_INDEX`; the three upgrade readouts are
`groups[upgradeValue|Reach|Pace].node` = `Pressable_BUY1/2/3`. Four of your five may-overlap
surfaces are on your own may-not-intersect list. **The currency readout is the only overlap you
actually have.** Restate the list against group ids rather than element descriptions, and re-state
the fallback you would accept, because *"releasing the upgrade-readout overlap, never the pressable
one"* is now one release rather than two.
**Why:** as written the keepout is either unsatisfiable or trivially satisfiable depending on which
half a builder reads first.

### RR-8 · `cid/ui-ux/hud/01-persistent-surface-composition.md` — `composition` carries none of the three requirement sets addressed to it

**Violates:** the category lead's ruling that *"if Feedback UI needs a notice to sit relative to a
HUD group, it states the requirement and HUD carries it as data"*; check 2 and check 6 downstream.
**Current:** the manifest has no `ZIndex` field, no `noticeStack` anchor group, no group-parent
node and no gamepad focus hook. `slots.hudTop.availableTo: ["notices"]` is the only trace.
**Required:** fold in, or refuse out loud with a reason, all four: (a) `feedback/01`'s `noticeStack`
as a 2-slot anchor group with its keepouts, re-derived per RR-7 and with a stated answer to *"if no
free region satisfies all three keepouts at a phone viewport, refuse it out loud"*; (b)
`navigation/02`'s z-layers — `ZIndex` 20 on every interactive group, 1 on every non-interactive
element; (c) `platform/01`'s `groupParentRequired` — see RR-9; (d) a stable `groupIndex` per group,
since `platform/01.gamepad.selectionOrderRule` reads `composition.groupIndex` and only
`orderInCluster` exists, which is scoped per cluster and repeats across the four.
**Why:** four sheets state requirements as data against your key, exactly as instructed, and the
key has nowhere for any of them to land. This is one edit that closes four open seams.

### RR-9 · `cid/ui-ux/platform/01-device-viewport-rules.md` — the single `SelectionGroup` parent cannot exist under `hud-overlay`

**Violates:** producibility; joint satisfiability with `composition`.
**Current:** `gamepad.groupParentRequired: true`, `selectionGroupSetOn: "theOneGroupParentNode"`,
`selectionGroupSetOnEachButton: false`, and a `## Pushing back` stating that
`Pressables.luau:423`'s per-button `SelectionGroup` is four groups rather than one — which I
confirmed at that line.
**Required:** state what the rule becomes when no common parent exists. `composition` puts the four
interactive groups in **two** clusters (`topLeft` × 1, `bottomRight` × 3), and `hud-overlay` emits
clusters as siblings of `Root` (`hud-overlay.mjs:288`), so the only common ancestor is `Root`,
which also holds every readout and the notice slot. Either name the fallback (explicit
`NextSelectionUp/Down/Left/Right` links across the two clusters, which needs no new node and which
`navigation/03` already relies on via `Selectable` + `SelectionOrder`), or state the required node
as a `ui-forge` change alongside `U1`–`U6`.
**Why:** `mechanics/03` P5's *"one navigable selection group"* is currently unsatisfiable by any
tree the compiler can emit, and your sheet is the one that noticed.

### RR-10 · `cid/ui-ux/screens/02-panel-states.md` — two different save-failure strings exist, at two paths, with two owners

**Violates:** check 7 (copy ownership); category coherence.
**Current:** `screens.systemCopy.saveLoadFailed` = *"Earlier progress did not load. New progress
may not be kept."* (59 chars, sentence case). `feedback/03` writes
`notices.members[saveNotLoaded].text` = *"Saved Progress Did Not Load. New Progress Is Not Kept."*
(53 chars, Title Case) for the same trigger, on the same channel, with the same dwell semantics.
**Required:** delete `screens.systemCopy` and its acceptance criterion 3, and cite
`notices.members[saveNotLoaded]`. Your own domain lead routed the copy to you and Feedback's lead
explicitly reversed that split — *"a load-failure message is not a screen … I take both"* — with
the better argument: it is a transient message drawn over live play, which is entirely Feedback's
subject. Feedback's string is also the safer one: it is Title Case against `vocabulary.casing:
"title"`, and it checks itself line by line against P1–P9.
**Why:** two strings for one event means the build renders whichever key merges last, and the
`PROSE_PATHS` request gets filed twice for two different path prefixes.

### RR-11 · `cid/ui-ux/hud/03-pattern-producibility-and-the-brief-seam.md` — no interim realisation, so the playtest defect stays open indefinitely

**Violates:** check 6; the stopping rule's bar (a) — this is the defect the wave was commissioned to close.
**Current:** `producibility.verdict: "not producible today, as one node or as two adjacent nodes"`,
six required `ui-forge` changes, and an `ifRefused` branch **for the brief seam only**. Nothing
states what `composition` realises as if `U1`–`U6` are refused or deferred, and `hud/01` forbids
the two-adjacent-nodes shape while your own `retires` list deletes `Pressables.luau`'s
`Instance.new`, `layoutButtons` and `measureClusterWidthScale`.
**Required:** add an `ifRefused` branch for `U1`–`U6` naming what ships in the meantime — most
likely `oneNodePerGroup` relaxed to two adjacent siblings under a named group `Frame`, with the
adjacency stated as a checkable field, and `Pressables.luau` keeping `Instance.new` until the
migration lands. `ui-forge` pattern work has no owner in the build order (`architect/06`), so
"refused" is the default outcome rather than an unlikely one.
**Why:** as written, the developer's reported defect is closed by a specification that nothing in
the repo can build, and the next playtest sees six boxes again.

### RR-12 · `cid/ui-ux/hud/01-persistent-surface-composition.md` — acceptance criterion 4 counts readouts wrong

**Violates:** the acceptance-criteria invariant (two people must not be able to disagree).
**Current:** *"`ui-forge/briefs/hud.brief.json` regenerated from `composition` has 6
`content.readouts` entries."*
**Required:** **5**. `composition` has six groups, but `areaProgress` is emitted through
`content.progress`, not `content.readouts` (`hud-overlay.mjs:275-287`; `hud.brief.json:21`). The
five readouts are `collection`, `currency` and the three upgrade groups — which is exactly what
ships today (`hud.brief.json:14-20`).
**Why:** a criterion whose count is wrong fails a correct build.

### RR-13 · `cid/ui-ux/hud/02-presence-and-reserved-extent.md` — `reservedExtent.unit` cites a `viewport` field that does not exist

**Violates:** the derivation rule (a citation a builder cannot resolve is a prompt, not a seam).
**Current:** `"unit": "rows, where one row is viewport.touchTargetFloorPx for the live device class
plus the pattern's chipPad"`.
**Required:** `viewport.classes.<class>.minTargetPx`. `platform/01` publishes no
`touchTargetFloorPx`; the field is per class under `classes`, and `platform/02` tags it
`kind: "floor"`, which matters here because a reserved extent derived from a `ceiling` would be the
exact defect `platform/02` exists to prevent. Also add the third `Visible` write —
`Pressables.luau:485` (`indexButton.Visible = true`) — to `visibleIsForbidden.supersedes`, which
currently names `:471` and `:588` only.
**Why:** the one field that makes `S12` checkable resolves to nothing.

### RR-14 · `cid/ui-ux/store/01-no-in-game-offer-surface.md` — one observable describes the mechanism `hud/02` bans

**Violates:** `composition.presence.visibleIsForbidden`.
**Current:** `surfaces[moment.rowLift].observable` = *"a lift changes one readout's `Visible`
property and nothing else."*
**Required:** *"a lift changes one group's transparency set and its interactivity properties, and
nothing else"*, per `composition.presence.states.reserved`.
**Why:** low severity — the row's verdict is unaffected — but the observable as written instructs a
builder to grep for the one write the category now forbids.

---

## Predicted cross-category conflicts

Recorded for the final pass; none is a failure now.

1. **Art & Visuals — UI Art (wave 6) versus `screens/03`.** UI Art owns *"typography"* in its graph
   `owns` list and will set the type ramp. `screens/03` `R2` sets a 14 px floor and retires
   `caption` (12 px, `theme/generate.mjs:21-24`) from player-facing use. The collision will look
   like a text-size argument and will actually be about whose key holds the number. `screens/03`
   drew the boundary correctly — it names no ramp value — so the resolution should be cheap.
2. **UI Art versus `composition` on the pressable readout's appearance.** `hud/03` `U1` asks
   `ui-forge` for a `TextButton` carrying `actionButton`'s state and motion blocks. Whether a
   `fantasy-ornate` pressable readout is legible over live play at 70 px on a phone is a wave-6
   question nobody has asked.
3. **Audio — Stingers versus `notices` dwell.** `theme/tone/03` lets `B2` be *"longer and wider than
   B1"*; `feedback/01` caps the `setComplete` plate at 3.0 s and `areaComplete` at 2.5 s. If Audio
   sizes either cue past its plate, the notice leaves the screen while its sound plays. Feedback
   named this and left 2.0 s of headroom to its 5.0 s ceiling, so it resolves as one number.
4. **`ui-forge` pattern work versus everyone.** Wave 5 has now requested **ten** compiler edits from
   an owner that does not exist: `U1`–`U6` (`hud/03`), four `modal-grid` edits (`screens/01`), the
   `UITextSizeConstraint` emitter (`screens/03`), and five more in `platform/01`'s table (which
   overlap `U3`/`U4`). Several are the same edit counted twice. **The final pass should deduplicate
   them into one list with one owner before wave 6 adds more.**
5. **Contract-and-seam work versus four domains.** Three `PROSE_PATHS`-shaped requests
   (`screens.systemCopy`, `notices.members[].text`, and `theme/vocabulary/03`'s existing one), two
   emitter requests on the `ok && --emit` gate (`bridge/emit-hud-brief.mjs`,
   `bridge/emit-terms.mjs`), and the ` ```coinage ` parser that `theme/vocabulary/04` says may not
   exist. Every UI/UX string in this wave is unenforceable by the merge until that parser lands.
6. **Tech & Data — Networking versus `store/02`.** `store/02` rules that a repeat
   `UserOwnsGamePassAsync` observes an out-of-experience purchase after propagation and pushes back
   on `products.ownershipCheck`'s *"read at join"*; `cid/tech/networking/_lead.md` reads the same
   platform the other way. Both branches are specified and `store/02` states the build is unchanged
   either way, which is the right shape — but two keys will carry opposite `[unverified]` rulings
   into the final pass unless one adopts the other's both-branches form.
7. **`representation` versus `hud/02` and `hud/03`.** `architect/sheets/06-representation.md:290`
   specifies the purchase button's `Visible` as driven by `snapshot.rowsRevealed`. `hud/02` bans
   the write. `hud/02` issues its revision request against `firstSession` and names `Pressables.luau`
   but **does not name `representation`**, so an approved technical key still specifies the banned
   mechanism. Not in my checklist; flagged for the architect pass.
8. **Analytics versus `navigation`.** `navigation/01` notes `openIndex` is client-adjudicated and
   fires no remote. `cid/analytics/funnels` wants comprehension instruments. If a panel-open event
   is ever wanted it is a change to `navigation`, and Analytics has already run.

---

## What must happen before this category can release

1. **RR-1, RR-2, RR-4, RR-5, RR-6, RR-7, RR-10 close the seven pairwise contradictions.** Each is
   two sheets giving one builder two answers, and each is closable by one edit to one file.
2. **RR-8 makes `composition` the place the other three domains' requirements actually land.**
   This is the single highest-value edit in the round: it closes four seams at once and it is the
   thing the key was commissioned for.
3. **RR-3 gets `input`'s owner a decision to make** instead of two UI sheets quietly disagreeing
   about whether a fifth pressable exists.
4. **RR-11 gives the category a build that runs today.** Without it, the wave's headline claim —
   that `composition` closes the playtest defect — is true of the specification and false of the
   game.
5. **RR-9, RR-12, RR-13, RR-14 are small and mechanical.**
6. **`F3` should be routed to build work now, ahead of the revision round.** It is a silent, total
   failure of every HUD readout, triggered by a re-casing that three sheets in this wave now
   require. It is the one finding here that gets worse the longer the sheets sit.
7. **Re-run this pass on the changed files only.** Nine of the seventeen sheets are untouched by
   any request: `screens/03`, `screens/04`, `navigation/03` (pending RR-3), `store/02`,
   `feedback/02`, `feedback/03`, `platform/02`, and both `platform` and `store` lead indexes. They
   are approved as of this reading.

---

# Round 2

**Status: FAIL**
All 14 round-1 requests are genuinely closed and the four mutually contradictory domains have
really converged — the arbitration is argued, not agreed, and in three places a domain withdrew a
position it had the standing to defend. **But route B rests on three mechanical claims about the
emitter and two of them are false against the source**; the panel stack omits one gap and overflows
a surface that forbids scrolling; and the convergence introduced one new contradiction (a
deprecated API) while papering over one hole (a single exit whose protection was withdrawn in the
same round). Six requests, every one a single edit to a single file, all in four sheets. No check is
blocked on an unrun domain.

## Did the convergence hold? Request by request

| RR | closed? | how I checked |
|---|---|---|
| 1, 2 | **yes, and better than requested** | HUD did not take the absence ruling and did not merely assert fusion. It separated *instance* from *affordance* and made the affordance a checkable property set (`groups[collection].affordance.beforeLift`: elevation 0, stroke none, `Active`/`Selectable`/`Interactable` false, with the check *"differs from `Readout_Currency`'s in zero respects"*). That answers Navigation's actual bar-(a) objection — a thing that looks pressable and does nothing — rather than routing around it, and the `Visible == false` branch disappears with it. `unfusedFallback` is specified as data so the refusal branch costs one edit. This is the model closure of the round. |
| 3, 4 | **yes** | Navigation withdrew, and the reasoning is argued rather than conceded: it distinguishes *"the exit must be drawn"* (which `input/mobile.md` supports) from *"the exit must be drawn inside the panel"* (which it does not), and weighs `input.gameDrawnPressables: 4` plus R-1's containment *"to one input class, two verbs, four controls … so nothing can widen it quietly"* against one convenience. Screens held and was ratified. **A way back now genuinely exists on all three device classes**: `Pressable_INDEX` toggles, is drawn from join, and at `zIndex` 20 draws above the panel at 10, so it stays visible and hit-testable while the panel is open. **Check 2 passes.** See F-6 for what the ratification rests on. |
| 5 | **yes** | Screens disproved its own guarantee rather than defending it, and Navigation adopted the consequence. See the recomputation below. |
| 6, 7 | **yes** | Feedback withdrew `zIndexBelow`/`zIndexAbove` and replaced it with a constraint plus its reason, conceding *"it bought nothing and cost `B2` and `B3` behind an open panel."* Its overlap list is re-derived as a **predicate on `groups[].interactive`** rather than an element list, so it re-resolves if the group set changes again — a better fix than the one I asked for. |
| 8 | **yes, all four** | `zOrder`, `anchors[noticeStack]` with a derived rect, `focusRing`, `groupIndex`. The arbitration is reasoned: Feedback stated a *relation* between 1 and 20, which cannot determine a value against a panel at 10, so Navigation's values win — and the tap guarantee is carried by `Active = false`, which does not depend on depth. **I verified the constraint is satisfied by the chosen values**: `feedback/01` criterion 3 requires the notice `ZIndex` be strictly greater than `IndexSurface`'s and than every node in `composition.groups[].node`; 30 > 20 > 10 satisfies it. HUD also *derived* the `noticeStack` rect (`x ∈ [0.24, 0.76], y ∈ [0, 0.30]`, disjoint from the thumbstick frame, `jumpSmall` and both top clusters) rather than refusing or deferring it. |
| 9 | **yes** | Platform withdrew `groupParentNode` outright and rebuilt focus from three documented properties. **Both platform facts confirmed against the banked pack**: `AddSelectionParent` is *"marked **Deprecated**"* (`pack.md:327`) and *"`SelectionGroup` is not a `GuiObject` property"* in the current reference (`pack.md:319`). Its criterion 4 walks the cycle four times, which is checkable by inspection. **But HUD named the deprecated API as its replacement mechanism — F-4.** |
| 10 | **yes** | `screens.systemCopy` deleted; one string, one owner, one `PROSE_PATHS` request. |
| 11 | **partly — this is the substance of round 2.** | See below. |
| 12 | **yes** | Criterion 4 now reads **5** `content.readouts` plus one `content.progress`, and adds `variant.anchor: "edge"`. |
| 13 | **yes, and it generalised** | `viewport.classes.<class>.minTargetPx`, plus `unitFieldKind: "floor"` with the reason it matters (`platform/02` forbids deriving an extent from a `ceiling`). Platform added a `citeAs` block with canonical paths and a `notFields` list that names `touchTargetFloorPx` as not-a-field. That turns one corrected citation into a mechanism. HUD also took my `Pressables.luau:485` find and named `representation:290` as still specifying the banned write. |
| 14 | **yes** | Restated as a whitelist with a provenance clause — *a module may sit in the synced tree only if a contract key names it and it traces to a `ui-forge` brief derived from this game's context* — which is a rule rather than a list of seven filenames, and it names the root cause the seven storefronts share with the theme defect. |

## Route B, verified against the emitter

**The principle is sound and that matters most.** A control nested inside its group's own
`Readout_*` frame *is* one box, produced by the shipped compiler, and it does avoid all four
capability faults exactly as claimed: `content.actions` stays absent, so the duplicate
`Cluster_bottomRight` is never emitted and `actionButton()` is never called;
`Pressables.luau:433` already sets its own `UISizeConstraint.MinSize`; nothing reads `maxSize`.
**Route B closes the developer's reported defect with zero `ui-forge` changes**, which is a
materially better outcome than round 1.

**The narrowing of `oneNodePerGroup` is safe and does not re-admit the defect.** The shape that
produced it was two siblings of a *cluster*; `clusterSiblingRealisationForbidden: true` and the
invariant *"no game-drawn pressable has a cluster frame or the ScreenGui as its Parent"* both still
forbid exactly that, and the permitted shape (two children of one group parent) is strictly tighter
than what shipped. I tried to construct a six-box tree that satisfies the narrowed rule and could
not.

Three mechanical claims carry route B. Two are false:

**F-1 · The nested control renders FIRST, not last.** `hud/03` states *"the frame's own vertical
`UIListLayout` places it as the last row"* and `routes[B].placement` repeats it. `applyLayout` sets
`list.SortOrder = Enum.SortOrder.LayoutOrder` (`UIBuilder.luau:190`), and `buildNode` assigns
`c.LayoutOrder = i` over a 1-based array (`:544-547`), so spec children are 1, 2, 3. A button from
`Instance.new("TextButton")` carries `LayoutOrder = 0`. **0 sorts before 1**, so the control lands
above the label and value inside the pill. A builder following the sheet writes no `LayoutOrder`
and gets the opposite of what the sheet asserts.

**F-2 · `groups[].node` names route A's node, so the key's own static check fails on the route that
ships.** `hud/01.groups[].node` is `Pressable_INDEX` / `Pressable_BUY1/2/3` — which
`hud/03.routes[A].groupNode` confirms is the route-A value. Under route B the group node is the
`Readout_*` frame and the button is a *child* of it, so `ReadoutLabel`, `ReadoutValue` and
`ReadoutState` are **siblings** of `Pressable_BUY1`, not descendants, and
`oneNodePerGroup.staticCheck`'s *"every element's node is a descendant path under its own group's
node"* fails for all four interactive groups. Two knock-ons: `hud/02.visibleIsForbidden` and
`presence` both key off `groups[].node`, so under route B they bind the button rather than the row;
and `groups[currency].node` is `Readout_Currency` while the pattern builds `Readout_${label}`
(`hud-overlay.mjs:76`) from label `Shards` — **`Readout_Shards`**. The key names a node the
compiler will not emit, and `hud/03.routes[B].groupNode` repeats the same wrong name.

**F-3 · The affordability word has no node under route B.** `elements[upg*-state].node` is
`ReadoutState`. `readout()` emits at most `ReadoutIcon`, `ReadoutLabel` and `ReadoutValue`
(`hud-overlay.mjs:100-123`) — **there is no third text child** — and route B creates only the
`TextButton`. So `Ready` / `Short` / `Max`, which exist precisely because
`input.pressable.affordabilityByColourAlone: false` demands a second channel and no key supplied
one, have nowhere to render on the active route. Either the button's own `Text` carries the state
(likely, and free) or `pressables` creates a fourth Instance. The sheet says neither.

## The 316 px stack, recomputed

**The stated arithmetic is right; the model is missing one term.**
`4×24 + 4×26 + 3×12 + 48 + 2×16 = 96 + 104 + 36 + 48 + 32 = 316` ✓. Inputs verified against source:
`space.lg = 16` (`generate.mjs:14`), `label = 16 px`, `caption = 12 px` (`:20-28`), so a 24 px
heading row and a 26 px slot row at sheet 03's 14 px floor are both defensible. The 375 × 667
figure is landscape short-axis on a small phone, consistent with `platform/01`'s landscape ruling
and more conservative than `ui-forge`'s own 414.

**`IndexSurface` has five children, not four.** Four `Group_*` frames plus `FlavourLine`
(`screens/04`, a child of `IndexSurface`, `reservedHeightLines: 2`). Five children take **four**
inter-child gaps, not three: `316 + 12 = **328 px**`.

Against `0.86 × 375 = 322.5 px` of panel height, **328 overflows by 5.5 px**, and `screens/01`
forbids a scroll region, so there is nowhere for it to go. One number fixes it: `0.875` clears 328
and `0.88` (330 px) leaves margin; both are inside the sheet's own test range of 0.78–0.92. Two
notes. The `positionOffsetPx: [0, -28]` bottom margin sits outside the 316 stack but inside the
viewport, so panel-plus-margin consumes 350 of 375 px at 0.86 and 358 at 0.88 — still legal, with
no room left for a further revision. And **the unsourced 92 px name-width input is handled
correctly**: it is tagged as an estimate, and the binding mechanism is sheet 03's build-time
`GetTextBoundsAsync` fit check, which fails the build rather than shipping an unreadable name.
That is the right shape for a number nobody could source.

## What the convergence papered over

**F-6 · Navigation dropped its close control on a guarantee Screens withdrew in the same round.**
`navigation/03` ratifies Screens' refusal citing *"`mustNotIntersect: ["Pressable_INDEX"]` at
`0.84 × 0.72` **bottom-anchored**, which keeps the top-left cluster clear on every viewport"*, and
states plainly that one exit *"is not survivable against occlusion, which is why sheet `02` promotes
`screens[index].geometry.mustNotIntersect` from a courtesy to a bar-(a) invariant: with one exit, a
panel that covers it traps the player."* **Screens' revised geometry is `0.94 × 0.86` with
`mustNotIntersect: []` and `mayIntersect` naming all four pressables**, and its own text disproves
the clearance: *"No phone viewport admits a panel that both fits its contents and clears any
cluster."* So the sole exit is now explicitly permitted to sit under the panel, and the only thing
keeping it reachable is the z-order Navigation had just called insufficient.

**Not fatal — I checked.** At `zIndex` 20 against the panel's 10, `Pressable_INDEX` draws above and
stays hit-testable, so the player is not trapped and check 2 passes. But the two sheets each moved
toward the other and the joint result is weaker than either intended, no sheet states the surviving
argument, and `navigation/02`'s bar-(a) invariant now points at an empty list.

**F-4 · HUD's `focusRing` names a deprecated API that two sibling sheets forbid.**
`hud/01.focusRing.mechanismInstead` is *"`GuiService:AddSelectionParent` takes an arbitrary set and
needs no shared tree parent."* The pack's note on that exact page reads *"marked **Deprecated**. The
pre-2022 selection-group idiom is not the one to spec"* (`pack.md:327`); `navigation/03` lists
`AddSelectionParent` in its gamepad `forbidden` array; `platform/01` calls it deprecated in terms.
HUD's *refusal* of the group parent is right; its *stated replacement* is the one mechanism the
category has ruled out three times, and the refusal stands perfectly well on Platform's link graph.

**F-5 · The `viewport` → `composition` focus contract does not dereference.** Of the four fields:
`groupIndex` ✓ (on groups, 1–6, unique); `interactive` ✓ (on groups); `instanceName` — HUD supplies
`node`, not `instanceName`; `memberIndex` — HUD supplies `elements[].memberIndexWithinGroup` while
Platform reads `composition.groups[].members[].memberIndex`, and `groups[].members` is an array of
**id strings**, so the path resolves to nothing. Worse, `focusList.rule` filters *"every composition
member with `interactive` true"* and **no element carries `interactive`** — it lives on groups. Read
literally the focus list is empty; read charitably it is the four groups, and then `memberIndex` is
undefined for them. **Do the four form a total order with no ties?** Only under the charitable
reading: groupIndex 1, 4, 5, 6 → `selectionOrder` 11, 41, 51, 61, unique and total, and Platform's
criterion 4 confirms the intent is a four-cycle. The intent is right; the data path is broken, which
is RR-13's class recurring one layer up.

## Round 2 revision requests

### R2-1 · `cid/ui-ux/hud/03-pattern-producibility-and-the-brief-seam.md` — the nested control renders first, not last
**Violates:** its own `routes[B].placement`.
**Current:** *"the frame's own vertical `UIListLayout` places it as the last row."*
**Required:** add `layoutOrder` to `routes[B]` — the control's `LayoutOrder` is the group's member
count plus one — and add `LayoutOrder` to route B's carve-out beside `Size` and `MinSize`.
**Why:** `UIBuilder.luau:190` sorts by `LayoutOrder`, `:546` numbers spec children from 1, and
`Instance.new` defaults to 0, so the button sorts above the label and value.

### R2-2 · `cid/ui-ux/hud/01-persistent-surface-composition.md` — `groups[].node` is route A's node, and one name is unemittable
**Violates:** `oneNodePerGroup.staticCheck` under the active route.
**Current:** `groups[].node` = `Pressable_INDEX` / `Pressable_BUY1/2/3`; `groups[currency].node` =
`Readout_Currency`.
**Required:** split the field per route — `groupNode` (the `Readout_*` frame under B, the button
under A) and `controlNode` — so `elements[].node` is a descendant of `groupNode` on both routes and
`hud/02`'s presence and `Visible` rules bind the group subtree rather than the button. Correct
`Readout_Currency` to **`Readout_Shards`**, the name the pattern builds from its label.
**Why:** as written, the key's own static check fails on the route that ships, and one of five group
nodes does not exist in the emitted tree.

### R2-3 · `cid/ui-ux/hud/03-pattern-producibility-and-the-brief-seam.md` — `ReadoutState` has no node under route B
**Violates:** `input.pressable.affordabilityByColourAlone: false`.
**Current:** route B creates only the `TextButton`; `readout()` emits no third text child.
**Required:** state where `Ready` / `Short` / `Max` renders under B — most cheaply the control's own
`Text`, which costs no Instance — or add the label to route B's created set.
**Why:** the second affordability channel exists because no key supplied one, and on the active
route it currently has nowhere to go.

### R2-4 · `cid/ui-ux/hud/01-persistent-surface-composition.md` — `focusRing` names a deprecated, thrice-forbidden API
**Violates:** `navigation/03.selectability.deprecatedMechanismForbidden`; `platform/01.gamepad`.
**Current:** `mechanismInstead: "GuiService:AddSelectionParent takes an arbitrary set…"`.
**Required:** `"viewport.gamepad.mechanism: explicitLinkGraph — Selectable, SelectionOrder and
NextSelection* only"`.
**Why:** the page HUD cites is marked Deprecated in the banked pack, and the refusal it justifies
needs none of it.

### R2-5 · `cid/ui-ux/platform/01-device-viewport-rules.md` — the focus contract dereferences fields that do not exist
**Violates:** the derivation rule.
**Current:** `focusList.rule` = *"every composition member with `interactive` true, sorted by
`(groups[].groupIndex, members[].memberIndex)`"*; `selectionOrderRule` =
`10 * groups[].groupIndex + groups[].members[].memberIndex`.
**Required:** `interactive` is a property of **groups**; `groups[].members` is an array of element
**id strings**; the per-element field is `elements[].memberIndexWithinGroup`. Restate as *"every
`composition.groups` entry with `interactive` true, sorted by `groupIndex`"* and drop `memberIndex`
from `selectionOrderRule`, or resolve it through `elements[]`. Add `instanceName` to `citeAs.notFields`
or rename it to `node`.
**Why:** read literally the focus list is empty; the intent — four pressables, one cycle — is right
and only the path is wrong.

### R2-6 · `cid/ui-ux/screens/01-collection-index.md` — the reserved stack omits one gap and overflows the panel
**Violates:** its own no-scroll ruling.
**Current:** `3 × 12` group gaps for a panel holding **five** children (four `Group_*` plus
`screens/04`'s `FlavourLine`), and height `sizeScale` 0.86.
**Required:** `4 × 12`, giving **328 px**, and a height scale that clears it — `0.88` gives 330 px
with margin and is inside the stated test range.
**Why:** at 0.86 the panel is 322.5 px on a 375-point short axis against 328 px of content, and
there is no scroll region for the difference.

## Carried into the verdict, not fixed here

- **`F3` is confirmed and correctly classified as blocking on both routes.** `HudBinding.luau:404-406`
  uppercases the label to build the node name; `hud-overlay.mjs:76` does not. It must land before or
  with the casing fix, never after — three sheets now require that fix and the fix is what triggers
  the failure.
- **Wave 6's two theme defects both land on this category's output, and one is worse than reported.**
  `palettes.mjs:150` gives `serif-ui` a numeric font of `MerriweatherBold`, which is not an
  `Enum.Font` member — entry confirmed. `UIBuilder.luau:482` reads
  `inst.Font = (Enum.Font :: any)[t.font] or Enum.Font.Gotham`, and **indexing `Enum.Font` with a
  name that does not exist raises rather than returning `nil`, so the `or` never runs**: it throws,
  it does not silently render Gotham. `readout()` types `ReadoutValue` as `numeric`
  (`hud-overlay.mjs:113`), so under `fantasy-ornate` **every HUD value node throws inside
  `buildNode`** — the same failure mode `UIBuilder.luau:460-467` records as having killed the client
  entry point once before. Art's to fix; this category's every readout is what breaks.

## Status of the 17 sheets

**Approved and untouched by any round-2 request:** `hud/02`, `screens/02`, `screens/03`,
`screens/04`, `navigation/01`, `navigation/02`, `navigation/03`, `store/01`, `store/02`,
`feedback/01`, `feedback/02`, `feedback/03`, `platform/02`, and all six lead indexes.
**Four sheets carry the six requests:** `hud/01` (R2-2, R2-4), `hud/03` (R2-1, R2-3),
`platform/01` (R2-5), `screens/01` (R2-6). Round 3 should re-read those four and nothing else.

---

# Round 3 — final

**Status: PARTIAL** *(superseded — see Round 3 (continued))*
**Five of six closed and verified against source. One is closed on one side only.** `hud/01` fixed
the focus contract and filed the correction to Platform; **`platform/01`'s `gamepad.focusList` block
is unchanged from round 2** and still reads the two paths `hud/01`'s new `citeAs.notFields` now
formally declares do not exist. The cap is spent, so I name it precisely rather than open a round 4:
**it is a defect, not a design disagreement** — both sheets want identical behaviour and one is
quoting a stale path. It is one JSON block, and the replacement text already exists, written out
verbatim inside `hud/01`. Everything else in the category releases.

## The six, checked against source

| # | verdict | what I read |
|---|---|---|
| **F-1** | **closed, and the two values are right** | I recomputed the spec-child counts rather than accept them. `readout()` with `stacked: true` (which `layout: "corners"` forces, `hud-overlay.mjs:259`) emits `[ReadoutIcon?, ReadoutLabel, ReadoutValue]` (`:100-123`). The collection group carries `icon: "find"` → **3** spec children → control at **4** ✓. The three upgrade groups carry no `icon` in `composition` or in the shipped brief → **2** spec children → control at **3** ✓. `iconNote` records that the number moves if an icon is added, which is the failure mode of a hard-coded 4. The check — *"strictly greater than every sibling's, and no `controlNode` has `LayoutOrder` 0"* — is stronger than the values it guards and survives a change to either. |
| **F-2** | **closed** | All five group nodes now equal what the compiler emits: `Readout_Finds`, `Readout_Shards`, `Readout_Value`, `Readout_Reach`, `Readout_Pace`, plus pattern-fixed `ProgressGroup` (`hud-overlay.mjs:280`, correctly annotated `nodeIsPatternFixed`). `node` now always means the *group* node, so `oneNodePerGroup.staticCheck` holds on route B: `controlNode` is a child of `node`, and every `elements[].node` resolves under `node`. Uniqueness across `node ∪ controlNode` is 10 distinct names ✓. `hud/02`'s presence and `Visible` rules now bind the whole row, which is what they were written for. `nodeByRoute` / `controlNodeByRoute` / `classByRoute` with the active route deriving the flat values makes switching to route A one field. |
| **F-3** | **closed, and the affordability channel genuinely survives** | See below. |
| **F-4** | **closed** | `mechanismInstead: "viewport.gamepad.mechanism: explicitLinkGraph"`, and `deprecatedMechanismForbidden` now lists **both** `GuiService:AddSelectionParent` and `GuiObject.SelectionGroup` — right, since the banked pack marks the first Deprecated (`pack.md:327`) and records the second as absent from the current `GuiObject` reference (`pack.md:319`). `correctedInRevision2` names what it got wrong rather than quietly editing. |
| **F-5** | **half closed — see below** | |
| **F-6** | **closed, and it is the best work of the three rounds** | Screens' 328 px matches my independent recomputation **exactly**, and it found both errors I did (a fifth child, and a dropped `space.md`) rather than only the one I named. `0.88 × 375 = 330 ≥ 328` ✓, with the test range widened to 0.80–0.94 so the chosen value is not on its own boundary — the difference between a fix and a patch. Criterion 2 is replaced by the check that would have caught it: children + 4 gaps + padding ≤ `IndexSurface.AbsoluteSize.Y` at every viewport, a property rather than a number, which survives a token change. Navigation withdrew the *objection* rather than the control, on a real distinction — visual overlap (harmless, UI Art's) versus unreachability (fatal, its own) — and both sheets now state the surviving argument in a field (`exitReachability.restsOn`, `doesNotRestOn`). And it **raised** the severity the convergence would have buried: `zOrder.invariantSeverity: "bar (a)"`, with respawn recorded as `alsoServesAs: "the recovery floor … not a design path and never named in copy"`. Every geometric requirement Navigation made of another domain is withdrawn. |

## Does route B produce a legal composition end to end?

**Yes.** I walked it node by node against the emitter. `hud-overlay` emits
`Cluster_topLeft → Readout_Finds → [ReadoutIcon 1, ReadoutLabel 2, ReadoutValue 3]`; `pressables`
parents `Pressable_INDEX` in at `LayoutOrder` 4 with `Size`/`MinSize` from
`viewport.classes.<class>.minTargetPx`; the frame's own vertical `UIListLayout` (`applyLayout`,
`SortOrder.LayoutOrder`) places it last; the frame's `auto: 'xy'` (`hud-overlay.mjs:77`) grows to
fit it. One box, one group, no `content.actions`, no `actionButton()`, no duplicate cluster name,
no `maxSize` read, no `Position` or `AnchorPoint` written by any module. The three upgrade groups
are identical with `LayoutOrder` 3. **Nothing in this path needs a `ui-forge` change**, which is
what makes it a shipping answer rather than a plan.

Two carve-outs are stated rather than hidden — `pressables` writes `Size`, `MinSize` and
`LayoutOrder` on its own `controlNode` only, expiring when `U4` lands — and `U6` and `U7` are
correctly marked **not refusable**, because `U6` is a live jump-button overlap on both routes and
`U7` is the only thing between the notice stack and a full-width plate over the collection group.
The honesty about `defaultOutcomeIsRefusal` (*"`ui-forge` pattern work has no owner, so route B is
what actually ships unless somebody is assigned"*) is why this closes.

## Does the affordability channel survive on the control's own `Text`?

**Yes, and the move is an improvement rather than a workaround.** `primaryChannel: "text"` and
`colourIsSecondaryOnly: true` are preserved on all three `upg*-state` elements; the words are still
`Ready` / `Short` / `Max` — distinct first letters, distinct lengths, all inside `maxLabelChars`;
and criterion 2 pins it with a regex (`^[0-9,]+ (Ready|Short)$` or exactly `Max`) rather than prose.
`input.pressable.affordabilityByColourAlone: false` demanded a second channel that is not colour,
and text on the control is one. HUD's argument — *the thing you press states its price* — is the
correct reading of a purchase control, and it is what `modal-grid`'s `ctaPlacement: "per-item"`
already does in the other pattern.

**The collection control's `Text: ""` is also right**, for a stronger reason than the sheet gives.
Its stated reason (the count above is its label; `onboarding/03` `T5` forbids an instruction) is
sound. The structural one is better: the index control has no cost and no affordability state, so
there is nothing for a second channel to carry — its `affordance` is pressability, and elevation
plus stroke are shape channels, which is what the shape-not-hue constraint actually asks for.

**One thing this move quietly bought.** The control's text is written by `pressables`, and
`Pressables.luau:404` reads `type.body` → `SourceSans`. So the affordability string is **not** on
the `type.numeric` path and does **not** hit the `MerriweatherBold` throw. Under route A it would
have been a `ReadoutState` label whose type role nobody had assigned. The category's one
must-be-legible string is, by accident, the one string in the HUD safe from Art's `A1`.

## Does the focus contract dereference? **No — one half was not updated.**

`hud/01` did its side completely: `citeAs` with five canonical paths, a four-entry `notFields` list
naming `groups[].instanceName` and `groups[].members[].memberIndex` as non-fields, `selectableNode:
"the group's controlNode, never its node"`, and a filed correction reading *"every
`composition.groups` entry with `interactive` true, sorted by `groupIndex`; `selectionOrder = 10 *
groupIndex`; the selectable Instance is `groups[].controlNode`"*.

**`platform/01` still carries the round-2 text, unchanged:**

- `gamepad.focusList.rule` — *"every composition **member** with `interactive` true, sorted by
  (`groups[].groupIndex`, `members[].memberIndex`)"*
- `gamepad.focusList.selectionOrderRule` — `10 * composition.groups[].groupIndex +
  composition.groups[].members[].memberIndex`
- `required[]` — still demands `groups[].members[].memberIndex` and `groups[].members[].instanceName`
- `invariant` — still *"sorted by (groupIndex, memberIndex)"*
- `citeAs.notFields` — still the four geometry entries, none of the focus ones

So the two halves now **contradict explicitly** where in round 2 they merely failed to meet: one
sheet's `notFields` names as non-existent exactly the two paths the other's `required[]` demands be
added.

**Blast radius, computed rather than asserted.** HUD's rule gives `10 × groupIndex` over groupIndex
1, 4, 5, 6 → **10, 40, 50, 60**, total and tie-free. Platform's gives `10 × groupIndex +
memberIndex`; resolved charitably through `elements[upg*-state].memberIndexWithinGroup = 3` it gives
43, 53, 63 for the upgrades — and **nothing at all for the collection control**, because under route
B `Pressable_INDEX` is `groups[collection].controlNode` and is not an element, so it has no
`memberIndex`. One builder gets four integers; another gets three integers and a `nil`.

**The cycle order is identical under both readings** — collection, value, reach, pace — so this is
not player-visible and does not reopen bar (a). It is bar (b), narrowly: two builders write
different `SelectionOrder` values and one indexes a nil.

## The one open item, and exactly how to close it

**Defect, not disagreement.** Nobody disputes the behaviour. `platform/01`'s `gamepad.focusList`
and `required[]` should be replaced with the text `hud/01` already filed:

- `focusList.rule` → *"every `composition.groups` entry with `interactive` true, sorted by
  `composition.groups[].groupIndex` ascending, filtered to `Selectable` true"*
- `focusList.selectionOrderRule` → `10 * composition.groups[].groupIndex` (no second term)
- `focusList.selectableInstance` → `composition.groups[].controlNode`
- `required[]` → drop the `groups[].members[].memberIndex` and `groups[].members[].instanceName`
  rows; keep `groups[].groupIndex` and `groups[].interactive`
- `invariant` → *"the four interactive groups, sorted by `groupIndex`, form a total order with no
  ties"*
- `citeAs.notFields` → add the two dropped paths, matching `composition.citeAs.notFields`

Platform's acceptance criterion 4 (walk `NextSelectionDown` four times, visit each pressable once,
return to start) is **already correct** and needs no change — it tests the behaviour both sheets
agree on, which is why the defect is confined to the derivation and not to the outcome.

## Carried, not fixed

- **`F3` and Art's `A1` land on the same build step and both are total failures of the readouts.**
  `hud/03` says so in terms. `F3`: `HudBinding.luau:404-406` uppercases, `hud-overlay.mjs:76` does
  not, so the casing fix breaks every readout unless node names come from `composition.groups[].node`
  first. `A1`: `palettes.mjs:150` gives `serif-ui` a numeric font of `MerriweatherBold`, not an
  `Enum.Font` member, and `UIBuilder.luau:482`'s `(Enum.Font :: any)[t.font] or Enum.Font.Gotham`
  **raises** on a missing member rather than falling through, so every `type.numeric` node throws
  inside `buildNode`. The Art verifier's blast-radius claim is right: `type.numeric` only, and
  `Pressables.luau:404` reads `type.body` → `SourceSans`, so the purchase controls survive. Marking
  `A1` not refusable is correct.
- **Ten `ui-forge` requests still have no owner** (`architect/06`). Route B means none of them blocks
  the reported defect, which is the point of route B, but `U6` and `U7` are marked not refusable and
  nobody is assigned. This is the wave's largest unowned item and belongs to the final
  cross-category pass.
- **Cosmetic, recorded not requested:** `navigation/02:251` cites Screens' extent as `0.94 × 0.86`
  in prose where the field is now `0.94 × 0.88`. The same object states
  `governedBy: "screens[index].geometry"` and `adoptedNotDecidedHere: true`, so no builder reads the
  prose as authoritative and no field is wrong.

---

# Round 3 (continued) — closed

**Status: PASS. UI/UX is released.**
F-5 is closed. `platform/01`'s `gamepad.focusList` now dereferences against `hud/01` as published,
and it took the stronger form rather than the minimum. All seventeen sheets are approved.

## Platform's dereference, checked field by field

I re-read the block rather than accept the report, and it resolves in every particular:

| what `hud/01` publishes | what `platform/01` now reads | resolves |
|---|---|---|
| `groups[].groupIndex`, surface-wide, 1–6 | `rule`: *"every `composition.groups` entry with `interactive` true, sorted by `composition.groups[].groupIndex` ascending"* | ✓ — groups, not members; `interactive` read where it lives |
| `groups[].controlNode` | `selectableInstance: "composition.groups[].controlNode"` + `selectableInstanceIsNeverGroupNode: true` | ✓ — and it matches `hud/01.focusRing.selectableNode` (*"the group's controlNode, never its node"*) word for word |
| `groupIndex` 1 / 4 / 5 / 6 on the four interactive groups | `selectionOrderRule: "10 * composition.groups[].groupIndex"`, **no second term** | ✓ — 10 / 40 / 50 / 60 |
| — | `realisedOrder` pinning 10→`Pressable_INDEX`, 40→`BUY1`, 50→`BUY2`, 60→`BUY3` | ✓ — matches `hud/01.focusRing.order` row for row |
| `links.appliedTo` | `composition.groups[].controlNode` | ✓ — previously ambiguous, now explicit |

**The `noSecondTerm` field is the part worth naming.** It records *why* the term was dropped —
`Pressable_INDEX` is a `controlNode` and not an element, so it has no `memberIndexWithinGroup`, and
a two-term rule yields 43/53/63 and **drops the collection control from the cycle entirely**. That
is my round-3 computation, reached independently and written into the key rather than into a commit
message. A later reader cannot re-add the term without meeting the reason.

**It withdrew three requests rather than restating them.** The `amends` block is
`status: "satisfied — nothing further is asked of composition"`, adopts `groupIndex`, `interactive`
and `controlNode` verbatim, and withdraws `instanceName`, `members[].memberIndex` and
`groupParentNode` with a one-line reason each. `citeAs.notFields` gained
`viewport.gamepad.groupParentNode — withdrawn; no common parent is required`. **`composition` is
now asked for nothing by `viewport`**, which is the correct end state for two keys that spent three
rounds disagreeing about paths. Criterion 4 is unchanged, as it should be — it tested the behaviour
both sheets always agreed on, which is why the defect never reached it.

I re-checked the whole sheet for residue: **zero remaining references to any path in `hud/01`'s
`citeAs.notFields`.**

## A correction to my own round-1 verdict

**Check 4 was a false pass and I am recording it as mine.** I marked *"every value the HUD displays
has a source"* PASS on the strength of tracing element sources to the eight-field snapshot and to
`config.collection.*`. I verified `config.collection.classPlural` and did **not** verify the
denominator. `collection` holds `className`, `classPlural`, `relicsPerArea`, `areasPerDepth` and
`sets` — **there is no `totalFinds` and no `total`** (`gameplay/meta/02:57-62`, read this run). So
`hud/01`'s `withDenominator: "{found} / {total}"` and `hud/02:185-186`'s terminal condition both
cite a field nothing emits. In Luau the comparison is against `nil`, which is silently falsy, so
**the terminal state never fires and the endgame substitution `composition` owns never appears** —
bar (a), and the `24` in `0 / 24` has the same problem.

That is exactly the failure my round-1 report says a verifier must not commit: I traced eleven of
thirteen sources and let two pass on their shape. HUD is correcting it, which is right, and the
fix is a field name. It does not hold the category, because the same defect appears at five sites
across three categories and is already routed to the cross-category pass — but the pass on check 4
was mine to get right and I did not.

**Check 4 now reads: PASS, conditional on HUD's `collection.total*` correction landing.** Screens'
sweep found five more of the same class plus one inside a neighbouring key's own value
(`discovery.record.keyedBy` describing itself as keyed from `collection.sets[].relics[].name`), and
published `screens.citations` — 25 paths with `resolvesToday` — copying VFX. **That instrument is
the actual fix**, and it is worth more than the six corrections it found: it is the first thing in
this wave that makes an unresolvable citation fail rather than wait for a verifier to notice.

## Outstanding on the ten ownerless `ui-forge` requests

**Unchanged, and it is now the category's only open item — but it is not the category's to close.**
None blocks the reported defect: route B ships with zero compiler changes, which is what makes the
wave's headline claim true of the game and not only of the specification. What remains:

- **`U6` and `U7` are marked not refusable and have no owner.** `U6` is a live bar-(a) overlap
  between the bottom-right cluster and the platform jump button at `variant.anchor: "edge"`, on
  **both** routes — `CoreUISafeInsets` clears the top bar and device cutouts, not the touch
  controls. `U7` is the only thing between `composition.anchors[noticeStack]` and a full-width
  plate crossing the collection group, because `slotHost()` hard-codes `align: 'stretch'`.
- **The other eight are route-A or `modal-grid` work** and are correctly deferrable; `screens/01`'s
  five `modal-grid` counts have `index-screen`'s hand-built surface as the standing interim.
- **Several are the same edit counted twice** — `U3`/`U4` overlap `platform/01`'s table. The final
  pass should deduplicate the list to one owner before wave 6 adds to it.

`architect/06` states the cause plainly: *"no module in this build order owns `ui-forge`'s
briefs."* Ten requests against a non-existent owner is a routing gap, not a design gap, and it is
the single largest thing wave 5 hands forward.

## Final status

**PASS.** Seventeen of seventeen sheets approved. Six proposed keys — `composition`, `screens`,
`navigation`, `notices`, `offerSurface`, `viewport` — each with one owning sheet, no key claimed
twice, and every cross-key requirement either carried as data or withdrawn out loud.

Across three rounds this category closed 14 + 6 + 1 findings. The arbitrations that resolved them
were argued rather than split: HUD separated affordance from instance and later found a shipping
route nobody had seen; Feedback conceded that `Active = false` made its own z-rule redundant;
Platform withdrew a node it had required and then withdrew three field requests rather than restate
them; Screens disproved its own guarantee and published the arithmetic that did it; Navigation
raised a severity its own concession would otherwise have hidden.

**The one defect class three rounds could not stop recurring is a field path quoted from memory
instead of read** — `touchTargetFloorPx`, `members[].memberIndex`, `instanceName`,
`Readout_Currency`, `collection.totalFinds`, and five more Screens found in one sweep. Two keys now
carry `citeAs` blocks and one carries `screens.citations` with `resolvesToday` per path. **Those
instruments exist because the same defect recurred five times in one wave, and generalising them is
the highest-value thing the cross-category pass could take from this category.**
