# Store UI — domain index

**Category:** UI/UX · **Wave:** 5 · Reads: `CONCEPT.md`, `00-CORE.md`, `01-FOUNDATION.md`,
`02-GAMEPLAY.md`, `03-META.md`, `04-PRESENTATION.md`, `OPEN.md`, `HANDOFF.md` ·
`cid/ui-ux/_category.md` · `cid/_state.md` · `cid/_contract.md` ·
`cid/gameplay/monetization/01-the-offer-ladder.md`, `/02-what-is-never-sold.md`,
`/03-purchase-headroom.md` · `game/src/server/Entitlements.luau`, `game/src/shared/Modifiers.luau`

**Contract keys I own today: none.** `cid/_contract.md` lists 25 keys and no UI/UX key exists in
`bridge/schema.mjs` (grepped: `offerSurface`, `composition`, `screens`, `navigation`, `notices`,
`viewport` — zero matches). I propose one key, `offerSurface`. I could not run
`npm run bridge -- --contract` myself — no shell in this session — so I read the derived
`cid/_contract.md`, which `npm run cid:leadpack` regenerates from that same schema.

---

## What the brief gave me

- *"**Permanent multipliers only. Never content access.**"* — `03-META.md`
  `[you accepted: R5 Q4]` → **`[brief: soft]`**. Read together with its stated reason, *"a
  paid-only object would turn 100% completion into a purchase, which poisons the differentiating
  system"*, which is why the forbidden half is treated as effectively hard.
- *"**Forbidden:** any paid area, relic, or set."* — `03-META.md`, same tag → **`[brief: soft]`**.
  Presentation consequence: no surface may show a locked slot carrying a price, a paywalled set
  heading, or a purchase that fills the index.
- *"Deriving the full screen set is UI's job. Likely implied by the systems chosen:"* followed by
  the four-row table whose fourth row is `` | `shop` | 2 | the multiplier SKUs | `` —
  `04-PRESENTATION.md`, **untagged** → **`[brief: soft]`**, and now false. See gap S1.
- *"Target: the **smallest game that still gives every creative area real work.**"* — `00-CORE.md`
  `[you chose: R1 Q3]` → **`[brief: binding]`**. A surface does not exist so that this domain has
  something to draw.
- *"**There is no failure state.** … **Zero tension is deliberate.**"* — `02-GAMEPLAY.md`
  `[you accepted: step 6 Q2]` → **`[brief: soft]`**. No countdown, no scarcity, no "are you sure",
  and no red state on a purchase path.
- *"**8–14, mobile-heavy, short sessions.**"* — `00-CORE.md` `[you chose: R1 Q4]` →
  **`[brief: binding]`**. A substantial share of that band is under 13 on the platform. See gap S5.
- *"**Note the tension:** with no whale-tool ladder equivalent decided, the high-price SKU has no
  obvious home yet."* — `03-META.md`, and `OPEN.md §6` *"The premium SKU has no home."* Closed by
  `products` (one pass, `Span`), not by me. Recorded because it is the only monetization item the
  brief left open and it is not a presentation item.
- **`products`** (`gameplay/monetization/01`, proposed): `storeExists: false`;
  `purchaseSurface: "the Roblox experience page. The game draws no store, no shop screen, no offer
  row and no purchase control of any kind (coordinator ruling R-4)"`;
  `prompt.promptGamePassPurchaseCalls: 0`; `items[0].gamePassId: null` with an
  `externalPrerequisite` block naming the developer. `F19` forbids a product being *"named, shown,
  priced or referred to anywhere inside the game"*; `F20` forbids purchase-derived state in
  persistence; `F10`–`F15` forbid the timer, the scarcity claim, the discount, the prompt, the
  beat interruption and the code box **anywhere in the game**. All `[brief: soft]` at root, hardened
  by ruling R-4 `[cid: decided]` at the coordinator level.
- **`input`** (`gameplay/mechanics/02`): five verbs, no sixth; `gameDrawnPressables: 4`;
  `rejectionCueOnFailedPrecondition: "none"`. A store control would need a fifth verb.
- **`vocabulary`** (`theme/vocabulary/02`): `casing: "title"`, `maxLabelChars: 14`,
  `allowedPattern: "^[A-Za-z0-9 ,.'%%/-]+$"`, banned `relic relics tier artifact antique rebirth
  loot treasure`. Binding on every string either sheet writes — of which the correct number is zero.
- **Scope gate.** `03-META.md` priority 3 excludes *"codes · daily rewards · seasons and events"*;
  priority 2 holds *"richer authored chunk variety · a duplicate-handling refinement · visitable
  restored ruins"* `[I assumed — the ordering]` → `[brief: soft]`, hard as a gate.
  **`shop` sits at priority 2 in the screen table**, so even without R-4 it is outside the first
  shippable version and not mine to reserve space for. Neither list mentions a store or a pass at
  all, which is gap S6.

---

## What the brief did not give me

| # | gap | routed to |
|---|---|---|
| S1 | **The brief's screen table still lists `shop`, and nothing on disk says it is gone rather than unbuilt.** `04-PRESENTATION.md` is untagged here, R-4 deleted the row, and verification will otherwise read the absence as an omission. | **01** — as an explicit deletion record, not a silence |
| S2 | **The brief never distinguishes a purchase *surface* from a purchase *trigger*.** *"Never content access"* constrains what is sold; it says nothing about whether the game may raise the platform's own prompt with nothing drawn around it. `products.F13` now answers no, but the brief's silence is why that answer must be stated as data rather than inferred. | **01** |
| S3 | **A player can pay and see nothing happen, and every surface that would explain it is forbidden.** `cid/_state.md` build note 4 + G11. The brief has no failure state, so it never contemplated a purchase that has not landed yet. **Bar (a): a player would notice.** | **02** |
| S4 | **Nothing states what a player sees when an ownership read fails.** `Entitlements.luau` warns once to the console and resolves to NOT OWNED, with the comment *"the worst case for an owner is one session at the base radius, corrected by rejoining."* That is a player-visible outcome with no player-visible rule. Adjacent to G2 (error and system copy) without being it. | **02** |
| S5 | **No spend guard exists for the under-13 share of an 8–14 audience.** `monetization/02` recorded it, declined to invent one, and said *"if you want one, it belongs on the experience page, not in this key."* Under R-4 the game draws no purchase surface to guard, so this is not an in-game presentation question. | **not a sheet** — store-listing and experience-page copy work (wave 7), and the developer |
| S6 | **Monetization has no priority slot.** `03-META.md`'s three lists contain neither a store nor a pass; the only place a store is ranked is the screen table row that R-4 deleted. Raised by `monetization/01` and unresolved. | **not a sheet** — scope-ordering work |

---

## Lead ruling: R-4, F19 and F20 are jointly satisfiable, and G11 closes without a surface

I am ruling on scope, not writing the sheet. The fact base is fetched, not reasoned.

Build note 4 states the defect as *"a mid-session pass purchase does not apply until rejoin"* and
concludes that the only remedy is a surface `F19` forbids. **The first clause is not what the
platform does.** Roblox's own reference source for `MarketplaceService` says of
`UserOwnsGamePassAsync`: *"The results of this function are cached so that repeated calls are
returned faster"*; when the purchase prompt closes *"the cache gets updated to reflect the latest
ownership state of the associated game pass"*; and — the line that matters —

> *"If the user purchases a game pass outside of the experience while remaining in the same
> session, the cache is eventually updated, but this process might take several minutes to
> propagate."*
> `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/reference/engine/classes/MarketplaceService.yaml]`

So an experience-page purchase **does** become visible to a re-read inside the same session. What
the shipped build lacks is not a surface; it is a **second read**. `Entitlements.refresh` runs at
`wiring.onJoin` step 2 and nowhere else, so `state.owned` is a snapshot of join time
(`game/src/server/Entitlements.luau`). Re-resolving ownership during the session, applying the
factor silently, and publishing the existing `StateChanged` snapshot violates nothing: it draws no
surface (R-4), names, shows and prices nothing (`F19`), and writes nothing to the save payload
(`F20` — a live re-read is the opposite of persisting). It also takes no control from the player,
which `response.controlEverAffected: false` requires, and it is in register, because `theme/tone/03`
`B4` already forbids a notice for an upgrade purchase. **The smallest closure is a re-read, not a
message.**

Two things this ruling does not do. It does not set the interval, the retry shape or the rate-limit
budget — those are ownership-resolution values behind `products.ownershipCheck`, and sheet 02 states
them as a requirement on that subject. And it does not reopen the prompt: `F13` and R-4 stand.
Worth naming honestly, though, is the cost R-4 buys with them — the in-experience prompt is the one
mechanism the platform documents as updating the cache *immediately*, so forbidding it converts an
instant application into a several-minute one. That is a second cost of R-4 alongside the discovery
cost `monetization/01` already recorded, and nobody has stated it. `[cid: decided]` that it is a
cost worth recording; the ruling itself is not mine to reverse.

---

## Why 2 sheets

One key, one sheet: `offerSurface` is a single value and sheet 01 supplies it. The second sheet
exists because *"which surfaces may carry an offer"* and *"what the player sees between paying and
the pass working"* are two decisions, not one described twice — the first is spatial and is answered
by an enumeration, the second is temporal and is answered by a rule about a gap in time, and a
builder reading one has no use for the other. Sheet 02 is the non-value sheet the rules allow
sparingly, and it is justified by a key **I** own: without it, `offerSurface`'s empty set is only
defensible if a player never has a reason to ask why nothing happened. It carries no manifest of its
own — its rows are the value of `offerSurface.pendingPurchase`, supplied inside sheet 01, the same
arrangement `monetization/02` and `/03` use against `products`. There is no third sheet because
*shop layout*, *product card anatomy*, *price display*, *confirmation and receipt flow* and *offer
placement and timing* are all one answer — the empty set — and splitting one answer across five
headings would be five sheets that say nothing five times.

**Boundary against `products`, so the merger sees no collision:** `products` answers *whether a
store exists and whether a prompt is called*. `offerSurface` answers *which of UI/UX's enumerated
surfaces may carry an offer, and what a purchase in flight looks like on screen*. `offerSurface`
cites `products.storeExists`, `products.purchaseSurface` and `F13`/`F19`/`F20` as `closedBy` and
restates none of their values.

| # | sheet | must decide |
|---|---|---|
| 01 | `no-in-game-offer-surface` | Supply `offerSurface` as an explicit per-surface deny list, one row for each in-game surface this game has — collection count readout, currency readout, area progress bar and label, the three upgrade readouts, `Pressable_BUY1/2/3`, `Pressable_INDEX`, the collection index panel, the find reveal, the area-completion notice, the set-completion notice, the row-lift and denominator-lift moments, the pre-first-snapshot join state, and error or system copy — each row stating that the surface may not present, name, price or trigger a purchase, naming the ruling that closes it (R-4, `F19`, `F13`, `input`'s five closed verbs) and a checkable observable a grep or an instance count can run; state that the offer lives on exactly one path, the Roblox experience page's own pass listing, and that that path is outside every surface this contract describes; record `04-PRESENTATION.md`'s `shop` screen-table row as **deleted by ruling, not deferred**, so verification reads a decision and not an omission; state `promptGamePassPurchaseCalls: 0` and that this covers the surfaceless-trigger case the brief never ruled on; and carry sheet 02's rows in the same manifest under `pendingPurchase`. Write zero player-facing strings — the correct count is zero, and say so as a field rather than by omitting one. |
| 02 | `when-a-purchase-applies` | Decide what the player sees between paying for `Span` on the experience page and the factor taking effect, and supply it as `offerSurface.pendingPurchase` inside sheet 01's manifest (this sheet carries no manifest of its own, and must say so in one line). The answer is that nothing appears on any surface: no notice, no readout change that announces itself, no rejoin instruction, no "purchase pending" state, and no cue distinguishing a not-yet-propagated purchase from not owning — which `F19`, `theme/tone/04` `D12` and `input.rejectionCueOnFailedPrecondition: "none"` jointly force. State the requirement that makes that survivable rather than negligent: ownership must be re-resolved server-side **during** the session and not only at `wiring.onJoin` step 2, applied silently through the existing state snapshot, with nothing persisted (`F20`); the interval, retry shape and rate-limit budget are a stated requirement on ownership-resolution work behind `products.ownershipCheck` and are set nowhere in this domain. Decide the same question for the failure case in `Entitlements.luau` — an owner whose ownership check failed plays at the base radius and is shown nothing — and give it the same answer or a different one, explicitly. Carry the several-minute propagation window from the platform reference as the bound the rule is written against, and mark the acceptable in-session detection latency `[playtest unknown]` with a test range. |

---

## Verification note

**Sheet 02 is the one most likely to be contradicted.** Three directions:

1. **Ownership-resolution work** (owner of `products.ownershipCheck`; today `gameplay/monetization`
   with the module in the technical contract) may refuse an in-session re-read on rate-limit
   grounds — `Entitlements.luau` already argues, correctly, that *"a retry loop on the join path is
   how a MarketplaceService outage turns into a room of players with no character."* A periodic
   re-read is a different shape from a join-path retry, but the refusal is legitimate and would
   revise sheet 02, not sheet 01.
2. **Transient-message work** (today Feedback UI) holds gap G2, error and system copy. If it rules
   that an error surface exists, sheet 02's "shown nothing" for the failed-read case has to be
   re-checked against it. The purchase-adjacent half is mine; the surface is theirs.
3. **Join and session-sequencing work in the technical contract** may already have a place for a
   second `refresh` call, or may not have one, and `wiring.onJoin` is not a CID artifact.

Sheet 01 is unlikely to be contradicted and likely to be *cited*: it is the row every other UI/UX
lead needs in order to write "no purchase control here" without deciding it themselves.

## Research owed

**My graph node carries no `must_verify`.** I fetched anyway, because sheet 02 cannot justify itself
on reasoning alone and the writer has no fetch tools.

**Fetched and usable:**

- `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/reference/engine/classes/MarketplaceService.yaml]`
  — the source `create.roblox.com`'s `MarketplaceService` page is generated from. Supplies, verbatim:
  `UserOwnsGamePassAsync` results are cached; the cache updates when the purchase prompt closes; an
  out-of-experience purchase in the same session propagates *"but this process might take several
  minutes"*; and *"When a user first enters a server after purchasing a game pass, this functions
  always returns true."* Also: `PromptGamePassPurchaseFinished`'s `wasPurchased` is reliable only
  *"used on the server"* and *"in a local script, these values should not be relied on for
  validation or game logic."* **This is the single most load-bearing citation in this domain** — it
  is what converts G11 from unfixable to fixable.
- `[research: https://create.roblox.com/docs/reference/engine/classes/MarketplaceService]` — the
  rendered reference page. Confirms `PromptGamePassPurchaseFinished(player, gamePassId,
  wasPurchased)` exists and fires on prompt completion, i.e. only for prompts the experience raised.
- `[research: https://devforum.roblox.com/t/do-not-cache-results-of-userownsgamepassasync/3639404]`
  — developer-side corroboration that the cache is real and that *"the only valid way to validate
  gamepass purchases is by having players rejoin"* is the common workaround. Cited as evidence of
  the belief build note 4 encodes, **not** as evidence the belief is correct; the reference above
  is the one that governs.
- `[research: https://devforum.roblox.com/t/new-event-marketplaceservicewebsite-gamepasspurchaseplayer-gamepassid/1157069]`
  — confirms no in-experience event fires for a website purchase, so polling or a per-event re-check
  is the only detection path. This is why sheet 02 asks for a re-read rather than a listener.

**Could not settle:**

- The rendered `create.roblox.com` page did not surface the caching paragraph through the fetch
  tool on three attempts (the reference page, its `#UserOwnsGamePassAsync` anchor, and the
  `production/monetization/game-passes` guide all returned "not present"). The `creator-docs` YAML
  above is the generation source for that page and does carry it, so the claim is sourced — but the
  fetch that would remove all doubt is the rendered page's own `UserOwnsGamePassAsync` section, and
  a later reader should treat the YAML as the citation of record. `[unverified]` only as to which
  URL a reader should quote, not as to the fact.
- **No number for the propagation window beyond "several minutes."** Nothing fetched gives a
  bound, a distribution or a retry recommendation. `[playtest unknown]` — sheet 02 carries a
  starting value and a test range rather than a sourced figure, and the fetch that would settle it
  does not exist publicly; it would have to be measured against a live pass.
- **No verification that an experience-page purchase is even reachable while a player is in a
  session on mobile** (the Store tab's availability during play). Nothing fetched addresses it, and
  it bears directly on how often the pendingPurchase case occurs. The fetch that would settle it is
  a current Roblox mobile-client help page describing the in-experience menu's Store tab.
  `[unverified]`
