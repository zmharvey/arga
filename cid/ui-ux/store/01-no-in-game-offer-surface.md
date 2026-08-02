# 01 — No in-game offer surface

**Domain:** ui-ux/store · **Category:** UI/UX · **Wave:** 5

## Decision

**No surface this game draws may present, name, price or trigger a purchase — all eighteen of
them, enumerated as a deny list rather than left to inference — and no surfaceless trigger is
permitted either: `promptGamePassPurchaseCalls` stays 0.** The offer exists on exactly one path,
the Roblox experience page's own pass listing, which is outside every surface this contract
describes; `04-PRESENTATION.md`'s `shop` screen-table row is **deleted by ruling, not deferred**.

## Why

**The deny list is the deliverable, not the absence.** R-4 removed the in-game store and
`products.F19` forbids a product being *"named, shown, priced or referred to anywhere inside the
game"* `[research: cid/gameplay/monetization/01-the-offer-ladder.md]`. Neither statement names a
surface. Eighteen surfaces exist, five other UI/UX domains are drawing them this wave, and each of
those writers otherwise has to re-derive "no purchase control here" from a prohibition written
about products. One enumeration, once, is what stops that. `[cid: decided]`

**Why a per-row observable and not one blanket rule.** The rows share a verdict and differ
entirely in what catches a violation: an instance count catches a fifth pressable, a grep catches
a rendered price, a require-graph check catches a screen module nobody reads. A blanket "no
purchase surface" is not checkable by anything. `[brief: binding]` ← *"the smallest game that
still gives every creative area real work"* (`00-CORE.md`): a domain whose honest output is an
empty set still owes the checks that prove the set stayed empty.

**The surfaceless-trigger question the brief never asked.** *"Permanent multipliers only. Never
content access"* `[brief: soft]` (`03-META.md`) constrains **what** is sold and says nothing about
whether the game may raise the platform's prompt with nothing drawn around it. That is a real gap
(`S2`), because a prompt with no surface violates no *presentation* rule at all. It is closed
against the game rather than for it: `input` is closed at five verbs and four pressables, all
spoken for, so nothing the player can touch could raise a prompt, and an *unrequested* prompt is
`theme/tone/04` `D10` and `T6` territory. `products.F13` already sets the count to 0; this key
mirrors it so the surface-side answer is not silent `[research: cid/gameplay/monetization/01-the-offer-ladder.md]`.

**The deleted row must read as a decision.** `04-PRESENTATION.md`'s screen table is untagged and
lists `| shop | 2 | the multiplier SKUs |`. Untagged makes it `[brief: soft]`; R-4 makes it false.
Recorded as `deleted`, with `deferred: false` stated separately, because "priority 2" and "deleted"
are different instructions to a builder and the difference is whether space gets reserved.

**One finding that meets the two-builders bar, from reading the shipped tree.** `default.project.json`
syncs `src/shared` wholesale into `ReplicatedStorage.UIForge` `[research: game/default.project.json]`,
and `src/shared/Screens/` holds **eight** generated screen modules of which `init.client.luau`
requires exactly one, `hud`. The other seven ship inside the place and replicate to every client.
`shop.luau` and `shop-galaxy.luau` render `"SHOP"`, `"Cosmic Egg"`, `"Void Egg"`, `"Luck Boost"`,
price pills `"25,000"` / `"90,000"` / `"1,500"` and `"OPEN 3 EGGS"`; `crates.luau` renders
`"COSMIC CRATES"`, `"Starter Crate"`, `"199 GEMS"`, `"899 GEMS"` and `"BEST"` / `"VALUE"` badges
`[research: game/src/shared/Screens/shop.luau]`. Nobody sees them, so this fails bar (a) — but a
paid-random-items storefront sitting in the replicated tree of a game whose `F19` forbids naming a
product is exactly the thing two builders would treat differently, and the platform regulates that
category specifically `[research: https://create.roblox.com/docs/production/monetization/paid-random-items]`.
They are ui-forge demo output, not this game's, and the fix is a deletion or a Rojo exclusion, not
a design. Recorded as `artifactHygiene` with a check. `[cid: decided]`

**Zero player-facing strings, stated as a field.** This domain writes none. `vocabulary`'s casing,
14-character ceiling, `allowedPattern` and eight banned words therefore bind nothing here, and the
correct way to say that is `playerFacingStrings.count: 0` rather than an empty section a verifier
reads as an omission `[research: cid/theme/vocabulary/02-banned-words.md]`.

**Boundary against my own sheet 02.** This sheet is spatial: which surfaces may carry an offer.
Sheet 02 is temporal: what appears in the gap between paying and the factor applying. Its rows are
the value of `pendingPurchase` below and it carries no manifest of its own.

```manifest
{
  "provides": "offerSurface",
  "status": "proposed",
  "value": {
    "storeScreenExists": false,
    "inGameOfferSurfaceCount": 0,
    "playerFacingStrings": { "count": 0, "list": [], "reason": "Every string this domain could write would name, price or point at a product, which products.F19 forbids. Zero is the value, not an omission." },
    "offerPath": {
      "path": "the Roblox experience page's own game-pass listing",
      "insideAnySurfaceThisContractDescribes": false,
      "reachableFromInsideTheGame": false,
      "deepLinkOrButtonToIt": "none",
      "copyOwnedBy": "store-listing and experience-page work (wave 7)",
      "provisioningOwnedBy": "the developer, per products.externalPrerequisite"
    },
    "trigger": {
      "promptGamePassPurchaseCalls": 0,
      "mirrors": "products.prompt.promptGamePassPurchaseCalls — restated, never overridden",
      "surfacelessTriggerRuled": "forbidden",
      "surfacelessTriggerReason": "The brief constrains what is sold and never ruled on a prompt raised with nothing drawn around it (gap S2). Closed against: input is closed at five verbs and four pressables, so no player action could raise one, and an unrequested prompt is theme/tone/04 D10 and onboarding/03 T6."
    },
    "deletedScreenTableRow": {
      "source": "04-PRESENTATION.md, Screens table, row 4: shop | 2 | the multiplier SKUs",
      "briefTag": "untagged, read as [brief: soft]",
      "status": "deleted",
      "deletedBy": "coordinator ruling R-4",
      "deferred": false,
      "priorityReservationAllowed": false,
      "note": "Deleted is not priority-2 deferred. No space, tab, slot or empty region is held open for it, and verification should read this row as a decision rather than a gap (gap S1/G3)."
    },
    "denyAppliesToEverySurfaceRow": {
      "mayPresentOffer": false,
      "mayNameProduct": false,
      "mayPriceProduct": false,
      "mayTriggerPurchase": false
    },
    "surfaces": [
      { "id": "hud.collectionCount", "kind": "persistent", "surface": "Collection count readout, 0 / 24", "drawnBy": "hud-binding", "closedBy": ["R-4", "products.F19"], "observable": "the readout's only data sources are state.found and collection.total; grep HudBinding.luau and the emitted hud screen for /robux|r\\$|pass|price|offer|shop/i -> 0 matches" },
      { "id": "hud.currency", "kind": "persistent", "surface": "Shards readout", "drawnBy": "hud-binding", "closedBy": ["R-4", "products.F19", "economy"], "observable": "the value rendered is state.currency alone; no second numeric field and no Robux-denominated figure exists in the snapshot (protocol.snapshotShape has eight fields, none monetary)" },
      { "id": "hud.areaProgressBar", "kind": "persistent", "surface": "Area progress bar and its label", "drawnBy": "hud-binding", "closedBy": ["R-4", "products.F19", "F10"], "observable": "the bar's 0-1 value derives from cleared/patchCount only; no element on this surface updates on a clock, which is also F10's check" },
      { "id": "hud.upgradeReadout.value", "kind": "persistent", "surface": "Value upgrade readout, level and next cost", "drawnBy": "hud-binding", "closedBy": ["R-4", "products.F19"], "observable": "the cost rendered is upgradeCost(u, level) in Shards; zero occurrences of priceRobux, R$ or any products[] label in the client tree" },
      { "id": "hud.upgradeReadout.radius", "kind": "persistent", "surface": "Reach upgrade readout, level and next cost", "drawnBy": "hud-binding", "closedBy": ["R-4", "products.F19"], "observable": "same check as hud.upgradeReadout.value. Span multiplies this axis and may not be named beside it: grep the client tree for the string in products.items[0].label -> 0 matches" },
      { "id": "hud.upgradeReadout.speed", "kind": "persistent", "surface": "Pace upgrade readout, level and next cost", "drawnBy": "hud-binding", "closedBy": ["R-4", "products.F19"], "observable": "same check as hud.upgradeReadout.value" },
      { "id": "pressable.BUY1", "kind": "persistent", "surface": "Pressable_BUY1", "drawnBy": "pressables", "closedBy": ["R-4", "products.F13", "input"], "observable": "its Activated handler fires BuyUpgrade with an upgrades[].id and nothing else; zero MarketplaceService references in game/src/client/**" },
      { "id": "pressable.BUY2", "kind": "persistent", "surface": "Pressable_BUY2", "drawnBy": "pressables", "closedBy": ["R-4", "products.F13", "input"], "observable": "same check as pressable.BUY1" },
      { "id": "pressable.BUY3", "kind": "persistent", "surface": "Pressable_BUY3", "drawnBy": "pressables", "closedBy": ["R-4", "products.F13", "input"], "observable": "same check as pressable.BUY1" },
      { "id": "pressable.INDEX", "kind": "persistent", "surface": "Pressable_INDEX", "drawnBy": "pressables", "closedBy": ["R-4", "products.F13", "input"], "observable": "pressables creates exactly four TextButtons and their names are the set {Pressable_BUY1, Pressable_BUY2, Pressable_BUY3, Pressable_INDEX}; a fifth is a failure of input.gameDrawnPressables before it is one of mine" },
      { "id": "index.surface", "kind": "opened", "surface": "The collection index panel, IndexSurface", "drawnBy": "index-screen", "closedBy": ["R-4", "products.F19", "03-META.md forbidden: any paid area, relic or set"], "observable": "IndexSurface holds exactly four labelled groups of six slots and no descendant whose Name or rendered text matches /price|buy|offer|pass|shop|lock/i; no empty slot carries a price, a padlock or a purchase affordance" },
      { "id": "transient.findReveal", "kind": "transient", "surface": "Find reveal, beat B1", "drawnBy": "the world channel, per response", "closedBy": ["R-4", "products.F14", "response"], "observable": "the reveal path creates no GuiObject and references no product; F14's check holds by construction because no purchase-related instance exists to reach it" },
      { "id": "transient.areaCompleteNotice", "kind": "transient", "surface": "Area completion notice, beat B3", "drawnBy": "the notice channel", "closedBy": ["R-4", "products.F14", "products.F19"], "observable": "the notice's content is fixed copy owned by notices work; grep it for the products[] label and for any Robux figure -> 0 matches" },
      { "id": "transient.setCompleteNotice", "kind": "transient", "surface": "Set completion notice, beat B2", "drawnBy": "the notice channel", "closedBy": ["R-4", "products.F14", "products.F19", "setBonus"], "observable": "same check as transient.areaCompleteNotice, and no variant of it names the axis a purchase also multiplies" },
      { "id": "moment.rowLift", "kind": "state-change", "surface": "An upgrade row lifting when its level-1 cost becomes affordable", "drawnBy": "hud-binding", "closedBy": ["R-4", "products.F14", "firstSession S6/S7"], "observable": "a lift changes one readout's Visible property and nothing else; it is silent and still, and no purchase-related element may appear on the same frame because none exists" },
      { "id": "moment.denominatorLift", "kind": "state-change", "surface": "The / 24 denominator lifting at the first Find", "drawnBy": "hud-binding", "closedBy": ["R-4", "products.F19"], "observable": "same check as moment.rowLift" },
      { "id": "state.preFirstSnapshot", "kind": "state", "surface": "The HUD between join and the first StateChanged snapshot", "drawnBy": "client-main", "closedBy": ["R-4", "products.F19", "onboarding/03 T6"], "observable": "no element that is absent in the steady state is present in this one; specifically no offer, no upsell, no loading-screen promotion and no unrequested panel of any kind" },
      { "id": "state.errorSystemCopy", "kind": "state", "surface": "Error and system copy, wherever it lands (gap G2)", "drawnBy": "unowned; nearest holder is notices work", "closedBy": ["R-4", "products.F19", "theme/tone/01 P1-P9"], "observable": "zero rendered strings in any error or system path match /robux|r\\$|pass|store|shop|offer|purchase|rejoin/i. The rejoin token is included deliberately: sheet 02 forbids the instruction and the register forbids the sentence independently" }
    ],
    "artifactHygiene": {
      "finding": "src/shared is synced wholesale into ReplicatedStorage.UIForge, so seven unreferenced ui-forge demo screens ship inside the place and replicate to every client. Three of them are storefronts: shop, shop-v2 and shop-galaxy render SHOP, Cosmic Egg, Void Egg, Luck Boost and price pills 25,000 / 90,000 / 1,500; crates renders COSMIC CRATES, 199 GEMS, 899 GEMS and BEST / VALUE badges.",
      "requiredByAnyModule": false,
      "onlyRequiredScreen": "hud",
      "mustNotBePresent": ["crates", "inventory", "quests", "roster", "shop", "shop-v2", "shop-galaxy"],
      "fix": "delete the seven files or exclude them from the Rojo tree; this is an artifact change, not a design change",
      "ruledBy": ["R-4", "products.F19", "products.F11", "platform paid-random-items guidance"],
      "bar": "two builders would diverge (b); no player sees it today, so not (a)"
    },
    "checks": [
      { "id": "C1", "check": "rg -i 'PromptGamePassPurchase|PromptProductPurchase|PromptPurchase|ProcessReceipt' game/src -> 0 matches" },
      { "id": "C2", "check": "rg -l 'MarketplaceService' game/src -> exactly one file, game/src/server/Entitlements.luau" },
      { "id": "C3", "check": "ls game/src/shared/Screens/*.luau -> exactly one file, hud.luau" },
      { "id": "C4", "check": "the client tree creates exactly four TextButtons, named Pressable_BUY1/2/3 and Pressable_INDEX" },
      { "id": "C5", "check": "zero rendered strings anywhere in the build match /robux|r\\$|game ?pass|store|shop|offer|sale|bundle/i" }
    ],
    "pendingPurchase": {
      "decidedIn": "cid/ui-ux/store/02-when-a-purchase-applies.md",
      "playerVisibleOutput": "none",
      "shownOnPurchase": [],
      "shownOnFailedOwnershipRead": [],
      "emptySetReason": "products.F19 leaves no surface that may refer to a product; theme/tone/04 D12 removes every way of signalling a thing has not happened; input.pressable.rejectionCueOnFailedPrecondition is none. The three jointly force silence, so the empty set is a build instruction and not an oversight.",
      "forbidden": [
        { "id": "P1", "thing": "A purchase-pending state on any readout, pressable or panel", "closedBy": ["products.F19", "R-4"], "observable": "no readout has a third visual state beyond present and withheld" },
        { "id": "P2", "thing": "A rejoin instruction, in any words", "closedBy": ["products.F19", "theme/tone/01 P1/P2/P6"], "observable": "zero rendered strings match /rejoin|restart|log ?out|come back|try again/i" },
        { "id": "P3", "thing": "A notice, toast, banner or modal when ownership resolves true mid-session", "closedBy": ["theme/tone/03 B4", "response.notice channel"], "observable": "the notice channel carries exactly two members, both completions; an ownership change enqueues nothing" },
        { "id": "P4", "thing": "A cue distinguishing not-yet-propagated from not-owned", "closedBy": ["theme/tone/04 D12", "input.rejectionCueOnFailedPrecondition: none"], "observable": "the two states are byte-identical on every surface; a diff of the rendered HUD across them is empty" },
        { "id": "P5", "thing": "A readout that announces itself when the factor lands (flash, pulse, count-up, colour change)", "closedBy": ["firstSession S6/S7", "theme/tone/04 D6", "theme/tone/03 B4"], "observable": "no Tween is created on any element by an owned-map change" },
        { "id": "P6", "thing": "A progress, spinner or waiting affordance for the ownership re-read", "closedBy": ["R-4", "onboarding/03 T6", "theme/tone/04 D12"], "observable": "the re-read creates and mutates no Instance on any client" },
        { "id": "P7", "thing": "An error, warning or retry surface when an ownership read fails", "closedBy": ["products.F19", "02-GAMEPLAY.md no failure state", "theme/tone/04 D12"], "observable": "the failure path in entitlements warns to the server console and touches no client" },
        { "id": "P8", "thing": "Any purchase-derived value written to the save payload, including a pending flag", "closedBy": ["products.F20"], "observable": "the save payload contains no pass id, product id, purchase-sourced factor or pending marker" }
      ],
      "resolution": {
        "trigger": "a server-side periodic re-read of products.ownershipCheck during the session, not only at wiring.onJoin step 2",
        "appliedVia": "the existing StateChanged snapshot, published on the next changed tick",
        "silent": true,
        "persisted": false,
        "clientEverTold": false,
        "controlEverAffected": false,
        "intervalOwnedBy": "ownership-resolution work, behind products.ownershipCheck",
        "intervalBound": "intervalSeconds <= maxAcceptableDetectionLatencySeconds / 2, so propagation rather than polling dominates the wait",
        "quotaArithmetic": "1 product x 16 players / interval; at 150 s that is 6.4 UserOwnsGamePassAsync calls per minute per server",
        "defaultPolicyUntilTested": "branchA",
        "policy": {
          "branchA": "re-read every interval, for the whole session, for every product currently resolving false",
          "branchB": "re-read only products whose last read errored, bounded attempts, and treat a clean false as final for the session"
        }
      },
      "failedRead": {
        "case": "UserOwnsGamePassAsync errors; entitlements warns once and resolves NOT OWNED",
        "playerSees": "nothing",
        "sameAnswerAsPurchaseCase": true,
        "repairedBy": "the same periodic re-read, under both branches",
        "whyItIsNotDisputed": "a pcall failure returned no ownership answer, so nothing was cached; a later read is a first read and the platform cache question does not arise",
        "worstCaseWithoutIt": "an owner plays a whole session at the base radius having paid 499 R$"
      },
      "latency": {
        "maxAcceptableDetectionLatencySeconds": 300,
        "playtestUnknown": true,
        "testRangeSeconds": [120, 900],
        "boundedBelowBy": "the platform's stated several-minute propagation window; no target under that is achievable at any poll rate",
        "measurement": "wall-clock from the experience-page purchase to the first tick at which the effective radius changes"
      },
      "cacheDispute": {
        "question": "does a repeat UserOwnsGamePassAsync call from the same running server observe a purchase made outside the experience during that session",
        "ruling": "yes, after propagation — the first-party generation source governs over community consensus",
        "status": "[unverified]",
        "governingSource": "https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/reference/engine/classes/MarketplaceService.yaml",
        "contraryReading": "cid/tech/networking/_lead.md, from an open devforum feature request with no staff reply",
        "settledBy": "one in-Studio or live test: join with a real pass unowned, poll every 30 s for 15 minutes, buy from the experience page at minute 2, record the first poll returning true. If none returns true, branch B is correct.",
        "buildIsUnchangedByTheAnswer": true
      }
    }
  }
}
```

## Consequences for other work

| subject | what this forces or forbids |
|---|---|
| HUD composition work (owner of `composition`) | Six of your elements and all four pressables are rows here. Nothing in a cluster, a group or a lift may be an offer, and a fifth pressable fails `input` before it fails me. You inherit no store row to lay out and must not reserve width for one. |
| Screen-inventory work (owner of `screens`) | The index panel is row `index.surface`: no locked slot, no price on an empty slot, no padlock, no paywalled set heading. Your screen inventory has no `shop` node and the reason is a deletion, not a deferral. |
| Navigation work (owner of `navigation`) | Your graph has two nodes. There is no store node to route to, no back edge from one, and `deletedScreenTableRow` is the citation for saying so rather than deciding it yourself. |
| Notice and transient-message work (owner of `notices`) | Three of your surfaces are rows here, and `state.errorSystemCopy`'s observable includes the token `rejoin` — if you rule that an error surface exists, it inherits that grep. |
| Ownership-resolution and build work (`products.ownershipCheck`, `entitlements`) | `pendingPurchase.resolution` is a requirement on you, with a bound on the interval and the quota arithmetic. Sheet 02 states it and pushes back on one clause of `products`. |
| Build and repo work | `artifactHygiene`: seven unreferenced generated screens, three of them storefronts with prices, ship inside the place today. Delete them or exclude them from the Rojo tree. |
| Store-listing work (wave 7) | You are the whole of the offer path. Nothing in the game points at you, names the pass or says one exists, so the pass listing and the description carry it alone. |

## Acceptance criteria

1. `rg -i 'PromptGamePassPurchase|PromptProductPurchase|PromptPurchase|ProcessReceipt' game/src` returns 0 matches, and `rg -l 'MarketplaceService' game/src` returns exactly one path, `game/src/server/Entitlements.luau`.
2. `game/src/shared/Screens/` contains exactly one `.luau` file, `hud.luau`.
3. The built client creates exactly four `TextButton` instances and their names are the set `{Pressable_BUY1, Pressable_BUY2, Pressable_BUY3, Pressable_INDEX}`.
4. Zero strings rendered anywhere in the build match `/robux|r\$|game ?pass|store|shop|offer|sale|bundle|rejoin/i`, and `offerSurface.playerFacingStrings.count` is 0.

## Not decided here

What is sold, at what factor and at what price — `products`, Monetization. What a player sees in the
gap between paying and the factor applying, and the failed-ownership-read case — sheet `02`, this
domain, whose rows are `pendingPurchase` above. The re-read interval, retry shape and rate-limit
budget — ownership-resolution work behind `products.ownershipCheck`; I state a bound and set no
value. Where each surface sits, how large it is and what it says — `composition`, `screens`,
`viewport`. Whether an error surface exists at all — `notices` (gap G2). The experience page's own
copy, the pass listing and the description — store-listing work, wave 7. A spend guard for the
under-13 share of an 8-14 audience — the developer and the experience page, not an in-game
surface, since R-4 leaves nothing in the game to guard (gap S5). Whether monetization gets a
priority slot at all — scope-ordering work (gap S6).
