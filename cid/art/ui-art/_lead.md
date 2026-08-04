# UI Art — domain index

**Category:** Art & Visuals · **Wave:** 6 · **Writes to:** `cid/art/ui-art/_lead.md`

**Reads (actually read this run, not cited from a retelling):** `concept/spec/incremental-spinoff-v2/`
— `HANDOFF.md`, `CONCEPT.md`, `03-META.md` (scope ordering), `04-PRESENTATION.md`, `OPEN.md`
(§1–§6). Category: `cid/art/_category.md` (all 685 lines). Run state: `cid/_contract.md`,
`cid/_state.md`, `cid/_playtest.md`. Upstream wave 5: `cid/ui-ux/_verified.md`,
`cid/ui-ux/hud/01`, `/03`, `cid/ui-ux/screens/01`, `/03`, `cid/ui-ux/feedback/01` (grepped for
motion/dwell). Repo: `ui-forge/src/theme/palettes.mjs`, `ui-forge/src/theme/generate.mjs`,
`ui-forge/src/compose/index.mjs`, `ui-forge/src/compose/patterns/hud-overlay.mjs`,
`ui-forge/src/compose/patterns/modal-grid.mjs`, `ui-forge/src/emit/to-luau.mjs`,
`ui-forge/src/emit/runtime/UIBuilder.luau`, `ui-forge/src/cli.mjs`, `ui-forge/briefs/hud.brief.json`,
`game/src/shared/Theme.luau`, `game/src/shared/Screens/hud.luau`,
`concept/src/derive/game-context.mjs`, `bridge/schema.mjs`.

**Note on my own path.** `docs/cid-workflow.json:1549` gives `writes_to` as
`/cid/art/ui-art/_lead.md`; `cid/art/_category.md:556` says `cid/art/ui/_lead.md`. The graph is
what `cid:pack` and `cid:verify` read, so I wrote to the graph's path. Recorded so a reader
looking in the other directory knows why it is empty.

---

## What the brief gave me

The brief says almost nothing about interface art. Every line it does say is below, quoted.

| quote | source | tag |
|---|---|---|
| *"**`ui-forge` vibe key: `fantasy-ornate`**"* | `04-PRESENTATION.md:8`, `CONCEPT.md:47`, `HANDOFF.md:105` | `[you accepted: R6 Q2 → R5 Q2]` → **`[brief: soft]`** |
| *"In words: ornamented, warm, aged, crafted. Stone and foliage, not candy."* | `04-PRESENTATION.md:10` | `[brief: soft]` |
| *"**`cartoon-vibrant` would fight the fiction.** An ancient ruin in candy colours loses the discovery mood, even though it is the safest choice for an 8–14 mobile audience."* | `04-PRESENTATION.md:18-19` | `[brief: soft]` |
| *"**Relics must read as treasure.** The collection is the differentiator; `fantasy-ornate` is the only archetype built for ornament and age."* | `04-PRESENTATION.md:14-15` | `[brief: soft]`, **already narrowed** by `theme/lore/01` (*"Art must not add gold, gilding or gemstones to compensate"*) and `theme/setting/01`. That narrowing was aimed at world dressing; whether it reaches a UI token is a question my sheet 02 must answer, not assume. |
| *"**Tone note:** warm and unhurried, not spooky. This is reclamation, not a haunted place."* | `04-PRESENTATION.md:21` | `[brief: soft]`; enumerated as `D1`–`D15` by `theme/tone/04` — inherit, do not re-derive |
| *"**Hard constraint: rarity tiers must differ by shape or silhouette, not only hue.** … **This is a requirement, not a nicety**"* | `04-PRESENTATION.md:29-35` | `[you accepted: R6 Q4]` → `[brief: soft]` in the brief, **effectively binding** (`architect/06` and `tiers` both ship on the binding reading). Reaches my surface only as the general rule: no state distinction carried by colour alone. |
| *"**8–14, mobile-heavy, short sessions.**"* | `00-CORE.md` | `[you chose: R1 Q4]` → **`[brief: binding]`** |
| *"the **smallest game that still gives every creative area real work**"* and *"content design is the primary creative work on this project, **not art**"* | `00-CORE.md` | `[you chose: R1 Q3]`, `[you chose: R1 Q1]` → **`[brief: binding]`** |
| *"Left open — … how overgrowth tiers read at a glance on a phone …"* | `04-PRESENTATION.md:23`; `OPEN.md §4` | untagged → `[brief: soft]`. `cid/art/_category.md:50` rules this the one surviving open item of the four, and it is a **world** legibility question, not a UI one. It is Style Guide's and Objects', not mine. |
| Priority 3 — *"real procedural generation · rebirth · offline accrual · codes · daily rewards · leaderboards · trading · seasons and events"* | `03-META.md:80-82` | `[I assumed — the ordering]` → `[brief: soft]` on provenance, **hard as a gate** |

**Scope check.** None of my subject is priority 3. There is no UI surface for any excluded item —
no code-entry field, no daily-reward plate, no leaderboard panel, no rebirth control — and
`screens/01`'s `forbiddenNodes` and `feedback/01`'s `forbidden[]` already name each of them in
order to forbid it. My sheets do not restate that list; they inherit it. **No sheet below may
add a token, icon, ornament value or motion state whose only consumer would be a priority-2 or
priority-3 surface.**

---

## What the brief did not give me

Every row is a gap, routed to the sheet that has to decide it. Nothing here is filled by me.

| # | the brief is silent on | routed to |
|---|---|---|
| A1 | **Which artifact carries the archetype, and what re-derives `Theme.luau`.** The brief names `fantasy-ornate` and stops. `HANDOFF.md:107` states the reason plainly: *"**no code currently reads these sheets** — the bridge from markdown to `game-context.json` does not exist yet."* | **01** |
| A2 | **Whether any archetype token is overridden for this game at all**, and the reason each override needs. The brief supplies no colour, no hex, no palette hint. | **02** |
| A3 | **What "ornamented … crafted" is worth as a value**, given `validateBrief` admits exactly four ornament booleans and there is no panel-artwork, frame-texture or 9-slice parameter anywhere. | **02** |
| A4 | **Every typographic value.** The brief names no typeface, size, weight, tracking or reading level. `screens/03` set a 14 px floor and explicitly *"set[s] no ramp value"* and hands the ramp to me. | **03** |
| A5 | **Whether the two icons exist at all**, what they depict, how big they are, and what bounds them. `budgets` says UI icons are *"the only image assets in the build"* and sets **no count, dimension or memory ceiling** (category gap G10). | **04** |
| A6 | **The second, non-colour affordability channel.** `input.pressable.affordabilityByColourAlone: false` names the prohibition; no key names the channel. `composition` supplies the *words* (`Ready`/`Short`/`Max`); the *visual* channel is unowned (category gap G8/H5). | **05** |
| A7 | **What a `fantasy-ornate` pressable readout looks like in each of its states at 70 px over live play** — named in `cid/ui-ux/_verified.md` predicted-conflict 2 as *"a wave-6 question nobody has asked."* | **05** |
| A8 | **Every motion value.** The brief says nothing about animation. Motion is not archetype-derived at all: it is hard-coded per pattern, so an archetype swap changes colour, radius, stroke and font and changes **nothing** about how anything moves. | **06** |
| A9 | **An icon's accessible name has no contract path.** `theme/vocabulary/04` makes every UI string a renderable coinage and notes the ` ```coinage ` parser may not exist in `bridge/merge.mjs` (category gap G12). | **04**, as its own coinage filing |
| A10 | **Whether `theme/lore/01`'s no-gold overrule reaches a UI token.** It was written about world dressing; `fantasy-ornate`'s `accent.primary` is `#D4A34A`, a gold. Nobody has said whether that is the ornament the lore sheet refused or an unrelated interface colour. | **02**, as a `## Pushing back` if it decides the overrule does reach it |

---

## Why six sheets

**One contract key, six sheets, and that needs justifying against the anchor.** `npm run bridge --contract` lists 25 merged keys (`cid/_contract.md`); `uiTheme` is not among them and does not appear in `bridge/schema.mjs`. So I own **one proposed key** and by the strict reading I get one sheet. I am not taking that reading, because wave 5 established the mechanism that makes a multi-sheet key legal and the merger accepts it: **one sheet `provides` the key and the rest carry `amends` blocks against it** — `hud/02` and `hud/03` amend `composition`, `screens/03` amends `screens`, all four passed `bridge`. Sheet 01 provides `uiTheme`; 02–06 amend it. No two sheets claim the key.

The split is by *decision*, not by heading, and it is exactly my graph `owns` list plus the two things the category assigned me by name. 01 is the archetype and its enforcement — the defect. 02 is panel and frame art. 03 is typography. 04 is the iconography set. 05 is button and widget styling plus the affordability channel. 06 is UI motion style. Five of the six are one bullet of `owns` each; 01 is the root they all resolve against and is separable because *which archetype ships* and *how a wrong one is caught* is a different decision from *what any surface is made of*. I considered folding 06 into 05, since the only motion this game permits is a press state and a fade. I kept it, for one reason found in the source: `actionButton()` ships `motion: { duration: 0.11, easing: 'back' }` (`hud-overlay.mjs:196`) — `back` is `Enum.EasingStyle.Back`, an overshoot (`UIBuilder.luau:26-33`) — and that value is **archetype-independent**. Correcting the archetype fixes the purple and leaves the bounce. A sheet that does not exist cannot notice that.

**What I considered and did not assign, with the reason:**

- **A separate "colour palette" sheet.** Colour is not separable from panel treatment here: the only legal way colour enters is `tokenOverrides` on paths that also carry radius, stroke and gradient, and a palette decided apart from the surfaces it paints is the "parallel list of names" failure. Folded into 02.
- **A "reskin rules" or "visual identity" sheet.** That is the register, and `theme/vocabulary` and `theme/tone` own the register; `theme/tone/04` `D1`–`D15` is already the checkable form. Restating it would be a second copy of somebody else's key.
- **An index-panel-art sheet separate from 02.** `screens/01` rules the index surface `producibleBy: null, refusedBy: "modal-grid"` and hand-built by `index-screen`. Its panel treatment is the same token set as every other surface. One decision, not two.
- **A sheet on rendered case, label copy or number format.** All three are `composition` and `screens/03`. Not mine, at any tag.
- **A sheet on cluster geometry, touch targets, safe areas or z-order.** `composition` and `viewport`. My `does_not_own`.
- **A sheet on world-side tokens (gap G3).** Named by the category as **Style Guide's to name**. My sheet 02 must say whether a UI-side additive token group could host a world palette and what would have to read it, and must **not** name a world colour.
- **A sheet on the 24 Finds' icon form (gap G6).** Shared with Objects. `representation.find` rules a Find has **no Instance at any point in its life** and `modal-grid`'s `art` requirement is refused by `screens/01` count P3, which is itself refused as a producer of that surface. My sheet 04 rules only on **the two HUD icons that exist in a shipped brief**, and states the consequence for G6 without deciding an Objects subject.
- **A sheet on the store or any offer surface.** `store/01` and `products.F19`. There is nothing to skin.

---

| # | sheet | must decide |
|---|---|---|
| 01 | `archetype-and-lock` | Rule that `fantasy-ornate` is the archetype this game emits, and supply `uiTheme` as the complete `artDirection` block `generateTheme(ctx)` consumes — then decide the enforcement that makes emitting any other archetype a build failure rather than a note: name the artifact each side compares (`game/src/shared/Theme.luau` `meta.archetype`/`meta.sourceTitle` against `uiTheme.archetype`), the file and function the check lives in, and who runs it; state that `ui-forge/src/cli.mjs:121` defaults `args.context` to `examples/game-context.json` (the Pet Ascend Simulator demo, `"vibe": "cartoon-vibrant"`) and that this default is the mechanism that produced the shipped theme; state that `concept/src/derive/game-context.mjs` is the only producer of a consumable context, that **no `concept.json` exists anywhere in the repo** so it cannot be run for this brief, and that it carries only `vibe`/`mood`/`paletteHints`/`referenceNote` — no `tokenOverrides`, no `tokens` — so the key needs a named writer, filed as a third request against the same `ok && --emit` gate owner that `hud/03` and `theme/vocabulary/03` already petitioned; and state plainly that the archetype cannot legally be emitted until sheet 03's font-stack defect is closed. |
| 02 | `surface-and-ornament` | Decide what every panel, plate, chip and frame in this game is made of, as `artDirection.tokenOverrides` dotted paths with a stated reason per override and nothing left as a literal — and rule on what `fantasy-ornate`'s promise of *"ornamented … crafted"* actually buys, given the producible vocabulary is four booleans (`cardBadge` none/ribbon/pill, `panelTrim` none/top-accent, `readoutTrim` none/accent-edge, `barCap` flat/round) plus `radiusScale` 0.6, `strokeWeight` 2/4 and `gradientStrength` 0.16, and there is **no token or parameter anywhere for panel artwork, a frame texture or a 9-slice**; say in one sentence what that delivers and what it does not, and if the promise cannot be met, file it as a capability finding with file and function rather than softening the promise; rule whether `theme/lore/01`'s *"no gold, gilding or gemstones"* reaches `color.accent.primary` `#D4A34A` and push back on one of the two sheets if it does; rule whether an additive `artDirection.tokens` group is added and, for each one, name the file and function that must read it, because a group nothing reads is a value with no consumer; and state the boundary that the `variant` and `ornament` values for `hud-overlay` are already fields of `composition` (`hud/01` manifest, `readoutTrim: "none"`, `barCap: "round"`), so a different value is a revision request against `composition` and never a second copy of the field here. |
| 03 | `type-ramp-and-font-stack` | Decide the whole type ramp — role, size, tracking and font per step — against `screens/03` `R2`'s 14 px floor, which retires `caption` at 12 px from player-facing use and is `[playtest unknown]` with test range 12–18; correct the arithmetic before you set anything, because `typeScaleFor('8-14')` returns **1.15**, not 1.06 (`generate.mjs:54-59`: `lower = 8`, `lower <= 9`), so the shipped ramp is already `caption` 14 / `body` 17 / `label` 18 and the floor may already be met without moving a number; and close the defect that blocks the archetype: `FONT_STACKS['serif-ui'].numeric.roblox` is `'MerriweatherBold'` (`palettes.mjs:150`), which is **not a member of `Enum.Font`** — `Merriweather`, `SourceSans`, `FredokaOne`, `Gotham` and `GothamBold` all are — while `UIBuilder.luau:482` does `inst.Font = (Enum.Font :: any)[t.font] or Enum.Font.Gotham`, so under `fantasy-ornate` every numeric readout in the game either throws (killing `UIBuilder.build` and the whole client, the precedent the file's own comment at `:464-467` records) or silently renders in `Gotham`; decide the replacement as a `type.numeric.font` override for this game **and** file the `palettes.mjs` correction, and state which of the two branches you could not verify. |
| 04 | `iconography` | Rule whether the interface has any icons at all, and if it does, decide the closed inventory — today `hud.brief.json` names exactly two, `icon: "find"` and `icon: "shard"`, which `hud-overlay.mjs:101-108` emits as a 20×20 `ImageLabel` named `ReadoutIcon` carrying `image: { placeholder }`, resolved by `to-luau.mjs:84-86,126-131` to a real `rbxassetid` only if an asset index supplies one and otherwise painted `Color3.fromRGB(255, 0, 200)` at 0.5 transparency by `UIBuilder.luau:514-517`, which is what the shipped `game/src/shared/Screens/hud.luau:69,153` will render today; weigh deleting both against `representation`'s *"no asset id is needed anywhere"* and its `grep -rn "rbxassetid" game/src` returns nothing criterion, and against `budgets`' `uploadedImageAssetsInWorldGeometry: 0`; if any icon survives, decide its form against `theme/tone/04` `D13` (no face, eyes or mouth on any icon) and `D8` (no padlock), its rendered size against `sizing.iconSm/Md/Lg` (24/34/48 at `minTouchTarget` 48), and propose the count, dimension and memory ceiling that closes gap G10 as a value for **Tech — Performance** to ratify into `budgets`; and file each icon's accessible name as a ` ```coinage ` entry per `theme/vocabulary/04`, naming that the parser may not exist. |
| 05 | `pressable-states-and-affordability` | Decide what the four game-drawn pressables (`Pressable_INDEX`, `Pressable_BUY1/2/3`) are made of in every state — rest, pressed, disabled/maxed, affordable, unaffordable — as token references only, and decide the **second, non-colour visual channel** that satisfies `input.pressable.affordabilityByColourAlone: false`, given `composition.copy` already supplies the words `Ready`/`Short`/`Max` on `ReadoutState` with `primaryChannel: "text"` and `colourIsSecondaryOnly: true`, so your channel is a third signal and must not be a fifth pressable, a badge, a padlock or a strikethrough (`D8`), a pulse or a blink (`D6`), or a red alert state; answer the question `cid/ui-ux/_verified.md` predicted-conflict 2 raises and nobody has — whether a `fantasy-ornate` pressable readout is legible over live play at the 70 px phone / 120 px tablet floor `hud/03` `U3` establishes; note that `UIBuilder.applyStates` binds only `MouseEnter`/`MouseButton1Down` on a `GuiButton` (`:303-345`), so a hover state is unreachable on ~70% of the audience and any state you spend on hover is spent on nothing; and cite WCAG SC 1.4.1 — *"Color is not used as the only visual means of conveying information, indicating an action, prompting a response, or distinguishing a visual element"* — as the general form of the brief's shape-not-hue constraint rather than re-deriving it. |
| 06 | `ui-motion` | Decide the closed list of what may move on any interface surface, with a duration and easing for each and an explicit zero for everything else, against `theme/tone/04` `D6` (no pulsing or blinking element), `firstSession` `S6`/`S7` (a lift is silent and still, `suppressionForbidden` bans reflow), `screens/01`'s `forbiddenNodes` (`fillAnimation`, `liftAnimation`, `tween`, `pulse`, `blink`), `theme/tone/03` `B5` (exactly one intensity forever, nothing ramps toward a completion) and `notices.motion.animated: false` with `fadeInSeconds`/`fadeOutSeconds` 0.15 which is `feedback/01`'s and not yours to move; state the finding that motion is **not archetype-derived** — `actionButton()` hard-codes `states.hover.scale 1.05`, `states.pressed.scale 0.94` and `motion: { duration: 0.11, easing: 'back' }` at `hud-overlay.mjs:191-197`, `back` being `Enum.EasingStyle.Back`, an overshoot (`UIBuilder.luau:26-33`) — so correcting the archetype removes the candy colours and leaves a cartoon bounce on every purchase press; decide whether `theme` grows a `motion` token group and, if so, state the exact additive-group key needed, because `generate.mjs:172-176` splits the group name on `.` and routes to `theme.color` only when the root segment is literally `color`, so a top-level `motion` group must be written as `<anything-but-color>.motion` and the root segment is otherwise discarded; and name the file and function that must read it, since no pattern reads a motion token today. |

---

## Verification note

**Sheet 02 is the one most likely to be contradicted, and the contradictor is `composition`.**
`hud/01`'s manifest already carries `variant` and `ornament` as fields of `composition`, populated
with `readoutStyle: "pill"`, `bar: "chunky"`, `readoutTrim: "none"`, `barCap: "round"`. Those are
style decisions living in a UI/UX key. My category brief assigns "the ornament parameter values
inside the declared space" to me. If sheet 02 writes them, two keys claim one field and the merger
rejects both after both are written. I have instructed 02 to state the rule and file a revision
request instead. **A verifier should check that `uiTheme` contains no `variant` or `ornament`
object, and that any disagreement with `composition`'s values appears as a `## Pushing back`
section naming `cid/ui-ux/hud/01-persistent-surface-composition.md`.** `composition` is also
mid-revision — `cid/ui-ux/_verified.md` returned **FAIL** with RR-8 rewriting `hud/01` to absorb
four other domains' requirements — so its field set will move under sheet 02 between writing and
verification. Cite its fields; do not copy its values.

Second most likely: **sheet 03 against `screens/03`.** `screens/03` predicted this collision itself
and drew the boundary correctly (it names no ramp value), so the resolution should be cheap —
except that its stated consequence, *"that retires `caption`"*, rests on the ramp being `caption`
12, and at `typeScaleFor('8-14') = 1.15` the emitted ramp is already `caption` 14. If sheet 03
confirms that reading, `screens/03`'s consequence paragraph is stale and the correction is a
build-report finding against a sheet that is otherwise approved and untouched by any RR.

Third: **sheet 04 against Objects, on gap G6.** Whether a Find has an icon form is shared, and
`representation.find`'s *"A Find has no Instance at any point in its life"* is an approved
technical key. Sheet 04 must rule only on the two HUD icons and must state its answer to G6 as a
consequence for Objects rather than as a decision.

---

## Research owed

**`must_verify` for this node is empty** (`docs/cid-workflow.json:1538-1553` carries no
`must_verify` field). I fetched anyway, because my writer has no fetch tools and whatever is not in
`cid/_research/pack.md` it must decide on reasoning alone.

**Fetched, and each is load-bearing for a sheet above:**

- `https://create.roblox.com/docs/reference/engine/enums/Font` — enumerates `Enum.Font`.
  `Merriweather` (32), `SourceSans` (3), `FredokaOne` (26), `Gotham` (17), `GothamBold` (19) are
  members; **`MerriweatherBold` is not.** 50 members plus `Unknown`. This is the whole basis of
  sheet 03's blocking defect. `[research: url]`
- `https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/ui/appearance-modifiers.md`
  — `UIStroke` on a `Frame` is a border with `LineJoinMode` Round/Bevel/Miter; on a `TextLabel`
  `ApplyStrokeMode` Contextual outlines the glyphs and Border the bounds, and two `UIStroke`s may be
  parented to control both; *"Both the parent object and `UIStroke` can have child `UIGradient`
  instances, letting you set gradients on the stroke and fill independently"*; `UICorner` at
  *"a scale of 0.5 or higher deforms the parent into a pill shape"*; and the warning *"Avoid
  tweening the `Thickness` property of a `UIStroke` instance applied to text objects."* This is
  sheet 02's evidence that the platform offers more ornament than the emitter spends — `UIBuilder`'s
  `applyStroke` (`:118-130`) writes only `Color`, `Thickness` and `Transparency`, sets no
  `LineJoinMode`, and parents no `UIGradient` to a stroke. `[research: url]`
- `https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/ui/9-slice.md` — 9-slice
  needs `ScaleType.Slice`, a `SliceCenter` rect, and *"a valid Roblox image asset with an ID entered
  into the `Image` field"*. `UIBuilder.luau:500-507` implements it; **no pattern emits `slice` on any
  node**. So the emitter can render frame art and nothing can ask it to, and asking would import an
  uploaded image asset against `representation`'s *"no asset id is needed anywhere."* Sheet 02's
  finding. `[research: url]`
- `https://www.w3.org/WAI/WCAG21/Understanding/use-of-color.html` — SC 1.4.1, normative: *"Color is
  not used as the only visual means of conveying information, indicating an action, prompting a
  response, or distinguishing a visual element."* Sheet 05's general form of the brief's
  `[brief: soft]`-but-effectively-binding accessibility constraint. `[research: url]`
- `https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/luau/enums.md` — fetched
  specifically to settle what an invalid Enum index does. **It does not say.** Recorded as a
  negative result rather than left implied.

**Could not verify, and the specific fetch that would settle each:**

1. **Whether `(Enum.Font :: any)["MerriweatherBold"]` throws or returns `nil`.** The creator docs are
   silent; forum evidence shows the error form *"X is not a valid member of Enum"*
   (`https://devforum.roblox.com/t/mousebutton2-is-not-a-valid-member-of-enumkeycode/2888739`,
   `https://devforum.roblox.com/t/uitheme-is-not-a-valid-member-of-enum/2472340`), which implies an
   error and therefore that `UIBuilder.luau:482`'s `or Enum.Font.Gotham` fallback never runs.
   **`[unverified]`.** Settled by one line in Studio: `print(pcall(function() return (Enum.Font ::
   any).MerriweatherBold end))`. **Sheet 03 does not need it resolved** — both branches (client dies,
   or numerals silently render in the wrong family) are closed by the same one-line change, and the
   sheet must say so rather than pick a branch it cannot source.
2. **A rendered phone-viewport screenshot of this game's HUD and index under `fantasy-ornate`.**
   `screens/03` already carries this as `[research owed:]` for its own 14 px floor. Nothing in
   wave 6 can settle a legibility question by argument; `npm run render -- --brief
   ui-forge/briefs/hud.brief.json --viewport all` against a `fantasy-ornate` context has never been
   run, and `CLAUDE.md` known gap 6 records that `forge` has never run on a stage-0-derived context
   at all. Sheets 02, 03 and 05 must each mark their size and contrast values `[playtest unknown]`
   with a test range and name this one command as what settles them.
3. **A published Roblox ceiling for UI image assets** — count, dimension or memory. Nothing was
   found; `budgets` states none exists and Roblox instructs developers to test on a chosen baseline
   device instead. Sheet 04's ceiling proposal is therefore `[cid: decided]` with a test range, not
   `[research: url]`, and must say so.

---

## The contract key this domain needs

**`uiTheme`** — proposed, not merged. It is absent from `bridge/schema.mjs` and from
`cid/_contract.md`'s 25 rows. What it must hold, in the two shapes `generateTheme` can actually
consume plus the inventories nothing else owns:

| field | what it holds | sheet |
|---|---|---|
| `archetype` | the `ARCHETYPES` key emitted; the value `resolveArchetype` must return | 01 |
| `sourceTitle` | what `meta.sourceTitle` must equal; today it is `"Pet Ascend Simulator"` | 01 |
| `emission` | the artifact path, its generator, its gate, and the check that fails a build on a mismatch | 01 |
| `tokenOverrides` | dotted `deepSet` paths with a value and a reason each; `deepSet` throws on an unknown path, so a typo cannot silently no-op | 02, 03, 05 |
| `tokens` | additive groups, each naming the file and function that must read it | 02, 06 |
| `ornamentRule` | what ornament is deliverable as, and the refusal where it is not; **not** a copy of `composition.ornament` | 02 |
| `icons` | the closed inventory, each with a form rule and a rendered size, plus the proposed budget for `budgets` | 04 |
| `affordanceChannel` | the non-colour visual channel, its states, and the count of channels per state | 05 |
| `motion` | the closed list of animatable properties with duration and easing, and explicit zeros | 06 |

`bridge` will report it as a proposal and not merge it until someone writes a shape in
`bridge/schema.mjs`. That is expected; the proposal is the deliverable.

---

## `ui-forge` capability changes this key requires

Collected here so the deduplication `cid/ui-ux/_verified.md` predicted-conflict 4 asks for can
happen once. **`architect/06` records that no module in the build order owns `ui-forge`'s briefs**,
so every one of these has no owner today and "refused" is the default outcome, not an unlikely one.
Each sheet states its own `ifRefused`.

| id | file · function | change | sheet | why |
|---|---|---|---|---|
| `A1` | `ui-forge/src/theme/palettes.mjs` · `FONT_STACKS['serif-ui'].numeric.roblox` (line 150) | replace `'MerriweatherBold'` with a real `Enum.Font` member | 03 | it is not a member; under `fantasy-ornate` every numeric readout either throws in `UIBuilder.luau:482` or silently falls back to `Gotham`. **Blocks 01.** A `type.numeric.font` override closes it for this game; the file fix closes it for every game. |
| `A2` | `ui-forge/src/cli.mjs` · `main()` line 121 | require `--context` rather than defaulting to `examples/game-context.json` | 01 | the default is the Pet Ascend Simulator demo with `"vibe": "cartoon-vibrant"`, and it is the mechanism that put the wrong theme in `game/src/shared/Theme.luau`. A default that silently themes a game after a different game is exactly the class `CLAUDE.md` means by *"make bad output impossible"*. |
| `A3` | `concept/src/derive/game-context.mjs` · `deriveGameContext(concept)` | carry `artDirection.tokenOverrides`, `artDirection.tokens` and the icon inventory through to the emitted context | 01 | it emits only `vibe`, `mood`, `paletteHints`, `referenceNote`, so **no override or additive group `uiTheme` holds can reach `generateTheme` today** — the key would merge and change nothing. |
| `A4` | contract-and-seam work · a named script on the `ok && --emit` gate | write the `game-context.json` this brief has no producer for | 01 | `deriveGameContext` consumes a `concept.json` and **no `concept.json` exists in the repo**; the stage-0 spec is markdown. This is the **third** request against one owner, after `bridge/emit-hud-brief.mjs` (`hud/03`) and `bridge/emit-terms.mjs` (`theme/vocabulary/03`), and it should be scoped as one job. |
| `A5` | `ui-forge/src/emit/runtime/UIBuilder.luau` · `applyStroke(inst, theme, node)` (lines 118-130) | read `node.stroke.lineJoinMode`, and allow a `UIGradient` child on the stroke | 02 | the platform supports both; the emitter writes only `Color`, `Thickness`, `Transparency`. This is the cheapest real increment in "ornate" available without an uploaded asset. **Optional** — 02 must say whether it takes it or refuses it, and what the refusal costs. |
| `A6` | `ui-forge/src/compose/patterns/*.mjs` · `meta.ornament` | if 02 concludes the four booleans cannot carry the archetype's promise, name the parameter that would and where it goes | 02 | `validateBrief` (`compose/index.mjs:55-64`) rejects anything outside `meta.variant`/`meta.ornament`, so this is a capability finding and not something a brief can ask for. |
| `A7` | `ui-forge/src/compose/patterns/hud-overlay.mjs` · `actionButton(a)` and the new pressable readout (lines 178-198) | take `states` and `motion` from tokens rather than hard-coding `scale` 1.05/0.94 and `duration` 0.11 / `easing` 'back' | 06 | motion is currently archetype-independent, so no archetype swap can ever change it. Overlaps `hud/03` `U1`/`U3`, which already rewrite this function — **fold into `U1`, do not file twice.** |
| `A8` | `ui-forge/src/theme/generate.mjs` · the additive-`tokens` loop (lines 172-176) | make the group's root segment meaningful, or document that only `color` is routed and everything else lands at the theme root | 06, 02 | `group.split('.')` discards the root unless it is literally `color`, so `"motion.ui"` silently creates `theme.ui`. A seam that mis-routes on a plausible input is the failure the token system exists to prevent. |

**Already filed by wave 5 and not re-filed here:** `hud/03` `U1`–`U6`, `screens/01` `P1`–`P4`,
`screens/03`'s `UITextSizeConstraint` emitter. My sheets cite them and add nothing to them.
