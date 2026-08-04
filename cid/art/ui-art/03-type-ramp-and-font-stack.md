# 03 — The type ramp, and the font-stack defect that blocks the archetype

**Domain:** art/ui-art · **Category:** Art & Visuals · **Wave:** 6

## Decision

The ramp ships **exactly as `generateTheme` computes it at `typeScaleFor('8-14') = 1.15`**:
caption 14 / body 17 / label 18 / title 25 / heading 35 / display 48 / numeric 23, serif
`Merriweather` for display roles and `SourceSans` for body roles. **One override, and it is the
blocker:** `type.numeric.font` becomes `"Merriweather"`, because the value the archetype supplies,
`MerriweatherBold`, is not a member of `Enum.Font` and every number in the game runs through it.

## Why

**Correct the arithmetic before moving anything.** `typeScaleFor` returns 1.15 for an `8-14`
band, not 1.06: it parses the lower bound as `8` and takes the `lower <= 9` branch
`[research: ui-forge/src/theme/generate.mjs]`. My category brief says 1.06 and is wrong. The
emitted ramp is therefore already `caption` **14**, `body` **17**, `label` **18**, `numeric`
**23**, and `screens/03` `R2`'s floor of 14 px is met by every role **without moving a number**.
That makes `screens/03`'s stated consequence, *"at the ramp as it stands that retires `caption`
from player-facing use"*, **stale**: nothing is retired. It is a build-report finding against an
otherwise approved and untouched sheet, not a revision request, because its rule (*"no role used
for a player-facing string may sit below 14 px"*) is satisfied as written.

**The margin is zero and I am leaving it there.** `caption` at 14 meets a floor of 14 exactly,
and that floor is itself `[playtest unknown]` with a test range of 12 to 18
`[research: cid/ui-ux/screens/03-text-policy.md]`. Raising `caption` to buy margin would be
inventing a number against silence; if the floor moves up after a render, the fix is one
`type.caption.size` override and this sheet says so in advance. **The failing branch is named,
not designed around.**

**The blocking defect, and it is the second this wave that bites on its own fix.**
`fantasy-ornate` resolves `fontStack: 'serif-ui'`, whose `numeric.roblox` is `'MerriweatherBold'`
(`palettes.mjs:150`). `Merriweather`, `SourceSans`, `FredokaOne`, `Gotham` and `GothamBold` are
members of `Enum.Font`; **`MerriweatherBold` is not**, and there is no bold variant
`[research: https://create.roblox.com/docs/reference/engine/enums/Font]`. `UIBuilder.luau:482`
does `inst.Font = (Enum.Font :: any)[t.font] or Enum.Font.Gotham`, so under the correct archetype
every numeric readout either **throws**, killing `UIBuilder.build` and with it the entire client
(the precedent that file records for itself at `:464-467`), or **silently renders in `Gotham`**,
a sans face in a serif interface. **Which branch it takes is `[unverified]`**: the creator docs do
not say what indexing an `Enum` with an absent member does, and the forum evidence for an error
of the form *"X is not a valid member of Enum"* is not a specification. **The sheet does not need
it resolved** and must not pick a branch it cannot source, because **one change closes both**.
Settled in one line in Studio: `print(pcall(function() return (Enum.Font :: any).MerriweatherBold end))`.

**Two closures, deliberately, because they have different blast radii.** `A1` fixes
`palettes.mjs` for every game that ever resolves `serif-ui`; the `type.numeric.font` override
fixes this game even if `A1` is refused. `Merriweather` is the replacement rather than
`GothamBold` because it is the display role of the same stack, so numerals and headings share a
family, and because a sans numeral in a serif interface is the drift the archetype exists to
prevent. Legibility of `Merriweather` numerals at 23 px over live play is `[playtest unknown]`;
if the render fails it, the replacement is `SourceSans` (a member, and the stack's own body face)
and nothing else in this key moves.

**Tracking is inert on Roblox and a builder will try to implement it.** `theme.type.*.tracking`
carries 0, 0.5 and -1 values, and `UIBuilder` reads only `t.font` and `t.size` from a type step
(`:481-484`). Roblox has no letter-spacing property. So tracking is a preview-only value; it may
not be simulated with inserted spaces, which would also break `vocabulary.maxLabelChars`. Stated
as a rule because an unstated inert field is a field somebody spends a day on.

**Three ramp steps render nothing in this game.** `title` 25's only consumer in either pattern is
`modal-grid`'s close button, which `screens/01` forbids as a node; `heading` 35 and `display` 48
have no consumer at all. They stay in the ramp (removing a step is a `generateTheme` change with
no benefit) and may not be introduced without a revision against `screens` or `composition`.

| role | size | tracking | font | renders | player-facing |
|---|---|---|---|---|---|
| `caption` | 14 | 0 | `SourceSans` | `ReadoutLabel` (`hud-overlay.mjs:64`), `BarLabel` (`:143`) | yes |
| `body` | 17 | 0 | `SourceSans` | notice plate text, `FlavourLine`, slot `Name` | yes |
| `label` | 18 | 0.5 | `Merriweather` | `Heading_<setId>` ×4 (`screens.tree`) | yes |
| `numeric` | 23 | 0 | `Merriweather` **(override)** | `ReadoutValue` (`hud-overlay.mjs:114`) | yes |
| `title` | 25 | 0 | `Merriweather` | nothing; `CloseButton` is forbidden by `screens/01` | no |
| `heading` | 35 | -0.5 | `Merriweather` | nothing | no |
| `display` | 48 | -1 | `Merriweather` | nothing | no |

| rule | check |
|---|---|
| No role used for a player-facing string sits below 14 px | four player-facing roles at 14/17/18/23 |
| No emitted UI node carries `TextScaled` | `screens/03` `R4`, inherited; grep returns nothing |
| Rendered case equals stored case; no `string.upper` on any label | `screens/03` `R1` and `hud/03` `F3`, inherited, not restated |
| `tracking` is never read by any Luau module | grep for `tracking` under `game/src/` returns nothing |
| No font name outside `Enum.Font` reaches `Theme.luau` | the check in sheet `01`'s `emission` block |
| No inserted space simulates tracking or kerning | no player-facing string contains two consecutive spaces |

```json
{
  "amends": "uiTheme",
  "requested_by": "cid/art/ui-art/03-type-ramp-and-font-stack.md",
  "value": {
    "tokenOverrides": {
      "type.numeric.font": "Merriweather"
    },
    "tokenOverridesReason": {
      "type.numeric.font": "the archetype supplies MerriweatherBold, which is not a member of Enum.Font; UIBuilder.luau:482 either throws or silently falls back to Gotham. Closes the defect for this game whether or not A1 lands."
    },
    "typeRamp": {
      "scaleFactor": 1.15,
      "scaleFactorSource": "typeScaleFor('8-14') in ui-forge/src/theme/generate.mjs:54-59",
      "steps": [
        { "role": "caption", "size": 14, "tracking": 0, "font": "SourceSans", "renders": ["ReadoutLabel", "BarLabel"], "playerFacing": true },
        { "role": "body", "size": 17, "tracking": 0, "font": "SourceSans", "renders": ["notice text", "FlavourLine", "Slot Name"], "playerFacing": true },
        { "role": "label", "size": 18, "tracking": 0.5, "font": "Merriweather", "renders": ["Heading_<setId>"], "playerFacing": true },
        { "role": "numeric", "size": 23, "tracking": 0, "font": "Merriweather", "renders": ["ReadoutValue"], "playerFacing": true },
        { "role": "title", "size": 25, "tracking": 0, "font": "Merriweather", "renders": [], "playerFacing": false },
        { "role": "heading", "size": 35, "tracking": -0.5, "font": "Merriweather", "renders": [], "playerFacing": false },
        { "role": "display", "size": 48, "tracking": -1, "font": "Merriweather", "renders": [], "playerFacing": false }
      ],
      "floor": { "value": 14, "source": "screens.textPolicy R2 MinTextSize", "status": "playtest unknown", "testRange": [12, 18], "marginToday": 0, "ifFloorRises": "one override on type.caption.size; no other step moves" },
      "trackingIsInert": { "onRoblox": true, "because": "UIBuilder reads only t.font and t.size from a type step; Roblox has no letter-spacing property", "prohibition": "tracking may not be simulated with inserted spaces" },
      "unusedSteps": ["title", "heading", "display"],
      "unusedStepRule": "may not be introduced without a revision against screens or composition"
    },
    "fontLegibility": { "status": "playtest unknown", "claim": "Merriweather numerals at 23 px with a 2 px surface.sunken textStroke are readable over live play at the phone floor", "fallbackIfFailed": "SourceSans", "settledBy": "npm run render -- --brief ui-forge/briefs/hud.brief.json --viewport all against a fantasy-ornate context" },
    "uiForgeChanges": [
      { "id": "A1", "file": "ui-forge/src/theme/palettes.mjs", "at": "FONT_STACKS['serif-ui'].numeric.roblox, line 150", "from": "MerriweatherBold", "to": "Merriweather", "refusable": false, "blocks": "sheet 01's emission", "why": "MerriweatherBold is not a member of Enum.Font; the web value and weight 700 are unaffected because they are preview-only" }
    ],
    "buildReportFindings": [
      { "id": "T1", "where": "cid/ui-ux/screens/03-text-policy.md, Consequences", "finding": "its 'that retires caption from player-facing use' rests on caption being 12; at typeScaleFor('8-14') = 1.15 the emitted value is 14 and nothing is retired", "playerVisible": false, "twoBuildersWouldDiverge": true },
      { "id": "T2", "where": "cid/art/_category.md, UI Art assignment", "finding": "states typeScaleFor applies a 1.06 factor; the 8-14 band takes the lower <= 9 branch and applies 1.15", "playerVisible": false, "twoBuildersWouldDiverge": true },
      { "id": "T3", "where": "cid/_research/pack.md", "finding": "four URL headings banked by the wave-6 leads carry a trailing backtick (enums/Font, ui/9-slice.md, ui/appearance-modifiers.md, use-of-color.html), so a correctly written citation does not match the pack key. Run npm run cid:research before cid:verify, or these four citations report as stale-pack failures", "playerVisible": false, "twoBuildersWouldDiverge": false }
    ]
  }
}
```

## Consequences for other work

- **Sheet `01` is blocked by `A1`.** The archetype may not be emitted until the font stack is
  legal, or the correction lands as this key's override and the file fix is recorded as owed.
- **`screens` (`ui-ux/screens/03`)** owes no edit. Its floor is met, its `UITextSizeConstraint`
  emitter request stands unchanged and is not re-filed here, and finding `T1` corrects one
  sentence of its consequences rather than any rule.
- **`ui-forge` emitter work** gains nothing from this sheet beyond `A1`, which is one string.
- **Readout-writing work (`hud-binding`) and index-screen build work** resolve every text size and
  font from `Theme.type.<role>`, never from a literal. A module writing `TextSize = 14` is the
  literal the token system exists to prevent.
- **Audio and VFX** are unaffected: no type value reaches a cue.
- **Whoever runs `cid:verify` this wave** should run `npm run cid:research` first, per `T3`.

## Acceptance criteria

1. `game/src/shared/Theme.luau` contains no occurrence of `MerriweatherBold`, and every value of
   `type.*.font` in it is a member of `Enum.Font`.
2. `type.numeric.font` in the emitted theme is `Merriweather`, and `type.caption.size` is 14.
3. `grep -rn "TextSize = [0-9]\|TextScaled" game/src/` returns nothing outside a value resolved
   from `Theme.type`.

## Not decided here

Which archetype ships and how a wrong one is caught: sheet `01`. Colours, strokes, radii and the
ornament ruling: sheet `02`. Whether an icon exists beside any label: sheet `04`. Pressable state
appearance: sheet `05`. Motion: sheet `06`. Rendered case, wrap behaviour, truncation, the
`MinTextSize` constraint emitter and the copy budget: `screens` (`ui-ux/screens/03`), which this
sheet is bounded by and does not edit. Which strings exist, their casing, their character
ceilings and their banned words: `composition`, `screens` and `vocabulary`. The per-device
scaling curve that the 14 px floor must survive: `viewport`. Whether
`(Enum.Font :: any)["MerriweatherBold"]` throws or returns nil: `[unverified]`, and both branches
close on `A1`.
