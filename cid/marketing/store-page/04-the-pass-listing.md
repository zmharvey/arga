# 04 — The pass listing

**Domain:** marketing/store-page · **Category:** Discovery & Marketing · **Wave:** 7

## Decision

**Two sentences on the Store tab, carrying no number and no price**, under a name that is
`products.items[0].label` by rule rather than by copy. **Every string in this key is true at every
provisioning gate**, including the one where the pass does not exist yet, so nothing here has to be
rewritten when `gamePassId` is filled.

## Why

**This copy is the whole of the product's discoverability, and that is not a figure of speech.**
R-4 removed the in-game store, `F19` forbids the game naming, showing, pricing or referring to a
product **anywhere inside itself**, and `monetization/01` states the cost by name: *"a player who
owns no pass has no way to learn from inside the game that a pass exists. The experience page is
the only surface on which `Span` is discoverable"*, which makes this copy *"load-bearing rather
than decorative"* `[research: cid/gameplay/monetization/01-the-offer-ladder.md]`.

**The platform gives a pass four fields and I own two of them.** A pass listing carries **name,
description, icon and price**; price is 1 to 1,000,000,000 Robux; the icon is at most 512×512, in
.jpg/.png/.bmp, and is cropped to a circle; passes appear in the **Store tab of the game details
page**; and the experience *"has been published and is accessible on Roblox"* is a prerequisite for
creating one `[research: https://create.roblox.com/docs/production/monetization/game-passes]`.

| field | owner | value or rule |
|---|---|---|
| name | **this key, as a rule** | equals `products.items[0].label`. Not a second string |
| description | **this key** | the two sentences below |
| icon | art belongs to **Icon**; constraints are here | count 1, ≤ 512×512, .jpg/.png/.bmp, circular crop; `T6` and `theme/identity/04` bind its subject |
| price | `products.items[0].priceRobux` = **499** | cited, not restated, and **not written into any string** |

**The name is a rule, not a copy decision, and that is deliberate.** `monetization/01` reserved
`products.items[0].label` as *"the one field Vocabulary may overwrite without a revision against
this sheet"*. If I wrote a second outward name, one object would have two strings and they would
drift. So the Store tab name **is** the label, and the cost is stated: `Span` alone is opaque to a
stranger, because `F19` means it has no in-game twin to have learned it from. **The description is
what closes that gap**, which is why the first sentence says what it does before anything else.

**The description states no multiplier figure and no price, and both omissions are decisions.**
`products.items[0].factor` is 1.75 with a published `factorTestRange` of `[1.40, 1.95]` and
`factorStatus: "playtest unknown"`; `priceRobux` is 499 with a published range of `[349, 999]` that
`roadmap` `X1` says ships *"with no revision"*. **A number in this copy would be a claim Balance &
Tuning can falsify without anyone touching this sheet** — the same shape of defect as the stale
completion time in sheet 01. So the copy describes the effect qualitatively and lets the platform
render the price field it already renders.

**The two sentences, verbatim:**

> `Clears a wider circle as you walk. Bought once and kept forever. It does not find anything for
> you - all 24 finds can be reached without it.`

**Three claims, three backings.** *"Clears a wider circle"* is `axis: "radius"`; *"bought once and
kept forever"* is `repeatable: false` plus `stacksWithSelf: false` plus permanence; *"all 24 finds
can be reached without it"* is `F17`, and it is the thing that is true and unusual in this genre —
the reference sells a 2,500-Robux oversized tool and this one sells nothing that touches the
collection at all `[research: cid/gameplay/monetization/01-the-offer-ladder.md]`.

**No line implies a paid path to any Find, set, area or completion**, which `03-META.md` forbids as
*"a paid-only object would turn 100% completion into a purchase."* The third sentence says the
opposite explicitly rather than relying on the absence of a claim, because absence is not
checkable and a sentence is.

**No urgency, and the constraint is doubled.** `F10`–`F12` bind in-game; `T10` binds outward; the
platform's own guidance forbids claiming an item *"is almost out of stock or only available for a
short time if it isn't true"* and recommends *"View Item"* / *"See Price"* over *"GET IT NOW"* /
*"BUY BEFORE IT'S GONE!"* for younger audiences
`[research: https://create.roblox.com/docs/production/monetization]`. **The audience is 8–14
`[brief: binding]` and sheet 03 records that no developer-side spend guard exists**, so softer
framing is not a preference here — it is the only lever this project holds on the under-13 share,
and it is why the forbidden list below is enumerated rather than summarised.

**P7 closed as data: what the listing says while `gamePassId` is unfilled is *nothing*, and that
is a gate rather than an unfinished spec.** The pass cannot be created until the experience is
published, so the copy exists before the object it describes does. The Store tab is empty at gates
1–3 and the experience description **never refers to it** (sheet 01, row `E11`), so no string
anywhere points at a product that cannot be bought.

| gate | step | this key's state |
|---|---|---|
| 1 | publish the place | description and genre live; **Store tab empty**; `published: false` |
| 2 | `publishChecklist` `P1`–`P4`, plus the maturity questionnaire | no change here |
| 3 | answer the mid-session re-resolution question (`tech/networking`) | no change here |
| 4 | **create the pass**: name = `products.items[0].label`, price = `priceRobux`, paste this description, upload the icon | `published: true` |
| 5 | write `gamePassId` into `cid/gameplay/monetization/01` and re-emit | no change here |
| 6 | republish, then restart servers | no change here |

Gate 4 is where every string in this key is typed by a human. **No emitter writes any of it**, and
`release.publishChecklist` covers place settings only (P8).

```manifest
{
  "amends": "storeListing",
  "value": {
    "passListing": {
      "surface": "the Store tab of the experience page",
      "itemCount": 1,
      "itemCountWillNeverGrow": "products.itemCount is 1; F5 forbids developer products and anything repeatable; F9 fixes one axis and one factor per product; roadmap G4 forbids a drop adding a product, a price tier or a second SKU",
      "fieldsThePlatformGives": ["name", "description", "icon", "price"],
      "name": {
        "ownedHere": false,
        "rule": "equals products.items[0].label exactly",
        "valueToday": "Span",
        "reason": "monetization/01 reserved label as the one field Vocabulary may overwrite without a revision. A second outward name would make one object carry two strings that can drift.",
        "cost": "Span alone is opaque to a stranger, because F19 means it appears nowhere inside the game. The description closes that gap in its first sentence."
      },
      "description": {
        "ownedHere": true,
        "text": "Clears a wider circle as you walk. Bought once and kept forever. It does not find anything for you - all 24 finds can be reached without it.",
        "statesFactorNumber": false,
        "statesFactorNumberReason": "products.items[0].factor is 1.75 with factorTestRange [1.40, 1.95] and factorStatus playtest unknown. A figure here is a claim Balance and Tuning can falsify without touching this sheet.",
        "statesPrice": false,
        "statesPriceReason": "priceRobux may move anywhere inside [349, 999] with no revision (products; roadmap X1). The platform renders the price field itself, so a figure in the copy adds nothing and can only go stale.",
        "emojiCount": 0,
        "exclamationMarkCount": 0,
        "allCapsWordCount": 0
      },
      "icon": {
        "count": 1,
        "artOwner": "marketing/icon",
        "artNotOwnedHere": true,
        "maxDimensionPx": 512,
        "formats": ["jpg", "png", "bmp"],
        "croppedTo": "circle",
        "requiredByPlatform": "unverified",
        "requiredByPlatformSettledBy": "the Creator Hub pass-creation form, which shows whether the icon field is optional",
        "subjectForbidden": [
          "any rendered Find, as an object, model, card, drop or icon (T6; representation.find has no Instance at any point in its life; objectArt Z9)",
          "any mascot, face, eyes or mouth other than a player avatar (theme/identity/04)",
          "any shop screen, offer row, price, purchase control or currency symbol (R-4; offerSurface is an explicit empty set)",
          "night, dusk, weather or any second hour (theme/setting/03 R1 and R2; every promotional image is at ClockTime 15.5)",
          "any capture of the build as it ships today (G2, T8)"
        ]
      },
      "price": {
        "ownedHere": false,
        "source": "products.items[0].priceRobux",
        "valueToday": 499,
        "movableRange": [349, 999],
        "movesWithoutRevisingThisKey": true,
        "reason": "no string in this key contains a price, so a price move inside its published range falsifies nothing written here"
      },
      "whatItDoes": {
        "axis": "radius",
        "factor": 1.75,
        "repeatable": false,
        "stacksWithSelf": false,
        "permanent": true,
        "grantsNothingElse": "F9 fixes one axis and one factor per product and forbids a grants array",
        "sourcedFrom": "products.items[0]. Cited, not set here."
      },
      "claims": [
        {
          "id": "P1",
          "text": "Clears a wider circle as you walk.",
          "surface": "storeListing.passListing.description",
          "backedBy": ["products.items[0].axis", "products.items[0].factor", "movement.baseClearRadius"],
          "check": "products.items[0].axis == 'radius' and factor > 1. The sentence names no figure, so no tuning move inside factorTestRange can falsify it.",
          "truthCondition": "always while the one product is sold on the radius axis. If axesSold ever changes, this row is revised.",
          "tCleared": ["T3", "T10"]
        },
        {
          "id": "P2",
          "text": "Bought once and kept forever.",
          "surface": "storeListing.passListing.description",
          "backedBy": ["products.items[0].repeatable", "products.items[0].stacksWithSelf", "products.forbidden F5", "products.forbidden F6"],
          "check": "repeatable is false; stacksWithSelf is false; F6 forbids any duration, expiry, uses, charges or cooldown field on any product; kind is gamePass, which the platform documents as a one-time fee",
          "truthCondition": "always. F5 and F6 close the repeatable and the timed forms permanently.",
          "tCleared": ["T4", "T10"]
        },
        {
          "id": "P3",
          "text": "It does not find anything for you - all 24 finds can be reached without it.",
          "surface": "storeListing.passListing.description",
          "backedBy": ["products.forbidden F17", "products.forbidden F1", "products.forbidden F4", "03-META.md 'Never content access'", "collection.sets"],
          "check": "no products[] entry grants a collection entry, an area id or a set (F1); no axis equals luck (F4); F17's check passes, i.e. no product clears a patch, completes an area or grants a Find; sum(len(collection.sets[i].relics)) == 24",
          "truthCondition": "always while 03-META.md's content-access ban holds. This is the claim no surveyed competitor can make: the reference sells a 2,500-Robux oversized tool and this game's one product touches the collection not at all.",
          "tCleared": ["T1", "T3", "T10"]
        }
      ],
      "forbidden": [
        { "id": "L1",  "rule": "no exclamation mark, and no all-caps word of two or more letters", "check": "the description contains 0 '!' and 0 all-caps words", "closedBy": "platform guidance preferring View Item / See Price over GET IT NOW for younger audiences; 8-14 [brief: binding]" },
        { "id": "L2",  "rule": "no urgency words: limited, hurry, now, today, tonight, ends, expires, last chance, don't miss, before it's gone", "check": "0 case-insensitive matches for /limited|hurry|today only|tonight|ends in|expires|last chance|before it.s gone/", "closedBy": "T10; F10; platform guidance against a false sense of urgency" },
        { "id": "L3",  "rule": "no scarcity: no stock count, no 'only N left', no 'N players own this', no waitlist, no queue", "check": "the description contains no numeral sourced from anything but collection", "closedBy": "F11; platform guidance against artificial scarcity" },
        { "id": "L4",  "rule": "no discount, sale, strikethrough, was-price, bundle price or first-purchase bonus", "check": "the description contains no price, no percentage and no second figure; products has no priceWas, discount, bundle or bonus field", "closedBy": "F12; platform guidance that discounts be genuine and fair" },
        { "id": "L5",  "rule": "no countdown, clock, date or window of any kind", "check": "no field in this key holds a date, an interval or a duration", "closedBy": "F10; theme/tone/04 D9" },
        { "id": "L6",  "rule": "no claim that the pass grants, unlocks, reveals, guarantees or speeds up finding any Find, set, area or completion", "check": "the description's third sentence asserts the opposite explicitly, and F1, F4 and F17 back it", "closedBy": "03-META.md, 'a paid-only object would turn 100% completion into a purchase'" },
        { "id": "L7",  "rule": "no reference to a second product, a next tier, a bundle, a subscription or anything 'coming soon'", "check": "products.itemCount is 1; roadmap G4 forbids a drop adding one; the description names no other item", "closedBy": "F5, F9, F18; roadmap G4" },
        { "id": "L8",  "rule": "no group-join, Discord, code, like, favourite, follow, rate or share prompt", "check": "0 case-insensitive matches for /code|redeem|group|discord|favou?rite|follow|rate us|share|like/", "closedBy": "F15's outward twin; channels is an empty set; both fetched competitors ship exactly these" },
        { "id": "L9",  "rule": "no emoji, glyph or codepoint above U+007E", "check": "every character in the description is ASCII", "closedBy": "the genre's own title tic; the platform's one-or-two-emoji ceiling is a maximum, not a target" },
        { "id": "L10", "rule": "no humor of any kind", "check": "read-aloud review against theme/tone/02 F1-F8; the only permitted humor mechanism in this game is anticlimax and it is confined to at most 6 of 24 flavour lines", "closedBy": "theme/tone/02, which names the store listing by name [brief: binding]" },
        { "id": "L11", "rule": "no comparison to another game, another product, or another player", "check": "the description names no other title and no other player", "closedBy": "00-CORE.md non-goals; T5" },
        { "id": "L12", "rule": "no 'best value', 'recommended', 'most popular', 'top pick' or any endorsement of the purchase", "check": "0 case-insensitive matches for /best|recommend|popular|top pick|value pack/", "closedBy": "sheet 03's spend-guard constraint: no developer-side limit exists for the under-13 share, so nothing outward may urge a purchase" },
        { "id": "L13", "rule": "no in-game screenshot, mock purchase flow or shop image on the pass icon", "check": "the icon's subjectForbidden list; offerSurface is an explicit empty set, so there is no such screen to photograph", "closedBy": "R-4; T7; T8" }
      ],
      "provisioning": {
        "gamePassIdSource": "products.items[0].gamePassId",
        "gamePassIdToday": "unprovisioned",
        "unprovisionedEmittedAs": 0,
        "unprovisionedEmittedAsSource": "release.provisioning.unprovisionedIdValue. tech/deploy/02 makes an emitted null a hard error.",
        "published": false,
        "publishedGate": 4,
        "whatTheListingSaysBeforeGate4": "nothing. The Store tab is empty because the pass object does not exist, and no string on the experience page refers to it: storeListing.excludedFromDescription E11 forbids the description from naming the pass, a price or the Store tab.",
        "everyStringHereIsTrueAtEveryGate": true,
        "gates": [
          { "n": 1, "gate": "publish the place",                                                              "thisKey": "Store tab empty; published false" },
          { "n": 2, "gate": "execute publishChecklist P1 to P4 and answer the content-maturity questionnaire", "thisKey": "no change" },
          { "n": 3, "gate": "answer the mid-session pass re-resolution question (tech/networking)",            "thisKey": "no change" },
          { "n": 4, "gate": "create the pass: name = products.items[0].label, price = products.items[0].priceRobux, description = this key's text, icon uploaded", "thisKey": "published true" },
          { "n": 5, "gate": "write gamePassId into cid/gameplay/monetization/01 and re-emit",                   "thisKey": "no change" },
          { "n": 6, "gate": "republish, then restart servers",                                                  "thisKey": "no change" }
        ],
        "emitter": "none. Every string in this key is typed by a human at gate 4. release.publishChecklist covers place settings only."
      }
    }
  }
}
```

## Consequences for other work

| subject | what this forces or forbids |
|---|---|
| Description work (sheet 01) | `E11` holds: the experience description names no pass, no price and no Store tab. **This key is the only place `Span` is described**, and sheet 01's `S4.L7` is the only line on the page that touches the subject, from the other side. |
| Monetization work (`products`) | `name` is `products.items[0].label` **by rule**, so a Vocabulary overwrite of `label` silently changes the Store tab name and needs no revision here — which is the intended behaviour, stated so it is not a surprise. A change to `axis` or to `F17` **does** revise claim rows `P1` and `P3`. |
| Balance & Tuning | `factor` may move anywhere in `[1.40, 1.95]` and `priceRobux` anywhere in `[349, 999]` **without touching one word of this copy**, because neither figure appears in it. That is the whole reason the figures were left out. |
| Icon work (`storeIcon`) | You do not own the **pass** icon's art by default — I have routed it to you because it is the same discipline and the same palette, and the five `subjectForbidden` rows are the same constraints your own artifact carries. If you decline, say so and the field's owner is the developer at gate 4. |
| Release work (`release.provisioning`) | Gate 4 gains a payload it did not name: **the pass description and icon are typed and uploaded there**, not only the name and price. One clause, not a re-decision. |
| Live Ops — Roadmap | `G4` (no drop adds a product, a price tier or a second SKU) is what makes `L7` permanently true. If `G4` is ever reopened, `L7` and `itemCountWillNeverGrow` both fail. |

## Acceptance criteria

1. `storeListing.passListing.description` contains **0** `!`, **0** all-caps words of two or more
   letters, **0** codepoints above U+007E, **0** members of `vocabulary.bannedWords`, and **0**
   numerals other than `24`.
2. `storeListing.passListing.name.valueToday` is byte-identical to `products.items[0].label`, and
   `price.valueToday` is byte-identical to `products.items[0].priceRobux`.
3. Every row in `forbidden` has a runnable `check`; running all thirteen against
   `passListing.description` returns **0** violations.
4. `provisioning.gates` has **6** rows matching `release.provisioning.gates` by number and gate
   text, `published` is `false`, and no field anywhere in this key is `null`.

## Flagged to the developer

| item | position |
|---|---|
| **The Store tab name is `Span` and a stranger has no way to know what that means before reading the description.** | `[cid: decided]`. `F19` guarantees the word appears nowhere inside the game, so there is no prior exposure. Live alternatives: **(a)** as decided — the name mirrors `products.items[0].label` and the description carries the meaning; **(b)** an outward-only name such as `Wider Sweep`, which is clearer to a stranger and creates a second string for one object. I recommend (a) because two strings drift and one does not. |
| **No figure appears in the pass copy — not the multiplier, not the price.** | `[cid: decided]`. Both are published with live ranges that ship without revision. If Balance fixes `factor`, the multiplier may be added in one edit and `statesFactorNumber` flips. Until then, a figure here is a stale claim waiting to happen. |
| **The pass is unbuyable at publish, and nothing on the page says so (P7).** | Correct and deliberate: the Store tab is simply empty, and no string points at it. The risk is the reverse of the usual one — **a developer who publishes and forgets gate 4 ships a game whose only product does not exist and whose page says nothing is missing.** That is why `provisioning.gates` is data. |

## Not decided here

Every line of the experience description and the claim ledger — sheet **01**, whose `E11` forbids
it from naming any of this. The genre, subgenre and keywords — sheet **02**. The content-maturity
answers and the spend-guard routing — sheet **03**, whose constraint `L12` implements. The
update-notes format — sheet **05**. What `Span` costs, what it multiplies, whether it is sold at
all, and whether the tool head widens with it (`products`, `tool`). The pass icon's actual artwork
(Icon, or the developer at gate 4 if Icon declines). The experience icon and every thumbnail (Icon,
Thumbnails). Whether the mid-session ownership re-resolution exists (`tech/networking`, gate 3).
The publish order and the checklist itself (`release`, `tech/deploy/01`). Whether a spend guard
exists (**the developer**).
