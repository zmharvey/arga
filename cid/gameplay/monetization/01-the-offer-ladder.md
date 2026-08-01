# 01 — The offer ladder

**Domain:** gameplay/monetization · **Category:** Gameplay · **Wave:** 3 · **Revised:** wave-3
verification RR-4 / RR-9 / RR-10 / RR-11, and coordinator ruling R-4

## Decision

**One game pass: `Span`, radius ×1.75, 499 R$, premium rung — the brief's homeless premium SKU,
delivered as `gameplay/mechanics/04`'s oversized tool.** The two value passes of the first draft
are **withdrawn**: they and `Span` draw on one lap-floor budget and cannot both be full size, and
`Span` is the one the brief asked for. Nothing is sold on `value` or `speed`. **There is no in-game
store** — the pass is bought from the Roblox experience page and the game draws no purchase surface
at all (R-4).

## Why

**What the verifier found, and it is right.** RR-4 re-ran `meta/04`'s eight-row lap table against a
player owning all three of my passes and got **54.5 s at area 2 and 61.8 s at area 3** against
`core-loop/04`'s 75 s floor — a breach of my own `03`'s `H2` and its criterion 4. Row 2 is already
at its under-buy cap, so no footprint closes it. I re-derived the table from `meta/04`'s `sizingRule`
before changing anything: `ROUTE_SLACK` is 2.0, `lap(k) = 2 · footprint(k) / τ(k)`, and every row's
arrival τ decomposes exactly into ladder levels (176 = 2·5.5·16; 337.92 = 2·8.8·19.2; 492.8 =
2·11.0·22.4; 619.52 = 2·12.1·25.6; 732.16 = 2·14.3·25.6). **The verifier's arithmetic reproduces
digit for digit and so does its 1.27 bound.** `[research: cid/gameplay/meta/04-the-depth-ladder.md]`

**The structural fact my first draft missed: the products share one budget and spend it on the same
quantity.** τ is `2 · radius · speed`, so a factor on either throughput axis multiplies it
identically, and the lap-floor bound is on **`Π productFactors(radius) × Π productFactors(speed)` as
one quantity** — not per axis. A value factor multiplies τ *indirectly*, by advancing the greedy
purchase order so the player arrives at each area holding higher levels: at a combined value factor
of 3.0, area-2 arrival moves from radius L3 / speed L2 to L5 / L5, τ 337.92 → 528. All three push
the same lap toward the same floor. That is why the ordinal-2 bound is **1.99 with no value pass
owned and 1.27 with both**, and why `H4` ("reduce `products[].factor`") had to be told *which*
factor.

**The budget goes to the item the brief named.** `03-META.md` and `OPEN.md §6` both record exactly
one open item here — *"the high-price SKU has no obvious home"* / *"The premium SKU has no home"*
`[brief: binding]` as a stated hole — and its stated shape is the reference's oversized tool, a
radius item. `gameplay/mechanics/04` did work to unblock it and `theme/identity/04` did work to route
the whale item toward a tool rather than a cast. Nothing in the brief asks for a value pass. So when
one budget cannot fund both, the value passes give way, not `Span`.

**Retracting my own argument, in the open.** The first draft argued three products because "three is
the smallest count that puts one product at each corroborated rung" and because two would leave
`rung` with an unused value. That was argued against a market spread and not against `meta/04`'s lap
table, which did not exist yet. It is wrong, and the corrected reading is that **`rung` has two
unused values now and that is a cost worth paying.** One live pass is corroborated as shipping:
Carpet Cleaning Simulator ships exactly one, at 1,499, across 28M visits
`[research: https://www.rolimons.com/game/124374448373637]`. And "the smallest game that still gives
every creative area real work" `[brief: binding]` ← `00-CORE.md` points down, not up.

**All eight rows pass at ×1.75 with margin**, computed below: laps 93.5 / 85.2 / 91.8 / 93.0 / 89.9,
every one inside `core-loop/04`'s 75–200 band, binding at ordinal 2 with 12% left. One-level-behind
at ordinal 2 is 106.3 s, so the ceiling is never at risk either — **a product factor is ≥ 1, so it
can only shorten a lap, and `H2` is one-sided by construction.** The axis ceiling `H1` is the looser
of the two: `14.3 × 1.44 × 1.75 = 36.0` against `0.9 × 60 = 54`, with `meta/03`'s two radius set
factors included.

**499, restated without the ladder-ratio clause it no longer has.** 499 is the top of the
corroborated premium band and the observed ceiling of both Faith and DIG
`[research: https://rolearn.dev/guidance/roblox-gamepass-pricing-strategy-guide/]`
`[research: https://www.rolimons.com/game/94264573845314]`
`[research: https://www.rolimons.com/game/126244816328678]`. The two single-item comparables sit
above it — Carpet Cleaning at 1,499, and the reference's own oversized tool at 2,500
`[research: https://www.rolimons.com/game/133086043677134]` — and both bands were declined on
`00-CORE.md` grounds, because the only argument either source gives for them is revenue
concentration. `[cid: decided]`

**R-4, folded in: there is no in-game store.** `input` is closed at five verbs and four pressables,
all spoken for, so a store control needs a fifth verb and fails two approved criteria in
`mechanics/02`. Passes are purchasable from the experience's own page with no in-game surface, so
the platform already supplies the storefront and the only half that must exist in the build is the
ownership read at join. `PromptGamePassPurchase` is therefore **unused** — not reserved, not
deferred — and `F13` becomes the strictly stronger "zero calls anywhere". The honest cost is a
discovery cost, not a mechanics one, and it is named in `## Consequences`.

**G4 stands unchanged.** `gameplay/mechanics/04` drives tool head width off Reach *level*; a purchase
is a factor on effective radius and grants no level, so `Span` would widen the sweep and leave the
head identical. **Its deliverable is a radius factor *and* a visibly wider head** — a requirement on
the `tool` key I do not own and do not edit. If held-tool work refuses (legitimate: `T11` says width
moves with the Reach axis alone), `Span` ships as a radius factor and this sheet is revised.

**`Span`: one word, Title Case, 4 ASCII letters**, per `theme/vocabulary/01`'s form rules. It names
the sweep width rather than an object, because a product reading as a thing you receive invites the
paid-Find reading the whole fence exists to prevent. `[cid: decided]` — **`label` is the one field
Vocabulary may overwrite without a revision against this sheet.**

| area ordinal | arrival radius | arrival speed | arrival τ | footprint | max `Π productFactors(radius) × Π productFactors(speed)` at the 75 s floor | lap at ×1.75 |
|---|---|---|---|---|---|---|
| 1 | 5.5 (L0) | 16.0 (L0) | 176.00 | 14,400 | 2.18 | 93.5 s |
| 2 | 8.8 (L3) | 19.2 (L2) | 337.92 | 25,200 | **1.99 — binding** | **85.2 s** |
| 3 | 11.0 (L5) | 22.4 (L4) | 492.80 | 39,600 | 2.14 | 91.8 s |
| 4 | 12.1 (L6) | 25.6 (L6) | 619.52 | 50,400 | 2.17 | 93.0 s |
| 5–8 | 14.3 (L8) | 25.6 (L6) | 732.16 | 57,600 | 2.10 | 89.9 s |

```manifest
{
  "provides": "products",
  "value": {
    "storeExists": false,
    "purchaseSurface": "the Roblox experience page. The game draws no store, no shop screen, no offer row and no purchase control of any kind (coordinator ruling R-4).",
    "itemCount": 1,
    "kindsUsed": ["gamePass"],
    "devProductCount": 0,
    "axesSold": ["radius"],
    "axesNotSold": ["value", "speed"],
    "rungVocabulary": ["impulse", "mid", "premium"],
    "rungsUsed": ["premium"],
    "ownershipCheck": "UserOwnsGamePassAsync(userId, gamePassId), read at join and never persisted",
    "prompt": {
      "method": null,
      "promptGamePassPurchaseCalls": 0,
      "reason": "R-4 removed the in-game store. There is no verb, pressable or screen that could trigger a prompt, and none is reserved. If a purchase surface is ever built, this field is what must be revised first."
    },
    "externalPrerequisite": {
      "what": "products.items[].gamePassId must be filled with the id of a pass created on the Roblox creator site and priced to match priceRobux",
      "owner": "the developer, or whoever holds the Roblox creator account",
      "blocking": "until it is filled, ownershipCheck cannot return true for any player and the product is unownable. This is a provisioning step, not an unfinished specification."
    },
    "items": [
      {
        "id": "span",
        "label": "Span",
        "kind": "gamePass",
        "gamePassId": null,
        "axis": "radius",
        "factor": 1.75,
        "factorTestRange": [1.40, 1.95],
        "factorStatus": "playtest unknown — whether 1.75 reads as an oversized tool is a feel question; the upper bound 1.95 is the hard lap-floor limit at area ordinal 2, not a taste figure",
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
    "combinedFactorCap": { "value": 1.0, "radius": 1.75, "speed": 1.0 },
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
      { "id": "F10", "rule": "No timer, countdown, expiry, 'limited', 'new', 'ends in' or 'today only' attached to any offer, anywhere in the game.", "closedBy": "theme/tone/04 D9-D10 + platform monetization guidance", "check": "zero player-facing strings match /limited|hurry|today only|ends in|last chance|expires/i; no element updates on a clock" },
      { "id": "F11", "rule": "No manufactured scarcity or urgency: no stock count, no 'only N left', no 'N players own this', no waitlist, no queue.", "closedBy": "platform monetization guidance (false sense of urgency, artificial scarcity)", "check": "no player-facing string contains a number sourced from anything but the player's own state" },
      { "id": "F12", "rule": "No discount, no strikethrough price, no sale price, no bundle price, no first-purchase bonus.", "closedBy": "theme/tone/04 D9 + platform monetization guidance", "check": "exactly one price per product; products[] has no priceWas, discount, bundle or bonus field" },
      { "id": "F13", "rule": "No purchase prompt of any kind. Under R-4 there is no in-game store, so PromptGamePassPurchase is never called.", "closedBy": "theme/tone/04 D10 + coordinator ruling R-4 + gameplay/mechanics/02 (input closed at five verbs)", "check": "zero PromptGamePassPurchase calls anywhere in the build, in any path" },
      { "id": "F14", "rule": "No offer may interrupt a beat: nothing purchase-related opens, animates or changes within 2 s of a Find reveal, a set completion or an area completion.", "closedBy": "theme/tone/03 beat map B1-B3 + gameplay/mechanics/05", "check": "no purchase-related instance or string exists at all, so no code path can reach the reveal or completion channels" },
      { "id": "F15", "rule": "No code entry field, and no like, favourite, follow, group-join, rate-us or share prompt, anywhere in the game.", "closedBy": "03-META.md priority 3 (codes) + theme/tone/04 D10", "check": "zero TextBox instances in any screen; zero strings match /code|group|favou?rite|follow|rate us|share/i" },
      { "id": "F16", "rule": "No verb behind a paywall. move, look, jump, buy and openIndex all work with zero products owned.", "closedBy": "gameplay/mechanics/02", "check": "all five verbs function in a session with zero passes owned" },
      { "id": "F17", "rule": "No purchase may shorten, skip, auto-complete or bypass clearing work: no instant-clear, no auto-clear, no area skip, no completion grant.", "closedBy": "03-META.md (never content access) + theme/fantasy/03 C3", "check": "no product clears a patch, completes an area, or grants a Find; 24/24 is reachable owning zero products" },
      { "id": "F18", "rule": "No subscription, no recurring charge, and no benefit gated on Roblox Premium membership.", "closedBy": "gameplay/systems/06 (nothing timed or expiring) + 03-META.md (never content access)", "check": "zero reads of Player.MembershipType or MembershipType.Premium anywhere in the build" },
      { "id": "F19", "rule": "No product is named, shown, priced or referred to anywhere inside the game. R-4 leaves no surface that may mention one.", "closedBy": "theme/tone/04 D10 + coordinator ruling R-4", "check": "no products[].label and no priceRobux value appears in any string rendered by the game" },
      { "id": "F20", "rule": "No purchase-derived state is written to persistence. Ownership is read live every join.", "closedBy": "gameplay/systems/06 (recomputed from live ownership, never persisted)", "check": "the save payload contains no pass id, no product id and no purchase-sourced factor" }
    ],
    "headroom": {
      "canonical": "H1 below is the canonical form of the axis-ceiling inequality. setBonus.invariants[4] states the same bound without the 0.9 margin; H1 subsumes it and a schema author should write H1 only.",
      "H1_axisCeiling": {
        "rule": "for every axis A and every area ordinal N: ladderMax(A) * prod(setFactors on A) * prod(products.items[].factor where axis == A) <= marginFraction * ceiling(A, N)",
        "marginFraction": 0.9,
        "ladderMax": "for the entry of upgrades[] whose id equals A: base + maxLevel * perLevel",
        "ceilings": {
          "value": null,
          "radius": "plots.laneWidthStuds / 2",
          "speed": "movement.baseClearRadius / runtime.serverTickSeconds"
        },
        "atShippedValues": "radius 14.3 * 1.44 * 1.75 = 36.0 <= 0.9 * 60 = 54; speed 25.6 * 1.2 = 30.7 <= 0.9 * 45.83 = 41.25"
      },
      "H2_lapFloor": {
        "rule": "for every area ordinal N: ROUTE_SLACK * depths.areas[N-1].footprintStuds2 / tau(N) >= floorSeconds, where tau(N) is computed for a player owning EVERY product",
        "tau": "2 * (arrivalRadius(N) * prod(productFactors on radius)) * (arrivalSpeed(N) * prod(productFactors on speed))",
        "joint": "the bound below is on prod(productFactors on radius) * prod(productFactors on speed) as ONE quantity, not per axis. A radius product and a speed product each passing their own check can still break the lap together.",
        "floorSeconds": 75,
        "ceilingSeconds": 200,
        "ceilingAtRisk": false,
        "ceilingNote": "a product factor is >= 1, so it can only shorten a lap. H2 is one-sided.",
        "bindingOrdinal": 2,
        "maxThroughputProductFactorByOrdinal": { "1": 2.18, "2": 1.99, "3": 2.14, "4": 2.17, "5": 2.10, "6": 2.10, "7": 2.10, "8": 2.10 },
        "spentByCurrentProducts": 1.75,
        "remaining": 1.14,
        "computedAtCombinedValueFactor": 1.0,
        "valueFactorWarning": "every bound above FALLS as combinedFactorCap.value rises, because a value product advances the greedy purchase order and raises arrival levels. At a combined value factor of 3.0 the ordinal-2 bound is 1.27, verified in wave 3. Adding any product on the value axis requires re-running the greedy purchase order against upgrades[] and re-deriving this whole table; these bounds are not valid at any other value factor."
      },
      "onFailure": "reduceFactor",
      "reduceWhich": "the factor on the axis the brief does not name as open. The brief names one open item in this domain, the premium SKU, and its shape is a radius item; so radius is reduced last.",
      "sizedLast": true,
      "clampMayAbsorbAPurchase": false,
      "lossNotice": "none"
    }
  }
}
```

## Consequences for other work

| subject | what this forces or forbids |
|---|---|
| Area-sizing and depth-ladder work (`meta/04`) | RR-4's fix lands here, not there. `Π productFactors(value)` is now **1**, so `meta/04`'s value-exposure analysis (the mis-stated 3.94×, really ≈7×) becomes vacuous rather than wrong, and the single live bound is **`Π productFactors(radius) × Π productFactors(speed) ≤ 1.99 at ordinal 2`**, which 1.75 satisfies. **Your eight footprints do not move.** Re-derive the table above if you change any footprint or any arrival level. |
| Store-surface work (UI/UX) | **You have no store to draw.** R-4 removes the screen, the rows, the prices and the purchase control entirely; four pressables and five verbs stand exactly as `mechanics/02` fixed them. This is a deletion of scope, not a deferral. |
| Store-page and marketing work (wave 7) | **You inherit the honest cost of R-4: a player who owns no pass has no way to learn from inside the game that a pass exists.** The experience page is the only surface on which `Span` is discoverable, so the store description and the pass listing are load-bearing rather than decorative. Named here so wave 7 inherits it instead of rediscovering it. |
| Held-tool work (owner of `tool`) | Head width must resolve from **effective radius**, not Reach level, or `Span` is a 499-Robux product with no visible expression. I state the requirement and change no value of yours; a refusal is legitimate and revises this sheet. |
| Onboarding and layout work (`onboarding/02`, `meta/05`) | **A purchaser's effective clear radius at spawn is 9.625 studs, not 5.5.** `firstSession.placement.spawnToNearestPatchMaxStuds` and `layout.spawnAdjacency` are both derived from `movement.baseClearRadius` unmultiplied, and a player who bought `Span` before their first session sweeps a disc 1.75× wider on their first tick. Whether the arming gate and the first-Find guarantee survive that is yours; I state it rather than assume it. |
| Contract-and-seam work (owner of `bridge/schema.mjs`) | `products` supplies `H1` and `H2` as evaluable expressions. `ceilings.radius` now reads `plots.laneWidthStuds / 2` (RR-11) — numerically 60, identical to the old `area.size / 2`, and defined at every ordinal, where `area.size` was not. `ladderMax` is a lookup by `upgrades[].id == A`. `headroom.canonical` says to write `H1` and not `setBonus.invariants[4]`. `products.items[].label` is still a player-facing string with no path in `playerFacingStrings()`. |
| Balance & Tuning | One factor and one price. `factorTestRange` is [1.40, 1.95] and the upper bound is the hard lap-floor limit, not a taste figure — above it, `H2` fails at ordinal 2. `priceRobux` may move anywhere inside 349–999 with no revision. |
| Set-bonus work (`meta/03`) | Unchanged and still fits: `Span` at 1.75 leaves 2.16× for radius set factors and your two at ×1.2 spend 1.44. A third radius factor at ×1.2 still fits; a fourth does not. |

## Acceptance criteria

1. `products.items` has exactly 1 entry, with `id: "span"`, `kind: "gamePass"`, `axis: "radius"`,
   `factor` in [1.40, 1.95], `priceRobux` in [349, 999], `repeatable: false`; and
   `products.combinedFactorCap` is `{value: 1.0, radius: 1.75, speed: 1.0}`.
2. `products.storeExists` is `false`, the build contains zero `PromptGamePassPurchase` calls, zero
   purchase screens and zero purchase controls, and `input.gameDrawnPressables` is still 4.
3. For every area ordinal in `depths.areas`, `2 × footprintStuds2 / τ` computed with `Span` owned is
   at least 75 seconds and at most 200. At shipped values: 93.5 / 85.2 / 91.8 / 93.0 / 89.9 / 89.9 /
   89.9 / 89.9.
4. Owning `span` produces a rendered tool head width strictly greater than not owning it, at every
   Reach level. A build where the two widths are equal fails this sheet.

## Flagged to the developer

| item | position |
|---|---|
| **The ladder is now one product; the impulse and mid rungs are empty.** | The alternative the verifier and the coordinator both named is the mirror image: drop `Span`, keep two value passes at ×1.5 and ×2 (verified safe at area 2, 95.5 s). It is a one-field flip. I chose against it because it leaves *the* open item this domain exists to close — "the premium SKU has no home", stated twice in the brief — still open, and wastes the unblocking work `mechanics/04` and `identity/04` both did. If you would rather have two cheap passes than one premium one, say so and the manifest changes in one edit. `[cid: decided]` |
| **R-4 taken: no in-game store, and its cost is discovery.** | Recorded here as well as in `## Consequences` because it changes what a player can find out. Passes are visible only on the experience page. The alternative was a fifth pressable and a sixth verb, which fails `mechanics/02` criterion 2 and `mechanics/03` `P2`, and which `00-CORE.md` forbids as growth. |
| **`products.items[].gamePassId` is `null` and must be filled outside this pipeline.** | Creating the pass on the Roblox creator site and pricing it at 499 is a provisioning step owned by the developer. Until it is done, `UserOwnsGamePassAsync` cannot return true and the product is unownable. Carried in the manifest as `externalPrerequisite` so it does not read as an unfinished spec. |
| **`priceRobux` lives in this key**, against the category ruling that price points belong to Balance & Tuning | `[cid: decided]`, inherited from this domain's index. A Robux price is not an economy, pacing or progression number: it enters no curve, never touches `upgrades[].costBase`, and is sourced from an external market rather than derived from the loop. If the category lead prefers the literal reading, the fix is one field moving table and no sheet changes. |
| **`03-META.md`'s allowed list is stale by one entry** | It names four multiplier targets; `gameplay/systems/05` left three with a referent, and this sheet now sells one of those three. The line should be read as three. |
| **Monetization has no priority slot** | `03-META.md`'s three priority lists contain neither a store nor a pass. Escalated to scope-ordering work; it changes nothing here. |

## Not decided here

The prohibition rows themselves and their observables — sheet `02`, which writes what this manifest
carries as `products.forbidden`. The inequalities bounding a purchase, the failure rule, and what a
player is shown when a purchase stops applying — sheet `03`, which writes `products.headroom`.
Whether the tool's head width reads effective radius — held-tool work, owner of `tool`. What the
tool is made of at any width — Art & Visuals. Every footprint, arrival level and area size —
`meta/04` and `meta/06`, whose figures this sheet reads and does not set. Every upgrade cost, cost
growth, Shard figure and in-game price — Balance & Tuning. Which axis each set targets and at what
magnitude — `meta/03`. Whether the arming gate and the first-Find guarantee survive a 9.625-stud
spawn radius — onboarding and layout work. How the experience page describes the pass — Discovery &
Marketing, wave 7. Whether a spend guard exists for the under-13 share of an 8–14 audience — the
developer.
