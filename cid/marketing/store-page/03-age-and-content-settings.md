# 03 — Age and content settings

**Domain:** marketing/store-page · **Category:** Discovery & Marketing · **Wave:** 7

## Decision

**All fifteen questionnaire categories answer *none*, so the label is `Minimal`, which buys Roblox
Kids (5–8) and Roblox Select (9–15).** That is the only label under which the whole stated 8–14
audience can play, and it is forced by arithmetic rather than chosen. No spend guard is built.

## Why

**The consequence of leaving it unset is hard and is the reason this is a sheet rather than a
note.** *"If an experience does not have accurate or all content maturity information, Roblox
restricts the playability of the experience on the platform for all players"*
`[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/production/promotion/content-maturity.md]`.
`OPEN.md §1` carries no audit row for age or content at all, so the brief's position is **absent**,
not soft — gap P3.

**The label is forced, and here is the arithmetic.** The bands: **Minimal or Mild** → Roblox Kids
(5–8) **and** Roblox Select (9–15); **Moderate** → Select (9–15) **and** 16+; **Restricted** →
age-verified 18+ only `[research: same page]`. The audience is **8–14** `[brief: binding]` ←
`[you chose: R1 Q4]` (`00-CORE.md`), which **straddles two bands**: an eight-year-old is in Kids,
a fourteen-year-old is in Select. `Moderate` loses every eight-year-old; `Restricted` loses
everyone. **`Minimal` is the only label that covers the whole stated audience**, and the game must
actually contain nothing that would push it higher — which is what the fifteen rows below check.
The choice is between `Minimal` and `Mild`, both of which buy the same two bands; `Minimal` is
correct because every row answers *none*, and claiming `Mild` for safety would be a false
disclosure in the other direction.

**Each row is derived from an approved key or file, not asserted.** The three that would have been
the risk in this genre — fear, paid random items, and paid trading — are each closed by something
already merged rather than by an opinion about tone.

| # | disclosure category | answer | `backedBy` |
|---|---|---|---|
| 1 | Violence | none | `input` closes the verb list at five and none is an attack; `theme/identity/04` — nine classes of entity, none of them, so nothing exists to fight; `02-GAMEPLAY.md` zero tension `[you accepted: S6 Q2]` |
| 2 | Blood and gore | none | same. No character, creature or corpse exists in any roster (`theme/identity/04`; `objectArt`) |
| 3 | Fear | none | `theme/tone/01` `P8` bans `haunted cursed spirit ghost tomb doomed` as whole words; `01-FOUNDATION.md` *"not spooky, not grim"*; `theme/setting/03` `R1` fixes one lighting state, so there is no night and no dark |
| 4 | Crude humor | none | `theme/tone/02` `F8` excludes bathroom humor **by name** and permits anticlimax as the only mechanism; humor is confined to at most 6 of 24 `collection.sets[].relics[].flavour` lines |
| 5 | Unplayable gambling content | none | no casino, slot, wheel, card or dice object exists in `objectArt`'s roster; `endgame.forbidden` names none |
| 6 | Strong language | none | every string is authored and checked; `vocabulary.allowedPattern` plus `theme/tone/01` `P1`–`P9` over the ten `playerFacingStrings()` paths |
| 7 | Romantic themes | none | `theme/identity/04` — no cast, no NPC, no dialogue system exists to carry one |
| 8 | Alcohol, drugs or tobacco | none | `theme/setting/05`'s object inventory is masonry, fittings and litter; nothing consumable exists |
| 9 | Social hangout | no | `social.mechanicalInteraction: "none"`; `plotAccess.othersMayEnter: false`; `sharedState: []`; `maxCoPresenceSeparationStuds` scope is `spawnMomentOnly` |
| 10 | Free-form user creation | no | no build system; `F15` requires **zero `TextBox` instances** in any screen; `social.chat.playerAuthoredStringsToOtherClients: 0` |
| 11 | Sensitive or real-world issues | none | `theme/lore/02`'s six silences forbid the canon that would carry one; no real place, date, group or event is named anywhere |
| 12 | Paid items with random outcomes | no | `products` `F3` — every item has a deterministic factor, **zero odds tables**, and **zero `PolicyService:GetPolicyInfoForPlayerAsync` calls**; `products.itemCount: 1` |
| 13 | Paid item trading | no | `products` `F5` — zero developer products, nothing repeatable, zero `ProcessReceipt` callbacks; `endgame.forbidden` contains `trading`; `03-META.md` priority 3 |
| 14 | User-to-user media sharing | no | `social.chat` is `false` on text, window, bubble and voice; `friendSurfacing.readsSocialGraph: false`; no upload, no camera, no image field exists |
| 15 | AI-generated content or AI interaction | no | no generative system exists. `03-META.md` puts *real procedural generation* in priority 3; areas are shuffled **hand-authored** chunks `[you chose: R5 Q1]` |

**Two platform rows are relevant and neither changes an answer.** Paid random items would require
publishing all outcomes and their numerical odds summing to 100% and reading
`PolicyService.ArePaidRandomItemsRestricted`; paid trading would require `IsPaidItemTradingAllowed`
`[research: https://create.roblox.com/docs/production/monetization/paid-random-items]`. **Neither
call exists in the build and neither should**, which is what makes rows 12 and 13 checkable rather
than declared.

**P6, named and not built.** No spend guard exists for the under-13 share of an 8–14 audience, and
two domains have now routed it here — `monetization/02` and `ui-ux/store` `S5`, both declining to
invent one and both naming *"the experience page"*. **It has arrived and it is still not a copy
decision.** The platform's control is an **account-level parental monthly limit of 0 to 10,000
Robux** set by a guardian
`[research: https://en.help.roblox.com/hc/en-us/articles/4409125091348-Monthly-Spending-Limits]`,
with no developer-facing per-experience control surfaced. A developer can neither set it nor read
it. **The only thing this domain controls is not opposing it**, and that is a constraint on sheet
04's copy, recorded there and here: no outward string urges, hurries or rewards a purchase. The
decision itself routes to **the developer**.

**A negative result, recorded as one.** *Nothing in the `AnalyticsService` class reference states
any under-13 suppression of readings* — the page states nothing about collection scope, age or
retention at all
`[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/reference/engine/classes/AnalyticsService.yaml]`.
**That is not an answer and I am not recording it as one.** The wave-5 Analytics open item stays
`[unverified]`. Settled by: Roblox's privacy policy, or a Creator Hub analytics data-collection
page.

**The age-check bands are a third fact and they are not the maturity label.** The platform's own
bands are `Under 9`, `9-12`, `13-15`, `16-17`, `18-20`, `21+`, with chat outside experiences
restricted under 13
`[research: https://about.roblox.com/newsroom/2025/11/roblox-requires-age-checks-limits-minor-and-adult-chat]`.
The brief's 8–14 straddles **three** of them. Nothing here depends on that, because `social.chat`
is off on every surface by `social/01`'s own decision rather than by policy, so row 9 and row 14
answer *no* independently of how the policy moves.

**Nothing emits this either.** The questionnaire is answered by a human in the Creator Hub at
`release.provisioning` gate 1, and `release.publishChecklist` covers place settings only. P8 again.

```manifest
{
  "amends": "storeListing",
  "value": {
    "contentMaturity": {
      "label": "Minimal",
      "questionnaireAnswered": true,
      "categoryCount": 15,
      "categoriesAtNone": 15,
      "labelIsForced": true,
      "labelForcedBecause": "the audience is 8-14 and straddles two account bands. Minimal or Mild buys Roblox Kids 5-8 plus Roblox Select 9-15; Moderate buys Select plus 16+ and loses every eight-year-old; Restricted buys age-verified 18+ only. Minimal is the only label under which the whole stated audience can play.",
      "mildDeclinedBecause": "every category answers none. Mild buys the same two bands and would be a false disclosure in the safe direction.",
      "eligibleAccountBands": ["Roblox Kids 5-8", "Roblox Select 9-15"],
      "audienceBand": "8-14",
      "unsetConsequence": "Roblox restricts the playability of the experience on the platform for all players.",
      "setAt": "release.provisioning gate 1, by a human in the Creator Hub. No emitter writes it and release.publishChecklist does not cover it.",
      "questionnaire": [
        { "n": 1,  "category": "violence",              "answer": "none", "backedBy": ["input", "cid/theme/identity/04-no-cast-declaration.md", "02-GAMEPLAY.md zero tension"], "check": "input.verbs contains no attack, damage or weapon verb; no key names a hostile entity; zero Humanoid:TakeDamage calls in game/src" },
        { "n": 2,  "category": "bloodAndGore",          "answer": "none", "backedBy": ["cid/theme/identity/04-no-cast-declaration.md", "objectArt"], "check": "objectArt's roster contains no body, creature, corpse or fluid object" },
        { "n": 3,  "category": "fear",                  "answer": "none", "backedBy": ["cid/theme/tone/01-register.md P8", "01-FOUNDATION.md 'not spooky, not grim'", "lighting"], "check": "vocabulary and P8's list R ban haunted cursed spirit ghost tomb doomed as whole words; lighting fixes one ClockTime and no key defines a second" },
        { "n": 4,  "category": "crudeHumor",            "answer": "none", "backedBy": ["cid/theme/tone/02-flavour-and-humor.md F8"], "check": "F8 names bathroom humor as excluded and permits anticlimax alone; at most 6 of 24 flavour lines carry a humor mark and no other string may" },
        { "n": 5,  "category": "unplayableGambling",    "answer": "none", "backedBy": ["objectArt", "endgame.forbidden"], "check": "objectArt's roster contains no casino, slot, wheel, card or dice object" },
        { "n": 6,  "category": "strongLanguage",        "answer": "none", "backedBy": ["vocabulary.allowedPattern", "cid/theme/tone/01-register.md"], "check": "every string returned by playerFacingStrings() matches vocabulary.allowedPattern and is authored, not user-entered" },
        { "n": 7,  "category": "romanticThemes",        "answer": "none", "backedBy": ["cid/theme/identity/04-no-cast-declaration.md"], "check": "no key defines an NPC, a cast member or a dialogue system" },
        { "n": 8,  "category": "alcoholDrugsTobacco",   "answer": "none", "backedBy": ["cid/theme/setting/05-inventory.md", "objectArt"], "check": "the object inventory is masonry, fittings and litter; no consumable object exists" },
        { "n": 9,  "category": "socialHangout",         "answer": "no",   "backedBy": ["social.mechanicalInteraction", "social.plotAccess", "social.sharedState"], "check": "social.mechanicalInteraction is none; plotAccess.othersMayEnter is false; sharedState is an empty array" },
        { "n": 10, "category": "freeFormUserCreation",  "answer": "no",   "backedBy": ["products.forbidden F15", "social.chat.playerAuthoredStringsToOtherClients"], "check": "zero TextBox instances in any screen; playerAuthoredStringsToOtherClients is 0; no build, paint or placement verb exists in input" },
        { "n": 11, "category": "sensitiveIssues",       "answer": "none", "backedBy": ["cid/theme/lore/02-the-silences.md"], "check": "no string names a real place, date, organisation or event; the six silences forbid the canon that would carry one" },
        { "n": 12, "category": "paidRandomItems",       "answer": "no",   "backedBy": ["products.forbidden F3", "products.itemCount"], "check": "every products[] entry has a deterministic factor; zero odds tables anywhere; zero PolicyService:GetPolicyInfoForPlayerAsync calls in game/src" },
        { "n": 13, "category": "paidItemTrading",       "answer": "no",   "backedBy": ["products.forbidden F5", "endgame.forbidden", "03-META.md priority 3"], "check": "every products[].kind is gamePass and every repeatable is false; zero ProcessReceipt callbacks; endgame.forbidden contains trading" },
        { "n": 14, "category": "userToUserMediaSharing","answer": "no",   "backedBy": ["social.chat", "social.friendSurfacing"], "check": "social.chat.text, .chatWindowEnabled, .bubbleChatEnabled and .voice are all false; friendSurfacing.readsSocialGraph is false; no upload or capture path exists" },
        { "n": 15, "category": "aiInteraction",         "answer": "no",   "backedBy": ["03-META.md priority 3 'real procedural generation'", "layout"], "check": "layout draws from a hand-authored chunk family; no generative or model-backed system exists in game/src" }
      ],
      "platformCallsThatWouldBeRequiredAndAreNot": [
        { "call": "PolicyService:GetPolicyInfoForPlayerAsync().ArePaidRandomItemsRestricted", "requiredBy": "a paid random outcome", "callCount": 0 },
        { "call": "PolicyService:GetPolicyInfoForPlayerAsync().IsPaidItemTradingAllowed",     "requiredBy": "paid item trading",    "callCount": 0 }
      ],
      "ageCheckBands": ["Under 9", "9-12", "13-15", "16-17", "18-20", "21+"],
      "ageCheckBandsNote": "the platform's age-check bands are not the content-maturity label. The brief's 8-14 straddles three of them. Nothing in this key depends on them, because social/01 turned chat off on every surface on the platform-default argument rather than on age.",
      "spendGuard": {
        "exists": false,
        "developerControllable": false,
        "platformMechanism": "an account-level parental monthly spend limit of 0 to 10,000 Robux, set by a guardian",
        "developerCanSet": false,
        "developerCanRead": false,
        "routedHereBy": ["cid/gameplay/monetization/02-what-is-never-sold.md", "cid/ui-ux/store S5"],
        "whatThisDomainControls": "not opposing it. No outward string urges, hurries, rewards or discounts a purchase, which is storeListing.passListing.forbidden's whole subject.",
        "decisionOwner": "the developer",
        "notBuiltHere": "naming it is the compliant output. Inventing a per-experience limit would invent a platform control that does not exist."
      },
      "analyticsUnder13Suppression": {
        "state": "unverified",
        "negativeResult": "the AnalyticsService class reference states nothing about collection scope, age or retention. That is an absence of evidence, not a finding of no suppression.",
        "isTheWave5AnalyticsOpenItem": true,
        "settledBy": "Roblox's privacy policy, or a Creator Hub analytics data-collection page"
      }
    }
  }
}
```

## Consequences for other work

| subject | what this forces or forbids |
|---|---|
| Pass-listing work (sheet 04) | The spend-guard absence is a **copy constraint**: with no developer-side limit for the under-13 share of the audience, no outward string may urge, hurry, reward or discount a purchase. That is why `passListing.forbidden` exists as a list rather than as a register note. |
| Chat and co-presence work (`social`) | Row 9 and row 14 answer *no* on **your** fields. If `social.chat` is ever turned on, both rows are reopened and the label must be re-derived, because a hangout answer moves the game toward `Moderate` and out of Roblox Kids. **Do not change `chat` without revising this sheet.** |
| Monetization work (`products`) | Rows 12 and 13 rest on `F3` and `F5`. **A second product, a repeatable, an odds table or any `PolicyService` call reopens the questionnaire**, and the label is what pays for it. |
| Release work (`release.publishChecklist`) | Answering the questionnaire is a publish-time step with a hard failure mode (unset = unplayable for everyone) and **the checklist does not cover it**. Requested as a new row beside `P1`–`P4`; not written here. |
| Analytics work (`telemetry`, `kpis`) | Your open item is recorded as **`[unverified]`, not answered**. Do not read this sheet as clearance to assume under-13 readings are complete. |
| Contract-and-seam work | `storeListing.contentMaturity.label` should validate against the closed set `Minimal / Mild / Moderate / Restricted`, and `questionnaire[]` should assert `len == 15` with every row carrying a non-empty `backedBy` and `check`. |

## Acceptance criteria

1. `storeListing.contentMaturity.questionnaire` has exactly **15** rows; every `answer` is `"none"`
   or `"no"`; every row has a non-empty `backedBy` array and a non-empty `check`.
2. `label` is `"Minimal"` and `eligibleAccountBands` contains both `"Roblox Kids 5-8"` and
   `"Roblox Select 9-15"`, so the whole `8-14` band is covered.
3. `grep -rn "GetPolicyInfoForPlayerAsync\|ProcessReceipt\|PromptProductPurchase" game/src` returns
   **0** matches, and `grep -rnc "TextBox" game/src/shared/Screens/` returns **0**.
4. `spendGuard.exists` is `false`, `spendGuard.decisionOwner` is `"the developer"`, and
   `analyticsUnder13Suppression.state` is the string `"unverified"`. No field in this key is `null`.

## Flagged to the developer

| item | position |
|---|---|
| **No spend guard exists for the under-13 share of an 8–14 audience (P6, arrived from two domains).** | `[cid: decided]` to name it and not build it. The platform offers only a guardian-set, account-level monthly limit of 0–10,000 Robux; there is no developer-facing per-experience control to build against. Live alternatives: **(a)** as decided — no guard, and outward copy that never urges a purchase; **(b)** drop `Span` entirely, which makes the question vacuous and forfeits the one item `03-META.md` names as homeless; **(c)** lower `priceRobux` toward the 349 floor of its published range, which is `products`' field and Balance's call, not mine. I recommend (a). |
| **The brief has no age or content position at all (P3).** | `OPEN.md §1` carries no audit row. `Minimal` is derived, not chosen, and the derivation is fifteen rows above. If any one of them is wrong, the label moves and the audience band moves with it, so **the fifteen rows are the thing to check, not the label**. |
| **Under-13 analytics behaviour is `[unverified]` and stays open.** | Recorded as a negative result rather than an answer. If wave-5 Analytics is reading anything as complete for this audience, that assumption is unsourced. |

## Not decided here

Every line of the description and the claim ledger — sheet **01**. The genre, subgenre and keyword
set — sheet **02**. Every outward string about `Span`, and the forbidden list this sheet's
spend-guard constraint feeds — sheet **04**. The update-notes format — sheet **05**. Whether chat
exists on any surface (`social`, `gameplay/social/01`) — this sheet reads those fields and sets
none. What is sold, at what price and on what axis (`products`). Whether a spend guard exists at
all (**the developer**). Whether `AnalyticsService` readings are complete for under-13 accounts
(nobody; `[unverified]` with the fetch named). Server size, device settings and avatar type
(`release.publishChecklist`).
