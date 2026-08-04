# Discovery & Marketing — category brief

**Wave:** 7. Source: `concept/spec/incremental-spinoff-v2/`. Read `HANDOFF.md` first, then
`CONCEPT.md`, `00-CORE.md`, and every numbered sheet through `05-OUTWARD.md` — Discovery &
Marketing is a **layer-5** subject, the deepest in the brief, so layers 1–4 are constraints you
inherit and not decisions you get to make. Then `OPEN.md` §1, §2, §3, §4 and §5.

This is an **assignment document.** It contains no Discovery & Marketing decisions. No name, no
line of copy, no tag, no image, no cadence. Every row below cites the brief line, approved key,
ruling or shipped file that put it there.

Also read before you write: `cid/_digest.md` (every wave 1–6 decision and its boundary),
`cid/_contract.md` (25 merged keys and their owners), `cid/_state.md` (rulings R-1..R-4,
escalations, build-stage notes), `cid/_playtest.md` (the only empirical reading this project has,
n = 1), `cid/theme/vocabulary/01` and `/02`, `cid/theme/tone/01` and `/02`, `cid/theme/fantasy/02`,
`cid/theme/identity/04`, `cid/theme/setting/02` and `/03`, `cid/gameplay/monetization/01` and `/02`,
`cid/gameplay/meta/07`, `cid/gameplay/core-loop/04`, `cid/art/_category.md`,
`cid/art/ui-art/01` and `/04`, `cid/art/style/01`, `cid/art/objects/02`, `cid/ui-ux/store/_lead.md`,
`cid/tech/deploy/_lead.md`, and `research/landscape.md` — which is the single most important
document this category has, because it is the only occupancy survey anyone ran.

---

## The situation, stated once, because it bounds what every domain here may promise

> *"**This game exists to prove the `arga` pipeline works end to end.** … Success is **shipped
> artifacts, not players**."* — `00-CORE.md` `[you chose: R1 Q3]` → **`[brief: binding]`**
>
> **Non-goals:** *"**Beating the genre's retention curve.** Offered and declined."* /
> *"**Revenue.** Offered and declined."* — `00-CORE.md`, same tag → **`[brief: binding]`**
>
> *"**Consequence downstream:** content design is the primary creative work on this project, not
> art or **marketing**."* — `00-CORE.md` `[you chose: R1 Q1]` → **`[brief: binding]`**

**This category's whole subject is acquiring an audience the project has declined to chase, and
that is stated rather than hidden.** Two things follow and they pull in opposite directions:

1. **No domain here may grow the project.** A campaign, a channel, a cadence or a variant set that
   exists so a lead has something to write fails `00-CORE.md` twice over. Concluding *nothing* with
   a reason and a check is the compliant output, and wave 6's Music domain is the standard:
   `trackCount: 0`, the reason stated, the check runnable, and when its own figure turned out wrong
   it published why its grep missed rather than quietly correcting the number. Hold to that.
2. **And yet the two artifacts this category does produce are the only ones in the whole project
   that make claims to people who have not consented to a demo.** Every other category writes for a
   player already inside the game. A store page and a thumbnail speak to someone outside it. **A
   promise the game does not keep is a defect that meets stopping-rule bar (a), and this category is
   the only one positioned to commit it and the only one positioned to catch it.**

Both are true at once. Resolve them by being **small and true**, not by being ambitious and not by
being empty.

---

## The full outward surface, enumerated once

**Every artifact a person who has not played this game could see.** Six leads partition this list.
Nothing outside it is produced without a lead ruling that it should be and saying why. **live** =
this project needs it and a lead owns it. **dormant** = the surface exists on the platform, nothing
in this project funds it, and a lead must rule *nothing* with a reason rather than leave it silent.
**forbidden** = an approved decision or the scope gate closes it, and naming it in order to forbid
it is the compliant form.

| # | surface | state | what makes it so | lead |
|---|---|---|---|---|
| 1 | **Experience name** | **live** | *"The working name is a placeholder. `incremental-spinoff-v2` is a slug, not a name."* `OPEN.md §3`, under the heading **"Needs you"** | Name |
| 2 | **Experience description** (store copy) | **live** | `OPEN.md §4` routes *"Name, icon, thumbnail, store description"* here; `monetization/01`: *"a player who owns no pass has no way to learn from inside the game that a pass exists. The experience page is the only surface on which `Span` is discoverable"* | Store Page |
| 3 | **Experience icon** | **live** | `OPEN.md §4`. **UI Art's zero does not reach it** — see the ruling below | Icon |
| 4 | **Thumbnail image set** | **live** | `05-OUTWARD.md`: *"It gives a thumbnail two composable halves — a cleared path through green, and a relic mid-reveal."* `[you accepted: R6 Q1]` → `[brief: soft]` | Thumbnails |
| 5 | **Genre / subgenre selection** | **live** | `CONCEPT.md`: *"A **restoration / completion game**, not an incremental"* `[you chose: R4 Q2]` → `[brief: binding]`; `uiTheme.genre` already ships the string `"restoration"` | Store Page |
| 6 | **Tags / keyword set** | **live** | graph `must_verify`: *"Tag choice is a discovery decision, not copywriting"* | Store Page |
| 7 | **Age recommendation and content settings** | **live** | audience *"8–14"* `[you chose: R1 Q4]` → `[brief: binding]`; the category `checks` in `docs/cid-workflow.json` test it by name | Store Page |
| 8 | **The pass listing's own copy in the experience Store tab** | **live** | `monetization/01` *Not decided here*: *"How the experience page describes the pass — Discovery & Marketing, wave 7"* | Store Page |
| 9 | **Thumbnail video / trailer** | **dormant** | Hype owns *trailer briefs* per the graph. No legitimate capture build exists today (G2 below), and `00-CORE.md` declines players | Hype |
| 10 | **Update notes / changelog / patch notes** | **dormant** | *"Ships and settles. No seasons or events."* `OPEN.md §2` `[I assumed]` → `[brief: soft]`. `theme/tone/02` already extends the humor ban to *"changelogs, patch notes"* `[cid: decided]` | Store Page (format), Hype (whether a beat exists) |
| 11 | **Roblox group** | **dormant** | `F15` forbids a group-join prompt *inside* the game; the group itself is outside it and nothing funds one | Social |
| 12 | **Experience-page social links** (Discord, YouTube, X, …) | **dormant** | a link needs a channel; no channel exists | Social |
| 13 | **Discord / TikTok / YouTube / X presence, posting cadence, content pillars** | **dormant** | the whole of Social's graph `owns` list; nothing in the brief funds any of it | Social |
| 14 | **Creator and influencer outreach** | **dormant** | same | Social |
| 15 | **Launch beat structure (teaser → reveal → launch), countdown, cross-promotion, re-engagement push** | **dormant** | Hype's whole graph `owns` list. *"Beating the genre's retention curve. Offered and declined"* `[brief: binding]` closes re-engagement by name | Hype |
| 16 | **Title tags on the name (`[UPDATE]`, `[X2]`)** | **dormant** | Name's graph `owns` list includes them; *"ships and settles"* leaves no update to tag, and `theme/vocabulary/02` bans nothing here because the listing is outside its table — rule it, do not assume it | Name |
| 17 | **Seasonal or event variant of icon, thumbnail or name** | **forbidden** | `03-META.md` priority 3 *"seasons and events"*; `theme/setting/03` `R1` — one lighting state *"on any screen, **in any promotional image**"*; `theme/tone/04` `D15` | Icon, Thumbnails |
| 18 | **Any promotional image at a second hour, at night, or in weather** | **forbidden** | `theme/setting/03` `R1` verbatim above, and `R2` *"**No weather, ever, as a depicted event.**"* `art/lighting/01`: *"every promotional image is at `ClockTime` 15.5"* | Thumbnails, Icon |
| 19 | **A mascot, a face, eyes or a mouth on the icon or a thumbnail** | **forbidden** | `theme/identity/04`: *"nine classes of entity: **none of them** … no mascot"*, and its own consequence line to this category: *"the icon and thumbnail have **no mascot and no face other than a player avatar**"*; `theme/tone/04` `D13` | Icon, Thumbnails |
| 20 | **A rendered Find shown as an object, a model, a card or an icon** | **forbidden** | `representation.find`: *"A Find has **no Instance at any point in its life**"*; `objectArt` `Z9` *icon renders of any object: 0*; `art/ui-art/04` `icons.count: 0`. **A Find's only form anywhere is its name in the index panel** | Thumbnails, Icon |
| 21 | **A screenshot of an in-game shop, offer row, price or purchase control** | **forbidden** | ruling R-4; `products.storeExists: false`; `offerSurface` is an explicit empty set. There is no such screen to photograph | Thumbnails |
| 22 | **A screenshot taken from the build as it ships today, presented as representative** | **forbidden** | G2 below. `game/src/shared/Theme.luau` is `archetype = "cartoon-vibrant"`, `sourceTitle = "Pet Ascend Simulator"`, surface `#2B1B4D`, font `FredokaOne`, against a brief naming `fantasy-ornate` three times and arguing against `cartoon-vibrant` **by name** | Thumbnails, Store Page |
| 23 | **Badges, a leaderboard, a code posted anywhere, a daily-reward or trading claim** | **forbidden** | `03-META.md` priority 3, quoted in full below; `endgame.forbidden` lists `badgeLadder`, `leaderboard`, `trading`, `redeemCode` | all six |
| 24 | **Paid private servers, or any second thing sold** | **forbidden** | `products.itemCount` is **1**; `F5` (no developer products, nothing repeatable), `F9` (one axis, one factor, no grants) | Store Page |
| 25 | **A countdown, "limited", a discount, a stock count or any urgency claim in outward copy** | **forbidden** | `F10`–`F12` bind *inside the game* and `monetization/02` says plainly they *"do not reach the experience-page listing"*. Outward, this is closed by the truthfulness rule below plus the platform's own guidance against *"a false sense of urgency"* and *"artificial scarcity"* `[research: https://create.roblox.com/docs/production/monetization]`. **`[cid: decided]` at this category, flagged** | Store Page, Hype |
| 26 | **Server size, device settings and avatar type as displayed on the page** | **not ours** | `release.publishChecklist` (`tech/deploy/01`) owns every publish-time platform setting and its read-back. Listed so no lead here treats it as free space | — |

---

## What the brief binds for this whole category

| constraint | tag | consequence for Discovery & Marketing |
|---|---|---|
| *"**This game exists to prove the `arga` pipeline works end to end.** … Success is **shipped artifacts, not players**."* `00-CORE.md` | `[you chose: R1 Q3]` → **`[brief: binding]`** | The success measure of this category is a checkable spec, not an acquisition number. No domain may propose a KPI, a target CCU, an impression goal or a conversion rate. Analytics already ruled `E5`: *"No design change proposed on the strength of a revenue or a retention reading."* |
| *"**Beating the genre's retention curve.** Offered and declined."* · *"**Revenue.** Offered and declined."* `00-CORE.md` | same tag → **`[brief: binding]`** | Re-engagement pushes, lapsed-player campaigns and revenue framing are closed by name. This is the single line that most shapes Hype and Social. |
| *"content design is the primary creative work on this project, not art or **marketing**."* `00-CORE.md` | `[you chose: R1 Q1]` → **`[brief: binding]`** | Relayed exactly because it is uncomfortable and it is binding. Be cheap. A domain that invents a channel to look busy contradicts a binding line. |
| *"Target: the **smallest game that still gives every creative area real work.**"* `00-CORE.md` | `[you chose: R1 Q3]` → **`[brief: binding]`** | An artifact exists because the platform or the brief requires it, never because a lead needs something to make. |
| *"**8–14, mobile-heavy, short sessions.**"* · *"casual but **genre-literate**"* · *"motivated by **collection, relaxation, completion**"* `00-CORE.md` | `[you chose: R1 Q4]` → **`[brief: binding]`** | Binds the age setting, the reading level of any copy a lead writes, and the legibility floor of an icon at phone size. `theme/tone/01` established grade-5 reading for in-game copy and *"35% of age-checked daily users are under 13"* `[research: about.roblox.com newsroom 2026-02]`. |
| *"~70% mobile / ~25% desktop / ~5% console"* `00-CORE.md` | `[I assumed — the split]` → `[brief: soft]` | The **band** is binding; the ratio is not, and `cid/_state.md` records it as **uncorroborated by anything fetched**. Do not build a channel strategy on it. |
| **"Clear the overgrowth, find what's buried."** `05-OUTWARD.md` | `[you accepted: R6 Q1]` → **`[brief: soft]`** | The hook line, with its reasoning stated: *"The buried half is the differentiator no competitor can claim"* and *"It gives a thumbnail two composable halves."* **Soft, and one approved sheet has already narrowed it** — see the next row. |
| *"**Positioning note that matters more than the line:** this is being marketed as a **restoration game, not an incremental** … That deliberately moves it out of the category where every competitor sits — at the cost of the incremental audience's built-in search behaviour."* `05-OUTWARD.md` | `[you chose: R4 Q2]` → **`[brief: binding]`** on the positioning | Binds genre selection, tag set and every line of copy. **The cost is stated in the brief and is not a discovery for a lead to make** — it is a decision already taken, with its price paid up front. |
| *"**The noun is not the differentiator.** Grass, lumber, ore, scrap, leaves, snow (×3), slime, souls, sand and pressure-washing are all occupied, several with identical marketing copy. Distinction lives in the **collection layer**."* `HANDOFF.md` six-things #1, elevating `00-CORE.md` `[you chose: R1 Q1]` | **`[brief: binding]`** | This category is where that research pays off or is wasted. *"This is a commodity genre with a **standardised store description**"* — three games by at least two studios ship near-identical copy `[research: research/landscape.md]`. A store page in that voice throws away the one thing the brief spent a whole research pass buying. |
| *"Across everything searched, **no game in this family surfaced a hidden-object collection layer**"*, and *"'taken' here means 'exists', not 'successful'"* `research/landscape.md` | `[research]` | The uncontested claim is available and is bounded: the survey did **not** gather CCU or visit figures for any competitor, and states so. Do not cite it as a market-size claim. |
| *"**Permanent multipliers only. Never content access.** … **Forbidden:** any paid area, relic, or set. **A paid-only object would turn 100% completion into a purchase.**"* `03-META.md` | `[you accepted: R5 Q4]` → `[brief: soft]`, treated as effectively hard by `products` and `offerSurface` | The listing may say what `Span` does and may not imply a paid path to any Find, set, area or completion. `F17`: *"24/24 is reachable owning zero products."* That is a **claim you may make**, and it is unusual in this genre. |
| *"**Cleared is permanent — overgrowth never returns.**"* `01-FOUNDATION.md` | `[you chose: R2 Q1]` → **`[brief: binding]`** | Sayable and true forever. `theme/fantasy/02` gives it in the form this category should use: *"**finished work is never asked for twice**"*, and it is *"What is true and sayable at every hour."* |
| *"**No rebirth. No offline accumulation.** Both deliberately cut."* `CONCEPT.md` / `01-FOUNDATION.md` | `[you chose: R2 Q2]` → **`[brief: binding]`** | `rebirth` is in `vocabulary.bannedWords`. Copy may not promise, imply or hedge either. `CONCEPT.md` is explicit about why it must be said plainly: *"genre-literate players will otherwise arrive expecting rebirth and idle and not find them."* Whether the *absence* is stated outward is a Store Page decision, not mine. |
| *"**Tension is zero by design**, confirmed deliberately."* `HANDOFF.md` six-things #4 | **`[brief: binding]`** on the instruction | No outward claim of challenge, difficulty, risk, competition, urgency or beating anyone. |
| *"**Dry and sparse.** Humor lives only in relic flavour text. No system copy, UI, error message, tutorial text, or **store copy** is funny."* — developer, session 2026-07-30, recorded at `theme/tone/02` | **`[brief: binding]`** | **The one register rule that provably reaches this category**, because the binding decision names *store copy* by name. `theme/tone/02` extends it `[cid: decided]` to *"loading screens, tips, changelogs, patch notes, group posts, thumbnails."* |
| *"**Ships and settles. No seasons or events.**"* `OPEN.md §2` | `[I assumed — batched]` → `[brief: soft]` | Overridable **with a reason**, and it is the default that most shapes Hype and Social. It is also constrained from above: `05-OUTWARD.md` notes *"priority 3 already excludes seasons and events, so the default is constrained by a decision already made."* Overruling the soft default does not reopen the hard gate. |
| *"**An unfinished area and a half-empty index.**"* — the return hook `03-META.md` | `[you accepted: R3 Q3]` → `[brief: soft]` | The brief also concedes its own weakness: *"without banked offline earnings, the pull to return is **materially weaker** than the reference's."* No outward copy may claim a return pull the design gave up. |

### Approved keys, rulings and shipped files that bind you before you start

| source | what it forces on this category |
|---|---|
| `theme/fantasy/02` — **the single most important upstream sheet for this category** | It **overrules the lifetime of the hook line while leaving the line itself intact**: *"The line itself is untouched and stays the store hook. What I overrule is its lifetime: its second half has a supply of exactly 24 … A promise with a countable supply is a **first-session promise**, and treating it as the standing one guarantees the fantasy is lying by S4."* Its instruction to you, verbatim: *"'Clear the overgrowth, find what's buried' stays as the store hook and is **a first-session promise with a supply of 24**. It may not be restated on an in-game surface as a standing promise, **no line may promise endless new things to find**, and **no line may promise a world that ends up reclaimed**."* |
| `endgame` — `gameplay/meta/07` | `terminalCondition` reached at area 8; `gameEnds: false`; `collectionEnds: true`; `endScreen: false`; `extinctPayoffKinds: [upgradePurchase, findReveal, setCompletion]`; `postTerminalArea.buriesFinds: 0`, `unlimited: true`. **After the last Find there are more areas and nothing new to find, forever.** |
| `core-loop/04` and `meta/04` | 24/24 is dated *"minute 11 of session 1"* at the pre-R-2 values; R-2 then took `relicsPerArea` 6 → 3 and `areasPerDepth` 1 → 2, making it 8 laps at 93.0–93.5 s. **Neither figure is yours to restate from memory** — see gap M3. |
| Ruling **R-3**, `cid/_state.md` | *"The game is not expanded past eight areas. The under-scoping finding is recorded and declined."* Content volume is small **by ruling**, not by omission. A store page cannot fix it and must not paper over it. |
| Ruling **R-4** + `products` + `offerSurface` | `storeExists: false`; `purchaseSurface: "the Roblox experience page"`; `promptGamePassPurchaseCalls: 0`; **one** product, `Span`, `gamePassId: null`, `priceRobux` 499, axis `radius`, factor 1.75. `monetization/01` hands you the cost: **the listing is the only place `Span` is discoverable**, so its copy is *"load-bearing rather than decorative."* |
| `vocabulary` — `theme/vocabulary/02` | `bannedWords`: `relic relics tier artifact antique rebirth loot treasure`, each with a reason, four of them citing a **shipping competitor URL**. `casing: "title"`, `maxLabelChars: 14`, `maxSentenceWords: 12`, `allowedPattern` `^[A-Za-z0-9 ,.'%%/-]+$`. **How much of this reaches an outward string is ruled below.** |
| `theme/tone/01` P1–P9 | *"**Store listing** (Discovery & Marketing): **not bound by this sheet.** The listing competes in a market where every neighbour shouts."* And its flagged item: P7 forbids the *game* calling itself *relaxing* — the word all three competitors lead with — while *"the listing is free to use it."* **Relayed exactly; do not treat the in-game register as yours.** |
| `theme/vocabulary/01` | *"**External-name work**: the title, the tagline and the store description are **outside this table**. No ceiling, no word count, no casing rule and no plural rule on this sheet reaches them. **Uppercase in a store listing is a listing decision.**"* |
| `uiTheme` — `art/ui-art/01` | `archetype: "fantasy-ornate"`, `genre: "restoration"`, and **`sourceTitle: "Ruin Restoration"` set as a starting value and flagged to the developer**, with three live alternatives. Its own words: it *"needs the game's name and the game has none."* |
| `styleGuide` — `art/style/01` | Cleared stone `[216, 201, 169]`, Rec.601 luma **201.84**; seven named colour roles; four `Enum.Material` values; `C5` bans gilding by construction (*fantasy-ornate*'s own gold token `#D4A34A` fails it). **This is what a legitimate capture would look like, and none of it is built yet.** |
| `art/ui-art/04` | `icons.count: 0`, `imagePolicy.uiImageAssets: 0`, `forbiddenNodeClasses: ["ImageLabel","ImageButton"]`. **Interface only** — see the ruling below. |
| `art/_category.md` row 34 | *"**Store icon, thumbnail and key art** — Discovery & Marketing, wave 7. `theme/setting/03` binds them anyway: every promotional image is at the one hour. `theme/identity/04` row 9: no mascot."* |
| `release` — `tech/deploy/01` | Owns the publish checklist, version identity, environments and **provisioning**: the experience must be published **before** a game pass can be created, so the order is publish → create pass → paste id → re-emit → republish `[research: create.roblox.com/docs/production/monetization/game-passes]`. **Your listing copy for `Span` describes a product that does not exist yet.** |
| `cid/_playtest.md` | One session, n = 1, developer. *"Big purple boxes that cover the screen."* **Nothing past area 1 has ever been observed** — the depth ladder, set bonuses, duplicate draws and the endgame bay are all still predictions. |

---

## The truthfulness rule, and how a critic checks it

**This is the rule this category inherits above all others, and it is the one no other category can
enforce for you.** It is not a new decision; it is the union of approved keys, expressed as a check.

> **T0 — Every outward claim carries a `backedBy` naming a merged or proposed contract key path, an
> approved sheet id, or a shipped file. A claim with no `backedBy` fails.**

That is the form. Each of the six domains carries its claims as rows in its own manifest, and a
critic runs one pass over all six. The known-false claims, each with the source that falsifies it:

| id | a claim that is false about this game | falsified by |
|---|---|---|
| `T1` | any claim of endless, ongoing, new or more **things to find** | `endgame.postTerminalArea.buriesFinds: 0`; `theme/fantasy/02`: *"no line may promise endless new things to find"* |
| `T2` | any claim that the world ends up restored, reclaimed or finished | `theme/fantasy/02`: *"no line may promise a world that ends up reclaimed"*; `theme/setting/02`: the works *"cannot be exhausted because it is uncounted"* |
| `T3` | any content-volume claim above **24** Finds, **4** sets, **8** areas, **1** product | `collection`, `depths`, `products.itemCount: 1`, ruling R-3 |
| `T4` | any claim of rebirth, prestige, offline earnings, daily rewards, codes, leaderboards, trading, seasons or events | `03-META.md` priority 3; `endgame.forbidden`; `vocabulary.bannedWords` contains `rebirth` |
| `T5` | any claim of multiplayer interaction, trading, co-op, competition or a shared goal | `CONCEPT.md`: *"Shared server, parallel progression, own areas, **no interaction**"* `[you accepted: R6 Q2]` → `[brief: soft]`; `social` |
| `T6` | any image showing a Find as an object, a model, a card, a drop or an icon | `representation.find`: *"no Instance at any point in its life"*; `objectArt` `Z9`; `art/ui-art/04` `icons.count: 0` |
| `T7` | any image showing night, dusk, weather, a second hour, a shop screen, a purchase control, a mascot or a face other than a player avatar | `theme/setting/03` `R1`/`R2`; R-4; `theme/identity/04` |
| `T8` | any image whose look is not `styleGuide` + `uiTheme` as approved — including any capture of the build as it ships today | G2; `art/style/01`; `art/ui-art/01` |
| `T9` | any claim of a reason to return that the design gave up: banked progress, accrual, upkeep, something waiting | `01-FOUNDATION.md` *"No offline accumulation"*; `03-META.md`'s own *"Honest weakness"* paragraph |
| `T10` | any urgency, scarcity, discount or limited-time claim | platform guidance against *"a false sense of urgency"* / *"artificial scarcity"*; `F11` is its in-game twin. **`[cid: decided]` outward** |

**How a critic runs it, in one pass:** collect every `claims[]` row across `title`, `storeIcon`,
`storeThumbnails`, `storeListing`, `channels` and `launchBeats`; assert every row has a non-empty
`backedBy` that resolves to a real key path or a real file; assert no row's text matches the `T1`–`T10`
predicates; assert every image row names a `captureSource` and that no `captureSource` is the current
`game/src/shared/Theme.luau`. **A row that cannot be checked this way is prose and fails.**

This is also the category `checks` in `docs/cid-workflow.json`, verbatim, so it is what verification
will run anyway:

> *"the name and tagline carry the promise the brief states, not a new one · every thumbnail sells a
> feature that exists in an approved spec · store tags and genre match what the brief says this is
> being marketed as · age and content settings match the brief's audience band · **no marketing claim
> describes out-of-scope or unbuilt content**"*

---

## Two rulings, made here so two domains do not read one rule two ways

### Ruling M-A · **UI Art's zero is about the interface. It does not reach the icon or a thumbnail.**

`art/ui-art/04` rules *"This game has **zero icons and zero image assets of any kind in its
interface**"*, and its checks are scoped to exactly that: `grep -rn "rbxassetid" game/src`,
`ImageLabel`/`ImageButton` under `game/src/shared/Screens/`, and `ui-forge/briefs/hud.brief.json`.
Every one is a check on the *build*. **A store icon and a thumbnail are not in `game/src` and are not
`GuiObject`s.** `art/_category.md` row 34 already routes them here and `art/objects/02` `Z9` scopes
its zero to *"icon renders of any object"* — meaning a rendered Find, which is `T6` above and stays
forbidden.

**So: the build contains zero image assets; the experience page does not.** Both leads state this in
one line so a verifier reading `icons.count: 0` beside a thumbnail spec sees a boundary and not a
contradiction. `[cid: decided]` at this category — cheap to reverse, and the reversal would mean this
game ships with no icon of its own, which is an Icon-lead finding to make, not mine.

### Ruling M-B · **The ban list binds outward strings. The character ceiling and casing table do not.**

Three approved sheets exempt the listing from the *mechanical* half, verbatim and quoted above:
`theme/tone/01` (*"not bound by this sheet"*), `theme/vocabulary/01` (*"outside this table … uppercase
in a store listing is a listing decision"*), and `monetization/02` (`F10`–`F12` *"do not reach the
experience-page listing"*). **I am not overruling any of them.** `maxLabelChars` 14 derives from a
grid cell at phone size and a store title has no grid cell; `casing: "title"` is a *stored-value* rule
for a string a Luau module renders.

What **does** bind outward is `vocabulary.bannedWords`, and the reason is in the ban list's own
citations: `relic`, `tier`, `artifact` and `antique` are banned **because occupancy research found
them owned by shipping games** — `Scrap Incremental`, `Faith Incremental`, `Artifacts`, `reStore`,
each with a fetched URL. *"Using the word … reads as a clone **in the store listing**."* Exempting the
listing from a list derived from listings inverts its reason. `rebirth`, `loot` and `treasure` are
banned for design reasons that hold outward identically.

**So: `bannedWords` binds every outward string in this category. `maxLabelChars`, `casing`,
`maxSentenceWords`, `allowedPattern` and P1–P9 do not.** `[cid: decided]`, flagged below. A lead that
wants a mechanical ceiling on an outward string derives it from **the surface it renders on** — a
platform field limit it has verified — not from this table.

---

## Scope gate

`03-META.md` **priority 3 — explicitly not in this project:**

> real procedural generation · rebirth · offline accrual · codes · daily rewards ·
> leaderboards · trading · seasons and events

`[I assumed — the ordering; scope was resolved through R4 Q1 and R5 Q1]` → `[brief: soft]` **on its
provenance, and hard as a gate.** Three members are individually harder than the ordering: `rebirth`
`[you chose: R2 Q2]`, real procgen `[you chose: R5 Q1]`, offline accrual follows from
`[you chose: R2 Q1]`.

**No domain may name, imply, or build fiction around any of it.** Concretely, and this is the list
that matters because these are the things a marketing agent reaches for by reflex: **no** *"new
update"*, *"season 1"*, *"event this weekend"*, *"codes in the description"*, *"join the group for a
reward"*, *"top 10 on the leaderboard"*, *"trade with friends"*, *"rebirth for more"*, *"come back
tomorrow"*, *"claim your daily"*; **no** launch beat, teaser or countdown whose subject is a seasonal
drop; **no** icon or thumbnail variant reserved for a holiday; and **no** description section, tag or
title tag held open for any of them.

**Priority 2** (*richer authored chunk variety · a duplicate-handling refinement · visitable restored
ruins*) is likewise not yours to promise. *Visitable restored ruins* is the one the brief itself calls
*"the strongest future option, since restoration is inherently something you would want to show
off"* — and `theme/fantasy/02` declined it as priority 2 needing *"a visiting system and a social
surface nothing funds."* **A store page that promises showing off your ruin is selling priority 2.**

**Naming one of these in order to forbid it is compliant.** *"There is no seasonal icon variant"* in
an icon sheet is information; a slot held open for one is not.

---

## Contract position

**This category owns no key in `bridge/schema.mjs` today.** The schema holds 25; `cid/_contract.md`
lists their owners; none covers an outward surface. **Every domain here proposes one, including the
empty ones**, because *"a publish-time step with no data form is a step with no owner"* — the same
argument `tech/deploy` made, and the same one `CLAUDE.md` makes about `environment`.

**Names already claimed anywhere in `cid/**` — proposing any of these is an error:** `area` `tiers`
`upgrades` `vocabulary` `currency` `movement` `patch` `collection` `onboarding` `rarity` `economy`
**`discovery`** `modifiers` `input` `tool` `response` `traversal` **`social`** `setBonus` `depths`
`layout` `plots` `endgame` `products` `firstSession` · `budgets` `serverCost` `persistence`
`sessionLock` `storeMigration` `integrity` `replication` `ingressLimits` `prediction`
`ownershipAuthority` `release` · `composition` `screens` `navigation` `notices` `viewport`
`offerSurface` · `telemetry` `engagement` `lapClock` `retentionReadout` `funnels` `kpis`
`economyHealth` · `styleGuide` `formLanguage` `detailBudget` `environment` `builtEdge` `groundwork`
`chunkDressing` `backdrop` `lighting` `effects` `objectArt` `characterArt` `uiTheme` · `mix`
`stingers` `sfx` `uiSound` `music` `ambience` `pacing` `tierMix` `solvency` `axisBudget`.

**Note `discovery` and `social` are both taken** — by `gameplay/systems/05` (the per-Find ledger) and
`gameplay/social/01` (server population). The two most natural names for two of your domains are gone.
Expected names below avoid them; a lead may propose a different name **with a reason**, and must check
this list first.

---

## Domain assignments

### 01 · Name Lead → `cid/marketing/name/_lead.md`

**Key to propose:** **`title`** — the decision framework, the candidate set with each candidate's
occupancy check and its result, the recommendation, the reserved alternates, the title-tag convention
(or its explicit absence), and the character/legality bounds derived from the platform field rather
than from `vocabulary`.

**Latitude: you do not get to name the game, and you do get to decide everything about how it is
named.** This is the sharpest boundary in the category and it is `OPEN.md`'s, not mine:

> *"## 3. Needs you — **The working name is a placeholder.** `incremental-spinoff-v2` is a slug, not
> a name."* — `OPEN.md §3`

**That section heading is the reservation.** `OPEN.md` has a separate §4 for *"Deliberately left open
— decisions, not gaps"* and it routes *"Name, icon, thumbnail, store description"* to this category.
The name appears in **both**. Read together: the *work* is yours, the *ratification* is the
developer's. **Produce a framework plus candidates, not a fait accompli.**

**A value is already on disk and you must treat it as a starting value, not a decision.**
`art/ui-art/01` sets `uiTheme.sourceTitle: "Ruin Restoration"` and flags it in its own
`## Flagged to the developer`: *"`sourceTitle` needs the game's name and the game has none … Live
alternatives: **(a)** `"Ruin Restoration"`, the brief's own first line, which I have set as the
starting value; **(b)** the slug `"incremental-spinoff-v2"`, honest and ugly; **(c)** leave the field
until wave 7, which means the check in criterion 2 has nothing to compare. **I recommend (a)** and a
one-field revision when you name the game."* **You are (c) arriving.** Your key must state what
`uiTheme.sourceTitle` becomes and whether it is a one-field revision request or a ratification of the
starting value — `meta.sourceTitle` is never rendered, so `vocabulary` does not bind it, but it is
stamped into a generated file and into every screenshot review.

Binding on you specifically:

- **The occupancy research is your whole evidentiary base and it is already fetched.**
  `research/landscape.md` is a full survey with URLs, and `theme/vocabulary/02` adds four more
  competitor URLs. Your graph `must_verify` — *"Search the title before committing. Confirm it is not
  taken, and that it is reachable by the search behaviour the brief's audience actually uses"* — is
  the one research obligation in this category that cannot be satisfied from the pack, because a
  candidate that did not exist when the survey ran may exist now. **The previous run's failure is the
  exact shape of the failure available to you:** v1 *"chose snow. Research in v2 found snow was
  already taken three times, including a game with v1's exact three upgrade axes and tool ladder."*
- Ruling **M-B**: `vocabulary.bannedWords` binds a title. `relic`, `tier`, `artifact`, `antique`,
  `rebirth`, `loot`, `treasure` are out, each with a competitor URL or a design reason.
  `maxLabelChars` 14 does **not** bind it — `theme/vocabulary/01` says so by name. **If you want a
  ceiling, derive it from the platform's own field limit and cite where you read it.**
- *"a **restoration / completion game**, not an incremental"* `[brief: binding]`. The brief already
  paid the price: *"at the cost of the incremental audience's built-in search behaviour."* **A title
  containing `Incremental` reopens a binding decision.**
- `theme/tone/02`'s humor ban reaches store copy `[brief: binding]`. `theme/tone/01` P4 forbids
  glyphs in-game and **does not reach the title** (M-B) — but the glyph is the genre's own tic
  (`[🌱]`, `🧲`, `🍂`, `[UPDT🍂]`), which makes using one an occupancy decision rather than a
  typography one. **Rule on it; do not inherit it by accident.**
- Your `does_not_own`: in-game naming language (`theme/vocabulary`, which holds the `vocabulary` key).

**Genuinely open to you:** the candidate generation frame and how many candidates; what evidence
clears a candidate (exact-match search, near-match, the noun-plus-genre pattern); whether a tagline
exists as a separate artifact at all, given Roblox has a name field and a description field and you
should verify what else; whether title tags are ever used given *"ships and settles"*; how many
alternates are held in reserve and what would trigger one; and the recommendation itself, stated as a
recommendation.

---

### 02 · Icon Lead → `cid/marketing/icon/_lead.md`

**Key to propose:** **`storeIcon`** — the concept, the focal subject, the framing and crop, the
palette roles it draws from `styleGuide`, its legibility rule at the smallest size the platform
renders it, the count (which may be 1), the variant set (which is very likely empty), and the
`captureSource` that makes it producible.

**Latitude: real on composition, zero on subject matter, and one platform fact you must fetch.**

Binding on you specifically:

- **Ruling M-A**: `art/ui-art/04`'s `icons.count: 0` is the **interface**. Say so in one line.
- `theme/identity/04`, addressed to this domain by name: *"**Store-art work**: the icon and thumbnail
  have **no mascot and no face other than a player avatar.** Composition is the brief's two halves."*
- `theme/setting/03` `R1`: one lighting state *"on any screen, **in any promotional image**"*;
  `art/lighting/01`: *"every promotional image is at `ClockTime` 15.5."* `R2`: no weather, ever.
- `T6`: **a Find has no form.** `representation.find` — *"no Instance at any point in its life"*;
  `objectArt` `Z9` — *"icon renders of any object: 0"*. **An icon showing a treasure object is a false
  claim about a game where no such object exists.** This is the sharpest constraint on this domain
  and it collides head-on with `05-OUTWARD.md`'s *"a relic mid-reveal"*. **Rule on it; that is gap M1.**
- `styleGuide` is your palette and it is narrow: seven named roles, stone at luma 201.84, `C5` bans
  gilding by construction. `theme/setting/01`: ornament is *"carving, casting, dressed joints and
  pattern in the paving — not iconography, not gilding."*
- The accessibility constraint reaches you: *"rarity tiers must differ by **shape or silhouette, not
  only hue**"* `[you accepted: R6 Q4]` → `[brief: soft]`, **treated as effectively binding** — a
  shipped build depends on that reading. An icon that distinguishes anything by green hue alone at
  32 px fails the same audience the constraint exists for.
- `00-CORE.md` *"smallest game that still gives every creative area real work"* `[brief: binding]`:
  **an A/B set is a variant count, and your graph `owns` list names one. Justify any count above 1
  against a project that declines to measure acquisition, or rule it at 1 and say why.**
- Priority 3: *"seasonal and event variants"* is in your graph `owns` list and is **forbidden** by the
  scope gate. Name it in order to forbid it.

**Research you owe, and your graph node assigns none, so this is mine:** *does this platform require
an icon, what are its dimensions and format, and what does a missing one produce?* You may not decide
`count: 1` or `count: 0` from memory. Fetch it, cite it, and if it cannot be settled, mark it
`[unverified]` and say what would settle it.

**Genuinely open to you:** the focal subject inside `T6`'s bound; the framing and crop; which
`styleGuide` roles carry it; the legibility rule and the instrument that checks it; the count; and
whether the icon is a render, a composition of world geometry, or something the project cannot
produce at all — which is a legitimate finding.

---

### 03 · Thumbnails Lead → `cid/marketing/thumbnails/_lead.md`

**Key to propose:** **`storeThumbnails`** — the ordered slot list, the single claim each slot makes
with its `backedBy`, the text-overlay rule, the `captureSource` per slot, the refresh cadence (which
may be *never*), and the A/B set (which may be empty).

**Latitude: wide on composition, and you hold the hardest unresolved question in the category.**

**The question, stated first because everything else depends on it: which build is a capture
legitimate from?** The facts, none of them yours to discover:

- `game/src/shared/Theme.luau` ships `archetype = "cartoon-vibrant"`, `sourceTitle = "Pet Ascend
  Simulator"`, `surface.base = "#2B1B4D"`, `type.*.font = FredokaOne`, against a brief naming
  `fantasy-ornate` in three places (`04-PRESENTATION.md:8`, `CONCEPT.md:47`, `HANDOFF.md:105`) and
  arguing against `cartoon-vibrant` **by name**: *"An ancient ruin in candy colours loses the
  discovery mood."* Cause: `ui-forge/src/cli.mjs:121` defaults to `examples/game-context.json`, a
  different game's demo context. That is **G2** in `art/_category.md`.
- The world the brief specifies **does not exist in the build**: `art/_category.md` rows 10–19 mark
  the retaining wall, parapet, openings, paving, channels, fittings, litter, weathering, sky and
  canopy all **[does not exist]**. `environment`, `builtEdge`, `groundwork`, `chunkDressing` and
  `backdrop` were written in wave 6 and nothing has been built from them.
- The one playtest saw *"big purple boxes that cover the screen"*, and **nothing past area 1 has ever
  been observed by anyone.**

**So a screenshot taken today shows a game the brief did not ask for, and a screenshot of the game the
brief did ask for cannot be taken yet.** State the `captureSource` per slot as a precondition with a
named gate — *"capturable once `uiTheme` and `styleGuide` are emitted and `A1` is closed"* — rather
than shipping a slot whose only possible source is the wrong build. That is data; a note is not.

Also binding on you specifically:

- `05-OUTWARD.md`, the one composition the brief actually states: *"It gives a thumbnail **two
  composable halves** — a cleared path through green, and a relic mid-reveal."* `[you accepted:
  R6 Q1]` → `[brief: soft]`. **The second half is in direct tension with `T6`** — there is no relic
  to show mid-reveal, and `response.findReveal` is a 2.5-second `atPatch` beat whose visual form is
  `effects`' and does not exist yet. **Gap M1. Rule on it against `representation.find`, with the
  Icon lead, and say which line is stale.**
- `theme/tone/02` extends the humor ban to **thumbnails** by name, `[cid: decided]`.
- Text overlay is in your `owns` list. `vocabulary.bannedWords` binds it (M-B); the character ceiling
  does not; the reading band does — audience 8–14 `[brief: binding]`.
- `T7` and `T8` in full: no night, no weather, no shop screen, no purchase control, no mascot, no
  face but a player avatar, no capture of the current theme.
- `theme/identity/03`: a stranger must read as *"a person and not a prop"*; nameplates are the
  platform default and *"are not to be dressed"*. A thumbnail showing other players shows twelve
  unmodified avatars with default nameplates and **no interaction**, because `social` has none.
- Your graph `must_verify`: *"Look at the current top of the genre on Roblox and record what their
  thumbnails do. Thumbnail convention moves fast and is the highest-leverage discovery surface."*
  **This is the one `must_verify` in the category that most needs doing and most risks producing a
  recommendation to imitate.** `research/landscape.md` already establishes the genre ships
  *"near-identical copy"*; recording what they do is evidence, not a licence to match it, and the
  brief's positioning decision `[brief: binding]` moves this game out of that category deliberately.
- Refresh cadence: *"ships and settles"* `[brief: soft]` and `00-CORE.md`'s non-goals make a refresh
  cadence hard to justify. **Rule it, with a reason. It is very likely `never`.**

**Genuinely open to you:** the slot count and order; what each slot claims and how it is backed; the
overlay rule; the composition inside `T6`–`T8`; the capture gate and what a legitimate capture
requires; and whether the honest answer is *a specified set that cannot be produced until the build
matches the spec*, which is a real finding and is better than a set produced from the wrong build.

---

### 04 · Store Page Lead → `cid/marketing/store-page/_lead.md`

**Key to propose:** **`storeListing`** — the description's section structure with the claim ledger
(`claim` · `backedBy` · `check`), the tag set with the occupancy evidence for each, the genre
selection, the age and content settings, the pass-listing copy for `Span`, and the update-notes
format (or its explicit absence).

**Latitude: the widest in the category, and the highest risk. This is the artifact that can commit a
bar-(a) defect.**

Binding on you specifically:

- **The commodity-copy finding, which is the reason your domain matters at all.**
  `research/landscape.md`: *"**This is a commodity genre with a standardised store description.**
  Three games by at least two different studios ship near-identical copy: 'A relaxing {noun}
  simulator game where the more you rebirth and upgrade, the more fun the game becomes, with the
  ability to unlock new islands and upgrades.'"* — with four fetched URLs. **Two clauses of that
  sentence are false about this game** (`rebirth`, and *"unlock new islands"* against
  `depths.unlock: previousAreaComplete`). Writing in that register is both a clone signal and a lie.
- `theme/tone/01`'s flagged item is yours to take or leave: P7 forbids the *game* calling itself
  *relaxing*, which is the word all three competitors lead with, and *"the listing is free to use
  it."* The recommendation there was *(a)*: the word never appears in the experience, and the listing
  may. **Yours to decide; it is genuinely open and it is genuinely a differentiation question.**
- **The pass copy is load-bearing, not decorative.** `monetization/01`, to you by name: *"You inherit
  the honest cost of R-4: **a player who owns no pass has no way to learn from inside the game that a
  pass exists.** The experience page is the only surface on which `Span` is discoverable."* The facts:
  one product, `Span`, axis `radius`, factor **1.75**, `priceRobux` **499**, `gamePassId` **null**,
  `repeatable: false`, permanent. `F17`: *"24/24 is reachable owning zero products"* — **a true and
  unusual claim in this genre, and one you may make.**
- `release.provisioning`: the pass **cannot exist until the experience is published**
  `[research: create.roblox.com/docs/production/monetization/game-passes]`. Your copy describes a
  product that does not exist yet, and your key should state what the listing says while
  `gamePassId` is null.
- **Genre and tags are a discovery decision.** `[brief: binding]` on *"a restoration / completion
  game, not an incremental"*, and `uiTheme.genre` already ships `"restoration"`. Your graph
  `must_verify`: *"Fetch the store pages of two competitors and record their tag sets."*
- **Age and content settings** are checked by verification against *"8–14"* `[brief: binding]`, and
  `theme/tone/01` cites *"35% of age-checked daily users are under 13"*
  `[research: about.roblox.com/newsroom/2026/02/moving-beyond-self-reported-age]`. Two open items land
  near you and neither is yours to invent: `monetization/02` and `ui-ux/store` `S5` both record that
  **no spend guard exists for the under-13 share**, and both say *"if you want one, it belongs on the
  experience page"* and route it to **the developer**. **Name it; do not build it.**
- `T1`–`T10` in full, and `T3` in particular. **Every content-volume sentence is a claim.** 24 Finds,
  4 sets, 8 areas, 1 product. R-3 declined to grow any of them and said why.
- `03-META.md`'s own *"**Honest weakness:** without banked offline earnings, the pull to return is
  materially weaker than the reference's"* `[brief: soft]`. `T9`.
- Ruling **M-B**: `bannedWords` binds you; `maxLabelChars`, `casing`, `maxSentenceWords`,
  `allowedPattern` and P1–P9 do not. `theme/tone/02`'s humor ban does, `[brief: binding]`, by name.
- `ui-ux/store` `S1` hands you a related deletion record: `04-PRESENTATION.md`'s screen table still
  lists `shop`, and R-4 deleted it. **Nothing outward may show or imply an in-game shop.**
- Your `does_not_own`: thumbnails and the icon.

**Genuinely open to you:** the description's structure and every line in it; whether the absence of
rebirth and idle is stated outward or simply not claimed (`CONCEPT.md` argues for saying it plainly
in-project — whether that reaches a store page is yours); the tag set and its evidence; whether
*relaxing* is claimed; how `Span` is described; the update-notes format or its absence; and the claim
ledger's own shape, which the other five domains will reuse.

---

### 05 · Social Lead → `cid/marketing/social/_lead.md`

**Key to propose:** **`channels`** — and **the expected value is an explicit empty set with a stated
reason and a check per row. That is an output, not an absence.** Do not propose `social`; it is taken
by `gameplay/social/01`.

**Latitude: almost none, and you are being told that rather than left to discover it. Read this
before you plan sheets; it will save you a wave.**

Your entire graph `owns` list, against what funds it:

| your subject | what closes it |
|---|---|
| the Roblox group | nothing funds one. `F15` forbids a group-join prompt *inside* the game — *"zero strings match `/code\|group\|favou?rite\|follow\|rate us\|share/i`"* — which does not close a group's existence but removes every path to it |
| Discord | *"8–14"* `[brief: binding]`; a substantial share is under 13. An off-platform channel for that band is a moderation obligation nothing in this project funds |
| TikTok / YouTube / X presence | *"Success is shipped artifacts, not players"* `[brief: binding]`; *"Revenue. Offered and declined"* |
| posting cadence and content pillars | *"Ships and settles"* `[brief: soft]` — there is nothing to post about; `endgame` is unbounded and unchanging, and `release` has no update stream |
| creator and influencer outreach | *"Beating the genre's retention curve. Offered and declined"* `[brief: binding]` |

**What is nonetheless genuinely yours, and it is not nothing:**

1. **State the zeros as data a verifier can check**, one row per channel, each with the line that
   closes it and an observable. `art/characters/_lead` and `audio/music` are the house form.
2. **The experience-page social-link fields are a real surface with a real answer**, and the answer
   being *none* is a decision. Verify what fields exist before ruling on them.
3. **Name the reopening condition.** Every refusal in this project states one. What would have to be
   true — a developer-authored decision to pursue players — for a channel to exist?
4. **Say plainly that there is no presence**, so verification reads a conclusion and not a gap, and so
   the Hype lead does not plan a beat that assumes a channel to post it on.

**Do not** propose a group, a server, a cadence, a pillar set or an outreach list. Each contradicts a
binding non-goal, and the correct output is the refusal with its evidence.

---

### 06 · Hype Lead → `cid/marketing/hype/_lead.md`

**Key to propose:** **`launchBeats`** — and like Social, **the expected value is a near-empty
structure with stated reasons.** The one row that may survive is the publish moment itself, and it is
already owned elsewhere.

**Latitude: almost none, for four independent reasons, and one seam you must not cross.**

- *"**Beating the genre's retention curve.** Offered and declined."* and *"**Revenue.** Offered and
  declined."* `[brief: binding]` ×2 — this closes **re-engagement pushes to lapsed players**, which is
  a named item in your `owns` list, by the brief's own words.
- *"**Ships and settles. No seasons or events.**"* `OPEN.md §2` `[brief: soft]` — closes the drop
  structure your `owns` list is built around. **Soft: overridable with a reason.** But the reason
  cannot be *seasons*, because priority 3 closes those hard, and `05-OUTWARD.md` says so: *"priority 3
  already excludes seasons and events, so the default is constrained by a decision already made."*
- **Countdown mechanics** are closed twice: `theme/tone/04` `D9` bans the timer and the countdown from
  the zero-tension rule, and `F10` bans *"a timer, countdown, expiry, 'limited', 'new', 'ends in' or
  'today only'"* anywhere in the game. Outward, `T10` and platform guidance close the claim.
- **Cross-promotion** requires a second experience. There is one place file
  (`tech/deploy` gap 2: *"No environment split exists anywhere in the brief or the repo"*).

**The seam you must not cross:** your `does_not_own` is *"What is actually in the update (Live Ops —
Roadmap)"*, and **Live Ops runs in this same wave**. Your category's `does_not_own` is broader:
*"In-game content or schedule (Live Ops) — this category owns external presentation only."* **You
announce; they decide whether there is anything to announce.** If Live Ops rules there is no roadmap —
which *"ships and settles"* strongly implies — your key is the announcement of a single ship and
nothing after it. **State the dependency; do not resolve it, and do not assume it.**

**What is genuinely yours:**

1. **The publish moment as an outward artifact**, and its seam against `release`. `tech/deploy/01`
   owns the publish checklist, the version identity and the provisioning order; **you own whether
   anything is said outside the game when it runs, and what.** Cite `release` by key; restate none of
   its values.
2. **The trailer brief**, which is the one item in your `owns` list nothing forbids. It inherits
   `T6`–`T8` and the same `captureSource` problem the Thumbnails lead holds. **If you rule it out, the
   reason is the capture gate and `00-CORE.md`, not taste.**
3. **The zeros, as data**, with a reopening condition each.

---

## Domains judged thin for this game, and why that is stated rather than silent

**None is absent. All six run and all six produce a key.** Verification should read an empty-set key
with reasons and checks as a **deliberate conclusion**, not a gap, and should not send a second sheet
to fill it.

- **Social — expected to correctly conclude *nothing*, and thin by five separate binding or
  effectively-binding lines, not by neglect.** Every item in its `owns` list is closed by a stated
  non-goal, a scope-gate member, an audience fact the project has not resourced, or the absence of
  anything to post about. It runs because *"there is no group, no Discord, no channel, no cadence and
  no outreach, here is the line that closes each, here is the observable, and here is what would have
  to change"* is data a verifier can read and a later wave can reopen. **One sheet. Do not commission
  a second.**
- **Hype — expected to correctly conclude *almost nothing*.** Four independent closures, plus a
  dependency on a Live Ops roadmap that *"ships and settles"* strongly implies does not exist. What
  survives is real but small: the publish moment's outward half, the trailer brief's ruling, and the
  seam against `release`. **One sheet, possibly two if the trailer question earns its own.**
- **Icon — thin in scope, not in difficulty.** One artifact, no variants, no seasonal set, no mascot,
  no Find, one lighting state. The composition question inside those bounds is real and so is the
  legibility floor at phone size, and the platform fact it rests on has not been fetched by anyone.
- **Name — narrow by reservation, not by scope.** The developer ratifies; the framework, the
  occupancy evidence and the candidate set are genuinely this lead's, and the previous run's failure
  is a live warning about what happens when the occupancy check is skipped.
- **Thumbnails and Store Page are not thin.** Store Page is the only artifact in this project that
  makes a claim to a stranger, and Thumbnails holds the capture-legitimacy question that no other
  domain can answer.

**One subject is priority-3 by construction and is named here so nobody looks for it:** there is no
seasonal, event or time-of-day channel anywhere in this game — `theme/setting/03` states it as a
consequence, *"there is no hour, weather or season channel to run anything through"* — so there is
nothing for a seasonal icon, thumbnail, campaign or title tag to attach to. **Not deferred. Absent.**

**And one deliberate non-conclusion:** this category does **not** conclude that marketing is
unnecessary. `00-CORE.md` makes it not the centre of gravity; it does not make the store page
optional. A published experience has a name, an icon and a description whether or not anyone chose
them, and the failure mode of skipping this category is not *no marketing* — it is *the defaults*,
which is exactly how `sourceTitle` became `"Pet Ascend Simulator"`.

---

## Gaps in the brief this category hit

Passed upward, not filled. Each names the domain that will have to decide it.

| # | gap | who decides |
|---|---|---|
| **M1** | **The brief's own thumbnail composition names a thing that does not exist.** `05-OUTWARD.md` promises *"a relic mid-reveal"* as one of the two composable halves `[brief: soft]`; `representation.find` rules *"A Find has no Instance at any point in its life"*, `objectArt` `Z9` sets icon renders of any object to 0, and `art/ui-art/04` sets `icons.count: 0`. **There is nothing to photograph mid-reveal.** Wave 6 already found the same collision from the other side (its `G6`) and routed the world-form half to Objects, which answered *no form*. This is the outward half and nobody has answered it. | **Thumbnails** with **Icon**; a revision against `05-OUTWARD.md` if the composition is unbuildable |
| **M2** | **No capture is legitimate from any build that exists.** The shipped theme is `cartoon-vibrant` / *"Pet Ascend Simulator"* (`G2`), and every world subject the fiction requires is marked **[does not exist]** in `art/_category.md` rows 10–19. Nothing in either contract owns producing a promotional capture, and no gate exists that says *this build is representative*. | **Thumbnails** to state the gate; the emitter's owner is a cross-category question, already `G2` |
| **M3** | **The completion figure this category must not misrepresent has two values on disk and no current one.** `core-loop/04` dates 24/24 at *"minute 11 of session 1"* at `relicsPerArea` 6; ruling **R-2** then took it to 3 with `areasPerDepth` 2, and wave-3 verification put laps at 93.0–93.5 s across 8 areas. **No sheet states the post-R-2 completion time**, and a store page is exactly where a stale figure becomes a false claim. | **Balance & Tuning** owns `pacing`; **Store Page** must cite the current derived value and may not restate a stale one |
| **M4** | **The brief reserves the name and also routes it here, and never says which wins.** `OPEN.md §3` *"Needs you"* versus `OPEN.md §4` *"Deliberately left open — decisions, not gaps"*, which lists *"Name, icon, thumbnail, store description → Discovery & Marketing"*. I have read them as *work here, ratification there* and assigned accordingly. **If that reading is wrong, the Name lead's whole output changes shape.** | **the developer**, in one line |
| **M5** | **Three approved sheets exempt the store listing from every mechanical string rule, and none of them says what *does* bind it.** `theme/tone/01` (register: no), `theme/vocabulary/01` (lengths and casing: no), `monetization/02` (`F10`–`F12`: no). The ban list's scope sentence is *"every player-facing string in the build contract"*, and a listing is not in the build contract — yet every ban cites a store listing as its reason. **Ruling M-B closes this at this category, `[cid: decided]`, and it is a ruling a developer may reverse in one line.** | ruled here; **the developer** may overturn; **`theme/vocabulary`** owns the key if the scope sentence is widened |
| **M6** | **Nothing in the brief, in either contract, or in `docs/cid-workflow.json` says an outward artifact is a build artifact.** `release.publishChecklist` covers place settings; no key covers a name, an icon, a thumbnail or a description, and no emitter writes one. **A `title` key that merges and reaches nothing is `uiTheme`'s problem repeated** — `art/ui-art/01`: *"the key would merge and change nothing."* | **contract-and-seam work**; each of the six leads states its own emitter hole rather than assuming one |
| **M7** | **The one product is unpurchasable and the listing is its only surface.** `products.items[0].gamePassId` is `null`, `release.provisioning` requires publish-before-pass-creation, and `monetization/01` records that the experience page is the **only** place `Span` is discoverable. So the load-bearing copy describes a product that cannot be bought at the moment the copy ships. | **Store Page** to state what the listing says while the id is null; **the developer** owns the provisioning step |
| **M8** | **No spend guard exists for the under-13 share of an 8–14 audience, and two domains have now routed it here.** `monetization/02` declined to invent one and said *"it belongs on the experience page, not in this key"*; `ui-ux/store` `S5` routed it to *"store-listing and experience-page copy work (wave 7), and the developer."* **It has arrived, and it is still not a copy decision.** | **the developer**; **Store Page** names it and does not build it |
| **M9** | **The occupancy survey states its own limits and nobody has closed them.** `research/landscape.md`: *"'taken' here means 'exists', not 'successful'"*; no CCU or visit figures for any competitor; and *"whether the untouched themes are actually free or simply poorly indexed. Four searches surfaced nothing; that is weak evidence."* Every domain here that cites occupancy inherits that bound. | relayed to **Name**, **Store Page** and **Thumbnails**, each of which carries a `must_verify` that partly closes it |
| **M10** | **Live Ops runs in this wave and the announce/decide seam is unwritten.** This category's `does_not_own` is *"In-game content or schedule (Live Ops)"* and Hype's is *"What is actually in the update (Live Ops — Roadmap)"*, but no artifact states what Hype does if Live Ops rules there is no roadmap. | **Hype** states the dependency; the **cross-category pass** closes it |
