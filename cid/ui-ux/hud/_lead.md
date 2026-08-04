# HUD — domain index

**Category:** UI/UX · **Wave:** 5 · Reads: `concept/spec/incremental-spinoff-v2/` — `HANDOFF.md`,
`CONCEPT.md`, `00-CORE.md`, `01-FOUNDATION.md`, `02-GAMEPLAY.md`, `03-META.md`,
`04-PRESENTATION.md`, `OPEN.md`; `cid/ui-ux/_category.md`; `cid/_digest.md`; `cid/_contract.md`;
`cid/_state.md`; `cid/gameplay/onboarding/04-run-one-withholds.md`;
`cid/gameplay/meta/07-after-the-last-find.md`; `cid/theme/vocabulary/04-coinage-intake.md`;
`architect/sheets/06-representation.md`; `ui-forge/src/compose/index.mjs`;
`ui-forge/src/compose/patterns/hud-overlay.mjs`; `ui-forge/briefs/hud.brief.json`;
`bridge/schema.mjs`; `game/src/client/HudBinding.luau`; `game/src/client/Pressables.luau`.

**I own one contract key and it does not exist yet: `composition`, proposed.** Sheet `01`
supplies it; `02` and `03` constrain it and carry no `manifest` block. `bridge/schema.mjs`
holds 25 keys and none of them is this one — verified by reading `SCHEMA` directly, because
this session has no shell and `npm run bridge -- --contract` could not be executed. Its derived
output `cid/_contract.md` lists the same 25.

## What the brief gave me

- *"**8–14, mobile-heavy, short sessions.**"* `00-CORE.md` `[you chose: R1 Q4]` →
  **`[brief: binding]`**. Every group I define is read on a phone, one-handed, by an
  eight-year-old.
- *"~70% mobile / ~25% desktop / ~5% console"* `00-CORE.md` `[I assumed — the split]` →
  `[brief: soft]`, and uncorroborated by anything fetched (`cid/_state.md`). The band binds; the
  ratio does not. Nothing I assign rests on the ratio.
- *"Target: the **smallest game that still gives every creative area real work.**"* `00-CORE.md`
  `[you chose: R1 Q3]` → **`[brief: binding]`**. Three of my six graph subjects are deleted
  below rather than staffed.
- *"**area-completion progress must be visible while moving**, since 'how close am I to done' is
  the core tension"* `04-PRESENTATION.md`, untagged → `[brief: soft]`. **This is the only
  sentence in the whole brief that describes a persistent element.**
- *"**A persistent HUD does not fit**, and this game needs one… UI should know it is proposing
  something the build stage cannot yet make."* `04-PRESENTATION.md`, untagged → `[brief: soft]`.
  **The premise is false and ruling R-1 already turned on that** (`cid/_state.md`):
  `hud-overlay` exists, is a persistent HUD, and ships. Not repeated by any sheet below.
- *"**Input: movement only.** No aiming, clicking, or ability buttons. One thumb."*
  `02-GAMEPLAY.md` `[you accepted: step 6 Q3]` → `[brief: soft]`, **already overruled once by
  R-1**, contained to one input class, two verbs, four controls. I may not widen it and may not
  reopen it: four persistent controls, no fifth.
- *"**There is no failure state.** … **Zero tension is deliberate.**"* `02-GAMEPLAY.md`
  `[you accepted: step 6 Q2]` → `[brief: soft]`. No countdown, no warning state, no red.
- *"Clear → reveal inside the first ten seconds. **No text, no tutorial.**"* `02-GAMEPLAY.md`
  `[you accepted: R6 Q3]` → `[brief: soft]`, read through `gameplay/onboarding/03`'s approved
  gloss: labels, counts and costs are legal from the first frame; imperatives never are.
- *"Permanent multipliers only. **Never content access.**"* `03-META.md`
  `[you accepted: R5 Q4]` → `[brief: soft]`. No persistent element may show a price in Robux, a
  locked slot or a paywalled anything (`products.F19`, ruling R-4).
- `03-META.md` **priority 3** `[I assumed — the ordering]` → `[brief: soft]` on provenance,
  **hard as a gate**. No sheet below assigns, reserves, stubs or leaves room for a rebirth
  counter, a daily-reward strip, a code field, a leaderboard, a trade window, a season pass or
  an event banner. `rebirth` is additionally in `vocabulary.bannedWords`.
- Approved keys binding me, relayed at their true tags and not re-decided:
  `firstSession` (three present at join, three withheld, every lift latched,
  `suppressionForbidden` bans `reflowOnLift` and `reSuppression`, `S12` reserves the full
  three-row extent from frame one) · `input` (`gameDrawnPressables: 4`,
  `travelRequiredToPurchase: "none"`, `affordabilityByColourAlone: false`,
  `rejectionCueOnFailedPrecondition: "none"`, `gamepadSelectable: true`) ·
  `economy` (currency visible and uncapped; a completion notice cannot say `+N`) ·
  `endgame` (past area 8 the headline figure becomes the finished-parts count and currency stays
  on screen without being it; no end screen, no percentage) ·
  `upgrades` (three purchase rows showing level, cost and affordability, not by colour alone) ·
  `social/03` (`leaderstats` unavailable; no layout may place one player's number beside
  another's) · `representation` (`HudBinding` creates no `Instance` except a `Tween`;
  `pressables` creates the four `TextButton`s; *"the day `hud-overlay` grows a pressable readout,
  `pressables.bind` resolves four node names instead of creating four Instances"*) ·
  `vocabulary` (`casing: "title"`, `maxLabelChars: 14`, `maxSentenceWords: 12`,
  `allowedPattern: "^[A-Za-z0-9 ,.'%%/-]+$"`, eight banned words).
- **Live, shipped, and in violation:** `ui-forge/briefs/hud.brief.json` carries
  `"EAST TERRACE - 0% CLEAR"` (23 characters against a 14-character ceiling) and the all-caps
  forms `FINDS`, `SHARDS`, `VALUE`, `REACH`, `PACE` against `casing: "title"`
  `[research: repo — ui-forge/briefs/hud.brief.json, read this run]`.

## What the brief did not give me

Nine gaps. Each is routed; none is filled here.

| # | gap | routed to |
|---|---|---|
| H1 | **The brief describes no persistent element except the area progress bar, and no geometry at all.** Every readout, control, cluster and order in the shipped HUD was invented by a `ui-forge` brief with no sheet behind it. | `01` |
| H2 | **Nothing anywhere says whether an upgrade readout and its purchase control are one thing or two.** `representation.pressable` asks for buttons *"aligned with the upgrade readouts `hud-binding` writes"* and `Pressables.luau:511` wants a column that *"reads in the same order as the upgrade readouts"*; **both halves expected adjacency and neither could express it**, which is category gap G1 and the playtest defect. | `01` |
| H3 | **`firstSession` requires two things that cannot both hold.** Acceptance criterion 1 and `S2` say a suppressed row has **no instance in the PlayerGui at all**; `S12` says the cluster **reserves its full three-row extent from frame one**. A `UIListLayout` collapses a `Visible = false` child out of its flow, so an absent instance reflows and a reserved slot is an instance. **A ruling is owed, and it may require a revision request against `firstSession`.** | `02`, with a stated consequence for whoever holds `firstSession` (currently `gameplay/onboarding/02`) |
| H4 | **No number formatting rule exists anywhere.** No thousands separator, no rounding policy, no rule for what a maxed row reads as. `theme/tone/01` puts these outside `P4` as *"furniture composed at render time, not copy"* and hands them to UI/UX; nothing states them. | `01` |
| H5 | **`affordabilityByColourAlone: false` demands a second channel and no key names one.** `Pressables.luau` and `HudBinding.luau` each invented `" Buy"`, `" Need"` and `"Max"`, both marked `[STOP: no value in the contract]`. Category gap G8. | `01` |
| H6 | **`vocabulary.allowedPattern` admits no per-cent sign**, while `firstSession.withheld[areaProgress].joinValue` is `"0%"`, the shipped bar label is `"… 0% CLEAR"` and `endgame` forbids a completion *percentage* without forbidding this one. `HudBinding.luau:142-149` names the conflict and keeps the character. **This is a bill against `vocabulary`, not a HUD decision** — the route is an `amends` request, and a prose exception is never honoured (`theme/vocabulary/04`). | `01` files the request; the holder of `vocabulary` rules |
| H7 | **`ui-forge/briefs/hud.brief.json` has no owner and no key.** `architect/06`: *"no module in this build order owns `ui-forge`'s briefs, so a spec that waited for it would be a required step with no owner."* Category gap G12. | `03` |
| H8 | **`hud-overlay` ships no pressable readout, and in `layout: "corners"` hard-codes actions into `bottomRight`** regardless of where their readouts sit (`hud-overlay.mjs:289-291`). Category gap G6. | `03` |
| H9 | **`hud-overlay` cannot vary an individual readout's presence by state**, which `firstSession` requires of three rows and one denominator. Raised by `onboarding/04` as *"a blocker to raise rather than a spec to reinterpret."* Category gap G7. | `02` states the requirement, `03` rules on producibility |

**One gap I found that no upstream sheet names.** With `content.actions` populated and
`layout: "corners"`, `hudOverlay` builds one `Cluster_bottomRight` from the readouts
(`hud-overlay.mjs:288`) and then **pushes a second frame with the same name** for the actions
(`:289-291`). `HudBinding.luau:539` resolves upgrade rows through `root:FindFirstChild
("Cluster_bottomRight")` and `Pressables.luau:182` measures
`gui:FindFirstChild("Cluster_bottomRight", true)`; **which of the two sibling frames either gets
is unspecified.** Latent only because today's brief carries no `actions` — and adding `actions`
is the obvious route to closing the defect, so it bites on the fix. `[cid: decided]` that this
is a finding rather than a design choice. → `03`.

## Why 3 sheets

**One key, one sheet, and two sheets for decisions that shape that key's value without being
it.** `composition` is the only key I own, so `01` is fixed by the rule. `02` and `03` exist
because each closes a *named* upstream gap that would otherwise be silently absorbed into `01`
and become invented fact: `02` adjudicates a live contradiction inside `firstSession` (H3) that
decides whether a group's extent is a real field or a fiction, and `03` decides whether the key
can be produced at all against the pattern registry, which is the difference between
`composition` naming `ui-forge` node paths and `composition` naming a required compiler change.
Neither is a heading on `01`: one is a rule about state, the other is a ruling about
producibility, and a writer can get the group inventory exactly right and still ship a HUD that
reflows on a lift or cannot be compiled. **I considered folding `02` into `01` as a
`presence` sub-object and rejected it** only because the contradiction it resolves may generate
a revision request against another domain's key, which a manifest-bearing sheet cannot cleanly
carry. I did not split labels from elements: **the sheet that decides an element names it**, so
every label and value format lives in `01` beside the element it belongs to.

| # | sheet | must decide |
|---|---|---|
| 01 | `persistent-surface-composition` | Name every element drawn over live play — the collection count, the currency readout, the area bar and its label, the three upgrade readouts, the three purchase controls and the index control — give each a stable id, its kind, its label text and its value format string (including the thousands rule, the `Lv N` form, what a maxed row reads as, and the non-colour affordability channel `input` demands and no key supplies), then state which of those elements are **one group**, which corner cluster each group occupies, the order of groups within a cluster and of members within a group, and express as a checkable field that a member's position is derived from its group and is never set independently; supply all of it as the proposed contract key `composition`, whose value must be complete enough that `ui-forge/briefs/hud.brief.json` is generated from it rather than written beside it, file every string you author as a ` ```coinage ` block with `requestsPath` and `surface` per `theme/vocabulary/04`, and make every label pass `vocabulary` — title case, ≤ 14 characters, `allowedPattern`, none of the eight banned words — which the shipped `"EAST TERRACE - 0% CLEAR"`, `FINDS`, `SHARDS`, `VALUE`, `REACH` and `PACE` all fail; where the per-cent sign is required by three approved statements and excluded by `allowedPattern`, file a `{"amends":"vocabulary",…}` request rather than deciding it. |
| 02 | `presence-and-reserved-extent` | Decide how a member that `firstSession` withholds is absent without moving the members that remain, which means ruling on a contradiction you must not smooth over: acceptance criterion 1 and `S2` require a suppressed upgrade row to have **no instance in the PlayerGui at all**, `S12` requires the cluster to **reserve its full three-row extent from frame one**, and a `UIListLayout` collapses a `Visible = false` child out of its flow so that both cannot hold — say which one governs, say what the reserved extent of every group is when zero, some or all of its members are present, decide what a group does under `endgame`'s headline substitution when the finished-parts count becomes the headline figure and currency stays on screen without being it, and state the presence-by-state requirement `hud-overlay` cannot meet today (category gap G7) as a requirement on the pattern rather than reinterpreting it; file the result as a plain `amends` fence against `composition` plus, if the contradiction needs one, an explicit revision request naming the sheet that holds `firstSession` — carry no `manifest` block. |
| 03 | `pattern-producibility-and-the-brief-seam` | Rule against `ui-forge/src/compose/patterns/hud-overlay.mjs` as it stands whether a group of one readout plus one control is producible today as a single node or as two adjacent nodes, and therefore whether closing the double-element defect needs a compiler capability change or only a specified default plus a regenerated brief — judge it on three facts you must verify in the source rather than accept from me: `content.actions` produces a 52×52 `ImageButton` carrying no label and no value and so is a pressable but not a pressable *readout*, in `layout: "corners"` actions are appended as a second cluster hard-coded to `bottomRight` (`hud-overlay.mjs:289-291`) producing two sibling frames both named `Cluster_bottomRight` that `HudBinding.luau:539` and `Pressables.luau:182` each resolve by name with no tiebreak, and `modal-grid` already ships `ctaPlacement: "per-item"` as the same composition solved in the other pattern; then name the smallest change that closes the defect with its file and function, state what must own `ui-forge/briefs/hud.brief.json` for that file to become a derivation of `composition` rather than its source, and record that `Pressables.luau`'s runtime `measureClusterWidthScale` is the workaround this key retires — carry no `manifest` block. |

### What `composition` must be able to express

Stated as requirements on the shape, not as the shape. Sheet `01` writes it.

1. **Every persistent element, with a stable id**, its kind (readout, control, bar, label), its
   label, its value format, and where its value comes from. Ids are what other domains cite.
2. **Group membership** — which elements are one group. Without this field the key does not
   close the defect, whatever else it holds.
3. **Placement of the group, never of the member**: the group's cluster, the group's order
   within that cluster, and each member's order within the group.
4. **The derived-position rule as a field, not as prose** — a builder must be able to fail a
   check, not read a paragraph. `Pressables.luau` measured another module's rendered output at
   runtime precisely because the rule existed only as an English sentence in two places.
5. **The group's realisation** — one node or two adjacent nodes — so that `pressables.bind` can
   resolve names instead of computing positions (`representation` already anticipates exactly
   this).
6. **The extent a group reserves independent of which members are present**, so `02`'s ruling
   has a field to land in and `S12` is checkable.
7. **Enough to generate `ui-forge/briefs/hud.brief.json`**, since the standing failure is that
   the brief is the source and no key produces it.

Invariants worth carrying: no element id in two groups; every entry in `input.pressable.roles`
and every surface in `firstSession.withheld` maps to exactly one member; no element is placed
outside a group; the total count of game-drawn controls is `input.gameDrawnPressables` and not
one more.

## Subjects considered and not assigned

- **Minimap** — *not assigned.* There is nothing to map. `meta/04` makes the next area
  *"enterable at the instant one completes, with no threshold, no cooldown and no travel"*, one
  area is occupied at a time, and `plots` gives each player their own lane. A minimap would be a
  surface invented to fill a slot in my `owns` list, which `00-CORE.md`'s *"smallest game"*
  binding forbids. `[brief: binding]` + `[cid: decided]` on the reasoning.
- **Quest tracker** — *not assigned.* `03-META.md`'s four objective scopes are all read off
  elements that already exist: the collection count (session and long-term), the area bar
  (moment), the collection panel (short-term). A tracker would also be an instruction surface,
  which `onboarding/03` `T5`/`T6` ban outright, and `03-META.md` designs no mastery layer.
- **Hotbar** — *not assigned.* `mechanics/04` gives one tool, welded from spawn, never swapped;
  `input` closes the verb list at five with no inventory verb. A hotbar would have nothing to
  hold. The four pressables are a group in `composition`, not a hotbar, and calling them one
  would invite a fifth slot.
- **A separate endgame HUD sheet** — *not assigned.* `endgame` states it is *"a substitution,
  not a new screen"*; it changes which member is the headline inside existing groups, so it is
  a state in `02`, not a fourth subject.
- **Rendered typography, font size, wrap behaviour, uppercase display (category gap G5)** —
  *not assigned as a sheet.* G5 splits it: the rule is Screens', my labels merely obey it.
  Assigning it here would produce two owners for one rule.
- **Touch-target floor, safe area, gamepad focus order, one-handed reach** — *not mine.*
  `viewport` (Platform & Input) owns them, including the four `[STOP:]` literals in
  `Pressables.luau`. My groups fix order and adjacency; the geometry floor is theirs. **Stated
  as a consequence for that subject:** a group whose members must stay adjacent constrains how
  far apart a touch-target floor may push them, and the bottom-right group sits directly above
  the platform's jump-button keepout.
- **Notice placement relative to a group** — *not mine.* Feedback UI states the requirement
  against `composition` and `01` carries it as data, the direction `social/01` used for
  `maxCoPresenceSeparationStuds`.
- **Composition inside the index panel, and error/system copy** — *not mine.* `screens` and
  Feedback UI respectively, per the category ruling. My key covers the persistent surface only.
- **Colour, panel art, icons, font** — Art & Visuals (UI Art), fixed by vibe key
  `fantasy-ornate` `[brief: soft]`.

**Scope gate:** no sheet above names, implies, reserves space for, stubs or builds fiction
around any priority-2 or priority-3 item. No subject of mine is entirely priority 3, so I assign
sheets rather than nothing.

## Verification note

**`01` is the sheet most likely to be contradicted, and Platform & Input will do it.** Its
`viewport` key sets the touch-target floor as a measurement against the platform jump button and
fixes the keepout regions; if the realised floor on a phone makes the bottom-right group's four
members (three readouts, three controls, stacked) exceed the space above the jump-button band,
my group order and cluster assignment have to move and `01`'s values change. That is the correct
direction — a measurement beating an assumption — and `01` should state its cluster assignment
so that changing a *group's* corner is one edit rather than seven.

Second most likely: **Feedback UI**, if a notice must sit relative to a group and no group
anchor exists to sit relative to. Third: **`screens`**, if the index control turns out to belong
to the panel's entry rather than to a HUD group — the category ruling puts the control on the
HUD and the panel in `screens`, so the seam runs exactly between them.

**Least likely to be contradicted and most likely to be ignored:** `03`. It produces no values,
so nothing fails when it is skipped — which is precisely why it is written down.

## Research owed

`docs/cid-workflow.json` sets **no `must_verify` on this node**. I fetched anyway, because a
domain writer has no fetch tools and whatever I bank is the only external evidence it may cite.

**Fetched and usable:**

- The grouping rule has a source rather than being taste: *"Items close together are likely to
  be perceived as part of the same group — sharing similar functionality or traits"*, with
  minimal spacing within a group and larger whitespace between groups, and the note that
  proximity **overrides colour and shape similarity**
  `[research: https://www.nngroup.com/articles/gestalt-proximity/]`. This is the argument for
  why one readout and one control drawn half a screen apart read as two objects and not as one
  row, which is the defect in the player's own words.
- **A `UIListLayout` is intended to collapse a `Visible = false` child out of its flow**, not to
  hold its space: the space-retaining behaviour was reported as a bug and a Roblox staff reply
  called it *"the same as the bug where UIListLayout wasn't hooking up to Changed events
  properly. It should be fixed now."*
  `[research: https://devforum.roblox.com/t/uilistlayout-uses-space-even-for-invisible-gui-elements/45323]`.
  Corroborated by a later thread describing the same collapse and giving the workarounds —
  `CanvasGroup.GroupTransparency = 1`, driving transparencies directly, or a visible fully
  transparent parent
  `[research: https://devforum.roblox.com/t/bypassing-uilistlayout-filling-invisible-elements/2496680]`.
  This is what makes H3 a real contradiction rather than a wording quibble, and it independently
  corroborates the mechanism `HudBinding.luau:292-306` already ships.
- `AnchorPoint` *"defines the origin point from which an object's position and size change"*, and
  `UDim2` scale is *"a percentage of the container's size along the corresponding axis, additive
  of any Offset values"*
  `[research: https://create.roblox.com/docs/ui/position-and-size]` — the engine vocabulary a
  derived-position rule has to be expressed in.

**Could not settle, with the fetch that would:**

- **Whether the current engine collapses or reserves.** The staff reply above is from a 2017 bug
  thread and a 2023 thread describes the behaviour as still present, so the two agree on the
  *intent* but neither is a current normative statement. `[unverified]` —
  settled by fetching the `UIListLayout` page's own behaviour section on
  `create.roblox.com/docs/reference/engine/classes/UIListLayout` once it documents hidden
  children (the version fetched this run lists only `HorizontalFlex`, `ItemLineAlignment`,
  `Padding`, `VerticalFlex`, `Wraps` and says nothing about visibility), or the
  `Roblox/creator-docs` markdown for `content/en-us/ui/` layout guidance, which 404'd at
  `ui/layout.md` this run. **`02`'s ruling should hold either way** — reserve explicitly rather
  than depend on the engine reserving for you — and should say so.
- **The `~70% mobile` split.** Still uncorroborated by anything fetched, as `cid/_state.md`
  records for wave 2. Nothing I assign rests on the ratio; the *band* is `[brief: binding]`.
  Settled only by developer analytics, which do not exist for an unshipped game.
- **Repo facts I read rather than fetched**, all `[research: repo — read this run]`:
  `bridge/schema.mjs` (25 keys, no `composition`), `ui-forge/src/compose/index.mjs`,
  `ui-forge/src/compose/patterns/hud-overlay.mjs`, `ui-forge/briefs/hud.brief.json`,
  `game/src/client/HudBinding.luau`, `game/src/client/Pressables.luau`,
  `architect/sheets/06-representation.md`. `npm run bridge -- --contract` **was not run** — this
  session has no shell tool — so the key count is read from `SCHEMA` and from the derived
  `cid/_contract.md`, the same route `theme/vocabulary/04` took for the same reason.
