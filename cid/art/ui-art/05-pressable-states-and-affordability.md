# 05 — What a pressable is made of, and the channel that is not colour

**Domain:** art/ui-art · **Category:** Art & Visuals · **Wave:** 6

## Decision

**The second, non-colour affordability channel is the edge: `UIStroke.Thickness` at
`stroke.heavy` (4) when affordable, `stroke.hairline` (1) when not, and no stroke at all when
maxed.** One mechanism, three distinct values, readable with every hue removed. The four
pressables carry four states and **no hover state**, because `applyStates` reaches hover only
through `MouseEnter`, which ~70% of this audience never fires.

## Why

**The prohibition exists and the channel did not.** `input.pressable.affordabilityByColourAlone`
is `false`; `composition.copy` supplies the words `Ready` / `Short` / `Max` on `ReadoutState`
with `primaryChannel: "text"` and `colourIsSecondaryOnly: true`; nothing anywhere named the
visual signal, so shipped code invented `" Buy"` / `" Need"` / `"Max"` suffixes marked
`[STOP: no value in the contract]` (category gaps `G8` / `H5`). The general form of the rule is
WCAG SC 1.4.1: *"Color is not used as the only visual means of conveying information, indicating
an action, prompting a response, or distinguishing a visual element"*
`[research: https://www.w3.org/WAI/WCAG21/Understanding/use-of-color.html]`, which is the same
requirement the brief states for rarity tiers as *"shape or silhouette, not only hue"*
`[brief: soft]`, effectively binding. I cite it rather than re-derive it.

**The strongest justification this decision has is that in this game contrast cannot be bought
with brightness at all.** Lighting's finding, verified independently by the category pass: `Moss`
against an achromatic cleared stone is **1.535:1**, against the warm stone **2.264:1**, and
reaching 3:1 needs sRGB relative luminance 0.8018, a Rec.601 luma of **231.07**, a near-white
that `theme/setting/01` forbids by name (*"never grey granite, white marble, red brick or dark
basalt"*) `[research: cid/art/_verified.md]`. **So no surface in this game can be made to carry a
distinction by being brighter, and a colour-or-luminance channel is structurally unavailable
whatever anyone prefers.** That is why the channel here is a **shape** channel. A 4 px edge
against a 1 px edge against no edge is a difference of form, and it survives both the greyscale
test and the enclosure attenuation that flattens every luminance argument in this project.

**Why the edge and not something else.** The excluded set is long and every exclusion is
someone's approved ruling: not a fifth pressable (`input.gameDrawnPressables` is 4), not a badge
or a padlock or a strikethrough (`theme/tone/04` `D8`), not a pulse or a blink (`D6`), not a red
alert state (`D6`, and `status.danger` is on sheet `02`'s forbidden list), not an icon (sheet
`04` sets the interface image count to zero), not motion (sheet `06` permits one press scale and
nothing else), not a size change (geometry is `viewport`'s and a control that changes size
reflows, which `firstSession.suppressionForbidden` bans). What survives is a property already on
every node, already tokenised, already in the archetype's vocabulary at three distinct weights
(`strokeWeight` 1 / 2 / 4), and visible in greyscale: **`UIStroke.Thickness`**.
`fantasy-ornate` is the archetype whose `strokeWeight` band is widest, so the channel is a
property of the art direction rather than a badge bolted onto it. `[cid: decided]`

**The alternative I rejected, and why.** Fill transparency (`bgTransparency` 0 / 0.35 / 0.5) is
also greyscale-visible and is how the pattern already expresses `disabled`. It collides with
`hud/02`'s reserved mechanism, where a withheld element has *"every transparency inside it driven
to 1"*: two rules writing one property for two reasons is how a state becomes unreadable. The
edge writes a property nothing else writes.

**Three states, three channels each, and never fewer than two that are not colour.**

| state | fill | edge | text | word (`composition`) | non-colour channels |
|---|---|---|---|---|---|
| `affordable` | `surface.raised` | `stroke.heavy` 4, `border.strong` | `content.primary` | `{cost} Ready` | edge weight 4, the word |
| `unaffordable` | `surface.raised` | `stroke.hairline` 1, `border.subtle` | `content.secondary` | `{cost} Short` | edge weight 1, the word |
| `maxed` | `surface.sunken` | none (`Transparency` 1) | `content.muted` | `Max` | edge absent, fill luma 27.18 versus 50.99, the word |
| `pressed` (transient) | unchanged | unchanged | unchanged | unchanged | `UIScale` 0.94 over 0.11 s, sheet `06`'s values |
| `inert` (`Pressable_INDEX` before the first reveal) | the readout's own | none | `content.primary` | none | none: `hud/02` fixes it as *"identical to the currency readout"* and this sheet adds nothing to it |

**The edge is also load-bearing for sheet `02`'s adjacency rule, which is worth knowing before
anyone trims it.** A `surface.raised` control (50.99) inside a `surface.overlay` chip (16.22) is
34.77 apart, below the 40 floor `theme/setting/01` states, and the arm it passes on is *"a
`UIStroke` sits between them"*. Removing the edge from the affordable and unaffordable states
would therefore break a check on another sheet, not just weaken this one.

**Two findings in the emitter, both of which would have made a state block silently do nothing.**
`applyStates` binds `MouseEnter`, `MouseLeave`, `MouseButton1Down` and `MouseButton1Up` only, and
reads only `node.states.hover` and `node.states.pressed` (`UIBuilder.luau:303-345`). So
`actionButton`'s `disabled: { bgTransparency: 0.6, color: 'content.muted' }` at
`hud-overlay.mjs:194` is **dead data**: nothing ever applies it. Affordability is therefore
written by the client module on each snapshot, not by a `states` block, and the module resolves
every value from `Theme` (`Theme.stroke.heavy`, `Theme.color.border.strong`) rather than from a
literal. And omitting `states.hover` is safe rather than merely harmless: on release,
`MouseButton1Up` calls `to(node.states.hover)`, which with hover absent is `to(nil)` and tweens
the control back to its base appearance, which is exactly the wanted behaviour.

**The legibility question `cid/ui-ux/_verified.md` predicted-conflict 2 raises, answered rather
than deferred.** A `fantasy-ornate` pressable readout is legible over live play at the 70 px
phone floor, and the reason does not depend on the floor: the plate is `surface.overlay` at
Rec.601 luma **16.22** against `styleGuide.roles["stone.cleared"]` at **201.84**, a separation of
185.61; the value is 23 px carrying a 2 px `surface.sunken` text stroke; the label is 14 px
carrying a hairline one. The binding constraint at 70 px is **vertical fit**, not contrast:
14 + 23 + two chip paddings must sit inside 70, and the same stack must sit inside 120 on tablet
without the type growing, because the ramp is fixed. That is arithmetic `viewport` and
`composition` own the inputs to, and it is `[playtest unknown]` at exactly one point: whether a
4 px versus 1 px edge is discriminable at 70 px on a phone held at arm's length. **Test range 3
to 5 for `stroke.heavy`**, settled by `npm run render -- --brief ui-forge/briefs/hud.brief.json
--viewport all` against a `fantasy-ornate` context, which has never been run
`[research: CLAUDE.md]`.

```json
{
  "amends": "uiTheme",
  "requested_by": "cid/art/ui-art/05-pressable-states-and-affordability.md",
  "value": {
    "pressables": {
      "members": ["Pressable_BUY1", "Pressable_BUY2", "Pressable_BUY3", "Pressable_INDEX"],
      "class": "TextButton on both realisation routes",
      "corner": "radius.md",
      "states": [
        { "id": "affordable", "appliesTo": ["Pressable_BUY1", "Pressable_BUY2", "Pressable_BUY3"], "bg": "surface.raised", "stroke": { "color": "border.strong", "thickness": "stroke.heavy", "transparency": 0 }, "textColor": "content.primary", "wordFrom": "composition.copy.affordable" },
        { "id": "unaffordable", "appliesTo": ["Pressable_BUY1", "Pressable_BUY2", "Pressable_BUY3"], "bg": "surface.raised", "stroke": { "color": "border.subtle", "thickness": "stroke.hairline", "transparency": 0 }, "textColor": "content.secondary", "wordFrom": "composition.copy.unaffordable" },
        { "id": "maxed", "appliesTo": ["Pressable_BUY1", "Pressable_BUY2", "Pressable_BUY3"], "bg": "surface.sunken", "stroke": { "transparency": 1 }, "textColor": "content.muted", "wordFrom": "composition.copy.maxed" },
        { "id": "ready", "appliesTo": ["Pressable_INDEX"], "bg": "surface.raised", "stroke": { "color": "border.strong", "thickness": "stroke.heavy", "transparency": 0 }, "textColor": "content.primary", "wordFrom": null },
        { "id": "inert", "appliesTo": ["Pressable_INDEX"], "definedBy": "composition, hud/02 presence.byGroup[collection].beforeLift", "addedHere": "nothing" },
        { "id": "pressed", "appliesTo": "all four", "channel": "UIScale", "value": 0.94, "durationSeconds": 0.11, "easing": "quad", "ownedBy": "sheet 06" }
      ],
      "noHoverState": { "states.hover": "absent on every pressable", "because": "applyStates reaches hover only via MouseEnter, which touch never fires; ~70% of this audience is mobile", "releaseBehaviour": "MouseButton1Up calls to(node.states.hover) which with hover absent is to(nil) and returns the control to base" },
      "writtenBy": "the client module that resolves composition.groups[].node (pressables, hud-binding), on each snapshot",
      "writtenHow": "properties resolved from Theme.stroke.*, Theme.color.* and Theme.type.*; zero numeric or hex literals in game/src/client for any of them"
    },
    "affordanceChannel": {
      "channel": "UIStroke.Thickness on the pressable node",
      "values": { "affordable": "stroke.heavy", "unaffordable": "stroke.hairline", "maxed": "no stroke" },
      "isNonColour": true,
      "isShapeNotLuminance": true,
      "whyNotLuminance": "Lighting's verified finding: Moss against cleared stone is 1.535:1 achromatic and 2.264:1 warm, and 3:1 needs Rec.601 luma 231.07, a near-white theme/setting/01 forbids by name. Contrast cannot be bought with brightness anywhere in this game, so a luminance channel is structurally unavailable.",
      "isThirdSignal": true,
      "primaryChannelOwnedElsewhere": "composition.copy, primaryChannel text, colourIsSecondaryOnly true",
      "channelsPerState": { "affordable": 3, "unaffordable": 3, "maxed": 3, "minimumNonColour": 2 },
      "greyscaleRule": "every pair of states differs in at least one property that survives conversion to greyscale",
      "alsoSatisfies": "sheet 02's adjacency arm (ii) for the surface.raised control inside a surface.overlay chip, which is 34.77 apart and below the 40 floor",
      "rejectedAlternatives": [
        { "channel": "bgTransparency 0/0.35/0.5", "because": "collides with hud/02's reserved mechanism, which drives every transparency inside a withheld element to 1" },
        { "channel": "a brighter fill on the affordable state", "because": "3:1 needs luma 231.07, which theme/setting/01 forbids by name; no luminance channel exists in this game" },
        { "channel": "a fifth pressable, a badge, a padlock, a strikethrough", "because": "input.gameDrawnPressables is 4; theme/tone/04 D8" },
        { "channel": "a pulse, a blink, a colour ramp, a red alert", "because": "theme/tone/04 D6; status.danger is on sheet 02's forbidden list" },
        { "channel": "a size change", "because": "geometry is viewport's and a resize reflows, which firstSession.suppressionForbidden bans" }
      ],
      "playtestUnknown": { "claim": "a 4 px versus 1 px edge is discriminable at the 70 px phone floor", "startingValue": 4, "testRange": [3, 5], "settledBy": "npm run render -- --brief ui-forge/briefs/hud.brief.json --viewport all against a fantasy-ornate context" }
    },
    "legibilityAnswer": {
      "question": "cid/ui-ux/_verified.md predicted-conflict 2",
      "verdict": "legible; the constraint at 70 px is vertical fit, not contrast",
      "contrast": { "plateLuma": 16.22, "clearedStoneRef": "styleGuide.roles[\"stone.cleared\"]", "clearedStoneLuma": 201.84, "separation": 185.61 },
      "fitInequality": "type.caption.size (14) + type.numeric.size (23) + 2 x chipPad <= viewport.classes.<class>.minTargetPx",
      "inputsOwnedBy": ["composition", "viewport"],
      "status": "playtest unknown on the edge discriminability only"
    },
    "buildReportFindings": [
      { "id": "P1", "where": "ui-forge/src/compose/patterns/hud-overlay.mjs:194 with UIBuilder.luau:303-345", "finding": "actionButton emits states.disabled and applyStates reads only states.hover and states.pressed, so the disabled block is dead data and no maxed appearance can be expressed through it", "playerVisible": true, "twoBuildersWouldDiverge": true },
      { "id": "P2", "where": "game/src/client/Pressables.luau and HudBinding.luau", "finding": "the AFFORDABLE_SUFFIX / UNAFFORDABLE_SUFFIX / MAX_LEVEL_TEXT literals marked [STOP: no value in the contract] are now answered: the words are composition.copy and the visual channel is this key", "playerVisible": true, "twoBuildersWouldDiverge": true }
    ]
  }
}
```

## Consequences for other work

- **Purchase-control and readout-writing work (`pressables`, `hud-binding`)** inherits one write
  per state change and a prohibition: `UIStroke.Thickness`, `.Color` and `.Transparency` come
  from `Theme`, never from a number in the module. This is also what retires the four
  `[STOP: no value in the contract]` literals `hud/03` already lists for deletion.
- **`composition` (`ui-ux/hud/01`)** keeps `ReadoutState`, the three words, `primaryChannel` and
  `colourIsSecondaryOnly` exactly as written. This sheet adds a third signal and changes no field
  of that key. `hud/02`'s `beforeLift` block is adopted unedited.
- **Sheet `02` of this domain** depends on this edge: the affordable and unaffordable states are
  the arm its adjacency row for `surface.raised` against `surface.overlay` passes on.
- **Lighting work** gets its contrast finding used rather than restated: this sheet is the
  downstream consequence of *"contrast cannot be bought with brightness"*, and nothing here
  claims a luma floor is a legibility guarantee.
- **`ui-forge` pattern work** gets no new request from this sheet. `P1` is a finding; if `U1`
  lands, the pressable readout should carry `states.pressed` and **no** `states.disabled`, since
  nothing applies it.
- **`viewport`** owns the 70 and 120 floors and gets the fit inequality above as the thing those
  floors must satisfy, stated with its inputs named and none of its values copied.

## Acceptance criteria

1. In a greyscale copy of a phone-viewport render, the three upgrade controls in `affordable`,
   `unaffordable` and `maxed` states have measured outline widths of 4 px, 1 px and 0 px.
2. Every pair of the three states differs in at least one property that is not a colour, and no
   state is distinguished from another by hue alone.
3. `grep -rn "Thickness = [0-9]\|Color3.fromRGB" game/src/client/` returns nothing.
4. No emitted UI node carries a `states.hover` or a `states.disabled` block.

## Not decided here

The three words, `ReadoutState`, `maxRenderedChars`, and which group a control belongs to:
`composition`. The pixel floors 70 and 120, the safe area, the keepout rects and the focus order:
`viewport`. Whether `Pressable_INDEX` is present, when it becomes interactive, and what opens or
closes: `navigation` and `composition`. The token values behind every ref above, the
forbidden-ref list and the adjacency rule this sheet's edge satisfies: sheet `02`. Type sizes:
sheet `03`. The press scale, its duration and its easing: sheet `06`. The luma and contrast
figures for world surfaces, and `styleGuide.roles["stone.cleared"]`: style-guide and lighting
work, cited here and set in neither. Whether a fifth pressable exists: `input`'s owner, via
`navigation/03`'s RR-3. What a purchase sounds like: Audio.
