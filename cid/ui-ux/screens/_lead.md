# Screens — domain index

**Category:** UI/UX · **Wave:** 5 · Reads: `HANDOFF.md`, `CONCEPT.md`, `00-CORE.md`,
`01-FOUNDATION.md`, `02-GAMEPLAY.md`, `03-META.md`, `04-PRESENTATION.md`, `OPEN.md`;
`cid/ui-ux/_category.md`; `cid/_contract.md`, `cid/_state.md`, `cid/_digest.md`;
`cid/gameplay/meta/02-the-collection.md`, `cid/gameplay/systems/03-rarity-ladders.md`,
`cid/gameplay/onboarding/03-teaching-order.md`, `cid/gameplay/onboarding/04-run-one-withholds.md`,
`cid/theme/vocabulary/01-naming-form.md`, `/02-banned-words.md`, `/04-coinage-intake.md`,
`cid/theme/tone/02-flavour-and-humor.md`, `/04-do-nots.md`,
`cid/theme/identity/02-role-legibility.md`, `architect/sheets/06-representation.md`;
`ui-forge/src/compose/index.mjs`, `ui-forge/src/compose/patterns/modal-grid.mjs`,
`ui-forge/src/theme/generate.mjs`, `ui-forge/src/emit/runtime/UIBuilder.luau`,
`ui-forge/briefs/`, `game/src/client/IndexScreen.luau`, `bridge/verify-sheets.mjs`.

## What the brief gave me

Only one line of the brief is *about* my subject. Everything else that binds me arrives through
an approved key, and I relay each at its true tag rather than at the tag its relay carried.

| constraint | tag |
|---|---|
| *"Deriving the full screen set is UI's job."* + the four-row table `collection-index` / `upgrades` / `areas` / `shop` — `04-PRESENTATION.md` | **untagged** → treat as `[brief: soft]`. Two of the four rows are already deleted; see gap G3 below |
| *"`collection-index` … the 24-relic 4-set roster — **the differentiator's home**"* — `04-PRESENTATION.md` | `[brief: soft]` |
| *"Distinction lives in the **hidden-collection layer**, not the noun"* — `00-CORE.md` | **`[brief: binding]`** ← `[you chose: R1 Q1]` |
| *"Target: the **smallest game that still gives every creative area real work.**"* — `00-CORE.md` | **`[brief: binding]`** ← `[you chose: R1 Q3]`. One screen is the compliant answer, not a thin one |
| *"**8–14, mobile-heavy, short sessions**"* — `00-CORE.md` | **`[brief: binding]`** ← `[you chose: R1 Q4]`. The `~70/25/5` split inside it is `[brief: soft]` ← `[I assumed]` and uncorroborated (`cid/_state.md`) |
| *"**No text, no tutorial.**"* — `02-GAMEPLAY.md` | `[brief: soft]` ← `[you accepted: R6 Q3]`, read through `onboarding/03`: *"a permanent ban on instruction, not a ten-second ban on strings — labels, counts, costs and names are legal from the first frame, imperatives never are"* |
| *"**There is no failure state** … **Zero tension is deliberate** … nobody downstream should invent tension to fill the gap"* — `02-GAMEPLAY.md`, `HANDOFF.md` | `[brief: soft]` on the state, **`[brief: binding]`** on the instruction (`tone/04` `D6`) |
| *"Rarity tiers must differ by **shape or silhouette, not only hue**"* — `04-PRESENTATION.md` | `[brief: soft]` ← `[you accepted: R6 Q4]` in the brief; `architect/06` already treats it as binding and a shipped build depends on that reading |
| *"**Forbidden:** any paid area, relic, or set"* — `03-META.md` | `[brief: soft]` ← `[you accepted: R5 Q4]`. No locked slot with a price, no paywalled set heading |
| Priority 3: *"real procedural generation · rebirth · offline accrual · codes · daily rewards · leaderboards · trading · seasons and events"* — `03-META.md` | `[brief: soft]` on provenance, **hard as a gate**. No reserved slot, tab or region held open for any of them |
| *"**Humor lives only in relic flavour text.** … No relic name is a pun."* — developer, 2026-07-30, carried by `theme/tone/02` | **`[brief: binding]`**, and it presupposes a field that exists in no key. Sheet 04 |
| `ui-forge` vibe key `fantasy-ornate` — `04-PRESENTATION.md` | `[brief: soft]`. **Not mine** — panel art, icon, colour and font are Art & Visuals — UI Art |

**Approved keys I may not re-decide.** `collection` (24 Finds, 4 sets of 6, `relicsPerArea` 3,
`areasPerDepth` 2, per R-2) · `rarity` (the four set headings are the *only* place the find-set
ladder is legible anywhere; `rarity.forbidden` bans rarity colour, frame, glow, border, sparkle
and badge on a Find or a slot) · `firstSession` (the panel is absent at join, lifted by
`beat:firstReveal`, latched; `suppressionForbidden` bans `padlockOrLockGlyph`,
`greyedOrDimmedRow`, `questionMarkPlaceholder`, `unknownDenominatorForm`, `explanatoryTooltip`,
`liftAnimation`, `liftSound`, `newBadgeOrDot`, `reSuppression`, `unrevealedFindsInCount`,
`percentFormOfCollectionCount`, `reflowOnLift`) · `representation`
(*"four labelled groups … A held name reads as its name; an unfound name reads as an empty slot.
**NOTHING ELSE**"*; only `pressables` and `index-screen` may create a `GuiObject`) ·
`vocabulary` (`casing: "title"`, `maxLabelChars: 14`, `maxSentenceWords: 12`,
`allowedPattern: "^[A-Za-z0-9 ,.'%%/-]+$"`, eight banned words — **em dash, middot, colon,
`?` and `!` are all outside the pattern and therefore illegal**) · `setBonus` (*"UI/UX has no
bonus screen … No bonus list, no bonus tooltip, no per-set reward preview"*) · `endgame`
(no end screen, no congratulation, no completion percentage) · `discovery` (no reachable
duplicate, so no "already found" toast and no slot that fills twice) · `products` `F19`
(no product named, shown or priced on any in-game surface) · `theme/identity/02`
(*"Identity requires no surface from you"*) · `tone/04` `D6`–`D8`, `D10`, `D11`, `D13`, `D15`.

## What the brief did not give me

Each routed to the sheet that will decide it. Nothing here is filled by me.

| # | gap | routed to |
|---|---|---|
| G4 (category) | **No global on-screen copy budget.** `theme/vocabulary/01`: *"unset anywhere in the brief"*, routed to screen work. `vocabulary` bounds one label; nothing bounds a screenful | **03** |
| G5 (category) | **Rendered typography, font size, wrap behaviour and whether a label class displays uppercase** are handed to UI/UX and stated nowhere. `theme/vocabulary/01` adds that all ten of its character ceilings are *"provisional on a measured render"* and *"the number moves down on your measurement"* | **03** |
| G2 (category) | **No error or system copy exists and nobody owns it.** `theme/tone/01`: *"unowned; nearest holder is UI/UX."* The brief has no failure state so it never contemplated a failure *message*, but a DataStore load failure is real and shipped | **02** (the copy). The *surface*, if any, is Feedback UI's |
| G10 (category) | **No contract path exists for a screen title, a button label or an empty-state string.** `theme/vocabulary/04` makes every one of my strings a renderable coinage with `requestsPath` unfilled | **01**, by proposing `screens` — that key *is* the path. Every sheet still files its own ` ```coinage ` block with `requestsPath` and `surface` |
| G13 **new** | **`modal-grid` cannot produce the surface `architect/06` names it for.** Three independent counts, below. The brief's *"`ui-forge` capability warning"* says the index *"fit[s] that shape well"*; it does not | **01**, as a finding to state, not to design around. Consequence for `ui-forge` pattern work and contract-and-seam work |
| G14 **new** | **`collection.sets[].relics[]` is an array of bare strings**, so there is no per-Find object to hang a flavour line, an art key or anything else on. Three approved sheets (`tone/02`, `identity/02`, `identity/04`) are waiting on this by name | **04**, as a revision request against `collection` — which `gameplay/meta` owns and I may not edit |
| G15 **new** | **Nothing anywhere states whether the panel carries a title, a close control, or a scroll region.** `representation` names class, name, parent and contents only; `modal-grid` *requires* `content.title`; the shipped `IndexScreen.luau` has none of the three and its own comment says *"NONE OF THIS IS SPECIFIED ANYWHERE"* | **01** |
| G16 **new** | **No state is specified for the window between join and the first snapshot**, nor for a snapshot that arrives without `found`, nor for a slot that fails to resolve. All three are live code paths in `IndexScreen.luau` and each currently produces a silent, differently-shaped nothing | **02** |
| G17 **new** | **The theme's type ramp renders a Find name at 12 px** (`caption`) and a set heading at 16 px (`label`) — `ui-forge/src/theme/generate.mjs:21-24` — against external guidance of 14–18 px for mobile body text, on a `[brief: binding]` mobile-heavy 8–14 audience. `UIBuilder.luau` emits `TextWrapped` and `AutomaticSize` and emits **no** `UITextSizeConstraint`, **no** `TextScaled` and **no** `TextTruncate`, so there is no truncation mechanism and no floor | **03** |

**Consequences I am handing to neighbouring subjects rather than acting on:**

- **Navigation** — the shipped surface sets `frame.Active = true`, which absorbs every press
  inside its bounds. `core-loop/01` requires buying be *"reachable from anywhere in the area
  with no travel"*. Whether a purchase press may land while the panel is open is a concurrency
  ruling, not a composition one. I state the panel's extent; the ruling is yours.
- **HUD (`composition`)** — the panel carries **no count and no denominator**. `0 / 24` is a HUD
  readout. If a second one appeared here the denominator rule would have to be got right twice.
- **Feedback UI (`notices`)** — `onboarding/03` `T6` forbids any unrequested panel, *"which
  includes a first-Find celebration modal"*. Nothing I own opens itself.
- **Platform & Input (`viewport`)** — sheet 03 sets a *minimum rendered text size* and a wrap
  rule. The scaling curve across phone / tablet / desktop / console that has to satisfy it is
  yours, and so is the touch-target floor.
- **Art & Visuals — UI Art (wave 6)** — you own the typeface, the type-ramp values, the panel
  art and the icon set. Sheet 03 owns only the *rules* those values must satisfy. If the ramp
  moves, sheet 03's floor is the thing it has to clear.

## My rulings on the three candidate surfaces

Ruled, not skipped, as my category lead required.

1. **`areas` is not a screen, and no screen replaces it.** `meta/04` makes the next area
   *"enterable at the instant one completes, with no threshold, no cooldown and no travel worth
   measuring"*, and `onboarding/03` rank 7 teaches depth *"by arrival"* through *"an opening
   that needs no explanation — no label, no marker, no gate"*. There is nothing to navigate, so
   there is nothing to draw. `screens` records it as deliberately absent with that reason.
   The *navigation-graph* consequence (that the graph has one openable node, not two) is
   **Navigation's** and I do not write it.
2. **`shop` is not a screen and may not become one.** Deleted by ruling R-4; `products.F19`
   forbids naming, showing or pricing a product on any in-game surface. `screens` records it as
   forbidden, not merely absent — *"naming one of these in order to forbid it is compliant"*.
   The offer path that does exist is **Store UI's** `offerSurface`.
3. **A per-Find flavour surface is a live question and I am assigning it, not answering it.**
   It is the only one of the three that could still resolve to *yes*, because a
   `[brief: binding]` developer decision puts humor at exactly one path
   (`collection.sets[].relics[].flavour`) and `theme/identity/02` routes its existence to
   screen-inventory work by name. It is **sheet 04**, and it is the one sheet in this domain
   whose output is a request against another domain's key.

   I also rule on the brief's fourth table row while I am here: **`upgrades` is not a screen.**
   Three purchase readouts and three `Pressable_BUY*` buttons are persistent HUD elements
   (`representation.pressable`, `hud.brief.json`), so that row is **HUD's** `composition`,
   not an opened surface.

## Why 4 sheets

I own no key in `cid/_contract.md`, so the count is anchored to the one key I propose,
`screens`, plus the smallest set of rules that shape its value without being it. **Sheet 01
carries the `manifest`.** Sheets 02–04 carry no `manifest` block and file plain ` ```json `
amendments addressed to 01, which folds them — the pattern `theme/vocabulary/01`, `/03` and
`/04` already used against `/02`, and the only pattern that does not trip one-key-one-sheet in
`bridge/merge.mjs`. The split is by *kind of decision*, not by heading: 01 decides what is on
the surface, 02 decides what the surface is when it has nothing to show or something has
failed, 03 decides how any string in this game renders and how much of it a screen may hold,
and 04 decides whether one content field exists at all. Two of those (02, 03) answer brief
gaps that no key states and that the category's verification `checks` require of every screen;
one (04) is a decision three approved sheets are blocked on by name. I considered folding 04
into 01 — the flavour node is literally a slot child — and kept it separate because its output
is a revision request against `collection`, which is a different artifact with different
acceptance criteria from a hierarchy. I considered a fifth sheet for the `modal-grid`
producibility finding and rejected it: a finding is not a decision, and it belongs in 01
beside the hierarchy it constrains.

| # | sheet | must decide |
|---|---|---|
| 01 | `collection-index` | The complete element hierarchy of the one screen this game has — the order of the four set groups, what one slot structurally *is* when it holds a name and when it does not, whether the panel carries a title, a close control and a scroll region, and every string it holds; plus the screen inventory itself, recording `areas`, `shop` and `upgrades` as deliberately absent with their reasons; supplied as the proposed `screens` manifest, and stating as a finding whether `modal-grid` can produce it. |
| 02 | `panel-states` | What the collection surface shows in each of its five states — absent before the first Find, present with zero slots filled, open before the first snapshot has landed, open on a snapshot that carries no `found` map, and open after a build or slot-resolution failure — and what string, if any, each carries, including the system copy for a save-load failure that `theme/tone/01` says nobody owns. |
| 03 | `text-policy` | How a stored Title Case string renders on screen — whether any label class is displayed uppercase, the minimum rendered text size and how it survives `GuiService.PreferredTextSize`, whether a label wraps or truncates and which mechanism produces that given `UIBuilder` emits neither `TextTruncate` nor `UITextSizeConstraint` — and the global per-screen copy budget the brief leaves unset. |
| 04 | `find-flavour` | Whether a per-Find flavour line exists at all; if it does, the revision request against `collection` that turns 24 bare strings into `{ name, flavour }` objects and the node it occupies inside a slot; if it does not, that the `[brief: binding]` *"humor lives only in relic flavour text"* decision is vacuous and the game ships with zero humor anywhere, stated to the developer rather than absorbed. |

**The contract key this domain needs.** `screens` does not exist in `cid/_contract.md`'s 25.
It would hold: the screen inventory as a list, each entry carrying `id`, `pattern`,
`openedBy`, and a `forbidden` list for the surfaces recorded as absent; per screen, its element
tree as named nodes with their order; per screen, its enumerated states and the string each
state carries; and every player-facing string on it at a real path, so that
`playerFacingStrings()` reaches a screen title and an empty-state line the way it already
reaches a tier name. That last part is the point: **`screens` is the answer to G10**, which is
the reason five CID categories currently have no route into the register at all, and the reason
`SHARDS` and `RELICS` shipped in a file the merger could not see.

## Verification note

**Sheet 03 is the one most likely to be contradicted, and by two different owners.**
`docs/cid-workflow.json` gives **Art & Visuals — UI Art** (wave 6) the word *"typography"* in
its `owns` list, and it will hold the typeface and the type-ramp values that sheet 03 sets a
floor against. The boundary I am drawing, and the one a verifier should check first, is that
**03 states rules a value must satisfy and names no value UI Art owns** — no font, no ramp
number, no colour. Second, **Platform & Input** (`viewport`) owns the scaling curve, and a
minimum-rendered-size rule is a constraint on that curve; if the two disagree the failure will
look like a text-size argument and will actually be about whose key holds the number.

Second most likely: **sheet 04**, by **Meta & Content**, which owns `collection` and may refuse
the revision. That refusal is a legitimate outcome and 04 must be written so that the *no*
branch is as complete as the *yes* branch.

Least likely but worth naming: **sheet 01's `modal-grid` finding could be closed by a pattern
change rather than by me**, and if `ui-forge` grows group headings the finding stops being
true. 01 must state the finding as of the file it read, with the line numbers, so a later
reader can re-check it rather than inherit it.

## Research owed

**My node in `docs/cid-workflow.json` carries no `must_verify`.** I fetched anyway, because
whatever I bank is the only external evidence my writer can cite.

**Fetched this run, and usable:**

- `[research: https://create.roblox.com/docs/production/publishing/accessibility]` and its
  source `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/production/publishing/accessibility.md]`
  — *"The **Text Size** setting maps to the `GuiService.PreferredTextSize` property which
  defaults to `Medium`"*; elements using `UITextSizeConstraint` *"won't expand beyond their
  `MaxTextSize` or shrink below `MinTextSize`, regardless of player preferences"*; labels with
  `TextScaled` enabled *"bypass the `PreferredTextSize` value entirely"*; `AutomaticSize`
  objects *"resize their bounds as text size changes"*; when `TextWrapped` is active *"text
  flows to additional lines as `PreferredTextSize` increases"*. On colour: *"over 5% of people
  in the world have some form of color blindness"*, and the advice is to *"use different
  symbols alongside colors"*. This is the platform corroboration for the brief's
  shape-not-hue constraint, and it is what makes sheet 03's wrap-versus-truncate call a
  decision with an accessibility consequence rather than a taste.
- `[research: https://create.roblox.com/docs/ui/size-modifiers]` — `UITextSizeConstraint`
  *"specifies a minimum and maximum font size for a GuiObject with text"*, and the docs advise
  against `MinTextSize` below 9. `UISizeConstraint` and `UIAspectRatioConstraint` *"override
  the layout and control the object's size"* when combined with a layout.
- `Enum.PreferredTextSize` has four members — `Medium` (default), `Large`, `Larger`, `Largest`
  — reachable via `GetPropertyChangedSignal`.
  `[research: https://create.roblox.com/docs/reference/engine/classes/GuiService]`
- A repeated third-party recommendation of **a fixed `TextSize` of 14–18 for mobile body text**,
  on the ground that `TextScaled` shrinks text to fit and often makes it unreadably small.
  `[research: https://kitsblox.com/blog/fix-roblox-ui-scaling-mobile]` — **treat as a
  practitioner opinion, not a platform figure.** It is the only number I found and Roblox
  publishes none; sheet 03 must not present it as sourced from Roblox.

**Read in the repo this run, and load-bearing:**

- `ui-forge/src/compose/patterns/modal-grid.mjs` — `meta.variant.columns` is `[1,2,3,4]`;
  `meta.slots` is exactly `['panelTop','panelBottom']`; `validateContent` requires
  `content.title` and requires `name`, `price` **and** `art` on **every** item
  (`modal-grid.mjs:475-487`). **Three counts on which `modal-grid` cannot produce the specified
  index surface:** (a) a set is six wide and `columns` caps at four, and the pattern chunks one
  flat item list — there is no per-group container; (b) there is no heading node between rows
  and only two panel-level slots, so the four set headings that `rarity` makes *"the only place
  the second rarity ladder is legible anywhere in the game"* have nowhere to go; (c) an
  **unfound slot has no name, no art and above all no price**, and `products.F19` plus
  `tone/04` `D8` forbid a price appearing on this surface at all. `validateBrief` rejects
  outside its declared space (`index.mjs:44-76`), so this is a compiler refusal, not a
  reviewer's opinion.
- `game/src/client/IndexScreen.luau` — the surface currently ships hand-built with
  `PANEL_WIDTH_SCALE = 0.9`, `PANEL_HEIGHT_SCALE = 0.72`, `SURFACE_Z_INDEX = 10`, six slots per
  row at `1/slotCount` width, a `caption` slot label and a `label` set heading, no title, no
  close control, no scroll region, and its own comment reading *"NONE OF THIS IS SPECIFIED
  ANYWHERE"*. Every one of those is a value sheet 01 or 03 should be supplying.
- `ui-forge/src/theme/generate.mjs:21-24` — `caption` 12 px, `body` 15 px, `label` 16 px,
  `title` 22 px, `heading` 30 px.
- `ui-forge/src/emit/runtime/UIBuilder.luau:440-526` — emits `AutomaticSize` from `node.auto`,
  `TextWrapped` from `node.wrap`, `TextSize` from the theme ramp, and `AutomaticCanvasSize` on
  a scrolling frame. **It emits no `TextScaled`, no `TextTruncate` and no
  `UITextSizeConstraint`**, so of the four mitigations the accessibility doc names, this build
  has exactly one.

**Owed and not obtained — say so, do not paper over it:**

- **A measured render.** `theme/vocabulary/01` conditions all ten of its character ceilings on
  *"one `npm run render` of `collection-index` and `upgrades` at phone viewport with the real
  strings in place, which has never been done with a stage-0-derived context."* **I have no
  shell tool in this session**, so I could neither run it nor run `npm run bridge -- --contract`
  (I read `cid/_contract.md`, which is that command's derived output, plus `bridge/schema.mjs`'s
  consumers). This is the single fetch that would settle sheet 03's numbers, and until it runs
  every ceiling in 03 is `[playtest unknown]` with a stated test range.
- **A shipping Roblox collection-index precedent** — an in-client screenshot or a fan wiki page
  from a game with a finite roster showing how it draws an unfound slot. `theme/tone/02` records
  the same fetch as owed (two source types returned 402 and 405) and `cid/_state.md` carries it
  as still open after the wave-2 batched pass. I did not obtain it either. `[unverified]` —
  the settling fetch is a Roblox game page or wiki reproducing a collection panel with empty
  slots visible. Nothing in sheets 01–04 may rest on a claim about what the genre does here.

## Not decided here

Which strings the panel actually says, what an empty slot is drawn as, the group order, the
state copy, the case transform, the copy budget, and whether the flavour field exists — all four
sheets, above. Panel art, icon artwork, colour, the typeface and the type-ramp values
(Art & Visuals — UI Art, wave 6). How the panel is opened and closed, what may be open at once,
and what the body does while it is (Navigation). Every persistent readout and the clusters they
form (HUD). Notices, dwell and queueing (Feedback UI). Scaling, safe area, gamepad focus order
and the touch-target floor (Platform & Input). Whether any in-game trigger for a purchase is
permitted (Store UI). The 24 Find names and the four set labels (`collection`, `gameplay/meta`).
The models behind them (Art — Objects). Whether `bridge` gains the ` ```coinage ` parser
(contract-and-seam work; if it does not, every string this domain writes has no route into the
register).
