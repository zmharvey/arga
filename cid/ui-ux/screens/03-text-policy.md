# 03 — How a string renders, and how much of it a screen may hold

**Domain:** ui-ux/screens · **Category:** UI/UX · **Wave:** 5

## Decision

**Nothing in this game renders uppercase, nothing renders below 14 px, nothing truncates and
nothing uses `TextScaled`.** A stored Title Case string is rendered verbatim; every text node
carries a `UITextSizeConstraint` with `MinTextSize` 14 (`[playtest unknown]`, test range 12 to
18); prose wraps and grows with `GuiService.PreferredTextSize`, and only the 24 slot labels and
4 set headings are capped, at a size computed from their own box. An opened screen holds at
most 32 strings and at most 1 of prose.

## Why

**Rendered case is mine explicitly** (`theme/vocabulary/01`: *"casing is a stored-value rule
and uppercase is a render decision"*; `theme/tone/01` relays the same). The call is **no case
transform anywhere**: no `string.upper`, no all-caps literal, no small-caps. Word shape is a
real part of legibility for an 8-year-old, the audience is `[brief: binding]`
← `[you chose: R1 Q4]` at 8 to 14 and mobile-heavy, and an all-caps label is also 15 to 20 per
cent wider at the same size, which is exactly the width this game does not have in a 6-slot
row. It also removes the last justification for the five shipped all-caps labels
(`FINDS`, `SHARDS`, `VALUE`, `REACH`, `PACE`), which `theme/vocabulary/03` already counts as
unowned strings.

**The floor is 14 px at the reference resolution, and I am not pretending it is sourced.**
Roblox publishes no minimum text size; the docs advise only against a `MinTextSize` below 9
`[research: https://create.roblox.com/docs/ui/size-modifiers]`, and 14 to 18 for mobile body
text is a **practitioner recommendation, not a platform figure**
`[research: https://kitsblox.com/blog/fix-roblox-ui-scaling-mobile]`. 14 is the bottom of that
band because the surface it binds hardest, the index panel, is width-constrained by six slots
across. It is `[playtest unknown]`, test range 12 to 18, settled by one `npm run render` of
this screen at phone viewport with the real strings in place, which has never been run
`[research owed: a rendered phone-viewport screenshot of the index with the 24 real names]`.

**The consequence is concrete and lands on one shipped value.** The current ramp puts
`caption` at 12 px and the shipped index draws every Find name at `caption`
`[research: ui-forge/src/theme/generate.mjs]`, `[research: game/src/client/IndexScreen.luau]`.
Under this floor `caption` is not a legal role for a player-facing string, and the slot label
moves to the next role up. **I set no ramp value**: UI Art owns the ramp, and this is a floor
the ramp must clear.

**`TextScaled` is banned outright, and the reason is accessibility rather than taste.** Labels
with `TextScaled` *"bypass the `PreferredTextSize` value entirely"*, while `AutomaticSize`
objects *"resize their bounds as text size changes"* and wrapped text *"flows to additional
lines as `PreferredTextSize` increases"*
`[research: https://create.roblox.com/docs/production/publishing/accessibility]`. A player who
raises Text Size in the Roblox menu must get larger text, and `TextScaled` silently removes
that. `Enum.PreferredTextSize` has four members, `Medium` (default), `Large`, `Larger`,
`Largest` `[research: https://create.roblox.com/docs/reference/engine/classes/GuiService]`.

**Wrap, never truncate.** `TextTruncate` turns `Vaultkey` into a different word for the
audience this game has, and it hides content on the one surface whose entire content is names.
`UIBuilder.luau` emits no `TextTruncate` today `[research: ui-forge/src/emit/runtime/UIBuilder.luau]`,
so forbidding it costs nothing and closes a default a builder would otherwise reach for when a
name overflows.

**Which leaves the real question: what happens when a name does not fit.** It is not
answered by shrinking (the floor forbids it), by truncating (banned), or by wrapping (a Find
name is one word, so wrapping does nothing). It is answered by **failing the build**. The fit
size of a node class is computed once with `TextService:GetTextBoundsAsync` against the widest
string in that class and the node's realised box; if that size is below 14 the build stops and
names the offending string. The fix belongs to whoever owns the string or the box, never to
the renderer. That is the mechanism, and it needs no invented glyph-width constant.

**Growth is uncapped except where the layout physically cannot give.** Sheet 01 rules the
index panel has no scroll region, so at `Largest` the 24 slots cannot grow without overflowing.
The platform sanctions the cap it needs: a `UITextSizeConstraint` element *"won't expand beyond
`MaxTextSize` or shrink below `MinTextSize`, regardless of player preferences"*
`[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/production/publishing/accessibility.md]`.
So the 24 slot labels and the 4 headings are capped at their computed fit size; everything else
in the game, including all prose, is uncapped and grows.

| rule | value | applies to | mechanism |
|---|---|---|---|
| `R1` rendered case | the stored value, verbatim | every player-facing string | zero `string.upper`, zero `:upper()`, zero all-caps literal |
| `R2` minimum rendered size | 14 px at reference `[playtest unknown]` 12 to 18 | every player-facing string | `UITextSizeConstraint.MinTextSize` |
| `R3` scaled text | forbidden | every node | `TextScaled` never set |
| `R4` truncation | forbidden | every node | `TextTruncate` never set |
| `R5` wrap | on for prose, off for single-word labels | `FlavourLine`, `systemCopy`; slot labels and headings | `TextWrapped` from `node.wrap` |
| `R6` growth under `PreferredTextSize` | uncapped | everything except `R7` | no `MaxTextSize` set |
| `R7` capped growth | the computed fit size | 24 `Slot_*/Name`, 4 `Heading_*` | `MaxTextSize` = `GetTextBoundsAsync` fit; build fails if that is under `R2` |
| `R8` automatic size | on for prose nodes only | `FlavourLine`, `systemCopy` | `AutomaticSize.Y`, so raised preferences add lines |
| `R9` provenance of a rendered string | a contract-key value or a `screens` entry, nothing else | every rendered string in the game | greppable: no string literal reaches a `Text` property except the empty string |

**`R9` is the rule with the most teeth and the least prose.** It is what stops the next
`SHARDS`: six unowned player-facing strings ship today in a file no key produces
(`ui-forge/briefs/hud.brief.json`, counted by `theme/vocabulary/03`). Under `R9` a rendered
string that no key holds is a build failure rather than a note.

**The copy budget the brief leaves unset.** `theme/vocabulary/01` records it as *"unset
anywhere in the brief"* and routes it here; `vocabulary` bounds one label and nothing bounds a
screenful. The budget is set against what this game actually holds rather than a general
theory: the index carries 4 headings plus 24 names, so 32 is 28 plus one group of headroom,
and one prose string at a time is what sheet 04's `FlavourLine` and sheet 02's system string
each need alone. All four figures are `[cid: decided]`; the brief is silent.

```json
{
  "amends": "screens",
  "value": {
    "textPolicy": {
      "renderedCase": "asStored",
      "uppercaseTransformAllowed": false,
      "minRenderedTextSizePx": 14,
      "minRenderedTextSizePxStatus": "playtest unknown",
      "minRenderedTextSizePxTestRange": [12, 18],
      "minRenderedTextSizeMechanism": "UITextSizeConstraint.MinTextSize on every node holding a player-facing string",
      "textScaledAllowed": false,
      "textTruncateAllowed": false,
      "wrap": { "prose": true, "singleWordLabel": false },
      "automaticSizeY": { "prose": true, "singleWordLabel": false },
      "growthUnderPreferredTextSize": "uncapped",
      "cappedNodes": [
        { "match": "Slot_*/Name", "count": 24, "maxTextSize": "the largest size at which the widest collection.sets[].relics[].name fits the slot's realised width, from TextService:GetTextBoundsAsync at build time" },
        { "match": "Heading_*", "count": 4, "maxTextSize": "the same computation against the widest collection.sets[].label" }
      ],
      "overflowResolution": "fail the build and name the string; never shrink below the floor, never truncate",
      "bannedRoleForPlayerFacingText": "any type role whose size is below minRenderedTextSizePx; at the ramp read on 2026-08-01 that is caption at 12",
      "renderedStringProvenance": "a value in a contract key, or an entry in screens.systemCopy. Nothing else may reach a Text property except the empty string",
      "emitterChangeRequired": {
        "file": "ui-forge/src/emit/runtime/UIBuilder.luau",
        "where": "the text block at lines 470-495",
        "change": "emit a UITextSizeConstraint child when node.minTextSize or node.maxTextSize is present; it emits none today, and emits no TextScaled and no TextTruncate, which stays correct"
      }
    },
    "copyBudget": {
      "status": "cid: decided; the brief sets none",
      "openedScreen": { "maxStrings": 32, "maxProseStringsVisibleAtOnce": 1, "maxProseWordsVisibleAtOnce": 14, "maxTotalCharsExcludingProse": 400 },
      "persistentSurface": { "maxStrings": 16, "maxCharsPerString": 14 },
      "notice": { "maxStrings": 1, "maxWordsPerSentence": 12, "maxSentences": 2 },
      "indexScreenRealised": { "strings": 28, "proseVisibleAtOnce": 1, "charsExcludingProse": 344 }
    }
  }
}
```

## Consequences for other work

- **Art and Visuals, UI Art (wave 6)** owns the typeface and the whole ramp and inherits one
  floor: no role used for a player-facing string may sit below 14 px. At the ramp as it stands
  that retires `caption` from player-facing use. If you move the ramp, this floor is what it
  has to clear, and if you want the floor moved, that is a revision against this sheet.
- **`ui-forge` emitter work** owns one change in `UIBuilder.luau`: emit a
  `UITextSizeConstraint` from `node.minTextSize` / `node.maxTextSize`. Without it `R2` and `R7`
  are prose and every label on every surface renders at whatever the ramp says.
- **HUD (`composition`)** inherits `R1` and `R9` directly. `FINDS`, `SHARDS`, `VALUE`, `REACH`,
  `PACE` and `EAST TERRACE - 0% CLEAR` all fail one or both today, and `R9` makes the fix
  structural: those strings come from `currency`, `upgrades`, `area` and `collection`, or they
  do not render.
- **Platform and Input (`viewport`)** owns the scaling curve and inherits a constraint on it:
  whatever the curve does, the realised text size may not fall below 14 px on any supported
  device, and `TextScaled` is not available as the way to fit a device.
- **Meta and Content (`collection`)** inherits the failure route, not a rename: if the widest
  Find name cannot render at 14 px in one sixth of the panel width, the build stops and the
  fix is a shorter name or a wider slot. 24 of 24 pass `theme/vocabulary/01`'s 12-character
  ceiling today, so this is a guard, not a request.
- **Contract and seam work** inherits `R9` as a lint: a `Text` assignment whose right-hand side
  is a literal other than `""` anywhere under `game/src/client/` is a failure.

## Acceptance criteria

1. `grep -rnE "TextScaled|TextTruncate|string\.upper|:upper\(\)" game/src ui-forge/src/emit`
   returns 0 matches.
2. Every `TextLabel` and `TextButton` in the built `IndexSurface` and the built HUD has a
   `UITextSizeConstraint` child whose `MinTextSize` is at least 14; the count of text-holding
   nodes without one is 0.
3. Every `Text` property assigned anywhere under `game/src/client/` is either the empty string
   or a value read from `GameConfig` or from `screens`; the count of other string literals
   assigned to a `Text` property is 0.
4. The `index` screen renders at most 32 strings, at most 1 of which is prose, and at most 400
   characters excluding that prose string.

## Not decided here

The typeface, the type-ramp values, colours, radii and panel art (Art and Visuals, UI Art,
wave 6, which this sheet constrains and does not set). The per-device scaling curve, safe area,
gamepad focus order and the touch-target floor (Platform and Input). Which strings the HUD
holds and how it groups them (HUD, `composition`). The screen inventory and the element tree
the fit computation runs against (sheet 01). The one system string's wording (sheet 02). The
flavour line's content and its 14-word bound, which is `theme/tone/02`'s and is only rendered
here (sheet 04). Number formatting, separators and a colon between a label and a value, which
`theme/tone/01` puts outside copy as furniture composed at render time (HUD). Whether
`UIBuilder.luau` actually gains the constraint emitter (`ui-forge` emitter work).
