# 01 — The offer ladder

**Domain:** gameplay/monetization · **Category:** Gameplay · **Wave:** 3

## Decision

**Three game passes, one per rung, across two axes: `Yield` (value ×1.5, 49 R$, impulse), `Measure`
(value ×2, 199 R$, mid), `Span` (radius ×1.75, 499 R$, premium).** `Span` is the brief's homeless
premium SKU and it is `gameplay/mechanics/04`'s oversized tool; **`speed` is not sold at all**, and
there are zero developer products.

## Why

**Three products, not one and not eighteen.** Shipping neighbours run 1 to 18 passes — Carpet
Cleaning 1, DIG 6, Grass 6, Pressure Wash 7, Faith 18
`[research: https://www.rolimons.com/game/124374448373637]`
`[research: https://www.rolimons.com/game/126244816328678]`
`[research: https://www.rolimons.com/game/7009799230]`
`[research: https://www.rolimons.com/game/94264573845314]`. Three is the smallest count that puts one
product at each of the three rungs the only two pricing sources corroborate — impulse 25–75, mid
99–249, premium 249–499
`[research: https://rolearn.dev/guidance/roblox-gamepass-pricing-strategy-guide/]`
`[research: https://generalistprogrammer.com/tutorials/roblox-game-pass-pricing-guide]`. Two products
with an empty middle was the alternative, rejected because it makes `rung` a field with an unused
value. **That is a shape argument, not a revenue one**; revenue is a declined non-goal
`[brief: binding]` ← `00-CORE.md`, and no count here is chosen because it earns.

**Two axes, because two have headroom and one does not.** `gameplay/systems/05` ruled
`luckShaped: false`, so the brief's fourth allowed target names a quantity with no referent
`[brief: soft]` ← `03-META.md`. Of the three that survive, sheet `03` computes each one's residue
after the ladder at max: `value` has no ceiling at all (`gameplay/systems/04` — income at max ladder
is "neither capped nor hidden"), `radius` has 3.78× at the tightest depth, and **`speed` has 1.61×
in total, less than four set factors at ×1.2 would consume on their own** — against a ceiling
(`movement.baseClearRadius / serverTickSeconds`) whose denominator is architecture's and not final
`[research: game/src/shared/GameConfig.luau]`. An axis whose whole budget a claimant ahead of me can
spend is an axis that may deliver nothing to a buyer. `speed` is **declined, not forbidden** — sheet
`02` carries no row for it.

**Value carries two rungs, radius carries one.** Two products on one axis multiply
(`gameplay/systems/06`: N purchase factors multiply on top of the ladder), so the axis carrying two
must be the one that cannot be clamped, which is `value`. `radius` is spent exactly once, at
premium, leaving sheet `03`'s inequality a single product term to check.

**Prices.** Every one of the 38 live prices observed across the five sampled games is a charm price
(25 … 799, 1,499, 2,500); zero are round. The guides' note that round numbers perform marginally
better is a revenue claim and is declined on that ground. **The usable finding is that the axis does
not set the price, the rung does** — reach sells at 25, 299 and 2,500 across three games
`[research: https://www.rolimons.com/game/94264573845314]`. Each price below is chosen for its rung,
then checked against the same-axis observations. Grass's 495,130 "Test" pass is a developer artifact
and is averaged into nothing `[research: https://www.rolimons.com/game/133086043677134]`.

**499 and not 2,500 for the premium.** The reference's whale item is a 2,500-Robux radius tool
`[research: https://www.rolimons.com/game/133086043677134]` and the guides put a whale band at
999–4,999, but every justification either source gives for that band is revenue concentration, which
`00-CORE.md` closed `[brief: binding]`. What survives is that the ladder be real: 499 is 10.2× the
impulse rung, the top of the corroborated *premium* band, and the observed ceiling of both Faith and
DIG. `[cid: decided]`

**All three are passes.** A pass is "a one-time Robux fee to access special privileges", checked
with `UserOwnsGamePassAsync()`
`[research: https://create.roblox.com/docs/production/monetization/game-passes]`; a developer product
is for something "a user can purchase more than once", and the platform directs anything bought once
to a pass `[research: https://create.roblox.com/docs/production/monetization/developer-products]`.
`gameplay/systems/06` allows at most one instance per product id, so nothing here is repeatable.

**G4 — the premium tool is invisible as the contract merges today.** `gameplay/mechanics/04` drives
tool head width off Reach *level*; a purchase is a factor on effective radius and grants no level, so
`Span` would widen the sweep and leave the head identical. **`Span`'s deliverable is a radius factor
*and* a visibly wider head** — a requirement on the `tool` key I do not own and do not edit. If
held-tool work refuses (legitimate: `T11` says width moves with the Reach axis alone), `Span` still
ships as a radius factor and this sheet is revised rather than the refusal overridden.

**Labels: one word, Title Case, ≤ 12 ASCII letters**, per `theme/vocabulary/01`'s form rules. None
is an object (a product reading as a thing you receive invites the paid-Find reading the fence
exists to prevent), none is a treasure word (reserved for Finds by `04-PRESENTATION.md`), none is
genre-occupied the way `relic` was. `[cid: decided]` — **`label` is the one field Vocabulary may
overwrite without a revision against this sheet.**

| id | label | kind | axis | factor | price | band | test range | rung | same-axis evidence |
|---|---|---|---|---|---|---|---|---|---|
| `yield` | Yield | gamePass | value | 1.5 | 49 | impulse 25–75 | 25–99 | impulse | Faith value 59; Grass impulse 29 |
| `measure` | Measure | gamePass | value | 2.0 | 199 | mid 99–249 | 99–299 | mid | Grass 2x Bronze 199; DIG Double XP 249; Pressure Wash Double Money 399 |
| `span` | Span | gamePass | radius | 1.75 | 499 | premium 249–499 | 349–999 | premium | Faith 3x radius 25; Pressure Wash Ultra Circle Nozzle 299; Grass Giant Trimmer 2,500 |

```manifest
{
  "provides": "products",
  "value": {
    "storeExists": true,
    "kindsUsed": ["gamePass"],
    "devProductCount": 0,
    "axesSold": ["value", "radius"],
    "axesNotSold": ["speed"],
    "rungs": ["impulse", "mid", "premium"],
    "ownershipCheck": "UserOwnsGamePassAsync(userId, gamePassId)",
    "prompt": {
      "method": "PromptGamePassPurchase",
      "calledOnlyFrom": "explicit player activation of the store control",
      "clientCallAllowed": "unverified — the MarketplaceService page as fetched does not state the security context"
    },
    "items": [
      {
        "id": "yield",
        "label": "Yield",
        "kind": "gamePass",
        "gamePassId": null,
        "axis": "value",
        "factor": 1.5,
        "priceRobux": 49,
        "priceBand": "impulse 25-75",
        "priceTestRange": [25, 99],
        "rung": "impulse",
        "repeatable": false,
        "stacksWithSelf": false,
        "persisted": false,
        "deliverable": "multiplicative factor on the value axis; no other effect"
      },
      {
        "id": "measure",
        "label": "Measure",
        "kind": "gamePass",
        "gamePassId": null,
        "axis": "value",
        "factor": 2.0,
        "priceRobux": 199,
        "priceBand": "mid 99-249",
        "priceTestRange": [99, 299],
        "rung": "mid",
        "repeatable": false,
        "stacksWithSelf": false,
        "persisted": false,
        "deliverable": "multiplicative factor on the value axis; no other effect"
      },
      {
        "id": "span",
        "label": "Span",
        "kind": "gamePass",
        "gamePassId": null,
        "axis": "radius",
        "factor": 1.75,
        "priceRobux": 499,
        "priceBand": "premium 249-499",
        "priceTestRange": [349, 999],
        "rung": "premium",
        "repeatable": false,
        "stacksWithSelf": false,
        "persisted": false,
        "deliverable": "multiplicative factor on the radius axis AND a visibly wider tool head; requires tool head width to resolve from effective radius, not Reach level"
      }
    ],
    "combinedFactorCap": { "value": 3.0, "radius": 1.75, "speed": 1.0 },
    "forbidden": [
      { "id": "F1",  "rule": "No paid area, Find or set, and no paid access to any of them.", "closedBy": "03-META.md (brief)", "check": "no products[] entry grants a collection entry, an area id or a set; axis is always one of value|radius|speed" },
      { "id": "F2",  "rule": "No sale of currency at any rate, in any bundle, ever.", "closedBy": "gameplay/systems/04", "check": "no products[] field names Shards or an amount; priceRobux exists and no priceShards field does; zero code paths credit currency from a purchase" },
      { "id": "F3",  "rule": "No gacha, loot box, crate, roll, spin, pull, egg or randomised purchase outcome.", "closedBy": "gameplay/systems/03 + gameplay/systems/05 + platform paid-random-items rules", "check": "every products[] entry has a deterministic factor; zero odds tables anywhere; zero PolicyService:GetPolicyInfoForPlayerAsync calls" },
      { "id": "F4",  "rule": "No luck multiplier, discovery-rate multiplier or find-better-Finds product.", "closedBy": "gameplay/systems/05 (luckShaped: false), gameplay/systems/03 (no per-Find rank)", "check": "no products[].axis equals luck; the substring 'luck' appears in zero player-facing strings" },
      { "id": "F5",  "rule": "No developer products, and nothing repeatable.", "closedBy": "gameplay/systems/06 (one instance per product id) + platform guidance", "check": "every products[].kind is gamePass and every repeatable is false; zero PromptProductPurchase calls; zero ProcessReceipt callbacks" },
      { "id": "F6",  "rule": "No timed boost, and no modifier that expires, decays, resets, is consumed or is spent.", "closedBy": "gameplay/systems/06", "check": "no products[] field named duration, expires, seconds, uses, charges or cooldown; no purchase-derived modifier carries a timestamp" },
      { "id": "F7",  "rule": "No cosmetics: no skin, trail, aura, particle, hat, accessory, follower, pet, mount, emote, title or nameplate.", "closedBy": "03-META.md (declined, needs a display system first) + theme/identity/04 + theme/identity/02", "check": "no product changes any instance parented to the character other than the tool head's width" },
      { "id": "F8",  "rule": "No premium tool that is the only way to have a tool.", "closedBy": "gameplay/mechanics/04 T12 (premiumVariantMayBeOnlyTool: false)", "check": "a player owning zero products spawns with a tool welded to the right hand" },
      { "id": "F9",  "rule": "One axis and one factor per product. No product grants a second modifier, currency, a Find, an area or a cosmetic.", "closedBy": "gameplay/systems/06", "check": "every products[] entry has exactly one axis field and one factor field and no grants array" },
      { "id": "F10", "rule": "No timer, countdown, expiry, 'limited', 'new', 'ends in' or 'today only' on any offer.", "closedBy": "theme/tone/04 D9-D10 + platform monetization guidance", "check": "zero store strings match /limited|hurry|today only|ends in|last chance|expires/i; no store element updates on a clock" },
      { "id": "F11", "rule": "No manufactured scarcity or urgency: no stock count, no 'only N left', no 'N players own this', no waitlist, no queue.", "closedBy": "platform monetization guidance (false sense of urgency, artificial scarcity)", "check": "no store string contains a number sourced from anything but the player's own state" },
      { "id": "F12", "rule": "No discount, no strikethrough price, no sale price, no bundle price, no first-purchase bonus.", "closedBy": "theme/tone/04 D9 + platform monetization guidance", "check": "exactly one price per product; products[] has no priceWas, discount, bundle or bonus field" },
      { "id": "F13", "rule": "No unprompted purchase prompt. PromptGamePassPurchase is called only from an explicit player activation of a store control.", "closedBy": "theme/tone/04 D10", "check": "zero PromptGamePassPurchase calls in any join, spawn, respawn, tick, timer, completion or reveal path" },
      { "id": "F14", "rule": "No offer may interrupt a beat: nothing store-related opens, animates or changes within 2 s of a Find reveal, a set completion or an area completion.", "closedBy": "theme/tone/03 beat map B1-B3 + gameplay/mechanics/05", "check": "the store surface has no code path reachable from the reveal or completion channels" },
      { "id": "F15", "rule": "No code entry field, and no like, favourite, follow, group-join, rate-us or share prompt.", "closedBy": "03-META.md priority 3 (codes) + theme/tone/04 D10", "check": "zero TextBox instances in the store surface; zero strings match /code|group|favou?rite|follow|rate us|share/i" },
      { "id": "F16", "rule": "No verb behind a paywall. move, look, jump, buy and openIndex all work with zero products owned.", "closedBy": "gameplay/mechanics/02", "check": "all five verbs function in a session with zero passes owned" },
      { "id": "F17", "rule": "No purchase may shorten, skip, auto-complete or bypass clearing work: no instant-clear, no auto-clear, no area skip, no completion grant.", "closedBy": "03-META.md (never content access) + theme/fantasy/03 C3", "check": "no product clears a patch, completes an area, or grants a Find; 24/24 is reachable owning zero products" },
      { "id": "F18", "rule": "No subscription, no recurring charge, and no benefit gated on Roblox Premium membership.", "closedBy": "gameplay/systems/06 (nothing timed or expiring) + 03-META.md (never content access)", "check": "zero reads of Player.MembershipType or MembershipType.Premium anywhere in the build" },
      { "id": "F19", "rule": "No product is named, shown, priced or referred to anywhere outside the store surface.", "closedBy": "theme/tone/04 D10 (no unprompted purchase surface)", "check": "no products[].label appears in any string rendered outside the store screen" },
      { "id": "F20", "rule": "No purchase-derived state is written to persistence. Ownership is read live every join.", "closedBy": "gameplay/systems/06 (recomputed from live ownership, never persisted)", "check": "the save payload contains no pass id, no product id and no purchase-sourced factor" }
    ],
    "headroom": {
      "rule": "for every axis A and every depth N: ladderMax(A) * prod(setFactors on A) * prod(products.items[].factor where axis == A) <= marginFraction * ceiling(A, N)",
      "marginFraction": 0.9,
      "ladderMax": "upgrades[A].base + upgrades[A].maxLevel * upgrades[A].perLevel",
      "ceilings": {
        "value": null,
        "radius": "min over depths of (area.size(N) / 2)",
        "speed": "movement.baseClearRadius / serverTickSeconds"
      },
      "onFailure": "reduceFactor",
      "sizedLast": true,
      "pacingFloorSeconds": 75,
      "clampMayAbsorbAPurchase": false,
      "lossNotice": "none"
    }
  }
}
```

## Consequences for other work

| subject | what this forces or forbids |
|---|---|
| Held-tool work (owner of `tool`) | Head width must resolve from **effective radius**, not Reach level, or `Span` is a 499-Robux product with no visible expression. I state the requirement and change no value of yours. A refusal is legitimate and revises this sheet, not yours. |
| Store-surface work (UI/UX) and verb-roster work (owner of `input`) | You inherit three rows, three prices, three factors and twenty prohibitions — and **the trigger is yours, not mine.** `gameplay/mechanics/02` fixed five verbs and its `buy` is the Shard sink; a Robux purchase is a different action and no sheet owns how it is reached. `F13` and `F19` bound it from one side only. Whether a store control is a sixth pressable is escalated with `mechanics/02`, not assumed here. |
| Contract-and-seam work (owner of `bridge/schema.mjs`) | `products` needs a shape before it merges, and `products.items[].label` is a new class of player-facing string. `playerFacingStrings()` walks the merged manifest, so a key that does not exist is never checked against `vocabulary.bannedWords`; adding the path is what makes three labels checkable. |
| Balance & Tuning | Three factors and three prices, and no cost curve, no Shard figure, no in-game price. A `priceRobux` may move anywhere inside its stated band with no revision; moving one outside its band is a revision against this sheet. |
| Set-bonus work (Meta & Content for the axis, Balance for the magnitude) | `Span` at ×1.75 leaves a radius set-factor budget of 2.16× at shipped values — more than four sets at ×1.2 would spend, so nothing is asked of you. Sheet `03` holds the inequality that enforces it. |
| Naming work (`theme/vocabulary`) | `Yield`, `Measure` and `Span` are three renderable coinages with no contract path today. Rename any of them freely; never rename an `id`. |

## Acceptance criteria

1. `products.items` has exactly 3 entries; every entry has `kind: "gamePass"`, `repeatable: false`,
   `factor >= 1`, `axis` in {`value`, `radius`}, and `priceRobux` in {49, 199, 499}. Zero entries
   have `axis: "speed"`, and `products.devProductCount` is 0.
2. Every `products.items[].label` is a single word, Title Case, at most 12 ASCII letters, and equal
   to no other player-facing string value in the merged manifest.
3. The product of `factor` over all entries with `axis == "value"` is at most 3.0, and over all
   entries with `axis == "radius"` is at most 1.75.
4. Owning `span` produces a rendered tool head width strictly greater than not owning it, at every
   Reach level. A build where the two widths are equal fails this sheet.

## Flagged to the developer

| item | position |
|---|---|
| **`priceRobux` lives in this key**, against the category ruling that price points belong to Balance & Tuning | `[cid: decided]`, inherited from this domain's index and kept visible deliberately. A Robux price is not an economy, pacing or progression number: it enters no curve, never touches `upgrades[].costBase`, and is sourced from an external market rather than derived from the loop. Each price ships with the fetched band it sits in and a test range, so Balance keeps the value and I keep the shape. If the category lead prefers the literal reading, the fix is one field moving table and no sheet changes. |
| **`03-META.md`'s allowed list is stale by one entry** | It names four multiplier targets; `gameplay/systems/05` left three with a referent, and this sheet sells two of those three. The line should be read as three. |
| **Monetization has no priority slot** | `03-META.md`'s three priority lists contain neither a store nor a pass, so this ladder is specced against a scope list that does not contain it. Escalated to scope-ordering work; it changes nothing here, because the ladder is written either way. |

## Not decided here

The prohibition rows themselves and their observables — sheet `02`, which writes what this manifest
carries as `products.forbidden`. How much of an axis a purchase may consume, the inequality bounding
it, and what a player is shown when a purchase stops applying — sheet `03`, which writes
`products.headroom`. Where a store control sits, what it looks like, what it says beyond the three
labels, and how a purchase is physically reached — store-surface and verb-roster work. Whether the
tool's head width reads effective radius — held-tool work, owner of `tool`. What the tool is made of
at any width — Art & Visuals. Every upgrade cost, cost growth, Shard figure and in-game price —
Balance & Tuning. Which axis each of the four sets targets and at what magnitude — Meta & Content,
then Balance & Tuning. Whether a spend guard exists for the under-13 share of an 8–14 audience — the
developer; no sheet here invents one.
