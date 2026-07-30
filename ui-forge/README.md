# ui-forge

Stage 1 of the arga pipeline: **game context → good-looking Roblox UI, consistently.**

The premise is that "Claude writes ugly Roblox UI" is not a prompting problem. It is
two missing systems:

1. **Constraint** — nothing stops a generator from inventing `#3A3A3A` and 7px padding.
2. **Feedback** — nothing renders the result, so nobody ever sees it before it ships.

This package supplies both.

```
game-context.json ──► generateTheme() ──► theme tokens
                                            │
                        ui spec (data) ─────┼──► transpile() ──► HTML
                                            │                      │
                                            │              Playwright render
                                            │                      │
                                            │            ┌─────────┴─────────┐
                                            │        measure              screenshot
                                            │            │                    │
                                            │        validate ──► findings   PNG ──► critique
                                            │                         │              │
                                            └──► emit Luau      fix spec ◄────────────┘
```

## Run it

```bash
npm install && npx playwright install chromium   # once
npm run render -- --viewport all
```

Outputs `out/<spec>.<viewport>.{html,png}`, `out/theme.json` and
`out/<spec>.findings.json`. **Exits non-zero when any rule errors**, so it gates
rather than relying on someone remembering to look.

## The full pipeline

```
game idea  ->  ideation department  ->  build  ->  verification
   JSON        creative, LLM,           pure       rules, then vision
               schema-constrained       function
```

```bash
npm run forge -- --context examples/game-context-heist.json --viewport all --screens 3
```

One command: plan the screen set, design each brief, compile, render at three
viewports, run the rules, and run a vision critic. Writes briefs, PNGs and
`forge.report.json`.

**Ideation** (`src/ideate/`) is three desks, deliberately split so each output is small
enough to validate hard:

| Desk | Decides | Guard |
|---|---|---|
| `screens.mjs` | which screens this game needs, and why | rejects any pattern that isn't in the registry |
| `brief.mjs` | layout, content, art prompts for one screen | compiles the brief immediately; retries once on violations |
| `critic.mjs` | whether the render actually looks good | told what the rules already checked, so it doesn't re-find them |

**Content limits are enforced, not suggested.** The designer's instinct is to write
descriptions where the layout expects labels — "Kit Locker — Gear Up for Ghost or Loud"
as a title, "Ghost — No Pagers, Cameras Disabled" as an item name. Both are good writing
and both overflow. Character budgets are stated in the prompt *and* checked afterwards,
with one retry that feeds the exact violations back. That change alone took a run from
33 rule errors to 2.

**The critic's findings are already in patch form.** Each one carries a `feedback` string
written as a designer's instruction, which is exactly what `npm run feedback` consumes —
so a critique can be applied without anyone retyping it.

**Critiques that repeat across screens are pattern bugs.** When the critic flagged the
saturated red close button on every screen it reviewed, that wasn't three findings — it
was one defect in `modal-grid`. Dismissing a panel is not destructive, and red for it
outweighed each screen's actual primary action. It is now neutral, with red moved to
hover where it confirms intent instead of competing.

## Idea / build separation

The seam between "creative" and "mechanical" is a **validated brief**, not a prompt.
A prose instruction — however specific — has to be re-interpreted downstream, and
interpretation is where variance re-enters. Briefs are data, so they can be checked.

```
idea agent ──► screen-brief.json ──► compose() ──► spec ──► render ──► validate
   creative        validated         pure code    artifact
```

`compose()` is deliberately **not an agent**. The brief carries every decision needing
judgement; turning it into a spec is mechanical. An LLM here would be slower,
non-reproducible, and free to drift from the token system in ways the validator can
only catch after the fact. A compiler can only emit what it was built to emit.

**The pattern registry is the capability contract.** `validateBrief` rejects anything
outside a pattern's declared parameter space, so an idea agent cannot specify a screen
the build side has no way to produce:

```bash
node ui-forge/src/cli.mjs capabilities     # feed this to the idea agent
npm run brief -- --brief briefs/shop.brief.json --viewport all
```

```
unknown pattern "radial-wheel"; available: modal-grid
variant.columns = 9 is out of range; allowed: 1, 2, 3, 4
```

### Customization: four escalating layers

Enumerated variants are the *default*, not the limit. A user reviewing a built game will
ask for changes nobody anticipated, and the brief has to carry them. Freedom escalates,
and the validator gates every layer identically:

| Layer | Lives in | Answers |
|---|---|---|
| `variant` / `ornament` | brief | "four columns, portrait cards" |
| `overrides` | brief | "make the close button round" |
| `slots` | brief | "add an event banner above the items" |
| `tokenOverrides` | game context | "make the buy buttons pink" |

**Overrides** target any named node by name or glob, and replace properties wholesale:

```json
{ "node": "Item_*", "set": { "corner": "radius.xl",
    "stroke": { "color": "accent.primary", "thickness": "stroke.base" } } }
```

They throw when a target matches nothing, listing every addressable node. A silently
ignored override is the worst outcome — the user sees no change, no error, and reports
the feature as broken.

**Arbitrary values enter through tokens, never as literals in a spec.** "Make it hot
pink" overrides `color.accent.primary`; specs still only reference tokens, so reskin
keeps working. Overrides are applied *before* `onColor` is derived, so an overridden
accent still gets a readable foreground computed against the new colour rather than
inheriting one computed against the old.

`briefs/shop-v2.brief.json` is a worked example: five plain-language feedback requests
carried as declarative data. Applying them broke two things — the added banner plus a
larger item name pushed the panel 6px past a phone, and the new purple landed at 4.35:1
against its text. Both were caught mechanically, not by eye.

That is the safety story. The parameter space was never the guarantee; **tokens and the
validator are**, and they hold however the tree was assembled.

```bash
npm run brief -- --brief briefs/shop-v2.brief.json \
  --context examples/game-context-feedback.json --out out-v2 --viewport all
```

### Where variety comes from

Not from freeform layout — from `patterns × archetypes × variants × content`. One
pattern (`modal-grid`) with four briefs produces a 3-column card shop, a 4-column
portrait inventory with badges and per-item actions, a 2-column banner-header crate
store, and a quest list of rows. All twelve render/viewport combinations validate
clean.

Layout is roughly 15% of perceived identity; art and surface treatment dominate. On
Roblox specifically, conventional layout is a *feature* — currency top-right, dismiss
top-right, grid shops are learned conventions for an 8-14 audience, and deviating
costs usability. Identity should be spent on treatment, not topology.

Novelty beyond the parameter space is affordable *because* the validator exists:
generate freely, validate hard, fall back to the pattern on repeated failure. The
library is the floor, not the ceiling.

**Specs are build artifacts — never hand-edited.** When a critic finds a problem it
edits the brief and recompiles. If repairs touch the spec directly, the brief stops
describing reality and the chain rots.

## Validation

Rendering blind was the original problem; rendering and then only *eyeballing* the
result is the same problem with extra steps. After render, Playwright measures every
element's real box and computed paint values, and `src/validate/rules.mjs` scores that
snapshot with deterministic arithmetic — no model judgement:

| Rule | Catches |
|---|---|
| `containment` | a child escaping (or being clipped by) its parent's content box |
| `on-screen` | anything rendering outside the viewport |
| `touch-target` | buttons below the audience-derived minimum |
| `contrast` | text below WCAG ratio against its *composited* backdrop |
| `text-fits` | non-wrapping text silently cut off |
| `font-loaded` | a fallback face invalidating every text measurement above |

These exist to keep the expensive taste-level critique from spending its attention
re-finding overflow bugs. They earn their keep: `touch-target` fires on a 44px button
that looks fine on every screen but breaks the 48px floor a 62%-mobile audience
demands, and `contrast` caught white-on-salmon price text the moment the shop panel
was reskinned onto a light palette.

## Responsive

Roblox has no media queries, and offsets are absolute pixels at every resolution — so
a panel that reads well on a monitor is unusable on a phone. Any node can carry an
`at` table of per-viewport-class overrides, shallow-merged over its base:

```js
at: { mobile: { size: { s: [0.86, null], auto: 'y' }, padding: 'space.lg' } }
```

Shipped Luau reads `AbsoluteSize` and applies the same table at runtime — same data,
applied later.

## The three layers

**Theme** (`src/theme/`) — `generateTheme(ctx)` turns game context into a complete
token set: palette, spacing scale, radius scale, type ramp, elevation, touch targets.
Art direction comes from one of six archetypes (`palettes.mjs`), each an internally
consistent design language, so a screen can never mix two visual grammars. Audience
data feeds real derivations: a mobile-heavy game gets 48px touch targets, an 8-14
age band gets a larger type floor.

**Spec** (`examples/*.spec.mjs`) — a plain declarative tree. Every style value is a
token reference (`bg: 'surface.raised'`), never a literal. `resolveToken` throws on
an unknown token rather than falling back, because a silent fallback is exactly how
an invented color reaches production.

That indirection is what makes *reskin* a file swap: change the theme, keep the layout.
Since the pipeline's core verb is reskinning existing games, this is load-bearing.

**Transpile / emit** (`src/transpile/`, `src/emit/`) — the spec is data, so it can be
read without executing it. HTML for the preview loop; Luau for the game. Emitters are
pure functions of the same spec, which keeps the output-format choice reversible.

## The fidelity contract

**The preview may only express what the Roblox engine can reproduce.**

If the preview can do something Roblox can't, the critic approves a look that ships
broken — which makes the whole loop worse than useless. Concretely:

- **No CSS `box-shadow`.** Roblox has no box-shadow. Depth is a separate 9-slice
  ImageLabel. The transpiler emits a real sibling `<div>` so the DOM stays isomorphic
  to the Instance tree. The single sanctioned `blur()` stands in for a pre-blurred
  9-slice asset — a real, shippable thing.
- **No `backdrop-filter`**, no web-only blend modes, no `filter` on content.
- **Text does not wrap** unless the spec says so (Roblox `TextWrapped` defaults false).
- **Offsets are absolute pixels at every resolution**, exactly as in-engine. This is
  why the mobile preview catches real mobile bugs.
- **The stage behind the UI is neutral grey**, never the theme background. Previewing
  UI against its own palette flatters contrast and hides UI that vanishes in gameplay.

Mappings are chosen for behavioural equivalence, not visual approximation — e.g.
`UIStroke` becomes CSS `outline`, not `border`, because neither affects layout.

## Reskin

Reskinning is the pipeline's core verb, so it gets a worked example: `shop.spec.mjs`
renders under both `game-context.json` (cartoon-vibrant, dark) and
`game-context-cozy.json` (minimal-soft, light) with **zero spec changes**.

That only holds because foregrounds on filled swatches are *computed*, not fixed.
`content.inverse` cannot be right for both a dark and a light palette — so
`color.onColor.*` picks the readable foreground per swatch at theme-generation time,
and specs reference `onColor.primary` rather than naming a colour. Without that, every
reskin onto a lighter palette ships unreadable button text.

```bash
npm run render -- --context examples/game-context-cozy.json --out out-cozy --viewport all
```

## Assets

Generated art has the *same* failure mode as generated layout, one layer down: six
independently-prompted icons come back with six lighting setups, outline weights and
perspectives, and the set reads as clip-art rather than as one game.

So assets get their own version of the token system — a **style contract** derived from
the same archetype that drives the theme (`src/assets/style.mjs`). Every prompt inherits
a byte-identical style block; only the subject line varies. That repetition is the
mechanism that makes a set cohere.

```bash
node ui-forge/src/cli.mjs assets --brief briefs/shop-galaxy.brief.json \
     --context examples/game-context-galaxy.json --show planet-magenta-ringed
```

Planning is deliberately separate from generation — reviewing prompts is far cheaper
than reviewing images.

```bash
# stub provider needs no key and emits real transparent PNGs
node ui-forge/src/cli.mjs assets --generate --provider stub --brief ... --out out-assets/galaxy
node ui-forge/src/cli.mjs render --brief ... --assets out-assets/galaxy
```

**Provider:** `gpt-image-1`, chosen for native `background: "transparent"` — the only
major API with it, which removes an entire background-removal stage. Two API facts are
load-bearing: transparency *requires* png/webp output, and there is no negative-prompt
parameter, so exclusions are folded into the prompt body. Set `OPENAI_API_KEY`.

### Asset validation

Image models fail in ways invisible one-at-a-time and obvious in a set. Decoding runs
through headless Chrome's canvas, so no image library is needed.

| Rule | Catches |
|---|---|
| `baked-background` | opaque corners — the subject was never cut out |
| `scale-outlier` | subject much larger/smaller than the set median (jittery grids) |
| `off-center` | subject off-centre, which reads as misalignment once tiled |
| `off-palette` | dominant colour far from any theme accent or surface |
| `no-margin` | subject filling the canvas edge to edge |
| `empty` | effectively blank output |

`off-palette` compares **perceptual colour distance, not contrast ratio**. Contrast only
measures luminance, so a lime green and a gold at similar brightness score as
near-identical — the first version of this rule passed a bright green planet in a game
with no green in its palette. Status colours are excluded from the comparison too: they
are UI semantics (error red, success green), not art direction.

Assets that fail validation are **left as placeholders** rather than substituted into
the spec. Showing a known-bad asset would launder a defect into something that looks
deliberate.

Caching is keyed on the prompt hash, so editing the style contract regenerates the whole
set — correct, since the set must stay coherent — while a no-op re-run costs nothing.

## Shipping to Roblox

```bash
npm run emit -- --brief briefs/roster.brief.json --context examples/game-context-elements.json
cd game && rojo serve      # connect the Rojo plugin in Studio, then Play
```

Emits three things into `game/src/shared/`: `Theme.luau` (tokens), `Screens/*.luau`
(the spec as a **data table**, not code), and `UIBuilder.luau` (the runtime).

Specs stay data on the Roblox side too. If the emitter flattened them into imperative
`Instance.new` calls, the shipped tree and the validated tree could drift with nothing
to notice. Every mapping in `UIBuilder.luau` is the counterpart of one in
`to-html.mjs` — change one, change the other, or calibration diverges.

Assets without a real `rbxassetid` render as **magenta boxes**, on purpose. A missing
asset should be impossible to ship past.

## Calibration

Everything the validator has ever reported rests on one unproven assumption: that the
HTML preview renders what the engine renders. This is what checks it.

```bash
npm run calibrate -- --brief briefs/roster.brief.json --context examples/game-context-elements.json
# then in Studio: enable HTTP requests, rojo serve, press Play
```

`game/src/client/calibrate.client.luau` builds the screen, measures what the engine
actually laid out, and POSTs it to a local receiver. `compare.mjs` diffs the two.

Both sides are normalised to **viewport fractions** before comparing — the Studio window
is never exactly 1920×1080, and comparing absolute pixels would report a scale
difference as a thousand layout bugs. Two preview-only artefacts are erased first: the
wrapper/Surface pair an elevated node renders as (both named the same, where the engine
builds one instance), and the `ScreenGui` root the probe measures relative to.

Until this has run against your Studio, treat every "clean" as a hypothesis.

## States and motion

A button with one static appearance reads as broken however good it looks.

```js
states: { hover: { scale: 1.03 }, pressed: { scale: 0.97 }, disabled: { bgTransparency: 0.6 } },
motion: { enter: 'pop', duration: 0.26, easing: 'back' }
```

Only properties Roblox can actually tween are accepted; anything else throws. Two traps
this cost us, both now guarded:

- **Anchor and rotation share `transform`.** A keyframe writing `transform: scale(1)`
  silently discarded `translate(-50%,-50%)` and dropped the centred panel down-right by
  half its size. Entrances and state deltas now compose with the base transform.
- **Animations must settle before measuring.** Sampling mid-tween reported a 48px button
  as 43px and tripped the touch-target rule for a defect that did not exist at rest. The
  harness now awaits `document.getAnimations()` before reading geometry.

A subtree fade needs a `CanvasGroup` — Roblox has no inherited transparency — so the
emitter switches class automatically and the transpiler warns when it will.

## Feedback in plain language

```bash
npm run feedback -- --brief briefs/roster.brief.json --context examples/game-context-elements.json \
  --say "the cards feel cramped, and make the SELECT buttons less loud" --write
```

The model emits a **patch against the brief**, never a spec, which is then compiled by
the same deterministic path as everything else. A hallucinated node name or an
out-of-range variant fails loudly at validation.

It is given the addressable node list, the token list, and the **property vocabulary**.
That last one was learned the hard way: without it the model produced
`{ background, textColor, typography }` — all plausible, all wrong, and all *silently
ignored* by the transpiler. Unknown override properties now throw.

## Known gaps

- **Art is placeholders.** We cannot invent `rbxassetid://` values. Placeholder boxes
  are labelled so a critic judges composition and never mistakes missing art for a
  layout bug. The Open Cloud Assets API is the eventual path to real IDs.
- **No Open Cloud upload.** Generated PNGs are local files. Until they are uploaded and
  the index carries real `rbxassetid` values, every image is a magenta box in Studio.
  This is the single thing between here and a shippable screen.
- **Calibration has never been run.** The harness and comparator are built and the
  comparator is verified against synthetic drift, but nobody has pressed Play in Studio.
  Every "clean" is still a hypothesis until that happens.
- **No unit tests.** Theme generation, token resolution and the colour maths are pure
  functions and trivially testable; they aren't tested yet. The Luau is syntax-checked
  by `luau-compile` but never executed outside Studio — Lune would fix that.
- **ViewportFrame is unverifiable in preview.** A live 3D model cannot render in a
  browser. The node is always flagged, and only a Studio check can confirm it.
- **Webfonts are Google-hosted stand-ins** for Roblox fonts. Metrically close, not
  identical. `font-loaded` warns when one doesn't resolve, but a Studio screenshot
  pass is the eventual ground truth.
