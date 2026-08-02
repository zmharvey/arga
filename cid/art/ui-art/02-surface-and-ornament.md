# 02 — What every surface is made of, and what "ornate" actually buys

**Domain:** art/ui-art · **Category:** Art & Visuals · **Wave:** 6

## Decision

**Every panel, plate, chip and frame in this game is painted by an unmodified `fantasy-ornate`
token. This sheet adds zero token overrides and zero additive groups.** What it adds is an
**edge**: a `UIStroke` on the two node classes nobody assigns one to (`IndexSurface` and the 24
index slots), a closed list of token refs no brief or module may resolve, and the ruling that
`fantasy-ornate` buys a coherent warm surface language and **no ornament in the sense the word
implies**, permanently, on an asset ground rather than a capability one.

## Why

**Zero overrides is the decision, not an omission.** `CLAUDE.md` binds *"arbitrary values enter
through tokens, never as literals"* and the category brief adds the half that matters here:
*"every override needs a reason, because an unreasoned override is the literal the token system
exists to prevent"* `[research: cid/art/_category.md]`. I looked for a reason and the arithmetic
says there is none. Every token this game actually resolves is either already correct against an
approved constraint or is unreferenced by any pattern.

**The figure-and-ground arithmetic, which is the whole case for the archetype.** Rec.601 luma of
the surfaces, computed not asserted: `surface.base` `#2E2419` = **37.74**, `sunken` `#211A12` =
**27.18**, `raised` `#3D3123` = **50.99**, `overlay` `#150F0A` = **16.22**, `content.primary`
`#F5E9D0` = **233.73**, `content.muted` `#8A7856` = **121.50**, `border.subtle` `#54432E` =
**69.69**, `accent.primary` `#D4A34A` = **167.51**. `styleGuide.roles["stone.cleared"]` computes
to **201.84** `[research: cid/art/_verified.md]`. So every HUD plate sits 150 to 186 luma points
below the world behind it, which is the brief's own surviving reason for the archetype: *"green
overgrowth on warm stone is naturally high-contrast"* `[brief: soft]`.

**Where the separation is thin, it is closed by an edge rather than by a colour change**, and
that is what the adjacency table below is for. Two fills that share a rendered edge are 10.6
apart in exactly one place, the index panel against its 24 slots, and a hairline stroke at 69.69
resolves it. The pair a reviewer will reach for first, `accent.primary` against cleared stone at
**34.3**, is **not an adjacent pair**: the bar fill never shares an edge with the world, because
the `surface.sunken` track and its `border.subtle` hairline always sit between them. My first
draft of criterion 4 measured that pair and asked for a judgment; the table measures the pairs
that actually touch and asks for arithmetic. Same decision, checkable.

**Does `theme/lore/01`'s *"no gold, gilding or gemstones"* reach `color.accent.primary`
`#D4A34A`? No.** That overrule was written about world dressing and about the 24 Finds, in a
`## Pushing back` against *"relics must read as treasure"*, and `theme/setting/01` restates it as
*"carving, casting, dressed joints and pattern in the paving"*. Gilding is a **material** claim:
a metallic response to light on a modelled object. A flat hex fill on a 2D plate has no material,
no reflectance and no object to gild. **The boundary I add rather than the reach I refuse:** no
UI element may depict metal as a material (no metallic multi-stop gradient, no bevel, no
specular highlight, no gem or facet shape), and no world surface may adopt `#D4A34A`. That keeps
both sheets true and needs no revision against either. `[cid: decided]`

**What "ornamented, warm, aged, crafted" buys, in one sentence.** It buys `radiusScale` 0.6
(radii 0/2/5/7/12/pill), `strokeWeight` 1/2/4, `gradientStrength` 0.16 with a 0.224 accent sheen,
a serif display face, four warm parchment surfaces and one ochre accent: a coherent, warm, aged
interface. **It buys nothing anyone would call ornament**: no frame art, no corner piece, no
carved border, no panel texture.

**And the refusal is an asset refusal, not a capability one, which corrects my own index.**
9-slice is fully implemented at `UIBuilder.luau:500-507`, and `slice` is a member of `SPEC_PROPS`
in `ui-forge/src/compose/overrides.mjs:34`, so a brief **can** already request it through an
`overrides[].set` entry on any named node without touching a pattern
`[research: ui-forge/src/compose/overrides.mjs]`. What it cannot do is supply the image: 9-slice
requires *"a valid Roblox image asset with an ID entered into the `Image` field"*
`[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/ui/9-slice.md]`,
against `representation`'s *"no asset id is needed anywhere"*, `budgets.uploadedImageAssetsInWorldGeometry`
0, and my own sheet `04`, which sets the interface's image count to zero. **So panel artwork is
refused for the life of this project and the pattern registry is not the reason.** `A6` is filed
as the parameter that would be needed if the asset rule ever moves, and not as a request.

**The one real increment available without an asset, taken.** `applyStroke` writes `Color`,
`Thickness` and `Transparency` and nothing else (`UIBuilder.luau:118-130`), while the platform
offers `LineJoinMode` Round/Bevel/Miter on a `UIStroke` and permits a `UIGradient` child on the
stroke itself `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/ui/appearance-modifiers.md]`.
**I take `lineJoinMode` (`A5`) and refuse the stroke gradient.** A miter join is one enum with a
visible effect at radii of 2 to 7 px, which is where this archetype lives; a gradient on a 1 to 4
px edge is a second gradient system nobody can see at 70 px on a phone, and `gradientStrength`
already exists for surfaces. `A5` is refusable: if refused, every stroke renders with the default
round join and nothing else in this key changes. The visible size of the difference is
`[unverified]`, settled by the same render.

**Zero additive `tokens` groups here.** A group nothing reads is a value with no consumer; the
only group this domain adds is sheet `06`'s `ui.motion`, which names its readers.

| adjacent fill pair | Δ luma | arm it passes on | passes |
|---|---|---|---|
| bar fill `accent.primary` / bar track `surface.sunken` | 140.33 | (i) ≥ 40 | yes |
| readout chip `surface.overlay` / cleared stone | 185.61 | (i) ≥ 40 | yes |
| index panel `surface.base` / cleared stone | 164.10 | (i) ≥ 40 | yes |
| index panel `surface.base` / slot `surface.sunken` | 10.56 | (ii) a `UIStroke` between them, added by this sheet | yes |
| control `surface.raised` / chip `surface.overlay`, affordable and unaffordable | 34.77 | (ii) the state edge, 4 px or 1 px, sheet `05` | yes |
| control `surface.sunken` (maxed) / chip `surface.overlay` | 10.96 | (iii) carries `content.muted` text at 94.32 from its own fill | yes |
| bar fill `accent.primary` / cleared stone | 34.33 | **not adjacent**: the track and its hairline always sit between them | n/a |

| token ref | verdict | reason |
|---|---|---|
| `surface.base`, `sunken`, `raised`, `overlay` | ship unmodified | 150 to 186 luma below the cleared-stone role |
| `content.primary`, `secondary`, `muted` | ship unmodified | `muted` at 121.50 on `overlay` at 16.22 is a 105-point separation inside a filled chip |
| `accent.primary` | ship unmodified | its only adjacency is its own track at 140.33; the 34.33 against stone is not an adjacent pair |
| `border.subtle`, `border.strong` | ship unmodified | `subtle` at 69.69 is 31.95 above `surface.base`, which is what makes an added edge read |
| `accent.secondary` `#7A9E6B` | **forbidden to reference** | a sage green on a green world blurs figure and ground; its only consumer is `Trim`, which `composition` sets to `none` |
| `accent.tertiary` `#9B6BC4` | **forbidden to reference** | a violet, and the playtest's words were *"big purple boxes"*; its only consumer is `modal-grid`'s `cardBadge`, and there is no badge in this game |
| `status.danger` `#B85450` | **forbidden to reference** | `theme/tone/04` `D6` bans a red alert state; `D12` removes every "you cannot do that" signal |
| `status.warning` `#D4A34A` | **forbidden to reference** | its only consumer is `cardBadge` pill; a badge is banned by `rarity.forbidden` |
| `status.success`, `status.info` | **forbidden to reference** | nothing succeeds or informs on this surface; `response.negativeBeats` is 0 and there is no counterpart |
| `onColor.*` for any forbidden fill | **forbidden to reference** | derived from a fill nothing may use |
| `sizing.minTouchTarget` (48) | **forbidden to read as a touch floor** | `viewport.classes.<class>.minTargetPx` is the single source; two answers for one number is the defect class `platform/02` exists to prevent |
| `sizing.iconSm/Md/Lg` (24/34/48) | inert | sheet `04` sets the icon count to zero |
| `radius.pill` (999) | permitted only where `screens` or `composition` already assigns it | a capsule is the shape language the brief argued against; see the two revision requests |

| node | added property | value | reason |
|---|---|---|---|
| `IndexSurface` | `UIStroke` | `color: border.strong`, `thickness: stroke.base` (2), `transparency: 0`, `lineJoinMode: Miter` | the only frame this game has; the panel fill already clears the world by 164.10, so this edge is ornament and is not load-bearing for separation |
| `Slot_<setId>_<i>` (×24) | `UIStroke` | `color: border.subtle`, `thickness: stroke.hairline` (1), `transparency: 0`, `lineJoinMode: Miter` | `screens/01` requires 24 slots visible and identical when empty, and panel-to-slot separation is only 10.56; this edge is the arm that pair passes on |
| `Group_<setId>`, `Row_<setId>` | **none** | no fill, no stroke, no corner | grouping is carried by proximity, the same source `hud/01` rests on; a box around a box is the "pile of rectangles" failure |
| `Heading_<setId>` | **none** | — | `screens.tree` assigns its `typeRole` and `color`; identical for all four sets, per `screens/01` |
| `Trim` | **not emitted** | `ornament.readoutTrim: "none"` | agreed with `composition`: a 3 px full-width `accent.secondary` line has no meaning and is the wrong green |
| every UI node | **no `image`, no `slice`, no `imageTint`, no `preview`** | — | sheet `04` sets the interface image count to zero |
| every UI node | **no non-ASCII glyph** | — | `modal-grid`'s `CloseButton` carries `text: '✕'`, which fails `vocabulary.allowedPattern`; `screens/01` already forbids the node |

```json
{
  "amends": "uiTheme",
  "requested_by": "cid/art/ui-art/02-surface-and-ornament.md",
  "value": {
    "tokenOverrides": {},
    "tokenOverridesNote": "deliberately empty. Sheet 03 is the only sheet in this domain that writes a token override, and it writes exactly one.",
    "tokens": {},
    "tokensNote": "deliberately empty here. Sheet 06 adds the single group ui.motion and names its readers.",
    "adjacency": {
      "rule": "two fills that share a rendered edge with no third surface between them must satisfy at least one arm: (i) |luma601(a) - luma601(b)| >= 40; (ii) a UIStroke sits between them; (iii) the inner fill carries text at >= 40 luma from itself",
      "floorSource": "theme/setting/01's stated 'at least 40' separation for cleared stone above the lightest tier green; this key states no floor of its own",
      "lumaFormula": "Y = 0.299R + 0.587G + 0.114B",
      "clearedStoneRef": "styleGuide.roles[\"stone.cleared\"]",
      "pairs": [
        { "a": "accent.primary", "b": "surface.sunken", "delta": 140.33, "arm": "i" },
        { "a": "surface.overlay", "b": "styleGuide.roles[\"stone.cleared\"]", "delta": 185.61, "arm": "i" },
        { "a": "surface.base", "b": "styleGuide.roles[\"stone.cleared\"]", "delta": 164.10, "arm": "i" },
        { "a": "surface.base", "b": "surface.sunken", "delta": 10.56, "arm": "ii", "stroke": "border.subtle at stroke.hairline, added by this sheet" },
        { "a": "surface.raised", "b": "surface.overlay", "delta": 34.77, "arm": "ii", "stroke": "the affordability edge, sheet 05" },
        { "a": "surface.sunken", "b": "surface.overlay", "delta": 10.96, "arm": "iii", "text": "content.muted at 94.32 from its own fill", "note": "the maxed control; the weakest arm and the only row using it" }
      ],
      "notAdjacent": [
        { "a": "accent.primary", "b": "styleGuide.roles[\"stone.cleared\"]", "delta": 34.33, "why": "the surface.sunken track and its border.subtle hairline always sit between the bar fill and the world, so no floor applies", "recordedBecause": "34.3 is the number a reviewer will compute first" }
      ]
    },
    "surfaceEdge": [
      { "node": "IndexSurface", "stroke": { "color": "border.strong", "thickness": "stroke.base", "transparency": 0, "lineJoinMode": "Miter" }, "writtenBy": "index-screen", "loadBearing": false, "dependsOn": "A5 for lineJoinMode only; Color and Thickness ship today" },
      { "node": "Slot_<setId>_<i>", "count": 24, "stroke": { "color": "border.subtle", "thickness": "stroke.hairline", "transparency": 0, "lineJoinMode": "Miter" }, "writtenBy": "index-screen", "loadBearing": true, "dependsOn": "A5 for lineJoinMode only" }
    ],
    "forbiddenTokenRefs": ["accent.secondary", "accent.tertiary", "status.success", "status.danger", "status.warning", "status.info", "onColor.secondary", "onColor.tertiary", "onColor.success", "onColor.danger", "onColor.warning", "onColor.info"],
    "tokenReadRules": [
      { "token": "sizing.minTouchTarget", "rule": "never read as a touch-target floor; viewport.classes.<class>.minTargetPx is the only source", "kind": "prohibition" },
      { "token": "radius.pill", "rule": "may be resolved only where composition or screens already assigns it; no new capsule", "kind": "prohibition" }
    ],
    "materialRules": [
      { "rule": "no UI element depicts metal as a material: no multi-stop metallic gradient, no bevel, no specular highlight, no gem or facet shape", "because": "theme/lore/01 bans gilding on objects; this keeps the ban true without reaching an interface hex" },
      { "rule": "no world surface may adopt color.accent.primary #D4A34A", "because": "the same boundary from the other side; the world palette is styleGuide's" }
    ],
    "ornamentRule": {
      "deliverableChannels": ["radiusScale 0.6", "strokeWeight 1/2/4", "gradientStrength 0.16 with accentSheen 0.224", "the serif display face", "the four warm surfaces and one ochre accent"],
      "notDeliverable": ["panel artwork", "frame texture", "corner piece", "carved border", "9-slice frame"],
      "refusedOn": "asset, not capability",
      "evidence": "UIBuilder.luau:500-507 implements 9-slice and overrides.mjs:34 lists slice in SPEC_PROPS, so a brief can already request it; 9-slice requires an uploaded image asset, which representation and uiTheme.icons both set to zero",
      "permanentForThisProject": true
    },
    "uiForgeChanges": [
      { "id": "A5", "file": "ui-forge/src/emit/runtime/UIBuilder.luau", "at": "applyStroke(inst, theme, node), lines 118-130", "change": "read node.stroke.lineJoinMode and set UIStroke.LineJoinMode", "taken": true, "refusable": true, "ifRefused": "every stroke renders with the default round join; nothing else in uiTheme changes" },
      { "id": "A5b", "change": "parent a UIGradient to a UIStroke", "taken": false, "refusedBecause": "a gradient on a 1-to-4 px edge is invisible at 70 px and doubles the gradient values a builder must keep consistent" },
      { "id": "A6", "file": "ui-forge/src/compose/patterns/modal-grid.mjs", "at": "meta.ornament", "change": "the parameter that would carry frame art is meta.ornament.panelFrame; it does not exist and is not requested", "taken": false, "refusedBecause": "validateBrief rejects anything outside the declared space, but the binding constraint is the asset rule, not the registry" }
    ],
    "revisionRequests": [
      { "id": "RR-A1", "against": "cid/ui-ux/hud/01-persistent-surface-composition.md", "field": "composition.ornament.barCap", "from": "round", "to": "flat", "because": "barCap round resolves radius.pill on both Bar and BarFill regardless of layout, so the progress bar is the only capsule on screen in a language whose every other corner is 2 to 7 px; a capsule is the cartoon-vibrant shape the brief argued against by name", "ifRefused": "the archetype still ships and one element keeps the wrong shape language" },
      { "id": "RR-A2", "against": "cid/ui-ux/hud/01-persistent-surface-composition.md", "field": "composition.variant.readoutStyle", "from": "pill", "to": "framed", "because": "at layout corners a pill chip is stacked and already resolves radius.lg (7 px), so the only real difference is that framed adds a border.subtle hairline; a chip drawn over live play needs a defined boundary, which is the same argument hud-overlay.mjs:69-71 makes for the label's textStroke", "ifRefused": "six chips read as fills with no edge against a bright world; legibility, not taste" }
    ]
  }
}
```

## Consequences for other work

- **`composition` (`ui-ux/hud/01`)** owns both revision requests and may refuse either. This key
  contains no `variant` and no `ornament` object; if it ever does, two keys claim one field.
- **`screens` (`ui-ux/screens/01`)** keeps every `bg`, `corner`, `padding` and text `color` in its
  `tree` exactly as written. **The division is: `screens` assigns fill, corner, padding and text
  colour; this key assigns edge and sheen, and owns the value behind every ref both use.** No
  field is written twice.
- **`index-screen` build work** gains two `UIStroke` instances it does not create today, both
  sourced from `Theme.luau` and never from a literal.
- **Style-guide work** owns `styleGuide.roles["stone.cleared"]`, which the adjacency table reads
  by field. If that role's value moves, three rows recompute and the arms are what must still
  hold, not the deltas.
- **Sheet `05` of this domain** inherits two adjacency rows: the affordability edge is the arm the
  `surface.raised` control passes on, and the maxed control is the one row in the whole table
  resting on arm (iii).
- **VFX work** inherits the `forbiddenTokenRefs` list as a colour blacklist by proxy: a cue tinted
  `status.danger` or `accent.tertiary` would reintroduce the two hues this key removed.
- **`ui-forge` pattern work** takes `A5` and nothing else from this sheet. `A6` is a recorded
  finding with no request attached.

## Acceptance criteria

1. The merged `uiTheme.tokenOverrides` contains no key whose path begins `color.`, and
   `uiTheme.tokens` contains no group other than `ui.motion`.
2. `grep -rn "accent.secondary\|accent.tertiary\|status\." game/src/shared/Screens/` returns
   nothing, and no emitted UI spec node carries `image`, `slice`, `imageTint` or a non-ASCII
   character in a `text` field.
3. The built `IndexSurface` has exactly 25 `UIStroke` descendants: one on the panel and one on
   each of the 24 slots.
4. Every row of `uiTheme.adjacency.pairs` passes its stated arm, computed with
   `Y = 0.299R + 0.587G + 0.114B` over the merged token values and
   `styleGuide.roles["stone.cleared"]`: arm (i) is `Δ ≥ 40`, arm (ii) is the presence of a
   `UIStroke` between the two fills, arm (iii) is text at `Δ ≥ 40` from its own fill. No row may
   change arms without a revision against this sheet.

## Not decided here

The archetype itself, the emission chain and its check: sheet `01`. Every `type.*` token, the
font stack and the ramp: sheet `03`. Whether any image asset exists: sheet `04`. What a pressable
is made of in any state, and the affordability channel: sheet `05`. Motion, easing and the
`ui.motion` group: sheet `06`. `variant` and `ornament` values, cluster geometry, grouping, every
label and every number format: `composition`. The index panel's extent, element tree, fills,
corners, padding and text colours: `screens`. Touch floors, safe areas and keepout rects:
`viewport`. Every world colour, material and luma value, including
`styleGuide.roles["stone.cleared"]`, which this sheet reads and does not set: style-guide work.
Whether a `MaterialVariant` or `SurfaceAppearance` may exist anywhere: the same, already refused
there on an uploaded-texture ground.
