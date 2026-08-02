# Platform & Input — domain index

**Category:** UI/UX · **Wave:** 5 · Reads: `HANDOFF.md`, `CONCEPT.md`, `00-CORE.md`,
`02-GAMEPLAY.md`, `03-META.md`, `04-PRESENTATION.md`, `OPEN.md`, `cid/ui-ux/_category.md`,
`cid/_contract.md`, `cid/_state.md`, `cid/gameplay/mechanics/03-device-parity.md`,
`architect/sheets/06-representation.md`, `ui-forge/src/compose/index.mjs`,
`ui-forge/src/compose/patterns/hud-overlay.mjs`, `ui-forge/src/cli.mjs`,
`ui-forge/src/emit/runtime/UIBuilder.luau`, `ui-forge/briefs/hud.brief.json`,
`game/src/client/Pressables.luau`, `game/src/client/init.client.luau`,
`docs/hand-written-control/init.client.luau`.

## What the brief gave me

- *"**8–14, mobile-heavy, short sessions.**"* — `00-CORE.md` `[you chose: R1 Q4]` →
  **`[brief: binding]`**. The band is the floor everything here rests on.
- *"~70% mobile / ~25% desktop / ~5% console"* — `00-CORE.md` `[I assumed — the split]` →
  `[brief: soft]`, and uncorroborated by anything I fetched (see **Research owed**). Nothing
  in this domain may rest on the ratio; `mechanics/03` already set that precedent and I keep it.
- *"**Input: movement only.** No aiming, clicking, or ability buttons. One thumb."* —
  `02-GAMEPLAY.md` `[you accepted: step 6 Q3]` → `[brief: soft]`, **already overruled by R-1**
  (`cid/_state.md`), contained to one input class, two verbs, four controls. Not re-litigated here.
- *"Already accessible by construction: movement-only input … one-handed play."* —
  `04-PRESENTATION.md` `[you accepted: R6 Q4]` → `[brief: soft]`. `mechanics/03` records that
  this claim is now weaker by exactly one tap. One-handed reach is therefore a real constraint
  on where a pressable may sit, not a leftover phrase.
- *"**Declined:** a full pass with colourblind mode, text scaling and sensitivity options — out
  of scope at this size."* — `04-PRESENTATION.md` `[brief: soft]`. **No options menu, no text
  scale slider, no sensitivity control.** Adaptation is automatic or it does not exist.
- *"Target: the **smallest game that still gives every creative area real work.**"* —
  `00-CORE.md` `[you chose: R1 Q3]` → **`[brief: binding]`**. Four device rows, not four sheets.
- `input.pressable.minTouchTargetRule: "notSmallerThanPlatformJumpButton"`,
  `mayOverlapPlatformControlRegions: false`, `gamepadSelectable: true`,
  `keyboardAcceleratorAllowed: true` / `keyboardAcceleratorRequired: false` — `mechanics/02`,
  proposed key, treated as settled. `[brief: binding]` in effect via R-1.
- `mechanics/03` P5, verbatim: *"every game-drawn pressable is `Selectable`, sits in one
  navigable selection group, is **no smaller than the platform's own jump button on that
  device**, and intersects neither the platform's movement nor its jump control region."*
  This sheet is my acceptance test, not my starting point.
- `hud-overlay`'s `anchor: ["edge", "inset"]` and `ANCHOR_INSET` (`base: 8`, `mobile: 28`) —
  `[research: ui-forge/src/compose/patterns/hud-overlay.mjs:38-41]`. The pattern's entire
  safe-area vocabulary, and it is two literals.

**Scope gate.** Nothing in this subject is priority 2 or priority 3. Console is 5% of a
`[brief: soft]` split, not an excluded item; `input.pressable.gamepadSelectable` is `true`, so
gamepad reachability is already required work. No sheet below reserves space for, stubs or
describes rebirth, codes, dailies, leaderboards, trading, seasons or events.

## What the brief did not give me

Eight gaps. Each is routed; none is filled here.

| # | gap | routed to |
|---|---|---|
| P1 | **Orientation is unstated.** Nothing in the brief says whether the game runs landscape, portrait or both. It changes the answer completely: the dynamic thumbstick's capture frame is *left 40% × bottom two-thirds* in landscape and *full width × bottom 40%* in portrait, and the portrait case swallows both bottom clusters. `ui-forge` renders phone as `896×414`, **landscape only** (`cli.mjs:45`), which is a default nobody chose. | **01** |
| P2 | **What a device class *is*, mechanically, is unstated.** Three candidate instruments disagree: `ui-forge`'s `BREAKPOINTS` (`UIBuilder.luau:20`, `mobile ≤1000` / `tablet ≤1500` by width), `GuiService.ViewportDisplaySize` (`Small`/`Medium`/`Large`, no published pixel thresholds), and `UserInputService.TouchEnabled`. `mechanics/03` P4 bans a device read that changes *which verbs exist* but explicitly permits one that *"only sizes or positions an affordance"*, so the read is legal and unspecified. | **01** |
| P3 | **The four `[STOP: no value in the contract]` geometry literals are live in shipped code** — `MIN_TOUCH_TARGET_PX = 96`, `BUTTON_WIDTH_SCALE = 0.16`, `BUTTON_HEIGHT_PX = 64`, `TOUCH_PROBE_INTERVAL_SECONDS = 0.5` / `TOUCH_PROBE_WARN_AFTER_SECONDS = 10` (`Pressables.luau:112-140`). The module names each as a contract gap in its own comments. Category gap **G8**, geometry half. | **01** |
| P4 | **No key names the safe-area instrument.** `hud-overlay`'s inset is a fixed pixel offset, not a device query. The instrument that exists is `ScreenGui.ScreenInsets` (`None` / `DeviceSafeInsets` / `CoreUISafeInsets` / `TopbarSafeInsets`) and `ScreenGui.IgnoreGuiInset`, both properties of the one `ScreenGui` `client-main` creates. `init.client.luau:220-223` sets **neither**, while `docs/hand-written-control/init.client.luau:37` sets `IgnoreGuiInset = true`. The shipped build and its control diverge on the safe area and no sheet decided it. | **01**, with a consequence for `representation` |
| P5 | **No vertical budget exists for the persistent surface.** Nothing states how much of a phone's short axis the HUD may consume. At the shipped fallback it exceeds 100% — see the arithmetic in **Verification note**. | **01** for the budget; the arrangement is `composition`'s |
| P6 | **Nothing states what happens on a viewport change.** `UIBuilder.viewportClass()` (`UIBuilder.luau:94`) is evaluated once, from `build` (`:559`); `Pressables.layoutButtons` runs at bind and once more when touch controls appear (`Pressables.luau:528-556`). A rotation or a desktop window resize keeps the boot-time class and the boot-time geometry for the session. | **01** |
| P7 | **The touch-target floor has no referent on two of four device classes.** `minTouchTargetRule` is *"notSmallerThanPlatformJumpButton"*, and there is no `TouchGui` and no jump button on desktop or on a gamepad-only session. The rule as written is undefined for ~30% of the stated audience. | **01**, as a `## Pushing back` against `gameplay/mechanics/02-verb-roster.md` and `03-device-parity.md` P5 |
| P8 | **The device split is `[I assumed]` and stays uncorroborated** (category gap **G9**). I attempted corroboration and failed; see **Research owed**. | **01**, as a stated non-dependency |

## Why 2 sheets

`cid/_contract.md` holds 25 keys and **I own none of them.** `viewport` is not in
`bridge/schema.mjs`, so this domain runs to *produce* a key, not to fill one: **one sheet per
contract key I own gives exactly one value sheet.** The second sheet is licensed by the
narrow clause — a prohibition that shapes how every number in `viewport` is *read* rather than
being one of them — and it exists because the 2026-08-01 playtest proved the failure is real
and not hypothetical: `hud-overlay` sets `maxSize: { s: [0.46, …] }` on every corner cluster
(`hud-overlay.mjs:243`), `Pressables.luau` positioned against it, and three purchase buttons
landed at dead centre of the screen on top of the player's own character. A ceiling read as a
value is a 0.46-vs-0.11 error, and it shipped. Two decisions, separable: the first can be
correct and still be misread, which is what happened.

**What I did not split, and why.** The graph's `platform-profile-x` template implies one sheet
per platform, and four platform sheets would be four sheets each claiming part of `viewport` —
which the merger rejects. Phone, tablet, desktop and console are **rows inside the key**, not
sheets. I also did not split out gamepad focus order: the category lead placed it inside
`viewport` and it is one field of one key, not a second decision. Safe area, keepout and the
touch floor are likewise one subject — they are the same rectangle described from three sides.

| # | sheet | must decide |
|---|---|---|
| 01 | `device-viewport-rules` | Supply `viewport` as one `manifest` block covering all four device classes in one table: how a class is identified at runtime and whether the instrument is `ViewportDisplaySize`, a pixel breakpoint or a touch probe; which orientations are supported; the touch-target floor **derived** from the platform jump button rather than asserted (the pack carries the geometry: `70` px where `min(viewportX, viewportY) <= 500`, else `120` px, so the phone floor is 70 and the tablet floor is 120 and the shipped `96` px fallback is above the first and below the second); what a session with no jump button to measure uses instead, which is a `## Pushing back` against `mechanics/02` and `03` P5 because the rule is undefined there; the keepout rectangles as data, one per platform control per orientation, using the jump-button and dynamic-thumbstick geometry in the pack; the safe-area instrument as a concrete `ScreenGui.ScreenInsets` / `IgnoreGuiInset` value the one HUD `ScreenGui` must carry, stated as a consequence for `representation` since only `client-main` creates it; the fraction of the short axis the persistent surface may consume on each class, stated as a budget `composition` spends rather than as a layout; what happens on rotation and on resize given `viewportClass()` is evaluated once at boot; whether the `1`/`2`/`3` keyboard accelerator is rendered on classes that cannot press it; and the gamepad focus order over the four pressables **as an ordering rule that reads `composition`'s groups** — never as a restatement of where anything sits. Close the four `[STOP: no value in the contract]` literals in `Pressables.luau:112-140` by name. Every player-facing string obeys `vocabulary`: title case, ≤ 14 chars, `^[A-Za-z0-9 ,.'%%/-]+$`, and none of the eight banned words. |
| 02 | `a-ceiling-is-not-a-value` | Rule that every numeric field `viewport` publishes is tagged with its kind — `floor`, `ceiling` or `value` — and that a builder may never derive a position, a size or a reserved extent from a field whose kind is `ceiling`; a ceiling may only be used to clamp a measurement. Name the shipped instance as the worked example (`hud-overlay.mjs:243` sets a per-cluster `maxSize` of `0.46`; `Pressables.luau:151-171` reserved it as a width, put the purchase column's right edge at screen centre, and its own comment records that the realised cluster is about `0.11`) and state the build check that would have caught it. Carry **no `manifest` block** and say so in one line: this sheet constrains the shape of `viewport`'s values and supplies none of them. |

### The contract key this domain needs

**`viewport`**, owner `ui-ux/platform`, proposed by sheet 01. `[cid: decided]` — no key in
`cid/_contract.md` covers any of it, and five separate shipped literals exist because of that.

It would hold, per device class: the identification rule, supported orientation, the derived
touch-target floor, the keepout rectangles for platform-drawn controls, the safe-area
instrument and its value, the share of the viewport the persistent surface may occupy, the
gamepad focus-order rule, and the re-evaluation trigger. Field names and values are sheet 01's;
naming them here would be doing the writer's job.

## Verification note

**Sheet 01, and by the HUD lead's `composition`.** They are written in the same wave by
different writers, neither can read the other, and they meet at one number. The arithmetic that
makes the collision certain: on `ui-forge`'s phone viewport (`896×414`, `cli.mjs:45`) the jump
button is 70 px and its reserved band runs `H-90 … H`; `Pressables.layoutButtons` then uses
`height = max(BUTTON_HEIGHT_PX, minTouchPx) = max(64, 96) = 96` and `step = height + space.md
= 108`, so the topmost of three purchase buttons has its top edge at `H − (90 + 24 + 216 + 96)
= H − 426`. **That is −12 px on a 414 px viewport, before the Roblox top bar inset that
`init.client.luau` never disables.** The purchase column does not fit on a phone at the floor
it is required to meet — which is a player-visible defect under bar (1), the same audience R-1
was decided for. Sheet 01 owns the budget; `composition` owns whether three groups or one
group occupy that budget; if the two disagree, the budget wins, because a group that does not
fit is not a composition. State it that way so the wave's verifier has a precedence rule
rather than two sheets.

Second-most likely: the **gamepad focus order**. The category brief hands *"gamepad focus entry
and exit for a `SelectionGroup` that spans a HUD and a panel"* to **Navigation**. Sheet 01 owns
the ordering *within* the four pressables and must not state entry, exit, or what happens when
the index panel opens. If it does, two sheets claim one behaviour.

## Research owed

`must_verify` is **empty** for this node. I fetched anyway, because whatever I leave unfetched
the writer must decide on reasoning alone.

**I could not run `npm run bridge -- --contract`** — no shell tool in this session. I read
`cid/_contract.md` instead, which is that command's committed output (25 keys, regenerated from
`bridge/schema.mjs`), and confirmed by grep that `viewport` appears nowhere in `schema.mjs`.

**Verified and banked for the pack:**

- Jump button geometry. `minAxis = min(parent.AbsoluteSize.X, parent.AbsoluteSize.Y)`;
  `isSmallScreen = minAxis <= 500`; `jumpButtonSize = isSmallScreen and 70 or 120`; position
  `UDim2.new(1, -(size*1.5-10), 1, -size-20)` small, `UDim2.new(1, -(size*1.5-10), 1,
  -size*1.75)` large. Derived rects: small → `x ∈ [W-95, W-25]`, `y ∈ [H-90, H-20]`; large →
  `x ∈ [W-170, W-50]`, `y ∈ [H-210, H-90]`.
  `[research: https://github.com/Roblox/Core-Scripts/blob/master/PlayerScripts/StarterPlayerScripts_NewStructure/RobloxPlayerScript/ControlScript/TouchJump.lua]`
- Dynamic thumbstick capture frame — landscape `Size (0.4, 0, 2/3, 0)` at `Position (0, 0, 1/3,
  0)`; portrait `Size (1, 0, 0.4, 0)` at `Position (0, 0, 0.6, 0)`. The frame layout does not
  vary with screen size; only the drawn thumbstick art does.
  `[research: https://github.com/Roblox/Core-Scripts/blob/master/PlayerScripts/StarterPlayerScripts/ControlScript/MasterControl/DynamicThumbstick.lua]`
- The legacy `Thumbstick`, `DPad` and `Thumbpad` touch movement modes have been removed, so the
  dynamic thumbstick is the region that actually exists.
  `[research: https://devforum.roblox.com/t/psa-removing-legacy-touch-controls/361681]`
- `Enum.ScreenInsets` = `None` (0), `DeviceSafeInsets` (1), `CoreUISafeInsets` (2),
  `TopbarSafeInsets` (3); `CoreUISafeInsets` keeps descendants clear of the Roblox top bar and
  of device cutouts. `Enum.SafeAreaCompatibility` = `None` (0), `FullscreenExtension` (1).
  `[research: https://create.roblox.com/docs/reference/engine/enums/ScreenInsets]`
  `[research: https://create.roblox.com/docs/reference/engine/enums/SafeAreaCompatibility]`
- `GuiService:GetGuiInset()` returns `screenAreaTopLeft, screenAreaBottomRight`;
  `GetInsetArea(Enum.ScreenInsets)` returns a `Rect`, and its values *"only take effect on
  ScreenGuis that have their `IgnoreGuiInset` property set to false."* Gamepad members are
  `SelectedObject`, `AutoSelectGuiEnabled`, `GuiNavigationEnabled`, `Select()`.
  `[research: https://create.roblox.com/docs/reference/engine/classes/GuiService]`
- `GuiObject` gamepad members: `Selectable`, `SelectionOrder`, `NextSelectionUp/Down/Left/Right`,
  `SelectionImageObject`. **`SelectionGroup` is not a `GuiObject` property** in the current
  reference — `Pressables.luau:423` sets `button.SelectionGroup = gamepadSelectable`, which
  sheet 01 should verify against Studio before `mechanics/03` P5's *"one navigable selection
  group"* is treated as satisfied.
  `[research: https://create.roblox.com/docs/reference/engine/classes/GuiObject]`
- `GuiService.ViewportDisplaySize` (`Small`/`Medium`/`Large`) exists and is the platform's own
  device-class instrument.
  `[research: https://devforum.roblox.com/t/full-release-build-cross-platform-ui-with-the-viewportdisplaysize-api/3880384]`

**Fetched and found empty — recorded so nobody re-fetches:**

- **Roblox publishes no minimum touch-target pixel figure.** `create.roblox.com/docs/production/
  publishing/adaptive-design` was fetched and carries principles only, no numbers. The console
  guidelines page likewise gives no TV-safe percentage and no minimum text size. This is *why*
  `minTouchTargetRule` names a measurement, and it vindicates that choice.
  `[research: https://create.roblox.com/docs/production/publishing/adaptive-design]`
  `[research: https://create.roblox.com/docs/production/publishing/console-guidelines]`
- **`ViewportDisplaySize`'s Small/Medium/Large pixel thresholds are not published.** Settling
  fetch: the later pages of the announcement thread above, or a Studio read of
  `GuiService.ViewportDisplaySize` on three emulated devices. `[unverified]`

**Could not verify:**

- **The 70/25/5 device split** stays `[unverified]`, as it was after wave 2. No public Roblox
  figure states a per-experience platform mix and this game has no analytics. The fetch that
  would settle it is the experience's own Creator Dashboard platform breakdown post-launch, and
  it does not exist yet. Sheet 01 must rest on the *band* — 8–14, mobile-heavy — and say so.
- **The Core-Scripts repository is the legacy mirror, not the shipping source.** The live
  control script is `PlayerScripts.PlayerModule.ControlModule`. The 70/120 figures and the
  thumbstick fractions are believed current and are consistent with the shipped
  `Pressables.measurePlatformControls`, but they are **not** read from the running engine.
  Settling check: read `PlayerGui.TouchGui.TouchControlFrame.JumpButton.AbsoluteSize` in Studio
  on an emulated phone and an emulated tablet. This is survivable by design — `Pressables.luau`
  *measures* the button rather than assuming it, and sheet 01 must keep that property: the
  fetched numbers belong in the sheet as the **fallback and the check**, never as the
  runtime value. `[unverified — as a live value]`
- **The defaults of `ScreenGui.ScreenInsets` and `IgnoreGuiInset`** are not stated on the
  fetched reference page. That `IgnoreGuiInset` defaults to `false` is inferred from
  `docs/hand-written-control/init.client.luau:37` explicitly setting it `true`. `[unverified]`
