# Name — domain index

**Category:** Discovery & Marketing · **Wave:** 7 · Reads: `HANDOFF.md`, `CONCEPT.md`, `00-CORE.md`,
`03-META.md`, `05-OUTWARD.md`, `OPEN.md` (§1–§5), `research/landscape.md`,
`cid/marketing/_category.md`, `cid/theme/vocabulary/01`, `/02`, `cid/theme/vocabulary/_lead.md`,
`cid/theme/tone/01`, `cid/theme/fantasy/02`, `cid/art/ui-art/01`, `cid/_contract.md`,
`cid/_state.md`, `bridge/schema.mjs` (`SCHEMA` key list, `playerFacingStrings`,
`crossCuttingProblems`), `ui-forge/src/theme/generate.mjs`, `concept/src/derive/game-context.mjs`,
`game/src/shared/Theme.luau`.

**Contract position.** `bridge/schema.mjs` holds **25** keys and none is an outward artifact. I own
none of them, so I propose **`title`**, which is not in the taken list at `_category.md` §Contract
position. One key, one sheet with a `manifest` fence (sheet 01). Sheets 02 and 03 carry a plain
`json` amendment fence addressed to `title` and **claim no key**, which is the pattern
`theme/vocabulary/01` used against `vocabulary` and which `bridge` does not parse as a claim
`[research: repo — bridge/merge.mjs, bridge/schema.mjs, read this run]`.

---

## What the brief gave me

**On the name itself, the brief gives one fact and it is a negative one.**

> *"## 3. Needs you — **The working name is a placeholder.** `incremental-spinoff-v2` is a slug, not
> a name."* — `OPEN.md §3` · `[brief: binding]` on the reservation

> *"| Name, icon, thumbnail, store description | Discovery & Marketing |"* — `OPEN.md §4`, headed
> *"Deliberately left open — decisions, not gaps"* · `[brief: binding]` on the routing

> *"Left open — the name, icon, thumbnail composition, and store description."* — `05-OUTWARD.md`

**Read together: the work is here, the ratification is the developer's.** That is my category lead's
reading, flagged as **M4** with one developer line if wrong, and I adopt it because §3's own heading
is *"Needs you"* while §4's is *"decisions, not gaps"*. Nothing in the brief adjudicates between
them. My output is therefore a framework, evidence and a candidate set, and **sheet 01 states its
recommendation as a recommendation.**

**On what the name may say.**

> *"A **restoration / completion game**, not an incremental."* — `CONCEPT.md` · `[you chose: R4 Q2]`
> → `[brief: binding]`. And its price, stated by the brief rather than discovered by me:
> *"That deliberately moves it out of the category where every competitor sits — at the cost of the
> incremental audience's built-in search behaviour."* — `05-OUTWARD.md`

**A title containing `Incremental` reopens a binding decision.** Not available.

> *"**The noun is not the differentiator.** Grass, lumber, ore, scrap, leaves, snow (×3), slime,
> souls, sand and pressure-washing are all occupied, several with identical marketing copy.
> Distinction lives in the **collection layer**."* — `HANDOFF.md` #1, elevating `00-CORE.md`
> `[you chose: R1 Q1]` → `[brief: binding]`

> *"**Clear the overgrowth, find what's buried.**"* — `05-OUTWARD.md` `[you accepted: R6 Q1]` →
> `[brief: soft]`. Three alternatives were declined with reasons, and the reasons are the brief's
> own naming criteria: *"Pure 'restore the ruin' was declined for underselling the collection.
> 'Uncover a lost civilisation' was declined because the verb disappears. 'Every ruin hides
> something' was declined because it promises secrets the discovery pacing would then have to keep
> delivering."*

> *"**This game exists to prove the `arga` pipeline works end to end.** … Success is **shipped
> artifacts, not players**."* / *"content design is the primary creative work on this project, not
> art or **marketing**."* — `00-CORE.md` `[you chose: R1 Q3 / R1 Q1]` → `[brief: binding]`

> *"**Ships and settles. No seasons or events.**"* — `OPEN.md §2` `[I assumed — batched]` →
> `[brief: soft]`. This is the line that governs whether a title tag ever fires.

> *"**8–14, mobile-heavy, short sessions** … casual but **genre-literate**."* — `00-CORE.md`
> `[you chose: R1 Q4]` → `[brief: binding]`

**On what binds the string, from approved upstream sheets.**

| source | what it binds | tag |
|---|---|---|
| `theme/vocabulary/02` | `bannedWords`: `relic relics tier artifact antique rebirth loot treasure`. Four cite a shipping competitor URL; the ban's own stated reason is *"reads as a clone **in the store listing**"* | `[brief: soft]` upstream, **binding on me** by category ruling M-B |
| `theme/vocabulary/01` | *"the title, the tagline and the store description are **outside this table**. No ceiling, no word count, no casing rule and no plural rule on this sheet reaches them. **Uppercase in a store listing is a listing decision.**"* | verbatim exemption |
| `theme/tone/01` | *"**Store listing** (Discovery & Marketing): **not bound by this sheet.**"* | verbatim exemption |
| `theme/tone/02`, via the developer, session 2026-07-30 | *"No system copy, UI, error message, tutorial text, or **store copy** is funny."* | `[brief: binding]` — names store copy by name |
| `theme/fantasy/02` | *"'Clear the overgrowth, find what's buried' stays as the store hook and is **a first-session promise with a supply of 24**. … **no line may promise endless new things to find**, and **no line may promise a world that ends up reclaimed**."* | binds sheet 03 |
| `theme/lore/01` via `theme/tone/01` P8 | canon: the place *"was never lost, only overgrown"* | a **truth** constraint on a title, not a register one. See G5 |
| `art/ui-art/01` | `uiTheme.sourceTitle: "Ruin Restoration"`, set as a starting value and flagged: *"`sourceTitle` needs the game's name and the game has none."* | a flagged starting value, **not** a decision |
| `_category.md` ruling **M-B** | *"`bannedWords` binds every outward string in this category. `maxLabelChars`, `casing`, `maxSentenceWords`, `allowedPattern` and P1–P9 do not."* | `[cid: decided]` at the category |
| `_category.md` `T0`–`T10` | every outward claim is a row with a resolving `backedBy`; `T1`, `T2`, `T9`, `T10` are the four a title or tagline can trip | inherited |

### My ruling on `maxLabelChars` 14, since I was asked to make one rather than inherit it

**It does not reach the store title, and it does not reach `uiTheme.sourceTitle` either.** Three
grounds, checked rather than relayed:

1. **The mechanism.** `crossCuttingProblems()` applies `vocab.maxLabelChars` only over the paths
   `playerFacingStrings()` returns, and that function walks ten contract paths, all of them
   `GuiObject`-rendered strings inside `game/src`. A store title is not one of them and neither is
   `uiTheme.sourceTitle`. `[research: repo — bridge/schema.mjs, read this run]`
2. **The derivation.** 14 is *"the header's"* ceiling from a full-width panel at phone size
   (`theme/vocabulary/01`). A store title renders on a platform tile whose width nobody in this
   project has measured. Carrying a number across that boundary would be a ceiling derived from one
   surface applied to another, which is the exact error `theme/vocabulary/01` argues against.
3. **The sheets say so.** `theme/vocabulary/01` exempts the title by name; `art/ui-art/01` states
   *"`meta.sourceTitle` is never rendered, so `vocabulary`'s 14-character ceiling and casing rule do
   not bind it."* Confirmation, not proof: the shipped starting value **`"Ruin Restoration"` is 16
   characters** and merged without a violation, which is what a non-binding ceiling looks like.

**What does bound the title, then:** `bannedWords`; the platform field limit, which is
**`[unverified]`** (sheet 02); and legibility on a tile at phone size, which is a measurement nobody
has made and which sheet 02 must state as the operative bound rather than a number it invented.
`[cid: decided]`, and it agrees with M-B rather than extending it.

### The wire, which changes what `title` is worth

`title` is **not** an orphan key, and this is the one place my domain escapes gap `M6`. The path
exists end to end in code read this run:

```
title.value  →  context.title            concept/src/derive/game-context.mjs:136 (`title: concept.title`)
             →  ctx.title                ui-forge/src/theme/generate.mjs:116 (`sourceTitle: ctx.title ?? 'Untitled'`)
             →  Theme.luau meta.sourceTitle   game/src/shared/Theme.luau:12 (today: "Pet Ascend Simulator")
             →  asserted by art/ui-art/01's proposed bridge/test/theme-archetype.test.mjs on `npm test`
```

`[research: repo — four files, read this run]`. **Consequence for UI-Art work** (stated as a
consequence, not a crossing): two keys would hold one string. Sheet 01 must rule which is
authoritative and I expect `title.value`, with `uiTheme.sourceTitle` as the mirror the existing
`npm test` assertion compares against, resolving `art/ui-art/01`'s flagged alternative **(c)** into a
one-field revision request. That sheet asked for exactly that: *"I recommend (a) and a one-field
revision when you name the game."*

**One correction to an approved sheet, found by reading the file.** `art/ui-art/01`'s
`context.mustAlsoCarry` lists `title`, `genre`, `audience.ageBand` and `audience.platformMix` as
fields `deriveGameContext` does not carry. **All four are already emitted**, at
`concept/src/derive/game-context.mjs:136–143`. Only `artDirection.tokenOverrides` and
`artDirection.tokens` are genuinely absent, so its `A3` stands and its `mustAlsoCarry` list
overstates the hole by four entries. This does not change any decision on that sheet; it is recorded
so a later reader does not build a second `A3` around a hole that is not there.
`[research: repo — concept/src/derive/game-context.mjs, read this run]`

---

## What the brief did not give me

Named, routed, not filled.

| # | gap | routed to |
|---|---|---|
| **G1** | **No naming criteria of any kind.** The brief declines three candidate *lines* with reasons (`05-OUTWARD.md`) and never states a criterion for a *name*. Every generation frame, every elimination rule and the number of candidates is decided against a blank page. | **01**, `[cid: decided]` throughout |
| **G2** | **The brief never says whether a tagline exists.** `05-OUTWARD.md` calls *"Clear the overgrowth, find what's buried"* the *"discovery hook"*, never a tagline, and Roblox exposes a name field and a description field, not a tagline field. Whether a tagline is an artifact at all is unanswered. | **03** |
| **G3** | **The brief never says whether the name may change after publish.** *"Ships and settles"* `[brief: soft]` is about content and cadence, not identity, and nothing in the brief or in `release` states a rename policy or an alternate-promotion trigger. | **02** |
| **G4** | **No character or legality bound on the name field exists anywhere** — not in the brief, not in `bridge/schema.mjs`, and not in any creator-docs page I could fetch. See Research owed. | **02**, `[unverified]` |
| **G5** | **The brief's positioning names a cost and never names what replaces it.** *"at the cost of the incremental audience's built-in search behaviour"* `[brief: binding]` states a loss and no substitute. Partly closed by what I fetched; the ruling on how much is sheet 01's. | **01** |
| **G6** | **Nobody says what `uiTheme.sourceTitle` holds while ratification is pending.** `art/ui-art/01` flagged it and recommended (a) *"and a one-field revision when you name the game"*; the revision has no trigger, no owner and no state. | **01** |
| **G7** | **`research/landscape.md` states its own limit and it is mine to inherit.** *"'taken' here means 'exists', not 'successful'"*, no CCU or visit figures, and *"whether the untouched themes are actually free or simply poorly indexed. Four searches surfaced nothing; that is weak evidence."* Category gap **M9**, relayed here. Every occupancy row I bank carries the same bound. | **01**, stated in the sheet |
| **G8** | **The glyph question has no owner.** `theme/tone/01` P4/P6 forbid glyphs *in-game* and M-B says they do not reach a title, yet the glyph is this genre's own tic (`[🌱]`, `🧲`, `[UPDT🍂]`). A rule was removed and none replaced it. | **02** |

**Scope check.** Nothing in my subject is priority 3. The one adjacent item that is, **a seasonal or
event variant of the name**, is in my graph `owns` list via title tags and is **forbidden** by
`03-META.md` priority 3 and by `theme/setting/03`'s consequence *"there is no hour, weather or season
channel to run anything through"*. Sheet 02 names it in order to forbid it, which is the compliant
form. No sheet here specs excluded content.

---

## Why three sheets

**One contract key, one sheet with the manifest, plus two sheets that each constrain that key rather
than restate it.** Sheet 01 answers *what is this game called*, which is one decision and carries
`title`. Sheet 02 answers *what may the name field ever contain, and when may it change*, which is a
different question with a different evidentiary base (a platform field limit, platform naming
guidance, a rename cost) and which produces the filter every candidate in 01 is checked against, not
the value. Sheet 03 answers *does a tagline exist and what does it promise*, which is a truthfulness
decision governed by `theme/fantasy/02`'s first-session-promise ruling and by `T1`/`T2`/`T9`, and
which a name sheet would bury as a bullet. **The split I rejected was two sheets** with the tagline
folded into 01: the tagline is the only string in this domain that makes a *promise*, and a promise
that can commit a bar-(a) defect earns its own decision. **The split I also rejected was four**, with
alternates held separately from the recommendation: a reserve list with no promotion rule is not a
decision, and the rule lives with the rename cost in 02.

| # | sheet | must decide |
|---|---|---|
| 01 | `the-title` | Build the candidate set for this game's name from a stated generation frame, at least six candidates wide, and for each one record the exact-match and near-match occupancy result against the evidence banked in `cid/_research/pack.md`, eliminating on sight any candidate containing a `vocabulary.bannedWords` entry or the word `Incremental`; then state one recommendation **as a recommendation with the developer's ratification open**, name the reserved alternates, rule which key is authoritative for the string given that `title.value` and `uiTheme.sourceTitle` both hold it and `Theme.luau` is asserted against the latter on `npm test`, say what `uiTheme.sourceTitle` holds until ratification, and supply the `title` key holding the recommended string, the alternates, and the per-candidate evidence rows with a resolving `backedBy` on each. |
| 02 | `the-name-field` | Decide what the Roblox name field may ever contain and when it may change: rule whether any glyph or emoji appears in the title, against the platform's own *"one or two well-placed emojis isn't harmful"* guidance on one side and four shipping competitors using one on the other, and rule it as an occupancy decision rather than a typography one; rule the title-tag convention (`[UPDATE]`, `[X2]`) as **present with a firing condition** or **explicitly absent**, given *"ships and settles"* and given that priority 3 leaves no seasonal or event tag anything to attach to; state the character bound you actually apply, derived from the surface it renders on, and carry the platform field limit as `[unverified]` with the exact fetch that would settle it rather than a number from memory; and state the rename cost from the platform's own consistency guidance as the rule that governs promoting a reserved alternate after publish. |
| 03 | `the-tagline` | Decide whether this game has a tagline distinct from its title at all, given that Roblox exposes a name field and a description field and no tagline field, and if it does, state the exact string as a single `T0` claim row with a `backedBy` that resolves and a check a critic can run: the brief's *"Clear the overgrowth, find what's buried"* `[brief: soft]` is the default and `theme/fantasy/02` has already bound it to **a first-session promise with a supply of 24**, so rule explicitly whether the tagline is that line unchanged, a narrowed version, or absent, verify it against `T1`, `T2`, `T9` and `T10` and against the canon that the place *"was never lost, only overgrown"*, and name where the string is consumed without deciding any consumer's layout. |

**Sheet 01 carries the only `manifest` fence in this domain.** Sheets 02 and 03 file their outputs as
fields of `title` through a plain `json` fence tagged `"amends": "title"`, so no two sheets claim one
key and the merger sees one proposal.

---

## Verification note

**Sheet 01 is the one most likely to be contradicted, and by the developer**, because `OPEN.md §3`
reserves ratification and no sheet can close a reservation. That is by design and the sheet's shape
absorbs it: a recommendation plus alternates plus a promotion rule survives a developer picking a
different candidate; a fait accompli does not. The second most likely contradiction is **sheet 02's
character bound, by whoever first opens the Creator Dashboard** and reads the field's own validation
message, which is why it must ship as `[unverified]` with a named settling fetch rather than as a
number. Third, and cheapest to fix: **sheet 01's occupancy rows go stale**, by the same mechanism
that made v1's snow finding worthless. Every row is dated and every row inherits `G7`'s bound that
*"taken" means "exists", not "successful"*.

**One live cross-key risk for the cross-category pass:** `title.value` and `uiTheme.sourceTitle` hold
the same string and `art/ui-art/01`'s proposed test asserts equality between `uiTheme` and a
generated file, not between `title` and `uiTheme`. If sheet 01 recommends anything other than
`"Ruin Restoration"`, **an approved wave-6 key's value changes**, and the revision request is
Art & Visuals' to accept. Sheet 01 states it as a consequence; it does not edit that sheet.

---

## Research owed

**`must_verify`:** *"Search the title before committing. Confirm it is not taken, and that it is
reachable by the search behaviour the brief's audience actually uses."*

### Fetched, and banked for the writer

**Platform naming and discovery**, all from
`[research: https://create.roblox.com/docs/production/publishing/publish-experiences-and-places]`:

- *"Your game's name and description create an important first impression and contribute to how
  easily players find your game through Roblox's dynamic discovery systems."*
- *"Keep the name consistent – Renaming a game too often reduces the chances that players can find it
  using a previous name."* **This is the sourced rename cost, and it is what makes a reserved
  alternate a decision with a price rather than a free option.**
- *"Avoid spamming – Frequent repetition of words or phrases may result in demotion of your game."*
- *"Decorating the name with one or two well-placed emojis isn't harmful, but misplaced or excessive
  decorations can confuse players who quickly want to identify the game."* **The platform permits the
  glyph.** So sheet 02's ruling cannot be made on platform grounds and must be made on occupancy and
  positioning grounds, which is the opposite of what I expected before fetching.

**Search behaviour**, `[research: https://create.roblox.com/docs/production/promotion/discovery]`:

- Primary discovery is the *"Recommended for You"* sort, a two-stage retrieval-then-ranking system on
  engagement, retention and monetization signals. **Not search.**
- *"you can now use semantic search for all of our officially supported languages to find games
  through natural language queries, such as 'food games' or 'avatar editors'."* Historically search
  *"relied on relevance based on exact search queries and limited metadata such as titles."*
- *"mismatched content or misleading titles"* receive reduced exposure.

**Bearing on `G5` and on a `[brief: binding]` line:** the brief priced the restoration positioning at
*"the cost of the incremental audience's built-in search behaviour"*. Semantic search over natural
language materially **softens** that cost, and the recommendation sort was never keyword-driven at
all. This is evidence, **not an overrule** — the positioning decision is binding and I am not
touching it. Sheet 01 records it as the substitute the brief could not name.

### Occupancy, run this session

Every row is a fresh search dated **2026-08-02**, and every row inherits `G7`: *exists*, not
*successful*, and absence of a hit is weak evidence.

| word or title shape tested | result | evidence |
|---|---|---|
| **`Ruin Restoration`** exact, and `ruin`/`ruins` as a title word | **no exact-match experience surfaced.** Near neighbours are all outside this family: showcases and unrelated genres | `[research: https://www.roblox.com/games/129955223489508/Star-Ruins-Spirit-Forest]` `[research: https://www.roblox.com/games/7892152397/Ruins-Realm]` `[research: https://www.roblox.com/games/127310837609892/CONTENT-UPDATE-FNaF-The-Ruins-Pre-Alpha]` |
| **`overgrowth` / `overgrown`** | **no experience in this family.** One builder showcase and one catalog item. **Corroborates `theme/vocabulary/02`'s negative result** with a second search a year later | `[research: https://www.roblox.com/games/4508787172/Lush-Overgrown-Showcase]` `[research: https://www.roblox.com/catalog/11415599271/Overgrowth-Cape]` |
| **`restoration` / `restore` as a title word** | **the word is free; the position is not.** No shipping title uses `restoration`, but `reStore` occupies restoration-plus-collection and `Clean the Museum` ships *"the more you restore, the more the museum comes back to life"*. **This is materially past `landscape.md`, which cited `reStore` only under `antique`** | `[research: https://www.roblox.com/games/87179205054038/reStore]` `[research: https://www.roblox.com/games/94672857541034/Clean-the-Museum]` |
| **`Clear the ___` / `Clean the ___` as a title shape** | **now the busiest shape in the cleanup genre.** Five shipping titles on one search page. `theme/vocabulary/02` recorded `clearing` as a free *word*; the **shape** is not free, which is a different finding and it bears directly on whether the hook line can be the title | `[research: https://www.roblox.com/games/94672857541034/Clean-the-Museum]` `[research: https://www.roblox.com/games/72417782950794/Clean-the-Backyard]` `[research: https://www.roblox.com/games/136066894181626/Clean-the-Restaurant]` `[research: https://www.roblox.com/games/80310980024153/Clean-Your-Room]` `[research: https://www.roblox.com/games/80000420704526/Clean-The-Superstore]` |
| **`find` / `finds`** — the game's own collection-class noun | **heavily occupied as a title pattern.** A shipping `Find the Objects` plus the platform-wide `Find the ___` genre. **The obvious move of reusing the in-game noun in the title is the worst-evidenced option in this set** | `[research: https://www.roblox.com/games/127763554649245/Find-the-Objects]` |
| **`buried` / `dig` / `treasure`** — the hook's second half as a title word | **the most crowded neighbourhood on the platform right now.** `treasure` is already banned by `theme/vocabulary/02`; `dig` is at least five shipping titles | `[research: https://www.roblox.com/games/126244816328678/DIG]` `[research: https://www.roblox.com/games/76455837887178/Dig-it]` `[research: https://www.roblox.com/games/1345139196/Treasure-Hunt-Simulator]` `[research: https://www.roblox.com/games/81440632616906/Dig-to-Earths-CORE]` `[research: https://www.roblox.com/games/138485603458691/Dig-for-Dinos]` |
| **`Incremental` in a title** | occupied by at least eight shipping titles across at least three studios, from `landscape.md`, and closed to this game anyway by `[you chose: R4 Q2]` | `[research: research/landscape.md]` and its four fetched URLs |

**The shape of the finding, stated for the writer because it is the useful part:** both halves of the
brief's hook line are, as *title* material, in occupied territory in 2026 — the verb half by the
`Clean the ___` pattern, the object half by the `Dig`/`Find` pattern. The words the occupancy
evidence leaves genuinely open are the ones naming **the place and its condition** (`ruin`,
`overgrowth`, `overgrown`, `stone`, `terrace`), not the ones naming **the action or the prize**.
Sheet 01 builds its frame against that; I am not naming the candidates here.

### Could not verify

**The Roblox experience name field's character limit.** `[unverified]`

Four fetches: the creator-docs publishing page (states naming best practices, **no limit**), the
discovery page (no limit), `create.roblox.com/docs/cloud/legacy/games/v1` and
`create.roblox.com/docs/cloud/reference/Universe` (endpoint indexes, no field schema), plus a
devforum thread reporting a Studio-versus-website discrepancy **with no numbers**
`[research: https://devforum.roblox.com/t/experience-title-and-description-too-long-in-studio-game-settings-but-not-on-the-website/2499228]`.
Two general web searches returned only unrelated 50-character limits (usernames, `Tool` names,
DataStore scopes) and no experience-name figure.

**The specific fetch that would settle it:** the Open Cloud v2 request-body reference for
`PATCH /cloud/v2/universes/{universeId}`, which is where a `displayName` maxLength would be stated if
one is documented; failing that, the Creator Dashboard **Basic Settings** form's own validation
message, which is a UI reading and not a fetch. **Sheet 02 must not write a number from memory.**

**A usable interim bound, derived from shipped titles rather than invented:** every competitor title
in `landscape.md` is under 30 characters — `Scrap Incremental 🧲` 20, `Grass Incremental Simulator`
27, `Lumber Incremental Simulator` 28, `[UPDT🍂] Leaves Incremental 🍂` 28. So the field limit is
almost certainly not the binding constraint, and the operative bound is legibility on a tile at phone
size, which **nobody in this project has measured** and which sheet 02 states as such rather than
converting into a number. `[playtest unknown]`

**Not attempted, and named so nobody assumes it was:** no visit or CCU figure was gathered for any
title above, so `G7` stands unclosed exactly as `research/landscape.md` left it.
