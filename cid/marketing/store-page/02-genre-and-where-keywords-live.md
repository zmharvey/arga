# 02 — Genre, and where keywords live

**Domain:** marketing/store-page · **Category:** Discovery & Marketing · **Wave:** 7

## Decision

**`Adventure` / `Scavenger Hunt`.** Not `Simulation / Incremental Simulator`, which is where both
competitors sit and which the binding positioning line moves this game out of. **There is no tag
field to fill**, so the eight discovery keywords live in the description's opening block, one
appearance each, and `bannedWords` closes the two words that would rank highest.

## Why

**`restoration` is not a value the platform offers.** The genre vocabulary holds **17 genres and 40
subgenres** and contains no `restoration`
`[research: https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/production/publishing/experience-genres.md]`.
`uiTheme.genre: "restoration"` is a ui-forge archetype-resolution string and `art/ui-art/01` says
so; it is not a platform value and never was. **That is gap P1, and it means the binding line
*"marketed as a restoration game, not an incremental"* `[brief: binding]` ← `[you chose: R4 Q2]`
(`05-OUTWARD.md`) has no platform value to land on.** I implement its second half exactly — the
game is not filed as an incremental — and its first half as closely as a closed vocabulary permits.

**Both competitors' entire tag set is one pair, verbatim from the platform's own API.** Grass
Incremental (universe 7699580568) and Leaves Incremental (8974089723) are each `genre: All`,
`genre_l1: Simulation`, `genre_l2: Incremental Simulator`
`[research: https://games.roblox.com/v1/games?universeIds=7699580568,8974089723]`. That is the
category the brief moved out of, and it already paid the price in its own words: *"at the cost of
the incremental audience's built-in search behaviour."* **I may not re-take that decision, only
implement it**, so no candidate under `Simulation` is live.

**Why Scavenger Hunt and not the other three the list contains.** `research/landscape.md`'s one
uncontested finding is that *"no game in this family surfaced a hidden-object collection layer"* —
objects revealed by harvesting that enter a permanent, set-structured index — and the long-term
objective is *"complete all four sets · 24 of 24"* `[brief: soft]` ← `[you accepted: R6 Q3 → R5 Q3]`
(`03-META.md`). A finite list of hidden things to find **is** a scavenger hunt, and it is the one
description of this game that is both true and unoccupied in its own family.

| candidate | verdict | what settles it |
|---|---|---|
| `Adventure / Scavenger Hunt` | **taken** | 24 hidden objects in 4 sets, revealed by clearing, entering a permanent index (`collection`); the collection is the only finishable thing (`03-META.md`) |
| `Adventure / Exploration` | declined | there is nothing to explore. `depths.unlock` is `previousAreaComplete`, `traversal` gates nothing, and `layout` draws from a shuffled authored family — no map, no route, no navigation problem |
| `Simulation / Sandbox` | declined and false | no building and no free-form creation. `social.plotAccess.othersMayEnter: false`, `sharedState: []`, zero `TextBox` instances (`F15`) |
| `Simulation / Idle` | declined and false | *"No offline accumulation"* `[brief: binding]` ← `[you chose: R2 Q2]`. Nothing accrues while away |
| `Simulation / Incremental Simulator` | **forbidden** | the binding positioning line; and it is verbatim where both competitors sit |

**The cost, stated in the brief's own terms and one thing beyond them.** The brief priced the loss
of the incremental audience's search behaviour. **A second cost it did not price:** filing under
`Adventure` also removes this game from the `Simulation` browse surface where its own four
surveyed neighbours sit, so it will not appear beside the games a player who liked one of them is
shown. I am not treating that as a reason to reverse — `00-CORE.md` declines players as a success
measure `[brief: binding]` — but it is the concrete shape of a cost the brief stated abstractly.

**This is the least reversible value in the whole category. Genre changes once every three months**
`[research: https://devforum.roblox.com/t/now-live-update-your-genre-and-subgenre/3265896]`. Two
triggers would spend the one change, and neither is a visit count, because a discovery argument
from traffic is a retention argument and `00-CORE.md` closes it:

| # | trigger | how it is checked |
|---|---|---|
| `X1` | a genre or subgenre named for restoration, cleanup, collection or completion enters the vocabulary | re-fetch the genres doc and diff against the 17/40 list banked today |
| `X2` | the `[unverified]` below resolves and a selectable tag field ships | the Creator Hub Settings → Basic Info page for a live universe |

**P2 closed: there is no tag or keyword field, so keywords live in the first block.** The current
selectable surface is *"one genre and an optional subgenre"*, and the 2024 rollout post says of
tags *"we're exploring tags as a way to express multiple dimensions to complement genres"* — future
tense `[research: https://devforum.roblox.com/t/now-live-update-your-genre-and-subgenre/3265896]`.
The platform's own metadata guidance is that the first sentence is where genre and content are
read, to include relevant keywords, and that *"Don't repeat keywords or add irrelevant ones, as
this may result in game demotion"*
`[research: https://create.roblox.com/docs/production/publishing/publish-experiences-and-places]`;
discovery ranking independently advises against irrelevant keywords in metadata
`[research: https://create.roblox.com/docs/production/promotion/discovery]`. **So the rule is one
appearance per word and no word that is not true of the game** — eight words, all true, none
repeated.

**The three negative occupancy results are what make this set both true and undefended.**
`theme/vocabulary/02` recorded that **`clearing` as a harvest verb, `overgrowth`, and `index` did
not surface as any Roblox game's signature word**, against occupied verbs trimming, cutting,
washing, shovelling, ploughing, gathering, digging, mowing and cleaning. Three of my eight keywords
are those three. Bounded by `research/landscape.md`'s own stated limits: *"'taken' here means
'exists', not 'successful'"*, no CCU or visit figures were gathered, and *"four searches surfaced
nothing; that is weak evidence."*

**`bannedWords` binds every keyword (ruling M-B), and the cost is concrete.** `treasure` and
`relic` are the two highest-ranking words a buried-object game could carry and both are closed —
`relic` because `Scrap Incremental` and `Faith Incremental` ship it for a rolled multiplier item,
`treasure` because it contradicts the register and because `Treasure Hunt Simulator` occupies it
`[research: cid/theme/vocabulary/02-banned-words.md]`. `tier`, `artifact`, `antique`, `rebirth` and
`loot` are closed on the same list. **A keyword set for this game cannot use the genre's own noun
for its own differentiator**, and that is the price of the ban list, paid here rather than argued.

**The title is cited by role, not by value.** `title` has no value; the Name lead runs in this same
wave. A title containing `Incremental` would reopen the binding line and make this selection
incoherent, and a title containing a genre word is read together with the genre at the point of
discovery. **Neither of us may decide the other's**, and this key names no candidate.

```manifest
{
  "amends": "storeListing",
  "value": {
    "discovery": {
      "genre": "Adventure",
      "subgenre": "Scavenger Hunt",
      "vocabularySize": { "genres": 17, "subgenres": 40 },
      "restorationIsNotAPlatformValue": true,
      "uiThemeGenreIsNotThis": "uiTheme.genre 'restoration' is a ui-forge archetype-resolution string, not a platform genre. The two fields are unrelated and neither derives from the other.",
      "changeFrequencyLimit": "once every three months",
      "leastReversibleValueInCategory": true,
      "changeTriggers": [
        { "id": "X1", "trigger": "a genre or subgenre named for restoration, cleanup, collection or completion enters the platform vocabulary", "checkedBy": "re-fetch the experience-genres doc and diff against the 17 genre / 40 subgenre list banked in cid/_research/pack.md" },
        { "id": "X2", "trigger": "a selectable experience-tag field ships", "checkedBy": "the Creator Hub Settings to Basic Info page for a live universe" }
      ],
      "changeTriggersDeliberatelyExcluded": ["visit count", "CCU", "impressions", "click-through", "conversion"],
      "changeTriggersExcludedBecause": "a discovery argument from traffic is a retention argument, and 00-CORE.md declines both retention and revenue as goals [brief: binding]",
      "candidatesWeighed": [
        { "value": "Adventure / Scavenger Hunt", "verdict": "taken", "because": "24 hidden objects in 4 sets entering a permanent index; the collection is the only finishable thing (03-META.md); research/landscape.md found no game in this family surfaces a hidden-object collection layer" },
        { "value": "Adventure / Exploration", "verdict": "declined", "because": "no map, no route and no navigation problem. depths.unlock is previousAreaComplete and traversal gates nothing" },
        { "value": "Simulation / Sandbox", "verdict": "declined, false", "because": "no building and no free-form creation. social.plotAccess.othersMayEnter false, sharedState empty, zero TextBox instances" },
        { "value": "Simulation / Idle", "verdict": "declined, false", "because": "01-FOUNDATION.md, no offline accumulation [you chose: R2 Q2]" },
        { "value": "Simulation / Incremental Simulator", "verdict": "forbidden", "because": "05-OUTWARD.md's binding positioning line, and it is verbatim where both competitors sit" }
      ],
      "competitorOccupancy": [
        { "game": "Grass Incremental Simulator", "universeId": 7699580568, "genre": "All", "genre_l1": "Simulation", "genre_l2": "Incremental Simulator", "isTheReference": true },
        { "game": "Leaves Incremental", "universeId": 8974089723, "genre": "All", "genre_l1": "Simulation", "genre_l2": "Incremental Simulator", "isTheReference": false }
      ],
      "competitorTagSetIsCompleteAt": "genre plus genre_l1 plus genre_l2. That triple is the whole of their tag set.",
      "costPaid": [
        "the incremental audience's built-in search behaviour, priced by the brief at 05-OUTWARD.md and not re-decided here",
        "absence from the Simulation browse surface where all four surveyed neighbours sit, which the brief did not price and which is stated here rather than discovered later"
      ],
      "tagField": {
        "exists": "unverified",
        "selectableTagCount": 0,
        "evidence": "the current genre doc names only genre plus one optional subgenre; the Nov-2024 rollout post describes tags in the future tense; four API shapes returned 404 (/universes/v1/{id}/tags, /universes/v1/universes/{id}/tags, /universes/v1/multiget/tags, /game-tags/v1/tags)",
        "settledBy": "the Creator Hub experience Settings to Basic Info page for any live universe (needs auth), or a create.roblox.com/docs/production/publishing/ page naming a tags field",
        "rolimonsTagListNotCited": "a third-party tag list for the reference was seen but the fetch returned an inferred summary rather than page text. Recorded as not sourced. The platform API rows above are the citation of record."
      },
      "keywordSurface": "storeListing.description.S1, the summary block, because the platform states the first sentence is where genre and content are read",
      "keywordMaxRepeatsPerWord": 1,
      "keywordRule": "one appearance per word across the whole description, and no word that is not true of the game. Repeating a keyword or adding an irrelevant one risks demotion.",
      "keywords": [
        { "word": "restoration", "sitsIn": "S1.L2", "status": "true",     "backedBy": "05-OUTWARD.md positioning [you chose: R4 Q2]" },
        { "word": "ruin",        "sitsIn": "S1.L2", "status": "true",     "backedBy": "cid/theme/setting/01-the-ruin.md" },
        { "word": "overgrowth",  "sitsIn": "S1.L1", "status": "true",     "backedBy": "tiers; and theme/vocabulary/02's negative occupancy result: overgrowth is unowned" },
        { "word": "clear",       "sitsIn": "S1.L1", "status": "true",     "backedBy": "01-FOUNDATION.md core loop step 1; theme/vocabulary/02's negative result: clearing as a harvest verb is unowned" },
        { "word": "buried",      "sitsIn": "S1.L1", "status": "true",     "backedBy": "collection; layout" },
        { "word": "find",        "sitsIn": "S1.L1", "status": "true",     "backedBy": "collection.className is Find" },
        { "word": "index",       "sitsIn": "S1.L2", "status": "true",     "backedBy": "theme/vocabulary/02's negative result: index is unowned; ui-ux index panel" },
        { "word": "sets",        "sitsIn": "S2.L3", "status": "true",     "backedBy": "collection.sets, four of them" }
      ],
      "keywordsUnavailableBecauseBanned": [
        { "word": "relic",    "wouldRank": "highest of any single word for a buried-object game", "closedBy": "vocabulary.bannedWords; Scrap Incremental and Faith Incremental ship it for a rolled multiplier item" },
        { "word": "relics",   "wouldRank": "high",   "closedBy": "vocabulary.bannedWords" },
        { "word": "treasure", "wouldRank": "second highest", "closedBy": "vocabulary.bannedWords; Treasure Hunt Simulator occupies it" },
        { "word": "artifact", "wouldRank": "moderate", "closedBy": "vocabulary.bannedWords; a shipping Roblox title collecting 70+ artifacts" },
        { "word": "antique",  "wouldRank": "low",    "closedBy": "vocabulary.bannedWords; reStore's signature noun" },
        { "word": "tier",     "wouldRank": "low",    "closedBy": "vocabulary.bannedWords; Scrap Incremental's named progression system" },
        { "word": "loot",     "wouldRank": "moderate", "closedBy": "vocabulary.bannedWords; imports the item-fantasy framing this design avoids" },
        { "word": "rebirth",  "wouldRank": "highest within the incremental family", "closedBy": "vocabulary.bannedWords; the system is cut [you chose: R2 Q2]" }
      ],
      "keywordsDeclinedNotBanned": [
        { "word": "simulator",      "why": "the family's search-behaviour word; the binding positioning line moves this game out of it" },
        { "word": "incremental",    "why": "same, and it is the word the brief names" },
        { "word": "idle",           "why": "false. No offline accumulation" },
        { "word": "collect",        "why": "adjacent, not true in the genre sense: nothing is collected from a drop table" },
        { "word": "collection",     "why": "adjacent; and it is a merged key name, not a player-facing word" },
        { "word": "scavenger hunt", "why": "it is the subgenre value. Repeating a filing decision as description copy is the repeated-keyword demotion risk, and the game does not describe itself that way" },
        { "word": "free",           "why": "true of every experience on the platform; irrelevant keyword" },
        { "word": "new",            "why": "T10 and E4; also stale the day after publish" },
        { "word": "update",         "why": "sheet 05 publishes no update notes and reserves no stem" },
        { "word": "codes",          "why": "priority 3; liveops/codes ruled no redemption path" }
      ],
      "occupancySurveyBounds": "research/landscape.md states its own limits: taken means exists, not successful; no CCU or visit figures were gathered for any competitor; and four searches surfacing nothing is weak evidence. Every occupancy claim in this key inherits that bound.",
      "titleReadTogetherWithThis": "title (marketing/name, wave 7) has no value. A title containing Incremental would reopen the binding positioning line and make this selection incoherent. Cited by role; no candidate is named here."
    }
  }
}
```

## Consequences for other work

| subject | what this forces or forbids |
|---|---|
| Naming work (`title`) | A title containing `Incremental`, `Simulator` or `Idle` contradicts this selection and reopens a `[brief: binding]` line. A title carrying one of the eight keywords is fine and does not count as a repeat, because the name field and the description field are different fields. **Tell me if you take a glyph**, because a bracketed glyph prefix is the `Simulation / Incremental Simulator` family's own tic and it partly undoes what filing under `Adventure` buys. |
| Description work (sheet 01) | `S1` must contain the six words marked `sitsIn: S1.*` verbatim, exactly once each. `S2.L3` carries `sets`. **No line may contain `simulator`, `incremental` or `idle`**, which sheet 01's criterion 3 already asserts. |
| Thumbnail work (`storeThumbnails`) | An overlay repeating a keyword is a second appearance of it. Keep overlays to words not on this list, or to none. |
| Release work (`release.publishChecklist`) | Setting the genre is a publish-time step the checklist does not cover, and **it is the one step in this category with a three-month lock**, so it must be executed correctly at gate 1 rather than corrected at gate 6. |
| Contract-and-seam work | `storeListing.discovery.genre` and `.subgenre` are closed enumerations. A schema author should validate them against the fetched 17/40 vocabulary rather than as free strings, so a typo fails the merge instead of the publish. |

## Acceptance criteria

1. `storeListing.discovery.genre` is `"Adventure"` and `.subgenre` is `"Scavenger Hunt"`; neither
   equals any value in the `competitorOccupancy` rows.
2. Every `keywords[]` entry appears **exactly once**, case-insensitively, in the concatenated
   `storeListing.description`, in the line named by its `sitsIn` field.
3. Zero members of `keywordsUnavailableBecauseBanned` and zero members of
   `keywordsDeclinedNotBanned` appear anywhere in `storeListing.description` or in
   `storeListing.passListing.description`.
4. `storeListing.discovery.tagField.exists` is the string `"unverified"` and
   `.selectableTagCount` is `0`. No field in this key is `null`.

## Pushing back

**Nothing is overruled, and one binding line is implemented rather than met.**
`05-OUTWARD.md`'s *"marketed as a restoration game"* is `[brief: binding]` and **the platform has
no such value**. I honour its operative half exactly — this game is not filed as an incremental —
and place the word `restoration` in the description's summary sentence, which is where the platform
says genre is read. **That is the closest a closed vocabulary permits, and it is a gap in the
platform, not a decision of mine.** Raised in `## Flagged to the developer` rather than resolved.

## Flagged to the developer

| item | position |
|---|---|
| **The brief names a genre the platform does not have (P1).** | `[cid: decided]`. Live alternatives: **(a)** as decided, `Adventure / Scavenger Hunt`, which files under the one thing about this game no surveyed competitor has; **(b)** `Adventure / Exploration`, softer and less true; **(c)** `Simulation / Incremental Simulator`, which recovers the incremental search behaviour and **contradicts a `[brief: binding]` line**, so it is yours and not mine; **(d)** `Simulation` with no subgenre, which sits in the right browse surface and claims nothing. I recommend (a). **Ratify before gate 1: the value locks for three months.** |
| **`Adventure` also removes the game from the `Simulation` browse surface.** | Stated because the brief priced only the search-behaviour half of the cost. Not a reason to reverse under `00-CORE.md`, but you should know both halves before the three-month lock starts. |
| **Whether a selectable tag field exists is `[unverified]`.** | Four API shapes 404'd and the genre doc names none. If one has shipped, keyword pressure moves off the description and `S1` can be shortened. The fetch that settles it needs an authenticated Creator Hub session, which this pipeline does not have. |

## Not decided here

Every line of the description and the claim ledger — sheet **01**, which owns the strings; this
sheet owns only which words must appear and where. The content-maturity answers — sheet **03**.
Every string about `Span` — sheet **04**. The update-notes format and any title-tag stem — sheet
**05** and Name. The experience name, whether a tagline exists, and whether a glyph is used (Name).
Thumbnail overlay text (Thumbnails). Whether `storeListing` is promoted into `bridge/schema.mjs`
and validated against the genre vocabulary (contract-and-seam work). Whether the platform ships a
tag field (nobody; recorded `[unverified]` with the fetch named).
