# Research pack

**Generated. Do not hand-edit** — run `npm run cid:research` to rebuild, or have a
research pass append new entries below the marker at the end.

Extracted from `cid`. 270 unique source(s); 164 were
fetched by more than one sheet, which is the duplication this file exists to stop.

A spec writer **does not fetch**. It cites an entry here. `npm run cid:verify` fails any
`[research: url]` naming a URL absent from this file, so the rule "never cite a page you
did not fetch" becomes checkable instead of trusted.

---

## https://create.roblox.com/docs/reference/engine/classes/MarketplaceService

*Cited by 9: `analytics/funnels/03-the-purchase-read`, `gameplay/monetization/02-what-is-never-sold`, `gameplay/monetization/_lead`, `tech/networking/04-ownership-authority`, `tech/networking/_lead`, `ui-ux/feedback/03-system-notices`, `ui-ux/feedback/_lead`, `ui-ux/store/02-when-a-purchase-applies`, `ui-ux/store/_lead`*

- *The two platform facts, and one of them is `[unverified]` and stays that way.** `UserOwnsGamePassAsync` results are cached, and *"If the user purchases a game pass outside of the experience while remaining in the same session, the cache is eventually updated, but this process might take several minutes to propagate"* ``, corroborated developer-side ``. `PromptGamePassPurchaseFinished(player, gamePassId, wasPurchased)` exists and is documented as firing when a purchase prompt closes `` — but the first-party pages **state no triggering condition**, so *"an experience-page purchase fires no…
- *The `MarketplaceService` `[unverified]` is now moot and is recorded as closed rather than deleted.** The first draft flagged that whether a `LocalScript` may call `PromptGamePassPurchase` is not stated on the page as fetched ``. Under R-4 the method is never called from either side, so the question no longer bears on any row. It would return the moment a purchase surface is proposed, and `F13` is where it would land.
- The prompt methods take a `player` argument, and ownership is read with `UserOwnsGamePassAsync(userId, gamePassId)`. `` **`[unverified]`** — whether a `LocalScript` may call `PromptGamePassPurchase`, and whether ownership results are cached within a session, are not stated on the page as fetched. Settled by fetching `create.roblox.com/docs/reference/engine/classes/MarketplaceService#PromptGamePassPurchase` directly for its security context, which is the one thing sheet `02`'s "never unprompted" row and G6's trigger question turn on.
- *The other half of my lead's finding stands.** `PromptGamePassPurchaseFinished` fires only for a prompt the experience raised ``, `products.F13` forbids every `PromptGamePassPurchase` call in the build, and no in-experience event fires for a website purchase ``. So there is no **event** trigger. A **poll** is the only trigger, and it is sufficient.
- *The mid-session pass purchase (case c): the answer is that no notice may fire, and the reason is stronger than the copy rule.** Under R-4 the game never calls `PromptGamePassPurchase`, and `PromptGamePassPurchaseFinished` is documented only as firing *"when the purchase prompt closes"* in response to that method ``. `UserOwnsGamePassAsync` is cached per server, which is precisely why re-polling is the documented anti-pattern ``. So **the client never learns the purchase happened**. There is nothing to notify about, not merely nothing sayable. 03 must state that in the value, with that…
- `` and `` — the two sources behind the case-(c) ruling above.
- *The Feedback reading is correct and is about a different thing.** `PromptGamePassPurchaseFinished` fires only for a prompt the experience raised ``, `products.F13` forbids raising one, and no in-experience event fires for a website purchase ``. So **nothing is pushed** to anybody — which forbids event-driven detection and a notice, and says nothing about polling. Its sentence *"the client never learns the purchase happened"* is true of the client and must not be read as true of the server, or a builder concludes there is nothing to poll ``.
- `` — the rendered reference page. Confirms `PromptGamePassPurchaseFinished(player, gamePassId, wasPurchased)` exists and fires on prompt completion, i.e. only for prompts the experience raised.

## https://www.rolimons.com/game/133086043677134

*Cited by 9: `gameplay/meta/_lead`, `gameplay/monetization/01-the-offer-ladder`, `gameplay/monetization/_lead`, `liveops/codes/_lead`, `liveops/events/_lead`, `liveops/roadmap/_lead`, `liveops/seasons/_lead`, `theme/fantasy/_lead`, `theme/tone/_lead`*

- **The reference ships one badge and no completion structure at all.** Refetched: 38,488,789 visits, 578,470 favourites, 96.198% likes, all-time peak 10,435 CCU, current 1,659 (the brief recorded 819, so the decay has partially reversed). Its only badge is Welcome, awarded 16,306,690 times at a 100% win rate. Passes unchanged at 29 / 99 / 99 / 199 / 2,500 Robux, plus a 495,130-Robux "Test" pass that is plainly not a product.
- *499, restated without the ladder-ratio clause it no longer has.** 499 is the top of the corroborated premium band and the observed ceiling of both Faith and DIG `` `` ``. The two single-item comparables sit above it — Carpet Cleaning at 1,499, and the reference's own oversized tool at 2,500 `` — and both bands were declined on `00-CORE.md` grounds, because the only argument either source gives for them is revenue concentration. `[cid: decided]`
- The brief's reference **`[🌱] Grass Incremental Simulator`** still ships exactly the pass list the brief recorded, so the brief's monetization numbers are current rather than stale: **2x Walkspeed 29 · 2x Rebirths 99 · 2x Grass Luck 99 · 2x EXP 99 · 2x Bronze 199 · [OP] Giant Trimmer 2,500**, offsale "2x Grass" and "Nothing", at 38,488,889 visits, 135,478 upvotes and 1,659 current CCU. One extra entry appears that is **not a price point and must not be averaged into anything** — a pass named "Test" listed at 495,130 Robux, which is a developer artifact. ``
- The reference at 38,571,201 visits, all-time peak CCU 10,435, past-24h CCU 1,259, seven passes listed, description advertising the group boost, **codes nowhere on the page** ``
- 1. https://create.roblox.com/docs/production/promotion/experience-events — the platform *does* have a scheduled-events system, which is the fact that stops this ruling resting on *"the mechanism does not exist."* It does exist, at the platform level, and what closes it is scope and the binding non-goal. Verified against the creator-docs source at https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/production/promotion/experience-events.md — *"Currently, you can publish a maximum of 10 ongoing or upcoming events"*, *"The best events run for 7-30 days and highlight…
- **The reference, refetched.** Last updated **2 days ago**; created ~1 year ago; **1,259 current CCU, 1,659 over the past 7 and 30 days, all-time peak 10,435**, 38,571,201 visits ``. **The brief's 819 figure is stale in both directions and must be quoted honestly**: the decay partially reversed (819 → ~1,259–1,659), *and* a weekly cadence sustained for a year still sits at ~12–16% of peak. The brief's conclusion — *"satisfaction is not the same as retention"* — survives its own number moving, which is the correct way to use it.
- *And the genre does not require it.** The direct reference `[🌱] Grass Incremental Simulator` ships **six real passes — 2x Walkspeed 29, 2x Rebirths 99, 2x Grass Luck 99, 2x EXP 99, 2x Bronze 199, [OP] Giant Trimmer 2,500 — plus a "Test" pass at 495,130 R$ that is a developer artifact, and not one of them is a season pass, battle pass or reward track**, at 38,571,201 visits, 96.187% likes and 1,259 current CCU, refetched this run ``. Unlike Codes, this domain has **no** sourced counter-evidence of the *"its absence reads as an unfinished game"* kind, and the sheet should say that plainly…
- **The reference's live pass list, refetched:** 2x Walkspeed 29 · 2x Rebirths 99 · 2x Grass Luck 99 · 2x Bronze 199 · 2x EXP 99 · [OP] Giant Trimmer 2,500, plus an offsale "Nothing" and "2x Grass" and a "Test" pass at 495,130 R$ that is a developer artifact and must not be averaged into anything. **None is a season pass, battle pass or reward track.** 38,571,201 visits, 96.187% likes, 1,259 current CCU — visits and CCU both moved since the last banking (38,488,789 / 1,659), so the figures are live rather than stale. ``
- *Two research facts from the brief that bear directly on my subject.** The reference decayed *"10,435 peak to 819 current, while still being actively updated weekly ... satisfaction is not the same as retention"*, and *"Any spin-off inherits this shape by default"*; and its players already expect *"a luck/rarity roll to chase, and **a visible collection of what they have found**"* (`research/grass-incremental.md`) ``.
- **`Grass Incremental Simulator`** (Unequal Games, the direct reference). Description: *"A relaxing lawn-trimming simulator game"* with a foliage glyph, then *"The more you rebirth and upgrade, the more fun the game becomes!"*, followed by imperative bulleted features (*"Trim the grass!"*, *"Upgrade for faster trimming!"*) and an early-access note. Register: a glyph in the title and in the first line, exclamatory, second-person imperative, enthusiastic rather than jokey. No humor and no puns surfaced in the store copy. `` Numbers re-confirmed on a second source: 38.3M visits, 96.2% likes,…

## https://create.roblox.com/docs/parts/materials

*Cited by 8: `art/environment/01-world-part-budget`, `art/environment/03-groundwork-and-channels`, `art/objects/02-the-object-roster`, `art/objects/03-the-tool-in-hand`, `art/objects/05-foliage-form`, `art/objects/_lead`, `art/style/01-palette-and-materials`, `art/style/_lead`*

- **Weathering with zero uploaded assets.** `MaterialVariant` and `SurfaceAppearance` both require an uploaded texture; built-in base materials require none, their *"texture assets are bundled with Studio"* ``, and `Limestone` and `Cobblestone` are base materials valid on a `BasePart` ``. So `P7` weathering is carried by the material choice and by nothing else. Stain overlays, patina parts and softened arrises are **not depicted**, and that is an accepted loss, not an omission: each would cost an uploaded image against `uploadedImageAssetsInWorldGeometry` 0 and `N17`, or a second tuple…
- **Why `Cobblestone` and not `Slate`.** `theme/setting/01` forbids grey granite, white marble, red brick and dark basalt and requires *"warm pale limestone, dressed and weathered"*; the same sheet makes *"pattern in paving"* one of the four permitted ornament channels. `Cobblestone` is a base material applicable to a `BasePart` and carries a bundled tileable pattern at **zero uploaded assets** ``, ``. `Slate` supplies neither the warmth nor the dressed-joint pattern and is the material a builder chose because no key stated one.
- **The defect is not in dispute.** `game/src/server/Tool.luau:211`: *"Colour, Material and Transparency are deliberately NOT set: no key states them, so the engine defaults stand rather than this module choosing an appearance. Reported."* Two `Part`s in every player's hand render as default-grey `Plastic` ``. That is gap G7 and closing it is why `objectArt` is being proposed. Every value below is `[cid: decided]`: **the brief names no material, colour or finish for any object** (O1).
- **The choice space is exactly 47 built-in `Enum.Material` members** ``. `MaterialVariant` and `SurfaceAppearance` are both out on a source, not an assumption: their texture maps require that you *"paste an asset ID or import a new texture from your computer"*, while built-in base materials need no upload because their *"texture assets are bundled with Studio"* ``. `budgets` sets `uploadedImageAssetsInWorldGeometry` to 0, so both routes are forbidden outright.
- **Zero children closes O5, and the arithmetic is not close.** No key forbids a child on a patch — `representation.patch.properties` lists properties, not children. One `Decal` per patch at the merged deepest bay takes a lane from `patchCount + 6` = **646** to **1,286**, which is 20,576 Instances across `runtime.maxPlayers` 16 against `serverWorldInstanceCeiling` **12,000** — **171% of the ceiling**, from 86% today. That breaks at every batching factor, so it needs no measurement to rule. A `Decal` or `Texture` is separately an uploaded image asset, which…
- `` — the distinction the enum page omits. A `MaterialVariant`'s texture maps require that you *"paste an asset ID or import a new texture from your computer"*; `SurfaceAppearance` uses the same PBR texture route; built-in base materials require no upload, their *"texture assets are bundled with Studio instead of being accessible as a typical asset ID."* **This settles that any custom material in this game is an uploaded image asset, which `budgets.textureCeilings.uploadedImageAssetsInWorldGeometry: 0` forbids outright.** It is the sourced half of sheet 03's constraint.
- *A limestone world costs zero uploaded assets.** `Limestone`, `Sandstone`, `Concrete`, `Cobblestone`, `Pavement`, `Rock`, `Slate` and `Granite` are base materials applicable to a `BasePart`, and built-in base material textures *"are bundled with Studio instead of being accessible as a typical asset ID"* ``. `MaterialVariant` and `SurfaceAppearance` both take a PBR texture you *"paste an asset ID or import"* for ``, which is what makes both forbidden under `budgets.textureCeilings.uploadedImageAssetsInWorldGeometry` 0 and `N17` — sourced, not assumed. `Enum.Material` has 47 members including…

## https://create.roblox.com/docs/production/analytics/analytics-dashboard

*Cited by 7: `analytics/engagement/01-session-shape`, `analytics/engagement/03-retention-readout`, `analytics/engagement/_lead`, `analytics/funnels/01-onboarding-funnel`, `analytics/kpis/01-kpi-admission-rule`, `analytics/kpis/02-the-shortlist`, `analytics/kpis/_lead`*

- *Whether the dashboard exposes a full session-length distribution is `[unverified]`.** Only the average is documented, plus a P50/P90 percentile toggle on charts ``; a standing community request for percentile session length carries no staff reply ``, so the absence is **inferred from the request, not stated by Roblox**. Settling fetch: a current capture of a live Engagement page showing its complete chart list, which needs an account.
- *Zero game-defined events, verified rather than assumed.** D1/D7/D30 arrive from the Retention page with daily and weekly cohorts and no developer setup ``, broken down by acquisition source and comparable against a selectable benchmark set covering average playtime and D1/D7/D30 ``, with the standard filter dimensions available ``. **This half of the domain asks logging-pipeline work for nothing at all.**
- Roblox creator-docs, analytics dashboard — the Filter By dimensions (age group, country, platform, OS, memory group, acquisition source, payer status), the average-versus-percentile toggle with P50 and P90, and the benchmark band explanation. ``
- *Three custom fields, and device is deliberately not one of them.** The platform allows exactly three, keyed only as `CustomField01/02/03` ``, with 8,000 combined values before the rest group as `Other` ``. The brief's `~70/25/5` device split is the wrong spend twice over: events *"can only be sent from the server and in published games"* `` and no server-side observable of device exists inside a seven-channel protocol; and the Creator Dashboard already breaks every metric down by Platform and OS with no developer event ``. Field 2 adopts `telemetry`'s `owned ["none","span"]` verbatim.
- *The declined goals are handled by removing the target, not the reading.** A number with a target and an actor is a thing somebody is trying to move; a number with neither is a thing somebody is looking at. D1/D7/D30 arrive from the platform with zero instrumentation ``, so refusing to *record* them would be a second mistake on top of the first. `K3` draws the line at the target, which is where *"Beating the genre's retention curve. Offered and declined"* `[brief: binding]` ← `[you chose: R1 Q3]` actually binds. Ruling R-3 (`cid/_state.md`) already declined an under-scoping finding on this…
- *Dashboard layout is declined as a design artifact, kept as a per-row placement column.** The Creator Dashboard's pages exist and are not ours to lay out ``, against 100 custom event names and ten funnel tabs ``. These rows add **no new event name**.
- Dashboard pages and breakdowns, and the fact that Retention/Engagement/Demographics/Monetization arrive with no instrumentation; breakdowns include platform, age group, OS, gender, source, country, language, first-played date; *"Benchmarks for similar games update daily."* ``

## https://devforum.roblox.com/t/do-not-cache-results-of-userownsgamepassasync/3639404

*Cited by 7: `analytics/funnels/03-the-purchase-read`, `analytics/funnels/_lead`, `tech/networking/04-ownership-authority`, `ui-ux/feedback/03-system-notices`, `ui-ux/feedback/_lead`, `ui-ux/store/02-when-a-purchase-applies`, `ui-ux/store/_lead`*

- *The two platform facts, and one of them is `[unverified]` and stays that way.** `UserOwnsGamePassAsync` results are cached, and *"If the user purchases a game pass outside of the experience while remaining in the same session, the cache is eventually updated, but this process might take several minutes to propagate"* ``, corroborated developer-side ``. `PromptGamePassPurchaseFinished(player, gamePassId, wasPurchased)` exists and is documented as firing when a purchase prompt closes `` — but the first-party pages **state no triggering condition**, so *"an experience-page purchase fires no…
- *Ownership is readable and a purchase is not.** *"Currently Roblox will cache the results of `UserOwnsGamePassAsync`"* ``, which corroborates `cid/_state.md` build note 4 from the platform side. I could **not** get a first-party statement that a pass bought on the experience page raises no server-side event: `create.roblox.com/docs/reference/engine/classes/MarketplaceService` documents `PromptGamePassPurchaseFinished(player, gamePassId, wasPurchased)` and states **no** triggering condition, so *"an experience-page purchase fires no in-game event"* is `[unverified]` as a first-party claim,…
- *Both claims can be true, and here is exactly how.** "Cached" and "eventually updated" are both properties of a cache with a refresh, and the pack's second source says only *"Currently Roblox will cache the results of `UserOwnsGamePassAsync`"* with rejoining as the *common workaround* — it never says the cache is immortal ``. The feature request my lead read asks for the cache to be invalidated *when `PromptGamePassPurchaseFinished` fires*, i.e. for an **immediate** update on the in-experience path; the documentation says that path already updates immediately. So the request is about…
- *The mid-session pass purchase (case c): the answer is that no notice may fire, and the reason is stronger than the copy rule.** Under R-4 the game never calls `PromptGamePassPurchase`, and `PromptGamePassPurchaseFinished` is documented only as firing *"when the purchase prompt closes"* in response to that method ``. `UserOwnsGamePassAsync` is cached per server, which is precisely why re-polling is the documented anti-pattern ``. So **the client never learns the purchase happened**. There is nothing to notify about, not merely nothing sayable. 03 must state that in the value, with that…
- `` and `` — the two sources behind the case-(c) ruling above.
- *The Networking reading rests on weaker evidence and I am not adopting its conclusion.** It cites an open devforum feature request asking for the cached value to be invalidated when `PromptGamePassPurchaseFinished` fires, with no staff reply ``. That is community consensus, and the request is *for* behaviour the current documentation now describes; a request that may since have been granted is not evidence it was refused. The second devforum thread establishes only that a cache exists, which nobody disputes, and its own workaround — *"the only valid way … is by having players rejoin"* — is…
- `` — developer-side corroboration that the cache is real and that *"the only valid way to validate gamepass purchases is by having players rejoin"* is the common workaround. Cited as evidence of the belief build note 4 encodes, **not** as evidence the belief is correct; the reference above is the one that governs.

## https://create.roblox.com/docs/production/publishing/accessibility

*Cited by 6: `art/lighting/02-the-readability-floor`, `art/lighting/_lead`, `art/style/01-palette-and-materials`, `art/style/_lead`, `ui-ux/screens/03-text-policy`, `ui-ux/screens/_lead`*

- *That does not fail the brief, and no sheet may pretend the floor is what satisfies it.** The requirement is *"rarity tiers must differ by shape or silhouette, not only hue … a requirement, not a nicety"* `[brief: soft]`, read as binding by `architect/06`, and it is carried by `tiers` shipping four distinct shapes at four heights, checked by `tiers` criterion 4. The platform lands in the same place: Roblox publishes **no contrast ratio at all** and recommends *"different symbols alongside colors"* ``. **The luma floor buys one thing — cleared ground never reads darker than the plants on it…
- *The luma floor is not the legibility guarantee, and no sheet may claim it as one.** It is Rec.601 luma; WCAG 1.4.11's 3:1 is sRGB relative luminance, a different quantity, computing to roughly **1.5:1** against `tiers[0]`. That does not fail the brief — the guarantee is `tiers`' four shapes and four heights under *"rarity tiers must differ by shape or silhouette, not only hue"* `[brief: soft]`, treated as effectively binding — but a sheet that cites the luma floor as an accessibility conformance claim is citing the wrong number. Roblox publishes no contrast ratio and prescribes *"different…
- *`TextScaled` is banned outright, and the reason is accessibility rather than taste.** Labels with `TextScaled` *"bypass the `PreferredTextSize` value entirely"*, while `AutomaticSize` objects *"resize their bounds as text size changes"* and wrapped text *"flows to additional lines as `PreferredTextSize` increases"* ``. A player who raises Text Size in the Roblox menu must get larger text, and `TextScaled` silently removes that. `Enum.PreferredTextSize` has four members, `Medium` (default), `Large`, `Larger`, `Largest` ``.
- `` and its source `` — *"The **Text Size** setting maps to the `GuiService.PreferredTextSize` property which defaults to `Medium`"*; elements using `UITextSizeConstraint` *"won't expand beyond their `MaxTextSize` or shrink below `MinTextSize`, regardless of player preferences"*; labels with `TextScaled` enabled *"bypass the `PreferredTextSize` value entirely"*; `AutomaticSize` objects *"resize their bounds as text size changes"*; when `TextWrapped` is active *"text flows to additional lines as `PreferredTextSize` increases"*. On colour: *"over 5% of people in the world have some form of…

## https://create.roblox.com/docs/reference/engine/classes/GuiService

*Cited by 6: `ui-ux/navigation/03-close-and-focus-by-device`, `ui-ux/navigation/_lead`, `ui-ux/platform/01-device-viewport-rules`, `ui-ux/platform/_lead`, `ui-ux/screens/03-text-policy`, `ui-ux/screens/_lead`*

- *Focus is one value at one node.** `GuiService` carries `SelectedObject`, `AutoSelectGuiEnabled`, `GuiNavigationEnabled`, `Select()` and `MenuIsOpen` / `MenuOpened` / `MenuClosed` ``. On gamepad, `SelectedObject` is `Pressable_INDEX` immediately after **both** edges: on open it is already there, because that is the control the player just activated and nothing inside the panel is selectable; on close it is written if it is `nil`. A gamepad player is never left with no selection. On touch and mouse the game never writes it — setting it for a mouse player draws a selection box nobody asked…
- `` — `SelectedObject`, `AutoSelectGuiEnabled`, `MenuIsOpen`, `MenuOpened`/`MenuClosed` exist. `MenuOpened` is the one signal that tells a client the platform menu took the screen.
- *The safe area needs an instrument and one exists.** `CoreUISafeInsets` keeps descendants clear of the Roblox top bar and of device cutouts, and inset values *"only take effect on ScreenGuis that have their `IgnoreGuiInset` property set to false"* `` ``. `init.client.luau:220-223` sets neither while `docs/hand-written-control/init.client.luau:37` sets `IgnoreGuiInset = true`: the build and its control diverge and no sheet decided it. Once the engine supplies the inset, `ANCHOR_INSET` (`base: 8`, `mobile: 28`) double-counts, so `anchor: "edge"` is the only legal variant here ``.
- `GuiService:GetGuiInset()` returns `screenAreaTopLeft, screenAreaBottomRight`; `GetInsetArea(Enum.ScreenInsets)` returns a `Rect`, and its values *"only take effect on ScreenGuis that have their `IgnoreGuiInset` property set to false."* Gamepad members are `SelectedObject`, `AutoSelectGuiEnabled`, `GuiNavigationEnabled`, `Select()`. ``
- *`TextScaled` is banned outright, and the reason is accessibility rather than taste.** Labels with `TextScaled` *"bypass the `PreferredTextSize` value entirely"*, while `AutomaticSize` objects *"resize their bounds as text size changes"* and wrapped text *"flows to additional lines as `PreferredTextSize` increases"* ``. A player who raises Text Size in the Roblox menu must get larger text, and `TextScaled` silently removes that. `Enum.PreferredTextSize` has four members, `Medium` (default), `Large`, `Larger`, `Largest` ``.
- `Enum.PreferredTextSize` has four members — `Medium` (default), `Large`, `Larger`, `Largest` — reachable via `GetPropertyChangedSignal`. ``

## https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/production/analytics/custom-events.md

*Cited by 6: `analytics/events/01-event-catalog`, `analytics/events/03-emission-budget`, `analytics/events/_lead`, `analytics/funnels/01-onboarding-funnel`, `analytics/funnels/02-comprehension-instruments`, `analytics/funnels/_lead`*

- **Thirteen names against a cap of 100, and three fields against a cap of 3.** The platform's own advice is to spend cardinality on fields rather than names — *"You should use custom fields whenever possible instead of event names, since there is a much tighter cardinality limit on event names than custom fields"* ``. The binding constraint is therefore not the name cap (13% used) but the field cap (100% used).
- *The brief's own `OPEN.md §2` watch item *"instance count per area on mobile"* cannot be emitted at all.** *"Events can only be sent from the server and in published games. Events can't be sent from the client or Studio"* ``. The brief asked to watch something the platform forbids measuring; that is a gap in the interview, recorded rather than smoothed over.
- Server-only emission and the batching advice `` — *"Events can only be sent from the server and in published games. Events can't be sent from the client or Studio."* · *"You can add up to 100 custom events to your game."* · *"You should use custom fields whenever possible instead of event names, since there is a much tighter cardinality limit on event names than custom fields."* · values *"can also be used as a way to send events in batches in order to stay under the rate limits."*
- *Three custom fields, and device is deliberately not one of them.** The platform allows exactly three, keyed only as `CustomField01/02/03` ``, with 8,000 combined values before the rest group as `Other` ``. The brief's `~70/25/5` device split is the wrong spend twice over: events *"can only be sent from the server and in published games"* `` and no server-side observable of device exists inside a seven-channel protocol; and the Creator Dashboard already breaks every metric down by Platform and OS with no developer event ``. Field 2 adopts `telemetry`'s `owned ["none","span"]` verbatim.
- *The three rows that read a client surface or an intention are the interesting ones, and only one of them is actually lost.** Analytics events *"can only be sent from the server and in published games. Events can't be sent from the client or Studio."* `` So:
- *The platform limits, which are hard ceilings on anything this domain specs:** *"Total `AnalyticsService` requests per minute: 120 + (20 * CCU)"*; 10 funnels; 100 steps per funnel; 3 custom fields per event; 8,000 unique value combinations across them, *"grouped as 'Other' after"*; 100 custom event names; and *"Events remain visible on the Creator Dashboard and automatically expire after 90 days from last data received"* ``. The 10-funnel cardinality is *"on a daily basis"* and an over-limit event *"will succeed but those that exceed the limit will be dropped and will not be shown"* ``.…

## https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/reference/engine/classes/GuiObject.yaml

*Cited by 6: `audio/ui/03-stated-silences`, `audio/ui/_lead`, `ui-ux/feedback/01-the-notice-channel`, `ui-ux/navigation/02-concurrency-and-suspension`, `ui-ux/navigation/03-close-and-focus-by-device`, `ui-ux/navigation/_lead`*

- *Hover is a stated zero on every device class, not a sheet.** Roblox's own mobile input surface documents touch gestures, device motion, haptics and on-screen buttons and **no pointer or hover state at all** ``; `GuiObject.MouseEnter` and `MouseLeave` are described purely as mouse events ``. The brief's audience is *"mobile-heavy"* `[brief: binding]` ← `[you chose: R1 Q4]` (`00-CORE.md`), so most of it cannot produce the event; `composition` defines no hover state for any element; and a desktop-only cue on the game's only currency sink breaks `mechanics/03`'s parity floor, which requires…
- `GuiObject.MouseEnter`/`MouseLeave` are described purely as mouse events; `Selectable` is *"whether the GuiObject can be selected when navigating GUIs using a gamepad"*; `SelectionGained`/`Lost` fire when *"the Gamepad selector starts/stops focusing on"* an object. ``
- All four booleans false. Realised as `Active = false` — *"Determines whether this UI element sinks input"* — and `Selectable = false` — *"Determine whether the GuiObject can be selected by a gamepad"* ``. **That pair is the whole of *"a notice must never swallow a tap"*, and it holds at every depth**, which is what my withdrawn `zIndexBelow: "pressable"` was redundantly trying to buy. It bought nothing and cost `B2` and `B3` behind an open panel. **Accepted, not contested.**
- *Z-order was chosen in the first place because it is robust to the one fact this domain could not settle.** `GuiObject.Active` is documented only as *"Determines whether this UI element sinks input"* ``. `[unverified — whether Active sinks a touch tap identically to a mouse click. Settled by the creator-docs input-propagation page for `content/en-us/ui/`, or by a Studio device-emulator run on a phone viewport with a button under an Active frame. It would decide ~70% of the audience's behaviour under a geometry rule and decides nothing under a z-order rule — which now carries the exit as…
- *With the close control gone the navigable set never changes size, and that is a gift to `viewport`.** The 24 slots have nothing to activate, so every slot frame, slot label and heading is `Selectable = false` — `Selectable` *"determine[s] whether the GuiObject can be selected by a gamepad"* ``. The selectable set is therefore **exactly the four pressables, open or closed**, so Platform's focus order operates on one constant set and never needs a fifth position. This holds whether or not `SelectionGroup` exists as a property: the pack's fetch of the rendered `GuiObject` reference lists…
- `` — `Active`: *"Determines whether this UI element sinks input."* `Selectable`: *"Determine whether the GuiObject can be selected by a gamepad."* `SelectionOrder`, `NextSelectionUp` as described. These are the four properties the graph is realised in.

## https://www.rosenberryrooms.com/grass-incremental/

*Cited by 6: `gameplay/onboarding/02-first-minute-beats`, `gameplay/onboarding/03-teaching-order`, `gameplay/onboarding/_lead`, `liveops/events/_lead`, `theme/tone/02-flavour-and-humor`, `theme/tone/_lead`*

- *The reference is a model for shape, not for order.** It teaches cut → currency → upgrades → rarity → zones → rebirth `` `` — exactly the *economy first, finds later* alternative `02-GAMEPLAY.md` declined, and it has no discovery layer to teach. **Position 2 is the whole divergence and this sheet puts a Find there.**
- *Rank 2 is the divergence and it is deliberate.** The reference teaches cut → currency → upgrades → rarity → zones → rebirth `` ``, the *economy first, finds later* order `02-GAMEPLAY.md` **declined** *"because a new player could quit before ever seeing what makes this game different"*. It has no discovery layer to teach; this game puts the Find at position 2 in *time*, riding `firstClear`.
- The reference's teaching order is **cut → currency → upgrades → rarity → zones → rebirth**. The beginner guide's own priority is "Grass Value" then "Grass Growth Speed" then "Blade Size"; mutations (Silver, Gold, Diamond) are met after upgrades; islands and rebirth come last, with its Phase 1 covering the "First Hour" ``
- **Structurally, immediately, and that part is sourced.** The player "spawn[s] on a small grassy platform with a basic saw blade attached to your character", and grass appears "as green blocks that you can walk through to cut and collect" ``; the action is "Simply walk through grass blocks to cut them automatically", with no animation or interaction ``. Tool equipped at spawn, standing in the resource, proximity harvest: **the first payoff is the first blade touched.** Our design inherits that shape and adds a Find to the same instant.
- **In wall-clock seconds, `[unverified]`.** No source I reached states a measured time to first currency or to first upgrade. The two milestone figures I did get are thresholds, not durations: a first rebirth "usually around 1,000 grass" and Island 2 after "5 rebirths" ``, and they disagree with the other guide's advice to grind "approximately 10-15 rebirths before seriously pursuing the second island" ``, which is a strategy claim rather than a gate. **The specific fetch that would settle it:** a transcript or timestamped capture of the first 120 seconds of game id 133086043677134 — the…
- *Whether this genre ships item text at all could not be established.** Two of three source types failed (HTTP 402, HTTP 405) and the third characterises the reference rather than quoting it, offering only a *"relaxing, meditative quality"* ``. Recorded as unavailable, not as absent. `[research owed: an in-client screenshot of the reference's collection panel, or a fan wiki page in this family that reproduces item text]`
- 1. **How the register actually reads to 8–14 year olds.** Nothing fetchable settles this; it is reception, not fact. `[playtest unknown]`, starting position whatever sheet 01 sets. What would settle it: a read-back comprehension check with players in the band against the written copy, and as a cheap proxy available before any playtest, a Flesch-Kincaid score computed on the actual copy once it exists. 2. **Whether any game in this family ships item-level flavour text at all**, which would tell sheet 02 whether the surface it needs has genre precedent. Three source types were tried and two…

## https://create.roblox.com/docs/production/game-design/onboarding

*Cited by 5: `gameplay/onboarding/02-first-minute-beats`, `gameplay/onboarding/03-teaching-order`, `gameplay/onboarding/_lead`, `ui-ux/feedback/01-the-notice-channel`, `ui-ux/feedback/_lead`*

- *In wall-clock seconds the reference is unmeasured**, so no number here is sourced from it. `[research owed: a timestamped capture of the first 120 seconds of Roblox place 133086043677134 — time to first currency and to first upgrade. Three source types returned HTTP 405; a transcript API or a stopwatch would settle it.]` Roblox's FTUE guidance **states no time threshold at all** ``; the brief's ten-second window, chosen without a source, is independently corroborated ``.
- *Teaching is visual because nothing else is left.** Roblox's FTUE guidance offers a guided arrow as an alternative to dialogue `` and both are closed here — an arrow is row `T3`, dialogue needs a speaker and no entity class exists `[cid: decided — theme/identity/04]`. Advice to show a mechanic visually and reinforce it repeatedly before assuming it landed `` meets one recurring event here — the patch clear — which is why rank 1 is the only required rank.
- *Scope check, stated because it is unusually consequential here.** Nothing in my subject is priority 3, so nothing is excluded outright. But every instrument the genre onboards with is gone by some other decision: a text tutorial (the settled quote), a guided arrow or dialogue as `create.roblox.com` suggests ``, an NPC or guide (`theme/identity/04` declares nine entity classes and none of them exists), a quest or objective marker (no such system in priority 1), a daily or login reward (priority 3), a starter currency grant (`gameplay/systems/04` fixes one faucet and one sink, so a join…
- Roblox's own FTUE guidance defines onboarding as "the first few minutes of gameplay that new players experience", sets three goals — teach the essentials (both controls and the core loop, and both *what* to do and *why*), get to the fun quickly because "New players typically decide their interest in a game within minutes", and leave players wanting more via short/mid/long goals plus "moments of joy" — and measures it with Day 1 retention and a player funnel that shows drop-off at each step. It offers "a guided arrow" as an alternative to dialogue and **states no time threshold at all** `` ``
- *A correction to my own domain index, worth making because a builder would otherwise cite the wrong source.** WCAG SC 2.2.2 governs *"any moving, blinking or scrolling information"* that lasts more than five seconds ``. A static plate is outside its scope entirely, so 2.2.2 does not set my dwell. What it does settle is the **motion** ruling: `response` `R5`–`R6` forbid providing a pause or dismiss control, so a moving notice would breach 2.2.2 with no legal remedy available — which is why `motion.animated` is false rather than merely discouraged. The 5.0 s ceiling itself is the platform's…
- **`[unverified]`** Any duration guidance from Roblox for in-experience messages. `create.roblox.com/docs/ui/notifications` returns 404 and the onboarding page *"does not offer specific guidance about on-screen messages, notifications, popups … or blocking player input"* ``. The WCAG threshold and the CoreScript constant are what 01 has; there is no platform number to defer to.

## https://create.roblox.com/docs/reference/engine/classes/AnalyticsService

*Cited by 5: `analytics/economy/_lead`, `analytics/events/01-event-catalog`, `analytics/events/02-never-logged`, `analytics/events/_lead`, `analytics/funnels/01-onboarding-funnel`*

- *I own no key in the 25-key contract, and I propose exactly one: `economyHealth`.** By the one-sheet-per-key rule that is one sheet, and one sheet is right for the currency half — `AnalyticsService:LogEconomyEvent` carries `amount` and `endingBalance` in the *same call* ``, so the faucet/sink volume record and the currency-held series are one decision, not two, and splitting them would be one decision described twice. The other two sheets are rule-2 sheets, each justified by that same key and each carrying no manifest block: **02** is a zero-tolerance reading rule over a counter whose…
- **The economy call and its exact signature.** `LogEconomyEvent(player, flowType, currencyType, amount, endingBalance, transactionType, itemSku, customFields)`; `FireInGameEconomyEvent` is deprecated. ``
- **Identity is the platform's and this catalog defines none.** `LogCustomEvent(player, …)` takes a `Player` ``, so no event needs, carries or invents a player identifier — which is what makes an 8–14 audience a non-issue rather than a mitigation `[brief: binding]` ← *"8–14, mobile-heavy, short sessions"* (`00-CORE.md`). Sheet `02` writes the prohibition rows.
- **The compliance shape is unusual and worth stating before the rows.** `LogCustomEvent` takes a `Player` ``, so identity is the platform's and this game defines no identifier at all. Every row below is therefore a rule about *fields the game would have to invent*, not about a field it has. That is what makes an 8–14 audience a non-issue rather than a mitigation `[brief: binding]` ← *"8–14, mobile-heavy, short sessions"* (`00-CORE.md`).
- Method signatures `` — `LogCustomEvent(player, eventName, value, customFields)`, `LogEconomyEvent(player, flowType, currencyType, amount, endingBalance, transactionType, itemSku, customFields)`, `LogFunnelStepEvent(player, funnelName, funnelSessionId, step, stepName, customFields)`, `LogOnboardingFunnelStepEvent(player, step, stepName, customFields)`, `LogProgressionEvent(...)`. The page states no rate limit and no data restriction.
- *Out-of-order detection is achievable, and not inside the funnel API.** `LogCustomEvent(player, eventName, value, customFields)` takes a **numeric `value`** and is subject to no funnel step semantics ``. **One custom event, fired once at the instant step 6 is emitted, whose `value` is the number of lower-ordinal steps not yet emitted this session** — zero in the correct case, one or more in exactly the defect case. Charted by count, average, sum, min and max ``. No clock, no bucket, no cross-step join, and derivable from state the emitter already holds: steps 4, 5 and 6 have stateful…

## https://create.roblox.com/docs/reference/engine/enums/Material

*Cited by 5: `art/objects/02-the-object-roster`, `art/objects/03-the-tool-in-hand`, `art/objects/_lead`, `art/style/01-palette-and-materials`, `art/style/_lead`*

- **The choice space is exactly 47 built-in `Enum.Material` members** ``. `MaterialVariant` and `SurfaceAppearance` are both out on a source, not an assumption: their texture maps require that you *"paste an asset ID or import a new texture from your computer"*, while built-in base materials need no upload because their *"texture assets are bundled with Studio"* ``. `budgets` sets `uploadedImageAssetsInWorldGeometry` to 0, so both routes are forbidden outright.
- `` — **47 members**, including `Limestone`, `Wood`, `WoodPlanks`, `Metal`, `CorrodedMetal`, `Foil`, `Leather`, `Fabric`, `Plaster`, `Concrete`, `Cobblestone`, `Sandstone`, `Slate`, `Grass`, `LeafyGrass` and **`Neon`**. This is the space sheets 03 and 05 choose inside, and `Neon`'s presence is why `T10`'s no-glow rule needs a named ban rather than an adjective. The page does **not** distinguish built-in from custom.
- *A limestone world costs zero uploaded assets.** `Limestone`, `Sandstone`, `Concrete`, `Cobblestone`, `Pavement`, `Rock`, `Slate` and `Granite` are base materials applicable to a `BasePart`, and built-in base material textures *"are bundled with Studio instead of being accessible as a typical asset ID"* ``. `MaterialVariant` and `SurfaceAppearance` both take a PBR texture you *"paste an asset ID or import"* for ``, which is what makes both forbidden under `budgets.textureCeilings.uploadedImageAssetsInWorldGeometry` 0 and `N17` — sourced, not assumed. `Enum.Material` has 47 members including…

## https://devforum.roblox.com/t/failed-to-load-soundid-error-spam-extreme-log-file-sizes/2225682

*Cited by 5: `audio/sfx/03-the-sfx-key`, `audio/stingers/01-the-three-payoff-cues`, `audio/ui/01-press-acknowledgment`, `audio/ui/02-index-open-and-close`, `audio/ui/_lead`*

- **Every id is `""`, never `null` and never `"none"`.** `bridge/emit-config.mjs:79` maps `null` to `nil` and Luau drops the key ``; `SoundId` is a `ContentId` string, so `release.provisioning.unprovisionedIdValue` `0` does not transfer, and a non-empty unresolvable id errors repeatedly in the console `` — which is why the guard sits at the play site. Mix rules the sentinel for six domains and this key follows it.
- `Sound.SoundId` is a `ContentId` string, so `release.provisioning.unprovisionedIdValue`'s `0` cannot transfer by type, and `tech/deploy/02` forbids an explicit null ``. **I use `""`, the engine's own empty default, and Mix's ruling supersedes this field if it lands differently** — a one-field revision, not a redesign. The guard is at the play site rather than at the id because a sound whose id will not load *"will CONSTANTLY error"* in the console ``, so a cue body must return before it touches a `Sound` at all. Source class is `creatorStore` for all three by preference: the store carries…
- *The asset form is `mix`'s, mirrored here.** `Sound.SoundId` is a **ContentId** string ``, so `release.provisioning.unprovisionedIdValue`'s `0` does not transfer by type. The guard sits at the **play site**, not at the id, because an id that will not load errors in the console rather than failing silently ``. Uploaded audio is private and needs a per-experience grant, and the Creator Store carries free-to-use audio `` — which is why each row carries a `sourceClass` that makes the upload orderable work rather than a redesign.
- *One asset per cue, and both are the sentinel until provisioned**, written through `mix`'s unprovisioned form with the play-site guard `01` states, since an id that will not load errors in the console rather than failing silently ``.
- A sound whose id will not load errors in the console rather than failing silently — *"Currently if an audio is played but it won't load (such as the sound id being zero), Roblox will CONSTANTLY error it in the console"*; staff acknowledged and the **spam** was fixed in 2023, not the error itself. `` → the sentinel guard must sit at the play site, not at the id.

## https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/reference/engine/classes/MarketplaceService.yaml

*Cited by 5: `analytics/funnels/03-the-purchase-read`, `tech/networking/04-ownership-authority`, `ui-ux/feedback/03-system-notices`, `ui-ux/store/02-when-a-purchase-applies`, `ui-ux/store/_lead`*

- *The two platform facts, and one of them is `[unverified]` and stays that way.** `UserOwnsGamePassAsync` results are cached, and *"If the user purchases a game pass outside of the experience while remaining in the same session, the cache is eventually updated, but this process might take several minutes to propagate"* ``, corroborated developer-side ``. `PromptGamePassPurchaseFinished(player, gamePassId, wasPurchased)` exists and is documented as firing when a purchase prompt closes `` — but the first-party pages **state no triggering condition**, so *"an experience-page purchase fires no…
- *I am overruling my own lead index's central finding.** It ruled that no in-server re-resolution trigger exists, because `UserOwnsGamePassAsync` "caches per player per server for the session". Its evidence is an open devforum feature request with no staff reply — and that thread is not in the research pack, so I could not cite it even if I agreed. The first-party source is in the pack and says something different, verbatim: *"If the user purchases a game pass outside of the experience while remaining in the same session, the cache is eventually updated, but this process might take several…
- *The governing fact is first-party.** The `creator-docs` YAML that `create.roblox.com`'s `MarketplaceService` page is generated from says of `UserOwnsGamePassAsync`: results are cached; the cache updates when a purchase prompt closes; and — the sentence that is directly about this case — *"If the user purchases a game pass outside of the experience while remaining in the same session, the cache is eventually updated, but this process might take several minutes to propagate."* `` **Eventually updated is not frozen for the session.** A second read after propagation returns the new answer,…
- > *"If the user purchases a game pass outside of the experience while remaining in the same > session, the cache is eventually updated, but this process might take several minutes to > propagate."* > ``
- `` — the source `create.roblox.com`'s `MarketplaceService` page is generated from. Supplies, verbatim: `UserOwnsGamePassAsync` results are cached; the cache updates when the purchase prompt closes; an out-of-experience purchase in the same session propagates *"but this process might take several minutes"*; and *"When a user first enters a server after purchasing a game pass, this functions always returns true."* Also: `PromptGamePassPurchaseFinished`'s `wasPurchased` is reliable only *"used on the server"* and *"in a local script, these values should not be relied on for validation or game…

## https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/reference/engine/classes/Sound.yaml

*Cited by 5: `audio/mix/02-degradation-under-load`, `audio/mix/_lead`, `audio/sfx/_lead`, `audio/ui/01-press-acknowledgment`, `audio/ui/_lead`*

- *One `Sound` cannot overlap itself** — `Play()` restarts it `` `` — so every cue row carries a `poolSize` and a play site acquires from a pool. Without that, `onOverload: "overlap"` at 8 onsets a second builds a machine-gun restart, and two builders would not converge on the fix.
- `Sound` defaults: `SoundId` empty, `Volume` 0.5 (range 0–10), `RollOffMode` `Inverse`, `RollOffMinDistance` 10, `RollOffMaxDistance` 10000, `EmitterSize` 10, `PlaybackSpeed` 1, `Looped` false ``; `Volume` *"can be set between 0 and 10"*, `RollOffMinDistance` is *"the minimum distance, in studs, at which a Sound which is parented to a BasePart or Attachment will begin to attenuate"* ``.
- **`Volume` default is 0.5, range 0 to 10** ``.
- **One `Sound` cannot overlap itself.** `Play()` *"sets TimePosition to the last value set by a script (or 0 …), then sets Playing to true"* ``, and the community reading is unambiguous — *"doing this restarts the sound if it was already playing"*, overlap requires multiple instances ``. **This is why `response`'s `onOverload: "overlap"` at 8/s is a data requirement and not a note:** a builder handed one row with one id builds a machine-gun restart, which two builders would not converge on.
- *The asset form is `mix`'s, mirrored here.** `Sound.SoundId` is a **ContentId** string ``, so `release.provisioning.unprovisionedIdValue`'s `0` does not transfer by type. The guard sits at the **play site**, not at the id, because an id that will not load errors in the console rather than failing silently ``. Uploaded audio is private and needs a per-experience grant, and the Creator Store carries free-to-use audio `` — which is why each row carries a `sourceClass` that makes the upload orderable work rather than a redesign.
- `Sound.SoundId` is type **ContentId** — *"Content ID of the sound file to associate with the Sound"* — and `Sound.IsLoaded` is *"true when the Sound has loaded from Roblox servers and is ready to play. You can use this property and the `Loaded` event to verify a sound has loaded before playing it."* `` → the `0` sentinel `release` uses for a `gamePassId` cannot transfer by type, and a 200 ms budget presumes a resident asset.

## https://robloxapi.github.io/ref/class/Sound.html

*Cited by 5: `audio/ambient/01-the-continuous-layers`, `audio/ambient/_lead`, `audio/mix/01-bus-tree-and-levels`, `audio/mix/03-the-asset-ledger`, `audio/mix/_lead`*

- *The sentinel is `""`, adopted from `mix`, not chosen here.** `release`'s numeric `0` does not transfer: `SoundId` is a `ContentId` whose engine default is empty ``. **`[research owed: whether `Sound:Play()` with an empty `SoundId` writes a client-output warning — the engine reference does not state it]`**; criterion 2 is written to be failed if it does. `assetSource` is `creatorStore` first: the store holds *"more than 100,000 professionally-produced sound effects and music tracks"* free to use and a store id is already live, skipping the upload gate `mix` is filing against `release` ``.
- 1. **The `SoundId` sentinel.** `mix` rules it once for six domains and my rows must adopt whatever it picks. My research narrows it — the field is `ContentId` with an empty default ``, so `release`'s numeric `0` demonstrably does not transfer — but the choice between `""` and a sentinel string is theirs. 2. **The 20 MB `Sounds` allocation.** If `mix` splits the budget six ways, a continuously resident looping bed is the largest single claim in the category and the split may not fund the loop length sheet `01` needs. The residue then routes to loop length, not to layer count. 3. **Roll-off…
- *Level lives in two properties and both are mine.** `Volume` is 0–10 on both `Sound` and `SoundGroup`, engine defaults 0.5 and 1, and the group's value multiplies its members `` ``. Membership is by property, **not** by parenting, and groups nest ``. So a per-bus level and a per-cue level are the same arithmetic, and two keys writing them would be two writers for one number. `mix.assets.rows[].volume` and `mix.buses[].volume` are the only two writers in the game.
- *The sentinel is `""` and neither existing precedent transfers.** `release.provisioning.unprovisionedIdValue` is `0`, a number; `Sound.SoundId` is a `ContentId` string whose engine default is empty ``, so `0` is a type error. `tech/deploy/02`'s scalar sentinel `"none"` would be a **non-empty content string the engine tries and fails to resolve** — an error, not silence — and that sheet's own rule admits the exception: `"none"` applies *"unless the containing table declares a more specific sentinel in place."* This key declares one, once, for all six audio keys.
- `Sound` defaults: `SoundId` empty, `Volume` 0.5 (range 0–10), `RollOffMode` `Inverse`, `RollOffMinDistance` 10, `RollOffMaxDistance` 10000, `EmitterSize` 10, `PlaybackSpeed` 1, `Looped` false ``; `Volume` *"can be set between 0 and 10"*, `RollOffMinDistance` is *"the minimum distance, in studs, at which a Sound which is parented to a BasePart or Attachment will begin to attenuate"* ``.

## https://www.international-sound-directory.com/2025/12/07/do-people-really-play-mobile-games-without-sound-myth-or-reality/

*Cited by 5: `audio/mix/04-muted-play`, `audio/music/01-whether-music-exists`, `audio/music/_lead`, `audio/ui/01-press-acknowledgment`, `audio/ui/04-system-notice-sound`*

- *The category handed me an unsourced motive and I am not restating it.** `cid/audio/_category.md` derives the invariant from *"a large share of sessions run with no sound at all"*, which nothing in this repo supports. The one survey any writer in this category reached reports **34.9% always / 23.6% often / 19% sometimes / 9.3% never** playing mobile games with sound, n=541 — general mobile, neither Roblox-specific nor 8–14, so directional at best ``. Music work raised this and it is right. **The invariant survives entirely on the channel lists**, which is how the category actually got it,…
- The category's muted-player premise — *"a large share of sessions run with no sound at all"* — is unsourced in this repo. The one survey available reports **34.9% always / 23.6% often / 19% sometimes / 9.3% never** playing mobile games with sound, n = 541 `` — general mobile, **not Roblox and not 8–14**, so directional only, and the four buckets as banked sum to 86.8% with the remaining 13.2% unlabelled `[unverified: the source's fifth bucket and its label; settled by re-fetching that survey's own figure table]`. Mix's `audioOnlyBeats: 0` survives on `response`'s per-beat channel arrays,…
- *This ruling does not rest on muted play, and I will not let it.** The category derives its muted-player invariant from *"a large share of sessions run with no sound at all"*, which no source in this repo supports. The one survey I could find reports **34.9% always / 23.6% often / 19% sometimes / 9.3% never** playing with sound, n=541 `` — general mobile, neither Roblox-specific nor 8–14, so directional only. A silence ruling built on an unevidenced muting reflex would be the comfortable answer this pipeline exists to remove. **What carries when sound is off is unaffected by me either…
- Mobile muted-play figures, cited above with their limits. ``
- *Muted play, honestly.** `B4` carries `readout` as well as `audio`, so `audioOnlyBeats: 0` survives on `response`'s own channel arrays and needs no motive from me. The category's *"a large share of sessions run muted"* premise is **unsourced**; the one survey available reports 34.9% always / 23.6% often / 19% sometimes / **9.3% never** playing with sound, n=541, general mobile, neither Roblox-specific nor 8–14 ``. The invariant holds on the channel arrays; the motive is not restated as fact.
- *Not decided on the muted-player premise, in either direction.** The category's *"a large share of sessions run muted"* line is unsourced; the one available survey reports 34.9% always / 23.6% often / 19% sometimes / **9.3% never** playing with sound, n=541, general mobile and neither Roblox-specific nor 8–14 ``. That figure would be an argument *for* a sound as often as against one, and the ruling rests on `D3`/`D6` and on unactionability instead. `audioOnlyBeats: 0` is unaffected either way: this is not a beat and the plate is its only channel, so a sound could only ever have been a…

## https://www.roblox.com/games/133086043677134/Grass-Incremental-Simulator

*Cited by 5: `gameplay/onboarding/_lead`, `liveops/codes/_lead`, `liveops/events/_lead`, `theme/tone/01-register`, `theme/tone/_lead`*

- **The reference has no discovery layer, so it never teaches one.** Its store page describes it as "A relaxing lawn-trimming simulator game 🌿 The more you rebirth and upgrade, the more fun the game becomes!" `` **This is the finding that matters: the reference's teaching order is exactly the economy-first, finds-later alternative `02-GAMEPLAY.md` explicitly declined.** It is not a model to copy in order, only in shape, and the item at position 2 is the entire divergence.
- The reference's own experience description, primary source: *"👍 Enjoying the game? Leave a Like and Favorite! ❤️ Join the Unequal Games group for in-game boosts!"* — **a group-join boost and a like/favourite prompt, and no mention of codes or of redeeming anything** ``
- 1. https://create.roblox.com/docs/production/promotion/experience-events — the platform *does* have a scheduled-events system, which is the fact that stops this ruling resting on *"the mechanism does not exist."* It does exist, at the platform level, and what closes it is scope and the binding non-goal. Verified against the creator-docs source at https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/production/promotion/experience-events.md — *"Currently, you can publish a maximum of 10 ongoing or upcoming events"*, *"The best events run for 7-30 days and highlight…
- The register has to be executed at the punctuation level or it is not a register. All three games in this family open with the word *relaxing* and then punctuate like a trailer: *"Trim the grass!"*, *"Gather fallen leaves!"*, *"Enjoying the game?"*, glyphs in the title `` `` ``. Claiming the adjective is the genre norm; declining to claim it, and writing flat, is the departure. That is the whole content of `[brief: soft]` *"Tone: warm, aged, unhurried"* (`01-FOUNDATION.md`) once it is made checkable.
- **`Grass Incremental Simulator`** (Unequal Games, the direct reference). Description: *"A relaxing lawn-trimming simulator game"* with a foliage glyph, then *"The more you rebirth and upgrade, the more fun the game becomes!"*, followed by imperative bulleted features (*"Trim the grass!"*, *"Upgrade for faster trimming!"*) and an early-access note. Register: a glyph in the title and in the first line, exclamatory, second-person imperative, enthusiastic rather than jokey. No humor and no puns surfaced in the store copy. `` Numbers re-confirmed on a second source: 38.3M visits, 96.2% likes,…

## https://create.roblox.com/docs/audio/assets

*Cited by 4: `audio/ambient/01-the-continuous-layers`, `audio/ambient/_lead`, `audio/stingers/01-the-three-payoff-cues`, `audio/stingers/_lead`*

- *The seam is solved in the asset because `R5` closed every other route** — randomised start offset, randomised playback speed, `LoopRegion` shuffling and layered one-shots are the four standard answers and its Audio consequence line names randomisation over time by construction. What remains is authorship: a baked equal-power overlap, zero transients so there is no landmark to track, and a loop long enough that recurrence is not countable. Loop length **120 s** `[playtest unknown]`, test range **60–180 s**, settled by one listening pass on the floor device across three laps; the platform…
- *The sentinel is `""`, adopted from `mix`, not chosen here.** `release`'s numeric `0` does not transfer: `SoundId` is a `ContentId` whose engine default is empty ``. **`[research owed: whether `Sound:Play()` with an empty `SoundId` writes a client-output warning — the engine reference does not state it]`**; criterion 2 is written to be failed if it does. `assetSource` is `creatorStore` first: the store holds *"more than 100,000 professionally-produced sound effects and music tracks"* free to use and a store id is already live, skipping the upload gate `mix` is filing against `release` ``.
- **The budget makes it worse rather than deciding it.** `budgets.Sounds` is 20 MB on the floor device, `[playtest unknown]` at ±60%, shared across six domains — and the platform's own per-asset ceiling is *"less than 20 MB in size and 7 minutes in duration"* ``. **One maximum-size audio asset is 100% of this game's entire `Sounds` ceiling.** Multiplying beds by four multiplies the largest continuously-resident asset class in the build against the one number nobody has measured, to buy a distinction three approved sheets say the world does not make.
- `Sound.SoundId` is a `ContentId` string, so `release.provisioning.unprovisionedIdValue`'s `0` cannot transfer by type, and `tech/deploy/02` forbids an explicit null ``. **I use `""`, the engine's own empty default, and Mix's ruling supersedes this field if it lands differently** — a one-field revision, not a redesign. The guard is at the play site rather than at the id because a sound whose id will not load *"will CONSTANTLY error"* in the console ``, so a cue body must return before it touches a `Sound` at all. Source class is `creatorStore` for all three by preference: the store carries…
- `` — uploads must be *"less than 20 MB in size and 7 minutes in duration"*, `.mp3`/`.ogg`/`.wav`/`.flac`, sample rate ≤ 48 kHz; 2,000 free imports per 30 days ID-verified and 100 unverified; imported audio is private by default and *"the IDs of your imported audio can't be accessed by users without proper permissions"*, granted to specific friends and experiences. Also: the Creator Store holds *"more than 100,000 professionally-produced sound effects and music tracks"* that are free to use, so **a stinger need not be an upload** — which is the cheapest path to a provisioned id and matters…

## https://create.roblox.com/docs/cloud-services/data-stores/error-codes-and-limits

*Cited by 4: `tech/persistence/01-the-save-write`, `tech/persistence/_lead`, `ui-ux/feedback/03-system-notices`, `ui-ux/feedback/_lead`*

- **Bare `UserId`, no prefix, no scope.** The store name already carries the namespace and the version, the worst-case key is 19 of the 50 permitted characters, and a prefix added later is itself a migration under sheet 03's `B6`. ``
- **The retry schedule is set by the join deadline, not by taste.** `firstSession` requires the first reveal within 10 s of join, so `load` gets 3 attempts and 3 s of backoff and nothing more. `leave` gets the most (4 attempts) because no next pass exists. `shutdown` gets a 20-second burst deadline against `BindToClose`'s "30 seconds total, shared across all bound callbacks" ``, leaving 10 s of margin. Roblox's own instruction is `pcall` plus "exponential backoff" ``.
- `https://create.roblox.com/docs/cloud-services/data-stores/error-codes-and-limits` and its source `https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/cloud-services/data-stores/error-codes-and-limits.md` — fetched separately and cross-checked; the numbers agree. Server-level standard per minute: read `60 + numPlayers × 40`, write `60 + numPlayers × 40`, list `5 + numPlayers × 2`, remove `60 + numPlayers × 40`. Experience-level per minute: read `300 + concurrentUsers × 40`, write `300 + concurrentUsers × 20`, list `300 + concurrentUsers × 2`, remove `300 +…
- Roblox documents `pcall` wrapping and exponential backoff for data-store errors and **states no recovery behaviour at all** — no guidance on kicking, messaging or session locking ``. So this ruling is unspecified by the platform rather than a deviation from it. Silence was the cheap answer and it is wrong: the harm is real, shipped and reachable, and *"there is no failure state"* `[brief: soft]` ← `02-GAMEPLAY.md` is a statement about the **game's** rules, not a licence to hide an infrastructure failure from an eight-year-old.
- `` — Roblox documents wrapping data store calls in `pcall()` and retrying internal errors *"with exponential backoff"*, and **documents no recovery behaviour at all** — no guidance on kicking, messaging or session locking. So 03's ruling is genuinely unspecified by the platform, not a deviation from it.

## https://create.roblox.com/docs/cloud/guides/data-stores

*Cited by 4: `analytics/economy/01-currency-flow-and-holdings`, `analytics/engagement/01-session-shape`, `analytics/kpis/02-the-shortlist`, `analytics/kpis/_lead`*

- *The balance series costs nothing extra.** `endingBalance` rides in the same call as `amount`, which is why the flow record and the currency-held series are one decision and not two, and the dashboard already charts **average wallet balance** ``. A second, zero-instrumentation route exists: `currency` is one of the seven persisted fields `` and a standard data store's entries are listable through Open Cloud ``.
- *The end-of-session state is already persisted and already readable.** `found`, `areasFinished`, `clearedCount`, `currency` and `upgrades` are written at leave before teardown ``, and Open Cloud can list a standard data store's entries ``. So **churn needs no sheet and no event**: with no failure state, no decay and no reset (`02-GAMEPLAY.md`, `[brief: soft]` ← `[you accepted: step 6 Q2]`) a churned player is a save that stopped changing, and its `found` count and `areasFinished` say where they stopped.
- *Five rows are unreadable today and I am not softening that.** Grepped `game/src/` for `AnalyticsService` and `LogService`: zero calls in 29 modules; `Types.luau`'s `StoredState` carries no timestamp, session id or run ordinal ``. Rows 1 and 5 need nothing built — the Engagement page supplies session time at P50 `` and the persisted fields list through Open Cloud ``.
- Open Cloud can list the entries of a standard data store — `universes/{universe}/data-stores/{dataStore}/entries`, scope `universe-datastores.objects:list`, paginated with `maxPageSize` / `pageToken`. `` **This is why two candidate rows need no event at all**: `currency`, `found`, `areasFinished`, `upgrades`, `cleared`, `clearedCount` and `rowsRevealed` are the seven persisted fields (`game/src/server/Persistence.luau`), so held balance and collection state are readable from outside the game with no code change.

## https://create.roblox.com/docs/production/analytics/custom-events

*Cited by 4: `analytics/events/03-emission-budget`, `analytics/funnels/01-onboarding-funnel`, `analytics/kpis/02-the-shortlist`, `analytics/kpis/_lead`*

- **Nothing here is readable inside a session.** *"Events are aggregated daily so it may take up to 24 hours for charts to populate"* ``.
- *Out-of-order detection is achievable, and not inside the funnel API.** `LogCustomEvent(player, eventName, value, customFields)` takes a **numeric `value`** and is subject to no funnel step semantics ``. **One custom event, fired once at the instant step 6 is emitted, whose `value` is the number of lower-ordinal steps not yet emitted this session** — zero in the correct case, one or more in exactly the defect case. Charted by count, average, sum, min and max ``. No clock, no bucket, no cross-step join, and derivable from state the emitter already holds: steps 4, 5 and 6 have stateful…
- *Cadence is a bounded post-publish window and its floor is sourced.** Custom events *"are aggregated daily so it may take up to 24 hours for charts to populate"* ``, and *"Ships and settles. No seasons or events"* `[brief: soft]` ← `[I assumed]` means no loop feeds a standing review, so the window closes.
- Custom-event capacity and latency — *"up to 100 custom events to your game"*; server-side only, published places only; *"Events are aggregated daily so it may take up to 24 hours for charts to populate"*; charted on Explore with seven aggregations (count, unique user count, avg/sum/min/max value, avg value per user) and breakdowns by custom field. ``

## https://create.roblox.com/docs/production/analytics/custom-fields

*Cited by 4: `analytics/events/03-emission-budget`, `analytics/events/04-payoff-gap-instrument`, `analytics/events/_lead`, `analytics/funnels/01-onboarding-funnel`*

- **Values must be strings in a custom field** ``, which is why the tick maximum is bucketed. The boundaries are the design's own thresholds, so the lost precision costs the predicate nothing.
- Custom field keys `` — only `Enum.AnalyticsCustomFieldKeys.CustomField01/02/03.Name`; *"Anything other than CustomField01.Name, CustomField02.Name, and CustomField03.Name is ignored."*
- *Three custom fields, and device is deliberately not one of them.** The platform allows exactly three, keyed only as `CustomField01/02/03` ``, with 8,000 combined values before the rest group as `Other` ``. The brief's `~70/25/5` device split is the wrong spend twice over: events *"can only be sent from the server and in published games"* `` and no server-side observable of device exists inside a seven-channel protocol; and the Creator Dashboard already breaks every metric down by Platform and OS with no developer event ``. Field 2 adopts `telemetry`'s `owned ["none","span"]` verbatim.

## https://create.roblox.com/docs/production/analytics/engagement

*Cited by 4: `analytics/engagement/01-session-shape`, `analytics/engagement/_lead`, `analytics/kpis/02-the-shortlist`, `analytics/kpis/_lead`*

- *The boundary rule is the platform's.** Average session time is *"the total time users spend in your game divided by the number of sessions"* ``. A stitching rule would make our figure incomparable with the dashboard's own and with the selectable similar-experience benchmark set ``, the only external comparator this project has. `[cid: decided]` — the brief defines no boundary.
- *One prediction nobody has stated, now made refutable:** the design assumes a new player completes area 1. The **New User First Session Retention** curve — *"how many new users are still playing X minutes after joining your game for the first time"* `` — settles it for free, read at the minute mark `pacing.laps[1].realisedLapSeconds` falls in.
- Roblox creator-docs, engagement — average session time defined as *"the total time users spend in your game divided by the number of sessions"*, and the **New User First Session Retention** chart, *"how many new users are still playing X minutes after joining your game for the first time."* That chart is the highest-value free instrument this domain found. ``
- *Five rows are unreadable today and I am not softening that.** Grepped `game/src/` for `AnalyticsService` and `LogService`: zero calls in 29 modules; `Types.luau`'s `StoredState` carries no timestamp, session id or run ordinal ``. Rows 1 and 5 need nothing built — the Engagement page supplies session time at P50 `` and the persisted fields list through Open Cloud ``.
- *"New User First Session Retention"* — *"how many new users are still playing X minutes after joining your game for the first time"*, and *"Average session time"* = *"total time users spend in your game divided by the number of sessions"*. ``

## https://create.roblox.com/docs/production/analytics/event-types

*Cited by 4: `analytics/economy/01-currency-flow-and-holdings`, `analytics/events/02-never-logged`, `analytics/events/03-emission-budget`, `analytics/events/_lead`*

- *Per-clear emission does not fit and the arithmetic is not close.** The faucet pays per patch (`economy.faucets[patch-clear].perEvent: true`) and the per-server allowance is `telemetry.budget.perServerRequestsPerMinute`, which `events/03` rules is `20 × runtime.maxPlayers` with the flat 120 of `120 + (20 × CCU)` excluded because the `CCU` scope is `[unverified]` and the conservative reading is taken ``. I read that field rather than re-deriving it. The faucet's per-clear rate is `60 × runtime.maxPlayers × max_k(solvency.areaLedger[k].patchCount / pacing.laps[k].realisedLapSeconds)`, which…
- **`N23` and `N24` are cardinality and privacy rules that look like housekeeping and are not.** An absolute timestamp beside a `Player` is closer to identifying a person than an elapsed second and answers no question an elapsed second does not `[cid: decided]`. An unbounded field silently destroys every breakdown in the experience, because past *"8,000 combined values across all custom fields, values will be grouped as 'Other'"* `` — one free-text field would exhaust that budget alone and take the other twelve events' breakdowns with it.
- **The rule is `120 + (20 × CCU)` total `AnalyticsService` requests per minute** ``. `runtime.maxPlayers` is **16**, picked by `architect/01-runtime` and recorded in `cid/_state.md` as a figure assigned to nobody inside `social.maxPlayers`'s 12-to-20 band ``.
- Rate limit, cardinality, retention, funnel and economy caps `` — global rate `120 + (20 * CCU)` requests per minute; custom fields max **3**; unique values *"Unlimited — After 8,000 combined values across all custom fields, values will be grouped as 'Other'"*; economy resource types **10**; transactionTypes grouped past **20**; itemSkus past **100**; funnels **10**, steps per funnel **100**; eventNames **100**; retention *"90 days from the last data received"*.

## https://create.roblox.com/docs/production/analytics/funnel-events

*Cited by 4: `analytics/funnels/01-onboarding-funnel`, `analytics/funnels/_lead`, `analytics/kpis/02-the-shortlist`, `analytics/kpis/_lead`*

- *The bucket buys timing distributions and does not buy step ordering.** Funnel step events carry no numeric `value`, so a per-step elapsed distribution can only ride a custom field. Two sourced sentences interact and my first draft used one: *"If you skip a step in a funnel, the earlier steps automatically complete"* **and** *"If a user repeats a step in a funnel, the funnel only considers the first instance"* ``. In the case an ordering assertion exists to catch, the skipped step's first instance is the synthetic auto-completion, which is not a call and carries no custom field, and the…
- *The funnel API exists on the platform and my sheets are specced against it, not around it.** Two methods: `LogOnboardingFunnelStepEvent(player, step, stepName, customFields)` for *"conversion events that only occur once per user"* and `LogFunnelStepEvent(player, funnelName, funnelSessionId, step, stepName, customFields)` for recurring ones; *"If a user repeats a step in a funnel, the funnel only considers the first instance"* and **"If you skip a step in a funnel, the earlier steps automatically complete"** — which is the fact that decides how `01` frames its own argument `` ``.
- *Dashboard layout is declined as a design artifact, kept as a per-row placement column.** The Creator Dashboard's pages exist and are not ours to lay out ``, against 100 custom event names and ten funnel tabs ``. These rows add **no new event name**.
- Funnel capacity — `LogOnboardingFunnelStepEvent()` for one-time funnels and `LogFunnelStepEvent()` for recurring; *"You can add tabs to the dashboard for up to ten funnels."* ``

## https://create.roblox.com/docs/production/analytics/monetization

*Cited by 4: `analytics/economy/03-what-this-economy-cannot-report`, `analytics/economy/_lead`, `analytics/engagement/01-session-shape`, `analytics/engagement/03-retention-readout`*

- *The half that is not about this game.** The creator dashboard supplies revenue, paying users, ARPPU, ARPDAU and conversion rate — *"percent of daily active users who are also paying users"* — with **no game-side instrumentation at all** ``. So the dormancy is not an instrumentation gap; there is nothing to instrument. It is gated instead: *"Any game with more than 10 daily active users (DAU) and 10 play hours for 7 consecutive days is eligible for accessing all KPIs on the dashboard"* ``. **A project whose stated success is *"shipped artifacts, not players"* `[brief: binding]` ← `[you…
- **The monetization half, from the platform side.** Revenue split by developer products and passes, conversion rate (*"Percent of daily active users who are also paying users"*), paying users, ARPPU and ARPDAU are all supplied with **no game-side instrumentation** `` — and gated: *"Any game with more than 10 daily active users (DAU) and 10 play hours for 7 consecutive days is eligible for accessing all KPIs on the dashboard"*, with sales-data files updated every 48 hours. ``
- *One gate could make every free reading read nothing, and it is sourced.** *"Any game with more than 10 daily active users (DAU) and 10 play hours for 7 consecutive days is eligible for accessing all KPIs on the dashboard"* ``. For a game whose stated success is *"shipped artifacts, not players"* `[brief: binding]`, that threshold is not guaranteed. Whether the Engagement and Retention pages are gated identically is `[unverified]` — settling fetch: the same eligibility sentence located on the analytics-dashboard or retention page.
- *The gate applies here too and is not restated.** `engagement.eligibilityGate` — more than 10 DAU and 10 play hours for 7 consecutive days `` — governs these readings as well. Below it, this key returns nothing.

## https://create.roblox.com/docs/production/monetization/game-passes

*Cited by 4: `gameplay/monetization/_lead`, `tech/deploy/01-the-release-contract`, `tech/deploy/_lead`, `tech/networking/04-ownership-authority`*

- **A pass is the right instrument and the platform says so in one sentence.** A pass lets a creator "charge users a one-time Robux fee to access special privileges inside your game", with "minimum price is 1 Robux, and the maximum price is 1 billion Robux", checked with `UserOwnsGamePassAsync()` and prompted with `PromptGamePassPurchase()`. ``
- *Provisioning: publish first.** A pass is created manually, there is no API to create one, and **the experience must be published and accessible first** ``. That inverts the naive order and is the whole gate list. The build runs at every gate with the id unprovisioned, which sheet `02` makes possible by replacing the null with `0`.
- *RR-4 · `cid/gameplay/monetization/01-the-offer-ladder.md:116`.** `externalPrerequisite.what` says the pass must be *"created on the Roblox creator site"* without stating that the experience must be **published first** — pass creation requires a published, accessible experience. `` That inverts the naive order and is the whole of my `provisioning` gate. A one-clause addition, not a re-decision.
- *180 seconds, staggered.** One product exists ``, so a poll is one web call per player. At 16 players that is 0.089 calls/s server-wide, which is negligible against any plausible `MarketplaceService` budget; and against an unbounded "several minutes" propagation window a 180-second poll adds at most 180 seconds of detection latency to a delay the platform already owns. Staggering the phase by `UserId % 180` matters more than the interval does: sixteen players joining inside the first thirty seconds would otherwise poll in a burst forever. A 10–20 minute session `[brief: binding]` gets 3 to…

## https://create.roblox.com/docs/reference/engine/classes/GuiObject

*Cited by 4: `ui-ux/hud/01-persistent-surface-composition`, `ui-ux/navigation/03-close-and-focus-by-device`, `ui-ux/platform/01-device-viewport-rules`, `ui-ux/platform/_lead`*

- *The group-parent node stays refused; its stated replacement was wrong and is corrected (R2-4).** Revision 1 named `GuiService:AddSelectionParent`, which the banked pack marks **Deprecated** and which `navigation/03` and `platform/01` both forbid. The refusal never needed it: the four interactive groups sit in two clusters and `hud-overlay` emits clusters as siblings of `Root`, so no common parent below `Root` exists, and `SelectionGroup` is not a `GuiObject` property in the current reference ``. The mechanism is `viewport.gamepad`'s explicit link graph — `Selectable`, `SelectionOrder` and…
- *With the close control gone the navigable set never changes size, and that is a gift to `viewport`.** The 24 slots have nothing to activate, so every slot frame, slot label and heading is `Selectable = false` — `Selectable` *"determine[s] whether the GuiObject can be selected by a gamepad"* ``. The selectable set is therefore **exactly the four pressables, open or closed**, so Platform's focus order operates on one constant set and never needs a fifth position. This holds whether or not `SelectionGroup` exists as a property: the pack's fetch of the rendered `GuiObject` reference lists…
- *Focus is built only from properties the reference documents.** `Selectable`, `SelectionOrder` and `NextSelectionUp/Down/Left/Right` are all confirmed `GuiObject` members ``. `SelectionGroup` is **not** on that page — it appears only in a release thread `` — and `GuiService:AddSelectionParent` is deprecated ``. Building the contract from the documented three costs nothing and removes an `[unverified]` dependency from the one path a console player has to spend currency. **Explicit links also beat a group on the merits here:** the four pressables sit in two opposite corners, so any spatial…
- `GuiObject` gamepad members: `Selectable`, `SelectionOrder`, `NextSelectionUp/Down/Left/Right`, `SelectionImageObject`. **`SelectionGroup` is not a `GuiObject` property** in the current reference — `Pressables.luau:423` sets `button.SelectionGroup = gamepadSelectable`, which sheet 01 should verify against Studio before `mechanics/03` P5's *"one navigable selection group"* is treated as satisfied. ``

## https://create.roblox.com/docs/reference/engine/classes/Sound

*Cited by 4: `audio/ambient/_lead`, `audio/music/_lead`, `audio/stingers/01-the-three-payoff-cues`, `audio/stingers/_lead`*

- `Sound` playback and looping surface, for the data form a track table would have needed: `Looped`, `LoopRegion` and `PlaybackRegion` are `NumberRange`, `PlaybackRegionsEnabled` is a boolean, `TimeLength` is read-only, `TimePosition` is not replicated; a `Sound` is 3D when parented to a `Part` or `Attachment` and global otherwise. ``
- *`[cid: decided]` all three are global**: a `Sound` parented to `SoundService`, played on the client that received the beat's packet and heard by that player alone. Parenting is the whole of the ruling — *"within `SoundService` or `Workspace`. Audio emits throughout the game. Volume and pan position remain the same regardless of the user's sound listener position or rotation"* ``, while a child of a `BasePart` or `Attachment` is positional and Doppler-shifted ``. Three reasons, one per cue. `areaComplete` is forbidden the `atPatch` channel outright and an area is not a point, so a…
- `Sound.SoundId` is a `ContentId` string, so `release.provisioning.unprovisionedIdValue`'s `0` cannot transfer by type, and `tech/deploy/02` forbids an explicit null ``. **I use `""`, the engine's own empty default, and Mix's ruling supersedes this field if it lands differently** — a one-field revision, not a redesign. The guard is at the play site rather than at the id because a sound whose id will not load *"will CONSTANTLY error"* in the console ``, so a cue body must return before it touches a `Sound` at all. Source class is `creatorStore` for all three by preference: the store carries…
- `` and the raw reference source — `SoundId` is a **`ContentId`** (a string of the form `rbxassetid://…`), which is why `release`'s `0` sentinel does not transfer; `TimeLength` is read-only and *"If the `Sound` is not loaded, this value will be `0`"*, so an audible-length criterion is checkable at runtime only after `IsLoaded`; `Volume` *"Can be set between `0` and `10` and defaults to `0.5`"*; a `Sound` parented to a `BasePart` or `Attachment` is positional and Doppler-shifted, otherwise global.

## https://create.roblox.com/docs/reference/engine/enums/ScreenInsets

*Cited by 4: `ui-ux/hud/01-persistent-surface-composition`, `ui-ux/hud/03-pattern-producibility-and-the-brief-seam`, `ui-ux/platform/01-device-viewport-rules`, `ui-ux/platform/_lead`*

- *`variant.anchor` yields to Platform: `inset` becomes `edge`**, because `viewport.safeArea` sets `ScreenInsets = CoreUISafeInsets` and `ANCHOR_INSET` would double-count it ``. It makes the jump-band overlap worse rather than better, which is why sheet `03`'s `U6` survives.
- *`U6` survives `variant.anchor` moving to `edge`.** `CoreUISafeInsets` clears the top bar and device cutouts, **not the platform's touch controls** ``, so the bottom-right cluster sits inside the `jumpSmall` band `y ∈ [H-90, H-20]` on both routes. `U7` is what `composition.anchors[noticeStack]` needs: `slotHost(name)` hard-codes `layout: { align: 'stretch' }` (`hud-overlay.mjs:217-224`), so every child of `Slot_hudTop` is full width and would cross the top-left cluster.
- *The safe area needs an instrument and one exists.** `CoreUISafeInsets` keeps descendants clear of the Roblox top bar and of device cutouts, and inset values *"only take effect on ScreenGuis that have their `IgnoreGuiInset` property set to false"* `` ``. `init.client.luau:220-223` sets neither while `docs/hand-written-control/init.client.luau:37` sets `IgnoreGuiInset = true`: the build and its control diverge and no sheet decided it. Once the engine supplies the inset, `ANCHOR_INSET` (`base: 8`, `mobile: 28`) double-counts, so `anchor: "edge"` is the only legal variant here ``.
- `Enum.ScreenInsets` = `None` (0), `DeviceSafeInsets` (1), `CoreUISafeInsets` (2), `TopbarSafeInsets` (3); `CoreUISafeInsets` keeps descendants clear of the Roblox top bar and of device cutouts. `Enum.SafeAreaCompatibility` = `None` (0), `FullscreenExtension` (1). `` ``

## https://create.roblox.com/docs/scripting/security/network-ownership

*Cited by 4: `tech/security/01-position-authority`, `tech/security/02-channel-admission`, `tech/security/03-violation-response-and-logging`, `tech/security/_lead`*

- **The exploit is real and the brief never named it.** The server pays for every patch inside a radius of `root.Position`, and a client with network ownership of its character can "teleport to any position" and "manipulate their movement and state, such as flying or changing their speed" ``. Position is a client-owned input and it is the sole input to both protected surfaces: `state.found` and `state.cleared` are written only inside the same loop that credits currency ``.
- **The constant is the wrong clock and the sheet must say so.** `Clearing.luau:485` drives the loop with `task.wait(Config.ClearTickRate)`, which resumes on the next 60 Hz Heartbeat and realises `ceil(0.12 × 60) / 60 = 0.1333 s`, not 0.12. It grows further under load. A validator using `runtime.clearTickRate` as its elapsed time under-budgets every step and false-positives on every server hitch, which is exactly the failure Roblox warns about — "basic heuristics can flag innocent players with unstable connections", and position updates require "averaging over time" ``. The same page's…
- **The character-CFrame channel has no bound at the platform and is not given one here.** A client with network ownership can "teleport to any position" ``; the admission rule is not that the position be refused but that **no payout may read it**, which sheet `01` enforces by measuring elsewhere.
- **The population makes false positives likely and expensive.** Roblox warns that "basic heuristics can flag innocent players with unstable connections" and that position updates require "averaging over time" ``; the audience is *"8–14, mobile-heavy, short sessions"* `[brief: binding]` ← `[you chose: R1 Q4]`. A bucket flag on a phone on a bad connection is the expected case, not the exception. And an appeals surface is unfunded by construction: *"Success is shipped artifacts, not players"* `[brief: binding]` ← `[you chose: R1 Q3]`.
- The conclusion is right and the sufficiency is wrong, and the shipped game is the proof. Clearing and currency awards **already are** server-validated in the strongest sense the sentence can mean: `protocol.REMOTES` carries no clearing channel and no currency channel, `Clearing.luau` reads no client message and uses no `Touched`, and `Progression.award` is reachable from one call site. There is nothing for a client to claim. The game is still totally exploitable, because "server-validated" was read as "server-*computed*", and the server computes from an input the client owns:…
- `https://create.roblox.com/docs/scripting/security/network-ownership` — a client with network ownership can "teleport to any position", "manipulate their movement and state, such as flying or changing their speed", and "set their Humanoid WalkSpeed to any value". Recommends "leaky bucket-style accumulators … for handling burst movements while preventing sustained violations" and "projecting movement onto specific planes (e.g. XZ for ground-based movement)", and warns that "basic heuristics can flag innocent players with unstable connections" and that position updates "requir[e] averaging…

## https://create.roblox.com/docs/sound/objects

*Cited by 4: `audio/ambient/01-the-continuous-layers`, `audio/ambient/_lead`, `audio/stingers/01-the-three-payoff-cues`, `audio/stingers/_lead`*

- The engine seconds it: a `Sound` *"within `SoundService` or `Workspace`"* emits so *"volume and pan position remain the same regardless of the user's sound listener position"*, and the same guide recommends `SoundService` for background audio ``. `SoundService` is not the character, so respawn does not restart it; the instance is client-local and does not replicate, so **what a neighbour 122 studs away hears of this layer is nothing.**
- *`[cid: decided]` all three are global**: a `Sound` parented to `SoundService`, played on the client that received the beat's packet and heard by that player alone. Parenting is the whole of the ruling — *"within `SoundService` or `Workspace`. Audio emits throughout the game. Volume and pan position remain the same regardless of the user's sound listener position or rotation"* ``, while a child of a `BasePart` or `Attachment` is positional and Doppler-shifted ``. Three reasons, one per cue. `areaComplete` is forbidden the `atPatch` channel outright and an area is not a point, so a…
- `` — the positional/global rule in the engine's own words: *"Within `SoundService` or `Workspace`. Audio emits throughout the game. Volume and pan position remain the same regardless of the user's sound listener position or rotation."* This is what makes S3 answerable as a property write rather than as a preference.

## https://devforum.roblox.com/t/analytics-view-retention-by-acquisition-source-and-select-your-benchmark-set/4010157

*Cited by 4: `analytics/engagement/01-session-shape`, `analytics/engagement/03-retention-readout`, `analytics/engagement/_lead`, `analytics/kpis/_lead`*

- *The boundary rule is the platform's.** Average session time is *"the total time users spend in your game divided by the number of sessions"* ``. A stitching rule would make our figure incomparable with the dashboard's own and with the selectable similar-experience benchmark set ``, the only external comparator this project has. `[cid: decided]` — the brief defines no boundary.
- *The claim names the reference and the free instrument does not.** The dashboard's benchmark set is *similar-experience* or *genre*, *"for comparison only"* ``. `[🌱] Grass Incremental Simulator`'s own D1 is published nowhere. So the claim is read in a **weakened** form — materially below the similar-experience band, rather than materially below that one game — and the weakening is carried in the key rather than glossed. `[cid: decided]`.
- *Zero game-defined events, verified rather than assumed.** D1/D7/D30 arrive from the Retention page with daily and weekly cohorts and no developer setup ``, broken down by acquisition source and comparable against a selectable benchmark set covering average playtime and D1/D7/D30 ``, with the standard filter dimensions available ``. **This half of the domain asks logging-pipeline work for nothing at all.**
- Roblox devforum announcement — retention by acquisition source, and a selectable similar-experience or genre benchmark set covering average playtime and D1/D7/D30, *"for comparison only"*. ``
- Genre and *"similar experience"* benchmark sets are selectable on Experience Overview. ``

## https://earlyguides.com/powerwash-simulator/walkthrough

*Cited by 4: `gameplay/core-loop/01-payoff-frequency`, `gameplay/core-loop/04-lap-vs-session`, `gameplay/core-loop/05-depth-escalation`, `gameplay/core-loop/_lead`*

- In the closest shipping analogue of a completion-shaped lap, an early small job runs "30-45 minutes" and a later one "1-2 hours solo", across 38 jobs and "around 30-35 hours to complete every job", with partial progress persisting mid-job. `` `` (fetched in this domain's planning pass, not re-fetched here). Its *smallest* early lap is 1.5x this game's entire bound session, and it survives that only because its audience sits down for long desktop sessions. This game's derived depth-1 lap is 2.7 minutes. **The analogue confirms the shape and inverts the scale**, which is the second independent…
- `01-FOUNDATION.md` concedes lap length was unsourceable across three source types and rules the reference's number non-transferable, so this is the first stated number rather than a contradiction of a researched one. The closest shipping analogue of a completion-shaped lap runs from a few minutes to two or three hours per job, with an early representative job at 30 to 45 minutes `` (fetched in this domain's planning pass, recorded in `_lead.md`, not re-fetched here). Its smallest early lap is 1.5x this game's entire bound session and it survives that only on long desktop sittings. **It…
- The closest shipping analogue of a completion-shaped lap runs from a few minutes to 2–3.5 hours per job with an early representative job at 30–45 minutes `` `` (fetched in this domain's planning pass, recorded in `_lead.md`, not re-fetched here). Its jobs grow by roughly **4× in duration** across a 38-job campaign on long desktop sittings. **It is the strongest available evidence for the assumption I am overruling, and it does not transfer**: 4× of duration growth requires a session that can absorb it, and `00-CORE.md` fixes 10–20 minutes, mobile, ages 8–14 `[brief: binding]` ← `[you chose:…

## https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/audio/assets.md

*Cited by 4: `audio/mix/03-the-asset-ledger`, `audio/mix/_lead`, `audio/sfx/03-the-sfx-key`, `audio/sfx/_lead`*

- *One coincidence worth stating: a single audio upload may itself be 20 MB.** Uploads are `.mp3`, `.ogg`, `.wav` or `.flac`, *"less than 20 MB in size and 7 minutes in duration"*, ≤ 48 kHz, mono or stereo ``. **One maximum-size file is 100% of this whole category's runtime ceiling.** That is why every row carries a per-row length cap and a mono requirement rather than a note.
- *Creator Store is the default, and the clear is the stated exception.** The store carries *"more than 100,000 professionally-produced sound effects and music tracks"* free to use by asset id ``, and a store asset already has a live id, so it passes through no upload gate, no moderation queue and no permission grant. But in-world-sound work needs four files pitched to named scale degrees at one fixed length and one fixed peak, and the store does not sell those. **So the clear and its neighbour twin are `upload`**, with the reason carried in `whyNotCreatorStore`. Marking them `creatorStore` —…
- Audio upload limits: `.mp3`, `.ogg`, `.wav` or `.flac`, *"less than 20 MB in size and 7 minutes in duration"*, ≤ 48 kHz, mono or stereo; import caps 2,000 per 30 days ID-verified, 100 unverified; the Creator Store carries *"more than 100,000 professionally-produced sound effects and music tracks"* free to use ``. **Note the coincidence worth stating in sheet 03:** one file's upload ceiling is the whole category's runtime memory budget.
- **`upload`, not `creatorStore`, for all twelve.** The Creator Store's *"more than 100,000 professionally-produced sound effects"* are free to use but do not come pitched to a named scale degree at a fixed length, and imported audio is private until permission is granted per experience ``. Twelve uploads at 0.30 s are far inside the 20 MB per-file ceiling and the 100-import cap.
- **Audio provisioning.** Imported audio is private by default; *"The asset privacy system automatically ensures that the IDs of your imported audio can't be accessed by users without proper permissions"*, and permission is granted per experience. The Creator Store carries *"more than 100,000 professionally-produced sound effects and music tracks"* that are free-to-use. Formats `.mp3`, `.ogg`, `.wav`, `.flac`; under 20 MB and 7 minutes; sample rate ≤ 48 kHz; 2,000 imports per 30 days if ID-verified, 100 if not; uploads enter moderation and are visible only to the uploader until approved ``.…
- **A newer API exists.** *"Sound objects don't have the same dynamic functionality as AudioPlayer objects"*, and the docs recommend `AudioPlayer` for new implementations ``. **Not my call** — instance class routes to whoever places the `Sound`/`AudioPlayer` creator (G5, Mix to raise, `representation` to place). Sheet 03 states its rows in fields both APIs have, so the choice does not reopen the key.

## https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/input/mobile.md

*Cited by 4: `audio/ui/03-stated-silences`, `audio/ui/_lead`, `ui-ux/navigation/03-close-and-focus-by-device`, `ui-ux/navigation/_lead`*

- *Hover is a stated zero on every device class, not a sheet.** Roblox's own mobile input surface documents touch gestures, device motion, haptics and on-screen buttons and **no pointer or hover state at all** ``; `GuiObject.MouseEnter` and `MouseLeave` are described purely as mouse events ``. The brief's audience is *"mobile-heavy"* `[brief: binding]` ← `[you chose: R1 Q4]` (`00-CORE.md`), so most of it cannot produce the event; `composition` defines no hover state for any element; and a desktop-only cue on the game's only currency sink breaks `mechanics/03`'s parity floor, which requires…
- Roblox mobile input documents touch gestures (`TouchSwipe`, `TouchPinch`), haptics, accelerometer, gyroscope and on-screen buttons, and **no hover, mouse-over or pointer state**. `` → settles the hover ruling for ~70% of the audience.
- *Every conventional back input on this platform is unavailable, and that is sourced rather than assumed.** Escape *"is exclusively reserved for opening the Roblox menu"* and `ContextActionService` *"ignores all inputs registered by the CoreScripts"* ``. Gamepad **B toggles the Roblox menu** — reported against the UWP client, not reproducing in Studio, merged with no fix `` — enough to forbid B as the *only* gamepad close path and **not** enough to claim B is reserved on every client. And Roblox's own mobile input surface is touch gestures, motion sensors, haptics and on-screen buttons:…
- `` — Roblox's mobile input surface is touch gestures, motion sensors, haptics and on-screen buttons. **The Android hardware back button appears nowhere.** So on the largest device class there is no platform back input at all, which is why the close control has to be drawn.

## https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/sound/objects.md

*Cited by 4: `audio/mix/02-degradation-under-load`, `audio/mix/_lead`, `audio/sfx/03-the-sfx-key`, `audio/sfx/_lead`*

- *`InverseTapered` for own work, `LinearSquare` for a neighbour's.** `InverseTapered` is the lesser of the inverse and linear curves, so it falls off naturally near the source and still reaches zero at `RollOffMaxDistance` — it culls, which `Inverse` does not. 72 studs is above the 51.66-stud maximum effective clear radius `axisBudget` publishes, so the player's own farthest patch is always audible and everything past it is not. `LinearSquare` for the neighbour because *"low `RollOffMaxDistance` values cause audio to abruptly cut off"* `` and the squared curve is already near zero well…
- Parenting decides spatialisation: child of a `BasePart` or `Attachment` is positional; *"within `SoundService` or `Workspace`"* is global, *"volume and pan position remain the same regardless of the user's sound listener position"*; and *"low `RollOffMaxDistance` values cause audio to abruptly cut off"* ``.
- **Positional, because a neighbour's clear is the second half of presence.** `social/03` `X10` permits *"A's own patches clearing… and the clear cue that accompanies it"* to reach a second client, and `social/02` requires a neighbour read as a body whose ground is visibly being cleared. A global 2D cue would be 128 onsets a second at full level at 16 players. Spatialisation is decided by parent ``.
- **Positional vs global is decided by parent.** *"Volume changes depending on the distance between the user's sound listener and the position of the part"* when parented to a BasePart or Attachment; parented to `SoundService` or `Workspace`, *"Volume and pan position remain the same regardless of the user's sound listener position or rotation"*. A BasePart parent emits from the whole surface; an Attachment emits from a point ``.
- **`RollOffMode` defaults to `Inverse`; `EmitterSize` is deprecated — use `RollOffMinDistance` and `RollOffMaxDistance`** ``.

## https://robloxapi.github.io/ref/class/StarterPlayer.html

*Cited by 4: `art/characters/01-the-unmodified-body`, `gameplay/meta/06-plot-arrangement`, `gameplay/social/02-presence-sufficiency`, `gameplay/social/_lead`*

- *`theme/identity/03` criterion 2 cannot be satisfied by the route it names. I keep the ruling and decline the route.** Verbatim: *"Every player character has `HealthDisplayDistance = 0` set explicitly."* `grep -rn "HealthDisplayDistance" game/src` returns **0** — unimplemented — and `response.humanoidWritesAllowed` (`mechanics/05:111`, approved in wave 2, after identity/03) is exactly `["WalkSpeed"]`, so a module setting `Humanoid.HealthDisplayDistance` violates an approved key. **No health bar is right** in a game with no damage source and I am not reopening it. The available route is…
- **A neighbour is nameless at rest and I am not fixing that.** `StarterPlayer.NameDisplayDistance` defaults to 100 `` against a realised 122. Raising it is identity's call and my execution.
- *Identity work.** My test deliberately does not use the nameplate, so nothing here reopens `theme/identity/03-co-present-stranger`. But `StarterPlayer.NameDisplayDistance` defaults to **100** studs `` against a realised spawn separation of 160 today and 128 at best, so **a co-present stranger is nameless at rest either way.** If that ruling requires a readable nameplate, the display distance must rise above the realised separation — **identity's call, area arrangement's execution, not mine.**
- `StarterPlayer.NameDisplayDistance` and `HealthDisplayDistance` default to **100** studs. ``

## https://rowatcher.com/news/what-the-roblox-algorithm-actually-rewards-in-2026-not-ccu

*Cited by 4: `gameplay/balance/05-time-to-milestone`, `gameplay/balance/_lead`, `gameplay/core-loop/_lead`, `liveops/roadmap/_lead`*

- **165 seconds is derived, not chosen.** `core-loop/04` fixes a bound session at three to seven complete laps and the brief fixes the session at **10 to 20 minutes** `[brief: binding]` ← `[you chose: R1 Q4]` (`00-CORE.md`). 600 / 165 = 3.6 and 1200 / 165 = 7.3, so on arrival throughput 165 hits both ends exactly and nothing else in its 120-to-200 range does. It is also inside the only external session evidence the project has: a simulator's core loop should be completable in under five minutes, and over fifteen "is a design problem" ``.
- **Session-shape evidence for the milestone table.** "The core loop of a simulator is completable in under five minutes"; if one satisfying cycle takes over 15 minutes "that's a design problem"; sessions-per-user below 1.2 is "a structural re-engagement problem"; the 24-hour return window is weighted most heavily ``. This is the first external corroboration the project has for a sub-five-minute lap, and it supports the current 93-second lap far better than it supports `core-loop/04`'s original 165.
- **What the Roblox algorithm rewards.** Refetched with an update-specific prompt: the page names *"session return rate and short-session re-engagement"* with the 24-hour window weighted most heavily, and contains **no statement about update frequency, update recency or content drops** ``. Recorded as a **sourced negative**: there is no discovery argument for a cadence in this project's research bank, so a cadence cannot be smuggled in as a distribution decision after being declined as a retention one.

## https://www.ofzenandcomputing.com/grass-incremental-tips-tricks/

*Cited by 4: `gameplay/meta/_lead`, `gameplay/onboarding/02-first-minute-beats`, `gameplay/onboarding/03-teaching-order`, `gameplay/onboarding/_lead`*

- **The reference's island count, single-sourced and low-confidence: five islands, unlocked at 5 / 25 / 100 / 500 rebirths**, with three grass "mutations" at 10x / 100x / 1000x value. The rebirth-gated island structure corroborates the skeleton the brief already has from a second source; **the count of five does not, and the same page also lists "quantum cutting mechanics", which reads as filler.** Cited as fetched, not as reliable.
- *The reference is a model for shape, not for order.** It teaches cut → currency → upgrades → rarity → zones → rebirth `` `` — exactly the *economy first, finds later* alternative `02-GAMEPLAY.md` declined, and it has no discovery layer to teach. **Position 2 is the whole divergence and this sheet puts a Find there.**
- *Rank 2 is the divergence and it is deliberate.** The reference teaches cut → currency → upgrades → rarity → zones → rebirth `` ``, the *economy first, finds later* order `02-GAMEPLAY.md` **declined** *"because a new player could quit before ever seeing what makes this game different"*. It has no discovery layer to teach; this game puts the Find at position 2 in *time*, riding `firstClear`.
- The same order restated as the game's own loop: "Cut Grass – Walk through grass blocks to collect them, Earn Currency – Each grass block gives you grass currency, Purchase Upgrades – Spend grass on improvements, Unlock Rebirths – Reset for permanent multipliers, Access New Islands – Discover new upgrade paths" ``
- **Structurally, immediately, and that part is sourced.** The player "spawn[s] on a small grassy platform with a basic saw blade attached to your character", and grass appears "as green blocks that you can walk through to cut and collect" ``; the action is "Simply walk through grass blocks to cut them automatically", with no animation or interaction ``. Tool equipped at spawn, standing in the resource, proximity harvest: **the first payoff is the first blade touched.** Our design inherits that shape and adds a Find to the same instant.
- **In wall-clock seconds, `[unverified]`.** No source I reached states a measured time to first currency or to first upgrade. The two milestone figures I did get are thresholds, not durations: a first rebirth "usually around 1,000 grass" and Island 2 after "5 rebirths" ``, and they disagree with the other guide's advice to grind "approximately 10-15 rebirths before seriously pursuing the second island" ``, which is a strategy claim rather than a gate. **The specific fetch that would settle it:** a transcript or timestamped capture of the first 120 seconds of game id 133086043677134 — the…

## https://www.roblox.com/games/113380129609386/Leaves-Incremental

*Cited by 4: `gameplay/meta/_lead`, `theme/tone/01-register`, `theme/tone/04-do-nots`, `theme/tone/_lead`*

- **Two sibling incrementals advertise area unlocking and publish no counts.** Pressure Wash Incremental: "[🌎] Unlock New Islands". Leaves Incremental: "Unlock new areas and discover rare leaf types" — and its Roblox page reported "There are currently no running experiences", i.e. zero live servers at fetch time. Content volume in this family is not publicly stated by its own store listings.
- The register has to be executed at the punctuation level or it is not a register. All three games in this family open with the word *relaxing* and then punctuate like a trailer: *"Trim the grass!"*, *"Gather fallen leaves!"*, *"Enjoying the game?"*, glyphs in the title `` `` ``. Claiming the adjective is the genre norm; declining to claim it, and writing flat, is the departure. That is the whole content of `[brief: soft]` *"Tone: warm, aged, unhurried"* (`01-FOUNDATION.md`) once it is made checkable.
- **`Leaves Incremental`** (PrestigeLabs Studios, a different studio, and the one game in the family that ships without rebirth). Description: *"A relaxing leaf-gathering simulator! Collect, upgrade, and explore colorful autumn worlds!"* plus *"Gather fallen leaves!"*, *"Unlock new areas and discover rare leaf types!"*, *"USE CODE: RELEASE"* and *"Enjoying the game?"*. Register: glyph-dense including an update badge and a leaf glyph inside the title itself, every feature line exclamatory, engagement prompts and a code promo in the description. ``

## https://www.roblox.com/games/92876036717311/Scrap-Incremental

*Cited by 4: `liveops/codes/_lead`, `theme/tone/01-register`, `theme/tone/04-do-nots`, `theme/tone/_lead`*

- The same studio's sibling title, the one `theme/tone/04` `D10` already cites, carrying a **byte-identical** description template: group boost, like/favourite, **no codes** ``
- The register has to be executed at the punctuation level or it is not a register. All three games in this family open with the word *relaxing* and then punctuate like a trailer: *"Trim the grass!"*, *"Gather fallen leaves!"*, *"Enjoying the game?"*, glyphs in the title `` `` ``. Claiming the adjective is the genre norm; declining to claim it, and writing flat, is the departure. That is the whole content of `[brief: soft]` *"Tone: warm, aged, unhurried"* (`01-FOUNDATION.md`) once it is made checkable.
- **`Scrap Incremental`** (third, taken for triangulation). Description: *"A relaxing magnet simulator game"* with a sunglasses glyph, then the same *"The more you rebirth and upgrade..."* sentence, with seven distinct glyphs, numbered feature brackets, *"Enjoying the game? Leave a Like and Favorite!"* and *"Join the Unequal Games group for in-game boosts!"*. ``
- *A refinement to the brief's landscape research, from that last quote.** `research/landscape.md` attributes the shared marketing sentence to *"at least two different studios"* and lists Grass and Scrap as separate entries. Scrap Incremental's own description sends players to *"the Unequal Games group"*, which is the reference's studio, so Grass and Scrap are very likely one studio's template rather than two independent shippers. The independent same-sentence shipper is PrestigeLabs (Leaves). This does not weaken the brief's conclusion, it sharpens it: the genre's register norm is more…

## https://about.roblox.com/community-standards

*Cited by 3: `analytics/events/02-never-logged`, `analytics/events/_lead`, `liveops/community/_lead`*

- **`N1`–`N8` are the platform's list, not mine.** The community standards enumerate email, passwords or access tokens, home address, financial information, medical information, telephone number, off-platform internet identifiers, sensitive credentials, and visual and audio media of a user, and state that *"users may be prohibited from sharing or requesting personal information on Roblox depending on their age"* ``. The brief states no data rule (`OPEN.md §5` #6 marks Integrity `[I assumed]`), so this is discharged as sourced platform policy rather than as an asserted policy of mine.
- The age-band data rule, discharged as platform policy `` — the enumerated PII list (email, passwords or access tokens, home address, financial information, medical information, telephone number, off-platform internet identifiers, sensitive credentials, visual and audio media of a user) and *"users may be prohibited from sharing or requesting personal information on Roblox depending on their age"*. This is the rule `02` complies with. **Note the shape of the compliance:** `LogCustomEvent` takes a `Player`, so identity is the platform's and the game defines no identifier at all — which is…

## https://create.roblox.com/docs/cloud-services/data-stores/versioning-listing-and-caching

*Cited by 3: `tech/deploy/01-the-release-contract`, `tech/deploy/_lead`, `tech/persistence/03-store-versions-and-migration`*

- *Rollback is a republish.** A restore creates a new version and does **not** publish it ``; publishing does not evict players, and a restart takes a 1–60 minute delay ``. **15 minutes** `[playtest unknown]`, range 5–30, sized for disruption not data: `wiring.onShutdown` saves before teardown, and 15 sits inside the 10–20 minute session `[brief: binding]`. The data half is platform-bounded — successive writes inside one UTC hour overwrite permanently, so **rollback granularity is one hour per key, not one save** ``.
- **Within one version there is effectively no rollback, and the number is one hour.** DataStore versioned backups keep the latest forever and expire others 30 days after being overwritten, but **successive writes within the same UTC hour overwrite permanently** ``. At a 45-second interval that is 79 of every 80 writes unrecoverable, so per-key recovery granularity is **one hour, not one save**. That makes per-player restore a manual Open Cloud act by whoever holds the API key, and it is why sheet 01's `D11` forbids `GetVersionAsync`, `ListVersionsAsync` and `RemoveAsync` in game code: a…

## https://create.roblox.com/docs/environment/lighting

*Cited by 3: `art/lighting/01-the-one-daylight-state`, `art/lighting/02-the-readability-floor`, `art/lighting/_lead`*

- *One state covers eight areas and four depths, argued on geometry plus the engine, not on budget.** Depth already reads through three non-light channels: `layout`'s four disjoint chunk families at 35/37/39/40 anchors per chunk, `depths`' 140 → 640 patches, and rising green quantity by `theme/setting/01`. On top of that the engine renders the terrace/vault difference from one state for free — `Ambient` *"affects the lighting for both outdoor and indoor environments"* while `OutdoorAmbient` *"applies specifically to outdoor areas"*, decided by surface exposure ``. **I do not rest this on…
- *Three properties are fixed so the readability model is computable without a device.** `ExposureCompensation` 0 makes the global exposure term identically 1; `ColorShift_Top` and `_Bottom` at black make the sun-facing and away-facing tint terms identity (`_Top` *"reflects from surfaces facing the sun"*, `_Bottom` from those facing away ``); and `EnvironmentDiffuseScale` 0 removes the environment-derived ambient term, which is both the term `02`'s static gate cannot compute and the term that collapses hardest inside an enclosed bay. Any nonzero `ExposureCompensation` is *moving the sun*…
- *Nobody owns the lighting-style property and the platform is mid-migration on it.** `Enum.LightingStyle` ships exactly two members, `Realistic` (0) and `Soft` (1) ``, while `Enum.Technology` now marks `Legacy` and `Unified` deprecated ``. I set `Realistic`, because `ShadowSoftness` *"only functions with Realistic lighting style"* `` and a hard shadow edge on cleared stone is a local luma trough `02`'s minimum rule catches. The migration's timeline and a new place's default are `[unverified]` secondary claims which I do not write as sourced; the key names both the new field and the…
- *The enclosure check is a raycast, not a render.** `Ambient` applies indoors and out while `OutdoorAmbient` applies only outdoors, the engine deciding by surface exposure ``, so an enclosed bay is lit by the darker of the two. Five upward rays per sample point, two of which must reach open sky, is a deliberately coarse proxy: it runs with no rendering, no device and no pixels, and it is the half of the problem `environment` can act on. **It is a requirement on `environment`'s authored openings and never a licence to raise `Brightness`** — `V11` makes that a byte comparison rather than an…
- 1. **Every `Lighting` property default.** The API reference page documents types, not defaults, so the thirteen unstated properties' current effective values are `[unverified]`. `01` must state its values absolutely and never as *"the default"*. → *fetch:* `https://create.roblox.com/docs/reference/engine/classes/Lighting` rendered with the property-default column, or read the defaults off a fresh baseline place in Studio. 2. **Which lighting-style value a new place gets, and the migration's status.** A search returned secondary reports (a devforum announcement thread and two Fandom mirrors)…

## https://create.roblox.com/docs/performance-optimization/improve

*Cited by 3: `art/environment/01-world-part-budget`, `art/environment/_lead`, `tech/performance/_lead`*

- **Why a tuple vocabulary rather than a density number.** Roblox documents draw-call batching for *meshes* sharing content and texture and says nothing about primitives ``. If primitives batch, one tuple costs one draw class; if they do not, it costs its own instance count, which is the resident allowance and is already bounded. A tuple count is therefore the only density figure that is true under both models, and it is checkable without a running game. The same page's warning is the reason the roster is short: *"If a large number of objects are concentrated with a high density, then…
- **Two free savings taken on every class.** *"For parts that do not need collisions, disable their collisions by setting `BasePart.CanCollide`, `BasePart.CanTouch` and `BasePart.CanQuery` to false"* and *"Use the `BasePart.CastShadow` property to disable shadow casting on small parts"* ``. Only `paving`, `kerb`, `parapet`, `crossWall`, `pier` and `basin` collide, because a player walks on them or into them; everything else is set false on all three. `CanTouch` is false on all eleven.
- **So the density answer is a design rule, not a number.** Roblox documents batching for meshes sharing content and texture, and says nothing about primitives ``. Every world part drawing its `Size`, `Material` and `Color` from one short closed vocabulary costs at most one draw-call class per tuple if any batching exists, and at most its own part count if none does. **`environment.distinctDrawClasses` is then a statically countable number and the honest form of a set-dressing density.**
- **Two free savings, already sourced.** *"For parts that do not need collisions, disable their collisions by setting `BasePart.CanCollide`, `BasePart.CanTouch` and `BasePart.CanQuery` to false"*, and *"Use the `BasePart.CastShadow` property to disable shadow casting on small parts where shadows are unlikely to be visible"* ``. Also from the same page, and it is the sentence a set-dressing sheet should read twice: *"If a large number of objects are concentrated with a high density, then rendering this area of the scene requires more draw calls."*
- `https://create.roblox.com/docs/performance-optimization/improve` — batching is documented for *meshes* sharing content and texture and is **not addressed for primitives**, which corroborates `budgets.renderCeilings.batchingFactor`'s stated uncertainty from the source rather than from another sheet; plus the `CanCollide`/`CanTouch`/`CanQuery` guidance, the `CastShadow` guidance, and the object-density-raises-draw-calls warning. **This page is one of `tech/performance/01`'s open `[research owed:]` items** and it is now banked.
- `https://create.roblox.com/docs/performance-optimization/improve` — "For parts that do not need collisions, disable their collisions by setting `BasePart.CanCollide`, `BasePart.CanTouch` and `BasePart.CanQuery` to false"; `CastShadow` guidance; draw-call instancing described for *meshes* sharing content and texture. Note for **01**: `Plots.luau` already sets `CanCollide` false and `CastShadow` false on patches but sets **neither `CanTouch` nor `CanQuery`**, which is a one-property saving available at no design cost and is a consequence for whoever holds `representation`.

## https://create.roblox.com/docs/production/monetization

*Cited by 3: `gameplay/monetization/02-what-is-never-sold`, `gameplay/monetization/_lead`, `marketing/_category`*

- *`F11`, manufactured scarcity — the one prohibition no sheet has stated.** `theme/tone/04` `D9` bans the timer and the countdown, from the brief's zero-tension rule; the platform independently advises that discounts be "genuine and fair" and against creating a "false sense of urgency" through misleading countdown timers or artificial scarcity claims ``. `D9` catches the widget; `F11` catches the sentence — *"only 3 left"*, *"1,204 players own this"*, a waitlist, a queue — which is the same manipulation with no clock attached. `[cid: decided]`, flagged below.
- **Roblox's own monetization overview independently corroborates `theme/tone/04` `D9` from the platform side**, advising that discounts be "genuine and fair" and against creating a "false sense of urgency" through misleading countdown timers or artificial scarcity claims. `D9` was written from the brief's zero-tension rule; it is also platform guidance. ``

## https://create.roblox.com/docs/production/monetization/paid-random-items

*Cited by 3: `gameplay/monetization/02-what-is-never-sold`, `gameplay/monetization/_lead`, `ui-ux/store/01-no-in-game-offer-surface`*

- *`F3`, gacha.** There is nothing to roll and nothing to bias: `gameplay/systems/03` fixes that one graded rarity ladder exists, it is the overgrowth's, and a Find carries no rank; `gameplay/systems/05` removes duplicates by partitioning the sets across areas, so no discovery *rate* exists either. On top of both, a paid random outcome would oblige this game to publish "all possible outcomes and the actual numerical odds" as percentages summing to exactly 100%, to explain any luck booster's effect numerically with "the new odds … dynamically updated", and to carry a `PolicyService`…
- **A third, platform-side reason gacha does not belong here**, on top of the content-access ban and `luckShaped: false`: any paid random outcome requires the creator to "indicate all possible outcomes and the actual numerical odds of what they may receive", as percentages summing to exactly 100%, and any purchasable luck booster must have its effect explained numerically with "the new odds … dynamically updated when these items are active". `PolicyService: GetPolicyInfoForPlayerAsync()`'s `ArePaidRandomItemsRestricted` flag can make paid random items unavailable to a given user entirely,…
- *One finding that meets the two-builders bar, and its root cause.** `default.project.json` syncs `src/shared` wholesale into `ReplicatedStorage.UIForge` ``, and `src/shared/Screens/` holds **eight** generated screen modules of which `init.client.luau` requires exactly one, `hud`. The other seven ship inside the place and replicate to every client. `shop.luau` and `shop-galaxy.luau` render `"SHOP"`, `"Cosmic Egg"`, `"Void Egg"`, `"Luck Boost"`, price pills `"25,000"` / `"90,000"` / `"1,500"` and `"OPEN 3 EGGS"`; `crates.luau` renders `"COSMIC CRATES"`, `"Starter Crate"`, `"199 GEMS"`, `"899…

## https://create.roblox.com/docs/projects/update-games

*Cited by 3: `tech/deploy/01-the-release-contract`, `tech/deploy/_lead`, `tech/persistence/03-store-versions-and-migration`*

- *Rollback is a republish.** A restore creates a new version and does **not** publish it ``; publishing does not evict players, and a restart takes a 1–60 minute delay ``. **15 minutes** `[playtest unknown]`, range 5–30, sized for disruption not data: `wiring.onShutdown` saves before teardown, and 15 sits inside the 10–20 minute session `[brief: binding]`. The data half is platform-bounded — successive writes inside one UTC hour overwrite permanently, so **rollback granularity is one hour per key, not one save** ``.
- **The bump-to-revert window is bounded by the restart procedure, not by this key.** Publishing does not evict players; outdated servers drain naturally or are restarted with a **1–60 minute** delay ``, and restoring a place version does not publish it ``. That is Build & Deploy's `rollback` block; I state the data consequence and set none of its timings.

## https://create.roblox.com/docs/projects/version-history

*Cited by 3: `tech/deploy/01-the-release-contract`, `tech/deploy/_lead`, `tech/persistence/03-store-versions-and-migration`*

- *Rollback is a republish.** A restore creates a new version and does **not** publish it ``; publishing does not evict players, and a restart takes a 1–60 minute delay ``. **15 minutes** `[playtest unknown]`, range 5–30, sized for disruption not data: `wiring.onShutdown` saves before teardown, and 15 sits inside the 10–20 minute session `[brief: binding]`. The data half is platform-bounded — successive writes inside one UTC hour overwrite permanently, so **rollback granularity is one hour per key, not one save** ``.
- **The bump-to-revert window is bounded by the restart procedure, not by this key.** Publishing does not evict players; outdated servers drain naturally or are restarted with a **1–60 minute** delay ``, and restoring a place version does not publish it ``. That is Build & Deploy's `rollback` block; I state the data consequence and set none of its timings.

## https://create.roblox.com/docs/reference/engine/classes/ContentProvider

*Cited by 3: `audio/stingers/01-the-three-payoff-cues`, `audio/stingers/_lead`, `audio/ui/_lead`*

- `Sound.SoundId` is a `ContentId` string, so `release.provisioning.unprovisionedIdValue`'s `0` cannot transfer by type, and `tech/deploy/02` forbids an explicit null ``. **I use `""`, the engine's own empty default, and Mix's ruling supersedes this field if it lands differently** — a one-field revision, not a redesign. The guard is at the play site rather than at the id because a sound whose id will not load *"will CONSTANTLY error"* in the console ``, so a cue body must return before it touches a `Sound` at all. Source class is `creatorStore` for all three by preference: the store carries…
- `` — `PreloadAsync` yields and works on `Sound` instances, which is the mechanism by which three cue assets can be made ready before the first clear without blocking `loadToFirstInputSeconds`.
- `ContentProvider:PreloadAsync` accepts `Sound` instances and yields. ``

## https://create.roblox.com/docs/reference/engine/classes/DataModel#BindToClose

*Cited by 3: `tech/_verified`, `tech/deploy/01-the-release-contract`, `tech/persistence/_lead`*

- ### `cid/tech/persistence/01-the-save-write.md` — a `` tag points at a page that does not carry the claim **Violates:** every `` corresponds to a real fetched source carrying the fact. **Fix:** line 37 cites `` for the 30-second budget. `persistence/_lead` records under "Fetched but incomplete" that this fetch *"returned the Studio note but not the timeout"* and that the sentence came from a search snapshot. `tech/deploy/_lead` fetched a page that does carry it: `https://github.com/Roblox/creator-docs/blob/main/content/en-us/cloud-services/data-stores/player-data-purchasing.md`. Re-cite to…
- *Shutdown gets a second chance, not a redesign.** `BindToClose` callbacks share 30 seconds total `` — 16 parallel saves in one budget. `ServerRestartScheduled` fires before any of it, so saving there makes `BindToClose` a retry. Additive; `wiring.onShutdown` is untouched.
- **The `BindToClose` 30-second window.** A direct fetch of `https://create.roblox.com/docs/reference/engine/classes/DataModel#BindToClose` returned the Studio note but not the timeout. A search against the same domain surfaced the doc's own sentence — "The experience server waits 30 seconds for all bound functions to stop running before it shuts down" — so I am citing it as `` on that page with the fetch discrepancy recorded here. If a later reader needs it settled, the fetch that does it is the raw `creator-docs` markdown for `reference/engine/classes/DataModel.yaml`.

## https://create.roblox.com/docs/reference/engine/classes/GuiService/AddSelectionParent

*Cited by 3: `ui-ux/navigation/03-close-and-focus-by-device`, `ui-ux/navigation/_lead`, `ui-ux/platform/01-device-viewport-rules`*

- *Gamepad selection is allowed to escape the panel, and that is the ruling rather than an oversight (index contradiction 2).** `SelectionGroup` *"constrain[s] where the UI highlight can move"*, and `SelectionBehaviorUp/Down/Left/Right` default to `Escape` — *"it will then allow selection to 'Escape' the group"* — with `Stop` as the confining alternative; `SelectionOrder` picks the initial selection, *"lower … prioritized first. The default value is 0."* ``. The pre-2022 idiom is not the one to spec: `GuiService:AddSelectionParent` is **deprecated** ``.
- `` — marked **Deprecated**. The pre-2022 selection-group idiom is not the one to spec.
- *Focus is built only from properties the reference documents.** `Selectable`, `SelectionOrder` and `NextSelectionUp/Down/Left/Right` are all confirmed `GuiObject` members ``. `SelectionGroup` is **not** on that page — it appears only in a release thread `` — and `GuiService:AddSelectionParent` is deprecated ``. Building the contract from the documented three costs nothing and removes an `[unverified]` dependency from the one path a console player has to spend currency. **Explicit links also beat a group on the merits here:** the four pressables sit in two opposite corners, so any spatial…

## https://create.roblox.com/docs/reference/engine/classes/Humanoid

*Cited by 3: `art/characters/_lead`, `tech/deploy/01-the-release-contract`, `tech/deploy/_lead`*

- 1. `https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/studio/avatar-settings.md` — the three Avatar Type options verbatim; the not-accessible-with-scripts sentence; and, **new to this project, the Body tab**: `Custom Scale` with a settable Minimum/Maximum absolute height in studs, `Custom Build`, and the ~5 / ~6–6.5-stud reference heights. Independently confirms `tech/deploy/01`'s rig rows rather than inheriting them. 2. `https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/characters/appearance.md` — body scaling is `height / width / head / body…
- *Avatar type: the player-choice option is the hazard, not R6.** The options are exactly **R6 / R15 / R15 & R6**, set in Avatar Settings, which *"modifies underlying game defaults that are not visible outside of the settings interface or accessible with scripts"* ``. R6 is total and obvious. **R15 & R6 lets one joiner arrive R6, tool-less, while everyone else is correct** — no error, no reproduction. The setting has no read-back, but `Humanoid.RigType` **is** readable per character from a server script ``, which the architect did not note, so P2 is asserted per spawn rather than not at all.

## https://create.roblox.com/docs/reference/engine/enums/Font

*Cited by 3: `art/ui-art/01-archetype-and-lock`, `art/ui-art/03-type-ramp-and-font-stack`, `art/ui-art/_lead`*

- *The archetype cannot legally be emitted until sheet `03` closes `A1`.** `fantasy-ornate` resolves `fontStack: 'serif-ui'`, whose `numeric.roblox` is `'MerriweatherBold'`, which is not a member of `Enum.Font` ``. Indexing `Enum.Font` with an absent member **raises**, so `UIBuilder.luau:482`'s `or Enum.Font.Gotham` fallback never runs and every `numeric`-typed node throws inside `buildNode`, taking the client with it. The blast radius is bounded to `type.numeric`, read only by `ReadoutValue`; `Pressables.luau:404` indexes the same way but reads `type.body`, which resolves to `SourceSans` ``.…
- *The blocking defect, and it is the second this wave that bites on its own fix.** `fantasy-ornate` resolves `fontStack: 'serif-ui'`, whose `numeric.roblox` is `'MerriweatherBold'` (`palettes.mjs:150`). `Merriweather`, `SourceSans`, `FredokaOne`, `Gotham` and `GothamBold` are members of `Enum.Font`; **`MerriweatherBold` is not**, and there is no bold variant ``. `UIBuilder.luau:482` does `inst.Font = (Enum.Font :: any)[t.font] or Enum.Font.Gotham`, so under the correct archetype every numeric readout either **throws**, killing `UIBuilder.build` and with it the entire client (the precedent…
- `https://create.roblox.com/docs/reference/engine/enums/Font` — enumerates `Enum.Font`. `Merriweather` (32), `SourceSans` (3), `FredokaOne` (26), `Gotham` (17), `GothamBold` (19) are members; **`MerriweatherBold` is not.** 50 members plus `Unknown`. This is the whole basis of sheet 03's blocking defect. ``

## https://create.roblox.com/docs/scripting/scheduler

*Cited by 3: `tech/networking/01-snapshot-wire-form`, `tech/performance/02-server-frame-cost`, `tech/performance/_lead`*

- *The rate is Performance's, the cost is mine.** The server heartbeat is capped at 60 Hz `` and `task.wait` resumes on the next Heartbeat ``, so `Clearing.luau`'s `task.wait(Config.ClearTickRate)` realises `ceil(d × 60) / 60` ``. I cost the realised periods — 0.1333 s and 0.05 s — and state no tick preference. Balance's requested 0.04 is cited from an unreleased stage and is named by its realised value, never by its requested one.
- *The quantisation rule first, because every figure in circulation ignores it.** Server heartbeat is capped at 60 FPS ``, and `task.wait` *"yields the current thread until the given duration (in seconds) elapses and then resumes the thread on the next Heartbeat step"* ``. `Clearing.luau:485` drives the loop with `task.wait(Config.ClearTickRate)`, so the realised period is **`ceil(d × 60) / 60`** and the only reachable periods are integer multiples of 16.67 ms. **0.12 → 0.1333 s. 0.04 → 0.05 s. Nothing between 0.0334 and 0.05 is reachable at all**, because 2 frames is 0.0333 and 3 frames is…
- `https://create.roblox.com/docs/scripting/scheduler` — `task.wait` *"yields the current thread until the given duration (in seconds) elapses and then resumes the thread on the next Heartbeat step."* Verbatim, and mirrored at `https://github.com/Roblox/creator-docs/blob/main/content/en-us/scripting/scheduler.md`. **The second load-bearing source for 02**: with the 60 FPS cap it gives the quantisation rule.

## https://create.roblox.com/docs/studio/optimization/memory-usage

*Cited by 3: `audio/ambient/01-the-continuous-layers`, `audio/ambient/_lead`, `tech/performance/_lead`*

- *Two facts about the build, stated as requirements I do not fill.** `game/src` contains zero `Sound` instances and no key in either contract names a module permitted to create one — ten grep matches this run, all comments or forbidden-word lists ``. That is `G5`, raised by `mix`, placed by instance-representation work. And `budgets.memoryCeilingsByCategory` names `Sounds` and omits `StreamingSounds`, the second audio category PlaceMemory reports ``, so a streamed bed is budgeted by nothing; **`mix` is filing that and I reference rather than duplicate it.** `approxSizeMB` **1.5** is a…
- `https://create.roblox.com/docs/studio/optimization/memory-usage` (and its GitHub mirror) — the memory category tree: `CoreMemory`, `PlaceMemory`, `UntrackedMemory`, `PlaceScriptMemory`, `CoreScriptMemory`, with `PlaceMemory` subdividing into `Instances`, `PhysicsParts`, `PhysicsCollision`, `GraphicsTexture`, `GraphicsMeshParts`, `Sounds`, `Gui` and others. **These names are the data form for a memory budget** — a budget expressed in them is checkable against a real reading; one expressed in megabytes of "the game" is not.

## https://create.roblox.com/docs/workspace/collisions

*Cited by 3: `gameplay/mechanics/06-traversal-affordances`, `gameplay/social/01-server-and-co-presence`, `gameplay/social/_lead`*

- *G9, can one body block another.** No. `[cid: decided]` The binding social rule is "shared server, parallel progression, own areas, no interaction. Interaction: none mechanical" `[brief: soft]` ← `[you accepted: R6 Q2]`, `02-GAMEPLAY.md`, stated twice. A body that blocks another body is a mechanical interaction, and it is the only one the game affords: blocking a route or parking on a Find mid-dwell are each achievable by a stranger who cannot do anything else. Player characters collide by default on Roblox, since "All BaseParts automatically belong to this default group unless assigned to…
- Player characters collide by default; "All BaseParts automatically belong to this default group unless assigned to another group, meaning that they will collide with all other objects in the Default group", and all groups are configured to collide with each other. ``

## https://currently.att.yahoo.com/att/full-powerwash-simulator-2-mission-140000826.html

*Cited by 3: `gameplay/core-loop/01-payoff-frequency`, `gameplay/core-loop/05-depth-escalation`, `gameplay/core-loop/_lead`*

- In the closest shipping analogue of a completion-shaped lap, an early small job runs "30-45 minutes" and a later one "1-2 hours solo", across 38 jobs and "around 30-35 hours to complete every job", with partial progress persisting mid-job. `` `` (fetched in this domain's planning pass, not re-fetched here). Its *smallest* early lap is 1.5x this game's entire bound session, and it survives that only because its audience sits down for long desktop sessions. This game's derived depth-1 lap is 2.7 minutes. **The analogue confirms the shape and inverts the scale**, which is the second independent…
- The closest shipping analogue of a completion-shaped lap runs from a few minutes to 2–3.5 hours per job with an early representative job at 30–45 minutes `` `` (fetched in this domain's planning pass, recorded in `_lead.md`, not re-fetched here). Its jobs grow by roughly **4× in duration** across a 38-job campaign on long desktop sittings. **It is the strongest available evidence for the assumption I am overruling, and it does not transfer**: 4× of duration growth requires a session that can absorb it, and `00-CORE.md` fixes 10–20 minutes, mobile, ages 8–14 `[brief: binding]` ← `[you chose:…

## https://devforum.roblox.com/t/how-do-you-play-a-sound-without-restarting-it/1101216

*Cited by 3: `audio/mix/02-degradation-under-load`, `audio/sfx/03-the-sfx-key`, `audio/sfx/_lead`*

- *One `Sound` cannot overlap itself** — `Play()` restarts it `` `` — so every cue row carries a `poolSize` and a play site acquires from a pool. Without that, `onOverload: "overlap"` at 8 onsets a second builds a machine-gun restart, and two builders would not converge on the fix.
- **The variation rule and the tier note are one mechanism, which is why twelve assets are affordable.** `Play()` restarts a `Sound` rather than layering it ``, so eight onsets a second from one id is a machine-gun restart. Variation comes from the ground's own tier mix and a three-step round-robin cursor per `tierIndex`. **No randomness anywhere** — `N10` forbids a second source of it near `layout`, and a deterministic cursor is checkable while an RNG is not. Three is the smallest cycle that does not read as alternation `[playtest unknown]`, test range 2 to 4 variants per `tierIndex`.
- **One `Sound` cannot overlap itself.** `Play()` *"sets TimePosition to the last value set by a script (or 0 …), then sets Playing to true"* ``, and the community reading is unambiguous — *"doing this restarts the sound if it was already playing"*, overlap requires multiple instances ``. **This is why `response`'s `onOverload: "overlap"` at 8/s is a data requirement and not a note:** a builder handed one row with one id builds a machine-gun restart, which two builders would not converge on.

## https://devforum.roblox.com/t/keep-particles-on-particleemitterdestroy/335327

*Cited by 3: `art/vfx/01-the-clear-and-the-reveal`, `art/vfx/02-who-draws-it-and-where`, `art/vfx/_lead`*

- *V8, the trap: the clear cue may not live on the patch.** `Clearing.luau:242-249` calls `instance:Destroy()` on the patch at the clear instant, and destroying an emitter's parent removes its live particles immediately `` (a devforum thread, banked at that strength) — so a cue hosted there dies when it should play. **The host is the lane slab `Part`** (`representation.plot`, top face at Y = 0, destroyed only at teardown), which outlives every patch on it by construction.

## https://devforum.roblox.com/t/new-event-marketplaceservicewebsite-gamepasspurchaseplayer-gamepassid/1157069

*Cited by 3: `tech/networking/04-ownership-authority`, `ui-ux/store/02-when-a-purchase-applies`, `ui-ux/store/_lead`*

- *The other half of my lead's finding stands.** `PromptGamePassPurchaseFinished` fires only for a prompt the experience raised ``, `products.F13` forbids every `PromptGamePassPurchase` call in the build, and no in-experience event fires for a website purchase ``. So there is no **event** trigger. A **poll** is the only trigger, and it is sufficient.
- *The Feedback reading is correct and is about a different thing.** `PromptGamePassPurchaseFinished` fires only for a prompt the experience raised ``, `products.F13` forbids raising one, and no in-experience event fires for a website purchase ``. So **nothing is pushed** to anybody — which forbids event-driven detection and a notice, and says nothing about polling. Its sentence *"the client never learns the purchase happened"* is true of the client and must not be read as true of the server, or a builder concludes there is nothing to poll ``.
- `` — confirms no in-experience event fires for a website purchase, so polling or a per-event re-check is the only detection path. This is why sheet 02 asks for a re-read rather than a listener.

## https://devforum.roblox.com/t/new-gamepad-ui-selection-apis/1791278

*Cited by 3: `ui-ux/navigation/03-close-and-focus-by-device`, `ui-ux/navigation/_lead`, `ui-ux/platform/01-device-viewport-rules`*

- *Gamepad selection is allowed to escape the panel, and that is the ruling rather than an oversight (index contradiction 2).** `SelectionGroup` *"constrain[s] where the UI highlight can move"*, and `SelectionBehaviorUp/Down/Left/Right` default to `Escape` — *"it will then allow selection to 'Escape' the group"* — with `Stop` as the confining alternative; `SelectionOrder` picks the initial selection, *"lower … prioritized first. The default value is 0."* ``. The pre-2022 idiom is not the one to spec: `GuiService:AddSelectionParent` is **deprecated** ``.
- 1. **Purchase reachability versus a modal index.** `input.travelRequiredToPurchase` is `"none"`, `input.pressable.roles[purchase].persistent` is true and `core-loop/01` requires buying be reachable *"from anywhere in the area with no travel and no area exit"* — while the same `input` sheet calls the index *"modal: the character stands still while it is open"*. A modal that sinks input is a screen a purchase sits behind. **The shipped code split the difference by assertion** and the assertion does not hold at its own width. → `02` (a). 2. **The same collision on gamepad.** `representation`…
- `` — `SelectionGroup` *"constrain[s] where the UI highlight can move"*; `SelectionBehaviorUp/Down/ Left/Right` default to **`Escape`** (*"it will then allow selection to 'Escape' the group"*) with `Stop` as the confining alternative; `SelectionOrder` picks the initial selection, *"lower … prioritized first. The default value is 0."* This is the mechanism sheet `03` must use.
- *Focus is built only from properties the reference documents.** `Selectable`, `SelectionOrder` and `NextSelectionUp/Down/Left/Right` are all confirmed `GuiObject` members ``. `SelectionGroup` is **not** on that page — it appears only in a release thread `` — and `GuiService:AddSelectionParent` is deprecated ``. Building the contract from the documented three costs nothing and removes an `[unverified]` dependency from the one path a console player has to spend currency. **Explicit links also beat a group on the merits here:** the four pressables sit in two opposite corners, so any spatial…

## https://en.wikipedia.org/wiki/Piscina_Mirabilis

*Cited by 3: `art/environment/04-depth-families`, `art/environment/_lead`, `theme/setting/02-extent`*

- **Why 2.5% is a roof and 100% is not available.** The Piscina Mirabilis is 48 pillars in four rows of twelve carrying barrel vaults over 72 × 25 m, with water drawn *"from above … exploiting the holes in the barrel vaults"* ``. Its pier grid of roughly 5 × 6 m is about 18 × 21 studs, which over a 480-stud bay is ~144 piers — **an order of magnitude above this domain's entire per-lane allowance of 18.** So the choice is not how to roof a bay; it is whether one vault band exists or none does. **A band exists**, and the vault becomes an event on the walk rather than a condition of the bay.…
- `https://en.wikipedia.org/wiki/Piscina_Mirabilis` — 72 × 25 × 15 m, **48 pillars in four rows of twelve**, five naves and thirteen bays, barrel vaults, and water drawn *"from above … exploiting the holes in the barrel vaults."* Real numbers for 04: a pier grid of roughly 5 × 6 m — about 18 × 21 studs — which over a 120 × 480 bay is ~144 piers, an order of magnitude above this domain's entire per-lane allowance. **04 starts from that gap, not from a blank page.**
- The Piscina Mirabilis is *"four rows of twelve cruciform pillars per row"* dividing the interior into *"five long naves and thirteen courtyards"* under *"a barrel vaulted ceiling"*, 72 × 25 m, 12,600 m³, built to hold aqueduct water. ``
- **Place-rules work** *[Setting — `03-physical-law`, this domain]*: the short sightline is load-bearing for endlessness, so **whatever you rule about the hour and the sky may not produce a long view out of the place** — no vantage, no clear horizon over the works, no elevated overlook. Second item, offered rather than decided: this ruling puts depths 2 and 3 inside vaulted structures, which raises a light question I do not own. The architecture answers it — a cistern's vault is pierced to draw water through `` — and that is handed to you and to Art, not settled here, because the…

## https://github.com/Roblox/Core-Scripts/blob/master/PlayerScripts/StarterPlayerScripts_NewStructure/RobloxPlayerScript/ControlScript/TouchJump.lua

*Cited by 3: `ui-ux/hud/01-persistent-surface-composition`, `ui-ux/platform/01-device-viewport-rules`, `ui-ux/platform/_lead`*

- *`noticeStack`: accepted, with a region I derived rather than left to a builder.** On the 896×414 phone viewport the thumbstick capture frame is `x ∈ [0, 0.4], y ∈ [0.333, 1]` ``, `jumpSmall` is `x ∈ [0.894, 0.972], y ∈ [0.783, 0.952]` ``, and both top clusters are bounded by `viewport.classes.phone.pressableMaxWidthScale` 0.20. **`x ∈ [0.24, 0.76], y ∈ [0, 0.30]` is disjoint from all four keepouts and from both top clusters**; 0.30 × 414 = 124 px holds two plates and a gap. `[cid: decided]` on the rect.
- *The class boundary and the touch floor are the same number, so only one of them can be wrong.** The platform computes `minAxis = min(parent.AbsoluteSize.X, parent.AbsoluteSize.Y)`, `isSmallScreen = minAxis <= 500`, `jumpButtonSize = isSmallScreen and 70 or 120` ``. Classifying on that predicate makes a class's floor exactly the button the platform will draw. `input.pressable.minTouchTargetRule` names a measurement, `[brief: binding]` in effect via R-1, and `measurePlatformControls` already reads the live button `` — so **70 and 120 are the fallback and the check, never the runtime value.**…
- Jump button geometry. `minAxis = min(parent.AbsoluteSize.X, parent.AbsoluteSize.Y)`; `isSmallScreen = minAxis <= 500`; `jumpButtonSize = isSmallScreen and 70 or 120`; position `UDim2.new(1, -(size*1.5-10), 1, -size-20)` small, `UDim2.new(1, -(size*1.5-10), 1, -size*1.75)` large. Derived rects: small → `x ∈ [W-95, W-25]`, `y ∈ [H-90, H-20]`; large → `x ∈ [W-170, W-50]`, `y ∈ [H-210, H-90]`. ``

## https://github.com/Roblox/Core-Scripts/blob/master/PlayerScripts/StarterPlayerScripts/ControlScript/MasterControl/DynamicThumbstick.lua

*Cited by 3: `ui-ux/hud/01-persistent-surface-composition`, `ui-ux/platform/01-device-viewport-rules`, `ui-ux/platform/_lead`*

- *`noticeStack`: accepted, with a region I derived rather than left to a builder.** On the 896×414 phone viewport the thumbstick capture frame is `x ∈ [0, 0.4], y ∈ [0.333, 1]` ``, `jumpSmall` is `x ∈ [0.894, 0.972], y ∈ [0.783, 0.952]` ``, and both top clusters are bounded by `viewport.classes.phone.pressableMaxWidthScale` 0.20. **`x ∈ [0.24, 0.76], y ∈ [0, 0.30]` is disjoint from all four keepouts and from both top clusters**; 0.30 × 414 = 124 px holds two plates and a gap. `[cid: decided]` on the rect.
- *Orientation was unstated anywhere in the brief and changes the answer completely.** The dynamic thumbstick captures **left 40% × bottom two-thirds** in landscape and **full width × bottom 40%** in portrait ``, and the legacy `Thumbstick`, `DPad` and `Thumbpad` modes are gone, so that is the region that actually exists ``. Portrait swallows the whole bottom band and both bottom clusters with it. I rule landscape `[cid: decided]`: it is what `ui-forge` calibrates against (`cli.mjs:42-46`) and the orientation in which the right half is free. Portrait keepouts ship anyway, because a client…
- Dynamic thumbstick capture frame — landscape `Size (0.4, 0, 2/3, 0)` at `Position (0, 0, 1/3, 0)`; portrait `Size (1, 0, 0.4, 0)` at `Position (0, 0, 0.6, 0)`. The frame layout does not vary with screen size; only the drawn thumbstick art does. ``

## https://github.com/Roblox/creator-docs/blob/main/content/en-us/performance-optimization/identify.md

*Cited by 3: `tech/networking/01-snapshot-wire-form`, `tech/performance/02-server-frame-cost`, `tech/performance/_lead`*

- *The rate is Performance's, the cost is mine.** The server heartbeat is capped at 60 Hz `` and `task.wait` resumes on the next Heartbeat ``, so `Clearing.luau`'s `task.wait(Config.ClearTickRate)` realises `ceil(d × 60) / 60` ``. I cost the realised periods — 0.1333 s and 0.05 s — and state no tick preference. Balance's requested 0.04 is cited from an unreleased stage and is named by its realised value, never by its requested one.
- *The quantisation rule first, because every figure in circulation ignores it.** Server heartbeat is capped at 60 FPS ``, and `task.wait` *"yields the current thread until the given duration (in seconds) elapses and then resumes the thread on the next Heartbeat step"* ``. `Clearing.luau:485` drives the loop with `task.wait(Config.ClearTickRate)`, so the realised period is **`ceil(d × 60) / 60`** and the only reachable periods are integer multiples of 16.67 ms. **0.12 → 0.1333 s. 0.04 → 0.05 s. Nothing between 0.0334 and 0.05 is reachable at all**, because 2 frames is 0.0333 and 3 frames is…
- `https://github.com/Roblox/creator-docs/blob/main/content/en-us/performance-optimization/identify.md` — *"Server heartbeat is capped at 60 FPS for all games, so lower values might indicate a performance issue."* Plus the Server Jobs / MicroProfiler reading method and the 16.67 ms frame. **This is the load-bearing source for sheet 02.**

## https://github.com/Roblox/creator-docs/blob/main/content/en-us/production/analytics/analytics-dashboard.md

*Cited by 3: `analytics/economy/03-what-this-economy-cannot-report`, `analytics/economy/_lead`, `analytics/kpis/01-kpi-admission-rule`*

- *The half that is not about this game.** The creator dashboard supplies revenue, paying users, ARPPU, ARPDAU and conversion rate — *"percent of daily active users who are also paying users"* — with **no game-side instrumentation at all** ``. So the dormancy is not an instrumentation gap; there is nothing to instrument. It is gated instead: *"Any game with more than 10 daily active users (DAU) and 10 play hours for 7 consecutive days is eligible for accessing all KPIs on the dashboard"* ``. **A project whose stated success is *"shipped artifacts, not players"* `[brief: binding]` ← `[you…
- **The monetization half, from the platform side.** Revenue split by developer products and passes, conversion rate (*"Percent of daily active users who are also paying users"*), paying users, ARPPU and ARPDAU are all supplied with **no game-side instrumentation** `` — and gated: *"Any game with more than 10 daily active users (DAU) and 10 play hours for 7 consecutive days is eligible for accessing all KPIs on the dashboard"*, with sales-data files updated every 48 hours. ``
- *`K2` exists because the standard shortlist reads zero here structurally, not empirically.** Every `products.items[].gamePassId` is `null`, so `UserOwnsGamePassAsync` cannot return true; ARPDAU, payer share and conversion rate are constants no play moves. The platform will not show them below 10 DAU and 10 play hours for seven consecutive days ``, which a project whose success is artifacts may never clear. A shortlist reading zero forever tells nobody anything, and a reviewer cannot tell refusal from omission unless refusal is a rule. `[cid: decided]` — the brief states no pass mark for any…

## https://investgame.net/news/pdf/the-2025-roblox-benchmark-report/

*Cited by 3: `analytics/engagement/03-retention-readout`, `analytics/engagement/_lead`, `analytics/kpis/_lead`*

- *External context, deliberately not a target.** The 2025 Roblox Benchmark Report buckets experiences by average session length (0–3, 4–6, 7–12, 13–18, 19–24, 25+ minutes) and reports D1/D7/D30 by bucket, on a GameAnalytics-network sample stated as about 47% of total Roblox engagement ``. **The brief's 10-to-20-minute band straddles two populated buckets** — its mass in 13–18 and 19–24, its lower edge clipping 7–12 — which is the whole of what the source settles: `pacing.sessionBandSeconds` is not an implausible band. **Two caveats that must not be laundered away.** The figures were read…
- **The 2025 Roblox Benchmark Report's session-length interval table** — the item `cid/gameplay/balance/_lead.md` records as `[research owed:]` and says *"nothing here cites it."* It buckets experiences by average session length (0–3, 4–6, 7–12, 13–18, 19–24, 25+ minutes) and reports sessions-per-day and D1/D7/D30 by bucket, on a GameAnalytics-network sample stated as ~47% of total Roblox engagement. **The brief's 10-to-20-minute band straddles two populated buckets, so `pacing.sessionBandSeconds` is not an implausible band** — that is the whole of what this source settles, and it settles it…
- **D1 / D7 / D30 as targets.** *"Beating the genre's retention curve. Offered and declined"* `[brief: binding]`. They arrive from the platform's Retention page for free `` and may be *recorded*; a target would make a declined goal into an objective. The external evidence also makes them redundant here: retention rises with session length across every tier ``, and session length is already row 1.
- **A research-owed item another domain flagged, now closed enough to cite.** `balance/_lead` carries `[research owed: the 2025 Roblox Benchmark Report's session-length interval table]` and says *"nothing here cites it."* The report bands sessions at 0–3, 4–6, 7–12, 13–18, 19–24 and 25+ minutes, with D1 medians rising across those tiers (~4% at 0–3, ~8% at 7–12, ~10% at 13–18, double digits at 19–24). `` The brief's 10–20 minute band and `pacing`'s 1,094 s whole-game figure both sit in the 13–18/19–24 tiers. **Caveat, stated rather than hidden:** the page I reached is a report summary, not…

## https://raw.githubusercontent.com/Roblox/Core-Scripts/master/CoreScriptsRoot/CoreScripts/NotificationScript2.lua

*Cited by 3: `ui-ux/feedback/01-the-notice-channel`, `ui-ux/feedback/03-system-notices`, `ui-ux/feedback/_lead`*

- *A correction to my own domain index, worth making because a builder would otherwise cite the wrong source.** WCAG SC 2.2.2 governs *"any moving, blinking or scrolling information"* that lasts more than five seconds ``. A static plate is outside its scope entirely, so 2.2.2 does not set my dwell. What it does settle is the **motion** ruling: `response` `R5`–`R6` forbid providing a pause or dismiss control, so a moving notice would breach 2.2.2 with no legal remedy available — which is why `motion.animated` is false rather than merely discouraged. The 5.0 s ceiling itself is the platform's…
- `[playtest unknown]`, test range 4.0–8.0 s. It sits at the platform's own `DEFAULT_NOTIFICATION_DURATION` `` and above both beat notices because it is the only string in the game carrying information a player cannot re-derive from the screen. It **fires once** and never repeats: a message repeated every 45 seconds is nagging, and `theme/tone/04` `D6` already bars anything that blinks or pulses for the same reason. It is not louder, larger or animated — sheet `01`'s `motion` block applies unchanged.
- `` — the platform's own notification system: `MAX_NOTIFICATIONS = 3`, `DEFAULT_NOTIFICATION_DURATION = 5`, and an active queue plus an overflow queue that promotes on expiry. A shipped precedent for 02's concurrency question, and evidence that "5 seconds" is the platform's default rather than my invention ``.

## https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/cloud-services/data-stores/error-codes-and-limits.md

*Cited by 3: `tech/persistence/01-the-save-write`, `tech/persistence/02-session-locking`, `tech/persistence/_lead`*

- **The error-code split is the documented one.** 301–306 are queue throttle and 501–505 transient, so both retry; 101–107 and 509–513 are validation and permission failures and never retry ``. I classify 401–404 as **never retry**: my domain index summarises them as "internal/transient", but their numbering neighbours are serialisation failures and a retried serialisation failure burns three requests per save forever. The payload is scalars, string-keyed booleans and integers, so 4xx is unreachable either way. `[research owed: the literal text of codes 401–404 on the error-codes-and-limits…
- **Inside the payload, not beside it, and the arithmetic is why.** A separate lock key makes release a second write: 16 saves plus 16 releases is **32 requests against a 30-request queue** at shutdown, and the queue drops everything past 30 with a 30x error ``. Folding release into the save write is not a style preference; it is the difference between 16 and 32 against a hard 30.
- `https://create.roblox.com/docs/cloud-services/data-stores/error-codes-and-limits` and its source `https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/cloud-services/data-stores/error-codes-and-limits.md` — fetched separately and cross-checked; the numbers agree. Server-level standard per minute: read `60 + numPlayers × 40`, write `60 + numPlayers × 40`, list `5 + numPlayers × 2`, remove `60 + numPlayers × 40`. Experience-level per minute: read `300 + concurrentUsers × 40`, write `300 + concurrentUsers × 20`, list `300 + concurrentUsers × 2`, remove `300 +…

## https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/production/analytics/analytics-dashboard.md

*Cited by 3: `analytics/events/01-event-catalog`, `analytics/events/02-never-logged`, `analytics/events/_lead`*

- **Device, OS and age group get no field**, because the dashboard breaks every default metric down by *Age Group, Platform, OS, Gender, Source, country, language* with no developer event ``.
- **`N22` is the row most likely to be broken by good intentions.** Device is the most natural breakdown in the catalog and the brief's `~70/25/5` split is a prediction with no source, so the urge to spend a field on it is strong. The dashboard already breaks every default metric down by *Age Group, Platform, OS, Gender, Source, country, language* ``, and the catalog has exactly three field slots, all spent. Spending one here would buy nothing and cost the `detail` slot on every event.
- Default dashboard metrics and breakdowns `` — retention KPIs and average session time by default; breakdowns by *Age Group, Platform, OS, Gender, Source, country, language, when first played, active payer status*. **Consequence: device split, age segmentation, retention and session time need zero game-defined events.**

## https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/production/analytics/event-types.md

*Cited by 3: `analytics/funnels/01-onboarding-funnel`, `analytics/funnels/04-drop-off-thresholds`, `analytics/funnels/_lead`*

- *Three custom fields, and device is deliberately not one of them.** The platform allows exactly three, keyed only as `CustomField01/02/03` ``, with 8,000 combined values before the rest group as `Other` ``. The brief's `~70/25/5` device split is the wrong spend twice over: events *"can only be sent from the server and in published games"* `` and no server-side observable of device exists inside a seven-channel protocol; and the Creator Dashboard already breaks every metric down by Platform and OS with no developer event ``. Field 2 adopts `telemetry`'s `owned ["none","span"]` verbatim.
- *The minimum sample is a real gate and my first statement of it was false.** I claimed the smallest pass-to-alarm gap was 10 points; `T1`'s was 0.5. The fix was not a bigger sample but the right shape: a join that produces no spawn, and an ownership boolean true against a null id, are **build defects, not player rates**, so both are count invariants read at n = 1. Every rate row now carries a gap of at least 10 points. At n = 200 the binomial standard error is `sqrt(p(1−p)/200)`, giving a 95% interval of about ±5 points at p ≈ 0.85, ±4 at 0.90 and ±3 at 0.95, so **every rate row is…
- 1. **The measurement default names a subject and states no unit, no population and no pass mark.** `OPEN.md §2` item (1), `[I assumed]`, at 0 interview questions (`OPEN.md §5` row 8, *"batched by design"*). `onboarding/02` closed the two units and two populations for the ceilings and nothing else. → **01** for populations and origins across the rest of the ladder; **04** for every pass mark. 2. **Nothing in the brief or in any approved sheet says what a drop-off *means* in a game with no failure state, or what may be done about one.** Retention is a declined goal, so the obvious response to…
- *The platform limits, which are hard ceilings on anything this domain specs:** *"Total `AnalyticsService` requests per minute: 120 + (20 * CCU)"*; 10 funnels; 100 steps per funnel; 3 custom fields per event; 8,000 unique value combinations across them, *"grouped as 'Other' after"*; 100 custom event names; and *"Events remain visible on the Creator Dashboard and automatically expire after 90 days from last data received"* ``. The 10-funnel cardinality is *"on a daily basis"* and an over-limit event *"will succeed but those that exceed the limit will be dropped and will not be shown"* ``.…

## https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/reference/engine/classes/SoundService.yaml

*Cited by 3: `audio/mix/_lead`, `audio/stingers/01-the-three-payoff-cues`, `audio/ui/_lead`*

- `SoundService` defaults: `RolloffScale` 1, `DistanceFactor` 3.33, `DopplerScale` 1, `AmbientReverb` `NoReverb`, `VolumetricAudio` `Automatic`, `RespectFilteringEnabled` false, `ReverbEnabled` true, `OcclusionEnabled` true, `DiffractionEnabled` true `` ``.
- *`[cid: decided]` all three are global**: a `Sound` parented to `SoundService`, played on the client that received the beat's packet and heard by that player alone. Parenting is the whole of the ruling — *"within `SoundService` or `Workspace`. Audio emits throughout the game. Volume and pan position remain the same regardless of the user's sound listener position or rotation"* ``, while a child of a `BasePart` or `Attachment` is positional and Doppler-shifted ``. Three reasons, one per cue. `areaComplete` is forbidden the `atPatch` channel outright and an area is not a point, so a…
- `SoundService:PlayLocalSound` — *"Plays a copy of a Sound locally. The Sound will only be heard by the client calling this method, regardless of where it's parented to."* `` → an interface cue needs no world position and no attenuation; the roll-off consequence is `mix`'s.

## https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/reference/engine/enums/RollOffMode.yaml

*Cited by 3: `audio/mix/02-degradation-under-load`, `audio/mix/_lead`, `audio/sfx/03-the-sfx-key`*

- *The engine default never culls anything, and that single fact is why this sheet exists.** `RollOffMode.Inverse` is the default and attenuates as `RollOffMinDistance/distance`, **not using `RollOffMaxDistance` at all**; only `Linear`, `LinearSquare` and `InverseTapered` attenuate *between* min and max ``. At defaults every voice inside a 512-stud streamed set stays in the mix forever, so the concurrency budget would have to absorb the whole worst case rather than a fraction of it.
- `RollOffMode`: `Inverse` (0) attenuates as `RollOffMinDistance/distance` and **does not use `RollOffMaxDistance`**; `Linear` (1) and `LinearSquare` (2) attenuate *between* min and max; `InverseTapered` (3) is the lesser of the two ``. **This is the load-bearing one for the cap:** at the engine default nothing is ever culled by distance.
- **Roll-off and level are both requirements here, and neither carries a value.** `RollOffMode` defaults to `Inverse`, which *"does not use `RollOffMaxDistance`"* and therefore never culls a voice ``, and `RollOffMinDistance` defaults to 10 while a neighbour's nearest clearing patch is about **5 studs** across the shared lane edge — so at engine defaults a neighbour's clear is at full volume and louder than your own. **I set no curve and no level.** I require a mode that honours `RollOffMaxDistance`, a `RollOffMinDistance` at or below 2 studs, inaudibility by the 122-stud plot pitch, a level…

## https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/ui/appearance-modifiers.md

*Cited by 3: `art/ui-art/02-surface-and-ornament`, `art/ui-art/06-ui-motion`, `art/ui-art/_lead`*

- *The one real increment available without an asset, taken.** `applyStroke` writes `Color`, `Thickness` and `Transparency` and nothing else (`UIBuilder.luau:118-130`), while the platform offers `LineJoinMode` Round/Bevel/Miter on a `UIStroke` and permits a `UIGradient` child on the stroke itself ``. **I take `lineJoinMode` (`A5`) and refuse the stroke gradient.** A miter join is one enum with a visible effect at radii of 2 to 7 px, which is where this archetype lives; a gradient on a 1 to 4 px edge is a second gradient system nobody can see at 70 px on a phone, and `gradientStrength` already…
- *The zeros are the substance of this sheet.** `theme/tone/04` `D6` bans any pulsing or blinking element; `theme/tone/03` `B5` fixes exactly one intensity forever with *"no crescendo near completion"*; `firstSession` `S6`/`S7` make a lift silent and still and `suppressionForbidden` bans reflow; `screens/01`'s `forbiddenNodes` already names `fillAnimation`, `liftAnimation`, `tween`, `pulse` and `blink`; `notices.motion.animated` is `false`. None of that is re-derived below. What the table adds is the emitter-level mechanisms those rules do not name, which are the ones a builder reaches for:…
- `https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/ui/appearance-modifiers.md` — `UIStroke` on a `Frame` is a border with `LineJoinMode` Round/Bevel/Miter; on a `TextLabel` `ApplyStrokeMode` Contextual outlines the glyphs and Border the bounds, and two `UIStroke`s may be parented to control both; *"Both the parent object and `UIStroke` can have child `UIGradient` instances, letting you set gradients on the stroke and fill independently"*; `UICorner` at *"a scale of 0.5 or higher deforms the parent into a pill shape"*; and the warning *"Avoid tweening the `Thickness`…

## https://robloxapi.github.io/ref-temp/enum/Material.html

*Cited by 3: `art/environment/01-world-part-budget`, `art/environment/03-groundwork-and-channels`, `art/style/_lead`*

- **Weathering with zero uploaded assets.** `MaterialVariant` and `SurfaceAppearance` both require an uploaded texture; built-in base materials require none, their *"texture assets are bundled with Studio"* ``, and `Limestone` and `Cobblestone` are base materials valid on a `BasePart` ``. So `P7` weathering is carried by the material choice and by nothing else. Stain overlays, patina parts and softened arrises are **not depicted**, and that is an accepted loss, not an omission: each would cost an uploaded image against `uploadedImageAssetsInWorldGeometry` 0 and `N17`, or a second tuple…
- **Why `Cobblestone` and not `Slate`.** `theme/setting/01` forbids grey granite, white marble, red brick and dark basalt and requires *"warm pale limestone, dressed and weathered"*; the same sheet makes *"pattern in paving"* one of the four permitted ornament channels. `Cobblestone` is a base material applicable to a `BasePart` and carries a bundled tileable pattern at **zero uploaded assets** ``, ``. `Slate` supplies neither the warmth nor the dressed-joint pattern and is the material a builder chose because no key stated one.

## https://www.roblox.com/games/87179205054038/reStore

*Cited by 3: `theme/fantasy/_lead`, `theme/vocabulary/02-banned-words`, `theme/vocabulary/_lead`*

- **Substitutes were checked and are also occupied.** `artifact` is a shipping Roblox title with *"70+ artifacts to collect"*; `antique` belongs to `reStore`.

## https://www.rolimons.com/game/126244816328678

*Cited by 3: `gameplay/monetization/01-the-offer-ladder`, `gameplay/monetization/_lead`, `theme/fantasy/_lead`*

- *499, restated without the ladder-ratio clause it no longer has.** 499 is the top of the corroborated premium band and the observed ceiling of both Faith and DIG `` `` ``. The two single-item comparables sit above it — Carpet Cleaning at 1,499, and the reference's own oversized tool at 2,500 `` — and both bands were declined on `00-CORE.md` grounds, because the only argument either source gives for them is revenue concentration. `[cid: decided]`
- **`DIG`**, the closest shipping collection-shaped game (a 601-item logbook, 56,047,649 visits), ships **6 passes and no impulse rung at all**: 99 (Car Materials), 249 (Sell Anywhere), 249 (Double XP), 299 (Appraisers Luck), 349 (Shovel Club), 499 (Spawn Vehicle Anywhere). **Floor 99.** ``
- **DIG** (DIG Development, 28 June 2025): *"Uncover and collect hidden treasures, explore a massive open world..."* **56,030,218 visits, 89.3% likes (101,475 up / 12,115 down), all-time peak 119,871 CCU.** Its Collection is *"a detailed in-game logbook"* of 601 items, and **completing a zone unlocks Mounts** — structurally the brief's set-completion bonus. `` `` ``

## https://www.rolimons.com/gamebadge/1768992749628648

*Cited by 3: `gameplay/meta/04-the-depth-ladder`, `gameplay/meta/07-after-the-last-find`, `gameplay/meta/_lead`*

- **The measured genre asymmetry says even that is thin, and it is why I take the largest legal area count rather than the smallest.** DIG ships two islands against a 601-item logbook ``, and finishing one *area's* journal there is a 0.4% event across 60,426 and 78,433 earners `` ``. Few areas, a very large collection, and completion is rare. This game is on the wrong side of that on both axes and the partition equality only lets me fix one. See `## Flagged to the developer`.
- `[playtest unknown]` **Whether a player reaches the terminal state at all.** In the one shipping comparison available, finishing a single *area's* collection is a 0.4% event ``, so this sheet may govern a state almost nobody sees. It is still the state three approved sheets route here, and it costs one predicate guard and no content.
- **Finishing one area's collection is a 0.4% event in a shipping game.** DIG's badge "Journal Complete: Cinder Shores" — "You have discovered 100% of the items in Cinder Shores!" — has 60,426 earners at a 0.4% win rate, and "Journal Complete: Mount Cinder" has 78,433 at 0.4%. These are per-*area* completions, not the full 601-item index.

## https://www.spaceport.xyz/blog/how-to-hook-players-in-the-first-2-minutes-game-retention-tips-for-roblox-devs

*Cited by 3: `gameplay/onboarding/02-first-minute-beats`, `gameplay/onboarding/03-teaching-order`, `gameplay/onboarding/_lead`*

- *In wall-clock seconds the reference is unmeasured**, so no number here is sourced from it. `[research owed: a timestamped capture of the first 120 seconds of Roblox place 133086043677134 — time to first currency and to first upgrade. Three source types returned HTTP 405; a transcript API or a stopwatch would settle it.]` Roblox's FTUE guidance **states no time threshold at all** ``; the brief's ten-second window, chosen without a source, is independently corroborated ``.
- *Teaching is visual because nothing else is left.** Roblox's FTUE guidance offers a guided arrow as an alternative to dialogue `` and both are closed here — an arrow is row `T3`, dialogue needs a speaker and no entity class exists `[cid: decided — theme/identity/04]`. Advice to show a mechanic visually and reinforce it repeatedly before assuming it landed `` meets one recurring event here — the patch clear — which is why rank 1 is the only required rank.
- "The most decisive moment in a player's journey is the first 10 seconds" and "50% of your traffic is gone within the first two minutes", with advice to show mechanics visually rather than in text and to reinforce a new mechanic at least three times with rewards before assuming it landed. The ten-second figure independently corroborates the brief's own choice of window, which was made without a source ``

## https://about.roblox.com/newsroom/2026/02/moving-beyond-self-reported-age

*Cited by 2: `theme/tone/01-register`, `theme/tone/_lead`*

- *Reading level serves the bottom of the band, not the middle.** Ages 8–11 map to grade 3–6 and 11–14 to grade 6–9, and the general-public default of 8 sits at the *top* of the band ``. The band is binding `[brief: binding]` ← `[you chose: R1 Q4]` (`00-CORE.md`). A 13-year-old loses nothing reading grade-5 copy; an 8-year-old who cannot parse grade-8 copy loses the string entirely, and 35% of age-checked daily users are under 13 ``. Target 5.0, ceiling 6.0 `[playtest unknown]`, test range 4 to 8.
- *The age band, sourced.** The band 8–14 straddles the platform's two largest cohorts: among age-checked daily active users, *"35% are younger than 13, 38% are age 13 to 17, and 27% are 18 or older"*, averaged over the seven days ended 31 January 2026 across the 45% of 144M DAU then age-verified. Primary source, not an aggregator. ``

## https://beebom.com/roblox-dig-locations/

*Cited by 2: `gameplay/meta/04-the-depth-ladder`, `gameplay/meta/_lead`*

- **Passage: one condition, and it is a strike on an approved sheet rather than an absence.** `core-loop/04` ("enterable at the instant one completes, with no threshold, no cooldown and no travel worth measuring") and `core-loop/05` ("nothing may gate depth on throughput") both hold under `previousAreaComplete`: it is not a threshold, not a cooldown, not a purchase and not a throughput test, and an under-buying player is never refused. What it *is* is a condition on an opening, which `theme/setting/04` W5 sets at zero. **DIG's 50%-of-the-journal ferry unlock** `` **is a live shipping…
- **DIG gates its second island on collection completion, not on power.** "Once you complete 50% of the Cinder Island journal, you'll unlock access to the NPC at the ferry dock… he'll offer you a ferry ticket after asking about your progress." A shipping game in the collection genre uses *fraction of the index* as the unlock, which is a live alternative for sheet `04`'s gating question and is not the one `setting/04` W5 took.

## https://create.roblox.com/docs/cloud-services/data-stores

*Cited by 2: `tech/persistence/01-the-save-write`, `tech/persistence/_lead`*

- **`UpdateAsync` for both directions.** Roblox states `SetAsync` "can cause data inconsistency if two servers try to set the same key at the same time" and recommends `UpdateAsync` "to handle multi-server attempts" ``. It is also the only API whose transform can inspect the stored lock in the same request, which is what makes `sessionLock` cost zero extra requests. **If `sessionLock.enabled` were false the read would be `GetAsync`** — the one place my two keys join, stated rather than discovered.
- `https://create.roblox.com/docs/cloud-services/data-stores` — "The values you retrieve using `GetAsync()` sometimes can be out of sync with the backend due to the caching behavior", and the `SetAsync` vs `UpdateAsync` multi-server recommendation quoted in sheet 01's row.

## https://create.roblox.com/docs/production/analytics/economy-events

*Cited by 2: `analytics/economy/01-currency-flow-and-holdings`, `analytics/economy/_lead`*

- *A window never straddles an area, a short window is a different `itemSku`, and both records use `transactionType: Gameplay`.** The two SKUs `patch-clear` / `patch-clear-partial` make every full window known to be exactly `N` patches at zero custom-field cost, and a missing `itemSku` displays as N/A. `Shop` would assert a store that does not exist — `products.storeExists` is `false` under ruling R-4 and `promptGamePassPurchaseCalls` is `0` — and with `economy.faucetCount` 1 against `economy.sinkCount` 1 the transaction-type breakdown separates nothing `flowType` and the SKU do not ``.
- *The balance series costs nothing extra.** `endingBalance` rides in the same call as `amount`, which is why the flow record and the currency-held series are one decision and not two, and the dashboard already charts **average wallet balance** ``. A second, zero-instrumentation route exists: `currency` is one of the seven persisted fields `` and a standard data store's entries are listable through Open Cloud ``.
- **The economy schema and its limits.** `Enum.AnalyticsEconomyFlowType` is `Source` / `Sink`; the default `Enum.AnalyticsEconomyTransactionType` values are `IAP`, `TimedReward`, `Onboarding`, `Shop`, `Gameplay`, `ContextualPurchase`. The dashboard shows total sources and sinks by category, **average wallet balance**, top sources and sinks, and all sources and sinks by date range. Up to five currencies; up to three custom-field breakdowns; **events send only from the server and only in a published game — not from the client and not from Studio**; a missing `itemSku` displays as N/A; `amount`…

## https://create.roblox.com/docs/production/analytics/retention

*Cited by 2: `analytics/engagement/03-retention-readout`, `analytics/engagement/_lead`*

- *Zero game-defined events, verified rather than assumed.** D1/D7/D30 arrive from the Retention page with daily and weekly cohorts and no developer setup ``, broken down by acquisition source and comparable against a selectable benchmark set covering average playtime and D1/D7/D30 ``, with the standard filter dimensions available ``. **This half of the domain asks logging-pipeline work for nothing at all.**
- Roblox creator-docs, retention — D1/D7/D30 definitions verbatim, daily and weekly cohorts, and the statement that the core metrics require no developer setup. ``

## https://create.roblox.com/docs/production/monetization/developer-products

*Cited by 2: `gameplay/monetization/02-what-is-never-sold`, `gameplay/monetization/_lead`*

- *`F5`, developer products.** Nothing here is repeatable — `gameplay/systems/06` allows at most one instance per product id — and the platform reserves developer products for "an item or ability that a user can purchase more than once", directing anything bought once to a pass ``. **This row is decided on structure, not on a market observation:** no developer-product price point was obtained anywhere in the genre, so nothing here should be read as "the genre avoids them". `[research owed: a live developer-product price list from any shipping game in the X Incremental or cleaning-restoration…
- **And the platform closes developer products for this game in one sentence too.** A developer product is "an item or ability that a user can purchase more than once, such as in-game currency, ammo, or potions", handled by `PromptProductPurchase` and a `ProcessReceipt` callback, and the docs state that for "items or abilities that a user should only purchase once" you should use passes instead. Nothing this game may legally sell is repeatable. ``

## https://create.roblox.com/docs/production/publishing/adaptive-design

*Cited by 2: `ui-ux/platform/01-device-viewport-rules`, `ui-ux/platform/_lead`*

- *Nothing rests on the 70/25/5 split.** It is `[brief: soft]` and uncorroborated; every rule here is per class and none is weighted by share. The *band* — *"8–14, mobile-heavy, short sessions"* `[brief: binding]` (`00-CORE.md`) — is what the floors serve. `[research owed: the experience's own Creator Dashboard platform breakdown, which cannot exist before launch]` Roblox publishes no minimum touch-target figure: `adaptive-design` and `console-guidelines` carry principles only `` ``. That is why the rule names a measurement, and why the two classes with nothing to measure need the ruling…
- **Roblox publishes no minimum touch-target pixel figure.** `create.roblox.com/docs/production/ publishing/adaptive-design` was fetched and carries principles only, no numbers. The console guidelines page likewise gives no TV-safe percentage and no minimum text size. This is *why* `minTouchTargetRule` names a measurement, and it vindicates that choice. `` ``

## https://create.roblox.com/docs/production/publishing/console-guidelines

*Cited by 2: `ui-ux/platform/01-device-viewport-rules`, `ui-ux/platform/_lead`*

- *Nothing rests on the 70/25/5 split.** It is `[brief: soft]` and uncorroborated; every rule here is per class and none is weighted by share. The *band* — *"8–14, mobile-heavy, short sessions"* `[brief: binding]` (`00-CORE.md`) — is what the floors serve. `[research owed: the experience's own Creator Dashboard platform breakdown, which cannot exist before launch]` Roblox publishes no minimum touch-target figure: `adaptive-design` and `console-guidelines` carry principles only `` ``. That is why the rule names a measurement, and why the two classes with nothing to measure need the ruling…
- **Roblox publishes no minimum touch-target pixel figure.** `create.roblox.com/docs/production/ publishing/adaptive-design` was fetched and carries principles only, no numbers. The console guidelines page likewise gives no TV-safe percentage and no minimum text size. This is *why* `minTouchTargetRule` names a measurement, and it vindicates that choice. `` ``

## https://create.roblox.com/docs/reference/engine/classes/CaptureService

*Cited by 2: `art/lighting/02-the-readability-floor`, `art/lighting/_lead`*

- *The static gate has to stand alone, because the rendered one may never run.** An in-engine screenshot-to-pixel route is blocked: `CaptureService` is client-only, gated on the Capture capability, and returns ids that are *"temporary and must be uploaded or saved to persist"* ``; `EditableImage` does expose `ReadPixelsBuffer` at 4 bytes RGBA ``, but the only creation path is `AssetService:CreateEditableImageAsync`, which a secondary source reports will not accept an `rbxtemp://` id and is restricted to creator-owned assets — **`[unverified]`, and load-bearing** `[research owed: the…

## https://create.roblox.com/docs/reference/engine/classes/DataModel

*Cited by 2: `tech/deploy/01-the-release-contract`, `tech/deploy/_lead`*

- *Version needs both halves because neither derives from the other.** The publish returns `versionNumber` ``; `game.PlaceVersion` returns it live and `0` in Studio `` ``. The emit runs *before* the publish, and nothing writes a stamp into the place file — so both, joined by a ledger. The stamp reaches the build for free once `release` is promoted, with no emitter change ``.

## https://create.roblox.com/docs/reference/engine/classes/EditableImage

*Cited by 2: `art/lighting/02-the-readability-floor`, `art/lighting/_lead`*

- *The static gate has to stand alone, because the rendered one may never run.** An in-engine screenshot-to-pixel route is blocked: `CaptureService` is client-only, gated on the Capture capability, and returns ids that are *"temporary and must be uploaded or saved to persist"* ``; `EditableImage` does expose `ReadPixelsBuffer` at 4 bytes RGBA ``, but the only creation path is `AssetService:CreateEditableImageAsync`, which a secondary source reports will not accept an `rbxtemp://` id and is restricted to creator-owned assets — **`[unverified]`, and load-bearing** `[research owed: the…

## https://create.roblox.com/docs/reference/engine/classes/ImageLabel

*Cited by 2: `art/objects/04-what-a-find-is-made-of`, `art/objects/_lead`*

- **An icon is an uploaded asset.** `ImageLabel.Image` is typed `ContentId` and every documented sample is `rbxassetid://…` ``. **`[unverified]` as a quotation** — the page states no requirement in words; it is settled as practice, and the settling fetch is `create.roblox.com/docs/ui/labels`. Twenty-four uploads contradict `representation`'s *"no asset needs to be produced to build this game"* and block the build, against *"content design is the primary creative work on this project, **not art**"* `[brief: binding]`, `00-CORE.md`.
- **An icon is an uploaded asset.** `ImageLabel.Image` is typed `ContentId` and every documented sample is `rbxassetid://…` `` — the page states no requirement in words, so this is `[unverified]` as a quotation and settled as practice. 24 of them contradicts `representation`'s *"no asset needs to be produced to build this game"* and blocks the build on 24 uploads, against a `[brief: binding]` line saying art is not this project's primary work.
- `` — `Image` is typed `ContentId` and the documented samples are `rbxassetid://…`. **`[unverified]` as a quotation:** the page states no requirement in words. The settling fetch is `raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/reference/engine/classes/ImageLabel.yaml` for the property description, or `create.roblox.com/docs/ui/labels`.

## https://create.roblox.com/docs/reference/engine/classes/Lighting

*Cited by 2: `art/lighting/01-the-one-daylight-state`, `art/lighting/_lead`*

- *Thirteen properties were at defaults nobody chose, and the platform documents no defaults.** The API reference lists types, not values ``, so *"leave it at the default"* is not a statable value and every row below is absolute. `[cid: decided]` on all thirteen; the brief contains no hour, sky, light or shadow anywhere in eight sheets, which `theme/setting/03` already flagged upward and which I do not reopen.
- 1. **Every `Lighting` property default.** The API reference page documents types, not defaults, so the thirteen unstated properties' current effective values are `[unverified]`. `01` must state its values absolutely and never as *"the default"*. → *fetch:* `https://create.roblox.com/docs/reference/engine/classes/Lighting` rendered with the property-default column, or read the defaults off a fresh baseline place in Studio. 2. **Which lighting-style value a new place gets, and the migration's status.** A search returned secondary reports (a devforum announcement thread and two Fandom mirrors)…

## https://create.roblox.com/docs/reference/engine/classes/Players#MaxPlayers

*Cited by 2: `gameplay/social/01-server-and-co-presence`, `gameplay/social/_lead`*

- *`Players.MaxPlayers` is read-only and cannot be set from a script** ``. Whatever figure lands inside the band reaches a build only through place configuration.
- `Players.MaxPlayers` is **read-only and not replicated** — it cannot be set from a script. ``

## https://create.roblox.com/docs/reference/engine/classes/TextChatService

*Cited by 2: `tech/deploy/01-the-release-contract`, `tech/deploy/_lead`*

- *Two rows have no read, differently.** Voice has none at any level: `IsVoiceEnabledForUserIdAsync` is per user, not per experience ``. `ChatVersion` is `[unverified]` — deprecated after legacy chat's removal on 30 Apr 2025, so a place created today cannot be on `LegacyChatService`, which lowers the risk without closing the row `` ``. Two settling fetches ride in the key; until then both rows stand on a human tick and one joined test client, and the row says so rather than implying an assertion exists.

## https://create.roblox.com/docs/reference/engine/classes/VoiceChatService

*Cited by 2: `tech/deploy/01-the-release-contract`, `tech/deploy/_lead`*

- *Two rows have no read, differently.** Voice has none at any level: `IsVoiceEnabledForUserIdAsync` is per user, not per experience ``. `ChatVersion` is `[unverified]` — deprecated after legacy chat's removal on 30 Apr 2025, so a place created today cannot be on `LegacyChatService`, which lowers the risk without closing the row `` ``. Two settling fetches ride in the key; until then both rows stand on a human tick and one joined test client, and the row says so rather than implying an assertion exists.

## https://create.roblox.com/docs/reference/engine/enums/LightingStyle

*Cited by 2: `art/lighting/01-the-one-daylight-state`, `art/lighting/_lead`*

- *Nobody owns the lighting-style property and the platform is mid-migration on it.** `Enum.LightingStyle` ships exactly two members, `Realistic` (0) and `Soft` (1) ``, while `Enum.Technology` now marks `Legacy` and `Unified` deprecated ``. I set `Realistic`, because `ShadowSoftness` *"only functions with Realistic lighting style"* `` and a hard shadow edge on cleared stone is a local luma trough `02`'s minimum rule catches. The migration's timeline and a new place's default are `[unverified]` secondary claims which I do not write as sourced; the key names both the new field and the…

## https://create.roblox.com/docs/reference/engine/enums/Technology

*Cited by 2: `art/lighting/01-the-one-daylight-state`, `art/lighting/_lead`*

- *Nobody owns the lighting-style property and the platform is mid-migration on it.** `Enum.LightingStyle` ships exactly two members, `Realistic` (0) and `Soft` (1) ``, while `Enum.Technology` now marks `Legacy` and `Unified` deprecated ``. I set `Realistic`, because `ShadowSoftness` *"only functions with Realistic lighting style"* `` and a hard shadow edge on cleared stone is a local luma trough `02`'s minimum rule catches. The migration's timeline and a new place's default are `[unverified]` secondary claims which I do not write as sourced; the key names both the new field and the…

## https://create.roblox.com/docs/sound/assets

*Cited by 2: `audio/ui/01-press-acknowledgment`, `audio/ui/_lead`*

- *The asset form is `mix`'s, mirrored here.** `Sound.SoundId` is a **ContentId** string ``, so `release.provisioning.unprovisionedIdValue`'s `0` does not transfer by type. The guard sits at the **play site**, not at the id, because an id that will not load errors in the console rather than failing silently ``. Uploaded audio is private and needs a per-experience grant, and the Creator Store carries free-to-use audio `` — which is why each row carries a `sourceClass` that makes the upload orderable work rather than a redesign.
- Audio assets: imported audio must be *"less than 20 MB in size and 7 minutes in duration"*; the asset privacy system *"automatically ensures that the IDs of your imported audio can't be accessed by users without proper permissions"*; the Creator Store carries free-to-use audio. `` → provisioning input for `mix`; my rows may not name an id the creator does not own.

## https://create.roblox.com/docs/ui/position-and-size

*Cited by 2: `ui-ux/hud/02-presence-and-reserved-extent`, `ui-ux/hud/_lead`*

- *Reserved extent is per group and is not boilerplate.** It is only owed where growth would move a neighbour. `currency` grows leftward from a `[1,0]` anchor into empty screen and reserves nothing; the three upgrade groups sit in one vertical stack and each reserves a full row whether or not it has lifted; `collection` reserves the width of its widest reachable string so the `/ 24` denominator lift moves nothing. `AnchorPoint` *"defines the origin point from which an object's position and size change"*, which is why the anchor decides whether a reserve is owed ``.
- `AnchorPoint` *"defines the origin point from which an object's position and size change"*, and `UDim2` scale is *"a percentage of the container's size along the corresponding axis, additive of any Offset values"* `` — the engine vocabulary a derived-position rule has to be expressed in.

## https://create.roblox.com/docs/ui/size-modifiers

*Cited by 2: `ui-ux/screens/03-text-policy`, `ui-ux/screens/_lead`*

- *The floor is 14 px at the reference resolution, and I am not pretending it is sourced.** Roblox publishes no minimum text size; the docs advise only against a `MinTextSize` below 9 ``, and 14 to 18 for mobile body text is a **practitioner recommendation, not a platform figure** ``. 14 is the bottom of that band because the surface it binds hardest, the index panel, is width-constrained by six slots across. It is `[playtest unknown]`, test range 12 to 18, settled by one `npm run render` of that screen at phone viewport with the real strings in place, which has never been run `[research…
- `` — `UITextSizeConstraint` *"specifies a minimum and maximum font size for a GuiObject with text"*, and the docs advise against `MinTextSize` below 9. `UISizeConstraint` and `UIAspectRatioConstraint` *"override the layout and control the object's size"* when combined with a layout.

## https://create.roblox.com/docs/workspace/streaming

*Cited by 2: `tech/performance/01-device-floor-and-budgets`, `tech/performance/_lead`*

- *Streaming is the one lever left and it is unowned today.** `StreamingEnabled` appears in neither contract and nowhere in `game/src`; instance streaming *"improves join times, reduces memory footprint, and increases frame rate"* ``, which is three of my four ceilings. Defaults are 64 / 1024 ``. **1024 is too wide**: at `plots.pitchStuds` 122 it reaches every lane of a 1,952-stud row, so a client loads sixteen live bays. **512 reaches four lanes either side** (488 studs) — nine lanes, 5,814 instances worst case — and still spans a whole merged bay longitudinally (480 studs). **160 is the min…
- `https://create.roblox.com/docs/workspace/streaming` — `StreamingMinRadius` default 64 studs, `StreamingTargetRadius` default 1024 studs; the four `ModelStreamingMode` values with their descriptions; `StreamingIntegrityMode` recommended `PauseOutsideLoadedArea`.

## https://devforum.roblox.com/t/analytics-for-percentile-session-length/2061715

*Cited by 2: `analytics/engagement/01-session-shape`, `analytics/engagement/_lead`*

- *Whether the dashboard exposes a full session-length distribution is `[unverified]`.** Only the average is documented, plus a P50/P90 percentile toggle on charts ``; a standing community request for percentile session length carries no staff reply ``, so the absence is **inferred from the request, not stated by Roblox**. Settling fetch: a current capture of a live Engagement page showing its complete chart list, which needs an account.
- 1. **Feature adoption rates — not assigned.** The surface is four things: three upgrade rows and one index panel (`input` is closed at five verbs and four pressables). Two of the three upgrade readings are `economyHealth`'s sink volume read from the other side, and assigning them here guarantees a collision on one number. What is left is the index panel's open rate, and it fails both stopping-rule bars: no player would notice the figure, and no two builders would diverge on anything because of it. Decisively, there is nothing to do with the answer — *"Ships and settles. No seasons or…

## https://devforum.roblox.com/t/bypassing-uilistlayout-filling-invisible-elements/2496680

*Cited by 2: `ui-ux/hud/02-presence-and-reserved-extent`, `ui-ux/hud/_lead`*

- *The contradiction is inside `firstSession`, not between it and me.** A `UIListLayout` *"is intended to collapse a `Visible = false` child out of its flow"*, not to hold its space ``, corroborated by a later thread giving the workarounds — `CanvasGroup.GroupTransparency`, driving transparencies directly, or a visible fully transparent parent ``. So `S2`'s *no instance at all* and `suppressionForbidden`'s *no `reflowOnLift`* are already incompatible with each other, before `S12` is consulted. The internally consistent pair is `{S12, reflowOnLift}`; `S2` is the outlier and it loses.
- **A `UIListLayout` is intended to collapse a `Visible = false` child out of its flow**, not to hold its space: the space-retaining behaviour was reported as a bug and a Roblox staff reply called it *"the same as the bug where UIListLayout wasn't hooking up to Changed events properly. It should be fixed now."* ``. Corroborated by a later thread describing the same collapse and giving the workarounds — `CanvasGroup.GroupTransparency = 1`, driving transparencies directly, or a visible fully transparent parent ``. This is what makes H3 a real contradiction rather than a wording quibble, and it…

## https://devforum.roblox.com/t/change-default-sounds-in-rbxcharactersounds/1162202

*Cited by 2: `audio/sfx/02-platform-character-sounds`, `audio/sfx/_lead`*

- **The only override is a name collision.** *"create a new LocalScript inside StarterPlayerScripts, rename it to RbxCharacterSounds"*, which supersedes the CoreScript; the recommended method is copying the default script there and editing ids in the copy ``. **That is one config line, not an authoring task**, and it is the whole cost of the `Died` row.
- **The override is a name collision, not an API.** *"create a new LocalScript inside StarterPlayerScripts, rename it to RbxCharacterSounds"*, which supersedes the CoreScript ``. Corroborated: the recommended method is copying the default script into `StarterPlayerScripts` and editing ids there rather than reaching into character descendants ``.

## https://devforum.roblox.com/t/clarification-on-funnel-analytics-limits/3084051

*Cited by 2: `analytics/events/03-emission-budget`, `analytics/funnels/_lead`*

- **A dropped event is silent, and the instruments are shaped around that.** The one sourced statement about over-limit behaviour is that events *"will succeed but those that exceed the limit will be dropped and will not be shown"* `` — said of funnel cardinality, and assumed here to hold for the request rate as well `[unverified]`. **Three consequences bind sheet `04` and every reader:** no instrument may be the difference of two events; no instrument may be an exact count of anything; and **the telemetry module must not retry**, because a retry converts a throttle into a longer throttle.…
- *The platform limits, which are hard ceilings on anything this domain specs:** *"Total `AnalyticsService` requests per minute: 120 + (20 * CCU)"*; 10 funnels; 100 steps per funnel; 3 custom fields per event; 8,000 unique value combinations across them, *"grouped as 'Other' after"*; 100 custom event names; and *"Events remain visible on the Creator Dashboard and automatically expire after 90 days from last data received"* ``. The 10-funnel cardinality is *"on a daily basis"* and an over-limit event *"will succeed but those that exceed the limit will be dropped and will not be shown"* ``.…

## https://devforum.roblox.com/t/disabling-default-footsteps-sounds/1342744

*Cited by 2: `audio/sfx/02-platform-character-sounds`, `audio/sfx/_lead`*

- **They are created client-side, so no server script can change another player's.** *"those sounds in the humanoidrootpart are created on the player client, not on the server"* ``.
- **They are created client-side, not by the place.** *"those sounds in the humanoidrootpart are created on the player client, not on the server"*, so a server script cannot silence another player's footsteps ``.
- **The override is a name collision, not an API.** *"create a new LocalScript inside StarterPlayerScripts, rename it to RbxCharacterSounds"*, which supersedes the CoreScript ``. Corroborated: the recommended method is copying the default script into `StarterPlayerScripts` and editing ids there rather than reaching into character descendants ``.

## https://devforum.roblox.com/t/let-developers-temporarily-override-the-escape-key-using-contextactionservice/2021335

*Cited by 2: `ui-ux/navigation/03-close-and-focus-by-device`, `ui-ux/navigation/_lead`*

- *Every conventional back input on this platform is unavailable, and that is sourced rather than assumed.** Escape *"is exclusively reserved for opening the Roblox menu"* and `ContextActionService` *"ignores all inputs registered by the CoreScripts"* ``. Gamepad **B toggles the Roblox menu** — reported against the UWP client, not reproducing in Studio, merged with no fix `` — enough to forbid B as the *only* gamepad close path and **not** enough to claim B is reserved on every client. And Roblox's own mobile input surface is touch gestures, motion sensors, haptics and on-screen buttons:…
- `` — *"the Escape key is exclusively reserved for opening the Roblox menu"*; *"ContextActionService ignores all inputs registered by the CoreScripts"*. No staff resolution; still open as of the thread's last activity (Nov 2024). **Escape is not available as a close path.**

## https://devforum.roblox.com/t/my-day-1-retention-is-awful-23-losing-half-my-players-in-under-2-minutes-what-am-i-doing-wrong-with-onboarding/4186434

*Cited by 2: `gameplay/onboarding/04-run-one-withholds`, `gameplay/onboarding/_lead`*

- *A live developer case has exactly this shape**, the feedback being *"theres like a gazillion ui on my screen"* and the advice *"keep it minimal, basic"* ``. **I cite the qualitative observation and not the retention figure attached to it**, because `00-CORE.md` makes beating the retention curve an explicit non-goal `[brief: binding]`.
- A live developer case with the shape my `04` is about: 23% D1, 30% of players lost in the first minute, and the feedback centred on the first frame being overloaded — "theres like a gazillion ui on my screen" — with the advice to "keep it minimal, basic". No forced-tutorial or immediate-reward mechanism was recommended ``

## https://devforum.roblox.com/t/new-asset-privacy-and-permissions-features-for-audio-and-video/2725248

*Cited by 2: `audio/mix/03-the-asset-ledger`, `audio/mix/_lead`*

- *Audio needs two gates, not one, and only for upload rows.** Uploaded audio is private — *"only you can view and use it"* — and usage permission is granted per experience through Creator Hub → Creations → Asset Details → Permissions ``. A restricted asset without that grant *"cannot load in Studio or at runtime"* ``. **Granting an experience permission requires the experience to exist**, the identical publish-first inversion `gamePassId` has, and `release.provisioning.gates` runs publish → checklist → re-resolution → pass creation → id write → republish with nothing that uploads a sound.…
- Audio privacy: uploaded audio is private, *"only you can view and use it"*, and usage permission is granted per experience; the flow is Creator Hub → Creations → Asset Details → Permissions and *"your friend will need to insert it into their experience to grant that experience access"* ``. A restricted asset without permission *"cannot load in Studio or at runtime"* ``. **This is the provisioning finding:** granting an experience permission requires the experience to exist, so audio inherits `release` gate 1 (publish first) and needs two gates, not one.

## https://devforum.roblox.com/t/placeversion-only-returning-0/239154

*Cited by 2: `tech/deploy/01-the-release-contract`, `tech/deploy/_lead`*

- *Version needs both halves because neither derives from the other.** The publish returns `versionNumber` ``; `game.PlaceVersion` returns it live and `0` in Studio `` ``. The emit runs *before* the publish, and nothing writes a stamp into the place file — so both, joined by a ledger. The stamp reaches the build for free once `release` is promoted, with no emitter change ``.

## https://devforum.roblox.com/t/psa-removing-legacy-touch-controls/361681

*Cited by 2: `ui-ux/platform/01-device-viewport-rules`, `ui-ux/platform/_lead`*

- *Orientation was unstated anywhere in the brief and changes the answer completely.** The dynamic thumbstick captures **left 40% × bottom two-thirds** in landscape and **full width × bottom 40%** in portrait ``, and the legacy `Thumbstick`, `DPad` and `Thumbpad` modes are gone, so that is the region that actually exists ``. Portrait swallows the whole bottom band and both bottom clusters with it. I rule landscape `[cid: decided]`: it is what `ui-forge` calibrates against (`cli.mjs:42-46`) and the orientation in which the right half is free. Portrait keepouts ship anyway, because a client…
- The legacy `Thumbstick`, `DPad` and `Thumbpad` touch movement modes have been removed, so the dynamic thumbstick is the region that actually exists. ``

## https://devforum.roblox.com/t/public-sound-effects-upload-are-now-available-for-creators/2980704

*Cited by 2: `audio/stingers/01-the-three-payoff-cues`, `audio/stingers/_lead`*

- `notices` caps `B2` at 3.0 s and `B3` at 2.5 s so *"the plate leaves the screen while its sound is still playing"* cannot happen, with 2.0 s of headroom to its 5.0 s ceiling available as one revision. **I fit inside both caps and spend none of the headroom**, so that offer stays unspent for whoever needs it later. `B1` is 1.2 s, well under its own 2.5 s `atPatch` dwell, so the object at the patch always outlives its sound and `B2` can be longer than it as `theme/tone/03` permits. All three are inside the 10-second ceiling the platform puts on a publicly distributed sound effect, so nothing…
- `` (2024-05-23) — a creator may distribute a sound effect publicly only if *"the audio length must be <10 sec"* and they are 13+, ID-verified and in good moderation standing, and a consumer *"will need to acquire the asset from the Creator Store and add to your inventory"*. All three of my cues are inside 10 s by construction, so nothing here bounds the design.

## https://devforum.roblox.com/t/roblox-menu-being-toggled-by-the-b-button-on-a-gamepad/639726

*Cited by 2: `ui-ux/navigation/03-close-and-focus-by-device`, `ui-ux/navigation/_lead`*

- *Every conventional back input on this platform is unavailable, and that is sourced rather than assumed.** Escape *"is exclusively reserved for opening the Roblox menu"* and `ContextActionService` *"ignores all inputs registered by the CoreScripts"* ``. Gamepad **B toggles the Roblox menu** — reported against the UWP client, not reproducing in Studio, merged with no fix `` — enough to forbid B as the *only* gamepad close path and **not** enough to claim B is reserved on every client. And Roblox's own mobile input surface is touch gestures, motion sensors, haptics and on-screen buttons:…
- `` — gamepad **B toggles the Roblox menu**; reported as specific to the UWP client and not reproducing in Studio, merged by a moderator with no fix. Enough to forbid B as the *only* gamepad close path; **not** enough to claim B is reserved on every client, and `03` must say so.

## https://devforum.roblox.com/t/sound-play-limitations/552486

*Cited by 2: `audio/mix/02-degradation-under-load`, `audio/mix/_lead`*

- *The cap has no source, and I established that rather than assumed it.** Roblox publishes no simultaneous-sound limit at any device tier. The only evidence is community: normal operation to ~400 synchronised instances with desync above, on an Intel i5-12500H with 16 GB and *"no Roblox staff confirmation"* ``; and one background track silently entering a playing-but-inaudible state at *"maybe around 25"* rapid one-shots, also unconfirmed ``. **Neither is a phone.** The second is the failure mode this key exists to prevent, so **24** sits just under it and the top of the test range, 48, is…
- **Roblox publishes no simultaneous-sound limit, at any device tier, anywhere.** Four fetches found only community measurement: one benchmark reporting normal operation to ~400 synchronised instances, desync at 401–500 and progressive cutout above, explicitly on an Intel i5-12500H with 16 GB and *"no Roblox staff confirmation"* ``; and one report of a background music track silently entering a playing-but-inaudible state at *"maybe around 25"* rapid GUI one-shots, also unconfirmed ``. **Neither is a phone and neither is a platform statement.** The second is the only phone-adjacent evidence…

## https://devforum.roblox.com/t/total-sound-instance-limit/3736250

*Cited by 2: `audio/mix/02-degradation-under-load`, `audio/mix/_lead`*

- *The cap has no source, and I established that rather than assumed it.** Roblox publishes no simultaneous-sound limit at any device tier. The only evidence is community: normal operation to ~400 synchronised instances with desync above, on an Intel i5-12500H with 16 GB and *"no Roblox staff confirmation"* ``; and one background track silently entering a playing-but-inaudible state at *"maybe around 25"* rapid one-shots, also unconfirmed ``. **Neither is a phone.** The second is the failure mode this key exists to prevent, so **24** sits just under it and the top of the test range, 48, is…
- **Roblox publishes no simultaneous-sound limit, at any device tier, anywhere.** Four fetches found only community measurement: one benchmark reporting normal operation to ~400 synchronised instances, desync at 401–500 and progressive cutout above, explicitly on an Intel i5-12500H with 16 GB and *"no Roblox staff confirmation"* ``; and one report of a background music track silently entering a playing-but-inaudible state at *"maybe around 25"* rapid GUI one-shots, also unconfirmed ``. **Neither is a phone and neither is a platform statement.** The second is the only phone-adjacent evidence…

## https://devforum.roblox.com/t/uilistlayout-uses-space-even-for-invisible-gui-elements/45323

*Cited by 2: `ui-ux/hud/02-presence-and-reserved-extent`, `ui-ux/hud/_lead`*

- *The contradiction is inside `firstSession`, not between it and me.** A `UIListLayout` *"is intended to collapse a `Visible = false` child out of its flow"*, not to hold its space ``, corroborated by a later thread giving the workarounds — `CanvasGroup.GroupTransparency`, driving transparencies directly, or a visible fully transparent parent ``. So `S2`'s *no instance at all* and `suppressionForbidden`'s *no `reflowOnLift`* are already incompatible with each other, before `S12` is consulted. The internally consistent pair is `{S12, reflowOnLift}`; `S2` is the outlier and it loses.
- **A `UIListLayout` is intended to collapse a `Visible = false` child out of its flow**, not to hold its space: the space-retaining behaviour was reported as a bug and a Roblox staff reply called it *"the same as the bug where UIListLayout wasn't hooking up to Changed events properly. It should be fixed now."* ``. Corroborated by a later thread describing the same collapse and giving the workarounds — `CanvasGroup.GroupTransparency = 1`, driving transparencies directly, or a visible fully transparent parent ``. This is what makes H3 a real contradiction rather than a wording quibble, and it…

## https://devforum.roblox.com/t/update-on-legacy-chat-deprecation-and-textchatservice-migration/3376880

*Cited by 2: `tech/deploy/01-the-release-contract`, `tech/deploy/_lead`*

- *Two rows have no read, differently.** Voice has none at any level: `IsVoiceEnabledForUserIdAsync` is per user, not per experience ``. `ChatVersion` is `[unverified]` — deprecated after legacy chat's removal on 30 Apr 2025, so a place created today cannot be on `LegacyChatService`, which lowers the risk without closing the row `` ``. Two settling fetches ride in the key; until then both rows stand on a human tick and one joined test client, and the row says so rather than implying an assertion exists.

## https://dig-it-roblox.fandom.com/wiki/Collection

*Cited by 2: `gameplay/meta/04-the-depth-ladder`, `theme/fantasy/_lead`*

- **The measured genre asymmetry says even that is thin, and it is why I take the largest legal area count rather than the smallest.** DIG ships two islands against a 601-item logbook ``, and finishing one *area's* journal there is a 0.4% event across 60,426 and 78,433 earners `` ``. Few areas, a very large collection, and completion is rare. This game is on the wrong side of that on both axes and the partition equality only lets me fix one. See `## Flagged to the developer`.
- **DIG** (DIG Development, 28 June 2025): *"Uncover and collect hidden treasures, explore a massive open world..."* **56,030,218 visits, 89.3% likes (101,475 up / 12,115 down), all-time peak 119,871 CCU.** Its Collection is *"a detailed in-game logbook"* of 601 items, and **completing a zone unlocks Mounts** — structurally the brief's set-completion bonus. `` `` ``

## https://en.help.roblox.com/hc/en-us/articles/360000927163-Using-Licensed-Music-on-Roblox

*Cited by 2: `audio/music/01-whether-music-exists`, `audio/music/_lead`*

- Licensed-music terms: APM Music catalogue, royalty-free on-platform, **up to 250 licensed tracks at a time in a single experience**, boom-box use counted. ``

## https://en.wikipedia.org/wiki/Villa_of_Domitian

*Cited by 2: `theme/setting/01-the-ruin`, `theme/setting/02-extent`*

- *The architecture is real, not invented, and that matters because every line of this sheet is otherwise `[cid: decided]`.** Terraced hillside complexes built as *"at least three terraces, a common practice for large patrician Roman villas in the hills"*, with a terrace level *"reserved for cisterns"*, a cistern *"divided into three communicating chambers"*, vaulted substructure, and *"distinct functional zones across the sloping terrain"*, are a documented building system: platform, cistern and vault are three parts of one thing, on a slope, by ordinary practice. `` **The fiction borrows…
- `collection.sets[].label` ships **Terrace · Cistern · Vault · Spire** at depths 1–4 (`cid/gameplay/meta/02-the-collection.md`). In the building system `01-the-ruin` borrowed, a cistern and a vault are *substructure* — a terrace level *"reserved for cisterns"* over vaulted substructure `` — and a spire is *superstructure*. **So a vertical depth axis runs down, down, then up, and is falsified by values already on disk.** A horizontal axis is falsified by nothing. `[cid: decided]`

## https://github.com/Roblox/creator-docs/blob/main/content/en-us/audio/assets.md

*Cited by 2: `audio/music/01-whether-music-exists`, `audio/music/_lead`*

- *A permanent pad fixes a harmonic centre and three other domains must then tune to it.** `OPEN.md §2`'s per-tier pitched note, `B1` and `B4` would each have to sit in that key or trip `theme/tone/04` `D3`'s ban on *"a dissonant or detuned interval"*. **It is also the largest single asset this build could hold:** one Roblox audio upload may itself be **20 MB** ``, against a `budgets.memoryCeilingsByCategory.Sounds` ceiling of **20 MB** shared by six audio domains on the 3 GB floor device — 100% of the category's runtime budget in one file.
- *The cost of the other answer, so the ruling is a trade and not a preference.** A permanent tonal pad establishes a fixed harmonic centre, and every pitched cue in the game — `OPEN.md §2`'s per-tier note, `B1`, `B4` — must then be tuned to it or trip `theme/tone/04` `D3`'s ban on *"a dissonant or detuned interval"*. That is a constraint imposed on three other domains in exchange for one asset's worth of warmth. It is also the largest single asset class this build could hold: a Roblox audio upload may itself be up to **20 MB**, against a `budgets.memoryCeilingsByCategory.Sounds` ceiling of…
- Roblox audio asset limits and the Creator Store library — uploads must be *"less than 20 MB in size"*, *"less than 7 minutes in duration"*, mp3/ogg/wav/flac, ≤48 kHz; the store carries *"more than 100,000 professionally-produced sound effects and music tracks from top audio and music partners"* free to use. ``

## https://github.com/Roblox/creator-docs/blob/main/content/en-us/cloud-services/data-stores/player-data-purchasing.md

*Cited by 2: `tech/deploy/_lead`, `tech/persistence/01-the-save-write`*

- **The retry schedule is set by the join deadline, not by taste.** `firstSession` requires the first reveal within 10 s of join, so `load` gets 3 attempts and 3 s of backoff and nothing more. `leave` gets the most (4 attempts) because no next pass exists. `shutdown` gets a 20-second burst deadline against `BindToClose`'s "30 seconds total, shared across all bound callbacks" ``, leaving 10 s of margin. Roblox's own instruction is `pcall` plus "exponential backoff" ``.

## https://github.com/Roblox/creator-docs/blob/main/content/en-us/cloud/guides/usage-place-publishing.md

*Cited by 2: `tech/deploy/01-the-release-contract`, `tech/deploy/_lead`*

- *Version needs both halves because neither derives from the other.** The publish returns `versionNumber` ``; `game.PlaceVersion` returns it live and `0` in Studio `` ``. The emit runs *before* the publish, and nothing writes a stamp into the place file — so both, joined by a ledger. The stamp reaches the build for free once `release` is promoted, with no emitter change ``.

## https://github.com/Roblox/creator-docs/blob/main/content/en-us/parts/materials.md

*Cited by 2: `art/style/01-palette-and-materials`, `art/style/_lead`*

- *A limestone world costs zero uploaded assets.** `Limestone`, `Sandstone`, `Concrete`, `Cobblestone`, `Pavement`, `Rock`, `Slate` and `Granite` are base materials applicable to a `BasePart`, and built-in base material textures *"are bundled with Studio instead of being accessible as a typical asset ID"* ``. `MaterialVariant` and `SurfaceAppearance` both take a PBR texture you *"paste an asset ID or import"* for ``, which is what makes both forbidden under `budgets.textureCeilings.uploadedImageAssetsInWorldGeometry` 0 and `N17` — sourced, not assumed. `Enum.Material` has 47 members including…

## https://github.com/Roblox/creator-docs/blob/main/content/en-us/performance-optimization/design.md

*Cited by 2: `tech/performance/01-device-floor-and-budgets`, `tech/performance/_lead`*

- *Why one tier above the platform minimum.** Roblox refuses to publish a device ceiling. Its guidance is to *"choose at least one 'baseline' device, test your game on it throughout the development process, and pay close attention to frame rate and memory usage"*, and its only numeric anchor is illustrative — *"you need to stay below 1,000 draw calls and 1,000,000 triangles for the game to run well on your baseline device"* ``. The floor is a project choice; the platform minimum is only its lower bound. The audience is *"8–14, mobile-heavy"* `[brief: binding]` (`00-CORE.md`), a hand-me-down…
- *Streaming is the one lever left and it is unowned today.** `StreamingEnabled` appears in neither contract and nowhere in `game/src`; instance streaming *"improves join times, reduces memory footprint, and increases frame rate"* ``, which is three of my four ceilings. Defaults are 64 / 1024 ``. **1024 is too wide**: at `plots.pitchStuds` 122 it reaches every lane of a 1,952-stud row, so a client loads sixteen live bays. **512 reaches four lanes either side** (488 studs) — nine lanes, 5,814 instances worst case — and still spans a whole merged bay longitudinally (480 studs). **160 is the min…
- Why that and not the platform minimum: Roblox's own performance guidance refuses to publish a device ceiling and instead says to *"choose at least one 'baseline' device, test your game on it throughout the development process, and pay close attention to frame rate and memory usage"*, offering only one illustrative threshold — *"you need to stay below 1,000 draw calls and 1,000,000 triangles for the game to run well on your baseline device"* ``. So the floor is a choice the project must make, and the platform minimum is only its lower bound. The audience is 8–14 and mobile-heavy `[brief:…
- `https://github.com/Roblox/creator-docs/blob/main/content/en-us/performance-optimization/design.md` — the baseline-device instruction, verbatim; the 1,000 draw calls / 1,000,000 triangles example; "Roblox does not have access to all of a device's memory"; instance streaming "improves join times, reduces memory footprint, and increases frame rate".

## https://github.com/Roblox/creator-docs/blob/main/content/en-us/production/analytics/custom-fields.md

*Cited by 2: `analytics/economy/01-currency-flow-and-holdings`, `analytics/economy/_lead`*

- *The three custom fields are spent on the dimensions that make Balance's predictions separable and on nothing else.** `areaOrdinal` because every prediction in `solvency.areaLedger[]` and `tierMix.byDepth[]` is indexed by it; `entitlement` because every wall-clock and lap figure in `pacing` is published in a base and a purchaser population; and the third field is the multiplier confound — `valueLevel` on the source, `heldLevelAfter` on the sink. Without `valueLevel`, `amount / N` is not comparable to `tierMix.byDepth[*].expectedValuePerPatch` at all, because…
- **The custom-field budget**, which is the whole dimensioning constraint on sheet `01`: three fields, **values must be strings**, **up to 8,000 unique value combinations across all three**, and anything past `CustomField03.Name` is ignored rather than erroring. ``

## https://github.com/Roblox/creator-docs/blob/main/content/en-us/studio/avatar-settings.md

*Cited by 2: `tech/deploy/01-the-release-contract`, `tech/deploy/_lead`*

- *Avatar type: the player-choice option is the hazard, not R6.** The options are exactly **R6 / R15 / R15 & R6**, set in Avatar Settings, which *"modifies underlying game defaults that are not visible outside of the settings interface or accessible with scripts"* ``. R6 is total and obvious. **R15 & R6 lets one joiner arrive R6, tool-less, while everyone else is correct** — no error, no reproduction. The setting has no read-back, but `Humanoid.RigType` **is** readable per character from a server script ``, which the architect did not note, so P2 is asserted per spawn rather than not at all.

## https://kitsblox.com/blog/fix-roblox-ui-scaling-mobile

*Cited by 2: `ui-ux/screens/03-text-policy`, `ui-ux/screens/_lead`*

- *The floor is 14 px at the reference resolution, and I am not pretending it is sourced.** Roblox publishes no minimum text size; the docs advise only against a `MinTextSize` below 9 ``, and 14 to 18 for mobile body text is a **practitioner recommendation, not a platform figure** ``. 14 is the bottom of that band because the surface it binds hardest, the index panel, is width-constrained by six slots across. It is `[playtest unknown]`, test range 12 to 18, settled by one `npm run render` of that screen at phone viewport with the real strings in place, which has never been run `[research…
- A repeated third-party recommendation of **a fixed `TextSize` of 14–18 for mobile body text**, on the ground that `TextScaled` shrinks text to fit and often makes it unreadably small. `` — **treat as a practitioner opinion, not a platform figure.** It is the only number I found and Roblox publishes none; sheet 03 must not present it as sourced from Roblox.

## https://madstudioroblox.github.io/ProfileStore/

*Cited by 2: `tech/persistence/02-session-locking`, `tech/persistence/_lead`*

- **`ProfileStore` is precedent, not instruction.** It session-locks through `UpdateAsync`, defaults its auto-save to **300 seconds**, and uses `MessagingService` to resolve conflicts faster ``. The `MessagingService` half is unavailable under the scope gate (`03-META.md` priority 3, leaderboards and cross-server state), and **nothing replaces it**: the price is that an ungraceful server death costs the next holder up to `stealAfterSeconds` of deferred writes. That is paid rarely, because a graceful leave releases the lock in its own save, and it is paid by a player who is otherwise playing…
- `https://madstudioroblox.github.io/ProfileStore/` — session locking via `UpdateAsync`, a **300-second** default auto-save (up from ProfileService's 30), `MessagingService` for faster conflict resolution, and "exponential backoff, timeouts and cancel conditions".

## https://raw.githubusercontent.com/Roblox/Core-Scripts/master/PlayerScripts/StarterCharacterScripts/Sound/LocalSound.client.lua

*Cited by 2: `audio/sfx/02-platform-character-sounds`, `audio/sfx/_lead`*

- **They exist, they are ten, and they are the most-heard audio in a movement-only game.** The set is `Died, Running, Swimming, Climbing, Jumping, GettingUp, FreeFalling, FallingDown, Landing, Splash`; `Running`, `Swimming` and `Climbing` loop, `Jumping`, `GettingUp` and `Died` are one-shots, `Landing` and `Splash` scale volume with vertical speed, and `FreeFalling` fades in over 1.1 s above 75 studs/s ``.
- **They exist and they are ten.** The default set is `"Died, Running, Swimming, Climbing, Jumping, GettingUp, FreeFalling, FallingDown, Landing, Splash"`, with Running, Swimming and Climbing looped and Jumping, GettingUp and Died one-shot; Landing and Splash scale volume with vertical speed, FreeFalling fades in over 1.1 s above 75 studs/s ``.

## https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/effects/particle-emitters.md

*Cited by 2: `art/vfx/01-the-clear-and-the-reveal`, `art/vfx/_lead`*

- *The budget: `batchingFactor` does not bound this domain at either end.** At 500, patches cost ≈ 12 draw calls and effects ≈ 56 against a 1,000 ceiling; at 1, the design already renders **5,814 from patches alone** with *"NO legal streaming radius"* fixing it, and effects add under 1% — the lever there is `depths.areas[].patchCount`, a finding against `depths`. **The binding term is fill rate and overdraw**, which batching does not touch: *"Particle count can impact performance due to overdraw… Particle size can impact performance due to fill-rate"* ``, *"be especially careful to avoid high…
- 1. `theme/setting/05` `A14` is `[cid: decided]` and its argument is *accessibility*, not taste: *"Tier is a core economic signal carried primarily by silhouette, and a swaying silhouette is a changing silhouette… ambient motion on 140 non-colliding patches per plot… is motion competing with the only motion that means anything."* That argument gets **stronger** at 640 patches, not weaker. 2. `theme/setting/03` `R5` (relayed via Audio's brief): *"Anything scheduled, intermittent, randomised over time, or varying with anything but a player's action is a change of state and fails."* Every…

## https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/performance-optimization/design.md

*Cited by 2: `art/vfx/01-the-clear-and-the-reveal`, `art/vfx/_lead`*

- *The budget: `batchingFactor` does not bound this domain at either end.** At 500, patches cost ≈ 12 draw calls and effects ≈ 56 against a 1,000 ceiling; at 1, the design already renders **5,814 from patches alone** with *"NO legal streaming radius"* fixing it, and effects add under 1% — the lever there is `depths.areas[].patchCount`, a finding against `depths`. **The binding term is fill rate and overdraw**, which batching does not touch: *"Particle count can impact performance due to overdraw… Particle size can impact performance due to fill-rate"* ``, *"be especially careful to avoid high…

## https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/performance-optimization/improve.md

*Cited by 2: `audio/mix/03-the-asset-ledger`, `audio/mix/_lead`*

- *The 20 MB ceiling is a PlaceMemory figure and a creator controls file bytes, so the ledger budgets files and states the conversion it assumes.** `budgets.memoryCeilingsByCategory.Sounds` is 20 MB on a 3 GB phone, `[playtest unknown]` at ±60%, and the platform publishes no conversion from an audio file's bytes to its resident cost. Its only guidance on the subject is a sentence: *"Audio files can be a surprising contributor to memory usage, particularly if you load all of them into the client at once"* ``. So the ledger sets `assumedExpansionFactor` **2.0**, budgets **10.0 MB of files**,…
- *"Audio files can be a surprising contributor to memory usage, particularly if you load all of them into the client at once rather than only loading what you need for a portion of the game"* — the platform's only guidance on audio memory, and it is a sentence, not a number ``. The same page also supplies the `CanTouch`/`CanQuery` guidance `tech/performance/01` recorded as owed.

## https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/production/analytics/funnel-events.md

*Cited by 2: `analytics/funnels/01-onboarding-funnel`, `analytics/funnels/_lead`*

- *`LogOnboardingFunnelStepEvent`, for a decisive reason.** `LogFunnelStepEvent(player, funnelName, funnelSessionId, step, stepName, customFields)` **requires a `funnelSessionId`**; the one-time method takes none and is documented for *"conversion events that only occur once per user"* ``. The first session is once per user by definition.
- *The funnel API exists on the platform and my sheets are specced against it, not around it.** Two methods: `LogOnboardingFunnelStepEvent(player, step, stepName, customFields)` for *"conversion events that only occur once per user"* and `LogFunnelStepEvent(player, funnelName, funnelSessionId, step, stepName, customFields)` for recurring ones; *"If a user repeats a step in a funnel, the funnel only considers the first instance"* and **"If you skip a step in a funnel, the earlier steps automatically complete"** — which is the fact that decides how `01` frames its own argument `` ``.

## https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/production/creator-store.md

*Cited by 2: `audio/mix/03-the-asset-ledger`, `audio/mix/_lead`*

- *Audio needs two gates, not one, and only for upload rows.** Uploaded audio is private — *"only you can view and use it"* — and usage permission is granted per experience through Creator Hub → Creations → Asset Details → Permissions ``. A restricted asset without that grant *"cannot load in Studio or at runtime"* ``. **Granting an experience permission requires the experience to exist**, the identical publish-first inversion `gamePassId` has, and `release.provisioning.gates` runs publish → checklist → re-resolution → pass creation → id write → republish with nothing that uploads a sound.…
- Audio privacy: uploaded audio is private, *"only you can view and use it"*, and usage permission is granted per experience; the flow is Creator Hub → Creations → Asset Details → Permissions and *"your friend will need to insert it into their experience to grant that experience access"* ``. A restricted asset without permission *"cannot load in Studio or at runtime"* ``. **This is the provisioning finding:** granting an experience permission requires the experience to exist, so audio inherits `release` gate 1 (publish first) and needs two gates, not one.

## https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/production/publishing/accessibility.md

*Cited by 2: `ui-ux/screens/03-text-policy`, `ui-ux/screens/_lead`*

- *Growth is uncapped except where the layout physically cannot give.** Sheet 01 rules the index panel has no scroll region, so at `Largest` the 24 slots cannot grow without overflowing. The platform sanctions the cap it needs: a `UITextSizeConstraint` element *"won't expand beyond `MaxTextSize` or shrink below `MinTextSize`, regardless of player preferences"* ``. So the 24 slot labels and the 4 headings are capped at their computed fit size; everything else in the game, including all prose, is uncapped and grows.
- `` and its source `` — *"The **Text Size** setting maps to the `GuiService.PreferredTextSize` property which defaults to `Medium`"*; elements using `UITextSizeConstraint` *"won't expand beyond their `MaxTextSize` or shrink below `MinTextSize`, regardless of player preferences"*; labels with `TextScaled` enabled *"bypass the `PreferredTextSize` value entirely"*; `AutomaticSize` objects *"resize their bounds as text size changes"*; when `TextWrapped` is active *"text flows to additional lines as `PreferredTextSize` increases"*. On colour: *"over 5% of people in the world have some form of…

## https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/projects/assets/index.md

*Cited by 2: `art/vfx/01-the-clear-and-the-reveal`, `art/vfx/_lead`*

- *V1, the ruling nobody had made: a `ParticleEmitter` may exist, in one cue.** `A14` reaches *ambience* only, and `theme/setting/05` wrote the carve-out for me — *"The clear-away effect on a patch is a player-caused event and is not ambient motion"* ``. `budgets` forbids the uploaded **texture**, not the class: `rbxasset://` is the client's own content folder and `rbxassetid://` is a user upload ``, so a built-in texture passes `N17`'s grep. The alternative — a tween on a primitive — writes `.Size` after creation, which sheet `02` closes. **The engine default…
- **Textures.** `uploadedImageAssetsInWorldGeometry` is **0** and `N17`'s check is `grep -rn "rbxassetid" game/src` returns nothing. The default particle texture is `rbxasset://textures/particles/sparkles_main.dds` ``, and **`rbxasset://` is Roblox's content folder on the user's device while `rbxassetid://` is a user-uploaded cloud asset** ``. **So a built-in particle texture is not an uploaded image asset and passes `N17`'s grep as written.** That resolves the *texture* half of `V1` on evidence; the *class* half is still `01`'s ruling and `01` must state it as a ruling, not inherit it from…

## https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/reference/engine/classes/ContentProvider.yaml

*Cited by 2: `audio/mix/03-the-asset-ledger`, `audio/mix/_lead`*

- *Preload two cue classes, thirteen files, and nothing else.** `ContentProvider:PreloadAsync` *"yields until all of the assets… have loaded"*, and the platform's advice is *"only preload essential assets… You might get occasional pop-in, but it decreases load times"* ``. The essential set is what can fire inside `firstSession.beats[firstReveal].bySecond` 10.0: the clear's twelve files and the reveal's one. The call runs **after** the character is controllable, which is where `budgets.loadTargetDerivation` stops the load-to-first-input clock, so preloading contributes 0 s to the 6.0 s target…
- `ContentProvider:PreloadAsync` *"yields until all of the assets associated with the given Instances have loaded"* and handles instances with content links *"such as `Decal` and `Sound`"*; best practice is *"only preload essential assets, not the entire Workspace… You might get occasional pop-in, but it decreases load times"* ``.

## https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/reference/engine/classes/GuiButton.yaml

*Cited by 2: `audio/ui/01-press-acknowledgment`, `audio/ui/_lead`*

- *The pair nobody had noticed.** `input` acceptance criterion 4 reads *"Activating a purchase control with a balance below the price, or at max level, changes no state and **emits nothing on any channel**"* ``, unqualified. The only press event that fires on all three device classes is `GuiButton.Activated` — *"a left click press-and-release … on desktop, touch release … on mobile, or A/cross … on console"* `` — and it fires **before** adjudication, because `response.beats[upgradePurchased].decidedBy` is `"server"`. A press-edge cue on a purchase control therefore fires on the failure. That…
- `GuiButton.Activated` — *"Fires when a left click press-and-release is detected on desktop, touch release is detected on mobile, or **A**/cross is activated in UI navigation mode on console."* `MouseButton1Down`/`Up` are mouse-only. `` → settles press-versus-release across all three device classes in one fact.

## https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/reference/engine/classes/ParticleEmitter.yaml

*Cited by 2: `art/vfx/01-the-clear-and-the-reveal`, `art/vfx/_lead`*

- *The budget: `batchingFactor` does not bound this domain at either end.** At 500, patches cost ≈ 12 draw calls and effects ≈ 56 against a 1,000 ceiling; at 1, the design already renders **5,814 from patches alone** with *"NO legal streaming radius"* fixing it, and effects add under 1% — the lever there is `depths.areas[].patchCount`, a finding against `depths`. **The binding term is fill rate and overdraw**, which batching does not touch: *"Particle count can impact performance due to overdraw… Particle size can impact performance due to fill-rate"* ``, *"be especially careful to avoid high…

## https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/reference/engine/classes/SoundGroup.yaml

*Cited by 2: `audio/mix/01-bus-tree-and-levels`, `audio/mix/_lead`*

- *Level lives in two properties and both are mine.** `Volume` is 0–10 on both `Sound` and `SoundGroup`, engine defaults 0.5 and 1, and the group's value multiplies its members `` ``. Membership is by property, **not** by parenting, and groups nest ``. So a per-bus level and a per-cue level are the same arithmetic, and two keys writing them would be two writers for one number. `mix.assets.rows[].volume` and `mix.buses[].volume` are the only two writers in the game.
- `SoundGroup` is *"used to manage the volume and sound effects on multiple Sounds at once"*, its `Volume` is a 0–10 multiplier applied to member sounds, membership is by the `Sound.SoundGroup` property and **not** by parenting, and groups nest `` ``.

## https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/sound/groups.md

*Cited by 2: `audio/mix/01-bus-tree-and-levels`, `audio/mix/_lead`*

- *Level lives in two properties and both are mine.** `Volume` is 0–10 on both `Sound` and `SoundGroup`, engine defaults 0.5 and 1, and the group's value multiplies its members `` ``. Membership is by property, **not** by parenting, and groups nest ``. So a per-bus level and a per-cue level are the same arithmetic, and two keys writing them would be two writers for one number. `mix.assets.rows[].volume` and `mix.buses[].volume` are the only two writers in the game.
- `SoundGroup` is *"used to manage the volume and sound effects on multiple Sounds at once"*, its `Volume` is a 0–10 multiplier applied to member sounds, membership is by the `Sound.SoundGroup` property and **not** by parenting, and groups nest `` ``.

## https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/studio/optimization/memory-usage.md

*Cited by 2: `audio/mix/03-the-asset-ledger`, `audio/mix/_lead`*

- *`StreamingSounds` is budgeted by nothing today.** PlaceMemory reports **two** audio categories among 22 — `Sounds` and `StreamingSounds` — and `memoryCeilingsByCategory` names only the first ``. A long looping bed would land in the second and be charged against `headroomForUntracked` rather than any ceiling. RR-M2 asks for an 8 MB row out of headroom, keeping both of that key's invariants true. **What routes an asset to one category rather than the other is not stated on that page** `[research owed: a Roblox page or engine reference stating the criterion — length, `Looped`, or an engine…
- 1. **No loudness, level or dynamic-range position exists anywhere in the brief or either contract.** `OPEN.md §2` describes character and nothing else. → sheet `01`, as `[cid: decided]` values flagged to the developer. 2. **Nothing states whether another player's work is audible, or from how far.** `social/02` B3 is a *sight* requirement; `social/03` X10 permits *"A's own patches clearing — the instance disappearing and the clear cue that accompanies it"* to reach a second client without saying whether that cue exists or how far it carries; `plots.pitchStuds` 122 and `budgets.streaming`…
- PlaceMemory reports **two** audio categories — `Sounds` (*"in-memory sounds"*) and `StreamingSounds` (*"streaming sounds"*) — among 22 ``. This also closes `tech/performance/01`'s own `[research owed:]` for the PlaceMemory category tree.

## https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/ui/9-slice.md

*Cited by 2: `art/ui-art/02-surface-and-ornament`, `art/ui-art/_lead`*

- *And the refusal is an asset refusal, not a capability one, which corrects my own index.** 9-slice is fully implemented at `UIBuilder.luau:500-507`, and `slice` is a member of `SPEC_PROPS` in `ui-forge/src/compose/overrides.mjs:34`, so a brief **can** already request it through an `overrides[].set` entry on any named node without touching a pattern ``. What it cannot do is supply the image: 9-slice requires *"a valid Roblox image asset with an ID entered into the `Image` field"* ``, against `representation`'s *"no asset id is needed anywhere"*, `budgets.uploadedImageAssetsInWorldGeometry`…
- `https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/ui/9-slice.md` — 9-slice needs `ScaleType.Slice`, a `SliceCenter` rect, and *"a valid Roblox image asset with an ID entered into the `Image` field"*. `UIBuilder.luau:500-507` implements it; **no pattern emits `slice` on any node**. So the emitter can render frame art and nothing can ask it to, and asking would import an uploaded image asset against `representation`'s *"no asset id is needed anywhere."* Sheet 02's finding. ``

## https://readable.com/readability/flesch-reading-ease-flesch-kincaid-grade-level/

*Cited by 2: `theme/tone/01-register`, `theme/tone/_lead`*

- *Reading level serves the bottom of the band, not the middle.** Ages 8–11 map to grade 3–6 and 11–14 to grade 6–9, and the general-public default of 8 sits at the *top* of the band ``. The band is binding `[brief: binding]` ← `[you chose: R1 Q4]` (`00-CORE.md`). A 13-year-old loses nothing reading grade-5 copy; an 8-year-old who cannot parse grade-8 copy loses the string entirely, and 35% of age-checked daily users are under 13 ``. Target 5.0, ceiling 6.0 `[playtest unknown]`, test range 4 to 8.
- *Reading level, sourced, decision not taken.** On the standard Flesch-Kincaid mapping, ages 8–11 fall in the 3–6 band and ages 11–14 in the 6–9 band, and *"text intended for readership by the general public should aim for a grade level of around 8, schooling age 13 to 14."* `` **Consequence, not a choice I am making:** an 8–14 band spans two brackets, so no single target serves all of it, and the general-public default of 8 sits at the *top* of the band rather than the middle. Sheet 01 picks the target and says which end of the band it is serving.

## https://robloxapi.github.io/ref/class/ChatWindowConfiguration.html

*Cited by 2: `gameplay/social/01-server-and-co-presence`, `gameplay/social/_lead`*

- `ChatWindowConfiguration.Enabled` defaults to **`true`** — "Whether to show the default chat window. Set to `false` to hide." ``

## https://robloxapi.github.io/ref/class/ParticleEmitter.html

*Cited by 2: `art/vfx/01-the-clear-and-the-reveal`, `art/vfx/_lead`*

- *V1, the ruling nobody had made: a `ParticleEmitter` may exist, in one cue.** `A14` reaches *ambience* only, and `theme/setting/05` wrote the carve-out for me — *"The clear-away effect on a patch is a player-caused event and is not ambient motion"* ``. `budgets` forbids the uploaded **texture**, not the class: `rbxasset://` is the client's own content folder and `rbxassetid://` is a user upload ``, so a built-in texture passes `N17`'s grep. The alternative — a tween on a primitive — writes `.Size` after creation, which sheet `02` closes. **The engine default…
- **Textures.** `uploadedImageAssetsInWorldGeometry` is **0** and `N17`'s check is `grep -rn "rbxassetid" game/src` returns nothing. The default particle texture is `rbxasset://textures/particles/sparkles_main.dds` ``, and **`rbxasset://` is Roblox's content folder on the user's device while `rbxassetid://` is a user-uploaded cloud asset** ``. **So a built-in particle texture is not an uploaded image asset and passes `N17`'s grep as written.** That resolves the *texture* half of `V1` on evidence; the *class* half is still `01`'s ruling and `01` must state it as a ruling, not inherit it from…

## https://rolearn.dev/guidance/roblox-gamepass-pricing-strategy-guide/

*Cited by 2: `gameplay/monetization/01-the-offer-ladder`, `gameplay/monetization/_lead`*

- *499, restated without the ladder-ratio clause it no longer has.** 499 is the top of the corroborated premium band and the observed ceiling of both Faith and DIG `` `` ``. The two single-item comparables sit above it — Carpet Cleaning at 1,499, and the reference's own oversized tool at 2,500 `` — and both bands were declined on `00-CORE.md` grounds, because the only argument either source gives for them is revenue concentration. `[cid: decided]`
- **Two independent third-party pricing guides agree on the rung structure**, which is the only corroboration available for "impulse to whale" as a shape: impulse **"25 - 75"** / **"25–75 R$ — reflex buy"**; mid **"99 - 249"** / **"100–250 R$ — considered buy"**; premium **"249 - 499"** / **"400–1,000+ R$ — commitment buy"**; and a whale band of **"999 - 4,999"**. One adds that round numbers (100, 250, 500) perform marginally better than charm prices on Roblox. `` ``

## https://www.nngroup.com/articles/gestalt-proximity/

*Cited by 2: `ui-ux/hud/01-persistent-surface-composition`, `ui-ux/hud/_lead`*

- *The defect is a missing unit, not a wrong number.** The playtest recorded six boxes where three belong and the cause on record is *"no contract key owns the composition"* ``. Proximity is the mechanism: *"Items close together are likely to be perceived as part of the same group"*, and proximity **overrides** colour and shape similarity ``. Two nodes half a screen apart read as two objects however they are captioned. `[cid: decided]`
- The grouping rule has a source rather than being taste: *"Items close together are likely to be perceived as part of the same group — sharing similar functionality or traits"*, with minimal spacing within a group and larger whitespace between groups, and the note that proximity **overrides colour and shape similarity** ``. This is the argument for why one readout and one control drawn half a screen apart read as two objects and not as one row, which is the defect in the player's own words.

## https://www.nngroup.com/articles/glanceable-fonts/

*Cited by 2: `theme/tone/01-register`, `ui-ux/hud/01-persistent-surface-composition`*

- *P9 is decided against the one piece of evidence that contradicts it.** For glanceable isolated words, *"Lowercase lettering required 26% more time for accurate reading than uppercase"*, though character size dominates case ``. P9 still forbids stored all-caps, because `theme/vocabulary/01-naming-form` (pack §4) already fixed Title Case, uppercase is lossy, and rendered case is typography that UI/UX can apply to a whole class of label at draw time. `[cid: decided]`
- *Rendered case equals stored case.** The evidence against says lowercase costs *"26% more time for accurate reading than uppercase"* for glanceable isolated words ``. Overruled: these labels are static furniture read once, so label read-time is not the binding cost, while a second spelling is permanent and is what `theme/vocabulary/03`'s one-spelling invariant catches. `[cid: decided]`

## https://www.roblox.com/games/123639373205511/Pressure-Wash-Incremental

*Cited by 2: `gameplay/meta/_lead`, `theme/fantasy/_lead`*

- **Two sibling incrementals advertise area unlocking and publish no counts.** Pressure Wash Incremental: "[🌎] Unlock New Islands". Leaves Incremental: "Unlock new areas and discover rare leaf types" — and its Roblox page reported "There are currently no running experiences", i.e. zero live servers at fetch time. Content volume in this family is not publicly stated by its own store listings.

## https://www.roblox.com/games/129774084106862/Scrap-Incremental

*Cited by 2: `theme/vocabulary/02-banned-words`, `theme/vocabulary/_lead`*

- **`relic` is another game's word for a different thing.** `Scrap Incremental` ships *"Roll rare Relics to power up your journey!"* and a *"unique 'Relic' system"*; `Faith Incremental` ships *"✨ Relics"* as a named collectible beside Faith and Souls. In both, a relic is a **rolled multiplier item**. This game's is a discovered, non-rolled, set-structured collectible. Using the word imports the wrong mental model and reads as a clone in the store listing.
- `tier` is `Scrap Incremental`'s named progression system, so it is banned as a player-facing label while remaining fine as an internal field name.

## https://www.roblox.com/games/70698000296435/Artifacts

*Cited by 2: `theme/vocabulary/02-banned-words`, `theme/vocabulary/_lead`*

- **Substitutes were checked and are also occupied.** `artifact` is a shipping Roblox title with *"70+ artifacts to collect"*; `antique` belongs to `reStore`.

## https://www.roblox.com/games/94264573845314/Faith-Incremental

*Cited by 2: `theme/vocabulary/02-banned-words`, `theme/vocabulary/_lead`*

- **`relic` is another game's word for a different thing.** `Scrap Incremental` ships *"Roll rare Relics to power up your journey!"* and a *"unique 'Relic' system"*; `Faith Incremental` ships *"✨ Relics"* as a named collectible beside Faith and Souls. In both, a relic is a **rolled multiplier item**. This game's is a discovered, non-rolled, set-structured collectible. Using the word imports the wrong mental model and reads as a clone in the store listing.

## https://www.rolimons.com/game/124374448373637

*Cited by 2: `gameplay/monetization/01-the-offer-ladder`, `gameplay/monetization/_lead`*

- *Retracting my own argument, in the open.** The first draft argued three products because "three is the smallest count that puts one product at each corroborated rung" and because two would leave `rung` with an unused value. That was argued against a market spread and not against `meta/04`'s lap table, which did not exist yet. It is wrong, and the corrected reading is that **`rung` has two unused values now and that is a cost worth paying.** One live pass is corroborated as shipping: Carpet Cleaning Simulator ships exactly one, at 1,499, across 28M visits ``. And "the smallest game that…
- **`Carpet Cleaning Simulator`** (28,261,668 visits) is the smallest ladder found and the counter-example to "more rungs is safer": **exactly one live pass, "VIP Cleaner - Lifetime Pass" at 1,499 Robux**, with three currency packs (Starter, Pro, Mega Cash) taken offsale and their prices no longer listed. ``

## https://www.rolimons.com/game/94264573845314

*Cited by 2: `gameplay/monetization/01-the-offer-ladder`, `gameplay/monetization/_lead`*

- *499, restated without the ladder-ratio clause it no longer has.** 499 is the top of the corroborated premium band and the observed ceiling of both Faith and DIG `` `` ``. The two single-item comparables sit above it — Carpet Cleaning at 1,499, and the reference's own oversized tool at 2,500 `` — and both bands were declined on `00-CORE.md` grounds, because the only argument either source gives for them is revenue concentration. `[cid: decided]`
- **`Faith Incremental`**, the same `X Incremental` family, ships **18 live passes** across a 20-fold range: 25 (Pray Anywhere), 25 (3x Bible Collection Radius), 25 (Auto Drain Spirits), 49 (2x Walkspeed), 59 six times, 69 twice, 99 four times, 139, and 499 (5x Walkspeed), at 10,262,143 visits and 321 CCU. **Floor 25, median 59, ceiling 499** — and note that a *second* rung of the same multiplier (2x then 5x walkspeed at 49 then 499) is how this family builds a premium rung without inventing a new axis. ``
- **The axis-matched read across those five, which is the directly usable finding:** the same multiplier sells across two orders of magnitude and **the axis does not set the price, the rung does.** Radius/reach ships at 25 (Faith's 3x Bible Collection Radius), 299 (Pressure Wash's Ultra Circle Nozzle) and 2,500 (Grass's [OP] Giant Trimmer, which `research/grass-incremental.md` identifies as a radius upgrade and the whale item). Move speed ships at 29 (Grass), 49 and 499 (Faith's 2x and 5x) and 199 (Pressure Wash). Currency value ships at 59 (Faith), 199 (Grass), 249 (DIG) and 399 (Pressure…

## https://www.rolimons.com/gamebadge/2794455631182407

*Cited by 2: `gameplay/meta/04-the-depth-ladder`, `gameplay/meta/_lead`*

- **The measured genre asymmetry says even that is thin, and it is why I take the largest legal area count rather than the smallest.** DIG ships two islands against a 601-item logbook ``, and finishing one *area's* journal there is a 0.4% event across 60,426 and 78,433 earners `` ``. Few areas, a very large collection, and completion is rare. This game is on the wrong side of that on both axes and the partition equality only lets me fix one. See `## Flagged to the developer`.
- **Finishing one area's collection is a 0.4% event in a shipping game.** DIG's badge "Journal Complete: Cinder Shores" — "You have discovered 100% of the items in Cinder Shores!" — has 60,426 earners at a 0.4% win rate, and "Journal Complete: Mount Cinder" has 78,433 at 0.4%. These are per-*area* completions, not the full 601-item index.

## https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html

*Cited by 2: `art/lighting/02-the-readability-floor`, `art/lighting/_lead`*

- *The metric ruling, and the finding it exposes.** The approved floor is **Rec.601 luma**, `Y = 0.299R + 0.587G + 0.114B` on gamma-encoded sRGB, and it stays authoritative. WCAG 1.4.11 asks a graphical object for *"a contrast ratio of at least 3:1 against adjacent color(s)"* on sRGB **relative luminance**, `L = 0.2126R + 0.7152G + 0.0722B`, over **linearised** channels ``. **Different quantities; one does not imply the other.** Redone against real hues:

## https://www.w3.org/WAI/WCAG21/Understanding/use-of-color.html

*Cited by 2: `art/ui-art/05-pressable-states-and-affordability`, `art/ui-art/_lead`*

- *The prohibition exists and the channel did not.** `input.pressable.affordabilityByColourAlone` is `false`; `composition.copy` supplies the words `Ready` / `Short` / `Max` on `ReadoutState` with `primaryChannel: "text"` and `colourIsSecondaryOnly: true`; nothing anywhere named the visual signal, so shipped code invented `" Buy"` / `" Need"` / `"Max"` suffixes marked `[STOP: no value in the contract]` (category gaps `G8` / `H5`). The general form of the rule is WCAG SC 1.4.1: *"Color is not used as the only visual means of conveying information, indicating an action, prompting a response, or…
- `https://www.w3.org/WAI/WCAG21/Understanding/use-of-color.html` — SC 1.4.1, normative: *"Color is not used as the only visual means of conveying information, indicating an action, prompting a response, or distinguishing a visual element."* Sheet 05's general form of the brief's `[brief: soft]`-but-effectively-binding accessibility constraint. ``

## https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html

*Cited by 2: `ui-ux/feedback/01-the-notice-channel`, `ui-ux/feedback/_lead`*

- *A correction to my own domain index, worth making because a builder would otherwise cite the wrong source.** WCAG SC 2.2.2 governs *"any moving, blinking or scrolling information"* that lasts more than five seconds ``. A static plate is outside its scope entirely, so 2.2.2 does not set my dwell. What it does settle is the **motion** ruling: `response` `R5`–`R6` forbid providing a pause or dismiss control, so a moving notice would breach 2.2.2 with no legal remedy available — which is why `motion.animated` is false rather than merely discouraged. The 5.0 s ceiling itself is the platform's…
- `` — SC 2.2.2: *"any moving, blinking or scrolling information that (1) starts automatically, (2) lasts more than five seconds, and (3) is presented in parallel with other content"* needs a pause/stop/hide mechanism. `response` `R6` forbids providing one. **So a notice is static and its dwell has a five-second ceiling, derived rather than chosen** — this is 01's and 02's anchor.

## https://about.roblox.com/newsroom/2025/11/roblox-requires-age-checks-limits-minor-and-adult-chat

*Cited by 1: `liveops/community/_lead`*


## https://about.roblox.com/newsroom/2026/07/how-in-game-reporting-works-on-roblox

*Cited by 1: `liveops/community/_lead`*


## https://about.roblox.com/newsroom/2026/07/major-updates-in-game-reporting-tools

*Cited by 1: `liveops/community/_lead`*


## https://about.roblox.com/reporting-and-blocking

*Cited by 1: `liveops/community/_lead`*


## https://apis.roblox.com/search-api/omni-search?searchQuery=

*Cited by 1: `theme/fantasy/_lead`*

- **A complete Roblox catalogue sweep for the reclaim-a-ruin fantasy.** `[unverified]` Roblox search is client-rendered and could not be fetched; a `roblox.com`-restricted web search returns indexed pages, not the catalogue. **The fetch that would settle it:** the omni-search endpoint (`https://apis.roblox.com/search-api/omni-search?searchQuery=...`) or the authenticated games-search API, over *overgrown*, *reclaim*, *ruin restoration*, *vines*, *moss*, *relic index*. Until then this is the same grade of evidence as `landscape.md`'s rust and cobweb rows and must not be reported as a clear…

## https://apis.roblox.com/universes/v1/{universeId}/places/{placeId}/versions?versionType=Published

*Cited by 1: `tech/deploy/_lead`*


## https://blizzardwatch.com/2020/03/23/hearthstones-duplicate-protection-new-player-experience-completely-change-game/

*Cited by 1: `gameplay/systems/05-the-find-ledger`*

- **Scoping it per set is the same idea at the right width.** `` — "you won't see a duplicate until you own every card of that rarity", guaranteed independently per rarity; four sets of six is that shape. That source keys exclusion on *ever-owned*, because disposal would otherwise be a re-roll.

## https://bloxboom.com/blog/roblox-system-requirements

*Cited by 1: `tech/performance/_lead`*

- **The official Roblox mobile minimum specification.** `https://en.help.roblox.com/hc/en-us/articles/203625474-Roblox-Mobile-System-Requirements` returned HTTP 403 on direct fetch and the Fandom mirror returned HTTP 402. Search snapshots of the official page give iOS 14 / iPadOS 14 and iPhone 6s class, Android 8.0 with OpenGL ES 3.0; a dated secondary (`https://bloxboom.com/blog/roblox-system-requirements`, 2025-05-21) gives iOS 11 / Android 5.0 and 2 GB RAM, which **contradicts the snapshot on both OS versions**. `[unverified]`. The fetch that settles it is that help-centre article from a…

## https://bloxg.com/statistics/roblox-retention-benchmarks

*Cited by 1: `gameplay/onboarding/_lead`*

- Genre benchmarks: simulator D1 32%, D7 14%, D30 6.2%, "from 850+ promoted games | Updated March 2026" — the highest D1 of the eight genres listed, attributed to progression loops ``. Recorded as context only: `00-CORE.md` makes beating the retention curve an explicit non-goal, so **no sheet of mine may argue from retention.** The three-times-reinforcement claim above is likewise context, not licence — this game has one recurring event to reinforce with.

## https://bloxinformer.com/wikis/dig/cinder-island/

*Cited by 1: `gameplay/meta/_lead`*

- **DIG (56M visits, 119,871 peak CCU) ships two islands.** "So far there are only 2 Islands in the game, with more to come with the official release of the game." Its first island is subdivided into named regions (Cinder Shores, Cinder Cavern, Mount Cinder) with four further sub-regions inside the cavern — Azure Hollow, Monks Shrine, Solstice Shrine, Spiders Keep — so *area* count is small and *place* count inside an area is large.

## https://bloxinformer.com/wikis/dig/islands

*Cited by 1: `gameplay/meta/_lead`*

- **DIG (56M visits, 119,871 peak CCU) ships two islands.** "So far there are only 2 Islands in the game, with more to come with the official release of the game." Its first island is subdivided into named regions (Cinder Shores, Cinder Cavern, Mount Cinder) with four further sub-regions inside the cavern — Azure Hollow, Monks Shrine, Solstice Shrine, Spiders Keep — so *area* count is small and *place* count inside an area is large.

## https://carpet-cleaning-simulator.wiki/guides/how-to-play/

*Cited by 1: `theme/fantasy/01-fantasy-of-record`*

- *Carpet Cleaning Simulator's loop is repeatable contracts plus rebirth**: *"Accept job → clean all required zones → collect payment → upgrade gear → unlock harder jobs"*, with rebirth from level 50 ``. At ~26.6M visits in a quarter ``, that is a much larger game delivering before-and-after revelation far more often than this one can, precisely *because* nothing it cleans stays clean. **Promising revelation is promising the thing an occupant delivers better** — my domain index's rule 6, applied.

## https://code.tutsplus.com/numbers-getting-bigger-the-design-and-math-of-incremental-games--cms-24023a

*Cited by 1: `gameplay/balance/_lead`*

- **The cost-curve canon, and its limits.** `Price = BaseCost × Multiplier^(#Owned)`; Clicker Heroes uses 1.07 across all 35 heroes, every Cookie Clicker building uses 1.15, AdVenture Capitalist's ten businesses each sit between 1.07 and 1.15, and Steam's *Monster* goes as high as 2.5; "the curves produced between those bounds are balanced and satisfying" ``. Corroborated with `cost_next = cost_base × rate_growth^owned`, AdVenture Capitalist's Lemonade Stand at `rate_growth = 1.07, cost_base = 4`, and the exponential-cost-versus- polynomial-income framing ``. **The caveat is load-bearing:**…

## https://create.roblox.com/docs/environment/skybox

*Cited by 1: `art/environment/_lead`*

- **What Roblox renders when no `Sky` instance exists in `Lighting`.** Three searches returned only forum threads; no official page states it. Marked `[unverified]` — it decides whether 05's cheapest option (ship nothing) is a bright default day sky or an untextured void, and it is the difference between a free answer and a six-asset one. **The fetch that would settle it:** `https://create.roblox.com/docs/environment/skybox` (the `docs/environment/sky` path 404s), or a Studio observation on an empty baseplate with `Lighting` emptied.

## https://create.roblox.com/docs/physics/network-ownership

*Cited by 1: `tech/security/_lead`*

- `https://create.roblox.com/docs/physics/network-ownership` — "the server always owns anchored BaseParts and you cannot manually change their ownership" (this is why `Plots.luau:263`'s `Anchored = true` closes the patch-manipulation surface); "Roblox cannot verify physics calculations when a client has ownership over a BasePart."

## https://create.roblox.com/docs/production/earn-on-roblox

*Cited by 1: `gameplay/monetization/_lead`*

- **Recorded once so nobody re-derives it, and used for nothing:** "Creators generally earn 70% of anything they sell in Robux in their game", and DevEx converts 10,000 Robux to $38 USD. Revenue is a declined non-goal, so no sheet in this domain may turn a price into an earnings argument. ``

## https://create.roblox.com/docs/production/game-design/content-updates

*Cited by 1: `liveops/roadmap/_lead`*

- **Roblox's own live-ops taxonomy and cadence guidance.** *"A content cadence is the regular release of new content updates…"*; *"Spending fewer than three weeks' effort on content cadence is recommended"*; *"Many games release content cadence updates every two weeks to one month"*; a routine cadence *"encourages players to check back often"* and helps players *"anticipate the next release"* ``. LiveOps is *"two interweaving content types"* — **events** (*"temporary activities"*) and **content updates** (*"significant permanent game updates that expand or deepen the core loop"*); it gives…

## https://create.roblox.com/docs/production/game-design/liveops-planning

*Cited by 1: `liveops/roadmap/_lead`*

- **Roblox's own live-ops taxonomy and cadence guidance.** *"A content cadence is the regular release of new content updates…"*; *"Spending fewer than three weeks' effort on content cadence is recommended"*; *"Many games release content cadence updates every two weeks to one month"*; a routine cadence *"encourages players to check back often"* and helps players *"anticipate the next release"* ``. LiveOps is *"two interweaving content types"* — **events** (*"temporary activities"*) and **content updates** (*"significant permanent game updates that expand or deepen the core loop"*); it gives…

## https://create.roblox.com/docs/production/monetization/subscriptions

*Cited by 1: `liveops/seasons/_lead`*

- 3. **A paid track has no vehicle, and the platform's only recurring one is forbidden by name.** Ruling **R-4** removed the in-game store: `products.storeExists: false`, `itemCount: 1`, `devProductCount: 0`, `gamePassId: null`, `promptGamePassPurchaseCalls: 0`, `F19` forbidding a product being *"named, shown, priced or referred to anywhere inside the game"*, and `F15` closing text entry by grep. `F18` forbids *"subscription… recurring charge"*, and Roblox's own subscriptions are *"auto-renewing, not one-time purchases"* `` — so the one platform product that recurs on a period is the one…
- **Roblox subscriptions are recurring by construction** — *"auto-renewing, not one-time purchases"*, benefits persist only while payment is maintained, mutually exclusive subscriptions are not supported, local-currency subscriptions require an ID- or phone-verified account and are unavailable in eleven listed countries. This is the only platform vehicle for a paid track that expires, and `products` `F18` bans it by name. ``

## https://create.roblox.com/docs/production/promotion/chat-settings

*Cited by 1: `gameplay/social/_lead`*

- **Whether `TextChatService` has an experience-level enable/disable distinct from `ChatWindowConfiguration.Enabled`, and how Roblox's age-based communication settings interact with an 8–14 audience.** Four fetches returned property lists with no defaults and no policy text. `[unverified]` The fetch that would settle it is Roblox's chat *policy* page rather than its API reference — `https://create.roblox.com/docs/production/promotion/chat-settings` or the parental-controls documentation — plus the `TextChatService` page rendered with its default column. Sheet `01` should decide the chat…

## https://create.roblox.com/docs/production/promotion/deeplinking

*Cited by 1: `liveops/codes/_lead`*

- **A redemption path that needs no text entry exists, and it is documented.** Deep-link launch data: *"the LaunchData key contains the string that you specified in the launchData parameter"*, read via `Player:GetJoinData()`, *"can't exceed 200 bytes"*, and *"Users can modify the URL, so the data might not be authentic"* ``

## https://create.roblox.com/docs/production/promotion/experience-events

*Cited by 1: `liveops/events/_lead`*

- 1. https://create.roblox.com/docs/production/promotion/experience-events — the platform *does* have a scheduled-events system, which is the fact that stops this ruling resting on *"the mechanism does not exist."* It does exist, at the platform level, and what closes it is scope and the binding non-goal. Verified against the creator-docs source at https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/production/promotion/experience-events.md — *"Currently, you can publish a maximum of 10 ongoing or upcoming events"*, *"The best events run for 7-30 days and highlight…

## https://create.roblox.com/docs/production/promotion/experience-guidelines

*Cited by 1: `liveops/community/_lead`*


## https://create.roblox.com/docs/production/promotion/social-media-links

*Cited by 1: `liveops/community/_lead`*


## https://create.roblox.com/docs/production/publishing

*Cited by 1: `liveops/community/_lead`*

- **Whether a creator can see reports filed inside their own experience (G-C2).** `[unverified]` — three official pages describe the report flow and none mentions a creator role, which supports the weak form (*no creator report queue is documented*) and not the strong form (*none exists*). **Settling fetch:** `https://create.roblox.com/docs/production/publishing` and the Creator Hub moderation documentation rendered with its left-hand navigation; failing that, the open developer feature request *"Roblox should give developers access to the in-game reporting system"* checked for a staff…

## https://create.roblox.com/docs/projects/server-authority

*Cited by 1: `tech/security/_lead`*

- **`Workspace.AuthorityMode = "Server"`.** Roblox ships a server-authority model in which "the server is the single source of truth" and movement validation moves off the client, which is precisely what sheet 01 hand-rolls ``. **I am not speccing it**: it requires `NextGenerationReplication`, `PlayerScriptsUseInputActionSystem`, `SignalBehavior` Deferred, `UseFixedSimulation` and `StreamingEnabled`, all of which are place configuration, and place configuration with no script path is the residue the category routed to publish-time checklist work [currently Build & Deploy]. It would also…
- `https://create.roblox.com/docs/projects/server-authority` — the model, and its five Workspace prerequisites, quoted in "Considered and not assigned" above.

## https://create.roblox.com/docs/reference/engine/classes/AssetService#CreateEditableImageAsync

*Cited by 1: `art/lighting/_lead`*

- 1. **Every `Lighting` property default.** The API reference page documents types, not defaults, so the thirteen unstated properties' current effective values are `[unverified]`. `01` must state its values absolutely and never as *"the default"*. → *fetch:* `https://create.roblox.com/docs/reference/engine/classes/Lighting` rendered with the property-default column, or read the defaults off a fresh baseline place in Studio. 2. **Which lighting-style value a new place gets, and the migration's status.** A search returned secondary reports (a devforum announcement thread and two Fandom mirrors)…

## https://create.roblox.com/docs/reference/engine/classes/DataStoreService

*Cited by 1: `tech/persistence/_lead`*

- `https://create.roblox.com/docs/reference/engine/classes/DataStoreService` — `GetRequestBudgetForRequestType(requestType)` exists and returns the current budget; `Enum.DataStoreRequestType` members appearing in the samples are `StandardRead`, `StandardWrite`, `StandardList`, `StandardRemove`, `SetIncrementAsync`.

## https://create.roblox.com/docs/reference/engine/classes/Player

*Cited by 1: `liveops/codes/_lead`*

- A second one: group membership is readable with no prompt and no input. `Player:IsInGroup` and `Player:GetRankInGroup` are **deprecated** in favour of `IsInGroupAsync` / `GetRankInGroupAsync`; neither form requires player input ``

## https://create.roblox.com/docs/reference/engine/classes/Players

*Cited by 1: `tech/deploy/_lead`*


## https://create.roblox.com/docs/reference/engine/classes/Players#BanAsync

*Cited by 1: `liveops/community/_lead`*


## https://create.roblox.com/docs/reference/engine/classes/Sky

*Cited by 1: `art/environment/_lead`*

- `https://create.roblox.com/docs/reference/engine/classes/Sky` — a `Sky` carries six `ContentId` skybox faces (`SkyboxUp/Dn/Lf/Rt/Ft/Bk`), plus `CelestialBodiesShown`, `StarCount`, `MoonTextureId`, `SunTextureId`, `SunAngularSize` and `SkyboxOrientation`. Enough for 05 to cost a skybox and to state a zero-asset configuration.

## https://create.roblox.com/docs/reference/engine/classes/SoundService

*Cited by 1: `audio/ambient/_lead`*

- **A reverb or space sheet.** `SoundService.AmbientReverb` is a real global with real audible reach ``, but it colours **every** sound in the game including all five beats. That is a mix-bus decision by construction and it belongs to `mix`. Named here so nobody reads its absence as an oversight, and routed rather than taken.

## https://create.roblox.com/docs/reference/engine/classes/StarterPlayer

*Cited by 1: `art/characters/_lead`*

- 1. `https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/studio/avatar-settings.md` — the three Avatar Type options verbatim; the not-accessible-with-scripts sentence; and, **new to this project, the Body tab**: `Custom Scale` with a settable Minimum/Maximum absolute height in studs, `Custom Build`, and the ~5 / ~6–6.5-stud reference heights. Independently confirms `tech/deploy/01`'s rig rows rather than inheriting them. 2. `https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/characters/appearance.md` — body scaling is `height / width / head / body…

## https://create.roblox.com/docs/reference/engine/classes/Stats

*Cited by 1: `tech/networking/_lead`*


## https://create.roblox.com/docs/reference/engine/classes/TextChatService#ChatVersion

*Cited by 1: `tech/deploy/_lead`*

- *Could not verify, marked `[unverified]` for the writer:** whether `TextChatService.ChatVersion` can be *read* from a server script post-migration. The deprecation notice confirms the property still exists on the class but no page I retrieved states its runtime read behaviour under compatibility mode, and the architect's "no reliable read" is an assertion I could neither confirm nor overturn. The fetch that would settle it is the full property detail on `https://create.roblox.com/docs/reference/engine/classes/TextChatService#ChatVersion` with the deprecation panel expanded, or a devforum…

## https://create.roblox.com/docs/reference/engine/classes/UnreliableRemoteEvent

*Cited by 1: `tech/networking/_lead`*


## https://create.roblox.com/docs/reference/engine/enums/SafeAreaCompatibility

*Cited by 1: `ui-ux/platform/_lead`*

- `Enum.ScreenInsets` = `None` (0), `DeviceSafeInsets` (1), `CoreUISafeInsets` (2), `TopbarSafeInsets` (3); `CoreUISafeInsets` keeps descendants clear of the Roblox top bar and of device cutouts. `Enum.SafeAreaCompatibility` = `None` (0), `FullscreenExtension` (1). `` ``

## https://create.roblox.com/docs/resources/feature-packages/season-passes

*Cited by 1: `liveops/seasons/_lead`*

- *The strongest counter-argument, found rather than assumed.** Roblox ships a **first-party Season Passes feature package**: *"a limited-time, quest-based progression system"* with free and premium tracks, tiers carrying an `upperBoundXP` threshold, `startUtc`/`endUtc` driving a season countdown, a game-pass id for premium access, and DataStore-backed XP, requiring the Core and Missions packages alongside it ``. **So the build cost of a season here is genuinely low, and the sheet must say so rather than imply the opposite.** It is still not takeable, and the package's own component list is…
- **Roblox's first-party Season Passes feature package** — *"a limited-time, quest-based progression system in which players can complete quest objectives to earn rewards"*, free and premium tracks, tiers with an `upperBoundXP` threshold, `startUtc`/`endUtc` driving a season countdown, a game-pass id for premium access, DataStore-backed XP, and a hard dependency on the Core and Missions packages. The docs do **not** state what happens to progress at season end, which is itself worth recording: the package's own carry-over behaviour is unspecified on the page I read. ``

## https://create.roblox.com/docs/scripting/security/security-tactics

*Cited by 1: `tech/security/_lead`*

- `https://create.roblox.com/docs/scripting/security/security-tactics` — "The server must be the ultimate source of truth"; exploiters can "Fire or invoke RemoteEvents and RemoteFunctions at any frequency with arbitrary arguments (besides the first Player argument)"; "Never trust the client".

## https://create.roblox.com/docs/ui/proximity-prompts

*Cited by 1: `gameplay/mechanics/02-verb-roster`*

- *The documented press-verb alternative stays on the shelf.** A `ProximityPrompt` is directly tappable on a phone "regardless of the `ClickablePrompt` property's value" and auto-displays the right glyph per input type ``, but it is anchored to a world object and therefore carries the same travel cost as the pad.

## https://create.roblox.com/docs/ui/selection

*Cited by 1: `ui-ux/navigation/_lead`*

- *Could not fetch:** `https://create.roblox.com/docs/ui/selection` returned 404, and the rendered `GuiObject` and `GuiService/SelectedObject` reference pages returned member lists without their descriptions. Routed around via the creator-docs YAML and the API announcement above.

## https://deltiasgaming.com/roblox-grass-incremental-codes/

*Cited by 1: `liveops/codes/_lead`*

- A codes aggregator maintaining a page *for this exact game* and reporting **no active codes as of March 2026** — a codes site with an empty list for a 38M-visit incremental ``

## https://devforum.roblox.com/t/action-needed-upcoming-changes-to-asset-privacy-for-audio/1701697

*Cited by 1: `audio/music/_lead`*

- Audio privacy: since 22 March 2022 uploaded audio over 6 seconds is private to its uploader, with per-experience permissions grantable; only audio of 6 seconds or less can be made public. **Consequence the category has not stated: a Creator Store music or long-form asset already has a live id, so it does not pass through an upload gate at all** — which bears directly on `G2` (Mix's missing provisioning gate) and on whether a sentinel is needed for a long asset. ``

## https://devforum.roblox.com/t/balancing-exponential-upgrade-progression/2434950

*Cited by 1: `gameplay/balance/_lead`*

- **Negative evidence, recorded so nobody re-searches it.** Two Roblox DevForum threads on simulator cost curves give ad-hoc formulas (`value = 6*level^3`, `price = steepness^rebirth`) and explicitly **no** multipliers, level-span guidance, income-to-cost ratios or time-to-afford targets; the advice given is "use desmos … to see what you like" `` ``. **There is no Roblox-native cost-curve convention to cite.** Every cost figure in `03` is therefore `[playtest unknown]` by necessity, not by laziness.

## https://devforum.roblox.com/t/chat-in-places-with-chatversion-as-legacychatservice-broken-completely/3904561

*Cited by 1: `tech/deploy/_lead`*

- *Could not verify, marked `[unverified]` for the writer:** whether `TextChatService.ChatVersion` can be *read* from a server script post-migration. The deprecation notice confirms the property still exists on the class but no page I retrieved states its runtime read behaviour under compatibility mode, and the architect's "no reliable read" is an assertion I could neither confirm nor overturn. The fetch that would settle it is the full property detail on `https://create.roblox.com/docs/reference/engine/classes/TextChatService#ChatVersion` with the deprecation panel expanded, or a devforum…

## https://devforum.roblox.com/t/full-release-build-cross-platform-ui-with-the-viewportdisplaysize-api/3880384

*Cited by 1: `ui-ux/platform/_lead`*

- `GuiService.ViewportDisplaySize` (`Small`/`Medium`/`Large`) exists and is the platform's own device-class instrument. ``

## https://devforum.roblox.com/t/how-would-i-go-about-making-a-index-like-find-the-markers/1715824

*Cited by 1: `gameplay/systems/05-the-find-ledger`*

- **The record shape.** `` — the Roblox-native finite index is a per-item boolean with the UI derived from it, never stored. `Persistence.luau:124` already holds `found = {}` as `{[string]: boolean}` ``. Under this pool that shape is **correct rather than defective**: it cannot express a duplicate, and no duplicate exists.

## https://devforum.roblox.com/t/incorrect-size-of-data-being-sent-limit-specified-when-using-unreliableremoteevent/3048788

*Cited by 1: `tech/networking/_lead`*


## https://devforum.roblox.com/t/jungle-ruins-looking-for-feedback-and-suggestions/1192396

*Cited by 1: `theme/fantasy/_lead`*


## https://devforum.roblox.com/t/let-there-be-unified-light-unified-lighting-is-fully-live/3401512

*Cited by 1: `art/lighting/_lead`*

- 1. **Every `Lighting` property default.** The API reference page documents types, not defaults, so the thirteen unstated properties' current effective values are `[unverified]`. `01` must state its values absolutely and never as *"the default"*. → *fetch:* `https://create.roblox.com/docs/reference/engine/classes/Lighting` rendered with the property-default column, or read the defaults off a fresh baseline place in Studio. 2. **Which lighting-style value a new place gets, and the migration's status.** A search returned secondary reports (a devforum announcement thread and two Fandom mirrors)…

## https://devforum.roblox.com/t/mousebutton2-is-not-a-valid-member-of-enumkeycode/2888739

*Cited by 1: `art/ui-art/_lead`*

- 1. **Whether `(Enum.Font :: any)["MerriweatherBold"]` throws or returns `nil`.** The creator docs are silent; forum evidence shows the error form *"X is not a valid member of Enum"* (`https://devforum.roblox.com/t/mousebutton2-is-not-a-valid-member-of-enumkeycode/2888739`, `https://devforum.roblox.com/t/uitheme-is-not-a-valid-member-of-enum/2472340`), which implies an error and therefore that `UIBuilder.luau:482`'s `or Enum.Font.Gotham` fallback never runs. **`[unverified]`.** Settled by one line in Studio: `print(pcall(function() return (Enum.Font :: any).MerriweatherBold end))`. **Sheet 03…

## https://devforum.roblox.com/t/roblox-audio-api-exits-beta-enhanced-sound-controls-now-available/3153454

*Cited by 1: `audio/ambient/_lead`*


## https://devforum.roblox.com/t/setcore-sendnotification-help/764252

*Cited by 1: `ui-ux/feedback/_lead`*

- `` — the platform's own notification system: `MAX_NOTIFICATIONS = 3`, `DEFAULT_NOTIFICATION_DURATION = 5`, and an active queue plus an overflow queue that promotes on expiry. A shipped precedent for 02's concurrency question, and evidence that "5 seconds" is the platform's default rather than my invention ``.

## https://devforum.roblox.com/t/simulator-formulas/853976

*Cited by 1: `gameplay/balance/_lead`*

- **Negative evidence, recorded so nobody re-searches it.** Two Roblox DevForum threads on simulator cost curves give ad-hoc formulas (`value = 6*level^3`, `price = steepness^rebirth`) and explicitly **no** multipliers, level-span guidance, income-to-cost ratios or time-to-afford targets; the advice given is "use desmos … to see what you like" `` ``. **There is no Roblox-native cost-curve convention to cite.** Every cost figure in `03` is therefore `[playtest unknown]` by necessity, not by laziness.

## https://devforum.roblox.com/t/tycoon-button-system/1923669

*Cited by 1: `gameplay/mechanics/02-verb-roster`*


## https://devforum.roblox.com/t/uitheme-is-not-a-valid-member-of-enum/2472340

*Cited by 1: `art/ui-art/_lead`*

- 1. **Whether `(Enum.Font :: any)["MerriweatherBold"]` throws or returns `nil`.** The creator docs are silent; forum evidence shows the error form *"X is not a valid member of Enum"* (`https://devforum.roblox.com/t/mousebutton2-is-not-a-valid-member-of-enumkeycode/2888739`, `https://devforum.roblox.com/t/uitheme-is-not-a-valid-member-of-enum/2472340`), which implies an error and therefore that `UIBuilder.luau:482`'s `or Enum.Font.Gotham` fallback never runs. **`[unverified]`.** Settled by one line in Studio: `print(pcall(function() return (Enum.Font :: any).MerriweatherBold end))`. **Sheet 03…

## https://devforum.roblox.com/t/update-the-userownsgamepassasync-cached-value-when-promptgamepasspurchasefinished-fires/369425

*Cited by 1: `tech/networking/_lead`*


## https://en.help.roblox.com/hc/en-us/articles/203625474-Roblox-Mobile-System-Requirements

*Cited by 1: `tech/performance/_lead`*

- **The official Roblox mobile minimum specification.** `https://en.help.roblox.com/hc/en-us/articles/203625474-Roblox-Mobile-System-Requirements` returned HTTP 403 on direct fetch and the Fandom mirror returned HTTP 402. Search snapshots of the official page give iOS 14 / iPadOS 14 and iPhone 6s class, Android 8.0 with OpenGL ES 3.0; a dated secondary (`https://bloxboom.com/blog/roblox-system-requirements`, 2025-05-21) gives iOS 11 / Android 5.0 and 2 GB RAM, which **contradicts the snapshot on both OS versions**. `[unverified]`. The fetch that settles it is that help-centre article from a…

## https://en.help.roblox.com/hc/en-us/articles/360000245263-Appeal-Your-Content-or-Account-Moderation

*Cited by 1: `liveops/community/_lead`*

- **"Only the owner of an account may send an appeal."** `[unverified]` — this reached me through a search summary and **not** through a page I fetched. `https://en.help.roblox.com/hc/en-us/articles/360000245263-Appeal-Your-Content-or-Account-Moderation` returns **HTTP 403** to this tool, as does every `en.help.roblox.com` article I attempted (three). I substituted `about.roblox.com/community-standards` for the Community Standards article successfully, and `about.roblox.com/safety` for the appeals article **unsuccessfully** — it describes reporting and blocking and says nothing about…

## https://en.wikipedia.org/wiki/Basilica_Cistern

*Cited by 1: `theme/setting/02-extent`*

- The Basilica Cistern is *"336 marble columns, each 9 metres high, arranged in 12 rows of 28 columns each spaced 5 metres apart"*, described as *"a forest of 336 marble columns"*, holding 80,000 m³. ``

## https://en.wikipedia.org/wiki/Grow_a_Garden

*Cited by 1: `theme/fantasy/_lead`*


## https://en.wikipedia.org/wiki/Terrace_(agriculture

*Cited by 1: `theme/setting/02-extent`*

- Terracing is by definition serial: *"platforms are created successively down the terrain in a pattern that resembles the steps of a staircase"*, walled, and used to manage runoff. `` Cited for the landform practice only; nothing here farms anything.

## https://ffrostfall.net/stuff/list/remoteevents/

*Cited by 1: `tech/networking/_lead`*


## https://fisch.fandom.com/wiki/Bestiary

*Cited by 1: `theme/fantasy/_lead`*

- **Fisch** (~4.5bn visits, ~90%, 1.2M+ peak CCU): the Bestiary is *"a detailed, in-game logbook that records the different types of fish and items fishers have caught"*, with per-page completion rewards and thresholds at 70% and 100%. `` ``

## https://fischipedia.org/wiki/Bestiary

*Cited by 1: `theme/fantasy/_lead`*

- **Fisch** (~4.5bn visits, ~90%, 1.2M+ peak CCU): the Bestiary is *"a detailed, in-game logbook that records the different types of fish and items fishers have caught"*, with per-page completion rewards and thresholds at 70% and 100%. `` ``

## https://gamerant.com/roblox-garden-incremental-codes/

*Cited by 1: `liveops/codes/_lead`*

- The contrary case, and it is the useful one because it prices the reversal: a shipping incremental that **does** have codes, redeemed by *"click on the Shop button… Scroll down until you see the line where you can enter codes, or click the Codes button… Enter the promo code… Click on the Redeem button"* — **four surfaces this game does not have**: a store node (`navigation.notNodes[shop]`, R-4), a fifth pressable (`input.gameDrawnPressables: 4`), a text field (`screens.elementTree` has none), and a submit control (a sixth) ``

## https://generalistprogrammer.com/tutorials/roblox-game-pass-pricing-guide

*Cited by 1: `gameplay/monetization/_lead`*

- **Two independent third-party pricing guides agree on the rung structure**, which is the only corroboration available for "impulse to whale" as a shape: impulse **"25 - 75"** / **"25–75 R$ — reflex buy"**; mid **"99 - 249"** / **"100–250 R$ — considered buy"**; premium **"249 - 499"** / **"400–1,000+ R$ — commitment buy"**; and a whale band of **"999 - 4,999"**. One adds that round numbers (100, 250, 500) perform marginally better than charm prices on Roblox. `` ``

## https://github.com/Roblox/creator-docs/blob/main/content/en-us/characters/appearance.md

*Cited by 1: `theme/identity/_lead`*

- **A developer can override that for everyone.** Studio's File > Avatar Settings *"apply globally to all player character models joining your game"*, with per-spawn override via `LoadCharacterWithHumanoidDescription` / `ApplyDescription`. `` A role that requires a uniform is technically possible; it is an art and cost question, not a platform blocker. Sheet 02 should know the option exists and that exercising it lands in someone else's unfunded slot.

## https://github.com/Roblox/creator-docs/blob/main/content/en-us/characters/index.md

*Cited by 1: `theme/identity/_lead`*

- **Players arrive as their own avatar by default.** *"By default, all players join games as their saved Roblox avatar, which already includes all the components for an avatar character."* ``

## https://github.com/Roblox/creator-docs/blob/main/content/en-us/characters/name-health-display.md

*Cited by 1: `theme/identity/_lead`*

- **Names display above heads by default and default to the account Display Name.** *"Roblox displays a name and/or health bar above that part"*; *"By default, a humanoid's display name matches the user's Roblox account Display Name which is unique and separate from their account Username."* Suppressible entirely with `DisplayDistanceType = None`. ``

## https://github.com/Roblox/creator-docs/blob/main/content/en-us/scripting/events/remote.md

*Cited by 1: `tech/networking/_lead`*


## https://github.com/Roblox/creator-docs/blob/main/content/en-us/scripting/scheduler.md

*Cited by 1: `tech/performance/_lead`*

- `https://create.roblox.com/docs/scripting/scheduler` — `task.wait` *"yields the current thread until the given duration (in seconds) elapses and then resumes the thread on the next Heartbeat step."* Verbatim, and mirrored at `https://github.com/Roblox/creator-docs/blob/main/content/en-us/scripting/scheduler.md`. **The second load-bearing source for 02**: with the 60 FPS cap it gives the quantisation rule.

## https://machinations.io/articles/an-in-depth-look-at-gacha-boxes

*Cited by 1: `gameplay/systems/05-the-find-ledger`*

- **The configuration I am avoiding has a name and a documented history.** `` — complete gacha, a set-completion reward laid over a random draw, makes the *last* member of each set the bottleneck, cites the coupon collector's problem, and in its paid form was declared illegal in Japan. Four sets of six with a bonus on each completion is that unless the pool is bounded.

## https://prospecting.miraheze.org/wiki/Quests

*Cited by 1: `theme/fantasy/_lead`*


## https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/characters/appearance.md

*Cited by 1: `art/characters/_lead`*

- 1. `https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/studio/avatar-settings.md` — the three Avatar Type options verbatim; the not-accessible-with-scripts sentence; and, **new to this project, the Body tab**: `Custom Scale` with a settable Minimum/Maximum absolute height in studs, `Custom Build`, and the ~5 / ~6–6.5-stud reference heights. Independently confirms `tech/deploy/01`'s rig rows rather than inheriting them. 2. `https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/characters/appearance.md` — body scaling is `height / width / head / body…

## https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/luau/enums.md

*Cited by 1: `art/ui-art/_lead`*

- `https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/luau/enums.md` — fetched specifically to settle what an invalid Enum index does. **It does not say.** Recorded as a negative result rather than left implied.

## https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/production/game-design/core-loops.md

*Cited by 1: `gameplay/core-loop/_lead`*


## https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/production/game-design/onboarding.md

*Cited by 1: `gameplay/onboarding/_lead`*

- Roblox's own FTUE guidance defines onboarding as "the first few minutes of gameplay that new players experience", sets three goals — teach the essentials (both controls and the core loop, and both *what* to do and *why*), get to the fun quickly because "New players typically decide their interest in a game within minutes", and leave players wanting more via short/mid/long goals plus "moments of joy" — and measures it with Day 1 retention and a player funnel that shows drop-off at each step. It offers "a guided arrow" as an alternative to dialogue and **states no time threshold at all** `` ``

## https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/production/promotion/experience-events.md

*Cited by 1: `liveops/events/_lead`*

- 1. https://create.roblox.com/docs/production/promotion/experience-events — the platform *does* have a scheduled-events system, which is the fact that stops this ruling resting on *"the mechanism does not exist."* It does exist, at the platform level, and what closes it is scope and the binding non-goal. Verified against the creator-docs source at https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/production/promotion/experience-events.md — *"Currently, you can publish a maximum of 10 ongoing or upcoming events"*, *"The best events run for 7-30 days and highlight…

## https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/production/promotion/social-media-links.md

*Cited by 1: `liveops/community/_lead`*


## https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/studio/avatar-settings.md

*Cited by 1: `art/characters/_lead`*

- 1. `https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/studio/avatar-settings.md` — the three Avatar Type options verbatim; the not-accessible-with-scripts sentence; and, **new to this project, the Body tab**: `Custom Scale` with a settable Minimum/Maximum absolute height in studs, `Custom Build`, and the ~5 / ~6–6.5-stud reference heights. Independently confirms `tech/deploy/01`'s rig rows rather than inheriting them. 2. `https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/characters/appearance.md` — body scaling is `height / width / head / body…

## https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/ui/

*Cited by 1: `ui-ux/navigation/_lead`*

- *`[unverified]`, and it matters to `02`:** whether a `GuiObject` with `Active = true` sinks a **touch tap** identically to a mouse click on a phone. The YAML says only *"sinks input"*. The fetch that would settle it is `https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/ui/...` for the input propagation page, or a Studio device-emulator test on a phone viewport. Sheet `02` must not assume the two are the same, because the whole of (a) turns on it for ~70% of the audience.

## https://roblox.fandom.com/wiki/Pink_Slime_Studios/Lawn_Mowing_Simulator

*Cited by 1: `theme/fantasy/_lead`*


## https://robloxapi.github.io/ref/class/SoundService.html

*Cited by 1: `audio/mix/_lead`*

- `SoundService` defaults: `RolloffScale` 1, `DistanceFactor` 3.33, `DopplerScale` 1, `AmbientReverb` `NoReverb`, `VolumetricAudio` `Automatic`, `RespectFilteringEnabled` false, `ReverbEnabled` true, `OcclusionEnabled` true, `DiffractionEnabled` true `` ``.

## https://rolearn.dev/guidance/first-week-retention-optimization/

*Cited by 1: `gameplay/onboarding/_lead`*

- Vendor-published benchmarks, useful as direction and **not as measured data** — treat the numbers as claims by parties selling retention services. Simulator-specific: "If it is a simulator, they should be clicking, collecting, and seeing numbers go up before the first minute ends"; comparison points of an obby jumping within 10 seconds and a tycoon placing a first machine within 30; "A 15-second mandatory cutscene … can cost you 5% of all new players before they ever touch a control"; "Every second of non-gameplay in the first five minutes costs you roughly 2-3% of your new player cohort" ``

## https://sol-rng.fandom.com/wiki/Collection

*Cited by 1: `theme/vocabulary/_lead`*

- **`Sol's RNG`'s screen name, first-party** — `https://sol-rng.fandom.com/wiki/Index` returned **HTTP 402**; the *"Collection"* naming is a search summary of `https://sol-rng.fandom.com/wiki/Collection`. **The fetch that would settle it:** that page, or an in-game screenshot. It matters because it is the evidence `index` is free.

## https://sol-rng.fandom.com/wiki/Index

*Cited by 1: `theme/vocabulary/_lead`*

- **`Sol's RNG`'s screen name, first-party** — `https://sol-rng.fandom.com/wiki/Index` returned **HTTP 402**; the *"Collection"* naming is a search summary of `https://sol-rng.fandom.com/wiki/Collection`. **The fetch that would settle it:** that page, or an in-game screenshot. It matters because it is the evidence `index` is free.

## https://steamcommunity.com/app/1290000/discussions/0/3112530528185447905/

*Cited by 1: `gameplay/core-loop/_lead`*


## https://steamcommunity.com/app/1290000/discussions/0/5069383987784255569/

*Cited by 1: `gameplay/core-loop/_lead`*


## https://store.steampowered.com/app/3164790/Overgrown_Cleaner/

*Cited by 1: `theme/fantasy/01-fantasy-of-record`*

- *And the subject matter itself is not novel off-platform.** `Overgrown Cleaner` (Steam) ships clearing overgrowth to reveal *"buried walls and fences"* and *"buried paths"*, with *"Salvageable scrap, Repairable parts, Strange but useful leftovers"* that are sold or crafted, and **no promise anywhere that cleared ground stays cleared**, and no logbook ``. **This qualifies my own index**, which reported *"no shipping game found"* for the reclaim-overgrowth fantasy after four Roblox-scoped searches: the subject matter exists, off-platform, with the finds as *materials*. It does not contest…

## https://www.creation.dev/templates/tycoon-template

*Cited by 1: `gameplay/mechanics/02-verb-roster`*


## https://www.gamedeveloper.com/design/the-math-of-idle-games-part-i

*Cited by 1: `gameplay/balance/_lead`*

- **The cost-curve canon, and its limits.** `Price = BaseCost × Multiplier^(#Owned)`; Clicker Heroes uses 1.07 across all 35 heroes, every Cookie Clicker building uses 1.15, AdVenture Capitalist's ten businesses each sit between 1.07 and 1.15, and Steam's *Monster* goes as high as 2.5; "the curves produced between those bounds are balanced and satisfying" ``. Corroborated with `cost_next = cost_base × rate_growth^owned`, AdVenture Capitalist's Lemonade Stand at `rate_growth = 1.07, cost_base = 4`, and the exponential-cost-versus- polynomial-income framing ``. **The caveat is load-bearing:**…

## https://www.gamerefinery.com/the-complete-guide-to-mobile-game-gachas-in-2022/

*Cited by 1: `gameplay/systems/05-the-find-ledger`*

- **Draw-without-replacement is a shipped, named mechanic.** `` — the box gacha, a prize "permanently removed from the gacha prize pool", no currency anywhere in the mechanism.

## https://www.roblox.com/games/126244816328678/DIG

*Cited by 1: `theme/fantasy/_lead`*

- **DIG** (DIG Development, 28 June 2025): *"Uncover and collect hidden treasures, explore a massive open world..."* **56,030,218 visits, 89.3% likes (101,475 up / 12,115 down), all-time peak 119,871 CCU.** Its Collection is *"a detailed in-game logbook"* of 601 items, and **completing a zone unlocks Mounts** — structurally the brief's set-completion bonus. `` `` ``

## https://www.roblox.com/games/1345139196/Treasure-Hunt-Simulator

*Cited by 1: `theme/fantasy/_lead`*


## https://www.roblox.com/games/7009799230/Pressure-Wash-Simulator

*Cited by 1: `theme/fantasy/_lead`*


## https://www.roblox.com/games/93445850351820/Ore-Incremental

*Cited by 1: `theme/vocabulary/_lead`*

- **`Ore Incremental`'s relic wording** — `[unverified]`, search summaries only (a pass granting *"2x luck when opening relics"*). `robipedia.com/game/ore-incremental-6722298074` returned **HTTP 403**. **The fetch that would settle it:** the description and pass list at `https://www.roblox.com/games/93445850351820/Ore-Incremental`, or its pass list on `rolimons.com`. Two family games are already confirmed by direct fetch, so this is redundancy, not the basis of the finding.

## https://www.roblox.com/games/99397872893294/Concrete-Cleaning-Simulator

*Cited by 1: `theme/fantasy/_lead`*


## https://www.robloxgo.com/game/113380129609386/Leaves-Incremental

*Cited by 1: `gameplay/monetization/_lead`*

- 1. **`Leaves Incremental` and `Scrap Incremental` price lists — unavailable after four attempts of three kinds.** Rolimons returned HTTP 404 for both place ids (`113380129609386`, `92876036717311`, `129774084106862`); the legacy `games.roblox.com/v1/games/8974089723/game-passes` returned 404 for the universe id resolved from `apis.roblox.com/universes/v1/places/113380129609386/universe`; and robloxgo carries the game but no store section. **Materiality is low**: robloxgo reports Leaves at **53,468 visits** ``, three orders of magnitude below the other samples, so it is a weak price reference…

## https://www.robloxgo.com/game/124374448373637/Carpet-Cleaning-Simulator

*Cited by 1: `theme/fantasy/_lead`*


## https://www.robloxgo.com/game/1345139196/Treasure-Hunt-Simulator

*Cited by 1: `theme/fantasy/_lead`*


## https://www.robloxgo.com/game/87179205054038/reStore

*Cited by 1: `theme/fantasy/_lead`*


## https://www.rolimons.com/game/7009799230

*Cited by 1: `gameplay/monetization/_lead`*

- **`Pressure Wash Simulator`**, cleaning-and-restoration shaped and the largest game sampled at 141,055,601 visits, ships **7 passes with a floor of 199**: 199 (Extra Jump Height), 199 (Double Speed), 299 (Ultra Circle Nozzle), 399 (Double Money), 399 (Jetski), 699 (The ONE), 799 (Infinity Tank). ``

## https://www.treyexgaming.com/bring-back-the-sun-ancient-ruins-walkthrough-guide/

*Cited by 1: `theme/fantasy/_lead`*


## https://www.u4gm.com/fish-it/blog-ancient-ruins-ancient-jungle-guide-fish-it

*Cited by 1: `theme/fantasy/_lead`*


<!-- APPEND NEW RESEARCH BELOW THIS LINE -->

## https://www.gamerefinery.com/the-complete-guide-to-mobile-game-gachas-in-2022/

*Fetched by the wave-2 research pass for: duplicate finds in a finite collection with no convert-to-currency sink.*

- **Draw-without-replacement is a shipped, named mechanic: the box gacha.** Exact wording: *"Box gachas have a limited prize pool, so players don't have to worry about receiving duplicate prizes. Every time a prize is rewarded, it's permanently removed from the gacha prize pool, increasing the chances of obtaining rarer prizes."* This is the direct fit for a 24-object roster in 4 sets of 6 — scope the pool to one area's six, remove each on discovery, and a repeat cannot occur inside that area at all. **No currency is involved anywhere in the mechanism**: the fix lives in the draw, not in what a duplicate converts to.
- **Pity is the weaker fallback and is also named:** *"pity gachas guarantee rewards once players have pulled the gacha a certain number of times."* It does not remove duplicates, it only bounds the worst case. Correct choice only if the pool must stay with-replacement for pacing reasons.
- **Step-up gacha stages the guarantee positionally:** *"players progressing through multiple gacha stages known as steps that provide increasing rewards with every new gacha spin,"* with *"guaranteed rewards at specific pulls, such as a certain character or item on the third or fifth pull."* That is the shape of a depth-gated set — the guarantee is attached to the Nth find, not to a random roll.
- The page enumerates no duplicate-into-shards conversion and no wishlist mechanism, so it is not evidence for the option the brief already declined.

## https://blizzardwatch.com/2020/03/23/hearthstones-duplicate-protection-new-player-experience-completely-change-game/

*Fetched by the wave-2 research pass for: duplicate finds in a finite collection with no convert-to-currency sink.*

- **"Mark a set's remaining members as the only draws" is a shipped rule with a name: duplicate protection.** Exact wording: *"When you open a card pack, it will be full of cards you don't have in your collection. You won't see a duplicate until you own every card of that rarity."* Shipped 26 March 2020 with Ashes of Outland.
- **It is scoped per partition, not across the whole collection.** The rule already covered Legendary cards; the 2020 update extended it to every rarity, each rarity guaranteed independently. A roster partitioned into 4 sets of 6 is the same shape — guarantee no-repeat *within a set*, which keeps each set's final find a real event without making all 24 a single linear queue.
- **The exclusion set keys on ever-owned, not currently-held:** *"Any cards you disenchant count toward the duplicate protection. You won't see that disenchanted card from a pack until you have all cards of that rarity."* Deliberate design: disposing of an item does not get it re-offered. If artifacts can ever leave this game's collection (donated, restored away, traded), the pool must be computed from discovery history or disposal becomes a re-roll exploit.

## https://game8.co/games/Genshin-Impact/archives/301611

*Fetched by the wave-2 research pass for: duplicate finds in a finite collection with no convert-to-currency sink.*

- **"A duplicate upgrades the existing entry" is a shipping mechanism, and the upgrade token is deliberately not a currency.** Exact wording: *"the following duplicates you get from wishes automatically turns to Masterless Starglitters **and a Stella Fortuna for that character**."* A Stella Fortuna is bound to the one character that was duplicated and unlocks that character's next Constellation level. It is non-fungible and cannot be spent on anything else.
- **That binding is what keeps the mechanism inside this brief's constraint.** Duplicate-to-shards adds a fungible resource, which is a currency, which the brief declined. A duplicate that deepens *the specific thing you found again* adds no resource at all — the artifact's own record improves (condition tier, a second detail on its card, a restored variant). Same anti-frustration effect, no second economy.
- **Take only half of Genshin's mechanism.** It also pays a fungible Masterless Starglitter alongside the per-character token. That fungible half is exactly the thing ruled out; the per-item half is the transferable part.

## https://devforum.roblox.com/t/how-would-i-go-about-making-a-index-like-find-the-markers/1715824

*Fetched by the wave-2 research pass for: duplicate finds in a finite collection with no convert-to-currency sink.*

- **The Roblox-native idiom for a finite world-placed collection makes duplicates impossible by construction.** Each collectible is a distinct object placed once, and collection state is a **per-item boolean**. In the accepted answer that boolean is a Roblox Badge checked with `UserHasBadgeAsync`: *"if badge_service:UserHasBadgeAsync(game.Players.LocalPlayer.UserId, id) then local ui = game.Players.LocalPlayer.PlayerGui.Markers:FindFirstChild(name)"*. Encountering a collected item again writes the same value, so no duplicate ever exists to resolve.
- **The index UI is derived from those booleans, never stored separately.** The answer keeps one table mapping item name → badge id and loops it to show or hide each slot's indicator. A 24-slot index over 4 sets of 6 is the same structure: 24 booleans, display a pure function of them.
- **The cost of this shape is that a re-visit yields nothing.** It removes the duplicate problem by removing the second draw entirely — correct for a one-shot world placement, wrong for a repeatable dig. So it constrains the *discovery source*; it does not solve duplicates inside a repeatable one.
- Provenance limit: this thread demonstrates a single collectible as its example and does not state the game's total roster size. The "320 markers" figure appeared only in search snippets and was not fetched.

## https://machinations.io/articles/an-in-depth-look-at-gacha-boxes

*Fetched by the wave-2 research pass for: duplicate finds in a finite collection with no convert-to-currency sink.*

- **A caution aimed squarely at "4 sets of 6".** The page names *complete gacha* (kompu gacha), where players *"collect a set of basic items in order to create a rarer item. While it was easy to gain the first few times, it became increasingly unlikely that each new gacha box bought would complete the set."* Set-completion rewards make the *last* member of each set the bottleneck, and the page cites the coupon collector's problem by name as the governing math. The tail is where all the pain lives.
- **In its paid form the mechanism was regulated out of existence:** the page states Japan's Consumer Affairs Agency declared the system illegal. That ruling concerns paid gacha and does not bind a play-earned collection, but it is the strongest available evidence that *set completion layered over a random draw* is the frustrating configuration — and that is the configuration this game currently has. Per-set draw-without-replacement is what defuses it.
- Scope limit: the page describes gacha boxes as having *"a scaling factor of money spent to percentage drop potential"* and does **not** enumerate box-gacha, pity, or duplicate-conversion variants. For those, cite the GameRefinery entry above instead.

## https://www.creation.dev/templates/tycoon-template

*Fetched by the wave-2 research pass for: how a phone player spends currency in a Roblox incremental/simulator.*

- **The walk-into purchase pad is the genre's standard purchase verb, not a workaround.** The page describes button pads as *"invisible triggers placed around the tycoon base. When a player steps on one and has enough cash, it deducts the cost and spawns the associated upgrade,"* and files them under Core Mechanics as foundational to *"every successful tycoon game on Roblox."*
- **The whole implementation, stated concretely:** *"a transparent part, a BillboardGui showing the price, and an attribute storing the cost and the model it unlocks. When stepped on, the script checks the player's cash, deducts the cost, makes the purchased model visible, and destroys the button pad."* The price readout is world-space BillboardGui, so it needs no HUD pattern and does not depend on ui-forge.
- **This makes purchase a movement-only verb.** Walk onto the pad, pay, effect applies — no key, no tap, no menu, and therefore byte-identical on keyboard, touch and gamepad. It dissolves the standing contradiction between a control scheme stated as "movement only" and an audience that is mobile-majority.
- Provenance caveat: creation.dev is a third-party template guide, not Roblox's official documentation. It is corroborated by the devforum thread below, which shows the same pattern in a working script.

## https://devforum.roblox.com/t/tycoon-button-system/1923669

*Fetched by the wave-2 research pass for: how a phone player spends currency in a Roblox incremental/simulator.*

- **Working confirmation that a tycoon buy button is a physical world part driven by `Touched`.** The poster's script connects `v.ButtonPart.Touched:Connect(function(Hit)` and, on contact, checks that the toucher owns the tycoon, that the button is visible and collidable, and that the player has enough money before completing the purchase. Those four checks are the entire server-side purchase guard.
- **Availability is gated by the pad's own existence, not by a disabled state.** Buttons start at `Transparency = 1` with `CanCollide = false` and become visible and collidable only once their prerequisite purchase is made. A pad the player has not unlocked is simply not there to walk into, so no greyed-out button and no error string is needed.
- Honest limit on this source: the thread does **not** itself claim the Touched-pad is the standard, and a second responder prefers driving pads from `Changed` on dependency values over direct `Touched` detection. It is evidence the pattern works and is widely used, not evidence that it is the only pattern.

## https://create.roblox.com/docs/ui/proximity-prompts

*Fetched by the wave-2 research pass for: how a phone player spends currency in a Roblox incremental/simulator.*

- **The cross-platform alternative, from Roblox's own docs: a ProximityPrompt is tappable on a phone with zero extra work.** *"if a user is using a phone or a tablet, they can always interact with the proximity prompt by directly clicking the proximity prompt regardless of the `ClickablePrompt` property's value."* Prompts also *"Display the correct input for all input types, such a keyboard, gamepad, and touchscreen keys."* One object covers keyboard, gamepad and touch with no per-platform branch.
- **Its tuning knobs are exactly the ones a purchase needs.** `MaxActivationDistance` *"allows you to define the range from around the ProximityPrompt object that activates the visibility of the proximity prompt"*; `RequiresLineOfSight` shows it only on a clear camera path and *"By default, this property is set to true"*; `HoldDuration` *"determines how many seconds a user has to press a key before the proximity prompt's action triggers"* — a non-zero hold is the standard guard against an accidental purchase.
- **It costs one verb.** A prompt is press-to-confirm, so adopting it means the control scheme is no longer movement-only. The pad is strictly cheaper against that constraint; the prompt is the right answer only if a purchase needs an explicit confirm step.
- Scope limit: the page's stated use cases are *"doors, light switches, and buttons"* — it does not name buying. Its applicability to purchase follows from the input model, and is not asserted on the page.

## Wave-2 research pass — what was and was not settled

**Question 1 — duplicates without a currency:** Four distinct shipping mechanisms were found, none of which adds a resource. (1) **Draw without replacement** — GameRefinery's box gacha, where a pulled item is *"permanently removed from the gacha prize pool"*; scoped per area this makes a repeat impossible inside a set. (2) **Exclusion until the partition is complete** — Hearthstone's duplicate protection, *"you won't see a duplicate until you own every card of that rarity"*, guaranteed per-rarity, which maps cleanly onto per-set. (3) **The duplicate deepens the specific entry** — Genshin's Stella Fortuna, bound to the one character duplicated and explicitly non-fungible. (4) **Impossible by construction** — the Roblox world-placed/badge index, a per-item boolean where a second encounter is a no-op. The evidence points one way: (1) is the primary answer and (2) is the same idea at a wider scope, so they compose; (3) is the anti-frustration layer if the pool must stay repeatable; (4) only applies if discovery is one-shot world placement. One warning worth carrying: complete-gacha (set completion layered over a random draw) is the configuration that drew both player backlash and a regulator's ban, and it is the configuration a 4-sets-of-6 completion reward creates unless the draw is bounded.

**Question 2 — phone purchase:** Yes — the walk-into purchase pad is a common idiom, and specifically the *defining* purchase verb of the Roblox tycoon family. It is described as foundational to *"every successful tycoon game on Roblox"*, and a working devforum script confirms the mechanism is a `Touched` event on a world part with the cash check server-side. Because it is triggered by walking, it is input-agnostic by construction: it satisfies "movement only" and serves keyboard, touch and gamepad players with one code path, no HUD pattern and no ui-forge dependency. The alternatives in descending fit: a **ProximityPrompt** (Roblox docs confirm phones can always tap it directly and it auto-displays the correct glyph per input type, but it adds a press verb); an **on-screen HUD button** (works everywhere, needs a `pressable` readout ui-forge does not have, which is the project's existing known gap); a **tap-opened shop screen** (most surface area, worst fit for movement-only). The current keyboard `1`/`2`/`3` binding is the one option with no mobile path at all.

**Not settled:**
- **The ~70% mobile figure is not corroborated by anything fetched.** The Roblox-tycoon overview reached (endsights.com/roblox-tycoon-games) says tycoons are the second-largest share of average concurrent players on Roblox behind obbies and run on *"mid-range phones"*, but gives no platform split. The fetch that would settle it: Roblox's quarterly investor supplemental at `investor.roblox.com`, which breaks DAU down by platform.
- **Genshin's constellation cap (six levels) and what a post-maximum duplicate converts to are unverified.** Those appeared only in search snippets; the game8 fetch did not state them and `https://genshin-impact.fandom.com/wiki/Constellation` returned HTTP 402. The fetch that would settle it: the official HoYoverse support page for Constellations, or a non-Fandom mirror of that wiki page.
- **No shipping *Roblox* game was found that resolves duplicates in a finite collection without a currency.** Every Roblox collection idiom reached either makes duplicates impossible (one-shot world placement) or sells them. All four mechanisms above are non-Roblox precedents except (4). The fetch that would settle it: the index/bestiary wiki page of a Roblox game with a finite roster and a stated repeat rule — Fisch's fish index is the obvious candidate and was not attempted.
- **Three pages were unreachable and their claims are covered by substitutes:** `roblox.fandom.com/wiki/Tycoon` (HTTP 402), `hearthstone.fandom.com/wiki/Card_pack` (HTTP 402), and PC Gamer's duplicate-protection article (returned navigation chrome only). Only the Fandom Tycoon page's verbatim genre definition is genuinely missing; the mechanism it would state is already sourced above.
