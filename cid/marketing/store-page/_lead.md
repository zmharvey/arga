# Store Page — domain index

**Category:** Discovery & Marketing · **Wave:** 7 · Reads: `HANDOFF.md`, `CONCEPT.md`,
`00-CORE.md`, `01-FOUNDATION.md`, `03-META.md`, `05-OUTWARD.md`, `OPEN.md` (§1–§6),
`research/landscape.md` · `cid/marketing/_category.md` · `cid/_contract.md`, `cid/_state.md` ·
`cid/theme/vocabulary/01`, `/02` · `cid/theme/tone/01`, `/02` · `cid/theme/fantasy/02` ·
`cid/gameplay/meta/02`, `/04`, `/07` · `cid/gameplay/core-loop/04` ·
`cid/gameplay/monetization/01` · `cid/ui-ux/store/_lead.md` · `cid/tech/deploy/_lead.md` ·
`cid/art/ui-art/01`, `/04` · `bridge/schema.mjs`

---

## Contract position

**I own no existing contract key.** `bridge/schema.mjs` holds 25 top-level keys (grepped and
counted: 25 of 25 match the owner table in `cid/_contract.md`); none covers an outward surface,
and `storeListing` appears nowhere in the schema or in any `manifest` block under `cid/`.
*(I could not run `npm run bridge -- --contract` — this agent has no shell. I read its two
inputs instead: `bridge/schema.mjs`'s top-level key list and the derived `cid/_contract.md`.)*

**I propose one key, `storeListing`**, holding: the description's section structure and every
line of copy; the `claims[]` ledger with `backedBy` and a runnable `check` per row; the genre
and subgenre selection with its evidence; where discovery keywords live given the platform
has no tag field; the content-maturity questionnaire answers and the resulting label; the
`Span` pass-listing copy; and the update-notes format or its explicit absence.

It exists because **an outward claim with no data form is a claim no critic can run T0 against**,
and because the failure mode of skipping this domain is not *no store page* — it is the
defaults, which is how `uiTheme.sourceTitle` became `"Pet Ascend Simulator"`.

**Sheet 01 carries the whole manifest; 02–05 write named blocks into it and carry none of
their own.** `bridge/merge.mjs:132–141` rejects a second sheet proposing one key. This is the
house form `products`/`02`/`03` and `offerSurface`/`02` already use.

---

## What the brief gave me

- *"**This game exists to prove the `arga` pipeline works end to end.** … Success is **shipped
  artifacts, not players**."* — `00-CORE.md` `[you chose: R1 Q3]` → **`[brief: binding]`**. No
  KPI, no conversion target, no acquisition claim.
- *"content design is the primary creative work on this project, not art or **marketing**."* —
  `00-CORE.md` `[you chose: R1 Q1]` → **`[brief: binding]`**. Be cheap.
- *"**8–14, mobile-heavy, short sessions.**"* · *"casual but **genre-literate**"* ·
  *"motivated by **collection, relaxation, completion**"* — `00-CORE.md` `[you chose: R1 Q4]`
  → **`[brief: binding]`**. Binds the maturity setting and the reading band of every line.
- *"a **restoration / completion game**, not an incremental … at the cost of the incremental
  audience's built-in search behaviour."* — `05-OUTWARD.md` / `CONCEPT.md`
  `[you chose: R4 Q2]` → **`[brief: binding]`**. The price is already paid and is not a
  discovery for a sheet to re-make.
- *"**Clear the overgrowth, find what's buried.**"* — `05-OUTWARD.md` `[you accepted: R6 Q1]`
  → **`[brief: soft]`**, and narrowed by `theme/fantasy/02`: *"stays as the store hook and is
  **a first-session promise with a supply of 24**."*
- *"**Cleared is permanent — overgrowth never returns.**"* — `01-FOUNDATION.md`
  `[you chose: R2 Q1]` → **`[brief: binding]`**. Sayable and true forever;
  `theme/fantasy/02` gives the outward form: *"finished work is never asked for twice."*
- *"**No rebirth. No offline accumulation.** Both deliberately cut."* — `01-FOUNDATION.md`
  `[you chose: R2 Q2]` → **`[brief: binding]`**. `rebirth` is in `vocabulary.bannedWords`.
- *"**Permanent multipliers only. Never content access.** … **Forbidden:** any paid area,
  relic, or set."* — `03-META.md` `[you accepted: R5 Q4]` → `[brief: soft]`, effectively hard
  via `products`. `F17`: *"24/24 is reachable owning zero products"* — **true, unusual in this
  genre, and sayable.**
- *"**Honest weakness:** without banked offline earnings, the pull to return is materially
  weaker than the reference's."* — `03-META.md` → `[brief: soft]`. `T9`.
- *"**Dry and sparse.** … No system copy, UI, error message, tutorial text, or **store copy**
  is funny."* — developer, session 2026-07-30, recorded at `theme/tone/02` →
  **`[brief: binding]`**. The one register rule that names my subject.
- *"**Ships and settles. No seasons or events.**"* — `OPEN.md §2` `[I assumed — batched]` →
  `[brief: soft]`, constrained from above by priority 3.
- *"This is a commodity genre with a **standardised store description**"* — four fetched
  competitor URLs, `research/landscape.md` → `[research]`. Two clauses of that shared sentence
  are **false** about this game (`rebirth`; *"unlock new islands"* against
  `depths.unlock: previousAreaComplete`).
- **Approved keys binding on me, cited not restated:** `products` (`storeExists: false`,
  `purchaseSurface` = the experience page, one item `span`, `gamePassId: null`, `F5` `F9`–`F13`
  `F17` `F19`); `collection` (24 Finds, 4 sets of 6, `relicsPerArea: 3`, `areasPerDepth: 2`);
  `depths` (8 areas); `endgame` (`postTerminalArea.buriesFinds: 0`, `unlimited: true`,
  `gameEnds: false`, 13 `forbidden` names); `vocabulary.bannedWords`; `release.provisioning`.
- **Ruling M-B** (`cid/marketing/_category.md`): `bannedWords` binds every outward string;
  `maxLabelChars`, `casing`, `maxSentenceWords`, `allowedPattern` and P1–P9 do not.
  `theme/vocabulary/01` states it directly: *"the title, the tagline and the store description
  are **outside this table** … Uppercase in a store listing is a listing decision."*
- **`theme/tone/01`'s flagged item, relayed intact:** P7 forbids the *game* calling itself
  *relaxing*; *"the listing is free to use it."*

---

## What the brief did not give me

Named, routed, not filled. Every one is `[cid: decided]` at the sheet that takes it.

| # | gap | routed to |
|---|---|---|
| **P1** | **The brief names a genre the platform does not have.** *"marketed as a restoration game"* is `[brief: binding]`, and Roblox's genre list holds **17 genres and 40 subgenres, none of them `restoration`** `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/production/publishing/experience-genres.md]`. `uiTheme.genre: "restoration"` is a ui-forge archetype-resolution string, not a platform value, and `art/ui-art/01` says so. Nothing on disk states which platform genre this game is filed under. | **02** |
| **P2** | **There is no tag field to fill.** My `owns` names a *"keyword and tag set"* and my `must_verify` says to record competitors' tag sets. The platform's current selectable surface is **one genre plus one optional subgenre**; tags were *"exploring"* as of the 2024 rollout and I could not confirm one shipped `[research: https://devforum.roblox.com/t/now-live-update-your-genre-and-subgenre/3265896]`. So the keyword decision has no field of its own and must land in the description's first sentence, which is where the platform says discovery reads it. | **02** |
| **P3** | **The brief has no age or content-maturity position at all.** `OPEN.md §1` carries no audit row for it, and an unfilled questionnaire means *"Roblox restricts the playability of the experience on the platform for all players"* `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/production/promotion/content-maturity.md]`. An 8–14 audience straddles two account bands, so the label is a compliance decision with a hard consequence, not a preference. | **03** |
| **P4** | **The completion figure has two current values, not none, and the stale one is the famous one.** `core-loop/04`'s *"minute 11 of session 1"* is **pre-R-2 and dead**. Post-R-2 there are two live figures: `meta/04`'s eight-lap table sums to **1,265 s ≈ 21.1 min** at zero products owned, and `monetization/01`'s eight-lap table at `Span` ×1.75 sums to **723 s ≈ 12.1 min**. A duration in outward copy is therefore a claim whose truth depends on a purchase. | **01**, which must decide whether the listing states a duration at all |
| **P5** | **Whether the absence of rebirth and idle is stated outward.** `CONCEPT.md` argues it must be *"said plainly"* because *"genre-literate players will otherwise arrive expecting rebirth and idle and not find them"* — but that argument is about the project's own sheets. Whether it reaches a store listing is nowhere. | **01** |
| **P6** | **No spend guard for the under-13 share, arrived here from two domains.** `monetization/02` and `ui-ux/store` `S5` both declined it and routed it to *"the experience page"* and the developer. **It is still not a copy decision** — the platform's guard is an account-level parental monthly limit of 0–10,000 Robux `[research: https://en.help.roblox.com/hc/en-us/articles/4409125091348-Monthly-Spending-Limits]`, with no developer-facing per-experience control. Name it, do not build it. | **03** |
| **P7** | **The listing's load-bearing copy describes a product that cannot be bought when it ships.** `products.items[0].gamePassId` is `null`; a pass cannot be created until the experience is published `[research: https://create.roblox.com/docs/production/monetization/game-passes]`. | **04** |
| **P8** | **Nothing says an outward artifact is a build artifact.** No emitter writes a name, a description, a genre or a maturity label; `release.publishChecklist` covers place settings only. A merged `storeListing` reaches nothing today. Stated, not solved. | **contract-and-seam work**; each sheet states its own emitter hole |
| **P9** | **The brief has no position on whether the listing may claim *relaxing*** — the word all three competitors lead with, forbidden in-game by P7 and explicitly released to the listing. | **01** |
| **P10** | **"Ships and settles" leaves no update to note, and nothing says the format is *absent* rather than undecided.** A silence here is read as an omission by verification. | **05** |

**Scope check.** `03-META.md` priority 3 (*real procgen · rebirth · offline accrual · codes ·
daily rewards · leaderboards · trading · seasons and events*) and priority 2 (*visitable
restored ruins*) are **excluded from every line of copy, every keyword, and the update-notes
format**. No sheet reserves a description section, a keyword or a notes heading for any of
them. Naming one in order to forbid it is the compliant form and sheet 01 does exactly that.
My subject is **not** entirely priority 3: a published experience has a description, a genre
and a maturity label whether or not anyone chooses them.

---

## Why 5 sheets

**One key, one manifest, five genuinely different questions.** Sheet 01 supplies `storeListing`
whole because the merger allows only one owning sheet, and because the claim ledger is the
artifact — it is the only thing in this project that speaks to someone who has not consented
to a demo, and the only place a bar-(a) defect can be committed by writing a sentence. The
other four are not headings on it: **02 is a selection from a closed platform vocabulary under
a three-month change lock**, **03 is a compliance questionnaire whose wrong answer makes the
game unplayable for its own audience**, **04 is a different platform object with its own name,
description, icon and price fields on a different tab**, and **05 is a refusal about a surface
that only exists after launch**. Four different kinds of question, four different failure
modes, four different people who would overturn them. I considered and did **not** assign: a
separate keyword sheet (P2 says there is no field, so it is one paragraph of 02); a separate
sheet for the description's *voice* (that is `theme/tone/02`'s binding humor ban plus M-B, and
a sheet restating them would decide nothing); a sheet on thumbnails or the icon (not mine); a
sheet on server size, device settings or avatar type (`release.publishChecklist`); and a sheet
on the experience name (Name lead — sheet 01 must write copy that survives whatever it is
called, and may not propose one).

| # | sheet | must decide |
|---|---|---|
| 01 | `the-claim-ledger-and-the-description` | Propose `storeListing` whole and write the experience description: decide the section structure, every line of copy, and the ledger row shape the other five domains will reuse — which must carry at minimum T0's `backedBy` resolving to a real key path, sheet id or file, plus a runnable `check` — then carry one row per outward claim the description makes, and assert in the sheet that no row matches `T1`–`T10`. Lead with a summary sentence, because the platform states that is where genre and content are read from `[research: https://create.roblox.com/docs/production/publishing/publish-experiences-and-places]`, and put the differentiator in it: `research/landscape.md` found **no game in this family surfaces a hidden-object collection layer**, bounded by its own stated limit that *"taken means exists, not successful."* Do not write in the commodity register — three games ship *"A relaxing {noun} simulator game where the more you rebirth and upgrade…"* and **two of its clauses are false here**. Decide P9: whether the listing claims *relaxing*, which `theme/tone/01` released to you with recommendation (a), and state the reason either way as a differentiation argument rather than a taste one. Decide P5: whether the absence of rebirth, idle and offline accrual is **stated outward** or merely not claimed, noting `rebirth` is in `bannedWords` so a denial cannot use the word. Decide P4: whether any duration appears at all, given the post-R-2 figures are **1,265 s ≈ 21.1 min** at zero products (`meta/04`'s lap table) and **723 s ≈ 12.1 min** with `Span` owned (`monetization/01`'s), and that `core-loop/04`'s *"minute 11"* is stale — if you cite a figure, cite the field it derives from and its ownership condition, and if you cite none, say so as a field. State the true content volume where the ledger needs it (24 Finds, 4 sets, 8 areas, 1 product) and never above it (`T3`, ruling R-3). Say the two things that are true forever and that no competitor can claim: *finished work is never asked for twice* (`theme/fantasy/02`) and **24/24 is reachable owning zero products** (`F17`). Say nothing that promises endless new things to find, a world that ends up reclaimed, a returned-progress pull, multiplayer interaction, or urgency. `bannedWords` binds every string you write; `maxLabelChars`, `casing`, `maxSentenceWords`, `allowedPattern` and P1–P9 do **not** (M-B); `theme/tone/02`'s humor ban does, by name. Derive any length ceiling from the platform field you verified, not from `vocabulary`, and if you could not verify one, say so and set none. Carry blocks `discovery`, `contentMaturity`, `passListing` and `updateNotes` from sheets 02–05 inside your manifest, and state that no emitter writes any of it today (P8). |
| 02 | `genre-and-where-keywords-live` | Decide the platform genre and optional subgenre from the closed list of 17 genres and 40 subgenres, and supply it as `storeListing.discovery` inside sheet 01's manifest with the occupancy evidence for the choice. The decision is forced and uncomfortable: `restoration` **is not a value the platform offers** (P1), both competitors are filed at **Simulation / Incremental Simulator** — verbatim from the platform's own API for both universes — and that is precisely the category *"marketed as a restoration game, not an incremental"* `[brief: binding]` moves this game out of. Weigh the candidates the list actually contains against what the game does: `Adventure / Scavenger Hunt` and `Adventure / Exploration` against the hidden-object collection layer that `research/landscape.md` found uncontested; `Simulation / Sandbox` and `Simulation / Idle` against the loop; `Simulation / Incremental Simulator` against the binding line that forbids it. State which line you are honouring and what it costs, in the brief's own terms — it already paid *"the cost of the incremental audience's built-in search behaviour"* and you may not re-take that decision, only implement it. Record that **genre can only be changed once every three months**, so this is the least reversible value in the whole category, and name what would trigger the one change. Then close P2: there is no separate tag or keyword field to fill, so decide where discovery keywords live — the platform's own guidance is that the description's **first sentence** is where genre and content are read, and it forbids irrelevant or repeated keywords on pain of demotion. Supply the keyword set as data (the words, and the sentence each sits in), state which are true of the game and which merely adjacent, and state that `bannedWords` binds every one of them so `relic`, `tier`, `artifact`, `antique`, `rebirth`, `loot` and `treasure` are unavailable as keywords even where they would rank. Record the three negative occupancy results already banked — `clearing` as a harvest verb, `overgrowth`, and `index` are unowned — and treat `research/landscape.md`'s stated limits as your bound. Mark `[unverified]` whether a selectable tag field shipped after the 2024 rollout, and name the fetch that would settle it. |
| 03 | `age-and-content-settings` | Decide the content-maturity questionnaire answers, the resulting age label, and the eligibility band they buy, and supply them as `storeListing.contentMaturity` inside sheet 01's manifest. The consequence is hard and is not a preference: leaving it unset means *"Roblox restricts the playability of the experience on the platform for all players"*, and the labels map to bands — **Minimal or Mild** is eligible for Roblox Kids (5–8) and Roblox Select (9–15); **Moderate** for Select (9–15) and 16+; **Restricted** for age-verified 18+ only. The audience is **8–14** `[brief: binding]`, which straddles two bands, so decide which label the game must land on for its own stated audience to be able to play it at all, and derive it row by row from what the game actually contains rather than asserting it — walk every disclosure category (violence, blood, fear, crude humor, unplayable gambling, strong language, romantic themes, alcohol, social hangouts, free-form user creation, sensitive issues, paid random items, paid item trading, media sharing, AI interaction) and give each a stated answer with the approved key or file that settles it: `social` for chat and hangouts, `products` `F3` for paid random items (zero odds tables, zero `PolicyService` calls), `F5` and `products.itemCount: 1` for trading, `theme/tone/01` P8 for fear, `theme/identity/04` for the absent cast. Each row is data with a `backedBy`, not prose. Then name P6 and do not build it: no spend guard exists for the under-13 share, two domains have now routed it here, the platform's control is an **account-level parental monthly limit of 0–10,000 Robux** that a developer can neither set nor read, and the only thing this domain controls is not opposing it — record that as a constraint on sheet 04's copy and route the decision itself to the developer. Record as a negative result that **nothing in the `AnalyticsService` reference states any under-13 suppression of readings**, mark the wave-5 Analytics open item `[unverified]` rather than answered, and name the fetch that would settle it. |
| 04 | `the-pass-listing` | Decide what the experience page's Store tab says about `Span`, and supply it as `storeListing.passListing` inside sheet 01's manifest. This is the whole of the product's discoverability: R-4 removed the in-game store, `F19` forbids the game naming, showing, pricing or referring to a product anywhere inside itself, and `monetization/01` states the cost to you by name — *"the experience page is the only surface on which `Span` is discoverable"*, so this copy is *"load-bearing rather than decorative."* Write to the fields the platform actually gives a pass — **name, description, icon and price**, price in Robux, icon at 512×512 in .jpg/.png/.bmp and cropped to a circle — and state which of those four this key owns and which belong elsewhere (the icon's art is Icon's subject and the price is `products.items[0].priceRobux` at 499, cited not restated). Describe what the pass does and nothing else: axis `radius`, factor **1.75**, `repeatable: false`, permanent, one product and no second thing sold ever (`F5`, `F9`, `products.itemCount: 1`). Say the thing that is true and unusual in this genre — **24/24 is reachable owning zero products** (`F17`) — and make sure no line implies a paid path to any Find, set, area or completion, which `03-META.md` forbids as *"a paid-only object would turn 100% completion into a purchase."* No urgency, no scarcity, no stock count, no discount, no strikethrough, no limited window: `F10`–`F12` bind in-game and `T10` binds outward, and the platform's own guidance forbids claiming an item *"is almost out of stock or only available for a short time if it isn't true"* and recommends softer framing for younger audiences over *"GET IT NOW"*. Then close P7 as data, not as a note: state **what the listing says while `gamePassId` is `null`** — the pass cannot be created until the experience is published, so the copy exists before the object it describes does — and give it a named gate in the same shape `release.provisioning` uses (publish → create pass → paste id → re-emit → republish), so a reader sees a precondition rather than an unfinished spec. `bannedWords` binds every word; `theme/tone/02`'s humor ban binds this surface by name. |
| 05 | `no-update-notes` | Decide the update-notes format, and supply it as `storeListing.updateNotes` inside sheet 01's manifest. The expected answer is an explicit **absence with a stated reason, a reopening condition and a runnable check** — that is an output, not a gap, and wave 6's Music domain (`trackCount: 0`) is the house standard. The closing lines: *"Ships and settles. No seasons or events"* `[brief: soft]`, constrained from above by priority 3 which excludes seasons and events hard; `endgame` is `unlimited: true` and unchanging, so there is nothing to announce; `release` defines no update stream; and `theme/tone/02` already extends the humor ban to *"changelogs, patch notes"* `[cid: decided]`, which means the format has a register before it has a surface. State the dependency plainly and do not resolve it: **Live Ops runs in this same wave and owns whether there is anything in an update at all**, and Hype owns whether anything is said outside the game — you own only the *format* if one is ever needed. So decide, and say which: either the format is `none` today with the condition that would create one, or a minimal format exists as a template with zero entries. Whichever you take, forbid by name the things a notes format invites — no *"new update"*, no *"season 1"*, no *"event this weekend"*, no codes, no group-join reward, no *"come back tomorrow"*, no title tag held open for any of them — and give each a grep-shaped observable. Carry no manifest of your own and say so in one line. |

---

## Verification note

**Sheet 02 is the one most likely to be contradicted, and by two different people.** The
developer, because the genre selection implements a `[brief: binding]` positioning line against
a closed platform vocabulary that contains no matching value, and because it is the least
reversible value in the category (one change per three months). And the **Name lead**, because
a title and a genre are read together at the point of discovery: a title containing a genre
word, or the `Incremental` the brief forbids, changes what sheet 02's selection costs. Neither
of us may decide the other's, and sheet 02 must cite the title by role rather than by value,
since none exists.

**Second: sheet 01's duration row, if it takes one.** It is hostage to `pacing`, which
**Balance & Tuning (wave 4) has not run**. Every lap figure I have cited derives from
`meta/04`'s and `monetization/01`'s tables, both of which say they must be re-derived if any
footprint or arrival level moves. A store page is exactly where a stale figure becomes a false
claim, so if 01 states a duration it must state the field and the ownership condition, not the
number alone.

**Third, and it is a real contradiction to report upward rather than a risk:** my category
brief's gap **M3** says *"No sheet states the post-R-2 completion time."* One does —
`meta/04`: *"Eight laps is 1,265 s"* and *"the whole game is 8 laps and 21 minutes."* The
premise of M3 is wrong; the caution behind it is right, because there are now **two** current
figures (21.1 min unowned, 12.1 min with `Span`) and neither is *"minute 11."*

---

## Research owed

`must_verify`: *"Fetch the store pages of two competitors and record their tag sets. Tag choice
is a discovery decision, not copywriting."* Done, and the answer inverts the question.

**The two competitors' full tag sets, verbatim from the platform's own API:**

| game | universeId | `genre` | `genre_l1` | `genre_l2` |
|---|---|---|---|---|
| `[🌱] Grass Incremental Simulator` (the reference) | 7699580568 | `All` | **`Simulation`** | **`Incremental Simulator`** |
| `[UPDT🍂] Leaves Incremental 🍂` (PrestigeLabs) | 8974089723 | `All` | **`Simulation`** | **`Incremental Simulator`** |

`[research: https://games.roblox.com/v1/games?universeIds=7699580568,8974089723]`
`[research: https://apis.roblox.com/universes/v1/places/133086043677134/universe]`
`[research: https://apis.roblox.com/universes/v1/places/113380129609386/universe]`

**That pair is the whole of their tag set**, and the negative result is the finding: the
platform's current selectable surface is *"one genre and an optional subgenre"*, and the 2024
rollout post says of tags *"we're exploring tags as a way to express multiple dimensions to
complement genres"* — future tense, not shipped
`[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/production/publishing/experience-genres.md]`
`[research: https://devforum.roblox.com/t/now-live-update-your-genre-and-subgenre/3265896]`.
The full 17-genre / 40-subgenre vocabulary is fetched and banked at the first URL above, and it
contains **no `restoration`**.

**Also fetched, banked for the writer, who has no fetch tools:**

| claim | source |
|---|---|
| Content-maturity labels and their bands: **Minimal/Mild** → Roblox Kids (5–8) + Roblox Select (9–15); **Moderate** → Select (9–15) + 16+; **Restricted** → age-verified 18+ only. Unset → *"Roblox restricts the playability of the experience on the platform for all players."* Full 15-category questionnaire list. Paid random items require `PolicyService.ArePaidRandomItemsRestricted`; paid trading requires `IsPaidItemTradingAllowed` | `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/production/promotion/content-maturity.md]` |
| Metadata best practice: *"Summarize what your game is about in the first sentence, as this is your opportunity to present the most accurate impression of its genre and content"*; include relevant keywords; *"Don't repeat keywords or add irrelevant ones, as this may result in game demotion"*; keep the name consistent; one or two emojis at most | `[research: https://create.roblox.com/docs/production/publishing/publish-experiences-and-places]` |
| Discovery ranking reads play-through rate, retention and monetization; *"avoid using irrelevant keywords in your metadata"* | `[research: https://create.roblox.com/docs/production/promotion/discovery]` |
| Monetization guidance: *"Don't claim that a subscription or item is almost out of stock or only available for a short time if it isn't true"*; no inaccurate or restarting countdown; for younger audiences prefer *"View Item"* / *"See Price"* over *"GET IT NOW"* / *"BUY BEFORE IT'S GONE!"* | `[research: https://create.roblox.com/docs/production/monetization]` |
| A game pass listing carries **name, description, icon and price**; icon max 512×512, .jpg/.png/.bmp, cropped circular; price 1 to 1,000,000,000 Robux; passes appear in the **Store tab of the game details page**; the experience *"has been published and is accessible on Roblox"* is a prerequisite for creating one | `[research: https://create.roblox.com/docs/production/monetization/game-passes]` |
| Age-check bands are **Under 9, 9–12, 13–15, 16–17, 18–20, 21+**; chat outside experiences restricted under 13; strict filtering for under-13 chat | `[research: https://about.roblox.com/newsroom/2025/11/roblox-requires-age-checks-limits-minor-and-adult-chat]` |
| Parental monthly spend limit is set by a guardian, account-level, **0 to 10,000**; no developer-facing per-experience control surfaced | `[research: https://en.help.roblox.com/hc/en-us/articles/4409125091348-Monthly-Spending-Limits]` |
| Both competitors' descriptions, verbatim, confirming `research/landscape.md`'s shared-sentence finding a year on and adding two things landscape did not record: **Leaves Incremental ships `USE CODE: RELEASE`** (a redeem code, priority 3 here) and both ship group-join-for-boosts prompts (`F15`'s outward twin) | `[research: https://www.roblox.com/games/133086043677134/Grass-Incremental-Simulator]` `[research: https://www.roblox.com/games/113380129609386/Leaves-Incremental]` |

**Could not settle — `[unverified]`, with the fetch that would close each:**

- **Whether a selectable experience-tag field shipped between the Nov-2024 rollout and today.**
  The current genre doc names only genre + optional subgenre, and four API shapes for a tags
  endpoint returned 404 (`/universes/v1/{id}/tags`, `/universes/v1/universes/{id}/tags`,
  `/universes/v1/multiget/tags`, `/game-tags/v1/tags`). Settled by: the Creator Hub
  experience **Settings → Basic Info** page for any live universe (needs auth), or a
  `create.roblox.com/docs/production/publishing/` page naming a tags field. Sheet 02 must
  write the absence as `[unverified]`, not as fact.
- **Any character limit on the experience name, the experience description, or a game pass
  name or description.** No fetched page states one, and the only devforum evidence is that
  Studio and the website disagree. **Sheet 01 may not invent a ceiling** — M-B forbids
  borrowing `vocabulary`'s, and the platform's own number is not in hand. Settled by: a
  Creator Hub field with its counter visible, or an Open Cloud `universes` resource schema
  stating `maxLength`.
- **Whether `AnalyticsService` readings are suppressed or altered for under-13 accounts.** The
  class reference states nothing about collection scope, age or retention. This is the wave-5
  Analytics open item and it remains open. Settled by: Roblox's privacy policy or a Creator
  Hub analytics data-collection page.
  `[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/reference/engine/classes/AnalyticsService.yaml]`
- **Rolimons reported a tag list for the reference that the platform API does not carry.** I am
  recording it as **not sourced** rather than citing it, because the fetch returned an
  inferred summary rather than page text. The API rows above are the citation of record.

**Not fetched by me and deliberately so:** any occupancy check on a candidate *title* — that is
the Name lead's `must_verify` and duplicating it would produce a second answer to one question.

---

## Not decided here

The experience name and any tagline (Name). The icon (Icon). Every thumbnail, its composition,
its overlay and its capture source (Thumbnails). Whether any channel or beat exists to point at
this page (Social, Hype). What is actually in an update (Live Ops). Server size, device
settings and avatar type as displayed (`release.publishChecklist`). What `Span` costs, what it
multiplies and whether it is sold at all (`products`). Every lap, footprint and completion
figure (`depths`, `pacing` at wave 4) — cited here, set nowhere in this domain. Whether the
schema grows a shape for `storeListing` and what emitter would read it (contract-and-seam
work). Whether a spend guard exists for the under-13 share (the developer).
